// One of NG's recorded faces through our S8 (M0-b-05; ngruns.ts): the face moved to the bench frame's centre by whole
// centimetres and refused beyond it; its label, its derivation seed, the candidate cut table; and NG's own recorded
// numbers read by the same metric functions (index.ts). Every face here is made up.
import { describe, expect, it } from 'vitest';
import { cutTableAt, kindOf, ngMetricCuts, ngRecordedOf, ngSeed, placedPolygon, runNgTask } from '../../src/bentcut-ng/index.js';
import { FRAME_HALF_CM } from '../../src/bentcut/index.js';
import { ngFace, ngFile, PLANTED_CUTS, rect } from './support.js';

describe('placedPolygon', () => {
  it('moves the outer ring\'s box to the origin by whole centimetres, rings open, holes kept', () => {
    const f = ngFace(3, [rect(9_000, 5_000), [{ x: 3_000, y: 2_000 }, { x: 3_000, y: 3_000 }, { x: 4_000, y: 3_000 }, { x: 4_000, y: 2_000 }]], 'ring', PLANTED_CUTS);
    const p = placedPolygon(f);
    expect(typeof p).not.toBe('string');
    if (typeof p === 'string') return;
    expect(p[0].map((q) => [q.x, q.y])).toEqual([[-4_500, -2_500], [4_500, -2_500], [4_500, 2_500], [-4_500, 2_500]]);
    expect(p[1].map((q) => [q.x, q.y])).toEqual([[-1_500, -500], [-1_500, 500], [-500, 500], [-500, -500]]);
    // An odd extent rounds the centre to a whole centimetre.
    const odd = placedPolygon(ngFace(4, [rect(9_001, 5_001)], 'area', PLANTED_CUTS));
    expect(typeof odd !== 'string' && odd[0][0]).toEqual({ x: -4_501, y: -2_501 });
  });

  it('accepts a face far from the frame\'s origin, refuses one wider than the bench frame less its margin', () => {
    const far = ngFace(5, [rect(9_000, 5_000).map((q) => ({ x: q.x + 4_000_000, y: q.y - 3_000_000 }))], 'area', PLANTED_CUTS);
    expect(typeof placedPolygon(far)).not.toBe('string');
    const limit = FRAME_HALF_CM - 10_000;
    expect(typeof placedPolygon(ngFace(6, [rect(2 * limit, 1_000)], 'area', PLANTED_CUTS))).not.toBe('string');
    const wide = placedPolygon(ngFace(7, [rect(2 * limit + 2, 1_000)], 'area', PLANTED_CUTS));
    expect(typeof wide).toBe('string');
    expect(wide).toContain('beyond the bench frame');
    // A refused face is recorded as a setup failure, never thrown.
    const r = runNgTask({ face: ngFace(7, [rect(2 * limit + 2, 1_000)], 'area', PLANTED_CUTS), seed: 1, seedIndex: 0, bars: true });
    expect([r.setup?.includes('beyond the bench frame'), r.refused, r.cuts, r.checks]).toEqual([true, null, [], null]);
  });
});

describe('a face\'s label, seed and candidate table', () => {
  it('labels by the first class flag; seeds by the run seed, the face and the seed index; sets flattenM in memory only', () => {
    const f = ngFace(1, [rect(9_000, 5_000)], 'street', PLANTED_CUTS);
    expect(kindOf(f)).toBe('concave');
    expect(kindOf({ ...f, classes: { ...f.classes, curved: 1, triangular: 1 } })).toBe('triangular');
    expect(kindOf({ ...f, holesCm: [f.ringCm] })).toBe('holed');
    const s = ngSeed(1, 1, 0);
    expect(Number.isInteger(s) && s >= 0 && s <= 0xffffffff).toBe(true);
    expect(new Set([ngSeed(1, 1, 0), ngSeed(2, 1, 0), ngSeed(1, 2, 0), ngSeed(1, 1, 1)]).size).toBe(4);
    expect(ngSeed(1, 1, 0)).toBe(s);
    const t = cutTableAt(1.25);
    expect([t.num('settings', 'flattenM'), t.version, t.cell('settings', 'flattenM').provenance]).toEqual([1.25, 2, 'own']);
  });
});

describe('NG\'s recorded numbers by the same metric functions', () => {
  it('reads cornerT in thousandths, the flags as booleans, a ring face by its holes', () => {
    const cuts = [
      { lengthCm: 5_000, cornerT: 400, arrivalCdeg: 8_500, fillet: 1 as const, bends: 1 },
      { lengthCm: 5_000, cornerT: 650, arrivalCdeg: 8_499, fillet: 0 as const, bends: 1 },
      { lengthCm: 2_000, cornerT: -1, arrivalCdeg: 9_000, fillet: 0 as const, bends: 0 },
      { lengthCm: 2_000, cornerT: -1, arrivalCdeg: 9_000, fillet: 0 as const, bends: 2 },
    ];
    const f = ngFace(1, [rect(9_000, 5_000)], 'square', cuts);
    const m = ngMetricCuts([f]);
    expect(m.map((c) => [c.faceKind, c.template, c.bends, c.cornerT, c.fillet, c.lengthCm])).toEqual([
      ['plain', 'square', 1, 0.4, true, 5_000],
      ['plain', 'square', 1, 0.65, false, 5_000],
      ['plain', 'square', 0, undefined, false, 2_000],
      ['plain', 'square', 2, undefined, false, 2_000],
    ]);
    expect(ngRecordedOf(ngFile([f]))).toEqual({ faces: 1, hoods: 1, cuts: 4, oneBend: 0.5, cornerMidCourse: 0.5, arrival85: 0.75, fillet: 0.5 });
    expect(ngMetricCuts([ngFace(2, [rect(9_000, 5_000), [{ x: 100, y: 100 }, { x: 100, y: 200 }, { x: 200, y: 200 }, { x: 200, y: 100 }]], 'ring', cuts)])[0].faceKind).toBe('ring');
  });
});
