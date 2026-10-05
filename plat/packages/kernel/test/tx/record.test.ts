// M0-a-06: the commit record (§3.3 *The commit record*): the dirty set per level ≥ the batch's level, the four counts and
// the work, the promoted, demoted and unflagged vertices, the owners and the role keys, every list in a canonical order —
// and the digest hook's dirty set handed to the injected listener (M0-d-04). "No output depends on slot numbers"
// (§3.3): the same batch on two arenas of equal content whose slots differ gives equal arenas and equal records read on
// lattice positions (the slot-renumbering harness proper is M0-d-08's, over fixtures/).
import { describe, expect, it } from 'vitest';
import { faceKey, idOf, type Plat } from '../../src/arena/index.js';
import { insertChain } from '../../src/insert/index.js';
import { removeEdges, setOwner, tx, type CommitRecord, type DirtySet } from '../../src/tx/index.js';
import { commit, contentPrint, framed, healthy, must, pt, S6, spec } from './support.js';

/** The record read on lattice positions and canonical keys: comparable across arenas whose slots differ. */
function readable(p: Plat, r: CommitRecord): string {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const v = (x: number): string => `${X[x]},${Y[x]}`;
  const f = (l: number, x: number): string => {
    const k = faceKey(p, l as 0, x);
    return `${v(k[0])}>${v(k[1])}`;
  };
  return JSON.stringify({
    level: r.level,
    faces: r.faces.map((d) => ({ l: d.level, c: d.created.map((x) => f(d.level, x)), ch: d.changed.map((x) => f(d.level, x)), r: d.removed.length })),
    counts: [r.edgesAdded, r.edgesRemoved, r.steinerAdded, r.steinerDissolved, r.work],
    promoted: r.promoted.map(v),
    demoted: [r.demoted.vertices.map(v), r.demoted.edges.length],
    unflagged: r.unflagged.map(v),
    owners: r.owners,
    roles: r.roles,
    warnings: r.warnings,
  });
}

describe('the commit record and the digest listener', () => {
  it('a way across the frame and a lane on it: faces per level from the batch\'s level, counts, owners, roles in order', () => {
    const p = framed();
    const seen: DirtySet[] = [];
    const c = tx(p, spec(1), (o) => {
      must(insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'way', entity: 'way:b' }], 'mandatory'));
      return insertChain(o, [pt(2000, 2000), pt(2000, 4000)], [{ role: 'way', entity: 'way:a' }], 'mandatory');
    }, { onCommit: (_p, d) => seen.push(d) });
    expect(c.ok).toBe(true);
    if (!c.ok || c.value.record === null) return;
    const r = c.value.record;
    expect(r.version).toBe(1);
    expect(r.level).toBe(1);
    expect(r.faces.map((d) => d.level)).toEqual([1, 2, 3, 4]);
    expect(r.faces[0].created.length).toBe(3);
    expect(r.edgesAdded).toBeGreaterThanOrEqual(3);
    expect(r.work).toBeGreaterThan(0);
    expect(r.moved).toEqual([]);
    // Rule 7's order: role rank (way first, margin later in the registry), then the entity's address id.
    const keys = r.roles.map((k) => `${k.role}/${k.entity}`);
    expect(keys.indexOf('way/way:a')).toBeGreaterThanOrEqual(0);
    expect(keys.indexOf('way/way:a')).toBeLessThan(keys.indexOf('way/way:b'));
    expect(keys.indexOf('way/way:b')).toBeLessThan(keys.indexOf('margin/terrain:1'));
    // The listener got the record's dirty set, once.
    expect(seen).toHaveLength(1);
    expect(seen[0]).toEqual({ key: r.key, version: 1, faces: r.faces, owners: r.owners, roles: r.roles });
    // created faces by canonical key
    const ks = r.faces[0].created.map((f) => faceKey(p, 1, f)).map(([a, b]) => [p.vertices.y[a], p.vertices.x[a], p.vertices.y[b], p.vertices.x[b]]);
    const sorted = ks.slice().sort((x, y) => x[0] - y[0] || x[1] - y[1] || x[2] - y[2] || x[3] - y[3]);
    expect(ks).toEqual(sorted);
  });

  it('owners: a re-own lists the old and the new owner; a removal the owners of the faces it removed or changed', () => {
    const p = framed();
    const c1 = commit(p, 1, (o) => insertChain(o, [pt(2000, 0), pt(2000, 4000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
    const faces = c1.record?.faces[0].created ?? [];
    commit(p, 1, (o) => {
      must(setOwner(o, [faces[0]], 'district:b'));
      return setOwner(o, [faces[1]], 'district:a');
    }, { stage: S6, rederivesFrom: S6 });
    const c3 = commit(p, 1, (o) => setOwner(o, [faces[0]], 'district:c'), { stage: S6, rederivesFrom: S6 });
    expect(c3.record?.owners).toEqual(['district:b', 'district:c']);
    expect(p.faces[1].stage[faces[0]]).toBe(6);
    const c4 = commit(p, 1, (o) => removeEdges(o, { role: 'way', entity: 'way:1' }));
    expect(c4.record?.owners).toEqual(['district:a', 'district:c']);
    expect(c4.record?.faces[0].removed.length).toBe(2);
    healthy(p);
  });

  it('no output depends on slot numbers: the same batch on an arena whose slots were shuffled by earlier batches', () => {
    const build = (shuffle: boolean): Plat => {
      const p = framed();
      if (shuffle) {
        // Earlier batches that leave freed slots behind (reused last-in, first-out), so equal content takes other slots.
        commit(p, 1, (o) => {
          for (let i = 0; i < 4; i++) must(insertChain(o, [pt(300 + 700 * i, 300), pt(600 + 700 * i, 3700)], [{ role: 'way', entity: `tmp:${i}` }], 'mandatory'));
          return { ok: true as const, value: null, warnings: [] };
        });
        commit(p, 1, (o) => {
          for (const i of [2, 0, 3, 1]) must(removeEdges(o, { role: 'way', entity: `tmp:${i}` }));
          return { ok: true as const, value: null, warnings: [] };
        });
      }
      commit(p, 1, (o) => insertChain(o, [pt(0, 2000), pt(1500, 2300), pt(4000, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
      return p;
    };
    const a = build(false);
    const b = build(true);
    expect(contentPrint(b)).toBe(contentPrint(a));
    expect(b.slots.vertex.top).not.toBe(a.slots.vertex.top);
    const batch = (p: Plat) => tx(p, spec(1), (o) => {
      must(insertChain(o, [pt(1500, 2300), pt(1500, 4000)], [{ role: 'way', entity: 'way:2' }], 'mandatory'));
      must(insertChain(o, [pt(1510, 4000), pt(2600, 0)], [{ role: 'way', entity: 'way:3' }], 'mandatory'));
      return removeEdges(o, { chain: { role: 'way', entity: 'way:1' }, from: pt(0, 2000), to: pt(1500, 2300) });
    });
    const ra = batch(a);
    const rb = batch(b);
    expect(ra.ok && rb.ok).toBe(true);
    if (!ra.ok || !rb.ok || ra.value.record === null || rb.value.record === null) return;
    expect(contentPrint(b)).toBe(contentPrint(a));
    expect(readable(b, rb.value.record)).toBe(readable(a, ra.value.record));
    healthy(a);
    healthy(b);
    expect(idOf(a, 0)).toBe('terrain:1');
  });
});
