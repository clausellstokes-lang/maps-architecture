// M0-a-04: splitThrough(tx, at, p, row?) (§3.4; §2.2 rule 3's Steiner vertices and the split flag; §3.3 rule 2's
// allocation rule; §3.3 "No item changes in place"). The item's listed test "the anchor ordinal allocation: two contact
// names on one entity, ops permuted — identical ordinals (§13.1's permuted-ops fixture, run at M0-a-06)" is here in
// its M0-a-04 form: the allocation read at the op, so one canonical op order gives one set of ordinals whatever the
// issue order and the slots; the declared form that sorts the ops is M0-a-06's (C-0169 (5)).
import { describe, expect, it } from 'vitest';
import {
  addRole,
  faceWalk,
  outgoing,
  roleIdOf,
  rowKey,
  rowsOn,
  VERTEX_SPLIT,
  VERTEX_STEINER,
  type Plat,
  type VertexId,
} from '../../../src/arena/index.js';
import { setTinyTables } from '../../../src/arena/debug.js';
import { attachIndex, beginIndexBatch, checkIndexBatch, endIndexBatch, query, routeRun } from '../../../src/index/index.js';
import { attractVertex } from '../../../src/insert/attractVertex.js';
import { INSERT_PLACEMENT_CANDIDATES, INSERT_POINTS, insertTx, type InsertTx } from '../../../src/insert/classes.js';
import { placePoint, splitEndsBreachClearance } from '../../../src/insert/placement.js';
import { addressKind, allocateAnchor, firstAnchorOrdinal, splitThrough } from '../../../src/insert/splitThrough.js';
import { opSplitThrough, tx, type KernelTx, type Overlay } from '../../../src/tx/index.js';
import type { Level, StageId } from '../../../src/types/index.js';
import { TINY_TABLES } from '../../arena/tiny.js';
import { bits } from '../../tx/support.js';
import {
  buildArena,
  CELLS,
  chordSpec,
  dressQuarters,
  fingerprint,
  generator,
  indexed,
  intIn,
  liveEdges,
  permutation,
  problems,
  pt,
  QUARTERS,
  SLANT,
  splitEndsBreach,
  TIMEOUT,
  type ArenaSpec,
  type Built,
} from './support.js';

const pos = (p: Plat, v: VertexId): [number, number] => [p.vertices.x[v], p.vertices.y[v]];

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

/** The level-n route edge nearest a point — how an op names the edge it splits at the time it applies. */
function edgeNear(p: Plat, level: Level, x: number, y: number): number {
  const q = query(p, p.key, level, { minX: x - 26, minY: y - 26, maxX: x + 26, maxY: y + 26 }, { edges: true });
  if (q.edges.length === 0) throw new Error(`no edge near (${x}, ${y})`);
  return q.edges[0];
}

const rowsText = (p: Plat, h: number): string[] => rowsOn(p, 'edge', h).map((r) => JSON.stringify(rowKey(p, r)) + p.roles.level[r]);

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

// ---- N-53 (1): a split at a table's doubling (C-0169 (5), refined by C-0279) ----------------------------------------
//
// allocVertex and allocEdgePair double a full table by replacing it (`p.vertices`, `p.halfEdges`); a writer that read a
// table before an allocation and writes it after writes a dead copy (N-53: applySplitPlan's splice landed in the old
// half-edge table at pair counts 64·2^k, and the arena check threw at the commit). Each pin builds the arena with the
// table exactly full, so the split's own allocation doubles it, and judges the result against §3.10's validator, the
// rotation at the split's three vertices and the same split on an arena built at the default (large) capacity — a
// table's capacity is never content, so the two fingerprints (every table to its high-water mark, the slots, the index)
// are equal.

/** An arena from `spec` with the index attached, its tables sized as `capacity` says (the rest at the defaults). */
function sized(spec: ArenaSpec, capacity: { vertices?: number; edgePairs?: number; roleRows?: number }, dress = false): Built {
  const b = buildArena(spec, {}, capacity);
  attachIndex(b.plat, { gridCellCm: CELLS });
  return dress ? dressQuarters(b) : b;
}

