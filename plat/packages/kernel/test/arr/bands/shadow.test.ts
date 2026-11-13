// M0-a-09 hardening round S20 (lane build/M0-a-09-fix-s20; the wiring round of round 2A of the kernel amendment z, item
// 986): the exact kerb X WIRED IN AS A DEBUG-ONLY SHADOW beside the construction's one served read (`readKerb`), and
// shown to SERVE NOTHING. Lines 1, 3, 4 and 5 of the round:
//   * LINE 1 — the hook (kerb.ts `ReadShadow`, `setReadShadow`): with a recording ReadShadow installed directly (no
//     kerbExact.ts), every readKerb makes exactly one start and then one done — on a refused read (restage.test.ts's
//     CENSUS_DEEP form, rebuilt here) and on a faithful-taken read (done's read.k is the returned KerbRead.region, its
//     census 'taken') too; a widths callback that throws shows start and no done; with null, neither;
//   * LINE 3 — the read's own record (kerbExact.ts `exactRegionOfRead`, `exactKeyContentOfRead`): THE DIFFERENTIAL PIN
//     (exactRegionOfRead(readFace(…)) is exactRegionOfFace(…) byte for byte, key and region, both flags) and THE WIDTHS
//     PIN (the caller's widths callback asked as often with the shadow on as off, read for read);
//   * LINES 4 – 5 — the shadow (kerbExact.ts `setExactShadow`): each read made TWICE on equal arenas — shadow off, then
//     on with a recording observer — and asserted EQUAL: readKerb's and kerb()'s results (warnings included), the census,
//     the createPlat / buildOverlay / insertChain / opSave counts, the widths calls, the arena bit for bit and its state
//     after; shadow on, one record per read, its served outcome the read's and its X exactRegionOfFace's; a planted throw
//     inside X (kerbParts, as kerbExact.ts imports it from kerb.js, wrapped to throw on one face's rings — kerb.ts's own
//     calls stay real, so the construction is untouched) and an observer that throws each propagate out of readKerb;
//     after setExactShadow(null), no record.
// THE CORPUS: every live L1 face of line 8's fixtures (derived.test.ts's, rebuilt here) and a slice of B-FUZZ's chord
// networks (max(10, RUNS ÷ 100) networks: every live L1 face, and the children of three S8-style cuts per network).
// THE MOCKS (dryrun.test.ts's form, each module spread `...real`): createPlat, buildOverlay, opSave and insertChain
// counted (the lanes' placed points recorded, line 8's fixtures read them); kerbParts of arr/kerb.js armed to throw.
import fc from 'fast-check';
import { afterEach, describe, expect, it, vi } from 'vitest';

const rec = vi.hoisted(() => ({
  createPlat: 0,
  buildOverlay: 0,
  insertChain: 0,
  opSave: 0,
  lanes: [] as { entity: string; placed: { x: number; y: number }[] | null }[],
  /** kerbParts throws on these rings (their JSON), when set (the planted throw inside X). */
  throwOn: null as string | null,
}));

vi.mock('../../../src/arena/index.js', async (importOriginal) => {
  const real = await importOriginal<typeof import('../../../src/arena/index.js')>();
  return { ...real, createPlat: (...a: Parameters<typeof real.createPlat>) => { rec.createPlat += 1; return real.createPlat(...a); } };
});
vi.mock('../../../src/arr/winding.js', async (importOriginal) => {
  const real = await importOriginal<typeof import('../../../src/arr/winding.js')>();
  return { ...real, buildOverlay: (...a: Parameters<typeof real.buildOverlay>) => { rec.buildOverlay += 1; return real.buildOverlay(...a); } };
});
vi.mock('../../../src/faces/common.js', async (importOriginal) => {
  const real = await importOriginal<typeof import('../../../src/faces/common.js')>();
  return { ...real, opSave: (...a: Parameters<typeof real.opSave>) => { rec.opSave += 1; return real.opSave(...a); } };
});
vi.mock('../../../src/insert/insertChain.js', async (importOriginal) => {
  const real = await importOriginal<typeof import('../../../src/insert/insertChain.js')>();
  return {
    ...real,
    insertChain: (...a: Parameters<typeof real.insertChain>) => {
      rec.insertChain += 1;
      const r = real.insertChain(...a);
      const [t, , roles] = a;
      const lane = roles.find((x) => typeof x.entity === 'string' && x.entity.startsWith('lane:'));
      if (lane !== undefined) rec.lanes.push({ entity: lane.entity, placed: r.ok ? r.value.placed.map((v) => ({ x: t.plat.vertices.x[v], y: t.plat.vertices.y[v] })) : null });
      return r;
    },
  };
});
vi.mock('../../../src/arr/kerb.js', async (importOriginal) => {
  const real = await importOriginal<typeof import('../../../src/arr/kerb.js')>();
  return {
    ...real,
    kerbParts: (...a: Parameters<typeof real.kerbParts>) => {
      if (rec.throwOn !== null && JSON.stringify(a[0]) === rec.throwOn) throw new Error('planted: kerbParts threw inside X');
      return real.kerbParts(...a);
    },
  };
});

