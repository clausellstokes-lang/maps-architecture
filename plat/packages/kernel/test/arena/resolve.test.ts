// M0-a-02: resolve(ref, key) and signature(key, v) (§2.2 rule 5, §3.4) — every ref form resolves to current slots
// stamped with the arena's key and version, in a canonical order read on lattice positions (never slots); a ref that
// finds no geometry resolves empty; a stale version stamp — or a foreign key — asserts in the debug build and passes
// silently when the build does not assert; the signature holds the vertex's own rows and its incident edges'
// structural rows, sorted by rank and address id, deduplicated.
import fc from 'fast-check';
import { afterEach, describe, expect, it } from 'vitest';
import {
  addRole,
  allocVertex,
  assertStamp,
  commitVersion,
  createPlat,
  faceWalk,
  freeVertex,
  intern,
  isCurrent,
  resolve,
  setDebugAssertions,
  setFaceOwner,
  signature,
  vertexAt,
  type HalfEdgeId,
  type Plat,
  type Resolved,
} from '../../src/arena/index.js';
import { restoreGeneration, restoreSavepoint, takeSavepoint, type Savepoint } from '../../src/tx/index.js';
import type { Level, PlatKey } from '../../src/types/index.js';
import { buildArena, faceAt, FRAME, GROUND, permutation, pt, QUARTERS, type ArenaSpec, type Built } from './support.js';

afterEach(() => setDebugAssertions(true));

/** QUARTERS with roles and owners, by spec index (so any allocation order gets the same rows). */
function dressed(order: { vertices?: number[]; edges?: number[] } = {}): Built {
  const b = buildArena(QUARTERS, order);
  const p = b.plat;
  const e = (i: number, role: string, entity: string, level: Level, ordinal?: number) => addRole(p, b.he[i], { role, entity, ordinal }, level);
  for (const i of [11, 13, 14]) e(i, 'way', 'way:ns', 1); // x = 500, (500,0) … (500,1000)
  for (const i of [15, 16, 12]) e(i, 'way', 'way:ew', 1); // y = 500, (0,500) … (1000,500)
  for (const i of [11, 12, 13, 14, 15, 16]) e(i, 'district_bound', 'district:1', 1);
  for (let i = 0; i <= 10; i++) e(i, 'margin', 'terrain:1', 0);
  e(12, 'wall', 'enceinte:1', 1);
  e(17, 'kerb', 'block:sw', 2);
  e(18, 'gate_opening', 'bound:1', 2, 3);
  addRole(p, b.v[8], { role: 'junction', entity: 'junction:c' }, 1);
  addRole(p, b.v[7], { role: 'gate_end', entity: 'gate:1', ordinal: 0 }, 1);
  addRole(p, b.v[5], { role: 'gate_end', entity: 'gate:1', ordinal: 1 }, 1);
  addRole(p, b.v[8], { role: 'width_knot', entity: 'way:ns', ordinal: 1 }, 1);
  const block = intern(p, 'block:sw');
  setFaceOwner(p, 2, faceAt(b, 2, pt(100, 400)), block);
  setFaceOwner(p, 2, faceAt(b, 2, pt(400, 400)), block);
  setFaceOwner(p, 1, faceAt(b, 1, pt(900, 900)), intern(p, 'district:ne'));
  return b;
}

const xy = (p: Plat, v: number) => `${p.vertices.x[v]},${p.vertices.y[v]}`;
const run = (p: Plat, r: HalfEdgeId[]) => [xy(p, p.halfEdges.origin[r[0]]), ...r.map((h) => xy(p, p.halfEdges.origin[h ^ 1]))].join(' ');

/** A resolved value as lattice positions (what an output may depend on). */
function positions(p: Plat, r: Resolved): string[] {
  if (r.view === 'vertices') return r.vertices.map((v) => xy(p, v));
  if (r.view === 'edges') return r.runs.map((x) => run(p, x));
  return r.faces.map((f) => faceWalk(p, r.level, f).flat().map((h) => xy(p, p.halfEdges.origin[h])).sort().join(' '));
}