/** The neighbours of a vertex, by the live rotation. */
const ring = (p: Plat, v: VertexId): VertexId[] => outgoing(p, v).map((h) => p.halfEdges.origin[h ^ 1]);

/** A declared batch at `level` holding `ops` (every other field the tx tests' defaults). */
function declaredSpec(level: Level, ops: KernelTx['ops']): KernelTx {
  const S8 = 8 as StageId;
  return { key: { layer: 'ground', part: 0 }, level, ops, expect: [], onFail: 'reject', batch: { kind: 'stage', stage: S8 }, stage: S8, rederivesFrom: S8, workLimit: 1_000_000 };
}

/** Splits at (x, y) on the level-`level` edge nearest it; checks the rotation at the split's three vertices; returns v. */
function splitAndRead(b: Built, level: Level, x: number, y: number): { v: VertexId; s: VertexId; t0: VertexId } {
  const p = b.plat;
  const g = edgeNear(p, level, x, y);
  const s = p.halfEdges.origin[g];
  const t0 = p.halfEdges.origin[g ^ 1];
  const r = splitThrough(insertTx(p, level), g, pt(x, y));
  expect(r.ok).toBe(true);
  if (!r.ok) throw new Error(r.code);
  const v = r.value;
  expect(ring(p, v).sort((a, c) => a - c)).toEqual([s, t0].sort((a, c) => a - c));
  expect(ring(p, s)).toContain(v);
  expect(ring(p, s)).not.toContain(t0);
  expect(ring(p, t0)).toContain(v);
  expect(ring(p, t0)).not.toContain(s);
  return { v, s, t0 };
}

/** Every live face record of every level walks (a stale splice leaves a ring that does not close). */
function everyFaceWalks(p: Plat): void {
  for (let l = 0; l <= 4; l++) {
    for (let f = 0; f < p.slots.face[l].top; f++) if (p.faces[l].kind[f] !== 0xffff) faceWalk(p, l as Level, f);
  }
}

// These pins pin the DEFAULT sizes' premise — a table exactly full doubles inside the split (2 · cap) and the large-capacity
// reference never grows — so each runs with M0-a-02's tiny-tables mode off whatever PLAT_TINY_TABLES says (N-53 (4),
// C-0286; N-s1-4, C-0294): the mode is read when a table is made AND when it grows, so it is off for the whole body (the
// builds, the split's own growth and the reference), and put back to the process's setting after, pass or fail. Under
// the tiny run every other test of this folder meets a replaced table at every allocation; these keep the doubling.
function atDefaultSizes(fn: () => void): () => void {
  return () => {
    setTinyTables(false);
    try {
      fn();
    } finally {
      setTinyTables(TINY_TABLES);
    }
  };
}

