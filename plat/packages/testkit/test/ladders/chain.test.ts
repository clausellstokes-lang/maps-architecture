// M0-x-05: the base chain the rung fixtures run on (C-0077, C-0269) — M0-x-04's registrations and M0-x-02's runner, the
// product cut after a stage (the later stages registered, run as no-ops, so S3's trace keeps S5's rank), and each
// replaced adapter composing its stage's own Stage object from base.ts's exported pieces. With no option the
// replacements reproduce the registered adapters exactly: the same model digest at every stage end, the same report.
import type { S8Output } from '@plat/layout';
import { describe, expect, it } from 'vitest';
import { LADDER_SLID_DISTRICT, ladderChain, ladderSmallFlat, ladderSmallRiver, type ChainSpec } from '@plat/testkit';

const roots = (r: ReturnType<typeof ladderChain>): string[] => [...r.model.stageRoots].map(([k, v]) => `${k}:${v.join(',')}`);

function same(spec: ChainSpec): void {
  const a = ladderChain(spec);
  const b = ladderChain({ ...spec, replaceAll: true });
  expect(a.report.bugs).toEqual([]);
  expect(roots(b)).toEqual(roots(a));
  expect([...b.model.root]).toEqual([...a.model.root]);
  expect(JSON.stringify(b.report)).toBe(JSON.stringify(a.report));
  expect([...b.model.data.keys()].sort()).toEqual([...a.model.data.keys()].sort());
}

describe('the replaced adapters reproduce the registered ones (no option)', () => {
  it('the small flat town (60 ha walled, seed 1) through S8: S3, S4, S5, S6 with the fields, S8 replaced — the same digests and report', { timeout: 600_000 }, () => {
    same({ blueprint: ladderSmallFlat('flat', 60), seed: 1, until: 'S8' });
  });

  it('the small river town (seed 2) through S4: S3 and S4 replaced over S1’s river and crossing sites — the same digests and report', { timeout: 600_000 }, () => {
    same({ blueprint: ladderSmallRiver(), seed: 2, until: 'S4' });
  });
});

describe('the cut and the overrides', () => {
  it('cut after S3: every base stage stays in the order, S4 – S8 write nothing, their stage-end digests S3’s', { timeout: 300_000 }, () => {
    const r = ladderChain({ blueprint: ladderSmallFlat('flat', 60), seed: 1, until: 'S3' });
    expect(r.model.order).toEqual(['S1', 'S3', 'S4', 'S5', 'S6', 'S8']);
    expect(r.model.data.has('s3.slice')).toBe(true);
    for (const k of ['s4', 's5', 's6', 'fields', 'infill']) expect(r.model.data.has(k), k).toBe(false);
    const s3 = r.model.stageRoots.get('S3');
    for (const st of ['S4', 'S5', 'S6', 'S8']) expect(r.model.stageRoots.get(st), st).toEqual(s3);
    expect(r.report.bugs).toEqual([]);
  });

  it('a stage name outside the base order is refused', () => {
    expect(() => ladderChain({ blueprint: ladderSmallFlat(), seed: 1, until: 'S7' as never })).toThrow(/no stage of the base order/);
  });

  it('S8’s district filter keeps the named district alone', { timeout: 300_000 }, () => {
    const r = ladderChain({ blueprint: ladderSmallFlat(), seed: 2, until: 'S8', override: { S8: { districts: [LADDER_SLID_DISTRICT] } } });
    const infill = r.model.data.get('infill') as S8Output['infill'];
    expect(infill.report.districts.map((d) => d.district)).toEqual([LADDER_SLID_DISTRICT]);
    expect((r.model.data.get('districts') as unknown[]).length).toBeGreaterThan(1);
  });
});
