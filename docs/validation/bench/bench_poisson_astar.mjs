// Red-team scale lens: (1) Bridson Poisson-disc with k = 50 candidates ALL evaluated per step (the variant §3.1 /
// D-11 adopt; references: validate/step = 50 exactly, step/emit ≈ 1.6), for the S4 routing lattice (≈ 40 k points at
// CITY) and for render-time tree scatter; (2) the S4 A* queries on a 25 m lattice graph with a slope cost.
// Our own code. Run: node bench_poisson_astar.mjs
const now = () => performance.now();
function rng(seed) { let s = seed >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }

function poissonAll50(W, H, r, rand) { // every step draws and tests all 50 candidates; accepts the first valid one found
  const cell = r / Math.SQRT2, gw = Math.ceil(W / cell), gh = Math.ceil(H / cell), grid = new Int32Array(gw * gh).fill(-1);
  const px = [], py = [], active = []; let steps = 0, tests = 0;
  const add = (x, y) => { const i = px.length; px.push(x); py.push(y); grid[((y / cell) | 0) * gw + ((x / cell) | 0)] = i; active.push(i); };
  add(W / 2, H / 2); const r2 = r * r;
  while (active.length) {
    const ai = (rand() * active.length) | 0, a = active[ai]; steps++; let found = -1, fx = 0, fy = 0;
    for (let k = 0; k < 50; k++) {
      const ang = rand() * 2 * Math.PI, rad = r * (1 + rand()); const x = px[a] + rad * Math.cos(ang), y = py[a] + rad * Math.sin(ang); tests++;
      if (x < 0 || y < 0 || x >= W || y >= H) continue;
      const gx = (x / cell) | 0, gy = (y / cell) | 0; let ok = true;
      for (let yy = Math.max(0, gy - 2); ok && yy <= Math.min(gh - 1, gy + 2); yy++) for (let xx = Math.max(0, gx - 2); xx <= Math.min(gw - 1, gx + 2); xx++) { const q = grid[yy * gw + xx]; if (q >= 0) { const dx = px[q] - x, dy = py[q] - y; if (dx * dx + dy * dy < r2) { ok = false; break; } } }
      if (ok && found < 0) { found = 1; fx = x; fy = y; }
    }
    if (found > 0) add(fx, fy); else { active[ai] = active[active.length - 1]; active.pop(); }
  }
  return { n: px.length, steps, tests };
}

// A* on a hex-ish lattice graph (jittered triangular lattice at spacing s) with cost = len * (1 + k slope^2)
function lattice(Wm, s, rand) { const cols = Math.floor(Wm / s), rows = Math.floor(Wm / (s * 0.866)); const n = cols * rows; const x = new Float64Array(n), y = new Float64Array(n), z = new Float64Array(n);
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const i = r * cols + c; x[i] = c * s + (r & 1 ? s / 2 : 0) + (rand() - 0.5) * s * 0.3; y[i] = r * s * 0.866 + (rand() - 0.5) * s * 0.3; z[i] = 20 * Math.sin(x[i] / 700) * Math.cos(y[i] / 900) + 8 * Math.sin(x[i] / 130 + y[i] / 170); }
  const nb = (i) => { const r = (i / cols) | 0, c = i % cols, odd = r & 1, out = []; const cand = [[r, c - 1], [r, c + 1], [r - 1, c - 1 + odd], [r - 1, c + odd], [r + 1, c - 1 + odd], [r + 1, c + odd]]; for (const [rr, cc] of cand) if (rr >= 0 && rr < rows && cc >= 0 && cc < cols) out.push(rr * cols + cc); return out; };
  const adjStart = new Int32Array(n + 1), adj = []; for (let i = 0; i < n; i++) { adjStart[i] = adj.length; for (const j of nb(i)) adj.push(j); } adjStart[n] = adj.length;
  return { n, x, y, z, adjStart, adj: Int32Array.from(adj), cols, rows }; }
