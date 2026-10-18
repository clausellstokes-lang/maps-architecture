// M0-d-09: the spike city's stage table for M0-d-06's cross-host harness (C-0228 (2)) — one stage per pipeline stage of
// each spike, its root, its report, and the records tree; each cell carries exactly the run's digest at that stage; the
// size comes from the fixture's input; the in-process switches ride on the carry and never reach a leg.
import { describe, expect, it } from 'vitest';
import { crossHostFixtureFrom, crossHostResolveStages } from '@plat/testkit';
import { crosshostStages, fixtureOf, OPTIONS_KEY, recordsRun, runKey, runStagesAt, SIZE_INPUT, sizeOf, SPIKE_ENTRY, SPIKE_STAGE_IDS, spikeStageIds, type SpikeRun } from '../../src/determinism/index.js';
import { PLAT, SLOW, testConfig } from './support.js';

describe('the table', () => {
  it('names every pipeline stage of both spikes, their roots and reports, then the records tree (17 stages)', () => {
    expect(spikeStageIds('fusion')).toEqual(['fusion.S1', 'fusion.S3', 'fusion.S4', 'fusion.S5', 'fusion.S6', 'fusion.S8', 'fusion.root', 'fusion.report']);
    expect(SPIKE_STAGE_IDS).toEqual([...spikeStageIds('fusion'), ...spikeStageIds('site'), 'records']);
    expect(crosshostStages.map((s) => s.id)).toEqual([...SPIKE_STAGE_IDS]);
    expect(crosshostStages.every((s) => s.seeded !== false)).toBe(true);
  });
  it('reads the size from the fixture input, CITY without one, and refuses a malformed one', () => {
    expect(sizeOf({})).toEqual({});
    expect(sizeOf({ [SIZE_INPUT]: '{"areaHa": 400, "walledHa": 12, "$comment": "x"}' })).toEqual({ areaHa: 400, walledHa: 12 });
    expect(sizeOf({ [SIZE_INPUT]: '{"areaHa": 400}' })).toEqual({ areaHa: 400 });
    for (const bad of ['[]', '{"areaHa": -1}', '{"areaHa": "4"}', '{"rung": "TOWN"}', '{"walledHa": 0}']) expect(() => sizeOf({ [SIZE_INPUT]: bad }), bad).toThrow();
  });
  it('is the fixture the runner gives the legs: plat/-relative entry, the test size as an input', async () => {
    const f = fixtureOf(await testConfig({ seeds: [3, 1] }));
    expect(f.entryPath.startsWith(PLAT)).toBe(true);
    expect(f.entryPath.endsWith(SPIKE_ENTRY)).toBe(true);
    expect(f.seeds).toEqual([3, 1]);
    expect(sizeOf(f.inputs)).toEqual({ areaHa: 400, walledHa: 12 });
    expect(fixtureOf({ ...(await testConfig()), size: 'city' }).inputs).toEqual({});
    expect(() => crossHostFixtureFrom({ id: 'x', entry: '../outside.ts', seeds: [1], stages: ['a'] }, 'x')).toThrow(/outside plat|does not exist/);
  });
});

describe('a seed through the table', () => {
  it('gives each stage the run\'s own digest there, derives each spike once, and leaves the switches to the carry', { timeout: SLOW }, async () => {
    const f = fixtureOf(await testConfig());
    const { cells, carry } = runStagesAt(crosshostStages, [...spikeStageIds('fusion'), 'records'], 1, f.inputs);
    const run = carry.get(runKey('fusion')) as SpikeRun;
    expect(run.seed).toBe(1);
    expect(run.oracle).toBeNull();
    expect(carry.has(runKey('site'))).toBe(false);
    expect(carry.has(OPTIONS_KEY)).toBe(false);
    const want = [...run.stageRoots.map(([n, h]) => [`fusion.${n}`, h, null]), ['fusion.root', run.root, null], ['fusion.report', run.reportDigest, null]];
    const rec = recordsRun(1);
    want.push(['records', rec.model, rec.records]);
    expect(cells.map((c) => [c.stage, c.model, c.records])).toEqual(want);
    expect(cells.every((c) => c.seed === 1 && c.error === undefined)).toBe(true);
    // the switches reach the run through the carry: the oracle on, the same digests
    const inst = runStagesAt(crosshostStages, ['fusion.S1', 'fusion.root'], 1, f.inputs, { oracle: true });
    expect((inst.carry.get(runKey('fusion')) as SpikeRun).oracle?.batches).toBeGreaterThan(0);
    expect(inst.cells.map((c) => c.model)).toEqual([cells[0]?.model, run.root]);
    // a stage table names each id once; an unknown id is refused before anything runs
    expect(() => crossHostResolveStages(crosshostStages, ['fusion.S2'])).toThrow(/no stage/);
  });
  it('refuses a carry that holds another seed\'s run (a leg never mixes seeds)', async () => {
    const f = fixtureOf(await testConfig());
    const stage = crosshostStages.find((s) => s.id === 'fusion.root');
    const carry = new Map<string, unknown>([[runKey('fusion'), { seed: 2, spike: 'fusion' }]]);
    expect(() => stage?.run(1, { inputs: f.inputs, carry })).toThrow(/seed 2, not 1/);
  });
});
