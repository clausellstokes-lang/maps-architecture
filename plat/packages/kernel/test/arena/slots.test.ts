// M0-a-02: an empty arena from a Frame and the LatticeSpec (§2.2, §3.2 (1), (9)), slot allocation and free lists,
// growth by doubling that keeps every column's content, the face records' owner lists and hole runs, and the raw
// primitives' refusals (programming errors, in every build). N-53 (4) (C-0286): the tiny-tables mode (every table at
// capacity 1, the slot tables growing by one slot so every allocation replaces its table), growth-preserves-content
// against a roomy reference after every operation, the rotation across every growth, and the re-read rule's premise
// (a growth replaces the table, so a capture taken before it is dead).
import { afterEach, describe, expect, it } from 'vitest';
import { setTinyTables, tinyTables } from '../../src/arena/debug.js';
import { five } from '../../src/arena/plat.js';
import {
  addRole,
  allocEdgePair,
  allocFace,
  allocVertex,
  commitVersion,
  createPlat,
  dest,
  edgeLevel,
  faceHoles,
  facesOfOwner,
  faceWalk,
  FREE_KIND,
  freeEdgePair,
  freeFace,
  freeVertex,
  handleOfId,
  idOfHandle,
  intern,
  isFaceLive,
  isHalfEdgeLive,
  isPlatKey,
  isRoleRowLive,
  isVertexLive,
  LEVELS,
  ownerGet,
  pointOf,
  removeRoleRow,
  roleHeadGet,
  roleKeyWord,
  sameKey,
  setFaceHoles,
  setFaceOwner,
  twin,
  VERTEX_FREE,
  VERTEX_PINNED,
  VERTEX_SPLIT,
  VERTEX_STEINER,
  type Plat,
  type PlatCapacity,
} from '../../src/arena/index.js';
import { LATTICE } from '../../src/num/index.js';
import type { Layer, Level, PlatKey } from '../../src/types/index.js';
import { buildArena, FRAME, GROUND, pt, QUARTERS, ringText, rng } from './support.js';
import { TINY_TABLES } from './tiny.js';

function square(p: Plat, x0: number, y0: number, s: number): number[] {
  const v = [pt(x0, y0), pt(x0 + s, y0), pt(x0 + s, y0 + s), pt(x0, y0 + s)].map((q) => allocVertex(p, q, 0));
  return v.map((a, i) => allocEdgePair(p, a, v[(i + 1) % 4], 0));
}

describe('createPlat (§2.2, §3.2)', () => {
  it('makes an empty arena: its key and frame copied, the fixed lattice, version 0, no live slot, every table typed', () => {
    const key: PlatKey = { layer: 'underground', part: 3 };
    const p = createPlat(key, FRAME);
    expect(p.key).toEqual(key);
    expect(p.key).not.toBe(key);
    expect(p.frame).toEqual(FRAME);
    expect(p.frame).not.toBe(FRAME);
    expect(p.lattice).toBe(LATTICE);
    expect(p.lattice).toEqual({ unitCm: 1, minEdgeCm: 25, attractCm: 26, minFaceAngleCdeg: 500, rangeCm: 8_388_608 });
    expect(p.version).toBe(0);
    expect(p.faces).toHaveLength(5);
    expect(p.indexHome.face).toHaveLength(5);
    expect([p.slots.vertex.live, p.slots.pair.live, p.slots.role.live, ...p.slots.face.map((s) => s.live)]).toEqual([0, 0, 0, 0, 0, 0, 0, 0]);
    expect(p.vertices.x).toBeInstanceOf(Int32Array);
    expect(p.vertices.level).toBeInstanceOf(Uint8Array);
    expect(p.halfEdges.level.length * 2).toBe(p.halfEdges.origin.length);
    expect(p.roles.kind).toBeInstanceOf(Uint16Array);
    expect(p.roles.ordinal).toBeInstanceOf(Uint16Array);
    expect(p.faces[0].stage).toBeInstanceOf(Uint8Array);
    expect(p.indexHome.vertex).toBeInstanceOf(Int16Array);
    expect(isVertexLive(p, 0)).toBe(false);
    expect(LEVELS).toEqual([0, 1, 2, 3, 4]);
  });

  it('refuses a malformed key or frame', () => {
    for (const key of [{ layer: 'air' as Layer, part: 0 }, { layer: 'ground' as Layer, part: -1 }, { layer: 'sky' as Layer, part: 1.5 }]) {
      expect(isPlatKey(key)).toBe(false);
      expect(() => createPlat(key, FRAME)).toThrow(/PlatKey/);
    }
    expect(() => createPlat(GROUND, { ...FRAME, widthCm: 0 as never })).toThrow(/sides/);
    expect(() => createPlat(GROUND, { ...FRAME, heightCm: 10.5 as never })).toThrow(/sides/);
    expect(() => createPlat(GROUND, { ...FRAME, aspect: 2.5 })).toThrow(/aspect/);
    expect(() => createPlat(GROUND, { ...FRAME, marginShare: Number.NaN })).toThrow(/margin/);
    expect(() => createPlat(GROUND, FRAME, { vertices: 0 })).toThrow(/capacity.vertices/);
    expect(sameKey(GROUND, { layer: 'ground', part: 0 })).toBe(true);
    expect(sameKey(GROUND, { layer: 'ground', part: 1 })).toBe(false);
    expect(sameKey(GROUND, { layer: 'sky', part: 0 })).toBe(false);
  });

  it('keeps the frame replaceable (the growth hook, M4) and the lattice fixed', () => {
    const p = createPlat(GROUND, FRAME);
    p.frame = { ...FRAME, widthCm: (FRAME.widthCm * 2) as never };
    expect(p.frame.widthCm).toBe(FRAME.widthCm * 2);
    expect(p.lattice).toBe(LATTICE);
  });

  it('bumps the version per commit', () => {
    const p = createPlat(GROUND, FRAME);
    expect(commitVersion(p)).toBe(1);
    expect(commitVersion(p)).toBe(2);
    expect(p.version).toBe(2);
  });
});

