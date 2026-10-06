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

/** Centidegrees per radian: 18 000 ÷ π (Math.PI is outside §6.5 (3)'s allowlist). */
const CDEG_PER_RAD = 18000 / 3.141592653589793;

/** A direction's bearing in whole centidegrees in [0, 36000), counter-clockwise from +x (§2.1's one angle unit). */
export function bearingCdeg(dir: XY, atan2: (y: number, x: number) => number): number {
  let a = atan2(dir.y, dir.x) * CDEG_PER_RAD;
  if (a < 0) a += 36000;
  const c = Math.round(a);
  return c >= 36000 ? c - 36000 : c;
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
  readonly what: 'unresolved' | 'not-a-lane-end' | 'lane-end-without-portal' | 'two-portals' | 'gap';
}

/**
 * §13.2's seam portal invariant on committed state: every `baseLane` portal resolves to one vertex that is an end of its
 * lane's chain, every end of a lane in `lanes` lying on a seam's spine carries exactly one `baseLane` portal naming
 * that lane, and along each spine consecutive portals are spaced by the portal gap (arc length on the spine).
 */
export function portalInvariant(p: Plat, key: PlatKey, seams: readonly Seam[], lanes: readonly Way[], cells: Pick<CutCells, 'portalGapMinCm' | 'portalGapLaneFactor'>): PortalProblem[] {
  const problems: PortalProblem[] = [];
  const ends = new Map<Id, LatticePoint[]>();
  for (const lane of lanes) {
    const runs = chainRuns(p, key, lane.spine);
    const pts: LatticePoint[] = [];
    for (const run of runs) pts.push(run[0], run[run.length - 1]);
    ends.set(lane.id, pts);
  }
  const at = (q: LatticePoint): string => `${String(q.x)},${String(q.y)}`;
  for (const seam of seams) {
    const byVertex = new Map<string, Portal[]>();
    for (const portal of seam.portals) {
      const pts = vertexPoints(p, key, portal.at);
      if (pts.length !== 1) {
        problems.push({ seam: seam.id, portal: portal.id, what: 'unresolved' });
        continue;
      }
      const list = byVertex.get(at(pts[0])) ?? [];
      list.push(portal);
      byVertex.set(at(pts[0]), list);
      if (portal.from !== 'baseLane') continue;
      const laneEnds = ends.get(portal.wayId);
      if (laneEnds === undefined || !laneEnds.some((q) => q.x === pts[0].x && q.y === pts[0].y)) problems.push({ seam: seam.id, portal: portal.id, lane: portal.wayId, what: 'not-a-lane-end' });
    }
    for (const list of byVertex.values()) if (list.length > 1) problems.push({ seam: seam.id, portal: list[1].id, what: 'two-portals' });
    // Vice versa: every lane end on one of the seam's way chains is a baseLane portal of that lane.
    for (const e of seam.edges) {
      if (e.chain.role !== 'way') continue;
      const runs = chainRuns(p, key, e.chain);
      const onSpine = new Set<string>();
      for (const run of runs) for (const q of run) onSpine.add(at(q));
      for (const lane of lanes) {
        for (const q of ends.get(lane.id) ?? []) {
          if (!onSpine.has(at(q))) continue;
          const here = byVertex.get(at(q)) ?? [];
          if (!here.some((pt) => pt.from === 'baseLane' && pt.wayId === lane.id)) problems.push({ seam: seam.id, lane: lane.id, what: 'lane-end-without-portal' });
        }
      }
      // The gap along this spine.
      const line: XY[] = runs.length === 1 ? runs[0] : runs.flat();
      const placed: { s: number; w: number; id: Id }[] = [];
      for (const portal of seam.portals) {
        const pts = vertexPoints(p, key, portal.at);
        if (pts.length !== 1 || !onSpine.has(at(pts[0]))) continue;
        placed.push({ s: lengthAt(line, pts[0]), w: portal.widthCm, id: portal.id });
      }
      placed.sort((a, b) => a.s - b.s || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
      for (let i = 1; i < placed.length; i += 1) {
        const gap = portalGap(cells, placed[i - 1].w, placed[i].w);
        // A centimetre of the lattice's rounding on each portal vertex.
        if (placed[i].s - placed[i - 1].s < gap - 2 * LATTICE.unitCm) problems.push({ seam: seam.id, portal: placed[i].id, what: 'gap' });
      }
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
