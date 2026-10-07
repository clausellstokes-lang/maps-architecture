// M0-x-04: the integrated runner entry `runBase` (C-0077) over the base table — the registered M0 stages run in §4.1's
// order through the façade with their declared op forms (the item's here-bar; M0.md §5 item 25), two runs of the flat
// fixture and of the river fixture at one seed give identical model digests (the item's test), the composition through
// S5 equals the items' own (M0-c-01 … M0-c-05's flat fixture, slice, commits, runS4 and runS5), and the run's rerolls
// reach the stages they name (C-0090). The fixtures run on a 900 ha frame with 30 ha walled (C-0264 (10)): the full
// CITY size is the harnesses' (M0-c-06, M0-e-06, M0-d-09).
import { attachIndex, createKernel, createPlat, createRng, levelDigest, seedKey, STAGES, type ConcernId, type Hash128, type Plat } from '@plat/kernel';
import { canonicalText, mintTownRoot, type Terrain, type WaterSet, type Way } from '@plat/model';
import { resourceGrid, terrainParams, WATER_CELL, type SiteResources } from '@plat/site';
import { loadWorkLimits, tableView } from '@plat/tables';
import { describe, expect, it } from 'vitest';
import {
  BASE_OP_FORMS,
  BASE_ORDER,
  commitS3Slice,
  flatFixture,
  FLAT_BLUEPRINT,
  RIVER_BLUEPRINT,
  runBase,
  runS4,
  runS5,
  s3Slice,
  W_LAND_UNCLAIMED,
  baseS6Input,
  waterMask,
  type BaseBatch,
  type BaseBlueprint,
  type GenerationReport,
  type PipelineModel,
  type S1Record,
  type S3Record,
  type GrowthState,
  type S3Commit,
  type S3Slice,
} from '../../../src/index.js';

const SIZE = { areaHa: 900, walledHa: 30 } as const;
const FLAT: BaseBlueprint = { ...FLAT_BLUEPRINT, size: { ...FLAT_BLUEPRINT.size, areaHa: SIZE.areaHa }, walledHa: SIZE.walledHa };
const RIVER: BaseBlueprint = { ...RIVER_BLUEPRINT, size: { ...RIVER_BLUEPRINT.size, areaHa: SIZE.areaHa }, walledHa: SIZE.walledHa };

interface Run {
  readonly model: PipelineModel;
  readonly report: GenerationReport;
  readonly batches: BaseBatch[];
}

const RUNS = new Map<string, Run>();
function runOf(key: string, bp: BaseBlueprint, seed: number, rerolls?: Record<string, number>): Run {
  let r = RUNS.get(key);
  if (r === undefined) {
    const batches: BaseBatch[] = [];
    const out = runBase(bp, seed, { kind: 'all' }, { onBatch: (b) => batches.push(b), ...(rerolls === undefined ? {} : { rerolls }) });
    r = { ...out, batches };
    RUNS.set(key, r);
  }
  return r;
}

const DATA_KEYS = ['ways', 'junctions', 'gates', 'enceintes', 'bridges', 'reservations', 'districts', 'seams', 'quarters', 'typing', 'fieldBands', 'lanes', 'blocks'];

/** The records the run wrote, as canonical text (§6.2's text form): what the model digest's record layers would hold. */
function records(m: PipelineModel): string {
  return canonicalText(DATA_KEYS.map((k) => [k, m.data.get(k) ?? null]));
}

function ground(m: PipelineModel): Plat {
  const p = m.plats.get('ground/0');
  if (p === undefined) throw new Error('no ground arena');
  return p;
}

function levels(p: Plat): Hash128[] {
  return ([0, 1, 2, 3, 4] as const).map((l) => levelDigest(p, l));
}

/**
 * S6's outcome while M0-e-03's land owners and M0-e-04's claimable rule disagree (C-0264 (9)): S6 refused E_INVARIANT
 * with W_LAND_UNCLAIMED, the one bug of the run; once they agree, no bug and S6's districts cut by S8.
 */
