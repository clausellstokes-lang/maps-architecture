# repair-r1-pipeline — lane coherence/repair-pipeline-r1 (unit pipeline: base §4, §10, PART II, PART III)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-pipeline-r1; covered by the whole-design retrovalidation (J84).

# Block file per the BLOCK PROTOCOL (docs/validation/amendments-c/apply-blocks.py): text before the first "=== " line is
# ignored. Base: docs/ARCHITECTURE.md sha256 484af066f0115b1d… (assemble-r0's output). Each REPLACE body is the live
# subsection with count-asserted substitutions (generator docs/validation/coherence/work/repair-pipeline-r1/gen.py with
# edits.py and combo-new.txt; every untouched line is verbatim). 26 REPLACE blocks, 0 RULING REQUEST blocks.
#
# PROGRESS
# - P1 brief read whole (75 issues: 5 blocker, 46 major, 24 minor); continuation after the 01:21 usage-limit cut: done
# - P2 issue sources, canon pipeline unit, dated rulings 114–119, live subsections and archives read: done
# - P3 edits drafted for every issue (123 asserted substitutions over 26 subsections): done
# - P4 checks on scratch copies: apply-blocks 26/26 applied, 0 skipped, audit 0 not OK, headings 153 -> 153, fences
#   balanced; doc_checks on the result exit 0 (C1 5/0, C2 1/0, C3 1609/0, C4 4/0, S1 0/0, S2 149/0 unreviewed) — with
#   the warning "reference corpus INCOMPLETE … NOT authoritative" (captures and research/patreon, devlogs, ftg-docs,
#   external absent here): provisional; every volume § and test id the new text cites resolves: done
# - P5 result file and LANDED: done
#
# DISPOSITIONS (every issue FIXED in the blocks below; where the fix differs from the issue's sketched text, the reason)
# - VAF-R0S-08, VPC-14, VV12-01: II.1 declares NeighbourhoodRequest and NeighbourhoodResult as archived V01 §2.4 (file f
#   item 539) states them, the narration ids (seam SL-…) dropped, "skyHandover" read as `SkyUnitInput` (G-unitinput);
#   DistrictContext V01 §2.3's, TypedBoundary V01 §2.5's.
# - VAF-R0S-09 + VPC-29: the `settings` comment points at V11 §3.5.1's row; `RosterSettings` is declared in §10.2 with all
#   seven cells (coverage.rosterWeight included), so it is no longer listed as V11 §2.8's. VPC-29's `OpeningRow` is
#   declared at §2.6 (opening hours) and is cited there; `SubLocationRow` is declared with §2.6 `SubLocation`'s fields
#   (name, tags, capacities, relax) rather than the issue's sketch, so the template and the record agree; `StageId` in §4.12.
# - VAF-R0S-15: option 1 — §10.2 declares `SquareQuotaRow` (a base mechanism, S7b (3), reads it from M2b: MC-11).
# - VAF-R0S-20: §4.5 states the discrete-cell rule once (the nearest rowed band below — V03's J-V3.28); §4.7 S11, the class
#   mix and §10.2's template comment name it.
# - VAF-R0S-23: §10.2 names the rule and cites V11 §3.5's rows by class, no values (canon rule S2).
# - VAL-01 (supersedes VPC-17's wording) and VPC-17: §4.12's list, II.7.4's input list and II.7.6's comment in V04 §3.1's
#   order (U-NET, U-SYS, U-ACCESS, U-FRONT, U-CITY, U-LINK).
# - VEW-02: the capped level set is defined (t capped, shortfall reported and carried to S5d, a stage with no land folded,
#   S5d's top-up skipped). Where the capped region meets the frame the boundary runs along the frame's inner line, inset by
#   the outer wall strip, and that arc is walled and gated like any other. The issue's sketch made it a closed arc (no wall,
#   no gate). The frame is the map's edge, not a barrier, so a closed arc would leave a walled town open toward it and drop
#   gates whose routes already run to the context margin; §4.3 *Result* gives such a gate an outward arterial of positive
#   length, which closes the zero-length case the issue names. EP-20 and its three fixtures added.
# - VEW-03: picks on approachable arcs, the closed-arc reduction of N, closed land-barrier arcs impassable in a walled stage,
#   a route through the nearest walled arc's gate. A stage whose every arc closes walls nothing and records no `Enceinte`
#   (an unwalled stage for every rule), rather than a 'barrier' enceinte with no walled stretch, because `Enceinte.trace`
#   is its wall chain and a record without one would be degenerate. The castle is re-sited by F-CASTLE. EP-21 added.
# - VEW-04: `moat: 'auto'` resolved by P(moat); one "water within reach" rule (`moat.waterReachM` 400 m) for the castle and
#   city moats; the moat's level derived from its source (`flowFrom`); wet only within `moat.maxFallCm` (400 cm) of it, else
#   a dry `ditch` (S10 (0) names it). The two cells are base `walls` cells (registry row 13 homes them at §4.2/§4.4/§4.8)
#   with their values. EP-22 added.
# - VEW-05, VEW-06, VEW-08, VEW-09, VEW-10, VEW-18, VEL0-09, VPC-23, VPC-25: outcomes at their homes; EP-14, EP-15 extended;
#   EP-23 – EP-26 added; the combination table gains a rung for every cell, a plots-and-buildings row and the named fixtures.
#   VEW-10's grade limit is `ways.crossing`'s `rampMaxGrade` per class (the issue's second option; one value per class).
# - New report codes are stage warnings (§5.4's open `warnings` record): `W_MOAT_DRY`, `W_WALLED_BY_BARRIERS`,
#   `W_DOSSIER_EDGE`, since §5.4's `ReportCode` union is closed and determinism's.
# - VPC-01, VPC-02, VPC-03, VPC-04 (items 115, 117, 118, 119): the pipeline parts are written (S2's manor count, S10b's rung
#   ceiling as class-mix step (3), S11's dwelling limits, §4.2 S0's and §4.9's season columns, §10.2's grandeur, season and
#   festival bullets with `RosterTables.grandeur` and `.festival`, §4.1's quality budget). The row SHAPES are cited at V11
#   §2.8d / §2.8, which already declares them under V11 §2.8's rule (row types the base names without declaring). V11's own
#   round-1 issue VV1112-09 extends `GrandeurCeilingRow` there, so a second declaration in §10.2 would give two homes
#   (principle (1)). VPC-03's fallback mapping is V11 §3.25.7's values, cited and not restated.
#   VPC-04's "StageReport records each quality path" is written as: the path taken is read from the pinned table
#   version. §5.4's StageReport has no such field, and §5.4 is determinism's.
# - VPC-22 (a)–(e), VDC0-08, VDC0-09, VM-R0S-15, VPC-32, VRC0S-12, VPC-11: the BCR texts applied in §4.11 as the issues and
#   archived V06 §10 (BCR-V6-21) give them; EpochInputs carries wealthLevel, advance (with stoppedAt and trajectory) and
#   replay.
# - VAT0-07: §4.11 (2) cites §6.1 *The history replay* without restating the component's value (determinism's repair r1
#   rewrites it to the u32 upper half and states the live epochs' range — the §6.1 clause the issue asks for is theirs).
# - All other issues: applied as their required change reads.
#
# HAND-OFFS (the other half of an issue lies in a unit this seat may not write; for those units' editors and verifiers)
# - V01: §2.2 cites §10.2's `SquareQuotaRow` instead of declaring it (VAF-R0S-15); V01 §3.17.3 (2) may cite §4.6's strip
#   hole (VEW-08); V01 §2.4's pointer now resolves at II.1 unchanged.
# - V03 §3.2 and V11 §3.6.1: cite §4.5's discrete-cell rule (VAF-R0S-20).
# - V04: T-V4-2's no-water fixture names the field outfall (VEW-07).
# - V06: §2.3 and §2.14 cite §4.11's `EpochInputs` for wealthLevel, advance and replay (VDC0-09, VPC-22 (b)).
# - V07: §2.7 cites §4.1's `RaisedRead` (VAL-12; VAL-13 is V07's); §3.9 (1) names `meadowHaPerCapita` and
#   `pastureHaPerCapita` (VAL-14).
# - V08: §2.6's `deep_harbour` line and its combination row read §4.2 S1 (6)'s river or lake harbour (VEW-09); §3.17 (a)'s
#   digest row and T-V8-49 (f) carry the no-seat dossier case (VEL0-09).
# - V11: rows drop "(§10.2's example)" (VAF-R0S-23); registry row 81's readers add S3 (5), S4, S5b, S5c's routing (VEW-10);
#   row 13's cell list adds `moat.waterReachM`, `moat.maxFallCm` and the feature table's P(moat) (VEW-04, row 9); row 24's
#   shape now §10.2's `RosterSettings`; row 91's owner stays 'base' (VAF-R0S-15).
# - determinism / §5.4: the three stage warning codes above may be listed beside V04's.
# - HELD (orchestrator note 2): VV56-07's per-visible-epoch or whole-run reading of item 119's ten seconds is not written;
#   §4.1's quality budget cites item 119's comfort level for one-time waits and chooses neither reading.
#
# OBSERVED, OUTSIDE THIS LIST (not changed; for the next verify round)
# - `OpeningRow` names two types: §2.6's opening-hours row and V04 §2.3's underground opening row (II.7.6's
#   `AccessPassStrategy` signature uses the latter) — model / V04.
# - §4.9's `ClimateTable` `farmLayout: 'rows'|'perimeter'|'rivers'` against V11 §2.8's `farmLayout: string /* … or 'none' */`.
# - `DistrictKind` is used (§2.5 `District.kind`, V01, §10.2's `SquareQuotaRow`) and declared nowhere — model.

