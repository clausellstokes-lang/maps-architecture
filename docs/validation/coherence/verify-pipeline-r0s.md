# Verify — the pipeline part of the base after the coherence rewrite (round 0)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/verify-pipeline-r0; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-pipeline-r0`, cloud continuation 2026-10-03)
- P1 pipeline part extracted from the live base and the archive; live = `new/base/pipeline/01–11` byte for byte: done
- P2 mechanical checks (references, ids, retired terms, deferral, narration): done
- P3 inventory check (806 ids) against the mapping table and the live text: done
- P4 canon routes (f and g items, conflicts, wiring, E-36, id rulings, open findings, edges): done
- P5 section reads of every changed hunk; cross-part notes addressed to pipeline: done
- P6 issues, results file, LANDED: done

## Verdict

The rewrite holds for most of the part. All 806 inventory ids are at their mapped homes except one declaration pair, which is lost (VP0-01). The 112 file-f items routed to pipeline are applied, and so are file-g items 102–113 where they have a pipeline home. The exceptions:
- f 343: VP0-06.
- f 429 (c): VP0-05.
- f 474 (c): VP0-12.
- f 409 (c): VP0-22.
- f 542 (c), whose index row belongs to scope: VP0-29.
- g 102's sunlit term at S10b, which breaks its no-op pin and carries a weight with no source: VP0-16, VP0-17.
- g 108's §7.7 T9 citation, which points at a row that does not exist: VP0-18.

Item 114 arrived after the sweep started and is not applied (VP0-02). The thirteen CF-PIPE rulings are applied, except CF-PIPE-06, which is misapplied for sky islands (VP0-03). The rewrite created two problems of its own:
- A second, contradicting declaration of `PlotStrategy` and `SitePlanStrategy` (VP0-19).
- A sun prestige weight with no source (VP0-16).

Issues: 29 in all, 1 blocker, 18 major and 10 minor. Owners: pipeline 27, determinism 1, scope 1.

## Inputs

- Live: `docs/ARCHITECTURE.md` — §4 (l. 4352–8233), §10 (l. 13478–14067), PART II (l. 17967–19147), PART III (l. 19148–19215). Byte-identical to `docs/validation/coherence/new/base/pipeline/01–11`.
- Archive: `docs/archive/ARCHITECTURE-pre-coherence-2026-09-28.md` (the same sections), and `docs/archive/volumes-pre-coherence-2026-09-28/` for the volumes' §10 BCRs, which the f items point to.
- `docs/validation/coherence/inventory-pipeline.json` (806 ids), `canon.json` / `canon.md` (S1–S9, CF-PIPE-01–13, DXC/KXC, WG-PIPE-*, W-*, KWG-07, RWG-*, E-36, the ID rulings, EDGE-PIPE-*, BR-PIPE-*), and `rewrite-pipeline.md` (the mapping table; the rulings).
- `docs/AMENDMENTS-2026-09-28f.md`: the 112 items routed to pipeline — 280–326, 425–446, 539–566, 573–580, 202, 205, 213, 259, 271, 369, 389, 575, 582 — plus 409 and 474, whose pipeline parts came through the other units' notes.
- `docs/AMENDMENTS-2026-09-28g.md` items 102–114.
- Cross-part notes addressed to pipeline in every other rewrite report:
  - rewrite-V01–V12;
  - rewrite-model, rewrite-kernel, rewrite-determinism, rewrite-rendering and rewrite-scope.
- The sibling verify, agree and edges results (`results/coherence_*.json`), used for concurrence.
- No adjudication-r*.md exists, so no finding is closed as INVALID.
- The reference corpus (captures/, research/patreon, research/devlogs, research/ftg-docs, research/external) was not fetched. Every doc_checks-type result is provisional.

## Method

1. **Extraction and diff.** Each section of the live and archived pipeline part was split by heading. Each was word-diffed against its archived counterpart, and every changed hunk was read whole. This covered §4.1–§4.13, §10.1–§10.4, the PART II introduction, II.1–II.7 (II.7.1–II.7.6) and PART III.
2. **Inventory.** Every one of the 806 ids was checked against `rewrite-pipeline.md`'s mapping table: 746 home rows and 60 reference rows. Each home row's statement was matched against its live location by a token check: every number, identifier and code span in the inventory statement had to be present at the mapped section. 16 ids were flagged, and each was explained on reading (the fact was moved word for word, or its value was moved to V11 with a citation). Each reference row was checked for its fact at the named home (§2.6, §2.8, §2.9, §5.1, §7.3, §9.2, V07, V11 §3.10 / §3.23.8, and others) and for a pointer from the pipeline. One id is lost (VP0-01). The one reference that fails is the PART III pointer to V07 §15 (VP0-27).
3. **Mechanical checks.**
   - Section references: all resolve except the two broken references, VP0-18 and VP0-27.
   - Retired terms: three remain (VP0-25); G-lot, J-T and G-shadows elsewhere are clear.
   - Deferral wording: 0 hits.
   - Narration: canon ids are cited in normative text (VP0-26); the S9 narration otherwise removed.
   - Id forms: the ID-ITEM ruling and the BCR, J and T forms checked.
