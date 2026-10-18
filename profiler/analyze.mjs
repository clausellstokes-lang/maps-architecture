#!/usr/bin/env node
/**
 * Turn a capture directory (from record.mjs / drive.mjs) into a readable report.
 *   node analyze.mjs ../captures/mfcg/<timestamp> [--top 60] [--tree-min 0.4] [--root "City.build"]
 * Writes report.md + report.json next to the capture. Handles, per pass directory:
 *   *.cpuprofile     self/total time per function + pruned call tree, attributed to Haxe classes
 *   *.coverage.json  exact call counts per function/class
 *   *.draw.json      palette, line widths, fonts, label texts, draw/layer order
 *   console.jsonl    stage timings the watabou builds trace themselves
 */
import fs from 'node:fs';
import path from 'node:path';
import { parseArgs, writeJson } from './lib/common.mjs';

const args = parseArgs(process.argv.slice(2), { top: 60, 'tree-min': 0.4 });
const capDir = path.resolve(args._[0] || '.');
if (!fs.existsSync(capDir)) { console.error('no such capture dir'); process.exit(2); }
const TOP = Number(args.top);
const md = []; const out = { capture: capDir, passes: {} };
const H = (s) => md.push('', s, '');
const ms = (us) => (us / 1000).toFixed(1);
const table = (head, rows) => { md.push(`| ${head.join(' | ')} |`, `|${head.map(() => '---').join('|')}|`, ...rows.map((r) => `| ${r.join(' | ')} |`), ''); };

/** Map script url → source text, from the recorder's network bodies. */
function loadSources(passDir) {
  let idx = path.join(passDir, 'network', 'index.jsonl'); const m = new Map();
  // drive.mjs writes steps/ next to session/, whose network/ holds the bodies both share
  if (!fs.existsSync(idx)) idx = path.join(path.dirname(passDir), 'session', 'network', 'index.jsonl');
  if (!fs.existsSync(idx)) return m;
  for (const line of fs.readFileSync(idx, 'utf8').split('\n').filter(Boolean)) {
    const r = JSON.parse(line);
    if (r.bodyFile && /\.(js|html)$/.test(r.bodyFile)) m.set(r.url, path.join(path.dirname(idx), 'bodies', r.bodyFile));
  }
  return m;
}

/**
 * Haxe→JS builds keep `Var.__name__="pkg.Class"` markers even when local names are mangled. A class's constructor
 * `Var=function` precedes its marker, its statics + prototype follow the marker; its byte range runs from its
 * constructor to the next class's constructor (the marker when no constructor is found).
 * Code outside every class range is `(unattributed).fn`, never the nearest class (labelfix 2026-09-25): the preamble
 * before the first class (Lime wrapper, polyfills, `$extend`) and everything from Haxe's core-type registrations
 * (`String/Array/Date.__name__`, which follow the last class) on — static initialisers up to the entry call
 * `ApplicationMain.main()`, then Lime's embed glue and the embedded JS libraries. Minified builds reuse class var
 * names for locals, so a name → class match (constructor `Var`, V8-inferred `Var.fn`) counts only next to that
 * class's marker; `Var.fn` also counts in the static initialisers.
 */
