// M0-x-04: the base registration table (§4.1 *Registration and order*, the op form per stage; §4.12; §14's
// StrategyRegistry: the base registers 'base'; M0.md §5 item 25; C-0077, C-0264). No derivation runs here: the
// registered set's order is §4.1's under every registration order, every (sub-)stage's op form is §4.1's statement as
// the items' exported Stages declare it, the strategies are registered by name, the blueprint's M1 cases are refused,
// and base.ts is the one source file that names every M0 stage.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { err, ok, seedKey, STAGES, stageText } from '@plat/kernel';
import { baseRivers, baseTerrain, s1Stage } from '@plat/site';
import { tableView } from '@plat/tables';
import { describe, expect, it } from 'vitest';
import {
  baseEnceinte,
  baseS8Input,
  baseNetwork,
  BASE_OP_FORMS,
  BASE_ORDER,
  baseTable,
  BentCutFabric,
  checkBaseBlueprint,
  createRegistry,
  districtValue,
  flatTerrainStrategy,
  FLAT_BLUEPRINT,
  register,
  registerBase,
  RegistrationError,
  RIVER_BLUEPRINT,
  s4Stage,
  s5aStage,
  s5bStage,
  s5cStage,
  s5dStage,
  s6Stage,
  s8Stage,
  stageOrder,
  wayWidthCm,
  type PipelineStage,
  type ScalarField,
} from '../../../src/index.js';

function baseStages(): PipelineStage[] {
  const reg = createRegistry();
  registerBase(reg);
  return [...(reg.products.get('base')?.stages ?? [])];
}

function byName(name: string): PipelineStage {
  const s = baseStages().find((x) => stageText(x.id) === name);
  if (s === undefined) throw new Error(`no stage ${name}`);
  return s;
}

/** Every permutation of [0 … n − 1] (Heap's algorithm). */
function permutations(n: number): number[][] {
  const a = Array.from({ length: n }, (_, i) => i);
  const out: number[][] = [a.slice()];
  const c = new Array<number>(n).fill(0);
  let i = 0;
  while (i < n) {
    if (c[i] < i) {
      const j = i % 2 === 0 ? 0 : c[i];
      [a[j], a[i]] = [a[i], a[j]];
      out.push(a.slice());
      c[i] += 1;
      i = 0;
    } else {
      c[i] = 0;
      i += 1;
    }
  }
  return out;
}

describe('the registered M0 set and its order (§4.1)', () => {
  it("registers exactly S1, S3, S4, S5, S6, S8 into the base product, and their order is §4.1's drawn order", () => {
    const reg = createRegistry();
    registerBase(reg);
    expect(baseStages().map((s) => stageText(s.id))).toEqual(['S1', 'S3', 'S4', 'S5', 'S6', 'S8']);
    expect(BASE_ORDER).toEqual(['S1', 'S3', 'S4', 'S5', 'S6', 'S8']);
    expect(stageOrder(reg).map((id) => stageText(id))).toEqual([...BASE_ORDER]);
  });

  it('gives the drawn order under all 720 registration orders (the declared I/O decides it, never the order of registration)', () => {
    const stages = baseStages();
    const perms = permutations(stages.length);
    expect(perms).toHaveLength(720);
    for (const p of perms) {
      const reg = createRegistry();
      for (const i of p) register(reg, stages[i]);
      expect(stageOrder(reg).map((id) => stageText(id))).toEqual([...BASE_ORDER]);
    }
  });

  it('is ordered by its declared data keys: each stage reads a key the stage before it writes (a chain, not the id tie-break alone)', () => {
    const stages = baseStages();
    for (let i = 1; i < stages.length; i += 1) {
      const before = stages[i - 1];
      const reads = stages[i].inputs;
      expect(reads.some((k) => before.outputs.includes(k)), `${stageText(stages[i].id)} reads none of ${stageText(before.id)}'s keys`).toBe(true);
    }
  });

  it('refuses a registry whose base product already holds a stage', () => {
    const reg = createRegistry();
    registerBase(reg);
    expect(() => registerBase(reg)).toThrow(/already holds 6 stage/);
    const one = createRegistry();
    register(one, s8Stage() as unknown as PipelineStage);
    expect(() => registerBase(one)).toThrow(RangeError);
  });

  it('a second registration of a base stage is refused by the registry (one stage per id)', () => {
    const reg = createRegistry();
    registerBase(reg);
    expect(() => register(reg, byName('S4'))).toThrow(RegistrationError);
  });
});

