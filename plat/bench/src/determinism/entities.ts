// The spike city's entities as the matching routine reads them (M0-d-09; C-0090: "old and fresh entity sets per kind
// (way, junction, district, block, cell, gate, bridge, enceinte, water body, seam, portal)"; §6.3's anchor table, M0-d-05b's
// `M0_ANCHORS`; readings C-0268 (7)).
//
// From one spike run, after its last stage, every entity of the eleven kinds with its anchor read from the run's own
// arena (the kernel's `resolve`), and the stage that made it:
//   water     S1's water bodies — overlap: the largest of its L0 faces (outer ring, then holes);
//   bridge    S4's bridges (S1's crossing sites, built where S4 spanned one) — point: its deck's midpoint, on the water
//             body whose L0 face holds that point (else the first body);
//   enceinte  S3's and S5's — overlap: the ring its wall trace closes;
//   gate      S3's, S4's and S5's — point: a water gate's banks' midpoint, else its ('gate', id) vertex on the trace,
//             else its junction's vertex;
//   junction  S4's, S5's and S8's — point: its vertex;
//   way       S4's, S5's and S8's lanes — ends: its two ends' addresses (a bearing end is null) and its spine's points;
//   district  S6's — key: its seed feature's address (`namingFeature`; a remainder seed's district has none: null);
//   seam      S6's (S8 adds portals) — key: its two districts' addresses as a set, its first chain's address;
//   portal    S8's (on the seams) — point: its vertex;
//   block     S8's — point: its faces' area centroid (at M0 the L1 faces holding S8's seed points for it, see below);
//   cell      none: no M0 stage makes a Cell (§2.5's cells are S10's, M1) — the kind's sets are empty and say so.
// A record whose geometry no longer resolves (a way S5 pruned, a face S8 consumed) has no anchor: it is left out and
// counted per kind (`unanchored`), never given a made-up one. Lineage: the run's own where a stage exposes it (S6's
// district lineages, S8's live set of what it minted); M0's other records carry no Identity (§2.8's persisted Identity
// is M1's), so their lineage reads as the H64 of their address — reported per kind (`lineage: 'address'`); the routine
// reads lineage only for its carry events and tombstones, never to match.
import { faceRings, idOf, LaneWriter, pointLocate, type Id, type Kernel, type LatticePoint, type LineageHash, type Plat } from '@plat/kernel';
import { GROUND_KEY } from '@plat/site';
import type { Bridge, District, Enceinte, Gate, Junction, MatchEntity, Seam, WaterSet, Way, Block, Portal } from '@plat/model';
import type { S3Commit, S4Output, S6Output, GrowthState, S8Output } from '@plat/layout';
import type { SpikeRun } from './spike.js';

/** The item's eleven kinds, in M0-d-05b's anchor-table order (C-0090's list; `water` is the water body's kind). */
export const MATCH_KINDS = ['water', 'enceinte', 'junction', 'gate', 'portal', 'block', 'cell', 'bridge', 'way', 'district', 'seam'] as const;
export type MatchKind = (typeof MATCH_KINDS)[number];

/** The stages that make an entity (C-0090: S1 – S4 stand under `{ S5: 1 }`; S5, S6, S8 are re-drawn). */
export type MadeBy = 'S1' | 'S3' | 'S4' | 'S5' | 'S6' | 'S8';

/** One entity of a spike run, with the stage that made it. */
export interface SpikeEntity {
  readonly entity: MatchEntity;
  readonly by: MadeBy;
  /** Where its lineage came from: the run's own ('model') or its address's H64 ('address'). */
  readonly lineageFrom: 'model' | 'address';
}

/** A run's entities, per kind. */
export interface SpikeEntities {
  readonly entities: readonly SpikeEntity[];
  /** Per kind: records left out for want of a resolvable anchor. */
  readonly unanchored: Readonly<Record<MatchKind, number>>;
  /** Per kind: where its lineage came from ('model' for every entity, 'address' for some, or 'none' with no entity). */
  readonly lineage: Readonly<Record<MatchKind, 'model' | 'address' | 'mixed' | 'none'>>;
}

const GROUND = GROUND_KEY;

function zeroCounts(): Record<MatchKind, number> {
  return Object.fromEntries(MATCH_KINDS.map((k) => [k, 0])) as Record<MatchKind, number>;
}

/** The H64 of an address (words 0 and 1 of its H128): the lineage stand-in of a record with no Identity. */
export function addressLineage(id: Id): LineageHash {
  const h = new LaneWriter().utf8(`address:${id}`).digest();
  return [h[0], h[1]] as LineageHash;
}

