// M0-a-06: chain profiles — reading and cutting (§2.2 rule 5; §3.4 sampleProfile, retypeEdges' rekey, removeEdges' cut
// knots; C-0045) and §13.1's "profiles" fixtures: a way split between two width knots — every sampled half-width within
// 10⁻⁹ cm of before — then re-joined, the original profile bit for bit; a stretch of a way removed between two junctions
// and a stretch of a ring removed between two anchors — every remaining sample within 10⁻⁹ cm, every other role
// unchanged. The pure ops cutKnot, joinProfiles and renumberKnots on their own.
import { describe, expect, it } from 'vitest';
import type { Plat } from '../../src/arena/index.js';
import { insertChain } from '../../src/insert/index.js';
import type { ChainProfile, LatticePoint, Order } from '../../src/types/index.js';
import {
  cutKnot,
  joinProfiles,
  removeEdges,
  renumberKnots,
  retypeEdges,
  routeLines,
  sampleChain,
  sampleProfile,
  type KnotLine,
} from '../../src/tx/index.js';
import { carrying, commit, edgeRows, framed, healthy, must, pt, state, vertexAtPoint } from './support.js';

const KEY = { layer: 'ground' as const, part: 0 };
const TOL = 1e-9;

/** Samples per route vertex as "x,y" → value. */
function perVertex(p: Plat, prof: ChainProfile<number> | ChainProfile<string>, chain: { role: string; entity: string }): Map<string, number | string> {
  const lines = routeLines(p, chain, KEY);
  const vals = sampleChain(p, prof, chain, KEY, 'perVertex');
  const out = new Map<string, number | string>();
  let i = 0;
  for (const ln of lines) for (const v of ln.vertices) out.set(`${p.vertices.x[v]},${p.vertices.y[v]}`, vals[i++]);
  return out;
}

/** A way:1 across the frame through bends, with width knots 0 … 2 at x = 0, 2000, 4000. */
function profiledWay(): { p: Plat; prof: ChainProfile<number> } {
  const p = framed();
  const pts: LatticePoint[] = [pt(0, 2000), pt(1000, 2200), pt(2000, 2000), pt(3000, 2200), pt(4000, 2000)];
  commit(p, 1, (o) => insertChain(o, pts, [{ role: 'way', entity: 'way:1' }], 'mandatory', {
    knots: [{ index: 0, role: 'width_knot', ordinal: 0 }, { index: 2, role: 'width_knot', ordinal: 1 }, { index: 4, role: 'width_knot', ordinal: 2 }],
  }));
  return { p, prof: { knotRole: 'width_knot', values: [400, 800, 600], interp: 'linear' } };
}

describe('sampleProfile: by arc length along the owner\'s own-level route (§2.2 rule 5)', () => {
  it('linear: each vertex\'s sample by its arc position between the bracketing knots; the knots themselves exact', () => {
    const { p, prof } = profiledWay();
    const s = sampleProfile(p, prof, 'way:1', KEY, 'perVertex') as number[];
    expect(s).toHaveLength(5);
    expect(s[0]).toBe(400);
    expect(s[2]).toBe(800);
    expect(s[4]).toBe(600);
    expect(s[1]).toBeCloseTo(600, 9); // halfway along two equal segments
    expect(s[3]).toBeCloseTo(700, 9);
  });

  it('a step to the next knot: held values; a step profile\'s categorical values as given', () => {
    const { p } = profiledWay();
    const prof: ChainProfile<string> = { knotRole: 'width_knot', values: ['a', 'b', 'c'], interp: 'step' };
    expect(sampleProfile(p, prof, 'way:1', KEY, 'perVertex')).toEqual(['a', 'a', 'b', 'b', 'c']);
  });

  it('a step (atCm) along the route: samples at 0, atCm, 2·atCm …', () => {
    const { p, prof } = profiledWay();
    const s = sampleProfile(p, prof, 'way:1', KEY, 1000 as never) as number[];
    expect(s[0]).toBe(400);
    expect(s.length).toBe(5); // the route is ≈ 4 × 1019.8 cm long
  });

  it('a chain that resolves to no edge gives []', () => {
    const { p, prof } = profiledWay();
    expect(sampleProfile(p, prof, 'way:404', KEY, 'perVertex')).toEqual([]);
  });

  it('a ring interpolates cyclically (the last knot back to the first)', () => {
    const p = framed();
    commit(p, 1, (o) => insertChain(o, [pt(1000, 1000), pt(3000, 1000), pt(3000, 3000), pt(1000, 3000)], [{ role: 'wall', entity: 'enceinte:1' }], 'mandatory', {
      closed: true, knots: [{ index: 0, role: 'base_knot', ordinal: 0 }, { index: 2, role: 'base_knot', ordinal: 1 }],
    }));
    const prof: ChainProfile<number> = { knotRole: 'base_knot', values: [100, 300], interp: 'linear' };
    const s = sampleProfile(p, prof, 'enceinte:1', KEY, 'perVertex') as number[];
    expect(s).toEqual([100, 200, 300, 200]);
  });
});

