// The kernel fixtures' stage table (M0-d-06; §6.5 (9), §13.2's stage contract tests; the item's first test): what the
// five legs × workers on / off run now and must agree on bit for bit —
//   xoshiro.kat · dmath.kat · lanes.kat  (unseeded) the committed known-answer sets of M0-d-01, M0-d-03 and M0-d-02
//       replayed: xoshiro128**'s outputs, dmath's results (fdlibm 5.3's bits), the lane encoder's H128s — so a leg that
//       agrees with the reference agrees with the C on both architectures (the files' expected columns digest to the
//       same value: crossHostKatExpected);
//   lanes        M0-d-02's byte-order clause: random lane streams (u32, i32, f64 bit patterns, UTF-8) hashed by LaneWriter;
//   xoshiro      the stream helpers on a seeded stream (u32, float01, int, bool, normal, fuzzy, weighted);
//   dmath        the seven routines on seeded arguments (random bit patterns and the ranges the model reads);
//   regularFit   M0-a-10's doubles: centre, radius, phase, targets, compactness of seeded star rings;
//   circumcentres M0-a-12's dual: the Delaunay triangles and our circumcentres of seeded point sets (+ − × ÷ only);
//   constructive M0-k-02's constructive set: every M0 case's draw at the seed (the generators run xoshiro, dmath and
//       snap), the numeric-core cases' verdicts, and the geometry services (hull, obb, lir, regularFit) on each closed
//       ring and point set the draw holds (C-D06 (3)).
// Every stage is a pure function of its seed and the fixture's inputs: no Node or DOM API, so the table is bundled for
// every leg. Inputs (named as the fixture names them): fdlibm/<routine>.txt, xoshiro/xoshiro128ss.txt,
// xoshiro/xoshiro128ss-long.txt, murmur/murmur3-x86-128.json.
import { delaunay, circumcentres, dmath, H128, hull, LaneWriter, lir, obb, regularFit, snap, Stream, utf8Bytes, type KernelResult, type LatticePoint } from '@plat/kernel';
import { CONSTRUCTIVE_SET } from '../constructive/set.js';
import type { ConstructiveInput } from '../constructive/types.js';
import { CrossHostDigestWriter, crossHostF64FromHex } from './digest.js';
import type { CrossHostDigest, CrossHostStage, CrossHostStageContext } from './types.js';

/** dmath's routines in the stage's order, with their arity. */
export const CROSSHOST_DMATH_ROUTINES: readonly (readonly [name: keyof typeof dmath, arity: 1 | 2])[] = [
  ['pow', 2],
  ['log', 1],
  ['exp', 1],
  ['sin', 1],
  ['cos', 1],
  ['atan2', 2],
  ['atan', 1],
];

/** The xoshiro vector files, in the stage's order. */
export const CROSSHOST_XOSHIRO_FILES = ['xoshiro/xoshiro128ss.txt', 'xoshiro/xoshiro128ss-long.txt'] as const;
/** The lane vector file. */
export const CROSSHOST_LANES_FILE = 'murmur/murmur3-x86-128.json';

function input(ctx: CrossHostStageContext, name: string): string {
  const t = ctx.inputs[name];
  if (t === undefined) throw new Error(`crosshost: the fixture gives no input ${JSON.stringify(name)}`);
  return t;
}

function lines(text: string): string[][] {
  return text.split('\n').filter((l) => l !== '').map((l) => l.split(' '));
}

function word(hex: string): number {
  if (!/^[0-9a-f]{8}$/.test(hex)) throw new RangeError(`crosshost: not 8 lower-case hexadecimal digits: ${JSON.stringify(hex)}`);
  return Number.parseInt(hex, 16);
}

/** A seeded stream of the harness: H128 of "crosshost/<stage>/<seed>" as its key (never a model stream key). */
export function crossHostStream(stage: string, seed: number): Stream {
  return new Stream(H128(utf8Bytes(`crosshost/${stage}/${String(seed >>> 0)}`)));
}

function done(w: CrossHostDigestWriter): CrossHostDigest {
  return { model: w.hex(), records: null };
}

// ---- the known-answer replays --------------------------------------------------------------------------------------

/** The xoshiro outputs each case's state produces (computed), or the file's expected values (expected). */
function xoshiroWords(ctx: CrossHostStageContext, mode: 'computed' | 'expected', w: CrossHostDigestWriter): void {
  for (const file of CROSSHOST_XOSHIRO_FILES) {
    const long = file.endsWith('-long.txt');
    for (const f of lines(input(ctx, file))) {
      const n = f.map(word);
      if (n.length !== (long ? 9 : 12)) throw new Error(`crosshost: ${file}: a line of ${String(n.length)} numbers`);
      const expected = n.slice(long ? 5 : 4);
      if (mode === 'expected') {
        for (const v of expected) w.u32(v);
        continue;
      }
      const s = new Stream([n[0], n[1], n[2], n[3]]);
      const skip = long ? n[4] : 0;
      for (let i = 0; i < skip; i += 1) s.u32();
      for (let i = 0; i < expected.length; i += 1) w.u32(s.u32());
    }
  }
}

