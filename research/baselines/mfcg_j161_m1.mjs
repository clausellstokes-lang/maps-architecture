#!/usr/bin/env node
/**
 * M-1 W-03 completion under J161 (owner, 2026-10-03: at most three more automated loads of the public MFCG build; lane
 * m1/W-03-complete uses at most two: the cold re-export of capture/MFCG/40/plain/0 and one retry of /130/plain/8).
 * One plan name per run. The per-seed method is mfcg_sweep_m1.mjs's (one navigation: the JSON by the URL export key on
 * load, the screenshot, the SVG through the app's Settlement window T -> Export -> SVG behind the same byte-compared
 * reference crops, then the window's JSON item once more), with four differences, recorded in E03 section 9:
 *   1. Browser downloads are DENIED for the whole load. Every file is the in-page Blob's bytes (the sweep showed
 *      Blob = download on 68 of 68 files); E03 section 5 item 1 proposed exactly this route (1 load, 0 downloads).
 *   2. Its own load ledger (<out>/loads.jsonl, --cap 2): the J159 ledger of the sweep folder stays at 35 lines. A name
 *      already in this ledger is never loaded again.
 *   3. Files are written with 'wx' (never over an existing file). --files names their folder; --compare names a folder
 *      whose stored files the new bytes are compared with (sha1 and byte length).
 *   4. A load that gives no JSON writes its record (console trace first) before anything that needs the page, then asks
 *      the page one non-input question (evaluate 1, bounded 10 s) to tell a busy main thread from an idle page, then a
 *      bounded screenshot, then stops. Nothing waits on the 600 s protocol limit.
 * No response body is stored; the network record is URL, status, bytes and host, as in the sweep.
 *
 *   node research/baselines/mfcg_j161_m1.mjs --plan research/baselines/plan.json --build <index.html url> --out <ledger dir>
 *        --files <dir> --name <plan name> --ui <sweep folder>/probe --profile <scratch dir> [--compare <dir>]
 *        [--cap 2] [--max 180000] [--settle 1500] [--dry-run]
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { launch, sleep, parseArgs } from '../../profiler/lib/common.mjs';

const args = parseArgs(process.argv.slice(2), { cap: 2, max: 180000, settle: 1500 });
for (const k of ['plan', 'build', 'out', 'files', 'name', 'ui', 'profile']) if (!args[k]) { console.error(`missing --${k}`); process.exit(2); }
const out = path.resolve(args.out); const filesDir = path.resolve(args.files); const uiDir = path.resolve(args.ui);
const userDataDir = path.resolve(args.profile);
if ([out, filesDir].some((d) => userDataDir.startsWith(d))) { console.error('--profile must lie outside --out and --files'); process.exit(2); }
fs.mkdirSync(out, { recursive: true }); fs.mkdirSync(filesDir, { recursive: true });
const sha1 = (b) => crypto.createHash('sha1').update(b).digest('hex');
const plan = JSON.parse(fs.readFileSync(args.plan, 'utf8'));
const e = plan.families.filter((f) => f.family.startsWith('capture/MFCG/')).flatMap((f) => f.entries.map((x) => ({ ...x, family: f.family }))).find((x) => x.name === args.name);
if (!e) { console.error(`no plan entry named ${args.name}`); process.exit(2); }
const MARKER = /buildGeometry \d+/;
const logFile = path.join(out, 'export-log.jsonl'); const loadsFile = path.join(out, 'loads.jsonl');
const readJsonl = (f) => (fs.existsSync(f) ? fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l)) : []);
const freeMB = () => { const s = fs.statfsSync('/Users/cstokes'); return Math.floor((s.bavail * s.bsize) / 1048576); };
const ui = JSON.parse(fs.readFileSync(path.join(uiDir, 'ui.json'), 'utf8'));
const refClip = fs.readFileSync(path.join(uiDir, 'ref-clip.png')); const refMenu = fs.readFileSync(path.join(uiDir, 'ref-menu.png'));
const loads = readJsonl(loadsFile);
const url = `${args.build}?${e.exports[0]}`;
const refuse = loads.length >= Number(args.cap) ? `${loads.length} loads in ${loadsFile}, cap ${args.cap}`
  : loads.some((l) => l.name === e.name) ? `${e.name} is already in ${loadsFile}` : freeMB() < 1024 ? `${freeMB()} MB free (< 1 GB)`
  : !(ui.clip && ui.open && ui.menuClip && ui.svgItem && ui.jsonItem) ? 'ui.json lacks a calibrated route' : null;
if (args['dry-run'] || refuse) {
  console.log(JSON.stringify({ name: e.name, label: e.label, seed: e.seed, url, loadsSoFar: loads.length, cap: Number(args.cap), refuse, freeMB: freeMB(), files: filesDir, compare: args.compare || null }, null, 1));
  process.exit(refuse ? 3 : 0);
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

const browser = await launch({ headful: false, userDataDir });
const page = (await browser.pages())[0] || await browser.newPage();
const bcdp = await browser.target().createCDPSession();
const cdp = await page.createCDPSession();
await cdp.send('Network.enable');
await bcdp.send('Browser.setDownloadBehavior', { behavior: 'deny', eventsEnabled: true });   // the whole load: no file reaches disk through Chrome

const downloads = new Map(); let order = 0; const consoleLines = []; let consoleTotal = 0; const net = new Map(); let t0 = 0;
bcdp.on('Browser.downloadWillBegin', (x) => downloads.set(x.guid, { guid: x.guid, n: order++, url: String(x.url).slice(0, 200), suggestedFilename: x.suggestedFilename, state: 'begun', t: Date.now() - t0 }));
bcdp.on('Browser.downloadProgress', (x) => { const d = downloads.get(x.guid) || { guid: x.guid, n: order++ }; Object.assign(d, { state: x.state, totalBytes: x.totalBytes }); downloads.set(x.guid, d); });
page.on('console', (m) => { consoleTotal++; if (consoleLines.length < 3000) consoleLines.push({ dt: Date.now() - t0, type: m.type(), text: m.text().slice(0, 300) }); });
cdp.on('Network.requestWillBeSent', (x) => net.set(x.requestId, { url: x.request.url, type: x.type, frame: x.frameId, doc: x.type === 'Document' }));
cdp.on('Network.responseReceived', (x) => { const r = net.get(x.requestId); if (r) Object.assign(r, { status: x.response.status, cache: !!(x.response.fromDiskCache || x.response.fromServiceWorker || x.response.fromPrefetchCache) }); });
cdp.on('Network.loadingFinished', (x) => { const r = net.get(x.requestId); if (r) r.bytes = x.encodedDataLength; });
cdp.on('Network.loadingFailed', (x) => { const r = net.get(x.requestId); if (r) r.failed = x.errorText; });
await page.evaluateOnNewDocument(() => {
  const cap = (window.__exportCap = { blobs: [], anchors: [] });
  const oc = URL.createObjectURL.bind(URL);
  URL.createObjectURL = function (o) {
    const u = oc(o);
    try { if (o instanceof Blob) { const x = { url: u, type: o.type, size: o.size, t: Date.now() }; cap.blobs.push(x); if (!/^image\/(png|jpe?g|gif|webp)/.test(o.type)) o.text().then((s) => { x.text = s; }); } } catch (err) { /* never disturb the page */ }
    return u;
  };
  const note = (a, via) => { try { cap.anchors.push({ via, download: a.download, href: String(a.href).slice(0, 120), t: Date.now() }); } catch (err) { /* ignore */ } };
  const ac = HTMLAnchorElement.prototype.click;
  HTMLAnchorElement.prototype.click = function () { note(this, 'click'); return ac.apply(this, arguments); };
  const de = EventTarget.prototype.dispatchEvent;
  EventTarget.prototype.dispatchEvent = function (ev) { if (this instanceof HTMLAnchorElement && ev && ev.type === 'click') note(this, 'dispatch'); return de.apply(this, arguments); };
});

