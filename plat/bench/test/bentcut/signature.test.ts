// The bent-cut signature measured on ours (M0-b-04; §13.5's bent-cut row, §4.6 steps 2–6, §16 M0 (b)'s corner and
// arrival clauses judged here, C-0073; M0-k-05's metric functions, one metricVersion): the measures on a hand-built face,
// the replay that finds each committed cut's plan, the fillet share on a face set whose legs are all shorter than
// w_min, and the two clauses on the PR tier's sample of the M0 (b) faces.
import { chainRuns, workingFrame } from '@plat/layout';
import type { Cm, LatticePoint } from '@plat/kernel';
import { cutSigma, metricById, type MetricDoc } from '@plat/testkit';
import { runS8 } from '@plat/layout';
import { describe, expect, it } from 'vitest';
import {
  districtSeed,
  faceAt,
  faceDistrict,
  foldSignature,
  GROUND,
  lands,
  LAND_TOL_CM,
  lineAngleCdeg,
  M0B_KINDS,
  measureCut,
  placeAlong,
  replayDistrict,
  runFull,
  signatureRow,
  signatureTasks,
  type CutSample,
  type FaceDistrict,
  type FrameLine,
  type FullRecord,
  type SignatureCut,
} from '../../src/bentcut/index.js';

const P = (x: number, y: number): LatticePoint => ({ x: x as Cm, y: y as Cm });

/** A 300 m × 100 m rectangle (cm), counter-clockwise. */
const RECT = [P(0, 0), P(30_000, 0), P(30_000, 10_000), P(0, 10_000)];

function rectFrame(): FrameLine {
  const f = workingFrame({ rings: [RECT] }, 0);
  if (!f.ok) throw new Error('frame');
  return { centre: f.value.centre, major: f.value.major, sMin: f.value.sMin, lengthCm: f.value.lengthCm };
}

function sample(over: Partial<CutSample> = {}): CutSample {
  const frame = rectFrame();
  // A at the middle of the lower long side; the first leg up the minor axis; K at mid-course; the far side the upper one.
  return {
    frame,
    frame0: frame,
    turnCdeg: 0,
    attempt: 0,
    legs: [{ x: 15_000, y: 0 }, { x: 15_000, y: 5_000 }, { x: 15_400, y: 10_000 }],
    lambdaCm: 10_000,
    farDir: { x: 1, y: 0 },
    arrivalCross2: -1,
    points: [{ x: 15_000, y: 0 }, { x: 15_000, y: 5_000 }, { x: 15_400, y: 10_000 }],
    filleted: false,
    holed: false,
    wMinCm: 678,
    ...over,
  };
}

