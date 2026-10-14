// M0-a-05: insertion step 3 — segment and stretch attraction (§3.6 *Attraction*, step 3; *Roles on shared stretches*,
// GEO-4). The item's listed tests "§13.1: a stretch whose join point lies within attractCm of an edge endpoint moves
// onto it", "§13.1: collinear overlapping edges (1 cm to the whole edge, same and opposite direction) give one shared
// stretch with merged roles" and "§13.1: coincident typed chains — a wall on a bank, a quay on a shore, a street on a
// district boundary — one edge, both roles, never a duplicate" are here, with the vertex rule (a segment passing a vertex
// within attractCm is routed through it — 25.997 cm is, 26.926 cm is not), the shallow crossing shared as a stretch and
// the steep one crossed on either side of minFaceAngle (4.9° / 5.1°), the journal's new and shared pairs, and the band
// reading (C-0177 (2)). Fix round 1 (the check's F-1: ST3, SJ1 and the vertex rule's mislabelled case) added the last
// three.
import { describe, expect, it } from 'vitest';
import { outgoing, roleIdOf, rowsOn, type Plat, type VertexId } from '../../../src/arena/index.js';
import { query } from '../../../src/index/index.js';
import { insertChain, nearestPiece } from '../../../src/insert/insertChain.js';
import { exitTowards, otherEnd, walkRun } from '../../../src/insert/snapRound.js';
import { bandInterval, chainJournal, subEdgeHolding, type ChainCtx } from '../../../src/insert/stretch.js';
import { suiteEnv, suiteReport } from '../../../src/invariants/index.js';
import { tx as txn } from '../../../src/tx/index.js';
import { spec } from '../../tx/support.js';
import { allProblems, edgeRows, framed, halfEdgeBetween, indexed, ins, liveEdges, liveVertices, pt, rowTexts, tx, vertexAtPoint } from './support.js';

/** How many live edges join the two lattice points (never more than one, §3.10). */
function edgesBetween(p: Plat, a: [number, number], b: [number, number]): number {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  return liveEdges(p).filter(([u, w]) => (X[u] === a[0] && Y[u] === a[1] && X[w] === b[0] && Y[w] === b[1]) || (X[w] === a[0] && Y[w] === a[1] && X[u] === b[0] && Y[u] === b[1])).length;
}

/** The frame and an L1 street (0, 2000)–(4000, 2000) with shape vertices at (1000, 2000) and (3000, 2000). */
function street(): Plat {
  const p = framed();
  const r = ins(tx(p, 1), [[0, 2000], [1000, 2000], [3000, 2000], [4000, 2000]], [{ role: 'way', entity: 'way:1' }]);
  expect(r.ok).toBe(true);
  expect(allProblems(p)).toEqual([]);
  return p;
}

