// Rng.stream — one derivation's streams (item M0-d-01; §14 `Rng`, §6.1 "A stream is created once per derivation and
// continued; a second request in the same derivation returns the same stream"), the distinctness harness (§6.1, run by
// M0-d-09 over the spike city) and the textual key form for reports.
import { describe, expect, it } from 'vitest';
import type { Hash128 } from '../../src/hash/index.js';
import { CONCERN_COUNT, CONCERNS, STAGE_COUNT, STAGE_VIEW, STAGES } from '../../src/registry/index.js';
import { KeyCensus } from '../../src/rng/census.js';
import { entityKey, packComponents, seedKey, streamKey } from '../../src/rng/mixer.js';
import { createRng } from '../../src/rng/rng.js';
import { Stream } from '../../src/rng/stream.js';
import { concernText, keyText, stageText } from '../../src/rng/text.js';
import type { ConcernId, StageId, StreamOpts } from '../../src/types/index.js';
import { unfinalise } from './invert.js';

const SK = seedKey(7);
const TOWN = entityKey(SK, [0x5eed, 0], { layer: 'ground', part: 0 });
const PLOT = entityKey(SK, [0x1234, 0x5678], { layer: 'ground', part: 0 });
const O: StreamOpts = { reroll: 0, attempt: 0, epoch: 0, salt: 0 };

