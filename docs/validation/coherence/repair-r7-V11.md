# Repair round 7 — V11 (the content system) — lane coherence/repair-V11-r7

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-V11-r7; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/repair-V11-r7`, 2026-10-02)
- [x] P0 brief read whole; fresh run (no output, no LANDED line); skeleton written
- [x] P1 adjudication-r7: How to read, contents, Part A, R7-01, Part L whole (terms, laws 1–4, the check, the seven
  corrections, the restated veto list), R7-02 (banner, owner rules, the old veto list, *Strips, zones and nearest points*,
  the held building's widened strip), R7-05, Part H's head and Part H · V11 (and · V07, · V12 for the shared sites), Part P
  rows naming V11 (PRB7-09, PRB7D-TIM-10, PRB7G-TIM-05, *J148 applied*'s withdrawn "a gate or tower moved along")
- [x] P2 issue source (verify-vol-V11-V12-r6t, VV1112-r6-02 with its evidence) and live V11 read whole at every site:
  §1b (W50, W78), §2.10 (the item-110 pattern and its exceptions row), §3.1 (*Readers*, row 80), §3.24 whole (§3.24.2's
  readers, `structure` cells, the span cells' readers), T-V11-1, §8's C3b note; V07 §3.5a whole; V12's
  `raisedWays.structure` and span-rule lines (E-V12-1's anchors); the set's other `stripMarginM` readers (V01, V06, V07,
  the base)
- [x] P3 four REPLACE blocks built from the live file by count-asserted substitutions
- [x] P4 checks: an independently written applier's dry run on a copy, ids, review-id and deferral scan, doc_checks
- [x] P5 report, result JSON, LANDED

## Summary

* **Blocks:** 4 `REPLACE` blocks on `docs/volumes/V11-content.md`: ### 1b, ### 2.10, ### 3.1 and ### 3.24. There are no
  retitles, inserts or appends. **Ruling requests: 0. Hand-offs: 0.**
* **Live file** (assemble-r6's output): `docs/volumes/V11-content.md`, sha256 `0e2767c1b7ec…`, 5,465 lines. Each REPLACE
  body is the live subsection with count-asserted substitutions; every other line is verbatim. 8 live lines change.
* **Binding rulings applied:** Part H · V11 (VV1112-r6-02 FIX, amended; the §3.24.2 END; E-V11-1 with its J146 pass-4,
  J148 and pass-7 amendments); R7-05's last paragraph (row 80 and W50 name every reader of `structure.stripMarginM`);
  Part H's head (J146: each citation written as "§2.7's laws" with the law's number, and each clause that restates a law
  written as that citation; J148/J149's rule for the rest); Part L (cited, never restated); R7-01 (2)'s sweep of blind
  spot (e), V11's registry readers. R3-01 – R3-03, R4-01, R5-01 and R6-01 stand. No ruling, probe or verifier id is
  written into design text.
* **Not touched:** V11's held issue VV1112-r6-03 (held for round 8). §2.10's "what the user drew, declared or set is
  held" and the `span` exception's "held `use` edits kept" are readers of the lock outside the family's meetings, so they
  keep their words until round 8 (J147, J150; Part A; round-7 note (e)).

## Issues → where fixed (1 routed id: 1 FIXED; none MERGED or INVALID)

| id | disposition | where |
|---|---|---|
| VV1112-r6-02 | FIX, amended (Part H · V11; R7-05) | (1) **§3.1, row 80's reader cell.** "S5a and S7 (a wall meeting a raised way's under-deck strip at `structure.stripMarginM`, §2.7's crossing table, §4.4 S5a, §4.8;" → "S3, S5a and S7 (a wall meeting a raised way's under-deck strip, and its fixed-place zone, at `structure.stripMarginM` — S3's trace at a regeneration among them — and each span's soffit by `structure.span.deckDepthCm`, by §2.7's laws, law 1 (2), (4)–(7), its worked example the crossing table, §4.2 S3, §4.4 S5a, §4.8;". After VS4's entry it adds "VS3 (the palisade meeting a raised way's under-deck strip, and its fixed-place zone, at `structure.stripMarginM`, and each span's soffit by `structure.span.deckDepthCm`, by §2.7's laws, law 1 (2), (4)–(7), V07 §3.5a (4)), VS5, VS6 and S10 at the village rungs (no toft yard part or building in the under-deck strip at `structure.stripMarginM`, V07 §3.5a (5)),". (2) **§1b, W50's consumer cell.** "§2.7's crossing table at S5a and S7 (`stripMarginM`)" → "§2.7's laws at S3, S5a, S7 and VS3 (law 1 (4)–(6); its worked example the crossing table), V07 §3.5a (5)'s VS5, VS6 and S10 (`stripMarginM`)". (3) **Root cause.** The same readers are added to V11's other two lists of the margin's readers, so the omission cannot recur there (Notes 4–5). |

## END lines written (Part H · V11)

| END | where | text, and each J146 change (Part H's head) |
|---|---|---|
| §3.24.2's readers (amended, PRB7-09) | ### 3.24, `raisedWays`' readers line | Given: "(`stripMarginM`, §4.6; a wall meeting it by §2.7's crossing table, its gates and towers kept out of it, its fixed places out of the fixed-place zone it bounds, and a held thing's reshape bounded by it)". Written: "(`stripMarginM`, §4.6, which V07 §3.5a (5)'s village stages read too; a wall meeting it by §2.7's laws, law 1 (4)–(6), its worked example the crossing table — its gates' and towers' footprints read against it, law 1 (5), its fixed places against the fixed-place zone it bounds, law 1 (6), and a held thing's reshape bounded by it, law 2 (a)–(b)'s reach)". Changes: (a) the crossing table is cited with "§2.7's laws, law 1 (4)–(6)" before it. (b) "its gates and towers kept out of it" restates law 1 (5), so it becomes the citation of what is read; "kept out" also drops law 1 (5)'s over-crossing case under an aqueduct (J149, Part H's *one rule for the rest*). (c) "its fixed places out of the fixed-place zone" restates law 1 (6), so it becomes the same form of citation. (d) "a held thing's reshape bounded by it" stays, citing (G1) as correction 4 reads it: law 2 (a)–(b)'s reach. (e) The village stages are added (Note 4). |
| E-V11-1 (J146, pass 4; amended, J148; amended, pass 7) | ### 2.10, the "— exceptions to the pattern" row (live l. 863) | (1) The `raisedWays.structure.stripMarginM` clause, after "… with the relocate offer as the pattern keeps it", adds "— and every meeting the widened strip, zone or ends make with a wall-like structure resolved by §2.7's laws (law 4; law 1 (11), J148; law 2 (a)–(c), by hand the edit refused), never kept against them". Change: the given "law 4: no gate, postern, tower or fixed place moved — J148 —" restates law 1 (11), so it is written as the citation "law 1 (11), J148". The rest is as given. (2) New exception, as given: "§4.8's band and setback rows, `palisade.bandM`: an edit that widens a wall's band or strips resolves each meeting it makes with a raised way by §2.7's laws (law 4), as `stripMarginM`'s does". (3) New exception, as given: "`raisedWays.structure.span`'s `deckDepthCm` (every span's soffit) and the rows that give a wall's top (`walls.barriers`' class rows, the curtain's values, V07 §3.4's village rows): an edit that moves a soffit or a wall's top re-checks each crossing whose form, clearance or cap it changes by §2.7's laws (law 4; law 1 (2), (5), (7), (10)), as `stripMarginM`'s does". Both new items follow the `stripMarginM` item, so "as `stripMarginM`'s does" reads against its neighbour. |

## Notes on the texts (each vetoable)

1. **The VS3 gloss** in VV1112-r6-02's required change, "its line bent clear of the under-deck strip at
   `structure.stripMarginM`", restates the bent-group sentence, which is law 2 (a) with law 3 (correction 4). It also
   contradicts the laws. Under law 1 (3)–(4), a palisade laid after a road deck crosses the strip, entering on one long
   side and leaving by the other. Under law 1 (2), it meets an aqueduct over or merged by the aqueduct's level (J149). It
   is bent only where its line would otherwise be unlawful. The gloss is therefore written as the reader's citation:
   "the palisade meeting a raised way's under-deck strip, and its fixed-place zone, at `structure.stripMarginM` … by
   §2.7's laws". A palisade's anchors and water gate are fixed places, so the zone is read at the village too (E-V7-1's
   river-village clause).
2. **The soffit beside the margin.** E-V11-1's second exception and E-V12-1 make `structure.span.deckDepthCm` a cell
   §2.7's laws read (law 1 (2), (5), (7)). The wall stages that apply those laws (S3, S5a and S7; VS3 at the village)
   read it from row 80, and the row is the one list of readers (E-34). Row 80's S3/S5a/S7 and VS3 entries therefore name
   "each span's soffit by `structure.span.deckDepthCm`" beside the margin, and cite law 1 (2), (4)–(7). No reader is
   added (all four stages are row-80 readers by the margin already), so T-V11-1 (b)'s pairs are unchanged.
3. **S3** (Part H's amendment) reads the margin through the fixed-place zone and the strip. Its weld filter keeps a
   castle's weld vertices clear (S3 (8)), its gates and boundary meet a kept or declared raised way (S3 (6)–(7)), and its
   trace meets one at a regeneration. The cell cites S3's home, §4.2, beside §4.4 S5a and §4.8. "S3's trace at a
   regeneration among them" is written as given, between dashes, so the citation list after it still parses.
4. **Root cause: the margin's other reader lists in V11.** V11 lists the margin's readers in two more places: §3.24.2's
   `raisedWays` readers line and the `stripMarginM` cell. Each omitted the same readers. The readers line adds "which V07
   §3.5a (5)'s village stages read too" (it already covers VS3 by "a wall meeting it"). The cell adds "V07 §3.5a (5)'s
   strip, and §2.7's laws' strip, ends and zone, law 1 (4)–(6)". These are the three terms of Part L that the margin
   widens: the strip, the ends, and a road deck's zone.
5. **Root cause: the span cells' readers.** §3.24.2's *span rule's cells* readers line adds "and `deckDepthCm`, every
   span's soffit, by §2.7's laws, law 1 (2), (5), (7)". These are the words E-V12-1 writes into V12's span-rule line, so
   the two volumes agree (principle (10)).
6. **The way-and-channel citation** in the `clearWidthM`/`squareDeg` cell, "(§2.7's way-and-channel table, rows
   (a)–(b))", becomes "(§2.7's laws, law 1 (1), (8); its worked example the way-and-channel table, rows (a)–(b))". This
   is the citing form of Part H's head, and it uses the laws R7-02's banner maps that table to. The cell already names
   §4.3's crossing rule at its head.
7. **W50's consumer column.** The §1b lead keeps that column for consumers that read no table, yet W50 has listed stage
   readers since before this round. The cell is conformed as R7-05 and the FIX rule it ("W50 as written"), adding only
   S3 to the required change so that it agrees with row 80. Reducing W50 to "row 80" would be an elegance change that no
   ruling makes this round, so it is not made.

## Observation for the adjudicator (not a hand-off; nothing in V11 needs it)

E-V12-1 has V12's `raisedWays.structure` line say the margin is "read … by §2.7's laws — the strip, the ends, the zone
and a held building's strip of their terms". Part L defines *a held building's strip* as "the strip of a `vault` span …",
and *a span's strip* as "the span rule's … without that margin". R7-02 also defines the held building's widened strip as
"that span's own strip (the span rule's, between its piers' inner faces …)". So a held building's strip does not read
`stripMarginM`. V11 therefore names only the strip, the ends and the zone (Note 4). If V12 lands E-V12-1 as given, the
two volumes differ by that one term. That would be a minor in V12's END text, not in V11's.

## Checks

* **Dry run.** A second applier, written separately from the edit script, applied the four blocks to a copy of the live
  file (`=== REPLACE <heading> ===` replaces the heading's section up to the next heading of the same or a higher level,
  keeping the blank separator). The result is byte-identical to the expected file the edit script builds directly: 5,470
  lines, sha256 `67c7c0b837e1…`. Exactly 8 live lines differ (208, 863, 1006, 3908–3909, 3957, 3962, 3984); every other
  line is verbatim. No other round-7 repair file writes V11 (searched), so the blocks meet no concurrent block.
* **Ids.** None added or removed: T-V11-* rows 49 → 49, J-V11.* rows 120 → 120. Every pointer in the changed text
  resolves to a live heading or to a home this round writes: §2.7 and its laws (E-M1), §4.2, §4.3, §4.4, §4.6, §4.8,
  V07 §3.4, V07 §3.5a (3)–(5), V01 §3.17.3 (2), V06 §3.19, T-V11-1.
* **Design-text scans** over the changed lines: no review or ruling id (R7-nn, PRB…, a verifier id, the "(amended …)",
  "(J146 …)" or "(J148)"–"(J151)" markers), no narration, no deferral wording, no phone screen. J148 is written once, as
  a design citation (allowed: J-rows).
* **doc_checks** (`--doc` the copy, `--heads docs/ARCHITECTURE.md`), live → dry run. The tool printed "reference corpus
  INCOMPLETE (missing: captures, research/patreon, research/devlogs, research/ftg-docs, research/external) — clean-room
  results are NOT authoritative", so these counts are PROVISIONAL. It exits 1 on both files, as every round does, for the
  standing unreviewed C3 runs.
  * C1 0 → 0, C2 0 → 0, C4 5 → 5 (0 unreviewed), S1 0 → 0.
  * S2 334 → 334, 33 unreviewed both, an identical list.
  * C3 305 → 308 (unreviewed 277 → 280). The three new runs are the citation numerals "§4.2 S3, §4.4" and "law 1 (2),
    (5), (7), (10)" / "law 1 (2), (5), (7). The". These are section and law numbers that happen to share token 3-grams
    with the corpus, not copied content. E-V12-1's identical "law 1 (2), (5), (7)" produces the same run.
* **Words** (`wc -w`): 110,391 → 110,696 (+305, +0.3 %). By block: §1b 4,730 → 4,747; §2.10 3,053 → 3,181 (E-V11-1's two
  exceptions and clause); §3.1 7,028 → 7,114 (row 80's readers); §3.24 5,849 → 5,929. All of it is the fixes' design text.
  No word was removed, so no shrink source applies and no cut over half needs a nuance audit. No content was thinned.

=== FILE docs/volumes/V11-content.md ===

=== REPLACE ### 1b Wiring table ===
### 1b Wiring table

Every new piece, what feeds it and what it feeds. For a table, *consumed by* cites its registry row, whose readers
(V11 §3.1) are the one list of the stages, phases and modules that read it (E-34); the column adds only consumers that are
no table readers (tests, the editor, the clerk, exports). *Base hook* names the base section it plugs into and the file f
item that carries this volume's change there.

| # | piece | produced by (fed from) | consumed by (feeds) | base hook | dossier field and derivation row |
|---|---|---|---|---|---|
| W1 | `TableSchema` registry (V11 §2.1) | `@plat/tables` source (`registry.ts`) | the compiler, the loader, the tables editor (V09), the docs generator (§14 `docs`), the provenance audit (M4) | §7.6, §14 (file f item 379) | — |
| W2 | authoring source files `src/<table>/*.json5` (V11 §2.2) | authors (V11 §8) | the compiler | §7.6 | — |
| W3 | the compiler `tables compile` (V11 §3.2) | W1, W2 | shipped `tables/<id>.json`, the manifest, the clean-room scan input, CI | §7.6, §17.1 (5) | — |
| W4 | `TableView` with derived family rules (V11 §3.3.4) | the loader over the override chain (§7.6) | every reader of every registry row; tagged per StageId in the integration suite (T-V11-1 (b)) | §4.1, §7.6 | — |
| W5 | `SitingProfile` on each class and profile family (V11 §2.3) | V11 §3.4 rows, the class deltas of V11 §3.5 | W4's family derivation; item 104's resolver; rows 17, 33; the clerk's "why" (V10) | §10.2 (file f item 432) | a dossier institution's class through V08's chain (DR24) |
| W6 | `RelationFamilyRow` table (V11 §2.4, V11 §3.3) | V11 §3.3 rows | W4's derivation of `fam/…` rows (row 34) | §4.7 S10b (file f item 433) | — |
| W7 | `SignaturePairRow` table (V11 §2.4, V11 §3.8) | V11 §3.8 rows | W4 (compiled into `sig/…` `RelationRule`s on both classes; row 35) | §4.7 S10b | — |
| W8 | goods columns on `ResourceRow` (V11 §2.5, V11 §3.7), `demand` included | V11 §3.7 rows | row 19; the compiler's orientation derivation (V11 §3.7.3) | §10.2 (file f item 434); §4.2 S2, §4.7 S10b (file f item 288) | `activeChains[].outputs` and mapping.md row 44's export, import, local-production and transit lists, resolved to goods by V11 §3.13.5's good-word rows (V08's adapter applies them) |
| W9 | balance, orientation, split, coverage columns (V11 §2.3) and `coverage.rosterWeight` | V11 §3.5 rows; `roster.settings` | rows 17, 24; V06's openings | §10.2 (file f item 432) | — |
| W10 | `LadderStepRow` table (V11 §2.6, V11 §3.12) | V11 §3.12 rows | row 66 | §7.7 T9, DR9; §10.2 (file f items 510, 520) | `institutions[].catalogId` → kind → step; `promotedFrom` / `demotedFrom` (V08) |
| W11 | `WallBarrierRow`, `WaterfrontThreatRow` (V11 §2.7, V11 §3.16) | V11 §3.16 rows | rows 14, 15 | §2.7, §4.2 S3 (9) (file f item 258) | stressors, `activeConditions[].archetype`, DR3's hostile sea partners, `config.monsterThreat`, `config.tradeRouteAccess` (mapping.md rows 10, 11, 49, 70) → V08's `threats` row set (V08 §2.6, J-V8.50) → the neutral threat key → this table → DR2 |
| W12 | `kinds` rows, 280 (V11 §3.11) | this volume | row 64 | §14 item 7 | `institutions[].catalogId` |
| W13 | `archetypes` 17, `categorySynonyms`, `keywords`, `generic-<family>` classes (V11 §3.13) | this volume; the compiler emits the generic classes | row 65 | §14 item 7 | `custom.sceneProfileId`, `category`, `tags`, name and `desc` words |
| W14 | custom-chain placement rules (V11 §3.13.4) | this volume | row 37 | §4.7 S10b | V08's `CustomChainRecord` |
| W15 | district-kind rows (V11 §3.9) | this volume | row 18; the whole-neighbourhood assignment (§7.7) | §10.2 `districtKinds` | quarter names through T6 (V08) |
| W16 | quarter-identity rows (V11 §3.10) | this volume | row 28 | §4.5 (4), §10.2 | district-defining kinds (T9), naming claims (item 82) |
| W17 | cover and concealment rows (V11 §3.14) | this volume | rows 17, 26; the knowledge filter of player views (§9.2; V11 §3.14.3) | §10.2 | `facets.clandestine`, `facets.subterranean` (V08 row 33) |
| W18 | sector, power-link, sector-link rows (V11 §3.15) | this volume | rows 29, 31 | §10.2 | `economy.incomeSources` (T13), `powers[]` (T15) |
| W19 | `EraRow` table (V11 §3.19.1) | this volume | row 50 | `CircumstanceSlice.era` (file f item 400) | `site.culture` → era by V08 §2.6's era row |
| W20 | `MaterialRow` rows (V11 §3.19.3) | this volume | row 49 | §2.6 | `materialFamily` of a custom record (item 104) |
| W21 | `ClimateRow` rows (V11 §3.17), with the farm-mode override `farmLayout`, item 111's dry-country cells, item 117's season cells and item 124's weather cells, and the table's `settings` row (V11 §3.17.1, V11 §3.25.1, V11 §3.25.6, V11 §3.25.11) | this volume | row 43 | §4.9; §4.2 S0, S1, S3 (6), §4.5, §4.7 S10b (item 111); §8.2 (item 117); §6.1, §8.2, §8.4 (i) (item 124) | `site.terrain`, `site.culture` → biome (the digest's `site` row, V08 §2.6; J-VI.25); the terrain type → biome by V08's `climates` row set (§7.7's DR42; item 125 (b)); `oasis_water` → the oasis (DR1) |
| W22 | grammar slices and descriptions (V11 §3.20) | this volume's grammar sources + authored corpora | rows 68–71; V05's island names, V01's local places and way names | §10.4 | claimed names (item 82) bypass the grammar |
| W23 | government, religion, household rows (V11 §3.21) | this volume | rows 21–23 | §10.2 | `government.name` (T14), `religion` (V08) |
| W24 | `villageForm` column fill (V11 §3.22) | this volume | row 17: V07 §3.11's substitution | §10.2 (file f item 430) | DR24 at village rungs |
| W25 | the table manifest, `dist/evidence.json` and the provenance report (V11 §3.2.1 step 7) | the compiler | the M4 provenance audit, release notes, the corpus stage (§13.9), the tables editor's cell inspector (V09 §4.14), V12's register lint | §13.9, §6.4 | — |
| W26 | row-level "why" ids (V11 §2.4) | W4's derivation | `PlacementSolver.explain` and its `WhyPull.row`, V06's `UseMove.why`, the clerk (V10), the siting panel (V09), `exportWhy` (W45) | §4.7 S10b (file f item 311) | — |
| W27 | the `crypt` column (`always` / `basement` / `never`), `cryptM2` and `crypt.rankShare` (V11 §3.5.8) | V11 §3.5.8 rows; `roster.settings`; a dossier crypt record or the `crypt` keyword binds `always` | rows 17, 24; V05's rim-slab vault; V09's crypt line, V10's why, V12's register | §10.2 (file f item 436); §2.6 | the cathedral records (`cathedral_10_000_only`, `great_cathedral`) and church records (V08 DR32) → classes by V11 §3.11; a dossier crypt record → `always` (V08) |
| W28 | the burial faces: the `churchyard` yard part of the `church` and `cathedral` families, the `burial` yard part of the `cloister` and `burial-ground` families, the `Cemetery network` COUNT row (V11 §3.6.1, V11 §3.12) | V11 §3.6.1, V11 §3.12 rows | rows 17, 66; V06's lineage keys, V07 §3.12's hand-off | §2.5 `YardPart`; §4.9's churchyard row | `burial_ground`, `graveyard`, `parish_burial_grounds`, `burial_grounds_and_charnel_house`, `cemetery_network` (V08 DR32) |
| W29 | the catacomb rows (`under.catacomb`: count, order, chances, `rankCap`, growth, fill, join, charnel; V11 §3.23.8) | V11 §3.23 | row 58a; V09's catacomb view, V10's why | II.7.6 (file f item 566); V04 §2.3's `CatacombRule` | the church count from church records and their ranges (item 108 (c); V08 T9 / DR9 over `dossier.ladders`) |
| W30 | the ruin rows (`under.ruin`: chances, significance, burial by age, the four ancient-culture rows, survival, the void-source rank, magic lights; V11 §3.23.2–V11 §3.23.6) | V11 §3.23 | row 58a; V12's `paired` and `twoSample` bars | II.7.5, II.7.6; V04 §2.3's `RuinRule` | `ancient_ruins` deposit, `ruined-landmark` records, `magical_node`, ley-line income rows, `history` events of type `magical`, `history.age`, delving institutions (V08's DR30–DR32) |
| W31 | the opening and dig rows (`under.openings`, `under.dig`; V11 §3.23.7) | V11 §3.23 | row 58a; V12's `voidSealedDeep` and `voidAccessible` bars | II.7.3 *Basement accesses*; V04 §2.3's `UnderOpeningRow`, `DigRule` | a ruin known to the dossier (`ruined-landmark`, `ancient_ruins` discovered) → `ruin_entrance` 1 |
| W32 | the cavern cells (item 109 (a)'s values; `miningCellShare` 0.02) | the base (item 109); V11 §3.23.1 | rows 9, 59 | §4.2 S1 (10) (`Terrain.mining`'s test) | `site.terrain: mountain` → mountainous (DR1); the mining deposits (V08) |
| W33 | the `naming.ruin` slice and the corpora `ancient.root`, `ruin.generic` (V11 §3.20) | V11 §3.20 grammar; corpora authored | row 68 | §10.4 | a civilisation named by `history` bypasses the grammar (item 82) |
| W34 | the `building.wingRole` slice (V11 §3.20.1) | V11 §3.20 | row 68 | §10.4 | — |
| W35 | the pseudo-class `@absent:<class>[+<class>]` (V11 §3.11) | V11 §3.11 rows | row 64: V08's DR24 routing → S2 zeroes the class's `min` and demand (at a village rung, the `v.` class that plays each named class through its `villageForm`, V07 §3.11 step 1) | §4.2 S2 (via V08) | `access_to_external_mill`, `access_to_parish_church` |
| W36 | hinterland land-use providers of a good's `site.landUse` | V11 §3.7.1's `site` column | row 19 | §4.2 S2, §4.7 S10b (file f item 288) | — |
| W37 | coverage units at a plot and the roster's coverage option | V11 §2.3, V11 §3.3.1, V11 §3.5.1 | S10b's `cov/<class>` term, S2's count draw at the base rungs (none at the `territory` rungs, V11 §3.5.1); V12 §3.6's `servedShare` over the same units | §10.2 (file f item 433) | — |
| W38 | feature classes `wall`, `wallInner`, `open:square`, `open:green`, `gate`, `harbour`, `raised:terminal` | S3 (the enceinte), S10 (0) (the inner setback band), S7b and S12b (squares, greens), S7 (gates), S3 (the harbour), the aqueduct generator (the terminal) | `resolveSiting`'s rows, S10b's rasters | §4.7 S10b (file f item 433) | — |
| W39 | relative `upstream`, `downstream`, `upwind`, `downwind` with a `to` | V11 §3.3.1's water family, the pairs | S10b's satisfaction | §10.2, §4.7 S10b (file f item 437) | — |
| W40 | `DistrictKindRow.affinity` | V11 §3.9 rows | row 18 | §10.2 (file f item 438) | — |
| W41 | `LadderStepRow.identity` and the QUARTER identity rows (V11 §3.10, V11 §3.12) | V11 §3.10, V11 §3.12 | rows 28, 66; V01's quarter records | §10.2 (file f item 439) | QUARTER records (V08 T9) |
| W42 | the `siting.declared` key forms and cells; `siting.linkEdits`' `{ bindTo?, avoid?, cut? }` (V11 §4.2) | V09's gestures (V09 §2.6), the clerk's accepted proposals (V10 §4.1) | row 76 | §7.6 (file f item 380) | never written to the dossier (item 20 (h)) |
| W43 | provenance sources `general ⟨practice⟩`, `sf:⟨file⟩@⟨baseline⟩`, the cell's `evidence` and `ownerRule` | authors; V12's accepted runs; the compiler's owner-rule stamp (V11 §3.2.1 step 4) | the compiler, the tables editor, the clerk, the M4 audit, `dist/evidence.json` | §17.1 (6) (file f item 534); §7.6 (file f item 381) | — |
| W44 | the id forms `drv/<driver>`, `bal/<class>` (V11 §2.4) | the field's driver table; W4 | §11.2's `WhyPull.row` and `FieldDrivers`, V09's siting panel | §4.7 (file f items 311, 297) | — |
| W45 | `exportWhy` (V11 §5) | the export options | GeoJSON and CityJSON writers | §11.1 (file f item 456) | — |
| W46 | the committed catalogue manifest `src/dossier/catalogue.<line>.json` with its `ladderPairs` and its crisis census (item 122) | V08's build step | row 77: the compiler's `coversManifest` rule and the ladder cross-check (T-V11-2); the `crisis.map` compile check over the census lists `crisis.stressors`, `crisis.archetypes` and `crisis.events` (T-V11-46 (a)) | §14 item 7 | the line's catalogue, the ladder file's pairs and its crisis words in V08 §2.4's manifest shape (V08 §3.5.1 (f)) |
| W47 | class tags (`profile family`, class id, `church-family`, `notice`, `riverbank`) and the derived `noxious` and `cluster` (V11 §3.5.1) | the compiler | row 17; §4.5 (2)'s plot mix, the notice posts, V06's church-family reads | §10.2 | — |
| W48 | `HeightsRow.attic`, `parapetCm`, `towerStoreyCm` (file f item 427), the role table (V11 §3.6.5), the `sky-*` district kinds and the landing rows (V05) | V11 §3.6, V11 §3.9, V11 §3.5.13 | rows 5, 17, 18 | §10.2, §2.6 | — |
| W49 | `terrace` and `retaining` (V11 §3.24.1), the relief column `terracedEdges` | V11 §3.24.1 rows | rows 9, 78, 79; V01's `levelledUnits`; V12 §3.4.2's `retaining.onFlatM` (0 by rule) | §2.7 `RetainingWall`, §4.7 S10–S11 (item 110 (a)); §4.2 S1 (file f item 289) | — (relief from the terrain row; a dossier `mountain` terrain is mountainous, DR1) |
| W50 | `raisedWays` with its `settings` and `structure` (V11 §3.24.2; `structure.stripMarginM` the under-deck strip's margin; `structure.clearWidthM` and `.squareDeg` §4.3's crossing rule's) | V11 §3.24.2 rows | row 80; V08's DR35 (its landmark threshold, W74); §4.6 S8's under-deck strip, V01 §3.17.3 (2), V06 §3.19's clearance, §2.7's laws at S3, S5a, S7 and VS3 (law 1 (4)–(6); its worked example the crossing table), V07 §3.5a (5)'s VS5, VS6 and S10 (`stripMarginM`); §4.3's crossing rule and V01 §3.17.3 (3) (`clearWidthM`, `squareDeg`) | §3.4's ground parts, §4.3, §4.6 (item 110 (b)) | the water-system record, the landmarks on high ground, `site.culture` (V11 §3.24.7) |
| W51 | `ways.crossing` (V11 §3.24.5) | V11 §3.24.5 rows | row 81; V10's why (`cross/<class>`) | §2.4 `WayClass` | — |
| W52 | `deck` and the compiled `deckOk` (V11 §3.24.4) | V11 §3.24.4 rows; the compiler (step 5a) | rows 17, 82; V10's why (`deck/…`, `deckok/…`) | §2.7 deck plots (item 110 (d)); §10.2 (file f item 432) | — |
| W53 | `deck.landmarks` and the classes `fort` and `lighthouse` with the template family `fort` | V11 §3.24.4, V11 §3.5.7, V11 §3.5.9, V11 §3.6.1 | rows 17, 83; `naming.landmark` (row 68); §5's fortified and institution symbols | §4.8 (item 106 (e)'s chain tower) | the waterfront threat key through V11 §3.16.2 (V08's `threats` row) |
| W54 | `roster.specialisations` and the `stepped-shrine` heights row | V11 §3.24.3, V11 §3.6.4 | rows 5, 84 | §4.7 S11, §2.7 `Use.specialisation` (file f item 259) | `site.culture` (V08 DR15) |
| W55 | the ancient-culture `monument` cells (V11 §3.23.4) | V11 §3.23.4 | row 58a | II.7.6 | the ruin's sources (W30) |
| W56 | `water` and `ClimateRow.rainMmPerYear` | V11 §3.24.6, V11 §3.17.1 | rows 43, 85 | §4.2 S1, II.7.6 (`cisternDistM`) | — |
| W57 | the feature class `raised:terminal` and the criteria row `pc/aqueduct/<way lineage>` | V11 §3.3.3; the aqueduct generator writes the row only on a `conduit_house` the roster or the dossier holds (else the terminal is a fountain pin) | S10b's placement of the one `conduit_house` bound to a cistern terminal; V04's terminal cistern under its yard | §7.7 `PlacementCriteria` (file f item 401) | the `aqueduct_or_water_system` record's bound conduit house (V08 §2.6b (1) (c)) |
| W58 | the era factors `aqueductM`, `raisedVaultM` and the culture `building` block (`aqueductM`, `elevatedM`, `raisedVaultM`) | V11 §3.19.1, V11 §3.20.3 | rows 50, 71 | `CircumstanceSlice.era` (file f item 400) | `site.culture` and the era V08 resolves |
| W59 | the structures decline block and the structure material keys (`retaining`, `raised:<kind>`, `pier`, `deck`), the wall materials `dry_stone`, `earth_bank`, `timber_crib` | V11 §3.18, V11 §3.19.3 | rows 46, 49; V09's style panel | §4.11, §2.6 `MaterialRow`, §8.2 | — |
| W60 | the naming additions: `naming.ruin`, `building.wingRole`, `naming.formerWall`, the `raised` guard, the fort, lighthouse and mole landmark forms, the `terraced` district feature, the `vaults` slice's arch-vault name, their corpora | V11 §3.20 | row 68 | §10.4 | a ruin civilisation named by `history` bypasses the grammar (item 82) |
| W61 | the owner items' switches and off forms — item 110's (`terrace.enabled`, `raisedWays.chance`, `deck.offer`, `roster.specialisations`, `deck.landmarks` chances, V03's `roomProgram` `exposureAllStoreys`) and items 111 and 113–118's (V11 §3.24.0) | V11 §3.24.0; the parity presets (§7.6) | every such reader's no-op path; T-V11-31, T-V11-38 – T-V11-43; V02's T-V2-50, V03's T-V3-34, V06's T-V6-65, T-V6-71, T-V6-73, T-V6-74, V07's pins; the NoOpPin registrations on V12 §3.7.8's engine (E-20) | §7.6; §13.2 | — |
| W62 | the `v.<id>` village namespace in `roster.classes` and the `villageForm` targets (V11 §2.9, V11 §3.22) | V07 §2.4's rows (their keys), this volume's column | row 17: V07 §3.11's substitution (DR24 at village rungs), the compiler's T-V11-3 clause, every table naming a village class (V07's supply, ladder and dig rows; V11 §3.5.8, V11 §3.23.8, V11 §3.24.3) | §10.2 (file f items 430, 432) | DR24 at village rungs |
| W63 | `GovernmentRow.villageSeat` (V11 §2.8, V11 §3.21.1) | V11 §3.21.1 rows, from V07 §3.11 DR11 | row 21: the `@seat` pseudo-class at village rungs (V07 §3.11 step 1); S2's government step at the territory rungs, which reads this column alone (V07 §3.2 (3)) | §10.2 (file f item 435) | `government.name` → T14's kind → this row (V08) |
| W64 | the archetypes' `village` cell (`ArchetypeVillageCell`, V11 §2.8, V11 §3.13.2) | V11 §3.13.2's column, V07 §2.4's values | row 65: V07 §3.11's item-104 reading (before `villageForm`); T-V7-21 | §14 item 7 (V08's `archetypes` shape) | `custom.sceneProfileId` |
| W65 | `WallBarrierRow.arcKind` and the closure-feature rule (V11 §2.7, V11 §3.16.1) | V11 §3.16.1 rows | row 14; V10's unwalled-arc answers, V12's `closure` features and file f item 447's export, V09's preview arcs (J-VI.3) | §2.7 (file f item 258) | the threats as W11 |
| W66 | the village naming slices `naming.villageEnd`, `naming.field` and the village features of `naming.settlement` and `naming.way` (V11 §3.20.1) | V11 §3.20's grammars; corpora authored; V07's VS8 ends, anchors and S12a fields as features | row 68; V07 §5.3's labels | §10.4 | a dossier's names protected (DR14) |
| W67 | the web's off form `web.off` and the switches `orientEnabled`, `splitEnabled` (V11 §3.7.4) | V11 §3.7.4 rows; the parity presets (§7.6) | row 36 through the loader (V11 §3.2.2); the web's no-op pin (T-V11-21), V06's T-V6-44, V12's bar map 105 (k) `noRegression` reference arm (V12 §2.7) | §7.6 | — (the dossier's own chains stand, item 105 (i)) |
| W68 | the preset entries on V11's cells (V11 §2.2's rule) and the `PresetId` union | V11 §2.2's rule; written at C2 and C3b (MFCG, FTG), with V07's V-M0, the milestone whose content ships the `VG` preset file (VG; V07 §8), and V02's M6c (FM) (V11 §8) | the compiler's preset check (V11 §3.2.1 step 4); the loader's preset step (§7.6's order) → the off forms of V11 §3.7.4 and V11 §3.24.0 under the zeroing presets, the stepped and deck families off under FM; T-V11-21; V12 §3.7.2 (3)'s run scope and V12 §3.7.6's emission target | §7.6 (file f items 376–377) | — |
| W69 | the bench-bar registrations of the bars V11's register entries name — the base's T16-4 and V11's T-V11-30, each a V12 `BenchBarDef` (V11 §8) | the seat landing C1 (T16-4, `owner` `'base'`) and the seat landing C2 (T-V11-30, `owner` `'V11'`), each in the change that writes the entry naming it | `plat parity`'s bar rows → the metrics `bar.T16-4` and `bar.T-V11-30` (V12 §2.1); V12's register lint (T-V12-20) over V11 §8's `detourFactor` line and V12 §3.11's item-102 line | §13.2 (T16-4's check); V12 §2.1 | — |
| W70 | the village-read scope of `VG` — the source manifest's `productStages.village`, the compiled `villageRead` flag per table and the manifest's `villagePresetCells` (V11 §3.2.1 steps 1, 4, 7) | the seat landing V07's V-M0 (the stage ids `ProductDecl('village').stages` registers, V07 §3.0, with its fallbacks' stages); the compiler over `REGISTRY`'s `readers` | the compiler's preset and off-form checks under `VG`; the loader's preset step under `VG` (V11 §3.2.2); V07 §3.15's `VG` cell list, checked complete against `villagePresetCells`; T-V11-9 | §7.6 (file f items 377, 581) | — |
| W71 | the registry's readers as StageIds, the source manifest's `stageIds`, the compiled `stageReaders` per table, the group entry `S5` (V11 §2.1, V11 §3.1's *Readers*, V11 §3.2.1 steps 1, 6, 7) | the seat landing each change that registers a stage (its ids into `stageIds`); the registry source | the compiler's reader check (step 6); the village-read test (step 4) and the loader's `VG` scope (V11 §3.2.2); V12's run scope and cost shortcut (V12 §3.7.2 (4), V12 §3.7.7); §7.6's invalidation; T-V11-1 (b)'s recorded reads | §4.1, §4.12 (the stage registry), §7.6 | — |
| W72 | registry rows 86–89 — `toolkit`, `messages`, `clerk.ops`, `clerk.content` | V09's and V10's rows (V09 §2.3, V09 §2.9, V09 §4.2, V09 §4.9; V10 §2.10, V10 §3.3) | rows 86–89; T-V11-1 (a)'s closure; T-V11-37's non-calibratable rule | §14 `@plat/tables` (file f item 516) | — |
| W73 | V04's dossier row sets `dossier.sanitation` and `dossier.subterranean` in registry row 63 (`owner` `'V04'`, every column `calibratable: false`) | V04 §2.3a's rows (DR17), shipped with V04 §8's content row (M6-U); empty before it (V11 §2.1's empty-table rule), so until then no record forces sewers or a system | row 63; T-V4-34, T-V4-38; T-V11-1 (a); T-V11-37 | §7.7 DR17 (file f item 386); §14 `@plat/tables` | the sanitation and subterranean records (kinds, tags, custom records' resolved profiles, `facets.subterranean`) → DR17 |
| W74 | `raisedWays.settings`' `elevated.landmarkMinSignificance` (V11 §2.8c, V11 §3.24.2) | V11 §3.24.2's row (20, the castle's significance) | row 80; V08's DR35 and T-V8-38; V12 §3.11's `raisedWays` settings line | §4.3, §4.6 (item 110 (b)) | the dossier-bound institutions' class significance (§10.2; item 72) → DR35 |
| W75 | `NG` in `PresetId`, its resolution and its compile scope (V11 §2.2, V11 §3.2.1 step 4, V11 §3.2.2) | file f item 584 and V01 §3.15 (the preset's definition); the seat landing V01's M5 (its entries on `hood.constants` and the `NG` preset file) | the compiler's preset checks under `NG` and its scope refusal (step 4); the loader's preset step under `NG` (V11 §3.2.2) → V01's NG harness (T-V1-31, B-REF's NG rows) and the M5 panel's NG pairs (T-V1-32); V12's `PresetArm` `'NG'` (V12 §2.1) | §7.6 (file f item 584, beside items 376–377) | — |
| W76 | registry rows 90–91 — `way.surface` and the base table `squares.quota` | V01's rows (V01 §3.7.3; V01 §3.5.2), shipped by V01's M2b pieces (V01 §8.1) | rows 90, 91; T-V11-1 (a)'s closure; V12's register (`squares.quota`'s entries at M2b) and run scope | §2.4 `Way.surface` (file f item 207); §4.5 S7b (3), §4.7 S9 (file f item 301); §14 `@plat/tables` (file f item 505) | — |
| W77 | the display cells — `label`, `icon?`, `synonyms`, `commonness` on every class row; `label`, `icon?` on the profile families, goods, district kinds, style sheets, patch materials and crisis looks (V11 §2.3, V11 §3.1's *Display cells*, V11 §3.25.9) | V11's source rows (the town-and-city and sky classes, the families, goods, kinds, patch rows, crisis look rows and the shipped sheets' words); V07 §2.4 (the `v.` rows); the compiler (a class's `icon` and `commonness`, the generic rows' cells) | V09's roster reader (V09 §4.16 (3)), T6's palette and T5's cards (V09 §2.3's `labelCell` / `iconCell`, V09 §4.5), the link view (V09 §4.7), the Material chip (V09 §4.21.4), the `refuse.roster.dossier` slot and the history template (V09 §4.9, V09 §4.16 (6)) rendered by V10, V08 §4.6's `unmapped_kind` and `custom_resolved` notes (T-V8-46), V09's Find (W87), V09's Show crises list and the legend's crisis look lines (W88; §8.2, §9.5), `@plat/docs`; V09 §5.1's sprite holds the 45 `fam.<key>` glyphs | §10.2 `BuildingClassRow` (file f item 432); §14 `@plat/tables` (file f item 516) | — (no dossier field feeds the words; V08's notes name the class a record is built as) |
| W78 | the span-rule and support-step cells `raisedWays.structure.span`, `.slideMaxFactor` and `.maxClearSpanM`, and `retaining.settings.stateSnapCm`, in V11 §2.1's settings form (V11 §2.8c, V11 §3.24.1, V11 §3.24.2) | the values of V11 §3.24.2 (file f item 244's span rule and support step; §2.7's clear-span bound) and file f item 245's snap (V11 §3.24.1), written by the seat landing item 244 at M3a | rows 79, 80; T-V11-1 (a) | §2.7's raised-way record and `RetainingWall` (file f items 244, 245); II.7.6's vaults (file f item 559) | — |
| W79 | the base settings row `base.settings` — `reroll.maxAdvance`, `crossing.searchBandM`, `index.gridCellM`, `view.zoomOutMarginStops` (V11 §3.1 row 92; J-V11.106, item 116) | V11 §3.1 (the base's values, one home) | row 92 | §3.3, §4.2 S1, §5.1, §6.3, §8.8 | — |
| W80 | item 111's dry-country cells (`ClimateRow.dry`) and the `garden` land-use row (V11 §3.25.1, V11 §3.17.2) | V11 §3.25.1 | rows 43, 44 | §4.2 S0, S1, S3 (6), §4.4, §4.5, §4.7 S10b, §4.9 | `oasis_water` makes an oasis (DR1); the desert terrain → `arid` (V08) |
| W81 | item 113's `history` cells and `history.events` rows (V11 §3.25.2) | V11 §3.25.2 | rows 93, 94; V09's History chip (`history.defaultAgeYears` is V09's) | §4.11 *History-first generation*, §7.7 DR36–DR39 | the history's events → V08's `historyEvents` neutral keys → these rows (DR37); floods, silt and rebuilding on top → the burial factors (DR39) |
| W82 | item 114's `walls.condition` cells and `walls.patchMaterials` rows (V11 §3.25.3) | V11 §3.25.3 | rows 95, 96 | §2.7 `Enceinte.condition`, §7.1 `repairWall`, §7.7's DR41 | the dossier's `readiness` label and wealth (V08) → the generation row |
| W83 | item 115's `grandeur.ceiling` rows and its `settings` row's `grandClasses` (V11 §3.25.4) | V11 §3.25.4 | row 97, port.digest among its readers (V08 §3.16 (3)'s "specified" test) | §4.7 S10b, §10.2 (item 115) | 'specified' is V08 §3.16 (3)'s reading |
| W84 | item 117's season cells and tables (V11 §3.25.6) | V11 §3.25.6 | rows 43, 98–101; V07's village year (V07 §5.1), V05's islands; V12's bars | §2.9 view state, §7.7's DR42, §8.2, §12.5 | the present week from the dossier's own stamped ticks and the climate by V08's `climates` row set (item 125) — §7.7's DR42 |
| W85 | item 118's festival tables (V11 §3.25.7) | V11 §3.25.7 | rows 102–105; V07's village decorations (V07 §5.1), V05's pennants; V12's bars | §2.9, §7.7's DR43, §8.2, §12.5 | `traditions[]` (window, staging, kind by V08's `festivals` row set) and `customContentRoster.traditions`; `site.culture` (from `config.cultureProfileKey`, V08 §2.4) and the deity — §7.7's DR43 |
| W86 | item 119's `perf.qualitySpend` rows (V11 §3.25.8) | a calibration change landing a measured gain (V12) | row 106 | §4.1, §12 (item 119) | — |
| W87 | Find's lexicon — the class rows' `label` and `synonyms` and the profile families' `findGroup` (V11 §2.3, V11 §3.4, V11 §3.5.15) | the source rows (V07 §2.4 for the `v.` rows); a class's group read through its family | V09's Find panel — its type-ahead, chips and grouped browse grid (item 120 (b), (c)) — through rows 17 and 33 | §11.2's gazetteer (item 120) | — (the dossier's institution names are V08's list entries, never lexicon words) |
| W88 | item 122's crisis tables — `crisis.looks` with its `settings` row (item 122 (h)'s rates among its cells) and the closed mapping `crisis.map` (V11 §3.25.9) | V11 §3.25.9; the `map` rows' words from V08's census at the pinned baseline (C4b) | rows 107, 108; V09's Show crises preview list and Find's list of looks (by `label`), V10's explanations, V12's item-122 bars; T-V11-46 | §2.7 `ConditionOverlay`, §7.7's DR44, §10.2 *Crisis looks*, §8.2, §8.8, §12.5 | a standing overlay's source word (V08 §3.16 (7) (b): a stressor's `type`, a simulator crisis event, the `calamity` word of a condition linked to a carried calamity, else the condition's `activeConditions[]` archetype) → its `map` row (DR44); the forces', coalitions' and groups' headcounts, else `exodus` and arrivals (item 122 (h); V08) → the camp's size; a calamity's `targets` → the disaster look's units (V01's `disasterDistricts`; §10.2 (d)) |
| W89 | item 123's damage tables — `damage.elements` (the threshold ranges by plan element kind, the `settings` row's default age) and `damage.materials` (the decay rates by walls material) (V11 §3.25.10) | V11 §3.25.10 | rows 109, 110: §6.3's thresholds, V06 §3.23's `decayLevel`, V03's, V02's and V04's drawings, §11.1's battle maps; T-V11-47 | §2.6 step 7, §6.3 *Plan damage*, §8.6, §11.1 | — (the level reads the lineage's lifecycle events; a dossier calamity's ruin reaches them through the epoch path, DR28) |
| W90 | item 124's weather cells — the climate rows' `weather` and the `settings` row's `weather` block (V11 §3.25.11) | V11 §3.25.11 | row 43: §6.1's weather stream (the spells), §8.2's effect marks, §8.4 (i)'s light terms, V09's Start a shower now; V12's item-124 bars; T-V11-48 | §6.1 *The weather stream*, §8.2, §8.4 (i), §2.9 | the climate from the dossier's terrain type (§7.7's DR42; item 125 (b)); the week as §2.9 takes it |

=== END ===

=== REPLACE ### 2.10 Lifecycle of every new state field ===
### 2.10 Lifecycle of every new state field

The *read* column of every table row is its registry row's readers (V11 §3.1; E-34), never restated here.

| field | create | read | persist | regenerate | undo | migrate |
|---|---|---|---|---|---|---|
| `TableSchema` registry entries | authored in `registry.ts` | the compiler, loader, editor, docs, audit | the package | n/a (code) | n/a | a schema change is a major table version with a migration (§7.5) of the documents' overrides: renamed columns mapped, removed columns' overrides orphaned (§7.6) |
| source files | authors | the compiler | the repository | recompiled on change | VCS | n/a |
| shipped tables | the compiler | the loader (`TableView`) | the package, pinned by version and hash in the recipe (§2.9) | a document replays against its pinned versions | an `editTable` undo (§7.4) | a new version is a declared shift (§6.4); a document upgrades by §7.5's upgrade event |
| a registry row's empty table before its rows-home milestone | the compiler from an empty source at C0 | its readers read no rows; the compiler's rules wait for its first row | the package | the change that ships its rows is a `minor` version (a declared shift for its readers, V11 §3.2.5), its exit tests reading them | VCS | n/a |
| `BuildingClassRow.profile`, `staff`, `villageForm`, `templateFamily` | compiled | row 17 | table | table | table | absent in an older table version: the loader fills `profile` from the class's `tags` by the tag → family map (V08 §2.6's `tags` rows) and V11 §3.4's family rows, reported as a declared shift |
| the `v.<id>` village keys, `GovernmentRow.villageSeat`, the archetypes' `village` cell, `WallBarrierRow.arcKind`, the terrace's three bend cells | compiled | rows 17, 21, 65, 14, 78 | table | table (a village building re-derives with its use when its row's key or cells change; standing buildings kept by V11 §4.3's rule) | table | the `v.` prefix is a major version of `roster.classes` (§7.5): an override naming an unprefixed village key is mapped to its `v.` key, reported; absent `villageSeat`: the seat class, reported; absent `village` cell: the class's `villageForm`; absent `arcKind`: V11 §3.16.1's column for the row's class; absent bend cells: V11 §3.24.1's TOWN row values |
| `RelationFamilyRow`, `SignaturePairRow`, `LadderStepRow`, `WallBarrierRow`, `WaterfrontThreatRow`, `EraRow`, `ClimateRow`, `HeightsRow`, `CompatibilityRow`, the typed §10.2 rows | compiled | their registry rows | table | table | table | table versions; a document without a table in its pinned set reads the parity-neutral default the schema declares (a family weight 0, no pair, no ladder step, the uniform wall profile — J-V11.12); an absent `ClimateRow.farmLayout` reads `rows` (the rung × landscape choice, §4.9) |
| `ResourceRow` goods columns | compiled | row 19 | table | table | table | absent: `comfortM` 0 and orientation `balanced`, the base's linear decay (item 107 (b)); absent `demand`: `classes` (no reverse pull without a bound consumer) |
| `siting.web`'s switches `orientEnabled`, `splitEnabled` | compiled | row 36 (through the loader, V11 §3.2.2) | table | a switch edit re-derives every class whose orientation or split it changes; placed uses kept and the moves listed (V11 §4.3; J-V11.14) | table | absent in a pinned `siting.web` that predates them: true (that version's behaviour, replayed unchanged); no `siting.web` at all: the off form (V11 §3.7.4; J-V11.12) |
| `dossier.sanitation`, `dossier.subterranean` (V04's rows in row 63) | compiled from V04 §2.3a's rows | row 63 | the package, pinned (§2.9) | a table version (a fix reviewed with V04 and V08, never a calibration; J-V11.65) re-runs the port's creation for the records it matches (§7.7) | table | absent in an older version: no record binds; sewers and systems by II.7's laws alone |
| V11's preset entries (V11 §2.2's rule) | compiled from the source cells, each written in the change that lands its preset or its cell (V11 §8) | the loader's preset step (§7.6's order) under that preset | table | table: a document under a preset replays its pinned versions | table (an `editTable` or `editPreset` undo, §7.4) | a pinned version compiled before a preset shipped carries no entry; running that preset first upgrades the table by §7.5's event (a declared shift, reported), so a missing entry is never resolved by the zeroing rule (which would give `bulkyWater` 0, below its range) |
| the source manifest's `productStages.village`, the compiled `villageRead` flag and `villagePresetCells` | `productStages.village` committed by the seat landing V07's V-M0 from V07 §3.0's stage set (with its fallbacks' stages), changed with the change that registers or withdraws a village stage; the rest compiled (V11 §3.2.1 steps 4, 7) | the compiler's `VG` checks; the loader's `VG` scope (V11 §3.2.2); V07 §3.15's list check; T-V11-9 | the repository; the manifest, pinned with the versions (§2.9) | recompiled whenever a `readers` list or the stage list changes; a table that becomes village-read requires its `VG` entries in that change | VCS | absent before V-M0: no table is village-read and no `VG` check runs; a pinned manifest without `villageRead` read under `VG` is upgraded by §7.5's event |
| the source manifest's `stageIds` and the compiled `stageReaders` | `stageIds` committed by the seat landing each change that registers a stage (C0: §4.1's stages); `stageReaders` compiled (step 6) | the compiler's reader check, the village-read test, the loader's `VG` scope, V12's run scope and cost shortcut | the repository; the dist manifest | recompiled on change; a stage registered or removed changes `stageIds` in that change, else T-V11-1 (b) fails | VCS | n/a (build data) |
| `NG`'s entries (`presets.NG` on `hood.constants`, V01's) | compiled from V01's source cells (V01 §3.15), written by the seat landing V01's M5 with the `NG` preset file | the loader under `NG` (V01's harness and panel); the compiler's checks | the package, pinned | table | table (an `editTable` or `editPreset` undo) | a pinned `hood.constants` compiled before M5 carries no `NG` entry; running `NG` first upgrades it by §7.5's event (a declared shift, reported), since `MFCG`'s off switches would run none of Neighbourhood's rules |
| rows 90–91 (`way.surface`, `squares.quota`) | V01's rows compiled; empty from C0 until V01's M2b | rows 90, 91 | the package, pinned | a surface row edit re-derives the surfaces of the ways that read it at S10a's end (an edited `surface` kept, V01 §3.7.3); a quota edit re-derives S7b's square claims and, from M5, the districts' dispatch (§7.6's slice) | table | absent from a pinned set: every way's `surface` unset and S7b (3) claiming no quota square (the pre-M2b behaviour); an upgrade is a declared shift naming the ways and squares it changes |
| rows 86–89 (`toolkit`, `messages`, `clerk.ops`, `clerk.content`) | V09's and V10's rows, compiled | rows 86–89 | the package, pinned | a table edit applies by its owner's rule (V09 §2.3: never by a user; V10 §2.10: `clerk.ops` the device layer only) | `editTable`'s inverse where an edit is admitted | a new version by V11 §3.2.5 (V09 §2.3's additive rule for tools) |
| `crypt`, `cryptM2`, `crypt.rankShare` | compiled (V11 §3.5.8) | rows 17, 24 | table | table (a building's `Basement.crypt` re-derives with its basement, V03) | table | absent in an older pinned `roster.classes`: every class `never` until the document upgrades; the rows then arrive as a declared shift (§6.4): the cathedral gains its crypt, reported |
| the `under.ruin`, `under.openings`, `under.dig`, `under.catacomb` rows and `miningCellShare` | compiled (V11 §3.23) | rows 58a, 59 | table | table (V04's records re-derive by V04's ratchet and keys) | table | absent: no ruin, no opening chance, no dig draw, the base's catacomb rule (II.7.6); on upgrade a declared shift — a church-sourced catacomb is re-sourced to its churchyard, else `legacy` (V04 §3.5.1) |
| the `siting.declared` and `siting.linkEdits` rows | `editTable` on the document-only tables (V11 §4.2) | row 76 | the log | re-derived by the match slice of their binding key (V11 §4.3) | inverse row op | a key that no longer resolves is orphaned and reported (§7.6) |
| **item 110's tables — the pattern** (`terrace`, `retaining`, `terracedEdges`, `raisedWays`, `ways.crossing`, `deck`, `deckOk`, `deck.landmarks`, `roster.specialisations`, the `stepped-shrine` row, `water`, `rainMmPerYear`, the era and culture factors; E-34) | compiled (V11 §3.24) | rows 9, 5, 43, 50, 71, 78–85 | table | the readers whose recorded slices cite a changed row re-derive; a standing GENERATED thing whose draw or admission flips is KEPT and listed with an offer (J-V11.14 extended); what the user drew, declared or set is held; a thing the user removed stays suppressed whatever the table says (§2.8's suppression; item 110 (b), (f)); each draw keyed as the exceptions below say | table (an `editTable` undo) | absent from a pinned set: off (V11 §3.24.0); an upgrade is a declared shift naming every thing it adds |
| — exceptions to the pattern | `terrace`, `retaining`, `terracedEdges`: generated walls re-derive with their levelling units, drawn walls held; a profile edit re-draws material and towers only; key the levelling unit's lineage · `raisedWays`: the generator's gate re-runs for every reason key whose outcome the edit can change (§7.6's slice); a newly admitted reason is built by the dry run with its fates; the remove offer; key the reason key · `raisedWays.structure.span`, `.slideMaxFactor`, `.maxClearSpanM`, `retaining.settings.stateSnapCm`: written with file f item 244's span rule by the seat landing it at M3a with C3b (V04 §8); a `span` edit re-runs the span rule over every raised way whose spans cite the row (held `use` edits kept) and V04's arch-vault reconcile in the same commit; a `slideMaxFactor` or `maxClearSpanM` edit re-runs the support step on the generated ways (keys kept by item 244 (5)), a standing way a lowered bound now refuses kept and listed with the remove offer, as the pattern keeps it; a `stateSnapCm` edit applies at the next re-derivation and moves no standing knot; a pinned version without them is upgraded by §7.5's event, reported, so the zeroing rule never supplies a foundation depth of 0 to a document holding raised ways · `raisedWays.structure.stripMarginM`: shipped with item 110's rows at C3b (M3a); an edit re-cuts §4.6 S8's strip holes, S8 and the stages after it re-deriving the faces a strip crosses, a generated plot or building the widened strip now covers kept and listed with the relocate offer as the pattern keeps it — and every meeting the widened strip, zone or ends make with a wall-like structure resolved by §2.7's laws (law 4; law 1 (11), J148; law 2 (a)–(c), by hand the edit refused), never kept against them; absent from a pinned version: 1 m, the value the cell ships with, so no strip moves · §4.8's band and setback rows, `palisade.bandM`: an edit that widens a wall's band or strips resolves each meeting it makes with a raised way by §2.7's laws (law 4), as `stripMarginM`'s does · `raisedWays.structure.span`'s `deckDepthCm` (every span's soffit) and the rows that give a wall's top (`walls.barriers`' class rows, the curtain's values, V07 §3.4's village rows): an edit that moves a soffit or a wall's top re-checks each crossing whose form, clearance or cap it changes by §2.7's laws (law 4; law 1 (2), (5), (7), (10)), as `stripMarginM`'s does · `raisedWays.structure.clearWidthM`, `.squareDeg`: shipped with item 110's rows at C3b (M3a), read by §4.3's crossing rule and V01 §3.17.3 (3); an edit re-derives the readers whose recorded slices cite them, a standing way whose crossing a raised bound now refuses kept and listed, as the pattern keeps it; absent from a pinned version: 1 m and 30°, the values the cells ship with, so no crossing moves · `ways.crossing`: the crossings whose ways cite the row re-derive (a stair becomes a ramp or back), no way moves; absent: the base's slope rule (§7.3), every crossing a ramp, reported · `deck`, `deckOk`: the cutter re-runs on the decks whose rows changed; standing deck buildings above a lowered budget or of a class no longer admitted are kept with a relocate offer; new plots obey the rows (V02's clamp, J-V2.67); key the deck's lineage · `deck.landmarks`: the slot draws re-run; a standing slot building is kept, an empty slot may fill; key the slot's deck lineage · `roster.specialisations`, `stepped-shrine`: a generated stepped building whose draw flips is kept with a "re-mass" offer (a massing change is disruptive, J-V11.14); user-set, declared and keyword specialisations held; key the use's lineage with `'spec'` · `water`, `rainMmPerYear`, the factors: as `raisedWays` (the reasons they gate); absent: `perHeadL` 0 (no need), factors 1 | | | | | |
| the display cells (`label`, `icon?`, `synonyms`, `commonness` on the class rows; `label`, `icon?` on the families, goods, district kinds, style sheets, patch materials and crisis looks; `findGroup` on the families) | the source (V11 §3.4, V11 §3.5.15, V11 §3.7.1, V11 §3.9, V11 §3.1's *Display cells*, V11 §3.25.3, V11 §3.25.9; V07 §2.4 for the `v.` rows); a class's `icon` and `commonness` and the generic rows' cells compiled (steps 5, 5a) | V09's roster reader, palette, cards and Find (item 120), the message slots V10 renders, V08's notes, `@plat/docs` — never a model stage | the package, pinned | a label, synonym or group edit moves no digest (Find's index rebuilds with the edit's commit, item 120 (j)); a count edit recomputes `commonness` in the same compile | table | absent in an older pinned `roster.classes`: the loader shows the key with `_` as a space for `label`, `[]`, 0 and no icon, reported once; an absent `findGroup` in an older pinned `siting.profiles` reads `other`, reported once; the words arrive with the table's major version, which moves no digest |
| the base settings row (row 92) | compiled (V11 §3.1) | row 92 | the package, pinned | `reroll.maxAdvance`, `crossing.searchBandM`, `index.gridCellM`: a re-derivation from their first reader (§7.6); `index.gridCellM` changes no output (an index setting; §3.3's queries return the same items); `view.zoomOutMarginStops`: the view only | table | absent from an older pinned set: the base's constants (3, 120 m, 25 / 10 / 5 m, 1 stop), which these cells hold, so nothing shifts |
| item 111's climate cells (`ClimateRow.dry`) and the `garden` land-use row | compiled (V11 §3.25.1, V11 §3.17.2) | rows 43, 44 | table | a cell edit re-derives from its first reader (S0 for the water chances and the oasis; S3 for the pull; S6 for the prosperity term; S10b for the wells); an oasis the user added or removed is held (§7.4's T2 row) | table | absent from a pinned set: the neutral values (water chances as the non-arid rows, oasis chance 0, pull 0, water term 0, sun cell 1, well terms neutral) — the base's behaviour exactly |
| item 113's `history` cells and `history.events` rows | compiled (V11 §3.25.2) | rows 93, 94 | table | read once, at generation, by the replay: a change reaches an existing map only through a Re-derive from S1 that re-runs the replay whole (V06 §3.20.7) | table | absent from a pinned set: `replay` false (the one-click path) |
| item 114's `walls.condition` cells and `walls.patchMaterials` rows | compiled (V11 §3.25.3) | rows 95, 96 | table | the generation-time condition is laid with its enceinte at generation (§7.7's DR41) and carried through every re-derivation by its knot profile (§2.2 rule 5; §7.4's wearWall / repairWall row), so a cell edit reaches a new generation and the epochs that read the cells in force; a hand repair's material is held (V06 §2.8) | table | absent: `atGeneration` false and the neutral values of V06 §3.7.7 (4) (the rules before item 114); a run's absent material reads robust |
| item 115's `grandeur.ceiling` rows and their `settings` row (`grandClasses`) | compiled (V11 §3.25.4) | row 97 | table | S10b's class mix and S11's designs re-derive at the rungs whose row changed; a `grandClasses` edit reaches the port's "specified" test at its next digest (V08 §3.16 (3)); standing buildings kept (item 115 (c), (e); V06 §3.8.5) | table | absent: no ceiling (every rung reads TOWN's row), the base's behaviour; the `settings` row ships with the table, so no pinned set holds the rows without it |
| item 117's season cells and tables | compiled (V11 §3.25.6) | rows 43, 98–101 | table | a look only: an edit re-skins cached tiles (§12.5), never the model or its hash | table | absent: no season rows (the base's four override rows of §8.2 by the named season) |
| item 118's festival tables | compiled (V11 §3.25.7) | rows 102–105 | table | a look only: an edit re-draws the decorations shown, never the model or its hash | table | absent: no decorations |
| item 119's `perf.qualitySpend` rows | a row lands with its measured gain (V11 §3.25.8) | row 106 | table | a row admits its stage's quality path from the next generation; its output shift is the row's declared shift | table | absent: every stage at its target path |
| item 122's `crisis.looks` (with its `settings` row) and `crisis.map` rows | compiled (V11 §3.25.9); the `map` rows' words from V08's census at the pinned baseline (C4b) | rows 107, 108 | table | a look only: an edit redraws the looks standing in the view, never the model, a digest or the hash (§10.2 *Crisis looks* (a)) | table | absent: no look drawn; absent `map` rows: every condition reads `none` (§10.2 (b)) |
| item 123's `damage.elements` (with its `settings` row) and `damage.materials` rows | compiled (V11 §3.25.10) | rows 109, 110 | table | a drawing only: a range edit moves each element's threshold with it (its draw u fixed, §6.3), a rate or default-age edit each level (V06 §3.23); no plan, id, digest or hash moves | table | absent `damage.elements`: no element has a range, so none draws damaged; absent rates and age: V06 §3.23 (4)'s 0 (each level its state's floor) |
| item 124's weather cells (the climate rows' `weather`, the `settings` row's `weather` block) | compiled (V11 §3.25.11) | row 43 | table | a look only: an edit takes effect from the next spell (§6.1 *The weather stream*), never a tile, the model or the hash | table | absent: no weather entries — no spell comes |
| derived family rows | `resolveSiting(view)` at load (V11 §3.3.4) | S10b, explain | never (derived, memoised by the view hash) | re-derived on any change of a source row | follows its sources | n/a |
| document overrides of any of these tables | an `editTable` / `editPreset` event (§7.1) | the loader's override chain | the log | replayed | §7.4's `editTable` row | orphaned by §7.6 when the base row changed |

No document state is added by this volume beyond the overrides §7.6 records; the siting explanations are derived per query
(`PlacementSolver.explain`, file f item 311) and V06's "why" rows live in its non-canonical epoch report.

=== END ===

=== REPLACE ### 3.1 The complete catalogue of tables ===
### 3.1 The complete catalogue of tables

One row per registry entry (V11 §2.1). *Rows home* names the one section that writes the rows; *status* says whether the
rows are written in a design document (`written`), authored at build time by the plan of V11 §8 (`authored`, with the bar
they must meet), or empty until a staged input fills them (`staged`) — never whether they have shipped (V11 §2.1's
empty-table rule).

**Readers** (J-V11.80). This column is the one list of each table's readers (E-34): V11 §1b and V11 §2.10 cite it. A reader
that is a stage or an epoch phase is named by its **StageId** — §4.1's stages; the ids the volumes register (V01's `S7c`,
`S8.seed`, `S9b`; V05's `SKY`; V04's `U-NET`, `U-SYS`, `U-ACCESS`, `U-FRONT`, `U-CITY`, `U-LINK`, `U-RECONCILE` and
`U-FADE`; V07's `VS1`–`VS6`, `VS8`); and V06 §3.16's fifteen epoch-phase ids `EVO_PRELUDE` … `EVO_RAISED`. **A read is
recorded under the registered StageId of the stage function that reads** (J-V11.109): an epoch step that runs a base
stage (S2 at `demand`, S6 at `field`, S5–S13 on a new stage's faces at `growth`, S12c at `character`; V06 §3.2) reads
under that stage's own id — an epoch stage's S5b under `S5b`, never under the calling phase; an epoch participant reads
under the `stage` it registers (V06 §2.1's `EpochParticipant.stage`: `SKY` for V05's two, `S9b` for `hood.fabric`,
`U-FADE` for V04's four — `under.fade`, `under.extend`, `under.access`, `under.undercity`, V04 §1.1 — `VS1` and `VS2` for
V07's `village.plan` and `village.density`), and the seat registering a participant writes that `stage` into the readers
of every table the participant reads (J-V11.85). A **module id** names only a reader outside the stage graph — the
application, the clerk, the compiler, the port's digest, the docs generator, `derivePerson` (§10.3), the bench, the lazy
wings and plan rungs (they run on a click, never in the pipeline, V02 §3.1), the renderer, and the neighbourhood close-up
(`@plat/hood`'s view-side derivation, V01 §3.8, its draws keyed `STAGE_VIEW`; the package's pipeline registrations stay
StageIds); in the table a module reader appears by its plain name, which the source writes as its module id (V11 §2.1).
**The village-read test (V11 §3.2.1 step 4), V12's run scope (V12 §3.7.2 (4)) and its cost shortcut's first reader stage
(V12 §3.7.7) match StageIds only**, so every table a stage or phase reads names that stage, and T-V11-1 (b) holds it by
recording each stage's reads. A section named beside a StageId says where that reading is written. "Every stage" (rows 1,
10) compiles to every id of the source manifest's `stageIds`; "every band-keyed reader" (row 6) to the union of the stage
readers of the band-keyed tables. **`S5`** (rows 2, 3, 50, 81) names the growth stage, which §4.1 registers as its four
steps S5a–S5d, each with its own `StageDecl`, and compiles to those four ids; a row that needs one step names that step.
**S5b beside S4** (J-V11.92): the main-road step at stages k ≥ 2 and at every epoch stage runs S4's router
incrementally, under the same F-ROUTE ladder (§4.4), and that route solve prices a viaduct span (file f item 290 (1),
(3); V06 §3.6), so every row that lists S4 as the raised-way generator lists S5b beside it — rows 49, 71, 80 and 81 by
name, rows 3 and 50 through `S5`.

| # | TableId | file (under `dist/`) | row type | rows home | readers | slices | status |
|---|---|---|---|---|---|---|---|
| 1 | `rung.ladder` | `ladder.json` | `RungProfile` | §1.1; village rungs V07 §2.1 | every stage | row | written |
| 2 | `stage.regimes` | `stages.json` | stage rows per rung | §4.2 S2, §4.4 | S2, S5 | row, bracket | written |
| 3 | `ways.widths` | `ways.json` | way-class widths | §4.3, §4.4; the `aqueduct` class's row V11 §3.24.2 (`channelCm`, `deckExtraCm`) | S4, S5, S9; S4, S6 and EVO_RAISED read the `aqueduct` class's row (the raised-way generator at S4 and the end of S6, V06 §3.19's epoch pass) | row | written |
| 4 | `granularity` | `granularity.json` | granularity rows by kind × band | §4.7 S10 | S10 | row, bracket | written |
| 5 | `heights` | `heights.json` | `HeightsRow` (with the `stepped-shrine` row, item 110 (c)) | V11 §3.6.4 | S11 (§2.6's stage-3 hook: V02's massing and its M11 heights), U-SYS (V04's stepped monuments); modules: the plan rung (V03 §3.3's storey heights) | row | written here |
| 6 | `prosperity.bands` | `bands.json` | `BandSet` | §4.5 | every band-keyed reader | row | written |
| 7 | `prosperity.drivers` | `drivers.json` | driver kernels and weights (with `w_sun`, item 102) | §4.5; `w_sun` V11 §3.3.5 | S6, S10a, EVO_FIELD (the building shade mask's `w_sun` term, V06 §3.4; the field step's re-evaluation runs as S6) | weights | written |
| 8 | `density.drivers`, `greenery.drivers` | `drivers.json` | driver kernels | §4.5 | S6, S10a | weights | written |
| 9 | `s0.features` | `features.json` | feature probabilities; S1's geology rows by relief (item 109 (a)'s mountainous values); the relief rows' `terracedEdges` column (item 110 (a)) | §4.2 S0, S1; `terracedEdges` V11 §3.24.1 (file f item 289) | S0, S1, S10, S11 (the district-edge levelling) | row | written (the column here) |
| 10 | `workLimits` | `workLimits.json` | work-limit coefficients | §5.1 (5) | every stage | row | written |
| 11 | `market.siting` | `market.json` | market-siting weights | §4.2 S3 (12) | S3, S7b | weights | written |
| 12 | `cut` | `cut.json` | `cut.bendMode`, `cut.flattenM`, reach weights | §4.6 | S8 | row | written |
| 13 | `walls` | `walls.json` | `castle.minInnerM`, `wall.smoothPasses`, gates' waterfront share, spacing, `moat.waterReachM`, `moat.maxFallCm` (§4.2 S3 (10)) | §4.2, §4.4, §4.8 | S3, S5a, S7 | row | written |
| 14 | `walls.barriers` | `walls/barriers.json` | `WallBarrierRow` | V11 §3.16.1 | S3 (9), S5a, S7 (§4.8's graded furniture), VS3 (the palisade's barrier arcs, V07 §3.4 step 5), SKY (an island's rim closing as a cliff, V05 §3.21), EVO_GROWTH and EVO_FORT (a new circuit and a ring's contraction under barrier closure, V06 §3.7) | row | written here |
| 15 | `walls.waterfront` | `walls/waterfront.json` | `WaterfrontThreatRow` | V11 §3.16.2 | S3, S10 (the mole-head slot's fort claimant, V11 §3.24.4), EVO_FORT (the waterfront grade and the harbour-mouth chain at an epoch, V06 §3.2 row 9); port.digest (DR2, §7.7) | match | written here |
| 16 | `district.growth` | `districts.json` | `district.growthRate` | §4.5 | S6 | row | written |
| 17 | `roster.classes` | `roster/classes.json` | `BuildingClassRow` (with `profile`, `staff`, `villageForm`, `templateFamily`, `crypt`, `cryptM2`, the compiled `deckOk`, and the display cells, V11 §2.3) | V11 §3.5 (town and city classes); V07 §2.4 (village classes, keyed `v.<id>`, V11 §2.9); V05 §2.4 (landing facts) | S2, S7b (with S7b (2)'s sub-districts), S10a (the noxious-first order, field pass 2's kernels), S10b, S11 (with §2.6's basement function and V02's massing), S12a, S12c (the identity rows' families, `SectorRow.tags`), S13a, U-SYS and U-ACCESS (V04's catacomb sources, church count, access pass and crypt join), EVO_USES (V06 §3.9's use step and clientele lookup), EVO_SITING (regrowth's per-use `deckOk`, V06 §3.8), EVO_DECLINE (`salvageM3`, V11 §3.18), EVO_UNDER (V06 §3.18); modules: the wings rung (V02), the plan rung (V03), port.digest, `@plat/app` (the display cells, V11 §2.3: V09's roster reader, palette, cards and Find's lexicon) | row, match | written here |
| 18 | `roster.districtKinds` | `roster/districtKinds.json` | `DistrictKindRow` (with `affinity`, file f item 438, and `label`, `icon?`) | V11 §3.9 (the `sky-*` rows from V05 §2.4's facts) | S6, S7b, S10b, SKY (V05's arena typing); V01's unit run is a derivation unit these same stages run (V01 §3.10) | row, match | written here |
| 19 | `roster.resources` | `roster/resources.json` | `ResourceRow` (goods columns; `label`, `icon?`) | V11 §3.7 | S2, S10a, S10b, EVO_USES (the goods' `comfortM` and orientation over epochs, V06 §3.9.10) | row | written here |
| 20 | `roster.institutions` | `roster/institutions.json` | `InstitutionRow` | V11 §3.21.3 | S2, S7b (the institution records of §2.7) | row | written here |
| 21 | `roster.government` | `roster/government.json` | `GovernmentRow` | V11 §3.21.1 | S2, S12c (§4.5's dials) | row | written here |
| 22 | `roster.religions` | `roster/religions.json` | `ReligionRow` | V11 §3.21.2 | S2, S12c (§4.5's dials) | row | written here |
| 23 | `roster.households` | `roster/households.json` | `HouseholdRow` | V11 §3.21.2 | S2; derivePerson (§10.3, on demand) | row | written here |
| 24 | `roster.settings` | `roster/settings.json` | `RosterSettings` (§10.2; its one row `settings`, cells V11 §3.5.1) | V11 §3.5.1 | S2, S10b, S11 (§2.6's basement function with V03 §3.7.4's crypt rank pass after it), EVO_USES and EVO_MUTATION (the epoch ops that re-run the rank in their batch, V06 §3.18.3 (1)–(2)) | row | written here |
| 25 | `roster.basementGate` | `roster/basementGate.json` | `BasementGateRow` | §10.2 | S11 (§2.6's basement function) | row | written |
| 26 | `roster.covers` | `roster/covers.json` | `CoverRow` | V11 §3.14 | S10b (§4.7's concealed institutions) | row | written here |
| 27 | `roster.classMix`, `roster.clusters`, `roster.tenure` | `roster/*.json` | `ClassMixRow`, `ClusterRow`, `TenureRow` | §10.2 | S10b, S11 | weights, row | written |
| 28 | `roster.quarterIdentities` | `roster/identities.json` | `QuarterIdentityRow` | V11 §3.10 | S12c (also at each epoch's `character` step, V06 §3.2 row 17), S13a | thresholds, row | written here |
| 29 | `roster.powerLinks`, `roster.sectorLinks` | `roster/links.json` | `PowerLinkRow`, `SectorLinkRow` | V11 §3.15 | S12c (§4.5 (6)) | weights | written here |
| 30 | `roster.bandRanges` | `roster/bandRanges.json` | `BandRangeRow` | §10.2 | S7b, S10a | row | written |
| 31 | `roster.sectors` | `roster/sectors.json` | `SectorRow` | V11 §3.15 | S2, S12c | row | written here |
| 32 | `roster.portRows` | `roster/portRows.json` | `PortRows` | §10.2 | S6, S7b (§4.5), S8 (§4.6), S12a (§4.9), U-NET and U-FRONT (II.7) | row | staged (the port fills) |
| 33 | `siting.profiles` | `siting/profiles.json` | `SitingProfile` per profile family, with the family's `label`, `icon` and `findGroup` | V11 §3.4 | the compiler (class profiles, the class rows' `icon`, the generic rows' `label`), item 104's resolver, S10b; modules: `@plat/app` (the palette's groups; Find's groups, item 120 (b)) | row | written here |
| 34 | `siting.families` | `siting/families.json` | `RelationFamilyRow` | V11 §3.3 | S10b (`resolveSiting`) | row | written here |
| 35 | `siting.pairs` | `siting/pairs.json` | `SignaturePairRow` | V11 §3.8 | S10b (`resolveSiting`) | row | written here |
| 36 | `siting.web` | `siting/web.json` | the supply web's settings (item 105 (f), (g), (h); item 107) | V11 §3.7.4 | S7b (1), S10a, S10b, EVO_USES (links re-bound, relaxation passes and splits over epochs, V06 §3.9.10) | row | written here |
| 37 | `siting.custom` | `siting/custom.json` | the custom-chain placement rules (item 104 (h)) | V11 §3.13.4 | S10b, EVO_USES (custom chains over epochs, V06 §3.9.8) | row | written here |
| 38 | `roomProgram`, `interiorLadder` | `roomProgram.json` | `RoomProgramRow`, `InteriorLadderRow`, layout patterns | V03; §2.6 | S10b and S11 through the base's one capacity function (§2.6: the programme's `circulation` and the `room` form's area minimum; from M2b the capacity's `R(s)` cells `stair.ladder` and `stair.landingCm`, file f item 233), from M3a S11's `Entrance.storey` and `basementDoor(b)` (`datum.maxSteps`, `stair.riserCm`, `exposureAllStoreys`, `moduleCm`, `door.mainCm`; file f items 241, 578); EVO_DEPARTURES, EVO_SITING and EVO_GROWTH (an epoch's `relet`s, V06 §3.5.1, V06 §3.8, V06 §3.6); modules: the plan rung (V03; lazy), `@plat/hood` (the close-up's entrance reserve calling `basementDoor(b)`, V01 §3.8.2 step 5) | row | written (V03) |
| 39 | `composition` | `composition.json` | V02's composition rows | V02 | S11 (V02's `outline()` and massing, V02 §3.1, V02 §3.5); modules: the wings rung (lazy, V02 §3.1), `@plat/hood` (the close-up's porch kind rows, V01 §3.8.2, from M3a) | row | written (V02) |
| 40 | `mutator.compat` | `mutator/compat.json` | `CompatibilityRow` | V11 §3.6.3 | S11 (its designation mutator, which every designation change an epoch makes runs) | row | written here |
| 41 | `farm` | `farm.json` | `FarmTable`, `FarmModeRow` | §4.9 | S2, S12a | row | written |
| 42 | `greenery` | `greenery.json` | the greenery rule rows (the oasis grove's row, item 111) | §4.9 | S12b | row, bracket | written |
| 43 | `climate` | `climate.json` | `ClimateRow` (with `farmLayout`, `rainMmPerYear`, the dry-country cells of item 111, the season cells of item 117 and the weather cells of item 124) and its named row `settings` (`ClimateSettings`: `aridMin`, item 124's weather block) | V11 §3.17; `dry` and `aridMin` V11 §3.25.1; `seasons` V11 §3.25.6; `weather` and the weather block V11 §3.25.11 | S0 (the arid water chances, P(oasis)), S1 (the oasis site and area band, the well-yield raster), S2 (the farm mode, which §4.9 reads with `farmLayout` before S2 demands the farm plots), S3 (S3 (6)'s water pull), S6 (the prosperity water term and the sun cell; the aqueduct's water balance, V11 §3.24.6), S10b (the wells' yield term and coverage factor), S11 (roof), S12a (§4.9's field system and farm modes — the climate override `farmLayout`; the oasis gardens), S12b (§4.9's species; the oasis grove), EVO_FIELD (a failing spring's pull, V06 §3.12.1), EVO_RAISED (the water balance), VS1, VS2, VS5, VS8 (V07's village readings of item 111, V07 W75); the renderer (§8.2's season rows, item 117; the weather effects — §6.1's weather stream, §8.2's effect marks and §8.4 (i)'s light terms, item 124); modules: `@plat/app` (V09's season control and Start a shower now), the clerk (V10) | row | written here |
| 44 | `landuse` | `landuse.json` | land-use rows (surface role, crop and livestock options) | V11 §3.17.2 | S12a; the renderer (§8.2) | row | written here |
| 45 | `hidden` | `hidden.json` | hidden-share rows | §4.6 | S10 | row | written |
| 46 | `decline` | `decline.json` | `DeclineTable` | §4.11; material durability rows V11 §3.18 | EVO_DECLINE (the strike pool, its persistence rows and V11 §3.18's retaining cells, V06 §3.5.2, V06 §3.19.4), EVO_RAISED (the disuse cells, V06 §3.19.2), EVO_WORKS (the `decay` Works and dwell bands, V06 §3.13); the compiler (`salvageM3`) | row, weights | written |
| 47 | `wealthLadder` | `wealthLadder.json` | survivors' ladder, churn caps | §4.11 | EVO_LADDER (the wealth ladder's rungs, V06 §3.8.4), EVO_DECLINE (the churn caps the strike pool runs inside, V06 §3.5.2) | row | written |
| 48 | `works` | `works.json` | `WorksTable`, `CalendarRow` | §4.11 | EVO_WORKS (V06 §3.13), S13a | row | written |
| 49 | `materials` | `materials.json` | `MaterialRow` (with the structure keys `retaining`, `raised:<kind>`, `pier`, `deck`, and the patch materials' keys, item 114) | V11 §3.19.3 | S10, S11 (the material read and the levelling), S4, S5b, S6 and EVO_RAISED (the raised-way generator), EVO_WORKS (the durations, through `works`), EVO_FORT (a patch's material, V06 §3.7.7); the renderer (§8.2's texture and colour roles) | match | written here |
| 50 | `era` | `era.json` | `EraRow` (with `aqueductM`, `raisedVaultM`) | V11 §3.19.1 | S3 (the moat, the intervallum), S5 (the towers), S7, S11 (§4.7's lights; the material keys), S12a, S12b (§4.9's fuel, timber and market green), S4, S6 and EVO_RAISED (the raised-way chance), U-SYS (V04's vaults), VS8 (V07's pump date); the renderer (the harbour chain's drawing, §8.2) | row | written here |
| 51 | `lights` | `lights.json` | `LightRule` | §4.7, §8.4 | S11; the renderer (§8.4) | row | written |
| 52 | `palette` | `style/*.json` | style sheets and role values (each sheet's head row with `label` and `icon?`) | §8.2 (values; the deficiency-contrast threshold of item 112 among its cells); V05 §5.1's sky-slot facts and V04's ruin and void style facts — this volume writes no colour; the sheets' labels V11 §3.1's *Display cells* | the renderer (§8) | row | written |
| 53 | `sugar` | `sugar.json` | the sugar expansion table | §7.1 | the edit parser | row | written |
| 54 | `disruption` | `disruption.json` | `DisruptionBudgetRow` | §7.7 | S10b (requests) | row | written |
| 55 | `knowledge.admit` | `knowledge.json` | the knowledge admission table | §9.2 | §9.2's admission function: S13b (label placement, view data outside the model's stage graph); the thematic rows, concealed marks and lights, the legend and `live.voids` (the renderer); the reader — hover and every `query` kind, Find's lists, counts and glow among them (`@plat/app`; item 120 (h)); every export (§11.1) | row | written |
| 56 | `islands` | `islands.json` | `IslandRule` and V05's rows (its `accessSiting.deckGapM`, `lineClearM` and `accessCount.handMax` are V05's own cells) | II.6, V05 | S7b (5), SKY (V05's stage, and its epoch participants `sky.islands` and `sky.clearance`, V05 §3.15) | row | written (V05) |
| 57 | `sewer.existence`, `under.rule`, `under.tunnel` | `under/*.json` | `SewerExistenceRow`, `UndergroundRule`, `TunnelProfileRow` | II.7.1–II.7.4 | S0 (II.7.1's draw), U-NET, U-FRONT, U-LINK (as V04 §3.1 runs them), EVO_PRELUDE (the feature set re-resolved at an epoch's rung, V06 §3.2), U-FADE (`under.extend`'s sewer derivation and extension, V04 §1.1) | row | written |
| 58 | `under.network`, `under.layout`, `under.fade` | `under/network.json` … | V04's rows | V04 | U-NET, U-SYS, U-ACCESS, U-FRONT, U-CITY, U-LINK (V04 §3.1), S7b (U-FORECAST, V04's predictor called at S7b), U-FADE | row | written (V04) |
| 58a | `under.ruin`, `under.openings`, `under.dig`, `under.catacomb` | `under/ruin.json`, `under/openings.json`, `under/dig.json`, `under/catacomb.json` | `RuinRule` (with `CultureRow`), `UnderOpeningRow`, `DigRule`, `CatacombRule` — schemas V04 §2.3, `CatacombRule.order` V04 §2.3 | V11 §3.23 | U-SYS, U-ACCESS (T2b), U-FRONT (F6), U-CITY (V04 §3.1; at every rung, V07 §3.16's village subset included), S7b (U-FORECAST), U-FADE (V04's epoch participants, V06 §3.18; V07 §3.12 at village rungs), EVO_UNDER (excavation by demand, V06 §3.18.1); the bench (V12's bars) | row | written here |
| 59 | `undercity`, `under.systems`, `under.links` | `under/*.json` | `UndercityRule`, `UndergroundSystemRow` (the cavern row's `miningCellShare`, V11 §3.23.1), `LinkRule` | II.7.5, II.7.6 | U-SYS, U-ACCESS, U-CITY, U-LINK (as V04 §3.1 runs them), S7b (U-FORECAST), U-FADE | row | written |
| 60 | `evolution` | `evolution.json` | V06's rows (V06 §3.9.9's clientele defaults among them) | V06 | every epoch phase — EVO_PRELUDE, EVO_HAZARD, EVO_FIELD, EVO_USES, EVO_DEPARTURES, EVO_DECLINE, EVO_FORT, EVO_TERRAIN, EVO_LADDER, EVO_MUTATION, EVO_SITING, EVO_GROWTH, EVO_WORKS, EVO_UNDER, EVO_RAISED (V06 §3.16; V06 §2.12's `EvolutionTable`) | row | written (V06) |
| 61 | `village` | `village.json` | V07's village rung rows | V07 | S0, S1, S2, VS1–VS6, VS8, S10, S10b (`rules.race`, V07 W68), S11, S12a, S12b (V07 W3, W58, V07 §2.2a's per-sub-record stages; `village.plan` and `village.density` re-run VS1's and VS2's steps; `village.pins` re-runs VS8's rows at a village epoch under `VS8`; `village.records` places a record's market, claim or pin under `S10b`); EVO_SITING (the siting step (m), V07 §3.12), EVO_DECLINE (`epoch.rows`' persistence, street and hinterland rows, V06 §3.5.2–V06 §3.5.3), EVO_USES (`rules.claimArea`, V06 §3.9.6), EVO_GROWTH (the village's own phase, V07 §3.12, file f item 317) | row | written (V07) |
| 62 | `hood.*` — `hood.templates`, `hood.dispatch`, `hood.squares`, `hood.pins`, `hood.placeKnowledge`, `hood.defaultCuts`, `hood.kinds`, `hood.constants` (V01 §2.2) | `hood/*.json` | V01's rows: `TemplateRow`, `DispatchRow`, `SquareRow`, `HoodPinRow`, the place-knowledge and default-cut rows, `HoodKindRow`, and `hood.constants`' one `settings` row (`HoodSettings`, its columns V01 §3.14's column table) | V01 | S0, S1 and S6 (the standalone document's kind draw, frame and default cuts, V01 §3.10.1); S2 (the land estimate's dispatch land, `hood.dispatch`'s small-block weights and `land.smallShare`, V01 §3.5.9); S7b (S7b (1)'s capacity and reconcile with `templateLandM2`, V01 §3.3.7, V01 §3.5.9, and the standalone one-district allocation's anchors and affinity, V01 §3.10.1); S7c; S8 and S8.seed (the seed primitives' rows and the plaza primitive's `hood.squares`, V01 §3.4; the seed pass registers `S8.seed`, file f item 345, inside S8); S9b; S11 (a square's centrepiece from its `hood.squares` row, V01 §3.5.10); S13a (the naming context's and the places' cells); modules: `@plat/hood` (the close-up's hood pins, V01 §3.8.2), `@plat/app` (the panel's template cards, V01 §3.3), testkit.bench (T-V1-5's fabric classifier) | row | written (V01) |
| 63 | `dossier.*` — tiers, site, access, threat, deposits, quarters, landmarks, distribution, status, wealth, sectors, government, powers, conditions, calendar, receipts, derivation, impairments, crime, cultures, categories, tags, relations, historyScars, magic, era, materials, isolation, chainStatus, dependencySeverity, calamitySeverity, qualifiers, threats, ruinEvidence (these twelve split from `relations`), `customWeights` (the custom definition's `economicWeight` and `criticality` words → `PortRows.customKinds`' numbers, V08 §2.6, V08 §3.11; J-V8.108), readiness (item 114), climates (item 117), historyEvents (item 113), festivals (item 118) — and V04's two, `sanitation` and `subterranean` (files `dossier/sanitation.json`, `dossier/subterranean.json`; `owner` `'V04'`) | `dossier/*.json` | V08's row types (V08 §2.6); V04's two the match rows of V04 §2.3a (`sanitation`: match, binding; `subterranean`: match, effect, binding) | §14 item 7, V08 §2.6, V08 §2.6a; V04 §2.3a for its two (DR17) | port.digest (for V04's two, DR17's creation and binding at door 1: `toggles.sewers`, a system's forced existence, a placement's `arena` row, each record's binding target); for V04's two also `@plat/app` (V09's why card, V09 §1b's dossier-facts table) | row, match | written (V08; V04's two written (V04)) |
| 64 | `dossier.kinds` | `dossier/kinds.json` | V08's `kinds` row (with the optional `implies`) | V11 §3.11 | port.digest (DR24), the raised-way and bridge readers through `implies` | match | written here |
| 65 | `dossier.archetypes`, `dossier.categorySynonyms`, `dossier.keywords`, `dossier.goodWords` | `dossier/*.json` | V08's shapes for the first three (the archetype row's optional `village` cell, `ArchetypeVillageCell` of V11 §2.8; the synonym row's optional `family`; the keyword row's optional `near`, `class`, `specialisation` and `binds`); `goodWords` V11's own `GoodWordRow` (V11 §2.8) | V11 §3.13 | port.digest, item 104's resolver, V08's adapter (the good-word matching rule, V11 §3.13.5) | match | written here |
| 66 | `dossier.ladders` | `dossier/ladders.json` | `LadderStepRow` | V11 §3.12 | port.digest (T9, DR9), S2 | row | written here |
| 67 | `character` | `character.json` | `character.anchorSigma`, `anchorRadiusM`, `identity.dominantMin`, `identity.hysteresis`, `identity.dwellEpochs`, `dial.*`, `pressure.*`, `dispersal.random`, `relation.*`, `trade.kernelScale` | §4.5 | S12c (also at each epoch's `character` step, V06 §3.2 row 17), EVO_PRELUDE (the dials past their hysteresis and `TradeFlow` re-read, V06 §3.2 row 1) | row | written |
| 68 | `naming.*` (settlement, district, quarter, way, place, landmark, water, island, cluster, undercity, ruin, formerWall, vaults, person, folk, villageEnd, field, `building.wingRole`) | `naming/*.json` | `GrammarDef` | V11 §3.20.1 (grammars); corpora `authored` | S13a (V04's T6 and the renames at an epoch's `character` step included); modules: derivePerson (§10.3), V02's wing hover label | row (field slices for corpora, §7.6) | grammars written here; corpora authored (bar: V11 §3.20.6) |
| 69 | `desc.*`, `chronicle.*`, `appearance.*` | `desc/*.json` | `TemplateDef` | V11 §3.20.4; V06's chronicle defaults | S13a; modules: the description writer, derivePerson (§10.3), the chronicle writer (V06 §2.10, non-canonical, rebuilt by replay) | row | written here (skeletons); lines authored |
| 70 | `corpora` | `corpora/*.json` | `{id, kind, entries[]}` | V11 §3.20.5 (sizes and rules), V11 §3.20.6 (plan and bars) | S13a and derivePerson (§10.3), through the naming engine | row | authored |
| 71 | `ancestry`, `culture` | `naming/ancestry.json` | `AncestryRow`, culture rows (with the `building` block, item 110 (b)) | §10.3, V11 §3.20.3 | S13a, S11 (V11 §3.24.3's specialisation rows), S4, S5b, S6 and EVO_RAISED (V11 §3.24.2's chance), U-SYS (V04's vault share), EVO_FORT (a patch row's culture, V11 §3.25.3); derivePerson (§10.3) | row, field slices | written here (one human ancestry, the culture rows) |
| 72 | `sim.professions`, `sim.items`, `sim.services`, `sim.prices`, `sim.statblocks` | `sim/*.json` | `ProfessionRow`, `ItemRow`, `ServiceRow`, `PriceTable`, `StatBlockPack` | V11 §3.21.4 (schemas cited, §10.3) | `@plat/sim` | row | authored at M4b |
| 73 | presets `MFCG`, `FTG`, `VG` (V07 §3.15; file f item 377, from V07's V-M0, the milestone whose content ships its file, V07 §8; its entries required on the village-read tables only, V11 §3.2.1 step 4), `FM` (V02 §3.10.8; file f item 376, from M6c) and `NG` (V01 §3.15; file f item 584, from V01's M5, V01 §8.1; resolved through `MFCG`, its entries on `hood.constants` only) — `PresetId`, V11 §2.2 | `presets/*.json` | preset deltas | §7.6, V07, V02, V01 | the override chain; the compiler's preset check (V11 §3.2.1 step 4) | row | written |
| 74 | the setting pack `english-fantasy` | `packs/english-fantasy/` | `SettingPack` | §10.4, V11 §3.20 | the override chain | — | grammars written here, corpora authored |
| 75 | `keymap` | `keymap.json` | the default keymap | §14 | `@plat/app` | row | written (V09) |
| 76 | `siting.declared`, `siting.linkEdits` (`documentOnly`, file f item 380) | shipped empty | the declaration rows of V11 §4.2 (with the `use:` row's `specialisation` cell) | documents (V09's gestures, V10's accepted proposals) | item 104's resolver, S10b | match | document-only |
| 77 | `dossier.catalogue` (a manifest, not a rule table) | `src/dossier/catalogue.<line>.json` | V08 §2.4's manifest shape — each catalogue kind's entry, `ladderPairs` (the ladder file's pairs as data, V08 §3.5.1 (f)) and the crisis census `crisis.stressors`, `crisis.archetypes`, `crisis.events` (item 122); cited, never restated | V08's build step | the compiler's `coversManifest` rule and the ladder cross-check (T-V11-2); the `crisis.map` compile check over its crisis census lists (T-V11-46 (a)) | — | committed by V08 |
| 78 | `terrace` | `item110/terrace.json` | `TerraceRow` | V11 §3.24.1 | S10, S11 (the levelling — at village rungs through V07's reference cells, and at every epoch that levels, V06 §3.19.4 (1)), S7c (V01's stepped fabric, `terraceState`); modules: V09's T2 terrace sugar, T3 retaining mode and flat-ground bends (V09 §4.20.1 (3)), the bench (V12) | row | written here |
| 79 | `retaining` | `item110/retaining.json` | `RetainingProfileRow` and its named row `settings` (`RetainingSettings`) | V11 §3.24.1; `settings.stateSnapCm` §2.7 by file f item 245 | S10, S11 (the levelling: material, batter, buttresses, towers — also at every epoch that levels or restores a stretch, V06 §3.19.4 (1), (6); `stateSnapCm` wherever a re-derivation carries a generated wall's state knots); `materials`' structure key refers to it; modules: V09's tools, the bench (V12) | row | written here |
| 80 | `raisedWays` (rows, `settings`, `structure`) | `item110/raisedWays.json` | `RaisedWayRow`, `RaisedWaySettings`, `RaisedWayStructure` (with `span`, `slideMaxFactor`, `maxClearSpanM`, `stripMarginM`, `clearWidthM` and `squareDeg`) | V11 §3.24.2 (the `span` values, `slideMaxFactor`, `maxClearSpanM`, `stripMarginM`, `clearWidthM` and `squareDeg`; the rules file f item 244's, §2.7, §4.6 S8's strip and §4.3's crossing rule) | S4, S6 (the base's raised-way generator), S3, S5a and S7 (a wall meeting a raised way's under-deck strip, and its fixed-place zone, at `structure.stripMarginM` — S3's trace at a regeneration among them — and each span's soffit by `structure.span.deckDepthCm`, by §2.7's laws, law 1 (2), (4)–(7), its worked example the crossing table, §4.2 S3, §4.4 S5a, §4.8; S7's quays, intervallum and castle paths crossing that strip by §4.3's crossing rule: `structure.clearanceCm`, `clearWidthM`, `squareDeg`), S5c (its proposals crossing an under-deck strip by §4.3's crossing rule: `structure.clearanceCm`, `clearWidthM`, `squareDeg`), VS4 (V07's trackers crossing an under-deck strip by the same rule and cells, V07 §3.5a (3)), VS3 (the palisade meeting a raised way's under-deck strip, and its fixed-place zone, at `structure.stripMarginM`, and each span's soffit by `structure.span.deckDepthCm`, by §2.7's laws, law 1 (2), (4)–(7), V07 §3.5a (4)), VS5, VS6 and S10 at the village rungs (no toft yard part or building in the under-deck strip at `structure.stripMarginM`, V07 §3.5a (5)), `S8` and `S8.seed` (V01's seeds, fans and bent-cut lanes crossing under an arch read `structure.clearanceCm`, `clearWidthM` and `squareDeg`, V01 §3.17.3 (3), §4.3; S8 cuts the under-deck strip at `structure.stripMarginM`, §4.6, V01 §3.17.3 (2)), S5b (the main-road step at stages k ≥ 2 and every epoch stage, through S4's router, which prices viaduct spans; §4.4; file f item 290), EVO_RAISED (V06 §3.19's epoch pass and its strip clearance), U-SYS and U-FADE (V04's arch vaults and their reconcile; `foundationObstacles`' `span.supportFoundationCm`, V04 §3.5.0), U-CITY, U-ACCESS and U-LINK (`foundationObstacles` read by U-CITY's carve and U-DIG's cost), SKY (V05's caster ceiling, with its `sky.clearance` participant); modules: V09's T4, the clerk (V10), the bench (V12) | row | written here |
| 81 | `ways.crossing` | `item110/crossing.json` | `WayCrossingRow` | V11 §3.24.5 | S4, S5, S9, `S8` and `S8.seed` (V01's lanes and seeds, V01 §3.17.1 (5)) where a way crosses a retaining wall; S4, S5b, S6 and EVO_RAISED (the raised ways' ends); S3 (5), S4, S5b and S5c (the class grade limit on routed edges, §4.3 *Lattice and costs*), §7.3 (a) 5 (the steepness report); S13a and S14 (`rampMaxGrade`, the stair-stepped way's threshold: its naming context and its step ticks, V01 §3.6 (3)); module: V09's ghosts | row | written here |
| 82 | `deck` | `item110/deck.json` | `DeckRow` | V11 §3.24.4 | S10 (the base's deck-plot cutter, at village rungs too), S11 (V02 M10/M11's deck budget and storey bend), EVO_SITING (deck faces offered at regrowth tier (5), V06 §3.19.5 (1)), EVO_DECLINE (the pool's `deck` candidates, V06 §3.5.2), EVO_RAISED (a deck's repair, V06 §3.19.5); modules: V09's tools, the bench (V12) | row | written here |
| 83 | `deck.landmarks` | `item110/landmarks.json` | `DeckLandmarkRow` | V11 §3.24.4 | S10 (the cutter's slot draws), S11 (V02's landmark composition); modules: V09's T6 slots, the fixtures | row | written here |
| 84 | `roster.specialisations` | `roster/specialisations.json` | `CultureSpecialisationRow` | V11 §3.24.3 | S11 (the draw, file f item 259, and V02's resolution chain; at village rungs V07 §2.4's cap); modules: the plan rung (V03's rows), port.digest (V08's DR15 trace), the clerk (V10), the bench (V12) | row | written here |
| 85 | `water` | `item110/water.json` | `WaterNeedRow` | V11 §3.24.6 | S1 (S1 (10)'s well-yield raster by ground, item 111 (b)), S6 (the aqueduct reason's test), EVO_RAISED (V06 §3.19's pass); module: V09's uphill-aqueduct bend to a well (J-VI.4 (h)) | row | written here |
| 86 | `toolkit` | `toolkit.json` | `ToolRow` (with `ToolModeRow`, `ToolParamRow`) | V09 §2.3 (the shipped rows V09 §4.2; item 110's V09 §4.20) | modules: the application's rail and options strip, the mapper, the binding table and the context menu (V09 §3.3, V09 §4.2–§4.4), `@plat/docs`' tool pages, T-V9-12 | row | written (V09; owner V09, `parity: 'untouched'`, `packPatchable: false` — a user never edits it, V09 §2.3) |
| 87 | `messages` (one file per locale; `en` ships) | `messages/<locale>.json` | `MsgRow` for `en.json`; `{ key; text }` for every other locale's file (buttons, tone and codes are read from `en.json` only, V09 §2.9; J-V9.121) — the loader refuses a locale file carrying `buttons`, `tone` or `codes` | V09 §2.9 (the rows V09 §4.9; volume 10's key families' `en` texts from V10 §2.10, V10 §3.9, V10 §3.9a, V10 §3.10–V10 §3.13, V10 §3.16, V10 §3.20 and V10 §4.4; volume 8's `host.*` rows; volume 6's `info.copy.condensed` line, V06 §3.15.5 — as V09 §1b's messages row lists them) | modules: the application (every bend line, refusal, error and hint), the clerk (V10), `@plat/docs` | row | written (V09 and V10; owner V09, `parity: 'untouched'`, `packPatchable: false` — a locale is another file of the same keys, V09 §2.9; which locales ship follows SettlementForge, J121) |
| 88 | `clerk.ops` | `clerk/ops.json` | `ClerkOps` | V10 §2.10 | module: the clerk (`@plat/clerk`: the backend, the request builder, the meter, the caps, the store) | row | written (V10; owner V10, `parity: 'untouched'`, `packPatchable: false`; its layers the shipped rows and the device's preference layer only — a document's, a skeleton's or a host's `editTable` on it refused as V10 §2.10 states) |
| 89 | `clerk.content` | `clerk/content.json` | `ClerkContent` | V10 §2.10 (its default lexicon rows V10 §3.3's table) | module: the clerk (the encoders, the resolver, the brief renderer, the critique engine, the grounding check, the system prompt) | row | written (V10; owner V10, `parity: 'untouched'`, `packPatchable: false` — its layers the shipped rows, the device's preference layer, the document's override layer and a host's rows, V10 §2.10; §11.4 door 3) |
| 90 | `way.surface` | `way/surface.json` | `SurfaceRow` (V01 §2.2: `wayClass`, `era?`, `band`, `surface`; key `wayClass/band/era`, an absent `era` an empty component) | V01 §3.7.3 (file f item 207) | S10a (the way-surface rule at S10a's end, after field pass 2); S6 (an epoch's field step re-bands, and the ways whose fronting band crossed the hysteresis take their surface again, V01 §3.7.3, V01 §4.5); EVO_DECLINE (the landfall's re-laid surface, V06 §3.5.2) | row | written (V01; `owner` `'V01'`, `parity: 'zeroExtensions'` — no `extension` cell, so every preset reads its rows; `packPatchable: true`; its one value column an enumeration, `calibratable: false`) |
| 91 | `squares.quota` | `squares/quota.json` | `SquareQuotaRow` (§10.2; key `band`) | V01 §3.5.2 (the default rows) — the base table §4.5 S7b (3) and §4.7 S9 read (file f item 301) | S7b (S7b (3)'s square claims larger than a block, from M2b); S2 (the land estimate's sub-block square share, V01 §3.5.9, from M5); S9b (the sub-block remainder, V01 §3.5.2, from M5) | row | written (V01's rows; `owner` `'base'`, `parity: 'perPreset'` — its `MFCG` and `FTG` entries where they differ, V01 §2.2, no `NG` entry, `NG` reading it as `MFCG` does; `packPatchable: true`; `haPer1000` and the kind factors calibratable, their register entries written at V01's M2b exit by V12 §3.11's default line, V01 §8.1) |
| 92 | `base.settings` | `base/settings.json` | one row `settings`: `reroll.maxAdvance` (integer, 3), `crossing.searchBandM` (m, 120), `index.gridCellM` (m by level: L0–L1 25, L2 10, L3–L4 5), `view.zoomOutMarginStops` (integer, 1; item 116 (a)) — the base's values, provenance `architecture 2026-09-28` (`view.zoomOutMarginStops` `owner`, item 116), `calibratable: false`, note `fixed: a base engineering constant` | here (J-V11.106; the base cites the cells by name and states no value) | S1 (§4.2 S1 (5)'s crossing sites), every stage through §3.3's dynamic grid, §5.1 (6)'s New random (the edit parser and the stage it re-derives), §6.3's anchor table (the reconciler); the renderer (§8.8's zoom-out limit on the pyramid, §9.5's framing, §11's export frames); modules: `@plat/app` (V09's view controls), V07 §5.2's township view | row | written here (`owner` `'base'`, `parity: 'untouched'`, `packPatchable: false`) |
| 93 | `history` | `history/settings.json` | `HistorySettings` (one row `settings`) | V11 §3.25.2 | V06's replay at generation (V06 §3.20: its plan, epochs and refounding, run by the epoch runner's phases under their own ids — EVO_PRELUDE for the plan, EVO_SITING and S4's router for `existingFabricCost` at `reuseCost`, EVO_TERRAIN for burial), U-SYS (V04's `BuriedFormer.lay` depth factor, V04 §3.5.5 (b)), VS1 (V07's refounded village's lattice pricing, V07 §3.12a); modules: port.digest (DR36's symbolic peak sizing), the clerk (V10), the bench (V12) | row | written here |
| 94 | `history.events` | `history/events.json` | `HistoryEventRow` (V06 §2.14) | V11 §3.25.2 | EVO_PRELUDE (V06 §3.20.2's event-to-epoch mapping, which feeds each replay epoch's inputs); modules: the clerk (V10's story), the bench | row | written here |
| 95 | `walls.condition` | `walls/condition.json` | `WallConditionSettings` (one row `settings`) | V11 §3.25.3 | EVO_FORT (V06 §3.7.7's drivers, decay and repair), S3 and S7 (§7.7's DR41, item 114 (d), applied where the enceinte and its stretches are laid), VS3 (V07's palisade, V07 §3.4 (8)); modules: the clerk (V10), the bench | row | written here |
| 96 | `walls.patchMaterials` | `walls/patches.json` | `PatchMaterialRow` | V11 §3.25.3 | EVO_FORT (a patch's material draw), S7 (the generation-time patched runs' material), VS3 (the palisade's patches); the renderer (§8.2's patch line style by `look`); modules: `@plat/app` (V09's Material chip by `label`), the clerk (V10), exports (§11.1's condition and material) | row | written here |
| 97 | `grandeur.ceiling` | `buildings/ceiling.json` | `GrandeurCeilingRow` and its named row `settings` (`GrandeurCeilingSettings`) | V11 §3.25.4 (the table's shape §10.2 as item 115 homes it) | S2 (the manor count at the territory rungs, V07 §3.8), S10b (the rung ceiling on the class mix, §4.7 S10b; V07 §3.8's village class mix), S11 (V02's composition chain caps a dwelling's family), EVO_SITING, EVO_GROWTH and EVO_MUTATION (V06 §3.8.5's designs at the epoch's rung); modules: `@plat/app` (V09 §4.21.5's shell check), port.digest (V08 §3.16 (3)'s "specified" test reads `grandClasses`), the clerk (V10), the bench | row | written here |
| 98 | `season.surfaces` | `season/surfaces.json` | `SeasonSurfaceRow` | V11 §3.25.6 | the renderer (§8.2's season rows over fields, gardens, orchards, meadows, commons, greens, hedges, vines and deciduous crowns); exports (§11); modules: the clerk (V10) | row | written here |
| 99 | `season.water` | `season/water.json` | `SeasonWaterRow` | V11 §3.25.6 | the renderer (§8.2's `ice` role by water kind); exports (§11.1's battle-map ice rule) | row | written here |
| 100 | `season.leaf` | `season/leaf.json` | `LeafPaletteRow` | V11 §3.25.6 | the renderer (§8.2's per-crown autumn colour by a keyed draw on `render.instances`; the colours of item 124's `leaves` effect marks) | row | written here |
| 101 | `season.cover` | `season/cover.json` | `LeafCoverRow` | V11 §3.25.6 | the renderer (§8.2's fallen-leaf cover rows) | row | written here |
| 102 | `festival.decorations` | `festival/decorations.json` | `DecorationRow` | V11 §3.25.7 | the renderer (§8.2's decoration rows by tier and band); exports (§11, the image only); modules: the clerk (V10), `@plat/app` (V09's festival list) | row | written here |
| 103 | `festival.staging` | `festival/staging.json` | `StagingKeywordRow` and the named row `fallback` | V11 §3.25.7 | port.digest (V08's adapter reduces the staging prose to these keys, J-V8.124); the renderer (§8.2's placement at the keyed place, else the fallback) | match | written here |
| 104 | `festival.motifs` | `festival/motifs.json` | `MotifRow` | V11 §3.25.7 | the renderer (§8.2's decoration colours and motifs) | row | written here |
| 105 | `festival.generic` | `festival/generic.json` | `GenericFestivalRow` | V11 §3.25.7 | modules: `@plat/app` (V09's preview list, standalone); the renderer | row | written here |
| 106 | `perf.qualitySpend` | `perf/qualitySpend.json` | `QualitySpendRow` | V11 §3.25.8 | the stage each row names (its StageId, written into this row's readers by the change that lands the row, as J-V11.85 does for a participant); modules: testkit.bench (§12's budget accounting, V12's bars) | row | staged (shipped empty; a row lands with its measured gain) |
| 107 | `crisis.looks` | `crisis/looks.json` | `CrisisLookRow` and its named row `settings` (`CrisisLookSettings`) — §10.2's shapes | V11 §3.25.9 | the renderer (§7.7's DR44, §8.2's crisis look rows, §8.8's massed ring marks, and §10.2's placement over V01's `campLand` and `disasterDistricts` and V06's `frontierFor`); exports (§11: pictures, and a battle map's image only); modules: `@plat/app` (V09's Show crises preview list and Find's list of looks by `label`, §2.9's framing, the panel's headcount line), the clerk (V10), the bench (V12) | row | written here |
| 108 | `crisis.map` | `crisis/map.json` | `CrisisMapRow` (§10.2; key `from/key`) | V11 §3.25.9 (a dossier row set; the words V08's census at the pinned baseline) | the renderer (§7.7's DR44: each standing overlay's look); port.digest (V08's baseline totality check and its `unmapped_word` notes); the compiler (T-V11-46 (a)'s totality over registry row 77's lists); modules: the clerk (V10) | match | written here |
| 109 | `damage.elements` | `damage/elements.json` | `DamageElementRow` and its named row `settings` (`DamageSettings`) | V11 §3.25.10 | §6.3's `plan.damage` thresholds wherever a plan is drawn — modules: the plan rung (V03: the damaged plan, its exports and panel lines), the wings rung (V02's ruined exterior), `@plat/under` (V04 §5.6's kinds below ground), `@plat/evolve` (V06 §3.23's default age), the renderer (§8.6, §11.1's battle maps), the clerk (V10), the bench (V12) | row | written here |
| 110 | `damage.materials` | `damage/materials.json` | `DamageRateRow` | V11 §3.25.10 | modules: `@plat/evolve` (V06 §3.23's `decayLevel`, read by every damage drawer of row 109), the clerk (V10), the bench (V12) | row | written here |

**The count.** One hundred and eleven catalogue rows (1–110 and 58a; some rows group several ids that share a file),
counted by `REGISTRY`'s size wherever a count is read; the catalogue is closed: a table any document names
and this list lacks is a registry defect the build refuses (T-V11-1). **Never calibrated** (`ColumnSpec.calibratable:
false` on every column; V12's register holds no entry for them): rows 63–66 and 77 (the `dossier.*` row sets, V04's two
among them, and the catalogue manifest; §13.9 (7), V12's R4 — a change is a table fix reviewed with V08, J-V11.65); rows
68–70 and the naming columns of row 71 (the ancestry row's `nameGrammar` and `appearanceTemplates`, each culture row's
grammar-slice and corpus fields; V12's R4 and T-V12-24: naming tables, grammars, word lists and packs are never
calibrated — a change is an authoring change held to V11 §3.20.6's bars), while row 71's culture `building` block stays
calibratable (V12 §3.11's row; J-V11.70); rows 86–89 (J-V11.81: the corpus stage never re-signs a tool row, a message
text, the assistant's operation or its wording, and the numbers their owners re-set by their own measurements — V10 §7.3's
evaluation for the clerk's budgets, token limits and prices; V09's usability runs for the toolkit's hints — land as
ordinary table versions, V11 §3.2.5, each a `minor` or `patch` bump with its cause); row 92 (the base's engineering
constants); row 97 (the grandeur ceiling — the owner's rule at THORP, HAMLET and VILLAGE, the base's behaviour above and
the `grandClasses` list: enumerations, V11 §3.25.4); rows 102–105 (a look's enumerations and calendar mappings, not
measured quantities: items, places, counts, motifs and windows, V11 §3.25.7); row 106 (measured costs, each row its own
evidence); row 108 (`crisis.map`: SettlementForge's words onto our looks, a dossier row set, V11 §3.25.9). Every other
row of items 111–119 and 122–124 is calibratable but for its enumeration columns (V11 §3.25.9, V11 §3.25.10), its
switches (`history.replay`, `walls.condition.atGeneration`; T-V11-37), the patch rows' `label` and `look` (V11 §3.25.3) and
row 43's two owner-stamped weather caps `aridRainMaxPerHour` and `aridRainMaxWeeks` (item 124 (c); V11 §3.25.11), its
register entry V12 §3.11's.

**Display cells** (file f item 516; J-V11.93). Every table the UI shows rows of carries a `label` cell and an `icon?` cell
(V11 §2.3's meaning), `own` and `calibratable: false`, and the class rows also `synonyms` and `commonness`; T-V11-4
refuses a row of these tables without its `label`. Where the words are written: the town-and-city classes and V05's sky
classes, V11 §3.5.15; the `v.` classes, V07 §2.4; the generic classes, the compiler from their family (V11 §3.13.3); the
profile families (row 33), V11 §3.4's *Display words*, with their `findGroup` (Find's groups, V11 §2.3); the goods (row 19), V11 §3.7.1; the district kinds (row 18),
V11 §3.9; the patch materials (row 96), V11 §3.25.3; the crisis looks (row 107), V11 §3.25.9; the style sheets (row 52), here — `ink` "ink", `lit` "lit",
`hatched` "hatched", `parchment` "parchment" (a shipping ink-family variant), `bw-print` "black and white",
`night` "night", and the owner's third preset `house` "house" (D-1), each written into its sheet's head row by the seat
that ships the sheet (§8.2; §16's M1, M2b, M3b and M5); the random style and a user's saved sheets (V09 §4.5's T12 row)
are no shipped rows and take their words from V09. Icons: only the profile families' rows state one (`fam.<family key>`,
45 glyphs in V09 §5.1's sprite, written with the glyphs), and the class rows compile theirs from their family; the goods,
district kinds, patch materials, crisis looks and style sheets ship none, so their cards show the label alone (V09 §2.3's `iconCell` is
optional; a style card shows its rendered thumbnail, V09 §5.7), and a pack may state one.

=== END ===

=== REPLACE ### 3.24 Item 110's rows — terraces, raised ways, stepped massing, decks and their landmarks ===
### 3.24 Item 110's rows — terraces, raised ways, stepped massing, decks and their landmarks

Item 110's base mechanisms are the base's: the `RetainingWall` line record and the
levelling of S10 and S11, the raised parts on their own ground arena part with the course solver and the raised-way
generator (S4 for viaducts, the end of S6 for elevated roads and aqueducts), the deck plots and their cutter, the
second known-city fixture. The tiers are V02's (J-V2.62), the vaults V04's, the epochs V06's. This section holds only the
ROWS they read (types V11 §2.8c). Every table is `extension` (off in the parity presets, §7.6) and calibratable (V12 §3.11's register) unless marked; every cell's provenance is `general` with the practice named in the row's note (hill-town
terracing; arcaded viaducts and aqueducts; built-on bridges, moles and quays; stepped temple platforms); every value is
our own. No row here holds a random stream: each draw is its reading stage's, under the key V11 §2.10 records.

**3.24.0 The switches** (J-V11.49). One switch per row set, which is also that table's parity-neutral default
when a document's pinned set lacks it (J-V11.12) and the value the MFCG, FTG and VG presets resolve; every off form is a
cell value in its column's range, so a no-op pin's overlay can write it (V12 §2.13, J-V12.43):

| row set | off | effect when off |
|---|---|---|
| `terrace` | `enabled` false on every row | no `RetainingWall` is generated; the base's plinth, skirt and stepped wings carry every fall (§2.6) |
| `raisedWays` | every `chance` 0 | no raised way is generated; declared ones stand (item 110 (b)) |
| `deck` | every `offer` 0 | no deck offers a plot, so V02's deck budget is never read and V02's fallback constants never apply (V02 X16) |
| `roster.specialisations` | every `chance` 0 | no generated stepped building; declared ones stand |
| `deck.landmarks` | every claimant chance 0 | no generated slot building; declared and stamped ones stand |
| `roomProgram` `PlanGeometryRow.exposureAllStoreys` (item 110 (a); V03's cell, J-V3.84) | false | S11's entrances and the plan rung read the outside ground as before item 110 (V03 §2.4's `false`; V03 §3.6) |
| `climate` dry cells (item 111) | on every row `dry.oasis.chance` 0, `dry.waterPull` 0, `dry.waterProsperity` 0, `dry.sunCell` 1, `dry.wellYieldWeight` 0, `dry.wellCoverageFactor` 1 (V11 §3.25.1) | no oasis is generated (a drawn or dossier-made one stands, item 20), no water pull on the growth field, no water term, item 102's sun term as filed, wells placed and spaced as before item 111 |
| `history` (item 113) | `replay` false | generation is the one-click path; the history's events stay `HistoryHint` scars (§4.11 (1)) |
| `walls.condition` (item 114) | `atGeneration` false; `meansLow` 0, `wearChancePerYear` null, `needReturnYears` 0 | every run `standing` at generation; the epochs' neglect and repair as before item 114 (V06 §3.7.7 (4)) |
| `grandeur.ceiling` (item 115) | `enabled` false on every row | no ceiling: every rung reads as TOWN does (the "all manors" row everywhere, as before item 115) |

Items 116–119 and 122–124 add no switch here: item 116's margin is a view cell of the base settings row (V11 §3.1 row
92); the season and festival tables of items 117 and 118 are looks that never enter the model or its hash (with no season
and no festival chosen, the base's view draws); item 119's `perf.qualitySpend` ships empty; item 122's crisis looks are
switched per viewer by §2.9's `crises` key and item 124's weather effects by V09's device switch, both looks only, their
`scale`, `lookLevel` and `perHour` cells `extension` (the parity presets draw neither); item 123's damage has no switch —
a building never decayed and under no disaster look draws its plan unchanged (`item123.damage`). With item 110's six off the generated
documents are byte-identical to the pre-110 goldens (T-V11-31, the no-op pin every volume's item-110 pin cites: V02's
T-V2-50, V03's T-V3-34, V06's T-V6-65, V07's pins); with each other row set at its off form, byte-identical to the base without that item
(T-V11-38 – T-V11-41; V06's T-V6-71, T-V6-73, T-V6-74). **Every no-op pin of the owner items is a NoOpPin registration on
V12 §3.7.8's engine that reads its off form from this table** (E-20; §13.2's one convention). The chance, offer and weight cells resolve 0 by §7.6's zeroing with
no entry; the switches (`terrace.enabled`, `history.replay`, `walls.condition.atGeneration`, `grandeur.ceiling`'s
`enabled`) carry explicit `presets.MFCG`, `.FTG` and `.VG` entries false, and `dry.sunCell` and `dry.wellCoverageFactor`
entries 1 (V11 §2.2's preset entries); V03's `exposureAllStoreys` carries the same three entries false, written by V03
on its own cell (V11 §2.2: another table's entries are its owner's). **`presets.FM`** (V02's building-scope preset) resolves
the stepped and deck families off — every `roster.specialisations` `chance` 0, every `deck.offer` 0 and every
`deck.landmarks` chance 0, carried as `presets.FM` entries 0 on exactly those cells (V11 §2.2; file f item 376's scope;
landing with V02's M6c, V11 §8) — so the FM goldens stay byte-identical at every switch-on bump (V12 §3.4.4, J-V12.54).

**3.24.1 Terraces and retaining walls** (item 110 (a)). *`terrace`* (registry row 78; the three rows
equal at first; J-V11.40):

| rung | enabled | slopeMin (share) | stepMinCm | stepMaxCm | minTerraceDepthM | retainingReachM | flatDepthM | coverShare |
|---|---|---|---|---|---|---|---|---|
| TOWN | true | 0.15 | 60 | 400 | 6 | 15 | 12 | 0.8 |
| CITY | true | 0.15 | 60 | 400 | 6 | 15 | 12 | 0.8 |
| METROPOLIS | true | 0.15 | 60 | 400 | 6 | 15 | 12 | 0.8 |

The `enabled` column is a switch, not calibratable (`ColumnSpec.calibratable: false`, as V11 §3.7.4's `orientEnabled` and
`splitEnabled`): the owner's "they go in" holds it true by the schema, its off form is V11 §3.24.0's parity value, and no
calibration run can name it (V12 §3.7.2 rule (1)); the terrace family's realism is confirmed through its thresholds'
register line and the M4 panel's M4-110 group, never by moving the switch (J-V11.75).
The last three columns are V09 §4.20.1 (3)'s flat-ground bends of a drawn retaining stroke (J-VI.11; own; written at M3a,
calibrated by V12 §3.11's terrace line): their only reader is that bend, which never refuses on the ground's account.

* **Units.** `slopeMin` is a share (rise ÷ run); V01's slope in percent is 100 × share, so V01's stepped fabric band
  "between slopeMeanPct 8 and terrace.slopeMin" reads 8 % to 15 %. The TOWN row is "the base-rung
  terrace row": V07's village `PLaw` takes its values at every anchor (J-V7.41), and V05 reads the rows unchanged on an
  island's arena.
* **Compile bar T-V11-32 (a).** `plinthCm < stepMinCm < skirtMaxCm < stepMaxCm` (the base's `plinthCm` and `skirtMaxCm`,
  §2.6), `stepMinCm < stepMaxCm ÷ 2` (so every intermediate wall of §4.7's step regions, which retains more than
  `stepMaxCm` ÷ 2, is a wall), `stepMaxCm ÷ 100 ÷ minTerraceDepthM ≥ slopeMin` (else no unit could be levelled) and
  `flatDepthM ≥ minTerraceDepthM` (a flat-ground bend's terrace is a lawful terrace).
  A fall below `stepMinCm` stays the base's plinth; between `stepMinCm` and `stepMaxCm` one wall; above, an intermediate
  terrace of at least `minTerraceDepthM` and a second wall; a slope steeper than `stepMaxCm ÷ minTerraceDepthM` (0.67) is
  not levelled (the base's skirt and stepped wings, or no plot, reported). The tables editor clamps an edit that would
  break any of these inequalities — a `stepMinCm` raised to `stepMaxCm` ÷ 2 or a `stepMaxCm` lowered to twice `stepMinCm`
  among them — to the nearest lawful value and says so in one line (item 101 R2).
* **The relief column** (`s0.features`' relief rows, registry row 9; file f item 289): `terracedEdges` plain false, rolling
  false, hilly true, mountainous true — terraced wards on hill and mountain towns, lowland towns following the ground. It
  gates ONLY item 110 (a)'s district-edge source ("along a terraced district's edge when the relief row asks for
  terraces"); the plot, block and ward levelling runs at every relief wherever the thresholds hold.

*`retaining`* (registry row 79; `RetainingProfileRow`; interpolated along the value of the HIGH side's plot — the ground
the wall holds):

| band | material (weights) | batter | thicknessShare | buttress from cm · spacing m | parapet cm | towers per 100 m (min step cm) |
|---|---|---|---|---|---|---|
| poor | dry_stone 0.6, rubble 0.2, earth_bank 0.15, timber_crib 0.05 | 0.17 | 0.5 | 300 · 6–9 | 0 | 0 |
| modest | dry_stone 0.4, rubble 0.5, earth_bank 0.1 | 0.15 | 0.45 | 280 · 5–8 | 90 | 0 |
| prosperous | rubble 0.6, ashlar 0.3, brick 0.1 | 0.12 | 0.4 | 250 · 5–7 | 100 | 0.02 (300) |
| rich | ashlar 0.6, rubble 0.3, brick 0.1 | 0.1 | 0.4 | 250 · 4–6 | 110 | 0.05 (300) |

`earth_bank` and `timber_crib` are drawn only where the step is ≤ 150 cm (their weights renormalised away otherwise). A
wall along a public face at CITY and METROPOLIS (a square, a precinct, a primary or through way) reads the rich row's
material: civic works were dressed. The draws (material, buttress spacing, tower positions) are the levelling stage's, on
its own stream, keyed by the levelling unit's lineage. A decorative tower is never an `Enceinte`, has no gate and no walk.
The three new wall materials take §8.2's roles (file f item 412).

*`retaining.settings`* (the table's named row, V11 §2.1's settings form; J-V11.96):
`stateSnapCm` — file f item 245's state-profile snap, which it names `retaining.stateSnapCm` (this cell's prose name in
T-V11-1 (a)'s name map), its value stated once there; `own`, `extension`,
`calibratable: true`; its register entry is V12 §3.11's — the default line at M3a, restated in place by V06 §8's line on
`bar.T-V6-62` from V6-E2 (J-RF2.4 names the confirming measurement, T-V6-62's H-TERRACE century, and the
pre-decided fallback, the wall's own `stepProfile` sample spacing as the tolerance). Its one
reader is the re-derivation that carries a generated wall's `retaining_state_knot`s onto a new chain: S10 and S11, at
generation after an edit that re-levels a unit and at every epoch op that levels (a new stage's S10–S11, a rung-3 re-cut,
a `rebuild` running S11, V06 §3.19.4 (1), (6)), each under S10's or S11's id; a `repairRetaining`, the landfall's write
and a cut or join by `rekey` (file f item 245) move no knot by it. Under the parity presets it resolves 0 (a knot then
survives only on its own vertex), where no generated wall stands anyway (V11 §3.24.0).

**3.24.2 Raised ways** (item 110 (b): "at CITY and METROPOLIS the generator raises a way where there is a reason, each a
soft rule with a table chance and a count cap per rung", "A TOWN gets them only by declaration"; J-V11.41). *`raisedWays`* (registry row 80; readers: the base's generator — S4's route solve,
at generation and in each later stage's S5b, and S6's end —, V06 §3.19's epoch
pass, V01's seeds, fans and lanes, S5c's growth proposals, V07's village trackers and S7's quays, intervallum and castle
paths crossing under an arch (`clearanceCm`, `clearWidthM`, `squareDeg`; §4.3's crossing rule, V01 §3.17.3 (3), V07 §3.5a
(3)), S8's under-deck strip (`stripMarginM`, §4.6, which V07 §3.5a (5)'s village stages read too; a wall meeting it by §2.7's
laws, law 1 (4)–(6), its worked example the crossing table — its gates' and towers' footprints read against it, law 1
(5), its fixed places against the fixed-place zone it bounds, law 1 (6), and a held thing's reshape bounded by it, law
2 (a)–(b)'s reach), V09's T4 dry run and aqueduct
tool, V04's vaults, V05's caster ceiling, V10's why, V12's register):

| rung · kind | chance | cap | pMax |
|---|---|---|---|
| CITY · viaduct | 0.6 | 1 | 0.9 |
| CITY · elevated | 1 (the band factor carries it) | 1 | 0.8 |
| CITY · aqueduct | 0.6 | 1 | 0.9 |
| METROPOLIS · viaduct | 0.7 | 2 | 0.9 |
| METROPOLIS · elevated | 1 | 2 | 0.8 |
| METROPOLIS · aqueduct | 0.7 | 2 | 0.9 |

* **The calibration minima.** The CITY and METROPOLIS `chance` columns carry the owner-stamped calibration minimum 0.02
  and the cap columns 1 (`ownerRule: '110 (b)'`, J-VI.10; stamped at V11 §3.2.1 step 4): no calibration run, fallback or
  corpus pack sets one lower (V12 §3.7.2 (5)); a user's edit may.
* **The rung gate is the schema's**, provenance `owner`: the key's `rung` enum is exactly `CITY | METROPOLIS`, so there is
  no row below CITY and no calibration, pack or `editTable` can make one; an edit adding a TOWN row is refused as F-EDIT
  naming the owner's rule, with the alternative "declare the raised way (T4 `road` with `raised`, or an aqueduct)" (item
  101 R2, R13). It is not a register cell (V12 §3.11).
* **`raisedWays.settings`**: `totalCap` CITY 2, METROPOLIS 4 (the caps are ceilings, never quotas); `viaduct.minDropM` 12 m;
  `viaduct.spanCostFactor` 4 (a metre of span priced as four ground metres against the detour); `viaduct.maxSpanM` 600 m;
  `viaduct.routeClasses` through, primary, secondary; `elevated.minRiseM` 8 m (the segment's lowest ground at least this
  below both ends); `elevated.maxSpanM` 600 m (the two anchors at most this apart; V06's name); `elevated.bandFactor` poor 0,
  modest 0.1, prosperous 0.3, rich 0.5 (read at the band holding the mean of the two ends' prosperity values);
  `elevated.landmarkFactor` 1.5 per dossier landmark on high ground at an end (the records DR35 lists, counted by V11 §3.24.7 (4)), `landmarkMax` 2; `elevated.landmarkMinSignificance` 20 (the least class significance, §10.2 and item 72, of
  a dossier-bound institution that counts — the castle's; provenance `own; V08 J-V8.70, the castle's significance`;
  calibratable, its entry V12 §3.11's `raisedWays` settings line);
  `elevated.highGroundM` 10 m (V11 §3.24.7 (4)); `aqueduct.sourceReachKm` 10; `aqueduct.needRatioMin` 1.0 (the ratio is V11 §3.24.6's);
  `aqueduct.minFallPerKm` 1 m (the intake stands at least this far above the terminal per kilometre of straight distance;
  V06's reading); `aqueduct.gradient` [0.0003, 0.003] (the laid channel's fall, 0.3–3 m per km — the course solver's
  bounds); `aqueduct.capPerSizeMember` 1; `aqueduct.terminal` fountain 0.5, basin 0.2, cistern 0.3. No cell scales the
  chance by the dossier's water record (J-V8.67): the record makes the need count as met (V11 §3.24.7 (3)).
* **The chance, stated once.** For each live candidate `p = min(pMax, chance[rung, kind] × F)`: a viaduct `F = 1` (the drop
  and the priced saving already gate it); an elevated road `F = bandFactor × landmarkFactor^n × culture.elevatedM` (`n` ≤
  `landmarkMax`); an aqueduct `F = era.aqueductM × culture.aqueductM`. The era factors are V11 §3.19.1's, the culture factors V11 §3.20.3's building block. The draw, its key (the
  reason key), the kind order and the cap counting are the reading stage's (the base's generator; V06 §3.19 (3)–(5)).
* **`raisedWays.structure`** (the heights V05's caster ceiling and V04's vaults read; `pierSpacingM`, `pierWidthShare` and
  `pierMinCm` are file f item 244's support step's pitch and footprint, `clearanceCm` its clearance rule's, and `maxPierM` and
  `maxClearSpanM` drop a generated course there; J-VI.27): `clearanceCm` cart
  450, foot 250 (the least soffit over a crossed part-0 way, by whether that way's class carries carts, V11 §3.24.5);
  `parapetCm` 100; `channelWallCm` 60 (an aqueduct channel's walls above its deck); `channelCm` [60, 120] and `deckExtraCm`
  100 (an aqueduct's width: the channel plus 50 cm each side — the `ways.widths` row of the `aqueduct` way class, registry
  row 3); `maxPierM` viaduct 45, elevated 12, aqueduct 35 (a course needing a taller pier drops, reported
  `raised_too_tall`); `pierSpacingM` masonry 8–15, timber 4–8; `pierWidthShare` 0.2 of the span, `pierMinCm` 150; `maxClearSpanM` masonry 30, timber 20 (§2.7's
  clear-span bound: the longest merged clear span a crossed river or square leaves; range masonry [15, 75], timber
  [8, 40]; `own`, `extension`, calibratable, its entry V12 §3.11's `raisedWays.structure` line; an edit below a slid span's
  reach is clamped, T-V11-32 (h); J-V11.116);
  `stripMarginM` 1 m (the under-deck strip's margin each side of the deck's ground projection over its piers and spans —
  §4.6 S8's hole, V01 §3.17.3 (2)'s strip, V06 §3.19's clearance, V07 §3.5a (5)'s strip, and §2.7's laws' strip, ends
  and zone, law 1 (4)–(6); range [0, 3] m; `own`, `extension`, calibratable, its entry
  V12 §3.11's `raisedWays.structure` line; shipped with item 110's rows at M3a);
  `clearWidthM` 1 m and `squareDeg` 30° (`cdeg`) — §4.3's crossing rule under an `open` span: the clear width the span keeps
  beyond a crossing way's own width, and the most the crossing lies off square to the deck (ranges [0, 3] m and [10°, 45°];
  read by every part-0 way crossing an under-deck strip — a route, a growth proposal, V01 §3.17.3 (3)'s seeds, fans and
  lanes, V07 §3.5a (3)'s trackers, S7's quays, intervallum and castle paths and a hand way (§2.7's laws, law 1 (1), (8); its worked example the way-and-channel table, rows
  (a)–(b));
  `own`, calibratable, their entry V12 §3.11's default line (`corpus` at M-CAL); shipped with item 110's rows at M3a);
  `material` by band — poor timber 0.5, rubble 0.5; modest rubble 0.7, brick 0.2, timber 0.1; prosperous rubble 0.4, ashlar
  0.4, brick 0.2; rich ashlar 0.7, brick 0.3 — an aqueduct never timber (a timber channel leaks; its timber weight is
  renormalised away). The deck's level is the course's (the viaduct's grade across the gap, the elevated road's ends and
  ramps, the aqueduct's gradient line from its intake); these cells bound it, never set it.
* **The span rule's cells** (`raisedWays.structure.span` and `.slideMaxFactor`;
  J-V11.96). The span rule's constants (file f item 244; J-V4.93) are cells of this row under these names: `raised.vaultShare[kind]` =
  `span.vaultShare[kind]`, `raised.vault.maxHeightCm` = `span.maxHeightCm`, `minHeadroomCm` = `span.minHeadroomCm`,
  `maxFallCm` = `span.maxFallCm`, `raised.vaultCap[rung]` = `span.vaultCap[rung]` (all six rungs, the village rungs
  included — a declared raised way stands at any rung; a field of the named row, so the rung gate of the keyed rows is
  untouched), `raised.deckDepthCm` = `span.deckDepthCm`, `raised.supportFoundationCm` = `span.supportFoundationCm`; file f
  item 244's support-step slide bound is `slideMaxFactor`. Their values, stated here once (the base and V04 cite the cells): `span.vaultShare` viaduct 0.6,
  elevated 0.7, aqueduct 0.15; `span.maxHeightCm` 900; `span.minHeadroomCm` 250; `span.maxFallCm` 150; `span.vaultCap`
  THORP, HAMLET and VILLAGE 10 each, TOWN 40, CITY 120, METROPOLIS 240; `span.deckDepthCm` 150;
  `span.supportFoundationCm` 400; `slideMaxFactor` 1.5 — written into this row's source by the seat landing item 244's
  span rule at M3a (V04 §8); each is `own`, `extension` and `calibratable: true`, its register entry V12's span-rule line (the `span` block, owner V04) or the
  `raisedWays.structure` line (`slideMaxFactor`). The span rule scales `span.vaultShare` by `era.raisedVaultM ×
  culture.raisedVaultM`. Readers: the base's support step and span rule, run with the raised-way
  generator (S4, S5b, S6, EVO_RAISED), by a declared or drawn way's operator and on a frame growth's extension of a deck
  (§2.7's support step (7)); `foundationObstacles` (V04 §3.5.0,
  `supportFoundationCm`), derived where U-SYS, U-CITY, U-FADE and U-DIG's cost (under U-ACCESS and U-LINK) read it; V04's
  arch vaults (U-SYS, U-FADE); and `deckDepthCm`, every span's soffit, by §2.7's laws, law 1 (2), (5), (7). The
  name map is T-V11-1 (a)'s list.
* **The aqueduct is the way class `aqueduct`** (V09's `WayClass` addition, applied by the coherence pass; item 110 (b)'s
  "a raised water channel of the same kind"). No roster class stands for it (J-V11.51); its crossing row is V11 §3.24.5's,
  its width row above. **The terminal kind** is drawn from `aqueduct.terminal` on the generator's stream keyed by the way's
  lineage: a `fountain` or a `basin` is a model pin, one centrepiece per square; a `cistern` binds
  ONE `conduit_house` roster member through V11 §3.24.7 (1)'s criteria row, or, when the roster holds none, falls to a
  fountain pin, reported `aqueduct_terminal_pin`, so the roster's counts never move for an aqueduct. A dossier-bound
  `conduit_house` forces `cistern`. V04's terminal cistern (V04 §3.5.4 (e)) lies under that building's yard.
* **`says`** (the clerk's and the siting panel's sentences, id `rw/<kind>`): viaduct — "carried over the {feature} on arches:
  the drop is {d} m and going round was {x} m longer"; elevated — "a raised road between {a} and {b} over the lower
  {district}"; aqueduct — "brings water from {source}: the wells and cisterns inside the walls fall short".

**3.24.3 Stepped massing — the culture specialisations** (item 110 (c): "through composition rows (volume 2) and class rows
(volume 11)"; J-V11.42, J-V11.43). *`roster.specialisations`* (registry row 84; readers: S11's draw, V02's
resolution chain, V03's plan rows, V07 §2.4's village cap, V08's DR15 trace, V10's why, V12's register; the practice:
Mesoamerican temple platforms and pyramids, South Asian terraced palaces and temple towers, East Asian tiered towers and
palace platforms):

| culture | class | specialisation | composition (V02 §3.15.4) | heights | chance |
|---|---|---|---|---|---|
| mesoamerican | `great_temple`, `cathedral` | stepped_temple | stepped-temple | `stepped-shrine` | 0.95 |
| mesoamerican | `church` | stepped_temple | stepped-temple | `stepped-shrine` | 0.6 |
| mesoamerican | `palace` | terraced_palace | terraced-palace | — (the template's `castle`) | 0.5 |
| south_asian | `great_temple`, `cathedral` | stepped_temple | stepped-temple | `stepped-shrine` | 0.3 |
| south_asian | `palace` | terraced_palace | terraced-palace | — | 0.4 |
| south_asian | `tower_house`, `mage_tower` | tiered_tower | tiered-tower | — (the template's `tower`) | 0.2 |
| east_asian | `tower_house`, `mage_tower`, `watchtower` | tiered_tower | tiered-tower | — | 0.5 |
| east_asian | `palace` | terraced_palace | terraced-palace | — | 0.3 |

Every row has `capShare` 0.001 and `capMin` 1. No other culture has a row, so no default Western town ever
builds in tiers (J-V2.63; T-V11-32 (e)); a pack's culture may add rows.
* **The draw and the cap are §4.7 S11's** (file f item 259; V02 §3.2): the draw once per use, at its first building, before
  V02 §3.2's resolution; its stream and key; the chance test; the cap's formula, counted in roster sequence order so it
  stays prefix-stable (§10.2); `Use.specialisation` and the replacement of the band template's `composition` and
  `heights`; and the exemption of a user-set (`setAttr`, §7.1), declared (`siting.declared`'s `specialisation`, V11 §4.2)
  or keyword (V11 §3.13.2) specialisation. This table supplies the row the draw reads — the first row of the use's culture
  and class (a class has at most one row per culture), with its `chance`, `capShare` and `capMin` — and, at village rungs,
  the cap through V07's `rules.tiers.capPerSettlement`, per settlement (V07 §2.4). An exempt use is held (item 101 R13)
  and not counted toward the cap, so a declared stepped temple stands in any town of any culture (the second known-city
  fixture's stepped temple is made so).
* **The carriers** (V03's keys): `stepped_temple` by `great_temple`, `cathedral` and `church` (and
  `generic-worship` by keyword or declaration only); `terraced_palace` by `palace`; `tiered_tower` by `tower_house`,
  `mage_tower` and `watchtower`. V03 keys its programme rows `for.use` by the specialisation id with `for.cls: '*'`.
* **At village rungs** a row applies to the village class that plays its `cls` (V11 §3.22: `church` →
  `v.parish_church`, `tower_house` → `v.manor_house`, `watchtower` → `v.watchtower`; a `cls` with no village form reaches
  no village class), so V07 §2.4's eligible classes are exactly those three; the cap is V07's
  `rules.tiers.capPerSettlement` (1), counted per settlement, never per row; the chance is the row's, which V07 §2.4's
  culture cells leave as it is (the European cultures have no row).
* **The heights.** V11 §3.6.4's row `stepped-shrine` (a shrine on a platform is a few metres, never a 20 m nave;
  J-V11.43). A stepped building's crypt, where its class has one, follows V02's crypt ladder under tier 0 (V02 §3.15).
* **The dossier trace.** `site.culture` → these rows (V08 DR15); the port supplies no religion that builds in
  tiers, so the culture is the only input.
* **V04's monument cells** are V11 §3.23.4's `monument` column.

**3.24.4 Decks, the `deckOk` column and the landmark slots** (item 110 (d): "frontage plots with a `deck` size budget
(small, light, a table row), towers and forts at mole heads and mid-mole as placed landmarks";
J-V11.44, J-V11.46). *`deck`* (registry row 82; readers: the base's deck-plot cutter at S10, V02 M10/M11's
`DeckBudgetRead`, V06 §3.19.5, V07's village widths, V09's badges, V12):

| kind | offer TOWN · CITY · METROPOLIS | footprint m² poor / modest / prosperous / rich | max floors p / m / pr / r | frontage m | min plot depth m | fill | sides | end clear m |
|---|---|---|---|---|---|---|---|---|
| bridge | 0.15 · 0.35 · 0.5 | 15–30 / 20–40 / 25–50 / 30–60 | 2 / 2 / 2 / 3 | 3–6 | 3 | 0.8 | both | 6 |
| pier | 0.1 · 0.2 · 0.3 | 10–20 / 12–25 / 15–30 / 15–35 | 1 / 1 / 1 / 2 | 3–5 | 2.5 | 0.3 | both | 4 |
| mole | 0.3 · 0.5 · 0.6 | 15–30 / 20–40 / 25–50 / 30–60 | 1 / 2 / 2 / 2 | 4–7 | 3 | 0.4 | harbourSide | 15 |
| quay | 1 · 1 · 1 | 20–40 / 30–60 / 40–80 / 50–100 | 2 / 2 / 3 / 3 | 4–8 | 4 | 0.6 | landward | 5 |

The offer is drawn once per deck by the cutter, keyed by the deck's lineage; village rungs read V07's cells (J-V7.41). A
plot's `says`: "on the {deck}: at most {n} storeys, about {a} m²" (id `deck/<kind>/<band>`).

*`deckOk`* (a compiled column of `roster.classes`, step 5a; file f item 432; listed in the manifest; a class row may
override). A class is ELIGIBLE only when all hold: its template family is `shopfront`, `workshop-row`, `tavern-row`,
`dwelling-row`, `chapel` or `watch-house`; its compiled profile emits no `fire` ≥ 2 and no `smell` 3 (a timber deck and a
crowded way); its balance is not `heavy`; it is not `outside`; its `crypt` is not `always`. Eligible trades and shops take
`[bridge, mole, quay]`; `row_house`, `house` and `lodging_house` `[bridge, quay]`; `chapel` `[bridge]` (the bridge chapel);
`toll_house` `[bridge]` (a bridge gatehouse); `guard_post` `[bridge, mole]`. Explicit rows:
`fishmonger` and `ship_chandlery` `[pier, mole, quay]`; `fish_landing` `[pier, quay]`; `harbour_master` and
`customs_house` `[quay]`. The landmark-slot classes take their slots only: `fort` `[mole, bridge]`, `lighthouse` `[mole]`,
`watchtower` `[mole, bridge]` — `DeckContext.landmark` only. Compile bar T-V11-32 (c): no class whose `crypt` is `always`
or whose profile emits `fire` ≥ 2 carries a deck kind (V02 X16; J-V2.68). **Per use** (V02 X16): S10b
reads `deckOk` per use — `[]` when the use's effective crypt is `always` (its class `always`, a dossier crypt record bound
to it, V08 DR32, or a keyword row `binds: 'cryptAlways'`, V11 §3.13.2), else its class's compiled column — so a bridge
chapel carrying a crypt record stands on land with its crypt, and V09's T6 landward bend sends a hand placement there. A
class not admitted: `says` "a {class} can't stand on a {deck}" (id `deckok/<class>`). V07's village rows (`v.<id>`, V11
§2.9) carry their own cells at village rungs.

*`deck.landmarks`* (registry row 83; one claimant per slot; the draws are the cutter's, keyed by the slot's deck lineage;
a declared or stamped class is held and exempt from the chance):

| slot | claimants, in order |
|---|---|
| `moleHead` | at a WALLED port, item 106 (e)'s harbour-mouth chain tower holds it (wall furniture, never a building); a `fort` replaces it as the chain's anchor on that head at chance 0.5 at CITY and METROPOLIS when V11 §3.16.2's matched threat is `naval` or `raider`. At an UNWALLED port: a `lighthouse` on a sea-facing mole (CITY 0.3, METROPOLIS 0.5), else a `watchtower` (0.2 at every rung) |
| `midMole` | a `watchtower`: TOWN 0.1, CITY 0.2, METROPOLIS 0.3 |
| `bridgeMid` (span ≥ `minSpanM` 40 m — file f item 246's slot; this cell is the constant's one home, V09 §4.20 cites it) | a `fort` at 0.05 at CITY and above, on a bridge outside the enceinte on a through route; otherwise by declaration only (J78's bridge fortress) |
| `islet` | a `lighthouse` at 0.6 where a causeway or mole reaches a sea islet |

The two new classes (`fort`, `lighthouse`) are V11 §3.5.7's and V11 §3.5.9's rows; the `deck` material key is V11 §3.19.3's.

**3.24.5 The way-class crossing rule** (item 110 (a): "a stair or a ramp by its slope (a way-class rule, never a gap in the
wall)"; (b): "its two ends are ramps or stairs joined to ground vertices"; J-V11.47). *`ways.crossing`*
(registry row 81; readers: the way builders where a way crosses a `RetainingWall` — S4, S5, S9 and V01's lanes and seeds (S8, S8.seed) — the
raised ways' ends (S4's and each later stage's S5b's viaducts, S6's end and V06 §3.19's pass), the stair-stepped way's
naming context and step ticks (S13a, S14; V01 §3.6 (3)), V09's T4 ghosts):

| class | carts | rampMaxGrade | switchback | stair (riser cm · tread cm · landing every cm · landing m) |
|---|---|---|---|---|
| `through` | yes | 0.08 | yes | — |
| `primary`, `secondary` | yes | 0.10 | yes | — |
| `track` | yes | 0.12 | yes | — |
| `lane`, `alley`, `cul_de_sac` | no | 0.12 | no | 15 · 38 · 180 · 1.2 |
| `path` | no | 0.15 | no | 16 · 35 · 200 · 1.0 |
| `quay`, `pier`, `bridge`, `ford` | — | — | — | — (never cross a retaining wall; a bridge's approach ramps read `primary`'s row) |
| `aqueduct` | — | — | — | — (never a stair or a ramp: its channel keeps its gradient, buried or arched) |

* **The rule.** A crossing is a ramp when the step over the run available is at most `rampMaxGrade`, or when a switchback
  fits within `minTerraceDepthM` (V11 §3.24.1); otherwise a stair when the class has one.
* **The pre-decided failure for a cart class.** The ramp takes up to 1.5 × `rampMaxGrade`, reported `W_STEEP_RAMP` — never a
  stair and never a gap in the wall (the owner's words).
* **Beyond 1.5 × `rampMaxGrade`** (V11 §3.26's row EI-V11-EDGE-1; a 4 m step across a `through` way with a short run): the levelling
  repairs locally (§5's rung 2) — it re-cuts the two levelling units the way separates so that the step where the way
  crosses falls within the steep ramp's reach, the high unit's datum lowered along the way's corridor and the difference
  carried by the base's plinths and skirts at the buildings (reported `W_STEP_RECUT`); where no re-cut within `stepMinCm` to
  `stepMaxCm` on both sides reaches it, the units are not levelled at that crossing — the base's skirts and stepped wings
  carry the fall and no retaining wall stands across the way (§5's rung 5, leave out and report, `W_UNLEVELLED_AT_WAY`).
  Never a stair on a cart class, never a gap in a standing wall, never a whole-map retry. The bar is T-V11-45 (b).
* Street stairs are shallower than a building's; V02's building stair constants stay V02's and are never read for streets.
  T-V11-32 (f): the table covers every `WayClass`. The `says` (id `cross/<class>`): "a stair here: the terrace wall is {h}
  m and this lane carries no carts" or "a ramp at {g} %".

**3.24.6 The water need** (item 110 (b): "where the city's water need exceeds what its wells, river and cisterns supply
inside the walls"; J-V11.45). *`water`* (registry row 85; one row; readers: the aqueduct reason — the base's S6
test and V06 §3.19's pass — and V09's uphill-aqueduct bend to a well, J-VI.4 (h)). The balance reads only eager inputs, since the reason is
decided before any well, cistern or household is placed:
* **Demand** `D = pop_in × farShare × perHeadL ÷ 1000` (m³ a day): `pop_in` S2's population inside the enceinte; `farShare`
  S6's density-weighted share of the intramural area lying beyond the base's `cisternDistM` (II.7.6's row, read, never
  restated) from a river or lake face, since frontage serves the rest; `perHeadL` 20.
* **Supply** `S = walledHa × wellsPerHa(geology) × wellYieldM3 + walledHa × 10 000 × roofShare × captureShare(biome) ×
  rainMm ÷ 1000 ÷ 365`: `wellsPerHa` by S1's geology row — alluvial 1.0, default 0.6, soluble 0.3, volcanic 0.3;
  `wellYieldM3` 4 m³ a day; `roofShare` 0.4; `captureShare` arid 0.3, maritime 0.1, every other biome 0.05 (cistern towns
  of dry climates); `rainMm` the climate row's `rainMmPerYear` (V11 §3.17.1).
* **The ratio** `needRatio = D ÷ S` (`S = 0` counts as unmet, and the candidate lives); an aqueduct is a candidate when
  `needRatio > aqueduct.needRatioMin` and an intake lies within `sourceReachKm` (else `aqueduct_no_source`, reported). The
  standing aqueducts' deliveries join `S` at an epoch (V06 §3.19 (3)).
* **Worked check** (PLAUSIBLE; T-V11-33's bench measures it). A temperate alluvial CITY of 15 000 in 100 ha, far share 0.6: D 180, S 240 +
  41, ratio 0.64 — no aqueduct. An arid METROPOLIS of 60 000 in 300 ha, far share 0.7: D 840, S 360 + 197, ratio 1.5 — a
  candidate. The rule favours dry, karst and large cities, as the historical pattern does.
* **Pre-decided fallback** (V12's register; T-V11-33's bench): if the share of arid METROPOLIS seeds with an aqueduct
  candidate is below 0.5, or the share of temperate alluvial CITY seeds with one is above 0.2, `perHeadL` moves by 5 litres
  once toward the missed side and the bench re-runs; a second miss is reported to the owner with both measurements.

**3.24.7 The dossier's reach into item 110** (items 20, 20 (h); J-V11.48):
1. **The aqueduct terminal.** V11 §3.3.3's feature class `raised:terminal` is the distance to the terminal point of a
   generated or declared aqueduct. The binding is never a class row (a hard class row would exclude every plot of a town
   with no aqueduct and pull every conduit house to one point): the aqueduct's generator (the base's) writes ONE §7.7
   `PlacementCriteria` row, id `pc/aqueduct/<way lineage>`, "`near` → `raised:terminal` within 0, hard", on exactly one
   `conduit_house` roster member — the dossier-bound one when a record binds one, else the first
   unplaced member in roster sequence — when the terminal kind is `cistern` and the roster or the dossier holds a
   `conduit_house` (J-VI.9); otherwise the terminal is a fountain pin (V11 §3.24.2). File f item 401 adds the generator as
   a writer of `PlacementCriteria` for this row only. Every other conduit house keeps its class row, and no class row
   carries a hard terminal row.
2. **The toll bridge.** `dossier.kinds` gains the optional cell `implies` (V08's shape); the row `toll_bridge`
   carries `implies: 'bridge'` (V11 §3.11). The `toll_house` class rows try "`near` → bridge within 30, hard" first when the
   settlement has a bridge, else "`nearGate` within 30, hard" (V11 §3.5.6): one physical need, tried in order, never two
   equal-weight rows.
3. **The dossier's water system.** At CITY and METROPOLIS, when `aqueduct_or_water_system` (or its SIZE greater
   `advanced_water_infrastructure`, V11 §3.12) is present: (a) the need test counts as met; (b) the
   chance takes no factor from the record — it stands at chance 1 on every SettlementForge city, so a factor would be one
   constant (J-V8.67); (c) each SIZE member raises the aqueduct cap and `totalCap`
   by `capPerSizeMember`; (d) the bound `conduit_house` is the terminal and the terminal kind is forced to
   `cistern`. The record never forces arches: the source-in-reach condition and `pMax` hold, and a miss is reported
   `aqueduct_no_source`. At TOWN the record never raises arches (item 110 (b)); its conduit house stands.
4. **Landmarks on high ground.** The records that count are DR35's: the dossier-bound
   institutions whose class significance is at least `elevated.landmarkMinSignificance` (20, the castle's; V11 §3.24.2), and the custom records at `landmarkLevel` `landmark`, read at their S3 reservations and cited, never restated; a reservation is on high ground when its mean ground stands at least
   `elevated.highGroundM` (10 m) above the median ground of the intramural area; at most `landmarkMax` (2) count per road;
   landmark strings never count.
5. **The culture.** `site.culture` → V11 §3.20.3's `building` block and V11 §3.24.3's rows.

=== END ===
