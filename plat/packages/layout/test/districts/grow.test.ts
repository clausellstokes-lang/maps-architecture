// The grower (M0-e-04; §4.5 *Grower*; §6.1 `district.seed`; §5.2 F-WORK; C-0085) on small grids: round-robin turns in
// seed-id order, the skip by rate, the uniform pick among the admissible neighbours in canonical order, the edge test
// (an arterial ≥ primary, a wall, water, a reservation stop growth; a secondary does not), the patch test (the band's
// top, the compactness floor, no hole), the leftover rule, the merge rule with the seed-rate exception and its hole
// check, F-WORK's work_cut with its runs held to the edge test on every shared edge, the degenerate face's merge, and
// the Polsby–Popper measure.
import { createRng, entityKey, CONCERNS, STAGES, type LineageHash, type Stream } from '@plat/kernel';
import { lineageHash } from '@plat/model';
import { describe, expect, it } from 'vitest';
import { BARRIER, boundaryLoops, EDGE_TEST_BARRIERS, faceLineage, grow, hullCompactness, placeSeeds, polsbyPopper, textLineage, type CoarseFace, type FaceGraph, type FaceLink, type GrowOptions, type GrowSeed, type SeedKind, type TurnStream } from '../../src/index.js';
import { cell, claimableOf, graphOf, GROUND, gridArena, layChain, P, rectArena } from './support.js';

const S6 = STAGES.S6;

function seed(order: number, face: number, kind: SeedKind = 'remainder', rate = 1): GrowSeed {
  return { order, kind, face, lineage: textLineage(`seed:${String(order)}`), rate };
}

/** The real turn streams: `district.seed` keyed by (lineage, turn). */
function realStream(seedNo = 1): TurnStream {
  const rng = createRng();
  return (lineage, turn) => rng.stream(entityKey([seedNo, 2, 3, 4], lineageHash({ arena: GROUND, unit: lineage, stage: S6, epoch: 0, index: turn, reroll: 0 }), GROUND), S6, CONCERNS['district.seed'], { reroll: 0, attempt: 0, epoch: 0, salt: 0 });
}

/** A stream whose uniforms and picks are scripted (per turn: [skip uniform, pick index]). */
function scripted(plan: (seed: number, turn: number) => { u: number; pick: number }, seedOf: (l: Readonly<LineageHash>) => number): TurnStream {
  return (lineage, turn) => {
    const p = plan(seedOf(lineage), turn);
    return { bool: (x: number) => p.u < x, int: (lo: number, hi: number) => Math.min(hi, lo + p.pick), float01: () => p.u } as unknown as Stream;
  };
}

const CELL = 10_000 * 10_000; // one 100 m cell, cm²
const OPEN: GrowOptions = { bandCm2: [0, 1e15], compactnessMin: 0.5, turnLimit: 100_000, leftoverRate: 1 };

