# Seam check: the underground (V04) and the sky (V05) against the neighbourhoods they carry or shadow (V01) — round 6

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-layers-r6; covered by the whole-design retrovalidation (J84).

PROGRESS
- §0 Method and inputs (files, md5, lines) | done
- §1 Re-check of round 5's SLR5-01..06 (each: FIXED / PARTLY / NOT FIXED, with the text now) | done
- §2 Seam census, round 6 (every piece crossing V04/V05 <-> V01 and the base sections they share) | done
- §3 New findings (SLR6-01 onward), severity, owner, required change | done
- §4 Disposition summary by owning volume; CONFIRMED versus PLAUSIBLE | done

## 0 Method and inputs

Lane `volumes/seam-layers-r6`, 2026-09-29, reconciliation round 6. No earlier file or LANDED line existed for this lane
key, so the round started fresh. Its inputs are the files as the round-6 reconcile lanes left them:
- `docs/volumes/V04-underground.md` — 4 160 lines, md5 9cae4284… (`reconcile-V04-r6` LANDED 13:52).
- `docs/volumes/V05-sky.md` — 3 808 lines, 663afd43… (`reconcile-V05-r6` LANDED 13:56).
- `docs/volumes/V01-neighbourhoods.md` — 4 454 lines, 85b488b3… (`reconcile-V01-r6` LANDED 13:53).
- `docs/volumes/_integrate.md` — 468 lines, 965ab696…, unchanged since round 4.
- `docs/AMENDMENTS-2026-09-28f.md` — 1 806 lines, 839ccce5… (`reconcile-BASE-F-r6` LANDED 14:03).
- The base, `docs/ARCHITECTURE.md` — md5 01fea21f…, unchanged since round 0. Read where the round-6 texts cite it:
  §6.3's carry-over and its one collision rule, §7.4's `editTable` / `editPreset` lifecycle row, and §7.6 whole (for the
  undo row V04 cites).
- `docs/volumes/V03-interiors.md` at eb01b7dc… (3 852 lines), for the crypt hand-off only (SLR6-01): 3.7.4 whole with
  *A stair-entered crypt*, §8's PE row, T-V3-23 (j), and §12's and §13's round-6 entries.
- `docs/volumes/V06-evolution.md` at 412a7418… (4 622 lines), for census rows 83 and 103: V6 §6.2's `sky.islands` row
  and century paragraph, and the whole round-6 diff against `rcV6r6/V06-pre-r6.md` (560a8699…), grepped for the seam's
  terms.
- `docs/volumes/critique/seam-layers-r5.md` — read whole first (md5 bd1e26af…, unchanged since its 13:28 landing).
- The lane events log's round-6 lines for these files, and three notes addressed to this seam or to volume 4's next lane:
  `reconcile-BASE-F-r6`'s hand-off (1) (14:03), `reconcile-V03-r6`'s hand-off list (13:59) and `reconcile-V11-r6`'s
  note for the next V04 lane (14:18).

Every input's md5 was checked again before this file was written, and none had moved.

**What was read, and how (J-SL6.1).** Round 5's inputs survive as the round-6 lanes' backups, each checked by md5:
`scratchpad/volumes/rcV4r6/V04.before.md` 27bdbbd7…, `rcV5r6/V05-pre-r6.md` 5d0a101c…, `rcV1r6/V01-pre.md` 15a69be1… and
`rcBFr6/f-pre-r6.md` e4c1756e… — each equal to the md5 round 5 read. This round read:
- **every changed line whole**, as diffs against those backups: V04 157 diff lines, V05 113, V01 154, file f 127. They are
  saved in this session's `scratchpad/volumes/slr6/`, with V06's (162).
- **the seam's core sections whole on the live files**, wherever a changed line could meet an unchanged one:
  - V01: V1-3.15 whole, V1-3.7.1's *Openings*, V1-3.10.3 (6) whole, §1b's rows from S9b to the deck plots, V1-4.1,
    V1-4.3 and V1-4.4 whole, V1-6's switch line and sky row, T-V1-4, T-V1-21, W8, W17, J-V1.101, BCR-10 and the
    cross-volume notes (33)–(39);
  - V04: §3.10's opening-pass bullet whole, §3.1's T6 row, §4.3 whole, §6 whole, §8's U1 and U4 rows, the risks and the
    evidence clause, §10's opening, §12's round-5 and round-6 entries, §13's round-6 paragraph, J-V4.121;
  - V05: §1b's `levelledGroundCm` row, §4.2 from *Moving an island* to *New random* whole, §4.3 whole, §6's resize row,
    J-V5.81, §12's round-6 paragraph, §13 items 30–34, and every `crypt` line (for the island cathedral against V03's
    round-6 basement rule);
  - file f: items 202, 238, 313, 317, 516, 578 and 585 as changed, items 309 and 580 unchanged, and the round-6 note.
- **`_integrate.md`** by grep for every seam term that round 6 touched: the switch's edit, the opening pass, the rim
  walk, item 313, the crypt clause and the yards' tops. It is unchanged, and none of its rows names them.
- **whole-file greps for every absence claimed below** (§4).

Decision **J-SL6.1**: this round re-read by whole diffs plus the seam's core sections, as rounds 3, 4 and 5 did (J-SL3.1 –
J-SL5.1), rather than making a sixth whole read of 4 160 + 3 808 + 4 454 lines. The reason: text that did not change since
round 5 can break the seam only where a changed line meets it, and the core sections hold every such meeting; the other
lanes' round-6 changes reach this seam only through the three notes above and the rows V04, V05 and V01 cite in V03, V06
and file f, each read here. Vetoable: a whole re-read would replace this method.

**Method.** Round 5's six issues were re-checked against the text now (§1). A fix counts only when every side of the seam
carries it, counterpart halves included. Then every piece crossing the seam was traced again both ways (§2), round 6's
new mechanisms first:
- the stage-2 switch's edit as volume 1's re-derivation from S2, with volume 4's tail after it (its scope, held inputs,
  tool and range, tests, price and undo);
- V05's resize row pricing the yards' tops and the plots re-cut outside the re-derived districts (TW-04; J-V5.81), and
  V06's century summed from it;
- file f item 238's M6-U content (the crypt clause of `basementDoor(b)` and the stair-entered test), which V03 and file f
  hand to volume 4's U4 line and which moves volume 1's entrance reserve;
- the cross-lane statuses the round left behind.

Severity as before:
- *blocker* — cannot be scheduled or built;
- *major* — a contradiction or an unwired piece a builder would hit;
- *minor* — wording, a citation, a single-source slip, a status left open, a wiring row.

## 1 Re-check of round 5's issues

