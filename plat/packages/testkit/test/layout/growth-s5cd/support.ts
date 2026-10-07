// M0-c-05's testkit-side support (C-0122): the flat fixture run through S3, S4 and S5 by `@plat/layout`'s exports, and
// the run read back from the arena into M0-k-05's MetricDoc (every way's committed line; S5c's streets marked grown
// and organic; the outermost curtain wall), so M0-k-05's METRICS measure our output — one metricVersion, never a second
// measurement (N-08). The package is reached only through `@plat/layout` (C-0122).
import { attachIndex, createKernel, createPlat, type Kernel, type Plat, type PlatKey } from '@plat/kernel';
import { commitS3Slice, flatFixture, runS4, runS5, s3Slice, wayLines, type FlatFixtureOptions, type S5Run } from '@plat/layout';
import { metricById, type MetricDoc, type MetricWay } from '../../../src/metrics/index.js';

export const GROUND: PlatKey = { layer: 'ground', part: 0 };

/** One seed of the flat fixture through S5. */
export interface FixtureRun {
  readonly plat: Plat;
  readonly k: Kernel;
  readonly run: S5Run;
}

export function fixtureRun(seed: number, fx: FlatFixtureOptions = {}): FixtureRun {
  const site = flatFixture(seed, fx);
  const slice = s3Slice(site);
  const plat = createPlat(GROUND, site.frame);
  attachIndex(plat, { gridCellCm: 5000 });
  const k = createKernel(new Map([[GROUND, plat]]), { spineWidths: () => null });
  const c = commitS3Slice(slice, k);
  if (!c.ok) throw new Error(`fixtureRun: S3 refused: ${c.code} ${c.detail}`);
  const s4 = runS4({ slice, commit: c.value, kernel: k });
  if (!s4.ok) throw new Error(`fixtureRun: S4 refused: ${s4.code} ${s4.detail}`);
  const run = runS5({ slice, commit: c.value, s4: s4.value, kernel: k });
  if (!run.ok) throw new Error(`fixtureRun: S5 refused: ${run.code} ${run.detail}`);
  return { plat, k, run: run.value };
}

/** The run as M0-k-05's MetricDoc: every way's committed runs, S5c's streets grown and organic, the outermost wall. */
export function metricDoc(r: FixtureRun): MetricDoc {
  const st = r.run.state;
  const grown = new Set(r.run.growth.flatMap((g) => g.streets.map((s) => s.way.id)));
  for (const d of r.run.capacity) if (d.rim !== null) for (const s of d.rim.streets) grown.add(s.way.id);
  const cls = new Map(st.ways.map((w) => [w.id, w.class]));
  const ways: MetricWay[] = [];
  for (const l of wayLines(r.k, st.ways.map((w) => w.id), GROUND)) {
    l.runs.forEach((run, i) => {
      ways.push({ id: l.runs.length === 1 ? l.way : `${l.way}#${String(i)}`, class: cls.get(l.way) ?? 'secondary', line: run.points, grown: grown.has(l.way), organic: true });
    });
  }
  let wall: MetricDoc['wall'];
  for (const s of st.stages) if (s.wall !== null) wall = s.wall;
  return wall === undefined ? { ways } : { ways, wall };
}

/** One metric's sample (or scalar) under a key, read through M0-k-05's registry. */
export function measured(id: string, doc: MetricDoc, key = 'all'): number | readonly number[] | null {
  const m = metricById(id);
  if (m === undefined) throw new Error(`no metric ${id}`);
  const v = m.measure(doc);
  if ('notApplicable' in v) return null;
  return v.values.get(key) ?? null;
}
