// M0-a-15: §13.1's round trip on the kernel's own arenas (the unit and property tests the item adds beside the
// testkit-side bar runs, C-0122): random batch sequences of M0-a-06's generator — ways, lanes, finer chains along ways,
// stretch removals, re-owns and clears, so demotions, Steiner splits and finer rows on coarser edges occur (the first
// tallied and asserted, the others counted from the chunks) — saved, loaded and saved again byte for byte, the loaded
// arena equal to the original and passing every hard invariant; and constructed arenas for what the generator does not
// reach: a promotion, L4 splits, non-zero face kinds.
import { describe, expect, it } from 'vitest';
import { decodeArena, describeChunk, encodeArena } from '../../src/io/index.js';
import { ringKey, roomFor } from '../../src/io/format.js';
import { absorbSliver, FACE_KIND_RESIDUE } from '../../src/faces/index.js';
import { insertChain } from '../../src/insert/index.js';
import { setOwner } from '../../src/tx/index.js';
import type { Level } from '../../src/types/index.js';
import { commit, faceAt, pt } from '../faces/support.js';
import { ALONG_MIX, DEFAULT_MIX } from '../tx/fuzzgen.js';
import { dest, faceHoles, faceKey, isFaceLive, isVertexLive, LEVELS, outgoing, walkRing, type HalfEdgeId, type Plat } from '../../src/arena/index.js';
import { orient2d } from '../../src/num/index.js';
import { tx } from '../../src/tx/index.js';
import { randomBatch, rng, type Live } from '../tx/fuzzgen.js';
import { spec } from '../tx/support.js';
import { CELLS, framed, load, print, randomArena, roundTrip, type LevelMoves } from './support.js';

/** The quadrant of a direction counter-clockwise from +x, as the load's angle sort reads it (decode.ts). */
function quadrantOf(dx: number, dy: number): number {
  if (dy > 0) return dx > 0 ? 0 : 1;
  if (dy < 0) return dx < 0 ? 2 : 3;
  return dx > 0 ? 0 : 2;
}

/** Is `g` a half-edge out of its origin no other outgoing half-edge precedes counter-clockwise from +x? */
function firstFromPlusX(p: Plat, g: HalfEdgeId): boolean {
  const v = p.halfEdges.origin[g];
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const q = (h: HalfEdgeId): number => quadrantOf(X[dest(p, h)] - X[v], Y[dest(p, h)] - Y[v]);
  return outgoing(p, v).every((h) => h === g || q(g) < q(h) || (q(g) === q(h) && orient2d(X[v], Y[v], X[dest(p, g)], Y[dest(p, g)], X[dest(p, h)], Y[dest(p, h)]) > 0));
}

/** Does the ring walked from `g` at `level` start on the key (a, b): leave a, and meet b as its next vertex of level ≤ `level`? */
function startsOnKey(p: Plat, level: Level, g: HalfEdgeId, a: number, b: number): boolean {
  const ring = walkRing(p, level, g);
  if (p.halfEdges.origin[ring[0]] !== a) return false;
  for (let i = 1; i <= ring.length; i++) {
    const v = p.halfEdges.origin[ring[i % ring.length]];
    if (p.vertices.level[v] <= level) return v === b;
  }
  return false;
}

