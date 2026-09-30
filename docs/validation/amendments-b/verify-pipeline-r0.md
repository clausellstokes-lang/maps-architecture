# verify-pipeline-r0 — lane amendments-b/verify-pipeline-r0 (verify the PIPELINE part after amendments b)

> PENDING FABLE REVIEW — Opus-produced (amendments-b/verify-pipeline-r0).

> PROGRESS (kill-safe ledger; a seat that continues this lane reads it first):
> STEP 0 skeleton: done (2026-09-27)
> STEP 1 inputs read (route, owner words, assemble-r0, seat reports, cross-part notes): done
> STEP 2 part read whole (§4, §10, PART II, PART III): done (3 175 lines, l. 3044–5275, 8399–8685, 11082–11737)
> STEP 3 per-item verdicts (8 10 11 12 13 14 15 16 17 18 19 24 25 26 27 30 31; ref 20 22 23 28 29): done
> STEP 4 checks (single-source, stale, cross-part, deferral wording, broken references, new problems): done
> STEP 5 issue list complete: done (41 issues: 12 major, 29 minor; scratchpad vp/issues.json)
> STEP 6 LANDED line: done (2026-09-27 03:48)

Lane `amendments-b/verify-pipeline-r0`. Part verified: PIPELINE (`## §4 `, `## §10 `, `# PART II`, `## II.`, `# PART III`)
of `docs/ARCHITECTURE.md` (sha256 at read time recorded in §1).

## 0 Outcome

Every one of the 17 items homed in the pipeline part has its mechanism in the section the route named, and every
referencing duty is present: 11 home items are PRESENT and 6 PARTIAL (10, 11, 13, 15, 25, 31), none MISSING, and 2 of
the 5 referencing items are PARTIAL (20, 28). The part carries **41 issues: 12 major, 29 minor, no
blocker** — 28 owned by the pipeline, 5 by determinism, 5 by scope, 2 by rendering, 1 by the model. The majors: II.6
still states the retired island rule with a second, incompatible `IslandRule` and `SkyStrategy` (VP-01); the tunnel
condition table four places cite is missing from II.6 (VP-02); §4.1, II.4 and §8.5 re-derive a stale rung "by mutating
the cached state" against the canonical prior (VP-03, VP-04); `relet` omits the stored-plan re-cut (VP-05); the
rejection's lapse differs from §7.7's (VP-06); two `silt` kinds share one union discriminant and §7.1 names the water one
`siltReach` (VP-07); rung 2 clears occupied rear tenements (VP-08) and splits plots while the invariants say a plot's
ring never changes without rung 3 (VP-09 – VP-11); two concerns the part draws on are unregistered in §6.1 (VP-12).

