// The S5 caller's Way records at the stage's strips (Q132; M0-c-02 S6's N-61 (1); C-0474's `LayStripsOptions.ways`;
// §4.8 "the strips stop at each gate's corridor"). `traceStep` hands the growth state's Way records to the strips
// (`traceStage`'s `ways`), so an arena way the stage's strips meet beside its trace takes its corridor at its own local
// width — its `width_knot` profile read along its run — not the widest gate way's half-width (`through` at CITY: 14 m,
// 700 cm), which the strips took before the round. On a hand-built state: the small flat site (400 ha, 30 ha walled), S3's
// commits, one S4 way north through the stage's outline (its one gate), a hand way 9 m outside the outline's straight east
// side, its south half a lane 6 m wide and its north half a street 14 m wide (two `width_knot`s on its middle vertex, as
// S4's class runs carry them), and stage 2's record with that outline.
import { describe, expect, it } from 'vitest';
import { STAGES, type Kernel, type KernelTx, type LatticePoint, type StageId } from '@plat/kernel';
import type { Way } from '@plat/model';
import { commitOuterRing, commitRoutes, commitS3Slice, flatFixture, s3Slice, type RoutePoint, type S4Route } from '../../../src/index.js';
import { traceStep, type GrowthStage, type GrowthState } from '../../../src/growth/mainRoads.js';
import type { StageBoundary } from '../../../src/growth/boundary.js';
import { GROUND, kernelFor, P } from './support.js';

const L1_S4: KernelTx = { key: GROUND, level: 1, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: STAGES.S4 as StageId }, stage: STAGES.S4 as StageId, rederivesFrom: STAGES.S4 as StageId, workLimit: 1_000_000 };

/** A ring densified to sides of at most `step` cm (its vertices kept). */
function densify(ring: readonly LatticePoint[], step = 2500): LatticePoint[] {
  const out: LatticePoint[] = [];
  for (let i = 0; i < ring.length; i += 1) {
    const a = ring[i];
    const b = ring[(i + 1) % ring.length];
    const n = Math.max(1, Math.ceil(Math.hypot(b.x - a.x, b.y - a.y) / step));
    for (let s = 0; s < n; s += 1) out.push(P(Math.round(a.x + ((b.x - a.x) * s) / n), Math.round(a.y + ((b.y - a.y) * s) / n)));
  }
  return out;
}

/** Stage 2's outline: a square of 800 m about the town, its east side the line x = 400 m. */
const OUTLINE = densify([P(-40_000, -40_000), P(40_000, -40_000), P(40_000, 40_000), P(-40_000, 40_000)]);
/** The graded way: 9 m outside the east side, 300 m long; a lane (600 cm) south of y = 0, a street (1 400 cm) north. */
const GRADED = 'way:graded';
const GRADED_POINTS = [P(40_900, -15_000), P(40_900, 0), P(40_900, 15_000)];
const GRADED_RECORD = { id: GRADED, width: { knotRole: 'width_knot', values: [600, 1400], interp: 'linear' } } as unknown as Way;