describe('resolve (§3.4)', () => {
  it('a ChainRef gives its chain as one run from its lower end, directed along it, through finer vertices', () => {
    const { plat: p } = dressed();
    const r = resolve(p, { role: 'way', entity: 'way:ns' }, GROUND);
    expect(r.view).toBe('edges');
    expect(positions(p, r)).toEqual(['500,0 500,500 500,750 500,1000']);
    expect(positions(p, resolve(p, { role: 'way', entity: 'way:ew' }, GROUND))).toEqual(['0,500 250,500 500,500 1000,500']);
  });

  it('a ring starts at its lowest-leftmost vertex and runs counter-clockwise', () => {
    const { plat: p } = dressed();
    expect(positions(p, resolve(p, { role: 'margin', entity: 'terrain:1' }, GROUND))).toEqual([
      '0,0 250,0 500,0 750,0 1000,0 1000,500 1000,750 1000,1000 500,1000 0,1000 0,500 0,0',
    ]);
  });

  it('a set that branches is cut into runs at the branch, each from its lower end, ordered by their first two vertices', () => {
    const { plat: p } = dressed();
    expect(positions(p, resolve(p, { role: 'district_bound', entity: 'district:1' }, GROUND))).toEqual([
      '500,0 500,500', '0,500 250,500 500,500', '500,500 1000,500', '500,500 500,750 500,1000',
    ]);
  });

  it('a loop hanging off a branch vertex starts there, its first step to the smaller neighbour, in any allocation order', () => {
    // a square ring with an antenna from its corner (100,100): the corner is a branch of the set
    const spec: ArenaSpec = {
      vertices: [[0, 0, 0], [100, 0, 0], [100, 100, 0], [0, 100, 0], [150, 150, 0]],
      edges: [[0, 1, 0], [1, 2, 0], [2, 3, 0], [3, 0, 0], [2, 4, 0]],
    };
    for (const seed of [0, 1, 2, 3, 4, 5]) {
      const order = seed === 0 ? {} : { vertices: permutation(5, seed), edges: permutation(5, seed + 50) };
      const b = buildArena(spec, order);
      for (const h of b.he) addRole(b.plat, h, { role: 'district_bound', entity: 'district:1' }, 0);
      expect(positions(b.plat, resolve(b.plat, { role: 'district_bound', entity: 'district:1' }, GROUND)), `seed ${seed}`).toEqual([
        '100,100 100,0 0,0 0,100 100,100', '100,100 150,150',
      ]);
    }
  });

  it('an EdgeSetRef reads its ordinal; an absent ordinal reads ordinal 0', () => {
    const { plat: p } = dressed();
    expect(positions(p, resolve(p, { role: 'gate_opening', entity: 'bound:1', ordinal: 3 }, GROUND))).toEqual(['750,0 750,200']);
    expect(positions(p, resolve(p, { role: 'gate_opening', entity: 'bound:1' }, GROUND))).toEqual([]);
    expect(positions(p, resolve(p, { role: 'kerb', entity: 'block:sw' }, GROUND))).toEqual(['250,0 250,500']);
    expect(positions(p, resolve(p, { role: 'kerb', entity: 'block:sw', ordinal: 0 }, GROUND))).toEqual(['250,0 250,500']);
  });

  it('a VertexRef gives its vertex; a FaceRef its faces at that level by canonical key', () => {
    const { plat: p } = dressed();
    const j = resolve(p, { role: 'junction', entity: 'junction:c' }, GROUND);
    expect(j.view).toBe('vertices');
    expect(positions(p, j)).toEqual(['500,500']);
    expect(positions(p, resolve(p, { role: 'gate_end', entity: 'gate:1', ordinal: 1 }, GROUND))).toEqual(['1000,500']);
    expect(positions(p, resolve(p, { role: 'gate_end', entity: 'gate:1', ordinal: 0 }, GROUND))).toEqual(['0,500']);
    const f = resolve(p, { owner: 'block:sw', level: 2 }, GROUND);
    expect(f.view).toBe('faces');
    expect(f.view === 'faces' && f.level).toBe(2);
    expect(positions(p, f)).toEqual(['0,0 0,500 250,0 250,500', '250,0 250,500 500,0 500,500']);
    expect(positions(p, resolve(p, { owner: 'district:ne', level: 1 }, GROUND))).toEqual(['1000,1000 1000,500 1000,750 500,1000 500,500 500,750']);
  });

  it('a ref that finds no geometry resolves empty — an id never interned, another ordinal, another level, a role nothing carries — and interns nothing', () => {
    const { plat: p } = dressed();
    const count = p.handles.count;
    const empty = (r: Resolved) => (r.view === 'faces' ? r.faces : r.view === 'edges' ? r.runs : r.vertices);
    expect(empty(resolve(p, { role: 'way', entity: 'way:nowhere' }, GROUND))).toEqual([]);
    expect(empty(resolve(p, { role: 'gate_end', entity: 'gate:1', ordinal: 2 }, GROUND))).toEqual([]);
    expect(empty(resolve(p, { owner: 'block:sw', level: 3 }, GROUND))).toEqual([]);
    expect(empty(resolve(p, { owner: 'nobody', level: 0 }, GROUND))).toEqual([]);
    expect(empty(resolve(p, { role: 'tunnel', entity: 'way:ns' }, GROUND))).toEqual([]);
    expect(empty(resolve(p, { role: 'tower', entity: 'junction:c' }, GROUND))).toEqual([]);
    expect(p.handles.count).toBe(count);
    expect(() => resolve(p, { role: 'street', entity: 'way:ns' }, GROUND)).toThrow(/no role named street/);
  });

  it('gives the same positions whatever order the slots were allocated in', () => {
    const want = (() => {
      const { plat: p } = dressed();
      return REFS.map((ref) => positions(p, resolve(p, ref, GROUND)));
    })();
    for (const seed of [1, 2, 3, 4, 5]) {
      const { plat: p } = dressed({ vertices: permutation(QUARTERS.vertices.length, seed), edges: permutation(QUARTERS.edges.length, seed * 31) });
      expect(REFS.map((ref) => positions(p, resolve(p, ref, GROUND))), `seed ${seed}`).toEqual(want);
    }
  });

  it('stamps the result with the arena\'s key and version; a stale stamp asserts in the debug build, silently passes without it', () => {
    const { plat: p } = dressed();
    const r = resolve(p, { role: 'junction', entity: 'junction:c' }, GROUND);
    expect(r.key).toEqual(GROUND);
    expect(r.version).toBe(p.version);
    expect(isCurrent(p, r)).toBe(true);
    expect(() => assertStamp(p, r)).not.toThrow();
    commitVersion(p);
    expect(isCurrent(p, r)).toBe(false);
    expect(() => assertStamp(p, r)).toThrow(/stale slot: stamped at version 0, arena ground\/0 is at version 1/);
    setDebugAssertions(false);
    expect(() => assertStamp(p, r)).not.toThrow();
    setDebugAssertions(true);
    const fresh = resolve(p, { role: 'junction', entity: 'junction:c' }, GROUND);
    expect(fresh.version).toBe(1);
    expect(() => assertStamp(p, fresh)).not.toThrow();
  });

  it('asserts a foreign key in the debug build: a stamp of another arena, or a key that does not name the arena resolved on', () => {
    const { plat: p } = dressed();
    const other: PlatKey = { layer: 'ground', part: 1 };
    const r = resolve(p, { role: 'junction', entity: 'junction:c' }, GROUND);
    expect(() => assertStamp(p, { key: other, version: r.version })).toThrow(/stamped for arena ground\/1 was passed to arena ground\/0/);
    expect(isCurrent(p, { key: other, version: r.version })).toBe(false);
    expect(() => resolve(p, { role: 'junction', entity: 'junction:c' }, other)).toThrow(/handed the key ground\/1/);
    expect(() => signature(p, pt(500, 500), { layer: 'sky', part: 0 })).toThrow(/handed the key sky\/0/);
    setDebugAssertions(false);
    expect(() => assertStamp(p, { key: other, version: r.version })).not.toThrow();
    expect(resolve(p, { role: 'junction', entity: 'junction:c' }, other).view).toBe('vertices');
  });
});

