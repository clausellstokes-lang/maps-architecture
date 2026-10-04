// M0-a-02: the role registry snapshot (§2.2 rule 7; C-0005) — append-only ids against the committed version-1 rows,
// every rule 7 role present with its structural and indexed flags, the rank order, and roles.json is data (JSON with
// no code), read by the kernel through an import.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { compareRoleRank, parseRoleRegistry, ROLE_REGISTRY, ROLE_REGISTRY_VERSION, roleIdOf, roleInfo, roleNamed, type RoleRegistryDoc } from '../../src/arena/index.js';

// Rule 7's table, transcribed from §2.2 in its row order: [name, structural (bold), indexed (italics)]. This is the
// version-1 snapshot: a later version may only append rows after it.
const EDGE: [string, boolean, boolean][] = [
  ['way', true, false], ['kerb', false, false], ['corridor_split', false, false], ['band', false, false],
  ['wall', true, false], ['wall_gate', true, false], ['shore', true, false], ['bank', true, false],
  ['border', true, false], ['margin', true, false], ['field_bound', false, false], ['district_bound', false, false],
  ['plot_line', false, false], ['party_wall', false, false], ['frontage', false, false], ['access', false, false],
  ['yard_part', false, false], ['claim', false, false], ['reserved', true, false], ['setback', true, false],
  ['deck', true, false], ['green_line', false, false], ['treatment', false, false], ['gate_opening', false, true],
  ['tunnel', true, false], ['gallery', true, false], ['chamber_wall', true, false], ['rim', true, false],
  ['invisible', false, false],
];
const VERTEX: [string, boolean][] = [
  ['junction', false], ['tower', false], ['gate', false], ['entrance', true], ['portal', false], ['attach', true],
  ['anchor', true], ['weld', true], ['deck_end', true], ['gate_end', true], ['composition', true],
  ['access_point', false], ['link_end', true], ['raised_foot', true], ['sky_access', false],
];
const KNOTS = ['width_knot', 'base_knot', 'invert_knot', 'bank_knot', 'shore_class_knot', 'retaining_state_knot',
  'wall_state_knot', 'wall_material_knot', 'wall_epoch_knot', 'wall_class_knot', 'wall_order_knot', 'deck_order_knot'];

const SNAPSHOT = [
  ...EDGE.map(([name, structural, indexed]) => ({ name, kind: 'edge', structural, indexed, knot: false, since: 1 })),
  ...VERTEX.map(([name, indexed]) => ({ name, kind: 'vertex', structural: false, indexed, knot: false, since: 1 })),
  ...KNOTS.map((name) => ({ name, kind: 'vertex', structural: false, indexed: true, knot: true, since: 1 })),
];

const RAW = readFileSync(new URL('../../src/arena/roles.json', import.meta.url), 'utf8');

