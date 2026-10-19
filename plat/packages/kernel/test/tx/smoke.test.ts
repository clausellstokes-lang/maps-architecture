// M0-a-06: the transaction's basic round trips — a callback batch commits a chain and bumps the version; a removal of it
// in a later batch restores the arena's content exactly (§13.1's remove(insert(x)) ≡ id on the topology).
import { describe, expect, it } from 'vitest';
import { insertChain } from '../../src/insert/index.js';
import { removeEdges, setOwner } from '../../src/tx/index.js';
import { commit, framed, healthy, pt, state } from './support.js';

describe('a callback batch round trip', () => {
  it('a way across the frame committed, then removed: the arena as before, the version bumped twice', () => {
    const p = framed();
    const before = state(p);
    const c1 = commit(p, 1, (o) => insertChain(o, [pt(500, 2000), pt(3500, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
    expect(c1.record).not.toBeNull();
    expect(c1.record?.version).toBe(1);
    expect(p.version).toBe(1);
    healthy(p);
    const c2 = commit(p, 1, (o) => removeEdges(o, { role: 'way', entity: 'way:1' }));
    expect(c2.record?.version).toBe(2);
    healthy(p);
    expect(state(p).replace(/#v\d+$/, '')).toBe(before.replace(/#v\d+$/, ''));
  });

  it('a way splitting the frame in two, re-owned, then removed', () => {
    const p = framed();
    const before = state(p);
    const c1 = commit(p, 1, (o) => insertChain(o, [pt(2000, 0), pt(2000, 4000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
    const created = c1.record?.faces.find((d) => d.level === 1)?.created ?? [];
    expect(created.length).toBe(2);
    healthy(p);
    commit(p, 1, (o) => setOwner(o, created, 'block:1'));
    healthy(p);
    commit(p, 1, (o) => removeEdges(o, { role: 'way', entity: 'way:1' }));
    healthy(p);
    expect(state(p).replace(/#v\d+$/, '')).toBe(before.replace(/#v\d+$/, ''));
  });
});
