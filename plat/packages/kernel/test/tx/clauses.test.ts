// M0-a-06 (fix round 1, checks/M0-a-06.md F-3 and F-4): the design clauses the item names that its first tests left
// unheld, each with a test a targeted mutant of it turns red —
// * §2.2 rule 3 (b)'s pin: "a vertex from which the batch strips its last vertex role row other than knot rows loses its
//   kernel pinned flag" — a knot-only strip keeps it; the last non-knot row stripped releases it; and the dissolution
//   rule's "no pin" and "no vertex role";
// * §3.4 retypeEdges: "an added row coarser than an edge of the ref is E_LEVEL";
// * §3.4 *Stretches*: an end finer than the chain "is first promoted to the chain's level (W_PROMOTED, listed in the
//   commit record; its split flag cleared)";
// * §3.10's level-consistency row checked at commit on every batch (an injected fault: a writer that leaves an edge's
//   birth level off its rows');
// * C-0185 (5): a batch fails when its total *exceeds* the limit — a removal at exactly its measured work commits;
// * §3.3 *Expectations*' area floor in cm² against `area2`'s doubled area;
// * §2.2 rule 5's join: a knot at the join dropped "within 10⁻⁹ cm", and the knots concatenated "in chain order" where
//   the moved part enters the join vertex;
// * C-0185 (17)'s record order: roles by rule 7's rank, removed faces by the key their record had.
// The pin is set as `pinVertices` (M0-a-07's writer, its only one) sets it: the flag bit on the vertex.
import { describe, expect, it } from 'vitest';
import { faceKey, rowsOn, roleIdOf, roleInfo, VERTEX_PINNED, VERTEX_SPLIT, type Plat } from '../../src/arena/index.js';
import { insertChain, splitThrough } from '../../src/insert/index.js';
import { joinProfiles, opRemoveEdges, removeEdges, renumberKnots, retypeEdges, setOwner, tx, type KnotLine, type TxEnv } from '../../src/tx/index.js';
import type { ChainProfile, Invariant, LatticePoint } from '../../src/types/index.js';
import { between, carrying, commit, declared, degreeAt, framed, healthy, lin, must, pt, spec, state, vertexAtPoint } from './support.js';

const pinned = (p: Plat, v: number): boolean => (p.vertices.flags[v] & VERTEX_PINNED) !== 0;
const pin = (p: Plat, v: number): void => {
  p.vertices.flags[v] |= VERTEX_PINNED;
};