describe("every stage's op form matches §4.1's statement (M0.md §5 item 25)", () => {
  it('the registered stages: S1 callback, S3 declared, S4 declared, S5 callback (its one id carries S5a – S5d), S6 callback, S8 callback', () => {
    const forms = Object.fromEntries(baseStages().map((s) => [stageText(s.id), s.txForm]));
    expect(forms).toEqual({ S1: 'callback', S3: 'declared', S4: 'declared', S5: 'callback', S6: 'callback', S8: 'callback' });
  });

  it("the base table's sub-stages carry their items' declared forms, and those are §4.1's: callback for S5c and S8; declared for S3, S4, S5a, S5b; S1 and S6 callback", () => {
    const table = baseTable();
    expect(table.map((r) => r.sub)).toEqual(['S1', 'S3', 'S4', 'S5a', 'S5b', 'S5c', 'S5d', 'S6', 'S8']);
    expect(Object.fromEntries([...BASE_OP_FORMS])).toEqual({ S1: 'callback', S3: 'declared', S4: 'declared', S5a: 'declared', S5b: 'declared', S5c: 'callback', S5d: 'callback', S6: 'callback', S8: 'callback' });
    for (const r of table) expect(r.txForm, r.sub).toBe(BASE_OP_FORMS.get(r.sub));
    // read from the items' own exported Stages, never restated
    expect(s1Stage().txForm).toBe('callback');
    expect(s4Stage().txForm).toBe('declared');
    for (const k of [1, 2, 3]) {
      expect(s5aStage(k).txForm).toBe('declared');
      expect(s5bStage(k).txForm).toBe('declared');
      expect(s5cStage(k).txForm).toBe('callback');
      expect(s5dStage(k).txForm).toBe('callback');
    }
    expect(s6Stage().txForm).toBe('callback');
    expect(s8Stage().txForm).toBe('callback');
    expect(table.filter((r) => r.stage === 'S5').map((r) => r.sub)).toEqual(['S5a', 'S5b', 'S5c', 'S5d']);
    expect(new Set(table.map((r) => r.stage))).toEqual(new Set(BASE_ORDER));
  });

  it("each registered stage keeps its item's declaration: id, ladders, laws, invariants, stream keys", () => {
    const s1 = byName('S1');
    expect(s1.id).toBe(STAGES.S1);
    expect(s1.workLimits.map((l) => l.counter)).toEqual(s1Stage().workLimits.map((l) => l.counter));
    expect(s1.invariants).toEqual(s1Stage().invariants);
    expect([...s1.streamKeys].sort()).toEqual(['terrain.noise', 'water.river']);
    const s3 = byName('S3');
    expect(s3.id).toBe(STAGES.S3);
    expect([...s3.streamKeys].sort()).toEqual(['gate.pick', 'reserve.plaza', 'route']);
    expect(s3.workLimits.map((l) => l.counter)).toEqual(['route.nodes']);
    expect(s3.ladder.map((l) => l.failureClass)).toEqual(['F-WALL', 'F-ROUTE']);
    const s4 = byName('S4');
    expect(s4.ladder).toEqual(s4Stage().ladder);
    expect(s4.workLimits).toEqual(s4Stage().workLimits);
    expect(s4.inputs).toEqual(expect.arrayContaining(s4Stage().inputs));
    expect(s4.outputs).toEqual(expect.arrayContaining(s4Stage().outputs));
    const s5 = byName('S5');
    expect(s5.id).toBe(STAGES.S5);
    expect([...s5.streamKeys].sort()).toEqual(['growth.branch', 'growth.curvature', 'growth.heading', 'growth.mainroad']);
    expect(s5.ladder.map((l) => l.failureClass)).toEqual(['F-ROUTE', 'F-WALL', 'F-NUM', 'F-WORK', 'F-BUDGET-STAGE']);
    const counters = s5.workLimits.map((l) => l.counter);
    expect(new Set(counters).size).toBe(counters.length);
    for (const c of [...s5bStage(2).workLimits, ...s5cStage(1).workLimits].map((l) => l.counter)) expect(counters).toContain(c);
    const s6 = byName('S6');
    expect([...s6.streamKeys].sort()).toEqual(['district.seed', 'district.type', 'field.chance']);
    expect(s6.ladder).toEqual(s6Stage().ladder);
    expect(s6.outputs).toEqual(expect.arrayContaining([...s6Stage().outputs, 'fieldBands']));
    const s8 = byName('S8');
    expect(s8.streamKeys).toEqual(s8Stage().streamKeys);
    expect(s8.invariants).toEqual(s8Stage().invariants);
    expect(s8.inputs).toEqual(expect.arrayContaining(s8Stage().inputs));
    expect(s8.outputs).toEqual(s8Stage().outputs);
  });
});