function s6Outcome(r: Run): 'refused' | 'built' {
  const s6 = r.report.stages.find((s) => s.name === 'S6');
  if (r.report.bugs.length > 0) {
    expect(r.report.bugs.map((b) => [b.stage, b.cls])).toEqual([['S6', 'E_INVARIANT']]);
    expect(s6?.warnings[W_LAND_UNCLAIMED]).toBe(1);
    expect(r.model.data.has('districts')).toBe(false);
    expect(r.model.data.has('lanes')).toBe(false);
    expect(r.batches.filter((b) => b.stage === 'S8')).toEqual([]);
    return 'refused';
  }
  expect(s6?.warnings[W_LAND_UNCLAIMED]).toBeUndefined();
  expect((r.model.data.get('districts') as unknown[]).length).toBeGreaterThan(0);
  expect((r.model.data.get('lanes') as unknown[]).length).toBeGreaterThan(0);
  expect(r.batches.filter((b) => b.stage === 'S8' && b.committed).length).toBeGreaterThan(0);
  // S6's second half: pass 1's three fields, banded (C-0255 (12))
  expect((r.model.data.get('fieldBands') as { field: string }[]).map((f) => f.field)).toEqual(['prosperity', 'density', 'greenery']);
  return 'built';
}

describe("the registered M0 stages run in §4.1's order through the façade with their declared op forms (here-bar)", () => {
  for (const [name, bp] of [
    ['flat', FLAT],
    ['river', RIVER],
  ] as const) {
    it(`${name}: the stages in §4.1's order, each once, ranked by it; every batch through the façade in its sub-stage's op form`, { timeout: 900_000 }, () => {
      const r = runOf(`${name}:1`, bp, 1);
      expect(r.model.order).toEqual([...BASE_ORDER]);
      expect(r.report.stages.map((s) => s.name)).toEqual([...BASE_ORDER]);
      expect([...r.model.ranks]).toEqual(BASE_ORDER.map((n, i) => [n, i]));
      // The batches come stage by stage in the drawn order, and every stage up to S6 commits through the façade.
      const at = r.batches.map((b) => BASE_ORDER.indexOf(b.stage));
      for (let i = 1; i < at.length; i += 1) expect(at[i]).toBeGreaterThanOrEqual(at[i - 1]);
      for (const s of ['S1', 'S3', 'S4', 'S5', 'S6']) expect(r.batches.some((b) => b.stage === s && b.committed), s).toBe(true);
      // S1's two L0 batches (the outer ring, then the water), S3's one declared L1 batch, S4's one.
      expect(r.batches.filter((b) => b.stage === 'S1').map((b) => [b.level, b.form])).toEqual([
        [0, 'callback'],
        [0, 'callback'],
      ]);
      expect(r.batches.filter((b) => b.sub === 'S3').map((b) => [b.level, b.form, b.txStage])).toEqual([[1, 'declared', 'S3']]);
      expect(r.batches.filter((b) => b.sub === 'S4').map((b) => [b.level, b.form, b.txStage])).toEqual([[1, 'declared', 'S4']]);
      // S5's sub-stages in §4.1's order within each stage k: (k ≥ 2: S5b, S5a), S5c, S5d.
      const K = (r.model.data.get('s3.slice') as S3Slice).site.land.stagesHa.length;
      const s5 = r.batches.filter((b) => b.stage === 'S5');
      for (let i = 1; i < s5.length; i += 1) expect(s5[i].k).toBeGreaterThanOrEqual(s5[i - 1].k);
      const rank = { S5b: 0, S5a: 1, S5c: 2, S5d: 3 } as Record<string, number>;
      for (let i = 1; i < s5.length; i += 1) if (s5[i].k === s5[i - 1].k) expect(rank[s5[i].sub]).toBeGreaterThanOrEqual(rank[s5[i - 1].sub]);
      expect(K).toBeGreaterThanOrEqual(3);
      expect(s5.some((b) => b.k === 2 && b.sub === 'S5b' && b.committed)).toBe(true);
      expect(s5.some((b) => b.k === 1 && b.sub === 'S5c' && b.committed)).toBe(true);
      expect(Math.max(...s5.map((b) => b.k))).toBe(K);
      // Every batch in its sub-stage's declared form — S5a's excepted: its trace, strips and crossing split commit as
      // callback batches (C-0226 (2), C-0244 (8)), always safe (§4.1); pinned so any other divergence fails (C-0264 (1)).
      const off = r.batches.filter((b) => b.form !== BASE_OP_FORMS.get(b.sub));
      expect([...new Set(off.map((b) => `${b.sub}:${b.form}`))]).toEqual(['S5a:callback']);
      for (const b of off) {
        expect(b.level).toBe(1);
        expect(b.txStage).toBe('S5');
      }
      // stage 1's trace and strips: S5a's at k = 1, committed inside S3 (C-0244 (10)); each later walled stage's its own.
      expect(r.batches.filter((b) => b.stage === 'S3' && b.sub === 'S5a').map((b) => [b.k, b.committed])).toEqual([
        [1, true],
        [1, true],
      ]);
      // A batch's KernelTx.stage is its own stage's id but for S5a's at k = 1 (S5's rank, §4.1's S5 row).
      for (const b of r.batches) expect(b.txStage, `${b.stage}/${b.sub}`).toBe(b.sub.startsWith('S5') ? 'S5' : b.stage);
      if (s6Outcome(r) === 'built') for (const b of r.batches.filter((x) => x.stage === 'S8')) expect(b.form).toBe('callback');
    });
  }
});

