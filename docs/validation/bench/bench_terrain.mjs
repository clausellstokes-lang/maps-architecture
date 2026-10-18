// Red-team scale lens: cost of the raster work §12 budgets for S1 (terrain + hydrology + contours),
// S5 (stage boundary = level set of a cost-distance field) and S6 (smoothed prosperity field).
// Our own code (textbook algorithms: 2-D simplex noise, priority-flood, D8, accumulation, marching squares,
// Dijkstra, separable Gaussian, box blur). No reference code. Run: node bench_terrain.mjs
const now = () => performance.now();

// ---- seeded RNG (xorshift32) ----
function rng(seed) { let s = seed >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }

// ---- 2-D simplex noise (Gustavson-style) ----
function makeSimplex(seed) {
  const r = rng(seed), p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) { const j = Math.floor(r() * (i + 1)); const t = p[i]; p[i] = p[j]; p[j] = t; }
  const perm = new Uint8Array(512); for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  const gx = new Float64Array([1, -1, 1, -1, 1, -1, 0, 0]), gy = new Float64Array([1, 1, -1, -1, 0, 0, 1, -1]);
  const F2 = 0.5 * (Math.sqrt(3) - 1), G2 = (3 - Math.sqrt(3)) / 6;
  return function (xin, yin) {
    const s = (xin + yin) * F2, i = Math.floor(xin + s), j = Math.floor(yin + s), t = (i + j) * G2;
    const x0 = xin - (i - t), y0 = yin - (j - t);
    const i1 = x0 > y0 ? 1 : 0, j1 = 1 - i1;
    const x1 = x0 - i1 + G2, y1 = y0 - j1 + G2, x2 = x0 - 1 + 2 * G2, y2 = y0 - 1 + 2 * G2;
    const ii = i & 255, jj = j & 255;
    let n = 0, tt;
    tt = 0.5 - x0 * x0 - y0 * y0; if (tt > 0) { const g = perm[ii + perm[jj]] & 7; tt *= tt; n += tt * tt * (gx[g] * x0 + gy[g] * y0); }
    tt = 0.5 - x1 * x1 - y1 * y1; if (tt > 0) { const g = perm[ii + i1 + perm[jj + j1]] & 7; tt *= tt; n += tt * tt * (gx[g] * x1 + gy[g] * y1); }
    tt = 0.5 - x2 * x2 - y2 * y2; if (tt > 0) { const g = perm[ii + 1 + perm[jj + 1]] & 7; tt *= tt; n += tt * tt * (gx[g] * x2 + gy[g] * y2); }
    return 70 * n;
  };
}

function fbm(N, octaves, noise) {
  const h = new Float32Array(N * N); const base = 1 / 180;
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    let a = 1, f = base, v = 0;
    for (let o = 0; o < octaves; o++) { v += a * noise(x * f, y * f); a *= 0.5; f *= 2; }
    h[y * N + x] = v * 40;
  }
  return h;
}

// ---- binary min-heap on (key: Float64, val: Int32) ----
class Heap {
  constructor(cap) { this.k = new Float64Array(cap); this.v = new Int32Array(cap); this.n = 0; }
  push(key, val) { let i = this.n++; const k = this.k, v = this.v; while (i > 0) { const p = (i - 1) >> 1; if (k[p] <= key) break; k[i] = k[p]; v[i] = v[p]; i = p; } k[i] = key; v[i] = val; }
  pop() { const k = this.k, v = this.v, top = v[0]; this.topKey = k[0]; const n = --this.n; if (n === 0) return top; const key = k[n], val = v[n]; let i = 0;
    for (;;) { let c = 2 * i + 1; if (c >= n) break; if (c + 1 < n && k[c + 1] < k[c]) c++; if (k[c] >= key) break; k[i] = k[c]; v[i] = v[c]; i = c; }
    k[i] = key; v[i] = val; return top; }
}
const DX = [1, 1, 0, -1, -1, -1, 0, 1], DY = [0, 1, 1, 1, 0, -1, -1, -1], DL = [1, Math.SQRT2, 1, Math.SQRT2, 1, Math.SQRT2, 1, Math.SQRT2];

