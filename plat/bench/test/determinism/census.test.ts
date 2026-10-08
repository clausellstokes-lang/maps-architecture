// M0-d-09: the distinctness census (§6.1 *Distinctness*; C-0143; C-0268 (4)) — every stream an Rng creates and every
// lineage hash minted while it runs is recorded with its source; a key asked for again is a reuse, never a collision;
// a planted encoder failure (a mixer or a digest64 that maps two requests to one hash) is a collision, both sources named;
// the hooks are off outside a run, restored on a throw, and refuse to nest.
import { describe, expect, it } from 'vitest';
import { CONCERNS, createRng, KeyCensus, LaneWriter, packComponents, STAGES, type ConcernId, type Hash128, type StageId } from '@plat/kernel';
import { lineageHash, TOWN_ROOT } from '@plat/model';
import { censusCounts, censusInstalled, spikeRun, withKeyCensus, type KeyCensusResult } from '../../src/determinism/index.js';
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

// Planted encoder failures seen through the hooks (check M0-d-09 B-1): the hooks must record each key's whole source, so
// two different requests that an encoder maps to one hash read as a collision with both sources named, never as a reuse.
const hexOf = (ws: readonly number[]): string => ws.map((w) => (w >>> 0).toString(16).padStart(8, '0')).join('');
const UTF8_LANES = (s: string): number[] => [0x38667475, s.length, ...Array.from(s, (c) => c.charCodeAt(0))];

describe('a planted encoder failure', () => {
  it('a mixer that ignores the concern: two streams of one entity key and stage get one key — a stream-key collision, both sources named', () => {
    const proto = Object.getPrototypeOf(createRng()) as { stream: (...a: unknown[]) => unknown };
    const real = proto.stream;
    // installed before the census, as an encoder bug would be: every concern derives route's key
    proto.stream = function (this: unknown, k: unknown, s: unknown, _c: unknown, o: unknown) {
      return real.call(this, k, s, route, o);
    };
    let r: KeyCensusResult<void>;
    try {
      r = withKeyCensus(() => {
        createRng().stream(KEY, S5, route, OPTS);
        createRng().stream(KEY, S5, plaza, OPTS); // created: another request, the same key
      });
    } finally {
      proto.stream = real;
    }
    expect(r.streams).toMatchObject({ distinct: 1, reused: 0, collisions: 1 });
    expect(r.streams.firstCollision).toEqual({
      hash: expect.stringMatching(/^[0-9a-f]{32}$/),
      first: hexOf([...KEY, ...packComponents(S5, route, OPTS)]),
      second: hexOf([...KEY, ...packComponents(S5, plaza, OPTS)]),
    });
    // the same plant, the same request twice, is a reuse (the sources agree)
    proto.stream = function (this: unknown, k: unknown, s: unknown, _c: unknown, o: unknown) {
      return real.call(this, k, s, route, o);
    };
    try {
      r = withKeyCensus(() => {
        createRng().stream(KEY, S5, plaza, OPTS);
        createRng().stream(KEY, S5, plaza, OPTS);
      });
    } finally {
      proto.stream = real;
    }
    expect(r.streams).toMatchObject({ distinct: 1, reused: 1, collisions: 0, firstCollision: null });
  });
  it('a digest64 that gives two texts one hash: a lineage-hash collision, both sources (their lanes) named', () => {
    const proto = LaneWriter.prototype as unknown as { digest64: (this: LaneWriter) => readonly number[] };
    const real = proto.digest64;
    proto.digest64 = function (this: LaneWriter) {
      real.call(this);
      return [7, 7];
    };
    let r: KeyCensusResult<void>;
    try {
      r = withKeyCensus(() => {
        new LaneWriter().utf8('district:a').digest64();
        new LaneWriter().utf8('district:b').digest64();
        new LaneWriter().u32(1).u32(2).digest64();
        new LaneWriter().u32(1).u32(3).digest64();
      });
    } finally {
      proto.digest64 = real;
    }
    expect(r.lineages).toMatchObject({ distinct: 1, reused: 0, collisions: 3 });
    expect(r.lineages.firstCollision).toEqual({ hash: hexOf([7, 7]), first: hexOf(UTF8_LANES('district:a')), second: hexOf(UTF8_LANES('district:b')) });
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