describe('slots and free lists', () => {
  it('allocates vertices above the high-water mark, reuses freed slots last-freed first, and keeps their columns', () => {
    const p = createPlat(GROUND, FRAME);
    const a = allocVertex(p, pt(10, 20), 1, VERTEX_PINNED | VERTEX_SPLIT);
    const b = allocVertex(p, pt(-30, 40), 3, VERTEX_STEINER);
    const c = allocVertex(p, pt(50, -60), 0);
    expect([a, b, c]).toEqual([0, 1, 2]);
    expect(pointOf(p, b)).toEqual(pt(-30, 40));
    expect([p.vertices.level[a], p.vertices.flags[a], p.vertices.flags[b], p.vertices.out[c]]).toEqual([1, VERTEX_PINNED | VERTEX_SPLIT, VERTEX_STEINER, -1]);
    freeVertex(p, a);
    freeVertex(p, c);
    expect(isVertexLive(p, a)).toBe(false);
    expect(p.vertices.flags[a] & VERTEX_FREE).toBe(VERTEX_FREE);
    expect(p.slots.vertex.live).toBe(1);
    expect(allocVertex(p, pt(1, 1), 2)).toBe(c);
    expect(allocVertex(p, pt(2, 2), 2)).toBe(a);
    expect(allocVertex(p, pt(3, 3), 2)).toBe(3);
    expect(p.vertices.flags[a]).toBe(0);
    expect(p.slots.vertex).toEqual({ top: 4, free: -1, live: 4 });
  });

  it('allocates edge pairs (twin = h ^ 1) and reuses freed ones; origin −1 marks a free pair', () => {
    const p = createPlat(GROUND, FRAME);
    const v = [pt(0, 0), pt(100, 0), pt(100, 100)].map((q) => allocVertex(p, q, 0));
    const h0 = allocEdgePair(p, v[0], v[1], 0);
    const h1 = allocEdgePair(p, v[1], v[2], 2);
    expect([h0, h1]).toEqual([0, 2]);
    expect([p.halfEdges.origin[h0], dest(p, h0), p.halfEdges.origin[twin(h0)], twin(h1)]).toEqual([v[0], v[1], v[1], 3]);
    expect([edgeLevel(p, h1), edgeLevel(p, twin(h1)), p.halfEdges.next[h1], p.halfEdges.prev[h1]]).toEqual([2, 2, -1, -1]);
    freeEdgePair(p, twin(h0));
    expect(isHalfEdgeLive(p, h0)).toBe(false);
    expect(isHalfEdgeLive(p, h0 + 1)).toBe(false);
    expect([p.halfEdges.origin[0], p.halfEdges.origin[1]]).toEqual([-1, -1]);
    expect(allocEdgePair(p, v[2], v[0], 1)).toBe(h0);
    expect(p.slots.pair).toEqual({ top: 2, free: -1, live: 2 });
    expect(() => allocEdgePair(p, v[0], v[0], 0)).toThrow(/distinct/);
    expect(() => allocEdgePair(p, v[0], 99, 0)).toThrow(/live vertices/);
  });

  it('grows every column by doubling and keeps what it held (vertices, pairs, faces, rows, the index home)', () => {
    const p = createPlat(GROUND, FRAME, { vertices: 1, edgePairs: 1, faces: 1, roleRows: 1, handles: 1, idUnits: 1, holes: 1 });
    const n = 300;
    const vs: number[] = [];
    for (let i = 0; i < n; i++) vs.push(allocVertex(p, pt(i * 30, (i * 7) % 50), (i % 5) as 0, i % 4));
    const hs: number[] = [];
    for (let i = 0; i + 1 < n; i++) hs.push(allocEdgePair(p, vs[i], vs[i + 1], (i % 5) as 0));
    for (let i = 0; i < hs.length; i++) addRole(p, hs[i], { role: 'way', entity: `way:${i % 17}` }, 0);
    for (let i = 0; i < 40; i++) allocFace(p, 0, { outer: hs[5 * i], kind: i, owner: intern(p, `district:${i % 3}`), stage: i, parent: -1 });
    expect(p.vertices.x.length).toBeGreaterThanOrEqual(n);
    expect(p.roles.vertexFirst.length).toBe(p.vertices.x.length);
    expect(p.indexHome.vertex.length).toBe(p.vertices.x.length);
    expect(p.roles.edgeFirst.length).toBe(p.halfEdges.level.length);
    expect(p.indexHome.edge.length).toBe(p.halfEdges.level.length);
    expect(p.indexHome.face[0].length).toBe(p.faces[0].outer.length);
    for (let i = 0; i < n; i++) {
      expect(pointOf(p, vs[i])).toEqual(pt(i * 30, (i * 7) % 50));
      expect([p.vertices.level[vs[i]], p.vertices.flags[vs[i]], p.vertices.out[vs[i]], p.indexHome.vertex[vs[i]]]).toEqual([i % 5, i % 4, -1, -1]);
    }
    for (let i = 0; i < hs.length; i++) {
      expect([p.halfEdges.origin[hs[i]], dest(p, hs[i]), edgeLevel(p, hs[i])]).toEqual([vs[i], vs[i + 1], i % 5]);
      expect(p.roles.entity[p.roles.edgeFirst[hs[i] >> 1]]).toBe(intern(p, `way:${i % 17}`));
    }
    for (let i = 0; i < 40; i++) expect([p.faces[0].outer[i], p.faces[0].kind[i], p.faces[0].stage[i]]).toEqual([hs[5 * i], i, i]);
    // fresh slots above the old high-water marks are free / empty
    expect(p.vertices.flags[p.vertices.x.length - 1]).toBe(VERTEX_FREE);
    expect(p.halfEdges.origin[p.halfEdges.origin.length - 1]).toBe(-1);
    expect(p.faces[0].kind[p.faces[0].kind.length - 1]).toBe(FREE_KIND);
    expect(p.roles.kind[p.roles.kind.length - 1]).toBe(FREE_KIND);
  });

  it('refuses what a raw primitive cannot store: a coordinate outside the lattice range or not an integer, a bad level or flag, freeing twice or with rows left', () => {
    const p = createPlat(GROUND, FRAME);
    expect(() => allocVertex(p, pt(8_388_608, 0), 0)).toThrow(/lattice point/);
    expect(() => allocVertex(p, pt(0, -8_388_608), 0)).toThrow(/lattice point/);
    expect(() => allocVertex(p, pt(0.5, 0), 0)).toThrow(/lattice point/);
    expect(() => allocVertex(p, pt(0, 0), 5 as 0)).toThrow(/birth level/);
    expect(() => allocVertex(p, pt(0, 0), 0, VERTEX_FREE)).toThrow(/flags/);
    expect(allocVertex(p, pt(8_388_607, -8_388_607), 0)).toBe(0);
    const a = allocVertex(p, pt(1, 1), 0);
    addRole(p, a, { role: 'junction', entity: 'junction:1' }, 1);
    expect(() => freeVertex(p, a)).toThrow(/role rows/);
    freeVertex(p, 0);
    expect(() => freeVertex(p, 0)).toThrow(/not live/);
    const b = allocVertex(p, pt(50, 1), 0);
    const h = allocEdgePair(p, a, b, 0);
    addRole(p, h, { role: 'kerb', entity: 'block:1' }, 2);
    expect(() => freeEdgePair(p, h)).toThrow(/role rows/);
  });
});

