// An oracle's refusal (M0-k-03, fix round 2; C-0150): the library could not give a region the region check accepts —
// every attempt threw, or answered with a region that is not the operands' (region-check.ts), or (hardening round S1;
// KI-6, C-0399) ran past its step budget, where polygon-clipping's sweep would otherwise never return. It is a typed
// error so the comparison can tell it from everything else that may throw: a refusal means "this oracle cannot judge
// this case", never "our engine is wrong" and never "the harness misused the kit" (a Clipper2 call before
// `loadOracles()` stays a plain `oracles: …` usage error).
//
// A refusal carries the run's replay seed (L18, C-0399): fast-check's global seed — the one PLAT_FUZZ_SEED fixes
// through the vitest setup file (C-0057), or one a harness configured — or null when the run has none, so a refusal
// met in a run says how to replay it. The message is unchanged by the seed (the harnesses print it apart).
import fc from 'fast-check';
import type { OracleEngine } from './types.js';

/** What a refusal records besides its reason. */
export interface OracleRefusalDetail {
  /** True when an attempt ran past its step budget (polygon-clipping; `polygon-clipping.ts`, KI-6). */
  readonly overran?: boolean;
}

/** The run's replay seed: fast-check's global seed (PLAT_FUZZ_SEED through the vitest setup, C-0057), or null. */
export function replaySeed(): number | null {
  const seed = fc.readConfigureGlobal().seed;
  return typeof seed === 'number' ? seed : null;
}

/** A library's refusal to answer one call; its message starts with the engine's name. */
export class OracleRefusal extends Error {
  readonly engine: OracleEngine;
  /** The run's replay seed when the refusal was made (`replaySeed()`), or null for an unseeded run. */
  readonly seed: number | null;
  /** True when an attempt ran past its step budget (KI-6): the library would not have returned. */
  readonly overran: boolean;

  constructor(engine: OracleEngine, reason: string, detail: OracleRefusalDetail = {}) {
    super(`${engine}: ${reason}`);
    this.name = 'OracleRefusal';
    this.engine = engine;
    this.seed = replaySeed();
    this.overran = detail.overran === true;
  }
}

/** Whether a thrown value is an oracle's refusal. */
export function isOracleRefusal(e: unknown): e is OracleRefusal {
  return e instanceof OracleRefusal;
}