import { type FaceId, type Plat } from '../../../src/arena/index.js';
import { kerb, kerbCensus, readFace, readKerb, setReadShadow, type ReadShadow, type SpineWidths } from '../../../src/arr/kerb.js';
import { exactRegionOfFace, exactRegionOfRead, setExactShadow, type ExactShadowRead } from '../../../src/arr/kerbExact.js';
import { connectHole, splitFace } from '../../../src/faces/index.js';
import { err, LATTICE, ok, type KernelResult } from '../../../src/num/index.js';
import { insertChain } from '../../../src/insert/index.js';
import { setOwner, tx, type Committed } from '../../../src/tx/index.js';
import type { LatticePoint } from '../../../src/types/index.js';
import { bits } from '../../tx/support.js';
import { commit, framed, network, P, readIn, ringsOf, spec, state, widthsOf, wideNetwork, type Chord, type WideWay } from './support.js';

const RUNS = fc.readConfigureGlobal().numRuns ?? 10_000;
/** The corpus slice's size: max(10, RUNS ÷ 100). */
const NETS = Math.max(10, Math.floor(RUNS / 100));
const HARD = 3_600_000;

afterEach(() => {
  setReadShadow(null);
  rec.throwOn = null;
});

// ---- fixtures (line 8's, derived.test.ts's, rebuilt) -------------------------------------------------------------------

/** The live L1 faces (by slot). */
function liveL1(p: Plat): FaceId[] {
  const out: FaceId[] = [];
  for (let f = 0; f < p.slots.face[1].top; f += 1) if (p.faces[1].kind[f] !== 0xffff) out.push(f);
  return out;
}

/** Is q strictly inside the rings (non-zero)? */
function insideF(rs: readonly (readonly LatticePoint[])[], q: { x: number; y: number }): boolean {
  let w = 0;
  for (const r of rs) {
    for (let i = 0; i < r.length; i += 1) {
      const a = r[i];
      const b = r[(i + 1) % r.length];
      const s = (b.x - a.x) * (q.y - a.y) - (b.y - a.y) * (q.x - a.x);
      if (a.y <= q.y) {
        if (b.y > q.y && s > 0) w += 1;
      } else if (b.y <= q.y && s < 0) w -= 1;
    }
  }
  return w !== 0;
}

/** The live L1 face holding the point. */
function faceAtXY(p: Plat, q: readonly [number, number]): FaceId {
  const f = liveL1(p).find((g) => insideF(ringsOf(p, 1, g), { x: q[0], y: q[1] }));
  if (f === undefined) throw new Error(`test: no L1 face holds (${String(q[0])}, ${String(q[1])})`);
  return f;
}

/** An L1 way in its own batch. */
function wayIn(p: Plat, entity: string, pts: readonly (readonly [number, number])[], closed = false): void {
  commit(p, 1, (o) => insertChain(o, pts.map(([x, y]) => P(x, y)), [{ role: 'way', entity }], 'mandatory', closed ? { closed: true } : {}));
}