| id | r5 sev. | owner | status | where it stands now |
|---|---|---|---|---|
| SLR5-01 | major | V04 | **FIXED** | V4 §4.3's switch row: its edit cell names "an `editTable` or `editPreset` that changes the resolved `fabric.extensionWeight` … — across 0, or inside (0, 1]"; its *re-derives* cell reads "volume 1's re-derivation of the edit (V1-3.15, *The switch's edit*: from the switch's first reader stage with §6.3's carry-over), then T1–T8 as after the `adjust` row's Re-derive", with U-ACCESS (d), the closures and the excavation reading following the re-cut ground, T6's pass under the new gate and the inside case running as at generation; its *byte-identical* cell reads "what the stages before that first reader stage commit". §3.10's list entry and §1b.2's row read as required ("… none made and the old ones retired by §6.3's carry-over"; "… or retired by a switch edit's re-derivation (V1-3.15)"), and §3.10's bullet head now runs the pass "at a T6 over every access it selects: at generation T6 … and at the T6 of the tail that follows a re-derivation". J-V4.121 is revised as required, with "within §6's per-access budget" deleted. T-V4-74 (b) adds "after either switch edit, the underground re-derived with the ground by T1–T8, never held byte-identical", and T-V4-31, §1.2, §3.11 and U3b follow. §12 and §13 cite V1-3.15's bullet. Two residues are new findings: §6 prices no switch edit though J-V4.121 now prices it "as the re-derivation" (**SLR6-02**), and §12 still hedges on what volume 1 has since decided, while J-V4.121 cites a §7.6 undo row the base does not have (**SLR6-03**) |
| SLR5-02 | minor | V01 | **FIXED** | V1-3.15 gains the bullet *The switch's edit* in the required words and more: every change of the resolved value re-derives from S2 (the first-reader re-derivation, never §7.6's slice invalidation; a change inside (0, 1] moves only S7c's weights), §6.3's carry-over with the fates in the dry run and stored in the event, what stage 2 no longer makes retired as listed fates, the held inputs kept (a declared `fabric` or `terrace`, a hand-set block content, a place made by hand, the override rows dormant at 0, the `CloseupRecord`s), the underground tail after the ground with T6's pass under the new gate, the undo by §7.4's `editTable` / `editPreset` row. V1-2.7's `HoodPlace (opening)` row reads "lives as long as its host `AccessPoint` while the local-place step runs (the stage-2 switch > 0, V1-3.15): … retired by a switch edit that lowers the switch to 0 and made again by one that raises it"; V1-3.7.1 reads "it lives as long as its host while the step runs (V1-2.7)"; T-V1-4 adds the switch clause (1 → 0: 0 `HoodPlace`s and 0 typed blocks, each a listed fate; back to 1: V1-3.7.1's places, opening places included; each undo byte for byte; timed); J-V1.101 records the choice. Beyond the required text the edit is wired end to end: a §1b row, V1-4.1, V1-4.3, V1-4.4 and V1-6 rows, W17. Checked against the base: §6.3's collision rule gives a re-made place a fresh address (`~k`) and a fresh name, which the clause's "makes the places" does not contradict |
| SLR5-03 | minor | V01 | **FIXED** | V1-3.10.3 (6) (c): "… gives no face and re-derives no district but the claim's, where volume 5 re-searches the claim (below; seam SLR5-03)", and the reshape sentence adds "and the claim's district where the claim is re-searched". V1-6's sky row: "a shrinking resize none but the district whose claim is re-searched, where one is". Both now match V5 §4.2 *Shrinking*, V5 §6, T-V1-21, T-V5-14 and V6 §6.2's century ("a shrink re-deriving at most the claim's district") |
| SLR5-04 | minor | V01 | **FIXED** | W8 adds "`levelledGroundCm`'s dispatch on a sky key with its raster fallback — the island's terrain raster, nothing levelled before S10 (file f item 309's M5 part, built with item 580; BCR-V5-30 …); volume 5 adds the island's datums at M6-sky"; §1b's crossing-site row and V1-3.10.3 (4) cite "its raster fallback built in W8, file f item 309". File f's item 580 ("built by volume 1's W8") and V05's §1b row now name the same builder |
| SLR5-05 | minor | BASE-F | **FIXED** | Item 313 reads as required, word for word: BCR-10's four parts (the court-greening and green-and-yard-blocks rows; the parks row at any size; (c) the rim walk's row "planted once per island by volume 1's `plantRimWalk`, never by a district's S12b"; §2.7's `Greenery.along.way` optional for that row alone), *Also touches* §2.7, *Needed by* V01, V05, and the staging parenthesis naming W8's fixture island and M6-sky, with a note on the old two-part text (J-RF6.3). Checked against V01 BCR-10's live text. V01's note (36), which asked for it, is still worded as open (**SLR6-04** (a)) |
| SLR5-06 | minor | V05 | **FIXED** | (a) §12's round-5 clause reads "CONFIRMED since round 6, landed with `reconcile-V01-r5` (12:40) …". (b) §13 item 30 reads **Landed** with `reconcile-V01-r5`; item 31 reads **Landed** with `reconcile-BASE-F-r5` (12:39), with the label split and item 580's note. (c) §1b's `levelledGroundCm` producer cell reads "else the arena's unlevelled raster — S1's with the T2 terrain strokes on the ground; on a sky key, the island's terrain that SKY writes (V5 §3.8) with the T2 strokes, its fallback from M5 with volume 1's W8 (file f item 309 …)". (d) *Reshaping the rim*'s inward stretch "gives no face and re-derives no district (the claim's aside, re-derived where its claim is re-searched, above …)". §13 item 34 records volume 1's counterpart (SLR5-03) as landed at 13:53, which it was |