const BOOT_TYPES = new Set(['String', 'Array', 'Date']);
class Attribution {
  constructor(file) {
    this.src = fs.readFileSync(file, 'utf8');
    this.lineStarts = [0];
    for (let i = 0; i < this.src.length; i++) if (this.src.charCodeAt(i) === 10) this.lineStarts.push(i + 1);
    this.markers = []; this.varToIdx = new Map(); this.spanEnd = this.src.length; let seen = 0;
    const re = /([A-Za-z_$][\w$]*)\.__name__\s*=\s*"([^"]+)"/g; let m;
    while ((m = re.exec(this.src))) {
      seen++; if (BOOT_TYPES.has(m[2]) && m[1] === m[2]) this.spanEnd = Math.min(this.spanEnd, m.index);
      if (m.index < this.spanEnd) { this.varToIdx.set(m[1], this.markers.length); this.markers.push({ off: m.index, cls: m[2], v: m[1] }); }
    }
    this.haxe = seen > 20;
    const am = this.markers.find((k) => k.cls === 'ApplicationMain');
    const e = am ? this.src.indexOf(`${am.v}.main()`, this.spanEnd) : -1; this.initEnd = e >= 0 ? e : this.spanEnd;
    this.markers.forEach((k, i) => {                  // range start: the last `Var=function` between the previous marker and this one
      const lo = i ? this.markers[i - 1].off : 0; const seg = this.src.slice(lo, k.off); let c, at = -1;
      const ctor = new RegExp(`(^|[^\\w$.])${k.v.replace(/\$/g, '\\$')}\\s*=\\s*function\\b`, 'g');
      while ((c = ctor.exec(seg))) at = c.index + c[1].length;
      k.start = at >= 0 ? lo + at : k.off;
    });
  }
  offset(line, col) { return (this.lineStarts[line] ?? 0) + col; }
  idxAt(off) {                                      // index of the class whose range holds off, -1 outside all classes
    if (!this.markers.length || off >= this.spanEnd || off < this.markers[0].start) return -1;
    let lo = 0, hi = this.markers.length - 1, ans = -1;
    while (lo <= hi) { const mid = (lo + hi) >> 1; if (this.markers[mid].start <= off) { ans = mid; lo = mid + 1; } else hi = mid - 1; }
    return ans;
  }
  named(v, off) {                                   // the class of var v, if off lies between its neighbouring markers
    const i = this.varToIdx.get(v); if (i === undefined) return null;
    return off >= (i ? this.markers[i - 1].off : this.markers[0].start) && off < (this.markers[i + 1]?.off ?? this.spanEnd) ? this.markers[i].cls : null;
  }
  label(fnName, off) {
    if (!this.haxe) return fnName || `(anon@${off})`;
    const i = this.idxAt(off); const cls = i >= 0 ? this.markers[i].cls : '(unattributed)';
    const ctor = fnName && this.named(fnName, off); if (ctor) return `${ctor}.new`;
    if (fnName && fnName.includes('.')) {             // V8-inferred `Ns.Var.staticFn` — keep only the method
      const parts = fnName.split('.'); const method = parts.pop(); const v = parts.pop();
      const init = off >= this.spanEnd && off < this.initEnd && this.varToIdx.has(v) ? this.markers[this.varToIdx.get(v)].cls : null;
      return `${this.named(v, off) || init || cls}.${method}`;
    }
    return `${cls}.${fnName || `(anon@${off})`}`;
  }
}
const attrCache = new Map();
const attributionFor = (sources, url) => {
  if (!sources.has(url)) return null;
  if (!attrCache.has(sources.get(url))) attrCache.set(sources.get(url), new Attribution(sources.get(url)));
  return attrCache.get(sources.get(url));
};
const pkgOf = (label) => { const p = label.split('.'); return p.length > 2 ? p.slice(0, -2).join('.') : '(global)'; };
const clsOf = (label) => { const p = label.split('.'); return p.length > 1 ? p.slice(0, -1).join('.') : '(global)'; };