describe('face records', () => {
  it('links faces into their owner\'s list per level, re-links on a new owner, unlinks when freed, and reuses the slot', () => {
    const p = createPlat(GROUND, FRAME);
    const hs = square(p, 0, 0, 100);
    const d1 = intern(p, 'district:1');
    const d2 = intern(p, 'district:2');
    const f0 = allocFace(p, 0, { outer: hs[0], kind: 1, owner: d1, stage: 0, parent: -1 });
    const f1 = allocFace(p, 0, { outer: hs[1], kind: 1, owner: d1, stage: 0, parent: -1 });
    const f2 = allocFace(p, 0, { outer: hs[2], kind: 1, owner: d2, stage: 0, parent: -1 });
    const g = allocFace(p, 1, { outer: hs[3], kind: 2, owner: d1, stage: 3, parent: f0 });
    expect(facesOfOwner(p, 0, d1).sort()).toEqual([f0, f1]);
    expect(facesOfOwner(p, 0, d2)).toEqual([f2]);
    expect(facesOfOwner(p, 1, d1)).toEqual([g]);
    expect(facesOfOwner(p, 1, d2)).toEqual([]);
    expect(facesOfOwner(p, 0, -1)).toEqual([]);
    setFaceOwner(p, 0, f0, d2);
    expect(facesOfOwner(p, 0, d1)).toEqual([f1]);
    expect(facesOfOwner(p, 0, d2).sort()).toEqual([f0, f2]);
    setFaceOwner(p, 0, f2, d2); // unchanged
    setFaceOwner(p, 0, f2, -1);
    expect(facesOfOwner(p, 0, d2)).toEqual([f0]);
    expect(p.faces[0].owner[f2]).toBe(-1);
    // remove the last face of an owner: the owner leaves the table
    setFaceOwner(p, 0, f1, -1);
    expect(p.faces[0].ownerHead.count).toBe(1);
    freeFace(p, 0, f0);
    expect(isFaceLive(p, 0, f0)).toBe(false);
    expect(p.faces[0].ownerHead.count).toBe(0);
    expect(facesOfOwner(p, 0, d2)).toEqual([]);
    expect(allocFace(p, 0, { outer: hs[0], kind: 5, owner: d1, stage: 1, parent: -1 })).toBe(f0);
    expect(() => freeFace(p, 0, 99)).toThrow(/not live/);
  });

  it('unlinks a face from the middle of its owner\'s list', () => {
    const p = createPlat(GROUND, FRAME);
    const hs = square(p, 0, 0, 100);
    const d = intern(p, 'block:9');
    const fs = hs.map((h) => allocFace(p, 0, { outer: h, kind: 0, owner: d, stage: 0, parent: -1 }));
    // prepended: the list runs newest first
    expect(facesOfOwner(p, 0, d)).toEqual([fs[3], fs[2], fs[1], fs[0]]);
    setFaceOwner(p, 0, fs[2], -1);
    expect(facesOfOwner(p, 0, d)).toEqual([fs[3], fs[1], fs[0]]);
    freeFace(p, 0, fs[1]);
    expect(facesOfOwner(p, 0, d)).toEqual([fs[3], fs[0]]);
    freeFace(p, 0, fs[0]);
    expect(facesOfOwner(p, 0, d)).toEqual([fs[3]]);
    expect(p.faces[0].ownerHead.count).toBe(1);
  });

  it('checks a face record\'s fields: a live outer half-edge of its level or coarser, a u16 kind, a u8 stage, an interned owner, a parent one level up', () => {
    const p = createPlat(GROUND, FRAME);
    const hs = square(p, 0, 0, 100);
    const fine = allocEdgePair(p, p.halfEdges.origin[hs[0]], p.halfEdges.origin[hs[2]], 3);
    const f0 = allocFace(p, 0, { outer: hs[0], kind: 0, owner: -1, stage: 0, parent: -1 });
    expect(() => allocFace(p, 2, { outer: fine, kind: 0, owner: -1, stage: 0, parent: -1 })).toThrow(/outer half-edge/);
    expect(() => allocFace(p, 0, { outer: 99, kind: 0, owner: -1, stage: 0, parent: -1 })).toThrow(/outer half-edge/);
    expect(() => allocFace(p, 0, { outer: hs[0], kind: FREE_KIND, owner: -1, stage: 0, parent: -1 })).toThrow(/kind/);
    expect(() => allocFace(p, 0, { outer: hs[0], kind: 0, owner: -1, stage: 256, parent: -1 })).toThrow(/stage/);
    expect(() => allocFace(p, 0, { outer: hs[0], kind: 0, owner: 7, stage: 0, parent: -1 })).toThrow(/owner/);
    expect(() => allocFace(p, 0, { outer: hs[0], kind: 0, owner: -1, stage: 0, parent: f0 })).toThrow(/no parent/);
    expect(() => allocFace(p, 1, { outer: hs[0], kind: 0, owner: -1, stage: 0, parent: -1 })).toThrow(/parent/);
    expect(() => allocFace(p, 2, { outer: hs[0], kind: 0, owner: -1, stage: 0, parent: f0 })).toThrow(/parent/);
    const f1 = allocFace(p, 1, { outer: hs[0], kind: 0, owner: -1, stage: 0, parent: f0 });
    expect(allocFace(p, 2, { outer: hs[0], kind: 0, owner: -1, stage: 0, parent: f1 })).toBe(0);
    expect(() => setFaceOwner(p, 0, f0, 5)).toThrow(/owner/);
  });

  it('stores hole runs per face, replaces and clears them, and compacts the pool when it fills', () => {
    const p = createPlat(GROUND, FRAME, { holes: 4 });
    const hs = square(p, 0, 0, 1000);
    const inner = [square(p, 100, 100, 100), square(p, 300, 100, 100), square(p, 500, 100, 100)];
    const f = allocFace(p, 0, { outer: hs[0], kind: 0, owner: -1, stage: 0, parent: -1 });
    const g = allocFace(p, 0, { outer: hs[1], kind: 0, owner: -1, stage: 0, parent: -1 });
    expect(faceHoles(p, 0, f)).toEqual([]);
    setFaceHoles(p, 0, f, [inner[0][0], inner[1][0]]);
    setFaceHoles(p, 0, g, [inner[2][0]]);
    expect(faceHoles(p, 0, f)).toEqual([inner[0][0], inner[1][0]]);
    expect(faceHoles(p, 0, g)).toEqual([inner[2][0]]);
    for (let k = 0; k < 20; k++) {
      setFaceHoles(p, 0, f, k % 2 === 0 ? [inner[1][1]] : [inner[0][2], inner[2][3], inner[1][0]]);
      expect(faceHoles(p, 0, g)).toEqual([inner[2][0]]);
    }
    expect(faceHoles(p, 0, f)).toEqual([inner[0][2], inner[2][3], inner[1][0]]);
    expect(p.faces[0].holes.length).toBeLessThanOrEqual(16); // compaction, not unbounded growth
    setFaceHoles(p, 0, f, []);
    expect(faceHoles(p, 0, f)).toEqual([]);
    expect(p.faces[0].holesStart[f]).toBe(-1);
    expect(() => setFaceHoles(p, 0, f, [999])).toThrow(/hole half-edge/);
    freeFace(p, 0, g);
    expect(() => faceHoles(p, 0, g)).toThrow(/not live/);
  });
});