describe('round-robin turns in seed-id order, the skip by rate, the uniform pick', () => {
  it('a round gives every unfinished grower one turn in seed-id order; each turn its own (lineage, turn) stream', () => {
    const a = gridArena(6, 4, 100, () => 'secondary');
    const g = graphOf(a);
    const r = grow([seed(0, cell(a, g, 0, 0)), seed(1, cell(a, g, 5, 3))], { graph: g, claimable: claimableOf(g) }, realStream(), OPEN);
    // The log alternates 0, 1, 0, 1 … while both are unfinished, each grower's turns numbered 0, 1, 2, …
    const both = r.log.slice(0, 8);
    expect(both.map((l) => l.seed)).toEqual([0, 1, 0, 1, 0, 1, 0, 1]);
    expect(both.map((l) => l.turn)).toEqual([0, 0, 1, 1, 2, 2, 3, 3]);
    // Every face is held: 24 cells between the two.
    expect([...r.owner].every((o) => o >= 0 || o === -1)).toBe(true);
    expect(r.grown[0].faces.length + r.grown[1].faces.length).toBe(24);
  });

  it('a seed of rate 0 always skips; one of rate 1 never does (the skip is bool(rate) on the turn stream)', () => {
    const a = gridArena(4, 3, 100, () => 'secondary');
    const g = graphOf(a);
    const r = grow([seed(0, cell(a, g, 0, 0), 'gate', 0), seed(1, cell(a, g, 3, 2))], { graph: g, claimable: claimableOf(g) }, realStream(), OPEN);
    expect(r.workCut).toBe(false);
    const slow = r.log.filter((l) => l.seed === 0);
    expect(slow.some((l) => l.what === 'absorb')).toBe(false);
    // It skips every turn until its neighbours are taken, then it is finished.
    expect(slow.slice(0, -1).every((l) => l.what === 'skip')).toBe(true);
    expect(slow[slow.length - 1].what).toBe('done');
    expect(r.log.filter((l) => l.seed === 1).some((l) => l.what === 'skip')).toBe(false);
    expect(r.grown[0].faces.length).toBe(1);
  });

  it('a skip is drawn first: a uniform at or above the rate skips, below it absorbs', () => {
    const a = gridArena(3, 1, 100, () => 'secondary');
    const g = graphOf(a);
    const s0 = seed(0, cell(a, g, 0, 0), 'riverbank', 0.5);
    const at = (u: number) => grow([s0], { graph: g, claimable: claimableOf(g) }, scripted(() => ({ u, pick: 0 }), () => 0), { ...OPEN, turnLimit: 1 });
    expect(at(0.5).log[0].what).toBe('skip');
    expect(at(0.49).log[0].what).toBe('absorb');
  });

  it('the pick is int(0, n − 1) over the admissible neighbours in canonical face order', () => {
    // A seed in the middle of a 3 × 3 grid has four neighbours; pick k takes the k-th in face order.
    const a = gridArena(3, 3, 100, () => 'secondary');
    const g = graphOf(a);
    const mid = cell(a, g, 1, 1);
    const nb = [cell(a, g, 0, 1), cell(a, g, 2, 1), cell(a, g, 1, 0), cell(a, g, 1, 2)].sort((x, y) => x - y);
    for (let k = 0; k < 4; k += 1) {
      const r = grow([seed(0, mid)], { graph: g, claimable: claimableOf(g) }, scripted(() => ({ u: 0, pick: k }), () => 0), { ...OPEN, turnLimit: 1 });
      expect(r.log[0]).toEqual({ seed: 0, turn: 0, what: 'absorb', face: nb[k] });
    }
  });
});

describe('the edge test (§4.5): no arterial of class ≥ primary, no wall, no water, no reservation boundary', () => {
  it('a primary or through line stops growth; a secondary line does not', () => {
    for (const cls of ['primary', 'through', 'secondary'] as const) {
      const a = gridArena(4, 2, 100, (dir, i) => (dir === 'x' && i === 2 ? cls : 'secondary'));
      const g = graphOf(a);
      const r = grow([seed(0, cell(a, g, 0, 0))], { graph: g, claimable: claimableOf(g) }, realStream(), { ...OPEN, compactnessMin: 0 });
      const crossed = r.grown[0].faces.some((f) => f === cell(a, g, 2, 0) || f === cell(a, g, 3, 1));
      expect(crossed).toBe(cls === 'secondary');
      // Beyond the barrier the leftover rule seeds its own district.
      expect(r.leftovers.length).toBe(cls === 'secondary' ? 0 : 1);
    }
  });

  it('every edge a face shares with the patch must pass: one secondary side does not admit a face across a primary one', () => {
    // 2 × 2: the vertical line primary below, secondary above; the horizontal line secondary. The patch {(0,0), (0,1),
    // (1,1)} meets (1,0) across the primary segment (from (0,0)) and a secondary one (from (1,1)): refused.
    const a = gridArena(2, 2, 100, (dir, _i, sg) => (dir === 'x' && sg === 0 ? 'primary' : 'secondary'));
    const g = graphOf(a);
    const c00 = cell(a, g, 0, 0);
    const r = grow([seed(0, c00)], { graph: g, claimable: claimableOf(g) }, realStream(), { ...OPEN, compactnessMin: 0 });
    expect(r.grown[0].faces.slice().sort((x, y) => x - y)).toEqual([c00, cell(a, g, 0, 1), cell(a, g, 1, 1)].sort((x, y) => x - y));
    expect(r.owner[cell(a, g, 1, 0)]).not.toBe(0);
  });

  it('a reservation boundary stops growth (the reserved cell is no claimable face, its ring no shared edge)', () => {
    const a = gridArena(3, 1, 100, () => 'secondary', [{ i: 1, j: 0, owner: 'plaza:0' }]);
    const g = graphOf(a);
    const r = grow([seed(0, cell(a, g, 0, 0))], { graph: g, claimable: claimableOf(g) }, realStream(), OPEN);
    expect(r.grown[0].faces).toEqual([cell(a, g, 0, 0)]);
    expect(r.leftovers.length).toBe(1);
  });

  it('a kind the edge test allows a barrier crosses it (the allows hook); none is allowed one by default', () => {
    const a = gridArena(2, 1, 100, () => 'primary');
    const g = graphOf(a);
    const base = grow([seed(0, cell(a, g, 0, 0), 'market')], { graph: g, claimable: claimableOf(g) }, realStream(), OPEN);
    expect(base.grown[0].faces.length).toBe(1);
    const allowed = grow([seed(0, cell(a, g, 0, 0), 'market')], { graph: g, claimable: claimableOf(g) }, realStream(), { ...OPEN, allows: (k) => (k === 'market' ? 1 : 0) });
    expect(allowed.grown[0].faces.length).toBe(2);
  });
});

