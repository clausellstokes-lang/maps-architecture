# Reader vols: what the twelve volumes say about building materials, and what owner rule 116 needs from each

Working notes for the writers of item 116, by the volumes reader (2026-09-30). Nothing here is a ruling. The numbered
findings in §2 are the shared decisions the item must pin. §3–§14 go volume by volume. §15 names the unit that applies
each part. §16 lists conflicts and naming problems found in passing.

## 0. Method, scope and labels

- **What was searched.** Each of `docs/volumes/V01…V12` was grepped whole, case-insensitive, for material, timber,
  stone, brick, rubble, ashlar, thatch, slate, tile, wattle, cob, adobe, quarr, clay, kiln, sawmill, lumber, trade and
  import. Some volumes were also grepped for salvage, ledger, rob, partner, geology, surface, texture, legend and
  thematic. The hit lists and the section of each hit are in `tmp/hits-<vol>.txt` and `tmp/sec-<vol>.txt`.
- **What was read.** The whole subsection around every substantive hit. Many hits were not substantive: "milestone",
  map "tile", "ledger" in the progress headers, and trades as shop families.
- **Base text cited.** Base text is cited from the coherence files under `docs/validation/coherence/new/base/`, never
  from the live `ARCHITECTURE.md`.
- **The owner's refinement binds every part below.** A non-native material exists in a settlement only through a
  specific trade link with a settlement that has it. An isolated settlement has none, and cannot grow to have one, at
  any epoch, until such a link exists.
- **Labels.**
  - **C** — confirmed by reading.
  - **P** — a proposal for the writers. It is vetoable and is not a ruling.
  - "Now" quotes the volume as it stands. "116 needs" is what the owner's rule requires the volume to add or change.
- **Sibling note.** The sf reader's `read-sf.md` covers `research/sf/` and V08 in depth. §11 here cites it and adds only
  what the volume text itself shows.

## 1. The answer first

| Volume | What it says about materials now (C) | What rule 116 needs from it |
|---|---|---|
| **V11** content | Holds every material row and id. It has no source, no family, no availability and no cost for any of them. The material rows key era, stage, district, class and structure, never band — but the item-110 structure rows (retaining, raised ways) already key band. There is no test on the material rows. | The main content home. It needs: the material vocabulary with families, source goods, native tests and a cost level; the band-paired rows; the availability gate; the class and district "prestige" rows; the structure rows gated; the salvage rows keyed consistently; the goods and good words for new materials; compile tests. |
| **V02** buildings | "Materials only change colours and textures, never shapes." `materialFamily` reaches the material row only. It has one material pair per building and no per-wing or per-storey material. T-V2-25 covers shape invariance. | Mixed construction in one building: a storey split and/or a wing split. The mix is drawn per facet and per façade. The `lit` roof tint by band must be ruled against the material colour. Its massing is untouched (item 19 stays). |
| **V06** evolution | Robbing of stone, the salvage ledger, and fire flammability by roof and wall material. A fire rebuild shift that makes roofs less flammable. Flood collapse by wall material. Chains re-sited when a deposit changes. No availability anywhere. | Availability re-read every epoch. Construction reads it. Old fabric keeps its material. The fire rebuild shift is bounded by availability. A link that arrives or leaves takes effect at the next epoch. New fixtures and bars. |
| **V07** village | The painterly roof palette is a separate weighted draw: "about one roof in three slate where the geology row gives slate". It cites a retaining wall's material "at the geology". The `inner` stone circuit is "`material: 'stone'`". It has `roads: isolated`. It gates classes with `resource timber ≥ 0.4` and `resource clay ≥ 0.4`. | The village is the prime case (mostly native-only). The palette must read `Building.material.roof`. The "geology row" citations must be replaced by the native tests. The stone circuit and its REPLACEMENT must be gated by availability. The word "isolated" must be pinned. |
| **V04** underground | Quarry voids are "as large as the stone the town was built from". The volume law is over "Σ_stone buildings". Stone cells are `SiteResources.stone ≥ 0.5` within `reachM`. Unmet stone comes "from the surface quarry, the unmet m³ reported". | Only NATIVE stone fabric counts toward the quarry volume. Traded stone makes no local working. The native-stone test must be the same threshold as V04's cells. A stoneless site lays no stone workings. |
| **V05** sky | A landfall credits the ledger with `stone` = area × `stoneM3PerM2` (3). People "quarry for building stone". It says nothing on island building materials. | A decision on whether fallen-island rock is a salvage stock. An island's buildings draw on the settlement's availability. The ledger key `stone` must be reconciled with the material ids. |
| **V03** interiors | Walls are drawn by kind (exterior, party, partition). An underground building's exterior walls are styled by their host. No material. | The plan draw's exterior-wall fill takes the material colour and texture of its storey (the mixed split). Wall thickness never reads material. |
| **V01** neighbourhoods | Way surfaces are keyed by class, era and band: `paved` (setts), `cobble`, `dirt`, `planks`. A bridge is `paved` "for a stone bridge". The `hatched` roof colour comes from the role's list. | Paving must be gated on stone availability, with a fallback. The roof colour must come from the roof material. Its NG parity stays as NG. |
| **V08** settlementforge | The `materials` row maps six `materialFamily` words. The `deposits` row gives stone, timber and clay land uses. The `access` row has `isolated`. It carries `trade.links {good, flow, partner}`. No material derivation. | The native inputs (terrain, deposits with state), the trade-link goods resolved through `goodWords`, and the dossier-declared custom material, all traced into DR15. (Detail: `read-sf.md` §11.) |
| **V09** application | Material appears only on a retaining wall's panel and a raised way's pier band. There is no Materials view, no trade-partner control, and no material "why". | A Materials thematic view with a legend. The material in the About tab with its source (native, traded via a named partner, salvaged, dossier, yours). A bend for an unavailable material. A standalone control to declare a partner and its goods. Catalogue words. |
| **V10** clerk | The building provider's facts are "class, use, band, name". A retaining wall shows its material without a why. There is no critique row on materials. | A `material` section in the building's why (source, band, alternatives). A critique row for unlicensed material. Creation-mode handling of "stone" descriptions on sites with no stone. |
| **V12** calibration | It has no bar on material shares. Materials are calibratable only in the item-110 structure rows (`retaining` material by band; `raisedWays.structure.material` by band). | Bar-map rows for 116: conformance (0 unlicensed), band trend, traded-in-top-bands share, and the owner's example as a fixture. Register lines for the new cells. Preset rules (FTG, VG, NG). |

## 2. The shared decisions the item must pin

The volumes run in parallel, so these decisions must be pinned in the item.

### F1. One material vocabulary, with a family, a source and a cost for every id

**Now (C).**
- V11 §3.19.3 (`docs/volumes/V11-content.md:3389-3393`) lists the ids.
  - Walls: `ashlar`, `rubble`, `brick`, `timber_frame`, `wattle_daub`, `cob`.
  - Item 110's walls: `dry_stone`, `earth_bank`, `timber_crib`, plus `timber` "for raised-way decks".
  - Roofs: `thatch`, `shingle`, `clay_tile`, `slate`, `lead`, `turf`, `canvas`.
- The shanty row writes "timber (boards) 0.4" (`:3383`). One id, `timber`, therefore means both board walls and a
  raised-way deck.
- No id carries a family, a source good or a cost.

**Other homes that name materials differently (C).**
- V05 §3.16 (6) credits the ledger with the word `stone` (`docs/volumes/V05-sky.md:1536`). That is not a material id.
- V11 §3.18 splits timber-frame salvage as "timber 8, infill 4" (`V11:3322`).
- V08's `materials` row maps `stone` and `marble` → `ashlar`, `ruined-stone` → `rubble`, `timber` → `timber_frame`
  (`docs/volumes/V08-settlementforge.md:959-962`).
- The base's `MaterialLedger.rows[].material` is a free string (`new/base/model/01-domain-model-and-schemas.md:1717`).

