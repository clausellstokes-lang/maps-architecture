import { appendFileSync } from 'node:fs';
import { describe, it } from 'vitest';
import { runS1 } from '../../src/water/index.js';
import { ground, riverFixture } from './support.js';

const LOG = (s: string): void => appendFileSync('/tmp/claude-1000/-home-cstokes111-Maps/6e7b0e39-9580-4748-b844-6b72e677c650/scratchpad/e03/p11.txt', s);

describe('probe', () => {
  it('phases', () => {
    for (let s = 1; s <= 12; s += 1) {
      const req = s % 2 === 0 ? { tributaries: [{}], mouth: 'estuary' as const } : { tributaries: [{}, {}] };
      let t = performance.now();
      const fx = riverFixture(s, { relief: s % 3 === 0 ? 'hilly' : 'rolling' }, req, {});
      const f = performance.now() - t;
      t = performance.now();
      const { kernel } = ground(fx.frame);
      const r = runS1({ terrain: fx.terrain, water: fx.water, kernel, mouth: (req as { mouth?: 'estuary' }).mouth }, fx.ctx);
      LOG(`seed ${s} fixture ${Math.round(f)} S1 ${Math.round(performance.now() - t)} ms ${r.ok ? `ok bodies ${r.value.water.bodies.length} sites ${r.value.sites.length} land ${r.value.land.length} fallbacks ${JSON.stringify(r.value.report.fallbacks)} dropped ${JSON.stringify(r.value.report.dropped)}` : r.code + ' ' + r.detail}\n`);
    }
  }, 1_800_000);
});
