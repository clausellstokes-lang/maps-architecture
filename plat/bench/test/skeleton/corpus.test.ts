// M0-a-12: the stand-in corpus's synthetic footprints (C-0015, C-0067, C-0172 (8)). The committed fixture is the seeded
// generator's output byte for byte, so its counts are reproducible from the seed; the generator is a pure function of
// seed and count; the file round-trips; and every footprint is valid skeleton input that would reach the skeleton — on
// the lattice, simple (an independent exact segment test written here), holes inside their outer ring, and no single-ring
// footprint passing the convex near-rectangle test (it would take the exact roof, §3.8).
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { convexNearRectangle, type LatticePoint, type Polygon } from '@plat/kernel';
import { describe, expect, it } from 'vitest';
import { CORPUS_COUNT, CORPUS_DIR, CORPUS_FILE, CORPUS_SEED, decodeCorpus, encodeCorpus, FAMILIES, generateCorpus } from '../../src/skeleton/index.js';

const TIMEOUT = 600_000;
const committed = readFileSync(join(CORPUS_DIR, CORPUS_FILE), 'utf8');

/** Exact twice-area of a ring (lattice integers). */
function area2(r: readonly LatticePoint[]): number {
  let s = 0;
  for (let i = 0; i < r.length; i += 1) {
    const a = r[i];
    const b = r[(i + 1) % r.length];
    s += a.x * b.y - b.x * a.y;
  }
  return s;
}

const orient = (a: LatticePoint, b: LatticePoint, c: LatticePoint): number => Math.sign((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x));
const within = (a: LatticePoint, b: LatticePoint, c: LatticePoint): boolean =>
  Math.min(a.x, b.x) <= c.x && c.x <= Math.max(a.x, b.x) && Math.min(a.y, b.y) <= c.y && c.y <= Math.max(a.y, b.y);

/** Do any two edges of the ring set meet other than consecutive edges at their shared end? */
function notSimple(rings: readonly Polygon[]): boolean {
  const edges: { a: LatticePoint; b: LatticePoint; ring: number; i: number; n: number }[] = [];
  rings.forEach((r, ring) => r.forEach((a, i) => edges.push({ a, b: r[(i + 1) % r.length], ring, i, n: r.length })));
  for (let x = 0; x < edges.length; x += 1) {
    for (let y = x + 1; y < edges.length; y += 1) {
      const e = edges[x];
      const f = edges[y];
      const consecutive = e.ring === f.ring && (f.i === e.i + 1 || (e.i === 0 && f.i === e.n - 1));
      const o1 = orient(e.a, e.b, f.a);
      const o2 = orient(e.a, e.b, f.b);
      const o3 = orient(f.a, f.b, e.a);
      const o4 = orient(f.a, f.b, e.b);
      if (consecutive) {
        if (o1 === 0 && o2 === 0) {
          // collinear neighbours meet beyond their shared end only when they fold back
          const s = f.i === e.i + 1 ? e.b : e.a;
          const p = f.i === e.i + 1 ? e.a : e.b;
          const q = f.i === e.i + 1 ? f.b : f.a;
          if ((p.x - s.x) * (q.x - s.x) + (p.y - s.y) * (q.y - s.y) > 0) return true;
        }
        continue;
      }
      if (o1 * o2 < 0 && o3 * o4 < 0) return true;
      if ((o1 === 0 && within(e.a, e.b, f.a)) || (o2 === 0 && within(e.a, e.b, f.b)) || (o3 === 0 && within(f.a, f.b, e.a)) || (o4 === 0 && within(f.a, f.b, e.b))) return true;
    }
  }
  return false;
}

/** Is p strictly inside the ring (even–odd, p off its edges)? */
function inside(r: readonly LatticePoint[], p: LatticePoint): boolean {
  let odd = false;
  for (let i = 0; i < r.length; i += 1) {
    const a = r[i];
    const b = r[(i + 1) % r.length];
    if (a.y > p.y === b.y > p.y) continue;
    if (a.x + ((p.y - a.y) * (b.x - a.x)) / (b.y - a.y) > p.x) odd = !odd;
  }
  return odd;
}

describe('the synthetic footprints (bench/fixtures/skeleton-corpus/)', () => {
  it('the committed file is the seeded generator output byte for byte (its counts reproduce from the seed)', () => {
    expect(encodeCorpus(generateCorpus(CORPUS_SEED, CORPUS_COUNT))).toBe(committed);
  });

  it('the generator is a pure function of seed and count; another seed draws another corpus', () => {
    const a = encodeCorpus(generateCorpus(5, 120));
    expect(encodeCorpus(generateCorpus(5, 120))).toBe(a);
    expect(encodeCorpus(generateCorpus(6, 120))).not.toBe(a);
    // a shorter corpus is the longer one's head: each footprint is drawn in turn from one stream
    expect(generateCorpus(5, 60).faces).toEqual(generateCorpus(5, 120).faces.slice(0, 60));
  });

  it('decodes to what was encoded; numbers-only values, one footprint per line', () => {
    const file = decodeCorpus(committed);
    expect(file.count).toBe(CORPUS_COUNT);
    expect(file.seed).toBe(CORPUS_SEED);
    expect(file.families).toEqual([...FAMILIES]);
    expect(encodeCorpus(file)).toBe(committed);
    expect(committed.split('\n').length).toBe(CORPUS_COUNT + 3);
    expect(() => decodeCorpus(committed.replace('"count":2000', '"count":1999'))).toThrow(/count/);
    expect(() => decodeCorpus(committed.replace('plat-skeleton-corpus/1', 'other'))).toThrow(/schema/);
  });

  it(
    'every footprint is valid skeleton input that reaches the skeleton: lattice, simple, holes inside, never a convex near-rectangle',
    () => {
      const file = decodeCorpus(committed);
      const perFamily = new Array<number>(FAMILIES.length).fill(0);
      for (const [i, f] of file.faces.entries()) {
        perFamily[f.family] += 1;
        for (const r of f.rings) {
          expect(r.length, `face ${i}`).toBeGreaterThanOrEqual(4);
          for (const p of r) expect(Number.isInteger(p.x) && Number.isInteger(p.y) && Math.abs(p.x) < 2 ** 23 && Math.abs(p.y) < 2 ** 23).toBe(true);
        }
        expect(notSimple(f.rings), `face ${i}`).toBe(false);
        expect(area2(f.rings[0]), `face ${i}`).toBeGreaterThan(0);
        for (const hole of f.rings.slice(1)) {
          expect(area2(hole), `face ${i}`).toBeLessThan(0);
          for (const p of hole) expect(inside(f.rings[0], p), `face ${i}`).toBe(true);
        }
        if (f.rings.length === 1) {
          const near = convexNearRectangle(f.rings[0]);
          expect(near.ok && near.value.pass, `face ${i}`).toBe(false);
        }
      }
      // every family is drawn, near its weight (25 12 13 15 10 12 13 of 100)
      const weights = [25, 12, 13, 15, 10, 12, 13];
      perFamily.forEach((n, k) => {
        expect(n / CORPUS_COUNT, FAMILIES[k]).toBeGreaterThan((weights[k] / 100) * 0.7);
        expect(n / CORPUS_COUNT, FAMILIES[k]).toBeLessThan((weights[k] / 100) * 1.3);
      });
    },
    TIMEOUT,
  );
});
