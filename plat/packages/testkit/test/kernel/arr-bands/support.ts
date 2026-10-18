// Support for M0-a-09's oracle-agreement tests (§3.7 (i) "Oracles, not fallbacks"; §13.1's differential agreement on
// `tileRings` and the band operations; the placement of C-0122): the cases — M0-k-01's arbitraries (the face set, the
// polygon families) and M0-k-02's band and seed-clip cases — and the judges that run our operation (reached only
// through @plat/kernel's export: the arr/index.ts lines M0-a-09 appends, C-0123), each oracle (M0-k-03), the split
// comparison and the report. Every case records its verdict against each oracle in an `OracleReport`, so the report
// carries both shares per operation and the unattracted draw count §13.1's vacuity guard reads (N-14: asserted at
// min(10⁵, ⌈⅒ × runs⌉), so the nightly 10⁶ run asserts the guard exactly and the PR's 10⁴ a floor of 1 000).
import fc from 'fast-check';
import { expect } from 'vitest';
import {
  attachIndex,
  corridorUnion,
  createPlat,
  faceRings,
  faceWalk,
  insertChain,
  isFaceLive,
  kerb,
  roleIdOf,
  routeLines,
  rowsOn,
  setOwner,
  tileRings,
  tx,
  type BandResult,
  type Cm,
  type FaceId,
  type KernelResult,
  type KernelTx,
  type LatticePoint,
  type Plat,
  type PlatKey,
  type SpineWidths,
  type StageId,
  type TileOverlap,
  type Warning,
} from '@plat/kernel';
import { arb, fuzzRuns } from '../../../src/fuzz/index.js';
import { constructiveCase } from '../../../src/constructive/index.js';
import type { ConstructiveInput } from '../../../src/constructive/types.js';
import {
  compareSplit,
  oracleBoolean,
  oracleBuffer,
  OracleReport,
  splitOf,
  UNATTRACTED_DRAW_MIN,
  type OracleResult,
  type Verdict,
} from '../../../src/oracles/index.js';
import { dedupe, ringProblems } from '../../../src/oracles/rings.js';
import { ORACLE_ENGINES, type OracleEngine, type Ring } from '../../../src/oracles/types.js';

/** The size of an agreement run: PLAT_FUZZ_RUNS cases per operation (10⁴ on a PR, 10⁶ nightly; C-0057). */
export const RUNS = fuzzRuns();

/** A run's hard timeout (0 hangs): an hour, or 300 ms a case where the run is longer. */
export const TIMEOUT = Math.max(3_600_000, RUNS * 300);

/** The unattracted share every operation must keep (C-0196 (7)'s rule, N-14). */
export const MIN_UNATTRACTED_SHARE = 0.1;

/** The guard asserted at a run of `runs` cases: min(10⁵, ⌈share × runs⌉). */
export function guardFor(runs: number, min: number = UNATTRACTED_DRAW_MIN): number {
  return Math.min(min, Math.ceil(MIN_UNATTRACTED_SHARE * runs));
}

/** The harness: the report, the failures the comparison cannot hold, and the settled cases (refusals judged apart). */
export interface Harness {
  readonly report: OracleReport;
  readonly failures: string[];
  /** Cases judged without a draw: a refusal of ours read against the oracle (tileRings' overlap), by kind. */
  readonly settled: Record<string, number>;
  readonly sources: Record<string, number>;
  /** Counted findings that judge no case (an attracted case's dangling edge): reported, no bar (N-45 KI notes). */
  readonly notes: Record<string, number>;
}

export function newHarness(): Harness {
  return { report: new OracleReport(), failures: [], settled: {}, sources: {}, notes: {} };
}

const MAX_KEPT = 20;

function keep(h: Harness, s: string): void {
  if (h.failures.length < MAX_KEPT) h.failures.push(s);
}

/** Our rings' own faults that need no oracle (§3.7 (i): "0 invalid outputs"), on every case. */
function own(rings: readonly Ring[]): string[] {
  return ringProblems(rings.map(dedupe));
}

/** One case under `op`: our rings against each oracle's, by our warnings (§3.7's split); our own faults on every case. */
export function judge(h: Harness, op: string, source: string, ours: readonly Ring[], oracle: (e: OracleEngine) => OracleResult, warnings: readonly Warning[], input: unknown = null): void {
  h.sources[source] = (h.sources[source] ?? 0) + 1;
  const bad = own(ours);
  // a failure carries its input (truncated), so an unseeded run's failure can be replayed
  const at = input === null ? '' : ` INPUT ${JSON.stringify(input).slice(0, 2000)}`;
  if (bad.length > 0) keep(h, `${op} ${source}: ours invalid: ${bad.join('; ')}${at}`);
  const verdicts: Verdict[] = ORACLE_ENGINES.map((e) => compareSplit(ours, oracle(e), warnings));
  for (const v of verdicts) if (!v.pass && !v.refused) keep(h, `${op} ${source} [${v.engine}, ${v.split}]: ${v.failures.join(', ')}${at}`);
  h.report.record(op, verdicts);
}

/** Records a case judged without a draw. */
export function settle(h: Harness, kind: string): void {
  h.settled[kind] = (h.settled[kind] ?? 0) + 1;
}

