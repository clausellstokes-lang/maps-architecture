// fixall/draft-determinism-r4 (2026-09-26, opus stand-in, pending Fable review) — VD3-1.
// Cost of recomputing the model digest from leaves on a decoded snapshot at load (§2.9 step 3, §6.2 (iii)).
// OUR OWN code: a synthetic, schema-shaped CITY / METROPOLIS workload; MurmurHash3 x86-128 written from the published
// public-domain algorithm description in 32-bit lanes (timing only: no test-vector claim is made here).
// Workload per rung: E entity leaves of ~W u32 words each (identity, lifecycle, attributes, owned-face digests),
// grouped under interior nodes (layer -> district -> block -> plot) sorted by address id; plus the plat's per-level
// digests: for each level n = 0..4, a walk of every level-n face ring along `next` pointers (a shuffled permutation, so
// the walk pays cache misses), skipping finer vertices, writing (x, y, roleKey) of each ring vertex into a buffer that
// is hashed per face and folded into the level digest. Median of 7 runs after 2 warm-ups.
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
let s = 0x9e3779b9; const rnd = () => { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return s >>> 0; };

function build(rung) {
  const P = rung === 'CITY'
    ? { entities: 30000, words: 26, districts: 22, blocks: 700, plots: 5200, verts: 150000, facesPerLevel: [12, 900, 1600, 6500, 6200] }
    : { entities: 80000, words: 26, districts: 45, blocks: 1800, plots: 14000, verts: 400000, facesPerLevel: [20, 2300, 4200, 17500, 16500] };
  // entity columns: one row of `words` u32 per entity, sorted by address id already (as stored)
  const ent = new Uint32Array(P.entities * P.words); for (let i = 0; i < ent.length; i++) ent[i] = rnd();
  const ids = new Uint32Array(P.entities); for (let i = 0; i < P.entities; i++) ids[i] = rnd();
  const parentOf = new Int32Array(P.entities); for (let i = 0; i < P.entities; i++) parentOf[i] = rnd() % (P.districts + P.blocks + P.plots);
  // arena: vertices with level and coordinates; faces per level with a ring of `next` pointers through a permutation
  const V = P.verts; const vx = new Int32Array(V), vy = new Int32Array(V), vlev = new Uint8Array(V), vrole = new Uint32Array(V);
  for (let i = 0; i < V; i++) { vx[i] = rnd() & 0xffffff; vy[i] = rnd() & 0xffffff; const r = rnd() % 100; vlev[i] = r < 3 ? 0 : r < 20 ? 1 : r < 40 ? 2 : r < 75 ? 3 : 4; vrole[i] = rnd(); }
  const perm = new Uint32Array(V); for (let i = 0; i < V; i++) perm[i] = i; for (let i = V - 1; i > 0; i--) { const j = rnd() % (i + 1); const t = perm[i]; perm[i] = perm[j]; perm[j] = t; }
  const next = new Uint32Array(V); for (let i = 0; i < V; i++) next[perm[i]] = perm[(i + 1) % V];
  const rings = []; // per level: array of [start, length]
  for (let lv = 0; lv < 5; lv++) { const nf = P.facesPerLevel[lv]; const avgLen = Math.max(4, Math.floor(V * 3 / nf)); /* ≈ every half-edge (≈ 3 V) walked once per level */ const arr = new Uint32Array(nf * 2); for (let f = 0; f < nf; f++) { arr[2 * f] = rnd() % V; arr[2 * f + 1] = 4 + (rnd() % (2 * avgLen)); } rings.push(arr); }
  return { P, ent, ids, parentOf, vx, vy, vlev, vrole, next, rings };
}
function recompute(M) {
  const { P, ent, ids, parentOf, vx, vy, vlev, vrole, next, rings } = M;
  const t0 = performance.now();
  // (1) plat per-level digests: walk every level-n ring, skip finer vertices, hash each face, fold per level
  const buf = new Uint32Array(1 << 16); const levelDigest = new Uint32Array(5 * 4); const faceAcc = new Uint32Array(4);
  let faces = 0, walked = 0;
  for (let lv = 0; lv < 5; lv++) { const arr = rings[lv]; for (let f = 0; f < arr.length / 2; f++) { let v = arr[2 * f], n = arr[2 * f + 1], k = 0; for (let j = 0; j < n; j++) { if (vlev[v] <= lv && k + 3 < buf.length) { buf[k++] = vx[v]; buf[k++] = vy[v]; buf[k++] = vrole[v]; } v = next[v]; walked++; } const h = mm3(buf, 0, k, 0); faceAcc[0] ^= h[0]; faceAcc[1] = (faceAcc[1] + h[1]) | 0; faceAcc[2] ^= h[2]; faceAcc[3] = (faceAcc[3] + h[3]) | 0; faces++; } levelDigest.set(faceAcc, lv * 4); }
  const t1 = performance.now();
  // (2) entity leaves
  const W = P.words; const leaves = new Uint32Array(P.entities * 4);
  for (let i = 0; i < P.entities; i++) { const h = mm3(ent, i * W, W, 0); leaves.set(h, i * 4); }
  const t2 = performance.now();
  // (3) interior nodes: children grouped by parent, sorted by address id, parent = H(tag || child digests)
  const nParents = P.districts + P.blocks + P.plots; const order = new Uint32Array(P.entities); for (let i = 0; i < P.entities; i++) order[i] = i;
  order.sort((a, b) => parentOf[a] - parentOf[b] || ids[a] - ids[b]);
  const nodeBuf = new Uint32Array(P.entities * 4 + 8); const nodes = new Uint32Array(nParents * 4); let i = 0;
  while (i < P.entities) { const p = parentOf[order[i]]; let k = 0; nodeBuf[k++] = 0x6e6f6465 ^ p; while (i < P.entities && parentOf[order[i]] === p) { const e = order[i]; nodeBuf[k++] = leaves[4 * e]; nodeBuf[k++] = leaves[4 * e + 1]; nodeBuf[k++] = leaves[4 * e + 2]; nodeBuf[k++] = leaves[4 * e + 3]; i++; } nodes.set(mm3(nodeBuf, 0, k, 0), p * 4); }
  const layer = new Uint32Array(nParents * 4 + 32); layer.set(nodes); layer.set(levelDigest, nParents * 4); const root = Array.from(mm3(layer, 0, layer.length, 0));
  const t3 = performance.now();
  return { plats: t1 - t0, leaves: t2 - t1, nodes: t3 - t2, total: t3 - t0, faces, walked, root };
}
const med = (a) => { const b = [...a].sort((x, y) => x - y); return b[b.length >> 1]; };
for (const rung of ['CITY', 'METROPOLIS']) {
  const M = build(rung); const runs = [];
  for (let r = 0; r < 9; r++) runs.push(recompute(M));
  const R = runs.slice(2);
  console.log(`rung=${rung} entities=${M.P.entities} leafWords=${M.P.words} vertices=${M.P.verts} faces(all levels)=${R[0].faces} ringSteps=${R[0].walked}`);
  console.log(`  plat level digests ${med(R.map(x => x.plats)).toFixed(1)} ms | entity leaves ${med(R.map(x => x.leaves)).toFixed(1)} ms | interior nodes + root ${med(R.map(x => x.nodes)).toFixed(1)} ms | total ${med(R.map(x => x.total)).toFixed(1)} ms (median of 7; min ${Math.min(...R.map(x => x.total)).toFixed(1)}, max ${Math.max(...R.map(x => x.total)).toFixed(1)})`);
  console.log(`  root identical across runs: ${R.every(x => x.root.join() === R[0].root.join())}`);
}
