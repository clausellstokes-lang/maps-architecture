// The distinctness census over a spike run (M0-d-09; §6.1 *Distinctness*: "a CI test asserts that every stream key and
// every lineage hash in a B-CITY city … is distinct … the test guards the encoder, not the arithmetic"; C-0143: "M0-d-09's
// spike runner passes one [KeyCensus] to createRng and to the lineage minting over the spike city").
//
// The runner's `census` option (M0-x-02) reaches only the Rng the runner gives each stage run; five stage modules make
// their own Rng (S3's fixture and commits, S5's main roads and proposals, S6, the fields' pass 1, S8's fabric), and the
// lineage minting (`lineageHash`, the seed lineages of S6) has no census hook at all. So the spike's census is installed
// around the whole run, bench-side (C-0268 (4)): while `withKeyCensus` runs its function,
//   * every Rng's `stream` (the one class behind `createRng`) records each stream it CREATES — its key with its source,
//     the entity key's four words and the four packed component words, exactly what `RngOptions.census` records;
//   * every `LaneWriter.digest64` (the one form a lineage hash takes, §6.3, C-0132: `lineageHash`, S6's text and face
//     seed lineages, the user token hash) records its 64-bit hash with its source, the lanes written since the writer's
//     last reset.
// A hash met again with the same source is a reuse (the same key asked for twice); met with a different source it is a
// collision — an encoder failure the bar fails on. The originals are restored when the function returns or throws.
// Bench code only: no model package is changed, and the hooks are off outside `withKeyCensus`.
import { createRng, KeyCensus, LaneWriter, packComponents, type ConcernId, type Hash128, type StageId, type StreamOpts } from '@plat/kernel';

/** What one census saw. */
export interface CensusCounts {
  /** Distinct hashes recorded. */
  readonly distinct: number;
  /** Adds whose hash and source were both seen before (the same key asked for again). */
  readonly reused: number;
  /** Adds whose hash was seen before with a different source (an encoder failure). */
  readonly collisions: number;
  /** The first collision's hash and two sources, as hexadecimal words; null when none. */
  readonly firstCollision: { readonly hash: string; readonly first: string; readonly second: string } | null;
}

/** The two censuses of one run. */
export interface KeyCensusResult<T> {
  readonly value: T;
  /** Stream keys (4 words each). */
  readonly streams: CensusCounts;
  /** Lineage hashes (2 words each). */
  readonly lineages: CensusCounts;
}

const hexWords = (ws: readonly number[]): string => ws.map((w) => (w >>> 0).toString(16).padStart(8, '0')).join('');

/** A census's counts. */
export function censusCounts(c: KeyCensus): CensusCounts {
  const f = c.firstCollision;
  return Object.freeze({
    distinct: c.size,
    reused: c.reused,
    collisions: c.collisions,
    firstCollision: f === undefined ? null : Object.freeze({ hash: hexWords(f.hash), first: hexWords(f.first), second: hexWords(f.second) }),
  });
}

type StreamFn = (entityKey: Readonly<Hash128>, stage: StageId, concern: ConcernId, opts: StreamOpts) => { readonly key: Readonly<Hash128> };

interface WriterProto {
  reset(): unknown;
  u32(v: number): unknown;
  i32(v: number): unknown;
  f64(v: number): unknown;
  utf8(s: string): unknown;
  digest64(): readonly number[];
}

const UTF8_TAG = 0x38667475; // 'utf8': a string's lanes in a source, so ("ab") and two u32 lanes never read alike
const F64 = new DataView(new ArrayBuffer(8));

let active = false;

/**
 * Runs `fn` with every stream creation and every lineage hash recorded into two fresh censuses. Not re-entrant: a
 * nested call is refused (one census per run).
 */
export function withKeyCensus<T>(fn: () => T): KeyCensusResult<T> {
  if (active) throw new Error('withKeyCensus: a census is already installed (one per run)');
  const streams = new KeyCensus(4, 1 << 14);
  const lineages = new KeyCensus(2, 1 << 14);
  const rngProto = Object.getPrototypeOf(createRng()) as { stream: StreamFn; streams?: number };
  const realStream = rngProto.stream;
  const wProto = LaneWriter.prototype as unknown as WriterProto;
  const real = { reset: wProto.reset, u32: wProto.u32, i32: wProto.i32, f64: wProto.f64, utf8: wProto.utf8, digest64: wProto.digest64 };
  const lanes = new WeakMap<object, number[]>();
  const lanesOf = (w: object): number[] => {
    let l = lanes.get(w);
    if (l === undefined) {
      l = [];
      lanes.set(w, l);
    }
    return l;
  };
  const source = new Uint32Array(8);
  active = true;
  rngProto.stream = function (this: { streams: number }, entityKey, stage, concern, opts) {
    const before = this.streams;
    const s = realStream.call(this, entityKey, stage, concern, opts);
    if (this.streams !== before) {
      const packed = packComponents(stage, concern, opts);
      for (let i = 0; i < 4; i += 1) {
        source[i] = entityKey[i];
        source[4 + i] = packed[i];
      }
      streams.add(s.key, source);
    }
    return s;
  };
  wProto.reset = function (this: object) {
    lanes.delete(this);
    return real.reset.call(this);
  };
  wProto.u32 = function (this: object, v: number) {
    const r = real.u32.call(this, v);
    lanesOf(this).push(v);
    return r;
  };
  wProto.i32 = function (this: object, v: number) {
    const r = real.i32.call(this, v);
    lanesOf(this).push(v >>> 0);
    return r;
  };
  wProto.f64 = function (this: object, v: number) {
    const r = real.f64.call(this, v);
    F64.setFloat64(0, v === 0 ? 0 : v, true);
    lanesOf(this).push(F64.getUint32(0, true), F64.getUint32(4, true));
    return r;
  };
  wProto.utf8 = function (this: object, s: string) {
    const r = real.utf8.call(this, s);
    const l = lanesOf(this);
    l.push(UTF8_TAG, s.length);
    for (let i = 0; i < s.length; i += 1) l.push(s.charCodeAt(i));
    return r;
  };
  wProto.digest64 = function (this: object) {
    const h = real.digest64.call(this);
    lineages.add(h, lanesOf(this));
    return h;
  };
  try {
    const value = fn();
    return Object.freeze({ value, streams: censusCounts(streams), lineages: censusCounts(lineages) });
  } finally {
    rngProto.stream = realStream;
    wProto.reset = real.reset;
    wProto.u32 = real.u32;
    wProto.i32 = real.i32;
    wProto.f64 = real.f64;
    wProto.utf8 = real.utf8;
    wProto.digest64 = real.digest64;
    active = false;
  }
}

/** Whether a census is installed now (a test's check that the hooks are off outside a run). */
export function censusInstalled(): boolean {
  return active;
}
