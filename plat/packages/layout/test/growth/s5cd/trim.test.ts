// Queue row Q189 (a), the closing note N-s3c-5 (hardening round S4; J264, J290, N-58): a provisional street whose first
// exit from the unwalled stage's boundary lies on its last segment within the kernel's `attractCm` (26 cm) of its own end
// has nothing to trim — §3.6's placement (step 2) lands the cut on the end vertex itself. The trim asked `removeEdges` for
// the stretch from that vertex to itself, the kernel answered `E_DEGENERATE` ('stretch'), and the prune counted it and
// left a final street flagged provisional (LAWFUL input, OUR OWN INTERMEDIATE: MAKE-IT-SUCCEED). The trim now makes such a
// street final as it makes a trimmed street final, with no `removeEdges` of a stretch and no refusal counted:
//   * a trimmed street, at its end: `provisional` false (the street's and its way's), `ends` 'dead', `meets` null, its
//     way's `to` the cut's junction row — kind `end`, the street its one arm — the old end's `end` row dropped;
//   * the untrimmed street: the same flags and the same shape of row, its own `end` row kept at its end (it stands where
//     a trim's cut would put one), so no junction id is taken and no other row of the batch moves.
// Pinned on hand-built arenas (the case and real trims beside it, field by field) and on the runs the closing check met:
// the site fixture at 2 000 ha / 160 ha walled, seed 5 (stage 3, `way:65`, 33 m: the exit 2 cm short of the end, at
// (41442, 61853), the cut on the end (41442, 61855)), and CITY's frame at seed 8 under `{ S5: 1 }` (stage 3, `way:82`).
import { describe, expect, it } from 'vitest';
import type { LatticePoint } from '@plat/kernel';
import type { Id, Junction, Way } from '@plat/model';
import { RIVER_BLUEPRINT } from '../../../src/index.js';
import { generated } from '../../../src/enceinte/water.js';
import { wayLines, type GrowthState } from '../../../src/growth/index.js';
import type { GrownStreet, S5cRecord } from '../../../src/growth/proposals.js';
import { pruneAndTrim } from '../../../src/growth/prune.js';
import { GROUND, lay, P, squareArena, tables } from './support.js';
import { sized, throughS5 } from './through.js';

const jn = (id: Id, arms: Id[], kind: Junction['kind']): Junction => ({ id, vertex: { role: 'junction', entity: id, ordinal: 0 }, arms, kind, lifecycle: generated(0) });
const wayOf = (id: Id, cls: Way['class'], from: Id, to: Id, provisional = false): Way => ({ id, class: cls, spine: { role: 'way', entity: id }, width: 600 as Way['width'], from: { kind: 'junction', id: from }, to: { kind: 'junction', id: to }, growthStage: 3, epoch: 0, provisional, lifecycle: generated(0) });

/**
 * The ribbon's stage 3 on a hand-built arena: the arterial `way:10` along y = 0, the provisional secondary `way:3` north
 * from (0, 0) to (0, `endY`) — its origin a T (`junction:0`), its end an `end` row (`junction:1`) — and the stage's
 * boundary a square whose north side runs at y = `edgeY`.
 */
