# Review of item 116, lens: wiring and unit coverage

Reviewer's note, 2026-09-30. Subject: `docs/validation/coherence/work/g116/item-116.md` (529 lines), read whole, with
`draft-notes.md`, the readers' notes `read-base.md`, `read-vols.md`, `read-sf.md` and `read-owner-decision.md`, and
the sibling review `review-rules.md`. I checked every claim below against the design files themselves:
- the coherence pass's base section files under `docs/validation/coherence/new/base/`;
- the landed volume rewrites `new/volumes/V03-interiors.md` and `new/volumes/V04-underground.md`;
- the live volumes `docs/volumes/V01…V12`;
- `research/sf/`;
- the 114–115 draft in `work/g114-115/` (`items-114-115.md` and `draft-notes.md`).

"Item L" means line L of `item-116.md`. File abbreviations follow `read-base.md`: MODEL, PIPE, CONT, II7, FAIL, DET,
EDIT, REND, EXP (all under `new/base/`). Grep receipts are in `tmp/` (`ids.txt`, `model-hits.txt`,
`pipe-material.txt`, `hits-V*.txt`, `sec-V*.txt`, `v11-heads.txt`).

**Verdict.** Some parts are wired both ways and are fine:
- the new identifiers are unique;
- the core records (`MaterialSupply`, `BuildingMaterial`, `MaterialOrigin`, `TradePartner.supplies`) have a producer,
  consumers, a digest place and a migration row;
- the landed-unit list is right.

Twelve parallel editors would still diverge, for three reasons:
1. **Several shared records and tables are named but not pinned.** These are `MaterialDef`, `MaterialPreference`, the
   `materials.*` cell paths, the native-test cells, the table ids, and where the cost factors live.
2. **Some wiring contradicts the base as it stands:**
   - a declared partner moves the whole town through `TradeFlow`;
   - `SliceRef` is table-only;
   - `ReportCode` is a closed union;
   - `F-ROUTE` has no `no_crossing` rung;
   - two new goods fail V11's goods-totality compile test.
3. **About twenty sections and volume parts that must change are missing from (r)**, among them §7.4's lifecycle rows,
   §5.3's invariants, §2.8's registry, V04's U-FORECAST, V06's structure hazards and V07's palisade draw.

I found 32 defects: W1–W8 major, W9–W22 medium, W23–W32 minor. Section B lists what I checked and found sound.
Section C is the one list of required changes.

---

## A. Defects and required changes (most severe first)

### W1 (major). A declared partner is not wired into the trade record it joins, so its "scoped" Adjust is false

**Evidence.**
- (c) and (l), item 123 and 355–358: standalone partners are declared in V09's Trade control into the creation slice, "as
  an `Adjust` whose re-derivation is scoped by the supply's family slices … (a building's moves no geometry …)".
- (c), item 107–111: the partner record is `TradePartner`, with required `weight` and `bearingCdeg` and `source` gaining
  `'declared'`.
- EDIT §7.7 layer 2 (l.1431–1449):
  - "every partner's bearing and weight feed `TradeFlow`";
  - "The `road` partners' bearings are among S3 (4)'s requested external bearings";
  - weights are "normalised to Σ = 1".
  - It also says "standalone, one per external bearing the blueprint requests". The `source` of those partners is never
    stated.
- PIPE §4.3 *Trade flow* (l.836–857): `TradeFlow` weighs every partner of `CircumstanceSlice.trade` into gate weights.
  §4.5's trade kernels read those weights, and so do the prosperity field and hence the bands, plots and classes.
- `TradePartner` has no name field (EDIT l.1508): `key` is "the partner's binding key, or a standalone name". The legend
  ("brought from {partner}"), the why and the chronicle (item 436, 328) need a display name.

**Defect.** Adding a declared partner with a weight above 0, which (c) requires for it to license anything (item 114),
does several things:
- it renormalises every partner's weight;
- it moves `TradeFlow`, hence the field and the whole town;
- if its route is `road`, it adds an S3 bearing, and so possibly a gate and an arterial.

The Adjust's stated scope is therefore wrong. Nothing pins a declared partner's `weight`, `bearingCdeg` or name, or
whether it enters `TradeFlow` and S3 at all. The base's standalone fill (per-bearing partners) is also not restated
beside "empty by default", so editors cannot tell whether those partners stay (and with which `source`).

**Required change.** In (c), pin the declared partner whole. My recommendation is (a); either way, state it:
1. **The choice for `TradeFlow` and S3.** Either:
   - (a) a `declared` partner is a **material licence only**: it is excluded from `TradeFlow`, from S3 (4)'s requested
     bearings and from the Σ = 1 normalisation, and its `weight` is fixed at 1 for the licence test; or
   - (b) it is a full partner. Then its Adjust re-derives from S3, with the fate report (§7.8's locality class
     *re-derive from S3*), and (l)'s "moves no geometry" is struck.
2. Its `bearingCdeg`: a draw on `gate.pick` keyed by its key, as for dossier partners without one, or a Trade-control
   value.
3. `TradePartner.name?: string`, filled from `DossierDigest.economy.partners[].name` by DR3 and from the control
   standalone. `MaterialOrigin.partner` keeps the key; readers resolve the name through the circumstance timeline.
4. Restate the standalone fill order: the blueprint's per-bearing partners stay `source: 'derived'` (supplies `[]`), and
   declared partners are added after them.
5. Pin the event: `adjust('circumstances.trade', …)` on the timeline's first entry, as item 115 (a) (2) does for magic.

### W2 (major). The shared record shapes, table ids and cell paths are not pinned

**Evidence.**
- (a) gives `MaterialDef` only as a table (item 40–62). The model row (item 500) says the model STATES the TS types of
  `MaterialDef`, `MaterialPreference` and `MaterialMixRow`, while V11 (item 506) STATES their rows.
- The other record shapes are not pinned either:
  - `MaterialPreference` has no shape. Its key precedence and "the class family's generic row" (item 405, 425) are
    undefined. No class-family field exists in `BuildingClassRow` (CONT l.52–59).
  - `MaterialMixRow` has a field list but no types.
  - The "means rows", "works factors", "native thresholds and reaches" and "poor-ground factor" (item 506) have no cell
    paths.
- **Cost factors have two homes.** (a)'s table puts era factors on the `MaterialDef` row (`brick`: "era c12 × 1.4 …",
  item 45). (i) says "the culture row's building block and the era row, V11" (item 297). (m) says a region's rows
  "become `MaterialDef` region cost rows" (item 370). `draft-notes.md` D37 says `MaterialDef.factors.region`. V11's
  catalogue has separate tables: row 43 `climate`, row 50 `era`, row 71 `culture`.
- **Table ids.** V11 §3.1 row 49 `materials` holds `MaterialRow` (`V11-content.md:910`), and its *Readers* column must
  list StageIds, which T-V11-1 (b) enforces (`V11:834–850`). The item names no table id for `MaterialDef`,
  `MaterialPreference` or `MaterialMixRow`, and no readers.
- **The stone reach.** (b) says the stone radius is "II.7.6's `reachM`" (item 80). In II.7 `reachM` names four
  different cells: `connection.reachM` 60/120 m, `access.reachM` 5, the catacomb's 80 m, and the quarry's 2 km (II7
  l.69–70, 337, 598, 623). The other families' radii are "V11 cells".

