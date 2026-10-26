// M0-a-05's exit bar, B-FUZZ (§13.1; marked *here* in M0-work.json): PLAT_FUZZ_RUNS cases per family — 10⁴ in the PR
// tier, 10⁶ nightly (C-0057) — of `insertChain` (steps 1 – 5 together: the item's primitive), with 0 crashes (a throw
// fails the property), 0 hangs (each test's hard timeout) and 0 invalid outputs: after every insertion the arena passes
// M0-a-04's validator (§3.10's half-edge links, minEdge, one vertex per lattice point, no two edges crossing, clearance,
// level consistency, the index state), the face-record oracle (every record a face of its level's view, its holes that
// face's, no view face holding an edge of its level without a record, every record inside its parent — nesting) and the
// Euler characteristic per level (support.ts, written from §2.2 and §3.10 without the code under test). A refusal writes
// nothing: the content print and the transaction's warnings as they were (C-0177 (8)). The item's own fast-check
// properties meet the bar (the spec note N-16): M0-a-05 lands before the test kit's generators and constructive set.
//
// Two families (§13.1): random chains — free, near-collinear, duplicated-vertex, snapped (half-centimetre ties), thin and
// zero-area rings, self-touching, ≥ 300-vertex random walks, out-of-range values — into arenas holding a few earlier
// random chains; and the constructive classes of gen.ts — chains along existing chains (coincident typed chains),
// collinear overlaps from 1 cm to the whole edge both ways (gcd stepping), shallow crossings, segments grazing a vertex at
// 0, ± 1 and 24 – 28 cm, rings, self-touching zig-zags with duplicated and sub-minEdge points, the endpoint rule's band,
// and the chain's own acute V over an edge — in multi-level sequences. The listed test "§13.1: mandatory chains never
// rejected for precision over 10⁶ random chains" is the third property: its size is PLAT_FUZZ_RUNS (10⁶ is the nightly
// tier's), and every refusal of a mandatory chain in the other two families is held to it as well. A mandatory chain
// refused E_INVARIANT — a segment no route keeps clear, a gap in the router (N-37) — is counted on its own line of that
// property, never folded into its precision count (N-40, C-0202).
//
// N-44 (OWNER-APPROVED, J201; C-0215): the bar is how insertChain fails, not that it never does. (1) No throw: a throw
// fails the property as before. (2) No silent wrong result: every commit is judged by the validator (§3.10's clearance
// among its rows) and by N-43 B's fidelity bound (fidelity.ts: every route within 2 · √2 · attractCm of its input
// segment, Hausdorff both ways). (3) A counted, capped refusal rate: E_INVARIANT — no route in bound, or an invariant
// check's throw turned into a refusal — is a lawful refusal in every family, writes nothing, and is counted, and so is
// an optional chain's E_BELOW_MIN_EDGE naming N-43 (every route keeping clearance leaves the bound; N-46 (3): a refusal
// the bound caused is counted whatever its code — `Tally`, caps.ts `countedRefusal`); each property asserts its
// family's cap — N-46 (4)'s cap from the residual round S6 measured, plus one run's noise (caps.ts; J207, J208, C-0217,
// C-0221), 1 per 10⁴ the target (KI-1); with PLAT_FUZZ_COUNTS set a run writes its counts there. (4) Each refused case
// found is kept in a register (register.test.ts, routerGapS5.test.ts, routerGapS6.test.ts: seed, input, refusal code).
//
// N-55 (2) (session round S7, C-0302): after every committed chain the arena holds no dissolvable vertex
// (`dissolvableProblems`, support.ts — a `split` vertex of degree 2 between identical rows, which a later removal would
// dissolve): a chain's own point that folds back onto its own edge carries no flag, and every other split still has the
// chain that made it.
import { createHash } from 'node:crypto';
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { isVertexLive, type Plat } from '../../../src/arena/index.js';
import type { InsertTx } from '../../../src/insert/classes.js';
import type { Warning } from '../../../src/num/index.js';
import type { Level } from '../../../src/types/index.js';
import { countedRefusal, FUZZ_PARAMS, recordCounts, refusalCap } from './caps.js';
import { genChain } from './gen.js';
import { fidelityProblems } from './fidelity.js';
import { allProblems, contentPrint, dissolvableProblems, framed, generator, ins, intIn, TIMEOUT, tx } from './support.js';

/** §3.6 *Chain classes*: the precision codes — an optional chain's only (§3.1); a mandatory chain never takes one. */
const PRECISION = new Set(['E_BELOW_MIN_EDGE', 'E_BELOW_MIN_ANGLE']);
/** The codes an insertion may refuse with at all (§3.1, §3.3): anything else is a defect. */
const CODES = new Set(['E_BELOW_MIN_EDGE', 'E_BELOW_MIN_ANGLE', 'E_DEGENERATE', 'E_KEPT', 'E_LEVEL', 'E_OUT_OF_RANGE', 'E_WORK_LIMIT', 'E_SELF_INTERSECT']);

const SIDE = 4000;