**Needs a ruling (each with a recommended repair in §4, vetoable):** VP-06 — which lapse condition holds (recommended:
the home's, J-A20.74, every epoch); VP-09 – VP-11 — whether rung 2's back-court split is an allowed ring change
(recommended: yes, the owner's "the holding fragments", with the invariants carved out) or back courts wait for rung 3;
VP-25 — the block-level floor (recommended: the area-weighted median of its plots' floors); VP-32 — whether `fill` and
a New random of a block write `builtBand` (recommended: yes, as authorial acts). Everything else is mechanical.

## 1 Inputs read

* `docs/ARCHITECTURE.md` sha256 `87d8969209c7deb59ab7e112bf9578c06f7ac67a7deaa42b7973599f30cc0429` (12 417 lines) — the
  assembler's installed hash, unchanged at read time. The rationale file sha256 `3f39b2de60c97741…` (2 013 lines).
* Read whole: the part — §4 (l. 3044–5275), §10 (l. 8399–8685), PART II with II.1–II.7.4 (l. 11082–11676), PART III
  (l. 11677–11737); the owner's words of items 8–31 (`docs/AMENDMENTS-2026-09-25b.md`, including 28 (f) — the relayed
  request of this run); `route.json` objects 8, 10–20, 22–31 (home and referencing duties); `assemble-r0.md` (the changed
  sections, the carried §4.11 blocks, the retired-text probes); the five pipeline seat reports
  (`amend-pipeline-assignments`, `-emulation-hidden`, `-evolution-islands`, `-prosperity-change-dossier-plan`,
  `-sewers`) and every cross-part note addressed to the pipeline in `amend-determinism` (§4 and §8.7), `amend-kernel` (§4),
  `amend-model` (§4), `amend-rendering` (§4) and `amend-scope` (§4); the canon's home rules R1–R13.
* Read for the cross-part checks (the subsections that cite the part): §0.2's landing rows 8–31; §1.1's `RungProfile`;
  §2.5–§2.8's records the part names (`Block.reach`, `Block.due`, `Plot.exposure`, `builtBand`, `FieldBands.middle`,
  `Passage`, `Room.scope`, the basement decision, the plan rung's canonical chain, `Existence`, `Tunnel`, `SkyIsland`);
  §5.2's failure rows and §5.3's epoch row; §6.1's concern registry; §7.1's edit-target rows and plan paragraph; §7.3's
  stale-click and stored-plan rows; §7.4's `builtBand` and epoch rows; §7.6's table enumeration and emulation marker;
  §7.7's rejection rule; §8.5's change markers; §12.4 and §12.6's rows; §13.2's T8, T10–T19, T24–T31 fixtures; §14's
  table and interface comments; D-3, D-25; the Staged list; the pipeline's 71 `J-A….4n` index rows and the Part A entries
  of J-A20.41, J-A25.41, J-A27.42, J-A28.42, J-A28.44, J-A28.45, J-A30.44, J-A31.41, J-A31.44, J-A31.45, J-A31.49, and
  the determinism rows J-A20.74, J-A28.71, J-A28.72, J-A31.72.
* Receipts in the session scratchpad: `route-pipeline.txt` (the route objects), `part.txt` (the part, numbered),
  `headings.txt`, `jrows4.txt`, `later.txt` (the deferral-wording grep).

## 2 Per-item verdicts

Verdicts: PRESENT (the mechanism is there in the route's terms), PARTIAL (present, with a contradiction or a missing piece
the route required), MISSING. Quotes are from the live document (line numbers at sha256 `87d89692…`). Issue ids are §4's.

### Home items

| item | verdict | where; the quote that carries the mechanism | issues |
|---|---|---|---|
| 8 decline and regrowth | PRESENT | §4.11 "Decline and regrowth" (l. 5087–5190): "the base carries now, stated here once: the ladders, the decline table with its exposure function, the salvage ledger, the lag rule, the regrowth-first siting order — which binds the built `grow-by-stage` path today — and the conversion kinds, each applicable by hand (§7.1) and undoable (§7.4)"; the persistence rows `use` 1.0 … `underground` 0.03 · `terrainWater` 0.005; the lottery "a weighted tendency, not a law (J-A8.41)"; the war example absent | VP-20, VP-21, VP-22 |
| 10 islands by prosperity | PARTIAL | II.6 (3), (5) (l. 11347–11371): "the SUPPORTED AREA is `A = areaHaMax(rung) · h(S_carried) · h(S_town)` … area from both prosperities, altitude from the city's alone"; §4.5 S7b (5) reads the law; §4.9's family line; §4.11's island kinds. The same subsection still states the retired rule and a second `IslandRule` / `SkyStrategy` | VP-01 |
| 11 the underground fades | PARTIAL | II.6 (l. 11395–11408): "in use → neglected, silted (`abandoned`) → partly caved in (`decayed`) → collapsed or decommissioned, sealed (`ruined` …)"; "No epoch rule ever demolishes a tunnel … while a user's `delete` stays available"; persistence row `underground` 0.03 between walls and terrain. The condition table with its `open` column that §2.7, §2.8, II.7.3 and J-A11.21 cite is not in II.6 | VP-02 |
| 12 underground neighbourhoods | PRESENT | II.7.3 (l. 11531–11650): U1 "frontage rows lie on the kerb … of exactly one navigable, open tunnel run, and its `access` rows are a subset of its `frontage` rows"; U2 "no `way` chain, no `alley` face"; U3 "footprint is `plot ∩ the frontage band of the row depth`"; the surface constraint, access, depth by band, lifecycle, order city → network → underground | VP-18, VP-19, VP-24, VP-29, VP-41 |
| 13 islands only in cities | PARTIAL | II.6 (2) (l. 11341–11345): "`RungProfile.layers.islands` (§1.1) is `none` at TOWN and at every village rung (PART III) and `possible` at CITY and METROPOLIS"; PART III l. 11729; §1.1's `layers` column. Contradicted by II.6's retained "The toggle creates 1–3 islands." | VP-01 |
| 14 sewers by tier | PRESENT | II.7.1 (l. 11427–11475): rung table `never` / `law` / `always`; "P(sewers) = clamp(base + populationWeight · … + wealthWeight · wealthLevel, 0, cap)"; "at CITY and METROPOLIS it is a view control"; S0's draw (§4.2 l. 3602–3607); PART III l. 11733 | — |
| 15 not every city has islands | PARTIAL | II.6 (1), (4) (l. 11334–11365): "the toggle only shows them"; "three ordered slots: slot k opens with probability `chance_k · h(S_town)` … a poor city has none, a rich one may have none or several". Contradicted by the retained "The toggle creates 1–3 islands" and the old `maxIslands: 1\|2\|3` | VP-01 |
| 16 assignments by rule | PRESENT | §4.7 S10b (l. 4288–4361): "the one solver every path that puts a use on a plot calls … Hard rows filter, soft rows score … A hard row is never relaxed silently"; supply edges by mode; least-disruption order; `PlacementRequest` / `PlacementResult`; §10.2 `RelationRule`, `SupplyEdge`; §4.2 S2's need propagation | VP-16, VP-28, VP-30, VP-39 |
| 17 uses move | PRESENT | §4.11 "Uses across epochs" (l. 5046–5068): "A use … is its own record (`Use`, §2.7), separate from the buildings that house it"; the use step's re-score, inertia, cap, pinned assignments, traces; `UseConversionOp`; §10.3 "Uses that move" | — |
| 18 buildings mutate | PRESENT | §4.7 S11 "The designation mutator" (l. 4422–4467): "never replaces the plot's buildings with a fresh roll … derives the new design from the present one by a recorded delta"; rules 1–7; `MutationRecord`; §4.11's epoch-spread form | — |
| 19 designations scale with prosperity | PRESENT | §4.7 S11 (l. 4364–4384): "the **designation template** — one per roster class … keyed by band with its continuous columns interpolated along the plot's prosperity value"; "Every path that creates or changes a building reads this one table"; the three smith rows; materials as a rendering attribute by pointer to §2.6; §10.2 `DesignationTemplateRow` | VP-15, VP-16 |
| 24 several markets | PRESENT | §4.2 S2 "Markets — several, by size" and S3 (12) (l. 3353–3365, 3551–3583): "`N_markets` … the **principal** … and the **secondary** markets"; the trade-convergence score whose defaults "reproduce MFCG"; S7b (3) "never touching … small patches"; §4.3, §4.4, §4.5, §4.7, §10.2 pointers | VP-12, VP-14, VP-23 |
| 25 terrain and water change slowly | PARTIAL | §4.11 (l. 5191–5222): `TerrainWaterOp` `reclaim` / `silt` / `shiftCourse` / `digCanal`, each repaired by S1's terrain or water operator or the carve path, trigger rows at the 0.005 rate. The water `silt` kind shares its `op` with the tunnel ladder's `silt` in the one union, and §7.1 names the kind `siltReach` | VP-07, VP-36, VP-37, VP-38 |
| 26 hinterland decided with the town | PRESENT | §4.9 (l. 4586–4640): "**The order is FTG's — decided with the town, drawn after it**"; `FarmTable` with fuel and timber rows, `extent`, `reserveArable` off by default; `FarmModeRow` `fill` / `perimeter`; §4.2 S2, §4.1, §4.4 pointers | — |
| 27 prosperity maps onto the references | PRESENT | §4.5 band set (l. 3896–3925): six bands, each "declared equivalent to the reference class it reproduces", FTG's weights 1 / 1 / 20 / 40 / 20 / 10, MFCG's ward-class shares as land-share anchors, the middle band `comfortable` with the cumulative arithmetic; the shanty trigger "`shanty.trigger`, `shanty.afterStageShare` 0.5; provenance `ref:FTG shanty rule`". The route's §4.5 conflict ("the row the granularity table calls modest") is gone (0 occurrences) and both statements read `comfortable` | VP-13, VP-26 |
| 30 hidden plots | PRESENT | §4.6 (l. 4115–4162): the reach `open` / `passage` / `gated`, the hidden-share targets by band ± 0.03, exposure "by adjacency and reach depth, never by a sight line", `knownTo` "moves label visibility and the reader's answers (§9.2), never geometry"; §4.11's `HiddenOp`; PART III's zero | VP-12 |
| 31 prosperity change, the ladder and the floor | PARTIAL | §4.11 Survivors (l. 4756–4899): the DUE trigger, rungs 1–3, "**no occupied building is demolished by a band change**", the asymmetry table, the churn rows, "`geometryFloor = min(builtBand, FieldBands.middle)`", the manifested band, "**the interior has no floor**", lineage, the epoch order. Rung 2 contradicts both the occupied-building rule and the ring invariant; the block-level manifested band is undefined; the writer list disagrees with §7.4 | VP-08, VP-09, VP-10, VP-11, VP-25, VP-32, VP-33, VP-34 |

### Referencing items

| item | verdict | where; the quote | issues |
|---|---|---|---|
| 20 the dossier is the authority | PARTIAL | §4.7 S10b (l. 4326–4335): "A rejected site (§7.7's rejection record, item 20) is excluded while its rejection holds … a pinned assignment's plot is fixed"; `PlacementRequest.kind` `'dossier'\|'positive'`, `pinnedTo`. §4.11 step (h) (l. 4890–4894) states a lapse condition that contradicts §7.7's | VP-06, VP-28 |
| 22 dossier changes mutate | PRESENT | §4.2 "Dossier-backed elements at creation" (l. 3592–3600): "enter S2's manifest as **fixed rows** … a replay reproduces them"; §4.7 S10b's least-disruption order; §4.11 step (e): "applied here as a mutation at that epoch … never a re-roll" | VP-28 |
| 23 emulation-first defaults | PRESENT | §4.1 (l. 3172–3182): "Where a stage rule in this part says 'always', 'never' or 'first … then', it states that row's default value … the parity presets … set every `extension` row to its off value"; the sweep — S3 (1) "not by law the market", the shanty clause an `extension` row, the decline order a lottery | — |
| 28 floor plans by click; (f) the interior has no floor | PARTIAL | §4.1 "Elaboration by click" (l. 3188–3206), §10.2 `RoomProgramRow` / `RoomRuleRow` (l. 8532–8558), II.4, II.5; (f): §10.2 "the programme rows follow §2.6's **interior ladder**", §4.11 "**the interior has no floor**", §4.7 "Households per building". The stale-rung derivation in §4.1 and II.4 ("by mutating the cached state") contradicts the canonical prior of §2.6 / §7.3, and `relet` omits the stored-plan path | VP-03, VP-04, VP-05, VP-27, VP-31, VP-40 |
| 29 entrances and basements | PRESENT | §4.7 S11 (l. 4413–4416): "the building's entrance set by §2.6's rules … re-derived whenever the designation mutates"; §10.2's `entrances` and `cellar` columns; §4.6 "An alley that presents itself" (l. 4178–4181) | VP-17, VP-35, VP-36 |

## 3 Checks

**Assembly hazards the seats named (CONFIRMED by grep, each count on the live document).** The carried §4.11 paragraphs
are present once each: "Uses across epochs", "The epoch-spread mutation", "Decline and regrowth", "Terrain and water
change slowly", "Hidden plots over epochs", "Markets over epochs"; §4.2's "S2 need propagation" once; II.6's "The island
rule", "The underground fades like the walls" and "Where the rest of the sewer layer is stated" once; one declaration
each of `ConversionOp`, `LadderOp`, `DeclineOp`, `UseConversionOp`, `TerrainWaterOp` and `HiddenOp`, the union naming all
five. Retired phrases absent: "calls modest" 0, "When the island toggle is on, S7b creates" 0, "only on new or transformed
plots" 0, "periphery, lowest value" 0, "the best is the **centre / market**" 0. What the additive seats could not delete
is the finding: II.6 still opens with the retired island rule and its old interfaces (VP-01).

**SINGLE-SOURCE (kind duplicate).** Second statements inside the part: the middle-band designation in §4.5's due-mark
paragraph (VP-13); the stall rules in §4.7 (VP-14); the material rule in §4.7 S11 (VP-15); `DesignationTemplateRow`
declared twice in §10.2 (VP-16); the capacity formula paraphrased in §4.11 (VP-27); the regrowth-first test restated in
§4.11 with a tolerance §13.2 does not use (VP-22); II.4's restatement of §4.1's stale-click rule (inside VP-03); two
`IslandRule` and two `SkyStrategy` declarations in II.6 (inside VP-01). The route's §4.5 conflict for item 28 (f) is
closed: both statements now read `comfortable`, the one designation being the band-set bullet's.

**STALE.** No sentence of the part keeps lots as buildings, binary wealth, size fixed by tier, the map editing the
dossier, a licence default or immutable terrain and water (greps: "one-building", "binary", "licen", "immutable", "never
change", "dossier" — every dossier sentence applies dossier events to the map, none writes the dossier). Stale rules
found: the island toggle that "creates 1–3 islands" (VP-01); "the market square" in the singular (VP-14); a population
fall that vacates by building (VP-20); "site-plan table(s)" after item 19 folded that table into the designation
template (VP-24); the setting pack's roster-table list (VP-30).

**CROSS-PART.** Every referencing duty the route assigned to the part is present in its section (the verdicts of §2), and
every §2.x record the part names exists (`Block.reach`, `Block.due`, `Plot.exposure` with `sealed`, `builtBand`,
`builtProsperity`, `FieldBands.bands` / `middle`, `Reservation.rank`, `BuildingSlot.frontage`, `ContextVector.arena`,
`Building.households` / `condition` / `use` / `formerUses` / `predecessor`, `Wing.spans`, `Passage`, `Use`,
`MaterialLedger`, `Enceinte.supersededBy`, `Tunnel.closure` / `navigable` / `headroomCm`, `SkyIsland.supply` / `state`).
Conflicts: the stale-rung derivation (VP-03, VP-04), `relet` on a stored plan (VP-05), the rejection's lapse (VP-06),
the water `silt` kind (VP-07 with VP-36 – VP-38), the ring invariant under rung 2 (VP-10, VP-11), the `access_point`
role (VP-19), the model seat's two §10.2 notes (VP-17), the disruption table (VP-28), the `builtBand` writers (VP-32,
VP-33), the edit-target rows of the ladder kinds (VP-34). Cross-part notes addressed to the pipeline and reflected: the
assignments seat's (b)–(e); the emulation seat's union fold and market-hall rank; the evolution seat's S7b (5), Over-time
bullet, retired §4.11 sentences and relet-before-vacate one-liner (step (c)); the prosperity seat's middle-band pointer,
manifested-band reads, back-court sealing and dossier rows; the sewers seat's II.6 pointer, persistence order and S0
toggle; the kernel's underground-by-ordinary-stages and adjacency exposure; scope's T24/T26/T27/T31 names
(`market.minSeparationM`, `market.siting`, `reserveArable`, `FieldBands.middle`, `replaceability`). Not reflected: the
evolution seat's II.6 deletions (VP-01), the sewers seat's and the model seat's condition table (VP-02), the crowding
pointer (VP-29), determinism's `siltReach`, stored-plan and disruption-table notes (VP-07, VP-05, VP-28), the model seat's
`access_point` and §10.2 notes (VP-19, VP-17), the emulation seat's stall fold (VP-14).

**DEFERRAL-WORDING.** None. Every "later" in the part is either a temporal description (a later stage, later growth) or
the roadmap's staging with its hooks named (the evolution engine, the sky and underground layers, the village product);
no "TBD", "open question", "not yet decided" or unresolved choice (receipt `later.txt`, 59 lines read).

**BROKEN-REFERENCE.** The assembler's resolver reports 0 broken internal references. Semantic breaks it cannot see: II.6's
condition table cited by §2.7, §2.8, II.7.3 and J-A11.21 (VP-02); the concerns `reserve.market` and `cut.interior` cited
at §6.1 (VP-12); §7.6's pointer for the entrance and cellar rows (VP-35); §14's home of `RelationRule` and `SupplyEdge`
(VP-39).

**NEW-PROBLEM.** Rung 2 contradicts the occupied-building rule (VP-08) and its own ring sentence (VP-09); the polycentric
secondary market is committed at S3 while two sentences say every secondary is S7b's (VP-23); a block's manifested band
is undefined when its plots' floors differ (VP-25); the shanty rule names "a lower-class district" beside J-P1's "no
district is zoned … by class" (VP-26); §4.1 calls S10b's placement a town-wide eager decision while its laziness contract
lets S10b run lazily per district (VP-31).

## 4 Issues (owner part, severity, exact required change)

Ranked most severe first, related issues kept adjacent (a pipeline issue, then the other parts' follow-ups). No blocker:
every home mechanism is present, and each issue has a mechanical or one-ruling repair. Counts:

| owner | major | minor | total |
|---|---|---|---|
| pipeline | 8 | 20 | 28 |
| determinism | 2 | 3 | 5 |
| model | 0 | 1 | 1 |
| rendering | 1 | 1 | 2 |
| scope | 1 | 4 | 5 |
| **all** | 12 | 29 | 41 |

### VP-01 — pipeline · major · stale · item 10, 13, 15 (II.6 home)

**Claim.** II.6 still opens with the retired island rule beside the new one: l. 11301 'The toggle creates 1–3 islands.'; l. 11302–11304 'by rule, when the toggle is on, S7b allocates the roster's richest demand for up to three districts' worth of households to sky pseudo-districts'; l. 11307 'an elevation from a band row'; and the code block at l. 11315–11320 declares a second `interface IslandRule { reason; maxIslands: 1|2|3; elevationCmBand; areaHaBand; … }` and a second `interface SkyStrategy { place(doc, rules: IslandRule[], …) }`, incompatible with the island rule's own declarations at l. 11384–11393. They contradict items 10, 13 and 15 as the same subsection states them ((1) the toggle only shows islands, (2) none below CITY, (4) a count of 0–3 by chance × supply). The evolution-islands seat listed these deletions as owed by the co-home seat or the repair round; the sewers seat only appended.

**Required change.** In II.6: (a) delete 'The toggle creates 1–3 islands.' (l. 11301); (b) replace 'by rule, when the toggle is on, S7b allocates the roster's richest demand for up to three districts' worth of households to sky pseudo-districts instead of the ground, so the population stays whole (§4.5 S7b (5))' with 'by rule — where the model setting `recipe.layers.islands` is on, the rung admits islands and a count slot opens (the island rule below, (1)–(4)) — S7b (5) allocates the roster's richest demand to that slot's sky pseudo-district under the supply law (5), so the population stays whole'; (c) replace 'an elevation from a band row' with 'an altitude from the supply law (5)'; (d) replace the paragraph's closing 'Hook interface:' with 'Its interfaces are the island rule's, below.'; (e) delete the code block at l. 11315–11320 (the old `IslandRule`, the old `SkyStrategy` and their two comment lines), so each interface is declared once, at the island rule; (f) in the plain-words line (l. 11298) replace 'The owner stages both layers as toggles after the city is mastered.' with 'The owner stages both layers after the city is mastered; each layer's toggle shows it, while whether it exists is a model rule (the island rule below; II.7.1's tier row).'

### VP-02 — pipeline · major · broken-reference · item 11 (II.6 home); 12

**Claim.** §2.7's `Tunnel.lifecycle` comment (l. 1513), §2.8's decline hooks (l. 1611), II.7.3's frontage rule (l. 11571: 'the condition row's `open` flag, II.6'), II.7.3's lifecycle paragraph (l. 11622) and J-A11.21 all read a tunnel's condition through 'II.6's condition table (its open column)'. II.6 has no such table: its lifecycle paragraph (l. 11395–11408) gives the ladder in prose and never says which states are open. The sewers and model seats asked for it; II.7.3's U1 and its closing rule cannot be evaluated without it.

**Required change.** In II.6's 'The underground fades like the walls', after '… (`ruined`, with `Tunnel.closure ∈ {'collapsed', 'sealed'}`, §2.7)', insert the condition table once — columns: condition | `existence` (§2.8) | `Tunnel.closure` | `open` (may carry frontage plots, II.7.3); rows: in use | `generated`, `built`, `altered` or `converted` | — | true; neglected, silted | `abandoned` | — | true; partly caved in | `decayed` | — | false; collapsed | `ruined` | `collapsed` | false; sealed (decommissioned) | `ruined` | `sealed` | false — followed by: 'The condition is this reading of `existence` and `closure`, never a second stored state (J-A11.21); `reopen` returns a run to in use, and a `setAttr` on the condition is the matching conversion (§7.1).'

### VP-03 — pipeline · major · conflict · item 28 (b)–(c) (referencing; home §2.6)

**Claim.** §4.1 (l. 3198–3203: 'until the next click re-derives it by mutating the cached state (§7.3, item 18), never by a re-roll'), II.4 (l. 11261–11265, the same sentence) and the pipeline's J-A28.42 (index row l. 12327 and its Part A entry: 'a stale one re-derived by mutating the cached state') contradict the canonical prior stated by §2.6 (l. 1362–1364, 1418–1426), §6.2, §6.5 (9), §7.1 (l. 6172) and §7.3 (l. 6415) — 'the stored plan where one exists, else the as-built plan carried along the interior ladder … never from the cache' (J-A28.71 as amended, J-A28.26). §4.1 also marks every changed rung stale, while a STORED plan is re-cut inside the changing event (§7.3's second row, J-A28.72). Read as written, the plan would depend on when the user clicked, which §6.5 (9)'s click-order identity forbids.

**Required change.** §4.1 'Saved, then stale until clicked': after 'sets it `stale`' insert '(an unstored rung; a stored plan is re-cut inside the changing event instead, §7.3, J-A28.72)', and replace 'until the next click re-derives it by mutating the cached state (§7.3, item 18), never by a re-roll' with 'until the next click re-derives it from its canonical prior — the stored plan where one exists, else the as-built plan carried along §2.6's interior ladder — as a least-disruption mutation, never from the cache and never by a re-roll (§2.6, §7.3; J-A28.71)'. II.4 'Elaboration by click at stage 2': replace the sentence 'When the simulator, a dossier event or an epoch changes an input … and viewing never re-derives a `current` rung.' with 'Staleness, the change marker and the click's re-derivation from the canonical prior are §4.1's policy over §2.6's rule (§7.3).' J-A28.42: in the index row replace 'a stale one is re-derived by mutating the cached state' with 'a stale one is re-derived from its canonical prior (J-A28.71), never from the cache'; in its Part A entry replace 'a stale one re-derived by mutating the cached state' with 'a stale one re-derived from its canonical prior (the stored plan, else the as-built plan carried along §2.6's interior ladder; amended 2026-09-27 for J-A28.71)'.

### VP-04 — rendering · major · conflict · item 28 (b)–(c)

**Claim.** §8.5's change-marker paragraph (l. 7745) says the marker 'vanishes when the click re-derives the rung by mutating the cached state (§7.3)' — the same contradiction as VP-03 with §2.6's and §7.3's canonical prior ('never from the cache', J-A28.71 as amended).

**Required change.** §8.5 l. 7745: replace 'when the click re-derives the rung by mutating the cached state (§7.3)' with 'when the click re-derives the rung from its canonical prior (§2.6, §7.3; never from the cache)'.

### VP-05 — pipeline · major · conflict · item 28 (f), 31 (§4.11 rung 1)

**Claim.** §4.11 states the interior re-cut of `relet` only as a click-time act: rung 1 (l. 4782–4785: 'the plan rung re-cuts the programme for the new count … when next clicked (the rung goes `stale`, §2.8 …)'), the `LadderOp.relet` comment (l. 4920: 'the plan rung re-cuts to §2.6's interior ladder when next clicked') and step (c) (l. 4882–4883: '(its plan rung `stale`)'). §2.6 (l. 1425–1426), §7.1 (l. 6238: `relet` 'marks an unstored plan stale and re-cuts a stored' one), §7.3's second row (l. 6416) and §7.4's epoch row re-cut a STORED plan inside the changing event (J-A28.72), because a click logs nothing and a stored plan is model data. The determinism seat's cross-note asked the pipeline to say so; as written, a stored plan would keep units for households the re-let count no longer has — a write that survives one path and ghosts the other.

**Required change.** §4.11 rung 1: replace '— when next clicked (the rung goes `stale`, §2.8; F-PLAN never drops a household, §5.2)' with '— inside the `relet` event itself when the building's plan is stored (§7.3's stored-plan row; J-A28.72), otherwise when next clicked (the unstored rung goes `stale`, §2.8); F-PLAN never drops a household (§5.2)'. `LadderOp.relet` comment: replace 'the plan rung re-cuts to §2.6's interior ladder when next clicked (item 28 (f))' with 'a stored plan is re-cut inside this event, an unstored one goes stale and is re-cut on the click, both along §2.6's interior ladder (§7.3; item 28 (f))'. Step (c): replace '(its plan rung `stale`)' with '(an unstored plan rung `stale`, a stored plan re-cut in the event)'.

### VP-06 — pipeline · major · conflict · item 20 (referencing; home §7.7)

**Claim.** §4.11's epoch step (h) (l. 4890–4894) re-checks a rejection 'by §7.7's lapse rule — the settlement having grown or declined since the rejection (the epoch's population target differs from the target recorded with it), or a dossier event having touched its block', and J-A20.41 chose this 'over lapsing at every epoch'. §7.7 rule 3 (l. 7024–7027), the home of item 20, lapses a rejection 'at the first `epoch` event, or dossier event whose effective scope holds the site's block, that folds after it' (J-A20.74), and §7.7's `Rejection` (`held: { epoch, blockSeq }`) records no population target for the pipeline's test to read. Two judgment calls and two statements of one rule disagree.

**Required change.** §4.11 step (h): replace 'is re-checked by §7.7's lapse rule — the settlement having grown or declined since the rejection (the epoch's population target differs from the target recorded with it), or a dossier event having touched its block — and a lapsed site is eligible again from the next placement on (J-A20.41)' with 'lapses by §7.7's rule — this epoch event lapses it and writes `lapsedAt` in its own touched set (J-A20.74) — and a lapsed site is eligible again from the next placement on'. J-A20.41's index row: replace the choice with 'the epoch's step (h) applies §7.7's lapse (J-A20.74): every live rejection lapses at the epoch; the pipeline adds no condition of its own'; its Part A entry gains '(amended 2026-09-27: the population-target condition is withdrawn — §7.7's `Rejection` records no target and the home ruling J-A20.74 lapses at the first epoch or dossier event touching the block).'

### VP-07 — pipeline · major · conflict · item 25 (§4.11 home)

**Claim.** The one `ConversionOp` union holds two kinds with `op: 'silt'` — `DeclineOp`'s tunnel kind (l. 5185, `{ op: 'silt' | 'caveIn' | 'seal' | 'reopen'; tunnel: Id … }`) and `TerrainWaterOp`'s water kind (l. 5200, `{ op: 'silt'; water: Id … }`) — so the discriminant, §7.1's `convert` event and the lifecycle cause `convert:silt` are ambiguous; and §7.1's terrain-and-water edit-target row (l. 6275) names the water kind `siltReach`, as the determinism seat asked the pipeline to declare it ('`silt` is taken by the tunnel ladder'). §4.11 declares no `siltReach`.

**Required change.** §4.11 'Terrain and water change slowly': rename the water kind `siltReach` — the union member `{ op: 'siltReach'; water: Id; stretch?: StretchRef /* … */ }`, the Repair bullet ('`siltReach` and `shiftCourse` are S1's water operator on the changed reach …') and the trigger rows ('`siltReach` — a reach whose accumulation has fallen, or a basin whose harbour use has closed …'); the tunnel ladder keeps `silt` (II.6, `DeclineOp`). Follow-ups: VP-36 (§2.3), VP-37 (§12.6), VP-38 (§13.2 T25-1, §0.2 row 25).

### VP-08 — pipeline · major · new-problem · item 31 (§4.11 rung 2); 30

**Claim.** Rung 2 growing rich clears a back court with `thin … back_court` — 'its uses relocated by the use step first, the rear plots cleared, the passage sealed' (l. 4798–4800), 'a back court cleared after its uses relocate, its passage sealed' (`LadderOp.thin`, l. 4922), 'the rear plots cleared after their uses relocate' (l. 5231–5233). A court's rear tenements are housing, and their households are neither re-homed nor vacated before the clearance, so an occupied building is removed by a band change — against §4.11's own 'no occupied building is demolished by a band change' (l. 4775–4776), §5.3's epoch row and §13.2 T31-4 ('a redevelopment first vacates'). Only rung 3's redevelopment composite (purchase → relocation → vacancy → re-cut) honours the rule today.

**Required change.** State `thin … back_court` as the same composite in all three places — rung 2 (l. 4798–4800): '(`thin … back_court`: its uses relocated by the use step, its households re-homed — item 17's relocation, or a `relet` up in a standing shell within §2.6's capacity — and its buildings vacated (`vacate`), then the rear plots cleared and the passage sealed, item 30; a court whose households cannot be re-homed within the epoch's churn cap waits)'; the `LadderOp.thin` comment: 'a back court cleared after its uses relocate, its households are re-homed and its buildings vacated; its passage sealed'; 'Hidden plots over epochs': 'the rear plots cleared after their uses relocate, their households are re-homed and their buildings vacated'.

### VP-09 — pipeline · major · new-problem · item 31 (§4.11 rung 2); 30

**Claim.** §4.11 rung 2 ends 'Rung 2 moves plot lines only inside the yard; the plot's ring and its main shells stand.' (l. 4801), but rung 2's own `densify … back_court` 'cuts a plot's yard into rear plots reached by a new passage … through S10's incremental re-cut with the neighbours fixed (§4.7 S10 (7))' (l. 5229–5231; §4.6 l. 4182): the rear plots are new L3 faces split off the plot, so its ring changes without a rung-3 event. This sentence, §5.3's epoch row (VP-10) and §13.2 T31-9 (VP-11) cannot all hold. The owner's rung 2 ('the holding fragments without the front changing: a yard becomes a back court with its passage') makes the split legitimate; the owner's 'no geometry change' concerns the rich ↔ middle cycle, which the design already keeps free of back courts ('a middle-floored plot's yard is infilled, not cut into tenements').

**Required change.** §4.11 rung 2: replace 'Rung 2 moves plot lines only inside the yard; the plot's ring and its main shells stand.' with 'Rung 2 keeps every frontage and every main shell; its one plot-line change is `densify … back_court`, which splits the yard off the plot into rear plots and a passage face by S10 (7)'s incremental re-cut — the front plot keeping its address, lineage and `builtBand`, the rear plots keyed as §6.3's split children — admitted only where the plot's manifested band's row carries a rear-plot or hidden share, never on a middle-floored plot; `thin … back_court` reverses it.'

### VP-10 — determinism · major · new-problem · item 31

**Claim.** §5.3's epoch row (l. 5411) requires that 'a plot without a rung-3 event keeps its ring and its buildings' shells across the epoch', which rung 2's `densify … back_court` split (§4.11, §4.6; VP-09) breaks by design: the owner's rung 2 fragments the holding without a rung-3 event.

**Required change.** §5.3 epoch row: replace 'a plot without a rung-3 event keeps its ring and its buildings' shells across the epoch' with 'a plot without a rung-3 event keeps its frontage and its buildings' shells across the epoch, and its ring changes only by rung 2's `densify … back_court` split or its `thin` reversal (§4.11)'; the check column adds 'every ring change matched to a recorded back-court event'.

### VP-11 — scope · major · new-problem · item 31

**Claim.** §13.2 T31-9 ('after any run of epochs with no rung-3 event on a plot, its ring and its buildings' shells are unchanged …') fails on a legitimate rung-2 back court (§4.11's `densify … back_court`; VP-09).

**Required change.** §13.2 T31-9: replace 'its ring and its buildings' shells are unchanged' with 'its frontage and its buildings' shells are unchanged, its ring changes only by rung 2's back-court split or its reversal,'; T31-11 stays as written (rich-built stock is middle-floored and takes no back court).

### VP-12 — determinism · major · broken-reference · item 24, 30

**Claim.** §4.2 S3 (12) draws the principal market's random term 'from the `reserve.market` concern (§6.1)' (l. 3555) and §4.6 draws a deep block's treatment and reach on '`cut.interior`, one pair' (l. 4139); §0.2's landing row 30 says 'the concern `cut.interior` in §6.1'. §6.1's registry (l. 5541–5582) lists neither — only `reserve.plaza`, `reserve.castle`, `reserve.precinct`, `reserve.water` and `cut.t`, `cut.side`, `cut.arc`, `cut.width`, `cut.farSideAlt` — so two draws of the pipeline have no registered stream. The emulation-hidden seat's note asked the determinism seat to register both.

**Required change.** §6.1's 'Appended by the amendments' list: add '`reserve.market` (a geometry concern declared like `reserve.plaza`: S3 (12)'s trade-convergence random term, keyed by the town's lineage; item 24) and `cut.interior` (a geometry concern, non-rerollable: S8's interior treatment and reach draw, one pair per deep block, keyed by the block's lineage; item 30)' — append-only ids.

### VP-13 — pipeline · minor · duplicate · item 27, 31 (§4.5)

**Claim.** §4.5's paragraph 'The due mark and the dossier's rows' (l. 3995–4001) restates the middle-band designation ('`FieldBands.middle`, where the settlement's median household falls under the roster's wealth shares, `comfortable` under the default set … each settlement's own, so a town's middle and a metropolis's middle each bound their own districts') that the band-set bullet states (l. 3917–3922, J-A27.42), and it sits between S7b's steps (5) and (6), splitting S7b's numbered list (step 6 follows it at l. 4003). The route's §4.5 conflict itself is closed: both statements read `comfortable`.

**Required change.** Reduce the paragraph's first sentence to '§4.11's geometry floor reads `FieldBands.middle` as the band-set bullet above designates it (J-A27.42, J-A31.45).' and move the whole paragraph after S7b (6) (after l. 4008), so S7b's steps (1)–(6) form one list.

### VP-14 — pipeline · minor · duplicate · item 24 (§4.7)

**Claim.** §4.7's furniture pins (l. 4475–4477: '**market stalls** line the market square's edge band and ring a market hall in market districts, one per ≈ 150 m² of square (≤ 40)') and the later 'Markets and hidden plots in this stage' (l. 4480–4483: 'the principal the plaza's weights and one stall per ≈ 150 m² (≤ 40), a secondary one stall per ≈ 200 m² (≤ 20) and a centrepiece with probability 0.5') state the principal's stall rule twice, the first in the one-market singular 'the market square'. The emulation seat's note asked for one statement.

**Required change.** Pins sentence: replace '**market stalls** line the market square's edge band and ring a market hall in market districts, one per ≈ 150 m² of square (≤ 40), drawn as small tents' with '**market stalls** line each market square's edge band and ring its market hall, by rank — the principal one per ≈ 150 m² of square (≤ 40), a secondary one per ≈ 200 m² (≤ 20) with a centrepiece at probability 0.5 (our own rows, calibratable) — drawn as small tents'; in 'Markets and hidden plots in this stage' replace its first sentence with 'Every market square — the plaza when it carries the principal rank, a flanking principal market, each secondary claim — takes the pins above by its rank; the market hall's `nearMarket` row (§10.2) binds it to the principal market by default.'

### VP-15 — pipeline · minor · duplicate · item 19 (§4.7 S11)

**Claim.** §4.7 S11 restates the material rule twice — '**Materials are not template columns:** `MaterialRow` (§2.6) is a rendering attribute — texture and colour — and never a shape input; the template and the prosperity value alone decide footprint, wings, storeys, heights and roof form (owner, 2026-09-26).' (l. 4381–4383) and '**materials** from `MaterialRow` (COV-FTG-F20; §2.6's rule: a rendering attribute only, above)' (l. 4418) — while the rule's single home is §2.6 (the route's item 19; J-A19.42).

**Required change.** Replace the sentence at l. 4381–4383 with '**Materials are not template columns** — the material rule, texture and colour only, is §2.6's (J-A19.42).' and the clause at l. 4418 with '**materials** from `MaterialRow` (COV-FTG-F20; §2.6)'.

### VP-16 — pipeline · minor · duplicate · item 16, 19, 24, 28, 29, 31, 8, 12, 14 (§10.2)

**Claim.** §10.2 declares `DesignationTemplateRow` twice — the main block (l. 8454–8461) and the appended block (l. 8529–8534, '/* … the columns above, and: */') — with `programme: string` in both; and the class-row columns `secondaryChance` (l. 8511), `salvageM3` (l. 8521), `drain`, `underground` and `undergroundAccess` (l. 8565–8570) exist only in prose, absent from `BuildingClassRow` (l. 8438). R12: one declaration per interface.

**Required change.** Merge the appended `replaceability`, `households`, `entrances` and `cellar` columns into the one `DesignationTemplateRow` declaration (one `programme` field) and keep only `RoomProgramRow` and `RoomRuleRow` in the second block; add to `BuildingClassRow`: `secondaryChance?: number /* market rows: the TOWN chance of a secondary market (§4.2 S2) */; salvageM3: Record<string, number> /* §4.11's ledger */; drain: 'none'|'pit'|'channel'; underground: 'never'|'allowed'|'preferred'; undergroundAccess: boolean /* II.7 */`, the prose paragraphs pointing to the fields.

### VP-17 — pipeline · minor · conflict · item 29, 28 (f) (§10.2)

**Claim.** Two notes the model seat addressed to §10.2 are not reflected: (a) the `cellar` column (l. 8533: `{ prob; kinds; slopeCm; rockCost }`) lacks the depth and inset §2.6's basement decision reads — §2.6 cites 'a basement table value, default 220 cm; §7.6' and 'the table's `insetCm`, default 60' with no declared home; (b) `RoomRuleRow.scope`'s comment (l. 8538) glosses `service` as 'a staff room', while §2.6's `Room.scope` (l. 986) defines it as the use's or the staff's rooms.

**Required change.** §10.2: `cellar` becomes `{ prob: number; kinds: { full: number; half: number; walkout: number }; slopeCm: Cm; rockCost: number; depthCm: Cm /* default 220: the cellar floor below baseCm */; insetCm: Cm /* default 60: the basement ring's inset inside the ground-storey wings */ }`; in `RoomRuleRow.scope`'s comment replace 'a staff room' with 'the use's or the staff's rooms (a forge, a shop, a store, a staff chamber)'. §2.6's two pointers follow (VP-36).

### VP-18 — pipeline · minor · partial · item 12 (II.1)

**Claim.** II.1's `NeighbourhoodRequest` declares `layer: 'ground' | 'sky'` (l. 11111), while the paragraph 'The underground close-up' (l. 11187–11189) and II.7.3 say the field 'also admits `'underground'`'.

**Required change.** II.1: declare `layer: 'ground' | 'sky' | 'underground';` with the comment extended by 'underground: the underground pseudo-district's refine close-up, no portals, its tunnels its ways (II.7.3)', and cut the paragraph 'The underground close-up' to its rule without restating the type.

### VP-19 — pipeline · minor · conflict · item 12 (II.7.4)

**Claim.** II.7.4 documents `AccessPoint.under.at` as `VertexRef /* ('access', id) on the tunnel's kerb */` (l. 11660), but §2.2 rule 7 declares the vertex role `access_point` for an `AccessPoint`'s vertex (l. 669) and §2.7 says its 'tunnel-side vertex carries the `access_point` role' (l. 1514); `access` is the plot's EDGE role (`('access', plot id)`, l. 859), so II.7.4's name collides with it (the model seat's cross-note).

**Required change.** II.7.4 l. 11660: replace `('access', id)` with `('access_point', id)` — '/* ('access_point', id) on the tunnel's kerb, §2.2 rule 7 */'.

### VP-20 — pipeline · minor · stale · item 8, 28 (f) (§4.11, §10.2)

**Claim.** Two sentences still vacate by building on a population fall, the rule item 28 (f) replaced (J-A28.45; step (c): 'a building whose household count falls but not to zero takes a `relet` down … and `vacate` fires only when its last household leaves'): the strike lottery (l. 5126: 'the suffix is selected in reverse ordinal order and its uses leave (`vacate`)') and §10.2's 'Under a fall' (l. 8519–8520: 'selects the suffix in reverse ordinal order, as above, and vacates its buildings (`vacate`, §4.11)').

**Required change.** Strike lottery: replace 'the suffix is selected in reverse ordinal order and its uses leave (`vacate`)' with 'the suffix leaves in reverse ordinal order as the epoch's step (c) states — a `relet` down while households remain, `vacate` when a building's last household leaves (J-A28.45)'. §10.2 'Under a fall': replace 'and vacates its buildings (`vacate`, §4.11)' with 'and its households leave by §4.11's step (c) — a `relet` down, `vacate` only when a building's last household leaves'.

### VP-21 — pipeline · minor · partial · item 8, 28 (f) (§4.11)

**Claim.** Step (f) (l. 4887–4889) and J-A28.45 put 'a `relet` up in a standing shell whose count fell below what its occupants' band row houses … before `reoccupy` of a vacant one' first in the regrowth-first order, but the order's own statement, 'Regrowth-first — built now, on the one path' (l. 5146–5153), lists (1) `reoccupy` … (6) new faces and no relet step.

**Required change.** In 'Regrowth-first — built now' insert before (1): '(0) standing shells whose household count fell below what their occupants' band row houses are relet up within §2.6's capacity (`relet`; J-A28.45);' and let step (f) point to it ('siting places the delta in the regrowth-first order below, from its step (0)').

### VP-22 — pipeline · minor · duplicate · item 8 (§4.11)

**Claim.** §4.11's regrowth-first bullet restates its hook test — '**Test (M4; §13.2):** a town with 12 % of its buildings vacated … adds 0 new faces and refills ≥ 95 % of the delta inside the old plan, every vacancy-run share unchanged' (l. 5154–5156) — while §13.2's T8-2, the test's home by R9, bounds the vacancy-run share 'within ± 0.02 of its table share'. Two statements, two tolerances.

**Required change.** Replace the sentence with '**Test:** §13.2's T8-2 (M4).'

### VP-23 — pipeline · minor · new-problem · item 24 (§4.2)

**Claim.** S3 (1) makes a polycentric nucleus's plaza that does not win the principal market 'a secondary market when the roster's count allows (S2), ranked and committed with the principal at (12)' (l. 3423–3424), and S7b (3) subtracts 'any polycentric plaza S3 (12) ranked secondary' (l. 3969–3970); but S2 says 'every secondary one is a district claim of S7b (§4.5 S7b (3))' (l. 3360–3361) and S3 (12)'s batch 'Every other claim larger than a block, every secondary market included, is S7b's' (l. 3579–3580).

**Required change.** S2 (l. 3360–3361): replace 'every secondary one is a district claim of S7b (§4.5 S7b (3))' with 'every secondary one is a district claim of S7b (§4.5 S7b (3)) except a polycentric nucleus's plaza, which S3 (12) ranks secondary'; S3 (12) (l. 3579–3580): replace 'every secondary market included' with 'every secondary market but a polycentric plaza ranked here included'.

### VP-24 — pipeline · minor · stale · item 12, 19 (II.7.3, II.7.4, PART III)

**Claim.** Item 19 folded the site-plan table into the designation template (J-A19.41), but II.7.3 (l. 11566–11567: 'the site-plan table's arena column admits the `row` and `institution` arrangements only'), II.7.4 (l. 11673: 'the underground rows of the granularity and site-plan tables') and PART III (l. 11687: 'the site-plan tables, which already contain cottage, farmstead and detached-in-yard classes (§4.7)') name a table that no longer exists, and no 'arena column' is declared on `DesignationTemplateRow` or the arrangement rows.

**Required change.** II.7.3: replace 'and the site-plan table's arena column admits the `row` and `institution` arrangements only' with 'and on the underground arena S11 admits only the designation templates' `row` and `institution` arrangements (§10.2's `arrangement`, read with `ContextVector.arena`)'; II.7.4: replace 'the underground rows of the granularity and site-plan tables' with '`UndergroundRule`'s depth scale, vacancy share and arrangement restriction'; PART III: replace 'the site-plan tables, which already contain' with 'the designation templates (§4.7 S11, §10.2), which already contain'. Model and scope follow (VP-36, VP-41).

### VP-25 — pipeline · minor · new-problem · item 31 (§4.7 S10 (2), II.3)

**Claim.** S10 (2) reads 'the block's **manifested band** — the field band raised to the plot's `geometryFloor`' (l. 4235) and II.3 'the block's manifested band — the field band raised to its plots' geometry floor' (l. 11227), but the floor is per plot (J-A31.43) and a block's plots may carry different `builtBand` after the base's hand edits (split, join, `rebuild`) or rung-3 events; nothing says which floor a block-level read uses.

**Required change.** In §4.11's floor paragraph add: 'A block-level read — S10 (2)'s granularity row, II.3's dispatch — uses the block's manifested band max(field band, the band of the area-weighted median of its standing plots' `geometryFloor`) by the band order; a plot-level read uses its own floor.' and point S10 (2) and II.3 at that sentence instead of 'the plot's `geometryFloor`' / 'its plots' geometry floor'.