/** The verdict of a run of one operation: every judged case passed, nothing invalid, and §13.1's vacuity guard. */
export function verdict(h: Harness, op: string, runs: number = RUNS): void {
  const line = h.report.line(op);
  const guard = guardFor(runs);
  console.info(
    `arr-bands/${op}: ${String(runs)} cases — drawn ${String(line.draws)} (unattracted ${String(line.unattracted)}, share ${line.unattractedShare.toFixed(3)}; attracted ${String(line.attracted)}); passed ${String(line.unattractedPass)} + ${String(line.attractedPass)}; refusals ${JSON.stringify(line.refusals)}; unjudged ${String(line.unjudged)}; settled ${JSON.stringify(h.settled)}; notes ${JSON.stringify(h.notes)}; sources ${JSON.stringify(h.sources)}; guard ${String(guard)}`,
  );
  expect(h.failures).toEqual([]);
  expect(line.failures).toEqual({});
  expect(line.unattractedPass + line.attractedPass).toBe(line.draws);
  // an oracle's refusal judges nothing; it may never be what most cases end in
  expect(line.unjudged).toBeLessThanOrEqual(Math.ceil(0.01 * runs));
  // N-44 (3) as amended (J203/J207/J208; C-0212 (10) as amended): a refusal is excluded from the comparison only as a
  // typed refusal, and counted. insertChain's own refusal (its detail `insert: …` — the kernel's B-FUZZ and register
  // replay that class on insertChain alone, kernel/test/arr/bands/replay.ts) counts against insertChain's measured cap,
  // not here; any other refusal is the item's own, at most 1 per 10⁴ cases (PR size: 1; nightly 10⁶: 100) — never
  // raised without the owner
  expect(h.settled['refused-own'] ?? 0).toBeLessThanOrEqual(Math.ceil(runs / 10_000));
  // an attracted case's dangling kerb or split edge is a valid result short of ideal (N-45: a KI note, counted, no bar)
  expect(line.unattracted).toBeGreaterThanOrEqual(guard);
  expect(h.report.meetsDrawCount(op, guard)).toBe(true);
}

// ── the corridor cases ──

/** A corridor case: a block face bounded by one closed way (its ring, counter-clockwise), an optional way across it, the half-width. */
export interface CorridorCase {
  readonly ring: LatticePoint[];
  readonly chord: LatticePoint[] | null;
  readonly hw: number;
  /** The chains' declared role (`way`, or `tunnel` for the underground fixture). */
  readonly role: string;
  readonly key: PlatKey;
  readonly source: string;
  /**
   * A width step (N-52 (2)): the ring's edges before vertex `at` are way:1's, of half-width `hw`, and the rest way:0's
   * (half-width the case's) — two open ways meeting at ring[0] and ring[at], so F's boundary passes from one spine to
   * the other at ring[at], a vertex where the boundary turns by 0.01°–5° either way (or runs straight on).
   */
  readonly step?: { readonly at: number; readonly hw: number };
  /**
   * A dead end on a spine-less boundary (N-57 (2)): the ring is a chain that declares no half-width (a district edge),
   * and the chord — the one spine, way:1 — ends on it at both ends, its round end caps meeting it.
   */
  readonly deadEnd?: true;
}

const seedArb = fc.integer({ min: 0, max: 0x7fff_ffff });

/** The constructive case's draw (an M0 case: an input), by id and fast-check's seed. */
export function drawCase(id: string, seed: number): ConstructiveInput {
  const c = constructiveCase(id);
  if (c === undefined) throw new Error(`support: no constructive case ${id}`);
  const d = c.generate(seed);
  if (d.kind !== 'input') throw new Error(`support: ${id} is deferred`);
  return d;
}

const GROUND: PlatKey = { layer: 'ground', part: 0 };

/** The polygon's box. */
function boxOf(r: readonly LatticePoint[]): { x0: number; y0: number; x1: number; y1: number } {
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const q of r) {
    x0 = Math.min(x0, q.x);
    y0 = Math.min(y0, q.y);
    x1 = Math.max(x1, q.x);
    y1 = Math.max(y1, q.y);
  }
  return { x0, y0, x1, y1 };
}

const lp = (x: number, y: number): LatticePoint => ({ x: Math.round(x) as Cm, y: Math.round(y) as Cm });

/**
 * Corridor cases: M0-k-01's simple polygons (3 – 7 vertices; a way across in three of ten; and 3 – 5 vertices ringed
 * by a wide street) and block faces (§16 M0 (b)'s set: curved, round-joined, triangular,
 * C-shaped, concave; a way across in half), each bounded by one closed way, the way across through its box centre; half-widths from 0.5 m to an eighth of the face's smaller extent (at
 * most 6 m); and M0-k-02's tunnel fixture. A face with many short edges or a way across is mostly an attracted case
 * (a join of a small turn and the strips' crossings place vertices within attractCm), so the simple polygons carry
 * the unattracted share §13.1's guard reads.
 */
