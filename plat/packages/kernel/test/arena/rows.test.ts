// M0-a-02: role rows (§2.2 rule 7) — each edge pair and vertex carries a sorted set of (role, entity, level, ordinal)
// rows, ordered by the role's rank and then the entity's address id (never the interned handle), with the reverse
// index (role-head table + same-key chains) finding every row of a key; removal keeps both structures whole. A random
// add / remove sequence is checked against a plain reference model.
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import {
  addRole,
  addRoleRow,
  allocEdgePair,
  allocVertex,
  createPlat,
  handleOf,
  idOf,
  intern,
  isRoleRowLive,
  removeRoleRow,
  roleIdOf,
  rowElement,
  rowKey,
  rowsOfKey,
  rowsOn,
  type Plat,
} from '../../src/arena/index.js';
import { FRAME, GROUND, pt } from './support.js';

/** The hard timeout of a property on the shared machine (M0-a-01's convention); never a timing. */
const TIMEOUT = 600_000;

function arena(): { p: Plat; v: number[]; h: number[] } {
  const p = createPlat(GROUND, FRAME);
  const v = [pt(0, 0), pt(100, 0), pt(100, 100), pt(0, 100)].map((q) => allocVertex(p, q, 0));
  const h = v.map((a, i) => allocEdgePair(p, a, v[(i + 1) % 4], 0));
  return { p, v, h };
}

const keysOn = (p: Plat, kind: 'edge' | 'vertex', e: number) => rowsOn(p, kind, e).map((r) => {
  const k = rowKey(p, r);
  return `${k.role}|${k.entity}|${k.ordinal}`;
});

