// M0-a-04: splitThrough(tx, at, p, row?) (§3.4; §2.2 rule 3's Steiner vertices and the split flag; §3.3 rule 2's
// allocation rule; §3.3 "No item changes in place"). The item's listed test "the anchor ordinal allocation: two contact
// names on one entity, ops permuted — identical ordinals (§13.1's permuted-ops fixture, run at M0-a-06)" is here in
// its M0-a-04 form: the allocation read at the op, so one canonical op order gives one set of ordinals whatever the
// issue order and the slots; the declared form that sorts the ops is M0-a-06's (C-0169 (5)). The split at a table's
// doubling is growth.test.ts's, its own-ends clearance (C-0284) placement.test.ts's, a closed transaction closed.test.ts's.
import { describe, expect, it } from 'vitest';
import { faceWalk, handleOf, outgoing, roleIdOf, rowKey, rowsOn, VERTEX_SPLIT, VERTEX_STEINER, type Plat, type VertexId } from '../../../src/arena/index.js';
import { beginIndexBatch, checkIndexBatch, endIndexBatch, routeRun } from '../../../src/index/index.js';
import { INSERT_POINTS, insertTx, type InsertTx } from '../../../src/insert/classes.js';
import { addressKind, allocateAnchor, carriesRow, firstAnchorOrdinal, footOnSegment, nearerVertex, splitThrough } from '../../../src/insert/splitThrough.js';
import { footOnSegment as stretchFoot, nearerVertex as stretchNearer } from '../../../src/insert/stretch.js';
import type { Level } from '../../../src/types/index.js';
import { dressQuarters, edgeNear, fingerprint, generator, indexed, intIn, liveVertices, permutation, pos, problems, pt, QUARTERS, rowsText, SLANT, type ArenaSpec } from './support.js';

/** Runs a writer inside an index batch log of `level` and checks §3.10's freshness row on it (M0-a-03's check). */
function logged(p: Plat, t: InsertTx, fn: () => void): string[] {
  const log = beginIndexBatch(p, t.level);
  try {
    fn();
  } finally {
    endIndexBatch(p);
  }
  return checkIndexBatch(p, log, { promoted: [], demoted: { vertices: [], edges: [] }, changed: t.journal.changed });
}

/** The vertices of the level-l rings of every face record at level l that hold vertex v. */
function facesHolding(p: Plat, v: VertexId, l: Level): number {
  let n = 0;
  for (let f = 0; f < p.slots.face[l].top; f++) {
    if (p.faces[l].kind[f] === 0xffff) continue;
    if (faceWalk(p, l, f).some((ring) => ring.some((h) => p.halfEdges.origin[h] === v))) n++;
  }
  return n;
}

