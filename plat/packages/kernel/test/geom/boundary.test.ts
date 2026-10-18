// M0-a-10: faceRings, sampleBoundary and faceNeighbours (§3.4; §3.8's sampled medial axis reads the samples, §3.10's
// reachability walk the neighbours) on M0-a-02's hand-built arenas (test/arena/support.ts, read-only): neighbours by the
// half-edge structure across outer rings and holes, the level views, the canonical order, the stamp, independence from
// slot allocation order, and the kept map (C-0159 (6), C-0163): keyed by version and slot counts, and every claim it
// makes re-checked, so an arena written under an unchanged version and counts — a batch between its writes and its
// commit, modelled with M0-a-02's raw allocators or by moving a second built arena's tables in — is answered as it is;
// and keyed on the arena's restore generation too (Q34, C-0299, C-0319), so a map built before a savepoint is put back
// across committed batches is never taken as current once as many later commits bring the version and counts back.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { allocFace, allocVertex, commitVersion, freeFace, FREE_KIND, type FaceId, type Plat } from '../../src/arena/index.js';
import { faceNeighbours, faceRings, sampleBoundary } from '../../src/geom/index.js';
import { neighbourMapBuilds } from '../../src/geom/neighbours.js';
import { restoreGeneration, restoreSavepoint, takeSavepoint } from '../../src/tx/index.js';
import type { Level, PlatKey } from '../../src/types/index.js';
import { buildArena, faceAt, GROUND, LAKE, permutation, QUARTERS, type ArenaSpec, type Built } from '../arena/support.js';
import { TIMEOUT, pt } from './support.js';

const ringKey = (p: Plat, level: Level, f: FaceId): string => faceRings(p, level, f).map((r) => r.map((q) => `${q.x},${q.y}`).join(' ')).join(' | ');

/** A k × m grid of 10 m squares, every edge at L0. */
function grid(k: number, m: number): ArenaSpec {
  const vertices: [number, number, Level][] = [];
  const id = (i: number, j: number): number => j * (k + 1) + i;
  for (let j = 0; j <= m; j += 1) for (let i = 0; i <= k; i += 1) vertices.push([i * 1000, j * 1000, 0]);
  const edges: [number, number, Level][] = [];
  for (let j = 0; j <= m; j += 1) for (let i = 0; i < k; i += 1) edges.push([id(i, j), id(i + 1, j), 0]);
  for (let j = 0; j < m; j += 1) for (let i = 0; i <= k; i += 1) edges.push([id(i, j), id(i, j + 1), 0]);
  return { vertices, edges };
}

describe('faceRings and sampleBoundary (§3.4)', () => {
  it('reads a face as its outer ring and holes, finer Steiner vertices on its routes included', () => {
    const b = buildArena(LAKE);
    const annulus = faceAt(b, 0, pt(100, 100));
    const rings = faceRings(b.plat, 0, annulus);
    expect(rings).toHaveLength(2);
    expect(rings[0]).toHaveLength(5); // the square with (1000, 0), the L1 slit's foot, on its route
    expect(rings[0].some((q) => q.x === 1000 && q.y === 0)).toBe(true);
    expect(rings[1]).toHaveLength(5); // the lake's ring with (1000, 800)
  });

  it('samples every vertex and cuts each edge into equal parts no longer than the step', () => {
    const square = [pt(0, 0), pt(1000, 0), pt(1000, 1000), pt(0, 1000)];
    const [s] = sampleBoundary([square], 100);
    expect(s).toHaveLength(40);
    for (let i = 0; i < s.length; i += 1) {
      const q = s[(i + 1) % s.length];
      expect(Math.hypot(q.x - s[i].x, q.y - s[i].y)).toBeCloseTo(100, 9);
    }
    const [odd] = sampleBoundary([[pt(0, 0), pt(250, 0), pt(250, 330), pt(250, 330)]], 100);
    for (const v of [pt(0, 0), pt(250, 0), pt(250, 330)]) expect(odd.some((q) => q.x === v.x && q.y === v.y)).toBe(true);
    for (let i = 0; i < odd.length; i += 1) {
      const q = odd[(i + 1) % odd.length];
      expect(Math.hypot(q.x - odd[i].x, q.y - odd[i].y)).toBeLessThanOrEqual(100 + 1e-9);
    }
    expect(sampleBoundary([[pt(5, 5)], []], 100)).toEqual([[{ x: 5, y: 5 }], []]);
    for (const step of [0, 0.5, Number.NaN, Number.POSITIVE_INFINITY]) expect(() => sampleBoundary([square], step)).toThrow(RangeError);
  });
});

