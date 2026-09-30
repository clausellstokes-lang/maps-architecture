#!/usr/bin/env node
/**
 * Record what the CPU does while a map generator builds a map.
 *
 *   node record.mjs --target mfcg [--runs 3] [--passes profile,coverage,draw] [--seed 12345]
 *                   [--query "size=40&seed=1"] [--headful] [--regen key:Enter|reload] [--interval 100] [--detailed]
 *                   [--vertices [--max-path-verts 5000]]
 *   node record.mjs --target ftg        → refuses; FTG is one-shot + server-side, use session.mjs/drive.mjs
 *
 * Each pass runs in a fresh browser so they cannot perturb each other:
 *   profile   V8 sampling CPU profiler (default 100 µs) + Chrome trace. No page instrumentation at all.
 *   coverage  V8 precise coverage: exact per-function call counts for the generation (--detailed: plus block counts).
 *   draw      Injected Canvas2D/WebGL/Math.random recorder (lib/instrument.js): what gets drawn, in what
 *             order, with which colours / line widths / fonts / label texts.
 *             --vertices: also the vertex list of every painted path, in canvas pixels → gen-N.paths.json (opt-in;
 *             without it the injected recorder and gen-N.draw.json are exactly as before).
 * Every pass also stores screenshots, console output (watabou builds trace per-stage timings), the final
 * URL (seed + options), and every network response body (so profile offsets can be mapped back to source).
 *
 * Output: captures/<target>/<timestamp>/<pass>/…  then run:  node analyze.mjs <that dir>
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { ROOT, HERE, TARGETS, resolveTargetUrl, parseArgs, stamp, sleep, writeJson, launch, attachRecorders, waitIdle } from './lib/common.mjs';

const args = parseArgs(process.argv.slice(2), { runs: 2, passes: 'profile,coverage,draw', interval: 100 });
const target = args.target;
if (!target || !TARGETS[target]) { console.error(`--target required: ${Object.keys(TARGETS).join(' | ')}`); process.exit(2); }
if (TARGETS[target].manual && !args.url) {
  console.error(`${target}: ${TARGETS[target].label}\nUse:  node session.mjs --target ${target}   (long-lived recorder)  +  node drive.mjs …  (step-by-step driver)`);
  process.exit(2);
}

const baseUrl = args.url || await resolveTargetUrl(target);
const regenMode = args.regen || TARGETS[target].regen || 'reload';
const detailed = !!args.detailed;   // block-level coverage: each function's `ranges` also carries nested block counts
const outRoot = path.join(ROOT, 'captures', target, stamp());
fs.mkdirSync(outRoot, { recursive: true });
const instrumentSrc = fs.readFileSync(path.join(HERE, 'lib', 'instrument.js'), 'utf8');
// --vertices switches on instrument.js's vertex layer by filling in its options marker (see instrument.js header)
const vertices = !!args.vertices;
const OPTS_MARKER = '/*@OPTS@*/{}';
const instrument = vertices
  ? instrumentSrc.replace(OPTS_MARKER, JSON.stringify({ vertices: true, maxPathVerts: Number(args['max-path-verts'] || 5000) }))
  : instrumentSrc;
if (vertices && instrument === instrumentSrc) { console.error('--vertices: options marker not found in lib/instrument.js'); process.exit(2); }
if (vertices && !String(args.passes).split(',').map((s) => s.trim()).includes('draw')) console.warn('--vertices only affects the draw pass, which is not in --passes');

const withQuery = (u, seed) => {
  const url = new URL(u);
  if (args.query) for (const [k, v] of new URLSearchParams(args.query)) url.searchParams.set(k, v);
  if (seed !== undefined) url.searchParams.set('seed', String(seed));
  return url.toString();
};

async function pageState(page) {
  return page.evaluate(() => ({
    href: location.href, title: document.title,
    canvases: [...document.querySelectorAll('canvas')].map((c) => ({ w: c.width, h: c.height })),
  }));
}

