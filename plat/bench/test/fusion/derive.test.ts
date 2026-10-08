// M0-c-06: the content of one measured derivation (seed 1, both runs, the test size) — what the report's clauses read,
// recomputed here from the derived model rather than taken from the record: the fusion run's stand-in districts and
// their ramp bands (C-0034; C-0270 (2)), the integrated run's bands (C-0270 (4)), the street network the junction, turn
// and drift rows measure (every way of S4, S5 and S8; S5c's streets read from their origin, C-0258 (5)), the roads
// leaving each walled stage against its main gates (§13.5), the lanes in a wall strip (§4.6, §13.2), the district faces
// the corpus bar re-runs on (read before S8, C-0067), the face counts (§12.4), the work per unit (C-0091) and the
// restart guard's denominator (§5.1 (1)).
import { stageOneReach, districtValue, type FieldsPass1, type GrowthState, type S5Record, type S8Output } from '@plat/layout';
import type { District, Way } from '@plat/model';
import { bandOf, defaultBandCuts, loadWorkLimits } from '@plat/tables';
import { beforeAll, describe, expect, it } from 'vitest';
import { derive, measure, metricDocOf, ringCentroid, roadsLeaving, stripFaces, wallLines, type Derivation, type SeedRecord } from '../../src/fusion/index.js';
import { faceInside } from '../../src/fusion/runs.js';
import { TEST_SIZE } from './support.js';

const runs: Record<'fusion' | 'integrated', { d: Derivation; r: SeedRecord }> = {} as never;

beforeAll(() => {
  for (const kind of ['fusion', 'integrated'] as const) {
    const d = derive(kind, 1, TEST_SIZE);
    runs[kind] = { d, r: measure(d) };
  }
}, 600_000);

function state(d: Derivation): GrowthState {
  return d.model.data.get('s5.growth') as GrowthState;
}

function lanes(d: Derivation): readonly Way[] {
  return (d.model.data.get('lanes') as readonly Way[] | undefined) ?? [];
}

describe('the fusion run’s stand-in districts (C-0034)', () => {
  it('each walled coarse face its own district, banded by 1 − d ÷ R from the plaza, its stage the innermost wall holding it', () => {
    const { d, r } = runs.fusion;
    const st = state(d);
    const s = d.ins.standIns;
    expect(s.length).toBeGreaterThan(2);
    expect(r.faces.districts).toBe(s.length);
    const plaza = ringCentroid(st.slice.plaza.ring);
    const R = stageOneReach(st);
    const walls = wallLines(st);
    expect(walls.length).toBeGreaterThanOrEqual(2);
    const ks = new Set<number>();
    const bands = new Set<string>();
    s.forEach((x, i) => {
      const v = Math.min(1, Math.max(0, 1 - Math.hypot(x.centroid.x - plaza.x, x.centroid.y - plaza.y) / R));
      expect(x.value).toBeCloseTo(v, 12);
      expect(x.band).toBe(bandOf(v, defaultBandCuts()));
      expect(d.ins.bandOf.get(x.id)).toBe(x.band);
      // The innermost wall holding the face (its outer ring, read before S8): inside that wall line, not inside the one
      // within it (a face of the outer annulus may wrap round the inner wall, so its centroid is no witness).
      const ring = d.ins.districtFaces[i][0];
      expect(ringCentroid(ring)).toEqual(x.centroid);
      const w = walls.findIndex((q) => q.k === x.k);
      expect(w).toBeGreaterThanOrEqual(0);
      expect(faceInside(ring, walls[w].ring)).toBe(true);
      if (w > 0) expect(faceInside(ring, walls[w - 1].ring)).toBe(false);
      ks.add(x.k);
      bands.add(x.band);
    });
    // Both walled stages hold stand-ins, and the ramp reaches more than one band.
    expect(ks.size).toBe(walls.length);
    expect(bands.size).toBeGreaterThan(1);
  });

  it('the corpus re-runs on the stand-in faces as read before S8: one face each, far fewer than the blocks', () => {
    const { d, r } = runs.fusion;
    expect(r.corpus.faces).toBe(d.ins.standIns.length);
    expect(r.corpus.roof.faces).toBe(r.corpus.faces);
    expect(r.corpus.spine.faces).toBe(r.corpus.faces);
    expect(r.corpus.faces * 4).toBeLessThan(r.faces.blocks);
  });
});