describe('the patch test (§4.5): area within the band, compactness ≥ 0.5, no hole', () => {
  it('the band top stops a grower: no district grows past it', () => {
    const a = gridArena(5, 5, 100, () => 'secondary');
    const g = graphOf(a);
    for (const top of [1, 3, 7]) {
      const r = grow([seed(0, cell(a, g, 0, 0))], { graph: g, claimable: claimableOf(g) }, realStream(), { ...OPEN, bandCm2: [0, top * CELL] });
      expect(r.grown[0].faces.length).toBe(top);
      expect(r.grown[0].areaCm2).toBeLessThanOrEqual(top * CELL);
    }
  });

  it('a patch never absorbs a face that would drop its compactness below the floor (an L-shaped corridor)', () => {
    // A 9 × 9 grid reserved but for its bottom row and left column: a one-cell L of 17 claimable cells. Seeded at the
    // bottom row's far end, the patch runs along the row (a strip: compactness 1) and turns up the column; with k cells
    // up, its area is 9 + k cells and its hull's 5k + 9, so k = 3 holds 12 ÷ 24 = 0.5 and k = 4 would fall to 13 ÷ 29.
    const owned = [];
    for (let i = 1; i <= 8; i += 1) for (let j = 1; j <= 8; j += 1) owned.push({ i, j, owner: 'plaza:0' });
    const a = gridArena(9, 9, 100, () => 'secondary', owned);
    const g = graphOf(a);
    const cl = claimableOf(g);
    const r = grow([seed(0, cell(a, g, 8, 0))], { graph: g, claimable: cl }, realStream(3), OPEN);
    expect(r.grown[0].faces.length).toBe(12);
    expect(hullCompactness(g, r.grown[0].faces, r.grown[0].areaCm2)).toBeCloseTo(0.5, 9);
    for (let k = 1; k <= 3; k += 1) expect(r.owner[cell(a, g, 0, k)]).toBe(0);
    expect(r.owner[cell(a, g, 0, 4)]).not.toBe(0);
    // Every patch the grower held passed the patch test: replay its absorptions.
    const held: number[] = [r.grown[0].seed.face];
    let area = g.faces[held[0]].areaCm2;
    for (const l of r.log.filter((x) => x.seed === 0 && x.what === 'absorb')) {
      held.push(l.face as number);
      area += g.faces[l.face as number].areaCm2;
      expect(hullCompactness(g, held, area)).toBeGreaterThanOrEqual(0.5);
      expect(boundaryLoops(g, held, (i) => held.includes(i))).toBe(1);
    }
    // With no compactness floor it takes the whole L.
    const loose = grow([seed(0, cell(a, g, 8, 0))], { graph: g, claimable: cl }, realStream(3), { ...OPEN, compactnessMin: 0 });
    expect(loose.grown[0].faces.length).toBe(17);
    // And at 0.45 it stops one cell later (13 ÷ 29 = 0.448 < 0.45 < 12 ÷ 24).
    expect(grow([seed(0, cell(a, g, 8, 0))], { graph: g, claimable: cl }, realStream(3), { ...OPEN, compactnessMin: 0.44 }).grown[0].faces.length).toBe(13);
  });

  it('a ring around a reserved core: the cell that would close it (a hole) is never absorbed', () => {
    const owned = [];
    for (let i = 1; i <= 3; i += 1) for (let j = 1; j <= 3; j += 1) owned.push({ i, j, owner: 'plaza:0' });
    const a = gridArena(5, 5, 100, () => 'secondary', owned);
    const g = graphOf(a);
    const loose = grow([seed(0, cell(a, g, 0, 0))], { graph: g, claimable: claimableOf(g) }, realStream(3), { ...OPEN, compactnessMin: 0 });
    expect(loose.grown[0].faces.length).toBe(15);
    expect(loose.leftovers.length).toBe(1);
    expect(boundaryLoops(g, loose.grown[0].faces, (i) => loose.grown[0].faces.includes(i))).toBe(1);
  });

  it('a face whose absorption encloses a hole is refused (the enclosed face splits off as its own district)', () => {
    // 3 × 3 open grid, the seed holding the ring but the centre: closing the ring is no hole (the centre is a face it can
    // take), but taking the centre last is fine — so build the hole with a reserved centre and no compactness floor.
    const a = gridArena(3, 3, 100, () => 'secondary', [{ i: 1, j: 1, owner: 'plaza:0' }]);
    const g = graphOf(a);
    const r = grow([seed(0, cell(a, g, 0, 0))], { graph: g, claimable: claimableOf(g) }, realStream(5), { ...OPEN, compactnessMin: 0 });
    expect(r.grown[0].faces.length).toBe(7);
    expect(boundaryLoops(g, r.grown[0].faces, (i) => r.grown[0].faces.includes(i))).toBe(1);
  });
});