function ribbonCase(endY: number, edgeY: number): { state: GrowthState; rec: S5cRecord; street: GrownStreet; k: ReturnType<typeof squareArena>['k'] } {
  const { k } = squareArena();
  lay(k, [P(-50_000, 0), P(50_000, 0)], 'way', 'way:10');
  lay(k, [P(0, 0), P(0, endY)], 'way', 'way:3');
  const meet = jn('junction:0', ['way:10', 'way:3'], 'T');
  const end = jn('junction:1', ['way:3'], 'end');
  const way = wayOf('way:3', 'secondary', 'junction:0', 'junction:1', true);
  const street: GrownStreet = { way, lineage: [0, 0], index: 0, proposal: 0, parent: 'way:10', points: [P(0, 0), P(0, endY)] as LatticePoint[], ends: 'boundary', meets: null, provisional: true };
  const rec: S5cRecord = {
    k: 3,
    regime: 'ribbon',
    walled: false,
    lanesInfillOnly: false,
    seeds: 1,
    proposalsMade: 1,
    streets: [street],
    junctions: [meet, end],
    work: { 'growth.proposals': 0, 'growth.candidates': 0 },
    limits: { 'growth.proposals': 0, 'growth.candidates': 0 },
    steps: { accepted: 1, rejected: {}, deflected: 0, biased: 0 },
    rungs: [],
    refused: {},
    intermediates: {},
    workCut: null,
  };
  const outline = [{ x: -20_000, y: -20_000 }, { x: 20_000, y: -20_000 }, { x: 20_000, y: edgeY }, { x: -20_000, y: edgeY }];
  const state = {
    kernel: k,
    key: GROUND,
    slice: { site: { tables, rung: 'CITY' } },
    stages: [
      { k: 1, regime: 'dense_core', walled: true, boundary: null },
      { k: 2, regime: 'walled_rings', walled: true, boundary: null },
      { k: 3, regime: 'ribbon', walled: false, boundary: { set: { outline } } },
    ],
    ways: [wayOf('way:10', 'primary', 'junction:8', 'junction:9'), way],
    junctions: [meet, end],
  } as unknown as GrowthState;
  return { state, rec, street, k };
}

/** What a street carries at its end once the trim has made it final. */
function endShape(street: GrownStreet, junctions: readonly Junction[]): unknown {
  const to = street.way.to.kind === 'junction' ? street.way.to.id : null;
  const row = junctions.find((j) => j.id === to);
  return { provisional: street.provisional, wayProvisional: street.way.provisional, ends: street.ends, meets: street.meets, toKind: street.way.to.kind, row: row === undefined ? null : { kind: row.kind, arms: row.arms, lifecycle: row.lifecycle } };
}

const FINAL = { provisional: false, wayProvisional: false, ends: 'dead', meets: null, toKind: 'junction', row: { kind: 'end', arms: ['way:3'], lifecycle: generated(0) } };

