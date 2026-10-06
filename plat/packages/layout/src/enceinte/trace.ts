// The registered EnceinteStrategy `base` (§4.12; §4.4 S5a *Trace*; §4.2 S3 (9); C-0032, C-0085, C-0087; M0-c-02): the
// stage boundary → the committed L1 wall chain with its gate vertices, in one rule set —
//   (1) barrier closure: the arc classifier over the barrier table (empty at M0: every arc open, the ring closed);
//   (2) pull and pin: the cost-surface path within the 40 m band, the gates and the water crossings' bank points pinned;
//   (3) smooth and simplify: 3 pinned Laplacian passes, F-WALL's trace rungs where the smoothed trace self-touches or
//       crosses the core (re-offset, then union-simplify), the kernel's topology-preserving Visvalingam (20 m, no
//       interior angle < 100°; a removal that would touch the trace itself, cross the water, enter a reservation or the
//       core, or move a pin is refused), then `insertChain` on L1 as a `mandatory` chain carrying `wall` on the
//       enceinte, each main gate's vertex carrying ('gate', gate) and each water gate's two bank vertices
//       ('gate_end', gate, 0 | 1), the wall's edge between them taking ('wall_gate', gate) (C-0224 (1)).
// Every value it reads is a walls.json cell (`trace/*`, the era row). The trace is laid `standing` (no condition is
// written: the profile is M2b's). The batch is S5a's for k = 1 (§4.1's S5 row commits S3's trace; C-0224 (2)).
import { err, simplify, STAGES, type Cm, type Kernel, type KernelResult, type KernelTx, type LatticePoint, type Polygon, type StageId, type VertexRef } from '@plat/kernel';
import type { Enceinte, Gate, GateSite, Id, Reservation, Terrain, WaterSet } from '@plat/model';
import { classifyArcs } from './closure.js';
import { ccw, departure, distToRing, lat, openRing, TOUCH_CM } from './plane.js';
import { pullAndPin, smoothPinned, terrainCost } from './pull.js';
import { defectOf, placePins, reoffset, unionOuter } from './rungs.js';
import type { EnceinteContext, EnceinteStrategy, TraceOptions, TracePolicy, Traced, TraceReport, WallRung, WaterGate, XY } from './types.js';
import { crossWater, generated, GROUND, waterGateOf, waterRings } from './water.js';

/** The registered name of the base's strategy (§4.12). */
export const ENCEINTE_STRATEGY_ID = 'base';

/** walls.json's trace row and era row as the strategy reads them (cm, count, cdeg). */
export interface WallCells {
  readonly bandCm: number;
  readonly smoothPasses: number;
  readonly minSegmentCm: number;
  readonly minAngleCdeg: number;
  readonly thicknessCm: number;
  readonly innerSetbackCm: number;
  readonly outerSetbackGlacisCm: number;
}

/** The walls table's cells the trace and the strips read (`trace/*` and the era row `era.default`). */
export function wallCells(ctx: Pick<EnceinteContext, 'tables'>, era = 'era.default'): WallCells {
  const t = ctx.tables.table('walls');
  return {
    bandCm: Math.round(t.num('trace', 'searchBandM') * 100),
    smoothPasses: t.num('trace', 'smoothPasses'),
    minSegmentCm: Math.round(t.num('trace', 'simplifyMinSegmentM') * 100),
    minAngleCdeg: t.num('trace', 'simplifyMinAngleCdeg'),
    thicknessCm: Math.round(t.num(era, 'thicknessM') * 100),
    innerSetbackCm: Math.round(t.num(era, 'innerSetbackM') * 100),
    outerSetbackGlacisCm: Math.round(t.num(era, 'outerSetbackGlacisM') * 100),
  };
}

const key = (p: XY): string => `${String(p.x)},${String(p.y)}`;

