// S5d, the capacity check (§4.4 S5d, §5.2 F-BUDGET-STAGE, §4.5 *Bands*; C-0016, C-0034; C-0254 (9)–(12)): built land per
// face (land − corridor reserve − reservations, floored at 0), the band by the field at the centroid cut by provisional
// cut points over the land grown so far (each band's share of it the band's household share), the stand-in demand; a
// stage short by > 5 % takes one top-up, a stage within 5 % takes none; the shortfall is reported, never a restart;
// a walled stage's top-up is M1's (its shortfall accepted, reported); a capped stage takes none.
import { describe, expect, it } from 'vitest';
import { STAGES, type StageId } from '@plat/kernel';
import { lineageHash } from '@plat/model';
import { loadTable } from '@plat/tables';
import { flatFixture } from '../../../src/index.js';
import { capacityCheck, capacityStep, stageOneReach, syntheticRamp, type CapacityDemand } from '../../../src/growth/capacity.js';
import { growthStart, mainRoadsStep, mainRoadStream, traceStep, type GrowthState } from '../../../src/growth/index.js';
import { acceptedStreets, growthRecord, growthStageLineage, growthStep, growthStreams, keepRecord, type GrownStreet, type GrowthStreams } from '../../../src/growth/proposals.js';
import { pruneAndTrim } from '../../../src/growth/prune.js';
import { baseRun, fixtureGrown, SMALL } from './support.js';

const SHARES = ['squalid', 'poor', 'modest', 'comfortable', 'prosperous', 'rich'].map((b) => loadTable('bands').num(b, 'share'));

/**
 * S5 up to stage `upTo`'s prune (its S5d not run), on the CITY town in a 900 ha frame; with each stage's streets as S5c
 * accepted them (before the prune took any).
 */
function upToPrune(seed: number, upTo: number): { state: GrowthState; streams: GrowthStreams; accepted: GrownStreet[][] } {
  const accepted: GrownStreet[][] = [];
  const b = baseRun(flatFixture(seed, { frameAreaHa: 900 }));
  const state = growthStart({ slice: b.slice, commit: b.commit, s4: b.s4, kernel: b.k });
  const mainroad = mainRoadStream(b.slice);
  const streams = growthStreams(b.slice);
  for (let k = 1; k <= upTo; k += 1) {
    if (k >= 2) {
      if (!mainRoadsStep(state, k, mainroad).ok || !traceStep(state, k).ok) throw new Error('S5a / S5b refused');
    }
    const c = growthStep(state, k, streams);
    if (!c.ok) throw new Error(c.detail);
    accepted.push(c.value.streets.slice());
    keepRecord(state, c.value);
    if (!pruneAndTrim({ state, k, record: c.value }).ok) throw new Error('prune refused');
    if (k < upTo && !capacityStep(state, k, streams).ok) throw new Error('S5d refused');
  }
  return { state, streams, accepted };
}