export const corridorCaseArb: fc.Arbitrary<CorridorCase> = fc.oneof(
  {
    weight: 8,
    arbitrary: fc
      .record({ ring: arb.polygon({ limitCm: 65_536, sizeCm: [3_000, 30_000], vertices: [3, 7] }), across: fc.integer({ min: 0, max: 9 }).map((k) => k < 3), turn: fc.integer({ min: 0, max: 35_999 }), tenths: fc.integer({ min: 0, max: 1000 }) })
      .map(({ ring, across, turn, tenths }) => corridorOf(ccwRing(ring.slice()), across, turn, tenths, 'polygon')),
  },
  {
    weight: 2,
    arbitrary: fc
      .record({
        face: fc.oneof(
          arb.faceSet('curved'),
          arb.faceSet('round-joined'),
          arb.faceSet('triangular'),
          arb.faceSet('C-shaped'),
          arb.faceSet('concave'),
        ),
        across: fc.boolean(),
        turn: fc.integer({ min: 0, max: 35_999 }),
        tenths: fc.integer({ min: 0, max: 1000 }),
      })
      .map(({ face, across, turn, tenths }) => corridorOf(face.polygon[0].slice(), across, turn, tenths, `faceSet-${face.kind}`)),
  },
  {
    // a block ringed by a wide street (half-width 3.5 – 6 m, at most a quarter of its smaller extent), no way across:
    // the joins' chords are long, so about half of these move no vertex — with the simple polygons they carry the
    // unattracted share §13.1's guard reads well clear of it (about a fifth of the draws)
    weight: 4,
    arbitrary: fc
      .record({ ring: arb.polygon({ limitCm: 65_536, sizeCm: [3_000, 30_000], vertices: [3, 5] }), tenths: fc.integer({ min: 0, max: 1000 }) })
      .map(({ ring, tenths }) => {
        const r = ccwRing(ring.slice());
        const b = boxOf(r);
        const hi = Math.max(50, Math.min(600, Math.floor(Math.min(b.x1 - b.x0, b.y1 - b.y0) / 4)));
        const lo = Math.min(350, hi);
        return { ring: r, chord: null, hw: lo + Math.floor(((hi - lo) * tenths) / 1000), role: 'way', key: GROUND, source: 'polygon-wide' };
      }),
  },
  {
    // a width step at a near-straight junction (N-52 (2)): a simple polygon's first edge bent at its middle by
    // 0.01°–5° (either way, or rounded straight on), the half before the bend a second way of another half-width
    weight: 3,
    arbitrary: fc
      .record({
        ring: arb.polygon({ limitCm: 65_536, sizeCm: [3_000, 30_000], vertices: [3, 6] }),
        hundredths: fc.integer({ min: 1, max: 500 }),
        out: fc.boolean(),
        tenths: fc.integer({ min: 0, max: 1000 }),
        stepTenths: fc.integer({ min: 0, max: 1000 }),
      })
      .map(({ ring, hundredths, out, tenths, stepTenths }) => widthStepOf(ccwRing(ring.slice()), hundredths, out, tenths, stepTenths)),
  },
  {
    weight: 1,
    arbitrary: seedArb.map((seed) => {
      const d = drawCase('fix/tunnel-corridor', seed);
      const ring = d.rings.face.slice();
      // the trunk as the tunnel across the face (the branch's junction is the kernel test's)
      return { ring, chord: d.chains.trunk.slice(), hw: Number(d.params.halfWidthCm), role: 'tunnel', key: { layer: 'underground', part: 0 } as PlatKey, source: 'fix/tunnel-corridor' };
    }),
  },
);

/**
 * Dead-end cases (N-57 (2)): M0-k-01's simple polygons (3 – 7 vertices) as a spine-less ring, and a lane through the
 * ring's box centre at any heading ending on the ring at both ends — the nearest crossings of its line with the ring on
 * either side of the centre (a centre outside the ring takes the ring's first two crossings) — of half-width 1.2 – 2 m
 * (at most an eighth of the ring's smaller extent): each round end cap meets the spine-less ring at whatever angle the
 * heading gives, so the lane's kerb pieces close on the ring by chords of every length.
 */
export const deadEndCaseArb: fc.Arbitrary<CorridorCase | null> = fc
  .record({ ring: arb.polygon({ limitCm: 65_536, sizeCm: [3_000, 30_000], vertices: [3, 7] }), turn: fc.integer({ min: 0, max: 35_999 }), tenths: fc.integer({ min: 0, max: 1000 }) })
  .map(({ ring, turn, tenths }) => deadEndOf(ccwRing(ring.slice()), turn, tenths));

