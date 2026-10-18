// M0-k-05's metric tests (§13.5, §13.2, §4.4; C-0018, C-0116, C-0180): every M0 metric unit-tested with its
// metricVersion — R4 (a grid gives 1, uniformly random orientations ≈ 0), turning per 100 m (a straight street 0, a
// circle of radius r the analytic value within 2 %), heading change per 50 m, growth drift, the no-cliff clause, the
// junction census with its 2 m merge, the street signature inside the wall, the block metrics and the bent-cut
// signature — and the registry: attachment A's ids, units and versions (N-20), the ⟨M-1⟩ set (C-0116, a snapshot).
import { describe, expect, it } from 'vitest';
import { UNITS } from '@plat/tables';
import {
  armGapsDeg,
  blockAreas,
  blockAxis,
  blockCountsByTemplate,
  blocksPerHa,
  courtShare,
  courtShareByBand,
  cutArrival85,
  cutCornerMid,
  cutFillet,
  cutLengths,
  cutSigma,
  growthDrift600m,
  hasStraightPair,
  headingChange50m,
  isMetricKey,
  junctionDegreeHistogram,
  keyOfRowId,
  m1Metrics,
  M1_CELLS_LATER,
  measureSeeds,
  metricById,
  METRICS,
  METRICS_VERSION,
  r4Samples,
  resampleArc,
  streetGraph,
  turnCliff,
  turningPer100m,
  turnSteps10m,
  wallAlignment,
  type MetricCut,
  type MetricDoc,
} from '../../src/index.js';
import { arc, block, P, prng, rect, way } from './support.js';

const value = (doc: MetricDoc, id: string, key = 'all'): number | readonly number[] | undefined => {
  const m = (metricById(id) ?? { measure: () => ({ notApplicable: 'unregistered' }) }).measure(doc);
  return 'values' in m ? m.values.get(key) : undefined;
};
const naOf = (doc: MetricDoc, id: string): string | undefined => {
  const m = metricById(id)?.measure(doc);
  return m !== undefined && 'notApplicable' in m ? m.notApplicable : undefined;
};

