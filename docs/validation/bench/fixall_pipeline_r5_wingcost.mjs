// fixall_pipeline_r5_wingcost.mjs — fix-all round 5, pipeline lane (NP4-6): what does §2.6's wing carry and check cost
// per building inside one warp validation pass?  Our own code (Node, no dependencies); deterministic (seeded).
//
// Model (the same shapes as fixall_pipeline_r4_wings.py, integer centimetres): each building's footprint ring carries
// every wing vertex on the wings' union boundary (rule 1). A smooth random displacement (1 m amplitude, 20-80 m
// wavelength) moves the footprint vertices. Per building, one validation pass does:
//   carry  - rule 2 (a): each boundary vertex takes its footprint vertex's new position by identity (an index map);
//            rule 2 (b): each other vertex (an interior joint, a hidden corner) by mean-value coordinates, rounded;
//   kinds  - rule 3: the convex near-rectangle test on every carried rect;
//   check  - rule 4 as round 5 words it: (i) a building whose every wing is re-read whole (one-wing house, row quad)
//            gets no union test (its ring IS the footprint ring); (ii) tiled wings: every carried ring simple and
//            counter-clockwise. The PAIRING — every directed wing edge either a footprint edge (each used once) or the
//            reverse of exactly one other wing's edge, keyed by vertex identity — is a property of the identities alone,
//            which a warp step (it moves vertices, never adds or removes one) cannot change; it is computed once per
//            building per edit (timed separately below) and, by the winding-number identity, pairing + simple CCW rings
//            holds iff the wings tile the footprint face, i.e. their union equals it. The script verifies that claim
//            by also running the full geometric edge test on every carried building (it must agree, 100 %).
//            (iii) overlapping wings (pairing fails): each hidden corner strictly inside the wing that hides it and
//            inside the footprint — this model's stand-in for the arrangement union the architecture uses (note below).
// Output: median ns per building per pass over 7 repetitions of 20 000 buildings per class.
import { performance } from 'node:perf_hooks';

