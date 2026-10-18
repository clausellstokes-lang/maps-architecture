// The role registry (§2.2 rule 7): a versioned data table, `roles.json` beside this file (C-0005 — the kernel's data,
// not @plat/tables, which the kernel may not import), read through an import because model code may not touch the file
// system (C-0131 (1)). A role's id is its interned u16 inside the arena (`RoleTable.kind`); an output that reads a role
// set in order reads it by the role's `rank`, then the entity's address id, never by an interned handle (rule 7).
// M0-a-02. The table is checked whole when the module loads, so a malformed edit fails at once.
import type { RoleName } from '../types/index.js';
import data from './roles.json';
import { check } from './debug.js';

/** A role sits on edge pairs or on vertices (rule 7's two rows). */
export type RoleKind = 'edge' | 'vertex';

/** One row of the registry. */
export interface RoleInfo {
  /** The interned u16: the row's position, never changed, never reused (append-only). */
  readonly id: number;
  readonly name: RoleName;
  readonly kind: RoleKind;
  /** The order an output reads a role set in (rule 7); version 1: rule 7's table order. */
  readonly rank: number;
  /** Bold in rule 7: never removed by a sliver absorption or a face merge (§3.6). */
  readonly structural: boolean;
  /** Italic in rule 7: its rows carry an ordinal; every other role's ordinal is 0. */
  readonly indexed: boolean;
  /** One knot role per profiled attribute (rule 5): indexed, its ordinals the profile's knots. */
  readonly knot: boolean;
  /** The registry version that added the row. */
  readonly since: number;
}

/** The largest role id a role-head key word can carry (`role << 16 | ordinal` stays a positive int32). */
export const MAX_ROLE_ID = 0x7ffe;

/** The registry document's shape (roles.json). */
export interface RoleRegistryDoc {
  readonly version: number;
  readonly roles: readonly {
    readonly id: number;
    readonly name: string;
    readonly kind: string;
    readonly rank: number;
    readonly structural: boolean;
    readonly indexed: boolean;
    readonly knot: boolean;
    readonly since: number;
  }[];
}

/** Checks a registry document whole and returns its frozen rows; a malformed document is refused (a programming error). */
export function parseRoleRegistry(data: RoleRegistryDoc): { version: number; roles: readonly RoleInfo[] } {
  check(Number.isInteger(data.version) && data.version >= 1, 'roles.json: version must be an integer ≥ 1');
  const roles: RoleInfo[] = [];
  const ranks: boolean[] = [];
  const names = new Map<string, number>();
  for (let i = 0; i < data.roles.length; i++) {
    const r = data.roles[i];
    check(r.id === i, `roles.json: row ${i} carries id ${r.id} (ids are dense and in row order)`);
    check(i <= MAX_ROLE_ID, 'roles.json: too many roles for a u16 key word');
    check(typeof r.name === 'string' && /^[a-z][a-z0-9_]*$/.test(r.name), `roles.json: row ${i} has a malformed name`);
    check(!names.has(r.name), `roles.json: role ${r.name} appears twice`);
    names.set(r.name, i);
    check(r.kind === 'edge' || r.kind === 'vertex', `roles.json: role ${r.name} has kind ${r.kind}`);
    check(Number.isInteger(r.rank) && r.rank >= 0 && r.rank < data.roles.length && ranks[r.rank] !== true,
      `roles.json: role ${r.name} has a rank outside 0 … n − 1 or shared`);
    ranks[r.rank] = true;
    check(typeof r.structural === 'boolean' && typeof r.indexed === 'boolean' && typeof r.knot === 'boolean',
      `roles.json: role ${r.name} has a flag that is not a boolean`);
    check(!r.structural || r.kind === 'edge', `roles.json: role ${r.name}: only an edge role is structural`);
    check(!r.knot || (r.kind === 'vertex' && r.indexed), `roles.json: role ${r.name}: a knot role is an indexed vertex role`);
    check(Number.isInteger(r.since) && r.since >= 1 && r.since <= data.version, `roles.json: role ${r.name} has since ${r.since}`);
    roles.push(Object.freeze({
      id: r.id, name: r.name, kind: r.kind, rank: r.rank, structural: r.structural, indexed: r.indexed, knot: r.knot, since: r.since,
    }));
  }
  return { version: data.version, roles: Object.freeze(roles) };
}

const loaded = parseRoleRegistry(data);
const byName = new Map<RoleName, number>();
for (const r of loaded.roles) byName.set(r.name, r.id);

/** The registry's version (raised by every append). */
export const ROLE_REGISTRY_VERSION: number = loaded.version;

/** Every role, indexed by id. */
export const ROLE_REGISTRY: readonly RoleInfo[] = loaded.roles;

/** The id of a role name, or −1 when the registry has no such role. */
export function roleIdOf(name: RoleName): number {
  return byName.get(name) ?? -1;
}

/** The row of a role id (an id outside the registry is a programming error). */
export function roleInfo(id: number): RoleInfo {
  const r = ROLE_REGISTRY[id];
  check(r !== undefined, `no role with id ${id}`);
  return r;
}

/** The row of a role name (a name outside the registry is a programming error: the registry is the vocabulary). */
export function roleNamed(name: RoleName): RoleInfo {
  const id = roleIdOf(name);
  check(id >= 0, `no role named ${name}`);
  return ROLE_REGISTRY[id];
}

/** Two role ids in rank order (rule 7). */
export function compareRoleRank(a: number, b: number): number {
  return roleInfo(a).rank - roleInfo(b).rank;
}
