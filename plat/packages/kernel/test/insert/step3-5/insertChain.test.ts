// M0-a-05: insertChain(tx, points, roles, cls, opts) → ChainInsert (§3.4; §3.6 steps 1 – 5). `ChainInsert.placed` per
// input point; the knot rows (opts.knots) placed and carried; step 1's W_ATTRACTED folded into the transaction once when
// the chain goes on, none when it is refused (the closing check's N-7, C-0170 (2)); the item's listed test "§13.1: a
// self-touching or self-crossing chain is split into simple runs"; the chain's rows checked; the op atomic — a refusal
// writes nothing (C-0177 (8)), whose inverse is the op's own undo: "remove(insert(x)) ≡ id" in the form this item can
// run (removeEdges' form is M0-a-06's, which runs the listed test once it lands, wave 7); the work limit; and the
// interfaces the item lists, exported through the package index.
import { describe, expect, it } from 'vitest';
import * as kernel from '../../../src/index.js';
import { handleOf, outgoing, roleIdOf, rowElement, rowsOfKey, type Plat } from '../../../src/arena/index.js';
import { INSERT_POINTS } from '../../../src/insert/classes.js';
import { insertChain } from '../../../src/insert/insertChain.js';
import { allProblems, contentPrint, edgeRows, fingerprint, framed, ins, liveVertices, pt, tx, vertexAtPoint } from './support.js';

/** A loop over many insertions: its own hard timeout on the shared machine (never a timing). */
const SLOW = 120_000;

/** The vertices carrying a vertex row's key. */
function carrying(p: Plat, role: string, entity: string, ordinal: number): number[] {
  const h = handleOf(p, entity);
  if (h < 0) return [];
  return rowsOfKey(p, roleIdOf(role), h, ordinal).map((r) => rowElement(p, r));
}

describe('the interfaces M0-a-05 lists, under the design\'s names through @plat/kernel', () => {
  it('insertChain, attractStretch, resolveCrossings, snapRound, rewalk, promote (ChainInsert is a type)', () => {
    for (const name of ['insertChain', 'attractStretch', 'resolveCrossings', 'snapRound', 'rewalk', 'promote', 'splitThrough', 'decimate', 'placePoint', 'attractVertex']) {
      expect(typeof (kernel as Record<string, unknown>)[name]).toBe('function');
    }
  });
});

describe('ChainInsert.placed: per input point, in input order, the vertex it became', () => {
  it('free points, a point attracted onto an existing vertex, a point decimated into its neighbour, a point merged', () => {
    const p = framed();
    ins(tx(p, 1), [[500, 2000], [3500, 2000]], [{ role: 'way', entity: 'way:1' }]);
    const r = ins(tx(p, 2), [[1000, 1000], [1010, 1005], [1700, 1500], [3510, 2010], [3600, 2600]], [{ role: 'kerb', entity: 'way:2' }]);
    expect(r.ok).toBe(true);
    expect(allProblems(p)).toEqual([]);
    if (!r.ok) return;
    const pl = r.value.placed;
    expect(pl).toHaveLength(5);
    expect(pl[1]).toBe(pl[0]); // 11 cm from the first: decimated into it
    expect(pl[3]).toBe(vertexAtPoint(p, 3500, 2000)); // attracted onto the street's end
    expect([p.vertices.x[pl[2]], p.vertices.y[pl[2]]]).toEqual([1700, 1500]);
    for (const v of pl) expect(liveVertices(p)).toContain(v);
  });
});

