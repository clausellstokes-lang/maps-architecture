import { skeletonCorpus } from '../skeleton/runner.js';
import { derive, asPolygons } from './runs.js';
for (const kind of ['fusion', 'integrated'] as const) for (const seed of [1, 2]) {
  const d = derive(kind, seed, { frameHa: 900, walledHa: 30 });
  const polys = asPolygons(d.ins.districtFaces);
  for (const use of ['roof', 'spine'] as const) {
    const r = skeletonCorpus(polys, use);
    if (r.downgrades > 0) console.log(kind, seed, use, JSON.stringify({ causes: r.causes, flagged: r.flagged, sizes: r.flagged.map((i) => polys[i].map((x) => x.length)) }));
  }
}
