// S1's L0 batches (M0-e-03; §4.1's S1 row: "L0: first the arena's outer ring — the frame plus its context margin, one
// closed chain carrying the structural `margin` role on the arena's `Terrain` entity, so every L0 face has a boundary
// before any water exists — then water faces, shores and banks (a sea or river reaching the arena's edge shares that
// ring, one edge carrying both roles) … and every crossing site's two pinned `deck_end` bank vertices"; §4.2 S1 (5),
// (8); §2.2 rules 1, 5, 7).
//
// `outerRingBatch` commits the ring alone, so the L0 view holds one face before any water. `waterFaces` commits the
// water in one callback batch (§4.1: S1 registers as callback, "always safe"): (1) each body's polygon rings, in body
// order, as closed mandatory chains carrying `('shore', body)`, each crossing site's two ends inserted into the ring
// they lie on as vertices carrying `('deck_end', bridge, 0 | 1)` (exempt from decimation); (2) each body's L0 faces —
// the faces its seeds lie in (C-0229 (3)) — owned by the body; (3) the land components by flood fill, each owning its
// faces; (4) `('bank', body)` on every shore edge of a river, tributary or estuary whose other side is land (a stretch
// on the outer ring or between two bodies is shore only; C-0229 (6)); (5) the deck ends pinned. A face claimed by two
// bodies, or a body left with no face, is refused E_INVARIANT (detect and refuse): the batch writes nothing.
import {
  compareFaces,
  err,
  faceWalk,
  idOf,
  isFaceLive,
  ok,
  rowKey,
  rowsOn,
  type FaceId,
  type HalfEdgeId,
  type Kernel,
  type KernelResult,
  type KernelTx,
  type Knot,
  type LatticePoint,
  type Overlay,
  type Plat,
  type RoleRow,
  type StretchRef,
  type VertexRef,
} from '@plat/kernel';
import type { Bridge, Cm, Id, PlatKey, StageId, WaterBody } from '@plat/model';
import { generatedLifecycle } from '../terrain/heightfield.js';
import { outerRing, type Reach } from './geometry.js';
import type { CrossingSite, LandComponent, WaterFaces, WaterReach } from './types.js';

/** What both batches read: the arena, the stage issuing them and the work limit (operations). */
export interface L0BatchOptions {
  key: PlatKey;
  stage: StageId;
  workLimit: number;
}

/** The L0 batch spec of S1 (callback form; nothing re-derived before S1, so `rederivesFrom` is S1 itself). */
function spec(o: L0BatchOptions): KernelTx {
  return { key: o.key, level: 0, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: o.stage }, stage: o.stage, rederivesFrom: o.stage, workLimit: o.workLimit };
}

/**
 * The arena's outer ring, committed alone (§4.1's S1 row, §2.2 rule 1): the frame plus its margin as one closed
 * mandatory chain carrying `('margin', terrain)`. Returns the arena's version after the commit.
 */
export function outerRingBatch(k: Kernel, terrain: Id, reach: Reach, opts: L0BatchOptions): KernelResult<number> {
  const r = k.tx(spec(opts), (o) => k.geom.insertChain(o, outerRing(reach), [{ role: 'margin', entity: terrain }], 'mandatory', { closed: true }));
  if (!r.ok) return err(r.code, `S1 outer ring: ${r.detail}`);
  return ok(k.plat(opts.key).version, r.warnings);
}

/** The kinds whose shore carries `bank` where it meets land (§2.2 rule 7: a river's banks; C-0229 (6)). */
export const BANKED_KINDS: ReadonlySet<WaterBody['kind']> = new Set(['river', 'tributary', 'estuary', 'distributary', 'islet_channel']);

/** The bridge id of the n-th site (§6.3's mint is M0-d-05a's; M0-e-02's `<kind>:<n>` form, C-0229 (7)). */
export function bridgeId(n: number): Id {
  return `bridge:${String(n)}`;
}

/** A site's Bridge record in state `site` (§2.7): two pinned deck ends, no span, no way; a ford's kind `ford` (C-0229 (8)). */
export function siteBridge(site: CrossingSite, id: Id, epoch: number): Bridge {
  return {
    id,
    state: 'site',
    way: null,
    deck: [
      { role: 'deck_end', entity: id, ordinal: 0 },
      { role: 'deck_end', entity: id, ordinal: 1 },
    ],
    over: 'river',
    spanCm: site.spanCm as Cm,
    ...(site.type === 'ford' ? { kind: 'ford' as const } : {}),
    lifecycle: generatedLifecycle(epoch),
  };
}