/** A lane cut by splitFace (connectHole where `slit`) on the face at `inside`, S8's rows. */
function laneIn(p: Plat, inside: readonly [number, number], entity: string, pts: readonly (readonly [number, number])[], slit = false): void {
  commit(p, 1, (o) => {
    const f = faceAtXY(p, inside);
    const rows = [{ role: 'way', entity }];
    const r = slit ? connectHole(o, f, pts.map(([x, y]) => P(x, y)), { rows }) : splitFace(o, f, pts.map(([x, y]) => P(x, y)), { rows });
    return r.ok ? ok(null) : err<null>(r.code, r.detail);
  });
}

/** Every live L1 face owned (S8's district), as derived.test.ts's fixtures set it. */
function ownAll(p: Plat): void {
  const faces = liveL1(p);
  commit(p, 1, (o) => setOwner(o, faces, 'district:1'));
}

/** Widths from a table: every `way` chain by its entity, null where the table has none. */
const tableWidths = (t: Record<string, { halfWidthCm: number; ends: 'round' | 'square' }>): SpineWidths => (c) => (c.role === 'way' ? (t[c.entity] ?? null) : null);

/** A built case: its arena and widths (built twice, equal, for the off / on reads). */
interface Built {
  readonly p: Plat;
  readonly ws: SpineWidths;
}

/** Line 8's fixtures (derived.test.ts's FIX, the arena and widths only). */
const FIXTURES: Record<string, () => Built> = {
  half: () => {
    const p = framed();
    wayIn(p, 'way:p', [[0, 101], [3899, 4000]]);
    wayIn(p, 'way:q', [[4000, 100], [100, 4000]]);
    ownAll(p);
    return { p, ws: tableWidths({ 'way:p': { halfWidthCm: 100, ends: 'round' }, 'way:q': { halfWidthCm: 100, ends: 'round' } }) };
  },
  oblique: () => {
    const p = framed();
    wayIn(p, 'way:z', [[0, 2000], [4000, 2000]]);
    ownAll(p);
    laneIn(p, [2000, 1000], 'lane:1', [[845, 0], [2000, 2000]]);
    return { p, ws: tableWidths({ 'lane:1': { halfWidthCm: 100, ends: 'round' } }) };
  },
  flip: () => {
    const f = FIXTURES.oblique();
    laneIn(f.p, [2000, 3000], 'lane:2', [[3155, 4000], [2000, 2000]]);
    return { p: f.p, ws: tableWidths({ 'lane:1': { halfWidthCm: 100, ends: 'round' }, 'lane:2': { halfWidthCm: 100, ends: 'round' } }) };
  },
  ring: () => {
    const p = framed();
    wayIn(p, 'way:r', [[1000, 1000], [3000, 1000], [3000, 3000], [1000, 3000]], true);
    ownAll(p);
    return { p, ws: tableWidths({ 'way:r': { halfWidthCm: 50, ends: 'square' } }) };
  },
  holeSlit: () => {
    const p = framed();
    wayIn(p, 'way:h', [[1000, 1000], [3000, 1000], [3000, 3000], [1000, 3000]], true);
    ownAll(p);
    laneIn(p, [500, 500], 'lane:s', [[2000, 0], [2000, 1000]], true);
    return { p, ws: tableWidths({ 'way:h': { halfWidthCm: 40, ends: 'round' }, 'lane:s': { halfWidthCm: 30, ends: 'round' } }) };
  },
  empty: () => {
    const p = framed();
    wayIn(p, 'way:1', [[0, 2000], [4000, 2000]]);
    wayIn(p, 'way:2', [[0, 2100], [4000, 2100]]);
    ownAll(p);
    return { p, ws: tableWidths({ 'way:1': { halfWidthCm: 100, ends: 'round' }, 'way:2': { halfWidthCm: 100, ends: 'round' } }) };
  },
  partless: () => {
    const p = framed();
    wayIn(p, 'way:a', [[2000, 0], [2000, 4000]]);
    wayIn(p, 'way:b', [[2000, 2000], [4000, 2000]]);
    ownAll(p);
    return { p, ws: tableWidths({}) };
  },
  dangling: () => {
    const p = framed();
    wayIn(p, 'way:0', [[2000, 0], [2000, 800], [2600, 1500]]);
    ownAll(p);
    return { p, ws: tableWidths({}) };
  },
  reach: () => {
    const p = framed();
    wayIn(p, 'way:s', [[0, 2000], [4000, 2000]]);
    ownAll(p);
    laneIn(p, [2000, 1000], 'lane:1', [[845, 0], [2000, 2000]]);
    return { p, ws: tableWidths({ 'way:s': { halfWidthCm: 20, ends: 'round' }, 'lane:1': { halfWidthCm: 100, ends: 'round' } }) };
  },
  noReach: () => {
    const p = framed();
    wayIn(p, 'way:w', [[0, 2000], [4000, 2000]]);
    ownAll(p);
    laneIn(p, [2000, 1000], 'lane:1', [[2000, 0], [2000, 2000]]);
    return { p, ws: tableWidths({ 'way:w': { halfWidthCm: 40, ends: 'round' }, 'lane:1': { halfWidthCm: 15, ends: 'square' } }) };
  },
  kink: () => {
    const p = framed();
    wayIn(p, 'way:k', [[0, 1000], [4000, 3333]]);
    ownAll(p);
    laneIn(p, [3000, 500], 'lane:1', [[1995, 0], [1995, 2164]]);
    return { p, ws: tableWidths({ 'way:k': { halfWidthCm: 0.9, ends: 'round' } }) };
  },
  narrow: () => {
    const p = framed();
    wayIn(p, 'way:n', [[0, 1000], [4000, 3000]]);
    ownAll(p);
    return { p, ws: tableWidths({ 'way:n': { halfWidthCm: 3, ends: 'round' } }) };
  },
};

