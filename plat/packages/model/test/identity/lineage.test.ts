// M0-d-05a: the lineage key and its 64-bit hash (§6.3 *Lineage key*, §6.1 the town lineage, §2.8 Hash64; C-0132,
// C-0179 (1)). The hash is checked against an independent serialiser (DataView little-endian bytes into the kernel's
// one-shot H128), the lane form is shown injective, every field refused out of its width, and the town root pinned.
import fc from 'fast-check';
import { H128, STAGES, type Hash64, type Layer, type StageId } from '@plat/kernel';
import { describe, expect, it } from 'vitest';
import { compareLineage, GROUND, LINEAGE_LANES, lineageHash, lineageLanes, sameLineage, TOWN_ROOT, type LineageKey } from '../../src/index.js';

const LAYERS: Layer[] = ['ground', 'underground', 'sky'];

const arbKey: fc.Arbitrary<LineageKey> = fc.record({
  arena: fc.record({ layer: fc.constantFrom(...LAYERS), part: fc.integer({ min: 0, max: 0xffffffff }) }),
  unit: fc.option(fc.tuple(fc.integer({ min: 0, max: 0xffffffff }), fc.integer({ min: 0, max: 0xffffffff })), { nil: null }),
  stage: fc.integer({ min: 0, max: 0xffff }).map((s) => s as StageId),
  epoch: fc.integer({ min: 0, max: 0xffffffff }),
  index: fc.integer({ min: 0, max: 0xffffffff }),
  reroll: fc.integer({ min: 0, max: 0xffff }),
  dup: fc.option(fc.integer({ min: 1, max: 0xffffffff }), { nil: undefined }),
}).map((k) => (k.dup === undefined ? { arena: k.arena, unit: k.unit, stage: k.stage, epoch: k.epoch, index: k.index, reroll: k.reroll } : k));

/** The independent oracle: the lanes as little-endian bytes through a DataView, then the one-shot H128's words 0, 1. */
function oracleHash(key: LineageKey): Hash64 {
  const layer = LAYERS.indexOf(key.arena.layer); // ground 0, underground 1, sky 2
  const lanes = [
    layer,
    key.arena.part,
    key.unit === null ? 0 : 1,
    key.unit === null ? 0 : key.unit[0],
    key.unit === null ? 0 : key.unit[1],
    key.stage,
    key.epoch,
    key.index,
    key.reroll,
    key.dup ?? 0,
  ];
  const bytes = new Uint8Array(lanes.length * 4);
  const view = new DataView(bytes.buffer);
  lanes.forEach((v, i) => view.setUint32(i * 4, v, true));
  const h = H128(bytes);
  return [h[0], h[1]];
}

const base: LineageKey = { arena: { layer: 'ground', part: 0 }, unit: [7, 9], stage: STAGES.S8, epoch: 0, index: 3, reroll: 0 };

