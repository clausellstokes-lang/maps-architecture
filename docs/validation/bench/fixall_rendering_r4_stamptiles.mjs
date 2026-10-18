// fixall/draft-rendering-r4 (2026-09-26, opus stand-in, pending Fable review). OUR OWN code; plain Node, no dependencies.
// NR3-7: what building the stamp-tile library in a session costs, and what loading it as a shipped asset costs.
// A cost model of ARCHITECTURE §8.10's construction, not the product's code: a toroidal 6 400-cm tile, Bridson sampling
// with k = 50 candidates all evaluated, every accepted point rounded to integer cm, the spacing test an integer
// comparison of squared toroidal distances; void-and-cluster ranking with a Gaussian energy (sigma = the spacing) summed
// in point-index order. `sexp` is a software exponential (Cody-Waite range reduction + degree-11 Taylor polynomial),
// standing in for dmath.exp's cost; Math.exp is timed beside it. Two ranking forms are timed: the removal update
// (subtract the removed point's contribution from every remaining point: O(n^2) exponentials) and a full re-sum after
// every removal (O(n^3)). The asset form: int16 x, int16 y (cm), u16 rank = 6 B per point; its load = typed-array views
// plus a 128-bit hash pass over the bytes (a multiply-xorshift mixer standing in for H128's cost). Seeded; deterministic.
// Run: node fixall_rendering_r4_stamptiles.mjs
const now = () => performance.now();
function xs(seed) { let a = seed >>> 0 || 1, b = 0x9e3779b9, c = 0x85ebca6b, d = 0xc2b2ae35;
  return () => { const t = b << 9; let r = Math.imul(a, 5); r = ((r << 7) | (r >>> 25)) >>> 0; r = Math.imul(r, 9) >>> 0;
    c ^= a; d ^= b; b ^= c; a ^= d; c ^= t; d = ((d << 11) | (d >>> 21)); return r / 4294967296; }; }
const LN2H = 0.6931471803691238, LN2L = 1.9082149292705877e-10, INVLN2 = 1.4426950408889634;
function sexp(x) { // software exp for x <= 0 (the energies' domain); cost proxy for dmath.exp
  if (x < -745) return 0; const k = Math.round(x * INVLN2); const r = (x - k * LN2H) - k * LN2L;
  let p = 1 / 39916800; p = p * r + 1 / 3628800; p = p * r + 1 / 362880; p = p * r + 1 / 40320; p = p * r + 1 / 5040;
  p = p * r + 1 / 720; p = p * r + 1 / 120; p = p * r + 1 / 24; p = p * r + 1 / 6; p = p * r + 0.5; p = p * r + 1; p = p * r + 1;
  return p * 2 ** k; }
const T = 6400;
function tor(d) { d = Math.abs(d); return d > T / 2 ? T - d : d; }
function bridson(rCm, rand) {
  const cell = rCm / Math.SQRT2, g = Math.ceil(T / cell), grid = new Int32Array(g * g).fill(-1);
  const X = [], Y = [], active = []; const r2 = rCm * rCm; let tests = 0;
  const cellOf = (v) => Math.min(g - 1, Math.floor(v / cell));
  const add = (x, y) => { const i = X.length; X.push(x); Y.push(y); grid[cellOf(y) * g + cellOf(x)] = i; active.push(i); };
  add(Math.floor(rand() * T), Math.floor(rand() * T));
  while (active.length) {
    const ai = Math.floor(rand() * active.length), a = active[ai]; let fx = -1, fy = -1;
    for (let k = 0; k < 50; k++) {
      const ang = 2 * Math.PI * rand(), rad = rCm * (1 + rand()); tests++;
      let x = Math.round(X[a] + rad * Math.cos(ang)), y = Math.round(Y[a] + rad * Math.sin(ang));
      x = ((x % T) + T) % T; y = ((y % T) + T) % T;
      const gx = cellOf(x), gy = cellOf(y); let ok = true;
      for (let dy = -2; ok && dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
        const q = grid[((gy + dy + g) % g) * g + ((gx + dx + g) % g)];
        if (q >= 0) { const ex = tor(X[q] - x), ey = tor(Y[q] - y); if (ex * ex + ey * ey < r2) { ok = false; break; } } }
      if (ok && fx < 0) { fx = x; fy = y; } }
    if (fx >= 0) add(fx, fy); else { active[ai] = active[active.length - 1]; active.pop(); }
  }
  return { X: Int32Array.from(X), Y: Int32Array.from(Y), tests };
}
function rankUpdate(X, Y, sig, ex) { // removal update: O(n^2) exponentials
  const n = X.length, E = new Float64Array(n), alive = new Uint8Array(n).fill(1), rank = new Uint16Array(n), k2 = 1 / (2 * sig * sig);
  const gfn = (i, j) => { const dx = tor(X[i] - X[j]), dy = tor(Y[i] - Y[j]); return ex(-(dx * dx + dy * dy) * k2); };
  for (let i = 0; i < n; i++) { let s = 0; for (let j = 0; j < n; j++) if (j !== i) s += gfn(i, j); E[i] = s; }
  for (let m = n - 1; m >= 0; m--) { let b = -1; for (let i = 0; i < n; i++) if (alive[i] && (b < 0 || E[i] > E[b])) b = i;
    alive[b] = 0; rank[b] = m; for (let i = 0; i < n; i++) if (alive[i]) E[i] -= gfn(i, b); }
  return rank;
}
function rankResum(X, Y, sig, ex) { // full re-sum after every removal: O(n^3) exponentials
  const n = X.length, alive = new Uint8Array(n).fill(1), rank = new Uint16Array(n), k2 = 1 / (2 * sig * sig);
  const gfn = (i, j) => { const dx = tor(X[i] - X[j]), dy = tor(Y[i] - Y[j]); return ex(-(dx * dx + dy * dy) * k2); };
  for (let m = n - 1; m >= 0; m--) { let b = -1, be = -1;
    for (let i = 0; i < n; i++) if (alive[i]) { let s = 0; for (let j = 0; j < n; j++) if (alive[j] && j !== i) s += gfn(i, j); if (b < 0 || s > be) { b = i; be = s; } }
    alive[b] = 0; rank[b] = m; }
  return rank;
}
function prefixMinDist(X, Y, rank, frac) { // evenness check: min toroidal distance among the points of rank < frac * n
  const idx = []; for (let i = 0; i < X.length; i++) if (rank[i] < frac * X.length) idx.push(i);
  let m = Infinity; for (let a = 0; a < idx.length; a++) for (let b = a + 1; b < idx.length; b++) { const dx = tor(X[idx[a]] - X[idx[b]]), dy = tor(Y[idx[a]] - Y[idx[b]]); m = Math.min(m, Math.hypot(dx, dy)); }
  return m;
}
function h128(u8) { let h0 = 0x243f6a88, h1 = 0x85a308d3, h2 = 0x13198a2e, h3 = 0x03707344;
  for (let i = 0; i < u8.length; i += 4) { const w = u8[i] | (u8[i + 1] << 8) | (u8[i + 2] << 16) | (u8[i + 3] << 24);
    h0 = Math.imul(h0 ^ w, 0x9e3779b1); h1 = Math.imul(h1 ^ (h0 >>> 15), 0x85ebca77); h2 = Math.imul(h2 ^ (h1 >>> 13), 0xc2b2ae3d); h3 = Math.imul(h3 ^ (h2 >>> 16), 0x27d4eb2f); }
  return [h0 >>> 0, h1 >>> 0, h2 >>> 0, h3 >>> 0]; }