let s = 20260926 >>> 0;
const rnd = () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const M = 100;
const orient = (ax, ay, bx, by, cx, cy) => (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
function area2(r) { let a = 0; for (let i = 0, n = r.length; i < n; i++) { const p = r[i], q = r[(i + 1) % n]; a += p[0] * q[1] - q[0] * p[1]; } return a; }
function simple(r) {
  const n = r.length;
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
    if (j - i === 1 || (i === 0 && j === n - 1)) continue;
    const a = r[i], b = r[(i + 1) % n], c = r[j], d = r[(j + 1) % n];
    const d1 = orient(c[0], c[1], d[0], d[1], a[0], a[1]), d2 = orient(c[0], c[1], d[0], d[1], b[0], b[1]);
    const d3 = orient(a[0], a[1], b[0], b[1], c[0], c[1]), d4 = orient(a[0], a[1], b[0], b[1], d[0], d[1]);
    if (((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) && ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0))) return false;
    if (d1 === 0 || d2 === 0 || d3 === 0 || d4 === 0) { // touching: reject a vertex on a non-adjacent edge
      const on = (p, q, x) => orient(p[0], p[1], q[0], q[1], x[0], x[1]) === 0 && Math.min(p[0], q[0]) <= x[0] && x[0] <= Math.max(p[0], q[0]) && Math.min(p[1], q[1]) <= x[1] && x[1] <= Math.max(p[1], q[1]);
      if (on(c, d, a) || on(c, d, b) || on(a, b, c) || on(a, b, d)) return false;
    }
  }
  return true;
}
function insideStrict(r, x, y) {
  let w = 0; const n = r.length;
  for (let i = 0; i < n; i++) { const a = r[i], b = r[(i + 1) % n]; const o = orient(a[0], a[1], b[0], b[1], x, y);
    if (o === 0 && Math.min(a[0], b[0]) <= x && x <= Math.max(a[0], b[0]) && Math.min(a[1], b[1]) <= y && y <= Math.max(a[1], b[1])) return false;
    if (a[1] <= y && y < b[1] && o > 0) w++; else if (b[1] <= y && y < a[1] && o < 0) w--; }
  return w !== 0;
}
function mvc(ring, x, y, out) {
  const n = ring.length; const t = new Float64Array(n); let sum = 0;
  for (let i = 0; i < n; i++) { const a = ring[i], b = ring[(i + 1) % n]; const ax = a[0] - x, ay = a[1] - y, bx = b[0] - x, by = b[1] - y;
    t[i] = (ax * by - ay * bx) / (Math.sqrt(ax * ax + ay * ay) * Math.sqrt(bx * bx + by * by) + ax * bx + ay * by); }
  for (let i = 0; i < n; i++) { const v = ring[i]; const vx = v[0] - x, vy = v[1] - y; out[i] = (t[(i + n - 1) % n] + t[i]) / Math.sqrt(vx * vx + vy * vy); sum += out[i]; }
  for (let i = 0; i < n; i++) out[i] /= sum;
}
function nearRect(r) {
  const n = r.length;
  for (let i = 0; i < n; i++) { const a = r[i], b = r[(i + 1) % n], c = r[(i + 2) % n]; if (orient(a[0], a[1], b[0], b[1], c[0], c[1]) < 0) return false; }
  let best = Infinity, bu = 0, bv = 0, U0 = 0, U1 = 0, V0 = 0, V1 = 0;
  for (let i = 0; i < n; i++) { const a = r[i], b = r[(i + 1) % n]; const dx = b[0] - a[0], dy = b[1] - a[1]; const L = Math.sqrt(dx * dx + dy * dy); if (L === 0) continue;
    const ux = dx / L, uy = dy / L; let u0 = Infinity, u1 = -Infinity, v0 = Infinity, v1 = -Infinity;
    for (const p of r) { const u = p[0] * ux + p[1] * uy, v = -p[0] * uy + p[1] * ux; if (u < u0) u0 = u; if (u > u1) u1 = u; if (v < v0) v0 = v; if (v > v1) v1 = v; }
    const A = (u1 - u0) * (v1 - v0); if (A < best) { best = A; bu = ux; bv = uy; U0 = u0; U1 = u1; V0 = v0; V1 = v1; } }
  for (const [u, v] of [[U0, V0], [U1, V0], [U1, V1], [U0, V1]]) { const cx = u * bu - v * bv, cy = u * bv + v * bu; let m = Infinity;
    for (const p of r) { const d = Math.hypot(cx - p[0], cy - p[1]); if (d < m) m = d; } if (m > 30) return false; }
  return Math.abs(area2(r)) / 2 >= 0.97 * best;
}
const rect = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
function insertOnSides(ring, pts) {
  const out = []; const n = ring.length;
  for (let i = 0; i < n; i++) { const a = ring[i], b = ring[(i + 1) % n]; out.push(a);
    const on = pts.filter(p => !(p[0] === a[0] && p[1] === a[1]) && !(p[0] === b[0] && p[1] === b[1]) && orient(a[0], a[1], b[0], b[1], p[0], p[1]) === 0 && Math.min(a[0], b[0]) <= p[0] && p[0] <= Math.max(a[0], b[0]) && Math.min(a[1], b[1]) <= p[1] && p[1] <= Math.max(a[1], b[1]));
    on.sort((p, q) => ((p[0] - a[0]) ** 2 + (p[1] - a[1]) ** 2) - ((q[0] - a[0]) ** 2 + (q[1] - a[1]) ** 2)); out.push(...on); }
  return out;
}
const key = p => p[0] + ',' + p[1];
// shapes: name, outer ring, wings, kinds per wing ('rect' | 'quad'), hidden corners {wing index -> host wing index}
const L_outer = [[0, 0], [12 * M, 0], [12 * M, 5 * M], [5 * M, 5 * M], [5 * M, 11 * M], [0, 11 * M]];
const T_outer = [[5 * M, 0], [10 * M, 0], [10 * M, 7 * M], [15 * M, 7 * M], [15 * M, 12 * M], [1 * M, 12 * M], [1 * M, 7 * M], [5 * M, 7 * M]];
const C_outer = [[5 * M, 0], [10 * M, 0], [10 * M, 6 * M], [15 * M, 6 * M], [15 * M, 11 * M], [10 * M, 11 * M], [10 * M, 16 * M], [5 * M, 16 * M], [5 * M, 11 * M], [0, 11 * M], [0, 6 * M], [5 * M, 6 * M]];
const U_outer = [[0, 0], [16 * M, 0], [16 * M, 13 * M], [11 * M, 13 * M], [11 * M, 5 * M], [5 * M, 5 * M], [5 * M, 13 * M], [0, 13 * M]];
const Q_row = [[0, 0], [600, 20], [610, 450], [620, 900], [0, 880], [-10, 440]]; // a row quad: bent front and rear, 6 vertices
const SHAPES = [
  ['one-wing rect', rect(0, 0, 9 * M, 6 * M), [rect(0, 0, 9 * M, 6 * M)], ['rect'], null, true],
  ['row quad', Q_row, [Q_row], ['quad'], null, true],
  ['L tiled', L_outer, [rect(0, 0, 12 * M, 5 * M), rect(0, 5 * M, 5 * M, 11 * M)], ['rect', 'rect'], null, false],
  ['T tiled', T_outer, [rect(1 * M, 7 * M, 15 * M, 12 * M), rect(5 * M, 0, 10 * M, 7 * M)], ['rect', 'rect'], null, false],
  ['cross tiled', C_outer, [rect(5 * M, 0, 10 * M, 16 * M), rect(10 * M, 6 * M, 15 * M, 11 * M), rect(0, 6 * M, 5 * M, 11 * M)], ['rect', 'rect', 'rect'], null, false],
  ['U tiled', U_outer, [rect(0, 0, 16 * M, 5 * M), rect(0, 5 * M, 5 * M, 13 * M), rect(11 * M, 5 * M, 16 * M, 13 * M)], ['rect', 'rect', 'rect'], null, false],
  ['2x2 grid (inner joint)', rect(0, 0, 16 * M, 12 * M), [rect(0, 0, 8 * M, 6 * M), rect(8 * M, 0, 16 * M, 6 * M), rect(8 * M, 6 * M, 16 * M, 12 * M), rect(0, 6 * M, 8 * M, 12 * M)], ['rect', 'rect', 'rect', 'rect'], null, false],
  ['T overlap', T_outer, [rect(1 * M, 7 * M, 15 * M, 12 * M), rect(5 * M, 0, 10 * M, 8 * M)], ['rect', 'rect'], { 1: 0 }, false],
];
function prepare([name, outer, wings, kinds, hidden, whole]) {
  const all = new Map(); for (const p of outer) all.set(key(p), p); for (const w of wings) for (const p of w) all.set(key(p), p);
  const allPts = [...all.values()];
  const fp = whole ? outer : insertOnSides(outer, allPts.filter(p => !outer.some(q => q[0] === p[0] && q[1] === p[1])));
  const W = whole ? [fp] : wings.map(w => insertOnSides(w, allPts.filter(p => !w.some(q => q[0] === p[0] && q[1] === p[1]))));
  const fidx = new Map(fp.map((p, i) => [key(p), i]));
  // per wing vertex: footprint index (>= 0) or -1 (interior: MVC weights precomputed at the carry's start, as rule 2 (b) takes them before the change)
  const idx = W.map(w => w.map(p => fidx.has(key(p)) ? fidx.get(key(p)) : -1));
  const hiddenPts = []; // [wing, vertex, host]
  if (hidden) for (const [wi, host] of Object.entries(hidden)) W[wi].forEach((p, vi) => { if (idx[wi][vi] < 0 && insideStrict(wings[host], p[0], p[1])) hiddenPts.push([+wi, vi, host]); });
  return { name, fp, W, idx, kinds, whole, hiddenPts };
}
const P = SHAPES.map(prepare);
function pass(sh, fp2) {
  const { fp, W, idx, kinds, whole, hiddenPts } = sh;
  // carry
  const lam = new Float64Array(fp.length); const W2 = new Array(W.length);
  for (let w = 0; w < W.length; w++) { const ring = W[w], ix = idx[w]; const r = new Array(ring.length);
    for (let v = 0; v < ring.length; v++) { const i = ix[v]; if (i >= 0) r[v] = fp2[i]; else { mvc(fp, ring[v][0], ring[v][1], lam); let x = 0, y = 0; for (let k = 0; k < fp.length; k++) { x += lam[k] * fp2[k][0]; y += lam[k] * fp2[k][1]; } r[v] = [Math.round(x), Math.round(y)]; } }
    W2[w] = r; }
  // kinds
  let quads = 0; for (let w = 0; w < W2.length; w++) if (kinds[w] === 'rect' && !nearRect(W2[w])) quads++;
  // check
  if (whole) return 1; // (i): the ring is the footprint ring; the kernel already validated the face
  if (hiddenPts.length) { // (iii) stand-in
    for (let w = 0; w < W2.length; w++) if (!simple(W2[w]) || area2(W2[w]) <= 0) return 0;
    for (const [w, v, host] of hiddenPts) { const q = W2[w][v]; if (!insideStrict(W2[host], q[0], q[1]) || !insideStrict(fp2, q[0], q[1])) return 0; }
    return 1;
  }
  for (let w = 0; w < W2.length; w++) { const r = W2[w]; if (!simple(r) || area2(r) <= 0) return 0; } // (ii) with the pairing precomputed
  LAST = W2; return 1;
}
let LAST = null;
function fullEdgeTest(W2, fp2) { // the geometric edge test on positions (agreement check only, not timed)
  const cnt = new Map();
  for (let w = 0; w < W2.length; w++) { const r = W2[w]; if (!simple(r) || area2(r) <= 0) return 0;
    for (let i = 0; i < r.length; i++) { const k = key(r[i]) + '>' + key(r[(i + 1) % r.length]); cnt.set(k, (cnt.get(k) || 0) + 1); } }
  const fe = new Set(); for (let i = 0; i < fp2.length; i++) fe.add(key(fp2[i]) + '>' + key(fp2[(i + 1) % fp2.length]));
  for (const [k, c] of cnt) { if (c !== 1) return 0; if (fe.has(k)) continue; const [a, b] = k.split('>'); if (cnt.get(b + '>' + a) !== 1) return 0; }
  for (const k of fe) if (!cnt.has(k)) return 0;
  return 1;
}
function pairing(sh) { // identity-keyed pairing: vertex id = footprint index, or fp.length + a joint number shared across wings
  const { fp, W, idx } = sh; const jid = new Map(); const n = fp.length; const cnt = new Map();
  const id = (w, v) => { const i = idx[w][v]; if (i >= 0) return i; const k = W[w][v][0] * 4194304 + W[w][v][1]; if (!jid.has(k)) jid.set(k, n + jid.size); return jid.get(k); };
  for (let w = 0; w < W.length; w++) for (let v = 0; v < W[w].length; v++) { const e = id(w, v) * 65536 + id(w, (v + 1) % W[w].length); cnt.set(e, (cnt.get(e) || 0) + 1); }
  for (let i = 0; i < n; i++) { const e = i * 65536 + ((i + 1) % n); if (cnt.get(e) !== 1) return false; cnt.delete(e); }
  for (const [e, c] of cnt) { if (c !== 1) return false; const a = Math.floor(e / 65536), b = e % 65536; if (cnt.get(b * 65536 + a) !== 1) return false; }
  return true;
}
function warpField(A = 100) { const ox = (rnd() - 0.5) * 100 * M, oy = (rnd() - 0.5) * 100 * M, lam = (20 + 60 * rnd()) * M; const ph = [0, 1, 2, 3].map(() => rnd() * 2 * Math.PI);
  return p => [p[0] + Math.round(A * Math.sin(2 * Math.PI * (p[0] + ox) / lam + ph[0]) * Math.cos(2 * Math.PI * (p[1] + oy) / lam + ph[1])), p[1] + Math.round(A * Math.cos(2 * Math.PI * (p[0] + ox) / lam + ph[2]) * Math.sin(2 * Math.PI * (p[1] + oy) / lam + ph[3]))]; }