function priorityFlood(h, N) { // fills sinks in place; returns pop order (ascending filled elevation)
  const seen = new Uint8Array(N * N), heap = new Heap(N * N), order = new Int32Array(N * N); let oi = 0;
  for (let x = 0; x < N; x++) for (const y of [0, N - 1]) { const i = y * N + x; if (!seen[i]) { seen[i] = 1; heap.push(h[i], i); } }
  for (let y = 1; y < N - 1; y++) for (const x of [0, N - 1]) { const i = y * N + x; if (!seen[i]) { seen[i] = 1; heap.push(h[i], i); } }
  while (heap.n) { const c = heap.pop(); order[oi++] = c; const cx = c % N, cy = (c / N) | 0, hc = h[c];
    for (let d = 0; d < 8; d++) { const nx = cx + DX[d], ny = cy + DY[d]; if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue; const ni = ny * N + nx; if (seen[ni]) continue; seen[ni] = 1; if (h[ni] <= hc) h[ni] = hc + 1e-3; heap.push(h[ni], ni); } }
  return order;
}
function d8(h, N) { const dir = new Uint8Array(N * N);
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { const i = y * N + x; let best = 0, bd = 255;
    for (let d = 0; d < 8; d++) { const nx = x + DX[d], ny = y + DY[d]; if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue; const s = (h[i] - h[ny * N + nx]) / DL[d]; if (s > best) { best = s; bd = d; } }
    dir[i] = bd; }
  return dir; }
function accumulate(dir, order, N) { const acc = new Uint32Array(N * N).fill(1);
  for (let k = order.length - 1; k >= 0; k--) { const i = order[k], d = dir[i]; if (d === 255) continue; const x = i % N, y = (i / N) | 0; const ni = (y + DY[d]) * N + (x + DX[d]); acc[ni] += acc[i]; }
  return acc; }
function marching(h, N, levels) { let segs = 0;
  for (const L of levels) for (let y = 0; y < N - 1; y++) for (let x = 0; x < N - 1; x++) { const i = y * N + x;
    const c = (h[i] > L ? 1 : 0) | (h[i + 1] > L ? 2 : 0) | (h[i + N + 1] > L ? 4 : 0) | (h[i + N] > L ? 8 : 0);
    if (c !== 0 && c !== 15) segs += (c === 5 || c === 10) ? 2 : 1; }
  return segs; }
function dijkstra(h, N, cellM) { const dist = new Float64Array(N * N).fill(Infinity), heap = new Heap(N * N * 4); const s = (N >> 1) * N + (N >> 1); dist[s] = 0; heap.push(0, s); let pops = 0;
  while (heap.n) { const c = heap.pop(), dc = heap.topKey; if (dc > dist[c]) continue; pops++; const cx = c % N, cy = (c / N) | 0;
    for (let d = 0; d < 8; d++) { const nx = cx + DX[d], ny = cy + DY[d]; if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue; const ni = ny * N + nx; const run = DL[d] * cellM; const slope = (h[ni] - h[c]) / run; const nd = dc + run * (1 + 20 * slope * slope); if (nd < dist[ni]) { dist[ni] = nd; heap.push(nd, ni); } } }
  return pops; }
function gauss(src, N, sigma) { const r = Math.ceil(3 * sigma), w = new Float64Array(2 * r + 1); let sum = 0; for (let k = -r; k <= r; k++) { w[k + r] = Math.exp(-(k * k) / (2 * sigma * sigma)); sum += w[k + r]; } for (let k = 0; k < w.length; k++) w[k] /= sum;
  const tmp = new Float32Array(N * N), out = new Float32Array(N * N);
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { let a = 0; for (let k = -r; k <= r; k++) { const xx = Math.min(N - 1, Math.max(0, x + k)); a += w[k + r] * src[y * N + xx]; } tmp[y * N + x] = a; }
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { let a = 0; for (let k = -r; k <= r; k++) { const yy = Math.min(N - 1, Math.max(0, y + k)); a += w[k + r] * tmp[yy * N + x]; } out[y * N + x] = a; }
  return out; }