describe('faceNeighbours (§3.4)', () => {
  it('quarters at L1: a quarter neighbours the two quarters it shares a side with, not the one across the centre', () => {
    const b = buildArena(QUARTERS);
    const p = b.plat;
    const sw = faceAt(b, 1, pt(100, 100));
    const se = faceAt(b, 1, pt(900, 100));
    const nw = faceAt(b, 1, pt(100, 900));
    const r = faceNeighbours(p, GROUND, sw, 1);
    expect(new Set(r.faces)).toEqual(new Set([se, nw]));
    expect(r.key).toEqual(GROUND);
    expect(r.version).toBe(p.version);
    expect(r.level).toBe(1);
  });

  it('crosses a hole: the lake and the land around it neighbour each other at L0; a slit face has no neighbour across itself', () => {
    const b = buildArena(LAKE);
    const p = b.plat;
    const land = faceAt(b, 0, pt(100, 100));
    const lake = faceAt(b, 0, pt(1000, 1000));
    expect(faceNeighbours(p, GROUND, land, 0).faces).toEqual([lake]);
    expect(faceNeighbours(p, GROUND, lake, 0).faces).toEqual([land]);
    const slit = faceAt(b, 1, pt(100, 100));
    expect(faceNeighbours(p, GROUND, slit, 1).faces).toEqual([]); // the lake has no L1 record of its own (its own child)
  });

  it('asserts the key names the arena (debug build), and answers again after a commit', () => {
    const b = buildArena(QUARTERS);
    const sw = faceAt(b, 1, pt(100, 100));
    const other: PlatKey = { layer: 'ground', part: 1 };
    expect(() => faceNeighbours(b.plat, other, sw, 1)).toThrow(/handed the key/);
    const before = faceNeighbours(b.plat, GROUND, sw, 1).faces;
    commitVersion(b.plat);
    const after = faceNeighbours(b.plat, GROUND, sw, 1);
    expect(after.faces).toEqual(before);
    expect(after.version).toBe(b.plat.version);
  });

  it('on grids in any allocation order: exactly the faces sharing a side, by canonical key', () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 5 }), fc.integer({ min: 1, max: 5 }), fc.integer({ min: 0, max: 0x7fffffff }), (k, m, seed) => {
        const spec = grid(k, m);
        const b = buildArena(spec, { vertices: permutation(spec.vertices.length, seed), edges: permutation(spec.edges.length, seed ^ 0x5bd1e995) });
        const p = b.plat;
        for (let j = 0; j < m; j += 1) {
          for (let i = 0; i < k; i += 1) {
            const f = faceAt(b, 0, pt(i * 1000 + 500, j * 1000 + 500));
            const want = [[i + 1, j], [i - 1, j], [i, j + 1], [i, j - 1]]
              .filter(([x, y]) => x >= 0 && x < k && y >= 0 && y < m)
              .map(([x, y]) => ringKey(p, 0, faceAt(b, 0, pt(x * 1000 + 500, y * 1000 + 500))))
              .sort();
            const got = faceNeighbours(p, GROUND, f, 0).faces.map((g) => ringKey(p, 0, g));
            expect([...got].sort()).toEqual(want);
            // the canonical order: by the faces' lowest-leftmost vertex, y then x
            const lows = faceNeighbours(p, GROUND, f, 0).faces.map((g) => {
              const r = faceRings(p, 0, g)[0];
              return r.reduce((a, q) => (q.y < a.y || (q.y === a.y && q.x < a.x) ? q : a));
            });
            for (let t = 1; t < lows.length; t += 1) expect(lows[t - 1].y < lows[t].y || (lows[t - 1].y === lows[t].y && lows[t - 1].x < lows[t].x)).toBe(true);
          }
        }
      }),
      { numRuns: 200 },
    );
  }, TIMEOUT);
});