/** dmath's results on each vector case (computed), or the file's result column (expected). */
function dmathWords(ctx: CrossHostStageContext, mode: 'computed' | 'expected', w: CrossHostDigestWriter): void {
  for (const [name, arity] of CROSSHOST_DMATH_ROUTINES) {
    const fn = dmath[name] as (a: number, b?: number) => number;
    for (const f of lines(input(ctx, `fdlibm/${name}.txt`))) {
      if (f.length !== arity + 1) throw new Error(`crosshost: fdlibm/${name}.txt: a line of ${String(f.length)} numbers`);
      if (mode === 'expected') {
        w.f64(crossHostF64FromHex(f[arity]));
        continue;
      }
      const a = crossHostF64FromHex(f[0]);
      w.f64(arity === 2 ? fn(a, crossHostF64FromHex(f[1])) : fn(a));
    }
  }
}

interface LaneVector {
  readonly ops: readonly (readonly [string, number | readonly number[]])[];
  readonly lanes: number;
  readonly h128: readonly number[];
}

/** The lane streams' counts and H128s replayed by LaneWriter (computed), or the file's (expected). */
function laneWords(ctx: CrossHostStageContext, mode: 'computed' | 'expected', w: CrossHostDigestWriter): void {
  const doc = JSON.parse(input(ctx, CROSSHOST_LANES_FILE)) as { lanes: LaneVector[] };
  for (const v of doc.lanes) {
    if (mode === 'expected') {
      w.u32(v.lanes);
      for (const h of v.h128) w.u32(h);
      continue;
    }
    const lw = new LaneWriter();
    for (const [op, arg] of v.ops) {
      if (op === 'u32') lw.u32(arg as number);
      else if (op === 'i32') lw.i32(arg as number);
      else if (op === 'f64') lw.f64(arg as number);
      else if (op === 'utf8') lw.utf8(String.fromCodePoint(...(arg as number[])));
      else throw new Error(`crosshost: an unknown lane op ${JSON.stringify(op)}`);
    }
    w.u32(lw.lanes);
    for (const h of lw.digest()) w.u32(h);
  }
}

/**
 * The digest a known-answer stage must give when every computed value equals the committed one: the same word stream
 * written from the files' expected columns (the test's anchor to the C on both architectures).
 */
export function crossHostKatExpected(stage: 'xoshiro.kat' | 'dmath.kat' | 'lanes.kat', inputs: Readonly<Record<string, string>>): string {
  const w = new CrossHostDigestWriter();
  const ctx: CrossHostStageContext = { inputs, carry: new Map() };
  if (stage === 'xoshiro.kat') xoshiroWords(ctx, 'expected', w);
  else if (stage === 'dmath.kat') dmathWords(ctx, 'expected', w);
  else laneWords(ctx, 'expected', w);
  return w.hex();
}

// ---- the seeded stages ---------------------------------------------------------------------------------------------

const F64 = new DataView(new ArrayBuffer(8));

/** A double from 64 random bits (any pattern: NaN, ±∞, subnormals, −0 among them). */
function anyDouble(s: Stream): number {
  F64.setUint32(0, s.u32(), true);
  F64.setUint32(4, s.u32(), true);
  return F64.getFloat64(0, true);
}

/** A double drawn from the families the model reads: bit patterns, a wide range, near zero, near multiples of π/4, specials. */
function drawDouble(s: Stream): number {
  switch (s.int(0, 5)) {
    case 0:
      return anyDouble(s);
    case 1:
      return (s.float01() * 2 - 1) * 1000;
    case 2:
      return (s.float01() * 2 - 1) * 1e-6;
    case 3:
      return s.int(-64, 64) * 0.7853981633974483 + (s.float01() - 0.5) * 1e-9;
    case 4:
      return (s.float01() * 2 - 1) * 1e300;
    default: {
      const special = [0, -0, 1, -1, 0.5, 2, Infinity, -Infinity, NaN, 5e-324, -5e-324, 1.7976931348623157e308, 2.2250738585072014e-308];
      return special[s.int(0, special.length - 1)];
    }
  }
}