function boxBlur3(src, N, sigma) { // three running-sum box passes per axis (O(N^2) independent of sigma)
  const r = Math.max(1, Math.round(Math.sqrt((12 * sigma * sigma) / 3 + 1) / 2)); let a = Float32Array.from(src), b = new Float32Array(N * N);
  for (let pass = 0; pass < 3; pass++) { for (let y = 0; y < N; y++) { let acc = 0; for (let k = -r; k <= r; k++) acc += a[y * N + Math.min(N - 1, Math.max(0, k))]; for (let x = 0; x < N; x++) { b[y * N + x] = acc / (2 * r + 1); acc += a[y * N + Math.min(N - 1, x + r + 1)] - a[y * N + Math.max(0, x - r)]; } }
    for (let x = 0; x < N; x++) { let acc = 0; for (let k = -r; k <= r; k++) acc += b[Math.min(N - 1, Math.max(0, k)) * N + x]; for (let y = 0; y < N; y++) { a[y * N + x] = acc / (2 * r + 1); acc += b[Math.min(N - 1, y + r + 1) * N + x] - b[Math.max(0, y - r) * N + x]; } } }
  return a; }

function time(fn) { const t = now(); const r = fn(); return [now() - t, r]; }
const cases = [
  ['TOWN frame 2 km @5 m', 400, 5], ['CITY frame 5 km @8 m (the budgeted 625^2)', 625, 8], ['CITY frame+30% margin 8 km @8 m', 1000, 8],
  ['METRO frame 8 km @10 m', 800, 10], ['METRO frame+margin 12.8 km @10 m', 1280, 10], ['CITY built extent refined 2.5 km @2.5 m', 1000, 2.5],
];
const noise = makeSimplex(12345);
fbm(200, 5, noise); // JIT warm-up
{ const h = fbm(300, 5, noise); const o = priorityFlood(h, 300); accumulate(d8(h, 300), o, 300); marching(h, 300, [0, 10]); dijkstra(h, 300, 8); gauss(h, 300, 7.5); boxBlur3(h, 300, 7.5); }
console.log('case | cells | fBm5 ms (ns/eval) | priority-flood ms | D8 ms | accum ms | marching x10 levels ms | S1 subtotal ms | raster Dijkstra ms | Gaussian sigma=60 m ms | 3-box ms');
for (const [name, N, cellM] of cases) {
  const cells = N * N;
  const [tF, h] = time(() => fbm(N, 5, noise));
  const [tP, order] = time(() => priorityFlood(h, N));
  const [tD, dir] = time(() => d8(h, N));
  const [tA] = time(() => accumulate(dir, order, N));
  const lv = []; for (let k = -40; k <= 40; k += 8) lv.push(k);
  const [tM] = time(() => marching(h, N, lv));
  const [tJ] = time(() => dijkstra(h, N, cellM));
  const sigma = 60 / cellM;
  const [tG] = time(() => gauss(h, N, sigma));
  const [tB] = time(() => boxBlur3(h, N, sigma));
  const s1 = tF + tP + tD + tA + tM;
  console.log(`${name} | ${cells} | ${tF.toFixed(1)} (${(tF * 1e6 / (cells * 5)).toFixed(1)}) | ${tP.toFixed(1)} | ${tD.toFixed(1)} | ${tA.toFixed(1)} | ${tM.toFixed(1)} | ${s1.toFixed(1)} | ${tJ.toFixed(1)} | ${tG.toFixed(1)} (r=${Math.ceil(3 * sigma)}) | ${tB.toFixed(1)}`);
}
