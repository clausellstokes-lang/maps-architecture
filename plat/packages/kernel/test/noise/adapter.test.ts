// M0-e-01: the simplex-noise adapter (§3.1, §14, §6.5 (4); C-0011, C-0065) — the one file of plat/ that imports the
// library; a field drawn from a kernel Stream reads exactly SIMPLEX2_DRAWS uniforms and never Math.random; the same
// stream state gives the same field; its values lie in [−1, 1].
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { seededSimplex2, SIMPLEX2_DRAWS } from '../../src/adapters/simplex-noise.js';
import { streamFromKey } from '../../src/rng/index.js';

const PLAT = fileURLToPath(new URL('../../../../', import.meta.url));

/** Every .ts / .mts / .js / .mjs file under dir, outside node_modules and dist. */
function codeFiles(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === 'dist' || name === 'coverage') continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) codeFiles(p, out);
    else if (/\.(ts|mts|cts|js|mjs|cjs)$/.test(name)) out.push(p);
  }
  return out;
}

describe('the simplex-noise adapter (§14: one adapter file; C-0065)', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('is the one file of plat/packages and plat/bench that imports simplex-noise', () => {
    const importers = [...codeFiles(join(PLAT, 'packages')), ...codeFiles(join(PLAT, 'bench'))]
      .filter((f) => /from\s+['"]simplex-noise['"]|import\(\s*['"]simplex-noise['"]\s*\)|require\(\s*['"]simplex-noise['"]\s*\)/.test(readFileSync(f, 'utf8')))
      .map((f) => relative(PLAT, f));
    expect(importers).toEqual(['packages/kernel/src/adapters/simplex-noise.ts']);
  });

  it('draws exactly SIMPLEX2_DRAWS (255) uniforms from the stream and leaves it continued after them', () => {
    const a = streamFromKey([11, 22, 33, 44]);
    const b = streamFromKey([11, 22, 33, 44]);
    seededSimplex2(a);
    for (let i = 0; i < SIMPLEX2_DRAWS; i += 1) b.float01();
    expect(SIMPLEX2_DRAWS).toBe(255);
    expect([a.u32(), a.u32(), a.u32()]).toEqual([b.u32(), b.u32(), b.u32()]);
  });

  it('reads no Math.random: a field is made and sampled with Math.random throwing', () => {
    vi.spyOn(Math, 'random').mockImplementation(() => {
      throw new Error('Math.random read');
    });
    const field = seededSimplex2(streamFromKey([5, 6, 7, 8]));
    expect(Number.isFinite(field(0.3, -1.7))).toBe(true);
    expect(Math.random).not.toHaveBeenCalled();
  });

  it('the same stream state gives the same field to the bit; another state another field', () => {
    const f1 = seededSimplex2(streamFromKey([1, 2, 3, 4]));
    const f2 = seededSimplex2(streamFromKey([1, 2, 3, 4]));
    const f3 = seededSimplex2(streamFromKey([1, 2, 3, 5]));
    let differ = 0;
    for (let i = 0; i < 400; i += 1) {
      const x = i * 0.173 - 31.5;
      const y = i * 0.091 + 7.25;
      expect(Object.is(f1(x, y), f2(x, y))).toBe(true);
      if (f1(x, y) !== f3(x, y)) differ += 1;
    }
    expect(differ).toBeGreaterThan(300);
  });

  it('takes values in [−1, 1] and is 0 on the lattice corners (simplex noise\'s own property)', () => {
    const f = seededSimplex2(streamFromKey([9, 9, 9, 9]));
    let lo = 0;
    let hi = 0;
    for (let j = 0; j < 200; j += 1) {
      for (let i = 0; i < 200; i += 1) {
        const v = f(i * 0.0731, j * 0.0677);
        expect(v).toBeGreaterThanOrEqual(-1);
        expect(v).toBeLessThanOrEqual(1);
        if (v < lo) lo = v;
        if (v > hi) hi = v;
      }
    }
    expect(f(0, 0)).toBe(0);
    expect(lo).toBeLessThan(-0.5);
    expect(hi).toBeGreaterThan(0.5);
  });
});
