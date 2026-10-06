// The refusal classifier of M0-a-09's tests (N-44 as amended by J203/J207/J208; C-0212 (10) as amended): a refusal of a
// band operation is insertChain's — counted against insertChain's measured cap, logged for the register, never gated
// here — only when it REPLAYS ON insertChain ALONE: the same chains, in the same order, fed straight to `insertChain` on
// a fresh arena, meet the same refusal (code and detail), and the chain refused is a well-formed input (a simple open
// chain or ring, no repeated point). Any other refusal is the item's own and is held to 1 per 10⁴ cases per operation.
//
// Two replays, one per place a band operation inserts:
//  - the scratch overlay (kerb's F − ⋃ buffer, tileRings' rings; M0-a-08's `buildOverlay`): a fresh L0 arena, the
//    frame 4096 cm beyond the inputs, then every distinct input segment as a two-point mandatory chain in input order —
//    `buildOverlay`'s insertion loop, written here from its contract (C-0196 (1)), with no arrangement code in it;
//  - the commit (corridorUnion at L2, bandUnion at L3): a fresh copy of the arena, every face's kerb read first, then
//    per face in canonical order its outline pieces and its corridor_split chains, each through `insertChain` directly.
import { compareFaces, createPlat, roleIdOf, type FaceId, type Plat } from '../../../src/arena/index.js';
import { attachIndex } from '../../../src/index/index.js';
import { insertChain, insertTx } from '../../../src/insert/index.js';
import { LATTICE, type KernelResult } from '../../../src/num/index.js';
import { tx, type KernelTx, type Overlay } from '../../../src/tx/index.js';
import type { Cm, LatticePoint, PlatKey } from '../../../src/types/index.js';
import { kerbParts, readFace, readKerb, type KerbRead, type SpineWidths } from '../../../src/arr/kerb.js';
import { onOutline, outlinePieces } from '../../../src/arr/bandUnion.js';
import { spec } from './support.js';

/** A refusal: its code and detail. */
export interface Refusal {
  readonly code: string;
  readonly detail: string;
}

/** What the replay found: the refusal insertChain alone meets, the chain it refused and whether that chain is well formed. */
export interface Replay extends Refusal {
  readonly where: 'overlay' | 'commit';
  readonly chain: LatticePoint[];
  readonly closed: boolean;
  readonly wellFormed: boolean;
}

/** The class a refusal falls in: insertChain's (it replays) or the item's own. */
export type RefusalClass = 'insertChain' | 'own';

/** Is the chain well formed: at least two points, no point repeated, no two non-adjacent segments meeting (exact)? */
export function wellFormed(pts: readonly LatticePoint[], closed: boolean): boolean {
  const n = pts.length;
  if (n < 2 || (closed && n < 3)) return false;
  if (new Set(pts.map((q) => `${String(q.x)},${String(q.y)}`)).size !== n) return false;
  const o = (a: LatticePoint, b: LatticePoint, c: LatticePoint): number => {
    const v = (BigInt(b.x) - BigInt(a.x)) * (BigInt(c.y) - BigInt(a.y)) - (BigInt(b.y) - BigInt(a.y)) * (BigInt(c.x) - BigInt(a.x));
    return v > 0n ? 1 : v < 0n ? -1 : 0;
  };
  const on = (a: LatticePoint, b: LatticePoint, c: LatticePoint): boolean =>
    Math.min(a.x, b.x) <= c.x && c.x <= Math.max(a.x, b.x) && Math.min(a.y, b.y) <= c.y && c.y <= Math.max(a.y, b.y);
  const meet = (p1: LatticePoint, p2: LatticePoint, q1: LatticePoint, q2: LatticePoint): boolean => {
    const d1 = o(q1, q2, p1);
    const d2 = o(q1, q2, p2);
    const d3 = o(p1, p2, q1);
    const d4 = o(p1, p2, q2);
    if (d1 * d2 < 0 && d3 * d4 < 0) return true;
    return (d1 === 0 && on(q1, q2, p1)) || (d2 === 0 && on(q1, q2, p2)) || (d3 === 0 && on(p1, p2, q1)) || (d4 === 0 && on(p1, p2, q2));
  };
  const segs = closed ? n : n - 1;
  for (let i = 0; i < segs; i += 1) {
    for (let j = i + 1; j < segs; j += 1) {
      if (j === i + 1 || (closed && i === 0 && j === segs - 1)) continue;
      if (meet(pts[i], pts[(i + 1) % n], pts[j], pts[(j + 1) % n])) return false;
    }
  }
  return true;
}

