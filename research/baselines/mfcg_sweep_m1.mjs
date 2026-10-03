#!/usr/bin/env node
/**
 * M-1 W-03: the MFCG sweep by V12 §3.2.1's seed formula (research-side tool; numbers and files only).
 * Modelled on profiler/export.mjs (download capture, in-page Blob hook) and on
 * captures/mfcg/exports-sweep-2026-09-25/sweep.sh (query, file trio per city). Two deliberate differences, recorded in E03:
 *   1. ONE navigation per plan seed, not one per file. The owner approved 35 loads and 70 downloads (J159), so the JSON
 *      comes from the URL's export key on load and the SVG from the app's own Town window (key T, then its SVG button)
 *      in the same page. A persisted load counter refuses navigation number cap+1 (--cap, default 35).
 *   2. Its own headless Chrome (profiler/lib/common.mjs launch(): same flags and 1500x1100 viewport) on a scratch profile,
 *      never profiler/.session (another lane's FTG session owns that file) and never profiler/.profiles/.
 * No response body is stored (the build's code never reaches disk); the network record is URL, status, bytes, host.
 *
 *   node research/baselines/mfcg_sweep_m1.mjs --plan research/baselines/plan.json --build <index.html url> --out <dir>
 *        [--profile <user-data-dir>] [--only name,name] [--cap 35] [--max 180000] [--settle 1500] [--dry-run]
 *
 * UI route (one load, two files): the Settlement window opens with T; its "Export" button opens a dropdown whose SVG item
 * downloads the SVG. Each step is guarded by a reference crop (probe/ref-clip.png: the window; probe/ref-menu.png: the open
 * menu), compared byte for byte. With no calibration yet, or on any mismatch, the live page is handed to a probe session
 * (see probeLoop) so a load is never spent blind. After the SVG, the window's JSON item is clicked once more with downloads
 * DENIED and the in-page Blob is compared with the URL-export JSON (the same-load re-export; no file, no network).
 * Output per seed: <name>.json (URL export), <name>.svg (Town window export), <name>.png (app view before the window opens),
 * one line in export-log.jsonl (export.mjs's fields + trigger per download, href check, attempts, network summary).
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { launch, sleep, parseArgs } from '../../profiler/lib/common.mjs';

const args = parseArgs(process.argv.slice(2), { cap: 35, max: 180000, settle: 1500 });
for (const k of ['plan', 'build', 'out']) if (!args[k]) { console.error(`missing --${k}`); process.exit(2); }
const out = path.resolve(args.out); const probeDir = path.join(out, 'probe');
fs.mkdirSync(probeDir, { recursive: true });
const sha1 = (b) => crypto.createHash('sha1').update(b).digest('hex');
const plan = JSON.parse(fs.readFileSync(args.plan, 'utf8'));
const entries = plan.families.filter((f) => f.family.startsWith('capture/MFCG/')).flatMap((f) => f.entries.map((e) => ({ ...e, family: f.family })));
const only = args.only ? new Set(String(args.only).split(',')) : null;
const MARKER = /buildGeometry \d+/;
const logFile = path.join(out, 'export-log.jsonl'); const loadsFile = path.join(out, 'loads.jsonl');
const readJsonl = (f) => (fs.existsSync(f) ? fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l)) : []);
const done = new Set(readJsonl(logFile).filter((r) => r.ok).map((r) => r.name));
// Each plan seed gets ONE load (J159's budget): a seed that was ever loaded is never loaded again by this tool.
const loadedNames = new Set(readJsonl(loadsFile).map((r) => r.name));
const logged = new Set(readJsonl(logFile).map((r) => r.name));
const orphans = readJsonl(loadsFile).filter((r) => !logged.has(r.name));   // loaded, but the process ended before its record
const todo = entries.filter((e) => (!only || only.has(e.name)) && !done.has(e.name) && !loadedNames.has(e.name));
const freeMB = () => { const s = fs.statfsSync('/Users/cstokes'); return Math.floor((s.bavail * s.bsize) / 1048576); };

if (args['dry-run']) {
  console.log(JSON.stringify({ entries: entries.length, done: done.size, orphans: orphans.map((o) => o.name), todo: todo.map((e) => e.name), loadsSoFar: readJsonl(loadsFile).length, cap: Number(args.cap), freeMB: freeMB(), firstUrl: todo[0] && `${args.build}?${todo[0].exports[0]}` }, null, 1));
  process.exit(0);
}

for (const o of orphans) {
  const e = entries.find((x) => x.name === o.name);
  fs.appendFileSync(logFile, JSON.stringify({ t: new Date().toISOString(), name: o.name, label: e && e.label, seed: e && e.seed, family: e && e.family, url: o.url, loadN: o.n, loadT: o.t, ok: false, reconciled: true,
    failure: 'no record: the sweep process ended during this load (its console trace was not saved)', filesOnDisk: ['.json', '.svg', '.png'].filter((x) => fs.existsSync(path.join(out, o.name + x))) }) + '\n');
  console.log(`reconciled ${o.name} (load ${o.n}) as a failed slot`);
}
const TIMEOUT = 'TIMEOUT';
const within = (ms, p) => Promise.race([Promise.resolve(p).catch((err) => ({ error: String((err && err.message) || err).slice(0, 160) })), sleep(ms).then(() => TIMEOUT)]);
const traceInfo = (lines, seed) => {
  const att = lines.map((l) => l.text.match(/-->> seed:(\d+) size:(\d+)/)).filter(Boolean);
  const internalSeeds = att.map((m) => Number(m[1]));
  return { attempts: att.length, internalSeeds, retry: att.length !== 1 || internalSeeds[0] !== seed };
};
const netInfo = (reqs) => {
  const hosts = {};
  for (const r of reqs) { try { const h = new URL(r.url).host || r.url.slice(0, 5); hosts[h] = (hosts[h] || 0) + 1; } catch { hosts.other = (hosts.other || 0) + 1; } }
  return { requests: reqs.length, documents: reqs.filter((r) => r.doc).map((r) => r.url.slice(0, 200)), hosts, bytesFromNetwork: reqs.filter((r) => !r.cache).reduce((n, r) => n + (r.bytes || 0), 0), failed: reqs.filter((r) => r.failed).length };
};
const uiFile = path.join(probeDir, 'ui.json');
let ui = fs.existsSync(uiFile) ? JSON.parse(fs.readFileSync(uiFile, 'utf8')) : null;
if (!args.profile) { console.error('missing --profile (a scratch user-data-dir OUTSIDE the capture folder: its cache would hold the build)'); process.exit(2); }
const userDataDir = path.resolve(args.profile);
if (userDataDir.startsWith(out)) { console.error('--profile must lie outside --out'); process.exit(2); }
const browser = await launch({ headful: false, userDataDir });
const page = (await browser.pages())[0] || await browser.newPage();
const bcdp = await browser.target().createCDPSession();
const cdp = await page.createCDPSession();
await cdp.send('Network.enable');

// --- recorders (reset per seed) -------------------------------------------------------------------------------------
let downloads = new Map(); let order = 0; let consoleLines = []; let net = new Map(); let t0 = 0;
bcdp.on('Browser.downloadWillBegin', (e) => downloads.set(e.guid, { guid: e.guid, n: order++, url: String(e.url).slice(0, 200), suggestedFilename: e.suggestedFilename, state: 'begun', t: Date.now() - t0 }));
bcdp.on('Browser.downloadProgress', (e) => { const d = downloads.get(e.guid) || { guid: e.guid, n: order++ }; Object.assign(d, { state: e.state, totalBytes: e.totalBytes }); downloads.set(e.guid, d); });
page.on('console', (m) => consoleLines.push({ dt: Date.now() - t0, type: m.type(), text: m.text().slice(0, 300) }));
cdp.on('Network.requestWillBeSent', (e) => net.set(e.requestId, { url: e.request.url, type: e.type, frame: e.frameId, doc: e.type === 'Document' }));
cdp.on('Network.responseReceived', (e) => { const r = net.get(e.requestId); if (r) Object.assign(r, { status: e.response.status, cache: !!(e.response.fromDiskCache || e.response.fromServiceWorker || e.response.fromPrefetchCache) }); });
cdp.on('Network.loadingFinished', (e) => { const r = net.get(e.requestId); if (r) r.bytes = e.encodedDataLength; });
cdp.on('Network.loadingFailed', (e) => { const r = net.get(e.requestId); if (r) r.failed = e.errorText; });
await page.evaluateOnNewDocument(() => {
  const cap = (window.__exportCap = { blobs: [], anchors: [] });
  const oc = URL.createObjectURL.bind(URL);
  URL.createObjectURL = function (o) {
    const u = oc(o);
    try { if (o instanceof Blob) { const e = { url: u, type: o.type, size: o.size, t: Date.now() }; cap.blobs.push(e); if (!/^image\/(png|jpe?g|gif|webp)/.test(o.type)) o.text().then((s) => { e.text = s; }); } } catch (err) { /* never disturb the page */ }
    return u;
  };
  const note = (a, via) => { try { cap.anchors.push({ via, download: a.download, href: String(a.href).slice(0, 120), t: Date.now() }); } catch (e) { /* ignore */ } };
  const ac = HTMLAnchorElement.prototype.click;
  HTMLAnchorElement.prototype.click = function () { note(this, 'click'); return ac.apply(this, arguments); };
  const de = EventTarget.prototype.dispatchEvent;
  EventTarget.prototype.dispatchEvent = function (ev) { if (this instanceof HTMLAnchorElement && ev && ev.type === 'click') note(this, 'dispatch'); return de.apply(this, arguments); };
});

