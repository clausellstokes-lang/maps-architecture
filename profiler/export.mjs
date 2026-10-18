#!/usr/bin/env node
/**
 * Capture a generator's own EXPORT (file download) in a browser opened by session.mjs.
 * Added 2026-09-25 for the MFCG export lane (captures/mfcg/exports-2026-09-25/README.md).
 *
 *   node export.mjs <url> --out <dir> --name <basename> [--max 90000] [--settle 2500] [--shot]
 *
 * One invocation = one navigation. While connected it
 *   1. sets Browser.setDownloadBehavior(allow, eventsEnabled) into <out>/.dl-<name>/ and listens to
 *      Browser.downloadWillBegin / downloadProgress (the file the browser itself saves);
 *   2. hooks URL.createObjectURL, anchor click()/dispatchEvent('click') and window.open on every new document,
 *      so a Blob or data: URL the page creates is also caught in-page (belt and braces; text blobs keep their text);
 *   3. navigates to <url> and waits until every started download completed (or --max ms passed), then --settle ms more.
 * Output: <out>/<name>.<ext> (the browser's download, renamed from its suggested filename), <out>/<name>.blob-<i>.<ext>
 * for in-page blobs whose bytes differ from the download (or when no download happened), <out>/<name>.png with --shot,
 * and one line in <out>/export-log.jsonl (url, suggested filename, sizes, sha1s, console lines, timings).
 * Both the download behaviour and the hook end when this process disconnects.
 *
 * Added 2026-09-26 for the Dwellings export lane (captures/dwellings/exports-2026-09-26/README.md), for generators whose
 * export is a menu or keyboard action rather than a URL key. All optional; without them the behaviour above is unchanged.
 *   --port N            connect to this DevTools port instead of the one in profiler/.session (parallel lanes share that file)
 *   --marker "<regex>"  after the navigation, wait until the page printed a matching console line, then --pre ms (default 800)
 *   --actions "<a> <a> …"  run in order once the page is ready (after --marker): wait:<ms> · key:<Key or Mod+Key> ·
 *                       click:<x>,<y> · rclick:<x>,<y> (right button) · move:<x>,<y> (hover) · shot:<file.png> (relative to --out)
 *                       With --actions, --shot is taken BEFORE the actions (the generated page, not the menu or dialog).
 *   The log line then also holds hrefReady (the URL when the marker appeared) and the executed actions with their times.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import puppeteer from 'puppeteer-core';
import { HERE, parseArgs, sleep } from './lib/common.mjs';

const args = parseArgs(process.argv.slice(2), { max: 90000, settle: 2500, pre: 800 });
const url = args._[0];
if (!url || !args.out || !args.name) { console.error('usage: node export.mjs <url> --out <dir> --name <basename>'); process.exit(2); }
const sessFile = path.join(HERE, '.session');
if (!args.port && !fs.existsSync(sessFile)) { console.error('no running session (start one with: node session.mjs --target mfcg --no-goto)'); process.exit(2); }
const port = args.port ? Number(args.port) : JSON.parse(fs.readFileSync(sessFile, 'utf8')).port;
const out = path.resolve(args.out); fs.mkdirSync(out, { recursive: true });
const dl = path.join(out, `.dl-${args.name}`); fs.rmSync(dl, { recursive: true, force: true }); fs.mkdirSync(dl, { recursive: true });
const sha1 = (b) => crypto.createHash('sha1').update(b).digest('hex');

const browser = await puppeteer.connect({ browserURL: `http://127.0.0.1:${port}`, defaultViewport: null, protocolTimeout: 600000 });
const pages = await browser.pages();
const page = pages[Number(args.tab ?? pages.length - 1)];
const bcdp = await browser.target().createCDPSession();
const downloads = new Map();
bcdp.on('Browser.downloadWillBegin', (e) => downloads.set(e.guid, { guid: e.guid, url: String(e.url).slice(0, 300), suggestedFilename: e.suggestedFilename, state: 'begun', t: Date.now() }));
bcdp.on('Browser.downloadProgress', (e) => { const d = downloads.get(e.guid) || { guid: e.guid }; Object.assign(d, { state: e.state, totalBytes: e.totalBytes, receivedBytes: e.receivedBytes, filePath: e.filePath }); downloads.set(e.guid, d); });
await bcdp.send('Browser.setDownloadBehavior', { behavior: 'allowAndName', downloadPath: dl, eventsEnabled: true });

await page.evaluateOnNewDocument(() => {
  const cap = (window.__exportCap = { blobs: [], anchors: [], opens: [] });
  const oc = URL.createObjectURL.bind(URL);
  URL.createObjectURL = function (o) {
    const u = oc(o);
    try {
      if (o instanceof Blob) {
        const e = { url: u, type: o.type, size: o.size, t: Date.now() }; cap.blobs.push(e);
        if (!/^image\/(png|jpe?g|gif|webp)/.test(o.type)) o.text().then((s) => { e.text = s; });
      }
    } catch (err) { /* never disturb the page */ }
    return u;
  };
  const note = (a, via) => { try { const h = String(a.href); cap.anchors.push({ via, download: a.download, href: h.slice(0, 300), data: h.startsWith('data:') ? h : undefined, t: Date.now() }); } catch (e) { /* ignore */ } };
  const ac = HTMLAnchorElement.prototype.click;
  HTMLAnchorElement.prototype.click = function () { note(this, 'click'); return ac.apply(this, arguments); };
  const de = EventTarget.prototype.dispatchEvent;
  EventTarget.prototype.dispatchEvent = function (ev) { if (this instanceof HTMLAnchorElement && ev && ev.type === 'click') note(this, 'dispatch'); return de.apply(this, arguments); };
  const wo = window.open;
  window.open = function (u) { try { cap.opens.push({ url: String(u).slice(0, 300), t: Date.now() }); } catch (e) { /* ignore */ } return wo.apply(this, arguments); };
});