describe('the knot rows (opts.knots): placed on the vertices their points became, carried by attraction', () => {
  it('a width knot on each end and the middle; one end attracted onto an existing vertex carries its knot there; a deck_end row on another entity', () => {
    const p = framed();
    ins(tx(p, 1), [[500, 2000], [3500, 2000]], [{ role: 'way', entity: 'way:1' }]);
    const r = ins(tx(p, 1), [[2000, 500], [2000, 1200], [2010, 1990]], [{ role: 'way', entity: 'way:2' }], 'mandatory', {
      knots: [
        { index: 0, role: 'width_knot', ordinal: 0 },
        { index: 1, role: 'width_knot', ordinal: 1 },
        { index: 2, role: 'width_knot', ordinal: 2 },
        { index: 2, role: 'deck_end', ordinal: 0, entity: 'bridge:1' },
      ],
    });
    expect(r.ok).toBe(true);
    expect(allProblems(p)).toEqual([]);
    if (!r.ok) return;
    expect(carrying(p, 'width_knot', 'way:2', 0)).toEqual([r.value.placed[0]]);
    expect(carrying(p, 'width_knot', 'way:2', 1)).toEqual([r.value.placed[1]]);
    expect(carrying(p, 'width_knot', 'way:2', 2)).toEqual([r.value.placed[2]]);
    expect(carrying(p, 'deck_end', 'bridge:1', 0)).toEqual([r.value.placed[2]]);
    // The third point landed on the street (a split at its foot, within the hot pixel of y = 2000) and took both rows.
    expect(Math.abs(p.vertices.y[r.value.placed[2]] - 2000)).toBeLessThanOrEqual(0.71);
  });

  it('a knot point that vertex attraction lands on an EXISTING vertex (the street\'s end, not a vertex this op made) carries its knot there (§3.4, §2.2 rule 5)', () => {
    const p = framed();
    ins(tx(p, 1), [[500, 2000], [3500, 2000]], [{ role: 'way', entity: 'way:1' }]);
    const end = vertexAtPoint(p, 3500, 2000);
    expect(end).toBeGreaterThanOrEqual(0);
    const t = tx(p, 1);
    // The third point stands 14.1 cm from the street's end (3500, 2000): step 2 lands it on that vertex.
    const r = ins(t, [[2000, 500], [2600, 1200], [3510, 2010]], [{ role: 'way', entity: 'way:2' }], 'mandatory', {
      knots: [{ index: 2, role: 'width_knot', ordinal: 0 }],
    });
    expect(r.ok).toBe(true);
    expect(allProblems(p)).toEqual([]);
    if (!r.ok) return;
    expect(r.value.placed[2]).toBe(end);
    expect(t.journal.vertices).not.toContain(end); // an existing vertex, not one this op created
    expect(carrying(p, 'width_knot', 'way:2', 0)).toEqual([end]);
  });

  it('two pinned knot points 10 cm apart merge at the first, which carries both ordinals (a step)', () => {
    const p = framed();
    const r = ins(tx(p, 1), [[1000, 1000], [1000, 1010], [2000, 1000]], [{ role: 'way', entity: 'way:k' }], 'mandatory', {
      knots: [{ index: 0, role: 'width_knot', ordinal: 0 }, { index: 1, role: 'width_knot', ordinal: 1 }, { index: 2, role: 'width_knot', ordinal: 2 }],
    });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const v = r.value.placed[0];
    expect(r.value.placed[1]).toBe(v);
    expect(carrying(p, 'width_knot', 'way:k', 0)).toEqual([v]);
    expect(carrying(p, 'width_knot', 'way:k', 1)).toEqual([v]);
  });
});

describe('step 1\'s W_ATTRACTED goes into the transaction once when the chain goes on; a refused chain reports none (N-7)', () => {
  it('a merge of two exempt points: W_ATTRACTED count 1 in tx.warnings and in the result', () => {
    const p = framed();
    const t = tx(p, 1);
    const r = ins(t, [[1000, 1000], [1000, 1010], [2000, 1000]], [{ role: 'way', entity: 'way:k' }], 'mandatory', { pinned: [0, 1] });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(t.warnings).toEqual([{ code: 'W_ATTRACTED', count: 1, at: { x: 1000, y: 1000 } }]);
    expect(r.warnings).toEqual([{ code: 'W_ATTRACTED', count: 1, at: { x: 1000, y: 1000 } }]);
  });

  it('the same merge in a chain refused later (an optional chain\'s acute corner): the transaction\'s warnings as they were', () => {
    const p = framed();
    ins(tx(p, 1), [[500, 2000], [1000, 2000], [3500, 2000]], [{ role: 'way', entity: 'way:1' }]);
    const t = tx(p, 2);
    t.warnings.push({ code: 'W_PLACED', count: 2 });
    const before = contentPrint(p);
    const r = ins(t, [[600, 1000], [600, 1010], [1000, 2000], [1600, 2031]], [{ role: 'kerb', entity: 'way:o' }], 'optional', { pinned: [0, 1] });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe('E_BELOW_MIN_ANGLE');
    expect(t.warnings).toEqual([{ code: 'W_PLACED', count: 2 }]);
    expect(contentPrint(p)).toBe(before);
  });

  it('a refusal in step 1 itself (the class code) leaves the transaction\'s warnings and the arena as they were', () => {
    const p = framed();
    const t = tx(p, 1);
    const before = fingerprint(p);
    const r = ins(t, [[1000, 1000], [1000, 1010]], [{ role: 'way', entity: 'way:k' }], 'optional', { pinned: [0, 1] });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe('E_BELOW_MIN_EDGE');
    expect(t.warnings).toEqual([]);
    expect(fingerprint(p)).toBe(before);
  });
});