describe('the signature measures on a hand-built face', () => {
  it('a fixed start gives σ = 0 and a square arrival 90°', () => {
    // Three cuts from the same start A, the second leg square onto the far side.
    const square = sample({ legs: [{ x: 15_000, y: 0 }, { x: 15_000, y: 5_000 }, { x: 15_000, y: 10_000 }], points: [{ x: 15_000, y: 0 }, { x: 15_000, y: 10_000 }] });
    const cuts = [measureCut('curved', square), measureCut('curved', square), measureCut('curved', square)];
    expect(cuts[0].startT).toBe(0.5);
    expect(cuts[0].arrivalCdeg).toBe(9000);
    const doc: MetricDoc = { ways: [], cuts };
    expect(cutSigma(doc).get('all')).toBe(0);
    const row = signatureRow(cuts);
    expect(row.sigma).toBe(0);
    expect(row.arrival85).toBe(1);
    // A start moved along the axis moves σ by hand's arithmetic: starts 0.4, 0.5, 0.6 → σ = 0.1.
    const at = (x: number): SignatureCut => measureCut('curved', sample({ legs: [{ x, y: 0 }, { x, y: 5_000 }, { x, y: 10_000 }] }));
    expect(signatureRow([at(12_000), at(15_000), at(18_000)]).sigma).toBeCloseTo(0.1, 12);
  });

  it('measures the start, the corner, the arrival, the bends and the fillet as stated', () => {
    const c = measureCut('holed', sample({ holed: true, filleted: true }));
    expect(c.faceKind).toBe('ring');
    expect(c.bends).toBe(1);
    expect(c.fillet).toBe(true);
    expect(c.startT).toBe(0.5);
    // K at 5 000 cm along a 10 000 cm first-leg course: mid-course.
    expect(c.cornerT).toBe(0.5);
    // The second leg (400, 5 000) against the far side (1, 0): atan2(5 000, 400) ≈ 85.43°.
    expect(c.arrivalCdeg).toBeCloseTo((Math.atan2(5000, 400) * 18000) / Math.PI, 9);
    expect(c.shortLegCm).toBeCloseTo(5000, 9);
    expect(c.lengthCm).toBeCloseTo(5000 + Math.hypot(400, 5000), 9);
    // A straight cut: no corner, no fillet, its one leg's arrival.
    const s = measureCut('curved', sample({ legs: [{ x: 15_000, y: 0 }, { x: 14_000, y: 10_000 }], filleted: true }));
    expect(s.bends).toBe(0);
    expect(s.cornerT).toBeUndefined();
    expect(s.fillet).toBe(false);
    expect(s.arrivalCdeg).toBeCloseTo((Math.atan2(10_000, 1_000) * 18000) / Math.PI, 9);
    // A turned frame: the start's place is read along that frame's axis; startT0 along the first.
    const turned: FrameLine = { centre: { x: 15_000, y: 5_000 }, major: { x: 0, y: 1 }, sMin: -5_000, lengthCm: 10_000 };
    const t = measureCut('curved', sample({ frame: turned, attempt: 1, turnCdeg: 3600 }));
    expect(t.startT).toBe(0);
    expect(t.startT0).toBe(0.5);
    expect(t.attempt).toBe(1);
    expect(placeAlong(rectFrame(), { x: 30_000, y: 0 })).toBe(1);
  });

  it('the arrival folds a line angle into 0 – 90° whatever the directions’ senses', () => {
    expect(lineAngleCdeg({ x: 0, y: 1 }, { x: 1, y: 0 })).toBe(9000);
    expect(lineAngleCdeg({ x: 0, y: -1 }, { x: -1, y: 0 })).toBe(9000);
    expect(lineAngleCdeg({ x: 1, y: 0 }, { x: -1, y: 0 })).toBe(0);
    expect(lineAngleCdeg({ x: 1, y: 1 }, { x: 1, y: 0 })).toBeCloseTo(4500, 9);
    expect(lineAngleCdeg({ x: -1, y: 1 }, { x: 1, y: 0 })).toBeCloseTo(4500, 9);
  });

  it('a hand-built rectangle through S8: every planner cut replayed, its arrival square, and the same start twice gives σ = 0', { timeout: 120_000 }, () => {
    const run = (): SignatureCut[] => {
      const fd = faceDistrict([RECT], 77);
      const r = replayDistrict(fd, 'curved');
      if ('error' in r) throw new Error(r.error);
      expect(r.counts.missed).toBe(0);
      expect(r.counts.matched).toBe(r.counts.planner);
      return r.cuts;
    };
    const a = run();
    const b = run();
    expect(a.length).toBeGreaterThan(1);
    for (const c of a) expect(c.arrivalCdeg).toBeGreaterThan(8990);
    // The first cut of each run: one start, σ = 0.
    expect(signatureRow([a[0], b[0]]).sigma).toBe(0);
  });
});

