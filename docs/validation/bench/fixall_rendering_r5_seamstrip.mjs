// fixall/draft-rendering-r5 (2026-09-26, opus stand-in, pending Fable review). OUR OWN code; plain Node, no dependencies.
// NR4-1: the four stamp-tile variants of a class made seam-compatible by ONE SHARED BORDER BAND.
// A property-and-cost model of ARCHITECTURE §8.10's revised construction, not the product's code. Tile T = 6 400 cm,
// toroidal, r0 = 400 cm, integer cm, Bridson with k = 50 candidates all evaluated (first valid kept), the spacing test an
// integer comparison of squared toroidal distances, as in fixall_rendering_r4_stamptiles.mjs. A point's edge distance
// is e = min(x, T - x, y, T - y). Configurations, per seed:
//   CHOSEN   band e < r0/2, cut from a full toroidal parent tile (creation index 4); each variant v = 0..3 (creation
//            index v) copies the band and fills e >= r0/2 by Bridson seeded with it (grid pre-filled, active list = the
//            band's points in index order), candidates with e < r0/2 rejected; ranks per variant.
//   WIDE     the same with the band e < r0 (the verifier's width).
//   BANDBR   band e < r0 sampled by Bridson restricted to the band (the verifier's sampling), then the same fill.
//   INDEP    four independent toroidal tiles (the round-4 construction), the baseline.
// Ranks: void-and-cluster, Gaussian energy (sigma = r0) with the removal update. Checks: every 2 x 2 block of cells with
// variants (a, b, c, d) - all 256 - for cell-crossing pairs closer than r0, for the full sets and the rank < 0.6
// (district band) and rank < 0.25 subsets; within-tile toroidal minimum distance; quarter-prefix spread; density, the
// largest empty circle and the "insertable" area (nearest point farther than r0) by edge-distance bin, sampled every 25 cm.
// Seeded; deterministic. Run: node fixall_rendering_r5_seamstrip.mjs
const now = () => performance.now();
function xs(seed) { let a = seed >>> 0 || 1, b = 0x9e3779b9, c = 0x85ebca6b, d = 0xc2b2ae35;
  return () => { const t = b << 9; let r = Math.imul(a, 5); r = ((r << 7) | (r >>> 25)) >>> 0; r = Math.imul(r, 9) >>> 0;
    c ^= a; d ^= b; b ^= c; a ^= d; c ^= t; d = ((d << 11) | (d >>> 21)); return r / 4294967296; }; }
const LN2H = 0.6931471803691238, LN2L = 1.9082149292705877e-10, INVLN2 = 1.4426950408889634;
function sexp(x) { if (x < -745) return 0; const k = Math.round(x * INVLN2); const r = (x - k * LN2H) - k * LN2L;
  let p = 1 / 39916800; p = p * r + 1 / 3628800; p = p * r + 1 / 362880; p = p * r + 1 / 40320; p = p * r + 1 / 5040;
  p = p * r + 1 / 720; p = p * r + 1 / 120; p = p * r + 1 / 24; p = p * r + 1 / 6; p = p * r + 0.5; p = p * r + 1; p = p * r + 1;
  return p * 2 ** k; }
const T = 6400, r0 = 400, R2 = r0 * r0;
const tor = (d) => { d = Math.abs(d); return d > T / 2 ? T - d : d; };
const edge = (x, y) => Math.min(x, T - x, y, T - y);
function bridson(rand, region, seedX = [], seedY = []) {
  const cell = r0 / Math.SQRT2, g = Math.ceil(T / cell), grid = new Int32Array(g * g).fill(-1);
  const X = [], Y = [], active = []; const cellOf = (v) => Math.min(g - 1, Math.floor(v / cell));
  const put = (x, y) => { const i = X.length; X.push(x); Y.push(y); grid[cellOf(y) * g + cellOf(x)] = i; active.push(i); };
  for (let i = 0; i < seedX.length; i++) put(seedX[i], seedY[i]);
  if (!seedX.length) { for (;;) { const x = Math.floor(rand() * T), y = Math.floor(rand() * T); if (region(x, y)) { put(x, y); break; } } }
  while (active.length) {
    const ai = Math.floor(rand() * active.length), a = active[ai]; let fx = -1, fy = -1;
    for (let k = 0; k < 50; k++) {
      const ang = 2 * Math.PI * rand(), rad = r0 * (1 + rand());
      let x = Math.round(X[a] + rad * Math.cos(ang)), y = Math.round(Y[a] + rad * Math.sin(ang));
      x = ((x % T) + T) % T; y = ((y % T) + T) % T;
      if (!region(x, y)) continue;
      const gx = cellOf(x), gy = cellOf(y); let ok = true;
      for (let dy = -2; ok && dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
        const q = grid[((gy + dy + g) % g) * g + ((gx + dx + g) % g)];
        if (q >= 0) { const ex = tor(X[q] - x), ey = tor(Y[q] - y); if (ex * ex + ey * ey < R2) { ok = false; break; } } }
      if (ok && fx < 0) { fx = x; fy = y; } }
    if (fx >= 0) put(fx, fy); else { active[ai] = active[active.length - 1]; active.pop(); }
  }
  return { X, Y };
}
function rank(X, Y, ex) { const n = X.length, E = new Float64Array(n), alive = new Uint8Array(n).fill(1), rk = new Uint16Array(n), k2 = 1 / (2 * r0 * r0);
  const gfn = (i, j) => { const dx = tor(X[i] - X[j]), dy = tor(Y[i] - Y[j]); return ex(-(dx * dx + dy * dy) * k2); };
  for (let i = 0; i < n; i++) { let s = 0; for (let j = 0; j < n; j++) if (j !== i) s += gfn(i, j); E[i] = s; }
  for (let m = n - 1; m >= 0; m--) { let b = -1; for (let i = 0; i < n; i++) if (alive[i] && (b < 0 || E[i] > E[b])) b = i;
    alive[b] = 0; rk[b] = m; for (let i = 0; i < n; i++) if (alive[i]) E[i] -= gfn(i, b); }
  return rk; }