describe('a split at a table’s doubling (N-53 (1))', () => {
  it('P1: the pair table full — the split’s new pair doubles it; the rotation at v, s and t0 holds; equal to a large-capacity reference', atDefaultSizes(() => {
    const b = sized(SLANT, { edgePairs: SLANT.edges.length });
    const p = b.plat;
    expect(p.slots.pair.top).toBe(p.halfEdges.level.length); // full: the split's pair grows the table
    const cap = p.halfEdges.level.length;
    splitAndRead(b, 1, 1500, 2000);
    expect(p.halfEdges.level.length).toBe(2 * cap); // the table did double inside the op
    expect(problems(p)).toEqual([]);
    everyFaceWalks(p);
    const ref = indexed(SLANT);
    expect(ref.plat.halfEdges.level.length).toBeGreaterThan(SLANT.edges.length + 1); // the reference never grows
    splitAndRead(ref, 1, 1500, 2000);
    expect(fingerprint(p)).toBe(fingerprint(ref.plat));
  }));

  it('P1, the vertex-table twin: the vertex table full — the split’s vertex doubles it; same checks, same fingerprint', atDefaultSizes(() => {
    const b = sized(SLANT, { vertices: SLANT.vertices.length });
    const p = b.plat;
    expect(p.slots.vertex.top).toBe(p.vertices.x.length);
    const cap = p.vertices.x.length;
    splitAndRead(b, 1, 1500, 2000);
    expect(p.vertices.x.length).toBe(2 * cap);
    expect(problems(p)).toEqual([]);
    everyFaceWalks(p);
    const ref = indexed(SLANT);
    expect(ref.plat.vertices.x.length).toBeGreaterThan(SLANT.vertices.length + 1); // the reference never grows
    splitAndRead(ref, 1, 1500, 2000);
    expect(fingerprint(p)).toBe(fingerprint(ref.plat));
  }));

  it('P1, every table full at once (vertices, pairs, role rows): a Steiner split copying the edge’s rows; same fingerprint', atDefaultSizes(() => {
    const rows = dressQuarters(indexed(QUARTERS)).plat.slots.role.top;
    const b = sized(QUARTERS, { vertices: QUARTERS.vertices.length, edgePairs: QUARTERS.edges.length, roleRows: rows }, true);
    const p = b.plat;
    expect([p.slots.vertex.top, p.slots.pair.top, p.slots.role.top]).toEqual([p.vertices.x.length, p.halfEdges.level.length, p.roles.kind.length]);
    const { v } = splitAndRead(b, 2, 510, 300); // an L2 batch on the L1 edge (500, 0)–(500, 500): both parts carry its rows
    expect(p.vertices.flags[v]).toBe(VERTEX_STEINER | VERTEX_SPLIT);
    const parts = outgoing(p, v);
    expect(rowsText(p, parts[0])).toEqual(rowsText(p, parts[1]));
    expect(rowsText(p, parts[0]).length).toBeGreaterThan(0);
    expect(problems(p)).toEqual([]);
    everyFaceWalks(p);
    const ref = dressQuarters(indexed(QUARTERS));
    splitAndRead(ref, 2, 510, 300);
    expect(fingerprint(p)).toBe(fingerprint(ref.plat));
  }));

  it('P1, the declared form: opSplitThrough through tx() at a full pair table commits, its fingerprint equal to a large-capacity reference', atDefaultSizes(() => {
    const run = (b: Built): void => {
      const g = edgeNear(b.plat, 2, 510, 300);
      const r = tx(b.plat, declaredSpec(2, [opSplitThrough([7, 0], 0, g, pt(510, 300), { role: 'anchor', entity: 'district:1' })]));
      expect(r.ok ? 'committed' : `${r.code}: ${r.detail}`).toBe('committed');
    };
    const b = sized(QUARTERS, { edgePairs: QUARTERS.edges.length }, true);
    const cap = b.plat.halfEdges.level.length;
    expect(b.plat.slots.pair.top).toBe(cap);
    run(b);
    expect(b.plat.halfEdges.level.length).toBe(2 * cap);
    expect(problems(b.plat)).toEqual([]);
    everyFaceWalks(b.plat);
    const ref = dressQuarters(indexed(QUARTERS));
    run(ref);
    expect(b.plat.version).toBe(ref.plat.version);
    expect(fingerprint(b.plat)).toBe(fingerprint(ref.plat));
  }));

  // The claim is capacity-blindness: split by split, the arena grown from full tables equals the one built large (equal
  // fingerprints mean equal arenas, so §3.10 holds on one exactly when on the other) — and §3.10 holds after every split:
  // these long runs on near-frame chords reach the split's own-ends clearance case (C-0279 (4)), which the placement
  // now keeps (C-0284).
  it('property: a run of splits from full tables through two doublings equals the same run at large capacity, split by split', { timeout: TIMEOUT }, atDefaultSizes(() => {
    let doubled = 0;
    for (let seed = 1; seed <= 150; seed++) {
      const rnd = generator(0x5e53 + seed);
      let spec: ArenaSpec | null = null;
      while (spec === null) spec = chordSpec(rnd);
      const b = sized(spec, { vertices: spec.vertices.length, edgePairs: spec.edges.length });
      const ref = indexed(spec);
      const cap = b.plat.halfEdges.level.length;
      for (let k = 0; k < 2 * cap + 2; k++) {
        const l1 = liveEdges(ref.plat).filter((e) => e[2] === 1);
        const [a, c] = l1[intIn(rnd, 0, l1.length - 1)];
        const X = ref.plat.vertices.x;
        const Y = ref.plat.vertices.y;
        const s = intIn(rnd, 20, 80) / 100;
        const x = Math.round(X[a] + s * (X[c] - X[a])) + intIn(rnd, -20, 20);
        const y = Math.round(Y[a] + s * (Y[c] - Y[a])) + intIn(rnd, -20, 20);
        // the half-edge a → c names the edge in both arenas (one build order, one op history)
        const g = outgoing(ref.plat, a).find((h) => ref.plat.halfEdges.origin[h ^ 1] === c);
        if (g === undefined) throw new Error('no half-edge a → c');
        const want = splitThrough(insertTx(ref.plat, 1), g, pt(x, y));
        const got = splitThrough(insertTx(b.plat, 1), g, pt(x, y));
        expect(got.ok ? got.value : got.code).toBe(want.ok ? want.value : want.code);
        expect(fingerprint(b.plat)).toBe(fingerprint(ref.plat));
        expect(problems(ref.plat)).toEqual([]);
      }
      if (b.plat.halfEdges.level.length >= 4 * cap) doubled++; // two doublings
    }
    expect(doubled).toBeGreaterThan(0); // the runs reach a second doubling
  }));
});