describe('the pure ops: cutKnot, joinProfiles, renumberKnots', () => {
  const line: KnotLine<number> = { interp: 'linear', closed: false, length: 300, knots: [{ pos: 100, value: 10, ordinal: 0 }, { pos: 200, value: 30, ordinal: 1 }] };
  it('cutKnot: constant before the first and after the last knot, linear between, exact at a knot', () => {
    expect(cutKnot(line, 0)).toBe(10);
    expect(cutKnot(line, 150)).toBe(20);
    expect(cutKnot(line, 200)).toBe(30);
    expect(cutKnot(line, 300)).toBe(30);
    expect(cutKnot({ ...line, interp: 'step' }, 199)).toBe(10);
    expect(cutKnot({ ...line, closed: true }, 250)).toBe(25); // 30 → 10 over 200 … 400 (= 100 + 300)
    expect(cutKnot({ ...line, closed: true }, 50)).toBe(15);
  });

  it('joinProfiles: the two cut knots of an undone split carry one value and drop; two values stay as a step', () => {
    const a: KnotLine<number> = { interp: 'linear', closed: false, length: 150, knots: [{ pos: 100, value: 10, ordinal: 0 }, { pos: 150, value: 20, ordinal: 1 }] };
    const b: KnotLine<number> = { interp: 'linear', closed: false, length: 150, knots: [{ pos: 0, value: 20, ordinal: 0 }, { pos: 50, value: 30, ordinal: 1 }] };
    const j = joinProfiles(a, b);
    expect(renumberKnots(j.knots).values).toEqual([10, 30]);
    const c: KnotLine<number> = { ...b, knots: [{ pos: 0, value: 25, ordinal: 0 }, { pos: 50, value: 30, ordinal: 1 }] };
    expect(renumberKnots(joinProfiles(a, c).knots).values).toEqual([10, 20, 25, 30]);
    const sa: KnotLine<string> = { interp: 'step', closed: false, length: 150, knots: [{ pos: 0, value: 'x', ordinal: 0 }, { pos: 150, value: 'x', ordinal: 1 }] };
    const sb: KnotLine<string> = { interp: 'step', closed: false, length: 150, knots: [{ pos: 0, value: 'x', ordinal: 0 }, { pos: 50, value: 'y', ordinal: 1 }] };
    expect(renumberKnots(joinProfiles(sa, sb).knots).values).toEqual(['x', 'y']);
  });

  it('renumberKnots: ordinals from 0 in chain order', () => {
    expect(renumberKnots([{ pos: 0, value: 5, ordinal: 7 }, { pos: 9, value: 6, ordinal: 2 }])).toEqual({ values: [5, 6], ordinals: [0, 1] });
  });

  it('an Order value compares by its seq then its step', () => {
    const o: KnotLine<Order> = { interp: 'step', closed: false, length: 10, knots: [{ pos: 0, value: { seq: 1, step: 2 }, ordinal: 0 }] };
    expect(cutKnot(o, 5)).toEqual({ seq: 1, step: 2 });
  });
});