describe('§13.1: a self-touching or self-crossing chain is split into simple runs', () => {
  it('a figure eight: inserted run by run, its crossing a vertex the runs share, every edge carrying the chain\'s row, the arena valid', () => {
    const p = framed();
    const r = ins(tx(p, 1), [[1000, 1000], [3000, 3000], [3000, 1000], [1000, 3000]], [{ role: 'way', entity: 'way:8' }], 'mandatory', { closed: true });
    expect(r.ok).toBe(true);
    expect(allProblems(p)).toEqual([]);
    const c = vertexAtPoint(p, 2000, 2000);
    expect(c).toBeGreaterThanOrEqual(0);
    expect(outgoing(p, c)).toHaveLength(4);
    for (const h of outgoing(p, c)) expect(edgeRows(p, [2000, 2000], [p.vertices.x[p.halfEdges.origin[h ^ 1]], p.vertices.y[p.halfEdges.origin[h ^ 1]]])).toEqual(['way/way:8']);
  });

  it('a chain that touches itself at a vertex (passes through its own earlier point): one vertex there, valid', () => {
    const p = framed();
    const r = ins(tx(p, 1), [[1000, 1000], [2000, 1000], [2000, 2000], [1500, 1000], [1500, 500]], [{ role: 'way', entity: 'way:t' }]);
    expect(r.ok).toBe(true);
    expect(allProblems(p)).toEqual([]);
    expect(outgoing(p, vertexAtPoint(p, 1500, 1000))).toHaveLength(4);
  });

  it('a chain doubling back near itself attracts onto itself (its earlier part is existing geometry)', () => {
    const p = framed();
    const r = ins(tx(p, 1), [[1000, 1000], [3000, 1000], [3000, 1200], [1000, 1015]], [{ role: 'way', entity: 'way:d' }]);
    expect(r.ok).toBe(true);
    expect(allProblems(p)).toEqual([]);
    if (r.ok) expect(r.value.placed[3]).toBe(r.value.placed[0]);
  });
});

describe('the chain\'s rows and knots are checked (programming errors throw)', () => {
  it('a vertex role among the edge rows, an unknown role, an indexed row without its ordinal, a knot on an edge role', () => {
    const p = framed();
    const t = tx(p, 1);
    expect(() => insertChain(t, [pt(1000, 1000), pt(2000, 1000)], [{ role: 'junction', entity: 'j:1' }], 'mandatory')).toThrow(/vertex role/);
    expect(() => insertChain(t, [pt(1000, 1000), pt(2000, 1000)], [{ role: 'nonsense', entity: 'j:1' }], 'mandatory')).toThrow(/no role/);
    expect(() => insertChain(t, [pt(1000, 1000), pt(2000, 1000)], [{ role: 'gate_opening', entity: 'b:1' }], 'mandatory')).toThrow(/ordinal/);
    expect(() => insertChain(t, [pt(1000, 1000), pt(2000, 1000)], [{ role: 'way', entity: 'w:1' }], 'mandatory', { knots: [{ index: 0, role: 'way', ordinal: 0 }] })).toThrow(/vertex role/);
    expect(() => insertChain(t, [pt(1000, 1000), pt(2000, 1000)], [], 'mandatory', { knots: [{ index: 0, role: 'width_knot', ordinal: 0 }] })).toThrow(/entity/);
  });
});

