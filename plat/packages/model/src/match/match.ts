// The matching routine (item M0-d-05b; §6.3 *Carry-over — survival and succession*, *Anchors and hysteresis*, *The
// matching routine, its budget and its fallback*; §3.3's spatial index as the overlap kinds' candidate source; §3.6 (5)
// through `splitHeir`). One routine hands addresses on in every re-derivation:
//   * an old entity that is not re-derived SURVIVES — its address and lineage kept;
//   * a re-derived one is matched to the fresh entities of its kind and class family by its anchor, kind by kind in
//     the anchor table's order: point-anchored kinds through a uniform grid per (kind, class family) whose cell is the
//     kind's hysteresis radius (the 3 × 3 neighbourhood holds every candidate; a pair is a candidate by its exact
//     distance ≤ the radius, never by sharing a cell); overlap-anchored kinds (IoU ≥ 0.5) on candidates from a spatial
//     index; a way by its end junctions' addresses, else by the overlap of its length (≥ 50 %); a key-anchored kind by
//     its key. Candidate pairs are sorted by (distance, old id, fresh id) — for an overlap pair the distance is
//     1 − overlap, for a key pair 0 — and assigned one-to-one greedily in that order, so coincident anchors resolve by
//     id. The fresh entity a pair assigns SUCCEEDS the old one: it takes its address and name and keeps its own fresh
//     lineage, with a `carry` event when that lineage differs (none for a faithful re-derivation, J-DET-2);
//   * an old entity left without a successor becomes a TOMBSTONE whose `supersededBy` is the address of the fresh
//     entity of its kind covering its anchor (the supersedes table); a fresh entity left without a predecessor is FRESH.
// Anchors that name other entities (a bridge's river, a way's ends, a district's seed feature, a seam's districts and
// chain) are read through the succession of the kinds matched before them: a fresh reference to a successor reads as
// the address handed to it, a fresh reference to a fresh entity never equals an old address. Ids are compared by
// their UTF-16 code units; every order is a function of the inputs' ids and anchors, never of their input order.
import { LATTICE, ratio, type Box, type LineageHash } from '@plat/kernel';
import type { EntityKind, Id, PointCm } from '../types/index.js';
import { checkAnchors, type CheckedSpec } from './anchors.js';
import { checkPoint, coversPoint, iou, lineShare, prepareArea, prepareLine, type Area, type Line } from './geometry.js';
import { boxGrid, boxQuery, gridAdd, gridNear, pointGrid, type PointGrid } from './grid.js';
import { splitHeirOf } from './split.js';
import type {
  AnchorSpec,
  CandidateSource,
  CarriedName,
  CarryEvent,
  KeyPart,
  MatchCounts,
  MatchEntity,
  MatchOptions,
  MatchResult,
  MatchedBy,
  Outcome,
} from './types.js';

/** The distance within which a fresh spine lies on an old one: the kernel's attraction distance (§3.2 (2), §3.6). */
export const WAY_OVERLAP_CM = LATTICE.attractCm;

const NULL_REF = '\u0000null';
const FRESH_TAG = '\u0000fresh:';
const SEP = '\u0001';

const isU32 = (v: unknown): boolean => typeof v === 'number' && v >>> 0 === v;
const cmpId = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0);

function inverse(v: number, kind: 'length' | 'count'): number {
  const r = ratio(1, v, kind);
  if (!r.ok) throw new RangeError(`match: no inverse of ${String(v)}`);
  return r.value;
}

/** An entity checked and prepared. */
interface Item {
  readonly e: MatchEntity;
  readonly pos: number; // its kind's position in the table
  readonly family: string;
  readonly partition: string;
  x: number;
  y: number;
  on: Id | undefined;
  region: Area | null;
  area: Area | null;
  line: Line | null;
  ends: readonly [Id | null, Id | null] | null;
  key: readonly KeyPart[] | null;
  box: Box | null;
}