function pointOf(p: Plat, v: number): LatticePoint {
  return { x: p.vertices.x[v], y: p.vertices.y[v] } as LatticePoint;
}

/** A vertex reference's point, or null when it resolves to no single vertex. */
function vertexAt(k: Kernel, p: Plat, ref: { role: string; entity: Id; ordinal?: number }): LatticePoint | null {
  let r;
  try {
    r = k.resolve(ref as never, GROUND);
  } catch {
    return null;
  }
  if (r.view !== 'vertices' || r.vertices.length === 0) return null;
  return pointOf(p, r.vertices[0]);
}

/** A chain's points: its runs in the kernel's order, joined; null when it has no edge. */
function chainPoints(k: Kernel, p: Plat, ref: { role: string; entity: Id }): LatticePoint[] | null {
  let r;
  try {
    r = k.resolve(ref as never, GROUND);
  } catch {
    return null;
  }
  if (r.view !== 'edges' || r.runs.length === 0) return null;
  const out: LatticePoint[] = [];
  const push = (q: LatticePoint): void => {
    const last = out[out.length - 1];
    if (last === undefined || last.x !== q.x || last.y !== q.y) out.push(q);
  };
  const O = p.halfEdges.origin;
  for (const run of r.runs) {
    if (run.length === 0) continue;
    for (const h of run) push(pointOf(p, O[h]));
    push(pointOf(p, O[run[run.length - 1] ^ 1]));
  }
  return out.length >= 2 ? out : null;
}

function area2(ring: readonly LatticePoint[]): number {
  let s = 0;
  for (let i = 0; i < ring.length; i += 1) {
    const a = ring[i];
    const b = ring[(i + 1) % ring.length];
    s += a.x * b.y - b.x * a.y;
  }
  return s;
}

/** The faces a face reference resolves to, as rings (outer first), or [] when none. */
function facesOf(k: Kernel, p: Plat, ref: { owner: Id; level: number }): LatticePoint[][][] {
  let r;
  try {
    r = k.resolve(ref as never, GROUND);
  } catch {
    return [];
  }
  if (r.view !== 'faces') return [];
  return r.faces.map((f) => faceRings(p, r.level, f)).filter((rings) => rings.length > 0 && rings[0].length >= 3);
}

/** The distinct live L1 faces holding the points, as rings (outer first), in the points' order. */
function l1FacesAt(p: Plat, points: readonly LatticePoint[]): LatticePoint[][][] {
  const seen = new Set<number>();
  const out: LatticePoint[][][] = [];
  for (const pt of points) {
    let loc;
    try {
      loc = pointLocate(p, GROUND, 1, pt);
    } catch {
      continue;
    }
    if (loc.on !== 'face' || loc.level !== 1 || seen.has(loc.face)) continue;
    seen.add(loc.face);
    const rings = faceRings(p, 1, loc.face);
    if (rings.length > 0 && rings[0].length >= 3) out.push(rings);
  }
  return out;
}

/** The largest face's rings (outer, then holes), or null. */
function largestFace(faces: readonly LatticePoint[][][]): LatticePoint[][] | null {
  let best: LatticePoint[][] | null = null;
  let bestA = 0;
  for (const rings of faces) {
    const a = Math.abs(area2(rings[0]));
    if (a > bestA) {
      bestA = a;
      best = rings;
    }
  }
  return best;
}

/** The area centroid of the faces' outer rings, rounded to whole centimetres; null for no area. */
function centroidOf(faces: readonly LatticePoint[][][]): LatticePoint | null {
  let a = 0;
  let cx = 0;
  let cy = 0;
  for (const rings of faces) {
    const ring = rings[0];
    for (let i = 0; i < ring.length; i += 1) {
      const p = ring[i];
      const q = ring[(i + 1) % ring.length];
      const c = p.x * q.y - q.x * p.y;
      a += c;
      cx += (p.x + q.x) * c;
      cy += (p.y + q.y) * c;
    }
  }
  if (a === 0) return null;
  return { x: Math.round(cx / (3 * a)), y: Math.round(cy / (3 * a)) } as LatticePoint;
}

const mid = (a: LatticePoint, b: LatticePoint): LatticePoint => ({ x: Math.round((a.x + b.x) / 2), y: Math.round((a.y + b.y) / 2) }) as LatticePoint;

