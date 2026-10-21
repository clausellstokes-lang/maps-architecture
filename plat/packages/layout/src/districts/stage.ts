// S6 as a callback-form Stage (M0-e-04; §4.5; §4.1's S6 row — "L1: the settlement perimeter chain, then district
// owners and `district_bound` roles (one batch)"; §4.1 *Registration and order*: S6 registers as callback; §6.1
// `district.seed`, `district.type`; §6.3; §9.1; §5.3's containment row; C-0035, C-0046, C-0085; readings C-0245).
// One L1 callback batch, built from the arena it runs on (`s6Batch`, so M0-d-08's harness runs it on any slot
// assignment):
//   1. the perimeter (`settlementPerimeter`, a value computed before the batch) inserted as a closed chain carrying
//      `district_bound` on the hinterland pseudo-district's id;
//   2. the coarse-face graph read in canonical order (./faces.ts); the land A = the claimable faces (`s6Takes`: inside
//      the perimeter, not water, and unowned before S6 or owned by an S1 land component `land:<n>` — C-0265, N-51; a
//      reservation's and the wall strips' faces keep their owner);
//      N_d and the band by the count law (C-0245 (16));
//   3. the seeds (./seeds.ts) and the grower (./grow.ts), its turns on `district.seed` keyed by (the seed lineage, the
//      turn), grower.turns charged against its law (F-WORK);
//   4. the districts minted — lineage (the town, S6, the seed's order) — and every face owned: setOwner per district,
//      the hinterland's id on every land face outside the perimeter that `s6Takes` (unowned or `land:<n>`);
//   5. the boundary runs (./seams.ts) minted under the S6 run, each laid as a `district_bound` chain on its seam's id
//      over the edges already there (the insertion shares them: no geometry is added);
//   6. typing (./typing.ts, `district.type` keyed by the district) and the quarter tree (./quarters.ts).
// The pass-1 fields are M0-e-05's (their district-type term reads this typing).
import {
  CONCERNS,
  createRng,
  entityKey,
  err,
  handleOf,
  insertChain,
  isFaceLive,
  isVertexLive,
  ok,
  roleIdOf,
  rowElement,
  rowsOfKey,
  setOwner,
  STAGES,
  type Hash128,
  type Kernel,
  type KernelResult,
  type KernelTx,
  type LatticePoint,
  type LineageHash,
  type Overlay,
  type Plat,
  type PlatKey,
  type StageId,
} from '@plat/kernel';
import {
  lineageHash,
  mint,
  TOWN_ROOT,
  type Bridge,
  type District,
  type Gate,
  type Id,
  type LiveEntry,
  type Reservation,
  type Rung,
  type Scope,
  type Seam,
  type Stage,
  type StageContext,
  type WaterSet,
  type Way,
  type WorkLimitLaw,
} from '@plat/model';
import { GROUND_KEY } from '@plat/site';
import { loadWorkLimits, tableView, workLimitOf, type BaseRung, type TableView, type WorkLimitsTable } from '@plat/tables';
import { generated } from '../enceinte/water.js';
import { HA_CM2, insideRing } from '../siting/geom.js';
import { BARRIER, faceGraph, s6Takes, type FaceGraph } from './faces.js';
import { grow } from './grow.js';
import { countLaw, quarterCount } from './law.js';
import { settlementPerimeter } from './perimeter.js';
import { quarterTree, type QuarterAdjacency } from './quarters.js';
import { seamEdges, seamRuns } from './seams.js';
import { faceInRing, placeSeeds } from './seeds.js';
import { districtCells, minBarrierClass, rosterBuildings, s6TableIn, typingCells } from './table.js';
import { typeDistricts, type TypingDistrict } from './typing.js';
import type { S6Output, S6Report, SeedFeature, WallLine, XY } from './types.js';

const S6 = STAGES.S6 as StageId;

/** The creation indices of the S6 run's own units under the town (C-0245 (17)): no seed order reaches them. */
export const HINTERLAND_INDEX = 0xffff_ffff;
export const SEAM_RUN_INDEX = 0xffff_fffe;
export const QUARTER_RUN_INDEX = 0xffff_fffd;

/** The counters of S6's batch (§5.1 (5)): the insert counters and tx.facesWalked; grower.turns is the grower's. */
export const S6_COUNTERS = Object.freeze(['insert.points', 'insert.attractQueries', 'insert.placementCandidates', 'insert.crossings', 'tx.facesWalked'] as const);

