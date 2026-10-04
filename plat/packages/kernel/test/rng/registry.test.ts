// The kernel's two registries (item M0-d-01; §6.1, §4.1, §13.2 T41-1; C-0005, C-0020): versioned JSON data,
// append-only against the committed snapshot, the stage ids in §4.1's order, every §6.1 concern row with its cap, the
// retired ids reserved with no reader, J-DET-22's "rerollable concern without a reader" test with reserved rows skipped
// until their milestone, and the generated constants up to date.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  attemptCap,
  CONCERN_COUNT,
  CONCERN_REGISTRY,
  CONCERNS,
  concernRow,
  DEFAULT_ATTEMPT_CAP,
  isReserved,
  isStreamStage,
  REGISTRY_MILESTONES,
  rerollableWithoutReader,
  STAGE_COUNT,
  STAGE_REGISTRY,
  STAGE_VIEW,
  stageRow,
  STAGES,
  type ConcernRow,
} from '../../src/registry/index.js';
import { generated, readRegistry, renderIds } from './gen-registry.js';

const REGISTRY_DIR = new URL('../../src/registry/', import.meta.url);
const SNAPSHOT = JSON.parse(readFileSync(new URL('./registry.snapshot.json', import.meta.url), 'utf8')) as {
  concerns: { version: number; rows: [number, string][] };
  stages: { version: number; view: number; rows: [number, string][] };
};

/** §4.1's drawn order (S0 … S15 with the lettered stages), then S7c, S9b, S8.seed (C-0020) — transcribed from the design. */
const STAGE_ORDER = [
  'S0', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S7b', 'SKY', 'S12a', 'S8', 'S9', 'S10a', 'S10', 'S10b', 'S11', 'S12b',
  'S12c', 'S13a', 'S14', 'S15', 'S7c', 'S9b', 'S8.seed',
];

/** §6.1's concern table, row by row: the row's concerns and its cap ('—' a retired id) — transcribed from the design. */
const TABLE: [string[], 'default' | number | '—'][] = [
  [['terrain.noise', 'terrain.controls'], 'default'],
  [['water.coast', 'water.river', 'water.islands', 'water.delta'], 'default'],
  [['site.centre'], 'default'],
  [['blueprint.features'], 'default'],
  [['intent.surprise'], 0],
  [['gate.pick'], 'default'],
  [['reserve.plaza', 'reserve.castle', 'reserve.precinct', 'reserve.water'], 'default'],
  [['roster'], 'default'],
  [['route'], 'default'],
  [['growth.heading', 'growth.branch', 'growth.mainroad', 'growth.curvature'], 'default'],
  [['district.seed'], 'default'],
  [['district.type'], 'default'],
  [['alloc.district'], 'default'],
  [['alloc.block'], 'default'],
  [['field.chance'], 'default'],
  [['cut.t'], 2],
  [['cut.side'], '—'],
  [['cut.arc'], 'default'],
  [['cut.width'], 'default'],
  [['cut.farSideAlt'], '—'],
  [['plot.width', 'plot.vacancy', 'plot.bounds'], 'default'],
  [['plot.join'], 'default'],
  [['siting'], 'default'],
  [['siteplan'], 'default'],
  [['siteplan.template'], 'default'],
  [['heights', 'material'], 'default'],
  [['greenery', 'fields', 'crop', 'forest'], 'default'],
  [['hinterland.outside'], 'default'],
  [['hinterland.decor'], 'default'],
  [['pin.centrepiece', 'pin.stall'], 'default'],
  [['pin.decor'], 'default'],
  [['people'], 'default'],
  [['content/relations'], 'default'],
  [['naming'], 8],
  [['naming.quarter'], 'default'],
  [['naming.emblem'], 'default'],
  [['warp.jitter'], 'default'],
  [['epoch.transform'], 'default'],
  [['island.place'], 'default'],
  [['sewer'], 'default'],
  [['style.jitter', 'style.crowns', 'style.compass'], 'default'],
  [['render.instances'], 'default'],
  [['style.random'], 2],
  [['render.stampTiles'], 0],
  [['siteplan.mutate'], 2],
  [['use.relocate'], 0],
  [['siteplan.entrance'], 2],
  [['plan.program', 'plan.roles', 'plan.furnish'], 0],
  [['plan.layout'], 2],
  [['reserve.market'], 0],
  [['cut.interior'], 0],
  [['cut.stop'], 0],
  [['works'], 0],
  [['pin.light'], 0],
  [['raised.reason'], 0],
  [['fabric.select'], 0],
  [['hood.dispatch'], 0],
  [['hood.template'], 3],
  [['massing'], 2],
  [['compose.dormers', 'compose.porch'], 0],
  [['compose.rooms'], 0],
  [['village.plan', 'village.density', 'village.palisade', 'village.track', 'village.open', 'village.slot', 'village.fields'], 0],
  [['walls.condition'], 0],
  [['plan.damage'], 0],
  [['view.weather'], 0],
];