function analyzeProfile(file, sources) {
  const prof = JSON.parse(fs.readFileSync(file, 'utf8'));
  const byId = new Map(prof.nodes.map((n) => [n.id, { ...n, self: 0, total: 0 }]));
  const deltas = prof.timeDeltas || [];
  prof.samples.forEach((id, i) => { const n = byId.get(id); if (n) n.self += deltas[i] || 0; });
  for (const n of byId.values()) {
    const cf = n.callFrame; const a = attributionFor(sources, cf.url);
    n.label = cf.url ? (a ? a.label(cf.functionName, a.offset(cf.lineNumber, cf.columnNumber)) : `${cf.functionName || '(anon)'} [${path.basename(cf.url.split('?')[0])}:${cf.lineNumber}:${cf.columnNumber}]`)
      : cf.functionName || '(native)';
  }
  const root = byId.get(prof.nodes[0].id);
  const fn = new Map(); const get = (k) => fn.get(k) || fn.set(k, { label: k, self: 0, total: 0 }).get(k);
  (function walk(n, stack) {                      // recursion-safe inclusive time
    const added = !stack.has(n.label); if (added) stack.add(n.label);
    get(n.label).self += n.self; for (const k of stack) get(k).total += n.self;
    n.total = n.self;
    for (const c of n.children || []) { const ch = byId.get(c); walk(ch, stack); n.total += ch.total; }
    if (added) stack.delete(n.label);
  })(root, new Set());
  const meta = ['(root)', '(idle)', '(program)', '(garbage collector)'];
  const wall = root.total; const idle = (fn.get('(idle)') || {}).self || 0; const busy = wall - idle;
  const fns = [...fn.values()].filter((f) => !meta.includes(f.label));
  const byClass = new Map();
  for (const f of fns) { const c = clsOf(f.label); byClass.set(c, (byClass.get(c) || 0) + f.self); }
  const tree = []; const minUs = busy * Number(args['tree-min']) / 100; const rootRe = args.root ? new RegExp(args.root) : null;
  (function emit(n, depth, on) {
    const here = on || (rootRe && rootRe.test(n.label));
    if (here && !meta.includes(n.label) && n.total >= minUs) tree.push(`${'  '.repeat(Math.min(depth, 40))}${n.label}  — total ${ms(n.total)} ms, self ${ms(n.self)} ms`);
    for (const c of (n.children || []).map((c) => byId.get(c)).sort((a, b) => b.total - a.total)) if (c.total >= minUs) emit(c, here ? depth + 1 : depth, here);
  })(root, 0, !rootRe);
  return {
    wallMs: +ms(wall), idleMs: +ms(idle), busyMs: +ms(busy), gcMs: +ms((fn.get('(garbage collector)') || {}).self || 0),
    programMs: +ms((fn.get('(program)') || {}).self || 0), samples: prof.samples.length,
    topSelf: fns.sort((a, b) => b.self - a.self).slice(0, TOP).map((f) => ({ label: f.label, selfMs: +ms(f.self), totalMs: +ms(f.total) })),
    topTotal: [...fns].sort((a, b) => b.total - a.total).slice(0, TOP).map((f) => ({ label: f.label, selfMs: +ms(f.self), totalMs: +ms(f.total) })),
    byClass: [...byClass.entries()].sort((a, b) => b[1] - a[1]).slice(0, TOP).map(([c, us]) => ({ cls: c, selfMs: +ms(us) })),
    tree,
  };
}

function analyzeCoverage(file, sources) {
  const cov = JSON.parse(fs.readFileSync(file, 'utf8')); const rows = []; let defined = 0;
  for (const s of cov) {
    const a = attributionFor(sources, s.url); if (!s.url || /^(pptr:|chrome|devtools)/.test(s.url)) continue;
    for (const f of s.functions) {
      defined++; const r = f.ranges[0]; if (!r || !r.count) continue;
      rows.push({ label: a ? a.label(f.functionName, r.startOffset) : `${f.functionName || '(anon)'} [${path.basename(s.url.split('?')[0])}@${r.startOffset}]`, calls: r.count, bytes: r.endOffset - r.startOffset });
    }
  }
  const merged = new Map();
  for (const r of rows) { const m = merged.get(r.label) || merged.set(r.label, { label: r.label, calls: 0, bytes: 0 }).get(r.label); m.calls += r.calls; m.bytes += r.bytes; }
  const fns = [...merged.values()].sort((a, b) => b.calls - a.calls);
  const byClass = new Map();
  for (const f of fns) { const c = clsOf(f.label); const e = byClass.get(c) || byClass.set(c, { cls: c, calls: 0, fns: 0 }).get(c); e.calls += f.calls; e.fns++; }
  return { functionsDefined: defined, functionsExecuted: rows.length, totalCalls: rows.reduce((s, r) => s + r.calls, 0),
    top: fns.slice(0, TOP), byClass: [...byClass.values()].sort((a, b) => b.calls - a.calls), all: fns };
}