describe('the plain fixture takes no top-up (the stand-in demand, C-0016)', () => {
  for (const [seed, fx] of [
    [1, SMALL],
    [2, SMALL],
    [1, {}],
  ] as const) {
    it(`seed ${String(seed)} ${JSON.stringify(fx)}: every stage within 5 %, no top-up, a whole report`, { timeout: 240_000 }, () => {
      const g = fixtureGrown(seed, fx);
      expect(g.run.capacity.map((d) => d.k)).toEqual([1, 2, 3]);
      for (const d of g.run.capacity) {
        expect(d.topUp).toBe('none');
        expect(d.check.short).toBe(false);
        expect(d.rungs).toEqual([]);
        expect(d.check.shortfallCm2).toBeLessThanOrEqual(0.05 * d.check.demandCm2);
        // The stand-in: the stage's quota at its measured built share, spread as its built land is.
        const q = g.site.land.stagesHa[d.k - 1] * 1e8;
        expect(d.check.demandCm2).toBeCloseTo((q * d.check.builtCm2) / d.check.landCm2, -2);
        // The stage's land is the land S5a gave it (its cells), within one cell.
        const gs = g.run.state.stages[d.k - 1];
        expect(Math.abs(d.check.landCm2 - gs.boundary!.addedCm2)).toBeLessThanOrEqual(g.slice.lattice.cellAreaCm2 * 2);
      }
    });
  }

  it('faces: built land = land − reserve, floored at 0; a reservation or a wall strip holds none; the bands from the centroid', { timeout: 240_000 }, () => {
    const g = fixtureGrown(1, SMALL);
    const field = syntheticRamp(g.site.centre, stageOneReach(g.run.state));
    for (const d of g.run.capacity) {
      let built = 0;
      for (const f of d.check.faces) {
        expect(f.builtCm2).toBeGreaterThanOrEqual(0);
        expect(f.builtCm2).toBeLessThanOrEqual(f.landCm2);
        if (f.reserved !== null) expect(f.builtCm2).toBe(0);
        else expect(f.builtCm2).toBeCloseTo(Math.max(0, f.landCm2 - f.reserveCm2), 3);
        expect(f.value).toBeCloseTo(field.prosperityAt(f.centroid), 12);
        built += f.builtCm2;
      }
      expect(d.check.builtCm2).toBeCloseTo(built, 3);
      expect(d.check.faces.some((f) => f.reserveCm2 > 0)).toBe(true);
    }
    // Stage 1 holds the plaza: a reservation face.
    expect(g.run.capacity[0].check.faces.some((f) => f.reserved === 'reservation')).toBe(true);
    // Stage 2's faces include its wall's inner strip.
    expect(g.run.capacity[1].check.faces.some((f) => f.reserved === 'strip')).toBe(true);
  });

  it('stage 2’s cut points split the built land of stages 1 and 2 together by the shares (over the land grown so far)', { timeout: 240_000 }, () => {
    const g = fixtureGrown(1, {});
    const [d1, d2] = g.run.capacity;
    const faces = [...d1.check.faces, ...d2.check.faces].filter((f) => f.builtCm2 > 0);
    const total = faces.reduce((a, f) => a + f.builtCm2, 0);
    const largest = Math.max(...faces.map((f) => f.builtCm2));
    let cum = 0;
    for (let i = 0; i < 5; i += 1) {
      cum += SHARES[i];
      const below = faces.filter((f) => f.value < d2.check.cuts.cuts[i]).reduce((a, f) => a + f.builtCm2, 0);
      expect(Math.abs(below - cum * total)).toBeLessThanOrEqual(largest + 1);
    }
  });

  it('the cut points split the built land grown so far by the household shares (within one face’s land)', { timeout: 240_000 }, () => {
    const g = fixtureGrown(1, {});
    const d = g.run.capacity[0];
    const faces = d.check.faces.filter((f) => f.builtCm2 > 0);
    const largest = Math.max(...faces.map((f) => f.builtCm2));
    let cum = 0;
    let land = 0;
    for (let i = 0; i < 5; i += 1) {
      cum += SHARES[i];
      land += d.check.landByBand[i];
      expect(Math.abs(land - cum * d.check.builtCm2)).toBeLessThanOrEqual(largest + 1);
    }
    expect(d.check.cuts.bands).toEqual(['squalid', 'poor', 'modest', 'comfortable', 'prosperous', 'rich']);
    for (let i = 1; i < 5; i += 1) expect(d.check.cuts.cuts[i]).toBeGreaterThanOrEqual(d.check.cuts.cuts[i - 1]);
  });
});