4. **Canon routes.**
   - **f items.** Each routed item's BCR text was read from the archived volume §10 and checked at its pipeline home. Items 280–326, 425–446, 539–566, 573–580, 202, 205, 213, 259, 271, 369, 389, 575 and 582 are applied, except 343 and 429 (c).
   - **g items.** Six were checked clause by clause at every pipeline home: 102, 106, 109 (including (a)'s 0.45 and 0.15), 110, 111 and 113. Five more were checked at their §10.2, §4.7 S10a/S10b, §4.5 S7b (1) and §4.2 S2 homes in the changed hunks: 103, 104, 105, 107 and 108. All eleven are applied, apart from the defects listed as issues (102: VP0-16, VP0-17; 108: VP0-18). Item 112 has no pipeline home. Item 114 is not applied (VP0-02).
   - **Rulings.** CF-PIPE-01–13 are applied except CF-PIPE-06 (VP0-03). DXC-05 / W-SET-01 is applied: `crossing.searchBandM` is named as V11's cell (120 m, V11 §3.1, registry row 93). DXC-06 / KXC-02 are applied as one home, but the home lacks its area floors (VP0-14).
   - **Wiring and fixes.** WG-PIPE-*, W-* and RWG-07 are applied, except KWG-07 (VP0-21). WG-PIPE-05 was answered by a duplicate declaration (VP0-19). E-36's soft-term table and its equivalence list are applied. BR-PIPE-01–03 and EDGE-PIPE-01–08 are applied, and §4.13's EP-01–EP-19 table and its combination table are present, with B-EDGE at §13.2.
5. **Cross-part notes.** Every note addressed to pipeline was checked against the live text:
   - V05: its pipeline note.
   - V06: notes 1, 5, 7, 10, 11 and 12.
   - V07: note 8.
   - V11: notes 2, 4, 5, 10 and 14.
   - V01: note 4.
   - V03: note 8.
   - V04: note 4.
   - model: its pipeline paragraph.
   - kernel: notes 10–13.
   - determinism: its pipeline paragraph.
   - rendering: its pipeline paragraph.
   - scope: its pipeline paragraph.

   The notes that are met:
   - V07 note 8, whose cited anchors exist.
   - V11 notes 4 and 14.
   - V03 note 8.
   - Kernel notes 10, 12 and 13.
   - The determinism points on the castle constants, the harbour-work definition, the raised-way stream and the crossing band.
   - The scope points on W-IF-07, G-lot, J-T and PART III's village bands.
   - The rendering point on `live.people`.

   The notes that are not met are the issues below. V06 notes 7 and 10, and V11 note 2, are already raised by siblings (AT-01, AT-03, AT-05, AT-29 and AF-01). They are listed in the cross-reference section, not raised again here.

## Sizes

| part | archive (lines / words) | live (lines / words) |
|---|---|---|
| §4, §10, PART II, PART III | 4 639 / 84 014 | 5 710 / 102 399 |

The growth comes from the routed f and g items (102–113's mechanisms, the §4.13 edge tables, §4.12's declarations) and from facts moved in from other parts. Facts moved out (to §2.6, §2.8, §2.9, §5.1, §7.3, §9.2, V07, V11) were each found at their new home.
## Issues

Ranked most severe first. Owner is the unit that edits. Line numbers are the live base's unless a file is named.

### VP0-01 — blocker — LOST — owner: pipeline

**Claim.** NeighbourhoodRequest and NeighbourhoodResult are declared nowhere. The archive declared both (base l. 15212-15222; volume 1 §2.4 l. 698-711 in the item-539 form: mode, seam, context, params, closeup, laid, districts). Now the II.1 code block (base l. 18002) says they 'are V01 §2.4's', and V01 §2.4 (l. 516) and V01's own home table (l. 143) say they are II.1's (item 539). NeighbourhoodStrategy.generate (l. 18001) takes and returns types that no unit declares. Inventory id PIPELINE-0642's interface text is in neither home. Concurs with AF-12 and VV12-01.

**Required change.** In II.1's code block, replace the comment line 'NeighbourhoodRequest and NeighbourhoodResult, with DistrictContext and TypedBoundary, are V01 §2.4's ...' with the two declarations in item 539's form, taken from the archived V01 §2.4 (l. 698-711): NeighbourhoodRequest with district, key, lod, mode derived, seam?, context?, params?, closeup? and laid, and NeighbourhoodResult with mode, blocks, ways, plots, buildings, greens, pins, labels, the seam report and districts. Then add one comment saying DistrictContext and TypedBoundary are V01 §2.4's. V01 §2.4 keeps its citation of II.1.

### VP0-02 — major — F-MISSING — owner: pipeline

**Claim.** g item 114 (OWNER RULE, J126; it overrides f item 260 and J-VI.14; it arrived after the sweep started) is not applied in the pipeline part. Its HOMES name 'every stage that builds a listed kind (reads its switch)'. The withdrawn suppression is still stated in four places. (1) §4.3 *The derivation unit and the stream* (l. 5151-5156): RaisedWayLedger counts 'standing generated, suppressed and declared ways against V11's caps, suppressed keys skipped', and raisedOutcome reads 'the suppressions read from the log's live removals'. (2) §4.3 *Edits and shadows* (l. 5177-5178): '... or removes a generated one — a suppression that holds through regeneration (§7.1)'. (3) §4.11 DeclineOp (l. 7949): removeIsland is 'holding its slot (V05 §3.2 (6))', but item 114 (c) withdraws the rule that counts removed slots as filled. (4) No building stage reads a 'Built by the town' switch: §4.2 S1 oases, §4.3 raised ways by kind, §4.7 terrace retaining walls and deck plots, §4.8 quay walls with sea gates and the harbour-mouth chain, II.6 islands and sky accesses, II.7 the underground's optional systems. Concurs with the sibling F-MISSING rows for model (VR0-10, MODEL-G114), determinism (VD0-17, DET-G114), V04, V05, V06, V11 and V12.

**Required change.** (1) In §4.3, the ledger reads 'the count of standing generated and declared ways against V11's caps (a deleted instance counts against no cap, item 114 (c))'. raisedOutcome evaluates 'the kind's switch (item 114 (b); §7.6)' in place of 'the suppressions read from the log's live removals'. Delete 'suppressed keys skipped'. (2) In §4.3 *Edits*, write '... or removes a generated one: removed for now. The deletion holds while the town is unchanged and lapses at the next epoch, at a New random over its place or at a Re-derive of its stage, after which the generator may build one again while the kind is on (item 114 (c); §7.1)'. (3) At each building stage named above, add one clause: 'builds none of the kind while its Built by the town switch is off (item 114 (a)-(b); §7.6); turning the switch off removes the generator's standing instances, never a drawn or dossier-bound one'. (4) In §4.11, removeIsland's comment reads 'the record kept at its address in state removed for undo; its slot is not counted as filled (item 114 (c); V05 §2.1)'.

### VP0-03 — major — CONFLICT — owner: pipeline

**Claim.** Who runs S12c for a sky island's districts. §4.5 *Which districts* (l. 5697-5698) says 'a unit run (a sky island's, a standalone neighbourhood document's) runs its own S12c over its districts (V01 §3.10)'. V01 §3.10 step 5 (l. 1909) says 'The town's S12c and S13a include the island's districts', and V05 §3.1's stage table (l. 658-659) runs SKY-F 'before S12c and S13a', with 'S12c gives the island's districts character and identity as the ground's'. CF-PIPE-06's ruling (the ground districts and the districts on a sky island's arena take character and identity, SKY-F before S12c) is misapplied: the island's districts would get their character from a second S12c pass over the island alone, not from the town's pass.