**Totals.** All 6 of round 5's issues are closed as raised: 6 FIXED, 0 PARTLY, 0 NOT FIXED. For the third round running,
no counterpart half was lost: volumes 4 and 1 landed the one switch edit in agreeing words within a minute of each other
(each lane read the other's live text before landing), volumes 1 and 5 landed the shrink's claim district in their own
sentences, and file f carried item 313 in the words the finding gave. Two residues on V04's side (SLR6-02, SLR6-03) come
from its own revised decision, which moved the edit's price and its undo to citations that V04 §6 and the base do not
yet match; one on V01's side (SLR6-04) is a pair of notes that other lanes answered after V01's lane closed.

## 2 Seam census, round 6

The census lists round 5's 95 pieces with their state now, then the pieces round 6's mechanisms added (96–106).
"Unchanged" means that neither side's text changed since round 5's read, and that no diff line touches what it reads.
Rows whose state round 6 moved are in bold.

| # | seam piece | producer ↔ consumer | state |
|---|---|---|---|
| 1 | SKY's slot in the stage graph | V05 §3.1 ↔ V01 V1-3.1 | consistent (unchanged) |
| 2 | island strips onto the ground | V05 §2.3a, §3.19 (6) ↔ V01 S9b, pins, `islandShare` | consistent (unchanged) |
| 3 | `SkyHandover` and the `sky` request | V05 §2.3, §1b ↔ V01 V1-2.4, V1-3.10.3 | consistent (unchanged) |
| **4** | the rim walk | V01 V1-3.10.3 step 4, BCR-10 (c) ↔ V05 §3.12, §4.2; file f item 313 | **consistent** (SLR5-05 fixed: item 313 carries BCR-10's four parts) |
| 5 | `portalsTotal`, `landingsReached` | V01 V1-3.11 (6) ↔ V05 T-V5-9 | consistent (unchanged) |
| 6 | island district kinds, fabric prior, district count | V05 §2.4, §3.12 ↔ V01 V1-3.10.3, V1-3.16 | consistent (unchanged) |
| 7 | island retaining walls and the relief class | V01 V1-3.17.7 (2) ↔ V05 §3.22 (4) | consistent (unchanged) |
| **8** | levelled ground as a reader | BCR-V5-30 ↔ V04, V01 `stepProfile`, V01's island bridge | **consistent** (SLR5-04 and SLR5-06 (c) fixed: W8 builds the sky key's raster fallback, and V05 names it) |
| 9 | `ruinCentre()`, the `ruin.node` line | V04 §3.5.0a (9) ↔ V05 §1b, §3.3, §4.5 | consistent (unchanged) |
| 10 | catacomb count with island churches | V04 §3.5.1 (3) ↔ V05 §1.3, §3.5 (3) | consistent (unchanged) |
| 11 | the sky layer never read | V04 §1.2 ↔ V05 §1.3, T-V5-26 | consistent (unchanged) |
| 12 | burial faces on islands skipped | V04 §3.5.1 (1) ↔ V05 §3.5 (3) | consistent (unchanged) |
| 13 | arch vaults under a ruined span | V05 §3.16 (4) ↔ V04 §3.5.4 (d) (2) | consistent (unchanged) |
| 14 | ground accesses under a landfall | V05 §3.16 ↔ V04 §3.10 | consistent (unchanged) |
| 15 | light at shafts under an island | V05 §5.3 (1) ↔ V04 §5.3, BCR-38 | consistent (unchanged) |
| **16** | the opening pass at generation | V01 V1-3.7.1 ↔ V04 T6, §3.10 | **consistent**: §3.10's head now runs the pass at every T6, generation's and the tail's after a re-derivation |
| 17 | ground access symbols and their state forms | V01 V1-3.8.8, V1-5.1.2 ↔ V04 §5.2 (7), base §8.2 | consistent (unchanged) |
| 18 | the undercity's parent | II.7.5 (2), V01 V1-3.16 ↔ V04 §3.6 C5 | consistent (unchanged) |
| 19 | `districtsAbove`, `fabricSignature` | V01 V1-3.16 ↔ V04 §3.5.0a (7), C5, §4.5 | consistent (unchanged) |
| 20 | `blockLifted` | V01 V1-3.9 ↔ V04 §3.5.1 (7) | consistent (unchanged) |
| 21 | catacomb source protection | V04 `UndergroundSystem.sources` ↔ V01 V1-3.5.12 (4), V1-3.9 | consistent: V1-3.15's switch edit keeps V1-3.5.12's fixed inputs |
| 22 | the catacomb entrance sentence | file f item 560 ↔ V01, V04 | consistent (unchanged) |
| 23 | public opening kinds and places | file f item 554 ↔ V01 V1-3.7.1, V04 §3.5.7 (e) | consistent (unchanged) |
| 24 | `hood.pins` rows for the underground | V04 §1.3 ↔ V01 V1-3.8.8 | consistent (unchanged) |
| 25 | public ground, squares, yards | V04 §1.2 ↔ V01 blocks | consistent (unchanged) |
| **26** | locality of a ground edit and of the switch's edit | V04 §4.3, V05 §4.3 ↔ V01 V1-3.9, V1-4.3 | **consistent** (SLR5-01 fixed: V4 §4.3's switch row cites V1-3.15 and holds only the stages before the first reader stage byte-identical, as V1-4.3's bullet does) |
| 27 | the lone neighbourhood's layers | V01 V1-3.10.1 (7) ↔ V04 §3.1 | consistent (unchanged) |
| 28 | the `Way` line | file f 208 → 207 → 209 | consistent (unchanged) |
| 29 | `DistrictContext.under`, `.shade.islandShare` | V01 V1-2.3 ↔ V04 §3.5.7 (g), V05 §2.3a | consistent (unchanged) |
| 30 | `catchmentOf` on the other arenas | V01 V1-3.16 ↔ V04 §3.6a, V05 §3.5 (3) | consistent (unchanged) |
| 31 | GeoJSON of walls and raised ways | file f 447 ↔ V01 V1-5.3, §1b, V05 §5.5 | consistent (unchanged) |
| 32 | barrier kinds on seams | J-VI.3 ↔ V01 BCR-30 (b) | consistent (unchanged) |
| 33 | a ground landing's S8 destination | BCR-V5-20 ↔ V01 V1-3.4.2 (a) | consistent (unchanged) |
| **34** | the sky unit run's cost | V01 V1-6 ↔ V05 §6 | **consistent** (SLR5-03 fixed: a shrink's claim district on both sides) |
| 35 | the aqueduct's terminal | V01 V1-3.17.8 ↔ V04 §3.5.4 (e) | consistent (unchanged) |
| 36 | spans' `use`, lanes under arches | V04's BCR-45 ↔ V01 V1-3.17.3 | consistent (unchanged; the span constants' home is outside this seam, §4) |
| 37 | the raised-way slot before S7b (1) | V01 BCR-39 ↔ V05 §3.1 | consistent (unchanged) |
| 38 | `hood.fabric`, `sky.clearance`, `under.*` epoch orders | V01 (40) ↔ V05 (50) ↔ V04 (10–30) | consistent (unchanged; V06's round-6 `afterField` additions are village participants, order 10 and 20, beside `sky.islands` at 0) |
| 39 | DR numbers | IN-V01-6, IN-V05-3 | consistent (unchanged) |
| 40 | raised-way reason words | J-VI.2 ↔ IN-V01-4 | consistent (unchanged) |
| 41 | SKY's data keys in S9b's declared inputs | BCR-V5-3 ↔ V01 V1-3.1 | consistent (unchanged) |
| **42** | opening places after generation | V04 §3.10 ↔ V01 V1-2.7, §1b | **consistent** (SLR5-01, -02 fixed: the switch edit's entry and the place's lifetime agree) |
| 43 | `@plat/hood` services in M6-U's build order | V01 W15 ↔ V04 §8, §11 Q1 | consistent (unchanged) |
| 44 | shade on a sky arena | V05 `shadeSky` ↔ V01's shade readers | consistent (unchanged) |
| 45 | the landfall's quarry against the surface quarry | V05 §3.16 (4) ↔ V04 §3.5.3 | consistent (unchanged) |
| **46** | the seam bars' registration | V04 BCR-15 ↔ T-V4-71 – 75 | consistent (T-V4-31 and T-V4-74 (b) extended by the switch clauses) |
| 47 | the underground pseudo-district's name | II.7.3 ↔ V04 §3.6a (5), V01 V1-3.16 | consistent (unchanged) |
| 48 | `SkyIsland.districts`' writer | V01 V1-2.4 ↔ V05 §2.6 | consistent (unchanged) |
| 49 | the island unit run's cross-arena pulls | V05 §3.20 ↔ V01 V1-3.10.3 (4) | consistent (unchanged) |
| **50** | file f's needed-by lists and pointers | file f ↔ V01, V04, V05 | **consistent** (item 313 names V05; items 238 and 578 name V01 and V04); item 238's quote of V04's U4 line **SLR6-01** |
| 51 | the island's unit run after generation | V05 §2.3, §3.15 (5), §4.2 ↔ V01 V1-3.10.3 (6) | consistent (unchanged) |
| 52 | the sky pseudo-district in S7b (1)'s supply term | V05 §3.20 (12) (b), BCR-V5-16 ↔ V01 V1-3.2 (5) | consistent (unchanged) |
| 53 | the island river's crossing sites | V05 §3.8 (4), §3.12 ↔ V01 V1-3.10.3 (4) | consistent (unchanged) |
| 54 | a hood document's void-dwelling allocation | V04 §3.1, §3.3 P7, F6 ↔ V01 V1-3.10.1 step 6 | consistent (unchanged) |
| 55 | an access's state on the surface symbol | base §8.2 `states`, V04 §3.10 ↔ V01 V1-3.8.8, V1-5.1.2 | consistent (unchanged) |
| 56 | `stepProfile`'s readers | V01 §1b, BCR-43 ↔ V04 §3.5.5 | consistent (unchanged) |
| 57 | `AccessPoint.cause` and `excavation` read by volume 1 | V04 §1b.1, §2.6 ↔ V01 V1-3.7.1, V1-2.3 | consistent (unchanged) |
| 58 | `terraceState` on an island | V01 V1-3.17.7 (2) ↔ V05 §3.8 (3), §3.22 (4) | consistent (unchanged) |
| 59 | the island crossing-site spans and bridges | V01 V1-3.10.3 (4), BCR-45 ↔ V05 §2.3, §3.8 (4), §3.12, §3.16 (7), §3.22 (6); base §4.2 S1 (5), §4.8 | consistent; the M5 read see 8 |
| 60 | a lone neighbourhood's void part | V01 V1-3.10.1 step 6, §1.2, §1b ↔ V04 §3.1, §3.3 P7, §3.4 F6, §3.7a T8, BCR-19 | consistent (unchanged) |
| 61 | the unit run inside an after-generation commit | V01 V1-3.10.3 (6) (a)–(b), V1-6 ↔ V05 §2.3, §3.15 (5), §4.2, §6; V06 §3.2, §6.2 | consistent (unchanged) |
| **62** | faces a growing resize adds or a rim reshape moves | V01 V1-3.10.3 (6) (c), V1-6, T-V1-21 ↔ V05 §4.2, §6, T-V5-14 | **consistent** (SLR5-03, SLR5-06 (d) fixed) |
| 63 | a landing yard's island plots | V01 V1-3.10.3 (6) (c) *Yards* ↔ V05 §4.2 *Resizing*, *Accesses* | consistent; now priced once, see 102 |
| 64 | the island's relief class for `terraceState` | V01 V1-3.17.7 (2), V1-2.3 ↔ V05 §2.1, §3.8 (3), §3.22 (4) | consistent (unchanged) |
| 65 | the landfall's typed `members` read by volume 4's closures | V05 BCR-V5-9, §2.6, §3.16 (5) ↔ V04 §3.10, §1.2 | consistent (unchanged) |
| 66 | `SeamReport.superseded` for a run over an island that holds content | V01 V1-3.10.3 (6) (b) ↔ V1-3.11 (6) | consistent (unchanged) |
| 67 | file f items 252, 308, 309 | file f ↔ V01, V04, V05 | consistent (unchanged) |
| 68 | the rim strip, the landing yards and the claim re-laid at a resize and a reshape | V05 §4.2, §2.6, §1b ↔ V01 V1-3.10.3 (2), (6) (c) | consistent (unchanged) |
| 69 | the rim walk after a rim change | V05 §4.2, §1b ↔ V01 V1-3.10.3 step 4, (6) (c), §1b, T-V1-21, BCR-10 (c) | consistent (unchanged) |
| **70** | the institution claim re-searched inside its district | V05 §4.2, J-V5.77, T-V5-14 ↔ V01 V1-3.9, V1-3.10.3 (6) (c), T-V1-21, V1-6 | **consistent** (SLR5-03 fixed: a shrink counts the claim's district in V01's sentence and V1-6) |
| 71 | the growing band's faces cut at the extended district boundary ways | V05 §4.2 ↔ V01 V1-3.10.3 step 2 | consistent (unchanged) |
| 72 | `terrainEcho.reliefClass` | V05 §2.1, §2.6, §3.8 (3), BCR-V5-1 ↔ V01 V1-3.17.7 (2); file f item 251 | consistent (unchanged) |
| **73** | the island bridge built after S8, `deckCm` from `levelledGroundCm` on the island's key | V01 V1-3.10.3 (4), BCR-45, item 580 ↔ V05 BCR-V5-30, §1b; item 309 | **consistent** (SLR5-04 fixed) |
| 74 | the hood's forecast order and P7's cap | V04 §3.1's hood line, §3.3, P7 ↔ V01 V1-3.10.1 step 6 | consistent (unchanged) |
| 75 | P5's catacomb expectation in a hood | V04 §3.1, J-V4.116, T-V4-75 ↔ V01 V1-3.10.1 (7) | consistent (unchanged) |
| 76 | the dwelling closure's opening rungs and volume 1's opening pass | V04 §3.8, §3.10, §1b.2, §4.3, T-V4-74 ↔ V01 V1-2.7, §1b's `HoodPlace` row | consistent (unchanged) |
| **77** | the stage-2 switch over the opening pass | V01 V1-3.7.1, V1-3.15 ↔ V04 §3.10, §3.11, T6, §1.2, T-V4-74 (b) | **consistent** (SLR5-01, -02 fixed) |
| 78 | the ground access symbols' size columns | V01 V1-3.14, V1-3.8.8, T-V1-4 ↔ base §2.6, item 554, V04 §3.5.1 (9) | consistent (unchanged) |
| 79 | a `well` access at a stack-hosted building | V01 V1-3.8.2 step 5 ↔ V04 §3.5.7 (d) | consistent (unchanged) |
| 80 | `hood.constants` as one settings row; `sky.plotShare` read by volume 5 | V01 V1-2.2, V1-3.14 ↔ V05 §2.3, §3.12 item 7 | consistent (unchanged) |
| **81** | the `NG` preset over the layers | V01 V1-3.15, BCR-46 ↔ V04 T-V4-35, V05's parity rows | consistent: an `editPreset` changing the `NG` entry of the switch is the switch's edit, with V04's row after it |
| 82 | item 244's support step | file f item 244 ↔ V01 V1-3.17.3, V04 §3.5.4, V05 §3.7 (2), §3.10 (3)–(4) | consistent (unchanged in the three volumes; its slide bound now a volume-11 cell, outside this seam, §4) |
| **83** | an island resize at an epoch, priced | V06 §3.2, §6.2 ↔ V05 §6, V01 V1-6 | **consistent**: V06's century re-summed from V05's amended row (TW-04), a shrink at the claim's district |
| 84 | file f item 580 (V01 BCR-45) | file f ↔ V01 §10 | consistent (unchanged) |
| 85 | `plantRimWalk(doc, island)`: one writer, two callers, one pair per island | V01 V1-3.10.3 step 4, V1-3.16, §1b, V1-2.7, V1-2.8, W8 ↔ V05 §4.2, §1b, §2.6, §3.12, §6, T-V5-14 | consistent (unchanged) |
| 86 | the island institution released from V1-3.9's fixed inputs for one event | V01 V1-3.9, V1-3.10.3 (6) (c) ↔ V05 §4.2, J-V5.77 | consistent (unchanged) |
| 87 | the one commit's order at a rim event | V01 V1-3.10.3 (6) (c) ↔ V05 §4.2 | consistent (unchanged): the yards' top placements are among volume 5's yard steps |
| **88** | a shrink's re-derivations | V01 V1-3.10.3 (6) (c), V1-6, T-V1-21 ↔ V05 §4.2 *Shrinking*, *Reshaping*, §6, T-V5-14 | **consistent** (SLR5-03, SLR5-06 (d) fixed) |
| **89** | the rim walk's base row | V01 BCR-10 (c) and §2.7's `Greenery.along.way?` ↔ file f item 313 | **consistent** (SLR5-05 fixed); V01's note (36) left open **SLR6-04** (a) |
| 90 | `accessSymbolKind` | V01 V1-3.8.8, V1-3.14, V1-5.1.2, T-V1-4 ↔ base §2.6, item 554 ↔ V04 §3.5.1 (9), §5.2 (7) | consistent (unchanged) |
| **91** | the stage-2 switch's edit | V04 §3.10, §4.3, J-V4.121, T-V4-31, T-V4-74 (b) ↔ V01 V1-3.15, V1-2.7, V1-3.7.1, V1-4.1, V1-4.3, V1-4.4, T-V1-4, J-V1.101 | **consistent in mechanism** (SLR5-01, -02 fixed); its price **SLR6-02**, its undo pointer **SLR6-03** (b) |
| **92** | the sky key's raster fallback at M5 | file f items 309, 580 ↔ V01 W8, §1b ↔ V05 BCR-V5-30, §1b, §8 | **consistent** (SLR5-04, SLR5-06 (c) fixed) |
| **93** | the cross-lane statuses of round 5 | V05 §12, §13 items 30–31 ↔ V01's and file f's round-5 landings | **consistent** (SLR5-06 (a)–(b) fixed) |
| 94 | the landfall's gates (TV-04) | V05 §3.16 (2), (4)–(5), §2.6 ↔ V04 §3.10's closures | consistent (unchanged) |
| **95** | V04's hand-off on the switch's edit for volume 1's other places | V04 §13, §12 ↔ V01 V1-3.15 | **closed**: V1-3.15's bullet states the other places' fates; V04's §12 hedge **SLR6-03** (a) |
| 96 | the switch edit's scope: every change of the value, from S2, the tail after the ground | V01 V1-3.15, V1-4.3, §1b's switch-edit row ↔ V04 §4.3's switch row, §3.10, T-V4-31 | consistent: both name any change (across 0, or inside (0, 1]); the stages before S2 byte-identical; T1–T8 after the ground |
| 97 | the switch edit's opening places | V01 V1-2.7 (opening and derived rows), V1-3.7.1, T-V1-4 ↔ V04 §3.10, §1b.2, T-V4-74 (b), J-V4.121 | consistent: retired at 0 by the carry-over, made at T6 when raised; each a fate; a re-made place takes a fresh address by §6.3's collision rule, which neither side contradicts |
| 98 | the held inputs through the switch edit | V01 V1-3.15 (a declared `fabric` or `terrace`, a hand-set content, a place made by hand, the override rows, the `CloseupRecord`s) ↔ V04 §4.3 ("as after the `adjust` row's Re-derive": carry-over, held underground edits kept) | consistent |
| 99 | the switch edit's tool and range | V01 V1-4.1 (the tables editor or the presets dialog; clamped to [0, 1]) ↔ V04 §4.3 ((0, 1]) | consistent |
| 100 | the switch edit's price | V01 V1-6's switch line ("§12.6's ≤ M(B) for a Re-derive from Sk …, the underground tail's after it") ↔ V04 §6 | **SLR6-02** |
| 101 | the switch edit's undo | V01 V1-3.15, V1-4.4 (§7.4's `editTable` / `editPreset` row) ↔ V04 J-V4.121 ("§7.6's undo row") | **SLR6-03** (b) |
| 102 | a resize's yard tops and re-cut plots, priced once | V05 §6's resize row, J-V5.81 ↔ V01 V1-6's sky row, V1-3.10.3 (6) (c) *Yards*, T-V1-21 | consistent: V01 leaves a shrink's clearing and re-cut and the yards' local operator to V05's row, which prices them once, with the tops' `placeAt` |
| 103 | the century from the amended resize row | V06 §6.2's `sky.islands` row and century ↔ V05 §6, V01 V1-6 | consistent: the row quoted by name, a shrink at the claim's district, the D-18 bounds re-declared by V06 |
| 104 | the crypt derivation's M6-U content and its first reading | file f items 238, 578; V03 3.7.4, §8's PE, T-V3-23 (j) ↔ V04 §8's U4 row ↔ V01 V1-3.8.2 step 5, V1-3.8.3 (the entrance reserve at `basementDoor(b)`, its value in the chunk digest) | **SLR6-01** |
| 105 | the cross-lane statuses of round 6 | V04 §12, §13; V01 notes (36), (39); V05 §12, §13 items 33–34 | V05 consistent; **SLR6-03** (a), **SLR6-04** |
| 106 | V01 §0's great temple door into its crypt | V01 §0 ↔ V04 §8's U4 (the crypt derivation), V03 3.7.4 | consistent: V04 states no temple door, and V01's sentence cites volume 3's rule |

## 3 New findings

### SLR6-01 — major — owner V04 — U4 omits the crypt derivation's M6-U content that file f item 238 quotes as U4's words and volume 3 builds there, and M6-U declares no shift for its first reading

**Claim.** Round 6 moved two more pieces of the crypt into M6-U and gave M6-U a declared shift for them. Volume 3 and
file f wrote their halves; volume 4, whose §8 is M6-U's plan, has neither. The first reading moves volume 1's entrance
reserve, which is how the issue reaches this seam. `reconcile-BASE-F-r6` logged the U4 words "for volume 4's next lane or
the layers seam" (14:03), and volume 3's round-6 hand-off names "volume 4 (its U4 line; the layers seam's hand-off)".
- **What file f says U4 holds.** Item 238 (round 6; S23R5-04, S23R5-01): §16's M6-U row's content gains "the crypt
  derivation — volume 3 §3.7.4's seed, growth and rank; volume 2 §3.14.5's crypt ladder and lift; the stair-entered test
  and the whole basement of a crypt no stair reaches (volume 3 §3.7.4; seam S23R5-01); volume 3 §3.7.1's crypt clause of
  `basementDoor(b)` (the door point off the crypt's vault; item 578), whose first reading — a walk-out church's outside
  door moved off its crypt, volume 1's entrance reserve with it — M6-U's shift record declares with the crypt's first
  derivation" **in volume 4 §8's U4 line** (+0.25 pw, unchanged). Item 578's label: "… its crypt clause with item 238
  (M6-U)".
- **What volume 3 builds there.**
  - 3.7.4's *A stair-entered crypt*: the test "is built with the crypt derivation at M6-U (file f item 238; §8's P2)".
  - §8's PE row: the crypt clause "is built at M6-U with the crypt derivation (file f item 238), inside its 0.25 pw, its
    door clause of T-V3-23 (j) at M6-U's exit", and the moved door and volume 1's reserve are "declared in M6-U's shift
    record with the crypt's first derivation".
  - T-V3-23 (j): "the door clause and the basement's extent run from M6-U on".
  - §12's round-6 PLAUSIBLE: the whole basement of a crypt no stair reaches "is M6-U's first derivation, which M6-U's
    shift record already declares".
- **What volume 4 has.** U4's content cell: "the crypt derivation, moved from volume 3's P2 (`Basement.crypt` with its
  seed, growth and rank — volume 3 §3.7.4 steps 1–3, BCR-V3-20 — and volume 2's crypt ladder with its `raised` form and
  lift, BCR-V2-28; file f item 238, S23-20: 0.25 pw)". V04 has 0 hits for "stair-entered", "basementDoor" and "crypt
  clause". It cites T-V3-23 only as (d) (T-V4-50, J-V4.89), never (j). Its one "shift record" line is U1's, the
  forecast's ground shift (C4-01).
- **Why a builder hits it.** U4 is the only plan for M6-U's content, and its builder holds V04 and the base.
  - **Unbuilt work.** From V04 alone, no step builds the stair-entered test, the whole-inset basement or the crypt clause
    of `basementDoor(b)`: volume 3 moved them to M6-U, and file f puts them in U4. A walk-out church's outside door then
    keeps opening onto its crypt's vault. So does volume 1's entrance reserve, which V1-3.8.2 step 5 stands at the point
    `basementDoor(b)` gives.
  - **Undeclared shift.** U4's exit neither runs T-V3-23 (j)'s door and extent clauses nor records the first reading in
    M6-U's declared shift (§13.3). The crypt-bearing basements, the moved doors and the re-sited reserves would reach M6-U's
    goldens undeclared; the reserves' close-up chunks go stale through the value V1-3.8.3's digest hashes. Volume 3's "M6-U's
    shift record already declares" is not true of V04.
  - **A base contradiction to come.** Once the coherence pass applies item 238, §16's M6-U row carries these words, and
    V04's U4 row would contradict it.
- **Why major.** Round 5 graded SLR5-04, a work item W8 did not name, as minor. This one differs in two ways. Two
  volumes positively disagree about M6-U's shift record. And the unbuilt pieces change ground output, so the gap fails
  the golden gate rather than one fixture.

**Required change (V04).**
- **§8's U4 row, content cell.** "the crypt derivation, moved from volume 3's P2 (`Basement.crypt` with its seed, growth
  and rank — volume 3 §3.7.4 steps 1–3, BCR-V3-20 — and volume 2's crypt ladder with its `raised` form and lift,
  BCR-V2-28; file f item 238, S23-20: 0.25 pw)" reads:

  > the crypt derivation, moved from volume 3's P2 (`Basement.crypt` with its seed, growth and rank — volume 3 §3.7.4
  > steps 1–3, BCR-V3-20 —; volume 2's crypt ladder with its `raised` form and lift, BCR-V2-28; the stair-entered test
  > and the whole basement of a crypt no stair reaches (volume 3 §3.7.4's *A stair-entered crypt* and its `always`
  > bullet; seam S23R5-01); and volume 3 §3.7.1's crypt clause of `basementDoor(b)`, the door point off the crypt's vault
  > (file f item 578), whose first reading moves a walk-out church's outside door off its crypt and volume 1's entrance
  > reserve with it (V01 V1-3.8.2 step 5; its close-up chunks stale by V1-3.8.3's digest); file f item 238, S23-20,
  > S23R5-04: 0.25 pw, unchanged)

- **U4's exit cell** adds, after T-V4-75:

  > T-V3-23 (j)'s door and basement-extent clauses (volume 3; they run from M6-U on); the crypt derivation's first
  > reading recorded in the M6-U output version's declared shift (§13.3) — the churches' crypts and their basements, the
  > `raised` form's lifted seed wings, and each walk-out church's outside door moved off its crypt with volume 1's
  > entrance reserve — beside U1's forecast shift (C4-01)

- **U4's estimate** stays 5.25–7.25 pw: the pieces ride item 238's 0.25 pw (file f J-RF6.5; volume 3's PE).
- **§12** records the read of volume 3 §3.7.4, its PE row and T-V3-23 (j), and file f items 238 and 578.
- **§13** records nothing: the issue is fixed, not deferred.

### SLR6-02 — minor — owner V04 — §6 prices every re-deriving edit but the stage-2 switch's

**Claim.** The round-6 edit has a price on its ground half only.
- **What changed.** J-V4.121 (round 6) deleted "within §6's per-access budget", because "the edit is priced as the
  re-derivation". V4 §4.3's switch row runs volume 1's re-derivation "then T1–T8 as after the `adjust` row's Re-derive".
- **What §6 prices.** V4 §6's *Edits* paragraph prices every other re-deriving edit: "the family, preset, ruins and
  TOWN-toggle adjusts at §12.6's *re-derive from S7b* row plus the tail's p95 (C4-04); Re-derive from the network stage ≤
  the tail's p95". It has no switch edit; its only "switch" is "switching band".
- **What volume 1 prices.** V01 V1-6's switch line prices the ground's half: "a Re-derive from S2 of the whole document:
  §12.6's ≤ M(B) for a Re-derive from Sk, stage 2's per-district lines above included, the underground tail's after it".
  T-V1-4 times it at M5, before any tail exists.
- **The gap.** From M6-U, the tail's share of the switch edit has a bound in neither volume. No bar times the whole edit on
  a document with voids.

**Required change (V04).**
- **§6's *Edits* paragraph** adds, after "Re-derive from the network stage ≤ the tail's p95": "the stage-2 switch's edit (V4
  §4.3; V1-3.15) at volume 1's Re-derive-from-S2 line (V01 V1-6) plus the tail's p95, as the adjusts are".
- **T-V4-31's switch clause** ends: "…, the edit within V4 §6's switch line".
- **Volume 1.** Its line holds as written: "the underground tail's after it" reads as the tail's own line, which V4 §6 now
  names.

### SLR6-03 — minor — owner V04 — §12 still hedges on what volume 1 has decided; J-V4.121 cites an undo row the base's §7.6 does not have

**Claim.** Two round-6 texts in V04 lag the counterpart and the base they cite.
- **(a) The hedge.** V4 §12's round-6 PLAUSIBLE entry reads: "that S2 is the stage-2 switch's first reader stage (read
  from V1-3.15's `λ_b` 0 and V1-3.5.9's `(1 + λ_b)` on S2's land estimate, as the seam check reads it; if volume 1 names
  another first reader, or narrows the edit by §7.6's slice rule, V04's rows hold unchanged …)".
  - V1-3.15's bullet now names the stage: "re-derives from the switch's first reader stage, S2, whose land estimate reads
    `λ_b`".
  - J-V1.101 chose the first-reader re-derivation over §7.6's slice invalidation.
  - V04's own round-6 CONFIRMED entry records reading both, and so does the round-5 PLAUSIBLE entry's clause "that
    volume 1's re-derivation of that edit (V1-3.15, *The switch's edit*; SLR5-02) and J-V4.121's rule agree for the
    opening places …".
  - So the same claims are labelled both CONFIRMED and PLAUSIBLE. This is the pattern of round 4's TV-06: a counterpart
    that has landed, left marked open.
- **(b) The undo pointer.** J-V4.121 reads "each a fate of the edit and restored by its undo (§7.6's undo row)". The
  base's §7.6 has no undo row: "undo" has 0 hits in §7.6. The edit's undo is §7.4's `editTable` / `editPreset` lifecycle
  row ("inverse row operations; the re-derived entities … restored from the undo record, never re-drawn"). V01 cites that
  row in V1-3.15 and V1-4.4.

**Required change (V04).**
- **(a)**
  - The round-6 PLAUSIBLE entry's first clause is deleted there. The round-6 CONFIRMED entry gains: "S2 is the stage-2
    switch's first reader stage and the edit a first-reader re-derivation, never §7.6's slice invalidation — V1-3.15's
    *The switch's edit* and J-V1.101 (V01 md5 85b488b3 as landed)". The PLAUSIBLE entry keeps its second clause (the
    tail needs no switch-specific step; no bar measures how much of the underground the edit moves).
  - In the round-5 PLAUSIBLE entry, the clause "that volume 1's re-derivation of that edit … agree for the opening places
    … (round 6, SLR5-01; T-V4-74 (b) and T-V1-4 test it)" is deleted, since the round-6 CONFIRMED entry holds it.
