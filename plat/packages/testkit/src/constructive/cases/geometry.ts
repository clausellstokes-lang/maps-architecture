// §13.1 (2) *geometry classes*: every exact degeneracy random sampling misses, built on purpose — lattice points on a
// segment by gcd stepping, collinear triples and overlaps, cuts through and grazing vertices, antennae and one-point
// touches, coincident typed chains, rotated snapped shapes, touching holes, simultaneous skeleton events and the star
// rings of radius 2²³ − 2. The gcd-stepped collinear class and the star rings run green here against M0-a-01's
// `orient2d`, `orient`, `area2` and `area2Big` (C-0110); every other case is run by M0-k-04 against the kernel.
import { area2, area2Big, dmath, orient, orient2d, type LatticePoint } from '@plat/kernel';
import {
  ATTRACT,
  Draw,
  cw,
  gcd,
  lp,
  m0Case,
  makeInput,
  place,
  primitiveDir,
  rect,
  step,
  RANGE_MAX,
  type P,
} from '../draw.js';
import { GREEN, at, bigSign, fail, refArea2, refCross, refLargestPartial, crossUnit } from '../numeric.js';
import type { ConstructiveCase, ConstructiveInput, ConstructiveVerdict } from '../types.js';

const SOURCE = '§13.1 geometry classes';
const TAU = 2 * Math.PI;

const add = (a: P, b: P): P => ({ x: a.x + b.x, y: a.y + b.y });
const mul = (k: number, a: P): P => ({ x: k * a.x, y: k * a.y });

/** A face ring inserted at L1 as a closed mandatory `way` chain — the arena a contact case cuts. */
const faceStep = (ring = 'face') => step('insertChain', { ring, level: 1, cls: 'mandatory', role: 'way' });

/** Whether p lies on the closed segment a–b (exact). */
function onSegment(a: P, b: P, p: P): boolean {
  if (refCross(a, b, p) !== 0n) return false;
  const dot = (p.x - a.x) * (b.x - a.x) + (p.y - a.y) * (b.y - a.y);
  const len2 = (b.x - a.x) ** 2 + (b.y - a.y) ** 2;
  return dot >= 0 && dot <= len2;
}

/** Whether p lies on the ring's boundary (exact). */
function onRing(ring: readonly P[], p: P): boolean {
  for (let i = 0; i < ring.length; i += 1) if (onSegment(ring[i], ring[(i + 1) % ring.length], p)) return true;
  return false;
}

/** Whether p is a vertex of the ring. */
function isVertex(ring: readonly P[], p: P): boolean {
  return ring.some((q) => q.x === p.x && q.y === p.y);
}

/** The squared distance. */
const dist2 = (a: P, b: P) => (a.x - b.x) ** 2 + (a.y - b.y) ** 2;

/** A segment from a drawn primitive direction: its ends, its step and its step count g ≥ gMin. */
function gcdSegment(d: Draw, gMin: number): { a: P; b: P; p: P; g: number } {
  const p = primitiveDir(d, d.log(1, 65_536));
  const m = Math.max(Math.abs(p.x), Math.abs(p.y));
  // The segment and its off-segment points (± one cross-unit vector, no longer than m) span at most (g + 2) · m.
  const gMax = Math.max(gMin, Math.floor((2 * RANGE_MAX - 4) / m) - 2);
  const g = d.log(gMin, Math.min(gMax, 1 << 20));
  return { a: { x: 0, y: 0 }, b: mul(g, p), p, g };
}

// ── the numeric core: gcd stepping and collinear triples against orient2d ──

function buildOnSegment(d: Draw): ConstructiveInput {
  const { a, b, p, g } = gcdSegment(d, 2);
  const ks = new Set<number>([1, g - 1]);
  for (let i = 0; i < 14; i += 1) ks.add(d.int(1, g - 1));
  const sorted = [...ks].sort((u, v) => u - v);
  const on = sorted.map((k) => mul(k, p));
  const q = crossUnit(p);
  const off: P[] = [];
  for (const k of sorted.slice(0, 4)) off.push(add(mul(k, p), q), add(mul(k, p), mul(-1, q)));
  const placed = place(d, { points: { a, b }, pointSets: { on, off } });
  return makeInput('geom/on-segment-gcd', d.seed, placed, { g }, [step('orient2d', { a: 'a', b: 'b', on: 'on', off: 'off' })]);
}

function witnessOnSegment(input: ConstructiveInput): string | null {
  const { a, b } = input.points;
  const g = BigInt(input.params.g as number);
  for (const p of input.pointSets.on) {
    if (!onSegment(a, b, p) || (p.x === a.x && p.y === a.y) || (p.x === b.x && p.y === b.y)) return `${at(p)} is not strictly inside ${at(a)}–${at(b)}`;
  }
  for (const p of input.pointSets.off) {
    const c = refCross(a, b, p);
    if (c !== g && c !== -g) return `${at(p)} stands at cross ${String(c)} from the segment, not ±${String(g)}`;
  }
  return input.pointSets.off.length > 0 ? null : 'no off-segment point';
}

/** All six argument orders of a triple. */
function orders(a: LatticePoint, b: LatticePoint, c: LatticePoint): [LatticePoint, LatticePoint, LatticePoint][] {
  return [
    [a, b, c],
    [a, c, b],
    [b, a, c],
    [b, c, a],
    [c, a, b],
    [c, b, a],
  ];
}