/** S6's input record (as the runner's model hands it; C-0237 (9)'s form). */
export interface S6Input {
  readonly kernel: Kernel;
  /**
   * The arena S6 runs on; default the ground arena (§2.2), @plat/site's `GROUND_KEY` — the kernel finds an arena by its
   * layer and part, never by the key object (arena/plat.ts `sameKey`; the façade's arena map by that text).
   */
  readonly key?: PlatKey;
  readonly seedKey: Readonly<Hash128>;
  readonly epoch?: number;
  readonly reroll?: number;
  readonly rung: BaseRung;
  /** The last stage's boundary (counter-clockwise lattice ring): the perimeter is offset from it. */
  readonly boundary: readonly LatticePoint[];
  /** The frame rectangle (counter-clockwise): the perimeter is clipped to it. */
  readonly frame?: readonly LatticePoint[];
  /** Each growth stage's boundary, k = 1 … K: a district's growthStage is the first that holds its seed face. */
  readonly stageBoundaries?: readonly (readonly LatticePoint[])[];
  /** Every way whose `way` rows the L1 faces carry (the edge test reads their classes). */
  readonly ways: readonly Way[];
  /** The sited features, in seed order (`siteFeatures`). */
  readonly features: readonly SeedFeature[];
  /** The reservations (the typing's 'plaza' relation reads the plaza's and the markets'). */
  readonly reservations?: readonly Reservation[];
  /**
   * The wall line of a one-enceinte town (the typing's 'extramural' relation); with `walls`, one more line among
   * them (C-0257).
   */
  readonly wall?: readonly LatticePoint[];
  /**
   * Every enceinte's wall line (each walled growth stage's, C-0257): a district is `extramural` when its seed face lies
   * outside every wall line given (`walls` and `wall`).
   */
  readonly walls?: readonly WallLine[];
  readonly water?: WaterSet;
  readonly live?: readonly LiveEntry[];
  /** B for N_q (default the synthetic roster's, C-0035). */
  readonly buildings?: number;
  /** The run's tables: `district`'s cells, and `s6`'s when the view carries the table (else this folder's, `s6TableIn`). */
  readonly tables?: TableView;
  readonly workLimits?: WorkLimitsTable;
  /** grower.turns' limit in place of the law's (F-WORK's test). */
  readonly turnLimit?: number;
}

/** A district's lineage key (§6.3: S6 districts keyed by the town, in seed order). */
function townLineage(arena: PlatKey, epoch: number, index: number, reroll: number): LineageHash {
  return lineageHash({ arena, unit: lineageHash(TOWN_ROOT), stage: S6, epoch, index, reroll });
}

/** The vertex carrying (role, entity, ordinal), as a point, or null. */
function vertexOf(p: Plat, role: string, entity: Id, ordinal = 0): LatticePoint | null {
  const h = handleOf(p, entity);
  if (h < 0) return null;
  const rows = rowsOfKey(p, roleIdOf(role), h, ordinal);
  if (rows.length === 0) return null;
  const v = rowElement(p, rows[0]);
  return { x: p.vertices.x[v], y: p.vertices.y[v] } as LatticePoint;
}

/**
 * Each main gate's side (C-0257): its own enceinte's wall line (`within`) and the wall lines that line encloses — the
 * inner enceintes (`outside`). `walls` is every enceinte's line by id; `wall` alone serves a town whose main gates all
 * name one enceinte. A main gate naming an enceinte no line is given for, or `wall` alone with gates of two
 * enceintes, is the composer's error (a TypeError): its ward's side could not be read.
 */
