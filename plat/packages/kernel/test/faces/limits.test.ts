// M0-a-07: each partitioner charges its count (§3.4: "a declared operation count"; §3.3 *Work limits*): a batch whose
// limit a partitioner passes is refused E_WORK_LIMIT with the arena at its version, and every later op of a doomed
// batch refuses with it; a refused multi-cut op leaves nothing of its earlier cuts.
import { describe, expect, it } from 'vitest';
import { absorbSliver, claimSubFace, mergeFaces, radialSplit, ringBand, splitFace } from '../../src/faces/index.js';
import type { KernelResult } from '../../src/num/index.js';
import { tx, type Overlay } from '../../src/tx/index.js';
import { faceAt, halves, pt, spec, state } from './support.js';

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
});
