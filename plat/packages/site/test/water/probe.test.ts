import { appendFileSync } from 'node:fs';
import { describe, it } from 'vitest';
import { reachOf, splitEstuary, waterPolygons, siteCrossings, outerRingBatch, waterFaces, bridgeId, landComponents } from '../../src/water/index.js';
import { STAGES } from '@plat/kernel';
import { GROUND_KEY } from '../../src/terrain/index.js';
import { ground, riverFixture } from './support.js';

const LOG = (s: string): void => appendFileSync('/tmp/claude-1000/-home-cstokes111-Maps/6e7b0e39-9580-4748-b844-6b72e677c650/scratchpad/e03/phases.txt', s);

describe('probe', () => {
  it('phases', () => {
    for (const [size, seed] of [[{ areaHa: 100 }, 1], [{}, 2]] as const) {
      const T = (): number => performance.now();
      let t = T();
      const lap = (s: string): void => { const n = T(); LOG(`${s} ${Math.round(n - t)} ms\n`); t = n; };
      const fx = riverFixture(seed, { relief: 'rolling' }, { tributaries: [{}], mouth: 'estuary' }, size);
      lap('fixture');
      const reach = reachOf(fx.frame);
      const bodies = splitEstuary(fx.water.bodies, reach, 'estuary');
      LOG(`bodies ${bodies.map((b) => `${b.id}:${(b.course ?? []).length}`).join(' ')}\n`);
      const polys = waterPolygons(bodies, reach);
      lap('polygons');
      if (!polys.ok) { LOG(`${polys.code} ${polys.detail}\n`); return; }
      LOG(`parts ${polys.value.reaches.map((r) => r.parts.map((p) => p.rings.map((q) => q.length).join('/')).join(',')).join(' ')} dropped ${JSON.stringify(polys.value.dropped)}\n`);
      const sites = siteCrossings(polys.value.reaches, 300, [], { reach, minSpacingCm: 4000, fordMaxWidthCm: 1000 });
      lap(`sites ${sites.length} ${sites.map((s) => s.water.split(':')[1] + s.type[0] + s.spanCm).join(',')}`);
      const { kernel, plat } = ground(fx.frame);
      const o = { key: GROUND_KEY, stage: STAGES.S1, workLimit: 1e9 };
      const r1 = outerRingBatch(kernel, 'terrain:ground', reach, o);
      lap(`ring ${r1.ok}`);
      const v0 = plat.version;
      const r2 = waterFaces(polys.value.reaches, kernel, { ...o, sites, bridgeIds: sites.map((_, i) => bridgeId(i)) });
      lap(`water ${r2.ok} ${r2.ok ? `land ${r2.value.land.length} faces ${r2.value.faces.map((f) => f.length).join('/')}` : r2.code + ' ' + r2.detail} v${v0}->${plat.version} warn ${JSON.stringify(r2.ok ? r2.warnings : [])}`);
      LOG(`land again ${landComponents(plat).length}\n`);
    }
  }, 900_000);
});