describe('the leftover rule and the merge rule (§4.5)', () => {
  it('faces no grower could claim seed further districts in face-id order, grown by the same turns', () => {
    // Two compartments split by a primary line; the only seed is in the left one.
    const a = gridArena(4, 2, 100, (dir, i) => (dir === 'x' && i === 2 ? 'primary' : 'secondary'));
    const g = graphOf(a);
    const r = grow([seed(0, cell(a, g, 0, 0))], { graph: g, claimable: claimableOf(g) }, realStream(), { ...OPEN, compactnessMin: 0 });
    expect(r.leftovers).toEqual([1]);
    const left = r.grown[1];
    expect(left.seed.kind).toBe('leftover');
    // Its seed is the right compartment's first face in canonical order, and it grew over all four.
    const right = [cell(a, g, 2, 0), cell(a, g, 3, 0), cell(a, g, 2, 1), cell(a, g, 3, 1)];
    expect(left.seed.face).toBe(Math.min(...right));
    expect(left.faces.slice().sort((x, y) => x - y)).toEqual(right.sort((x, y) => x - y));
    expect(r.log.some((l) => l.seed === 1 && l.what === 'absorb')).toBe(true);
  });

  it('a district below the floor merges into the neighbour with the longest shared edge', () => {
    // 4 × 1 strip: seeds at both ends, band top 2 cells for seed 0's side … a 1-cell district between two others.
    const a = gridArena(5, 1, 100, () => 'secondary');
    const g = graphOf(a);
    const c = [0, 1, 2, 3, 4].map((i) => cell(a, g, i, 0));
    // Seeds 0 and 2 take two cells each (top 2); seed 1 in the middle is boxed after its own cell.
    const r = grow([seed(0, c[0]), seed(1, c[2]), seed(2, c[4])], { graph: g, claimable: claimableOf(g) }, scripted((s) => ({ u: 0, pick: s === 1 ? 9 : 0 }), (l) => [0, 1, 2].find((k) => textLineage(`seed:${String(k)}`)[0] === l[0]) as number), {
      ...OPEN,
      bandCm2: [1.5 * CELL, 2 * CELL],
    });
    const small = r.grown.find((d) => d.areaCm2 < 1.5 * CELL && d.mergedInto >= 0);
    expect(small).toBeDefined();
    expect(r.merges.length).toBeGreaterThan(0);
    const m = r.merges[0];
    // Merged into a neighbour sharing its longest edge (a single cell side, 100 m).
    expect(m.sharedCm).toBe(10_000);
    expect(r.grown[m.into].mergedInto).toBe(-1);
    for (const f of r.grown[m.from].faces) expect(r.owner[f]).toBe(m.into);
  });

  it('the merge partner is the neighbour sharing the longest edge (300 m against 100 m)', () => {
    // Columns 1 000 m and 300 m wide, rows 100 m and 400 m high; the cell right of the wide one is reserved, so the
    // three claimable cells are A (0,0) 10 ha, S (1,0) 3 ha and B (1,1) 12 ha, each a seed. S, below a 5 ha floor,
    // shares 100 m with A and 300 m with B: it merges into B (A too is below no floor: it stays).
    const a = rectArena([0, 1000, 1300], [0, 100, 500], () => 'secondary', [{ i: 0, j: 1, owner: 'plaza:0' }]);
    const g = graphOf(a);
    const A = cell(a, g, 0, 0);
    const S = cell(a, g, 1, 0);
    const B = cell(a, g, 1, 1);
    const seeds = [seed(0, A), seed(1, S), seed(2, B)];
    const r = grow(seeds, { graph: g, claimable: claimableOf(g) }, realStream(), { ...OPEN, bandCm2: [5 * CELL, 1e15] });
    expect(r.merges).toEqual([{ from: 1, into: 2, sharedCm: 30_000, areaCm2: 30_000 * 10_000 }]);
    expect(r.owner[S]).toBe(2);
  });

  it('a seed of rate < 1 keeps its seed face: its district is never merged away below the floor', () => {
    // 1 × 1 cells in a row of three: the slow seed at 0 always skips, the fast one at 2 takes the middle; both end
    // below a floor of 2.5 cells. The fast one merges into the slow one; the slow one stays, its seed face its own.
    const a = gridArena(3, 1, 100, () => 'secondary');
    const g = graphOf(a);
    const c = [0, 1, 2].map((i) => cell(a, g, i, 0));
    const plan = scripted((s) => ({ u: s === 0 ? 0.99 : 0, pick: 0 }), (l) => (l[0] === textLineage('seed:0')[0] ? 0 : 1));
    const r = grow([seed(0, c[0], 'gate', 0.1), seed(1, c[2])], { graph: g, claimable: claimableOf(g) }, plan, { ...OPEN, bandCm2: [2.5 * CELL, 1e15], turnLimit: 1000 });
    expect(r.workCut).toBe(false);
    expect(r.grown[0].mergedInto).toBe(-1);
    expect(r.grown[1].mergedInto).toBe(0);
    expect(r.owner[c[0]]).toBe(0);
    expect([...r.owner].filter((o) => o === 0).length).toBe(3);
    // Rates swapped (the slow one at 2 never moves; the fast one takes the middle): the fast one merges into the slow.
    const plan1 = scripted((s) => ({ u: s === 0 ? 0 : 0.99, pick: 0 }), (l) => (l[0] === textLineage('seed:0')[0] ? 0 : 1));
    const r1 = grow([seed(0, c[0]), seed(1, c[2], 'remainder', 0.5)], { graph: g, claimable: claimableOf(g) }, plan1, { ...OPEN, bandCm2: [2.5 * CELL, 1e15], turnLimit: 1000 });
    expect(r1.grown[1].mergedInto).toBe(-1);
    expect(r1.grown[0].mergedInto).toBe(1);
    expect(r1.belowFloor).toEqual([]);
    const r2 = grow([seed(0, c[0], 'remainder', 1), seed(1, c[2], 'remainder', 1)], { graph: g, claimable: claimableOf(g) }, plan1, { ...OPEN, bandCm2: [2.5 * CELL, 1e15], turnLimit: 1000 });
    expect(r2.grown.filter((d) => d.mergedInto >= 0).length).toBe(1);
  });

  it('no merge carries a district across a barrier: one with no neighbour across a passing edge stays, reported', () => {
    const a = gridArena(2, 1, 100, () => 'primary');
    const g = graphOf(a);
    const r = grow([seed(0, cell(a, g, 0, 0)), seed(1, cell(a, g, 1, 0))], { graph: g, claimable: claimableOf(g) }, realStream(), { ...OPEN, bandCm2: [5 * CELL, 1e15] });
    expect(r.merges).toEqual([]);
    expect(r.belowFloor).toEqual([0, 1]);
  });
});

