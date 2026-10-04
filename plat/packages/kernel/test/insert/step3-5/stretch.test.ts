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
import { bandInterval, chainJournal } from '../../../src/insert/stretch.js';
import { allProblems, edgeRows, framed, halfEdgeBetween, indexed, ins, liveEdges, liveVertices, rowTexts, tx, vertexAtPoint } from './support.js';

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
