// Red-team scale lens: §3.3 rebuilds the static packed spatial index "once per batch commit", while §4.1 declares one
// batch per block (S10) and one per plot (S11) and §3.3 one per edit. Cost of a packed Hilbert R-tree build
// (the flatbush construction: Hilbert keys, sort, pack levels of 16) for N items — our own implementation.
// Run: node bench_index.mjs
const now = () => performance.now();
function rng(seed) { let s = seed >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
function hilbert(x, y) { // x,y in [0, 65535]; classic xy2d
  let d = 0; for (let s = 32768; s > 0; s >>= 1) { const rx = (x & s) > 0 ? 1 : 0, ry = (y & s) > 0 ? 1 : 0; d += s * s * ((3 * rx) ^ ry);
    if (ry === 0) { if (rx === 1) { x = 65535 - x; y = 65535 - y; } const t = x; x = y; y = t; } }
  return d >>> 0; }
function sortPairs(keys, idx, lo, hi) { // quicksort on parallel arrays (flatbush-style)
  while (hi - lo > 16) { const p = keys[(lo + hi) >> 1]; let i = lo - 1, j = hi + 1;
    for (;;) { do i++; while (keys[i] < p); do j--; while (keys[j] > p); if (i >= j) break; let t = keys[i]; keys[i] = keys[j]; keys[j] = t; t = idx[i]; idx[i] = idx[j]; idx[j] = t; }
    if (j - lo < hi - j) { sortPairs(keys, idx, lo, j); lo = j + 1; } else { sortPairs(keys, idx, j + 1, hi); hi = j; } }
  for (let i = lo + 1; i <= hi; i++) { const k = keys[i], v = idx[i]; let j = i - 1; while (j >= lo && keys[j] > k) { keys[j + 1] = keys[j]; idx[j + 1] = idx[j]; j--; } keys[j + 1] = k; idx[j + 1] = v; } }
function buildPacked(boxes, n, nodeSize = 16) { // boxes: Float64Array [minX,minY,maxX,maxY]*n
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (let i = 0; i < n; i++) { const b = i * 4; if (boxes[b] < minX) minX = boxes[b]; if (boxes[b + 1] < minY) minY = boxes[b + 1]; if (boxes[b + 2] > maxX) maxX = boxes[b + 2]; if (boxes[b + 3] > maxY) maxY = boxes[b + 3]; }
  const keys = new Uint32Array(n), idx = new Uint32Array(n), w = maxX - minX || 1, h = maxY - minY || 1;
  for (let i = 0; i < n; i++) { const b = i * 4; keys[i] = hilbert(Math.floor(65535 * ((boxes[b] + boxes[b + 2]) / 2 - minX) / w), Math.floor(65535 * ((boxes[b + 1] + boxes[b + 3]) / 2 - minY) / h)); idx[i] = i; }
  sortPairs(keys, idx, 0, n - 1);
  let level = new Float64Array(n * 4); for (let i = 0; i < n; i++) { const b = idx[i] * 4; level.set(boxes.subarray(b, b + 4), i * 4); }
  let count = n, total = n; while (count > 1) { const m = Math.ceil(count / nodeSize), up = new Float64Array(m * 4);
    for (let k = 0; k < m; k++) { let a = Infinity, bb = Infinity, c = -Infinity, d = -Infinity; for (let i = k * nodeSize; i < Math.min(count, (k + 1) * nodeSize); i++) { const q = i * 4; if (level[q] < a) a = level[q]; if (level[q + 1] < bb) bb = level[q + 1]; if (level[q + 2] > c) c = level[q + 2]; if (level[q + 3] > d) d = level[q + 3]; } up.set([a, bb, c, d], k * 4); }
    level = up; count = m; total += m; }
  return total; }
function makeBoxes(n, R) { const b = new Float64Array(n * 4); for (let i = 0; i < n; i++) { const x = R() * 5e5, y = R() * 5e5, s = 500 + R() * 2000; b.set([x, y, x + s, y + s], i * 4); } return b; }
const R = rng(11); for (let k = 0; k < 20; k++) buildPacked(makeBoxes(20000, R), 20000); // warm-up
const per = {};
console.log('items | build ms (median of 15)');
for (const n of [1000, 2000, 4000, 8000, 17000, 20000, 42000, 60000]) { const b = makeBoxes(n, R); const ts = []; for (let k = 0; k < 15; k++) { const t = now(); buildPacked(b, n); ts.push(now() - t); } ts.sort((a, c) => a - c); per[n] = ts[7]; console.log(`${n} | ${ts[7].toFixed(3)}`); }
// Sum of rebuilds over a stage whose level grows linearly from 0 to Nfinal across B batch commits.
function stageSum(B, Nfinal) { let tot = 0; const pts = Object.keys(per).map(Number).sort((a, b) => a - b);
  const f = (n) => { if (n <= pts[0]) return per[pts[0]] * n / pts[0]; for (let i = 1; i < pts.length; i++) if (n <= pts[i]) { const a = pts[i - 1], b = pts[i]; return per[a] + (per[b] - per[a]) * (n - a) / (b - a); } return per[pts.at(-1)] * n / pts.at(-1); };
  for (let k = 1; k <= B; k++) tot += f(Nfinal * k / B); return tot; }
console.log('--- stage totals (level grows linearly to its final size over the stage) ---');
for (const [name, B, N] of [
  ['CITY S10: one L3 commit per block (~1 750 blocks; L3 -> ~8 000 faces: plots+residue)', 1750, 8000],
  ['CITY S11: one L4 commit per plot (5 500 plots; L4 -> ~17 000 faces: footprints+yard parts)', 5500, 17000],
  ['METRO S10: ~4 400 blocks; L3 -> ~20 000', 4400, 20000],
  ['METRO S11: 13 750 plots; L4 -> ~42 000', 13750, 42000],
]) console.log(`${name}: ${(stageSum(B, N) / 1000).toFixed(2)} s`);
console.log('--- one edit (full level already built) ---');
for (const [name, n, k] of [['CITY single plot edit: 1 L3 + 1 L4 rebuild', 8000, 17000], ['METRO single plot edit: 1 L3 + 1 L4 rebuild', 20000, 42000]]) {
  const f = (m) => { const b = makeBoxes(m, R); const t = now(); buildPacked(b, m); return now() - t; }; let a = 0, c = 0; for (let i = 0; i < 7; i++) { a += f(n); c += f(k); } console.log(`${name}: ${((a + c) / 7).toFixed(2)} ms`); }
