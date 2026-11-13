// M0-c-02 hardening round S7 — Q173 with Q187 (a), bar (a): the eight CITY runs of the site family whose stage-2 trace
// S5 refused before the round (C-0505): relief-60 seed 118 and relief-3000 seeds 32, 81 and 188, each in the default
// and the coarse configuration (M0-e-06's fixtures; checks/M0-c-04-s6-evidence/q173-diagnosis.txt). The growth stage
// handed each a clean boundary, each gate crossed square to its way; the trace's pull, smoothing and simplify closed the
// line into a V of 12° – 43° at a gate and the insertion attracted both legs onto the way's vertex 55 – 91 cm beside it:
// `(wall, enceinte:2) branches` (118, 81) or `trace: gate gate:N is not on the committed trace at its point` (32, 188).
// With each gate's floor held (100°, the simplify's; C-0505) every run commits its stage-2 trace: every gate on the
// committed trace at its point, the wall one closed chain (no vertex of degree 3), the angle at every gate of the line
// handed to the kernel at 100° or above. Each run derives the base registration through S4, S5's growth start, stage 2's
// S5a / S5b (`mainRoadsStep`) and its trace (`traceStep`), as packages/layout/test/growth/s5ab/q173.test.ts's
// `stage2Trace` does (that file is M0-c-04's reproduction; read, not imported). THE COST (named): eight derivations
// through stage 2's trace, about 0.6 – 2.5 min each at one worker on this machine; at reduced strength (PLAT_FUZZ_RUNS
// set, RELATED) only relief-60 default 118 runs.
import { describe, expect, it } from 'vitest';
import { ok, stageText, type Cm, type Seed } from '@plat/kernel';
import type { WaterSet } from '@plat/model';
import { riverStrategy, type RiverStrategy } from '@plat/site';
import { loadWorkLimits } from '@plat/tables';
import { baseArena, createRegistry, growthStart, hydroCellsLimit, mainRoadsStep, mainRoadStream, registerBase, RIVER_BLUEPRINT, run, traceStep, type BaseBlueprint, type S3Commit, type S3Slice, type S4Output } from '../../src/index.js';
import { closedChain, GROUND } from './support.js';

const FULL = process.env.PLAT_FUZZ_RUNS === undefined;

const RELIEF_60: BaseBlueprint = { ...RIVER_BLUEPRINT, site: { relief: 'rolling', river: RIVER_BLUEPRINT.site.river ?? null }, terrain: 'base' };
const RELIEF_3000: BaseBlueprint = {
  ...RIVER_BLUEPRINT,
  site: { relief: 'hilly', primitives: [{ kind: 'hill', at: { x: 0 as Cm, y: 0 as Cm }, radiusM: 1200, heightM: 3000 }], river: RIVER_BLUEPRINT.site.river ?? null },
  terrain: 'base',
};

function coarseRivers(): RiverStrategy {
  const wl = loadWorkLimits();
  return Object.freeze({
    rivers(bp, terrain, water, ctx, k) {
      const limit = hydroCellsLimit(terrain, ctx.tables, ctx.rung.rung as Parameters<typeof hydroCellsLimit>[2], wl);
      return riverStrategy({ hydroCoarsen: true, hydroCellsLimit: limit }).rivers(bp, terrain, water, ctx, k);
    },
  } satisfies RiverStrategy);
}

/** The unsigned angle at b between a and c, in degrees (written here, independent of the code under test). */
function angleAt(a: { x: number; y: number }, b: { x: number; y: number }, c: { x: number; y: number }): number {
  const ux = a.x - b.x;
  const uy = a.y - b.y;
  const vx = c.x - b.x;
  const vy = c.y - b.y;
  return (Math.atan2(Math.abs(ux * vy - uy * vx), ux * vx + uy * vy) * 180) / Math.PI;
}

