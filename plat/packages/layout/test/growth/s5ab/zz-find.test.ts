import { it } from 'vitest';
import { flatFixture } from '../../../src/index.js';
import { grow } from './support.js';
import { violations } from './checks.js';
it('find', { timeout: 900_000 }, () => {
  for (const seed of [54, 37, 48]) {
    try { const g = grow(flatFixture(seed)); console.log('seed', seed, JSON.stringify(violations(g)), 'redraws', g.growth.stages.map((s) => s.redraws).join(',')); } catch (e) { console.log('seed', seed, String(e)); }
  }
});