function analyzeDraw(file) {
  const j = JSON.parse(fs.readFileSync(file, 'utf8')); if (!j || !j.rec) return null; const r = j.rec;
  const sortObj = (o, n = 40) => Object.entries(o || {}).sort((a, b) => b[1] - a[1]).slice(0, n);
  const runs = [];                                  // layer order: consecutive paint ops with the same op+style
  for (const e of r.log) {
    const [t, op, canvas, a, b, c] = e; if (op === 'drawImage') continue;
    const key = `${op} ${a}${c !== undefined ? ` w${c}` : ''} on ${canvas}`; const last = runs[runs.length - 1];
    if (last && last.key === key) { last.n++; last.segs += typeof b === 'number' ? b : 0; last.t1 = t; } else runs.push({ key, n: 1, segs: typeof b === 'number' ? b : 0, t0: t, t1: t });
  }
  return { dom: j.dom, random: r.random, canvas2d: sortObj(r.canvas2d, 60), webgl: sortObj(r.webgl), fillStyles: sortObj(r.fillStyles), strokeStyles: sortObj(r.strokeStyles),
    lineWidths: sortObj(r.lineWidths), lineJoins: sortObj(r.lineJoins), lineCaps: sortObj(r.lineCaps), dashes: sortObj(r.dashes), fonts: sortObj(r.fonts),
    pathSegs: r.pathSegs, canvases: sortObj(r.canvases), textCount: r.textCount, texts: r.texts, logLen: r.log.length, logDropped: r.logDropped, layerRuns: runs };
}

function consoleStages(passDir) {
  const f = path.join(passDir, 'console.jsonl'); if (!fs.existsSync(f)) return [];
  return fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l)).filter((l) => l.type !== 'warn').map((l) => l.text);
}

H(`# Generation capture report — ${path.relative(path.dirname(path.dirname(capDir)), capDir)}`);
const metaFile = path.join(capDir, 'meta.json');
if (fs.existsSync(metaFile)) { const m = JSON.parse(fs.readFileSync(metaFile, 'utf8')); out.meta = m; md.push(`- target: **${m.label}**`, `- url: ${m.baseUrl}`, `- host: ${m.host.cpu} ×${m.host.cpus}, ${m.host.platform}/${m.host.arch}`, `- recorded: ${m.started}`); }