const completed = () => [...downloads.values()].filter((d) => d.state === 'completed');
const waitFor = async (pred, ms) => { const s = Date.now(); while (Date.now() - s < ms) { if (await pred()) return true; await sleep(150); } return !!(await pred()); };
const blobCount = () => page.evaluate(() => (window.__exportCap ? window.__exportCap.blobs.length : 0)).catch(() => 0);
const neutral = async () => { await page.mouse.move(1, 1); await sleep(150); };
const crop = async (c) => Buffer.from(await page.screenshot({ clip: { x: c[0], y: c[1], width: c[2], height: c[3] }, type: 'png' }));
const xy = (s) => s.split(',').map(Number);
async function openTownWindow(refClip) {
  // T toggles the Town window. The reference crop decides whether it is open; never click while it does not match.
  await neutral(); await page.keyboard.press('t'); await sleep(900); await neutral();
  if (!refClip) return true;
  const ref = fs.readFileSync(path.join(probeDir, 'ref-clip.png'));
  if (Buffer.compare(await crop(refClip), ref) === 0) return true;
  await page.keyboard.press('t'); await sleep(900); await neutral();          // it may have been open already: toggle once more
  return Buffer.compare(await crop(refClip), ref) === 0;
}
async function setDl(behavior, dir) { await bcdp.send('Browser.setDownloadBehavior', behavior === 'deny' ? { behavior: 'deny', eventsEnabled: true } : { behavior: 'allowAndName', downloadPath: dir, eventsEnabled: true }); }

