// Slot-free prints of an arena, a commit record and a batch's outcome (M0-d-08; §3.3 "No output depends on slot
// numbers", §13.1, §13.2): what the harnesses compare bit for bit. Every value is read through lattice positions,
// address ids, role names, levels and kinds — never a VertexId, HalfEdgeId, FaceId, role-row slot or interned handle —
// and every list is either canonical already (a role set in rule 7's order, a commit record's lists) or sorted here.
// The kernel's own choices among equivalent slots — a vertex's `out`, a face's stored `outer` half-edge, which half of
// a pair is even — are slot-like and left out: a renumbering moves them, and no output may read them.
import {
  dest,
  faceHoles,
  faceKey,
  faceWalk,
  H128,
  idOf,
  isFaceLive,
  isHalfEdgeLive,
  isVertexLive,
  LEVELS,
  recomputeLevelDigest,
  roleInfo,
  rowsOn,
  utf8Bytes,
  type CommitRecord,
  type Committed,
  type Hash128,
  type HalfEdgeId,
  type KernelResult,
  type Level,
  type Plat,
  type VertexId,
} from '@plat/kernel';

/** A Hash128 as 32 hex digits (words in order). */
export function hex128(h: Hash128): string {
  return h.map((w) => (w >>> 0).toString(16).padStart(8, '0')).join('');
}

/** H128 of a text's UTF-8 bytes, as hex. */
export function digestText(s: string): string {
  return hex128(H128(utf8Bytes(s)));
}

function pointText(p: Plat, v: VertexId): string {
  return `${p.vertices.x[v]},${p.vertices.y[v]}`;
}

/** The rows on an element in their stored set order (rule 7's order is itself part of what is compared). */
function rowsText(p: Plat, kind: 'edge' | 'vertex', element: number): string {
  const R = p.roles;
  return rowsOn(p, kind, element)
    .map((r) => `${roleInfo(R.kind[r]).name}/${idOf(p, R.entity[r])}/${R.level[r]}/${R.ordinal[r]}`)
    .join(';');
}

/** (y, x) order of two "x,y" points held as numbers. */
function lowerYX(ax: number, ay: number, bx: number, by: number): boolean {
  return ay < by || (ay === by && ax < bx);
}

/**
 * A ring of half-edges as its origins' points, rotated to start at its lowest-then-leftmost point; where the ring
 * visits that point more than once, the rotation whose text is smallest.
 */
export function ringText(p: Plat, ring: readonly HalfEdgeId[]): string {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  const n = ring.length;
  if (n === 0) return '';
  let best = O[ring[0]];
  for (const h of ring) {
    const v = O[h];
    if (lowerYX(X[v], Y[v], X[best], Y[best])) best = v;
  }
  const pts = ring.map((h) => `${X[O[h]]},${Y[O[h]]}`);
  let out: string | null = null;
  for (let i = 0; i < n; i++) {
    const v = O[ring[i]];
    if (X[v] !== X[best] || Y[v] !== Y[best]) continue;
    const t = pts.slice(i).concat(pts.slice(0, i)).join(' ');
    if (out === null || t < out) out = t;
  }
  return out ?? '';
}

/** A face record's own print: its rings at its level (outer first, holes sorted), kind, owner's id and stage rank. */
function faceText(p: Plat, level: Level, f: number): string {
  const rings = faceWalk(p, level, f).map((r) => ringText(p, r));
  const F = p.faces[level];
  const owner = F.owner[f] < 0 ? '-' : idOf(p, F.owner[f]);
  return `${rings[0]} | ${rings.slice(1).sort().join(' | ')} k${F.kind[f]} o${owner} s${F.stage[f]}`;
}

/**
 * The arena, slot-free: every live vertex (point, birth level, flags, rows), every live half-edge (its two ends, the
 * point its `next` leads to, its pair's level and rows), every live face record per level (its own print and its
 * parent's), and the version — one line each, sorted. Two arenas with equal prints hold the same geometry, topology,
 * levels, flags, rows, owners, kinds, stage ranks and nesting, whatever their slots.
 */
export function arenaPrint(p: Plat): string {
  const out: string[] = [];
  for (let v = 0; v < p.slots.vertex.top; v++) {
    if (!isVertexLive(p, v)) continue;
    out.push(`v ${pointText(p, v)} L${p.vertices.level[v]} f${p.vertices.flags[v]} [${rowsText(p, 'vertex', v)}]`);
  }
  const H = p.halfEdges;
  for (let h = 0; h < 2 * p.slots.pair.top; h++) {
    if (!isHalfEdgeLive(p, h)) continue;
    const nx = H.next[h];
    const nextTo = nx < 0 ? '-' : pointText(p, dest(p, nx));
    out.push(`h ${pointText(p, H.origin[h])}>${pointText(p, dest(p, h))} n${nextTo} L${H.level[h >> 1]} [${rowsText(p, 'edge', h)}]`);
  }
  for (const level of LEVELS) {
    for (let f = 0; f < p.slots.face[level].top; f++) {
      if (!isFaceLive(p, level, f)) continue;
      const par = p.faces[level].parent[f];
      const parent = level === 0 || par < 0 ? '-' : faceText(p, (level - 1) as Level, par);
      out.push(`f${level} ${faceText(p, level, f)} holes${faceHoles(p, level, f).length} p(${parent})`);
    }
  }
  out.sort();
  out.push(`#version ${p.version}`);
  return out.join('\n');
}

