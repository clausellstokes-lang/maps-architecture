// faceSet(kind, n, seed) and the one-face district (M0-b-04; §16 M0 (b)'s face set; C-0067: every input in-process).
import fc from 'fast-check';
import { area2, faceRings, isFaceLive, idOf } from '@plat/kernel';
import { arb } from '@plat/testkit';
import { describe, expect, it } from 'vitest';
import { districtFaces, faceAt, faceDistrict, faceSeed, faceSet, FCUT_KINDS, M0B_KINDS } from '../../src/bentcut/index.js';

describe('faceSet(kind, n, seed)', () => {
  it('draws M0-k-01’s faces: face i is the first sample of arb.faceSet(kind) at its own seed', () => {
    for (const kind of [...M0B_KINDS, ...FCUT_KINDS]) {
      const set = faceSet(kind, 3, 7);
      expect(set).toHaveLength(3);
      for (let i = 0; i < 3; i += 1) {
        const [direct] = fc.sample(arb.faceSet(kind), { seed: faceSeed(kind, 7, i), numRuns: 1 });
        expect(set[i]).toEqual(direct);
        expect(set[i].kind).toBe(kind);
        expect(faceAt(kind, i, 7)).toEqual(set[i]);
      }
    }
  });

  it('is seeded: the same arguments give the same faces; another seed or index gives others', () => {
    expect(faceSet('holed', 4, 3)).toEqual(faceSet('holed', 4, 3));
    expect(faceSet('holed', 4, 3)).not.toEqual(faceSet('holed', 4, 4));
    const s = faceSet('curved', 2, 3);
    expect(s[0]).not.toEqual(s[1]);
    // A prefix: n faces are the first n of any longer set.
    expect(faceSet('concave', 5, 9).slice(0, 2)).toEqual(faceSet('concave', 2, 9));
  });

  it('refuses a bad count or seed', () => {
    expect(() => faceSet('curved', -1, 1)).toThrow(RangeError);
    expect(() => faceSet('curved', 1.5, 1)).toThrow(RangeError);
    expect(() => faceSet('curved', 1, -1)).toThrow(RangeError);
    expect(() => faceSet('curved', 1, 2 ** 32)).toThrow(RangeError);
  });

  it('the holed kind carries holes; the plot scale gives smaller faces than the block scale', () => {
    for (const f of faceSet('holed', 5, 1)) expect(f.polygon.length).toBeGreaterThan(1);
    const block = faceSet('curved', 5, 1).map((f) => f.radiusCm);
    const plot = faceSet('curved', 5, 1, 'plot').map((f) => f.radiusCm);
    expect(Math.max(...plot)).toBeLessThan(Math.min(...block));
  });
});

describe('the one-face district', () => {
  it('owns exactly the generated face; each hole is a reservation’s face', () => {
    for (const kind of M0B_KINDS) {
      const f = faceAt(kind, 0, 1);
      const fd = faceDistrict(f.polygon, 5);
      expect(fd.facesBefore).toBe(1);
      expect(districtFaces(fd.plat, fd.district)).toBe(1);
      // The district's face: its outer ring's area is the generated outline's, within the lattice's attraction.
      let face = -1;
      let holes = 0;
      for (let x = 0; x < fd.plat.slots.face[1].top; x += 1) {
        if (!isFaceLive(fd.plat, 1, x)) continue;
        const h = fd.plat.faces[1].owner[x];
        if (h >= 0 && idOf(fd.plat, h) === fd.district) face = x;
        else if (h >= 0 && idOf(fd.plat, h).startsWith('reservation:')) holes += 1;
      }
      expect(face).toBeGreaterThanOrEqual(0);
      const want = Math.abs(area2(f.polygon[0]));
      const got = Math.abs(area2(faceRings(fd.plat, 1, face)[0]));
      expect(Math.abs(got - want) / want).toBeLessThan(0.01);
      expect(holes).toBe(f.polygon.length - 1);
      expect(fd.units.faces).toBeGreaterThanOrEqual(1);
    }
  });
});