/** A ring's points with the deck ends that lie on it inserted on their segments, and the knots naming them. */
function ringWithDecks(ring: readonly LatticePoint[], ends: readonly { seg: number; at: LatticePoint; knot: Omit<Knot, 'index'> }[]): { pts: LatticePoint[]; knots: Knot[]; pinned: number[] } {
  const entries: { pt: LatticePoint; knots: Omit<Knot, 'index'>[] }[] = [];
  const n = ring.length;
  let carried: Omit<Knot, 'index'>[] = [];
  for (let i = 0; i < n; i += 1) {
    const a = ring[i];
    const b = ring[i + 1 === n ? 0 : i + 1];
    entries.push({ pt: a, knots: carried });
    carried = [];
    // the ends on segment i, nearest a first; an end on a's or b's point names that vertex
    const here = ends.filter((e) => e.seg === i).sort((p, q) => d2(a, p.at) - d2(a, q.at));
    for (const e of here) {
      const last = entries[entries.length - 1];
      if (e.at.x === last.pt.x && e.at.y === last.pt.y) last.knots.push(e.knot);
      else if (e.at.x === b.x && e.at.y === b.y) {
        if (i + 1 === n) entries[0].knots.push(e.knot);
        else carried.push(e.knot);
      } else entries.push({ pt: e.at, knots: [e.knot] });
    }
  }
  const pts = entries.map((e) => e.pt);
  const knots: Knot[] = [];
  const pinned: number[] = [];
  entries.forEach((e, i) => {
    if (e.knots.length === 0) return;
    pinned.push(i);
    for (const kn of e.knots) knots.push({ ...kn, index: i });
  });
  return { pts, knots, pinned };
}

function d2(a: LatticePoint, b: LatticePoint): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy;
}

/** Per live L0 half-edge of the arena, the L0 face on its left (−1 outside every face). */
export function leftFaces(p: Plat): Map<HalfEdgeId, FaceId> {
  const out = new Map<HalfEdgeId, FaceId>();
  for (let f = 0; f < p.slots.face[0].top; f += 1) {
    if (!isFaceLive(p, 0, f)) continue;
    for (const ring of faceWalk(p, 0, f)) for (const h of ring) out.set(h, f);
  }
  return out;
}

/** The (role, entity) rows on an edge pair, as `role entity` texts. */
function edgeRows(p: Plat, h: HalfEdgeId): { role: string; entity: Id }[] {
  return rowsOn(p, 'edge', h).map((r) => {
    const k = rowKey(p, r);
    return { role: k.role, entity: k.entity };
  });
}

/** The live L0 faces in canonical order. */
function l0Faces(p: Plat): FaceId[] {
  const out: FaceId[] = [];
  for (let f = 0; f < p.slots.face[0].top; f += 1) if (isFaceLive(p, 0, f)) out.push(f);
  return out.sort((a, b) => compareFaces(p, 0, a, b));
}

/** Is face f a water face: owned by a body whose `shore` row lies on one of its boundary edges? */
function isWaterFace(p: Plat, f: FaceId): boolean {
  const h = p.faces[0].owner[f];
  if (h < 0) return false;
  const owner = idOf(p, h);
  for (const ring of faceWalk(p, 0, f)) for (const e of ring) if (edgeRows(p, e).some((r) => r.role === 'shore' && r.entity === owner)) return true;
  return false;
}

/**
 * The land components of an arena's L0 view (§4.2 S1 (8): "land components by flood fill"): every L0 face that is no
 * water face (see `isWaterFace`), flooded across the edges that carry no `shore` row — so two land faces meeting only
 * at a vertex, or across water, are two components. Numbered `land:<n>` in the canonical order of each component's
 * first face; each component's faces in canonical order.
 */
