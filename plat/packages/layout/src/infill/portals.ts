// Seam portals (§4.6 step 7 *Seam portals* (J-P32), §5.3's seam-portal row, §13.2's seam portal invariant; C-0046;
// M0-b-03): S8 records a lane end on a district-bounding spine — a chain two districts share, an arterial or a
// boundary secondary — as a `baseLane` portal in the minimal `Seam` record of that boundary run (C-0046: the two
// districts, the run's chains, its portals; the `SeamAmendment` and the full `SeamContract` are M1's). The portal's
// vertex carries ('portal', portal id); a planned end inside the portal gap of an existing portal — max(6 m, 2 × the
// wider lane's width), cut.settings' cells — slides out of it (the planner's step 7 and ladder.ts's mirror of it).
// When a lane is removed its portal leaves the Seam and its end vertex loses its role and dissolves, so the spine reads
// exactly as it did before the lane (`removeLane`).
// At a vertex several way chains share (a chain's end where another way continues it, a junction), every reading reads
// every chain through the vertex, as the row does (N-57 (1); C-0329): the gap a spine's end slides by holds the
// portals of the chains through its end vertices (`spinePortals`), a portal goes to the district's seam of any chain
// through its vertex (`portalWaysAt`), a continuation onto a vertex of a chain that bounds the district is refused
// (`boundsDistrictAt`), and an insertion whose portal the row would find inside a gap is taken out (`portalGapBreach`).
import { err, LATTICE, ok, outgoing, pointLocate, resolve, rowKey, rowsOn, STAGES, type ChainRef, type Id, type Kernel, type KernelResult, type LatticePoint, type Plat, type PlatKey, type StageId, type VertexId, type VertexRef } from '@plat/kernel';
import type { Junction, Portal, Seam, Way } from '@plat/model';
import type { CutCells, KerbPortal, XY } from './planner.js';
import { lengthAt } from './sides.js';

/** The seam whose run holds the way's chain (a district-bounding spine, J-P32), or undefined (an interior spine). */
export function seamOfSpine(seams: readonly Seam[], wayId: Id): Seam | undefined {
  for (const s of seams) for (const e of s.edges) if (e.chain.role === 'way' && e.chain.entity === wayId) return s;
  return undefined;
}

/**
 * Every seam whose run holds the way's chain, in seam order. One way chain can bound several district pairs — S6's
 * minimal records (C-0046) name a way's whole chain, so a way that runs past three districts is in two or more seams
 * (C-0298).
 */
export function seamsOfSpine(seams: readonly Seam[], wayId: Id): Seam[] {
  return seams.filter((s) => s.edges.some((e) => e.chain.role === 'way' && e.chain.entity === wayId));
}

/**
 * The spine's portals as one record for the planner's gap (§4.6 step 7): the first seam holding the way, with the
 * portals of every seam holding it (each once, in seam order) — a portal on the spine is recorded in its own boundary
 * run's seam, so the gap reads them all, whichever seam records them (C-0298). Undefined on an interior spine.
 */
export function spineSeam(seams: readonly Seam[], wayId: Id): Seam | undefined {
  const all = seamsOfSpine(seams, wayId);
  if (all.length <= 1) return all[0];
  const seen = new Set<Id>();
  const portals: Portal[] = [];
  for (const s of all) {
    for (const p of s.portals) {
      if (seen.has(p.id)) continue;
      seen.add(p.id);
      portals.push(p);
    }
  }
  return { ...all[0], portals };
}

/** The vertices a vertex role names, as lattice points (lattice order). */
export function vertexPoints(p: Plat, key: PlatKey, ref: VertexRef): LatticePoint[] {
  const r = resolve(p, ref, key);
  if (r.view !== 'vertices') return [];
  return r.vertices.map((v) => ({ x: p.vertices.x[v], y: p.vertices.y[v] }) as LatticePoint);
}

/** A chain's runs as point lists (each run in its own direction). */
export function chainRuns(p: Plat, key: PlatKey, ref: ChainRef): LatticePoint[][] {
  const r = resolve(p, ref, key);
  if (r.view !== 'edges') return [];
  const O = p.halfEdges.origin;
  return r.runs.map((run) => {
    const pts = run.map((h) => ({ x: p.vertices.x[O[h]], y: p.vertices.y[O[h]] }) as LatticePoint);
    const lastH = run[run.length - 1];
    const v = O[lastH ^ 1];
    pts.push({ x: p.vertices.x[v], y: p.vertices.y[v] } as LatticePoint);
    return pts;
  });
}