describe('the 5 % test (capacityCheck)', () => {
  it('a demand 4 % above the land is within 5 %; 6 % above is short; a demand moved between bands is short by the move', { timeout: 240_000 }, () => {
    const g = fixtureGrown(1, SMALL);
    const st = { state: g.run.state, k: 1 };
    const base = capacityCheck(st);
    const scale = (f: number): CapacityDemand => ({ bandsCm2: base.landByBand.map((l) => l * f) });
    const within = capacityCheck(st, scale(1.04));
    expect(within.short).toBe(false);
    expect(within.shortfallCm2).toBeCloseTo(0.04 * base.builtCm2, 0);
    const over = capacityCheck(st, scale(1.06));
    expect(over.short).toBe(true);
    // The same total, one band's demand moved to the next: short by what moved (per-band comparison).
    const moved = base.landByBand.slice();
    const i = moved.findIndex((x) => x > 0.2 * base.builtCm2);
    moved[i] -= 0.1 * base.builtCm2;
    moved[i + 1] += 0.1 * base.builtCm2;
    const m = capacityCheck(st, { bandsCm2: moved });
    expect(m.shortfallCm2).toBeCloseTo(0.1 * base.builtCm2, 0);
    expect(m.short).toBe(true);
    expect(() => capacityCheck(st, { bandsCm2: [1, 2, 3] })).toThrow(RangeError);
  });
});

