# Rewrite — pipeline part (§4, §10, PART II, PART III)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-pipeline; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/rewrite-pipeline`, 2026-09-29)
- P0 inputs read (canon's pipeline section, its conflicts, wiring rows, E-36, edges and combinations; f items 280–326, 425–446, 539–566, 573–580 and the touching items 202, 205, 213, 259, 271, 369, 389, 575, 582 with every BCR they name; file g whole; OWNER-INSTRUCTIONS, DEFINITION, the delegated decisions): done
- P1 §4 (4.1–4.12, 4.13 new): done — `new/base/pipeline/01-s4-generation-pipeline.md`
- P2 §10: done — `02-s10-simulation-content.md`
- P3 PART II (intro, II.1–II.7): done — `03-part-ii.md` … `10-ii7-sewer-layer.md`
- P4 PART III: done — `11-part-iii.md`
- P5 mapping table, sizes, checks, report, result: done

## 1. Outcome

All eleven top-level sections of the pipeline part are rewritten in `docs/validation/coherence/new/base/pipeline/`
(`01-s4-generation-pipeline.md`, `02-s10-simulation-content.md`, `03-part-ii.md`, `04-ii1-…`, `05-ii2-…`, `06-ii3-…`,
`07-ii4-…`, `08-ii5-…`, `09-ii6-…`, `10-ii7-sewer-layer.md`, `11-part-iii.md`), each starting with its heading line exactly
as today. Every routed f item (112) and every g part routed here (items 102–113, with 111 and 113 written as new design at
build depth) is applied; the 18 routed conflicts are resolved as the canon rules them, and one found in the final check (PART III (5) against §1.1); the 18 routed wiring gaps are wired; E-36
is applied with its equivalence list; the 46 open findings are closed (table §7); every UNDEFINED or UNTESTED edge and every
owned combination routed here has a defined outcome, a ladder rung and a test (the new §4.13 and the homes it cites). **The
shrink goal is not met:** the part grew from 85 919 to 104 572 words (+21.7 %), because it is the home of most of the ruled
additions of files f and g (section 3). No subsection or list number changed; §4.13 is new.

## 2. Sizes (principle (9))

| section | words before | words after | KB before | KB after |
|---|---|---|---|---|
| §4 (4.1–4.12; 4.13 new) | 58 407 | 71 900 | 353 | 434 |
| §10 | 8 236 | 10 599 | 54 | 70 |
| PART II intro | 133 | 147 | 0.8 | 0.9 |
| II.1 | 1 753 | 1 858 | 11.2 | 11.6 |
| II.2 | 739 | 852 | 4.4 | 5.1 |
| II.3 | 308 | 392 | 1.9 | 2.4 |
| II.4 | 578 | 618 | 3.5 | 3.8 |
| II.5 | 405 | 422 | 2.6 | 2.8 |
| II.6 | 2 822 | 2 895 | 17.2 | 17.7 |
| II.7 | 11 334 | 13 822 | 70.7 | 85.7 |
| PART III | 1 204 | 1 067 | 7.4 | 6.6 |
| **total** | **85 919** | **104 572** | **527** | **641** |

**Words removed, by source (estimates, PLAUSIBLE — counted by section, not by a diff tool):** restatement replaced by
references ≈ 2 600 (the canon's 60 reference items, PART III's village detail now V07's, the island rule's supply
definition now V05 §3.3's, §10.2's distribution and identity lists now V11 §3.5 / §3.10's, the neighbourhood request and
result now V01 §2.4's); narration ≈ 350 (the ten narration findings, dated owner parentheses, round talk); duplicated
mechanisms ≈ 150 (E-36's one soft-term contract in place of each owner item restating its contract clauses; one `SewerStrategy`
input list); verbose prose ≈ 900 (the laziness, one-click, decline and underground paragraphs tightened). **Words added**
≈ 22 600: the f items' mechanisms (≈ 11 000: the raised ways, levelling and retaining walls, deck plots, the stage hooks, SKY
and the tail, the phase runner and product call points, the supply web's rows, the custom kinds, the ladders, the ruin and
catacomb rules of the BCRs, the crowding and forecast parts); g items 102–110 applied to the base (≈ 5 800: the daylight term
and its model sampler, the siting rulebook, custom kinds, the supply web, barrier closure, spread and pull, ladders, caverns
and ruins, raised ways, levelling, deck plots); items 111 and 113 as new design (≈ 2 400: the oasis, the water pull and
water term, well yield; history-first generation, the effective peak, refounding, burial, lost access); the edge and
combination tables and the edges written at their homes (≈ 1 900); the wiring links (≈ 500). **Irreducible content holding
the part:** it is the base home of the pipeline stages that files f and g change most; the goal yields to the guard (no rule,
value, case or test was thinned to meet it). A later pass could still tighten verbose prose in §4.2 S3 (12), §4.7's
*Households per building* and §4.11's floor paragraph without loss.

## 3. What changed, by kind

**File f items applied (112):** 280–283 (§4.1: S7c and S9b hooks and the way-surface rule, the underground read-ahead, SKY
with its keys, the village writer order), 284–289 and 580 (§4.2: λ_b, the outline templates, a sky island's crossing sites,
the reservations an institution island leaves, the village block and `Rung`, hinterland land uses as providers, the
terraced-edges column), 290–292 (§4.3: the raised ways' generation, their decline members, village way widths), 293 (§4.4:
the suburb regime in a history), 294–297 (§4.5: S7c's fabric and the capacity net of dispatch land and under-deck strips,
S7b (5) and the landing kernel, the islands in the daylight term with the model sampler, the field's driver decomposition),
298–299 (§4.6: `TemplateFabric`, a landing's attach as an infill destination), 300–311 and 579 (§4.7: S10a's hooks and block
capacities, one square quota, the district-edge retaining walls, S11's massing and holes, attached structures, the deck input
and no cellar on a deck, the light rows' `magic`/`biome` and sky hosts, siting across arenas, levelling as datums with
`levelledGroundCm`, declared splits, the explanation, the village furniture), 312 (§4.8: village towers and stretches),
313–316 (§4.9: the greenery rows, village farm modes, field-system presets, ponds), 317–322, 573–574 (§4.11: the phase
runner with product overrides, a stack's heights under Works, the underground at an epoch, the island laws and the landfall,
Works retirement by span start, a small dossier's product fold, the calamity event, the crowding hook's void part), 323–326
(§4.12: stage hooks, `WorkUnit` 'moduleCells', the tail phase, products in the registry), 425–442 and 576 (§10.2: the
custom kinds without `fallbackClass`, the composition keys and heights row, the plan tables, the use step's years and
strain, the village form, the class row's profile and columns, derived rows and coverage, the goods columns, the declared row
types and settings, the crypt column, relative up/downstream, district-kind affinity, `definedBy`, soft-not-hard, distribution,
quarter identities, presence and the village government step), 443 (§10.3: lifespans and entry ages), 444–446 (§10.4: local
names, naming slices, folk contraction), 539–541 (II.1: the request and result as V01's, `Sample`, `marsh` seams and barrier
typing), 542–543 (II.2: the carved square default, the ring growth factor), 544 (II.3), 545 (II.4), 546–547 (II.6: the island
rule's supplies and `IslandRule` as V05's, the magical node), 548–550 (II.7.1: culverts, the TOWN toggle's locality, sewers
re-resolved per epoch), 551–553 (II.7.3: the forecast, the conditional surface rule, the cellar trades), 554–557 (II.7.4: the
public openings, an access's host-driven state, extension shares, an access's cause), 558 (II.7.5: a ruin under the
historical preset), 559–566 (II.7.6: vaults and arch vaults, the catacomb's entrance and sources, dug passages at
generation, the access pass and connection interfaces, the ruin's depth band, caverns and ruins below TOWN, crypts not
catacombs), 577 (PART III: village classes as `v.` rows). Touching items: 202 (the product registration, the call points of
§4.11's order, PART III's lines), 205 (S1 (9)'s outfalls), 213 (§10.2's sky rows), 259 (the culture specialisation at S11),
271 (the placement order record), 369 (II.4's seam exception with surface and naming records), 389 (the port values in force),
575 (the enceinte's condition read by §4.11's wall ladder), 582 (S10b's reconcile: F-EDIT only for an assignment or a
`rejectSite` re-placement; positive placements and occupied joins bend).

**File g parts applied:** 102 (§4.5's daylight term, its order and casters, the model sampler; §4.7's sunlit-side prestige
term; II.6's shade strip; §4.11's drift over epochs), 103 (§10.2's siting profile, families, pairs, coverage; S10b reads
them), 104 (§10.2's resolution order and rows; S10b's custom chains incl. (h)), 105 (§10.2's goods table, orientation, split;
§4.7's links, two-way pull, order, relaxation, split sites; S7b (1)'s supply term), 106 (§4.4 S5a's barrier closure and reach;
§4.2 S3 (9)'s pointer; §4.8's graded stretches, anchor towers, harbour-mouth chain; §4.9's intramural gardens), 107 (§10.2's
balance, `comfortM`, spacing; §4.7's spread and pull; S7b (1)), 108 (§10.2's step table; §4.2 S2's members; §4.5's QUARTER
records), 109 (§4.2 S1's relief rows and mining; II.7.6's caverns, fissures, mine breaches, the ruin system and its links;
II.7.5's ruin source rank; II.7.3's basement access over ruins), 110 (§4.3 raised ways; §4.6 stairs and ramps; §4.7
levelling, retaining walls, deck plots), 111 **new design** (§4.2 S0 oasis toggle and arid chances, S1 (2) the oasis, S1 (10)
well yield, S3 (6) the water pull on `T`, S3 (1) the centre's water term; §4.4 the pull through every stage's boundary; §4.5
the water term and the climate sunlight cell; §4.7 wells and fountains by yield and arid coverage; §4.9 the grove and
irrigated gardens; II.6 no oasis on an island), 112 (no part routed here), 113 **new design** (§4.2 S0's `history` option;
§4.11 *History-first generation* (1)–(7): the peak and the effective symbolic peak, the replay as coarse epochs meeting the
present facts, the result, destruction and refounding with road reuse and salvage, burial past `history.burialYears`,
sewers reopening, edges and the no-op pin; II.7.6's buried former settlement and lost access).

**Conflicts resolved (18 routed + 1 found):** DXC-05 and W-SET-01 (`crossing.searchBandM` cited as a V11 settings cell, no value), DXC-06 and
KXC-02 (the class floors' one home in §4.7 S10), SCOPE-C01 (the dossier-below-1 500 refusal holds only while no village
product is registered; §4.11, PART III (5)), SCOPE-C06 (no base question put to the owner remains in this part),
CF-PIPE-01 (a shack's Works is the hovel-or-shed row, a tent the zero-week row), CF-PIPE-02 (the undercity lead sentence),
CF-PIPE-03 (the faction influence field feeds only the module's queries and the grammar; the dials need no module),
CF-PIPE-04 (the module's day schedule; "no second calendar of weeks and seasons"), CF-PIPE-05 ("falls below the CITY band (to
TOWN or a village rung)"), CF-PIPE-06 (which districts S12c covers), CF-PIPE-07 (S7b (6) sends underground-mode clandestine
institutions to (7) where an undercity is predicted), CF-PIPE-08 (fire is an event with a drawn state; `clear` has its stages
row; the table's first column is `WorksRow.kind`), CF-PIPE-09 (§4.5 (3) cites V11 §3.5's singular rows), CF-PIPE-10 (walls,
toll houses and the customs house taxes and tolls 1.0), CF-PIPE-11 (S7b's execution order stated at its head, numbers kept),
CF-PIPE-12 (§10.4's stage words the one list), CF-PIPE-13 (the quarry area's units). **Found in the final check (19th):** PART III (5)'s THORP "≈ 20–80" contradicted
§1.1's rewritten rows and V07's J-V7.1 (THORP [1, 80)); PART III (5) now states §1.1's bands (PIPELINE-0799 kept at its home
with them, since it also carries the 1 500 routing and VG's span).

**Wiring gaps closed (18 routed, and the two accounted ones):** W-DOS-03 and WG-PIPE-01 (`foodChain` read by §4.9's farm
table; `customKinds` read by item 104's resolution, §4.5 (1)'s significance and S10b's chain links; §10.2's port-rows bullet
names every reader), W-DOS-04 (`Religion.deities`, `practiceShare`, `clergyPerThousand` written by S2 from the dossier's deity
or the row's pantheon and the row; read by §10.4's dedication), W-IF-07 (door 4's `ContentProvider` call points named at S2,
S10b and §10.3, a fixture provider in §13.2), W-FLD-03 (`Reservation.compactnessMin` read by S3 (8) and §4.8), W-FLD-07
(`Intent.wealthGradientCdeg` a field driver, weight 0.15), W-FLD-09 (`District.venueMix` written by S12c and the character
step; readers named), WG-PIPE-02 (S1 (9)'s readers named), WG-PIPE-03 (need propagation reads `substitutes`), WG-PIPE-04
(folk contraction is an epoch's naming-record update on `naming.folk`, no event kind), WG-PIPE-05 (signatures for
`TerrainStrategy`, `CoastStrategy`, `RiverStrategy`, `ManifestStrategy`, `PlotStrategy`, `SitePlanStrategy` in §4.12; the
village registers a `ProductDecl`), WG-PIPE-06 (`householdsPerFarmstead` read by S2), WG-PIPE-07 (`Features.sewers` in II.6's
one input list), WG-PIPE-08 (re-derive people is a `regenerate` of scope `people`, §7.5's pattern), WG-PIPE-09 (deaths and
successions derived, never stored, BCR-V6-10), WG-PIPE-10 (the D-32 stubs wired by `@plat/sim` at M4b, stated), WG-PIPE-11
(cottage `wealthShift` −0.2; lean-to shelter significance 0.05), WG-PIPE-12 (`DataKey`, `WaterSet`, `Destination`,
`GateSite`, `StageReport`, `EditRef`, `RuleRef`, `FabricStrategyId`, `Sample`, `NamePack` declared; `DistrictContext` and
`TypedBoundary` V01 §2.4's; `GrammarDef`, `TemplateDef` V11 §2.8's; `IslandInstitution` V05 §2.4's; `RosterTableId` the union
of `RosterTables`' fields), RWG-07 (`live.people` registered by the module through `LiveLayerProvider`).

**Elegance — E-36, applied (one soft-term contract at §4.5, cited by §4.7 S10b and S3 (6)); equivalence list:**
- [x] item 102: about a tenth of a band at full all-day shade; never alone across two bands; terrain and wall shade in pass 1,
  island shade in pass 2; the supply law reads the field before the island term — §4.5's soft-term table, daylight row.
- [x] item 103 (c): true physical needs stay hard — the table's siting row and §4.7 S10b's *Hard rows filter* bullet.
- [x] item 103 (f): coverage decides where, never how many; the dossier's count is the truth — the table's coverage row and
  §4.7 S10b *Spread and pull*; §10.2's roster sentence (a weighted option, never a minimum).
- [x] item 105: every link pulls both ends — the table's supply-links row and §4.7 S10b *Supply links*.
- [x] item 107: spread and pull in balance with the `distribution` column — the table's spread-and-pull row and §4.7 S10b.
- [x] item 111 (b): the water pull's weight rises with aridity — the table's water row, S3 (6); (c) the sunlight cell per climate
  row — the daylight row and *The daylight term*'s climate cell.
- [x] The contract's shared clauses stated once: a weight cell (a §7.6 value), a kernel, a bar (§13.2), a no-op pin at weight
  0, summed with the chance, never iterated, yielding to dossier facts, assignments, pins, locks and declarations.

**Id ruling ID-ITEM:** bare "item N" is an owner or amendment item; §4.5's item-72 paragraphs are cited "§4.5 (n)"; §7.3 and
§7.7 paragraphs "§7.3 item n", "§7.7 item n". **Terms replaced:** G-lot (the remaining hits are inside owner quotations or
name MFCG's own term, "its lots being plots in our sense"), G-firstmap, G-shadows (none left), G-strike (the strike pool, V06
§3.5.2), G-newrandom, G-fallbackclass, G-JT; G-cite (V01 §3.7.1 form throughout); G-unitinput (`SkyUnitInput`); G-stairway
(stair-stepped way; the template row keeps `stepped`). **Renumbering:** none of an existing number; §4.13 is new; S7b's steps
keep their numbers with their execution order stated at the head; the edge rows EP-01 – EP-19 are new ids; PART III's hooks keep their numbers 1–5 (V07 and §2.5 cite "PART III (4)" and "PART III (5)"), the rung-row baselines, the underground below TOWN and the dossier below the floor staying unnumbered paragraphs as before.

## 4. Decisions taken here (J122 delegation; vetoable)

- The wealth-gradient driver `drivers.wealthGradient` 0.15 (0 without a bearing and in the parity presets) — W-FLD-07.
- Class-mix `wealthShift` cottage −0.2; lean-to shelter significance 0.05; `ClassMixRow.sun` 0.3 (item 102 (d)) — WG-PIPE-11.
- No deck plots on a gate's moat deck (realism tiebreaker: the gate's approach stays clear) — the owner's named combination
  "a deck plot on a bridge over a moat", narrowed.
- A raised part excludes the harbour basin and its mouth (masts must pass); a stroke across it bends to its last ground vertex;
  no support on a square, a reservation or an oasis's water; a river spanned within `viaduct.maxSpanM` — the owner's named
  combination "a raised way over a harbour mouth".
- No retaining wall on a cliff bank or a `cliff`/`sheer` closure arc — the owner's named combination "a retaining wall on a
  cliff edge".
- A skeleton declaration a stage cannot honour is bent (item 101 R2; J-VI.4), refused only for a dossier fact or a lock (§4.1).
- A hinterland with no land: outside classes to F-SITING, farm households housed as under `perimeter`, the demand an import.
- The oasis is sited on the best hollow or fault line in the frame's middle two thirds, the lowest ground there when none.
- A catacomb source's age at generation follows the history-scaled stage count (EDGE-PIPE-04); the basement-access age term
  is 1 when K = 1 (EDGE-PIPE-01); the underground institution depth is `institutionDepthM` 8–15 m (EDGE-PIPE-08); the underground
  light fuel is the era row's rows plus magic rows where admitted (EDGE-PIPE-05); the island count is
  `recipe.params['islands.count']` with `SkyIsland.slot` (EDGE-PIPE-06); the ring factor lies in [1, 2] (EDGE-PIPE-07).

## 5. Edges (principle (11))

The general rule sits in §4.1's transactions table (a failure class per stage); §4.13 lists EP-01 – EP-19 for the edge suite
(B-EDGE) and the combination table (feature × raised way, retaining wall, deck plot, frame). Mapping of the catalogue's
rows: M-pipeline-3689-E4 → EP-01; 3864-E2, 3864-E6 → EP-02; 4072-E4, 4290-E4, 4383-E4, 4677-E4, 5122-E4, 5224-E4, 5713-E4,
5812-E4, 6000-E4, 15644-E4, 15698-E4, 15868-E4 → EP-01 with the stage's class; 4284-E5 → EP-03; 4290-E6 → §4.3 (router rung
gate; VS4) and EP-02; 4442-E1, 4456-E1 → EP-04; 4498-E4 → EP-05; 5130-E1/E2/E6 → EP-08; 5224-E1 → EP-09; 5306-E6 → EP-10;
5916-E4, 5916-E8 → EP-12; 5982-E1, 5982-E2 → EP-13; 11467-E4, 11467-E8, 11741-E6, 11822-E1, 11822-E4 → EP-18 (§10.2 *Rows at
their limits*, §10.3's every-rung sentence, §10.4's fallbacks); every II.7 row (15596-*, 15644-*, 15698-*, 15868-*, 15907-*)
→ EP-19 (II.7.2's degenerate and outfall sentences, II.7.4 *Limits*, the rest at their rules); EI-EDGE-PIPE-01 … 08 → §4.13
EP-16 / EP-17 and II.7.3, II.7.6, II.6 as section 4 lists. The 39 owned combinations (C-cliff-*, C-steep-*, C-river-*,
C-coast-*, C-harbour-*, C-wall-*, C-moat-*, C-bridge-*, C-raised-*, C-retaining-*, C-deckplot-*, C-hinterland-frame,
C-oasis-frame) are the cells of §4.13's combination table.

## 6. Cross-part notes (what another unit must change; not edited here)

- **model §2.3:** declare `Terrain.mining` (item 109 (a) (2); written by S1 (10), read by II.7.6), `WaterBody.spring` (item 111;
  S1 (2), T2's spring flag; read by S12b's grove, S12a's gardens, S3 (6)), a well-yield raster in `SiteResources` (S1 (10);
  read by S3 (6), §4.5, S10b), with their lifecycle rows.
- **model §2.5:** `Plot.platformCm`, `Block.platformCm` (item 110 (a) datums, S10/S11; read by `levelledGroundCm`);
  `Reservation.compactnessMin` reader S3 (8); `District.venueMix` producer S12c; `ContextVector.dist` at village rungs
  (BCR-V7-36 (b)).
- **model §2.4:** `Way.slopeP95` written by S9; `Way.surface` by the way-surface rule at S10a's end.
- **model §2.6:** `BuildingInput`'s `compositionRow`, `bands`, `layer`, `attached`, `deck` (BCR-V2-24/29/34), caller §4.7 S11.
- **model §2.7/§2.8:** `HistoryHint` gains the peak (`peakTier` or high-water population, the symbolic flag), the founding,
  destruction and resettlement, and the evidence §4.11 (1) lists (tierHistory, populationHistory, calamityHistory); provenance
  `symbolic` on a derived fact (§2.8); `Blueprint.history?: HistoryHint`, `Blueprint.village?`, `size.rung: Rung` (the Blueprint
  type stays declared at §4.2 S0, its only statement — canon's PIPELINE-0039 home §2.9 holds none); `Person.key.bornWeek`,
  `AncestryRow.lifespan`/`entryAge`; `Use.strain`; `Religion`'s three fields' producer S2; `garden_irrigated` land-use kind;
  `SkyIsland.slot` read by II.6 (7).
- **kernel §3.2 (2), §3.10:** cite §4.7 S10's class floors without values (DXC-06, KXC-02).
- **determinism §5.2, §5.3:** F-PLOT, F-CORRIDOR and the class-floor row cite §4.7 S10; S6 and S12b have no class of their own
  (a degenerate district face merges, a refused layout is left out, §4.1's table); §5.3's concealment check rows are listed at
  §4.7 (PIPELINE-0378 had no statement in §5.3). §5.1: `WorkUnit` gains `'moduleCells'` (item 324; the union lives there).
- **determinism §7.1/§7.4:** T2 `ground`'s lake form with a spring flag (item 111) with its §7.4 row and undo; a `regenerate`
  scope `people` for "re-derive people" (WG-PIPE-08); §7.7: DR14 lists `religion.deityName`; the DR rows for item 113 (DR36
  onward) and for `oasis_water`; the history replay's epochs as the creation prefix (§7.4).
- **scope §1:** "What the base supports (COV-MFCG-Q01)" stays at §4.2 S0 (canon PIPELINE-0046 home §1 holds none).
- **scope §13.2:** add the edge suite B-EDGE (one fixture per §4.13 row, EP-01 – EP-19 and the combination cells, hard, 0 per
  1 000); a fixture `ContentProvider` for door 4's call points (W-IF-07); item 111's and 113's bars as the canon lists; T66's
  over-long dug route case (EDGE-PIPE-02).
- **scope §13.5:** its wealth-bands row points to §4.5 for the MFCG ward-class shares and receipt — they stay in §4.5 (canon's
  PIPELINE-0200 reference to §13.5 would have lost them).
- **scope §14:** `StrategyRegistry.hooks`, `products`; `AccessPassStrategy` in the `underground` map; `@plat/evolve` (BCR-V6-1
  (b)).
- **rendering §8.2/§8.4:** the shade map view, the oasis's grove and gardens, the ruin style, stairs and ramps as way
  attributes; §8.4's `sunPath` reused as the model sampler (item 102; BCR-V5-15's §8.4 sentence).
- **V11:** cells named here — `crossing.searchBandM` (settings row), the climate rows' arid chances, `oasisChance`, the
  no-other-water factor, oasis area band, the water-pull weight and radius, `w_waterP`, the sunlight cell, the coverage
  factor and well-yield weight for wells, `prestige.sun` (`ClassMixRow.sun`), `drivers.wealthGradient`, `history.replay`,
  `history.epochYears`, `history.symbolicQuantile`, `history.burialYears` (with its flood, silt and rock factors),
  `history.reuseCost`, the event-to-epoch rows, `under.rule`'s `access.ruinGain`, `UndercityRule.sourceRank`, the cavern
  `mineBoost`/fissure/`breachM` cells.
- **V05:** `SkyStrategy.place` returns `unitInputs: SkyUnitInput[]` (G-unitinput) where V05 §2.3 still says `handovers`.
- **V07:** PART III's hooks name `ProductDecl` (item 202); V07 §3.4 states the palisade but not its provenance (MN-4,
  COV-VG-VN-003, D5, N2 / P1), and no V07 section states hook (4)'s containment argument, so PART III (2) and (4) keep them
  (PIPELINE-0796, 0798); V07 §3.7 and the model's `village` district kind keep citing "PART III (4)", §2.5's `RungProfile`
  "PART III (5)" — both numbers kept.

## 7. Open findings routed here — every one closed

| finding | closed by |
|---|---|
| CF-PIPE-01 … CF-PIPE-13 | the conflict rulings, section 3 |
| EDGE-PIPE-01 | II.7.3 *Basement accesses* (2): `age = (K − k) ÷ (K − 1)`, 1 when K = 1 |
| EDGE-PIPE-02 | II.7.6 step 3 names §13.2's T66 case (cross-note to scope) |
| EDGE-PIPE-03 | §4.5's item-72 paragraph, *Which districts*; EP-17 |
| EDGE-PIPE-04 | II.7.6 *Catacombs*: a source's age is its own, history-scaled |
| EDGE-PIPE-05 | II.7.3 and II.7.5 light: the era row's fuel rows, magic rows where admitted |
| EDGE-PIPE-06 | II.6 (4), (7): `recipe.params['islands.count']`, `SkyIsland.slot` |
| EDGE-PIPE-07 | II.2 and §4.6 step 1: the factor in [1, 2], 2 only when every uniform is 0 |
| EDGE-PIPE-08 | II.7.3: `institutionDepthM` 8–15 m on the underground arena |
| WG-PIPE-01 … WG-PIPE-12 | the wiring list, section 3 |
| PIPELINE-NARRATION-001 … 010 | removed (the validation records keep them) |
| BR-PIPE-01 | §4.11's trigger rows: "*The clock*, above" |
| BR-PIPE-02 | II.1 rule (5): no `reason` on the request; the island's reason is `SkyIsland.reason` (BCR-2 (d)) |
| BR-PIPE-03 | §10.4: folk contraction an epoch's naming-record update, no event kind (with WG-PIPE-04) |

## 8. Checks run (CONFIRMED)

A token check over the canon's inventory (806 items): every number, id, J-/D-/T-/COV- reference and backticked identifier of
every item's statement appears in the new text, except `J-T` (renamed JT by ID-JT) and J-P16 (removed as narration,
NARRATION-010) — CONFIRMED by script. A numeric-token check of the whole part found 7 tokens of the original absent: the MFCG
ward-class shares (restored to §4.5), VG's palisade provenance and D-33 (restored to PART III), line-break artefacts — CONFIRMED
after the restorations. Retired terms and narration phrases grepped to zero outside owner quotations — CONFIRMED. That every
prose-only fact without a token survived is PLAUSIBLE (the rewrite kept the original sentences wherever it did not apply a
ruled change); the verifiers' archive check is the proof.

## 9. Mapping table — every inventory id of the part → its new home

The subsection numbering is unchanged, so an item's new home is the subsection that held it; a `reference` row names where it
now points; seven references stay at their home because the named home holds no statement of them (PIPELINE-0039, 0046, 0200, 0378, 0796, 0798, 0799; section 6 names the unit to change).

| inventory id | kind | role | new home |
|---|---|---|---|
| PIPELINE-0001 | rule | home | §4 intro |
| PIPELINE-0002 | mechanism | home | §4.1 |
| PIPELINE-0003 | rule | home | §4.1 |
| PIPELINE-0004 | rule | home | §4.1 |
| PIPELINE-0005 | rule | home | §4.1 |
| PIPELINE-0006 | rule | home | §4.1 |
| PIPELINE-0007 | rule | home | §4.1 |
| PIPELINE-0008 | rule | home | §4.1 |
| PIPELINE-0009 | rule | home | §4.1 |
| PIPELINE-0010 | rule | home | §4.1 |
| PIPELINE-0011 | rule | home | §4.1 |
| PIPELINE-0012 | rule | home | §4.1 |
| PIPELINE-0013 | rule | home | §4.1 |
| PIPELINE-0014 | rule | home | §4.1 |
| PIPELINE-0015 | rule | home | §4.1 |
| PIPELINE-0016 | rule | home | §4.1 |
| PIPELINE-0017 | rule | home | §4.1 |
| PIPELINE-0018 | rule | home | §4.1 |
| PIPELINE-0019 | rule | reference | referenced from §4.1 to rendering §12.5 |
| PIPELINE-0020 | table | home | §4.1 |
| PIPELINE-0021 | rule | reference | referenced from §4.1 to model §2.6 |
| PIPELINE-0022 | rule | home | §4.1 |
| PIPELINE-0023 | rule | reference | referenced from §4.1 to kernel §3.3 |
| PIPELINE-0024 | mechanism | home | §4.1 |
| PIPELINE-0025 | number | home | §4.1 |
| PIPELINE-0026 | rule | reference | referenced from §4.1 to determinism §6.3 |
| PIPELINE-0027 | mechanism | home | §4.1 |
| PIPELINE-0028 | rule | reference | referenced from §4.1 to model §2.9 |
| PIPELINE-0029 | rule | reference | referenced from §4.1 to rendering §12.3 |
| PIPELINE-0030 | rule | reference | referenced from §4.1 to determinism §7.6 |
| PIPELINE-0031 | rule | home | §4.1 |
| PIPELINE-0032 | mechanism | home | §4.1 |
| PIPELINE-0033 | rule | home | §4.1 |
| PIPELINE-0034 | rule | reference | referenced from §4.1 to model §2.8 |
| PIPELINE-0035 | rule | home | §4.1 |
| PIPELINE-0036 | mechanism | home | §4.1 |
| PIPELINE-0037 | table | home | §4.1 |
| PIPELINE-0038 | rule | reference | referenced from §4.1 to determinism §7.4 |
| PIPELINE-0039 | type | reference | §4.2 (kept at its home: the named home holds no statement of it; see cross-part notes) |
| PIPELINE-0040 | rule | home | §4.2 |
| PIPELINE-0041 | rule | home | §4.2 |
| PIPELINE-0042 | rule | home | §4.2 |
| PIPELINE-0043 | rule | reference | referenced from §4.2 to rendering §8.4 |
| PIPELINE-0044 | rule | reference | referenced from §4.2 to determinism §7.7 |
| PIPELINE-0045 | mechanism | home | §4.2 |
| PIPELINE-0046 | rule | reference | §4.2 (kept at its home: the named home holds no statement of it; see cross-part notes) |
| PIPELINE-0047 | mechanism | home | §4.2 |
| PIPELINE-0048 | number | home | §4.2 |
| PIPELINE-0049 | mechanism | home | §4.2 |
| PIPELINE-0050 | rule | home | §4.2 |
| PIPELINE-0051 | rule | home | §4.2 |
| PIPELINE-0052 | mechanism | home | §4.2 |
| PIPELINE-0053 | table | home | §4.2 |
| PIPELINE-0054 | mechanism | home | §4.2 |
| PIPELINE-0055 | mechanism | home | §4.2 |
| PIPELINE-0056 | number | home | §4.2 |
| PIPELINE-0057 | rule | home | §4.2 |
| PIPELINE-0058 | mechanism | home | §4.2 |
| PIPELINE-0059 | rule | home | §4.2 |
| PIPELINE-0060 | mechanism | home | §4.2 |
| PIPELINE-0061 | rule | home | §4.2 |
| PIPELINE-0062 | rule | home | §4.2 |
| PIPELINE-0063 | rule | home | §4.2 |
| PIPELINE-0064 | rule | home | §4.2 |
| PIPELINE-0065 | rule | home | §4.2 |
| PIPELINE-0066 | rule | home | §4.2 |
| PIPELINE-0067 | rule | home | §4.2 |
| PIPELINE-0068 | table | home | §4.2 |
| PIPELINE-0069 | rule | home | §4.2 |
| PIPELINE-0070 | mechanism | home | §4.2 |
| PIPELINE-0071 | rule | home | §4.2 |
| PIPELINE-0072 | rule | reference | referenced from §4.2 to determinism §5.2 |
| PIPELINE-0073 | mechanism | home | §4.2 |
| PIPELINE-0074 | rule | home | §4.2 |
| PIPELINE-0075 | rule | home | §4.2 |
| PIPELINE-0076 | rule | home | §4.2 |
| PIPELINE-0077 | rule | home | §4.2 |
| PIPELINE-0078 | rule | home | §4.2 |
| PIPELINE-0079 | number | home | §4.2 |
| PIPELINE-0080 | rule | home | §4.2 |
| PIPELINE-0081 | table | home | §4.2 |
| PIPELINE-0082 | number | home | §4.2 |
| PIPELINE-0083 | rule | home | §4.2 |
| PIPELINE-0084 | type | home | §4.2 |
| PIPELINE-0085 | mechanism | home | §4.2 |
| PIPELINE-0086 | number | home | §4.2 |
| PIPELINE-0087 | rule | home | §4.2 |
| PIPELINE-0088 | mechanism | home | §4.2 |
| PIPELINE-0089 | rule | home | §4.2 |
| PIPELINE-0090 | rule | home | §4.2 |
| PIPELINE-0091 | number | home | §4.2 |
| PIPELINE-0092 | number | home | §4.2 |
| PIPELINE-0093 | rule | home | §4.2 |
| PIPELINE-0094 | rule | home | §4.2 |
| PIPELINE-0095 | rule | home | §4.2 |
| PIPELINE-0096 | number | home | §4.2 |
| PIPELINE-0097 | rule | home | §4.2 |
| PIPELINE-0098 | mechanism | home | §4.2 |
| PIPELINE-0099 | rule | home | §4.2 |
| PIPELINE-0100 | rule | home | §4.2 |
| PIPELINE-0101 | test | home | §4.2 |
| PIPELINE-0102 | rule | home | §4.2 |
| PIPELINE-0103 | mechanism | home | §4.2 |
| PIPELINE-0104 | mechanism | home | §4.2 |
| PIPELINE-0105 | rule | home | §4.2 |
| PIPELINE-0106 | rule | home | §4.2 |
| PIPELINE-0107 | rule | home | §4.2 |
| PIPELINE-0108 | rule | home | §4.2 |
| PIPELINE-0109 | rule | home | §4.2 |
| PIPELINE-0110 | rule | home | §4.2 |
| PIPELINE-0111 | rule | home | §4.2 |
| PIPELINE-0112 | test | home | §4.2 |
| PIPELINE-0113 | rule | home | §4.2 |
| PIPELINE-0114 | rule | home | §4.2 |
| PIPELINE-0115 | rule | home | §4.2 |
| PIPELINE-0116 | rule | home | §4.2 |
| PIPELINE-0117 | rule | home | §4.2 |
| PIPELINE-0118 | mechanism | home | §4.2 |
| PIPELINE-0119 | mechanism | home | §4.2 |
| PIPELINE-0120 | table | home | §4.2 |
| PIPELINE-0121 | number | home | §4.2 |
| PIPELINE-0122 | rule | home | §4.2 |
| PIPELINE-0123 | rule | home | §4.2 |
| PIPELINE-0124 | rule | home | §4.2 |
| PIPELINE-0125 | rule | home | §4.2 |
| PIPELINE-0126 | rule | home | §4.2 |
| PIPELINE-0127 | rule | home | §4.2 |
| PIPELINE-0128 | rule | home | §4.2 |
| PIPELINE-0129 | mechanism | home | §4.3 |
| PIPELINE-0130 | rule | home | §4.3 |
| PIPELINE-0131 | rule | home | §4.3 |
| PIPELINE-0132 | rule | home | §4.3 |
| PIPELINE-0133 | rule | home | §4.3 |
| PIPELINE-0134 | rule | home | §4.3 |
| PIPELINE-0135 | mechanism | home | §4.3 |
| PIPELINE-0136 | rule | home | §4.3 |
| PIPELINE-0137 | rule | home | §4.3 |
| PIPELINE-0138 | rule | home | §4.3 |
| PIPELINE-0139 | test | home | §4.3 |
| PIPELINE-0140 | rule | home | §4.3 |
| PIPELINE-0141 | rule | home | §4.3 |
| PIPELINE-0142 | mechanism | home | §4.3 |
| PIPELINE-0143 | interface | home | §4.3 |
| PIPELINE-0144 | rule | home | §4.3 |
| PIPELINE-0145 | rule | home | §4.3 |
| PIPELINE-0146 | rule | home | §4.3 |
| PIPELINE-0147 | mechanism | home | §4.3 |
| PIPELINE-0148 | rule | home | §4.4 |
| PIPELINE-0149 | mechanism | home | §4.4 |
| PIPELINE-0150 | table | home | §4.4 |
| PIPELINE-0151 | rule | home | §4.4 |
| PIPELINE-0152 | rule | home | §4.4 |
| PIPELINE-0153 | mechanism | home | §4.4 |
| PIPELINE-0154 | rule | home | §4.4 |
| PIPELINE-0155 | rule | home | §4.4 |
| PIPELINE-0156 | rule | home | §4.4 |
| PIPELINE-0157 | table | home | §4.4 |
| PIPELINE-0158 | rule | home | §4.4 |
| PIPELINE-0159 | rule | home | §4.4 |
| PIPELINE-0160 | mechanism | home | §4.4 |
| PIPELINE-0161 | rule | home | §4.4 |
| PIPELINE-0162 | test | home | §4.4 |
| PIPELINE-0163 | mechanism | home | §4.4 |
| PIPELINE-0164 | rule | home | §4.4 |
| PIPELINE-0165 | mechanism | home | §4.4 |
| PIPELINE-0166 | rule | home | §4.4 |
| PIPELINE-0167 | rule | home | §4.4 |
| PIPELINE-0168 | rule | home | §4.4 |
| PIPELINE-0169 | rule | home | §4.4 |
| PIPELINE-0170 | rule | home | §4.4 |
| PIPELINE-0171 | table | home | §4.4 |
| PIPELINE-0172 | rule | home | §4.4 |
| PIPELINE-0173 | mechanism | home | §4.4 |
| PIPELINE-0174 | test | reference | referenced from §4.4 to scope §13.2 |
| PIPELINE-0175 | table | home | §4.4 |
| PIPELINE-0176 | decision | home | §4.4 |
| PIPELINE-0177 | test | home | §4.4 |
| PIPELINE-0178 | number | home | §4.4 |
| PIPELINE-0179 | rule | home | §4.4 |
| PIPELINE-0180 | rule | home | §4.4 |
| PIPELINE-0181 | rule | home | §4.5 |
| PIPELINE-0182 | rule | home | §4.5 |
| PIPELINE-0183 | rule | reference | referenced from §4.5 to determinism §7.3 |
| PIPELINE-0184 | mechanism | home | §4.5 |
| PIPELINE-0185 | rule | home | §4.5 |
| PIPELINE-0186 | rule | home | §4.5 |
| PIPELINE-0187 | rule | home | §4.5 |
| PIPELINE-0188 | number | home | §4.5 |
| PIPELINE-0189 | rule | reference | referenced from §4.5 to model §2.5 |
| PIPELINE-0190 | mechanism | home | §4.5 |
| PIPELINE-0191 | number | home | §4.5 |
| PIPELINE-0192 | mechanism | home | §4.5 |
| PIPELINE-0193 | rule | home | §4.5 |
| PIPELINE-0194 | rule | home | §4.5 |
| PIPELINE-0195 | rule | home | §4.5 |
| PIPELINE-0196 | rule | home | §4.5 |
| PIPELINE-0197 | mechanism | home | §4.5 |
| PIPELINE-0198 | mechanism | home | §4.5 |
| PIPELINE-0199 | table | home | §4.5 |
| PIPELINE-0200 | rule | reference | §4.5 (kept at its home: the named home holds no statement of it; see cross-part notes) |
| PIPELINE-0201 | rule | home | §4.5 |
| PIPELINE-0202 | rule | home | §4.5 |
| PIPELINE-0203 | rule | home | §4.5 |
| PIPELINE-0204 | rule | home | §4.5 |
| PIPELINE-0205 | rule | home | §4.5 |
| PIPELINE-0206 | rule | home | §4.5 |
| PIPELINE-0207 | rule | home | §4.5 |
| PIPELINE-0208 | rule | home | §4.5 |
| PIPELINE-0209 | mechanism | home | §4.5 |
| PIPELINE-0210 | rule | home | §4.5 |
| PIPELINE-0211 | rule | home | §4.5 |
| PIPELINE-0212 | rule | home | §4.5 |
| PIPELINE-0213 | test | home | §4.5 |
| PIPELINE-0214 | rule | home | §4.5 |
| PIPELINE-0215 | rule | home | §4.5 |
| PIPELINE-0216 | rule | home | §4.5 |
| PIPELINE-0217 | rule | home | §4.5 |
| PIPELINE-0218 | rule | home | §4.5 |
| PIPELINE-0219 | rule | home | §4.5 |
| PIPELINE-0220 | rule | home | §4.5 |
| PIPELINE-0221 | rule | home | §4.5 |
| PIPELINE-0222 | rule | home | §4.5 |
| PIPELINE-0223 | mechanism | home | §4.5 |
| PIPELINE-0224 | rule | home | §4.5 |
| PIPELINE-0225 | rule | home | §4.5 |
| PIPELINE-0226 | rule | home | §4.5 |
| PIPELINE-0227 | rule | home | §4.5 |
| PIPELINE-0228 | rule | home | §4.5 |
| PIPELINE-0229 | rule | home | §4.5 |
| PIPELINE-0230 | rule | home | §4.5 |
| PIPELINE-0231 | rule | home | §4.5 |
| PIPELINE-0232 | rule | home | §4.5 |
| PIPELINE-0233 | rule | home | §4.5 |
| PIPELINE-0234 | mechanism | home | §4.5 |
| PIPELINE-0235 | rule | home | §4.5 |
| PIPELINE-0236 | rule | home | §4.5 |
| PIPELINE-0237 | rule | home | §4.5 |
| PIPELINE-0238 | rule | home | §4.5 |
| PIPELINE-0239 | rule | home | §4.5 |
| PIPELINE-0240 | rule | home | §4.5 |
| PIPELINE-0241 | rule | home | §4.5 |
| PIPELINE-0242 | rule | home | §4.5 |
| PIPELINE-0243 | rule | home | §4.5 |
| PIPELINE-0244 | rule | home | §4.5 |
| PIPELINE-0245 | rule | home | §4.5 |
| PIPELINE-0246 | number | home | §4.5 |
| PIPELINE-0247 | rule | home | §4.5 |
| PIPELINE-0248 | rule | home | §4.5 |
| PIPELINE-0249 | rule | home | §4.5 |
| PIPELINE-0250 | rule | home | §4.5 |
| PIPELINE-0251 | rule | home | §4.6 |
| PIPELINE-0252 | rule | home | §4.6 |
| PIPELINE-0253 | rule | home | §4.6 |
| PIPELINE-0254 | test | home | §4.6 |
| PIPELINE-0255 | rule | home | §4.6 |
| PIPELINE-0256 | mechanism | home | §4.6 |
| PIPELINE-0257 | rule | home | §4.6 |
| PIPELINE-0258 | number | home | §4.6 |
| PIPELINE-0259 | rule | home | §4.6 |
| PIPELINE-0260 | rule | home | §4.6 |
| PIPELINE-0261 | rule | home | §4.6 |
| PIPELINE-0262 | rule | home | §4.6 (J-P16 mention removed as narration, NARRATION-010) |
| PIPELINE-0263 | rule | home | §4.6 |
| PIPELINE-0264 | test | reference | referenced from §4.6 to scope §16 |
| PIPELINE-0265 | table | home | §4.6 |
| PIPELINE-0266 | rule | home | §4.6 |
| PIPELINE-0267 | rule | home | §4.6 |
| PIPELINE-0268 | rule | home | §4.6 |
| PIPELINE-0269 | rule | home | §4.6 |
| PIPELINE-0270 | rule | reference | referenced from §4.6 to determinism §7.3 |
| PIPELINE-0271 | rule | home | §4.6 |
| PIPELINE-0272 | rule | home | §4.6 |
| PIPELINE-0273 | test | home | §4.6 |
| PIPELINE-0274 | rule | home | §4.6 |
| PIPELINE-0275 | rule | home | §4.6 |
| PIPELINE-0276 | rule | home | §4.6 |
| PIPELINE-0277 | rule | home | §4.6 |
| PIPELINE-0278 | test | reference | referenced from §4.6 to scope §13.5 |
| PIPELINE-0279 | mechanism | home | §4.6 |
| PIPELINE-0280 | table | home | §4.6 |
| PIPELINE-0281 | table | home | §4.6 |
| PIPELINE-0282 | rule | home | §4.6 |
| PIPELINE-0283 | rule | home | §4.6 |
| PIPELINE-0284 | rule | reference | referenced from §4.6 to rendering §8.5 |
| PIPELINE-0285 | rule | home | §4.6 |
| PIPELINE-0286 | interface | home | §4.6 |
| PIPELINE-0287 | interface | home | §4.6 |
| PIPELINE-0288 | rule | home | §4.6 |
| PIPELINE-0289 | rule | home | §4.6 |
| PIPELINE-0290 | rule | home | §4.6 |
| PIPELINE-0291 | mechanism | home | §4.7 |
| PIPELINE-0292 | rule | home | §4.7 |
| PIPELINE-0293 | mechanism | home | §4.7 |
| PIPELINE-0294 | rule | home | §4.7 |
| PIPELINE-0295 | rule | home | §4.7 |
| PIPELINE-0296 | rule | home | §4.7 |
| PIPELINE-0297 | rule | home | §4.7 |
| PIPELINE-0298 | mechanism | home | §4.7 |
| PIPELINE-0299 | rule | home | §4.7 |
| PIPELINE-0300 | table | home | §4.7 |
| PIPELINE-0301 | rule | home | §4.7 |
| PIPELINE-0302 | rule | home | §4.7 |
| PIPELINE-0303 | rule | home | §4.7 |
| PIPELINE-0304 | rule | home | §4.7 |
| PIPELINE-0305 | rule | home | §4.7 |
| PIPELINE-0306 | rule | home | §4.7 |
| PIPELINE-0307 | rule | home | §4.7 |
| PIPELINE-0308 | rule | home | §4.7 |
| PIPELINE-0309 | rule | home | §4.7 |
| PIPELINE-0310 | rule | home | §4.7 |
| PIPELINE-0311 | rule | home | §4.7 |
| PIPELINE-0312 | rule | home | §4.7 |
| PIPELINE-0313 | mechanism | home | §4.7 |
| PIPELINE-0314 | rule | home | §4.7 |
| PIPELINE-0315 | rule | home | §4.7 |
| PIPELINE-0316 | rule | home | §4.7 |
| PIPELINE-0317 | rule | home | §4.7 |
| PIPELINE-0318 | rule | home | §4.7 |
| PIPELINE-0319 | rule | home | §4.7 |
| PIPELINE-0320 | rule | home | §4.7 |
| PIPELINE-0321 | rule | home | §4.7 |
| PIPELINE-0322 | rule | home | §4.7 |
| PIPELINE-0323 | rule | home | §4.7 |
| PIPELINE-0324 | rule | home | §4.7 |
| PIPELINE-0325 | mechanism | home | §4.7 |
| PIPELINE-0326 | interface | home | §4.7 |
| PIPELINE-0327 | interface | home | §4.7 |
| PIPELINE-0328 | interface | home | §4.7 |
| PIPELINE-0329 | interface | home | §4.7 |
| PIPELINE-0330 | mechanism | home | §4.7 |
| PIPELINE-0331 | rule | home | §4.7 |
| PIPELINE-0332 | rule | home | §4.7 |
| PIPELINE-0333 | rule | home | §4.7 |
| PIPELINE-0334 | table | home | §4.7 |
| PIPELINE-0335 | rule | home | §4.7 |
| PIPELINE-0336 | rule | home | §4.7 |
| PIPELINE-0337 | rule | home | §4.7 |
| PIPELINE-0338 | number | home | §4.7 |
| PIPELINE-0339 | rule | home | §4.7 |
| PIPELINE-0340 | rule | home | §4.7 |
| PIPELINE-0341 | rule | home | §4.7 |
| PIPELINE-0342 | rule | reference | referenced from §4.7 to model §2.6 |
| PIPELINE-0343 | rule | home | §4.7 |
| PIPELINE-0344 | rule | home | §4.7 |
| PIPELINE-0345 | rule | reference | referenced from §4.7 to model §2.6 |
| PIPELINE-0346 | mechanism | home | §4.7 |
| PIPELINE-0347 | rule | home | §4.7 |
| PIPELINE-0348 | rule | home | §4.7 |
| PIPELINE-0349 | rule | home | §4.7 |
| PIPELINE-0350 | rule | home | §4.7 |
| PIPELINE-0351 | rule | home | §4.7 |
| PIPELINE-0352 | rule | home | §4.7 |
| PIPELINE-0353 | rule | home | §4.7 |
| PIPELINE-0354 | type | home | §4.7 |
| PIPELINE-0355 | interface | home | §4.7 |
| PIPELINE-0356 | interface | home | §4.7 |
| PIPELINE-0357 | interface | home | §4.7 |
| PIPELINE-0358 | table | home | §4.7 |
| PIPELINE-0359 | rule | home | §4.7 |
| PIPELINE-0360 | rule | home | §4.7 |
| PIPELINE-0361 | rule | home | §4.7 |
| PIPELINE-0362 | rule | home | §4.7 |
| PIPELINE-0363 | rule | home | §4.7 |
| PIPELINE-0364 | rule | home | §4.7 |
| PIPELINE-0365 | rule | home | §4.7 |
| PIPELINE-0366 | rule | home | §4.7 |
| PIPELINE-0367 | rule | home | §4.7 |
| PIPELINE-0368 | rule | home | §4.7 |
| PIPELINE-0369 | rule | home | §4.7 |
| PIPELINE-0370 | rule | home | §4.7 |
| PIPELINE-0371 | rule | home | §4.7 |
| PIPELINE-0372 | rule | home | §4.7 |
| PIPELINE-0373 | rule | home | §4.7 |
| PIPELINE-0374 | rule | home | §4.7 |
| PIPELINE-0375 | rule | home | §4.7 |
| PIPELINE-0376 | rule | reference | referenced from §4.7 to rendering §9.2 |
| PIPELINE-0377 | rule | home | §4.7 |
| PIPELINE-0378 | test | reference | §4.7 (the check-row list kept beside its pointer: §5.3 holds no statement of it; cross-part note) |
| PIPELINE-0379 | mechanism | home | §4.7 |
| PIPELINE-0380 | interface | home | §4.7 |
| PIPELINE-0381 | rule | home | §4.7 |
| PIPELINE-0382 | rule | home | §4.7 |
| PIPELINE-0383 | rule | home | §4.7 |
| PIPELINE-0384 | rule | home | §4.7 |
| PIPELINE-0385 | rule | home | §4.7 |
| PIPELINE-0386 | rule | home | §4.7 |
| PIPELINE-0387 | rule | home | §4.7 |
| PIPELINE-0388 | rule | home | §4.7 |
| PIPELINE-0389 | rule | home | §4.7 |
| PIPELINE-0390 | rule | home | §4.7 |
| PIPELINE-0391 | rule | home | §4.7 |
| PIPELINE-0392 | rule | home | §4.7 |
| PIPELINE-0393 | rule | home | §4.7 |
| PIPELINE-0394 | rule | home | §4.7 |
| PIPELINE-0395 | rule | home | §4.7 |
| PIPELINE-0396 | rule | home | §4.7 |
| PIPELINE-0397 | rule | home | §4.7 |
| PIPELINE-0398 | rule | home | §4.7 |
| PIPELINE-0399 | rule | home | §4.7 |
| PIPELINE-0400 | rule | home | §4.8 |
| PIPELINE-0401 | rule | home | §4.8 |
| PIPELINE-0402 | rule | home | §4.8 |
| PIPELINE-0403 | rule | home | §4.8 |
| PIPELINE-0404 | rule | home | §4.8 |
| PIPELINE-0405 | rule | home | §4.8 |
| PIPELINE-0406 | rule | home | §4.8 |
| PIPELINE-0407 | table | home | §4.8 |
| PIPELINE-0408 | rule | home | §4.8 |
| PIPELINE-0409 | rule | home | §4.8 |
| PIPELINE-0410 | rule | home | §4.8 |
| PIPELINE-0411 | rule | home | §4.8 |
| PIPELINE-0412 | test | home | §4.8 |
| PIPELINE-0413 | rule | home | §4.8 |
| PIPELINE-0414 | rule | home | §4.8 |
| PIPELINE-0415 | rule | reference | referenced from §4.8 to determinism §6.3 |
| PIPELINE-0416 | rule | home | §4.8 |
| PIPELINE-0417 | rule | reference | referenced from §4.8 to determinism §5.3 |
| PIPELINE-0418 | rule | home | §4.8 |
| PIPELINE-0419 | mechanism | home | §4.9 |
| PIPELINE-0420 | rule | home | §4.9 |
| PIPELINE-0421 | rule | reference | referenced from §4.9 to determinism §7.3 |
| PIPELINE-0422 | mechanism | home | §4.9 |
| PIPELINE-0423 | rule | home | §4.9 |
| PIPELINE-0424 | rule | home | §4.9 |
| PIPELINE-0425 | number | home | §4.9 |
| PIPELINE-0426 | interface | home | §4.9 |
| PIPELINE-0427 | rule | home | §4.9 |
| PIPELINE-0428 | rule | home | §4.9 |
| PIPELINE-0429 | rule | home | §4.9 |
| PIPELINE-0430 | rule | home | §4.9 |
| PIPELINE-0431 | test | home | §4.9 |
| PIPELINE-0432 | table | home | §4.9 |
| PIPELINE-0433 | rule | home | §4.9 |
| PIPELINE-0434 | rule | home | §4.9 |
| PIPELINE-0435 | rule | home | §4.9 |
| PIPELINE-0436 | table | home | §4.9 |
| PIPELINE-0437 | rule | home | §4.9 |
| PIPELINE-0438 | rule | home | §4.9 |
| PIPELINE-0439 | table | home | §4.9 |
| PIPELINE-0440 | rule | home | §4.9 |
| PIPELINE-0441 | rule | home | §4.9 |
| PIPELINE-0442 | table | home | §4.9 |
| PIPELINE-0443 | test | home | §4.9 |
| PIPELINE-0444 | rule | home | §4.9 |
| PIPELINE-0445 | rule | home | §4.9 |
| PIPELINE-0446 | rule | home | §4.9 |
| PIPELINE-0447 | mechanism | home | §4.10 |
| PIPELINE-0448 | rule | reference | referenced from §4.10 to rendering §8.1 |
| PIPELINE-0449 | rule | home | §4.10 |
| PIPELINE-0450 | mechanism | home | §4.11 |
| PIPELINE-0451 | rule | home | §4.11 |
| PIPELINE-0452 | rule | home | §4.11 |
| PIPELINE-0453 | rule | home | §4.11 |
| PIPELINE-0454 | rule | home | §4.11 |
| PIPELINE-0455 | rule | home | §4.11 |
| PIPELINE-0456 | rule | home | §4.11 |
| PIPELINE-0457 | rule | home | §4.11 |
| PIPELINE-0458 | rule | home | §4.11 |
| PIPELINE-0459 | rule | home | §4.11 |
| PIPELINE-0460 | rule | home | §4.11 |
| PIPELINE-0461 | rule | home | §4.11 |
| PIPELINE-0462 | rule | home | §4.11 |
| PIPELINE-0463 | table | home | §4.11 |
| PIPELINE-0464 | rule | home | §4.11 |
| PIPELINE-0465 | rule | home | §4.11 |
| PIPELINE-0466 | rule | home | §4.11 |
| PIPELINE-0467 | rule | home | §4.11 |
| PIPELINE-0468 | rule | home | §4.11 |
| PIPELINE-0469 | rule | home | §4.11 |
| PIPELINE-0470 | rule | home | §4.11 |
| PIPELINE-0471 | rule | reference | referenced from §4.11 to determinism §6.3 |
| PIPELINE-0472 | mechanism | home | §4.11 |
| PIPELINE-0473 | rule | reference | referenced from §4.11 to determinism §7.4 |
| PIPELINE-0474 | rule | reference | referenced from §4.11 to determinism §7.1 |
| PIPELINE-0475 | test | home | §4.11 |
| PIPELINE-0476 | type | home | §4.11 |
| PIPELINE-0477 | type | home | §4.11 |
| PIPELINE-0478 | rule | home | §4.11 |
| PIPELINE-0479 | rule | home | §4.11 |
| PIPELINE-0480 | mechanism | home | §4.11 |
| PIPELINE-0481 | rule | home | §4.11 |
| PIPELINE-0482 | rule | home | §4.11 |
| PIPELINE-0483 | rule | home | §4.11 |
| PIPELINE-0484 | rule | home | §4.11 |
| PIPELINE-0485 | rule | home | §4.11 |
| PIPELINE-0486 | rule | home | §4.11 |
| PIPELINE-0487 | rule | home | §4.11 |
| PIPELINE-0488 | rule | home | §4.11 |
| PIPELINE-0489 | rule | home | §4.11 |
| PIPELINE-0490 | rule | home | §4.11 |
| PIPELINE-0491 | rule | home | §4.11 |
| PIPELINE-0492 | rule | home | §4.11 |
| PIPELINE-0493 | rule | reference | referenced from §4.11 to determinism §6.3 |
| PIPELINE-0494 | test | home | §4.11 |
| PIPELINE-0495 | rule | reference | referenced from §4.11 to determinism §6.3 |
| PIPELINE-0496 | rule | home | §4.11 |
| PIPELINE-0497 | interface | home | §4.11 |
| PIPELINE-0498 | interface | home | §4.11 |
| PIPELINE-0499 | rule | home | §4.11 |
| PIPELINE-0500 | rule | home | §4.11 |
| PIPELINE-0501 | rule | home | §4.11 |
| PIPELINE-0502 | rule | reference | referenced from §4.11 to V08 V08 §3.6 |
| PIPELINE-0503 | rule | home | §4.11 |
| PIPELINE-0504 | rule | reference | referenced from §4.11 to V08 V08 §3.6 |
| PIPELINE-0505 | rule | home | §4.11 |
| PIPELINE-0506 | interface | home | §4.11 |
| PIPELINE-0507 | rule | home | §4.11 |
| PIPELINE-0508 | rule | home | §4.11 |
| PIPELINE-0509 | rule | reference | referenced from §4.11 to V08 §1.1 |
| PIPELINE-0510 | rule | home | §4.11 |
| PIPELINE-0511 | rule | home | §4.11 |
| PIPELINE-0512 | mechanism | home | §4.11 |
| PIPELINE-0513 | rule | home | §4.11 |
| PIPELINE-0514 | rule | home | §4.11 |
| PIPELINE-0515 | rule | home | §4.11 |
| PIPELINE-0516 | type | home | §4.11 |
| PIPELINE-0517 | rule | home | §4.11 |
| PIPELINE-0518 | rule | home | §4.11 |
| PIPELINE-0519 | table | home | §4.11 |
| PIPELINE-0520 | mechanism | home | §4.11 |
| PIPELINE-0521 | rule | home | §4.11 |
| PIPELINE-0522 | rule | home | §4.11 |
| PIPELINE-0523 | rule | home | §4.11 |
| PIPELINE-0524 | test | reference | referenced from §4.11 to scope §13.2 |
| PIPELINE-0525 | rule | home | §4.11 |
| PIPELINE-0526 | rule | home | §4.11 |
| PIPELINE-0527 | rule | reference | referenced from §4.11 to determinism §6.3 |
| PIPELINE-0528 | rule | home | §4.11 |
| PIPELINE-0529 | type | home | §4.11 |
| PIPELINE-0530 | rule | home | §4.11 |
| PIPELINE-0531 | type | home | §4.11 |
| PIPELINE-0532 | rule | home | §4.11 |
| PIPELINE-0533 | rule | home | §4.11 |
| PIPELINE-0534 | rule | home | §4.11 |
| PIPELINE-0535 | type | home | §4.11 |
| PIPELINE-0536 | rule | home | §4.11 |
| PIPELINE-0537 | rule | home | §4.11 |
| PIPELINE-0538 | number | home | §4.11 |
| PIPELINE-0539 | table | home | §4.11 |
| PIPELINE-0540 | rule | home | §4.11 |
| PIPELINE-0541 | rule | home | §4.11 |
| PIPELINE-0542 | rule | home | §4.11 |
| PIPELINE-0543 | rule | home | §4.11 |
| PIPELINE-0544 | rule | home | §4.11 |
| PIPELINE-0545 | rule | home | §4.11 |
| PIPELINE-0546 | type | home | §4.11 |
| PIPELINE-0547 | interface | home | §4.11 |
| PIPELINE-0548 | rule | home | §4.11 |
| PIPELINE-0549 | rule | home | §4.11 |
| PIPELINE-0550 | rule | home | §4.11 |
| PIPELINE-0551 | interface | home | §4.12 |
| PIPELINE-0552 | interface | home | §4.12 |
| PIPELINE-0553 | interface | home | §4.12 |
| PIPELINE-0554 | interface | home | §4.12 |
| PIPELINE-0555 | rule | home | §4.12 |
| PIPELINE-0556 | rule | home | §4.12 |
| PIPELINE-0557 | rule | home | §4.12 |
| PIPELINE-0558 | rule | home | §10 intro |
| PIPELINE-0559 | rule | home | §10.1 |
| PIPELINE-0560 | rule | home | §10.1 |
| PIPELINE-0561 | rule | home | §10.1 |
| PIPELINE-0562 | rule | home | §10.1 |
| PIPELINE-0563 | interface | home | §10.2 |
| PIPELINE-0564 | interface | home | §10.2 |
| PIPELINE-0565 | interface | home | §10.2 |
| PIPELINE-0566 | interface | home | §10.2 |
| PIPELINE-0567 | interface | home | §10.2 |
| PIPELINE-0568 | interface | home | §10.2 |
| PIPELINE-0569 | interface | home | §10.2 |
| PIPELINE-0570 | interface | home | §10.2 |
| PIPELINE-0571 | interface | home | §10.2 |
| PIPELINE-0572 | mechanism | home | §10.2 |
| PIPELINE-0573 | rule | home | §10.2 |
| PIPELINE-0574 | rule | home | §10.2 |
| PIPELINE-0575 | rule | home | §10.2 |
| PIPELINE-0576 | rule | home | §10.2 |
| PIPELINE-0577 | rule | home | §10.2 |
| PIPELINE-0578 | rule | home | §10.2 |
| PIPELINE-0579 | rule | home | §10.2 |
| PIPELINE-0580 | table | home | §10.2 |
| PIPELINE-0581 | rule | home | §10.2 |
| PIPELINE-0582 | rule | home | §10.2 |
| PIPELINE-0583 | rule | home | §10.2 |
| PIPELINE-0584 | interface | home | §10.2 |
| PIPELINE-0585 | interface | home | §10.2 |
| PIPELINE-0586 | interface | home | §10.2 |
| PIPELINE-0587 | rule | home | §10.2 |
| PIPELINE-0588 | rule | reference | referenced from §10.2 to model §2.6 |
| PIPELINE-0589 | rule | home | §10.2 |
| PIPELINE-0590 | rule | home | §10.2 |
| PIPELINE-0591 | rule | home | §10.2 |
| PIPELINE-0592 | rule | home | §10.2 |
| PIPELINE-0593 | rule | home | §10.2 |
| PIPELINE-0594 | rule | home | §10.2 |
| PIPELINE-0595 | interface | home | §10.2 |
| PIPELINE-0596 | interface | home | §10.2 |
| PIPELINE-0597 | interface | home | §10.2 |
| PIPELINE-0598 | interface | home | §10.2 |
| PIPELINE-0599 | interface | home | §10.2 |
| PIPELINE-0600 | interface | home | §10.2 |
| PIPELINE-0601 | interface | home | §10.2 |
| PIPELINE-0602 | table | home | §10.2 |
| PIPELINE-0603 | table | home | §10.2 |
| PIPELINE-0604 | table | home | §10.2 |
| PIPELINE-0605 | table | home | §10.2 |
| PIPELINE-0606 | table | home | §10.2 |
| PIPELINE-0607 | table | home | §10.2 |
| PIPELINE-0608 | rule | home | §10.2 |
| PIPELINE-0609 | rule | home | §10.2 |
| PIPELINE-0610 | mechanism | home | §10.3 |
| PIPELINE-0611 | rule | home | §10.3 |
| PIPELINE-0612 | rule | home | §10.3 |
| PIPELINE-0613 | number | home | §10.3 |
| PIPELINE-0614 | interface | home | §10.3 |
| PIPELINE-0615 | rule | home | §10.3 |
| PIPELINE-0616 | mechanism | home | §10.3 |
| PIPELINE-0617 | mechanism | home | §10.3 |
| PIPELINE-0618 | rule | home | §10.3 |
| PIPELINE-0619 | rule | home | §10.3 |
| PIPELINE-0620 | interface | home | §10.3 |
| PIPELINE-0621 | interface | home | §10.3 |
| PIPELINE-0622 | rule | home | §10.3 |
| PIPELINE-0623 | rule | home | §10.3 |
| PIPELINE-0624 | rule | home | §10.3 |
| PIPELINE-0625 | rule | home | §10.3 |
| PIPELINE-0626 | rule | home | §10.3 |
| PIPELINE-0627 | mechanism | home | §10.4 |
| PIPELINE-0628 | rule | home | §10.4 |
| PIPELINE-0629 | rule | home | §10.4 |
| PIPELINE-0630 | interface | home | §10.4 |
| PIPELINE-0631 | rule | home | §10.4 |
| PIPELINE-0632 | rule | home | §10.4 |
| PIPELINE-0633 | rule | home | §10.4 |
| PIPELINE-0634 | rule | home | §10.4 |
| PIPELINE-0635 | rule | home | §10.4 |
| PIPELINE-0636 | rule | home | §10.4 |
| PIPELINE-0637 | rule | home | §10.4 |
| PIPELINE-0638 | rule | reference | referenced from PART II intro to V01 |
| PIPELINE-0639 | interface | home | II.1 |
| PIPELINE-0640 | interface | home | II.1 |
| PIPELINE-0641 | interface | home | II.1 |
| PIPELINE-0642 | interface | home | II.1 |
| PIPELINE-0643 | interface | home | II.1 |
| PIPELINE-0644 | interface | home | II.1 |
| PIPELINE-0645 | interface | home | II.1 |
| PIPELINE-0646 | rule | home | II.1 |
| PIPELINE-0647 | rule | home | II.1 |
| PIPELINE-0648 | rule | home | II.1 |
| PIPELINE-0649 | rule | home | II.1 |
| PIPELINE-0650 | rule | home | II.1 |
| PIPELINE-0651 | rule | home | II.1 |
| PIPELINE-0652 | rule | home | II.1 |
| PIPELINE-0653 | rule | home | II.1 |
| PIPELINE-0654 | rule | home | II.1 |
| PIPELINE-0655 | rule | home | II.1 |
| PIPELINE-0656 | rule | home | II.1 |
| PIPELINE-0657 | rule | home | II.1 |
| PIPELINE-0658 | rule | home | II.1 |
| PIPELINE-0659 | rule | home | II.1 |
| PIPELINE-0660 | mechanism | home | II.2 |
| PIPELINE-0661 | rule | home | II.2 |
| PIPELINE-0662 | rule | home | II.2 |
| PIPELINE-0663 | rule | home | II.2 |
| PIPELINE-0664 | rule | home | II.2 |
| PIPELINE-0665 | rule | home | II.2 |
| PIPELINE-0666 | table | home | II.3 |
| PIPELINE-0667 | rule | home | II.3 |
| PIPELINE-0668 | rule | home | II.3 |
| PIPELINE-0669 | rule | home | II.3 |
| PIPELINE-0670 | rule | reference | referenced from II.4 to rendering §8.2 |
| PIPELINE-0671 | rule | home | II.4 |
| PIPELINE-0672 | rule | home | II.4 |
| PIPELINE-0673 | rule | home | II.4 |
| PIPELINE-0674 | rule | home | II.4 |
| PIPELINE-0675 | rule | home | II.5 |
| PIPELINE-0676 | test | home | II.5 |
| PIPELINE-0677 | test | home | II.5 |
| PIPELINE-0678 | number | reference | referenced from II.5 to rendering §12.6 |
| PIPELINE-0679 | rule | home | II.5 |
| PIPELINE-0680 | rule | home | II.6 |
| PIPELINE-0681 | rule | home | II.6 |
| PIPELINE-0682 | rule | home | II.6 |
| PIPELINE-0683 | rule | reference | referenced from II.6 to rendering §8.4 |
| PIPELINE-0684 | mechanism | home | II.6 |
| PIPELINE-0685 | interface | home | II.6 |
| PIPELINE-0686 | rule | home | II.6 |
| PIPELINE-0687 | rule | home | II.6 |
| PIPELINE-0688 | rule | home | II.6 |
| PIPELINE-0689 | rule | home | II.6 |
| PIPELINE-0690 | rule | home | II.6 |
| PIPELINE-0691 | rule | home | II.6 |
| PIPELINE-0692 | rule | home | II.6 |
| PIPELINE-0693 | rule | home | II.6 |
| PIPELINE-0694 | interface | home | II.6 |
| PIPELINE-0695 | interface | home | II.6 |
| PIPELINE-0696 | rule | home | II.6 |
| PIPELINE-0697 | rule | home | II.6 |
| PIPELINE-0698 | table | home | II.6 |
| PIPELINE-0699 | rule | home | II.6 |
| PIPELINE-0700 | rule | home | II.6 |
| PIPELINE-0701 | rule | home | II.6 |
| PIPELINE-0702 | rule | home | II.6 |
| PIPELINE-0703 | rule | home | II.7 intro |
| PIPELINE-0704 | rule | home | II.7 intro |
| PIPELINE-0705 | table | home | II.7.1 |
| PIPELINE-0706 | rule | home | II.7.1 |
| PIPELINE-0707 | rule | home | II.7.1 |
| PIPELINE-0708 | rule | home | II.7.1 |
| PIPELINE-0709 | rule | home | II.7.1 |
| PIPELINE-0710 | table | home | II.7.1 |
| PIPELINE-0711 | rule | home | II.7.2 |
| PIPELINE-0712 | rule | home | II.7.2 |
| PIPELINE-0713 | table | home | II.7.2 |
| PIPELINE-0714 | rule | home | II.7.2 |
| PIPELINE-0715 | rule | home | II.7.2 |
| PIPELINE-0716 | rule | home | II.7.2 |
| PIPELINE-0717 | rule | home | II.7.3 |
| PIPELINE-0718 | rule | home | II.7.3 |
| PIPELINE-0719 | rule | home | II.7.3 |
| PIPELINE-0720 | rule | home | II.7.3 |
| PIPELINE-0721 | rule | home | II.7.3 |
| PIPELINE-0722 | rule | home | II.7.3 |
| PIPELINE-0723 | rule | home | II.7.3 |
| PIPELINE-0724 | rule | home | II.7.3 |
| PIPELINE-0725 | rule | home | II.7.3 |
| PIPELINE-0726 | rule | home | II.7.3 |
| PIPELINE-0727 | rule | home | II.7.3 |
| PIPELINE-0728 | rule | home | II.7.3 |
| PIPELINE-0729 | rule | home | II.7.3 |
| PIPELINE-0730 | rule | home | II.7.3 |
| PIPELINE-0731 | rule | home | II.7.3 |
| PIPELINE-0732 | rule | home | II.7.3 |
| PIPELINE-0733 | rule | home | II.7.3 |
| PIPELINE-0734 | rule | home | II.7.3 |
| PIPELINE-0735 | rule | home | II.7.3 |
| PIPELINE-0736 | rule | home | II.7.3 |
| PIPELINE-0737 | test | reference | referenced from II.7.3 to determinism §5.3 |
| PIPELINE-0738 | rule | home | II.7.3 |
| PIPELINE-0739 | rule | home | II.7.3 |
| PIPELINE-0740 | rule | home | II.7.3 |
| PIPELINE-0741 | rule | home | II.7.3 |
| PIPELINE-0742 | rule | home | II.7.3 |
| PIPELINE-0743 | rule | home | II.7.3 |
| PIPELINE-0744 | rule | home | II.7.3 |
| PIPELINE-0745 | interface | home | II.7.4 |
| PIPELINE-0746 | interface | home | II.7.4 |
| PIPELINE-0747 | interface | home | II.7.4 |
| PIPELINE-0748 | interface | home | II.7.4 |
| PIPELINE-0749 | interface | home | II.7.4 |
| PIPELINE-0750 | interface | home | II.7.4 |
| PIPELINE-0751 | rule | home | II.7.4 |
| PIPELINE-0752 | rule | home | II.7.5 |
| PIPELINE-0753 | rule | home | II.7.5 |
| PIPELINE-0754 | rule | home | II.7.5 |
| PIPELINE-0755 | number | home | II.7.5 |
| PIPELINE-0756 | number | home | II.7.5 |
| PIPELINE-0757 | rule | home | II.7.5 |
| PIPELINE-0758 | rule | home | II.7.5 |
| PIPELINE-0759 | rule | home | II.7.5 |
| PIPELINE-0760 | rule | home | II.7.5 |
| PIPELINE-0761 | rule | home | II.7.5 |
| PIPELINE-0762 | rule | home | II.7.5 |
| PIPELINE-0763 | rule | home | II.7.5 |
| PIPELINE-0764 | rule | home | II.7.5 |
| PIPELINE-0765 | rule | home | II.7.5 |
| PIPELINE-0766 | interface | home | II.7.5 |
| PIPELINE-0767 | interface | home | II.7.5 |
| PIPELINE-0768 | interface | home | II.7.5 |
| PIPELINE-0769 | interface | home | II.7.5 |
| PIPELINE-0770 | rule | home | II.7.6 |
| PIPELINE-0771 | rule | home | II.7.6 |
| PIPELINE-0772 | rule | home | II.7.6 |
| PIPELINE-0773 | table | home | II.7.6 |
| PIPELINE-0774 | rule | home | II.7.6 |
| PIPELINE-0775 | rule | home | II.7.6 |
| PIPELINE-0776 | number | home | II.7.6 |
| PIPELINE-0777 | rule | home | II.7.6 |
| PIPELINE-0778 | rule | home | II.7.6 |
| PIPELINE-0779 | rule | home | II.7.6 |
| PIPELINE-0780 | rule | home | II.7.6 |
| PIPELINE-0781 | rule | home | II.7.6 |
| PIPELINE-0782 | rule | home | II.7.6 |
| PIPELINE-0783 | rule | home | II.7.6 |
| PIPELINE-0784 | rule | home | II.7.6 |
| PIPELINE-0785 | mechanism | home | II.7.6 |
| PIPELINE-0786 | rule | home | II.7.6 |
| PIPELINE-0787 | rule | home | II.7.6 |
| PIPELINE-0788 | rule | home | II.7.6 |
| PIPELINE-0789 | interface | home | II.7.6 |
| PIPELINE-0790 | interface | home | II.7.6 |
| PIPELINE-0791 | interface | home | II.7.6 |
| PIPELINE-0792 | interface | home | II.7.6 |
| PIPELINE-0793 | rule | reference | referenced from PART III to V07 |
| PIPELINE-0794 | rule | reference | referenced from PART III to V07 §3.2 (2) |
| PIPELINE-0795 | rule | reference | referenced from PART III to V07 §3.0 |
| PIPELINE-0796 | rule | reference | PART III (kept at its home: the named home holds no statement of it; see cross-part notes) |
| PIPELINE-0797 | rule | reference | referenced from PART III to V07 §1b W15 |
| PIPELINE-0798 | rule | reference | PART III (kept at its home: the named home holds no statement of it; see cross-part notes) |
| PIPELINE-0799 | number | reference | PART III (kept at its home: the named home holds no statement of it; see cross-part notes) |
| PIPELINE-0800 | rule | reference | referenced from PART III to V07 §15 |
| PIPELINE-0801 | rule | reference | referenced from PART III to V07 |
| PIPELINE-0802 | rule | reference | referenced from PART III to V07 |
| PIPELINE-0803 | rule | reference | referenced from PART III to V07 §1b W2 |
| PIPELINE-0804 | rule | reference | referenced from PART III to V07 |
| PIPELINE-0805 | rule | reference | referenced from PART III to V07 §2.1 |
| PIPELINE-0806 | rule | reference | referenced from PART III to V08 §1.1 |