describe('the trim: a provisional street whose first exit, on the lattice, is its own end (N-s3c-5)', () => {
  it('a real trim beside it (the end 10 m beyond the boundary): cut at the exit, a new `end` row there, the old one dropped', () => {
    const { state, rec, street, k } = ribbonCase(6_000, 4_999.6);
    const pr = pruneAndTrim({ state, k: 3, record: rec });
    expect(pr.ok).toBe(true);
    if (!pr.ok) return;
    expect(pr.value.refused).toEqual({});
    expect(pr.value.trimmed.map((t) => [t.way, t.cutAt])).toEqual([['way:3', P(0, 5_000)]]);
    expect(pr.value.trimmed[0].removedCm).toBe(1_000);
    expect(street.points).toEqual([P(0, 0), P(0, 5_000)]);
    expect(street.way.to).toEqual({ kind: 'junction', id: 'junction:2' });
    expect(endShape(street, rec.junctions)).toEqual(FINAL);
    expect(rec.junctions.map((j) => j.id)).toEqual(['junction:0', 'junction:2']);
    const line = wayLines(k, ['way:3'], GROUND)[0];
    expect(line.runs.flatMap((r) => r.points).some((q) => q.y > 5_000)).toBe(false);
  });

  // The control beyond `attractCm`: the exit 30 cm short of the end is a real trim of 30 cm.
  it('a trim of 30 cm (the exit beyond attractCm of the end): cut at the exit, a new `end` row', () => {
    const { state, rec, street } = ribbonCase(5_000, 4_970);
    const pr = pruneAndTrim({ state, k: 3, record: rec });
    expect(pr.ok).toBe(true);
    if (!pr.ok) return;
    expect(pr.value.refused).toEqual({});
    expect(pr.value.trimmed.map((t) => [t.way, t.cutAt, t.removedCm])).toEqual([['way:3', P(0, 4_970), 30]]);
    expect(street.way.to).toEqual({ kind: 'junction', id: 'junction:2' });
    expect(endShape(street, rec.junctions)).toEqual(FINAL);
  });

  for (const [what, edgeY] of [
    ['the exit 0.4 cm short of the end (on the lattice, the end itself)', 4_999.6],
    ["the exit 2 cm short of the end (way:65's case: within attractCm, the cut lands on the end vertex)", 4_998],
    ['the exit 26 cm short of the end (attractCm, inclusive)', 4_974],
  ] as const) {
    it(`${what}: no stretch removed, no refusal, the street final with its own \`end\` row`, () => {
      const { state, rec, street, k } = ribbonCase(5_000, edgeY);
      const before = JSON.stringify(wayLines(k, ['way:3', 'way:10'], GROUND));
      const pr = pruneAndTrim({ state, k: 3, record: rec });
      expect(pr.ok).toBe(true);
      if (!pr.ok) return;
      // The fix: no refusal counted (the reverted trim counts `E_DEGENERATE` 1), nothing trimmed, nothing pruned (50 m).
      // Soft, so a reverted trim reports both of its faults — the counted refusal and the street left provisional.
      expect.soft(pr.value.refused).toEqual({});
      expect(pr.value.trimmed).toEqual([]);
      expect(pr.value.pruned).toEqual([]);
      // Final as a trimmed street is — the same flags, a `to` on an `end` row whose one arm is the street — its row its own.
      expect(endShape(street, rec.junctions)).toEqual(FINAL);
      expect(street.way.to).toEqual({ kind: 'junction', id: 'junction:1' });
      expect(street.points).toEqual([P(0, 0), P(0, 5_000)]);
      expect(rec.junctions.map((j) => j.id)).toEqual(['junction:0', 'junction:1']);
      expect(state.junctions.map((j) => j.id)).toEqual(['junction:0', 'junction:1']);
      // Nothing in the arena moved, and the end vertex carries no row of a junction the record does not hold.
      expect(JSON.stringify(wayLines(k, ['way:3', 'way:10'], GROUND))).toBe(before);
      const taken = k.resolve({ role: 'junction', entity: 'junction:2', ordinal: 0 }, GROUND);
      expect(taken.view === 'vertices' ? taken.vertices.length : -1).toBe(0);
    });
  }

  // Round S5 (the closing check's B-1, mutant M8, N-s4c-1): the "nothing to trim" branch takes NO junction id, so no
  // later row of the batch is renumbered (C-0496 (1): "`jN` not advanced"). The hand cases above hold one street, so a
  // burnt id moves nothing they read; here a second provisional street, laid after `way:3`, is really trimmed in the
  // same batch, and its new `end` row must take the id it would take if `way:3` were not there to be made final —
  // `junction:4`, the next after the arena's rows 0 – 3 (the pre-round trim, which refused `way:3`, gave it the same).
  it('a real trim after it in the same batch takes the next junction id: the untrimmed street burns none (B-1, M8)', () => {
    const { state, rec, street, k } = ribbonCase(5_000, 4_998);
    lay(k, [P(10_000, 0), P(10_000, 6_000)], 'way', 'way:4');
    const meet4 = jn('junction:2', ['way:10', 'way:4'], 'T');
    const end4 = jn('junction:3', ['way:4'], 'end');
    const way4 = wayOf('way:4', 'secondary', 'junction:2', 'junction:3', true);
    const second: GrownStreet = { way: way4, lineage: [0, 1], index: 1, proposal: 1, parent: 'way:10', points: [P(10_000, 0), P(10_000, 6_000)] as LatticePoint[], ends: 'boundary', meets: null, provisional: true };
    rec.streets.push(second);
    rec.junctions.push(meet4, end4);
    state.ways.push(way4);
    state.junctions.push(meet4, end4);
    const pr = pruneAndTrim({ state, k: 3, record: rec });
    expect(pr.ok).toBe(true);
    if (!pr.ok) return;
    expect(pr.value.refused).toEqual({});
    expect(pr.value.trimmed.map((t) => [t.way, t.cutAt])).toEqual([['way:4', P(10_000, 4_998)]]);
    // `way:3` made final on its own `end` row; `way:4` cut onto `junction:4` — not `junction:5` (an id burnt by the branch).
    expect(street.way.to).toEqual({ kind: 'junction', id: 'junction:1' });
    expect(endShape(street, rec.junctions)).toEqual(FINAL);
    expect(second.way.to).toEqual({ kind: 'junction', id: 'junction:4' });
    expect(second.provisional).toBe(false);
    expect(rec.junctions.map((j) => j.id)).toEqual(['junction:0', 'junction:1', 'junction:2', 'junction:4']);
    expect(state.junctions.map((j) => j.id)).toEqual(['junction:0', 'junction:1', 'junction:2', 'junction:4']);
  });
});