function zeroInEveryOrder(a: LatticePoint, b: LatticePoint, c: LatticePoint): string | null {
  for (const [u, v, w] of orders(a, b, c)) {
    const o = orient2d(u.x, u.y, v.x, v.y, w.x, w.y);
    if (o !== 0 || Object.is(o, -0)) return `orient2d${at(u)}${at(v)}${at(w)} = ${String(o)}, expected 0`;
    if (orient(u, v, w) !== 0) return `orient${at(u)}${at(v)}${at(w)} = ${String(orient(u, v, w))}, expected 0`;
  }
  return null;
}

function runOnSegment(input: ConstructiveInput): ConstructiveVerdict {
  const { a, b } = input.points;
  for (const p of input.pointSets.on) {
    const z = zeroInEveryOrder(a, b, p);
    if (z !== null) return fail(z);
  }
  for (const p of input.pointSets.off) {
    const ref = refCross(a, b, p);
    const o = orient2d(a.x, a.y, b.x, b.y, p.x, p.y);
    if (o !== Number(ref)) return fail(`orient2d${at(a)}${at(b)}${at(p)} = ${String(o)}, the BigInt reference ${String(ref)}`);
    if (orient(a, b, p) !== bigSign(ref)) return fail(`orient${at(a)}${at(b)}${at(p)} = ${String(orient(a, b, p))}, the reference sign ${String(bigSign(ref))}`);
  }
  return GREEN;
}

function buildCollinearTriple(d: Draw): ConstructiveInput {
  const { p, g } = gcdSegment(d, 2);
  const ks = new Set<number>();
  while (ks.size < 3) ks.add(d.int(0, g));
  const [i, j, k] = [...ks];
  const placed = place(d, { points: { a: mul(i, p), b: mul(j, p), c: mul(k, p) } });
  return makeInput('geom/collinear-triple', d.seed, placed, {}, [step('orient2d', { a: 'a', b: 'b', c: 'c' })]);
}

function runCollinearTriple(input: ConstructiveInput): ConstructiveVerdict {
  const { a, b, c } = input.points;
  const z = zeroInEveryOrder(a, b, c);
  if (z !== null) return fail(z);
  if (area2([a, b, c]) !== 0 || area2Big([a, b, c]) !== 0n) return fail(`the collinear ring ${at(a)}${at(b)}${at(c)} has a non-zero area2`);
  if (orient([a, b, c]) !== 0) return fail(`orient of the collinear ring ${at(a)}${at(b)}${at(c)} is not 0`);
  return GREEN;
}

// ── the star rings of radius 2²³ − 2: area2 exact (§3.2 (6)) ──

/** 2²³ − 2, the radius. */
const STAR_R = RANGE_MAX - 1;

function buildStarRing(d: Draw): ConstructiveInput {
  const winding = d.bool();
  let ring: P[];
  let k = 1;
  if (!winding) {
    // A ring on the circle of radius R through its four axis points, with random angles between (2¹⁶ steps): convex,
    // every coordinate within R and four of them exactly ±R.
    const steps = new Set<number>([0, 16_384, 32_768, 49_152]);
    const n = d.int(4, 64);
    while (steps.size < n) steps.add(d.int(0, 65_535));
    ring = [...steps]
      .sort((u, v) => u - v)
      .map((s) => {
        if (s % 16_384 === 0) return [{ x: STAR_R, y: 0 }, { x: 0, y: STAR_R }, { x: -STAR_R, y: 0 }, { x: 0, y: -STAR_R }][s / 16_384];
        const t = (TAU * s) / 65_536;
        const q = lp(STAR_R * dmath.cos(t), STAR_R * dmath.sin(t), 'geom/star-ring-max-radius');
        return { x: q.x, y: q.y };
      });
  } else {
    // A polygram {n/k}, k ≈ n/4 and coprime to n: every turn below π, so every shoelace term about the centre is
    // positive and the ring winds k times — its twice-area in (2⁵², 2⁵³), so area2's partial takes the flush.
    const n = d.int(80, 127);
    k = Math.round(n / 4);
    while (gcd(n, k) !== 1) k += 1;
    ring = [];
    for (let j = 0; j < n; j += 1) {
      const t = (TAU * ((j * k) % n)) / n;
      const q = lp(STAR_R * dmath.cos(t), STAR_R * dmath.sin(t), 'geom/star-ring-max-radius');
      ring.push({ x: q.x, y: q.y });
    }
  }
  const placed = place(d, { rings: { star: ring } }, { fixed: true });
  return makeInput('geom/star-ring-max-radius', d.seed, placed, { variant: winding ? 'winding' : 'simple', windings: k }, [
    step('area2', { ring: 'star' }),
  ]);
}

function witnessStarRing(input: ConstructiveInput): string | null {
  const r = input.rings.star;
  let max = 0;
  for (const p of r) max = Math.max(max, Math.abs(p.x), Math.abs(p.y));
  if (max !== STAR_R) return `the largest |coordinate| is ${String(max)}, not 2²³ − 2`;
  const o = { x: 0, y: 0 };
  for (let i = 0; i < r.length; i += 1) {
    if (refCross(o, r[i], r[(i + 1) % r.length]) <= 0n) return `the term at vertex ${String(i)} is not positive about the centre`;
  }
  if (input.params.variant === 'winding') {
    const a2 = refArea2(r);
    if (!(a2 > 2n ** 52n && a2 <= 2n ** 53n)) return `a winding ring's twice-area ${String(a2)} lies outside (2⁵², 2⁵³]`;
    if (refLargestPartial(r) < 2n ** 52n) return "the partial sums never reach 2⁵², so area2's flush is not exercised";
  }
  return null;
}