describe('the strategies the base registers by name (§4.12, §14)', () => {
  it("terrain 'base' and 'flat', river 'base', enceinte 'base', network 'base', fabric 'bent-cut' — the items' own exports", () => {
    const reg = createRegistry();
    registerBase(reg);
    expect(reg.terrain.get('base')).toBe(baseTerrain);
    expect(reg.terrain.get('flat')).toBe(flatTerrainStrategy);
    expect(reg.river.get('base')).toBe(baseRivers);
    expect(reg.enceinte.get('base')).toBe(baseEnceinte);
    expect(reg.network.get('base')).toBe(baseNetwork);
    expect(reg.fabric.get('bent-cut')).toBe(BentCutFabric);
    expect([...reg.terrain.keys()].sort()).toEqual(['base', 'flat']);
    expect(reg.hooks.size).toBe(0);
  });
});

describe('the blueprint (S0 stand-in; C-0264 (3))', () => {
  it("accepts the two fixtures and refuses S0's expansion by name: another rung, a population, an aspect other than 1", () => {
    expect(() => checkBaseBlueprint(FLAT_BLUEPRINT)).not.toThrow();
    expect(() => checkBaseBlueprint(RIVER_BLUEPRINT)).not.toThrow();
    expect(() => checkBaseBlueprint({ ...FLAT_BLUEPRINT, size: { rung: 'TOWN' } })).toThrow(/notBuilt\('M1'\).*TOWN/);
    expect(() => checkBaseBlueprint({ ...FLAT_BLUEPRINT, size: { rung: 'CITY', population: 20_000 } })).toThrow(/notBuilt\('M1'\).*population/);
    expect(() => checkBaseBlueprint({ ...FLAT_BLUEPRINT, size: { rung: 'CITY', aspect: 2 } })).toThrow(/notBuilt\('M1'\).*aspect/);
    expect(() => checkBaseBlueprint({ ...FLAT_BLUEPRINT, size: { rung: 'CITY', aspect: 1, areaHa: 900 } })).not.toThrow();
    expect(FLAT_BLUEPRINT.terrain).toBe('flat');
    expect(RIVER_BLUEPRINT.site.river).toEqual({ inflowBearingCdeg: 27_000, mouth: 'none' });
  });
});

describe('a stage with a missing upstream record does nothing (the refusal upstream is the report’s bug)', () => {
  it('every stage reads null from an empty model and returns ok with no output', () => {
    const empty = { get: () => undefined, has: () => false };
    for (const s of baseStages()) {
      const input = s.inputsOf(empty, { kind: 'all' });
      expect(input, stageText(s.id)).toBeNull();
      expect(s.run(input, {} as never)).toEqual({ ok: true, value: {}, warnings: [] });
    }
  });
});

describe("S8's per-district values and widths (C-0264 (6))", () => {
  const field = (faces: { owner: string | null; cells: number; value: number }[]): ScalarField =>
    ({ faces: faces.map((f, i) => ({ key: [i, 0, 0, 0], ...f })), valueAt: () => 0.123 }) as unknown as ScalarField;

  it('a district takes the cell-weighted mean of its faces, the plain mean when none holds a cell, and only its own faces', () => {
    const f = field([
      { owner: 'd:1', cells: 3, value: 0.2 },
      { owner: 'd:1', cells: 1, value: 0.6 },
      { owner: 'd:2', cells: 5, value: 0.9 },
      { owner: null, cells: 7, value: 0.0 },
      { owner: 'd:3', cells: 0, value: 0.4 },
      { owner: 'd:3', cells: 0, value: 0.8 },
    ]);
    expect(districtValue(f, 'd:1')).toBeCloseTo((3 * 0.2 + 1 * 0.6) / 4, 12);
    expect(districtValue(f, 'd:2')).toBeCloseTo(0.9, 12);
    expect(districtValue(f, 'd:3')).toBeCloseTo(0.6, 12);
    // a district with cells on one face only: the weight decides, not the face count
    expect(districtValue(field([{ owner: 'd', cells: 0, value: 1 }, { owner: 'd', cells: 2, value: 0.5 }]), 'd')).toBeCloseTo(0.5, 12);
  });

  it("a way's width: its scalar, or its widest width-knot run's", () => {
    expect(wayWidthCm({ width: 600 as never })).toBe(600);
    expect(wayWidthCm({ width: { knotRole: 'width_knot', values: [800, 1200, 1200, 1000], interp: 'linear' } as never })).toBe(1200);
    expect(wayWidthCm({ width: { knotRole: 'width_knot', values: [1400, 900], interp: 'linear' } as never })).toBe(1400);
  });
});

