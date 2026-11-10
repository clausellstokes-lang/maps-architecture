// S8's subset mint beside RETIRED live entries (M0-d-05a's fix round S3, closing check S2's F1, the session's ruling
// J741; queue rows Q70 and Q93). The run hands each mint the live entries its one record can collide with
// (`LiveIndex.relevant`: the record's `dup` chain by lineage, then its address's `~k` chain). An entry on BOTH chains — a
// retired entry at the fresh key's lineage holding its natural address, the faithful Regenerate the `retired` flag is
// for — was listed twice, and the mint, which refuses a live id given twice (Q93), threw on a live set that holds each
// id once. The subset now lists each entry once, so S8 mints exactly what the whole-list mint gives:
//   (P-a) the run beside its own entities marked retired: every lineage kept, every address the old one with `~1`, equal
//         to the run whose every mint reads the whole list (`faults.wholeLiveMint`);
//   (P-b) the same with each old address's `~1` held by a live entity under a foreign lineage: every address `~2` — the
//         suffix chain is still walked whole past the entry already listed;
//   (P-c) the subset itself, seen through a pass-through wrapper of `@plat/model`'s mint: no one-record mint of the
//         P-a, P-b and P-d runs is handed an entry or an id twice, and some are handed a retired entry (the case is
//         reached) — red on a subset that doubles an entry whatever the mint does with it;
//   (P-d) J741's two further shapes of an entry on both chains: a retired entry at the lineage reached holding the
//         natural address's `~1` (the natural held under a foreign lineage), and a survivor on the `dup` chain holding
//         `~1` of the address the chain ends at (that address held under a foreign lineage) — every address `~2`.
import { lineageHash, type BatchRecord, type LiveEntry, type Minted } from '@plat/model';
import { describe, expect, it, vi } from 'vitest';
import { runFixture, twoDistricts } from './support.js';

const seen = vi.hoisted(() => ({ on: false, lists: [] as LiveEntry[][], records: null as { rec: BatchRecord; minted: Minted }[] | null }));

vi.mock('@plat/model', async (importOriginal) => {
  const orig = await importOriginal<typeof import('@plat/model')>();
  return {
    ...orig,
    // The real mint, handed the same entries; while the test's flag is on, each one-record call's live list is kept
    // (and, while `records` is set, each one-record call's record and what it minted).
    mint: (...args: Parameters<typeof orig.mint>) => {
      const [batch, live, tombstones, seedKey] = args;
      const list = [...live];
      if (seen.on && batch.length === 1) seen.lists.push(list);
      const out = orig.mint(batch, list, tombstones, seedKey);
      if (seen.records !== null && batch.length === 1) seen.records.push({ rec: batch[0], minted: out[0] });
      return out;
    },
  };
});

const key = (e: LiveEntry): string => `${String(e.lineage[0])},${String(e.lineage[1])}`;

