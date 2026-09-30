## 8 Build plan

### 8.1 Where it slots into §16

Stage 2 is **M5**, after the base's M4 and M4b; in J122's combined order (§16's staged-milestones table, INDEX §4) it
runs after M4 beside the village (V-M1 – V-M4), M6-E and the plan rung's P0, P1 and P3, and M6 and M6-U start after it
(M6-U may run beside it with a second pair, its U3 and U4 then waiting on W15). Three small pieces land earlier because
the base reads them or its goldens would otherwise shift twice:
* **M1** — the schema only: `Block.content` (always `ordinary`), `Block.overrides`, `HoodPlace`'s registry row (no
  producer yet), `TypedBoundary` and `DistrictContext` declared (II.5's readiness reads the boundary view), `Recipe.product`
  (`town`), the three concerns' ids and the `S8.seed` stage id reserved in the registry (append-only, §6.1, item 345); the
  **way-naming context**'s features in S13a with the M1 grammar authored against them (V01 §3.7.2); and `hood.constants`'
  one `settings` row shipped whole — every column of V01 §3.14's column table at its default, since a compiled row holds
  every cell (V11 §2.2) — whose only reader before M3a is the naming context. ≈ 0.5 pw inside M1's naming and schema
  lines.
* **M2b** — `Way.slopeP95` written by S9 for every way and the **way-surface rule** (V01 §3.7.3) with field pass 2, since
  `lit`'s and `ink`'s close-up bands draw surfaces at M2b; the two **hook points** S7b and S10a declare (item 323; no
  registration until M5, so they do nothing) and the base table **`squares.quota`** S7b (3) sizes its square claims from
  (item 301). ≈ 0.25 pw inside M2b's content line.
* **M3a** — with item 110's base milestone (§16 M3a; the second known-city fixture): `District.terrace` (item 211),
  `terraceState` (V01 §2.3), `stepProfile` (item 245) and the `levelledUnits` / `terracedEdges` declaration the bent cut
  makes (BCR-V7-34), because the base's district-edge source reads them from M3a (item 302), with `hood.templates`'
  `stepped` row shipped whole. The second fixture's terraced wards and precinct rings are authored **by hand** at M3a —
  no stage 2 exists yet — and T-V1-54 re-runs its skeleton with stage 2 on at M5. ≈ 0.25 pw inside the base's M3a
  item-110 line.
* **M5** — everything else. **The M5 way-name shift, declared**: the naming context's features exist from M1, but at M5
  S9b's squares and S13a's places appear for the first time, so every way that now ends at a new square or passes a named
  place gains a `to` or `placeOnIt` feature and its name may change once; M5 writes the shift record for S13a with that
  cause (§13.3), beside the templates' and the typed squares' shift of the default-preset goldens (V01 §8.4 (6)). The
  parity presets create no places and shift nothing (T-V1-4). Retaining walls and stair or ramp intervals shift no name:
  a way's shape reads the unlevelled `slopeP95` (V01 §3.6 (3); T-V1-24).

**The register at every exit** (V12 §3.11; J-V1.97). Each milestone above exits with `plat calibrate register --check`
green over the cells it lands, their entries from V12 §3.11's default line; this volume writes no register line of its
own. The cells each lands: **M1** the `hood.constants` row, whole — the naming context reads four of its columns
(`name.curvedShare`, `name.bentDeg`, `name.landmarkM`, `name.tradeShare`; V01 §3.7.2), the rest inert until their readers
land, every calibratable column taking its entry `cal.hood.constants.*.<key>` here; **M2b** the `way.surface` rows
(V01 §3.7.3) and the base table `squares.quota` (item 301; its entries' `owner` `base`, V12 §3.11's owner rule,
J-V12.73); **M3a** `hood.templates`' `stepped` row, whole — every calibratable column of `hood.templates` takes its entry
here (V11 §2.2), the `select.*` weights W3 tunes at M5 among them, with `params.terraceSpacingM`, the cell `terraceState`
reads with `hood.constants`' `terrace.siteShare` (V01 §2.3); **M5** every cell of the other `hood.*` tables (V11's
registry row 62; V01 §8.3's list) and `hood.templates`' other rows (rows only; their columns' entries written at M3a). A
`ref:…` cell passes the lint with no entry; the `NG` preset's entries are code-read reference values or the switch's
fixed on value and take none (V01 §3.15). The constants V01 §3.14 marks "calibrate at M5" or "measured at M5" are tuned
by this volume's bars inside the work items that land them, before M5's exit: S7c's weights to T-V1-4's share (W3), the
land factors to T-V1-12 (W16), the small-block weights and `yardPaved` on the NG pairs (W4), `land.smallShare` (S-V1-b),
the terrace gain and share to T-V1-50 (W18), `ng.plazaM2` on the NG pairs to T-V1-31's plaza share (W17; V01 §8.4 (9))
and the hatch pitch to T-V1-26's census (W9; a style-sheet cell, §8.2). The landed value is the tuned one; a tuning that
moves a value an earlier milestone landed (a `hood.constants` column from M1; a `hood.templates` column from M3a,
`terraceSpacingM` and the `select.*` weights among them) appends a history row to its one entry by V12 §3.11's *A value
moved by its owning seat before its due* (`plat calibrate register --defaults --milestone M5`), and those bars stay this
volume's acceptance bars (V01 §7), never register metrics.

### 8.2 M5's work items, dependencies and estimates (person-weeks, expert; PLAUSIBLE)

| item | content | depends on | pw |
|---|---|---|---|
| S-V1-a spike (first week) | the ring and holed-band cutting on 1 000 real template faces from B-CITY walled districts, the contour series on 1 000 hillside and ravine faces of B-CITY's hilly and mountainous seeds, and B-FUZZ's template generator; bar: T-V1-9's fallback ≤ 10 %; if it fails, the ring inset widens to `1.5 × eLo` and the series cap drops to 4, re-measured, then the `landmark` one-ring form becomes `ring`'s first fallback | M0's bent cut, M4 | 0.75–1 |
| S-V1-b spike | the dispatch's land accounting against the population-whole guarantee on B-CITY-lite (T-V1-12), and λ's small-block share measured | M2b (S7b, S10a, S10b) | 0.5 |
| S-V1-c spike | `hatched` at the neighbourhood band: operations per wing and tile raster time at 450 and 750 buildings (T-V1-26, T-V1-29) | M2b's tile pyramid, M3b's families | 0.5 |
| W1 template machine | the four primitives, the template face, validation, F-TEMPLATE, the four NG rows (`@plat/hood`: `TemplateFabric` over `FabricStrategy`) | S-V1-a | 3–4 |
| W2 context rows and features | six of the seven context rows (`park` is W17's); V01 §3.6's features (bank path, rear-plot water rule, stair-stepped ways, barrier edges) | W1 | 1.5–2 |
| W3 S7c and χ̃ | `DistrictContext`, the provisional character, eligibility, weights, the draw, the report; the calibration sweep for the 15–35 % share and T-V1-5's classifier | M2b's S12c, W1 | 1–1.5 |
| W4 S9b dispatch | quotas, squares with siting and types, greens, manors, phase 2, ring centres, void squares, the seam guard; S10a / S10 / S11 / S12b consequences; court greening; item 284's programme and capacity terms | S-V1-b | 2–2.5 |
| W5 local identities | the local-place step and `HoodPlace`, place labels and knowledge (the naming context and surfaces are M1's and M2b's) | W4 | 0.75–1 |
| W6 refine close-up | hood pins and rows, the chunk, staleness, overrides and re-match, `closeup` persistence, framing and vignette | M3a (instance events, dry run; volume 3's `basementDoor(b)` and `stackAccessDoor(b, a)`, built at M3a over V03 §3.7.1's door helper; volume 2's `PorchKindRow`s, M3a-V2), W4 | 1.5–2 |
| W7 replace workflow and tools | T8's `fabric`, T9 on blocks, T6's furniture stamp, T12's slider; the ghost and count badge for a fabric change; the close-up panel (volume 9 lays out the screens) | M3a, W1, W6 | 1.5–2 |
| W8 unit runs | the standalone neighbourhood document (`Recipe.hood`, S0–S2's one-district programme, the `star` row, the border, default cuts), T1's `product`; the sky unit's district partition and split on a fixture island (volume 5 plugs `SkyStrategy` in later), its crossing-site spans and their bridges built after S8, `levelledGroundCm`'s dispatch on a sky key with its raster fallback — the island's terrain raster, nothing levelled before S10 (item 309's M5 part, built with item 580; BCR-V5-30) — volume 5 adding the island's datums at M6-sky; the rim walk's `plantRimWalk` with its two callers, and its runs after generation with each receiving district and a re-searched claim's district re-derived at the rim (V01 §3.10.3 (4), (6)) | W1, W3, W4 | 2–3 |
| W9 `hatched` at all four bands | roof law, hatch, lobed crowns, road surfaces and modes, stair-stepped ticks, pin symbols, the per-band order, night, states; its measurement render and B-ZOOM continuity | S-V1-c | 3–3.5 |
| W10 labels and exports | the hood title, place labels, per-format content (V01 §5.3) | W5, W9 | 0.5–1 |
| W11 verification | T-V1-1 – T-V1-58 (T-V1-50 – T-V1-54 with W18), B-REF's NG template rows in `baselines.json` (research-side, numbers only; NG's plaza share of the hood's area per size tag among them, T-V1-31), the NG panel tooling (§13.6 (2)'s seeds and counts), goldens and shift records; the register entries of the cells M5 lands (`plat calibrate register --defaults`, then `--check`; V01 §8.1) and the history rows of the M1 `hood.constants` and M3a `hood.templates` columns S-V1-b, W3, W16, W17 and W18 tune before M5's exit (`--defaults --milestone M5`) | all | 2–2.5 |
| W12 shade and siting reads | `DistrictContext.shade`, S7c's shade term, S9b's sun and siting factors, the strips shared with field pass 2, S9b's move after S10a (i) with its hook point, the pins' shade gain (g items 102, 103) | W4, the base's item 102 and 103 work | 0.75–1 |
| W13 chains, links, ladder members | χ̃'s allocation-level `c`, `DistrictContext.chains` and `records`, S7c's chain term, the fixed SIZE and GUILD inputs, the panel's reader query and the title's QUARTER label (g items 104, 105, 107, 108) | W3, W4, the base's item 105 and 108 work | 1–1.5 |
| W14 barrier-closure reads | the barrier seam typing (item 541), walled-stretch shares, intramural gardens excluded (g item 106) | W2, the base's item 106 work | 0.25 |
| W15 item 109's surface parts | first the three services volume 4's M6-U reads — `fabricSignature`, `districtsAbove` and the opening pass, which read only committed records (V04 §8) — then the places, the ground access symbols, the undercity parent rule, `under`, the outline close-up with its hinterland rows and chunks, the catacomb source protection and the `blockLifted` notice | W5, W6, volume 4's underground tail at its milestone (the parts that read V04's records land with it; the outline close-up lands at M5 regardless) | 1.5–2 |
| W16 the template's land | S7c as S7b's hook, `templateLandM2`, the reconcile with template land, S8's land caps, the stress fixture | W3, S-V1-b | 0.5 |
| W17 emulation and legibility | the `NG` preset (V01 §3.15: the stage-2 switch and its edit — the Re-derive from S2 with its fates, T-V1-4 (f) — the eight `ng.*` rules and their switches, `pin.decayScope`'s entry, `ng.plazaM2` tuned to T-V1-31's plaza share), the `park` row, the outline by fabric (V01 §3.10.2), `hood.constants` in the settings form with its column table (V01 §3.14), the kind coverage table, the `WhyProvider`s and the `hood.fabric` participant | W1, W4, W8 | 1–1.5 |
| W18 item 110's neighbourhood parts | `terraceState` and `District.terrace` (landed with the base at M3a), the contour series and ravine flanks, `TemplateFabric`'s levelled units and terraced edges, held walls and the digest, the strip holes and arch crossings, the parts-per-reader table, raised-way land and the add and remove paths, deck-plot ownership in the close-up, the hatch by roof kind and the stack order with tier shadows, `way.stair`, `retaining` and `raised`, the precinct rings, the exports and the VTT rule (§11.1), the Terraces hillside, the panel's rows and three why providers; T-V1-50 – T-V1-54 | W1, W4, W6, W9, the base's item-110 work (M3a) | 1.75–2.5 |
| **M5 total** | | | **27.25–36.25** |

The base's M5 line was 14–18 pw; this volume's is **27.25–36.25 pw** (+13.25–18.25: the seven context templates, S7c's
selection with the template land in the allocation, the dispatch at generation with its land accounting, local places,
the sky and standalone unit runs, the file-g reads W12–W15, the emulation preset W17 and item 110's neighbourhood parts
W18; item 474 re-prices §16's M5 row and the effort table's stage-2 line). The M1, M2b and M3a pieces above are absorbed
by those milestones' lines, as §16's pricing rule allows for a refinement a line already prices. §16 computes the base's
and the whole program's totals once with every volume's line (item 568; J-V1.26).

### 8.3 `@plat/hood`'s contents (§14, item 505)

`TemplateFabric` (one `FabricStrategy` implementation reading `hood.templates`; the base's `BentCutFabric` stays the
`bent-cut` row's), the seed primitives, `FabricSelector` (S7c, S7b's hook) with `templateLandM2`, `BlockDispatcher` (S9b,
S10a's hook), the local-place step (an S13a registration with its opening pass for the underground tail),
`CloseupDeriver` (the refine derivation, the outline close-up and the ground access symbols), the unit runner
(`HoodUnit`: standalone and sky, the latter reading `SkyUnitInput`), the `DistrictContext` and `DistrictSignature`
builders (with `terraceState`, whose pure function lives in `@plat/model` beside them from M3a), `TemplateFabric`'s
`levelledUnits` and `terracedEdges` (BCR-V7-34), the services `catchmentOf`, `districtsAbove`, `fabricSignature` and
`skyDistrictCount` and the writer `plantRimWalk` (V01 §3.16), the symbol key `accessSymbolKind` (V01 §3.8.8), the
`WhyProvider`s (V01 §4.5), the `hood.fabric` epoch participant (V01 §3.3.6), the tables `hood.templates`,
`hood.dispatch`, `hood.squares`, `hood.pins`, `hood.kinds`, `hood.placeKnowledge`, `hood.defaultCuts` and
`hood.constants` — one `settings` row in V11's settings form holding the `NG` preset's entries (V01 §3.14, §3.15) — in
`@plat/tables` (`squares.quota` is a base table there too, item 301), and the `hatched` sheet's stage-2 programs in
`@plat/render`, as every family's programs are. `hood` depends on `layout` and `plots` only through their interfaces
(§14's dependency rule, which item 505 extends with `DistrictContext`, the hook registrations and the services).

### 8.4 Risks, in order

1. **Ring and holed-band robustness on irregular template faces** (S-V1-a answers it first; F-TEMPLATE guarantees
   completion regardless).
2. **The dispatch's land and the population guarantee** (S-V1-b; item 284's terms; T-V1-12).
3. **Template separability** (T-V1-5's fallback raises the distinguishing parameters).
4. **`hatched`'s raster cost at district scale** (S-V1-c; the pitch fallback).
5. **The owner's time for the NG panel** (§13.6 (7): an unrated panel never stops the build and never lets the gate be
   claimed).
6. **The default map's look changing at M5** (the templates, typed squares and new places shift every default-preset
   golden and some way names once, declared; the parity presets do not move — T-V1-4; decided yes, Q-V1-1, J122).
7. **The template land estimate against the land a template actually takes** (V01 §3.3.7's caps and T-V1-12's stress
   fixture; its fallbacks raise the spine factor and cut the ring slack, then re-run the greedy pass).
8. **Volume 4's underground tail** (W15's V04-reading parts land with it; until then the opening pass, the access symbols
   and the catacomb protection are registered and inert — no system, no access, no source).
9. **The `NG` plaza reading** (`ng.plazaM2`, NG's unit-to-metre scale HOLD; tuned on the NG pairs at M5 to T-V1-31's
   scale-free plaza share before T-V1-31 and T-V1-32 are read; the pins keep their rows' `sizeM`, V01 §3.15).
10. **Level-line series on noisy terrain**: the simplify at `eLo / 4`, the `0.6 s` clip and the 15-level cap answer it;
    S-V1-a's fuzz is extended to contour and ravine faces, bar T-V1-9's fallback ≤ 10 % on faces meeting the `stepped`
    row's requirement; *fallback*: the spacing's lower bound rises to `2 × dBar + w_tpl` and the level lines take a
    second simplify pass at `eLo / 2`, re-measured.
11. **The base's item-110 pieces** (the levelling with its district-edge source, the raised-way generator and its spans,
    the deck row) land at M3a; until they do, W18's readers are registered and inert — no wall, no raised part, no deck
    plot — as W15's are before volume 4.