**Defect.** V11 (rows), the model (types), V12 (register lines), the pipeline (formulas and S1 (11)'s tests), V04 and V07
(the thresholds) and V09 (the tables editor) all write against these names in parallel. With no shapes, no cell paths
and two homes for the factors, they will not agree.

**Required change.** Add to (a) the TS of each record, with one home for every factor. For example:

```ts
interface MaterialDef { id: string; requires: MaterialFamily[]; nativeOnly: boolean; slots: MaterialSlot[];
  covers?: { kinds: RoofSpec['kind'][]; minPitch?: number; maxPitch?: number };
  mass?: 'masonry'|'timber'|'earth'; baseCost: number;
  factors: { climate?: Record<string, number>; culture?: Record<string, number>; era?: Record<string, number>; region?: Record<string, number> } }

type MaterialSlot = 'walls'|'roof'|'enceinte'|'bridge'|'harbour'|'raised'|'retaining'|'lining';

interface MaterialPreference { key: { structure?: string; cls?: string; districtKind?: string; cluster?: string };
  slot: MaterialSlot; admits: { id: string; weight: number }[]; prestige?: number }

interface MaterialMixRow { lower: 'masonry'|'earth'|'timber'; upper: 'masonry'|'earth'|'timber';
  parts: { upper?: number; gable?: number; outshots?: number } }
```

Then:
1. State every factor on `MaterialDef.factors`, and say that the climate, era and culture rows hold no material cell.
   Alternatively choose the reverse, but choose one.
2. Name the cells in full:
   - `materials.pick.{blend, mix, tieBand}`;
   - `materials.cost.{haul, salvageFactor, importPremium, routeRate, refLegM, poorGround}`;
   - `materials.means.{bands, rungMeans, works}`;
   - `materials.native.<family>.{threshold, areaHa, radiusM}`;
   - `materials.supply.enabled`.
3. State that the stone radius is `materials.native.stone.radiusM` (2 000). II.7.6 and V04 §3.5.3 read that one cell,
   renamed from the quarry's `reachM`. That rename is itself a pipeline and V04 part.
4. Name the tables: V11 row 49 `materials` holds `MaterialDef`, `MaterialPreference`, `MaterialMixRow`, the parity
   `MaterialRow` and its `settings` named row. Give their reader StageIds: S1, S2, S7, S10, S10a, S11, S12a,
   `EVO_PRELUDE`, `EVO_SITING`, `EVO_GROWTH`, `EVO_WORKS`, `EVO_HAZARD`, `U-NET`, `U-SYS`, `U-FORECAST`, VS1–VS6.
5. Define "the class family's generic row" as a key, or drop it from the ladder.

### W3 (major). The draw keying contradicts itself and is not wired into §6.1

**Evidence.**
- (g) (4), item 205–206: the pick "draws on concern `material`, keyed by the consumer's lineage and the slot, always
  drawn in full (… two for a structure)".
- (p) *Streams*, item 420–422: "a retaining wall's and a raised way's on their stages' own streams, as item 110 keys
  them".
- DET §6.1: the `heights`, `material` row reads "S11 (§4.7, §2.6)" only (l.139). `raised.reason` has a documented draw
  order, "one uniform per `RaisedReasonKey` … a raised part's pier pitch" (l.167). No levelling concern exists.
- DET §6.1 *Fixed-key draws* (E-03, l.99–104): "Each site states only its concern, key parts, chance source, comparison
  moments and persistence". T116-9's monotone rebuild (item 208–209) needs exactly such fixed draws.

**Defect.** Editors of S7, S10, II.7.2 and V07 cannot tell which concern a structure draws on. If raised ways draw on
`raised.reason`, appending two uniforms without an order moves the pier-pitch draw. That breaks T116-1's no-op pin with
the switch off. Nothing says whether rebuild draws carry an epoch component.

**Required change.** Pin one rule in (g) and (p):
1. Every pick, for buildings and for structures alike, draws on `material`, keyed by the consumer's lineage and the
   slot, with **no epoch component** (a fixed-key draw under E-03).
2. The retaining wall's and the raised way's existing band draws stay on their own streams and run only with the switch
   off.
3. With the switch off, S11's parity draw keeps its present keying.
4. Extend §6.1's `material` row with its readers: S7, S10, S11, U-NET, `EVO_*`, VS*. Add this to (r)'s determinism
   row.

### W4 (major). The report codes cannot land as written: `ReportCode` is closed, and the "reason codes" are not report codes

**Evidence.**
- FAIL §5.4 (l.265): `type ReportCode = 'work_cut'|…|'toll_bridge_dry'` is a closed union. Its table (l.274–287) gives
  each code a failure **class** and a **landing** ("where it lands"), and calls them "the only codes a ladder writes".
  Each code is a `MsgRef` key that V09 §4.9 renders.
- (p) lists 13 new codes with no class and no landing (item 427–430).
- Two of them are tier-0 outcomes, `material_dossier` and `material_edit_unsupplied` (item 407), so they are not ladder
  uses.
- (d) (item 146) calls the supply's facts (`native_raster`, `native_deposit`, …) "§5.4 reason codes". They are not
  failures and have no landing in `GenerationReport`.
- V09's catalogue (`V09-application.md` §4.9) and CVR-V10-4's locale rule require every key in every shipped locale.
  (r)'s V09 row (item 514) names only `bend.material.*` and the legend words.

**Required change.**
1. Add the 13 codes to `ReportCode` and to §5.4's table, each with its class and landing:
   - F-MATERIAL → `ladderUses`, for `material_floor`, `material_kind_substituted`, `ruins_stock_short`,
     `fire_rebuild_unavailable`, `bridge_no_material`, `pier_no_material`, `raised_no_material` and
     `retaining_no_material`;
   - the web class → `unserved`, for `material_unsupplied` and `timber_short`;
   - `dossierNotes` or `requestedVsBuilt`, for `material_dossier`, `material_edit_unsupplied` and
     `partner_no_supplies`.
2. Retype `MaterialSupply.families[].land.reasons` as its own closed type `NativeReason`, declared with
   `MaterialSupply` in §2.7 and not as §5.4 codes.
3. Add every code to V09's §4.9 catalogue rows in (r)'s V09 row.

### W5 (major). "Each family entry is a derivation slice" does not fit `SliceRef`, and its invalidation would re-pick standing fabric

**Evidence.**
- (d), item 157–159: "Each family entry is a derivation slice (§2.8's `DerivationRecord.slices`), so a change of the
  supply re-derives exactly the entities whose picks read a changed family (§7.6's slice rule)".
- MODEL l.2020: `interface SliceRef { table: TableId; version: string; kind: 'row'|'weights'|'bracket'|'thresholds'|'match'; … }`.
  That is table slices only.
- EDIT §7.6 *Invalidation by slice* (l.1374–1383) fires on a **table edit** (`editTable`/`editPreset`).
- (j) (1), item 302–303: "Standing fabric keeps its material and origin whatever the supply later does".

**Defect.** The supply is derived data: it has no `TableId` or version, and it changes at epochs, at a deposit put and at
a partner Adjust, never by a table edit. The mechanism named does not fire. If it did, it would re-pick standing
buildings at every epoch, which contradicts (j) (1).

**Required change.** In (d) and in the model and determinism rows:
1. Add a `SliceRef` kind for supply families: `kind: 'supply'`, `table: 'derived.materialSupply'`, key the family, hash
   over that family's entry.
2. State the one trigger: an `adjust` of the creation slice's trade, of the switch, or of the terrain's
   `slate`/`lead`/deposits at creation. That re-derives the entities citing a changed family.
3. State that an epoch never invalidates by supply slice ((j) (1)).
4. Add this to §7.3's locality text. W12 lists §7.3 among the missing sections.

### W6 (major). The enceinte's "kind follows the mass" has no field, and V07's palisade draw and dossier wall records are not reconciled

**Evidence.**
- (i), item 251–252 and 256–260: "a structure's KIND follows the picked material's mass". The enceinte picks over
  masonry, `timber` ("a palisade") and `earth_bank` ("a rampart").
- MODEL l.1621: `Enceinte.kind: 'citadel'|'inner'|'outer'|'suburb'|'bailey'|'palisade'|'earthwork'`. This one field
  carries both the ring's role and, at village rungs, its construction. PIPE §4.8 (l.2623, l.2669) and V11's
  `walls.barriers` rows key sections and towers by kind.
- V07 §2.2 (`V07-village.md:705`): "palisade kinds palisade / earthwork / inner … 0.8 / 0.2 / 0", drawn on
  `village.palisade`, with no supply read. A palisade needs timber.
- V07 §3.11 (`:2247`): "a record naming stone, 'Town walls' … → `inner`". (l), item 348–349, says a record whose
  `kinds` row declares a material "is honoured on that element (origin `dossier`)". (r)'s V07 row (item 512) says
  instead "in the available masonry, else a `palisade` or `earthwork` kind".

**Defect.** For a TOWN whose `outer` wall picks timber, it is not stated whether `kind` becomes `palisade`, which would
lose the ring's role that S5a, V06's contraction and `supersededBy` read, or stays `outer` with masonry section rows.
Four units write this: §2.7, §4.8, V07 and V11's walls rows. The village's kind draw ignores the supply, so a
timberless village gets a palisade. For a dossier record naming stone, (l) and the V07 row give opposite rules.

**Required change.** Pin in (i):
1. **The field.** `Enceinte.kind` keeps the ring role. The construction is the picked material's mass, and the section
   rows (thickness, height, walk, towers) are read by (kind, mass).
2. **The village.** At village rungs, V07's `palisade.kinds` draw is replaced by the pick over the kinds the supply
   admits: `palisade` needs timber available at the works means, `earthwork` always, `inner` needs masonry.
3. **A dossier record.** A record whose words name stone is a dossier-declared material (origin `dossier`, (l)). A
   "Town walls" record without a material word takes the pick. Amend J-V7.15 and T-V7-32 to match, and state both
   rules in the V07 row.

### W7 (major). The producer side of the supply web fails V11's own compile test, and two named rows do not exist

**Evidence.**
- (k), item 332–333, adds the goods `slate` ("site, bulk 3") and `lead` ("made from ore, bulk 2"). V11 §3.7.2
  (`V11:2125–2126`) and T-V11-28 (`V11:4149`) say that "every good has at least one producer … and at least one
  consumer … the compile fails otherwise". The item names no producer (no slate land use or class, no lead-making class)
  and no consumer (no supply edge on either).
- (b) makes thatch native by straw (`fertile` ≥ 0.4, item 83). The only thatch good is `reed` (item 332;
  `V11:2067`), whose producer is the `marsh` land use (`V11:2106`). The thatcher's edge is `supply reed 3 000 m road`
  (`V11:1465`). In a straw-thatch town the thatcher is always `material_unsupplied`.
- (c), item 117: "its `goodId` through a goods-id row". No such row exists: `goodId` appears only in §14's digest type
  (`scope/07-s14.md:251`) and nowhere in V08 or V11.
- (k), item 337–339: "S2 demands a producer class only where its family is available … `mason_yard` and `timber_yard`
  where their family is available". §10.2's gate field is `BuildingClassRow.requires: ('water'|…|'stone'|'timber'|…|'clay')[]
  /* the site-resource gates S2 reads from SiteResources */` (CONT l.52). It cannot say "native by land" as opposed to
  "available".
- V11 §3.5.2's reading rule gives every class supply edge `substitutes: ['import']` (`V11:1393`; restated `V11:2116–2117`). The refusal of the
  generic import is written in the pipeline row (item 502) and nowhere in V11.

**Required change.**
1. Give `slate` a producer: the `quarry` class and land use on a `Terrain.slate` site, with its surface in §4.9. Give
   `lead` a producer: `mine`/`smelter` "lead where the deposit is `precious_metals`". Give both a consumer: a roofer's
   supply edge on the `thatcher`/roofing yard row, or a `demand` other than `classes`.
2. Add a straw good (`straw`, site `land · arable`, `material: thatch`), or state that the thatcher's `reed` edge is
   served by arable where straw is the native basis.
3. Declare the goods-id row, with its home (V08 §2.6 `goodIds`: SettlementForge goods-catalog id → our good), or drop
   `goodId` and read the `good` label through `goodWords` alone.
4. Add a family gate field, `BuildingClassRow.requiresFamily?: { family: MaterialFamily; basis: 'land'|'available' }[]`,
   to §10.2 (pipeline) and V11 §2.3/§3.5 (rows).
5. Make V11 §3.5.2's reading rule the one home of "a good whose `material` is set takes no `import` substitute; its
   partner's endpoint store serves it". Put it in (r)'s V11 row and cite it from §10.2.

### W8 (major). Base sections that must change are missing from (r) and HOMES

Each of these sections holds a statement that item 116 falsifies, or a list the new pieces must join. None is in (r)'s
rows or the HOMES line (item 519–522).

| section | evidence | required part |
|---|---|---|
| **§2.8 entity registry and `factTier`** (model) | EDIT l.286–287: "The entity registry (§2.8) declares each type's edit kinds with their undo path and lifecycle row; its completeness test is §13.2's" | the new `setAttr` paths (`material.walls`, `.roof`, `.mix`; `Bridge.material`; `Way.material`; `Tunnel.lining`; `Terrain.slate`, `.lead`; `District.materialOverride`) as registry rows; `factTier` of a material whose origin is `dossier` (map fact, per (r)'s determinism row) |
| **§2.9 view key `thematic`** (model) | MODEL l.2570–2571 enumerates `none`, `wealth`, `shade`, `links`, `quarters`, `uses`, `knowledge`, `coverage`, `voids`, `supplyChains` | add `materials` |
| **§2.3 `Terrain.mining`** (model) | PIPE l.393–394 writes `Terrain.mining (§2.3)`; the landed MODEL `Terrain` (l.414–424) does not declare it (`rewrite-pipeline.md:194` asked for it). PIPE l.395–396 and MODEL l.423 say "only II.7.6's cavern rule reads the flag" | the model's late seat declares `Terrain.mining` beside `slate` and `lead`; the pipeline strikes "only II.7.6's cavern rule reads" now that P(lead) reads it (item 95) |
| **§4.1 / §4.12 stage registration by declared I/O** (pipeline) | PIPE §4.1 (l.30–38): each stage registers a `StageDecl`; the sort and locality read its declared keys | S1's outputs gain `materialSupply`; S2, S4, S5b, S7, S10, S10a, S11, S12a and the U-* and VS* stages declare it as an input |
| **§4.3 S4 / S5b** (pipeline) | a bridge with no material is decided at S7 (item 261–264), after S4/S5 laid the span through the deck (PIPE §4.2 S1 (5) l.328–340: the `Bridge` becomes `built` when a way lays its span) | S4's router reads the supply: a crossing with neither masonry nor timber admitted at the bridge's works means is no bridge candidate, only a ford or F-ROUTE's next rung (W14) |
| **§4.13 edges** (pipeline) | PIPE §4.13 (l.3841–3845): "the edge suite (§13.2, B-EDGE) runs one fixture per row below" | an EP row for S1 (11) and the pick, citing (o); the combination grid's cells where supply meets raised ways, retaining walls and decks |
| **§5.3 invariant suite** (determinism) | FAIL §5.3 (l.162–241) is where hard model rules run per batch, save and load; its "neighbourhood character" row checks "every building's prosperity-driven state inside its district's band range" | a hard row for the licence (no material outside the supply but origins `dossier`, `edit`, `rows`; stage-end S11, each `epoch`, load); the neighbourhood-character row amended to match whichever institution rule R1 settles |
| **§7.3 locality** (determinism) | EDIT §7.3 holds the effective scope of every edit | the partner Adjust's scope (W1, W5); the switch's Adjust from S1 (11) |
| **§7.4 lifecycle table** (determinism) | EDIT §7.4 (l.921–966): one row per edit kind — create · read · persist · regenerate · undo · migrate. Item 114 (k) names "§7.4's lifecycle rows" for its fields | rows or amendments for: `setAttr`/`paint` on material paths ("heights and roof: S11" → add "materials: S11, S7, S10, II.7.2"); `adjust('circumstances.trade')`; `setAttr` on `Terrain.slate`/`.lead`; `materialOverride` |
| **§8.1 display list** (rendering) | REND l.34: `attrs` columns hold a single `material`; the Materials view's legend needs the origin (item 435–436) and a mixed building's second material | columns `materialWalls`, `materialRoof`, `mixPart`, `mixWalls`, `materialOrigin` (kind code) |
| **§8.2 colour-deficiency table and texture map** (rendering) | REND l.541–549: the row "prosperity (`lit`'s roof-by-band rows …) | a hatch density by band"; the texture set is 15 named tiles (l.706–712) | the `lit` row re-pointed to the FTG sheet, and a Materials row (cue: the family's pattern); a total map from `MaterialDef` id to tile (W27) |
| **§8.11, §9.7, §11.6 edge sections** (rendering) | each part has an "Edges (principle (11))" section (REND §8.11, EXP §11.6, labels §9.7) | the rendering and export edges of (o): a mixed building at the city band, the Materials view with only earth, a mix in glTF and CityJSON |
| **§11.1 skeleton** (rendering) | EXP §11.1 *skeleton*: "the recipe's intent and … every event whose entities §2.8's `factTier` reads `declared`" | the skeleton carries declared partners (`source: 'declared'`) and material `setAttr`s, or re-import loses every traded material |
| **§12.4** (rendering) | KERN l.1082–1086: "S11's single §12.4 row, whose remainder is S11's rule evaluation (the designation template, heights, materials, entrance)" | the two budgets (item 439–440) placed in §12.4's S1 and S11 rows, not as free-standing sentences |
| **§13.2 T8-5, T26-1** (scope) | S13 l.368: "(T8-5) … every shortfall is reported"; l.437: "(T26-1) … the import share reported" | amend both: (j) (5) makes a ruins-only shortfall block the build, and (k) replaces the timber import by partner or `timber_short` |
| **§13.8 bar schedule** (scope) | S13 l.1464: "The bar schedule (the one statement of when a §13.2 bar runs; §16's exits cite it)" | a tier (PR or nightly) for each of T116-1 – T116-32 |

**Required change.** Add each row's part to the named unit in (r), and add each section to HOMES.

---

### W9 (medium). Volume parts missing from (r)

| unit | evidence | required part |
|---|---|---|
| **V04** (landed) | `new/volumes/V04-underground.md` §3.3 U-FORECAST (l.1126): "a **quarry** by V04 §3.5.3's volume law over the roster's predicted stone stock" — run at S7b, before any material exists | U-FORECAST predicts the stock from the supply: native-land stone only, 0 on a stoneless site |
| **V04** | MODEL l.1757: `Gallery` has no lining field; (i) says "V04's own dug passages follow the same rule" (item 283) | either `Gallery.lining?`/`liningOrigin?` (§2.7; model row), or "dug passages carry no lining"; no rule without a field |
| **V04 and model** | MODEL l.1813–1817: `RaisedWayRecord.spans[].use: 'open'\|'vault'`; V04's `archVault` chambers are "the walled-in arch of a raised way's span" (MODEL `ChamberKind`) | a span's `vault` use and an `archVault` exist only on a masonry raised way; a timber raised way's spans are `open` |
| **V04** | `new/volumes/V04-underground.md` §3.13 *Edges* (l.2224) | a row for a stoneless site and for traded stone |
| **V06** | `V06-evolution.md` §3.11.2–§3.11.3 (l.2017–2031), §3.19.2, §3.19.5: a timber deck breaks in a flood and chars in a burn, "a masonry deck is unharmed"; timber raised-way supports break at `timberScourCm` | these read `Bridge.material`, `Way.material` (piers, moles) and the raised way's material by mass; the V06 row gives only "flood and fire by `walls`" for buildings |
| **V06** | V06 §3.7 (new circuits, `contractWall`), §3.19.2 and §3.19.4 (`repairRaised`, `repairRetaining`, "a new stretch" on a ruined one) | which structure events are repairs in kind (keep material and origin) and which re-pick at the epoch's supply; (j) states this only for buildings |
| **V06** | T-V6-17 (`V06:3329`): "only of the listed wall materials" | amended for mixed buildings and the new ids |
| **V07** | `V07-village.md:705`, §3.4 (W6) | the kind draw over the supply |
| **V01** | `V01-neighbourhoods.md:746–759`: `HoodRecipe` has no partner field; the V01 row says "the lone neighbourhood's supply from its hood recipe's partners" | name the field: the `Recipe.circumstances` creation slice's `trade`, as for a town |
| **V02** | V02 §5.5 exports (BCR-V2-21) write the composition per wing and facet | "glTF names wall surfaces by storey or part" (item 438) needs V02 §5.5's part; add it to the V02 row |
| **V09** | V09 §4.3, "the tool binding table — every edit kind and where a user reaches it"; §4.4, the context panel is generated from the entity registry; §5.15, "Every new thing: drawn, labelled, exported, persisted" | binding rows (T12 `dress` for building material, T5 for `materialOverride`, T3 and the wall tools for structures, the terrain row for slate and lead, the Trade control's panel, advanced not basic — R15's ≤ 12); `critique.K19` and the W4 report-code keys in §4.9 |
| **V10** | `V10-clerk.md:784`: `CritiqueFinding.rule` "K1 … K18"; T-V10-17 "one fixture per row K1–K18"; CVR-V10-4's catalogue keys `critique.K1` – `critique.K18` | K19 in all three; the creation mode's path for a proposed partner (an `IntendInput` field or the `adjust('circumstances.trade')` of W1), as item 114 (h) pins `IntendInput.economy` |
| **V11** | V11 §1b wiring table; §2.1 registry; §3.1 catalogue with readers; §2.8c types `RetainingProfileRow.material` and `RaisedWayStructure.material` (`V11:693`, `:719`); `raisedWays.structure.pierSpacingM` "by material" (`V11:3812`); §3.20 naming grammars (V01's `material` naming feature needs its words, item 299–300); row 90 `way.surface`'s `SurfaceRow` | each named in the V11 row: §2.8c's two material fields retired into `MaterialPreference` rows, `pierSpacingM` re-keyed by mass, the naming feature's words in §3.20 |
| **V12** | `V12-calibration.md:887–890`: `ownerRule` stamps; items 114 and 115 each state "§1's owner-rule list entry"; V12 l.2116–2118 calibrate "`retaining` … material weights by band" and "`raisedWays.structure`: … `material` by band" | §1's owner-rule entry for 116's stamped cell; the two item-110 register lines retired or re-pointed to the preference rows |
| **V08** | `V08-settlementforge.md` §1b wiring table; §7.1 bars | §1b rows for the three digest fields and DR3's supplies fill; a T-V8 bar that the fill reads only the named fields |
| **every volume** | items 114 and 115 name each volume's §1b wiring row and lifecycle-table row (for example 115 (h): V05's "the §1b wiring row", "§2.6's lifecycle row") | each volume row in (r) names its §1b rows and lifecycle rows for the fields and cells it adds (V06's `fire.ordinanceStretch`; V07's `v.` preference rows; V01's `brick` surface; V04's lining) |

**Required change.** Add each part to the named unit's row in (r).

### W10 (medium). Two units STATE the same rules (single source broken)

**Evidence.**
- (r)'s pipeline row STATES "§4.11's prelude, re-picks, refurbishment, fire, repairs in kind, ledger by family, ruins
  stock …, sources over epochs, the replay's partners and deposits" (item 502).
- (r)'s V06 row STATES "(j)'s mechanics in the engine: the prelude re-derivation, re-picks, the refurbishment rule, the
  fire rebuild …, arrivals and closures, sources, ruins stock, the replay's partners and deposits" (item 511). It also
  lists "§4.11's rules" under REFERENCES.
- The same pattern recurs in two more places:
  - V01's row STATES "the `hatched` roof colour by covering", while the rendering row STATES palette rows "in `ink`,
    `lit` and `hatched`" (item 504, 517);
  - V11 STATES "the native thresholds and reaches", while the stone reach is II.7.6's cell (W2).

**Required change.**
1. §4.11 STATES (j)'s rules. V06 REFERENCES them and STATES only its engine parts: `EVO_PRELUDE`'s step row, §3.11.2
   (4)'s ordinance with its cell, the hazard reads of W9, the fixtures and the chronicle lines.
2. §8.2 STATES every family's role values. V01 §5.1.2 STATES only that `hatched`'s roof program reads the covering's
   role.
3. The stone radius has one home (W2).

### W11 (medium). "One term per concept" breaks in six places

**Evidence and required change.**

1. **`timber` means three things.**
   - Evidence: it is a `MaterialFamily`, a `MaterialDef` id (sawn boards, item 48, 68–69) and a good (`V11:2063`).
     V06's flood rule reads "timber, cob or wattle walls" (`V06:2028`) and cannot tell family from id.
   - Change: rename the material id to `boards` (V11's shanty row already writes "timber (boards)", `V11:3380`). Add a
     §7.5 migration row (`Building.material.walls` `timber` → `boards`) and re-key the item-110 raised rows.
2. **`MaterialLedger.rows[].material: MaterialFamily`** (item 415). The field says "material" and holds a family.
   Rename it `family` (migration: the old id → its family). The same fix applies to the goods column
   `material?: MaterialFamily` (item 331): name it `family`.
3. **"The `deposits` row's new family column"** (item 116).
   - Evidence: V08's `deposits` row already maps "deposit key → resource family and hinterland land use"
     (`V08:776–777`), and `DepositSite.family` holds `ore`, `stone`, `clay`, `salt`, `peat` (MODEL l.1782).
     `clay` ≠ `fired_clay`. (b)'s deposit rule says "for a family the dossier lists" (item 88) without saying which
     family.
   - Change: name the new column `family` of type `MaterialFamily | null`, as a separate cell from the resource family.
     List every key's value: `stone_quarry` → stone; the timber keys → timber; `river_clay` → fired_clay; `glass_sand`
     → none; `marshlands` → thatch; `precious_metals` → lead; `coal_deposits` → none (fuel only). State that the
     deposit rule reads this column.
4. **"stack".**
   - Evidence: in V02 and V03, "stack" is the stepped tier stack (`MassingRef.stack`, `rebaseStack`; `V02:319`, `:822`).
     V03 also uses it for a chimney stack (`V03 §3.7.2`; landed V03 l.216, 350). (r)'s V02 row writes "`gable` the main
     wing's gable-end facets and every stack" (item 507), and (h) writes "chimney stacks" (item 247).
   - Change: write "every chimney (`Chimney`)" throughout.
5. **"ceiling".** Item 114's Terms (`work/g114-115/draft-notes.md:421–423`) reserve "ceiling band" for item 72's range
   end and name the map-wide bound "prosperity ceiling" and its band "highest allowed band". Item 116 uses "the
   ceiling" for both: "a district's range is lowered to the ceiling" (item 194) and "as the ceiling lowers" (item 475).
   Use 114's words.
6. **Loose tokens.**
   - "managed wood" (item 81) is not a `LandUse.kind`. The kinds are `coppice`, `wildwood`, `lumber` (MODEL l.1684),
     and `Greenery` has `wood`, `coppice`. Name the kinds the timber test reads.
   - `means.top` reads like a cell path but is a derived value. Name it "the top means" or declare it derived and never a
     cell.
   - `provenance.ownerRule: 116` (item 378) breaks V12's format `ownerRule?: string` "the owner-rule item and part"
     (`V12:887`), which 114 and 115 follow (`'114 (b)'`, `'115 (b)'`). Write `'116 (n)'`.

### W12 (medium). The why promises data that nothing persists

**Evidence.**
- (p) *The clerk's why*, item 434: "the candidates with their costs at the build epoch and today's supply".
- `MaterialSupply` is derived and recomputed only for the current epoch (item 142, 151–152).
- `draft-notes.md` D16: "Re-deriving past supplies on load would need past model states".
- `MaterialOrigin` stores basis, partner, route and epoch only (item 231–234).

**Required change.** Choose one:
- persist the pick's candidate list and costs, for example as `DerivationRecord.material?: { candidates: { id; cost }[]; means }`,
  written by S11 and §4.11's builds, outside the model digest (as `DerivationRecord` is, MODEL l.2005); or
- strike "at the build epoch", so the why gives the origin as stored plus today's candidates.

### W13 (medium). The roof covering is one per building, but the forms that admit it are one per wing

**Evidence.**
- (h), item 228 and 248: "One roof covering per building". `RoofSpec.material` is retired.
- (g) (1), item 200: the candidates are those "that the roof form admits".
- MODEL l.800 and l.854: every `BaseWing.roof` and every `Wing.roof` has its own `RoofSpec` (kind, pitch).
- V02 `WingRoleRow.roofKinds` (`V02:637`) gives the wings different kinds: a back range `shed` at a low pitch, a tower
  `cone`.

**Defect.** When the main range's pitch admits thatch (≥ 0.8) and a `back` wing's shed at 0.4 does not, the candidate set
is undefined.

**Required change.** Pin the rule. For example: the covering is admitted by the **main** wing's form, and a wing whose
form does not admit it takes the cheapest covering its form admits among the candidates. That brings back a per-wing
covering, and so needs a home: keep `RoofSpec.material` as that per-wing override written by S11. Otherwise state that
S11's roof-kind step already constrains every wing to a form the main covering admits. Either way, T116-17's "0
coverings a roof form does not admit" must be checkable per wing.

### W14 (medium). A bridge with no material names a rung that does not exist

**Evidence.**
- (i), item 262–264: "the crossing stays a `site`, reported `bridge_no_material`, and the route takes F-ROUTE's
  `no_crossing` rung".
- FAIL §5.2 (l.126): `no_crossing` is F-RIVER's last rung ("arterials routed to the bank road").
- FAIL §5.2 (l.129): F-ROUTE's rungs are "another crossing site … → one bridge at extra cost … → relax the slope limit
  one class → route to the nearest reachable junction, the destination `unserved`".
- By S7 the way's span is already laid (W8, the §4.3 row).

**Required change.** Move the decision to S4 and S5b's router, which reads the supply (W8). A crossing whose works means
admits no bridge material is not a bridge candidate. The ford rung comes first, then F-ROUTE's existing rungs. Name the
real rung and reason: `unserved`, with `bridge_no_material` as the ladder code.

### W15 (medium). `Way.material` has four possible readers of a structure's material and no rule for which wins

**Evidence.**
- (i), item 265 and 271–272: `Way.material` (new) holds harbour works and "the raised way's material … once built".
- MODEL l.543: `Way.surface` already exists. V01 §3.7.3 (`V01:1625–1630`) takes a bridge's surface "`paved` for a stone
  bridge, `planks` for a timber one", and a raised road's surface "from its record (masonry `paved`, timber `planks`,
  by its material row)".
- (i)'s paving bullet (item 276–280) gates `paved` and `cobble` by stone availability and the paving works means. These
  are two rules for the same way's surface.
- A bridge's `way` (class `bridge`) would also carry `Way.material` beside `Bridge.material`.
- A walled port's quay wall is the enceinte's `waterfront: 'quay_wall'` (MODEL l.1639), with its material on the
  `Enceinte`.

**Required change.**
1. `Way.material` is present exactly on `quay`, `pier` and raised ways, and absent on class `bridge` (the `Bridge`
   holds it).
2. A structure way's `surface` follows its structure's mass (masonry → `paved`, timber → `planks`), which is V01's
   existing rule. The paving gate and its works means apply only to ways that are not structures.
3. A `quay_wall` waterfront takes the enceinte's material. State which of the two a quay way under it shows.

### W16 (medium). Paving is called a pick but has no slot and no cost

**Evidence.**
- (i), item 251: "Each piece calls the pick with its slot and its means".
- The paving bullet (item 276–280): "a traded family only where the paving works means reaches it". The works factor
  `paving 0.6` is at item 191.
- No `MaterialDef` id is a surface, and `MaterialSlot` in (a) has no `paving`. Surfaces (`paved`, `cobble`, `brick`,
  `planks`) are `Way.surface` values.

**Required change.** Choose one:
- map each surface to a cost (`paved` → `ashlar`'s cost; `cobble` → `rubble`'s; `brick` → `brick`'s; `planks` →
  `timber`'s) and add a `paving` slot; or
- state that paving is a gate plus a fallback order with no cost, and drop "the paving works means".

### W17 (medium). The means interpolation is mis-cited and not composed with item 114 (c) (3)–(4)

**Evidence.**
- (f), item 173–176: the value is "read on the band row `[lo, hi]` of the band it falls in, interpolated along the value
  between that band's cuts (§4.5's continuous rule)".
- PIPE l.1237–1239: §4.5's rule interpolates "between band rows along the value". Rows are point values, as in the
  §4.5 table.
- Item 114 (c) (3) (`items-114-115.md:71–75`): "only a value above the highest allowed band's centre reads that band's
  row". Item 114 (c) (4): every rule table read along the value "takes the highest allowed band as the band set's end
  band".

**Defect.** The means is a band-interval rule of its own. Citing §4.5 lets the pipeline editor implement §4.5's
point-row interpolation. The model editor would implement intervals. The two differ above the highest allowed band's
centre, which is exactly where "the very rich" is read.

**Required change.** State in (f) that the means is its own interval rule, stated in §2.6 and not §4.5's. State how it
meets 114 (c) (3)–(4): in the highest allowed band the interpolation runs from `lo` to `hi` up to value 1, the band's
upper cut reading 1, and this is the one exception to 114 (c) (3) for this read. Or convert the means to §4.5's
point-row form (a means value per band row). Either way, cite `FieldBands.ceiling.at` (⌈at⌉) as the source of the
highest allowed band.

### W18 (medium). Per-material properties have no single home

**Evidence.** Seven readers key a per-material value by material id, and the new ids (`adobe`, `log`, `mud`,
`stone_slate`, `boards`, `canvas`, `turf`, `lead`, …) are missing from each:
- fire flammability, "by roof covering and wall (thatch or reed 1.0; timber, shingle or wattle 0.9; tile 0.45; stone,
  slate or brick 0.15 …)" (`V06:1995–1996`);
- flood collapse, "timber, cob or wattle walls" (`V06:2028`);
- Works durations and pauses, "`WorksTable` rows keyed by … material", with rows written in §4.11 (PIPE l.3669–3684,
  3751–3756; `V11:3314`, "the Works table are §4.11's (rows written there)"). R11 of `review-rules.md` also found
  this;
- salvage and decay dwell (V11 §3.18, `V11:3317–3323`);
- the texture (REND l.706–712);
- the colour role (item 37).

**Required change.** One rule in (a): every per-material property is a `MaterialDef` column or a row keyed by every
`MaterialDef` id, each with its one home. Suggested homes:
- `flammability` and `floodCollapse` on `MaterialDef`, read by V06;
- `works` class and pause row in §4.11's `WorksTable`;
- salvage and dwell in V11 §3.18;
- texture tile in §8.2.

Extend T116-32's compile totality to "every `MaterialDef` id has a value in each of these homes". A mixed building's
Works and hazards read the ground storey or main range, as (j) (6) already says for hazards.

### W19 (medium). Test and fixture wiring defects

1. **H-NATIVE is undefined.** (r)'s V06 row lists "fixtures H-TRADE, H-NATIVE, H-QUARRY, H-WOODS" (item 511). No bar
   and no edge uses H-NATIVE, and nothing says what it is (0 hits elsewhere, `tmp/ids.txt`). Define it (for example "a
   native-only timber village over 20 epochs", read by T116-3 and T116-25) or drop it.
2. **(o) contradicts T116-22.** (o)'s item-114 row (item 402) says "no means above `means.top` … for plots,
   institutions and works alike". T116-22 (item 473–475) and (f) (item 182, 187, 190) allow `means.top` × `rungMeans`
   (plots), × prestige × patronage × `rungMeans` (institutions) and × works factors (works). Correct (o)'s row.
3. **Every edge row needs its suite.** (o)'s rows must enter §4.13's EP table and B-EDGE (W8). Otherwise they have a
   test id but no runner.
4. **Bars with no tier.** T116-1 – T116-32 need §13.8's tier (W8).

### W20 (medium). Migration rows are missing for values that are not ids

**Evidence.**
- V07 §3.4 (`V07:1588`) and §3.12 (`:2404`) write `Enceinte.material: 'stone'` for the `inner` circuit. `stone` is a
  family, not a `MaterialDef` id.
- `Enceinte.material` has no producer in the base (`read-base.md` A6), so older documents may hold any string.
- (p)'s migration list (item 415–419) covers `Bridge.material`, the ledger and origins, but not `Enceinte.material`
  values.

**Required change.** Add a §7.5 row: an `Enceinte.material` that is not a `MaterialDef` id → `rubble` for `stone` and
`inner`, `timber` (`boards` after W11) for `palisade`, `earth_bank` for `earthwork`, else `rubble`, reported. Add the
`timber` → `boards` row of W11 (1) and the ledger's field rename of W11 (2).

### W21 (medium). The unit table leaves the paint and override draws unpinned

**Evidence.**
- (l), item 349–352: `paint` gains `roofMaterial` and `wallMaterial`. `District.materialOverride` is retyped to
  `{ walls?; roof? }` share records "whose shares its buildings draw directly".
- `EDIT l.73`: `paint` has `value: string`.

**Defect.** It is not said whether `wallMaterial` clears or keeps a `mix`, or which uniforms an override's shares draw
on. Editors of §7.1 (determinism), V09 (the tool) and S11 (pipeline) will choose differently.

**Required change.**
- A `paint` of `wallMaterial` sets `walls` and clears `mix`.
- An override's shares draw with `u₁` for walls and the roof's first uniform, from (g)'s fixed draws.
- An override never makes a mix.

### W22 (medium). A mixed building's ledger credit share is unpinned

**Evidence.** (j) (5), item 318: "A mixed building credits each part by its share". "Share" is not defined.

**Required change.** Define the share: the part's share of the building's wall area. `upper` is (floors − 1) ÷ floors
of the storeyed wall area, `gable` the gable-end facets' area share, `outshots` the `back` and `service` wings' share
of footprint perimeter × height. It is computed at S11 from facts S11 holds, as (h) requires.

---

### W23 (minor). The `thematic` legend needs the origin as a second key

**Evidence.**
- REND l.190: `ThematicRow` keys one attribute and carries one `legend` string.
- The Materials legend shows each family "with its origin words" (item 435–436).

**Required change.** Choose one: the Materials view is rows keyed by (family, origin kind), with `ThematicRow.key` gaining
`'materialOrigin'`; or the origin words are a second legend line computed from the §8.1 column (W8).

### W24 (minor). DR41's `covers` and `family` cells are not given

**Evidence.**
- EDIT l.1512: `DerivationRow` requires `family` and `covers` ("the §2.8 registry kinds and attribute paths the row
  derives").
- (r)'s determinism row gives DR41's inputs, rule, chance and bar only (item 503).

**Required change.** State DR41's family (`site`) and covers (`Document.derived.materialSupply`, with a note that it is
derived and not a registry kind). Also state DR3's added covers (`TradePartner.supplies`, `.distanceM`, `.name`).

### W25 (minor). The switch and the Trade control lack registry rows

**Evidence.** EDIT §7.8 (l.1943–1950): each control has an output metric, range, consuming stage, locality class,
continuity class and anchor.

**Required change.** Add these to (n) and (r)'s determinism row:
- the Trade control: consuming stage S1, locality *re-derive from S1 (11)* under W1 (a), else *from S3*; discrete;
  anchor §7.7;
- the slate and lead toggles: consuming stage S1 (11), *re-derive from S1 (11)*, discrete;
- `materials.supply.enabled` if it is a control (and in which panel), or state that it is reached only through
  presets and the tables editor.

### W26 (minor). The `painterly` family's material palette has no owner

**Evidence.** REND l.684: `painterly` is reserved as the VG family for the village product. (n) (item 385–386) says
"V07's painterly palette reads `Building.material.roof`", but no unit states its `roof.<id>` and `wall.<id>` values.

**Required change.** In V07's row: V07 states `painterly`'s role values for every `MaterialDef` id, with `roofJitter`
kept.

### W27 (minor). The texture list is not total over the ids

**Evidence.**
- The rendering row adds "ten new texture tiles" (item 504).
- The existing set has "wall stone", "thatch / shingle", "clay tile" and "paving stone" (REND l.708–709).
- These ids have no stated tile: `ashlar` vs `rubble` vs `dry_stone` (all "wall stone"?), `shingle` (shared with
  thatch?), `boards`/`timber`, `timber_crib`, `earth_bank`, `canvas`, and the `brick` surface.

**Required change.** Put a total id → tile table in the rendering row. State the texture set's new count (15 + 10) and
its milestone (M2b, where the set is authored), and state `hatched`'s rows at M5.

### W28 (minor). Institutions' exemption would break a §5.3 invariant

**Evidence.** FAIL §5.3's row "every building's prosperity-driven state inside its district's band range" (the row
"neighbourhood character"). (f) exempts institutions (item 187–188). R1 of `review-rules.md` disputes the exemption.

**Required change.** Whichever way R1 is settled, name the §5.3 row in the determinism unit's part: amended with the
exception, or unchanged if R1's clamp is adopted.

### W29 (minor). The hood and village milestones and the V07 bar are unassigned

**Evidence.** (r)'s scope row gives J-A116.01's milestones for the base (item 505). V07's "village bar" and V01's paving
and naming parts have no V-M or M5 milestone.

**Required change.** Name V07's V-M milestone for its bar and V01's M5 for the surface gate and naming feature.

### W30 (minor). S1 (11)'s origin rule must reach II.7.6's text

**Evidence.**
- (b), item 73–74: distances from the frame origin.
- II7 l.623: "ranked by stone value, then nearness to the town, within `reachM` (2 km)". The distance is measured from
  the town.
- T116-11 promises "stone native exactly when V04 has a stone cell within `reachM` of the origin".

**Required change.** The pipeline row states II.7.6's reach from the frame origin, and V04's row states the same.
Nearness to the town stays as the ordering key.

### W31 (minor). `DossierDigest` additions: pin `access` values

**Evidence.**
- (c), item 120–121: `access?: string` ("the neighbour's access key").
- The route step reads `port` and `river` (item 129–130). V08's access keys are `road`, `crossroads`, `river`, `port`,
  `isolated`, `none`, `mountain_pass` (`V08:769–772`).

**Required change.** Type the field as V08's access-key union and state that an unknown word reads `road` (noted
`unmapped_word`), as V08 does for its own access row.

### W32 (minor). The `blueprint.features` append order must be stated at its one home

**Evidence.**
- DET l.117: "appended after them in this order, the geology flag's uniform … and the relief toggle's `auto` pick …;
  the sewer layer's existence draw".
- (b), item 93–94: slate and lead are appended "after every draw that row already lists".

**Required change.** Write the order into §6.1's row in the determinism part: … relief, sewer, **slate, lead**. Say that
each is drawn whether or not its toggle is set, as the row already says for geology.

---

## B. Points checked, no defect found

- **Test and id uniqueness.** Every new identifier appears nowhere outside `work/g116/` (receipt `tmp/ids.txt`): T116-1 –
  T116-32, F-MATERIAL, DR41 (the DR table ends at DR40, EDIT l.1780; the 114–115 notes cede DR41 to 116,
  `work/g114-115/draft-notes.md:410`), J-A116.*, H-TRADE, H-QUARRY and H-WOODS, `materials.supply.enabled`, every
  report code, `MaterialSupply`, `MaterialDef`, `MaterialPreference`, `MaterialMixRow`, `MaterialOrigin`,
  `BuildingMaterial`, `MaterialFamily`, `nativeOnly`, `pickMaterial`, `rungMeans`, `ordinanceStretch`,
  `materialOrigin` and `liningOrigin`. K19 is free in V10's critique rows (K1–K18, `V10:784`). The kernel's `J-K19` is
  another namespace. Item 116 mints no F-V8 receipt row, so 114's F-V8-8 is untouched.
- **Names the item uses that exist as used:**
  - model: `Plot.builtProsperity` and `builtBand` (MODEL l.657); `Bridge.kind` (l.1650–1653); `Enceinte.material`
    (l.1634); `RetainingWall.material` (l.1668); `LandUse.source` (l.1686); `SiteResources` fields (l.1689);
    `DepositSite.state` (l.1782); `WingRole` `main`, `back` and `service` (`V02:446–454`);
  - pipeline: `Terrain.mining` as the pipeline writes it (PIPE l.393; see W8 for its missing model declaration); S1's
    steps (1)–(10), so (11) is free; harbour works as `pier` and `quay` ways (PIPE l.2686–2687);
  - determinism: `TradePartner` (EDIT l.1508); `CircumstanceSlice.trade` and `.landscape` (l.1500–1503); the receipts
    F13 (`V08:1572`) and F14 (EDIT l.1857);
  - volumes and scope: V08's access keys `port` and `river`; the milestones M1, M3a, M3b, M3c, M6-P, M6-U, M6-E and
    M-SF (`scope/09-s16.md`); T19-3, T-V2-25, T-V6-16, T-V6-17, T-V7-32, T-V11-28, J-V7.15, J-A19.21, J-A19.41 –
    J-A19.43, J-A19.81, J-A8.45, J-A26.42, J-A65.45 and J-A72.45.
- **The frame-origin claim** (item 73–74). The world is centred on (0, 0) (MODEL l.14; KERN l.141). S3's centre lies in
  the frame's middle third (PIPE l.497), so it lies within a sixth of the frame of the origin, as the item says.
- **The geology precedent for slate and lead.** An appended `blueprint.features` uniform, recorded in `autoResolved`
  and editable on the terrain row, matches DET l.117 and PIPE l.388–392. Only the order statement (W32) and the
  `mining` declaration (W8) are missing.
- **The switch's preset semantics.** An `extension` option with `MFCG`, `FTG`, `VG` and `NG` off and "`FM` zeroes none"
  matches EDIT §7.6 (l.1323–1329).
- **The landed-unit list.** V03 and V04 have landed rewrites (`new/volumes/V03-interiors.md`, `V04-underground.md`).
  V01, V02 and V05 have rewrite plans only. The base model, kernel, pipeline, determinism and rendering parts are
  landed. The item's "short late rewrite seat" split is right.
- **The kernel has no part.** No kernel call reads a material. The one kernel sentence that names materials (KERN
  l.1085–1086) is a pointer to §12.4's S11 row (W8).
- **The core records are wired both ways:**
  - `MaterialSupply`: producer S1 (11), the prelude and load; consumers listed; derived and outside the digest, like
    `TradeFlow` (MODEL §2.9 `derived`);
  - `BuildingMaterial` and `MaterialOrigin`: in the leaf digest outside the geometry subtree, with migration rows;
  - `TradePartner.supplies`: filled by DR3; migration `[]`.

  The remaining gaps are the ones listed in section A.
- **Consistency with items 114 and 115 where prosperity is concerned.**
  - `means.top` reads item 114's highest allowed band.
  - The district range is lowered before it clamps, which is 114 (c) (5).
  - No second wealth term is added.

  Only W11 (5) on terms, W17 on the interpolation and W19 (2) on the (o) row need changes; R16 of `review-rules.md`
  already covers the item-115 sentence. Item 115 changes nothing 116 reads.

---

## C. Required changes, in one list

1. **W1.** Pin the declared partner: its `TradeFlow` and S3 participation (recommended: licence only), `weight`,
   `bearingCdeg`, a new `TradePartner.name`, the standalone fill order and the event `adjust('circumstances.trade')`.
   Correct the Adjust's scope.
2. **W2.** Write the TS of `MaterialDef`, `MaterialPreference`, `MaterialMixRow` and `MaterialSlot`. Put every cost
   factor on one home. Name every cell path, including the native tests. Make the stone radius one cell. Name the
   table ids and the reader StageIds. Define "the class family's generic row" or drop it.
3. **W3.** Make every pick draw on `material`, keyed by lineage and slot, with no epoch component (E-03). Keep the
   switch-off draws on their existing streams. Add §6.1's readers.
4. **W4.** Add the codes to `ReportCode` and §5.4's table with class and landing. Retype the supply's reasons as
   `NativeReason` in §2.7. Add the V09 catalogue rows.
5. **W5.** Add a `SliceRef` kind `supply`. State its one trigger (creation-slice Adjusts, never an epoch). Put it in
   §7.3.
6. **W6.** `Enceinte.kind` keeps the ring role, and sections are read by (kind, mass). V07's `palisade.kinds` draw goes
   over the supply. A stone-naming dossier record is honoured as a dossier material. Amend J-V7.15 and T-V7-32.
7. **W7.** Give producers and consumers to `slate` and `lead` (T-V11-28). Add a straw good or rule the thatcher's edge.
   Declare the goods-id row or drop `goodId`. Add `BuildingClassRow.requiresFamily`. Home the no-generic-import rule in
   V11 §3.5.2.
8. **W8.** Add to (r) and HOMES: §2.8's registry and `factTier`; §2.9's `thematic: 'materials'`; §2.3's
   `Terrain.mining` and the "only II.7.6 reads" sentences; §4.1/§4.12 `StageDecl` I/O; S4 and S5b as consumers; §4.13's
   EP row and B-EDGE; §5.3's licence invariant and the neighbourhood-character row; §7.3; §7.4's lifecycle rows; §8.1's
   columns; §8.2's colour-deficiency row and texture map; §8.11, §9.7 and §11.6 edge rows; §11.1's skeleton carrying
   declared partners; §12.4's rows; T8-5 and T26-1 amended; §13.8's tiers.
9. **W9.** Add to the volume rows:
   - V04: U-FORECAST; a `Gallery` lining home (or none); vault spans and `archVault` masonry-only; §3.13's edge row;
   - V06: structure hazards (decks, supports); structure repairs in kind or re-pick; T-V6-17;
   - V07: the kind draw;
   - V01: the hood's partner field;
   - V02: §5.5's export;
   - V09: §4.3 binding rows, §4.4 and §5.15, `critique.K19` and the report-code keys, the Trade control in the advanced
     panel;
   - V10: K19 in `CritiqueFinding`, T-V10-17 and CVR-V10-4, and the creation mode's partner path;
   - V11: §1b, §2.1, §3.1, §2.8c's two fields retired, `pierSpacingM` by mass, §3.20's naming words;
   - V12: §1's owner-rule entry, the item-110 register lines re-pointed;
   - V08: §1b rows and a T-V8 bar;
   - every volume: its §1b and lifecycle rows.
10. **W10.** §4.11 STATES (j), and V06 references it and states only its engine parts. §8.2 states every family's
    roles, and V01 only the program's read. The stone radius has one home.
11. **W11.** Rename the material `timber` to `boards`, with migration. Rename the ledger field and the goods column
    to `family`. Give the V08 deposits row a separate `family: MaterialFamily | null` column with every key listed. Write
    "chimney", not "stack". Use 114's "prosperity ceiling" and "highest allowed band". Name the `LandUse` kinds the
    timber test reads. Mark `means.top` as derived. Write `ownerRule: '116 (n)'`.
12. **W12.** Persist the pick's candidates and costs, or strike "at the build epoch" from the why.
13. **W13.** Pin the per-wing roof covering rule (the main wing admits it; the rest per wing, with `RoofSpec.material`
    kept as that home), or state the constraint.
14. **W14.** Decide bridge feasibility in S4 and S5b's router. Replace "F-ROUTE's `no_crossing` rung" with the real
    rungs and `unserved`.
15. **W15.** `Way.material` on `quay`, `pier` and raised ways only (not class `bridge`). A structure way's surface
    follows its mass. State the quay-wall case.
16. **W16.** Give paving a slot and costs, or make it a gate with a fallback and no cost.
17. **W17.** State the means interpolation as its own interval rule in §2.6, composed with 114 (c) (3)–(4), and cite
    `FieldBands.ceiling`.
18. **W18.** One home per per-material property (flammability, flood collapse, Works, salvage, dwell, texture, role).
    Extend T116-32's totality to them.
19. **W19.** Define or drop H-NATIVE. Correct (o)'s item-114 row to T116-22's bounds. Register (o)'s rows in §4.13 and
    B-EDGE, and the bars in §13.8.
20. **W20.** Add §7.5 rows for non-id `Enceinte.material` values, for `timber` → `boards` and for the ledger field.
21. **W21.** `paint` `wallMaterial` clears `mix`. An override draws on (g)'s fixed uniforms and never mixes.
22. **W22.** Define a mixed building's credit share by wall area per part.
23. **W23.** Key the Materials legend by (family, origin), or derive the origin line from §8.1's column.
24. **W24.** Give DR41's family and covers, and DR3's added covers.
25. **W25.** Add §7.8 registry rows for the Trade control, the slate and lead toggles, and the switch (or say it is
    presets-only).
26. **W26.** V07 states `painterly`'s material role values.
27. **W27.** A total id → texture table, the new tile count and M2b; `hatched` at M5.
28. **W28.** Name §5.3's neighbourhood-character row in the determinism part, per R1's outcome.
29. **W29.** Milestones for V07's bar (V-M) and V01's parts (M5).
30. **W30.** II.7.6's and V04's reach is measured from the frame origin.
31. **W31.** Type `partners[].access` as V08's access-key union; an unknown word reads `road`, noted.
32. **W32.** Write the `blueprint.features` order (… sewer, slate, lead) into §6.1's row.
