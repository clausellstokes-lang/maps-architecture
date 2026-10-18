// M0-a-09: bandUnion (§3.4: "the axis chain splits the band per side; corners get corridor_split; a profile is sampled
// per segment end"; §3.7 *Insets*: "Wall bands … use `bandUnion` with the `band` role: the wall chain, already an L1
// edge, splits the band, so a band is a `FaceRef` of per-side L3 parts and never straddles its L1 edge").
import { describe, expect, it } from 'vitest';
import { facesOfOwner, handleOf, idOf, type FaceId } from '../../../src/arena/index.js';
import { insertChain } from '../../../src/insert/index.js';
import { tx } from '../../../src/tx/index.js';
import { bandUnion, opBandUnion, type BandResult } from '../../../src/arr/bandUnion.js';
import { lin } from '../../tx/support.js';
import { attemptAt, commit, edgesWithRole, faceAt, framed, healthy, normals, own, profile, pt, ringsOf, spec, state, tilesExactly, way } from './support.js';

/** A wall along y = 2000 with its two strips: the inner strip down to the setback line y = 1500, the outer up to the glacis line y = 2600. */
function walled(knots: readonly number[] = []): { p: ReturnType<typeof framed>; inner: FaceId; outer: FaceId } {
  const p = framed();
  way(p, 'enceinte:1', [[0, 2000], [4000, 2000]], knots, 'wall');
  commit(p, 1, (o) => insertChain(o, [pt(0, 1500), pt(4000, 1500)], [{ role: 'setback', entity: 'enceinte:1' }], 'mandatory'));
  commit(p, 1, (o) => insertChain(o, [pt(0, 2600), pt(4000, 2600)], [{ role: 'setback', entity: 'enceinte:1' }], 'mandatory'));
  return { p, inner: faceAt(p, 1, 2000, 1750), outer: faceAt(p, 1, 2000, 2300) };
}

const WALL = { role: 'wall', entity: 'enceinte:1' };

describe('bandUnion (§3.4, §3.7 Insets)', () => {
  it('a wall band at L3: per-side parts owned by the band’s owner, split by the L1 wall, outlined by `band` edges', () => {
    const { p, inner, outer } = walled();
    const r = commit(p, 3, (o) => bandUnion(o, [{ ref: WALL, halfWidthCm: 150, ends: 'square' }], [inner, outer], 'band', 'enceinte:1'));
    healthy(p);
    const v = r.value as BandResult;
    expect(v.band.length).toBe(2);
    expect(v.strips).toEqual(v.band);
    expect(v.wedges).toEqual([]);
    expect(v.blocks.length).toBe(2);
    expect(v.band.map((f) => normals(ringsOf(p, 3, f))[0]).sort()).toEqual(['0,1850 4000,1850 4000,2000 0,2000', '0,2000 4000,2000 4000,2150 0,2150']);
    // the band is the FaceRef (enceinte:1, L3): its two per-side parts, each inside one strip — never straddling the wall
    expect(facesOfOwner(p, 3, handleOf(p, 'enceinte:1')).sort((a, b) => a - b)).toEqual(v.band.slice().sort((a, b) => a - b));
    const anc = v.band.map((f) => p.faces[2].parent[p.faces[3].parent[f]]).sort((a, b) => a - b);
    expect(anc).toEqual([inner, outer].sort((a, b) => a - b));
    for (const f of v.band) expect(idOf(p, p.faces[3].owner[f])).toBe('enceinte:1');
    expect(edgesWithRole(p, 'band')).toEqual(['0,1850-4000,1850', '0,2150-4000,2150']);
    expect(tilesExactly(p, 3, [inner, outer])).toEqual([]);
  });

  it('a half-width profile is sampled per segment end (§2.2 rule 5)', () => {
    const { p, inner, outer } = walled([0, 1]);
    const r = commit(p, 3, (o) => bandUnion(o, [{ ref: WALL, halfWidthCm: profile([100, 300]), ends: 'round' }], [inner, outer], 'band', 'enceinte:1'));
    healthy(p);
    const v = r.value as BandResult;
    expect(v.band.map((f) => normals(ringsOf(p, 3, f))[0]).sort()).toEqual(['0,2000 4000,2000 4000,2300 0,2100', '4000,1700 4000,2000 0,2000 0,1900']);
  });

  it('corners get corridor_split: two band chains crossing give the junction’s wedges, at L2 as at L3', () => {
    for (const level of [2, 3] as const) {
      const p = framed();
      way(p, 'way:1', [[0, 2000], [4000, 2000]]);
      way(p, 'way:2', [[2000, 0], [2000, 4000]]);
      const faces = own(p, 'district:1', [[1000, 1000], [3000, 1000], [1000, 3000], [3000, 3000]]);
      const chains = [
        { ref: { role: 'way', entity: 'way:1' }, halfWidthCm: 300, ends: 'round' as const },
        { ref: { role: 'way', entity: 'way:2' }, halfWidthCm: 300, ends: 'round' as const },
      ];
      const r = commit(p, level, (o) => bandUnion(o, chains, faces, 'band', 'band:1'));
      healthy(p);
      const v = r.value as BandResult;
      expect([v.strips.length, v.wedges.length, v.blocks.length]).toEqual([8, 4, 4]);
      expect(edgesWithRole(p, 'corridor_split').length).toBe(8);
      for (const f of v.band) expect(idOf(p, p.faces[level].owner[f])).toBe('band:1');
      // the declared form commits the same arena
      const q = framed();
      way(q, 'way:1', [[0, 2000], [4000, 2000]]);
      way(q, 'way:2', [[2000, 0], [2000, 4000]]);
      const qf = own(q, 'district:1', [[1000, 1000], [3000, 1000], [1000, 3000], [3000, 3000]]);
      const d = tx(q, spec(level, { ops: [opBandUnion(lin(3), 0, chains, qf, 'band', 'band:1')] }));
      expect(d.ok).toBe(true);
      expect(state(q)).toBe(state(p));
    }
  });

  it('refuses E_LEVEL in an L1 batch (the band is finer than its chain), writing nothing; a chain not listed adds no band', () => {
    const { p, inner, outer } = walled();
    const before = state(p);
    const r = attemptAt(p, 1, (o) => bandUnion(o, [{ ref: WALL, halfWidthCm: 150, ends: 'square' }], [inner, outer], 'band', 'enceinte:1'));
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe('E_LEVEL');
    expect(state(p)).toBe(before);
    const none = commit(p, 3, (o) => bandUnion(o, [{ ref: { role: 'wall', entity: 'enceinte:9' }, halfWidthCm: 150, ends: 'square' }], [inner, outer], 'band', 'enceinte:9'));
    expect(none.record).toBeNull();
    expect((none.value as BandResult).whole.length).toBe(2);
    expect((none.value as BandResult).band).toEqual([]);
    expect(state(p)).toBe(before);
  });
});