/** B-FUZZ's chord arbitrary (bfuzz.test.ts's). */
const chordArb: fc.Arbitrary<Chord> = fc.record({
  a: fc.integer({ min: 0, max: 15_999 }),
  b: fc.oneof(fc.integer({ min: 0, max: 15_999 }), fc.integer({ min: 0, max: 60 }), fc.integer({ min: 7_960, max: 8_040 })),
  hw: fc.oneof(fc.integer({ min: 1, max: 30 }), fc.integer({ min: 30, max: 600 })),
  knots: fc.option(fc.tuple(fc.integer({ min: 5, max: 600 }), fc.integer({ min: 5, max: 600 })), { freq: 3 }),
  ends: fc.constantFrom<'round' | 'square'>('round', 'square'),
});

/** An S8-style cut draw: two landings on two long edges of the face, a half-width and ends. */
const cutArb = fc.record({ e0: fc.nat(1000), e1: fc.nat(1000), t0: fc.integer({ min: 5, max: 95 }), t1: fc.integer({ min: 5, max: 95 }), hw: fc.integer({ min: 1, max: 300 }), ends: fc.constantFrom<'round' | 'square'>('round', 'square'), pick: fc.nat(1000) });
type CutDraw = typeof cutArb extends fc.Arbitrary<infer T> ? T : never;

/** A landing on the ring edge i at t percent of its free length (more than attractCm from its ends), or null. */
function landing(r: readonly LatticePoint[], i: number, t: number): LatticePoint | null {
  const a = r[i % r.length];
  const b = r[(i + 1) % r.length];
  const len = Math.hypot(b.x - a.x, b.y - a.y);
  const free = len - 2 * (LATTICE.attractCm + 2);
  if (!(free > 0)) return null;
  const s = (LATTICE.attractCm + 2 + (free * t) / 100) / len;
  return P(Math.round(a.x + (b.x - a.x) * s), Math.round(a.y + (b.y - a.y) * s));
}

/**
 * A corpus network: B-FUZZ's chords, then three S8-style cuts (splitFace with S8's `way` rows; the face cut by `pick`
 * among the live faces), each in its own batch; refused cuts skipped. Deterministic: built twice, the arenas are equal.
 */
