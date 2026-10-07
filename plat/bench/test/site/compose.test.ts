// M0-e-06's composition (compose.ts; C-0077, C-0080, C-0264, C-0271 (1), (2)): the spike derives M0-x-04's base
// registration through M0-x-02's runner — S1, the S3 slice, S4, S5, S6 with the fields, S8 left out — and only watches
// it: every stage's declaration kept, the model's stage roots equal to `runBase`'s through S6; the capture (the heights
// before the carve, the river report, the stage times, the batches); R12-5's switch (C-0080) changes the hydrology and
// field cells and nothing upstream; S6 composed by the harness equals the base's S6 byte for byte with the switch off.
import { canonicalText } from '@plat/model';
import { BASE_ORDER, createRegistry, fieldsDigest, registerBase, runBase, stageOrder, type FieldsPass1, type S6Output } from '@plat/layout';
import { hydroParams } from '@plat/site';
import { stageText, type Hash128 } from '@plat/kernel';
import { tableView } from '@plat/tables';
import { describe, expect, it } from 'vitest';
import { corpusReceipt, deriveSpike, districtReceipt, fieldsReceipt, fixtureNamed, GATE_STAGES, hydroReceipt, riverReceipts, runRecord, sized, SPIKE_STAGES, spikeFaces, spikeRegistry, stageOutcomes, type RunCapture, type SiteFixture, type SpikeDerivation } from '../../src/site/index.js';
import type { Plat } from '@plat/kernel';
import type { S3Slice } from '@plat/layout';
import type { Terrain, WaterSet } from '@plat/model';

const HEAVY = 900_000;
const F60 = fixtureNamed('relief-60') as SiteFixture;

const RUNS = new Map<string, SpikeDerivation>();
function derive(config: 'default' | 'coarse', composedS6 = false): SpikeDerivation {
  const k = `${config}:${String(composedS6)}`;
  let d = RUNS.get(k);
  if (d === undefined) {
    d = deriveSpike(F60, 1, config, 'test', { composedS6 });
    RUNS.set(k, d);
  }
  return d;
}

function emptyCapture(): RunCapture {
  return { preHeights: null, terrainWarnings: [], river: null, stageMs: new Map(), batches: [], s6Faces: 0, commits: new Map() };
}

describe('the spike\'s registry: the base\'s stages S1 – S6, declarations kept, S8 left out', () => {
  it('the stages in §4.1\'s order; every declaration but the run equal to registerBase\'s; the gate\'s stages', () => {
    const reg = spikeRegistry({ config: 'default' }, emptyCapture());
    expect(stageOrder(reg).map((id) => stageText(id))).toEqual([...SPIKE_STAGES]);
    expect([...SPIKE_STAGES]).toEqual(BASE_ORDER.filter((s) => s !== 'S8'));
    expect([...GATE_STAGES]).toEqual(['S1', 'S4', 'S6']);
    const base = createRegistry();
    registerBase(base);
    const want = new Map((base.products.get('base')?.stages ?? []).map((s) => [stageText(s.id), s]));
    for (const s of reg.products.get('base')?.stages ?? []) {
      const b = want.get(stageText(s.id));
      expect(b).toBeDefined();
      for (const field of ['id', 'version', 'inputs', 'outputs', 'streamKeys', 'invariants', 'ladder', 'workLimits', 'budgetMs', 'batch', 'lineageUnit', 'lazy', 'txForm'] as const) {
        expect([stageText(s.id), field, s[field]]).toEqual([stageText(s.id), field, b?.[field]]);
      }
      expect(s.run).not.toBe(b?.run);
    }
    // the default leaves the base's strategies; the switch adds a 'coarse' RiverStrategy and leaves 'base' as registered
    expect([...reg.river.keys()]).toEqual(['base']);
    const coarse = spikeRegistry({ config: 'coarse' }, emptyCapture());
    expect([...coarse.river.keys()]).toEqual(['base', 'coarse']);
    expect(coarse.river.get('base')).toBeDefined();
    expect(reg.terrain.get('base')).not.toBe(base.terrain.get('base'));
    expect(reg.terrain.get('flat')).toBe(reg.terrain.get('flat'));
  });
});

