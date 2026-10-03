#!/usr/bin/env node
/**
 * M-1 W-04: the NG recording programme (research-side tool; numbers and files only).
 * Drives profiler/record.mjs UNCHANGED, one invocation per plan seed of research/baselines/plan.json (the 44 entries of
 * the capture/NG/<template>/<size> families), each invocation exactly the entry's own `record` argument list
 * (--target neighbourhood --runs 0 --passes draw --vertices --seed <S> --query tags=<template>,<size>) plus --url, so
 * record.mjs does not re-fetch the public game page 44 times: the build url comes from the one build-id check
 * (<out>/build-check.json, written before the programme by profiler/lib/common.mjs resolveTargetUrl).
 *
 * Owner approval J159 (3): 44 automated loads of the public build, no downloads. One record.mjs invocation with --runs 0
 * is one cold page load (gen-0 only, no regeneration). The guard:
 *   - <out>/loads.jsonl gets a `start` line BEFORE each invocation and an `end` line after it;
 *   - a label that already has a `start` line is never loaded again (a failed load is recorded, never retried);
 *   - the programme stops when the `start` lines reach --cap (default 44).
 * Disk: `df -k /Users/cstokes` before every load and after the last, logged to <out>/disk.log; under --min-free-gb
 * (default 1) the programme stops before the next load.
 * A hung invocation is killed after --timeout ms (default 240000) with its Chrome (the Chrome processes whose command line
 * carries record.mjs's temporary profile prefix and that were not running before the invocation).
 * Order (M-1 plan section 2.3 and the lane brief): medium first (M0 (b) input), then small, then large; inside a size,
 * index-major over the templates area, street, square, ring, so a programme cut short keeps the templates balanced.
 *
 *   node research/baselines/ng_programme_m1.mjs --out captures/neighbourhood/ng-programme-m1-<date>
 *        [--plan research/baselines/plan.json] [--profiler profiler] [--cap 44] [--only name,name] [--sizes medium,small,large]
 *        [--timeout 240000] [--min-free-gb 1] [--dry-run]
 * Output in <out>: loads.jsonl, disk.log, logs/<name>.log (record.mjs's stdout and stderr), index.json (label -> capture
 * folder, rebuilt from loads.jsonl after every load). The capture folders themselves are record.mjs's
 * captures/neighbourhood/<stamp>/ (meta.json, draw/gen-0.{draw.json,paths.json,png,idle.json}, console.jsonl, network/).
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawn, execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const MAPS = path.resolve(HERE, '..', '..');
const parse = (argv) => { const o = {}; for (let i = 0; i < argv.length; i++) { const a = argv[i]; if (!a.startsWith('--')) continue; const k = a.slice(2); if (i + 1 < argv.length && !argv[i + 1].startsWith('--')) o[k] = argv[++i]; else o[k] = true; } return o; };
const args = { plan: path.join(MAPS, 'research/baselines/plan.json'), profiler: path.join(MAPS, 'profiler'), cap: 44, timeout: 240000,
  'min-free-gb': 1, sizes: 'medium,small,large', ...parse(process.argv.slice(2)) };
if (!args.out) { console.error('missing --out'); process.exit(2); }
const out = path.resolve(args.out); fs.mkdirSync(path.join(out, 'logs'), { recursive: true });
const cap = Number(args.cap); const timeoutMs = Number(args.timeout); const minFreeKB = Number(args['min-free-gb']) * 1024 * 1024;
const recordJs = path.join(path.resolve(args.profiler), 'record.mjs');
const sha1 = (f) => crypto.createHash('sha1').update(fs.readFileSync(f)).digest('hex');
const now = () => new Date().toISOString();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const loadsFile = path.join(out, 'loads.jsonl'); const diskFile = path.join(out, 'disk.log');
const readJsonl = (f) => (fs.existsSync(f) ? fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l)) : []);
const append = (f, o) => fs.appendFileSync(f, (typeof o === 'string' ? o : JSON.stringify(o)) + '\n');

// --- the build url: from the one build-id check, never re-resolved here
const bc = JSON.parse(fs.readFileSync(path.join(out, 'build-check.json'), 'utf8'));
if (!bc.match && !args['allow-drift']) { console.error(`build drift: ${bc.buildId} != ${bc.expected}; the owner is told first (plan section 5 (4))`); process.exit(3); }
const buildUrl = bc.resolvedUrl;

// --- the plan's entries, in programme order
const plan = JSON.parse(fs.readFileSync(args.plan, 'utf8'));
const TEMPLATES = ['area', 'street', 'square', 'ring'];
const sizes = String(args.sizes).split(',');
const fams = plan.families.filter((f) => f.reference === 'NG' && f.workItem === 'W-04');
const entries = [];
for (const size of sizes) {
  const fs_ = TEMPLATES.map((t) => fams.find((f) => f.setting.template === t && f.setting.size === size)).filter(Boolean);
  const n = Math.max(0, ...fs_.map((f) => f.entries.length));
  for (let i = 0; i < n; i++) for (const f of fs_) { const e = f.entries.find((x) => x.i === i); if (e) entries.push({ ...e, family: f.family, template: f.setting.template, size }); }
}
const only = args.only ? new Set(String(args.only).split(',')) : null;
const todo = entries.filter((e) => !only || only.has(e.name));
for (const e of todo) {   // the record args must be the plan's own shape; refuse anything else
  const a = e.record; const want = ['--target', 'neighbourhood', '--runs', '0', '--passes', 'draw', '--vertices', '--seed', String(e.seed), '--query', `tags=${e.template},${e.size}`];
  if (JSON.stringify(a) !== JSON.stringify(want)) { console.error(`plan entry ${e.label}: unexpected record args ${JSON.stringify(a)}`); process.exit(2); }
}

const freeKB = () => { const l = execFileSync('df', ['-k', '/Users/cstokes'], { encoding: 'utf8' }).trim().split('\n').pop().split(/\s+/); return Number(l[3]); };
const dfLine = (tag) => { const h = execFileSync('df', ['-h', '/Users/cstokes'], { encoding: 'utf8' }).trim().split('\n').pop(); append(diskFile, `${now()} ${tag}: ${h}`); };
const chromePids = () => { try { return new Set(execFileSync('pgrep', ['-f', 'genprof-neighbourhood-'], { encoding: 'utf8' }).split('\n').filter(Boolean).map(Number)); } catch { return new Set(); } };

function writeIndex() {
  const L = readJsonl(loadsFile); const idx = {};
  for (const r of L) { if (r.phase === 'start') idx[r.label] = { n: r.n, name: r.name, seed: r.seed, tags: r.tags, startedAt: r.at };
    if (r.phase === 'end' && idx[r.label]) Object.assign(idx[r.label], { folder: r.folder, exit: r.exit, ms: r.ms, timedOut: r.timedOut || false, gen0: r.gen0 || null }); }
  fs.writeFileSync(path.join(out, 'index.json'), JSON.stringify({ schema: 'research.ng-programme/1', lane: 'm1/W-04', build: bc.buildId, buildUrl,
    recordSha1: sha1(recordJs), instrumentSha1: sha1(path.join(path.dirname(recordJs), 'lib', 'instrument.js')), cap, loads: idx }, null, 1));
}

function runOne(e, n) {
  return new Promise((resolve) => {
    const argv = [recordJs, '--url', buildUrl, ...e.record];
    const log = fs.createWriteStream(path.join(out, 'logs', `${e.name}.log`), { flags: 'a' });
    log.write(`# ${now()} node ${argv.map((a) => (/[\s,&]/.test(a) ? JSON.stringify(a) : a)).join(' ')}\n`);
    const before = chromePids(); const t0 = Date.now(); let folder = null; let buf = ''; let timedOut = false;
    const ch = spawn(process.execPath, argv, { cwd: path.dirname(recordJs), detached: true, stdio: ['ignore', 'pipe', 'pipe'] });
    const onData = (d) => { const s = d.toString(); log.write(s); buf += s; const m = buf.match(/out=(\S+)/); if (m && !folder) folder = m[1]; };
    ch.stdout.on('data', onData); ch.stderr.on('data', (d) => log.write(d));
    // The clean-up belongs to THIS invocation and finishes before the promise resolves, so it can never reach the
    // next invocation's Chrome (a red run on the mock showed a delayed kill landing on the following load).
    const reap = () => { let k = 0; for (const p of chromePids()) if (!before.has(p)) { try { process.kill(p, 'SIGKILL'); k++; } catch {} } return k; };
    let cleanup = Promise.resolve(0);
    const killer = setTimeout(() => {
      timedOut = true; log.write(`# ${now()} TIMEOUT after ${timeoutMs} ms: killing record.mjs and its new Chrome processes\n`);
      try { process.kill(-ch.pid, 'SIGTERM'); } catch {}
      cleanup = sleep(5000).then(() => { try { process.kill(-ch.pid, 'SIGKILL'); } catch {} return reap(); });
    }, timeoutMs);
    ch.on('exit', async (code, sig) => {
      clearTimeout(killer);
      const reaped = (await cleanup) + (await sleep(1000).then(reap));   // record.mjs closes its browser in `finally`; anything left is reaped
      if (reaped) log.write(`# ${now()} reaped ${reaped} leftover Chrome process(es)\n`);
      log.end();
      let gen0 = null;
      if (folder) { try { const m = JSON.parse(fs.readFileSync(path.join(folder, 'meta.json'), 'utf8')); const g = (m.passes.draw || [])[0]; if (g) gen0 = { settled: g.settled, markerTimedOut: g.markerTimedOut, href: g.href, paths: g.paths || null }; } catch {} }
      resolve({ folder: folder ? path.relative(MAPS, folder) : null, exit: code, signal: sig || null, timedOut, reaped, ms: Date.now() - t0, gen0 });
    });
  });
}

const L0 = readJsonl(loadsFile);
let started = L0.filter((r) => r.phase === 'start').length;
const loaded = new Set(L0.filter((r) => r.phase === 'start').map((r) => r.label));
console.log(`build ${bc.buildId} ${buildUrl}; ${todo.length} entries selected; ${started} loads already recorded; cap ${cap}`);
if (args['dry-run']) { for (const e of todo) console.log(`${loaded.has(e.label) ? 'done ' : 'todo '} ${e.label} seed ${e.seed} -> ${e.name}`); process.exit(0); }
for (const e of todo) {
  if (loaded.has(e.label)) { console.log(`skip ${e.label}: already loaded (never re-loaded)`); continue; }
  if (started >= cap) { console.log(`stop: ${started} loads recorded = cap ${cap}`); break; }
  dfLine(`before ${e.name}`);
  if (freeKB() < minFreeKB) { console.log(`stop: free space under ${args['min-free-gb']} GB before ${e.name}`); append(diskFile, `${now()} STOP free space under ${args['min-free-gb']} GB`); break; }
  const n = ++started; loaded.add(e.label);
  append(loadsFile, { phase: 'start', n, at: now(), label: e.label, name: e.name, seed: e.seed, tags: `${e.template},${e.size}`, build: bc.buildId });
  const r = await runOne(e, n);
  append(loadsFile, { phase: 'end', n, at: now(), label: e.label, ...r });
  writeIndex();
  const p = r.gen0 && r.gen0.paths;
  console.log(`${String(n).padStart(2)} ${e.name} seed ${e.seed}: exit ${r.exit}${r.timedOut ? ' TIMEOUT' : ''} ${r.ms} ms settled=${r.gen0 && r.gen0.settled} `
    + (p ? `records=${p.records} vertices=${p.vertices} skipped=${p.skippedLong} dropped=${p.droppedTotal}` : 'no paths') + ` -> ${r.folder}`);
}
dfLine('after programme');
writeIndex();
