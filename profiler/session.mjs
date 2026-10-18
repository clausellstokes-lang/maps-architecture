#!/usr/bin/env node
/**
 * Long-lived recording session for generators that must be driven by hand / step by step
 * (Fantasy Town Generator: generation is SERVER-side and only ONE new settlement per IP per day,
 * so nothing may be lost and nothing may be clicked blindly).
 *
 *   node session.mjs --target ftg [--headful] [--port 9333] [--url …]
 *
 * It opens the page, then only RECORDS: every network request/response body (the settlement payload),
 * websocket frames, console output — streamed to disk as they happen. It never clicks anything.
 * Drive it from a second terminal with drive.mjs (screenshot / click / type / profile …).
 * The browser profile is persistent (profiler/.profiles/<target>) so the site's guest identity survives.
 * Stop with Ctrl-C or:  touch <capture dir>/STOP
 */
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, HERE, TARGETS, resolveTargetUrl, parseArgs, stamp, sleep, writeJson, launch, attachRecorders } from './lib/common.mjs';

const args = parseArgs(process.argv.slice(2), { port: 9333 });
const target = args.target || 'ftg';
const url = args.url || await resolveTargetUrl(target);
const outDir = path.join(ROOT, 'captures', target, stamp(), 'session');
fs.mkdirSync(outDir, { recursive: true });
const userDataDir = path.join(HERE, '.profiles', target);
fs.mkdirSync(userDataDir, { recursive: true });

const browser = await launch({ headful: !!args.headful, userDataDir, port: Number(args.port) });
const page = (await browser.pages())[0] || await browser.newPage();
if (args.instrument) await page.evaluateOnNewDocument(fs.readFileSync(path.join(HERE, 'lib', 'instrument.js'), 'utf8'));
const rec = await attachRecorders(page, outDir, { tag: 'session', intercept: String(args.intercept || '*execute-api*').split(',') });
browser.on('targetcreated', async (t) => {          // popups / new tabs get recorded too
  const p = await t.page().catch(() => null); if (p && p !== page) await attachRecorders(p, outDir, { tag: `tab-${Date.now()}` }).catch(() => {});
});
writeJson(path.join(outDir, 'session.json'), { target, label: TARGETS[target]?.label, url, port: Number(args.port), started: new Date().toISOString(), outDir });
fs.writeFileSync(path.join(HERE, '.session'), JSON.stringify({ port: Number(args.port), outDir }));
if (!args['no-goto']) await page.goto(url, { waitUntil: 'networkidle2', timeout: 120000 }).catch((e) => console.error('goto:', e.message));
console.log(`recording → ${outDir}\nbrowser on http://127.0.0.1:${args.port}  (drive with: node drive.mjs …)`);

let stopping = false;
const stop = async () => {
  if (stopping) return; stopping = true;
  rec.close(); await browser.close().catch(() => {}); fs.rmSync(path.join(HERE, '.session'), { force: true });
  console.log('session closed'); process.exit(0);
};
process.on('SIGINT', stop); process.on('SIGTERM', stop);
while (!fs.existsSync(path.join(outDir, 'STOP'))) await sleep(1000);
await stop();