describe('two runs of the flat fixture and the river fixture at one seed give identical model digests (the item’s test)', () => {
  for (const [name, bp] of [
    ['flat', FLAT],
    ['river', RIVER],
  ] as const) {
    it(`${name}: equal roots, stage roots, level digests, records and reports`, { timeout: 900_000 }, () => {
      const a = runOf(`${name}:1`, bp, 1);
      const b = runOf(`${name}:1:again`, bp, 1);
      expect(b.model.root).toEqual(a.model.root);
      expect([...b.model.stageRoots]).toEqual([...a.model.stageRoots]);
      expect(levels(ground(b.model))).toEqual(levels(ground(a.model)));
      expect(records(b.model)).toBe(records(a.model));
      expect(canonicalText(b.report)).toBe(canonicalText(a.report));
      expect(b.batches).toEqual(a.batches);
      // the root is the maintained digest's, equal to its recomputation from nothing (§5.3's CI oracle)
      expect(a.model.digest.recomputeRoot()).toEqual(a.model.root);
      // every stage moved the model: no stage's root equals the one before it
      const roots = BASE_ORDER.slice(0, 5).map((s) => canonicalText(a.model.stageRoots.get(s)));
      expect(new Set(roots).size).toBe(roots.length);
    });
  }

  it('the digest tells the fixtures and the seeds apart (a constant root would pass the equality above)', { timeout: 900_000 }, () => {
    const flat1 = runOf('flat:1', FLAT, 1);
    const river1 = runOf('river:1', RIVER, 1);
    const flat2 = runOf('flat:2', FLAT, 2);
    expect(flat1.model.root).not.toEqual(river1.model.root);
    expect(flat1.model.root).not.toEqual(flat2.model.root);
    expect(records(flat1.model)).not.toBe(records(flat2.model));
    expect((river1.model.data.get('water') as { bodies: unknown[] }).bodies.length).toBeGreaterThan(0);
    expect((flat1.model.data.get('water') as { bodies: unknown[] }).bodies).toEqual([]);
  });
});