/** The dead-end case on a ring (see `deadEndCaseArb`), or null where the lane's line meets the ring in fewer than two points. */
function deadEndOf(ring: LatticePoint[], turn: number, tenths: number): CorridorCase | null {
  const b = boxOf(ring);
  const span = Math.min(b.x1 - b.x0, b.y1 - b.y0);
  const cap = Math.max(50, Math.min(200, span / 8));
  const hw = Math.min(cap, 120) + ((cap - Math.min(cap, 120)) * tenths) / 1000;
  const t = (turn * Math.PI) / 18_000;
  const c = { x: (b.x0 + b.x1) / 2, y: (b.y0 + b.y1) / 2 };
  const u = { x: Math.cos(t), y: Math.sin(t) };
  // the line c + s·u against every ring edge: the parameters s where it crosses
  const ss: number[] = [];
  for (let i = 0; i < ring.length; i += 1) {
    const a = ring[i];
    const e = ring[(i + 1) % ring.length];
    const dx = e.x - a.x;
    const dy = e.y - a.y;
    const den = u.x * dy - u.y * dx;
    if (Math.abs(den) < 1e-9) continue;
    const s = ((a.x - c.x) * dy - (a.y - c.y) * dx) / den;
    const r = ((a.x - c.x) * u.y - (a.y - c.y) * u.x) / den;
    // a crossing at or near a ring vertex leaves the inside ambiguous: no case
    if (r >= -0.02 && r <= 1.02 && !(r > 0.02 && r < 0.98)) return null;
    if (r > 0.02 && r < 0.98) ss.push(s);
  }
  ss.sort((x, y) => x - y);
  if (ss.length < 2) return null;
  const neg = ss.filter((s) => s < 0);
  const pos = ss.filter((s) => s > 0);
  const [s0, s1] = neg.length > 0 && pos.length > 0 ? [neg[neg.length - 1], pos[0]] : [ss[0], ss[1]];
  if (s1 - s0 < 4 * hw + 200) return null;
  // the lane inside the ring (its middle inside, by the crossing number): F's bounding spine, never a way outside it
  const mid = { x: c.x + ((s0 + s1) / 2) * u.x, y: c.y + ((s0 + s1) / 2) * u.y };
  let inside = false;
  for (let i = 0; i < ring.length; i += 1) {
    const a = ring[i];
    const e = ring[(i + 1) % ring.length];
    if (a.y > mid.y !== e.y > mid.y && mid.x < a.x + ((mid.y - a.y) * (e.x - a.x)) / (e.y - a.y)) inside = !inside;
  }
  if (!inside) return null;
  const chord = [lp(c.x + s0 * u.x, c.y + s0 * u.y), lp(c.x + s1 * u.x, c.y + s1 * u.y)];
  return { ring, chord, hw, role: 'way', key: GROUND, source: 'dead-end', deadEnd: true };
}

/** The ring counter-clockwise. */
function ccwRing(r: LatticePoint[]): LatticePoint[] {
  let a = 0;
  for (let i = 0; i < r.length; i += 1) a += r[i].x * r[(i + 1) % r.length].y - r[(i + 1) % r.length].x * r[i].y;
  return a < 0 ? r.reverse() : r;
}

/** A corridor case on a ring: the half-width from 0.5 m to an eighth of its smaller extent (≤ 6 m), the way across through its box centre. */
function corridorOf(ring: LatticePoint[], across: boolean, turn: number, tenths: number, source: string): CorridorCase {
  const b = boxOf(ring);
  const span = Math.min(b.x1 - b.x0, b.y1 - b.y0);
  const hw = 50 + Math.floor(((Math.max(50, Math.min(600, span / 8)) - 50) * tenths) / 1000);
  const t = (turn * Math.PI) / 18_000;
  const cx = (b.x0 + b.x1) / 2;
  const cy = (b.y0 + b.y1) / 2;
  const reach = Math.hypot(b.x1 - b.x0, b.y1 - b.y0) + 400;
  const chord = across ? [lp(cx - reach * Math.cos(t), cy - reach * Math.sin(t)), lp(cx + reach * Math.cos(t), cy + reach * Math.sin(t))] : null;
  return { ring, chord, hw, role: 'way', key: GROUND, source: `${source}${across ? '+chord' : ''}` };
}

/**
 * A width-step case: the ring's first edge bent at its middle J by `hundredths` / 100 degrees (outward or inward; the
 * lattice may round a small bend straight), way:1 from ring[0] to J and way:0 from J round the ring back to ring[0];
 * way:0's half-width as `corridorOf` draws it, way:1's another from 0.5 m to the same cap (never equal).
 */
function widthStepOf(ring: LatticePoint[], hundredths: number, out: boolean, tenths: number, stepTenths: number): CorridorCase {
  const base = corridorOf(ring, false, 0, tenths, 'width-step');
  const a = ring[0];
  const b = ring[1];
  const len = Math.hypot(b.x - a.x, b.y - a.y);
  // each half leaves the chord by half the turn, so the walk turns by hundredths / 100 degrees at J
  const d = (len / 2) * Math.tan((hundredths * Math.PI) / 36_000) * (out ? -1 : 1);
  // the left normal of a → b points into a counter-clockwise ring: + moves J inward (F turns right there, away from
  // the spines), − outward (F turns left: the near-straight corner of N-52 (2))
  const J = lp((a.x + b.x) / 2 - ((b.y - a.y) / len) * d, (a.y + b.y) / 2 + ((b.x - a.x) / len) * d);
  const span = Math.max(base.hw, 50);
  const cap = Math.max(50, Math.min(600, 2 * span));
  let hw = 50 + Math.floor(((cap - 50) * stepTenths) / 1000);
  if (hw === base.hw) hw += 37;
  return { ...base, ring: [a, J, ...ring.slice(1)], step: { at: 1, hw } };
}

/** A transaction spec at `level` on `key`. */
function spec(level: 0 | 1 | 2, key: PlatKey): KernelTx {
  return {
    key,
    level,
    ops: [],
    expect: [],
    onFail: 'reject',
    batch: { kind: 'stage', stage: 9 as StageId },
    stage: 9 as StageId,
    rederivesFrom: 9 as StageId,
    workLimit: 100_000_000,
  };
}

/**
 * What a corridor case gives: our blocks and bands, the warnings §3.7's split reads, and the geometry the kerb is
 * defined on as the arena holds it — the ring way's committed route (F's outline) and every way's own-level route (the
 * spines), which insertion may have routed through a vertex within attractCm of the input — or null when the arena
 * refused the input.
 */