describe('§13.1 profiles: a way split between two width knots, then re-joined', () => {
  it('every sampled half-width within 1e-9 cm of before; re-joined, the original profile bit for bit', () => {
    const { p, prof } = profiledWay();
    const before = perVertex(p, prof, { role: 'way', entity: 'way:1' });
    // The split at x = 3000, between knot 1 (x = 2000) and knot 2 (x = 4000): the far part handed to way:2.
    const split = commit(p, 1, (o) => retypeEdges(o, { chain: { role: 'way', entity: 'way:1' }, from: pt(3000, 2200), to: pt(4000, 2000) }, [], [], {
      from: 'way:1', to: 'way:2', profiles: [{ from: prof }],
    }));
    healthy(p);
    const out = split.value.profiles[0];
    expect(out.knotRole).toBe('width_knot');
    const a = out.from as ChainProfile<number>;
    const b = out.to as ChainProfile<number>;
    expect(a.values.slice(0, 2)).toEqual([400, 800]);
    expect(a.values).toHaveLength(3);
    // way:2's chain order starts at its lower (y, x) end, (4000, 2000): its knots renumbered from there.
    expect(b.values).toHaveLength(2);
    expect(b.values[0]).toBe(600);
    expect(a.values[2]).toBe(b.values[1]); // the two cut knots carry one value
    const sa = perVertex(p, a, { role: 'way', entity: 'way:1' });
    const sb = perVertex(p, b, { role: 'way', entity: 'way:2' });
    for (const [at, v] of before) {
      const now = sa.get(at) ?? sb.get(at);
      expect(now).toBeDefined();
      expect(Math.abs((now as number) - (v as number))).toBeLessThanOrEqual(TOL);
    }
    expect(edgeRows(p, [3000, 2200], [4000, 2000])).toEqual(['way/way:2']);
    // Re-joined: way:2 back into way:1.
    const join = commit(p, 1, (o) => retypeEdges(o, { role: 'way', entity: 'way:2' }, [], [], { from: 'way:2', to: 'way:1', profiles: [{ from: b, to: a }] }));
    healthy(p);
    const j = join.value.profiles[0];
    expect(j.from).toBeUndefined();
    expect(j.to).toEqual(prof);
    for (const [o, x] of [[0, 0], [1, 2000], [2, 4000]] as const) expect(carrying(p, 'width_knot', 'way:1', o)).toEqual([vertexAtPoint(p, x, 2000)]);
    expect(carrying(p, 'width_knot', 'way:1', 3)).toEqual([]);
    expect(carrying(p, 'width_knot', 'way:2', 0)).toEqual([]);
    expect(edgeRows(p, [3000, 2200], [4000, 2000])).toEqual(['way/way:1']);
  });

  it('a cut at a knot vertex copies that knot to the other part', () => {
    const { p, prof } = profiledWay();
    const split = commit(p, 1, (o) => retypeEdges(o, { chain: { role: 'way', entity: 'way:1' }, from: pt(2000, 2000), to: pt(4000, 2000) }, [], [], {
      from: 'way:1', to: 'way:2', profiles: [{ from: prof }],
    }));
    const out = split.value.profiles[0];
    expect((out.from as ChainProfile<number>).values).toEqual([400, 800]);
    expect((out.to as ChainProfile<number>).values).toEqual([800, 600]); // way:2 from its lower end, (2000, 2000)
  });

  it('a part wholly before the first knot takes the constant there as a scalar', () => {
    const p = framed();
    commit(p, 1, (o) => insertChain(o, [pt(0, 2000), pt(1000, 2200), pt(2000, 2000), pt(3000, 2200), pt(4000, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory', {
      knots: [{ index: 2, role: 'width_knot', ordinal: 0 }, { index: 4, role: 'width_knot', ordinal: 1 }],
    }));
    const prof: ChainProfile<number> = { knotRole: 'width_knot', values: [500, 900], interp: 'linear' };
    const split = commit(p, 1, (o) => retypeEdges(o, { chain: { role: 'way', entity: 'way:1' }, from: pt(0, 2000), to: pt(1000, 2200) }, [], [], {
      from: 'way:1', to: 'way:2', profiles: [{ from: prof }],
    }));
    const out = split.value.profiles[0];
    expect(out.to).toBe(500);
    // way:1's rest runs from its lower end (4000, 2000): its knots there, then the cut knot at (1000, 2200).
    expect(out.from).toEqual({ knotRole: 'width_knot', values: [900, 500, 500], interp: 'linear' });
    expect(carrying(p, 'width_knot', 'way:2', 0)).toEqual([]);
  });
});

describe('§13.1 profiles: stretches removed', () => {
  it('a stretch of a way removed between two junctions (its far part rekeyed first): remaining samples within 1e-9, other roles unchanged', () => {
    const { p, prof } = profiledWay();
    commit(p, 1, (o) => {
      must(insertChain(o, [pt(1000, 0), pt(1000, 4000)], [{ role: 'way', entity: 'way:3' }], 'mandatory'));
      return insertChain(o, [pt(3000, 0), pt(3000, 4000)], [{ role: 'way', entity: 'way:4' }], 'mandatory');
    });
    healthy(p);
    const before = perVertex(p, prof, { role: 'way', entity: 'way:1' });
    const rows3 = edgeRows(p, [1000, 0], [1000, 2200]);
    const c = commit(p, 1, (o) => {
      const r = must(retypeEdges(o, { chain: { role: 'way', entity: 'way:1' }, from: pt(3000, 2200), to: pt(4000, 2000) }, [], [], {
        from: 'way:1', to: 'way:9', profiles: [{ from: prof }],
      }));
      const near = r.profiles[0].from as ChainProfile<number>;
      const rm = must(removeEdges(o, { chain: { role: 'way', entity: 'way:1' }, from: pt(1000, 2200), to: pt(3000, 2200) }, [near]));
      return { ok: true as const, value: { near: rm.profiles[0].value as ChainProfile<number>, far: r.profiles[0].to as ChainProfile<number> }, warnings: [] };
    });
    healthy(p);
    const sNear = perVertex(p, c.value.near, { role: 'way', entity: 'way:1' });
    const sFar = perVertex(p, c.value.far, { role: 'way', entity: 'way:9' });
    expect(sNear.size).toBe(2);
    expect(sFar.size).toBe(2);
    for (const [at, v] of [...sNear, ...sFar]) expect(Math.abs((v as number) - (before.get(at) as number))).toBeLessThanOrEqual(TOL);
    expect(edgeRows(p, [1000, 2200], [2000, 2000])).toBeNull();
    expect(edgeRows(p, [1000, 0], [1000, 2200])).toEqual(rows3);
    expect(edgeRows(p, [1000, 2200], [1000, 4000])).toEqual(['way/way:3']);
    expect(vertexAtPoint(p, 2000, 2000)).toBe(-1);
  });

  it('a stretch of a ring removed between two anchors: the open rest samples within 1e-9, its anchors kept', () => {
    const p = framed();
    commit(p, 1, (o) => insertChain(o, [pt(1000, 1000), pt(3000, 1000), pt(3000, 3000), pt(1000, 3000)], [{ role: 'wall', entity: 'enceinte:1' }], 'mandatory', {
      closed: true,
      knots: [
        { index: 0, role: 'base_knot', ordinal: 0 }, { index: 1, role: 'base_knot', ordinal: 1 }, { index: 2, role: 'base_knot', ordinal: 2 }, { index: 3, role: 'base_knot', ordinal: 3 },
        { index: 1, role: 'anchor', ordinal: 0 }, { index: 2, role: 'anchor', ordinal: 1 },
      ],
    }));
    healthy(p);
    const prof: ChainProfile<number> = { knotRole: 'base_knot', values: [100, 200, 300, 400], interp: 'linear' };
    const ring = { role: 'wall', entity: 'enceinte:1' };
    const before = perVertex(p, prof, ring);
    const c = commit(p, 1, (o) => removeEdges(o, { chain: ring, from: { role: 'anchor', entity: 'enceinte:1', ordinal: 0 }, to: { role: 'anchor', entity: 'enceinte:1', ordinal: 1 } }, [prof]));
    healthy(p);
    const rest = c.value.profiles[0].value as ChainProfile<number>;
    const after = perVertex(p, rest, ring);
    expect(after.size).toBe(4);
    for (const [at, v] of after) expect(Math.abs((v as number) - (before.get(at) as number))).toBeLessThanOrEqual(TOL);
    expect(edgeRows(p, [3000, 1000], [3000, 3000])).toBeNull();
    expect(carrying(p, 'anchor', 'enceinte:1', 0)).toHaveLength(1);
    expect(carrying(p, 'anchor', 'enceinte:1', 1)).toHaveLength(1);
  });

  it('a whole way removed: its width knots go with it (rows on its vertices), the arena as before the way', () => {
    const before = state(framed()).replace(/#v\d+$/, '');
    const { p } = profiledWay();
    expect(carrying(p, 'width_knot', 'way:1', 1)).toHaveLength(1);
    const c = commit(p, 1, (o) => removeEdges(o, { role: 'way', entity: 'way:1' }));
    healthy(p);
    for (const k of [0, 1, 2]) expect(carrying(p, 'width_knot', 'way:1', k)).toHaveLength(0);
    expect(vertexAtPoint(p, 2000, 2000)).toBe(-1);
    expect(state(p).replace(/#v\d+$/, '')).toBe(before);
    expect(c.record?.roles.map((k) => `${k.role}/${k.entity}/${k.ordinal}`)).toContain('way/way:1/0');
  });
});
