// M0-a-02: the five levels as views (§2.2 rule 2, J-K1) — the level-n face walk follows `next` and skips edges of
// level > n around each vertex; on hand-built arenas the level-n face set equals the union of the level-(n + 1) faces
// inside it (a face with no child record is its own child); the level-n walk equals the walk of the arena filtered to
// its edges of level ≤ n (an independent oracle); and the canonical face key skips finer vertices (§3.3).
import { describe, expect, it } from 'vitest';
import {
  allocFace,
  faceHoles,
  faceKey,
  faceWalk,
  freeFace,
  nextAt,
  walkRing,
  type FaceId,
  type HalfEdgeId,
  type Plat,
} from '../../src/arena/index.js';
import type { Level } from '../../src/types/index.js';
import { buildArena, faceAt, filtered, LAKE, levelCycles, permutation, pt, QUARTERS, ringArea2, ringPoints, ringText, type ArenaSpec, type Built } from './support.js';

const LEVELS: Level[] = [0, 1, 2, 3, 4];

function faceArea2(p: Plat, level: Level, f: FaceId): number {
  return faceWalk(p, level, f).reduce((s, r) => s + ringArea2(p, r), 0);
}

/** The level-(n + 1) view inside a level-n face: its child records, or the face itself (its own child). */
function children(b: Built, level: Level, f: FaceId): { level: Level; face: FaceId }[] {
  const finer = (level + 1) as Level;
  const kids = b.faces[finer].filter((g) => b.plat.faces[finer].parent[g] === f).map((g) => ({ level: finer, face: g }));
  return kids.length > 0 ? kids : [{ level, face: f }];
}

function checkViews(b: Built, name: string): void {
  const p = b.plat;
  for (const n of [0, 1, 2, 3] as Level[]) {
    for (const f of b.faces[n]) {
      const kids = children(b, n, f);
      // (1) exact area: the parent is the union of its children
      const sum = kids.reduce((s, k) => s + faceArea2(p, k.level, k.face), 0);
      expect(sum, `${name} L${n} face ${f}: area of the children`).toBe(faceArea2(p, n, f));
      // (2) every half-edge of the parent's rings bounds exactly one child, and (3) no child reaches a level-≤ n
      // half-edge outside the parent
      const parentHalfEdges = faceWalk(p, n, f).flat();
      // an own child is walked at level n + 1 from the parent's stored half-edges
      const childHalfEdges = kids.flatMap((k) => (k.level === n
        ? [p.faces[n].outer[k.face], ...faceHoles(p, n, k.face)].map((h) => walkRing(p, (n + 1) as Level, h))
        : faceWalk(p, k.level, k.face)).flat());
      for (const h of parentHalfEdges) expect(childHalfEdges.filter((g) => g === h).length, `${name} L${n} face ${f}: half-edge ${h}`).toBe(1);
      const coarse = childHalfEdges.filter((h) => p.halfEdges.level[h >> 1] <= n).sort((a, c) => a - c);
      expect(coarse).toEqual([...parentHalfEdges].sort((a, c) => a - c));
    }
  }
}