describe('Rng.stream: one derivation, one stream per key, continued', () => {
  it('returns the same stream to a second request in the same derivation, continued from where it stopped', () => {
    const rng = createRng();
    const a = rng.stream(PLOT, STAGES.S11, CONCERNS.siteplan, O);
    const first = [a.u32(), a.u32()];
    const b = rng.stream(PLOT, STAGES.S11, CONCERNS.siteplan, { ...O });
    expect(b).toBe(a);
    const fresh = new Stream(streamKey(PLOT, STAGES.S11, CONCERNS.siteplan, O));
    expect([fresh.u32(), fresh.u32()]).toEqual(first);
    expect(b.u32()).toBe(fresh.u32());
    expect(rng.streams).toBe(1);
  });

  it('seeds each stream with the one mixer\'s key', () => {
    const rng = createRng();
    const s = rng.stream(TOWN, STAGES.S1, CONCERNS['terrain.noise'], O);
    expect(s.key).toEqual(streamKey(TOWN, STAGES.S1, CONCERNS['terrain.noise'], O));
  });

  it('gives a new derivation its own streams, starting again from the key', () => {
    const one = createRng().stream(PLOT, STAGES.S10, CONCERNS['plot.width'], O);
    one.u32();
    const two = createRng().stream(PLOT, STAGES.S10, CONCERNS['plot.width'], O);
    expect(two).not.toBe(one);
    expect(two.u32()).toBe(new Stream(one.key).u32());
  });

  it('keeps streams of different components apart, STAGE_VIEW among the stages', () => {
    const rng = createRng();
    const variants: [StageId, ConcernId, StreamOpts][] = [
      [STAGES.S11, CONCERNS.siteplan, O],
      [STAGES.S11, CONCERNS.heights, O],
      [STAGES.S10, CONCERNS.siteplan, O],
      [STAGE_VIEW, CONCERNS['style.jitter'], O],
      [STAGES.S11, CONCERNS.siteplan, { ...O, reroll: 1 }],
      [STAGES.S11, CONCERNS.siteplan, { ...O, attempt: 1 }],
      [STAGES.S11, CONCERNS.siteplan, { ...O, epoch: 1 }],
      [STAGES.S11, CONCERNS.siteplan, { ...O, salt: 1 }],
    ];
    const streams = variants.map(([st, c, o]) => rng.stream(PLOT, st, c, o));
    expect(new Set(streams).size).toBe(variants.length);
    expect(new Set(streams.map((s) => s.u32())).size).toBe(variants.length);
    expect(rng.streams).toBe(variants.length);
    expect(rng.stream(TOWN, STAGES.S11, CONCERNS.siteplan, O)).not.toBe(streams[0]);
  });

  it('holds many streams of one derivation apart and finds each again (the cache over 10⁴ keys)', () => {
    const rng = createRng();
    const made = [];
    for (let e = 0; e < 10000; e += 1) made.push(rng.stream(PLOT, STAGES.S5, CONCERNS['growth.heading'], { ...O, epoch: e }));
    expect(rng.streams).toBe(10000);
    for (let e = 0; e < 10000; e += 1) expect(rng.stream(PLOT, STAGES.S5, CONCERNS['growth.heading'], { ...O, epoch: e })).toBe(made[e]);
  }, 120_000);

  // Rng.stream keeps a derivation's streams by 30 bits of their key's word 0 (src/rng/rng.ts); a bucket that two or more
  // streams share becomes an array, searched on every request and extended on every new stream. Entity keys are built
  // here by inverting the finaliser round, so each stream key is chosen exactly (checks/M0-d-01.md F-1).
  it('returns the same stream to every later request when several streams share one bucket (a bucket of six and one of two)', () => {
    const bucket = (k: readonly number[]): number => k[0] & 0x3fffffff;
    const A = 0x0badcafe & 0x3fffffff;
    const B = 0x01234567;
    type Want = { key: Hash128; stage: StageId; concern: ConcernId; opts: StreamOpts };
    const want = (key: Hash128, stage: StageId = STAGES.S11, concern: ConcernId = CONCERNS.siteplan, opts: StreamOpts = O): Want => ({
      key,
      stage,
      concern,
      opts,
    });
    const wants: Want[] = [
      want([A, 0x11111111, 0x22222222, 0x33333333]), // bucket A: the first stream (held alone)
      want([B, 5, 6, 7]), // bucket B: the first
      want([(A | 0x40000000) >>> 0, 0x11111111, 0x22222222, 0x33333333], STAGE_VIEW, CONCERNS['style.jitter']), // A becomes an array
      want([(A | 0x80000000) >>> 0, 0x11111111, 0x22222222, 0x33333333], STAGES.S5, CONCERNS['growth.heading'], { ...O, epoch: 9 }), // pushed
      want([(B | 0xc0000000) >>> 0, 5, 6, 7], STAGES.S8, CONCERNS['cut.t'], { ...O, attempt: 2 }), // B becomes an array
      want([A, 0x11111112, 0x22222222, 0x33333333]), // pushed; differs from the first in word 1 only
      want([A, 0x11111111, 0x22222223, 0x33333333], STAGES.S11, CONCERNS.siteplan, { ...O, salt: 3 }), // word 2 only
      want([A, 0x11111111, 0x22222222, 0x33333334], STAGES.S11, CONCERNS.heights, { ...O, reroll: 1 }), // word 3 only
    ];
    // the entity key whose stream key under (stage, concern, opts) is exactly `key`: finalise(entity ⊕ packed) = key
    const entityOf = (w: Want): Hash128 => {
      const pre = unfinalise(w.key);
      const p = packComponents(w.stage, w.concern, w.opts);
      return [(pre[0] ^ p[0]) >>> 0, (pre[1] ^ p[1]) >>> 0, (pre[2] ^ p[2]) >>> 0, (pre[3] ^ p[3]) >>> 0];
    };
    const entities = wants.map(entityOf);
    for (let i = 0; i < wants.length; i += 1) expect(streamKey(entities[i], wants[i].stage, wants[i].concern, wants[i].opts)).toEqual(wants[i].key);
    expect(wants.filter((w) => bucket(w.key) === A)).toHaveLength(6);
    expect(wants.filter((w) => bucket(w.key) === B)).toHaveLength(2);

    const rng = createRng();
    const made = wants.map((w, i) => rng.stream(entities[i], w.stage, w.concern, w.opts));
    made.forEach((s, i) => expect(s.key).toEqual(wants[i].key)); // each a stream of its own key, none another's
    expect(new Set(made).size).toBe(wants.length);
    expect(rng.streams).toBe(wants.length);
    const first = made.map((s) => s.u32()); // advance each, so a re-made stream would show
    // every stream asked for again, last first: the same object, continued
    for (let i = wants.length - 1; i >= 0; i -= 1) {
      const again = rng.stream(entities[i], wants[i].stage, wants[i].concern, { ...wants[i].opts });
      expect(again).toBe(made[i]);
      const fresh = new Stream(wants[i].key);
      expect(fresh.u32()).toBe(first[i]);
      expect(again.u32()).toBe(fresh.u32());
    }
    expect(rng.streams).toBe(wants.length);
  });

  it('finds every stream again across the shared buckets 10⁵ entities fall into naturally', () => {
    const rng = createRng();
    const n = 100_000;
    const ents: Hash128[] = [];
    const made: Stream[] = [];
    const perBucket = new Map<number, number>();
    for (let i = 0; i < n; i += 1) {
      const e = entityKey(SK, [i, Math.imul(i, 0x9e3779b1) >>> 0], { layer: 'ground', part: 0 });
      const s = rng.stream(e, STAGES.S11, CONCERNS.siteplan, O);
      ents.push(e);
      made.push(s);
      const b = s.key[0] & 0x3fffffff;
      perBucket.set(b, (perBucket.get(b) ?? 0) + 1);
    }
    let shared = 0;
    for (const c of perBucket.values()) if (c > 1) shared += 1;
    expect(shared).toBeGreaterThan(0); // the bucket path is reached in real use, not only by construction
    expect(rng.streams).toBe(n);
    for (let i = 0; i < n; i += 1) expect(rng.stream(ents[i], STAGES.S11, CONCERNS.siteplan, O)).toBe(made[i]);
    expect(rng.streams).toBe(n);
  }, 120_000);

  it('refuses what the mixer refuses: a retired concern, an attempt past the cap, an unregistered stage', () => {
    const rng = createRng();
    expect(() => rng.stream(PLOT, STAGES.S8, CONCERNS['cut.side'], O)).toThrow(RangeError);
    expect(() => rng.stream(PLOT, STAGES.S8, CONCERNS['cut.stop'], { ...O, attempt: 1 })).toThrow(RangeError);
    expect(() => rng.stream(PLOT, 999 as StageId, CONCERNS.route, O)).toThrow(RangeError);
    expect(rng.streams).toBe(0);
  });
});

