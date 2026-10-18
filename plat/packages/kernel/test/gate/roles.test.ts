// The M0 close gate, row K5 (check/M0-world-sites-gate; docs/build/M0-world-sites-gate.md): the role registry is
// append-only without changing any existing document's digest, and `LINEAR_PARTS` is extensible per transaction
// through `TxEnv.chainParts`. The digest reads a role through its row's `name`, `rank` and `kind` only
// (digest/levelDigest.ts `chainItem`, `compareItems`), the block through its `id` and the registry `version`
// (io/encode.ts `rows`, the header): so an append keeps every existing document's digest and block exactly when it
// keeps every existing row's id, name, kind and rank — what `parseRoleRegistry` is held to here on the committed
// roles.json plus one appended row. The committed registry cannot be swapped at run time (API.md §1's caveat), so the
// goldens are pinned on the rows the digest reads, not by re-digesting under the appended registry.
import { describe, expect, it } from 'vitest';
import { parseRoleRegistry, ROLE_REGISTRY, ROLE_REGISTRY_VERSION, type RoleRegistryDoc } from '../../src/arena/index.js';
import data from '../../src/arena/roles.json';
import { insertChain } from '../../src/insert/index.js';
import { LINEAR_PARTS, tx, type TxEnv } from '../../src/tx/index.js';
import { framed, pt, spec } from '../tx/support.js';

const committed = data as RoleRegistryDoc;

/** The committed document plus one row appended at the next id and the next rank, under the next version. */
function appended(): RoleRegistryDoc {
  const n = committed.roles.length;
  return {
    version: committed.version + 1,
    roles: [...committed.roles, { id: n, name: 'site_anchor', kind: 'vertex', rank: n, structural: false, indexed: true, knot: false, since: committed.version + 1 }],
  };
}

describe('K5: the role registry is append-only; an append keeps every row the digest and the block read', () => {
  it('the committed registry parses to ROLE_REGISTRY, ids dense in row order', () => {
    const parsed = parseRoleRegistry(committed);
    expect(parsed.version).toBe(ROLE_REGISTRY_VERSION);
    expect(parsed.roles).toEqual(ROLE_REGISTRY);
    expect(parsed.roles.map((r) => r.id)).toEqual(parsed.roles.map((_, i) => i));
  });

  it('an appended row keeps every existing row identical (id, name, kind, rank, structural, indexed, knot, since)', () => {
    const parsed = parseRoleRegistry(appended());
    expect(parsed.version).toBe(ROLE_REGISTRY_VERSION + 1);
    expect(parsed.roles.length).toBe(ROLE_REGISTRY.length + 1);
    for (let i = 0; i < ROLE_REGISTRY.length; i++) expect(parsed.roles[i], `role ${i}`).toEqual(ROLE_REGISTRY[i]);
    const last = parsed.roles[ROLE_REGISTRY.length];
    expect(last).toMatchObject({ id: ROLE_REGISTRY.length, name: 'site_anchor', rank: ROLE_REGISTRY.length, since: ROLE_REGISTRY_VERSION + 1 });
    // What the digest and the block read of a role, per row: unchanged for every existing id.
    const read = (r: { id: number; name: string; kind: string; rank: number }): string => `${r.id}|${r.name}|${r.kind}|${r.rank}`;
    expect(parsed.roles.slice(0, ROLE_REGISTRY.length).map(read)).toEqual(ROLE_REGISTRY.map(read));
  });

  it('refuses a removed row (ids not dense) and a row dated past the version; a shifting insertion parses but moves every row after it', () => {
    const n = committed.roles.length;
    const removed: RoleRegistryDoc = { version: committed.version, roles: committed.roles.slice(1) };
    expect(() => parseRoleRegistry(removed)).toThrow(/dense/);
    // The loader holds ids dense in row order, so a shifted insertion passes it; it is the comparison with the committed
    // rows (the test above, on every existing id) that refuses it — the append-only rule is a snapshot rule, as the
    // concern and stage registries' is (test/rng/registry.test.ts, C-0020).
    const inserted: RoleRegistryDoc = {
      version: committed.version + 1,
      roles: [committed.roles[0], { id: 1, name: 'site_anchor', kind: 'vertex', rank: n, structural: false, indexed: false, knot: false, since: 2 }, ...committed.roles.slice(1).map((r) => ({ ...r, id: r.id + 1 }))],
    };
    const shifted = parseRoleRegistry(inserted);
    expect(shifted.roles[1].name).toBe('site_anchor');
    expect(shifted.roles[2]).not.toEqual(ROLE_REGISTRY[2]);
    expect(shifted.roles.slice(2).every((r, i) => r.id === ROLE_REGISTRY[i + 1].id + 1 && r.name === ROLE_REGISTRY[i + 1].name)).toBe(true);
    const future: RoleRegistryDoc = { ...appended(), version: committed.version };
    expect(() => parseRoleRegistry(future)).toThrow(/since/);
    const swapped: RoleRegistryDoc = { version: committed.version, roles: [{ ...committed.roles[0], rank: committed.roles[1].rank }, { ...committed.roles[1], rank: committed.roles[0].rank }, ...committed.roles.slice(2)] };
    // A re-ranking parses (it is a lawful document) but moves two existing rows: the check above would catch it.
    const p = parseRoleRegistry(swapped);
    expect(p.roles[0]).not.toEqual(ROLE_REGISTRY[0]);
  });
});

describe('K5: LINEAR_PARTS is extensible per transaction through TxEnv.chainParts', () => {
  it('a way laid in two parts is refused under the default (way: 1) and commits when the transaction declares 2', () => {
    expect(LINEAR_PARTS.way).toBe(1);
    const twoParts = (env: TxEnv): ReturnType<typeof tx> => {
      const p = framed();
      return tx(p, spec(1), (o) => {
        const a = insertChain(o, [pt(0, 1000), pt(1500, 1000)], [{ role: 'way', entity: 'way:split' }], 'mandatory');
        if (!a.ok) return a;
        return insertChain(o, [pt(2500, 1000), pt(4000, 1000)], [{ role: 'way', entity: 'way:split' }], 'mandatory');
      }, env);
    };
    const refused = twoParts({});
    expect(refused.ok).toBe(false);
    if (!refused.ok) expect(refused.detail).toMatch(/lies in 2 parts, more than the 1 it declares/);
    const declared = twoParts({ chainParts: (role, entity) => (role === 'way' && entity === 'way:split' ? 2 : null) });
    expect(declared.ok).toBe(true);
    const uncounted = twoParts({ chainParts: () => null });
    expect(uncounted.ok).toBe(true);
  });
});