/** A random code point that is a valid scalar value (no lone surrogate). */
function codePoint(s: Stream): number {
  switch (s.int(0, 3)) {
    case 0:
      return s.int(0x20, 0x7e);
    case 1:
      return s.int(0x80, 0x7ff);
    case 2: {
      const c = s.int(0x800, 0xfffd);
      return c >= 0xd800 && c <= 0xdfff ? c - 0x800 : c;
    }
    default:
      return s.int(0x10000, 0x10ffff);
  }
}

const laneStage: CrossHostStage = {
  id: 'lanes',
  run(seed) {
    const s = crossHostStream('lanes', seed);
    const w = new CrossHostDigestWriter();
    for (let k = 0; k < 64; k += 1) {
      const lw = new LaneWriter();
      const ops = s.int(1, 24);
      for (let i = 0; i < ops; i += 1) {
        const kind = s.int(0, 3);
        if (kind === 0) lw.u32(s.u32());
        else if (kind === 1) lw.i32(s.u32() | 0);
        else if (kind === 2) {
          const d = drawDouble(s);
          lw.f64(Number.isNaN(d) ? 0.25 : d);
        } else {
          const n = s.int(0, 9);
          const cps: number[] = [];
          for (let j = 0; j < n; j += 1) cps.push(codePoint(s));
          lw.utf8(String.fromCodePoint(...cps));
        }
      }
      w.u32(lw.lanes);
      for (const h of lw.digest()) w.u32(h);
    }
    return done(w);
  },
};

const xoshiroStage: CrossHostStage = {
  id: 'xoshiro',
  run(seed) {
    const s = crossHostStream('xoshiro', seed);
    const w = new CrossHostDigestWriter();
    for (let i = 0; i < 256; i += 1) w.u32(s.u32());
    for (let i = 0; i < 64; i += 1) w.f64(s.float01());
    for (let i = 0; i < 64; i += 1) w.f64(s.int(-1000, 1000));
    for (let i = 0; i < 64; i += 1) w.f64(s.int(0, 0xffffffff));
    for (let i = 0; i < 32; i += 1) w.u32(s.bool(0.3) ? 1 : 0);
    for (let i = 0; i < 32; i += 1) w.f64(s.normal());
    for (let i = 0; i < 32; i += 1) w.f64(s.fuzzy(0.25));
    for (let i = 0; i < 32; i += 1) w.u32(s.weighted([1, 2, 3, 0.5, 4]));
    return done(w);
  },
};

const dmathStage: CrossHostStage = {
  id: 'dmath',
  run(seed) {
    const s = crossHostStream('dmath', seed);
    const w = new CrossHostDigestWriter();
    for (const [name, arity] of CROSSHOST_DMATH_ROUTINES) {
      const fn = dmath[name] as (a: number, b?: number) => number;
      for (let i = 0; i < 256; i += 1) {
        const a = drawDouble(s);
        w.f64(a).f64(arity === 2 ? fn(a, drawDouble(s)) : fn(a));
      }
    }
    return done(w);
  },
};

/** A lattice point from doubles (snapped; null when out of range). */
function lpt(x: number, y: number): LatticePoint | null {
  const r = snap(x, y);
  return r.ok ? r.value : null;
}

/** A star-shaped ring of n vertices about (cx, cy), radius ≈ r, counter-clockwise unless `cw`. */
function starRing(s: Stream, n: number, cx: number, cy: number, r: number, cw: boolean): LatticePoint[] {
  const angles = new Set<number>();
  while (angles.size < n) angles.add(s.int(0, 35999));
  const sorted = [...angles].sort((a, b) => a - b);
  const ring: LatticePoint[] = [];
  for (const cdeg of sorted) {
    const a = (cdeg * 0.017453292519943295) / 100;
    const rad = r * (0.6 + 0.4 * s.float01());
    const p = lpt(cx + rad * dmath.cos(a), cy + rad * dmath.sin(a));
    if (p !== null && !ring.some((q) => q.x === p.x && q.y === p.y)) ring.push(p);
  }
  return cw ? ring.reverse() : ring;
}

/** A kernel result as digestible data: the value (and warnings), or the refusal's code and detail. */
export function crossHostResultData<T>(r: KernelResult<T>): unknown {
  return r.ok ? { ok: true, value: r.value, warnings: r.warnings } : { ok: false, code: r.code, detail: r.detail };
}

/** The regularFit stage's rings at a seed: 16 star rings of 3 … 24 vertices, radius 1 m … 1 km, either orientation. */
export function crossHostRegularFitRings(seed: number): LatticePoint[][] {
  const s = crossHostStream('regularFit', seed);
  const rings: LatticePoint[][] = [];
  for (let k = 0; k < 16; k += 1) {
    const n = s.int(3, 24);
    const r = 100 + s.float01() * 99_900;
    rings.push(starRing(s, n, (s.float01() * 2 - 1) * 1e6, (s.float01() * 2 - 1) * 1e6, r, s.bool(0.5)));
  }
  return rings;
}