const waitFor = async (pred, ms) => { const s = Date.now(); while (Date.now() - s < ms) { if (await pred()) return true; await sleep(250); } return !!(await pred()); };
// every question to the page is bounded: a busy main thread must never hold the tool
const blobMeta = async () => { const r = await within(5000, page.evaluate(() => (window.__exportCap ? window.__exportCap.blobs.map((b) => ({ type: b.type, size: b.size, hasText: typeof b.text === 'string' })) : []))); return Array.isArray(r) ? r : []; };
const hasBlob = async (i, re) => { const m = await blobMeta(); return m.length > i && re.test(m[i].type) && m[i].hasText; };
const neutral = async () => { await page.mouse.move(1, 1); await sleep(150); };
const crop = async (c) => Buffer.from(await page.screenshot({ clip: { x: c[0], y: c[1], width: c[2], height: c[3] }, type: 'png' }));
async function openTownWindow() {
  await neutral(); await page.keyboard.press('t'); await sleep(900); await neutral();
  if (Buffer.compare(await crop(ui.clip), refClip) === 0) return true;
  await page.keyboard.press('t'); await sleep(900); await neutral();
  return Buffer.compare(await crop(ui.clip), refClip) === 0;
}
async function openMenu() { await page.mouse.click(ui.open[0], ui.open[1]); await sleep(700); return Buffer.compare(await crop(ui.menuClip), refMenu) === 0; }
const writeNew = (file, buf) => {   // never over an existing file
  try { fs.writeFileSync(file, buf, { flag: 'wx' }); return { file: path.relative(filesDir, file), written: true }; } catch (err) { return { file: path.relative(filesDir, file), written: false, why: err.code || String(err) }; }
};
const compareWith = (ext, buf) => {
  if (!args.compare) return undefined;
  const p = path.join(path.resolve(args.compare), e.name + ext);
  if (!fs.existsSync(p)) return { stored: p, exists: false };
  const s = fs.readFileSync(p); return { stored: path.basename(p), exists: true, storedSha1: sha1(s), storedBytes: s.length, byteIdentical: Buffer.compare(s, buf) === 0 };
};