// ---- C-0279 (4): a split keeps clearance at its own ends (C-0284) -------------------------------------------------------
//
// While s and t are joined each lies in the other's one-ring, so a chord's vertex P may stand within minEdge of the frame
// edges at the chord's frame end E (a shallow corner above minFaceAngle). A split of P–E makes the new vertex, not E,
// P's neighbour, so P must then clear the frame edges at E: it cannot, so no point of P–E qualifies under (iii) and the
// placement falls back onto the nearer end (§3.6), writing nothing. Before C-0284 the split committed the breach.

/** The L0 frame [0, 4 000]² and an L1 chord E (3 034, 4 000) – P (2 912, 4 000 − d) – (2 000, 2 000) – (2 000, 0). */
function nearFrame(d: number): ArenaSpec {
  return {
    vertices: [
      [0, 0, 0], [4000, 0, 0], [4000, 4000, 0], [0, 4000, 0], // 0 – 3
      [3034, 4000, 1], [2912, 4000 - d, 1], [2000, 2000, 1], [2000, 0, 1], // 4 E, 5 P, 6, 7
    ],
    edges: [
      [0, 7, 0], [7, 1, 0], [1, 2, 0], [2, 4, 0], [4, 3, 0], [3, 0, 0],
      [4, 5, 1], [5, 6, 1], [6, 7, 1],
    ],
  };
}

/** The half-edge a → c. */
function halfEdge(p: Plat, a: VertexId, c: VertexId): number {
  const g = outgoing(p, a).find((h) => p.halfEdges.origin[h ^ 1] === c);
  if (g === undefined) throw new Error('no half-edge a → c');
  return g;
}

/** A callback batch at `level` (the declared spec with no ops). */
const callbackSpec = (level: Level): KernelTx => declaredSpec(level, []);

