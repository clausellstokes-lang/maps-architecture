# Rewrite — V06 (evolution): the coherence, cohesion, wiring and elegance pass

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-V06; covered by the whole-design retrovalidation (J84).

**Output:** `docs/validation/coherence/new/volumes/V06-evolution.md` (same title line and section structure, one marker
line; new subsections §2.14, §3.12.1, §3.20, §3.21). Working parts: `docs/validation/coherence/work/rewrite-V06/`.

## Sizes

| measure | before | after | change |
|---|---|---|---|
| words (`wc -w`) | 104 574 | 93 672 | −10 902 (−10.4 %) |
| words (the canon's counter) | 106 357 | ≈ 95 300 (same ratio) | ≈ −10.4 % |
| bytes | 665 661 (650 KB) | 586 557 (573 KB) | −11.9 % |

**Shares of the words removed (≈ 20 400 removed, ≈ 9 500 added):** narration ≈ 12 900 (the 180-line banner, ledger and
reading-record head 2 279; the eleven reconciliation and finalization notes 7 851; §12's round history ≈ 2 000; the
revision narration in §9's rows and the ≈ 800 critique and seam ids in the body ≈ 800); restatement ≈ 5 300 (§10's 28
request blocks 5 588 → a 28-row pointer table ≈ 900; §13's 49 hand-off rows and ledgers 5 139 → the closure table ≈ 900;
the 14 references, the verbatim V05 §6 quotation (V06-RESTATE-1), the pathway, `formerClass`, `why`, `suppress`, device
settings and crypt-lifecycle restatements → pointers ≈ 1 400); duplicated mechanisms ≈ 400 (E-01's profile mechanics
cited at §2.2 rule 5 instead of restated in §2.12; the EpochReport's two `households` blocks made one; the integration
notes folded); verbose prose ≈ 1 800 (§1b's longest wiring rows, §6.2's century derivation, §1.2's "applied by the
coherence pass" asides, §9's row wording).

**Added (new design the pass requires, ≈ 9 500):** g item 111's V06 part ≈ 1 200 (§3.12.1, §3.5.3 (4), the drought row,
the `spring.*` and `drought.*` rows, W82, T-V6-70, J-V6.127–129); g item 113's V06 part ≈ 4 600 (§2.14, §3.20, §6.3's
replay budget, W83–W86, E9, T-V6-72–77, J-V6.130–135, the §3.15 and §4.4 bends, the dossier-trace history row); the edge
catalogue ≈ 3 300 (§3.21: 6 general rules, 37 mechanism rows, 13 combination rows, T-V6-71); closures ≈ 400 (§4.1's undo
after a reload and in a shared document, §4.5's V10 reads, the IN notes' content at their homes).