/**
 * A 20 × 10 m rectangle with two cross edges, E at x = 10 m and F at x = 5 m, at the levels given (the checker's probe
 * P1, checks/M0-a-10.md). With `sidesFirst` the left and right sides are allocated first, so each L0 face record's outer
 * half-edge is the same whichever cross edge is at L0: two arenas whose L0 face records are equal while their rings
 * differ.
 */
function crossed(eLevel: Level, fLevel: Level, sidesFirst: boolean): ArenaSpec {
  const xs: [number, number][] = [[0, 0], [500, 0], [1000, 0], [2000, 0], [2000, 1000], [1000, 1000], [500, 1000], [0, 1000]];
  const levelOf = (x: number): Level => (x === 500 ? fLevel : x === 1000 ? eLevel : 0);
  const rim: [number, number, Level][] = [[0, 1, 0], [1, 2, 0], [2, 3, 0], [3, 4, 0], [4, 5, 0], [5, 6, 0], [6, 7, 0], [7, 0, 0]];
  const cross: [number, number, Level][] = [[2, 5, eLevel], [1, 6, fLevel]];
  const edges = sidesFirst ? [rim[7], rim[3], ...rim.slice(0, 3), ...rim.slice(4, 7), ...cross] : [...rim, ...cross];
  return { vertices: xs.map(([x, y]) => [x, y, levelOf(x)] as [number, number, Level]), edges };
}

/** Moves a second arena's tables into `target` (the same object, its version kept): a batch's writes before its commit. */
function adopt(target: Plat, source: Plat): void {
  target.vertices = source.vertices;
  target.halfEdges = source.halfEdges;
  target.roles = source.roles;
  target.faces = source.faces;
  target.indexHome = source.indexHome;
  target.handles = source.handles;
  target.slots = source.slots;
}

/** The fingerprint the map is keyed by, with the version (C-0159 (6)). */
const keyOf = (p: Plat, level: Level): string =>
  `${p.version}|${p.slots.pair.top}/${p.slots.pair.live}/${p.slots.face[level].top}/${p.slots.face[level].live}/${p.slots.vertex.top}/${p.slots.holesTop[level]}`;

/** The neighbours as ring texts, sorted: comparable across arenas whatever their slots. */
const ringsOf = (p: Plat, level: Level, faces: readonly FaceId[]): string[] => faces.map((f) => ringKey(p, level, f)).sort();

/** The 3 × 3 grid of 10 m cells at L0 and its cells' faces by column and row. */
function grid3(): { b: Built; cell: (i: number, j: number) => FaceId } {
  const b = buildArena(grid(3, 3));
  return { b, cell: (i, j) => faceAt(b, 0, pt(i * 1000 + 500, j * 1000 + 500)) };
}

/** A face record re-allocated at L0 for the region left of `outer` (M0-a-02's raw allocator). */
const realloc = (p: Plat, outer: number): FaceId => allocFace(p, 0, { outer, kind: 1, owner: -1, stage: 0, parent: -1 });