describe("the composition equals the items' own through S5 (M0-c-01 … M0-c-05)", () => {
  it("S3's site is the flat fixture's with S1's terrain; the slice, S4's and S5's records equal runS4 and runS5 over the fixture", { timeout: 900_000 }, () => {
    const r = runOf('flat:1', FLAT, 1);
    const fixture = flatFixture(1, { frameAreaHa: SIZE.areaHa, walledHa: SIZE.walledHa });
    const site = (r.model.data.get('s3') as S3Record).site;
    // keyed by the runner's town root (§6.1, C-0165 (6)), the town's own key — not the standalone fixture's (C-0264 (3))
    const town = mintTownRoot(seedKey(1)).entityKey;
    expect(site.townKey).toEqual(town);
    expect(r.model.town.entityKey).toEqual(town);
    const { stream: _a, terrain: ta, townKey: _ka, ...restA } = site;
    const { stream: _b, terrain: tb, townKey: _kb, ...restB } = fixture;
    expect(canonicalText(restA)).toBe(canonicalText(restB));
    expect([...ta.heightCm]).toEqual([...tb.heightCm]);
    expect([ta.cols, ta.rows, ta.cellCm, ta.originX, ta.originY, ta.id]).toEqual([tb.cols, tb.rows, tb.cellCm, tb.originX, tb.originY, tb.id]);
    // the items' own composition on a fresh arena (no S1: the fixture's ring by M0-c-02's commit), the fixture keyed
    // by the same town root: its S3 draws fresh per concern (the fixture's), runS5's streams keyed by the site's key
    const keyed = { ...fixture, townKey: [...town] as Hash128, stream: (c: ConcernId, attempt = 0) => createRng().stream(town, STAGES.S3, c, { reroll: 0, attempt, epoch: 0, salt: 0 }) };
    const slice = s3Slice(keyed);
    const plat = createPlat({ layer: 'ground', part: 0 }, fixture.frame);
    attachIndex(plat, { gridCellCm: 5000 });
    const k = createKernel(new Map([[plat.key, plat]]));
    const c = commitS3Slice(slice, k);
    expect(c.ok).toBe(true);
    if (!c.ok) return;
    const s4 = runS4({ slice, commit: c.value, kernel: k });
    expect(s4.ok).toBe(true);
    if (!s4.ok) return;
    const s5 = runS5({ slice, commit: c.value, s4: s4.value, kernel: k });
    expect(s5.ok).toBe(true);
    if (!s5.ok) return;
    const ps = r.model.data.get('s3.slice') as S3Slice;
    expect(canonicalText([ps.plaza, ps.gates, ps.gateSites, ps.levelSet.outline, ps.destinations])).toBe(canonicalText([slice.plaza, slice.gates, slice.gateSites, slice.levelSet.outline, slice.destinations]));
    const s4p = r.model.data.get('s4') as typeof s4.value;
    expect(canonicalText(s4p.network.ways)).toBe(canonicalText(s4.value.network.ways));
    const s5p = r.model.data.get('s5') as { growth: typeof s5.value.growth; capacity: typeof s5.value.capacity; prune: typeof s5.value.prune };
    const streets = (g: typeof s5.value.growth): string => canonicalText(g.map((x) => x.streets.map((s) => [s.way.id, s.points])));
    expect(s5p.growth.length).toBe(s5.value.growth.length);
    expect(streets(s5p.growth)).toBe(streets(s5.value.growth));
    expect(s5p.growth.flatMap((g) => g.streets).length).toBeGreaterThan(0);
    expect(canonicalText(s5p.prune)).toBe(canonicalText(s5.value.prune));
    expect(canonicalText(s5p.capacity.map((d) => [d.k, d.topUp, d.shortfallCm2]))).toBe(canonicalText(s5.value.capacity.map((d) => [d.k, d.topUp, d.shortfallCm2])));
    const ways = (r.model.data.get('ways') as Way[]).map((w) => [w.id, w.class, w.growthStage]);
    expect(canonicalText(ways)).toBe(canonicalText(s5.value.state.ways.map((w) => [w.id, w.class, w.growthStage])));
    expect(canonicalText(r.model.data.get('gates'))).toBe(canonicalText(s5.value.state.stages.flatMap((st) => st.gates)));
  });
});

