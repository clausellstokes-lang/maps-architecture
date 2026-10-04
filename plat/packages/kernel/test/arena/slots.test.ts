// M0-a-02: an empty arena from a Frame and the LatticeSpec (§2.2, §3.2 (1), (9)), slot allocation and free lists,
// growth by doubling that keeps every column's content, the face records' owner lists and hole runs, and the raw
// primitives' refusals (programming errors, in every build).
import { describe, expect, it } from 'vitest';
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
  FREE_KIND,
  freeEdgePair,
  freeFace,
  freeVertex,
  intern,
  isFaceLive,
  isHalfEdgeLive,
  isPlatKey,
  isVertexLive,
  LEVELS,
  pointOf,
  sameKey,
  setFaceHoles,
  setFaceOwner,
  twin,
  VERTEX_FREE,
  VERTEX_PINNED,
  VERTEX_SPLIT,
  VERTEX_STEINER,
  type Plat,
} from '../../src/arena/index.js';
import { LATTICE } from '../../src/num/index.js';
import type { Layer, PlatKey } from '../../src/types/index.js';
import { FRAME, GROUND, pt } from './support.js';

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
