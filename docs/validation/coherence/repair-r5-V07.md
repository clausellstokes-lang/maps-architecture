# Repair round 5 — V07 (the village product) — lane coherence/repair-V07-r5

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-V07-r5; covered by the whole-design retrovalidation (J84).

# Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): text before the first block header is
# ignored; the FILE line routes every block to docs/volumes/V07-village.md. Live unit: V07 as assemble-r4 left it
# (sha256 a55c4d0803b7a755…, 605 033 bytes, 4 068 lines). Each REPLACE body is the live subsection with count-asserted
# substitutions (scratch rV07r5/build.py: 33 edits, each found exactly once in its subsection and once in the whole file);
# every untouched line is verbatim. Blocks: 12, all REPLACE — ## 1b, §2.2a, §3.5, §3.5a, §3.13, §3.17, §4.5, §5.5, §5.6,
# ## 6, ## 7, ## 8. No heading retitled, no whole-volume REPLACE, the title block untouched. Ruling requests: 0. END lines
# owed: 1 (written, folded into VAL-R4-03's text as Part H rules).
# Binding rulings applied (adjudication-r5, Part H · V07): R5-01, R5-02, R5-05, R5-06; R3-01 – R3-03 and R4-01 (standing).
#
# PROGRESS
# - P0 brief read whole (7 issues routed; 1 END line); adjudication-r5's TOC, R5-01, R5-02 (whole, with its Ends and
#   Sweep), R5-05, R5-06 and Part H · V07 read; adjudication-r3's R3-01 – R3-03 and adjudication-r4's R4-01: done
# - P1 verifier evidence (verify-agree-layers-r4t VAL-R4-02/03/05, verify-edges-world-r4t VEW-r4-02, verify-rendering-r4t
#   VRC4T-04 for the Find budget) and the live text read whole: V07 ## 1b (W74, W83, W84), §2.2a, §3.4, §3.5, §3.5a, §3.12's
#   item-110 paragraphs and hand-off down, §3.13, §3.17, §4.5, §5.5, §5.6, ## 6, ## 7, ## 8; base §2.7's `RaisedWayRecord`,
#   `RaisedFoot` and support step, §4.3 *Lattice and costs*, §4.6's strip, §8.2's `ruinTone`, §10.2 *Crisis looks* (c)–(i),
#   §11.2 *At a drawn week*; V01 §3.16 (3)–(5) and §5.4; V06 §3.15.2 and §3.22 (3): done
# - P2 33 edits written; 12 blocks built: done
# - P3 dry run of apply-blocks.py on a copy of the live V07 (the FILE line dropped, as Assemble routes it): done (CHECKS)
# - P4 result saved; LANDED: done
#
# ISSUES → WHERE FIXED (7 routed ids: 7 FIXED in text; none MERGED, none INVALID; none deferred)
#  VAF-R4T-01 (major; FIX per R5-06)  §5.6 (1): the share's count reads "— §10.2 (c)'s count k, read for every share at the
#        village rungs, …" and adds "; the disaster's `neighbourhoods` place then strikes at least every matched target —
#        the first max(k, |`matched`|) units of its order — and, by fire, stops where its order ends, the shortfall
#        reported (V01 §3.16 (5), the home)". T-V7-69 (c) adds the bar as written (a VILLAGE fixture whose calamity names
#        more ends than k; a fire whose order ends before k). Swept: §3.17's crisis edge row's data cell adds the two cases
#        (every named unit struck; the shortfall reported).
#  VAF-R4T-02 (major; FIX per R5-05, amended)  §5.5 (1) builds the list over the model the view draws (the head, or at a
#        drawn week whose frame is not the head V06 §3.15.2's frame, §11.2's *At a drawn week*); its **areas** bullet adds
#        "at such a week, the ends and field groups that frame holds"; (2) adds the units and members read over that frame
#        ("an end the frame lacks is no unit"; V01 §5.4 (3)); (4) re-evaluates at every change of the drawn week; W83's
#        input cell reads the drawn week; T-V7-68 adds the scrubbed-week clause as written, its timing cell "…; its
#        scrubbed-week clause at the latest of V-M3, M5 and V06's E6 (V06 §3.15.2's frames)" (Part H's amendment, not the
#        verifier's "first exit after M6-E's history frames"). Swept (R5-01 (2) (c); R5-05 (b)–(c)): §5.5 (5)'s index
#        "rebuilt once per commit" adds its re-derivation from the frame at each change of the week and the ≈ 100 ms
#        re-evaluation off the scrub's path (§12.5, the base's budget under R5-05 (b)), which T-V7-68's new clause runs;
#        §3.17's Find edge row's lifecycle adds the drawn week; ## 8's V-M3 test cell and risk (13) schedule the clause at
#        E6 as T-V7-68's timing cell does.
#  VAL-R4-02 (major; FIX per R5-02)  §3.5a (3)'s two bullets as written: *Supports are obstacles* adds the ramps, stairs and
#        each `vault` span's under-deck strip (impassable by §4.3), the grid index "of those obstacles"; *Under a span*
#        admits a crossing only where §4.3 admits a part-0 way (an `open` span, `clearWidthM` between the supports' rings,
#        *The clearance*, `squareDeg`), never along the strip, a step entering it elsewhere turning by the rule above, a
#        `cleared` span's ground free as a `cleared` support's is ((2)). T-V7-48 adds the clause as written, on a declared
#        viaduct crossing the populated area with a `vault` span and an `open` span below *The clearance* for a `road` (so
#        a build letting trackers pass under any span fails it). Its pipeline end is R5-02's P1 (pipeline's seat). Swept
#        (R5-01 (2) (a), V07's village restatements of the crossing rule): §3.5 step 4 ("its supports are obstacles and its
#        spans are passed beneath" → the obstacles and the crossing only under a span §4.3 admits); §2.2a's `raised` row
#        (the clearance grows every raised-way obstacle; the turn cells turn round any of them); §3.13's F-V-TRACK trigger
#        ("blocked by a raised way's obstacle or its under-deck strip"); ## 6's obstacle index.
#  VAL-R4-03 (major; FIX per R5-02, amended)  §3.5a (4) replaced whole by Part H's text (the palisade a wall laid after the
#        raised way, §2.7's support step (6) (d): supports, ramps, stairs, feet and `vault` spans' arch vaults taken into the
#        line, an arch vault abutted at its walled-up arch mouths; no gate under the deck, a gate in the under-deck strip
#        moved along the trace; a carried-down crossing station kept with its raised gate or arch, the one gate at a support
#        the palisade carries). §3.17's palisade row and its test cell T-V7-48, and T-V7-48's palisade clause, as Part H
#        words them. The model's and pipeline's ends are R5-02's (3) held-stretch clause and P12 (their seats).
#  VAL-R4-05 (major; FIX per R5-06)  T-V7-69 (c)'s look clause as written (every building the look stands over, §10.2 (f);
#        a rebuilt building drawing its Works from that week; none outside); its dossier fixture adds "a disaster whose
#        rebuild Works begin on some of an end's buildings inside its weeks".
#  VV78-r4-01 (major; FIX per R5-06)  §4.5's crisis line as written (an end of a disaster look's units while the look stands
#        over a building on its plots, `crisisLookYields` not yet true at `opts.view`'s week, a preview never handing
#        over, as the end's `ruinTone` stands); W74's input cell adds `crisisLookYields` on the end's buildings
#        (`villageUnitPlots`); §5.6 (6) "an end the disaster look stands over (§10.2 (f))"; T-V7-69 (e) as written.
#  VV78-r4-02 (minor; FIX per R5-06)  §5.6 (3)'s **The look** as written (the look standing over each building until its
#        `crisisLookYields`, a preview never handing over; the units' tone while the look stands over any of their
#        buildings); §5.6 (5) "the ruined units' tone ((3))"; §3.17's hand-off row "V07 §5.6 (3)'s units (its ends, or an
#        end-less thorp's toft groups) after a hand-off down". Swept (R5-06's sites §5.6 (1)–(8)): §5.6 (4)'s "yields
#        building by building to its rebuild's Works" (the same narrower restatement) reads "leaves each building as (3)
#        states (§10.2 (f); V06 §3.22 (3)'s `crisisLookYields`), the rebuild's Works at a village rung being the siting's
#        regrowth-first rebuild".
#
# END LINES WRITTEN (1)
#  END of VEW-r4-02 (model; R5-02)  folded into VAL-R4-03's text as Part H rules: §3.5a (4) abuts a `vault` span's arch
#        vault at its two walled-up arch mouths, the chamber kept whole and closing the line, never laid through it;
#        T-V7-48 runs it on a declared viaduct with a `vault` span in the planned palisade's band (0 palisade stretches
#        inside an arch vault's footprint, no gap in the line). Before V04's arch-vault source lands, risk (8) already moves
#        the T-V7-48 clauses that read vaults to the first milestone after it.
#
# SWEEP (R5-01 (2); R5-02's, R5-05's and R5-06's V07 sites). V07 searched for "support", "obstacle", "beneath", "under a
# span", "under-deck", "abut", "gate", `supportClearM`, `turnStepCdeg`, F-V-TRACK; "ruined end", "ruins", "ends' tone",
# `crisisLookYields`, `villageDisasterUnits`; "gazetteer", "committed records", "re-evaluat", "rebuilt once per commit",
# T-V7-48, T-V7-68, T-V7-69. Conformed: the sites named under each issue above. Read and left as they stand: §3.5a (2)
# (a standing support an obstacle, an abutment and a hole — still true), (5)–(11); §3.5 step 3 (the gate law; (4) moves a
# gate out of the under-deck strip, the base's (6) (d) moves a tower); §3.4 step 5 d.'s anchor tower (the base's (6) (d)
# moves a tower in the under-deck strip, the palisade "a wall stretch laid after" it); §3.12's item-110 paragraph and its
# hand-off down (R5-02's sweep: stands; the carried-down station is (4)'s), §3.12a (4)'s "abuts it as it abuts a support"
# (stands per R5-02); §0's plain words ("the lanes passing under its arches"); J-V7.83 (a decision record: "its supports
# obstacles" stays true, the full rule lives in §3.5a (3)); §5.6 (7) and §3.17's "a THORP of one house … ruined at any
# positive share" (the count, unchanged); W84 (its consumers read V06's predicate through W93, not V07's); §2.6's units row.
#
# REQUIRED CHANGES NOT APPLIED AS WORDED: VAL-R4-03's own text (an addition to the old (4)) is superseded by Part H's
# replacement of (4) whole under R5-02, written as given; VAF-R4T-02's timing clause is Part H's amendment (above). Small
# conformances inside the required texts, none changing a rule: VAL-R4-02's *Under a span* says "clear width between the
# supports' rings" (R5-02's P1 wording) and "a `cleared` span's ground is free, as a `cleared` support's is ((2))" ((2)
# defines the support's case); the grid index reads "of those obstacles" (it now holds ramps, stairs and strips).
#
# HAND-OFFS (for round 6's verifiers; none blocks a V07 fix): (1) §3.5a (3)–(4), T-V7-48 and §3.17 cite §2.7's support
# step (6) (d), (3)'s held stretch and §4.3 *Lattice and costs* as R5-02 rewrites them (repair-r5-model, repair-r5-pipeline
# in the same assemble); the live base still carries R4-09's (6) (a)/(b). (2) §5.5 (5)'s ≈ 100 ms drawn-week re-evaluation
# cites §12.5 as repair-r5-rendering writes it under R5-05 (b) (VRC4T-04). (3) The pipeline's end of VAL-R4-02 (§4.3 adds
# "V07's village trackers (V07 §3.5a (3))") is R5-02's P1.
#
# SIZE (whitespace-split words, the whole volume): 100 120 → 101 119 (+999, +1.0 %). Nothing removed but the narrower
# restatements the rulings replace; every added word is content the issues, R5-02's (4) text, R5-05 and R5-06 require (the
# raised way's obstacles and crossing rule at the village, the arch-vault abutment, the carried-down station, the
# drawn-week reading and its re-evaluation, the disaster's count, the hand-over predicate at every reader, the bars and
# fixtures that run them, the milestone cells). A targeted repair of seven defects offers no restatement, narration or
# duplicated mechanism to cut beyond those it replaces; below the band for that reason.
#
# CHECKS (P3): apply-blocks.py over copies of the live V07 and a stub rationale — 12 found, 12 applied, 0 skipped, audit
# not-OK 0 (every body present once); headings 58 → 58, none added or removed; fences 18 → 18, balanced; title block
# unchanged; PENDING FABLE REVIEW lines 1 → 1. Output 605 033 → 610 850 bytes, 4 068 → 4 095 lines, sha256
# 7747179dc9854aa6… — identical to the independent whole-file application of the 33 edits. Every table row keeps its
# header's cell count (unescaped pipes; T-V7-69 (c)'s "max(k, \|`matched`\|)" escaped as V12's row escapes it). In the
# added lines: 0 review ids (R3-02), 0 deferral words ("later" only in milestone cells and "a later epoch"), 0 phone text
# (item 126 (a2)). T-V7-1 – T-V7-69 (69) and J-V7.1 – J-V7.146 (146) unique, none added. Every new reference resolves:
# §2.7's support step (3), (6) (d) and *The clearance*, §4.3 *Lattice and costs*, §10.2 (c), (d), (f), §11.2's *At a
# drawn week*, §12.5, §8.2's `ruinTone`, V01 §3.16 (5), V01 §5.4 (3), V06 §3.15.2, V06 §3.22 (3)'s `crisisLookYields`,
# V06's E6, `raisedWays.structure.clearWidthM` and `squareDeg` (V11 §3.24.2). docs/validation/bench/doc_checks.py on the
# live and the patched V07 (`--heads docs/ARCHITECTURE.md`), with its warning: "reference corpus INCOMPLETE (missing:
# captures, research/patreon, research/devlogs, research/ftg-docs, research/external) - clean-room results are NOT
# authoritative" — provisional counts live → patched: C1 0 → 0, C2 0 → 0, C3 365 → 366 hits (319 → 320 unreviewed), C4
# 1 → 1 (0 unreviewed), S1 0 → 0, S2 406 → 414 (0 unreviewed both). The one new C3 run is "the palisade is a wall", a
# plain English phrase of Part H's prescribed text for §3.5a (4) (no reference identifier, list or table); it is listed
# for the corpus-holding re-run's review.

=== FILE docs/volumes/V07-village.md ===

=== REPLACE ## 1b Wiring table ===
## 1b Wiring table

Every piece this volume adds, what feeds it, what it feeds, the base hook it plugs into and the dossier facts it reads
(nothing orphaned, nothing dangling). The lifecycle of each stored field is V07 §2.6's.