const NB = 20000, REPS = 7;
console.log('fixall_pipeline_r5_wingcost: §2.6 carry + check per building per warp validation pass (NP4-6); Node ' + process.version + ', seeded; ' + NB + ' buildings x ' + REPS + ' repetitions per class; 1 m warp amplitude');
console.log('class | median ns per building per pass (carry + rule 3 + rule 4) | of which rule 4 check | pass rate | identity pairing (computed once per edit) | agreement with the full geometric edge test');
const results = {};
for (const sh of P) {
  const inputs = []; for (let b = 0; b < NB; b++) { const f = warpField(); inputs.push(sh.fp.map(f)); }
  const times = [], chk = []; let ok = 0;
  for (let rep = 0; rep < REPS; rep++) {
    let t0 = performance.now(); let okr = 0; for (let b = 0; b < NB; b++) okr += pass(sh, inputs[b]); const t1 = performance.now();
    // carry-and-kinds only (check removed) for the split
    const saved = sh.whole; sh.whole = true; const t2 = performance.now(); for (let b = 0; b < NB; b++) pass(sh, inputs[b]); const t3 = performance.now(); sh.whole = saved;
    times.push((t1 - t0) * 1e6 / NB); chk.push(((t1 - t0) - (t3 - t2)) * 1e6 / NB); ok = okr;
  }
  times.sort((a, b) => a - b); chk.sort((a, b) => a - b);
  results[sh.name] = times[3];
  let agree = 0, tiledOK = 0; const tiled = !sh.whole && !sh.hiddenPts.length;
  if (tiled) for (let b = 0; b < NB; b++) { const r = pass(sh, inputs[b]); const f = r ? fullEdgeTest(LAST, inputs[b]) : 0; if (r === f) agree++; tiledOK += r; }
  const tp0 = performance.now(); let pr = false; for (let b = 0; b < NB; b++) pr = pairing(sh); const tp1 = performance.now();
  console.log(`${sh.name.padEnd(24)} | ${times[3].toFixed(0).padStart(6)} | ${Math.max(0, chk[3]).toFixed(0).padStart(6)} | ${(ok / NB * 100).toFixed(2)} % | pairing ${pr ? 'holds' : 'fails'} (${((tp1 - tp0) * 1e6 / NB).toFixed(0)} ns once per edit)` + (tiled ? ` | geometric edge test agrees on ${agree} / ${NB}` : ''));
}
// a pessimistic core mix for a 150 m brush (≈ 7.1 ha) over a CITY core: 450 buildings (a district's ceiling, §12.6)
const mix = [['row quad', 0.55], ['one-wing rect', 0.25], ['L tiled', 0.08], ['T tiled', 0.05], ['cross tiled', 0.01], ['U tiled', 0.02], ['2x2 grid (inner joint)', 0.02], ['T overlap', 0.02]];
const perB = mix.reduce((s, [k, f]) => s + f * results[k], 0);
console.log(`mix (row 55 %, one-wing 25 %, L 8 %, T 5 %, cross 1 %, U 2 %, inner-joint 2 %, overlap 2 %): ${perB.toFixed(0)} ns per building per pass`);
console.log(`450 buildings: ${(450 * perB / 1e6).toFixed(2)} ms per pass; 9 passes (the step and 8 halvings, the worst case): ${(9 * 450 * perB / 1e6).toFixed(2)} ms`);
console.log('note: an overlapping composition\'s check in the architecture is the arrangement union (§3.7), budgeted at S11\'s compound geometry share (<= 25 us); at 2 % of 450 buildings that adds <= 0.23 ms per pass.');

