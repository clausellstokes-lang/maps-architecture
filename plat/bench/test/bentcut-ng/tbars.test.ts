// T34-1 – T41-1's checks on a face set (M0-b-05; §13.2's bent-cut bars, §13.8 "on … NG's recorded shapes"). Each check
// passes on S8's and the planner's own output and fails on a planted break of the clause it holds — so a check that
// could never fail is caught here, not on M-1's faces.
import { describe, expect, it } from 'vitest';
import { createRng, entityKey, seedKey, type Cm, type Hash64, type LatticePoint } from '@plat/kernel';
import { blockDepthRange, cutCells, minFrontage, planCut, widthCells, type BlockFaces, type CutPlanned, type DistrictReport, type KerbFace, type PlanContext, type PlanStreams } from '@plat/layout';
import { loadTable } from '@plat/tables';
import { faceDistrict, GROUND, replayDistrict, type FaceDistrict } from '../../src/bentcut/index.js';
import { checkFacePlans, checkPlan, checkT34, checkT39, checkT40, checkT41Registry, checkT41Run, checksOf, placedPolygon, plotCutSharp, tallies } from '../../src/bentcut-ng/index.js';
import { genRings, ngFace, PLANTED_CUTS } from './support.js';

const CELLS = cutCells(loadTable('cut'));
const BANDS = widthCells('CITY').bands;

/** One real district run of a generated round-joined face, replayed (its report and block faces). */
function district(): { fd: FaceDistrict; report: DistrictReport; blockFaces: readonly BlockFaces[] } {
  const poly = placedPolygon(ngFace(1, genRings('round-joined', 0), 'area', PLANTED_CUTS));
  if (typeof poly === 'string') throw new Error(poly);
  const fd = faceDistrict(poly, 77);
  const r = replayDistrict(fd, 'round-joined');
  if ('error' in r) throw new Error(r.error);
  return { fd, report: r.report, blockFaces: r.partition.blockFaces };
}

const D = district();

function failures(f: (t: ReturnType<typeof tallies>) => void): { checked: number; failed: number } {
  const t = tallies();
  f(t);
  const c = checksOf(t);
  let checked = 0;
  let failed = 0;
  for (const v of Object.values(c)) {
    checked += v.checked;
    failed += v.failed;
  }
  return { checked, failed };
}

describe('T34-1: the stop tests replayed and the stop blocks below τ', () => {
  it('holds on S8\'s run and fails on a planted draw, τ, outcome or block', () => {
    const t34 = (report: DistrictReport, bfs = D.blockFaces) => failures((t) => checkT34(t['T34-1'], D.fd.input.seedKey, GROUND, report, bfs));
    const ok = t34(D.report);
    expect(ok.failed).toBe(0);
    expect(ok.checked).toBeGreaterThanOrEqual(2 * D.report.stops.length);
    const s0 = D.report.stops[0];
    const withStop = (s: typeof s0): DistrictReport => ({ ...D.report, stops: [s, ...D.report.stops.slice(1)] });
    expect(t34(withStop({ ...s0, uniforms: [s0.uniforms[1], s0.uniforms[0], s0.uniforms[2], s0.uniforms[3]] })).failed).toBeGreaterThan(0);
    expect(t34(withStop({ ...s0, g: s0.g + 1e-9 })).failed).toBeGreaterThan(0);
    expect(t34(withStop({ ...s0, tauCm: s0.tauCm + 1 })).failed).toBeGreaterThan(0);
    expect(t34(withStop({ ...s0, outcome: s0.outcome === 'cut' ? 'block' : 'cut' })).failed).toBe(1);
    expect(t34(withStop({ ...s0, minorCm: s0.outcome === 'cut' ? s0.tauCm - 1 : s0.tauCm })).failed).toBe(1);
    // A different seed key: the replay draws other uniforms.
    expect(failures((t) => checkT34(t['T34-1'], seedKey(78), GROUND, D.report, D.blockFaces)).failed).toBeGreaterThan(0);
    // A stop block whose kerb is the whole district face: not below its τ.
    const stopIdx = D.blockFaces.findIndex((b) => b.how === 'stop');
    expect(stopIdx).toBeGreaterThanOrEqual(0);
    const km: LatticePoint[] = [
      { x: 0 as Cm, y: 0 as Cm },
      { x: 100_000 as Cm, y: 0 as Cm },
      { x: 100_000 as Cm, y: 100_000 as Cm },
      { x: 0 as Cm, y: 100_000 as Cm },
    ];
    const big = D.blockFaces.map((b, i) => (i === stopIdx ? { ...b, kerb: km } : b));
    expect(t34(D.report, big).failed).toBe(1);
    expect(t34(D.report, D.blockFaces.map((b, i) => (i === stopIdx ? { ...b, stop: null } : b))).failed).toBe(1);
  });
});