function corpusNet(chords: readonly Chord[], cuts: readonly CutDraw[]): Built & { children: FaceId[] } {
  const n = network(chords);
  const table: Record<string, { halfWidthCm: number; ends: 'round' | 'square' } | (typeof n.table)[string]> = { ...n.table };
  const children: FaceId[] = [];
  for (const [k, d] of cuts.entries()) {
    const faces = liveL1(n.p);
    if (faces.length === 0) break;
    const f = faces[d.pick % faces.length];
    const r0 = ringsOf(n.p, 1, f)[0];
    const long = r0.map((_, i) => i).filter((i) => Math.hypot(r0[(i + 1) % r0.length].x - r0[i].x, r0[(i + 1) % r0.length].y - r0[i].y) > 2 * LATTICE.attractCm + 4);
    if (long.length < 2) continue;
    const i0 = long[d.e0 % long.length];
    let i1 = long[d.e1 % long.length];
    if (i1 === i0) i1 = long[(long.indexOf(i0) + 1) % long.length];
    const a = landing(r0, i0, d.t0);
    const b = landing(r0, i1, d.t1);
    if (a === null || b === null || Math.hypot(b.x - a.x, b.y - a.y) < 4 * LATTICE.attractCm) continue;
    const entity = `lane:${String(k)}`;
    const res = tx(n.p, spec(1), (o) => {
      const h = splitFace(o, f, [a, b], { rows: [{ role: 'way', entity }] });
      return h.ok ? ok([...h.value]) : err<FaceId[]>(h.code, h.detail);
    });
    if (!res.ok) continue;
    const kids = (res.value as Committed<FaceId[]>).value;
    table[entity] = { halfWidthCm: d.hw, ends: d.ends };
    children.push(...kids);
  }
  return { p: n.p, ws: widthsOf(table), children };
}

// ---- the off / on comparison (lines 3 – 5) ----------------------------------------------------------------------------

/** A KerbRead / KernelResult as text (its Maps as entry lists). */
const text = (v: unknown): string => JSON.stringify(v, (_k, x: unknown) => (x instanceof Map ? [...(x as Map<unknown, unknown>).entries()] : x));

/** One face's two reads (readKerb, then kerb()) in one L1 batch, with what they counted and left behind. */
interface Out {
  readonly kerbRead: string;
  readonly kerbResult: string;
  readonly census: string;
  readonly counts: string;
  readonly widthsCalls: number[];
  readonly bits: string;
  readonly state: string;
  readonly region: KernelResult<unknown>;
}

/** The face's reads on `b` (the shadow as installed now), its counts taken around each read. */
function readBoth(b: Built, f: FaceId): Out {
  let calls = 0;
  const ws: SpineWidths = (c) => {
    calls += 1;
    return b.ws(c);
  };
  const widthsCalls: number[] = [];
  const c0 = { createPlat: rec.createPlat, buildOverlay: rec.buildOverlay, insertChain: rec.insertChain, opSave: rec.opSave };
  const got = readIn(b.p, 1, (o) => {
    const r1 = readKerb(o, f, ws);
    widthsCalls.push(calls);
    const census = text(kerbCensus(b.p));
    const r2 = kerb(o, f, ws);
    widthsCalls.push(calls - widthsCalls[0]);
    return { r1, r2, census };
  });
  const c1 = { createPlat: rec.createPlat - c0.createPlat, buildOverlay: rec.buildOverlay - c0.buildOverlay, insertChain: rec.insertChain - c0.insertChain, opSave: rec.opSave - c0.opSave };
  return { kerbRead: text(got.r1), kerbResult: text(got.r2), census: got.census, counts: text(c1), widthsCalls, bits: bits(b.p), state: state(b.p), region: got.r1 };
}

/** A recording observer: every record, and a face it throws on. */
function recorder(throwOnFace: FaceId | null = null): { records: ExactShadowRead[]; failed: string[]; o: Parameters<typeof setExactShadow>[0] } {
  const records: ExactShadowRead[] = [];
  const failed: string[] = [];
  let t = 0;
  return {
    records,
    failed,
    o: {
      clock: () => (t += 1),
      read(r) {
        if (throwOnFace !== null && r.face === throwOnFace) throw new Error('planted: the observer threw');
        records.push(r);
      },
      failed(face, e) {
        failed.push(`${String(face)} ${String(e)}`);
      },
    },
  };
}

