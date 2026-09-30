
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
12. **V12**: `BenchBarDef`s `bar.T-V6-70`, `bar.T-V6-73`, `bar.T-V6-75` and their register lines (V06 §8, due `V6-E5`'s
    E7 and `V6-E9`); no-op pins for T-V6-70 (item 111's V06 part) and T-V6-74 (the replay off).
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