// ---- N-53 (4): the tiny-tables mode and growth that preserves content ----------------------------------------------

/** Runs `f` with the tiny-tables mode set to `on`, then restores the process's mode (PLAT_TINY_TABLES, ./tiny.ts). */
function withTiny<T>(on: boolean, f: () => T): T {
  setTinyTables(on);
  try {
    return f();
  } finally {
    setTinyTables(TINY_TABLES);
  }
}

/** Every table's capacity, by name: a column's slots (a half-edge column counts pairs), a hash table's slots. */
function capacities(p: Plat): Record<string, number> {
  const c: Record<string, number> = {
    'vertices.x': p.vertices.x.length, 'vertices.y': p.vertices.y.length, 'vertices.out': p.vertices.out.length,
    'vertices.level': p.vertices.level.length, 'vertices.flags': p.vertices.flags.length,
    'halfEdges.origin/2': p.halfEdges.origin.length / 2, 'halfEdges.next/2': p.halfEdges.next.length / 2,
    'halfEdges.prev/2': p.halfEdges.prev.length / 2, 'halfEdges.level': p.halfEdges.level.length,
    'roles.edgeFirst': p.roles.edgeFirst.length, 'roles.vertexFirst': p.roles.vertexFirst.length,
    'roles.kind': p.roles.kind.length, 'roles.entity': p.roles.entity.length, 'roles.level': p.roles.level.length,
    'roles.ordinal': p.roles.ordinal.length, 'roles.nextInSet': p.roles.nextInSet.length,
    'roles.nextSameKey': p.roles.nextSameKey.length,
    'roles.head.k0': p.roles.head.k0.length, 'roles.head.k1': p.roles.head.k1.length, 'roles.head.first': p.roles.head.first.length,
    'indexHome.vertex': p.indexHome.vertex.length, 'indexHome.edge': p.indexHome.edge.length,
    'handles.units': p.handles.units.length, 'handles.start-1': p.handles.start.length - 1,
    'handles.hash': p.handles.hash.length, 'handles.slots': p.handles.slots.length,
  };
  for (const l of LEVELS) {
    const f = p.faces[l];
    Object.assign(c, {
      [`faces[${l}].outer`]: f.outer.length, [`faces[${l}].holesStart`]: f.holesStart.length, [`faces[${l}].holes`]: f.holes.length,
      [`faces[${l}].kind`]: f.kind.length, [`faces[${l}].owner`]: f.owner.length, [`faces[${l}].parent`]: f.parent.length,
      [`faces[${l}].stage`]: f.stage.length, [`faces[${l}].nextOfOwner`]: f.nextOfOwner.length,
      [`faces[${l}].ownerHead.owner`]: f.ownerHead.owner.length, [`faces[${l}].ownerHead.head`]: f.ownerHead.head.length,
      [`indexHome.face[${l}]`]: p.indexHome.face[l].length,
    });
  }
  return c;
}