/** H128 of `arenaPrint`, as hex. */
export function arenaDigest(p: Plat): string {
  return digestText(arenaPrint(p));
}

/** The five per-level route digests (M0-d-04's `recomputeLevelDigest`, read from nothing), as hex. */
export function levelDigestsHex(p: Plat): string[] {
  return LEVELS.map((l) => hex128(recomputeLevelDigest(p, l)));
}

/** A face record named by its canonical key's two points (§3.3). */
function faceKeyText(p: Plat, level: Level, f: number): string {
  const [a, b] = faceKey(p, level, f);
  return `${pointText(p, a)}>${pointText(p, b)}`;
}

/** An edge pair named by its two ends, the lower (y, x) first. */
function pairText(p: Plat, h: HalfEdgeId): string {
  const a = p.halfEdges.origin[h];
  const b = dest(p, h);
  const X = p.vertices.x;
  const Y = p.vertices.y;
  return lowerYX(X[a], Y[a], X[b], Y[b]) ? `${pointText(p, a)}-${pointText(p, b)}` : `${pointText(p, b)}-${pointText(p, a)}`;
}

/**
 * A commit record read on the committed arena, slot-free: the dirty faces by their canonical keys in the record's own
 * order (removed records by count — their slots are dead), the counts and the work, the vertex lists as points in the
 * record's order, the demoted edges by their ends in the record's order (C-0185 (17); hardening round S1, N-2: no
 * longer sorted here, so a kernel that lists them in slot order is seen), the owners, role keys and warnings. The
 * record's lists are §3.3's canonical orders, so their order is compared too.
 */
export function recordPrint(p: Plat, r: CommitRecord): string {
  const live = (v: VertexId): string => (isVertexLive(p, v) ? pointText(p, v) : 'dead');
  return JSON.stringify({
    version: r.version,
    level: r.level,
    faces: r.faces.map((d) => ({
      l: d.level,
      c: d.created.map((f) => (isFaceLive(p, d.level, f) ? faceKeyText(p, d.level, f) : 'dead')),
      ch: d.changed.map((f) => (isFaceLive(p, d.level, f) ? faceKeyText(p, d.level, f) : 'dead')),
      r: d.removed.length,
    })),
    counts: [r.edgesAdded, r.edgesRemoved, r.steinerAdded, r.steinerDissolved, r.work],
    moved: r.moved.map(live),
    promoted: r.promoted.map(live),
    demoted: [r.demoted.vertices.map(live), r.demoted.edges.map((h) => (isHalfEdgeLive(p, h) ? pairText(p, h) : 'dead'))],
    unflagged: r.unflagged.map(live),
    owners: r.owners,
    roles: r.roles.map((k) => `${k.role}/${k.entity}/${k.ordinal}`),
    warnings: r.warnings.map((w) => `${w.code}×${w.count}`),
  });
}

/**
 * One batch's outcome, slot-free: a refusal by its code (a refusal's detail is diagnostic text that may name an op's
 * issue position or a slot, C-0199 (1)) and the arena it left (§2.2 rule 8: a refused batch leaves the arena at its
 * version — hardening round S1, N-8: compared here, so a refused last batch's arena is compared too), `nothing` and the
 * arena for a batch that wrote nothing, or the commit — the record, the five level digests and the arena print.
 */
export function outcomePrint(p: Plat, r: KernelResult<Committed<unknown>>): string {
  if (!r.ok) return `refused ${r.code}\n${arenaPrint(p)}`;
  if (r.value.record === null) return `nothing\n${arenaPrint(p)}`;
  return `commit ${recordPrint(p, r.value.record)}\n${levelDigestsHex(p).join(' ')}\n${arenaPrint(p)}`;
}

/** The first line where two prints differ, for a report: [line number, a's line, b's line]; null when equal. */
export function firstDifference(a: string, b: string): [number, string, string] | null {
  if (a === b) return null;
  const A = a.split('\n');
  const B = b.split('\n');
  const n = A.length > B.length ? A.length : B.length;
  for (let i = 0; i < n; i++) if (A[i] !== B[i]) return [i, A[i] ?? '(none)', B[i] ?? '(none)'];
  return [n, '(equal lines)', '(equal lines)'];
}