/**
 * The hard timeout of each property (0 hangs): M0-a-04's 600 s, or more where PLAT_FUZZ_RUNS makes the run longer — a
 * few times the CONTENDED cost per case measured at 10⁴ (≈ 17, 5 and 3 ms), so a hang still fails at the nightly size.
 */
const RUNS = fc.readConfigureGlobal().numRuns ?? 10_000;
const hardTimeout = (msPerCase: number): number => Math.max(TIMEOUT, RUNS * msPerCase);

/** N-44 (3): the cap on E_INVARIANT refusals per property — the family's measured residual plus seed noise (caps.ts, C-0217). */
const CAP = { random: refusalCap('random', RUNS), constructive: refusalCap('constructive', RUNS), mandatory: refusalCap('mandatory', RUNS) };

/** A copy of a warning list. */
const copy = (ws: readonly Warning[]): Warning[] => ws.map((w) => ({ ...w, ...(w.at === undefined ? {} : { at: { ...w.at } }) }));

/** One chain to insert. */
interface Case {
  readonly level: Level;
  readonly cls: 'mandatory' | 'optional';
  readonly closed: boolean;
  readonly points: readonly (readonly [number, number])[];
  readonly pinned?: readonly number[];
}

/** What one insertion gave (for the counters a test prints). */
interface Outcome {
  readonly ok: boolean;
  readonly code?: string;
  /** A refusal's detail. */
  readonly detail?: string;
  /** A commit's warnings (the same-seed pins read them). */
  readonly warnings?: readonly Warning[];
}

/**
 * Inserts one chain and judges it (the bar): no throw; a refusal is a known code or E_INVARIANT (N-44: counted by the
 * caller), a mandatory chain's never a precision code, and writes nothing (content and the transaction's warnings
 * unchanged); a commit names a live vertex of level ≤ the batch's per input point and keeps N-43 B's fidelity bound;
 * the arena valid after either (`validate` false skips the whole-arena oracles — the mandatory-only property's base
 * chains, judged once at its end).
 */
function insertJudged(p: Plat, c: Case, entity: string, validate = true): Outcome {
  const t: InsertTx = tx(p, c.level);
  t.warnings.push({ code: 'W_PLACED', count: 1 }); // a warning an earlier op of the batch reported: a refusal keeps it
  const warningsBefore = copy(t.warnings);
  const before = validate ? contentPrint(p) : '';
  const r = ins(t, c.points, [{ role: 'way', entity }], c.cls, { closed: c.closed, ...(c.pinned === undefined ? {} : { pinned: c.pinned }) });
  if (!r.ok) {
    if (r.code !== 'E_INVARIANT') expect(CODES.has(r.code), `an unknown refusal ${r.code} (${r.detail})`).toBe(true);
    if (c.cls === 'mandatory') expect(PRECISION.has(r.code), `a mandatory chain refused for precision: ${r.code} ${r.detail}`).toBe(false);
    expect(t.warnings).toEqual(warningsBefore);
    if (validate) expect(contentPrint(p)).toBe(before);
  } else {
    expect(r.value.placed).toHaveLength(c.points.length);
    for (const v of r.value.placed) {
      expect(isVertexLive(p, v)).toBe(true);
      expect(p.vertices.level[v]).toBeLessThanOrEqual(c.level);
    }
    const opts = { closed: c.closed, ...(c.pinned === undefined ? {} : { pinned: c.pinned }) };
    expect(fidelityProblems(p, c.level, c.cls, c.points, opts, r.value.placed, entity)).toEqual([]);
    expect(dissolvableProblems(p), 'no dissolvable vertex after a commit (N-55 (2))').toEqual([]);
  }
  if (validate) expect(allProblems(p)).toEqual([]);
  return r.ok ? { ok: true, warnings: r.warnings } : { ok: false, code: r.code, detail: r.detail };
}

/**
 * N-46 (3)'s tally of the refusals N-43 B's bound caused, whatever their code: E_INVARIANT and an optional chain's
 * E_BELOW_MIN_EDGE naming N-43 — each counted against the family's cap (caps.ts), and printed apart.
 */
class Tally {
  invariant = 0;
  optional = 0;
  /** Counts the outcome when its refusal is one N-43 B's bound caused (`countedRefusal`); true then. */
  add(o: Outcome): boolean {
    if (o.ok || !countedRefusal(o.code ?? '', o.detail ?? '')) return false;
    if (o.code === 'E_INVARIANT') this.invariant += 1;
    else this.optional += 1;
    return true;
  }
  get total(): number {
    return this.invariant + this.optional;
  }
  toString(): string {
    return `counted ${this.total} (E_INVARIANT ${this.invariant}, optional E_BELOW_MIN_EDGE N-43 ${this.optional})`;
  }
}

// ---- the random family --------------------------------------------------------------------------------------------

/** A coordinate: mostly inside the frame's square, sometimes just outside it, now and then with a half-centimetre tie. */
const coord = fc.tuple(
  fc.oneof({ arbitrary: fc.integer({ min: 40, max: SIDE - 40 }), weight: 12 }, { arbitrary: fc.integer({ min: -80, max: SIDE + 80 }), weight: 1 }),
  fc.constantFrom(0, 0, 0, 0, 0.5, -0.5, 0.25, 0.499999),
).map(([v, f]) => v + f);
const point = fc.tuple(coord, coord);
const clamp = (v: number): number => Math.max(-80, Math.min(SIDE + 80, v));