describe('base.ts is the one file that names every M0 stage (C-0077; the checker’s line)', () => {
  it('no other source file of the packages imports the stage factories of S1, S4, S5a – S5d, S6 and S8 together', () => {
    const root = fileURLToPath(new URL('../../../../', import.meta.url));
    const factories = ['s1Stage', 's4Stage', 's5aStage', 's5bStage', 's5cStage', 's5dStage', 's6Stage', 's8Stage', 's3Slice', 'commitS3Slice'];
    const files: string[] = [];
    const walk = (dir: string): void => {
      for (const name of readdirSync(dir)) {
        const p = join(dir, name);
        if (statSync(p).isDirectory()) walk(p);
        else if (name.endsWith('.ts')) files.push(p);
      }
    };
    for (const pkg of readdirSync(root)) {
      const src = join(root, pkg, 'src');
      try {
        if (statSync(src).isDirectory()) walk(src);
      } catch {
        // a package without src
      }
    }
    const naming = files.filter((f) => {
      const text = readFileSync(f, 'utf8');
      return factories.every((n) => new RegExp(`\\b${n}\\b`).test(text));
    });
    expect(naming.map((f) => relative(root, f))).toEqual(['layout/src/pipeline/base.ts']);
  });
});

describe("S8's input from S5's and S6's records and the fields (C-0264 (6))", () => {
  const tables = tableView();
  const regimes = ['dense_core', 'walled_rings', 'ribbon'];
  const field = (pairs: [string, number, number][]): ScalarField => ({ faces: pairs.map(([owner, cells, value], i) => ({ key: [i, 0, 0, 0], owner, cells, value })), valueAt: () => 0 }) as unknown as ScalarField;
  const district = (id: string, growthStage: number) => ({ id, kind: 'craft', quarter: 'quarter:q', faces: { owner: id, level: 1 }, seams: [], growthStage, fabric: 'bent-cut', fabricParams: {}, lifecycle: {} });
  const input = {
    slice: { site: { tables, rung: 'CITY' } },
    state: {
      stages: regimes.map((regime, i) => ({ regime, walled: i < 2 })),
      ways: [
        { id: 'way:a', width: 600 },
        { id: 'way:b', width: { knotRole: 'width_knot', values: [800, 1200, 1200, 1000], interp: 'linear' } },
      ],
    },
    s6: {
      districts: [district('district:1', 1), district('district:2', 3), district('district:3', 2)],
      lineages: new Map([
        ['district:1', [1, 2]],
        ['district:2', [3, 4]],
        ['district:3', [5, 6]],
      ]),
      seams: [{ id: 'seam:x', sides: ['district:1', 'district:2'], edges: [], portals: [] }],
    },
    fields: {
      prosperity: field([
        ['district:1', 2, 0.2],
        ['district:1', 2, 0.4],
        ['district:2', 1, 0.9],
        ['district:3', 0, 0.5],
      ]),
      density: field([
        ['district:1', 1, 0.7],
        ['district:2', 3, 0.1],
        ['district:3', 1, 0.3],
      ]),
    },
  };
  const ctx = { seedKey: seedKey(5), streamOpts: (_c: unknown, _e: unknown, attempt = 0) => ({ reroll: 2, attempt, epoch: 0, salt: 0 }) };

  it("each district: S6's lineage, the town root's S8 reroll, its pass-1 values, its growth stage's regime row and walled flag", () => {
    const kernel = {} as never;
    const s8 = baseS8Input(input as never, kernel, ctx as never);
    expect(s8.kernel).toBe(kernel);
    expect(s8.seedKey).toEqual(seedKey(5));
    expect(s8.rung).toBe('CITY');
    expect(s8.epoch).toBe(0);
    expect(s8.seams).toBe(input.s6.seams);
    expect(s8.ways.map((w) => w.id)).toEqual(['way:a', 'way:b']);
    expect(s8.districts.map((d) => d.district.id)).toEqual(['district:1', 'district:2', 'district:3']);
    expect(s8.districts.map((d) => d.lineage)).toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);
    expect(s8.districts.map((d) => d.reroll)).toEqual([2, 2, 2]);
    expect(s8.districts[0].prosperity).toBeCloseTo(0.3, 12);
    expect(s8.districts[1].prosperity).toBeCloseTo(0.9, 12);
    expect(s8.districts[2].prosperity).toBeCloseTo(0.5, 12);
    expect(s8.districts[0].density).toBeCloseTo(0.7, 12);
    expect(s8.districts[1].density).toBeCloseTo(0.1, 12);
    expect(s8.districts[2].density).toBeCloseTo(0.3, 12);
    expect(s8.districts.map((d) => d.regime)).toEqual([tables.table('regimes').row('dense_core'), tables.table('regimes').row('ribbon'), tables.table('regimes').row('walled_rings')]);
    expect(s8.districts.map((d) => d.walled)).toEqual([true, false, true]);
    expect([...s8.widths]).toEqual([
      ['way:a', 600],
      ['way:b', 1200],
    ]);
  });

  it('a district S6 gave no lineage is a programming error', () => {
    const bad = { ...input, s6: { ...input.s6, lineages: new Map([['district:1', [1, 2]]]) } };
    expect(() => baseS8Input(bad as never, {} as never, ctx as never)).toThrow(/district:2 no lineage/);
  });
});