/** A key's parts: each exactly one of { ref }, { set }, { lit }; a ref an address or null, a set a list of them. */
function checkKey(parts: unknown, what: string): readonly KeyPart[] {
  if (!Array.isArray(parts)) throw new RangeError(`match: ${what}'s key is not a list of parts`);
  const ok = (r: unknown): boolean => r === null || (typeof r === 'string' && r !== '');
  for (const p of parts as unknown[]) {
    if (typeof p !== 'object' || p === null) throw new RangeError(`match: ${what}'s key has a part that is not an object`);
    const forms = ('ref' in p ? 1 : 0) + ('set' in p ? 1 : 0) + ('lit' in p ? 1 : 0);
    if (forms !== 1) throw new RangeError(`match: ${what}'s key has a part that is not one of ref, set, lit`);
    const part = p as { ref?: unknown; set?: unknown; lit?: unknown };
    if ('ref' in p) {
      if (!ok(part.ref)) throw new RangeError(`match: ${what}'s key names a ref that is not an address`);
    } else if ('set' in p) {
      if (!Array.isArray(part.set) || !(part.set as unknown[]).every(ok)) throw new RangeError(`match: ${what}'s key has a set that is not a list of addresses`);
    } else if (typeof part.lit !== 'string') throw new RangeError(`match: ${what}'s key has a literal that is not a string`);
  }
  return parts as readonly KeyPart[];
}

function prepare(e: MatchEntity, side: 'old' | 'fresh', specs: Map<EntityKind, CheckedSpec>, order: Map<EntityKind, number>): Item {
  if (typeof e !== 'object' || e === null) throw new RangeError(`match: an ${side} entity is not an object`);
  if (typeof e.id !== 'string' || e.id === '') throw new RangeError(`match: an ${side} entity has no id`);
  const what = `the ${side} entity ${e.id}`;
  const checked = typeof e.kind === 'string' ? specs.get(e.kind) : undefined;
  if (checked === undefined) throw new RangeError(`match: ${what} is of kind ${String(e.kind)}, which the anchor table has no row for`);
  const l = e.lineage;
  if (typeof l !== 'object' || l === null || l.length !== 2 || !isU32(l[0]) || !isU32(l[1])) throw new RangeError(`match: ${what}'s lineage is not two u32 lanes`);
  if (e.family !== undefined && typeof e.family !== 'string') throw new RangeError(`match: ${what}'s family is not a string`);
  if (e.partition !== undefined && typeof e.partition !== 'string') throw new RangeError(`match: ${what}'s partition is not a string`);
  if (side === 'fresh' && e.survives !== undefined) throw new RangeError(`match: ${what} carries \`survives\` (an old entity's flag)`);
  if (e.survives !== undefined && typeof e.survives !== 'boolean') throw new RangeError(`match: ${what}'s survives flag is not a boolean`);
  if (side === 'old' && e.name !== undefined && (typeof e.name !== 'object' || e.name === null || typeof e.name.text !== 'string')) {
    throw new RangeError(`match: ${what}'s name is not a carried name`);
  }
  const spec = checked.spec;
  const item: Item = {
    e,
    pos: order.get(spec.kind) ?? -1,
    family: e.family ?? '',
    partition: e.partition ?? '',
    x: 0,
    y: 0,
    on: undefined,
    region: null,
    area: null,
    line: null,
    ends: null,
    key: null,
    box: null,
  };
  const a = e.anchor as Partial<{ point: unknown; on: unknown; area: unknown; ends: unknown; line: unknown; key: unknown }>;
  if (typeof a !== 'object' || a === null) throw new RangeError(`match: ${what} has no anchor`);
  if (e.region !== undefined && spec.anchor !== 'point') throw new RangeError(`match: ${what} carries a region, which only a point-anchored kind reads`);
  switch (spec.anchor) {
    case 'point': {
      if (a.point === undefined) throw new RangeError(`match: ${what}'s anchor is not a point (kind ${spec.kind})`);
      const p = a.point as PointCm;
      checkPoint(p, `${what}'s anchor point`);
      item.x = p.x;
      item.y = p.y;
      if (spec.on !== undefined) {
        if (typeof a.on !== 'string' || a.on === '') throw new RangeError(`match: ${what}'s anchor names no ${spec.on} it lies on`);
        item.on = a.on;
      } else if (a.on !== undefined) throw new RangeError(`match: ${what}'s anchor names an \`on\` its kind does not read`);
      if (e.region !== undefined) item.region = prepareArea(e.region, `${what}'s region`);
      break;
    }
    case 'overlap': {
      if (a.area === undefined) throw new RangeError(`match: ${what}'s anchor is not an area (kind ${spec.kind})`);
      item.area = prepareArea(a.area as never, `${what}'s anchor area`);
      item.box = item.area.box;
      break;
    }
    case 'ends': {
      const ends = a.ends as unknown;
      const okEnd = (v: unknown): boolean => v === null || (typeof v === 'string' && v !== '');
      if (!Array.isArray(ends) || ends.length !== 2 || !okEnd(ends[0]) || !okEnd(ends[1])) {
        throw new RangeError(`match: ${what}'s anchor has no two ends (kind ${spec.kind})`);
      }
      item.ends = [ends[0] as Id | null, ends[1] as Id | null];
      item.line = prepareLine(a.line as never, `${what}'s spine`);
      const b = item.line.box;
      const d = WAY_OVERLAP_CM;
      item.box = { minX: b.minX - d, minY: b.minY - d, maxX: b.maxX + d, maxY: b.maxY + d };
      break;
    }
    case 'key':
      item.key = checkKey(a.key, what);
      break;
  }
  return item;
}