/** The random chain shapes of §13.1's first family; `walks` the weight of the ≥ 300-vertex random walk (of 16 in all). */
const shapes = (walks: number): fc.Arbitrary<{ points: [number, number][]; closed: boolean }> => fc.oneof(
  // free points (concave and self-crossing alike)
  { arbitrary: fc.record({ points: fc.array(point, { minLength: 1, maxLength: 10 }), closed: fc.boolean() }), weight: 6 },
  // near-collinear: points along a line, each off it by at most 3 cm
  {
    arbitrary: fc.record({ a: point, b: point, k: fc.integer({ min: 3, max: 9 }), j: fc.array(fc.integer({ min: -3, max: 3 }), { minLength: 18, maxLength: 18 }), closed: fc.boolean() })
      .map(({ a, b, k, j, closed }) => ({
        points: Array.from({ length: k }, (_, i) => [Math.round(a[0] + ((b[0] - a[0]) * i) / (k - 1)) + j[2 * i], Math.round(a[1] + ((b[1] - a[1]) * i) / (k - 1)) + j[2 * i + 1]] as [number, number]),
        closed,
      })),
    weight: 2,
  },
  // duplicated vertices and sub-minEdge steps
  {
    arbitrary: fc.record({ pts: fc.array(fc.tuple(point, fc.integer({ min: 0, max: 2 }), fc.integer({ min: -24, max: 24 })), { minLength: 2, maxLength: 6 }), closed: fc.boolean() })
      .map(({ pts, closed }) => ({
        points: pts.flatMap(([q, dup, d]) => (dup === 0 ? [q] : dup === 1 ? [q, q] : [q, [clamp(q[0] + d), clamp(q[1] - d)] as [number, number]])),
        closed,
      })),
    weight: 2,
  },
  // thin and zero-area rings: a rectangle 0 – 40 cm wide, or collinear points (exact, by integer steps)
  {
    arbitrary: fc.record({ a: point, dx: fc.integer({ min: -300, max: 300 }), dy: fc.integer({ min: -300, max: 300 }), w: fc.integer({ min: 0, max: 40 }), k: fc.integer({ min: 3, max: 6 }) })
      .map(({ a, dx, dy, w, k }) => {
        if (w === 0) return { points: Array.from({ length: k }, (_, i) => [clamp(Math.round(a[0]) + ((i * 3) % k) * dx / 3), clamp(Math.round(a[1]) + ((i * 3) % k) * dy / 3)] as [number, number]), closed: true };
        const len = Math.hypot(dx, dy) || 1;
        const nx = Math.round((-dy / len) * w);
        const ny = Math.round((dx / len) * w);
        const [x, y] = [Math.round(a[0]), Math.round(a[1])];
        return { points: [[x, y], [clamp(x + 4 * dx), clamp(y + 4 * dy)], [clamp(x + 4 * dx + nx), clamp(y + 4 * dy + ny)], [clamp(x + nx), clamp(y + ny)]] as [number, number][], closed: true };
      }),
    weight: 2,
  },
  // self-touching: the chain comes back exactly to an earlier point
  {
    arbitrary: fc.record({ pts: fc.array(point, { minLength: 3, maxLength: 7 }), back: fc.nat(), closed: fc.boolean() })
      .map(({ pts, back, closed }) => ({ points: [...pts, pts[back % (pts.length - 1)], pts[pts.length - 1].map((v) => clamp(v + 333)) as [number, number]], closed })),
    weight: 2,
  },
  // ≥ 300 vertices: a random walk of 5 – 60 cm steps
  {
    arbitrary: fc.record({ start: point, steps: fc.array(fc.tuple(fc.integer({ min: -60, max: 60 }), fc.integer({ min: -60, max: 60 })), { minLength: 300, maxLength: 330 }) })
      .map(({ start, steps }) => {
        const out: [number, number][] = [[Math.round(start[0]), Math.round(start[1])]];
        for (const [sx, sy] of steps) {
          const [x, y] = out[out.length - 1];
          out.push([Math.max(30, Math.min(SIDE - 30, x + sx)), Math.max(30, Math.min(SIDE - 30, y + sy))]);
        }
        return { points: out, closed: false };
      }),
    weight: walks,
  },
  // values snap must refuse (± 2²³, NaN, ± ∞) among ordinary ones: E_OUT_OF_RANGE for either class
  {
    arbitrary: fc.record({ pts: fc.array(point, { minLength: 1, maxLength: 4 }), bad: fc.constantFrom(8_388_608, -8_388_608, Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY), at: fc.nat() })
      .map(({ pts, bad, at }) => {
        const out = pts.map((q) => [q[0], q[1]] as [number, number]);
        out.splice(at % (out.length + 1), 0, [bad, 1000]);
        return { points: out, closed: false };
      }),
    weight: 1,
  },
);