**Gaps the realism tiebreaker exposes (C, P).**
- **Arid sites.** V11 §3.17.1's `arid` row has a flat roof and woods of olive, cypress and palm (`V11:3299`). No
  earth-brick id exists (sun-dried mud brick). An arid site with no stone would fall to `cob`.
- **Cold coniferous sites.** Only `timber_frame` and board `timber` exist. There is no log-wall id for
  `temperate-coniferous` and `cold`.
- **Slate and lead** have no good in V11 §3.7.1 (`V11:2044-2098`), no good word in §3.13.5 (`:3131-3160`) and no
  deposit in V08's `deposits` row (`V08:776-807`).

**The item must pin.**
- One table (P: in V11, beside `materials`): material id → family (stone, earth, fired clay, timber, reed or straw,
  slate, metal, fabric) → source good(s) of V11 §3.7.1 → native test (F2) → cost level (F14).
- The ledger's `material` key must be one term: P, the family.
- Whether `adobe` and a log wall are added. The realism tiebreaker favours adding both. Otherwise the item must state
  the arid and cold fallbacks.
- How `slate` and `lead` become native (a terrain or relief row, or `ore`/`mine`), or rule them trade-only.

### F2. "Native": one definition, built from what the volumes already read

**Now (C), five partial sources with three different thresholds.**
- **(a) `SiteResources` rasters.** Stone, timber, clay, ore, fish and fertile on the terrain grid (base
  `new/base/model/01-domain-model-and-schemas.md:1689`; pipeline S1 (10), `01-s4-generation-pipeline.md:380-386`: "stone
  from slope, rock class and cliffs … timber from the forest propensity … clay from low damp river flats").
  - V04 counts stone cells at `SiteResources.stone ≥ 0.5` within `reachM` (`docs/volumes/V04-underground.md:1665`).
  - V07 gates village classes at `resource timber ≥ 0.4` and `resource clay ≥ 0.4` (`docs/volumes/V07-village.md:951-953`).
  - V11's class `req` is "the site-resource gate (§10.2 `requires`)" at no stated value (`V11:1365`).
- **(b) The S0 landscape toggles.** `CircumstanceSlice.landscape { quarries, logging, … }`
  (`new/base/determinism/03-s7-editing.md:1503`).
- **(c) Dossier deposits with state.** From V08's `deposits` row: `stone_quarry` → stone/`quarry`;
  `managed_forest`, `mountain_timber`, `shipbuilding_timber` → timber/`lumber`; `river_clay`, `glass_sand` →
  clay/`claypit`; `marshlands` → `marsh`. "`depleted` … drawn worked out; `removed` draws nothing; `discovered` opens
  its land use at the next epoch" (`V08:776-799`).
- **(d) Land uses.** V11 §3.17.2 lists `quarry`, `claypit`, `mine`, `lumber`, `coppice`, `marsh` (`V11:3304-3309`).
- **(e) A "geology row".** V07 cites one twice: "one roof in three slate where the geology row gives slate"
  (`V07:3130-3131`) and "material … at the geology (dry stone by the village row, V11)" (`V07:1997`). No such row
  exists. `Terrain.geology` is `'ordinary'|'soluble'|'volcanic'`, "read only by II.7.6's cavern rule" (base
  `01-domain-model-and-schemas.md:423`; pipeline `:396`).

**The item must pin.**
- One native test per family, with one threshold per family. P: V04's stone test (≥ 0.5 within `reachM`) becomes THE
  native-stone test, so V04's quarry cells and "stone is native" can never disagree.
- The rule that the dossier's deposit state wins over a terrain row. A `depleted` `stone_quarry` is not re-granted by
  hills (see `read-sf.md` F2).
- A replacement for V07's two "geology row" citations.

### F3. The trade licence: which record makes a non-native material available

**Now (C).**
- **The base's partner record has no goods.** `TradePartner { key; mode; weight; bearingCdeg; relationship?; source:
  'dossier'|'derived'|'realm' }` (`new/base/determinism/03-s7-editing.md:1508-1509`).
- **V08 carries links whose goods are never resolved.** `trade.links: { good, flow: 'import'|'export', partner }` (`V08:569`).
- **The supply web gives every material good a generic import.**
  - Every class supply edge gets `substitutes: ['import']` (V11 §3.5.2, `V11:1393`).
  - The generic good `import` exists (`V11:2095`).
  - The trade endpoint store is "the nearest existing warehouse within 300 m of the gate or quay facing the partner's
    bearing" (V11 §3.13.4, `V11:3108`).
  - At village rungs it is the entry store (V07 §3.11). V07 imports iron through it: "(imported: the edge's `import`
    substitute, V11 §3.5.2)" (`V07:1104`).
  - So a `mason_yard`'s `stone` edge (`V11:1459`) or a `thatcher`'s `reed` edge (`:1465`) is satisfied by a generic
    import today, with no partner.

**The item must pin.**
- Only a partner record that names the material's good licenses it. That is a dossier `trade.links` import resolved by
  `goodWords`, or a standalone declared partner with goods.
- A `derived` or `realm` partner never licenses.
- The generic `import` substitute never licenses a BUILDING material. The material goods are `stone`, `logs`, `timber`,
  `planks`, `clay`, `bricks`, `lime`, `reed`, and any good F1 adds.
- The generic import stays for every other good (iron, wine and the rest). This scope line must be explicit so the web
  writers (V11, V07) agree.
- The record field and its home. P: `TradePartner.goods?: string[]` (base §7.7), filled by V08 from resolved links and
  by the standalone declaration (V09).

### F4. "Isolated": one term

**Now (C), three meanings.**
- SettlementForge's `tradeRouteAccess: isolated` → "1 gate on a track-class approach" (`V08:771`).
- V07's road-form `RoadTopology = 'isolated' | 'through' | 'dead_end' | 'crossroads'`, which is 0.56 of THORPs
  (`V07:615, 682`).
- The owner's "isolated settlements".

**The item must pin.** The owner's word is a per-material fact: no licensing partner for that material. Access
`isolated`/`none` is one cause of it. V07's road form neither implies nor denies a partner. A standalone village with no
declared partner is native-only whatever its road form.

### F5. The band the material pairs with

**Now (C).**
- `Plot.builtBand` is "the band … the plot's present stock was built for … never recomputed from the field" (base
  `01-domain-model-and-schemas.md:657`).
- `Plot.fieldBand` is "the occupants' band" (`:658`).
- V02 authors every row at four anchors (poor, modest, prosperous, rich). `squalid` reads poor. `comfortable` is
  interpolated between modest and prosperous (V02 §3.10.1, `docs/volumes/V02-buildings.md:1621-1628`).
- A band drift leaves the `wings` rung current (V02 §3.11, `:2051`).

**The item must pin (P).**
- The pairing keys on the band the FABRIC was built for (`builtBand`, the manifested band), never on `fieldBand`. A
  decline then leaves stone houses standing with poor occupants, and a rebuild re-reads.
- The rows use V02's four anchors.
- The band threshold at which traded ("exotic") material is admitted. The owner: "reserved for the very rich".
  P: `rich` only, or `prosperous`–`rich`.
- Items 114 and 115 are consistent with this. A map whose prosperity ceiling (item 114, the economy slider) lies below
  that band has no traded material at all.

### F6. Class and district rows: prestige, not fixed materials

**Now (C).**
- V11 §3.19.3's class rows name materials:
  - `church`, `chapel`, `cathedral`, `monastery`, `castle`, `palace`, `town_hall`, `guildhall` → "ashlar 0.7, rubble 0.3".
  - `tower_house`, `mage_tower`, `watchtower` → "rubble 0.6, ashlar 0.4".
  - `warehouse`, `granary` → "rubble 0.5, timber_frame 0.5".
- District rows: `docks` and `shanty` (`V11:3379-3380`; the class rows `:3381-3383`).
- Item 110 has a prestige rule: "A wall along a public face at CITY and METROPOLIS … reads the rich row's material:
  civic works were dressed" (`V11:3752-3754`).

**The item must pin (P).**
- A class or district row names a PRESTIGE band (a church "as rich"; a shanty "as poor") read against the available
  set, not a material. A church then takes the dearest AVAILABLE family: stone where there is stone, brick where there
  is clay, timber elsewhere (a stave church). It never takes a material the settlement lacks.
- The alternative is to keep the rows and renormalise over what is available, with a pinned fallback when nothing listed
  is available.

### F7. Mixed construction inside one building

**Now (C).**
- `Building.material: { walls: string; roof: string }` is one pair per building (base
  `01-domain-model-and-schemas.md:820`).
- `RoofSpec.material?: string` exists with no writer (`:843`).
- Rendering keys roof colour "by `roof.material`" (`new/base/rendering/01-s08-rendering-and-the-style-system.md:458`),
  which is ambiguous between the two.
- V02's wings (`BaseWing`, `Wing`) and V03's walls carry no material.

**The owner.** "The middling areas will have buildings mixed between wood and stone or individual buildings that is a
combination of the two."

**The item must pin (P).**
- **The form(s).** (a) The storey split: dear ground storey, cheap upper storeys. This is the historical middle form.
  And/or (b) the wing split: a dear main range with cheap outshots.
- **The record field and its home.** For example `Building.material.wallsUpper?` for (a), or `BaseWing.material?` for (b).
- **Who draws it.** V02 per facet, V03 per storey, V09 and V10 display, V12 metric.
- **One roof-material home.** Retire `RoofSpec.material`, or make it the per-wing roof of (b).
- **What never changes.** Material never sets a wall thickness, a jetty or a storey height (item 19).

### F8. Structures: item 110 already pairs band and material; availability is missing

**Now (C).**
- **Retaining walls.**
  - `RetainingProfileRow.material: Record<'dry_stone'|'rubble'|'ashlar'|'brick'|'earth_bank'|'timber_crib', number>`
    (V11 §2.8c, `V11:693`), read by band.
  - Poor "dry_stone 0.6, rubble 0.2, earth_bank 0.15, timber_crib 0.05" … rich "ashlar 0.6, rubble 0.3, brick 0.1"
    (V11 §3.24.1, `:3745-3750`).
  - "`earth_bank` and `timber_crib` are drawn only where the step is ≤ 150 cm" (`:3752`).
- **Raised ways.**
  - `RaisedWayStructure.material` by band (`:719`): poor "timber 0.5, rubble 0.5" … rich "ashlar 0.7, brick 0.3".
  - "an aqueduct never timber (a timber channel leaks; its timber weight is renormalised away)" (V11 §3.24.2, `:3813-3815`).
- **Bridges.** `Bridge.kind?: 'stone'|'timber'|'draw'|'ford'`, set by S7 (base model `:1654`).
- **Enceintes.** They carry their own wall material (base §2.6 Materials rule, `:1172`). V07's `inner` circuit is
  "`material: 'stone'` — the one masonry enceinte of a village" (`V07:1587-1589`).
- **Paving.** V01's `way.surface` (§10) and the era row's `market paved` (V11 §3.19.1, `:3359-3362`).

**The item must pin.**
- The availability gate on every structure material, with the same renormalisation as buildings.
- A fallback on §5's ladder where nothing listed is available:
  - A retaining step above 150 cm on a site with no stone and no brick: P, the step is split by more terraces, else the
    unit is not levelled, reported.
  - An aqueduct with no masonry available: P, the candidate drops, reported `raised_no_material`.
  - A stone bridge or a stone circuit with no stone: P, timber for the bridge; brick where clay, else timber or earth,
    for the circuit.
- Whether "texture only" still holds for structures. Material still sets no geometry, but item 110 already lets
  material pick a pier spacing (`pierSpacingM` masonry 8–15, timber 4–8, `V11:3812`). That is a SHAPE read of material,
  which item 19 forbids for buildings. The item should state that it is a structural class of the raised way, not a
  building material.

### F9. Salvage, the ledger and history

**Now (C).**
- "The ledger is a flow record, never a hard constraint: a debit it cannot cover is built anyway and the shortfall is
  reported (J-A8.45)" (base pipeline §4.11, `01-s4-generation-pipeline.md:3529-3535`). The haul radius is 250 m (`:3516`).
- Item 113 (b): the refounded settlement "quarries the ruins for stone (the salvage ledger)" (`docs/AMENDMENTS-2026-09-28g.md:752-753`).
- V05's landfall credits `stone` (`V05:1536-1539`).
- V06: ruins "are robbed for stone wherever someone nearby is building" (`docs/volumes/V06-evolution.md:200-201`).

**The item must pin (P).**
- **(a) Salvage as a local stock.** Salvaged material of a family is a finite local stock: the ledger's m³ within the
  haul radius. A build may take that family while the stock lasts, even where it is neither native nor traded (spolia).
  It licenses nothing else. The ledger must never create availability by a reported shortfall.
- **(b) The rule governs construction.** It covers build, rebuild, `reuse … build` and a repair in kind. Standing fabric
  keeps its material when a link ends or a deposit is depleted (item 22, least disruption). The owner's "can't have"
  reads as "can't build with".
- **(c) The history replay (item 113).** Each replay epoch reads that epoch's partner set from the circumstance
  timeline, else the present set. A settlement isolated at the present therefore has no non-native fabric at
  generation unless its history names a past partner (`read-sf.md` F12: the dossier never does today).

### F10. A material the dossier declares

**Now (C).** The only structured material word is a custom record's `materialFamily`: brick, stone, marble,
ruined-stone, timber, steel. It is mapped by V08's `materials` row into DR15 (`V08:959-962`). A custom building's
`material` is "passed to the building's material row" (`read-sf.md` §10).

**The item must pin (P).** Item 20 (h) makes the dossier the truth. A declared family that is not native and has no
link is honoured on THAT building, reported (for example `material_dossier`), and licenses nothing else.

### F11. Availability is an epoch input

**Now (C).**
- V06's `prelude` re-reads "the dials past their hysteresis, `TradeFlow`" (V06 §3.2 row 1, `V06:1030`).
- A dossier deposit that is `discovered` opens at the next epoch (`V08:797`).
- An active chain "moves by its anchor" when "a `DepositSite` [is] depleted or discovered" (V06 §3.9.8 (2), `V06:1833-1834`).

**The item must pin (P).**
- The availability set: per family, whether it is native, traded (with the partner key) or salvaged (with the m³).
- It is derived, never stored: a pure function of the slice's partners, the terrain rasters, the deposits' states and
  the ledger at the epoch's snapshot. Its home: P, a derived `MaterialSupply` read through one function.
- Its readers: S11's material read, §4.11's builds and repairs, V06's fire rebuild shift, V04's quarry ΔV, V02, V09 and V10.
- Its hash: model data derived from digested inputs, so no new digest field.

### F12. Roof colour: by band or by material

**Now (C).** Three draws decide roof colour without reading the roof material.
- The base `lit` default "keys the `roof` role by the building's prosperity band … the richest roofs the deepest clay,
  the poorest the greyest". Also: "In `lit` the material picks the roof's `pattern` texture and the band row its tint"
  (rendering `01-s08…:461-470`).
- V01's `hatched` colour is "the `roof` role's pick (the role holds a list …)" (`docs/volumes/V01-neighbourhoods.md:2755-2760`).
- V07's `painterly` draws "the roof tone … from the sheet's weighted list (thatch, tile, slate, shingle …)"
  (`V07:3129-3131`). That is a second material draw, which can contradict `Building.material.roof`.

**The item must pin.**
- Under 116 the band already selects the material. A band tint as well double-encodes wealth, and it would paint a rich
  thatched roof "the deepest clay".
- P: the roof colour comes from the roof material's role. The band tint is retired from the default `lit` sheet, or kept
  as a small modulation within the material's colour.
- The parity sheets keep their own draw (NG's two tones, VG's list under `VG`, FTG's band row under `FTG`).

### F13. The conflicts the item must state and rule

- **Item 19's default** (base `01-domain-model-and-schemas.md:1162-1173`).
  - The rule: "wealth shown through the lifestyle-banded building pools (§10.2) and the roof-colour role by band … —
    never by a material keyed to the prosperity band".
  - `MaterialRow.key.band` is "absent from every default row, so the default never keys a material by wealth (item 19)" (`:845`).
  - Rule 116 contradicts both, and 116 is the newer rule.
- **Item 23's FTG-reproducing default rows.** V11 §3.19.3's per-stage rows: "every era · stage 1 (the core) | rubble
  0.4, timber_frame 0.5, brick 0.1 …" (`V11:3375-3377`).
  - P ruling: 116 sets the default.
  - The `FTG` parity preset keeps FTG's per-stage rows with availability off, which is emulation-first where a parity
    preset asks.
- **The optional `regionalShift` rows** (`V11:3387`; base `:1170-1171`) are 116's ancestor. They "may shift materials
  with the prosperity band within what the region builds with". P: retired, absorbed by 116 (one term per concept).
- **Item 19's "texture and colour, never shape" is NOT contradicted and stays.** It is stated in V02 §0 (`V02:204`),
  §1d (`:417-418`) and T-V2-25 (`:3175`).

### F14. The cost model: its inputs are already in V11

**Now (C).**
- `ResourceRow.bulk` ("3 for building stone"), `value`, `modes` ("cheapest first") and `maxDistanceM` (V11 §2.5, `V11:553-557`).
- `stone` has bulk 3, modes river and road, maxDistanceM 6 000. `bricks` has bulk 3. `timber` has bulk 3 (`:2066-2074`).
- `siting.web.bulkyWater` is "× 0.6 on the distance of a river or sea leg when bulk = 3" (§3.7.4, `:2150`).
- `TradePartner.mode` is road, river or sea.

**The item must pin (P).**
- One cost rank per family at a settlement: the intrinsic level plus transport. Transport is bulk × the haul to the
  native source within reach, or bulk × the partner's leg by its mode (× `bulkyWater` on water).
- Its table home (V11).
- The rank ORDERS the families only. The bands take shares by rank:
  - the richest take the dearest available;
  - the middle mix the two nearest (F7);
  - the poorest take the cheapest;
  - traded material goes only to the F5 band.
- The owner's example as the pin case: "river + forest, no quarry → mostly wood; stone only from trade, for the very
  rich". Timber is native and cheap. Stone is traded and dear.

### F15. Producers must follow what is built

**Now (C).** The producer classes:
- `quarry` "req stone"; `lumber_camp`; `claypit` "req clay"; `brickworks` "req clay"; `lime_kiln` "req stone".
- `mason_yard` "supply `stone` 5 000 m road, `lime` 3 000 m road"; `sawmill` "req timber"; `thatcher` "supply `reed`
  3 000 m road" (V11 §3.5.5, §3.5.10, `V11:1457-1465, 1605-1611`).
- V07's `v.wood_yard`, `v.charcoal_pit` and `v.potter` (`V07:951-953`).
- There is no tile or slate producer. The good word `tiles` → `bricks` (`V11:3150`).

**The item must pin (P).**
- A material family's producers exist only where it is native. A traded family arrives at the endpoint store and feeds
  its yard: a `mason_yard` at a stone partner's gate or quay.
- A `mason_yard` in a settlement with no stone of any source is not demanded. Its `perCapita` "1/3 000" (`:1459`) must
  be conditioned on stone use.

### F16. Tests: none exist on the material rows

**Now (C).**
- V11 §7 has no material test.
- V02's T-V2-25 checks shape invariance only.
- V06's T-V6-16 reads "the share of stone and tile". T-V6-17 reads "the listed wall materials".
- V12 has no material bar.

**The item must pin.**
- Per-volume bars (listed in §3–§14).
- Four shared fixtures:
  - (i) the owner's example: river + forest, no quarry, with and without a stone partner;
  - (ii) an isolated site: 0 non-native fabric at every epoch;
  - (iii) both stone and timber native: the stone share rises with band, and the middle is mixed;
  - (iv) an epoch path: a link arrives, then leaves. There is no traded fabric before the link, and no new traded fabric
    after it leaves; the old fabric is kept.

## 3. V11 — `docs/volumes/V11-content.md` (the content home)

**§3.19 Era, region and materials (`:3351-3393`), now (C).**
- **§3.19.1 `EraRow`.** Rows `c12`–`c15` (default `c14`). Columns include `market paved` (0.1, 0.3, 0.5, 0.7) and "fuel
  · timber m³ per head-year" (1.1 · 0.15 … 0.9 · 0.15).
- **§3.19.2 Dossier eras.** "V08 derives `era` from `site.culture` … (every culture defaults to `c14` …; the region is
  `western` unless a pack adds region rows)".
- **§3.19.3 Material rows.** "texture and colour only, never shape — the owner's rule and item 19; the most specific key
  wins: a STRUCTURE key …, then class, then district kind, then growth stage".
  - The rows: every era · stage 1, stage 2, stage ≥ 3 and ribbon; `c15` · stage 1; district `docks`, `shanty`; the three
    class groups; the structures `retaining`, `raised:*` and `pier`, `deck`; the regional shift rows.
  - "the colours are the style sheet's …, never this table's".
  - "A custom record's `materialFamily` (item 104) selects the row whose walls share is largest for that family".

**§3.19, what 116 needs.**
- The F1 vocabulary table.
- The default rows re-keyed by the four band anchors (F5), with the prestige class and district rows (F6).
- The availability gate. The row is read over the available set and renormalised. A fallback row is always resolvable
  from native families alone: P, the cheapest native family; on a site with none, `turf` roof with `cob`, or earth brick
  where arid.
- The mixed-construction share for the middle anchors (F7).
- The era columns stay. They shift the shares within the available set, for example `c15` more brick where clay is
  native.
- The dossier's era is the constant `c14` (V08 `:955-958`), so the dossier case varies by terrain, resources, trade and
  band only.
- The FTG rows kept under `presets.FTG` (F13). The `regionalShift` rows retired.
- `market paved` gated by stone availability (F8).

**§3.18 Decline, ruin and salvage by material (`:3312-3349`).**
- **Now (C).**
  - Per wall material: salvage m³ per 100 m² per storey (ashlar 30, rubble 30, brick 22, timber_frame "12 (timber 8,
    infill 4)", wattle_daub 6, cob 4), decay dwell factor, ruin persistence, "robbed first".
  - Item 110 mappings: `dry_stone` "as `rubble` × 0.9 dwell", `earth_bank` "as `cob`", `timber_crib` "as `timber_frame`".
- **116 needs.**
  - Rows for any id F1 adds.
  - The ledger credit keyed by the F1 family, so "timber 8, infill 4" becomes two families' credits.
  - A mixed building credits each part by its share.

**§3.17 Climate and land use (`:3289-3309`).**
- **Now (C).** `ClimateRow` gives roof form and pitch per biome ("arid … flat · 0.1"; "cold … gable · 1.3") and woods.
  §3.17.2's land uses include `quarry`, `claypit` and `mine` → `works.pit`; `lumber` → `wood.felled`; `marsh`; `coppice`.
- **116 needs.**
  - The climate row is where a biome's native families enter (P): the arid → earth brick default; the cold and
    coniferous → log.
  - The land uses are native sources (F2 (d)).
  - Roof FORM stays the climate's and class's. Only the covering is a material.

**§3.24 Item 110's rows (`:3736-3815`).**
- **Now (C).** The `retaining` material by band (`:3745-3750`), the civic-face rich rule (`:3752-3754`), and the
  `raisedWays.structure.material` by band with "an aqueduct never timber" (`:3813-3815`).
- **116 needs.** The availability gate and fallbacks (F8), and the one F1 vocabulary. `timber` for decks versus
  `timber_crib` versus board walls is one family with distinct ids, and must be stated.

**§2.5, §3.7 goods and the web (`:549-562`, `:2039-2160`).**
- **Now (C).** `stone` is kind `site` with `subterranean · quarry`. `logs` is `land · lumber`. `timber` and `planks` are
  made. `reed` is `land · marsh`. `clay` is `land · claypit`. `bricks` and `lime` are made. `import` is generic. The supply
  edges read `substitutes: ['import']` (§3.5.2, `:1393`).
- **116 needs.**
  - The material goods flagged as building materials: a column, P `buildingMaterial: true`, so the web's `import`
    substitute is refused for them (F3).
  - The web's off form (`web.off`, §3.7.4) must say whether it touches the material gate (P: no; the gate is 116's own
    switch).

**§3.13.4 and §3.13.5 (`:3095-3160`).**
- **Now (C).** `endpointStore`, and the good words `stone`, `clay`, `bricks`/`tiles`, `reed`/`reeds`/`thatch`,
  `timber`/`beams`, `logs`/`lumber`/`wood`. A label matching nothing "resolves to `import`, reported `unmapped_good`".
- **116 needs.**
  - Good words for any new good: slate, lead, and `marble` → stone.
  - The rule that an `unmapped_good` resolved to `import` never licenses a material (F3).
  - The endpoint store as the arrival point of traded material.

**§3.5 producer classes (`:1457-1465`, `:1605-1611`).** 116 needs F15's conditioning.

**§2.8 `EraRow` (`:604-614`).**
- **Now (C).** "`region` … a region preset row keys the regional material shift (§2.6)"; "`materialRows` … the
  MaterialRow key prefix this era's rows use".
- **116 needs.** `region` loses its material-shift role (F13) or states its new one.

**§7, §8 and the register.**
- **Now (C).**
  - No T-V11 test reads the material rows.
  - C1 ships "the era and material rows" (`:4193`). C3b ships "the structure material keys" (`:4196`).
  - The register's "rest" line holds "`era` (row 50) and `materials` (row 49) outside item 110's factors and structure
    keys" as `corpus` (`:4237`).
- **116 needs.**
  - Compile tests: every material id has a family, source and cost row; every class resolves a row over every
    availability case (a totality over the native-only case); the prestige rows name bands.
  - Register lines for the new cells.
  - A milestone for the rows. They ride C1 with the base's S11.

## 4. V02 — `docs/volumes/V02-buildings.md`

**Now (C).**
- **§0.** "Materials only change colours and textures, never shapes (owner, 2026-09-26)" (`:204`). "A hovel gets one
  short, low range with a thatch-like roof" (`:120`). That is roof-form language, not a material.
- **§1b dossier trace.** "its `materialFamily` | the material row (V11 §3.19) | texture and colour only — never the
  massing | §8.2" (`:350`).
- **§1d.** "**Materials** are texture and colour only; `MaterialRow`'s rows are volume 11's" (`:417-418`).
- **§3.5 M9's pitch rule.** "towers `TowerShapeRow.pitch`, spires as M12 — never a material's (item 19)" (`:1305`).
- **§3.7.** `bayM` 3.6 m, "the rhythm of a timber frame's bays and a masonry front's windows" (`:1388`). One rhythm for
  every material, which is correct under item 19.
- **§3.11 staleness.** "a Works stage or a material change leaves the rung `current`" (`:2051`).
- **§3.14.6.** "materials stay texture and colour (V2 §1d)" (`:2199`).
- **§5.1.** "Condition … and material stay texture and colour on the same facets (item 19)" (`:2819`).
- **§5.3.** "The `lit` family's roof tint by band (§8.2, item 19) and the material's `pattern` (texture) apply per facet"
  (`:2921`).
- **Tests.** T-V2-21 (`:3170-3174`) and T-V2-25 "a material `setAttr` leaves every massing and composition byte
  unchanged" (`:3175`).
- **Records.** No wing or storey carries a material. `Building.material` is the base's one pair.

**116 needs.**
- **(1) Mixed construction (F7).** The composer's reading of the storey split (which wings take the dear ground
  storey), or of the wing split (the main range dear, outshots cheap). It is keyed per wing key, so a recomposition keeps
  it, and it is written into the pinned field.
- **(2) The drawing.** The roofscape (§5.2) and façade programs (§5.3) take each facet's and each wall's material from
  its wing or storey, never changing a facet.
- **(3) §5.3's "roof tint by band"** per F12.
- **(4) A §3.14 entry for item 116** at the building, citing V11's rows and the gate.
- **(5) T-V2-25 extended.** A mixed material, and a change of availability, leave every massing and composition byte
  unchanged.
  - New bar P: in a band-paired town, a mixed building's dear part is its ground storey or main range.
- **(6) §1b.** The trace row for `materialFamily` gains F10's exception. New rows for the building's material sources
  (terrain, deposits, trade link) point at the material row, never at the massing.
- **(7) The designation mutator (§3.9).** A use change keeps the fabric's material. Only a Works that builds or rebuilds
  re-reads availability (F9 (b)).

## 5. V06 — `docs/volumes/V06-evolution.md`

**Now (C).**
- **§0.**
  - The old wall's "stones are carried off for new houses" (`:196`).
  - Houses "are robbed for stone wherever someone nearby is building" (`:200-201`).
  - "a house fire that spreads along timber rows until a wide street or a stone house stops it" (`:244`).
- **§3.2 row 1 `prelude`.** "the dials past their hysteresis, `TradeFlow` re-read" (`:1030`).
- **§3.5.2.** "a `ruined` building with salvage demand in its haul radius (→ `robStone` for masonry, `clear` otherwise)"
  (`:1262-1263`).
- **§3.9.8 (2).** An active chain moves when "its resource node's site (a spring, a quarry, a deposit) or its import
  store's gate or quay — changes (a `DepositSite` depleted or discovered …; a new gate facing the partner)" (`:1833-1834`).
- **§3.11.2 fire.**
  - Flammability is "by roof covering and wall (thatch or reed 1.0; timber, shingle or wattle 0.9; tile 0.45; stone,
    slate or brick 0.15 — the lower of roof and wall factors)" (`:1995-1996`).
  - "(4) Rebuilding after a fire. For `fire.rebuildYears` after a fire, a rebuild on a burnt plot takes the roof
    covering `fire.rebuildShift` steps less flammable than its class row's draw would, where the row admits it" (`:2019-2021`).
  - The settings row is `fire.rebuildYears · fire.rebuildShift | 30 · 1` (§2.2, `:655`).
- **§3.11.3 flood.** "A building of timber, cob or wattle walls whose depth reaches `collapseDepthCm` collapses"; timber
  decks and supports break; "masonry … never" (`:2028-2031`).
- **§3.7.** Wall dismantling credits the ledger (`walls.dismantleChancePerYear` 0.03 "× the salvage-demand factor",
  `:631`; `:1462-1464`).
- **§3.19.2 and §3.19.4.** A ruined span's rubble is dismantled on salvage demand, "stone credited to the ledger"
  (`:2725-2726`). "a ruined stretch — its stone gone — is not restored: … a new stretch" (`:2853-2854`).
- **Tests.**
  - T-V6-16: "on 200 seeds the mean fire size falls with the share of stone and tile" (`:3328`).
  - T-V6-17: "only of the listed wall materials" (`:3329`).
  - Fixtures include H-DECK, "a river town with a timber bridge carrying houses and a stone bridgehead" (`:3306-3307`).
- **§1b dossier trace.** "trade partners, economy, powers | `economy.partners`, `economy.tradeLinks` …" (`:499`).

**116 needs.**
- **(1) The prelude re-reads availability** (F11) after the partners and deposits of the epoch's slice, so a link that
  arrives or leaves acts from the next epoch.
  - A dossier F14 trade change and an F13 deposit put take effect at the epoch after their week (`read-sf.md` F12).
- **(2) Construction reads availability.** Building ops (`build`, `rebuild`, `reuse … build`, repair `reoccupy`) take
  their material from the gate. Standing fabric keeps its material (F9 (b)).
  - A `rebuild` after a link ended rebuilds in an available family, and the chronicle says so. P line: "{year}: rebuilt
    in timber; no stone came up the river after {partner} closed".
- **(3) The fire rebuild shift (§3.11.2 (4)).** "the next less flammable roof covering its class row admits" must read
  "… that the settlement has".
  - Owner's history and the realism tiebreaker: ordinances after great fires often required tile, brick or stone. P: the
    shift may extend to walls, bounded by availability, in an extension row. With no less flammable covering available,
    the shift does nothing, reported.
- **(4) Salvage (F9 (a)).** `robStone`, `dismantle` and the landfall credit a family's stock. A build of that family may
  draw on it within the haul radius even where it is not native or traded, while it lasts.
  - The ledger no longer lets a shortfall create a material.
- **(5) Chain re-siting (§3.9.8 (2)).** It already handles a depleted or discovered quarry. The same event flips
  stone's native state. The quarry closes, stone stops being native, and new building falls back.
- **(6) Structures over epochs (§3.19.2, §3.19.4).** A new stretch or span laid by an epoch reads the availability at
  that epoch (F8).
- **(7) Tests.**
  - T-V6-16's statistic stratified by availability (the stone-and-tile share is now a terrain and trade outcome).
  - New fixtures: H-TRADE (a river-forest town with no quarry that gains a stone partner at year N and loses it at M),
    H-ISOLATED (a remote timber village over 200 years), H-QUARRY (a `stone_quarry` discovered, then depleted).
  - New bars:
    - 0 unlicensed non-native fabric at every batch;
    - no traded fabric before N;
    - no new traded fabric after M;
    - every pre-M traded building still standing keeps its material until struck.

## 6. V07 — `docs/volumes/V07-village.md`

**Now (C).**
- **§0.** "houses stand on small levelled platforms held up by low stone walls" (`:232`).
- **§2.2.** "palisade kinds palisade / earthwork / inner … own (timber stakes, bank and ditch, a small stone wall)"
  (`:705`). Light stretches are "a wattle fence or dead hedge" (`:706`).
- **§2.2 `RoadTopology`.** `'isolated' | 'through' | 'dead_end' | 'crossroads'`, "0.56 / 0.21 / 0.14 / 0.09" (`:615, 682`).
- **§2.4 village classes.**
  - `v.wood_yard` "`resource timber ≥ 0.4` : 0.6"; `v.charcoal_pit` "`resource timber ≥ 0.4` : 0.3"; `v.potter`
    "`resource clay ≥ 0.4` : 0.3"; `v.watchtower` "a timber or stone tower" (`:951-955`).
  - The supply table: `v.smithy` "iron ← the entry store (imported: the edge's `import` substitute, V11 §3.5.2)"
    (`:1104`); `v.shop` "import ← the entry store" (`:1111`).
- **§3.4.** "`inner` (a small stone circuit, 500 cm, 120 cm thick, `material: 'stone'` — the one masonry enceinte of a
  village, J-V7.15)" (`:1587-1589`).
- **§3.8a.** "its material the base's `RetainingWall` material row at the geology (dry stone by the village row, V11)" (`:1997`).
- **§3.11.** "a record naming stone, 'Town walls' or 'City walls and gates' … → `inner`" (`:2247-2248`).
- **§3.12 REPLACEMENT.** "`setAttr` of the enceinte's kind to `inner`, `material: 'stone'` … the historical one where a
  stone wall replaced a timber circuit on its line" (`:2403-2406`).
- **§5.1 `roof.palette`.** "the roof tone drawn from the sheet's weighted list (thatch, tile, slate, shingle; our own
  weights, about one roof in three slate where the geology row gives slate) with a per-building tone variance of
  ± `roofJitter` (6 %)" (`:3129-3131`).
- **Tests and decisions.** T-V7-32 "retypes the kind to stone" (`:3321`). J-V7.15 (`:3468`).
- There is no village quarry class. A dossier `stone_quarry` (H, V) maps to `quarry` (V11 §3.11, `V11:2413`), and
  `brickmaker` (V) maps to `brickworks` (`V11:2372`).

**116 needs.**
- **(1) The village as the prime case.** With no declared partner (standalone) or no dossier link (the rule for 1 in 155
  births, `read-sf.md` F4), a village is native-only.
  - Its roofs and walls follow its native families by band.
  - The village rows use the same V11 material rows at the village rungs, or `v.`-keyed rows: P, the same rows.
- **(2) `roof.palette`** reads `Building.material.roof`, mapping each roof material to its tone with `roofJitter`
  kept (F12). The "geology row gives slate" clause is replaced by slate's native test (F1, F2).
  - Under the `VG` preset the sheet's own list may stand (emulation).
- **(3) §3.8a's "at the geology"** is replaced by the retaining row read over availability (F8).
- **(4) The `inner` circuit** (§3.4, §3.11, §3.12 and T-V7-32). A stone circuit only where stone is available. Else the
  "Town walls" record builds the circuit in the available masonry (brick where clay), else as a timber or earth circuit
  of the `inner` kind (P).
  - The REPLACEMENT's "retypes the kind to stone" must read "to the available masonry". J-V7.15 needs amending.
- **(5) F4's pin.** `roads: isolated` is a road form only.
- **(6) The entry store** (§3.11) stays the arrival point of traded material. The `import` substitute never licenses a
  material (F3). The smithy's iron import stays.
- **(7) Tests.** A village bar: 0 non-native fabric on a standalone village with no declared partner, at every rung and
  epoch (V-M milestones).

## 7. V04 — `docs/volumes/V04-underground.md`

**Now (C).**
- **§0.** "Old quarries lie under or near a town, as large as the stone the town was built from" (`:163-164`).
- **§3.5.3.**
  - "*Volume* (II.7.6, J-A65.45): `V = wasteFactor × (Σ_stone buildings perimeter × (eaveCm − baseCm) × 60 cm + Σ
    enceintes length × thicknessCm × heightCm + Σ towers 0.4 π r² h)`. *Cells:* the frame's cells with
    `SiteResources.stone ≥ 0.5` within `reachM`" (`:1663-1665`).
  - "The surface quarry is §4.9's `quarry` land use without a `source`" (`:1666`).
  - A stone working "serves the town's building stone and has no use" (`:1689`).
  - At an epoch `ΔV` is over "the stone buildings of `scope.built`" (`:1693-1694`).
  - "Where the cells within `reachM` run out before `ΔV` is met, the rest comes from the surface quarry, the unmet m³
    reported" (`:1703-1704`).
- **§3.11.** The failure row: "U-SYS quarry at an epoch | the stone cells within `reachM` run out" → "the rest from the
  surface quarry" (`:2290`).
- **§2.3 params.** `quarry`: `stoneWallCm` 60 (`:761`).
- **Other stone and masonry.** Ancient ruins' stepped monuments "rubble mound" (`:1510`). Foundations "a masonry
  pillar" (`:1386`). No material field on tunnels, sewers or vaults.

**116 needs.**
- **(1) Only local stone counts.** "Σ_stone buildings" counts only fabric of NATIVE stone (the stone family's F1 ids,
  ashlar and rubble, and of a mixed building its stone part's share). Stone fabric from a trade link or from salvage
  lays no local working.
- **(2) One stone test.** The native-stone test IS §3.5.3's cell test (F2), so a site with no stone cells in reach has
  no native stone and lays no stone workings.
  - The "unmet m³ from the surface quarry" branch is then reachable only when native stone cells are exhausted. P: the
    report says so, and the next epoch's availability may lose native stone (a worked-out quarry, feeding F11).
- **(3) Vaults and arch vaults under raised ways** follow the raised way's material (F8). An aqueduct's masonry needs
  masonry available.
- **(4) An ancient culture's ruins** are an older people's fabric, outside the present availability (V11 §3.18: "every
  ancient-culture row builds in long masonry"). Their stone may be a salvage stock only where the ledger credits it
  (F9 (a); item 113 (b)). P: a surface ruin robbed for stone credits the ledger as the town's own ruins do.

## 8. V05 — `docs/volumes/V05-sky.md`

**Now (C).**
- **§0.** When an island comes down it leaves "a field of fallen rock on the ground that people quarry for building
  stone" (`:170`).
- **§3.16 (4).** Covered land becomes "kind `quarry` with owner `commons` and `source` the landfall decoration … which
  sources no underground quarry system" (`:1487-1490`).
- **§3.16 (6).** "The salvage ledger is credited with `stone` = the covered land area × `stoneM3PerM2` m³ … so later
  building within the haul radius draws on it" (`:1536-1539`).
- `landfall: { coverShare; stoneM3PerM2 }` is "cover share 0.5, stone 3 m³ per m²" (`:634, :673`).
- The island's `stair` is "a stepped stone stair round a column of air" (`:680`).
- Nothing states the material of the island's buildings.

**116 needs.**
- **(1) The fallen rock is a salvage stock** of the stone family (F9 (a)), keyed by the F1 family, not the word `stone`.
  It lets stone be used locally while it lasts, even in a stoneless settlement.
  - It never makes stone native, and V04 already refuses it as a quarry source.
- **(2) Island buildings** read the settlement's availability (the island shares the settlement's partners and native
  set). The island's conjured rock and water carry no trade and no native material (V05 §3.20: the conjured river
  "carry no trade", `:1700, :1735`).
  - P: the island's own rock is magic's body, never a building source.
- **(3) Magical structures are not building materials** under 116: the floating stair, a bridge of light, and the
  island body. State it so the gate's totality has no gap.
- **(4) Item 115** (islands only with high magic AND high economy) makes islands rare. No conflict.

## 9. V03 — `docs/volumes/V03-interiors.md`

**Now (C).**
- §3.12 (5): "Walls keep §2.6's kinds; the draw styles an underground building's `exterior` walls by its host (the
  tunnel's masonry, the cavern's rock, item 109 (g)'s ruin masonry) … no new wall kind" (`:2045-2046`).
- §5.1: "walls by kind (exterior at the outline weight, party the same with the party hatch …, partition at ½, court as
  exterior …)" (`:2336-2338`).
- Hearths are "a filled rectangle of the stack in the roof tone with an ink rim" (`:2331`).
- No floor, stair or hearth reads a material.

**116 needs.**
- **(1)** The plan's exterior-wall fill may take the storey's wall material colour and texture: the storey split of F7
  (dear ground storey, cheap upper), texture and colour only.
- **(2)** Wall thickness, openings and stair kinds never read material (item 19). State it so a mixed building's plan is
  byte-identical to the unmixed one.
- **(3)** An underground building keeps its host styling.
- **(4)** No floor-by-material rule is needed. P: none, keeping item 19's shape rule.

## 10. V01 — `docs/volumes/V01-neighbourhoods.md`

**Now (C).**
- **§3.7.3 way surfaces (BCR-6).**
  - "every way without an edited `surface` takes the `way.surface` table's value for its class, the era row and the
    band of its fronting blocks" (`:1623-1625`).
  - Default rows: "`through`, `primary` — `paved` (setts) at `comfortable` and above in eras from the high medieval,
    else `cobble`; `secondary` — `cobble` at `modest` and above, else `dirt`; `lane`, `alley`, `cul_de_sac` — `cobble`
    at `comfortable` and above, else `dirt`; `track`, `path` — `dirt`; `quay` — `paved`; `pier` — `planks`; `bridge` —
    `paved` for a stone bridge, `planks` for a timber one" (`:1625-1628`).
  - "A raised road … takes the base's value from its record (masonry `paved`, timber `planks`, by its material row)"
    (`:1628-1630`).
  - This is ALREADY a surface material paired with band.
- **§5.1.2 roof law (hatched).** "The lit colour per building is the `roof` role's pick (the role holds a list in
  `hatched`: index by §8.2's multi-colour rule) scaled by `2^(0.3 × s)` …; NG 1.2.2 scales its roof colour by a power of
  two" (`:2755-2760`).
- There is no per-neighbourhood material character. A neighbourhood's look emerges from its plots' bands.

**116 needs.**
- **(1) Paving (F8).**
  - `paved` (setts) and `cobble` need stone available: native (river cobbles on a river site are the realist case for
    `cobble`), traded or salvaged.
  - With none, P: `dirt`, or `planks` where timber is native and the band is `comfortable`+ (timber-paved streets).
  - `brick` paving where clay is native would be a new surface key. The item decides.
  - `quay` `paved` needs stone. Without it, `planks`.
- **(2) The hatched roof colour** follows the roof material role (F12). NG's parity sheet keeps its two tones.
- **(3) Optional.** The district naming features (§3.7.4, `:1635-1640`) could read a district's dominant wall family
  ("Stone Row"). P: optional. It needs V11 naming rows if adopted.
- **(4) The lone neighbourhood** (`product: 'hood'`) reads its availability from its site slice: standalone and
  native-only unless a partner is declared.

## 11. V08 — `docs/volumes/V08-settlementforge.md`

Searched whole by the sf reader (`read-sf.md` §10–§11). Confirmed here from the volume text.
- **Dossier fields traced but never read for materials (C).**
  - `access` `isolated` "1 gate on a track-class approach" (`:771`).
  - The `deposits` row (`:776-807`).
  - `trade: { partners: { key, relationship }[]; links: { good, flow, partner }[]; entrepot; goods: { exports, imports,
    transit } … }` (`:569-570`).
- **The two existing material rows (C).** The `era` row: every culture → `c14`, region `western` (`:955-958`). The
  `materials` row: the six words (`:959-962`).

**116 needs.**
- **(1) Native inputs into DR15.** `site.terrain` (the `site` row, `:759-768`), `site.deposits` with state, and the
  landscape toggles. DR15 must list them as inputs (`read-sf.md` F1).
- **(2) Trade goods resolved.** `links[].good` through `goodWords` (V11 §3.13.5) into the licence of F3. A partner's own
  exports need a new digest field if admitted (`read-sf.md` F3 (b)).
- **(3) The dossier-declared material** (F10).
- **(4) A plain statement of the consequence.** Almost every SettlementForge map is native-only at creation
  (`read-sf.md` F4) and gains a non-native material only when an import link arrives (F14 absorb).
- **(5) The words for materials with no dossier source.** No SettlementForge word exists for slate, lead, lime or
  marble as deposits (`read-sf.md` F10). The item must say which of our ids each dossier source opens.

## 12. V09 — `docs/volumes/V09-application.md`

**Now (C).**
- **Material appears only on item-110 structures.**
  - "`setAttr` on a retaining wall (material, towers, high side)" (§4.3, `:1458`).
  - The retaining panel shows "its material" (§4.20.6, `:2783`).
  - Raised-way spacing is "within the material's `pierSpacingM` band" (`:2817`, `:4190`).
- **The context panel is generated from the entity registry** (§4.4, `:1513-1530`). A building's
  `material.walls`/`.roof`, being `setAttr`-overridable, would appear in About as a bare value with a tier chip.
- **§5.4 thematic views** (`:2960-2974`): None, Wealth, Shade, Supply links, Quarters, Uses, Who knows, Coverage, Voids,
  SettlementForge's chains. There is no Materials view, although the base `ThematicRow.key` admits `'material'`
  (rendering `01-s08…:190`).
- **T1 `intend`** (`:1566`): site, size, wealth, walls, style. There is no trade-partner or resource control. The
  landscape toggles are not placed on screen in the rows read.

**116 needs.**
- **(1) A Materials thematic view.** Buildings tinted by wall family, with a legend listing only the families drawn,
  each marked native, traded ("from {partner}") or salvaged. It uses §8.2's `material` thematic row.
- **(2) The building's About tab.**
  - Walls and roof, and the mixed split (F7), each with its source chip: "From the land" (native, with the site fact),
    "Brought from {partner}" (traded), "Reused stone" (salvage), "From SettlementForge" (F10), "Yours" (a declared
    override).
  - A **Why this material?** entry opening V10's section.
- **(3) The bend for an unavailable material** (the toolkit's "never a plain no"; only dossier facts and locks refuse).
  - On a standalone map, `setAttr` of a material the town lacks offers "Say {town} trades with a place that has
    {material}" (a partner declaration), else bends to the nearest available material with one line.
  - On a dossier map with no link, it bends with the line "No trade brings {material} here". A lock or pin never forces
    availability.
  - Catalogue keys in §4.9 (P: `bend.material.unavailable`).
- **(4) A standalone Trade control.** In T1's advanced panel or the site card: partners (name, bearing, road/river/sea)
  and what each brings (stone, brick, slate, timber, …), writing `CircumstanceSlice.trade` with goods (F3).
  - It includes the landscape toggles (quarries, logging) if they are not already on screen.
- **(5) The Supply links view** (`:2993-2998`) may draw a traded material's arrival from its gate or quay to its
  consumers. P: optional.

## 13. V10 — `docs/volumes/V10-clerk.md`

**Now (C).**
- **§3.9's default providers.**
  - A building's facts are "class, use, band, name, each with its tier and, for a dossier-derived fact, its DR row"
    (`:1718`). Material is not among them.
  - A retaining wall's facts include "material" with no cause (`:1726`).
- **§3.10's critique engine.** Rows K1–K18 (`:1862-1895`). None is on materials.
- **§3.7 creation mode.** The evaluation set includes the description "a small walled market town where two rivers
  meet, with a stone bridge" (`:2839`).

**116 needs.**
- **(1) A `material` section** in the building's (and a structure's) why:
  - the family and id;
  - its source: the native fact with its DR row (terrain, deposit and state), the partner key and the link's good, the
    salvage row, or the dossier's `materialFamily`;
  - the band read (built band);
  - the rank of the available families;
  - the alternatives ("Stone would need a trade partner that has it; none does").
  - It is knowledge-filtered like any fact.
- **(2) A critique row (K19, P).** "A draft or map declares {material} in {n} buildings, but {town} has no source for
  it". The fix is a partner declaration on a standalone draft, else the bend.
- **(3) Creation mode.** A description naming a material on a site that lacks it ("a stone-built town" on a forest
  river site with no partner) proposes a partner in the draft, or reports the bend. "A stone bridge" needs stone
  available (F8).
- **(4) Chronicle and history answers** name a trade link's arrival and end as the reason fabric changed (V06 (2)).

## 14. V12 — `docs/volumes/V12-calibration.md`

**Now (C).**
- **Material calibration is limited to item 110's cells.**
  - "`retaining` (row 79) by band: material weights …" (`:2116`).
  - "`raisedWays.structure`: … `pierSpacingM` by material, … `material` by band" (`:2118`).
  - "`era` (row 50) `aqueductM`, `raisedVaultM`" (`:2119`).
- **The material rows** (V11 row 49) sit in V11's "rest" line as `corpus` (`V11:4237`).
- **§3.6b's bar map** (`:1503-1535`) has no material row.
- **`MeasureInput`** (§2.2, `:424-490`) has no building material. It drops a retaining wall's `material` from `geo`
  metrics (`:484-490`), so material metrics would be `model` metrics that read records.
- **The presets** are `MFCG`, `FTG`, `VG`, `FM`, `NG` (`:1277`; V11 §2.2).

**116 needs.**
- **(1) Bar-map rows for 116**, their owners V11, V02 and V06 as §3–§5 above:
  - (a) Conformance, `exactBound` 0: unlicensed non-native fabric, at every derivation and epoch.
  - (b) Trend by band: the dear-family share rises across the four anchors where ≥ 2 families are available (`trend`
    over bands, B-CITY with fixture (iii)).
  - (c) The traded share outside the F5 band(s) is 0.
  - (d) The owner's example as a `most` bar on fixture (i): timber majority; stone only in the F5 bands and only with
    the partner.
  - (e) The mixed share in the middle anchors within a band (F7).
  - (f) The epoch fixture of V06 (H-TRADE).
- **(2) Register lines** for the new cells (the cost levels, the band shares, the thresholds of F2) with `panel` then
  `corpus` methods, and their fallbacks.
- **(3) Presets.**
  - `FTG` resolves the per-stage rows with the gate off (F13).
  - `MFCG` draws no materials (`ink`'s one roof role).
  - `VG` keeps its palette.
  - `NG` keeps its two tones.
  - `FM` keeps its per-building hue.
  - Each needs its `presets.*` entries on the new switch cell. P: one switch, `materials.supply.enabled`, true by
    default, off in the parity presets.
- **(4) The known-city fixtures** (§3.14) state their availability (native families and partners), so their materials
  are well defined.

## 15. The units the item must name

"Landed" means the unit's coherence rewrite has already landed. Such a unit gets a short late rewrite seat.

| Unit | Status | The part it applies (P) |
|---|---|---|
| base **model** (§2.6, §2.7) | landed | Supersede item 19's band clause, keeping "never shape". `MaterialRow.key` gains the band anchor and loses `regionalShift`. Add the mixed field of F7. Settle `RoofSpec.material`'s fate. The `MaterialLedger` key becomes the family. `TradePartner.goods?`. The derived availability function's declaration (F11). |
| base **pipeline** (§4.2 S1 (10), S2, §4.7 S11, §4.8, §4.9, §4.11, §10.2, II.7.6) | landed | The native tests (F2). Producers conditioned (F15). S11's material read through the gate. Bridges, walls and paving gated (F8). The hinterland land uses as sources. §4.11's builds and repairs read the gate; the ledger's shortfall never creates a material (F9); the fire rebuild shift bounded. II.7.6's quarry volume counts native stone only. |
| base **determinism** (§5, §6, §7.6, §7.7) | landed | A §5 ladder row for "no available material" (fallback, report). §7.6's switch and preset entries (F13). §7.7 DR15's inputs (terrain, deposits, trade goods, `materialFamily`), DR3's partners carrying goods, derived partners never licensing. |
| base **rendering** (§8.2, §11) | landed | Roof colour by material versus band (F12). Roles for any new id (F1). The mixed split per facet. The `material` thematic row. Export properties. |
| base **kernel** (§3) | landed | Nothing: material is never geometry. |
| base **scope** (§0 item 19's row, §13, §16) | in progress | Item 116's row. Item 19's row amended. §13 tests (T116-*). §16 milestones. |
| **V11** | volume | §3 above. The largest part. |
| **V02** | volume | §4 above. |
| **V06** | volume | §5 above. |
| **V07** | volume | §6 above. |
| **V04** | volume | §7 above. |
| **V05** | volume | §8 above. |
| **V03** | volume | §9 above (small). |
| **V01** | volume | §10 above. |
| **V08** | volume | §11 above. |
| **V09** | volume | §12 above. |
| **V10** | volume | §13 above. |
| **V12** | volume | §14 above. |

## 16. Conflicts and naming problems found in passing

1. **"Geology row".** V07 §3.8a and §5.1 cite a geology row for slate and dry stone. No such row exists; `Terrain.geology`
   is for caverns only (F2).
2. **Three thresholds for "native".** V04 uses 0.5, V07 uses 0.4, and V11's `req` states none (F2).
3. **Two roof-material homes.** `Building.material.roof` and `RoofSpec.material` (no writer), with rendering's "by
   `roof.material`" ambiguous between them (F7).
4. **The ledger's key.** V05's `stone` versus the material ids versus V11 §3.18's "timber 8, infill 4" (F1).
5. **`timber` means two things.** A raised-way deck material and shanty board walls (F1).
6. **"Isolated" means three things** (F4).
7. **Band-keyed material already exists** in the item-110 structure rows. Item 19's "never keyed to band" was stated for
   buildings only. The item should say this so the structure rows are not read as a precedent conflict (F8).
8. **Item 110's `pierSpacingM` by material** is a shape read of material. It is allowed for structures but must be
   stated (F8).
9. **The `lit` band tint versus band-paired materials** double-encodes wealth (F12).
10. **The supply web lets any material good be imported generically**, which contradicts the refinement (F3).
11. **`mason_yard` is demanded per capita** whether or not the town has any stone (F15).
12. **The owner's "can't have … or grow to have"** needs its reading pinned: construction, not demolition of standing
    fabric (F9 (b)).
13. **A dossier-declared `materialFamily`** can contradict the refinement. The dossier wins on that building only (F10).