describe('the trim on the runs the closing check met (N-s3c-5; LAWFUL input, OUR OWN INTERMEDIATE, now made to succeed)', () => {
  const runs: { name: string; areaHa: number; walledHa: number; seed: number; rerolls?: Readonly<Record<string, number>>; way: Id; end: LatticePoint; trims: number; prunes: number }[] = [
    { name: 'the site fixture at 2 000 ha / 160 ha walled, seed 5', areaHa: 2_000, walledHa: 160, seed: 5, way: 'way:65', end: P(41_442, 61_855), trims: 13, prunes: 11 },
    { name: 'the site fixture at CITY (2 500 ha / 220 ha walled), seed 8 under { S5: 1 }', areaHa: 2_500, walledHa: 220, seed: 8, rerolls: { S5: 1 }, way: 'way:82', end: P(-49_945, -78_878), trims: 9, prunes: 9 },
  ];
  for (const c of runs) {
    it(`${c.name}: stage 3's ${c.way} is final, its prune record holds no refusal, the batch's other trims and prunes stand`, { timeout: 600_000 }, () => {
      const t = throughS5(sized(RIVER_BLUEPRINT, c.areaHa, c.walledHa), c.seed, c.rerolls === undefined ? {} : { rerolls: c.rerolls });
      expect(t.model.refusals.size).toBe(0);
      const s5 = t.s5;
      expect(s5).toBeDefined();
      if (s5 === undefined) return;
      // No prune of any stage counts a refusal (stage 3 counted `E_DEGENERATE` 1 before the fix). Soft, so a reverted trim
      // reports both of its faults — the counted refusal and the street left provisional.
      expect.soft(s5.prune.map((p) => [p.k, p.refused])).toEqual([
        [1, {}],
        [2, {}],
        [3, {}],
      ]);
      const pr3 = s5.prune[2];
      expect([pr3.trimmed.length, pr3.pruned.length]).toEqual([c.trims, c.prunes]);
      expect(pr3.trimmed.some((x) => x.way === c.way)).toBe(false);
      const g3 = s5.growth[2];
      const st = g3.streets.find((x) => x.way.id === c.way);
      expect(st).toBeDefined();
      if (st === undefined) return;
      // The street ends where it stood, on the boundary, and is final: no street of any stage is left provisional.
      expect(st.points[st.points.length - 1]).toEqual(c.end);
      const to = st.way.to.kind === 'junction' ? st.way.to.id : null;
      const row = g3.junctions.find((j) => j.id === to);
      expect({ provisional: st.provisional, wayProvisional: st.way.provisional, ends: st.ends, meets: st.meets, row: row === undefined ? null : [row.kind, row.arms] }).toEqual({
        provisional: false,
        wayProvisional: false,
        ends: 'dead',
        meets: null,
        row: ['end', [c.way]],
      });
      expect(s5.growth.flatMap((g) => g.streets.filter((x) => x.provisional).map((x) => x.way.id))).toEqual([]);
    });
  }
});