/**
 * The arena's content as one list of numbers, independent of capacity: every slot below each high-water mark with
 * every column it has, the free lists and live counts, every live face's hole rings (the pool's layout, which
 * compaction moves, aside), every role row, every interned id, and every lookup the hash tables answer — the role
 * heads of every key a row ever carried and every handle's owner head at every level.
 */
function content(p: Plat, keys: readonly (readonly [number, number])[]): number[] {
  const o: number[] = [];
  const s = p.slots;
  o.push(s.vertex.top, s.vertex.free, s.vertex.live, s.pair.top, s.pair.free, s.pair.live, s.role.top, s.role.free, s.role.live);
  for (const l of LEVELS) o.push(s.face[l].top, s.face[l].free, s.face[l].live);
  const V = p.vertices;
  for (let v = 0; v < s.vertex.top; v++) o.push(V.x[v], V.y[v], V.out[v], V.level[v], V.flags[v], p.roles.vertexFirst[v], p.indexHome.vertex[v]);
  const H = p.halfEdges;
  for (let e = 0; e < s.pair.top; e++) {
    o.push(H.origin[2 * e], H.origin[2 * e + 1], H.next[2 * e], H.next[2 * e + 1], H.prev[2 * e], H.prev[2 * e + 1], H.level[e]);
    o.push(p.roles.edgeFirst[e], p.indexHome.edge[e]);
  }
  const R = p.roles;
  for (let r = 0; r < s.role.top; r++) o.push(R.kind[r], R.entity[r], R.level[r], R.ordinal[r], R.nextInSet[r], R.nextSameKey[r]);
  o.push(R.head.count);
  for (const [k0, k1] of keys) o.push(roleHeadGet(R.head, k0, k1));
  o.push(p.handles.count);
  for (let h = 0; h < p.handles.count; h++) {
    const id = idOfHandle(p.handles, h);
    o.push(id.length, handleOfId(p.handles, id));
    for (let i = 0; i < id.length; i++) o.push(id.charCodeAt(i));
  }
  for (const l of LEVELS) {
    const F = p.faces[l];
    for (let f = 0; f < s.face[l].top; f++) {
      o.push(F.outer[f], F.kind[f], F.owner[f], F.parent[f], F.stage[f], F.nextOfOwner[f], p.indexHome.face[l][f]);
      if (F.kind[f] !== FREE_KIND) {
        const holes = faceHoles(p, l, f);
        o.push(holes.length, ...holes);
      }
    }
    o.push(F.ownerHead.count);
    for (let h = 0; h < p.handles.count; h++) o.push(ownerGet(F.ownerHead, h));
  }
  return o;
}

/** The first index where two content lists differ, or −1. */
function firstDifference(a: readonly number[], b: readonly number[]): number {
  const n = a.length < b.length ? a.length : b.length;
  for (let i = 0; i < n; i++) if (a[i] !== b[i]) return i;
  return a.length === b.length ? -1 : n;
}

const EDGE_ROLES = ['way', 'kerb', 'plot_line', 'frontage'] as const;

/**
 * One seeded operation sequence over the raw primitives — allocate and free vertices and edge pairs (each new pair
 * linked as a dangling edge and made its origin's `out`, by a writer that re-reads the tables after the allocation),
 * add and remove role rows (edge rows, indexed `gate_opening` rows, vertex `junction` rows), allocate, re-own and free
 * faces at every level, set and clear hole rings, intern ids — applied to every arena of `ps` alike; `check` runs
 * after every operation. Every slot an operation returns must agree across the arenas.
 */