const regularFitStage: CrossHostStage = {
  id: 'regularFit',
  run(seed) {
    const w = new CrossHostDigestWriter();
    for (const ring of crossHostRegularFitRings(seed)) w.value(ring).value(crossHostResultData(regularFit(ring)));
    return done(w);
  },
};

/** The circumcentre stage's point sets at a seed: a lattice grid (cocircular sites) and seven random sets. */
export function crossHostCircumcentreSets(seed: number): LatticePoint[][] {
  const s = crossHostStream('circumcentres', seed);
  const sets: LatticePoint[][] = [];
  for (let k = 0; k < 8; k += 1) {
    const pts: LatticePoint[] = [];
    const extent = s.int(100, 1_000_000);
    const n = s.int(3, 160);
    if (k === 0) {
      // a lattice grid: four cocircular sites per cell, the triangulation's degenerate case
      const side = s.int(2, 9);
      const step = s.int(25, 5000);
      for (let i = 0; i < side; i += 1) for (let j = 0; j < side; j += 1) pts.push({ x: i * step, y: j * step } as LatticePoint);
    } else {
      for (let i = 0; i < n; i += 1) {
        const p = lpt((s.float01() * 2 - 1) * extent, (s.float01() * 2 - 1) * extent);
        if (p !== null) pts.push(p);
      }
    }
    sets.push(pts);
  }
  return sets;
}

const circumcentreStage: CrossHostStage = {
  id: 'circumcentres',
  run(seed) {
    const w = new CrossHostDigestWriter();
    for (const pts of crossHostCircumcentreSets(seed)) {
      const d = delaunay(pts);
      if (!d.ok) {
        w.value({ ok: false, code: d.code, detail: d.detail });
        continue;
      }
      let ox = Infinity;
      let oy = Infinity;
      for (const p of d.value.sites) {
        if (p.x < ox) ox = p.x;
        if (p.y < oy) oy = p.y;
      }
      w.value(d.value.triangles).value(circumcentres(d.value, 0, 0)).value(circumcentres(d.value, ox, oy));
    }
    return done(w);
  },
};

/** The geometry services on a draw's closed rings and point sets. */
function servicesOn(input: ConstructiveInput, w: CrossHostDigestWriter): void {
  const ringNames = Object.getOwnPropertyNames(input.rings).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  for (const name of ringNames) {
    const ring = input.rings[name];
    w.str(name).value(crossHostResultData(hull(ring))).value(crossHostResultData(obb(ring))).value(crossHostResultData(lir(ring))).value(crossHostResultData(regularFit(ring)));
  }
  const setNames = Object.getOwnPropertyNames(input.pointSets).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  for (const name of setNames) w.str(name).value(crossHostResultData(hull(input.pointSets[name])));
}

const constructiveStage: CrossHostStage = {
  id: 'constructive',
  run(seed) {
    const w = new CrossHostDigestWriter();
    let cases = 0;
    for (const c of CONSTRUCTIVE_SET) {
      if (c.milestone !== 'M0') continue;
      cases += 1;
      w.str(c.id);
      let g: ReturnType<typeof c.generate>;
      try {
        g = c.generate(seed);
      } catch (e) {
        w.str(`threw: ${e instanceof Error ? e.message : String(e)}`);
        continue;
      }
      w.value(g);
      if (g.kind !== 'input') continue;
      if (c.run !== undefined) w.value(c.run(g));
      servicesOn(g, w);
    }
    w.u32(cases);
    return done(w);
  },
};

const katStage = (id: 'xoshiro.kat' | 'dmath.kat' | 'lanes.kat', fill: (ctx: CrossHostStageContext, mode: 'computed', w: CrossHostDigestWriter) => void): CrossHostStage => ({
  id,
  seeded: false,
  run(_seed, ctx) {
    const w = new CrossHostDigestWriter();
    fill(ctx, 'computed', w);
    return done(w);
  },
});

/** The kernel fixtures' stage table (the fixture bench/src/crosshost/fixtures/kernel.json runs it). */
export const crosshostStages: readonly CrossHostStage[] = [
  katStage('xoshiro.kat', xoshiroWords),
  katStage('dmath.kat', dmathWords),
  katStage('lanes.kat', laneWords),
  laneStage,
  xoshiroStage,
  dmathStage,
  regularFitStage,
  circumcentreStage,
  constructiveStage,
];
