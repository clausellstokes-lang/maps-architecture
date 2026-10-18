# Seam check: the underground (V04) and the sky (V05) against the neighbourhoods they carry or shadow (V01) — round 5

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-layers-r5; covered by the whole-design retrovalidation (J84).

PROGRESS
- §0 Method and inputs (files, md5, lines) | done
- §1 Re-check of round 4's SLR4-01..10 (each: FIXED / PARTLY / NOT FIXED, with the text now) | done
- §2 Seam census, round 5 (every piece crossing V04/V05 <-> V01 and the base sections they share) | done
- §3 New findings (SLR5-01 onward), severity, owner, required change | done
- §4 Disposition summary by owning volume; CONFIRMED versus PLAUSIBLE | done

## 0 Method and inputs

Lane `volumes/seam-layers-r5`, 2026-09-29, reconciliation round 5. No earlier file or LANDED line existed for this lane
key, so the round started fresh. Its inputs are the files as the round-5 reconcile lanes left them:
- `docs/volumes/V04-underground.md` — 4 075 lines, md5 27bdbbd7… (`reconcile-V04-r5` LANDED 12:36).
- `docs/volumes/V05-sky.md` — 3 740 lines, 5d0a101c… (`reconcile-V05-r5` LANDED 12:39).
- `docs/volumes/V01-neighbourhoods.md` — 4 373 lines, 15a69be1… (`reconcile-V01-r5` LANDED 12:40).
- `docs/volumes/_integrate.md` — 468 lines, 965ab696…, unchanged since round 4.
- `docs/AMENDMENTS-2026-09-28f.md` — 1 709 lines, e4c1756e… (`reconcile-BASE-F-r5` LANDED 12:39).
- The base, `docs/ARCHITECTURE.md` — md5 01fea21f…, unchanged since round 0. Read where a seam cites it: §2.6's
  `AccessPoint.kind` (nine kinds), §7.6's *Invalidation by slice* and its first-reader fallback.
- `docs/volumes/V06-evolution.md` at c63ae4ae… (4 508 lines), for SLR4-09's re-check only: V6 §3.2's and §6.2's
  `sky.islands` rows and J-V6.118.
- `docs/volumes/critique/seam-layers-r4.md` — read whole first (md5 2cf9a10f…, unchanged since its 12:16 landing).

Every input's md5 was checked again before this file was written, and none had moved.

**What was read, and how (J-SL5.1).** Round 4's inputs survive as the round-5 lanes' backups, each checked by md5:
`scratchpad/volumes/rcV4r5/V04-before.md` 87f5ce61…, `rcV5r5/V05-pre-r5.md` a60dbcc9…, `rcV1r5/V01-pre.md` cbbfe6e8… and
`rcBFr5/f-pre-r5.md` 0da3c86c…. This round read:
- **every changed line whole**, as diffs against those backups: V04 111 diff lines, V05 265, V01 302, file f 127. They are
  saved in this session's `scratchpad/volumes/slr5/`.
- **the seam's core sections whole on the live files**, wherever a changed line could meet an unchanged one:
  - V01: §1.2 and §1b whole, V1-2.7, V1-2.8, V1-3.7.1, V1-3.8.8, V1-3.9's opening, V1-3.10.1, V1-3.10.3 whole,
    V1-3.11, V1-3.15, V1-3.16, V1-3.5.9, V1-6 whole, T-V1-4, T-V1-21, §8.2's W3–W13 rows, BCR-10;
  - V04: §3.10 whole, §4.3 whole, §3.11's opening-pass row, §5.2 (7), §1b.4's `AccessPoint` row, T-V4-74, §12 and §13's
    round-5 entries;
  - V05: §1b's rim-strip, landfall and `levelledGroundCm` rows, §2.6's lifecycle rows, §3.12 whole, §4.2 – §4.3 whole,
    §6's resize row, T-V5-14, BCR-V5-30, §8's phase table, §12 and §13's round-5 entries;
  - file f: items 251, 309, 313, 444, 505, 554, 575, 580, 581 and the round-5 note.
- **`_integrate.md`** by grep for every seam term that round 5 touched: the rim walk, the opening pass, the stage-2
  switch, the claim, `levelledGroundCm` and the access sizes. It is unchanged, and none of its rows names them.
- **whole-file greps for every absence claimed below** (§4).

Decision **J-SL5.1**: this round re-read by whole diffs plus the seam's core sections, as rounds 3 and 4 did (J-SL3.1,
J-SL4.1), rather than making a fifth whole read of 4 075 + 3 740 + 4 373 lines. The reason: text that did not change
since round 4 can break the seam only where a changed line meets it, and the core sections hold every such meeting.
Vetoable: a whole re-read would replace this method.

**Method.** Round 4's ten issues were re-checked against the text now (§1). A fix counts only when every side of the seam
carries it, counterpart halves included. Then every piece crossing the seam was traced again both ways (§2), round 5's
new mechanisms first:
- `plantRimWalk` and its callers;
- the institution released from the fixed inputs;
- the one commit's order;
- `accessSymbolKind`;
- the stage-2 switch's edit as a commit of the opening pass (J-V4.121, V04's own addition beyond SLR4-06);
- item 309's split label.

Severity as before:
- *blocker* — cannot be scheduled or built;
- *major* — a contradiction or an unwired piece a builder would hit;
- *minor* — wording, a citation, a single-source slip, a wiring row.

## 1 Re-check of round 4's issues