describe('F-WORK (C-0085): grower.turns reached → the leftover rule assigns every face still unowned, work_cut', () => {
  it('a low turn limit stops growth at the limit; every claimable face is held; workCut with the count', () => {
    const a = gridArena(6, 6, 100, () => 'secondary');
    const g = graphOf(a);
    const cl = claimableOf(g);
    for (const limit of [0, 1, 5, 17]) {
      const r = grow([seed(0, cell(a, g, 0, 0)), seed(1, cell(a, g, 5, 5))], { graph: g, claimable: cl }, realStream(), { ...OPEN, turnLimit: limit });
      expect(r.workCut).toBe(true);
      expect(r.turns).toBe(limit);
      expect(r.log.length).toBe(limit);
      cl.forEach((c, i) => {
        if (c) expect(r.owner[i]).toBeGreaterThanOrEqual(0);
      });
    }
    const free = grow([seed(0, cell(a, g, 0, 0)), seed(1, cell(a, g, 5, 5))], { graph: g, claimable: cl }, realStream(), OPEN);
    expect(free.workCut).toBe(false);
    expect(free.turns).toBeLessThan(OPEN.turnLimit);
  });
});

describe('the edge test’s water clause on a bank (§4.5; C-0245 (3), (4))', () => {
  it('a bank line between two land cells stops a grower; the shore anchor seeds the first face along the bank', () => {
    // 4 × 1 open grid; a river's bank laid over the line between cells 1 and 2 (the way there and the bank share it)
    const a = gridArena(4, 1, 100, () => 'secondary');
    layChain(a.k, [P(20_000, 0), P(20_000, 10_000)], [{ role: 'bank', entity: 'water:river:0' }]);
    const g = graphOf(a);
    const c = [0, 1, 2, 3].map((i) => cell(a, g, i, 0));
    expect((g.links[c[1]].get(c[2]) as FaceLink).barriers & BARRIER.WATER).toBe(BARRIER.WATER);
    const r = grow([seed(0, c[0])], { graph: g, claimable: claimableOf(g) }, realStream(), { ...OPEN, compactnessMin: 0 });
    expect(r.grown[0].faces.slice().sort((x, y) => x - y)).toEqual([c[0], c[1]].sort((x, y) => x - y));
    // beyond the bank the leftover rule seeds its own district, which holds the rest
    expect(r.leftovers).toEqual([1]);
    expect(r.grown[1].faces.slice().sort((x, y) => x - y)).toEqual([c[2], c[3]].sort((x, y) => x - y));
    // the river's bank seeds a riverbank grower at the face with its longest bank (a tie: the first in face order)
    const placed = placeSeeds(g, claimableOf(g), [{ id: 'water:river:0', kind: 'riverbank', anchor: { kind: 'shore', body: 'water:river:0' } }], 1, () => 0.5);
    expect(placed.seeds.map((x) => [x.kind, x.face])).toEqual([['riverbank', Math.min(c[1], c[2])]]);
    expect(placed.dropped).toEqual([]);
  });
});