describe('T39-1: rung (a)\'s frames', () => {
  const base = { ...D.report, rungs: [], faces: [{ face: 'f', depth: 0, kernelCalls: 2, outcome: 'cut' as const, facesAfter: 2 }] };
  const a = (attempt: number, outcome: 'cut' | 'refused', turnCdeg = attempt * CELLS.ladderTurnCdeg) => ({ face: 'f', rung: 'a' as const, attempt, turnCdeg, outcome });
  const t39 = (r: DistrictReport) => failures((t) => checkT39(t['T39-1'], r, CELLS)).failed;
  it('at most maxFrames frames, frame k turned k × turnCdeg; every frame failed → rung (b); no face lost', () => {
    expect([CELLS.maxFrames, CELLS.ladderTurnCdeg]).toEqual([3, 3_600]);
    expect(t39(D.report)).toBe(0);
    expect(t39({ ...base, rungs: [a(0, 'refused'), a(1, 'cut')] })).toBe(0);
    expect(t39({ ...base, rungs: [a(0, 'refused'), a(1, 'refused'), a(2, 'refused'), { face: 'f', rung: 'b', attempt: 0, outcome: 'cut' }] })).toBe(0);
    expect(t39({ ...base, rungs: [a(0, 'refused'), a(1, 'refused'), a(2, 'refused'), { face: 'f', rung: 'c', attempt: 0, outcome: 'cut' }] })).toBe(1);
    expect(t39({ ...base, rungs: [a(0, 'refused'), a(1, 'refused'), a(3, 'cut')] })).toBe(1);
    expect(t39({ ...base, rungs: [a(0, 'refused'), a(1, 'cut', 3_000)] })).toBe(1);
    expect(t39({ ...base, faces: [{ face: 'f', depth: 0, kernelCalls: 2, outcome: 'cut', facesAfter: 0 }] })).toBe(1);
  });
});

describe('T40-1: lane widths', () => {
  const ll = (lengthCm: number, widthCm: number, cls: 'alley' | 'lane' | 'secondary' = 'lane') => ({ lane: `w${String(lengthCm)}`, lengthCm, cls, widthCm });
  const t40 = (laneLengths: DistrictReport['laneLengths']) => failures((t) => checkT40(t['T40-1'], { ...D.report, laneLengths }, BANDS)).failed;
  it('per class non-decreasing in length and inside the band; never narrower than a lower class', () => {
    expect(t40(D.report.laneLengths)).toBe(0);
    expect(D.report.laneLengths.length).toBeGreaterThan(0);
    expect(t40([ll(1_000, 320), ll(2_000, 400), ll(3_000, 500), ll(500, 250, 'alley'), ll(900, 300, 'alley')])).toBe(0);
    expect(t40([ll(1_000, 420), ll(2_000, 400)])).toBe(1);
    expect(t40([ll(1_000, 299)])).toBe(1);
    expect(t40([ll(1_000, 501)])).toBe(1);
    expect(t40([ll(1_000, 300), ll(900, 300.5, 'alley')])).toBe(2);
  });
});

describe('T41-1: the cut concerns', () => {
  it('the registry clause holds; a draw keyed by a reserved concern, or a stop not keyed by cut.stop, fails', () => {
    expect(failures((t) => checkT41Registry(t['T41-1']))).toEqual({ checked: 3, failed: 0 });
    const t41 = (r: DistrictReport) => failures((t) => checkT41Run(t['T41-1'], r)).failed;
    expect(t41(D.report)).toBe(0);
    const s0 = D.report.stops[0];
    expect(t41({ ...D.report, stops: [{ ...s0, key: s0.key.replace('cut.stop', 'cut.t') }] })).toBe(1);
    expect(t41({ ...D.report, rungs: [{ face: 'f', rung: 'a', attempt: 0, outcome: 'cut', key: 'S8/cut.side/a0' }] })).toBe(1);
    expect(t41({ ...D.report, rungs: [{ face: 'f', rung: 'a', attempt: 0, outcome: 'cut', key: 'S8/cut.farSideAlt/a0' }] })).toBe(1);
    // A longer name that merely starts like a reserved one is not it.
    expect(t41({ ...D.report, rungs: [{ face: 'f', rung: 'a', attempt: 0, outcome: 'cut', key: 'S8/cut.sides.x' }] })).toBe(0);
  });
});

