// §3.10's whole-arena rows: the stored references (stage end, save), the frozen base (at the freeze — the pool is M1's,
// so the predicate stands built and the row holds vacuously in M0's runs), the pool scope (at the merge, M1), the seed
// tiling of a transient arena (M6-P), and the CI-only Euler characteristic per level — with `checkCI` also sweeping
// every batch-local row over the whole arena and the index against the arena (the B-FUZZ property check, §13.1).
// M0-a-14. Readings: C-0200.
import {
  FREE_KIND,
  handleOf,
  idOf,
  isFaceLive,
  isHalfEdgeLive,
  isVertexLive,
  LEVELS,
  pointOf,
  resolve,
  roleIdOf,
  roleInfo,
  rowElement,
  rowsOfKey,
  walkRing,
  type HalfEdgeId,
  type Plat,
  type VertexId,
} from '../arena/index.js';
import { checkIndexState, indexOf } from '../index/index.js';
import { area2, area2Big, orient2d } from '../num/index.js';
import type { LatticePoint, Level } from '../types/index.js';
import { checkBatch, wholeRecord } from './batch.js';
import { Meter, vacuous, verdict } from './common.js';
import { rowNamed } from './rows.js';
import type { InvariantResult, StoredProfile, WholeContext } from './types.js';

// ---- Euler characteristic (CI) ----------------------------------------------------------------------------------------

/** The level-l view's counts: V (its vertices), E (its pieces), F (its faces, the outside included) and C (components). */
export function eulerCounts(p: Plat, level: Level): { v: number; e: number; f: number; c: number } {
  const H = p.halfEdges;
  const L = p.vertices.level;
  const O = H.origin;
  const parent = new Map<VertexId, VertexId>();
  const find = (v: VertexId): VertexId => {
    let r = v;
    while (parent.get(r) !== r) r = parent.get(r) as VertexId;
    let w = v;
    while (w !== r) {
      const nx = parent.get(w) as VertexId;
      parent.set(w, r);
      w = nx;
    }
    return r;
  };
  let pairs = 0;
  const touched = new Set<VertexId>();
  for (let e = 0; e < p.slots.pair.top; e++) {
    if (!isHalfEdgeLive(p, 2 * e) || H.level[e] > level) continue;
    pairs++;
    const a = O[2 * e];
    const b = O[2 * e + 1];
    touched.add(a);
    touched.add(b);
    if (!parent.has(a)) parent.set(a, a);
    if (!parent.has(b)) parent.set(b, b);
    parent.set(find(a), find(b));
  }
  let v = 0;
  let through = 0;
  for (const w of touched) {
    if (L[w] <= level) v++;
    else through++; // a finer vertex inside a run of level ≤ l joins two sub-edges into one piece
  }
  const roots = new Set<VertexId>();
  for (const w of touched) roots.add(find(w));
  // Faces: the counter-clockwise cycles of the view (each bounded face has exactly one outer cycle), plus the outside.
  const seen = new Set<HalfEdgeId>();
  let bounded = 0;
  for (let h = 0; h < 2 * p.slots.pair.top; h++) {
    if (!isHalfEdgeLive(p, h) || H.level[h >> 1] > level || seen.has(h)) continue;
    const ring = walkRing(p, level, h);
    for (const g of ring) seen.add(g);
    if (area2Big(ring.map((g) => pointOf(p, O[g]))) > 0n) bounded++;
  }
  return { v, e: pairs - through, f: bounded + 1, c: roots.size };
}

/** The Euler row: V − E + F = 1 + components on every level that has an edge. */
function euler(p: Plat): InvariantResult {
  const row = rowNamed('euler');
  const m = new Meter();
  const out: string[] = [];
  let subjects = 0;
  for (const level of LEVELS) {
    try {
      const k = eulerCounts(p, level);
      if (k.e === 0) continue;
      subjects++;
      if (k.v - k.e + k.f !== 1 + k.c) out.push(`L${level}: V − E + F = ${k.v} − ${k.e} + ${k.f} ≠ 1 + ${k.c}`);
    } catch (e) {
      subjects++;
      out.push(`L${level}: the view does not walk: ${e instanceof Error ? e.message : String(e)}`);
    }
  }
  return verdict(row, subjects, out, m);
}