function runStarRing(input: ConstructiveInput): ConstructiveVerdict {
  const r = input.rings.star;
  const ref = refArea2(r);
  const big = area2Big(r);
  if (big !== ref) return fail(`area2Big = ${String(big)}, the BigInt shoelace ${String(ref)}`);
  const dbl = area2(r);
  if (dbl !== Number(ref)) return fail(`area2 = ${String(dbl)}, the reference ${String(ref)}`);
  if (BigInt(dbl) !== ref) return fail(`area2 = ${String(dbl)} is not exact (${String(ref)})`);
  return GREEN;
}

// ── the kernel's geometry classes (run by M0-k-04) ──

function buildOnSegmentSplit(d: Draw): ConstructiveInput {
  const p = primitiveDir(d, d.log(1, 1024));
  const len = Math.hypot(p.x, p.y);
  const g = Math.max(Math.ceil((8 * ATTRACT) / len), 8) + d.log(0, 1024);
  const kMin = Math.ceil((2 * ATTRACT) / len);
  const k = d.int(kMin, g - kMin);
  const target = mul(k, p);
  const s = Math.max(1, Math.ceil(200 / len));
  const spurStart = add(target, mul(s * d.sign(), { x: -p.y, y: p.x }));
  const placed = place(d, { points: { target }, chains: { segment: [{ x: 0, y: 0 }, mul(g, p)], spur: [spurStart, target] } });
  return makeInput('geom/on-segment-split', d.seed, placed, {}, [
    step('insertChain', { chain: 'segment', level: 1, cls: 'mandatory', role: 'way' }),
    step('insertChain', { chain: 'spur', level: 1, cls: 'mandatory', role: 'way' }),
  ]);
}

function witnessOnSegmentSplit(input: ConstructiveInput): string | null {
  const [a, b] = input.chains.segment;
  const t = input.points.target;
  if (!onSegment(a, b, t)) return `${at(t)} is not on the segment`;
  if (dist2(a, t) < (2 * ATTRACT) ** 2 || dist2(b, t) < (2 * ATTRACT) ** 2) return `${at(t)} lies within 2 · attractCm of an end`;
  return null;
}

/** A collinear overlap: A along a direction, B joining it, running along it in `dir` and leaving it. */
function buildOverlap(id: string, d: Draw, opposite: boolean): ConstructiveInput {
  const p = primitiveDir(d, d.pick([1, 1, 4, 64]));
  const len = Math.hypot(p.x, p.y);
  const n = Math.max(Math.ceil(100 / len), 2) + d.log(0, 2048);
  // The shared run [s, e] in steps of p: from one step (1 cm on an axis) to the whole edge.
  const runSteps = d.log(1, n);
  const s = d.int(0, n - runSteps);
  const e = s + runSteps;
  const side = d.sign();
  const away = mul(side * Math.max(1, Math.ceil(100 / len)), { x: -p.y, y: p.x });
  const back = mul(-Math.max(1, Math.ceil(60 / len)), p);
  const fwd = mul(Math.max(1, Math.ceil(60 / len)), p);
  let B: P[] = [add(add(mul(s, p), away), back), mul(s, p), mul(e, p), add(add(mul(e, p), away), fwd)];
  if (opposite) B = B.reverse();
  const placed = place(d, { chains: { A: [{ x: 0, y: 0 }, mul(n, p)], B } });
  return makeInput(id, d.seed, placed, { runSteps, sameDirection: !opposite }, [
    step('insertChain', { chain: 'A', level: 1, cls: 'mandatory', role: 'way' }),
    step('insertChain', { chain: 'B', level: 1, cls: 'mandatory', role: 'field_bound' }),
  ]);
}

function witnessOverlap(input: ConstructiveInput): string | null {
  const [a0, a1] = input.chains.A;
  const B = input.chains.B;
  const [j, l] = [B[1], B[2]];
  if (!onSegment(a0, a1, j) || !onSegment(a0, a1, l)) return 'the run does not lie on A';
  if (j.x === l.x && j.y === l.y) return 'the run is empty';
  const dot = (l.x - j.x) * (a1.x - a0.x) + (l.y - j.y) * (a1.y - a0.y);
  if ((dot > 0) !== input.params.sameDirection) return 'the run runs the wrong way';
  if (refCross(a0, a1, B[0]) === 0n || refCross(a0, a1, B[3]) === 0n) return "B's ends lie on A's line";
  return null;
}

/** A rectangle face with corners inside the range, w × h. */
function faceDims(d: Draw, min = 400): { w: number; h: number } {
  return { w: d.log(min, 1 << 20), h: d.log(min, 1 << 20) };
}

function buildCutThroughVertex(d: Draw): ConstructiveInput {
  const { w, h } = faceDims(d);
  const face = rect(0, 0, w, h);
  // p on the bottom edge, v the top-right corner, q on the left edge: the cut's interior passes through v.
  const p = { x: d.int(2 * ATTRACT, w - 2 * ATTRACT), y: 0 };
  const q = { x: 0, y: d.int(2 * ATTRACT, h - 2 * ATTRACT) };
  const placed = place(d, { rings: { face }, chains: { cut: [p, face[2], q] }, points: { vertex: face[2] } });
  return makeInput('geom/cut-through-vertex', d.seed, placed, {}, [faceStep(), step('splitFace', { face: 'face', cut: 'cut' })]);
}