### VP-26 — pipeline · minor · new-problem · item 27 (§4.5 typing)

**Claim.** §4.5's typing says kinds are feature-named and 'no district is zoned residential or by class' (J-P1), then the shanty rule says 'where admitted it replaces a lower-class district's typing' (l. 3877–3878) — a class of district the design does not have.

**Required change.** Replace 'where admitted it replaces a lower-class district's typing' with 'where admitted it replaces the typing of the districts of lowest mean pass-1 band'.

### VP-27 — pipeline · minor · duplicate · item 28 (f) (§4.11)

**Claim.** §4.11 rung 1 (l. 4778–4780: 'the smaller of its template row's `households.max`, read at the plot's `builtBand` (§10.2) … and what its storeys' floor area holds') and the `LadderOp.relet` comment (l. 4920: 'the template row's households.max at the plot's builtBand (§10.2) and the shell's floor area') paraphrase §2.6's one capacity function (J-A28.23), which J-A28.44 says the pipeline references by one pointer per place, never restated.

**Required change.** Rung 1: replace '(the smaller of its template row's `households.max`, read at the plot's `builtBand` (§10.2) — a shell built richer holds more households when let out, the owner's "the more rooms for more occupying families" — and what its storeys' floor area holds)' with '(§2.6's one capacity function, J-A28.23)'; `LadderOp.relet` comment: replace '— the template row's households.max at the plot's builtBand (§10.2) and the shell's floor area' with '(J-A28.23)'.