/** A spine way:1 along y = 2000 across the frame. */
function spined(): Plat {
  const p = framed();
  commit(p, 1, (o) => insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
  return p;
}

describe('§2.2 rule 3 (b): the pin is released only with the last vertex role row other than knot rows', () => {
  /** A way whose middle vertex (2000, 2100) carries width knot 1 and, optionally, an anchor contact name. */
  function knotted(withAnchor: boolean): { p: Plat; v: number } {
    const p = framed();
    commit(p, 1, (o) => insertChain(o, [pt(0, 2000), pt(2000, 2100), pt(4000, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory', {
      knots: [
        { index: 0, role: 'width_knot', ordinal: 0 }, { index: 1, role: 'width_knot', ordinal: 1 }, { index: 2, role: 'width_knot', ordinal: 2 },
        ...(withAnchor ? [{ index: 1, role: 'anchor', ordinal: 0, entity: 'district:1' }] : []),
      ],
    }));
    const v = vertexAtPoint(p, 2000, 2100);
    pin(p, v);
    return { p, v };
  }

  it('a pinned vertex carrying only knot rows: one knot row stripped by its VertexRef — the pin kept, nothing unflagged', () => {
    const { p, v } = knotted(false);
    const c = commit(p, 1, (o) => removeEdges(o, { role: 'width_knot', entity: 'way:1', ordinal: 1 }));
    healthy(p);
    expect(carrying(p, 'width_knot', 'way:1', 1)).toEqual([]);
    expect(pinned(p, v)).toBe(true);
    expect(c.record?.unflagged).not.toContain(v);
  });

  it('the last non-knot row (an anchor) stripped with a knot row left: the pin released, the vertex listed in unflagged', () => {
    const { p, v } = knotted(true);
    const c = commit(p, 1, (o) => removeEdges(o, { role: 'anchor', entity: 'district:1', ordinal: 0 }));
    healthy(p);
    expect(carrying(p, 'width_knot', 'way:1', 1)).toEqual([v]);
    expect(pinned(p, v)).toBe(false);
    expect(c.record?.unflagged).toContain(v);
  });

  it('a knot row stripped while a non-knot row stays: the pin kept', () => {
    const { p, v } = knotted(true);
    commit(p, 1, (o) => removeEdges(o, { role: 'width_knot', entity: 'way:1', ordinal: 1 }));
    expect(pinned(p, v)).toBe(true);
  });
});

describe('§2.2 rule 3 *Dissolution*: no vertex role and no pin', () => {
  it('a pinned split vertex whose lane is removed is not dissolved (degree 2, identical rows, one level: kept for its pin)', () => {
    const p = spined();
    commit(p, 1, (o) => insertChain(o, [pt(2000, 2000), pt(2000, 4000)], [{ role: 'way', entity: 'way:2' }], 'mandatory'));
    const j = vertexAtPoint(p, 2000, 2000);
    expect(p.vertices.flags[j] & VERTEX_SPLIT).toBe(VERTEX_SPLIT);
    pin(p, j);
    commit(p, 1, (o) => removeEdges(o, { role: 'way', entity: 'way:2' }));
    healthy(p);
    expect(vertexAtPoint(p, 2000, 2000)).toBe(j);
    expect(degreeAt(p, 2000, 2000)).toBe(2);
    expect(pinned(p, j)).toBe(true);
  });

  it('a split vertex carrying a vertex role row, left at degree 2 with identical rows, is not dissolved', () => {
    const p = spined();
    commit(p, 1, (o) => insertChain(o, [pt(2000, 2000), pt(2000, 4000)], [{ role: 'way', entity: 'way:2' }], 'mandatory'));
    // A contact name placed on the junction (splitThrough landing on the existing vertex adds its row).
    commit(p, 1, (o) => splitThrough(o, between(p, [0, 2000], [2000, 2000]), pt(2000, 2000), { role: 'anchor', entity: 'district:1' }));
    const j = vertexAtPoint(p, 2000, 2000);
    expect(carrying(p, 'anchor', 'district:1', 0)).toEqual([j]);
    commit(p, 1, (o) => removeEdges(o, { role: 'way', entity: 'way:2' }));
    healthy(p);
    expect(vertexAtPoint(p, 2000, 2000)).toBe(j);
    expect(degreeAt(p, 2000, 2000)).toBe(2);
    expect(carrying(p, 'anchor', 'district:1', 0)).toEqual([j]);
  });
});

describe('C-0189: a batch whose only write is a contact name on an existing vertex commits it', () => {
  it('splitThrough landing on an edge\'s endpoint adds its row: the version advances, the record lists the key', () => {
    const p = spined();
    commit(p, 1, (o) => insertChain(o, [pt(2000, 2000), pt(2000, 4000)], [{ role: 'way', entity: 'way:2' }], 'mandatory'));
    const v0 = p.version;
    const c = commit(p, 1, (o) => splitThrough(o, between(p, [0, 2000], [2000, 2000]), pt(2000, 2000), { role: 'anchor', entity: 'district:1' }));
    expect(c.record).not.toBeNull();
    expect(p.version).toBe(v0 + 1);
    expect(c.record?.roles.map((k) => `${k.role}/${k.entity}/${k.ordinal}`)).toEqual(['anchor/district:1/0']);
    expect(carrying(p, 'anchor', 'district:1', 0)).toEqual([vertexAtPoint(p, 2000, 2000)]);
    healthy(p);
  });
});

describe('§3.4 retypeEdges: an added row coarser than an edge of the ref is E_LEVEL', () => {
  it('an L1 batch adding a way row to an L2 kerb: E_LEVEL, the arena unchanged', () => {
    const p = framed();
    commit(p, 2, (o) => insertChain(o, [pt(500, 500), pt(1500, 500)], [{ role: 'kerb', entity: 'k:1' }], 'mandatory'));
    const before = state(p);
    const r = tx(p, spec(1), (o) => retypeEdges(o, { role: 'kerb', entity: 'k:1' }, [{ role: 'way', entity: 'way:1' }], []));
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe('E_LEVEL');
    expect(state(p)).toBe(before);
  });

  it('the same row added by an L2 batch (its own level) commits', () => {
    const p = framed();
    commit(p, 2, (o) => insertChain(o, [pt(500, 500), pt(1500, 500)], [{ role: 'kerb', entity: 'k:1' }], 'mandatory'));
    const r = tx(p, spec(2), (o) => retypeEdges(o, { role: 'kerb', entity: 'k:1' }, [{ role: 'band', entity: 'b:1' }], []));
    expect(r.ok).toBe(true);
    healthy(p);
  });
});

describe('§3.4 *Stretches*: a stretch end finer than the chain is first promoted (W_PROMOTED, listed, its split flag cleared)', () => {
  it('an L2 Steiner vertex on way:1 as a rekeyed stretch\'s end: promoted to L1, listed, unflagged', () => {
    const p = framed();
    commit(p, 1, (o) => insertChain(o, [pt(0, 2000), pt(1000, 2000), pt(3000, 2100), pt(4000, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
    commit(p, 2, (o) => insertChain(o, [pt(2000, 2050), pt(2000, 3500)], [{ role: 'kerb', entity: 'k:1' }], 'mandatory'));
    const s = vertexAtPoint(p, 2000, 2050);
    expect(p.vertices.level[s]).toBe(2);
    expect(p.vertices.flags[s] & VERTEX_SPLIT).toBe(VERTEX_SPLIT);
    const c = commit(p, 1, (o) => retypeEdges(o, { chain: { role: 'way', entity: 'way:1' }, from: pt(2000, 2050), to: pt(4000, 2000) }, [], [], { from: 'way:1', to: 'way:2' }));
    healthy(p);
    expect(p.vertices.level[s]).toBe(1);
    expect(p.vertices.flags[s] & VERTEX_SPLIT).toBe(0);
    expect(c.record?.warnings.map((w) => w.code)).toContain('W_PROMOTED');
    expect(c.record?.promoted).toContain(s);
    expect(c.record?.unflagged).toContain(s);
  });
});

describe('§3.4 *Stretches*: the promoted end loses its split flag even where the run it split survives the batch', () => {
  it('a retype stripping a finer row from a stretch whose end is an L2 Steiner vertex: promoted, unflagged, the way unchanged', () => {
    const p = spined();
    commit(p, 2, (o) => {
      must(insertChain(o, [pt(2000, 2000), pt(2000, 3000)], [{ role: 'kerb', entity: 'k:1' }], 'mandatory'));
      return insertChain(o, [pt(2000, 2000), pt(4000, 2000)], [{ role: 'kerb', entity: 'k:2' }], 'mandatory');
    });
    const s = vertexAtPoint(p, 2000, 2000);
    expect(p.vertices.level[s]).toBe(2);
    expect(p.vertices.flags[s] & VERTEX_SPLIT).toBe(VERTEX_SPLIT);
    const c = commit(p, 1, (o) => retypeEdges(o, { chain: { role: 'way', entity: 'way:1' }, from: pt(2000, 2000), to: pt(4000, 2000) }, [], ['kerb']));
    healthy(p);
    // way:1's rows match on both sides of s (its run survives whole), but the stretch end was promoted: its flag cleared.
    expect(p.vertices.level[s]).toBe(1);
    expect(p.vertices.flags[s] & VERTEX_SPLIT).toBe(0);
    expect(c.record?.promoted).toContain(s);
    expect(c.record?.unflagged).toContain(s);
  });
});

describe('§3.10 level consistency, checked at commit on every batch', () => {
  it('a writer that leaves an edge\'s birth level off the lowest of its rows (an injected fault): E_INVARIANT, nothing committed', () => {
    const p = framed();
    const before = state(p);
    const r = tx(p, spec(1), (o) => {
      must(insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
      // The fault: the way's row re-levelled to L2 on its L1 edge, as no writer may leave it.
      const h = between(o.plat, [0, 2000], [4000, 2000]);
      for (const row of rowsOn(o.plat, 'edge', h)) o.plat.roles.level[row] = 2;
      return { ok: true as const, value: null, warnings: [] };
    });
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.code).toBe('E_INVARIANT');
      expect(r.detail).toMatch(/birth level/);
    }
    expect(state(p)).toBe(before);
  });
});

describe('C-0185 (5): a batch fails when its total exceeds the limit — a removal at exactly its measured work commits', () => {
  it('removeEdges (this item\'s writers\' tx.facesWalked) at its measured work commits; one less is E_WORK_LIMIT', () => {
    const setup = (): Plat => {
      const p = spined();
      commit(p, 1, (o) => insertChain(o, [pt(2000, 2000), pt(2000, 4000)], [{ role: 'way', entity: 'way:2' }], 'mandatory'));
      return p;
    };
    const ops = [opRemoveEdges(lin(3), 0, { role: 'way', entity: 'way:2' })];
    const probe = setup();
    const r0 = declared(probe, 1, ops);
    const work = r0.ok ? (r0.value.record?.work as number) : -1;
    expect(work).toBeGreaterThan(0);
    const at = setup();
    const r1 = declared(at, 1, ops, { workLimit: work });
    expect(r1.ok).toBe(true);
    healthy(at);
    const under = setup();
    const before = state(under);
    const r2 = declared(under, 1, ops, { workLimit: work - 1 });
    expect(!r2.ok && r2.code).toBe('E_WORK_LIMIT');
    expect(state(under)).toBe(before);
  });
});

describe('§3.3 *Expectations*: the area floor is in cm², the measure `area2` doubled', () => {
  const FLOOR: Invariant = { name: 'block floor', scope: 'batch', class: 'hard', kind: 'classFloor', faceClass: 'block' };
  /** A 4000 × 50 cm sliver (200 000 cm²) cut off the frame's top under an area floor. */
  const sliver = (minAreaCm2: number) => {
    const p = framed();
    const env: TxEnv = { floors: (c) => (c === 'block' ? { minAreaCm2 } : undefined) };
    return tx(p, spec(1, { onFail: 'reject', expect: [FLOOR] }), (o) => insertChain(o, [pt(0, 3950), pt(4000, 3950)], [{ role: 'district_bound', entity: 'district:7' }], 'mandatory'), env);
  };
  it('a floor between the sliver\'s area and twice it (300 000 cm²) refuses it; one below its area (150 000 cm²) passes', () => {
    const r = sliver(300_000);
    expect(!r.ok && r.code).toBe('E_BELOW_MIN_AREA');
    expect(sliver(150_000).ok).toBe(true);
    expect(sliver(200_000).ok).toBe(true); // exactly at the floor: not below it
  });
});

describe('§2.2 rule 5: a join drops a knot within 10⁻⁹ cm and concatenates the knots in chain order', () => {
  it('cut knots that differ by less than 1e-9 cm, not bit for bit: the join knot drops', () => {
    const a: KnotLine<number> = { interp: 'linear', closed: false, length: 150, knots: [{ pos: 100, value: 10, ordinal: 0 }, { pos: 150, value: 20, ordinal: 1 }] };
    // The interpolation across the join from (100, 10) to (200, 30 + 1e-9) is 20 + 5e-10 at 150: within the tolerance.
    const b: KnotLine<number> = { interp: 'linear', closed: false, length: 150, knots: [{ pos: 0, value: 20, ordinal: 0 }, { pos: 50, value: 30 + 1e-9, ordinal: 1 }] };
    expect(renumberKnots(joinProfiles(a, b).knots).values).toEqual([10, 30 + 1e-9]);
    // 4e-9 off: kept.
    const c: KnotLine<number> = { ...b, knots: [{ pos: 0, value: 20, ordinal: 0 }, { pos: 50, value: 30 + 8e-9, ordinal: 1 }] };
    expect(renumberKnots(joinProfiles(a, c).knots).values).toEqual([10, 20, 30 + 8e-9]);
  });

  it('a join where the moved part enters the join vertex: its knot there comes first (two values stay as a step)', () => {
    const p = framed();
    const pts: LatticePoint[] = [pt(0, 2000), pt(1000, 2200), pt(2000, 2000), pt(3000, 2200), pt(4000, 2000)];
    commit(p, 1, (o) => insertChain(o, pts, [{ role: 'way', entity: 'way:1' }], 'mandatory', {
      knots: [{ index: 0, role: 'width_knot', ordinal: 0 }, { index: 2, role: 'width_knot', ordinal: 1 }, { index: 4, role: 'width_knot', ordinal: 2 }],
    }));
    const prof: ChainProfile<number> = { knotRole: 'width_knot', values: [400, 800, 600], interp: 'linear' };
    // The near part (x 0 … 2000, cut at the knot vertex) handed to way:9: way:9 [400, 800], way:1's rest [800, 600].
    const split = commit(p, 1, (o) => retypeEdges(o, { chain: { role: 'way', entity: 'way:1' }, from: pt(0, 2000), to: pt(2000, 2000) }, [], [], {
      from: 'way:1', to: 'way:9', profiles: [{ from: prof }],
    }));
    const rest = split.value.profiles[0].from as ChainProfile<number>;
    const near = split.value.profiles[0].to as ChainProfile<number>;
    expect(near.values).toEqual([400, 800]);
    expect(rest.values).toEqual([800, 600]);
    // way:9 re-written with 850 at the join vertex, then joined back: chain order runs from x = 0, so way:9 (the moved
    // part) enters (2000, 2000) and its knot there comes before way:1's.
    const near2: ChainProfile<number> = { ...near, values: [400, 850] };
    const join = commit(p, 1, (o) => retypeEdges(o, { role: 'way', entity: 'way:9' }, [], [], { from: 'way:9', to: 'way:1', profiles: [{ from: near2, to: rest }] }));
    healthy(p);
    expect((join.value.profiles[0].to as ChainProfile<number>).values).toEqual([400, 850, 800, 600]);
    const j = vertexAtPoint(p, 2000, 2000);
    expect(carrying(p, 'width_knot', 'way:1', 1)).toEqual([j]);
    expect(carrying(p, 'width_knot', 'way:1', 2)).toEqual([j]);
  });
});

describe('C-0185 (17): the record\'s order', () => {
  it('roles by rule 7\'s rank (not by issue order or entity), removed faces by the key their record had', () => {
    const p = framed();
    const roles = ['way', 'district_bound'].sort((x, y) => roleInfo(roleIdOf(y)).rank - roleInfo(roleIdOf(x)).rank); // highest rank first
    const c = commit(p, 1, (o) => {
      must(insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: roles[0], entity: 'a:1' }], 'mandatory'));
      return insertChain(o, [pt(2000, 0), pt(2000, 4000)], [{ role: roles[1], entity: 'z:1' }], 'mandatory');
    });
    expect(c.record?.roles.map((k) => k.role).filter((r) => roles.includes(r))).toEqual([roles[1], roles[0]]);
    // Four L1 faces; removing the vertical chain merges them in pairs. The two records freed are listed by their old keys.
    const keyOf = new Map<number, string>();
    for (let f = 0; f < p.slots.face[1].top; f++) {
      if (p.faces[1].kind[f] === 0xffff) continue;
      const k = faceKey(p, 1, f);
      keyOf.set(f, `${p.vertices.y[k[0]]},${p.vertices.x[k[0]]}`);
    }
    commit(p, 1, (o) => setOwner(o, [...keyOf.keys()], 'block:1'));
    const r = commit(p, 1, (o) => removeEdges(o, { role: roles[1], entity: 'z:1' }));
    const removed = r.record?.faces.find((d) => d.level === 1)?.removed ?? [];
    expect(removed).toHaveLength(2);
    const ks = removed.map((f) => keyOf.get(f) as string);
    const cmp = (x: string, y: string): number => {
      const [ay, ax] = x.split(',').map(Number);
      const [by, bx] = y.split(',').map(Number);
      return ay - by || ax - bx;
    };
    expect(ks).toEqual([...ks].sort(cmp));
    expect(cmp(ks[0], ks[1])).toBeLessThan(0);
  });
});