/**
 * The off / on pins on one built case (built twice by `build`): each face read off on the first arena and on (a
 * recording observer) on the second; everything the read served, wrote and counted equal; one record per read with the
 * read's served outcome; X the face's exactRegionOfFace; and the differential pin (line 3 (i)).
 */
function offOn(build: () => Built, faces: (b: Built) => readonly FaceId[], label: string): number {
  const off = build();
  const on = build();
  expect(bits(on.p), `${label}: the two builds are equal arenas`).toBe(bits(off.p));
  let reads = 0;
  for (const f of faces(off)) {
    setExactShadow(null);
    const a = readBoth(off, f);
    const r = recorder();
    expect(setExactShadow(r.o)).toBe(true);
    const b = readBoth(on, f);
    setExactShadow(null);
    const at = `${label} face ${String(f)}`;
    expect(b.kerbRead, `${at}: readKerb's result`).toBe(a.kerbRead);
    expect(b.kerbResult, `${at}: kerb()'s result`).toBe(a.kerbResult);
    expect(b.census, `${at}: kerbCensus`).toBe(a.census);
    expect(b.counts, `${at}: createPlat / buildOverlay / insertChain / opSave`).toBe(a.counts);
    expect(b.widthsCalls, `${at}: the widths calls, read for read (line 3 (ii))`).toEqual(a.widthsCalls);
    expect(b.bits === a.bits, `${at}: the arena bit for bit after the reads`).toBe(true);
    expect(b.state === a.state, `${at}: the arena's state after the reads`).toBe(true);
    // one record per read (readKerb, kerb()), its served outcome the read's; X the face's exact kerb (computed after the
    // counts and widths calls are taken: exactRegionOfFace asks the widths callback itself)
    expect(r.records.length, `${at}: one record per read`).toBe(2);
    const served = r.records[0].served;
    const k = a.region as KernelResult<{ region: unknown; kerb: unknown }>;
    if (k.ok) {
      expect(served.ok, at).toBe(true);
      if (served.ok) {
        expect(text(served.region), `${at}: the record's region`).toBe(text(k.value.region));
        expect(text(served.rings), `${at}: the record's kerb`).toBe(text(k.value.kerb));
      }
    } else expect(served, at).toEqual({ ok: false, code: k.code, detail: k.detail });
    const x = exactRegionOfFace(on.p, f, on.ws);
    for (const rr of r.records) expect(text(rr.exact), `${at}: the record's X is exactRegionOfFace's`).toBe(text(x));
    // THE DIFFERENTIAL PIN (line 3 (i)), both flags
    for (const vc of [true, false]) expect(text(exactRegionOfRead(readFace(on.p, f, on.ws, new Map(), vc), vc)), `${at}: exactRegionOfRead ≡ exactRegionOfFace (contacts ${String(vc)})`).toBe(text(exactRegionOfFace(on.p, f, on.ws, vc)));
    reads += 2;
  }
  return reads;
}

