# Final notes — OWNER RULE item 116 (the final seat)

2026-09-30. The final item is `item-116.md` beside this file, replaced in place. This note settles every required change
of the three reviews (`review-rules.md` R1–R21, `review-realism.md` R1–R26, `review-wiring.md` W1–W32) and the two
flags of `draft-notes.md`, each applied or rejected with its reason, after checking the design files myself. Where this
note and `draft-notes.md` differ, this note and the final item rule.

**Read whole:** the draft item, `draft-notes.md`, `read-owner-decision.md`, the three reviews, `work/g114-115/items-114-115.md`
and `work/g114-115/draft-notes.md`, and the g114-115 reviews' parts that touch prosperity (review-edges E1, E12, E27;
review-wiring's item-116 notes). **Checked in the design** (receipts in `tmp/`): base §2.6 (Building, RoofSpec,
MaterialRow, the Materials rule), §2.7 (Enceinte, Gate, Tower, Bridge, RaisedWayRecord, RetainingWall, LandUse,
SiteResources, MaterialLedger, Tunnel, Gallery), §2.8's `SliceRef`, §3.2 (9)'s frame law, §4.2 S0, S1 (10), S3 (1),
§4.5 (1)–(10) (significance, band range, dials, pressure), §4.8 whole, §4.9's fuel and timber rows, §4.11's geometry
floor, salvage and Works, §5.2's class table, §5.4's `ReportCode` and landings, §6.1's concern table and fixed-key
rule, §7.7 layers 1–2 and `TradePartner`, §13.2's T8-5, T19-3, T26-1 and §13.8, §14's `DossierDigest`; V11 §2.5,
§3.5.2, §3.7.1–§3.7.2, §3.17–§3.19 and the dossier kind bindings; V06 §2.2's fire row, §3.11.2–§3.11.3; V07's palisade
rows and wall records; V08's `site`, `access`, `deposits` and `materials` rows; V01 §3.7.3–§3.7.4; item 19 and item 23
(file b); J28; the owner's editability words; `docs/lane-events.log` for the times.

**Executed:** `tmp/pick-worked.txt` — the revised cost model, the means bands and the pick with its blend and mix draws,
over a uniform value within each band, for nine supply cases and the works means at three rungs (the script is
`tmp/pick.py`; the second half of the receipt re-runs the stony, arid, mountain and brick cases under the final admission rule). Every worked number and every bar bound in the item was checked against it.

---

## 1. The draft's two flags

| flag | settled |
|---|---|
| Flag 1 — the time of the partner adoption | ~01:33, as `read-owner-decision.md` and `lane-events.log` l.1869 give it (review-rules R14, realism R26 (g)). |
| Flag 2 — DR41 | free: the DR table ends at DR40 and the 114–115 notes cede DR41 to item 116 (review-wiring B). Kept. |

## 2. review-rules.md (owner words and conflicts)