function gateSides(gates: readonly Gate[], walls: readonly WallLine[] | undefined, wall: readonly LatticePoint[] | undefined): Map<Id, { within: readonly XY[]; outside: (readonly XY[])[] }> {
  const out = new Map<Id, { within: readonly XY[]; outside: (readonly XY[])[] }>();
  const main = gates.filter((g) => g.kind === 'main');
  let lines: readonly WallLine[];
  if (walls !== undefined) lines = walls;
  else if (wall !== undefined) {
    const named = [...new Set(main.map((g) => g.enceinte))];
    if (named.length > 1) throw new TypeError(`siteFeatures: the main gates name ${String(named.length)} enceintes (${named.join(', ')}); give each its wall line in \`walls\` (C-0257)`);
    lines = named.length === 1 ? [{ enceinte: named[0], line: wall }] : [];
  } else return out;
  for (const g of main) {
    const own = lines.find((w) => w.enceinte === g.enceinte);
    if (own === undefined) throw new TypeError(`siteFeatures: the gate ${g.id} names the enceinte ${g.enceinte}, whose wall line is not given (C-0257)`);
    if (own.line.length < 3) throw new TypeError(`siteFeatures: the wall line of ${g.enceinte} has fewer than 3 points`);
    // the inner enceintes: every other line lying inside this one (its first point inside the ring)
    const inner = lines.filter((w) => w !== own && w.line.length >= 3 && insideRing(own.line, w.line[0])).map((w) => w.line);
    out.set(g.id, { within: own.line, outside: inner });
  }
  return out;
}

/**
 * The sited features M0 has, in seed order (§4.5 *Grower*): every plaza or market reservation (a `market` seed at its
 * barrier face), every main gate (at a face touching its `gate` vertex; with `walls` or `wall`, behind its own wall and
 * outside every inner enceinte — C-0257), both deck ends of every built bridge whose way is of class ≥ the edge test's
 * (`bridgehead`), and every river (`riverbank`, at its longest bank) — C-0245 (4).
 */
export function siteFeatures(
  p: Plat,
  from: {
    readonly reservations?: readonly Reservation[];
    readonly gates?: readonly Gate[];
    readonly bridges?: readonly Bridge[];
    readonly ways?: readonly Way[];
    readonly water?: WaterSet;
    readonly wall?: readonly LatticePoint[];
    readonly walls?: readonly WallLine[];
    /** The run's tables: the edge test's class is read from their `s6` when they carry one (`s6TableIn`). */
    readonly tables?: TableView;
  },
): SeedFeature[] {
  const out: SeedFeature[] = [];
  for (const r of from.reservations ?? []) if (r.kind === 'plaza' || r.kind === 'market') out.push({ id: r.id, kind: 'market', anchor: { kind: 'owner', owner: r.id } });
  const sides = gateSides(from.gates ?? [], from.walls, from.wall);
  for (const g of from.gates ?? []) {
    if (g.kind !== 'main') continue;
    const at = vertexOf(p, 'gate', g.id);
    const side = sides.get(g.id);
    if (at !== null) out.push({ id: g.id, kind: 'gate', anchor: { kind: 'point', at, touching: true, ...(side === undefined ? {} : { within: side.within, outside: side.outside }) } });
  }
  const top = minBarrierClass(s6TableIn(from.tables));
  const order = ['through', 'primary', 'secondary'];
  const classOf = new Map((from.ways ?? []).map((w) => [w.id, w.class]));
  for (const b of from.bridges ?? []) {
    if (b.state !== 'built' || b.way === null) continue;
    const c = classOf.get(b.way);
    if (c === undefined || order.indexOf(c) < 0 || order.indexOf(c) > order.indexOf(top)) continue;
    for (const ordinal of [0, 1]) {
      const at = vertexOf(p, 'deck_end', b.id, ordinal);
      if (at !== null) out.push({ id: `${b.id}/end:${String(ordinal)}`, kind: 'bridgehead', anchor: { kind: 'point', at } });
    }
  }
  for (const w of from.water?.bodies ?? []) if (w.kind === 'river') out.push({ id: w.id, kind: 'riverbank', anchor: { kind: 'shore', body: w.id } });
  return out;
}

/** The batch's work limit (§5.1 (5)): the insert counters' laws over the arena's live vertices (and the perimeter's, twice) and twice its L1 faces. */
export function s6WorkLimit(p: Plat, perimeterPoints: number, wl: WorkLimitsTable = loadWorkLimits()): number {
  let faces = 0;
  for (let f = 0; f < p.slots.face[1].top; f += 1) if (isFaceLive(p, 1, f)) faces += 1;
  // live vertices, never the slot table's top: the limit is a function of the committed arena alone (§5.1 (5))
  let vertices = 0;
  for (let v = 0; v < p.slots.vertex.top; v += 1) if (isVertexLive(p, v)) vertices += 1;
  const scope = { kind: 'stage' as const, stage: S6 };
  let sum = 0;
  for (const c of S6_COUNTERS) sum += workLimitOf(wl.law(c), scope, { vertices: vertices + 2 * perimeterPoints, faces: 2 * faces + 2 });
  return sum;
}