| id | r4 sev. | owner | status | where it stands now |
|---|---|---|---|---|
| SLR4-01 | major | V01 | **FIXED** | V1-3.10.3 step 4 defines `plantRimWalk(doc, island)` (`@plat/hood`; pure over the committed rim strip and §4.9's street-tree row, draw-free). It writes the island's one `esplanade` and one `street_trees` `Greenery`, and retires the old pair by §6.3's carry-over in the same batch. It has two callers, each once per event: the unit run after its districts' S12b, and the strip re-lay (V05 §4.2's resize and rim reshape) after volume 5's L1 batch and any re-derivation. No district's S12b calls it, a replace close-up's included. The fix is carried through (6) (c) ("re-plants the rim walk whole"), the new shrink-and-inward paragraph, §1b's rim-walk row, V1-2.7's new lifecycle row, V1-2.8's identity (the island, S12b, indexes 0 and 1), V1-3.16's writer, V1-6 (≤ 0.2 ms), T-V1-21 (growing, shrinking and mixed reshape; a replace close-up leaves the pair unchanged), BCR-10 (c)'s row, J-V1.90 and W8. T-V1-21's inward stretch now re-derives nothing. The shrink sentence's "re-derives no district" is round 4's own required text, and it misses SLR4-02's exception (**SLR5-03**) |
| SLR4-02 | major | V01 | **FIXED, with a residue** | (6) (c)'s *A re-searched institution claim*: the district that holds the claim is re-derived from S8 with the island institution's use and building released from V1-3.9's fixed inputs for that event alone. The use keeps its address, S10b places it, S11 builds one building, and the old building is demolished as a listed fate. A district that also receives faces is re-derived once. V1-3.9's fixed-inputs sentence names the exception, *Yards* adds the re-claimed yards' plots under §7.3's local operator, V1-6 adds the claim's district ("at most k ≤ 3 in all"), and T-V1-21 counts it. The residue: the shrink sentence in (6) (c) and V1-6's "a shrinking resize none" still count no district for a shrink, although a shrink is where a claim is most often re-searched (**SLR5-03**) |
| SLR4-03 | minor | V05 | **FIXED** | V5 §4.2 *Growing* and *Reshaping the rim* read "volume 1's `plantRimWalk` then re-plants the rim walk whole, once for the resize / the reshape (V01 V1-3.10.3 step 4)". *Shrinking* reads "by volume 1's `plantRimWalk`". The claim cites "(6) (c)'s claim re-search, which releases the institution from V1-3.9's fixed inputs", and "That district is re-derived whether or not it receives a band face, and once where it does". The same fix is in §1b's rim-strip row, §2.6's strip-and-claims row, §3.12's contract, §6's resize row and T-V5-14 (the claim's district, one pair on the re-laid strip, the institution on its new claim in one building), and J-V5.77 cites both mechanisms. The counterpart halves are volume 1's own, landed by `reconcile-V01-r5` (12:40) in the words V05 cites; neither half was lost |
| SLR4-04 | minor | V05 | **FIXED** | BCR-V5-30's reader list and §1b's `levelledGroundCm` row add "volume 1's island bridge build after S8, `deckCm` from the two bank elevations on the island's key, where nothing is levelled yet (V01 V1-3.10.3 (4); V01's BCR-45, file f item 580)". "V01's BCR-45" rightly separates it from volume 4's BCR-45 in the same list. The row's fallback wording on a sky key is **SLR5-06** (c) |
| SLR4-05 | minor | V01 | **FIXED** | §1b's crossing-site row's feed cell adds "`levelledGroundCm` on the island's key (BCR-V5-30), read for `deckCm` by the after-S8 build" |
| SLR4-06 | minor | V04 | **FIXED; the lane's further decision raises SLR5-01 and SLR5-02** | (a) V4 §3.10's one list and §1b.2's row name the dwelling closure's opening rungs "over that opening", and T-V4-74 (b) checks the case on a sealed cluster with no qualifying building above it. (b) The gate "registered and runs — while `fabric.extensionWeight` > 0 (V01 V1-3.7.1, V1-3.15)" is stated in §3.10, the T6 row, §1b.2, §1.2 (V1-3.15 cited) and §3.11 (the switched-off cause, its line naming the cause); T-V4-74 (b)'s last clause is as required. Beyond the required text, the lane added J-V4.121: an `editTable` or `editPreset` that moves the switch across 0 is a commit of the list, with a §4.3 row that keeps "the underground's systems, accesses, excavation reading and dwellings" byte-identical. Volume 1's rows re-derive that edit from the switch's first reader stage, so the claim does not hold (**SLR5-01**). The opening place's "lives exactly as long as its host" in V01 is contradicted by the new rule (**SLR5-02**) |
| SLR4-07 | minor | V01 | **FIXED** | V1-3.8.8: `type AccessSymbolKind = Exclude<AccessPoint['kind'], 'door'> \| 'catacomb'`, `accessSymbolKind(a)` (`'catacomb'` for V1-3.7.1's selection (2), else `a.kind`), twelve values. These were checked against the base's nine kinds (§2.6: `stair`, `ladder`, `hatch`, `door`, `shaft`, `well`, `cellar_stair`, `grating`, `mouth`) less `door`, plus file f item 554's three, plus `catacomb`. The fix is carried through V1-3.14's constants and column rows, V1-5.1.2, §1b's ground-symbol row, §8.3 and T-V1-4's registry test (set equality, no `TotalityRule`), with J-V1.100 |
| SLR4-08 | minor | V01 | **FIXED** | V1-3.8.2 step 5: "a `well` access there opens at the well pin it stands over (V04 §3.5.7 (d)) and takes no reserve rectangle". This matches V4 §3.5.7 (d) and §3.8 ("where the plot's well pin stands over the element"). V03 3.7.2 (0)'s phrase is the stage2-3 seam's |
| SLR4-09 | minor | V06 | **FIXED** | V6 §3.2's `sky.islands` row names every island event with V05 §4.2's whole resize: yards served, feet re-landed, the claim kept or re-searched (its district re-derived), a shrink's half-lost plots cleared, a growth's receiving districts re-derived, and `plantRimWalk`. V6 §6.2's row prices "a `resizeIsland` — growing or shrinking, a wane's included —" at V05 §6's row by name, per receiving district and for the claim's district, per foot re-landed, with no figure restated. The century is re-derived from those rows, and the bounds are re-declared for the owner's veto (D-18): TOWN ≤ 25 s, CITY ≤ 85 s, METROPOLIS ≤ 185 s. J-V6.118 is amended |
| SLR4-10 | minor | BASE-F | **FIXED, with a residue** | (a) Item 309's reader text adds volume 1's island bridge build "from M5 on volume 1's fixture island, where nothing is levelled before S10, so it returns the island's raster". The label is split: **STAGED (M5, stage 2, with item 580)** for the sky key's raster fallback, and **STAGED (M6-sky)** for its datums and the sky readers (J-RF5.2). Item 580 gains the matching note and *Needed by* V05. (b) Item 251: "*Needed by:* V01, V05 (volume 1's `terraceState` on an island reads `terrainEcho.reliefClass` …)". The residue is round 4's own omission: the M5 part now has a builder in file f (item 580, "built by volume 1's W8"), but W8's row does not name it (**SLR5-04**) |

**Totals.** All 10 of round 4's issues are closed as raised: 7 FIXED, and 3 FIXED with residues or side effects that are
new findings (SLR4-02 → SLR5-03; SLR4-06's further decision → SLR5-01, SLR5-02; SLR4-10 → SLR5-04). 0 are PARTLY and 0
NOT FIXED. For the second round running, no counterpart half was lost:
- volume 1 landed SLR4-01's and SLR4-02's sentences itself, and volume 5 cited them;
- volume 5 and file f wrote the island bridge reader in the same words;
- volume 5 applied TV-04's V06 word as a logged counterpart edit.

Two of the residues (SLR5-03, SLR5-04) come from round 4's own required text, which did not carry one fix's exception
into another's sentence.

## 2 Seam census, round 5

The census lists round 4's 84 pieces with their state now, then the pieces round 5's mechanisms added (85–95).
"Unchanged" means that neither side's text changed since round 4's read, and that no diff line touches what it reads.
Rows whose state round 5 moved are in bold.

| # | seam piece | producer ↔ consumer | state |
|---|---|---|---|
| 1 | SKY's slot in the stage graph | V05 §3.1 ↔ V01 V1-3.1 | consistent (unchanged) |
| 2 | island strips onto the ground | V05 §2.3a, §3.19 (6) ↔ V01 S9b, pins, `islandShare` | consistent (unchanged) |
| 3 | `SkyHandover` and the `sky` request | V05 §2.3, §1b ↔ V01 V1-2.4, V1-3.10.3 | consistent (unchanged) |
| **4** | the rim walk | V01 V1-3.10.3 step 4, BCR-10 (c) ↔ V05 §3.12, §4.2 | **consistent** (SLR4-01, -03 fixed); file f's item for BCR-10 **SLR5-05** |
| 5 | `portalsTotal`, `landingsReached` | V01 V1-3.11 (6) ↔ V05 T-V5-9 | consistent (unchanged) |
| 6 | island district kinds, fabric prior, district count | V05 §2.4, §3.12 ↔ V01 V1-3.10.3, V1-3.16 | consistent (unchanged) |
| 7 | island retaining walls and the relief class | V01 V1-3.17.7 (2) ↔ V05 §3.22 (4) | consistent (unchanged) |
| **8** | levelled ground as a reader | BCR-V5-30 ↔ V04, V01 `stepProfile`, V01's island bridge | **consistent** (SLR4-04, -05, -10 fixed); the M5 builder of the sky key's fallback **SLR5-04**; V05's fallback wording **SLR5-06** (c) |
| 9 | `ruinCentre()`, the `ruin.node` line | V04 §3.5.0a (9) ↔ V05 §1b, §3.3, §4.5 | consistent (unchanged) |
| 10 | catacomb count with island churches | V04 §3.5.1 (3) ↔ V05 §1.3, §3.5 (3) | consistent (unchanged) |
| 11 | the sky layer never read | V04 §1.2 ↔ V05 §1.3, T-V5-26 | consistent (unchanged) |
| 12 | burial faces on islands skipped | V04 §3.5.1 (1) ↔ V05 §3.5 (3) | consistent (unchanged) |
| 13 | arch vaults under a ruined span | V05 §3.16 (4) ↔ V04 §3.5.4 (d) (2) | consistent (unchanged) |
| 14 | ground accesses under a landfall | V05 §3.16 ↔ V04 §3.10 | consistent: TV-04's gates join the covered set, but a gate hosts no access, and V04's closure reads ways, plots, land uses and reservations |
| 15 | light at shafts under an island | V05 §5.3 (1) ↔ V04 §5.3, BCR-38 | consistent (unchanged) |
| **16** | the opening pass at generation | V01 V1-3.7.1 ↔ V04 T6, §3.10 | **consistent** (SLR4-06 (b) fixed: the gate names the switch on both sides) |
| 17 | ground access symbols and their state forms | V01 V1-3.8.8, V1-5.1.2 ↔ V04 §5.2 (7), base §8.2 | consistent (unchanged) |
| 18 | the undercity's parent | II.7.5 (2), V01 V1-3.16 ↔ V04 §3.6 C5 | consistent (unchanged) |
| 19 | `districtsAbove`, `fabricSignature` | V01 V1-3.16 ↔ V04 §3.5.0a (7), C5, §4.5 | consistent (unchanged) |
| 20 | `blockLifted` | V01 V1-3.9 ↔ V04 §3.5.1 (7) | consistent (unchanged) |
| 21 | catacomb source protection | V04 `UndergroundSystem.sources` ↔ V01 V1-3.5.12 (4), V1-3.9 | consistent: V1-3.9's fixed inputs gain only the island institution's one-event release |
| 22 | the catacomb entrance sentence | file f item 560 ↔ V01, V04 | consistent (unchanged) |
| **23** | public opening kinds and places | file f item 554 ↔ V01 V1-3.7.1, V04 §3.5.7 (e) | **consistent** (SLR4-07 fixed; twelve symbol kinds checked against the base's nine and item 554's three) |
| **24** | `hood.pins` rows for the underground | V04 §1.3 ↔ V01 V1-3.8.8 | **consistent** (SLR4-08 fixed) |
| 25 | public ground, squares, yards | V04 §1.2 ↔ V01 blocks | consistent (unchanged) |
| 26 | locality of a ground edit | V04 §4.3, V05 §4.3 ↔ V01 V1-3.9 | consistent for a ground edit; the switch's edit **SLR5-01** |
| 27 | the lone neighbourhood's layers | V01 V1-3.10.1 (7) ↔ V04 §3.1 | consistent (unchanged) |
| 28 | the `Way` line | file f 208 → 207 → 209 | consistent (unchanged) |
| 29 | `DistrictContext.under`, `.shade.islandShare` | V01 V1-2.3 ↔ V04 §3.5.7 (g), V05 §2.3a | consistent (unchanged) |
| 30 | `catchmentOf` on the other arenas | V01 V1-3.16 ↔ V04 §3.6a, V05 §3.5 (3) | consistent (unchanged) |
| 31 | GeoJSON of walls and raised ways | file f 447 ↔ V01 V1-5.3, §1b, V05 §5.5 | consistent (unchanged) |
| 32 | barrier kinds on seams | J-VI.3 ↔ V01 BCR-30 (b) | consistent (unchanged) |
| 33 | a ground landing's S8 destination | BCR-V5-20 ↔ V01 V1-3.4.2 (a) | consistent (unchanged) |
| **34** | the sky unit run's cost | V01 V1-6 ↔ V05 §6 | the generation line consistent; a shrink's claim district **SLR5-03** |
| 35 | the aqueduct's terminal | V01 V1-3.17.8 ↔ V04 §3.5.4 (e) | consistent (unchanged) |
| 36 | spans' `use`, lanes under arches | V04's BCR-45 ↔ V01 V1-3.17.3 | consistent (unchanged) |
| 37 | the raised-way slot before S7b (1) | V01 BCR-39 ↔ V05 §3.1 | consistent (unchanged) |
| 38 | `hood.fabric`, `sky.clearance`, `under.*` epoch orders | V01 (40) ↔ V05 (50) ↔ V04 (10–30) | consistent (unchanged) |
| 39 | DR numbers | IN-V01-6, IN-V05-3 | consistent (unchanged) |
| 40 | raised-way reason words | J-VI.2 ↔ IN-V01-4 | consistent (unchanged) |
| 41 | SKY's data keys in S9b's declared inputs | BCR-V5-3 ↔ V01 V1-3.1 | consistent (unchanged) |
| **42** | opening places after generation | V04 §3.10 ↔ V01 V1-2.7, §1b | **the list is whole** (SLR4-06 (a) fixed); its switch-edit entry **SLR5-01**, V01's lifetime words **SLR5-02** |
| 43 | `@plat/hood` services in M6-U's build order | V01 W15 ↔ V04 §8, §11 Q1 | consistent (unchanged) |
| 44 | shade on a sky arena | V05 `shadeSky` ↔ V01's shade readers | consistent (unchanged) |
| 45 | the landfall's quarry against the surface quarry | V05 §3.16 (4) ↔ V04 §3.5.3 | consistent (unchanged) |
| 46 | the seam bars' registration | V04 BCR-15 ↔ T-V4-71 – 75 | consistent (T-V4-74 (b) extended) |
| 47 | the underground pseudo-district's name | II.7.3 ↔ V04 §3.6a (5), V01 V1-3.16 | consistent (unchanged) |
| 48 | `SkyIsland.districts`' writer | V01 V1-2.4 ↔ V05 §2.6 | consistent (unchanged) |
| 49 | the island unit run's cross-arena pulls | V05 §3.20 ↔ V01 V1-3.10.3 (4) | consistent (unchanged) |
| **50** | file f's needed-by lists and pointers | file f ↔ V01, V04, V05 | **items 251, 309 and 580 fixed** (SLR4-10); item 313 **SLR5-05** |
| 51 | the island's unit run after generation | V05 §2.3, §3.15 (5), §4.2 ↔ V01 V1-3.10.3 (6) | consistent: the unit run calls `plantRimWalk` once |
| 52 | the sky pseudo-district in S7b (1)'s supply term | V05 §3.20 (12) (b), BCR-V5-16 ↔ V01 V1-3.2 (5) | consistent (unchanged) |
| 53 | the island river's crossing sites | V05 §3.8 (4), §3.12 ↔ V01 V1-3.10.3 (4) | consistent (unchanged) |
| 54 | a hood document's void-dwelling allocation | V04 §3.1, §3.3 P7, F6 ↔ V01 V1-3.10.1 step 6 | consistent (unchanged) |
| 55 | an access's state on the surface symbol | base §8.2 `states`, V04 §3.10 ↔ V01 V1-3.8.8, V1-5.1.2 | consistent (unchanged) |
| 56 | `stepProfile`'s readers | V01 §1b, BCR-43 ↔ V04 §3.5.5 | consistent (unchanged) |
| 57 | `AccessPoint.cause` and `excavation` read by volume 1 | V04 §1b.1, §2.6 ↔ V01 V1-3.7.1, V1-2.3 | consistent (unchanged) |
| 58 | `terraceState` on an island | V01 V1-3.17.7 (2) ↔ V05 §3.8 (3), §3.22 (4) | consistent (unchanged) |
| 59 | the island crossing-site spans and bridges | V01 V1-3.10.3 (4), BCR-45 ↔ V05 §2.3, §3.8 (4), §3.12, §3.16 (7), §3.22 (6); base §4.2 S1 (5), §4.8 | consistent; the M5 read see 8 |
| 60 | a lone neighbourhood's void part | V01 V1-3.10.1 step 6, §1.2, §1b ↔ V04 §3.1, §3.3 P7, §3.4 F6, §3.7a T8, BCR-19 | consistent (unchanged) |
| 61 | the unit run inside an after-generation commit | V01 V1-3.10.3 (6) (a)–(b), V1-6 ↔ V05 §2.3, §3.15 (5), §4.2, §6; V06 §3.2, §6.2 | consistent (unchanged; V06's row now names `plantRimWalk`) |
| **62** | faces a growing resize adds or a rim reshape moves | V01 V1-3.10.3 (6) (c), V1-6, T-V1-21 ↔ V05 §4.2, §6, T-V5-14 | **consistent** (SLR4-01, -02, -03 fixed): outward stretches only, inward none; a shrink's claim district **SLR5-03** |
| **63** | a landing yard's island plots | V01 V1-3.10.3 (6) (c) *Yards* ↔ V05 §4.2 *Resizing*, *Accesses* | **consistent** (SLR4-02 (c) fixed): one operator for a new and a re-claimed yard |
| 64 | the island's relief class for `terraceState` | V01 V1-3.17.7 (2), V1-2.3 ↔ V05 §2.1, §3.8 (3), §3.22 (4) | consistent (unchanged) |
| 65 | the landfall's typed `members` read by volume 4's closures | V05 BCR-V5-9, §2.6, §3.16 (5) ↔ V04 §3.10, §1.2 | consistent: TV-04's gates are covered, but no member form was added that V04 reads |
| 66 | `SeamReport.superseded` for a run over an island that holds content | V01 V1-3.10.3 (6) (b) ↔ V1-3.11 (6) | consistent (unchanged) |
| 67 | file f items 252, 308, 309 | file f ↔ V01, V04, V05 | consistent; see 50 |
| **68** | the rim strip, the landing yards and the claim re-laid at a resize and a reshape | V05 §4.2, §2.6, §1b ↔ V01 V1-3.10.3 (2), (6) (c) | **consistent** (SLR4-01, -02, -03 fixed) |
| **69** | the rim walk after a rim change | V05 §4.2, §1b ↔ V01 V1-3.10.3 step 4, (6) (c), §1b, T-V1-21, BCR-10 (c) | **consistent** (SLR4-01, -03 fixed) |
| **70** | the institution claim re-searched inside its district | V05 §4.2, J-V5.77, T-V5-14 ↔ V01 V1-3.9, V1-3.10.3 (6) (c), T-V1-21, V1-6 | **consistent** (SLR4-02, -03 fixed); a shrink's count **SLR5-03** |
| 71 | the growing band's faces cut at the extended district boundary ways | V05 §4.2 ↔ V01 V1-3.10.3 step 2 | consistent (unchanged) |
| **72** | `terrainEcho.reliefClass` | V05 §2.1, §2.6, §3.8 (3), BCR-V5-1 ↔ V01 V1-3.17.7 (2); file f item 251 | **consistent** (SLR4-10 (b) fixed) |
| **73** | the island bridge built after S8, `deckCm` from `levelledGroundCm` on the island's key | V01 V1-3.10.3 (4), BCR-45, item 580 ↔ V05 BCR-V5-30, §1b; item 309 | **consistent in the texts** (SLR4-04, -05, -10 (a) fixed); the fallback's M5 builder **SLR5-04** |
| 74 | the hood's forecast order and P7's cap | V04 §3.1's hood line, §3.3, P7 ↔ V01 V1-3.10.1 step 6 | consistent (unchanged) |
| 75 | P5's catacomb expectation in a hood | V04 §3.1, J-V4.116, T-V4-75 ↔ V01 V1-3.10.1 (7) | consistent (unchanged) |
| **76** | the dwelling closure's opening rungs and volume 1's opening pass | V04 §3.8, §3.10, §1b.2, §4.3, T-V4-74 ↔ V01 V1-2.7, §1b's `HoodPlace` row | **consistent** (SLR4-06 (a) fixed; V01 cites the list) |
| **77** | the stage-2 switch over the opening pass | V01 V1-3.7.1, V1-3.15 ↔ V04 §3.10, §3.11, T6, §1.2, T-V4-74 (b) | **the gate consistent** (SLR4-06 (b) fixed); the switch's edit **SLR5-01**, **SLR5-02** |
| **78** | the ground access symbols' size columns | V01 V1-3.14, V1-3.8.8, T-V1-4 ↔ base §2.6, item 554, V04 §3.5.1 (9) | **consistent** (SLR4-07 fixed) |
| **79** | a `well` access at a stack-hosted building | V01 V1-3.8.2 step 5 ↔ V04 §3.5.7 (d) | **consistent** (SLR4-08 fixed) |
| 80 | `hood.constants` as one settings row; `sky.plotShare` read by volume 5 | V01 V1-2.2, V1-3.14 ↔ V05 §2.3, §3.12 item 7 | consistent (unchanged) |
| 81 | the `NG` preset over the layers | V01 V1-3.15, BCR-46 ↔ V04 T-V4-35, V05's parity rows | consistent: `NG` resolves the switch to 1, so the opening pass may run, but it has nothing to select |
| 82 | item 244's support step | file f item 244 ↔ V01 V1-3.17.3, V04 §3.5.4, V05 §3.7 (2), §3.10 (3)–(4) | consistent (unchanged) |
| **83** | an island resize at an epoch, priced | V06 §3.2, §6.2 ↔ V05 §6, V01 V1-6 | **consistent** (SLR4-09 fixed); V06 cites V05's row, which names the claim's district |
| 84 | file f item 580 (V01 BCR-45) | file f ↔ V01 §10 | consistent; now with the `levelledGroundCm` note and *Needed by* V05 |
| 85 | `plantRimWalk(doc, island)`: one writer, two callers, one pair per island | V01 V1-3.10.3 step 4, V1-3.16, §1b, V1-2.7, V1-2.8, W8 ↔ V05 §4.2, §1b, §2.6, §3.12, §6, T-V5-14 | consistent: each caller named on both sides, once per event, and never by a district |
| 86 | the island institution released from V1-3.9's fixed inputs for one event | V01 V1-3.9, V1-3.10.3 (6) (c) ↔ V05 §4.2, J-V5.77 | consistent: the same words on both sides; the use keeps its address, and the dossier or assignment binding follows it |
| 87 | the one commit's order at a rim event | V01 V1-3.10.3 (6) (c) (*Order in the one commit*) ↔ V05 §4.2 | consistent: volume 5's L1 batch with its plot, yard and way steps, then the districts in address order, then `plantRimWalk` |
| 88 | a shrink's re-derivations | V01 V1-3.10.3 (6) (c)'s shrink sentence, V1-6's sky row, T-V1-21 ↔ V05 §4.2 *Shrinking*, *Reshaping*, §6, T-V5-14 | **SLR5-03** |
| 89 | the rim walk's base row | V01 BCR-10 (c) and §2.7's `Greenery.along.way?` ↔ file f item 313 | **SLR5-05** |
| 90 | `accessSymbolKind` | V01 V1-3.8.8, V1-3.14, V1-5.1.2, T-V1-4 ↔ base §2.6, item 554 ↔ V04 §3.5.1 (9), §5.2 (7) | consistent (twelve values; V04 cites the symbol and never sizes the surface head) |
| 91 | the stage-2 switch's edit | V04 §3.10, §4.3, J-V4.121, T-V4-74 (b), §13's hand-off ↔ V01 V1-3.15, V1-2.7, V1-3.7.1, V1-3.5.9 | **SLR5-01**, **SLR5-02** |
| 92 | the sky key's raster fallback at M5 | file f items 309, 580 ↔ V01 W8, §1b ↔ V05 BCR-V5-30, §1b, §8 | **SLR5-04**; V05's wording **SLR5-06** (c) |
| 93 | the cross-lane statuses of round 5 | V05 §12's round-5 paragraph, §13 items 30–31 ↔ V01's and file f's round-5 landings | **SLR5-06** (a)–(b) |
| 94 | the landfall's gates (TV-04) | V05 §3.16 (2), (4)–(5), §2.6 ↔ V04 §3.10's closures | consistent (see 14) |
| 95 | V04's hand-off on the switch's edit for volume 1's other places | V04 §13, §12's round-5 PLAUSIBLE ↔ V01 V1-3.15 | closed by SLR5-02's required change |

## 3 New findings

### SLR5-01 — major — owner V04 — the stage-2 switch's edit: V04 holds the underground byte-identical under an edit that volume 1 re-derives from the switch's first reader stage

**Claim.** Round 5's J-V4.121 goes beyond SLR4-06's required text. It makes an `editTable` or `editPreset` that moves
`fabric.extensionWeight` across 0 a commit of V4 §3.10's list, one that runs volume 1's opening pass "over every
standing access the pass selects". Its §4.3 row keeps "the underground's systems, accesses, excavation reading and
dwellings" byte-identical, and counts only "the edit's other re-derivations are §7.6's and volume 1's". Volume 1's text
gives that edit a scope the row cannot survive.
- **Volume 1's rule for the edit.** V1-2.7's `hood.constants` row: "an `editTable` re-derives from the first stage that
  reads the cell (§7.6)". The switch's first reader is S2: V1-3.15 zeroes S9b's "land in the programme (V1-3.5.9:
  `λ_b` 0)" under a switch at 0, and V1-3.5.9's `λ_b` multiplies S2's land estimate. After S2 come S7c's template weights,
  S9b, the local-place step and the hood pins (V1-3.15).
- **What that re-derivation does below.** Lowering the switch from 1 to 0 re-types every dispatched block as ordinary
  and every district's fabric as a bent cut. So the plots, buildings and basements are re-cut. V04's own ground-edit row
  makes each new building over a cavern or ruin element draw U-ACCESS (d) and recomputes the excavation reading. A
  deleted building's basement access goes with it (V4 §3.10's closures). V04's `adjust` row states the same shape for a
  Re-derive from S7b: "then T1–T8".
- **The result.** The underground's accesses, excavation reading and dwellings are not byte-identical, and "every
  standing access" is not a fixed set inside that commit. The locality oracle (§7.3 item 7) would flag the row on the
  first switch edit over a document with voids.
- **Where V04 knows it.** V04 §12's round-5 PLAUSIBLE entry and §13's hand-off note that volume 1 "does not yet state
  the edit's transition".

**Required change (V04).**
- **§4.3's switch row.**
  - Its *re-derives* cell reads: "volume 1's re-derivation of the edit (V1-3.15, *The switch's edit*: from the switch's
    first reader stage with §6.3's carry-over), then T1–T8 as after the `adjust` row's Re-derive. T6's opening pass runs
    under the new gate: a place is made for each selected access where the switch rose above 0; where it fell to 0 none
    is made, and each old place is retired by the carry-over. These are fates of the edit (V4 §3.10; J-V4.121)".
  - Its *byte-identical* cell reads: "what the stages before that first reader stage commit".
- **§3.10's list and §1b.2's row.**
  - The entry "an `editTable` or `editPreset` that moves the resolved `fabric.extensionWeight` … across 0, over every
    standing access the pass selects — raised above 0, their places made; lowered to 0, every opening place tombstoned"
    reads: "the re-derivation that an `editTable` or `editPreset` of volume 1's stage-2 switch makes (V1-3.15), at its
    T6: raised above 0, the places made; lowered to 0, none made and the old ones retired by §6.3's carry-over".
  - §1b.2's "tombstoned with its host or when the switch falls to 0" reads "… or retired by a switch edit's
    re-derivation (V1-3.15)".
- **J-V4.121.** "to make the switch's own edit a commit of V4 §3.10's list: an `editTable` or `editPreset` that raises
  the resolved switch above 0 runs the pass over every standing access it selects … one that lowers it to 0 tombstones
  every opening place" reads "the switch's own edit being volume 1's re-derivation (V1-3.15), whose tail's T6 runs the
  pass under the new gate". "within §6's per-access budget" is deleted, because the edit is priced as the re-derivation.
- **§12's round-5 PLAUSIBLE entry and §13's hand-off** cite V1-3.15's *The switch's edit* (SLR5-02) in place of "volume
  1 does not yet state the edit's transition" and "may state".
- **T-V4-74 (b).** Its switch clauses keep their assertions (0 places at 0; after 0 → 1, the places equal the selection;
  each place a fate, restored by the undo). It adds: "the underground re-derived with the ground by T1–T8, never held
  byte-identical".

Volume 1's words are **SLR5-02**. This row holds whether volume 1 keeps its row's first-reader re-derivation or narrows it
by §7.6's slice rule, because it cites V1-3.15 rather than naming a stage.

### SLR5-02 — minor — owner V01 — volume 1 states no transition for its stage-2 switch's edit, and its opening place "lives exactly as long as its host"

**Claim.** Two volume-1 texts do not match what V04's J-V4.121 now builds on volume 1's step.
- **No transition.** V04 makes the switch's edit a commit of volume 1's opening pass, and hands volume 1 the rest (V4
  §13: "V1-2.7's `HoodPlace` lifecycle and V1-3.15 may state the stage-2 switch's edit"). V1-3.15 says only that the
  gated steps "run only while it is > 0". It names no edit, no re-derivation and no fate. So a builder of the edit has
  only V1-2.7's generic `hood.constants` row, and cannot tell from volume 1 what becomes of the places, pins, typed
  blocks and template seeds.
- **The place's lifetime.** V1-2.7's `HoodPlace (opening)` row reads "lives exactly as long as its host `AccessPoint`:
  re-derived with it by the same pass in each such commit, tombstoned with it". V1-3.7.1 reads "it lives exactly as long
  as its host (V1-2.7)". V04's rule (as SLR5-01 corrects it, and as it stands now) retires the place while its host
  stands, when the switch falls to 0. It makes the place anew for a standing host when the switch rises.

**Required change (V01).**
- **V1-3.15 gains a bullet, *The switch's edit*:** "An `editTable` or `editPreset` that changes the resolved
  `fabric.extensionWeight` re-derives from the switch's first reader stage, S2, whose land estimate reads `λ_b`
  (V1-3.5.9). The re-derivation uses §6.3's carry-over, and its fates are listed in the dry run (V1-2.7's `hood.constants`
  row; §7.6). S7c's weights, S9b, the local-place step and the hood pins run, or do not, under the new value. What they
  made before and do not make again (template seeds, typed blocks, places, pins) is retired by the carry-over. The
  underground tail runs after the ground, and its T6 runs the opening pass under the new gate (V04 §3.10; J-V4.121). The
  edit's undo restores the document as it stood."
- **V1-2.7's `HoodPlace (opening)` row** reads "lives as long as its host `AccessPoint` while the local-place step runs
  (the stage-2 switch > 0, V1-3.15): re-derived with it by the same pass in each such commit, tombstoned with it, retired
  by a switch edit that lowers the switch to 0 and made again by one that raises it (V1-3.15; V04 §3.10)".
- **V1-3.7.1's sentence** reads "it lives as long as its host while the step runs (V1-2.7)".
- **T-V1-4 adds:** "in the default preset, an `editTable` lowering `fabric.extensionWeight` from 1 to 0 leaves 0
  `HoodPlace`s and 0 typed blocks, each retired place and block listed among the edit's fates. Raising it back to 1 makes
  the places V1-3.7.1 selects, opening places included (T-V4-74 (b)). The undo of each restores the document byte for
  byte."
- **A decision, J-V1.101,** records the choice. If volume 1 narrows the edit to §7.6's slice rule instead of the
  first-reader re-derivation, the bullet names that rule, and SLR5-01's V04 text holds unchanged, because it cites this
  bullet.

### SLR5-03 — minor — owner V01 — a shrink "re-derives no district", yet a shrink is where the claim is re-searched

**Claim.** Round 4 wrote SLR4-01's shrink sentence without SLR4-02's exception, and volume 1 landed it as written.
- **The sentence.** V1-3.10.3 (6) (c): "**A shrinking resize, and each stretch a reshape moves inward**, gives no face
  and re-derives no district".
- **The budget.** V1-6's sky row: "… at most k ≤ 3 in all, and a shrinking resize none (its plot clearing, re-cut and way
  cut-back are volume 5's, V05 §6)".
- **What volume 5 and the tests say.** The next paragraph re-derives the district whose claim is re-searched, "for the
  claim alone" where it receives no face. A shrink is the event most likely to leave the claim without room (V5 §4.2 floors
  the area there). V5 §4.2 *Shrinking* says it plainly: "no district is re-derived but the claim's where the claim is
  re-searched". V5 §6 prices it, and both T-V1-21 and T-V5-14 count it.
- **The risk.** Read alone, the shrink sentence and V1-6 contradict all three, and a builder pricing or asserting a
  shrink from V1-6 would miss the claim's district.

**Required change (V01).**
- (6) (c)'s sentence reads "… gives no face and re-derives no district but the claim's, where volume 5 re-searches the
  claim (below)".
- V1-6's sky row reads "… and a shrinking resize none but the district whose claim is re-searched, where one is (its
  plot clearing, re-cut and way cut-back are volume 5's, V05 §6)".

V05's own inward-reshape sentence has the same gap; it is **SLR5-06** (d).

### SLR5-04 — minor — owner V01 — file f stages the sky key's raster fallback at M5 "with item 580", but W8 does not name it

**Claim.** The fallback has a milestone in file f but no builder in volume 1.
- **What file f stages.** Round 4's SLR4-10 (a) asked file f to stage the sky key's raster fallback with item 580, and
  file f did: item 309 is "**STAGED (M5, stage 2, with item 580)** for the sky key's raster fallback, read by volume 1's
  island bridge build". Item 580 is "built by volume 1's W8 on a fixture island". The base's M3a part of item 309 builds
  `levelledGroundCm` on the ground arena only.
- **Where volume 1 is silent.** W8's row lists the partition, "its crossing-site spans and their bridges built after S8",
  `plantRimWalk` and the after-generation runs, but not the reader's dispatch on a sky key. §1b's crossing-site row names
  the feed and no builder. So the M5 bridge build calls a key the M5 build has no code for. This is round 4's omission:
  its required text named the milestone and not the work item.

**Required change (V01).**
- W8's row adds: "`levelledGroundCm`'s dispatch on a sky key with its raster fallback — the island's terrain raster,
  nothing levelled before S10 (file f item 309's M5 part, built with item 580; BCR-V5-30). Volume 5 adds the island's
  datums at M6-sky".
- §1b's crossing-site row's feed reads "`levelledGroundCm` on the island's key (BCR-V5-30; its raster fallback built in
  W8, file f item 309), read for `deckCm` by the after-S8 build".

### SLR5-05 — minor — owner BASE-F — item 313 carries V01 BCR-10 as two rows, without the rim walk's row and the `Greenery.along` change

**Claim.** The rim walk's base row, the hook where volume 1's `plantRimWalk` plants volume 5's rim walk, is missing from
the item that carries its request.
- **What the request holds.** V01's BCR-10 has four parts:
  - the court-greening row and the green-and-yard-blocks row;
  - the parks row widened to a green block's or a `park` plaza's green at any size;
  - (c) the rim walk's row ("planted once per island by volume 1's `plantRimWalk` (V1-3.10.3 step 4), never by a
    district's S12b");
  - §2.7's `Greenery.along.way` made optional for that row.
- **What the item carries.** File f item 313: "V01 BCR-10 (V01 §10) — two greenery rule rows: court greening and the
  template's green. *Needed by:* V01. **STAGED (M5, stage 2).**"
- **The gaps.**
  - No rim-walk row, no parks row, and no §2.7 among the parts the item touches.
  - No V05 on the *Needed by*, although J-V5.26 and V5 §3.12 consume the rim walk.
  - "the template's green" names neither of BCR-10's rows.
- **Why it matters.** A coherence pass applying file f would leave `Greenery.along.way` required. The rim walk's
  `street_trees` row, which has no way, would then have nowhere to go. Volume 1 logged this for the base-change lane
  (V01 cross-volume note (36)). `reconcile-BASE-F-r5`'s brief predates the note, so the item is unchanged.

**Required change (BASE-F).** Item 313 reads:

> **313.** V01 BCR-10 (V01 §10) — §4.9's greenery rule table: the court-greening row and the green-and-yard-blocks row;
> the parks row widened to a green block's or a `park` plaza's green at any size; (c) the rim walk's row, planted once
> per island by volume 1's `plantRimWalk`, never by a district's S12b; and §2.7's `Greenery.along.way` optional for that
> row alone. Also touches: §2.7. *Needed by:* V01, V05 (the rim walk, J-V5.26, V5 §3.12). **STAGED (M5, stage 2; the
> rim-walk row and the optional `way` built by volume 1's W8 on a fixture island, in use on real islands with M6-sky).**

### SLR5-06 — minor — owner V05 — landed halves still marked open; the sky key's fallback called "S1's raster"; the inward reshape without the claim's exception

**Claim.** Four small mismatches remain on volume 5's side of this seam. Round 4's TV-06 established that a landed
counterpart left marked open is a finding.
- **(a) §12's round-5 paragraph.** It holds "PLAUSIBLE until volume 1's round-5 lane lands: V1-3.10.3 step 4's
  island-level `plantRimWalk` … and (6) (c)'s *A re-searched institution claim* …". `reconcile-V01-r5` landed at 12:40,
  after this volume's lane (12:39), in the words V05 cites (V01 md5 15a69be1…). The mechanism is read in step 4, (6) (c),
  V1-3.9, V1-6 and T-V1-21.
- **(b) §13 items 30 and 31.**
  - Item 30 reads "they land with that lane".
  - Item 31 reads "The integrator adds volume 1's island bridge build to file f item 309's readers". `reconcile-BASE-F-r5`
    landed that at 12:39, in BCR-V5-30's words, with the label split and item 580's note.
- **(c) §1b's `levelledGroundCm` row.** Its producer cell reads "else S1's raster with the T2 terrain strokes". On a sky
  key no S1 runs (V01 V1-3.10.3 step 1: "SKY already wrote the island's L0 land, water and terrain"). BCR-V5-30's own
  text says "the unlevelled raster there", and volume 1 says "the island's own raster there".
- **(d) *Reshaping the rim*.** It reads "each that moved inward a shrinking resize's, which gives no face and
  re-derives no district". *Shrinking*, beside it, excepts the claim's district. This is the counterpart of SLR5-03.

**Required change (V05).**
- **(a)** §12's round-5 PLAUSIBLE clause moves to CONFIRMED: "landed with `reconcile-V01-r5` (12:40): V1-3.10.3 step
  4's `plantRimWalk` and (6) (c)'s claim re-search, read there, in V1-3.9, V1-6 and T-V1-21".
- **(b)** Item 30 reads "**Landed** with `reconcile-V01-r5` (12:40)". Item 31 reads "**Landed** with
  `reconcile-BASE-F-r5` (12:39): item 309's reader clause in BCR-V5-30's words, its label split (the M5 raster fallback
  with item 580, the M6-sky datums), and item 580's note".
- **(c)** The producer cell reads "… else the arena's unlevelled raster — S1's with the T2 terrain strokes on the ground;
  on a sky key, the island's terrain that SKY writes (V5 §3.8) with the T2 strokes, its fallback from M5 with volume 1's
  W8 (file f item 309)".
- **(d)** The sentence reads "… which gives no face and re-derives no district (the claim's aside, re-derived where its
  claim is re-searched, above)".

## 4 Disposition summary by owning volume

| owner | blocker | major | minor | findings |
|---|---|---|---|---|
| V04 | 0 | 1 | 0 | SLR5-01 |
| V01 | 0 | 0 | 3 | SLR5-02, SLR5-03, SLR5-04 |
| V05 | 0 | 0 | 1 | SLR5-06 |
| BASE-F | 0 | 0 | 1 | SLR5-05 |
| **total** | **0** | **1** | **5** | 6 |

**What held.** All ten of round 4's issues are closed on every side of the seam, and no counterpart half was lost:
- the rim walk is one island-level pair, re-planted whole by `plantRimWalk` after any rim change and never by a district,
  in V01, V05 and V06;
- a re-searched claim releases the island institution from V1-3.9's fixed inputs for one event, in V01's and V05's
  same words;
- the island bridge's `levelledGroundCm` read is on V05's reader list, V01's wiring row and file f items 309 and 580;
- the dwelling closure's opening rungs are in V4 §3.10's one list, and the pass's gate names the stage-2 switch on both
  sides;
- the access symbols are keyed by `accessSymbolKind`, twelve values checked against the base, with T-V1-4 holding the
  columns;
- a well access sits at the plot's well pin;
- V06 prices every resize from V05 §6's row by name;
- file f's item 251 names volume 1.

Round 5's new mechanisms also meet at the seam: the one commit's order, the yards under one operator, and the resize's
price in V01, V05 and V06. The underground and the sky still never meet: V04 reads no sky entity, and V05's gate change
(TV-04) adds no member that V04's closures read.

**What this round found.** Two kinds of fault remain.
- **A decision one lane took beyond its brief, on a mechanism the other volume owns (SLR5-01, SLR5-02).** V04's
  J-V4.121 made volume 1's switch edit a narrow commit of the opening pass and held the underground byte-identical
  through it. Volume 1's rows re-derive that edit from S2, and volume 1 states no transition of its own. This is the one
  major finding, and V04 already flagged it as a hand-off.
- **Round 4's own required text, composed without its sibling's exception or builder (SLR5-03, SLR5-04), plus the
  statuses and one base item that lag (SLR5-05, SLR5-06).** SLR4-01's "re-derives no district" missed SLR4-02's claim
  district. SLR4-10 (a)'s M5 staging named no work item. Item 313 predates volume 1's note (36).

**Advice to the reconcile lanes (not a finding).**
- **Volumes 4 and 1.** SLR5-01 and SLR5-02 name one edit. V04's text cites V1-3.15's new bullet rather than a stage, so
  either lane may land first. Whichever lands second reads the other's words and logs the check.
- **Volumes 1 and 5.** SLR5-03 and SLR5-06 (d) are one exception in two volumes. Each lane edits only its own sentence.
- **Volume 1 and file f.** SLR5-04's W8 words and SLR5-05's staging parenthesis both name W8 as the builder. Use the
  same words.

**Observed outside this seam (not raised here).**
- V01's `HoodPlace` identity for the rim walk's pair is keyed "by the island's derivation unit and the strip"
  (V1-3.10.3 step 4), but V1-2.8's key has no strip component (the island, S12b, indexes 0 and 1). This is internal to
  V01, and harmless while an island has one strip.
- V1-3.8.8 glosses `door` only as "an arch vault's infill", whereas the base's §2.6 comment makes `door` one of item 64's
  basement accesses. Both are building- or vault-hosted and never reach the symbol, so the enum is right. This is
  internal to V01.
- V05 §4.2 serves a re-claimed yard's plots by §7.3's local operator, and its *Shrinking* also clears the plots that lose
  half their face to that yard. The two rules name one set of plots in a shrink. This is internal to V05, and volume 1
  cites both without a conflict of its own.

**CONFIRMED versus PLAUSIBLE.** CONFIRMED by reading the inputs at the md5s of §0: every changed line as a whole diff
against round 4's inputs (backups checked by md5), and the seam's core sections on the live files. Every absence claimed
above is a whole-file grep:
- **SLR5-01:** V4 §4.3's switch row, §3.10's list entry, §1b.2's row and J-V4.121 as quoted; V4 §4.3's ground-edit and
  `adjust` rows; V4 §3.10's closure of a demolished building's basement access; V1-2.7's `hood.constants` row; V1-3.15's
  switch bullet (`λ_b` 0); V1-3.5.9's `(1 + λ_b)` on S2's land estimate; V4 §12's "does not yet state" and §13's "may
  state".
- **SLR5-02:** 0 V01 hits for a switch edit ("switch's edit", "switch edit", "edit of the switch"); 2 hits for "lives
  exactly as long as its host" (V1-2.7, V1-3.7.1).
- **SLR5-03:** (6) (c)'s shrink sentence and V1-6's "a shrinking resize none"; V5 §4.2 *Shrinking*'s exception; V5 §6's
  row; T-V1-21's and T-V5-14's counts.
- **SLR5-04:** 0 hits for `levelledGroundCm` in W8's row; item 309's split label and item 580's "built by volume 1's W8".
- **SLR5-05:** item 313's text (0 hits for "rim"); V01 BCR-10's four parts; V01 note (36).
- **SLR5-06:** V5 §12's round-5 PLAUSIBLE clause; §13 items 30 and 31; the three landing lines in
  `docs/lane-events.log` (V05 12:39, file f 12:39, V01 12:40); line 401's "else S1's raster"; V01 V1-3.10.3 step 1.
- **§1:** each status, against the anchors quoted there; `AccessSymbolKind`'s twelve values against base line 15 876's
  nine kinds and item 554's three.

PLAUSIBLE, by reasoning rather than execution:
- J-SL5.1's premise, that unchanged text can break the seam only where a changed line meets it;
- SLR5-01's consequence, that a switch edit over a document with voids changes the underground's accesses and
  excavation reading. It is read from V04's own ground-edit and closure rows, and no bar exercises it;
- that S2 is the switch's first reader stage. It is read from V1-3.15 and V1-3.5.9. If volume 1 meant the land term to
  stay on under a switch at 0, the first reader is S7c inside S7b (1), and SLR5-01 holds unchanged.

The required changes' design choices are proposals for the owning lanes, and are PLAUSIBLE:
- the switch edit as a re-derivation from its first reader stage (SLR5-02), which is volume 1's own row applied;
- V04's row citing V1-3.15's bullet rather than a stage (SLR5-01);
- W8 as the fallback's builder (SLR5-04);
- item 313's staging parenthesis (SLR5-05).
