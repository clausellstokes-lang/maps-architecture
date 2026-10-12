// PLAT_EDGE_SEEDS (M0-x-06; §13.8's B-EDGE row: "PR on its fixtures; the rung and preset sweep nightly"; §4.13's "the
// home's stated outcome, hard, 0 per 1 000"; C-0100, C-0057's form). The edge suite runs every built fixture at
// PLAT_EDGE_SEEDS seeds: 10 when the variable is unset or empty — the PR size, so a plain `corepack pnpm test` runs what
// the PR tier runs — and 1 000 in M0-f-02b's nightly job `edge-suite (1 000 seeds)`, the bar's "0 per 1 000". Anything
// but a positive decimal integer is refused (C-0057's form: a RangeError naming the value), never read as the default.
//
// A fixture's seeds are its own family (M0-k-01's `seedFamily`, H32 of `edge/<fixture id>/<i>`), so two fixtures never
// share a draw and a failure names the fixture and the seed that replays it.
import { seedFamily } from '../fuzz/seeds.js';

/** The PR size: 10 seeds per fixture (C-0100). */
export const EDGE_SEEDS_PR = 10;

/** The nightly size: 1 000 seeds per fixture, the bar's "0 per 1 000" (C-0100; M0-f-02b's job). */
export const EDGE_SEEDS_NIGHTLY = 1000;

/**
 * PLAT_EDGE_SEEDS as a seed count (C-0100, C-0057's form): EDGE_SEEDS_PR when unset or empty, else a positive decimal
 * integer — anything else (a sign, a fraction, an exponent, a space, a word, 0) is refused with a RangeError.
 */
export function edgeSeedCount(env: Readonly<Record<string, string | undefined>> = process.env): number {
  const raw = env.PLAT_EDGE_SEEDS;
  if (raw === undefined || raw === '') return EDGE_SEEDS_PR;
  if (!/^[1-9][0-9]*$/.test(raw)) throw new RangeError(`PLAT_EDGE_SEEDS must be a positive integer, got ${JSON.stringify(raw)}`);
  const n = Number(raw);
  if (!Number.isSafeInteger(n)) throw new RangeError(`PLAT_EDGE_SEEDS must be a positive integer, got ${JSON.stringify(raw)}`);
  return n;
}

/** Seed i of a fixture's family: H32("edge/<fixture id>/<i>") (M0-k-01's seedFamily), a u32. */
export function edgeSeed(fixtureId: string, i: number): number {
  return seedFamily(`edge/${fixtureId}`, i);
}

/** The first `n` seeds of a fixture's family, in order. */
export function edgeSeeds(fixtureId: string, n: number = edgeSeedCount()): number[] {
  if (!(Number.isInteger(n) && n >= 1)) throw new RangeError(`edgeSeeds: the count is a whole number ≥ 1, got ${String(n)}`);
  const out: number[] = [];
  for (let i = 0; i < n; i += 1) out.push(edgeSeed(fixtureId, i));
  return out;
}