describe('the registry (N-20, N-24, C-0116)', () => {
  it("holds attachment A's twenty ids exactly, with their units and metricVersion 1.0.0 (a snapshot)", () => {
    const a = [
      ['junction.angles', 'deg', 'vector'],
      ['junction.share4', 'share', 'scalar'],
      ['bldg.r4.60', 'ratio', 'scalar'],
      ['bldg.r4.120', 'ratio', 'scalar'],
      ['bldg.r4.250', 'ratio', 'scalar'],
      ['bldg.wallAlign.median', 'deg', 'vector'],
      ['bldg.wallAlign.share15', 'share', 'vector'],
      ['sgd.tShare', 'share', 'scalar'],
      ['sgd.deadEnds', 'perKm', 'scalar'],
      ['blockc.perHa', 'perHa', 'scalar'],
      ['blockc.lotsPer', 'count', 'scalar'],
      ['block.area', 'm2', 'distribution'],
      ['block.areaRel', 'ratio', 'distribution'],
      ['block.countTemplate', 'count', 'scalar'],
      ['block.courtShare', 'share', 'scalar'],
      ['cut.sigma', 'ratio', 'scalar'],
      ['cut.cornerMid', 'share', 'scalar'],
      ['cut.arrival85', 'share', 'scalar'],
      ['cut.fillet', 'share', 'scalar'],
      ['cut.length', 'm', 'distribution'],
    ];
    for (const [id, unit, form] of a) {
      const d = metricById(id);
      expect(d, id).toBeDefined();
      expect([d?.unit, d?.form, d?.metricVersion]).toEqual([unit, form, '1.0.0']);
    }
    expect(metricById('junction.angles')?.fields).toEqual(['median', 'p5']);
    expect(metricById('bldg.wallAlign.median')?.fields).toEqual(['b0_40', 'b40_100', 'b100_200']);
    expect(metricById('bldg.wallAlign.share15')?.fields).toEqual(['b0_40', 'b40_100', 'b100_200']);
    // M0's own four, and nothing else
    expect(METRICS.map((m) => m.id).filter((id) => !a.some((r) => r[0] === id))).toEqual(['street.turnPer100m', 'street.headingChange50m', 'street.turnStep10m', 'growth.drift600m']);
    expect(METRICS_VERSION).toBe('1.0.0');
  });

  it('every metric carries metricVersion, a unit of §2.1, a row, a measure, and ids unique and case-sensitive (N-24)', () => {
    const ids = new Set<string>();
    for (const m of METRICS) {
      expect(m.metricVersion).toMatch(/^\d+\.\d+\.\d+$/);
      expect(UNITS).toContain(m.unit);
      expect(m.row.length).toBeGreaterThan(0);
      expect(typeof m.measure).toBe('function');
      expect(ids.has(m.id)).toBe(false);
      ids.add(m.id);
      // a measure on an empty seed reads notApplicable, never a fabricated number
      const r = m.measure({ ways: [] });
      expect('notApplicable' in r, m.id).toBe(true);
    }
    expect(metricById('block.countTemplate')).toBeDefined();
    expect(metricById('block.counttemplate')).toBeUndefined();
  });

  it("the ⟨M-1⟩ set equals C-0116's list (a snapshot), and the later cells name their milestone", () => {
    expect(m1Metrics()).toEqual(['sgd.tShare', 'sgd.deadEnds', 'blockc.perHa', 'block.area', 'block.countTemplate', 'block.courtShare', 'cut.length']);
    expect(metricById('block.courtShare')?.refs.map((r) => [r.reference, r.m1 === true])).toEqual([
      ['NG', true],
      ['MFCG', true],
    ]);
    for (const id of m1Metrics()) expect(metricById(id)?.refs.some((r) => r.m1 === true)).toBe(true);
    for (const m of METRICS.filter((x) => !x.m1)) expect(m.refs.every((r) => r.m1 !== true), m.id).toBe(true);
    expect(metricById('blockc.lotsPer')?.from).toBe('M1');
    expect(M1_CELLS_LATER.map((c) => c.milestone)).toEqual(['M1', 'M1', 'M1', 'M1', 'M1', 'M1', 'M1']);
    expect(M1_CELLS_LATER[0].cell).toMatch(/^lots per block/);
    // the proxies (C-0018): R4 and wall alignment, never gated
    expect(METRICS.filter((m) => m.proxy !== undefined).map((m) => m.id)).toEqual(['bldg.r4.60', 'bldg.r4.120', 'bldg.r4.250', 'bldg.wallAlign.median', 'bldg.wallAlign.share15']);
  });

  it("reads a row id's trailing segments as N-25's subset and field", () => {
    const sigma = metricById('cut.sigma');
    const angles = metricById('junction.angles');
    if (sigma === undefined || angles === undefined) throw new Error('registry');
    expect(keyOfRowId(sigma, 'm1/cut.sigma/NG/plain')).toBe('plain');
    expect(keyOfRowId(sigma, 'm1/cut.sigma/NG/template-ring')).toBe('template-ring');
    expect(keyOfRowId(sigma, 'm1/cut.sigma/NG/class-holed')).toBe('class-holed');
    expect(keyOfRowId(sigma, 'm1/cut.sigma/NG/everything')).toBeNull();
    expect(keyOfRowId(sigma, 'm1/cut.sigma/NG/template-castle')).toBeNull();
    expect(keyOfRowId(angles, 'm1/junction.angles/NG/all/p5')).toBe('all/p5');
    expect(keyOfRowId(angles, 'm1/junction.angles/NG/all/mean')).toBeNull();
    expect(keyOfRowId(angles, 'all/p5')).toBeNull();
    expect(isMetricKey(angles, 'all')).toBe(false);
    expect(isMetricKey(sigma, 'all/median')).toBe(false);
  });
});

