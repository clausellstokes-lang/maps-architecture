// check/M0-a-11-close-s6 — the band's stress (J761 (4) (ii)): the closing checker's own generator of faces whose
// sharpest corner is drawn in [1°, 5°) — convex wedges, slivers and rhombi, reflex slit notches, spikes, saws of
// adjacent teeth, stars with a spike or a notch, holed faces (plain holes beside a band corner, a wedge-shaped hole, a
// hole near a sharp tip), from a few metres to tens of kilometres, at any rotation, snapped to the lattice. A face
// counts when the sharpest corner of its CLEANED rings lies in the band (band-lib.mjs); every face is read for the
// three uses and judged: validated (and our own independent reading of the graph), a typed downgrade by cause, a throw,
// E_WORK_LIMIT, the time of the slowest call, and the equality of the spine and regions graphs apart from `use`.
//
//   corepack pnpm exec tsx --conditions=plat-source docs/build/checks/M0-a-11-s6-evidence/stress-band.mjs <out.json> <seed> <draws per kind> [<lo°> <hi°>]
// With <lo°> <hi°> every angle is drawn uniformly in [lo, hi) — the band's edge at 1°, where the contract's exact test meets
// the engine's fold threshold, is read with 1 1.01.
import { writeFileSync } from 'node:fs';
import { add, newTally, readFace } from './band-lib.mjs';

const [out, seedArg, drawsArg, loArg, hiArg] = process.argv.slice(2);
if (out === undefined) throw new Error('usage: stress-band.mjs <out.json> <seed> <draws per kind>');
const SEED = Number(seedArg ?? 1);
const DRAWS = Number(drawsArg ?? 1000);
const LO = loArg === undefined ? null : Number(loArg);
const HI = hiArg === undefined ? 5 : Number(hiArg);
const RAD = Math.PI / 180;
const RANGE = 8_388_607;

