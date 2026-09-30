#!/usr/bin/env node
/**
 * Step-by-step driver for a browser opened by session.mjs. Each invocation does ONE thing, so every
 * click on a one-shot site can be looked at first. Artifacts land in the session's capture dir.
 *
 *   node drive.mjs shot [name]                 screenshot → steps/<n>-<name>.png
 *   node drive.mjs text                        visible text + buttons/links/inputs with centre coordinates
 *   node drive.mjs click <x> <y> [--profile name]     click; with --profile: CPU-profile + trace until idle
 *   node drive.mjs clicktext "<label>" [--profile name]   click first visible element whose text matches
 *   node drive.mjs select <nth visible select, 0-based> "<option text regex>" [--profile name]
 *   node drive.mjs key <Key> [--profile name]  ·  type "<text>"  ·  wheel <x> <y> <dy> [--profile name]
 *   node drive.mjs drag <x1> <y1> <x2> <y2> [--profile name]
 *   node drive.mjs eval "<js expression>"      (inspection only)
 *   node drive.mjs goto <url> [--profile name]
 *   node drive.mjs stop                        end the session
 * Profiled steps wait for: no requests in flight, main thread quiet, and (--until-canvas) a canvas present; --max <ms>, --min <ms>.
 * Any step that takes --profile may also take (alone or combined):
 *   --coverage [name]   V8 precise coverage (callCount, not detailed) started before the action and taken when idle
 *                       → steps/<n>-<name>.coverage.json (same format as record.mjs; analyze.mjs → .calls.json)
 *   --draw [name]       resets the draw recorder before the action, snapshots it when idle → steps/<n>-<name>.draw.json
 *                       (needs a session started with --instrument, which injects lib/instrument.js into every document)
 *   --marker "<regex>"  also wait until the page printed a console line matching it (e.g. MFCG "buildGeometry \\d+")
 */
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';
import { HERE, parseArgs, sleep, writeJson, waitIdle } from './lib/common.mjs';

const args = parseArgs(process.argv.slice(2), { interval: 100 });
const [cmd, ...rest] = args._;
const sessFile = path.join(HERE, '.session');
if (!fs.existsSync(sessFile)) { console.error('no running session (start one with: node session.mjs --target ftg)'); process.exit(2); }
const { port, outDir } = JSON.parse(fs.readFileSync(sessFile, 'utf8'));
const stepsDir = path.join(path.dirname(outDir), 'steps'); fs.mkdirSync(stepsDir, { recursive: true });
const nextN = () => String(fs.readdirSync(stepsDir).filter((f) => /^\d+-/.test(f)).map((f) => parseInt(f, 10)).reduce((a, b) => Math.max(a, b), 0) + 1).padStart(3, '0');
const logStep = (o) => fs.appendFileSync(path.join(stepsDir, 'steps.jsonl'), JSON.stringify({ t: new Date().toISOString(), cmd, rest, ...o }) + '\n');

if (cmd === 'stop') { fs.writeFileSync(path.join(outDir, 'STOP'), ''); console.log('stop requested'); process.exit(0); }

const browser = await puppeteer.connect({ browserURL: `http://127.0.0.1:${port}`, defaultViewport: null, protocolTimeout: 600000 });
const pages = await browser.pages();
const page = pages[Number(args.tab ?? pages.length - 1)];
const cdp = await page.createCDPSession();

async function profiled(name, action) {
  const cov = !!args.coverage, draw = !!args.draw;
  const stepName = name || [args.coverage, args.draw].find((v) => typeof v === 'string') || 'step';
  if (!name && !cov && !draw) { await action(); await waitIdle(cdp, { minMs: 800, maxMs: Number(args.max || 60000), quietPolls: 5 }); return {}; }
  const n = nextN(); const base = path.join(stepsDir, `${n}-${stepName}`);
  if (name) {
    await cdp.send('Profiler.enable'); await cdp.send('Profiler.setSamplingInterval', { interval: Number(args.interval) });
    await cdp.send('Profiler.start');
  }
  // Precise coverage lives in THIS CDP session (it ends when drive.mjs disconnects), so start and take happen in one step.
  if (cov) { await cdp.send('Profiler.enable'); await cdp.send('Profiler.startPreciseCoverage', { callCount: true, detailed: false, allowTriggeredUpdates: false }); }
  if (draw) await page.evaluate(() => window.__rec && window.__rec.reset()).catch(() => {});
  const marker = args.marker ? new RegExp(args.marker) : null; let markerSeen = !marker;
  if (marker) page.on('console', (m) => { if (marker.test(m.text())) markerSeen = true; });
  // Server-side generators answer after seconds of silence: never call it finished while requests are in flight
  // (and, with --until-canvas, before a canvas exists).
  const inflight = new Map(); await cdp.send('Network.enable');
  cdp.on('Network.requestWillBeSent', (e) => { if (!/^data:|^blob:|google-analytics|sentry\.io/.test(e.request.url)) inflight.set(e.requestId, Date.now()); });
  cdp.on('Network.loadingFinished', (e) => inflight.delete(e.requestId)); cdp.on('Network.loadingFailed', (e) => inflight.delete(e.requestId));
  // a navigation cancels requests without a finish event — entries older than 30 s are treated as gone
  const pending = () => [...inflight.values()].filter((t) => Date.now() - t < 30000).length;
  const ready = async () => pending() === 0 && markerSeen && (!args['until-canvas'] || await page.evaluate(() => [...document.querySelectorAll('canvas')].some((c) => c.width > 0)).catch(() => false));
  const t0 = Date.now(); await action();
  const idle = await waitIdle(cdp, { minMs: Number(args.min || 1500), maxMs: Number(args.max || 120000), quietPolls: 8, quietMs: Number(args.quiet || 12), ready, readyTimeoutMs: Number(args.max || 120000) });
  const out = { wallMs: Date.now() - t0, settled: idle.settled, markerSeen: marker ? markerSeen : undefined, href: page.url() };
  if (name) {
    const { profile } = await cdp.send('Profiler.stop');
    fs.writeFileSync(`${base}.cpuprofile`, JSON.stringify(profile)); out.profile = `${base}.cpuprofile`;
  }
  if (cov) {
    const { result } = await cdp.send('Profiler.takePreciseCoverage'); await cdp.send('Profiler.stopPreciseCoverage');
    writeJson(`${base}.coverage.json`, result); out.coverage = `${base}.coverage.json`;
  }
  if (draw) {
    const snap = await page.evaluate(() => (window.__rec ? { rec: window.__rec.snapshot(), dom: window.__rec.dom() } : null)).catch(() => null);
    writeJson(`${base}.draw.json`, snap); out.draw = snap ? `${base}.draw.json` : 'no recorder (start the session with --instrument)';
  }
  writeJson(`${base}.idle.json`, idle);
  await page.screenshot({ path: `${base}.png` });
  return out;
}