/** Does any grower hold two faces linked across an edge the edge test refuses? (the districts' faces, each pair once) */
function heldAcross(g: FaceGraph, owner: Int32Array): [number, number][] {
  const out: [number, number][] = [];
  g.links.forEach((m, i) => {
    for (const [j, l] of m) if (i < j && owner[i] >= 0 && owner[i] === owner[j] && (l.barriers & EDGE_TEST_BARRIERS) !== 0) out.push([i, j]);
  });
  return out;
}

describe('F-WORK’s runs and the degenerate face’s merge hold the edge test on every shared edge (C-0245 (10), (21))', () => {
  it('an arterial dead-ending inside a compartment, under a turn limit of 0: no run holds both its sides; containment holds', () => {
    // 3 × 3 open grid; the vertical line between columns 1 and 2 is primary in its middle segment only: the cells
    // (1, 1) and (2, 1) meet across it, and the compartment joins them round its ends
    const a = gridArena(3, 3, 100, (dir, i, sg) => (dir === 'x' && i === 2 && sg === 1 ? 'primary' : 'secondary'));
    const g = graphOf(a);
    const cl = claimableOf(g);
    const r = grow([], { graph: g, claimable: cl }, realStream(), { ...OPEN, turnLimit: 0 });
    expect(r.workCut).toBe(true);
    cl.forEach((c, i) => {
      if (c) expect(r.owner[i]).toBeGreaterThanOrEqual(0);
    });
    expect(heldAcross(g, r.owner)).toEqual([]);
    expect(r.owner[cell(a, g, 1, 1)]).not.toBe(r.owner[cell(a, g, 2, 1)]);
    // the face the barrier kept out of the run started its own: three districts, (0, 0) first by the leftover rule
    expect(r.grown.length).toBe(3);
    expect(r.grown[2].faces).toEqual([cell(a, g, 2, 1)]);
  });

  it('a degenerate face joins only a district whose every edge with it passes; with none it stays unowned', () => {
    // A hand-built graph (the kernel commits no face of area ≤ 0): X alone; A and D one run; B degenerate, meeting A
    // across a passing edge (10 m) and D across a primary one (5 m).
    const face = (i: number, areaCm2: number): CoarseFace => ({ face: i, key: [i, 0, i + 1, 0], areaCm2, perimeterCm: 400, owner: null, water: false, side: 'inside', centroid: { x: i, y: 0 } });
    const link = (other: number, lengthCm: number, barriers = 0): [number, FaceLink] => [other, { other, lengthCm, barriers }];
    const graph = (bd: number): FaceGraph =>
      ({
        plat: null,
        faces: [face(0, 100), face(1, 100), face(2, 100), face(3, 0)],
        links: [new Map(), new Map([link(2, 1000), link(3, 1000)]), new Map([link(1, 1000), link(3, 500, bd)]), new Map([link(1, 1000), link(2, 500, bd)])],
        rings: [],
        halfFace: new Map(),
        ringBarriers: [0, 0, 0, 0],
        shores: [new Map(), new Map(), new Map(), new Map()],
      }) as unknown as FaceGraph;
    const cl = [true, true, true, true];
    const barred = grow([], { graph: graph(BARRIER.ARTERIAL), claimable: cl }, realStream(), { ...OPEN, turnLimit: 0 });
    expect(barred.owner[1]).toBe(barred.owner[2]);
    expect(barred.owner[3]).toBe(-1);
    const open = grow([], { graph: graph(0), claimable: cl }, realStream(), { ...OPEN, turnLimit: 0 });
    expect(open.owner[3]).toBe(open.owner[1]);
    expect(faceLineage([1, 0, 2, 0])).toEqual(open.grown[1].seed.lineage);
  });
});