// ---- stored references (stage end, save) -----------------------------------------------------------------------------

function refText(ref: object): string {
  return JSON.stringify(ref);
}

/** A profile's knots on its chain in ordinal order (either way along each run; a ring cyclically), one knot per ring at least. */
function profileProblems(p: Plat, sp: StoredProfile, out: string[]): void {
  const r = resolve(p, sp.chain, p.key);
  if (r.view !== 'edges' || r.runs.length === 0) {
    out.push(`the profile of ${refText(sp.chain)} lies on no chain`);
    return;
  }
  const O = p.halfEdges.origin;
  const knot = roleIdOf(sp.knotRole);
  if (knot < 0 || !roleInfo(knot).knot) {
    out.push(`the profile of ${refText(sp.chain)} names ${sp.knotRole}, no knot role`);
    return;
  }
  const where = new Map<VertexId, { run: number; i: number }>();
  r.runs.forEach((run, k) => {
    run.forEach((h, i) => where.set(O[h], { run: k, i }));
    const last = O[run[run.length - 1] ^ 1];
    if (!where.has(last)) where.set(last, { run: k, i: run.length });
  });
  const h = handleOf(p, sp.chain.entity);
  const per: { o: number; i: number }[][] = r.runs.map(() => []);
  for (let o = 0; o < sp.profile.values.length; o++) {
    const rows = h < 0 ? [] : rowsOfKey(p, knot, h, o);
    if (rows.length !== 1) {
      out.push(`knot ${o} of (${sp.knotRole}, ${sp.chain.entity}) finds ${rows.length} vertices, not one`);
      continue;
    }
    const at = where.get(rowElement(p, rows[0]));
    if (at === undefined) {
      out.push(`knot ${o} of (${sp.knotRole}, ${sp.chain.entity}) lies off its chain`);
      continue;
    }
    per[at.run].push({ o, i: at.i });
  }
  r.runs.forEach((run, k) => {
    const closed = O[run[0]] === O[run[run.length - 1] ^ 1];
    const ks = per[k];
    if (closed && ks.length === 0) out.push(`a ring of ${refText(sp.chain)} carries no knot`);
    if (ks.length < 3 && !closed) {
      if (ks.length === 2 && ks[0].i === ks[1].i) out.push(`two knots of (${sp.knotRole}, ${sp.chain.entity}) share one vertex`);
      return;
    }
    // Ordinal order along the run: positions sorted by ordinal rise (or fall) monotonically; a ring may wrap once.
    const pos = ks.slice().sort((a, b) => a.o - b.o).map((x) => x.i);
    let up = 0;
    let down = 0;
    for (let i = 0; i < pos.length; i++) {
      const j = (i + 1) % pos.length;
      if (!closed && j === 0) break;
      if (pos[j] > pos[i]) up++;
      else if (pos[j] < pos[i]) down++;
    }
    const ok = closed ? up <= 1 || down <= 1 : up === 0 || down === 0;
    if (!ok) out.push(`the knots of (${sp.knotRole}, ${sp.chain.entity}) are not in ordinal order along its chain`);
  });
}

/**
 * Every stored reference resolves (§3.10; §5.3's stage-end and save row): the role table's reverse index (every live
 * row on a live edge or vertex); every indexed role other than a knot role finds exactly one vertex per ordinal (a
 * vertex role) and a non-empty edge set (an edge role); the context's references each find geometry; its profiles'
 * knots lie on their chains in ordinal order with a knot on every ring; and no row or face owner names a dead entity.
 */
