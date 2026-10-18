// M0-d-05b: the listed test "0 duplicate ids and 0 silent re-binds: every reference resolves to its successor or is
// reported" and the exit bar's "the routine's outcomes on the fixtures; 0 duplicate ids, 0 silent re-binds". Old towns
// are minted by M0-d-05a's mint from lineage keys; a re-derivation (New random: S8's reroll + 1; or a faithful one: the
// same keys) gives the fresh entities, whose provisional ids are their natural addresses; the routine matches them, the
// mint mints the batch with the live set and the handed-on addresses the routine produces, and every reference to an
// old address is resolved through the result.
import { seedKey, STAGES, type LineageHash } from '@plat/kernel';
import { describe, expect, it } from 'vitest';
import {
  addressOf,
  batchRecordsOf,
  GROUND,
  lineageHash,
  liveSetOf,
  match,
  M0_ANCHORS,
  mint,
  rebind,
  resolveAnchors,
  resolveRef,
  type FreshRecord,
  type LineageKey,
  type MatchEntity,
  type MatchResult,
} from '../../src/index.js';
import { generator, intIn, P } from './support.js';

const TABLE = resolveAnchors(M0_ANCHORS, () => 30);
const SK = seedKey(5);
const UNIT: LineageHash = [0xabc, 0xdef] as unknown as LineageHash;
const KINDS = ['junction', 'block', 'cell'] as const;

const keyOf = (index: number, reroll: number): LineageKey => ({ arena: GROUND, unit: UNIT, stage: STAGES.S8, epoch: 0, index, reroll });

interface Town {
  entities: MatchEntity[];
  records: FreshRecord[];
}

/** A town of `n` point entities: positions drawn from `rnd`, keys (index i, reroll), ids their natural addresses. */
function town(rnd: () => number, n: number, reroll: number, at?: (i: number) => [number, number]): Town {
  const entities: MatchEntity[] = [];
  const records: FreshRecord[] = [];
  for (let i = 0; i < n; i += 1) {
    const kind = KINDS[i % 3];
    const key = keyOf(i, reroll);
    const lineage = lineageHash(key);
    const id = addressOf(kind, lineage);
    const [x, y] = at === undefined ? [intIn(rnd, 0, 20_000), intIn(rnd, 0, 20_000)] : at(i);
    entities.push({ id, kind, lineage, anchor: { point: P(x, y) } });
    records.push({ id, record: { kind, key } });
  }
  return { entities, records };
}

/** Matches, mints, and returns the live ids after the batch: survivors and the minted entities. */
function rederive(old: MatchEntity[], fresh: Town): { result: MatchResult; liveIds: string[]; mintedOf: Map<string, string> } {
  const result = match(old, fresh.entities, TABLE);
  const minted = mint(batchRecordsOf(fresh.records, result), liveSetOf(old, result), [], SK);
  const mintedOf = new Map<string, string>();
  fresh.records.forEach((r, i) => mintedOf.set(r.id, minted[i].identity.id));
  const survivors = old.filter((e) => e.survives === true).map((e) => e.id);
  return { result, liveIds: [...survivors, ...minted.map((m) => m.identity.id)], mintedOf };
}