// Probe session (first seed, and the fallback whenever a guard crop does not match): commands one per file in
// probe/<seed name>/cmd-<k>.txt, answered by step-<k>.png and ack-<k>.json there. Ops:
//   shot | move x,y | key K | click x,y (plain) | clip x,y,w,h (window reference, mouse parked first)
//   open x,y (click the Export dropdown; remembered) | menuclip x,y,w,h (menu reference, mouse left on the button)
//   svg x,y (click the SVG item; must yield one new download; remembered) | json x,y (remember the JSON item) | go
async function probeLoop(name, why) {
  const dir = path.join(probeDir, name); fs.mkdirSync(dir, { recursive: true });
  await page.screenshot({ path: path.join(dir, 'start.png') });
  const state = {};
  console.log(`PROBE (${why}): ${path.join(dir, 'start.png')}; waiting for ${path.join(dir, 'cmd-1.txt')}`);
  for (let k = 1; ; k++) {
    const f = path.join(dir, `cmd-${k}.txt`);
    while (!fs.existsSync(f)) await sleep(500);
    const [op, arg = ''] = fs.readFileSync(f, 'utf8').trim().split(/\s+/, 2);
    const before = completed().length; const ack = { k, op, arg };
    if (op === 'move') { const [x, y] = xy(arg); await page.mouse.move(x, y, { steps: 5 }); await sleep(400); }
    else if (op === 'key') { await page.keyboard.press(arg); await sleep(900); }
    else if (op === 'click') { const [x, y] = xy(arg); await page.mouse.click(x, y); await sleep(700); }
    else if (op === 'clip') { state.clip = xy(arg); await neutral(); fs.writeFileSync(path.join(probeDir, 'ref-clip.png'), await crop(state.clip)); }
    else if (op === 'open') { state.open = xy(arg); await page.mouse.click(state.open[0], state.open[1]); await sleep(700); }
    else if (op === 'menuclip') { state.menuClip = xy(arg); fs.writeFileSync(path.join(probeDir, 'ref-menu.png'), await crop(state.menuClip)); }
    else if (op === 'svg') {
      const [x, y] = xy(arg); await page.mouse.click(x, y);
      ack.newDownload = await waitFor(() => completed().length > before, 120000); if (ack.newDownload) state.svgItem = [x, y]; await neutral();
    } else if (op === 'json') state.jsonItem = xy(arg);
    else if (op === 'go') {
      ui = { ...(ui || {}), ...state, history: [...((ui && ui.history) || []), { seed: name, why, set: Object.keys(state), t: new Date().toISOString() }] };
      fs.writeFileSync(uiFile, JSON.stringify(ui, null, 1)); ack.saved = uiFile;
      fs.writeFileSync(path.join(dir, `ack-${k}.json`), JSON.stringify(ack, null, 1)); return;
    } else if (op !== 'shot') ack.error = 'unknown op';
    await page.screenshot({ path: path.join(dir, `step-${k}.png`) });
    Object.assign(ack, { downloads: [...downloads.values()].map((d) => ({ n: d.n, suggestedFilename: d.suggestedFilename, state: d.state })), blobs: await blobCount() });
    fs.writeFileSync(path.join(dir, `ack-${k}.json`), JSON.stringify(ack, null, 1));
  }
}
// Open the Export dropdown and check the menu crop (the mouse stays on the button, as when the reference was taken).
async function openMenu() {
  await page.mouse.click(ui.open[0], ui.open[1]); await sleep(700);
  return Buffer.compare(await crop(ui.menuClip), fs.readFileSync(path.join(probeDir, 'ref-menu.png'))) === 0;
}