describe("S1 resolves the registered strategies by the blueprint's names (§4.12: every caller resolves the registered one)", () => {
  const bp = { size: { rung: 'CITY' as const, aspect: 1 }, site: { relief: 'plain' as const, river: { inflowBearingCdeg: 9000, mouth: 'estuary' as const } }, seed: 1 };
  const ctx = { kernel: { tag: 'façade' } } as never;
  it("terrain and river default to 'base'; the river strategy reads the blueprint's size and river on S1's terrain", () => {
    const reg = createRegistry();
    registerBase(reg);
    const calls: unknown[] = [];
    const terrain = { id: 'terrain:ground' };
    reg.terrain.set('base', { terrain: (b: unknown) => (calls.push(['terrain', b]), ok(terrain as never)) } as never);
    reg.river.set('base', { rivers: (b: unknown, t: unknown, w: unknown) => (calls.push(['river', b, t, w]), err('E_OUT_OF_RANGE', 'stub')) } as never);
    const s1 = reg.products.get('base')?.stages[0] as PipelineStage;
    const r = s1.run({ bp }, ctx);
    expect(r).toEqual({ ok: false, code: 'E_OUT_OF_RANGE', detail: 'stub' });
    expect(calls).toEqual([
      ['terrain', { size: bp.size, site: bp.site }],
      ['river', { size: bp.size, site: { river: bp.site.river } }, terrain, { bodies: [], bridges: [] }],
    ]);
  });

  it('a name no strategy is registered under refuses S1 E_INVARIANT, naming it', () => {
    const reg = createRegistry();
    registerBase(reg);
    const s1 = reg.products.get('base')?.stages[0] as PipelineStage;
    const t = s1.run({ bp: { ...bp, terrain: 'nope' } }, ctx) as { ok: boolean; code?: string; detail?: string };
    expect([t.ok, t.code]).toEqual([false, 'E_INVARIANT']);
    expect(t.detail).toMatch(/TerrainStrategy is registered as 'nope'/);
    reg.terrain.set('base', { terrain: () => ok({} as never) } as never);
    const rv = s1.run({ bp: { ...bp, river: 'nope' } }, ctx) as { ok: boolean; code?: string; detail?: string };
    expect([rv.ok, rv.code]).toEqual([false, 'E_INVARIANT']);
    expect(rv.detail).toMatch(/RiverStrategy is registered as 'nope'/);
  });
});