describe('0 duplicate ids and 0 silent re-binds (§6.3; the exit bar\'s M0 d part)', () => {
  it('a faithful re-derivation re-mints every address with no carry event; New random hands every address on with one', () => {
    const rnd = generator(1);
    const old = town(rnd, 300, 0).entities;
    const at = (i: number): [number, number] => {
      const p = (old[i].anchor as { point: { x: number; y: number } }).point;
      return [p.x, p.y];
    };
    const same = rederive(old, town(rnd, 300, 0, at));
    expect(same.result.counts).toEqual({ survive: 0, succeed: 300, tombstone: 0, fresh: 0 });
    expect(same.result.carry).toEqual([]);
    expect(same.liveIds.slice().sort()).toEqual(old.map((e) => e.id).sort());
    const reroll = rederive(old, town(rnd, 300, 1, (i) => [at(i)[0] + 20, at(i)[1] - 30]));
    expect(reroll.result.counts.succeed).toBe(300);
    expect(reroll.result.carry).toHaveLength(300);
    expect(reroll.liveIds.slice().sort()).toEqual(old.map((e) => e.id).sort());
  });

  it('on 200 random re-derivations: every live id once, every reference kept at its successor or reported', () => {
    const rnd = generator(2);
    let kept = 0;
    let reported = 0;
    for (let s = 0; s < 200; s += 1) {
      const n = intIn(rnd, 0, 60);
      const base = town(rnd, n, 0);
      // Some old entities survive (not re-derived); the fresh town is re-derived with New random, a third of it moved.
      const old = base.entities.map((e) => (intIn(rnd, 0, 4) === 0 ? { ...e, survives: true } : e));
      const fresh = town(rnd, intIn(rnd, 0, 60), 1 + intIn(rnd, 0, 2), (i) => {
        const o = base.entities[i] as MatchEntity | undefined;
        if (o === undefined || intIn(rnd, 0, 2) === 0) return [intIn(rnd, 0, 20_000), intIn(rnd, 0, 20_000)];
        const p = (o.anchor as { point: { x: number; y: number } }).point;
        return [p.x + intIn(rnd, -150, 150), p.y + intIn(rnd, -150, 150)];
      });
      const survivorIds = new Set(old.filter((e) => e.survives === true).map((e) => e.id));
      const { result, liveIds, mintedOf } = rederive(old, fresh);
      // 0 duplicate ids.
      expect(new Set(liveIds).size).toBe(liveIds.length);
      // Every reference: to every old address, and to one the routine never saw.
      const refs = [...old.map((e) => e.id), 'block:unknown0000000'];
      const r = rebind(result, refs);
      expect(r.kept.length + r.reported.length).toBe(refs.length);
      for (const k of r.kept) {
        // Kept: the address is live after the batch, held by the survivor or by the successor the routine named.
        expect(liveIds).toContain(k.ref);
        if (k.status === 'kept' && k.fresh !== undefined) expect(mintedOf.get(k.fresh)).toBe(k.ref);
        else expect(survivorIds.has(k.ref)).toBe(true);
      }
      for (const k of r.reported) {
        // Reported: no longer live (a tombstone) or never seen; a supersededBy names a live address.
        expect(liveIds).not.toContain(k.ref);
        if (k.status === 'tombstone' && k.supersededBy !== undefined) expect(liveIds).toContain(k.supersededBy);
      }
      // No fresh entity took an address that was not handed to it: every other minted id is new.
      const oldIds = new Set(old.map((e) => e.id));
      for (const [f, id] of mintedOf) {
        if (oldIds.has(id)) expect(result.handedOn.get(f)).toBe(id);
      }
      kept += r.kept.length;
      reported += r.reported.length;
    }
    expect(kept).toBeGreaterThan(1000);
    expect(reported).toBeGreaterThan(1000);
  });

  it('a fresh key equal to a survivor\'s (a locked entity in a re-derived run): the routine leaves it fresh, the mint gives it a dup and a new address', () => {
    const rnd = generator(4);
    const base = town(rnd, 6, 0, (i) => [i * 10_000, 0]);
    const old = base.entities.map((e, i) => (i === 2 ? { ...e, survives: true } : e));
    // The same run again, faithful: entity 2's fresh key and natural address equal the survivor's.
    const fresh = town(rnd, 6, 0, (i) => [i * 10_000, 0]);
    expect(fresh.entities[2].id).toBe(old[2].id);
    const { result, liveIds, mintedOf } = rederive(old, fresh);
    expect(result.counts).toEqual({ survive: 1, succeed: 5, tombstone: 0, fresh: 1 });
    expect(new Set(liveIds).size).toBe(liveIds.length);
    expect(mintedOf.get(fresh.entities[2].id)).not.toBe(old[2].id);
    expect(rebind(result, [old[2].id]).kept).toEqual([{ ref: old[2].id, status: 'kept' }]);
  });

  it('resolveRef reads each outcome; liveSetOf lists each address once and refuses a repeat (M0-d-05a note N-2)', () => {
    const rnd = generator(3);
    const base = town(rnd, 3, 0, (i) => [i * 10_000, 0]);
    const old = [{ ...base.entities[0], survives: true }, base.entities[1], base.entities[2]];
    const fresh = town(rnd, 2, 1, (i) => (i === 0 ? [50_000, 0] : [10_050, 0]));
    const result = match(old, fresh.entities, TABLE);
    expect(resolveRef(result, old[0].id)).toEqual({ ref: old[0].id, status: 'kept' });
    expect(resolveRef(result, old[1].id)).toEqual({ ref: old[1].id, status: 'kept', fresh: fresh.entities[1].id });
    expect(resolveRef(result, old[2].id)).toEqual({ ref: old[2].id, status: 'tombstone' });
    expect(resolveRef(result, 'cell:nobody')).toEqual({ ref: 'cell:nobody', status: 'unknown' });
    const live = liveSetOf(old, result);
    expect(live.map((e) => [e.id, e.retired === true])).toEqual([
      [old[0].id, false],
      [old[1].id, true],
      [old[2].id, true],
    ]);
    // Each lineage a frozen copy of the old entity's two lanes, in order.
    expect(live.map((e) => e.lineage)).toEqual(old.map((e) => [e.lineage[0], e.lineage[1]]));
    expect(live.every((e, i) => Object.isFrozen(e.lineage) && e.lineage !== old[i].lineage)).toBe(true);
    expect(() => liveSetOf([...old, old[1]], result)).toThrow(/given twice/);
    expect(() => liveSetOf([{ ...old[0], id: 'cell:other' }], result)).toThrow(/not in the result/);
    expect(() => batchRecordsOf([{ id: 'x', record: { kind: 'cell', key: keyOf(0, 0), address: 'cell:x' } }], result)).toThrow(/already carries/);
  });
});
