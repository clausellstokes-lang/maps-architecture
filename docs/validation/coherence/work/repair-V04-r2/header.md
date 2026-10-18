# Repair round 2 — V04 (the underground) — lane coherence/repair-V04-r2

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-V04-r2; covered by the whole-design retrovalidation (J84).

# §8 total: 28.5–39.5 pw (was 28.25–39.25) — U5 gains item 123's part below ground, 0.25 pw (R2-06 (c)).
#
# Block file per the BLOCK PROTOCOL (docs/validation/amendments-c/apply-blocks.py): text before the first "=== " line is
# ignored. One FILE line (docs/volumes/V04-underground.md), then 24 blocks: 23 REPLACE of leaf subsections and one APPEND
# TO SECTION "## 5 Rendering, labels and exports" carrying the new "### 5.6". 0 RULING REQUEST blocks. Source: the live
# V04 as assemble-r1 installed it (sha256 47c144776d2085a0…; base 137ecc0e… confirmed; no round-2 assemble has run).
# Each REPLACE body is the live subsection with count-asserted substitutions — generator
# docs/validation/coherence/work/repair-V04-r2/build.py with edits_a.py … edits_d.py (75 substitutions, each tagged with
# its issue ids; edits.log, diff.txt); every untouched line is verbatim; `python3 build.py` there reproduces the blocks.
#
# PROGRESS
# - P0 brief read whole (9 issues; ROUND-2 NOTES, NEW OWNER RULES, CONTINUATION, ORCHESTRATION NOTES); adjudication-r2's
#   TOC row, R2-05, R2-06, R2-12, R2-25, R2-28, R2-29, R2-32, R2-34, R2-35, R2-36, R2-38, R2-41 and Part H · V04 read
#   whole: done (resumed after the 07:09 usage-limit cut; the skeleton was all that survived)
# - P1 issue sources (verify-agree-layers/-time/-proof/-edges-world/-vol-V03-V04 r1t), file g items 123 and 126 (with
#   126 (a2)), the canon's routings, model r2's §2.6 step 7, V06 r2's §3.23 (landed), determinism r2's §6.3 *Plan damage*
#   (landed), the base homes (§8.2, II.7.6) and every V04 section concerned, whole: done
# - P2 the count-asserted edit set over the live V04: done (75 substitutions, 24 blocks)
# - P3 dry run on a copy, references, doc_checks, the report, the result, LANDED: done
#
# DISPOSITIONS — every issue FIXED in the text (none INVALID, none held)
# - VAT0-01 (blocker; FIX): V04 §3.5.7 (d)'s last clause reads the required text verbatim — once per void kind, plus once
#   for each wing V02's mutator adds over a void (a `MutationPlan` step or a rung-3 op), its key carrying that wing's
#   key, never twice for one key (V06 §3.18.1 (2a); T-V6-34) — with "Item 109 (d)'s … is this row." after it. The same
#   key is named where it is listed: §3.5.7's *Determinism* paragraph and V04 §3.12's dig row (one key, three statements
#   agreeing).
# - VAL-R1-06 (FIX per R2-29 (a)): V04 §5.2 gains *Every shipped sheet* — `ink`, `lit`, `hatched`, `parchment`, `bw-print`
#   (its grey ramp), `night`, `painterly` from V07's V-M1 and the parity presets (their `ink`/`lit` families) resolve every
#   `under.*` semantic, the loader refusing none, a user sheet resolving a missing one by §8.2's slot resolution — and the
#   per-family facts of `under.rock` (`rock`), `under.void` (`void`), `under.water`, `under.wall`, `under.building`,
#   `under.trace`, `under.access`/`under.link`, `under.label`; `painterly`'s from V07 §5.1's programs and palette as they
#   stand (its ground ramp, relief-tier hachures, paper tone, water bands, selective outlining). (1) and (2) point at the
#   table (the rock facts stated once). T-V4-27 loads every shipped sheet at every band. J-V4.131; §1b.1's row; §8's
#   content rows. §8.2's citing end is rendering's (VAL-R1-05).
# - VAT1-02 (FIX per R2-34): V04 §5.1 *Find on Below* (4) reads the required text verbatim (V01 §5.4 (3)'s `gapUnits`,
#   restating none; each undercity neighbourhood and the underground pseudo-district a `district` unit; per-plot units by
#   `underDistance`); UE32 and T-V4-81 (c) name the pseudo-district's gap.
# - VV34-r1-09 (FIX): T-V4-81 gains (i) (the city band's pins under about 6 px and the count bubbles at about 24 px, the
#   bubble's number its members; item 120 (e), (k)), and (f) runs a load, a redo, a regenerate and a migration, the glowing
#   set, ghost pins and band counts equal to a fresh reading, the chips kept in the view pin. UE32's E3 states the city
#   band's rule and names (c), (f), (i).
# - VEW-07 (FIX per R2-25): T-V4-2 gains the no-water fixture in the required words (a TOWN and a CITY, no river, lake,
#   sea, canal or oasis, `moat: 'none'`: one field outfall beyond the outermost enceinte's outer strip, `requestedVsBuilt`
#   naming the cess field, 0 `frame` outfalls), so II.7.2's pointer resolves.
# - VEW-r1-07 (FIX per R2-25 (a)): V04 §3.2 N7 (1): `low = s + freeboardCm`, `s` the receiving water's surface as §2.6's
#   water table reads it — a moat's the derived level of §4.2 S3 (10), every other body's terrain height at the shore;
#   T-V4-2's outfall clause reads the same `s`; T-V4-80 (j)'s walled core in a wet moat runs on level and on sloping
#   ground, the mouth `freeboardCm` above the moat's level, never above its bank; V04 §12's CONFIRMED water-table line.
# - VV34-r1-08 (FIX per R2-25 (b)): V04 §3.2 N2 states (a) the order — N3's way, culvert and drainage edges first without
#   outfall runs, then the banks, then each candidate's link and bank, admission and its moat and field fallbacks bank by
#   bank in N3's bank order, the outfall-run edges joining last before the tree search (N3's edge list says they join
#   last); (b) a candidate's bank — its link's, the link the nearest way junction (under `drainage-lines` the nearest
#   graph node) within `outfall.linkM` whose segment crosses no water face, ties by address, a candidate with none
#   dropped; moat candidates take links and banks the same way; (c) a bank's stretch — the boundary `hydro` cells whose
#   nearest graph node, ties by address, lies on that bank (R2-25's rule), a cell "on water" when each of its D8
#   neighbours outside `R` lies in a water face; the field outfall searches the stretch's cells not on water, and a bank
#   whose stretch is empty or wholly on water drains by gutter and pit — so the field outfall and that case read one
#   partition. The field outfall's own run, which the text never connected, follows its D8 path back to the stretch's
#   cell and joins that cell's nearest graph node (JUDGMENT CALL (10)). V04 §3.11's outfall row and T-V4-80 (j) use the
#   stretch's words; T-V4-80 (j) otherwise unchanged.
# - G126-V04 (FIX per R2-41): V04 §1.3's Find line drops "phone sheet". No other phone clause exists in V04 (scan: 0).
# - G123-V04 (NEW DESIGN per R2-38 (4), R2-35, R2-36; all four verifiers' versions satisfied): new V04 §5.6 *Damage below
#   ground* (J-V4.130): (1) a storey below 0 reads its building's `decayLevel`, an underground building its own lineage's
#   (its decay run started by the underground's own events — a `lost` cluster's abandonment, a shrinking or cleared
#   neighbourhood, a floor `Foundations.apply` collapses), never a closure state; (2) `belowKind` and five kinds of their
#   own — `cellarWall`, `cellarVault`, `cryptWall`, `cryptVault` (each cell of the crypt's column grid, never a new id),
#   `cryptTomb` — each V11's row, its threshold §6.3's `plan.damage` draw keyed (lineage, element id); their ranges inside
#   the `ruined` share, the crypt's at its top; a damaged one partly collapses, never removing a room, wall line, way down
#   or join; the lowest storey's floor no element (a ruined church keeps its crypt at level 1); (3) the drawing below
#   ground — V03's plan of a storey below 0, a stair below 0 as climbable rubble, the `ruin` program's stipple, patch
#   material by `decayPeak`; the underground view's footprints as V02 draws an exterior (a fallen outer run a gap, a
#   `cellarWall` run kept closed, a roof bay a hole, a door an open gap), §5.3's prisms following, a `collapsed` or
#   `flooded` element's state row over it; (4) a drawing only — no stage, link, access or excavation reading reads a
#   level; a way closes only by V04's closure states; a `lost` cluster stays lost; a collapsed access head is V03 §5.3's
#   trace; (5) exports — per-band PNG/SVG drawn, the per-band VTT's line of sight following fallen runs and doors
#   (T123-6), GeoJSON/glTF/CityJSON/CSV the model only; (6) landing U5 (R2-36: M6-U), the storeys below 0 with V03's
#   item-123 step, the level read at V11's default age until V06's E2. Its rows: V04 §1.2 (item 123's base side; the V03
#   plan parts), §1.3 (scope), §1b.1, §1b.2, §1b.4, §2.6 (the lifecycle row), §3.11 UE33 (level 0 and 1, restoration, a
#   ruined church's crypt kept, a building over a void) and UC21 (the damage × the access model), §3.12 (draws nothing of
#   its own), §5.2 (5), §5.5, §6 *Damage below ground*, T-V4-82 (takes T123-1's, T123-2's and T123-6's clauses below
#   ground: monotone, ids unchanged, the same element at the same level for a seed, the hash unchanged, a never-decayed
#   underground byte-identical), §8 (U5, 0.25 pw), J-V4.130, §10's intro, §11 Q2's cost, §12, §13's hand-off rows.
#
# RECEIVING ENDS THIS ROUND (Part H · V04; R2-05)
# - R2-12: `AccessPassStrategy.run(doc, rules, ctx, k, scope?: EpochScope)` (II.7.6) at V04 §1b.2, §3.5.7 *With a scope*
#   and §3.10 — and at every other place V04 named the pass (§1.3, §2.6, T-V4-56, T-V4-72 (e), §8's U5): 0 `AccessPass.run`
#   left.
# - R2-28 (a): V04 §3.5.2 reads `Terrain.mining` (§4.2 S1 (10)) instead of restating the test; §1b.5's mining row names
#   the field.
# - R2-32 and R2-35: T-V4-81 lands at U5 (§8: M5, Find's milestone, precedes M6-U); its head names T120-4 (by (f)) and
#   T120-5 (by (i)); V04 §1.2's hook row and §7's head list T120-4, T120-5, T123-1, T123-2 and T123-6; §10's BCR-V4-15
#   reads "the bars of V04 §7 (every T-V4 test)" (R2-06 (a)'s form).
# - R2-36: item 123's V04 part at M6-U (U5). R2-41: above.
#
# JUDGMENT CALLS (vetoable; J122 where new design) — each recorded in V04 §9 or stated at its home
# (1) Five kinds of their own below ground with these names (J-V4.130); every other element below ground keeps its V03
#     kind. (2) Their ranges inside the `ruined` share of V06 §3.23 (2), the crypt's at its top — item 123 (c) gives
#     cellars and crypts the `ruined` look; V06's own §3.23 (2) places each kind's range in the third whose look item 123
#     (c) gives it, so the two agree. (3) A damaged wall below grade partly collapses (a 60 cm rubble spill) and stays a
#     wall to sight and passage — earth or rock behind it; an underground building's rock-side runs take the same kind.
#     (4) The lowest storey's floor is no element (it lies on the earth). (5) The crypt's vaults by the cells of its
#     column grid (V03 §3.7.5's grid, which no rank event moves), a crypt with no cell centre inside its ring one bay.
#     (6) A stair core or access head below 0 draws as climbable rubble, the way being the access model's. (7) GeoJSON,
#     glTF, CityJSON and CSV export the model, never the damage (item 123 (e) names the battle-map exports only).
#     (8) Item 123's part priced 0.25 pw in U5. (9) The per-family rows (J-V4.131): each family's own drawing of the
#     matching role, `painterly`'s rock a wash of its ground ramp's darkest step under dense relief-tier hachures, the
#     void one step lighter than the ghosted ground in every sheet, the parity presets by their `ink` (MFCG) and `lit`
#     (FTG) families. (10) The field outfall's run follows its D8 path back to the stretch's cell and joins that cell's
#     nearest graph node by a straight edge crossing no water (the bank's next nearest node where it would) — the live
#     text left it unconnected. (11) Moat candidates take links and banks exactly as admitted candidates do.
#
# HAND-OFFS (R2-05 (3): ends no ruling names, for round 3's verifiers; none is open wording in the design text)
# - Assemble (R2-07: text inside a title's level-1 subsection is Assemble's to set in place): V04's reading note under the
#   title reads "items 1–120 the owner's rules (item 112 the program's, under J122), items 200 and above file f's"; in
#   R2-07's form it reads "items numbered below 200 the owner's rules (item 112 the program's, under J122), items 200 and
#   above file f's" — the volume now reads items up to 126 (123 and 126 this round).
# - V03: its item-123 damage layer draws a storey below 0 by V04 §5.6's kinds and rules (the five kinds' looks, the stair
#   below 0 as climbable rubble, the lowest floor never failing) and exports V03's per-storey scene by V04 §5.6 (5).
# - V11: the item-123 rows of the five kinds `cellarWall`, `cellarVault`, `cryptWall`, `cryptVault`, `cryptTomb`, each
#   range inside the `ruined` third (V06 §3.23 (2)), the crypt's at its top; a compile check that they stay so.
# - scope: §13.2's underground take-over row names T120-4, T120-5, T123-1, T123-2, T123-6 against T-V4-81 and T-V4-82;
#   *The underground layer built* line reads every T-V4 test (V04 §7); §16 reads V04's §8 total from this file (R2-06 (b)).
# - rendering: §8.2's slot resolution lists the underground's `under.*` entries in every shipped sheet, citing V04 §5.2
#   (VAL-R1-05, rendering's own issue — named here for its receiving end).
# - V12: the `item123.damage` pin covers the underground's bands and per-band exports (T-V4-82 (g)).
# - V09, V10: their item-123 panel lines and explanations cover a storey below 0 and an underground building (V03's lines).
# - PENDING CROSS-REFERENCES (resolve when the round's other blocks install): `V06 §3.23` (13 citations; V06 r2's landed
#   APPEND carries "### 3.23 The decay level of a building lineage (item 123)", its (1)–(5) as cited) and the base bars
#   T120-4, T120-5, T123-1, T123-2, T123-6 (25 citations; scope's round-2 §13.2, R2-35).
#
# CHECKS (receipts in the scratchpad's coherence/rV04r2/)
# - Dry run: apply-blocks (amendments-c, two-pass) on a copy of the live V04 with the block file less its FILE line:
#   24 found, 24 applied, 0 skipped; audit 0 not OK; headings 58 → 59 (+ "### 5.6"); fences balanced (12 → 12); title
#   block unchanged; PENDING FABLE REVIEW lines 1 → 1; rationale untouched (630da959…); output sha256 a6647acf2da8a172…,
#   byte-identical to the generator's V04.new.md. The blocks touch only V04 (no other seat writes V04 this round).
# - Every one of the 9 issue ids, and each receiving end, is carried by at least one asserted edit (edits.log). Residue
#   scans of the new V04: 0 `AccessPass.run`, 0 "phone", 0 "never draws twice for one kind", 0 "the undercity districts,
#   each outlined", 0 "the shore height + `freeboardCm`", 0 "T-V4-1 – T-V4-81", 0 "These fallbacks are taken".
# - References (assemble-r1's refs.py on a mirror of the live set with the new V04): V04 resolved 2 525 → 2 668,
#   ambiguous 1 → 1 (the pre-existing `§2.7` at §1b.2), BROKEN 0 → 38, all the pending cross-references above (13 × V06
#   §3.23, 25 × the R2-35 bar ids); every other unit's counts unchanged.
# - doc_checks (`--doc` V04.new.md `--heads docs/ARCHITECTURE.md`): C1 0, C2 0, C4 0, S1 0; C3 214 (live 191; the 23 new
#   three-gram runs read — common English: "one step lighter than the", "a gap in the outline", "are drawn in the
#   image" …), S2 127 (live 91; the new ones volume pointers: `V06 §3.23`, V04's own); WARNING "reference corpus
#   INCOMPLETE (missing: captures, research/patreon, research/devlogs, research/ftg-docs, research/external) — clean-room
#   results are NOT authoritative": provisional. V04 §13's clean-room record states this run.
# - Size of the unit (V04 whole): 79 203 → 83 660 words (+4 457, +5.6 %). Sources of the growth: item 123's new design
#   (§5.6, T-V4-82, UE33, UC21, J-V4.130 and the wiring rows: ≈ 3 250 words); every shipped sheet's facts (VAL-R1-06,
#   J-V4.131: ≈ 490); the edges and bars defined this round (VV34-r1-08's order and partition, VEW-r1-07, VEW-07,
#   VV34-r1-09, VAT1-02: ≈ 700). Removed this round: restatement — the mining test (§3.5.2 now reads `Terrain.mining`),
#   the rock's per-family parenthetical (one table), BCR-V4-15's restated range. No narration added. The shrink band is
#   not this round's: the growth is owner-item content and defined edges (principle (9)'s guard).