describe('level views (§2.2 rule 2)', () => {
  it('quarters: the level-n face set equals the union of the level-(n + 1) faces inside it, at every level', () => {
    const b = buildArena(QUARTERS);
    expect(b.faces.map((f) => f.length)).toEqual([1, 4, 4, 3, 2]);
    checkViews(b, 'quarters');
  });

  it('lake: an L0 hole joined to the outer ring by an L1 edge — the union holds across the change of ring structure', () => {
    const b = buildArena(LAKE);
    expect(b.faces.map((f) => f.length)).toEqual([2, 1, 0, 0, 0]);
    const land = faceAt(b, 0, pt(100, 100));
    expect(faceHoles(b.plat, 0, land)).toHaveLength(1);
    expect(faceWalk(b.plat, 1, b.faces[1][0])).toHaveLength(1); // at L1 the shore is on the one ring, through the edge
    checkViews(b, 'lake');
  });

  it('the level-n walk equals the walk of the arena filtered to its edges of level ≤ n (every level, both arenas, any allocation order)', () => {
    for (const [name, spec] of [['quarters', QUARTERS], ['lake', LAKE]] as [string, ArenaSpec][]) {
      for (const seed of [0, 1, 2, 3]) {
        const order = seed === 0 ? {} : { vertices: permutation(spec.vertices.length, seed), edges: permutation(spec.edges.length, seed + 100) };
        const b = buildArena(spec, order);
        for (const n of LEVELS) {
          const got = levelCycles(b.plat, n).map((r) => ringText(b.plat, r)).sort();
          const f = filtered(spec, n);
          const want = levelCycles(f.plat, 4).map((r) => ringText(f.plat, r)).sort();
          expect(got, `${name} seed ${seed} L${n}`).toEqual(want);
        }
      }
    }
  });

  it('skips finer edges around a vertex: the L1 walk passes the L2 and L4 Steiner vertices on the cross and the sides', () => {
    const b = buildArena(QUARTERS);
    const p = b.plat;
    const sw = faceAt(b, 1, pt(100, 400));
    const ring = faceWalk(p, 1, sw)[0];
    // (0,0) → (250,0) → (500,0) → (500,500) → (250,500) → (0,500): six half-edges, the two Steiner vertices kept on the route
    expect(ringPoints(p, ring).map((q) => `${q.x},${q.y}`).sort()).toEqual(['0,0', '0,500', '250,0', '250,500', '500,0', '500,500'].sort());
    expect(ring.every((h) => p.halfEdges.level[h >> 1] <= 1)).toBe(true);
    // at (250,0) the L2 edge leaves northwards; the L1 walk goes on east, the L2 walk turns north
    const atSteiner = ring.find((h) => p.vertices.x[p.halfEdges.origin[h]] === 0 && p.vertices.y[p.halfEdges.origin[h]] === 0) as HalfEdgeId;
    const l1 = nextAt(p, 1, atSteiner);
    const l2 = nextAt(p, 2, atSteiner);
    expect(ringPoints(p, [l1])[0]).toEqual(pt(250, 0));
    expect(p.vertices.x[p.halfEdges.origin[l1 ^ 1]]).toBe(500);
    expect(p.vertices.x[p.halfEdges.origin[l2 ^ 1]]).toBe(250);
    expect(p.vertices.y[p.halfEdges.origin[l2 ^ 1]]).toBe(500);
  });

  it('a level walk refuses to start on a finer half-edge (it bounds no face of that level)', () => {
    const b = buildArena(QUARTERS);
    const l2 = b.he[17]; // the L2 line in the south-west quarter
    expect(() => walkRing(b.plat, 1, l2)).toThrow(/finer than L1/);
    expect(walkRing(b.plat, 2, l2).length).toBeGreaterThan(2);
  });

  it('the antenna and the courtyard: an antenna is retraced on its face\'s ring; a floating ring is a hole of its parent\'s remainder', () => {
    const b = buildArena(QUARTERS);
    const p = b.plat;
    const se = faceAt(b, 2, pt(900, 100));
    const ring = faceWalk(p, 2, se)[0];
    expect(ring).toContain(b.he[18]);
    expect(ring).toContain(b.he[18] ^ 1);
    expect(ringArea2(p, ring)).toBe(2 * 500 * 500);
    const yard = faceAt(b, 3, pt(100, 150));
    const rest = faceAt(b, 3, pt(200, 300));
    expect(faceWalk(p, 3, yard)).toHaveLength(1);
    expect(faceWalk(p, 3, rest)).toHaveLength(2);
    expect(faceArea2(p, 3, rest) + faceArea2(p, 3, yard)).toBe(2 * 250 * 500);
  });

  it('the canonical face key (§3.3) reads the first two vertices of level ≤ n on the outer ring, finer vertices skipped', () => {
    const b = buildArena(QUARTERS);
    const p = b.plat;
    const key = (level: Level, f: FaceId) => faceKey(p, level, f).map((v) => `${p.vertices.x[v]},${p.vertices.y[v]}`);
    // L1 south-west: lowest-leftmost (0,0), next counter-clockwise of level ≤ 1 is (500,0) — (250,0) is L2, skipped
    expect(key(1, faceAt(b, 1, pt(100, 400)))).toEqual(['0,0', '500,0']);
    // L2 south-west-left: (250,0) is now of the level
    expect(key(2, faceAt(b, 2, pt(100, 400)))).toEqual(['0,0', '250,0']);
    // L1 north-east: (500,500) then (1000,500); the L4 vertex (1000,750) never reached at L1
    expect(key(1, faceAt(b, 1, pt(900, 900)))).toEqual(['500,500', '1000,500']);
    // L4 north-east-north: lowest-leftmost of level ≤ 4 is (500,750), then (1000,750)
    expect(key(4, faceAt(b, 4, pt(900, 900)))).toEqual(['500,750', '1000,750']);
  });

  it('a ring that visits its lowest-leftmost vertex twice keys on the smaller successor, whichever ring half-edge the record stores', () => {
    // an L0 square with an L0 antenna into it from its lowest-leftmost corner
    const spec: ArenaSpec = {
      vertices: [[0, 0, 0], [100, 0, 0], [100, 100, 0], [0, 100, 0], [50, 30, 0]],
      edges: [[0, 1, 0], [1, 2, 0], [2, 3, 0], [3, 0, 0], [0, 4, 0]],
    };
    const b = buildArena(spec);
    const p = b.plat;
    let f = b.faces[0][0];
    const ring = faceWalk(p, 0, f)[0];
    expect(ring).toHaveLength(6); // four sides and the antenna, retraced: (0,0) is visited twice
    // Any half-edge of the outer ring is a valid stored outer (FaceInit.outer), and a writer's choice of it is slot
    // history: re-store the record from each in turn. The first visit of (0,0) is then followed by (100,0) for some
    // starts and by (50,30) for others; the key reads (100,0) — the smaller y — every time (§3.3: no slot breaks a tie).
    const keys: string[] = [];
    const firstSteps = new Set<string>();
    for (const h of ring) {
      freeFace(p, 0, f);
      f = allocFace(p, 0, { outer: h, kind: 1, owner: -1, stage: 0, parent: -1 });
      const walk = faceWalk(p, 0, f)[0];
      expect(walk[0]).toBe(h);
      const visit = walk.find((g) => p.vertices.x[p.halfEdges.origin[g]] === 0 && p.vertices.y[p.halfEdges.origin[g]] === 0) as HalfEdgeId;
      firstSteps.add(ringPoints(p, [visit ^ 1]).map((q) => `${q.x},${q.y}`)[0]);
      keys.push(faceKey(p, 0, f).map((v) => `${p.vertices.x[v]},${p.vertices.y[v]}`).join(' '));
    }
    expect([...firstSteps].sort()).toEqual(['100,0', '50,30']); // both orders of the two visits were exercised
    expect(keys).toEqual(ring.map(() => '0,0 100,0'));
  });
});