- **(b)** J-V4.121's "(§7.6's undo row)" reads "(§7.4's `editTable` / `editPreset` row)".
- **What may stay.** J-V4.121's sentence that the rows "hold whether volume 1 keeps the first-reader re-derivation or
  narrows it by §7.6's slice rule" is the rows' reason for citing the bullet rather than a stage.

### SLR6-04 — minor — owner V01 — cross-volume notes (36) and (39) still read as open, though other lanes answered them after V01's lane closed

**Claim.** Both notes ask another volume for a change that has since landed. V01's own convention marks an answered note
"Landed by … nothing open", as in notes (32) and (37).
- **(a) Note (36).** It reads "item 313 should name all of them, staged as it stands". `reconcile-BASE-F-r6` (14:03)
  landed item 313 as SLR5-05 wrote it.
- **(b) Note (39).** It reads "V4 §4.3's switch row and §3.10's list name a change 'across 0' … V04 may widen the row".
  `reconcile-V04-r6` (13:52) widened V4 §4.3's switch row and T-V4-31 to "across 0, or inside (0, 1]", after V01's 13:46
  note. §3.10's list entry no longer says "across 0".

**Required change (V01).**
- **Note (36)** ends: "Landed by `reconcile-BASE-F-r6` (14:03): item 313 names BCR-10's four parts, *Also touches* §2.7,
  *Needed by* V01, V05, staged with W8's fixture island and M6-sky; nothing open."
- **Note (39)** ends: "Landed by `reconcile-V04-r6` (13:52): V4 §4.3's switch row and T-V4-31 name any change of the
  value — across 0, or inside (0, 1], where the gate holds and the pass runs as at generation — and §3.10's list entry
  names the re-derivation's T6 without 'across 0'; nothing open."
- **Each note's first sentence** stays as its history.

## 4 Disposition summary by owning volume

| owner | blocker | major | minor | findings |
|---|---|---|---|---|
| V04 | 0 | 1 | 2 | SLR6-01, SLR6-02, SLR6-03 |
| V01 | 0 | 0 | 1 | SLR6-04 |
| V05 | 0 | 0 | 0 | — |
| BASE-F | 0 | 0 | 0 | — |
| **total** | **0** | **1** | **3** | 4 |

**What held.** All six of round 5's issues are closed on every side of the seam, and no counterpart half was lost.
- **The stage-2 switch's edit is one mechanism in two volumes.** Volume 1 re-derives every change of the value from S2,
  with §6.3's carry-over, the held inputs kept, and the stages before S2 byte-identical. Volume 4 re-derives the
  underground after it by T1–T8, with T6's opening pass under the new gate. The opening places are retired at 0 and made
  when the switch is raised, as listed fates. Both tests (T-V1-4, T-V4-74 (b)) and both oracles (V1-4.3, T-V4-31) say
  the same.
- **A shrink re-derives the claim's district** in V01's sentence and budget, V05 §4.2 and §6, and V06's century.
- **The sky key's raster fallback** has a builder (W8), and V05 and file f name it.
- **Item 313** carries all four parts of BCR-10.
- **V05's statuses** are current.
- **Round 6's new pricing** meets at the seam: V05's resize row, which now prices the yards' tops and the plots re-cut
  outside the re-derived districts, is what V01's V1-6 and T-V1-21 leave to it, and V06 sums its century from that row by
  name.
- **The underground and the sky still never meet.** V04 reads no sky entity. V05's crypt test covers every point of the
  claim, so volume 3's round-6 basement extent does not reach it.

**What this round found.** Three kinds of fault remain.
- **A hand-off addressed to this seam (SLR6-01, the one major).** Volume 3 and file f moved the stair-entered test, the
  crypt clause of `basementDoor(b)` and their declared first reading into M6-U. Volume 4's U4 row, the plan they point
  to, has none of them. Volume 4's round-6 lane was briefed on SLR5-01 alone, so the words waited here.
- **Residues of volume 4's own revised decision (SLR6-02, SLR6-03).** Its price moved to "the re-derivation", which §6
  does not name. Its undo cites a §7.6 row the base does not have. §12 hedges on a choice volume 1 has since made.
- **Answered requests left worded as open (SLR6-04).** Both were answered after volume 1's lane closed.

**Advice to the reconcile lanes (not a finding).**
- **Volume 4** takes SLR6-01 to SLR6-03 in one lane. SLR6-01's content cell uses file f item 238's words, so the base
  row and the plan read alike.
- **Volume 1's SLR6-04** is status only, and needs no counterpart.

**Observed outside this seam (not raised here).**
- **The span-rule constants' home.** V04's BCR-45, J-V4.93 and its §8 register row name them as base raised-way cells
  (`raised.vaultShare`, the headroom and fall bounds, the cap, the deck depth, `raised.supportFoundationCm`). Volume 11's
  round-6 SCC-104 made them `raisedWays.structure.span.*` cells of its row 80, and logged the change for volume 4's next
  lane at 14:18. Item 244's slide bound became `raisedWays.structure.slideMaxFactor`. Neither V01 nor V05 names any of
  these cells or quotes their values, so the question is volume 4's with volume 11 (the content-calibration seam).
- **"Crypt join" names two things.** In volume 4 it is a crypt's access to a catacomb (cause `crypt`, V4 §3.5.7 (c)). In
  volume 3's round-6 text it is also O2's one door joining a crypt to the rest of its basement (S23R5-01). V03 3.7.4 uses
  both senses in one paragraph. V01 uses only volume 4's sense by name ("a crypt joined to a catacomb"); its §0 states the
  other in plain words. The question is volume 3's with volume 4.
- **V01's switch-edit feeders.** V01 §1b's switch-edit row lists "the NG harness's and the M5 panel's preset choice"
  among the edit's feeders. A harness's preset choice sets the preset at generation and is no edit. This is internal to
  V01.

**CONFIRMED versus PLAUSIBLE.** CONFIRMED by reading the inputs at the md5s of §0: every changed line as a whole diff
against round 5's inputs (backups checked by md5), and the seam's core sections on the live files. Every absence claimed
above is a whole-file grep:
- **SLR6-01:**
  - V04's U4 content and exit cells as quoted;
  - 0 V04 hits for "stair-entered", "basementDoor" and "crypt clause";
  - V04's two T-V3-23 citations, both (d) (T-V4-50, J-V4.89);
  - V04's one "shift record" line (U1's);
  - file f items 238 and 578 as landed at 14:03;
  - V03 3.7.4's *A stair-entered crypt*, §8's PE row, T-V3-23 (j) and §12's "already declares";
  - the BASE-F and V03 round-6 hand-off lines in the lane events log;
  - V01 V1-3.8.2 step 5 and V1-3.8.3's digest inputs (`basementDoor(b)` value).
