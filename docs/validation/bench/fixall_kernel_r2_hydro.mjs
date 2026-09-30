// fix-all round 2, kernel lane (VK-9): cost of S1's hydrology on a raster that covers frame + margin,
// with the mechanism §2.3 / §4.2 S1 (3) state: integer-centimetre heights, a bucket-queue priority flood that fills
// depressions exactly (no epsilon raise), two-gradient flat resolution into its own array, D8 with a fixed neighbour
// order, flow accumulation. Our own code (textbook algorithms); no reference code. Run: node fixall_kernel_r2_hydro.mjs
const now = () => performance.now();
function rng(seed) { let s = seed >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
// value noise with smooth interpolation (cheap; the heightfield's character does not matter for the flood's cost)
function heights(N, cellM, reliefM, seed) {
  const r = rng(seed), G = 64, lat = new Float64Array((G + 1) * (G + 1)); for (let i = 0; i < lat.length; i++) lat[i] = r();
  const h = new Int32Array(N * N);
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    let v = 0, a = 1, f = 1 / 40, tot = 0;
    for (let o = 0; o < 5; o++) {
      const gx = (x * f) % G, gy = (y * f) % G, ix = Math.floor(gx), iy = Math.floor(gy), fx = gx - ix, fy = gy - iy;
      const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
      const i00 = lat[iy * (G + 1) + ix], i10 = lat[iy * (G + 1) + ix + 1], i01 = lat[(iy + 1) * (G + 1) + ix], i11 = lat[(iy + 1) * (G + 1) + ix + 1];
      v += a * ((i00 * (1 - sx) + i10 * sx) * (1 - sy) + (i01 * (1 - sx) + i11 * sx) * sy); tot += a; a *= 0.5; f *= 2;
    }
    h[y * N + x] = Math.round((v / tot) * reliefM * 100);   // integer centimetres above datum
  }
  return h;
}
const DX = [1, 1, 0, -1, -1, -1, 0, 1], DY = [0, 1, 1, 1, 0, -1, -1, -1];   // E, NE, N, NW, W, SW, S, SE (fixed order)
function flood(h, N) {   // bucket-queue priority flood on integer heights; depressions filled to the spill height exactly
  let lo = Infinity, hi = -Infinity; for (let i = 0; i < h.length; i++) { if (h[i] < lo) lo = h[i]; if (h[i] > hi) hi = h[i]; }
  const H = hi - lo + 1, head = new Int32Array(H).fill(-1), next = new Int32Array(N * N), seen = new Uint8Array(N * N);
  const pit = new Int32Array(N * N); let ph = 0, pt = 0; let cur = 0, pops = 0;
  const push = (i) => { const k = h[i] - lo; next[i] = head[k]; head[k] = i; if (k < cur) cur = k; };
  for (let x = 0; x < N; x++) for (const y of [0, N - 1]) { const i = y * N + x; if (!seen[i]) { seen[i] = 1; push(i); } }
  for (let y = 1; y < N - 1; y++) for (const x of [0, N - 1]) { const i = y * N + x; if (!seen[i]) { seen[i] = 1; push(i); } }
  for (;;) {
    let c;
    if (ph < pt) c = pit[ph++];
    else { while (cur < H && head[cur] < 0) cur++; if (cur >= H) break; c = head[cur]; head[cur] = next[c]; }
    pops++; const cx = c % N, cy = (c / N) | 0, hc = h[c];
    for (let d = 0; d < 8; d++) { const nx = cx + DX[d], ny = cy + DY[d]; if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
      const ni = ny * N + nx; if (seen[ni]) continue; seen[ni] = 1;
      if (h[ni] <= hc) { h[ni] = hc; pit[pt++] = ni; } else push(ni); }
  }
  return pops;
}
function d8(h, N, rank) {   // steepest descent; on flats the lowest flat rank; ties by the fixed neighbour order
  const dir = new Uint8Array(N * N);
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { const i = y * N + x; let best = 255, bs = 0, br = rank[i];
    for (let d = 0; d < 8; d++) { const nx = x + DX[d], ny = y + DY[d]; if (nx < 0 || ny < 0 || nx >= N || ny >= N) { if (best === 255) { best = 8; } continue; }
      const ni = ny * N + nx, dz = h[i] - h[ni]; const s = (d & 1) ? dz / 1.4142135623730951 : dz;
      if (s > bs) { bs = s; best = d; } else if (s === 0 && bs === 0 && dz === 0 && rank[ni] < br) { br = rank[ni]; best = d; } }
    dir[i] = best; }
  return dir;
}
function flats(h, N) {   // two-gradient flat resolution (away from higher ground, towards lower ground), combined rank
  const n = N * N, away = new Int32Array(n), toward = new Int32Array(n), q = new Int32Array(n), isFlat = new Uint8Array(n);
  let qh = 0, qt = 0, q2 = new Int32Array(n), q2t = 0;
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { const i = y * N + x; let lower = false, equal = false, higher = false;
    for (let d = 0; d < 8; d++) { const nx = x + DX[d], ny = y + DY[d]; if (nx < 0 || ny < 0 || nx >= N || ny >= N) { lower = true; continue; }
      const dz = h[y * N + x] - h[ny * N + nx]; if (dz > 0) lower = true; else if (dz === 0) equal = true; else higher = true; }
    if (!lower && equal) isFlat[i] = 1; }
  for (let i = 0; i < n; i++) if (isFlat[i]) { const x = i % N, y = (i / N) | 0; let edgeHigh = false, edgeLow = false;
    for (let d = 0; d < 8; d++) { const nx = x + DX[d], ny = y + DY[d]; if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue; const ni = ny * N + nx;
      if (h[ni] > h[i]) edgeHigh = true; if (h[ni] === h[i] && !isFlat[ni]) edgeLow = true; }
    if (edgeHigh) { away[i] = 1; q[qt++] = i; } if (edgeLow) { toward[i] = 1; q2[q2t++] = i; } }
  const bfs = (arr, qq, tt) => { let hh = 0; while (hh < tt) { const c = qq[hh++], x = c % N, y = (c / N) | 0;
    for (let d = 0; d < 8; d++) { const nx = x + DX[d], ny = y + DY[d]; if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue; const ni = ny * N + nx;
      if (isFlat[ni] && arr[ni] === 0 && h[ni] === h[c]) { arr[ni] = arr[c] + 1; qq[tt++] = ni; } } } };
  bfs(away, q, qt); bfs(toward, q2, q2t);
  const rank = new Uint32Array(n); for (let i = 0; i < n; i++) if (isFlat[i]) rank[i] = 2 * toward[i] + (away[i] ? 1000000 - away[i] : 0) % 1000000;
  let flatCells = 0; for (let i = 0; i < n; i++) flatCells += isFlat[i];
  return { rank, flatCells };
}
function accum(dir, N) {   // flow accumulation by in-degree topological order
  const n = N * N, indeg = new Int32Array(n), acc = new Uint32Array(n).fill(1), q = new Int32Array(n); let qh = 0, qt = 0;
  for (let i = 0; i < n; i++) { const d = dir[i]; if (d < 8) { const x = i % N + DX[d], y = ((i / N) | 0) + DY[d]; indeg[y * N + x]++; } }
  for (let i = 0; i < n; i++) if (!indeg[i]) q[qt++] = i;
  while (qh < qt) { const c = q[qh++], d = dir[c]; if (d >= 8) continue; const t = (((c / N) | 0) + DY[d]) * N + (c % N + DX[d]); acc[t] += acc[c]; if (--indeg[t] === 0) q[qt++] = t; }
  let undef = 0; for (let i = 0; i < n; i++) if (dir[i] === 255) undef++;
  return { acc, undef };
}
const cases = [
  // the previous spec: hydrology on the frame only (TOWN 10 m, CITY 16 m, METROPOLIS 20 m)
  ['TOWN frame only 2 km @10 m (previous spec)', 200, 10], ['CITY frame only 5 km @16 m (previous spec)', 313, 16], ['METRO frame only 8 km @20 m (previous spec)', 400, 20],
  // the chosen spec: frame + 30 % margin per side at 1.6 x the cell, so the cell count is unchanged
  ['TOWN frame+margin 3.2 km @16 m (chosen)', 200, 16], ['CITY frame+margin 8 km @25 m (chosen)', 320, 25], ['METRO frame+margin 12.8 km @32 m (chosen)', 400, 32],
  // the alternative: frame + margin at the previous cells (2.56 x the cells)
  ['CITY frame+margin 8 km @16 m (rejected)', 500, 16], ['METRO frame+margin 12.8 km @20 m (rejected)', 640, 20],
];
console.log('case | cells | relief m | flood ms | flats ms (flat cells) | D8 ms | accum ms | hydrology total ms | cells without D8');
for (const [name, N, cellM] of cases) for (const relief of [60, 3000]) {
  const runs = []; let last;
  for (let rep = 0; rep < 5; rep++) {
    const h = heights(N, cellM, relief, 7 + rep);
    const t0 = now(); flood(h, N); const t1 = now(); const f = flats(h, N); const t2 = now(); const dir = d8(h, N, f.rank); const t3 = now(); const a = accum(dir, N); const t4 = now();
    runs.push([t1 - t0, t2 - t1, t3 - t2, t4 - t3]); last = { flatCells: f.flatCells, undef: a.undef };
  }
  runs.sort((p, q) => (p[0] + p[1] + p[2] + p[3]) - (q[0] + q[1] + q[2] + q[3])); const m = runs[2];
  console.log(`${name} | ${N * N} | ${relief} | ${m[0].toFixed(1)} | ${m[1].toFixed(1)} (${last.flatCells}) | ${m[2].toFixed(1)} | ${m[3].toFixed(1)} | ${(m[0] + m[1] + m[2] + m[3]).toFixed(1)} | ${last.undef}`);
}
