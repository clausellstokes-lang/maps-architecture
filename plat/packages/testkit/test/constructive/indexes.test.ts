// index/slot-reuse-stage's case data (M0-k-02; N-49's second defect, fix round S1): the case promises "a slot freed
// and reused inside a stage — the query returns the new item", and its last step queries boxOld expecting 'none'.
// That query is only a test of the freed slot when boxOld cannot meet `fresh` by construction: boxOld spans local
// x ∈ [−50, L + 50] and `fresh` starts at x = gap, so the case draws gap ≥ L + 100, leaving ≥ 50 cm of clear lattice
// between them along one axis after placement. Seed 2 drew gap = 7 624 < L + 50 = 7 752 before the fix, putting
// fresh's first vertex (−2 837 055, −431 769) inside boxOld ('query-returns-new-item … met 1 edges, 1 vertices').
import { describe, expect, it } from 'vitest';
import fc from 'fast-check';
import { casesAt, constructiveKernelJudge, type ConstructiveCase, type ConstructiveInput } from '@plat/testkit';
import { DRAWS } from './support.js';

const CASE = casesAt('M0').find((c) => c.id === 'index/slot-reuse-stage');

function draw(seed: number): ConstructiveInput {
  if (CASE === undefined) throw new Error('index/slot-reuse-stage is not in casesAt(M0)');
  const g = CASE.generate(seed);
  if (g.kind !== 'input') throw new Error(`index/slot-reuse-stage seed ${String(seed)} drew no input`);
  return g;
}

/**
 * The clearance between the closed box `boxOld` and every vertex of `fresh` along the axis that separates them (the
 * largest of the four one-sided gaps; ≤ 0 when no axis separates them, so a segment of `fresh` may meet the box). A
 * positive clearance along an axis means the whole chain — vertices and the segments between them — lies outside.
 */
function clearance(g: ConstructiveInput): number {
  const box = g.rings.boxOld;
  const fresh = g.chains.fresh;
  const bx0 = Math.min(...box.map((p) => p.x));
  const bx1 = Math.max(...box.map((p) => p.x));
  const by0 = Math.min(...box.map((p) => p.y));
  const by1 = Math.max(...box.map((p) => p.y));
  const fx0 = Math.min(...fresh.map((p) => p.x));
  const fx1 = Math.max(...fresh.map((p) => p.x));
  const fy0 = Math.min(...fresh.map((p) => p.y));
  const fy1 = Math.max(...fresh.map((p) => p.y));
  return Math.max(fx0 - bx1, bx0 - fx1, fy0 - by1, by0 - fy1);
}

/** Whether p lies in the closed axis-aligned box of `ring`. */
function inBox(ring: readonly { x: number; y: number }[], p: { x: number; y: number }): boolean {
  const xs = ring.map((q) => q.x);
  const ys = ring.map((q) => q.y);
  return p.x >= Math.min(...xs) && p.x <= Math.max(...xs) && p.y >= Math.min(...ys) && p.y <= Math.max(...ys);
}