describe('S8 beside retired live entries: the subset mint lists each entry once (F1 of check M0-d-05a S2; J741)', () => {
  const first = twoDistricts();
  const base = first.input.live ?? [];
  const own = runFixture(first).infill.live.slice(base.length);
  /** The run's own entities, marked retired by the batch that re-derives them (fresh objects, each id once). */
  const retired = (): LiveEntry[] => own.map((e) => ({ id: e.id, lineage: e.lineage, retired: true }));
  /** For each own entity, a live entity under a foreign lineage holding its address's `~1`. */
  const squatters = (): LiveEntry[] => own.map((e, i) => ({ id: `${e.id}~1`, lineage: [(e.lineage[0] ^ 0x5a5a5a5a) >>> 0, (i * 2654435761) >>> 0] }));
  /** A foreign lineage for the i-th entity (none of the run's). */
  const foreign = (e: LiveEntry, i: number): LiveEntry['lineage'] => [(e.lineage[0] ^ 0x3c3c3c3c) >>> 0, (i * 40503 + 7) >>> 0];
  /** Shape 2: each own entity retired at its lineage but holding `~1` of its address; its address held under a foreign lineage. */
  const retiredAtTilde = (): LiveEntry[] => own.flatMap((e, i) => [{ id: `${e.id}~1`, lineage: e.lineage, retired: true }, { id: e.id, lineage: foreign(e, i) }]);
  // The run again beside its own entities as survivors (mint.test.ts's Q70 case): a record whose fresh lineage an own
  // entity holds takes dup 1 — its lineage, so its draws, move; each one-record mint's record and result are kept.
  seen.records = [];
  const second = twoDistricts();
  const own2 = runFixture(second, { live: [...(second.input.live ?? []), ...own] }).infill.live.slice((second.input.live ?? []).length + own.length);
  const records = seen.records;
  seen.records = null;
  // Shape 3, beside the same survivors' lineages (so the same draws): for each record that took dup 1 at its natural
  // address X, the own entity at its dup-0 lineage holds X~1 in place of its own address, and X is held under a
  // foreign lineage. That survivor is on the record's dup chain and on X's ~k chain; the record mints X~2.
  const atLineage = new Map(own.map((e, i) => [key(e), i]));
  const moved = new Map<string, LiveEntry[]>();
  const expected3 = new Map<string, string>();
  for (const { rec, minted } of records) {
    const k0 = key({ id: '', lineage: lineageHash(rec.key) });
    const i = atLineage.get(k0);
    if (i === undefined || minted.dup !== 1 || minted.suffix !== 0) continue;
    moved.set(k0, [{ id: `${minted.natural}~1`, lineage: own[i].lineage }, { id: minted.natural, lineage: foreign(own[i], i) }]);
    expected3.set(minted.identity.id, `${minted.natural}~2`);
  }
  const survivorOnChain = (): LiveEntry[] => own.flatMap((e) => moved.get(key(e)) ?? [e]);

  it('the fixture mints enough entities to read', () => {
    expect(own.length).toBeGreaterThan(20);
    expect(own.every((e) => !e.id.includes('~'))).toBe(true);
  });

  it('(P-a) beside its own entities marked retired: S8 commits, every lineage kept, every address the old one with ~1, equal to the whole-list mint', { timeout: 300_000 }, () => {
    const f = twoDistricts();
    const live = [...(f.input.live ?? []), ...retired()];
    const out = runFixture(f, { live });
    expect(out.infill.report.refused).toEqual([]);
    const mine = out.infill.live.slice(live.length);
    expect(mine.map(key)).toEqual(own.map(key));
    expect(mine.map((e) => e.id)).toEqual(own.map((e) => `${e.id}~1`));
    const g = twoDistricts();
    const whole = runFixture(g, { live: [...(g.input.live ?? []), ...retired()], faults: { wholeLiveMint: true } });
    expect(out).toEqual(whole);
  });

  it('(P-b) the same with each old address’s ~1 held under a foreign lineage: every address ~2, every lineage kept, equal to the whole-list mint', { timeout: 300_000 }, () => {
    const f = twoDistricts();
    const live = [...(f.input.live ?? []), ...retired(), ...squatters()];
    const out = runFixture(f, { live });
    expect(out.infill.report.refused).toEqual([]);
    const mine = out.infill.live.slice(live.length);
    expect(mine.map(key)).toEqual(own.map(key));
    expect(mine.map((e) => e.id)).toEqual(own.map((e) => `${e.id}~2`));
    const g = twoDistricts();
    const whole = runFixture(g, { live: [...(g.input.live ?? []), ...retired(), ...squatters()], faults: { wholeLiveMint: true } });
    expect(out).toEqual(whole);
  });

  it('(P-c) every one-record mint of those runs is handed no entry and no id twice, and some are handed a retired entry', { timeout: 300_000 }, () => {
    const errors: unknown[] = [];
    seen.lists.length = 0;
    seen.on = true;
    try {
      for (const extra of [retired(), [...retired(), ...squatters()], retiredAtTilde(), survivorOnChain()]) {
        const f = twoDistricts();
        try {
          runFixture(f, { live: [...(f.input.live ?? []), ...extra] });
        } catch (e) {
          errors.push(e);
        }
      }
    } finally {
      seen.on = false;
    }
    // The subset first, so a list that names one entry twice is reported whatever the mint does with it.
    const doubled = seen.lists.filter((l) => new Set(l).size !== l.length || new Set(l.map((e) => e.id)).size !== l.length);
    expect(doubled.map((l) => l.map((e) => e.id))).toEqual([]);
    expect(seen.lists.length).toBeGreaterThan(4 * own.length - 1);
    expect(seen.lists.some((l) => l.some((e) => e.retired === true))).toBe(true);
    expect(errors).toEqual([]);
  });

  it('(P-d) the further shapes: a retired entry holding the natural’s ~1, a dup-chain survivor holding the reached address’s ~1 — every address ~2, equal to the whole-list mint', { timeout: 300_000 }, () => {
    expect(expected3.size).toBeGreaterThan(20);
    const cases: [() => LiveEntry[], LiveEntry[], (e: LiveEntry) => string][] = [
      [retiredAtTilde, own, (e) => `${e.id}~2`],
      [survivorOnChain, own2, (e) => expected3.get(e.id) ?? e.id],
    ];
    for (const [extra, expected, idOf] of cases) {
      const f = twoDistricts();
      const live = [...(f.input.live ?? []), ...extra()];
      const out = runFixture(f, { live });
      expect(out.infill.report.refused).toEqual([]);
      const mine = out.infill.live.slice(live.length);
      expect(mine.map(key)).toEqual(expected.map(key));
      expect(mine.map((e) => e.id)).toEqual(expected.map(idOf));
      const g = twoDistricts();
      const whole = runFixture(g, { live: [...(g.input.live ?? []), ...extra()], faults: { wholeLiveMint: true } });
      expect(out).toEqual(whole);
    }
  });
});