const chainCase = (levels: fc.Arbitrary<Level>, walks = 1): fc.Arbitrary<Case> =>
  fc.record({ level: levels, cls: fc.constantFrom('mandatory' as const, 'optional' as const), s: shapes(walks) })
    .map(({ level, cls, s }) => ({ level, cls, points: s.points, closed: s.closed && s.points.length >= 3 }));

const anyLevel = fc.integer({ min: 0, max: 4 }) as fc.Arbitrary<Level>;
const coarseLevel = fc.integer({ min: 0, max: 2 }) as fc.Arbitrary<Level>;

/**
 * The random family's property: earlier random chains (coarse first), then one more, each judged; `seen` counts the
 * last, `bound` sees every chain of the case (N-44 (3), N-46 (3): the tally counts those N-43 B's bound refused).
 */
const randomFamily = (seen: (o: Outcome) => void, bound: (o: Outcome) => void = () => {}): fc.IPropertyWithHooks<[Case[], Case]> =>
  fc.property(fc.array(chainCase(coarseLevel), { maxLength: 3 }), chainCase(anyLevel), (base, c) => {
    const p = framed(SIDE);
    // Earlier chains coarse first, as a stage order builds them (a finer one first would make later coarser chains
    // meet kept content — E_KEPT, judged all the same).
    [...base].sort((a, b) => a.level - b.level).forEach((b, i) => {
      bound(insertJudged(p, b, `way:b${i}`));
    });
    const o = insertJudged(p, c, 'way:x');
    bound(o);
    seen(o);
  });