describe('§13.1: a stretch whose join point lies within attractCm of an edge endpoint moves onto it', () => {
  it('a chain crossing the street at 2° near its shape vertex (1000, 2000): the join lands on that vertex, the stretch is shared, the leave point placed on the edge', () => {
    const p = street();
    // A line through (1760, 2000) at 2° (slope 0.035): it enters the 26 cm band beside the edge (1000, 2000)–(3000, 2000)
    // 745 cm before the crossing — at x ≈ 1015, its join's foot within attractCm of (1000, 2000) — and leaves it as far
    // after, at x ≈ 2505.
    const t = tx(p, 2);
    const r = ins(t, [[160, 2000 - 56], [3360, 2000 + 56]], [{ role: 'kerb', entity: 'way:2' }]);
    expect(r.ok).toBe(true);
    expect(allProblems(p)).toEqual([]);
    if (!r.ok) return;
    // The street's vertex (1000, 2000) is on the kerb chain: the join moved onto it (no new vertex within attractCm of it).
    const v = vertexAtPoint(p, 1000, 2000);
    expect(v).toBeGreaterThanOrEqual(0);
    const kerb = roleIdOf('kerb');
    const kerbEdges = outgoing(p, v).filter((h) => rowsOn(p, 'edge', h).some((row) => p.roles.kind[row] === kerb));
    expect(kerbEdges.length).toBeGreaterThanOrEqual(2);
    for (const w of liveVertices(p)) {
      if (w === v) continue;
      const d2 = (p.vertices.x[w] - 1000) ** 2 + (p.vertices.y[w] - 2000) ** 2;
      expect(d2).toBeGreaterThan(26 * 26);
    }
    // The shared stretch carries both rows; W_STRETCH_SHARED is reported.
    expect(r.warnings.map((w) => w.code)).toContain('W_STRETCH_SHARED');
    const along = outgoing(p, v).find((h) => p.vertices.y[p.halfEdges.origin[h ^ 1]] === 2000 && p.vertices.x[p.halfEdges.origin[h ^ 1]] > 1000);
    expect(along).toBeDefined();
    if (along !== undefined) {
      const names = rowsOn(p, 'edge', along).map((row) => p.roles.kind[row]);
      expect(names).toContain(roleIdOf('way'));
      expect(names).toContain(kerb);
    }
  });

  it('a join whose foot lies 25.1 cm from the vertex — beyond minEdge, within attractCm — still moves onto it (no vertex 25 – 26 cm from it)', () => {
    const p = street();
    // The same 2° line shifted 8 cm east: its band entry's foot on the edge is at x = 168 + 1600 − 26 / 0.035 ≈ 1025.14.
    const r = ins(tx(p, 2), [[168, 2000 - 56], [3368, 2000 + 56]], [{ role: 'kerb', entity: 'way:2' }]);
    expect(r.ok).toBe(true);
    expect(allProblems(p)).toEqual([]);
    if (!r.ok) return;
    expect(r.warnings.map((w) => w.code)).toContain('W_STRETCH_SHARED');
    const near = liveVertices(p).filter((v) => p.vertices.y[v] === 2000 && p.vertices.x[v] > 1000 && p.vertices.x[v] < 1100);
    expect(near).toEqual([]);
    const v = vertexAtPoint(p, 1000, 2000);
    expect(outgoing(p, v).some((h) => rowsOn(p, 'edge', h).some((row) => p.roles.kind[row] === roleIdOf('kerb')))).toBe(true);
  });

  it('the same chain moved so that its join\'s foot lies 30 cm from the vertex: the join is a new vertex on the edge, placed by the placement rule', () => {
    const p = street();
    const r = ins(tx(p, 2), [[205, 2000 - 56], [3405, 2000 + 56]], [{ role: 'kerb', entity: 'way:2' }]);
    expect(r.ok).toBe(true);
    expect(allProblems(p)).toEqual([]);
    // A new L2 vertex on the street's edge between (1000, 2000) and (3000, 2000), within the hot pixel of y = 2000.
    const onStreet = liveVertices(p).filter((v) => p.vertices.level[v] === 2 && Math.abs(p.vertices.y[v] - 2000) <= 0.71 && p.vertices.x[v] > 1000 && p.vertices.x[v] < 3000);
    expect(onStreet.length).toBeGreaterThanOrEqual(2); // the join and the leave point
  });
});

