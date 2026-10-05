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
// property, never folded into its precision count, and the count must be 0 (N-40, C-0202); in the other two families
// it fails the property as an unknown refusal.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { isVertexLive, type Plat } from '../../../src/arena/index.js';
import type { InsertTx } from '../../../src/insert/classes.js';
import type { Warning } from '../../../src/num/index.js';
import type { Level } from '../../../src/types/index.js';
import { genChain } from './gen.js';
import { allProblems, contentPrint, framed, generator, ins, intIn, TIMEOUT, tx } from './support.js';

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
}

/**
 * Inserts one chain and judges it (the bar): no throw; a refusal is a known code, a mandatory chain's never a precision
 * code, and writes nothing (content and the transaction's warnings unchanged); a commit names a live vertex of level ≤
 * the batch's per input point; the arena valid after either (`validate` false skips the whole-arena oracles — the
 * mandatory-only property's base chains, judged once at its end).
 */
function insertJudged(p: Plat, c: Case, entity: string, validate = true, countInvariant = false): Outcome {
  const t: InsertTx = tx(p, c.level);
  t.warnings.push({ code: 'W_PLACED', count: 1 }); // a warning an earlier op of the batch reported: a refusal keeps it
  const warningsBefore = copy(t.warnings);
  const before = validate ? contentPrint(p) : '';
  const r = ins(t, c.points, [{ role: 'way', entity }], c.cls, { closed: c.closed, ...(c.pinned === undefined ? {} : { pinned: c.pinned }) });
  if (!r.ok) {
    if (!(countInvariant && r.code === 'E_INVARIANT')) expect(CODES.has(r.code), `an unknown refusal ${r.code} (${r.detail})`).toBe(true);
    if (c.cls === 'mandatory') expect(PRECISION.has(r.code), `a mandatory chain refused for precision: ${r.code} ${r.detail}`).toBe(false);
    expect(t.warnings).toEqual(warningsBefore);
    if (validate) expect(contentPrint(p)).toBe(before);
  } else {
    expect(r.value.placed).toHaveLength(c.points.length);
    for (const v of r.value.placed) {
      expect(isVertexLive(p, v)).toBe(true);
      expect(p.vertices.level[v]).toBeLessThanOrEqual(c.level);
    }
  }
  if (validate) expect(allProblems(p)).toEqual([]);
  return r.ok ? { ok: true } : { ok: false, code: r.code };
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

/** The random family's property: earlier random chains (coarse first), then one more, each judged; `seen` counts the last. */
const randomFamily = (seen: (o: Outcome) => void): fc.IPropertyWithHooks<[Case[], Case]> =>
  fc.property(fc.array(chainCase(coarseLevel), { maxLength: 3 }), chainCase(anyLevel), (base, c) => {
    const p = framed(SIDE);
    // Earlier chains coarse first, as a stage order builds them (a finer one first would make later coarser chains
    // meet kept content — E_KEPT, judged all the same).
    [...base].sort((a, b) => a.level - b.level).forEach((b, i) => insertJudged(p, b, `way:b${i}`));
    seen(insertJudged(p, c, 'way:x'));
  });

describe('B-FUZZ: insertChain (§13.1, the item\'s exit bar here)', () => {
  it('random chains into arenas holding up to three earlier random chains: 0 crashes, 0 invalid outputs, refusals write nothing', () => {
    let commits = 0;
    let refusals = 0;
    fc.assert(
      randomFamily((o) => {
        if (o.ok) commits += 1;
        else refusals += 1;
      }),
    );
    console.log(`B-FUZZ insertChain random: ${commits} committed, ${refusals} refused`);
    expect(commits).toBeGreaterThan(refusals);
  }, hardTimeout(60));

  // N-42 (b), the named regression (C-0207): this family at PLAT_FUZZ_SEED=−1863295922 failed its 8 346th case (M0-a-14
  // close-r1 note 23) — one L0 mandatory random walk refused E_INVARIANT "no route from (313, 244) to (341, 251) keeps
  // clearance": the route step 3 gives the last segment, through (332, 226) and (361, 234), passes 24.3 cm from its own
  // free end. That case, replayed (fast-check's path 8345 at that seed), now commits valid, the end re-landed.
  it('the random family\'s seed −1863295922, its 8 346th case replayed (N-42 (b)): 0 crashes, 0 invalid outputs', () => {
    const seen: Outcome[] = [];
    fc.assert(randomFamily((o) => seen.push(o)), { seed: -1863295922, path: '8345', numRuns: 1 });
    expect(seen).toEqual([{ ok: true }]);
  });

  // The same class, found by fix round S3's own scan of 70 000 cases on the S1/S2 router (C-0207): at seed 13 the
  // random family's 7 265th case — an L1 chain, then an L4 mandatory random walk of 331 points — refused the walk
  // E_INVARIANT; its free end is now re-landed (W_PLACED at (2953, 109)).
  it('the random family\'s seed 13, its 7 265th case replayed (N-42 (b)): 0 crashes, 0 invalid outputs', () => {
    const seen: Outcome[] = [];
    fc.assert(randomFamily((o) => seen.push(o)), { seed: 13, path: '7264', numRuns: 1 });
    expect(seen).toEqual([{ ok: true }]);
  });

  it('the constructive classes (gen.ts) in multi-level sequences of 1 – 8 chains: 0 crashes, 0 invalid outputs, refusals write nothing', () => {
    const kinds = new Map<string, number>();
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
          insertJudged(p, { level: lv, cls: g.cls, closed: g.closed, points: g.points, ...(g.pinned === undefined ? {} : { pinned: g.pinned }) }, `way:${s}`);
        }
      }),
    );
    console.log(`B-FUZZ insertChain constructive: ${[...kinds].sort().map(([k, n]) => `${k} ${n}`).join(', ')}`);
    for (const k of ['random', 'collinear', 'coincident', 'shallow', 'graze', 'ring', 'zigzag', 'endpoint', 'vee']) expect(kinds.get(k) ?? 0).toBeGreaterThan(0);
  }, hardTimeout(20));
});