const consoleLines = [];
page.on('console', (m) => consoleLines.push({ t: Date.now(), type: m.type(), text: m.text().slice(0, 300) }));
const t0 = Date.now();
await page.goto(url, { waitUntil: 'load', timeout: 120000 }).catch((e) => console.error('goto:', e.message));
const marker = args.marker ? new RegExp(args.marker) : null;
const actions = args.actions ? String(args.actions).split(/[\s;]+/).filter(Boolean) : [];
let hrefReady; let markerDt; let shotBefore; const actionLog = [];
if (marker) {
  while (Date.now() - t0 < Number(args.max) && !consoleLines.some((l) => marker.test(l.text))) await sleep(100);
  markerDt = consoleLines.some((l) => marker.test(l.text)) ? Date.now() - t0 : null;
  await sleep(Number(args.pre)); hrefReady = page.url();
}
if (actions.length && args.shot) { await page.screenshot({ path: path.join(out, `${args.name}.png`) }); shotBefore = `${args.name}.png`; }
for (const a of actions) {
  const i = a.indexOf(':'); const op = i < 0 ? a : a.slice(0, i); const arg = i < 0 ? '' : a.slice(i + 1);
  const [x, y] = arg.split(',').map(Number);
  if (op === 'wait') await sleep(Number(arg));
  else if (op === 'key') { const mods = arg.split('+'); const k = mods.pop(); for (const m of mods) await page.keyboard.down(m); await page.keyboard.press(k); for (const m of mods.reverse()) await page.keyboard.up(m); }
  else if (op === 'click') await page.mouse.click(x, y);
  else if (op === 'rclick') await page.mouse.click(x, y, { button: 'right' });
  else if (op === 'move') await page.mouse.move(x, y, { steps: 5 });
  else if (op === 'shot') await page.screenshot({ path: path.isAbsolute(arg) ? arg : path.join(out, arg) });
  else { console.error(`unknown action ${a}`); break; }
  actionLog.push({ a, dt: Date.now() - t0 });
}
const pageBlobs = async () => page.evaluate(() => (window.__exportCap ? window.__exportCap.blobs.length + window.__exportCap.anchors.length : 0)).catch(() => 0);
let firstSeen = 0;
while (Date.now() - t0 < Number(args.max)) {
  const all = [...downloads.values()];
  const done = all.length > 0 && all.every((d) => d.state === 'completed' || d.state === 'canceled');
  const inPage = await pageBlobs();
  if ((done || inPage > 0) && !firstSeen) firstSeen = Date.now();
  if (firstSeen && Date.now() - firstSeen > Number(args.settle) && (all.length === 0 || done)) break;
  await sleep(250);
}
const cap = await page.evaluate(() => window.__exportCap || null).catch(() => null);
const result = { t: new Date().toISOString(), name: args.name, url, hrefAfter: page.url(), wallMs: Date.now() - t0, downloads: [], blobs: [], anchors: [], opens: cap?.opens || [] };
if (marker) Object.assign(result, { marker: args.marker, markerDt, hrefReady });
if (actions.length) result.actions = actionLog;

const dlShas = new Set();
for (const d of downloads.values()) {
  const rec = { suggestedFilename: d.suggestedFilename, state: d.state, totalBytes: d.totalBytes, url: d.url };
  const src = path.join(dl, d.guid);
  if (d.state === 'completed' && fs.existsSync(src)) {
    const ext = path.extname(d.suggestedFilename || '') || '.bin';
    const dst = path.join(out, `${args.name}${downloads.size > 1 ? '.' + result.downloads.length : ''}${ext}`);
    fs.renameSync(src, dst); const buf = fs.readFileSync(dst);
    Object.assign(rec, { file: path.relative(process.cwd(), dst), bytes: buf.length, sha1: sha1(buf) }); dlShas.add(rec.sha1);
  }
  result.downloads.push(rec);
}
(cap?.blobs || []).forEach((b, i) => {
  const rec = { type: b.type, size: b.size, hasText: typeof b.text === 'string' };
  if (rec.hasText) {
    const buf = Buffer.from(b.text, 'utf8'); rec.sha1 = sha1(buf); rec.sameAsDownload = dlShas.has(rec.sha1);
    if (!rec.sameAsDownload) {
      const ext = /svg/.test(b.type) ? '.svg' : /json/.test(b.type) ? '.json' : '.txt';
      const dst = path.join(out, `${args.name}.blob-${i}${ext}`); fs.writeFileSync(dst, buf); rec.file = path.relative(process.cwd(), dst);
    }
  }
  result.blobs.push(rec);
});
result.anchors = (cap?.anchors || []).map((a) => ({ via: a.via, download: a.download, href: a.href.slice(0, 120), dataBytes: a.data ? a.data.length : undefined }));
result.console = consoleLines.filter((l) => !/^\s*$/.test(l.text)).map((l) => ({ dt: l.t - t0, type: l.type, text: l.text }));
if (shotBefore) result.shot = shotBefore;
else if (args.shot) { await page.screenshot({ path: path.join(out, `${args.name}.png`) }); result.shot = `${args.name}.png`; }
fs.rmSync(dl, { recursive: true, force: true });
fs.appendFileSync(path.join(out, 'export-log.jsonl'), JSON.stringify(result) + '\n');
console.log(JSON.stringify({ name: result.name, wallMs: result.wallMs, downloads: result.downloads, blobs: result.blobs, anchors: result.anchors, opens: result.opens, consoleLines: result.console.length }, null, 1));
await bcdp.send('Browser.setDownloadBehavior', { behavior: 'default' }).catch(() => {});
await sleep(50); browser.disconnect();
