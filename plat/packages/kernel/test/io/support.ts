// Test support for M0-a-15's arena block (kernel side): a strict slot-free print of an arena — every vertex (point,
// level, flags, rows in set order), every half-edge (its ends, where its `next` leads, its pair's level and rows), every
// face record per level (its rings at its level from their canonical start, holes sorted, kind, owner, stage, and its
// parent's print) — the round trip and its receipts, and random arenas from M0-a-06's batch generator. The print reads
// lattice points, levels, role names and address ids only, so two arenas print alike exactly when they hold the same
// geometry, topology, rotations, levels, flags, rows, owners, kinds, stage ranks and nesting, whatever their slots.
import { expect } from 'vitest';
import {
  dest,
  faceHoles,
  faceWalk,
  idOf,
  isFaceLive,
  isHalfEdgeLive,
  isVertexLive,
  LEVELS,
  roleInfo,
  rowsOn,
  type HalfEdgeId,
  type Plat,
  type VertexId,
} from '../../src/arena/index.js';
import { recomputeLevelDigest } from '../../src/digest/index.js';
import { hardProblems, checkCI } from '../../src/invariants/index.js';
import { compactSlots, decodeArena, encodeArena, type Chunk } from '../../src/io/index.js';
import { tx } from '../../src/tx/index.js';
import type { Level } from '../../src/types/index.js';
import { randomBatch, rng, type Live, type Mix } from '../tx/fuzzgen.js';
import { framed, spec } from '../tx/support.js';

export { framed };

/** The index's grid cells per level the kernel's fixtures use. */
export const CELLS: [number, number, number, number, number] = [800, 400, 200, 100, 50];

function pointText(p: Plat, v: VertexId): string {
  return `${p.vertices.x[v]},${p.vertices.y[v]}`;
}

function rowsText(p: Plat, kind: 'edge' | 'vertex', element: number): string {
  const R = p.roles;
  return rowsOn(p, kind, element).map((r) => `${roleInfo(R.kind[r]).name}/${idOf(p, R.entity[r])}/${R.level[r]}/${R.ordinal[r]}`).join(';');
}

/** A ring as its origins' points from its lowest-then-leftmost point (the smallest text where it visits it twice). */
export function ringText(p: Plat, ring: readonly HalfEdgeId[]): string {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  let best = O[ring[0]];
  for (const h of ring) {
    const v = O[h];
    if (Y[v] < Y[best] || (Y[v] === Y[best] && X[v] < X[best])) best = v;
  }
  const pts = ring.map((h) => pointText(p, O[h]));
  let out: string | null = null;
  for (let i = 0; i < ring.length; i++) {
    if (O[ring[i]] !== best) continue;
    const t = pts.slice(i).concat(pts.slice(0, i)).join(' ');
    if (out === null || t < out) out = t;
  }
  return out ?? '';
}

function faceText(p: Plat, level: Level, f: number): string {
  const rings = faceWalk(p, level, f).map((r) => ringText(p, r));
  const F = p.faces[level];
  return `${rings[0]} | ${rings.slice(1).sort().join(' | ')} k${F.kind[f]} o${F.owner[f] < 0 ? '-' : idOf(p, F.owner[f])} s${F.stage[f]}`;
}

/** The arena, slot-free, without its version (which a block does not store). */
export function print(p: Plat): string {
  const out: string[] = [];
  for (let v = 0; v < p.slots.vertex.top; v++) {
    if (isVertexLive(p, v)) out.push(`v ${pointText(p, v)} L${p.vertices.level[v]} f${p.vertices.flags[v]} [${rowsText(p, 'vertex', v)}]`);
  }
  const H = p.halfEdges;
  for (let h = 0; h < 2 * p.slots.pair.top; h++) {
    if (!isHalfEdgeLive(p, h)) continue;
    out.push(`h ${pointText(p, H.origin[h])}>${pointText(p, dest(p, h))} n${pointText(p, dest(p, H.next[h]))} p${pointText(p, H.origin[H.prev[h]])} L${H.level[h >> 1]} [${rowsText(p, 'edge', h)}]`);
  }
  for (const level of LEVELS) {
    for (let f = 0; f < p.slots.face[level].top; f++) {
      if (!isFaceLive(p, level, f)) continue;
      const par = p.faces[level].parent[f];
      const parent = level === 0 ? '-' : faceText(p, (level - 1) as Level, par);
      out.push(`f${level} ${faceText(p, level, f)} holes${faceHoles(p, level, f).length} p(${parent})`);
    }
  }
  return out.sort().join('\n');
}

/** The five per-level route digests recomputed from nothing (M0-d-04), as words. */
export function digests(p: Plat): number[][] {
  return LEVELS.map((l) => recomputeLevelDigest(p, l).map((w) => w >>> 0));
}

/** Are two chunk lists byte-identical, ref for ref? */
export function sameBlock(a: readonly Chunk[], b: readonly Chunk[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i].bytes.length !== b[i].bytes.length) return false;
    for (let k = 0; k < a[i].bytes.length; k++) if (a[i].bytes[k] !== b[i].bytes[k]) return false;
    for (let k = 0; k < 4; k++) if (a[i].ref[k] !== b[i].ref[k]) return false;
  }
  return true;
}

/** decodeArena's value, the test failing on a refusal. */
export function load(chunks: readonly Chunk[], p: Plat): Plat {
  const r = decodeArena(chunks, p.key, { index: { gridCellCm: CELLS } });
  if (!r.ok) throw new Error(`support: the block did not load: ${r.code} ${r.detail}`);
  return r.value;
}

/**
 * §13.1's round trip on one arena, with its receipts: save → load → save byte-identical, the loaded arena printing as
 * the original and passing every hard invariant (M0-a-14's CI sweep), its per-level digests equal; and the compacted
 * copy printing alike and saving to the same bytes. Returns the chunks and the loaded arena.
 */
export function roundTrip(p: Plat): { chunks: Chunk[]; loaded: Plat } {
  const chunks = encodeArena(p);
  const loaded = load(chunks, p);
  expect(sameBlock(encodeArena(loaded), chunks)).toBe(true);
  expect(print(loaded)).toBe(print(p));
  expect(digests(loaded)).toEqual(digests(p));
  expect(hardProblems(checkCI(loaded))).toEqual([]);
  const compact = compactSlots(p);
  expect(print(compact)).toBe(print(p));
  expect(sameBlock(encodeArena(compact), chunks)).toBe(true);
  return { chunks, loaded };
}

/** A random arena: `steps` batches of M0-a-06's generator on the framed square (refused batches leave nothing). */
export function randomArena(seed: number, steps: number, mix?: Mix): Plat {
  const r = rng(seed);
  const p = framed();
  const live: Live = { ways: [], kerbs: [], next: 0 };
  for (let i = 0; i < steps; i++) {
    const snapshot: Live = { ways: live.ways.slice(), kerbs: live.kerbs.slice(), next: live.next };
    const b = randomBatch(p, live, r, mix);
    const res = tx(p, spec(b.level, { rederivesFrom: 0 as never }), b.fn);
    if (!res.ok) {
      live.ways = snapshot.ways;
      live.kerbs = snapshot.kerbs;
    }
  }
  return p;
}