function witnessCutThroughVertex(input: ConstructiveInput): string | null {
  const f = input.rings.face;
  const [p, v, q] = input.chains.cut;
  if (!isVertex(f, v)) return "the cut's middle vertex is not a face vertex";
  if (!onRing(f, p) || !onRing(f, q)) return "a cut end is not on the face's boundary";
  return null;
}

function buildCutEndsAtVertex(d: Draw): ConstructiveInput {
  const { w, h } = faceDims(d);
  const face = rect(0, 0, w, h);
  const p = { x: d.int(2 * ATTRACT, w - 2 * ATTRACT), y: 0 };
  const placed = place(d, { rings: { face }, chains: { cut: [p, face[3]] } });
  return makeInput('geom/cut-ends-at-vertex', d.seed, placed, {}, [faceStep(), step('splitFace', { face: 'face', cut: 'cut' })]);
}

/** The L-shaped face whose reflex corner r a cut from e1 to e2 grazes, the bottom end shifted by `offset`. */
function buildGraze(id: string, d: Draw, offset: number): ConstructiveInput {
  const a = d.int(1, 64);
  const b = d.int(1, 64);
  const t1 = d.int(Math.ceil((2 * ATTRACT) / a), Math.ceil((2 * ATTRACT) / a) + d.log(0, 4096));
  const t2 = d.int(Math.ceil((2 * ATTRACT) / b), Math.ceil((2 * ATTRACT) / b) + d.log(0, 4096));
  const w = a * t1;
  const h = b * t2;
  const y0 = h + t1 * b; // the line through r with direction (a, −b) meets x = 0 at y0 …
  const x1 = w + t2 * a; // … and y = 0 at x1
  const H = y0 + 2 * ATTRACT + d.log(0, 4096);
  const W = x1 + 2 * ATTRACT + d.log(0, 4096);
  const face = [
    { x: 0, y: 0 },
    { x: W, y: 0 },
    { x: W, y: h },
    { x: w, y: h },
    { x: w, y: H },
    { x: 0, y: H },
  ];
  const placed = place(d, { rings: { face }, chains: { cut: [{ x: 0, y: y0 }, { x: x1 + offset, y: 0 }] }, points: { reflex: { x: w, y: h } } });
  return makeInput(id, d.seed, placed, { offset }, [faceStep(), step('splitFace', { face: 'face', cut: 'cut' })]);
}

function witnessGraze(input: ConstructiveInput): string | null {
  const f = input.rings.face;
  const r = input.points.reflex;
  const i = f.findIndex((q) => q.x === r.x && q.y === r.y);
  if (i < 0) return 'the reflex point is not a face vertex';
  if (refCross(f[(i + f.length - 1) % f.length], r, f[(i + 1) % f.length]) >= 0n) return 'the corner is not reflex';
  const [e1, e2] = input.chains.cut;
  if (!onRing(f, e1) || !onRing(f, e2)) return "a cut end is not on the face's boundary";
  const c = refCross(e1, e2, r);
  const off = input.params.offset as number;
  if (off === 0 ? c !== 0n : c === 0n) return `the cut stands at cross ${String(c)} from the reflex vertex for offset ${String(off)}`;
  return null;
}

function buildAntenna(d: Draw): ConstructiveInput {
  const { w, h } = faceDims(d, 1000);
  const face = rect(0, 0, w, h);
  const n = d.int(2, 5);
  const x0 = d.int(4 * ATTRACT, w - 4 * ATTRACT);
  const chain: P[] = [{ x: x0, y: 0 }];
  // Up and inward in strictly increasing y, every vertex ≥ 2 · attractCm from the face's sides.
  const ys = new Set<number>();
  while (ys.size < n - 1) ys.add(d.int(4 * ATTRACT, h - 4 * ATTRACT));
  for (const y of [...ys].sort((u, v) => u - v)) chain.push({ x: d.int(4 * ATTRACT, w - 4 * ATTRACT), y });
  const placed = place(d, { rings: { face }, chains: { antenna: dedupeStraight(chain) } });
  return makeInput('geom/antenna', d.seed, placed, {}, [faceStep(), step('insertChain', { chain: 'antenna', level: 1, cls: 'mandatory', role: 'way' })]);
}

/** Drops a vertex that repeats its predecessor. */
function dedupeStraight(chain: P[]): P[] {
  return chain.filter((p, i) => i === 0 || p.x !== chain[i - 1].x || p.y !== chain[i - 1].y);
}

function buildOnePointTouch(d: Draw): ConstructiveInput {
  const { w, h } = faceDims(d, 1000);
  const face = rect(0, 0, w, h);
  const apex = { x: d.int(8 * ATTRACT, w - 8 * ATTRACT), y: 0 };
  const left = { x: d.int(2 * ATTRACT, apex.x - 2 * ATTRACT), y: d.int(2 * ATTRACT, h - 2 * ATTRACT) };
  const right = { x: d.int(apex.x + 2 * ATTRACT, w - 2 * ATTRACT), y: d.int(2 * ATTRACT, h - 2 * ATTRACT) };
  const placed = place(d, { rings: { face }, chains: { touch: [left, apex, right] }, points: { apex } });
  return makeInput('geom/one-point-touch', d.seed, placed, {}, [faceStep(), step('insertChain', { chain: 'touch', level: 1, cls: 'mandatory', role: 'way' })]);
}