describe('§13.1: collinear overlapping edges (1 cm to the whole edge, same and opposite direction) give one shared stretch with merged roles', () => {
  const cases: { name: string; pts: [number, number][] }[] = [
    { name: '1 cm overlap at the end, same direction', pts: [[2999, 2000], [3600, 2000]] },
    { name: '1 cm overlap at the start, opposite direction', pts: [[1001, 2000], [400, 2000]] },
    { name: 'a 500 cm overlap inside the edge, same direction', pts: [[1500, 2000], [2000, 2000]] },
    { name: 'a 500 cm overlap inside the edge, opposite direction', pts: [[2000, 2000], [1500, 2000]] },
    { name: 'the whole edge, same direction', pts: [[1000, 2000], [3000, 2000]] },
    { name: 'the whole edge, opposite direction', pts: [[3000, 2000], [1000, 2000]] },
    { name: 'past both ends', pts: [[700, 2000], [3300, 2000]] },
  ];
  for (const c of cases) {
    it(c.name, () => {
      const p = street();
      const edgesBefore = liveEdges(p).length;
      const t = tx(p, 2);
      const r = ins(t, c.pts, [{ role: 'kerb', entity: 'way:2' }]);
      expect(r.ok).toBe(true);
      expect(allProblems(p)).toEqual([]);
      // The journal (C-0177 (8); the commit record's changed role keys, M0-a-06): the pairs carrying the kerb's row are
      // exactly the chain's new pairs and the existing pairs it shared, the two disjoint, every shared pair a street piece.
      const J = chainJournal(t);
      const kerbPairs = new Set<number>();
      for (const [u, w] of liveEdges(p)) {
        const h = outgoing(p, u).find((g) => p.halfEdges.origin[g ^ 1] === w) as number;
        if (rowsOn(p, 'edge', h).some((row) => p.roles.kind[row] === roleIdOf('kerb'))) kerbPairs.add(h >> 1);
      }
      const shared = new Set(J.sharedPairs);
      expect(shared.size).toBeGreaterThan(0);
      for (const e of J.newPairs) expect(shared.has(e)).toBe(false);
      expect([...new Set([...J.newPairs, ...J.sharedPairs])].sort((x, y) => x - y)).toEqual([...kerbPairs].sort((x, y) => x - y));
      for (const e of shared) expect(rowTexts(p, 2 * e)).toContain('way/way:1');
      if (c.name.startsWith('the whole edge')) {
        // Exactly the street's piece (1000, 2000)–(3000, 2000), nothing new.
        expect(J.sharedPairs).toEqual([halfEdgeBetween(p, [1000, 2000], [3000, 2000]) >> 1]);
        expect(J.newPairs).toEqual([]);
      }
      // No edge runs along another: every edge on y = 2000 is one edge carrying the street's row, and every part the
      // chain overlaps carries the kerb's row too (merged, never duplicated).
      const X = p.vertices.x;
      const Y = p.vertices.y;
      const kerb = roleIdOf('kerb');
      const way = roleIdOf('way');
      const lo = Math.min(c.pts[0][0], c.pts[1][0]);
      const hi = Math.max(c.pts[0][0], c.pts[1][0]);
      for (const [u, w] of liveEdges(p)) {
        if (Y[u] !== 2000 || Y[w] !== 2000) continue;
        const h = outgoing(p, u).find((g) => p.halfEdges.origin[g ^ 1] === w) as number;
        const rows = rowsOn(p, 'edge', h).map((row) => p.roles.kind[row]);
        const a = Math.min(X[u], X[w]);
        const b = Math.max(X[u], X[w]);
        if (a >= 1000 && b <= 3000) expect(rows.filter((k) => k === way)).toHaveLength(1);
        if (a >= Math.max(lo, 1000) && b <= Math.min(hi, 3000)) expect(rows).toContain(kerb);
        expect(rowTexts(p, h).length).toBe(new Set(rowTexts(p, h)).size);
      }
      // Nothing duplicated: the new edges are only the parts of the chain past the street's run.
      expect(liveEdges(p).length - edgesBefore).toBeLessThanOrEqual(4);
    });
  }
});

describe('§13.1: coincident typed chains — one edge, both roles, never a duplicate', () => {
  for (const [name, first, second] of [
    ['a wall on a bank', { level: 0, role: 'bank', entity: 'bank:1' }, { level: 1, role: 'wall', entity: 'wall:1' }],
    ['a quay on a shore', { level: 0, role: 'shore', entity: 'shore:1' }, { level: 1, role: 'way', entity: 'way:q' }],
    ['a street on a district boundary', { level: 1, role: 'district_bound', entity: 'district:1' }, { level: 1, role: 'way', entity: 'way:s' }],
  ] as const) {
    it(`${name}: exactly on it, and jittered within attractCm`, () => {
      for (const jitter of [0, 1, 7, 18]) { // at most 25.5 cm off each vertex: within attractCm
        const p = framed();
        const line: [number, number][] = [[300, 1000], [1300, 1400], [2500, 1300], [3700, 1900]];
        const r1 = ins(tx(p, first.level), line, [{ role: first.role, entity: first.entity }]);
        expect(r1.ok).toBe(true);
        const edgesBefore = liveEdges(p).length;
        const vertsBefore = liveVertices(p).length;
        const t2 = tx(p, second.level);
        const r2 = ins(t2, line.map(([x, y], i) => [x + (i % 2 === 0 ? jitter : -jitter), y + jitter] as [number, number]), [{ role: second.role, entity: second.entity }]);
        expect(r2.ok).toBe(true);
        expect(allProblems(p)).toEqual([]);
        expect(liveEdges(p).length).toBe(edgesBefore); // never a duplicate edge
        expect(liveVertices(p).length).toBe(vertsBefore);
        // The journal names the three shared edges and no new one.
        const sharedEdges = line.slice(1).map((b, i) => halfEdgeBetween(p, line[i], b) >> 1).sort((x, y) => x - y);
        expect([...new Set(chainJournal(t2).sharedPairs)].sort((x, y) => x - y)).toEqual(sharedEdges);
        expect(chainJournal(t2).newPairs).toEqual([]);
        for (let i = 0; i + 1 < line.length; i++) {
          expect(edgesBetween(p, line[i], line[i + 1])).toBe(1);
          const rows = edgeRows(p, line[i], line[i + 1]);
          expect(rows).toEqual([`${first.role}/${first.entity}`, `${second.role}/${second.entity}`].sort());
        }
        if (r2.ok) expect(r2.warnings.map((w) => w.code)).toContain('W_STRETCH_SHARED');
      }
    });
  }
});

