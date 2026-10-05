// M0-a-15: `compactSlots` — §3.9 "slots are compacted on save … so renumbering is free", §3.3 "an arena compacted on
// save … give[s] identical results for the same next edit". Kernel-side checks: the copy is dense and canonically
// numbered, the original untouched, and the next random batch does the same on both (the slot-renumbering property
// through M0-d-08's harness is the testkit-side test, C-0122).
import { describe, expect, it } from 'vitest';
import { idOf, LEVELS, type Plat } from '../../src/arena/index.js';
import { compactSlots, encodeArena } from '../../src/io/index.js';
import { tx, type CommitRecord } from '../../src/tx/index.js';
import { ALONG_MIX, DEFAULT_MIX, randomBatch, rng, type Live } from '../tx/fuzzgen.js';
import { framed, spec } from '../tx/support.js';
import { digests, load, print } from './support.js';

function grow(seed: number, steps: number, live: Live, r: () => number, p: Plat, mix = DEFAULT_MIX): void {
  for (let i = 0; i < steps; i++) {
    const snap: Live = { ways: live.ways.slice(), kerbs: live.kerbs.slice(), next: live.next };
    const b = randomBatch(p, live, r, mix);
    if (!tx(p, spec(b.level, { rederivesFrom: 0 as never }), b.fn).ok) {
      live.ways = snap.ways;
      live.kerbs = snap.kerbs;
    }
  }
}

/** A commit record's slot-free counts. */
function counts(rec: CommitRecord | null): string {
  if (rec === null) return 'nothing';
  return JSON.stringify({
    v: rec.version,
    f: rec.faces.map((d) => [d.level, d.created.length, d.changed.length, d.removed.length]),
    n: [rec.edgesAdded, rec.edgesRemoved, rec.steinerAdded, rec.steinerDissolved, rec.work],
    m: [rec.moved.length, rec.promoted.length, rec.demoted.vertices.length, rec.demoted.edges.length, rec.unflagged.length],
    o: rec.owners,
    r: rec.roles.map((k) => `${k.role}/${k.entity}/${k.ordinal}`),
    w: rec.warnings.map((x) => `${x.code}×${x.count}`),
  });
}

describe('compactSlots (§3.9, §3.3)', () => {
  it('is dense, keeps the arena as it is, and leaves the original untouched', () => {
    for (let seed = 1; seed <= 10; seed++) {
      const p = framed();
      grow(seed, 50, { ways: [], kerbs: [], next: 0 }, rng(seed * 31), p, seed % 2 === 0 ? ALONG_MIX : DEFAULT_MIX);
      const before = print(p);
      const top = [p.slots.vertex.top, p.slots.pair.top, p.slots.role.top];
      const q = compactSlots(p);
      expect(print(p)).toBe(before);
      expect([p.slots.vertex.top, p.slots.pair.top, p.slots.role.top]).toEqual(top);
      expect(print(q)).toBe(before);
      expect(digests(q)).toEqual(digests(p));
      expect(q.version).toBe(p.version);
      for (const s of [q.slots.vertex, q.slots.pair, q.slots.role, ...q.slots.face]) {
        expect(s.free).toBe(-1);
        expect(s.top).toBe(s.live);
      }
    }
  });

  it('numbers slots canonically: an arena and its reload compact to the same tables', () => {
    for (let seed = 1; seed <= 8; seed++) {
      const p = framed();
      grow(seed, 40, { ways: [], kerbs: [], next: 0 }, rng(seed * 97), p, ALONG_MIX);
      const a = compactSlots(p);
      const b = compactSlots(load(encodeArena(p), p));
      expect(Array.from(a.vertices.x.subarray(0, a.slots.vertex.top))).toEqual(Array.from(b.vertices.x.subarray(0, b.slots.vertex.top)));
      expect(Array.from(a.vertices.y.subarray(0, a.slots.vertex.top))).toEqual(Array.from(b.vertices.y.subarray(0, b.slots.vertex.top)));
      expect(Array.from(a.halfEdges.origin.subarray(0, 2 * a.slots.pair.top))).toEqual(Array.from(b.halfEdges.origin.subarray(0, 2 * b.slots.pair.top)));
      expect(Array.from(a.halfEdges.level.subarray(0, a.slots.pair.top))).toEqual(Array.from(b.halfEdges.level.subarray(0, b.slots.pair.top)));
      for (const l of LEVELS) {
        const n = a.slots.face[l].top;
        expect(b.slots.face[l].top).toBe(n);
        expect(Array.from(a.faces[l].parent.subarray(0, n))).toEqual(Array.from(b.faces[l].parent.subarray(0, n)));
        expect(Array.from(a.faces[l].kind.subarray(0, n))).toEqual(Array.from(b.faces[l].kind.subarray(0, n)));
      }
      const rowsA = Array.from({ length: a.slots.role.top }, (_, i) => `${a.roles.kind[i]}/${idOf(a, a.roles.entity[i])}/${a.roles.level[i]}/${a.roles.ordinal[i]}`);
      const rowsB = Array.from({ length: b.slots.role.top }, (_, i) => `${b.roles.kind[i]}/${idOf(b, b.roles.entity[i])}/${b.roles.level[i]}/${b.roles.ordinal[i]}`);
      expect(rowsA).toEqual(rowsB);
    }
  });

  it('the next random batch does the same on the compacted copy as on the original', () => {
    let commits = 0;
    for (let seed = 1; seed <= 20; seed++) {
      const p = framed();
      const live: Live = { ways: [], kerbs: [], next: 0 };
      grow(seed, 30, live, rng(seed * 7), p, seed % 2 === 0 ? ALONG_MIX : DEFAULT_MIX);
      const q = compactSlots(p);
      const liveQ: Live = { ways: live.ways.slice(), kerbs: live.kerbs.slice(), next: live.next };
      for (let k = 0; k < 5; k++) {
        const bp = randomBatch(p, live, rng(seed * 1000 + k), ALONG_MIX);
        const bq = randomBatch(q, liveQ, rng(seed * 1000 + k), ALONG_MIX);
        const rp = tx(p, spec(bp.level, { rederivesFrom: 0 as never }), bp.fn);
        const rq = tx(q, spec(bq.level, { rederivesFrom: 0 as never }), bq.fn);
        expect(rq.ok).toBe(rp.ok);
        if (rp.ok && rq.ok) {
          expect(counts(rq.value.record)).toBe(counts(rp.value.record));
          if (rp.value.record !== null) commits++;
        } else if (!rp.ok && !rq.ok) {
          expect(rq.code).toBe(rp.code);
        }
        expect(print(q)).toBe(print(p));
      }
    }
    expect(commits).toBeGreaterThan(20);
  });
});
