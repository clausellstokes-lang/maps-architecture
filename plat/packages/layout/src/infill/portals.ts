// Seam portals (§4.6 step 7 *Seam portals* (J-P32), §5.3's seam-portal row, §13.2's seam portal invariant; C-0046;
// M0-b-03): S8 records a lane end on a district-bounding spine — a chain two districts share, an arterial or a
// boundary secondary — as a `baseLane` portal in the minimal `Seam` record of that boundary run (C-0046: the two
// districts, the run's chains, its portals; the `SeamAmendment` and the full `SeamContract` are M1's). The portal's
// vertex carries ('portal', portal id); a planned end inside the portal gap of an existing portal — max(6 m, 2 × the
// wider lane's width), cut.settings' cells — slides out of it (the planner's step 7 and ladder.ts's mirror of it).
// When a lane is removed its portal leaves the Seam and its end vertex loses its role and dissolves, so the spine reads
// exactly as it did before the lane (`removeLane`).
import { err, LATTICE, ok, resolve, STAGES, type ChainRef, type Id, type Kernel, type KernelResult, type LatticePoint, type Plat, type PlatKey, type StageId, type VertexRef } from '@plat/kernel';
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
 * - vice versa, every end of a lane in `lanes` lying on a way chain of any seam carries exactly one `baseLane` portal
 *   naming that lane, in some seam holding that chain (`lane-end-without-portal`; a second is `two-portals`);
 * - along each way chain the seams hold, consecutive portals of all the seams holding it are spaced by the portal gap
 *   (arc length on the spine; `gap`).
 */
export function portalInvariant(p: Plat, key: PlatKey, seams: readonly Seam[], lanes: readonly Way[], cells: Pick<CutCells, 'portalGapMinCm' | 'portalGapLaneFactor'>): PortalProblem[] {
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
    const seenEnd = new Set<string>();
    for (const q of ends.get(lane.id) ?? []) {
      const k = at(q);
      if (seenEnd.has(k)) continue;
      seenEnd.add(k);
      const holding: Seam[] = [];
      for (const sp of spines.values()) if (sp.points.has(k)) for (const s of sp.seams) if (!holding.includes(s)) holding.push(s);
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