/** One kind's assignment: per old entity its successor (−1 none), the pair's sort score and how it was found. */
interface Assignment {
  readonly succ: Int32Array;
  readonly pred: Int32Array;
  readonly score: Float64Array;
  readonly how: MatchedBy[];
}

/** The greedy one-to-one assignment over candidate pairs sorted by (score, old index, fresh index). */
class Pairs {
  readonly o: number[] = [];
  readonly f: number[] = [];
  readonly s: number[] = [];
  push(o: number, f: number, s: number): void {
    this.o.push(o);
    this.f.push(f);
    this.s.push(s);
  }
  /**
   * Assigns in the canonical order. The old and fresh lists are sorted by id, so their indices order the pairs as
   * (score, old id, fresh id) do.
   */
  assign(m: Assignment, how: MatchedBy): void {
    const n = this.o.length;
    if (n === 0) return;
    const idx = new Array<number>(n);
    for (let i = 0; i < n; i += 1) idx[i] = i;
    const { o, f, s } = this;
    idx.sort((a, b) => s[a] - s[b] || o[a] - o[b] || f[a] - f[b]);
    for (const i of idx) {
      const oi = o[i];
      const fi = f[i];
      if (m.succ[oi] !== -1 || m.pred[fi] !== -1) continue;
      m.succ[oi] = fi;
      m.pred[fi] = oi;
      m.score[oi] = s[i];
      m.how[oi] = how;
    }
    this.o.length = 0;
    this.f.length = 0;
    this.s.length = 0;
  }
}

const zero = (): MatchCounts => ({ survive: 0, succeed: 0, tombstone: 0, fresh: 0 });

/**
 * §6.3's matching routine: hands addresses on from `old` (the scope's live entities, a survivor flagged `survives`)
 * to `fresh` (the re-derived entities, by provisional id) with the anchor table `anchors` (M0_ANCHORS, its cells read
 * by resolveAnchors). A fresh provisional id may equal a survivor's address (a fresh key equal to a survivor's: the
 * mint resolves it); a fresh anchor naming such an id is ambiguous and refused. Refuses (RangeError) a malformed entity
 * or table, a kind the table has no row for, an id given twice on one side, an anchor of the wrong form, zero length or
 * zero area, and an anchor naming an entity of a kind the table matches after its own.
 */