describe('the integrated run’s districts', () => {
  it('banded by the district’s pass-1 prosperity cut by the town’s FieldBands; the corpus on S6’s faces, before S8', () => {
    const { d, r } = runs.integrated;
    const fields = d.model.data.get('fields') as FieldsPass1;
    const districts = d.model.data.get('districts') as readonly District[];
    expect(r.faces.districts).toBe(districts.length);
    for (const x of districts) expect(d.ins.bandOf.get(x.id)).toBe(bandOf(districtValue(fields.prosperity, x.id), fields.prosperity.bands));
    const expected = new Set(districts.map((x) => d.ins.bandOf.get(x.id)));
    for (const b of Object.keys(r.bands)) expect(expected.has(b), b).toBe(true);
    expect(r.corpus.faces).toBeGreaterThanOrEqual(districts.length);
    expect(r.corpus.faces * 4).toBeLessThan(r.faces.blocks);
  });
});

describe('both runs', () => {
  for (const kind of ['fusion', 'integrated'] as const) {
    it(`${kind}: the face counts, the bands' samples, the cut lengths in metres`, () => {
      const { d, r } = runs[kind];
      const infill = d.model.data.get('infill') as S8Output['infill'];
      expect(r.faces.cuts).toBe(lanes(d).length);
      expect(r.faces.blocks).toBe(infill.blockFaces.length);
      expect(r.faces.blocks).toBeGreaterThan(50);
      let areas = 0;
      let cuts = 0;
      const lengths: number[] = [];
      for (const [b, v] of Object.entries(r.bands)) {
        expect(b).not.toBe('unbanded');
        areas += v.blockAreasM2.length;
        cuts += v.cutLengthsM.length;
        lengths.push(...v.cutLengthsM);
        for (const a of v.blockAreasM2) expect(a).toBeGreaterThan(50);
      }
      expect(areas).toBe(r.faces.blocks);
      let laneLengths = 0;
      for (const x of infill.report.districts) laneLengths += x.laneLengths.length;
      expect(cuts).toBe(laneLengths);
      lengths.sort((a, b) => a - b);
      // Kerb-to-kerb lane lengths of a walled district: metres, tens to hundreds.
      expect(lengths[0]).toBeGreaterThan(1);
      expect(lengths[Math.floor(lengths.length / 2)]).toBeGreaterThan(10);
      expect(lengths[lengths.length - 1]).toBeLessThan(2_000);
    });

    it(`${kind}: the street network holds every S4 / S5 way and every lane; S5c's streets read from their origin`, () => {
      const { d } = runs[kind];
      const doc = metricDocOf(d);
      const ids = new Set(doc.ways.map((w) => w.id.split('#')[0]));
      for (const w of lanes(d)) expect(ids.has(w.id), w.id).toBe(true);
      for (const w of state(d).ways) expect(ids.has(w.id), w.id).toBe(true);
      const s5 = d.model.data.get('s5') as S5Record;
      let grown = 0;
      for (const g of s5.growth) {
        for (const s of g.streets) {
          const runsOf = doc.ways.filter((w) => w.id.split('#')[0] === s.way.id);
          if (runsOf.length !== 1) continue;
          grown += 1;
          expect(runsOf[0].grown).toBe(true);
          expect(runsOf[0].line[0]).toEqual(s.points[0]);
        }
      }
      expect(grown).toBeGreaterThan(0);
      expect(doc.wall).toEqual(wallLines(state(d)).at(-1)?.ring);
      // A street whose committed run ends at its origin is read reversed (C-0258 (5)): plant one by recording the
      // first single-run street's points end-first, so its origin is the run's last vertex.
      const one = s5.growth.flatMap((g) => g.streets).find((s) => doc.ways.filter((w) => w.id.split('#')[0] === s.way.id).length === 1);
      expect(one).toBeDefined();
      if (one === undefined) return;
      const flipped = { ...s5, growth: s5.growth.map((g) => ({ ...g, streets: g.streets.map((s) => (s === one ? { ...s, points: s.points.slice().reverse() } : s)) })) };
      const data = new Map(d.model.data);
      data.set('s5', flipped);
      const doc2 = metricDocOf({ ...d, model: { ...d.model, data, kernel: d.model.kernel } as typeof d.model });
      const w2 = doc2.ways.find((w) => w.id === one.way.id);
      const w1 = doc.ways.find((w) => w.id === one.way.id);
      expect(w2?.line[0]).toEqual(one.points[one.points.length - 1]);
      expect(w2?.line).toEqual(w1?.line.slice().reverse());
    });

    it(`${kind}: roads leaving each walled stage counted against its main gates; no lane in a wall strip`, () => {
      const { d, r } = runs[kind];
      const st = state(d);
      const walls = wallLines(st);
      expect(r.roads.map((x) => x.k)).toEqual(walls.map((w) => w.k));
      for (const x of r.roads) {
        const main = st.stages[x.k - 1].gates.filter((g) => g.kind === 'main').length;
        expect(x.n).toBe(main);
        expect(x.leaving, `stage ${String(x.k)}`).toBe(x.n);
      }
      // N counts the main gates alone: a postern added to a stage changes no N.
      const k0 = r.roads[0].k;
      const planted = { ...st, stages: st.stages.map((x, i) => (i === k0 - 1 ? { ...x, gates: [...x.gates, { ...x.gates[0], kind: 'postern' as const }] } : x)) } as GrowthState;
      expect(roadsLeaving(planted, metricDocOf(d))[0].n).toBe(r.roads[0].n);
      const strips = stripFaces(d);
      expect(r.strips.faces).toBe(strips.length);
      expect(strips.length).toBeGreaterThan(0);
      expect(r.strips.crossings).toBe(0);
      // The clause reads the lanes alone: one line per committed run of each S8 lane.
      const doc = metricDocOf(d);
      const laneIds = new Set(lanes(d).map((w) => w.id));
      expect(r.strips.lanes).toBe(doc.ways.filter((w) => laneIds.has(w.id.split('#')[0])).length);
      expect(r.strips.lanes).toBeGreaterThanOrEqual(lanes(d).length);
      expect(r.strips.lanes).toBeLessThan(doc.ways.length);
    });

    it(`${kind}: the work rows — S5c's two counters per growth stage, S8's three per district, units the law inverted`, () => {
      const { d, r } = runs[kind];
      const s5 = d.model.data.get('s5') as S5Record;
      const infill = d.model.data.get('infill') as S8Output['infill'];
      expect(r.work.filter((w) => w.stage === 'S5').length).toBe(2 * s5.growth.length);
      expect(r.work.filter((w) => w.stage === 'S8').length).toBe(3 * infill.report.districts.length);
      const wl = loadWorkLimits();
      let many = 0;
      for (const w of r.work) {
        const law = wl.law(w.counter);
        expect(w.units).toBeGreaterThanOrEqual(1);
        if (w.units > 1) {
          many += 1;
          expect(law.floor + law.perUnit * w.units).toBeCloseTo(w.limit, 6);
        }
      }
      expect(many).toBeGreaterThan(0);
    });
  }

  it('the restart guard counts a registered stage the order never ran', { timeout: 300_000 }, () => {
    const { d, r } = runs.fusion;
    expect(r.restarts).toBe(0);
    expect(measure({ ...d, registered: [...d.registered, 'S9'] }).restarts).toBe(1);
  });
});