describe('role rows (§2.2 rule 7)', () => {
  it('keeps each set in rank order, then by the entity\'s address id — not by the handle, whose value is interning order', () => {
    const { p, h } = arena();
    // intern in reverse id order so handle order and id order disagree
    for (const id of ['way:9', 'way:5', 'way:10', 'district:b', 'district:a']) intern(p, id);
    expect(handleOf(p, 'way:9')).toBeLessThan(handleOf(p, 'way:10'));
    const add = (role: string, entity: string, level = 1) => addRole(p, h[0], { role, entity }, level as 1);
    add('district_bound', 'district:b');
    add('way', 'way:9');
    add('district_bound', 'district:a');
    add('way', 'way:10');
    add('kerb', 'block:1', 2);
    add('way', 'way:5');
    // rank: way (0) < kerb (1) < district_bound (11); ids by code units: 'way:10' < 'way:5' < 'way:9'
    expect(keysOn(p, 'edge', h[0])).toEqual([
      'way|way:10|0', 'way|way:5|0', 'way|way:9|0', 'kerb|block:1|0', 'district_bound|district:a|0', 'district_bound|district:b|0',
    ]);
    // either half-edge names the pair
    expect(keysOn(p, 'edge', h[0] ^ 1)).toEqual(keysOn(p, 'edge', h[0]));
  });

  it('orders an indexed role\'s rows of one entity by ordinal, and keeps the row\'s level', () => {
    const { p, v } = arena();
    addRole(p, v[0], { role: 'width_knot', entity: 'way:1', ordinal: 2 }, 1);
    addRole(p, v[0], { role: 'width_knot', entity: 'way:1', ordinal: 0 }, 1);
    addRole(p, v[0], { role: 'junction', entity: 'junction:1' }, 1);
    addRole(p, v[0], { role: 'width_knot', entity: 'way:1', ordinal: 1 }, 3);
    expect(keysOn(p, 'vertex', v[0])).toEqual(['junction|junction:1|0', 'width_knot|way:1|0', 'width_knot|way:1|1', 'width_knot|way:1|2']);
    expect(rowsOn(p, 'vertex', v[0]).map((r) => p.roles.level[r])).toEqual([1, 1, 3, 1]);
  });

  it('finds every row of a key through the reverse index and every row\'s element through its set\'s end', () => {
    const { p, v, h } = arena();
    const rows = h.map((e) => addRole(p, e, { role: 'way', entity: 'way:1' }, 1));
    addRole(p, h[0], { role: 'shore', entity: 'water:1' }, 0);
    const way = roleIdOf('way');
    expect(rowsOfKey(p, way, handleOf(p, 'way:1'), 0).sort()).toEqual([...rows].sort());
    expect(rowsOfKey(p, way, handleOf(p, 'way:1'), 1)).toEqual([]);
    expect(rowsOfKey(p, way, handleOf(p, 'way:2'), 0)).toEqual([]);
    expect(rows.map((r) => rowElement(p, r))).toEqual(h.map((e) => e >> 1));
    const j = addRole(p, v[2], { role: 'junction', entity: 'junction:7' }, 1);
    expect(rowElement(p, j)).toBe(v[2]);
    expect(p.roles.nextInSet[j]).toBe(-2 - v[2]);
  });

  it('removes a row from the head, the middle and the end of its set and of its key\'s chain', () => {
    const { p, h } = arena();
    const r = ['a', 'b', 'c'].map((s) => addRole(p, h[0], { role: 'way', entity: `way:${s}` }, 1));
    const s = h.map((e) => addRole(p, e, { role: 'district_bound', entity: 'district:1' }, 1));
    removeRoleRow(p, r[1]);
    expect(keysOn(p, 'edge', h[0])).toEqual(['way|way:a|0', 'way|way:c|0', 'district_bound|district:1|0']);
    removeRoleRow(p, r[0]);
    removeRoleRow(p, s[0]);
    expect(keysOn(p, 'edge', h[0])).toEqual(['way|way:c|0']);
    removeRoleRow(p, r[2]);
    expect(rowsOn(p, 'edge', h[0])).toEqual([]);
    expect(p.roles.edgeFirst[h[0] >> 1]).toBe(-1);
    const db = roleIdOf('district_bound');
    const d1 = handleOf(p, 'district:1');
    removeRoleRow(p, s[2]); // the middle of the chain (prepended: s[3] is its head)
    expect(rowsOfKey(p, db, d1, 0).sort()).toEqual([s[1], s[3]].sort());
    removeRoleRow(p, s[3]);
    removeRoleRow(p, s[1]);
    expect(rowsOfKey(p, db, d1, 0)).toEqual([]);
    expect(p.roles.head.count).toBe(0);
    expect(isRoleRowLive(p, s[1])).toBe(false);
    expect(p.slots.role.live).toBe(0);
    // freed slots are reused
    const again = addRole(p, h[1], { role: 'way', entity: 'way:z' }, 1);
    expect(again).toBe(s[1]);
  });

  it('refuses a row the element already carries, an ordinal on a role the registry does not index, a handle never interned, a missing ordinal on an indexed role, an element slot not live as the role\'s kind reads it', () => {
    const { p, v, h } = arena();
    addRole(p, h[0], { role: 'way', entity: 'way:1' }, 1);
    expect(() => addRole(p, h[0], { role: 'way', entity: 'way:1' }, 2)).toThrow(/already carries/);
    expect(() => addRole(p, h[0] ^ 1, { role: 'way', entity: 'way:1' }, 1)).toThrow(/already carries/);
    expect(() => addRole(p, h[0], { role: 'way', entity: 'way:1', ordinal: 1 }, 1)).toThrow(/not indexed/);
    expect(() => addRole(p, h[0], { role: 'street', entity: 'way:1' }, 1)).toThrow(/no role named street/);
    expect(() => addRole(p, v[0], { role: 'gate_end', entity: 'gate:1' }, 1)).toThrow(/carries its ordinal/);
    expect(() => addRoleRow(p, h[0], roleIdOf('way'), 99, 1, 0)).toThrow(/never interned/);
    expect(() => addRoleRow(p, h[0], roleIdOf('way'), 0, 5 as 1, 0)).toThrow(/level/);
    expect(() => addRoleRow(p, v[1], roleIdOf('gate_end'), 0, 1, 0x10000)).toThrow(/u16/);
    // a vertex role on a dead vertex slot, an edge role on a dead half-edge
    expect(() => addRole(p, 77, { role: 'junction', entity: 'j:1' }, 1)).toThrow(/vertex 77 is not live/);
    expect(() => addRole(p, 77, { role: 'kerb', entity: 'b:1' }, 1)).toThrow(/half-edge 77 is not live/);
    expect(() => rowElement(p, 999)).toThrow(/not live/);
    expect(idOf(p, handleOf(p, 'way:1'))).toBe('way:1');
    // slots are plain numbers: the role's kind decides how the element is read (C-0149), so vertex slot 1, also a live
    // half-edge, takes an edge role on that half-edge's pair — the doors pass the right element
    expect(v[1]).toBe(1);
    expect(rowElement(p, addRole(p, v[1], { role: 'kerb', entity: 'block:2' }, 2))).toBe(1 >> 1);
    expect(rowsOn(p, 'vertex', v[1])).toEqual([]);
  });

  it('places a new entity\'s row by its address id before interning it: the set as if the id had been interned first', () => {
    const ids = ['way:1', 'way:10', 'way:5', 'way:', 'way:50', 'way:100', 'kerb:1'];
    const sets = [false, true].map((internFirst) => {
      const { p, h } = arena();
      if (internFirst) for (const id of [...ids].reverse()) intern(p, id);
      for (const id of ids) addRole(p, h[0], { role: 'way', entity: id }, 1);
      expect(handleOf(p, 'way:1')).toBe(internFirst ? 6 : 0); // interning order differs; the set does not
      return keysOn(p, 'edge', h[0]);
    });
    // by code units, a prefix first: 'way:' < 'way:1' < 'way:10' < 'way:100' < 'way:5' < 'way:50'; 'kerb:1' < 'way:'
    expect(sets[0]).toEqual(['kerb:1', 'way:', 'way:1', 'way:10', 'way:100', 'way:5', 'way:50'].map((id) => `way|${id}|0`));
    expect(sets[1]).toEqual(sets[0]);
  });

  it('agrees with a reference model over random add / remove sequences (sets sorted, chains complete)', () => {
    const roles = ['way', 'kerb', 'district_bound', 'frontage', 'gate_opening'];
    const entities = ['b:2', 'a:10', 'a:9', 'c', 'a:1'];
    fc.assert(
      fc.property(fc.array(fc.tuple(fc.nat(3), fc.nat(4), fc.nat(4), fc.nat(2), fc.boolean()), { maxLength: 80 }), (ops) => {
        const { p, h } = arena();
        const model = new Map<string, number>(); // "edge|role|entity|ordinal" → row
        for (const [e, ri, ei, ord, add] of ops) {
          const role = roles[ri];
          const ordinal = role === 'gate_opening' ? ord : 0;
          const key = `${e}|${role}|${entities[ei]}|${ordinal}`;
          if (add && !model.has(key)) model.set(key, addRole(p, h[e], { role, entity: entities[ei], ordinal }, 1));
          else if (!add && model.has(key)) {
            removeRoleRow(p, model.get(key) as number);
            model.delete(key);
          }
        }
        for (let e = 0; e < 4; e++) {
          const want = [...model.keys()].filter((k) => k.startsWith(`${e}|`)).map((k) => k.split('|').slice(1));
          want.sort((a, b) => (roleIdOf(a[0]) - roleIdOf(b[0])) || (a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0) || Number(a[2]) - Number(b[2]));
          expect(keysOn(p, 'edge', h[e])).toEqual(want.map((k) => k.join('|')));
        }
        for (const role of roles) {
          for (const ent of entities) {
            for (const ordinal of [0, 1, 2]) {
              const want = [...model.entries()].filter(([k]) => k.endsWith(`|${role}|${ent}|${ordinal}`)).map(([, r]) => r).sort();
              expect(rowsOfKey(p, roleIdOf(role), handleOf(p, ent), ordinal).sort()).toEqual(want);
            }
          }
        }
        expect(p.slots.role.live).toBe(model.size);
      }),
      { numRuns: 300 },
    );
  }, TIMEOUT);
});
