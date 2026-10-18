# Repair round 3 — V04 (the underground) — lane coherence/repair-V04-r3

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-V04-r3; covered by the whole-design retrovalidation (J84).

# Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): text before the first block header is
# ignored; the FILE line routes every block to docs/volumes/V04-underground.md. Live unit: V04 as assemble-r2 left it
# (sha256 2786cc53670c4db9…, 514 605 bytes, 3 590 lines). Each REPLACE body is the live subsection with count-asserted
# substitutions (docs/validation/coherence/work/repair-V04-r3/build.py over edits_a.py: 37 edits, each applied exactly its
# asserted count, each tagged with its issue id; edits.log, diff.txt there); every untouched line is verbatim. Blocks: 10,
# all REPLACE of leaf subsections — §1.2, §1b.1, §3.2, §3.11, §5.1, §5.6, ## 7, ## 8, ## 9, ## 12. No heading retitled or
# added, no whole-volume REPLACE, the title block untouched. Ruling requests: 0.
# Binding rulings applied (adjudication-r3, Part H · V04): R3-01, R3-02, R3-03, R3-04, R3-23, R3-26.
#
# PROGRESS
# - P0 brief read whole (issue list, ROUND-3 NOTES, NEW OWNER RULES, ORCHESTRATION NOTES); adjudication-r3's TOC row,
#   R3-01 – R3-04, R3-23, R3-26 and Part H · V04 read whole (R3-08, R3-09, R3-10 read for the seams): done
# - P1 issue sources (verify-agree-proof, -edges-world, -kernel, -vol-V03-V04 r2t); live V04 §1.2, §1b.1, §3.2 N2–N3,
#   §3.11, §5.1, §5.6, §7 (T-V4-2, T-V4-80, T-V4-82), §8, §9 (J-V4.114, J-V4.129, J-V4.130), §12; V03 §3.7.5, §5.1,
#   §5.6, §8; V01 §3.16; base §3.7, §6.3, §16's M6-P and M6-U rows; landed round-3 texts: pipeline's II.7.2, determinism's
#   §6.3 *Plan damage*, rendering's §8.8, V06's hand-offs: done
# - P2 the count-asserted edit set (37 edits, 10 blocks): done
# - P3 dry run on a copy, references, doc_checks, words, report, result, LANDED: done
#
# DISPOSITIONS — Part H · V04: 10 issues, all FIX, each FIXED in the text (none INVALID, none MERGED); 2 END lines written
# - VAP-r2-13 (FIX; minor): J-V4.114 reads 28.5–39.5 pw, U5 at 3.25–4.5 pw, and adds "and g item 123's damage below
#   ground (0.25 pw in U5; J-V4.130)" before "— accepted by the owner's delegation (owner question 2, J122)". No other copy
#   of 28.25–39.25 or 3–4.25 remains in V04, the base or INDEX.md.
# - VEW-r2-04 (FIX; major): V04 §3.2 N2's field outfall follows its D8 path over land only — the stretch's cells not on
#   water taken in descending accumulation (ties by address), the first whose path reaches a cell outside `R` and beyond
#   the outermost enceinte's outer strip without entering a water face gives it, a cell whose path enters a water face
#   first passed over; a bank where every stretch cell's path does (or whose stretch is empty or wholly on water) and that
#   holds no candidate drains by gutter and pit, reported unsewered (F-NET's truncate rung). UC19 cites it; §3.11's U-NET
#   outfalls ladder row names the new case; T-V4-80 (j) adds the river town whose candidates on one bank all lie upstream
#   of a mill intake (`moat: 'none'`), with outfall-run edges in its zero-over-water count and the field outfall on land or
#   the bank unsewered; T-V4-2's invariant checks every field outfall on land, its path and run over no water face;
#   J-V4.129 records the over-land path. It agrees with pipeline r3's II.7.2 base side ("reached over land"; "as does one
#   whose every stretch cell's path to a field outfall enters a water face first").
# - VKr2-09 (FIX; graded major): V04 §5.6 (2)'s `cellarWall` row and §1b.1's read map name `corridorUnion` (the bands of
#   tunnels, galleries and walkways, §3.7), not `bandUnion`. Written with one addition the required text lacked: the rock
#   side also excludes a chamber's floor — §3.7 makes a chamber's floor and the rock around it separate L1 faces, so an
#   undercity or void building's side facing an open chamber is no rock-side run; the required text alone would class it
#   `cellarWall` (opaque to sight), against J-V4.130's reason (earth and rock behind the wall). The read map cites §5.6 (2).
# - VV34-r2-01 (FIX; major): V04 §5.6 (1) gains the required two sentences verbatim (a storey below 0 under a disaster's
#   look draws at its building's drawn level, `PlanDamage.level`, thresholds unchanged, no patch, the per-storey scene's
#   walls, portals and lights at the own level; an underground building in no look's unit reads its own), the units
#   named as V01 §3.16 (1) gives them (ground part 0's districts; at the village rungs V07's ends). §1.2 gains the hook row
#   (§2.7's `ConditionOverlay`, §2.9's `crises`, §7.7's DR44, §10.2's `lookLevel`, read through V03 §5.6 (4)); J-V4.130
#   one clause; T-V4-82 a clause (i) and its head names item 122 (d). Two forms differ from the required text: (a) UE33's
#   "E9" is written as a clause of UE33's E7 (Show crises on and off under the look), because V04 §3.11's edge classes are
#   E1–E8 and the set defines no E9; its content is the required case — a church in a ruined district, its crypt at the
#   look's level while the look stands and at its own outside it, no patch, its join kept — with R3-10's building-by-
#   building hand-over (V06 §3.22 (3)) in "the condition's weeks"; (b) T-V4-82 (i)'s fixture is a calamity with its linked
#   `reconstruction` condition (R3-09 (e)) and holds two churches (one never decayed, one whose own level lies above the
#   look's at severity 0), so the higher-of rule is barred too; its hand-over clause runs once V06's E2 has landed.
# - VV34-r2-02 (FIX; minor): §5.6 (2) drops the access head from the kept-kind list and adds "an access head is no element
#   (V03 §5.6 (1)): its state is its access's"; §5.6 (3) and UC21 read the required texts.
# - VV34-r2-03 (FIX; graded major): the `cryptVault` id cell reads the required key — (its room's address, (i, j)), i and
#   j the whole-pitch coordinates of the cell's lowest-leftmost corner node along the step-2 ring's OBB axes, counted from
#   the grid node at the OBB's centre (V03 §3.7.5's centring) — plus the one `cryptVault` of a crypt whose ring holds no
#   cell centre keyed by its room's address. The `cellarVault` id reads "its room's address" (V03 §2.2's term; a room has
#   an address, not an id), so V04 and determinism's round-3 §6.3 *Plan damage* (VV34-r2-16) name one key.
# - VV34-r2-04 (FIX per R3-04; graded major): T-V4-82 (b) reads "each element damaged exactly while the level is above 0
#   and at least its threshold (§6.3 *Plan damage*'s comparison)".
# - VV34-r2-05 (FIX per R3-26; minor): T-V4-82 (g) reads "— the `item123.damage` registration of the underground's bands
#   and per-band exports on V12 §3.7.8's engine (V12 §2.13), written by the U5 seat".
# - VV34-r2-06 (FIX; minor): §5.6 (6) lands the section at the later of U5 and V03's P4 (with which §2.6 step 7, §6.3's
#   `plan.damage` and §8.6 land), nothing of it drawn before; §8's U5 content cell and its exit's T-V4-82 say the same;
#   J-V4.130's landing clause. The required text's "(R2-36; §16)" is written "(§16's milestone rows)" (R3-02's table).
# - VV34-r2-07 (FIX; minor): §12 reads "file g's items are read whole in `docs/AMENDMENTS-2026-09-28g.md`"; the subset
#   list stays, and names item 122 (d)'s look read below ground (V04 §5.6 (1)), which this round writes.
# END lines (Part H · V04):
# - END of R3-04: V04 §5.6's lead reads "… shown damaged while the decay level is above 0 and at least the element's keyed
#   threshold (§6.3 *Plan damage*'s comparison; §2.6 step 7; …)" in place of "reaches … the one comparison every reader
#   makes"; the lead also names an element so damaged **past its threshold**, the phrase §5.6 (3), (5), UE33 and T-V4-82
#   (e) use, so no reader of V04 can read a second comparison into it.
# - END of VAL-R2-01 (R3-23 (d)): V04 §5.1 reads "While the underground layer is drawn (`cutaway`, `overlay` or `solo`)
#   the weather effects draw nothing over the view (§8.8)" (rendering's round-3 §8.8 states the rule).
# Further end written at V04's side (R3-01 (3)): V06 round 3's hand-off (a) — V04 §5.6 (3)'s repaired element reads "at
#   or below its own `decayPeak`, the highest level since it entered the plan (V06 §3.23 (3); V03 §5.6 (2) (b))", and
#   T-V4-82 (f) "its own `decayPeak` (since it entered the plan, V06 §3.23 (3))" (R3-08 (b)'s per-element peak).
#
# HAND-OFFS (R3-01 (3): ends no END line names, for round 4's verifiers; none is open wording in V04)
# - scope: §16's M6-U row reads "item 123's damage below ground at U5"; V04 §5.6 (6) now lands it at the later of U5 and
#   V03's P4 — the row may read "at the later of U5 and V03's P4".
# - V03: T-V3-40 (b) and V03 §5.6 (4) are the home V04 §5.6 (1) and T-V4-82 (i) read; V03's own crypt (a plan's storey
#   below 0) under the look now has V04's bar too.
#
# CHECKS (on the expected volume; scratch)
# - apply-blocks (docs/validation/amendments-b/apply-blocks.py) dry run over the live V04 with these blocks: 10 found,
#   10 applied, 0 skipped, audit not-OK 0; headings 59 → 59, fences balanced (12 → 12), title block unchanged; output
#   byte-identical to the generator's V04.new.md (sha256 0e3bcacd8f5cc616…, 520 064 bytes, 3 605 lines); the rationale
#   (a throwaway input) unchanged.
# - references (assemble-r2's refs.py on mirrors of the live set and of the set with this V04): V04 resolved 2 706 →
#   2 747, ambiguous 1 → 1 (the pre-existing §2.7 of l. 321), broken 0; every other unit's counts unchanged.
# - ids: no T-V4, J-V4, UE or UC id added or removed; T-V4-82 gains a clause (i); no review id (R2-nn, R3-nn, a verifier
#   issue id) in any added line.
# - doc_checks.py --heads the base: WARNING reference corpus INCOMPLETE (captures, research/patreon, research/devlogs,
#   research/ftg-docs, research/external missing) — NOT authoritative, provisional: live → new C1 0 → 0, C2 0 → 0,
#   C3 214 → 218 hits (the four new: "0 and 1 in the", two runs of section numbers, "of its own and the" — common
#   phrasing, no reference content), C4 0 → 0, S1 0 → 0, S2 unreviewed 2 → 2 (the pre-existing §3.24 pointers).
# - words (wc -w): 82 321 → 83 268 (+947, +1.2 %). The growth is new design the issues require (the look below ground,
#   the field outfall's over-land path and its fallback, the crypt vault's key, the landing, the test clauses); none of
#   the four shrink sources applies to a repair of this scope.