describe('B-FUZZ: insertChain (§13.1, the item\'s exit bar here)', () => {
  it('random chains into arenas holding up to three earlier random chains: 0 crashes, 0 invalid outputs, refusals write nothing', () => {
    let commits = 0;
    let refusals = 0;
    const bound = new Tally();
    fc.assert(
      randomFamily(
        (o) => {
          if (o.ok) commits += 1;
          else refusals += 1;
        },
        (o) => {
          bound.add(o);
        },
      ),
      FUZZ_PARAMS,
    );
    console.log(`B-FUZZ insertChain random: ${commits} committed, ${refusals} refused; bound-caused ${bound} (cap ${CAP.random}, N-44, N-46 (3), C-0221)`);
    recordCounts('random', RUNS, bound.invariant, bound.optional, CAP.random);
    expect(commits).toBeGreaterThan(refusals);
    expect(bound.total, 'chains refused for N-43 B\'s bound (N-44 (3), N-46 (3): the random family\'s cap, caps.ts)').toBeLessThanOrEqual(CAP.random);
  }, hardTimeout(60));

  // N-42 (b), the named regression (C-0209): this family at PLAT_FUZZ_SEED=−1863295922 failed its 8 346th case (M0-a-14
  // close-r1 note 23) — three earlier chains, then an L2 mandatory random walk of 320 points refused E_INVARIANT; shrunk,
  // one L0 walk refused "no route from (313, 244) to (341, 251) keeps clearance" (routerGapS3.test.ts pins it): the route
  // step 3 gives the last segment, through (332, 226) and (361, 234), passes 24.3 cm from its own free end. The case
  // itself, replayed (fast-check's path 8345 at that seed), now commits valid, a free end re-landed (W_PLACED at (3624,
  // 3034)).
  it('the random family\'s seed −1863295922, its 8 346th case replayed (N-42 (b)): 0 crashes, 0 invalid outputs', () => {
    const seen: Outcome[] = [];
    fc.assert(randomFamily((o) => seen.push(o)), { seed: -1863295922, path: '8345', numRuns: 1 });
    expect(seen.map((o) => o.ok)).toEqual([true]);
    expect(seen[0].warnings?.filter((w) => w.code === 'W_PLACED')).toEqual([{ code: 'W_PLACED', count: 1, at: { x: 3624, y: 3034 } }]);
  });

  // The same class, found by fix round S3's own scan of 70 000 cases on the S1/S2 router (C-0209): at seed 13 the
  // random family's 7 265th case — an L1 chain, then an L4 mandatory random walk of 331 points — refused the walk
  // E_INVARIANT; rounds S3 – S8 re-landed its free end (W_PLACED at (2953, 109)); from round S9 the strict route, which
  // no longer routes through a neighbour of the segment's own end (C-0361), keeps the segment and nothing is re-landed.
  it('the random family\'s seed 13, its 7 265th case replayed (N-42 (b)): 0 crashes, 0 invalid outputs', () => {
    const seen: Outcome[] = [];
    fc.assert(randomFamily((o) => seen.push(o)), { seed: 13, path: '7264', numRuns: 1 });
    expect(seen.map((o) => o.ok)).toEqual([true]);
    expect(seen[0].warnings?.filter((w) => w.code === 'W_PLACED')).toEqual([]);
  });

  // Round S9's own census (PLAT_FUZZ_SEED=5309): the random family's 9 852nd case — an L2 optional walk, then an L1
  // mandatory walk of 300-odd points — overflowed the stack (RangeError) when a retrace cut (item 130 (d)) routed on to
  // the segment's end from inside the call that met the re-entry, each later cut nesting deeper. The cut now unwinds to
  // `snapRound`, which routes on from the cut-to vertex in a loop (mutant DEEP restores the nested form).
  it('the random family\'s seed 5309, its 9 852nd case replayed (round S9): the retrace cut unwinds, no crash, every chain judged', () => {
    const all: Outcome[] = [];
    fc.assert(randomFamily(() => {}, (o) => all.push(o)), { seed: 5309, path: '9851', numRuns: 1 });
    expect(all.map((o) => (o.ok ? o.warnings : `${o.code} ${o.detail}`))).toEqual([
      [{ code: 'W_ACUTE_CORNER', count: 1, at: { x: 2894, y: 413 } }, { code: 'W_PLACED', count: 1, at: { x: 2820, y: 553 } }],
      [{ code: 'W_PLACED', count: 2, at: { x: 2694, y: 833 } }],
      'E_BELOW_MIN_EDGE fewer than two distinct points after decimation',
      'E_KEPT a chain vertex inside a finer face at (1657, 748) (kept content)',
    ]);
  });

  // Round S9's own census (PLAT_FUZZ_SEED=7507): the random family's 6 789th case — one random walk of 300-odd points
  // folding back over itself — was refused E_INVARIANT (class C) while the strict route's second reading (C-0361: the
  // neighbours of the segment's own ends passed over) stood in the strict route's place: one segment's strict route then
  // went through (2624, 3148), and the next segment's start (2667, 3121) was left between (2649, 3141) and (2641, 3116),
  // each within minEdge of the edge to the other; the route that kept clearance there before the round did so only by a
  // spur out to (2649, 3141) and back, which the retrace cut (item 130 (d)) now removes. The strict route now comes
  // first and its second reading after it (r2, r2b): the case commits as before the round, without the spur (mutant
  // ORDER, the second reading first, refuses it).
  it('the random family\'s seed 7507, its 6 789th case replayed (round S9): the strict route before its second reading — committed, every chain judged', () => {
    const all: Outcome[] = [];
    fc.assert(randomFamily(() => {}, (o) => all.push(o)), { seed: 7507, path: '6788', numRuns: 1 });
    expect(all.map((o) => (o.ok ? o.warnings : `${o.code} ${o.detail}`))).toEqual([
      [{ code: 'W_ATTRACTED', count: 248, at: { x: 2225, y: 3328 } }, { code: 'W_STRETCH_SHARED', count: 185, at: { x: 2279, y: 3308 } }, { code: 'W_PLACED', count: 1, at: { x: 2392, y: 3465 } }],
    ]);
  });

  // Round S9's own census (PLAT_FUZZ_SEED=5309, the constructive family's 9 765th case, generator seed 1 536 331 735):
  // the third chain, an L2 optional walk, routed its second segment to a vertex P it placed on the L1 walk's run, reaching
  // it through (2504, 2818); from P the route re-entered (2504, 2818), and the retrace cut (item 130 (d)) going back to
  // the mark at (2504, 2818) — taken after P was placed — left P a split vertex of degree 2 on the L1 run alone (a
  // dissolvable vertex, N-55 (2)). The cut now goes on from P with (2504, 2818) left out of step 3 instead: the chain
  // commits, the arena valid and no vertex dissolvable (insertJudged).
  it('the constructive family\'s seed 5309 case 9 765 replayed (round S9): a retrace cut that would leave a vertex the route placed goes on from it instead', () => {
    const rnd = generator(1536331735);
    const p = framed(SIDE);
    const steps = intIn(rnd, 1, 8);
    let level = intIn(rnd, 0, 2) as Level;
    const seen: Outcome[] = [];
    for (let s = 0; s < steps; s++) {
      if (rnd() < 0.3 && level < 4) level = (level + 1) as Level;
      const lv = rnd() < 0.1 ? (intIn(rnd, 0, 4) as Level) : level;
      const g = genChain(p, rnd, SIDE, lv);
      seen.push(insertJudged(p, { level: lv, cls: g.cls, closed: g.closed, points: g.points, ...(g.pinned === undefined ? {} : { pinned: g.pinned }) }, `way:${s}`));
    }
    expect(seen.map((o) => o.ok)).toEqual([true, true, true, true, true, true]);
    expect(seen[2].warnings).toEqual([{ code: 'W_ATTRACTED', count: 2, at: { x: 2504, y: 2818 } }, { code: 'W_STRETCH_SHARED', count: 2, at: { x: 2249, y: 3341 } }]);
  });

  // Round S9's own census (the retrace cut's second re-entry, item 130 (d)): in these three cases a route the cut had
  // already gone on from (its cut-off vertex placed before the cut-to vertex's mark, `SegmentPath.placedBefore`) met
  // a vertex it had left out of step 3 again. That reading is refused (RETRACE_DETAIL, read as a route keeping nothing)
  // and a later reading commits each chain, the arena valid (insertJudged). Without the refusal (mutant RETR) the route
  // goes on through the left-out vertex and the outcome differs. Each case: the census's chains in order (PLAT_FUZZ_SEED,
  // the instrumented case number), the last chain's warnings as committed.
  const RETRACED: readonly (readonly [string, number, readonly (Case & { readonly entity: string })[], readonly { readonly code: string; readonly count: number; readonly at: { readonly x: number; readonly y: number } }[]])[] = [
    ['−5801', 21302, [
      { level: 0, cls: 'optional', closed: true, entity: 'way:b0', points: [[842.25, 1060], [3638, 2461.5], [3055, 3360], [2558.499999, 630.25], [1443, 2990.25], [672, 954], [1041.25, 1712], [47.5, 2430], [3257, 2471.5], [3359, 1521]] },
      { level: 2, cls: 'optional', closed: true, entity: 'way:b1', points: [[674.499999, 3005.5], [674.499999, 3005.5], [3137.499999, 1987], [3137.499999, 1987], [3711.25, 564.5], [3711.25, 564.5]] },
      { level: 2, cls: 'mandatory', closed: true, entity: 'way:m', points: [[2913, 2560], [3851.5, 1862], [636.499999, 2198], [643.499999, 2191], [1398, 2727], [1398, 2727], [1712.499999, 3106.25], [1712.499999, 3106.25]] },
    ], [{code:  'W_ATTRACTED', count:  3, at:  {x:  2913, y:  2560}}, {code:  'W_WEDGE_ROUTED', count:  1, at:  {x:  1892, y:  2040}}, {code:  'W_STRETCH_SHARED', count:  1, at:  {x:  1879, y:  2067}}]],
    ['−6607', 20686, [
      { level: 1, cls: 'optional', closed: true, entity: 'way:b0', points: [[586, 944.25], [586, 944.25], [42.25, 3833.5], [42.25, 3833.5], [208, 1085], [208, 1085], [544, 2028], [558, 2014]] },
      { level: 2, cls: 'mandatory', closed: true, entity: 'way:b1', points: [[45.5, 3563.25], [3694, 44.499999], [46.5, 744.5], [3448, 46], [1390.25, 3955.25], [640.499999, 3187.499999], [3215, 2510.5], [1326.5, 3133], [386.25, 3798], [167.5, 455]] },
    ], [{code:  'W_ATTRACTED', count:  2, at:  {x:  46, y:  3563}}, {code:  'W_ACUTE_CORNER', count:  6, at:  {x:  47, y:  745}}, {code:  'W_PLACED', count:  2, at:  {x:  209, y:  712}}]],
    ['−6607', 29156, [
      { level: 2, cls: 'mandatory', closed: false, entity: 'way:b0', points: [[1567, 1177.499999], [646, 2777], [2919, 2244], [966, 980.499999], [2900.5, 2354], [2214.5, 338], [689.5, 243], [2499.5, 2954.25], [3456.5, 627], [2272, 3956.499999]] },
    ], [{code:  'W_ACUTE_CORNER', count:  2, at:  {x:  966, y:  980}}, {code:  'W_ATTRACTED', count:  2, at:  {x:  2789, y:  2274}}, {code:  'W_WEDGE_ROUTED', count:  1, at:  {x:  2848, y:  2198}}, {code:  'W_STRETCH_SHARED', count:  1, at:  {x:  2826, y:  2184}}]],
  ];
  for (const [seed, n, chains, warnings] of RETRACED) {
    it(`the census's seed ${seed} case ${n} (round S9): a second re-entry refuses that reading, a later one commits, every chain judged`, () => {
      const p = framed(SIDE);
      const seen = chains.map((c) => insertJudged(p, c, c.entity));
      expect(seen.map((o) => o.ok)).toEqual(chains.map(() => true));
      expect(seen[seen.length - 1].warnings).toEqual(warnings);
    });
  }

  // N-43 A's class, found by the S3 closing check (M0-a-05-s3.md part 1): at PLAT_FUZZ_SEED=31337 this family's 3 624th
  // case threw "the chain's edge (2214, 3944)–(2229, 3922) stands within minEdge of the vertex (2197, 3925)" from
  // insertChain's final clearance check (a base chain; the same on S2 code). The S1 – S3 router judged a route by the
  // chain's new edges only, so a split that took a third vertex out of its one-ring passed (C-0215). Now every route is
  // judged whole and the final check refuses instead of throwing: the case commits, every chain valid and in bound.
  it('the random family\'s seed 31337, its 3 624th case replayed (N-43 A, C-0215): 0 crashes, 0 invalid outputs, every chain committed in bound', () => {
    const seen: Outcome[] = [];
    const bound = new Tally();
    fc.assert(randomFamily((o) => seen.push(o), (o) => {
      bound.add(o);
    }), { seed: 31337, path: '3623', numRuns: 1 });
    expect(bound.total).toBe(0);
    expect(seen.map((o) => o.ok)).toEqual([true]);
    expect(seen[0].warnings?.map((w) => [w.code, w.count])).toEqual([['W_STRETCH_SHARED', 6], ['W_ATTRACTED', 4]]);
  });

  // N-43 B (C-0215; a register case, N-44 (4)): at seed 777 the random family's 421st case — an L0 chain, then an L2
  // mandatory ring of 9 points — committed on the S1 – S3 router with a crossing on the near side of a sliver sent to the
  // placement's endpoint fallback (W_PLACED 4 at (3714, 2690)): its segment (3919, 2339) → (2004, 1853) then lay 244.9
  // cm from its route. No route of the first two passes kept it within 2 · √2 · attractCm (the anchored and split routes
  // of the second included): S4 refused it E_INVARIANT. S5's third pass (C-0217) commits it within the bound — the wedge
  // corner kept, the far fallbacks placed within the bound (W_PLACED 7) — and the arena valid (insertJudged).
  it('register: seed 777\'s 421st case — its S1 – S3 commit 244.9 cm off its segment, refused by S4 (N-43 B) — commits within the bound on the third pass (C-0217)', () => {
    const seen: Outcome[] = [];
    fc.assert(randomFamily((o) => seen.push(o)), { seed: 777, path: '420', numRuns: 1 });
    expect(seen.map((o) => [o.ok, o.warnings?.map((w) => [w.code, w.count])])).toEqual([[true, [['W_WEDGE_ROUTED', 1], ['W_PLACED', 7], ['W_ATTRACTED', 2]]]]);
  });

  it('the constructive classes (gen.ts) in multi-level sequences of 1 – 8 chains: 0 crashes, 0 invalid outputs, refusals write nothing', () => {
    const kinds = new Map<string, number>();
    const bound = new Tally();
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 0x7fffffff }), (seed) => {
        const rnd = generator(seed);
        const p = framed(SIDE);
        const steps = intIn(rnd, 1, 8);
        let level = intIn(rnd, 0, 2) as Level;
        for (let s = 0; s < steps; s++) {
          if (rnd() < 0.3 && level < 4) level = (level + 1) as Level;
          const lv = rnd() < 0.1 ? (intIn(rnd, 0, 4) as Level) : level;
          const g = genChain(p, rnd, SIDE, lv);
          kinds.set(g.kind, (kinds.get(g.kind) ?? 0) + 1);
          bound.add(insertJudged(p, { level: lv, cls: g.cls, closed: g.closed, points: g.points, ...(g.pinned === undefined ? {} : { pinned: g.pinned }) }, `way:${s}`));
        }
      }),
      FUZZ_PARAMS,
    );
    console.log(`B-FUZZ insertChain constructive: ${[...kinds].sort().map(([k, n]) => `${k} ${n}`).join(', ')}; bound-caused ${bound} (cap ${CAP.constructive}, N-44, N-46 (3), C-0221)`);
    recordCounts('constructive', RUNS, bound.invariant, bound.optional, CAP.constructive);
    expect(bound.total, 'chains refused for N-43 B\'s bound (N-44 (3), N-46 (3): the constructive family\'s cap, caps.ts)').toBeLessThanOrEqual(CAP.constructive);
    for (const k of ['random', 'collinear', 'coincident', 'shallow', 'graze', 'ring', 'zigzag', 'endpoint', 'vee']) expect(kinds.get(k) ?? 0).toBeGreaterThan(0);
  }, hardTimeout(20));
});

