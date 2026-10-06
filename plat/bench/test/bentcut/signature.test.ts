// The bent-cut signature measured on ours (M0-b-04; §13.5's bent-cut row, §4.6 steps 2–6, §16 M0 (b)'s corner and
// arrival clauses judged here, C-0073; M0-k-05's metric functions, one metricVersion): the measures on a hand-built face,
// the replay that finds each committed cut's plan, the fillet share on a face set whose legs are all shorter than
// w_min, and the two clauses on the PR tier's sample of the M0 (b) faces.
import { workingFrame } from '@plat/layout';
import type { Cm, LatticePoint } from '@plat/kernel';
import { cutSigma, metricById, type MetricDoc } from '@plat/testkit';
import { runS8 } from '@plat/layout';
import { describe, expect, it } from 'vitest';
import {
  faceAt,
  faceDistrict,
  foldSignature,
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
  });

  it('the fold judges the two clauses at their bounds', () => {
    const cut = (cornerT: number, arrival: number): SignatureCut => ({ kind: 'curved', faceKind: 'plain', startT: 0.5, startT0: 0.5, bends: 1, cornerT, arrivalCdeg: arrival, arrivalChordCdeg: arrival, fillet: false, lengthCm: 1, attempt: 0, turnCdeg: 0, wMinCm: 1 });
    const recOf = (cuts: SignatureCut[]): FullRecord => ({ phase: 'full', kind: 'curved', i: 0, setup: null, refused: null, cuts, counts: { cuts: cuts.length, planner: cuts.length, fallback: 0, deep: 0, matched: cuts.length, missed: 0, misses: [] } }) as unknown as FullRecord;
    const mid = (n: number): SignatureCut[] => Array.from({ length: n }, () => cut(0.5, 9000));
    // 8 of 10 corners within 0.10 (0.6 sits on the bound): passes; 7 of 10 fails.
    expect(foldSignature([recOf([...mid(7), cut(0.6, 9000), cut(0.75, 9000), cut(0.1, 9000)])]).corner.pass).toBe(true);
    expect(foldSignature([recOf([...mid(7), cut(0.61, 9000), cut(0.75, 9000), cut(0.1, 9000)])]).corner.pass).toBe(false);
    // 19 of 20 arrivals at ≥ 85° passes; 18 of 20 fails; 85° itself counts.
    expect(foldSignature([recOf([...mid(19), cut(0.5, 8499)])]).arrival.pass).toBe(true);
    expect(foldSignature([recOf([...mid(18), cut(0.5, 8500), cut(0.5, 8499), cut(0.5, 8000)])]).arrival.share).toBeCloseTo(19 / 21, 12);
    expect(foldSignature([recOf([...mid(18), cut(0.5, 8499), cut(0.5, 8000)])]).arrival.pass).toBe(false);
    // No cut: neither clause passes.
    const none = foldSignature([recOf([])]);
    expect([none.corner.pass, none.arrival.pass]).toEqual([false, false]);
  });
});
