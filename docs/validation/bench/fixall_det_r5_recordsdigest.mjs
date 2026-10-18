// fixall/draft-determinism-r5 (2026-09-26, opus stand-in, pending Fable review) — VD4-6.
// Cost of the RECORDS digest (§2.9 step 3, §6.2): a Merkle root over the persisted derivation records (plots, blocks,
// buildings) and naming records (every generated name), recomputed at load beside the model tree, and maintained at
// commit. OUR OWN code: a synthetic, schema-shaped CITY / METROPOLIS workload; MurmurHash3 x86-128 written from the
// published public-domain algorithm description in 32-bit lanes (timing only: no test-vector claim is made here).
// Leaf layout (u32 words): derivation record = id(2) kind(1) ctx(2) fields(3 doubles = 6) band(1) allocationRow(1)
// epoch(1) params(2) + each cited slice resolved to (table, version, kind, key, hash) = 6 words, ≈ 8 slices;
// naming record = id(2) kind(1) salt(1) epoch(1) + ≈ 6 slices × 6 words. Leaves are grouped under one node per
// static-index partition (district, plus one outside districts) sorted by address id, then one root.
// Median of 7 runs after 2 warm-ups; the sort by (partition, id) is included, as at load.
const imul = Math.imul;
const rotl = (x, r) => (x << r) | (x >>> (32 - r));
const fmix = (h) => { h ^= h >>> 16; h = imul(h, 0x85ebca6b); h ^= h >>> 13; h = imul(h, 0xc2b2ae35); h ^= h >>> 16; return h; };
const OUT = new Uint32Array(4);
function mm3(buf, off, n, seed) {
  let h1 = seed | 0, h2 = seed | 0, h3 = seed | 0, h4 = seed | 0;
  const c1 = 0x239b961b, c2 = 0xab0e9789, c3 = 0x38b34ae5, c4 = 0xa1e38b93;
  let i = off; const end4 = off + (n & ~3);
  for (; i < end4; i += 4) {
    let k1 = buf[i], k2 = buf[i + 1], k3 = buf[i + 2], k4 = buf[i + 3];
    k1 = imul(k1, c1); k1 = rotl(k1, 15); k1 = imul(k1, c2); h1 ^= k1;
    h1 = rotl(h1, 19); h1 = (h1 + h2) | 0; h1 = (imul(h1, 5) + 0x561ccd1b) | 0;
    k2 = imul(k2, c2); k2 = rotl(k2, 16); k2 = imul(k2, c3); h2 ^= k2;
    h2 = rotl(h2, 17); h2 = (h2 + h3) | 0; h2 = (imul(h2, 5) + 0x0bcaa747) | 0;
    k3 = imul(k3, c3); k3 = rotl(k3, 17); k3 = imul(k3, c4); h3 ^= k3;
    h3 = rotl(h3, 15); h3 = (h3 + h4) | 0; h3 = (imul(h3, 5) + 0x96cd1c35) | 0;
    k4 = imul(k4, c4); k4 = rotl(k4, 18); k4 = imul(k4, c1); h4 ^= k4;
    h4 = rotl(h4, 13); h4 = (h4 + h1) | 0; h4 = (imul(h4, 5) + 0x32ac3b17) | 0;
  }
  const rem = n & 3;
  if (rem >= 3) { let k3 = buf[i + 2]; k3 = imul(k3, c3); k3 = rotl(k3, 17); k3 = imul(k3, c4); h3 ^= k3; }
  if (rem >= 2) { let k2 = buf[i + 1]; k2 = imul(k2, c2); k2 = rotl(k2, 16); k2 = imul(k2, c3); h2 ^= k2; }
  if (rem >= 1) { let k1 = buf[i]; k1 = imul(k1, c1); k1 = rotl(k1, 15); k1 = imul(k1, c2); h1 ^= k1; }
  const len = n * 4;
  h1 ^= len; h2 ^= len; h3 ^= len; h4 ^= len;
  h1 = (h1 + h2 + h3 + h4) | 0; h2 = (h2 + h1) | 0; h3 = (h3 + h1) | 0; h4 = (h4 + h1) | 0;
  h1 = fmix(h1); h2 = fmix(h2); h3 = fmix(h3); h4 = fmix(h4);
  h1 = (h1 + h2 + h3 + h4) | 0; h2 = (h2 + h1) | 0; h3 = (h3 + h1) | 0; h4 = (h4 + h1) | 0;
  OUT[0] = h1; OUT[1] = h2; OUT[2] = h3; OUT[3] = h4; return OUT;
}
let s = 0x2545f491; const rnd = () => { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return s >>> 0; };
function build(rung) {
  // CITY: ≈ 5 200 plots, 700 blocks, ≈ 5 000 buildings carry derivation records; ≈ 3 500 generated names (§2.8).
  const P = rung === 'CITY'
    ? { deriv: 5200 + 700 + 5000, naming: 3500, partitions: 23 }
    : { deriv: 14000 + 1800 + 13500, naming: 9500, partitions: 46 };
  const DW = 2 + 1 + 2 + 6 + 1 + 1 + 1 + 2 + 8 * 6, NW = 2 + 1 + 1 + 1 + 6 * 6;
  const N = P.deriv + P.naming; const off = new Uint32Array(N + 1); const part = new Uint32Array(N); const idHi = new Uint32Array(N);
  let w = 0; for (let i = 0; i < N; i++) { off[i] = w; w += i < P.deriv ? DW : NW; } off[N] = w;
  const words = new Uint32Array(w); for (let i = 0; i < w; i++) words[i] = rnd();
  for (let i = 0; i < N; i++) { part[i] = rnd() % P.partitions; idHi[i] = words[off[i]]; }
  return { P, N, off, part, idHi, words, DW, NW };
}
function recompute(M) {
  const { P, N, off, part, idHi, words } = M;
  const t0 = performance.now();
  const leaves = new Uint32Array(N * 4);
  for (let i = 0; i < N; i++) leaves.set(mm3(words, off[i], off[i + 1] - off[i], 0), i * 4);
  const t1 = performance.now();
  const order = new Uint32Array(N); for (let i = 0; i < N; i++) order[i] = i;
  order.sort((a, b) => part[a] - part[b] || idHi[a] - idHi[b] || a - b);
  const nodeBuf = new Uint32Array(N * 4 + 8); const nodes = new Uint32Array(P.partitions * 4); let i = 0;
  while (i < N) { const p = part[order[i]]; let k = 0; nodeBuf[k++] = 0x72656373 ^ p; while (i < N && part[order[i]] === p) { const e = order[i]; nodeBuf[k++] = leaves[4 * e]; nodeBuf[k++] = leaves[4 * e + 1]; nodeBuf[k++] = leaves[4 * e + 2]; nodeBuf[k++] = leaves[4 * e + 3]; i++; } nodes.set(mm3(nodeBuf, 0, k, 0), p * 4); }
  const root = Array.from(mm3(nodes, 0, nodes.length, 0));
  const t2 = performance.now();
  return { leaves: t1 - t0, nodes: t2 - t1, total: t2 - t0, root };
}
const med = (a) => { const b = [...a].sort((x, y) => x - y); return b[b.length >> 1]; };
for (const rung of ['CITY', 'METROPOLIS']) {
  const M = build(rung); const runs = [];
  for (let r = 0; r < 9; r++) runs.push(recompute(M));
  const R = runs.slice(2);
  console.log(`rung=${rung} derivationRecords=${M.P.deriv} (${M.DW * 4} B leaf) namingRecords=${M.P.naming} (${M.NW * 4} B leaf) partitions=${M.P.partitions} hashedBytes=${M.words.length * 4}`);
  console.log(`  record leaves ${med(R.map(x => x.leaves)).toFixed(2)} ms | partition nodes + root (incl. sort) ${med(R.map(x => x.nodes)).toFixed(2)} ms | total ${med(R.map(x => x.total)).toFixed(2)} ms (median of 7; min ${Math.min(...R.map(x => x.total)).toFixed(2)}, max ${Math.max(...R.map(x => x.total)).toFixed(2)})`);
  console.log(`  root identical across runs: ${R.every(x => x.root.join() === R[0].root.join())}`);
}