/** The coincident pairs of §13.1, each a coarser chain and the typed chain laid on it. */
const COINCIDENT_PAIRS = Object.freeze([
  { name: 'a wall on a bank', A: 'bank', levelA: 0, B: 'wall', levelB: 1, kindB: 'wall' },
  { name: 'a quay on a shore', A: 'shore', levelA: 0, B: 'way', levelB: 1, kindB: 'quay' },
  { name: 'a street on a district boundary', A: 'district_bound', levelA: 1, B: 'way', levelB: 1, kindB: 'street' },
  { name: 'a track on a field boundary', A: 'field_bound', levelA: 1, B: 'way', levelB: 1, kindB: 'track' },
] as const);

function buildCoincident(d: Draw): ConstructiveInput {
  const pair = COINCIDENT_PAIRS[d.seed % 4];
  const n = d.int(2, 6);
  const chain: P[] = [];
  let x = 0;
  for (let i = 0; i < n; i += 1) {
    chain.push({ x, y: d.int(-(1 << 16), 1 << 16) });
    x += d.log(100, 1 << 16);
  }
  const reversed = d.bool();
  const placed = place(d, { chains: { A: chain, B: reversed ? [...chain].reverse() : chain } });
  return makeInput('geom/coincident-typed-chains', d.seed, placed, { pair: pair.name, kindB: pair.kindB, reversed }, [
    step('insertChain', { chain: 'A', level: pair.levelA, cls: 'mandatory', role: pair.A }),
    step('insertChain', { chain: 'B', level: pair.levelB, cls: 'mandatory', role: pair.B }),
  ]);
}

function witnessCoincident(input: ConstructiveInput): string | null {
  const { A, B } = input.chains;
  const b = input.params.reversed === true ? [...B].reverse() : B;
  return A.length === b.length && A.every((p, i) => p.x === b[i].x && p.y === b[i].y) ? null : 'B is not A';
}

/** A rotated snapped shape: corners at angles about a centre, radius R, turned by a random angle. */
function rotatedShape(d: Draw, kind: 'rectangle' | 'square' | 'ngon'): { ring: P[]; n: number } {
  const R = d.log(200, 1 << 22);
  const phi = (TAU * d.int(0, 65_535)) / 65_536;
  const n = kind === 'ngon' ? d.int(3, 12) : 4;
  const angles: number[] = [];
  if (kind === 'ngon') for (let j = 0; j < n; j += 1) angles.push(phi + (TAU * j) / n);
  else {
    const alpha = kind === 'square' ? Math.PI / 4 : dmath.atan(1000 / d.int(1000, 8000));
    angles.push(phi + alpha, phi + Math.PI - alpha, phi + Math.PI + alpha, phi + TAU - alpha);
  }
  const ring = angles.map((t) => {
    const q = lp(R * dmath.cos(t), R * dmath.sin(t), d.id);
    return { x: q.x, y: q.y };
  });
  return { ring, n };
}

function buildRotated(id: string, kind: 'rectangle' | 'square' | 'ngon') {
  return (d: Draw): ConstructiveInput => {
    const { ring, n } = rotatedShape(d, kind);
    const placed = place(d, { rings: { shape: ring } });
    return makeInput(id, d.seed, placed, { n }, [
      step('insertChain', { ring: 'shape', level: 1, cls: 'mandatory', role: 'way' }),
      step('obb', { ring: 'shape' }),
      step('hull', { ring: 'shape' }),
      step('regularFit', { ring: 'shape' }),
    ]);
  };
}

function witnessRotated(input: ConstructiveInput): string | null {
  const r = input.rings.shape;
  if (refArea2(r) <= 0n) return 'the shape is not counter-clockwise with positive area';
  for (let i = 0; i < r.length; i += 1) if (dist2(r[i], r[(i + 1) % r.length]) < 25 * 25) return 'an edge is shorter than minEdge';
  return null;
}

function buildHoleTouchVertex(d: Draw): ConstructiveInput {
  const { w, h } = faceDims(d, 2000);
  const outer = rect(0, 0, w, h);
  const atCorner = d.bool();
  const t = atCorner ? { x: 0, y: 0 } : { x: d.int(8 * ATTRACT, w - 8 * ATTRACT), y: 0 };
  const u = { x: t.x + d.int(atCorner ? 2 * ATTRACT : -4 * ATTRACT, 4 * ATTRACT), y: d.int(4 * ATTRACT, h - 4 * ATTRACT) };
  const v = { x: t.x + d.int(atCorner ? 6 * ATTRACT : 2 * ATTRACT, Math.min(w - t.x - 2 * ATTRACT, 1 << 16)), y: d.int(2 * ATTRACT, u.y - 2 * ATTRACT) };
  if (refCross(t, v, u) === 0n) u.x += 1; // never a zero-area hole
  const tri = [t, v, u];
  const placed = place(d, { rings: { outer, hole0: refArea2(tri) > 0n ? cw(tri) : tri }, points: { touch: t } });
  return makeInput('geom/hole-touch-outer-vertex', d.seed, placed, { atCorner }, [
    step('insertChain', { ring: 'outer', level: 1, cls: 'mandatory', role: 'way' }),
    step('insertChain', { ring: 'hole0', level: 1, cls: 'mandatory', role: 'way' }),
  ]);
}

