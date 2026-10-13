// The cells re-pinned to the committed stages (M0-x-06 fix round 2; checks/M0-x-06.md B4; N-55 (6), N-56 (6), Q14, Q22,
// Q37, J264, J267; C-NEWROW): each pin replayed on a named seed of its fixture's 1 000-seed family, asserting what the
// committed stages now do — so a pin follows the stage, and fails the day the stage changes:
//   * every refused-safe cell on one seed: its code, the cause its known-issue line names, and the arena bit-identical to
//     the stage's start (the runner's rollback, M0-x-02 s1); C-0278 (1)'s six residue cells with the planted batch
//     committed first and rolled back whole (Q14's rolled-back pins);
//   * the outcomes the brief names: S6 self-touching 2191303060 absorbed (M0-e-04 s2), river × frame 1595424233
//     committing on its first state (M0-e-03 s1), Q22's coincident seeds committing (M0-c-02 s3);
//   * J264's census on the named lawful-input refusals: Q37's three seeds (the unplanted state's strips refused, the
//     state replaced and the refusal carried); S8's seam-portals finding (Q41, N-57 (1)) retired — M0-b-03 s4 (C-0329)
//     fixed it, so its seed is pinned to the committed outcome (laddered) and no cell names a finding.
import { describe, expect, it } from 'vitest';
import { EDGE_FIXTURES, judgeEdgeOutcome, type EdgeOutcome } from '../../src/edge/index.js';
import { ep01Findings, ep01Pin, type Ep01Stage } from '../../src/edge/ep01.js';
import type { DegenerateKind } from '../../src/edge/kinds.js';

function replay(id: string, seed: number): EdgeOutcome {
  const f = EDGE_FIXTURES.find((x) => x.id === id);
  if (f === undefined) throw new Error(`no fixture ${id}`);
  const o = f.run(seed);
  expect(judgeEdgeOutcome(f, seed, o), `${id} at ${String(seed)}`).toBeNull();
  return o;
}

/** One seed per refused-safe cell (the first seed of its family where the cell refuses on every seed), with the words
 * the stage's refusal carries. */
const REFUSED: readonly [string, number, string, string][] = [
  ['EP-01/S1/zero-length', 218369345, 'E_DEGENERATE', 'empty'],
  ['EP-01/S1/zero-area', 492415066, 'E_INVARIANT', 'references-resolve'],
  ['EP-01/S1/self-touching', 2651453823, 'E_INVARIANT', "the river's ring was refused on the kernel's polygons"],
  ['EP-01/S1/collinear', 3531121151, 'E_INVARIANT', 'references-resolve'],
  ['EP-01/S3/zero-length', 2376620364, 'E_DEGENERATE', 'empty'],
  ['EP-01/S3/zero-area', 642402145, 'E_INVARIANT', 'is not on the committed trace at its point'],
  ['EP-01/S3/self-touching', 2065051154, 'E_INVARIANT', 'branches: a linear role forms simple chains or rings'],
  ['EP-01/S3/collinear', 2401321442, 'E_INVARIANT', 'is not on the committed trace at its point'],
  ['EP-01/S5a/zero-length', 1924675773, 'E_DEGENERATE', 'empty'],
  ['EP-01/S5a/zero-area', 2829448911, 'E_INVARIANT', 'is not on the committed trace at its point'],
  ['EP-01/S5a/self-touching', 3380957245, 'E_INVARIANT', 'branches: a linear role forms simple chains or rings'],
  ['EP-01/S5a/collinear', 716606205, 'E_INVARIANT', 'is not on the committed trace at its point'],
  ['EP-01/S5a/coincident', 1658509524, 'E_INVARIANT', '(wall, enceinte:2) branches'],
  ['EP-01/S5b/zero-length', 3504584308, 'E_DEGENERATE', "stage 2's main roads were refused"],
  ['EP-01/S5b/self-touching', 1745954339, 'E_INVARIANT', "stage 2's main roads were refused"],
  ['EP-01/S6/zero-area', 3899199413, 'E_INVARIANT', "settlementPerimeter: the overlay's outer ring is not the boundary's offset"],
  ['EP-01/S6/self-touching', 4101706098, 'E_INVARIANT', "settlementPerimeter: the overlay's outer ring is not the boundary's offset"],
  ['EP-01/S6/coincident', 2708765650, 'E_INVARIANT', 'settlementPerimeter: the union'],
];