describe('street curves at 10 m resampling (§13.5 Curves, §13.2)', () => {
  it('resamples by arc length, dropping the tail shorter than one step', () => {
    const r = resampleArc([
      { x: 0, y: 0 },
      { x: 25, y: 0 },
      { x: 25, y: 7 },
    ]);
    expect(r.map((p) => [p.x, p.y])).toEqual([
      [0, 0],
      [10, 0],
      [20, 0],
      [25, 5],
    ]);
  });

  it('turning per 100 m: a straight street 0, whatever its vertex spacing', () => {
    const doc: MetricDoc = { ways: [way('a', [[0, 0], [3, 0], [77, 0], [400, 0]]), way('b', [[0, 50], [130, 50 + 130]])] };
    expect(turningPer100m(doc)).toBeCloseTo(0, 9);
    expect(value(doc, 'street.turnPer100m')).toBeCloseTo(0, 9);
  });

  it('turning per 100 m: a circle of radius r gives 36 000 / (2π r) degrees within 2 %', () => {
    for (const r of [60, 100, 250, 500]) {
      const doc: MetricDoc = { ways: [way('c', arc(r, 720))] };
      const analytic = 36000 / (2 * Math.PI * r);
      expect(Math.abs((turningPer100m(doc) - analytic) / analytic), `r ${r}`).toBeLessThan(0.02);
    }
  });

  it('turning reads street classes only, and heading change per 50 m is 5 steps of turn on a circle', () => {
    const doc: MetricDoc = { ways: [way('c', arc(100, 720)), way('q', arc(20, 100), { class: 'quay' }), way('p', arc(20, 100), { class: 'path' })] };
    expect(Math.abs(turningPer100m(doc) - 57.2958) / 57.2958).toBeLessThan(0.02);
    const h = headingChange50m(doc);
    expect(h.length).toBeGreaterThan(50);
    const per = 2 * Math.asin(5 / 100) * (180 / Math.PI) * 5;
    for (const x of h) expect(Math.abs(x - per)).toBeLessThan(0.2);
    expect(turnSteps10m({ ways: [way('s', [[0, 0], [9, 0]])] })).toEqual([]);
    expect(naOf({ ways: [way('s', [[0, 0], [9, 0]])] }, 'street.turnPer100m')).toBe('no value');
  });

  it('growth drift: the net turn of grown organic streets over each 600 m window', () => {
    const straight = way('s', [[0, 0], [1300, 0]], { grown: true });
    expect(growthDrift600m({ ways: [straight] })).toEqual([0, 0]);
    // a 600 m arc of radius 600 m turns 1 radian along its length: 59 turns between 60 steps
    const r = 600;
    const curved = way('c', arc(r, 400, 1 / (2 * Math.PI)), { grown: true });
    const d = growthDrift600m({ ways: [curved] });
    expect(d.length).toBe(1);
    expect(Math.abs(d[0] - (59 * 2 * Math.asin(5 / r) * 180) / Math.PI)).toBeLessThan(0.05);
    // not grown, or grown under a planned regime: not read
    expect(growthDrift600m({ ways: [{ ...curved, grown: false }, { ...curved, organic: false }] })).toEqual([]);
    // a curl counts whole: one and a half turns of a 95 m circle in 600 m exceed 180°
    const curl = way('k', arc(95, 900, 1.2), { grown: true });
    expect(growthDrift600m({ ways: [curl] })[0]).toBeGreaterThan(300);
  });

  it('the no-cliff clause: a hard clamp at 15° is a cliff, a tailing histogram is not', () => {
    const rnd = prng(7);
    const tail: number[] = [];
    for (let i = 0; i < 20000; i += 1) tail.push(Math.abs((rnd() + rnd() + rnd() - 1.5) * 9));
    expect(turnCliff(tail).cliff).toBe(false);
    const clamped = tail.map((t) => Math.min(t * 3, 14.5));
    const c = turnCliff(clamped);
    expect(c.cliff).toBe(true);
    expect(c.atDeg).toBe(15);
    expect(turnCliff([]).cliff).toBe(false);
    // below 15° an empty bin is no cliff
    expect(turnCliff([...Array(200).fill(3.5), ...Array(200).fill(5.5)]).cliff).toBe(false);
  });
});