/** Records of a list keyed by id, the later wins (a later stage's version of an entity). */
function byId<T extends { id: Id }>(...lists: (readonly T[] | undefined)[]): Map<Id, T> {
  const out = new Map<Id, T>();
  for (const l of lists) for (const x of l ?? []) out.set(x.id, x);
  return out;
}

/** The entities of one spike run, per kind, with their anchors read from its arena (see the module comment). */
export function spikeEntities(r: SpikeRun): SpikeEntities {
  const data = r.model.data;
  const k = r.model.kernel;
  const p = r.model.plats.get('ground/0');
  if (p === undefined) throw new Error('entities: the run holds no ground arena');
  const get = <T>(key: string): T | undefined => data.get(key) as T | undefined;
  const water = get<WaterSet>('water');
  const commit = get<S3Commit>('s3.commit');
  const s4 = get<S4Output>('s4');
  const growth = get<GrowthState>('s5.growth');
  const s6 = get<S6Output>('s6');
  const infill = get<S8Output['infill']>('infill');

  // Which stage made each id (the earliest stage that holds it).
  const made = new Map<Id, MadeBy>();
  const mark = (by: MadeBy, ids: Iterable<Id>): void => {
    for (const id of ids) if (!made.has(id)) made.set(id, by);
  };
  mark('S1', (water?.bodies ?? []).map((b) => b.id));
  mark('S1', (water?.bridges ?? []).map((b) => b.id));
  if (commit !== undefined) mark('S3', [commit.enceinte.id, ...commit.gates.map((g) => g.id)]);
  if (s4 !== undefined) mark('S4', [...s4.network.ways.map((w) => w.id), ...s4.network.junctions.map((j) => j.id), ...s4.gates.map((g) => g.id), ...s4.bridges.map((b) => b.id)]);
  if (growth !== undefined) mark('S5', [...growth.ways.map((w) => w.id), ...growth.junctions.map((j) => j.id), ...growth.stages.flatMap((st) => st.gates.map((g) => g.id))]);
  mark('S5', (get<Enceinte[]>('enceintes') ?? []).map((e) => e.id));
  if (s6 !== undefined) mark('S6', [...s6.districts.map((d) => d.id), ...s6.seams.map((s) => s.id)]);
  mark('S8', [...(get<Way[]>('lanes') ?? []).map((w) => w.id), ...(get<Block[]>('blocks') ?? []).map((b) => b.id), ...(infill?.junctions ?? []).map((j) => j.id)]);
  for (const s of infill?.seams ?? []) mark('S8', s.portals.map((pt) => pt.id));

  // Lineage where a stage exposes it.
  const lineages = new Map<Id, LineageHash>();
  for (const [id, l] of s6?.lineages ?? []) lineages.set(id, [l[0], l[1]] as LineageHash);
  for (const e of infill?.live ?? []) lineages.set(e.id, [e.lineage[0], e.lineage[1]] as LineageHash);

  const unanchored = zeroCounts();
  const fromModel = zeroCounts();
  const fromAddress = zeroCounts();
  const out: SpikeEntity[] = [];
  const add = (kind: MatchKind, id: Id, anchor: MatchEntity['anchor'] | null): void => {
    if (anchor === null) {
      unanchored[kind] += 1;
      return;
    }
    const by = made.get(id);
    if (by === undefined) throw new Error(`entities: no stage is known to make ${kind} ${id}`);
    const l = lineages.get(id);
    if (l === undefined) fromAddress[kind] += 1;
    else fromModel[kind] += 1;
    out.push({ entity: { id, kind, lineage: l ?? addressLineage(id), anchor }, by, lineageFrom: l === undefined ? 'address' : 'model' });
  };

  // water: the largest L0 face of each body.
  for (const b of water?.bodies ?? []) {
    const rings = largestFace(facesOf(k, p, b.face));
    add('water', b.id, rings === null ? null : { area: rings });
  }
  const bodyAt = (pt: LatticePoint): Id | undefined => {
    const bodies = new Set((water?.bodies ?? []).map((b) => b.id));
    try {
      const loc = pointLocate(p, GROUND, 0, pt);
      if (loc.on === 'face') {
        const h = p.faces[loc.level].owner[loc.face];
        if (h >= 0) {
          const id = idOf(p, h);
          if (bodies.has(id)) return id;
        }
      }
    } catch {
      // a point outside the arena: no body
    }
    return water?.bodies[0]?.id;
  };
  // bridge: the deck's midpoint, on its water body.
  for (const b of [...byId<Bridge>(water?.bridges, s4?.bridges, get<Bridge[]>('bridges')).values()]) {
    const a = vertexAt(k, p, b.deck[0]);
    const c = vertexAt(k, p, b.deck[1]);
    const at = a === null || c === null ? null : mid(a, c);
    const on = at === null ? undefined : bodyAt(at);
    add('bridge', b.id, at === null || on === undefined ? null : { point: at, on });
  }
  // enceinte: the ring its trace closes.
  for (const e of byId<Enceinte>(commit === undefined ? [] : [commit.enceinte], get<Enceinte[]>('enceintes')).values()) {
    const pts = chainPoints(k, p, e.trace);
    let ring: LatticePoint[] | null = null;
    if (pts !== null && pts.length >= 4) {
      const f = pts[0];
      const l = pts[pts.length - 1];
      ring = f.x === l.x && f.y === l.y ? pts.slice(0, -1) : null;
    }
    add('enceinte', e.id, ring === null || ring.length < 3 || area2(ring) === 0 ? null : { area: [ring] });
  }
  // gate: banks' midpoint, else its junction's vertex.
  for (const g of byId<Gate>(commit?.gates, s4?.gates, growth?.stages.flatMap((st) => st.gates)).values()) {
    let at: LatticePoint | null = null;
    if (g.banks !== undefined) {
      const a = vertexAt(k, p, g.banks[0]);
      const c = vertexAt(k, p, g.banks[1]);
      at = a === null || c === null ? null : mid(a, c);
    } else at = vertexAt(k, p, { role: 'gate', entity: g.id }) ?? vertexAt(k, p, { role: 'junction', entity: g.junction });
    add('gate', g.id, at === null ? null : { point: at });
  }
  // junction: its vertex.
  for (const j of byId<Junction>(s4?.network.junctions, growth?.junctions, infill?.junctions).values()) {
    const at = vertexAt(k, p, j.vertex);
    add('junction', j.id, at === null ? null : { point: at });
  }
  // way: its ends and spine.
  const endOf = (n: Way['from']): Id | null => (n.kind === 'bearing' ? null : n.id);
  for (const w of byId<Way>(s4?.network.ways, growth?.ways, get<Way[]>('lanes')).values()) {
    const line = chainPoints(k, p, w.spine);
    add('way', w.id, line === null ? null : { ends: [endOf(w.from), endOf(w.to)], line });
  }
  // district: its seed feature's address.
  for (const d of (s6?.districts ?? []) as District[]) add('district', d.id, { key: [{ ref: d.namingFeature ?? null }] });
  // seam: its two districts and its first chain; portal: its vertex (S8's seams, else S6's).
  const seams = byId<Seam>(s6?.seams, infill?.seams);
  for (const s of seams.values()) add('seam', s.id, { key: [{ set: [s.sides[0], s.sides[1]] }, { ref: s.edges[0]?.chain.entity ?? null }] });
  for (const pt of byId<Portal>(...[...seams.values()].map((s) => s.portals)).values()) {
    const at = vertexAt(k, p, pt.at);
    add('portal', pt.id, at === null ? null : { point: at });
  }
  // block: its faces' centroid. At M0 a block's record names L2 (`face`, its built block, §2.5) but S8 owns no face for
  // it — L2 is S9's (M1) and its L1 faces keep their district — so its faces are the L1 faces holding the seed points S8
  // records for it (`infill.blockFaces`: a point inside each of its L1 faces); the record's own reference is read first.
  const seedsOf = new Map<Id, readonly LatticePoint[]>((infill?.blockFaces ?? []).map((bf) => [bf.block, bf.seeds]));
  for (const b of get<Block[]>('blocks') ?? []) {
    let faces = facesOf(k, p, b.face);
    if (faces.length === 0) faces = l1FacesAt(p, seedsOf.get(b.id) ?? []);
    const at = centroidOf(faces);
    add('block', b.id, at === null ? null : { point: at });
  }

  const lineage = Object.fromEntries(
    MATCH_KINDS.map((kind) => [kind, fromModel[kind] + fromAddress[kind] === 0 ? 'none' : fromAddress[kind] === 0 ? 'model' : fromModel[kind] === 0 ? 'address' : 'mixed']),
  ) as Record<MatchKind, 'model' | 'address' | 'mixed' | 'none'>;
  return Object.freeze({ entities: Object.freeze(out), unanchored: Object.freeze(unanchored), lineage: Object.freeze(lineage) });
}