// --- the sweep ------------------------------------------------------------------------------------------------------
const summary = [];
for (const e of todo) {
  const loads = readJsonl(loadsFile);
  if (loads.length >= Number(args.cap)) { console.error(`STOP: ${loads.length} loads recorded, cap ${args.cap}; ${e.name} not loaded`); break; }
  if (freeMB() < 1024) { console.error(`STOP: ${freeMB()} MB free (< 1 GB) before ${e.name}`); break; }
  const dl = path.join(out, `.dl-${e.name}`); fs.rmSync(dl, { recursive: true, force: true }); fs.mkdirSync(dl, { recursive: true });
  downloads = new Map(); order = 0; consoleLines = []; net = new Map();
  await setDl('allow', dl);
  const url = `${args.build}?${e.exports[0]}`;
  fs.appendFileSync(loadsFile, JSON.stringify({ n: loads.length + 1, t: new Date().toISOString(), name: e.name, url }) + '\n');
  t0 = Date.now();
  await page.goto(url, { waitUntil: 'load', timeout: 120000 }).catch((err) => console.error('goto:', err.message));
  const gotJson = await waitFor(() => consoleLines.some((l) => MARKER.test(l.text)) && completed().length >= 1, Number(args.max));
  if (!gotJson) {
    const lines = consoleLines.filter((l) => !/^\s*$/.test(l.text)); const reqs = [...net.values()];
    const rec = { t: new Date().toISOString(), name: e.name, label: e.label, seed: e.seed, family: e.family, url, loadsBefore: loads.length, jsonOk: false, ok: false,
      failure: `no JSON download within ${args.max} ms of the navigation`, markerSeen: lines.some((l) => MARKER.test(l.text)), hrefNow: page.url(),
      downloads: [...downloads.values()].map((d) => ({ suggestedFilename: d.suggestedFilename, state: d.state })), ...traceInfo(lines, e.seed), console: lines, network: netInfo(reqs) };
    fs.appendFileSync(logFile, JSON.stringify(rec) + '\n');                       // the trace is on disk before anything can block
    const shot = await within(20000, page.screenshot({ path: path.join(out, `${e.name}.fail.png`) }));
    fs.appendFileSync(logFile, JSON.stringify({ t: new Date().toISOString(), name: e.name, note: 'failure screenshot', shot: shot === TIMEOUT ? 'none: the page did not answer within 20 s' : `${e.name}.fail.png` }) + '\n');
    console.error(`STOP: ${e.name} gave no JSON (${rec.attempts} attempt line(s), marker ${rec.markerSeen}); record written; no further loads in this run`);
    break;
  }
  await sleep(Number(args.settle));
  const hrefReady = page.url(); const jsonDt = Date.now() - t0;
  await neutral(); await page.screenshot({ path: path.join(out, `${e.name}.png`) });
  const rec = { t: new Date().toISOString(), name: e.name, label: e.label, seed: e.seed, family: e.family, url, loadsBefore: loads.length, hrefReady, jsonOk: gotJson, jsonDt, shot: `${e.name}.png` };
  let svgOk = false; let reexport;
  if (gotJson) {
    // SVG: Town window (T) -> Export dropdown -> SVG item, each step guarded by a reference crop; any mismatch hands the
    // live page to a probe session instead of clicking blind or giving up the load.
    const ready = ui && ui.clip && ui.open && ui.menuClip && ui.svgItem;
    const win = await openTownWindow(ready ? ui.clip : null);
    let why = !ready ? 'calibration' : !win ? 'window crop mismatch' : null;
    if (!why) { rec.townWindow = 'matched'; if (!(await openMenu())) why = 'menu crop mismatch'; else rec.menu = 'matched'; }
    if (why) { rec.probe = why; const c0 = completed().length; await probeLoop(e.name, why); svgOk = completed().length > c0 || completed().length >= 2; }
    else { const before = completed().length; await page.mouse.click(ui.svgItem[0], ui.svgItem[1]); svgOk = await waitFor(() => completed().length > before, 120000); await neutral(); }
    if (svgOk && ui && ui.jsonItem && ui.menuClip) {
      // in-page re-export of the JSON through the window: downloads DENIED, the Blob read in-page (no file, no network)
      await setDl('deny'); const b0 = await blobCount();
      if (await openMenu()) {
        await page.mouse.click(ui.jsonItem[0], ui.jsonItem[1]);
        const gotBlob = await waitFor(async () => (await blobCount()) > b0 && await page.evaluate((i) => typeof window.__exportCap.blobs[i].text === 'string', b0), 60000);
        reexport = { trigger: 'window JSON item, downloads denied', gotBlob, blobIndex: b0 };
      } else reexport = { skipped: 'menu crop mismatch' };
      await neutral(); await setDl('allow', dl);
    }
    await page.keyboard.press('t').catch(() => {}); await sleep(400);            // close the Town window again
  }
  const cap = await page.evaluate(() => window.__exportCap || null).catch(() => null);
  rec.hrefAfter = page.url(); rec.wallMs = Date.now() - t0;
  // files: downloads in the order they began (JSON by URL first, then SVG by the window)
  const dls = [...downloads.values()].sort((a, b) => a.n - b.n); const shas = new Set(); rec.downloads = [];
  const usedExt = new Set();
  for (const d of dls) {
    const r = { trigger: d.n === 0 ? 'url' : d.state === 'canceled' ? 'ui-denied' : 'ui', suggestedFilename: d.suggestedFilename, state: d.state, totalBytes: d.totalBytes, url: d.url };
    const src = path.join(dl, d.guid);
    if (d.state === 'completed' && fs.existsSync(src)) {
      let ext = path.extname(d.suggestedFilename || '') || '.bin'; if (usedExt.has(ext)) ext = `.${d.n}${ext}`; usedExt.add(ext);
      const dst = path.join(out, `${e.name}${ext}`); fs.renameSync(src, dst); const buf = fs.readFileSync(dst);
      Object.assign(r, { file: path.basename(dst), bytes: buf.length, sha1: sha1(buf) }); shas.add(r.sha1);
    }
    rec.downloads.push(r);
  }
  rec.blobs = (cap?.blobs || []).map((b, i) => {
    const r = { i, type: b.type, size: b.size, hasText: typeof b.text === 'string' };
    if (r.hasText) { r.sha1 = sha1(Buffer.from(b.text, 'utf8')); r.sameAsDownload = shas.has(r.sha1); }
    return r;
  });
  rec.anchors = (cap?.anchors || []).map((a) => ({ via: a.via, download: a.download, href: a.href }));
  if (reexport && reexport.blobIndex !== undefined) {
    const b = rec.blobs[reexport.blobIndex]; const j = rec.downloads.find((d) => /\.json$/.test(d.file || ''));
    Object.assign(reexport, { sha1: b?.sha1, size: b?.size, jsonDownloadSha1: j?.sha1, byteIdentical: !!b && !!j && b.sha1 === j.sha1 });
  }
  if (reexport) rec.reexport = reexport;
  // canonical href: every key the plan expects
  const q = new URL(rec.hrefAfter).searchParams;
  rec.hrefCheck = Object.fromEntries(Object.entries(e.hrefExpect).map(([k, v]) => [k, q.get(k) === v ? 'ok' : `want ${v} got ${q.get(k)}`]));
  rec.hrefOk = Object.values(rec.hrefCheck).every((v) => v === 'ok');
  // generation attempts from the console trace (a retry = a second '-->> seed' line, another internal seed)
  Object.assign(rec, traceInfo(consoleLines, e.seed));
  rec.console = consoleLines.filter((l) => !/^\s*$/.test(l.text));
  rec.network = netInfo([...net.values()]);
  const files = rec.downloads.filter((d) => d.file);
  rec.ok = gotJson && svgOk && files.length === 2 && files.some((d) => d.file.endsWith('.json')) && files.some((d) => d.file.endsWith('.svg'))
    && files.every((d) => rec.blobs.some((b) => b.hasText && b.sha1 === d.sha1));
  fs.rmSync(dl, { recursive: true, force: true });
  fs.appendFileSync(logFile, JSON.stringify(rec) + '\n');
  const line = { name: e.name, ok: rec.ok, files: files.map((d) => `${d.file} ${d.bytes}`), hrefOk: rec.hrefOk, attempts: rec.attempts, retry: rec.retry, wallMs: rec.wallMs, docs: rec.network.documents.length, reexport: reexport?.byteIdentical, freeMB: freeMB() };
  summary.push(line); console.log(JSON.stringify(line));
  if (!rec.ok) { console.error(`STOP: ${e.name} incomplete (json ${gotJson}, svg ${svgOk}); no further loads`); break; }
}
await within(5000, bcdp.send('Browser.setDownloadBehavior', { behavior: 'default' }));
await within(15000, browser.close());
try { browser.process()?.kill('SIGKILL'); } catch { /* already gone */ }
console.log(JSON.stringify({ finished: new Date().toISOString(), thisRun: summary.length, loadsTotal: readJsonl(loadsFile).length, okTotal: readJsonl(logFile).filter((r) => r.ok).length }));
process.exit(0);