/** Real plans on generated faces until one is bent and filleted. */
function bentFilleted(): { plan: CutPlanned; wMinCm: number } {
  const fd = D.fd;
  const [eLo, eHi] = blockDepthRange(fd.bands, undefined);
  const ctx: PlanContext = { depthRangeM: [eLo, eHi], minFrontageM: minFrontage(fd.bands), cutKind: 'way', table: loadTable('cut') };
  for (const kind of ['round-joined', 'curved', 'C-shaped'] as const) {
    for (let i = 0; i < 4; i += 1) {
      const face: KerbFace = { rings: genRings(kind, i).map((r) => r.map((p) => ({ x: p.x as Cm, y: p.y as Cm }))) };
      for (let s = 1; s <= 60; s += 1) {
        const streams = { rng: createRng(), faceKey: entityKey(seedKey(s), [s, 7] as unknown as Hash64, GROUND), entity: `face:${String(s)}`, reroll: 0, epoch: 0 };
        const p = planCut(face, ctx, streams);
        if (p.ok && p.value.kind === 'cut' && p.value.cut.bent && p.value.cut.fillet?.filleted === true && p.value.cut.ends.every((e) => e.slidCm === 0)) return { plan: p.value, wMinCm: minFrontage(fd.bands) * 100 };
      }
    }
  }
  throw new Error('no bent, filleted plan found');
}

describe('T36-1, T37-1, T38-1 on a plan', () => {
  const { plan, wMinCm } = bentFilleted();
  const at = (p: CutPlanned): Record<string, number> => {
    const t = tallies();
    checkPlan(t, p, CELLS, wMinCm, 'test');
    const c = checksOf(t);
    return { T36: c['T36-1'].failed, T37: c['T37-1'].failed, T38: c['T38-1'].failed };
  };
  const g = plan.cut;
  const fl = g.fillet as NonNullable<typeof g.fillet>;

  it('holds on the planner\'s own plan', () => {
    expect(at(plan)).toEqual({ T36: 0, T37: 0, T38: 0 });
  });

  it('T36-1 fails on a draw between the position and the corner, a start off its line, or the less parallel run', () => {
    const draws = [...plan.draws];
    const pos = draws.findIndex((d) => d.step === 'position');
    draws.splice(pos + 1, 0, plan.draws[pos]);
    expect(at({ ...plan, draws }).T36).toBe(1);
    expect(at({ ...plan, start: { ...plan.start, f: plan.start.f + 0.01 } }).T36).toBe(1);
    expect(at({ ...plan, start: { ...plan.start, A: { x: plan.start.A.x + 0.01 * plan.frame.major.x * 100, y: plan.start.A.y + 0.01 * plan.frame.major.y * 100 } } }).T36).toBe(1);
    const par = (i: number): number => (plan.sides.runs[i].dir.x * plan.frame.major.y - plan.sides.runs[i].dir.y * plan.frame.major.x) ** 2;
    if (par(plan.start.run) !== par(plan.start.otherRun)) expect(at({ ...plan, start: { ...plan.start, run: plan.start.otherRun, otherRun: plan.start.run } }).T36).toBeGreaterThanOrEqual(1);
    expect(at({ ...plan, start: { ...plan.start, normal: { x: plan.start.normal.y, y: -plan.start.normal.x } } }).T36).toBe(plan.sides.runs[plan.start.run].spreadCdeg === 0 ? 1 : 0);
  });

  it('T37-1 fails on two bends, a corner nearer an end than o, a second leg off square, a kept corner below the flatten height', () => {
    const legs = g.legs;
    expect(at({ ...plan, cut: { ...g, legs: [legs[0], legs[1], { x: (legs[1].x + legs[2].x) / 2 + 300, y: (legs[1].y + legs[2].y) / 2 }, legs[2]] } }).T37).toBeGreaterThanOrEqual(1);
    const c = plan.corner;
    if (c.lambdaCm >= 2 * c.oCm) {
      expect(at({ ...plan, corner: { ...c, atCm: c.oCm - 1 } }).T37).toBe(1);
      expect(at({ ...plan, corner: { ...c, atCm: c.lambdaCm - c.oCm + 1 } }).T37).toBe(1);
      expect(at({ ...plan, corner: { ...c, atCm: c.oCm } }).T37).toBe(0);
    }
    expect(at({ ...plan, corner: { ...c, lambdaCm: 1.5 * c.oCm, atCm: 0.75 * c.oCm } }).T37).toBe(0);
    expect(at({ ...plan, corner: { ...c, lambdaCm: 1.5 * c.oCm, atCm: 0.75 * c.oCm + 1 } }).T37).toBe(1);
    const far = plan.far as NonNullable<typeof plan.far>;
    const d = Math.hypot(far.dir.x, far.dir.y);
    const along = (k: number) => ({ x: legs[2].x + (k * far.dir.x) / d, y: legs[2].y + (k * far.dir.y) / d });
    const off0 = Math.abs(((legs[2].x - legs[1].x) * far.dir.x + (legs[2].y - legs[1].y) * far.dir.y) / d);
    expect(off0).toBeLessThan(0.01);
    expect(at({ ...plan, cut: { ...g, legs: [legs[0], legs[1], along(1.05 + off0)] } }).T37).toBe(1);
    expect(at({ ...plan, cut: { ...g, legs: [legs[0], legs[1], along(0.95 - off0)] } }).T37).toBe(0);
    expect(at({ ...plan, far: null }).T37).toBe(1);
    expect(at({ ...plan, cut: { ...g, heightCm: g.flattenThresholdCm - 0.01 } }).T37).toBe(1);
  });

  it('T38-1 fails on an arc of too few points, a chord below the floor, or a point beyond the shorter leg', () => {
    expect(fl.arc.length).toBeGreaterThanOrEqual(CELLS.minSamplePoints);
    expect(at({ ...plan, cut: { ...g, fillet: { ...fl, arc: fl.arc.slice(0, CELLS.minSamplePoints - 1) } } }).T38).toBeGreaterThanOrEqual(1);
    const a0 = fl.arc[0];
    const a1 = fl.arc[1];
    const tooClose = { x: a0.x + (a1.x - a0.x) * 0.01, y: a0.y + (a1.y - a0.y) * 0.01 };
    expect(at({ ...plan, cut: { ...g, fillet: { ...fl, arc: [a0, tooClose, ...fl.arc.slice(1)] } } }).T38).toBe(1);
    const K = g.legs[1];
    const far = { x: K.x + 1e6, y: K.y };
    expect(at({ ...plan, cut: { ...g, fillet: { ...fl, arc: [...fl.arc, far] } } }).T38).toBe(1);
  });
});