function drive(ps: readonly Plat[], seed: number, ops: number, check: (op: number, keys: readonly (readonly [number, number])[]) => void): void {
  const rnd = rng(seed);
  const int = (n: number): number => Math.floor(rnd() * n);
  const p0 = ps[0];
  const keys: [number, number][] = [];
  const keySeen = new Set<string>();
  const noteKey = (r: number): void => {
    const k0 = p0.roles.entity[r];
    const k1 = roleKeyWord(p0.roles.kind[r], p0.roles.ordinal[r]);
    if (!keySeen.has(`${k0}:${k1}`)) {
      keySeen.add(`${k0}:${k1}`);
      keys.push([k0, k1]);
    }
  };
  const same = (got: number[]): number => {
    for (const g of got) expect(g).toBe(got[0]);
    return got[0];
  };
  const verts: number[] = []; // live vertices
  const pairs: number[] = []; // live even half-edges
  const degree = new Map<number, number>();
  const faces: number[][] = [[], [], [], [], []];
  const rows: number[] = [];
  for (let op = 0; op < ops; op++) {
    const k = int(100);
    if (k < 22 || verts.length < 2) {
      const at = pt(int(2_000_001) - 1_000_000, int(2_000_001) - 1_000_000);
      const level = int(5) as Level;
      const flags = int(8);
      const v = same(ps.map((p) => allocVertex(p, at, level, flags)));
      verts.push(v);
      degree.set(v, 0);
    } else if (k < 25) {
      const free = verts.filter((v) => degree.get(v) === 0 && ps[0].roles.vertexFirst[v] === -1);
      if (free.length > 0) {
        const v = free[int(free.length)];
        for (const p of ps) freeVertex(p, v);
        verts.splice(verts.indexOf(v), 1);
        degree.delete(v);
      }
    } else if (k < 47) {
      const a = verts[int(verts.length)];
      let b = verts[int(verts.length)];
      if (b === a) b = verts[(verts.indexOf(a) + 1) % verts.length];
      const level = int(5) as Level;
      const h = same(ps.map((p) => {
        const g = allocEdgePair(p, a, b, level);
        const T = p.halfEdges; // read after the allocation (the re-read rule)
        T.next[g] = g ^ 1;
        T.next[g ^ 1] = g;
        T.prev[g] = g ^ 1;
        T.prev[g ^ 1] = g;
        if (p.vertices.out[a] === -1) p.vertices.out[a] = g;
        if (p.vertices.out[b] === -1) p.vertices.out[b] = g ^ 1;
        return g;
      }));
      pairs.push(h);
      degree.set(a, (degree.get(a) ?? 0) + 1);
      degree.set(b, (degree.get(b) ?? 0) + 1);
    } else if (k < 50) {
      const bare = pairs.filter((h) => ps[0].roles.edgeFirst[h >> 1] === -1);
      if (bare.length > 0) {
        const h = bare[int(bare.length)];
        const a = ps[0].halfEdges.origin[h];
        const b = ps[0].halfEdges.origin[h ^ 1];
        for (const p of ps) {
          if (p.vertices.out[a] === h) p.vertices.out[a] = -1;
          if (p.vertices.out[b] === (h ^ 1)) p.vertices.out[b] = -1;
          freeEdgePair(p, h);
        }
        pairs.splice(pairs.indexOf(h), 1);
        degree.set(a, (degree.get(a) ?? 1) - 1);
        degree.set(b, (degree.get(b) ?? 1) - 1);
      }
    } else if (k < 68) {
      // a role row: on an edge (a plain or an indexed role) or on a vertex
      const which = int(3);
      const element = which < 2 ? pairs[int(Math.max(pairs.length, 1))] : verts[int(verts.length)];
      if (element !== undefined) {
        const row = which === 0
          ? { role: EDGE_ROLES[int(EDGE_ROLES.length)], entity: `way:${int(90)}` }
          : which === 1
            ? { role: 'gate_opening', entity: `wall:${int(6)}`, ordinal: int(40) }
            : { role: 'junction', entity: `junction:${int(70)}` };
        const level = int(5) as Level;
        let r = -1;
        try {
          r = same(ps.map((p) => addRole(p, element, row, level)));
        } catch (err) {
          // a key the element already carries is refused in every arena alike, before any write
          expect(String(err)).toMatch(/already carries/);
          for (const p of ps.slice(1)) expect(() => addRole(p, element, row, level)).toThrow(/already carries/);
        }
        if (r !== -1) {
          rows.push(r);
          noteKey(r);
        }
      }
    } else if (k < 75) {
      if (rows.length > 0) {
        const r = rows[int(rows.length)];
        for (const p of ps) removeRoleRow(p, r);
        rows.splice(rows.indexOf(r), 1);
      }
    } else if (k < 88) {
      const level = int(5) as Level;
      const outers = pairs.filter((h) => ps[0].halfEdges.level[h >> 1] <= level);
      const parents = level === 0 ? [-1] : faces[level - 1];
      if (outers.length > 0 && parents.length > 0) {
        const id = `district:${op % 97}`;
        const owner = int(3) === 0 ? -1 : same(ps.map((p) => intern(p, id)));
        const init = { outer: outers[int(outers.length)], kind: int(50), owner, stage: int(256), parent: parents[int(parents.length)] };
        const f = same(ps.map((p) => allocFace(p, level, init)));
        faces[level].push(f);
      }
    } else if (k < 92) {
      const level = int(5) as Level;
      if (faces[level].length > 0) {
        const f = faces[level][int(faces[level].length)];
        const id = `block:${int(120)}`;
        const owner = int(4) === 0 ? -1 : same(ps.map((p) => intern(p, id)));
        for (const p of ps) setFaceOwner(p, level, f, owner);
      }
    } else if (k < 97) {
      const level = int(5) as Level;
      const ok = pairs.filter((h) => ps[0].halfEdges.level[h >> 1] <= level);
      if (faces[level].length > 0) {
        const f = faces[level][int(faces[level].length)];
        const n = ok.length === 0 ? 0 : int(4);
        const holes = Array.from({ length: n }, () => ok[int(ok.length)] ^ int(2));
        for (const p of ps) setFaceHoles(p, level, f, holes);
      }
    } else {
      const level = int(5) as Level;
      if (faces[level].length > 0) {
        const f = faces[level][int(faces[level].length)];
        for (const p of ps) freeFace(p, level, f);
        faces[level].splice(faces[level].indexOf(f), 1);
      }
    }
    check(op, keys);
  }
  for (const r of rows) expect(ps.every((p) => isRoleRowLive(p, r))).toBe(true);
}

/** A roomy arena: every table sized past what the sequences below reach, so it never grows. */
const ROOMY: PlatCapacity = {
  vertices: 4_096, edgePairs: 4_096, faces: 2_048, roleRows: 4_096, roleKeys: 4_096, owners: 512, handles: 1_024, idUnits: 16_384, holes: 16_384,
};

