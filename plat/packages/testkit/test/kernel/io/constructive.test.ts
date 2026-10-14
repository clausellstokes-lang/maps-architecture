// M0-a-15's bar over M0-k-02's constructive set (§13.1: "save → load → save byte-identical and the loaded arena passing
// every hard invariant" on every B-FUZZ constructive arena; §16 M0 (a)): every M0 case whose scenario inserts chains,
// read as an arena by M0-d-08's `constructiveSequence` (its leading insertChain steps on an L0 frame around the
// geometry), round-tripped before its next op and after it; and the set's own cases that name the block's ops —
// `further/outer-ring-only`, `limit/save-load-round-trip`, `limit/regenerate-same` and `limit/data-corrupt-chunk` —
// run as their steps state, judged against their expected outcomes.
import { describe, expect, it } from 'vitest';
import { decodeArena, describeChunk, encodeArena, H128, insertChain, isCorruptCache, type Chunk, type Overlay } from '@plat/kernel';
import { casesAt, constructiveCase } from '../../../src/constructive/index.js';
import type { ConstructiveCase } from '../../../src/constructive/types.js';
import { constructiveSequence, determinismPoint as lp, fixtureSpec, runBatch } from '../../../src/determinism/index.js';
import { bareArena, draw, insertSteps, roundTrip, sameBlock } from './support.js';

/**
 * Seeds per case: 4 (a swept case runs the first 4 of its sweep). This is the item's own bar run, not the set at the
 * tier sizes: C-0122 — "M0-k-04's aggregate B-FUZZ runs (wave 11: the whole constructive set and every primitive at the
 * tier sizes) are unchanged" — so every seed of every case at the PR and nightly sizes is M0-k-04's run (C-0110), and 4
 * here is not a narrowed bar (checks/M0-a-15-notes.md note 4).
 */
const SEEDS = 4;

const M0 = casesAt('M0');
const withArena = M0.filter((c) => [0, 1, 2, 3].some((s) => constructiveSequence(c, s) !== null));

describe('the round trip over the constructive set (§13.1, M0-k-02 through M0-d-08)', () => {
  it('reaches the set: most M0 cases build an arena', () => {
    expect(M0.length).toBeGreaterThan(40);
    expect(withArena.length).toBeGreaterThan(30);
  });

  for (const c of withArena) {
    it(`${c.id}: save → load → save byte-identical before and after its next op`, () => {
      let arenas = 0;
      const seeds = c.sweep !== undefined ? Math.min(c.sweep, SEEDS) : SEEDS;
      for (let s = 0; s < seeds; s++) {
        const seq = constructiveSequence(c, s);
        if (seq === null) continue;
        const p = seq.arena();
        seq.batches.forEach((b, i) => {
          if (i === seq.batches.length - 1) {
            roundTrip(p);
            arenas++;
          }
          try {
            runBatch(p, b.build(p));
          } catch {
            // A kernel assertion on the case's next op: tx() put the arena back (M0-d-08's reading of a throw).
          }
        });
        roundTrip(p);
        arenas++;
      }
      expect(arenas).toBeGreaterThan(0);
    });
  }
});

function only(id: string): ConstructiveCase {
  const c = constructiveCase(id);
  if (c === undefined) throw new Error(`no case ${id}`);
  return c;
}

describe('the constructive set\'s own block cases', () => {
  it('further/outer-ring-only: one chunk, one face, round trip (§3.9)', () => {
    const c = only('further/outer-ring-only');
    expect(c.milestone).toBe('M0');
    for (let s = 0; s < 12; s++) {
      const input = draw(c, s);
      const p = bareArena();
      expect(insertSteps(p, input).inserted).toBe(1);
      const { chunks, loaded } = roundTrip(p);
      expect(chunks.length).toBe(1);
      expect([0, 1, 2, 3, 4].map((l) => loaded.slots.face[l as 0].live)).toEqual([1, 0, 0, 0, 0]);
    }
  });

  it('limit/save-load-round-trip and limit/regenerate-same: byte-identical (§3.11)', () => {
    for (let s = 0; s < 12; s++) {
      const input = draw(only('limit/save-load-round-trip'), s);
      const p = bareArena();
      const ran = insertSteps(p, input);
      expect(ran.rest.map((x) => x.op)).toEqual(['encodeArena', 'decodeArena', 'encodeArena']);
      roundTrip(p);
      const again = draw(only('limit/regenerate-same'), s);
      const a = bareArena();
      const b = bareArena();
      insertSteps(a, again);
      insertSteps(b, again);
      expect(sameBlock(encodeArena(a), encodeArena(b))).toBe(true);
    }
  });

  it('limit/data-corrupt-chunk: flip-byte, truncate and dangling-reference each return the corrupt cache', () => {
    const c = only('limit/data-corrupt-chunk');
    const seen = new Set<string>();
    for (let s = 0; s < 40; s++) {
      const input = draw(c, s);
      const p = bareArena();
      expect(insertSteps(p, input).inserted).toBe(3);
      const chunks = encodeArena(p);
      expect(chunks.length).toBe(2);
      expect(describeChunk(chunks[1].bytes).level).toBe(2);
      const how = String(input.params.corrupt);
      const at = Number(input.params.at);
      seen.add(how);
      let bad: Chunk[];
      if (how === 'flip-byte') {
        const bytes = chunks[1].bytes.slice();
        bytes[Math.floor(at * (bytes.length - 1))] ^= 0x41;
        bad = [chunks[0], { ref: chunks[1].ref, bytes }];
      } else if (how === 'truncate') {
        const bytes = chunks[1].bytes.slice(0, Math.floor(at * (chunks[1].bytes.length - 1)));
        bad = [chunks[0], { ref: H128(bytes), bytes }];
      } else {
        // The routes chunk of the arena with its outer ring alone: the kerb's references to the way's vertices dangle.
        const ring = bareArena();
        const outer = input.rings.outer;
        expect(runBatch(ring, { spec: fixtureSpec(0), fn: (o: Overlay) => insertChain(o, outer.map((q) => lp(q.x, q.y)), [{ role: 'margin', entity: 'margin:outer' }], 'mandatory', { closed: true }) }).ok).toBe(true);
        bad = [encodeArena(ring)[0], chunks[1]];
      }
      const r = decodeArena(bad, p.key);
      expect(r.ok).toBe(false);
      expect(isCorruptCache(r)).toBe(true);
      expect('partial' in r).toBe(false);
      if (how === 'dangling-reference' && !r.ok) expect(r.detail).toMatch(/finds no vertex|no route edge joins/);
    }
    expect([...seen].sort()).toEqual(['dangling-reference', 'flip-byte', 'truncate']);
  });
});