describe('lineageHash (§6.3)', () => {
  it('is words 0 and 1 of H128 over the ten little-endian lanes (an independent serialiser)', () => {
    fc.assert(
      fc.property(arbKey, (key) => {
        expect(lineageHash(key)).toEqual(oracleHash(key));
      }),
    );
  });

  it('writes ten lanes, one form per key: distinct keys give distinct lane streams (the encoder guard)', () => {
    expect(lineageLanes(base).length).toBe(LINEAGE_LANES);
    fc.assert(
      fc.property(arbKey, arbKey, (a, b) => {
        const same =
          a.arena.layer === b.arena.layer &&
          a.arena.part === b.arena.part &&
          (a.unit === null ? b.unit === null : b.unit !== null && a.unit[0] === b.unit[0] && a.unit[1] === b.unit[1]) &&
          a.stage === b.stage &&
          a.epoch === b.epoch &&
          a.index === b.index &&
          a.reroll === b.reroll &&
          (a.dup ?? 0) === (b.dup ?? 0);
        expect(Array.from(lineageLanes(a)).join() === Array.from(lineageLanes(b)).join()).toBe(same);
      }),
    );
  });

  it('separates every component: changing any one field changes the hash', () => {
    const h = lineageHash(base);
    const variants: LineageKey[] = [
      { ...base, arena: { layer: 'underground', part: 0 } },
      { ...base, arena: { layer: 'sky', part: 0 } },
      { ...base, arena: { layer: 'ground', part: 1 } },
      { ...base, unit: null },
      { ...base, unit: [0, 0] },
      { ...base, unit: [9, 7] },
      { ...base, unit: [8, 9] },
      { ...base, unit: [7, 10] },
      { ...base, stage: STAGES.S10 },
      { ...base, epoch: 1 },
      { ...base, epoch: 0x80000001 },
      { ...base, index: 4 },
      { ...base, reroll: 1 },
      { ...base, dup: 1 },
    ];
    const seen = new Set([h.join()]);
    for (const v of variants) {
      const g = lineageHash(v).join();
      expect(seen.has(g)).toBe(false);
      seen.add(g);
    }
  });

  it('keeps the town root apart from a key with a unit of [0, 0] (the unit flag lane)', () => {
    expect(sameLineage(lineageHash(TOWN_ROOT), lineageHash({ ...TOWN_ROOT, unit: [0, 0] }))).toBe(false);
    expect(lineageLanes(TOWN_ROOT)[2]).toBe(0);
    expect(lineageLanes({ ...TOWN_ROOT, unit: [0, 0] })[2]).toBe(1);
  });

  it('refuses every field out of its width, never coercing', () => {
    const bad: Array<Partial<Record<keyof LineageKey, unknown>>> = [
      { arena: { layer: 'air', part: 0 } },
      { arena: { layer: 'ground', part: -1 } },
      { arena: { layer: 'ground', part: 1.5 } },
      { arena: { layer: 'ground', part: 2 ** 32 } },
      { unit: [1] },
      { unit: [1, -1] },
      { unit: [1, 2 ** 32] },
      { unit: [0.5, 1] },
      { stage: 0x10000 },
      { stage: -1 },
      { stage: 1.5 },
      { epoch: -1 },
      { epoch: 2 ** 32 },
      { epoch: 0.5 },
      { index: -1 },
      { index: 2 ** 32 },
      { index: Number.NaN },
      { reroll: 0x10000 },
      { reroll: -1 },
      { reroll: '1' },
      { dup: 0 },
      { dup: -1 },
      { dup: 2 ** 32 },
      { dup: 1.5 },
    ];
    for (const b of bad) expect(() => lineageHash({ ...base, ...b } as LineageKey)).toThrow(RangeError);
    expect(() => lineageHash({ ...base, epoch: 0xffffffff, index: 0xffffffff, reroll: 0xffff, stage: 0xffff as StageId, dup: 0xffffffff })).not.toThrow();
  });

  it('orders hashes as unsigned 64-bit numbers, word 1 the high word', () => {
    expect(compareLineage([0xffffffff, 0], [0, 1])).toBe(-1);
    expect(compareLineage([1, 5], [0, 5])).toBe(1);
    expect(compareLineage([3, 4], [3, 4])).toBe(0);
    expect(compareLineage([0, 0x80000000], [0, 0x7fffffff])).toBe(1);
  });
});

describe('the town root (§6.1: ground arena, no parent, creation epoch 0, index 0)', () => {
  it('is the fixed town lineage', () => {
    expect(TOWN_ROOT.arena).toEqual(GROUND);
    expect(GROUND).toEqual({ layer: 'ground', part: 0 });
    expect(TOWN_ROOT.unit).toBeNull();
    expect(TOWN_ROOT.epoch).toBe(0);
    expect(TOWN_ROOT.index).toBe(0);
    expect(TOWN_ROOT.reroll).toBe(0);
    expect(TOWN_ROOT.dup).toBeUndefined();
    expect(Object.isFrozen(TOWN_ROOT)).toBe(true);
  });

  it('hashes to its pinned value (the encoder fixed point)', () => {
    expect(lineageHash(TOWN_ROOT)).toEqual([0x99c01090, 0x102eece6]);
  });
});