export interface CorridorOurs {
  readonly blocks: Ring[];
  readonly bands: Ring[];
  readonly warnings: Warning[];
  readonly face: Ring;
  readonly spines: LatticePoint[][];
  /** Each spine's half-width (way:0's the case's; a width step's way:1 its own). */
  readonly spineHw: number[];
  /** The committed corridor_split edges with a built block on both sides (N-52 (2): a split never cuts a block). */
  readonly splitsInBlocks: string[];
}

function ringsAt(p: Plat, level: 1 | 2, f: FaceId): Ring[] {
  return faceRings(p, level, f).map((r) => r.slice());
}

/** A typed refusal of the operation under test: its code and detail. */
export interface Refused {
  readonly refused: string;
  readonly detail: string;
}

/** insertChain's own refusal — the insertion's detail `insert: …` (its route refusal of N-43, its final checks). */
export function insertChainsRefusal(code: string, detail: string): boolean {
  return code === 'E_INVARIANT' && detail.startsWith('insert:');
}

/** Counts a refusal by its class and logs it for the register (N-44 (4)). */
function refused(h: Harness, op: string, code: string, detail: string, input: unknown): void {
  const cls = insertChainsRefusal(code, detail) ? 'insertChain' : 'own';
  settle(h, `refused-${cls}`);
  console.info(`REFUSAL ${op} ${cls} ${code} ${detail.slice(0, 120)} INPUT ${JSON.stringify(input)}`);
}

/**
 * Our side of a corridor case: an arena framed far beyond the face, the face's ring a closed L1 chain, the way across
 * it (if any) an L1 chain, the faces inside the ring owned, kerb(F) read on each, corridorUnion over them at L2. Null
 * where the arena refused the input (not the operation under test).
 */
export function oursCorridor(c: CorridorCase): CorridorOurs | Refused | null {
  const b = boxOf(c.ring);
  const m = 20_000;
  const p = createPlat(c.key, { widthCm: (1 << 24) as Cm, heightCm: (1 << 24) as Cm, aspect: 1, marginShare: 0 });
  attachIndex(p, { gridCellCm: 1_024 });
  const frame = [lp(b.x0 - m, b.y0 - m), lp(b.x1 + m, b.y0 - m), lp(b.x1 + m, b.y1 + m), lp(b.x0 - m, b.y1 + m)];
  const f0 = tx(p, spec(0, c.key), (o) => insertChain(o, frame, [{ role: 'margin', entity: 'terrain:1' }], 'mandatory', { closed: true }));
  if (!f0.ok) return null;
  if (c.step === undefined) {
    // a dead end's ring declares no half-width: way:edge, which `widths` below does not name
    const w = tx(p, spec(1, c.key), (o) => insertChain(o, c.ring, [{ role: c.role, entity: c.deadEnd === true ? 'way:edge' : 'way:0' }], 'mandatory', { closed: true }));
    if (!w.ok) return null;
  } else {
    // two open ways meeting at ring[0] and ring[at]: way:0 from ring[at] round to ring[0], way:1 from ring[0] to ring[at]
    const at = c.step.at;
    const w0 = tx(p, spec(1, c.key), (o) => insertChain(o, [...c.ring.slice(at), c.ring[0]], [{ role: c.role, entity: 'way:0' }], 'mandatory'));
    if (!w0.ok) return null;
    const w1 = tx(p, spec(1, c.key), (o) => insertChain(o, c.ring.slice(0, at + 1), [{ role: c.role, entity: 'way:1' }], 'mandatory'));
    if (!w1.ok) return null;
  }
  if (c.chord !== null) {
    const r = tx(p, spec(1, c.key), (o) => insertChain(o, c.chord as LatticePoint[], [{ role: c.role, entity: 'way:1' }], 'mandatory'));
    if (!r.ok) return null;
  }
  // the faces inside the ring: every L1 face but the one holding the frame's corner on its outer ring
  const corner = frame[0];
  const faces: FaceId[] = [];
  for (let f = 0; f < p.slots.face[1].top; f += 1) {
    if (!isFaceLive(p, 1, f)) continue;
    const rings = faceRings(p, 1, f);
    if (rings[0].some((q) => q.x === corner.x && q.y === corner.y)) continue;
    if (!insideRing(c.ring, rings)) continue;
    faces.push(f);
  }
  if (faces.length === 0) return null;
  const own = tx(p, spec(1, c.key), (o) => setOwner(o, faces, 'district:1'));
  if (!own.ok) return null;
  const hwOf = (entity: string): number => (entity === 'way:1' && c.step !== undefined ? c.step.hw : c.hw);
  const widths: SpineWidths = (ch) => (ch.role === c.role && (ch.entity === 'way:0' || ch.entity === 'way:1') ? { halfWidthCm: hwOf(ch.entity) } : null);
  const warnings: Warning[] = [];
  const read = tx(p, spec(1, c.key), (o) => {
    for (const f of faces) {
      const k = kerb(o, f, widths);
      if (!k.ok) return k;
      warnings.push(...k.warnings);
    }
    return { ok: true, value: null, warnings: [] };
  });
  // a typed refusal of kerb or corridorUnion (N-44 (1)): the judge counts it by its class
  if (!read.ok) return { refused: read.code, detail: read.detail };
  const r = tx(p, spec(2, c.key), (o) => corridorUnion(o, faces, widths));
  if (!r.ok) return { refused: r.code, detail: r.detail };
  warnings.push(...(r.value.record?.warnings ?? []));
  const v = r.value.value as BandResult;
  const blocks: Ring[] = [];
  const bands: Ring[] = [];
  for (const f of v.blocks) blocks.push(...ringsAt(p, 2, f));
  for (const f of v.whole) blocks.push(...ringsAt(p, 1, f));
  for (const f of v.band) bands.push(...ringsAt(p, 2, f));
  for (const f of v.wholeBand) bands.push(...ringsAt(p, 1, f));
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const spines: LatticePoint[][] = [];
  const spineHw: number[] = [];
  let face: Ring = c.ring.slice();
  const open: Record<string, LatticePoint[]> = {};
  for (const entity of ['way:0', 'way:1']) {
    for (const ln of routeLines(p, { role: c.role, entity }, c.key)) {
      const pts = ln.vertices.map((v) => lp(X[v], Y[v]));
      if (ln.closed) {
        if (entity === 'way:0') face = pts.slice();
        pts.push(pts[0]);
      } else if (c.step !== undefined) open[entity] = pts.slice();
      spines.push(pts);
      spineHw.push(hwOf(entity));
    }
  }
  // a width step's F: way:1's route (ring[0] – J) and way:0's (J – ring[0]) joined end to end, as the arena committed
  // them (a route runs either way), counter-clockwise
  const w0 = open['way:0'];
  const w1 = open['way:1'];
  if (c.step !== undefined && w0 !== undefined && w1 !== undefined) {
    const same = (u: LatticePoint, w: LatticePoint): boolean => u.x === w.x && u.y === w.y;
    let a = w1.slice();
    let b = w0.slice();
    if (same(a[0], b[0])) a = a.reverse();
    else if (same(a[a.length - 1], b[b.length - 1])) b = b.reverse();
    else if (same(a[0], b[b.length - 1])) [a, b] = [b, a];
    face = ccwRing([...a.slice(0, -1), ...b.slice(0, -1)]);
  }
  return { blocks, bands, warnings, face, spines, spineHw, splitsInBlocks: splitsInBlocks(p, v.blocks) };
}