function witnessHoleTouch(input: ConstructiveInput, along: boolean): string | null {
  const o = input.rings.outer;
  const hole = input.rings.hole0;
  if (refArea2(hole) >= 0n) return 'the hole is not clockwise';
  const on = hole.filter((p) => onRing(o, p));
  if (along ? on.length !== 2 : on.length !== 1) return `${String(on.length)} hole vertices lie on the outer ring`;
  return null;
}

function buildHoleTouchEdge(d: Draw): ConstructiveInput {
  const { w, h } = faceDims(d, 2000);
  const outer = rect(0, 0, w, h);
  const x1 = d.int(4 * ATTRACT, w - 12 * ATTRACT);
  const x2 = d.int(x1 + 4 * ATTRACT, w - 4 * ATTRACT);
  const top = d.int(4 * ATTRACT, h - 4 * ATTRACT);
  const quad = [
    { x: x1, y: 0 },
    { x: x2, y: 0 },
    { x: x2 - d.int(0, Math.floor((x2 - x1) / 4)), y: top },
    { x: x1 + d.int(0, Math.floor((x2 - x1) / 4)), y: top },
  ];
  const placed = place(d, { rings: { outer, hole0: cw(quad) } });
  return makeInput('geom/hole-touch-outer-edge', d.seed, placed, {}, [
    step('insertChain', { ring: 'outer', level: 1, cls: 'mandatory', role: 'way' }),
    step('insertChain', { ring: 'hole0', level: 1, cls: 'mandatory', role: 'way' }),
  ]);
}

function buildHolesTouch(d: Draw): ConstructiveInput {
  const { w, h } = faceDims(d, 4000);
  const outer = rect(0, 0, w, h);
  const along = d.bool();
  const mx = d.int(16 * ATTRACT, w - 16 * ATTRACT);
  const y1 = d.int(4 * ATTRACT, h - 12 * ATTRACT);
  const y2 = d.int(y1 + 4 * ATTRACT, h - 4 * ATTRACT);
  let hole0: P[];
  let hole1: P[];
  if (along) {
    // Two quads side by side sharing a stretch of the line x = mx.
    hole0 = [{ x: mx - d.int(4 * ATTRACT, mx - 4 * ATTRACT), y: y1 }, { x: mx, y: y1 }, { x: mx, y: y2 }, { x: mx - 4 * ATTRACT, y: y2 }];
    const yb = d.int(y1, y2 - 2 * ATTRACT);
    hole1 = [{ x: mx, y: yb }, { x: mx + d.int(4 * ATTRACT, w - mx - 4 * ATTRACT), y: yb }, { x: mx + 4 * ATTRACT, y: y2 }, { x: mx, y: y2 }];
  } else {
    // Two triangles meeting at one point c on the line x = mx, one on each side of it.
    const c = { x: mx, y: Math.floor((y1 + y2) / 2) };
    hole0 = [c, { x: mx - d.int(4 * ATTRACT, mx - 4 * ATTRACT), y: y1 }, { x: mx - d.int(4 * ATTRACT, mx - 4 * ATTRACT), y: y2 }];
    hole1 = [c, { x: mx + d.int(4 * ATTRACT, w - mx - 4 * ATTRACT), y: y1 }, { x: mx + d.int(4 * ATTRACT, w - mx - 4 * ATTRACT), y: y2 }];
  }
  const fix = (r: P[]) => (refArea2(r) > 0n ? cw(r) : r);
  const placed = place(d, { rings: { outer, hole0: fix(hole0), hole1: fix(hole1) } });
  return makeInput('geom/holes-touch-each-other', d.seed, placed, { along }, [
    step('insertChain', { ring: 'outer', level: 1, cls: 'mandatory', role: 'way' }),
    step('insertChain', { ring: 'hole0', level: 1, cls: 'mandatory', role: 'way' }),
    step('insertChain', { ring: 'hole1', level: 1, cls: 'mandatory', role: 'way' }),
  ]);
}

function witnessHolesTouch(input: ConstructiveInput): string | null {
  const { hole0, hole1 } = input.rings;
  if (refArea2(hole0) >= 0n || refArea2(hole1) >= 0n) return 'a hole is not clockwise';
  const shared = hole0.filter((p) => onRing(hole1, p)).length + hole1.filter((p) => onRing(hole0, p)).length;
  if (shared === 0) return 'the holes do not touch';
  return null;
}

/** Simultaneous skeleton events: a lattice square, a rectangle, a symmetric double notch, a snapped regular n-gon. */
const SIMULTANEOUS = Object.freeze(['lattice-square', 'rectangle', 'symmetric-notches', 'regular-ngon'] as const);