describe('the arena block round trip (§13.1, §3.9)', () => {
  it('loads the chunks in any order: partitions are taken level by level, key by key (§3.9 *Load*)', () => {
    for (let seed = 1; seed <= 12; seed++) {
      const p = randomArena(seed * 31_337, 120, ALONG_MIX);
      const chunks = encodeArena(p);
      const shuffled = chunks.slice().reverse();
      const r = decodeArena(shuffled, p.key, { index: { gridCellCm: CELLS } });
      expect(r.ok).toBe(true);
      if (r.ok) {
        expect(print(r.value)).toBe(print(p));
        encodeArena(r.value).forEach((c, i) => expect(c.bytes).toEqual(chunks[i].bytes));
      }
    }
  });

  it('a loaded arena takes further batches as the original does: same arena after each, and round-trips again', () => {
    for (let seed = 1; seed <= 10; seed++) {
      const r0 = rng(seed * 4099);
      const p = framed();
      const live: Live = { ways: [], kerbs: [], next: 0 };
      const grow = (q: Plat, l: Live, r: () => number): boolean => {
        const snap: Live = { ways: l.ways.slice(), kerbs: l.kerbs.slice(), next: l.next };
        const b = randomBatch(q, l, r, ALONG_MIX);
        const ok = tx(q, spec(b.level, { rederivesFrom: 0 as never }), b.fn).ok;
        if (!ok) {
          l.ways = snap.ways;
          l.kerbs = snap.kerbs;
        }
        return ok;
      };
      for (let i = 0; i < 60; i++) grow(p, live, r0);
      const q = load(encodeArena(p), p);
      const liveQ: Live = { ways: live.ways.slice(), kerbs: live.kerbs.slice(), next: live.next };
      for (let i = 0; i < 40; i++) {
        const okP = grow(p, live, rng(seed * 7 + i));
        const okQ = grow(q, liveQ, rng(seed * 7 + i));
        expect(okQ).toBe(okP);
        expect(print(q)).toBe(print(p));
      }
      roundTrip(q);
    }
  });

  it('carries the face kind column: residue faces at L0, L1 (routes chunk) and L2, L3 (partition chunks) round-trip (§3.9 faces row; fix round 1, check B1)', () => {
    // The honest path (M0-a-07): absorbSliver retypes a sliver whose every boundary is structural or coarser as
    // `residue` (FACE_KIND_RESIDUE, 1) and leaves its edges. At each level two structural chains of that level 100 cm
    // apart bound a sliver below the floor; the L1 sliver also takes its neighbour's owner (the setOwner door).
    const p = framed();
    const chain = (level: Level, y: number, role: string, entity: string, x0 = 0, x1 = 4000): void => {
      commit(p, level, (o) => insertChain(o, [pt(x0, y), pt(x1, y)], [{ role, entity }], 'mandatory'));
    };
    chain(0, 3000, 'shore', 'water:1');
    chain(0, 3100, 'shore', 'water:2');
    chain(1, 2000, 'way', 'way:1');
    chain(1, 2100, 'way', 'way:2');
    commit(p, 1, (o) => setOwner(o, [faceAt(p, 1, 2000, 1000)], 'block:1'));
    chain(2, 1000, 'wall', 'wall:1');
    chain(2, 1100, 'wall', 'wall:2');
    chain(3, 500, 'setback', 'setback:1', 0, 4000);
    chain(3, 600, 'setback', 'setback:2', 0, 4000);
    // L4 too (checks/M0-a-15-notes.md note 13, K12): two L4 setback chains, their sliver written in an L4 partition chunk.
    chain(4, 200, 'setback', 'setback:3', 0, 4000);
    chain(4, 300, 'setback', 'setback:4', 0, 4000);
    const slivers: [Level, number][] = [[0, 3050], [1, 2050], [2, 1050], [3, 550], [4, 250]];
    for (const [level, y] of slivers) {
      const f = faceAt(p, level, 2000, y);
      expect(f, `the L${level} sliver`).toBeGreaterThanOrEqual(0);
      const c = commit(p, level, (o) => absorbSliver(o, f, { minWidthCm: 200, minAreaCm2: 0 }));
      expect(c.value).toBe(f);
      expect(p.faces[level].kind[f]).toBe(FACE_KIND_RESIDUE);
    }
    const kinds = (q: Plat): string =>
      slivers.map(([level, y]) => `L${level}:${q.faces[level].kind[faceAt(q, level, 2000, y)]}`).join(' ');
    expect(kinds(p)).toBe('L0:1 L1:1 L2:1 L3:1 L4:1');
    // Non-zero kinds sit in the routes chunk (L0, L1) and in partition chunks (L2, L3, L4).
    const levels = encodeArena(p).slice(1).map((c) => describeChunk(c.bytes).level);
    expect(levels).toEqual(expect.arrayContaining([2, 3, 4]));
    const { loaded } = roundTrip(p);
    expect(kinds(loaded)).toBe('L0:1 L1:1 L2:1 L3:1 L4:1');
    // The other faces keep kind 0: the column is carried per face, not per level.
    expect(loaded.faces[1].kind[faceAt(loaded, 1, 2000, 1000)]).toBe(0);
  });

  it('a load gives each face record its key\'s half-edge as `outer` (and each hole entry its ring key\'s), and each vertex as `out` its first outgoing half-edge counter-clockwise from +x (C-0207 (5); checks/M0-a-15-notes.md note 2)', () => {
    let records = 0;
    let holes = 0;
    let moved = 0;
    for (let seed = 1; seed <= 6; seed++) {
      const p = randomArena(seed * 2_003, 80, seed % 2 === 0 ? ALONG_MIX : DEFAULT_MIX);
      const q = load(encodeArena(p), p);
      for (const level of LEVELS) {
        for (let f = 0; f < q.slots.face[level].top; f++) {
          if (!isFaceLive(q, level, f)) continue;
          records++;
          const [a, b] = faceKey(q, level, f);
          expect(startsOnKey(q, level, q.faces[level].outer[f], a, b), `L${level} face ${f}: outer`).toBe(true);
          for (const h of faceHoles(q, level, f)) {
            holes++;
            const k = ringKey(q, level, walkRing(q, level, h));
            expect(k !== null && startsOnKey(q, level, h, k[0], k[1]), `L${level} face ${f}: a hole entry`).toBe(true);
          }
        }
      }
      for (let v = 0; v < q.slots.vertex.top; v++) {
        if (!isVertexLive(q, v) || q.vertices.out[v] === -1) continue;
        expect(firstFromPlusX(q, q.vertices.out[v]), `vertex ${v}: out`).toBe(true);
      }
      // The original's stored starts are a history the block does not hold: some differ from the key's (so the test reads
      // the load's choice, not a coincidence of the generator).
      for (const level of LEVELS) {
        for (let f = 0; f < p.slots.face[level].top; f++) {
          if (!isFaceLive(p, level, f)) continue;
          const [a, b] = faceKey(p, level, f);
          if (!startsOnKey(p, level, p.faces[level].outer[f], a, b)) moved++;
        }
      }
    }
    expect(records).toBeGreaterThan(50);
    expect(holes).toBeGreaterThan(0);
    expect(moved).toBeGreaterThan(0);
  });

  it('an L4 chain ending inside a coarser route edge writes L4 splits, and they round-trip (§3.9 *Chunks*; checks/M0-a-15-notes.md note 7)', () => {
    // An L1 way across the square, an L3 plot line from it to the north side, and an L4 chain from inside the way's west
    // route edge to inside the plot line: both ends are L4 Steiner vertices on coarser route edges (an L1 and an L3 one).
    const p = framed();
    commit(p, 1, (o) => insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
    commit(p, 3, (o) => insertChain(o, [pt(2000, 2000), pt(2000, 4000)], [{ role: 'plot_line', entity: 'plot:1' }], 'mandatory'));
    commit(p, 4, (o) => insertChain(o, [pt(1000, 2000), pt(1000, 2500), pt(2000, 2500)], [{ role: 'yard_part', entity: 'building:1' }], 'mandatory'));
    const { chunks } = roundTrip(p);
    const l4 = chunks.slice(1).map((c) => describeChunk(c.bytes)).filter((s) => s.level === 4);
    expect(l4.length).toBe(1);
    expect(l4[0].splits).toBe(2);
    expect(l4[0].foreignRefs).toBeGreaterThanOrEqual(4);
  });

  it('a promotion round-trips: an L2 chain attracting onto an L3 plot line\'s Steiner end takes the vertex over (§2.2 rule 3; checks/M0-a-15-notes.md note 12)', () => {
    // M0-d-04's neighbour step in miniature (test/digest/levelDigest.test.ts): an L1 way, an L3 plot line ending on it
    // (an L3 Steiner vertex at (2000, 2000)), then an L2 chain from the south ending 15 cm off that end, which attracts
    // onto it and promotes it to L2.
    const p = framed();
    commit(p, 1, (o) => insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
    commit(p, 3, (o) => insertChain(o, [pt(2000, 3500), pt(2000, 2000)], [{ role: 'plot_line', entity: 'plot:1' }], 'mandatory'));
    const end = (q: Plat): number => {
      for (let v = 0; v < q.slots.vertex.top; v++) if (isVertexLive(q, v) && q.vertices.x[v] === 2000 && q.vertices.y[v] === 2000) return q.vertices.level[v];
      return -1;
    };
    const holding = (chunks: readonly { bytes: Uint8Array }[]): number[] =>
      chunks.slice(1).map((c) => describeChunk(c.bytes)).filter((s) => s.points.some(([x, y]) => x === 2000 && y === 2000)).map((s) => s.level);
    expect(end(p)).toBe(3);
    expect(holding(roundTrip(p).chunks)).toEqual([3]);
    const c = commit(p, 2, (o) => insertChain(o, [pt(2015, 1000), pt(2015, 1990)], [{ role: 'corridor_split', entity: 'way:n' }], 'mandatory'));
    expect(c.record?.promoted.length).toBe(1);
    expect(end(p)).toBe(2);
    const { chunks, loaded } = roundTrip(p);
    expect(end(loaded)).toBe(2);
    // The promoted vertex is written in the L2 partition now, as a split of the L1 way's route edge, and in no L3 chunk.
    expect(holding(chunks)).toEqual([2]);
  });

  it('sizes a loaded table at the smallest 64 · 2ᵏ above its count (C-0207 (11))', () => {
    expect([0, 1, 63, 64, 65, 127, 128, 129, 1000].map(roomFor)).toEqual([64, 64, 64, 128, 128, 128, 256, 256, 1024]);
  });

  it('the framed square alone: one routes chunk, one face, byte-identical', () => {
    const p = framed();
    const { chunks, loaded } = roundTrip(p);
    expect(chunks.length).toBe(1);
    expect(loaded.slots.face[0].live).toBe(1);
    expect(loaded.version).toBe(0);
  });

  // An explicit timeout (M0-a-02 notes N-c1-6): each case runs 5 – 6 s on one worker of a 4-core container, over vitest's
  // 5 s default; a timing here is informative only (not §12.1's reference), so the case's verdict is its assertions.
  for (const [name, mix] of [['default', DEFAULT_MIX], ['along', ALONG_MIX]] as const) {
    it(`random batch arenas (${name} mix): save → load → save byte-identical, equal, every hard invariant`, () => {
      const seen = { partitions: 0, l3: 0, splits: 0, holes: 0, foreign: 0 };
      const moves: LevelMoves = { promotions: 0, demotions: 0 };
      for (let seed = 1; seed <= 24; seed++) {
        const p = randomArena(seed * 7919, 120, mix, moves);
        const { chunks } = roundTrip(p);
        expect(encodeArena(p).length).toBe(chunks.length);
        for (const c of chunks.slice(1)) {
          const s = describeChunk(c.bytes);
          seen.partitions++;
          if (s.level === 3) seen.l3++;
          seen.splits += s.splits;
          seen.holes += s.holes;
          seen.foreign += s.foreignRefs;
        }
      }
      // The arenas reached what the block must carry: L2 and L3 partitions, Steiner splits, holes, cross-chunk references.
      expect(seen.partitions).toBeGreaterThanOrEqual(24);
      // The along mix draws L3 plot lines on the ways' routes (the default mix stops at L2 lanes).
      if (mix === ALONG_MIX) expect(seen.l3).toBeGreaterThan(0);
      expect(seen.splits).toBeGreaterThan(0);
      expect(seen.holes).toBeGreaterThan(0);
      expect(seen.foreign).toBeGreaterThan(0);
      // The header's claim, read by support.ts's tally (checks/M0-a-15-notes.md note 12): these batches demote birth
      // levels (§2.2 rule 3) on the arenas that are then round-tripped — a removed way leaves the lanes on it finer. They
      // do not promote by this reading (0 on both mixes), so the case 'a promotion round-trips …' holds promotions.
      expect(moves.demotions).toBeGreaterThan(0);
    }, 120_000);
  }
});