/**
 * The corridor_split edges of the batch's level (L2) whose two sides are both built blocks — a split laid across a
 * block (N-52 (2)); each as "x,y-x,y". A split lies in the band (§3.7), so a block may border one only where the split
 * shares the kerb's stretch.
 */
function splitsInBlocks(p: Plat, blocks: readonly FaceId[]): string[] {
  const split = roleIdOf('corridor_split');
  const side = new Map<number, FaceId>();
  for (const b of blocks) for (const ring of faceWalk(p, 2, b)) for (const h of ring) side.set(h, b);
  const out: string[] = [];
  const O = p.halfEdges.origin;
  for (const [h, b] of side) {
    const o = side.get(h ^ 1);
    if (o === undefined || o === b || (h & 1) === 1) continue;
    if (!rowsOn(p, 'edge', h).some((r) => p.roles.kind[r] === split)) continue;
    out.push(`${String(p.vertices.x[O[h]])},${String(p.vertices.y[O[h]])}-${String(p.vertices.x[O[h ^ 1]])},${String(p.vertices.y[O[h ^ 1]])}`);
  }
  return out;
}

/**
 * Is the face inside the ring? Read at a point strictly inside the face — the centroid of an ear of its outer ring (a
 * convex corner whose triangle holds no other vertex of the face) — by the ring's winding number there.
 */