describe('the top-up (F-BUDGET-STAGE)', () => {
  it('an unwalled stage short by > 5 % takes ONE top-up: its level set grows, S5c grows the rim, the remainder is reported', { timeout: 240_000 }, () => {
    const { state, streams } = upToPrune(1, 3);
    const k = 3;
    const gs = state.stages[k - 1];
    expect(gs.walled).toBe(false);
    const oldB = gs.boundary!;
    const plain = capacityCheck({ state, k });
    const demand: CapacityDemand = { bandsCm2: plain.landByBand.map((l) => l * 1.3) };
    const r = capacityStep(state, k, streams, { demand });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const d = r.value;
    expect(d.topUp).toBe('grown');
    expect(d.rungs[0]).toEqual({ cause: 'F-BUDGET-STAGE', rung: 'top_up', shortfallCm2: d.check.shortfallCm2 });
    expect(d.rungs.filter((x) => x.rung === 'top_up').length).toBe(1);
    // The level set grew by the shortfall at the stage's built share (to one cell), nested on the old.
    expect(d.boundary).not.toBeNull();
    const nb = d.boundary!;
    expect(nb.landCm2).toBeGreaterThan(oldB.landCm2);
    expect(Math.abs(nb.landCm2 - oldB.landCm2 - d.extraCm2)).toBeLessThanOrEqual(state.slice.lattice.cellAreaCm2 * 2);
    // The extra land: the shortfall at the stage's measured built share (§5.2: "at the stage's measured plot density").
    expect(d.extraCm2).toBeCloseTo((d.check.shortfallCm2 * d.check.landCm2) / d.check.builtCm2, -1);
    for (let i = 0; i < oldB.set.selected.length; i += 1) if (oldB.set.selected[i] === 1) expect(nb.set.selected[i]).toBe(1);
    expect(state.stages[k - 1].boundary).toBe(nb);
    // S5c ran on the rim, its prune and trim with it; the check ran again on the same demand.
    expect(d.rim).not.toBeNull();
    expect(d.rimPrune).not.toBeNull();
    expect(d.after).not.toBeNull();
    expect(d.after!.demandByBand).toEqual(demand.bandsCm2);
    expect(d.after!.landCm2).toBeGreaterThan(d.check.landCm2);
    expect(d.shortfallCm2).toBe(d.after!.shortfallCm2);
    if (d.shortfallCm2 > 0) expect(d.rungs[1]).toEqual({ cause: 'F-BUDGET-STAGE', rung: 'accept_shortfall', shortfallCm2: d.shortfallCm2, why: 'remainder' });
    // The rim's streets lie outside the old boundary (or start on an arterial at it).
    for (const s of d.rim!.streets) expect(s.way.growthStage).toBe(k);
  });

  it('the rim’s streets continue the stage’s acceptance index: their lineage keys are the stage’s next, none reused (§6.3)', { timeout: 240_000 }, () => {
    for (const seed of [4, 5]) {
      const { state, streams, accepted } = upToPrune(seed, 3);
      const k = 3;
      const main = accepted[k - 1];
      expect(main.length).toBeGreaterThan(0);
      main.forEach((s, i) => expect(s.index).toBe(i));
      // The tally counts every street S5c accepted, the pruned ones included.
      expect(acceptedStreets(state, k)).toBe(main.length);
      const plain = capacityCheck({ state, k });
      const r = capacityStep(state, k, streams, { demand: { bandsCm2: plain.landByBand.map((l) => l * 2) } });
      expect(r.ok).toBe(true);
      if (!r.ok) return;
      expect(r.value.topUp).toBe('grown');
      const rim = r.value.rim!;
      expect(rim.streets.length).toBeGreaterThan(0);
      // Acceptance order continued after the stage's own streets (the rim's prune may leave gaps).
      expect(rim.streets[0].index).toBeGreaterThanOrEqual(main.length);
      for (let i = 1; i < rim.streets.length; i += 1) expect(rim.streets[i].index).toBeGreaterThan(rim.streets[i - 1].index);
      for (const s of rim.streets) {
        expect(s.lineage).toEqual(lineageHash({ arena: state.key, unit: growthStageLineage(state.key, k), stage: STAGES.S5 as StageId, epoch: 0, index: s.index, reroll: 0 }));
      }
      // No lineage key of the growth stage is reused: the stage's streets (pruned ones included) and the rim's are distinct.
      const keys = [...main, ...rim.streets].map((s) => JSON.stringify(s.lineage));
      expect(new Set(keys).size).toBe(keys.length);
      // And every live way of the stage holds its own key.
      const live = state.ways.filter((w) => w.growthStage === k).map((w) => w.id);
      const byWay = new Map([...main, ...rim.streets].map((s) => [s.way.id, JSON.stringify(s.lineage)]));
      const liveKeys = live.map((id) => byWay.get(id)).filter((x) => x !== undefined);
      expect(new Set(liveKeys).size).toBe(liveKeys.length);
      // The tally moved past the rim's streets (a second growth of the stage would continue after them).
      expect(acceptedStreets(state, k)).toBeGreaterThan(rim.streets[rim.streets.length - 1].index);
    }
  });

  it('a stage within 5 % takes none', { timeout: 240_000 }, () => {
    const { state, streams } = upToPrune(2, 3);
    const plain = capacityCheck({ state, k: 3 });
    const r = capacityStep(state, 3, streams, { demand: { bandsCm2: plain.landByBand.map((l) => l * 1.04) } });
    expect(r.ok && r.value.topUp === 'none' && r.value.rungs.length === 0 && r.value.rim === null).toBe(true);
  });

  it('a walled stage short by > 5 % accepts and reports its shortfall (its arc’s re-trace is M1’s); its boundary unchanged', { timeout: 240_000 }, () => {
    const { state, streams } = upToPrune(1, 1);
    const b = state.stages[0].boundary;
    const plain = capacityCheck({ state, k: 1 });
    const r = capacityStep(state, 1, streams, { demand: { bandsCm2: plain.landByBand.map((l) => l * 1.5) } });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.value.topUp).toBe('skipped_walled');
    expect(r.value.rungs).toEqual([{ cause: 'F-BUDGET-STAGE', rung: 'accept_shortfall', shortfallCm2: r.value.check.shortfallCm2, why: 'walled' }]);
    expect(r.value.shortfallCm2).toBe(r.value.check.shortfallCm2);
    expect(state.stages[0].boundary).toBe(b);
    expect(growthRecord(state, 1)).toBeDefined();
  });

  it('a capped stage (no reachable land left) takes none: its shortfall reported', { timeout: 240_000 }, () => {
    const { state, streams } = upToPrune(1, 3);
    const gs = state.stages[2];
    gs.boundary = { ...gs.boundary!, capped: true };
    const plain = capacityCheck({ state, k: 3 });
    const r = capacityStep(state, 3, streams, { demand: { bandsCm2: plain.landByBand.map((l) => l * 1.5) } });
    expect(r.ok && r.value.topUp === 'skipped_capped' && r.value.rungs[0].why === 'capped' && r.value.rim === null).toBe(true);
  });
});