describe('the distinctness harness (§6.1; M0-d-09 runs it over the spike city)', () => {
  it('records every stream a derivation creates; a stream asked for again in another derivation is a reuse, never a collision', () => {
    const census = new KeyCensus(4);
    const one = createRng({ census });
    const two = createRng({ census });
    one.stream(PLOT, STAGES.S11, CONCERNS.siteplan, O);
    one.stream(PLOT, STAGES.S11, CONCERNS.siteplan, O); // a cache hit: not recorded again
    one.stream(PLOT, STAGES.S11, CONCERNS.heights, O);
    two.stream(PLOT, STAGES.S11, CONCERNS.siteplan, O);
    expect([census.size, census.reused, census.collisions]).toEqual([2, 1, 0]);
  });

  it('reports a collision — one hash from two different sources — with the hash and both sources', () => {
    const census = new KeyCensus(4);
    const key: Hash128 = [1, 2, 3, 4];
    expect(census.add(key, [9, 9])).toBe('new');
    expect(census.add(key, [9, 9])).toBe('reused');
    expect(census.add(key, [9, 8])).toBe('collision');
    expect(census.add([1, 2, 3, 5], [9, 8])).toBe('new');
    expect(census.collisions).toBe(1);
    expect(census.firstCollision).toEqual({ hash: [1, 2, 3, 4], first: [9, 9], second: [9, 8] });
  });

  it('tells a source from a longer one it begins: one hash from [9, 9] and [9, 9, 7] is a collision in either order (C-0143 (6))', () => {
    // add() takes a source of any number of words, so a source that extends an earlier one of the same hash is another
    // source — a collision the distinctness bar must see, never a reuse (checks/M0-d-01.md F-9)
    const key: Hash128 = [1, 2, 3, 4];
    const shortFirst = new KeyCensus(4);
    expect(shortFirst.add(key, [9, 9])).toBe('new');
    expect(shortFirst.add(key, [9, 9, 7])).toBe('collision');
    expect(shortFirst.add(key, [9, 9])).toBe('reused');
    expect(shortFirst.firstCollision).toEqual({ hash: [1, 2, 3, 4], first: [9, 9], second: [9, 9, 7] });
    const longFirst = new KeyCensus(4);
    expect(longFirst.add(key, [9, 9, 7])).toBe('new');
    expect(longFirst.add(key, [9, 9])).toBe('collision');
    expect(longFirst.add(key, [9, 9, 7])).toBe('reused');
    const empty = new KeyCensus(4); // the empty source is a source too
    expect(empty.add(key, [])).toBe('new');
    expect(empty.add(key, [0])).toBe('collision');
    expect(empty.add(key, [])).toBe('reused');
    expect([shortFirst.collisions, longFirst.collisions, empty.collisions]).toEqual([1, 1, 1]);
  });

  it('holds lineage hashes too (two words) and grows past its first capacity', () => {
    const census = new KeyCensus(2, 4);
    for (let i = 0; i < 50000; i += 1) expect(census.add([i, Math.imul(i, 0x9e3779b1) >>> 0], [i])).toBe('new');
    for (let i = 0; i < 50000; i += 7) expect(census.add([i, Math.imul(i, 0x9e3779b1) >>> 0], [i])).toBe('reused');
    expect(census.size).toBe(50000);
    expect(census.collisions).toBe(0);
    // every hash is found again after the growths, those stored just before each one among them
    const small = new KeyCensus(2, 4);
    for (let i = 0; i < 300; i += 1) small.add([i, 7], [i]);
    for (let i = 0; i < 300; i += 1) expect(small.add([i, 7], [i]), `hash ${String(i)}`).toBe('reused');
    for (let i = 0; i < 300; i += 1) expect(small.add([i, 7], [i, 1]), `hash ${String(i)}`).toBe('collision');
    expect([small.size, small.reused, small.collisions]).toEqual([300, 300, 300]);
  }, 120_000);

  it('tells hashes apart by every word, keeps sources of any length, and finds all-zero hashes after a growth', () => {
    // hashes that differ in one word only, at each of the four positions: all distinct, then all found again
    const census = new KeyCensus(4, 4);
    for (let pos = 0; pos < 4; pos += 1) {
      for (let i = 0; i < 500; i += 1) {
        const h = [7, 7, 7, 7];
        h[pos] = i;
        expect(census.add(h, [pos, i]), `word ${String(pos)} = ${String(i)}`).toBe(i === 7 ? (pos === 0 ? 'new' : 'collision') : 'new');
      }
    }
    expect([census.size, census.collisions]).toEqual([1997, 3]); // [7, 7, 7, 7] four times: new, then three other sources
    for (let pos = 0; pos < 4; pos += 1) {
      for (let i = 0; i < 500; i += 1) {
        const h = [7, 7, 7, 7];
        h[pos] = i;
        if (i !== 7) expect(census.add(h, [pos, i])).toBe('reused');
      }
    }
    // a source far longer than the store's first room, again and then with its last word changed
    const long = Array.from({ length: 5000 }, (_, i) => i);
    const big = new KeyCensus(2, 4);
    expect(big.add([1, 1], long)).toBe('new');
    expect(big.add([2, 2], long)).toBe('new');
    expect(big.add([1, 1], [...long])).toBe('reused');
    expect(big.add([2, 2], [...long.slice(0, 4999), 0])).toBe('collision');
    expect(big.firstCollision?.first).toEqual(long);
    // the first add after a growth may be the all-zero hash: new, then reused
    const z = new KeyCensus(2, 4);
    for (let i = 1; i <= 9; i += 1) z.add([i, i], [i]); // the ninth add grows the table
    expect(z.add([0, 0], [5])).toBe('new');
    expect(z.add([0, 0], [5])).toBe('reused');
    expect(z.collisions).toBe(0);
  });

  it('records a stream key with its entity key and packed components as the source', () => {
    const census = new KeyCensus(4);
    const rng = createRng({ census });
    const s = rng.stream(TOWN, STAGES.S4, CONCERNS.route, O);
    const again = new KeyCensus(4);
    expect(again.add(s.key, [...TOWN, ...packComponents(STAGES.S4, CONCERNS.route, O)])).toBe('new');
    expect(census.add(s.key, [...TOWN, ...packComponents(STAGES.S4, CONCERNS.route, O)])).toBe('reused');
  });

  it('refuses a hash of the wrong width and non-u32 words', () => {
    const census = new KeyCensus(4);
    expect(() => census.add([1, 2], [])).toThrow(RangeError);
    expect(() => census.add([1, 2, 3, -4], [])).toThrow(RangeError);
    expect(() => census.add([1, 2, 3, 4], [0.5])).toThrow(RangeError);
    expect(() => census.add([-1, 2, 3, 4], [])).toThrow(/word 0 is not a u32/);
    expect(() => census.add([1, 2, 3, 4], [1, 0.5])).toThrow(/word 1 is not a u32/);
    expect(() => census.add([1, 2, 3, 4], [1, 2, 2 ** 32])).toThrow(/word 2 is not a u32/);
    expect(census.size).toBe(0); // nothing recorded by a refused add
    expect(() => new KeyCensus(0)).toThrow(RangeError);
  });

  it('holds hashes of 1 … 8 words, four (a stream key) by default, and refuses any other width', () => {
    expect(new KeyCensus().width).toBe(4);
    for (const w of [1, 2, 8]) {
      const census = new KeyCensus(w);
      const hash = Array.from({ length: w }, (_, i) => i + 1);
      expect(census.add(hash, [1])).toBe('new');
      expect(census.add(hash, [1])).toBe('reused');
      expect(census.add(hash, [2])).toBe('collision');
      expect(() => census.add([...hash, 0], [1])).toThrow(RangeError);
    }
    for (const w of [0, 9, -1, 1.5, Number.NaN]) expect(() => new KeyCensus(w), `width ${String(w)}`).toThrow(/width .* is not 1 … 8/);
  });
});