describe('the spike only watches: the derivation equals runBase\'s through S6', () => {
  it('relief-60, seed 1: the stage roots S1 – S6, the S6 records and the report\'s bugs equal runBase\'s (which goes on to S8)', { timeout: HEAVY }, () => {
    const d = derive('default');
    const r = runBase(sized(F60.blueprint, 'test'), 1 as never, { kind: 'all' });
    expect(d.model.order).toEqual([...SPIKE_STAGES]);
    for (const s of SPIKE_STAGES) expect([s, d.model.stageRoots.get(s)]).toEqual([s, r.model.stageRoots.get(s) as Hash128]);
    expect(d.report.bugs).toEqual(r.report.bugs.filter((b) => b.stage !== 'S8'));
    expect(d.report.bugs).toEqual([]);
    for (const key of ['districts', 'seams', 'quarters', 'typing', 'fieldBands', 'ways', 'junctions', 'bridges', 'gates'] as const) {
      expect([key, canonicalText(d.model.data.get(key) ?? null)]).toEqual([key, canonicalText(r.model.data.get(key) ?? null)]);
    }
    expect(fieldsDigest(d.model.data.get('fields') as FieldsPass1)).toEqual(fieldsDigest(r.model.data.get('fields') as FieldsPass1));
  });

  it('S6 composed by the harness with the switch off is the base\'s S6: the same roots, districts and fields digest', { timeout: HEAVY }, () => {
    const a = derive('default');
    const b = derive('default', true);
    for (const s of SPIKE_STAGES) expect([s, b.model.stageRoots.get(s)]).toEqual([s, a.model.stageRoots.get(s) as Hash128]);
    expect(canonicalText((b.model.data.get('s6') as S6Output).districts)).toBe(canonicalText((a.model.data.get('s6') as S6Output).districts));
    expect(fieldsDigest(b.model.data.get('fields') as FieldsPass1)).toEqual(fieldsDigest(a.model.data.get('fields') as FieldsPass1));
    expect(canonicalText(b.report)).toBe(canonicalText(a.report));
  });

  it('the capture: the heights before the carve, the river report, the stage times, every batch, the L1 faces S6 met', { timeout: HEAVY }, () => {
    const d = derive('default');
    const terrain = d.model.data.get('terrain') as { heightCm: Int32Array };
    const before = d.capture.preHeights as Int32Array;
    expect(before.length).toBe(terrain.heightCm.length);
    let cut = 0;
    let raised = 0;
    for (let i = 0; i < before.length; i += 1) {
      if (before[i] > terrain.heightCm[i]) cut += 1;
      if (before[i] < terrain.heightCm[i]) raised += 1;
    }
    expect(cut).toBeGreaterThan(0);
    expect(raised).toBe(0);
    expect(d.capture.terrainWarnings).toEqual([]);
    expect(d.capture.river).toBe((d.model.data.get('s1') as { river: unknown }).river);
    expect(d.capture.river?.rivers.length).toBe(1);
    expect([...d.capture.stageMs.keys()]).toEqual([...SPIKE_STAGES]);
    for (const ms of d.capture.stageMs.values()) expect(ms).toBeGreaterThan(0);
    expect(d.capture.batches.filter((b) => b.stage === 'S1').map((b) => [b.level, b.committed])).toEqual([
      [0, true],
      [0, true],
    ]);
    expect(d.capture.batches.every((b) => !b.committed || b.work <= b.limit)).toBe(true);
    expect(new Set(d.capture.batches.map((b) => b.stage))).toEqual(new Set(SPIKE_STAGES));
    const v = d.model.kernel.view({ layer: 'ground', part: 0 } as never, 1);
    expect(d.capture.s6Faces).toBeGreaterThan(10);
    expect(d.capture.s6Faces).toBeLessThan(v.faces().length);
  });
});

