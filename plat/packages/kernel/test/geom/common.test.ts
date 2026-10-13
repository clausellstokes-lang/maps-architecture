// M0-a-10: geom/common.ts — π, the lattice-coordinate check, `lp` and `distinctRing` are the kernel's shared exact
// module's (kernel-plan.md §1.12 G-1; C-0314, C-0333): re-exported under their names, so a geometry module and every
// by-path importer of geom/common.ts read one definition, and num/exact.ts — the leaf — imports nothing from geom/.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import * as geomCommon from '../../src/geom/common.js';
import * as exact from '../../src/num/exact.js';
import { generator, intIn } from './support.js';

const source = (file: string): string => readFileSync(new URL(`../../src/${file}`, import.meta.url), 'utf8');

describe('geom/common.ts re-exports num/exact.ts\'s lattice inputs and π (kernel-plan.md §1.12 G-1)', () => {
  it('PI, lp, isLatticeCoord and distinctRing are the very bindings of num/exact.ts', () => {
    expect(geomCommon.PI).toBe(exact.PI);
    expect(geomCommon.lp).toBe(exact.lp);
    expect(geomCommon.isLatticeCoord).toBe(exact.isLatticeCoord);
    expect(geomCommon.distinctRing).toBe(exact.distinctRing);
  });

  it('declares none of the four itself, and num/exact.ts imports nothing under geom/ (one direction, the leaf)', () => {
    const common = source('geom/common.ts');
    for (const name of ['PI', 'lp', 'isLatticeCoord', 'distinctRing']) {
      expect(new RegExp(`export (const|function) ${name}\\b`).test(common), name).toBe(false);
    }
    expect(common).toMatch(/export \{[^}]*\} from '\.\.\/num\/exact\.js';/);
    expect(source('num/exact.ts')).not.toMatch(/from '\.\.\/geom\//);
  });

  it('keeps the values geometry reads: π to the double, the 2²³ coordinate bound, distinctRing\'s order and closing repeat', () => {
    expect(geomCommon.PI).toBe(3.141592653589793);
    for (const [v, want] of [[0, true], [8_388_607, true], [-8_388_607, true], [8_388_608, false], [0.5, false], [Number.NaN, false], [Number.POSITIVE_INFINITY, false]] as const) {
      expect(geomCommon.isLatticeCoord(v), String(v)).toBe(want);
    }
    const rnd = generator(0x10c1);
    for (let k = 0; k < 200; k += 1) {
      const n = intIn(rnd, 1, 8);
      const ring = Array.from({ length: n }, () => geomCommon.lp(intIn(rnd, -3, 3), intIn(rnd, -3, 3)));
      const out = geomCommon.distinctRing(ring);
      for (let i = 0; i + 1 < out.length; i += 1) expect(out[i].x === out[i + 1].x && out[i].y === out[i + 1].y).toBe(false);
      if (out.length > 1) expect(out[0].x === out[out.length - 1].x && out[0].y === out[out.length - 1].y).toBe(false);
      for (const p of out) expect(ring).toContain(p);
    }
  });
});
