// S8's identities and lifecycle stamps (§6.3, §2.8; queue rows Q70 and Q87; C-0426).
//   Q70: the run's mint is handed only the live entries its one record can collide with (the fabric's incremental live
//        index), never the whole live list rescanned per entity — NO-SHIFT: the collision rule reads only the set's
//        contents, so a live list holding the run's own lineages and addresses still gives every entity a free dup and a
//        free address, exactly as the whole list does.
//   Q87: every record S8 generates carries `@plat/model`'s one lifecycle builder's stamp, `generatedLifecycle(epoch)`.
import { generatedLifecycle, type LiveEntry } from '@plat/model';
import { describe, expect, it } from 'vitest';
import { needleWedge, runFixture, twoDistricts } from './support.js';

const key = (e: LiveEntry): string => `${String(e.lineage[0])},${String(e.lineage[1])}`;

describe('the run’s mint against a live list that already holds the run’s own identities (queue row Q70)', () => {
  const first = twoDistricts();
  const before = first.input.live?.length ?? 0;
  const out1 = runFixture(first);
  const own = out1.infill.live.slice(before);

  it('the first run mints lanes, blocks, junctions and portals, each with a distinct lineage and address', { timeout: 300_000 }, () => {
    expect(own.length).toBeGreaterThan(20);
    expect(new Set(own.map(key)).size).toBe(own.length);
    expect(new Set(own.map((e) => e.id)).size).toBe(own.length);
  });

  it('the same run again beside its own entities (same lineages, same addresses): every entity takes a free dup, none reuses a lineage or an address', { timeout: 300_000 }, () => {
    const again = twoDistricts();
    const out2 = runFixture(again, { live: [...(again.input.live ?? []), ...own] });
    const mine = out2.infill.live.slice((again.input.live ?? []).length + own.length);
    expect(mine.length).toBeGreaterThan(20);
    const lineages = new Set(own.map(key));
    const ids = new Set(own.map((e) => e.id));
    for (const e of mine) {
      expect(lineages.has(key(e))).toBe(false);
      expect(ids.has(e.id)).toBe(false);
    }
    expect(new Set(mine.map(key)).size).toBe(mine.length);
  });

  it('a third time beside both earlier runs (the lineages of dup 0 and dup 1 both taken): every entity walks the dup chain on to a free one', { timeout: 300_000 }, () => {
    const second = twoDistricts();
    const out2 = runFixture(second, { live: [...(second.input.live ?? []), ...own] });
    const own2 = out2.infill.live.slice((second.input.live ?? []).length + own.length);
    const third = twoDistricts();
    const out3 = runFixture(third, { live: [...(third.input.live ?? []), ...own, ...own2] });
    const mine = out3.infill.live.slice((third.input.live ?? []).length + own.length + own2.length);
    expect(mine.length).toBeGreaterThan(20);
    const taken = new Set([...own, ...own2].map(key));
    const ids = new Set([...own, ...own2].map((e) => e.id));
    for (const e of mine) {
      expect(taken.has(key(e))).toBe(false);
      expect(ids.has(e.id)).toBe(false);
    }
  });

  it('beside entities holding the run’s addresses under other lineages: every entity keeps its lineage and takes the free ~k address', { timeout: 300_000 }, () => {
    const again = twoDistricts();
    const squatters: LiveEntry[] = own.map((e, i) => ({ id: e.id, lineage: [(e.lineage[0] ^ 0x5a5a5a5a) >>> 0, (i * 2654435761) >>> 0] }));
    const out3 = runFixture(again, { live: [...(again.input.live ?? []), ...squatters] });
    const mine = out3.infill.live.slice((again.input.live ?? []).length + squatters.length);
    expect(mine.map(key)).toEqual(own.map(key));
    const taken = new Set(own.map((e) => e.id));
    for (const e of mine) expect(taken.has(e.id)).toBe(false);
    expect(mine.every((e, i) => e.id === `${own[i].id}~1`)).toBe(true);
  });
});

describe('a run that takes a lane out again mints exactly what the whole-list mint gives (queue row Q70, NO-SHIFT)', () => {
  // The live index drops what the run takes out (LiveIndex.pop: the list and both indexes). The needle wedge's antenna
  // split is refused 'needle' once its rows are written — the lane, its junction and its portal taken out — and a later
  // rung mints its lane at the same creation index: the same lineage key, free again. An index still holding the taken-
  // out entries would hand that mint a lineage and an address no longer live, so the lane would take dup 1 (and a new
  // address) where the whole list gives dup 0 (closing check S7's Y23; base flat 900 seed 2's lanes and root moved).
  it('the needle wedge: a take-out then a re-mint at the same index; every identity, lane and block equal to the run whose every mint reads the whole live list', { timeout: 300_000 }, () => {
    const f1 = needleWedge();
    const base = f1.input.live?.length ?? 0;
    const out1 = runFixture(f1);
    const rep = out1.infill.report.districts[0];
    // The take-out happened (the refused split's lane minted, then taken out), and the face was cut after it.
    expect(rep.rungs.some((r) => r.outcome === 'refused' && r.why === 'needle')).toBe(true);
    const f2 = needleWedge();
    const out2 = runFixture(f2, { faults: { wholeLiveMint: true } });
    const own1 = out1.infill.live.slice(base);
    const own2 = out2.infill.live.slice(base);
    expect(own1.length).toBeGreaterThan(5);
    expect(own1).toEqual(own2);
    expect(out1.lanes.map((l) => l.id)).toEqual(out2.lanes.map((l) => l.id));
    expect(out1.blocks.map((b) => b.id)).toEqual(out2.blocks.map((b) => b.id));
    // A run with no other live entity mints every lineage free: no address takes a ~k suffix.
    for (const e of own1) expect(e.id.includes('~')).toBe(false);
  });
});

describe('the lifecycle stamp S8 writes is the model’s one builder’s (queue row Q87)', () => {
  for (const epoch of [0, 3]) {
    it(`at epoch ${String(epoch)}: every lane, block and junction carries generatedLifecycle(${String(epoch)})`, { timeout: 300_000 }, () => {
      const out = runFixture(twoDistricts(), { epoch });
      const stamp = generatedLifecycle(epoch);
      expect(out.lanes.length).toBeGreaterThan(0);
      for (const r of [...out.lanes, ...out.blocks, ...out.infill.junctions]) expect(r.lifecycle).toEqual(stamp);
    });
  }
});