describe('§13.1: mandatory chains never rejected for precision over 10⁶ random chains (PLAT_FUZZ_RUNS: 10⁴ PR, 10⁶ nightly)', () => {
  it('a mandatory random chain into an arena holding up to two earlier chains: refused only for a non-precision code, never a throw; the arena valid', () => {
    const codes = new Map<string, number>();
    let invariant = 0;
    fc.assert(
      fc.property(fc.array(chainCase(coarseLevel, 0), { maxLength: 2 }), chainCase(anyLevel, 0), (base, c0) => {
        const c: Case = { ...c0, cls: 'mandatory' };
        const p = framed(SIDE);
        [...base].sort((a, b) => a.level - b.level).forEach((b, i) => {
          if (insertJudged(p, b, `way:b${i}`, false, true).code === 'E_INVARIANT') invariant += 1; // a base chain's too
        });
        const o = insertJudged(p, c, 'way:m', false, true);
        const k = o.ok ? 'ok' : (o.code as string);
        if (k === 'E_INVARIANT') invariant += 1;
        else codes.set(k, (codes.get(k) ?? 0) + 1);
        expect(allProblems(p)).toEqual([]);
      }),
    );
    console.log(`mandatory chains: ${[...codes].sort().map(([k, n]) => `${k} ${n}`).join(', ')}`);
    console.log(`chains refused E_INVARIANT (a router gap, N-37; its own line, N-40): ${invariant}`);
    for (const k of PRECISION) expect(codes.get(k) ?? 0).toBe(0);
    expect(invariant, 'chains refused E_INVARIANT (a router gap)').toBe(0);
  }, hardTimeout(15));
});