function references(p: Plat, ctx: WholeContext): InvariantResult {
  const row = rowNamed('references-resolve');
  const m = new Meter();
  const out: string[] = [];
  let subjects = 0;
  try {
    const R = p.roles;
    const keys = new Map<string, { role: number; entity: number; ordinal: number; n: number; kind: 'edge' | 'vertex' }>();
    for (let r = 0; r < p.slots.role.top; r++) {
      if (R.kind[r] === FREE_KIND) continue;
      subjects++;
      const info = roleInfo(R.kind[r]);
      const el = rowElement(p, r);
      if (info.kind === 'vertex' ? !isVertexLive(p, el) : !isHalfEdgeLive(p, 2 * el)) out.push(`a ${info.name} row names a dead ${info.kind} slot ${el}`);
      if (info.kind === 'vertex') m.vertex(el);
      else m.edge(el);
      if (!info.indexed || info.knot) continue;
      const k = `${R.kind[r]}:${R.entity[r]}:${R.ordinal[r]}`;
      const e = keys.get(k);
      if (e === undefined) keys.set(k, { role: R.kind[r], entity: R.entity[r], ordinal: R.ordinal[r], n: 1, kind: info.kind });
      else e.n++;
    }
    for (const e of keys.values()) {
      if (e.kind === 'vertex' && e.n !== 1) out.push(`(${roleInfo(e.role).name}, ${idOf(p, e.entity)}, ${e.ordinal}) finds ${e.n} vertices, not one`);
    }
    for (const ref of ctx.refs ?? []) {
      subjects++;
      if ('chain' in ref) continue; // a StretchRef is resolved by its writer (§3.4), never stored
      const r = resolve(p, ref, p.key);
      const empty = r.view === 'faces' ? r.faces.length === 0 : r.view === 'edges' ? r.runs.length === 0 : r.vertices.length === 0;
      if (empty) out.push(`the stored reference ${refText(ref)} finds no geometry`);
      if (r.view === 'vertices' && r.vertices.length > 1) out.push(`the stored reference ${refText(ref)} finds ${r.vertices.length} vertices`);
    }
    for (const sp of ctx.profiles ?? []) {
      subjects++;
      profileProblems(p, sp, out);
    }
    if (ctx.isLive !== undefined) {
      const isLive = ctx.isLive;
      const dead = new Set<number>();
      for (let r = 0; r < p.slots.role.top; r++) if (R.kind[r] !== FREE_KIND && !isLive(idOf(p, R.entity[r]))) dead.add(R.entity[r]);
      for (const level of LEVELS) {
        const F = p.faces[level];
        for (let f = 0; f < p.slots.face[level].top; f++) {
          if (!isFaceLive(p, level, f) || F.owner[f] < 0) continue;
          subjects++;
          m.face(level, f);
          if (!isLive(idOf(p, F.owner[f]))) dead.add(F.owner[f]);
        }
      }
      for (const h of dead) out.push(`geometry carries the dead entity ${idOf(p, h)}`);
    }
  } catch (e) {
    subjects = Math.max(subjects, 1);
    out.push(`the row's walk failed: ${e instanceof Error ? e.message : String(e)}`);
  }
  return verdict(row, subjects, out, m, ctx.isLive === undefined ? 'no entity liveness handed in: the dead-entity clause read no store' : undefined);
}

// ---- the frozen base (at the freeze, M1) -----------------------------------------------------------------------------

/** The freeze's predicate: every level's dynamic grid and every partition's tombstone set empty — two counts per level. */
export function frozenBaseProblems(p: Plat): string[] {
  if (p.index === undefined) return ['the arena has no spatial index attached'];
  const idx = indexOf(p);
  const out: string[] = [];
  for (const level of LEVELS) {
    const grid = idx.levels[level].dynamic.entries.size;
    let dead = 0;
    for (const s of idx.levels[level].tombstones) dead += s.size;
    if (grid > 0) out.push(`L${level}'s dynamic grid holds ${grid} items at the freeze`);
    if (dead > 0) out.push(`L${level}'s partitions hold ${dead} tombstones at the freeze`);
  }
  return out;
}

/** The frozen-base row at a freeze (the pool's step 1 calls it after its rebuild; the pool is M1's). */
export function checkFreeze(plat: Plat): InvariantResult[] {
  const row = rowNamed('frozen-base');
  const problems = frozenBaseProblems(plat);
  return [verdict(row, 5, problems, new Meter())];
}

// ---- the pool scope (at the merge, M1) -------------------------------------------------------------------------------

/** One district overlay at the merge: the base records it copied and the writes it made outside its scope. */
export interface OverlayScope {
  readonly district: string;
  /** Copied base records, by item key (kind · 2³² + slot). */
  readonly copied: readonly number[];
  /** Writes outside the district's scope, by item key (E_SCOPE). */
  readonly outOfScope: readonly number[];
}