describe('the street graph and the junction census (attachment A; §13.5 junction row)', () => {
  const plus: MetricDoc = { ways: [way('h', [[-50, 0], [0, 0], [50, 0]]), way('v', [[0, -50], [0, 0], [0, 50]])] };
  const tee: MetricDoc = { ways: [way('h', [[-50, 0], [0, 0], [50, 0]]), way('v', [[0, 0], [0, 50]])] };
  const wye: MetricDoc = {
    ways: [way('a', [[0, 0], [50, 0]]), way('b', [[0, 0], [50 * Math.cos((2 * Math.PI) / 3), 50 * Math.sin((2 * Math.PI) / 3)]]), way('c', [[0, 0], [50 * Math.cos((4 * Math.PI) / 3), 50 * Math.sin((4 * Math.PI) / 3)]])],
  };

  it('a crossroads is one degree-4 node with four 90° gaps', () => {
    const g = streetGraph(plus);
    const n4 = g.nodes.filter((n) => n.degree >= 3);
    expect(n4.length).toBe(1);
    expect(n4[0].degree).toBe(4);
    expect(armGapsDeg(n4[0].bearings).map((x) => Math.round(x))).toEqual([90, 90, 90, 90]);
    expect(value(plus, 'junction.share4')).toBe(1);
    expect(value(plus, 'junction.angles', 'all/median')).toBeCloseTo(90, 9);
    expect(value(plus, 'junction.angles', 'all/p5')).toBeCloseTo(90, 9);
    expect(g.nodes.filter((n) => n.degree === 1).length).toBe(4);
    // §13.2's junction-degree histogram: four ends, one crossroads
    expect(junctionDegreeHistogram(g)).toEqual([0, 4, 0, 0, 1]);
    expect(junctionDegreeHistogram(streetGraph(tee))).toEqual([0, 3, 0, 1]);
  });

  it('a T has a straight pair, a Y has none; the census reads gaps 90 / 90 / 180 and 120 × 3', () => {
    const t = streetGraph(tee).nodes.find((n) => n.degree === 3);
    const y = streetGraph(wye).nodes.find((n) => n.degree === 3);
    if (t === undefined || y === undefined) throw new Error('nodes');
    expect(hasStraightPair(t.bearings)).toBe(true);
    expect(hasStraightPair(y.bearings)).toBe(false);
    expect(armGapsDeg(t.bearings).map((x) => Math.round(x)).sort((a, b) => a - b)).toEqual([90, 90, 180]);
    expect(armGapsDeg(y.bearings).map((x) => Math.round(x))).toEqual([120, 120, 120]);
    expect(value(tee, 'junction.share4')).toBe(0);
    expect(value(tee, 'junction.angles', 'all/median')).toBeCloseTo(90, 6);
  });

  it('merges nodes within 2 m: two offset Ts 1.5 m apart read as one degree-4 node; 2.5 m apart as two', () => {
    const offset = (d: number): MetricDoc => ({ ways: [way('h', [[-50, 0], [0, 0], [d, 0], [50, 0]]), way('n', [[0, 0], [0, 50]]), way('s', [[d, 0], [d, -50]])] });
    const near = streetGraph(offset(1.5)).nodes.filter((n) => n.degree >= 3);
    expect(near.map((n) => n.degree)).toEqual([4]);
    const far = streetGraph(offset(2.5)).nodes.filter((n) => n.degree >= 3);
    expect(far.map((n) => n.degree)).toEqual([3, 3]);
  });

  it("takes an arm's direction 10 m along it", () => {
    // an arm that bends 5 m out: its probe reads the direction to the point 10 m along the polyline
    const doc: MetricDoc = { ways: [way('h', [[-50, 0], [0, 0], [50, 0]]), way('v', [[0, 0], [0, 5], [5, 5], [40, 5]])] };
    const n = streetGraph(doc).nodes.find((x) => x.degree === 3);
    if (n === undefined) throw new Error('node');
    const deg = n.bearings.map((b) => Math.round((b * 180) / Math.PI));
    expect(deg).toContain(45);
  });
});

