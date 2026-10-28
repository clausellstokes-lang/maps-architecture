// The S3 slice's commits through the façade (M0-c-02; §4.1's S1 and S3 batch rows, §4.2 S3 (9), §4.4 S5a for k = 1;
// C-0032, C-0033, C-0087):
//   L0 (S1's first batch): the arena's outer ring — the frame plus its context margin (§3.2 (9)) — one closed chain
//      carrying the structural `margin` role on the arena's Terrain entity, so every L0 face has a boundary before any
//      water exists;
//   L1 (S3's, one declared batch of independent ops): the map border — the frame rectangle, one closed chain carrying
//      the structural `border` role on the Terrain entity, laid across land and water alike (no L0 edge is added) —
//      and the main plaza as a barrier face: its closed ring carrying the structural `reserved` role, its vertices the
//      reservation's `attach` rows, the face owned by the reservation (C-0032 (12));
//   L1 (S5a, k = 1): the trace by the registered EnceinteStrategy `base`, then the strip stand-in (C-0033).
// The slice is M0-c-01's data (`s3Slice`); nothing here re-solves it.
import { createRng, err, kernelOp, STAGES, type ConcernId, type Kernel, type KernelResult, type KernelTx, type LatticePoint, type PlatKey, type StageId } from '@plat/kernel';
import type { ChainRef, Enceinte, Gate, Handle, Reservation, StreamOpts, WaterSet } from '@plat/model';
import { arenaReach } from '@plat/site';
import { quot } from '../siting/geom.js';
import { PLAZA_AREA_BAND_HA } from '../siting/plaza.js';
import type { S3Slice, Site } from '../siting/types.js';
import { lat, unitOf } from './plane.js';
import { layStrips, toFrame } from './strips.js';
import { baseEnceinte } from './trace.js';
import type { CostField, EnceinteContext, StripsLaid, StripStop, Traced, WaterGate, XY } from './types.js';
import { GROUND, generated, waterRings } from './water.js';

/** The route nodes on each side of a gate's edge its way's corridor is taken along (4 × 25 m: past both strips). */
export const WAY_SPAN_NODES = 4;

/** The plaza reservation's address (M0-c-01's `plaza:0`, the slice's single main plaza). */
export const PLAZA_ID = 'plaza:0';

/** The context the trace runs in, for a site (§14's StageContext over the site's tables, rung and town key). */
export function siteContext(site: Site): EnceinteContext {
  const rng = createRng();
  return {
    doc: undefined,
    plats: {},
    stream: (concern: ConcernId, _entity: Handle, opts: StreamOpts) => rng.stream(site.townKey, STAGES.S3, concern, opts),
    streamOpts: (_concern: ConcernId, _entity: Handle, attempt = 0) => ({ reroll: 0, attempt, epoch: 0, salt: 0 }),
    tables: site.tables,
    rung: site.rungProfile,
    report: undefined,
    epoch: 0,
  };
}

function spec(arena: PlatKey, level: 0 | 1, stage: number, ops: KernelTx['ops'] = []): KernelTx {
  return {
    key: arena,
    level,
    ops,
    expect: [],
    onFail: 'reject',
    batch: { kind: 'stage', stage: stage as StageId },
    stage: stage as StageId,
    rederivesFrom: stage as StageId,
    workLimit: 10_000_000,
  };
}

/** The arena's outer ring: the frame plus its margin on every side (§3.2 (9); @plat/site's `arenaReach`), counter-clockwise. */
export function outerRing(site: Pick<Site, 'frame'>): LatticePoint[] {
  const r = arenaReach(site.frame);
  return [
    { x: -r.x, y: -r.y },
    { x: r.x, y: -r.y },
    { x: r.x, y: r.y },
    { x: -r.x, y: r.y },
  ] as LatticePoint[];
}

/**
 * S1's first L0 batch (§4.1): the outer ring, one closed `margin` chain on the arena's Terrain entity. Returns its
 * ChainRef.
 */
export function commitOuterRing(site: Site, k: Kernel, arena: PlatKey = GROUND): KernelResult<ChainRef> {
  const chain: ChainRef = { role: 'margin', entity: site.terrain.id };
  const r = k.tx(spec(arena, 0, STAGES.S1), (o) => k.geom.insertChain(o, outerRing(site), [chain], 'mandatory', { closed: true }));
  if (!r.ok) return err(r.code, r.detail);
  return { ok: true, value: chain, warnings: r.warnings };
}