const REFS = [
  { role: 'way', entity: 'way:ns' },
  { role: 'way', entity: 'way:ew' },
  { role: 'margin', entity: 'terrain:1' },
  { role: 'district_bound', entity: 'district:1' },
  { role: 'gate_end', entity: 'gate:1', ordinal: 1 },
  { role: 'junction', entity: 'junction:c' },
  { owner: 'block:sw', level: 2 as Level },
  { owner: 'district:ne', level: 1 as Level },
];

describe('signature (§2.2 rule 5, §3.4)', () => {
  it('holds the vertex\'s own rows in rule 7\'s order and its incident edges\' structural rows, sorted by rank then address id, deduplicated', () => {
    const { plat: p } = dressed();
    const sig = signature(p, { role: 'junction', entity: 'junction:c' }, GROUND);
    expect(sig.v).toEqual([
      { role: 'junction', entity: 'junction:c', ordinal: 0 },
      { role: 'width_knot', entity: 'way:ns', ordinal: 1 },
    ]);
    // way:ew before way:ns (address ids), way before wall (rank); district_bound and kerb are not structural
    expect(sig.e).toEqual([
      { role: 'way', entity: 'way:ew', ordinal: 0 },
      { role: 'way', entity: 'way:ns', ordinal: 0 },
      { role: 'wall', entity: 'enceinte:1', ordinal: 0 },
    ]);
    expect(signature(p, pt(500, 500), GROUND)).toEqual(sig);
  });

  it('reads the address ids, never the handles: interning in another order gives the same signature', () => {
    const a = dressed();
    const b = buildArena(QUARTERS);
    for (const id of ['way:ns', 'enceinte:1', 'way:ew', 'width', 'junction:c']) intern(b.plat, id);
    const p = b.plat;
    for (const i of [11, 13, 14]) addRole(p, b.he[i], { role: 'way', entity: 'way:ns' }, 1);
    for (const i of [15, 16, 12]) addRole(p, b.he[i], { role: 'way', entity: 'way:ew' }, 1);
    addRole(p, b.he[12], { role: 'wall', entity: 'enceinte:1' }, 1);
    addRole(p, b.v[8], { role: 'width_knot', entity: 'way:ns', ordinal: 1 }, 1);
    addRole(p, b.v[8], { role: 'junction', entity: 'junction:c' }, 1);
    expect(signature(p, pt(500, 500), GROUND)).toEqual(signature(a.plat, pt(500, 500), GROUND));
  });

  it('is empty where there is no vertex or the ref finds none; a vertex with no row and no structural edge has an empty signature', () => {
    const { plat: p } = dressed();
    expect(signature(p, pt(123, 456), GROUND)).toEqual({ v: [], e: [] });
    expect(signature(p, { role: 'junction', entity: 'junction:none' }, GROUND)).toEqual({ v: [], e: [] });
    expect(signature(p, pt(50, 100), GROUND)).toEqual({ v: [], e: [] }); // a courtyard corner: L3 edges, no row
    expect(vertexAt(p, pt(50, 100))).toBeGreaterThanOrEqual(0);
    expect(vertexAt(p, pt(51, 100))).toBe(-1);
    // the gate end on the west side: its own row; the margin it lies on is structural
    expect(signature(p, pt(0, 500), GROUND)).toEqual({
      v: [{ role: 'gate_end', entity: 'gate:1', ordinal: 0 }],
      e: [{ role: 'way', entity: 'way:ew', ordinal: 0 }, { role: 'margin', entity: 'terrain:1', ordinal: 0 }],
    });
  });

  it('reads a lattice point\'s live vertex, never a freed slot that still holds the point', () => {
    const p = createPlat(GROUND, FRAME);
    const a = allocVertex(p, pt(10, 10), 0);
    const b = allocVertex(p, pt(90, 90), 0);
    freeVertex(p, a);
    freeVertex(p, b); // the free list hands back b's slot first
    const c = allocVertex(p, pt(10, 10), 0);
    expect(c).toBe(b);
    expect([p.vertices.x[a], p.vertices.y[a]]).toEqual([10, 10]); // a's slot, freed and lower, still holds (10,10)
    addRole(p, c, { role: 'junction', entity: 'junction:1' }, 1);
    expect(vertexAt(p, pt(10, 10))).toBe(c);
    expect(signature(p, pt(10, 10), GROUND)).toEqual({ v: [{ role: 'junction', entity: 'junction:1', ordinal: 0 }], e: [] });
    expect(vertexAt(p, pt(90, 90))).toBe(-1);
  });

  it('refuses an edge role as a VertexRef, and asserts a VertexRef that finds several vertices (debug build)', () => {
    const { plat: p, v } = dressed();
    expect(() => signature(p, { role: 'way', entity: 'way:ns' }, GROUND)).toThrow(/not a vertex role/);
    addRole(p, v[0], { role: 'junction', entity: 'junction:c' }, 1);
    expect(() => signature(p, { role: 'junction', entity: 'junction:c' }, GROUND)).toThrow(/finds 2 vertices/);
    setDebugAssertions(false);
    // without the assertion: the first vertex in canonical order, (0,0)
    expect(signature(p, { role: 'junction', entity: 'junction:c' }, GROUND)).toEqual(signature(p, pt(0, 0), GROUND));
  });
});