### VP-28 — pipeline · minor · conflict · item 20, 22 (§4.7 S10b)

**Claim.** S10b's post-build order uses 'a table depth, default 1' for displacement (l. 4329) and 'disruption cost (a table weight per displaced use, per join and per subtracted part)' (l. 4332) without naming the table; §7.7 declares it — `DisruptionBudgetRow { kind; weights: { displacedUse; join; subtractedPart; vacated }; budget; displacementDepth }` — and the determinism seat's note asked S10b to read its cost and depth from that row. S10b's cost also omits the row's `vacated` weight.

**Required change.** S10b: replace '— a table depth, default 1 —' with '— §7.7's `DisruptionBudgetRow.displacementDepth`, default 1 —' and 'disruption cost (a table weight per displaced use, per join and per subtracted part)' with 'disruption cost (§7.7's `DisruptionBudgetRow.weights` for the request's kind: per displaced use, per join, per subtracted part and per vacated plot)'.

### VP-29 — pipeline · minor · missing · item 12 (§4.11)

**Claim.** II.7.3 (c) sends 'a table share of S5d's ground shortfall … underground before the boundary widens (§4.11)' (l. 11554–11555) and §4.5 S7b (6) names 'in an epoch, the crowding hook', but §4.11's epoch order and regrowth-first order never mention the underground; the sewers seat asked for 'a one-line pointer in the evolution hook'.