/** §6.1: "The registry marks which are [rerollable]: exactly …". */
const REROLLABLE = ['naming', 'render.instances', 'style.jitter', 'style.crowns', 'style.compass', 'naming.emblem', 'village.track'];

describe('the registries are versioned data files (C-0005)', () => {
  it('are JSON inside @plat/kernel, each with its registry name and a version', () => {
    for (const name of ['concerns', 'stages'] as const) {
      const text = readFileSync(new URL(`${name}.json`, REGISTRY_DIR), 'utf8');
      const file = JSON.parse(text) as { registry: string; version: number; rows: unknown[] };
      expect(file.registry).toBe(name);
      expect(Number.isInteger(file.version) && file.version >= 1).toBe(true);
      expect(file.rows.length).toBeGreaterThan(0);
    }
    expect(CONCERN_REGISTRY.rows.length).toBe(CONCERN_COUNT);
    expect(STAGE_REGISTRY.rows.length).toBe(STAGE_COUNT);
  });

  it('give every row a dense u16 id in file order and a unique name', () => {
    for (const reg of [CONCERN_REGISTRY, STAGE_REGISTRY]) {
      expect(reg.rows.map((r) => r.id)).toEqual(reg.rows.map((_, i) => i));
      expect(new Set(reg.rows.map((r) => r.name)).size).toBe(reg.rows.length);
      expect(reg.rows.length).toBeLessThan(0xffff);
    }
  });
});

describe('registry snapshot: ids append-only against the committed snapshot (C-0020)', () => {
  it('keeps every snapshot row at its id with its name; new rows only after them', () => {
    expect(SNAPSHOT.concerns.rows.length).toBeGreaterThan(0);
    expect(CONCERN_REGISTRY.rows.length).toBeGreaterThanOrEqual(SNAPSHOT.concerns.rows.length);
    expect(CONCERN_REGISTRY.rows.slice(0, SNAPSHOT.concerns.rows.length).map((r) => [r.id, r.name])).toEqual(SNAPSHOT.concerns.rows);
    expect(STAGE_REGISTRY.rows.length).toBeGreaterThanOrEqual(SNAPSHOT.stages.rows.length);
    expect(STAGE_REGISTRY.rows.slice(0, SNAPSHOT.stages.rows.length).map((r) => [r.id, r.name])).toEqual(SNAPSHOT.stages.rows);
    expect(STAGE_REGISTRY.view.id).toBe(SNAPSHOT.stages.view);
  });

  it('never moves the version backwards', () => {
    expect(CONCERN_REGISTRY.version).toBeGreaterThanOrEqual(SNAPSHOT.concerns.version);
    expect(STAGE_REGISTRY.version).toBeGreaterThanOrEqual(SNAPSHOT.stages.version);
  });

  it('fails on a renumbered, renamed or removed row (the check itself, on doctored copies)', () => {
    const live = CONCERN_REGISTRY.rows.map((r) => [r.id, r.name] as [number, string]);
    const prefixHolds = (rows: [number, string][]): boolean =>
      rows.length >= SNAPSHOT.concerns.rows.length && JSON.stringify(rows.slice(0, SNAPSHOT.concerns.rows.length)) === JSON.stringify(SNAPSHOT.concerns.rows);
    expect(prefixHolds(live)).toBe(true);
    expect(prefixHolds([...live, [live.length, 'new.concern']])).toBe(true); // an append passes
    expect(prefixHolds(live.filter((r) => r[1] !== 'cut.side').map((r, i) => [i, r[1]]))).toBe(false); // a removal renumbers
    expect(prefixHolds(live.map((r) => (r[1] === 'route' ? [r[0], 'route2'] : r)))).toBe(false);
    expect(prefixHolds([[0, 'new.first'], ...live.map((r) => [r[0] + 1, r[1]] as [number, string])])).toBe(false);
  });
});