describe('LINE 1: the hook — one start, then one done, per read (kerb.ts setReadShadow; a recording ReadShadow, no kerbExact.ts)', () => {
  /** A recording ReadShadow. */
  const hook = (): { log: string[]; done: Parameters<ReadShadow['done']>[]; s: ReadShadow } => {
    const log: string[] = [];
    const done: Parameters<ReadShadow['done']>[] = [];
    return {
      log,
      done,
      s: {
        start() {
          log.push('start');
        },
        done(...a) {
          log.push('done');
          done.push(a);
        },
      },
    };
  };

  it('setReadShadow returns the hook it replaced (setFrameObserver\'s form)', () => {
    const h1 = hook();
    const h2 = hook();
    expect(setReadShadow(h1.s)).toBe(null);
    expect(setReadShadow(h2.s)).toBe(h1.s);
    expect(setReadShadow(null)).toBe(h2.s);
  });

  it('every read of line 8\'s fixtures: start, then done (readKerb and kerb())', () => {
    for (const [name, build] of Object.entries(FIXTURES)) {
      const b = build();
      const h = hook();
      setReadShadow(h.s);
      for (const f of liveL1(b.p)) readIn(b.p, 1, (o) => [readKerb(o, f, b.ws), kerb(o, f, b.ws)]);
      setReadShadow(null);
      expect(h.log, name).toEqual(liveL1(b.p).flatMap(() => ['start', 'done', 'start', 'done']));
    }
  });

  it('a REFUSED read (restage.test.ts\'s CENSUS_DEEP form: B-FUZZ seed 20261011 draw 1425, face 2): one start, one done, done\'s read the refusal', () => {
    const { p, table } = network([
      { a: 15_650, b: 4140, hw: 428, knots: [408, 311], ends: 'round' },
      { a: 15_666, b: 11_919, hw: 2, knots: null, ends: 'round' },
      { a: 14_083, b: 8016, hw: 149, knots: null, ends: 'square' },
    ]);
    const h = hook();
    setReadShadow(h.s);
    const k = readIn(p, 1, (o) => readKerb(o, 2, widthsOf(table)));
    setReadShadow(null);
    expect(k.ok).toBe(false);
    expect(h.log).toEqual(['start', 'done']);
    const [, face, , , read, , sp, last] = h.done[0];
    expect(face).toBe(2);
    expect(read.k.ok).toBe(false);
    if (!read.k.ok && !k.ok) expect([read.k.code, read.k.detail]).toEqual([k.code, k.detail]);
    expect(sp).toBe(null);
    expect(last).toEqual(kerbCensus(p));
  });

  it('a FAITHFUL-TAKEN read (hardening-s17.test.ts\'s MQ2 network, face 3; and row 127\'s network of hardening-s16.test.ts): done\'s read.k is the returned KerbRead.region, its census \'taken\'', () => {
    const cases: { p: Plat; ws: SpineWidths; faces: FaceId[] }[] = [];
    const n = network([
      { a: 11_837, b: 7983, hw: 17, knots: null, ends: 'round' },
      { a: 10_067, b: 44, hw: 369, knots: [213, 216], ends: 'round' },
      { a: 13_877, b: 1400, hw: 30, knots: null, ends: 'square' },
    ]);
    cases.push({ p: n.p, ws: widthsOf(n.table), faces: [3] });
    const row127: WideWay[] = [
      { kind: 'dead', a: 8307, b: 0, x: 805, y: 400, w: 300, h: 300, hw: 54, knots: [54, 7], ends: 'round' },
      { kind: 'ring', a: 0, b: 0, x: 1214, y: 2466, w: 1302, h: 300, hw: 1, knots: null, ends: 'round' },
      { kind: 'ring', a: 0, b: 0, x: 400, y: 400, w: 688, h: 304, hw: 31, knots: null, ends: 'round' },
    ];
    const w = wideNetwork(row127);
    cases.push({ p: w.p, ws: widthsOf(w.table), faces: w.faces });
    let taken = 0;
    for (const c of cases) {
      for (const f of c.faces) {
        const h = hook();
        setReadShadow(h.s);
        const k = readIn(c.p, 1, (o) => readKerb(o, f, c.ws));
        setReadShadow(null);
        expect(h.log).toEqual(['start', 'done']);
        const [, , , , read, , sp, last] = h.done[0];
        expect(last).toEqual(kerbCensus(c.p));
        if (!k.ok || last.faithful !== 'taken') continue;
        taken += 1;
        expect(read.k.ok).toBe(true);
        if (read.k.ok) expect(text(read.k.value)).toBe(text(k.value.region));
        expect(sp !== null && sp.ok ? text(sp.value.rings) : null).toBe(text(k.value.kerb));
      }
    }
    expect(taken, 'a faithful-taken read among the cases').toBeGreaterThan(0);
  });

  it('a widths callback that throws: start is seen and done is not; with null, neither', () => {
    const b = FIXTURES.reach();
    const f = liveL1(b.p)[0];
    const h = hook();
    setReadShadow(h.s);
    expect(() => readIn(b.p, 1, (o) => readKerb(o, f, () => {
      throw new Error('planted: widths threw');
    }))).toThrow('planted: widths threw');
    expect(h.log).toEqual(['start']);
    setReadShadow(null);
    readIn(b.p, 1, (o) => readKerb(o, f, b.ws));
    expect(h.log).toEqual(['start']);
  });
});