/** The gate sites put on the ring as vertices (each a vertex already, or within the attraction distance of a side). */
function withGates(ring: readonly LatticePoint[], sites: readonly GateSite[]): LatticePoint[] {
  const pins = sites.map((g) => lat(g.at));
  const placed = placePins(ring, pins);
  if (placed !== null) return placed;
  const off = pins.find((p) => distToRing(p, ring) > TOUCH_CM);
  throw new RangeError(`trace: a gate site lies off the boundary it was picked on (§4.4: every gate lies on its stage's boundary): ${off === undefined ? '?' : key(off)}`);
}

/** The faces' outer rings of a FaceRef, read through the façade. */
function ringsOf(k: Kernel, ref: { owner: Id; level: 0 | 1 | 2 | 3 | 4 }, arena = GROUND): LatticePoint[][] {
  const r = k.resolve(ref, arena);
  if (r.view !== 'faces') return [];
  const v = k.view(arena, ref.level);
  return r.faces.map((f) => v.rings(f)[0]);
}

/** The pins' indices on a ring. */
function pinMask(ring: readonly XY[], pins: ReadonlySet<string>): Uint8Array {
  const m = new Uint8Array(ring.length);
  ring.forEach((p, i) => {
    if (pins.has(key(p))) m[i] = 1;
  });
  return m;
}

/** A transaction spec at L1 for the trace's and the strips' batches. */
export function l1Spec(arena: KernelTx['key'], stage: number, over: Partial<KernelTx> = {}): KernelTx {
  return {
    key: arena,
    level: 1,
    ops: [],
    expect: [],
    onFail: 'reject',
    batch: { kind: 'stage', stage: stage as StageId },
    stage: stage as StageId,
    rederivesFrom: stage as StageId,
    workLimit: 10_000_000,
    ...over,
  };
}

/**
 * The base's trace (see the module comment): the boundary (the stage's, counter-clockwise or not), the stage's gate
 * sites (each on the boundary), its reservations (barrier faces the trace never crosses), the terrain (the pull's
 * default cost surface), the water (C-0087's crossings), the policy (`open` and `aroundAll` at M0), the context
 * (walls.json) and the kernel; commits the trace and returns the minimal Enceinte with the run's records.
 */