describe('the split (§2.2 rule 3, §3.3)', () => {
  it('an L2 batch on an L1 edge: a Steiner vertex, the edge’s rows on both parts, its L2 faces re-indexed, the run’s handle kept', () => {
    const b = dressQuarters(indexed(QUARTERS));
    const p = b.plat;
    const t = insertTx(p, 2);
    const handle = routeRun(p, b.he[11]).halfEdges[0] >> 1;
    const rows = rowsText(p, b.he[11]);
    let v = -1;
    expect(logged(p, t, () => {
      const r = splitThrough(t, b.he[11], pt(510, 300));
      expect(r.ok).toBe(true);
      if (r.ok) v = r.value;
    })).toEqual([]);
    expect(pos(p, v)).toEqual([500, 300]);
    expect(p.vertices.level[v]).toBe(2);
    expect(p.vertices.flags[v]).toBe(VERTEX_STEINER | VERTEX_SPLIT);
    const parts = outgoing(p, v);
    expect(parts).toHaveLength(2);
    for (const h of parts) {
      expect(p.halfEdges.level[h >> 1]).toBe(1);
      expect(rowsText(p, h)).toEqual(rows);
    }
    expect(routeRun(p, b.he[11]).halfEdges[0] >> 1).toBe(handle); // a finer split never moves a run's handle
    expect(facesHolding(p, v, 2)).toBe(2);
    expect(t.journal).toMatchObject({ vertices: [v], steiner: 1 });
    // two L2 face records re-indexed; no L1 item (an L2 batch writes no coarser index, §3.10)
    expect(t.journal.changed.map((c) => [c.item.kind, c.item.level])).toEqual([[2, 2], [2, 2]]);
    expect(problems(p)).toEqual([]);
  });

  it('an L1 batch on an L1 edge: a same-level split foot (split flag only), the run cut in two items', () => {
    const b = dressQuarters(indexed(QUARTERS));
    const p = b.plat;
    const t = insertTx(p, 1);
    let v = -1;
    expect(logged(p, t, () => {
      const r = splitThrough(t, b.he[11], pt(490, 300));
      if (r.ok) v = r.value;
    })).toEqual([]);
    expect(pos(p, v)).toEqual([500, 300]);
    expect(p.vertices.flags[v]).toBe(VERTEX_SPLIT);
    expect(p.vertices.level[v]).toBe(1);
    expect(t.journal.steiner).toBe(0);
    // the old run's item changed (its handle kept at its lower end) and a new item for the run above the vertex
    expect(t.journal.changed[0]).toMatchObject({ item: { kind: 1, level: 1 }, successor: { kind: 1, level: 1 } });
    expect(problems(p)).toEqual([]);
  });

  it('a same-level split below the run’s lower end: the old handle is no handle any more — deleted, both new ones added', () => {
    // An L1 run from L = (1 000, 499) through an L2 vertex S = (950, 499) to U = (0, 500); the split at (900, 499)
    // stands below L in (y, x), so the lower run's handle leaves the new vertex and the old handle pair L → S is none.
    const spec: ArenaSpec = {
      vertices: [[-5000, -5000, 0], [5000, -5000, 0], [5000, 5000, 0], [-5000, 5000, 0], [0, 500, 1], [950, 499, 2], [1000, 499, 1], [950, 200, 2]],
      edges: [[0, 1, 0], [1, 2, 0], [2, 3, 0], [3, 0, 0], [4, 5, 1], [5, 6, 1], [5, 7, 2]],
    };
    const b = indexed(spec);
    expect(problems(b.plat)).toEqual([]);
    const t = insertTx(b.plat, 1);
    let v = -1;
    expect(logged(b.plat, t, () => {
      const r = splitThrough(t, b.he[4], pt(900, 480));
      if (r.ok) v = r.value;
    })).toEqual([]);
    expect(pos(b.plat, v)).toEqual([900, 499]);
    expect(t.journal.changed.filter((c) => c.item.kind === 1)).toEqual([expect.objectContaining({ item: { kind: 1, level: 1, slot: b.he[5] >> 1 }, successor: null })]);
    expect(problems(b.plat)).toEqual([]);
  });

  it('an antenna split near its tip: the walk turns round at the tip on the new pair', () => {
    const b = dressQuarters(indexed(QUARTERS));
    const t = insertTx(b.plat, 2);
    const r = splitThrough(t, b.he[18], pt(760, 100)); // the L2 antenna (750, 0) → (750, 200)
    expect(r.ok && pos(b.plat, r.value)).toEqual([750, 100]);
    expect(problems(b.plat)).toEqual([]);
    if (r.ok) expect(facesHolding(b.plat, r.value, 2)).toBe(1); // one face, the antenna's both sides in its ring
  });

  it('an L3 batch on an L0 edge, and the split under every allocation order: one answer, read on positions', () => {
    const answers = new Set<string>();
    for (let seed = 1; seed <= 6; seed++) {
      const b = dressQuarters(indexed(QUARTERS, { vertices: permutation(QUARTERS.vertices.length, seed), edges: permutation(QUARTERS.edges.length, seed + 4) }));
      const t = insertTx(b.plat, 3);
      const r = splitThrough(t, b.he[4], pt(990, 250)); // the L0 margin (1 000, 0) → (1 000, 500)
      expect(r.ok).toBe(true);
      if (!r.ok) continue;
      expect(b.plat.vertices.flags[r.value]).toBe(VERTEX_STEINER | VERTEX_SPLIT);
      expect(problems(b.plat)).toEqual([]);
      answers.add(JSON.stringify([pos(b.plat, r.value), outgoing(b.plat, r.value).map((h) => pos(b.plat, b.plat.halfEdges.origin[h ^ 1])).sort()]));
    }
    expect(answers.size).toBe(1);
  });
});

