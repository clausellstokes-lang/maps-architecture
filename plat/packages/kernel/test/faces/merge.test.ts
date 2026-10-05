// M0-a-07: mergeFaces and absorbSliver (§3.4; §3.6 *Roles on shared stretches, and slivers*; §13.1): mergeFaces ∘
// splitFace restores the ring and the id; a shared structural edge is E_STRUCTURAL, a coarser one E_LEVEL; roles are
// preserved on coincident chains — a sliver between a spine and a shore keeps both; absorbSliver never deletes a
// structural edge; and absorbSliver as the transaction's repairer (§3.3 *Expectations*, onFail `repair`).
import { describe, expect, it } from 'vitest';
import { faceWalk, type FaceId, type Plat } from '../../src/arena/index.js';
import { absorbSliver, FACE_KIND_RESIDUE, mergeFaces, splitFace } from '../../src/faces/index.js';
import { insertChain } from '../../src/insert/index.js';
import { setOwner, tx, type TxEnv } from '../../src/tx/index.js';
import type { Invariant, Level } from '../../src/types/index.js';
import { edgeRows } from '../tx/support.js';
import { attempt, commit, content, faceAt, facesAt, framed, halves, pt, spec, state, withHoles } from './support.js';

const DB = [{ role: 'district_bound', entity: 'd:1' }];
type P = readonly [number, number];
const pts = (xs: readonly P[]) => xs.map(([x, y]) => pt(x, y));

function split(p: Plat, f: FaceId, cut: readonly P[], level: Level = 1): [FaceId, FaceId] {
  return commit(p, level, (o) => splitFace(o, f, pts(cut), { rows: DB })).value as [FaceId, FaceId];
}

function refusal(p: Plat, level: Level, run: Parameters<typeof attempt>[2]): string {
  const before = content(p);
  const r = attempt(p, level, run);
  expect(content(p)).toBe(before);
  return r.ok ? 'ok' : r.code;
}

describe('mergeFaces ∘ splitFace restores the ring and the id (§13.1)', () => {
  const cuts: readonly (readonly P[])[] = [
    [[1000, 0], [1000, 2000]],
    [[3000, 2000], [3000, 0]],
    [[1000, 0], [2000, 1000], [3000, 0]],
    [[1237, 0], [2911, 2000]],
    [[0, 700], [4000, 1300]],
    [[10, 1990], [2000, 0]],
  ];
  for (const cut of cuts) {
    it(`the cut ${JSON.stringify(cut)}`, () => {
      const p = halves();
      const f = faceAt(p, 1, 100, 100);
      const before = content(p);
      const [l, r] = split(p, f, cut);
      const m = commit(p, 1, (o) => mergeFaces(o, l, r)).value as FaceId;
      expect(m).toBe(f);
      expect(content(p)).toBe(before);
    });
  }

  it('merge in either argument order keeps the record with the smaller key', () => {
    const p = halves();
    const f = faceAt(p, 1, 100, 100);
    const [l, r] = split(p, f, [[1000, 0], [1000, 2000]]);
    expect(commit(p, 1, (o) => mergeFaces(o, r, l)).value).toBe(f);
  });

  it('a holed face merged with its hole\'s face: the hole is gone', () => {
    const p = withHoles([[[1500, 500], [2500, 500], [2500, 1500], [1500, 1500]]]);
    const f = faceAt(p, 1, 500, 500);
    const h = faceAt(p, 1, 2000, 1000);
    const m = commit(p, 1, (o) => mergeFaces(o, f, h)).value as FaceId;
    expect(faceWalk(p, 1, m)).toHaveLength(1);
    expect(content(p)).toBe(content(halves()));
  });
});

describe('mergeFaces refusals, nothing written', () => {
  it('a shared structural edge (a way): E_STRUCTURAL', () => {
    const p = halves();
    expect(refusal(p, 1, (o) => mergeFaces(o, faceAt(p, 1, 100, 100), faceAt(p, 1, 100, 3000)))).toBe('E_STRUCTURAL');
  });

  it('a shared edge coarser than the batch: E_LEVEL; a finer partition edge merges', () => {
    const p = halves();
    split(p, faceAt(p, 1, 100, 100), [[1000, 0], [1000, 2000]]);
    commit(p, 2, (o) => insertChain(o, pts([[0, 1000], [4000, 1000]]), [{ role: 'plot_line', entity: 'plot:1' }], 'mandatory'));
    const ll = faceAt(p, 2, 500, 500);
    const lr = faceAt(p, 2, 2000, 500);
    const ul = faceAt(p, 2, 500, 1500);
    expect(refusal(p, 2, (o) => mergeFaces(o, ll, lr))).toBe('E_LEVEL');
    // The left half keeps no L2 edge after the merge: its parent's own child again, no record (§2.2 rule 2) → −1.
    expect(commit(p, 2, (o) => mergeFaces(o, ll, ul)).value).toBe(-1);
    expect(faceAt(p, 2, 500, 500)).toBe(-1);
    content(p);
  });

  it('two faces sharing no edge, and a face with itself: E_DEGENERATE', () => {
    const p = halves();
    const [l, r] = split(p, faceAt(p, 1, 100, 100), [[1000, 0], [1000, 2000]]);
    split(p, r, [[2000, 0], [2000, 2000]]);
    const far = faceAt(p, 1, 3000, 1000);
    expect(refusal(p, 1, (o) => mergeFaces(o, l, far))).toBe('E_DEGENERATE');
    expect(refusal(p, 1, (o) => mergeFaces(o, l, l))).toBe('E_DEGENERATE');
  });
  it('a face with itself across its own antenna: E_DEGENERATE, the antenna kept', () => {
    const p = halves();
    commit(p, 1, (o) => insertChain(o, pts([[1000, 0], [1000, 1000]]), DB, 'mandatory'));
    const f = faceAt(p, 1, 500, 500);
    expect(faceAt(p, 1, 1500, 500)).toBe(f);
    expect(refusal(p, 1, (o) => mergeFaces(o, f, f))).toBe('E_DEGENERATE');
  });
});