**Why below the band (25–40 %).** The carried text alone shrank ≈ 19.5 % (104.6k → ≈ 84.2k); the owner's items 111 and
113 and principle (11)'s edge catalogue add ≈ 9.5k of required design. The remaining body is dense normative text —
interfaces, rule tables with values, per-step algorithms with their order, lifecycle rows, test bars and reasoned
decisions — whose every sentence is a rule, a case, a value or a bar (the guard forbids thinning them); its only
restatements left are the wiring table's producer and consumer names (principle (7) requires them) and §0's plain-words
summary (the volume's own, by design). No unit part shrank by more than half.

## Conflicts resolved (9)

| conflict | ruling applied at |
|---|---|
| V06-ICONF-1 | V06 §2.8: the no-stretch `repairWall` with no neglect is a no-op with its line ("this wall is in use"; nothing changes, no event) |
| V06-ICONF-2 | V06 §9 J-V6.92: the water-system record makes the need count as met, raises the aqueduct cap and total by `capPerSizeMember` per SIZE member, binds the terminal, never scales the chance |
| V06-ICONF-3 | V06 §2.3's `stoppedAt?`; V06 §10's BCR-V6-9 → item 343 row names it (cross-part note to determinism) |
| V06-ICONF-4 | V06 §5.1: V09's label "Open a copy from here" |
| V06-XCONF-1 | J-V6.4 marked superseded by g item 113 (E-24); V06 §1.3's bullet replaced; V06 §3.20 written |
| V06-XCONF-2 | DR28 (one row with V08's) and DR29 everywhere; "the coherence pass numbers it" removed |
| V06-AGREE-1 | V06 §3.19.3 (6), §4.2: V09's `info.remove.holds` with its `{kind}` slot; the deck-plot line a V09 variant row |
| CANON-C02 | V06 §4.1: a standalone neighbourhood document has no clock (the ruled behaviour, V09/V10 bend rows, T-V6-23); J-V6.102 |
| CANON-C03 | V06 §11: Q1 answered, J122 |

## Elegance rulings applied

* **E-01 — UNIFY (stretch-state profiles).** V06 §2.12's rows for `Enceinte.condition` and `RetainingWall.state` now cite
  §2.2 rule 5 for the mechanism and keep only what each record owns. Equivalence list, each item at its home:
  - [x] canonical form (first-vertex knot, no knot on a closed chain's start, drop equal knots, all-equal as scalar, `standing` absent) — §2.2 rule 5; V06 §2.12 cites it ("§2.2 rule 5's canonical form"; "absent = `standing`")
  - [x] write (near knot the new state, far knot the old; `splitThrough`; no stretch = whole chain) — §2.2 rule 5; V06 §2.12 ("each writing over its `StretchRef` by §2.2 rule 5")
  - [x] read (`sampleProfile`, cyclic on a closed chain) — §2.2 rule 5
  - [x] regenerate (knot carry by lattice point; re-placement within `retaining.settings.stateSnapCm`; first-vertex knot re-placed) — §2.2 rule 5; V06 §2.12 ("§2.2 rule 5's carry"); the cell's register line at V06 §8 (E2, `bar.T-V6-62`)
  - [x] cut or join (J-K23's rekey pairing) — §2.2 rule 5; V06 §2.12 ("kept through a re-derivation, a cut or a join by §2.2 rule 5")
  - [x] undo (the writing op's undo restores the profile) — §2.2 rule 5; V06 §2.12's undo cells
  - [x] migrate (absent = default; a scalar = constant profile) — §2.2 rule 5
  - [x] RetainingWall keeps: values standing|decayed|ruined, knot role `retaining_state_knot`, writers (BCR-V6-26's member: breach → decayed, dismantle → ruined; `repairRetaining`; V05's landfall; V07's house-platform walls through the pool), restoration over the re-levelled length (V06 §3.19.4 (6)), readers (V06 §3.19.4, V04 footings, the renderer, item 447's export, the clerk) — V06 §2.12's row, §3.19.4, W77
  - [x] Enceinte keeps: values standing|breached|dismantled, knot role `wall_state_knot`, writers (`breach`, `dismantle`, V05's landfall, `repairWall`), its lifecycle rules (abandoned on neglect; decayed while a run is not standing; lifted by the no-stretch `repairWall`, V06 §2.8), §8.2's gap glyph and trace discs, §11.1's per-run LineStrings — V06 §2.12's row, §2.8, §3.7.5, W79, §5.1
* **E-02 — KEEP APART** (the suppression on a delete event and V05's live island record). V06 §2.13 states the nuance
  that separates them (a count-law slot and an archived arena a key on an event cannot hold) and cites the one lift rule
  at §2.8 (item 260); V06 §2.12's suppression row cites it.
* **E-24 — UNIFY (one mark on a superseded or amended decision).** J-V6.4 "**superseded by** g item 113"; J-V6.111
  "**amended by** J-V6.126". Equivalence: [x] no row dropped (J-V6.4 and J-V6.111 kept with their text); [x] the governing
  row keeps the reason (g item 113 at V06 §3.20; J-V6.126's reason). Every other row's revision narration
  ("**revised**", "*Amended (…)*", "as round 3 amends it", "a recorded variation of C6-…") is stated in final form.
* **E-39 — KEEP APART** (closure and decline states). No unification; V06 §3.18.1 reads V04's `lost` value (item 113 (e))
  where a lived void's last open path closes; the way ladder, the stretch condition and the building lifecycle stay as they are.

No other unification was made.

## Id rulings and renumberings

* **ID-DR:** DR-V6.1 → DR28 (one row with V08's DR-V8.6); DR-V8.1 → DR29; the dossier trace names DR30–DR35 for items
  105 (i), 109 (a), (b), (k) and 110 (b); DR36–DR39 cited for the history.
* **ID-BCR:** no bare `BCR-n` of V01 or V04 remains (the one hit, V01's `BCR-6`, now cites file f item 207).
* **ID-WX:** bare other-volume row ids removed (`X17`, `X31`, `X23` …); this volume's `W1`–`W86` stay local; the IN ids
  live only in the Integration notes table and the validation records.
* **G-cite:** every `V6 §`, `V4 §`, `V1-3.7.3`-style pointer normalised to `V06 §`, `V04 §`, `V01 §3.7.3`.
* **Terms:** G-strike ("strike pool"), G-hollow ("hollow way"), G-forkat ("Open a copy from here"), G-standalone
  ("standalone neighbourhood document"), G-dwell (`N_b` for the candidate dwellings), G-newrandom ("New random";
  `rerollLayer` in the one test clause), G-unitinput (the `handover` kept only as V05's `IslandInstitution.handover`),
  G-DR as above, G-lot (no hit remains).
* **New ids** (none collides): W82–W86; T-V6-70–T-V6-77; J-V6.127–J-V6.136; build step E9. No existing id renumbered.

## Wiring gaps closed (6)

* **W-DOS-02** — W27's producer is V08 §3.5's diff row `wealth` (→ `EpochInputs.wealthLevel`, DR6).
* **W-DOS-09** — the replay record: V06 §3.20.6 writes the `HistoryRecord` the clerk reads (DR36–DR39 the base's).
* **W-DOS-10d** — the dossier trace cites DR33, DR34, DR35 (and DR30–DR32) by number.
* **V06-WGAP-1a / 1b** — V06 §4.1 names V09's `bend.*` row and V10's bend row for the line (their rows are V09's and V10's; cross-part notes).
* **V06-WGAP-2** — V06 §13 keeps no open item; X1–X49 are closed at their destinations and this volume's inbound hand-offs in its table.

## g items written at build depth

* **111 — failing springs and oases over epochs:** V06 §3.12.1 (the droughts, the flow, failure and return, what follows,
  the neutral pin), §3.5.3 (4) (the gardens), §2.2 (`spring.*`, `drought.*`), §2.4 (the `drought` hazard row and calamity
  row), §2.12 and §4.2 (lifecycle and hand form), §5 (drawing, template lines, `plat:springFlow`), W82, the trace's drought
  and oasis rows, T-V6-70, E5, J-V6.127–129.
* **113 — the replay engine at generation:** V06 §2.14 (records), §3.20 (plan, first generation, prefix epochs, what a
  replay epoch runs, lazy detail, destruction, abandoned epochs, refounding, burial through V04's `BuriedFormer.lay`,
  symbolic provenance, the budget, the record, the present met, lifecycle, edges), §3.1 (3) and §3.16 (the replay's
  epoch component), §3.15 (scrubbing the past), §4.4 (the bends), §4.5 (the story), §5 (drawing, years, exports), §6.3
  (budget), W83–W86, T-V6-72–77, E9, J-V6.130–135; J-V6.4 and §1.3's bullet retired.

## Hand-offs closed here (19)

V02:X8, V07:FL-3, V08:X3, V08:X11, V08:X21, V08:X24, V09:XV-V9-23, V09:XV-V9-28, V10:CVR-V10-5, V10:CVR-V10-11,
V11:X-V11-11, V11:X-V11-15, V11:X-V11-16, V12:X-V12-4, V12:X-V12-10, V12:X-V12-11, V12:X-V12-15, V12:X-V12-17,
V12:X-V12-19 — each at the home V06 §13's table names; CVR-V10-5 and CVR-V10-11 by the new paragraph of V06 §4.5.

## Edges (principle (11))

The 48 UNDEFINED and 64 UNTESTED edges of V06's mechanisms, the two inventory edges (EI-V06-EDGE-1, -2) and the 42
UNDEFINED combinations routed here are defined, placed on the failure ladder and tested in V06 §3.21 (T-V6-71, T-V6-72)
and V06 §3.20.9 (T-V6-77); the two named combinations ("a settlement that grows over a sealed void", "an epoch undone
after a save") are rows of V06 §3.21.3.

## Open findings routed here (51) — each closed

| finding | closed at |
|---|---|
| VOL-V05-V06-RESTATEMENTS-013 | V06 §6.2: V05 §6's rows cited by name with their values as inputs; no quotation, no round history |
| V06-RESTATE-1 | same (V06 §6.2) |
| V06-ICONF-1 | V06 §2.8: a no-stretch `repairWall` with no neglect is a no-op with its line; V06 §3.21.2's §2.8 row |
| V06-ICONF-2 | V06 §9 J-V6.92 reworded to the ruled form |
| V06-ICONF-3 | V06 §2.3 carries `stoppedAt?`; V06 §10's BCR-V6-9 row names it; cross-part note to determinism (item 343) |
| V06-ICONF-4 | V06 §5.1: V09's "Open a copy from here" |
| V06-XCONF-1 | J-V6.4 marked superseded by g item 113; V06 §1.3 bullet replaced; V06 §3.20 written |
| V06-XCONF-2 | DR28 / DR29 everywhere (§1b, §2.2, §2.4, §3.3, §3.11); "the coherence pass numbers it" removed |
| V06-AGREE-1 | V06 §3.19.3 (6), §4.2: V09's `info.remove.holds` with its `{kind}` slot; the deck-plot line a V09 variant row (cross-part note) |
| V06-ELEG-1 | E-02 applied: kept apart, the reason stated at V06 §2.13; the lift rule cited at §2.8 (item 260) |
| V06-EDGE-1 | V06 §3.3.2 degenerate requests bent with their lines; T-V6-23 (h); J-V6.136 |
| V06-EDGE-2 | V06 §4.1: undo after a reload by replay; in a shared or host-attached document an appended `undo`; T-V6-23 (i), (j) |
| V06-WGAP-1 | V06 §4.1 names V09's `bend.*` row and V10's bend row; cross-part notes to V09 and V10 |
| V06-WGAP-2 | V06 §13 holds no open item; the 19 hand-offs routed here closed in its table |
| V06-MISSING-1 | V06 §11 Q1 answered (J122); V06 §8 states the combined order |
| V06-MISSING-2 | V06 §3.12.1 (springs and oases over epochs), §3.5.3 (4), §2.2 rows, §2.4 drought row, W82, T-V6-70, J-V6.127–129 |
| V06-MISSING-3 | V06 §2.14, §3.20, §6.3, W83–W86, E9, T-V6-72–77, J-V6.130–135 |
| V06-TERM-1 | G-cite applied: V06 §n for this volume, V0n §n for others, bare § for the base |
| V06-TERM-2 | "hollow way" and "strike pool" throughout (G-hollow, G-strike) |
| V06-DEFER-1 | V06 §4.1: the ruled behaviour (no clock on a standalone neighbourhood document), no promise; J-V6.102 |
| V06-NARR-1 | one marker line; banners, ledgers, PROGRESS and the reading record removed |
| V06-NARR-2 | V06 §9 rows in final form; E-24 marks only |
| V06-NARR-3 | V06 §11 and §10: current price and bound only |
| V06-NARR-4 | V06 §12 two paragraphs; §13 no round notes; IN notes folded |
| V06-NARR-5 | critique and seam ids stripped from normative text (≈ 800); J ids kept |
| V06-BREF-2.r19 | every scratchpad citation removed with the banners |
| V06-BREF-2.r20 | every scratchpad citation removed with the banners |
| V06-BREF-2.r21 | every scratchpad citation removed with the banners |
| V06-BREF-2.r22 | every scratchpad citation removed with the banners |
| V06-BREF-2.r23 | every scratchpad citation removed with the banners |
| V06-BREF-2.r24 | every scratchpad citation removed with the banners |
| V06-BREF-2.r25 | every scratchpad citation removed with the banners |
| V06-BREF-2.r26 | every scratchpad citation removed with the banners |
| V06-BREF-2.r27 | every scratchpad citation removed with the banners |
| V06-BREF-2.r28 | every scratchpad citation removed with the banners |
| V06-BREF-2.r29 | every scratchpad citation removed with the banners |
| V06-BREF-2.r30 | every scratchpad citation removed with the banners |
| V06-BREF-2.r31 | every scratchpad citation removed with the banners |
| V06-BREF-1.r32 | V06 §1b dossier trace: DR33 (105 (i)), DR9/DR24 (108), DR30–DR31 (109 (b)), DR32 (109 (k)), DR34–DR35 (110 (b)) |
| V06-BREF-1.r33 | V06 §1b dossier trace: DR33 (105 (i)), DR9/DR24 (108), DR30–DR31 (109 (b)), DR32 (109 (k)), DR34–DR35 (110 (b)) |
| V06-BREF-1.r34 | V06 §1b dossier trace: DR33 (105 (i)), DR9/DR24 (108), DR30–DR31 (109 (b)), DR32 (109 (k)), DR34–DR35 (110 (b)) |
| V06-BREF-1.r35 | V06 §1b dossier trace: DR33 (105 (i)), DR9/DR24 (108), DR30–DR31 (109 (b)), DR32 (109 (k)), DR34–DR35 (110 (b)) |
| V06-BREF-1 | V06 §1b dossier trace: DR33 (105 (i)), DR9/DR24 (108), DR30–DR31 (109 (b)), DR32 (109 (k)), DR34–DR35 (110 (b)) |
| V06-BREF-2 | every scratchpad citation removed with the banners |
| V06:IN-V06-1 | folded into the body (the Integration notes table points to each home) |
| V06:IN-V06-2 | folded into the body (the Integration notes table points to each home) |
| V06:IN-V06-3 | folded into the body (the Integration notes table points to each home) |
| V06:IN-V06-4 | folded into the body (the Integration notes table points to each home) |
| V06:IN-V06-5 | folded into the body (the Integration notes table points to each home) |
| V06:IN-V06-6 | folded into the body (the Integration notes table points to each home) |
| V06:IN-V06-7 | folded into the body (the Integration notes table points to each home) |

## File f items cited as base text (46) and the requests

The 28 requests BCR-V6-1–28 are pointers to items 317, 321, 254, 429, 209, 206, 264, 342, 343, 443, 458, 388, 275, 339,
409, 550, 335, 336, 293, 265, 266, 478, 479, 260, 290, 291, 573, 574 (V06 §10). The items that concern this volume and
are cited as base text: 202, 206, 209, 226, 244, 245, 246, 252, 254, 260, 263, 264, 265, 266, 268, 270, 274, 275, 290,
291, 293, 317, 318, 319, 321, 322, 335, 336, 339, 342, 343, 347, 370, 388, 409, 429, 443, 458, 478, 479, 550, 568, 573,
574, 575, 581.

## CROSS-PART NOTES

1. **model §2.7 `HistoryHint`** carries only `ageYears` and `scars`, while pipeline §4.11 *History-first generation* (1)
   reads `HistoryHint.peak` and DR36–DR37 read `peakTier`, the high-water population, `history.events` (type, years ago,
   severity), `tierHistory`, `populationHistory`, `calamityHistory`, the lifecycle's terminal death and resettlement and the
   history's culture rows. The record should declare them (V08 fills them, V09's history option writes them); V06 §2.14's
   `HistoryReplay.plan` reads them from `HistoryHint`.
2. **pipeline §4.11 *History-first generation* (2)** says the replay's epochs "draw on the ordinary `…/epoch=e` streams";
   determinism §6.1 keys them with the epoch component `0x8000 + r`. V06 §3.16 and §3.20.3 follow §6.1; the pipeline
   sentence should cite §6.1's form.
3. **pipeline §4.11 *The clock* (1)** should admit a replay epoch's week before the creation week (negative on a standalone
   map whose creation week is 0), the calendar row taking the week's floor modulus (V06 §3.20.3).
4. **model §2.8 *Removals that hold*** quotes the dry-run line "The city will not rebuild this aqueduct; undo brings it
   back"; by V06-AGREE-1 the line is V09's `info.remove.holds` with its `{kind}` slot — the base should cite the key.
5. **determinism (file f item 343)**: `EpochInputs.advance` = { group, index, of, trajectory?, stoppedAt? } (V06-ICONF-3).
6. **determinism §7.7 DR28**: its inputs gain the port's conditions of the drought archetype and the calamity table's
   `drought` row, its target V06's springs step (V06 §3.12.1); the trace row cites it.
7. **model §2.7 `Use`**: item 429's `strain?` is not in the record (only §7.4's `setAttr` row names `Use.strain`).
8. **V09**: the `bend.*` row "a neighbourhood alone has no history yet — open it in its town to advance time" (V06 §4.1;
   V06-WGAP-1a); `info.remove.holds`'s deck-plot variant ("No house will be built on this spot of the bridge"); T2
   `ground`'s flow slider (`setAttr` `WaterBody.spring.flow`, 0.05–1); the timeline's recorded-past band and the bend line
   of "Open a copy from here" inside the replay's prefix (V06 §4.4, §5.1).
9. **V10**: the bend row for the same line (V06-WGAP-1b); the story told from `HistoryRecord` (V06 §4.5); the water-pull
   why rows name a spring's `flow` and its failure (V06 §3.12.1).
10. **V11**: the `history.events` rows carry the effect kinds V06 §2.14's `ReplayEffect` reads (`hazard`, `shock`,
    `calamity` with `deathShare`, `slice`, `demand`, `fortify`, `destroy`) keyed by the history's event types; the cells
    `history.epochYears`, `history.burialYears` with its factors, `history.symbolicQuantile`, `history.reuseCost`; the
    climate rows' arid reading the `drought` row's `where: 'arid'` reads.
11. **V08**: the port maps `activeConditions` of a drought archetype (a `ConditionOverlay`) and drought calamities; its
    §3.5 diff table gains the `wealth` row (W-DOS-02) and a history row whose response is the offer "Regenerate from the
    new history" (V06 §3.20.8).
12. **V12**: `BenchBarDef`s `bar.T-V6-70`, `bar.T-V6-73`, `bar.T-V6-75` and their register lines (V06 §8: `bar.T-V6-70` at E5, due
    `V6-E7`; `bar.T-V6-73` and `bar.T-V6-75` at E9, due `V6-E9`); no-op pins for T-V6-70 (item 111's V06 part) and T-V6-74 (the replay off).
13. **scope §16 and INDEX.md §3–§4**: M6-E's price is now 27–38.25 person-weeks (E5 + 0.25 for the springs, E9 1.5–2.25
    for the replay); its slot is J122's (right after M4, one of four streams).
14. **V04**: T-V4-77's "V06's city to village and refounded fixtures" are V06 §7's `H-HISTORY`; V06 calls
    `BuriedFormer.lay` as the replay epoch's `decline` step's last act and tombstones the surface records in that batch
    (V06 §3.20.4 (5)).
15. **rendering §11.1**: GeoJSON `plat:springFlow`, `plat:springFailed`, `plat:symbolic`; `chronicle.csv`'s `replay`
    column (V06 §5.3).
16. **V07**: refounding at village rungs runs through V07's product phases in the replay (V06 §3.20.4 (4)); the village
    crowding map's water pull reads the same `spring.flow` over epochs.
17. **canon**: `units.V06.bcr_pointer` lists V06-0494 as BCR-V6-12 (item 388); the inventory item is BCR-V6-27 (item 573),
    and the mapping follows the item.

## MAPPING TABLE (502 inventory ids; 0 unmapped)

| inventory id | role | was | now |
|---|---|---|---|
| V06-0001 | home | V06 §0 | V06 §0 |
| V06-0002 | home | V06 §0 | V06 §0 |
| V06-0003 | home | V06 §0 | V06 §0 |
| V06-0004 | home | V06 §0 | V06 §0 |
| V06-0005 | home | V06 §0 | V06 §0 |
| V06-0006 | home | V06 §0 | V06 §0 |
| V06-0007 | home | V06 §0 | V06 §0 |
| V06-0008 | home | V06 §0 | V06 §0 |
| V06-0009 | home | V06 §0 | V06 §0 |
| V06-0010 | home | V06 §1.1 | V06 §1.1 |
| V06-0011 | home | V06 §1.2 | V06 §1.2 |
| V06-0012 | index-row | V06 §1.3 | V06 §1.3 (state; the scope index row cites it) |
| V06-0013 | index-row | V06 §1.3 | V06 §1.3 (state; the scope index row cites it) |
| V06-0014 | index-row | V06 §1.3 | V06 §1.3 (state; the scope index row cites it) |
| V06-0015 | index-row | V06 §1.3 | V06 §1.3 (state; the scope index row cites it) |
| V06-0016 | index-row | V06 §1.3 | V06 §1.3 (state; the scope index row cites it) |
| V06-0017 | index-row | V06 §1.3 | V06 §1.3 (state; the scope index row cites it) |
| V06-0018 | home | V06 §1.3 | retired (V06-XCONF-1: owner g item 113 governs); replaced at V06 §1.3 by the history-first bullet and built at V06 §3.20 |
| V06-0019 | home | V06 §1b | V06 §1b W1 |
| V06-0020 | home | V06 §1b | V06 §1b W2 |
| V06-0021 | home | V06 §1b | V06 §1b W3 |
| V06-0022 | home | V06 §1b | V06 §1b W4 |
| V06-0023 | home | V06 §1b | V06 §1b W5 |
| V06-0024 | home | V06 §1b | V06 §1b W6 |
| V06-0025 | home | V06 §1b | V06 §1b W7 |
| V06-0026 | home | V06 §1b | V06 §1b W9 |
| V06-0027 | home | V06 §1b | V06 §1b W10 |
| V06-0028 | home | V06 §1b | V06 §1b W11 |
| V06-0029 | home | V06 §1b | V06 §1b W12 |
| V06-0030 | home | V06 §1b | V06 §1b W14 |
| V06-0031 | home | V06 §1b | V06 §1b W17 |
| V06-0032 | home | V06 §1b | V06 §1b W19 |
| V06-0033 | home | V06 §1b | V06 §1b W20 |
| V06-0034 | home | V06 §1b | V06 §1b W23 |
| V06-0035 | home | V06 §1b | V06 §1b W27 |
| V06-0036 | home | V06 §1b | V06 §1b W31 |
| V06-0037 | home | V06 §1b | V06 §1b W32 |
| V06-0038 | home | V06 §1b | V06 §1b W34 |
| V06-0039 | home | V06 §1b | V06 §1b W36 |
| V06-0040 | home | V06 §1b | V06 §1b W38 |
| V06-0041 | home | V06 §1b | V06 §1b W40 |
| V06-0042 | home | V06 §1b | V06 §1b W42 |
| V06-0043 | home | V06 §1b | V06 §1b W44 |
| V06-0044 | home | V06 §1b | V06 §1b W45 |
| V06-0045 | home | V06 §1b | V06 §1b W46 |
| V06-0046 | home | V06 §1b | V06 §1b W48 |
| V06-0047 | home | V06 §1b | V06 §1b W49 |
| V06-0048 | home | V06 §1b | V06 §1b W51 |
| V06-0049 | home | V06 §1b | V06 §1b W52 |
| V06-0050 | home | V06 §1b | V06 §1b W55 |
| V06-0051 | home | V06 §1b | V06 §1b W57 |
| V06-0052 | home | V06 §1b | V06 §1b W58 |
| V06-0053 | home | V06 §1b | V06 §1b W60 |
| V06-0054 | home | V06 §1b | V06 §1b W61 |
| V06-0055 | home | V06 §1b | V06 §1b W62 |
| V06-0056 | home | V06 §1b | V06 §1b W64 |
| V06-0057 | home | V06 §1b | V06 §1b W65 |
| V06-0058 | home | V06 §1b | V06 §1b W68 |
| V06-0059 | home | V06 §1b | V06 §1b W70 |
| V06-0060 | home | V06 §1b | V06 §1b W72 |
| V06-0061 | home | V06 §1b | V06 §1b W74 |
| V06-0062 | home | V06 §1b | V06 §1b W76 |
| V06-0063 | home | V06 §1b | V06 §1b W77 |
| V06-0064 | home | V06 §1b | V06 §1b W79 |
| V06-0065 | index-row | V06 §1b | V06 §1b (state; the scope index row cites it) |
| V06-0066 | home | V06 §1b | V06 §1b W81 |
| V06-0067 | home | V06 §1b | V06 §1b (dossier trace) |
| V06-0068 | home | V06 §1b | V06 §1b (dossier trace) |
| V06-0069 | home | V06 §1b | V06 §1b (dossier trace) |
| V06-0070 | home | V06 §1b | V06 §1b (dossier trace) |
| V06-0071 | home | V06 §1b | V06 §1b (dossier trace) |
| V06-0072 | home | V06 §1b | V06 §1b (dossier trace) |
| V06-0073 | home | V06 §1b | V06 §1b (dossier trace) |
| V06-0074 | home | V06 §1b | V06 §1b (dossier trace) |
| V06-0075 | home | V06 §2 | V06 §2 |
| V06-0076 | home | V06 §2.1 | V06 §2.1 |
| V06-0077 | home | V06 §2.1 | V06 §2.1 |
| V06-0078 | home | V06 §2.1 | V06 §2.1 |
| V06-0079 | home | V06 §2.1 | V06 §2.1 |
| V06-0080 | home | V06 §2.1 | V06 §2.1 |
| V06-0081 | home | V06 §2.1 | V06 §2.1 |
| V06-0082 | home | V06 §2.1 | V06 §2.1 |
| V06-0083 | home | V06 §2.1 | V06 §2.1 |
| V06-0084 | home | V06 §2.1 | V06 §2.1 |
| V06-0085 | home | V06 §2.1 | V06 §2.1 |
| V06-0086 | home | V06 §2.1 | V06 §2.1 |
| V06-0087 | home | V06 §2.1 | V06 §2.1 |
| V06-0088 | home | V06 §2.2 | V06 §2.2 |
| V06-0089 | home | V06 §2.2 | V06 §2.2 |
| V06-0090 | home | V06 §2.2 | V06 §2.2 |
| V06-0091 | home | V06 §2.2 | V06 §2.2 |
| V06-0092 | home | V06 §2.2 | V06 §2.2 |
| V06-0093 | home | V06 §2.2 | V06 §2.2 |
| V06-0094 | home | V06 §2.2 | V06 §2.2 |
| V06-0095 | home | V06 §2.2 | V06 §2.2 |
| V06-0096 | home | V06 §2.2 | V06 §2.2 |
| V06-0097 | home | V06 §2.2 | V06 §2.2 |
| V06-0098 | home | V06 §2.2 | V06 §2.2 |
| V06-0099 | reference | V06 §2.2 | reference: V06 §2.2 cites V11 §3.18 for the four knobs (no value restated) |
| V06-0100 | reference | V06 §2.2 | reference: V06 §2.2 cites V09 §5.12 (the settings panel; the canon's "V09 §9" near-match is V09 §5.12) |
| V06-0101 | home | V06 §2.3 | V06 §2.3 |
| V06-0102 | home | V06 §2.3 | V06 §2.3 |
| V06-0103 | home | V06 §2.3 | V06 §2.3 |
| V06-0104 | home | V06 §2.3 | V06 §2.3 |
| V06-0105 | home | V06 §2.4 | V06 §2.4 |
| V06-0106 | home | V06 §2.4 | V06 §2.4 |
| V06-0107 | home | V06 §2.4 | V06 §2.4 |
| V06-0108 | home | V06 §2.5 | V06 §2.5 |
| V06-0109 | home | V06 §2.6 | V06 §2.6 |
| V06-0110 | reference | V06 §2.7 | reference: V06 §2.7 cites §2.7 (item 254) for the fields; the rules the base cites back stay in V06 §2.7 prose |
| V06-0111 | reference | V06 §2.8 | kept at V06 §2.8 (`EvolveOp`): the base cites "V06's EvolveOp" (§2.8 cause, §7.1 convert) and states no union of its own |
| V06-0112 | reference | V06 §2.8 | kept at V06 §2.8 (`repairWall`, its no-stretch case now a no-op with its line, V06-ICONF-1) |
| V06-0113 | reference | V06 §2.8 | kept at V06 §2.8 (`retypeLand`); the base cites V06's EvolveOp |
| V06-0114 | reference | V06 §2.8 | reference: V06 §2.8 cites §2.4 (item 209) for `Way.formerClass` |
| V06-0115 | reference | V06 §2.9 | kept at V06 §2.9 as the field item 429 adds to §2.7's `Use` (cross-part note: the model's `Use` lacks `strain?`) |
| V06-0116 | home | V06 §2.10 | V06 §2.10 |
| V06-0117 | home | V06 §2.10 | V06 §2.10 |
| V06-0118 | home | V06 §2.10 | V06 §2.10 |
| V06-0119 | home | V06 §2.11 | V06 §2.11 |
| V06-0120 | home | V06 §2.12 | V06 §2.12 |
| V06-0121 | home | V06 §2.12 | V06 §2.12 |
| V06-0122 | home | V06 §2.12 | V06 §2.12 |
| V06-0123 | home | V06 §2.12 | V06 §2.12 |
| V06-0124 | home | V06 §2.12 | V06 §2.12 |
| V06-0125 | home | V06 §2.12 | V06 §2.12 |
| V06-0126 | home | V06 §2.12 | V06 §2.12 |
| V06-0127 | home | V06 §2.12 | V06 §2.12 |
| V06-0128 | home | V06 §2.12 | V06 §2.12 |
| V06-0129 | reference | V06 §2.12 | reference: V06 §2.12's crypt row cites V03 §3.7.2 for the lifecycle; V06's epoch rules kept |
| V06-0130 | home | V06 §2.12 | V06 §2.12 |
| V06-0131 | home | V06 §2.12 | V06 §2.12 |
| V06-0132 | home | V06 §2.12 | V06 §2.12 |
| V06-0133 | home | V06 §2.12 | V06 §2.12 |
| V06-0134 | home | V06 §2.12 | V06 §2.12 |
| V06-0135 | home | V06 §2.13 | V06 §2.13 |
| V06-0136 | home | V06 §2.13 | V06 §2.13 |
| V06-0137 | home | V06 §2.13 | V06 §2.13 |
| V06-0138 | home | V06 §2.13 | V06 §2.13 |
| V06-0139 | home | V06 §3.1 | V06 §3.1 |
| V06-0140 | home | V06 §3.1 | V06 §3.1 |
| V06-0141 | home | V06 §3.1 | V06 §3.1 |
| V06-0142 | home | V06 §3.1 | V06 §3.1 |
| V06-0143 | home | V06 §3.1 | V06 §3.1 |
| V06-0144 | home | V06 §3.1 | V06 §3.1 |
| V06-0145 | home | V06 §3.1 | V06 §3.1 |
| V06-0146 | home | V06 §3.2 | V06 §3.2 |
| V06-0147 | home | V06 §3.2 | V06 §3.2 |
| V06-0148 | home | V06 §3.2 | V06 §3.2 |
| V06-0149 | home | V06 §3.2 | V06 §3.2 |
| V06-0150 | reference | V06 §3.2 | reference: V06 §3.2 cites V04 §3.5.4 (d) for the reconcile; the ordering and the guarantee (V06's) kept |
| V06-0151 | home | V06 §3.2 | V06 §3.2 |
| V06-0152 | home | V06 §3.2 | V06 §3.2 |
| V06-0153 | home | V06 §3.2 | V06 §3.2 |
| V06-0154 | home | V06 §3.3 | V06 §3.3 |
| V06-0155 | home | V06 §3.3 | V06 §3.3 |
| V06-0156 | home | V06 §3.3 | V06 §3.3 |
| V06-0157 | home | V06 §3.3 | V06 §3.3 |
| V06-0158 | home | V06 §3.3 | V06 §3.3 |
| V06-0159 | home | V06 §3.3 | V06 §3.3 |
| V06-0160 | home | V06 §3.4 | V06 §3.4 |
| V06-0161 | home | V06 §3.4 | V06 §3.4 |
| V06-0162 | home | V06 §3.4 | V06 §3.4 |
| V06-0163 | home | V06 §3.4 | V06 §3.4 |
| V06-0164 | home | V06 §3.4 | V06 §3.4 |
| V06-0165 | home | V06 §3.4 | V06 §3.4 |
| V06-0166 | home | V06 §3.4 | V06 §3.4 |
| V06-0167 | home | V06 §3.4 | V06 §3.4 |
| V06-0168 | home | V06 §3.5.1 | V06 §3.5.1 |
| V06-0169 | home | V06 §3.5.1 | V06 §3.5.1 |
| V06-0170 | home | V06 §3.5.2 | V06 §3.5.2 |
| V06-0171 | home | V06 §3.5.2 | V06 §3.5.2 |
| V06-0172 | home | V06 §3.5.2 | V06 §3.5.2 |
| V06-0173 | home | V06 §3.5.2 | V06 §3.5.2 |
| V06-0174 | home | V06 §3.5.2 | V06 §3.5.2 |
| V06-0175 | home | V06 §3.5.2 | V06 §3.5.2 |
| V06-0176 | home | V06 §3.5.2 | V06 §3.5.2 |
| V06-0177 | home | V06 §3.5.2 | V06 §3.5.2 |
| V06-0178 | home | V06 §3.5.2 | V06 §3.5.2 |
| V06-0179 | home | V06 §3.5.2 | V06 §3.5.2 |
| V06-0180 | home | V06 §3.5.3 | V06 §3.5.3 |
| V06-0181 | home | V06 §3.5.3 | V06 §3.5.3 |
| V06-0182 | home | V06 §3.6 | V06 §3.6 |
| V06-0183 | home | V06 §3.6 | V06 §3.6 |
| V06-0184 | home | V06 §3.6 | V06 §3.6 |
| V06-0185 | home | V06 §3.7.1 | V06 §3.7.1 |
| V06-0186 | home | V06 §3.7.1 | V06 §3.7.1 |
| V06-0187 | home | V06 §3.7.2 | V06 §3.7.2 |
| V06-0188 | home | V06 §3.7.2 | V06 §3.7.2 |
| V06-0189 | home | V06 §3.7.2 | V06 §3.7.2 |
| V06-0190 | home | V06 §3.7.3 | V06 §3.7.3 |
| V06-0191 | home | V06 §3.7.4 | V06 §3.7.4 |
| V06-0192 | home | V06 §3.7.4 | V06 §3.7.4 |
| V06-0193 | home | V06 §3.7.5 | V06 §3.7.5 |
| V06-0194 | home | V06 §3.7.5 | V06 §3.7.5 |
| V06-0195 | home | V06 §3.7.6 | V06 §3.7.6 |
| V06-0196 | home | V06 §3.7.6 | V06 §3.7.6 |
| V06-0197 | home | V06 §3.7.6 | V06 §3.7.6 |
| V06-0198 | home | V06 §3.7.6 | V06 §3.7.6 |
| V06-0199 | home | V06 §3.7.6 | V06 §3.7.6 |
| V06-0200 | home | V06 §3.7.6 | V06 §3.7.6 |
| V06-0201 | home | V06 §3.8.1 | V06 §3.8.1 |
| V06-0202 | home | V06 §3.8.2 | V06 §3.8.2 |
| V06-0203 | home | V06 §3.8.2 | V06 §3.8.2 |
| V06-0204 | home | V06 §3.8.2 | V06 §3.8.2 |
| V06-0205 | home | V06 §3.8.3 | V06 §3.8.3 |
| V06-0206 | home | V06 §3.8.4 | V06 §3.8.4 |
| V06-0207 | home | V06 §3.9 | V06 §3.9 |
| V06-0208 | home | V06 §3.9.1 | V06 §3.9.1 |
| V06-0209 | home | V06 §3.9.1 | V06 §3.9.1 |
| V06-0210 | home | V06 §3.9.2 | V06 §3.9.2 |
| V06-0211 | home | V06 §3.9.3 | V06 §3.9.3 |
| V06-0212 | home | V06 §3.9.4 | V06 §3.9.4 |
| V06-0213 | home | V06 §3.9.5 | V06 §3.9.5 |
| V06-0214 | home | V06 §3.9.5 | V06 §3.9.5 |
| V06-0215 | home | V06 §3.9.5 | V06 §3.9.5 |
| V06-0216 | home | V06 §3.9.6 | V06 §3.9.6 |
| V06-0217 | home | V06 §3.9.6 | V06 §3.9.6 |
| V06-0218 | home | V06 §3.9.6 | V06 §3.9.6 |
| V06-0219 | home | V06 §3.9.7 | V06 §3.9.7 |
| V06-0220 | home | V06 §3.9.8 | V06 §3.9.8 |
| V06-0221 | home | V06 §3.9.9 | V06 §3.9.9 |
| V06-0222 | home | V06 §3.9.10 | V06 §3.9.10 |
| V06-0223 | home | V06 §3.9.10 | V06 §3.9.10 |
| V06-0224 | home | V06 §3.9.10 | V06 §3.9.10 |
| V06-0225 | home | V06 §3.9.11 | V06 §3.9.11 |
| V06-0226 | home | V06 §3.9.11 | V06 §3.9.11 |
| V06-0227 | home | V06 §3.10.1 | V06 §3.10.1 |
| V06-0228 | home | V06 §3.10.2 | V06 §3.10.2 |
| V06-0229 | home | V06 §3.10.3 | V06 §3.10.3 |
| V06-0230 | home | V06 §3.11.1 | V06 §3.11.1 |
| V06-0231 | home | V06 §3.11.2 | V06 §3.11.2 |
| V06-0232 | home | V06 §3.11.2 | V06 §3.11.2 |
| V06-0233 | home | V06 §3.11.3 | V06 §3.11.3 |
| V06-0234 | home | V06 §3.11.4 | V06 §3.11.4 |
| V06-0235 | home | V06 §3.11.5 | V06 §3.11.5 |
| V06-0236 | home | V06 §3.11.6 | V06 §3.11.6 |
| V06-0237 | home | V06 §3.12 | V06 §3.12 |
| V06-0238 | home | V06 §3.12 | V06 §3.12 |
| V06-0239 | home | V06 §3.13 | V06 §3.13 |
| V06-0240 | home | V06 §3.13 | V06 §3.13 |
| V06-0241 | home | V06 §3.13 | V06 §3.13 |
| V06-0242 | home | V06 §3.14 | V06 §3.14 |
| V06-0243 | home | V06 §3.15.1 | V06 §3.15.1 |
| V06-0244 | home | V06 §3.15.2 | V06 §3.15.2 |
| V06-0245 | home | V06 §3.15.2 | V06 §3.15.2 |
| V06-0246 | home | V06 §3.15.4 | V06 §3.15.4 |
| V06-0247 | home | V06 §3.15.5 | V06 §3.15.5 |
| V06-0248 | home | V06 §3.16 | V06 §3.16 |
| V06-0249 | home | V06 §3.16 | V06 §3.16 |
| V06-0250 | home | V06 §3.16 | V06 §3.16 |
| V06-0251 | home | V06 §3.17 | V06 §3.17 |
| V06-0252 | home | V06 §3.17 | V06 §3.17 |
| V06-0253 | index-row | V06 §3.18 | V06 §3.18 (state; the scope index row cites it) |
| V06-0254 | home | V06 §3.18.1 | V06 §3.18.1 |
| V06-0255 | home | V06 §3.18.1 | V06 §3.18.1 |
| V06-0256 | home | V06 §3.18.1 | V06 §3.18.1 |
| V06-0257 | home | V06 §3.18.1 | V06 §3.18.1 |
| V06-0258 | home | V06 §3.18.1 | V06 §3.18.1 |
| V06-0259 | home | V06 §3.18.1 | V06 §3.18.1 |
| V06-0260 | home | V06 §3.18.1 | V06 §3.18.1 |
| V06-0261 | home | V06 §3.18.2 | V06 §3.18.2 |
| V06-0262 | home | V06 §3.18.2 | V06 §3.18.2 |
| V06-0263 | home | V06 §3.18.2 | V06 §3.18.2 |
| V06-0264 | home | V06 §3.18.2 | V06 §3.18.2 |
| V06-0265 | home | V06 §3.18.3 | V06 §3.18.3 |
| V06-0266 | home | V06 §3.18.3 | V06 §3.18.3 |
| V06-0267 | home | V06 §3.19 | V06 §3.19 |
| V06-0268 | home | V06 §3.19 | V06 §3.19 |
| V06-0269 | home | V06 §3.19 | V06 §3.19 |
| V06-0270 | home | V06 §3.19 | V06 §3.19 |
| V06-0271 | home | V06 §3.19 | V06 §3.19 |
| V06-0272 | home | V06 §3.19 | V06 §3.19 |
| V06-0273 | home | V06 §3.19 | V06 §3.19 |
| V06-0274 | home | V06 §3.19 | V06 §3.19 |
| V06-0275 | home | V06 §3.19 | V06 §3.19 |
| V06-0276 | home | V06 §3.19 | V06 §3.19 |
| V06-0277 | home | V06 §3.19 | V06 §3.19 |
| V06-0278 | home | V06 §3.19 | V06 §3.19 |
| V06-0279 | reference | V06 §3.19 | reference: V06 §3.19 reads V11 §3.24.2's rows, no copy (as in the source) |
| V06-0280 | home | V06 §3.19.1 | V06 §3.19.1 |
| V06-0281 | home | V06 §3.19.1 | V06 §3.19.1 |
| V06-0282 | home | V06 §3.19.2 | V06 §3.19.2 |
| V06-0283 | home | V06 §3.19.2 | V06 §3.19.2 |
| V06-0284 | home | V06 §3.19.2 | V06 §3.19.2 |
| V06-0285 | home | V06 §3.19.3 | V06 §3.19.3 |
| V06-0286 | home | V06 §3.19.3 | V06 §3.19.3 |
| V06-0287 | home | V06 §3.19.3 | V06 §3.19.3 |
| V06-0288 | home | V06 §3.19.3 | V06 §3.19.3 |
| V06-0289 | home | V06 §3.19.4 | V06 §3.19.4 |
| V06-0290 | home | V06 §3.19.4 | V06 §3.19.4 |
| V06-0291 | home | V06 §3.19.4 | V06 §3.19.4 |
| V06-0292 | home | V06 §3.19.5 | V06 §3.19.5 |
| V06-0293 | home | V06 §3.19.5 | V06 §3.19.5 |
| V06-0294 | home | V06 §3.19.6 | V06 §3.19.6 |
| V06-0295 | home | V06 §4.1 | V06 §4.1 |
| V06-0296 | home | V06 §4.1 | V06 §4.1 |
| V06-0297 | home | V06 §4.1 | V06 §4.1 |
| V06-0298 | home | V06 §4.1 | V06 §4.1 |
| V06-0299 | home | V06 §4.2 | V06 §4.2 |
| V06-0300 | home | V06 §4.2 | V06 §4.2 |
| V06-0301 | home | V06 §4.2 | V06 §4.2 |
| V06-0302 | home | V06 §4.2 | V06 §4.2 |
| V06-0303 | home | V06 §4.3 | V06 §4.3 |
| V06-0304 | home | V06 §4.4 | V06 §4.4 |
| V06-0305 | home | V06 §4.4 | V06 §4.4 |
| V06-0306 | home | V06 §4.5 | V06 §4.5 |
| V06-0307 | reference | V06 §4.5 | reference: V06 §4.5 cites V10 §3.9 for the raised-way provider; what V06 records kept |
| V06-0308 | home | V06 §5.1 | V06 §5.1 |
| V06-0309 | home | V06 §5.1 | V06 §5.1 |
| V06-0310 | home | V06 §5.1 | V06 §5.1 |
| V06-0311 | home | V06 §5.2 | V06 §5.2 |
| V06-0312 | home | V06 §5.3 | V06 §5.3 |
| V06-0313 | home | V06 §6 | V06 §6 |
| V06-0314 | home | V06 §6 | V06 §6 |
| V06-0315 | home | V06 §6.2 | V06 §6.2 |
| V06-0316 | home | V06 §6.2 | V06 §6.2 |
| V06-0317 | home | V06 §6.2 | V06 §6.2 |
| V06-0318 | home | V06 §6.3 | V06 §6.3 |
| V06-0319 | home | V06 §6.5 | V06 §6.5 |
| V06-0320 | home | V06 §7 | V06 §7 (fixtures, tiers) |
| V06-0321 | home | V06 §7 | V06 §7 T-V6-1 |
| V06-0322 | home | V06 §7 | V06 §7 T-V6-5 |
| V06-0323 | home | V06 §7 | V06 §7 T-V6-9 |
| V06-0324 | home | V06 §7 | V06 §7 T-V6-12 |
| V06-0325 | home | V06 §7 | V06 §7 T-V6-13 |
| V06-0326 | home | V06 §7 | V06 §7 T-V6-16 |
| V06-0327 | home | V06 §7 | V06 §7 T-V6-19 |
| V06-0328 | home | V06 §7 | V06 §7 T-V6-22 |
| V06-0329 | home | V06 §7 | V06 §7 T-V6-25 |
| V06-0330 | home | V06 §7 | V06 §7 T-V6-27 |
| V06-0331 | home | V06 §7 | V06 §7 T-V6-33 |
| V06-0332 | home | V06 §7 | V06 §7 T-V6-38 |
| V06-0333 | home | V06 §7 | V06 §7 T-V6-41 |
| V06-0334 | home | V06 §7 | V06 §7 T-V6-46 |
| V06-0335 | home | V06 §7 | V06 §7 T-V6-51 |
| V06-0336 | home | V06 §7 | V06 §7 T-V6-52 |
| V06-0337 | home | V06 §7 | V06 §7 T-V6-57 |
| V06-0338 | home | V06 §7 | V06 §7 T-V6-59 |
| V06-0339 | home | V06 §7 | V06 §7 T-V6-62 |
| V06-0340 | home | V06 §7 | V06 §7 T-V6-64 |
| V06-0341 | home | V06 §7 | V06 §7 T-V6-67 |
| V06-0342 | home | V06 §7 | V06 §7 (fixtures, tiers) |
| V06-0343 | home | V06 §8 | V06 §8 |
| V06-0344 | home | V06 §8 | V06 §8 |
| V06-0345 | reference | V06 §8 | reference: V06 §8 cites V12 §3.11 for the register form |
| V06-0346 | reference | V06 §8 | reference: V06 §8 cites V12 §2.1 for `BenchBarDef` |
| V06-0347 | home | V06 §8 | V06 §8 |
| V06-0348 | home | V06 §8 | V06 §8 |
| V06-0349 | home | V06 §9 | V06 §9 J-V6.1 (final form; revision narration removed where it had any) |
| V06-0350 | home | V06 §9 | V06 §9 J-V6.2 (final form; revision narration removed where it had any) |
| V06-0351 | home | V06 §9 | V06 §9 J-V6.3 (final form; revision narration removed where it had any) |
| V06-0352 | home | V06 §9 | V06 §9 J-V6.4, marked **superseded by** g item 113 (E-24); the row kept |
| V06-0353 | home | V06 §9 | V06 §9 J-V6.5 (final form; revision narration removed where it had any) |
| V06-0354 | home | V06 §9 | V06 §9 J-V6.6 (final form; revision narration removed where it had any) |
| V06-0355 | home | V06 §9 | V06 §9 J-V6.7 (final form; revision narration removed where it had any) |
| V06-0356 | home | V06 §9 | V06 §9 J-V6.8 (final form; revision narration removed where it had any) |
| V06-0357 | home | V06 §9 | V06 §9 J-V6.9 (final form; revision narration removed where it had any) |
| V06-0358 | home | V06 §9 | V06 §9 J-V6.10 (final form; revision narration removed where it had any) |
| V06-0359 | home | V06 §9 | V06 §9 J-V6.11 (final form; revision narration removed where it had any) |
| V06-0360 | home | V06 §9 | V06 §9 J-V6.12 (final form; revision narration removed where it had any) |
| V06-0361 | home | V06 §9 | V06 §9 J-V6.13 (final form; revision narration removed where it had any) |
| V06-0362 | home | V06 §9 | V06 §9 J-V6.14 (final form; revision narration removed where it had any) |
| V06-0363 | home | V06 §9 | V06 §9 J-V6.15 (final form; revision narration removed where it had any) |
| V06-0364 | home | V06 §9 | V06 §9 J-V6.16 (final form; revision narration removed where it had any) |
| V06-0365 | home | V06 §9 | V06 §9 J-V6.17 (final form; revision narration removed where it had any) |
| V06-0366 | home | V06 §9 | V06 §9 J-V6.18 (final form; revision narration removed where it had any) |
| V06-0367 | home | V06 §9 | V06 §9 J-V6.19 (final form; revision narration removed where it had any) |
| V06-0368 | home | V06 §9 | V06 §9 J-V6.20 (final form; revision narration removed where it had any) |
| V06-0369 | home | V06 §9 | V06 §9 J-V6.21 (final form; revision narration removed where it had any) |
| V06-0370 | home | V06 §9 | V06 §9 J-V6.22 (final form; revision narration removed where it had any) |
| V06-0371 | home | V06 §9 | V06 §9 J-V6.23 (final form; revision narration removed where it had any) |
| V06-0372 | home | V06 §9 | V06 §9 J-V6.24 (final form; revision narration removed where it had any) |
| V06-0373 | home | V06 §9 | V06 §9 J-V6.25 (final form; revision narration removed where it had any) |
| V06-0374 | home | V06 §9 | V06 §9 J-V6.26 (final form; revision narration removed where it had any) |
| V06-0375 | home | V06 §9 | V06 §9 J-V6.27 (final form; revision narration removed where it had any) |
| V06-0376 | home | V06 §9 | V06 §9 J-V6.28 (final form; revision narration removed where it had any) |
| V06-0377 | home | V06 §9 | V06 §9 J-V6.29 (final form; revision narration removed where it had any) |
| V06-0378 | home | V06 §9 | V06 §9 J-V6.30 (final form; revision narration removed where it had any) |
| V06-0379 | home | V06 §9 | V06 §9 J-V6.31 (final form; revision narration removed where it had any) |
| V06-0380 | home | V06 §9 | V06 §9 J-V6.32 (final form; revision narration removed where it had any) |
| V06-0381 | home | V06 §9 | V06 §9 J-V6.33 (final form; revision narration removed where it had any) |
| V06-0382 | home | V06 §9 | V06 §9 J-V6.34 (final form; revision narration removed where it had any) |
| V06-0383 | home | V06 §9 | V06 §9 J-V6.35 (final form; revision narration removed where it had any) |
| V06-0384 | home | V06 §9 | V06 §9 J-V6.36 (final form; revision narration removed where it had any) |
| V06-0385 | home | V06 §9 | V06 §9 J-V6.37 (final form; revision narration removed where it had any) |
| V06-0386 | home | V06 §9 | V06 §9 J-V6.38 (final form; revision narration removed where it had any) |
| V06-0387 | home | V06 §9 | V06 §9 J-V6.39 (final form; revision narration removed where it had any) |
| V06-0388 | home | V06 §9 | V06 §9 J-V6.40 (final form; revision narration removed where it had any) |
| V06-0389 | home | V06 §9 | V06 §9 J-V6.41 (final form; revision narration removed where it had any) |
| V06-0390 | home | V06 §9 | V06 §9 J-V6.42 (final form; revision narration removed where it had any) |
| V06-0391 | home | V06 §9 | V06 §9 J-V6.43 (final form; revision narration removed where it had any) |
| V06-0392 | home | V06 §9 | V06 §9 J-V6.44 (final form; revision narration removed where it had any) |
| V06-0393 | home | V06 §9 | V06 §9 J-V6.45 (final form; revision narration removed where it had any) |
| V06-0394 | home | V06 §9 | V06 §9 J-V6.46 (final form; revision narration removed where it had any) |
| V06-0395 | home | V06 §9 | V06 §9 J-V6.47 (final form; revision narration removed where it had any) |
| V06-0396 | home | V06 §9 | V06 §9 J-V6.48 (final form; revision narration removed where it had any) |
| V06-0397 | home | V06 §9 | V06 §9 J-V6.49 (final form; revision narration removed where it had any) |
| V06-0398 | home | V06 §9 | V06 §9 J-V6.50 (final form; revision narration removed where it had any) |
| V06-0399 | home | V06 §9 | V06 §9 J-V6.51 (final form; revision narration removed where it had any) |
| V06-0400 | home | V06 §9 | V06 §9 J-V6.52 (final form; revision narration removed where it had any) |
| V06-0401 | home | V06 §9 | V06 §9 J-V6.53 (final form; revision narration removed where it had any) |
| V06-0402 | home | V06 §9 | V06 §9 J-V6.54 (final form; revision narration removed where it had any) |
| V06-0403 | home | V06 §9 | V06 §9 J-V6.55 (final form; revision narration removed where it had any) |
| V06-0404 | home | V06 §9 | V06 §9 J-V6.56 (final form; revision narration removed where it had any) |
| V06-0405 | home | V06 §9 | V06 §9 J-V6.57 (final form; revision narration removed where it had any) |
| V06-0406 | home | V06 §9 | V06 §9 J-V6.58 (final form; revision narration removed where it had any) |
| V06-0407 | home | V06 §9 | V06 §9 J-V6.59 (final form; revision narration removed where it had any) |
| V06-0408 | home | V06 §9 | V06 §9 J-V6.60 (final form; revision narration removed where it had any) |
| V06-0409 | home | V06 §9 | V06 §9 J-V6.61 (final form; revision narration removed where it had any) |
| V06-0410 | home | V06 §9 | V06 §9 J-V6.62 (final form; revision narration removed where it had any) |
| V06-0411 | home | V06 §9 | V06 §9 J-V6.63 (final form; revision narration removed where it had any) |
| V06-0412 | home | V06 §9 | V06 §9 J-V6.64 (final form; revision narration removed where it had any) |
| V06-0413 | home | V06 §9 | V06 §9 J-V6.65 (final form; revision narration removed where it had any) |
| V06-0414 | home | V06 §9 | V06 §9 J-V6.66 (final form; revision narration removed where it had any) |
| V06-0415 | home | V06 §9 | V06 §9 J-V6.67 (final form; revision narration removed where it had any) |
| V06-0416 | home | V06 §9 | V06 §9 J-V6.68 (final form; revision narration removed where it had any) |
| V06-0417 | home | V06 §9 | V06 §9 J-V6.69 (final form; revision narration removed where it had any) |
| V06-0418 | home | V06 §9 | V06 §9 J-V6.70 (final form; revision narration removed where it had any) |
| V06-0419 | home | V06 §9 | V06 §9 J-V6.71 (final form; revision narration removed where it had any) |
| V06-0420 | home | V06 §9 | V06 §9 J-V6.72 (final form; revision narration removed where it had any) |
| V06-0421 | home | V06 §9 | V06 §9 J-V6.73 (final form; revision narration removed where it had any) |
| V06-0422 | home | V06 §9 | V06 §9 J-V6.74 (final form; revision narration removed where it had any) |
| V06-0423 | home | V06 §9 | V06 §9 J-V6.75 (final form; revision narration removed where it had any) |
| V06-0424 | home | V06 §9 | V06 §9 J-V6.76 (final form; revision narration removed where it had any) |
| V06-0425 | home | V06 §9 | V06 §9 J-V6.77 (final form; revision narration removed where it had any) |
| V06-0426 | home | V06 §9 | V06 §9 J-V6.78 (final form; revision narration removed where it had any) |
| V06-0427 | home | V06 §9 | V06 §9 J-V6.79 (final form; revision narration removed where it had any) |
| V06-0428 | home | V06 §9 | V06 §9 J-V6.80 (final form; revision narration removed where it had any) |
| V06-0429 | home | V06 §9 | V06 §9 J-V6.81 (final form; revision narration removed where it had any) |
| V06-0430 | home | V06 §9 | V06 §9 J-V6.82 (final form; revision narration removed where it had any) |
| V06-0431 | home | V06 §9 | V06 §9 J-V6.83 (final form; revision narration removed where it had any) |
| V06-0432 | home | V06 §9 | V06 §9 J-V6.84 (final form; revision narration removed where it had any) |
| V06-0433 | home | V06 §9 | V06 §9 J-V6.85 (final form; revision narration removed where it had any) |
| V06-0434 | home | V06 §9 | V06 §9 J-V6.86 (final form; revision narration removed where it had any) |
| V06-0435 | home | V06 §9 | V06 §9 J-V6.87 (final form; revision narration removed where it had any) |
| V06-0436 | home | V06 §9 | V06 §9 J-V6.88 (final form; revision narration removed where it had any) |
| V06-0437 | home | V06 §9 | V06 §9 J-V6.89 (final form; revision narration removed where it had any) |
| V06-0438 | home | V06 §9 | V06 §9 J-V6.90 (final form; revision narration removed where it had any) |
| V06-0439 | home | V06 §9 | V06 §9 J-V6.91 (final form; revision narration removed where it had any) |
| V06-0440 | home | V06 §9 | V06 §9 J-V6.92 (final form; revision narration removed where it had any) |
| V06-0441 | home | V06 §9 | V06 §9 J-V6.93 (final form; revision narration removed where it had any) |
| V06-0442 | home | V06 §9 | V06 §9 J-V6.94 (final form; revision narration removed where it had any) |
| V06-0443 | home | V06 §9 | V06 §9 J-V6.95 (final form; revision narration removed where it had any) |
| V06-0444 | home | V06 §9 | V06 §9 J-V6.96 (final form; revision narration removed where it had any) |
| V06-0445 | home | V06 §9 | V06 §9 J-V6.97 (final form; revision narration removed where it had any) |
| V06-0446 | home | V06 §9 | V06 §9 J-V6.98 (final form; revision narration removed where it had any) |
| V06-0447 | home | V06 §9 | V06 §9 J-V6.99 (final form; revision narration removed where it had any) |
| V06-0448 | home | V06 §9 | V06 §9 J-V6.100 (final form; revision narration removed where it had any) |
| V06-0449 | home | V06 §9 | V06 §9 J-V6.101 (final form; revision narration removed where it had any) |
| V06-0450 | home | V06 §9 | V06 §9 J-V6.102 (final form; revision narration removed where it had any) |
| V06-0451 | home | V06 §9 | V06 §9 J-V6.103 (final form; revision narration removed where it had any) |
| V06-0452 | home | V06 §9 | V06 §9 J-V6.104 (final form; revision narration removed where it had any) |
| V06-0453 | home | V06 §9 | V06 §9 J-V6.105 (final form; revision narration removed where it had any) |
| V06-0454 | home | V06 §9 | V06 §9 J-V6.106 (final form; revision narration removed where it had any) |
| V06-0455 | home | V06 §9 | V06 §9 J-V6.107 (final form; revision narration removed where it had any) |
| V06-0456 | home | V06 §9 | V06 §9 J-V6.108 (final form; revision narration removed where it had any) |
| V06-0457 | home | V06 §9 | V06 §9 J-V6.109 (final form; revision narration removed where it had any) |
| V06-0458 | home | V06 §9 | V06 §9 J-V6.110 (final form; revision narration removed where it had any) |
| V06-0459 | home | V06 §9 | V06 §9 J-V6.111 (final form; revision narration removed where it had any) |
| V06-0460 | home | V06 §9 | V06 §9 J-V6.112 (final form; revision narration removed where it had any) |
| V06-0461 | home | V06 §9 | V06 §9 J-V6.113 (final form; revision narration removed where it had any) |
| V06-0462 | home | V06 §9 | V06 §9 J-V6.114 (final form; revision narration removed where it had any) |
| V06-0463 | home | V06 §9 | V06 §9 J-V6.115 (final form; revision narration removed where it had any) |
| V06-0464 | home | V06 §9 | V06 §9 J-V6.116 (final form; revision narration removed where it had any) |
| V06-0465 | home | V06 §9 | V06 §9 J-V6.117 (final form; revision narration removed where it had any) |
| V06-0466 | home | V06 §9 | V06 §9 J-V6.118 (final form; revision narration removed where it had any) |
| V06-0467 | home | V06 §9 | V06 §9 J-V6.119 (final form; revision narration removed where it had any) |
| V06-0468 | home | V06 §9 | V06 §9 J-V6.120 (final form; revision narration removed where it had any) |
| V06-0469 | home | V06 §9 | V06 §9 J-V6.121 (final form; revision narration removed where it had any) |
| V06-0470 | home | V06 §9 | V06 §9 J-V6.122 (final form; revision narration removed where it had any) |
| V06-0471 | home | V06 §9 | V06 §9 J-V6.123 (final form; revision narration removed where it had any) |
| V06-0472 | home | V06 §9 | V06 §9 J-V6.124 (final form; revision narration removed where it had any) |
| V06-0473 | home | V06 §9 | V06 §9 J-V6.125 (final form; revision narration removed where it had any) |
| V06-0474 | home | V06 §9 | V06 §9 J-V6.126 (final form; revision narration removed where it had any) |
| V06-0475 | bcr-pointer | V06 §10 | V06 §10: BCR-V6-1 → item 317 (pointer; the base text is the home) |
| V06-0476 | bcr-pointer | V06 §10 | V06 §10: BCR-V6-2 → item 321 (pointer; the base text is the home) |
| V06-0477 | bcr-pointer | V06 §10 | V06 §10: BCR-V6-3 → item 254 (pointer; the base text is the home) |
| V06-0478 | bcr-pointer | V06 §10 | V06 §10: BCR-V6-5 → item 209 (pointer; the base text is the home) |
| V06-0479 | bcr-pointer | V06 §10 | V06 §10: BCR-V6-6 → item 206 (pointer; the base text is the home) |
| V06-0480 | bcr-pointer | V06 §10 | V06 §10: BCR-V6-7 → item 264 (pointer; the base text is the home) |
| V06-0481 | bcr-pointer | V06 §10 | V06 §10: BCR-V6-8 → item 342 (pointer; the base text is the home) |
| V06-0482 | bcr-pointer | V06 §10 | V06 §10: BCR-V6-9 → item 343 (pointer; the base text is the home) |
| V06-0483 | bcr-pointer | V06 §10 | V06 §10: BCR-V6-10 → item 443 (pointer; the base text is the home) |
| V06-0484 | bcr-pointer | V06 §10 | V06 §10: BCR-V6-11 → item 458 (pointer; the base text is the home) |
| V06-0485 | bcr-pointer | V06 §10 | V06 §10: BCR-V6-12 → item 388 (pointer; the base text is the home) |
| V06-0486 | bcr-pointer | V06 §10 | V06 §10: BCR-V6-13 → item 275 (pointer; the base text is the home) |
| V06-0487 | bcr-pointer | V06 §10 | V06 §10: BCR-V6-15 → item 409 (pointer; the base text is the home) |
| V06-0488 | bcr-pointer | V06 §10 | V06 §10: BCR-V6-17 → item 335 (pointer; the base text is the home) |
| V06-0489 | bcr-pointer | V06 §10 | V06 §10: BCR-V6-19 → item 293 (pointer; the base text is the home) |
| V06-0490 | bcr-pointer | V06 §10 | V06 §10: BCR-V6-21 → item 266 (pointer; the base text is the home) |
| V06-0491 | bcr-pointer | V06 §10 | V06 §10: BCR-V6-23 → item 479 (pointer; the base text is the home) |
| V06-0492 | bcr-pointer | V06 §10 | V06 §10: BCR-V6-25 → item 290 (pointer; the base text is the home) |
| V06-0493 | bcr-pointer | V06 §10 | V06 §10: BCR-V6-26 → item 291 (pointer; the base text is the home) |
| V06-0494 | bcr-pointer | V06 §10 | V06 §10: BCR-V6-27 → item 573 (pointer; the base text is the home) |
| V06-0495 | bcr-pointer | V06 §10 | V06 §10: BCR-V6-28 → item 574 (pointer; the base text is the home) |
| V06-0496 | answer-J121-J122 | V06 §11 | V06 §11 Q1: answered, J122 (a) right after M4; price 27–38.25 pw; pricing history removed (V06-NARR-3) |
| V06-0497 | history-out | V06 §12 | history-out: removed (S9; the validation records keep it); V06 §12 keeps the two current paragraphs |
| V06-0498 | handoff | V06 §13 | V06 §13: no open item (V06-DEFER-1, CANON-C02: the hood gate is the ruled behaviour, V06 §4.1) |
| V06-0499 | handoff | V06 §13 | V06 §13: X1–X49 closed at their destinations (V06-WGAP-2); the 19 hand-offs routed here closed in the §13 table |
| V06-0500 | home | V06 §IN | folded into the body: IN-V06-1 V06 §3.10.1; IN-V06-2 V06 §3.4 (3), §3.13 (4), §3.19 (7); IN-V06-3 V06 §3.2, §3.19 (2), (5); the Integration notes table points to each |
| V06-0501 | home | V06 §IN | folded into the body: IN-V06-4 V06 §3.19.4 (with BCR-V3-29), W64; IN-V06-5 T-V6-65; IN-V06-6 V06 §5.1; IN-V06-7 V06 §2.13, §1b |
| V06-0502 | home | V06 §RC | narration removed (S9); the edits it lists stand in the body (W48 and V06 §3.18.2 `growthCapShare`; V06 §2.8 `retypeLand`; V06 §2.12 retaining row) |