**Required change.** §4.5 *Which districts* reads: 'S12c covers the ground's districts and each sky island's districts, which the town's S12c includes after SKY-F (V01 §3.10 step 5; V05 §3.1). A standalone neighbourhood document's unit run runs its own S12c over its districts (V01 §3.10). The hinterland and underground pseudo-districts take no character or identity ...' (the rest unchanged).

### VP0-04 — major — CONFLICT — owner: pipeline

**Claim.** A table edit that sets jitter.minM below its bound is refused in one place and bent in another. §4.7 S11 *Floor* (l. 6544-6545) says an editTable or editPreset that sets jitter.minM below attractCm + 1 cm 'is refused, naming the bound (F-EDIT, §5.2)'. §13.2's T43-3 (l. 15814) and the index row J-A43.42 (l. 20010) say the same. But determinism's new §7.1 outcome table (l. 9697) makes 'a value outside its declared range — a table cell (jitter.minM below its bound among them, §4.7 S11; §7.6)' bent, clamped to the nearest lawful value, with bend.invalid. Owner item 101 R2 (bend, do not refuse; refuse only for dossier facts and locks) decides for bend.

**Required change.** §4.7 S11 *Floor* reads '... the column's declared range (§7.6); an editTable or editPreset setting it lower is bent to the bound, reported as bend.invalid (§7.1's outcome table; item 101 R2)'. Scope then rewrites T43-3 to '... setting jitter.minM below that bound is bent to the bound (bend.invalid)' and J-A43.42 to '... a table or preset edit below the bound bent to it'. The ARCHITECTURE-RATIONALE.md entry for J-A43.42 follows.

### VP0-05 — major — F-MISSING — owner: pipeline

**Claim.** File f item 429 (c) is not applied at §4.11 *Uses across epochs* (2) (l. 7782-7783). It still closes a use after 'closeAfterEpochs' and starves a hard supply edge after 'starveAfterEpochs'. §10.2's UseRuleRow (l. 13578) declares closeAfterYears and starveAfterYears 'on the weekly clock', and V06 §2.9 reads years. The two field names point at cells that do not exist, and an epoch count differs from years whenever epochs are not one year apart (The clock (5)). Concurs with AT-04, which grades it blocker.

**Required change.** §4.11 *Uses across epochs* (2) reads '... has been below closeShare for closeAfterYears, or a hard supply edge has had no provider in reach for starveAfterYears (years read as weeks ÷ 52 on The clock; UseRuleRow, §10.2; item 429 (c); Use.strain, §2.7, V06 §2.9)'.

### VP0-06 — major — F-MISSING — owner: pipeline

**Claim.** Item 343 is not applied. §4.11's EpochInputs (l. 7619-7625) lacks wealthLevel? and advance? { group, index, of, stoppedAt?, trajectory? }, which V06 §2.3 states (V06-ICONF-3's stoppedAt? included) and which V08 §3.5's wealth row feeds through tables/dossier/wealth (DR6). V06's rewrite note 5 and determinism's cross-part note both hand this to pipeline.

**Required change.** §4.11's EpochInputs gains 'wealthLevel?: string /* the dossier's wealth label at the epoch, through tables/dossier/wealth (DR6; V08 §3.5); item 343 */' and 'advance?: { group: Id; index: number; of: number; stoppedAt?: number; trajectory?: TrajectoryRef } /* one step of a grouped advance (V06 §2.3) */', with the members typed exactly as V06 §2.3 types them and a citation of V06 §2.3.

### VP0-07 — major — CONFLICT — owner: pipeline

**Claim.** RaiseGrade.cause (II.7.6, l. 19136) is 'fire'|'flood'|'rebuild'|'hand'. But the history replay at generation (g item 113 (c); V06 §3.20.5, J-V6.131) raises a burial with cause 'burial', and V06 l. 2962 writes RaiseGrade with that cause. An op the base union cannot type is written. V06 note 11 hands this to pipeline.