/** The hand state at stage 2's trace: S3 committed, the north way and the graded way laid, stage 2's record. */
function handState(): { state: GrowthState; k: Kernel } {
  const site = flatFixture(1, { frameAreaHa: 400, walledHa: 30 });
  const slice = s3Slice(site);
  const { k } = kernelFor(site);
  expect(commitOuterRing(site, k).ok).toBe(true);
  const c = commitS3Slice(slice, k, { outerRing: 'present' });
  if (!c.ok) throw new Error(`ways.test: S3's commits were refused: ${c.code} ${c.detail}`);
  // The town's wall well inside the outline: the fixture's geometry holds.
  for (const q of c.value.traced.line) expect(Math.max(Math.abs(q.x), Math.abs(q.y))).toBeLessThan(31_000);
  const ys = [34_000, 36_500, 39_000, 41_500, 44_000, 46_500, 49_000];
  const north: S4Route = {
    id: 'gate:8/out',
    order: 0,
    part: 'outward',
    class: 'through',
    points: ys.map((y, i): RoutePoint => (i === 0 ? { at: P(0, y), pin: 'gate', pinId: 'gate:8' } : i === ys.length - 1 ? { at: P(0, y), pin: 'frame' } : { at: P(0, y) })),
    spans: [],
    from: { kind: 'gate', id: 'gate:8' },
    to: { kind: 'bearing', bearingCdeg: 0 as never },
  };
  const r = commitRoutes([north], k, { tables: site.tables, rung: 'CITY', spacingCm: 2500, water: [], bridges: [] });
  if (!r.ok) throw new Error(`ways.test: the north way was refused: ${r.code} ${r.detail}`);
  const knots = [{ index: 1, role: 'width_knot', ordinal: 0, entity: GRADED }, { index: 1, role: 'width_knot', ordinal: 1, entity: GRADED }];
  const laid = k.tx(L1_S4, (o) => k.geom.insertChain(o, GRADED_POINTS, [{ role: 'way', entity: GRADED }], 'mandatory', { knots }));
  expect(laid.ok ? 'ok' : `${laid.code} ${laid.detail}`).toBe('ok');
  const stage = (kk: number, wall: readonly LatticePoint[] | null, boundary: StageBoundary | null): GrowthStage =>
    ({ k: kk, regime: kk === 1 ? 'walled_core' : 'walled_rings', walled: true, boundary, foldedInto: null, count: { n: 0, measure: 0, walled: true, rule: 'gateLaw' }, crossings: [], picks: [], redraws: 0, short: 0, roads: [], unserved: [], lowered: 0, trace: null, gates: [], wall }) as GrowthStage;
  const b2 = { k: 2, set: { outline: OUTLINE, selected: new Uint8Array(slice.lattice.points.length) } } as unknown as StageBoundary;
  const state = {
    slice,
    kernel: k,
    key: GROUND,
    water: { bodies: [], bridges: [] },
    plaza: c.value.plaza,
    field: slice.field,
    enclosure: slice.levelSet.selected,
    lastWithLand: 1,
    ways: [...r.value.network.ways, GRADED_RECORD],
    junctions: [],
    stages: [stage(1, c.value.traced.line, null), stage(2, null, b2)],
    nextGateOrdinal: 100,
    folded: [0, 0, 0],
    report: { work: { 'route.nodes': 0 }, rungs: [] },
  } as unknown as GrowthState;
  return { state, k };
}

/** The owner of the L1 face at q ('' when none, 'edge' when q lies on an edge or vertex). */
function ownerAt(k: Kernel, q: LatticePoint): string {
  const loc = k.geom.pointLocate(GROUND, 1, q);
  return loc.on === 'face' ? (k.view(GROUND, 1).owner(loc.face) ?? '') : 'edge';
}

/** The wall's x where it crosses the horizontal line y (the east side), or NaN. */
function wallXAt(line: readonly LatticePoint[], y: number): number {
  let best = Number.NaN;
  for (let i = 0; i < line.length; i += 1) {
    const a = line[i];
    const b = line[(i + 1) % line.length];
    if ((a.y - y) * (b.y - y) > 0 || a.y === b.y) continue;
    const x = a.x + ((b.x - a.x) * (y - a.y)) / (b.y - a.y);
    if (Number.isNaN(best) || x > best) best = x;
  }
  return best;
}

describe('the S5 caller hands the arena\'s Way records to the stage\'s strips (Q132; N-61 (1); C-0474)', () => {
  it('stage 2\'s outer strip beside the lane\'s stretch stops at the lane\'s corridor (6 m out), beside the street\'s at the street\'s (2 m out)', { timeout: 300_000 }, () => {
    const { state, k } = handState();
    const t = traceStep(state, 2);
    expect(t.ok ? 'ok' : `${t.code} ${t.detail}`).toBe('ok');
    if (!t.ok) return;
    const wall = t.value.wall ?? [];
    // The wall runs down the outline's straight east side at both probe heights: the geometry the probes read.
    for (const y of [-8000, 8000]) expect(Math.abs(wallXAt(wall, y) - 40_000)).toBeLessThanOrEqual(50);
    // 4.5 m outside the wall beside the lane: between the wall and the lane's corridor (its edge 6 m out) — the strip's.
    // Before the round the lane took the widest gate way's half-width (700 cm): its corridor's edge 2 m out, this point in it.
    expect(ownerAt(k, P(40_450, -8000))).toBe('wall_strip:2-outer');
    // Beside the street the same point lies in the street's corridor (its edge 2 m out): no strip's.
    expect(ownerAt(k, P(40_450, 8000))).not.toMatch(/^wall_strip/);
    // Inside each corridor: no strip's; the inner strip beside both stretches the inner strip's.
    for (const q of [P(40_900, -8000), P(40_900, 8000)]) expect(ownerAt(k, q)).not.toMatch(/^wall_strip/);
    for (const q of [P(39_600, -8000), P(39_600, 8000)]) expect(ownerAt(k, q)).toBe('wall_strip:2-inner');
  });
});