describe('§13.1: mandatory chains never rejected for precision over 10⁶ random chains (PLAT_FUZZ_RUNS: 10⁴ PR, 10⁶ nightly)', () => {
  it('a mandatory random chain into an arena holding up to two earlier chains: refused only for a non-precision code, never a throw; the arena valid', () => {
    const codes = new Map<string, number>();
    const bound = new Tally();
    fc.assert(
      fc.property(fc.array(chainCase(coarseLevel, 0), { maxLength: 2 }), chainCase(anyLevel, 0), (base, c0) => {
        const c: Case = { ...c0, cls: 'mandatory' };
        const p = framed(SIDE);
        [...base].sort((a, b) => a.level - b.level).forEach((b, i) => {
          bound.add(insertJudged(p, b, `way:b${i}`, false)); // a base chain's too (optional ones among them)
        });
        const o = insertJudged(p, c, 'way:m', false);
        const k = o.ok ? 'ok' : (o.code as string);
        if (!bound.add(o)) codes.set(k, (codes.get(k) ?? 0) + 1);
        expect(allProblems(p)).toEqual([]);
      }),
      FUZZ_PARAMS,
    );
    console.log(`mandatory chains: ${[...codes].sort().map(([k, n]) => `${k} ${n}`).join(', ')}`);
    console.log(`chains refused for N-43 B's bound (no route in bound, N-37, N-43, N-44; its own line, N-40): ${bound} (cap ${CAP.mandatory}, N-46 (3), C-0221)`);
    recordCounts('mandatory', RUNS, bound.invariant, bound.optional, CAP.mandatory);
    for (const k of PRECISION) expect(codes.get(k) ?? 0).toBe(0);
    expect(bound.total, 'chains refused for N-43 B\'s bound (N-44 (3), N-46 (3): the mandatory-only family\'s cap, caps.ts)').toBeLessThanOrEqual(CAP.mandatory);
  }, hardTimeout(15));
});