describe('the MFCG street signature inside the wall (attachment A sgd.*, blockc.*)', () => {
  const wall = rect(0, 0, 400, 400);
  const grid = (): MetricDoc => {
    // a 3 × 3 street grid at ±100 m with every street ending at the frame of the walled square
    const ways = [];
    for (const c of [-100, 0, 100]) {
      ways.push(way(`x${c}`, [[-150, c], [-100, c], [0, c], [100, c], [150, c]]));
      ways.push(way(`y${c}`, [[c, -150], [c, -100], [c, 0], [c, 100], [c, 150]]));
    }
    return { ways, wall };
  };

  it('T / Y share over degree-3 nodes inside the wall; unwalled reads notApplicable', () => {
    const c60 = 50 * Math.cos(Math.PI / 3);
    const s60 = 50 * Math.sin(Math.PI / 3);
    const doc: MetricDoc = {
      ways: [way('h', [[-150, 0], [-100, 0], [0, 0]]), way('t', [[-100, 0], [-100, 60]]), way('y1', [[0, 0], [c60, s60]]), way('y2', [[0, 0], [c60, -s60]])],
      wall,
    };
    // two degree-3 nodes inside: (-100, 0) a T, (0, 0) a Y of three 120° gaps
    expect(value(doc, 'sgd.tShare')).toBe(0.5);
    expect(naOf({ ways: doc.ways }, 'sgd.tShare')).toMatch(/^unwalled/);
  });

  it('intramural dead ends per km of the graph inside the wall', () => {
    const doc = grid();
    // 12 dead ends at ±150 inside the wall (half-width 200); the graph inside is 6 × 300 m = 1.8 km
    expect(value(doc, 'sgd.deadEnds')).toBeCloseTo(12 / 1.8, 9);
    // a wall that cuts the streets: only the inside length counts
    const small: MetricDoc = { ...doc, wall: rect(0, 0, 240, 240) };
    expect(value(small, 'sgd.deadEnds')).toBeCloseTo(0, 9);
  });

  it('blocks per walled hectare count built blocks whose centroids lie inside', () => {
    const blocks = [block('a', rect(-50, -50, 40, 40)), block('b', rect(50, 50, 40, 40)), block('g', rect(50, -50, 40, 40), { content: 'green' }), block('o', rect(500, 0, 40, 40))];
    const doc: MetricDoc = { ways: [], blocks, wall };
    expect(blocksPerHa(doc)).toBeCloseTo(2 / 16, 9);
    expect(value(doc, 'blockc.perHa')).toBeCloseTo(0.125, 9);
    expect(naOf({ ways: [], blocks }, 'blockc.perHa')).toMatch(/^unwalled/);
    expect(naOf(doc, 'blockc.lotsPer')).toMatch(/M1/);
  });
});

describe('R4 on block OBB axes (C-0018)', () => {
  it('a grid of blocks gives 1 at every radius', () => {
    const blocks = [];
    for (let i = 0; i < 12; i += 1) for (let j = 0; j < 12; j += 1) blocks.push(block(`b${i}-${j}`, rect(i * 50, j * 50, 40, 25, (i + j) % 2 === 0 ? 0 : 90)));
    const doc: MetricDoc = { ways: [], blocks };
    for (const id of ['bldg.r4.60', 'bldg.r4.120', 'bldg.r4.250']) expect(value(doc, id)).toBeCloseTo(1, 9);
    for (const s of r4Samples(doc, 60)) expect(s).toBeCloseTo(1, 9);
  });

  it('uniformly random orientations give ≈ 0', () => {
    const rnd = prng(42);
    const blocks = [];
    for (let i = 0; i < 40; i += 1) for (let j = 0; j < 40; j += 1) blocks.push(block(`r${i}-${j}`, rect(i * 30, j * 30, 24, 12, rnd() * 180)));
    const doc: MetricDoc = { ways: [], blocks };
    expect(value(doc, 'bldg.r4.250') as number).toBeLessThan(0.08);
    expect(value(doc, 'bldg.r4.120') as number).toBeLessThan(0.15);
    // the sample stops at 1 500 blocks, chosen by a fixed hash: the same blocks every time
    expect(r4Samples(doc, 250).length).toBe(1500);
    expect(r4Samples(doc, 250)).toEqual(r4Samples(doc, 250));
  });

  it('counts a sample only with five blocks within the radius, and reads a degenerate ring as no axis', () => {
    const doc: MetricDoc = { ways: [], blocks: [0, 1, 2, 3].map((i) => block(`b${i}`, rect(i * 10, 0, 8, 4))) };
    expect(r4Samples(doc, 60)).toEqual([]);
    expect(naOf(doc, 'bldg.r4.60')).toMatch(/five/);
    expect(blockAxis([P(0, 0), P(10, 0), P(20, 0)])).toBeNull();
    expect(blockAxis(rect(0, 0, 40, 10, 30)) as number).toBeCloseTo((30 * Math.PI) / 180, 2);
  });
});