export function landComponents(p: Plat): LandComponent[] {
  const faces = l0Faces(p);
  const land = new Set(faces.filter((f) => !isWaterFace(p, f)));
  const left = leftFaces(p);
  const seen = new Set<FaceId>();
  const out: LandComponent[] = [];
  for (const f of faces) {
    if (!land.has(f) || seen.has(f)) continue;
    const comp: FaceId[] = [];
    const queue = [f];
    seen.add(f);
    while (queue.length > 0) {
      const g = queue.shift() as FaceId;
      comp.push(g);
      for (const ring of faceWalk(p, 0, g)) {
        for (const h of ring) {
          const nb = left.get(h ^ 1);
          if (nb === undefined || seen.has(nb) || !land.has(nb)) continue;
          if (edgeRows(p, h).some((r) => r.role === 'shore')) continue;
          seen.add(nb);
          queue.push(nb);
        }
      }
    }
    comp.sort((a, b) => compareFaces(p, 0, a, b));
    const id = `land:${String(out.length)}`;
    out.push({ id, face: { owner: id, level: 0 }, faces: comp });
  }
  return out;
}

/** What `waterFaces` reads besides the reaches and the façade. */
export interface WaterFacesOptions extends L0BatchOptions {
  /** The crossing sites (`siteCrossings`), their bridges' ids beside them. */
  sites: readonly CrossingSite[];
  bridgeIds: readonly Id[];
  /** The epoch the bridges are made in (their lifecycle's `since`); 0 when absent. */
  epoch?: number;
}

/**
 * S1 (8)'s `waterFaces(bodies, k)` with its decks (see the header): one committed L0 batch over the reaches' polygons.
 * Returns each reach's faces and the land components (slots valid until the next commit).
 */
export function waterFaces(bodies: readonly WaterReach[], k: Kernel, opts: WaterFacesOptions): KernelResult<WaterFaces> {
  if (opts.sites.length !== opts.bridgeIds.length) throw new RangeError('waterFaces: one bridge id per site');
  const r = k.tx(spec(opts), (o) => waterBatch(bodies, k, o, opts));
  if (!r.ok) return err(r.code, `S1 water: ${r.detail}`);
  const value = r.value.value as { faces: FaceId[][]; land: LandComponent[] };
  const bridges = opts.sites.map((s, i) => siteBridge(s, opts.bridgeIds[i], opts.epoch ?? 0));
  return ok({ faces: value.faces, land: value.land, bridges }, r.warnings);
}

/** The batch's body (see the header). */
function waterBatch(bodies: readonly WaterReach[], k: Kernel, o: Overlay, opts: WaterFacesOptions): KernelResult<{ faces: FaceId[][]; land: LandComponent[] }> {
  const p = o.plat;
  // (1) the shores, deck ends on them
  for (let ri = 0; ri < bodies.length; ri += 1) {
    const body = bodies[ri].body;
    const rows: RoleRow[] = [{ role: 'shore', entity: body.id }];
    for (let pi = 0; pi < bodies[ri].parts.length; pi += 1) {
      const part = bodies[ri].parts[pi];
      for (let qi = 0; qi < part.rings.length; qi += 1) {
        const ends: { seg: number; at: LatticePoint; knot: Omit<Knot, 'index'> }[] = [];
        opts.sites.forEach((s, si) => {
          if (s.water !== body.id) return;
          for (const e of [0, 1] as const) {
            const end = s.ends[e];
            if (end.part === pi && end.ring === qi) ends.push({ seg: end.seg, at: s.deck[e], knot: { role: 'deck_end', ordinal: e, entity: opts.bridgeIds[si] } });
          }
        });
        const ring = ringWithDecks(part.rings[qi], ends);
        const ins = k.geom.insertChain(o, ring.pts, rows, 'mandatory', { closed: true, knots: ring.knots, pinned: ring.pinned });
        if (!ins.ok) return err(ins.code, `${body.id} ring ${String(pi)}.${String(qi)}: ${ins.detail}`);
      }
    }
  }
  // (2) each body's faces: the faces its seeds lie in
  const owner = new Map<FaceId, number>();
  const faces: FaceId[][] = [];
  for (let ri = 0; ri < bodies.length; ri += 1) {
    const set = new Set<FaceId>();
    for (const part of bodies[ri].parts) {
      for (const seed of part.seeds) {
        const at = k.geom.pointLocate(opts.key, 0, seed);
        if (at.on !== 'face' || at.level !== 0) continue;
        const was = owner.get(at.face);
        if (was !== undefined && was !== ri) return err('E_INVARIANT', `the L0 face at (${String(seed.x)}, ${String(seed.y)}) lies in ${bodies[was].body.id} and ${bodies[ri].body.id}`);
        owner.set(at.face, ri);
        set.add(at.face);
      }
    }
    if (set.size === 0) return err('E_INVARIANT', `${bodies[ri].body.id} has no L0 face`);
    const list = [...set].sort((a, b) => compareFaces(p, 0, a, b));
    faces.push(list);
    const so = k.geom.setOwner(o, list, bodies[ri].body.id);
    if (!so.ok) return err(so.code, so.detail);
  }
  // every claimed face is bounded by its body's shore
  for (let ri = 0; ri < bodies.length; ri += 1) {
    for (const f of faces[ri]) {
      if (!isWaterFace(p, f)) return err('E_INVARIANT', `an L0 face of ${bodies[ri].body.id} has no edge of its shore`);
    }
  }
  // (3) the land
  const land = landComponents(p);
  for (const c of land) {
    const so = k.geom.setOwner(o, c.faces, c.id);
    if (!so.ok) return err(so.code, so.detail);
  }
  // (4) the banks
  const landFaces = new Set(land.flatMap((c) => c.faces));
  for (let ri = 0; ri < bodies.length; ri += 1) {
    const body = bodies[ri].body;
    if (!BANKED_KINDS.has(body.kind)) continue;
    const r = bankStretches(k, p, opts.key, body.id, landFaces);
    for (const st of r) {
      const rt = k.geom.retypeEdges(o, st, [{ role: 'bank', entity: body.id }], []);
      if (!rt.ok) return err(rt.code, `${body.id} bank: ${rt.detail}`);
    }
  }
  // (5) the deck ends, pinned
  const refs: VertexRef[] = opts.bridgeIds.flatMap((id) => [
    { role: 'deck_end', entity: id, ordinal: 0 },
    { role: 'deck_end', entity: id, ordinal: 1 },
  ]);
  if (refs.length > 0) {
    const pin = k.geom.pinVertices(o, refs);
    if (!pin.ok) return err(pin.code, pin.detail);
  }
  return ok({ faces, land });
}