function banded(base, W, cut) { // shared band e < W, then four variant fills of e >= W
  let band;
  if (cut) { const p = bridson(xs(base + 5), () => true); band = { X: [], Y: [] }; for (let i = 0; i < p.X.length; i++) if (edge(p.X[i], p.Y[i]) < W) { band.X.push(p.X[i]); band.Y.push(p.Y[i]); } }
  else band = bridson(xs(base + 5), (x, y) => edge(x, y) < W);
  return [0, 1, 2, 3].map((v) => { const t = bridson(xs(base + 1 + v), (x, y) => edge(x, y) >= W, band.X, band.Y); t.rank = rank(t.X, t.Y, sexp); t.nBand = band.X.length; t.W = W; return t; }); }
function indep(base) { return [0, 1, 2, 3].map((v) => { const t = bridson(xs(base + 1 + v), () => true); t.rank = rank(t.X, t.Y, sexp); t.nBand = 0; t.W = r0; return t; }); }
function tileMin(t) { let m = Infinity; for (let i = 0; i < t.X.length; i++) for (let j = i + 1; j < t.X.length; j++) { const dx = tor(t.X[i] - t.X[j]), dy = tor(t.Y[i] - t.Y[j]); m = Math.min(m, dx * dx + dy * dy); } return Math.sqrt(m); }
function prefixMin(t, frac) { const idx = []; for (let i = 0; i < t.X.length; i++) if (t.rank[i] < frac * t.X.length) idx.push(i);
  let m = Infinity; for (let a = 0; a < idx.length; a++) for (let b = a + 1; b < idx.length; b++) { const dx = tor(t.X[idx[a]] - t.X[idx[b]]), dy = tor(t.Y[idx[a]] - t.Y[idx[b]]); m = Math.min(m, dx * dx + dy * dy); } return Math.sqrt(m); }
function blocks(tiles, frac) { let close = 0, closeHalf = 0, minAll = Infinity, minSame = Infinity, minMixed = Infinity;
  const cells = [[0, 0], [T, 0], [0, T], [T, T]];
  for (let q = 0; q < 256; q++) { const v = [q & 3, (q >> 2) & 3, (q >> 4) & 3, (q >> 6) & 3];
    const P = []; for (let c = 0; c < 4; c++) { const t = tiles[v[c]]; for (let i = 0; i < t.X.length; i++) { if (t.rank[i] >= frac * t.X.length) continue;
      if (edge(t.X[i], t.Y[i]) >= r0) continue; P.push([t.X[i] + cells[c][0], t.Y[i] + cells[c][1], c]); } }
    const same = v[0] === v[1] && v[1] === v[2] && v[2] === v[3];
    for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) { if (P[i][2] === P[j][2]) continue;
      const d = Math.hypot(P[i][0] - P[j][0], P[i][1] - P[j][1]); minAll = Math.min(minAll, d);
      if (same) minSame = Math.min(minSame, d); else minMixed = Math.min(minMixed, d);
      if (d < r0) { close++; if (d < r0 / 2) closeHalf++; } } }
  return { close, closeHalf, minAll, minSame, minMixed }; }
function profile(t, W) { const bins = [[0, W], [W, W + r0], [W + r0, T / 2 + 1]]; const cnt = [0, 0, 0], area = [0, 0, 0], gap = [0, 0, 0], ins = [0, 0, 0];
  for (let i = 0; i < t.X.length; i++) { const e = edge(t.X[i], t.Y[i]); for (let b = 0; b < 3; b++) if (e >= bins[b][0] && e < bins[b][1]) cnt[b]++; }
  const cs = 200, g = T / cs, grid = Array.from({ length: g * g }, () => []);
  for (let i = 0; i < t.X.length; i++) grid[Math.floor(t.Y[i] / cs) * g + Math.floor(t.X[i] / cs)].push(i);
  for (let y = 12.5; y < T; y += 25) for (let x = 12.5; x < T; x += 25) { const e = edge(x, y); const b = e < W ? 0 : e < W + r0 ? 1 : 2; area[b] += 625;
    const gx = Math.floor(x / cs), gy = Math.floor(y / cs); let m = Infinity;
    for (let dy = -5; dy <= 5; dy++) for (let dx = -5; dx <= 5; dx++) for (const i of grid[((gy + dy + g) % g) * g + ((gx + dx + g) % g)]) { const ex = tor(t.X[i] - x), ey = tor(t.Y[i] - y); m = Math.min(m, ex * ex + ey * ey); }
    gap[b] = Math.max(gap[b], Math.sqrt(m)); if (m > R2) ins[b] += 625; }
  return { dens: cnt.map((c, b) => 100 * c / (area[b] / 1e4)), gap, ins: ins.map((h, b) => h / area[b]), insTile: ins.reduce((s, h) => s + h, 0) / (T * T) }; }