/** The pool-scope predicate: no write outside a scope; no base record copied by two overlays or changed live after the freeze. */
export function poolScopeProblems(overlays: readonly OverlayScope[], liveChanged: readonly number[]): string[] {
  const out: string[] = [];
  const by = new Map<number, string>();
  const live = new Set<number>(liveChanged);
  for (const o of overlays) {
    for (const k of o.outOfScope) out.push(`the overlay of ${o.district} wrote ${k} outside its scope`);
    for (const k of o.copied) {
      const first = by.get(k);
      if (first !== undefined && first !== o.district) out.push(`the overlays of ${first} and ${o.district} both copied base record ${k}`);
      else by.set(k, o.district);
      if (live.has(k)) out.push(`the overlay of ${o.district} copied base record ${k}, which the live arena changed after the freeze`);
    }
  }
  return out;
}

// ---- seed tiling (a transient arena, M6-P) ---------------------------------------------------------------------------

/**
 * The seed-tiling predicate at `readBack` (§3.10): the faces' `area2` summed equals the seed rings' summed, and every
 * face ring lies inside one seed ring (each of its vertices inside or on it, by the exact orientation).
 */
export function seedTilingProblems(faces: readonly (readonly LatticePoint[])[], seeds: readonly (readonly LatticePoint[])[]): string[] {
  const out: string[] = [];
  let fa = 0;
  for (const f of faces) fa += area2(f);
  let sa = 0;
  for (const s of seeds) sa += area2(s);
  if (fa !== sa) out.push(`the faces' area2 sum ${fa} differs from the seed rings' ${sa}`);
  const inside = (ring: readonly LatticePoint[], q: LatticePoint): boolean => {
    let wind = 0;
    for (let i = 0; i < ring.length; i++) {
      const a = ring[i];
      const b = ring[(i + 1) % ring.length];
      const o = orient2d(a.x, a.y, b.x, b.y, q.x, q.y);
      const onEdge = o === 0 && Math.min(a.x, b.x) <= q.x && q.x <= Math.max(a.x, b.x) && Math.min(a.y, b.y) <= q.y && q.y <= Math.max(a.y, b.y);
      if (onEdge) return true;
      if (a.y <= q.y) {
        if (b.y > q.y && o > 0) wind++;
      } else if (b.y <= q.y && o < 0) {
        wind--;
      }
    }
    return wind !== 0;
  };
  faces.forEach((f, i) => {
    if (!seeds.some((s) => f.every((q) => inside(s, q)))) out.push(`face ring ${i} lies inside no seed ring`);
  });
  return out;
}

// ---- the scopes ------------------------------------------------------------------------------------------------------

/**
 * The stage-end rows (§3.10, §5.3): the stored references; and the pool's two rows, which run at the freeze and the
 * merge — absent at M0 (the pool is M1's), so they hold vacuously with a count of 0 (§5.3's rule).
 */
export function checkStageEnd(plat: Plat, ctx: WholeContext = {}): InvariantResult[] {
  return [
    references(plat, ctx),
    vacuous(rowNamed('frozen-base'), 'no pool freeze at M0 (the derivation pool is M1\'s, §4b); its predicate is checkFreeze'),
    vacuous(rowNamed('pool-scope'), 'no pool merge at M0 (the derivation pool is M1\'s, §4b); its predicate is poolScopeProblems'),
  ];
}

/** The save rows (§3.10: the stored references resolve at save as at stage end). */
export function checkSave(plat: Plat, ctx: WholeContext = {}): InvariantResult[] {
  const r = references(plat, ctx);
  return [{ ...r, scope: 'save' }];
}

/**
 * The CI rows (§3.10's Euler characteristic per level, B-FUZZ and B-EDIT), with the whole-arena sweep the B-FUZZ
 * runner applies after every operation (§13.1): every batch-local row over every live face, the stored references, and
 * the index against the arena (M0-a-03's `checkIndexState`, folded into the freshness row).
 */
export function checkCI(plat: Plat, ctx: WholeContext = {}): InvariantResult[] {
  const batch = checkBatch(wholeRecord(plat), plat).map((r) => {
    if (r.name !== 'index-freshness' || plat.index === undefined) return r;
    const extra = checkIndexState(plat).map((x) => `index-freshness: ${x}`);
    return extra.length === 0 ? r : { ...r, holds: false, problems: [...r.problems, ...extra] };
  });
  return [euler(plat), references(plat, ctx), ...batch];
}
