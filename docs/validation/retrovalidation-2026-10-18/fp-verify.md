# Retrovalidation 2026-10-18 — fp-verify (family "fp": research/sf/fp-simulator.md, research/sf/fp-physical-integration.md)

Lane: retrovalidation/fp-verify (opus; J390, Fable-checked). Verifier seat: facts only, no design-soundness judgment.
Host: `/home/user/clausellstokes-lang/settlement-engine` at `81f1cd96`, read-only.

## Method
- Both notes read whole (fp-simulator.md 1,098 lines; fp-physical-integration.md 493 lines).
- Every citation opened at the host; counts recomputed; quoted phrases re-found by grep; code claims read at the cited lines.

## Progress (written as I go)
- [x] notes read whole
- [x] host checkout identity: `.git/refs/heads/master` = `81f1cd963553f226b222714914ff34584e9911b8`; the clone is SHALLOW at 81f1cd96 (`.git/shallow`), so its parents `00b648c9…` and `cd347a57…` are not in the pack (pack index read with a 20-line Python reader; no git command run). The HEAD commit object (inflated from the pack) names parents 00b648c9df13 and cd347a57dfe9, message "Merge pull request #60 … docs/fp-coherence-fold-2026-10-16", stamp 2026-10-17 00:49 -0400.
- [x] every host doc line count the notes state, recounted with `wc -l` (all 40 match)
- [x] DESIGN_FP_COHERENCE_FOLD.md read WHOLE (1–708)
- [x] DESIGN_ROUTE_LIFECYCLE.md read WHOLE (1–300); CURRENT_STATE.md 1–40; ARCHITECTURE.md 1–20, 110–192; compiled FP header 1–12
- [x] code: simulationRules.js (50–60, 760–810, presets 863–1230 by grep), beliefMap.js 195–215, intervalWeeks.js 1–14, worldState.js 14–18, modeSpeeds.js 1–85 + 175–220, spatialDigest.js (grep + 176–195, 538–578, 890–923), campaignSpatialCanonize.js (grep + 105–112); src-wide greps for `ensureGenesisRouteNetwork`, `realmReach`, `creationKmScale`, `hearingWeekEnabled`, `registerEngagementKind`, `pendingEngagements`

## Findings (one row per claim that does not hold; written as found)

| id | where (note:line) | claim | verdict | evidence | fix |
|---|---|---|---|---|---|
| FV-01 | fp-simulator.md:869 | "none of the 31 rows" of the §3.4 engagement registry | WRONG | fold lines 357–386 are 30 table rows (35 kinds, five rows carry two kinds); the note's own §5 table also has 30 rows | "none of the 30 rows (35 kinds)" |
| FV-02 | fp-simulator.md:289–291 | the UNBUILT RIM "(… war circulation beyond WC-0, the epoch's tail, EC)" tagged [STATED] fold §0 lines 53–60 | IMPRECISE | fold lines 57–59 say "war circulation, the epoch, EC"; the qualifiers "beyond WC-0" and "the epoch's tail" are the note's reconciliation with §2 (WC-0A..0E built; EP-0..3 landed), not the fold's words | quote the fold ("war circulation, the epoch") and add "[INFERRED from fold §2 rows WC/EP: WC-0 and EP-0..3 are built]" for the qualifiers |
| FV-03 | fp-simulator.md:345–346 | WF fold status "WF-2..7, WF-9 unbuilt" [STATED fold §2 WF row] | IMPRECISE | fold line 341: WF-6 ROWS are BUILT, DARK (drafting unreachable) and WF-1d is built-dark; UNBUILT lists WF-2, WF-3, WF-4, WF-5, WF-6 executors, WF-7, WF-8 remainder, WF-9 | "WF-1d and WF-6's rows built dark; WF-2..5, WF-6 executors, WF-7, WF-8's remainder and WF-9 unbuilt" |
| FV-04 | fp-simulator.md:359–360 | `ensureGenesisRouteNetwork` "has no caller in `src` (only comments name it)" | IMPRECISE | no call exists (holds), but besides two comments (`routeNetworkCharter.js:521`, `routeNetworkFlows.js:634`) two STRING literals name it: `domain/certification/subsystemRowsWaves.js:390` (a certification description) and `lib/spatialUsage.js:362` (a registry string) | "has no caller in `src` (two comments and two descriptive strings name it; none calls it)" |
| FV-05 | fp-physical-integration.md:356 | "of which three files are new — CN (504), EC (2,996), MF (486), PG (431), COHERENCE_FOLD (708)" | WRONG | the sentence lists FIVE new files; fold lines 40–41 confirm CN, MF, PG, EC were ledger-only at 00b648c9d and the fold itself is new; the five line counts recount correct (`wc -l`) | "of which five files are new" |
| FV-06 | fp-physical-integration.md:159 (row M4) | "'the dangerous goods take the overgrown road' … [STATED DESIGN_ROUTE_LIFECYCLE.md:225-227]" | IMPRECISE | lines 225–227 carry "wanderers and smugglers may use hidden paths at a grade penalty, armies may NOT (J-D9 d)"; the quoted phrase is §5b, lines 128–130 | cite "DESIGN_ROUTE_LIFECYCLE.md:128-130 (quote), 225-227 (hidden-path access)" |