describe('step 3\'s vertex rule: a segment passing within attractCm (26 cm, inclusive) of a vertex is routed through it', () => {
  // The chain (600 + off, 1000) → (1400 + off, 3000) crosses the street steeply; the street's shape vertex (1000, 2000)
  // lies |off| · 2000 / √(800² + 2000²) ≈ 0.9285 |off| cm from its line. Whether it is routed through the vertex is the
  // exact integer test (2000 · off)² ≤ 26² · (800² + 2000²) — the distance read from the lattice points, not from the table.
  // off = ±28 puts the vertex 25.997 cm from the line (routed); off = ±29, 26.926 cm (not routed); off = ±27, 25.07 cm.
  for (const off of [0, 1, -1, 24, 26, -26, 27, -27, 28, -28, 29, -29, -30]) {
    const dist = (Math.abs(off) * 2000) / Math.hypot(800, 2000);
    const routed = (2000 * off) ** 2 <= 26 * 26 * (800 * 800 + 2000 * 2000);
    it(`a segment passing ${dist.toFixed(3)} cm (off = ${off}) from the street's shape vertex (1000, 2000) is${routed ? '' : ' not'} routed through it`, () => {
      const p = street();
      const r = ins(tx(p, 2), [[600 + off, 1000], [1400 + off, 3000]], [{ role: 'kerb', entity: 'way:x' }]);
      expect(r.ok).toBe(true);
      expect(allProblems(p)).toEqual([]);
      const v = vertexAtPoint(p, 1000, 2000);
      const kerb = roleIdOf('kerb');
      const onChain = outgoing(p, v).some((h) => rowsOn(p, 'edge', h).some((row) => p.roles.kind[row] === kerb));
      expect(onChain).toBe(routed);
      // Not routed through it: the chain crosses the street at a vertex of its own, beside it.
      const crossings = liveVertices(p).filter((w) => p.vertices.level[w] === 2 && p.vertices.y[w] === 2000);
      expect(crossings).toHaveLength(routed ? 0 : 1);
    });
  }
});