describe('the replay', () => {
  it('runs S8’s own batch: the same report as runS8, and every planner cut lands on its committed lane', { timeout: 600_000 }, () => {
    let cuts = 0;
    for (const kind of M0B_KINDS) {
      for (let i = 0; i < 2; i += 1) {
        const face = faceAt(kind, i, 2);
        const fd = faceDistrict(face.polygon, 900 + i);
        const r = replayDistrict(fd, kind);
        if ('error' in r) throw new Error(r.error);
        expect(r.overLimit).toBe(false);
        const own = runS8(faceDistrict(face.polygon, 900 + i).input, { report: undefined } as never);
        expect(own.ok).toBe(true);
        if (!own.ok) continue;
        expect(r.report).toEqual(own.value.infill.report.districts[0]);
        expect(r.counts.missed).toBe(0);
        expect(r.counts.matched).toBe(r.counts.planner);
        expect(r.counts.planner + r.counts.fallback + r.counts.deep).toBe(r.counts.cuts);
        expect(r.counts.cuts).toBe(own.value.lanes.length);
        // The replay leaves the arena as it found it (its transaction is rejected).
        expect(r.facesAfter).toBeGreaterThanOrEqual(1);
        cuts += r.cuts.length;
        for (const c of r.cuts) {
          expect(c.kind).toBe(kind);
          expect(c.startT).toBeGreaterThanOrEqual(0);
          expect(c.startT).toBeLessThanOrEqual(1);
        }
      }
    }
    expect(cuts).toBeGreaterThan(20);
  });

  it('lands: a chain within attractCm + 1 cm both ways lands; one shifted further does not', () => {
    const lane = [P(0, 0), P(10_000, 0), P(10_000, 5_000)];
    expect(lands(lane, lane)).toBe(true);
    const near = lane.map((p) => ({ x: p.x, y: p.y + LAND_TOL_CM }));
    expect(lands(near, lane)).toBe(true);
    const far = lane.map((p) => ({ x: p.x, y: p.y + LAND_TOL_CM + 1 }));
    expect(lands(far, lane)).toBe(false);
    // A shorter plan is not a landing: the committed lane's far vertices lie away from it.
    expect(lands(lane.slice(0, 2), lane)).toBe(false);
  });

  it('lands at the absolute tolerance: attractCm (26 cm) + 1 cm — a 27 cm offset lands, a 28 cm one is refused (N-5)', () => {
    expect(LAND_TOL_CM).toBe(27);
    const lane = [P(0, 0), P(10_000, 0), P(10_000, 5_000)];
    const by = (d: number) => lane.map((p) => ({ x: p.x - d, y: p.y + d }));
    expect(lands(lane.map((p) => ({ x: p.x, y: p.y + 27 })), lane)).toBe(true);
    expect(lands(lane.map((p) => ({ x: p.x, y: p.y + 28 })), lane)).toBe(false);
    // Either way round, and off the bend's other leg too.
    expect(lands(lane, lane.map((p) => ({ x: p.x, y: p.y - 28 })))).toBe(false);
    expect(lands(by(19), lane)).toBe(true);
    expect(lands(by(20), lane)).toBe(false);
  });

  it('a rung-(c) lane is the ladder’s own: counted, never replayed as a planner cut (K12; F-CUT concave #106, seed 1)', { timeout: 600_000 }, () => {
    // Every frame of rung (a) planned nothing on #106 and its depth-0 ladder cut by rung (c) (M0-b-03's Q65).
    const fd = faceDistrict(faceAt('concave', 106, 1).polygon, districtSeed('concave', 1, 106));
    const r = replayDistrict(fd, 'concave');
    if ('error' in r) throw new Error(r.error);
    const made = r.report.rungs.filter((x) => x.outcome === 'cut' || x.outcome === 'slit');
    expect(made[0]?.rung).toBe('c');
    expect(r.counts.fallback).toBeGreaterThanOrEqual(1);
    expect(r.counts.fallback).toBe(made.filter((x) => x.rung !== 'a' && x.rung !== 'deep').length);
    expect([r.counts.missed, r.counts.matched]).toEqual([0, r.counts.planner]);
    expect(r.cuts.length).toBe(r.counts.matched);
    // The committed arrival reads every lane, the ladder's own among them.
    expect(r.arrivals.all.ends + r.arrivals.all.unmeasured).toBe(2 * r.counts.cuts);
    expect(r.arrivals.planner.ends + r.arrivals.planner.unmeasured).toBe(2 * r.counts.planner);
  });

  it('a replay over S8’s own limit is not S8’s run: S8’s own run stands, unmeasured (K21; the replay seam)', { timeout: 600_000 }, () => {
    const t = { phase: 'full' as const, kind: 'curved' as const, i: 0, seed: 1, replay: true };
    const measured = runFull(t);
    expect(measured.counts).not.toBeNull();
    const over = runFull(t, { replay: (fd: FaceDistrict, kind) => {
      const r = replayDistrict(fd, kind);
      return 'error' in r ? r : { ...r, overLimit: true };
    } });
    const own = runFull({ phase: 'full', kind: 'curved', i: 0, seed: 1 });
    expect(over).toEqual(own);
    expect([over.counts, over.arrivals, over.cuts]).toEqual([null, null, []]);
    // And the fold counts it unreplayed: the replay gate fails (N-3).
    const s = foldSignature([measured, over]);
    expect([s.replay.notReplayed, s.replay.pass]).toEqual([1, false]);
  });
});