describe('the endpoint rule and the refusals (§3.6 step 2; §3.3)', () => {
  it('a foot within attractCm of an endpoint: that endpoint, which takes the row (W_ATTRACTED)', () => {
    const b = dressQuarters(indexed(QUARTERS));
    const t = insertTx(b.plat, 2);
    const r = splitThrough(t, b.he[11], pt(510, 20), { role: 'anchor', entity: 'district:9' });
    expect(r.ok && r.value).toBe(b.v[4]);
    expect(r.ok && r.warnings).toEqual([{ code: 'W_ATTRACTED', count: 1, at: { x: 510, y: 20 } }]);
    expect(t.warnings).toEqual([{ code: 'W_ATTRACTED', count: 1, at: { x: 510, y: 20 } }]);
    const rows = rowsOn(b.plat, 'vertex', b.v[4]).map((x) => [rowKey(b.plat, x), b.plat.roles.level[x]]);
    expect(rows).toContainEqual([{ role: 'anchor', entity: 'district:9', ordinal: 0 }, 2]);
    expect(t.journal.vertices).toEqual([]);
  });

  it('a foot exactly as far from both ends (25 cm each): the endpoint with the smaller y, then x, whichever way the edge is named', () => {
    // SLANT: (23, 14)'s foot on the 50 cm edge (0, 0)–(30, 40) is (15, 20), 25 cm from each end
    for (const level of [1, 2, 4] as Level[]) {
      for (const order of [{}, { vertices: permutation(SLANT.vertices.length, level + 1), edges: permutation(SLANT.edges.length, level + 7) }]) {
        const b = indexed(SLANT, order);
        for (const h of [b.he[7], b.he[7] ^ 1]) {
          const before = fingerprint(b.plat);
          const t = insertTx(b.plat, level);
          const r = splitThrough(t, h, pt(23, 14));
          expect(r.ok && r.value).toBe(b.v[5]);
          expect(t.warnings).toEqual([{ code: 'W_ATTRACTED', count: 1, at: { x: 23, y: 14 } }]);
          expect(fingerprint(b.plat)).toBe(before);
        }
      }
    }
  });

  it('E_LEVEL: a finer edge, and a landing on a vertex finer than the batch — nothing written', () => {
    const b = dressQuarters(indexed(QUARTERS));
    const before = fingerprint(b.plat);
    expect(splitThrough(insertTx(b.plat, 1), b.he[17], pt(250, 250))).toMatchObject({ ok: false, code: 'E_LEVEL' }); // the L2 line
    // (500, 750) is an L4 vertex on the L1 line x = 500: at L2 the foot (500, 760) lies within attractCm of it
    expect(splitThrough(insertTx(b.plat, 2), b.he[13], pt(510, 760))).toMatchObject({ ok: false, code: 'E_LEVEL' });
    expect(fingerprint(b.plat)).toBe(before);
    expect(splitThrough(insertTx(b.plat, 4), b.he[13], pt(510, 760)).ok).toBe(true); // at L4 it is the endpoint
  });

  it('E_OUT_OF_RANGE and E_WORK_LIMIT write nothing', () => {
    const b = dressQuarters(indexed(QUARTERS));
    const before = fingerprint(b.plat);
    expect(splitThrough(insertTx(b.plat, 2), b.he[11], { x: Number.NaN, y: 0 } as never)).toMatchObject({ ok: false, code: 'E_OUT_OF_RANGE' });
    expect(splitThrough(insertTx(b.plat, 2, { workLimit: 0 }), b.he[11], pt(510, 300))).toEqual({ ok: false, code: 'E_WORK_LIMIT', detail: INSERT_POINTS });
    expect(splitThrough(insertTx(b.plat, 2, { workLimit: 2 }), b.he[11], pt(510, 300))).toMatchObject({ ok: false, code: 'E_WORK_LIMIT' });
    expect(fingerprint(b.plat)).toBe(before);
  });

  it('a placement off its nearest point reports W_PLACED to the transaction when it is written', () => {
    // The edge (−400, −100) → (400, 100) with a vertex v = (−336, −58) standing 25.22 cm off it (and its edge away from
    // it): the lattice point nearest v's foot lies within minEdge of v, so the split lands on the next one.
    const b = indexed({
      vertices: [[-5000, -5000, 0], [5000, -5000, 0], [5000, 5000, 0], [-5000, 5000, 0], [-400, -100, 1], [400, 100, 1], [-336, -58, 1], [-409, 233, 1]],
      edges: [[0, 1, 0], [1, 2, 0], [2, 3, 0], [3, 0, 0], [4, 5, 1], [6, 7, 1]],
    });
    const t = insertTx(b.plat, 2);
    const r = splitThrough(t, b.he[4], pt(-336, -58));
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const [x, y] = pos(b.plat, r.value);
    expect((x + 336) ** 2 + (y + 58) ** 2).toBeGreaterThanOrEqual(625);
    expect(r.warnings).toEqual([{ code: 'W_PLACED', count: 1, at: { x, y } }]);
    expect(t.warnings).toEqual(r.warnings);
    expect(problems(b.plat)).toEqual([]);
  });
});