describe('the run option `rerolls` reaches the stage it names (C-0090) and no stage before it', () => {
  it('rerolls { S3: 1 } moves S3 on; { S5: 1 } moves S5 on and leaves S1 – S4 as they were', { timeout: 900_000 }, () => {
    const base = runOf('flat:1', FLAT, 1);
    const r3 = runOf('flat:1:S3', FLAT, 1, { S3: 1 });
    const r5 = runOf('flat:1:S5', FLAT, 1, { S5: 1 });
    expect(r3.model.stageRoots.get('S1')).toEqual(base.model.stageRoots.get('S1'));
    expect(r3.model.stageRoots.get('S3')).not.toEqual(base.model.stageRoots.get('S3'));
    for (const s of ['S1', 'S3', 'S4']) expect(r5.model.stageRoots.get(s), s).toEqual(base.model.stageRoots.get(s));
    expect(r5.model.stageRoots.get('S5')).not.toEqual(base.model.stageRoots.get('S5'));
  });
});

describe("S3's planned water and S6's input are composed from what S1 and S5 committed (C-0264 (3), (5))", () => {
  it("river: S3's site plans each body's L0 faces as water and each S1 bridge's deck at its two deck_end vertices, in order", { timeout: 900_000 }, () => {
    const r = runOf('river:1', RIVER, 1);
    const site = (r.model.data.get('s3') as S3Record).site;
    const s1 = r.model.data.get('s1') as { water: { bodies: { id: string }[]; bridges: { id: string; deck: { role: string; entity: string; ordinal?: number }[] }[] } };
    const p = ground(r.model);
    expect(s1.water.bodies.length).toBeGreaterThan(0);
    expect(s1.water.bridges.length).toBeGreaterThan(0);
    // the decks: one per S1 bridge, same ids in order, a = deck_end 0, b = deck_end 1, where the arena placed them
    expect(site.water.decks.map((d) => d.id)).toEqual(s1.water.bridges.map((b) => b.id));
    for (const d of site.water.decks) {
      for (const [ordinal, at] of [
        [0, d.a],
        [1, d.b],
      ] as const) {
        const res = r.model.kernel.resolve({ role: 'deck_end', entity: d.id, ordinal }, p.key);
        expect(res.view).toBe('vertices');
        if (res.view !== 'vertices') continue;
        expect(res.vertices).toHaveLength(1);
        expect({ x: p.vertices.x[res.vertices[0]], y: p.vertices.y[res.vertices[0]] }).toEqual({ x: at.x, y: at.y });
      }
      expect(d.a).not.toEqual(d.b);
    }
    // the faces: every L0 face a body owns, as its outer ring; together they hold the course's points
    expect(site.water.faces.length).toBeGreaterThan(0);
    let area = 0;
    for (const ring of site.water.faces) {
      let a2 = 0;
      for (let i = 0; i < ring.length; i += 1) {
        const u = ring[i];
        const v = ring[(i + 1) % ring.length];
        a2 += u.x * v.y - v.x * u.y;
      }
      area += a2 / 2;
    }
    expect(area).toBeGreaterThan(0);
    // S4 takes S1's water: it returns S1's bridges one for one (a site, or built where a route spans it, C-0076)
    const s4 = r.model.data.get('s4') as { bridges: { id: string; state: string }[] };
    expect(s4.bridges.map((b) => b.id)).toEqual(s1.water.bridges.map((b) => b.id));
    expect((r.model.data.get('bridges') as { id: string }[]).map((b) => b.id)).toEqual(s1.water.bridges.map((b) => b.id));
    // the flat fixture plans none
    const flat = (runOf('flat:1', FLAT, 1).model.data.get('s3') as S3Record).site;
    expect(flat.water).toEqual({ faces: [], decks: [] });
  });

  it("flat: S6's input is S5's last boundary with land, every stage's outline, the walls, the gates, the ways and the town root's reroll", { timeout: 900_000 }, () => {
    const r = runOf('flat:1', FLAT, 1);
    const state = r.model.data.get('s5.growth') as GrowthState;
    const commit = r.model.data.get('s3.commit') as S3Commit;
    const slice = r.model.data.get('s3.slice') as S3Slice;
    const ctx = { seedKey: seedKey(1), streamOpts: (_c: ConcernId, _e: unknown, attempt = 0) => ({ reroll: 3, attempt, epoch: 0, salt: 0 }) };
    const made = baseS6Input({ bp: { ...FLAT, seed: 1 }, slice, commit, state, water: { bodies: [], bridges: [] }, terrain: slice.site.terrain }, r.model.kernel, ctx as never);
    expect(made.ok).toBe(true);
    if (!made.ok) return;
    const inp = made.value;
    const last = state.stages[state.lastWithLand - 1].boundary;
    expect(last).not.toBeNull();
    expect(inp.boundary).toEqual(last?.set.outline);
    expect(inp.stageBoundaries).toHaveLength(state.stages.length);
    state.stages.forEach((st, i) => {
      if (st.boundary !== null) expect(inp.stageBoundaries?.[i]).toEqual(st.boundary.set.outline);
    });
    const walled = state.stages.filter((st) => st.wall !== null);
    expect(inp.walls?.map((w) => w.line)).toEqual(walled.map((st) => st.wall));
    expect(inp.walls?.[0].enceinte).toBe(commit.enceinte.id);
    expect(inp.ways.map((w) => w.id)).toEqual(state.ways.map((w) => w.id));
    expect(inp.reroll).toBe(3);
    expect(inp.seedKey).toEqual(seedKey(1));
    expect(inp.frame).toEqual(slice.site.frameRing);
    expect(inp.reservations).toEqual([commit.plaza]);
    expect(inp.rung).toBe('CITY');
    // the sited features: the plaza's market first, then a gate seed for each main gate of every stage
    const gates = state.stages.flatMap((st) => st.gates).filter((g) => g.kind === 'main');
    expect(inp.features[0]).toMatchObject({ id: 'plaza:0', kind: 'market' });
    expect(inp.features.filter((f) => f.kind === 'gate').map((f) => f.id)).toEqual(gates.map((g) => g.id));
  });
});

