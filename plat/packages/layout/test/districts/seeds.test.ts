// The grower's seeds (M0-e-04; §4.5 *Grower*: "Seeds = the sited features … plus a density-guided remainder, N_d seeds
// in all"; C-0245 (4), (11)): the features' anchors, the compartments, the remainder's first seed at a compartment's
// centroid and Lloyd's relaxation with the features fixed.
import { describe, expect, it } from 'vitest';
import { faceGraph, faceInRing, placeSeeds, s6DistrictCells, SIDE_DECISIVE_CM, type FaceGraph } from '../../src/index.js';
import { GROUND, gridArena, P, type GridArena } from './support.js';

function graphOf(a: GridArena): FaceGraph {
  return faceGraph(a.plat, { ways: new Map(a.ways.map((w) => [w.id, w.class])), minBarrierClass: 'primary', perimeter: 'none', water: new Set() });
}
function cell(a: GridArena, g: FaceGraph, i: number, j: number): number {
  const loc = a.k.geom.pointLocate(GROUND, 1, a.centre(i, j));
  if (loc.on !== 'face') throw new Error('no cell');
  return g.faces.findIndex((f) => f.face === loc.face);
}
const land = (g: FaceGraph): boolean[] => g.faces.map((f) => f.side !== 'margin' && f.owner === null && !f.water);
const rate = s6DistrictCells().rate;