export function traceBase(
  boundary: Polygon,
  gateSites: readonly GateSite[],
  reservations: readonly Reservation[],
  terrain: Terrain,
  water: WaterSet,
  policy: TracePolicy,
  ctx: EnceinteContext,
  k: Kernel,
  opts: TraceOptions = {},
): KernelResult<Enceinte & { readonly traced: Traced }> {
  if (policy.waterfront !== 'open') throw new Error(`notBuilt('M1'): the ${policy.waterfront} waterfront and its quay-access and sea gates (§4.4 *Water and the waterfront*; §4b; C-0087)`);
  if (policy.placement !== 'aroundAll') throw new Error(`notBuilt('M1'): an aroundStage trace, an open chain anchored on the previous enceinte (§4.4; §4b)`);
  const arena = opts.key ?? GROUND;
  const stage = opts.stage ?? 1;
  const encId: Id = opts.enceinteId ?? `enceinte:${String(stage)}`;
  const cells = wallCells(ctx);
  const band = cells.bandCm;
  const epoch = ctx.epoch;

  // (1) Barrier closure: every arc open at M0 (the barrier table's rows are V11's).
  const ring0 = ccw(openRing(boundary.map((p) => lat(p))));
  const closure = classifyArcs(ring0.length);

  // The pins: the gates, then C-0087's bank points (and any boundary point kept in the water).
  const withG = withGates(ring0, gateSites);
  const gatePins = new Set(gateSites.map((g) => key(lat(g.at))));
  const waters = waterRings(water, k, arena);
  const crossed = crossWater(withG, gatePins, waters);
  const ring = crossed.ring;
  const pins = new Set<string>([...gatePins, ...crossed.keep]);
  const pinPoints = ring.filter((p) => pins.has(key(p)));
  const core: LatticePoint[][] = [];
  for (const r of reservations) core.push(...ringsOf(k, r.face, arena));
  for (const c of opts.core ?? []) core.push(c.map((p) => lat(p)));
  const barred: Polygon[] = [...waters.map((w) => [...w.ring]), ...core];

  // (2) Pull and pin.
  const mask = pinMask(ring, pins);
  const pulled = pullAndPin(ring, mask, opts.costField ?? terrainCost(terrain), band, barred);

  // (3) Smooth, then F-WALL's trace rungs where the smoothed trace self-touches or crosses the core.
  let line: LatticePoint[] = openRing(smoothPinned(pulled.line, mask, cells.smoothPasses, ring, band, barred));
  const rungs: WallRung[] = [];
  let defect = defectOf(line, core);
  if (defect !== null) {
    const cause = defect;
    const accept = (cand: LatticePoint[]): 'self_touch' | 'core' | 'band' | null => {
      const d = defectOf(cand, core);
      if (d !== null) return d;
      return departure(cand, ring) > band ? 'band' : null;
    };
    const re = reoffset(line, band, pinPoints, core);
    const reWhy = re.ok ? accept(re.value) : re.detail === 'fixed' ? 'pin_lost' : 'empty';
    rungs.push(reWhy === null ? { rung: 'reoffset', cause, radiusCm: band, held: true } : { rung: 'reoffset', cause, radiusCm: band, held: false, why: reWhy });
    if (re.ok && reWhy === null) {
      line = re.value;
      defect = null;
    } else {
      const un = unionOuter(line, pinPoints, core);
      let unWhy: WallRung['why'] | null = un.ok ? null : un.detail === 'fixed' ? 'pin_lost' : 'empty';
      let cand: LatticePoint[] | null = null;
      if (un.ok) {
        const s = simplify([...un.value, un.value[0]], cells.minSegmentCm as Cm, cells.minAngleCdeg, barred, indicesOf(un.value, pins));
        cand = s.ok ? openRing(s.value) : un.value;
        unWhy = accept(cand);
      }
      rungs.push(unWhy === null ? { rung: 'union_simplify', cause, radiusCm: 0, held: true } : { rung: 'union_simplify', cause, radiusCm: 0, held: false, why: unWhy });
      if (unWhy === null && cand !== null) {
        line = cand;
        defect = null;
      }
    }
    if (defect !== null) {
      return { ok: false, code: 'E_SELF_INTERSECT', detail: `F-WALL: the trace ${cause === 'core' ? 'crosses the core' : 'touches itself'} after the re-offset and union-simplify rungs; the later rungs are M1's (§5.2; C-0085)` };
    }
  }

  // The topology-preserving simplify: the water and the reservations its obstacles, the pins kept; skipped when its
  // result would leave the band (C-0224 (4)).
  const before = line.length;
  const simp = simplify([...line, line[0]], cells.minSegmentCm as Cm, cells.minAngleCdeg, barred, indicesOf(line, pins));
  let skipped = true;
  if (simp.ok) {
    const cand = openRing(simp.value);
    if (defectOf(cand, core) === null && departure(cand, ring) <= band) {
      line = cand;
      skipped = false;
    }
  }
  const dep = departure(line, ring);

  // Commit: one L1 batch, the mandatory wall chain with its gate vertices.
  const mains: Gate[] = gateSites.map((g) => {
    const id = `gate:${String(g.ordinal)}`;
    return { id, enceinte: encId, junction: id, way: null, kind: 'main', lifecycle: generated(epoch) };
  });
  const wgs: WaterGate[] = crossed.crossings.map((c, i) => waterGateOf(i, c, encId, epoch));
  const knots: { index: number; role: string; ordinal: number; entity: Id }[] = [];
  const pinned: number[] = [];
  line.forEach((p, i) => {
    if (pins.has(key(p))) pinned.push(i);
    gateSites.forEach((g, j) => {
      if (g.at.x === p.x && g.at.y === p.y) knots.push({ index: i, role: 'gate', ordinal: 0, entity: mains[j].id });
    });
    for (const w of wgs) {
      if (w.bankAt[0].x === p.x && w.bankAt[0].y === p.y) knots.push({ index: i, role: 'gate_end', ordinal: 0, entity: w.id });
      if (w.bankAt[1].x === p.x && w.bankAt[1].y === p.y) knots.push({ index: i, role: 'gate_end', ordinal: 1, entity: w.id });
    }
  });
  const chain = { role: 'wall', entity: encId };
  const committed = k.tx(l1Spec(arena, opts.batchStage ?? STAGES.S5), (o) => {
    const ins = k.geom.insertChain(o, line, [chain], 'mandatory', { closed: true, pinned, knots });
    if (!ins.ok) return err(ins.code, ins.detail);
    for (const w of wgs) {
      const banks = w.banks as [VertexRef, VertexRef];
      const r = k.geom.retypeEdges(o, { chain, from: banks[0], to: banks[1] }, [{ role: 'wall_gate', entity: w.id }], []);
      if (!r.ok) return err(r.code, r.detail);
    }
    return { ok: true, value: ins.value, warnings: ins.warnings };
  });
  if (!committed.ok) return err(committed.code, committed.detail);

  // Every gate on the committed trace exactly (lattice equality; §4.2 S3 (9)'s test), each bank vertex where it was put.
  const p = k.plat(arena);
  for (let j = 0; j < mains.length; j += 1) {
    const r = k.resolve({ role: 'gate', entity: mains[j].id }, arena);
    const v = r.view === 'vertices' && r.vertices.length === 1 ? r.vertices[0] : -1;
    if (v < 0 || p.vertices.x[v] !== gateSites[j].at.x || p.vertices.y[v] !== gateSites[j].at.y) {
      return { ok: false, code: 'E_INVARIANT', detail: `trace: gate ${mains[j].id} is not on the committed trace at its point (§4.2 S3 (9))` };
    }
  }

  const report: TraceReport = {
    closure: closure.closure,
    arcs: closure.arcs,
    pull: { moved: pulled.moved, maxOffsetCm: pulled.maxOffsetCm },
    smoothPasses: cells.smoothPasses,
    simplify: { before, after: line.length, skipped },
    rungs,
    departureCm: dep,
    waterGates: wgs.length,
  };
  const enceinte: Enceinte = {
    id: encId,
    trace: chain,
    strips: { inner: { owner: stripOwner(encId, 'inner'), level: 1 }, outer: { owner: stripOwner(encId, 'outer'), level: 1 } },
    thicknessCm: cells.thicknessCm as Enceinte['thicknessCm'],
    setbackCm: { inner: cells.innerSetbackCm as Enceinte['thicknessCm'], outer: cells.outerSetbackGlacisCm as Enceinte['thicknessCm'] },
    gates: [...mains.map((g) => g.id), ...wgs.map((g) => g.id)],
    stage,
    lifecycle: generated(epoch),
  };
  const traced: Traced = { enceinte, gates: [...mains, ...wgs], waterGates: wgs, line, report };
  return { ok: true, value: { ...enceinte, traced }, warnings: committed.warnings };
}

/** The owner a side's strip faces take (§4.8 "typed `wall_strip`"; C-0224 (9)): `wall_strip:<enceinte token>-<side>`. */
export function stripOwner(enceinte: Id, side: 'inner' | 'outer'): Id {
  const at = enceinte.indexOf(':');
  return `wall_strip:${at < 0 ? enceinte : enceinte.slice(at + 1)}-${side}`;
}

/** The pins' indices on a ring (for the kernel's simplify). */
function indicesOf(ring: readonly XY[], pins: ReadonlySet<string>): number[] {
  const out: number[] = [];
  ring.forEach((p, i) => {
    if (pins.has(key(p))) out.push(i);
  });
  return out;
}

/** The registered strategy (§4.12's `EnceinteStrategy`, name `base`). */
export const baseEnceinte: EnceinteStrategy = Object.freeze({ trace: traceBase });