describe('every refused-safe cell, re-pinned on a named seed of the committed tree (B4, Q14)', () => {
  it('names one seed for every pinned cell, and only pinned cells', () => {
    const pinned: string[] = [];
    for (const f of EDGE_FIXTURES) {
      const [ep, stage, kind] = f.id.split('/');
      if (ep === 'EP-01' && ep01Pin(stage as Ep01Stage, kind as DegenerateKind) !== undefined) pinned.push(f.id);
    }
    expect(REFUSED.map((r) => r[0]).sort()).toEqual(pinned.sort());
  });
  it("a rare pin names every seed its share counts at 1 000 (the four rare cells, and only they); a share's count is the run's", () => {
    const rare: string[] = [];
    for (const f of EDGE_FIXTURES) {
      const [ep, stage, kind] = f.id.split('/');
      const pin = ep === 'EP-01' ? ep01Pin(stage as Ep01Stage, kind as DegenerateKind) : undefined;
      if (pin === undefined) continue;
      const m = /^([0-9][0-9 ]*) of 1 000$/.exec(pin.share);
      expect(m, `${f.id}: share ${pin.share}`).not.toBeNull();
      if (pin.seeds === undefined) continue;
      rare.push(f.id);
      expect(pin.seeds.length, f.id).toBe(Number((m?.[1] ?? '').replace(/ /g, '')));
      expect(new Set(pin.seeds).size, f.id).toBe(pin.seeds.length);
    }
    expect(rare.sort()).toEqual(['EP-01/S1/self-touching', 'EP-01/S5a/coincident', 'EP-01/S6/coincident', 'EP-01/S6/self-touching']);
  });
  for (const [id, seed, code, words] of REFUSED) {
    it(`${id} at seed ${String(seed)}: refused-safe ${code}, the arena bit-identical to the stage's start`, { timeout: 300_000 }, () => {
      const o = replay(id, seed);
      const [, stage, kind] = id.split('/') as [string, Ep01Stage, DegenerateKind];
      const pin = ep01Pin(stage, kind);
      expect(o.handling).toBe('refused-safe');
      expect(o.rung).toBe(code);
      expect(pin?.codes).toContain(code);
      expect(o.facts.arenaRestored).toBe(true);
      expect(o.facts.stateSeed).toBe(seed);
      expect(String(o.facts.refusal)).toContain(words);
      expect(o.lawful).toEqual([]);
      // C-0278 (1)'s six: the planted batch committed before the stage refused, and the runner took it back
      if (pin?.rolledBack === true) expect(o.facts.batchCommitted).toBe(true);
      if (pin?.seeds !== undefined) expect(pin.seeds).toContain(seed);
    });
  }
});

describe('the outcomes the round names, re-pinned to the committed stages (N-56 (6), J267, Q22)', () => {
  it('EP-01/S6/self-touching at 2191303060 is absorbed (M0-e-04 s2: the collinear ring N-56 (2) read as a refusal)', { timeout: 300_000 }, () => {
    const o = replay('EP-01/S6/self-touching', 2191303060);
    expect(o.handling).toBe('absorbed');
    expect(o.facts.tries).toBe(1);
    expect(o.lawful).toEqual([]);
    expect(ep01Pin('S6', 'self-touching')?.seeds).not.toContain(2191303060);
  });
  it('cell/river×frame at 1595424233 commits on its first state: one edge both roles (M0-e-03 s1)', { timeout: 300_000 }, () => {
    const o = replay('cell/river×frame', 1595424233);
    expect(o.handling).toBe('defined');
    expect(o.facts.tries).toBe(1);
    expect(o.facts.stateSeed).toBe(1595424233);
    expect(o.facts.sharedEdges).toBeGreaterThan(0);
    expect(o.lawful).toEqual([]);
  });
  it("EP-01/S5a/coincident at Q22's seeds 3443032966 and 2300104848 is absorbed on its first state (M0-c-02 s3)", { timeout: 300_000 }, () => {
    for (const seed of [3443032966, 2300104848]) {
      const o = replay('EP-01/S5a/coincident', seed);
      expect(o.handling).toBe('absorbed');
      expect(o.facts.tries).toBe(1);
      expect(o.lawful).toEqual([]);
    }
  });
});

describe("J264's census on the named lawful-input refusals (C-NEWROW (2), (3))", () => {
  it("Q37's three seeds: the unplanted state's strips are refused (S5, 'closed no strip face'), counted, the state replaced", { timeout: 300_000 }, () => {
    for (const seed of [957349493, 2306189499, 4102748823]) {
      const o = replay('EP-01/S5a/coincident', seed);
      expect(o.handling).toBe('absorbed');
      expect(o.facts.tries).toBe(2);
      expect(o.lawful).toHaveLength(1);
      expect(o.lawful?.[0]).toMatchObject({ stateSeed: seed, stage: 'S5', code: 'E_INVARIANT', where: 'control' });
      expect(o.lawful?.[0]?.detail).toContain("closed no strip face");
    }
  });
  it("EP-01/S8/zero-length at 2521534151 ladders: S8's seam-portals refusal of the lawful arterial is gone (Q41 fixed by M0-b-03 s4, C-0329)", { timeout: 300_000 }, () => {
    const o = replay('EP-01/S8/zero-length', 2521534151);
    expect(o.handling).toBe('laddered');
    expect(o.rung).toBe('S8: a:none:nextRung, a:refused:width, deep:refused:portal-gap, deep:refused:width');
    expect(o.problems).toEqual([]);
    expect(o.lawful).toEqual([]);
    // the finding is retired, not loosened: no seed of the cell may refuse lawful input now
    expect(ep01Findings('S8', 'zero-length')).toBeUndefined();
    expect(EDGE_FIXTURES.find((f) => f.id === 'EP-01/S8/zero-length')?.expect.allowed).not.toContain('refused-lawful');
  });
});