/** grower.turns' limit (§5.1 (5); C-0085): its law over the L1 faces committed before the batch. */
export function growerTurnLimit(p: Plat, wl: WorkLimitsTable = loadWorkLimits()): number {
  let faces = 0;
  for (let f = 0; f < p.slots.face[1].top; f += 1) if (isFaceLive(p, 1, f)) faces += 1;
  return workLimitOf(wl.law('grower.turns'), { kind: 'stage', stage: S6 }, { faces });
}

/** S6's batch: its spec and its callback (see the module comment). */
export interface S6Batch {
  readonly spec: KernelTx;
  readonly fn: (o: Overlay) => KernelResult<S6Output>;
}

/** Builds S6's batch on arena `p` as it stands, with the perimeter ring already computed. */
export function s6Batch(p: Plat, input: Omit<S6Input, 'kernel'>, perimeter: readonly LatticePoint[]): S6Batch {
  const key = input.key ?? GROUND_KEY;
  const epoch = input.epoch ?? 0;
  const reroll = input.reroll ?? 0;
  const tables = input.tables ?? tableView();
  const wl = input.workLimits ?? loadWorkLimits();
  const cells = districtCells(tables);
  // the synthetic demand table, the edge test's class and the roster's B: the run's `s6` when its tables carry one
  const s6t = s6TableIn(tables);
  const turnLimit = input.turnLimit ?? growerTurnLimit(p, wl);
  const spec: KernelTx = {
    key,
    level: 1,
    ops: [],
    expect: [],
    onFail: 'reject',
    batch: { kind: 'stage', stage: S6 },
    stage: S6,
    rederivesFrom: S6,
    workLimit: s6WorkLimit(p, perimeter.length, wl),
  };
  const fn = (o: Overlay): KernelResult<S6Output> => {
    const rng = createRng();
    const live: LiveEntry[] = (input.live ?? []).slice();
    const mintOne = (kind: string, unit: LineageHash | null, index: number): { id: Id; lineage: LineageHash } => {
      const m = mint([{ kind, key: { arena: key, unit: unit ?? lineageHash(TOWN_ROOT), stage: S6, epoch, index, reroll } }], live, [], input.seedKey)[0];
      live.push({ id: m.identity.id, lineage: m.identity.lineage });
      return { id: m.identity.id, lineage: [m.identity.lineage[0], m.identity.lineage[1]] as LineageHash };
    };
    // 1. The perimeter.
    const hinterland = mintOne('hinterland', null, HINTERLAND_INDEX).id;
    const per = insertChain(o, perimeter, [{ role: 'district_bound', entity: hinterland }], 'mandatory', { closed: true });
    if (!per.ok) return err(per.code, `S6: the perimeter: ${per.detail}`);
    // 2. The graph and the land.
    const ways = new Map(input.ways.map((w) => [w.id, w]));
    let g: FaceGraph;
    try {
      g = faceGraph(o.plat, { ways: new Map(input.ways.map((w) => [w.id, w.class])), minBarrierClass: minBarrierClass(s6t), perimeter: hinterland, water: new Set((input.water?.bodies ?? []).map((b) => b.id)) });
    } catch (e) {
      return err('E_INVARIANT', (e as Error).message);
    }
    const claimable = g.faces.map((f) => s6Takes(f, 'inside'));
    let landCm2 = 0;
    g.faces.forEach((f, i) => {
      if (claimable[i]) landCm2 += f.areaCm2;
    });
    const landHa = landCm2 / HA_CM2;
    const law = countLaw(landHa, cells);
    // 3. Seeds and growth.
    const placed = placeSeeds(g, claimable, input.features, law.n, cells.rate, law.bandHa[0] * HA_CM2);
    const turnStream = (lineage: Readonly<LineageHash>, turn: number) => {
      const tl = lineageHash({ arena: key, unit: lineage, stage: S6, epoch, index: turn, reroll });
      return rng.stream(entityKey(input.seedKey, tl, key), S6, CONCERNS['district.seed'], { reroll, attempt: 0, epoch, salt: 0 });
    };
    const grown = grow(placed.seeds, { graph: g, claimable }, turnStream, {
      bandCm2: [law.bandHa[0] * HA_CM2, law.bandHa[1] * HA_CM2],
      compactnessMin: cells.compactnessMin,
      turnLimit,
      leftoverRate: cells.rate('leftover'),
    });
    const alive = grown.grown.filter((d) => d.mergedInto < 0);
    // 4. The districts' ids and owners.
    const ids = new Map<number, { id: Id; lineage: LineageHash }>();
    for (const d of alive) ids.set(d.seed.order, mintOne('district', null, d.seed.order));
    for (const d of alive) {
      const own = setOwner(o, d.faces.map((i) => g.faces[i].face), (ids.get(d.seed.order) as { id: Id }).id);
      if (!own.ok) return err(own.code, `S6: a district's owner: ${own.detail}`);
    }
    const outside = g.faces.filter((f) => s6Takes(f, 'outside')).map((f) => f.face);
    if (outside.length > 0) {
      const own = setOwner(o, outside, hinterland);
      if (!own.ok) return err(own.code, `S6: the hinterland's owner: ${own.detail}`);
    }
    // 5. The seams.
    const sideIdx = new Int32Array(g.faces.length).fill(-1);
    for (const d of alive) for (const i of d.faces) sideIdx[i] = d.seed.order;
    const districtIds = new Set([...ids.values()].map((x) => x.id));
    const sideOf = (i: number): Id | null => {
      if (sideIdx[i] >= 0) return (ids.get(sideIdx[i]) as { id: Id }).id;
      return s6Takes(g.faces[i], 'outside') ? hinterland : null;
    };
    const runs = seamRuns(g, sideOf, (id) => districtIds.has(id));
    const seamRun = townLineage(key, epoch, SEAM_RUN_INDEX, reroll);
    const seams: Seam[] = [];
    const seamsOf = new Map<Id, Id[]>();
    const P = o.plat;
    const runPoints: LatticePoint[][] = [];
    runs.forEach((r, ri) => {
      const sid = mintOne('seam', seamRun, ri).id;
      seams.push({ id: sid, sides: [r.sides[0], r.sides[1]], edges: seamEdges(P, r, ways, sid), portals: [] });
      for (const s of r.sides) if (s !== null && districtIds.has(s)) seamsOf.set(s, [...(seamsOf.get(s) ?? []), sid]);
      runPoints.push(r.vertices.map((v) => ({ x: P.vertices.x[v], y: P.vertices.y[v] }) as LatticePoint));
    });
    for (let ri = 0; ri < runs.length; ri += 1) {
      const pts = runPoints[ri];
      const ins = insertChain(o, pts, [{ role: 'district_bound', entity: seams[ri].id }], 'mandatory', { closed: runs[ri].closed, pinned: pts.map((_, i) => i) });
      if (!ins.ok) return err(ins.code, `S6: a seam's district_bound run: ${ins.detail}`);
    }
    // 6. Typing and quarters.
    const reserved = new Set((input.reservations ?? []).filter((r) => r.kind === 'plaza' || r.kind === 'market').map((r) => r.id));
    // 'extramural': the seed face outside every wall line given (C-0257)
    const wallLines = [...(input.walls ?? []).map((w) => w.line), ...(input.wall === undefined ? [] : [input.wall])].filter((w) => w.length >= 3);
    const wallSides = wallLines.map(() => new Map<number, boolean>());
    const typingInput: TypingDistrict[] = alive.map((d) => {
      const rel = new Set<string>([`seed.${d.seed.kind}`]);
      for (const i of d.faces) {
        if ((g.ringBarriers[i] & BARRIER.WATER) !== 0) rel.add('water');
        for (const j of g.links[i].keys()) {
          const o2 = g.faces[j].owner;
          if (o2 !== null && reserved.has(o2)) rel.add('plaza');
          if (g.faces[j].water) rel.add('water');
        }
      }
      if (wallLines.length > 0 && wallLines.every((w, wi) => !faceInRing(g, d.seed.face, w, wallSides[wi]))) rel.add('extramural');
      return { id: (ids.get(d.seed.order) as { id: Id }).id, areaCm2: d.areaCm2, relations: rel };
    });
    // the synthetic demand table's cells, read once: the typing and the quarter families read the same rows (neither
    // writes them)
    const demand = typingCells(s6t);
    const typing = typeDistricts(typingInput, demand, (id) => {
      const lin = [...ids.values()].find((x) => x.id === id) as { lineage: LineageHash };
      return rng.stream(entityKey(input.seedKey, lin.lineage, key), S6, CONCERNS['district.type'], { reroll, attempt: 0, epoch, salt: 0 });
    });
    const kindOf = new Map(typing.map((t) => [t.district, t.kind]));
    const familyOf = new Map(demand.kinds.map((k) => [k.kind, k.family]));
    const leafOf = new Map<number, number>();
    alive.forEach((d, li) => leafOf.set(d.seed.order, li));
    const adjacency: QuarterAdjacency[] = [];
    const seenPair = new Set<string>();
    const addAdj = (a: number, b: number, separated: boolean): void => {
      if (a === b) return;
      const k = `${String(Math.min(a, b))},${String(Math.max(a, b))},${separated ? 1 : 0}`;
      if (seenPair.has(k)) return;
      seenPair.add(k);
      adjacency.push({ a, b, separated });
    };
    g.faces.forEach((f, i) => {
      const own = sideIdx[i];
      if (own >= 0) {
        for (const [j, l] of g.links[i]) if (sideIdx[j] >= 0) addAdj(leafOf.get(own) as number, leafOf.get(sideIdx[j]) as number, (l.barriers & (BARRIER.WALL | BARRIER.WATER)) !== 0);
        return;
      }
      // A face no district holds (a wall strip, water, a reservation): the districts around it meet across it.
      if (f.side === 'outside' && !f.water) return;
      const around = [...new Set([...g.links[i].keys()].filter((j) => sideIdx[j] >= 0).map((j) => leafOf.get(sideIdx[j]) as number))].sort((a, b) => a - b);
      const sep = f.water || (g.ringBarriers[i] & (BARRIER.WALL | BARRIER.WATER)) !== 0;
      for (let x = 0; x < around.length; x += 1) for (let y = x + 1; y < around.length; y += 1) addAdj(around[x], around[y], sep);
    });
    const L = alive.length;
    const nq = quarterCount(input.buildings ?? rosterBuildings(input.rung, s6t), cells);
    const quarterRun = townLineage(key, epoch, QUARTER_RUN_INDEX, reroll);
    const nodeIds: Id[] = [];
    for (let i = 0; i < Math.max(0, 2 * L - 1); i += 1) nodeIds.push(mintOne('quarter', quarterRun, i).id);
    const tree = quarterTree(
      alive.map((d) => {
        const id = (ids.get(d.seed.order) as { id: Id }).id;
        return { id, areaCm2: d.areaCm2, family: familyOf.get(kindOf.get(id) as string) ?? (kindOf.get(id) as string) };
      }),
      adjacency,
      { nq, familyCostHa: cells.familyCostHa, barrierCostHa: cells.barrierCostHa, nodeId: (i) => nodeIds[i] },
    );
    const quarterOf = new Map<Id, Id>();
    for (const nd of tree.nodes) if (nd.cityCut) for (const m of nd.members) quarterOf.set(m, nd.id);
    // The district records.
    const stages = input.stageBoundaries ?? [];
    const lineages = new Map<Id, LineageHash>();
    const districts: District[] = alive.map((d) => {
      const x = ids.get(d.seed.order) as { id: Id; lineage: LineageHash };
      lineages.set(x.id, x.lineage);
      const c = g.faces[d.seed.face].centroid;
      // The first stage whose boundary holds the seed face's centroid; beyond them all (the perimeter's band), the last.
      let growthStage = Math.max(1, stages.length);
      for (let k = 0; k < stages.length; k += 1) {
        if (insideRing(stages[k], c)) {
          growthStage = k + 1;
          break;
        }
      }
      const rec: District = {
        id: x.id,
        kind: kindOf.get(x.id) as string,
        quarter: quarterOf.get(x.id) as Id,
        faces: { owner: x.id, level: 1 },
        seams: seamsOf.get(x.id) ?? [],
        growthStage,
        fabric: 'bent-cut',
        fabricParams: {},
        lifecycle: generated(epoch),
      };
      if (d.seed.feature !== undefined) rec.namingFeature = d.seed.feature;
      return rec;
    });
    let unowned = 0;
    for (let i = 0; i < g.faces.length; i += 1) if (claimable[i] && sideIdx[i] < 0) unowned += 1;
    const report: S6Report = {
      work: { 'grower.turns': grown.turns, limit: grown.turnLimit },
      workCut: grown.workCut ? { code: 'work_cut', count: grown.turns, limit: grown.turnLimit } : null,
      landHa,
      nd: law.n,
      bandHa: law.bandHa,
      seeds: placed.seeds.length,
      seedsDropped: placed.dropped,
      leftovers: grown.leftovers.length,
      merges: grown.merges.length,
      belowFloor: grown.belowFloor.length,
      nq,
      districts: L,
      unowned,
    };
    return ok({ districts, seams, quarters: tree.nodes, typing, hinterland, perimeter: perimeter.slice(), lineages, grow: grown, report });
  };
  return { spec, fn };
}