describe('R12-5\'s coarsening switch (C-0080): one step coarser hydrology and fields, nothing upstream changed', () => {
  it('relief-60, seed 1: hydrology 25 → 32 m, fields 32 → 48 m, the heights before the carve identical, the switch reported', { timeout: HEAVY }, () => {
    const a = derive('default');
    const c = derive('coarse');
    const p = hydroParams(tableView(), 'CITY');
    const ta = a.model.data.get('terrain') as { hydro: { cellCm: number } };
    const tc = c.model.data.get('terrain') as { hydro: { cellCm: number } };
    expect([ta.hydro.cellCm, tc.hydro.cellCm]).toEqual([p.hydroCellCm, p.hydroCoarseCellCm]);
    expect([p.hydroCellCm, p.hydroCoarseCellCm]).toEqual([2500, 3200]);
    expect(c.capture.river?.hydrology.cellCm).toBe(3200);
    const fa = a.model.data.get('fields') as FieldsPass1 | undefined;
    const fc = c.model.data.get('fields') as FieldsPass1 | undefined;
    expect([fa?.report.cellCm, fa?.report.switchCoarsen]).toEqual([3200, false]);
    expect([fc?.report.cellCm, fc?.report.switchCoarsen]).toEqual([4800, true]);
    expect(Buffer.from((c.capture.preHeights as Int32Array).buffer).equals(Buffer.from((a.capture.preHeights as Int32Array).buffer))).toBe(true);
    expect(c.blueprint.river).toBe('coarse');
    expect(a.blueprint.river).toBeUndefined();
  });
});