describe("S3's commits take S1's water: a stage-1 trace across the river gates it (C-0087; C-0264 (3))", () => {
  it('river from the north at seed 1: the trace crosses the river and S3 commits its water gates on S1’s river body', { timeout: 900_000 }, () => {
    const north: BaseBlueprint = { ...RIVER, site: { ...RIVER.site, river: { inflowBearingCdeg: 0, mouth: 'none' } } };
    const r = runOf('river-north:1', north, 1);
    const commit = r.model.data.get('s3.commit') as S3Commit;
    const bodies = (r.model.data.get('water') as { bodies: { id: string }[] }).bodies.map((b) => b.id);
    expect(commit.waterGates.length).toBeGreaterThan(0);
    for (const g of commit.waterGates) {
      expect(bodies).toContain(g.body);
      expect(g.kind).toBe('water');
    }
    // S1, S3 and S4 committed (a later stage's refusal, if any, is reported as a bug of that stage, never S3's)
    for (const s of ['S1', 'S3', 'S4']) expect(r.report.bugs.some((b) => b.stage === s), s).toBe(false);
  });
});

describe("the river stage's F-WORK limit and report reach the run (C-0173 (8))", () => {
  it('the river run keeps S1 (3)’s report on S1’s record and its requests in the report; no cut at the law’s limit', { timeout: 900_000 }, () => {
    const r = runOf('river:1', RIVER, 1);
    const s1 = r.model.data.get('s1') as S1Record;
    expect(s1.river).not.toBeNull();
    expect(s1.river?.workCut).toBeNull();
    expect(s1.river?.work['hydro.cells']).toBeGreaterThan(0);
    expect(s1.river?.rivers.length).toBeGreaterThan(0);
    expect(r.report.requested).toEqual(s1.river?.requested);
  });

  it('a hydro.cells limit below the grid coarsens it once: work_cut on S1’s record and an F-WORK ladder use on the town root’s water.river', { timeout: 900_000 }, () => {
    const wl = loadWorkLimits();
    const tiny = { ...wl, law: (c: string) => (c === 'hydro.cells' ? { ...wl.law(c), unit: 'fixed' as const, perUnit: 0, floor: 100 } : wl.law(c)) };
    const r = runBase(FLAT, 1, { kind: 'all' }, { workLimits: tiny as never });
    const s1 = r.model.data.get('s1') as S1Record;
    expect(s1.river?.workCut).toMatchObject({ counter: 'hydro.cells', limit: 100, coarsened: true });
    const s1Stage = r.report.stages.find((s) => s.name === 'S1');
    expect(s1Stage?.ladderUses).toEqual([expect.objectContaining({ cause: 'F-WORK', code: 'work_cut', rung: 1, tier: 4, entity: r.model.town.identity.id })]);
    expect(s1Stage?.ladderUses[0].key).toContain('water.river');
    // the flat run at the law's own limit cuts nothing
    expect((runOf('flat:1', FLAT, 1).model.data.get('s1') as S1Record).river?.workCut).toBeNull();
  });
});

