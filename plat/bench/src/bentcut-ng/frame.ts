// The frame rule (M0-b-05; §16 M0 (b): σ "read in the frame NG's was measured in"; §13.5's bent-cut row: "measured the
// same way on ours (the recorded frame, the rotated retries included)"; attachment A's `cut.sigma`: "the digest's entry
// gives the frame and the fit"; C-0117: "the σ measure in a frame rule given as a parameter — the first frame and the
// rotated retries counted as the digest's entry will state"). The rule is a PARAMETER of every run, never a constant
// of the harness: the entry refuses a run without one (exit 64), and its values enter from the digest's entry at run
// time (M0-b-05a). Two choices make a rule:
//   frame     `recorded` — the start's place along the working major axis of the frame the cut was planned in (rung
//             (a)'s attempt k plans in the frame turned k × 36°, §4.6 step 8); `first` — the same start's place along
//             the first, unturned frame's axis;
//   attempts  how many of rung (a)'s frames count: the cuts planned at attempts 0 … attempts − 1 enter σ (1: the first
//             frame's plans alone; 3: every retry our ladder makes; a larger count reads as every retry).
// σ is then M0-k-05's `cut.sigma` (one metricVersion with M0-b-04's) over the cuts the rule keeps, their `startT` the
// rule's frame's.
import { cutSigma, type MetricCut, type MetricDoc } from '@plat/testkit';

/** The frame rule (see the module comment). */
export interface FrameRule {
  readonly frame: 'recorded' | 'first';
  readonly attempts: number;
}

/** The most frames a rule may count (NG retries in up to ten turned frames, §4.6 step 8 (a)). */
export const MAX_RULE_ATTEMPTS = 10;

/** A measured cut as the rule reads it: M0-k-05's `MetricCut` with its attempt and its start in the first frame. */
export interface RuleCut extends MetricCut {
  readonly attempt: number;
  readonly startT0: number;
}

/** Parses a rule from the entry's two values; a message when either is missing or out of range. */
export function parseFrameRule(frame: string | undefined, attempts: string | undefined): FrameRule | string {
  if (frame === undefined || attempts === undefined) {
    return 'the frame rule is a parameter, never a default: give --frame recorded|first and --attempts N (the digest\'s entry on how σ was measured, C-0117)';
  }
  if (frame !== 'recorded' && frame !== 'first') return `--frame takes recorded or first, got ${JSON.stringify(frame)}`;
  if (!/^[0-9]+$/.test(attempts)) return `--attempts takes a whole number 1 – ${String(MAX_RULE_ATTEMPTS)}, got ${JSON.stringify(attempts)}`;
  const n = Number(attempts);
  if (!(n >= 1 && n <= MAX_RULE_ATTEMPTS)) return `--attempts takes a whole number 1 – ${String(MAX_RULE_ATTEMPTS)}, got ${attempts}`;
  return { frame, attempts: n };
}

/** The cuts the rule counts, each with its start read in the rule's frame. */
export function frameCuts(cuts: readonly RuleCut[], rule: FrameRule): MetricCut[] {
  const out: MetricCut[] = [];
  for (const c of cuts) {
    if (c.attempt >= rule.attempts) continue;
    out.push(rule.frame === 'first' ? { ...c, startT: c.startT0 } : c);
  }
  return out;
}

/** σ per subset (`all`, `plain`, `ring`, `template-<t>`) under the rule: M0-k-05's `cut.sigma` over the rule's cuts. */
export function sigmaUnder(cuts: readonly RuleCut[], rule: FrameRule): Map<string, number> {
  const doc: MetricDoc = { ways: [], cuts: frameCuts(cuts, rule) };
  return cutSigma(doc);
}

/** The rule as text, for the report and the lines printed. */
export function ruleText(rule: FrameRule): string {
  return `frame ${rule.frame}, attempts 0 – ${String(rule.attempts - 1)}`;
}
