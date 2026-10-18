// The derivation unit (§6.3: "the cell for S8 blocks and lanes"; §3.3 *Two op forms*: the callback's issue order is a
// function of the stage's inputs, its streams and canonically sorted query results — never of slot numbers; §13.2's
// issue-order clause; C-0122): one district's S8 transaction re-run reproduces its lanes bit for bit through M0-d-08's
// harness (fresh, again, the slots reversed, the slots randomly renumbered), every lane and block is keyed by its cell,
// and a district's result does not depend on whether another district runs beside it.
import { seedKey, STAGES, type Plat } from '@plat/kernel';
import { districtBatch, districtCells, runS8, type DistrictContext } from '@plat/layout';
import { addressOf, lineageHash, type Id } from '@plat/model';
import { describe, expect, it } from 'vitest';
import { runTwiceCompare, type DeterminismSequence } from '../../../src/determinism/index.js';
import { GROUND, twoCase } from './support.js';

function ctxFor(c: ReturnType<typeof twoCase>, i: number, widths: Map<Id, number>): DistrictContext {
  const d = c.districts[i];
  return {
    key: GROUND,
    lineage: d.lineage,
    reroll: 0,
    seedKey: seedKey(c.seed),
    epoch: 0,
    prosperity: d.prosperity,
    density: d.density,
    rung: 'CITY',
    bands: d.bands!,
    walled: false,
    ways: new Map(c.ways.map((w) => [w.id, w])),
    widths,
    live: [],
  };
}

describe('one district’s S8 transaction through the issue-order harness', () => {
  it('reproduces its lanes bit for bit: fresh, again, slots reversed, slots renumbered', { timeout: 300_000 }, () => {
    const c = twoCase();
    let widths = new Map<Id, number>();
    const seq: DeterminismSequence = {
      name: 'S8 district A',
      arena: (): Plat => {
        const made = c.build();
        widths = made.widths;
        return made.plat;
      },
      batches: [
        {
          name: 'S8 district A',
          build: (p: Plat) => {
            const b = districtBatch(p, c.districts[0].district, c.seams, ctxFor(c, 0, widths));
            return { spec: b.spec, fn: b.fn };
          },
        },
      ],
    };
    const report = runTwiceCompare(seq);
    expect(report.divergence).toBeNull();
    expect(report.identical).toBe(true);
    expect(report.outcomes).toEqual(['commit']);
    expect(report.runs).toEqual(['fresh', 'again', 'reversed', 'renumbered']);
  });
});

describe('blocks and lanes keyed by the cell (§6.3)', () => {
  it('every lane, block and S8 junction’s address is its kind’s token of a lineage whose unit is one of the district’s cells', { timeout: 300_000 }, () => {
    const c = twoCase();
    const made = c.build();
    const r = runS8({ kernel: made.k, key: GROUND, seedKey: seedKey(c.seed), rung: 'CITY', districts: c.districts, ways: c.ways, seams: c.seams, widths: made.widths }, { report: undefined } as never);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    for (const d of c.districts) {
      // The cells: the district's coarse faces in canonical order before S8 (a fresh arena), each lineage
      // (district, S6, ordinal) — the unit of everything S8 makes in it.
      const fresh = c.build();
      const cells = districtCells(fresh.plat, d.district.id);
      expect(cells.length).toBe(1);
      const cellHashes = cells.map((_, ci) => lineageHash({ arena: GROUND, unit: d.lineage, stage: STAGES.S6, epoch: 0, index: ci, reroll: 0 }));
      const expected = new Map<Id, string>();
      for (const h of cellHashes) {
        for (let i = 0; i < 2_000; i += 1) {
          const lh = lineageHash({ arena: GROUND, unit: h, stage: STAGES.S8, epoch: 0, index: i, reroll: 0 });
          for (const kind of ['way', 'block', 'junction']) expected.set(addressOf(kind, lh, GROUND), kind);
        }
      }
      const blocks = r.value.blocks.filter((b) => b.district === d.district.id);
      expect(blocks.length).toBeGreaterThan(0);
      for (const b of blocks) expect(expected.get(b.id)).toBe('block');
      const rep = r.value.infill.report.districts.find((x) => x.district === d.district.id)!;
      for (const ll of rep.laneLengths) expect(expected.get(ll.lane)).toBe('way');
    }
    for (const j of r.value.infill.junctions) expect(j.id.startsWith('junction:')).toBe(true);
  });

  it('a district’s lanes and blocks do not depend on a district after it in lineage order', { timeout: 300_000 }, () => {
    const c = twoCase();
    // Lineage order: the district whose lineage sorts first runs first.
    const order = c.districts.slice().sort((a, b) => (a.lineage[0] - b.lineage[0]) || (a.lineage[1] - b.lineage[1]));
    const firstId = order[0].district.id;
    const both = c.build();
    const r2 = runS8({ kernel: both.k, key: GROUND, seedKey: seedKey(c.seed), rung: 'CITY', districts: c.districts, ways: c.ways, seams: c.seams, widths: both.widths }, { report: undefined } as never);
    const alone = c.build();
    const r1 = runS8({ kernel: alone.k, key: GROUND, seedKey: seedKey(c.seed), rung: 'CITY', districts: [order[0]], ways: c.ways, seams: c.seams, widths: alone.widths }, { report: undefined } as never);
    expect(r1.ok && r2.ok).toBe(true);
    if (!r1.ok || !r2.ok) return;
    const pick = (o: typeof r1.value) => ({
      lanes: o.lanes.filter((w) => o.infill.report.districts.find((x) => x.district === firstId)?.laneLengths.some((l) => l.lane === w.id)),
      blocks: o.blocks.filter((b) => b.district === firstId),
    });
    expect(JSON.stringify(pick(r2.value))).toBe(JSON.stringify(pick(r1.value)));
  });
});