function buildSimultaneous(d: Draw): ConstructiveInput {
  const kind = SIMULTANEOUS[d.seed % 4];
  let ring: P[];
  if (kind === 'lattice-square') {
    const a = d.int(1, 1 << 11);
    const b = d.int(0, 1 << 11);
    const k = d.int(1, 64);
    const u = { x: k * a, y: k * b };
    const v = { x: -u.y, y: u.x };
    ring = [{ x: 0, y: 0 }, u, add(u, v), v];
  } else if (kind === 'rectangle') {
    ring = rect(0, 0, 2 * d.log(100, 1 << 18), 2 * d.log(100, 1 << 18));
  } else if (kind === 'symmetric-notches') {
    const half = d.log(1000, 1 << 18);
    const H = d.log(1000, 1 << 18);
    const nw = d.int(2 * ATTRACT, Math.floor(half / 4));
    const nd = d.int(2 * ATTRACT, Math.floor(H / 2));
    const nx = d.int(nw + 2 * ATTRACT, half - nw - 2 * ATTRACT);
    // Mirror-symmetric about x = 0: a notch of width nw and depth nd at ±nx on the top side.
    ring = [
      { x: -half, y: 0 },
      { x: half, y: 0 },
      { x: half, y: H },
      { x: nx + nw, y: H },
      { x: nx + nw, y: H - nd },
      { x: nx, y: H - nd },
      { x: nx, y: H },
      { x: -nx, y: H },
      { x: -nx, y: H - nd },
      { x: -nx - nw, y: H - nd },
      { x: -nx - nw, y: H },
      { x: -half, y: H },
    ];
  } else {
    ring = rotatedShape(d, 'ngon').ring;
  }
  const placed = place(d, { rings: { outer: ring } });
  return makeInput('geom/skeleton-simultaneous-events', d.seed, placed, { variant: kind }, [step('skeleton', { rings: 'outer', use: 'roof' })]);
}