describe('the receipts on a derivation, each with its negative control (relief-60, seed 1, the test size)', () => {
  it('D8: every hydrology cell and every land cell has a direction and drains off the grid; one undefined land cell is counted', { timeout: HEAVY }, () => {
    const d = derive('default');
    const p = d.model.plats.get('ground/0') as Plat;
    const t = d.model.data.get('terrain') as Terrain;
    const w = d.model.data.get('water') as WaterSet;
    const r = hydroReceipt(t, p, w);
    expect(r.cells).toBe(t.hydro.cols * t.hydro.rows);
    expect([r.defined, r.landDefined, r.drainsOff]).toEqual([r.cells, r.landCells, true]);
    expect(r.landCells).toBeLessThan(r.cells);
    expect(r.landCells).toBeGreaterThan(0.9 * r.cells);
    // a land cell (the grid's first corner) without a direction, and an outlet's accumulation off by one
    const flowDir = Uint8Array.from(t.flowDir);
    flowDir[0] = 8;
    const broken = hydroReceipt({ ...t, flowDir }, p, w);
    expect([broken.defined, broken.landDefined]).toEqual([r.cells - 1, r.landCells - 1]);
    const flowAccum = Uint32Array.from(t.flowAccum);
    // an outlet: a cell whose direction leaves the grid (its accumulation is what drains off)
    const DX = [1, 1, 0, -1, -1, -1, 0, 1];
    const DY = [0, 1, 1, 1, 0, -1, -1, -1];
    let outlet = -1;
    for (let c = 0; c < t.hydro.cols * t.hydro.rows && outlet < 0; c += 1) {
      const k = t.flowDir[c];
      if (k > 7) continue;
      const i = (c % t.hydro.cols) + DX[k];
      const j = Math.floor(c / t.hydro.cols) + DY[k];
      if (i < 0 || j < 0 || i >= t.hydro.cols || j >= t.hydro.rows) outlet = c;
    }
    expect(outlet).toBeGreaterThanOrEqual(0);
    flowAccum[outlet] += 1;
    expect(hydroReceipt({ ...t, flowAccum }, p, w).drainsOff).toBe(false);
  });

  it('the bed: monotone under the river\'s course; one course cell raised breaks it', { timeout: HEAVY }, () => {
    const d = derive('default');
    const t = d.model.data.get('terrain') as Terrain;
    const w = d.model.data.get('water') as WaterSet;
    const r = riverReceipts(t, w, d.capture.river);
    expect(r).toHaveLength(1);
    expect(r[0]).toMatchObject({ id: w.bodies[0].id, fits: true, bedMonotone: true });
    expect(r[0].bedCells).toBeGreaterThan(100);
    // raise the cell under the course's middle point above the cell before it
    const course = w.bodies[0].course ?? [];
    const q = course[Math.floor(course.length / 2)];
    const i = Math.floor((q.x - t.originX) / t.cellCm);
    const j = Math.floor((q.y - t.originY) / t.cellCm);
    const heightCm = Int32Array.from(t.heightCm);
    heightCm[j * t.cols + i] += 100_000;
    expect(riverReceipts({ ...t, heightCm }, w, d.capture.river)[0].bedMonotone).toBe(false);
  });

  it('containment, sampled inside the perimeter; a perimeter widened to the frame reaches the hinterland and is caught', { timeout: HEAVY }, () => {
    const d = derive('default');
    const p = d.model.plats.get('ground/0') as Plat;
    const s6 = d.model.data.get('s6') as S6Output;
    const r = districtReceipt(d.model.kernel, p, s6);
    expect(r.samples).toBeGreaterThan(50);
    expect(r.samplesContained).toBe(r.samples);
    expect(r.samplesInDistricts).toBeGreaterThan(0.5 * r.samples);
    expect(r.unownedByStage).toBe(0);
    expect(r.districts).toBe(s6.districts.length);
    const frame = (d.model.data.get('s3.slice') as S3Slice).site.frameRing;
    const wide = districtReceipt(d.model.kernel, p, { ...s6, perimeter: [...frame] });
    expect(wide.samples).toBeGreaterThan(r.samples);
    expect(wide.samplesContained).toBeLessThan(wide.samples);
  });

  it('the corpus takes every L1 face a district owns and every L0 face a water body owns; the fields\' receipts hold and see the switch', { timeout: HEAVY }, () => {
    const d = derive('default');
    const p = d.model.plats.get('ground/0') as Plat;
    const s6 = d.model.data.get('s6') as S6Output;
    const w = d.model.data.get('water') as WaterSet;
    const ids = new Set(s6.districts.map((x) => x.id));
    const v1 = d.model.kernel.view({ layer: 'ground', part: 0 } as never, 1);
    const v0 = d.model.kernel.view({ layer: 'ground', part: 0 } as never, 0);
    const wet = new Set(w.bodies.map((b) => b.id));
    const f = spikeFaces(p, s6, w);
    expect(f.district.length).toBe(v1.faces().filter((x) => ids.has(v1.owner(x) ?? '')).length);
    expect(f.water.length).toBe(v0.faces().filter((x) => wet.has(v0.owner(x) ?? '')).length);
    expect(f.district.length).toBeGreaterThanOrEqual(s6.districts.length);
    expect(f.water.length).toBeGreaterThanOrEqual(1);
    const c = corpusReceipt(p, s6, w);
    expect(c?.district.roof.faces).toBe(f.district.length);
    expect(c?.water.spine.faces).toBe(f.water.length);
    const fr = fieldsReceipt(d, p, d.model.data.get('fields') as FieldsPass1, false);
    expect([fr.recomputedEqual, fr.weightZeroIdentical, fr.cellCm]).toEqual([true, true, 3200]);
    for (const b of fr.bands) expect([b.field, b.readBack, b.maxErrorCells <= 1, b.landCells > 0]).toEqual([b.field, true, true, true]);
    // read as the coarse configuration, the default run's record is not what pass 1 recomputes
    expect(fieldsReceipt(d, p, d.model.data.get('fields') as FieldsPass1, true).recomputedEqual).toBe(false);
    expect(stageOutcomes(d)).toEqual({ S1: 'ok', S3: 'ok', S4: 'ok', S5: 'ok', S6: 'ok' });
    const rec = runRecord(d);
    expect(rec.work['hydro.cells']).toEqual({ work: d.capture.river?.work['hydro.cells'], units: (d.model.data.get('terrain') as Terrain).hydro.cols * (d.model.data.get('terrain') as Terrain).hydro.rows });
    expect(rec.work['grower.turns'].units).toBe(d.capture.s6Faces);
    expect(rec.work['field.cells']).toEqual({ work: (d.model.data.get('fields') as FieldsPass1).report.work['field.cells'], units: (d.model.data.get('fields') as FieldsPass1).report.cols * (d.model.data.get('fields') as FieldsPass1).report.rows });
  });
});

