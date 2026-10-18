// fix-all round 3, kernel lane (fixall/draft-kernel-r3). Our own code; no reference code.
//   A  VK2-1: the cost of rebuilding, before the pool's freeze, the L3 static partitions that S10's shared-edge step (0)
//      touched (the packed Hilbert R-tree build of bench_index.mjs, re-implemented here), at CITY and METROPOLIS sizes
//   B  VK2-9: what a pool worker would pay to rebuild the two Map-valued kernel tables (role heads, owner heads) from the
//      transferred arrays, against a typed-array open-addressing table that travels as an ArrayBuffer; and the copy cost
//      of the frozen arena with the tables included
// Run: node fixall_kernel_r3_bench.mjs
const now = () => performance.now();
function rng(seed) { let s = seed >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
function hilbert(x, y) { let d = 0; for (let s = 32768; s > 0; s >>= 1) { const rx = (x & s) > 0 ? 1 : 0, ry = (y & s) > 0 ? 1 : 0; d += s * s * ((3 * rx) ^ ry);
  if (ry === 0) { if (rx === 1) { x = 65535 - x; y = 65535 - y; } const t = x; x = y; y = t; } } return d >>> 0; }
function sortPairs(keys, idx, lo, hi) { while (hi - lo > 16) { const p = keys[(lo + hi) >> 1]; let i = lo - 1, j = hi + 1;
    for (;;) { do i++; while (keys[i] < p); do j--; while (keys[j] > p); if (i >= j) break; let t = keys[i]; keys[i] = keys[j]; keys[j] = t; t = idx[i]; idx[i] = idx[j]; idx[j] = t; }
    if (j - lo < hi - j) { sortPairs(keys, idx, lo, j); lo = j + 1; } else { sortPairs(keys, idx, j + 1, hi); hi = j; } }
  for (let i = lo + 1; i <= hi; i++) { const k = keys[i], v = idx[i]; let j = i - 1; while (j >= lo && keys[j] > k) { keys[j + 1] = keys[j]; idx[j + 1] = idx[j]; j--; } keys[j + 1] = k; idx[j + 1] = v; } }
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
  return total; }
// thin band parts along a chain: small boxes strung along a curve (what step (0) makes: offset-line vertices, edges, faces)
function bandBoxes(n, R) { const b = new Float64Array(n * 4); let x = R() * 4e5, y = R() * 4e5, a = R() * 6.283;
  for (let i = 0; i < n; i++) { a += (R() - 0.5) * 0.2; x += 1000 * Math.cos(a); y += 1000 * Math.sin(a); const s = 50 + R() * 400; b.set([x, y, x + s, y + s], i * 4); } return b; }
const median = (f, k = 15) => { const ts = []; for (let i = 0; i < k; i++) ts.push(f()); ts.sort((p, q) => p - q); return ts[k >> 1]; };
const R = rng(2026);
for (let k = 0; k < 20; k++) buildPacked(bandBoxes(9000, R), 9000); // warm-up

console.log('== A  VK2-1: rebuilding the L3 static partitions step (0) touched, before the freeze ==');
console.log('item estimate (vertices + edges + faces of the band parts; our own count, stated in the lane file):');
// CITY: margin band both sides of ~6 km of perimeter (one chain vertex per ~10 m, +50 % join chords) + wall parts of a ~4 km
// trace with ~80 towers (~24-chord rings split per side); METROPOLIS x2.5.
for (const [name, total, parts] of [['CITY', 9000, 26], ['METROPOLIS', 22500, 64]]) {
  // skewed partition sizes: the districts along the wall and the perimeter take most of the parts, the outside-districts
  // partition takes the headland half of the margin band
  const w = []; for (let i = 0; i < parts; i++) w.push(i === 0 ? 8 : (i < parts / 3 ? 2 + R() * 3 : 0.2 + R()));
  const ws = w.reduce((p, q) => p + q, 0); const sizes = w.map((v) => Math.max(1, Math.round(total * v / ws)));
  const boxes = sizes.map((n) => bandBoxes(n, R));
  const tParts = median(() => { const t = now(); for (let i = 0; i < parts; i++) buildPacked(boxes[i], sizes[i]); return now() - t; });
  const one = bandBoxes(total, R); const tOne = median(() => { const t = now(); buildPacked(one, total); return now() - t; });
  console.log(`${name}: ${sizes.reduce((p, q) => p + q, 0)} items in ${parts} partitions (largest ${Math.max(...sizes)}): rebuild ${tParts.toFixed(2)} ms (median of 15); the same items as one partition ${tOne.toFixed(2)} ms`);
}