const med = (a) => { const s = [...a].sort((x, y) => x - y); return s[s.length >> 1]; };

console.log('== One tile: Bridson (k = 50, all evaluated) + void-and-cluster ranking, toroidal 64 x 64 m, integer cm ==');
console.log('spacing | points | Bridson ms | rank (update, sexp) ms | rank (update, Math.exp) ms | rank (re-sum, sexp) ms | min dist of rank < n/4 prefix (x spacing)');
const rows = [];
for (const rCm of [300, 400, 500, 600, 200]) {
  const tb = [], tu = [], tm = [], tr = []; let n = 0, pm = 0;
  for (let s = 1; s <= 5; s++) {
    const rand = xs(1000 * rCm + s); let t0 = now(); const { X, Y } = bridson(rCm, rand); tb.push(now() - t0); n = X.length;
    t0 = now(); const rk = rankUpdate(X, Y, rCm, sexp); tu.push(now() - t0);
    t0 = now(); rankUpdate(X, Y, rCm, Math.exp); tm.push(now() - t0);
    if (rCm >= 400 && s <= 2) { t0 = now(); rankResum(X, Y, rCm, sexp); tr.push(now() - t0); }
    pm = prefixMinDist(X, Y, rk, 0.25) / rCm;
  }
  rows.push({ rCm, n, b: med(tb), u: med(tu) });
  console.log(`${(rCm / 100).toFixed(1)} m | ${n} | ${med(tb).toFixed(2)} | ${med(tu).toFixed(2)} | ${med(tm).toFixed(2)} | ${tr.length ? med(tr).toFixed(0) : '(skipped: n^3 at ' + n + ' points)'} | ${pm.toFixed(2)}`);
}
console.log();
console.log('== A session library as §8.10 now builds it: per (class, spacing in cm), four tiles ==');
const r400 = rows.find((r) => r.rCm === 400), r300 = rows.find((r) => r.rCm === 300), r500 = rows.find((r) => r.rCm === 500);
const perTile = (r) => r.b + r.u;
console.log(`one (class, spacing) at 3 / 4 / 5 m: ${(4 * perTile(r300)).toFixed(0)} / ${(4 * perTile(r400)).toFixed(0)} / ${(4 * perTile(r500)).toFixed(0)} ms (four tiles; removal-update ranking with the software exp)`);
console.log(`a CITY with woods at 20 distinct spacings (3-5 m, drawn per entity in cm): ~${(20 * 4 * perTile(r400)).toFixed(0)} ms in each of the two workers`);
console.log();
console.log('== The shipped asset: one set of four tiles per stamped class at the reference spacing 4 m, scaled per entity ==');
for (const classes of [8, 16]) {
  const tiles = classes * 4; const pts = tiles * r400.n; const bytes = pts * 6 + tiles * 16 + 64;
  const buf = new Uint8Array(bytes); const rand = xs(7); for (let i = 0; i < bytes; i++) buf[i] = (rand() * 256) | 0;
  const tl = [];
  for (let rep = 0; rep < 21; rep++) { const t0 = now(); const ab = buf.slice().buffer; let off = 64; let acc = 0;
    for (let t = 0; t < tiles; t++) { const n = r400.n; const xy = new Int16Array(ab, off, 2 * n); const rk = new Uint16Array(ab, off + 4 * n, n);
      const h = h128(new Uint8Array(ab, off, 6 * n)); acc ^= h[0] ^ xy[0] ^ rk[0]; off += 6 * n + 16; } tl.push(now() - t0); if (acc === 0.5) console.log(''); }
  console.log(`${classes} classes x 4 tiles x ${r400.n} points: ${(bytes / 1024).toFixed(1)} KB; load (copy + views + 128-bit hash of every tile) median ${med(tl).toFixed(3)} ms`);
}
