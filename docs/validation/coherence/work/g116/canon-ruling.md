## Ruling 2026-09-30 — g item 116 (building materials by terrain, resources and trade, paired with prosperity)

> Appended by the final seat of item 116 (Opus 5.5 standing in, PENDING FABLE REVIEW). Authority: the owner's rule
> (2026-09-30 ~01:05), its refinement (~01:10), "bundle all this with g114-115" (~01:12) and the adopted partner
> recommendation (~01:33), filed as OWNER RULE item 116 in docs/AMENDMENTS-2026-09-28g.md (J128). The working notes are
> docs/validation/coherence/work/g116/ (`final-notes.md` settles the three reviews).

**Routing.** Item 116 is new design at build depth in every unit it names; a verifier raises F-MISSING where a part is
absent and NUANCE-LOST where a part is thinned below the item. It is applied IN the Rewrite phase, bundled with items 114
and 115 (lateItems 114–116): the landed units — the base model, pipeline, determinism and rendering parts, V03 and V04 —
in a short late rewrite seat each; scope, V01, V02 and V05–V12 in their Rewrite. The kernel has no part. The owner's
refinement ("cant have non nattive materials or grow to have them until and unless they trade specifcially with another
settlement that has that material") binds every part. Each shared decision below has ONE home that STATES it; every
other unit REFERENCES it with a pointer and restates no value.

### The ruling on items 19 and 23

* **Superseded as the DEFAULT** (the owner's 2026-09-30 rule is newer and pairs material with neighbourhood prosperity and
  with terrain, resources and trade): item 19's FTG material default — "DEFAULT: that FTG model" (file b), J28's
  application of the owner's "emulation first", not an owner ruling on materials — i.e. V11 §3.19.3's default per-stage,
  district and class rows as the default and §2.6's "never by a material keyed to the prosperity band" with
  `MaterialRow.key.band` "absent from every default row"; and the roof-colour role by band in the default style sheets.
  The default material is item 116 (g)'s pick over (d)'s supply. J-A19.21 is superseded by J-A116.21.
* **Kept:** item 19's owner words and its (a) ("materials and roofing" in each designation's prosperity-scaled template),
  which agree with item 116; "never a universal ladder" (the cost order is each settlement's own); the lifestyle-banded
  pools; "a MATERIAL IS A RENDERING ATTRIBUTE ONLY" for every building and for every structure's material within its kind
  (T19-3 extended by T116-2). For structures the vetoable reading: the kind (stone or timber bridge, masonry curtain or
  earth rampart, masonry or timber raised way) is a structural choice the supply constrains, as §4.8's bridges already are
  by era and prosperity rows and item 110 (b)'s pier spacing by masonry or timber. J-A19.41 – J-A19.43 stand; J-A19.81
  stands under the FTG preset and with the switch off.
* **Item 23:** the owner's "I still want it to be based in our base of MFCG and FTG emulation first" is kept wherever a
  parity preset asks — `materials.supply.enabled` is off under `MFCG`, `FTG`, `VG` and `NG` (`FM` zeroes none) and for
  every document written before item 116, which replays byte for byte (T116-1). The licence (no material outside the
  supply but by a dossier fact, an author's act, the parity rows or an underground host) is an absolute of the model while
  the switch is on — the ONE exception to §7.6's "tendencies, never fixed laws"; the reading rule is met in that the whole
  model is one cell a preset or the author may turn off.
* **The regional shift** (`extension: 'regionalShift'`, `MaterialRow.key.band`) is retired and folded: its rows become a
  region pack's `MaterialDef.factors.region` cost rows; D-2's region preset carries them; `EraRow.region` keys them,
  `EraRow.materialRows` the parity rows.
* **Amended judgments:** J-A8.45 (the ledger never creates a material; the ruins basis), J-A26.42 (the timber shortfall
  through a partner, else `timber_short`), J-A65.45 (quarry voids from native-land stone, structures included), J-A31.44
  (a completed upward refurbishment writes `builtProsperity`).

### Canonical homes of the shared decisions

| decision | STATED at (one home) | cited by |
|---|---|---|
| the vocabulary (native, traded, unavailable, native-only, family, material, means, top means, work's means, origin, mixed) and the owner's wealth words on bands | model §2.6 (terms also in scope §0's index) | every unit |
| `MaterialFamily`, `MaterialMass`, `MaterialSlot`, `MaterialDef`, `MaterialPreference`, `MaterialMixRow`, the parity `MaterialRow`, `BuildingMaterial`, `MaterialOrigin` (types) | model §2.6 | V11 (rows), V02, V03, V06, rendering |
| every row and cell value (`defs`, `preferences`, `mixes`, `parity`, `settings`; relief P(slate), P(flag), P(lead); goods `family`, `slate`, `lead`, `straw`; `requiresFamily` rows; salvage and dwell per id; `earthwork` section rows; culture and region factors) | V11 (row 49 `materials`; §2.5; §3.5.2; §3.7; §3.18; §3.19; §3.24) | model, pipeline, V02, V04, V06, V07, V12 |
| the cost formula (base × factors + carriage per load; ruins; traded with the premium; the site factors) | model §2.6 | pipeline S11, S7, §4.11; V11's cells |
| the means (the band interval rule, `rungMeans`, the top means continuous in item 114's highest allowed band, institutions' clamp inside the district's band range, works) | model §2.6 | pipeline, V02, V05, V07, V01; item 114's §4.5 |
| the pick (row order, candidates, the earth-wall admission, fallback, places, affordable and next, the blend, the four and two draws) | model §2.6 | pipeline S3/S5a/S4/S5b/S7/S10/S11, §4.11, II.7.2; V07 |
| the mix (parts, eligibility, the parts' shares, chimneys, the per-wing covering) | model §2.6 | V02 (facets), V03 (plan), V04 (volumes), V11 §3.18 (credits), rendering |
| `MaterialSupply`, `NativeReason`, the structures' material and origin fields, the ledger's `family` and `at`, `Terrain.fissile`/`.lead`/`.mining`, `Way.material`/`surfaceOrigin`, `RoofSpec.material`/`materialOrigin`, `SliceRef.kind 'supply'`, the thematic key `materials` (records) | model §2.3–§2.9 | every reader |
| the native tests (the creation arena; thresholds as V11 cells; the dossier's deposits and production records; ruins basis and reach; generation's ruin credits) and their derivation step S1 (11) with S3's carriage | pipeline §4.2 S1 (11) | V04, V07, V08, V11 |
| the producer gates, the refusal of the generic import for material goods, the timber shortfall and scarcity | V11 §3.5.2 (the refusal's text); pipeline §4.2 S2, §10.2, §4.9 (the gates, the shortfall) | V08, V12 |
| enceinte construction by mass, the pick at S3/S5a, gates, towers, the crest; bridges at the router; harbour works; retaining walls and raised ways; the dossier-implied bridge | pipeline §4.2 S3, §4.4 S5a, §4.3, §4.8, §4.7 S10 | V07 (village kinds), V11 (rows), V04 (vault spans) |
| paving's gate over the surface table | V01 §3.7.3 (the table and its gate) | pipeline S10a, V11 row 90 |
| the underground: linings, host buildings, quarry voids with structures, the forecast | pipeline II.7, II.7.2, II.7.6 (rules); V04 §3.5.3 and U-FORECAST (build) | V03 |
| materials over time (standing fabric, re-picks, refurbishment, partners arriving and leaving, sources, ruins stock, fire ordinance, the replay) | pipeline §4.11 | V06 (engine parts only), V07 |
| `TradePartner` (name, supplies, distanceM, `declared`), layer 2's standalone fill and declared partners outside `TradeFlow`, DR3, DR15, DR41, the closed-digest admission | determinism §7.7 | V08 (fill rows), V09 (Trade control), V10 |
| the switch `materials.supply.enabled`, its presets, the licence's exception | determinism §7.6 | V11 (cell), V12 (`ownerRule '116 (n)'`), rendering (`lit`) |
| F-MATERIAL and its ladder; the report codes with class and landing; the §5.3 licence invariant | determinism §5.2, §5.4, §5.3 | V09 (catalogue), every stage |
| the `material` stream (keying, readers, no epoch component) and the `blueprint.features` order (… sewer, fissile, lead) | determinism §6.1 | pipeline, V06, V07 |
| edit paths, locks and pins, overrides and their growth rule, the dossier-map refusal, migration reads | determinism §7.1–§7.5 | V09, V10 |
| roles `wall.<id>` / `roof.<id>` and their `ink`, `lit`, `hatched` values; the id → tile map; `lit`'s roof by covering; the Materials view, legend, export fields and why | rendering §8.1, §8.2, §9.5, §11.1, §11.2 | V01 (hatched reads the covering), V07 (`painterly` values are V07's own), V09 |
| `painterly`'s material role values | V07 §5.1 | rendering |
| the bars T116-1 – T116-34, T8-5 and T26-1 amended, the schedule; §14's digest fields; §16's milestones; the judgment rows | scope §13.2, §13.8, §14, §16, the register | every unit |
| `DossierDigest.economy.partners[].exports?`, `.resources?`, `.access?` and the `PortNote` kind `partner_no_supplies` | scope §14 | V08, determinism DR3 |
| DR3's fill rows, the deposits row's `supplies` column, the production records' rows, the `materials` row → id and family | V08 §2.4, §2.6 | determinism §7.7 |
| the critique row K19 and the `material` why section | V10 | V09 (catalogue) |
| the bar-map rows and register lines | V12 | scope §13.2 |

### Per unit — what each STATES and only REFERENCES

* **model (§2), late seat.** STATE: §2.6's *Materials* rule rewritten (item 116 (a), (e), (f), (g), (h), (m)); the types
  of the homes table; `RoofSpec.material` and `materialOrigin` as the wing's covering (writer S11); §2.7's `MaterialSupply`,
  `NativeReason`, `MaterialLedger.rows[].family` and `.at`, `Enceinte.materialOrigin` and `crest`, `Gate.material`/
  `materialOrigin`, `Bridge.material`/`materialOrigin`, `RetainingWall.material` (a `MaterialDef` id)/`materialOrigin`,
  `Tunnel.lining`/`liningOrigin`, `Gallery.lining`/`liningOrigin`; §2.4's `Way.material`/`materialOrigin`/`surfaceOrigin`
  and `surface` `'brick'`; §2.5's `materialOverride` retyped; §2.3's `Terrain.fissile`, `.lead` and `.mining`; §2.8's
  registry rows for the new edit paths, `factTier` for origin `dossier`, `SliceRef.kind 'supply'`; §2.9's
  `Document.derived.materialSupply` and thematic key `materials`. REFERENCE: §4 (producers), §7 (edits, DR rows,
  `TradePartner`), §8 (roles), V11 (values).
* **kernel (§3).** No part.
* **pipeline (§4, §10, PART II, PART III), late seat.** STATE: S0's `fissile` and `lead`; S1 (10)'s draws and the struck
  "only II.7.6 reads `Terrain.mining`"; S1 (11) and S3's carriage; S2's producer gate and the thatch-family edge; S3's and
  S5a's enceinte pick and construction; S4's and S5b's bridge feasibility; S7's towers, gates, castle, bridges, harbour
  works; S10's retaining pick; S10a's surface gate (citing V01's table); S11's building pick, institutions, deck
  buildings, per-wing covering, tents, host buildings; §4.9's native land uses, shortfall and scarcity; §4.11's item 116 (j)
  whole and its Works by mass; §4.1/§4.12 stage I/O; §4.13's EP row; §10.2's `requiresFamily`, `salvageM3` by id with
  family credits, the refusal's citation, the corrected sentence on which rows name a material; II.7.2's lining pick; II.7.6's
  quarry voids from native-land stone (structures included), `reachM` from the town, the surface-quarry fallback; II.7's
  S7b stone-stock forecast. REFERENCE: §2.6 (pick, types), V11 (cells), V06 (engine), V04 (U-FORECAST build), V01 (surface
  table).
* **determinism (§5–§7), late seat.** STATE: §5.2 F-MATERIAL; §5.3's licence invariant (the neighbourhood-character row
  unchanged); §5.4's codes; §6.1's `material` row and the features order; §6.2's leaf-digest note; §7.1's edit paths;
  §7.3's locality for the partner and switch `Adjust`s; §7.4's lifecycle rows; §7.5's migration reads; §7.6's switch,
  presets, retired regional shift and the licence exception; §7.7's `TradePartner` fields, layer 2's standalone fill and
  declared partners, DR3 and DR15 amended, DR41, the closed-digest admission, item 9's tiers; §7.8's registry rows.
  REFERENCE: V08 (fill), V09 (controls), §2.6.
* **rendering (§8, §9, §11, §12), late seat.** STATE: §8.1's columns; §8.2's roles and palette rows in `ink`, `lit`,
  `hatched` for every id, contrast rows, `lit` by covering while on, `ink`'s pattern, the id → tile map (eleven new tiles,
  26 in all, M2b; `hatched` at M5), mixed facets, chimneys, per-wing covering, boundary walls, the deficiency row and the
  Materials row; the Materials `ThematicRow` with item 112's cue; §8.11, §9.7, §11.6 edge rows; §9.5's legend; §11.1's
  export fields and skeleton; §11.2's `why`; §12.4's two budget rows. REFERENCE: V02, V03, V09, V07's `painterly`.
* **scope (§0, §1, §13–§17, register), Rewrite.** STATE: §0's row for item 116, item 19's row amended, the index terms;
  §1's buildings row; §13.2's T116-1 – T116-34, T8-5 and T26-1 amended; §13.8's rows; §14's partner fields and the
  `PortNote` kind; §16's milestones (J-A116.01); D-2 amended; J-A116.01, .21, .41 – .48, .61, .81. REFERENCE: every other
  unit.
* **V01.** STATE: the paving gate over §3.7.3's table (surface-to-material costs, `brick` row, fallback order, epoch rule);
  `hatched`'s roof program reads the covering (NG's tones under `NG`); the `material` naming feature; the lone
  neighbourhood's supply from its recipe's creation-slice `trade`; M5. REFERENCE: §2.6, §2.7, §8.2.
* **V02.** STATE: the mix parts' facets and shares; roofscape and façade programs per part, the per-wing covering; §1b's
  trace rows; the mutator's exception (a completed upward refurbishment re-picks); deck buildings' row; §5.5's exports by
  part; T-V2-25 extended and a bar that the heavier part is below. REFERENCE: §2.6, §4.7 S11.
* **V03, late seat.** STATE: the exterior-wall fill per storey and gable segment; chimneys in the heavier material; no
  thickness, opening or stair reads material; host styling from origin `host`. REFERENCE: §2.6.
* **V04, late seat.** STATE: §3.5.3's volume law over native-land stone with structures, linings and part shares; no
  workings on a stoneless site; the surface-quarry fallback; U-FORECAST's stone stock; `Gallery.lining`; `vault` spans and
  `archVault` only under masonry; ancient ruins' credits; §3.13's edge rows. REFERENCE: II.7.2, II.7.6, §2.7.
* **V05.** STATE: the landfall's `stone` credit at its face; island buildings on the settlement's supply; island rock,
  conjured water and magical structures no source or material; item 115's gate unchanged. REFERENCE: §2.6, §2.7.
* **V06.** STATE: its engine parts only — `EVO_PRELUDE`'s supply step; §3.11.2 (4)'s ordinance with
  `fire.ordinanceStretch` beside `fire.rebuildShift`; the hazard reads of `flammability` and `floodCollapse`; structure
  repairs in kind versus re-picks; the chronicle lines; H-TRADE, H-NATIVE, H-QUARRY, H-WOODS; T-V6-16 stratified, T-V6-17
  amended. REFERENCE: §4.11, V11.
* **V07.** STATE: the village through `rungMeans`; `v.` rows; the kind draw over admitted kinds and the REPLACEMENT's
  retype; `roof.palette` and `painterly`'s values; the "geology row" citations replaced; the wall records' materials
  (J-V7.15, T-V7-32 amended); the entry store; `roads: isolated` a road form only; a village bar at V-M1. REFERENCE: §2.6,
  §2.7.
* **V08.** STATE: DR3's supplies fill rows, the three partner fields and `name`; the access-pair rows; the `deposits` row's
  `supplies` column and `precious_metals` → lead; the production records' rows; the `materials` row → id and family; the
  note `partner_no_supplies`; the consequence statement; the adapter; §1b rows; a T-V8 bar. REFERENCE: §7.7, §14.
* **V09.** STATE: the Materials view, legend words and origin line; the About tab's material, origin chip and "Why this
  material?"; the Trade control (advanced panel); the `fissile` and `lead` toggles; the dossier map's trade panel and
  refusal alternatives; `paint`'s two targets; §4.3's bindings; the catalogue keys. REFERENCE: §2, §11.2.
* **V10.** STATE: the `material` why section; K19 (`CritiqueFinding`, T-V10-17, CVR-V10-4); the creation-mode partner path;
  the chronicle answers. REFERENCE: §11.2, V06.
* **V11.** STATE: every row and cell of the homes table; §2.8c's two material fields retired into preference rows;
  `pierSpacingM` by mass; §3.20's words; T-V11-28 and the compile totality; §1b, §2.1, §3.1 rows with readers; register
  lines; C1. REFERENCE: §2.6, §7.7, §4.11.
* **V12.** STATE: §1's owner-rule entry `'116 (n)'`; bar-map rows for T116-3 – T116-7, T116-10, T116-16 – T116-22,
  T116-25; register lines for every new cell (the switch never calibrated); the item-110 material lines re-pointed; the
  switch's preset resolution; the known-city fixtures' supply; `MeasureInput`'s material records. REFERENCE: §13.2.

### New ids and their owners

| id | what | home (states) | the unit whose part makes it pass |
|---|---|---|---|
| T116-1 | no-op pin | scope §13.2 | determinism (§7.6), V11 (parity rows) |
| T116-2 | texture only (T19-3 extended) | scope §13.2 | model (§2.6), V02 (T-V2-25) |
| T116-3 | the licence | scope §13.2 | pipeline (S1 (11), the picks), determinism (§5.3) |
| T116-4 – T116-7 | the owner's examples and the reverse | scope §13.2 | pipeline (S11), V11 (rows), V12 (bar-map) |
| T116-8 | cost | scope §13.2 | model (§2.6), V11 (cells) |
| T116-9 | monotone pick | scope §13.2 | model (§2.6), determinism (§6.1) |
| T116-10 | mixed | scope §13.2 | model (§2.6), V02 |
| T116-11 | one native test | scope §13.2 | pipeline (S1 (11)); V04, V07, V11 read it |
| T116-12 | the dossier's facts | scope §13.2 | determinism (DR41), V08 |
| T116-13 | partners | scope §13.2 | determinism (DR3), V08 |
| T116-14 | web and producers | scope §13.2 | pipeline (S2, §10.2), V11 (§3.5.2, §3.7) |
| T116-15 | earth only and the floor | scope §13.2 | determinism (§5.2), pipeline (S11) |
| T116-16 – T116-21 | everything native, desert, marsh, mountain, port, rungs | scope §13.2 | pipeline (S11), V11, V12 |
| T116-22 | item 114 | scope §13.2 | model (§2.6 means) with item 114's §4.5 |
| T116-23 | islands | scope §13.2 | V05 |
| T116-24 – T116-26 | history, links and sources over epochs | scope §13.2 | pipeline (§4.11), V06 (fixtures H-TRADE, H-NATIVE, H-QUARRY, H-WOODS) |
| T116-27 | structures | scope §13.2 | pipeline (S3, S5a, S4, S5b, S7, S10), V11, V07 |
| T116-28 | paving | scope §13.2 | V01, pipeline (S10a) |
| T116-29 | institutions | scope §13.2 | model (§2.6), V11 (prestige rows) |
| T116-30 | overrides, locks and the dossier | scope §13.2 | determinism (§7.1–§7.3) |
| T116-31 | determinism and load | scope §13.2 | determinism (§6.1, §7.3) |
| T116-32 | why, legend, export, compile | scope §13.2 | rendering (§9.5, §11.1, §11.2), V11 (compile), V10 |
| T116-33 | the underground | scope §13.2 | pipeline (II.7), V04 |
| T116-34 | fire, flood and Works | scope §13.2 | pipeline (§4.11), V06 |
| extended bars | T8-5, T19-3, T26-1 (scope); T-V2-25 (V02); T-V6-16, T-V6-17 (V06); T-V7-32 (V07); T-V10-17, CVR-V10-4 (V10); T-V11-28 (V11) | their units | — |
| new volume bars | V02's heavier-part-below bar, V07's native-only village bar, V08's fill bar — each at its volume's next free id | V02, V07, V08 | — |
| F-MATERIAL | the failure class | determinism §5.2 | every picking stage |
| DR41 | the material supply row (DR3, DR15 amended) | determinism §7.7 | V08 |
| report codes | `material_floor`, `material_kind_substituted`, `ruins_stock_short`, `fire_rebuild_unavailable`, `bridge_no_material`, `harbour_no_material`, `raised_no_material`, `retaining_no_material`, `material_unsupplied`, `timber_short`, `material_dossier`, `material_edit_unsupplied`, `override_share_dropped` | determinism §5.4 | V09 (catalogue) |
| port note | `partner_no_supplies` | scope §14 | V08 §4.6 |
| judgments | J-A116.01, .21, .41 – .48, .61, .81 | scope (register) | — |
| critique | K19 | V10 | V09 |
| fixtures | H-TRADE, H-NATIVE, H-QUARRY, H-WOODS | V06 | scope §13.2 |
| cells | `materials.*` (row 49 `settings`), `fire.ordinanceStretch` (V06's fire row) | V11; V06 | — |

### Agreement checks for this item

* The means read the same highest allowed band as item 114 (`FieldBands.ceiling`), continuous in the economy; a
  district's band range as item 114 (c) (5) lowers it; no wealth term of 116's own; item 115's gate adds nothing.
* One native threshold per family: V04's quarry cells, V07's village gates and V11's `requires` rows read V11's
  `materials.native.*` cells; no unit keeps its own.
* One refusal of the generic import: V11 §3.5.2's text; §10.2 and V08 cite it.
* One ledger: keyed by `family` with `at`; V04, V05, V06 and V11 §3.18 credit and debit by family.
* One partner record: `TradePartner`; V08 fills `supplies`, the pipeline reads it, V09 declares it standalone; no unit reads
  SettlementForge's trade fields but DR3's fill.
* One parts geometry for a mixed building's shares: model §2.6; V02, V04, V11 §3.18 and V12 read it.
* Terms: "prosperity ceiling" and "highest allowed band" as item 114 names them; "ceiling band" item 72's; "stony ground"
  (never "poor ground"); `boards` (never the id `timber`); "chimney" (never "stack" for it); "native-only" for the
  owner's "isolated".