describe('index/slot-reuse-stage: boxOld never meets the fresh chain (N-49, gap ≥ L + 100)', () => {
  it('pins seed 2, the draw that put fresh inside boxOld', () => {
    const g = draw(2);
    expect(inBox(g.rings.boxOld, { x: -2_837_055, y: -431_769 })).toBe(false);
    for (const p of g.chains.fresh) expect(inBox(g.rings.boxOld, p), `fresh vertex (${String(p.x)}, ${String(p.y)})`).toBe(false);
    expect(clearance(g)).toBeGreaterThanOrEqual(50);
    // The fixed draw, pinned (L = 7 702, gap = 89 544 along +x after placement): a change to the case's draws shows here.
    expect(g.chains.old).toEqual([
      { x: 4_855_801, y: -431_769 },
      { x: 4_863_503, y: -431_769 },
    ]);
    expect(g.chains.fresh).toEqual([
      { x: 4_945_345, y: -431_769 },
      { x: 4_953_047, y: -431_628 },
    ]);
    // boxFresh still holds the fresh chain whole (the case's other query).
    for (const p of g.chains.fresh) expect(inBox(g.rings.boxFresh, p)).toBe(true);
  });

  it(`keeps ≥ 50 cm between boxOld and fresh on seeds 0 … ${String(DRAWS - 1)}`, () => {
    for (let seed = 0; seed < DRAWS; seed += 1) {
      const g = draw(seed);
      const c = clearance(g);
      if (c < 50) expect.fail(`seed ${String(seed)}: boxOld and fresh are ${String(c)} cm apart (< 50)`);
      for (const p of g.chains.fresh) if (!inBox(g.rings.boxFresh, p)) expect.fail(`seed ${String(seed)}: fresh leaves boxFresh`);
    }
  });

  it('keeps ≥ 50 cm between boxOld and fresh on any u32 seed (property)', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 0xffffffff }), (seed) => clearance(draw(seed)) >= 50),
      { numRuns: 1000 },
    );
  });
});

// The slot-reuse cases reuse a slot (M0-k-02's N-12, the hardening round S2): mutant K10 — the removal moved after the
// fresh insertion — kept every query green while no slot was reused (P1 on the mutant: reuse 0 / 200, judge 200 / 200).
// Both cases now hold `slot-reused`, which M0-k-04's judge checks on the kernel: after the insertion that follows the
// removal, the vertex and pair tops equal those after the removal and both free lists are empty.
const SLOT_CASES = ['index/slot-reuse-stage', 'index/slot-reuse-districts'] as const;
const KERNEL_DRAWS = 40;

function slotCase(id: string): ConstructiveCase {
  const c = casesAt('M0').find((x) => x.id === id);
  if (c === undefined) throw new Error(`${id} is not in casesAt(M0)`);
  return c;
}

function input(c: ConstructiveCase, seed: number): ConstructiveInput {
  const g = c.generate(seed);
  if (g.kind !== 'input') throw new Error(`${c.id} seed ${String(seed)} drew no input`);
  return g;
}

/** The draw with its steps reordered by `order` (indices into the drawn steps). */
function reordered(g: ConstructiveInput, order: readonly number[]): ConstructiveInput {
  return { ...g, steps: order.map((i) => g.steps[i]) };
}

describe.each(SLOT_CASES)('%s reuses a slot (N-12)', (id) => {
  const c = slotCase(id);

  it('holds slot-reused, and its removal runs before the insertion that refills the freed slots', () => {
    expect(c.expect.holds).toContain('slot-reused');
    for (let seed = 0; seed < DRAWS; seed += 1) {
      const ops = input(c, seed).steps.map((s) => s.op);
      const r = ops.indexOf('removeEdges');
      expect(r, `seed ${String(seed)}`).toBeGreaterThan(0);
      expect(ops.slice(r + 1), `seed ${String(seed)}`).toContain('insertChain');
    }
  });

  it(`is green on the kernel, slot-reused included, on seeds 0 … ${String(KERNEL_DRAWS - 1)}`, () => {
    for (let seed = 0; seed < KERNEL_DRAWS; seed += 1) {
      const v = constructiveKernelJudge(c, input(c, seed));
      if (!v.ok) expect.fail(`seed ${String(seed)}: ${v.reason}`);
    }
  }, 120_000);

  it('fails slot-reused when the removal runs after the fresh insertion (K10), the queries alone staying green', () => {
    for (const seed of [0, 1, 2]) {
      const g = input(c, seed);
      const r = g.steps.findIndex((s) => s.op === 'removeEdges');
      const k = g.steps.findIndex((s, i) => i > r && s.op === 'insertChain');
      const order = g.steps.map((_, i) => i).filter((i) => i !== r);
      order.splice(order.indexOf(k) + 1, 0, r);
      const v = constructiveKernelJudge(c, reordered(g, order));
      expect(v.ok, `seed ${String(seed)}`).toBe(false);
      if (!v.ok) expect(v.reason).toBe(`slot-reused: no insertion follows the removal (step ${String(k)}): no slot is reused`);
    }
  }, 120_000);
});

