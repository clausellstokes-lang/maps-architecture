// fixall/verify-rendering-r4 (2026-09-26, opus, pending Fable review). OUR OWN code; plain Node, no dependencies.
// Checks the claim of ARCHITECTURE §8.10 (round 4, NR3-7) that a stamp keeps "the minimum distance [at] the entity's
// own spacing" when each stamp cell picks one of FOUR independent toroidal tiles (`RH32(...) mod 4`). A toroidal tile
// is seamless only against a copy of itself; two different variants side by side can put points closer than r across
// their shared edge. Tiles are built as the round-4 cost model builds them (fixall_rendering_r4_stamptiles.mjs: Bridson,
// k = 50 all evaluated, integer cm, 6 400-cm tile, r0 = 400 cm; the same seeding), then every ordered pair of variants is
// put side by side (horizontal and vertical seams) and the cross-seam pairs closer than r0 and r0 / 2 are counted.
// Run: node fixall_verify_rendering_r4_seams.mjs
const T = 6400;
function xs(seed) { let a = seed >>> 0 || 1, b = 0x9e3779b9, c = 0x85ebca6b, d = 0xc2b2ae35;
  return () => { const t = b << 9; let r = Math.imul(a, 5); r = ((r << 7) | (r >>> 25)) >>> 0; r = Math.imul(r, 9) >>> 0;
    c ^= a; d ^= b; b ^= c; a ^= d; c ^= t; d = ((d << 11) | (d >>> 21)); return r / 4294967296; }; }
function tor(d) { d = Math.abs(d); return d > T / 2 ? T - d : d; }
function bridson(rCm, rand) {
  const cell = rCm / Math.SQRT2, g = Math.ceil(T / cell), grid = new Int32Array(g * g).fill(-1);
  const X = [], Y = [], active = []; const r2 = rCm * rCm;
  const cellOf = (v) => Math.min(g - 1, Math.floor(v / cell));
  const add = (x, y) => { const i = X.length; X.push(x); Y.push(y); grid[cellOf(y) * g + cellOf(x)] = i; active.push(i); };
  add(Math.floor(rand() * T), Math.floor(rand() * T));
  while (active.length) {
    const ai = Math.floor(rand() * active.length), a = active[ai]; let fx = -1, fy = -1;
    for (let k = 0; k < 50; k++) {
      const ang = 2 * Math.PI * rand(), rad = rCm * (1 + rand());
      let x = Math.round(X[a] + rad * Math.cos(ang)), y = Math.round(Y[a] + rad * Math.sin(ang));
      x = ((x % T) + T) % T; y = ((y % T) + T) % T;
      const gx = cellOf(x), gy = cellOf(y); let ok = true;
      for (let dy = -2; ok && dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
        const q = grid[((gy + dy + g) % g) * g + ((gx + dx + g) % g)];
        if (q >= 0) { const ex = tor(X[q] - x), ey = tor(Y[q] - y); if (ex * ex + ey * ey < r2) { ok = false; break; } } }
      if (ok && fx < 0) { fx = x; fy = y; } }
    if (fx >= 0) add(fx, fy); else { active[ai] = active[active.length - 1]; active.pop(); }
  }
  return { X, Y };
}
const r0 = 400;
for (const base of [1000 * r0, 7000 * r0]) {
  const tiles = [1, 2, 3, 4].map((s) => bridson(r0, xs(base + s)));
  let pairs = 0, lt = 0, lt2 = 0, minD = Infinity, same = 0;
  for (let a = 0; a < 4; a++) for (let b = 0; b < 4; b++) for (const dir of ['x', 'y']) {
    // tile a at the origin cell, tile b in the next cell (+T in x or in y); count cross-seam pairs within r0 (seam band only)
    const A = tiles[a], B = tiles[b];
    for (let i = 0; i < A.X.length; i++) {
      const ax = A.X[i], ay = A.Y[i];
      if ((dir === 'x' ? T - ax : T - ay) >= r0) continue;
      for (let j = 0; j < B.X.length; j++) {
        const bx = B.X[j] + (dir === 'x' ? T : 0), by = B.Y[j] + (dir === 'y' ? T : 0);
        // the lateral offset wraps too: cells repeat along the seam
        const lat = dir === 'x' ? tor(by - ay) : tor(bx - ax), across = dir === 'x' ? bx - ax : by - ay;
        const d = Math.hypot(lat, across);
        if (d < r0) { if (a === b) same++; else { lt++; if (d < r0 / 2) lt2++; minD = Math.min(minD, d); } }
      }
    }
    if (a !== b) pairs++;
  }
  console.log(`tiles seeded from ${base + 1}..${base + 4}: points ${tiles.map((t) => t.X.length).join(' / ')}`);
  console.log(`  same-variant seams: pairs closer than r0 = ${same} (toroidal: expected 0)`);
  console.log(`  different-variant seams (${pairs} oriented seams of 64 m): pairs closer than r0 = ${lt} (${(lt / pairs).toFixed(1)} per seam), closer than r0/2 = ${lt2} (${(lt2 / pairs).toFixed(1)} per seam), closest ${minD.toFixed(0)} cm (${(minD / r0).toFixed(2)} x r0)`);
}