/** The portals on a spine as the planner reads them (§4.6 step 7): each portal vertex with its lane's width. */
export function kerbPortals(p: Plat, key: PlatKey, seam: Seam, wayId: Id, extra: readonly { readonly portal: Portal; readonly at: LatticePoint; readonly spine: Id }[] = []): KerbPortal[] {
  const out: KerbPortal[] = [];
  const seen = new Set<Id>();
  for (const e of extra) {
    if (e.spine !== wayId) continue;
    seen.add(e.portal.id);
    out.push({ at: e.at, laneWidthCm: e.portal.widthCm });
  }
  for (const portal of seam.portals) {
    if (seen.has(portal.id)) continue;
    const pts = vertexPoints(p, key, portal.at);
    if (pts.length !== 1) continue;
    // A portal of another spine of the seam is not on this one: kept when its vertex lies on this way's chain.
    const runs = chainRuns(p, key, { role: 'way', entity: wayId });
    if (!runs.some((run) => run.some((q) => q.x === pts[0].x && q.y === pts[0].y))) continue;
    out.push({ at: pts[0], laneWidthCm: portal.widthCm });
  }
  return out;
}

/** The portal gap at a portal (§4.6 step 7): max(cut.settings.portalGapMinM, factor × the wider lane's width), cm. */
export function portalGap(cells: Pick<CutCells, 'portalGapMinCm' | 'portalGapLaneFactor'>, widthA: number, widthB: number): number {
  return Math.max(cells.portalGapMinCm, cells.portalGapLaneFactor * Math.max(widthA, widthB));
}

// ---- readings at a vertex several way chains share (N-57 (1); C-0329) ------------------------------------------------

/** The vertex at a lattice point of the L1 arrangement, or null (the point lies on no vertex). */
export function vertexAt(p: Plat, key: PlatKey, q: LatticePoint): VertexId | null {
  const at = pointLocate(p, key, 1, q);
  return at.on === 'vertex' ? at.vertex : null;
}

/** The ways whose chains pass through or end at a vertex (its edges' way rows), by id, `except` left out. */
export function waysAt(p: Plat, v: VertexId, except?: Id): Id[] {
  const ids = new Set<Id>();
  for (const h of outgoing(p, v)) {
    for (const r of rowsOn(p, 'edge', h)) {
      const k = rowKey(p, r);
      if (k.role === 'way' && k.entity !== except) ids.add(k.entity);
    }
  }
  return [...ids].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
}

/** A way chain's line as the row reads it: its one run, or its runs end to end (`portalInvariant`'s reading). */
function chainLine(p: Plat, key: PlatKey, wayId: Id): { runs: LatticePoint[][]; line: LatticePoint[] } {
  const runs = chainRuns(p, key, { role: 'way', entity: wayId });
  return { runs, line: runs.length === 1 ? runs[0] : runs.flat() };
}

/**
 * The portals a spine's run carries for the planner's gap (§4.6 step 7; N-57 (1)(a)): its own chain's (`kerbPortals`
 * over every seam holding the way) and, at each END vertex of the run that another way chain held by a seam passes
 * through or ends at, that chain's portals within reach of the vertex (their arc distance along that chain from the
 * vertex under `reachCm` of their lane's width) — each placed AT the shared vertex: its position on the spine's own
 * line through the vertex, clipped at the run's end. So an end planned on the spine within a portal's gap of the
 * vertex slides off it (or the cut takes its next rung), as the row reads the vertex on both chains. `bounding` is
 * true when the spine's own chain is a seam's or a chain through an end vertex carries such a portal.
 */
export function spinePortals(
  p: Plat,
  key: PlatKey,
  seams: readonly Seam[],
  wayId: Id,
  run: readonly LatticePoint[],
  extra: readonly { readonly portal: Portal; readonly at: LatticePoint; readonly spine: Id }[],
  reachCm: (laneWidthCm: number) => number,
): { portals: KerbPortal[]; bounding: boolean } {
  const own = spineSeam(seams, wayId);
  const portals: KerbPortal[] = own === undefined ? [] : kerbPortals(p, key, own, wayId, extra);
  let across = 0;
  const ends = run.length === 0 ? [] : run[0].x === run[run.length - 1].x && run[0].y === run[run.length - 1].y ? [run[0]] : [run[0], run[run.length - 1]];
  for (const q of ends) {
    const v = vertexAt(p, key, q);
    if (v === null) continue;
    for (const other of waysAt(p, v, wayId)) {
      const seam = spineSeam(seams, other);
      if (seam === undefined) continue;
      const { line } = chainLine(p, key, other);
      const sv = lengthAt(line, q);
      for (const kp of kerbPortals(p, key, seam, other, extra)) {
        if (!(Math.abs(lengthAt(line, kp.at) - sv) < reachCm(kp.laneWidthCm))) continue;
        portals.push({ at: q, laneWidthCm: kp.laneWidthCm });
        across += 1;
      }
    }
  }
  return { portals, bounding: own !== undefined || across > 0 };
}