**Required change.** In II.7.6's RaiseGrade, cause reads 'fire'|'flood'|'rebuild'|'burial'|'hand' /* 'burial': the history replay's burial of an older town (g item 113 (c); V06 §3.20.5) */. The burial factors stay V11's history rows.

### VP0-08 — major — CONFLICT — owner: pipeline

**Claim.** §4.11 *The clock* forbids the weeks that the history replay uses. (1) (l. 7700-7702) says the map's time is an integer week and 'a standalone map starts at week 0'. (3) (l. 7713) gives the week of the year as '(week mod 52) + 1'. V06 §3.20.2 (4) (l. 2882-2885) and V06 l. 836 date the replay's coarse epochs at signed weeks before the creation week, negative on a standalone map, and read the week of the year as 'the non-negative remainder of §4.11 The clock (3)'s formula'. The base admits no week before creation. Its formula is undefined for a negative week: a truncating mod gives a week of the year of 0 or below, which matches no CalendarRow season, so the Works' pauses and §8.2's season rows read nothing (silent wrong). V06 note 12 hands this to pipeline.

**Required change.** *The clock* (1) adds: 'the history replay's coarse epochs (§4.11 *History-first generation*; V06 §3.20.2 (4)) carry signed weeks before the creation week, negative on a standalone map; no other event is dated before the creation week'. (3) reads 'the week of the year, ((week mod 52) + 52) mod 52 + 1 (the non-negative remainder, so a replay week before creation reads its season)'.

### VP0-09 — major — CONFLICT — owner: pipeline

**Claim.** The replay's stream key differs between §4.11 and §6.1. §4.11 *History-first generation* (2) (l. 7671) says the replay's epochs 'draw on the ordinary …/epoch=e streams (§6.1)'. §6.1's epoch component (l. 8621-8623; J-A113.61) keys the replay's coarse epochs r = 1 … R with 0x8000 + r, 'so no replay draw can equal a live epoch's'. Read literally, §4.11 has replay epoch r draw live epoch r's numbers, which correlates the replayed past with the town's first live epochs. Determinism's cross-part note asks §4.11 to use the replay epoch component.

**Required change.** §4.11 *History-first generation* (2) reads '... they draw on the epoch streams keyed with the replay's epoch component 0x8000 + r (§6.1; J-A113.61), so the replay is deterministic from the seed and the history and no replay draw equals a live epoch's; ...'.

### VP0-10 — major — LOST — owner: pipeline

**Claim.** The bent-cut ladder's six-call bound is lost. The archived §5.2 F-CUT row (archive l. 6894) said 'on 10⁵ random concave and holed faces the ladder ends in ≤ 6 kernel calls and the face count never decreases'. Determinism's rewrite moved that cell to '§4.6 step 8 (a)'s bars (the kernel-call bound; the face count never decreasing; the residue band per district)' (l. 8356), and its cross-part note says §4.6 step 8 (a) 'states F-CUT's constants (the 36° turns, the area bound, the six-call bound, the residue band)'. §4.6 step 8 (l. 5973-6000) states the 36° turns, the area bound (rung (d)) and the ≤ 5 % residue band, but neither the ≤ 6 kernel-call bound nor the 10⁵-face acceptance. Neither number now appears anywhere in the base. §5.2 also cites '§4.6 step 8 (a)'s area bound', but the area bound is in rung (d).

**Required change.** In §4.6 step 8, after the ladder, add: '**Acceptance:** on 10⁵ random concave and holed faces the ladder ends in ≤ 6 kernel calls and the face count never decreases; the built-area share left as court or green residue is reported per district (soft band ≤ 5 %)'. Determinism's §5.2 F-CUT row then cites '§4.6 step 8's acceptance' and '§4.6 step 8 (d)'s area bound' in place of '§4.6 step 8 (a)'s bars' and '§4.6 step 8 (a)'s area bound'.

### VP0-11 — major — WIRING — owner: pipeline

**Claim.** The water pull ignores a spring's flow. §4.2 S3 (6) (l. 4928-4931) defines q(x) as 1 at 'a lake or oasis shore, a spring or ground of the top well-yield class', falling to 0 at the pull radius, and §4.5's water term (l. 5550-5552) reads the same q. Neither reads WaterBody.spring.flow (§2.3, l. 926, a share of full flow in (0, 1]). V06 §3.12.1 (l. 1980-1982) says 'its flow ... weights its water pull on the growth field (§4.2 S3 (6), §4.4) and the prosperity field's water term (§4.5)', and the model's J-RM7 says §4.4 and §4.5 weight the pull by spring.flow. The base formula has no such factor. A failing spring (item 111 (b)) therefore changes no pull, and the base sentence 'a spring or oasis that fails weakens its pull' (l. 5552, 7911) has no mechanism behind it.

**Required change.** §4.2 S3 (6)'s q(x) reads '... 1 on a river bank, a lake shore or ground of the top well-yield class; at a spring-fed water body (an oasis, WaterBody.spring) its shore and spring point give q = spring.flow (§2.3; 1 when made, lowered by V06 §3.12.1), falling linearly to 0 at the climate row's pull radius'. §4.5's water term says it reads that q, flow included.

### VP0-12 — major — F-MISSING — owner: pipeline

**Claim.** File f item 474 (c) (V01 BCR-19 (c)) is not applied at II.5 (l. 18207). It still reads 'per-district regeneration ≤ 30 ms (§12.6)'. Item 474 (c) rewrites it to '... within §12.6's scoped law × its fabric's factor (≤ 30 ms for a bent-cut district of 450 buildings, ≤ 45 ms for a ring district; volume 1, J-V1.34)'. §12.6 already carries the template factor (l. 14951-14952). II.5's flat ≤ 30 ms fails every ring district that §12.6 and V01 admit. The rendering note hands this to pipeline.