/** The ring without consecutive repeats (the closing repeat included) — the overlay's reading of a ring. */
function distinct(ring: readonly LatticePoint[]): LatticePoint[] {
  const out: LatticePoint[] = [];
  for (const q of ring) {
    const l = out[out.length - 1];
    if (l === undefined || l.x !== q.x || l.y !== q.y) out.push(q);
  }
  while (out.length > 1 && out[0].x === out[out.length - 1].x && out[0].y === out[out.length - 1].y) out.pop();
  return out;
}

/**
 * The scratch overlay's insertions on insertChain alone: a fresh L0 arena, its frame, every distinct segment of the
 * operands as a two-point mandatory chain in input order. The first refusal other than a segment's collapse, or null.
 */
export function replayOverlay(operands: readonly (readonly (readonly LatticePoint[])[])[]): Replay | null {
  const segs: [LatticePoint, LatticePoint][] = [];
  const seen = new Set<string>();
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const op of operands) {
    for (const ringIn of op) {
      const ring = distinct(ringIn);
      const n = ring.length;
      if (n < 2) continue;
      for (let i = 0; i < n; i += 1) {
        const a = ring[i];
        const b = ring[(i + 1) % n];
        minX = Math.min(minX, a.x);
        minY = Math.min(minY, a.y);
        maxX = Math.max(maxX, a.x);
        maxY = Math.max(maxY, a.y);
        const fw = a.x < b.x || (a.x === b.x && a.y < b.y);
        const k = fw ? `${String(a.x)},${String(a.y)},${String(b.x)},${String(b.y)}` : `${String(b.x)},${String(b.y)},${String(a.x)},${String(a.y)}`;
        if (seen.has(k)) continue;
        seen.add(k);
        segs.push([a, b]);
      }
    }
  }
  if (segs.length === 0) return null;
  const q = createPlat({ layer: 'ground', part: 0 } as PlatKey, { widthCm: (2 * LATTICE.rangeCm) as Cm, heightCm: (2 * LATTICE.rangeCm) as Cm, aspect: 1, marginShare: 0 });
  const area = (maxX - minX + 1) * (maxY - minY + 1);
  let cell = 64;
  while (cell < 1_048_576 && cell * cell * Math.max(1, segs.length) < area) cell *= 2;
  attachIndex(q, { gridCellCm: cell });
  const t = insertTx(q, 0);
  const lim = LATTICE.rangeCm - 1;
  const P = (x: number, y: number): LatticePoint => ({ x: x as Cm, y: y as Cm });
  const frame = [P(Math.max(-lim, minX - 4096), Math.max(-lim, minY - 4096)), P(Math.min(lim, maxX + 4096), Math.max(-lim, minY - 4096)), P(Math.min(lim, maxX + 4096), Math.min(lim, maxY + 4096)), P(Math.max(-lim, minX - 4096), Math.min(lim, maxY + 4096))];
  const f = insertChain(t, frame, [{ role: 'invisible', entity: 'arr:frame' }], 'mandatory', { closed: true });
  if (!f.ok) return { where: 'overlay', code: f.code, detail: f.detail, chain: frame, closed: true, wellFormed: true };
  for (let s = 0; s < segs.length; s += 1) {
    const [a, b] = segs[s];
    const r = insertChain(t, [a, b], [{ role: 'invisible', entity: `arr:s${String(s)}` }], 'mandatory');
    if (!r.ok && !(r.code === 'E_DEGENERATE' && r.detail === 'empty')) return { where: 'overlay', code: r.code, detail: r.detail, chain: [a, b], closed: false, wellFormed: wellFormed([a, b], false) };
  }
  return null;
}