/**
 * The stretches of a body's shore whose other side is land: each run of `('shore', body)` cut into its maximal
 * land-facing sub-runs, as StretchRefs by their end vertices' lattice points (a closed run wholly land-facing as its
 * two halves).
 */
function bankStretches(k: Kernel, p: Plat, key: PlatKey, body: Id, landFaces: ReadonlySet<FaceId>): StretchRef[] {
  const res = k.resolve({ role: 'shore', entity: body }, key);
  if (res.view !== 'edges') return [];
  const left = leftFaces(p);
  const O = p.halfEdges.origin;
  const pt = (v: number): LatticePoint => ({ x: p.vertices.x[v] as Cm, y: p.vertices.y[v] as Cm });
  const chain = { role: 'shore' as const, entity: body };
  const out: StretchRef[] = [];
  for (const run of res.runs) {
    const n = run.length;
    const closed = O[run[0]] === O[run[n - 1] ^ 1];
    const landFacing = run.map((h) => {
      const a = left.get(h);
      const b = left.get(h ^ 1);
      return (a !== undefined && landFaces.has(a)) || (b !== undefined && landFaces.has(b));
    });
    if (landFacing.every((x) => x)) {
      if (closed) {
        const m = n >> 1;
        out.push({ chain, from: pt(O[run[0]]), to: pt(O[run[m]]) }, { chain, from: pt(O[run[m]]), to: pt(O[run[0]]) });
      } else {
        out.push({ chain, from: pt(O[run[0]]), to: pt(O[run[n - 1] ^ 1]) });
      }
      continue;
    }
    // the sub-runs, starting after a non-land-facing edge on a closed run
    let start = 0;
    if (closed) {
      start = landFacing.findIndex((x) => !x);
    }
    let i = 0;
    while (i < n) {
      const idx = (start + i) % n;
      if (!landFacing[idx]) {
        i += 1;
        continue;
      }
      let j = i;
      while (j + 1 < n && landFacing[(start + j + 1) % n]) j += 1;
      const first = run[(start + i) % n];
      const last = run[(start + j) % n];
      out.push({ chain, from: pt(O[first]), to: pt(O[last ^ 1]) });
      i = j + 1;
    }
  }
  return out;
}