describe('a split keeps clearance at its own ends (C-0279 (4); C-0284)', () => {
  it('a shallow corner at the frame (P 16 cm inside it, 7.5°): no point of P–E qualifies — splitThrough lands on the nearer end, W_PLACED, nothing written; §3.10 holds', () => {
    for (const level of [1, 2] as const) {
      const b = indexed(nearFrame(16));
      const p = b.plat;
      const [E, P] = [b.v[4], b.v[5]];
      expect(problems(p)).toEqual([]); // the arena is valid: E is P's neighbour
      expect(splitEndsBreach(p, P, E)).toBe(true); // the oracle: a split would leave P within minEdge of (3 034, 4 000)–(0, 4 000)
      expect(splitEndsBreachClearance(p, P, E)).toBe(true);
      expect(splitEndsBreachClearance(p, E, P)).toBe(true);
      // the placement rule: every candidate fails (iii) at the split's ends, none is tried; the nearer endpoint
      const t0 = insertTx(p, level);
      const pl = placePoint(t0, halfEdge(p, P, E), { x: 2966, y: 3991.08 });
      expect(pl.ok && pl.value).toEqual({ kind: 'endpoint', vertex: P, tried: 0 });
      expect(t0.work.counts.get(INSERT_PLACEMENT_CANDIDATES) ?? 0).toBe(0);
      // splitThrough at the checker's point (seed 6's split, (2 966, 3 996)), both ways round
      for (const [a, c] of [[P, E], [E, P]]) {
        const before = fingerprint(p);
        const t = insertTx(p, level);
        const r = splitThrough(t, halfEdge(p, a, c), pt(2966, 3996));
        expect(r.ok && r.value).toBe(P);
        expect(t.warnings).toEqual([{ code: 'W_PLACED', count: 1, at: pt(2912, 3984) }]);
        expect(t.journal.vertices).toEqual([]);
        expect(fingerprint(p)).toBe(before);
        expect(problems(p)).toEqual([]);
      }
      // attraction from beside P–E (6 cm off it, 15 cm inside the frame): onto the nearer end, nothing written
      const before = fingerprint(p);
      const t = insertTx(p, level);
      const r = attractVertex(t, pt(2966, 3985));
      expect(r.ok && r.value.kind === 'vertex' && r.value.vertex).toBe(P);
      expect(fingerprint(p)).toBe(before);
      expect(problems(p)).toEqual([]);
    }
  });

  it('the control: P 30 cm inside the frame (clear of the frame edges at E) — the split places its vertex and §3.10 holds', () => {
    const b = indexed(nearFrame(30));
    const p = b.plat;
    const [E, P] = [b.v[4], b.v[5]];
    expect(splitEndsBreach(p, P, E)).toBe(false);
    expect(splitEndsBreachClearance(p, P, E)).toBe(false);
    const t = insertTx(p, 1);
    const r = splitThrough(t, halfEdge(p, P, E), pt(2966, 3990));
    expect(r.ok).toBe(true);
    expect(t.journal.vertices).toHaveLength(1);
    expect(problems(p)).toEqual([]);
  });

  it('the one-ring exemption that stays: s beside an edge t–w whose far end w is s’s own neighbour (a thin triangle) — the split is placed, §3.10 holds', () => {
    // the L0 frame ±5 000 and an L1 triangle s (0, 0), t (200, 0), w (−59, 27): s stands 20.7 cm from t–w, which stays in
    // s's one-ring after the split (w is its neighbour), so the split of s–t at (100, 0) keeps clearance
    const spec: ArenaSpec = {
      vertices: [[-5000, -5000, 0], [5000, -5000, 0], [5000, 5000, 0], [-5000, 5000, 0], [0, 0, 1], [200, 0, 1], [-59, 27, 1]],
      edges: [[0, 1, 0], [1, 2, 0], [2, 3, 0], [3, 0, 0], [4, 5, 1], [5, 6, 1], [6, 4, 1]],
    };
    const b = indexed(spec);
    const p = b.plat;
    const [s, t] = [b.v[4], b.v[5]];
    expect(problems(p)).toEqual([]);
    expect(splitEndsBreach(p, s, t)).toBe(false);
    expect(splitEndsBreachClearance(p, s, t)).toBe(false);
    const tx1 = insertTx(p, 1);
    const r = splitThrough(tx1, halfEdge(p, s, t), pt(100, 0));
    expect(r.ok && pos(p, r.value)).toEqual([100, 0]);
    expect(tx1.journal.vertices).toHaveLength(1);
    expect(problems(p)).toEqual([]);
  });

  it('a run with a finer vertex: a sub-edge whose ends cannot clear is passed over and a candidate on the next sub-edge within attractCm qualifies', () => {
    // the L1 line y = 0 across the frame through A (−1 000, 0), an L2 Steiner vertex F (−900, 0) and B (1 000, 0); F's L2
    // spoke F–G, G (−1 100, 40), passes 19.6 cm from A (exempt while A–F stands). The exact position 0.5 cm before F:
    // A–F cannot be split, F–B can, and (−875, 0), 25.5 cm away, is the nearest point that qualifies on it.
    const spec: ArenaSpec = {
      vertices: [
        [-5000, -5000, 0], [5000, -5000, 0], [5000, 5000, 0], [-5000, 5000, 0], [-5000, 0, 1], [5000, 0, 1], // 0 – 5
        [-1000, 0, 1], [-900, 0, 2, VERTEX_STEINER | VERTEX_SPLIT], [1000, 0, 1], [-1100, 40, 2], // 6 A, 7 F, 8 B, 9 G
      ],
      edges: [
        [0, 1, 0], [1, 5, 0], [5, 2, 0], [2, 3, 0], [3, 4, 0], [4, 0, 0],
        [4, 6, 1], [6, 7, 1], [7, 8, 1], [8, 5, 1], [7, 9, 2],
      ],
    };
    const b = indexed(spec);
    const p = b.plat;
    const [A, F, B] = [b.v[6], b.v[7], b.v[8]];
    expect(problems(p)).toEqual([]);
    expect(splitEndsBreach(p, A, F)).toBe(true);
    expect(splitEndsBreach(p, F, B)).toBe(false);
    const pl = placePoint(insertTx(p, 1), halfEdge(p, A, F), { x: -900.5, y: 0 });
    expect(pl.ok && pl.value.kind === 'placed' && { at: pl.value.at, sub: pl.value.sub }).toEqual({ at: pt(-875, 0), sub: halfEdge(p, F, B) });
  });

  it('the checker’s seeds 6, 34 and 40 (chord arenas, generator 0xc1ea + seed), role-dressed, every split a tx() callback batch: committed with §3.10 holding, never with a breach', () => {
    const cases = new Map<number, string[]>();
    for (const seed of [6, 34, 40]) {
      const rnd = generator(0xc1ea + seed);
      let spec: ArenaSpec | null = null;
      while (spec === null) spec = chordSpec(rnd);
      const b = indexed(spec);
      const p = b.plat;
      b.he.forEach((h, i) => addRole(p, h, spec!.edges[i][2] === 0 ? { role: 'margin', entity: 'terrain:1' } : { role: 'way', entity: `way:${i}` }, spec!.edges[i][2] as Level));
      expect(problems(p)).toEqual([]);
      for (let k = 0; k < 40; k++) {
        const l1 = liveEdges(p).filter((e) => e[2] === 1);
        const [a, c] = l1[intIn(rnd, 0, l1.length - 1)];
        const X = p.vertices.x;
        const Y = p.vertices.y;
        const s = intIn(rnd, 20, 80) / 100;
        const x = Math.round(X[a] + s * (X[c] - X[a])) + intIn(rnd, -20, 20);
        const y = Math.round(Y[a] + s * (Y[c] - Y[a])) + intIn(rnd, -20, 20);
        if (splitEndsBreach(p, a, c)) cases.set(seed, [...(cases.get(seed) ?? []), `${k}: (${X[a]},${Y[a]})-(${X[c]},${Y[c]})`]);
        const g = halfEdge(p, a, c);
        const version = p.version;
        const before = fingerprint(p);
        const r = tx(p, callbackSpec(1), (o) => splitThrough(o, g, pt(x, y)));
        if (r.ok) expect(problems(p)).toEqual([]);
        else {
          expect(p.version).toBe(version);
          expect(fingerprint(p)).toBe(before);
        }
      }
    }
    // each seed reaches the case at the checker's breaching split (seed 6: split 20 of (2 912, 3 984)–(3 034, 4 000))
    expect(cases.get(6)).toContain('20: (2912,3984)-(3034,4000)');
    expect(cases.get(34)).toContain('27: (2168,0)-(2003,23)');
    expect(cases.get(40)).toContain('37: (3981,2702)-(4000,2539)');
  });
});