describe("the stage-id registry: §4.1's order, STAGE_VIEW = 0xffff (C-0020)", () => {
  it("lists §4.1's stages in its drawn order, then S7c, S9b, S8.seed", () => {
    expect(STAGE_REGISTRY.rows.map((r) => r.name)).toEqual(STAGE_ORDER);
  });

  it('generates STAGES from the table, ids as u16 numbers', () => {
    expect(STAGES.S0).toBe(0);
    expect(STAGES.S8).toBe(STAGE_ORDER.indexOf('S8'));
    expect(STAGES['S8.seed']).toBe(24);
    for (const row of STAGE_REGISTRY.rows) expect(stageRow(row.id)).toBe(row);
  });

  it('reserves STAGE_VIEW = 0xffff for paint programs and furniture, outside the table', () => {
    expect(STAGE_VIEW).toBe(0xffff);
    expect(STAGE_REGISTRY.view).toMatchObject({ name: 'STAGE_VIEW', id: 0xffff });
    expect(stageRow(STAGE_VIEW)).toBeUndefined();
    expect(isStreamStage(STAGE_VIEW)).toBe(true);
    expect(isStreamStage(STAGE_COUNT - 1)).toBe(true);
    expect(isStreamStage(STAGE_COUNT)).toBe(false);
    expect(isStreamStage(-1)).toBe(false);
  });

  it('marks the stages the design places after M0: SKY at M6-sky, S7c, S9b and S8.seed at M5', () => {
    const reserved = STAGE_REGISTRY.rows.filter((r) => r.reservedUntil !== undefined).map((r) => [r.name, r.reservedUntil]);
    expect(reserved).toEqual([['SKY', 'M6-sky'], ['S7c', 'M5'], ['S9b', 'M5'], ['S8.seed', 'M5']]);
  });
});

describe('the concern registry: every §6.1 row present with its cap, in row order', () => {
  it("holds §6.1's whole table in its row order, one row per concern", () => {
    expect(CONCERN_REGISTRY.rows.map((r) => r.name)).toEqual(TABLE.flatMap(([names]) => names));
    const rowOf = TABLE.flatMap(([names], i) => names.map(() => i + 1));
    expect(CONCERN_REGISTRY.rows.map((r) => r.row)).toEqual(rowOf);
  });

  it('gives every concern its row\'s cap ("default", a number, or none for a retired id)', () => {
    const caps = TABLE.flatMap(([names, cap]) => names.map(() => (cap === '—' ? null : cap)));
    expect(CONCERN_REGISTRY.rows.map((r) => r.cap)).toEqual(caps);
  });

  it('resolves the caps the mixer guards: a number as written, "default" as the geometric ladders\' 2, a retired id −1', () => {
    expect(DEFAULT_ATTEMPT_CAP).toBe(2);
    expect(attemptCap(CONCERNS.naming)).toBe(8);
    expect(attemptCap(CONCERNS['hood.template'])).toBe(3);
    expect(attemptCap(CONCERNS['cut.stop'])).toBe(0);
    expect(attemptCap(CONCERNS.route)).toBe(2);
    expect(attemptCap(CONCERNS['cut.side'])).toBe(-1);
    expect(attemptCap(CONCERNS['cut.farSideAlt'])).toBe(-1);
    expect(attemptCap(CONCERN_COUNT)).toBe(-1);
    expect(attemptCap(-1)).toBe(-1);
    expect(attemptCap(1.5)).toBe(-1);
  });

  it('marks exactly the seven rerollable concerns', () => {
    expect(CONCERN_REGISTRY.rows.filter((r) => r.rerollable).map((r) => r.name).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))).toEqual(
      [...REROLLABLE].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0)),
    );
  });

  it("keeps each row's keying cell (the one statement of how its draws are keyed) and its readers", () => {
    for (const row of CONCERN_REGISTRY.rows) {
      expect(row.keyedBy.length).toBeGreaterThan(0);
      if (row.retired) expect(row.readers).toEqual([]);
      else expect(row.readers.length).toBeGreaterThan(0);
    }
    expect(concernRow(CONCERNS['cut.stop'])?.keyedBy).toContain("keyed by the face's lineage");
  });

  it('names only §16 milestones in reservedUntil; a retired row carries none', () => {
    for (const row of CONCERN_REGISTRY.rows) {
      if (row.reservedUntil !== undefined) expect(REGISTRY_MILESTONES).toContain(row.reservedUntil);
      if (row.retired) expect(row.reservedUntil).toBeUndefined();
    }
    // the design's own reservations (§6.1's table: "reserved at M1, drawing nothing before M5")
    expect(concernRow(CONCERNS['fabric.select'])?.reservedUntil).toBe('M5');
    expect(concernRow(CONCERNS['hood.dispatch'])?.reservedUntil).toBe('M5');
    expect(concernRow(CONCERNS['hood.template'])?.reservedUntil).toBe('M5');
  });

  it('generates CONCERNS from the table: ConcernId constants equal to the rows\' ids', () => {
    for (const row of CONCERN_REGISTRY.rows) expect(concernRow(row.id)).toBe(row);
    expect(CONCERNS['terrain.noise']).toBe(0);
    expect(CONCERNS['view.weather']).toBe(CONCERN_COUNT - 1);
    expect(concernRow(CONCERN_COUNT)).toBeUndefined();
  });
});

