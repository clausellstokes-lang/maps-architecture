// M0-a-02: every list walk and probe loop of the arena is bounded and refuses a malformed table — a set, chain, owner
// list, rotation or ring that does not end or close, a hole run that lost its terminator, a full lookup table — rather
// than loop (C-0146 (10), C-0149). Each test corrupts one table by hand and expects the arena's refusal; every refusal
// of a call comes before the call's first write, so a refused call leaves the arena as it was (C-0149 (2)). Removing any
// guard, or moving a write before a refusal, turns a test here red (a refusal not thrown, a table changed, or a run
// that does not finish).
import { describe, expect, it } from 'vitest';
import {
  addRole,
  addRoleRow,
  allocEdgePair,
  allocFace,
  allocVertex,
  createOwnerTable,
  createPlat,
  createRoleHeadTable,
  faceHoles,
  facesOfOwner,
  freeEdgePair,
  freeFace,
  handleOf,
  intern,
  nextAt,
  outgoing,
  ownerDelete,
  removeRoleRow,
  roleHeadDelete,
  roleIdOf,
  rowElement,
  rowsOfKey,
  rowsOn,
  setFaceHoles,
  setFaceOwner,
  walkRing,
  type HalfEdgeId,
  type Plat,
} from '../../src/arena/index.js';
import { FRAME, GROUND, pt } from './support.js';

/** A square's four vertices and its four edge pairs (unlinked: next / prev −1), every one at `level`. */
function square(p: Plat, x0: number, y0: number, s: number, level: 0 | 1 | 2 = 0): { v: number[]; h: HalfEdgeId[] } {
  const v = [pt(x0, y0), pt(x0 + s, y0), pt(x0 + s, y0 + s), pt(x0, y0 + s)].map((q) => allocVertex(p, q, 0));
  return { v, h: v.map((a, i) => allocEdgePair(p, a, v[(i + 1) % 4], level)) };
}

const way = (p: Plat, h: HalfEdgeId, entity: string) => addRole(p, h, { role: 'way', entity }, 1);

describe('role sets (rule 7): a set that does not end, or does not hold its row, is refused', () => {
  it('a cyclic set: rowElement, rowsOn and an insertion walk refuse it', () => {
    const p = createPlat(GROUND, FRAME);
    const { h } = square(p, 0, 0, 100);
    const r = ['a', 'b', 'c'].map((s) => way(p, h[0], `way:${s}`));
    expect(rowsOn(p, 'edge', h[0])).toEqual(r);
    p.roles.nextInSet[r[2]] = r[0];
    expect(() => rowElement(p, r[1])).toThrow(/the set of role row \d+ does not end/);
    expect(() => rowsOn(p, 'edge', h[0])).toThrow(/the role set of edge \d+ does not end/);
    // 'way:d' sorts after every row, so the insertion walks the whole set
    expect(() => way(p, h[0], 'way:d')).toThrow(/the role set of edge \d+ does not end/);
    expect(p.slots.role.live).toBe(3);
  });

  it('a set whose last row lost its element mark is refused by rowElement', () => {
    const p = createPlat(GROUND, FRAME);
    const { h } = square(p, 0, 0, 100);
    const r = ['a', 'b'].map((s) => way(p, h[0], `way:${s}`));
    expect(rowElement(p, r[0])).toBe(h[0] >> 1);
    p.roles.nextInSet[r[1]] = -1;
    expect(() => rowElement(p, r[0])).toThrow(/set has no element mark/);
  });

  it('removeRoleRow refuses a set that cycles before the row, and a set that does not hold it, writing nothing', () => {
    const p = createPlat(GROUND, FRAME);
    const { h } = square(p, 0, 0, 100);
    const r = ['a', 'b', 'c'].map((s) => way(p, h[0], `way:${s}`));
    p.roles.nextInSet[r[1]] = r[0]; // r0 ⇄ r1; r2's own tail still ends at the element's mark
    expect(rowElement(p, r[2])).toBe(h[0] >> 1);
    expect(() => removeRoleRow(p, r[2])).toThrow(/the role set of edge \d+ does not end/);
    expect(p.slots.role.live).toBe(3);
    expect(rowsOfKey(p, roleIdOf('way'), handleOf(p, 'way:c'), 0)).toEqual([r[2]]);

    const q = createPlat(GROUND, FRAME);
    const s = square(q, 0, 0, 100).h;
    const r0 = way(q, s[0], 'way:a');
    const s0 = way(q, s[1], 'way:b');
    q.roles.edgeFirst[s[0] >> 1] = s0; // the element's set starts in another element's set
    expect(() => removeRoleRow(q, r0)).toThrow(/role row \d+ is missing from its set/);
    expect(q.slots.role.live).toBe(2);
  });
});