function insideRing(ring: readonly LatticePoint[], rings: readonly LatticePoint[][]): boolean {
  const outer = rings[0];
  const all = rings.flat();
  const m = outer.length;
  const cross = (a: LatticePoint, b: LatticePoint, c: LatticePoint): number => (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
  for (let i = 0; i < m; i += 1) {
    const a = outer[(i + m - 1) % m];
    const v = outer[i];
    const b = outer[(i + 1) % m];
    if (cross(a, v, b) <= 0) continue;
    const blocked = all.some((w) => !(w.x === a.x && w.y === a.y) && !(w.x === v.x && w.y === v.y) && !(w.x === b.x && w.y === b.y) && cross(a, v, w) >= 0 && cross(v, b, w) >= 0 && cross(b, a, w) >= 0);
    if (blocked) continue;
    return windingAt(ring, (a.x + v.x + b.x) / 3, (a.y + v.y + b.y) / 3) !== 0;
  }
  return false;
}

function windingAt(ring: readonly LatticePoint[], x: number, y: number): number {
  let w = 0;
  for (let i = 0; i < ring.length; i += 1) {
    const a = ring[i];
    const b = ring[(i + 1) % ring.length];
    const side = (b.x - a.x) * (y - a.y) - (b.y - a.y) * (x - a.x);
    if (a.y <= y) {
      if (b.y > y && side > 0) w += 1;
    } else if (b.y <= y && side < 0) w -= 1;
  }
  return w;
}

/**
 * The oracle's buffer of the spines (each a way's committed route; a ring closed on itself), round joins and ends —
 * §3.7's kerb definition; each spine at its own half-width (a width step's two ways differ), else at `hw`.
 */
function oracleWays(o: CorridorOurs, hw: number, e: OracleEngine): OracleResult {
  if (o.spineHw.every((w) => w === hw)) return oracleBuffer(o.spines, hw, 'round', 'round', e);
  return oracleBuffer(o.spines, o.spines.flatMap((s, i) => s.map(() => o.spineHw[i])), 'round', 'round', e);
}

/** The oracle's kerb: F less the spines' buffer (§3.7: F − ⋃ buffer(spineᵢ, half-widthᵢ)). */
export function oracleKerb(o: CorridorOurs, hw: number, e: OracleEngine): OracleResult {
  const buf = oracleWays(o, hw, e);
  if (!buf.ok) return buf;
  return oracleBoolean('difference', [o.face], buf.rings, 'nonzero', e);
}

/** The oracle's bands: F within the spines' buffer. */
export function oracleBands(o: CorridorOurs, hw: number, e: OracleEngine): OracleResult {
  const buf = oracleWays(o, hw, e);
  if (!buf.ok) return buf;
  return oracleBoolean('intersection', [o.face], buf.rings, 'nonzero', e);
}

/** A closed ring cut into simple loops at every point it visits twice (each loop in ring order). */
export function loopsOf(ring: readonly LatticePoint[]): LatticePoint[][] {
  const loops: LatticePoint[][] = [];
  const stack: LatticePoint[] = [];
  const at = new Map<string, number>();
  for (const q of ring) {
    const k = `${String(q.x)},${String(q.y)}`;
    const i = at.get(k);
    if (i !== undefined) {
      const loop = stack.splice(i);
      for (const u of loop) at.delete(`${String(u.x)},${String(u.y)}`);
      loops.push(loop);
    }
    at.set(k, stack.length);
    stack.push(q);
  }
  if (stack.length > 0) loops.push(stack);
  return loops;
}

/** Our band faces united by the engine's own boolean (adjacent strips and wedges as one region, the comparison's form). */
export function unitedBy(rings: readonly Ring[], e: OracleEngine): Ring[] | null {
  if (rings.length === 0) return [];
  const u = oracleBoolean('union', rings, [], 'nonzero', e);
  return u.ok ? u.rings : null;
}

/**
 * Judges one corridor case: the committed blocks against the oracle's kerb, the band faces against its bands. Our
 * faces are arena faces — adjacent ones share edges — so each is held to the ring checks on its own and the region
 * they make is compared, united by the engine's own boolean (the arena's validity is the kernel B-FUZZ's, §3.10).
 */
export function judgeCorridor(h: Harness, c: CorridorCase, op = 'corridorUnion'): void {
  const ours = oursCorridor(c);
  if (ours === null) {
    settle(h, 'input-refused');
    return;
  }
  if ('refused' in ours) {
    refused(h, op, ours.refused, ours.detail, c);
    return;
  }
  const attracted = splitOf(ours.warnings) === 'attracted';
  let dangling = false;
  for (const r of [...ours.blocks, ...ours.bands]) {
    // an arena face's ring may meet itself at a vertex (a face pinched between two that touch there): each simple
    // loop of it is held to the ring checks; a loop of two points is an edge dangling into the face — legal in an
    // arena (§13.1's antennae), and left only where attraction moved the kerb an edge was planned to reach (C-0212 (8))
    for (const loop of loopsOf(dedupe(r))) {
      if (loop.length < 3 && attracted) {
        dangling = true;
        continue;
      }
      const bad = loop.length < 3 ? ['an edge dangling into the face'] : ringProblems([loop]);
      if (bad.length > 0) keep(h, `${op} ${c.source}: a face ring of ours invalid: ${bad.join('; ')} ${JSON.stringify(loop).slice(0, 200)} INPUT ${JSON.stringify(c).slice(0, 2000)}`);
    }
  }
  if (dangling) h.notes['dangling-attracted'] = (h.notes['dangling-attracted'] ?? 0) + 1;
  const blocks = unitedBy(ours.blocks, 'clipper2');
  const bands = unitedBy(ours.bands, 'clipper2');
  if (blocks === null || bands === null) {
    settle(h, 'not-united');
    return;
  }
  judge(h, op, c.source, blocks, (e) => oracleKerb(ours, c.hw, e), ours.warnings, c);
  // N-52 (2): a corridor_split never cuts a block, attracted or not — a far split across the block leaves the blocks'
  // region whole (the area comparison cannot see it) but in two faces with the split between them
  if (ours.splitsInBlocks.length > 0) keep(h, `${op} ${c.source}: corridor_split edges between two built blocks ${ours.splitsInBlocks.join(' ')} INPUT ${JSON.stringify(c).slice(0, 2000)}`);
  judge(h, `${op}-bands`, c.source, bands, (e) => oracleBands(ours, c.hw, e), ours.warnings, c);
}

// ── the tileRings cases ──

/** A seed clip case: rings in the clip order, and where they came from. */
export interface TileCase {
  readonly rings: LatticePoint[][];
  readonly source: string;
}

const LIMIT_CM = 65_536;
const sized = { limitCm: LIMIT_CM, sizeCm: [300, 30_000] as const };

/** One ring: a simple polygon, a snapped regular ring, a thin ring or a rectangle (counter-clockwise). */
const ringArb: fc.Arbitrary<LatticePoint[]> = fc.oneof(
  { weight: 4, arbitrary: arb.polygon({ ...sized, vertices: [3, 12] }) },
  { weight: 2, arbitrary: arb.regularSnapped({ limitCm: LIMIT_CM, sizeCm: [300, 30_000] }) },
  { weight: 1, arbitrary: arb.thin({ limitCm: LIMIT_CM }) },
  {
    weight: 2,
    arbitrary: fc.tuple(fc.integer({ min: -30_000, max: 30_000 }), fc.integer({ min: -30_000, max: 30_000 }), fc.integer({ min: 300, max: 20_000 }), fc.integer({ min: 300, max: 20_000 })).map(([x, y, w, hh]) => [lp(x, y), lp(x + w, y), lp(x + w, y + hh), lp(x, y + hh)]),
  },
);

function translated(r: readonly LatticePoint[], dx: number, dy: number): LatticePoint[] {
  return r.map((q) => lp(q.x + dx, q.y + dy));
}

function ccw(r: LatticePoint[]): LatticePoint[] {
  let a = 0;
  for (let i = 0; i < r.length; i += 1) a += r[i].x * r[(i + 1) % r.length].y - r[(i + 1) % r.length].x * r[i].y;
  return a < 0 ? r.slice().reverse() : r;
}

/** Seed clip cases: 2 – 4 rings, each later one a draw or an earlier one shifted (so they overlap); and M0-k-02's. */
export const tileCaseArb: fc.Arbitrary<TileCase> = fc.oneof(
  {
    weight: 9,
    arbitrary: fc
      .record({
        first: ringArb,
        rest: fc.array(fc.oneof(ringArb.map((r) => ({ r, shift: null })), fc.record({ dx: fc.integer({ min: -4000, max: 4000 }), dy: fc.integer({ min: -4000, max: 4000 }), of: fc.nat() }).map((s) => ({ r: null, shift: s }))), { minLength: 1, maxLength: 3 }),
      })
      .map(({ first, rest }) => {
        const rings: LatticePoint[][] = [ccw(first.slice())];
        for (const x of rest) {
          if (x.r !== null) rings.push(ccw(x.r.slice()));
          else {
            const s = x.shift as { dx: number; dy: number; of: number };
            rings.push(translated(rings[s.of % rings.length], s.dx, s.dy));
          }
        }
        return { rings, source: 'arb' };
      }),
  },
  {
    weight: 1,
    arbitrary: fc
      .record({ id: fc.constantFrom('fix/tilerings-covered', 'fix/tilerings-cut-in-two', 'fix/tilerings-hole-refused', 'fix/seed-clip-rotated-t'), seed: seedArb })
      .map(({ id, seed }) => {
        const d = drawCase(id, seed);
        const order = (d.params.order as unknown as readonly string[] | undefined) ?? Object.keys(d.rings).sort();
        return { rings: order.map((k) => ccw(d.rings[k].slice())), source: id };
      }),
  },
);

/** Is any of the rings a hole (clockwise)? */
function hasHole(rings: readonly Ring[]): boolean {
  return rings.some((r) => {
    let a = 0;
    for (let i = 0; i < r.length; i += 1) a += r[i].x * r[(i + 1) % r.length].y - r[(i + 1) % r.length].x * r[i].y;
    return a < 0;
  });
}

/** The oracle's piece of ring i: the ring less every earlier ring (§3.4's seed clip). */
export function oracleTile(rings: readonly LatticePoint[][], i: number, e: OracleEngine): OracleResult {
  if (i === 0) return oracleBoolean('union', [rings[0]], [], 'nonzero', e);
  return oracleBoolean('difference', [rings[i]], rings.slice(0, i), 'nonzero', e);
}

/**
 * Judges one seed clip case: each ring's pieces against the oracle's ring less every earlier ring (one draw each); a
 * refusal (detail `overlap`) only where the oracle's result for that ring has a hole — on an unattracted case exactly
 * there, and an unattracted success never where the oracle's result has one (§13.1).
 */
export function judgeTile(h: Harness, c: TileCase): void {
  const ours: KernelResult<Ring[][]> = tileRings(c.rings);
  if (!ours.ok) {
    if (!(ours.code === 'E_DEGENERATE' && ours.detail === 'overlap')) {
      // a typed refusal other than the design's overlap answer (N-44 (1)): counted by its class, logged for the register
      refused(h, 'tileRings', ours.code, ours.detail, c.rings);
      return;
    }
    const o = ours as TileOverlap;
    const holed = ORACLE_ENGINES.map((e) => {
      const r = oracleTile(c.rings, o.ring, e);
      return r.ok ? hasHole(r.rings) : null;
    });
    const split = splitOf(o.warnings);
    if (holed.every((x) => x === false) && split === 'unattracted') keep(h, `tileRings ${c.source}: overlap refused at ring ${String(o.ring)} with no hole in either oracle's result INPUT ${JSON.stringify(c.rings)}`);
    settle(h, `overlap-${split}`);
    return;
  }
  ours.value.forEach((pieces, i) => {
    if (splitOf(ours.warnings) === 'unattracted') {
      for (const e of ORACLE_ENGINES) {
        const r = oracleTile(c.rings, i, e);
        if (r.ok && hasHole(r.rings)) keep(h, `tileRings ${c.source}: ring ${String(i)} cut without the overlap refusal where ${e}'s result has a hole INPUT ${JSON.stringify(c.rings)}`);
      }
    }
    judge(h, 'tileRings', c.source, pieces, (e) => oracleTile(c.rings, i, e), ours.warnings, { ring: i, rings: c.rings });
  });
}