/** S6 (see the module comment): the perimeter, then the batch through the façade's tx. */
export function runS6(input: S6Input): KernelResult<S6Output> {
  const key = input.key ?? GROUND_KEY;
  const per = settlementPerimeter(input.boundary, input.kernel, { ...(input.frame === undefined ? {} : { frame: input.frame }), ...(input.tables === undefined ? {} : { tables: input.tables }) });
  if (!per.ok) return err(per.code, per.detail);
  const b = s6Batch(input.kernel.plat(key), input, per.value);
  const r = input.kernel.tx(b.spec, b.fn);
  if (!r.ok) return err(r.code, r.detail);
  input.kernel.index.rebuildAtStageEnd(key);
  return ok(r.value.value as S6Output, r.warnings);
}

/** §12.4's S6 row (with the fields: 17 ms at CITY; reporting only — the other rungs read it until their rows, M1). */
const BUDGET_MS: Record<Rung, number> = { TOWN: 17, CITY: 17, METROPOLIS: 17, THORP: 17, HAMLET: 17, VILLAGE: 17 };

/** The laws of S6's counters: grower.turns and the insert counters of its batch. */
function laws(wl: WorkLimitsTable): WorkLimitLaw[] {
  return ['grower.turns', ...S6_COUNTERS].map((c) => {
    const law = wl.law(c);
    if (law.unit === 'fixed') throw new RangeError(`S6: the counter ${c} has a fixed law; its declaration needs a unit`);
    return { ...law };
  });
}