const f2 = (v) => v.toFixed(2), med = (a) => { const s = [...a].sort((x, y) => x - y); return s[s.length >> 1]; };
const SEEDS = [400000, 2800000, 5100000, 7300000, 9900000];
const CONF = [['CHOSEN (band r0/2, cut)', (b) => banded(b, r0 / 2, true)], ['WIDE (band r0, cut)', (b) => banded(b, r0, true)],
  ['BANDBR (band r0, Bridson in band)', (b) => banded(b, r0, false)], ['INDEP (four independent tiles)', (b) => indep(b)]];
console.log('== NR4-1: stamp-tile variants with a shared border band; 5 seeds x 4 configurations; tile 64 m, r0 4 m ==');
const S = {};
for (const [name, mk] of CONF) S[name] = { t: [], close: [0, 0, 0], half: [0, 0, 0], minMixed: [Infinity, Infinity, Infinity], minSame: [Infinity, Infinity, Infinity], tmin: Infinity, pref: [], share: [], dens: [[], [], []], gap: [0, 0, 0], ins: [[], [], []], insTile: [], n: [] };
for (const base of SEEDS) for (const [name, mk] of CONF) {
  const s = S[name]; const t0 = now(); const V = mk(base); s.t.push(now() - t0);
  V.forEach((t) => { s.tmin = Math.min(s.tmin, tileMin(t)); s.pref.push(prefixMin(t, 0.25) / r0); s.n.push(t.X.length); s.share.push(t.nBand / t.X.length); });
  [1, 0.6, 0.25].forEach((frac, k) => { const b = blocks(V, frac); s.close[k] += b.close; s.half[k] += b.closeHalf; s.minMixed[k] = Math.min(s.minMixed[k], b.minMixed); s.minSame[k] = Math.min(s.minSame[k], b.minSame); });
  V.forEach((t) => { const p = profile(t, V[0].W); for (let b = 0; b < 3; b++) { s.dens[b].push(p.dens[b]); s.gap[b] = Math.max(s.gap[b], p.gap[b]); s.ins[b].push(p.ins[b]); } s.insTile.push(p.insTile); });
}
const mean = (a) => a.reduce((x, y) => x + y, 0) / a.length, rng = (a) => `${Math.min(...a).toFixed(2)}–${Math.max(...a).toFixed(2)}`;
for (const [name] of CONF) { const s = S[name];
  console.log(`\n${name}`);
  console.log(`  points per tile ${Math.min(...s.n)}–${Math.max(...s.n)} (median ${med(s.n)}); shared band share of a tile's points ${rng(s.share)}; build per class (band + 4 fills + 4 ranks, software exp) median ${med(s.t).toFixed(1)} ms`);
  console.log(`  within-tile toroidal min distance ${f2(s.tmin / r0)} x r0; quarter-prefix spread ${rng(s.pref)} x r0`);
  ['all ranks', 'rank < 0.6 (district band)', 'rank < 0.25'].forEach((lab, k) => console.log(`  256 2x2 arrangements x 5 seeds, ${lab}: cell-crossing pairs < r0: ${s.close[k]} (< r0/2: ${s.half[k]}); closest in mixed-variant blocks ${f2(s.minMixed[k] / r0)} x r0, in same-variant blocks ${f2(s.minSame[k] / r0)} x r0`));
  console.log(`  by edge distance [0,W) / [W,W+r0) / beyond (W = band half-width; INDEP uses W = r0): points per 100 m2 ${[0, 1, 2].map((b) => rng(s.dens[b])).join(' / ')}`);
  console.log(`     largest empty circle ${[0, 1, 2].map((b) => f2(s.gap[b] / r0)).join(' / ')} x r0; insertable area (nearest point > r0) ${[0, 1, 2].map((b) => (100 * mean(s.ins[b])).toFixed(2) + ' %').join(' / ')}; whole tile ${(100 * mean(s.insTile)).toFixed(3)} %`);
}
const nC = med(S['CHOSEN (band r0/2, cut)'].n);
console.log(`\nasset (each tile self-contained: 6 B per point + a 16-B stored hash; the format of §8.10): ~${((4 * nC * 6 + 64) / 1024).toFixed(2)} KB per class; ~${((8 * (4 * nC * 6 + 64) + 64) / 1024).toFixed(1)} KB for 8 classes`);