for (const pass of fs.readdirSync(capDir).filter((d) => fs.statSync(path.join(capDir, d)).isDirectory())) {
  const passDir = path.join(capDir, pass); const sources = loadSources(passDir); const P = (out.passes[pass] = {});
  H(`## Pass: ${pass}`);
  const files = fs.readdirSync(passDir).sort();
  const con = consoleStages(passDir);
  if (con.length) { P.console = con; H('### Console output (the generator\'s own stage trace)'); md.push('```', ...con.slice(0, 400), '```'); }
  for (const f of files.filter((x) => x.endsWith('.cpuprofile'))) {
    const a = (P[f] = analyzeProfile(path.join(passDir, f), sources));
    H(`### CPU profile ${f}`);
    md.push(`wall ${a.wallMs} ms · busy ${a.busyMs} ms · idle ${a.idleMs} ms · GC ${a.gcMs} ms · native/(program) ${a.programMs} ms · ${a.samples} samples`);
    H('#### Self time by class'); table(['class', 'self ms'], a.byClass.slice(0, 40).map((r) => [r.cls, r.selfMs]));
    H('#### Top functions by self time'); table(['function', 'self ms', 'total ms'], a.topSelf.map((r) => [r.label, r.selfMs, r.totalMs]));
    H('#### Top functions by inclusive time'); table(['function', 'total ms', 'self ms'], a.topTotal.map((r) => [r.label, r.totalMs, r.selfMs]));
    H(`#### Call tree (nodes ≥ ${args['tree-min']}% of busy time)`); md.push('```', ...a.tree.slice(0, 600), '```');
  }
  for (const f of files.filter((x) => x.endsWith('.coverage.json'))) {
    const a = analyzeCoverage(path.join(passDir, f), sources); const { all, ...rest } = a; P[f] = rest;
    writeJson(path.join(passDir, f.replace('.coverage.json', '.calls.json')), all);
    H(`### Exact call counts ${f}`);
    md.push(`${a.functionsExecuted} of ${a.functionsDefined} functions executed · ${a.totalCalls.toLocaleString()} calls total (full list: ${f.replace('.coverage.json', '.calls.json')})`);
    H('#### Calls by class'); table(['class', 'calls', 'distinct fns'], a.byClass.slice(0, 70).map((r) => [r.cls, r.calls.toLocaleString(), r.fns]));
    H('#### Most-called functions'); table(['function', 'calls'], a.top.map((r) => [r.label, r.calls.toLocaleString()]));
  }
  for (const f of files.filter((x) => x.endsWith('.draw.json'))) {
    const a = analyzeDraw(path.join(passDir, f)); if (!a) continue; P[f] = a;
    H(`### Drawing record ${f}`);
    md.push(`DOM: ${JSON.stringify(a.dom)} · Math.random calls: ${a.random.count} · text draws: ${a.textCount} · draw-log entries: ${a.logLen} (+${a.logDropped} dropped)`);
    const pf = path.join(passDir, f.replace('.draw.json', '.paths.json'));   // only present with record.mjs --vertices
    if (fs.existsSync(pf)) {
      const pc = JSON.parse(fs.readFileSync(pf, 'utf8')).counts; a.paths = pc;
      md.push('', `Vertex record ${path.basename(pf)} (--vertices): ${pc.records} painted paths, ${pc.vertices} vertices, skipped ${pc.skippedLong} over the per-path cap + ${pc.droppedTotal} over the total cap, ${pc.path2d} Path2D, ${pc.errors} recorder errors · summarise with \`python3 paths_stats.py ${path.basename(pf)}\``);
    }
    const kv = (title, rows) => { if (rows.length) { H(`#### ${title}`); table(['value', 'count'], rows.map(([k, v]) => [`\`${k}\``, v])); } };
    kv('Canvas2D method calls', a.canvas2d); kv('WebGL calls', a.webgl); kv('Fill styles (palette)', a.fillStyles); kv('Stroke styles', a.strokeStyles);
    kv('Line widths', a.lineWidths); kv('Line joins', a.lineJoins); kv('Line caps', a.lineCaps); kv('Dash patterns', a.dashes); kv('Fonts', a.fonts); kv('Canvas sizes painted', a.canvases);
    H('#### Path complexity (segments per painted path)'); md.push('```', JSON.stringify(a.pathSegs), '```');
    H('#### Label texts (first 80)'); md.push('```', ...a.texts.slice(0, 80).map((t) => `${t[0]}   ← ${t[1]} ${t[2]}`), '```');
    H('#### Layer order (run-length-grouped paint operations, first 140 runs)');
    md.push('```', ...a.layerRuns.slice(0, 140).map((r) => `t+${r.t0}ms ×${r.n} ${r.key} (segs ${r.segs})`), '```');
  }
}
fs.writeFileSync(path.join(capDir, 'report.md'), md.join('\n'));
writeJson(path.join(capDir, 'report.json'), out);
console.log(`report → ${path.join(capDir, 'report.md')} (${md.length} lines)`);
