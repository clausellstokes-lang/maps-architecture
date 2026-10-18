// M0-a-07: each partitioner charges its count (§3.4: "a declared operation count"; §3.3 *Work limits*): a batch whose
// limit a partitioner passes is refused E_WORK_LIMIT with the arena at its version, and every later op of a doomed
// batch refuses with it; a refused multi-cut op leaves nothing of its earlier cuts.
import { describe, expect, it } from 'vitest';
import type { Plat } from '../../src/arena/index.js';
import { absorbSliver, claimSubFace, mergeFaces, pinVertices, radialSplit, ringBand, splitFace } from '../../src/faces/index.js';
import { insertChain } from '../../src/insert/index.js';
import { ok, type KernelResult } from '../../src/num/index.js';
import { tx, type Overlay } from '../../src/tx/index.js';
import { commit, content, faceAt, halves, pt, spec, state } from './support.js';

const DB = [{ role: 'district_bound', entity: 'd:1' }];

describe('work limits (§3.3)', () => {
  type Op = (f: number) => (o: Overlay) => KernelResult<unknown>;
  const ops: readonly (readonly [string, Op])[] = [
    ['splitFace', (f) => (o) => splitFace(o, f, [pt(1000, 0), pt(1000, 2000)], { rows: DB })],
    ['radialSplit', (f) => (o) => radialSplit(o, f, pt(2000, 1000), [0, 12_000, 24_000], { rows: DB })],
    ['ringBand', (f) => (o) => ringBand(o, f, 300, { rows: DB })],
    ['claimSubFace', () => (o) => claimSubFace(o, { ring: [pt(1000, 500), pt(3000, 500), pt(3000, 1500), pt(1000, 1500)] }, 'r:1')],
    ['absorbSliver', (f) => (o) => absorbSliver(o, f, { minWidthCm: 5000, minAreaCm2: 0 })],
  ];
  for (const [name, op] of ops) {
    it(`${name}: E_WORK_LIMIT at a limit of 3, the version kept`, () => {
      const p = halves();
      const f = faceAt(p, 1, 100, 100);
      const before = state(p);
      const r = tx(p, spec(1, { workLimit: 3 }), op(f));
      expect(!r.ok && r.code).toBe('E_WORK_LIMIT');
      expect(state(p)).toBe(before);
    });
  }

  it('a doomed batch: an op after the limit refuses E_WORK_LIMIT', () => {
    const p = halves();
    const f = faceAt(p, 1, 100, 100);
    const codes: string[] = [];
    const r = tx(p, spec(1, { workLimit: 5 }), (o) => {
      const a = splitFace(o, f, [pt(1000, 0), pt(1000, 2000)], { rows: DB });
      if (!a.ok) codes.push(a.code);
      const b = mergeFaces(o, f, faceAt(p, 1, 100, 3000));
      if (!b.ok) codes.push(b.code);
      return b;
    });
    expect(r.ok).toBe(false);
    expect(codes).toEqual(['E_WORK_LIMIT', 'E_WORK_LIMIT']);
  });

  it('a batch an insertion took past its limit is doomed: a partitioner after it refuses E_WORK_LIMIT before any other check', () => {
    const p = halves();
    commit(p, 1, (o) => insertChain(o, [pt(2000, 0), pt(2000, 1000), pt(4000, 1000)], DB, 'mandatory'));
    const ell = faceAt(p, 1, 500, 500);
    const codes: string[] = [];
    const r = tx(p, spec(1, { workLimit: 3 }), (o) => {
      const a = insertChain(o, [pt(500, 500), pt(1500, 500), pt(1500, 1500)], DB, 'mandatory');
      if (!a.ok) codes.push(a.code);
      // Not convex: without the doom this is E_NON_CONVEX.
      const b = ringBand(o, ell, 100, { rows: DB });
      if (!b.ok) codes.push(b.code);
      return b;
    });
    expect(r.ok).toBe(false);
    expect(codes).toEqual(['E_WORK_LIMIT', 'E_WORK_LIMIT']);
  });
});

describe('each partitioner charges its count (§3.4)', () => {
  /** The lower half cut by a way along y = 1000 with a `junction` on (2000, 1000), and optionally a hole in the face below it. */
  function arena(hole: boolean): Plat {
    const p = halves();
    commit(p, 1, (o) => insertChain(o, [pt(0, 1000), pt(2000, 1000), pt(4000, 1000)], [{ role: 'way', entity: 'way:2' }], 'mandatory', { knots: [{ index: 1, role: 'junction', ordinal: 0 }] }));
    if (hole) commit(p, 1, (o) => insertChain(o, [pt(1500, 300), pt(2500, 300), pt(2500, 700), pt(1500, 700)], DB, 'mandatory', { closed: true }));
    return p;
  }
  const pin = (o: Overlay) => pinVertices(o, [{ role: 'junction', entity: 'way:2' }]);

  it('pinVertices charges one operation per vertex it pins', () => {
    const p = arena(false);
    expect(commit(p, 1, pin).record?.work).toBe(1);
  });

  it('splitFace charges one face walk per ring of its face, even when it refuses (a cut of one point)', () => {
    for (const [hole, rings] of [[false, 1], [true, 2]] as const) {
      const p = arena(hole);
      const f = faceAt(p, 1, 100, 100);
      const c = commit(p, 1, (o) => {
        const r = splitFace(o, f, [pt(1000, 0)], { rows: DB });
        expect(!r.ok && r.code).toBe('E_NOT_TWO_CROSSINGS');
        return pin(o);
      });
      expect(c.record?.work).toBe(rings + 1);
    }
  });
});

describe('a refused multi-cut op leaves nothing of its earlier cuts, in a batch that goes on (C-0185 (1))', () => {
  it('radialSplit refused at its third ray (along its first cut): the batch commits with the face whole', () => {
    const p = halves();
    const f = faceAt(p, 1, 100, 100);
    const before = content(p);
    const c = commit(p, 1, (o) => {
      const r = radialSplit(o, f, pt(2000, 1000), [0, 18_000, 18_001], { rows: DB });
      expect(!r.ok && r.code).toBe('E_NOT_TWO_CROSSINGS');
      return ok(undefined);
    });
    expect(c.record).toBeNull();
    expect(content(p)).toBe(before);
  });
});

describe('a refused multi-cut op puts the arena back itself (its savepoint), in a batch that writes after it', () => {
  it('radialSplit refused at its third ray, then a pin: the arena holds the pin only', () => {
    const arena = (): Plat => {
      const p = halves();
      commit(p, 1, (o) => insertChain(o, [pt(0, 1000), pt(2000, 1000), pt(4000, 1000)], [{ role: 'way', entity: 'way:2' }], 'mandatory', { knots: [{ index: 1, role: 'junction', ordinal: 0 }] }));
      return p;
    };
    const pin = (o: Overlay) => pinVertices(o, [{ role: 'junction', entity: 'way:2' }]);
    const ref = arena();
    commit(ref, 1, pin);
    const p = arena();
    const f = faceAt(p, 1, 100, 100);
    commit(p, 1, (o) => {
      const r = radialSplit(o, f, pt(2000, 500), [0, 18_000, 18_001], { rows: DB });
      expect(!r.ok && r.code).toBe('E_NOT_TWO_CROSSINGS');
      return pin(o);
    });
    expect(content(p)).toBe(content(ref));
  });
});