describe('the fillet share', () => {
  it('is 0 on a face set whose legs are all shorter than w_min, and above 0 on the same faces at the shipped w_min', { timeout: 600_000 }, () => {
    const faces = M0B_KINDS.flatMap((k) => [0, 1, 2].map((i) => ({ kind: k, f: faceAt(k, i, 4) })));
    const measure = (wide: boolean): SignatureCut[] => {
      const out: SignatureCut[] = [];
      faces.forEach(({ kind, f }, ix) => {
        const fd = faceDistrict(f.polygon, 40 + ix);
        // w_min is the band's lowest frontage (§4.6 step 6): 2 km, longer than any leg of a CITY-block face.
        const bands = wide ? { ...fd.bands, frontageM: [2_000, 2_500] as [number, number] } : fd.bands;
        const r = replayDistrict(wide ? faceDistrict(f.polygon, 40 + ix, { bands }) : fd, kind);
        if ('error' in r) throw new Error(r.error);
        out.push(...r.cuts);
      });
      return out;
    };
    const short = measure(true);
    const bent = short.filter((c) => c.bends === 1);
    expect(bent.length).toBeGreaterThan(5);
    // The precondition holds at the step under test: every leg of every bent cut is shorter than w_min.
    for (const c of bent) {
      expect(c.wMinCm).toBe(200_000);
      expect(c.lengthCm).toBeLessThan(c.wMinCm);
    }
    expect(signatureRow(short).fillet).toBe(0);
    expect(signatureRow(measure(false)).fillet).toBeGreaterThan(0);
  });
});