export const GEOMETRY_CASES: readonly ConstructiveCase[] = Object.freeze([
  m0Case({
    id: 'geom/on-segment-gcd',
    class: 'geometry',
    source: SOURCE,
    ops: ['orient2d', 'orient'],
    expect: {
      outcome: 'ok',
      holds: ['orient2d-zero', 'orient2d-sign-exact'],
      clause: 'lattice points exactly on a segment, placed by gcd stepping (p₀ + k · d / gcd(dx, dy)); the orient2d sign equal to a BigInt reference on adversarial triples',
    },
    build: buildOnSegment,
    witness: witnessOnSegment,
    run: runOnSegment,
  }),
  m0Case({
    id: 'geom/collinear-triple',
    class: 'geometry',
    source: SOURCE,
    ops: ['orient2d', 'orient', 'area2'],
    expect: { outcome: 'ok', holds: ['orient2d-zero'], clause: 'collinear triples' },
    build: buildCollinearTriple,
    witness: (input) => {
      const { a, b, c } = input.points;
      if (refCross(a, b, c) !== 0n) return 'the triple is not collinear';
      return dist2(a, b) === 0 || dist2(b, c) === 0 || dist2(a, c) === 0 ? 'two points coincide' : null;
    },
    run: runCollinearTriple,
  }),
  m0Case({
    id: 'geom/star-ring-max-radius',
    class: 'geometry',
    source: SOURCE,
    ops: ['area2', 'area2Big'],
    expect: {
      outcome: 'ok',
      holds: ['area2-exact'],
      clause: 'star rings of radius 2²³ − 2 (area2 exact); §3.11 the caps: area2’s flush at 2⁵² (§3.2 (6))',
    },
    build: buildStarRing,
    witness: witnessStarRing,
    run: runStarRing,
  }),
  m0Case({
    id: 'geom/on-segment-split',
    class: 'geometry',
    source: SOURCE,
    ops: ['insertChain', 'splitThrough'],
    expect: {
      outcome: 'ok',
      holds: ['lands-on-target', 'hard-invariants', 'no-short-edge', 'euler'],
      clause: 'lattice points exactly on a segment, placed by gcd stepping — a chain ending on one splits the edge there',
    },
    build: buildOnSegmentSplit,
    witness: witnessOnSegmentSplit,
  }),
  m0Case({
    id: 'geom/collinear-overlap-same',
    class: 'geometry',
    source: SOURCE,
    ops: ['insertChain'],
    expect: {
      outcome: 'ok',
      holds: ['roles-preserved', 'hard-invariants', 'no-short-edge', 'euler'],
      clause: 'collinear overlapping edges (shared runs from 1 cm to the whole edge, same direction); §3.11: a collinear overlap is one shared stretch with merged roles',
    },
    build: (d) => buildOverlap('geom/collinear-overlap-same', d, false),
    witness: witnessOverlap,
  }),
  m0Case({
    id: 'geom/collinear-overlap-opposite',
    class: 'geometry',
    source: SOURCE,
    ops: ['insertChain'],
    expect: {
      outcome: 'ok',
      holds: ['roles-preserved', 'hard-invariants', 'no-short-edge', 'euler'],
      clause: 'collinear overlapping edges (shared runs from 1 cm to the whole edge, opposite direction)',
    },
    build: (d) => buildOverlap('geom/collinear-overlap-opposite', d, true),
    witness: witnessOverlap,
  }),
  m0Case({
    id: 'geom/cut-through-vertex',
    class: 'geometry',
    source: SOURCE,
    ops: ['splitFace'],
    expect: {
      outcome: 'refused',
      code: 'E_NOT_TWO_CROSSINGS',
      tier: 1,
      holds: ['version-kept'],
      clause: 'cuts through a vertex — §3.6 splitFace contact semantics (2): the cut passing through a boundary vertex is E_NOT_TWO_CROSSINGS',
    },
    build: buildCutThroughVertex,
    witness: witnessCutThroughVertex,
  }),
  m0Case({
    id: 'geom/cut-ends-at-vertex',
    class: 'geometry',
    source: SOURCE,
    ops: ['splitFace'],
    expect: {
      outcome: 'ok',
      holds: ['children-tile-parent', 'hard-invariants', 'no-short-edge'],
      clause: 'cuts through a vertex — §3.6 (1): a cut leaving the face at a boundary vertex ends on it and splits the face',
    },
    build: buildCutEndsAtVertex,
    witness: (input) => (isVertex(input.rings.face, input.chains.cut[1]) && onRing(input.rings.face, input.chains.cut[0]) ? null : 'the cut does not run from the boundary to a vertex'),
  }),
  ...([
    ['geom/cut-graze-reflex', 0, 'through it'],
    ['geom/cut-graze-reflex-plus1', 1, 'offset by + 1 lattice unit'],
    ['geom/cut-graze-reflex-minus1', -1, 'offset by − 1 lattice unit'],
  ] as const).map(([id, offset, words]) =>
    m0Case({
      id,
      class: 'geometry',
      source: SOURCE,
      ops: ['splitFace'],
      expect: {
        outcome: 'refused',
        code: 'E_NOT_TWO_CROSSINGS',
        tier: 1,
        holds: ['version-kept'],
        clause: `cuts grazing a reflex vertex (${words}) — §3.6 (2): grazing, or passing within attractCm of, a reflex vertex is E_NOT_TWO_CROSSINGS`,
      },
      build: (d) => buildGraze(id, d, offset),
      witness: witnessGraze,
    }),
  ),
  m0Case({
    id: 'geom/antenna',
    class: 'geometry',
    source: SOURCE,
    ops: ['insertChain'],
    expect: { outcome: 'ok', holds: ['face-count-unchanged', 'hard-invariants', 'no-short-edge', 'euler'], clause: 'antennae (chains dangling into a face)' },
    build: buildAntenna,
    witness: (input) => (onRing(input.rings.face, input.chains.antenna[0]) && input.chains.antenna.slice(1).every((p) => !onRing(input.rings.face, p)) ? null : 'the antenna does not dangle from one boundary point'),
  }),
  m0Case({
    id: 'geom/one-point-touch',
    class: 'geometry',
    source: SOURCE,
    ops: ['insertChain'],
    expect: { outcome: 'ok', holds: ['hard-invariants', 'no-short-edge', 'euler'], clause: 'chains touching a boundary at one point' },
    build: buildOnePointTouch,
    witness: (input) => (input.chains.touch.filter((p) => onRing(input.rings.face, p)).length === 1 && onRing(input.rings.face, input.points.apex) ? null : 'the chain does not touch the boundary at exactly its apex'),
  }),
  m0Case({
    id: 'geom/coincident-typed-chains',
    class: 'geometry',
    source: SOURCE,
    ops: ['insertChain'],
    sweep: 4,
    expect: {
      outcome: 'ok',
      holds: ['shared-stretch', 'roles-preserved', 'hard-invariants', 'euler'],
      clause: 'coincident typed chains — a wall on a bank, a quay on a shore, a street on a district boundary, a track on a field boundary; roles preserved on coincident chains',
    },
    build: buildCoincident,
    witness: witnessCoincident,
  }),
  ...([
    ['geom/rotated-rectangle', 'rectangle', 'rectangles'],
    ['geom/rotated-square', 'square', 'squares'],
    ['geom/rotated-ngon', 'ngon', 'regular n-gons (n = 3 … 12)'],
  ] as const).map(([id, kind, words]) =>
    m0Case({
      id,
      class: 'geometry',
      source: SOURCE,
      ops: ['insertChain', 'obb', 'hull', 'regularFit'],
      expect: { outcome: 'ok', holds: ['hard-invariants', 'no-short-edge', 'euler'], clause: `${words} rotated by random angles and snapped` },
      build: buildRotated(id, kind),
      witness: witnessRotated,
    }),
  ),
  m0Case({
    id: 'geom/hole-touch-outer-vertex',
    class: 'geometry',
    source: SOURCE,
    ops: ['insertChain'],
    expect: { outcome: 'ok', holds: ['hard-invariants', 'euler'], clause: 'holes touching the outer ring at a vertex' },
    build: buildHoleTouchVertex,
    witness: (input) => witnessHoleTouch(input, false),
  }),
  m0Case({
    id: 'geom/hole-touch-outer-edge',
    class: 'geometry',
    source: SOURCE,
    ops: ['insertChain'],
    expect: { outcome: 'ok', holds: ['hard-invariants', 'euler'], clause: 'holes touching the outer ring along an edge' },
    build: buildHoleTouchEdge,
    witness: (input) => witnessHoleTouch(input, true),
  }),
  m0Case({
    id: 'geom/holes-touch-each-other',
    class: 'geometry',
    source: SOURCE,
    ops: ['insertChain'],
    expect: { outcome: 'ok', holds: ['hard-invariants', 'euler'], clause: 'holes touching each other' },
    build: buildHolesTouch,
    witness: witnessHolesTouch,
  }),
  m0Case({
    id: 'geom/skeleton-simultaneous-events',
    class: 'geometry',
    source: SOURCE,
    ops: ['skeleton'],
    sweep: 4,
    expect: {
      outcome: 'ok',
      holds: ['skeleton-valid-or-downgrade', 'roof-inside'],
      clause: 'simultaneous skeleton events (regular polygons, equal-sided rectangles, symmetric notches)',
    },
    build: buildSimultaneous,
    witness: (input) => (refArea2(input.rings.outer) > 0n ? null : 'the outline is not counter-clockwise'),
  }),
]);