| # | piece | fed by | feeds | base hook | dossier trace |
|---|---|---|---|---|---|
| W1 | `ProductDecl('village')` (V07 §2.1) | `@plat/village`'s registration at load | `LadderRouter.route`; the stage set (V07 §3.0); the replay of a village creation (§2.9); the port's consultation (V08 §3.10); the epoch runner's overrides, participants and records placement (V07 §3.12) | `StrategyRegistry.products` (§4.12, §14; item 202) | DR23 (the rung) |
| W2 | the THORP, HAMLET and VILLAGE rows of `ladder.json` (§1.1; V07 §2.1) | the shipped table; `editTable`; the corpus stage | `LadderRouter`; S0; the frame (V07 §3.2 (1)); V07 §6's budgets; §4.11's rung at an epoch; II.6 and II.7's gates (`none`, `never`) | `RungProfile` (§1.1; item 201) | DR23 |
| W3 | `village.json` (V07 §2.2) with its `VG` column | the shipped table; `editTable`; the corpus stage | S0 (V07 §3.1), the frame, S2's households, VS1–VS8, S10's toft rows, V07 §3.12's epoch rows, the `VG` preset | §7.6's tables and presets (item 377) | DR1, DR2, DR5, DR7 read its rows |
| W4 | `VillageRequest` (V07 §2.7) | the request; T1 `intend`; the port's creation prefix (V07 §3.11); the skeleton file | S0's resolution and `autoResolved`; VS1 (a declared heart); VS4 (declared entries) | `Blueprint` (item 287) | DR1 (terrain → water), DR2 (walls, access), DR3 (bearings) |
| W5 | S0's village draws — water, form, roads, palisade, open space, field system, `δ` (V07 §3.1) | W4, W3, `blueprint.features`; the climate row's arid chances (item 111) | VS1–VS6, S12a, the report | S0's feature table (§4.2 S0) | `site.culture` (forms), access (roads), a bridge-implying kind (V08 §2.6b (3)) |
| W6 | the `course-first` `RiverStrategy` (V07 §3.2 (2)) | S0's water type | S1's carve and crossing sites; VS1's mill seat; VS4's crossings | `RiverStrategy` registry (§4.12; PART III) | DR1 `riverside` |
| W7 | `VillagePlan` from VS1 — heart, nuclei, character, `R_s` (V07 §2.3, V07 §3.2) | S1's site, S2's roster, W4 | VS2, VS3, VS4 (branch spacing, rim), VS5 (`buildingScale`, `depthRatio` → S11), VS8's ends, the spotlight (V07 §5.1), labels, exports, the clerk (W74) | `StageDecl` (§4.1); entity registry (item 267) | DR1 (site), DR7 (the dwellings in `R_s`) |
| W8 | the mill seat and leat (V07 §3.2 (7)) | S2's watermill demand; S1's carved bed | the L0 `canal` and its deck; the mill's reservation → VS4's routing, S10b's mill placement | S3's reservation and carve forms (§4.2 S3 (2), (10)) | DR19 `river_mills` |
| W9 | the density raster and `FieldBands('density')` (V07 §3.3), with item 111's water pull | S1's terrain and water (the oasis and spring included); W7; W42; the climate row's water-pull weight | VS3's keep test; VS4's tracks and branching; VS5's perimeter; S10a's quotas; S10b's race; V07 §3.9's orchards; V07 §3.12's infill; T8 `fill`'s brush; the spotlight | §4.5's field type; §7.2's brush | `oasis_water` (through DR1's oasis) |
| W10 | the palisade plan and its `Enceinte`, with the barrier closure, the reach and the stretch profile (V07 §3.4) | W9, W7, S1's water, bank kinds and slope; the gorge features; V11's `walls.barriers` rows | VS4 (gates, push, the wall band; free passage over closing arcs); S7's gate and anchor furniture; VS5 (the reached ground); VS6's reached faces → S10's intramural closes, typed by S12b; V07 §5.1's palisade look; the clerk's "why is this side open" | `EnceinteStrategy 'palisade'` (§4.12; PART III item 2); `Enceinte.closure 'barrier'` and the stretch profile (item 106; item 312) | DR2 wall records (the record's words → kind; V07 §3.11) |
| W11 | the tracker network — ways, junctions, `entries`, `approaches`, landings (V07 §3.5) | W9, W10, W7, S1's crossing sites, W8, the partners' bearings | S7 (bridges, fords); VS5; VS6's runs; S9; V07 §3.9's farmsteads; the wharf (W23); labels and exports | `NetworkStrategy 'tracker'` (§4.12; PART III item 3) | DR2 access → topology; DR3 bearings |
| W12 | the open space — a green or a square (V07 §3.6) | VS4 seeding 2; W9; W7 | VS6's rim runs; S10a's rim multiplier; the market rank; the halls' claims (W65); `dist.market` (W64); VS8's centrepiece, stalls and green end; labels; the painterly green | `Reservation` (item 215; `plaza`) | a dossier market record (V07 §3.6 (4)); the Alehouse & Common quarter |
| W13 | the perimeter and the one `village` district (V07 §3.7) | W9, W10, W11, W12 | S7b; S12a's hinterland faces; VS6; S12c; labels; exports; V07 §3.12's retype at the hand-off | `District.kind` (item 214); §4.5's pass 1 | DR5 (one district) |
| W14 | the village prosperity drivers with item 102's term and item 111's water term (V07 §3.7 (3)) | W13; W42's terrain daylight and the palisade's shade (VS5's one pass); the climate row's sunlight cell | S10a; S10b's class mix and sunlit-side preference; S11's templates | §4.5's field; items 102, 111 | DR6 wealth |
| W15 | the `village-ways` fabric — frontage runs, back closes (V07 §3.8) | W13, W11, W9, W7 | S10's `toft` slots; S10a's quotas | `FabricStrategy` registry (§4.12; PART III item 3) | — |
| W16 | toft plots (toft, croft, drive) and closes (V07 §3.8) | S10 with W3's toft rows | S10b; S11; S12b's yard planting; V07 §3.12's infill and decline; address numbers; exports | `PlotStrategy 'toft'` (§4.7); yard-part data rows | DR7; the landmark yard parts (V07 §3.11) |
| W17 | block quotas and the slot race (V07 §3.8) | S10a (W9 × the multipliers); `village.slot` | S10b's generation fill; V07 §4.3's locality | S10a's block `Allocation` (§4.5) | DR7 (the dwelling count) |
| W18 | the village classes (`v.` keys) as typed rows — label and synonyms, family, template family, distribution and significance, presence entries, powers and sectors, `deckOk`, balance, profile deltas and authored rows, and each row's `commonness` (V07 §2.4) | the roster tables (V11 cites them and compiles them by its rules, `commonness` at step 5a; T-V7-56); `rules.presence` | S2 (the presence column); S7b; S10b; S11's templates; item 72's character; the deck-plot cutter (`deckOk`); the clerk's "why" (`cls/<class>/<n>`); V09's roster reader and stamp palette; V08 §4.6's notes' `class` word; the refusal V10 renders | `BuildingClassRow` (§10.2; item 576's `presence`); S2's government step reading `villageSeat` alone at territory rungs (item 576 (c); V07 §3.2 (3)); items 103, 104 | DR9, DR10, DR11 (the forced seats), DR24; V08's `threat` and `threats` rows; item 104's archetypes |
| W19 | `BuildingClassRow.villageForm` (naming a `v.` key) and the tag fallback (V07 §2.7, V07 §3.11), in the order pseudo-reader → village form → own row → fallback | V11's rows and pseudo-classes; V07 §3.11's fallback rows | S2 and DR24 at village rungs; the port's one `unmapped_kind` note naming the class the fallback gives (V08 §4.6) | `BuildingClassRow` (items 430, 432) | DR24 |
| W20 | S12a's village presets, the land budget and the suitability claim (V07 §3.9) | S2's farm demand; W13's hinterland faces; the daylight share; S1's resources; the oasis's gardens (§4.9) | the hinterland unit's `LandUse` faces; W21; W22; labels; exports; V07 §3.12's retype | §4.9's presets (item 315); `FarmTable` | DR19 deposits; DR1 terrain `forest` |
| W21 | `VillageField` (V07 §2.7) | the hinterland unit (W20) | field labels; exports; the clerk (W74); V07 §3.12's land-use turn; T9 `shape` and T11 `name` | entity registry (item 267) | — |
| W22 | outlying farmsteads (V07 §3.9 (5)): `N_o` of the dwellings `N` (V07 §3.2 (3)) | W11's approaches; W20; S2's `H_f`, `H_o` | the hinterland unit's S10b; DR7's count (`N_v + N_o`); labels | §4.9's outside plots and farm modes (item 314); `farm.outlyingShare` | DR7's farm households |
| W23 | the wharf, landings and piers (VS4 seeding 5, V07 §3.10) | W11's landings (`Landing`, V07 §2.7); S2's dwelling count `N`; S1's water | `quay` and `pier` ways → S7, render, exports; the `v.landing` site; `dist.harbour` (W64) | the water furniture (§4.8); the network's output | DR2 access `port`, `river`; the Fishing Landing quarter |
| W24 | `VillageEnd` (V07 §3.10) | the plots; the anchors (W12, the church, the manor, W8, crossings, entries, W23, nuclei, claims) | S13's labels; exports; the clerk (W74); the port's quarter matcher; V07 §3.12's sub-area labels | entity registry (item 267); §7.7 item 16's naming claims | DR5 quarters → ends; DR14 names |
| W25 | the village pins — `stocks`, `maypole`, wells by coverage, the moot place, the market stalls, and the pin a pin record forces (`shrine`, `market_cross`, `well`, the churchyard `cross`; V07 §3.10) | VS8's rows; the coverage rows; the `@pin:<kind>` records; at a village epoch `village.pins` (W72) and `village.records` (W70), the latter also on an absorb and for a pin-record lesser whose REPLACEMENT greater arrives | glyphs (V07 §5.1); labels; exports; the records' bindings (V07 §3.11 step 1; V08 §3.5.1 (c)); a forced pin tombstoned by `village.records`' `remove` with its record, a bound one unbound | `Pin.kind` (item 255); the village's whole furniture — S11's furniture step places none at territory rungs (item 579) | `Common well`; Roadside Shrine; DR11 (the moot); `wayside_shrine`, `water_source`, `multiple_water_sources` (DR9, DR24 → `@pin:shrine`, `@pin:well`); the `mercantile-market` and `sacred-shrine` archetype cells (V11 §3.13.2); the `parish_church` over `wayside_shrine` REPLACEMENT (item 108) |
| W26 | `declareEnd` and `drawWay.walk` (V07 §4.2) | T5 `quarter` and T4 `road` on the three surfaces | VS8; VS6 | §7.1's events (item 357) | — |
| W27 | `retypeLand` (V07 §4.2) | V07 §3.12's decline and a hand `convert` | the hinterland unit's faces; render | V06's `EvolveOp` member (item 209) | `resource_strike`, a depleted deposit (DR19) |
| W28 | the village epoch phases — `siting` with its step (m) (W71) and `growth` — the records placement `village.records` (W70) and the `village.plan` (stage `VS1`), `village.density` (stage `VS2`) and `village.pins` (stage `VS8`, W72) participants (V07 §3.12) | the epoch runner at a village rung — V06's, or before M6-E the base's `grow-by-stage` on M4's grow path at item 202's call points | the epoch's ops; the created or revived `VillagePlan` at the hand-off down; VS2 and the plan's read as base-product participants while it is superseded; their draws under `VS1`, `VS2`, `VS8` (§6.1) and their table reads under the same ids (V11 §3.1 row 61, T-V11-1 (b)) | V06's phases (item 317), the overrides, records call and participants (item 202); V06 §2.1's `EpochParticipant.stage`; §4.11 | the population target (the absorb, DR23) |
| W29 | the hand-off up and down (V07 §3.12) | the product and rung at the epoch (§4.11) | the district's retype; the green → market; the base's grow path; the derived plan | §4.11's rung at an epoch; V08 §3.10 | DR23 |
| W30 | the port's consultation of `LadderRouter` for `[1, 1 500)` and the village DR rows (V07 §3.11) | the village `ProductDecl`, consulted by the port through `LadderRouter` (item 202); the digest | creation and absorb on the village rows | item 202; §7.7 | every row of V07 §3.11 |
| W31 | the `painterly` programs and the village roles (V07 §5.1) | the style sheets (data) | the display list's paint (§8.1); B-ZOOM | `PaintProgram`, `StyleSheet` registries (§8.2) | — |
| W32 | the GeoJSON village layers (V07 §5.4) | W7, W12, W16's closes, W21, W24, W11's approaches | exports; the skeleton file | the `Exporter` registry; the export mapping | — |
| W33 | the village concerns (V07 §3.14) | the concern registry | VS1–VS8; S12a's village presets | §6.1 (item 344) | — |
| W34 | the `VG` parity preset (V07 §3.15) | W3's `VG` column and the switches | B-REF's VG rows; the side-by-side (§13.6) | §7.6 (item 377) | — |
| W35 | the village budgets and the `B-VILLAGE` bench (V07 §6, V07 §7) | V07 §6's laws | CI tiers; the milestone exits (V07 §8) | §12, §13 (item 495) | the frozen small-dossier fixtures |
| W36 | the village supply, balance and spacing rows (V07 §2.4's second table) | the roster tables (V11 cites them); V11's goods table | S2's need propagation; S10b's placement order, two-way pulls and relaxation (V07 §3.8); the coverage and spacing terms; the clerk's link explanations | `SupplyEdge` and the balance profile (§10.2; items 105, 107) | `activeChains[]` (W38) bind to these edges |
| W37 | the village rungs' ladder rows — member ranges and step readings (V07 §2.4's third table, V07 §3.11) | V11's step-type table; the dossier's ladder records | S2's member counts; S10b's members (spaced by W36); VS8's QUARTER ends; V07 §3.12's promotions and demotions; the palisade's REPLACEMENT | the step-type table (§10.2; item 108) | `institutions[]` names with a range or a qualifier → DR9 (item 108) |
| W38 | the dossier's `activeChains[]` as village links (V07 §3.11) | V08's chain row (item 105 (i)) | S10b's links between bound members; the entry store (W39); the clerk | the port's DR rows (§7.7; V08) | `economicState` supply chains → V08's chain row |
| W39 | the entry store for imports and exports (V07 §3.11) | W11's entries and W23's wharf; the chain's partner bearing (DR3); the roster's inn and farmstead rows | S10b (a `store` use on the host plot); the import and export pulls; labels; the clerk | item 104 (b)'s import and export pulls | DR3 partners; an `entrepot` chain |
| W41 | VS1's S3 jobs: the `border` chain, the `lattice` and its edge costs, the typed `destinations`, the L0 ponds (V07 §3.2 (8)) | S1's terrain and water; W7's heart; DR3's partners; W8 | the border → every frame-bounded step; the lattice → the leat and S4's router (neighbour roads, polyfocal joins, the `row` spine, F-V-TRACK, stub tracks); destinations → VS4's seeding; the ponds → water, render | §4.2 S3 (3), (10), (13); §3.2 (9) | DR3 partners |
| W42 | `daylight.terrain` — the sunlit share `D` over terrain by nine horizon sweeps (V07 §3.2 (4)) | S1's height raster; the latitude in force by V08 §2.5's rule, a recorded input | VS1's heart score, VS2's sun term, VS5's pass 1, V07 §3.9's suitability — each × the climate row's sunlight cell (item 111 (c)) — the shade map view (V07 §5.1), the clerk | item 102 (a)–(c) (the sampler; `shade = 1 − D`) | DR29's latitude (V08 §2.5) |
| W43 | the anchor law over `P` for every per-rung cell (V07 §2.2) | `village.json`'s anchor points | every reader of a `village.json` cell; S2's presence rows (V07 §2.4) | §7.6's tables | `population` (DR23) |
| W44 | the typed rule cells (V07 §2.2a) | the shipped table; `editTable`; the corpus stage | VS1–VS8, S10–S12, V07 §3.12, V07 §3.16, V07 §5.3 | §7.6 (item 377); reference cells (§7.6) | — |
| W45 | the underground tail at village rungs (V07 §3.16): caverns and ruins, the access pass, scattered dwellings after access | S1's geology and relief; the mining signals; the dossier's ruin, magic and mining sources (V08); the village's buildings, wells and working plots | V04's records → the underground view (V09), labels, exports, the clerk (V10); T3's F6 dwellings; V07 §3.12's growth draws | V04 §3.1's village subset; `StageDecl` (§4.12) | `ancient_ruins`, a ruined-landmark record, `magical_node`, ley-line income, a `magical` history event, the mining deposits (DR1, DR19, DR24; V08) |
| W46 | the village dig rows and the well and mine-working access readings (V07 §3.16 (3)–(4)) | V07 §2.4's classes; VS8's wells; the mining class's outside plot | V04's U-ACCESS draws; `AccessPoint.cause` | V04's `DigRule.classRow`, `UnderOpeningRow` | the mining deposits (DR19) |
| W47 | the ruin marker's site at village rungs (V07 §3.16 (6)) | S12a's decoration sites; the dossier's `ancient_ruins` or ruined-landmark record | `RuinRecord.marker` and centre (V04); the ruin entrance opening; labels | §4.9's decoration table (village row) | `ancient_ruins`; the ruined-landmark archetype (item 104) |
| W48 | the crypt cells and burial faces of the village churches (V07 §2.4) | V07 §2.4's rows (`crypt`, `cryptM2`, the cellar chance) | §2.6's basement draw (V02, V03 §3.7.4); V07 §3.12 step 6's candidates; V04's crypt join (V04 §3.5.7 (c)) | V11's crypt column (item 436) | a dossier crypt fact (chance 1); `graveyard`, `burial_ground` (DR9) |
| W49 | the hand-off up's catacomb step and the hand-off down's maintenance mode (V07 §3.12) | the burial faces with their opening years; the standing underground systems | V06's `under.extend` from the first TOWN epoch (V06 §3.18.2 (1); V04 §3.5.1); V04's stages in maintenance mode (V04 §3.1); U-FADE | V04 §3.5.1; §4.11; V06's phases | the church and burial records (V08) |
| W50 | the hand-off band `handoff.band` and the product fold (V07 §2.1, V07 §3.12) | the epoch targets; the creation's `Recipe.rung` | the phase choice at each epoch; T-V7-14's alternating fixture | §4.11's product at an epoch (item 322) | `population` (DR23) |
| W51 | `Landing` and `FrontageRun`, `village.reached` (transient, V07 §2.7) | VS4 (landings), VS6 (runs, reached faces) | VS4 seeding 5 (piers), S10b's `v.landing`; S10's `toft` strategy (runs, the reached closes), S10a (exclusion) | the stage graph's data keys (§4.1) | — |
| W52 | the ways' decline ladder — hollow ways by `retireWay`, `effaceWay` and `reopenWay` on the land classes on ground part 0 only; decks by V06 §3.19.5, fords with their ways, raised parts by V06 §3.19.2 — and the house platform (V07 §3.12) | V06's street candidate at a village rung through `ProductDeclEpoch.rows`; the regrowth order; a hand `convert` (V07 §4.1) | V07 §5.1's `hollow_way` and `house_platform` roles; GeoJSON (V07 §5.4); regrowth-first (§4.11) | §2.8's decline hooks and §4.11's `DeclineOp` (item 268); the `cleared` existence | — |
| W53 | the VG request mapping and the request fields `orchards`, `forest`, `arableFactor`, `organic`, `district` (V07 §2.7) | the request; T1; the skeleton file; B-VG's baseline rows (item 495) | S0's draws (V07 §3.1), VS4's `turn`, V07 §3.9's VG fields and woods, the `VG` frame (V07 §3.15) | `Blueprint` (item 287) | — |
| W54 | the painterly building, edge, tree and spotlight programs (V07 §5.1) | the style sheets (data) | the display list's paint; B-ZOOM (T-V7-25) | `PaintProgram` (§8.2) | — |
| W55 | the title plate's qualifier and rounding (V07 §5.3) | the resolved water type; `plate.*` cells | S13a's `title` label | §9.5 (item 424) | `tier` (the dossier's word) |
| W56 | the dossier's burial ground, parish burial grounds, external mill, parish church elsewhere, Wealthy and Common Residential and the east phrase readings (V07 §3.11) | V08's rows; V11's `cemetery`, `parish_burial_grounds` COUNT, `@absent:watermill+windmill` and `@absent:church` rows | the burial face (W48), S2's mill and church demand (the presence column), VS8's claimed end, the church's east term | §7.7 (DR5, DR9) | `burial_ground`, `graveyard`, `parish_burial_grounds`, `access_to_external_mill`, `access_to_parish_church`, the quarter names, the Religious Quarter's phrase |
| W57 | generated and drawn `RetainingWall`s at village rungs (V07 §3.8a) | S11's platform levelling (W58), T3 `wall` `retaining`, T2 `ground`'s terrace stroke; a shrunk town's standing walls | the `retaining_wall` role and `retaining.wall` program (W62); the GeoJSON mapping; the clerk (W74); V07 §3.12's decline and the `house_platform` scarp; V04's foundation reach (V04 §3.5.0); the ground datum (§2.6's `deriveBase`) | item 110 (a) (§2.7's record, its state profile §2.2 rule 5); item 506 | DR1 terrain `hills`, `mountain` → the relief whose slopes are levelled |
| W58 | the house platform and `rules.terrace` (V07 §2.2a, V07 §3.8a) | S11's site plan (the footprints); the refined 2.5 m raster; `village.json` | the levelling and its walls (W57); the stair and ramp parts (W61); the ground datum (§2.6's `deriveBase`); V07 §3.12's regrowth repair | `FabricStrategy.levelledUnits` (item 506) | — |
| W59 | the `raised` data key (§4.1's `RaisedRead`) and a raised way on a village map (V07 §2.7, V07 §3.5a) | the ground arena's parts from 1 through the declaration layer (a T4 `road` or skeleton declaration, or a way carried down from a CITY epoch) | VS3, VS4, VS5, VS6, S10, S12a, the hinterland unit, VS8; V04's arch-vault source at village rungs; render (W62); the clerk; V07 §3.12's hand-offs | item 110 (b) (§2.7's parts); item 290 | none: `aqueduct_or_water_system` is a tier-C record (V11), no small dossier declares a raised way, and a "Bridge" landmark string names a part-0 bridge (V08) |
| W60 | deck plots at village rungs, the pier head and `rules.deck`; the deck widths (V07 §3.10a) | VS4's piers and part-0 bridges; item 292; S2's `v.landing` presence | S10b's non-dwelling uses (V11's `deckOk`, the village reading); V02's `@deck` rows through `DeckContext`; VS5's perimeter (deck faces with a foot inside); render; V07 §3.12's decline (plots falling with their deck) | item 110 (d) | a toll-house or chapel record V11's `deckOk` admits on a bridge; the Fishing Landing quarter (the landing's net store) |
| W61 | the `stair` and `ramp` yard parts, the village way-class crossing rule and F-V-TERRACE (V07 §3.8a, V07 §3.13) | W58's walls; `rules.grade`, `rules.terrace.stairFromCm` | T-V7-9's access bar; the `way.stair` and `way.ramp` programs (W62); exports; the clerk | §2.5's data-defined yard parts; item 110 (a)'s way-class rule; V07 §3.13 | — |
| W62 | the painterly item-110 programs — `retaining.wall`, `way.stair`, `way.ramp`, `raised.deck` with `deck.shadow`, `raised.support`, `raised.ruin`, `aqueduct.channel`, tiers by `roof.faces` (V07 §5.1) | the style sheets (data); W57, W59, W60, W61's records; V02's tier roles | the display list's paint (§8.1); B-ZOOM (T-V7-53); §8.4's shadows | `PaintProgram` (§8.2) | — |
| W63 | stepped massing at village rungs (V07 §2.4) and the ruin marker's stepped monument (V07 §3.16 (6)) | V11's specialisation rows (V11 §3.24.3) with this volume's village cap; the dossier's culture key; V04's ancient-culture row | V02's `stepped` family (`layTiers`); the marker's composition; render (tiers by `roof.faces`) | §10.2 `DesignationTemplateRow.composition` | `cultureProfileKey` → DR1 → the culture key the chance reads |
| W64 | `dist.market` and `dist.harbour` at territory rungs (item 576 (b); V07 §2.4) | W12's market-ranked reservation (else the flanking square, the first nucleus's open space, the heart); W23's wharf `quay` way | the `nearMarket` and `nearHarbour` rows and needs of the classes that play themselves at a village rung (`market_hall`, `slave_market`, `harbour_master`, `customs_house`, `warehouse`, `ropewalk`, `granary`); V11 §3.13.4's `stepInward` and `finalSeller` for custom chains (V07 §3.11); the clerk | `ContextVector.dist` (§2.5; item 576 (b)) | the market kinds and the port kinds (`docks_port_facilities`, `customs_house`, `merchant_warehouses`, `ropemaker`, `town_granary`) → DR9, DR24 |
| W65 | `rules.claimArea` and the market halls' claims (V07 §2.2a, V07 §3.6 (4a)) | the shipped table (the `cloister` footprint a reference cell to V11 §3.6.1's `church` row); S2's manifest (a `cloister`- or `market-hall`-family class playing itself); W12; at a village epoch `village.records` for a record and V06 §3.9.6 or step (m) for a roster member (V07 §3.12) | S10's joins (a cloister's plot; a `market-hall`-family plot without a `nearMarket` row) and the rim claim's plot; VS6's capacity estimate; S10b claims-first; the claim-sized joins at village epochs and `village.outsidePlot` (W73); T-V7-42's compile check | §4.2 S3's claim form read at a village rung (an `institution` `Reservation` laid by VS4); V11 §3.6.1's families | `monastery_or_friary`, `fish_market`, `slave_market` → DR9, DR24 |
| W66 | the fair field (V07 §3.6 (4b)) | S2's `fair_ground` member (a dossier `annual_fair` record); VS5's perimeter and its road crossings; `rules.market.fairHa`, `fairAspect`; at a village epoch `village.records` (a record) or step (m) (a roster member; V07 §3.12 (a)) | S12a's commons claim (a `common` face, through `extraInputs`); `retypeLand` to `commons` at an epoch, with the `setAttr` of each `VillageField`'s `furlongs` the faces leave; (8v)'s perimeter re-derivation (a hole); S10b's binding of the member (no building); labels; the GeoJSON `open_spaces` layer; the clerk; the hand-off up (a standing secondary market) | `Reservation` kind `market`, rank `secondary` (item 24) | `annual_fair` → DR9 |
| W67 | the `VG` preset file's entries (V07 §3.15): this volume's `VG` column and switches, V11's five `presets.VG` entries, and the entry of every village-read `presetsRequired` cell | V07 §2.2's `VG` column and V07 §2.2a's cells; V11 §2.2's rule; V07 §3.15's list and rule over V11's compile manifest; the seat landing V-M0, and afterwards the seat landing a change that makes a table village-read (V-M2u) or adds a `presetsRequired` column to one, in that change (J-V7.123) | the loader's preset step (§7.6) under `VG`; V11 §3.2.1 step 4's preset check (V-M0's exit); B-VG's runs (T-V7-23, T-V7-29); V12's provisional-number lint | §7.6's parity presets (item 377) | — |
| W68 | `rules.race.densityPower` and its register entry `cal.village.*.rules.race.densityPower@VG` (V07 §2.2a, V07 §3.8, V07 §3.15) | the shipped table (1 at every rung, the `VG` entry provisional 1); V-M4's one `reference` run against VG (V12 §3.7.1 (c)) when T-V7-23's accepted-share row misses | S10b's race keys (V07 §3.8); V12's register and V-M4's register check; T-V7-23 | §7.6; V12 §2.6's register | — |
| W69 | the register entries of this volume's calibratable columns — `village.json`'s (V-M0) and the `presence` column's (V-M2) (V12 §2.6's `CalibrationEntry`; V07 §8 *The register at the exits*) | the seats landing V-M0 and V-M2, each in its landing change: V07 §3.15's named `…@VG` entry, then `plat calibrate register --defaults --milestone <id>` (V12 §3.11; J-V7.124) | the provisional-number lint (`plat calibrate register --check`, T-V12-20) at PR tier and every V07 §8 exit; V12's milestone exits; the corpus stage's target lists at M-CAL (V12 §3.10.5) | §13.7, §13.9 (V12 §3.11) | — |
| W70 | `village.records` — the product's records placement (`ProductDecl('village').records`, stage `S10b`; V07 §2.1, V07 §3.12 *Records at a village epoch*) | the engine's `dossier` step at a village epoch (V06 §3.2 row 12) and, on an absorb without an epoch, the base's *One path* placement and §7.7 item 2's removal, as item 202 calls it; the dossier event's `seq` (its key) | the placements and removals V07 §3.12 *Records at a village epoch* states — the fair field, a hall's claim and plot, a claim-sized join or W73's outside plot, the market rank, a forced pin (W25), a REPLACEMENT greater, and on `remove` the tombstones, unbindings and a removed market record's cleared rank; a declined record → S10b's `dossier` request | V06 §2.1's `ProductDeclEpoch.records` and `EpochPlacement` (item 202) | the market kinds (`weekly_market`, `market_square`, `periodic_market`, `fish_market`, `annual_fair`, `slave_market`), `monastery_or_friary`, `wayside_shrine`, `water_source`, `multiple_water_sources`, a `mercantile-market` or `sacred-shrine` custom record → DR9, DR24; `parish_church` and `fish_market` as REPLACEMENT greaters (V08 §3.5.1 (c), (d)) → DR9 with item 108; a removed record (`state: 'removed'`, §7.7 item 2) → `remove` |
| W71 | the siting override's step (m), the market members (V07 §3.12 *Village siting*) | S2's manifest at the epoch's target less the standing `fair_ground` and `nearMarket`-hall members (V06 §3.9.1's count, which V06 §3.9.6 leaves to it); V07 §3.6 (4)'s one creation draw against `market.law` | (a)'s fair field and (b)'s hall in the siting batch, before tier (0); the market rank ((d)); the epoch's record, undone by its undo record where the epoch is an undo target | the `siting` phase (`ProductDecl.phases`, item 317) | the market records' collectives (DR9 with item 108) |
| W72 | `village.pins` — VS8's rows at a village epoch (participant at `afterGrowth`, order 60, stage `VS8`; V07 §3.12 *Pins over epochs*) | the epoch's committed state: the housed households, the host faces the epoch tombstoned, the markets' reservations and ranks, (9v)'s new open spaces, the epoch's new crossroads and wells, the government's seat, a `Roadside Shrine` quarter whose claim anchors on no shrine; VS8's rows and its creation draws | orphans tombstoned (step 0), wells by coverage, stalls to count, the new hosts' rows and a Roadside Shrine quarter's shrine, the stocks by the law's crossing, a pin record's re-binding; glyphs, labels, exports (W25); T-V7-57 | V06 §2.1's `EpochParticipant`, V06 §3.2's participant table | `Common well`, `water_source`, `multiple_water_sources` (bound wells; DR9); the `Roadside Shrine` quarter (DR5) |
| W73 | `village.outsidePlot` — (c)'s outside plot (V07 §3.12 (c)) | a claim-sized class with no joinable candidate: V06 §3.9.6 in the `uses` step (a roster member) and `village.records` in the `dossier` step (a record) | the hinterland unit's S10 in its incremental form (the plot on the nearest hinterland face adjoining a road beyond the perimeter, the face's remnant kept), S11's `build` (finished on an absorb without an epoch), `openUse`; the `VillageField`'s `furlongs`; the epoch's record or the absorb's commit | §4.9's outside plots (item 314) | `monastery_or_friary`, `slave_market` → DR9, DR24 |
| W74 | the village `WhyProvider` for `VillagePlan`, `VillageField` and `VillageEnd`, with its `info.village.*` answer rows (V07 §4.5) | the committed records; V07 §2.3's recorded sources (`formSource`, `roadsSource`, `heartSource`), the heart's terms, a field's system, an end's reason; `RaisedRead.origin`; a generated wall's platform; for its view-bound season, festival and crisis rows, the view the `why` carries (`opts.view`, V10 §2.13; §11.2's view-bound `why`) — §2.9's `yearWeek`, `festival`, `crises` and `week` and the view's `looks` answer (DR43's festivals; DR44's standing looks at the viewer's key, the crisis line's V09 `info.crisis.ruinedFor`); V06 §3.22 (3)'s `crisisLookYields` on the end's buildings (`villageUnitPlots`) for the crisis line; none of the three without a view | V10's `why` query and the application's why card (V10 §3.9's owed table); T-V7-61; T-V7-69 (e) (the crisis line) | item 270's `WhyProvider` registry (§2.8; §11.2's `why`) | the recorded dossier sources (`formSource`/`roadsSource` `dossier`) |
| W75 | item 111 at village rungs — the arid water weights, the oasis village, the water pull on the crowding map, the climate cell on the sun readings, the wells' arid coverage (V07 §3.1 (1), V07 §3.2 (4), V07 §3.3, V07 §3.10) | the climate row's arid chances, oasis chance, water-pull weight, sunlight cell and well-coverage factor (V11); S1's oasis and spring (§4.2 S1 (2)); the top well-yield ground (§4.2 S1 (10)) | S0's water draw; VS1's heart; VS2's density; VS5's pass 1 (the base's water term); V07 §3.9's suitability; VS8's wells; T-V7-58 | §4.2 S0–S1, S3 (6)'s `q(x)`, §4.5 (item 111) | `oasis_water` → DR1's oasis; the desert terrain (V08) |
| W76 | item 113 at village rungs — a village over a former town or city and refounding at village rungs (V07 §3.12a) | §4.11 *History-first generation*: the peak (`HistoryHint.peak`, V08), the replay's epochs (V06), a destruction event; the ruined geometry of the former settlement | the replay's hand-off down (V07 §3.12) with its remnant readings; a refounded village's lattice pricing, tracker trace pull, crossing reuse and foundation-slot weight; V04's buried former settlement under a village (V04 §3.5.5 (b)); the clerk's story (V10); T-V7-59 | §4.11 (item 113); DR36 onward (§7.7) | V08's history reading (`peakTier`, `tierHistory`, `populationHistory`, `calamityHistory`, the lifecycle, the ruined higher-tier records) |
| W77 | the palisade's run conditions and patch materials (item 114; V07 §3.4 (8)) | at generation §7.7's DR41; at an epoch V06 §3.7's walls step (need and means); T3 `wall`'s `repairWall` with its material; `walls.patchMaterials`' rows by kind and culture (V11 §3.25.3) | render (V07 §5.1's condition looks, the legend); exports (condition and material; a patch a wall, a breach an opening); the clerk (W74's `info.village.palisadeRun`); T-V7-62 | `Enceinte.condition` (§2.7; a stretch-state profile, §2.2 rule 5) | the dossier's `readiness` label and `wealth` (V08) |
| W78 | the grandeur ceiling at village rungs (item 115; V07 §3.8) | V11's ceiling rows by rung (§10.2's shape); S10b's class mix; DR6's wealth shift; a dossier's specification (V08 §3.16 (3)) | S10b's generation fill and the manor's presence; V02's composition chain (the capped rows); the clerk (`info.village.ceiling`); T-V7-63 | §4.7 S10b's rung ceiling; §10.2 | DR6 wealth; DR11 seats; a dossier-bound record of a class in `grandeur.ceiling`'s `settings.grandClasses` (V11 §3.25.4), or a dossier government whose `villageSeat` names the manor house, seigneurial or crown (V11 §3.21.1) (V08 §3.16 (3)) |
| W79 | the township view at the zoom-out limit (item 116; V07 §5.2) | the map's `bounds` (the territory frame, grown by an epoch or an edit); while a crisis look stands, the bounds of town and camps (§2.9's *The crisis framing*; V07 §5.6) | the view's zoom-out stop, the pyramid's tiles, the export frame; T-V7-64 | §8.8's per-map limit | — |
| W80 | the village through the year (item 117, (f2) included; V07 §5.1) | the view's year position (§2.9), §7.7's DR42 (the dossier's week), the climate's season columns (§4.2 S0, §10.2), V11's season tables by field, garden and water kind and its leaf palettes | §8.2's season, cover, `ice` and `snow` rows over the village's fields, strips, commons, green, ponds, leat, crowns and roofs; exports naming the season; the clerk (`info.village.season`); T-V7-65 | §8.2's season rows (item 117) | the dossier's present week, its latest stamped tick (V08 §3.16 (4)) |
| W81 | the festival decorations of the village rungs (item 118; V07 §5.1) | the view's year position and festival display (§2.9); §7.7's DR43 (window, staging); V11's decoration, staging-keyword and motif tables | §8.2's decoration rows at the village's places (the heart, the green, the church lane, the market, the landing); exports (the image only); the clerk (`info.village.festival`); T-V7-66 | §8.2's decoration rows (item 118) | `traditions[]` (V08) |
| W82 | the village's one-time waits (item 119; V07 §6) | V07 §6's target laws and measured figures; §12.1's reference machine; V11's `perf.qualitySpend` rows (none shipped for a village stage) | the comfort-level bar T-V7-67; V09 §4.21.9's progress view past one second; the VILLAGE row's declared target miss and the fallback's re-declared bar (V07 §6) | §12's comfort level, measured-gain and progress rules (item 119); §4.1's quality budget | — |
| W83 | Find at the village rungs (item 120; V07 §5.5) — the list's village entries, the area targets (the ends, the village, the field groups), the named places, Show gaps' units (the ends) | §11.2's gazetteer at the view's effective key and drawn week (§11.2's *At a drawn week*; V06 §3.15.2's frame); V11's lexicon (labels, synonyms, groups) with V07 §2.4's `v.` words; W24's ends, W21's fields, V07 §5.3's label rows; the view key `find` (§2.9) | V09's Find panel and its `live.find` overlay; §8.2's veil, halo, outline, pin and bubble rows; picture exports (V07 §5.4; §11.1); the clerk's "show me" (V10); T-V7-68 | §2.9's view key `find`; §11.2 (item 120) | the institution names (V08's list entries) |
| W84 | the crisis looks at the village rungs (item 122; V07 §5.6) — the places' village readings and the main approach road, `villageDisasterUnits` and `villageUnitPlots` (the ends, or the toft groups), the village tiers' scale, the crisis lines | the committed records (`VillagePlan.entries` and `.ends`; the palisade with its runs' conditions, W10, W77; the hinterland's `VillageField`s, W21; the outlying farmsteads, W22; VS8's stalls, W25); DR3's partner weights; §2.9's `crises` key and `week`; DR44's standing looks at the viewer's key; V11's `crisis.looks` and `crisis.map` rows | §10.2's placement through V01's `disasterSource` (its `DisasterUnit`s) and `campLand` and V06's `frontierFor` → §8.2's `live.crises`; V02's ruined exterior and V03's look damage (item 123's layer); the village `WhyProvider`'s crisis line (W74); V09's Find `crises` section; picture exports (V07 §5.4); T-V7-69 | §10.2's *Crisis looks*; §7.7's DR44; §2.7's `ConditionOverlay`; §8.2's `live.crises` (item 122) | `activeConditions[]`, the stressors, `calamityHistory[]` with its `targets`, the forces' and travelling groups' headcounts (V08) |

**The dossier facts this volume reads, traced** (field → derivation row → piece): `population` → DR23, DR7 → W2, W17;
`tier` → the title word (§9.5, V07 §5.3); `terrain` → DR1 → W4, W5, W6, and its oasis (`oasis_water`) → W9, W75;
`tradeRouteAccess` → DR2 → W4, W11, W23; the wall records → DR2 → W10; the partners → DR3 → W11; `cultureProfileKey` → DR1 →
W5's forms and the longhouse factor (V07 §3.8); `prosperity` → DR6 → W14 and S2's band shares; `government` → DR11 → W18's
seats (manor, reeve's house, the moot); `institutions[]` → DR9, DR24 → W18, W19; the housing record's range → DR7 → W17;
`spatialLayout.quarters[]` → DR5 and item 16 → W24; landmark strings → V08's `landmarks` row → W16's yard parts and names;
deposits → `site.deposits` (V08 §2.6) → DR19 → W20; custom institutions and active custom chains → item 104 → W18 (V11
§3.13.2's `village` cells) and V07 §3.11's chain placement (V11 §3.13.4, reading W64); `activeConditions` (a migration) →
DR18 → tent clusters at the perimeter; the supply chains (`activeChains[]`) → V08's chain row (item 105 (i)) → W38, W39; an
institution name carrying a count range or a ladder qualifier → DR9 with item 108 → W37; `monsterThreat` → V08's `threat`
row (`Intent.defence` ≥ 0.6) → the `v.watchtower` presence (V07 §2.4); the sea threats → V08's `threats` row
(`PortValues.threats`) → the watchtower at the wharf and the open waterfront (V07 §3.11's DR2); a kind whose `kinds` row
implies a bridge (`Toll bridge`) → V08's `kinds` row → W5's forced brook and its bridge (V07 §3.1 (1)); `ancient_ruins`, a
ruined-landmark record, `magical_node`, the ley-line income rows and a `magical` history event → V08's ruin and magic rows
(DR19, DR24, `HistoryHint`) → W45, W47; `terrain` `hills` and `mountain` → DR1's relief → the slopes W57 and W58 level and
W45's cavern rows; `cultureProfileKey` → DR1 → W63's tier chance; a toll-house or chapel record on a bridge → V11's `deckOk` →
W60; no small-dossier fact makes a raised way (W59); the mining deposits (iron, precious metals, gemstones, coal, copper) →
DR19 → W45's mine boost and W46's working breach; `burial_ground` and `graveyard` → DR9 → W48, W56; a crypt record → W48
with chance 1; `access_to_external_mill` → V11's `@absent:watermill+windmill` → W56 (no mill, milling imported);
`access_to_parish_church` → V11's `@absent:church` → W56 (no parish church, parsonage or tithe barn; a chapel of ease by its
row); `parish_burial_grounds` → V11 §3.12's COUNT → W48 (one burial face per standing church's churchyard); Wealthy and
Common Residential and the Religious Quarter's phrase → DR5 → W56; the church records and ranges → item 108 → the
hand-off's church count (W49); the market kinds and a `mercantile-market` custom record → DR9, DR24 → W12's market rank,
W64, W65, W66, and at a village epoch W70 (a record) and W71 (a roster member); `wayside_shrine`, `water_source`,
`multiple_water_sources` and the `mercantile-market` and `sacred-shrine` archetype cells → DR9, DR24, V11 §3.13.2 → W25's
forced pins, at a village epoch through W70; the port kinds → DR9, DR24 → W64; `monastery_or_friary` → W65's cloister area;
a `town_watch` record → DR9 with item 108 → the `v.watchtower` member's own soft row (V07 §3.11 DR9); the history
(`peakTier`, `tierHistory`, `populationHistory`, `calamityHistory`, the lifecycle, a ruined or remnant higher-tier record)
→ V08's history reading and DR36 onward → W76; the `readiness` label and wealth → §7.7's DR41 → W77; a dossier-bound
record of a class in `grandeur.ceiling`'s `settings.grandClasses` (V11 §3.25.4), or a dossier government whose `villageSeat`
names the manor house, seigneurial or crown (V11 §3.21.1) → item 115's "specified" (V08 §3.16 (3)) → W78; the dossier's
present week — its latest stamped tick (V08 §3.16 (4); item 125 (b)) → §7.7's DR42 → W80;
`traditions[]` (their windows and staging) → §7.7's DR43 → W81; the
institution names → V08's Find list entries (item 120) → W83; the conditions, the stressors and the calamities
(`activeConditions[]`, the stressors, `calamityHistory[]` with its `targets`) and the forces' and travelling groups'
headcounts where the dossier gives them → V08's closed mapping and §7.7's DR44 → W84 (item 122).
=== END ===

=== REPLACE ### 2.2a The rule cells — every other constant of V07 §3, typed (`VillageRungRow.rules`) ===
### 2.2a The rule cells — every other constant of V07 §3, typed (`VillageRungRow.rules`)

Item 23 and DEFINITION §5 ("Rules are data"): no rule constant of V07 §3 stands in prose alone. Each is a cell of
`VillageRuleCells`, `{ value, unit, provenance, calibratable }`, editable by `editTable`, versioned with `village.json` (V07
§2.6) and read by the stage named; a cell given one value is the same at every rung, and a `PLaw` cell follows the anchor
law (V07 §2.2). A cell may instead be a **reference cell** (§7.6: resolved at load, a dangling or unit-mismatched reference
failing the table compile, `editTable` replacing it by a value and its inverse restoring it; J-V7.96): a value another
volume owns is held so, never copied. Provenance is `own` (calibratable at the corpus stage) unless marked `VG`
(`ref:VG 1.6.9`, trace key D5).

```ts
interface VillageRuleCells {
  heart: { latticeM: M; middleShare: number; slopeMax: number; slopeRelaxed: number; crossing: number; crossingM: M; water: number; waterM: M;
    sun: number; wind: number; fertile: number; fertileM: M; frame: number; frameM: M; prominence: number; prominenceM: M; random: number };  // V07 §3.2 (4)
  polyfocal: { extraChance: number; spacingMinM: M; spacingShareRs: number };                         // V07 §3.2 (4), V07 §3.12 (9v)
  settle: { settledShare: number; stretchMajor: number; stretchMinor: number; boxShare: number; boxMinM: M };   // V07 §3.2 (6), V07 §3.3
  mill: { fallM: M; fallWithinM: M; distM: [M, M]; downstream: number; crossing: number; crossingM: M; heartSide: number; random: number;
    leatMaxM: M; leatFallbackM: M; headM: M };                                                        // V07 §3.2 (7), F-V-MILL
  grade: { through: number; road: number; track: number; maxTurnCdeg: Cdeg };                        // V07 §3.5 step 5
  branch: { sideOdds: [number, number, number]; contAfterOne: number; contAfterTwo: number; shoreSteerSteps: number;
    retreatSteps: number; crossingSearchShare: number };                                              // V07 §3.5 steps 2, 6; F-V-TRACK
  formRules: { streetSideSpacing: number; streetBackLane: number; nucleatedCrossroads: number; nucleatedBranch: number;
    nucleatedWithinShareRs: number; crossroadsWeight: number; rowStraightness: number; rowBackLane: number; rowJitterCv: number;
    dispersedBranch: number; dispersedTrackLimit: number; isolatedWeight: number; dispersedDialMax: number;
    organicDialFrom: number /* the planned ↔ organic dial from which `organic` resolves true */;
    districtDensity: number /* δ's multiplier under a `district` request */ };                          // V07 §3.1, V07 §3.5
  openShape: { alongRoad: number; spiralGrowth: number; slopeStretchAt: number; vertexM: M; roadWithinR: number;
    vgTower: { round: number; square: number }; shrink: number; shrinkTries: number };               // V07 §3.6, F-V-OPEN
  market: { law: PLaw /* the market's chance with no dossier market record */; fairHa: number; fairAspect: number /* long ÷ short */ };   // V07 §3.6 (4), (4b)
  claimArea: { cloister: { plotM2: [number, number, number, number] /* m², poor / modest / prosperous / rich */;
      footprintM2: [number, number, number, number] /* p50 by band: a reference cell to V11 §3.6.1's `church` row */ };
    marketHall: { coverage: number /* plot = the family's footprint p50 ÷ this */; aspect: number /* the claim's long side ÷ its depth */;
      depthShareR: number /* the claim's depth at most this × the open space's radius */ } };           // V07 §2.4, V07 §3.6 (4a), V07 §3.8
  perimeter: { closeM: M /* the morphological close */ };                                              // V07 §3.7 (1)
  ends: { minPlots: number; capBase: number; capPerHouseholds: number; capMax: number };             // V07 §3.10
  stalls: { perHouseholds: number; min: number };                                                      // V07 §3.10
  pins: { wellPerHouseholds: number; wellWithinM: M; cross: number; trough: number; shrine: number; maypole: number; stocks: PLaw;
    pond: number; pondWithinM: M };                                                                    // V07 §2.4, V07 §3.2 (8), V07 §3.10
  manor: { moatChance: number; moatWaterM: M; moatWidthM: [M, M]; fishpond: number; fishpondM: M; warren: number; gallows: PLaw };  // V07 §3.8, V07 §3.9 (6)
  presence: { siteReachM: M };  longhouse: { fallLineSlopeMin: number };                             // V07 §2.4's presence tests, V07 §3.10's pin-record rule; the longhouse's axis (S11)
  slot: { startClearM: M; rimMultiplier: number; closeJoin: number; backCloseHa: number; backCloseDepthShare: number };   // V07 §3.7, V07 §3.8
  race: { densityPower: number /* unit none, range [0.5, 3] */ };                                    // V07 §3.8's race keys; V07 §8 risk (2)
  fields: { factor: { key: string /* climate, relief, culture or era value */; system: FieldSystem; times: number }[]; tolerance: number;
    greatFields: number; twoFields: number; furlongHa: [number, number]; headlandM: M; stripM: M; stripRangeM: [M, M]; furrowSlope: number;
    infieldM: M; outfieldCycle: number; commonPerHa: number; stripMaxM: M; claimBandM: M; woodShade: number; arableSlope: number;
    arableDistM: M; woodSlope: number };                                                              // V07 §3.9
  ladders: { replaceShare: number; churchSpacingM: M; churchSpacingShareRs: number;
    ranges: { step: 'COUNT'|'GUILD'|'QUARTER'|'SIZE'; qualifier: string /* the row's label: the qualifier word read for that step */;
      member: string /* V11 §3.12's member class as the class that plays it at a village rung — a `v.` id or a class playing itself — or '*' */;
      range: PLaw[] /* [low, high] */ }[] };                                                          // V07 §2.4, V07 §3.11
  handoff: { band: number };                                                                           // V07 §2.1, V07 §3.12
  vg: { householdDraw: [number, number]; frameM: Record<'small'|'medium'|'large', M>; marginM: M; fieldM2PerDwelling: number;
    fieldOneHouse: boolean; orchardOnHouse: boolean; forestMode: 'fill'|'patches'|'grove'; clearHouseM: M; clearWayM: M; emptyRoadPrune: boolean };   // V07 §3.15
  plate: { populationRound: number; qualifier: boolean };                                              // V07 §5.3
  firstView: { frameShare: number; minM: M };                                                          // V07 §5.2
  ruinMarker: { maxM: M };  mine: { workingDepthM: Record<'open_cast'|'shaft', M> };                  // V07 §3.16
  terrace: { enabled: boolean; slopeMin: PLaw /* share, rise ÷ run; this and the next three are reference cells to V11 §3.24.1's TOWN row */;
    stepMinCm: PLaw; stepMaxCm: Cm; minDepthM: M /* V11's minTerraceDepthM */; stairFromCm: Cm; apronM: M;
    fitSamples: number; edgeSampleM: M };                                                                // V07 §3.8a (item 110 (a))
  raised: { supportClearM: M; endSnapM: M; turnStepCdeg: Cdeg; turnMaxCdeg: Cdeg };   // V07 §3.5a (item 110 (b)); the under-deck strip's margin is §4.6 S8's `raisedWays.structure.stripMarginM` (V11 §3.24.2; no village cell)
  deck: { headChance: PLaw; headM: [M, M] /* length along the pier, width */; parapetM: M };           // V07 §3.10a (item 110 (d)); the least deck-plot depth is V11 §3.24.4's `minPlotDepthM` by deck kind (no village cell)
  tiers: { capPerSettlement: number };                                                                   // V07 §2.4 (item 110 (c))
  refound: { traceWeight: number; traceReachM: M; foundationSlot: number };                            // V07 §3.12a (item 113)
  fail: { dialStep: number; dialTries: number; reachStep: number; palRingShare: number; palRingPoints: number; slotTopUp: number } }   // V07 §3.13
```

| sub-record | defaults (own unless marked) |
|---|---|
| `heart` | lattice 20 m over the frame's middle half (0.5); slope ≤ 0.1 (hard; F-V-HEART relaxes to 0.2); +0.6 within 150 m of a crossing site; +0.5 within 300 m of fresh water; `sun` +0.3 × (`D` − `D̄`); `wind` −0.3 × exposure; +0.2 × fertile share within 500 m; −0.5 within 300 m of the frame; `prominence` +0.2 × the relative height within 300 m; random share 0.15 |
| `polyfocal` | extra-nucleus chance 0.35 (`k = 2 + (u < 0.35)`); spacing `max(250 m, 0.8 · R_s)` |
| `settle` | settled share 0.5; street and row stretch 1.8 (major) and 0.55 (minor); the density box `max(1.6 · R_major, 150 m)` |
| `mill` | fall ≥ 1 m within 300 m; 150–1 000 m from the heart; +0.5 downstream, +0.3 within 100 m of a crossing, +0.2 on the heart's side, random 0.1; leat ≤ 300 m (600 m on F-V-MILL's rung); take-off head 1 m |
| `grade` | through 10 %, road 14 %, track 20 %; turn at most 60° |
| `branch` | sides left / both / right ⅓ each (VG); continuation 0.9 after one side, 0.1 after two (VG); shore steer 20 steps; retreat 3 steps; crossing search 3 × `bridgeSnapM` |
| `formRules` | street side spacing × 3, back lane 0.5; nucleated crossroads 0.6, branch × 0.7 within 0.6 · `R_s`, crossroads weight × 2; row straightness 5, back lanes 0.8, jitter 0.05; dispersed branch × 1.5, track limit × 2, isolated weight × 2, dial above 1.4 → weight 0; `organicDialFrom` 0.75; `districtDensity` 1.5 |
| `openShape` | long axis along the through road 0.7; spiral radius × 1.1 per step (VG); stretch `2^min(1, slope ÷ 0.25)`; a vertex per 3.5 m (VG); a through road within 2 r moves the space; `VG` tower 0.1 round, 0.5 square (VG); F-V-OPEN shrink × 0.8, 3 tries |
| `market` | `law` (900, 0) → (1 300, 0.2); `fairHa` 1.5 ha and `fairAspect` 2 (a village fair field by the road in, common grazing between fairs) |
| `claimArea` | `cloister`: plot area 3 000 / 4 500 / 6 000 / 8 000 m² at poor / modest / prosperous / rich (a friary or a small priory, not an abbey's precinct), its footprint p50 a reference cell to V11 §3.6.1's `church` row; `marketHall`: coverage 0.8, `aspect` 1.5, `depthShareR` 0.5 |
| `perimeter` | the close 20 m |
| `ends` | an anchor with fewer than 6 plots merges; cap `1 + ⌊households ÷ 25⌋`, at most 6 |
| `stalls` | one per 40 households, at least 3 |
| `pins` | a well per 8 households within 120 m; a crossroads cross 0.4; troughs 0.3; a shrine 0.3; a maypole 0.2; stocks (200, 0) → (700, 0.5); the L0 village pond 0.4 within 150 m of the heart |
| `manor` | moated site 0.25 with water within 150 m, moat 5–8 m wide; fishponds 0.5 within 300 m; a warren 0.2; a gallows hill (400, 0) → (700, 0.1), seigneurial only |
| `presence` | V07 §2.4's `site` and `noSite` tests look within 1 000 m of the frame's centre, and V07 §3.10's pin-record rule looks for a standing pin of a record's kind within the same reach |
| `longhouse` | the long axis follows the fall line where the natural slope exceeds 3 % |
| `slot` | a run starts `half-width + 4 m + minWidthM · B3` from the junction (VG); rim multiplier 2 (VG); an unbuilt slot joins its neighbour 0.5; a back close up to 2 ha; interior beyond 2 × the toft-plus-croft depth |
| `race` | `densityPower` 1 at every rung (range [0.5, 3]): the slot race weights each slot by its density raised to this power (V07 §3.8); its `presets.VG` entry is this volume's one measured-rate `VG` entry, provisional 1 until V-M4, with the register entry `cal.village.*.rules.race.densityPower@VG` (V07 §3.15; J-V7.119) |
| `fields` | factors: climate `cold`, `maritime` × 2 `infield_outfield`; relief `hilly` × 1.5 and `mountainous` × 3 `infield_outfield`, `mountainous` × 0.3 `open_field`; culture `celtic`, `norse` × 2 `infield_outfield`; `germanic`, `slavic` × 1.5 `forest_strip` on `forest` terrain; `latin` × 1.5 `enclosed`; before the era row's open-field date `open_field` × 0. Great fields ± 25 %; 3 (2 in a two-field system); furlongs 2–8 ha; headlands 5 m; strips 10 m (5–20 m by era); furrow downslope above 2 %; infield within 400 m; a common per 200 ha; a strip at most 1.5 km; claim bands 100 m; `woodShade` 0.3; arable slope reference 0.15 and distance 3 km; wood from slope 0.2 |
| `ladders` | replacement cut 0.8; church spacing `min(400 m, 0.8 · R_s)`; ranges: V07 §2.4's third table, `calibratable: false` (a derivation rule of the port, item 20 (h); J-V7.114) |
| `handoff` | band 0.05 |
| `vg` | household draw [3, 7] (VG); frame 210 / 350 / 560 m (VG); margin 34 m (VG); field area 490 m² per dwelling (VG); one-house field rule and orchard trigger on (VG); forest `fill` (VG); clearance 7 m around houses, 5 m beside ways (own reading of VG's clearing); empty-road prune on (VG) |
| `plate` | population rounded to 1 (10 under `VG`); qualifier on in `painterly` |
| `firstView` | the perimeter's box × 1.6, at least 400 m |
| `ruinMarker` | the ruin marker within 800 m of the heart |
| `mine` | working depth: open cast 10 m, shaft 30 m |
| `terrace` | on (`enabled`; off under `VG`, V07 §3.15) — this volume's switch for the village rungs; V11 §3.24.1's `enabled` column (the TOWN–METROPOLIS switch, with its own `presets.VG` entry) is not read at a village rung; `slopeMin`, `stepMinCm`, `stepMaxCm` and `minDepthM` are reference cells to V11 §3.24.1's TOWN row (`slopeMin`, `stepMinCm`, `stepMaxCm`, `minTerraceDepthM`), read at every anchor, so a village and a town level alike until a village cell is edited (J-V7.41, J-V7.96); `stairFromCm` 60 cm; `apronM` 4 m; the plane fit on at most 12 samples (`fitSamples`: 8 outline vertices and 4 interior points), the step sampled every 2.5 m along an edge (`edgeSampleM`, the base's refined raster) |
| `raised` | support clearance 1 m (every raised-way obstacle of V07 §3.5a (3) grown by it, and a palisade gate kept that far from a standing support, (4)); end snap 20 m; a tracker turns around such an obstacle in 15° steps up to 60°; the under-deck strip's margin is V11 §3.24.2's `raisedWays.structure.stripMarginM`, read, never copied |
| `deck` | `headChance` (200, 0) → (700, 0.3) → (1 500, 0.5) (0 under `VG`); the head 8 m along the pier × 6 m wide; `parapetM` 0.5 m each side, so a bridge's deck is its carried way's width + 1 m; the least deck-plot depth is V11 §3.24.4's `minPlotDepthM` by deck kind, read, never copied |
| `tiers` | at most 1 stepped building per settlement at village rungs |
| `refound` | `traceWeight` 0.3 (a refounded village's trackers lean onto a ruined way's trace within reach); `traceReachM` 15 m; `foundationSlot` 1.5 (a slot over a ruined building's footprint weighs × 1.5 in the race); all 0-neutral: with no ruined fabric under the village, or with replay off, nothing reads them (V07 §3.12a) |
| `fail` | the dial × 1.25, twice; the reach × 1.25; the palisade ring `0.8 · R_s` through the 12 densest lattice points; up to 3 top-up trackers |

**The reference trace** (§17.1 (6), item 62): every constant marked VG carries trace key D5 of
`research/findings/code-impact.md` §(d) (P17 for the field sectors), restated in metres in our words, never copied as a
table. The reference-derived sets under D5 are: the character draws (V07 §3.2 (5)); the terrain primitive by water type
and the meander spline (V07 §3.2 (2)); the density band and closed formula (V07 §3.3); the palisade lattice, hull and
resample (V07 §3.4); the tracker steering, step, look-ahead, weights, pulls, push, branch odds and pruning (V07 §3.5); the
square sized in house widths, its rim, round odds, spiral and tower (V07 §3.6); the frontage start, the house rectangle
and the household draw, the density-accepted frontage and the rim multiplier (V07 §3.8, V07 §3.15); the wharf and piers (V07
§3.10); the field area per house, the one-house and orchard rules and the forest fill (V07 §3.9, V07 §3.15); the approach
farmstead and the trail repair (V07 §3.9 (5)); the spotlight and the water look (V07 §5.1); the retry behaviour (V07 §3.13,
not emulated); the road and water shares and the palisade chances (V07 §2.2).
=== END ===

=== REPLACE ### 3.5 VS4 — the tracker-steered network ===
### 3.5 VS4 — the tracker-steered network

The registered `NetworkStrategy 'tracker'` (§4.12) grows every road of the village as a **tracker** — a walker that steps,
steers, merges, branches and stops (VG's mechanism, `ref:VG 1.6.9 tracker steering (code)`, restated in metres; PART III
item 3). It reads the density raster, the planned palisade, the mill reservation, S1's crossing sites, VS1's `destinations`
and `lattice` and S2's dwelling count through its stage's declared inputs (V07 §3.0); `enceintes` carries the planned
palisade (§4.12's signature). A tracker is transient state — `{ lineage, class: 'through'|'road'|'track', pos, heading,
target?, water: 'repel'|'attract', length, limit }` — never a record; the ways it lays are records (V07 §2.5).

**The terrain vectors.** At each position, from S1's height raster (bilinear gradient), with `n` the unit surface normal,
`n_h` its level component and `n_z` its upright one: *uphill* and *downhill* are `∓ n_h · n_z²` — weakened where the ground
is steep — and the two *contour* directions are `n_h` rotated by ±90°, at full length. The best-aligned of the four with the
current heading is the terrain vector `t`.

**One step** (`network.stepM`, 3.5 m), for each live tracker in round-robin order (lineage order, one step per round):
1. **Frame.** Leaving the frame stops the tracker (an open crossing is cancelled; a through road's end becomes an `entries`
   row of kind `through`, `neighbour` or `dead_end`).
2. **Water ahead** (the next point wet):
   * a crossing site of S1 (5) whose deck lies within `network.bridgeSnapM` (30 m) of the heading is **taken**: the
     tracker's next points are the deck's two ends, the way lays the span (the `Bridge` becomes `built`, §4.2 S1 (5)), and
     the tracker continues from the far end, heading away from the water, `water: 'repel'`;
   * else, on a brook or stream (width below S1's ford row), a `through` or `road` tracker lays a **ford** straight across,
     perpendicular to the flow, and continues; a `track` fords brooks only;
   * else a `through` tracker sites a deck by F-ROUTE's extra-bridge rung (§5.2) at the crossing point, perpendicular to
     the flow — a ground-part-0 deck by S1 (5)'s rules, never a raised part (the rung gate below); a `road` does so only when
     the far bank's density is at least `populated` and no deck lies within `crossing.minSpacing` (§4.2 S1 (5)) — else it
     stops and records a **landing** (a `Landing`, V07 §2.7; read by seeding step 5);
   * the sea, a lake, a pond and an oasis are never crossed: a `through` tracker steers along the shore (the contour vector
     of the water's edge) for at most `branch.shoreSteerSteps` (20) steps and then goes to F-V-TRACK; others stop and record
     a landing.
3. **The wall.** A closing arc of the planned circuit (V07 §3.4 step 5 c) is no wall: a tracker crosses it freely (it is
   water or a drop, which steps 2 and 5 handle). When a walled stretch crosses the next step: a `through` tracker makes a
   **gate** there, always; a `road` makes one only when the crossing lies at least `max(perimeter ÷ 6, ½π · branchSpacingM)`
   along the trace from every gate so far, else it stops at the wall (VG's rule); a `track` stops.
4. **Merge.** When a laid or pending way point **on ground part 0** lies within `network.lookAheadM` ahead (the tracker's
   own last four steps excepted), the tracker **merges**: its last point is attracted onto that way (§3.6's attraction), the
   previous vertex smoothed, a `T` junction recorded, and it stops. Of a raised way only its two feet are merge points,
   never a point along its ramps or deck; its standing supports, its ramps and stairs and the under-deck strips of its
   `vault` spans are obstacles, and the rest of its under-deck strip is crossed only under a span §4.3's crossing rule
   admits (V07 §3.5a (3)).
5. **Steer.** `v = t · weight[class] + water + pull + push + trace`, where `weight` is `network.weight` (through 0.5, road 1,
   track 2 — a through road holds its line, a track wanders); `water` is the repulsion vector of every water cell within
   `network.waterReachM` (the inverse-distance sum, normalised by the disc's area) times `waterRepel` or `waterAttract`
   (negative: an attraction) by the tracker's mode, applied only while heading toward water; `pull` toward a target —
   `pullThrough · √(d ÷ frameSide)` for a through road, `pullRoad · d ÷ frameMax` for a road with a target; `push` is
   `wallPush` along the trace normal, in the direction of travel, while inside the palisade band, so a road crosses the wall
   squarely; `trace` is item 113's pull onto a ruined way of a former settlement (V07 §3.12a (4); 0 on every map without
   one). A `road` applies `v` only when its component across the heading exceeds `turn` (the rigidness); a `through` road
   and a `track` always apply it. **The grade guard** (our extension, off under `VG`): when the grade along the new heading
   exceeds `rules.grade[class]` (through 10 %, road 14 %, track 20 %), the heading turns toward the nearer contour vector
   until the grade is within it or `grade.maxTurnCdeg` (60°) is turned — a switchback tendency.
6. **Density at the new point.** A `road` below `populated` stops and a `track` continues from it (lineage `…/t`); a `road`
   with no junction within `branchSpacingM ÷ max(density, 0.05)` **branches** and stops: left only, both sides or right only
   with a third each, and a continuation with probability 0.9 after one side, 0.1 after two (all on `village.track` keyed by
   the branch lineage `…/s<k>.L|R`, V07 §2.5; `rules.branch`) — each new tracker a `road` with its parent's opposite water
   mode; a `track` stops when its length passes its limit `branchSpacingM ÷ max(F4, 0.05)` (never below `branchSpacingM`,
   heavy tailed), and when its end lies outside the populated area it is an **approach** — an outlying farmstead's drive (V07
   §3.9). After laying a bridge a tracker's mode is `repel`.

**Seeding, in order** (VG's order, our additions marked):
1. **Through roads** by the topology: `isolated` none; `through` one, from the entry at the entry bearing — VS1's
   `destinations` in their order: the declared bearing, a dossier partner's bearing (V07 §3.11), else `π·u` stretched by the
   aspect — toward the opposite side, its target the opposite frame point (or the second partner's destination); `dead_end`
   one from the heart's populated point out to the entry; `crossroads` a through road plus, at its dry point nearest the
   heart, one or two perpendicular `through` branches (the second along a second partner's bearing when one exists).
2. **The open space** (V07 §3.6), before the through road's side roads.
3. **Side roads of the through road:** its interior vertices in shuffled order (`village.track`), each dry, above
   `populated`, outside the open space and with no junction within `branchSpacingM ÷ density`, branch perpendicular as
   step 6.
4. **Gates** at every crossing of the through road with the planned palisade.
5. **The wharf, its road and its piers** (V07 §3.10's construction, laid here in VS4's batch; J-V7.51) when the water has a
   dockable shore; else a single pier at each recorded `Landing` with no bridge nearby.
6. **The isolated start**, when no tracker exists yet: the open space at the heart if one fits; else two opposite roads along
   one of the four terrain vectors (drawn) plus each perpendicular with probability `½ · density`.
7. **Neighbour roads** (our extension; 0 under `VG`): `neighbourTracks` (V07 §2.2) roads to the neighbouring places, at the
   neighbour `destinations` (the dossier partners' bearings or drawn bearings at least 45° from every through road), each
   routed by S4's router (§4.3) over VS1's `lattice` from the frame inward until it meets the network — `road` class inside
   the perimeter, `track` beyond.
8. **Rounds** until no tracker is live or the stage's work limit (V07 §6) is reached (F-V-TRACK). Before the finish, the feet
   of every raised way on the map are joined to the network (V07 §3.5a (3)).
9. **Finish.** A branch that produced exactly one road and no continuation has its corner cut (the new road's first point
   moved toward its neighbours' midpoint); the palisade is split at its gates; stretches touching no gate are kept (J-V7.27;
   dropped under `VG`). **The empty-road prune** (`vg.emptyRoadPrune`; on under `VG`, off by default, J-V7.74): under `VG` a
   road or track along which no slot will be built is removed — decided here by the density law, a way whose frontage lies
   wholly below `populated` and which reaches no entry, landing, approach or open space; by default our lanes to fields,
   farmsteads and landings stay, since a township's tracks serve the land, not only houses.

**The rung gate on the router** (item 110 (b): generated raised ways "at CITY and METROPOLIS", "A TOWN
gets them only by declaration"; J-V7.90). Every call a village stage makes to S4's router — VS4's neighbour roads (seeding
7), the polyfocal joins, the `row` spine, F-V-TRACK's third rung and a raised way's stub track (V07 §3.5a) — and F-ROUTE's
extra-bridge rung in step 2 pass the **routed rung**, and the router's raised-way gate is closed at THORP, HAMLET and
VILLAGE: no span is priced and no raised part is laid, whatever the drop. A water crossing is a part-0 deck by S1 (5)'s
rules; a dry ravine is detoured by the router's costs and the grade guard (step 5). The gate is the owner's rule, provenance
`owner`: it is no `village.json` cell and cannot be moved by `editTable` or calibration. The village registers no raised-way
generation source (T-V7-46; item 290).

**Plan forms** (our extension over VG's grown form, J-V7.6; each a table row of `forms`, applied to the rules above):
* `street` — the through road is the spine; its side-road spacing × `formRules.streetSideSpacing` (3) within the major
  radius; for each side of the street along its settled length, with probability `formRules.streetBackLane` (0.5), a **back
  lane** parallel to it at the toft-plus-croft depth (the street's spine offset and smoothed, joined to the street at both
  ends by short lanes).
* `green` — the open space is a long green (V07 §3.6) and the through road divides along its two long sides as its rim ways,
  so the houses face the green.
* `nucleated` — a `through` topology becomes `crossroads` with probability `formRules.nucleatedCrossroads` (0.6); branch
  spacing × `formRules.nucleatedBranch` (0.7) within `formRules.nucleatedWithinShareRs · R_s` (0.6).
* `polyfocal` — each nucleus gets its own isolated start (seeding 6) and the nuclei are joined by roads routed by S4's router
  between their open spaces or starts; the through road passes the nucleus nearest its line.
* `row` — `turn` 0; the spine is laid by S4's router over VS1's lattice with a straightness weight of
  `formRules.rowStraightness` (5) along the contour through the heart; no branching within the row's length; back lanes on
  both sides with probability `formRules.rowBackLane` (0.8); equal slots (V07 §3.8).
* `dispersed` — no open space; branch spacing × `formRules.dispersedBranch` (1.5); track limits ×
  `formRules.dispersedTrackLimit` (2); the farm households at approach farmsteads (V07 §3.9).

**Output — one L1 batch** with the palisade's trace and the open spaces: ways of class `through` (7 m), `secondary` (the
village street, 5 m), `lane` (back lanes and joining lanes, 3.5 m), `track` (3 m, `surface: 'dirt'`), `ford`, `bridge`,
`quay`, `pier` (a chief pier with its head where drawn, V07 §3.10a (3)); junctions `T`, `X`, `Y`, `end`, `gate`,
`bridgehead`, `square`; the `entries` and `approaches` of the plan; the `village.landings`. Widths are the village rows of
§4.3's width table (item 292; own, calibratable; VG's roads are 5.6–7 m, its highways wider).
=== END ===

=== REPLACE ### 3.5a A raised way on a village map (item 110 (b); J-V7.83) ===
### 3.5a A raised way on a village map (item 110 (b); J-V7.83)

The owner: "i think raised ways for cities is fair for the genertor to generate adn then a user can decide to add or
remove". A village never generates one (the rung gate, V07 §3.5), but a user may add one at any rung, and one generated in
a city epoch stays when the place falls through TOWN below the hand-off band (V07 §3.12; V06 §3.19: a fall below CITY never
removes one). On every derivation and every village epoch the village's own stages lay their ways, plots and fields around
it.

**(1) Sources at village rungs.** Exactly two: a **declaration** — T4 `road` with `raised`, or the aqueduct class, or the
skeleton file's line (V07 §4.1) — and a way **carried down** through the hand-off from a CITY epoch (V07 §3.12). No village
stage and no village phase creates one. No village tool refuses a raised stroke that contradicts no dossier fact and no
lock (item 101 R2; J-VI.4): the rung gate binds only generation (item 290).

**(2) The data key.** `raised` (§4.1's `RaisedRead`): the ground arena's parts from 1 read as one key — per raised way
its deck strip, its supports and spans by their keys with their `state`, two feet and, for an aqueduct, its channel —
published by the declaration layer (V07 §3.0). VS3, VS4, VS5, VS6, S10, S12a, the hinterland unit and VS8 declare it as an
input (V07 §3.0's table). No village stage writes a part from 1. **A support stands for the village while its `state` is
absent or `ruined`** (a ruined pier is a stump of masonry): such a support is an obstacle ((3)), a stretch the palisade abuts
((4)) and a hole in the faces beneath ((5), (6)); a `cleared` support (taken down in V06 §3.19.2's decline, its stone
credited) is none of these, its ground free at the next derivation.

**(3) VS4 — the trackers around it.**
* **Merging on part 0 only.** The merge test (V07 §3.5 step 4), and S4's router whenever a village stage calls it, read ways
  on ground part 0 only; of a raised way only its two feet may be merged onto.
* **Supports are obstacles.** A support whose `state` is absent or `ruined`, the raised way's ramps and stairs, and the
  under-deck strip of each `vault` span (impassable by §4.3 *Lattice and costs*), each grown by `raised.supportClearM`
  (1 m), is an obstacle, looked up in a uniform grid index of those obstacles (cell 10 m). When a
  step would enter one, the heading turns by `raised.turnStepCdeg` (15°) steps — first to the side nearer the tracker's
  target, else to the side of higher density, alternating sides — up
  to `raised.turnMaxCdeg` (60°) either way; failing that the tracker goes to F-V-TRACK's first rung.
* **Under a span.** A tracker crosses the under-deck strip only where §4.3 *Lattice and costs* admits a part-0 way —
  under an `open` span whose clear width between the supports' rings is at least the way's width +
  `raisedWays.structure.clearWidthM` and whose soffit meets §2.7's *The clearance* for the way's class, within ±
  `raisedWays.structure.squareDeg` of square to the deck, never along the strip. A step that would enter the strip
  elsewhere turns by the rule above. Where it crosses there is no junction, no crossing record, no gate and no stop; a
  `cleared` span's ground is free, as a `cleared` support's is ((2)).
* **The feet.** After the rounds and before the finish, at every derivation, each foot joins the nearest part-0 way vertex
  within `raised.endSnapM` (20 m) as a `T` junction (the vertex attracted onto the foot by §3.6's attraction); with no vertex
  in reach, a stub `track` is routed by S4's router (rung gate closed) from the foot to the nearest way, lineage
  `way:raised/<raised way>/foot<0|1>` (V07 §2.5), reported `W_RAMP_STUB`; failing that, F-V-FOOT (V07 §3.13). The joins and
  stubs are in VS4's L1 batch.
* **No frontage.** A raised way, its ramps included, carries no frontage run (VS6) and is never a way VS5's interior cut
  measures from (V07 §3.7 (1)).

**(4) VS3 — the palisade.** The palisade is a wall laid after the raised way (§2.7's support step (6) (d)): a support
whose `state` is absent or `ruined`, a ramp, a stair, a foot or a `vault` span's arch vault standing in the planned
palisade's band is taken into the stretch — the stretch abutting its faces (town walls were built against aqueduct
piers), at an arch vault ending at its two walled-up arch mouths, the chamber kept whole and closing the line between
them, never laid through it; it is never moved and never a gate, and a gate VS4 would make inside the raised way's
under-deck strip, or within `raised.supportClearM` of such a support, moves along the trace to the nearest clear point,
the track following it (§2.7's support step (6) (d)). The trace passes beneath an `open` span as an ordinary stretch; a
raised way crossing the circuit makes no gate (its deck passes over). A raised way carried down (V07 §3.12) whose
crossing station stands on the enceinte that becomes the palisade keeps that station as standing fabric — its support
the band's stretch under the deck, held while the deck stands, with its raised gate whose tower carries the deck or the
aqueduct's arch (§2.7's support step (3)) — the one gate at a support the palisade carries. The barrier closure never
treats a raised way as a barrier.

**(5) VS5, VS6 and S10 — no house under the arches.** The **under-deck strip** — §4.6 S8's: the deck's ground projection
over its piers and spans, widened each side by `raisedWays.structure.stripMarginM` (V11 §3.24.2) — holds no toft yard part
and no building. S10's `toft` strategy lays a frontage slot whose toft
would meet the strip as a **close** by V07 §3.8's close rule (a paddock, orchard or garden, joined to or held by the nearest
built dwelling's household), never raced; VS6's capacity estimate subtracts those slots before F-V-SLOT's rungs; S10a's
quotas are allocated over the raceable slots only, so `N_v` stays exact. Crofts, closes (a reached close included) and
paddocks may pass beneath, the supports whose `state` is absent or `ruined` cut out as holes (§3.6's hole rule). The
perimeter is not changed by a raised way.

**(6) S12a and the hinterland unit.** Field, meadow, common, pasture and wood faces pass beneath, the supports whose
`state` is absent or `ruined` as holes (fields under arches are the historical sight); a furlong's strips run through; no
hedge, headland or field line follows a deck; V07 §3.9's outward claim and suitability ignore the deck.

**(7) The spans.** V04's arch-vault source is registered at every village rung (V04 §3.5.4 (d): arch vaults follow their
raised way at every rung; V07 §3.16 (1)); the span rule (§2.7, item 244) decides each span, and its `country` reason keeps a
span over hinterland faces — field, meadow, common, pasture or wood — open at every rung (J-C4). Inside the perimeter the
strip holds no plot, so a vault there is `storage` by V04's chamber row and holds an institution only by declaration. The
street-vault and bridge-vault sources keep their TOWN gate.

**(8) An aqueduct at a village.** Its terminal is a fountain `Pin` or a basin, as its declaration says (a basin by default;
V01 §3.17.8's terminal form); a cistern terminal comes only by declaration (V04 §3.5.4 (e)). VS8's well coverage (V07 §3.10)
counts each delivery point of an aqueduct whose channel is unbroken as a well, so no well is sited within
`pins.wellWithinM` (120 m) of one. When a span is ruined or cleared in the engine's decline (V06 §3.19.2), the channel is
broken, its points stop counting, and the coverage rule sites wells at the next derivation or epoch.

**(9) VS8 and names.** A raised way is never an end anchor: `crossing` reads part-0 bridges and fords only (as V01 §3.4.2 (a)
reads bridgeheads). The name's descriptive tags (V07 §3.10) and the plate's water qualifier (V07 §5.3) read part-0 crossings
only; a raised way's own label is the base's way label and V07 §5.3's landmark word.

**(10) Adding and removing are local** (V07 §4.3's rows).
* **Adding** (T4 `road` with `raised`, or the aqueduct class): the declaration's commit joins its feet to ground vertices by
  the base's rule, and VS4 re-joins them at every later derivation. The dry run re-races the blocks whose raceable slots the
  strip removes — each keeping its recorded quota; a block that can no longer hold its quota passes the shortfall to its
  neighbouring blocks (those sharing a frontage way with it) by largest remainder on their free slots' density, failing that
  F-V-SLOT's rungs — so `N_v` stays exact; it re-cuts the hinterland faces beneath with the support holes, and shows the
  count badge (item 101 R14): "the arches pass over 6 tofts; 4 houses move within their blocks".
* **Removal** is V09's delete of a declared way (the declaration's inverse) or, for a carried generated way, V06 §3.19.3's
  suppression (its reason key in the log), the dry run saying "the town will not rebuild this aqueduct; undo brings it
  back". The strip's slots return to the race in their blocks, the faces beneath are re-cut, and V04's vaults under it go in
  the same commit (V04 §3.5.4 (d)).

**(11) Order and determinism.** Every rule above is draw-free — the turns, joins, strip, holes and coverage are pure
functions of `raised` and the recorded inputs — so with no raised part on the map every village stage's output is
byte-identical to the build without this section (T-V7-46, T-V7-52), and with one it is the same on every engine.
=== END ===

=== REPLACE ### 3.13 Failure handling — the village ladders (never a whole-map retry, §5) ===
### 3.13 Failure handling — the village ladders (never a whole-map retry, §5)

VG retries a failed build on the next generator state without bound (`ref:VG 1.6.9 retry on the next state (code)`); we
never do. Every village stage's ladder is below; each rung is bounded, each outcome reported with its delivery tier (§5.4).

| class | detected at | ladder (in order) | test |
|---|---|---|---|
| F-V-HEART no heart candidate | VS1 | slope limit `heart.slopeMax` 0.1 → `heart.slopeRelaxed` 0.2 → any dry cell above the flood line → the driest cell of the frame's middle half, reported | T-V7-4 |
| F-V-DENS populated area below the demand's `A_s` | VS2 | `δ` × `fail.dialStep` (1.25) `fail.dialTries` (2) times → `reachShare` × `fail.reachStep` (1.25) → carry on; F-V-SLOT covers capacity | T-V7-5 |
| F-V-PAL fewer than 3 kept points (collinear points counting as fewer), or no nucleus inside | VS3 | `keepBelow` → 0 → a ring through the `fail.palRingPoints` (12) densest lattice points around the heart → the palisade omitted, reported (a dossier's wall: kept as a ring of `fail.palRingShare · R_s` (0.8) around the heart) | T-V7-6 |
| F-V-ANCHOR a walled stretch whose end finds no barrier to anchor on (item 106 (h)'s F-WALL at village kinds) | VS3 step 5 d | the stretch follows the pre-reach trace around the barrier's end until it meets another barrier → it closes the ring on the pre-reach trace (that run's reach undone) → the barrier closure off for this enceinte (VG's water cut), reported | T-V7-31 |
| F-V-GATE a palisade with no gate | VS4 finish | a gate where the nearest road to the heart crosses the trace → a gate stub way from the nearest junction square to the trace (`placeGate`'s form, §7.1) | T-V7-6 |
| F-V-TRACK a tracker that meets itself, is stopped by water with no crossing, leaves an unfinished crossing, exceeds its step limit, or is still blocked by a raised way's obstacle or its under-deck strip after its turns (V07 §3.5a (3)) | VS4 step | retreat `branch.retreatSteps` (3) and re-steer along the contour vector → the nearest crossing site within `branch.crossingSearchShare` × `bridgeSnapM` → for a through road, the remainder routed by S4's router (§4.3) to its target; for others, stop and record a landing → reported | T-V7-7 |
| F-V-OPEN the open space meets water, the mill or leaves the palisade | VS4 seeding 2 | shrink × `openShape.shrink` (0.8) up to `openShape.shrinkTries` (3) times → the next densest populated point → no open space, reported (the market to a flanking square) | T-V7-8 |
| F-V-FAIR the fair field meets water, the mill reservation, a raised way's strip or support, or the frame's margin | VS5 (V07 §3.6 (4b)); at a village epoch `village.records` (a record) or step (m) (a roster member; V07 §3.12 (a)) | slid outward along its road one field length at a time, up to `R_s` → the other side of the road, slid likewise → the nearest dry hinterland face adjoining a road that holds its area → no reservation: the fair is held on the reservation that carries the market (the member bound to it), reported `W_FAIR_ON_GREEN` | T-V7-13 |
| F-V-SLOT fewer slots than dwellings and institutions | VS6's capacity check (rungs 1–3); S10a and S10b (rungs 4–5) | slot widths to the band minimum → track frontage at full weight → up to `fail.slotTopUp` (3) top-up road trackers from the densest perimeter junctions, grown inward, VS6's second L1 batch → the doubled-household share to the templates' `households.max` → the unhoused households reported, never dropped (§5.2 F-PLAN's rule) | T-V7-9 |
| F-V-MILL no mill seat | VS1 | the leat limit `mill.leatMaxM` 300 → `mill.leatFallbackM` 600 m → a `v.windmill` by its row → the milling imported, reported (the need propagation's substitution, §4.2 S2) | T-V7-10 |
| F-V-FOOT a raised way's foot with no part-0 way vertex within `raised.endSnapM` | VS4 (V07 §3.5a (3)) | a stub `track` routed by S4's router (rung gate closed) from the foot to the nearest way, reported `W_RAMP_STUB` → the foot left unjoined, reported `W_RAMP_UNJOINED` (the way still reached by its other foot); never a moved foot, never a raised part laid | T-V7-48 |
| F-V-TERRACE a platform wall between the door and the frontage whose drive or path cannot meet its grade inside the toft | S11 (V07 §3.8a (6)) | the ramp laid along the wall inside the toft yard → the platform's frontage edge dropped to the way's level (two levels, the wall moved back by the ramp's length) → a stair only, the drive omitted, reported `W_TERRACE_NO_CART`; never a gap in the wall, never a retry of the map | T-V7-47 |
| F-V-FIELD arable short of its demand | S12a | wood and pasture faces re-claimed by suitability → the import share raised and reported (§4.9's rule) | T-V7-11 |

Every base ladder a reused stage has (F-RIVER, F-ROUTE, F-PLOT, F-SITING …) applies as in the base; the edges of every
village mechanism are V07 §3.17's.
=== END ===

=== REPLACE ### 3.17 Edges — every mechanism at its limits (principle (11)) ===
### 3.17 Edges — every mechanism at its limits (principle (11))

Every village mechanism's extremes have a defined outcome (J-V7.143), a rung of its failure ladder (§5: check, repair locally, retry that
piece, simpler shape, substitute, leave out and report — never a whole-map retry) and a test; T-V7-60 runs every row on the
edge fixtures, at THORP (P = 1, 40), HAMLET, VILLAGE (P = 1 499), under `VG` and each switch off, and through save, load, undo,
redo, regenerate and migrate. The edge classes: **none** (no input), **one** (exactly one item), **cap** (the maximum and its
caps), **degenerate** (zero-length, zero-area, self-touching, collinear, coincident), **data** (missing, empty or contradictory,
the dossier included), **rungs** (every rung and toggle), **lifecycle** (save, load, undo, redo, regenerate, migrate). At a base
rung (TOWN to the cap) no village stage runs — the product's stage set decides (V07 §3.0) — so every row's rungs clause is its
THORP–VILLAGE range plus that statement.

**(a) The mechanisms.**

| mechanism | the extremes and their defined outcome | rung | test |
|---|---|---|---|
| the records (V07 §2.3): yard-part kinds, the named beach | data: a landmark string whose host is absent (no landing for `Net mending post`, no wood yard for `Timber stacks`) lays nothing and is listed in the gazetteer, reported `W_LANDMARK_NO_HOST`; `Beaching ground` with no `beach` run on any shore takes the landing's own shore run, and with no landing no label, reported; an unknown yard-part kind in a table row fails the table compile (§7.6) | leave out and report | T-V7-60 (a) |
| the request block and `villageForm` (V07 §2.7) | data: a `villageForm` naming no `v.` key fails the compile (V11 §2.3), never a run; a request `densityDial` outside [0.5, 2] is clamped and reported; `arableFactor` outside [0, 4] clamped; `water: 'island'` with an explicit `roads` other than `isolated` is an F-EDIT conflict whose dry run offers `isolated` | check | T-V7-60 (a) |
| the pipeline (V07 §3.0) | none: P = 1 runs every stage (one household, one dwelling, no institution by the presence laws at 1 person) and the frame is `territory.minKm2`; degenerate: a stage whose inputs are empty (no water, no road topology `isolated`) runs on empty inputs and writes empty outputs, T-V7-3's one-producer check unchanged | check | T-V7-3, T-V7-60 (a) |
| S0's draws (V07 §3.1) | none: every field `auto` draws in the stated order; one: a single-entry weight row (every other weight 0) draws that entry with no draw consumed beyond the one `u`; data: a dossier's fixed access word (`isolated`, `none`) beside a bridge-implying record reads V08 §2.6b (3)'s failure (`toll_bridge_dry`); a request and a dossier never both fill one field (the dossier fills the request, V07 §3.11); rungs: every weight read at `P` by the anchor law, clamped at the THORP anchor below 40 and the VILLAGE anchor above 700; lifecycle: `autoResolved` recorded, Regenerate (keep) re-reading it, New random on the village scope redrawing the `auto` fields, a changed request re-deriving from S0, an absent block reading all-`auto` on load of an older document | check | T-V7-1, T-V7-60 (b) |
| VS1 (V07 §3.2) | degenerate: a lattice with no dry cell above the flood line → F-V-HEART; polyfocal nuclei that cannot all be spaced → as many as fit, `k` reduced and reported; a course whose chord passes outside the frame is re-drawn by F-RIVER's rung (§5.2); zero-length resampled course segments dropped; lifecycle: the plan's recorded inputs (heart, nuclei, character, `R_s`) kept by Regenerate (keep), re-derived by Re-derive from VS1, a moved heart undone by `setAttr`'s inverse | repair locally | T-V7-4, T-V7-24, T-V7-60 (b) |
| VS2's density (V07 §3.3) | cap: the box clipped to the frame, so the raster never exceeds (frame side ÷ `densityCm`)² cells (≈ 314 000 at P = 1 499), priced by V07 §6; `δ` clamped to `density.dial`; `Δh` 0 (a flat box) reads `bandMinM`; an arid row with `w_water` at its maximum and no reliable water leaves `wp` 0 | check | T-V7-19, T-V7-60 (b) |
| VS3's palisade (V07 §3.4) | none: no kept point → F-V-PAL; one: one kept point → F-V-PAL; degenerate: collinear kept points count as fewer than 3; a reach replacement whose connector would cross the trace is not made (that run keeps its trace), so the trace never self-touches; data: a dossier wall record over an empty density box → F-V-PAL's dossier rung (a ring of `0.8 · R_s`); a `patched` run with no patch row for its kind and culture takes V11's kind default row; rungs: THORP with a palisade (chance 0.10) traces as every rung; every run `standing` under `VG` | simpler shape | T-V7-6, T-V7-31, T-V7-62, T-V7-60 (c) |
| VS4's network (V07 §3.5) | degenerate: a zero terrain gradient (a flat cell) gives `t` = the current heading; a step that would re-enter the tracker's own last four steps → F-V-TRACK; a frame shorter than one step lays no tracker and records the entries at the frame; branch spacing wider than the frame: no branch; lifecycle: ways keep their lineages (V07 §2.5) through Regenerate (keep) and every re-derivation, an edit's undo restoring its ways by the event's inverse | retry that piece | T-V7-7, T-V7-46, T-V7-60 (c) |
| a raised way on a village map (V07 §3.5a) | degenerate: two feet within `raised.endSnapM` of one vertex join it once (two `T` junctions on one vertex); a zero-length span (coincident supports) is one support; a raised way wholly outside the perimeter changes no slot; a support on the frame's edge is clipped to the frame as an obstacle | check | T-V7-46, T-V7-52, T-V7-60 (c) |
| the open space (V07 §3.6) | none: `open: 'none'` or the `dispersed` form: no reservation, the market to a flanking square; one: one nucleus; degenerate: a rim of `open.rim`'s minimum on a shape meeting water → F-V-OPEN; data: a dossier market record with no open space → the flanking square; rungs: the space scaled by `open.scale` at every `P`; lifecycle: a hand-moved space held (V07 §4.3) | simpler shape | T-V7-8, T-V7-60 (d) |
| VS5's perimeter (V07 §3.7) | none: no populated cell → the perimeter is the open spaces and the mill reservation united (F-V-DENS having run), else a disc of radius `R_s` about the heart, reported; one: one nucleus; degenerate: a perimeter touching the frame is clipped to it; an interior of exactly `slot.backCloseHa` stays (the cut is "more than"); rungs: every rung | substitute | T-V7-5, T-V7-60 (d) |
| VS6 and the slot race (V07 §3.8) | none: no frontage run → F-V-SLOT; one: one slot takes the whole quota's first dwelling; cap: a quota above the raceable slots → F-V-SLOT's rungs; degenerate: a run shorter than one slot's minimum width lays none; data: a housing range forcing more dwellings than slots → F-V-SLOT (never a drop); rungs: every rung; the grandeur ceiling at THORP, HAMLET and VILLAGE (item 115) | simpler shape | T-V7-2, T-V7-9, T-V7-63, T-V7-60 (d) |
| levelling (V07 §3.8a) | degenerate: a platform of zero area (a footprint outside its toft) is not levelled; a walled interval shorter than one `edgeSampleM` step lays no wall; a plane fit on fewer than 3 distinct samples is flat (gradient 0, not levelled) | check | T-V7-47, T-V7-60 (d) |
| the hinterland (V07 §3.9) | degenerate: a hinterland face of zero area is skipped; a furlong below `fields.furlongHa`'s lower end joins its neighbour in the same great field; a great field left without a face keeps its slot and is tombstoned (V07 §2.6) | repair locally | T-V7-11, T-V7-17, T-V7-60 (e) |
| the wharf, ends and pins (V07 §3.10) | none: no dockable run → no wharf, the landings' single piers; one: one pier; cap: the pier count's law, the ends' cap 6; degenerate: a dockable run shorter than one pier spacing lays one pier at its densest vertex; data: a `market_cross` record with no market → the through road's frontage nearest the heart; a `@pin:<kind>` of a kind VS8 has no row for is placed at the heart's nearest free junction; rungs: every rung; lifecycle: a forced pin across undo, redo and an absorb follows V07 §2.6's rows | substitute | T-V7-13, T-V7-35, T-V7-60 (e) |
| deck plots (V07 §3.10a) | degenerate: a pier shorter than `deck.headM`'s length takes no head; a head over dry ground (a pier ending on a shoal) takes no plot | leave out | T-V7-49, T-V7-60 (e) |
| the dossier readings (V07 §3.11) | degenerate: a quarter claim with no anchor → a `claim` anchor at the claimed class's place; data: a housing range with `min > max` is the port's refusal (V08), never read here; a population outside `[1, 1 500)` never reaches the village rows (§1.1, item 202) | check | T-V7-13, T-V7-21, T-V7-60 (f) |
| epochs and the hand-offs (V07 §3.12, V07 §3.12a) | degenerate: an epoch whose target equals the standing population adds nothing and removes nothing; a hand-off down whose principal market's centroid lies in water puts the heart at the nearest dry cell; a replay with no peak runs no history (§4.11 (7)); lifecycle: an epoch undone after a save restores its record's ops on load, since the log is the document (§2.9) | check | T-V7-13, T-V7-14, T-V7-59, T-V7-60 (f) |
| the failure ladders (V07 §3.13) | none: a ladder with nothing to act on returns unchanged and reports nothing; degenerate: a ladder whose every rung fails ends at its last rung's report, never a retry; data: a contradictory dossier (a wall record at a `none`-access dossier) builds the wall and the dead-end topology | leave out and report | T-V7-4 – T-V7-11, T-V7-60 (f) |
| determinism (V07 §3.14) | none: a stage with no draws consumes no stream index | check | T-V7-18 |
| the underground at village rungs (V07 §3.16) | none: no cavern and no ruin → the tail lays nothing, byte-identical; one: one void element takes the access draws alone; degenerate: a void element whose headroom falls below V04's minimum is created collapsed (V04 §3.5.5 (b), V04 §3.5.0a) | leave out | T-V7-38, T-V7-60 (g) |
| editing (V07 §4.1–V07 §4.4) | none: an undo with no village edit in the log changes nothing; one: a lasso holding one plot declares a one-plot end; degenerate: a zero-length stroke (T4 `road`'s walk mode, T3 `wall`, a lasso of zero area in `declareEnd`) is a dry-run F-EDIT refusal of shape, never an event; data: an edit whose target a dossier absorb removed is a dry-run F-EDIT naming the absorb; rungs: every tool at every village rung; lifecycle: every edit kind's V07 §4.4 row | check | T-V7-22, T-V7-54, T-V7-60 (h) |
| the clerk (V07 §4.5) | degenerate: a `why` on a zero-area end or a field with no face answers its anchor's or system's line; data: a `why` on a superseded `VillagePlan` answers from its record with the "when this was a village" line; a village with no end answers the one district; lifecycle: the provider reads committed records only | check | T-V7-61, T-V7-60 (h) |
| rendering, labels, exports (V07 §5.1–V07 §5.4) | none: a village with no palisade, green or field draws the rest; one: a one-dwelling THORP exports every format; degenerate: a label on a zero-area end is dropped by §9's rules; data: a dossier title word absent → the rung's word; rungs: every rung, `painterly` and `ink`; lifecycle: every export re-derived from the committed model | leave out | T-V7-25, T-V7-60 (h) |
| the one-time waits (V07 §6) | cap: every one-time wait at P = 1 499 on the largest frame, an epoch and the history replay included, within the comfort level, the target misses declared; a wait past one second shows its progress; rungs: every village rung on the reference machine, the low tier's unreachable sizes declared per device (item 119 (e)) | check | T-V7-67 |
| Find at the village rungs (V07 §5.5) | none: no chip on, the view unchanged; one: a class with one member glows once, its count 1; data: a chip whose end or field an epoch, an edit or a hand-off removed stays at count 0, dark, until removed or revived; rungs: THORP with no end (the village itself the one area and gaps unit), HAMLET, VILLAGE, under `VG`; lifecycle: the `find` key in no digest — saved with the other view keys (§2.9) and in view pins, untouched by undo, redo, regenerate and migrate, re-evaluated at every commit and every change of the drawn week (a week whose frame is not the head read over that frame, V07 §5.5) | check | T-V7-68, T-V7-60 (h) |
| the crisis looks at the village rungs (V07 §5.6) | none: no condition and no preview, nothing drawn; one: a THORP of one house, one unit, ruined at any positive share at `lookLevel`'s depth; data: an unmatched target reported and the pattern used, a calamity naming more units than the share's count striking every named unit, a fire whose order ends before that count reporting the shortfall (V01 §3.16 (5)), an unmapped condition read `none` (V08); no walled stretch, green, market, entry, outlying farmstead, arable face or end — V07 §5.6 (7)'s outcomes; cap: a force beyond the frame and its margin, the ring marks; rungs: THORP, HAMLET and VILLAGE, the parity presets none; lifecycle: nothing stored, every look re-derived from the committed state and the view at save, load, undo, redo, regenerate and migrate | substitute | T-V7-69, T-V7-60 (h) |

**(b) Combinations** (two units' features meeting at their limits; the rung is a failure ladder's where the outcome is one,
"—" where it is a rule):

| combination | defined outcome | rung | test |
|---|---|---|---|
| a village that grows over a sealed cavern or ruin | each building the epoch adds over the void takes V04 §3.5.7 (d)'s draw (V07 §3.16 (7)); dwellings only after access | — | T-V7-38 |
| a raised way over the palisade | the stretch abuts the standing supports, ramps, stairs and `vault` spans' arch vaults (a `cleared` support none), no gate under the deck; a carried-down crossing station on the palisade kept with its raised gate or arch (V07 §3.5a (4)) | — | T-V7-48 |
| a raised way beside the fair field | the fair field slides clear of the strip and the standing supports | F-V-FAIR's ladder | T-V7-13 |
| a deck plot on a bridge over a moat | none at a village rung: the manor's moat is a yard part, never water a bridge crosses (V07 §3.8) | — | T-V7-60 (i) |
| a retaining wall on a cliff edge | no house platform's wall stands along a cliff bank, a cliff or sheer arc or a cliff inside the district: the cliff face holds the ground and the platform keeps the cliff setback (V07 §3.8a (2)); the palisade's barrier closure treats the cliff as a barrier, never the wall | — | T-V7-47, T-V7-31 |
| an oasis inside the palisade's reach | its shore is a barrier (V07 §3.4 step 5 a); the palisade never fences it | — | T-V7-58 |
| an oasis village with an arid climate cell | the sun terms at the climate cell (0 or toward shade), the water pull carrying the crowding (V07 §3.3) | — | T-V7-58 |
| a dossier removing what an edit pinned | the dossier wins (item 20); the pin lapses by §7.7's lapse rule, reported | leave out and report | T-V7-13 |
| an epoch undone after a save | the undo record in the saved log restores it on load (§2.9, §7.4) | — | T-V7-14 |
| a patched palisade at the hand-off up | the runs keep their condition and material (V07 §3.12 step 1); the town's walls step governs from TOWN | — | T-V7-62 |
| a manor specified at a HAMLET by a dossier | kept with its full design (item 115 (c)); a second manor never generated | — | T-V7-63 |
| a refounded village over a ruined town wall | trackers cross at its gate gaps and breaches (V07 §3.12a (4) (d)) | — | T-V7-59 |
| a village over a buried former city and a well that meets it | the well is an access (V07 §3.16 (3) (ii)); the buried system in maintenance mode | — | T-V7-59, T-V7-38 |
| the zoom-out limit at a village that grows its frame | the limit moves with the bounds (item 116 (d); V07 §5.2) | — | T-V7-64 |
| a Find chip on an end at the hand-off up | the end superseded, the chip kept at count 0; the hand-off down revives the end at its address and the chip lights again (V07 §5.5) | — | T-V7-68 |
| a siege of a village whose palisade closes only by barrier arcs | the closing arcs take no camp; with no walled stretch the siege draws the blockade on the entries' ways (§10.2 (h); V07 §5.6 (2)) | — | T-V7-69 |
| a crisis look over a hand-off epoch | from that epoch the look draws on the places of the rung in force — the town's districts after a hand-off up, V07 §5.6 (3)'s units (its ends, or an end-less thorp's toft groups) after a hand-off down (V07 §5.6 (4)) | — | T-V7-69 |
| a refugee look beside DR18's tent clusters | the look on `campLand`, never on a plot; the clusters stay the model's (V07 §5.6 (2)) | — | T-V7-69 |
| a famine in the harvest weeks | the bare fields drawn over the harvest's crop stage (§8.2's slot 15b) | — | T-V7-69 |
=== END ===

=== REPLACE ### 4.5 The clerk's view ===
### 4.5 The clerk's view

The clerk (V10, over §11.2's tool API) reads the same records a person sees: the `VillagePlan` (form, heart, character, the
sources), the ends, the fields, the palisade and the dossier's facts; it proposes with the twelve tools and its proposals are
dry runs shown as ghosts (J-A101.74). **Describe-to-map** on a village returns a skeleton — "a green village by a ford, the
church on the rise, a watermill below the ford, three open fields" becomes `intend` (VILLAGE, 600 people, form `green`, water
`stream`), `place` (`v.parish_church`, high ground within 200 m of the heart), `place` (`v.watermill`), `intend` (field system
`open_field`) — never a picture.

**The village `WhyProvider`** (V10 §3.9's owed table; item 270's interface (§2.8); W74; J-V7.140). `@plat/village` registers one
`WhyProvider` whose `kinds` are `VillagePlan`, `VillageField` and `VillageEnd`; it answers §11.2's `why` in `asPlaced` and
`asNow` modes (§11.2's `WhyAnswer`) from the committed records alone — the heart's terms recomputed by VS1's score (a pure
function of the site and the recorded inputs, never stored) — save its three view-bound rows (the season, the festival and
the crisis line), which read the view the `why` carries (`opts.view`, V10 §2.13; §11.2's view-bound `why`), never the
model, a `why` without a view giving none of the three; its rows are V09 §4.9's catalogue's, their words written here:
* `info.village.heart` — the heart's score terms ("the heart is at the ford (+0.6) on the sunny slope"), or "you moved it"
  (`heartSource: 'edit'`);
* `info.village.form` and `info.village.roads` — the form and the road topology with their sources (`formSource`,
  `roadsSource`): drawn, asked, the dossier's (the culture that weighted it, the access word) or yours;
* `info.village.end` — an end's kind and anchor, derived or declared, and the dossier quarter that claimed it;
* `info.village.field` — a field's system and kind, its rotation slot, a strip's holder ("this strip belongs to the third toft
  on the street");
* `info.village.platformWall` — a generated wall's platform and its step ("This wall holds the house platform above the lane —
  the ground falls 22 % here"); a scarp ("The terrace of a house that stood here until year N");
* `info.village.raisedCarried` — a carried raised way ("The arches were built in year N, when this was a city, for its water;
  they outlived it"; `RaisedRead.origin` and `reason`); `info.village.belowCity` — the village rungs' `belowCity` wording
  ("No viaduct here: villages never build them; you may draw one"); a removal ("You removed the viaduct; the town will not
  rebuild it");
* `info.village.palisadeRun` — a palisade run's condition and material and its epoch ("patched with hurdles in the lean years;
  rebuilt in timber when raiders came"; item 114 (f)); `info.village.unwalled` — an unwalled side from the barrier arc that
  closes it (item 106 (g): "the river is the wall here"; "the scarp is the wall here");
* `info.village.ceiling` — a building grander than the rung's usual ("the dossier names this hall"; "you placed it"; item 115
  (c));
* `info.village.remnant` — a village over a former town (V07 §3.12a): "the village grew in the old town's core"; the story
  itself is V10's from the replay record ("the walls were built when this was a city of twelve thousand"; for a symbolic peak
  "its exact size is not recorded");
* `info.village.superseded` — a superseded plan ("the old village, now the town's core");
* `info.village.season` and `info.village.festival` — a seasonal look and a festival shown ("the millpond is frozen: it is
  midwinter, and winters here are cold"; "the green is set for the harvest feast, weeks 34–35; the tables are on the green";
  items 117 (h), 118 (g)), read from `opts.view` — its `yearWeek`, its `festival` display and its `looks` answer's
  festivals (§7.7's DR43 over the dossier's schedule);
* the **crisis line** (item 122 (f); V07 §5.6) — while a crisis look stands at the viewer's key, the answer for a
  `VillageEnd` of a disaster look's units (§10.2 (d)) while the look stands over a building on its plots
  (`villageUnitPlots`; §10.2 (f): V06 §3.22 (3)'s `crisisLookYields` not yet true on it at `opts.view`'s week, a preview
  never handing over — as the end's `ruinTone` stands, §8.2) and for a `VillageField` a famine look leaves bare carries
  V09 §4.21.12 (4)'s `info.crisis.ruinedFor` row ("For now: Ruined quarters, the mill-end fire, weeks 30–34"), the one
  row its why card shows for it, read from `opts.view` — its `crises` and `week` and its `looks` answer's standing looks
  (§7.7's DR44 at the viewer's key); a condition the key withholds gives none.
Its completeness is item 270's test over these three kinds (T-V7-61). **The other "why"s** come from the kinds' own
providers and the section providers, reading this volume's rows: a house from its slot's density and rim multiplier and its
block's quota; a class from its V07 §2.4 profile, the relation and coverage rows the solver summed and the signature pairs that
fired (item 103 (e)); a wood from V07 §3.9's suitability terms, the shade among them (item 102 (f)); a custom institution from
its resolved profile's sources (item 104 (a)); a trade from the links and goods that pulled it (item 105 (j): "the bakehouse
stands by the green because its bread is eaten there; its flour comes from the mill at the ford"), or from the coverage and
spacing that pushed it ("the second alehouse serves the mill end; the first is 300 m away"); a market hall from its claim
("the fish hall stands on the green's edge, as halls stood on their markets"); the fair field from its record ("the annual
fair is held on this field by the north road; between fairs it is common"); a pin from the record that forced it or the VS8
row and epoch that placed it, read from its provenance ("the wayside shrine the dossier lists"; "the old shrine is the
churchyard cross now"; "a well sunk in year N for the new cottages by the mill lane"); a ladder record from its members
("Blacksmiths (3-10): three smithies, at the ford, the green and the north entry"); the underground from V04's records (V10's
rows): an unexcavated void ("the ruins under the green; nobody has dug down yet"), an access from its `cause` ("the smith's
cellar broke into the cave"; "the old mine broke into a gallery"), a dwelling from its access; a church's crypt or its absence
("most village churches had none; the dead lie in the churchyard"); a burial face ("the churchyard: where the town's catacombs
may begin"); a hollow way from its disuse epoch; a pier head ("A net store on the pier head: the landing's"); the water pull
("the cottages crowd the oasis shore").
=== END ===

=== REPLACE ### 5.5 Find at the village rungs (item 120, the village's part; J-V7.145) ===
### 5.5 Find at the village rungs (item 120, the village's part; J-V7.145)

Find is a view, never a change (item 120 (a)): its state is the per-viewer view key `find` (§2.9: the chips and the gaps
switch), kept across zooms, bands, layers, the season, epochs and edits until **Clear** or the panel's close, and saved with
the other view keys in the document's `view` section and in view pins (§2.9) — never in its canonical form, a digest,
its hash or the log. Every suggestion, count, glow, pin and ghost pin passes §11.2's
knowledge admission at the view's effective key (item 120 (h); V09 §4.8's View as). The panel, the type-ahead, the chip
grid, the results and the `live.find` overlay are V09's; the veil, halo, outline, pin and count-bubble rows §8.2's; the
search words and groups V11's lexicon; the gazetteer's class counts and match listing §11.2's. This section states what a
THORP, HAMLET or VILLAGE map offers and how each target reads there.

**(1) The list** (item 120 (b)), built by §11.2's gazetteer query over the model the view draws — the committed head or,
at a drawn week (§2.9's `week`) whose frame is not the head, V06 §3.15.2's frame (§11.2's *At a drawn week*) — nothing
the village lacks offered:
* **kinds** — every `v.` class with a standing member (V07 §2.4), the five dwelling rows included, so "farms" finds the
  husbandmen's farmsteads in the village and the outlying farmsteads in the hinterland (V07 §3.9 (5)); each under its
  `label`, its `synonyms` its search words, with its count ("Smithy · 2"), grouped by V11's groups; a town class that plays
  itself at a village rung (V07 §3.11 step 3) under its own V11 row; a word that matches a `v.` row and V11's town row of the
  same thing ("forge" → the smithy) offers the one the map holds, once;
* **named institutions** — the dossier's institution names first (V08's list entries), each bound to its members by V07
  §3.11's resolution order, a ladder record to all of them ("Blacksmiths (3–10)" → the three smithies);
* **areas** — the village itself (the one `village` district: the whole settlement lifted from the veil); its **ends**
  (`VillageEnd`, V07 §3.10), by name, else by kind and anchor ("the mill end", "the green end"), a declared end by its
  declared name; and the hinterland's **field groups** (`VillageField`, V07 §2.7): each great field, the infield and
  outfield, a common, the meadow, a wood, a strip holding by its holder's toft; at such a week, the ends and field
  groups that frame holds;
* **named places** — V07 §5.3's label rows: the green or the square, the church, the manor, the mill, the inn, the fair
  field, a named beach, a raised way's landmark word ("the arches", "the aqueduct"), the named lanes, the stream and the
  crossings (a ford or a bridge by its name, else "the ford");
* **people** — through V09's "Where is" (home and work), as at every rung.
An empty box shows the kinds as V11's grouped grid, as at every rung; at THORP and HAMLET the grid is short. The standing
crisis looks are listed in Find's `crises` section as at every rung (V09 §4.21.12 (7); V07 §5.6) — a look is no chip.

**(2) Show gaps** (item 120 (i)). At a village rung its units are the **ends** — a village is one district, and its ends are
its parts (V07 §3.10). For each chip's class, an end whose plots hold no member of the class is outlined dashed along the
union of its plots' faces and labelled "none here"; a village with one end, or none, has one unit, the village itself (its
perimeter, V07 §3.7), marked the same way. A member outside the perimeter (an outlying farmstead, the charcoal pit in the
wood, a mine's working) counts toward no unit, and a class whose row sites it outside (`outside` yes, V07 §2.4) is never
marked: a gap is a lack inside the settlement. An area or place chip has no gaps (the switch reads each chip's class, item
120 (i)). At a drawn week whose frame is not the head, the units and their members are read over that frame (§11.2's
*At a drawn week*; V01 §5.4 (3)): an end the frame lacks is no unit.

**(3) The look at village scale** (item 120 (e), (f)). The veil and the halo are §8.2's rows at every band. At a village
rung the city band is the township view (V07 §5.2): a match whose plot falls there under about 6 px — most tofts at VILLAGE
and HAMLET, the narrow ones at THORP — carries its chip's pin, and pins closer than about 24 px merge into a count bubble, so
a village's two smithies at the ford and the green may read as one bubble "2" at the township view and as two glowing tofts
at the district band. An area chip lifts its whole area from the veil and glows along its boundary: an end's the outline of
the union of its plots' faces (V07 §3.10), a field group's the outline of its furlongs, the village's its perimeter (V07
§3.7). A match in the hinterland glows as any other, the territory frame lying wholly inside the zoom-out limit (item 116;
V07 §5.2), so no match lies beyond the view's reach. **Across layers**: on Below, a dwelling in a cavern or ruin (V07 §3.16
(5))
glows on the underground layer and shows as a ghost pin on Ground (V04 §5.1); an access is no Find target (V05 §5.6 (1)); an
island a fallen city
left (V05 §3.15 (6)) carries its matches on Sky (V05's part); at the interior band an institution's rooms glow as V03's part
gives them.

**(4) Over time and edits** (item 120 (f)). Every commit, regenerate, undo, village epoch and hand-off, and every change
of the view's drawn week (§2.9's `week`), re-evaluates the chips at once: a smithy that opens at an epoch glows in that
commit and one whose use closes goes dark. A chip whose target
the map no longer holds — an end superseded at a hand-off up or merged away, a field group tombstoned — stays in the grid at
count 0, dark, until the viewer removes it or presses Clear; a hand-off down revives an end at its address (V07 §3.12), and
its chip lights again. After a hand-off up the town's districts and quarters are offered by V01's reading, and the old
village's ends, sub-area labels on the quarter tree (V07 §3.12 step 2), are no longer listed.

**(5) The clerk, exports and cost** (item 120 (i), (j)). The clerk's "show me the smithies" sets the chips (V10; a view
action, never an edit). A picture export of a village draws Find as shown, its chips in the legend (V07 §5.4; §11.1); a VTT
scene leaves it off unless asked. Find is an interaction, not a one-time wait (item 119 (d)): suggestions within about 50 ms
of a key and a chip's glow within about 100 ms of the click, its index rebuilt once per commit and, at a drawn week
whose frame is not the head, re-derived from that frame at each change of the week, the chips re-evaluated within about
100 ms of the frame being drawn, off the scrub's path (§11.2's *At a drawn week*; §12.5), and the base tiles never
re-rendered (item 120 (j)) — at the VILLAGE top an index of about 540 footprints, 25 village classes with the dossier's
names, at most 6 ends and the field groups of a few hundred furlong faces.
=== END ===

=== REPLACE ### 5.6 Crisis looks at the village rungs (item 122, the village's part; J-V7.146) ===
### 5.6 Crisis looks at the village rungs (item 122, the village's part; J-V7.146)

A crisis look is a look only (item 122 (a)): while a `ConditionOverlay` stands in the view's week (§2.7's reader comment) and
its `crisis.map` row gives a look, or one is previewed under §2.9's `crises` key (V09 §4.21.12), §8.2's `live.crises` draws it
by §7.7's DR44 and §10.2's *Crisis looks* — the table, the rates and every value V11's. Nothing here moves, adds or removes a
building, way, wall, plot, field or water edge or reaches a record, a digest or the hash; a condition the viewer's key
withholds is never drawn, listed or named; the parity presets, `VG` among them, draw none (§8.2's `extension` rows). This
section states how §10.2's places read on a THORP, HAMLET or VILLAGE map, the disaster's units there, the village tiers'
scale and the hand-over through the village's epochs.

**(1) The village tiers' scale** (item 122 (c), (h)). A look's extent at THORP, HAMLET and VILLAGE is its row's `scale` cell
for that rung, linear in severity, or, for a camp the dossier sizes, `areaPerHeadM2` × its heads (§10.2 (c)); V11's village
cells read the item's "a hamlet gets a war band's camp" — a siege, blockade or garrison camp of a war band, a refugee or
quarantine camp of a few tents and huts. **A siege at THORP or HAMLET draws no siege line**: its camp, smoke, burned
farmsteads and any engines its heads give (§10.2 (f)) stand without the trench and earthwork line, which a VILLAGE's siege
draws along its palisade's walled stretches only. A force the dossier sizes beyond what the frame and its margin hold fills
them, the rest drawn as §8.8's massed ring marks (§10.2 (e)): a large army at a hamlet is shown, never shrunk. A look scaled
as a share of its place's units (§10.2 (c)) takes, of a place's n units at its share s, round(s × n) clamped to [1, n]
where s is above 0 and none where it is not — §10.2 (c)'s count k, read for every share at the
village rungs, whose places hold few units (one end, three great fields, a handful of palisade runs), so a look standing at
a positive share never rounds to nothing; the disaster's `neighbourhoods` place then strikes at least every matched
target — the first max(k, |`matched`|) units of its order — and, by fire, stops where its order ends, the shortfall
reported (V01 §3.16 (5), the home).

**(2) The places** (§10.2 (d)'s places read on the village's records; every other rule of §10.2 (d)–(h) unchanged — the
outskirts shared by priority, siege, then quarantine, then refugees, under the density cap, §10.2 (e)).

| place | on a THORP, HAMLET or VILLAGE map |
|---|---|
| the main approach road | the way of the `through` entry (`VillagePlan.entries`, V07 §2.3) whose bearing is that of the DR3 partner of greatest weight, else the `through` entry, then the `neighbour` entry, nearest the heart by walking distance, ties by lineage; its gate the palisade's gate on it, else its perimeter crossing (V07 §3.7); an `isolated` village has none |
| `beyondWalls` | the `campLand` faces lying at least `siegeStandoffM` beyond the palisade's walled stretches (V07 §3.4), its barrier-closing arcs taking none; with no walled stretch a siege draws the `blockade` row (§10.2 (f), (h)) |
| `approachRoads` | `campLand`'s verges of each entry's way beyond the perimeter, one camp per entry, the camped ground and the dossier's armies divided among the entries as §10.2 (d)'s `approachRoads` states (the entries in the main approach road's order: the main approach road first, then the other `through` entries, then the `neighbour` entries, then the rest, each group nearer the heart by walking distance first, ties by lineage); an entry whose verges hold no `campLand` takes the `campLand` nearest where it leaves; with no entry, the `campLand` faces nearest the perimeter |
| `approachByGate` | the `campLand` faces along the main approach road by its gate, nearest `frontierFor`'s answer — at a village rung the main approach road's entry (the first row; V06 §3.22 (2) d.'s no-frontier case) |
| `outside` | the `campLand` faces furthest from the main approach road, beyond the palisade's outer strip, else beyond the perimeter |
| `affectedQuarter` | a unit of (3), an end where the village has ends: `disasterSource`'s first `matched` unit (V01 §3.16; a target names the unit holding its plot), else the unit with the most households per hectare of its plots |
| `fields` | the hinterland's arable faces (V07 §3.9: every furlong of the great fields, the infield and the outfield, a strip holding, an enclosed system's fields), the meadow and the commons; its pens the closes' and crofts' paddocks and the pound; its stalls the market's (V07 §3.10), none where no market stands |
| `edge` | the palisade's walled stretches, its gate gaps and barrier arcs excepted; unwalled, the perimeter (V07 §3.7) |
| `outlyingFarms` | the outlying farmsteads (V07 §3.9 (5)), outermost first, then the tofts of the farm classes (V07 §2.4) farthest from the heart |
| `gatesAndKeep` | the palisade's gates and the manor house (a castle or tower house playing itself, V07 §3.11 step 3, before it), else the open space that carries the market, else the green, else the heart, for its banners; its camp on the `campLand` faces nearest them |
| `streets` | the junctions and frontages of the ways inside the perimeter, those round the open space that carries the market first, else the heart's |
| `neighbourhoods` | (3)'s units |

**The outskirts' land.** At a village rung V01's `campLand` (V01 §3.16) reads the village's records: its built edge is the
perimeter (V07 §3.7), or the palisade's outer strip where that lies beyond it; its fallow faces are the furlongs in their
rotation's fallow course (§4.9) — a great field in its fallow slot (`VillageField.slot`), an outfield in its grazed years;
its approach roads are the entries' ways. So no camp stands on the green, a toft, a close, a croft or any other plot.
DR18's informal clusters under a migration condition (tents at the perimeter, V07 §3.11 DR16–DR18) are plots of the model
housing households the population counts; the refugee look is the arrivals the condition stands for, on `campLand` beside
them, never on them, and adds no household.

**(3) The disaster's units** (item 122 (b); §10.2 (d)'s `neighbourhoods`). The village product holds one district (PART III
(4)), so a disaster's whole neighbourhoods are its **ends**, built in V01 §2.3's `DisasterUnit` shape for V01's
`disasterSource`, whose one rule — the matched targets, then the pattern's strike order, then the share — picks among them
(V01 §3.16 (1)–(5)):

```ts
// @plat/village — the village rungs' disaster units (V01 §3.16 (1)): pure and draw-free over committed state, memoised per model digest, never stored
villageDisasterUnits(doc: Document): DisasterUnit[]   // V01 §2.3's shape; in end order, then address order
villageUnitPlots(doc: Document, unit: Id): Id[]       // a unit's land, its plots in address order: read by §8.2's ruined tone, the buildings' damage (V02, V03) and Find's frame (V01 §5.4 (6))
```
* **Units.** Each end of `VillagePlan.ends` with its derived plots (V07 §3.10). A village with no end (a thorp with no
  anchor, V07 §3.10) takes its **toft groups**: the district's plots joined where two share a boundary of positive length
  or front the same way segment, each maximal group one unit. The outlying farmsteads lie in no unit (they are
  `outlyingFarms`').
* **The shape's fields.** `id` — the end's (an entity, whose render key keys the draws, V01 §3.16 (4)), or the toft
  group's lowest plot id; `centroid` — the area centroid of its plots' faces; `inhabitants` — the members of the households
  housed on its plots; `meanHeightCm` — `Terrain.heightCm`'s mean over those faces; `waterFront` — a face of its plots
  shares an edge with a water face; `neighbours` — the units one of whose plots shares a boundary of positive length with
  one of its plots, or fronts the same way segment, in address order (a district's seam read at the plots, so a fire
  crosses the village street as it crosses a town's).
* **Targets.** A calamity's target (V01 §3.16 (3)) names the unit holding its plot; a target naming the `village` district
  names every unit.
* **The look.** Every building on a returned unit's plots draws item 123's damage at `lookLevel` by severity, or at its own
  decay level where that is higher (V02's exterior, V03's plan; nothing stored), while the look stands over it (§10.2
  (f): until V06 §3.22 (3)'s `crisisLookYields` turns true on it, then its Works; a preview never handing over), and the
  unit's plots' faces take §8.2's ruined tone at the city band while the look stands over any of its buildings. A one-end
  village's disaster ruins its one end at any positive share, at the depth `lookLevel` gives by severity.

**(4) The hand-over** (item 122 (a); V06 §3.22). What a crisis leaves reaches the village only through its epochs (V07
§3.12), as V06 §3.22 (1) states at every rung: the calamity through `EpochInputs.events` and the engine's `hazards` phase at
its targets (a step the village runs unchanged, V07 §3.12), the deaths and the exodus through the epoch's target — a hamlet
a crisis empties declining toward the deserted village by V07 §3.12's decline (J-V7.2) — and the newcomers who stay through
the village siting's (6v)–(9v) (infill, encroachment, then extension). The refugee camp stands by the main approach road's
entry ((2)),
`frontierFor`'s answer at a village rung; it claims no ground, so where the newcomers settle is the siting's. A disaster's
ruined look leaves each building as (3) states (§10.2 (f); V06 §3.22 (3)'s `crisisLookYields`), the rebuild's Works at
a village rung being the siting's regrowth-first rebuild (a house platform first). **Across a hand-off** the look reads
the rung in force (the fold's, V07 §3.12 *Which path runs*): from an epoch that hands up it draws on the town's places,
its disaster units districts (V01);
from one that hands down, on the village's; the band's hysteresis keeps it on one product while the population moves inside
the band.

**(5) Bands, families and framing.** §8.2's look rows by band, the village's city band being its township view (V07 §5.2):
the camps as clusters with their smoke, a VILLAGE's siege line and the ruined units' tone ((3)); the district band adds
the tents, engines, fences and barricades and the torn palisade (the `breached` run row); the neighbourhood band the
marked doors, rubble and fires. The `painterly` sheet gives §8.2's crisis roles (`crisis.tent`, `crisis.ash`, `crisis.mark`,
`crisis.army.a` – `.d`) by §8.2's placement rule over its own palette (V07 §5.1), `ink` by its rows; item 112's second cues
hold. While a look stands the opening view, Fit and the township view's limit take in the camps (§2.9's *The crisis
framing*; V07 §5.2).

**(6) Words, Find and exports.** The village `WhyProvider` carries the crisis line on an end the disaster look stands over
(§10.2 (f)) and on a bare field (V07 §4.5); Find lists the standing looks in its `crises` section as at every rung (V09
§4.21.12 (7); V07 §5.5); picture exports draw them and a VTT scene draws them in the image only, never as walls or
obstacles (V07 §5.4; §11.1).

**(7) Edges** (V07 §3.17's row; T-V7-60 (h)). No walled stretch — a siege is the blockade on the entries' ways, a beast
attack watch-fires along the perimeter and stake barricades at its way crossings, no torn sections; no green and no market
— no stalls to shutter, `gatesAndKeep` down its fallbacks; no entry — every camp on the `campLand` nearest the perimeter;
no `campLand` left in the frame and its margin — §10.2 (e)'s ring marks; no outlying farmstead — the farm tofts farthest
from the heart; no arable face — famine's pens and stalls alone; a THORP of one house — one unit, its toft ruined by a
disaster at any positive share at `lookLevel`'s depth; no end — the toft groups; an end an epoch or an edit removes while a
look stands — the units re-derived at that commit, the share read over them; a preview on a standalone village — every place
read the same, at `previewSeverity`; a look and a festival in one week — both drawn (§8.2's slot 19b), famine's bare fields
over the crop stage (slot 15b); save, load, undo, redo, regenerate and migrate — nothing stored, every look re-derived
from the committed state and the view.

**(8) Cost and build.** No model time: a look is drawn lazily per visible tile within §12.5's budget, and
`villageDisasterUnits` is one pass over the district's plots and their shared edges, ≤ 0.5 ms at the VILLAGE top, memoised
per model digest (V07 §6). Bar: T-V7-69. It lands at V-M3 (V07 §8; risk (14)).
=== END ===

=== REPLACE ## 6 Performance budgets ===
## 6 Performance budgets

Measured on §12.1's reference machine and rules. VG's own model takes 14 ms (no water) to 143 ms (a pond, cold), a whole
regenerate with rendering 240–330 ms of script (`research/findings/profile-village.md` §5); a village of ours carries a
territory, fields sized to its people, institutions and site plans VG does not, and still stays inside TOWN's one-click bars.

**Model time** (p95, the pool configuration of §12.3, single-worker fallback + 15 %): the law
`T ≤ 20 ms + 0.8 ms × frame km² + 110 µs × footprints` (J-V7.42, J-V7.61) — the frame term is the frame with its margin (1.44
× the territory at the default margin share): S1's rasters, VS1's daylight sweeps, S12a and the hinterland unit's faces,
re-derived from §12.4's measured hydrology rate (≈ 0.16 µs per cell) at the coarse village hydrology grid (V07 §2.2); the
footprint term the fabric, placement and site plans.

| rung | at the band bottom / the target / the top | p95 bar | measured against |
|---|---|---|---|
| THORP | 21 / 24 / 27 ms (frame 0.5 / 1.7 / 3.3 km²; 3 / 20 / 40 footprints) | 30 ms | the law |
| HAMLET | 27 / 35 / 50 ms (3.3 / 8.3 / 16.5 km²; 40 / 75 / 150 footprints) | 50 ms | the law |
| VILLAGE | 50 / 71 / 129 ms (16.6 / 29 / 62 km²; 150 / 250 / 540 footprints) | 100 ms up to ≈ 1 100 people; above it the law (≤ 130 ms at the top), a declared target miss against TOWN's 100 ms one-click target (§12.3's form) inside item 119's comfort level | the law |

**The VILLAGE target's split** (p50 on the critical path, PLAUSIBLE until V-M0 measures it): S0 0.2 · S1 10 (terrain at 8 m
from the 32 m fBm grid; hydrology at 32 m, ≈ 28 000 cells) · S2 1 · VS1 4.5 (the 20 m heart lattice 1; the nine daylight sweeps
≤ 3 over ≈ 72 000 cells, ≤ 6 at the top over ≈ 155 000; the lattice and its costs, the destinations, the border and ponds 0.3;
the leat 0.2) · VS2 6 (≈ 150 000 cells) · VS3 0.4 · VS4 4.5 (≈ 1 500 tracker steps, the neighbour roads' routes, the wharf and
piers) · VS5 3 (the perimeter with its interior cut) · S7 1 · S7b 0.5 · S12a 3 · VS6 1.5 (runs, reached faces, the capacity
estimate) · S9–S11 18 (≈ 70 µs per footprint, §12.4's S11 share) · S12b ‖ the hinterland unit 8 (≈ 400 furlong faces) · VS8 1 ·
S12c and S13a 2 — ≈ 65 ms against the law's 71 ms p95. Inside these figures: the barrier closure ≤ 0.5 ms in VS3 (a run scan
of ≈ 60 trace vertices against the barrier edges within the reach, one polyline splice); the supply links and the relaxation
pass ≤ 1.5 ms in S10b (≈ 25 institutions, ≤ 2 passes, nearest-provider queries on the district's plot index); the ladder members
and the entry store inside S10b's per-footprint share; S11's platform levelling ≤ 1 ms at the VILLAGE top (≈ 300 platforms,
each at most 12 samples, one plane fit and one polyline per walled edge); VS4's raised-way obstacle test ≤ 0.2 ms with a
uniform grid index of its obstacles (its standing supports, its ramps and stairs and its `vault` spans' under-deck strips,
V07 §3.5a (3); only when a raised way stands on the map); the foot joins inside VS4's finish; the pier head inside
VS4's piers; item 111's water pull ≤ 0.5 ms in VS2 (one distance transform of the reliable water over the density grid; 0 when
`w_water` is 0); item 113's trace term ≤ 1 ms in VS4 at the top (a nearest-trace query per step on a uniform grid of the ruined
ways, only on a refounded map) and the replay's own budget V06's; item 114's generation-time condition a table read per run;
item 115's ceiling a row read in S10b; items 117, 118 and 122 no model time (looks, drawn lazily per visible tile within
§12.5's budget; `villageDisasterUnits` ≤ 0.5 ms at the VILLAGE top, one pass over the district's plots and their shared
edges, memoised per model digest, V07 §5.6). **The underground tail** (V07 §3.16) runs after the first
map and outside this law: V04 §6's village columns, the whole tail ≤ 10 ms p95 at each village rung.

**First map:** the complete district band ≤ the model time + 60 ms at every village size (≤ 160 ms at the top); the relief
tier, shadows and the spotlight within §12.5's settle bound; a season switch re-skins within §12.5's re-skin budget (item 117).
**Edits** (p95): a block's re-race ≤ 5 ms; a density stroke over 10 blocks ≤ 15 ms; `drawGreen` ≤ 20 ms; `drawWay` (points or
walk) ≤ 15 ms; `declareEnd` ≤ 3 ms, lassoed with its count badge ≤ 5 ms; a field system switch ≤ 15 ms; a coarse edit (a heart
move) ≤ the rung's model time; a drawn wall with its barrier snapping ≤ 20 ms; a palisade run repaired ≤ 2 ms; a link pinned or
cut ≤ 5 ms (the bound members re-scored, no re-race); an oasis added or removed ≤ 20 ms; item 110's edits: a raised way added at
a village ≤ 20 ms, its removal ≤ 15 ms, a retaining wall drawn ≤ 15 ms, a terrace stroke over 10 blocks ≤ 20 ms, a deck plot
placed ≤ 5 ms; the underground edits V04 §6's. **An epoch** at a village rung ≤ 60 ms at the VILLAGE target (no S5 stage),
inside which `village.pins` ≤ 2 ms (a coverage pass over the housed households on the district's plot index, the orphan check
over the pins on the faces the epoch tombstoned, and ≤ 10 new pins) and `village.records` ≤ 5 ms per record it places (a claim
or join, one plot, one building; the fair field ≤ 3 ms; item 4's church the base's placement row, §12.6, plus one pin) and ≤ 1
ms per record `remove` takes (a tombstone or an unbinding); on an absorb without an epoch the same per-record bounds inside the
absorb's commit. **At a base-product epoch** while a superseded `VillagePlan` exists, `village.density` recomputes the old
core's raster ≤ 6 ms p95 (VS2's cost over the old core's box, ≈ 150 000 cells at a VILLAGE-sized core) and `village.plan`
returns no ops (its scope is a village rung); V06 §6.2's participant row cites these figures. **Memory** ≤ 25 MB for the model
and the district band's display list at the VILLAGE top. **Work limits** (§5.1 (5)): tracker steps ≤ 40 × the frame side ÷ the
step (VS6's top-ups included); trackers ≤ 4 + 0.3 × N + 3; slots ≤ 3 × N + the institutions' joins; the daylight sweeps 9 × the
cells; all laws of `N` (V07 §3.2 (3)).

**Confirming measurement:** V-M0's spike and V-M1's exit on the `B-VILLAGE` bench (V07 §7). **Pre-decided fallback:** if a
rung's p95 exceeds its bar, the height raster goes to 12 m, the daylight raster to 30 m and the density raster to 6 m at that
rung and it is re-measured; if it still fails, the bar is re-declared at the measured p95, a declared target miss inside
item 119's comfort level (D-18's form as item 119 (a) re-declares it).

**One-time waits** (item 119, the village's part; J-V7.144). The laws above stay the **targets** — as fast as possible, the
build pressing every path toward them (item 119 (a)). The **comfort level** is ten seconds of total time: every wait a user
sits through once at THORP, HAMLET and VILLAGE — generate, regenerate, opening a map from SettlementForge, a dossier change
applied, an epoch (advancing time) and item 113's history replay (V07 §3.12, V07 §3.12a), an export (V07 §5.4) and a
migration — completes within 10 s from the click to the complete result on §12.1's reference machine, at every village size
(T-V7-67); past it a wait is a failure. An epoch run and the history replay are timed against it as V06's part of item 119
times them, the village's figures above being their inputs. A step runs slower than its target only for a measured gain,
recorded as its `perf.qualitySpend` row (V11 §3.25.8; §4.1's quality budget: the step, its cost and its gain) and still inside
the comfort level (item 119 (b)); no village stage ships one. A wait beyond about one second shows progress — the stage by
name and the map filling in, never an empty screen — through V09 §4.21.9's progress view (item 119 (c)); the first picture is
still the complete district band (§8.5). The edit and switch budgets above (every edit's p95, the season switch's re-skin)
and every frame budget the village's views read from §12.5 are interaction budgets, unchanged by item 119 (d); the first
map's bound is a target like the laws. The low tier (§12.1) aims at the same
comfort level, a size it cannot reach declared per device (item 119 (e)). At every village size the targets lie far inside
the comfort level (the model law tops out near 130 ms), so item 119 moves no village figure: it re-reads a missed target —
the VILLAGE row above ≈ 1 100 people and the fallback's re-declared bar — as a declared target miss inside the comfort level,
never a veto question.
=== END ===

=== REPLACE ## 7 Tests and acceptance bars ===
## 7 Tests and acceptance bars

**The bench.** `B-VILLAGE`: 200 seeds per village rung × four water settings (none, a stream, a river, a coast) × the seven
forms at their default weights (PR tier: 20 seeds per rung; nightly: the full bench; §13.8's tiers), plus an arid set (item
111), the frozen small-dossier fixtures (the 70 thorps, hamlets and villages and the 5 small towns of the 155 surveyed,
`research/sf/dossier-outputs.md` §3) and the 10-person thorp fixture, plus `B-VG`: 200 seeds per VG request-tag set under the
`VG` preset, each request set mapped onto `VillageRequest` by the request-mapping table (item 495). Each bar is labelled C (a
rule followed), P (parity with a measured VG number) or O (an outcome VG does not reach), as §13 labels them. A class a bar
names in words (the church, the smithy, every watermill) is its `v.` row of V07 §2.4 (J-V7.95). These tests take over the
village rungs' clauses of the base's hook bars (§13.2's take-over row: T13-1, T14-1, T30-4, T65-2, T102-1, T110-7, T111-1 –
T111-5, the village halves of T113-1 and T113-3, and the village clauses of items 114–120's bars and of item 122's T122-5 and
T122-6, each test naming in its head the bars it takes over); every no-op pin registers on V12 §3.7.8's engine — its test
stating that registration in one clause — and reads "off" as V11 §3.24.0's switch table.

| id | bar | class | milestone |
|---|---|---|---|
| T-V7-1 | routing: populations 1, 8, 79, 80, 399, 400 and 1 499 build THORP, THORP, THORP, HAMLET, HAMLET, VILLAGE and VILLAGE; 1 500 builds a TOWN; with the product unregistered a dossier below 1 500 is refused naming the village product, registered it is created | C | V-M1 |
| T-V7-2 | population exact: the households' members sum to `P` on every bench seed; `N_v + N_o = N` and every household is housed once; with a dossier, the residential building count (`N_v + N_o`) lies inside the housing record's range on every fixture; the 10-person thorp (range 4–16) builds 4 households in 4 dwellings; a fixture below `household.minSize` builds the surplus vacant and reports `W_VACANT_TO_RANGE` | C | V-M1, V-M2 |
| T-V7-3 | registration: every input key of every stage in `ProductDecl('village').stages` has exactly one producer in the set (the declaration layer counting as the one producer of `declarations.*` and `raised`, V07 §3.0); no village stage writes a ground part from 1; the order has VS2 and VS3 before VS4 and VS5 before S7, and contains none of S3–S6, S8; on a registration fixture L0 is written only by S1 and VS1 and L1 only by VS1 (the border first), VS4, VS5, S7, S7b and VS6, in that order, none after S9 (the kernel's writer check) | C | V-M1 |
| T-V7-4 | the heart is dry, above the flood line and within its slope limit, or F-V-HEART's rung is reported | C | V-M1 |
| T-V7-5 | density: under `VG` the raster equals the restated formula's reference implementation bit for bit on 100 fixtures; the mean populated area is monotone in `δ` | C | V-M1 |
| T-V7-6 | palisade: every nucleus inside the trace; every gate on a way; no footprint in the band; a dossier wall record gives a palisade on 100 % of fixtures, none without one | C | V-M1, V-M2 |
| T-V7-7 | network: one connected component; every through road reaches its entries; 0 self-intersections; every bridge within ± 10° of the channel normal; through-road length over its grade limit ≤ 5 % outside `VG` | C, O | V-M1 |
| T-V7-8 | the open space lies inside the palisade and clear of water and the mill; its area grows with `√(P ÷ target)` within the scale clamp | C | V-M1 |
| T-V7-9 | every built plot has an access edge on a way and every dwelling's main door faces it (the hidden share 0); every built plot's access edge reaches its main door on the ground, directly or by a `ramp` or `stair` yard part; every drive that crosses a platform wall is a ramp within `rules.grade.track`, or F-V-TERRACE's rung is reported | C | V-M1 |
| T-V7-10 | every watermill stands on a reach with ≥ 1 m of fall and a leat within its limit, else F-V-MILL's outcome is reported | C | V-M2 |
| T-V7-11 | hinterland: arable per head within ± 20 % of its row outside `VG`; ≥ 80 % of meadow below the flood line; great fields within ± 25 % of each other; the furrow axis downslope on ≥ 90 % of furlongs steeper than 2 %; the territory's area per head equals the sum of the farm rows and moves with an `editTable` of one | C, O | V-M2 |
| T-V7-12 | institutions: each V07 §2.4 presence row's rate within ± 5 % of its anchor law at the fixture's population over 1 000 seeds; the church within 200 m of the heart or on the green on ≥ 80 % | C | V-M2 |
| T-V7-13 | dossiers: every small fixture is created; every institution record placed or bound by V07 §3.11's resolution order; every quarter on an end; walls exactly per record; the title word the dossier's; a `burial_ground` or `graveyard` record resolves to one burial face (the churchyard enlarged or its own `cemetery` plot) carrying its binding key; `access_to_external_mill` gives 0 mills and a reported milling import; Wealthy Residential claims the end of highest mean prosperity and biases only its plots, Common Residential claims nothing; the Religious Quarter's east phrase puts the church east of the heart more often than its random baseline (while §7.7 item 16's east row stands; the clause lapses with it, J80 Q5); a `Toll bridge` fixture on a dry `plains` site gets a brook its through road crosses by a bridge, and on `desert` without `oasis_water` its toll house stands at an entry with `toll_bridge_dry` reported (V08 §2.6b (3)); a coastal fixture whose `PortValues.threats` holds `naval` stands its watchtower at the wharf or chief landing and walls none of its water; an `access_to_parish_church` fixture at THORP and at HAMLET has no parish church, no parsonage and no tithe barn of its own (a chapel of ease by its row); a crown fixture and a merchant-oligarchy fixture each stand their `villageSeat` class; an `ecclesiastical` hamlet fixture with `Access to parish church` stands its `v.parsonage` with no parish church and no F-SITING report; a `fish_market` fixture puts the market on the open space and its hall's plot on the space's rim — the hall within 60 m of the market, no toft slot taken, the open ground left no smaller than the unhalled size; a port fixture with `Docks and port facilities` stands its harbour master within 60 m of the wharf's quay; an `annual_fair` fixture lays one secondary `market` reservation of `market.fairHa` outside the perimeter at the through road's crossing nearest the heart, claimed as common, with 0 pins on it, or reports F-V-FAIR's rung; a `monastery_or_friary` fixture seats its cloister on joined slots of `claimArea.cloister`'s area at its band; a `town_watch` fixture's `v.watchtower` lies nearer the green than its random baseline; a crown, a seigneurial, an ecclesiastical and a chartered-commune fixture at VILLAGE place no `palace`, `castle`, `cathedral`, `courthouse` or `guildhall` of the government row's and no `v.watchtower` beyond its presence row, each standing its `villageSeat` class; a coastal `slave_market` fixture seats its slave market on joined slots with no claim on the open space, its site nearer the wharf or an entry than its random baseline; a thorp fixture with a `Wayside shrine` record and no Roadside Shrine quarter stands exactly one `shrine` pin bound to that record, on every seed; a hamlet fixture with `Wayside shrine` and `Parish church` binds the shrine record to a `cross` pin inside the church's `churchyard` part, nearest its door, with no shrine pin at the settlement edge bound to it; a `Water source` thorp fixture binds its record to a well pin. **Its village-history clause** (run on M4's grow path at item 202's call points before M6-E and on V06's runner after): an `annual_fair` record arriving at an epoch lays its fair field outside the perimeter on `commons` faces, never inside the district, still extramural after an (8v) extension and standing as a secondary market after the hand-off up; a `fish_market` record arriving at an epoch cuts its hall's claim from the rim with the open space not grown and the encroached share within `epoch.encroachShareMax`, else its reported rung; a `monastery_or_friary` record arriving at an epoch opens on joined plots of `claimArea.cloister`'s area or an outside plot, else its reported rung; every record the port adds at a village epoch is placed or bound in that epoch's `dossier` step — by `village.records` for the market, claim-sized and pin records, by the base's placement for the rest — with 0 records left unplaced at the `epoch` event's check; the `fish_market` record's hall stands **built with its use open** (`openUse`, cause `dossier`) in the epoch the record arrives, its plot the rim claim or joined plots, and a `monastery_or_friary` record's cloister likewise, its outside plot cut from a hinterland face whose remnant keeps its land use; a roster `fair_ground` member with no standing field — the fixture's field held on the green at creation by F-V-FAIR's last rung — is laid by step (m) at the first epoch whose perimeter crossings offer a dry face, outside the perimeter on `commons` faces, each face gone from its `VillageField`'s `furlongs` in that batch; a `Wayside shrine` record added at an epoch stands its bound `shrine` pin at that epoch; an `annual_fair` record removed at a later epoch leaves its reservation tombstoned in that epoch and its faces `commons`, and a `Wayside shrine` record removed leaves its forced pin tombstoned, while one whose record had bound a chance shrine leaves that pin standing, unbound; a `weekly_market` record removed below the law's crossing clears the principal market rank in that batch, 0 stalls at the next village epoch and `dist.market` measured to the first nucleus's open space, and one removed above it keeps the market by the law, its stalls at count; a `Wayside shrine` hamlet fixture whose record is promoted to `Parish church` at a village epoch stands its church bound to the record's key and one churchyard `cross` laid for the record with no binding row, the roadside shrine standing unbound, a hamlet fixture whose next offer drops `Wayside shrine` and adds `Parish church` with no receipt binds the shrine's key to the churchyard `cross`, the church bound to its own key, and a `fish_market` record added at an epoch beside a standing fishmonger stands its hall on the market's rim with the fishmonger's shop keeping its use; and, at V-M2, an `annual_fair` and a `fish_market` record absorbed without an epoch lay the fair field and the built, open hall in that absorb's commit — the hall standing finished, with no Works — and S10b's `dossier` request receives neither (J-V7.128); two `fish_market` records absorbed in two weeks between the same pair of epochs stand two halls with two distinct use addresses, each minted from its own dossier event's `seq`, and a record carried by an epoch mints the addresses and draws the values the same dossier event mints and draws folded standalone at that `seq` (J-V7.129); the `Wayside shrine` promotion to `Parish church` absorbed without an epoch stands the church on the record's key and its churchyard `cross` with no binding row in that absorb's commit | C, O | V-M2 (its village-history clause at V-M3) |
| T-V7-14 | the hand-off up: a fixture village grown past the band over epochs keeps every surviving entity byte-identical, retypes its district `central` keeping `village-ways`, turns its green into the market (its `Greenery` a `market_green` part) when the town has none, and grows the town's first stage from its perimeter; a re-derivation of the old core after the hand-off runs the village fabric on its recorded inputs, the participants registered with stage `VS1` (`village.plan`) and `VS2` (`village.density`), T-V11-1 (b) recording their reads of `village.json` under those two ids and never under a participant id; a target alternating 1 480 / 1 520 changes the product 0 times and one alternating 1 400 / 1 600 at every epoch; no catacomb exists before the first TOWN epoch; after it at most one, sourced at a burial face, 0 sourced at a church; a drawn crypt stays with its church, unchanged by the crossing, joining only by the crypt-join draw; the churchyard's age at the crossing equals its creation age plus the logged years; an epoch undone after a save restores on load; one document | C | V-M3 |
| T-V7-15 | the hand-off down: a TOWN fixture falling below the band creates a `VillagePlan` (a former village revives its one plan at the same address, its declared fields kept), re-cuts no district and runs the village phases at later epochs; a second crossing up and down leaves one plan record | C | V-M3 |
| T-V7-16 | desertion: a target of 0 vacates every dwelling but a locked or pinned one, which keeps its state — with 0 households under a dossier fall, with its last household under any other (V06 §3.5.1 (5)); after ten epochs the church stands on ≥ 60 % of seeds and the hollow ways persist; the replay reproduces the history | C, O | V-M3 |
| T-V7-17 | locality: a block's re-race changes nothing outside the block; a density stroke changes only its blocks; a field-system switch — `forest_strip` included, its strips starting at the crofts' rear lines — changes nothing inside the perimeter (the oracle of §7.3) | C | V-M3 |
| T-V7-18 | determinism: digests identical across the five engines of §13.3 on 100 seeds per rung; removing one branch (a density stroke that suppresses it) leaves every draw of every other tracker identical and changes the geometry only of the trackers in its computed influence set — those that merge onto, or test junctions within `branchSpacingM` of, the removed branch's ways — asserted on 100 fixtures; a stage with no draws consumes no stream index | C | V-M1 |
| T-V7-19 | item 102 at village rungs (T102-1's village clause): with `sunTerm` and `woodShade` at 0 the output equals the build without them byte for byte; at their defaults the dwellings' mean daylight share exceeds the density box's and the woods' mean share is below the arable's, across the bench | C, O | V-M2 |
| T-V7-20 | item 103 at village rungs (the statistics suite, village rows): the smithy's distance to the through road and the church's to the heart below their random baselines; the tannery downstream in ≥ 70 % of river villages that hold one | O | V-M2 |
| T-V7-21 | item 104 at village rungs: the custom fixtures (a category only; tags; an archetype; an active chain) resolve, site and report; a chain's nodes closer than a random baseline; the flow order holds; a `mercantile-market` custom record at VILLAGE binds a `market_cross` pin at the centre of the reservation carrying the market (the open space, else the flanking square), in place of the drawn centrepiece, and a `sacred-shrine` custom record binds a `shrine` pin at the perimeter on a road | C, O | V-M2 |
| T-V7-22 | editing: each V07 §4.1 row's event is identical from the canvas, the tool API and the skeleton file; a declared heart, green, end and walked road survive Regenerate (keep); a lassoed end holds exactly the plots inside its lasso and survives the merge and the cap however few its plots; the dry runs of `declareEnd`, `drawGreen` and the density brush return the count badge; an unlawful form edit under `forest_strip` is bent to `open_field` with its note; a zero-length stroke or zero-area lasso is refused by its dry run as a shape, never logged | C | V-M3 |
| T-V7-23 | parity with VG (`B-VG`, under `VG`): dwellings per village in VG's recorded range per tag set; the accepted-frontage share (`vg.acceptedShare`) in VG's measured 63–82 %; the square's rim radius, the trail and approach counts, bridges per river map, the palisade rate on dry maps (0.2, 0.3 when dense) and the road-topology shares, the orchard share and the wood cover per map each within the band rule of §13.5 against `baselines.json`'s VG rows | P | V-M4 |
| T-V7-24 | performance: V07 §6's laws and bars on `B-VILLAGE`; `R_s` recomputed from `village.json` at each rung target lies within 5 % of V07 §3.2 (6)'s figures (≈ 100, 245 and 480 m) and the density box's cell count within 10 % of V07 §3.3's; `village.density` at a base-product epoch within its bound (V07 §6) | C | V-M1 (the epoch clause at V-M3) |
| T-V7-25 | renders: B-ZOOM's role continuity across every band switch of `painterly` and `ink` at village rungs, the programs `roof.faces`, `roof.palette`, `roof.ruin`, `way.edgeFade`, `bridge.shadow`, `crown.bands`, `crown.groupShade`, `spotlight.focus` and `spotlight.size` in its role list | C | V-M3 |
| T-V7-26 | labels: no end label over the church, a gate or a well; the title plate never over the heart | C | V-M3 |
| T-V7-27 | exports: the GeoJSON village layers validate (with `hollow_ways`, `house_platforms`, `landmark_parts`, a strip's `holder`, a declared end's flag, a reached close's flag); `VillagePlan`, `VillageEnd` and `VillageField` round-trip through `.plat` byte-identical | C | V-M3 |
| T-V7-28 | robustness: 10 000 seeds per rung — 0 whole-map retries, 0 crashes, 0 tier-6 omissions of a requested feature; every F-V rung counted in the report | C, O | V-M1 |
| T-V7-29 | the owner's side-by-side against VG (§13.6's D-5 protocol, twenty pairs over VG's tag sets, the `VG` preset beside VG and the default beside VG) — rated, or the owner's acceptance recorded; unrated, the milestone is *provisional — not rated* | O | V-M4 |
| T-V7-30 | desertion traces: after a desertion fixture every hollow way is a way of a land class on ground part 0 in the `abandoned` existence with its disuse epoch and every house platform a dwelling in the `cleared` existence; 0 hollow ways on a deck, a ford or a raised part (T-V7-50); every retirement is a `retireWay` op (a primary included), struck by V06 §3.5.2's strike pool at the `street` persistence row (its weight `E(x) · rate · u`, under the district's `fabric` churn cap scaled by the epoch's years), and every effacement an `effaceWay`, while 0 `downgradeWay` lowers a primary at any rung; both render in every family, export in their GeoJSON layers, round-trip through `.plat`, and regrowth rebuilds on the platforms and reopens the hollow ways first | C | V-M3 |
| T-V7-31 | the barrier closure (item 106 at village kinds): a river-bend fixture is fenced across its neck only and its enclosure is sealed; a scarp-backed fixture has 0 walled edges along its sheer arcs; no walled edge lies within `palisade.bandM` of any shore; 100 % of landings and wharves are reached from the heart without crossing a walled stretch; every walled stretch's ends anchor on a barrier, or F-V-ANCHOR's rung is reported; the reached ground holds only commons-owned closes typed by S12b, no dwelling, and is excluded from S10a's quotas and VS6's capacity; under `VG` the palisade is byte-identical to the build with the closure off | C | V-M1 |
| T-V7-32 | the palisade's REPLACEMENT: with ≥ `ladders.replaceShare` (80 %) of dwellings inside, a town-wall promotion keeps the trace's vertices and gates, retypes the kind to stone and stands every run robust; below it, a new ring anchors on the barriers and the palisade, and the palisade is superseded; one document | C | V-M3 |
| T-V7-33 | the supply web at village rungs: every good of V07 §2.4's supply rows is an id of V11 §3.7.1 and every provider class produces the good it provides (T-V11-3 and T-V11-28 pass over the village rows); with its weights at 0 the output is byte-identical (item 105 (k)'s no-op pin — the `item105.web` registration of the village goldens on V12 §3.7.8's engine (V12 §2.13), written by the V-M2 seat); the district term changes nothing (one district); every dwelling's toft is identical with the web on and off; across the bench the bakehouse and the alehouse lie nearer the open space, the smithy nearer a through-road entry or the crossroads, and the charcoal pit and the wood yard nearer the wood edge than their random baselines; with two mills each consumer binds to the nearer | C, O | V-M2 |
| T-V7-34 | balance at village rungs: with `comfortM` and the spacing at 0 the output equals items 103 and 105 alone byte for byte; the nearest-alehouse distance between alehouses exceeds its random baseline; every end of ≥ 40 households lies within 400 m walk of an alehouse on ≥ 80 % of VILLAGE seeds; no end is named for a trade without a dossier claim, a declaration or item 72's threshold (0 on the bench) | C, O | V-M2 |
| T-V7-35 | ladders at village rungs: on the small-town fixtures every COUNT (save `multiple_water_sources`, a floor), QUARTER and GUILD record shows members inside its range, non-decreasing across a population sweep from 900 to 1 499; a `Blacksmiths` record's smithies spaced by the row's `K spread 200`; a craft- or merchant-guild COUNT record stands that many `guildhall` members, a GUILD record of that COUNT's `categories` family adds no hall beside them (its hall one of the COUNT's members), and one of another family keeps its own hall (V08 §3.5.1 (c)); a `multiple_water_sources` record's wells number at least the range's low end and the coverage count; a `Wayside shrine` beside a `Parish church` record leaves no edge shrine and one churchyard cross bound to it; a lesser record beside its greater adds no building; a SIZE record is one building; a promotion whose greater's thing is the lesser's (V08 §3.5.1 (c)'s first case) keeps member #1 byte-identical, and one to a REPLACEMENT greater of a new thing places the greater new and leaves the lesser's former thing byte-identical and unbound; a demotion keeps the member nearest its demand | C | V-M2, V-M3 |
| T-V7-36 | chains and the entry store: every dossier chain whose members stand on the map becomes links on 100 % of fixtures with chains; a chain with an absent processor binds nothing, adds no building and is reported; an `entrepot` chain's store stands at the entry facing its partner (the inn, else the landing, else a farmstead) on 100 % | C | V-M2 |
| T-V7-37 | splits at village rungs: 0 split pairs below 900 people across the bench and 0 under `VG`; above 900, pairs only where item 105 (h)'s threshold fires; an author's `branchOf` assignment makes one, held through Regenerate (keep) and removed by its inverse; a town shrinking into a village keeps its standing pairs | C | V-M3 |
| T-V7-38 | caverns and ruins at every village rung: across the bench (with a mountainous-relief set and a dossier-ruin set) caverns and ruins occur at THORP, HAMLET and VILLAGE at their rows' rates within ± 3 s.e.; cavern frequency higher with mining than without per relief class; a dossier `ancient_ruins` fixture gets a ruin with its marker linked, or a reported reason; with the ruin chance 0 and the base's relief, boost and fissure rows the village is byte-identical to the build without these kinds (a `NoOpPin` — the `item109.underground` registration of the village goldens on V12 §3.7.8's engine (V12 §2.13), written by the V-M2u seat); the village rungs' levels of item 109's presence and access bars join at V-M4, `notApplicable` before, never `insufficient` (V12) | C | V-M2u |
| T-V7-39 | access grows with the village: across a growth sweep from 40 to 1 499 people over one fixed void, the accessible share rises monotonically with the buildings over it; a 40-person thorp over a void is sealed on ≥ 60 % of seeds; a mining working with a gallery within `breachM` at its depth gives a `mineBreach` access on 100 %; a dug passage crossing a sealed void makes it accessible, transitively through its links | C, O | V-M2u |
| T-V7-40 | dwellings only after access: 0 dwellings in a void without an access; every `AccessPoint` carries its `cause`; 0 undercity at any village rung; 0 catacomb, quarry, vaults or buried systems created at a village rung save the charnel vault of a dossier catacomb fact and a replay's buried former settlement (V07 §3.12a (2)) | C | V-M2u |
| T-V7-41 | smooth scaling: across a population sweep from 60 to 1 499 in steps of 10, every presence rate and every count is monotone non-decreasing within its tolerance and no rate changes by more than 0.1 between adjacent steps — the grandeur ceiling's rung step (V07 §3.8) excepted and asserted by T-V7-63; at 40, 200 and 700 people every cell equals its rung column | C | V-M1 |
| T-V7-42 | the resolution order: every catalogue kind of tiers T, H, V and W — the count read from `dossier.catalogue`'s manifest, never written into the bar (176 at the pinned line: 97 kinds of tiers T, H and V and 85 of W, six in both) — resolves at the three village rungs to exactly one of pseudo-reader, village class (a `v.` key), own class or fallback; no pseudo-class builds a building (an `@absent:` kind zeroes its classes' demand through their village forms, asserted at THORP and HAMLET for `@absent:church`); the fallback is reached only through `unmapped_kind` and is reported; the compile refuses an unprefixed village row and a `villageForm` naming a non-`v.` key (V11's T-V11-3 clause); every class a kind of tiers T, H, V or W plays itself at a village rung has a finite plot area at THORP, HAMLET and VILLAGE (a compile check: a template family whose plot is "the claim's" reads `rules.claimArea`, V07 §2.2a) | C | V-M2 |
| T-V7-43 | the hand-off down's underground: a TOWN fixture with sewers and a catacomb shrinks into a village over epochs; every tunnel record survives; the catacomb's extent is non-decreasing (never below `extentFloorM2`), its state `stagnant` with `'rung'` in `blockedBy`, its `fill` non-decreasing, its `source` a burial face; after the parish's desertion the reason is `'sourceClosed'` and the complex stays; a fixture town with a cathedral keeps the cathedral and its crypt at every village epoch; a later rise past the band resumes the catacomb's growth | C | V-M3 |
| T-V7-44 | rules are data: a scan of V07 §1 and V07 §3 finds no numeric rule constant that is not a `village.json` cell (V07 §2.2, V07 §2.2a), a class row of V07 §2.4 or a cited base, V04 or V11 cell (every reference cell of V07 §2.2a resolving to an existing cell of its unit, and no `village.json` cell copying a value it could reference) — unit words, section pointers and the restated reference constructions' literals excepted by an allow list keyed to row D5 (V07 §2.2a's reference trace), and implementation parameters that change no output (a spatial index's cell size); the item-110 constants of V07 §3.5a, V07 §3.8a and V07 §3.10a included in the scan; `epoch.rows.persistence`'s church keys equal V11 §3.5.1's `church-family` members; the table compile refuses a switch or mode cell of `village.json` marked calibratable (`terrace.enabled`, the `vg.*` switches and `vg.forestMode`, `plate.qualifier`, the `epoch.rows` op, class-list and order cells), and a reference cell so marked, as T-V11-37 refuses V11's | C | V-M1 |
| T-V7-45 | crypts and burial faces: over every parish church built across the village bench, the crypt share lies within the binomial band of 0.1; 0 chapels carry a crypt or a churchyard part; below TOWN 0 catacomb complexes and 0 gallery systems sourced at a burial face; every dossier-bound `graveyard` or `burial_ground` record resolves to exactly one burial face, a churchyard it enlarges holding at least V11's `burial-ground` plot area at its band; a dossier crypt fact gives its church a crypt on 100 %; a church's crypt state is identical before and after a rung change; a `parish_burial_grounds` record binds one member per standing parish church's churchyard, enlarges none, and places a `cemetery` plot only where no church stands | C | V-M2 |
| T-V7-46 | no generation below TOWN (item 110 (b)): across `B-VILLAGE` with a ravine-and-valley set (a dry gorge across a neighbour bearing, mountainous relief), 0 raised parts created by generation, by any router call a village stage makes or by a village epoch at THORP, HAMLET and VILLAGE; with item 110 (b)'s rows on, the output is byte-identical to rows off when no declaration is held; the rung gate is no `village.json` cell (an `editTable` on it is refused) | C | V-M1 |
| T-V7-47 | levelling (V07 §3.8a): on a flat fixture (every platform below `terrace.slopeMin`) 0 retaining walls; on the hilly and mountainous sets, walls only on house-platform edges whose step exceeds `terrace.stepMinCm`; 0 walls on a croft, close, reached ground, green, churchyard, under-deck strip, hinterland face or the district's perimeter; on a cliff-edge village fixture 0 walls on a cliff bank segment, a `cliff` or `sheer` arc or a cliff inside the district, every platform there keeping the shore setback's `cliff` distance from it (V07 §3.8a (2)); the longhouse's byre end downslope on ≥ 95 % where the ground falls > 3 %; every plot's access reaches its door on the ground, by a ramp or by a stair, and every drive crossing a wall is a ramp within grade or F-V-TERRACE is reported; a re-derivation of one plot changes no other plot's walls but a shared one | C, O | V-M1 |
| T-V7-48 | a raised way on a village map (a declared viaduct and aqueduct, and one carried down from a CITY fixture): 0 junctions between VS4's ways and a raised part except its two feet; 0 VS4 ways on a ramp, a stair or a `vault` span's under-deck strip or along the strip, each VS4 way crossing a span under an `open` span within §4.3's clear width, clearance and `squareDeg` (the declared viaduct crossing the populated area with a `vault` span and an `open` span whose soffit is below §2.7's *The clearance* for a `road`); 0 toft yard parts or buildings in the under-deck strip; 0 hinterland faces over a standing support (a support whose `state` is absent or `ruined` is a hole); the palisade abuts each standing support, ramp, stair and `vault` span's arch vault in its band — 0 palisade stretches inside an arch vault's footprint, no gap in the line, on a declared viaduct with a `vault` span in the planned palisade's band — and has 0 gates at supports but a carried-down crossing station's raised gate, kept with its tower carrying the deck (its CITY fixture's viaduct created across the innermost ring at a raised gate); after a support is `cleared` the next derivation makes no obstacle, hole or abutment at it; `N_v` exact before and after the add; after Regenerate (keep) the feet re-join within `raised.endSnapM` or `W_RAMP_STUB` / `W_RAMP_UNJOINED` is reported; the add's dry run shows the count badge; every span over a hinterland face open (the span rule's `country`); an unbroken aqueduct's delivery point counts as a well (no well within 120 m), and after a span is ruined or cleared a well is sited at the next derivation; 0 ends anchored on a raised way | C | V-M3 |
| T-V7-49 | deck plots (V07 §3.10a): every deck plot inside its deck's width and budget, and no deck face buildable below V11's `minPlotDepthM` for its kind; 0 dwellings on a deck generated at village rungs; `N_v` and every toft byte-identical with the deck rows on and off; the pier head's rate within ± 3 s.e. of `deck.headChance` at the fixture's population over 1 000 seeds with a landing; each deck plot falls with its deck and is re-offered when the deck is rebuilt; every deck plot inside the village district or the hinterland pseudo-district | C | V-M3 |
| T-V7-50 | decline: 0 hollow ways on a deck, a ford or a raised part; on a hilly desertion fixture every generated wall persists as a decaying scarp beside its platform, none removed by a re-derivation after its dwelling is cleared; regrowth rebuilds on the platforms first and repairs their walls at the datum | C | V-M3 |
| T-V7-51 | hand-offs: a CITY fixture with a generated aqueduct and a viaduct falls to VILLAGE, and both stand, with their supports and reasons, at every village epoch, declining only by stretch; 0 raised ways created at a TOWN or village-rung epoch; a removed generated way stays removed through the fall, the village epochs and a rise back to CITY; a village's declared raised way crosses the hand-off up held; the old core keeps the house-platform rule at TOWN; a shrunk town's deck plots keep their dwellings | C | V-M3 |
| T-V7-52 | no-op pins (item 110 (f); T110-7's village clause): with every `deck.offer` 0 and `terrace.enabled` false (V11 §3.24.0's switch table) and no raised way declared, `B-VILLAGE` is byte-identical to the pre-110 build; under `VG`, byte-identical to the pre-110 `VG` preset; the suite registers on V12 §3.7.8's engine with its `terrace.enabled` switch, its switch-on shifts following V12 §3.7.6's four bumps | C | V-M1 |
| T-V7-53 | renders: B-ZOOM's role continuity for §8.2's item-110 roles (the retaining wall, the raised way with its piers and channel, the stair and ramp intervals, the tier roles) drawn by the painterly programs (`retaining.wall`, `way.stair`, `way.ramp`, `raised.deck`, `raised.support`, `raised.ruin`, `aqueduct.channel`) and by `ink` at village rungs; every retaining wall draws its low-side shadow and every raised deck its shadow on the surface beneath | C | V-M3 |
| T-V7-54 | editing: each item-110 row of V07 §4.1 (the terrace stroke, `retaining`, `raised` and the aqueduct class, a deck face, the removal) gives the same event from the canvas, the tool API and the skeleton file; a drawn wall, a declared raised way and a placed deck plot survive Regenerate (keep); `walk` with `raised` is bent to the points form with its note; each dry run returns the count badge | C | V-M3 |
| T-V7-55 | performance: the platform levelling ≤ 1 ms at the VILLAGE top; VS4 with a declared raised way within its 4.5 ms; the item-110 edit budgets of V07 §6 | C | V-M3 |
| T-V7-56 | the village rows compile: V11's compile checks T-V11-3, T-V11-4, T-V11-5, T-V11-7 and T-V11-25 pass over every `v.` row of V07 §2.4 (V11's T-V11-0 run over them); every row names one family of V11 §3.4, one template family of V11 §3.6.1 whose template compiles for every band, a `deckOk` list, a `distribution` of the base's enum and a significance; every presence entry names only `PresenceWhen` conditions and a `PLaw`, and the class order has no cycle; every authored row's `to` is a class id, a `#tag` or a feature class of V11 §3.3.3; every supply cell compiles to a `SupplyEdge` whose good is a V11 §3.7.1 id; with a dossier government, its `villageSeat` class stands with at least one member at THORP, HAMLET and VILLAGE on 100 % of fixtures; every `v.` row carries a `label` (T-V11-4's display-cell check), the 25 labels distinct, and each row's `commonness`, compiled by V11 at step 5a, equals its roster share at VILLAGE recomputed from the compiled rows within 0.01 (J-V7.133) | C | V-M2 |
| T-V7-57 | the village's furniture (J-V7.118): across `B-VILLAGE` and the dossier fixtures at every village rung, 0 `statue`, `fountain`, `bandstand` and `monument` pins; every pin placed by a VS8 row (its row recorded in the pin's provenance), 0 by S11's furniture step (its trace); each open space carries at most one centrepiece and, where it carries the market, exactly VS8's stall count (V07 §3.10); 0 pins on a fair field; on the village-history fixture at every village epoch (run on M4's grow path at item 202's call points before M6-E and on V06's runner after): every housed household served by a well, pump or aqueduct delivery point within `pins.wellWithinM` under the coverage row's capacity, every market (a street market included) at VS8's stall count for the epoch's households and a closed market with 0 stalls, a new nucleus's open space with its centrepiece, 0 standing pins moved and 0 removed whose host stands — save step 2's stalls (the surplus as households fall, and a closed market's), an engine-placed centrepiece no one holds that a market cross replaced and a forced pin whose record the dossier removed — every pin whose host face an epoch tombstoned gone in that epoch (step 0), every housed household served after an epoch that took a well with its host or broke an aqueduct's delivery point, a `Roadside Shrine` quarter added at an epoch anchored on a shrine in that epoch and one added by an absorb anchored at the next village epoch, each new host's row pin (a cross, trough, maypole or centrepiece) the one a regeneration of the grown village places on that host; after the hand-off up the green made the market carries its stalls; after the hand-off down a shrunk town's standing statues, fountains and bandstands stand unchanged and no new one appears | C | V-M1 (the fair-field clause at V-M2; the village-history clause at V-M3) |
| T-V7-58 | item 111 at village rungs (T111-1 – T111-5's village clauses): on the arid set the share of households within `pins.wellWithinM` of water exceeds the non-arid baseline; an oasis stands only on an arid site unless drawn (T2 `ground`) or given by `oasis_water`; arid sites still draw rivers, ponds and coasts at the arid row's re-weighted shares (a rate `StatBarSpec` per water kind); the richest band's mean distance to reliable water below the middle band's on arid seeds; the density's `wp` term leans the dwellings toward reliable water on arid seeds (their mean `pw` above the box's); an oasis village's heart, `site water` test and wells read the oasis as water, its spring never a well access, its shore a barrier the palisade never fences; with the oasis chance, `w_water` and the climate cell at their neutral values the output is byte-identical to the build before item 111 (a `NoOpPin` — the `item111.water` registration of the village goldens on V12 §3.7.8's engine (V12 §2.13), written by the V-M1 seat) | C, O | V-M1 (the dossier clause at V-M2) |
| T-V7-59 | item 113 at village rungs (the village halves of T113-1 and T113-3, and T114-9's village clause; run on V06's replay engine): a CITY-to-VILLAGE history fixture shows walls and street lines beyond the village's fabric, hollow ways on the old streets, an oversized church and a kept market square, with a `VillagePlan` created at the replay's hand-off down epoch and the dossier's present population and institutions matched exactly; a symbolic-peak fixture (a village with a ruined "City walls and gates" record) sizes its remnants inside CITY's range at `history.symbolicQuantile`, each remnant fact `symbolic`, and a fixture with no evidence has no peak; a refounded-village fixture over a ruined town reuses the old roads (the share of new way length within `refound.traceReachM` of a ruined way trace above the same site's unrefounded baseline), rebuilds its ruined bridges where its trackers cross, crosses the ruined wall only at gate gaps and breaches save a through road's cut (the run set `dismantled` over its width, V07 §3.12a (4) (d)), with 0 violations of §5.3's wall-crossing row (T114-9), and races slots over ruined footprints above their random baseline; a former city buried past `history.burialYears` lies under the village as V04's buried former settlement in maintenance mode, a former hamlet's refounding lays none; the replay is byte-stable per seed and history on the five engines; with the replay off the output is byte-identical (a `NoOpPin` — the `item113.history` registration of the village goldens on V12 §3.7.8's engine (V12 §2.13), written by the V-M3 seat) | C, O | V-M3 (with M6-E) |
| T-V7-60 | the edge suite (V07 §3.17): each clause runs its V07 §3.17 rows on their edge fixtures at THORP (P = 1, 40), HAMLET, VILLAGE (P = 1 499), under `VG` and each switch off, and through save, load, undo, redo, regenerate and migrate — each case ending in its row's defined outcome and reported rung, with 0 crashes, 0 hangs, 0 lost records, 0 whole-map retries and 0 silent changes (every changed output named in the report). The clauses: **(a)** the records, the request block and the pipeline; **(b)** S0, VS1 and VS2; **(c)** VS3, VS4 and the raised way; **(d)** the open space, VS5, VS6 and levelling; **(e)** the hinterland, the wharf, ends and pins, and deck plots; **(f)** the dossier readings, the epochs and hand-offs, and the failure ladders; **(g)** the underground; **(h)** editing, the clerk, rendering, labels and exports, Find and the crisis looks; **(i)** every combination row of V07 §3.17 (b). (Determinism's row is T-V7-18's, the one-time waits' T-V7-67's.) | C | (a), (b), (d) at V-M1, (a)'s landmark-part clause at V-M2; (c) at V-M1, its raised-way row at V-M3; (e) at V-M2, its deck-plot row at V-M3; (f) at V-M2, its epoch and hand-off row at V-M3; (g) at V-M2u; (h) at V-M3; (i) each row at the later milestone of the two mechanisms it joins |
| T-V7-61 | the village `WhyProvider` (item 270's completeness test over V10 §3.9's owed kinds for V07): a `why` on every `VillagePlan`, `VillageField` and `VillageEnd` of the bench answers in both modes with at least one row whose key resolves in V09 §4.9's catalogue (`info.village.*`, V07 §4.5); the heart's terms recomputed equal VS1's recorded score; a `dossier`-sourced form and an `edit`-sourced heart answer with their sources; a superseded plan answers with its superseded line; the provider reads committed records only (a pending proposal changes no answer) | C | V-M3 |
| T-V7-62 | item 114 at village rungs (item 114 (g)'s village clauses; takes T114-1 – T114-8's village clauses): a poor, threatened palisade fixture shows patched runs in its kind's `walls.patchMaterials` rows (V11 §3.25.3), each drawn by its row's `look` role, and no robust rebuild; a rich, threatened one rebuilds its breached runs robust; a safe one wears through `worn` to `breached`; recovery replaces patches oldest first; no run changes condition without a sustained driver (no flicker across two epochs at a threshold); every state distinguishable in greyscale at its bands; a dossier village's generation-time conditions follow its readiness and wealth by §7.7's DR41; `VG` draws every run standing; with need and means at neutral values the existing neglect and repair behaviour is reproduced (a `NoOpPin` — the `item114.condition` registration of the palisade goldens on V12 §3.7.8's engine (V12 §2.13), written by the V-M2 seat); a patched run exports as a wall and a breached one as an opening; `repairWall` with a material is undone by its inverse | C, O | V-M2 (generation), V-M3 (epochs, with M6-E) |
| T-V7-63 | item 115 at village rungs (item 115 (f)'s village clauses; takes T115-1 – T115-4's village clauses): rich THORP, HAMLET and VILLAGE fixtures at the wealth maximum have no `H`, `U`, court, tower or turret dwelling but the manor; at most one manor, only with a lord or when specified (V08 §3.16 (3); none at THORP and HAMLET otherwise); a dossier-specified grand building — a manor record, and at a HAMLET a `castle` or `tower_house` record, a town class playing itself (V07 §3.11 step 3) — and a hand-placed manor keep their design, the clerk noting the excess; a village grown into a town builds its new grand buildings from that epoch, a shrunk town keeps its grand buildings as they stand; the manor count never rises with wealth (a wealth sweep at a fixed population and government leaves it unchanged); with every `grandeur.ceiling` row's `enabled` false (V11 §3.24.0's off form) `B-VILLAGE` is byte-identical to the build before item 115 — the `item115.off` registration of the village goldens on V12 §3.7.8's engine (V12 §2.13), written by the V-M2 seat (T115-4) | C | V-M2 (the class mix, the manor rule and the `item115.off` pin); the composition clause with V02's M6 (`notApplicable` before) |
| T-V7-64 | item 116 at village rungs (takes T116-1 – T116-4's village clauses): at THORP (P = 1, 40), HAMLET and VILLAGE (P = 1 499) the zoom-out limit shows the whole territory frame with one stop of margin and no stop beyond it is reachable in the view; the pyramid draws every stop from the limit inward and none beyond; the first view unchanged; an epoch that grows the frame moves the limit; an export frames within it | C | V-M3 |
| T-V7-65 | item 117 at village rungs (item 117 (i)'s village clauses, (f2) included; takes T117-1 – T117-8's village clauses): the same village document hashes identically in all 52 weeks — the `item117.season` registration of the village goldens on V12 §3.7.8's engine (V12 §2.13), written by the V-M3 seat; every village surface (each great field by its slot, the strips, orchards, meadow, commons, green, gardens, ponds, the moat, the leat, the stream) has a season row in every week of every climate with no gap; an arid fixture never draws ice or snow; a cold fixture freezes the ponds and the moat before the leat's slow reach and the leat before the stream, and keeps open water at the mill race, the leat's take-off and springs; stooks only in the harvest weeks; in autumn a wood's rim crowns take several colours (their count per wood above a floor), the leaf cover's density non-decreasing through the leaf-fall weeks on the green, lanes, tofts, churchyard and roofs; a dossier village opens on its present week (its latest stamped tick), one with no stamped tick on the season control's midsummer; each week's look passes the contrast and colour-blind checks (item 112) | C | V-M3 |
| T-V7-66 | item 118 at village rungs (item 118 (h)'s village clauses; takes T118-1 – T118-6's village clauses): the same document hashes identically with decorations on and off and in every week; a festival shows exactly in its window's weeks; the same festival draws identically across views and exports (byte-stable tiles per seed); a THORP fixture shows only a garland or a bonfire at the heart, a HAMLET a maypole or a bonfire on the green and door garlands, a VILLAGE a maypole, church-lane bunting and the green's stalls and tables — no larger tier's kinds; staging lands on the named or keyed village place of §8.2's place table, else its kind's fallback; nothing blocks a gate or covers a label's keep-out; with no traditions and no preview, byte-identical (a `NoOpPin` — the `item118.festival` registration of the village goldens on V12 §3.7.8's engine (V12 §2.13), written by the V-M3 seat) | C | V-M3 (the dossier-window clause with V08's reading of `traditions`) |
| T-V7-67 | the one-time waits (item 119 (f)'s village clauses; takes T119-2 – T119-4's village clauses): on §12.1's reference machine, at THORP (P = 1, 40), HAMLET and VILLAGE (P = 1 499), each on its largest frame, generate, regenerate, opening a map from SettlementForge (the small-dossier fixtures), a dossier change applied, an epoch and the history replay (V07 §3.12a's fixture; each timed as V06's part of item 119 times it), every export format and a migration each complete within 10 s from the click to the complete result; every wait past 1 s shows V09 §4.21.9's progress, never an empty screen; every step slower than its §12 or V07 §6 target has its `perf.qualitySpend` row with its recorded gain (0 rows and 0 slower steps at shipping); V07 §6's edit and switch budgets and §12.5's frame budgets hold unchanged | C | V-M3 |
| T-V7-68 | Find at the village rungs (item 120 (k)'s village clauses; takes T120-1's and T120-4's village clauses): on THORP (P = 1, 40), HAMLET and VILLAGE (P = 1 499) fixtures, with and without a dossier, the document hashes identically with Find on and off and turning every chip off restores byte-identical tiles — the `item120.find` registration of the village goldens on V12 §3.7.8's engine (V12 §2.13), written by the V-M3 seat; each chip's matches equal the gazetteer query's rows at the key — the `v.` classes by their labels and synonyms (a "farms" chip holding the village's farmsteads and the outlying ones), the dossier's names, the village, the ends, the field groups and V07 §5.3's places — and the list offers nothing the village lacks; Show gaps outlines exactly the ends (with one end or none, the village) holding no member of the chip's class and never a class its row sites outside the perimeter; at the township view every match has a pin or a count bubble; an epoch that opens a smithy lights it and one that closes its use darkens it in that commit; an end's chip reads 0 after the hand-off up and lights again after the hand-off down; under a player view the knowledge canary (T-V9-66's fixture read at a village rung) surfaces in no suggestion, count, glow or pin; the chips survive every band and layer change, a village epoch and an undo; at a scrubbed week whose frame is not the head, on a VILLAGE fixture whose later epoch opened a smithy, closed another's use and merged two ends, each chip's matches, the ends listed and Show gaps' units equal §11.2's listing at that week, re-evaluated within 100 ms of that frame being drawn, and the head's are back at the head; suggestions within 50 ms and a chip's glow within 100 ms at the VILLAGE top | C | the later of V-M3 and M5 (Find's milestone; risk (13)); its scrubbed-week clause at the latest of V-M3, M5 and V06's E6 (V06 §3.15.2's frames) |
| T-V7-69 | item 122 at village rungs (item 122 (g)'s village clauses; takes T122-5's and T122-6's village clauses): on THORP (P = 1, 40), HAMLET and VILLAGE (P = 1 499) fixtures — with and without a palisade (one closing only by barrier arcs among them), a green, a market, an entry, an outlying farmstead, an arable field and an end — each look kind previewed at severity 0, 0.5 and 1 and, from M-SF, a dossier fixture carrying each mapped condition, among them a disaster whose rebuild Works begin on some of an end's buildings inside its weeks: **(a)** each look's extent lies within its rung's `scale` cell, linear in severity, a camp the dossier sizes taking `areaPerHeadM2` × its heads within 10 %, and no siege at THORP or HAMLET draws a trench or earthwork line (T122-5); **(b)** 0 look elements on water, in a gate's passage (a palisade gate's opening and 4 m along its way each side) or over a label's keep-out, and no camp on the green or on a plot — a toft, a close, a croft, a plot of DR18's clusters (T122-6); **(c)** a disaster ruins whole units of `villageDisasterUnits` — the ends, or the toft groups of a village with no end — each unit's `DisasterUnit` fields as V07 §5.6 (3) reads them, the calamity's matched targets first, every building the look stands over (§10.2 (f): a building of a returned unit until V06 §3.22 (3)'s `crisisLookYields` turns true on it, a preview never handing over) drawing the ruined look, a building of a returned unit whose rebuild Works begin in the condition's weeks drawing its Works from that week, and none outside; a look scaled as a share of its place's n units at share s takes round(s × n) clamped to [1, n] where s is above 0 — a disaster's units the first max(k, \|`matched`\|) of its order, k that count, or all of a shorter fire order (V01 §3.16 (5)) — on a VILLAGE fixture whose calamity names more ends than k (every named end struck) and on a fire whose order ends before k (the shortfall reported); **(d)** each place reads as V07 §5.6 (2) states: a siege of a village with no walled stretch draws the blockade on its entries' ways, a palisaded one its camps beyond the walled stretches and its engines facing the weakest runs, then the gates; beast's torn sections only on a standing palisade, else watch-fires along the perimeter; famine bares every arable face, the meadow and the commons, its pens empty and the market's stalls shuttered; raiders burn the outermost outlying farmsteads, else the farm tofts farthest from the heart; the refugee camp on `campLand` by the main approach road's gate; the quarantine's marked doors and cordon in one unit of V07 §5.6 (3); **(e)** the answer to a `why` carrying the view (`opts.view`; §11.2's view-bound `why`) on an end of a disaster look's units and on a field a famine look leaves bare carries `info.crisis.ruinedFor` while the look stands at the viewer's key, and none otherwise, an end every building of which has begun its rebuild's Works (the look standing over none of them, its `ruinTone` gone) among the none, a `why` without a view included; **(f)** an epoch, an edit or a hand-off that changes the ends re-derives the units in that commit, a look over a hand-off reads the rung in force, and under `VG` no look draws | C | V-M3 (the previews and the readings); the dossier clauses with V08's reading at M-SF; the disaster clause at the later of V-M3 and M5 (V01's `disasterSource`), the refugee camp's frontier clause at the later of V-M3 and M6-E (V06's `frontierFor`) (risk (14)) |

**Parity metrics** read from `baselines.json`'s VG rows (item 495; `referenceBuild` 19365073 = VG 1.6.9, §13.5's stamp),
generated research-side from the existing recordings (`captures/village/*`, `research/findings/profile-village.md` §3.3, §5 and
its addenda N1–N5): dwellings per village by tag set, the accepted share of frontage draws, the square's rim radius, trackers
per village (4–11) and steps per village (≈ 200), bridges and piers per water map, the palisade's kept lattice points (13–20)
and the model time per stage — V12's `vg.*` family, each metric `vg.<name>` (the accepted share `vg.acceptedShare`, the one a
register entry names, V07 §3.15). The village's panels are `PanelSpec`s on V12 §3.9's engine, their `D5Pair` variants V12's and
their reference rows `Baseline` rows of input `counts` or `geo` under V12's `'VG'` reference.

**Goldens and the one-time shift** (item 110; a legitimate change of outputs is stated, never silent). The village goldens are
re-recorded once, with the terrace and deck rows on, and item 110 is stated as the cause beside them: hilly and mountainous
fixtures gain house-platform walls and their stairs and ramps, fixtures with a landing and a pier gain pier heads at
`deck.headChance`'s rate; T-V7-52 pins that nothing else moved. Items 111 (the water pull at its temperate weight), 115 (the
manor rule) and the derived area per head (V07 §3.9 (1); the territory 1.1 % smaller) are stated the same way when their changes land: the goldens re-recorded
once each, the cause named beside them, their no-op pins (T-V7-58) and T-V7-11's clause pinning that nothing else moved.
=== END ===

=== REPLACE ## 8 Build plan ===
## 8 Build plan

The village product is built on the finished base in J122's order (`docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md`; §16's
staged table and INDEX §4 carry the same slot): **V-M0, the tracker spike, right after M0**, on M0's kernel, M0 (b)'s tables and
its own fixtures (synthetic flat, river and coast sites and its own frontage slotting; no M2b input), beside M1; **V-M1 – V-M4
after M4**, in parallel with M5 (different packages, no shared file), needing S1, the plot model and the one solver (M2b), the
relief tier (M2b), item 101's tools and the port's absorb half (M3a) and the epoch path (M4); V-M3's clauses that run V06's
steps exit with M6-E's E2–E4 (V07 §1 (14)); **V-M2u after M6-U's tail** (V04). Its milestones:

| milestone | content | exit (executed) | est. (pw) |
|---|---|---|---|
| **V-M0 — the tracker spike** | VS2 + VS3 + VS4 + the slot race on flat, river and coast sites at the VILLAGE target, headless, on the spike's own fixtures; `village.json` whole — its three rung rows, every column of V07 §2.2 and V07 §2.2a — with its register entries (*The register at the exits*, below); the `VG` preset file (item 377): V07 §3.15's `VG` column and switches, V11's five `presets.VG` entries written by V11 §2.2's rule, and the `presets.VG` entry of every `presetsRequired` cell of a table a village stage reads, from V07 §3.15's list and rule; the source manifest's `productStages.village` from V07 §3.0's stage set, conditional registrations included (V11 §3.2.1 step 1) | 0 whole-map retries on 1 000 seeds; VS2 + VS4 ≤ 8 ms at VILLAGE; under `VG` the road-topology shares within ± 5 % of VG's roll; the legibility check of risk (1) below on 20 renders; V11 §3.2.1 step 4's preset check green with the `VG` file shipped; `plat calibrate register --check` green over the cells it lands | 1.25–1.75 |
| **V-M1 — the village core** | `@plat/village`; the `ProductDecl` (with `extraInputs`) and the ladder rows; the anchor law and the typed rule cells (their readers; the table's rows shipped whole at V-M0); S0's village draws with item 111's arid water weights and the oasis reading; the course-first river; VS1 with S3's jobs (border, lattice, destinations, L0 ponds) and the daylight sweeps; VS2 with item 111's water pull; VS3–VS6 and VS8 in the village writer order; the `toft` plot strategy; the `VG` request mapping; the palisade's barrier closure and graded stretches (item 106); the `painterly` family's ground, water, ways (with the edge fade and bridge shadows), palisade, spotlight (focus and size) and building programs (roof faces, palette, ruin) at the city and district bands; labels; `B-VILLAGE` in CI; item 110's levelling at village rungs (V07 §3.8a) and the router's rung gate (V07 §3.5), once the base's item 110 has landed (its M3a) | T-V7-1 – T-V7-9, T-V7-17's block clause, T-V7-18, T-V7-24, T-V7-28, T-V7-31, T-V7-41, T-V7-44, T-V7-46, T-V7-47, T-V7-52, T-V7-57 (its fair-field clause at V-M2), T-V7-58, T-V7-60's V-M1 clauses; `plat calibrate register --check` green over the cells it lands | 9–11.25 |
| **V-M2 — institutions, fields and dossiers** | V07 §2.4's class rows and templates with the presence laws, the crypt cells and the burial faces; items 103, 104, 105, 107 and 108 at village rungs (the supply, balance, spacing and ladder rows, the placement order, the entry store); item 115's grandeur ceiling in the class mix and the manor's rule; the three field presets, great fields, meadow, commons, woods (with the request's forest and the `VG` forest modes), outlying farms (`N_o`) and decorations; the port's consultation of `LadderRouter` (V08 §3.10; item 202), the village DR rows in the resolution order with the burial, mill and residential readings, the chains and the ladder records, the market and harbour readings with the market halls' claims, the fair field and `rules.claimArea`, VS8's pin-record rule and the records placement `village.records` (`place`, with item 4's REPLACEMENT greaters, and `remove`, keyed by the dossier event's `seq`) with `village.outsidePlot`, called on the absorb path without an epoch, and the product registration's hooks that call it — `ProductDecl.records`, the *One path* placement's and §7.7 item 2's removal's calls, and the dossier step's call on M4's grow path (item 202; J-V7.128 – J-V7.132); item 114's generation-time palisade conditions and patch rows; the small-dossier fixtures | T-V7-2's dossier clause, T-V7-6's dossier clause, T-V7-10 – T-V7-13, T-V7-19 – T-V7-21, T-V7-33 – T-V7-36 (T-V7-35's promotion clause at V-M3), T-V7-42, T-V7-45, T-V7-56, T-V7-58's dossier clause, T-V7-62's generation clause, T-V7-63's class-mix clause, T-V7-60's V-M2 clauses; `plat calibrate register --check` green over the cells it lands | 7.5–10.75 |
| **V-M2u — the underground under a village** (after V04's tail milestone) | the registration of V04's tail at the village subset, with the source manifest's `productStages.village` gaining its stage ids (V11 §3.2.1 step 1) and, in the same change, the `presets.VG` entry of every `presetsRequired` cell of a table that registration makes village-read, by V07 §3.15's rule; the village dig rows, the well and mine-working readings, the ruin marker's site, dwellings after access; the growth draws at epochs wired to V07 §3.12 | T-V7-38 – T-V7-40, T-V7-60 (g); V11 §3.2.1 step 4's preset check green under `VG`, T-V11-9's equality of `villagePresetCells` with V07 §3.15's list included; `plat calibrate register --check` green over the cells it lands | 1–1.5 |
| **V-M3 — editing, time and output** | V07 §4's tool forms, events and locality rows (the lassoed ends with the count badge, the wall tool's barrier snapping and its repair material, the declared split, the form-edit bend); the epoch phases, desertion with the hollow ways and house platforms as records, the ladder steps and the palisade's replacement; the markets, halls and the fair over epochs (V07 §3.12) with the dossier step's call of `village.records` (built at V-M2), `village.outsidePlot` from V06 §3.9.6 and the siting step (m), and the pins over epochs (`village.pins`), these grow-path parts on M4's grow path at item 202's call points (V-M2) until V06's engine carries them — V-M3's clauses that run V06's steps exiting with M6-E (risk (10)); both hand-offs with the band, the one revived plan, the old core's fabric participants, the catacomb step and the maintenance mode; item 113's village part (V07 §3.12a) on V06's replay; item 114's epochs and condition looks; `painterly` at the neighbourhood band with the crown bands and group shade; the night view; the village through the year and its festivals (items 117, 118); the township view at the zoom-out limit (item 116); exports; the village `WhyProvider`; item 110's village parts — the raised way on a village map (V07 §3.5a), deck plots and the pier head (V07 §3.10a), the decline rows, the hand-offs' item-110 state, the painterly item-110 programs and the item-110 edit rows; item 119's one-time waits (V07 §6); Find at the village rungs (item 120; V07 §5.5); the crisis looks at the village rungs (item 122; V07 §5.6: the places' village readings, `villageDisasterUnits`, the crisis lines); the edge suite's V-M3 clauses | T-V7-13's village-history clause, T-V7-57's village-history clause, T-V7-14 – T-V7-17, T-V7-22, T-V7-25 – T-V7-27, T-V7-30, T-V7-32, T-V7-35's promotion clause, T-V7-37, T-V7-43, T-V7-48 – T-V7-51, T-V7-53 – T-V7-55, T-V7-59, T-V7-60's V-M3 clauses, T-V7-61, T-V7-62's epoch clause, T-V7-64 – T-V7-67, T-V7-68 at the later of V-M3's exit and M5's (Find's milestone; its scrubbed-week clause at the latest of V-M3's, M5's and V06's E6's, V06 §3.15.2's frames), T-V7-69 (its dossier clauses at M-SF, its disaster and camp clauses as its row states) — the clauses that run V06's steps (T-V7-16, T-V7-30, T-V7-50's desertion clause, T-V7-35's promotion clause over epochs, T-V7-51, T-V7-59, T-V7-62's epoch clause) at V-M3's exit where M6-E's E2–E4 have landed, else at the first V07 exit after E4 (risk (10)); `plat calibrate register --check` green over the cells it lands | 9.75–14.75 |
| **V-M4 — parity and the owner's panel** | `baselines.json`'s VG rows; T-V7-23 under `VG`; the one `reference` run on `rules.race.densityPower@VG` (risk (2); register entry `cal.village.*.rules.race.densityPower@VG`, V07 §3.15), only if T-V7-23's accepted-share row misses its band; the D-5 panel against VG | T-V7-23; T-V7-29 rated or accepted; `plat calibrate register --check` green over the cells it lands | 2–3 |
| **total** | | | **30.5–43** |

The total is the product's own 26.5–36.5 pw plus the parts of items 111–120 and 122 routed here (item 111 at V-M1, + 0.25–0.5;
items 114 and 115 at V-M2, + 0.5–0.75; at V-M3 item 113's village part + 0.75–1.25, item 114's epochs and looks + 0.25–0.5,
items 117 and 118 + 1–1.5, item 116 inside §8.8's limit + 0.25, the `WhyProvider` and the edge suite + 0.25–0.5, item 119's
one-time waits + 0.25, item 120's Find at the village rungs + 0.25–0.5, item 122's crisis looks at the village rungs
+ 0.25–0.5); §16's village line and INDEX §1 carry it (item 568 computes the totals once).

**The register at the exits** (J-V7.124). Every milestone above that lands a registry table of this volume, or a
calibratable column of one, exits with "`plat calibrate register --check` green over the cells it lands — their entries from
V12 §3.11's default line (`plat calibrate register --defaults --milestone <id>`, the landing change's id in V12 §2.8's
volume-qualified form: `V-M0` – `V-M4`, `V-M2u`) unless this volume's own line names the column". The lint runs at PR tier
from M1 (T-V12-20), so the change that lands a column carries its entry, never a later change (V12 §3.11). The entries follow a
table's first rows, not its first compile: every registry row compiles from C0 as its schema's empty table (V11 §2.1's
empty-table rule, J-V11.84), and `--defaults` writes an entry only for a column that holds a compiled cell (V12 §3.11,
J-V12.73); so a table or column that first ships rows in an earlier milestone than planned below takes its entries there, the
check failing that milestone otherwise. Every entry the default line writes here is due at M-CAL (V12 §3.11), which opens only
after V-M4 has exited (V12 §3.10.1), so each falls due after the milestone that writes it. The landing seat writes the named
entry first, then runs `--defaults` for the rest (V12 §3.11's order). Keys, switches, modes, reference cells and
`rules.ladders.ranges` take no entry (`calibratable: false`; V07 §2.2, V07 §2.2a, J-V7.114, J-V7.121), the derived territory per
head is no column (its farm rows are the base's `FarmTable` cells), and a `VG` entry passes by its `ref:VG` provenance or
its `fixed:` note (V07 §3.15), save the one named below. The rows this volume adds to other tables — the village rows of
`ladder.json` (item 201), of §4.3's width table (item 292) and of §4.9's farm table (item 314), V07 §2.4's `v.` rows of
`roster.classes`, the supply, balance, spacing and ladder rows of V11's tables, V02's `composition.classFamily` rows and V04's
dig rows — take no entry: a column entry's `rows` is absent, so it binds every row, and those columns were bound when their
owners landed them. This volume writes no register line of its own (J-V7.124). As planned:

| milestone | first ships rows here — holds a compiled cell (registry row) | each column's entry from |
|---|---|---|
| V-M0 | `village.json` (61), every column of V07 §2.2 and V07 §2.2a: its three rung rows are written whole with the `VG` preset file, whose entries sit on cells of both (V07 §3.15) | `rules.race.densityPower`'s `VG` entry: the named `cal.village.*.rules.race.densityPower@VG` (method `tune`, due V-M4; V07 §3.15), written first; every other calibratable column by the default line (owner `V07`, the table's rows home), `rules.race.densityPower`'s default value among them — a cell's default and its `VG` entry are two knobs, told apart by `preset` (V12 §2.6) |
| V-M1 | none: the typed rule cells' readers read the rows V-M0 shipped, and its village rows of `ladder.json`, the width table and the farm table add rows only | — (the check runs and is green) |
| V-M2 | the `presence` column of `roster.classes` (17; item 576 (a)), whose first cells are V07 §2.4's `v.` rows: its law anchors are numbers and calibratable (`own`; §12), the column's flag as this volume types it | the default line |
| V-M2u | none: the dig rows are rows of V04's tables (landed at V04's U3b), the well and mine-working readings `village.json`'s cells (V-M0) | — (the check runs and is green) |
| V-M3 | none: the epoch rows and the `handoff`, `raised`, `deck` and `refound` cells are `village.json`'s (V-M0) | — (the check runs and is green) |
| V-M4 | none; `cal.village.*.rules.race.densityPower@VG` falls due, its history row and status by V12 §3.11's milestone exits (V07 §3.15) | — |

**Risks and spikes, in order.** (1) **Legibility at the VILLAGE top** — VG's trackers make 5–60 houses; a 1 500-person village
has ≈ 300 dwellings, and a walk-grown network may tangle. Spike: V-M0's 20 renders at 1 400 people, judged against the
figure-ground metrics of §8.5. *Pre-decided fallback:* above 800 people the tracker branch spacing takes the `nucleated` law and
faces larger than 4 ha inside the perimeter get the base's bent-cut lanes (S8's `BentCutFabric` on those faces only, registered
for the village district by `fabricParams`), re-measured. (2) **The exact-count race's look against VG's independent
acceptances** — measured by T-V7-23's accepted-share row and the V-M4 panel; *fallback:* the race draws its keys from a density
raised to a power fitted so the built share per density band matches VG's — the cell `rules.race.densityPower`, whose `VG` entry
the one `reference` run at V-M4 fits, the default staying 1 (J-V7.119). (3) **Content** — the class rows and templates of V07
§2.4 are ours to author (≈ 1.5 pw inside V-M2), with V11's rows cited. (4) **The `painterly` family** — reserved and never built
in the base; its programs at build depth (the roof faces, palette and ruin, the edge fade, bridge shadows, crown bands and group
shade, the spotlight's modes, the condition looks, the season and festival rows) are priced inside V-M1 and V-M3 (≈ 3–4 pw).
(5) **The hand-offs' coherence** — the epoch fixtures T-V7-14 and T-V7-15 run from V-M3's first week. (6) **File g's base
mechanisms** — the barrier closure, the supply web, the balance profile and the ladder table are the base's; *pre-decided
fallback:* if the barrier closure has not landed when V-M1 starts, V-M1 ships the palisade with VG's water cut (`closure:
'shore'`) and T-V7-31 moves to V-M2's exit; if the web or the ladder table has not landed by V-M2, those bars move to V-M3 and
V-M2 exits on the rest. (7) **V04's tail** — V-M2u registers V04's stages and cannot start before V04's tail milestone;
*pre-decided fallback:* until it lands the village ships with no cavern or ruin (the author's dug passage stays, item 66), T-V7-38
– T-V7-40 move to the first milestone after V04's, and V07 §3.12's hand-off down keeps a shrunk town's underground records
untouched and unregistered (read-only, drawn, never re-derived) until the maintenance mode exists. (8) **The base's item 110** —
the levelling, the ground parts from 1 and the deck plots are the base's (M3a); *pre-decided fallback:* if the base's item 110
has not landed when V-M1 starts, V-M1 ships with the terrace, raised-way and deck rows off (T-V7-52's state) and T-V7-46 and
T-V7-47 move to V-M3's exit; if V04's arch-vault source or V06's raised-way decline has not landed by V-M3, a raised way on a
village map stands with open spans and without decline, reported, and the clauses of T-V7-48 and T-V7-51 that read them move to
the first milestone after theirs. (9) **The registration's hooks** — `ProductDecl.records`, its calls on both paths, the phase
overrides and the participants on M4's grow path are item 202's; *pre-decided fallback:* V-M2 builds the village's side against
item 202's text, the base's side landing with it in the same milestone; if the base's side is not in place when V-M2 exits,
T-V7-13's absorb clause and its village-history clause move to V-M3's exit and a record at a village rung is reported as placed
by S10b's request until then. (10) **A village epoch on the grow path before M6-E** — the grow path runs V-M3's grow-path parts
at item 202's call points but none of V06's steps; *pre-decided fallback:* such an epoch strikes no way (no hollow way until
E2), applies a ladder step or a walls record the epoch carries by the base's dossier step as V07 §3.11's absorb half applies it
(member #1 kept where the greater's thing is the lesser's, the rest by S10b's `dossier` request; the palisade's REPLACEMENT;
V08 §3.5.1 (c), (d)'s bindings), and leaves a claim-sized roster member waiting in its deficit, each reported in the epoch
event's generation report (§5.4); T-V7-16, T-V7-30, T-V7-50's desertion clause, T-V7-35's promotion clause over epochs and
T-V7-51 then exit at the first V07 exit after E4, priced inside V-M3's range. (11) **Item 113's replay** runs on V06's engine
(M6-E); *pre-decided fallback:* until it lands a village is generated at its present (the replay off, as §4.11 (7) states) and
T-V7-59 exits at the first V07 exit after M6-E's replay. (12) **The season, festival and zoom-limit rows** are §8.2's
and §8.8 rows and V11's tables (items 116–118); *pre-decided fallback:* if they have not landed by V-M3, the village draws its
one default season (midsummer) with no decorations and the base's zoom-out range, and T-V7-64 – T-V7-66 exit at the first V07
exit after them. (13) **Find** (item 120) is V09's panel and `live.find` overlay over §11.2's gazetteer and §8.2's rows,
landing at M5 (Find's milestone, with V01's area and gap services); *pre-decided fallback:* if M5 has not exited when V-M3
does, the village's readings (V07 §5.5) ship as the gazetteer's rows and area targets alone, and T-V7-68 exits with M5's
exit; its scrubbed-week clause reads V06 §3.15.2's history frames and exits at the latest of V-M3, M5 and V06's E6. (14)
**The crisis looks** (item 122) are §8.2's `live.crises` over §10.2's table (M3b) and V11's rows, the conditions'
`crisis.map` rows with V08's reading (M-SF), V01's `campLand` (M3b) and `disasterSource` (M5) and V06's `frontierFor` (M6-E);
*pre-decided fallback:* the village's readings (V07 §5.6) and `villageDisasterUnits` ship at V-M3, exercised by previews, and a
clause of T-V7-69 whose service has not landed exits at the first V07 exit after it.
=== END ===
