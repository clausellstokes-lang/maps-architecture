// The registered EnceinteStrategy `base` (§4.12; §4.4 S5a *Trace*; §4.2 S3 (9); C-0032, C-0085, C-0087; M0-c-02): the
// stage boundary → the committed L1 wall chain with its gate vertices, in one rule set —
//   (1) barrier closure: the arc classifier over the barrier table (empty at M0: every arc open, the ring closed);
//   (2) pull and pin: the cost-surface path within the 40 m band, the gates and the water crossings' bank points pinned;
//   (3) smooth and simplify: 3 pinned Laplacian passes, F-WALL's trace rungs where the smoothed trace self-touches or
//       crosses the core (re-offset, then union-simplify), the kernel's topology-preserving Visvalingam (20 m, no
//       interior angle < 100°; a removal that would touch the trace itself, cross the water, enter a reservation or the
//       core, or move a pin is refused), then `insertChain` on L1 as a `mandatory` chain carrying `wall` on the
//       enceinte, each main gate's vertex carrying ('gate', gate) and each water gate's two bank vertices
//       ('gate_end', gate, 0 | 1), the wall's edge between them taking ('wall_gate', gate) (C-0226 (1)).
// §4.2 S3 (9)'s band (40 m from the boundary as given, never the ring after the water splice) is held on every side by
// the smoothing and the simplify and proved before the commit and again on the line the insertion placed; a trace not
// proved within it is refused E_INVARIANT `band`, never committed (C-0232). So is the water (N-54 (1); §4.4 *Water and
// the waterfront*: the trace crosses water only at a water gate): every SIDE, not only every vertex, is kept off the
// water and the reservations by the pull, the smoothing, F-WALL's verdict and the simplify (`wet.ts`), and proved
// before the commit (no side over water or a reservation unless it is a water gate's chord between its two bank pins)
// and again inside it on the committed wall edges, STRICTLY (N-54 (1) residual, session round s2, C-0300): each water
// gate's `wall_gate` run is exactly one edge and that edge joins the gate's two `gate_end` vertices, and an edge over
// water carries its gate's `wall_gate`; a crossing with no clear chord (the chord would leave the water, a main gate
// stands in it, or it passes an existing vertex no shore holds, `water.ts`'s settling) is refused before anything is
// pulled — but a crossing whose straight chord would leave the water (a river bend) is first routed along its banks
// within the band to a clear chord (`water.ts`, C-0324; Q40, J264). A trace that fails is refused E_INVARIANT `water`,
// nothing written. Each water gate takes the lowest `gate:w<i>` no earlier enceinte's gate holds (C-0324 (3)).
// Every value it reads is a walls.json cell (`trace/*`, the era row). The trace is laid `standing` (no condition is
// written: the profile is M2b's). The batch is S5a's for k = 1 (§4.1's S5 row commits S3's trace; C-0226 (2)).
import { err, simplify, STAGES, type Cm, type Kernel, type KernelResult, type KernelTx, type LatticePoint, type PlatKey, type Polygon, type StageId, type VertexRef } from '@plat/kernel';
import type { Enceinte, Gate, GateSite, Id, Reservation, Terrain, WaterSet } from '@plat/model';
import { classifyArcs } from './closure.js';
import { bandBreaches, bandLimit, ccw, departure, distToRing, footOn, lat, openRing, sideHolds, TOUCH_CM } from './plane.js';
import { pullAndPin, smoothPinned, terrainCost } from './pull.js';
import { defectOf, placePins, reoffset, rungVerdict, unionOuter } from './rungs.js';
import type { EnceinteContext, EnceinteStrategy, TraceOptions, TracePolicy, Traced, TraceReport, WallRung, WaterGate, XY } from './types.js';
import { arenaVertices, crossWater, generated, GROUND, waterGateOf, waterRings } from './water.js';
import { wetSides } from './wet.js';

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
  // A crossing whose chord would leave the water is routed along its banks within the band of the boundary as given
  // (C-0324; J264: a river bend between the banks is lawful input).
  const crossed = crossWater(withG, gatePins, waters, arenaVertices(k, arena), { ring: ring0, bandCm: band });
  // A water gate's wet side is its chord between its two bank pins, laid as one edge (§2.2 rule 7; N-54 (1), strict):
  // a crossing with no clear chord is refused here, nothing written (C-0300).
  const unclear = crossed.crossings.find((c) => !c.clear);
  if (unclear !== undefined) {
    const gateIn = unclear.course.some((q) => gatePins.has(key(q)));
    const why = unclear.chord ? 'its chord passes an existing vertex no shore holds, or leaves the water once its banks are settled' : gateIn ? 'a main gate stands in the water between its banks' : 'its chord would leave the water, and no route along its banks within the band gives a clear chord (C-0324)';
    return { ok: false, code: 'E_INVARIANT', detail: `water: the crossing from ${key(unclear.entry)} to ${key(unclear.exit)} has no clear chord between its two bank pins (${why}); a water gate's wet side is that chord, one edge (§4.4 *Water and the waterfront*, §2.2 rule 7; N-54 (1); C-0300)` };
  }
  const ring = crossed.ring;
  const pins = new Set<string>([...gatePins, ...crossed.keep]);
  const pinPoints = ring.filter((p) => pins.has(key(p)));
  const core: LatticePoint[][] = [];
  for (const r of reservations) core.push(...ringsOf(k, r.face, arena));
  for (const c of opts.core ?? []) core.push(c.map((p) => lat(p)));
  const barred: Polygon[] = [...waters.map((w) => [...w.ring]), ...core];
  // The sides' test over the barred rings, each water gate's course exempt over the water (N-54 (1)).
  const wet = wetSides(barred, waters.length, crossed.crossings.map((c) => c.course));

  // (2) Pull and pin.
  const mask = pinMask(ring, pins);
  const pulled = pullAndPin(ring, mask, opts.costField ?? terrainCost(terrain), band, barred, wet);

  // (3) Smooth, then F-WALL's trace rungs where the smoothed trace self-touches or crosses the core. The band is held
  // against the boundary as given (`ring0`), never the ring after the water splice (C-0232 (3)).
  let line: LatticePoint[] = openRing(smoothPinned(pulled.line, mask, cells.smoothPasses, ring0, band, barred, wet));
  const rungs: WallRung[] = [];
  let defect = defectOf(line, core);
  if (defect !== null) {
    const cause = defect;
    const accept = (cand: LatticePoint[]): 'self_touch' | 'core' | 'water' | 'band' | null => rungVerdict(cand, ring0, band, core, wet);
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
        cand = simplifyInBand(un.value, ring0, band, cells, barred, pins) ?? un.value;
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

  // The topology-preserving simplify: the water and the reservations its obstacles, the pins kept, and held within the
  // band (C-0226 (4)); its result unused only when it still shows a defect.
  const before = line.length;
  const simp = simplifyInBand(line, ring0, band, cells, barred, pins);
  let skipped = true;
  if (simp !== null && defectOf(simp, core) === null && wet.firstOver(simp) < 0) {
    line = simp;
    skipped = false;
  }
  // §4.2 S3 (9)'s band, proved on every side of the line before it is committed (C-0232 (2)): a trace that leaves it is
  // refused, never committed (the smoothing and the simplify hold it; this is the last word).
  const limit = bandLimit(band);
  const over = bandBreaches(line, ring0, limit);
  if (over.length > 0) {
    return { ok: false, code: 'E_INVARIANT', detail: `band: the trace departs from its boundary by more than ${String(band)} cm on ${String(over.length)} side(s), first from ${key(line[over[0]])} (§4.2 S3 (9); C-0232)` };
  }
  // The water and the reservations, proved on every side before the commit (N-54 (1)): a side over either that is no
  // side of a water gate's course refuses the trace, nothing written.
  const wetAt = wet.firstOver(line);
  if (wetAt >= 0) {
    const b = line[wetAt + 1 === line.length ? 0 : wetAt + 1];
    return { ok: false, code: 'E_INVARIANT', detail: `water: the trace's side ${key(line[wetAt])} → ${key(b)} lies over water or a reservation and is no water gate's course (§4.4 *Water and the waterfront*; N-54 (1))` };
  }
  const dep = departure(line, ring0);

  // Commit: one L1 batch, the mandatory wall chain with its gate vertices.
  const mains: Gate[] = gateSites.map((g) => {
    const id = `gate:${String(g.ordinal)}`;
    return { id, enceinte: encId, junction: id, way: null, kind: 'main', lifecycle: generated(epoch) };
  });
  // Each water gate takes the lowest `gate:w<i>` no earlier enceinte's water gate holds in the arena (C-0324 (3)): a
  // stage-2 trace crossing the river where stage 1's trace also crosses it wrote `gate:w0` again, so its gate_end refs
  // resolved to two vertices and the retype below was refused E_DEGENERATE `stretch` (base river seed 2, 900 ha). A
  // first trace — and any trace with no earlier water gate — keeps its ids `gate:w0` … in crossing order.
  const heldId = (id: Id): boolean => {
    const r = k.resolve({ role: 'gate_end', entity: id, ordinal: 0 }, arena);
    return r.view === 'vertices' && r.vertices.length > 0;
  };
  let nextW = 0;
  const wgs: WaterGate[] = crossed.crossings.map((c) => {
    while (heldId(`gate:w${String(nextW)}`)) nextW += 1;
    const g = waterGateOf(nextW, c, encId, epoch);
    nextW += 1;
    return g;
  });
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
    // The band once more on the line as the insertion placed it (its attraction moves a vertex by up to 26 cm): a side
    // it carried out of the band refuses the batch, everything undone (C-0232 (2)).
    const pl = k.plat(arena);
    const placed = ins.value.placed.map((v) => ({ x: pl.vertices.x[v], y: pl.vertices.y[v] }));
    const outAt = placed.findIndex((q, i) => !sideHolds(q, placed[i + 1 === placed.length ? 0 : i + 1], ring0, band));
    if (outAt >= 0) return err('E_INVARIANT', `band: the inserted trace departs from its boundary by more than ${String(band)} cm from ${key(placed[outAt])} (§4.2 S3 (9); C-0232)`);
    for (const w of wgs) {
      const banks = w.banks as [VertexRef, VertexRef];
      const r = k.geom.retypeEdges(o, { chain, from: banks[0], to: banks[1] }, [{ role: 'wall_gate', entity: w.id }], []);
      if (!r.ok) return err(r.code, r.detail);
    }
    // Each water gate's wet side is exactly its chord: one wall_gate edge joining its two gate_end vertices, never a
    // shore edge between a pin and the chord (N-54 (1), strict; C-0300).
    const loose = looseGate(k, arena, wgs);
    if (loose !== null) return err('E_INVARIANT', `water: ${loose} (§4.4 *Water and the waterfront*, §2.2 rule 7; N-54 (1); C-0300)`);
    // The water once more on the wall's edges as committed (the insertion's attraction and its Steiner vertices
    // included): an edge over water carries its water gate's `wall_gate`, or the batch is refused (N-54 (1)).
    const wetEdge = committedWetEdge(k, arena, chain, wgs.map((w) => w.id), barred, waters.length);
    if (wetEdge !== null) return err('E_INVARIANT', `water: the committed wall edge ${wetEdge} lies over water or a reservation and carries no wall_gate (§4.4 *Water and the waterfront*; N-54 (1))`);
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

/**
 * The kernel's topology-preserving simplify (§3.4) at walls.json's minimum segment and angle, with the barred rings as
 * its obstacles and the pins kept, held within the band of the boundary `ring` (the boundary as given): where a side of
 * its result is not proved to keep the band (`sideHolds`, C-0232 (2)), the removed vertex farthest from that side is
 * pinned and the simplify runs again (C-0226 (4)). Null when the kernel refuses the line, or when a side not proved to
 * keep the band has no removed vertex to pin (the input's own side: the simplify cannot repair it; C-0232 (1)).
 */
export function simplifyInBand(line: readonly LatticePoint[], ring: readonly XY[], band: number, cells: WallCells, barred: readonly Polygon[], pins: ReadonlySet<string>): LatticePoint[] | null {
  const held = new Set(pins);
  const limit = bandLimit(band);
  for (let round = 0; round <= line.length; round += 1) {
    const s = simplify([...line, line[0]], cells.minSegmentCm as Cm, cells.minAngleCdeg, barred, indicesOf(line, held));
    if (!s.ok) return null;
    const out = openRing(s.value);
    // The kept vertices' places in the input, in order.
    const at = out.map((q) => line.findIndex((p) => p.x === q.x && p.y === q.y));
    if (at.some((j) => j < 0)) return null;
    let worst = -1;
    for (let i = 0; i < out.length && worst < 0; i += 1) {
      const a = out[i];
      const b = out[i + 1 === out.length ? 0 : i + 1];
      if (sideHolds(a, b, ring, limit)) continue;
      // The removed vertices between a and b: pin the farthest from the side ab.
      const to = at[i + 1 === out.length ? 0 : i + 1];
      let worstD = -1;
      for (let j = at[i] + 1 === line.length ? 0 : at[i] + 1; j !== to; j = j + 1 === line.length ? 0 : j + 1) {
        const d = footOn(line[j], a, b).d2;
        if (d > worstD) {
          worstD = d;
          worst = j;
        }
      }
      if (worst < 0) return null;
    }
    if (worst < 0) return out;
    held.add(key(line[worst]));
  }
  return null;
}

/** The owner a side's strip faces take (§4.8 "typed `wall_strip`"; C-0226 (9)): `wall_strip:<enceinte token>-<side>`. */
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

/**
 * The first water gate whose committed `wall_gate` run is not exactly one edge joining its two `gate_end` vertices
 * (each resolving to one vertex), described; or null. Read through the façade inside the open batch (N-54 (1), strict).
 */
function looseGate(k: Kernel, arena: PlatKey, gates: readonly WaterGate[]): string | null {
  const p = k.plat(arena);
  const at = (v: number): string => `${String(p.vertices.x[v])},${String(p.vertices.y[v])}`;
  for (const g of gates) {
    const ends: number[] = [];
    for (const ordinal of [0, 1]) {
      const r = k.resolve({ role: 'gate_end', entity: g.id, ordinal }, arena);
      if (r.view !== 'vertices' || r.vertices.length !== 1) return `the water gate ${g.id}'s gate_end ${String(ordinal)} does not resolve to one vertex`;
      ends.push(r.vertices[0]);
    }
    const q = k.resolve({ role: 'wall_gate', entity: g.id }, arena);
    const edges: number[] = [];
    if (q.view === 'edges') for (const run of q.runs) for (const h of run) edges.push(h);
    if (edges.length !== 1) return `the water gate ${g.id}'s wall_gate run between ${at(ends[0])} and ${at(ends[1])} is ${String(edges.length)} edges, not its one chord`;
    const u = p.halfEdges.origin[edges[0]];
    const w = p.halfEdges.origin[edges[0] ^ 1];
    if (!((u === ends[0] && w === ends[1]) || (u === ends[1] && w === ends[0]))) return `the water gate ${g.id}'s wall_gate edge ${at(u)} → ${at(w)} does not join its two gate_end vertices ${at(ends[0])} and ${at(ends[1])}`;
  }
  return null;
}

/**
 * The first committed edge of `chain` lying over a barred ring ("x,y → x,y"), or null — an edge of a `wall_gate` run of
 * `gates` tested against the reservations only (the first `waterCount` rings are the water it may cross); read through
 * the façade inside the open batch (N-54 (1)).
 */
function committedWetEdge(k: Kernel, arena: PlatKey, chain: { role: string; entity: Id }, gates: readonly Id[], barred: readonly Polygon[], waterCount: number): string | null {
  const r = k.resolve(chain, arena);
  if (r.view !== 'edges') return `(the wall ${chain.entity} does not resolve to edges)`;
  const gated = new Set<number>();
  for (const g of gates) {
    const q = k.resolve({ role: 'wall_gate', entity: g }, arena);
    if (q.view === 'edges') for (const run of q.runs) for (const h of run) gated.add(h >> 1);
  }
  const every = wetSides(barred, 0);
  const reserved = wetSides(barred.slice(waterCount), 0);
  const p = k.plat(arena);
  for (const run of r.runs) {
    for (const h of run) {
      const a = { x: p.vertices.x[p.halfEdges.origin[h]], y: p.vertices.y[p.halfEdges.origin[h]] };
      const b = { x: p.vertices.x[p.halfEdges.origin[h ^ 1]], y: p.vertices.y[p.halfEdges.origin[h ^ 1]] };
      if ((gated.has(h >> 1) ? reserved : every).over(a, b)) return `${key(a)} → ${key(b)}`;
    }
  }
  return null;
}

/** The registered strategy (§4.12's `EnceinteStrategy`, name `base`). */
export const baseEnceinte: EnceinteStrategy = Object.freeze({ trace: traceBase });