**Required change.** II.5's sentence reads '... and per-district regeneration within §12.6's scoped law × its fabric's factor (≤ 30 ms for a bent-cut district of 450 buildings, ≤ 45 ms for a ring district; V01 §6, J-V1.34); ...'.

### VP0-13 — major — TERM — owner: pipeline

**Claim.** II.6 *Sewers* names a retired stored field. SewerStrategy's declared inputs (l. 18243), 'the one list II.7.2 cites', include 'the ways with flowToward (§2.4)', and the follow-streets family has mains 'falling with flowToward' (l. 18245). Item 208 retired the field: model §2.4 (l. 1029-1034) makes the fall a reading, wayFall(way), never stored, and drops a stored flowToward on load. A sewer stage built from II.6 reads a field that is never written. Concurs with AL-06 (major) and PIPE-V04-1 (minor); V04 note 4 hands this to pipeline.

**Required change.** II.6 reads '... the ways and their wayFall reading (§2.4, item 208) ...' in the declared-input list, and 'mains under the ways, falling by wayFall to the outfalls'.

### VP0-14 — major — WIRING — owner: pipeline

**Claim.** The class-floor row promises area floors it does not state. §4.7 *The class floors* (l. 6173-6176) states minPlotWidth, minInteriorAnglePlot and minCorridor(c), then says 'Floors are widths, areas and angles'. §3.2 (2), §3.10, §3.3's expect (E_BELOW_MIN_AREA, l. 3105, 3284), F-PLOT and F-CORRIDOR all read their area floor from this row. No class has an area floor anywhere, so E_BELOW_MIN_AREA has nothing to compare against. This gap predates the rewrite, but the canon made this row the one home (DXC-06/KXC-02).

**Required change.** The class-floor row states the area floor per face class as a derivation from rows that already exist (for example: every plot, the granularity row's lower areaM2 bound × the rung's join share, or minPlotWidth²; every way class, none), named as cells. Alternatively, it removes 'areas' from the row, and the kernel then drops E_BELOW_MIN_AREA's class-floor reading (§3.1, §3.3). Choose one and state it once here.

### VP0-15 — major — WIRING — owner: pipeline

**Claim.** §10.3 (l. 13905) re-derives people by 'a regenerate event of scope people over the chosen households (§7.1)'. §7.1's EditScope (l. 9373) is { ids } | { ring, key, level } | { kind: 'shade'; island }. It has no people scope, so the event cannot be typed, and §7.4's regenerate row cannot tell a people-only re-derivation from a full one.

**Required change.** Either §10.3 reads 'a regenerate event whose scope is the chosen households' ids ({ ids }, §7.1), flagged people-only' and determinism gives §7.1's regenerate event that flag, or determinism adds '| { kind: 'people'; households: Id[] }' to EditScope with its §7.4 row. Pipeline's sentence then cites the variant by name.

### VP0-16 — major — CHANGED — owner: pipeline

**Claim.** The class mix's sunlit prestige weight changed value without a ruling. §10.2 (l. 13839) gives 'sun 0.3' and the index row J-A102.41 (l. 20233) records 'ClassMixRow.sun 0.3'. The archive's only value is V11 §3.3.5 (archived V11 l. 1202-1205): 'weight 0.15 at full daylight share'. The pre-coherence base had none. The pipeline rewrite report cites WG-PIPE-11 for 0.3, but that ruling covers only the missing lean_to_shelter and cottage cells. No owner text, f item or canon ruling sets 0.3. Concurs with VV1112-06.

**Required change.** §10.2's prestige weights read 'sun 0.15' (V11's archived value, item 102 (d)). J-A102.41's index row and its ARCHITECTURE-RATIONALE.md entry read 'ClassMixRow.sun 0.15'. V11 §3.3.5's citation of §10.2 stays.

### VP0-17 — major — CONFLICT — owner: pipeline

**Claim.** Item 102's no-op form fails at S10b. T102-1 (l. 16044) and V11 §3.24.0's off form require that w_sun = 0 makes the town byte-identical. §4.7 S10b (l. 6904-6907) adds the sunlit term ClassMixRow.sun × (1 − shade) to every plot's prestige, scaled by the climate row's sunlight cell and 0 only in the parity presets, but not scaled by w_sun. §4.5 (v) (l. 5535-5536) computes shade whatever the weight. So with w_sun 0 the largest classes still take the sunnier frontages, and the NoOpPin fails at M2b. Concurs with VV1112-07.

**Required change.** §4.7 S10b's sunlit term reads 'ClassMixRow.sun × (1 − shade), read only while w_sun > 0 (item 102 (g): w_sun 0 makes the town byte-identical), × the climate row's sunlight cell, 0 in the parity presets'.

### VP0-18 — major — BROKEN-REFERENCE — owner: pipeline

**Claim.** §4.2 S2 *Ladder records' members* (l. 4822, new text for g item 108) cites '(§7.7 T9, DR9)'. §7.7 has no T9 row; the toolkit's T9 is §7.1's shape tool (l. 9738, 9758). Item 108's HOMES ('§7.7 (T9 and DR9 extended ...)') use T9 for a record-mapping row that the base never carries. Concurs with AH-13.

**Required change.** §4.2 S2 cites '(§7.7 DR9; the institution ladders, tables/dossier/ladders)'. If item 108's T9 is meant as a §7.7 row, determinism adds it to §7.7 under an id that does not collide with §7.1's tool T9, and pipeline cites that id.