**Required change.** §4.11 'Regrowth-first — built now': in (6) prefix 'where `Features.sewers` is on, the underground crowding hook first takes its table share of the residual (II.7.3 (c), S7b (6));' — the engine's rule, stated in the base's order.

### VP-30 — pipeline · minor · stale · item 16, 28 (§10.4)

**Claim.** §10.4's `SettingPack.rosterPatch` comment (l. 8666: 'classes, institutions, government, religions, households, professions, farm (§10.2)') omits the roster tables amendments b added to `RosterTables` — `districtKinds`, `resources` and `roomProgram` — although item 16 (d) makes the relation templates editable data and a pack edits a table by the same row operations as a user.

**Required change.** §10.4: extend the comment to 'classes, districtKinds, resources, institutions, government, religions, households, professions, farm, roomProgram (§10.2)'.

### VP-31 — pipeline · minor · new-problem · item 28 (b) (§4.1)

**Claim.** §4.1's 'Pre-assigned plots' (l. 3203–3206) says the content decision 'is taken town-wide before any building geometry, by S2, S7b, S10a and S10b', while the laziness contract in the same subsection lists S10b among the per-district stages that 'may run lazily or in the pool', not among the eager town-wide decisions.

**Required change.** Replace 'is taken town-wide before any building geometry, by S2, S7b, S10a and S10b (the allocation and placement records above)' with 'is taken before any building geometry — town-wide by S2, S7b and S10a (the allocation records above), and per plot by S10b, which the first paint runs for every district ahead of S11'.

