// The calibration benchmark's four Node kernels (§12.1), FROZEN (C-0050): the bench's own implementations over fixed
// inputs, importing nothing — no model package, no adopted library — so the score never moves with the product's code
// and stays comparable across every later release. A change to any kernel or input is a new CALIBRATE_VERSION, and a
// reference score taken with another version does not normalise (the detector names it).
//
//   fbm       5-octave fBm over 256² cells — gradient noise after Perlin, "Improving Noise" (SIGGRAPH 2002): the
//             quintic fade and the hashed gradients, a permutation table shuffled by the fixed generator; written as one
//             loop nest with table-driven gradients (no calls, no branches on the hash), since a gradient `switch` left
//             the engine's compiled code bimodal from process to process (≈ 5 ms against ≈ 7.5 ms, measured
//             2026-10-03) and a calibration score must not depend on a tier-up decision
//   flood     a bucket-queue priority flood over 256² — Barnes, Lehman & Mulla, "Priority-Flood" (Computers &
//             Geosciences 62, 2014): the depression fill seeded from the edge, integer levels in a monotone bucket queue
//   dijkstra  a 20 000-node Dijkstra (1959) with a binary heap and lazy deletion, over a fixed weighted grid graph
//   sort      a 100 000-element typed-array sort (a Float64Array copied and sorted by the engine's numeric sort)

/** The kernel set's version; bump it with any change to a kernel or its inputs (C-0050). */
export const CALIBRATE_VERSION = 1;

export const GRID = 256;
export const NODES = 20_000;
export const SORT_N = 100_000;

/** The fixed generator: the 32-bit linear congruential step of Numerical Recipes (a = 1664525, c = 1013904223). */
export function lcg(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s;
  };
}

// ---------------------------------------------------------------------------------------------------------------- fbm

const PERM = (() => {
  const next = lcg(0x5eed0001);
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = next() % (i + 1);
    const t = p[i];
    p[i] = p[j];
    p[j] = t;
  }
  const perm = new Uint8Array(512);
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  return perm;
})();

const GX = new Float64Array([1, -1, 1, -1, 1, -1, 0, 0]);
const GY = new Float64Array([1, 1, -1, -1, 0, 0, 1, -1]);

/** 5-octave fBm over GRID² cells (base frequency 1/32 a cell, lacunarity 2, gain 0.5) into `out`; one loop nest, no calls. */
export function fbm(out: Float64Array = new Float64Array(GRID * GRID)): Float64Array {
  const P = PERM;
  for (let j = 0; j < GRID; j++) {
    for (let i = 0; i < GRID; i++) {
      let sum = 0;
      let amp = 1;
      let freq = 1 / 32;
      for (let o = 0; o < 5; o++) {
        const x = (i + 0.5) * freq;
        const y = (j + 0.5) * freq;
        const fx = Math.floor(x);
        const fy = Math.floor(y);
        const X = fx & 255;
        const Y = fy & 255;
        const xf = x - fx;
        const yf = y - fy;
        const u = xf * xf * xf * (xf * (xf * 6 - 15) + 10);
        const v = yf * yf * yf * (yf * (yf * 6 - 15) + 10);
        const a = P[X] + Y;
        const b = P[X + 1] + Y;
        const h00 = P[a] & 7;
        const h10 = P[b] & 7;
        const h01 = P[a + 1] & 7;
        const h11 = P[b + 1] & 7;
        const n00 = GX[h00] * xf + GY[h00] * yf;
        const n10 = GX[h10] * (xf - 1) + GY[h10] * yf;
        const n01 = GX[h01] * xf + GY[h01] * (yf - 1);
        const n11 = GX[h11] * (xf - 1) + GY[h11] * (yf - 1);
        const nx0 = n00 + u * (n10 - n00);
        const nx1 = n01 + u * (n11 - n01);
        sum += amp * (nx0 + v * (nx1 - nx0));
        amp *= 0.5;
        freq *= 2;
      }
      out[j * GRID + i] = sum;
    }
  }
  return out;
}

// -------------------------------------------------------------------------------------------------------------- flood

export const LEVELS = 1024;

/** The flood's fixed input: the fBm field quantised to LEVELS integer levels (built once, outside the timing). */
export function floodInput(): Int32Array {
  const f = fbm();
  let lo = Infinity;
  let hi = -Infinity;
  for (let k = 0; k < f.length; k++) {
    if (f[k] < lo) lo = f[k];
    if (f[k] > hi) hi = f[k];
  }
  const e = new Int32Array(f.length);
  const scale = (LEVELS - 1) / (hi - lo);
  for (let k = 0; k < f.length; k++) e[k] = Math.floor((f[k] - lo) * scale);
  return e;
}

/** The priority flood with a monotone bucket queue: fills every depression of `e` (8-neighbour) and returns the surface. */
export function flood(e: Int32Array): Int32Array {
  const n = GRID * GRID;
  const filled = new Int32Array(n);
  const closed = new Uint8Array(n);
  const head = new Int32Array(LEVELS).fill(-1);
  const next = new Int32Array(n);
  const push = (i: number, lvl: number): void => {
    next[i] = head[lvl];
    head[lvl] = i;
  };
  for (let i = 0; i < GRID; i++) {
    for (const k of [i, (GRID - 1) * GRID + i, i * GRID, i * GRID + GRID - 1]) {
      if (closed[k] === 0) {
        closed[k] = 1;
        filled[k] = e[k];
        push(k, e[k]);
      }
    }
  }
  let cur = 0;
  while (cur < LEVELS) {
    const i = head[cur];
    if (i < 0) {
      cur++;
      continue;
    }
    head[cur] = next[i];
    const x = i % GRID;
    const y = (i - x) / GRID;
    for (let dy = -1; dy <= 1; dy++) {
      const yy = y + dy;
      if (yy < 0 || yy >= GRID) continue;
      for (let dx = -1; dx <= 1; dx++) {
        const xx = x + dx;
        if ((dx === 0 && dy === 0) || xx < 0 || xx >= GRID) continue;
        const j = yy * GRID + xx;
        if (closed[j] !== 0) continue;
        closed[j] = 1;
        const f = e[j] > cur ? e[j] : cur;
        filled[j] = f;
        push(j, f);
      }
    }
  }
  return filled;
}