// ---- N-55 (5): splitThrough refuses a closed transaction (C-0294) ------------------------------------------------------
//
// An overlay outlives its batch only as a programming error: kept from a callback past the commit, a reject or a throw
// that rolled the batch back, it is closed (`InsertTx.closed`, set by M0-a-06's transaction). Before N-55 the shell's
// writers never looked, so `splitThrough` on it wrote outside any transaction with the version unchanged (the ruling's
// probe q13). It now throws at its entry, before it reads or charges anything — tx's assertion class (N-53 (3)), never a
// typed refusal — and the arena stays as it was, bit for bit.

/** The overlay of a QUARTERS batch at L2 that split (500, 300) on the L1 edge (500, 0)–(500, 500), then ended as `how`. */
function staleSplitOverlay(how: 'committed' | 'rejected' | 'threw'): { p: Plat; o: Overlay } {
  const p = dressQuarters(indexed(QUARTERS)).plat;
  let kept: Overlay | null = null;
  const run = (): unknown =>
    tx(p, callbackSpec(2), (o) => {
      kept = o;
      const r = splitThrough(o, edgeNear(p, 2, 510, 300), pt(510, 300), { role: 'anchor', entity: 'district:1' });
      expect(r.ok).toBe(true);
      if (how === 'rejected') return { ok: false as const, code: 'E_NO_PATH' as const, detail: 'the stage gave up' };
      if (how === 'threw') throw new Error('stage bug');
      return r;
    });
  if (how === 'threw') expect(run).toThrow(/stage bug/);
  else expect((run() as { ok: boolean }).ok).toBe(how === 'committed');
  if (kept === null) throw new Error('the callback never ran');
  return { p, o: kept };
}