/** What S3's L1 batch wrote: the border's chain and the plaza's reservation record. */
export interface S3Batch {
  readonly border: ChainRef;
  readonly plaza: Reservation;
}

/**
 * S3's L1 batch (§4.1; C-0032 (12)): the map border and the plaza's barrier face, independent ops of one declared batch
 * (the border's and the plaza's insertChain, the plaza face's setOwner, in the batch's canonical order).
 */
export function commitS3Batch(slice: S3Slice, k: Kernel, arena: PlatKey = GROUND): KernelResult<S3Batch> {
  const site = slice.site;
  const border: ChainRef = { role: 'border', entity: site.terrain.id };
  const ring = slice.plaza.ring;
  const knots = ring.map((_p, i) => ({ index: i, role: 'attach', ordinal: i, entity: PLAZA_ID }));
  // A point well inside the plaza (its vertices' mean: the plaza is convex), where its face is found after the insert.
  let cx = 0;
  let cy = 0;
  for (const p of ring) {
    cx += p.x;
    cy += p.y;
  }
  const inner = { x: Math.round(quot(cx, ring.length, 'count', 'plaza centre')), y: Math.round(quot(cy, ring.length, 'count', 'plaza centre')) } as LatticePoint;
  const ops = [
    kernelOp('insertChain', [1, 0], 0, (o) => k.geom.insertChain(o, site.frameRing, [border], 'mandatory', { closed: true })),
    kernelOp('insertChain', [2, 0], 0, (o) => k.geom.insertChain(o, ring, [{ role: 'reserved', entity: PLAZA_ID }], 'mandatory', { closed: true, knots })),
    kernelOp('setOwner', [2, 0], 1, (o) => {
      const loc = k.geom.pointLocate(arena, 1, inner);
      if (loc.on !== 'face' || loc.level !== 1) return { ok: false, code: 'E_INVARIANT', detail: 'S3: the plaza\'s barrier face was not found inside its ring' };
      return k.geom.setOwner(o, [loc.face], PLAZA_ID);
    }),
  ];
  const r = k.tx(spec(arena, 1, STAGES.S3, ops));
  if (!r.ok) return err(r.code, r.detail);
  const band = PLAZA_AREA_BAND_HA[site.rung];
  const plaza: Reservation = {
    id: PLAZA_ID,
    kind: 'plaza',
    face: { owner: PLAZA_ID, level: 1 },
    areaBandM2: [band[0] * 10_000, band[1] * 10_000],
    attach: ring.map((_p, i) => ({ role: 'attach', entity: PLAZA_ID, ordinal: i })),
    stage: STAGES.S3 as Reservation['stage'],
    lifecycle: generated(0),
  };
  return { ok: true, value: { border, plaza }, warnings: r.warnings };
}

/** The options of `commitS3Slice`. */
export interface CommitOptions {
  /** `present`: the arena already holds the outer ring (and any L0 water S1 laid); default `commit`. */
  readonly outerRing?: 'commit' | 'present';
  /** The water S1 laid on L0 (the trace's crossings, C-0087); default none. */
  readonly water?: WaterSet;
  /** The pull's cost surface (default the terrain's). */
  readonly costField?: CostField;
  readonly key?: PlatKey;
}

/** Everything the slice's commits wrote. */
export interface S3Commit {
  readonly margin: ChainRef;
  readonly border: ChainRef;
  readonly plaza: Reservation;
  readonly enceinte: Enceinte;
  /** Main gates (one per gate site, in order), then the water gates. */
  readonly gates: readonly Gate[];
  readonly waterGates: readonly WaterGate[];
  readonly traced: Traced;
  readonly strips: StripsLaid;
}

/**
 * S5a's trace for the slice and its strips (§4.4 S5a for k = 1; C-0033, C-0226 (2), (10)): the registered strategy
 * `base` on S3's outline and gate sites around the plaza, then the strip stand-in — the strips stopping at each main
 * gate's way, taken along the gate route's own lattice edge at the gate with half the `through` class's widest corridor
 * at the rung (C-0226 (10)), at each water gate's water, and the glacis at the map border. The arena must already hold
 * S3's L1 batch. A refusal is returned with its code and detail; a refused batch writes nothing (the trace's batch
 * stands when the strips' is refused). The warnings are the trace's, then the strips'.
 */
