// A large hand-built growth area for the growth-drift row on S5c's own streets (C-0254 (13)): a square arena, parallel
// straight `primary` arterials across a walled (a setback `band` square) or unwalled (a `boundary` square) region, seeded
// as growthArea seeds (every half seed spacing, the sides alternating), grown by S5c's `growStreets` — the package reached
// only through `@plat/layout` (C-0122).
import { attachIndex, CONCERNS, createKernel, createPlat, createRng, seedKey, STAGES, type Kernel, type LatticePoint, type Plat, type StageId, type Stream } from '@plat/kernel';
import { growStreets, growthRules, growthStageLineage, type Feature, type GrowthArea, type GrowthSeed, type GrowthStreams, type S5cRecord } from '@plat/layout';
import { tableView } from '@plat/tables';
import { GROUND } from './support.js';

function P(x: number, y: number): LatticePoint {
  return { x, y } as LatticePoint;
}

function tx(k: Kernel, level: 0 | 1, pts: readonly LatticePoint[], role: string, entity: string, closed: boolean): void {
  const r = k.tx({ key: GROUND, level, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: 4 as never }, stage: 4 as never, rederivesFrom: 4 as never, workLimit: 10_000_000 }, (o) =>
    k.geom.insertChain(o, pts, [{ role: role as never, entity }], 'mandatory', { closed }),
  );
  if (!r.ok) throw new Error(`hand area: ${r.code} ${r.detail}`);
}

/** The hand area grown: its record and its plat. */
export interface HandGrown {
  readonly plat: Plat;
  readonly k: Kernel;
  readonly area: GrowthArea;
  readonly rec: S5cRecord;
}

/**
 * S5c on a square region of half-side `reachCm` crossed by `arterials` straight primaries along x (evenly spaced in y),
 * grown from the streams of `seed`.
 */
export function handGrown(regime: 'dense_core' | 'ribbon', seed: number, reachCm = 200_000, arterials = 3): HandGrown {
  const side = 2 * reachCm + 200_000;
  const plat = createPlat(GROUND, { widthCm: side, heightCm: side, aspect: 1, marginShare: 0.3 } as never);
  attachIndex(plat, { gridCellCm: 5000 });
  const k = createKernel(new Map([[GROUND, plat]]), { spineWidths: () => null });
  const h = side / 2;
  tx(k, 0, [P(-h, -h), P(h, -h), P(h, h), P(-h, h)], 'margin', 'terrain:t', true);
  const features: Feature[] = [];
  const square = [P(-reachCm, -reachCm), P(reachCm, -reachCm), P(reachCm, reachCm), P(-reachCm, reachCm)];
  const kind = regime === 'dense_core' ? 'band' : 'boundary';
  if (regime === 'dense_core') tx(k, 1, square, 'setback', 'enceinte:1', true);
  for (let i = 0; i < 4; i += 1) features.push({ a: square[i], b: square[(i + 1) % 4], kind });
  const rules = growthRules(tableView(), regime, 'CITY');
  const S = rules.seedSpacingCm;
  const D = rules.legality.clearanceCm('secondary');
  const seeds: GrowthSeed[] = [];
  const gap = (2 * reachCm) / (arterials + 1);
  for (let a = 0; a < arterials; a += 1) {
    const y = Math.round(-reachCm + gap * (a + 1));
    const way = `way:${String(a)}`;
    const line = [P(-reachCm - 50_000, y), P(reachCm + 50_000, y)];
    tx(k, 1, line, 'way', way, false);
    features.push({ a: line[0], b: line[1], kind: 'way', way, cls: 'primary' });
    for (let n = 0; ; n += 1) {
      const x = -reachCm - 50_000 + (S / 2) * (n + 1);
      if (x > reachCm - D) break;
      if (x < -reachCm + D) continue;
      seeds.push({ at: P(Math.round(x), y), way, along: { x: 1, y: 0 }, side: n % 2 === 0 ? 1 : -1 });
    }
  }
  const lo = Math.min(rules.stepCm('secondary')[0], rules.stepCm('lane')[0]);
  const area: GrowthArea = {
    k: 1,
    key: GROUND,
    rules,
    features,
    junctions: [],
    seeds,
    landHa: (4 * reachCm * reachCm) / 1e8,
    maxSegments: Math.ceil((2 * Math.SQRT2 * reachCm) / lo),
    firstWay: arterials,
    firstJunction: 0,
    unit: growthStageLineage(GROUND, 1),
    reroll: 0,
  };
  const rng = createRng();
  const s = (c: keyof typeof CONCERNS, attempt: number): Stream => rng.stream(seedKey(seed), STAGES.S5 as StageId, CONCERNS[c], { reroll: 0, attempt, epoch: 0, salt: 0 });
  const streams: GrowthStreams = { heading: s('growth.heading', 0), retry: s('growth.heading', 1), curvature: s('growth.curvature', 0), branch: s('growth.branch', 0) };
  const r = growStreets(k, area, streams);
  if (!r.ok) throw new Error(`hand area: S5c refused: ${r.code} ${r.detail}`);
  return { plat, k, area, rec: r.value };
}