describe('N-55 (5): splitThrough on a closed transaction throws — committed, rejected or rolled back by a throw (C-0294)', () => {
  for (const how of ['committed', 'rejected', 'threw'] as const) {
    it(`on a ${how} batch's overlay: throws "the transaction is closed"; the arena bit for bit and its version as they were`, () => {
      const { p, o } = staleSplitOverlay(how);
      expect(o.closed).toBe(true);
      const before = bits(p);
      const version = p.version;
      const g = edgeNear(p, 2, 510, 150); // (500, 0)–(500, 300) after a commit, the whole L1 edge after a reject or throw
      for (const row of [undefined, { role: 'anchor', entity: 'district:2' }]) {
        expect(() => splitThrough(o, g, pt(510, 150), row)).toThrow(/^insert: the transaction is closed \(committed or rejected\)$/);
        expect(bits(p)).toBe(before);
        expect(p.version).toBe(version);
      }
      expect(problems(p)).toEqual([]);
      // the control: the same split in an open batch writes and commits — the throw was the closed overlay, nothing else
      const r = tx(p, callbackSpec(2), (open) => splitThrough(open, g, pt(510, 150)));
      expect(r.ok ? 'committed' : `${r.code}: ${r.detail}`).toBe('committed');
      expect(p.version).toBe(version + 1);
      expect(bits(p)).not.toBe(before);
      expect(problems(p)).toEqual([]);
    });
  }

  it('an open shell transaction (closed unset) and one marked open (closed false) split as before', () => {
    for (const closed of [undefined, false]) {
      const p = dressQuarters(indexed(QUARTERS)).plat;
      const t: InsertTx = closed === undefined ? insertTx(p, 2) : { ...insertTx(p, 2), closed };
      const r = splitThrough(t, edgeNear(p, 2, 510, 300), pt(510, 300));
      expect(r.ok).toBe(true);
      expect(t.journal.vertices.length).toBe(1);
    }
  });
});