/**
 * The ways through a vertex a portal there could be recorded under, in the order S8 tries them (N-57 (1)(b)): the
 * planned end's spine first (when it has one), then every other way through the vertex by id — so a lane end on a
 * vertex of a district-bounding chain is that chain's portal whichever spine the planner read it on.
 */
export function portalWaysAt(p: Plat, v: VertexId, laneId: Id, spineWay: Id | null): Id[] {
  const rest = waysAt(p, v, laneId).filter((w) => w !== spineWay);
  return spineWay === null ? rest : [spineWay, ...rest];
}

/**
 * Does a way chain through the vertex bound the district — one held by a seam with the district as a side (N-57
 * (1)(b))? Step 10's continuation reads it: a crossroads onto such a vertex crosses the district's boundary.
 */
export function boundsDistrictAt(p: Plat, seams: readonly Seam[], v: VertexId, district: Id, except?: Id): boolean {
  return waysAt(p, v, except).some((w) => seamsOfSpine(seams, w).some((s) => s.sides.includes(district)));
}

/**
 * Would a `baseLane` portal of width `widthCm` at vertex `v`, recorded in `seamId`, breach the row (§13.2's seam portal
 * invariant, as `portalInvariant` reads it; N-57 (1))? True when the vertex already carries a portal of any seam
 * (`two-portals`), or when along a way chain of that seam through the vertex a portal of a seam holding the chain lies
 * nearer than the portal gap, less the row's centimetre of rounding on each vertex (`gap`). `pending` are portals of
 * the same insertion not yet in the seams (their seam, vertex and width).
 */
export function portalGapBreach(
  p: Plat,
  key: PlatKey,
  seams: readonly Seam[],
  seamId: Id,
  v: VertexId,
  widthCm: number,
  cells: Pick<CutCells, 'portalGapMinCm' | 'portalGapLaneFactor'>,
  pending: readonly { readonly seam: Id; readonly at: LatticePoint; readonly widthCm: number }[] = [],
): 'two-portals' | 'gap' | null {
  const q = { x: p.vertices.x[v], y: p.vertices.y[v] } as LatticePoint;
  const same = (a: LatticePoint): boolean => a.x === q.x && a.y === q.y;
  if (pending.some((x) => same(x.at))) return 'two-portals';
  for (const s of seams) {
    for (const portal of s.portals) {
      const pts = vertexPoints(p, key, portal.at);
      if (pts.length === 1 && same(pts[0])) return 'two-portals';
    }
  }
  const seam = seams.find((s) => s.id === seamId);
  if (seam === undefined) return null;
  for (const e of seam.edges) {
    if (e.chain.role !== 'way') continue;
    const { runs, line } = chainLine(p, key, e.chain.entity);
    const on = (a: LatticePoint): boolean => runs.some((run) => run.some((z) => z.x === a.x && z.y === a.y));
    if (!on(q)) continue;
    const sv = lengthAt(line, q);
    const holding = seamsOfSpine(seams, e.chain.entity);
    const seen = new Set<Id>();
    const near = (at: LatticePoint, w: number): boolean => Math.abs(lengthAt(line, at) - sv) < portalGap(cells, w, widthCm) - 2 * LATTICE.unitCm;
    for (const h of holding) {
      for (const portal of h.portals) {
        if (seen.has(portal.id)) continue;
        seen.add(portal.id);
        const pts = vertexPoints(p, key, portal.at);
        if (pts.length !== 1 || !on(pts[0])) continue;
        if (near(pts[0], portal.widthCm)) return 'gap';
      }
    }
    for (const x of pending) if (holding.some((h) => h.id === x.seam) && on(x.at) && near(x.at, x.widthCm)) return 'gap';
  }
  return null;
}

/** A problem the portal invariant found (§5.3's seam-portal row). */
export interface PortalProblem {
  readonly seam: Id;
  readonly portal?: Id;
  readonly lane?: Id;
  readonly what: 'unresolved' | 'not-a-lane-end' | 'off-seam' | 'wrong-seam' | 'lane-end-without-portal' | 'two-portals' | 'gap';
}