describe('rows and the anchor allocation (§3.4 splitThrough’s row; §3.3 rule 2)', () => {
  it('an address id’s kind is read past its arena prefix; an enceinte’s contact names start at 2', () => {
    expect(addressKind('enceinte:3')).toBe('enceinte');
    expect(addressKind('under3/enceinte:1')).toBe('enceinte');
    expect(addressKind('sky2/plot:7')).toBe('plot');
    expect(addressKind('terrain')).toBe('terrain');
    expect(firstAnchorOrdinal('enceinte:3')).toBe(2);
    expect(firstAnchorOrdinal('district:3')).toBe(0);
    expect(firstAnchorOrdinal('terrain:1')).toBe(0);
  });

  it('allocates the entity’s smallest free anchor ordinal, as the arena stands', () => {
    const b = dressQuarters(indexed(QUARTERS));
    const t = insertTx(b.plat, 2);
    const at = (r: ReturnType<typeof splitThrough>): number => {
      if (!r.ok) throw new Error(r.code);
      const ordinals = rowsOn(b.plat, 'vertex', r.value).filter((x) => b.plat.roles.kind[x] === roleIdOf('anchor')).map((x) => b.plat.roles.ordinal[x]);
      return ordinals[ordinals.length - 1];
    };
    const split = (x: number, y: number, entity: string, ordinal?: number) =>
      splitThrough(t, edgeNear(b.plat, 2, x, y), pt(x, y), ordinal === undefined ? { role: 'anchor', entity } : { role: 'anchor', entity, ordinal });
    expect(at(split(510, 200, 'district:x'))).toBe(0);
    expect(at(split(510, 400, 'district:x'))).toBe(1);
    expect(at(split(400, 510, 'enceinte:2'))).toBe(2);
    expect(at(split(100, 510, 'enceinte:2'))).toBe(3);
    expect(at(split(510, 600, 'enceinte:2', 0))).toBe(0); // an open trace's end, given
    expect(t.journal.vertices).toHaveLength(5);
    expect(allocateAnchor(b.plat, 'enceinte:2')).toBe(4);
    expect(allocateAnchor(b.plat, 'district:never-seen')).toBe(0);
    expect(problems(b.plat)).toEqual([]);
  });

  it('two contact names on one entity, issue order permuted, applied in one canonical order: identical ordinals', () => {
    // Two ops of a preparation batch, each `[op index within the entity's stream path, point]`; M0-a-06's declared form
    // applies them sorted by that index — here a stand-in sort — so the ordinals follow the op set, not the issue order.
    const ops: [number, [number, number]][] = [[0, [510, 150]], [1, [510, 350]]];
    const results = new Set<string>();
    for (const issue of [[0, 1], [1, 0]]) {
      for (let seed = 1; seed <= 3; seed++) {
        const b = indexed(QUARTERS, { vertices: permutation(QUARTERS.vertices.length, seed), edges: permutation(QUARTERS.edges.length, seed + 7) });
        const t = insertTx(b.plat, 2);
        const issued = issue.map((i) => ops[i]);
        const canonical = [...issued].sort((x, y) => x[0] - y[0]);
        const out: string[] = [];
        for (const [, [x, y]] of canonical) {
          const r = splitThrough(t, edgeNear(b.plat, 2, x, y), pt(x, y), { role: 'anchor', entity: 'district:7' });
          if (!r.ok) throw new Error(r.code);
          out.push(`${pos(b.plat, r.value).join(',')}:${rowsOn(b.plat, 'vertex', r.value).map((q) => b.plat.roles.ordinal[q]).join('.')}`);
        }
        results.add(out.sort().join(' '));
      }
    }
    expect(results).toEqual(new Set(['500,150:0 500,350:1']));
    // In issue order (no canonical sort) the ordinals follow the issue: why the declared form sorts its ops (M0-a-06).
    const b = indexed(QUARTERS);
    const t = insertTx(b.plat, 2);
    const late = splitThrough(t, b.he[11], pt(510, 350), { role: 'anchor', entity: 'district:7' });
    expect(late.ok && rowsOn(b.plat, 'vertex', late.value).map((q) => b.plat.roles.ordinal[q])).toEqual([0]);
  });

  it('refuses rows that are not a vertex role row — before anything is written', () => {
    const b = dressQuarters(indexed(QUARTERS));
    const before = fingerprint(b.plat);
    const t = insertTx(b.plat, 2);
    expect(() => splitThrough(t, b.he[11], pt(510, 300), { role: 'way', entity: 'way:1' })).toThrow(/edge role/);
    expect(() => splitThrough(t, b.he[11], pt(510, 300), { role: 'gate_end', entity: 'gate:1' })).toThrow(/carries its ordinal/);
    expect(() => splitThrough(t, b.he[11], pt(510, 300), { role: 'junction', entity: 'junction:1', ordinal: 2 })).toThrow(/not indexed/);
    expect(() => splitThrough(t, b.he[11], pt(510, 300), { role: 'no_such_role', entity: 'x:1' })).toThrow(/no role named/);
    // (500, 500) already carries ('junction', 'junction:c'): a second row of that key is a programming error
    expect(() => splitThrough(t, b.he[11], pt(510, 490), { role: 'junction', entity: 'junction:c' })).toThrow(/already carries/);
    expect(fingerprint(b.plat)).toBe(before);
    const ok = splitThrough(t, b.he[11], pt(510, 300), { role: 'junction', entity: 'junction:9' });
    expect(ok.ok && rowsOn(b.plat, 'vertex', ok.value).map((q) => rowKey(b.plat, q))).toEqual([{ role: 'junction', entity: 'junction:9', ordinal: 0 }]);
  });
});