function mulberry(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const U = (r, lo, hi) => lo + r() * (hi - lo);
const logU = (r, lo, hi) => Math.exp(U(r, Math.log(lo), Math.log(hi)));
const I = (r, lo, hi) => lo + Math.floor(r() * (hi - lo + 1));

/** A band angle in degrees: mostly uniform in [1, 5), with the two edges of the band drawn more often. */
function theta(r) {
  if (LO !== null) return U(r, LO, HI);
  const k = r();
  if (k < 0.1) return U(r, 1.0, 1.03);
  if (k < 0.16) return U(r, 4.95, 5.0);
  return U(r, 1, 5);
}
const dir = (deg) => [Math.cos(deg * RAD), Math.sin(deg * RAD)];

/** A convex wedge: the apex at the origin, two arms at ± θ/2, closed by a convex bulge of 0–4 vertices. */
function wedge(r, lo = 300, hi = 200_000) {
  const th = theta(r);
  const L1 = logU(r, lo, hi);
  const L2 = r() < 0.4 ? L1 : L1 * U(r, 0.3, 1);
  const a = dir(-th / 2);
  const b = dir(th / 2);
  const A = [L1 * a[0], L1 * a[1]];
  const B = [L2 * b[0], L2 * b[1]];
  const m = I(r, 0, 4);
  const chord = Math.hypot(B[0] - A[0], B[1] - A[1]);
  const bulge = chord * U(r, 0.05, 0.6) + U(r, 50, 2000);
  const ring = [[0, 0], A];
  for (let i = 1; i <= m; i += 1) {
    const t = i / (m + 1);
    ring.push([A[0] + (B[0] - A[0]) * t + bulge * 4 * t * (1 - t), A[1] + (B[1] - A[1]) * t]);
  }
  ring.push(B);
  return { rings: [ring], L: Math.max(L1, L2), th };
}

/** A rhombus with two band corners. */
function rhombus(r) {
  const th = theta(r);
  const L = logU(r, 1500, 300_000);
  const [c, s] = dir(th / 2);
  return { rings: [[[0, 0], [L * c, -L * s], [2 * L * c, 0], [L * c, L * s]]] };
}

/** A triangle with one band corner between a long arm and a shorter one. */
function sliver(r) {
  const th = theta(r);
  const L = logU(r, 1500, 400_000);
  const s = L * U(r, 0.05, 1);
  const [c, sn] = dir(th);
  return { rings: [[[0, 0], [L, 0], [s * c, s * sn]]] };
}

/** A feature on the top side y = H of a slab, at x0: a notch into it (down) or a spike out of it (up), its tip angle θ, skewed. Returns the three points right-to-left. */
function feature(r, x0, H, d, up) {
  const th = theta(r);
  const skew = U(r, -25, 25);
  const tip = [x0 + d * Math.tan(skew * RAD), up ? H + d : H - d];
  // from the tip back to the side, along the two arms at ± θ/2 about the tip's axis
  const axis = up ? -90 - skew : 90 + skew;
  const pts = [-1, 1].map((sg) => {
    const [cx, cy] = dir(axis + (sg * th) / 2);
    const l = d / Math.abs(cy);
    return [tip[0] + l * cx, H];
  });
  pts.sort((p, q) => q[0] - p[0]);
  return [pts[0], tip, pts[1]];
}

/** A rectangle with one notch or spike on its top side. */
function slab(r, up, maxDepthShare = 0.9) {
  const W = logU(r, 1000, 150_000);
  const H = logU(r, 1000, 150_000);
  const d = up ? logU(r, 400, 200_000) : U(r, 0.1, maxDepthShare) * H;
  const x0 = U(r, 0.3, 0.7) * W;
  const f = feature(r, x0, H, d, up);
  return { rings: [[[0, 0], [W, 0], [W, H], ...f, [0, H]]], W, H, d: up ? 0 : d };
}

/** A saw: m adjacent teeth on a slab, every tip and every valley between two teeth a band corner. */
function saw(r) {
  const m = I(r, 2, 6);
  const hb = logU(r, 500, 20_000);
  const teeth = [];
  let x = 0;
  for (let i = 0; i < m; i += 1) {
    const th = theta(r);
    const d = logU(r, 2000, 80_000);
    const w = d * Math.tan((th / 2) * RAD);
    teeth.push({ xl: x, xc: x + w, xr: x + 2 * w, d });
    x += 2 * w;
  }
  const ring = [[0, 0], [x, 0]];
  for (let i = m - 1; i >= 0; i -= 1) {
    ring.push([teeth[i].xr, hb], [teeth[i].xc, hb + teeth[i].d]);
  }
  ring.push([0, hb]);
  return { rings: [ring] };
}

/** A rectangle with up to two features on each side. */
function multi(r) {
  const W = logU(r, 4000, 150_000);
  const H = logU(r, 4000, 150_000);
  const lim = 0.2 * Math.min(W, H);
  // each side in its own frame — the side along local x from S down to 0 at y = 0, the face below it — mapped onto the
  // rectangle, counter-clockwise from the corner (W, H)
  const sides = [
    { S: W, map: ([x, y]) => [x, H + y] },
    { S: H, map: ([x, y]) => [-y, x] },
    { S: W, map: ([x, y]) => [W - x, -y] },
    { S: H, map: ([x, y]) => [W + y, H - x] },
  ];
  const ring = [];
  let any = false;
  for (const side of sides) {
    ring.push(side.map([side.S, 0]));
    for (const at of [0.75, 0.25]) {
      if (r() < 0.45) continue;
      const up = r() < 0.5;
      const d = up ? logU(r, 600, 60_000) : U(r, 0.3, 1) * lim;
      const f = feature(r, at * side.S, 0, d, up);
      if (Math.abs(f[0][0] - f[2][0]) > 0.4 * side.S || Math.abs(f[1][0] - at * side.S) > 0.2 * side.S) continue;
      any = true;
      for (const p of f) ring.push(side.map(p));
    }
  }
  return any ? { rings: [ring] } : slab(r, r() < 0.5);
}

/** A jittered star with a spike or a notch on one edge. */
function star(r) {
  const m = I(r, 5, 12);
  const R = logU(r, 2000, 200_000);
  const angs = [];
  for (let i = 0; i < m; i += 1) angs.push(((i + U(r, 0.15, 0.85)) * 360) / m);
  const pts = angs.map((a) => {
    const rad = R * U(r, 0.55, 1);
    const [c, s] = dir(a);
    return [rad * c, rad * s];
  });
  const e = I(r, 0, m - 1);
  const P = pts[e];
  const Q = pts[(e + 1) % m];
  const len = Math.hypot(Q[0] - P[0], Q[1] - P[1]);
  const t = [(Q[0] - P[0]) / len, (Q[1] - P[1]) / len];
  const nrm = [t[1], -t[0]]; // outward of a ccw ring
  const up = r() < 0.5;
  const th = theta(r);
  const d = up ? logU(r, 600, 3 * R) : U(r, 0.1, 0.45) * R;
  const w = d * Math.tan((th / 2) * RAD);
  if (2 * w > 0.7 * len) return wedge(r);
  const at = U(r, 0.3, 0.7) * len;
  const M = [P[0] + t[0] * at, P[1] + t[1] * at];
  const sg = up ? 1 : -1;
  const f = [[M[0] - t[0] * w, M[1] - t[1] * w], [M[0] + nrm[0] * d * sg, M[1] + nrm[1] * d * sg], [M[0] + t[0] * w, M[1] + t[1] * w]];
  const ring = [...pts.slice(0, e + 1), ...f, ...pts.slice(e + 1)];
  return { rings: [ring] };
}

const square = (cx, cy, half, deg) => {
  const [c, s] = dir(deg);
  return [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([x, y]) => [cx + half * (x * c - y * s), cy + half * (x * s + y * c)]);
};

/** A notched or spiked slab with 1–3 plain holes in its lower part. */
function holedSlab(r) {
  const up = r() < 0.5;
  const f = slab(r, up, 0.4);
  const { W, H } = f;
  const k = I(r, 1, 3);
  const holes = [];
  for (let i = 0; i < k; i += 1) {
    const half = U(r, 0.02, 0.07) * Math.min(W, H);
    holes.push(r() < 0.5 ? square(((i + 0.5) * W) / k, U(r, 0.15, 0.4) * H, half, U(r, 0, 90)) : square(((i + 0.5) * W) / k, U(r, 0.15, 0.4) * H, half, 0).slice(0, 3));
  }
  return { rings: [f.rings[0], ...holes] };
}

/** A rectangle with a wedge-shaped hole: the hole's band corner is a reflex corner of the face. */
function wedgeHole(r) {
  const W = logU(r, 3000, 300_000);
  const H = W * U(r, 0.4, 1);
  const w = wedge(r, 1500, 0.35 * Math.min(W, H));
  const [c, s] = dir(U(r, 0, 360));
  const hole = w.rings[0].map(([x, y]) => [W / 2 + (x - w.L / 2) * c - y * s, H / 2 + (x - w.L / 2) * s + y * c]);
  return { rings: [[[0, 0], [W, 0], [W, H], [0, H]], hole] };
}

/** A wedge with a small hole near its sharp tip. */
function holeNearTip(r) {
  const w = wedge(r, 20_000, 400_000);
  const x = U(r, 0.25, 0.7) * w.L * 0.6;
  const width = 2 * x * Math.tan((w.th / 2) * RAD);
  const half = U(r, 0.08, 0.3) * width;
  if (half < 3) return w;
  return { rings: [w.rings[0], square(x, 0, half, U(r, 0, 90))] };
}

const KINDS = {
  wedge: (r) => wedge(r),
  'wedge-large': (r) => wedge(r, 200_000, 3_000_000),
  'wedge-small': (r) => wedge(r, 300, 3000),
  rhombus,
  sliver,
  notch: (r) => slab(r, false),
  spike: (r) => slab(r, true),
  saw,
  multi,
  star,
  'holed-slab': holedSlab,
  'wedge-hole': wedgeHole,
  'hole-near-tip': holeNearTip,
};

/** The local rings rotated (one draw in five keeps the axes), moved and snapped; null when out of the lattice's range. */
function placed(r, local) {
  const deg = r() < 0.2 ? 90 * I(r, 0, 3) : U(r, 0, 360);
  const [c, s] = deg % 90 === 0 ? [[1, 0], [0, 1], [-1, 0], [0, -1]][deg / 90] : dir(deg);
  const span = r() < 0.2 ? 3_000_000 : 400_000;
  const tx = U(r, -span, span);
  const ty = U(r, -span, span);
  const rings = local.map((ring) => ring.map(([x, y]) => ({ x: Math.round(tx + x * c - y * s), y: Math.round(ty + x * s + y * c) })));
  for (const ring of rings) for (const p of ring) if (!(Math.abs(p.x) <= RANGE && Math.abs(p.y) <= RANGE)) return null;
  return rings;
}

const groups = {};
const sizeOf = (rings) => {
  let x0 = Infinity;
  let x1 = -Infinity;
  let y0 = Infinity;
  let y1 = -Infinity;
  for (const p of rings[0]) {
    x0 = Math.min(x0, p.x);
    x1 = Math.max(x1, p.x);
    y0 = Math.min(y0, p.y);
    y1 = Math.max(y1, p.y);
  }
  const diag = Math.hypot(x1 - x0, y1 - y0);
  return diag < 5000 ? 'under-50m' : diag < 100_000 ? '50m-1km' : 'over-1km';
};
let n = 0;
for (const [kind, build] of Object.entries(KINDS)) {
  const r = mulberry((SEED * 1_000_003 + Object.keys(KINDS).indexOf(kind) * 7919) >>> 0);
  const t = (groups[kind] = { ...newTally(), outOfRange: 0, bandBySize: {}, bandSpine: {}, bandRegions: {} });
  for (let i = 0; i < DRAWS; i += 1) {
    const rings = placed(r, build(r).rings);
    if (rings === null) {
      t.outOfRange += 1;
      continue;
    }
    const f = readFace(rings);
    add(t, `${kind}-${String(SEED)}#${String(i)}`, rings, f);
    if (f.cls === 'band') {
      const sz = sizeOf(rings);
      t.bandBySize[sz] = (t.bandBySize[sz] ?? 0) + 1;
      t.bandSpine[f.spine.cls] = (t.bandSpine[f.spine.cls] ?? 0) + 1;
      t.bandRegions[f.regions.cls] = (t.bandRegions[f.regions.cls] ?? 0) + 1;
    }
    n += 1;
    if (n % 2000 === 0) console.log(`… ${String(n)} faces read (${kind})`);
  }
}
const total = { seed: SEED, drawsPerKind: DRAWS, faces: 0, band: 0, bandConvex: 0, bandReflex: 0, bandHoled: 0, bandBySize: {}, bandSpine: {}, bandRegions: {}, bandRoof: 0, classes: {}, spineNeRegions: 0, independentFails: 0, movedOutsideBand: 0, causeMoved: 0, causeMoves: {}, maxMs: 0, anomalies: 0, minDeg: 360, maxDeg: 0 };
for (const t of Object.values(groups)) {
  total.faces += t.faces;
  total.band += t.band.faces;
  total.bandConvex += t.band.convex;
  total.bandReflex += t.band.reflex;
  total.bandHoled += t.band.holed;
  total.bandRoof += t.band.roofRefusedSharp;
  total.minDeg = Math.min(total.minDeg, t.band.minDeg);
  total.maxDeg = Math.max(total.maxDeg, t.band.maxDeg);
  for (const k of ['bandBySize', 'bandSpine', 'bandRegions', 'classes']) for (const [c, v] of Object.entries(t[k])) total[k][c] = (total[k][c] ?? 0) + v;
  total.spineNeRegions += t.spineNeRegions;
  total.independentFails += t.independentFails;
  total.movedOutsideBand += t.movedOutsideBand;
  total.causeMoved += t.causeMoved;
  for (const [c, v] of Object.entries(t.causeMoves)) total.causeMoves[c] = (total.causeMoves[c] ?? 0) + v;
  total.maxMs = Math.max(total.maxMs, t.maxMs);
  total.anomalies += t.kept.filter((k) => /THROW|ERROR|UNVALIDATED|UNREPORTED|E_WORK_LIMIT|independent|differ/.test(k.why)).length;
}
writeFileSync(out, `${JSON.stringify({ total, groups }, null, 1)}\n`);
console.log(JSON.stringify(total));
