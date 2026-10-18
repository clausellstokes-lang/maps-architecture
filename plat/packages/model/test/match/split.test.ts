// M0-d-05b: the listed test "a split through an anchor: the left child keeps the id (§3.6 (5))" — §6.3's *Split through
// an anchor* and §3.6's splitFace semantics (5): the children come in canonical order, the face left of the directed cut
// first, so an anchor lying exactly on the cut belongs to the left child. Read through `MatchOptions.splits` (C-0188).
import { describe, expect, it } from 'vitest';
import { match, M0_ANCHORS, resolveAnchors, splitHeir, type MatchEntity } from '../../src/index.js';
import { P, pointEntity, rect } from './support.js';

const TABLE = resolveAnchors(M0_ANCHORS, () => 30);

// A 100 m block cut along x = 5 000 cm, directed north (from (5 000, 0) to (5 000, 10 000)): the face left of the
// directed cut is the western half.
const WEST = rect(0, 0, 5_000, 10_000);
const EAST = rect(5_000, 0, 10_000, 10_000);

/** The old block, its anchor at `x`, and the two children (left first in the kernel's order) with centroids far from it. */
function scene(x: number, y = 5_000): { old: MatchEntity[]; fresh: MatchEntity[] } {
  return {
    old: [pointEntity('block', 'block:parent', x, y)],
    fresh: [pointEntity('block', 'block:zwest', 2_500, 5_000, { region: WEST }), pointEntity('block', 'block:aeast', 7_500, 5_000, { region: EAST })],
  };
}
const splits = new Map([['block:parent', ['block:zwest', 'block:aeast']]]);

describe('a split through an anchor: the left child keeps the id (§3.6 (5))', () => {
  it('an anchor exactly on the cut goes to the left child, whatever the ids sort as', () => {
    const { old, fresh } = scene(5_000);
    const r = match(old, fresh, TABLE, { splits });
    expect(r.old.get('block:parent')).toEqual({ outcome: 'succeed', kind: 'block', id: 'block:parent', fresh: 'block:zwest', by: 'split', score: 0 });
    expect(r.addressOf.get('block:zwest')).toBe('block:parent');
    expect(r.outcomes.filter((o) => o.outcome === 'fresh').map((o) => o.id)).toEqual(['block:aeast']);
    // The kernel's order is what decides: the same cut directed south makes the east half the left child.
    const south = match(old, fresh, TABLE, { splits: new Map([['block:parent', ['block:aeast', 'block:zwest']]]) });
    expect(south.old.get('block:parent')).toMatchObject({ fresh: 'block:aeast', by: 'split' });
    // In any input order.
    expect(match([...old].reverse(), [...fresh].reverse(), TABLE, { splits }).outcomes).toEqual(r.outcomes);
  });

  it('an anchor strictly inside one child goes to that child', () => {
    const { old, fresh } = scene(6_000);
    expect(match(old, fresh, TABLE, { splits }).old.get('block:parent')).toMatchObject({ fresh: 'block:aeast', by: 'split' });
    const w = scene(4_999);
    expect(match(w.old, w.fresh, TABLE, { splits }).old.get('block:parent')).toMatchObject({ fresh: 'block:zwest', by: 'split' });
  });

  it('the anchor matching comes first: a child within the radius succeeds by distance', () => {
    const { old, fresh } = scene(7_400);
    expect(match(old, fresh, TABLE, { splits }).old.get('block:parent')).toMatchObject({ fresh: 'block:aeast', by: 'point', score: 100 });
  });

  it('without a declared split the old block is a tombstone, superseded by the child covering its anchor (ties by fresh id)', () => {
    const { old, fresh } = scene(5_000);
    const r = match(old, fresh, TABLE);
    expect(r.old.get('block:parent')).toMatchObject({ outcome: 'tombstone', supersededBy: 'block:aeast' });
  });

  it('splitHeir reads the same rule on bare areas', () => {
    expect(splitHeir(P(5_000, 5_000), [WEST, EAST])).toBe(0);
    expect(splitHeir(P(5_000, 5_000), [EAST, WEST])).toBe(0);
    expect(splitHeir(P(5_001, 5_000), [WEST, EAST])).toBe(1);
    expect(splitHeir(P(20_000, 5_000), [WEST, EAST])).toBe(-1);
    expect(() => splitHeir(P(0.5, 0), [WEST])).toThrow(/lattice point/);
  });

  it('refuses a split naming no re-derived old entity, a child of another kind or without a region, or a child twice', () => {
    const { old, fresh } = scene(5_000);
    expect(() => match(old, fresh, TABLE, { splits: new Map([['block:nobody', ['block:zwest']]]) })).toThrow(/no re-derived old entity/);
    expect(() => match([{ ...old[0], survives: true }], fresh.slice(1), TABLE, { splits })).toThrow(/no re-derived old entity/);
    expect(() => match(old, [fresh[0], pointEntity('block', 'block:aeast', 7_500, 5_000)], TABLE, { splits })).toThrow(/with a region/);
    expect(() => match(old, fresh, TABLE, { splits: new Map([['block:parent', ['block:zwest', 'block:zwest']]]) })).toThrow(/two splits, or named twice/);
    expect(() => match(old, fresh, TABLE, { splits: new Map([['block:parent', []]]) })).toThrow(/no children/);
    const w = { id: 'water:w', kind: 'water', lineage: [1, 0], anchor: { area: rect(0, 0, 10, 10) } } as unknown as MatchEntity;
    expect(() => match([w], [], TABLE, { splits: new Map([['water:w', ['x']]]) })).toThrow(/not point-anchored/);
  });
});