describe('absorbSliver (§3.6\'s sliver rule)', () => {
  it('a face at or above both floors is left alone (nothing written)', () => {
    const p = halves();
    const f = faceAt(p, 1, 100, 100);
    const before = state(p);
    const c = commit(p, 1, (o) => absorbSliver(o, f, { minWidthCm: 500, minAreaCm2: 1_000_000 }));
    expect(c.value).toBe(f);
    expect(c.record).toBeNull();
    expect(state(p)).toBe(before);
  });

  it('a sliver below its width floor merges across its longest partition boundary', () => {
    const p = halves();
    const before = content(p);
    const [l, r] = split(p, faceAt(p, 1, 100, 100), [[100, 2000], [100, 0]]);
    // Directed down at x = 100: the wide part is left of it, the sliver right.
    expect(faceAt(p, 1, 3000, 1000)).toBe(l);
    const sliver = faceAt(p, 1, 50, 1000);
    expect(sliver).toBe(r);
    const m = commit(p, 1, (o) => absorbSliver(o, sliver, { minWidthCm: 200, minAreaCm2: 0 })).value as FaceId;
    expect(faceAt(p, 1, 50, 1000)).toBe(m);
    expect(content(p)).toBe(before);
  });

  it('a sliver below its area floor merges too', () => {
    const p = halves();
    split(p, faceAt(p, 1, 100, 100), [[0, 1900], [300, 2000]]);
    const sliver = faceAt(p, 1, 30, 1980);
    expect(sliver).toBeGreaterThanOrEqual(0);
    commit(p, 1, (o) => absorbSliver(o, sliver, { minWidthCm: 0, minAreaCm2: 50_000 }));
    expect(facesAt(p, 1)).toHaveLength(2);
    content(p);
  });

  it('the area floor is exact: a face of area A is below a floor of A + 1 cm² and not below one of A', () => {
    // The lower half, 4000 × 2000 cm, bounded by the frame and the way only: below its floor it is retyped residue.
    const p = halves();
    const f = faceAt(p, 1, 100, 100);
    const at = commit(p, 1, (o) => absorbSliver(o, f, { minWidthCm: 0, minAreaCm2: 8_000_000 }));
    expect(at.record).toBeNull();
    const below = commit(p, 1, (o) => absorbSliver(o, f, { minWidthCm: 0, minAreaCm2: 8_000_001 }));
    expect(below.record?.warnings.map((w) => w.code)).toContain('W_SLIVER_RETYPED');
    expect(p.faces[1].kind[f]).toBe(FACE_KIND_RESIDUE);
    content(p);
  });

  it('of two partition boundaries the sliver merges across the longer one', () => {
    // A strip x ∈ [1000, 1100]: 2000 cm shared with the face left of it, 500 and 1500 cm with the two right of it.
    const p = halves();
    split(p, faceAt(p, 1, 100, 100), [[1000, 0], [1000, 2000]]);
    split(p, faceAt(p, 1, 2000, 1000), [[1100, 2000], [1100, 0]]);
    split(p, faceAt(p, 1, 2000, 1000), [[1100, 500], [4000, 500]]);
    const sliver = faceAt(p, 1, 1050, 1000);
    const left = faceAt(p, 1, 500, 1000);
    const m = commit(p, 1, (o) => absorbSliver(o, sliver, { minWidthCm: 200, minAreaCm2: 0 })).value as FaceId;
    expect(faceAt(p, 1, 1050, 1000)).toBe(m);
    expect(faceAt(p, 1, 500, 1000)).toBe(m);
    expect(faceAt(p, 1, 2000, 250)).not.toBe(m);
    expect(faceAt(p, 1, 2000, 1000)).not.toBe(m);
    expect([sliver, left]).toContain(m);
    content(p);
  });

  it('never deletes a structural edge: a sliver under a way merges across its partition side only', () => {
    const p = halves();
    const before = content(p);
    split(p, faceAt(p, 1, 100, 100), [[0, 1900], [4000, 1900]]);
    const sliver = faceAt(p, 1, 2000, 1950);
    commit(p, 1, (o) => absorbSliver(o, sliver, { minWidthCm: 200, minAreaCm2: 0 }));
    expect(edgeRows(p, [0, 2000], [4000, 2000])).toEqual(expect.arrayContaining([expect.stringContaining('way')]));
    expect(content(p)).toBe(before);
  });

  it('a sliver between a spine and a shore keeps both: no edge deleted, the face retyped residue (W_SLIVER_RETYPED)', () => {
    const p = framed();
    commit(p, 0, (o) => insertChain(o, pts([[0, 1000], [4000, 1000]]), [{ role: 'shore', entity: 'water:1' }], 'mandatory'));
    commit(p, 1, (o) => insertChain(o, pts([[0, 1100], [4000, 1100]]), [{ role: 'way', entity: 'way:1' }], 'mandatory'));
    const upper = faceAt(p, 1, 2000, 3000);
    commit(p, 1, (o) => setOwner(o, [upper], 'block:9'));
    const sliver = faceAt(p, 1, 2000, 1050);
    const shore = edgeRows(p, [0, 1000], [4000, 1000]);
    const way = edgeRows(p, [0, 1100], [4000, 1100]);
    const c = commit(p, 1, (o) => absorbSliver(o, sliver, { minWidthCm: 200, minAreaCm2: 0 }));
    expect(c.value).toBe(sliver);
    expect(c.record?.warnings.map((w) => w.code)).toContain('W_SLIVER_RETYPED');
    expect(p.faces[1].kind[sliver]).toBe(FACE_KIND_RESIDUE);
    expect(p.faces[1].owner[sliver]).toBe(p.faces[1].owner[upper]);
    expect(edgeRows(p, [0, 1000], [4000, 1000])).toEqual(shore);
    expect(edgeRows(p, [0, 1100], [4000, 1100])).toEqual(way);
    content(p);
  });

  it('a residue between two owned neighbours takes the owner across its longest boundary (§3.6)', () => {
    // Fix round 1 (check B-1): the sliver shares 3 100 cm of way with `lower` and 3 000 cm with `upper`; every
    // boundary is structural, so it stays as residue owned by `lower`, the neighbour across the longer boundary.
    const p = halves();
    commit(p, 1, (o) => insertChain(o, pts([[0, 1900], [3000, 1900], [3000, 2000]]), [{ role: 'way', entity: 'way:7' }], 'mandatory'));
    const sliver = faceAt(p, 1, 1500, 1950);
    const lower = faceAt(p, 1, 1500, 500);
    const upper = faceAt(p, 1, 1500, 3000);
    commit(p, 1, (o) => {
      const a = setOwner(o, [lower], 'block:low');
      if (!a.ok) return a;
      return setOwner(o, [upper], 'block:up');
    });
    expect(p.faces[1].owner[lower]).not.toBe(p.faces[1].owner[upper]);
    const c = commit(p, 1, (o) => absorbSliver(o, sliver, { minWidthCm: 200, minAreaCm2: 0 }));
    expect(c.value).toBe(sliver);
    expect(p.faces[1].kind[sliver]).toBe(FACE_KIND_RESIDUE);
    expect(p.faces[1].owner[sliver]).toBe(p.faces[1].owner[lower]);
    content(p);
  });

  it('a way pulled onto a shore is one edge carrying both roles (no sliver at all)', () => {
    const p = framed();
    commit(p, 0, (o) => insertChain(o, pts([[0, 1000], [4000, 1000]]), [{ role: 'shore', entity: 'water:1' }], 'mandatory'));
    commit(p, 1, (o) => insertChain(o, pts([[0, 1010], [4000, 1010]]), [{ role: 'way', entity: 'way:1' }], 'mandatory'));
    const rows = edgeRows(p, [0, 1000], [4000, 1000]) ?? [];
    expect(rows.some((r) => r.includes('shore'))).toBe(true);
    expect(rows.some((r) => r.includes('way'))).toBe(true);
    content(p);
  });
});

describe('absorbSliver as the transaction\'s repairer (§3.3 onFail `repair`)', () => {
  const FLOOR: Invariant = { name: 'block floor', scope: 'batch', class: 'hard', kind: 'classFloor', faceClass: 'block' };
  const env: TxEnv = { floors: (c) => (c === 'block' ? { minWidthCm: 100 } : undefined), repair: absorbSliver };

  it('a batch leaving a 50 cm sliver commits with the sliver absorbed', () => {
    const p = framed();
    const before = content(p);
    const r = tx(p, spec(1, { onFail: 'repair', expect: [FLOOR] }), (o) => insertChain(o, pts([[0, 3950], [4000, 3950]]), [{ role: 'district_bound', entity: 'district:7' }], 'mandatory'), env);
    expect(r.ok).toBe(true);
    // The repair deleted the partition edge the batch inserted: the frame as before, its L1 region an own child again.
    expect(content(p)).toBe(before);
    expect(facesAt(p, 1)).toEqual([]);
  });
});