describe('wall alignment by distance band (C-0018 proxy)', () => {
  it('folds each block axis against the nearest wall segment into [0°, 45°], per band', () => {
    const wall = rect(0, 0, 600, 600);
    const blocks = [
      block('a', rect(0, 280, 30, 10, 0)), // 15 m from the wall, parallel
      block('b', rect(0, -270, 30, 10, 80)), // 25 m, 80° against a horizontal segment: folded to 10°
      block('c', rect(230, 0, 30, 10, 60)), // 70 m, against a vertical segment: 30°
      block('d', rect(-150, 0, 30, 10, 80)), // 150 m, 10°
      block('e', rect(0, 0, 30, 10, 45)), // 300 m: beyond the bands
      block('f', rect(500, 0, 30, 10, 0)), // outside the wall
    ];
    const doc: MetricDoc = { ways: [], blocks, wall };
    const bands = wallAlignment(doc);
    if (bands === null) throw new Error('walled');
    expect(bands.get('b0_40')?.map((x) => Math.round(x))).toEqual([0, 10]);
    expect(bands.get('b40_100')?.map((x) => Math.round(x))).toEqual([30]);
    expect(bands.get('b100_200')?.map((x) => Math.round(x))).toEqual([10]);
    expect(value(doc, 'bldg.wallAlign.median', 'all/b0_40')).toBeCloseTo(5, 1);
    expect(value(doc, 'bldg.wallAlign.share15', 'all/b0_40')).toBe(1);
    expect(value(doc, 'bldg.wallAlign.share15', 'all/b40_100')).toBe(0);
    expect(wallAlignment({ ways: [], blocks })).toBeNull();
  });
});

describe('the blocks and deep-interior rows', () => {
  const outline = rect(0, 0, 200, 200);
  const blocks = [
    block('in1', rect(-40, -40, 40, 40), { district: 'd1' }),
    block('in2', rect(40, 40, 40, 40), { district: 'd1' }),
    block('edge', [P(-100, -100), P(-60, -100), P(-60, -60), P(-100, -60)], { district: 'd1' }),
    block('sq', rect(40, -40, 30, 30), { district: 'd1', content: 'square' }),
    block('x', rect(0, 0, 10, 10), { district: 'd2' }),
  ];
  const doc: MetricDoc = {
    ways: [],
    blocks,
    districts: [
      { id: 'd1', ring: outline, template: 'ring' },
      { id: 'd2', ring: rect(500, 500, 50, 50) },
    ],
  };

  it('block areas in m², whole and per template; built blocks only', () => {
    const a = blockAreas(doc);
    expect(a.get('all')).toEqual([1600, 1600, 1600, 100]);
    expect(a.get('template-ring')).toEqual([1600, 1600, 1600]);
    const m = metricById('block.area')?.measure(doc);
    expect(m !== undefined && 'values' in m ? [...m.values.keys()] : []).toEqual(['all', 'template-ring']);
    expect(naOf(doc, 'block.areaRel')).toMatch(/footprints arrive at M1/);
  });

  it('bounded blocks per template: blocks touching the outline are not counted', () => {
    expect(blockCountsByTemplate(doc).get('template-ring')).toEqual([2]);
    expect(value(doc, 'block.countTemplate', 'template-ring')).toBe(2);
    expect(naOf({ ways: [], blocks }, 'block.countTemplate')).toMatch(/template/);
  });

  it('court share over deep built blocks, whole and per band', () => {
    const deep = [
      block('a', rect(0, 0, 80, 80), { depthClass: 'deep', interior: 'court', band: 'rich' }),
      block('b', rect(0, 0, 80, 80), { depthClass: 'deep', interior: 'back_lane', band: 'rich' }),
      block('c', rect(0, 0, 80, 80), { depthClass: 'deep', interior: 'court', band: 'poor' }),
      block('d', rect(0, 0, 40, 40), { depthClass: 'standard', interior: 'court', band: 'poor' }),
      block('e', rect(0, 0, 80, 80), { depthClass: 'deep', interior: 'court', band: 'poor', content: 'green' }),
    ];
    expect(courtShare(deep)).toBeCloseTo(2 / 3, 12);
    expect(value({ ways: [], blocks: deep }, 'block.courtShare')).toBeCloseTo(2 / 3, 12);
    expect([...courtShareByBand({ ways: [], blocks: deep })]).toEqual([
      ['rich', 0.5],
      ['poor', 1],
    ]);
    expect(Number.isNaN(courtShare([deep[3]]))).toBe(true);
    expect(naOf({ ways: [], blocks: [deep[3]] }, 'block.courtShare')).toBe('no deep built block');
  });
});