const describe = () => page.evaluate(() => {
  const vis = (e) => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return r.width > 2 && r.height > 2 && s.visibility !== 'hidden' && s.display !== 'none' && r.bottom > 0 && r.top < innerHeight; };
  const items = [...document.querySelectorAll('button,a,input,select,textarea,[role=button],[role=tab],[role=checkbox],[role=slider],[role=combobox],label')].filter(vis).slice(0, 150).map((e) => {
    const r = e.getBoundingClientRect();
    return { tag: e.tagName.toLowerCase(), role: e.getAttribute('role'), type: e.type, text: (e.innerText || e.value || e.getAttribute('aria-label') || e.placeholder || '').trim().slice(0, 80), checked: e.checked, x: Math.round(r.x + r.width / 2), y: Math.round(r.y + r.height / 2), href: e.href };
  });
  return { href: location.href, title: document.title, text: document.body.innerText.slice(0, 6000), items,
    canvases: [...document.querySelectorAll('canvas')].map((c) => ({ w: c.width, h: c.height })), viewport: { w: innerWidth, h: innerHeight } };
});

let result = {};
switch (cmd) {
  case 'shot': { const f = path.join(stepsDir, `${nextN()}-${rest[0] || 'shot'}.png`); await page.screenshot({ path: f, fullPage: !!args.full }); result = { file: f, href: page.url() }; break; }
  case 'text': result = await describe(); break;
  case 'click': result = await profiled(args.profile, () => page.mouse.click(Number(rest[0]), Number(rest[1]))); break;
  case 'clicktext': {
    const pos = await page.evaluate((label) => {
      const re = new RegExp(label, 'i');
      // only elements that would really receive the click (a page button hidden behind a modal must not match)
      const hit = (e) => { const r = e.getBoundingClientRect(); if (r.width <= 2) return false; const t = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2); return !!t && (e === t || e.contains(t)); };
      const el = [...document.querySelectorAll('button,a,[role=button],[role=tab],label,input[type=submit]')].find((e) => re.test((e.innerText || e.value || '').trim()) && hit(e));
      if (!el) return null; const r = el.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2, text: (el.innerText || el.value).trim().slice(0, 80) };
    }, rest[0]);
    if (!pos) { result = { error: `no visible element matching /${rest[0]}/i` }; break; }
    result = { clicked: pos, ...(await profiled(args.profile, () => page.mouse.click(pos.x, pos.y))) }; break;
  }
  case 'select': {
    const handle = await page.evaluateHandle((n) => [...document.querySelectorAll('select')].filter((e) => e.getBoundingClientRect().width > 2)[n], Number(rest[0]));
    const el = handle.asElement(); if (!el) { result = { error: 'no such select' }; break; }
    const value = await el.evaluate((s, t) => { const re = new RegExp(t, 'i'); const o = [...s.options].find((o) => re.test(o.text.trim())); return o ? o.value : null; }, rest[1]);
    if (value === null) { result = { error: `no option matching /${rest[1]}/i` }; break; }
    result = { selected: value, ...(await profiled(args.profile, () => el.select(value))) }; break;
  }
  case 'key': result = await profiled(args.profile, () => page.keyboard.press(rest[0])); break;
  case 'type': await page.keyboard.type(rest[0], { delay: 20 }); break;
  case 'wheel': result = await profiled(args.profile, async () => { await page.mouse.move(Number(rest[0]), Number(rest[1])); await page.mouse.wheel({ deltaY: Number(rest[2]) }); }); break;
  case 'drag': result = await profiled(args.profile, async () => { await page.mouse.move(Number(rest[0]), Number(rest[1])); await page.mouse.down(); await page.mouse.move(Number(rest[2]), Number(rest[3]), { steps: 12 }); await page.mouse.up(); }); break;
  case 'eval': result = { value: await page.evaluate(rest[0]) }; break;
  case 'goto': result = await profiled(args.profile, () => page.goto(rest[0], { waitUntil: 'networkidle2', timeout: 120000 })); break;
  default: console.error('unknown command; see header of drive.mjs'); process.exit(2);
}
logStep({ result: cmd === 'text' ? { href: result.href } : result });
console.log(typeof result === 'string' ? result : JSON.stringify(result, null, 1));
await sleep(50); browser.disconnect();
