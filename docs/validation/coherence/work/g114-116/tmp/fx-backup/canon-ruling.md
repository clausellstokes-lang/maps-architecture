## Ruling 2026-09-30 — late owner rules 114, 115 and 116: routing, homes, tests, and the program's correction of item 115

> Written by the bundle's consistency check over items 114–116 (Opus 5.5 standing in, PENDING FABLE REVIEW). It
> replaces the two drafted rulings (`work/g114-115/canon-ruling.md`, `work/g116/canon-ruling.md`), which are not
> appended. The filed text is `work/g114-116/items-114-116.md`; the routing twin, one list over all 18 units, is
> `work/g114-116/routing.json`; every clash found between the three items and how it was fixed is
> `work/g114-116/consistency-report.md`.

**Basis.** Three OWNER RULE items reached the program after this canon was built and are filed together in
`docs/AMENDMENTS-2026-09-28g.md`: item 114 (the economy slider sets the map's prosperity ceiling at the first
generation; owner ~00:50; J126), item 115 (floating islands at the first generation need both high magic and a high
economy; owner ~00:55, replaced ~00:58; J127) and item 116 (building materials from terrain, resources and trade, paired
with prosperity; a material that is not native exists only by trade with a named settlement that has it; owner ~01:05,
refined ~01:10; J128). The owner bundled them twice: "bundle these into the rewrite phase" (~01:00, items 114 and 115)
and "bundle all this with g114-115" (~01:12, item 116 with them). He adopted the program's recommendation on which trade
partners count (~01:33): "note that we are reworking trade as we speak. but for now its your recomendation". So every
unit the three items name applies its part IN the Rewrite phase at build depth, the three items together. The items are
owner rules and sit at the top of this canon's precedence (*Precedence and home rules*): where they change standing base
or volume text, the item wins and the unit named below rewrites that text. This ruling fixes the one canonical home of
every shared decision; every other unit cites it.

**The program's correction of item 115 (2026-09-30 ~03:15, `work/g114-115/program-correction.md`; binding).** The
owner said "only high magic ON THE SLIDER allows for floating islands in the initial generation", then "both high magic
and high economy". Item 115's final read SettlementForge's word `magicLevel: 'high'` alone and left the slider unread. The
filed item reads: **high magic** holds where magic exists — the magic in force is not `none` — and either the **magic
priority** (`Intent.magicPriority`: hosted, SettlementForge's resolved `config.priorityMagic`, read once at creation;
standalone, the Magic slider) is at or above `gate.magicMin` (75, inclusive, the program's pick, the same as the economy
clause's) or the magic in force is `high`; never where magic does not exist (`magicLevel` `none` or `magicExists` false,
which V08's `magic` row reads as `none`). Absent and out-of-range values as the economy's (50, clamped; `value_absent`,
`value_clamped`). Standalone, the Magic control is a 0–100 slider (default 50, high at 75 or more) with a switch "No magic
in this world", on by default (D-3), at the home and label the final gave the None · Low · High control; the switch is
the creation slice's magic word, and, off, the word follows the slider (`high` at 75 or more, else `low`), so the lights,
the magic-gated classes, the access kinds and the gate read one magic. The fixture for high magic sets `priorityMagic`
100 and, separately, the word `high`. Everything else of item 115 stands as finalised.

**Seats.** Late seats (landed units with a part): **model** (114, 115, 116), **pipeline** (114, 115, 116),
**determinism** (114, 115, 116), **rendering** (114, 116), **V03** (116), **V04** (116). Landed with no part, no seat:
**kernel**. Main rewrite: **scope, V01, V02, V05, V06, V07, V08, V09, V10, V11, V12**. The two drafted rulings
disagreed here (114–115's listed V03 and V04 without a seat; 116's listed the kernel with a late seat and no part); this
list governs.

### The ruling on items 19 and 23 (item 116)

* **Superseded as the DEFAULT** (the owner's 2026-09-30 rule is newer and pairs material with neighbourhood prosperity
  and with terrain, resources and trade): item 19's FTG material default — "DEFAULT: that FTG model" (file b), J28's
  application of the owner's "emulation first", not an owner ruling on materials — i.e. V11 §3.19.3's default per-stage,
  district and class rows as the default and §2.6's "never by a material keyed to the prosperity band" with
  `MaterialRow.key.band` "absent from every default row"; and the roof-colour role by band in the default style sheets.
  The default material is item 116 (g)'s pick over (d)'s supply. J-A19.21 is superseded by J-A116.21.
* **Kept:** item 19's owner words and its (a), which agree with item 116; "never a universal ladder"; the lifestyle-banded
  pools; "a MATERIAL IS A RENDERING ATTRIBUTE ONLY" for every building and for every structure's material within its kind
  (T19-3 extended by T116-2). For structures the vetoable reading: the kind (stone or timber bridge, masonry curtain or
  earth rampart, masonry or timber raised way) is a structural choice the supply constrains. J-A19.41 – J-A19.43 stand;
  J-A19.81 stands under the FTG preset and with the switch off.
* **Item 23:** "I still want it to be based in our base of MFCG and FTG emulation first" is kept wherever a parity preset
  asks — `materials.supply.enabled` is off under `MFCG`, `FTG`, `VG` and `NG` (`FM` zeroes none) and for every document
  written before item 116 (T116-1). The licence is an absolute of the model while the switch is on — the ONE exception to
  §7.6's "tendencies, never fixed laws"; the reading rule is met in that the whole model is one cell a preset or the
  author may turn off.
* **The regional shift** is retired and folded into a region pack's `MaterialDef.factors.region` cost rows (D-2's region
  preset; `EraRow.region` keys them, `EraRow.materialRows` the parity rows).
