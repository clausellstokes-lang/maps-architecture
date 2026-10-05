// M0-a-15: "slot compaction gives identical output for the next operation (the renumbering property, M0-d-08's
// harness)" — §3.3 "an arena compacted on save, one grown through a long session and one merged from pool overlays give
// identical results for the same next edit (the slot-renumbering test: §13.1)"; §3.9 "slots are compacted on save".
// Every sequence of M0-a-06's batch fixtures and every constructive sequence of M0-k-02's set is cut before each of its
// batches; the arena there is compacted (`compactSlots`), renumbered by M0-d-08 and then compacted, or saved and
// loaded; the next batch's slot-free outcome (M0-d-08's `outcomePrint`: the refusal code, or the commit record, the
// five level digests and the arena) is compared with the uncompacted arena's.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { compactSlots, decodeArena, encodeArena, LEVELS, type Plat } from '@plat/kernel';
import { casesAt } from '../../../src/constructive/index.js';
import {
  arenaPrint,
  constructiveSequence,
  fixtureSequence,
  fixtureSequences,
  levelDigestsHex,
  outcomePrint,
  renumberSlots,
  runBatch,
  type DeterminismBatch,
  type DeterminismSequence,
} from '../../../src/determinism/index.js';
import { indexConfigOf, print } from './support.js';

/** M0-a-06's batch fixtures (the kernel's test folder, inside plat/; the file's `$comment` names M0-d-08 as its reader). */
const KERNEL_SEQUENCES: readonly DeterminismSequence[] = fixtureSequences(
  JSON.parse(readFileSync(new URL('../../../../kernel/test/tx/fixtures/sequences.json', import.meta.url), 'utf8')) as unknown,
).map(fixtureSequence);

const CONSTRUCTIVE: DeterminismSequence[] = [];
for (const c of casesAt('M0')) {
  for (let s = 0; s < 2; s++) {
    const q = constructiveSequence(c, s);
    if (q !== null) CONSTRUCTIVE.push(q);
  }
}

function step(p: Plat, b: DeterminismBatch): string {
  try {
    return outcomePrint(p, runBatch(p, b.build(p)));
  } catch {
    return `threw\n${arenaPrint(p)}`;
  }
}

/** The arena of `seq` before its batch k, passed through `prepare`, and that batch's slot-free outcome on it. */
function nextOutcome(seq: DeterminismSequence, k: number, prepare: (p: Plat) => Plat): { outcome: string; after: Plat } {
  const p0 = seq.arena();
  for (let i = 0; i < k; i++) step(p0, seq.batches[i]);
  const p = prepare(p0);
  return { outcome: step(p, seq.batches[k]), after: p };
}

const loadOf = (p: Plat): Plat => {
  const r = decodeArena(encodeArena(p), p.key, { index: indexConfigOf(p) });
  if (!r.ok) throw new Error(`the block did not load: ${r.detail}`);
  return r.value;
};

/** The slot tables a compaction numbers canonically (the history lists — an owner's faces, a key's rows — aside). */
function tables(p: Plat): string {
  const n = (a: ArrayLike<number>, top: number): string => Array.from({ length: top }, (_, i) => a[i]).join(',');
  const v = p.slots.vertex.top;
  const e = p.slots.pair.top;
  const r = p.slots.role.top;
  const out = [
    n(p.vertices.x, v), n(p.vertices.y, v), n(p.vertices.out, v), n(p.vertices.level, v), n(p.vertices.flags, v),
    n(p.halfEdges.origin, 2 * e), n(p.halfEdges.next, 2 * e), n(p.halfEdges.prev, 2 * e), n(p.halfEdges.level, e),
    n(p.roles.kind, r), n(p.roles.level, r), n(p.roles.ordinal, r), n(p.roles.nextInSet, r), n(p.roles.vertexFirst, v), n(p.roles.edgeFirst, e),
  ];
  for (const l of LEVELS) {
    const f = p.slots.face[l].top;
    const F = p.faces[l];
    out.push(n(F.outer, f), n(F.kind, f), n(F.parent, f), n(F.stage, f));
  }
  return out.join('\n');
}

function run(seqs: readonly DeterminismSequence[]): { cuts: number; commits: number; loadedRecordDiffers: number } {
  let cuts = 0;
  let commits = 0;
  let loadedRecordDiffers = 0;
  for (const seq of seqs) {
    for (let k = 1; k < seq.batches.length; k++) {
      const ref = nextOutcome(seq, k, (p) => p);
      const compact = nextOutcome(seq, k, compactSlots);
      expect(compact.outcome).toBe(ref.outcome);
      const renum = nextOutcome(seq, k, (p) => compactSlots(renumberSlots(p, 1000 + k)));
      expect(renum.outcome).toBe(ref.outcome);
      const rev = nextOutcome(seq, k, (p) => compactSlots(renumberSlots(p, k, { mode: 'reverse' })));
      expect(rev.outcome).toBe(ref.outcome);
      // Compaction is canonical: the renumbered arena compacts to the original's tables.
      const p0 = seq.arena();
      for (let i = 0; i < k; i++) step(p0, seq.batches[i]);
      expect(tables(compactSlots(renumberSlots(p0, 77 + k)))).toBe(tables(compactSlots(p0)));
      // The loaded arena (its stored starts canonical, §3.9): the same arena and digests after the next batch.
      const loaded = nextOutcome(seq, k, loadOf);
      expect(print(loaded.after)).toBe(print(ref.after));
      expect(levelDigestsHex(loaded.after)).toEqual(levelDigestsHex(ref.after));
      if (loaded.outcome !== ref.outcome) loadedRecordDiffers++;
      cuts++;
      if (ref.outcome.startsWith('commit')) commits++;
    }
  }
  return { cuts, commits, loadedRecordDiffers };
}

describe('slot compaction and the next operation (§3.3, §3.9; M0-d-08\'s harness)', () => {
  it('M0-a-06\'s batch fixtures: identical outcome after compaction, before every batch', () => {
    const r = run(KERNEL_SEQUENCES);
    expect(r.cuts).toBeGreaterThan(20);
    expect(r.commits).toBeGreaterThan(10);
    expect(r.loadedRecordDiffers).toBe(0);
  });

  it('the constructive sequences: identical outcome after compaction, before every batch', { timeout: 600_000 }, () => {
    const r = run(CONSTRUCTIVE);
    expect(r.cuts).toBeGreaterThan(50);
    expect(r.commits).toBeGreaterThan(30);
    expect(r.loadedRecordDiffers).toBe(0);
  });
});