describe('T41-1: cut.stop registered with its reader; cut.side and cut.farSideAlt reserved ids no reader draws', () => {
  it('registers cut.stop with S8 reading it, cap 0, not retired', () => {
    const row = concernRow(CONCERNS['cut.stop']);
    expect(row).toMatchObject({ name: 'cut.stop', cap: 0, retired: false, rerollable: false });
    expect(row?.readers).toContain('S8');
    expect(row?.reservedUntil).toBeUndefined(); // read at M0 (M0-b-02)
  });

  it('keeps cut.side and cut.farSideAlt as retired ids with no reader, between their neighbours', () => {
    for (const name of ['cut.side', 'cut.farSideAlt'] as const) {
      const row = concernRow(CONCERNS[name]);
      expect(row).toMatchObject({ name, retired: true, cap: null, readers: [], rerollable: false });
    }
    const names = CONCERN_REGISTRY.rows.map((r) => r.name);
    expect(names.indexOf('cut.side')).toBe(names.indexOf('cut.t') + 1);
    expect(names.indexOf('cut.farSideAlt')).toBe(names.indexOf('cut.width') + 1);
  });
});

describe('J-DET-22: a rerollable concern without a reader fails; reserved rows skipped until their milestone (C-0020)', () => {
  const atM0 = new Set(['M-1', 'M0']);

  it('passes the registry at M0, where every rerollable row is reserved until its reader lands', () => {
    expect(rerollableWithoutReader(CONCERN_REGISTRY.rows, new Set(), atM0)).toEqual([]);
    for (const name of REROLLABLE) expect(isReserved(concernRow(CONCERNS[name as keyof typeof CONCERNS]) as ConcernRow, atM0)).toBe(true);
  });

  it('fails a rerollable row once its milestone is reached and no registered stage or program reads it', () => {
    const atM1 = new Set(['M-1', 'M0', 'M1']);
    const missing = rerollableWithoutReader(CONCERN_REGISTRY.rows, new Set(), atM1);
    expect(missing).toEqual(['naming', 'style.jitter', 'style.crowns', 'style.compass', 'render.instances']);
    const readers = new Set(missing.map((n) => CONCERNS[n as keyof typeof CONCERNS] as number));
    expect(rerollableWithoutReader(CONCERN_REGISTRY.rows, readers, atM1)).toEqual([]);
  });

  it('fails an unreserved rerollable row with no reader, and skips a retired one', () => {
    const fixture: ConcernRow[] = [
      { id: 0, name: 'x.rerollable', row: 1, cap: 'default', rerollable: true, retired: false, readers: ['S1'], keyedBy: 'x' },
      { id: 1, name: 'x.reserved', row: 2, cap: 0, rerollable: true, retired: false, readers: ['S9'], keyedBy: 'x', reservedUntil: 'M5' },
      { id: 2, name: 'x.plain', row: 3, cap: 0, rerollable: false, retired: false, readers: [], keyedBy: 'x' },
      { id: 3, name: 'x.retired', row: 4, cap: null, rerollable: true, retired: true, readers: [], keyedBy: 'x' },
    ];
    expect(rerollableWithoutReader(fixture, new Set(), atM0)).toEqual(['x.rerollable']);
    expect(rerollableWithoutReader(fixture, new Set([0]), atM0)).toEqual([]);
    expect(rerollableWithoutReader(fixture, new Set([0]), new Set([...atM0, 'M5']))).toEqual(['x.reserved']);
  });
});

describe('the generated constants (ids.ts) are up to date with the registries', () => {
  it('equals what gen-registry renders from the committed JSON', () => {
    const committed = readFileSync(new URL('ids.ts', REGISTRY_DIR), 'utf8');
    expect(committed).toBe(generated(REGISTRY_DIR));
  });

  it('would change with the registry (the check can fail)', () => {
    const concerns = readRegistry('concerns', REGISTRY_DIR);
    const stages = readRegistry('stages', REGISTRY_DIR);
    const appended = { ...concerns, rows: [...concerns.rows, { id: concerns.rows.length, name: 'zz.appended' }] };
    expect(renderIds(appended, stages)).not.toBe(renderIds(concerns, stages));
    expect(() => renderIds({ ...concerns, rows: concerns.rows.slice(1) }, stages)).toThrow(/dense/);
  });
});