async function runPass(pass) {
  const dir = path.join(outRoot, pass); fs.mkdirSync(dir, { recursive: true });
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), `genprof-${target}-`));
  const browser = await launch({ headful: !!args.headful, userDataDir });
  const gens = []; let covOn = false;
  try {
    const page = (await browser.pages())[0] || await browser.newPage();
    const rec = await attachRecorders(page, dir, { tag: pass });
    const cdp = await page.createCDPSession();
    await cdp.send('Profiler.enable');
    // --detailed + reload: a reloaded script must be compiled afresh under block coverage. V8's in-memory compilation
    // cache (off while a debugger is enabled; all pauses skipped) and Chrome's code cache (off with the HTTP cache)
    // would otherwise hand the new document functions without block counters, and hot ones go uncounted.
    if (pass === 'coverage' && detailed) {
      await cdp.send('Debugger.enable'); await cdp.send('Debugger.setSkipAllPauses', { skip: true });
      await rec.cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
    }
    if (pass === 'draw') await page.evaluateOnNewDocument(instrument);
    if (pass === 'profile') await cdp.send('Profiler.setSamplingInterval', { interval: Number(args.interval) });

    const begin = async (name) => {
      lineMark = rec.lines.length;
      if (pass === 'profile') {
        await page.tracing.start({ path: path.join(dir, `${name}.trace.json`),
          categories: ['devtools.timeline', 'v8.execute', 'blink.user_timing', 'disabled-by-default-devtools.timeline', 'disabled-by-default-v8.cpu_profiler'] });
        await cdp.send('Profiler.start');
      }
      // Block counters exist only in code compiled while detailed coverage runs, and stopPreciseCoverage drops them for
      // good, so with --detailed coverage stays on for the whole pass and each generation starts by resetting the counts.
      if (pass === 'coverage' && detailed && covOn) await cdp.send('Profiler.takePreciseCoverage');
      else if (pass === 'coverage') { await cdp.send('Profiler.startPreciseCoverage', { callCount: true, detailed, allowTriggeredUpdates: false }); covOn = true; }
      if (pass === 'draw') await page.evaluate(() => window.__rec && window.__rec.reset()).catch(() => {});
    };
    const marker = TARGETS[target].marker ? new RegExp(TARGETS[target].marker) : null; let lineMark = 0;
    const ready = async () => rec.inflight() === 0
      && (!marker || rec.lines.slice(lineMark).some((l) => marker.test(l)))
      && await page.evaluate(() => [...document.querySelectorAll('canvas')].some((c) => c.width > 0)).catch(() => false);
    const end = async (name, startedAt, how) => {
      const idle = await waitIdle(cdp, { ready });
      if (idle.readyTimedOut) console.log(`  [${pass}] ${name}: WARNING generation marker/network-drain not observed within timeout`);
      const gen = { name, how, wallMs: Date.now() - startedAt, settled: idle.settled, readyAtMs: idle.readyAtMs, markerTimedOut: !!idle.readyTimedOut };
      if (pass === 'profile') {
        const { profile } = await cdp.send('Profiler.stop');
        fs.writeFileSync(path.join(dir, `${name}.cpuprofile`), JSON.stringify(profile));
        await page.tracing.stop();
        gen.samples = profile.samples.length;
      }
      if (pass === 'coverage') {
        const cov = await cdp.send('Profiler.takePreciseCoverage');
        if (!detailed) { await cdp.send('Profiler.stopPreciseCoverage'); covOn = false; }
        writeJson(path.join(dir, `${name}.coverage.json`), cov.result);
      }
      if (pass === 'draw') {
        const snap = await page.evaluate(() => (window.__rec ? { rec: window.__rec.snapshot(), dom: window.__rec.dom() } : null));
        writeJson(path.join(dir, `${name}.draw.json`), snap);
        if (vertices) {   // read at the same moment as the snapshot, so paths.json indexes the same rec.log
          const pj = await page.evaluate(() => (window.__rec && window.__rec.paths ? window.__rec.paths() : null));
          if (pj) { fs.writeFileSync(path.join(dir, `${name}.paths.json`), pj); gen.paths = JSON.parse(pj).counts; gen.pathsBytes = pj.length; }
          else console.log(`  [${pass}] ${name}: WARNING --vertices set but the page returned no path record`);
        }
      }
      Object.assign(gen, await pageState(page));
      await page.screenshot({ path: path.join(dir, `${name}.png`) });
      writeJson(path.join(dir, `${name}.idle.json`), idle);
      gens.push(gen);
      console.log(`  [${pass}] ${name}: ${gen.wallMs} ms wall (${how}) settled=${gen.settled} → ${gen.href}`
      + (gen.paths ? `  paths=${gen.paths.records} vertices=${gen.paths.vertices} skipped=${gen.paths.skippedLong + gen.paths.droppedTotal}` : ''));
    };

    // gen-0 = cold load + first generation (includes engine start-up; separable in the call tree)
    let t = Date.now();
    await begin('gen-0');
    await page.goto(withQuery(baseUrl, args.seed), { waitUntil: 'load', timeout: 120000 });
    await end('gen-0', t, 'cold-load');

    for (let i = 1; i <= Number(args.runs); i++) {
      const name = `gen-${i}`;
      if (regenMode.startsWith('key:')) {
        await page.mouse.click(400, 400); await sleep(400);   // focus the stage; harmless on a map
        await waitIdle(cdp, { minMs: 600, quietPolls: 4 });
        t = Date.now(); await begin(name);
        await page.keyboard.press(regenMode.slice(4));
        await end(name, t, regenMode);
      } else {
        const seed = args.seed !== undefined ? Number(args.seed) + i : undefined;
        t = Date.now(); await begin(name);
        await page.goto(withQuery(baseUrl, seed), { waitUntil: 'load', timeout: 120000 });
        await end(name, t, 'reload');
      }
    }
    rec.close();
  } finally {
    await browser.close().catch(() => {});
    fs.rmSync(userDataDir, { recursive: true, force: true });
  }
  return gens;
}

console.log(`target=${target}  url=${baseUrl}  regen=${regenMode}  out=${outRoot}`);
const meta = { target, label: TARGETS[target].label, baseUrl, regenMode, args, started: new Date().toISOString(),
  chrome: null, host: { platform: process.platform, arch: process.arch, cpus: os.cpus().length, cpu: os.cpus()[0]?.model, node: process.version }, passes: {} };
for (const pass of String(args.passes).split(',')) meta.passes[pass] = await runPass(pass.trim());
meta.finished = new Date().toISOString();
writeJson(path.join(outRoot, 'meta.json'), meta);
console.log(`done → ${outRoot}\nnext: node analyze.mjs ${path.relative(process.cwd(), outRoot)}`);
