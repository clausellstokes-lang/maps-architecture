// M0-d-09: the distinctness census (§6.1 *Distinctness*; C-0143; C-0268 (4)) — every stream an Rng creates and every
// lineage hash minted while it runs is recorded with its source; a key asked for again is a reuse, never a collision;
// the hooks are off outside a run, restored on a throw, and refuse to nest.
import { describe, expect, it } from 'vitest';
import { CONCERNS, createRng, KeyCensus, LaneWriter, STAGES, type ConcernId, type Hash128, type StageId } from '@plat/kernel';
import { lineageHash, TOWN_ROOT } from '@plat/model';
import { censusCounts, censusInstalled, spikeRun, withKeyCensus } from '../../src/determinism/index.js';
import { SLOW, TEST_SIZE } from './support.js';

const KEY: Hash128 = [1, 2, 3, 4];
const OPTS = { reroll: 0, attempt: 0, epoch: 0, salt: 0 };
const S5 = STAGES.S5 as StageId;
const route = CONCERNS['route'] as ConcernId;
const plaza = CONCERNS['reserve.plaza'] as ConcernId;

describe('stream keys', () => {
  it('records each stream an Rng creates once, with its source; a second request of the same stream adds nothing', () => {
    const r = withKeyCensus(() => {
      const rng = createRng();
      rng.stream(KEY, S5, route, OPTS);
      rng.stream(KEY, S5, route, OPTS); // continued, not created
      rng.stream(KEY, S5, plaza, OPTS);
      rng.stream(KEY, S5, route, { ...OPTS, reroll: 1 });
      createRng().stream(KEY, S5, route, OPTS); // another derivation asks for the same key: a reuse
      return 7;
    });
    expect(r.value).toBe(7);
    expect(r.streams).toEqual({ distinct: 3, reused: 1, collisions: 0, firstCollision: null });
  });
  it('records lineage hashes with their lanes: the same key twice is a reuse, two keys two hashes', () => {
    const r = withKeyCensus(() => {
      lineageHash(TOWN_ROOT);
      lineageHash(TOWN_ROOT);
      lineageHash({ ...TOWN_ROOT, index: 1 });
      new LaneWriter().utf8('district:a').digest64();
      new LaneWriter().utf8('district:a').digest64();
      new LaneWriter().u32(5).i32(-1).f64(0.5).digest64();
      new LaneWriter().u32(5).i32(-1).f64(0.5).digest(); // a 128-bit digest is no lineage hash
    });
    expect(r.lineages).toEqual({ distinct: 4, reused: 2, collisions: 0, firstCollision: null });
  });
  it('reads a collision as a collision: one hash from two sources (the census M0-d-01 built, as the spike reads it)', () => {
    const c = new KeyCensus(2, 4);
    c.add([1, 2], [9]);
    c.add([1, 2], [8]);
    expect(censusCounts(c)).toEqual({ distinct: 1, reused: 0, collisions: 1, firstCollision: { hash: '0000000100000002', first: '00000009', second: '00000008' } });
  });
});

describe('the hooks', () => {
  it('are off outside a run, restored after a throw, and refuse to nest', () => {
    const rngStream = Object.getPrototypeOf(createRng()).stream;
    const digest64 = LaneWriter.prototype.digest64;
    expect(censusInstalled()).toBe(false);
    expect(() =>
      withKeyCensus(() => {
        expect(censusInstalled()).toBe(true);
        expect(() => withKeyCensus(() => 1)).toThrow(/already installed/);
        throw new Error('boom');
      }),
    ).toThrow('boom');
    expect(censusInstalled()).toBe(false);
    expect(Object.getPrototypeOf(createRng()).stream).toBe(rngStream);
    expect(LaneWriter.prototype.digest64).toBe(digest64);
    // and nothing is recorded outside: a run after the census changes no count of a later one
    lineageHash(TOWN_ROOT);
    expect(withKeyCensus(() => 0).lineages.distinct).toBe(0);
  });
  it('leave a lane writer\'s hashes unchanged', () => {
    const plain = new LaneWriter().u32(1).utf8('x').f64(-0).i32(-3).digest();
    const seen = withKeyCensus(() => new LaneWriter().u32(1).utf8('x').f64(-0).i32(-3).digest()).value;
    expect(seen).toEqual(plain);
    expect(withKeyCensus(() => lineageHash(TOWN_ROOT)).value).toEqual(lineageHash(TOWN_ROOT));
  });
});

describe('over a spike run', () => {
  it('counts the run\'s stream keys and lineage hashes, none colliding, and the run is the same with the census on', { timeout: SLOW }, () => {
    const plain = spikeRun('fusion', 1, { size: TEST_SIZE });
    const r = withKeyCensus(() => spikeRun('fusion', 1, { size: TEST_SIZE }));
    expect(r.value.root).toBe(plain.root);
    expect(r.value.stageRoots).toEqual(plain.stageRoots);
    expect(r.streams.distinct).toBeGreaterThan(100);
    expect(r.lineages.distinct).toBeGreaterThan(100);
    expect(r.streams.collisions).toBe(0);
    expect(r.lineages.collisions).toBe(0);
  });
});
