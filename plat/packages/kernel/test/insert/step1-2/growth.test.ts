// M0-a-04: a split at a table's doubling (N-53 (1); C-0169 (5), C-0279, C-0286) — split from splitThrough.test.ts,
// every describe and it title kept. The pins run with M0-a-02's tiny-tables mode off (atDefaultSizes) and the property
// grows two doublings from full tables, each split judged against the same split at large capacity.
import { describe, expect, it } from 'vitest';
import { faceWalk, outgoing, VERTEX_SPLIT, VERTEX_STEINER, type Plat, type VertexId } from '../../../src/arena/index.js';
import { setTinyTables, tinyTables } from '../../../src/arena/debug.js';
import { attachIndex } from '../../../src/index/index.js';
import { insertTx } from '../../../src/insert/classes.js';
import { splitThrough } from '../../../src/insert/splitThrough.js';
import { opSplitThrough, tx } from '../../../src/tx/index.js';
import type { Level } from '../../../src/types/index.js';
import { TINY_TABLES } from '../../arena/tiny.js';
import {
  buildArena,
  CELLS,
  chordSpec,
  declaredSpec,
  dressQuarters,
  edgeNear,
  fingerprint,
  generator,
  indexed,
  intIn,
  liveEdges,
  problems,
  pt,
  QUARTERS,
  rowsText,
  SLANT,
  TIMEOUT,
  type ArenaSpec,
  type Built,
} from './support.js';

// ---- N-53 (1): a split at a table's doubling (C-0169 (5), refined by C-0279) ----------------------------------------
//
// allocVertex and allocEdgePair double a full table by replacing it (`p.vertices`, `p.halfEdges`); a writer that read a
// table before an allocation and writes it after writes a dead copy, so applySplitPlan reads its tables after its last
// allocation (the re-read rule, C-0279 (1), C-0286; the ruling N-53 (1)). Each pin builds the arena with the
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

  it('the pins above put the tiny-tables mode back to the process’s setting (PLAT_TINY_TABLES), pass or fail', () => {
    expect(tinyTables()).toBe(TINY_TABLES);
  });
});
