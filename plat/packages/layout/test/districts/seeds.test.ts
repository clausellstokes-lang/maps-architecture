// The grower's seeds (M0-e-04; §4.5 *Grower*: "Seeds = the sited features … plus a density-guided remainder, N_d seeds
// in all"; C-0245 (4), (11)): the features' anchors, the compartments, the remainder's first seed at a compartment's
// centroid and Lloyd's relaxation with the features fixed.
import { describe, expect, it } from 'vitest';
import { faceGraph, placeSeeds, s6DistrictCells, type FaceGraph } from '../../src/index.js';
import { GROUND, gridArena, type GridArena } from './support.js';

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
});