// agreement where carries fail: 8 m amplitude, trials whose moved footprint is not simple skipped (the kernel halves those)
console.log('agreement at 8 m amplitude (tiled classes; simple-CCW-with-pairing versus the full geometric edge test):');
for (const sh of P) { if (sh.whole || sh.hiddenPts.length) continue; let n = 0, agree = 0, fails = 0;
  for (let b = 0; b < 20000; b++) { const f = warpField(800); const fp2 = sh.fp.map(f); if (!simple(fp2) || area2(fp2) <= 0) continue; n++;
    const r = pass(sh, fp2); const g = r ? fullEdgeTest(LAST, fp2) : fullEdgeTestRaw(sh, fp2); if (r === g) agree++; if (!r) fails++; }
  console.log(`${sh.name.padEnd(24)} | trials ${n} | failing carries ${fails} | agree ${agree} / ${n}`); }
function fullEdgeTestRaw(sh, fp2) { // recompute the carried rings without the early exit, then the geometric test
  const { fp, W, idx } = sh; const lam = new Float64Array(fp.length);
  const W2 = W.map((ring, w) => ring.map((p, v) => { const i = idx[w][v]; if (i >= 0) return fp2[i]; mvc(fp, p[0], p[1], lam); let x = 0, y = 0; for (let k = 0; k < fp.length; k++) { x += lam[k] * fp2[k][0]; y += lam[k] * fp2[k][1]; } return [Math.round(x), Math.round(y)]; }));
  return fullEdgeTest(W2, fp2); }
