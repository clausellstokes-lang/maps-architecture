import { it } from 'vitest';
import { flatFixture } from '../../../src/index.js';
import { grow } from './support.js';
import { violations } from './checks.js';
it('find', { timeout: 900_000 }, () => {
  for (const seed of [48, 53, 77, 30, 20]) {
    try { const g = grow(flatFixture(seed)); console.log('seed', seed, JSON.stringify(violations(g)), 'roads', g.growth.stages.map((s) => s.roads.map((r) => r.level).join('')).join('|')); } catch (e) { console.log('seed', seed, String(e)); }
  }
});