describe('the op is atomic: a refusal writes nothing (C-0177 (8))', () => {
  it('E_WORK_LIMIT at every point of a long chain\'s insertion: each refusal leaves the content as it was and the arena valid', () => {
    const p0 = framed();
    for (let i = 0; i < 4; i++) ins(tx(p0, 1), [[300 + i * 900, 100], [400 + i * 900, 3900]], [{ role: 'way', entity: `way:v${i}` }]);
    const full = tx(p0, 2);
    const chain: [number, number][] = [[100, 300], [3900, 900], [200, 1800], [3800, 3500]];
    const ok = ins(full, chain, [{ role: 'kerb', entity: 'way:z' }]);
    expect(ok.ok).toBe(true);
    const total = full.work.total;
    let refused = 0;
    for (let limit = chain.length; limit < total; limit += Math.max(1, Math.floor(total / 40))) {
      const p = framed();
      for (let i = 0; i < 4; i++) ins(tx(p, 1), [[300 + i * 900, 100], [400 + i * 900, 3900]], [{ role: 'way', entity: `way:v${i}` }]);
      const before = contentPrint(p);
      const t = tx(p, 2, limit);
      const r = ins(t, chain, [{ role: 'kerb', entity: 'way:z' }]);
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.code).toBe('E_WORK_LIMIT');
      expect(contentPrint(p)).toBe(before);
      expect(allProblems(p)).toEqual([]);
      expect(t.warnings).toEqual([]);
      refused += 1;
    }
    expect(refused).toBeGreaterThan(20);
  }, SLOW);

  it('a work limit below the points: refused in step 1, the arena byte for byte as it was', () => {
    const p = framed();
    const before = fingerprint(p);
    const t = tx(p, 1, 1);
    const r = ins(t, [[1000, 1000], [2000, 1000]], [{ role: 'way', entity: 'way:w' }]);
    expect(r.ok).toBe(false);
    if (!r.ok) expect([r.code, r.detail]).toEqual(['E_WORK_LIMIT', INSERT_POINTS]);
    expect(fingerprint(p)).toBe(before);
  });

  it('remove(insert(x)) ≡ id on the topology, in the form the op runs itself: a chain refused at its last check after writing every edge leaves the content as it was (removeEdges\' form: M0-a-06, wave 7)', () => {
    const p = framed();
    ins(tx(p, 1), [[500, 2000], [1000, 2000], [3500, 2000]], [{ role: 'way', entity: 'way:1' }]);
    for (let i = 0; i < 3; i++) ins(tx(p, 1), [[1200 + i * 700, 300], [1250 + i * 700, 3700]], [{ role: 'way', entity: `way:c${i}` }]);
    const before = contentPrint(p);
    // A long optional chain crossing everything, whose last segment leaves the street's vertex at 3°.
    const r = ins(tx(p, 2), [[200, 3500], [3800, 2600], [300, 900], [1000, 2000], [1600, 2031]], [{ role: 'kerb', entity: 'way:r' }], 'optional');
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe('E_BELOW_MIN_ANGLE');
    expect(contentPrint(p)).toBe(before);
    expect(allProblems(p)).toEqual([]);
  });
});

describe('insert + snap + attract + re-walk per growth proposal: the timing bar\'s workload (CONTENDED, informative; the bar is measured by M0-t-01)', () => {
  it('prints a contended figure over 2 000 two-point proposals into a street grid', () => {
    const p = framed(20_000);
    for (let i = 1; i < 10; i++) ins(tx(p, 1), [[i * 2000, 50], [i * 2000 + 37, 19_950]], [{ role: 'way', entity: `way:v${i}` }]);
    for (let i = 1; i < 10; i++) ins(tx(p, 1), [[50, i * 2000], [19_950, i * 2000 + 29]], [{ role: 'way', entity: `way:h${i}` }]);
    let x = 12_345;
    const rnd = (): number => {
      x = (Math.imul(x, 48_271) % 2_147_483_647 + 2_147_483_647) % 2_147_483_647;
      return x / 2_147_483_647;
    };
    let ok = 0;
    const t0 = performance.now();
    for (let k = 0; k < 2000; k++) {
      const ax = 200 + rnd() * 19_600;
      const ay = 200 + rnd() * 19_600;
      const r = ins(tx(p, 2), [[Math.round(ax), Math.round(ay)], [Math.round(ax + (rnd() - 0.5) * 1500), Math.round(ay + (rnd() - 0.5) * 1500)]], [{ role: 'kerb', entity: `way:g${k}` }], 'optional');
      if (r.ok) ok += 1;
    }
    const us = ((performance.now() - t0) * 1000) / 2000;
    console.log(`CONTENDED (informative, never a gate; §12.1): ${us.toFixed(1)} µs per proposal over 2 000 (${ok} committed) under vitest's transform`);
    expect(ok).toBeGreaterThan(100);
  }, SLOW);
});