### VP-32 — pipeline · minor · conflict · item 31 (§4.11 floor)

**Claim.** §4.11's list of what writes `builtBand` (l. 4862–4869, J-A31.44) and §7.4's lifecycle row (l. 6648, J-A31.72) differ: §7.4 adds `fill` and 'a `regenerate` of the block' as redevelopment-class writers §4.11 omits, and §4.11 names `demolish` then `build` and a `FieldBands` `setAttr` §7.4 omits; and J-A31.44's index row says 'lowered by rung 3 only' although the authorial re-derivations it lists (a brush, `Adjust`) reset `builtBand` in their scope and so can lower it.

**Required change.** §4.11: among 'the hand edits of rung 3's kind' add '`fill` and a New random of the block (each re-derives the stock by the user's act)'; J-A31.44's index row: replace 'lowered by rung 3 only' with 'lowered only by a rung-3 event, a hand edit of rung 3's kind or an authorial re-derivation in its scope — never by wealth change over epochs'; §7.4's row then points to this list (VP-33).

### VP-33 — determinism · minor · conflict · item 31 (§7.4)

**Claim.** §7.4's `builtBand` row (l. 6648) enumerates its writers independently of §4.11's list (J-A31.44), the floor's home, and the two lists differ (VP-32).

**Required change.** §7.4 `builtBand` row, create column: replace the enumeration with 'the writers §4.11's floor paragraph lists (J-A31.44): generation, rung-3 events, the hand edits of rung 3's kind, the authorial re-derivations and a completed upward refurbishment'.

### VP-34 — determinism · minor · missing · item 31 (§7.1, §7.4)

**Claim.** §4.11 declares the ladder kinds 'each a mutation with an undo record (§7.4), usable by hand (§7.1)', and §14 (l. 10498) and §0.2's row 31 list `densify` and `thin` among §7.1's event kinds, but §7.1's edit-target rows name `relet` (buildings) and `plotToGarden`, `amalgamate`, `sealPassage`, `openPassage` (plots), never `densify` or `thin`; §7.4's convert row lists the decline, tunnel, island, use and terrain-water kinds and not the ladder's.

**Required change.** §7.1 blocks-and-plots row: `convert` (`plotToGarden`, `amalgamate`, `sealPassage`, `openPassage`, `densify` (infill, back_court), `thin` (infill, back_court); §4.11); §7.4 convert row: 'incl. the ladder kinds (`relet`, `densify`, `thin`, `subdivide`, `amalgamate`), the decline kinds, …'.

### VP-35 — determinism · minor · broken-reference · item 29 (§7.6)

**Claim.** §7.6's table enumeration ends 'the disruption budget rows (§7.7) and the entrance and cellar rows (§2.6)' (l. 6892), but the entrance and cellar rows are §10.2's `DesignationTemplateRow` columns (`entrances`, `cellar`; J-A29.41), which §2.6's rules read.

**Required change.** §7.6: replace 'the entrance and cellar rows (§2.6)' with 'the entrance and cellar columns of the designation templates (§10.2, read by §2.6's rules)'.