| id | required change | decision | how, or why not |
|---|---|---|---|
| R1 | institutions inside their district's band range (item 72 (d‴)) | APPLIED, one part rejected | (f): `M = min(M_plot × prestige × patronage, M_ceil)`, `M_ceil` the district's ceiling band's `hi`; prestige values raised (1.5–3.0) because they now multiply the plot's own means; works stay on the works means with the reason; the keep and castle buildings are buildings of their district; T116-29 and J-A116.42 restated; the worked church outcomes recomputed. **Rejected:** feeding the clamped excess into `District.pressure`. §4.5 (8)'s pressure measures an instance's amplified VALUE past the ceiling band's cut; a material's means is a read, not a value, and the institution's significance and its dial term already feed the pressure (§4.5 (1), (6)), so a material term would count the institution twice. The owner's words ("stay with the neighborhood bounds until the neighborhood itself upgrades") are met by the clamp alone. |
| R2 | dossier records that state a native source | APPLIED (merged with realism R3) | (b) (2) "Production records": extraction and first-working institutions, the `Stone Quarrying` and `Timber Trade` income rows (not for an `entrepot`), the settlement's own chains, its own exports (not for an `entrepot`); S1 raises the raster's floor; a production fact outranks a depleted deposit. Processors: `brickworks`, `sawmill` and `thatcher` count as sources (realism tiebreaker: those crafts stood at their source), `mason_yard` and `timber_yard` do not. (k) and T116-14 qualified ("a dossier-backed producer always stands"); T116-12 extended; DR41's inputs. |
| R3 | item 19 conflict mis-quoted and incomplete | APPLIED | (m) quotes item 19's own text (file b) and attributes the "never by a material keyed to the prosperity band" clause to §2.6; "owner-approved" replaced by "J28's application of the owner's emulation first" (J28 checked: "19 materials = FTG's per-stage/district/type model by default"); item 19's owner words and its (a) recorded as agreeing; "never a universal ladder" ruled kept; the roof-colour role by band superseded as a default and kept under FTG. |
| R4 | emulation first ruled against the owner's words and §7.6 | APPLIED | (m) quotes "I still want it to be based in our base of MFCG and FTG emulation first", rules the newer rule prevails for the default, states the licence as an absolute while the switch is on — the one exception to §7.6's "tendencies, never fixed laws" — lifted under the parity presets and with the switch off; "item 23's rows" replaced; the determinism row spells the exception out. |
| R5 | the defaults must reproduce the owner's first example | APPLIED (the mechanism, not the vetoable departure) | (g)'s earth-wall admission: `cob` and `adobe` are candidates only where timber is not native by land and fieldstone does not lie at hand. Executed: the owner's forest case is now wattle and daub and timber frame in every band (100 % timber mass), matching T116-5. The alternative the review offered (a cost factor on earth where timber is native) was rejected: a tie with wattle would give a coin-flip mix of cob and wattle, not "wood based". |
| R6 | the owner's wealth words on bands | APPLIED | (a) maps "the very rich" → `rich`, "the richer areas" → `prosperous`, `rich`, "the middling areas" → `modest`, `comfortable`, the poorer → `squalid`, `poor`; T116-4, T116-6, T116-7 and T116-10 restated in these words. |
| R7 | works read the richest purse | APPLIED | (f) states the works purse as a vetoable interpretation; the enceinte factor lowered to 0.8. Executed: a TOWN walls itself in stone by sea (P = 1) but not by river (0) or road; CITY by river 0.35; METROPOLIS 0.92; gates (1.2) and castles (1.5) reach further. T116-6 extended to the owner's example's structures. |
| R8 | edits and overrides against "grow to have" | APPLIED | (l) rules the two owner rules: an author's act on an element wins on it (the owner's editability quoted); a district override feeds later growth only within the epoch's supply, renormalised, else the pick, reported `override_share_dropped`; T116-30 bar on a native-only fixture. |
| R9 | the replay's partners and removed deposits | APPLIED in part | `removed` dropped from the replay; the partner reading marked vetoable with its alternative and reworded ("the replay reads the present partner set, as generation does for all the fabric it builds, a partner whose arrival an F14 receipt dates only from that week; no history event names a partner, so none is otherwise added or removed"); T116-24 extended. **Kept, not reversed:** the present partner set for replay epochs — generation without a replay already builds every standing building, old and new, with today's facts, so the replay reading the same set is the consistent choice; the alternative is named for the owner's veto. |
| R10 | "within a kind" reading for structures | APPLIED | (m) states it as a vetoable reading with the base's precedent (§4.8's bridges "stone or timber by era and prosperity rows"; item 110 (b)'s pier spacing) and states plainly that a settlement lacking every material gets a ford or no bridge, no harbour work and no raised way. |
| R11 | Works, and the pieces left outside | APPLIED (merged with realism R8) | (i) Works: rows read a material id or its mass; pauses by mass (earth in winter and the wet season); decay 0.6 on timber mass and thatch; a mixed building reads its heavier part; a traded material adds no duration. Boundaries: a plot boundary wall draws in its main building's wall family (texture only, at draw); field boundaries stay hedgerows, a walled field system being a region pack's field-system row. |
| R12 | a reason at each interpretation choice | APPLIED | *Why* clauses at: native-only, the arena, the production records, slate and flags, the ruins basis and its reach, the landfall, the floor, native-only materials, carriage per load and the premium, the means and `rungMeans`, the institutions' clamp, the works purse, the earth-wall admission, whether-by-cost and where-by-mass, the declared partner, the replay reading, the `lit` tint. |
| R13 | the standalone consequence stated plainly | APPLIED | (c): a standalone map is native-only until its author declares a partner, so the owner's first example needs one; Surprise me declares none, with its reason and its vetoable alternative. |
| R14 | header: time, bundling words, filing | APPLIED | ~01:33; "bundle all this with g114-115" quoted (lane-events l.1850 quotes it); "filed under J122 and J128"; the filing in OWNER-INSTRUCTIONS stated. |
| R15 | the hostile exclusion's reason | APPLIED | (c): SettlementForge makes no trade link with a hostile or suppressed neighbour (research V26; `read-sf.md` §4.2), J121, vetoable. |
| R16 | item 115 sentence | APPLIED | (f): "its gate adds nothing to the means; an island's plots read their own bands … its fabric draws on the settlement's supply". |
| R17 | `lit` band tint and the no-op pin | APPLIED | (n): the default `lit` sheet reads the covering's role with the switch on and the band tint with it off. |
| R18 | never-read list wording | APPLIED | (c): the closed-digest rule admits the three fields through V08 §2.4's field-table rows; item 86's list unchanged. |
| R19 | `materialFamily` is a material token | APPLIED | (a). |
| R20 | deferral wording | APPLIED | (c)'s adapter in the present tense. |
| R21 | V02's mutator row | APPLIED | (r) V02 row. |