describe('the seeds (§4.5)', () => {
  it('a gate seeds at the face nearest its point; the remainder starts at the centroid and Lloyd moves it to its cell’s centre', () => {
    // A 9 × 1 strip: a gate at the left end; N_d = 2 leaves one remainder seed. It starts at the strip's middle (cell 4);
    // Lloyd gives the gate cells 0 – 2 (ties to the gate, the first seed) and the remainder 3 – 8, whose centre is
    // between cells 5 and 6: it moves to cell 5 (ties by face order) and stays.
    const a = gridArena(9, 1, 100, () => 'secondary');
    const g = graphOf(a);
    const r = placeSeeds(g, land(g), [{ id: 'gate:0', kind: 'gate', anchor: { kind: 'point', at: { x: 0, y: 5000 } } }], 2, rate);
    expect(r.seeds.map((s) => [s.kind, s.face])).toEqual([
      ['gate', cell(a, g, 0, 0)],
      ['remainder', cell(a, g, 5, 0)],
    ]);
    expect(r.seeds[1].rate).toBe(1);
    expect(r.seeds[0].rate).toBe(0.1);
  });

  it('N_d seeds in all; a feature with no free face is dropped and reported; a compartment below the floor gets none', () => {
    const a = gridArena(4, 1, 100, (dir, i) => (dir === 'x' && i === 3 ? 'primary' : 'secondary'));
    const g = graphOf(a);
    // two features anchored on one face: the second takes the next nearest; a third on an owner nobody has is dropped
    const f = [
      { id: 'gate:0', kind: 'gate' as const, anchor: { kind: 'point' as const, at: { x: 0, y: 5000 } } },
      { id: 'gate:1', kind: 'gate' as const, anchor: { kind: 'point' as const, at: { x: 0, y: 5000 } } },
      { id: 'plaza:9', kind: 'market' as const, anchor: { kind: 'owner' as const, owner: 'plaza:9' } },
    ];
    const r = placeSeeds(g, land(g), f, 4, rate, 1.5 * 1e8);
    expect(r.dropped).toEqual(['plaza:9']);
    expect(r.seeds.slice(0, 2).map((s) => s.face)).toEqual([cell(a, g, 0, 0), cell(a, g, 1, 0)]);
    // the one-cell compartment right of the primary line (1 ha) is below the 1.5 ha floor: the remainder seeds go left
    const right = cell(a, g, 3, 0);
    expect(r.seeds.some((s) => s.face === right)).toBe(false);
    expect(r.seeds.length).toBe(3);
    // without the floor the right compartment, seedless, takes the first remainder seed
    const r0 = placeSeeds(g, land(g), f, 4, rate, 0);
    expect(r0.seeds[2].face).toBe(right);
    expect(r0.seeds[3].face).toBe(cell(a, g, 2, 0));
    expect(r0.seeds.length).toBe(4);
    // with N_d above the free faces the remainder stops short rather than seed a face twice
    expect(placeSeeds(g, land(g), f, 9, rate, 0).seeds.length).toBe(4);
  });

  it('a point anchor’s side (C-0257): only faces touching the point, inside `within`, outside every `outside` ring; none left there: dropped', () => {
    // A 6 × 1 strip of 100 m cells; the gate's point on the line x = 200 m between cells 1 and 2. `within` holds cells
    // 0 – 3 (its edges on the grid lines), `outside` cells 0 – 1: only cell 2 qualifies (cell 1 touches the point but
    // lies inside the inner ring; cell 3 is inside and outside right but does not touch it).
    const a = gridArena(6, 1, 100, () => 'secondary');
    const g = graphOf(a);
    const within = [P(0, 0), P(40000, 0), P(40000, 10000), P(0, 10000)];
    const inner = [P(0, 0), P(20000, 0), P(20000, 10000), P(0, 10000)];
    const at = { x: 20000, y: 5000 };
    const gate = (id: string) => ({ id, kind: 'gate' as const, anchor: { kind: 'point' as const, at, touching: true, within, outside: [inner] } });
    const r = placeSeeds(g, land(g), [gate('gate:0'), gate('gate:1')], 2, rate);
    expect(r.seeds.filter((s) => s.kind === 'gate').map((s) => [s.feature, s.face])).toEqual([['gate:0', cell(a, g, 2, 0)]]);
    // the second gate finds its one face taken: dropped and reported, never seeded at cell 3 (not touching) nor at
    // cell 1 (behind the inner ring)
    expect(r.dropped).toEqual(['gate:1']);
    // without `touching` the second takes the nearest face on its side (cell 3); without the sides, the nearest (cell 1)
    const loose = placeSeeds(g, land(g), [gate('gate:0'), { id: 'gate:1', kind: 'gate', anchor: { kind: 'point', at, within, outside: [inner] } }], 2, rate);
    expect(loose.seeds.map((s) => s.face)).toEqual([cell(a, g, 2, 0), cell(a, g, 3, 0)]);
    const free = placeSeeds(g, land(g), [gate('gate:0'), { id: 'gate:1', kind: 'gate', anchor: { kind: 'point', at, touching: true } }], 2, rate);
    expect(free.seeds.map((s) => s.face)).toEqual([cell(a, g, 2, 0), cell(a, g, 1, 0)]);
  });

  it('a face’s side of a wall line: read at a boundary point off the line, points on the line never deciding (C-0257)', () => {
    const a = gridArena(4, 1, 100, () => 'secondary');
    const g = graphOf(a);
    // a ring whose edges run along the grid lines around cells 0 – 1: every cell has vertices on it
    const ring = [P(0, 0), P(20000, 0), P(20000, 10000), P(0, 10000)];
    expect([0, 1, 2, 3].map((i) => faceInRing(g, cell(a, g, i, 0), ring))).toEqual([true, true, false, false]);
    // clockwise, the same
    expect([0, 1, 2, 3].map((i) => faceInRing(g, cell(a, g, i, 0), ring.slice().reverse()))).toEqual([true, true, false, false]);
    // a line within the decisive distance of a cell's far side: that cell's far vertices still decide
    const near = [P(0, 0), P(30000 - SIDE_DECISIVE_CM + 1, 0), P(30000 - SIDE_DECISIVE_CM + 1, 10000), P(0, 10000)];
    expect(faceInRing(g, cell(a, g, 2, 0), near)).toBe(true);
    expect(faceInRing(g, cell(a, g, 3, 0), near)).toBe(false);
    // a face whose whole boundary is the line: the region the line encloses (a single cell, its own ring)
    expect(faceInRing(g, cell(a, g, 1, 0), [P(10000, 0), P(20000, 0), P(20000, 10000), P(10000, 10000)])).toBe(true);
    expect(faceInRing(g, cell(a, g, 2, 0), [P(10000, 0), P(20000, 0), P(20000, 10000), P(10000, 10000)])).toBe(false);
    // the memo answers as computed
    const memo = new Map<number, boolean>();
    expect(faceInRing(g, cell(a, g, 0, 0), ring, memo)).toBe(true);
    expect(memo.get(cell(a, g, 0, 0))).toBe(true);
  });
});
