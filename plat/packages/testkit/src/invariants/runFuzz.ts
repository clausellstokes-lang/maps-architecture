// runFuzz(primitive, n) (M0-k-04; §13.1's bar — 0 crashes, 0 hangs (hard timeout), 0 invalid outputs — at §13.8's
// sizes, 10⁴ PR and 10⁶ nightly per primitive; §5.4's kernel counts; C-0091's work quantiles). Inputs are drawn from the
// primitive's family in chunks of 1 000, chunk c from `seedFamily(family, c)` (M0-k-01's seed form), so a run of any
// size is a prefix of the larger runs and every input replays from (family, index). Each input runs under the hard
// timeout (a hang is a failure, never a wait); a throw is a crash — the kernel never throws for a geometric reason; a
// refusal is counted by its §3.1 code (a typed result is valid); an output that breaks a property its primitive states
// is invalid; a bug abort goes to `bugs`, which the bar requires empty.
import fc from 'fast-check';
import { seedFamily } from '../fuzz/index.js';
import { guarded, HANG_TIMEOUT_MS } from './guard.js';
import { primitiveNamed, unitOf, type OpContext, type Plant, type Primitive } from './primitives.js';
import { bump, nearestRank, sortedCounts } from './support.js';
import type { BugEntry, FuzzFailure, FuzzReport, WorkQuantiles } from './types.js';

/** Inputs drawn per seed of a family (a chunk). */
export const FUZZ_CHUNK = 1_000;

/** How many failures a report keeps (the count is whole). */
const KEEP = 20;

/** `runFuzz`'s options beyond §13.1's two arguments. */
export interface RunFuzzOptions {
  /** The hard timeout per input (ms; default HANG_TIMEOUT_MS). */
  readonly timeoutMs?: number;
  /** The first input's index (default 0): a run of [first, first + n) — the nightly's partitions. */
  readonly first?: number;
  /** A planted fault (the runner's own tests). */
  readonly plant?: Plant;
}

/** The inputs [first, first + n) of a primitive's family, chunk by chunk, with their indices. */
function* inputsOf<I>(prim: Primitive<I>, first: number, n: number): Generator<[number, I]> {
  const end = first + n;
  for (let c = Math.floor(first / FUZZ_CHUNK); c * FUZZ_CHUNK < end; c++) {
    const lo = c * FUZZ_CHUNK;
    const values = fc.sample(prim.arbitrary(), { seed: seedFamily(prim.family, c) | 0, numRuns: Math.min(FUZZ_CHUNK, end - lo) });
    for (let k = 0; k < values.length; k++) {
      const i = lo + k;
      if (i < first) continue;
      if (i >= end) return;
      yield [i, values[k]];
    }
  }
}

/** C-0091's quantiles of one counter's work per unit. */
function quantiles(counter: string, ratios: number[], units: number): WorkQuantiles {
  const s = ratios.slice().sort((a, b) => a - b);
  return { counter, unit: unitOf(counter), n: s.length, p50: nearestRank(s, 0.5), p99: nearestRank(s, 0.99), p999: nearestRank(s, 0.999), max: s.length === 0 ? 0 : s[s.length - 1], units };
}

/**
 * §13.1's B-FUZZ run of one kernel primitive on n inputs of its family: the counts (crashes, hangs, invalid outputs,
 * typed refusals per code, warnings per code, downgrades, work-limit hits), the oracle split where the primitive is
 * oracle-compared, the sampled determinism harnesses, the work quantiles per counter and `bugs`. `primitive` is a name
 * of PRIMITIVES or a primitive (a planted one in the runner's tests). The oracle primitives need `loadOracles()` first.
 */
export function runFuzz(primitive: string | Primitive<unknown>, n: number, opts: RunFuzzOptions = {}): FuzzReport {
  const prim = typeof primitive === 'string' ? primitiveNamed(primitive) : primitive;
  if (!(Number.isInteger(n) && n >= 1)) throw new RangeError(`runFuzz: n is a whole number of inputs ≥ 1, got ${String(n)} (§13.8 Edges: an empty family fails, never passes vacuously)`);
  const first = opts.first ?? 0;
  if (!(Number.isInteger(first) && first >= 0)) throw new RangeError(`runFuzz: first is a whole index ≥ 0, got ${String(first)}`);
  const timeoutMs = opts.timeoutMs ?? HANG_TIMEOUT_MS;
  let crashes = 0;
  let hangs = 0;
  let invalid = 0;
  let okCount = 0;
  let downgrades = 0;
  let workLimitHits = 0;
  let failed = 0;
  let runs = 0;
  const refused = new Map<string, number>();
  const warnings = new Map<string, number>();
  const notes = new Map<string, number>();
  const ratios = new Map<string, number[]>();
  const unitSums = new Map<string, number>();
  const oracle = { unattracted: 0, attracted: 0, refused: 0 };
  const sampled = { renumbering: 0, permutation: 0 };
  const bugs: BugEntry[] = [];
  const failures: FuzzFailure[] = [];
  const fail = (index: number, kind: FuzzFailure['kind'], reason: string): void => {
    failed++;
    if (failures.length < KEEP) failures.push({ primitive: prim.name, index, kind, reason: reason.slice(0, 600) });
  };
  for (const [index, input] of inputsOf(prim, first, n)) {
    runs++;
    const ctx: OpContext = opts.plant === undefined ? { index } : { index, plant: opts.plant };
    const g = guarded(() => prim.run(input, ctx), timeoutMs);
    if (g.kind === 'crash') {
      crashes++;
      fail(index, 'crash', g.message);
      continue;
    }
    if (g.kind === 'hang') {
      hangs++;
      fail(index, 'hang', `no result within the hard timeout of ${String(g.ms)} ms`);
      continue;
    }
    const out = g.value;
    if (out.code === 'ok') okCount++;
    else bump(refused, out.code);
    if (out.code === 'E_WORK_LIMIT') workLimitHits++;
    if (out.downgrade === true) downgrades++;
    for (const w of out.warnings) bump(warnings, w.code, w.count);
    for (const x of out.notes ?? []) bump(notes, x);
    for (const w of out.work ?? []) {
      const list = ratios.get(w.counter) ?? [];
      list.push(w.charged / w.units);
      ratios.set(w.counter, list);
      bump(unitSums, w.counter, w.units);
    }
    if (out.split !== undefined) oracle[out.split]++;
    if (out.sampled !== undefined) {
      sampled.renumbering++;
      sampled.permutation++;
    }
    if (out.bug !== undefined) {
      bugs.push(out.bug);
      fail(index, 'bug', `a bug abort: ${out.bug.cls} on ${out.bug.entity}`);
    }
    if (out.problems.length > 0) {
      invalid++;
      fail(index, 'invalid', out.problems.slice(0, 3).join('; '));
    }
  }
  const work = [...ratios.keys()].sort().map((c) => quantiles(c, ratios.get(c) as number[], unitSums.get(c) ?? 0));
  return {
    primitive: prim.name,
    family: prim.family,
    runs,
    crashes,
    hangs,
    invalid,
    ok: okCount,
    refused: sortedCounts(refused),
    warnings: sortedCounts(warnings),
    notes: sortedCounts(notes),
    downgrades,
    workLimitHits,
    oracle: prim.oracles === true ? oracle : null,
    sampled,
    work,
    bugs,
    failures,
    failed,
  };
}