export function match(old: readonly MatchEntity[], fresh: readonly MatchEntity[], anchors: readonly AnchorSpec[], options: MatchOptions = {}): MatchResult {
  // The whole call is probed (kind null) around every step — the checks, the preparation, the splits, each kind's
  // matching and the frozen result — so the harness counts every millisecond of it (C-0190).
  const probe = options.probe;
  if (probe !== undefined) probe(null, 'begin');
  if (!Array.isArray(old) || !Array.isArray(fresh)) throw new RangeError('match: old and fresh are lists of entities');
  const specs = checkAnchors(anchors);
  const order = new Map<EntityKind, number>();
  const kinds: EntityKind[] = [];
  for (const k of specs.keys()) {
    order.set(k, kinds.length);
    kinds.push(k);
  }
  const perPartition = options.perPartition === true;
  const sources = options.candidates;

  // Check and prepare both sides; index them by id and by kind.
  const oldById = new Map<Id, Item>();
  const freshById = new Map<Id, Item>();
  const oldByKind = new Map<EntityKind, Item[]>();
  const freshByKind = new Map<EntityKind, Item[]>();
  for (const e of old) {
    const it = prepare(e, 'old', specs, order);
    if (oldById.has(e.id)) throw new RangeError(`match: the old id ${e.id} is given twice`);
    oldById.set(e.id, it);
    const list = oldByKind.get(e.kind);
    if (list === undefined) oldByKind.set(e.kind, [it]);
    else list.push(it);
  }
  for (const e of fresh) {
    const it = prepare(e, 'fresh', specs, order);
    if (freshById.has(e.id)) throw new RangeError(`match: the fresh id ${e.id} is given twice`);
    freshById.set(e.id, it);
    const list = freshByKind.get(e.kind);
    if (list === undefined) freshByKind.set(e.kind, [it]);
    else list.push(it);
  }

  // The declared splits: an old re-derived point-anchored entity → fresh children of its kind, each with a region.
  const splitOf = new Map<Id, readonly Item[]>();
  if (options.splits !== undefined) {
    if (!(options.splits instanceof Map)) throw new RangeError('match: the splits are not a map');
    const claimed = new Set<Id>();
    for (const [parent, children] of options.splits) {
      const o = oldById.get(parent);
      if (o === undefined || o.e.survives === true) throw new RangeError(`match: the split ${String(parent)} is no re-derived old entity`);
      if ((specs.get(o.e.kind) as CheckedSpec).spec.anchor !== 'point') throw new RangeError(`match: the split ${parent} is of kind ${o.e.kind}, which is not point-anchored`);
      if (!Array.isArray(children) || children.length === 0) throw new RangeError(`match: the split ${parent} names no children`);
      const items: Item[] = [];
      for (const c of children as unknown[]) {
        const f = typeof c === 'string' ? freshById.get(c) : undefined;
        if (f === undefined || f.e.kind !== o.e.kind || f.region === null) {
          throw new RangeError(`match: the split ${parent} names ${String(c)}, which is no fresh ${o.e.kind} with a region`);
        }
        if (claimed.has(f.e.id)) throw new RangeError(`match: the fresh ${f.e.id} is a child of two splits, or named twice`);
        claimed.add(f.e.id);
        items.push(f);
      }
      splitOf.set(parent, items);
    }
  }

  const handedOn = new Map<Id, Id>();
  const addressOf = new Map<Id, Id>();
  const outcomes: Outcome[] = [];
  const byOld = new Map<Id, Outcome>();
  const carry: CarryEvent[] = [];
  const supersedes = new Map<Id, Id>();
  const counts = zero();
  const perKind = new Map<EntityKind, MatchCounts>();
  const byItemId = (a: Item, b: Item): number => cmpId(a.e.id, b.e.id);

  for (let pos = 0; pos < kinds.length; pos += 1) {
    const kind = kinds[pos];
    const checked = specs.get(kind) as CheckedSpec;
    const spec = checked.spec;
    const allOld = (oldByKind.get(kind) ?? []).slice().sort(byItemId);
    const olds = allOld.filter((it) => it.e.survives !== true);
    const freshes = (freshByKind.get(kind) ?? []).slice().sort(byItemId);
    const kc = zero();
    perKind.set(kind, kc);
    if (allOld.length === 0 && freshes.length === 0) continue;
    if (probe !== undefined) probe(kind, 'begin');

    // A reference read through the succession of the kinds matched before this one.
    const refOld = (ref: Id | null): string => {
      if (ref === null) return NULL_REF;
      const it = oldById.get(ref);
      if (it !== undefined && it.e.survives !== true && it.pos >= pos) {
        throw new RangeError(`match: an old ${kind} names the ${it.e.kind} ${ref}, which the anchor table matches after it`);
      }
      return ref;
    };
    const refFresh = (ref: Id | null): string => {
      if (ref === null) return NULL_REF;
      const it = freshById.get(ref);
      if (it === undefined) return ref;
      if (oldById.get(ref)?.e.survives === true) {
        throw new RangeError(`match: a fresh ${kind} names ${ref}, both a fresh provisional id and a survivor's address`);
      }
      if (it.pos >= pos) throw new RangeError(`match: a fresh ${kind} names the fresh ${it.e.kind} ${ref}, which the anchor table matches after it`);
      return handedOn.get(ref) ?? FRESH_TAG + ref;
    };
    const keyOf = (it: Item, ref: (r: Id | null) => string): string => {
      let s = it.family;
      for (const part of it.key as readonly KeyPart[]) {
        s += SEP;
        if ('set' in part) s += 'S' + part.set.map(ref).sort(cmpId).join(SEP + SEP);
        else if ('lit' in part) s += 'L' + part.lit;
        else s += 'R' + ref(part.ref);
      }
      return s;
    };

    const no = olds.length;
    const nf = freshes.length;
    const m: Assignment = {
      succ: new Int32Array(no).fill(-1),
      pred: new Int32Array(nf).fill(-1),
      score: new Float64Array(no),
      how: new Array<MatchedBy>(no).fill('key'),
    };
    const { succ, pred, score } = m;
    const covering = new Int32Array(no).fill(-1);
    const pairs = new Pairs();

    // The candidate source of an overlap-anchored kind: the handed-in index, else a box grid over the fresh boxes.
    const freshIndex = new Map<Id, number>();
    for (let i = 0; i < nf; i += 1) freshIndex.set(freshes[i].e.id, i);
    const candidatesOf = (): ((box: Box) => number[]) => {
      const source: CandidateSource | undefined = sources?.get(kind);
      if (source !== undefined) {
        return (box) => {
          const out: number[] = [];
          const seen = new Set<number>();
          for (const id of source(box)) {
            const i = freshIndex.get(id);
            if (i !== undefined && !seen.has(i)) {
              seen.add(i);
              out.push(i);
            }
          }
          return out;
        };
      }
      const g = boxGrid(
        freshes.map((it) => it.box as Box),
        (v) => inverse(v, 'count'),
      );
      return (box) => boxQuery(g, box);
    };

    if (spec.anchor === 'point') {
      const r = checked.radiusCm;
      const r2 = r * r;
      const inv = inverse(r, 'length');
      const freshOn = freshes.map((it) => (it.on === undefined ? undefined : refFresh(it.on)));
      const oldOn = olds.map((it) => (it.on === undefined ? undefined : refOld(it.on)));
      const collect = (sameDistrict: boolean): void => {
        const grids = new Map<string, PointGrid>();
        for (let fi = 0; fi < nf; fi += 1) {
          if (pred[fi] !== -1) continue;
          const it = freshes[fi];
          const gk = sameDistrict ? it.family + SEP + it.partition : it.family;
          let g = grids.get(gk);
          if (g === undefined) {
            g = pointGrid(r, inv);
            grids.set(gk, g);
          }
          gridAdd(g, fi, it.x, it.y);
        }
        for (let oi = 0; oi < no; oi += 1) {
          if (succ[oi] !== -1) continue;
          const o = olds[oi];
          const g = grids.get(sameDistrict ? o.family + SEP + o.partition : o.family);
          if (g === undefined) continue;
          gridNear(g, o.x, o.y, (fi) => {
            const f = freshes[fi];
            const dx = f.x - o.x;
            const dy = f.y - o.y;
            const d2 = dx * dx + dy * dy;
            if (d2 <= r2 && oldOn[oi] === freshOn[fi]) pairs.push(oi, fi, d2);
          });
        }
        pairs.assign(m, 'point');
      };
      if (perPartition) collect(true);
      collect(false);
      // A declared split (§3.6 (5)): the first free child, left of the cut first, whose closed region holds the anchor.
      if (splitOf.size > 0) {
        for (let oi = 0; oi < no; oi += 1) {
          if (succ[oi] !== -1) continue;
          const o = olds[oi];
          const children = splitOf.get(o.e.id);
          if (children === undefined) continue;
          const free = children.filter((c) => pred[freshIndex.get(c.e.id) as number] === -1);
          const k = splitHeirOf({ x: o.x, y: o.y } as PointCm, free.map((c) => c.region as Area));
          if (k === -1) continue;
          const fi = freshIndex.get(free[k].e.id) as number;
          succ[oi] = fi;
          pred[fi] = oi;
          score[oi] = 0;
          m.how[oi] = 'split';
        }
      }
      // Covering: the fresh entity whose region holds the old anchor point (ties by fresh id).
      const withRegion: number[] = [];
      for (let fi = 0; fi < nf; fi += 1) if (freshes[fi].region !== null) withRegion.push(fi);
      if (withRegion.length > 0 && succ.includes(-1)) {
        const g = boxGrid(
          withRegion.map((fi) => (freshes[fi].region as Area).box),
          (v) => inverse(v, 'count'),
        );
        for (let oi = 0; oi < no; oi += 1) {
          if (succ[oi] !== -1) continue;
          const o = olds[oi];
          for (const k of boxQuery(g, { minX: o.x, minY: o.y, maxX: o.x, maxY: o.y })) {
            const fi = withRegion[k];
            if (coversPoint(freshes[fi].region as Area, o.x, o.y) && (covering[oi] === -1 || fi < covering[oi])) covering[oi] = fi;
          }
        }
      }
    } else if (spec.anchor === 'overlap' || spec.anchor === 'ends') {
      const threshold = checked.overlap;
      if (spec.anchor === 'ends') {
        // The end junctions' addresses (an unordered pair; a way with an end that is no entity has none).
        const byKey = new Map<string, number[]>();
        for (let fi = 0; fi < nf; fi += 1) {
          const f = freshes[fi];
          const ends = f.ends as readonly [Id | null, Id | null];
          if (ends[0] === null || ends[1] === null) continue;
          const k = f.family + SEP + [refFresh(ends[0]), refFresh(ends[1])].sort(cmpId).join(SEP);
          const list = byKey.get(k);
          if (list === undefined) byKey.set(k, [fi]);
          else list.push(fi);
        }
        for (let oi = 0; oi < no; oi += 1) {
          const o = olds[oi];
          const ends = o.ends as readonly [Id | null, Id | null];
          if (ends[0] === null || ends[1] === null) continue;
          const k = o.family + SEP + [refOld(ends[0]), refOld(ends[1])].sort(cmpId).join(SEP);
          for (const fi of byKey.get(k) ?? []) pairs.push(oi, fi, 0);
        }
        pairs.assign(m, 'key');
      }
      // The overlap on the candidates the index gives (for a way: the old ways the ends did not match).
      const query = candidatesOf();
      const cand: number[][] = new Array<number[]>(no);
      const share: number[][] = new Array<number[]>(no);
      const d = WAY_OVERLAP_CM;
      for (let oi = 0; oi < no; oi += 1) {
        cand[oi] = [];
        share[oi] = [];
        if (succ[oi] !== -1) continue;
        const o = olds[oi];
        let best = -1;
        let bestV = 0;
        for (const fi of query(o.box as Box)) {
          const f = freshes[fi];
          const v = spec.anchor === 'overlap' ? iou(o.area as Area, f.area as Area) : lineShare(o.line as Line, f.line as Line, d);
          if (v > 0 && (v > bestV || (v === bestV && fi < best))) {
            best = fi;
            bestV = v;
          }
          if (v >= threshold && f.family === o.family) {
            cand[oi].push(fi);
            share[oi].push(v);
          }
        }
        covering[oi] = best;
      }
      const collect = (sameDistrict: boolean): void => {
        for (let oi = 0; oi < no; oi += 1) {
          if (succ[oi] !== -1) continue;
          const o = olds[oi];
          const cs = cand[oi];
          for (let k = 0; k < cs.length; k += 1) {
            const fi = cs[k];
            if (pred[fi] !== -1) continue;
            if (sameDistrict && freshes[fi].partition !== o.partition) continue;
            pairs.push(oi, fi, 1 - share[oi][k]);
          }
        }
        pairs.assign(m, 'overlap');
      };
      if (perPartition) collect(true);
      collect(false);
    } else {
      // A key-anchored kind: its key, no distance read.
      const byKey = new Map<string, number[]>();
      for (let fi = 0; fi < nf; fi += 1) {
        const k = keyOf(freshes[fi], refFresh);
        const list = byKey.get(k);
        if (list === undefined) byKey.set(k, [fi]);
        else list.push(fi);
      }
      for (let oi = 0; oi < no; oi += 1) {
        for (const fi of byKey.get(keyOf(olds[oi], refOld)) ?? []) pairs.push(oi, fi, 0);
      }
      pairs.assign(m, 'key');
    }

    // The successors' addresses first: a covering fresh entity may itself be a successor.
    for (let oi = 0; oi < no; oi += 1) {
      const fi = succ[oi];
      if (fi === -1) continue;
      handedOn.set(freshes[fi].e.id, olds[oi].e.id);
    }
    for (let fi = 0; fi < nf; fi += 1) {
      const id = freshes[fi].e.id;
      addressOf.set(id, handedOn.get(id) ?? id);
    }
    // The outcomes: the old entities by id (survivors among them), then the fresh ones without a predecessor.
    const oldIndex = new Map<Item, number>();
    for (let oi = 0; oi < no; oi += 1) oldIndex.set(olds[oi], oi);
    for (const it of allOld) {
      const e = it.e;
      let out: Outcome;
      if (e.survives === true) {
        out = Object.freeze({ outcome: 'survive', kind, id: e.id });
        kc.survive += 1;
      } else {
        const oi = oldIndex.get(it) as number;
        const fi = succ[oi];
        if (fi !== -1) {
          const f = freshes[fi].e;
          const how = m.how[oi];
          // The reported score: a point pair's distance in cm, an overlap pair's overlap, a key pair's 0.
          const s = how === 'point' ? Math.sqrt(score[oi]) : how === 'overlap' ? 1 - score[oi] : 0;
          const name: CarriedName | undefined = e.name;
          out = Object.freeze({
            outcome: 'succeed',
            kind,
            id: e.id,
            fresh: f.id,
            by: how,
            score: s,
            ...(name === undefined ? {} : { name }),
          });
          kc.succeed += 1;
          const from = e.lineage;
          const to = f.lineage;
          if (from[0] !== to[0] || from[1] !== to[1]) {
            carry.push(
              Object.freeze({
                id: e.id,
                entityKind: kind,
                fresh: f.id,
                lineageFrom: Object.freeze([from[0], from[1]]) as unknown as Readonly<LineageHash>,
                lineageTo: Object.freeze([to[0], to[1]]) as unknown as Readonly<LineageHash>,
              }),
            );
          }
        } else {
          const ci = covering[oi];
          const lineage = Object.freeze([e.lineage[0], e.lineage[1]]) as unknown as Readonly<LineageHash>;
          if (ci === -1) out = Object.freeze({ outcome: 'tombstone', kind, id: e.id, lineage });
          else {
            const to = addressOf.get(freshes[ci].e.id) as Id;
            supersedes.set(e.id, to);
            out = Object.freeze({ outcome: 'tombstone', kind, id: e.id, lineage, supersededBy: to });
          }
          kc.tombstone += 1;
        }
      }
      outcomes.push(out);
      byOld.set(e.id, out);
    }
    for (let fi = 0; fi < nf; fi += 1) {
      if (pred[fi] !== -1) continue;
      outcomes.push(Object.freeze({ outcome: 'fresh', kind, id: freshes[fi].e.id }));
      kc.fresh += 1;
    }
    counts.survive += kc.survive;
    counts.succeed += kc.succeed;
    counts.tombstone += kc.tombstone;
    counts.fresh += kc.fresh;
    if (probe !== undefined) probe(kind, 'end');
  }

  carry.sort((a, b) => cmpId(a.id, b.id));
  for (const c of perKind.values()) Object.freeze(c);
  const result: MatchResult = Object.freeze({
    outcomes: Object.freeze(outcomes),
    old: byOld,
    addressOf,
    handedOn,
    carry: Object.freeze(carry),
    supersedes,
    counts: Object.freeze(counts),
    perKind,
    fallback: perPartition ? 'per-partition' : null,
  });
  if (probe !== undefined) probe(null, 'end');
  return result;
}