describe('keyText: the textual form of a stream key, for reports only (§6.1)', () => {
  it('renders stage/concern@entity with the non-zero components', () => {
    expect(keyText({ entity: 'plot:7kq2m9x4c1b0a', stage: STAGES.S11, concern: CONCERNS.siteplan, reroll: 1, attempt: 2, epoch: 0 })).toBe(
      'S11/siteplan@plot:7kq2m9x4c1b0a/r=1/a=2',
    );
    expect(keyText({ entity: 'face:abc', stage: STAGES.S8, concern: CONCERNS['cut.stop'] })).toBe('S8/cut.stop@face:abc');
    expect(keyText({ entity: 'town', stage: STAGE_VIEW, concern: CONCERNS['style.compass'], epoch: 3, salt: 2 })).toBe('VIEW/style.compass@town/e=3/s=2');
    expect(keyText({ entity: 'x', stage: STAGES['S8.seed'], concern: CONCERNS['view.weather'] })).toBe('S8.seed/view.weather@x');
    expect(keyText({ entity: 'x', stage: 4000 as StageId, concern: 4000 as ConcernId })).toBe('#4000/#4000@x');
  });

  it('renders no component given as 0 — reroll, attempt, epoch and salt alike (C-0143 (4): "each non-zero component")', () => {
    // checks/M0-d-01.md F-8: each of the four is given explicitly as 0, together and one at a time beside a non-zero one
    const c = { entity: 'plot:7kq2m9x4c1b0a', stage: STAGES.S11, concern: CONCERNS.siteplan };
    expect(keyText({ ...c, reroll: 0, attempt: 0, epoch: 0, salt: 0 })).toBe('S11/siteplan@plot:7kq2m9x4c1b0a');
    expect(keyText({ ...c, reroll: 0, attempt: 1, epoch: 1, salt: 1 })).toBe('S11/siteplan@plot:7kq2m9x4c1b0a/a=1/e=1/s=1');
    expect(keyText({ ...c, reroll: 1, attempt: 0, epoch: 1, salt: 1 })).toBe('S11/siteplan@plot:7kq2m9x4c1b0a/r=1/e=1/s=1');
    expect(keyText({ ...c, reroll: 1, attempt: 1, epoch: 0, salt: 1 })).toBe('S11/siteplan@plot:7kq2m9x4c1b0a/r=1/a=1/s=1');
    expect(keyText({ ...c, reroll: 1, attempt: 1, epoch: 1, salt: 0 })).toBe('S11/siteplan@plot:7kq2m9x4c1b0a/r=1/a=1/e=1');
  });

  it('names every registered stage and concern, the first and the last among them, and #n for any other id', () => {
    expect(stageText(0)).toBe('S0');
    expect(stageText(STAGE_COUNT - 1)).toBe('S8.seed');
    expect(stageText(STAGE_VIEW)).toBe('VIEW');
    for (const id of [STAGE_COUNT, -1, 1.5, STAGE_VIEW - 1]) expect(stageText(id)).toBe(`#${String(id)}`);
    expect(concernText(0)).toBe('terrain.noise');
    expect(concernText(CONCERN_COUNT - 1)).toBe('view.weather');
    for (const id of [CONCERN_COUNT, -1, 1.5]) expect(concernText(id)).toBe(`#${String(id)}`);
  });
});