// N-7 (the hardening round S9): "nothing changes for chains that commit today" held by a test, not by receipts — a
// golden digest of a fixed B-FUZZ slice under the insert code: 400 cases of the random family's draw and 200 constructive
// sequences, at fixed seeds, each insertion's outcome (its code and detail, or its warnings and placed points) and the
// arena's content print after it, hashed (sha-256). Any change of what insertChain commits or refuses on the slice moves
// it; it is re-recorded only with a choices row naming the shift (the first record: round S9, C-0361).
describe('N-7: the golden digest of a fixed B-FUZZ slice (re-recorded only with a choices row)', () => {
  const GOLDEN = '3e8ec437c4c90c6596b03f429ace77b7a64fb2f1f8de0ddf906f2ede69345d7d';
  it('400 random cases (seed 4242) and 200 constructive sequences (seeds 1 – 200): the digest of every outcome and arena', () => {
    const h = createHash('sha256');
    const one = (p: Plat, c: Case, entity: string): void => {
      const r = ins(tx(p, c.level), c.points, [{ role: 'way', entity }], c.cls, { closed: c.closed, ...(c.pinned === undefined ? {} : { pinned: c.pinned }) });
      h.update(r.ok ? `ok ${JSON.stringify(r.warnings)} ${r.value.placed.map((v) => `${p.vertices.x[v]},${p.vertices.y[v]}`).join(' ')}\n` : `${r.code} ${r.detail}\n`);
      h.update(createHash('sha256').update(contentPrint(p)).digest('hex'));
    };
    for (const [base, c] of fc.sample(fc.tuple(fc.array(chainCase(coarseLevel), { maxLength: 3 }), chainCase(anyLevel)), { seed: 4242, numRuns: 400 })) {
      const p = framed(SIDE);
      [...base].sort((a, b) => a.level - b.level).forEach((b, i) => one(p, b, `way:b${i}`));
      one(p, c, 'way:x');
    }
    for (let seed = 1; seed <= 200; seed++) {
      const rnd = generator(seed);
      const p = framed(SIDE);
      const steps = intIn(rnd, 1, 8);
      let level = intIn(rnd, 0, 2) as Level;
      for (let s = 0; s < steps; s++) {
        if (rnd() < 0.3 && level < 4) level = (level + 1) as Level;
        const lv = rnd() < 0.1 ? (intIn(rnd, 0, 4) as Level) : level;
        const g = genChain(p, rnd, SIDE, lv);
        one(p, { level: lv, cls: g.cls, closed: g.closed, points: g.points, ...(g.pinned === undefined ? {} : { pinned: g.pinned }) }, `way:${s}`);
      }
    }
    expect(h.digest('hex')).toBe(GOLDEN);
  }, TIMEOUT);
});