/** Stage 2's S5a / S5b and its trace over the base registration's S1, S3 and S4 at `seed` under `config`. */
function stage2Trace(bp0: BaseBlueprint, seed: number, config: 'default' | 'coarse') {
  const registry = createRegistry();
  registerBase(registry);
  if (config === 'coarse') registry.river.set('coarse', coarseRivers());
  const bp: BaseBlueprint = config === 'coarse' ? { ...bp0, river: 'coarse' } : bp0;
  const product = registry.products.get('base');
  if (product === undefined) throw new Error('q173sites.test: the registry holds no base product');
  const kept = product.stages
    .filter((s) => ['S1', 'S3', 'S4', 'S5'].includes(stageText(s.id)))
    .map((s) => (stageText(s.id) === 'S5' ? Object.freeze({ ...s, run: () => ok({}) }) : s));
  product.stages.splice(0, product.stages.length, ...kept);
  const out = run(registry, { ...bp, seed: seed as Seed }, { kind: 'all' }, { arenas: () => [baseArena(bp)] });
  expect(out.report.bugs.filter((x) => x.stage !== 'S5')).toEqual([]);
  const data = out.model.data;
  const state = growthStart({ slice: data.get('s3.slice') as S3Slice, commit: data.get('s3.commit') as S3Commit, s4: data.get('s4') as S4Output, kernel: out.model.kernel, water: data.get('water') as WaterSet });
  const m = mainRoadsStep(state, 2, mainRoadStream(state.slice));
  expect(m.ok ? 'ok' : `${m.code} ${m.detail}`).toBe('ok');
  return { state, trace: traceStep(state, 2) };
}

/** The floor of the round at a gate the growth stage hands squared (180°): the simplify's 100° (C-0505). */
const FLOOR_DEG = 100;

const RUNS: readonly [string, BaseBlueprint, number, 'default' | 'coarse', string][] = [
  ['relief-60', RELIEF_60, 118, 'default', 'branches'],
  ['relief-60', RELIEF_60, 118, 'coarse', 'branches'],
  ['relief-3000', RELIEF_3000, 32, 'default', 'gate:7 off the trace'],
  ['relief-3000', RELIEF_3000, 32, 'coarse', 'gate:7 off the trace'],
  ['relief-3000', RELIEF_3000, 81, 'default', 'branches'],
  ['relief-3000', RELIEF_3000, 81, 'coarse', 'branches'],
  ['relief-3000', RELIEF_3000, 188, 'default', 'gate:9 off the trace'],
  ['relief-3000', RELIEF_3000, 188, 'coarse', 'gate:9 off the trace'],
];

describe('Q173 / Q187 (a): the eight runs commit S5\'s stage-2 trace, every gate crossed at its floor or above (C-0505)', () => {
  RUNS.forEach(([name, bp, seed, config, before], idx) => {
    it.runIf(FULL || idx === 0)(`${name} ${config} seed ${String(seed)} (before the round: ${before}): the trace commits, every gate on it at its point, the wall one closed chain, every gate's angle ≥ ${String(FLOOR_DEG)}°`, () => {
      const { state, trace } = stage2Trace(bp, seed, config);
      expect(trace.ok ? 'ok' : `${trace.code} ${trace.detail}`).toBe('ok');
      if (!trace.ok) return;
      const rec = trace.value;
      expect(rec.trace).not.toBeNull();
      const line = rec.wall ?? [];
      const k = state.kernel;
      const p = k.plat(GROUND);
      // The wall one closed chain: every vertex of degree 2 (closedChain throws on a vertex of degree 3, `branches`).
      const wall = closedChain(p, { role: 'wall', entity: 'enceinte:2' });
      const onWall = new Set(wall.map((q) => `${String(q.x)},${String(q.y)}`));
      expect(rec.gates.length).toBeGreaterThan(0);
      const n = line.length;
      for (const g of rec.gates) {
        if (g.kind !== 'main') continue;
        const r = k.resolve({ role: 'gate', entity: g.id }, GROUND);
        const at = r.view === 'vertices' && r.vertices.length === 1 ? { x: p.vertices.x[r.vertices[0]], y: p.vertices.y[r.vertices[0]] } : null;
        expect(at, g.id).not.toBeNull();
        if (at === null) continue;
        // On the committed trace at its point: a vertex of the committed wall chain and of the line handed to the kernel.
        expect(onWall.has(`${String(at.x)},${String(at.y)}`), g.id).toBe(true);
        const i = line.findIndex((q) => q.x === at.x && q.y === at.y);
        expect(i, g.id).toBeGreaterThanOrEqual(0);
        expect(angleAt(line[(i + n - 1) % n], at, line[(i + 1) % n]), g.id).toBeGreaterThanOrEqual(FLOOR_DEG - 1e-9);
      }
    }, 900_000);
  });
});