function astar(G, s, t) { const { n, x, y, z, adjStart, adj } = G; const g = new Float64Array(n).fill(Infinity), closed = new Uint8Array(n); const hk = [], hv = []; // simple binary heap
  const push = (k, v) => { hk.push(k); hv.push(v); let i = hk.length - 1; while (i > 0) { const p = (i - 1) >> 1; if (hk[p] <= hk[i]) break; [hk[p], hk[i]] = [hk[i], hk[p]]; [hv[p], hv[i]] = [hv[i], hv[p]]; i = p; } };
  const pop = () => { const v = hv[0]; const lk = hk.pop(), lv = hv.pop(); if (hk.length) { hk[0] = lk; hv[0] = lv; let i = 0; for (;;) { let c = 2 * i + 1; if (c >= hk.length) break; if (c + 1 < hk.length && hk[c + 1] < hk[c]) c++; if (hk[c] >= hk[i]) break; [hk[c], hk[i]] = [hk[i], hk[c]]; [hv[c], hv[i]] = [hv[i], hv[c]]; i = c; } } return v; };
  const hfun = (i) => Math.hypot(x[i] - x[t], y[i] - y[t]); g[s] = 0; push(hfun(s), s); let expanded = 0;
  while (hk.length) { const c = pop(); if (closed[c]) continue; closed[c] = 1; expanded++; if (c === t) break;
    for (let e = adjStart[c]; e < adjStart[c + 1]; e++) { const j = adj[e]; if (closed[j]) continue; const len = Math.hypot(x[j] - x[c], y[j] - y[c]); const sl = (z[j] - z[c]) / len; const ng = g[c] + len * (1 + 40 * sl * sl); if (ng < g[j]) { g[j] = ng; push(ng + hfun(j), j); } } }
  return expanded; }

// warm-up
poissonAll50(300, 300, 6, rng(1));
console.log('== Poisson-disc, k = 50 all evaluated ==');
console.log('use | domain | r (m) | points | steps | candidate tests | ms | µs per point');
for (const [use, W, r] of [['S4 lattice CITY (5 km frame, 25 m)', 5000, 25], ['S4 lattice METRO (8 km frame, 25 m)', 8000, 25], ['one wood 300x300 m, 4 m trees', 300, 4], ['wood 600x600 m (36 ha), 4 m', 600, 4], ['garden block 120x120 m, 5 m', 120, 5]]) {
  const t = now(); const res = poissonAll50(W, W, r, rng(7)); const ms = now() - t;
  console.log(`${use} | ${W}x${W} m | ${r} | ${res.n} | ${res.steps} | ${res.tests} | ${ms.toFixed(1)} | ${(ms * 1000 / res.n).toFixed(2)}`);
}
console.log('== S4 A* on a 25 m jittered triangular lattice (6-neighbour), slope cost ==');
for (const [name, Wm] of [['CITY 5 km', 5000], ['METRO 8 km', 8000]]) {
  const R = rng(3); const tb = now(); const G = lattice(Wm, 25, R); const tBuild = now() - tb;
  const c = (G.rows >> 1) * G.cols + (G.cols >> 1); const Q = 12; let exp = 0; const qs = [];
  for (let q = 0; q < Q; q++) { const ang = (q / Q) * 2 * Math.PI; const rr = Math.round(G.rows / 2 + (G.rows / 2 - 2) * Math.sin(ang)), cc = Math.round(G.cols / 2 + (G.cols / 2 - 2) * Math.cos(ang)); qs.push(rr * G.cols + cc); }
  astar(G, c, qs[0]); // warm
  const t = now(); for (const d of qs) exp += astar(G, c, d); const ms = now() - t;
  console.log(`${name}: ${G.n} nodes (graph build ${tBuild.toFixed(1)} ms, excluded) | ${Q} plaza->frame-edge queries | ${ms.toFixed(1)} ms | expanded ${exp} nodes (${(exp / Q).toFixed(0)} per query)`);
}
