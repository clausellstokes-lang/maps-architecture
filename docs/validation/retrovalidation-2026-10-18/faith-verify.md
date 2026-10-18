# Retrovalidation 2026-10-18 — faith-verify (the verifier)

Lane: `retrovalidation/faith-verify` (opus; J390, Fable-checked). Family "faith": `research/sf/faith-system.md`
(1,516 lines, carries the J375 notice). Host: `/home/user/clausellstokes-lang/settlement-engine`, local `master` =
`origin/master` = `81f1cd963553f226b222714914ff34584e9911b8` (read from `.git/refs`, no git command run).

## Method

1. Read `research/sf/faith-system.md` whole (lines 1-1516).
2. Verify every checkable claim, section by section, at its primary source: every host path:line opened, every
   constant/count/line count recomputed, every quoted phrase re-found, every tag judged. The J380 verification table
   (§12, P1-P12, M1-M17) is re-checked row by row.
3. Findings are written here as they are found (WRONG / UNSUPPORTED / IMPRECISE), each with evidence and the exact fix.
   Design soundness is not judged (the Fable validator's job).

## Progress (written as I go)

- 00:25 started; host revision confirmed. Line counts of every file named in §11.1-§11.3 recomputed (all 94 match).
- §0 header, §1, §2.1-§2.2 checked; findings F1-F8 below recorded as found.

## Findings (one row per claim that does not hold; written as found)

| # | Where | Claim | Verdict | Evidence (path:line at 81f1cd96, what it says) | Fix |
|---|---|---|---|---|---|
| F1 | §0 preamble | "One pulse tick is one week [STATED `wp/moralInstitutionPressure.js:52`]" | IMPRECISE | `:52` reads "Founding is a YEARS-scale event, not monthly churn"; the week statement is `:55` ("At tick = 1 week") | cite `wp/moralInstitutionPressure.js:55` |
| F2 | §2.1 bullet 2 | "Two code comments ... are stale (§10, item 9)" | WRONG | §10.1 item 9 is PHASE55/COUPLINGS distance; the stale "stored verbatim" comments are §10.1 item 4 (`cultImpositionApply.js:22-26`, `religiousContest.js:224`) | "(§10, item 4)" |
| F3 | §2.1 bullet 3 | authored character citation `src/copy/deityAuthoring.js:24-49` | UNSUPPORTED | `deityAuthoring.js:24-49` is the base authoring form (name, moral/order axes, rank, portfolio, domain, temperNote); the file names no characterAxes, boon, bane or authoredTemper (grep) | drop that citation; keep `src/domain/customContentSchema.js:183-330`, `:354-400` |
| F4 | §2.1 bullet 4 | "war/conquest/hunt/harvest are mechanical (war-bar pressure)" | IMPRECISE | `disp/deityEffects.js:150-175`: each entry reads "With disposition channels active, ..."; the pressure is WR-2's, behind `dispositionChannelsEnabled`, false in FS and absent elsewhere (`wp/simulationRules.js:1041`; the note's own §7.2) | "are mechanical only under WR-2's `dispositionChannelsEnabled` (lit in no preset, §7.2) — war-bar pressure; the rest display only" |
| F5 | §7.2 bullet 3 | WR-2 "BUILT DARK (`dispositionChannelsEnabled` false) [OBSERVED `wp/simulationRules.js:1037`]" | IMPRECISE | `:1037` is a comment line; `dispositionChannelsEnabled: false` is `:1041` | cite `:1041` |
| F6 | §10.1 item 7 | quote "Spread is the ONLY faith dynamic still gated by a rule flag … it just never crosses a settlement boundary" [STATED `wp/simulationRules.js:90-100`] | IMPRECISE | `:91-92` reads "This is the ONLY faith dynamic still gated by a rule flag"; "Spread" is not in the quoted sentence | quote "This is the ONLY faith dynamic still gated by a rule flag … it just never crosses a settlement boundary" (`:89-100`, the faithSpreadEnabled comment) |
| F7 | §8 notes, bullet 3 | quote of FOLD:351 "a pact proposed … and a patron's fall — VACUOUS on every born world" | IMPRECISE | FOLD:351 reads "and a patron's fall — which is VACUOUS on every born world" | restore "which is" or add an ellipsis |
| F8 | §11.4 | "`docs/DESIGN_TRADITIONS.md`" listed as not read | IMPRECISE | the file does not exist in the host at 81f1cd96 (find); it is only cited by code headers (`traditionsKernel.js`, `traditions/relations.js`, ...) and docs | add "(not located; cited by code headers)" as for DOCTRINE and `memory/` |
