// Test support for M0-a-06's transactions: a transaction spec with the defaults a test changes one field of, a callback
// runner, a slot-free fingerprint of an arena and its index, and the oracles M0-a-04 / M0-a-05's tests judge an arena
// with (re-exported, read-only: §3.10's half-edge links, minEdge, one vertex per lattice point, no crossing, clearance,
// level consistency, the face records against the level views, nesting, Euler per level).
import { expect } from 'vitest';
import { handleOf, isVertexLive, outgoing, roleIdOf, rowElement, rowsOfKey, type HalfEdgeId, type Plat, type VertexId } from '../../src/arena/index.js';
import { checkIndexState } from '../../src/index/index.js';
import type { KernelResult } from '../../src/num/index.js';
import { tx, type Committed, type KernelOp, type KernelTx, type Overlay, type TxEnv } from '../../src/tx/index.js';
import type { Level, StageId } from '../../src/types/index.js';
import { allProblems, contentPrint, edgeRows, framed, halfEdgeBetween, ins, pt, tx as shell, vertexAtPoint } from '../insert/step3-5/support.js';

export { allProblems, contentPrint, edgeRows, framed, halfEdgeBetween, ins, pt, shell, vertexAtPoint };

/** The base's stages by their registry ids (C-0020's order: their ids are their §4.1 ranks at M0). */
export const S4 = 4 as StageId;
export const S5 = 5 as StageId;
export const S6 = 6 as StageId;
export const S8 = 8 as StageId;
export const S10 = 10 as StageId;

/** A spec at `level` with every other field defaulted: declared form, no expectation, reject, a large work limit. */
export function spec(level: Level, over: Partial<KernelTx> = {}): KernelTx {
  return {
    key: { layer: 'ground', part: 0 },
    level,
    ops: [],
    expect: [],
    onFail: 'reject',
    batch: { kind: 'stage', stage: over.stage ?? S8 },
    stage: S8,
    rederivesFrom: S8,
    workLimit: 1_000_000,
    ...over,
  };
}

/** A callback-form batch; throws on a refusal (for setup), returns the commit. */
export function commit<T>(p: Plat, level: Level, fn: (o: Overlay) => KernelResult<T>, over: Partial<KernelTx> = {}, env: TxEnv = {}): Committed<T> {
  const r = tx(p, spec(level, over), fn, env);
  if (!r.ok) throw new Error(`support: the batch was refused: ${r.code} ${r.detail}`);
  return r.value as Committed<T>;
}

/** A declared batch's result. */
export function declared(p: Plat, level: Level, ops: KernelOp[], over: Partial<KernelTx> = {}, env: TxEnv = {}): ReturnType<typeof tx> {
  return tx(p, spec(level, { ...over, ops }), undefined, env);
}

/** Unwraps an op's result inside a callback (a refusal there is a test's failure). */
export function must<T>(r: KernelResult<T>): T {
  if (!r.ok) throw new Error(`support: an op was refused: ${r.code} ${r.detail}`);
  return r.value;
}

/** The arena's content and index state, slot-free, plus its version: what a rejected batch must leave unchanged. */
export function state(p: Plat): string {
  return `${contentPrint(p)}\n#v${p.version}`;
}

/** Every oracle at once: the arena's validity (M0-a-04 / M0-a-05's) and the index state (M0-a-03's). */
export function healthy(p: Plat): void {
  expect(allProblems(p)).toEqual([]);
  expect(checkIndexState(p)).toEqual([]);
}

/** The vertices carrying a vertex row's key. */
export function carrying(p: Plat, role: string, entity: string, ordinal: number): VertexId[] {
  const h = handleOf(p, entity);
  if (h < 0) return [];
  return rowsOfKey(p, roleIdOf(role), h, ordinal).map((r) => rowElement(p, r));
}

/** The lattice point of the vertex carrying a vertex row's key, as "x,y" (or "" when none). */
export function pointOfKey(p: Plat, role: string, entity: string, ordinal: number): string {
  const vs = carrying(p, role, entity, ordinal);
  return vs.length === 1 ? `${p.vertices.x[vs[0]]},${p.vertices.y[vs[0]]}` : vs.length === 0 ? '' : `×${vs.length}`;
}

/** The half-edge leaving the vertex at a toward the vertex at b, asserted present. */
export function between(p: Plat, a: readonly [number, number], b: readonly [number, number]): HalfEdgeId {
  const h = halfEdgeBetween(p, a, b);
  if (h < 0) throw new Error(`support: no edge ${a} → ${b}`);
  return h;
}

/** The degree of the vertex at a lattice point (−1 when there is none). */
export function degreeAt(p: Plat, x: number, y: number): number {
  const v = vertexAtPoint(p, x, y);
  return v < 0 || !isVertexLive(p, v) ? -1 : outgoing(p, v).length;
}

/** A lineage key (Hash64, low word first) from a small number. */
export function lin(n: number, hi = 0): [number, number] {
  return [n >>> 0, hi >>> 0];
}