export function traceWithStrips(
  slice: S3Slice,
  k: Kernel,
  arena: PlatKey,
  water: WaterSet,
  costField: CostField | undefined,
  plaza: Reservation,
): KernelResult<{ enceinte: Enceinte; gates: readonly Gate[]; waterGates: readonly WaterGate[]; traced: Traced; strips: StripsLaid }> {
  const site = slice.site;
  const ctx = siteContext(site);
  const traced = baseEnceinte.trace(
    slice.levelSet.outline,
    slice.gateSites,
    [plaza],
    site.terrain,
    water,
    { waterfront: 'open', placement: 'aroundAll' },
    ctx,
    k,
    { key: arena, ...(costField === undefined ? {} : { costField }) },
  );
  if (!traced.ok) return err(traced.code, traced.detail);
  const t = traced.value.traced;
  // The stops: each main gate's way along its route's lattice edge at the gate, each water gate's water.
  const half = Math.round(site.tables.table('ways').pair('through', `widthM.${site.rung}`)[1] * 50);
  const stops: StripStop[] = [];
  const corridors: Extract<StripStop, { kind: 'way' }>[] = [];
  // A route ending at the rim runs on to the frame's edge (S4's through-road to the margin): the corridor follows it there.
  const toRim = (path: XY[]): void => {
    if (path.length < 2) return;
    const a = path[path.length - 2];
    const b = path[path.length - 1];
    const d = unitOf({ x: b.x - a.x, y: b.y - a.y });
    const f = d === null ? null : toFrame(b, d, site.frameRing);
    if (f !== null && (f.x !== b.x || f.y !== b.y)) path.push(lat(f));
  };
  slice.gates.forEach((g, i) => {
    // The way's centreline near the gate: its route's lattice nodes within WAY_SPAN_NODES of the gate's edge on each
    // side (the route S4 commits, C-0226 (10)).
    const route = slice.routes.find((r) => r.ordinal === g.ordinal);
    const nodes = route === undefined ? [g.edge[0], g.edge[1]] : route.nodes.slice(Math.max(0, g.routeIndex - WAY_SPAN_NODES), g.routeIndex + 2 + WAY_SPAN_NODES);
    const path: XY[] = nodes.map((n) => slice.lattice.points[n]);
    if (route !== undefined && nodes[nodes.length - 1] === route.nodes[route.nodes.length - 1]) toRim(path);
    stops.push({ kind: 'way', gate: t.gates[i].id, at: g.at, path, halfWidthCm: half });
    // The way along its whole length (RQ5; §4.8: the strips stop at a way's corridor wherever it runs inside their width).
    if (route !== undefined) {
      const whole: XY[] = route.nodes.map((n) => slice.lattice.points[n]);
      toRim(whole);
      corridors.push({ kind: 'way', gate: t.gates[i].id, at: g.at, path: whole, halfWidthCm: half });
    }
  });
  const rings = waterRings(water, k, arena);
  // Every water face stops the strips (the river is a water gate's corridor, C-0087; a shore the trace follows carries
  // no strip on its water side): the stop names the body.
  for (const r of rings) stops.push({ kind: 'water', gate: r.body, ring: r.ring });
  const strips = layStrips(t.enceinte, site.tables.table('walls').row('era.default'), k, { key: arena, stops, frame: site.frameRing, corridors });
  if (!strips.ok) return err(strips.code, strips.detail);
  return {
    ok: true,
    value: { enceinte: t.enceinte, gates: t.gates, waterGates: t.waterGates, traced: t, strips: strips.value },
    warnings: [...traced.warnings, ...strips.warnings],
  };
}

/**
 * The S3 slice's commits (see the module comment): the outer ring (unless present), S3's L1 batch, then the trace and
 * its strips (`traceWithStrips`).
 */
export function commitS3Slice(slice: S3Slice, k: Kernel, opts: CommitOptions = {}): KernelResult<S3Commit> {
  const site = slice.site;
  const arena = opts.key ?? GROUND;
  const water: WaterSet = opts.water ?? { bodies: [], bridges: [] };
  let margin: ChainRef = { role: 'margin', entity: site.terrain.id };
  if (opts.outerRing !== 'present') {
    const m = commitOuterRing(site, k, arena);
    if (!m.ok) return err(m.code, m.detail);
    margin = m.value;
  }
  const s3 = commitS3Batch(slice, k, arena);
  if (!s3.ok) return err(s3.code, s3.detail);
  const tail = traceWithStrips(slice, k, arena, water, opts.costField, s3.value.plaza);
  if (!tail.ok) return err(tail.code, tail.detail);
  return { ok: true, value: { margin, border: s3.value.border, plaza: s3.value.plaza, ...tail.value }, warnings: tail.warnings };
}