describe('same-key chains (rule 7\'s reverse index): a chain that does not end, or does not hold its row, is refused', () => {
  it('rowsOfKey refuses a cyclic chain', () => {
    const p = createPlat(GROUND, FRAME);
    const { h } = square(p, 0, 0, 100);
    const r = h.map((e) => way(p, e, 'way:1'));
    const id = roleIdOf('way');
    const w = handleOf(p, 'way:1');
    expect(rowsOfKey(p, id, w, 0)).toEqual([r[3], r[2], r[1], r[0]]); // chains prepend
    p.roles.nextSameKey[r[0]] = r[3];
    expect(() => rowsOfKey(p, id, w, 0)).toThrow(/the chain of role \d+, entity \d+, ordinal 0 does not end/);
  });

  it('removeRoleRow refuses a chain that cycles before the row, and a chain that ends without it, writing nothing', () => {
    const p = createPlat(GROUND, FRAME);
    const { h } = square(p, 0, 0, 100);
    const r = h.map((e) => way(p, e, 'way:1')); // the chain r3 → r2 → r1 → r0
    p.roles.nextSameKey[r[2]] = r[3]; // r3 ⇄ r2; r1 and r0 unreachable from the head
    expect(() => removeRoleRow(p, r[0])).toThrow(/the chain of role row \d+'s key does not end/);
    expect(rowsOn(p, 'edge', h[0])).toEqual([r[0]]); // the set was not touched
    p.roles.nextSameKey[r[2]] = -1; // the chain r3 → r2 ends early
    expect(() => removeRoleRow(p, r[0])).toThrow(/role row \d+ is missing from its key's chain/);
    expect(rowsOn(p, 'edge', h[0])).toEqual([r[0]]);
    expect(p.slots.role.live).toBe(4);
  });
});

describe('owner lists (OwnerTable): a list that does not end, or does not hold its face, is refused', () => {
  it('facesOfOwner, setFaceOwner and freeFace refuse a cyclic list; setFaceOwner a list without the face', () => {
    const p = createPlat(GROUND, FRAME);
    const { h } = square(p, 0, 0, 100);
    const d = intern(p, 'block:9');
    const fs = h.map((e) => allocFace(p, 0, { outer: e, kind: 0, owner: d, stage: 0, parent: -1 }));
    expect(facesOfOwner(p, 0, d)).toEqual([fs[3], fs[2], fs[1], fs[0]]); // lists prepend
    const next = p.faces[0].nextOfOwner;
    next[fs[0]] = fs[3];
    expect(() => facesOfOwner(p, 0, d)).toThrow(/the L0 face list of owner \d+ does not end/);
    next[fs[0]] = -1;
    next[fs[2]] = fs[3]; // fs3 ⇄ fs2; fs1 and fs0 unreachable from the head
    expect(() => setFaceOwner(p, 0, fs[0], -1)).toThrow(/the L0 face list of owner \d+ does not end/);
    expect(() => freeFace(p, 0, fs[0])).toThrow(/the L0 face list of owner \d+ does not end/);
    expect(p.faces[0].owner[fs[0]]).toBe(d);
    next[fs[2]] = -1; // the list fs3 → fs2 ends early
    expect(() => setFaceOwner(p, 0, fs[0], -1)).toThrow(/face \d+ is missing from its owner's list/);
    expect(p.slots.face[0].live).toBe(4);
  });
});

describe('hole runs: a run that lost its terminator, or starts outside the pool, is refused', () => {
  it('faceHoles and the pool\'s compaction refuse a run with no terminator; the compaction writes nothing', () => {
    const p = createPlat(GROUND, FRAME, { holes: 8 });
    const outer = square(p, 0, 0, 1000).h;
    const inner = square(p, 100, 100, 100).h;
    const [f, g, k] = [0, 1, 2].map((i) => allocFace(p, 0, { outer: outer[i], kind: 0, owner: -1, stage: 0, parent: -1 }));
    setFaceHoles(p, 0, f, [inner[0]]);
    setFaceHoles(p, 0, f, [inner[0], inner[1]]); // f's run moves to 2 … 4; 0 … 1 is left for the next compaction
    setFaceHoles(p, 0, g, [inner[2]]); // g's run at 5 … 6: seven of the pool's eight entries used
    const t = p.faces[0];
    expect([t.holesStart[f], t.holesStart[g], p.slots.holesTop[0]]).toEqual([2, 5, 7]);
    expect(faceHoles(p, 0, g)).toEqual([inner[2]]);
    t.holes[6] = inner[3]; // g's terminator overwritten: its run reaches the pool's used length
    expect(() => faceHoles(p, 0, g)).toThrow(/the L0 hole run of face \d+ does not end/);
    // k's run needs two entries, so the pool is compacted first: f's run is read (it would move to 0), then g's is
    // refused — and nothing was written: the pool and f's and g's starts (k has no run; a target face that holds one is
    // the next describe's)
    const before = Array.from(t.holes);
    expect(() => setFaceHoles(p, 0, k, [inner[3]])).toThrow(/the L0 hole run of face \d+ does not end/);
    expect(Array.from(p.faces[0].holes)).toEqual(before);
    expect([t.holesStart[f], t.holesStart[g], p.slots.holesTop[0]]).toEqual([2, 5, 7]);
    t.holes[6] = -1;
    t.holesStart[f] = 7;
    expect(() => faceHoles(p, 0, f)).toThrow(/face \d+'s hole run starts outside the L0 pool/);
    t.holesStart[f] = 2;
    setFaceHoles(p, 0, k, [inner[3]]); // well formed again: the compaction runs
    expect([faceHoles(p, 0, f), faceHoles(p, 0, g), faceHoles(p, 0, k)]).toEqual([[inner[0], inner[1]], [inner[2]], [inner[3]]]);
    expect([p.faces[0].holesStart[f], p.faces[0].holesStart[g], p.faces[0].holesStart[k], p.slots.holesTop[0]]).toEqual([0, 3, 5, 7]);
  });
});

describe('rotations and rings (the level walks): a rotation or ring that does not close is refused', () => {
  it('nextAt refuses a rotation that cycles among finer edges and never reaches a coarse one', () => {
    const p = createPlat(GROUND, FRAME);
    const [a, b, c, d] = [pt(0, 0), pt(100, 0), pt(100, 100), pt(0, 100)].map((q) => allocVertex(p, q, 0));
    const h = allocEdgePair(p, a, b, 0);
    const e1 = allocEdgePair(p, b, c, 2);
    const e2 = allocEdgePair(p, b, d, 2);
    const n = p.halfEdges.next;
    n[h] = e1;
    n[e1 ^ 1] = e2;
    n[e2 ^ 1] = e1; // the rotation at b runs e1, e2, e1, … and never reaches twin(h)
    expect(() => nextAt(p, 0, h)).toThrow(/the rotation at half-edge \d+ does not close/);
    n[e2 ^ 1] = h ^ 1;
    expect(nextAt(p, 0, h)).toBe(h ^ 1);
    expect(nextAt(p, 2, h)).toBe(e1);
  });

  it('walkRing refuses a ring that never returns to its start', () => {
    const p = createPlat(GROUND, FRAME);
    const { h } = square(p, 0, 0, 100);
    const n = p.halfEdges.next;
    n[h[0]] = h[1];
    n[h[1]] = h[2];
    n[h[2]] = h[1]; // h1 → h2 → h1 → …: the walk from h0 never closes
    expect(() => walkRing(p, 0, h[0])).toThrow(/the level-0 walk from \d+ does not close/);
    n[h[2]] = h[3];
    n[h[3]] = h[0];
    expect(walkRing(p, 0, h[0])).toEqual(h);
  });

  it('outgoing refuses a rotation that never returns to the vertex\'s out', () => {
    const p = createPlat(GROUND, FRAME);
    const { v, h } = square(p, 0, 0, 100);
    const diag = allocEdgePair(p, v[1], v[3], 0);
    const n = p.halfEdges.next;
    p.vertices.out[v[1]] = h[1];
    n[h[1] ^ 1] = diag;
    n[diag ^ 1] = diag; // the rotation at v1 runs h1, diag, diag, … and never returns to h1
    expect(() => outgoing(p, v[1])).toThrow(/the rotation at vertex \d+ does not close/);
    n[diag ^ 1] = h[0] ^ 1;
    n[h[0]] = h[1];
    expect(outgoing(p, v[1])).toEqual([h[1], diag, h[0] ^ 1]);
  });
});

/** Every empty slot of the role-head table given a key no row carries: a malformed (full) table. */
function fillRoleHeads(p: Plat): void {
  const t = p.roles.head;
  for (let i = 0, k = 0; i < t.first.length; i++) {
    if (t.first[i] !== -1) continue;
    t.k0[i] = 900_000 + k++;
    t.k1[i] = 0;
    t.first[i] = 0;
  }
  t.count = t.first.length;
}

/** Every empty slot of a level's owner table given an owner no face has: a malformed (full) table. */
function fillOwners(p: Plat, level: 0): void {
  const t = p.faces[level].ownerHead;
  for (let i = 0, k = 0; i < t.head.length; i++) {
    if (t.head[i] !== -1) continue;
    t.owner[i] = 900_000 + k++;
    t.head[i] = 0;
  }
  t.count = t.head.length;
}

// C-0149 (2): every refusal of a call comes before its first write, so a refused call leaves the whole arena as it was —
// compared here as a structured clone of every table (the clone sees a write: each test ends on a control that writes).
describe('a refusal writes nothing: the lookup a full table refuses, and the compaction, come before the first write', () => {
  it('removeRoleRow refused by a full role-head table, its row first or second in its set: nothing written', () => {
    const p = createPlat(GROUND, FRAME);
    const { h } = square(p, 0, 0, 100);
    const ra = way(p, h[0], 'way:a');
    const rb = way(p, h[0], 'way:b'); // second in h0's set, alone on its key: its removal deletes the key
    const rc = way(p, h[1], 'way:a'); // the chain of way:a runs rc → ra
    const rd = way(p, h[2], 'way:d'); // first (and only) in h2's set, alone on its key
    fillRoleHeads(p);
    const before = structuredClone(p);
    expect(() => removeRoleRow(p, rb)).toThrow(/a role-head table is full/);
    expect(() => removeRoleRow(p, rd)).toThrow(/a role-head table is full/);
    expect(p).toEqual(before);
    removeRoleRow(p, ra); // the control: ra follows rc in its chain, so no head is written and the full table is not read past its key
    expect(p).not.toEqual(before);
    expect([rowsOn(p, 'edge', h[0]), rowsOfKey(p, roleIdOf('way'), handleOf(p, 'way:a'), 0)]).toEqual([[rb], [rc]]);
  });

  it('addRoleRow and addRole refused by a full role-head table: no row allocated, no set or chain linked', () => {
    const p = createPlat(GROUND, FRAME);
    const { h } = square(p, 0, 0, 100);
    const rb = way(p, h[0], 'way:b');
    intern(p, 'way:a');
    const c = intern(p, 'way:c');
    fillRoleHeads(p);
    const before = structuredClone(p);
    expect(() => way(p, h[0], 'way:a')).toThrow(/a role-head table is full/); // the set's front
    expect(() => way(p, h[0], 'way:c')).toThrow(/a role-head table is full/); // after rb
    expect(() => addRoleRow(p, h[1], roleIdOf('way'), c, 1, 0)).toThrow(/a role-head table is full/); // an empty set
    expect(p).toEqual(before);
    expect([rowsOn(p, 'edge', h[0]), p.slots.role.live]).toEqual([[rb], 1]);
    const r1 = way(p, h[1], 'way:b'); // the control: a key the table holds is found, and the insertion goes through
    expect(p).not.toEqual(before);
    expect([rowsOn(p, 'edge', h[1]), rowsOfKey(p, roleIdOf('way'), handleOf(p, 'way:b'), 0)]).toEqual([[r1], [r1, rb]]);
  });

  it('addRole with an entity the arena has not interned: each refusal comes before the id is interned', () => {
    const p = createPlat(GROUND, FRAME);
    const { h } = square(p, 0, 0, 100);
    const r = ['a', 'b', 'c'].map((s) => way(p, h[0], `way:${s}`));
    p.roles.nextInSet[r[2]] = r[0]; // h0's set cycles
    freeEdgePair(p, h[3]);
    const before = structuredClone(p);
    expect(() => way(p, h[0], 'way:z')).toThrow(/the role set of edge \d+ does not end/);
    expect(() => way(p, h[3], 'way:y')).toThrow(/half-edge \d+ is not live/);
    expect(() => addRole(p, h[1], { role: 'way', entity: 'way:x', ordinal: 1 }, 1)).toThrow(/is not indexed/);
    expect(() => addRole(p, h[1], { role: 'way', entity: 'way:w' }, 5 as 1)).toThrow(/a row level is 0 … 4/);
    expect(() => addRole(p, h[1], { role: 'way', entity: '' }, 1)).toThrow(/an address id is a non-empty string/);
    expect(p).toEqual(before);
    fillRoleHeads(p);
    const full = structuredClone(p);
    expect(() => way(p, h[1], 'way:v')).toThrow(/a role-head table is full/);
    expect(p).toEqual(full);
    expect(['way:z', 'way:y', 'way:x', 'way:w', 'way:v'].map((id) => handleOf(p, id))).toEqual([-1, -1, -1, -1, -1]);
    const q = createPlat(GROUND, FRAME); // the control: the same id on a well-formed arena is interned and added
    way(q, square(q, 0, 0, 100).h[1], 'way:v');
    expect(handleOf(q, 'way:v')).toBe(0);
  });

  it('setFaceOwner and freeFace refused by a full owner table: the face and both owners\' lists as they were', () => {
    const p = createPlat(GROUND, FRAME);
    const { h } = square(p, 0, 0, 100);
    const [a, b, c, d] = ['a', 'b', 'c', 'd'].map((s) => intern(p, `block:${s}`));
    const face = (e: HalfEdgeId, owner: number) => allocFace(p, 0, { outer: e, kind: 0, owner, stage: 0, parent: -1 });
    const f0 = face(h[0], a);
    const f1 = face(h[1], a); // a's list: f1 → f0
    const g = face(h[2], c); // alone under c
    const k = face(h[3], d);
    fillOwners(p, 0);
    const before = structuredClone(p);
    expect(() => setFaceOwner(p, 0, f0, b)).toThrow(/an owner table is full/); // inside a's list, to an owner the table lacks
    expect(() => setFaceOwner(p, 0, f1, b)).toThrow(/an owner table is full/); // heading a's list
    expect(() => setFaceOwner(p, 0, g, d)).toThrow(/an owner table is full/); // to a present owner: deleting c refuses
    expect(() => setFaceOwner(p, 0, g, -1)).toThrow(/an owner table is full/);
    expect(() => freeFace(p, 0, g)).toThrow(/an owner table is full/);
    expect(p).toEqual(before);
    setFaceOwner(p, 0, f0, d); // the control: from inside a's list to a present owner, no key added or deleted
    expect(p).not.toEqual(before);
    expect([facesOfOwner(p, 0, a), facesOfOwner(p, 0, d), p.faces[0].owner[f0]]).toEqual([[f1], [f0, k], d]);
  });

  it('allocFace with an owner a full owner table lacks: refused before a slot is taken', () => {
    const p = createPlat(GROUND, FRAME);
    const { h } = square(p, 0, 0, 100);
    const [a, b] = ['a', 'b'].map((s) => intern(p, `block:${s}`));
    const f0 = allocFace(p, 0, { outer: h[0], kind: 0, owner: a, stage: 0, parent: -1 });
    fillOwners(p, 0);
    const before = structuredClone(p);
    expect(() => allocFace(p, 0, { outer: h[1], kind: 0, owner: b, stage: 0, parent: -1 })).toThrow(/an owner table is full/);
    expect(p).toEqual(before);
    const f1 = allocFace(p, 0, { outer: h[1], kind: 0, owner: a, stage: 0, parent: -1 }); // the control: a is present
    expect(p).not.toEqual(before);
    expect(facesOfOwner(p, 0, a)).toEqual([f1, f0]);
  });

  it('setFaceHoles on a face that holds a run, refused by the compaction: the face keeps its run and start', () => {
    const p = createPlat(GROUND, FRAME, { holes: 8 });
    const outer = square(p, 0, 0, 1000).h;
    const inner = square(p, 100, 100, 100).h;
    const [f, g] = [0, 1].map((i) => allocFace(p, 0, { outer: outer[i], kind: 0, owner: -1, stage: 0, parent: -1 }));
    setFaceHoles(p, 0, f, [inner[0]]);
    setFaceHoles(p, 0, f, [inner[0], inner[1]]); // f's run at 2 … 4
    setFaceHoles(p, 0, g, [inner[2]]); // g's at 5 … 6
    const t = p.faces[0];
    t.holes[6] = inner[3]; // g's terminator lost
    const before = structuredClone(p);
    // f's new run needs three entries: the pool is compacted (f's own run left out), and g's run is refused
    expect(() => setFaceHoles(p, 0, f, [inner[3], inner[0]])).toThrow(/the L0 hole run of face \d+ does not end/);
    expect(p).toEqual(before);
    expect([t.holesStart[f], faceHoles(p, 0, f)]).toEqual([2, [inner[0], inner[1]]]);
    t.holes[6] = -1;
    setFaceHoles(p, 0, f, [inner[3], inner[0]]); // the control: g's run whole again, f's old run dropped by the compaction
    expect(p).not.toEqual(before);
    expect([faceHoles(p, 0, f), faceHoles(p, 0, g), t.holesStart[g], t.holesStart[f], p.slots.holesTop[0]])
      .toEqual([[inner[3], inner[0]], [inner[2]], 0, 2, 5]);
  });

  it('the compaction refuses runs that share entries and do not fit the pool, rather than cut them', () => {
    const p = createPlat(GROUND, FRAME, { holes: 8 });
    const outer = square(p, 0, 0, 1000).h;
    const inner = square(p, 100, 100, 100).h;
    const [f, g, m, k] = [0, 1, 2, 3].map((i) => allocFace(p, 0, { outer: outer[i], kind: 0, owner: -1, stage: 0, parent: -1 }));
    setFaceHoles(p, 0, f, [inner[0], inner[1], inner[2]]); // f's run at 0 … 3
    const t = p.faces[0];
    t.holesStart[g] = 0;
    t.holesStart[m] = 0; // g and m share f's run: three copies take twelve entries of eight
    const before = structuredClone(p);
    expect(() => setFaceHoles(p, 0, k, inner)).toThrow(/the L0 hole runs do not fit the pool/);
    expect(p).toEqual(before);
    t.holesStart[m] = -1; // the control: two copies fit, and the compaction stores them apart
    setFaceHoles(p, 0, k, inner);
    expect([faceHoles(p, 0, f), faceHoles(p, 0, g), faceHoles(p, 0, k)]).toEqual([inner.slice(0, 3), inner.slice(0, 3), inner]);
    expect([t.holesStart[f], t.holesStart[g], t.holesStart[k]]).toEqual([0, 4, 8]);
  });
});

describe('lookup tables: deletion by backward shift refuses a full table rather than loop', () => {
  it('roleHeadDelete and ownerDelete on a table with no empty slot', () => {
    const t = createRoleHeadTable(16);
    const o = createOwnerTable(16);
    for (let k = 0; k < 16; k++) {
      t.k0[k] = 1000 + k;
      t.first[k] = k;
      o.owner[k] = 1000 + k;
      o.head[k] = k;
    }
    t.count = 16;
    o.count = 16;
    expect(() => roleHeadDelete(t, 1005, 0)).toThrow(/a role-head table is full/);
    expect(() => ownerDelete(o, 1005)).toThrow(/an owner table is full/);
    expect([t.count, o.count, t.first[5], o.head[5]]).toEqual([16, 16, 5, 5]);
  });
});