// ----------------------------------------------------------------------------------------------------------- dijkstra

export interface Graph {
  /** CSR offsets (NODES + 1). */
  off: Int32Array;
  to: Int32Array;
  w: Int32Array;
}

/** The fixed graph: a 100 × 200 grid (right and down neighbours, weights 1–64) plus one chord a node (weights 1–256), undirected. */
export function graphInput(): Graph {
  const W = 200;
  const H = NODES / W;
  const next = lcg(0x5eed0002);
  const edges: number[] = [];
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const v = y * W + x;
      if (x + 1 < W) edges.push(v, v + 1, 1 + (next() % 64));
      if (y + 1 < H) edges.push(v, v + W, 1 + (next() % 64));
      const u = next() % NODES;
      if (u !== v) edges.push(v, u, 1 + (next() % 256));
    }
  }
  const deg = new Int32Array(NODES + 1);
  for (let k = 0; k < edges.length; k += 3) {
    deg[edges[k]]++;
    deg[edges[k + 1]]++;
  }
  const off = new Int32Array(NODES + 1);
  for (let v = 0; v < NODES; v++) off[v + 1] = off[v] + deg[v];
  const fillAt = off.slice(0, NODES);
  const to = new Int32Array(off[NODES]);
  const w = new Int32Array(off[NODES]);
  for (let k = 0; k < edges.length; k += 3) {
    const a = edges[k];
    const b = edges[k + 1];
    const c = edges[k + 2];
    to[fillAt[a]] = b;
    w[fillAt[a]++] = c;
    to[fillAt[b]] = a;
    w[fillAt[b]++] = c;
  }
  return { off, to, w };
}

/** Single-source shortest paths from node 0 with a binary heap and lazy deletion; returns the distances. */
export function dijkstra(g: Graph): Float64Array {
  const dist = new Float64Array(NODES).fill(Infinity);
  const cap = g.to.length + 1;
  const hk = new Float64Array(cap);
  const hv = new Int32Array(cap);
  let size = 0;
  const push = (k: number, v: number): void => {
    let i = size++;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (hk[p] <= k) break;
      hk[i] = hk[p];
      hv[i] = hv[p];
      i = p;
    }
    hk[i] = k;
    hv[i] = v;
  };
  const pop = (): number => {
    const top = hv[0];
    const k = hk[--size];
    const v = hv[size];
    let i = 0;
    for (;;) {
      let c = 2 * i + 1;
      if (c >= size) break;
      if (c + 1 < size && hk[c + 1] < hk[c]) c++;
      if (hk[c] >= k) break;
      hk[i] = hk[c];
      hv[i] = hv[c];
      i = c;
    }
    hk[i] = k;
    hv[i] = v;
    return top;
  };
  dist[0] = 0;
  push(0, 0);
  while (size > 0) {
    const d = hk[0];
    const v = pop();
    if (d > dist[v]) continue;
    for (let a = g.off[v]; a < g.off[v + 1]; a++) {
      const u = g.to[a];
      const nd = d + g.w[a];
      if (nd < dist[u]) {
        dist[u] = nd;
        push(nd, u);
      }
    }
  }
  return dist;
}

// --------------------------------------------------------------------------------------------------------------- sort

/** The sort's fixed input: SORT_N values in [0, 1) from the fixed generator. */
export function sortInput(): Float64Array {
  const next = lcg(0x5eed0003);
  const a = new Float64Array(SORT_N);
  for (let i = 0; i < SORT_N; i++) a[i] = next() / 4294967296;
  return a;
}

/** Copies the input and sorts it with the typed array's numeric sort. */
export function sortKernel(src: Float64Array): Float64Array {
  return src.slice().sort();
}

// ------------------------------------------------------------------------------------------------------------ the set

export interface Kernel {
  name: 'fbm' | 'flood' | 'dijkstra' | 'sort';
  /** Runs the kernel once over its fixed input and returns a checksum of its output (so the work is never elided). */
  run(): number;
}

/** The four kernels with their fixed inputs built once (outside every timing). */
export function kernels(): Kernel[] {
  const field = new Float64Array(GRID * GRID);
  const e = floodInput();
  const g = graphInput();
  const s = sortInput();
  return [
    {
      name: 'fbm',
      run: () => {
        const f = fbm(field);
        let sum = 0;
        for (let k = 0; k < f.length; k++) sum += f[k];
        return sum;
      },
    },
    {
      name: 'flood',
      run: () => {
        const f = flood(e);
        let vol = 0;
        for (let k = 0; k < f.length; k++) vol += f[k] - e[k];
        return vol;
      },
    },
    {
      name: 'dijkstra',
      run: () => {
        const d = dijkstra(g);
        let sum = 0;
        for (let k = 0; k < d.length; k++) sum += d[k];
        return sum;
      },
    },
    {
      name: 'sort',
      run: () => {
        const a = sortKernel(s);
        return a[0] + a[SORT_N >> 1] + a[SORT_N - 1];
      },
    },
  ];
}