/**
 * A real face whose plans at attempts 0, 1 and 2 are all cuts and whose plot-cut plan keeps its corner (fix round 1 of
 * the check's F-4: the plans of frames 1 and 2 and the plot clause must be reachable by a planted break).
 */
function threeFrameFace(): { face: KerbFace; ctx: PlanContext; streams: () => PlanStreams; wMinCm: number; plans: CutPlanned[]; plot: CutPlanned; wayFillet: NonNullable<CutPlanned['cut']['fillet']> } {
  const fd = D.fd;
  const [eLo, eHi] = blockDepthRange(fd.bands, undefined);
  const ctx: PlanContext = { depthRangeM: [eLo, eHi], minFrontageM: minFrontage(fd.bands), cutKind: 'way', table: loadTable('cut') };
  for (const kind of ['round-joined', 'curved', 'C-shaped', 'holed'] as const) {
    for (let i = 0; i < 4; i += 1) {
      const face: KerbFace = { rings: genRings(kind, i).map((r) => r.map((p) => ({ x: p.x as Cm, y: p.y as Cm }))) };
      for (let s = 1; s <= 60; s += 1) {
        // A fresh Rng each time: a stream asked for again continues where it stopped, so every pass over the face plans
        // on its own Rng, in checkFacePlans' order (frames 0, 1, 2, then the plot cut).
        const mk = (): PlanStreams => ({ rng: createRng(), faceKey: entityKey(seedKey(s), [s, 9] as unknown as Hash64, GROUND), entity: `face:${String(s)}`, reroll: 0, epoch: 0 });
        const streams = mk();
        const p0 = planCut(face, ctx, streams);
        if (!p0.ok || p0.value.kind !== 'cut' || !p0.value.cut.bent) continue;
        const wayFillet = p0.value.cut.fillet;
        if (wayFillet === null || !wayFillet.filleted) continue;
        const plans: CutPlanned[] = [p0.value];
        for (let k = 1; k < CELLS.maxFrames; k += 1) {
          const pk = planCut(face, { ...ctx, attempt: k, stop: p0.value.stop }, streams);
          if (pk.ok && pk.value.kind === 'cut') plans.push(pk.value);
        }
        if (plans.length !== CELLS.maxFrames) continue;
        const plot = planCut(face, { ...ctx, cutKind: 'plot' }, streams);
        if (!plot.ok || plot.value.kind !== 'cut' || !plot.value.cut.bent) continue;
        return { face, ctx, streams: mk, wMinCm: minFrontage(fd.bands) * 100, plans, plot: plot.value, wayFillet };
      }
    }
  }
  throw new Error('no face planned a cut at every frame with a bent plot plan');
}