// Q33 (C-0313; the class of Q28, C-0299 (5)): a savepoint put back across committed batches sets the version back, so a
// version-only key reads a stamp of the rolled-back commits as current again after as many later commits. The stamp
// carries the arena's restore generation; isCurrent and assertStamp compare key, generation and version.
describe('Q33: the stamp carries the restore generation (C-0313)', () => {
  const JUNCTION = { role: 'junction', entity: 'junction:c' } as const;
  const LATE = { role: 'junction', entity: 'junction:late' } as const;

  it('an arena never restored across commits stamps the shape it always had: no generation field', () => {
    const { plat: p } = dressed();
    const r = resolve(p, JUNCTION, GROUND);
    expect('generation' in r).toBe(false);
    expect(Object.keys(r).sort()).toEqual(['key', 'version', 'vertices', 'view']);
    commitVersion(p);
    expect('generation' in resolve(p, { role: 'way', entity: 'way:ns' }, GROUND)).toBe(false);
  });

  for (const n of [1, 3]) {
    it(`a stamp read in the rolled-back commits is stale after the restore and ${n} later commit(s) (the version coincides); one read after is current (n = ${n})`, () => {
      const b = dressed();
      const p = b.plat;
      const v0 = p.version;
      const before = resolve(p, JUNCTION, GROUND);
      const image = takeSavepoint(p);
      addRole(p, b.v[2], LATE, 1);
      for (let i = 0; i < n; i++) commitVersion(p);
      const during = resolve(p, LATE, GROUND);
      expect(during.view === 'vertices' && during.vertices.length).toBe(1);
      expect(isCurrent(p, during)).toBe(true);
      restoreSavepoint(image);
      expect(restoreGeneration(p)).toBe(1);
      expect(p.version).toBe(v0);
      // At the image's own version: the pre-image stamp is of generation 0, the arena of generation 1.
      expect(isCurrent(p, before)).toBe(false);
      expect(() => assertStamp(p, before)).toThrow(`a stale slot: stamped at version ${v0} in restore generation 0, arena ground/0 is at version ${v0} in restore generation 1`);
      for (let i = 0; i < n; i++) commitVersion(p);
      // The version the rolled-back stamp was read at is reached again; its slots name a row the restore took away.
      expect(p.version).toBe(during.version);
      expect(resolve(p, LATE, GROUND)).toMatchObject({ view: 'vertices', vertices: [] });
      expect(isCurrent(p, during)).toBe(false);
      expect(() => assertStamp(p, during)).toThrow(/stale slot: .* in restore generation 0, .* in restore generation 1 \(a savepoint was put back across committed batches since\)/);
      setDebugAssertions(false);
      expect(() => assertStamp(p, during)).not.toThrow();
      setDebugAssertions(true);
      // A stamp read after the restore carries the generation and is current until the next commit.
      const after = resolve(p, JUNCTION, GROUND);
      expect(after.generation).toBe(1);
      expect(after.version).toBe(during.version);
      expect(isCurrent(p, after)).toBe(true);
      expect(() => assertStamp(p, after)).not.toThrow();
      commitVersion(p);
      expect(isCurrent(p, after)).toBe(false);
      expect(() => assertStamp(p, after)).toThrow(`a stale slot: stamped at version ${during.version}, arena ground/0 is at version ${p.version}`);
    });
  }

  it('a restore at the image\'s own version (a rejected batch) moves no generation: a stamp read before it stays current', () => {
    const b = dressed();
    const p = b.plat;
    const r = resolve(p, JUNCTION, GROUND);
    const image = takeSavepoint(p);
    addRole(p, b.v[2], LATE, 1);
    restoreSavepoint(image);
    expect(restoreGeneration(p)).toBe(0);
    expect(isCurrent(p, r)).toBe(true);
    expect(() => assertStamp(p, r)).not.toThrow();
    expect('generation' in resolve(p, JUNCTION, GROUND)).toBe(false);
  });

  it('a stamp of another arena\'s generation and version asserts the foreign key first, as before', () => {
    const { plat: p } = dressed();
    const image = takeSavepoint(p);
    commitVersion(p);
    restoreSavepoint(image);
    const other: PlatKey = { layer: 'ground', part: 1 };
    expect(() => assertStamp(p, { key: other, version: p.version, generation: 1 })).toThrow(/stamped for arena ground\/1 was passed to arena ground\/0/);
    expect(isCurrent(p, { key: other, version: p.version, generation: 1 })).toBe(false);
    expect(isCurrent(p, { key: GROUND, version: p.version, generation: 1 })).toBe(true);
    expect(isCurrent(p, { key: GROUND, version: p.version })).toBe(false);
  });

  it('property: a stamp is current exactly when no commit and no restore across commits has happened since it was read', () => {
    // Events on one arena: commit, take a savepoint, put one back, read a stamp. Savepoints nest as a transaction's do:
    // putting one back drops every image taken after it (they lie inside the span it rolls back). The model: each
    // commit and each restore that moves the version is a new state; a stamp is current iff read in the current one.
    type Ev = { k: 'commit' } | { k: 'take' } | { k: 'restore'; i: number } | { k: 'read' };
    const ev: fc.Arbitrary<Ev> = fc.oneof(
      fc.constant<Ev>({ k: 'commit' }),
      fc.constant<Ev>({ k: 'take' }),
      fc.nat(15).map((i): Ev => ({ k: 'restore', i })),
      fc.constant<Ev>({ k: 'read' }),
    );
    fc.assert(
      fc.property(fc.array(ev, { minLength: 1, maxLength: 40 }), (events) => {
        const { plat: p } = dressed();
        let state = 0;
        let states = 0;
        const images: { s: Savepoint; state: number }[] = [];
        const reads: { r: Resolved; state: number }[] = [];
        for (const e of events) {
          if (e.k === 'commit') {
            commitVersion(p);
            state = ++states;
          } else if (e.k === 'take') {
            images.push({ s: takeSavepoint(p), state });
          } else if (e.k === 'restore') {
            if (images.length === 0) continue;
            const [img] = images.splice(e.i % images.length);
            const moved = p.version !== img.s.version;
            restoreSavepoint(img.s);
            state = moved ? ++states : state;
          } else {
            reads.push({ r: resolve(p, JUNCTION, GROUND), state });
          }
          for (const x of reads) {
            const want = x.state === state;
            if (isCurrent(p, x.r) !== want) return false;
            let threw = false;
            try {
              assertStamp(p, x.r);
            } catch {
              threw = true;
            }
            if (threw === want) return false;
          }
        }
        return true;
      }),
    );
  });
});