describe('§16 M0 (b)’s corner and arrival clauses on the PR tier’s sample of the M0 (b) faces (C-0073)', () => {
  it('the corner within 0.10 of mid-course on ≥ 80 % of bent cuts and the arrival ≥ 85° on ≥ 95 %, by M0-k-05’s metric functions', { timeout: 600_000 }, () => {
    const recs = signatureTasks(3, 1).map(runFull) as FullRecord[];
    const s = foldSignature(recs);
    expect(s.s8Refused).toBe(0);
    expect(s.replay.missed).toBe(0);
    expect(s.replay.matched).toBe(s.replay.planner);
    expect(s.corner.n).toBeGreaterThan(30);
    expect(s.corner.share).toBeGreaterThanOrEqual(0.8);
    expect(s.arrival.share).toBeGreaterThanOrEqual(0.95);
    expect(s.corner.pass && s.arrival.pass).toBe(true);
    expect(Object.keys(s.byKind)).toEqual([...M0B_KINDS]);
    // The shares are M0-k-05's measures of these cuts (one metricVersion; C-0180 (7)).
    const all = recs.flatMap((r) => r.cuts);
    const doc: MetricDoc = { ways: [], cuts: all };
    const cm = metricById('cut.cornerMid')?.measure(doc);
    expect(cm !== undefined && 'values' in cm ? cm.values.get('all') : null).toBe(s.corner.share);
    expect(s.metricVersions['cut.cornerMid']).toBe(metricById('cut.cornerMid')?.metricVersion);
    // σ and the fillet share are reported, never judged here (M0-b-05a, M0-b-05b).
    expect(s.sigmaAndFillet).toBe('reported');
    expect(typeof s.all.sigma).toBe('number');
    expect(typeof s.all.fillet).toBe('number');
    // The replay's gate holds and every bent cut carries its corner's place (N-3).
    expect([s.replay.notReplayed, s.replay.pass]).toEqual([0, true]);
    expect(s.corner.measured).toBe(s.corner.n);
    // K09: a cut is a ring cut only on a holed face — never on the hole-free kinds — and the holed faces have some.
    for (const k of M0B_KINDS) if (k !== 'holed') expect([k, s.byKind[k].ring]).toEqual([k, 0]);
    expect(s.byKind['holed'].ring).toBeGreaterThan(0);
    // The committed-geometry arrival is reported beside the judged one, every lane end measured (N-2).
    const ca = s.committedArrival;
    expect(ca.verdict).toBe('reported');
    expect(ca.planner.ends + ca.planner.unmeasured).toBe(2 * s.replay.planner);
    expect(ca.all.ends + ca.all.unmeasured).toBe(2 * s.replay.cuts);
    expect(ca.all.share).toBe(ca.all.at85 / ca.all.ends);
    expect(Object.keys(ca.byKind)).toEqual([...M0B_KINDS]);
    expect(ca.all.ends).toBe(M0B_KINDS.reduce((n, k) => n + ca.byKind[k].all.ends, 0));
  });

  it('the fold judges the two clauses at their bounds', () => {
    const cut = (cornerT: number, arrival: number): SignatureCut => ({ kind: 'curved', faceKind: 'plain', startT: 0.5, startT0: 0.5, bends: 1, cornerT, arrivalCdeg: arrival, arrivalChordCdeg: arrival, fillet: false, lengthCm: 1, attempt: 0, turnCdeg: 0, wMinCm: 1 });
    const recOf = (cuts: SignatureCut[]): FullRecord => ({ phase: 'full', kind: 'curved', i: 0, setup: null, refused: null, cuts, counts: { cuts: cuts.length, planner: cuts.length, fallback: 0, deep: 0, matched: cuts.length, missed: 0, misses: [] }, arrivals: null }) as unknown as FullRecord;
    const mid = (n: number): SignatureCut[] => Array.from({ length: n }, () => cut(0.5, 9000));
    // 8 of 10 corners within 0.10 (0.6 sits on the bound): passes; 7 of 10 fails.
    expect(foldSignature([recOf([...mid(7), cut(0.6, 9000), cut(0.75, 9000), cut(0.1, 9000)])]).corner.pass).toBe(true);
    expect(foldSignature([recOf([...mid(7), cut(0.61, 9000), cut(0.75, 9000), cut(0.1, 9000)])]).corner.pass).toBe(false);
    // 19 of 20 arrivals at ≥ 85° passes; 18 of 20 fails; 85° itself counts.
    expect(foldSignature([recOf([...mid(19), cut(0.5, 8499)])]).arrival.pass).toBe(true);
    expect(foldSignature([recOf([...mid(18), cut(0.5, 8500), cut(0.5, 8499), cut(0.5, 8000)])]).arrival.share).toBeCloseTo(19 / 21, 12);
    expect(foldSignature([recOf([...mid(18), cut(0.5, 8499), cut(0.5, 8000)])]).arrival.pass).toBe(false);
    // Either side of each bound by one cut in a hundred (or two hundred): 0.79 and 0.945 fail, 0.80 and 0.95 pass.
    const off = (n: number, bad: SignatureCut): SignatureCut[] => [...mid(100 - n), ...Array.from({ length: n }, () => bad)];
    expect(foldSignature([recOf(off(21, cut(0.75, 9000)))]).corner.pass).toBe(false);
    expect(foldSignature([recOf(off(20, cut(0.75, 9000)))]).corner.pass).toBe(true);
    expect(foldSignature([recOf([...off(5, cut(0.5, 8000)), ...off(6, cut(0.5, 8000))])]).arrival.share).toBeCloseTo(189 / 200, 12);
    expect(foldSignature([recOf([...off(5, cut(0.5, 8000)), ...off(6, cut(0.5, 8000))])]).arrival.pass).toBe(false);
    expect(foldSignature([recOf(off(5, cut(0.5, 8000)))]).arrival.pass).toBe(true);
    // No cut: neither clause passes.
    const none = foldSignature([recOf([])]);
    expect([none.corner.pass, none.arrival.pass]).toEqual([false, false]);
  });

  it('the replay gate: a missed planner cut or a district not replayed fails it; a bent cut with no corner place fails the corner clause (N-3)', () => {
    const cut = (cornerT: number | undefined): SignatureCut => ({ kind: 'curved', faceKind: 'plain', startT: 0.5, startT0: 0.5, bends: 1, ...(cornerT === undefined ? {} : { cornerT }), arrivalCdeg: 9000, arrivalChordCdeg: 9000, fillet: false, lengthCm: 1, attempt: 0, turnCdeg: 0, wMinCm: 1 });
    const recOf = (cuts: SignatureCut[], missed = 0): FullRecord => ({ phase: 'full', kind: 'curved', i: 0, setup: null, refused: null, cuts, counts: { cuts: cuts.length + missed, planner: cuts.length + missed, fallback: 0, deep: 0, matched: cuts.length, missed, misses: [] }, arrivals: null }) as unknown as FullRecord;
    const ten = Array.from({ length: 10 }, () => cut(0.5));
    const ok = foldSignature([recOf(ten)]);
    expect([ok.replay.pass, ok.corner.pass, ok.corner.measured, ok.corner.n]).toEqual([true, true, 10, 10]);
    const missed = foldSignature([recOf(ten, 1)]);
    expect([missed.replay.missed, missed.replay.pass, missed.corner.pass, missed.arrival.pass]).toEqual([1, false, true, true]);
    const unreplayed = foldSignature([recOf(ten), { ...recOf([]), counts: null } as FullRecord]);
    expect([unreplayed.replay.notReplayed, unreplayed.replay.pass]).toEqual([1, false]);
    // Nine of ten corners at mid-course and one bent cut with no λ: the share (9 / 9) would pass, the clause does not.
    const unplaced = foldSignature([recOf([...ten.slice(0, 9), cut(undefined)])]);
    expect([unplaced.corner.share, unplaced.corner.n, unplaced.corner.measured, unplaced.corner.pass]).toEqual([1, 10, 9, false]);
  });

  it('a district S8 refused fails both clauses, whatever the other districts measure (K13, K27)', () => {
    const cut: SignatureCut = { kind: 'curved', faceKind: 'plain', startT: 0.5, startT0: 0.5, bends: 1, cornerT: 0.5, arrivalCdeg: 9000, arrivalChordCdeg: 9000, fillet: false, lengthCm: 1, attempt: 0, turnCdeg: 0, wMinCm: 1 };
    const good = { phase: 'full', kind: 'curved', i: 0, setup: null, refused: null, cuts: Array.from({ length: 10 }, () => cut), counts: { cuts: 10, planner: 10, fallback: 0, deep: 0, matched: 10, missed: 0, misses: [] }, arrivals: null } as unknown as FullRecord;
    expect([foldSignature([good]).corner.pass, foldSignature([good]).arrival.pass]).toEqual([true, true]);
    const refused = { ...good, i: 1, refused: 'E_WORK_LIMIT planted', cuts: [], counts: null } as FullRecord;
    const s = foldSignature([good, refused]);
    expect([s.s8Refused, s.corner.pass, s.arrival.pass]).toEqual([1, false, false]);
    // A face the kernel would not build is no S8 input: outside both clauses.
    const setup = foldSignature([good, { ...refused, refused: null, setup: 'E_X' } as FullRecord]);
    expect([setup.setupRefused, setup.corner.pass, setup.arrival.pass]).toEqual([1, true, true]);
  });

  it('the committed arrival folds its ends per kind and pooled, the planner lanes apart (N-2)', () => {
    const a = (pe: number, p85: number, pu: number, ae: number, a85: number, au: number) => ({ planner: { ends: pe, at85: p85, unmeasured: pu }, all: { ends: ae, at85: a85, unmeasured: au } });
    const recOf = (kind: string, arrivals: ReturnType<typeof a> | null): FullRecord => ({ phase: 'full', kind, i: 0, setup: null, refused: null, cuts: [], counts: { cuts: 0, planner: 0, fallback: 0, deep: 0, matched: 0, missed: 0, misses: [] }, arrivals }) as unknown as FullRecord;
    const s = foldSignature([recOf('holed', a(4, 3, 0, 6, 4, 1)), recOf('curved', a(2, 2, 1, 2, 2, 1)), recOf('holed', a(0, 0, 0, 2, 1, 0))]);
    expect(s.committedArrival.planner).toEqual({ ends: 6, at85: 5, unmeasured: 1, share: 5 / 6 });
    expect(s.committedArrival.all).toEqual({ ends: 10, at85: 7, unmeasured: 2, share: 0.7 });
    expect(Object.keys(s.committedArrival.byKind)).toEqual(['curved', 'holed']);
    expect(s.committedArrival.byKind['holed']).toEqual({ planner: { ends: 4, at85: 3, unmeasured: 0, share: 0.75 }, all: { ends: 8, at85: 5, unmeasured: 1, share: 0.625 } });
    expect(foldSignature([recOf('curved', null)]).committedArrival.all).toEqual({ ends: 0, at85: 0, unmeasured: 0, share: null });
  });
});