/**
 * §13.2's seam portal invariant on committed state ("every `baseLane` portal matches one S8 lane end and vice versa,
 * spaced by the portal gap"; checked as "the `Seam` records against the lanes' end vertices"), over all the seams at
 * once, because one way chain can lie in several seams (C-0298):
 * - every portal resolves to one vertex (`unresolved`), and no vertex carries two portals of any seams (`two-portals`);
 * - every `baseLane` portal's vertex is an end of its lane's chain (`not-a-lane-end`), lies on one of its seam's way
 *   chains (`off-seam`), and its seam is the boundary run of the district that added it — that district one of the
 *   seam's two sides (`wrong-seam`, C-0046's minimal record: the two districts, the run's chains, its portals);
 * - vice versa, every end of a lane in `lanes` lying on a way chain of a seam carries exactly one `baseLane` portal
 *   naming that lane, in some seam holding that chain (`lane-end-without-portal`; a second is `two-portals`) — with
 *   `laneDistrict` (each lane's district), only the seams that hold the chain AND have the lane's district as a side
 *   ask for it: a lane end on a way that is other districts' boundary run, never its own district's, has no run to be
 *   a portal of;
 * - along each way chain the seams hold, consecutive portals of all the seams holding it are spaced by the portal gap
 *   (arc length on the spine; `gap`).
 */
export function portalInvariant(p: Plat, key: PlatKey, seams: readonly Seam[], lanes: readonly Way[], cells: Pick<CutCells, 'portalGapMinCm' | 'portalGapLaneFactor'>, laneDistrict?: ReadonlyMap<Id, Id>): PortalProblem[] {
  const problems: PortalProblem[] = [];
  const at = (q: LatticePoint): string => `${String(q.x)},${String(q.y)}`;
  const ends = new Map<Id, LatticePoint[]>();
  for (const lane of lanes) {
    const runs = chainRuns(p, key, lane.spine);
    const pts: LatticePoint[] = [];
    for (const run of runs) pts.push(run[0], run[run.length - 1]);
    ends.set(lane.id, pts);
  }
  // Each way chain the seams hold: its runs and its points (read once).
  const spines = new Map<Id, { runs: LatticePoint[][]; points: Set<string>; seams: Seam[] }>();
  for (const seam of seams) {
    for (const e of seam.edges) {
      if (e.chain.role !== 'way') continue;
      let sp = spines.get(e.chain.entity);
      if (sp === undefined) {
        const runs = chainRuns(p, key, e.chain);
        const points = new Set<string>();
        for (const run of runs) for (const q of run) points.add(at(q));
        sp = { runs, points, seams: [] };
        spines.set(e.chain.entity, sp);
      }
      if (!sp.seams.includes(seam)) sp.seams.push(seam);
    }
  }
  // Every portal of every seam, at its vertex.
  const byVertex = new Map<string, { seam: Seam; portal: Portal }[]>();
  const placedAt = new Map<Id, LatticePoint>();
  for (const seam of seams) {
    const ownSpines = seam.edges.filter((e) => e.chain.role === 'way').map((e) => spines.get(e.chain.entity));
    for (const portal of seam.portals) {
      if (placedAt.has(portal.id)) {
        // One portal recorded twice (in two seams, or twice in one).
        problems.push({ seam: seam.id, portal: portal.id, what: 'two-portals' });
        continue;
      }
      const pts = vertexPoints(p, key, portal.at);
      if (pts.length !== 1) {
        problems.push({ seam: seam.id, portal: portal.id, what: 'unresolved' });
        continue;
      }
      placedAt.set(portal.id, pts[0]);
      const list = byVertex.get(at(pts[0])) ?? [];
      list.push({ seam, portal });
      byVertex.set(at(pts[0]), list);
      if (portal.from !== 'baseLane') continue;
      const laneEnds = ends.get(portal.wayId);
      if (laneEnds === undefined || !laneEnds.some((q) => q.x === pts[0].x && q.y === pts[0].y)) problems.push({ seam: seam.id, portal: portal.id, lane: portal.wayId, what: 'not-a-lane-end' });
      if (!ownSpines.some((sp) => sp !== undefined && sp.points.has(at(pts[0])))) problems.push({ seam: seam.id, portal: portal.id, lane: portal.wayId, what: 'off-seam' });
      if (portal.by === undefined || !seam.sides.includes(portal.by)) problems.push({ seam: seam.id, portal: portal.id, lane: portal.wayId, what: 'wrong-seam' });
    }
  }
  for (const list of byVertex.values()) if (list.length > 1) problems.push({ seam: list[1].seam.id, portal: list[1].portal.id, what: 'two-portals' });
  // Vice versa: every lane end on a way chain of any seam is a baseLane portal of that lane, in a seam holding the chain.
  for (const lane of lanes) {
    const district = laneDistrict?.get(lane.id);
    const asks = (s: Seam): boolean => laneDistrict === undefined || (district !== undefined && s.sides.includes(district));
    const seenEnd = new Set<string>();
    for (const q of ends.get(lane.id) ?? []) {
      const k = at(q);
      if (seenEnd.has(k)) continue;
      seenEnd.add(k);
      const holding: Seam[] = [];
      for (const sp of spines.values()) if (sp.points.has(k)) for (const s of sp.seams) if (asks(s) && !holding.includes(s)) holding.push(s);
      if (holding.length === 0) continue;
      const here = (byVertex.get(k) ?? []).filter((x) => x.portal.from === 'baseLane' && x.portal.wayId === lane.id && holding.includes(x.seam));
      if (here.length === 0) problems.push({ seam: holding[0].id, lane: lane.id, what: 'lane-end-without-portal' });
    }
  }
  // The gap along each spine, over the portals of every seam holding it.
  for (const [, sp] of [...spines.entries()].sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0))) {
    const line: XY[] = sp.runs.length === 1 ? sp.runs[0] : sp.runs.flat();
    const placed: { s: number; w: number; id: Id; seam: Id }[] = [];
    const seen = new Set<Id>();
    for (const seam of sp.seams) {
      for (const portal of seam.portals) {
        const q = placedAt.get(portal.id);
        if (q === undefined || seen.has(portal.id) || !sp.points.has(at(q))) continue;
        seen.add(portal.id);
        placed.push({ s: lengthAt(line, q), w: portal.widthCm, id: portal.id, seam: seam.id });
      }
    }
    placed.sort((a, b) => a.s - b.s || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
    for (let i = 1; i < placed.length; i += 1) {
      const gap = portalGap(cells, placed[i - 1].w, placed[i].w);
      // A centimetre of the lattice's rounding on each portal vertex.
      if (placed[i].s - placed[i - 1].s < gap - 2 * LATTICE.unitCm) problems.push({ seam: placed[i].seam, portal: placed[i].id, what: 'gap' });
    }
  }
  return problems;
}

