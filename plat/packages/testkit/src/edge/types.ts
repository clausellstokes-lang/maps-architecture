// The edge suite's types (M0-x-06; §13.2 B-EDGE: "one fixture per row of §4.13's edge table (its EP rows) and per cell of
// its combination table … the home's stated outcome, hard, 0 per 1 000"; §13.1's ladder coverage, per failure class one
// degenerate input of each kind; C-0100, C-0118). M0-work.json's interface: `EDGE_FIXTURES: EdgeFixture[] { id (an EP
// row, a cell or a (class, kind) pair), home (the section), run(seed), expect, milestone? }`.

/**
 * How a fixture's degenerate input or limit was met (§4.13's ladder column, §5.1's tiers, §3.11's outcomes):
 *   absorbed      the kernel took it by §3.11's rule (one vertex, one shared stretch, simple runs, decimation) and the
 *                 stage committed valid geometry — nothing degenerate stands;
 *   laddered      the kernel (or the stage's own tier-1 check) refused it and the stage's ladder took a rung, named in the
 *                 stage's record — a retry, a simpler shape, a repair;
 *   left-out      the piece was left out and reported (tier 6), the stage going on;
 *   refused-safe  the stage refused it as a whole — typed (a §3.1 code), the batch rolled back, one `bugs` entry naming
 *                 the stage, the next stages run (§5.1 (8)'s defined state) — the fail-safe end where the stage's ladder
 *                 has no rung for it at M0 (C-0273 (6): a known shortfall for the hardening pass, pinned per cell);
 *   defined       the home's stated outcome where its row's rung is "— (defined)";
 *   off           the outcome is none of the above: the fixture fails.
 */
export type EdgeHandling = 'absorbed' | 'laddered' | 'left-out' | 'refused-safe' | 'defined' | 'off';

/** One run of a fixture at one seed: how it was handled, the rung or code that names it, and its fail-safety problems. */
export interface EdgeOutcome {
  readonly handling: EdgeHandling;
  /** The rung the stage's record names, or the code the refusal carried (§3.1), or the defined outcome's name. */
  readonly rung: string;
  /** The kernel's answer where one was met: its §3.1 code, or `ok` with the §3.11 warnings it reported. */
  readonly kernel?: string;
  /** Every violation of the fixture's precondition or of fail-safety: a throw, a restart, an invalid arena, a degenerate
   * commit, a precondition that did not hold — each one sentence. Empty on a clean run. */
  readonly problems: readonly string[];
  /** The outcome's facts, numbers and words only (the summary's counts read `handling` and `rung`). */
  readonly facts: Readonly<Record<string, number | string | boolean>>;
}

/** A fixture's expected outcome: the home's words, the handlings it allows (pinned per fixture), and its own judge. */
export interface EdgeExpect {
  /** The home's stated outcome, in its words. */
  readonly outcome: string;
  /** The handlings the home's outcome allows for this fixture (§4.13's ladder column; C-0273 (6) for refused-safe). */
  readonly allowed: readonly EdgeHandling[];
  /** A refused-safe cell's pinned refusal (§3.1 codes) and the known-issue line it is listed under. */
  readonly refusal?: { readonly codes: readonly string[]; readonly known: string };
  /** The fixture's own check of the outcome's facts: null when it holds, else the reason. */
  readonly judge?: (o: EdgeOutcome) => string | null;
}

/** One fixture of the edge suite. */
export interface EdgeFixture {
  /** An EP row (`EP-04/S5b`), a combination cell (`cell/river×frame`), a (class, kind) pair (`class/F-CUT/collinear`)
   * or an EP-01 cell (`EP-01/S4/zero-length`). */
  readonly id: string;
  /** The section that states the outcome (its home). */
  readonly home: string;
  /** Runs the fixture at one seed on the real stages (M0-x-04's registration through M0-x-02's runner, or an item's
   * Stage object or home function on a prepared arena). A fixture deferred to a milestone throws notBuilt. */
  run(seed: number): EdgeOutcome;
  readonly expect: EdgeExpect;
  /** The milestone that lands the fixture's mechanism, when not M0 (its run is a notBuilt stub). */
  readonly milestone?: string;
}

/** The verdict on one run: null when it gives the home's stated outcome, else the reason, naming the fixture and seed. */
export function judgeOutcome(f: EdgeFixture, seed: number, o: EdgeOutcome): string | null {
  const at = `${f.id} at seed ${String(seed)}`;
  if (o.problems.length > 0) return `${at}: ${o.problems.join('; ')}`;
  if (!f.expect.allowed.includes(o.handling)) return `${at}: handled ${o.handling} (${o.rung}), the home allows ${f.expect.allowed.join(' | ')} — ${f.expect.outcome}`;
  if (o.handling === 'refused-safe') {
    const r = f.expect.refusal;
    if (r === undefined) return `${at}: refused-safe with no pinned refusal`;
    if (!r.codes.includes(o.rung)) return `${at}: refused ${o.rung}, pinned ${r.codes.join(' | ')} (${r.known})`;
  }
  const own = f.expect.judge?.(o) ?? null;
  return own === null ? null : `${at}: ${own}`;
}

/** A milestone's stub (C-0100's deferred rows): its run throws `notBuilt('<milestone>')`. */
export function notBuiltRun(milestone: string, what: string): (seed: number) => EdgeOutcome {
  return () => {
    throw new Error(`notBuilt('${milestone}'): ${what}`);
  };
}

/** An outcome with a problem list (a helper for the fixtures). */
export function outcome(handling: EdgeHandling, rung: string, problems: readonly string[], facts: Record<string, number | string | boolean> = {}, kernel?: string): EdgeOutcome {
  return kernel === undefined ? { handling, rung, problems: [...problems], facts } : { handling, rung, kernel, problems: [...problems], facts };
}