describe('LINES 3 – 5: the shadow serves nothing — each read off and on, equal in all it served, wrote and counted', () => {
  it('every live L1 face of line 8\'s fixtures', () => {
    let reads = 0;
    for (const [name, build] of Object.entries(FIXTURES)) reads += offOn(build, (b) => liveL1(b.p), name);
    expect(reads).toBeGreaterThan(40);
  });

  it(`a corpus slice: B-FUZZ chord networks (${String(NETS)}), every live L1 face, and the children of three S8-style cuts per network`, { timeout: HARD }, () => {
    let reads = 0;
    let kids = 0;
    fc.assert(
      fc.property(fc.array(chordArb, { minLength: 1, maxLength: 3 }), fc.array(cutArb, { minLength: 3, maxLength: 3 }), (chords, cuts) => {
        const pre = (): Built => {
          const n = network(chords);
          return { p: n.p, ws: widthsOf(n.table) };
        };
        reads += offOn(pre, (b) => liveL1(b.p), `network ${JSON.stringify(chords)}`);
        const probe = corpusNet(chords, cuts);
        kids += probe.children.length;
        reads += offOn(() => corpusNet(chords, cuts), () => probe.children.filter((f) => liveL1(probe.p).includes(f)), `network ${JSON.stringify(chords)} cut ${JSON.stringify(cuts)}`);
      }),
      { numRuns: NETS },
    );
    console.info(`SHADOW corpus: ${String(NETS)} networks, ${String(reads)} reads compared off / on, ${String(kids)} cut children`);
    expect(kids).toBeGreaterThan(0);
  });

  it('a planted throw inside X (kerbParts as kerbExact.ts imports it, on one face\'s rings) propagates out of readKerb; so does an observer that throws; after setExactShadow(null), no record', () => {
    const b = FIXTURES.reach();
    const f = faceAtXY(b.p, [2000, 3000]);
    const rf = readFace(b.p, f, b.ws);
    // the construction alone is untouched by the armed throw (kerb.ts's own calls are module-internal)
    rec.throwOn = JSON.stringify(rf.rings);
    expect(readIn(b.p, 1, (o) => readKerb(o, f, b.ws)).ok).toBe(true);
    const r = recorder();
    setExactShadow(r.o);
    expect(() => readIn(b.p, 1, (o) => readKerb(o, f, b.ws))).toThrow('planted: kerbParts threw inside X');
    expect(r.failed.length).toBe(1);
    expect(r.records.length).toBe(0);
    rec.throwOn = null;
    const t = recorder(f);
    setExactShadow(t.o);
    expect(() => readIn(b.p, 1, (o) => readKerb(o, f, b.ws))).toThrow('planted: the observer threw');
    const n = recorder();
    setExactShadow(n.o);
    readIn(b.p, 1, (o) => readKerb(o, f, b.ws));
    expect(n.records.length).toBe(1);
    expect(setExactShadow(null)).toBe(false);
    readIn(b.p, 1, (o) => [readKerb(o, f, b.ws), kerb(o, f, b.ws)]);
    expect(n.records.length).toBe(1);
  });

  it('the record\'s clock: the construction\'s and X\'s times from the caller\'s clock; none without one', () => {
    const b = FIXTURES.oblique();
    const f = liveL1(b.p)[0];
    const r = recorder();
    setExactShadow(r.o);
    readIn(b.p, 1, (o) => readKerb(o, f, b.ws));
    const records: ExactShadowRead[] = [];
    setExactShadow({ read: (x) => records.push(x) });
    readIn(b.p, 1, (o) => readKerb(o, f, b.ws));
    setExactShadow(null);
    // the counter clock: start 1; done 2 (t1), 3 (t2), 4 (t3)
    expect([r.records[0].constructionMs, r.records[0].exactMs]).toEqual([1, 1]);
    expect([records[0].constructionMs, records[0].exactMs]).toEqual([null, null]);
  });
});