* **Amended judgments:** J-A8.45, J-A26.42, J-A65.45, J-A31.44 (item 116 (j), (k), (i)).

### Canonical homes of the shared decisions

| decision | home (STATES) | cited by (REFERENCES) |
|---|---|---|
| `Intent.economyPriority?` and `Intent.magicPriority?` (0–100, absent 50); `wealthLevel` optional; "the wealth level in force" and its derivation row; the standalone magic word's derivation row (switch on: `none`; off: `high` at 75 or more, else `low`); Surprise me (the economy drawn as 100 × the wealth draw; no magic priority, no partner — Surprise me draws intent only and leaves the circumstances) | determinism §7.7 layer 1 | pipeline §4.2 S0, §4.7 S10b (2), II.7.1; V01, V05, V07, V09, V10, V12 |
| the one-click defaults (the Economy 50 with the wealth level derived 0.5; the Magic 50 with no magic in the world; the materials switch on) | scope §1.2 | pipeline II.7.1; determinism §7.8 |
| the registry rows `intent.economyPriority` (S0), `circumstances.magic` (the switch, S2), `intent.magicPriority` (S2, stepped at 75), `circumstances.trade` (S1 (11)), the `fissile` and `lead` toggles (S1 (10)), the materials switch (presets and tables editor); the basic panel's Economy; the advanced Wealth level and Follow the Economy; the Islands control's states | determinism §7.8 | V09 (screens, words), V05 §4.1, V10 |
| the prosperity ceiling whole — `ceilingAt` and its callers (S2, the epoch prelude, item 116's S3–S5b picks), the wealth lift, the fold and the demand split, the cuts and the fixed-cut rule, the continuous reads, the band-range rule, precedence and held bands, the forced seat, the record's writing rule and readers, the table's default rows, parity entries and limits | pipeline §4.5 | every volume that reads bands; model §2.6 (the means); V11 row 6 |
| `BandSet` (declared once), `BandCeilingRow`, `FieldBands.ceiling?` | model §2.5 | pipeline §4.5, V11 |
| the means under the prosperity ceiling (band `c`'s interval row, its upper end `R*_c`'s; the top means by `ceilingAt` before S6, by the record after, by the prelude's position at an epoch; a held band's own row; a row-less band interpolated) and THE VERY RICH ARE THE RICH BAND — a capped town builds no house or institution of river- or road-borne stone, sea-borne stone only from a near partner | model §2.6 (item 116 (f)) | pipeline §4.5 (114 (c) 4 points to it), S3–S11, §4.11; V01, V02, V05, V07 |
| the settlement's own facts gaining the economy and magic priorities at creation; the creation slice's magic word beside the typed slices; `recipe.layers.islands` = `Recipe.params['layers.islands']` | model §2.8, §2.9 | determinism §7.7 items 9, 11; V05, V08, V10 |
| dossier ownership keyed to the creation's absorb; item 9's facts; item 11's refusals in one list — an adjust of a dossier-supplied economy priority (114), of a dossier-supplied magic priority or magic word (115), a declared island in a world the dossier states magic-less (115), a map-side trade partner on a dossier map (116); the islands setting's refusal withdrawn (115) | determinism §7.7 items 9, 11 | V08, V09, V10 |
| §7.7 item 1's never-read list narrowed ("… but `priorityEconomy` and `priorityMagic`, each read once at creation (items 114, 115)"); the closed-digest admission of 116's three partner fields; item 86's list otherwise unchanged | determinism §7.7 item 1 | V08 (J-V8.45, BCR-V8-25, T-V8-20) |
| DR6, DR7, DR9 gaining `settlement.economyPriority`; DR8's wealth level in force; DR27 gaining `settlement.economyPriority` and `settlement.magicPriority` beside `site.magic`; DR3 and DR15 amended; DR41 new | determinism's derivation table | V05 §4.4, V08 |
| `TradePartner` (name, supplies, distanceM, `declared`), layer 2's standalone fill and declared partners outside `TradeFlow` | determinism §7.7 | V08 (fill rows), V09 (Trade control), V10 |
| the epoch prelude's ONE order: (1) the epoch's slice (the magic in force, the partners), deposit states and `TradeFlow`; (2) the lived wealth (`EpochInputs.wealthLevel`); (3) the prosperity ceiling's position; (4) the material supply; then S2's delta demand (folded at (3), producer demand reading (4)) and the builds (materials at (3)'s top means); the island gate reads (1) and the recorded priorities | pipeline §4.11 | V06 (EVO_PRELUDE builds it), items 114 (e) and 116 (d) |
| the epoch parts of 114 (the cut rewrite, `EpochInputs.wealthLevel?`, history-first and refounding) and of 116 ((j) whole) | pipeline §4.11 | V06 (engine parts), V07, V08 (F9, F13, F14) |
| the island gate's clauses and order (high magic as corrected), the parity clause dropped, forced slots, the count after the gate, what rises and what stands, the wane under magic `none` in force, the access conversion, the destruction fall | pipeline II.6 (and S7b (5), §4.11) | V05, V06, V07 |
| `IslandRule.gate` cells and their defaults (`magic: ['high']`, low/high only; `magicMin` 75; `economyMin` 75) | V05 §2.4 | II.6, V11 row 56 |
| `SkyGate` (with `magicPriority` on the magic clause), `skyGate(...)` (`dossierOwned` with `magicPriority`), a clause's dossier source, its callers, the report entry's args | V05 §3.2 (1) | II.6, determinism §7.8, V09, V10 |
| the material rule's vocabulary, types, cost, pick and mix | model §2.6 | every unit |
| `MaterialSupply`, `NativeReason`, the structures' material and origin fields, the ledger's `family` and `at`, `Terrain.fissile`/`.lead`/`.mining`, `Way.material`/`surfaceOrigin`, `RoofSpec.material`/`materialOrigin`, `SliceRef.kind 'supply'`, the thematic key `materials` | model §2.3–§2.9 | every reader |
| the native tests and S1 (11) with S3's carriage | pipeline §4.2 S1 (11) | V04, V07, V08, V11 |
| the refusal of the generic import for material goods | V11 §3.5.2 (the text); pipeline §4.2 S2, §10.2, §4.9 (gates, shortfall) | V08, V12 |
| structures (enceintes by mass, gates, towers, bridges at the router, harbour works, retaining walls, raised ways, the dossier-implied bridge) | pipeline §4.2 S3, §4.4 S5a, §4.3, §4.8, §4.7 S10 | V07, V11, V04 |
| paving's gate over the surface table | V01 §3.7.3 | pipeline S10a, V11 row 90 |
| the underground's materials (linings, host buildings, quarry voids with structures, the forecast) | pipeline II.7, II.7.2, II.7.6 (rules); V04 §3.5.3 and U-FORECAST (build) | V03 |
| the switch `materials.supply.enabled`, its presets, the licence's exception | determinism §7.6 | V11, V12 (`'116 (n)'`), rendering (`lit`) |
| `ReportCode` `islands_gated` and the thirteen material codes with class and landing; F-MATERIAL; §5.3's rows (no band above the highest allowed band but a held entity; no rule-driven rising under a closed gate; the licence invariant) | determinism §5.2, §5.3, §5.4 | V05, V06, V09 (catalogue) |
| fates `held_above_ceiling`, `held_against_magic`, `held_against_economy`, `held_against_supply` (V05's island supply law, never item 116's material supply) as `EditFate { fate: 'kept', reason }` | determinism §7.4 | pipeline §4.5, V05 §4.2, V09 (`fate.held.*`) |
| the `material` stream and the `blueprint.features` order (… sewer, fissile, lead); edit paths, locks, pins, overrides, migration reads | determinism §6.1, §7.1–§7.5 | pipeline, V06, V07, V09, V10 |
| roles, palettes, tiles, `lit` by covering, the Materials view's legend, exports and why; the Wealth key's closing line ("Richest here: {band}") | rendering §8.1, §8.2, §9.5, §11.1, §11.2 | V01, V07 (`painterly`), V09 |
| `DossierDigest` additions (`settlement.economyPriority?`, `settlement.magicPriority?`, `site.magic?` optional, `economy.partners[].exports?`/`.resources?`/`.access?`); `PortNote.kind` gaining `value_absent`, `value_clamped`, `frozen_fact_changed` (args `field`, `was`, `now`), `partner_no_supplies` | scope §14 | V08, determinism §7.7 |
| V08's adapter and row sets, in one order: §2.4's field table admits `config.priorityEconomy`, `config.priorityMagic`, `config.magicExists` beside `config.magicLevel`, and `neighborRelationship.primaryExports`, `.activeChains[].resourceKey`, `.tradeRoute` — never `_config` or `economicState.priorities`; §2.6's `magic` row (moderate → low; `magicExists` false → none; absent or unmapped → no `site.magic`), `deposits`' `supplies` column, the access pairs, `materials`, the production records; §3.5's settlement row (both priorities) and `site` row (word and `magicExists`) writing `frozen_fact_changed` (W-DOS-08), `wealth` row (W-DOS-02); §4.6's notes; §2.7's lifecycle rows; ONE T-V8-20 ignore clause for the three items | V08 | scope §14, determinism §7.7 |
| the controls' placement: T1's basic panel holds the Economy in the wealth slider's place (twelve controls); the advanced panel groups by consuming stage (V09 §4.14) — "Site": the Economy, the Wealth level, the Trade control; "Programme": the Magic; the Islands control links to the Magic and the Economy; a dossier map shows the Economy and the Magic locked, its trade read-only | V09 | determinism §7.8 |
| every V09 key of the three items | V09 | V05, V06, V10 |
| `IntendInput.economy?`, `.islands?`, `.magicPriority?`; the lexicon's wealth rows (economy), magic row (`magic` low · high with `magicPriority` 50 · 90) and islands row; §4.1's encoder (creation mode writes intent, circumstances and params into the new document; edit mode the registry's adjusts); `FieldDrivers.ceiling?`; the `material` why section and K19 | V10 | pipeline §4.5 (`drivers()`), V09 |
| `EpochReport.islandsGated`; EVO_PRELUDE in §4.11's order; the fire ordinance and hazard reads; H-TRADE, H-NATIVE, H-QUARRY, H-WOODS | V06 | determinism §5.4, pipeline §4.11 |
| V11's rows in row order: 6 `prosperity.bands` (the `ceiling` cell, own, unstamped), 49 `materials` (every row and cell, the means rows keyed by the band set's ids and contiguous), 56 `islands` (`gate.magic` stamped `ownerRule: '115 (b)'`, `magicMin` and `economyMin` own) | V11 | pipeline §4.5, V05 §2.4, model §2.6 |
| `Level.intent { wealthLevel?, economyPriority?, magicPriority? }`, `Level.magic?`; the derived fixture suffixes `@economy<e>`, `@magic<m>`, `@magicLevel<word>` after `@pop×k`; §1's owner-rule list (the three rules, never their rows or thresholds; the stamps `'115 (b)'` and `'116 (n)'`) | V12 | scope §13.2, V05, V08 |
| the tests T114-1 – T114-14, T115-1 – T115-10, T116-1 – T116-34, the island bars' fixture rule and the schedule (T116-22 from M2b) | scope §13.2, §13.8 | every unit's own bars |

### Per unit (mode — items — what it does; the full parts are the routing twin's)

* **model** — late — 114, 115, 116: §2.5 `BandSet`, `FieldBands.ceiling?`; §2.8's settlement facts (economy and magic
  priorities) and the magic word; §2.9 the islands param; §2.6 the Materials rule whole with the means under the
  prosperity ceiling said once; §2.3–§2.9 the material records.
* **kernel** — none: no item reads geometry.
* **pipeline** — late — 114, 115, 116: §4.5 whole; II.6's gate with high magic as corrected; S0–S11, §4.9, §4.11, II.7's
  material parts; §4.11's one prelude order.
* **determinism** — late — 114, 115, 116: §7.7 layers 1–2, items 1, 9, 11 (one refusal list), DR3, DR6–DR9, DR15, DR27,
  DR41, `TradePartner`; §7.1, §7.3–§7.6, §7.8 (every registry row of the three); §5.2–§5.4; §6.1–§6.2.
* **rendering** — late — 114, 116: §8.2's Wealth key line; the material roles, tiles, legend, exports, why and budgets.
* **scope** — main — 114, 115, 116: §13.2, §13.8, §14 (one list of digest fields and notes), §0, §1, §1.2, D-2, D-3, §16,
  the judgment index.
* **V01** — main — 114, 116: the hood's Economy; paving, `hatched`, names, the lone hood's supply.
* **V02** — main — 114, 116: §3.2 step 3's sentence; the mix facets; T-V2-25 with T116-10's clause.
* **V03** — late — 116: the plan's exterior walls by storey and gable; the host styling.
* **V04** — late — 116: quarry voids, the forecast, `Gallery.lining`, vaults under masonry, ruin credits, §3.13's rows.
* **V05** — main — 114, 115, 116: the principal build home of 115 (as corrected); `S_town` on the wealth level in force;
  the landfall credit and the islands' material supply.
* **V06** — main — 114, 115, 116: the prelude in §4.11's order; the gate at an epoch; the materials engine parts.
* **V07** — main — 114, 115, 116: the fold on `bandShares`, the forced manor; §1's island sentence; the village's
  materials.
* **V08** — main — 114, 115, 116: the adapter and rows in the one order above.
* **V09** — main — 114, 115, 116: the controls in the one placement above; every key.
* **V10** — main — 114, 115, 116: the intend fields, the lexicon, the encoder, the why answers, K19.
* **V11** — main — 114, 115, 116: rows 6, 49, 56.
* **V12** — main — 114, 115, 116: §1, `Level`, the derived fixtures, the register and the bar-map rows.

### Standing text the items replace (each unit named rewrites it; nothing else changes)

J-V5.19 (replaced by 115 (d) 5's pinned text); V05 §3.2 (1)'s parity clause (dropped) and its dossier-only clause
"magic not `none`" (subsumed); V05 §4.4's wane at a later dossier `none` (withdrawn: the site is creation's, W-DOS-08);
V05 §4.2's "the gate … must hold"; §7.7 item 11's "Where the dossier's `site.magic` resolves `none`, the islands
setting is refused" (withdrawn); §7.7 item 1's "generation sliders (`config.priority*`)" (narrowed to two read);
layer 1's "the filled values are map facts" (excepted for the priorities the creation supplied); T1's "wealth slider" and
§7.8's basic-panel "wealth level" (the Economy); II.7.1's "default 0.5" (derived from the Economy); V07 §1's "no island
reaches a village rung"; V08 §2.6's `magic` row's "else none, noted" (an absent or unmapped word carries no
`site.magic`; `magicExists` false reads none); §2.6's material rule, `MaterialRow.key.band`, `extension:
'regionalShift'`, V11 §3.19.3's default rows as the default, the roof-colour role by band in the default sheets (kept
under FTG and with the switch off); the material id `timber` (renamed `boards`, aliased at read); §2.8c's
`RetainingProfileRow.material` and `RaisedWayStructure.material` (retired into preference rows); V07's "geology row"
citations; `fire.rebuildShift`'s step while the switch is on.

### Tests and their owning unit

| test ids | owning unit | extended by (no new ids) |
|---|---|---|
| T114-1 – T114-14 | scope (§13.2) | V01 (T114-9's hood), V06 (T114-8, T114-12), V07 (T114-9's village), V08 (T-V8-20; T114-5 via V12's fixtures), V10 (T-V10-10 under the prosperity ceiling), V11 (T-V11-2's `ceiling` limits), V12 (register, derived fixtures) |
| T115-1 – T115-10 | scope (§13.2) | V05 (T-V5-1; the fixture rule on T-V5-2, T-V5-15, T-V5-18 and P0), V06 (T-V6-66), V08 (T115-2; T-V8-20), V09 (T115-6's messages), V10 (T115-9), V11 (T-V11-2's `gate` limits), V12 (M6-sky seeds, `@magic<m>`, `@magicLevel<word>`) |
| T116-1 – T116-34 | scope (§13.2; schedule §13.8, T116-22 from M2b) | T8-5, T19-3, T26-1 (scope); T-V2-25 with T116-10's heavier-part clause (V02); T-V6-16, T-V6-17 (V06); T-V7-32, and T116-3 with T116-25's H-NATIVE at the village rungs from V-M1 (V07); T-V8-20's fill clause with T116-13 (V08); T-V10-17, CVR-V10-4 (V10); T-V11-28 and T116-32's compile (V11) |

T-V8-20's ignore clause is ONE clause for the three items: the port reads `config.priorityEconomy`,
`config.priorityMagic`, `config.magicExists`, `config.magicLevel` and the three admitted partner fields among its
other admitted keys, and no key of §7.7 item 1's never-read list, `_config` or `economicState.priorities`.

### New ids and their owners

| id | what | home | owner of the part that makes it pass |
|---|---|---|---|
| `Intent.economyPriority?`, `Intent.magicPriority?`; `DossierDigest.settlement.economyPriority?`, `.magicPriority?`; `site.magic?` optional | the two priorities | determinism §7.7; scope §14 | V08 (adapter), V09 (controls) |
| `BandSet`, `BandCeilingRow`, `FieldBands.ceiling?`, `ceilingAt(...)`, `FieldDrivers.ceiling?` | the prosperity ceiling | model §2.5; pipeline §4.5; V10 | V11 row 6 |
| `IslandRule.gate { magic, magicMin, economyMin }`, `SkyGate`, `skyGate(...)`, `EpochReport.islandsGated`, `Recipe.params['layers.islands']` | the island gate | V05; model §2.9; V06 | V11 row 56 |
| registry ids `intent.economyPriority`, `intent.magicPriority`, `circumstances.magic`, `circumstances.trade` | the controls | determinism §7.8 | V09 |
| `MaterialFamily`, `MaterialMass`, `MaterialSlot`, `MaterialDef`, `MaterialPreference`, `MaterialMixRow`, `BuildingMaterial`, `MaterialOrigin`, `MaterialSupply`, `NativeReason`, the structures' and linings' material and origin fields, `Terrain.fissile`, `.lead` | the material records | model §2.3–§2.9 | pipeline, V11 |
| F-MATERIAL | the failure class | determinism §5.2 | every picking stage |
| `islands_gated`; `material_floor`, `material_kind_substituted`, `ruins_stock_short`, `fire_rebuild_unavailable`, `bridge_no_material`, `harbour_no_material`, `raised_no_material`, `retaining_no_material`, `material_unsupplied`, `timber_short`, `material_dossier`, `material_edit_unsupplied`, `override_share_dropped` | report codes | determinism §5.4 | V09 (catalogue) |
| `value_absent`, `value_clamped`, `frozen_fact_changed` (W-DOS-08's, reused), `partner_no_supplies` | port notes | scope §14 | V08 §4.6 |
| `held_above_ceiling`, `held_against_magic`, `held_against_economy`, `held_against_supply` | fate reasons | determinism §7.4 | V09 `fate.held.*` |
| DR41 (DR3, DR15 amended) | the material supply row | determinism §7.7 | V08 |
| K19 | the critique row (K1 – K18 exist; J-K19 is the kernel's judgment, another namespace) | V10 | V09 |
| H-TRADE, H-NATIVE, H-QUARRY, H-WOODS | fixtures | V06 | scope §13.2 |
| `materials.*` (row 49 `settings`), `fire.ordinanceStretch` | cells | V11; V06 | — |
| `'<dossier>@economy<e>'`, `'<dossier>@magic<m>'`, `'<dossier>@magicLevel<word>'` | derived fixtures | V12 | V08 |

Every id above is new in `docs/validation/coherence/new/`, `docs/volumes/` and `docs/ARCHITECTURE.md` (receipt
`work/g114-116/tmp/id-census.txt`) but `frozen_fact_changed`, W-DOS-08's routed note reused on purpose; no DR number,
report code, note kind, fate reason or test id is claimed twice across the three items.

### The judgments (the scope part's index; in `J-A⟨item⟩.⟨n⟩` the first digit of ⟨n⟩ names the part that states the rule — 0 scope, 2 model, 4 pipeline, 5–7 determinism, 8 rendering; each vetoable)

| id | the choice | where |
|---|---|---|
| J-A114.21 | the record `FieldBands.ceiling`, written only below the top rank, beside the declared `BandSet` | §2.5 |
| J-A114.41 | the prosperity ceiling binds bands, never the value (no clamp, no compression) | §4.5 |
| J-A114.42 | a continuous position with its share: the fold, the demand split, the fixed-cut rule and the continuous reads | §4.5 |
| J-A114.43 | the table `{0, modest}`, `{50, rich}`, linear, identity at 50 and above; own, not calibratable, unstamped | §4.5 |
| J-A114.44 | the wealth lift: the dossier word's own band and no margin; never an author's value | §4.5 |
| J-A114.45 | the map's prosperity ceiling lowers item 72's ranges; a capped town's richest quarter is mixed | §4.5 |
| J-A114.46 | precedence: author-declared bands and cut edits held; a government-forced seat keeps its class's rows | §4.5 |
| J-A114.47 | after the first generation: the founding row carried, the lived wealth lifting, the cuts rewritten on change; no rank limit | §4.11 |
| J-A114.48 | history, symbolic peaks and refounding under the recorded priority | §4.11 |
| J-A114.71 | the hosted slider is `config.priorityEconomy`, resolved; `_config` and `economicState.priorities` unread; clamp and absence noted | §7.7 |
| J-A114.72 | standalone, T1's wealth slider becomes the Economy (0–100, default 50); `wealthLevel` optional; "the wealth level in force" | §7.7, §7.8 |
| J-A114.73 | a stored wealth level keeps priority; Follow the Economy; Surprise me draws the economy as 100 × the wealth level's draw | §7.7 |
| J-A114.74 | the first generation reads the priority once and records it; dossier ownership keyed to the creation's absorb | §7.7 |
| J-A114.75 | J-M5 narrowed: `priorityEconomy` read once at creation (with 115's `priorityMagic`, the two sliders read) | §7.7 item 1 |
| J-A114.81 | the explanations and words (why card, hint, legend line, report line, held-band confirmation, clerk) | §8.2, §11.2 |
| J-A115.41 | high magic: the magic slider at 75 or more, or SettlementForge's word `high`; never where magic does not exist (the program's correction) | II.6 |
| J-A115.42 | "high" is 75 or more on both sliders (the program's pick) | II.6, V05 §2.4 |
| J-A115.43 | four clauses in order; the parity clause dropped; `SkyGate`, `skyGate(...)` and the `islands_gated` report | II.6 |
| J-A115.44 | rising gated, standing not; the magic in force with the recorded priorities; a settled refloat is a rising | II.6, §4.11 |
| J-A115.45 | with item 114: an island town is never capped under the default tables; edited tables stated | II.6 |
| J-A115.46 | at a destruction outright the old settlement's islands fall with it | II.6 |
| J-A115.71 | the standalone Magic control: a 0–100 slider (high at 75) with "No magic in this world", on by default; the word follows the slider | §7.7, §7.8 |
| J-A115.72 | J-V5.19 replaced: the Islands control disabled where a dossier clause fails; the setting's refusal withdrawn | §7.7 item 11, §7.8 |
| J-A115.73 | the dossier's magic (slider, word, `magicExists`) is creation's (W-DOS-08); V05 §4.4's absorb wane withdrawn | §7.7 item 9 |
| J-A115.74 | the author's own islands judged by the rung and a dossier-stated `none` only; held fates | §7.1, §7.7 item 11 |
| J-A115.75 | migration by island state on upgrade | §7.5 |
| J-A116.01 | the milestones of item 116 (M1 … V-M1; T116-22 from M2b) | §16 |
| J-A116.21 | the default material model: the pick over the supply (J-A19.21 superseded) | §2.6 |
| J-A116.22 | which prosperity reads which (the built value places, the district's range bounds, the field band never moves a standing material) | §2.6 |
| J-A116.23 | institutions at the top of their neighbourhood's range | §2.6 |
| J-A116.24 | carriage per load | §2.6 |
| J-A116.41 | the ledger never creates a material; the ruins basis and reach (J-A8.45 amended) | §4.11 |
| J-A116.42 | the timber shortfall through a partner and the scarcity (J-A26.42 amended) | §4.9 |
| J-A116.43 | quarries of native stone, structures included (J-A65.45 amended) | II.7.6 |
| J-A116.44 | the native test over the creation arena and the dossier's facts | §4.2 S1 (11) |
| J-A116.61 | the `material` stream | §6.1 |
| J-A116.71 | a declared partner is a licence only | §7.7 |
| J-A116.81 | `lit`'s roof by covering (J-A19.81 kept under FTG and with the switch off) | §8.2 |

### Agreement checks for the three items

* One wealth mechanism: item 116's means read the bands item 114's prosperity ceiling leaves, continuous in the economy
  (upper end `R*_c`'s; receipt `work/g114-116/tmp/cap-stone.txt` shows the two readings equal at every knot); item 116
  adds no wealth term; item 115's gate adds nothing to the means. A capped town has no very rich: it builds no house or
  institution of river- or road-borne stone, sea-borne stone only from a near partner; its works keep their factors.
* One position before and after S6: `ceilingAt` for S2 and S3–S5b, the record after S6, the prelude's position at an
  epoch; T116-22 checks the two equal.
* One prelude order at §4.11 (above); V06 builds it.
* One magic: the lights, the magic-gated classes and the access kinds read the magic in force; the gate reads it and the
  magic priority; standalone the word follows the slider.
* "Supply" is two concepts kept apart: II.6's island supply law (V05; `held_against_supply`) and item 116's material
  supply, always so called where the two meet (V05, T116-23).
* One native threshold per family (V11's `materials.native.*`); one refusal of the generic import (V11 §3.5.2); one ledger
  (by `family` with `at`); one partner record (`TradePartner`, filled only by DR3); one parts geometry for a mixed
  building (§2.6).
* Terms: "prosperity ceiling", "highest allowed band", "top means" (item 114's band, item 116's purse); "ceiling band"
  stays item 72's; "magic priority", "magic in force", "high magic"; "material supply", "native-only", "stony ground",
  `boards`, "chimney".

### Canon items the ruling touches

- **W-DOS-08** (V08): its `site` row and note `frozen_fact_changed` also carry the magic word and `magicExists`; the
  settlement diff row writes the same note for the economy and magic priorities; the note's args are `field`, `was`,
  `now`; its kind joins §14's `PortNote.kind` union.
- **W-DOS-02** (V08): its `wealth` diff row (F9 → `EpochInputs.wealthLevel`) is the lived wealth that lifts the
  prosperity ceiling after the first generation (114 (e)).
- **F13, F14** (V08's receipts): item 116 reads them (a deposit's state; a partner's arrival or departure) and mints no
  receipt row; items 114 and 115 mint none.
