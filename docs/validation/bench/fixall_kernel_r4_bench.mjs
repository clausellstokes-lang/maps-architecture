// fix-all round 4, kernel lane (fixall/draft-kernel-r4). Our own code; no reference code.
//   A  VK3-6: bytes per item of the packed Hilbert R-tree the static partitions use (the layout of bench_index.mjs /
//      fixall_kernel_r3_bench.mjs: a Float64 box and a Uint32 index per node, inner nodes of 16), and the frozen copy's
//      size and memory-copy time once the partitions travel with the arena
//   B  VK3-5: the freeze's rebuild of the static partitions edits left dirty — a few district partitions, the arena-wide
//      L1 partition, and the worst case of every partition of a finished CITY
// Run: node fixall_kernel_r4_bench.mjs
const now = () => performance.now();
function rng(seed) { let s = seed >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
function hilbert(x, y) { let d = 0; for (let s = 32768; s > 0; s >>= 1) { const rx = (x & s) > 0 ? 1 : 0, ry = (y & s) > 0 ? 1 : 0; d += s * s * ((3 * rx) ^ ry);
  if (ry === 0) { if (rx === 1) { x = 65535 - x; y = 65535 - y; } const t = x; x = y; y = t; } } return d >>> 0; }
function sortPairs(keys, idx, lo, hi) { while (hi - lo > 16) { const p = keys[(lo + hi) >> 1]; let i = lo - 1, j = hi + 1;
    for (;;) { do i++; while (keys[i] < p); do j--; while (keys[j] > p); if (i >= j) break; let t = keys[i]; keys[i] = keys[j]; keys[j] = t; t = idx[i]; idx[i] = idx[j]; idx[j] = t; }
    if (j - lo < hi - j) { sortPairs(keys, idx, lo, j); lo = j + 1; } else { sortPairs(keys, idx, j + 1, hi); hi = j; } }
  for (let i = lo + 1; i <= hi; i++) { const k = keys[i], v = idx[i]; let j = i - 1; while (j >= lo && keys[j] > k) { keys[j + 1] = keys[j]; idx[j + 1] = idx[j]; j--; } keys[j + 1] = k; idx[j + 1] = v; } }
// builds the packed tree and returns its byte size: every node (leaf items and inner nodes) holds a Float64 box (32 B) and a Uint32 index (4 B)
function buildPacked(boxes, n, nodeSize = 16) { if (n === 0) return 0;
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (let i = 0; i < n; i++) { const b = i * 4; if (boxes[b] < minX) minX = boxes[b]; if (boxes[b + 1] < minY) minY = boxes[b + 1]; if (boxes[b + 2] > maxX) maxX = boxes[b + 2]; if (boxes[b + 3] > maxY) maxY = boxes[b + 3]; }
  const keys = new Uint32Array(n), idx = new Uint32Array(n), w = maxX - minX || 1, h = maxY - minY || 1;
  for (let i = 0; i < n; i++) { const b = i * 4; keys[i] = hilbert(Math.floor(65535 * ((boxes[b] + boxes[b + 2]) / 2 - minX) / w), Math.floor(65535 * ((boxes[b + 1] + boxes[b + 3]) / 2 - minY) / h)); idx[i] = i; }
  sortPairs(keys, idx, 0, n - 1);
  let level = new Float64Array(n * 4); for (let i = 0; i < n; i++) { const b = idx[i] * 4; level.set(boxes.subarray(b, b + 4), i * 4); }
  let count = n, total = n; while (count > 1) { const m = Math.ceil(count / nodeSize), up = new Float64Array(m * 4);
    for (let k = 0; k < m; k++) { let a = Infinity, bb = Infinity, c = -Infinity, d = -Infinity; for (let i = k * nodeSize; i < Math.min(count, (k + 1) * nodeSize); i++) { const q = i * 4; if (level[q] < a) a = level[q]; if (level[q + 1] < bb) bb = level[q + 1]; if (level[q + 2] > c) c = level[q + 2]; if (level[q + 3] > d) d = level[q + 3]; } up.set([a, bb, c, d], k * 4); }
    level = up; count = m; total += m; }
  return total * (32 + 4); }
function boxesOf(n, R, spread = 4e5) { const b = new Float64Array(n * 4); for (let i = 0; i < n; i++) { const x = R() * spread, y = R() * spread, s = 50 + R() * 2000; b.set([x, y, x + s, y + s], i * 4); } return b; }
const median = (f, k = 15) => { const ts = []; for (let i = 0; i < k; i++) ts.push(f()); ts.sort((p, q) => p - q); return ts[k >> 1]; };
const R = rng(2027);
for (let k = 0; k < 10; k++) buildPacked(boxesOf(20000, R), 20000); // warm-up

console.log('== A  VK3-6: bytes per item of a static partition, and the frozen copy with its partitions ==');
for (const n of [1000, 9000, 60000, 90000, 210000]) { const bytes = buildPacked(boxesOf(n, R), n); console.log(`${n} items in one partition: ${(bytes / 1048576).toFixed(2)} MB, ${(bytes / n).toFixed(1)} B per item`); }
// the item estimates (our count, PLAUSIBLE until M1; stated in the lane file): CITY one-click freeze = L0 + L1 + L2 + step (0)'s L3 parts;
// a freeze after edits also carries L3 plots and L4 footprints and yard parts
const B = 38.4;
const est = [['CITY one-click freeze (L0-L2 + step (0) L3)', 60000, 90000], ['CITY after edits (L0-L4 of a finished town)', 190000, 230000],
  ['METROPOLIS one-click freeze (x 2.5)', 150000, 225000]];
for (const [name, lo, hi] of est) console.log(`${name}: ${lo}-${hi} items -> ${(lo * B / 1048576).toFixed(1)}-${(hi * B / 1048576).toFixed(1)} MB of static partitions`);
console.log('frozen-copy memory copy (one per pool worker, then transferred):');
for (const mb of [12, 15, 20, 38]) { const src = new Uint8Array(mb * 1048576); for (let i = 0; i < src.length; i += 4096) src[i] = i & 255;
  for (let k = 0; k < 5; k++) src.slice();
  const t1 = median(() => { const t = now(); src.slice(); return now() - t; }, 15);
  console.log(`${mb} MB: ${t1.toFixed(2)} ms per copy; 3 workers ${(3 * t1).toFixed(2)} ms`); }

console.log('== B  VK3-5: rebuilding, at the freeze, the static partitions edits left dirty ==');
const cases = [['one district partition at L3 and one at L4 (a plot edit)', [2500, 4500]],
  ['five districts\' L3 and L4 partitions (20 scattered edits)', [2500, 4500, 2500, 4500, 2500, 4500, 2500, 4500, 2500, 4500]],
  ['the arena-wide L1 partition (an edited street) and one L2 district partition', [16000, 3000]],
  ['worst case: every partition of a finished CITY (L0-L1 per arena, L2-L4 per district, 18 districts)', [2000, 16000, ...Array(18).fill(2800), ...Array(18).fill(2450), ...Array(18).fill(4850)]]];
for (const [name, sizes] of cases) { const data = sizes.map((n) => boxesOf(n, R));
  const t = median(() => { const t0 = now(); for (let i = 0; i < sizes.length; i++) buildPacked(data[i], sizes[i]); return now() - t0; }, 9);
  console.log(`${name}: ${sizes.length} partitions, ${sizes.reduce((p, q) => p + q, 0)} items: ${t.toFixed(2)} ms (median of 9)`); }