describe('the exported helpers: footOnSegment, nearerVertex, carriesRow (C-0321)', () => {
  it('footOnSegment and nearerVertex answer as stretch.ts’s copies on random lattice inputs, ties and the clamp included', () => {
    const rnd = generator(0xf007);
    const b = indexed(SLANT);
    const vs = liveVertices(b.plat);
    for (let k = 0; k < 20_000; k++) {
      const ax = intIn(rnd, -3000, 3000);
      const ay = intIn(rnd, -3000, 3000);
      const bx = ax + intIn(rnd, -400, 400);
      const by = ay + (k % 7 === 0 ? 0 : intIn(rnd, -400, 400));
      if ((bx - ax) ** 2 + (by - ay) ** 2 < 625) continue;
      const px = ax + intIn(rnd, -600, 600) + (k % 3 === 0 ? 0.5 : 0);
      const py = ay + intIn(rnd, -600, 600);
      expect(footOnSegment(ax, ay, bx, by, px, py)).toEqual(stretchFoot(ax, ay, bx, by, px, py));
      const u = vs[intIn(rnd, 0, vs.length - 1)];
      const w = vs[intIn(rnd, 0, vs.length - 1)];
      const x = k % 5 === 0 ? (b.plat.vertices.x[u] + b.plat.vertices.x[w]) / 2 : px;
      const y = k % 5 === 0 ? (b.plat.vertices.y[u] + b.plat.vertices.y[w]) / 2 : py;
      expect(nearerVertex(b.plat, u, w, x, y)).toBe(stretchNearer(b.plat, u, w, x, y));
    }
    // the tie y then x: (15, 20) is 25 cm from both ends of SLANT's (0, 0)–(30, 40), either way round
    expect(nearerVertex(b.plat, b.v[5], b.v[6], 15, 20)).toBe(b.v[5]);
    expect(nearerVertex(b.plat, b.v[6], b.v[5], 15, 20)).toBe(b.v[5]);
    expect(() => footOnSegment(5, 5, 5, 5, 0, 0)).toThrow(/^insert: an edge spans at least minEdge$/);
  });

  it('carriesRow reads a vertex row key by its interned ids: the vertex holding it, no other vertex, no other ordinal', () => {
    const b = dressQuarters(indexed(QUARTERS));
    const p = b.plat;
    const r = splitThrough(insertTx(p, 2), b.he[11], pt(510, 300), { role: 'anchor', entity: 'district:5' });
    if (!r.ok) throw new Error(r.code);
    const anchor = roleIdOf('anchor');
    const h = handleOf(p, 'district:5');
    expect(carriesRow(p, r.value, anchor, h, 0)).toBe(true);
    expect(carriesRow(p, r.value, anchor, h, 1)).toBe(false);
    expect(carriesRow(p, b.v[4], anchor, h, 0)).toBe(false);
    expect(carriesRow(p, r.value, roleIdOf('junction'), h, 0)).toBe(false);
  });
});