describe('the merge rule never encloses a hole (the patch test’s hole check on the merge)', () => {
  it('a district meeting its only neighbour along two disjoint pieces stays below the floor, reported; one piece merges', () => {
    // 3 × 3: the centre reserved; S the bottom middle (a seed, its turn cut at once), the F-WORK run T the other seven:
    // S meets T on its left and on its right only, so S ∪ T would ring the centre
    const reserved = gridArena(3, 3, 100, () => 'secondary', [{ i: 1, j: 1, owner: 'plaza:0' }]);
    const g = graphOf(reserved);
    const S = cell(reserved, g, 1, 0);
    const r = grow([seed(0, S)], { graph: g, claimable: claimableOf(g) }, realStream(), { ...OPEN, turnLimit: 0, bandCm2: [2 * CELL, 1e15] });
    expect(r.grown.map((d) => d.faces.length)).toEqual([1, 7]);
    expect(r.merges).toEqual([]);
    expect(r.belowFloor).toEqual([0]);
    for (const d of r.grown) expect(boundaryLoops(g, d.faces, (i) => r.owner[i] === d.seed.order)).toBe(1);
    // the centre open: S meets T along one piece (left, top, right) and merges
    const open = gridArena(3, 3, 100, () => 'secondary');
    const g2 = graphOf(open);
    const r2 = grow([seed(0, cell(open, g2, 1, 0))], { graph: g2, claimable: claimableOf(g2) }, realStream(), { ...OPEN, turnLimit: 0, bandCm2: [2 * CELL, 1e15] });
    expect(r2.merges.map((m) => [m.from, m.into, m.sharedCm])).toEqual([[0, 1, 30_000]]);
    expect(boundaryLoops(g2, r2.grown[1].faces, (i) => r2.owner[i] === 1)).toBe(1);
  });
});

describe('Polsby–Popper, 4π·A ÷ P² (the plaza’s compactness measure, §4.2 S3 (2))', () => {
  it('a square gives π ÷ 4, a regular n-gon π ÷ (n · tan(π ÷ n)) — 1 in the limit of a disc; a zero perimeter gives 0', () => {
    expect(polsbyPopper(CELL, 40_000)).toBeCloseTo(Math.PI / 4, 12);
    for (const n of [6, 96, 720]) {
      const r = 50_000;
      const area = (n / 2) * r * r * Math.sin((2 * Math.PI) / n);
      const per = 2 * n * r * Math.sin(Math.PI / n);
      expect(polsbyPopper(area, per)).toBeCloseTo(Math.PI / (n * Math.tan(Math.PI / n)), 9);
    }
    expect(polsbyPopper(CELL, 0)).toBe(0);
  });
});