describe('the tiny-tables mode and growth that preserves content (N-53 (4))', () => {
  afterEach(() => setTinyTables(TINY_TABLES));

  it('starts every table at capacity 1 in the tiny-tables mode, whatever capacity is asked, and refuses what the default mode refuses', () => {
    for (const asked of [{}, ROOMY, { vertices: 3, faces: [5, 6, 7, 8, 9] as [number, number, number, number, number], owners: 40 }]) {
      const p = withTiny(true, () => createPlat(GROUND, FRAME, asked));
      const c = capacities(p);
      for (const [table, cap] of Object.entries(c)) expect([table, cap]).toEqual([table, 1]);
      expect(Object.keys(c)).toHaveLength(26 + 5 * 11);
    }
    expect(withTiny(true, () => tinyTables())).toBe(true);
    expect(tinyTables()).toBe(TINY_TABLES); // restored
    expect(() => withTiny(true, () => createPlat(GROUND, FRAME, { vertices: 0 }))).toThrow(/capacity.vertices/);
    expect(() => withTiny(true, () => createPlat(GROUND, FRAME, { roleKeys: 1.5 }))).toThrow(/capacity.roleKeys/);
    expect(() => withTiny(true, () => createPlat(GROUND, FRAME, { owners: -1 }))).toThrow(/capacity.owners/);
    expect(() => withTiny(true, () => createPlat(GROUND, FRAME, { idUnits: 0 }))).toThrow(/capacity.idUnits/);
    // the mode off: the default sizes again
    const d = capacities(withTiny(false, () => createPlat(GROUND, FRAME)));
    expect([d['vertices.x'], d['halfEdges.level'], d['faces[2].outer'], d['roles.kind'], d['roles.head.first'], d['faces[0].ownerHead.head'], d['handles.slots']])
      .toEqual([64, 64, 16, 64, 32, 16, 32]);
  });

  it('a capacity-1 arena and a roomy one fed the same operations hold the same content after every operation, while every table of the first grows, again and again', () => {
    const roomy = withTiny(false, () => createPlat(GROUND, FRAME, ROOMY));
    const roomyCaps = capacities(roomy);
    let compared = 0;
    let replaced = 0;
    let poolGrowths = 0;
    // the whole sequence in the tiny mode: the capacity-1 arena's slot tables grow by one slot (always full); the roomy
    // arena, made with the mode off, never reaches a growth
    const tiny = withTiny(true, () => {
      const t = createPlat(GROUND, FRAME);
      let last = [t.vertices, t.halfEdges, t.roles.kind, t.faces[0].outer, t.faces[4].outer];
      let pools = LEVELS.map((l) => t.faces[l].holes.length);
      drive([t, roomy], 0x5eed_0053, 3_000, (op, keys) => {
        const a = content(t, keys);
        const b = content(roomy, keys);
        const at = firstDifference(a, b);
        if (at !== -1) expect.fail(`after operation ${op} the capacity-1 arena differs from the roomy one at content index ${at}: ${a[at]} vs ${b[at]}`);
        compared++;
        const now = [t.vertices, t.halfEdges, t.roles.kind, t.faces[0].outer, t.faces[4].outer];
        if (now.some((x, i) => x !== last[i])) replaced++;
        last = now;
        // a level's hole pool grows by exactly the run's room too (C-0286 (2), N-s1-2): a call that grew it leaves it
        // exactly full (a compaction alone keeps its length; a cleared or reused run grows nothing)
        const grownPools = LEVELS.map((l) => t.faces[l].holes.length);
        for (const l of LEVELS) {
          if (grownPools[l] === pools[l]) continue;
          expect([op, l, grownPools[l] > pools[l]]).toEqual([op, l, true]);
          expect([op, `faces[${l}].holes`, grownPools[l]]).toEqual([op, `faces[${l}].holes`, t.slots.holesTop[l]]);
          poolGrowths++;
        }
        pools = grownPools;
      });
      return t;
    });
    expect(compared).toBe(3_000);
    expect(poolGrowths).toBeGreaterThanOrEqual(20); // the pools grew often enough for the exact fit to be held
    // the roomy arena never grew, so it is the reference
    expect(capacities(roomy)).toEqual(roomyCaps);
    // the capacity-1 arena's slot tables are exactly full: each grew once per slot above the free lists' reuse
    const grown = capacities(tiny);
    for (const [table, cap] of Object.entries(grown)) expect([table, cap > 1]).toEqual([table, true]);
    expect(grown['vertices.x']).toBe(tiny.slots.vertex.top);
    expect(grown['halfEdges.level']).toBe(tiny.slots.pair.top);
    expect(grown['roles.kind']).toBe(tiny.slots.role.top);
    for (const l of LEVELS) expect(grown[`faces[${l}].outer`]).toBe(tiny.slots.face[l].top);
    expect(tiny.slots.vertex.top).toBeGreaterThanOrEqual(500);
    expect(tiny.slots.pair.top).toBeGreaterThanOrEqual(300);
    expect(tiny.slots.role.top).toBeGreaterThanOrEqual(300);
    for (const l of LEVELS) expect(tiny.slots.face[l].top).toBeGreaterThanOrEqual(16);
    expect(replaced).toBeGreaterThan(1_000); // most operations replaced a table
    // the hash tables doubled from 1, many times
    expect(grown['roles.head.first']).toBeGreaterThanOrEqual(256);
    expect(grown['handles.slots']).toBeGreaterThanOrEqual(256);
    for (const l of LEVELS) expect(grown[`faces[${l}].ownerHead.head`]).toBeGreaterThanOrEqual(16);
  }, 120_000); // ≈ 3.4 s idle (3 000 full-content comparisons); the bound is for a loaded shared machine, never a timing

  it('keeps the rotation through every growth: QUARTERS built at capacity 1 walks every face of every level as the default build does, and still does after further allocations grow every table again', () => {
    const t = withTiny(true, () => buildArena(QUARTERS));
    const d = withTiny(false, () => buildArena(QUARTERS));
    const walks = (p: Plat, faces: number[][]): string[][][] => faces.map((fs, l) => fs.map((f) => faceWalk(p, l as Level, f).map((r) => ringText(p, r))));
    const reference = walks(d.plat, d.faces);
    expect(t.faces).toEqual(d.faces);
    expect(t.v).toEqual(d.v);
    expect(t.he).toEqual(d.he);
    expect(walks(t.plat, t.faces)).toEqual(reference);
    const before = capacities(t.plat);
    const rnd = rng(0x0053_0004);
    for (let i = 0; i < 400; i++) {
      const pick = Math.floor(rnd() * 6);
      for (const b of [t, d]) {
        setTinyTables(b === t); // the capacity-1 build's tables grow by one slot; the default build's double
        const p = b.plat;
        const a = allocVertex(p, pt(5_000 + 40 * i, 7_000 + (i % 13)), 4);
        const c = allocVertex(p, pt(5_000 + 40 * i, 7_100 + (i % 17)), 4);
        const h = allocEdgePair(p, a, c, 4);
        addRole(p, h, { role: 'plot_line', entity: `plot:${i}` }, 4);
        addRole(p, b.he[i % b.he.length], { role: 'gate_opening', entity: 'wall:quarters', ordinal: i }, 2);
        const f = allocFace(p, 4, { outer: b.he[0], kind: 7, owner: intern(p, `building:${i % 50}`), stage: 9, parent: b.faces[3][0] });
        setFaceHoles(p, 4, f, pick % 3 === 0 ? [] : [h, h ^ 1].slice(0, 1 + (pick % 2)));
      }
      setTinyTables(TINY_TABLES);
      if (i % 50 === 49) expect(walks(t.plat, t.faces)).toEqual(walks(d.plat, d.faces));
    }
    // the original faces' rings, untouched by any of it
    expect(walks(t.plat, t.faces)).toEqual(reference);
    expect(walks(d.plat, d.faces)).toEqual(reference);
    const after = capacities(t.plat);
    for (const table of ['vertices.x', 'halfEdges.level', 'roles.kind', 'roles.head.first', 'handles.slots', 'faces[4].outer', 'faces[4].ownerHead.head']) {
      expect([table, after[table] > before[table]]).toEqual([table, true]);
    }
  });

  it('a growth replaces the table it grows, so a table or column captured before the allocation is a dead copy (the premise of the re-read rule)', () => {
    setTinyTables(true); // restored by afterEach
    const p = createPlat(GROUND, FRAME);
    const a = allocVertex(p, pt(0, 0), 0); // fills the 1-slot vertex table
    const V = p.vertices;
    const b = allocVertex(p, pt(100, 0), 0); // grows it
    expect(p.vertices).not.toBe(V);
    V.out[a] = 77; // a write through the stale capture is lost
    expect(p.vertices.out[a]).toBe(-1);
    const h = allocEdgePair(p, a, b, 0); // fills the 1-pair table
    const H = p.halfEdges;
    const c = allocVertex(p, pt(0, 100), 0);
    allocEdgePair(p, b, c, 0); // grows it
    expect(p.halfEdges).not.toBe(H);
    H.next[h] = 5;
    expect(p.halfEdges.next[h]).toBe(-1);
    const R = p.roles;
    const kind = R.kind;
    addRole(p, h, { role: 'way', entity: 'way:1' }, 0);
    const head = p.roles.head.first;
    addRole(p, h, { role: 'kerb', entity: 'block:1' }, 2); // the role rows grow in place: one roles object, new columns
    expect(p.roles).toBe(R);
    expect(p.roles.kind).not.toBe(kind);
    expect(p.roles.head.first).not.toBe(head);
    const outer = p.faces[0].outer;
    const ownerHead = p.faces[0].ownerHead.head;
    const slots = p.handles.slots;
    allocFace(p, 0, { outer: h, kind: 1, owner: intern(p, 'district:1'), stage: 0, parent: -1 });
    allocFace(p, 0, { outer: h ^ 1, kind: 1, owner: intern(p, 'district:2'), stage: 0, parent: -1 });
    expect(p.faces[0].outer).not.toBe(outer);
    expect(p.faces[0].ownerHead.head).not.toBe(ownerHead);
    expect(p.handles.slots).not.toBe(slots);
    const pool = p.faces[0].holes;
    setFaceHoles(p, 0, 0, [h]);
    expect(p.faces[0].holes).not.toBe(pool);
    // in the tiny mode every allocation of a new slot (none here comes from a free list) replaces its slot table, which
    // stays exactly full; a slot taken from a free list grows nothing; with the mode off a table doubles
    allocFace(p, 1, { outer: h, kind: 1, owner: -1, stage: 0, parent: 0 }); // fills L1's one face slot
    for (let i = 0; i < 20; i++) {
      const before = [p.vertices, p.halfEdges, p.roles.kind, p.faces[1].outer];
      const u = allocVertex(p, pt(1_000 + 50 * i, 500), 1);
      const g = allocEdgePair(p, a, u, 1);
      addRole(p, g, { role: 'kerb', entity: `block:${i + 2}` }, 1);
      allocFace(p, 1, { outer: g, kind: 1, owner: -1, stage: 0, parent: 0 });
      const now = [p.vertices, p.halfEdges, p.roles.kind, p.faces[1].outer];
      for (let k = 0; k < 4; k++) expect(now[k]).not.toBe(before[k]);
    }
    expect([p.vertices.x.length, p.halfEdges.level.length, p.roles.kind.length, p.faces[1].outer.length]).toEqual([p.slots.vertex.top, p.slots.pair.top, p.slots.role.top, p.slots.face[1].top]);
    // a slot taken from a free list grows nothing, so the table stays; the next new slot replaces it again (N-c2-2)
    const spare = allocVertex(p, pt(-900, 900), 0);
    freeVertex(p, spare);
    const kept = p.vertices;
    expect(allocVertex(p, pt(-900, 950), 0)).toBe(spare);
    expect(p.vertices).toBe(kept);
    allocVertex(p, pt(-900, 1_000), 0);
    expect(p.vertices).not.toBe(kept);
    expect(p.vertices.x.length).toBe(p.slots.vertex.top);
    setTinyTables(false);
    const v0 = p.vertices.x.length;
    allocVertex(p, pt(-500, -500), 0);
    expect(p.vertices.x.length).toBe(2 * v0);
  });
});

describe('five: one number for every level, or five (plat.ts, exported by path)', () => {
  it('spreads a number over the five levels and hands five numbers back as given; createPlat reads a capacity either way', () => {
    expect(five(3)).toEqual([3, 3, 3, 3, 3]);
    const given: [number, number, number, number, number] = [1, 2, 3, 4, 5];
    expect(five(given)).toBe(given);
    const one = createPlat(GROUND, FRAME, { faces: 32, owners: 8 });
    const each = createPlat(GROUND, FRAME, { faces: [32, 32, 32, 32, 32], owners: [8, 8, 8, 8, 8] });
    expect(one.faces.map((f) => [f.outer.length, f.ownerHead.head.length])).toEqual(each.faces.map((f) => [f.outer.length, f.ownerHead.head.length]));
  });
});
