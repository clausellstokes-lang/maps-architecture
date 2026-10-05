// M0-a-13: smoothing committed geometry is a warp whose field the smoother computes (§3.4 *The doors*, §3.6): the
// pinned-vertex Laplacian over a chain's route vertices, an open chain's ends and kernel-pinned vertices never moving,
// each pass one warp step under its rules (whole-step validation, halving, the held set), the arena valid after every
// pass; a ring smooths cyclically; a role that names no edge refuses.
import { describe, expect, it } from 'vitest';
import { VERTEX_PINNED } from '../../src/arena/index.js';
import { insertChain } from '../../src/insert/index.js';
import { smoothCommitted } from '../../src/warp/index.js';
import { commit, framed, healthy, movedLists, pt, vertexAtPoint } from './support.js';

const ZIG = [[500, 1000], [1000, 1300], [1500, 1000], [2000, 1300], [2500, 1000]] as const;

/** The sum of the interior vertices' distances from the chord y = 1 000 between the ends (the zig-zag's amplitude). */
function amplitude(ys: readonly number[]): number {
  return ys.reduce((s, y) => s + Math.abs(y - 1000), 0);
}

describe('smoothCommitted: the pinned-vertex Laplacian as warp steps', () => {
  it('three passes over a zig-zag way: its ends stay, its interior flattens, every pass valid', () => {
    const p = framed();
    commit(p, 1, (o) => insertChain(o, ZIG.map(([x, y]) => pt(x, y)), [{ role: 'way', entity: 'way:1' }], 'mandatory'));
    const c = commit(p, 1, (o) => smoothCommitted(o, { role: 'way', entity: 'way:1' }, 3));
    expect(c.value.length).toBe(3);
    expect(c.value.every((r) => r.applied)).toBe(true);
    expect(vertexAtPoint(p, 500, 1000)).toBeGreaterThanOrEqual(0);
    expect(vertexAtPoint(p, 2500, 1000)).toBeGreaterThanOrEqual(0);
    const moved = c.value[0].moves.map((m) => m.to.y);
    expect(moved.length).toBe(3);
    const last = c.value[2].moves.map((m) => m.to.y);
    expect(amplitude(last)).toBeLessThan(amplitude([1300, 1000, 1300]));
    expect(amplitude(last)).toBeLessThan(amplitude(moved));
    // The commit record lists every vertex the three passes moved, once, by lattice position (§3.3, §3.6).
    const m = movedLists(p, c.record?.moved, c.value);
    expect(m.record.length).toBe(3);
    expect(m.record).toEqual(m.reported);
    healthy(p);
  });

  it('a kernel-pinned vertex is held by a smoothing step', () => {
    const p = framed();
    commit(p, 1, (o) => insertChain(o, ZIG.map(([x, y]) => pt(x, y)), [{ role: 'way', entity: 'way:1' }], 'mandatory'));
    p.vertices.flags[vertexAtPoint(p, 1500, 1000)] |= VERTEX_PINNED;
    const c = commit(p, 1, (o) => smoothCommitted(o, { role: 'way', entity: 'way:1' }, 2));
    expect(vertexAtPoint(p, 1500, 1000)).toBeGreaterThanOrEqual(0);
    expect(c.value[0].held.length).toBeGreaterThanOrEqual(1);
    expect(c.value[0].moves.length).toBe(2);
    healthy(p);
  });

  it('a closed ring smooths cyclically and stays a valid ring', () => {
    const p = framed();
    const ring = [[1000, 1000], [1600, 900], [2000, 1400], [1700, 2000], [1100, 1900], [900, 1500]] as const;
    commit(p, 2, (o) => insertChain(o, ring.map(([x, y]) => pt(x, y)), [{ role: 'kerb', entity: 'block:1' }], 'mandatory', { closed: true }));
    const c = commit(p, 2, (o) => smoothCommitted(o, { role: 'kerb', entity: 'block:1' }, 2));
    expect(c.value[0].moves.length).toBe(6);
    healthy(p);
  });

  it('zero passes and a chain that resolves to no edge do nothing; a vertex role refuses', () => {
    const p = framed();
    commit(p, 1, (o) => insertChain(o, ZIG.map(([x, y]) => pt(x, y)), [{ role: 'way', entity: 'way:1' }], 'mandatory'));
    expect(commit(p, 1, (o) => smoothCommitted(o, { role: 'way', entity: 'way:1' }, 0)).record).toBeNull();
    expect(commit(p, 1, (o) => smoothCommitted(o, { role: 'way', entity: 'way:9' }, 2)).value).toEqual([]);
    expect(() => commit(p, 1, (o) => smoothCommitted(o, { role: 'junction', entity: 'way:1' }, 1))).toThrow(/E_DEGENERATE/);
  });
});