### VP0-19 — major — NEW-PROBLEM — owner: pipeline

**Claim.** The pipeline rewrite (WG-PIPE-05) declared PlotStrategy and SitePlanStrategy at §4.12 (l. 8156-8157), and their signatures differ from the existing declarations at §14 (l. 17022-17023). §4.12 has plots(block, alloc, ctx, k): KernelResult<Plot[]> and sitePlan(plot, to, ctx, k): KernelResult<MutationRecord>. §14 has subdivide(block, ctx, claims, sc, k): KernelResult<{ plots; alleys; residue }> and plan(plot, ctx, tables, rng, k): KernelResult<SitePlan>. One interface now has two declarations (principles (1), (10)), and StrategyRegistry.plots (l. 17012) is typed by whichever a reader finds first. Concurs with AF-02 (blocker) and VS0-10 (major).

**Required change.** Delete the PlotStrategy and SitePlanStrategy lines from §4.12's declarations block and add the comment '// PlotStrategy and SitePlanStrategy are §14's (S10 (1)-(10), S11)'. WG-PIPE-05 is answered by §14's declarations. §14's comment line 17000 then names them beside StageDecl.

### VP0-20 — minor — WIRING — owner: pipeline

**Claim.** Several model fields have a declared writer in the canon's rulings but the writer's text never names them. §4.4 S5a's barrier closure (l. 5247-5259) never names the fields it writes: Enceinte.arcs, the multi-stretch anchors[].end and stretchClass (J-A106.21 homes '§2.7, §4.4 S5a'). §4.8's *Graded by stretch* (l. 6949-6951) reads the defensibility class without naming stretchClass. §4.6's deep-interior rule (l. 6011) does not name Block.depthClass (J-P51 homes '§2.5, §4.6'). §4.8's harbour mouth (l. 6978) does not name Gate.mouth. II.7.1 (l. 18435) says '§11's exporters' where rendering's RWG-06 answer is §11.1 *Layers*. §4.5's daylight term (l. 5524-5547) has no pointer to its budget (§12.4's row; R12-29). These come from the model and rendering cross-part notes.

**Required change.** Name each write at its stage. In §4.4 S5a (1): 'the classification is written once, as Enceinte.arcs (anchor ends and BarrierKind) and each stretch's stretchClass (§2.7)'. In §4.8 *Graded by stretch*: 'keyed by each stretch's stretchClass (§2.7)'. In §4.6: 'the block's Block.depthClass is deep (§2.5)'. In §4.8 *The harbour mouth*: 'a Gate of kind water with mouth set (§2.7)'. In II.7.1: '§11.1 *Layers*' exporters'. In §4.5's daylight term: '(budget: §12.4's row; R12-29)'.

### VP0-21 — minor — WIRING — owner: pipeline

**Claim.** KWG-07 (canon wiring, minor; 'consumers name the op at their home (§4.3 hexLattice, §4.7 S11 offsetFace)') is not applied. §4.2 S3 (3) (l. 4883) and §4.3 *Lattice and costs* (l. 5072-5075) describe the jittered hexagonal candidate lattice without naming hexLattice (§3.4, l. 3597). §4.7 S11's site plan, which stands a main slot's front 'h behind the template's setback' (l. 6533), never names offsetFace (§3.4, l. 3593), the per-edge setback service §3.7's text gives it. Kernel's note 11 asks for both names, and for hexLattice's spacing and jitter cells to hold spacing ≥ minEdge and jitter < spacing ÷ 2.

**Required change.** In §4.3, write 'this candidate lattice — hexLattice (§3.4) over the frame at ≈ 25 m spacing, its jitter below half the spacing (§3.4's argument bound) — ...'. §4.2 S3 (3) names hexLattice. §4.7 S11 writes 'the setbacks per edge by offsetFace (§3.4)'.

### VP0-22 — minor — F-MISSING — owner: pipeline