console.log('== B  VK2-9: Map-valued tables rebuilt per worker vs typed open-addressing tables that travel as buffers ==');
// role rows: (role u16, entity handle i32, ordinal u16) -> first slot. N distinct keys, ~2.5 rows per key.
function makeRows(nKeys, R) { const rows = Math.round(nKeys * 2.5); const role = new Uint16Array(rows), ent = new Int32Array(rows), ord = new Uint16Array(rows);
  for (let i = 0; i < rows; i++) { const k = Math.floor(R() * nKeys); ent[i] = k >> 3; role[i] = k & 7; ord[i] = (k * 7) & 3; } return { rows, role, ent, ord }; }
function buildMap({ rows, role, ent, ord }) { const m = new Map(); for (let i = 0; i < rows; i++) { const key = ent[i] * 4294967296 + role[i] * 65536 + ord[i]; if (!m.has(key)) m.set(key, i); } return m; }
// open addressing, linear probing, capacity a power of two at load <= 0.5; keys in two Int32 words, value Int32; empty = -1
function mix(a, b) { let h = Math.imul(a ^ 0x9e3779b9, 0x85ebca6b) ^ Math.imul(b ^ 0x7f4a7c15, 0xc2b2ae35); h ^= h >>> 15; h = Math.imul(h, 0x27d4eb2f); return (h ^ (h >>> 13)) >>> 0; }
function buildTyped({ rows, role, ent, ord }, nKeys) { let cap = 1; while (cap < 2 * nKeys) cap <<= 1; const k0 = new Int32Array(cap), k1 = new Int32Array(cap), v = new Int32Array(cap).fill(-1);
  const mask = cap - 1; for (let i = 0; i < rows; i++) { const a = ent[i], b = (role[i] << 16) | ord[i]; let s = mix(a, b) & mask;
    for (;;) { if (v[s] === -1) { k0[s] = a; k1[s] = b; v[s] = i; break; } if (k0[s] === a && k1[s] === b) break; s = (s + 1) & mask; } }
  return { k0, k1, v, cap, bytes: cap * 12 }; }
function lookupTyped(t, a, b) { const mask = t.cap - 1; let s = mix(a, b) & mask; for (;;) { if (t.v[s] === -1) return -1; if (t.k0[s] === a && t.k1[s] === b) return t.v[s]; s = (s + 1) & mask; } }
for (const [name, nKeys] of [['CITY role heads (~60 000 keys)', 60000], ['CITY role + owner heads (~100 000 keys)', 100000], ['METROPOLIS (~250 000 keys)', 250000]]) {
  const data = makeRows(nKeys, R);
  for (let k = 0; k < 5; k++) { buildMap(data); buildTyped(data, nKeys); }
  const tMap = median(() => { const t = now(); buildMap(data); return now() - t; }, 9);
  const tTyp = median(() => { const t = now(); buildTyped(data, nKeys); return now() - t; }, 9);
  const m = buildMap(data), ty = buildTyped(data, nKeys); let bad = 0;
  for (let i = 0; i < data.rows; i += 7) { const key = data.ent[i] * 4294967296 + data.role[i] * 65536 + data.ord[i]; if (m.get(key) !== lookupTyped(ty, data.ent[i], (data.role[i] << 16) | data.ord[i])) bad++; }
  console.log(`${name}: Map rebuild ${tMap.toFixed(2)} ms per worker; typed build ${tTyp.toFixed(2)} ms (done once, on the generation worker, incrementally); typed table ${(ty.bytes / 1048576).toFixed(2)} MB; lookup mismatches ${bad}`);
}
console.log('frozen-copy cost (one memory copy per worker, then transferred):');
for (const mb of [10, 12]) { const src = new Uint8Array(mb * 1048576); for (let i = 0; i < src.length; i += 4096) src[i] = i & 255;
  for (let k = 0; k < 5; k++) src.slice();
  const t1 = median(() => { const t = now(); src.slice(); return now() - t; }, 15);
  console.log(`${mb} MB: ${t1.toFixed(2)} ms per copy; 3 workers ${(3 * t1).toFixed(2)} ms`); }