## 3. review-realism.md (realism, nuance, edges)

| id | required change | decision | how, or why not |
|---|---|---|---|
| R1 | native reach over the creation arena, carriage after siting | APPLIED | (b) (1): native by land anywhere in the arena as created; frame growth adds none; S3's commit writes the land carriage from the principal centre; `haul` and the 1.3 cap retired into (e)'s carriage law; II.7.6 keeps `reachM` from the town for laying workings, with the surface-quarry fallback; T116-11 restated; the pebble test keeps a radius (`pebbleReachM`) from the centre. The frame-origin rule and its D7 claim are gone. |
| R2 | depleted deposits at generation | APPLIED, modified | (b) (2): a depleted deposit is native for generation's builds (V04 workings worked out; DR32's ossuary has its quarry) and not native by land from the first live epoch for a point family; an area family's depleted deposit works out only its own land use; the timber test reads the raster at generation and "the raster less what epochs cleared, plus standing woods" at an epoch, so nothing flips at the first epoch. **Modified:** a `removed` deposit grants nothing at any time (rules R9: a remove is no evidence of past working) — it still denies the land basis for a point family. The date clause is applied through what the digest carries: V08 reads `resourceHistory` (l.655) into the change feed's receipts, so a depletion an F13 receipt dates ends the deposit's availability in the replay at that week, and an undated one is available in every replay epoch before the last (stated as the assumption). |
| R3 | dossier production evidence | APPLIED | merged with rules R2 (see above); one reason set (`producer`, `income`, `chain`, `export`) in `NativeReason`. |
| R4 | enceinte kind against material | APPLIED, merged with W6 | `Enceinte.kind` keeps its ring role (W6) and the construction is the material's mass; the pick moves to S3 and S5a where the trace is fixed (S5c stops at the setback band the section sets); TOWN+ candidates are masonry and `earth_bank` (a rampart, with a timber palisade crest where boards are available, `Enceinte.crest`); earthwork section rows by rung; bastion and octagonal towers only on masonry; gates pick on their own (factor 1.2, never lighter than the enceinte, `Gate.material`); the village kind draw renormalised over admitted kinds; the REPLACEMENT retypes to available masonry. R4's proposal to set `kind` to `earthwork` at TOWN was not taken: it would lose the ring role S5a, V06's contraction and `supersededBy` read (W6). T116-27 gains the tower, section and gate clauses. |
| R5 | institutions and the pick | APPLIED | `MaterialPreference.fallback`; prestige rows admit masonry with fallback `timber_frame` and `log`; with R1's clamp this gives native masonry at any means, traded masonry only within the neighbourhood's bounds, else a stave church; T116-29 restated as bounds; T116-22 gains the lowest-ceiling masonry clause; T116-7 holds by construction. |
| R18 | the no-op pin | APPLIED | (n): no field this item adds is written with the switch off; migration rewritten as read rules (the ledger's ids read as families, never rewritten). The one id rename (`timber` → `boards`, W11) is carried by output versions and an alias at read; T116-1 states the pin under that rename. |
| R6 | which preference row is read | APPLIED | (g) (1): structure key → class → district kind → the default row; `docks` and `shanty` rows kept; F-MATERIAL steps the same order. |
| R7 | fire and flood | APPLIED, one part modified | `MaterialDef.flammability` and `.floodCollapse` with the defaults; mixed buildings burn by the more flammable part and flood by the ground storey (`upper`) or the lighter material; T116-10 gains the burn clause. **Modified:** `fire.rebuildShift` is not retired — the switch-off path must stay byte-identical (T116-1) and the documents written before this item read it; the ordinance rule replaces its step while the switch is on, and V06 states the relation. |
| R8 | Works | APPLIED | merged with rules R11. |
| R9 | the S7b forecast and the stone quantities | APPLIED | (i) the forecast (the expectation of the pick, no draws, 0 where stone is not native by land); (h) the parts' shares as one geometry; the quarry volume law gains native-stone structures and linings. |
| R10 | stone slates over-produced | APPLIED | `Terrain.fissile: 'none'|'slate'|'flag'` on one appended uniform with the relief rows; `stone_slate` needs `flag` and is native only; it also covers flat roofs; the site request's toggle is `fissile`. |
| R11 | fieldstone in stony uplands | APPLIED, modified | `dry_stone` pays no carriage, base 1.3. **Modified:** it takes `groundFactor` 1.5 off stony ground, and earth walls are not admitted where fieldstone lies at hand. Executed: R11's own numbers, with cob at 1.5 on stony ground, made cob the DEARER wall there, so the modest band took cob over fieldstone (the pick takes the dearest affordable) — an inversion; the admission removes it (stony upland: fieldstone for the squalid, poor and modest bands, 100 %). The ground factor keeps fieldstone from undercutting wattle on good ground, which would have made the poor of the owner's quarry-and-timber town stone-walled against his picture. "Poor ground" is renamed "stony ground" ("poor" is a band). |
| R12 | kiln fuel a price, not a gate | APPLIED | fired clay with native clay and no native fuel is native at `kilnFuelFactor` 2.0; T116-17's clause. |
| R13 | timber scarcity | APPLIED | (e)'s scarcity factor from §4.9's managed-wood demand over the wood the arena lays; T116-21's clause. |
| R14 | carriage per load, route ratios | APPLIED | (e) rewritten; routeRate sea 0.15 · river 0.45 · road 1.5; worked numbers recomputed and executed (rubble by river 10.58, by sea 6.53, by road 24.75; ashlar by river 13.58). |
| R15 | earth moles facing the sea | APPLIED | sheltered water only for `earth_bank`; `harbour_no_material` folds `pier_no_material`. |
| R16 | the undercity's buildings | APPLIED, simplified | the host rule with origin `host` and the id `rock`; T116-33. **Simplified:** such a building draws nothing (R16 asked that it draw its six uniforms and discard them): every draw is keyed by the consumer's own lineage, so a building that draws nothing moves no other draw. |
| R17 | ruins at generation, positions, reach | APPLIED | generation credits from surface ruins; `MaterialLedger.rows[].at`; `materials.ruinsReachM` 1 500 m for the licence, the 250 m haul radius kept for clearance weighting. |
| R19 | the refurbishment's built value | APPLIED | (j) (2): a completed upward refurbishment writes `builtProsperity`, added to J-A31.44's list. |
| R20 | locks, removed partner, terrain edits, growth, standalone quarry | APPLIED | (l) and (o)'s rows; (j) (3) distinguishes a partner leaving at an epoch (fabric keeps its material) from a declared partner removed from the creation slice (an edit of the premise: re-pick); the timing sentences in (j) (4) and (5). |
| R21 | a dossier-implied bridge | APPLIED | (i) Bridges. |
| R22 | paving over epochs and its origin | APPLIED | (i) Paving; `Way.surfaceOrigin`. |
| R23 | thatch inside walled cities | APPLIED | `walledThatch` in (e), from `c13`. |
| R24 | the parity presets and the refinement | APPLIED | (n) and (m). |
| R25 | "never a universal ladder" kept | APPLIED | (m). |
| R26 (a)–(k) | precision items | APPLIED | (a) tie places in (g) (2); (b) the naming feature's wording; (c) tents; (d) `glass_sand` supplies none; (e) `Terrain.mining` declared; (f) closed-digest wording; (g) ~01:33; (h) T116-10 scoped to T116-4's fixture; (i) T116-3 counts a family native by ruins at its site as inside; (j) a harbour site and a river neighbour → `river`; (k) repairs reuse the fabric's own material. |

## 4. review-wiring.md (wiring and unit coverage)

| id | required change | decision | how, or why not |
|---|---|---|---|
| W1 | the declared partner pinned whole | APPLIED, option (a) | a licence only: outside `TradeFlow`, S3 (4)'s bearings and the Σ = 1 normalisation, weight 0, licensing by its `declared` source; bearing a `gate.pick` draw keyed by its key (the endpoint store reads it); `TradePartner.name`; the standalone fill order (derived per-bearing partners, then declared); the event `adjust('circumstances.trade')`. Option (b) rejected: a declaration would re-derive the town from S3 for a material licence. |
| W2 | shapes, cells, tables, one factor home | APPLIED, one part moot | the TS of every record; every factor on `MaterialDef.factors` (the climate, culture and era tables hold no material cell); the cell paths; V11 row 49's sub-tables and reader StageIds; "the class family's generic row" replaced by the default row. **Moot:** the one stone radius — realism R1 removed the radius from the native test, and II.7.6's `reachM` stays its own cell for laying workings. |
| W3 | draw keying | APPLIED | every pick on `material`, lineage and slot, no epoch component (E-03); the switch-off draws keep their streams; §6.1's readers. |
| W4 | report codes | APPLIED | each code with class F-MATERIAL and its landing; `NativeReason` a closed type in §2.7; `partner_no_supplies` moved to §14's `PortNote` kinds (it concerns a dossier record and lands in `dossierNotes`); V09's catalogue. |
| W5 | the supply slice | APPLIED | `SliceRef.kind 'supply'`, its trigger (creation-slice `Adjust`s and terrain edits), never an epoch; §7.3. |
| W6 | the enceinte's field, V07's draw, dossier records | APPLIED | see realism R4; a wall record naming stone is a dossier-declared material; "Town walls" without a material word takes the pick; J-V7.15 and T-V7-32 amended in V07's row. |
| W7 | producers and consumers | APPLIED | `slate`, `lead` producers and `market` demand; the good `straw` and the thatcher's family edge; `goodId` left unread (the label through `goodWords`); `BuildingClassRow.requiresFamily`; V11 §3.5.2 the one home of the refusal. |
| W8 | missing base sections | APPLIED | every row of W8's table is in (r) and HOMES: §2.8, §2.9, §2.3's `Terrain.mining`, §4.1/§4.12, S4/S5b, §4.13 and B-EDGE, §5.3, §7.3, §7.4, §8.1, §8.2's deficiency row and tile map, §8.11/§9.7/§11.6, §11.1's skeleton, §12.4, T8-5 and T26-1, §13.8. |
| W9 | volume parts missing | APPLIED | V04 (U-FORECAST, `Gallery.lining` — the field chosen over "no lining", for symmetry with `Tunnel.lining` —, vault spans, §3.13), V06 (structure hazards, repairs vs re-picks, T-V6-17), V07 (the kind draw), V01 (the recipe's creation-slice `trade`), V02 (§5.5), V09 (§4.3 bindings, catalogue keys), V10 (K19 in three places, the creation path), V11 (§1b, §2.1, §3.1, §2.8c, `pierSpacingM`, §3.20), V12 (§1, item-110 register lines), V08 (§1b, a T-V8 bar). The generic "every volume its §1b and lifecycle rows" is stated in (p)'s lifecycle sentence and the canon ruling. |
| W10 | single source | APPLIED | §4.11 states (j); V06 only its engine parts; §8.2 states `ink`, `lit` and `hatched` values, V01 only that `hatched` reads the covering, V07 `painterly`'s values. |
| W11 | one term per concept | APPLIED | `boards`; the ledger's `family`; the goods column `family`; V08's deposits column named `supplies` (not `family`: the row already has a resource-family column); "chimney"; item 114's "prosperity ceiling" and "highest allowed band", with "ceiling band" kept for item 72's range end; the land-use kinds named; "the top means" derived, never a cell; `ownerRule: '116 (n)'`. |
| W12 | the why at the build epoch | APPLIED, strike | the why gives the stored origin (partner, route, epoch) with today's candidates; no candidate list is persisted. Persisting was rejected: structures have no `DerivationRecord`, and the origin already says where and when a material came from. |
| W13 | per-wing covering | APPLIED | the main wing's form chooses the covering; a wing whose form rejects it takes `RoofSpec.material` (the cheapest its form admits) with `materialOrigin` — the field keeps its home and gains a writer instead of being retired; T116-17 checks per wing. |
| W14 | bridge feasibility at the router | APPLIED | S4 and S5b; the ford, then F-ROUTE's real rungs; `bridge_no_material` a ladder code. |
| W15 | `Way.material` scope | APPLIED | quay, pier and raised ways only; a structure way's surface follows its mass; the `quay_wall` case. |
| W16 | paving: slot and cost | APPLIED, option 1 | surfaces cost as their materials; a gate and a fallback that draw nothing. |
| W17 | the means interpolation | APPLIED | §2.6's own interval rule; the highest allowed band's row `[lo_c, lo_c + f(hi_c − lo_c)]`, continuous in the economy (robust to review-edges E1's continuous reading of item 114 if the 114 seat adopts it); `FieldBands.ceiling` cited. |
| W18 | one home per per-material property | APPLIED | flammability and flood on `MaterialDef`; Works by id or mass in §4.11; salvage and dwell in V11 §3.18; the tile map in §8.2; T116-32's totality. |
| W19 | tests and fixtures | APPLIED | H-NATIVE defined (a native-only timber village over 20 epochs, T116-25); (o)'s item-114 row matches T116-22; §4.13's EP row and B-EDGE; §13.8's schedule. |
| W20 | migration rows | APPLIED | as read rules (realism R18): non-id `Enceinte.material` values, `timber` → `boards`, the ledger's ids. |
| W21 | paint and override draws | APPLIED | (l). |
| W22 | a mixed building's credit share | APPLIED | (h)'s wall-area shares. |
| W23 | the legend's origin | APPLIED | a second legend line from §8.1's origin column. |
| W24 | DR41 family and covers; DR3 covers | APPLIED | (r) determinism row. |
| W25 | §7.8 registry rows | APPLIED | the Trade control, the two toggles, the switch through presets and the tables editor (not a panel control: R15's basic-panel budget, and the parity presets are the switch's only designed off path). |
| W26 | `painterly` values | APPLIED | V07 states them. |
| W27 | total id → tile map | APPLIED | eleven new tiles, a set of 26, at M2b; `hatched` at M5. |
| W28 | §5.3's row | APPLIED | unchanged, because institutions are now clamped; the licence invariant added. |
| W29 | milestones for V07 and V01 | APPLIED | V-M1 and M5. |
| W30 | II.7.6's reach from the frame origin | REJECTED | superseded by realism R1: the native test reads the creation arena, not a radius, and II.7.6's `reachM` stays measured from the town (its nearness order), with the surface-quarry fallback for a native site whose stone lies beyond it. |
| W31 | `access` typed | APPLIED | V08's access-key union; unknown → `road`, noted. |
| W32 | the features order | APPLIED | … sewer, fissile, lead. |

## 5. Consistency with items 114 and 115 (as drafted in `work/g114-115/`)

- The means reads item 114's highest allowed band through `FieldBands.ceiling`; its row in that band ends at
  `lo_c + f × (hi_c − lo_c)`, so the means is continuous in the economy whether 114's final seat keeps (c) (3) or adopts
  review-edges E1's continuous reads; the top means is that end (10 with no prosperity ceiling).
- A district's band range is read as item 114 (c) (5) lowers it; institutions are clamped at its ceiling band.
- No wealth term is added; item 115's gate adds nothing to the means.
- Terms follow 114's: "prosperity ceiling", "highest allowed band"; "ceiling band" stays item 72's.
- No DR number collides (116 claims DR41; 114–115 claim none); 116 mints no F-V8 receipt row (it reads F13 and F14),
  so 114's F-V8-8 is untouched.

## 6. Choices the program made on the owner's behalf (all vetoable, J122)

1. "Isolated" is named **native-only**; the road and access words keep their meanings.
2. Seven families; new materials `adobe`, `log`, `mud`, `stone_slate`, `rock`; `timber` (boards) renamed `boards`.
3. Native by land means **anywhere in the arena the settlement was created in**; nearness shows only in the price.
4. The dossier's **production records** (a quarry, brickworks, sawmill or thatcher; the Stone Quarrying and Timber Trade
   incomes; own chains and exports) make a family native.
5. A **depleted** deposit counts as worked in the past (native for what generation builds), not from the first live
   epoch; a **removed** one grants nothing.
6. **Ruins** are a second native basis, within 1 500 m of the building site; surface ruins credit the ledger at
   generation; a fallen island's rock counts as local stone.
7. Every named neighbour counts as a partner, with what its exports, resources or import links show; hostile or
   suppressed ones do not; a **declared** standalone partner licenses materials only and moves no gate or road;
   Surprise me declares none.
8. The **cost model**: base cost × factors + carriage per load; import premium 1.5; sea 0.15, river 0.45, road 1.5.
9. The **means** per band, the rung multipliers, the owner's wealth words on bands.
10. **Institutions** build at the top of their neighbourhood's bounds, never above (item 72 (d‴)); in stone or clay
    country they are always masonry; elsewhere timber unless their neighbourhood's bounds reach the traded stone.
11. **Public works** use the town's top purse per work (walls 0.8, gates 1.2, castle 1.5 …): a TOWN walls itself in stone
    by sea but not by river or road.
12. Cob and adobe only where there is neither wood nor fieldstone at hand.
13. Mixed buildings: whether by cost, where by weight (stone below, timber above).
14. A traded material reaches whoever can pay its landed price (not a hard "rich band only" gate).
15. A structure's **kind** (stone or timber bridge, masonry wall or earth rampart) follows the supply; a settlement
    with no material for one gets a ford, no pier or no raised way.
16. Edits win on the element; a district override never lets growth add a non-native material.
17. The history replay assumes today's partners stood through the replayed past.
18. One switch; the parity presets and older documents keep the old model byte for byte.
19. Fire ordinances, urban thatch bans, fuel-poor brick, timber scarcity at the large rungs, earth moles only in
    sheltered water: realism rows, each a cell.