/** What `removeLane` returns: the seams without the lane's portals, the junctions it dissolved. */
export interface LaneRemoval {
  readonly seams: Seam[];
  readonly removedPortals: Id[];
  readonly removedJunctions: Id[];
  readonly version: number;
}

/**
 * Removes a lane S8 inserted (§4.6 step 7's re-derivation case; §3.4 `removeEdges`): one L1 callback batch removing the
 * lane's chain, then each of its portals' and its own junctions' vertex rows, so each end vertex — left with no role and
 * two spine edges — dissolves (§2.2 rule 3) and the spine reads as it did before the lane; the lane's portals leave
 * their Seam. `junctions` are the lane's own end junctions (S8's records whose arms are the spine and the lane).
 */
export function removeLane(k: Kernel, key: PlatKey, lane: Way, seams: readonly Seam[], junctions: readonly Junction[] = [], stage: StageId = STAGES.S8): KernelResult<LaneRemoval> {
  const portals: Portal[] = [];
  for (const s of seams) for (const portal of s.portals) if (portal.from === 'baseLane' && portal.wayId === lane.id) portals.push(portal);
  const own = junctions.filter((j) => j.arms.includes(lane.id) && j.arms.length <= 2);
  const r = k.tx(
    { key, level: 1, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage }, stage, rederivesFrom: stage, workLimit: 1_000_000 },
    (o) => {
      const a = k.geom.removeEdges(o, lane.spine);
      if (!a.ok) return a;
      for (const portal of portals) {
        const b = k.geom.removeEdges(o, portal.at);
        if (!b.ok) return b;
      }
      for (const j of own) {
        const c = k.geom.removeEdges(o, j.vertex);
        if (!c.ok) return c;
      }
      return ok(undefined);
    },
  );
  if (!r.ok) return err(r.code, r.detail);
  const gone = new Set(portals.map((x) => x.id));
  return ok({
    seams: seams.map((s) => ({ ...s, portals: s.portals.filter((x) => !gone.has(x.id)) })),
    removedPortals: portals.map((x) => x.id),
    removedJunctions: own.map((j) => j.id),
    version: k.plat(key).version,
  });
}