describe('step 3: a crossing shallower than minFaceAngle (5°) is a stretch; one at 5° or steeper is a crossing', () => {
  // An L2 segment of half-length 9 m through (2000, 2000) at deg° to the street: its band (26 cm either side) spans
  // ≈ 2 · 26 / sin(deg°) — 6.1 m at 4.9°, inside both the segment and the street's edge (1000, 2000)–(3000, 2000).
  for (const [deg, stretch] of [[4.5, true], [4.9, true], [5.1, false], [6, false], [8, false]] as const) {
    it(`at ${deg}°: ${stretch ? 'a stretch (W_STRETCH_SHARED, a join and a leave vertex on the street)' : 'one crossing vertex, nothing shared'}`, () => {
      const p = street();
      const rad = (deg * Math.PI) / 180;
      const a: [number, number] = [Math.round(2000 - 900 * Math.cos(rad)), Math.round(2000 - 900 * Math.sin(rad))];
      const b: [number, number] = [Math.round(2000 + 900 * Math.cos(rad)), Math.round(2000 + 900 * Math.sin(rad))];
      // The lattice segment's own angle stays on the same side of 5° as the table's (its endpoints rounded ≤ 0.5 cm).
      const own = (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
      expect(own < 5).toBe(stretch);
      const t = tx(p, 2);
      const r = ins(t, [a, b], [{ role: 'kerb', entity: 'way:2' }]);
      expect(r.ok).toBe(true);
      expect(allProblems(p)).toEqual([]);
      if (!r.ok) return;
      expect(r.warnings.map((w) => w.code).includes('W_STRETCH_SHARED')).toBe(stretch);
      const onStreet = liveVertices(p).filter((v) => p.vertices.level[v] === 2 && Math.abs(p.vertices.y[v] - 2000) <= 0.71);
      expect(onStreet).toHaveLength(stretch ? 2 : 1);
      expect(chainJournal(t).sharedPairs.length > 0).toBe(stretch);
    });
  }
});

describe('a stretch lies inside the segment (C-0177 (2))', () => {
  it('a segment leaving a vertex that stands 25 cm beside a street, drifting away from it, shares nothing: one new edge, no vertex on the street', () => {
    // Hand-built (insertion would attract a vertex that close): the frame, the L1 street (0, 2000)–(4000, 2000) and an
    // L1 antenna from (1500, 3000) down to (1500, 2025). The chain (1500, 2025) → (2500, 2040) is within attractCm of the
    // street over its first 67 cm only — from its own end, which clearance already keeps at minEdge: no approach.
    const b = indexed({
      vertices: [[0, 0, 0], [4000, 0, 0], [4000, 4000, 0], [0, 4000, 0], [0, 2000, 1], [4000, 2000, 1], [1500, 3000, 1], [1500, 2025, 1]],
      edges: [[0, 1, 0], [1, 5, 0], [5, 2, 0], [2, 3, 0], [3, 4, 0], [4, 0, 0], [4, 5, 1], [6, 7, 1]],
    });
    const p = b.plat;
    expect(allProblems(p)).toEqual([]);
    const r = ins(tx(p, 2), [[1500, 2025], [2500, 2040]], [{ role: 'kerb', entity: 'way:k' }]);
    expect(r.ok).toBe(true);
    expect(allProblems(p)).toEqual([]);
    if (!r.ok) return;
    expect(r.warnings.map((w) => w.code)).not.toContain('W_STRETCH_SHARED');
    expect(edgeRows(p, [1500, 2025], [2500, 2040])).toEqual(['kerb/way:k']);
    expect(liveVertices(p).filter((v) => p.vertices.y[v] === 2000 && p.vertices.x[v] > 0 && p.vertices.x[v] < 4000)).toEqual([]);
  });
});

describe('shallow crossings are shared stretches; steep ones are crossings', () => {
  it('a chain crossing the street at 3° shares a stretch of it (W_STRETCH_SHARED); at 30° it makes one crossing vertex', () => {
    for (const [deg, stretch] of [[3, true], [30, false]] as const) {
      const p = street();
      const rad = (deg * Math.PI) / 180;
      const half = 1200;
      const cx = 2000;
      const r = ins(tx(p, 2), [[Math.round(cx - half * Math.cos(rad)), Math.round(2000 - half * Math.sin(rad))], [Math.round(cx + half * Math.cos(rad)), Math.round(2000 + half * Math.sin(rad))]], [{ role: 'kerb', entity: 'way:2' }]);
      expect(r.ok).toBe(true);
      expect(allProblems(p)).toEqual([]);
      if (!r.ok) continue;
      expect(r.warnings.map((w) => w.code).includes('W_STRETCH_SHARED')).toBe(stretch);
      const onStreet = liveVertices(p).filter((v) => p.vertices.level[v] === 2 && Math.abs(p.vertices.y[v] - 2000) <= 0.71);
      expect(onStreet.length).toBe(stretch ? 2 : 1);
    }
  });

  it('bandInterval reads the band beside the edge\'s interior only (C-0177 (2))', () => {
    // A segment parallel to (0, 0)–(1000, 0) at 20 cm: inside the band over x ∈ [0, 1000].
    const b = bandInterval(-500, 20, 1500, 20, 0, 0, 1000, 0);
    expect(b).not.toBeNull();
    expect(b?.lo).toBeCloseTo(0.25, 12);
    expect(b?.hi).toBeCloseTo(0.75, 12);
    // At 27 cm: nowhere.
    expect(bandInterval(-500, 27, 1500, 27, 0, 0, 1000, 0)).toBeNull();
    // Beyond the edge's end (only the end disk would hold it): nothing.
    expect(bandInterval(1010, -100, 1010, 100, 0, 0, 1000, 0)).toBeNull();
  });
});

/** A guard that the helper above reads the vertex it names. */
it('vertexAtPoint finds a vertex by its lattice point', () => {
  const p = street();
  const v: VertexId = vertexAtPoint(p, 3000, 2000);
  expect(v).toBeGreaterThanOrEqual(0);
});

// RQ3 (N-61 (3); item 130 (e), §3.6 *Roles on shared stretches*; census R-42, Q68): a chain given again under a key that
// already carries a run IS that run — each point lands on the run's vertex within √2 · attractCm (the bound the first
// insertion moved it by), each segment follows the run between two landings, nothing is added. The fixture: a closed
// mandatory `wall` ring (`enceinte:9`, L1) — a diamond whose sides run at 45°, so a copy moved (22, 20) (29.7 cm,
// between attractCm and √2 · attractCm) puts each point 1.4 cm off the side leaving its corner and 29.7 cm along it:
// before the round its foot lay beyond attractCm of the corner, the copy split the run there and chorded the next
// corner, and the key branched (the rulings' probe P2's case D, refused '(wall, enceinte:9) branches' at the commit).
// A copy 40 cm off is another chain under the key: §3.10's role consistency refuses it at the commit.
describe('RQ3 (item 130 (e)): a chain given again under its own key is that run — absorbed, nothing new', () => {
  const DIAMOND: readonly (readonly [number, number])[] = [[10000, 6000], [12000, 8000], [14000, 10000], [12000, 12000], [10000, 14000], [8000, 12000], [6000, 10000], [8000, 8000]];
  const KEY = [{ role: 'wall', entity: 'enceinte:9' }];
  const moved = (dx: number, dy: number): [number, number][] => DIAMOND.map(([x, y]) => [x + dx, y + dy]);
  /** The arena's edges and their rows, as text (the absorbed copy leaves it unchanged). */
  const edgesText = (p: Plat): string => {
    const X = p.vertices.x;
    const Y = p.vertices.y;
    return liveEdges(p).map(([u, w]) => `${X[u]},${Y[u]}-${X[w]},${Y[w]}:${rowTexts(p, halfEdgeBetween(p, [X[u], Y[u]], [X[w], Y[w]])).join('|')}`).sort().join('\n');
  };
  const first = (): { p: Plat; placed: VertexId[] } => {
    const p = framed(20000);
    const r = ins(tx(p, 1), DIAMOND, KEY, 'mandatory', { closed: true });
    expect(r.ok).toBe(true);
    if (!r.ok) throw new Error('the first copy commits');
    return { p, placed: r.value.placed };
  };

  for (const [label, dx, dy] of [['identical', 0, 0], ['moved (15, −12), 19.2 cm', 15, -12], ['moved (22, 20), 29.7 cm', 22, 20], ['moved (26, 25), 36.1 cm', 26, 25]] as const) {
    it(`${label}, in a later batch: committed as the run — every point on the first copy's vertex, the edges and their rows unchanged`, () => {
      const { p, placed } = first();
      const before = edgesText(p);
      const vertices = liveVertices(p).length;
      const r = ins(tx(p, 1), moved(dx, dy), KEY, 'mandatory', { closed: true });
      expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
      if (!r.ok) return;
      expect(r.value.placed).toEqual(placed);
      expect(edgesText(p)).toBe(before);
      expect(liveVertices(p).length).toBe(vertices);
      expect(r.warnings.map((w) => w.code)).toContain('W_STRETCH_SHARED');
      expect(r.warnings.some((w) => w.code === 'W_ATTRACTED')).toBe(dx !== 0 || dy !== 0);
      expect(allProblems(p)).toEqual([]);
    });
  }

  it('moved (22, 20) in the same batch as the first copy (the edge suite\'s plant shape) and through M0-a-06\'s transaction with the suite: the batch commits, the key one simple ring', () => {
    const p = framed(20000);
    const r = txn(p, spec(1), (o) => {
      const a = insertChain(o, DIAMOND.map(([x, y]) => pt(x, y)), KEY, 'mandatory', { closed: true });
      if (!a.ok) return a;
      return insertChain(o, moved(22, 20).map(([x, y]) => pt(x, y)), KEY, 'mandatory', { closed: true });
    }, suiteEnv({ report: suiteReport() }));
    expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
    expect(liveEdges(p).filter(([u, w]) => (edgeRows(p, [p.vertices.x[u], p.vertices.y[u]], [p.vertices.x[w], p.vertices.y[w]]) ?? []).includes('wall/enceinte:9'))).toHaveLength(8);
    expect(allProblems(p)).toEqual([]);
  });

  // (ii) the walk: two consecutive landings that are not neighbours on the run are joined along it, never by a chord. A
  // wall polyline zig-zagging 50 cm (beyond attractCm, within the bound) given again by every other point: each new
  // segment follows the run through the skipped vertex (mutant RQ3-walk: a chord 50 cm off it, a new edge, the key
  // branching).
  it('given again by every other point of a 50 cm zig-zag: each segment walks the run through the skipped vertex, nothing added', () => {
    const p = framed(20000);
    const zig: [number, number][] = [[10000, 10000], [10300, 10050], [10600, 10000], [10900, 10050], [11200, 10000]];
    const KEY2 = [{ role: 'wall', entity: 'enceinte:10' }];
    const r1 = ins(tx(p, 1), zig, KEY2, 'mandatory');
    expect(r1.ok).toBe(true);
    const before = edgesText(p);
    const r2 = ins(tx(p, 1), [zig[0], zig[2], zig[4]], KEY2, 'mandatory');
    expect(r2.ok, r2.ok ? '' : `${r2.code} ${r2.detail}`).toBe(true);
    if (!r2.ok) return;
    expect(edgesText(p)).toBe(before);
    expect(r2.warnings.filter((w) => w.code === 'W_STRETCH_SHARED').map((w) => w.count)).toEqual([4]);
    expect(allProblems(p)).toEqual([]);
  });

  it('moved (28, 29), 40.3 cm — beyond √2 · attractCm: another chain under the key; through the transaction the batch is refused by role consistency, nothing written', () => {
    const { p } = first();
    const before = edgesText(p);
    const r = txn(p, spec(1), (o) => insertChain(o, moved(28, 29).map(([x, y]) => pt(x, y)), KEY, 'mandatory', { closed: true }), suiteEnv({ report: suiteReport() }));
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.code).toBe('E_INVARIANT');
    expect(r.detail).toContain('(wall, enceinte:9)');
    expect(edgesText(p)).toBe(before);
  });
});