### VP-36 — model · minor · conflict · item 25, 29, 12, 19 (§2.3, §2.5, §2.6)

**Claim.** Three model sentences must follow pipeline changes: §2.3 (l. 792) names the water conversion '`silt` on a reach or basin', which VP-07 renames `siltReach`; §2.6's basement decision reads 'a basement table value, default 220 cm; §7.6' and 'the table's `insetCm`, default 60' (l. 1278, 1284), which VP-17 declares as §10.2's `cellar.depthCm` and `cellar.insetCm`, as the model seat's own note asked; §2.5 still calls the designation templates 'S11's site-plan tables' (l. 896) and keys `ContextVector.arena` to 'the granularity and site-plan tables' (l. 887), a table item 19 retired.

**Required change.** §2.3 l. 792: '`silt` on a reach or basin' → '`siltReach` on a reach or basin'; §2.6: '(a basement table value, default 220 cm; §7.6)' → '(the class row's `cellar.depthCm`, default 220 cm; §10.2)' and 'inset by the table's `insetCm`, default 60' → 'inset by the class row's `cellar.insetCm`, default 60 (§10.2)'; §2.5 l. 896: 'S11's site-plan tables (§4.7)' → 'S11's designation templates (§4.7)'; l. 887: 'the arena-specific rows of the granularity and site-plan tables (II.7.3)' → 'the arena-specific rows of the granularity table and of the designation templates' arrangement (II.7.3)'.