describe('slot-reused reads both tops and both free lists (N-12, negative controls on index/slot-reuse-stage)', () => {
  const c = slotCase('index/slot-reuse-stage');
  /** A lattice point `off` cm off the middle of a two-point chain, across its dominant axis. */
  const kink = <T extends { x: number; y: number }>(ch: readonly T[], off: number): T => {
    const [a, b] = ch;
    const m = { ...a, x: Math.round((a.x + b.x) / 2), y: Math.round((a.y + b.y) / 2) };
    return Math.abs(b.x - a.x) >= Math.abs(b.y - a.y) ? { ...m, y: m.y + off } : { ...m, x: m.x + off };
  };

  it('a fresh chain of three vertices takes more than the removal freed: the tops grow', () => {
    const g = input(c, 3);
    const fresh = g.chains.fresh;
    const v = constructiveKernelJudge(c, { ...g, chains: { ...g.chains, fresh: [fresh[0], kink(fresh, 40), fresh[1]] } });
    expect(v.ok).toBe(false);
    if (!v.ok) expect(v.reason).toMatch(/^slot-reused: the insertion \(step 3\) allocated new slots: tops vertex \d+ → \d+, pair \d+ → \d+$/);
  });

  it('an old chain of three vertices frees more than the fresh insertion takes: a freed slot stays on its free list', () => {
    const g = input(c, 3);
    const old = g.chains.old;
    const v = constructiveKernelJudge(c, { ...g, chains: { ...g.chains, old: [old[0], kink(old, 40), old[1]] } });
    expect(v.ok).toBe(false);
    if (!v.ok) expect(v.reason).toMatch(/^slot-reused: a freed slot is still on its free list after the insertion \(vertex head -?\d+, pair head -?\d+\)$/);
  });
});

describe('slot-reused reads the pair table apart from the vertex table (N-12, negative controls on index/slot-reuse-districts)', () => {
  const c = slotCase('index/slot-reuse-districts');
  /** The chain with its second end pulled 100 cm back along it, off the district boundary into the interior. */
  const pulled = <T extends { x: number; y: number }>(ch: readonly T[]): T[] => {
    const [a, b] = ch;
    return [a, { ...b, x: b.x + 100 * Math.sign(a.x - b.x), y: b.y + 100 * Math.sign(a.y - b.y) }];
  };

  it('a removal that frees one pair fewer than the fresh insertion needs: the vertex top kept, the pair top grown', () => {
    // inA ending inside district A frees 2 vertices and 2 pairs (no shared-edge split to re-join); inB as drawn takes 2
    // vertices and 3 pairs (its edge and the two boundary edges it splits).
    const g = input(c, 3);
    const v = constructiveKernelJudge(c, { ...g, chains: { ...g.chains, inA: pulled(g.chains.inA) } });
    expect(v.ok).toBe(false);
    const m = v.ok ? null : /^slot-reused: the insertion \(step 5\) allocated new slots: tops vertex (\d+) → (\d+), pair (\d+) → (\d+)$/.exec(v.reason);
    expect(m, v.ok ? 'green' : v.reason).not.toBeNull();
    if (m !== null) {
      expect(m[2]).toBe(m[1]);
      expect(Number(m[4])).toBeGreaterThan(Number(m[3]));
    }
  });

  it('a fresh insertion that needs one pair fewer than the removal freed: the vertex free list drained, a pair left on its list', () => {
    // inB ending inside district B takes 2 vertices and 2 pairs; inA as drawn freed 2 vertices and 3 pairs.
    const g = input(c, 3);
    const v = constructiveKernelJudge(c, { ...g, chains: { ...g.chains, inB: pulled(g.chains.inB) } });
    expect(v.ok).toBe(false);
    if (!v.ok) expect(v.reason).toMatch(/^slot-reused: a freed slot is still on its free list after the insertion \(vertex head -1, pair head \d+\)$/);
  });
});