describe('S1 (10) runs in the registered S1, after the water (C-0165 (5); C-0264 (11))', () => {
  it("the resources cover the resource grid; on the river fixture the water's cells hold nothing and fish lie beside them; none on the flat", { timeout: 900_000 }, () => {
    const river = runOf('river:1', RIVER, 1);
    const flat = runOf('flat:1', FLAT, 1);
    for (const r of [river, flat]) {
      const res = r.model.data.get('resources') as SiteResources;
      const terrain = r.model.data.get('terrain') as Terrain;
      const g = resourceGrid(terrain, terrainParams(tableView(), 'CITY'));
      expect(res.cellCm).toBe(g.cellCm);
      for (const a of [res.ore, res.stone, res.timber, res.fish, res.clay, res.fertile, res.wellYield, res.slope]) expect(a.length).toBe(g.cols * g.rows);
      expect(res.ore.every((v) => v === 0)).toBe(true); // plain relief: no ore
    }
    const rr = river.model.data.get('resources') as SiteResources;
    const fr = flat.model.data.get('resources') as SiteResources;
    const mask = waterMask(river.model.kernel, river.model.data.get('terrain') as Terrain, terrainParams(tableView(), 'CITY'), river.model.data.get('water') as WaterSet);
    expect(mask).toBeDefined();
    if (mask === undefined) return;
    const wet = [...mask.keys()].filter((c) => mask[c] === WATER_CELL);
    expect(wet.length).toBeGreaterThan(0);
    for (const c of wet) expect([rr.wellYield[c], rr.timber[c], rr.fertile[c], rr.fish[c]]).toEqual([0, 0, 0, 0]);
    expect(rr.fish.some((v) => v === 1)).toBe(true);
    expect(rr.clay.some((v) => v === 1)).toBe(true);
    expect(fr.fish.every((v) => v === 0)).toBe(true);
    expect(fr.timber.every((v) => v === 1)).toBe(true);
    expect(waterMask(flat.model.kernel, flat.model.data.get('terrain') as Terrain, terrainParams(tableView(), 'CITY'), { bodies: [], bridges: [] })).toBeUndefined();
  });
});