### VP-37 — rendering · minor · conflict · item 25 (§12.6)

**Claim.** §12.6 (l. 9262) lists the terrain and water conversions as '(`reclaim`, `silt`, `shiftCourse`, `digCanal`)'; after VP-07 the water kind is `siltReach` (`silt` stays the tunnel ladder's).

**Required change.** §12.6 l. 9262: '`silt`' → '`siltReach`' in that list.

### VP-38 — scope · minor · conflict · item 25 (§13.2, §0.2)

**Claim.** §13.2's T25-1 ('a hand `reclaim` and a hand `silt` are byte-identical outside their footprint', l. 9848) and §0.2's landing row 25 ('`reclaim`, `silt`, `shiftCourse` and `digCanal`', l. 157) name the water kind `silt`, which VP-07 renames `siltReach` to end the union's clash with the tunnel ladder's `silt` and to match §7.1.

**Required change.** §13.2 T25-1 and §0.2 row 25: '`silt`' → '`siltReach`'.

### VP-39 — scope · minor · broken-reference · item 16 (§14)

**Claim.** §14's `@plat/plots` comment (l. 10478) says 'PlacementSolver, DesignationMutator, RelationRule and SupplyEdge are §4.7's'; `RelationRule` and `SupplyEdge` are declared in §10.2 (l. 8444, 8452), only `PlacementSolver` and `DesignationMutator` in §4.7.

**Required change.** §14 l. 10478: replace 'PlacementSolver, DesignationMutator, RelationRule and SupplyEdge are §4.7's' with 'PlacementSolver and DesignationMutator are §4.7's, RelationRule and SupplyEdge §10.2's'.

### VP-40 — scope · minor · conflict · item 28 (f) (§13.2)

**Claim.** §13.2's T8-7 expects that 'every `relet` down marks its plan rung `stale`', but a STORED plan is re-cut inside the `relet` event, not marked stale (§2.6, §7.1, §7.3, J-A28.72; VP-05).

**Required change.** T8-7: replace 'and every `relet` down marks its plan rung `stale`' with 'and every `relet` down marks an unstored plan rung `stale` and re-cuts a stored plan inside its own event'.

### VP-41 — scope · minor · stale · item 12 (Staged list)

**Claim.** The Staged list's sewers-and-islands row (l. 12391) lists 'the underground rows of the granularity and site-plan tables', a table item 19 folded into the designation template (VP-24).

**Required change.** Staged list, sewers-and-islands row: replace 'the underground rows of the granularity and site-plan tables' with '`UndergroundRule`'s depth scale, vacancy share and arrangement restriction'.

## 5 CONFIRMED versus PLAUSIBLE

**CONFIRMED (read on disk or executed; the document's sha256 `87d89692…` unchanged from the first read to the last):**
every quotation and line number above; the presence counts of the carried §4.11, §4.2 and II.6 texts and the absence of
the five retired phrases (grep counts, §3); the two `interface IslandRule` and two `interface SkyStrategy` declarations
in II.6 (l. 11316–11317 and l. 11384–11390); the absence of a condition table in II.6 against its four citations; the
canonical-prior statements of §2.6, §2.8, §6.2, §7.1 and §7.3 against the "cached state" wording of §4.1, II.4, §8.5 and
J-A28.42; §7.1's and §7.4's stored-plan `relet` rows against §4.11's click-only wording; J-A20.41's "over lapsing at
every epoch" against J-A20.74 and §7.7 rule 3; the two `op: 'silt'` members and §7.1's `siltReach`; the absence of
`reserve.market` and `cut.interior` from §6.1's registry; the absence of `densify` and `thin` from §7.1's edit-target
rows; §10.2's two `DesignationTemplateRow` declarations and its prose-only class-row columns; II.7.4's `('access', id)`
against §2.2 rule 7's `access_point`; the deferral-wording grep (59 "later" / "staged" lines read, none a deferral).

**PLAUSIBLE (judgment, vetoable):** the severity of each issue; the direction of each recommended repair — aligning the
lapse with the home ruling J-A20.74 (VP-06), renaming the water kind rather than the tunnel kind (VP-07), treating rung 2's
back-court split as a legitimate ring change and carving the invariants out (VP-09 – VP-11) rather than moving back
courts to rung 3, the composite re-homing before a court is cleared (VP-08), the area-weighted median as the block-level
floor (VP-25), `fill` and New random as `builtBand` writers (VP-32); and the reading that II.7.3's arena rows are
satisfied by `UndergroundRule` (VP-24). The owner's words are quoted from `docs/AMENDMENTS-2026-09-25b.md`; no reference
code, corpus content or `partitioned/` file was read or used.