/**
 * The committed arrivals of a district S8 committed, read here apart from signature.ts: each lane's end against the one
 * chain passing through it among the face's rings and the lanes inserted before it — found by walking each chain's own
 * runs for the end point (chainRuns), not the end vertex's edges — or the one chain ending there.
 */
function arrivalsApart(fd: FaceDistrict, holes: number, lanes: readonly string[], planner: readonly boolean[]): { planner: [number, number]; all: [number, number] } {
  const angle = (u: { x: number; y: number }, v: { x: number; y: number }): number => (Math.atan2(Math.abs(u.x * v.y - u.y * v.x), Math.abs(u.x * v.x + u.y * v.y)) * 18_000) / Math.PI;
  const rings = [{ role: 'district_bound', entity: 'district_bound:f' }, ...Array.from({ length: holes }, (_, h) => ({ role: 'reserved', entity: `reservation:h${String(h + 1)}` }))];
  const out = { planner: [0, 0] as [number, number], all: [0, 0] as [number, number] };
  lanes.forEach((id, i) => {
    const runs = chainRuns(fd.plat, GROUND, { role: 'way', entity: id });
    expect(runs.length).toBe(1);
    const run = runs[0];
    for (const [e, n] of [[0, 1], [run.length - 1, run.length - 2]] as const) {
      const E = run[e];
      const leg = { x: run[n].x - E.x, y: run[n].y - E.y };
      const through: { x: number; y: number }[] = [];
      const ending: { x: number; y: number }[] = [];
      for (const ref of [...rings, ...lanes.slice(0, i).map((entity) => ({ role: 'way', entity }))]) {
        for (const q of chainRuns(fd.plat, GROUND, ref)) {
          const closed = q[0].x === q[q.length - 1].x && q[0].y === q[q.length - 1].y;
          for (let k = 0; k < q.length; k += 1) {
            if (q[k].x !== E.x || q[k].y !== E.y || (closed && k === q.length - 1)) continue;
            const prev = k > 0 ? q[k - 1] : closed ? q[q.length - 2] : null;
            const next = k < q.length - 1 ? q[k + 1] : null;
            if (prev !== null && next !== null) through.push({ x: next.x - prev.x, y: next.y - prev.y });
            else ending.push(prev ?? (next as { x: number; y: number }));
          }
        }
      }
      let dir: { x: number; y: number } | null = null;
      if (through.length === 1) dir = through[0];
      else if (through.length === 0 && ending.length === 1) dir = { x: E.x - ending[0].x, y: E.y - ending[0].y };
      expect(dir).not.toBeNull();
      if (dir === null) continue;
      const sq = angle(leg, dir) >= 8500 ? 1 : 0;
      out.all[0] += 1;
      out.all[1] += sq;
      if (planner[i]) {
        out.planner[0] += 1;
        out.planner[1] += sq;
      }
    }
  });
  return out;
}