fs.appendFileSync(loadsFile, JSON.stringify({ n: loads.length + 1, ruling: 'J161', t: new Date().toISOString(), name: e.name, url, downloads: 'denied' }) + '\n');
t0 = Date.now();
const nav = await within(130000, page.goto(url, { waitUntil: 'load', timeout: 120000 }));
const navNote = nav === TIMEOUT ? 'goto did not return in 130 s' : nav && nav.error ? `goto: ${nav.error}` : 'load';
// the JSON: the generation marker on the console, a download event (denied) and the URL-export Blob's text in the page
const gotJson = await waitFor(async () => consoleLines.some((l) => MARKER.test(l.text)) && downloads.size >= 1 && await hasBlob(0, /json/), Number(args.max));
const rec = { t: new Date().toISOString(), ruling: 'J161', name: e.name, label: e.label, seed: e.seed, family: e.family, url, loadN: loads.length + 1, nav: navNote, downloadsDenied: true, jsonOk: gotJson };
if (!gotJson) {
  const lines = consoleLines.filter((l) => !/^\s*$/.test(l.text)); const reqs = [...net.values()];
  Object.assign(rec, { ok: false, failure: `no JSON within ${args.max} ms of the navigation`, waitedMs: Date.now() - t0, markerSeen: lines.some((l) => MARKER.test(l.text)),
    downloads: [...downloads.values()].map((d) => ({ suggestedFilename: d.suggestedFilename, state: d.state })), ...traceInfo(lines, e.seed),
    consoleTotal, lastConsoleDt: lines.length ? lines[lines.length - 1].dt : null, console: lines, network: netInfo(reqs) });
  fs.appendFileSync(logFile, JSON.stringify(rec) + '\n');                         // the trace is on disk before anything can block
  const ts = Date.now(); const alive = await within(10000, page.evaluate(() => 1));
  const live = alive === 1 ? `the page answered evaluate(1) in ${Date.now() - ts} ms (main thread not busy)` : alive === TIMEOUT ? 'the page did not answer evaluate(1) within 10 s (main thread busy)' : `evaluate(1): ${JSON.stringify(alive).slice(0, 120)}`;
  fs.appendFileSync(logFile, JSON.stringify({ t: new Date().toISOString(), name: e.name, note: 'liveness', liveness: live, consoleTotalNow: consoleTotal }) + '\n');
  const shot = await within(20000, page.screenshot({ type: 'png' }));
  const shotNote = Buffer.isBuffer(shot) || shot instanceof Uint8Array ? writeNew(path.join(out, `${e.name}.fail.png`), Buffer.from(shot)) : { written: false, why: shot === TIMEOUT ? 'the page did not answer within 20 s' : JSON.stringify(shot).slice(0, 120) };
  fs.appendFileSync(logFile, JSON.stringify({ t: new Date().toISOString(), name: e.name, note: 'failure screenshot', shot: shotNote }) + '\n');
  console.error(`STOP: ${e.name} gave no JSON (${rec.attempts} attempt line(s), marker ${rec.markerSeen}; ${live}); record written`);
} else {
  await sleep(Number(args.settle));
  rec.hrefReady = page.url(); rec.jsonDt = Date.now() - t0;
  await neutral();
  const shot = await within(20000, page.screenshot({ type: 'png' }));
  if (Buffer.isBuffer(shot) || shot instanceof Uint8Array) { const buf = Buffer.from(shot); const compare = compareWith('.png', buf); rec.shot = { ...writeNew(path.join(filesDir, `${e.name}.png`), buf), sha1: sha1(buf), compare }; } else rec.shot = { written: false, why: String(shot) };   // compare before writing
  let svgOk = false;
  rec.townWindow = (await openTownWindow()) ? 'matched' : 'mismatch';
  if (rec.townWindow === 'matched') {
    rec.menu = (await openMenu()) ? 'matched' : 'mismatch';
    if (rec.menu === 'matched') {
      const n0 = (await blobMeta()).length;
      await page.mouse.click(ui.svgItem[0], ui.svgItem[1]);
      svgOk = await waitFor(() => hasBlob(n0, /svg/), 120000); await neutral();
      if (svgOk) {   // the same-load re-export: the window's JSON item once more
        const n1 = (await blobMeta()).length;
        if (await openMenu()) {
          await page.mouse.click(ui.jsonItem[0], ui.jsonItem[1]);
          rec.reexport = { trigger: 'window JSON item, downloads denied', gotBlob: await waitFor(() => hasBlob(n1, /json/), 60000), blobIndex: n1 };
        } else rec.reexport = { skipped: 'menu crop mismatch' };
        await neutral();
      }
    }
    await page.keyboard.press('t').catch(() => {}); await sleep(400);
  }
  // a crop mismatch is not clicked through: the load stops with the JSON only (no probe session in this tool)
  const cap = await within(120000, page.evaluate(() => window.__exportCap || null));
  const capOk = cap && cap !== TIMEOUT && !cap.error;
  rec.hrefAfter = page.url(); rec.wallMs = Date.now() - t0;
  rec.blobs = capOk ? cap.blobs.map((b, i) => ({ i, type: b.type, size: b.size, hasText: typeof b.text === 'string', sha1: typeof b.text === 'string' ? sha1(Buffer.from(b.text, 'utf8')) : undefined, bytes: typeof b.text === 'string' ? Buffer.byteLength(b.text, 'utf8') : undefined })) : [];
  rec.anchors = capOk ? cap.anchors.map((a) => ({ via: a.via, download: a.download, href: a.href })) : [];
  rec.downloadEvents = [...downloads.values()].sort((a, b) => a.n - b.n).map((d) => ({ n: d.n, suggestedFilename: d.suggestedFilename, state: d.state, totalBytes: d.totalBytes }));
  rec.files = [];
  if (capOk) {
    const jsonB = cap.blobs[0]; const svgI = cap.blobs.findIndex((b) => /svg/.test(b.type) && typeof b.text === 'string');
    for (const [b, ext, trigger, i] of [[jsonB, '.json', 'url-blob', 0], [svgI >= 0 ? cap.blobs[svgI] : null, '.svg', 'ui-blob', svgI]]) {
      if (!b || typeof b.text !== 'string') continue;
      const buf = Buffer.from(b.text, 'utf8');
      const compare = compareWith(ext, buf);   // before writing: --files may equal --compare
      rec.files.push({ ext, trigger, blobIndex: i, bytes: buf.length, sha1: sha1(buf), blobSize: b.size, ...writeNew(path.join(filesDir, e.name + ext), buf), compare });
    }
  }
  if (rec.reexport && rec.reexport.blobIndex !== undefined) {
    const b = rec.blobs[rec.reexport.blobIndex]; const j = rec.files.find((f) => f.ext === '.json');
    Object.assign(rec.reexport, { sha1: b && b.sha1, jsonSha1: j && j.sha1, byteIdentical: !!b && !!j && b.sha1 === j.sha1 });
  }
  const q = new URL(rec.hrefAfter).searchParams;
  rec.hrefCheck = Object.fromEntries(Object.entries(e.hrefExpect).map(([k, v]) => [k, q.get(k) === v ? 'ok' : `want ${v} got ${q.get(k)}`]));
  rec.hrefOk = Object.values(rec.hrefCheck).every((v) => v === 'ok');
  Object.assign(rec, traceInfo(consoleLines, e.seed));
  rec.consoleTotal = consoleTotal; rec.console = consoleLines.filter((l) => !/^\s*$/.test(l.text));
  rec.network = netInfo([...net.values()]);
  rec.downloadsCompleted = rec.downloadEvents.filter((d) => d.state === 'completed').length;
  rec.ok = gotJson && svgOk && rec.files.length === 2 && rec.downloadsCompleted === 0 && rec.files.every((f) => f.blobSize === f.bytes || f.blobSize === undefined);
  fs.appendFileSync(logFile, JSON.stringify(rec) + '\n');
  console.log(JSON.stringify({ name: e.name, ok: rec.ok, files: rec.files.map((f) => ({ ext: f.ext, bytes: f.bytes, sha1: f.sha1.slice(0, 12), written: f.written, why: f.why, identical: f.compare && f.compare.byteIdentical })), png: rec.shot && rec.shot.compare && rec.shot.compare.byteIdentical, hrefOk: rec.hrefOk, attempts: rec.attempts, retry: rec.retry, reexport: rec.reexport && rec.reexport.byteIdentical, window: rec.townWindow, menu: rec.menu, downloadsCompleted: rec.downloadsCompleted, docs: rec.network.documents.length, wallMs: rec.wallMs, freeMB: freeMB() }));
}
await within(5000, bcdp.send('Browser.setDownloadBehavior', { behavior: 'default' }));
await within(15000, browser.close());
try { browser.process()?.kill('SIGKILL'); } catch { /* already gone */ }
console.log(JSON.stringify({ finished: new Date().toISOString(), loadsInLedger: readJsonl(loadsFile).length, cap: Number(args.cap) }));
process.exit(0);
