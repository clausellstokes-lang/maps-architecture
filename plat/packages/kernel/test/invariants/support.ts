// Test support for M0-a-14's invariant suite: the suite's rows by name, a run of random batches (M0-a-06's generator,
// M0-a-13's warp steps) through a transaction environment that carries the suite, and the helpers the fixtures read.
// The oracles M0-a-04 / M0-a-05 wrote (`allProblems`: half-edge links, minEdge, one vertex per lattice point, crossing,
// clearance, level consistency, face records, nesting, Euler) judge the arenas independently of the code under test.
import { expect } from 'vitest';
import { isFaceLive, type FaceId, type Plat } from '../../src/arena/index.js';
import { hardProblems, KERNEL_ROWS, suiteEnv, suiteReport, type BatchContext, type InvariantResult, type SuiteReport } from '../../src/invariants/index.js';
import type { KernelResult } from '../../src/num/index.js';
import { tx, type Committed, type CommitRecord, type KernelTx, type Overlay, type TxEnv } from '../../src/tx/index.js';
import type { Level } from '../../src/types/index.js';
import { randomBatch, rng, type Live, type Mix } from '../tx/fuzzgen.js';
import { allProblems, commit, framed, must, pt, spec, state } from '../tx/support.js';

export { allProblems, commit, framed, must, pt, rng, spec, state };

/** The row names the suite declares. */
export const ROW_NAMES: readonly string[] = KERNEL_ROWS.map((r) => r.name);

/** Is a refusal's detail a suite row's (it starts with a row name and a colon)? */
export function suiteRefusal(detail: string): string | null {
  for (const n of ROW_NAMES) if (detail.startsWith(`${n}: `)) return n;
  return null;
}

/** A row's verdict out of a result list. */
export function rowOf(results: readonly InvariantResult[], name: string): InvariantResult {
  const r = results.find((x) => x.name === name);
  if (r === undefined) throw new Error(`support: no verdict for ${name}`);
  return r;
}

/** Runs one callback batch with the suite's environment; returns its result and the report's line for it. */
export function suiteTx<T>(p: Plat, level: Level, fn: (o: Overlay) => KernelResult<T>, over: Partial<KernelTx> = {}, context: BatchContext = {}, base: TxEnv = {}): { res: KernelResult<Committed<T>>; report: SuiteReport } {
  const report = suiteReport();
  const res = tx(p, spec(level, over), fn, suiteEnv({ context, report, base })) as KernelResult<Committed<T>>;
  return { res, report };
}

/** One random sequence: `steps` batches of the generator, each through the suite's environment. */
export interface FuzzStep {
  readonly kind: string;
  readonly level: Level;
  readonly record: CommitRecord | null;
  readonly refused: string | null;
}

export function fuzzRun(seed: number, steps: number, mix: Mix, onStep?: (p: Plat, s: FuzzStep, report: SuiteReport) => void): { p: Plat; steps: FuzzStep[]; report: SuiteReport } {
  const r = rng(seed);
  const p = framed();
  const live: Live = { ways: [], kerbs: [], next: 0 };
  const report = suiteReport();
  const out: FuzzStep[] = [];
  for (let i = 0; i < steps; i++) {
    const snapshot: Live = { ways: live.ways.slice(), kerbs: live.kerbs.slice(), next: live.next };
    const b = randomBatch(p, live, r, mix);
    const res = tx(p, spec(b.level, { rederivesFrom: 0 as never }), b.fn, suiteEnv({ report }));
    let s: FuzzStep;
    if (res.ok) {
      s = { kind: b.kind, level: b.level, record: res.value.record, refused: null };
    } else {
      live.ways = snapshot.ways;
      live.kerbs = snapshot.kerbs;
      s = { kind: b.kind, level: b.level, record: null, refused: `${res.code} ${res.detail}` };
    }
    out.push(s);
    onStep?.(p, s, report);
  }
  return { p, steps: out, report };
}

/** Expects the suite's hard rows to hold on a result list (the problems quoted when they do not). */
export function expectHolds(results: readonly InvariantResult[]): void {
  expect(hardProblems(results)).toEqual([]);
}

/** The live faces of a level. */
export function facesAt(p: Plat, level: Level): FaceId[] {
  const out: FaceId[] = [];
  for (let f = 0; f < p.slots.face[level].top; f++) if (isFaceLive(p, level, f)) out.push(f);
  return out;
}

export { state as arenaState };