describe('the arrival read from the committed geometry (hardening S3, N-2)', () => {
  it('equals, on S8’s committed arena, the ends counted apart; square on the hand-built rectangle', { timeout: 600_000 }, () => {
    const cases: { kind: (typeof M0B_KINDS)[number]; polygon: LatticePoint[][]; seed: number; holes: number }[] = [{ kind: 'curved', polygon: [RECT], seed: 77, holes: 0 }];
    for (const kind of M0B_KINDS) for (const i of [0, 1]) {
      const f = faceAt(kind, i, 2);
      cases.push({ kind, polygon: f.polygon as LatticePoint[][], seed: 900 + i, holes: f.polygon.length - 1 });
    }
    let differs = 0;
    for (const c of cases) {
      const r = replayDistrict(faceDistrict(c.polygon, c.seed), c.kind);
      if ('error' in r) throw new Error(r.error);
      const fd = faceDistrict(c.polygon, c.seed);
      const own = runS8(fd.input, { report: undefined } as never);
      expect(own.ok).toBe(true);
      if (!own.ok) continue;
      const made = own.value.infill.report.districts[0].rungs.filter((x) => x.outcome === 'cut' || x.outcome === 'slit');
      const apart = arrivalsApart(fd, c.holes, own.value.lanes.map((l) => l.id), made.map((x) => x.rung === 'a'));
      expect([c.kind, r.arrivals.all.unmeasured, r.arrivals.planner.unmeasured]).toEqual([c.kind, 0, 0]);
      expect([c.kind, [r.arrivals.all.ends, r.arrivals.all.at85], [r.arrivals.planner.ends, r.arrivals.planner.at85]]).toEqual([c.kind, apart.all, apart.planner]);
      if (c.polygon[0] === RECT) expect(r.arrivals.all.at85).toBe(r.arrivals.all.ends);
      if (r.arrivals.all.at85 < r.arrivals.all.ends) differs += 1;
    }
    // Not square by construction: some committed lane ends arrive under 85° on these faces.
    expect(differs).toBeGreaterThan(0);
  });
});