describe('the role registry (§2.2 rule 7, C-0005)', () => {
  it('is data: a JSON document with a version and rows of plain values — no code', () => {
    const doc = JSON.parse(RAW) as { version: number; roles: Record<string, unknown>[] };
    expect(Number.isInteger(doc.version) && doc.version >= 1).toBe(true);
    expect(doc.version).toBe(ROLE_REGISTRY_VERSION);
    for (const row of doc.roles) {
      for (const v of Object.values(row)) expect(['string', 'number', 'boolean']).toContain(typeof v);
      expect(Object.keys(row).sort()).toEqual(['id', 'indexed', 'kind', 'knot', 'name', 'rank', 'since', 'structural']);
    }
  });

  it('holds the version-1 snapshot as its first rows, ids dense from 0 in row order (append-only)', () => {
    expect(ROLE_REGISTRY.length).toBeGreaterThanOrEqual(SNAPSHOT.length);
    SNAPSHOT.forEach((want, id) => {
      const r = ROLE_REGISTRY[id];
      expect({ name: r.name, kind: r.kind, structural: r.structural, indexed: r.indexed, knot: r.knot, since: r.since }, `id ${id}`).toEqual(want);
      expect(r.id).toBe(id);
    });
    // later rows (none at version 1) continue the ids and carry a later `since`
    ROLE_REGISTRY.slice(SNAPSHOT.length).forEach((r, k) => {
      expect(r.id).toBe(SNAPSHOT.length + k);
      expect(r.since).toBeGreaterThan(1);
    });
  });

  it('carries every rule 7 role exactly once with its flags, and nothing else at version 1', () => {
    expect(ROLE_REGISTRY_VERSION).toBe(1);
    expect(ROLE_REGISTRY).toHaveLength(56);
    const names = ROLE_REGISTRY.map((r) => r.name);
    expect(new Set(names).size).toBe(names.length);
    expect(ROLE_REGISTRY.filter((r) => r.structural).map((r) => r.name)).toEqual(
      ['way', 'wall', 'wall_gate', 'shore', 'bank', 'border', 'margin', 'reserved', 'setback', 'deck', 'tunnel', 'gallery', 'chamber_wall', 'rim']);
    expect(ROLE_REGISTRY.filter((r) => r.kind === 'edge' && r.indexed).map((r) => r.name)).toEqual(['gate_opening']);
    expect(ROLE_REGISTRY.filter((r) => r.knot).every((r) => r.kind === 'vertex' && r.indexed && !r.structural)).toBe(true);
  });

  it('ranks the roles in rule 7\'s row order (a permutation of the ids; version 1: rank = id)', () => {
    const ranks = ROLE_REGISTRY.map((r) => r.rank).sort((a, b) => a - b);
    expect(ranks).toEqual(ROLE_REGISTRY.map((_, i) => i));
    expect(ROLE_REGISTRY.every((r) => r.rank === r.id)).toBe(true);
    expect(compareRoleRank(roleIdOf('way'), roleIdOf('district_bound'))).toBeLessThan(0);
    expect(compareRoleRank(roleIdOf('deck_order_knot'), roleIdOf('junction'))).toBeGreaterThan(0);
    expect(compareRoleRank(roleIdOf('kerb'), roleIdOf('kerb'))).toBe(0);
  });

  it('looks roles up by name and id; an unknown name is −1 and an unknown id or name a programming error', () => {
    expect(roleIdOf('way')).toBe(0);
    expect(roleIdOf('deck_order_knot')).toBe(55);
    expect(roleIdOf('street')).toBe(-1);
    expect(roleInfo(29).name).toBe('junction');
    expect(roleNamed('gate_end').indexed).toBe(true);
    expect(() => roleInfo(56)).toThrow(/no role with id 56/);
    expect(() => roleInfo(-1)).toThrow(/no role/);
    expect(() => roleNamed('street')).toThrow(/no role named street/);
  });

  it('returns frozen rows (the registry is read-only data)', () => {
    expect(Object.isFrozen(ROLE_REGISTRY)).toBe(true);
    expect(Object.isFrozen(ROLE_REGISTRY[0])).toBe(true);
  });

  it('refuses a malformed document whole: ids not dense, a name twice, a shared or out-of-range rank, a bad kind, a structural vertex role, a knot that is not an indexed vertex role, a since past the version', () => {
    const doc = JSON.parse(RAW) as RoleRegistryDoc;
    const edit = (i: number, patch: Record<string, unknown>, version = doc.version): RoleRegistryDoc =>
      ({ version, roles: doc.roles.map((r, k) => (k === i ? { ...r, ...patch } : r)) }) as RoleRegistryDoc;
    expect(parseRoleRegistry(doc).roles).toHaveLength(56);
    expect(() => parseRoleRegistry({ version: 0, roles: doc.roles })).toThrow(/version/);
    expect(() => parseRoleRegistry(edit(3, { id: 4 }))).toThrow(/carries id 4/);
    expect(() => parseRoleRegistry(edit(3, { name: 'way' }))).toThrow(/appears twice/);
    expect(() => parseRoleRegistry(edit(3, { name: 'Bad Name' }))).toThrow(/malformed name/);
    expect(() => parseRoleRegistry(edit(3, { rank: 0 }))).toThrow(/rank/);
    expect(() => parseRoleRegistry(edit(3, { rank: 56 }))).toThrow(/rank/);
    expect(() => parseRoleRegistry(edit(3, { kind: 'face' }))).toThrow(/kind face/);
    expect(() => parseRoleRegistry(edit(29, { structural: true }))).toThrow(/only an edge role is structural/);
    expect(() => parseRoleRegistry(edit(29, { knot: true }))).toThrow(/knot role is an indexed vertex role/);
    expect(() => parseRoleRegistry(edit(1, { knot: true }))).toThrow(/knot role is an indexed vertex role/);
    expect(() => parseRoleRegistry(edit(3, { since: 2 }))).toThrow(/since 2/);
    expect(() => parseRoleRegistry(edit(3, { indexed: 'yes' }))).toThrow(/not a boolean/);
    // a version-2 append is accepted: the next id at the end, since 2
    const appended = { version: 2, roles: [...doc.roles, { id: 56, name: 'zz_new', kind: 'edge', rank: 56, structural: false, indexed: false, knot: false, since: 2 }] };
    expect(parseRoleRegistry(appended).roles[56].name).toBe('zz_new');
  });
});