describe('checkFacePlans: the plans at attempts 0 – 2 and the plot clause (C-0256 (7))', () => {
  const F = threeFrameFace();
  const run = (plan?: typeof planCut) => {
    const t = tallies();
    checkFacePlans(t, F.face, F.ctx, F.streams(), CELLS, F.wMinCm, 'face', plan);
    return checksOf(t);
  };
  const perPlan = (p: CutPlanned) => {
    const t = tallies();
    checkPlan(t, p, CELLS, F.wMinCm, 'one');
    return checksOf(t);
  };

  it('checks every frame\'s plan and the plot plan: the counts are the three plans\' sum (+ 1 plot clause), none failing', () => {
    expect(CELLS.maxFrames).toBe(3);
    const c = run();
    const sum = (b: 'T36-1' | 'T37-1' | 'T38-1') => F.plans.reduce((a, p) => a + perPlan(p)[b].checked, 0);
    for (const p of F.plans) expect(perPlan(p)['T36-1'].checked).toBeGreaterThanOrEqual(3);
    expect([c['T36-1'].checked, c['T37-1'].checked, c['T38-1'].checked]).toEqual([sum('T36-1'), sum('T37-1'), sum('T38-1') + 1]);
    expect([c['T36-1'].failed, c['T37-1'].failed, c['T38-1'].failed]).toEqual([0, 0, 0]);
    // The frames are the turned ones: attempt k's plan is frame k's.
    expect(F.plans.map((p) => p.attempt)).toEqual([0, 1, 2]);
  });

  it('a break planted in frame 1\'s plan alone fails T36-1, named at frame 1', () => {
    const broken: typeof planCut = (face, ctx, streams) => {
      const r = planCut(face, ctx, streams);
      if ((ctx.attempt ?? 0) !== 1 || (ctx.cutKind ?? 'way') !== 'way' || !r.ok || r.value.kind !== 'cut') return r;
      const draws = [...r.value.draws];
      const pos = draws.findIndex((d) => d.step === 'position');
      draws.splice(pos + 1, 0, r.value.draws[pos]);
      return { ...r, value: { ...r.value, draws } };
    };
    const c = run(broken);
    expect(c['T36-1'].failed).toBe(1);
    expect(c['T36-1'].first[0]).toContain('face frame 1:');
  });

  it('T38-1 fails when the face planned as a plot cut comes back filleted', () => {
    const filleted: typeof planCut = (face, ctx, streams) => {
      const r = planCut(face, ctx, streams);
      if (ctx.cutKind !== 'plot' || !r.ok || r.value.kind !== 'cut') return r;
      return { ...r, value: { ...r.value, cut: { ...r.value.cut, fillet: F.wayFillet } } };
    };
    const c = run(filleted);
    expect([c['T38-1'].failed, c['T38-1'].first]).toEqual([1, ['face: a plot cut filleted']]);
  });

  it('plotCutSharp: sharp because plot holds; a filleted, otherwise-sharp or fillet-less plot corner fails; no corner, no clause', () => {
    const p = F.plot;
    const fl = p.cut.fillet as NonNullable<typeof p.cut.fillet>;
    expect([fl.filleted, fl.sharpBecause]).toEqual([false, 'plot']);
    expect(plotCutSharp(p)).toBe(true);
    expect(plotCutSharp({ ...p, cut: { ...p.cut, fillet: F.wayFillet } })).toBe(false);
    expect(plotCutSharp({ ...p, cut: { ...p.cut, fillet: { ...fl, filleted: true } } })).toBe(false);
    expect(plotCutSharp({ ...p, cut: { ...p.cut, fillet: { ...fl, sharpBecause: 'drawn' } } })).toBe(false);
    expect(plotCutSharp({ ...p, cut: { ...p.cut, fillet: null } })).toBe(false);
    expect(plotCutSharp({ ...p, cut: { ...p.cut, bent: false } })).toBeNull();
    expect(plotCutSharp({ kind: 'block', stop: p.stop, minorCm: p.minorCm, draws: p.draws, attempt: 0 })).toBeNull();
  });
});