/** kerb(F)'s overlay on insertChain alone: F's route rings, then its spines' buffer parts (kerb.ts's operands). */
export function replayKerb(p: Plat, face: FaceId, ws: SpineWidths): Replay | null {
  const f = readFace(p, face, ws);
  if (f.spines.size === 0) return null;
  const parts = kerbParts(f.rings, f.spines);
  if (!parts.ok || parts.value.length === 0) return null;
  return replayOverlay([f.rings, parts.value]);
}

/** tileRings' overlay on insertChain alone: every ring its own operand. */
export function replayTile(rings: readonly (readonly LatticePoint[])[]): Replay | null {
  return replayOverlay(rings.map((r) => [r]));
}

/** A band commit to replay: the arena builder (a fresh copy each call), the batch, the widths, the outline's row and entity. */
export interface CommitSpec {
  readonly build: () => { p: Plat; faces: FaceId[] };
  readonly level: 2 | 3;
  readonly over: Partial<KernelTx>;
  readonly widths: SpineWidths;
  readonly edgeRole: 'kerb' | 'band';
  readonly entityOf: (p: Plat, face: FaceId) => string;
}

/**
 * A band commit on insertChain alone: on a fresh copy of the arena, in a batch of the op's level, every face's kerb read
 * (a read's refusal replayed on its overlay), then per face in canonical order its outline pieces and its splits (the
 * ones the engine draws: their kerb point on the outline) — each through `insertChain` directly. The first refusal
 * other than a collapse, or null.
 */
export function replayCommit(c: CommitSpec): Replay | null {
  const { p, faces } = c.build();
  const unique = [...new Set(faces)].sort((a, b) => compareFaces(p, 1, a, b));
  const reads: KerbRead[] = [];
  for (const f of unique) {
    const r = readKerb(p, f, c.widths);
    if (!r.ok) return replayKerb(p, f, c.widths);
    reads.push(r.value);
  }
  let found: Replay | null = null;
  const outlineRole = roleIdOf(c.edgeRole);
  tx(p, spec(c.level, c.over), (o: Overlay): KernelResult<null> => {
    for (const read of reads) {
      if (read.spines.size === 0) continue;
      const entity = c.entityOf(p, read.face);
      for (const piece of outlinePieces(read)) {
        const ins = insertChain(o, piece.points, [{ role: c.edgeRole, entity }], 'mandatory', piece.closed ? { closed: true } : {});
        if (!ins.ok && !(ins.code === 'E_DEGENERATE' && ins.detail === 'empty')) {
          found = { where: 'commit', code: ins.code, detail: ins.detail, chain: piece.points, closed: piece.closed, wellFormed: wellFormed(distinct(piece.points), piece.closed) };
          return { ok: false, code: 'E_INVARIANT', detail: 'replay: stop' };
        }
      }
      for (const pts of read.splits) {
        if (!onOutline(p, p.key, pts[1], outlineRole)) continue;
        const ins = insertChain(o, pts, [{ role: 'corridor_split', entity }], 'mandatory');
        if (!ins.ok && !(ins.code === 'E_DEGENERATE' && ins.detail === 'empty')) {
          found = { where: 'commit', code: ins.code, detail: ins.detail, chain: pts, closed: false, wellFormed: wellFormed(pts, false) };
          return { ok: false, code: 'E_INVARIANT', detail: 'replay: stop' };
        }
      }
    }
    return { ok: false, code: 'E_INVARIANT', detail: 'replay: done' };
  });
  return found;
}

/**
 * The class of an operation's refusal: insertChain's when the replay meets the same code and detail on a well-formed
 * chain, else the item's own.
 */
export function classify(r: Refusal, replay: Replay | null): RefusalClass {
  return replay !== null && replay.code === r.code && replay.detail === r.detail && replay.wellFormed ? 'insertChain' : 'own';
}
