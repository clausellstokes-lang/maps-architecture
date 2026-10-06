import { appendFileSync } from 'node:fs';
import { describe, it } from 'vitest';
import { reachOf, splitEstuary, waterPolygons } from '../../src/water/index.js';
import { riverFixture } from './support.js';

const LOG = (s: string): void => appendFileSync('/tmp/claude-1000/-home-cstokes111-Maps/6e7b0e39-9580-4748-b844-6b72e677c650/scratchpad/e03/p13.txt', s);

describe('probe', () => {
  it('33', () => {
    const fx = riverFixture(33, { relief: 'rolling' }, { inflowBearingCdeg: (33 * 3700) % 36000, mouth: 'estuary' }, { areaHa: 100 });
    const reach = reachOf(fx.frame);
    const bodies = splitEstuary(fx.water.bodies, reach, 'estuary');
    LOG(`reach ${JSON.stringify(reach)} bodies ${bodies.map((b) => `${b.id} ${b.course?.length} first ${JSON.stringify(b.course?.[0])} last ${JSON.stringify(b.course?.at(-1))} w ${b.widthProfile?.[0]}..${b.widthProfile?.at(-1)}`).join(' | ')}\n`);
    for (const slow of [false, true]) {
      const p = waterPolygons(bodies, reach, { slowOnly: slow });
      if (!p.ok) { LOG(`${p.code}\n`); continue; }
      LOG(`slow ${slow} fallbacks ${JSON.stringify(p.value.fallbacks)}\n`);
      for (const r of p.value.reaches) {
        const all = r.parts.flatMap((q) => q.rings);
        const seen = new Map<string, number>();
        for (const ring of all) for (const q of ring) seen.set(`${q.x},${q.y}`, (seen.get(`${q.x},${q.y}`) ?? 0) + 1);
        const dup = [...seen].filter(([, c]) => c > 1);
        LOG(`  ${r.body.id} parts ${r.parts.length} rings ${all.map((q) => q.length).join('/')} repeated ${JSON.stringify(dup.slice(0, 5))}\n`);
        if (r.body.kind === 'estuary') LOG(`   estuary ring ${JSON.stringify(all[0])}\n`);
      }
    }
  }, 900_000);
});