- **SLR6-02:**
  - V4 §6 whole, with one "switch" hit ("switching band");
  - J-V4.121's deleted budget clause (the V04 diff);
  - V01 V1-6's switch line and T-V1-4's switch clause.
- **SLR6-03:**
  - V4 §12's round-5 and round-6 entries as quoted;
  - V1-3.15's bullet and J-V1.101;
  - 0 hits for "undo" in base §7.6;
  - base §7.4's `editTable` / `editPreset` row;
  - J-V4.121's one "§7.6's undo row".
- **SLR6-04:**
  - V01 notes (36) and (39) as quoted;
  - notes (32) and (37) with their "Landed by";
  - the V04 13:52 and BASE-F 14:03 landing lines;
  - V4 §4.3's switch row and T-V4-31 as widened.
- **§1:** each status, against the anchors quoted there. The base's §6.3 collision rule was read for the re-made opening
  place (a fresh `~k` address).

PLAUSIBLE, by reasoning rather than execution:
- J-SL6.1's premise, that unchanged text can break the seam only where a changed line meets it;
- SLR6-01's consequence, that without the U4 words M6-U's goldens would carry the crypt's first reading undeclared. It
  is read from V04 §8's evidence clause and U1's one declared shift, and no golden exists yet;
- that V06's round-6 `afterField` participants (village, orders 10 and 20) never meet `sky.islands` (order 0) on one
  document at one epoch in a way this seam reads. They gate themselves by rung and by a superseded `VillagePlan`.

The required changes' design choices are proposals for the owning lanes, and are PLAUSIBLE:
- U4's words taken from item 238, and its exit naming T-V3-23 (j) and the shift (SLR6-01);
- §6's switch line as "volume 1's line plus the tail's p95" (SLR6-02);
- the §12 moves (SLR6-03).