// N-c1-6, N-c2-2, N-c2-3 (the hardening round S9): the walks' exact ties, each a stated rule no fixture held before.
// SH1: a position projecting exactly onto a run vertex takes the sub-edge after it (`subEdgeHolding`); OE1: `otherEnd`
// from that vertex takes the vertex before it; EX1: `exitTowards` leaves by the route neighbour nearer the target; PF1: a
// shared piece through two finer vertices gains the chain's rows on every sub-edge; NP1: of two route pieces equally near
// a step-2 point, `nearestPiece` names the first in the index query's order.
describe('N-c1-6 / N-c2-3: the walks\' exact ties and a piece through two finer vertices', () => {
  /** The frame (0 – 4 000) and an L1 run A (1 000, 2 000) – M (2 000, 2 000) – B (3 000, 2 000), M an L3 vertex on it. */
  const run = (): Plat => indexed({
    vertices: [[0, 0, 0], [4000, 0, 0], [4000, 4000, 0], [0, 4000, 0], [1000, 2000, 1], [2000, 2000, 3], [3000, 2000, 1]],
    edges: [[0, 1, 0], [1, 2, 0], [2, 3, 0], [3, 0, 0], [4, 5, 1], [5, 6, 1]],
  }).plat;
  const ctxAt = (p: Plat, n: 0 | 1 | 2 | 3 | 4): ChainCtx => {
    const t = tx(p, n);
    return { tx: t, p, n, cls: 'mandatory', rows: [], warnings: [], journal: chainJournal(t), pairsFrom: 0, txPairsFrom: 0, maxPass: 0, strict: false, undo: [] };
  };

  it('SH1: a position projecting exactly onto the run vertex M takes the sub-edge after it, M – B; one just before M takes A – M', () => {
    const p = run();
    const [a, m, b] = [vertexAtPoint(p, 1000, 2000), vertexAtPoint(p, 2000, 2000), vertexAtPoint(p, 3000, 2000)];
    const c = ctxAt(p, 1);
    expect(subEdgeHolding(c, { a, b }, 2000, 1990)).toEqual([m, b]);
    expect(subEdgeHolding(c, { a, b }, 1999, 1990)).toEqual([a, m]);
  });

  it('OE1: from M, a position projecting exactly onto M takes the vertex before it (A); one beyond M takes B', () => {
    const p = run();
    const [a, m, b] = [vertexAtPoint(p, 1000, 2000), vertexAtPoint(p, 2000, 2000), vertexAtPoint(p, 3000, 2000)];
    const c = ctxAt(p, 1);
    expect(otherEnd(c, { a, b }, 2000, 2010, m)).toBe(a);
    expect(otherEnd(c, { a, b }, 2001, 2010, m)).toBe(b);
  });

  it('EX1: from a vertex with two route neighbours at different distances, the exit is the one nearer the target — each way round', () => {
    const p = indexed({
      vertices: [[0, 0, 0], [4000, 0, 0], [4000, 4000, 0], [0, 4000, 0], [2000, 2000, 1], [2500, 2000, 1], [2000, 2600, 1]],
      edges: [[0, 1, 0], [1, 2, 0], [2, 3, 0], [3, 0, 0], [4, 5, 1], [4, 6, 1]],
    }).plat;
    const c = ctxAt(p, 1);
    const v = vertexAtPoint(p, 2000, 2000);
    expect(exitTowards(c, v, 2400, 2100)).toBe(vertexAtPoint(p, 2500, 2000));
    expect(exitTowards(c, v, 2100, 2400)).toBe(vertexAtPoint(p, 2000, 2600));
  });

  it('PF1: an L1 chain along an L1 street through two L3 plot-line ends shares every sub-edge of the piece between its ends', () => {
    const p = framed();
    expect(ins(tx(p, 1), [[0, 2000], [4000, 2000]], [{ role: 'way', entity: 'way:1' }]).ok).toBe(true);
    expect(ins(tx(p, 3), [[1500, 3500], [1500, 2000]], [{ role: 'plot_line', entity: 'plot:1' }]).ok).toBe(true);
    expect(ins(tx(p, 3), [[2500, 3500], [2500, 2000]], [{ role: 'plot_line', entity: 'plot:2' }]).ok).toBe(true);
    const r = ins(tx(p, 1), [[1000, 2000], [3000, 2000]], [{ role: 'way', entity: 'way:2' }]);
    expect(r.ok).toBe(true);
    for (const [x0, x1] of [[1000, 1500], [1500, 2500], [2500, 3000]]) expect(edgeRows(p, [x0, 2000], [x1, 2000])).toEqual(['way/way:1', 'way/way:2']);
    expect(allProblems(p)).toEqual([]);
  });

  // N-5 (mutant K15): the stretch walk never steps past its leave point k. From j two L1 edges lie on towards k within
  // the walk's 2 cm band of the run's line: to k (1 025, 2 002), 2 cm off, and to w (1 050, 1 999), 1 cm off and past k.
  // The walk takes the nearer-the-line step only among those not past k, so it reaches k in one step; without the guard
  // it steps to w and on past k, and ends with null (the ordinary route then). The corner at j is 5.7°, k stands 25.2 cm
  // from w, and k lies within minEdge of j – w only as j's neighbour (§3.10's one-ring).
  it('N-5: the stretch walk from j takes the step to its leave point k, not the one nearer the line past k', () => {
    const p = indexed({
      vertices: [[0, 0, 0], [4000, 0, 0], [4000, 4000, 0], [0, 4000, 0], [1000, 2000, 1], [1025, 2002, 1], [1050, 1999, 1], [3000, 2000, 1]],
      edges: [[0, 1, 0], [1, 2, 0], [2, 3, 0], [3, 0, 0], [4, 5, 1], [4, 6, 1], [6, 7, 1]],
    }).plat;
    const c = ctxAt(p, 1);
    const [j, k, b] = [vertexAtPoint(p, 1000, 2000), vertexAtPoint(p, 1025, 2002), vertexAtPoint(p, 3000, 2000)];
    const piece = { runA: j, runB: b, edge: halfEdgeBetween(p, [1000, 2000], [1050, 1999]) };
    expect(walkRun(c, piece, j, k)).toEqual([halfEdgeBetween(p, [1000, 2000], [1025, 2002])]);
  });

  it('NP1: of two L1 pieces equally near a point (20 cm above and below), nearestPiece names the first in the index query\'s order', () => {
    const p = indexed({
      vertices: [[0, 0, 0], [4000, 0, 0], [4000, 4000, 0], [0, 4000, 0], [1000, 1980, 1], [3000, 1980, 1], [1000, 2020, 1], [3000, 2020, 1]],
      edges: [[0, 1, 0], [1, 2, 0], [2, 3, 0], [3, 0, 0], [4, 5, 1], [6, 7, 1]],
    }).plat;
    const c = ctxAt(p, 1);
    const box = { minX: 2000 - 26, minY: 2000 - 26, maxX: 2000 + 26, maxY: 2000 + 26 };
    const order = query(p, c.tx.key, 1, box, { edges: true }).edges;
    expect(order).toHaveLength(2);
    const r = nearestPiece(c, pt(2000, 2000));
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value?.edge).toBe(order[0]);
  });
});