/**
 * S6 as §14's Stage: id S6, callback form (§4.1), `district.seed` and `district.type` its stream keys, F-WORK's
 * leftover rung and the degenerate face's merge its ladder (§4.1's S6 row; the raised parts' F-ROUTE is M3a's), the
 * town its lineage unit. Its input is the model's record for the stage (S6Input).
 */
export function s6Stage(opts: { workLimits?: WorkLimitsTable } = {}): Stage<S6Input, S6Output> {
  const wl = opts.workLimits ?? loadWorkLimits();
  return Object.freeze({
    id: S6,
    version: '1',
    inputs: ['ways', 'gates', 'bridges', 'reservations', 'enceintes', 'water', 'boundaries'] as string[],
    outputs: ['districts', 'seams', 'quarters', 'typing'] as string[],
    streamKeys: ['district.seed', 'district.type'] as string[],
    invariants: [],
    ladder: [
      { failureClass: 'F-WORK', rungs: ['leftoverRule'] },
      { failureClass: 'F-NUM', rungs: ['degenerateFaceMerge'] },
    ],
    workLimits: laws(wl),
    budgetMs: BUDGET_MS,
    batch: { kind: 'stage' as const, stage: S6 },
    lineageUnit: 'town',
    lazy: false,
    txForm: 'callback' as const,
    inputsOf(model: unknown, _scope: Scope): S6Input {
      const m = model as { get?: (k: string) => unknown } | Partial<S6Input> | null | undefined;
      const viaView = m !== null && m !== undefined && typeof (m as { get?: unknown }).get === 'function';
      const rec = (viaView ? (m as { get: (k: string) => unknown }).get('s6') : m) as Partial<S6Input> | null | undefined;
      if (rec === null || rec === undefined || rec.kernel === undefined || rec.boundary === undefined || rec.ways === undefined || rec.features === undefined || rec.seedKey === undefined || rec.rung === undefined) {
        throw new TypeError('s6Stage.inputsOf: the model hands S6 the façade, the seed key, the rung, the last boundary, the ways and the sited features');
      }
      return rec as S6Input;
    },
    run(input: S6Input, _ctx: StageContext): KernelResult<S6Output> {
      return runS6(input);
    },
  });
}