// RQ3's constructive class (§13.1 as item 130 (e) amends it; round S9): "a chain given again under its own key,
// identical and with every point moved up to √2 · attractCm, absorbed as its run". A mandatory `way` polyline (monotone
// in x, so simple) is inserted, then given again under its key with each point at its placed vertex moved by up to
// 36 cm (√2 · attractCm = 36.77): the second insertion commits, adds no vertex and no edge, and every edge's rows are as
// they were. PLAT_FUZZ_RUNS / 10 cases (at least 100).
describe('B-FUZZ constructive (item 130 (e)): a chain given again under its own key is absorbed as its run', () => {
  it('a mandatory way polyline given again, each point moved up to 36 cm off its placed vertex: committed, nothing added', () => {
    const runs = Math.max(100, Math.floor(RUNS / 10));
    const poly = fc.record({
      x0: fc.integer({ min: 200, max: 800 }),
      steps: fc.array(fc.tuple(fc.integer({ min: 150, max: 600 }), fc.integer({ min: 200, max: 3800 })), { minLength: 1, maxLength: 5 }),
      y0: fc.integer({ min: 200, max: 3800 }),
      moves: fc.array(fc.tuple(fc.integer({ min: -36, max: 36 }), fc.integer({ min: -36, max: 36 })), { minLength: 6, maxLength: 6 }),
    });
    let absorbed = 0;
    fc.assert(fc.property(poly, ({ x0, steps, y0, moves }) => {
      const pts: [number, number][] = [[x0, y0]];
      for (const [dx, y] of steps) pts.push([Math.min(SIDE - 200, pts[pts.length - 1][0] + dx), y]);
      fc.pre(pts.every((q, i) => i === 0 || q[0] > pts[i - 1][0]));
      const p = framed(SIDE);
      const first = ins(tx(p, 1), pts, [{ role: 'way', entity: 'way:k' }], 'mandatory');
      fc.pre(first.ok);
      if (!first.ok) return;
      const before = contentPrint(p);
      const again = first.value.placed.map((v, i) => {
        const [dx, dy] = moves[i % moves.length];
        const s = dx * dx + dy * dy > 36 * 36 ? 0.7 : 1;
        return [p.vertices.x[v] + Math.trunc(dx * s), p.vertices.y[v] + Math.trunc(dy * s)] as [number, number];
      });
      const r = ins(tx(p, 1), again, [{ role: 'way', entity: 'way:k' }], 'mandatory');
      expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
      if (!r.ok) return;
      expect(r.value.placed).toEqual(first.value.placed);
      expect(contentPrint(p)).toBe(before);
      expect(allProblems(p)).toEqual([]);
      absorbed += 1;
    }), { ...FUZZ_PARAMS, numRuns: runs });
    expect(absorbed).toBeGreaterThan(runs / 2);
  }, hardTimeout(5));
});
