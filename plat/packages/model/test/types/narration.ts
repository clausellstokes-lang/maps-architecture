// The comment rule's one pattern list: a line of a source or test file states the design, never the build's history.
// History — which round, check, wave, lane or person wrote or changed a line, and a line's earlier text — lives in
// docs/build/checks/ and the landed records. Each pattern carries the phrase it exists for (its probe); the guard in
// types.test.ts reads this list for model/src and model/test of types, records, schema and stage, and a later guard
// of another package reads the same list (the shared home outside @plat/model is the session's to name).

/** One kind of narration: its name, its pattern, and a line it must catch. */
export interface NarrationPattern {
  readonly name: string;
  readonly re: RegExp;
  readonly probe: string;
}

/**
 * The narration patterns: a deny-list, each pattern phrase-specific, so the design's own words (a sky landing,
 * baseLane, a rounded value) pass, and so does a citation of the authority a line rests on — a design section, a
 * choices row (C-…), an owner's ruling (J…).
 */
export const NARRATION: readonly NarrationPattern[] = Object.freeze([
  {
    name: 'a landing',
    re: /\bnot yet landed\b|\bwhen (?:this|the|that) item lands\b|\b(?:has|have|had|was|were|is) landed\b|\blanded (?:in|by|at|on|with|before|after)\b|\bbefore (?:it|this item|the item) lands\b/i,
    probe: 'the kernel types, not yet landed when this item lands',
  },
  {
    name: 'a round, a pass or a phase',
    re: /\bfix(?:es)? round\b|\bround\s+(?:[a-z]?\d+|one|two|three|four|five)\b|\b(?:consolidation|hardening|session|closing) (?:round|pass|phase|check)\b/i,
    probe: 'kept as it was in round 2',
  },
  {
    name: 'a check or its checker',
    re: /\bthe (?:first |second |closing |independent )?check(?:er)?'s\b|\bthe (?:check|checker|reviewer) (?:found|asked|flagged|said|noted|reported)\b/i,
    probe: "each pinned (the check's finding)",
  },
  {
    name: "a note's, a failing line's or a blocker's id",
    re: /\b[NFB]-(?:[a-z]+\d*-)?\d+\b/,
    probe: 'the order the design gives (N-4)',
  },
  {
    name: "a ledger or a queue row's id",
    re: /\bL-\d{4}\b|\bQ\d+\b/,
    probe: 'signed as L-0447, from the queue (Q30)',
  },
  {
    name: 'a wave, a flow or a stage group',
    re: /\bwaves?[\s-]*\d+\b|\bflow-\d+\b|\bstage group \d+\b/i,
    probe: 'added in wave 3',
  },
  {
    name: 'a lane key',
    re: /\b(?:build|check|session)\/M\d+-/,
    probe: 'see build/M0-m-01-fix1',
  },
  {
    name: 'a person of the build',
    re: /\b(?:by|from|for) the (?:author|builder|checker|seat|steward|session)\b|\bthe (?:author|builder|seat|steward)(?:'s)?\b/i,
    probe: 'a line written by the author',
  },
  {
    name: 'a change told as history',
    re: /\b(?:added|removed|moved|renamed|fixed|changed|introduced|dropped|replaced|restored|reverted)\s+(?:in|by|during|at|since|after)\s+(?:the\s+|a\s+|this\s+)?(?:wave|round|lane|fix|check|session|commit|pass|consolidation|hardening|seat|author|builder|checker|landing|review)\b/i,
    probe: 'renamed during the consolidation',
  },
  {
    name: 'what a line used to be',
    re: /\bpreviously\b|\bformerly\b|\bused to (?:be|read|say|hold)\b|\bno longer\b|\bthis (?:round|pass|fix|commit)\b/i,
    probe: 'the field previously held a point',
  },
  {
    name: 'the scaffold as an actor',
    re: /\bscaffold created\b|\bcreated (?:empty )?by the scaffold\b/i,
    probe: 'scaffold created this folder empty',
  },
]);

/**
 * Lines the list must catch: every phrase the first deny-list of types.test.ts caught, and phrasings that escaped it
 * (a wave and a person, a lane key, a change told as history, a failing line's id).
 */
export const NARRATION_CAUGHT: readonly string[] = Object.freeze([
  'the Kernel façade, not yet landed when this item lands',
  'a fix round put it back',
  'as round r1 left it',
  'kept since round 3',
  "each pinned (the check's N-2)",
  "the checker's probe",
  'the order N-4 asked for',
  'scaffold created this folder',
  'added in wave 3 by the author',
  'renamed in the consolidation round',
  'see check/M0-m-01-close-s1',
  'flow-7, stage group 13',
  'this field no longer holds a point',
  'formerly a string',
  'moved during the hardening pass',
  'F-1 closed',
  'B-3 re-killed',
  'the note N-c1-2',
]);

/** Lines the list must pass: the design's own words as the four folders write them. */
export const DESIGN_WORDS: readonly string[] = Object.freeze([
  "Allocation: a positioned row's point, a sky landing's foot (V05 §3.10).",
  "S8's lane ends among them as `baseLane`",
  'a land-area count may be fractional; the limit is the exact double, unrounded',
  "{ name: 'water ∩ footprints = ∅', scope: 'batch', class: 'hard', kind: 'check', check: 'waterFootprints' }",
  'The record fields M0 stages (J156 (2); §4b; M0-m-01, C-0142 (2))',
  '§4.5 *Quarters* (MFP-10, VIS-4; J-P2, J-P28, J-I1); §13.2 (T47-1)',
  'the round caps on every body end; a stage writes its records in one batch',
  'B-FUZZ at the PR size; S8.seed; II.1; V05 §3.14',
  'a district carries its quarter (§9.1) and a check names its invariant',
]);

/** The names of the patterns a line matches, in the list's order (empty when the line states the design). */
export function narrationIn(line: string): string[] {
  return NARRATION.filter((p) => p.re.test(line)).map((p) => p.name);
}