describe('the bent-cut signature (with M0-b-04)', () => {
  const cuts: MetricCut[] = [
    { faceKind: 'plain', startT: 0.4, bends: 1, cornerT: 0.45, arrivalCdeg: 8900, fillet: true, lengthCm: 4000 },
    { faceKind: 'plain', startT: 0.6, bends: 1, cornerT: 0.65, arrivalCdeg: 8400, fillet: false, lengthCm: 6000 },
    { faceKind: 'ring', template: 'ring', startT: 0.5, bends: 0, arrivalCdeg: 9000, fillet: false, lengthCm: 5000 },
    { faceKind: 'ring', template: 'ring', startT: 0.7, bends: 1, cornerT: 0.55, arrivalCdeg: 8600, fillet: true, lengthCm: 3000 },
  ];
  const doc: MetricDoc = { ways: [], cuts };

  it('σ of the start along the OBB major axis, per subset', () => {
    const s = cutSigma(doc);
    expect(s.get('plain')).toBeCloseTo(Math.sqrt(0.02), 12);
    expect(s.get('ring')).toBeCloseTo(Math.sqrt(0.02), 12);
    expect(s.get('all')).toBeCloseTo(0.12909944487358055, 12);
    expect(value(doc, 'cut.sigma', 'template-ring')).toBeCloseTo(Math.sqrt(0.02), 12);
  });

  it('corner near mid-course, arrivals ≥ 85°, fillet share, lengths', () => {
    expect(cutCornerMid(doc).get('all')).toBeCloseTo(2 / 3, 12);
    expect(cutArrival85(doc).get('all')).toBe(0.75);
    expect(cutArrival85(doc).get('plain')).toBe(0.5);
    expect(cutFillet(doc).get('all')).toBeCloseTo(2 / 3, 12);
    expect(cutLengths(doc).get('ring')).toEqual([50, 30]);
    expect(value(doc, 'cut.length', 'plain')).toEqual([40, 60]);
    expect(naOf({ ways: [] }, 'cut.sigma')).toBe('no value');
  });
});

describe('measureSeeds: our side from one doc per seed', () => {
  it('gives per-seed values and samples in seed order, keys sorted, and notApplicable when every seed says so', () => {
    const docs: MetricDoc[] = [1, 2, 3].map((k) => ({ ways: [way('c', arc(50 * k, 720))] }));
    const e = measureSeeds(docs, ['street.turnPer100m', 'street.turnStep10m', 'sgd.tShare', 'junction.angles']);
    const t = e.find((x) => x.metric === 'street.turnPer100m');
    expect(t?.perSeed?.length).toBe(3);
    expect((t?.perSeed ?? [])[0]).toBeGreaterThan((t?.perSeed ?? [])[2]);
    expect(e.find((x) => x.metric === 'street.turnStep10m')?.samples?.length).toBe(3);
    expect(e.filter((x) => x.metric === 'sgd.tShare')).toEqual([{ metric: 'sgd.tShare', metricVersion: '1.0.0', key: 'all', notApplicable: 'unwalled: the street signature reads walled districts' }]);
    expect(e.filter((x) => x.metric === 'junction.angles').map((x) => x.key)).toEqual(['all/median', 'all/p5']);
    expect(measureSeeds(docs, ['street.turnPer100m'])).toEqual(measureSeeds(docs, ['street.turnPer100m']));
    expect(() => measureSeeds(docs, ['street.nope'])).toThrow(/not registered/);
  });
});
