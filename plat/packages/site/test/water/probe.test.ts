import { describe, expect, it } from 'vitest';
import { runS1 } from '../../src/water/index.js';
import { ground, riverFixture } from './support.js';

describe('probe', () => {
  it('a CITY river through S1', () => {
    for (const seed of [1, 2, 3]) {
      const t0 = performance.now();
      const fx = riverFixture(seed, { relief: 'rolling', primitives: [{ kind: 'valley', at: { x: 0, y: 0 } as never, bearingCdeg: 4500 as never, widthM: 800, depthM: 20 }] }, { inflowBearingCdeg: 4500, tributaries: [{}] });
      const t1 = performance.now();
      const { kernel, plat } = ground(fx.frame);
      const r = runS1({ terrain: fx.terrain, water: fx.water, kernel }, fx.ctx);
      const t2 = performance.now();
      if (!r.ok) console.log(r.code, r.detail);
      expect(r.ok).toBe(true);
      if (!r.ok) return;
      console.log(seed, 'fixture', Math.round(t1 - t0), 'ms; S1', Math.round(t2 - t1), 'ms; bodies', r.value.water.bodies.map((b) => b.id + ':' + (b.course ?? []).length), 'sites', r.value.sites.length, r.value.sites.map((s) => s.type + ' ' + s.spanCm).join(','), 'land', r.value.land.length, 'outfalls', r.value.terrain.outfalls.length, 'dropped', JSON.stringify(r.value.report.dropped), 'v', plat.version, 'warn', JSON.stringify(r.value.report.warnings));
    }
  }, 600_000);
});
