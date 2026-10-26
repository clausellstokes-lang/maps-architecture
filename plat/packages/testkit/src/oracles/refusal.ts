// An oracle's refusal (M0-k-03, fix round 2; C-0150): the library could not give a region the region check accepts —
// every attempt threw, or answered with a region that is not the operands' (region-check.ts). It is a typed error so
// the comparison can tell it from everything else that may throw: a refusal means "this oracle cannot judge this
// case", never "our engine is wrong" and never "the harness misused the kit" (a Clipper2 call before `loadOracles()`
// stays a plain `oracles: …` usage error).
import type { OracleEngine } from './types.js';

/** A library's refusal to answer one call; its message starts with the engine's name. */
export class OracleRefusal extends Error {
  readonly engine: OracleEngine;

  constructor(engine: OracleEngine, reason: string) {
    super(`${engine}: ${reason}`);
    this.name = 'OracleRefusal';
    this.engine = engine;
  }
}

/** Whether a thrown value is an oracle's refusal. */
export function isOracleRefusal(e: unknown): e is OracleRefusal {
  return e instanceof OracleRefusal;
}
