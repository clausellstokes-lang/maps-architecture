// M0-a-12: the Voronoi dual (C-0007; the item's test "the dual's circumcentres use + − × ÷ only (a grep test; the
// cross-architecture bit comparison is run by M0-d-06)"). The grep: src/medial/dual.ts's code names no Math member, no
// `**`, no square root and calls nothing but `ratio` (§3.2 (8)'s checked division) inside `circumcentres`. Beside it, the
// circumcentres' values — equidistant from their three sites, a known answer, NaN for a zero-area triangle — and the
// Voronoi edges' reading of the half-edges.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { circumcentres, delaunay, voronoiEdges, type Delaunay } from '../../src/medial/index.js';
import { generator, pt } from './support.js';

const DUAL = fileURLToPath(new URL('../../src/medial/dual.ts', import.meta.url));

/** The file's code without comments (line comments, block comments and JSDoc). */
function code(file: string): string {
  return readFileSync(file, 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n')
    .map((line) => line.replace(/\/\/.*$/, ''))
    .join('\n');
}

/** The body of `export function <name>(` up to its closing brace at column 0. */
function body(src: string, name: string): string {
  const start = src.indexOf(`export function ${name}(`);
  if (start < 0) throw new Error(`no function ${name}`);
  const end = src.indexOf('\n}', start);
  return src.slice(start, end + 2);
}

describe('the circumcentres use + − × ÷ only (a source scan; M0-d-06 compares the bits across architectures)', () => {
  const src = code(DUAL);
  const fn = body(src, 'circumcentres');

  it('dual.ts names no Math member, no ** power and no square root', () => {
    expect(src).not.toMatch(/\bMath\s*\./);
    expect(src).not.toMatch(/\*\*/);
    expect(src).not.toMatch(/sqrt|hypot|dmath|pow\s*\(/);
  });

  it('circumcentres calls nothing but ratio (the checked ÷) and allocates one Float64Array', () => {
    const calls = [...fn.matchAll(/([A-Za-z_$][\w$]*)\s*\(/g)].map((m) => m[1]).filter((c) => c !== 'circumcentres' && c !== 'for' && c !== 'if');
    expect(new Set(calls)).toEqual(new Set(['ratio', 'Float64Array']));
    // its operators: + − × ÷ (through ratio), assignment and comparison — nothing else of arithmetic
    const ops = fn.replace(/\/\/.*$/gm, '').match(/[+\-*/%]{1,2}=?|<<|>>|\^|~/g) ?? [];
    for (const op of ops) expect(['+', '-', '*', '+=', '/']).toContain(op);
  });
});

describe('circumcentres and voronoiEdges', () => {
  it('the right isosceles triangle (0, 0), (200, 0), (0, 200) has its centre at (100, 100)', () => {
    const d = delaunay([pt(0, 0), pt(200, 0), pt(0, 200)]);
    if (!d.ok) throw new Error('refused');
    const c = circumcentres(d.value, 0, 0);
    expect(Array.from(c)).toEqual([100, 100]);
    expect(Array.from(circumcentres(d.value, -50, 30))).toEqual([150, 70]);
  });

  it('every centre is equidistant from its triangle three sites (relative 10⁻¹²)', () => {
    const rnd = generator(9);
    for (let k = 0; k < 40; k += 1) {
      const pts = [];
      for (let i = 0; i < 60; i += 1) pts.push(pt(Math.floor(rnd() * 400_000), Math.floor(rnd() * 400_000)));
      const d = delaunay(pts);
      if (!d.ok) throw new Error('refused');
      const c = circumcentres(d.value, 0, 0);
      const tri = d.value.triangles;
      for (let t = 0; t < tri.length / 3; t += 1) {
        const r = [0, 1, 2].map((j) => {
          const s = d.value.sites[tri[3 * t + j]];
          return Math.hypot(c[2 * t] - s.x, c[2 * t + 1] - s.y);
        });
        expect(Math.abs(r[0] - r[1])).toBeLessThanOrEqual(1e-12 * r[0] + 1e-9);
        expect(Math.abs(r[0] - r[2])).toBeLessThanOrEqual(1e-12 * r[0] + 1e-9);
      }
    }
  });

  it('a zero-area triangle has no centre (NaN), never a division by zero', () => {
    const d: Delaunay = { sites: [pt(0, 0), pt(10, 0), pt(30, 0)], siteOf: new Int32Array([0, 1, 2]), triangles: new Uint32Array([0, 1, 2]), halfedges: new Int32Array([-1, -1, -1]) };
    const c = circumcentres(d, 0, 0);
    expect(Number.isNaN(c[0]) && Number.isNaN(c[1])).toBe(true);
  });

  it('one Voronoi edge per interior Delaunay edge, joining the two triangles that share its two sites', () => {
    const rnd = generator(4);
    const pts = [];
    for (let i = 0; i < 80; i += 1) pts.push(pt(Math.floor(rnd() * 10_000), Math.floor(rnd() * 10_000)));
    const d = delaunay(pts);
    if (!d.ok) throw new Error('refused');
    const v = voronoiEdges(d.value);
    const interior = Array.from(d.value.halfedges).filter((h) => h >= 0).length / 2;
    expect(v).toHaveLength(interior);
    const tri = d.value.triangles;
    const has = (t: number, s: number): boolean => tri[3 * t] === s || tri[3 * t + 1] === s || tri[3 * t + 2] === s;
    for (const e of v) {
      expect(e.u).not.toBe(e.v);
      expect(e.p).not.toBe(e.q);
      for (const t of [e.u, e.v]) expect(has(t, e.p) && has(t, e.q)).toBe(true);
      // the two triangles share exactly the dual's two sites
      const su = [tri[3 * e.u], tri[3 * e.u + 1], tri[3 * e.u + 2]];
      const shared = su.filter((s) => has(e.v, s)).sort((a, b) => a - b);
      expect(shared).toEqual([e.p, e.q].sort((a, b) => a - b));
    }
  });
});