**Claim.** File f item 409 (c) (BCR-V6-15 (c): '§10.4 ... the naming features gain formerWall (a way made by wallToWay), whose grammar rows are the content volume's') is not applied. §10.4 never names formerWall. V06 (l. 1370, 3279) cites '§9.6, §10.4' for the ring road's name, and V11 registry row 68 (l. 871, 3436) carries naming.formerWall. Rendering's and V06's cross-part notes hand this to pipeline.

**Required change.** §10.4's *naming engine* paragraph adds: 'A way that wallToWay makes (V06) is named through the naming feature formerWall (V06 §5.2; its grammar rows V11's naming.formerWall); an absorbed wall gets no label.'

### VP0-23 — minor — CONFLICT — owner: pipeline

**Claim.** §4.3 *Ground only, never into the sky* (l. 5166-5167) says every raised part laid after SKY, 'an epoch's, a T4 stroke's, or a generation stage's after SKY', reads skyAccessObstacles. §4.3 *The slot* (l. 5144) commits every generated raised part before S7b (1), so no generation stage lays one after SKY. V05's cross-part note (V05-DEFER-1's base counterpart) asks for the phrase to go.

**Required change.** Delete ', or a generation stage's after SKY' from §4.3 *Ground only*. The sentence reads 'Every raised part laid after SKY — an epoch's or a T4 stroke's — reads skyAccessObstacles (V05 §2.3b): ...'.

### VP0-24 — minor — CONFLICT — owner: pipeline

**Claim.** Two content values are restated where V11 or V05 is the one home (canon S2). II.6 (3) (l. 18282) writes 'the rule's node.bonus (0.25, clamped to 1)', and V05 §2.4 and islands.json hold the value (V05-RESTATE-3). §10.2's *undergroundAccess* sentence (l. 13788-13790) restates 0.15-0.30 by band, 0.02 for houses and 0 for a barracks, courthouse and temple, while V11 §3.5.1 (l. 1295-1299) calls its list 'the one statement of these values, which §10.2 and II.7.3 read'. The values agree today, but they can drift apart. Concurs with PIPE-NODE-1, AF-05 (major) and VV1112-24.

**Required change.** II.6 (3) reads 'raises h(S_town) by the rule's node.bonus (V05 §2.4), clamped to 1'. §10.2 reads 'undergroundAccess.prob is, per band row interpolated along the value, the chance that ... holds an access down to it (II.7.3's *Basement accesses*; the values V11 §3.5.1's)', and drops the parenthesised numbers.

### VP0-25 — minor — TERM — owner: pipeline

**Claim.** Three retired terms remain in the pipeline text. 'read by the shadow pass' (§4.8, l. 7037) is G-shadows: write projected shadows (shadowPass). 'from V05's hand-over' for the unit run's input (§4.1, l. 4507) is G-unitinput: write V05's SkyUnitInput. 'a standalone neighbourhood's' template row (§4.2 S1 (2), l. 4640) is G-standalone: write a standalone neighbourhood document's.

**Required change.** l. 7037: '(read by projected shadows, shadowPass, and the 3-D export, §8.4, §11.1)'. l. 4507: 'from V05's SkyUnitInput (V05 §3.1; V01 §3.10)'. l. 4640: '(a standalone neighbourhood document's, drawn by its fabric, ...)'.

### VP0-26 — minor — ID — owner: pipeline

**Claim.** Coherence-pass working ids are cited in normative text: 'E-36' (§4.5 heading, l. 5508), 'DXC-06, KXC-02' (§4.7 class floors heading, l. 6174), 'SCOPE-C01' (§4.11, l. 7759; PART III, l. 19209), 'W-DOS-03' (§10.2, l. 13880). These are canon.json ids, not design ids. Under canon S7's citation form and S9, design text cites items, sections and J-rows.

**Required change.** Drop the canon ids. Where a reason is needed, cite the item or J-row the ruling rests on: §4.5 'Soft terms — one contract (items 102, 103, 105, 107, 111)'; §4.7 '(the one home; §3.2 (2), §3.10, §5.2's F-PLOT and F-CORRIDOR and §5.3's class-floor row cite it without values)'; §4.11 and PART III 'else refused (item 202)'; §10.2 '(items 88, 104)'.

### VP0-27 — minor — BROKEN-REFERENCE — owner: pipeline

**Claim.** PART III *Not-precluded checks* (l. 19211) cites '(the parity judge's 44 / 44; V07 §15)'. V07's sections end at §13 and no V07 section states the 44 / 44. The figure is the parity judge's own (docs/design/judge-parity.md l. 240, 'VILLAGE — VG (44) | 44/44 not precluded'), and the archived base cited no section ('the parity judge's 44 / 44'). The rewrite added a section that does not exist. Concurs with AL-27.

**Required change.** Delete '; V07 §15'. The parenthesis reads '(the parity judge's 44 / 44)' as in the archive, or '(the parity judge's 44 / 44, docs/design/judge-parity.md)' if a file citation is wanted.

### VP0-28 — minor — CONFLICT — owner: determinism

**Claim.** §4.12 (l. 8175) says 'WorkUnit (§5.1) gains moduleCells' (item 324, the plan stage's piece-area work unit, V03 §3.4). §5.1's WorkUnit union (l. 8262) is 'plots'|'buildings'|'households'|'landHa'|'frameCells'|'latticeNodes'|'faces'|'vertices', without moduleCells, so the plan stage's declared limit cannot be typed.

**Required change.** Add | 'moduleCells' /* the plan stage's piece-area units (§4.12; V03 §3.4) */ to §5.1's WorkUnit union.

### VP0-29 — minor — F-MISSING — owner: scope

**Claim.** File f item 542 (c) is not applied at the judgment index. J-S42's row (l. 19710) and its rationale entry (ARCHITECTURE-RATIONALE.md l. 304) still record SquareFabric's void mode as the square row's default, though item 542 makes the carved plaza the default and II.2 (l. 18111) says J-S42 is superseded by J-V1.6. V01's note 4 hands this to scope.

**Required change.** J-S42's index row reads '| J-S42 | SquareFabric's void mode for NG's square pairs (superseded as the square row's default by J-V1.6, item 542) | §13.6, II.2 |', and the rationale entry gains the same supersession line.

## Sibling findings owned by pipeline, not raised again here

Other lanes' agreement and edge checks raised these against the pipeline part. They are recorded in those lanes' results files and not repeated as issues here. Where this lane checked the same text, the issue above that concurs is named.

| sibling id | severity | subject | this lane |
|---|---|---|---|
| AF-01 | blocker | `garden_irrigated` (§4.9) against model's `LandUse` kind `garden` (V06 note 10, V11 note 2) | read; agrees (not raised again) |
| AF-02, VS0-10 | blocker, major | §4.12's second `PlotStrategy` / `SitePlanStrategy` | VP0-19 |
| AF-03 | major | `RuleRef` / `EditRef` two shapes | not checked by this lane |
| AF-05, VV1112-24 | major, minor | §10.2 restates `undergroundAccess.prob` | VP0-24 |
| AF-12, VV12-01 | blocker | `NeighbourhoodRequest` / `Result` declared nowhere | VP0-01 |
| AF-13, VV12-08 | major | `OutlineTemplateId` declared nowhere | not checked by this lane |
| AF-21 | major | II.2 restates the `ring` template row's values | not checked by this lane |
| AF-22 | major | `levelledGroundCm`'s reader list | not checked by this lane |
| AF-27 | major | `DistrictKindRow.affinity` two declarations | not checked by this lane |
| AF-31 | major | `squares.quota` pointer to §10.2 | not checked by this lane |
| AH-13 | major | `§7.7 T9` | VP0-18 |
| AH-17 | major | `PortRows.customKinds.criticality` produced, never consumed | not checked by this lane |
| AL-03, AL-04, AL-05, AL-08, AL-09, AL-10 | blocker / major | the layers' seams (no-outfall case, the rung at an epoch, island altitude, village sewers, island resize, forecast cells) | not checked by this lane |
| AL-06, PIPE-V04-1 | major, minor | II.6 `flowToward` | VP0-13 |
| AL-27 | minor | PART III `V07 §15` | VP0-27 |
| AT-01, AT-03, AT-05, AT-29 | blocker | §4.11's epoch-spread mutation, the departure step (c), regrowth-first and its stage exceptions, `mutate`'s `step` (V06 note 7) | read; agree (not raised again) |
| AT-02, AT-06, AT-07, AT-10, AT-12, AT-14, AT-28 | blocker / major | the evolution seams of §4.11, §4.5, II.7.1 and II.7.6 | not checked by this lane |
| AT-04 | blocker | §4.11's use step `closeAfterEpochs` | VP0-05 (graded major here: an unapplied f item whose fields do not exist) |
| EW-02, EW-03, EW-05, EW-06, EW-09, EW-10 | major / minor | catalogue gaps in §4.2–§4.4 and §4.13 | not checked by this lane |
| VR0-07 | major | f item 479's §4.11 order (c) | agrees (AT-03's text) |
| VV1112-06 | major | `ClassMixRow.sun` 0.3 | VP0-16 |
| VV1112-07 | major | item 102's no-op form at S10b | VP0-17 |
| PIPE-NODE-1 | minor | II.6 (3) `node.bonus` value | VP0-24 |

The "agrees" rows are ones this lane read at the live text and found as the sibling states. They are left to the sibling's id so that one finding has one record.

## Checks that passed (summary)

- **Inventory.** 806 of 806 ids are at their mapped homes; one is lost (VP0-01). 16 token flags were each explained on reading. The 60 reference rows find their facts at the named homes.
- **f items.**
  - 280–326, 425–446, 539–566, 573–580, 202, 205, 213, 259, 271, 369, 389, 575 and 582 are applied, except 343 and 429 (c).
  - 308's S7b (5) carry sentence is left to V05 by pointer, which principle (1) allows.
  - 290's raised-way stream is named with its §6.1 row.
- **g items.**
  - 102 (§4.5's order, casters and model sampler), 106 (barrier closure, graded stretches, harbour mouth, anchor towers), 109 (a) values, 110 (raised ways, terraces, deck plots), 111 (S0/S1 oasis, water pull, water term, wells, the climate cell) and 113 (S0's history option, §4.11's history-first generation, II.7.6's buried settlement) are applied at their pipeline homes, except where an issue above says otherwise.
  - 103, 104, 105, 107 and 108 are applied at §10.2, §4.7 S10a/S10b, §4.5 S7b (1) and §4.2 S2.
- **Rulings.**
  - CF-PIPE-01–05 and 07–13 are applied.
  - DXC-05 / W-SET-01 is applied (V11 l. 942, 120 m, cited at §4.2 S1 (5)).
  - The E-36 soft-term table and its equivalence list are present, as is §4.13's EP-01–EP-19 table with its combination table.
  - BR-PIPE-01–03, EDGE-PIPE-01–08, the narration findings, the WG-PIPE rows except 05, and the W-* and RWG-07 rows are applied.
- **Cross-part notes that are met.**
  - V07 note 8: its anchors (§4.11 *History-first generation*, `ProductDecl`) exist.
  - V11 note 4: §10.2 governs `ClassMixRow.sun`, whose value is VP0-16's question.
  - V11 note 14: §4.2 S1 (5) cites V11 §3.1, which holds registry row 93.
  - V03 note 8: §4.12 names V03 §2.4's `workLimits.json` row.
  - Kernel note 10: the class floors row exists, though without area floors (VP0-14). Kernel notes 12 and 13: kernel-side.
  - Determinism: the castle repair constants and the harbour-work definition are at §4.8, the raised-way stream (§4.3) cites §6.1, the crossing band carries no value, and §4.5's two numbered lists keep their names.
  - Scope: W-IF-07's `ContentProvider` call points at §4.2 S2, §4.7 S10b and §10.3; G-lot, where only owner quotes and reference names remain; J-T; and PART III's village bands [1, 80), [80, 400), [400, 1 500).
  - Rendering: §10.3 names `live.people` and its registration.
- **Deferral sweep.** 0 hits.

## CONFIRMED versus PLAUSIBLE

CONFIRMED by reading the live text and the cited homes:
- every issue above;
- the inventory mapping (806 ids) and the reference rows;
- the f and g item applications listed as passing;
- the cross-part note outcomes.

PLAUSIBLE:
- **Severity grades.** Where a sibling graded the same text differently (AF-02, AF-05, AT-04, AL-06), this lane's grade is stated in the cross-reference table, and the adjudicator settles it.
- **VP0-14's fix.** Whether the class floor's area value should be derived from the granularity row or dropped is a design choice the required change leaves open between two named forms.
- **Corpus-dependent results.** The doc_checks-type results that would need the absent reference corpus are provisional.