describe('faceNeighbours: the kept map (C-0159 (6), C-0163)', () => {
  it('is kept per arena and level by version and slot counts: reused at the same key, rebuilt after a commit or a count change', () => {
    const b = buildArena(QUARTERS);
    const p = b.plat;
    const sw = faceAt(b, 1, pt(100, 100));
    expect(neighbourMapBuilds(p)).toBe(0);
    const first = faceNeighbours(p, GROUND, sw, 1).faces;
    expect(neighbourMapBuilds(p)).toBe(1);
    expect(faceNeighbours(p, GROUND, sw, 1).faces).toEqual(first);
    expect(neighbourMapBuilds(p)).toBe(1); // the same key: the kept map answers
    commitVersion(p);
    expect(faceNeighbours(p, GROUND, sw, 1).faces).toEqual(first);
    expect(neighbourMapBuilds(p)).toBe(2); // a commit rebuilds, nothing changed or not
    allocVertex(p, pt(-5000, -5000), 0); // a slot count moves (an isolated vertex: no walk changes)
    expect(faceNeighbours(p, GROUND, sw, 1).faces).toEqual(first);
    expect(neighbourMapBuilds(p)).toBe(3);
    faceNeighbours(p, GROUND, faceAt(b, 0, pt(100, 100)), 0);
    expect(neighbourMapBuilds(p)).toBe(4); // each level its own map
    faceNeighbours(p, GROUND, sw, 1);
    expect(neighbourMapBuilds(p)).toBe(4);
  });

  it('answers the new neighbours after a batch changes the topology and commits', () => {
    const b1 = buildArena(crossed(0, 1, false));
    const b2 = buildArena(crossed(1, 0, false));
    const p = b1.plat;
    const left1 = faceAt(b1, 0, pt(250, 500));
    expect(ringsOf(p, 0, faceNeighbours(p, GROUND, left1, 0).faces)).toEqual([ringKey(p, 0, faceAt(b1, 0, pt(1500, 500)))]);
    adopt(p, b2.plat); // E demoted, F promoted
    commitVersion(p);
    const left2 = faceAt(b2, 0, pt(250, 500));
    const got = faceNeighbours(p, GROUND, left2, 0);
    expect(got.version).toBe(p.version);
    expect(ringsOf(p, 0, got.faces)).toEqual([ringKey(p, 0, faceAt(b2, 0, pt(1500, 500)))]);
    expect(got.faces).toEqual(faceNeighbours(b2.plat, GROUND, left2, 0).faces);
  });

  it('between a batch\'s writes and its commit (the same version and slot counts) answers the arena as it is, never the kept map', () => {
    for (const sidesFirst of [false, true]) {
      const b1 = buildArena(crossed(0, 1, sidesFirst));
      const b2 = buildArena(crossed(1, 0, sidesFirst));
      const p = b1.plat;
      expect(keyOf(b2.plat, 0)).toBe(keyOf(p, 0)); // the premise: one key for both arenas
      if (sidesFirst) {
        // the premise of the ring check: the L0 face records are equal, only the rings differ
        expect([...b2.plat.faces[0].outer.slice(0, 2)]).toEqual([...p.faces[0].outer.slice(0, 2)]);
      }
      faceNeighbours(p, GROUND, faceAt(b1, 0, pt(250, 500)), 0); // fills the kept map
      const builds = neighbourMapBuilds(p);
      adopt(p, b2.plat);
      for (const at of [pt(250, 500), pt(1500, 500)]) {
        const f = faceAt(b2, 0, at);
        const got = faceNeighbours(p, GROUND, f, 0).faces;
        expect(got).toEqual(faceNeighbours(b2.plat, GROUND, f, 0).faces);
        expect(got).toHaveLength(1);
      }
      expect(neighbourMapBuilds(p)).toBe(builds + 1); // the stale map cost one rebuild
    }
  });

  it('refuses a kept neighbour whose face slot now holds another region (a neighbour re-checked on its rings)', () => {
    const { b, cell } = grid3();
    const p = b.plat;
    const c = cell(1, 1);
    const n = cell(1, 2);
    const ne = cell(2, 2);
    const want = ringsOf(p, 0, [cell(1, 2), cell(2, 1), cell(1, 0), cell(0, 1)]);
    expect(ringsOf(p, 0, faceNeighbours(p, GROUND, c, 0).faces)).toEqual(want);
    // the batch frees the north-east and north records and re-allocates them the other way round: same version, same counts
    const nOuter = p.faces[0].outer[n];
    const neOuter = p.faces[0].outer[ne];
    const key = keyOf(p, 0);
    freeFace(p, 0, ne);
    freeFace(p, 0, n);
    expect(realloc(p, neOuter)).toBe(n); // the north-east region now in the north's old slot
    expect(realloc(p, nOuter)).toBe(ne);
    expect(keyOf(p, 0)).toBe(key);
    const got = faceNeighbours(p, GROUND, c, 0).faces;
    expect(got).toContain(ne);
    expect(got).not.toContain(n);
    expect(ringsOf(p, 0, got)).toEqual(want);
  });

  it('refuses a kept neighbour whose record was freed after a new record took its region (allocate before free: the liveness re-check)', () => {
    const { b, cell } = grid3();
    const p = b.plat;
    const c = cell(1, 1);
    const n = cell(1, 2);
    const corner = cell(2, 2); // no neighbour of the centre (its record the last allocated: the free slot above n's)
    const want = ringsOf(p, 0, [cell(1, 2), cell(2, 1), cell(1, 0), cell(0, 1)]);
    freeFace(p, 0, corner); // a free face slot, committed
    commitVersion(p);
    expect(ringsOf(p, 0, faceNeighbours(p, GROUND, c, 0).faces)).toEqual(want); // fills the kept map: across the north side, n
    const builds = neighbourMapBuilds(p);
    const key = keyOf(p, 0);
    // the batch allocates the north region's new record first (it takes the free slot), then frees the old one: the
    // same version, the same counts, and the kept claim names a slot that is no longer live
    const nOuter = p.faces[0].outer[n];
    const fresh = realloc(p, nOuter);
    expect(fresh).toBe(corner);
    freeFace(p, 0, n);
    expect(keyOf(p, 0)).toBe(key);
    const got = faceNeighbours(p, GROUND, c, 0).faces;
    expect(got).toContain(fresh);
    expect(got).not.toContain(n);
    expect(ringsOf(p, 0, got)).toEqual(want);
    expect(neighbourMapBuilds(p)).toBe(builds + 1); // the claim refused, one rebuild
  });

  it('where two live records claim one ring (inside a batch, between an allocation and its free; §2.2 rule 1 broken), answers without a throw, each neighbour a live record on that ring (C-0163 (1)\'s premise, C-0371)', () => {
    const { b, cell } = grid3();
    const p = b.plat;
    const c = cell(1, 1);
    const n = cell(1, 2);
    const want = ringsOf(p, 0, [cell(1, 2), cell(2, 1), cell(1, 0), cell(0, 1)]);
    freeFace(p, 0, cell(2, 2)); // a free face slot above n's, committed
    commitVersion(p);
    expect(ringsOf(p, 0, faceNeighbours(p, GROUND, c, 0).faces)).toEqual(want); // fills the kept map: across the north side, n
    const key = keyOf(p, 0);
    const twin = realloc(p, p.faces[0].outer[n]); // a second live record on the north ring …
    freeFace(p, 0, cell(0, 0)); // … and a far corner freed, so the counts match
    expect(keyOf(p, 0)).toBe(key);
    // the case at issue: the kept map holds n for the ring, while a fresh build's last write gives the higher slot
    expect(twin).toBeGreaterThan(n);
    const northRing = new Set(faceRings(p, 0, n)[0].map((q) => `${q.x},${q.y}`));
    const safe = (faces: readonly FaceId[]): void => {
      expect(ringsOf(p, 0, faces)).toEqual(want);
      // exactly one of the two records named, whichever path answered (unspecified by C-0371: the premise is broken)
      expect(faces.filter((f) => f === n || f === twin)).toHaveLength(1);
      for (const f of faces) expect(p.faces[0].kind[f]).not.toBe(FREE_KIND);
      const north = faces.find((f) => f === n || f === twin) as FaceId;
      expect(faceRings(p, 0, north)[0].every((q) => northRing.has(`${q.x},${q.y}`))).toBe(true);
    };
    safe(faceNeighbours(p, GROUND, c, 0).faces); // the kept map's answer
    commitVersion(p);
    safe(faceNeighbours(p, GROUND, c, 0).faces); // a fresh map's answer
    freeFace(p, 0, n); // the batch frees the old record: one record per region again, one answer
    const got = faceNeighbours(p, GROUND, c, 0).faces;
    expect(got).toContain(twin);
    expect(ringsOf(p, 0, got)).toEqual(want);
  });

  it('refuses a kept entry naming the face itself once that half-edge is no longer on its rings (the self entries re-checked)', () => {
    const { b, cell } = grid3();
    const p = b.plat;
    const c = cell(1, 1);
    const n = cell(1, 2);
    const want = ringsOf(p, 0, [cell(1, 2), cell(2, 1), cell(1, 0), cell(0, 1)]);
    expect(ringsOf(p, 0, faceNeighbours(p, GROUND, c, 0).faces)).toEqual(want);
    // the centre and north records swap slots: the centre region's north twin is kept as the slot it now holds
    const cOuter = p.faces[0].outer[c];
    const nOuter = p.faces[0].outer[n];
    freeFace(p, 0, n);
    freeFace(p, 0, c);
    expect(realloc(p, nOuter)).toBe(c);
    expect(realloc(p, cOuter)).toBe(n);
    const got = faceNeighbours(p, GROUND, n, 0).faces;
    expect(got).toContain(c);
    expect(ringsOf(p, 0, got)).toEqual(want);
  });

  it('refuses a kept "no face there" once a record owns that ring (the face records compared with the map\'s)', () => {
    const { b, cell } = grid3();
    const p = b.plat;
    const c = cell(1, 1);
    const n = cell(1, 2);
    const sw = cell(0, 0);
    const three = ringsOf(p, 0, [cell(2, 1), cell(1, 0), cell(0, 1)]);
    const nOuter = p.faces[0].outer[n];
    const swOuter = p.faces[0].outer[sw];
    freeFace(p, 0, n); // the north cell without a record (no face there), committed
    commitVersion(p);
    expect(ringsOf(p, 0, faceNeighbours(p, GROUND, c, 0).faces)).toEqual(three);
    // the batch frees the south-west record and gives the north region one in its slot: same version, same counts, and
    // every half-edge of the north ring still unmapped in the kept map
    const key = keyOf(p, 0);
    freeFace(p, 0, sw);
    expect(realloc(p, nOuter)).toBe(sw);
    expect(keyOf(p, 0)).toBe(key);
    const got = faceNeighbours(p, GROUND, c, 0).faces;
    expect(got).toContain(sw);
    expect(ringsOf(p, 0, got)).toEqual([...three, ringKey(p, 0, sw)].sort());
    expect(p.faces[0].outer[sw]).toBe(nOuter);
    expect(swOuter).not.toBe(nOuter);
  });

  it('refuses a kept "no face there" across a hole ring once a record holds that hole again (hole anchors compared too)', () => {
    const b = buildArena(LAKE);
    const p = b.plat;
    const land = faceAt(b, 0, pt(100, 100));
    const lake = faceAt(b, 0, pt(1000, 1000));
    const start = p.faces[0].holesStart[land];
    p.faces[0].holesStart[land] = -1; // the land's record without its hole (a raw write; the pool untouched), committed
    commitVersion(p);
    expect(faceNeighbours(p, GROUND, lake, 0).faces).toEqual([]);
    const key = keyOf(p, 0);
    p.faces[0].holesStart[land] = start; // the batch gives the hole back: same version, same counts
    expect(keyOf(p, 0)).toBe(key);
    expect(faceNeighbours(p, GROUND, lake, 0).faces).toEqual([land]);
  });

  it('is keyed on the restore generation too (Q34, C-0299): a map built before a cross-commit restore is rebuilt after as many later commits, one built after it reused', () => {
    for (const n of [1, 3]) {
      const fresh = buildArena(QUARTERS);
      const b = buildArena(QUARTERS);
      const p = b.plat;
      const sw = faceAt(b, 1, pt(100, 100));
      const want = faceNeighbours(fresh.plat, GROUND, sw, 1).faces;
      const image = takeSavepoint(p);
      for (let i = 0; i < n; i += 1) commitVersion(p);
      expect(faceNeighbours(p, GROUND, sw, 1).faces).toEqual(want);
      const seen = keyOf(p, 1);
      expect(neighbourMapBuilds(p)).toBe(1);
      restoreSavepoint(image); // n committed batches rolled back: the version and the slot counts as they were
      expect(restoreGeneration(p), `n = ${n}`).toBe(1);
      for (let i = 0; i < n; i += 1) commitVersion(p);
      expect(keyOf(p, 1), `n = ${n}: the premise, version and counts the map saw`).toBe(seen);
      expect(faceNeighbours(p, GROUND, sw, 1).faces).toEqual(want);
      expect(neighbourMapBuilds(p), `n = ${n}: the map of the rolled-back state is not reused`).toBe(2);
      expect(faceNeighbours(p, GROUND, sw, 1).faces).toEqual(want);
      expect(neighbourMapBuilds(p), `n = ${n}: the map built after the restore is reused`).toBe(2);
      // a map built between the restore and the replayed commits: reused at its key, rebuilt by the next commit as ever
      const second = takeSavepoint(p);
      for (let i = 0; i < n; i += 1) commitVersion(p);
      restoreSavepoint(second);
      expect(restoreGeneration(p)).toBe(2);
      expect(faceNeighbours(p, GROUND, sw, 1).faces).toEqual(want);
      expect(neighbourMapBuilds(p)).toBe(3);
      expect(faceNeighbours(p, GROUND, sw, 1).faces).toEqual(want);
      expect(neighbourMapBuilds(p)).toBe(3);
      commitVersion(p);
      expect(faceNeighbours(p, GROUND, sw, 1).faces).toEqual(want);
      expect(neighbourMapBuilds(p)).toBe(4);
    }
  });

  it('answers the restored arena, equal to a fresh walk, when the rolled-back batches changed the topology (Q34)', () => {
    for (const sidesFirst of [false, true]) {
      for (const n of [1, 3]) {
        const b1 = buildArena(crossed(0, 1, sidesFirst));
        const b2 = buildArena(crossed(1, 0, sidesFirst));
        const fresh1 = buildArena(crossed(0, 1, sidesFirst)).plat;
        const fresh2 = buildArena(crossed(1, 0, sidesFirst)).plat;
        const p = b1.plat;
        const image = takeSavepoint(p);
        const at = [pt(250, 500), pt(1500, 500)];
        adopt(p, b2.plat); // the rolled-back batches: E demoted, F promoted
        for (let i = 0; i < n; i += 1) commitVersion(p);
        for (const q of at) {
          const f = faceAt(b2, 0, q);
          expect(faceNeighbours(p, GROUND, f, 0).faces).toEqual(faceNeighbours(fresh2, GROUND, f, 0).faces);
        }
        const seen = keyOf(p, 0);
        restoreSavepoint(image);
        for (let i = 0; i < n; i += 1) commitVersion(p);
        expect(keyOf(p, 0), `${sidesFirst}, n = ${n}: the premise`).toBe(seen);
        const builds = neighbourMapBuilds(p);
        for (const q of at) {
          const f = faceAt(b1, 0, q);
          const got = faceNeighbours(p, GROUND, f, 0).faces;
          expect(got, `${sidesFirst}, n = ${n}`).toEqual(faceNeighbours(fresh1, GROUND, f, 0).faces);
          expect(got).toHaveLength(1);
          expect(ringsOf(p, 0, got)).toEqual(ringsOf(fresh1, 0, got));
        }
        expect(neighbourMapBuilds(p)).toBe(builds + 1);
      }
    }
  });
});
