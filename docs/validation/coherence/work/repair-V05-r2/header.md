# Repair round 2 — V05 (the sky) — lane coherence/repair-V05-r2

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-V05-r2; covered by the whole-design retrovalidation (J84).

# §8 total: 18–24.75 pw (unchanged; R2-06 (c)) — no phase gains or loses work; §8's dependency line only places Find.
#
# Block file per the BLOCK PROTOCOL (docs/validation/amendments-c/apply-blocks.py): text before the first "=== " line is
# ignored. One FILE line (docs/volumes/V05-sky.md), then 10 REPLACE blocks of leaf subsections: §1.2, §1b, §3.21, §3.23,
# §4.5, §5.6, §7, §8, §9, §13. 0 RULING REQUEST blocks. Source: the live V05 as assemble-r1 installed it (sha256
# b5f310b6269b2897…; no round-2 assemble has run). Each REPLACE body is the live subsection with count-asserted
# substitutions — generator docs/validation/coherence/work/repair-V05-r2/build.py with edits_a.py (17 substitutions, each
# tagged with its issue ids; edits.log, diff.txt); every untouched line is verbatim; `python3 build.py` there reproduces
# the blocks and V05.new.md (sha256 7617d87cff902216…).
#
# PROGRESS
# - P0 brief read whole (4 issues; ROUND-2 NOTES, NEW OWNER RULES, ORCHESTRATION NOTES); adjudication-r2's TOC row,
#   R2-05, R2-06, R2-08, R2-09, R2-10, R2-32, R2-34, R2-35, R2-39 and Part H · V05 read whole: done
# - P1 issue sources (verify-agree-host-r1t, -agree-proof-r1t, -agree-time-r1t, -vol-V05-V06-r1t), V01 §3.16 and §5.4
#   (with V01 r2's in-progress text of §3.16), base §11.2's `WhyAnswer` and `FieldDrivers`, base §13.2's T117/T118/T119
#   bars and take-over table, V12 r2's §2.13 pin rows, and V05 §1.2, §1b, §3.5, §3.20 (3), §3.21, §3.23, §4.5, §5.1,
#   §5.6, §7, §8, §9, §13 whole: done
# - P2 the count-asserted edit set over the live V05 (17 substitutions, 10 blocks): done
# - P3 dry run on a copy, references, doc_checks, the report, the result, LANDED: done
#
# DISPOSITIONS — 3 FIXED in the text, 1 INVALID by ruling (no block)
# - VAH-r1-15 (minor; FIX per R2-10): §1.2's hook row splits into a V10 §2.13 row (`WhyProvider`) and a §11.2 row
#   (`FieldDrivers`, `WhyAnswer.closure`); §3.21 (1) cites §11.2's `WhyAnswer.closure`; §4.5 cites §11.2's `FieldDrivers`
#   and §11.2's `FieldDrivers.terms` (both places). The same moved type in §1b's wiring row is split likewise — the
#   sky's `WhyProvider` (V10 §2.13) and the daylight term's per-island attribution, the `sources` of §11.2's
#   `FieldDrivers.terms` (producer the field's `drivers()` over the held strips, consumer §11.2's `WhyAnswer.drivers`) —
#   and §13's fix list names "V10 §2.13 and §11.2" as the homes its items closed at. `PlacementSolver.explain` and
#   `Explanation.terms` stay V10 §2.13's (the solver's explanation, R2-10).
# - VAP-r1-06 (major; FIX per R2-08): T-V5-34's head reads "(item 117; V05 §5.1; takes T117-1 – T117-8's island
#   clauses …)" and T-V5-35's "(item 118; V05 §5.1; takes T118-1 – T118-6's island clauses …)", each head saying which
#   bars have no island clause and why (T117-3's rows and T117-6's opening week: the island takes the ground's rows at the
#   view's week; T118-5's staging: V11's `SKY` row names no staging place). Each lettered clause re-running a bar names
#   it: T-V5-34 (a) T117-1, (c) T117-2, (d) T117-4 and T117-5, (e) T117-7, (h) T117-8; T-V5-35 (a) and (e) T118-1, (b)
#   T118-2, T118-4 and T118-6, (c) T118-3. To make each named take-over whole, (c) reads the bar's week (the
#   leaf-colour weeks' middle week), (d) adds the spring pond's first ice week at or before the conjured river's (T117-5's
#   still-before-flowing order), (e) runs T112-1's contrast and colour-blind checks at each season's middle week (T117-7),
#   T-V5-35 (b) adds no ground tier row's kind on an island (T118-4) and the label's keep-out (T118-6).
# - VAT1-01 (major; FIX per R2-34): V05 §5.6 (4) reads VAT1-01's text — Show gaps' units on an island are V01 §5.4 (3)'s
#   `gapUnits` over the island's arena, restating none: its districts (a class with no coverage row, or one counted by
#   district or neighbourhood); the whole island one unit for a walking-radius row (V01 §3.16; V05 §3.5 (3)); V01's
#   per-plot `households` reading for a households row — with the rest of the sentence kept, and one clause added so the
#   outline agrees with V01's per-plot gap (a per-plot row's gap the unserved plots of each district). T-V5-36 (g),
#   §3.23's Find row (the brief's "V05 §3.21's Find row": §3.21 holds none; the Find row is §3.23's), §1b's Find wiring
#   row and J-V5.89 read the same (J-V5.89 no longer names V05 §3.5 (3)'s allocation units as Show gaps' units; those
#   units stay S7b (1)'s coverage step's, unchanged).
# - VV56-r1-05 (minor): INVALID by R2-39 (c) — closed, no block. V05 §3.23's seasonal row and T-V5-34 (d) stand as
#   written ("an arid row draws no ice and no snow on an island"); the defect is fixed at rendering §8.2 (R2-39 (a)),
#   which V05 §5.1 (4)'s "snow lies on the island as on the ground" follows.
#
# RECEIVING ENDS WRITTEN (R2-05)
# - R2-09: T-V5-34 – T-V5-36 state their registrations in R2-09's form — "the `item117.season` / `item118.festival` /
#   `item120.find` registration of the sky goldens on V12 §3.7.8's engine (V12 §2.13; …), written by the M6-sky seat
#   landing P3" — agreeing with V12 r2's §2.13 rows (the sky goldens (V05, T-V5-34 / -35 / -36)).
# - R2-32 and R2-35: T-V5-36's head "(item 120; V05 §5.6; takes T120-1's registration and T120-4's and T120-5's sky
#   clauses)"; (a) names T120-1 (and "every chip off" beside Clear), (d) T120-5 (each match carrying its chip's second
#   cue), (f) T120-4 (every band and layer change, an `advance` with its epochs, undo, redo, regenerate, load and
#   migration, and a chip whose last match goes staying at count 0, dark). §8's dependency line: V09's Find panel and
#   `live.find` land at M5 (Find's milestone; §16) before P3, so T-V5-36 lands with P3 at M6-sky — "a fixture provider
#   until then" removed, since no order lets P3 precede M5 (V05 §8, V05 §11 Q1).
# - R2-08 (its head rule, both ends): T-V5-18's head names "takes T119-2 – T119-5's island clauses" (scope's VAP-r1-09
#   writes the sky row's T119 column); §7's head lists every base bar V05 takes — T10-1, T13-1, T15-1, T102-2, and the
#   island clauses of T117-1 – T117-8 (T-V5-34), T118-1 – T118-6 (T-V5-35), T119-2 – T119-5 (T-V5-18), T120-1's
#   registration with T120-4 and T120-5 (T-V5-36) — "as §13.2's take-over table names them".
# - R2-06: no V05 figure is restated elsewhere by this seat; the §8 total is unchanged (above).
#
# RECEIPTS
# - Dry run (docs/validation/amendments-b/apply-blocks.py on copies of the live V05 and the rationale, the FILE line left
#   out as assemble's route.py does): 10 found, 10 applied, 0 skipped; audit 10 OK, 0 not OK; headings 62 → 62; fences
#   balanced (14 → 14); title block unchanged; rationale byte-identical; output byte-identical to V05.new.md
#   (sha256 7617d87cff902216…).
# - References (assemble-r1's refs.py on mirrors of the live set, live V05 and new V05): V05 resolved 1 994 → 2 052,
#   ambiguous 3 → 3, external 1 → 1; 9 BROKEN, all the forward cites T120-1, T120-4 and T120-5 (§7's head, T-V5-36's head
#   and its clauses (a), (d), (f)) — R2-35's ids scope's round-2 seat writes in §13.2 this round; T117-*, T118-* and
#   T119-* resolve; base and every other unit's counts unchanged.
# - doc_checks (`--doc` V05 `--heads docs/ARCHITECTURE.md`), live → new: C1 0 → 0, C2 0 → 0, C4 0 → 0, S1 0 → 0;
#   C3 238 → 238 hits (227 → 227 unreviewed: common phrases and digit runs, none new); S2 254 → 260 hits (13 → 13
#   unreviewed; the six new are V05's own section pointers). WARNING recorded: "reference corpus INCOMPLETE (missing:
#   captures, research/patreon, research/devlogs, research/ftg-docs, research/external) - clean-room results are NOT
#   authoritative" — provisional.
# - Size: V05 66 710 → 67 247 words (+537, +0.8 %): the named take-overs and their completed clauses (T-V5-18, -34,
#   -35, -36, §7's head), the split hook and wiring rows, and the Show gaps reading at §5.6 (4), §3.23 and J-V5.89. No
#   narration added. The shrink band is not this round's: the growth is cited bars and one defined edge (principle (9)'s
#   guard).
#
# HAND-OFFS (for round 3's verifiers; each other end is named by a ruling and written by its own seat this round)
# - scope §13.2: the ids T120-1, T120-4, T120-5 (R2-35) — V05's nine citations resolve when scope's §13.2 lands; the
#   sky take-over row's base-bar column names T117-1 – T117-8's and T118-1 – T118-6's island clauses (T-V5-34, T-V5-35)
#   (VCS-10), T119-2 – T119-5's (T-V5-18) (VAP-r1-09), and T120-1's registration, T120-4 and T120-5 (T-V5-36) (R2-35),
#   as V05 §7's head names them; item 118's runs list reads "volume 5 the sky islands' pennants (T-V5-35)" (VCS-10).
# - scope §16: the M5 row names item 120's Find (R2-32 (1)); V05 §8 cites "M5 (Find's milestone; §16)".
# - T-V5-36 (b), (e) and (h) check on the islands what T120-2, T120-3 and T120-6 check; R2-35's table assigns those bars
#   to V09, V01, V08, V10 and V12, so the clauses stay the sky's own and name no bar (both ends agree as ruled).
# - rendering §8.2: R2-39 (a)'s arid rule (no snow, falling or lying, whatever the view's `weather` holds), which V05
#   §5.1 (4) and §3.23 follow unchanged.

