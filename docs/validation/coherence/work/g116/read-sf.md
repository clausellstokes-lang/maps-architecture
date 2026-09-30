# Reader sf — what SettlementForge's dossier says about building materials (terrain, resources, trade, prosperity), for owner rule 116

Working notes for the item-116 writers. Written 2026-09-30 by the sf reader. Nothing here is a ruling: the numbered
findings of §11 are the decisions the item must pin, each with the evidence behind it.

## 0. Method, scope and labels

- **What was read.** The whole of `research/sf/dossier-model.md` (287 lines) and `research/sf/mapping.md` (806 lines).
  Whole sections of `research/sf/dossier-generation.md` (§1.6, §2, §3, §6.3–§6.6), `research/sf/dossier-outputs.md`
  (§3.3–§8), `research/sf/dossier-seam.md` (§2), `research/sf/mapping-verify.md` (§0 and §B–§C) and `research/sf/PLAN.md`
  (§2.2–§2.5). From the design: `docs/volumes/V08-settlementforge.md` searched whole (receipts in `tmp/`); its §0, §1, §1b,
  §2.3–§2.8, §3.5, §3.11–§3.13 and §5.2 read whole. Also read: `docs/volumes/V11-content.md` §3.11 (the catalogue kinds),
  §3.13.5 (good words) and §3.19 (materials); the coherence base's §7.7 (item 1, layer 2, the derivation table) in
  `docs/validation/coherence/new/base/determinism/03-s7-editing.md`; §14's `@plat/port` types in
  `docs/validation/coherence/new/base/scope/07-s14.md`; and the model's *Materials* rule, `MaterialRow`, `SiteResources`
  and `DepositSite` in `docs/validation/coherence/new/base/model/01-domain-model-and-schemas.md`.
- **Not read.** SettlementForge's source was not read. An attempt to list the checkout was refused by the session's
  permission layer, and I did not try again. Every SettlementForge fact below comes from the surveys (branch
  `fp/integration-2026-09-23` @ `5d699cc68`, `research/sf/dossier-model.md:7`) and their verification. Where the surveys
  do not settle a question, the entry is marked **U** (below) and names what would settle it.
- **Labels.** **C**: confirmed by the cited file. For a SettlementForge fact that means the survey or its census; for a
  design fact, the design text. **P**: plausible, an inference of this reader. **U**: unestablished by any file this reader
  may read.
- **Receipts** (under `tmp/`): `gen-headings.txt`, `gen-hits.txt`, `other-hits.txt`, `v08-headings.txt`,
  `v08-material-hits.txt`, `v08-trade-hits.txt`, `s77-hits.txt`, `culture-res-hits.txt`, `v11-material-institutions.txt`.

## 1. The answer first

| Owner's source | SettlementForge field(s) that carry it | What our port reads today | Status for materials |
|---|---|---|---|
| **terrain** | `config.terrainType` (one key); `config.terrainOverride` (raw); `config.terrain` (null on the branch); `resolvedTerrain` (a pipeline value); `resourceAnalysis.terrain` (a display label); `spatialLayout.layout` (prose) | `site.terrain` ← the terrain key, through the `site` row, for DR1 (relief, water, forest toggle, arid biome) | Consumed for the site. No material consequence anywhere. |
| **resources** | `config.nearbyResources[]`, `…Depleted[]`, `…Native[]`, `…NativeDepleted[]`, `…Custom[]`, `…State{}`, `…Definitions[]`; `resourceAnalysis.*` (never read); `resourceHistory` | `site.deposits {key, state, custom?}` → the `deposits` row → `DepositSite` and land uses (DR19); `stone_quarry` is also read by DR32 | Consumed for the hinterland only. No material consequence. |
| **trade** | `config.tradeRouteAccess`; `economicState.tradeLinks[]` (partner-level goods, only with an imported neighbour); `neighborRelationship` (the partner's own exports and chains); `neighbourNetwork[]`; the label lists `primaryExports`, `primaryImports`, `necessityImports`, `transit`, `localProduction`; `tradeDependencies`; `isolationSupport` | `site.access`; `economy.tradeLinks`, `economy.partners`, `economy.goods` (via `goodWords`), `economy.dependencies`; `site.isolation` → the trade slice, `TradeFlow`, the supply web (DR3, DR4, DR33) | Consumed for gates, roads and supply links only. The partner's own exports are **not** in the digest. No material consequence. |
| **prosperity** | `economicState.prosperity` (one settlement-wide word on a seven-step ladder); no per-district or per-household wealth stored | `wealth.label` → `intent.wealthLevel` → the field and each plot's band (DR6) | Consumed. The neighbourhood band is a MAP fact. |
| (implied) culture, era, climate | `culturalIdentity` (prose, incl. `builtForm` and `architecturalDetail`); `config.cultureProfileKey`; no era field; no climate field | `site.culture` (the key only) → DR1, DR14, DR15's template family, the `era` row (every culture → `c14`), latitude | The key is consumed. The prose, which names materials, is never read. |
| (only structured material word) | a custom institution's optional scene token `materialFamily` ∈ {brick, stone, marble, ruined-stone, timber, steel} | `DossierInstitution.custom.scene.material` → the `materials` row → a V11 wall material (DR15) | The ONLY material input the port reads today. |

Sources for the table are in §2–§9.

## 2. Terrain

- **One terrain key per settlement.** The resolved `config` holds `terrain`, `terrainType` and `terrainOverride`
  (`research/sf/dossier-model.md:90`). On the branch `config.terrain` is null in 155 of 155 dossiers, and `terrainType`
  carries the value: plains 35, coastal 25, riverside 23, hills 21, mountain 20, forest 19, desert 12
  (`research/sf/mapping.md:107`; `research/sf/mapping-verify.md:266`, V13). **C**
- **Older words.** SettlementForge's older vocabulary uses grassland, river and swamp
  (`research/sf/dossier-model.md:90`). Our `site` row maps them to plains, riverside, and plains with a marsh land use
  (`docs/volumes/V08-settlementforge.md:767-768`; `research/sf/mapping.md:233-234`). **C**
- **The raw input.** The wizard's raw `terrainOverride` is `auto` or a terrain. With `auto` and an explicit trade route,
  SettlementForge derives the terrain from the route (`research/sf/dossier-generation.md:249-251, 290-292`). The first
  pipeline step, `resolveConfig`, provides `terrainType` and `resolvedTerrain` (`research/sf/dossier-generation.md:380`). **C**
- **Display and prose copies.** `resourceAnalysis.terrain` is a display label, and `spatialLayout.layout` is one prose
  line chosen by tier × terrain (`research/sf/dossier-model.md:94`). No elevation, river course or coast side is stored
  (same line). **C**
- **The realm map records a disagreement, never a rewrite.** At realm canonization the spatial digest records every
  settlement whose `terrainType` contradicts its cell, as `terrainDisagreements`, and never rewrites the settlement
  (`research/sf/dossier-generation.md:349-352`). **C**
- **SettlementForge's resources depend on terrain.** The `resolveResources` step draws "terrain-legal resources,
  tier-weighted depletion, custom resources, then the DM's `resourceEdits` overlay"
  (`research/sf/dossier-generation.md:381`). The resource-dynamics mover discovers new deposits "from the terrain's latent
  pool" (`research/sf/dossier-generation.md:750`). **C** So SettlementForge's deposit list is already a terrain-conditioned
  set. **P**: that set is the natural reading of "native" on SettlementForge's side (§11 F2).
- **How we read terrain today.** `site.terrain` goes through the `site` row. `plains` → a plain relief; `riverside` → a
  river; `coastal` → a coast; `hills` → hilly; `mountain` → mountainous, with a pass on `defended_pass`; `forest` → the
  forest toggle on and woods in the hinterland; `desert` → the arid biome
  (`docs/volumes/V08-settlementforge.md:759-768`; `research/sf/mapping.md:229-234`, T2). The row feeds DR1 (the site),
  DR31 (caverns), DR34 (the aqueduct) and DR40 (the oasis)
  (`docs/validation/coherence/new/base/determinism/03-s7-editing.md:1741, 1771, 1774, 1780`). **C**
- **No material consequence.** No row derives a building material from terrain. DR15's inputs are the use's class, the
  plot's band and `site.culture` (`03-s7-editing.md:1755`). **C**

## 3. Resources (deposits)

### 3.1 The fields

- **The config lists.**
  - Working tree: `config.nearbyResources[]`, `nearbyResourcesDepleted[]` and `nearbyResourcesCustom[]` (deposit keys)
    (`research/sf/dossier-model.md:90, 141`). **C**
  - Branch additions: `nearbyResourcesNative[]`, `nearbyResourcesNativeDepleted[]`, `nearbyResourceDefinitions[]` and
    `nearbyResourcesState{}` (`research/sf/dossier-model.md:97`). **C**
  - The wizard's raw resource choices: `nearbyResourcesRandom`, `nearbyResourcesState` and `nearbyResources`
    (`research/sf/dossier-generation.md:253`). **C**
- **`nearbyResourcesState` holds per-key state words**, e.g. `iron_deposits: 'depleted'`
  (`research/sf/dossier-outputs.md:433`). Food generation reads it
  (`research/sf/mapping-verify.md:328`, V38: `lib/settlementConfigMigration.js:51`, `generators/foodGenerator.js:66`). **C**
- **`resourceAnalysis` holds richer data, which the port never reads.**
  - Its fields: `availableResources[]` (57 keys), `resourceChains[] {rawResource, processingInstitutions,
    intermediateGoods, finalProducts, exportValue, dependsOn}`, `exploitation`, `imports {critical, recommended, reasons}`,
    `exports[]` and `gaps[]` (`research/sf/dossier-model.md:141`). On the branch it adds `resourceConditions[] {key, label,
    type (e.g. exhaustible), condition (available|…), randomDepletionEligible, recoveryMode, conditionDescription}`
    (`research/sf/dossier-model.md:147`). **C**
  - §7.7 item 1: "`resourceAnalysis` (the deposits come from `config.nearbyResources*`)"
    (`03-s7-editing.md:1589-1590`). **C**
- **The supply chains name their raw resource.** They carry `resource`, `resourceActive`, `activatedByResource` and
  `resourceDepleted` (`research/sf/dossier-model.md:140`), and on the branch `resourceKey`, `resourceCondition`,
  `resourceInputKey`, `resourceInputCondition` and `resourceInputAvailable` (`research/sf/dossier-model.md:147`). **C**

### 3.2 The vocabulary

- **Counts.** 34 deposit keys occur in `config.nearbyResources` over the 155 births
  (`research/sf/mapping.md:113`; `research/sf/mapping-verify.md:282`, V29). A settlement lists 4–17 of them (median 5–10)
  (`research/sf/dossier-outputs.md:139`). **C**
- **The keys our `deposits` row maps** (`docs/volumes/V08-settlementforge.md:776-792`; `research/sf/mapping.md:246-257`,
  T5), grouped by what they could mean for building. **C** for the keys; the grouping is **P**.
  - **Stone:** `stone_quarry` → stone / `quarry`.
  - **Timber:** `managed_forest`, `mountain_timber` and `shipbuilding_timber` → timber / `lumber` and `coppice`;
    `ancient_grove` → timber / a reserve wood.
  - **Clay (brick, tile, daub):** `river_clay` → clay / `claypit`. `glass_sand` is also filed as clay / `claypit`.
  - **Reed and peat, indirectly:** `marshlands` → a `marsh` land use. Our reed good's site is `land · marsh`
    (`docs/volumes/V11-content.md:2070`), and `peat_works` needs `landuse:marsh`
    (`docs/volumes/V08-settlementforge.md:795-798`).
  - **Fuel and metal, not building materials:** `iron_deposits`, `precious_metals`, `gemstone_deposits`,
    `coal_deposits` → ore / `mine`.
  - **The rest:** fish, fertile land, salt, the harbour, hot springs, the magical node, ruins, `crossroads_position`,
    `defended_pass`, `oasis_water`, `hunting_grounds` and `foraging_areas` → `wildwood` and `commons`. A custom deposit
    takes its own row. Else `commons`, noted.
- **Words the owner used that SettlementForge lacks.** No marble, slate, limestone or lime, peat, reed or thatch, and no
  building sand, occurs among the deposit words any survey or row lists. "Forest" is a TERRAIN word; "quarry" occurs
  only inside the deposit key `stone_quarry` and the catalogue kind of the same name (§7). Copper is named only
  conditionally: "a copper deposit when the line lists one" (`docs/volumes/V08-settlementforge.md:788`). **C** for the
  lists read. Whether the 34 keys include any others is **U** (no survey prints all 34).
- **Custom resources.** A custom resource sits in `config.nearbyResourceDefinitions[]` (name, `localUid`, `refId`,
  definition ids). Its kind (`water`, `land`, `special`, `subterranean`) lives in the author's library, not in the
  dossier (`docs/volumes/V08-settlementforge.md:1232-1238`). The port lists it in `site.deposits` with `custom: true`,
  `state: 'available'`. Its family comes from an admitted library entry's kind, else from its name's keywords, else
  `land` (`docs/volumes/V08-settlementforge.md:2054-2058`). **C**

### 3.3 State and change

- **Four states.** The digest's are `available`, `depleted`, `removed` and `discovered`
  (`docs/validation/coherence/new/base/scope/07-s14.md:245`; `research/sf/PLAN.md:128`).
  - A `depleted` deposit is drawn worked out; a `removed` one draws nothing; a `discovered` one opens its land use at
    the next epoch (`docs/volumes/V08-settlementforge.md:792-793`).
  - A state change is a put at its week and converts the land use at the next epoch
    (`docs/volumes/V08-settlementforge.md:1968-1972`). **C**
- **Depletion at birth is common.** 96 of 155 dossiers list a depleted deposit at birth
  (`research/sf/mapping-verify.md:328`, V38). **C**
- **The simulator changes deposits.** It depletes and recovers them "by pressure and taxonomy
  (renewable/nonrenewable/magical)", discovers new ones from the terrain's latent pool and removes a long-depleted
  nonrenewable. It writes `config.nearbyResources*`, `config.resourceEdits`, `resourceHistory`, and a `resource_strike`
  or `vein_exhausted` condition (`research/sf/dossier-generation.md:750`). **C**
- **An observed case.** In a birth-default year, city-1 depleted `fishing_grounds` and `shipbuilding_timber`
  (`research/sf/dossier-outputs.md:184`). **C**
- **The port's receipt.** F13, detected from `config.nearbyResources*`, `resourceEdits` and `resourceHistory`, becomes a
  `DepositSite` put (`research/sf/mapping.md:635`; `docs/volumes/V08-settlementforge.md:1572`). **C**

### 3.4 The word "native"

- **SettlementForge keeps a native pair of lists**: `nearbyResourcesNative[]` and `nearbyResourcesNativeDepleted[]`
  (`research/sf/dossier-model.md:97`). No survey states what makes a resource "native" there. **U**
  - **P**: the terrain-legal draw, as against custom or DM-added resources, given `resolveResources`'s order
    (`research/sf/dossier-generation.md:381`).
  - Settling it needs a read of `resolveResources.js` at `5d699cc68` or a census of the two lists against
    `nearbyResourcesCustom` and `resourceEdits`. That lies outside this reader's permissions (§0).
- **Our port reads none of the `…Native` lists.** The digest has one `deposits` list with a state
  (`07-s14.md:245`). By the closed-digest rule, "inside a record the port reads, a field no `DossierDigest` field names is
  not read" (`03-s7-editing.md:1595-1598`). **C**

### 3.5 Where deposits go on our side today

- **The hinterland and its records.** `site.deposits` → DR19 (the hinterland: "every listed deposit has its land use",
  `03-s7-editing.md:1759`) → `DepositSite {key, family, state, bearingCdeg, landUse?}`
  (`docs/validation/coherence/new/base/model/01-domain-model-and-schemas.md:1782`). **C**
- **`stone_quarry`'s one other reader.** DR32 reads it: a worked-out quarry at CITY and above is V04's quarry-ossuary
  candidate (`03-s7-editing.md:1772`, row DR32; `docs/volumes/V08-settlementforge.md:1030, 1047`). **C**
- **Mapping row 15 once named more consumers.** Beside S12a's land uses, the row named `SiteResources` (ore, stone,
  timber, fish, clay, fertile) and `BuildingClassRow.requires` (`research/sf/mapping.md:113`). `SiteResources` is S1's
  raster with those six layers (`01-domain-model-and-schemas.md:1689`), and the slice's landscape toggles are
  `{fertileLand, mines, quarries, fishing, logging}` (`03-s7-editing.md:1503`). **C**
- **No material rule reads any of these.** DR15 (`03-s7-editing.md:1755`) and `MaterialRow`'s key
  (`01-domain-model-and-schemas.md:844-845`: era, stage, district kind, class; `band` only in the off-by-default regional
  rows) name no deposit and no raster. **C**

## 4. Trade

### 4.1 Access and isolation

- **One access key per settlement.** `config.tradeRouteAccess` ∈ road 66, port 25, river 23, crossroads 22, isolated 19
  over 155 births. The goldens also pin `random_trade`, `mountain_pass` and `none`. `spatialLayout.tradeAccess` is the
  same fact in prose, paired 1:1 (`research/sf/mapping.md:108`; `research/sf/dossier-outputs.md:433-434`). **C**
- **The access row.** It turns the key into gates and through routes: `isolated` → 1 gate on a track-class approach;
  `none` → 1 gate and no through route (`docs/volumes/V08-settlementforge.md:769-773`). **C**
- **`isolationSupport`.** Its fields are `{status (connected|resilient|viable|precarious|untenable|magic_supported|
  magic_dependent), paths[] {type local_foodshed|hinterland|reserves|seasonal_access|patronage|magical_transit,
  capacity, stability, evidence[]}, magicDependent}` (`research/sf/dossier-model.md:97`). **C**
  - `connected` in 136 of 155 (`research/sf/mapping.md:115`).
  - Path types seen: seasonal_access 19, local_foodshed 18, patronage 11, reserves 9, hinterland 3; `magical_transit`
    never seen (`research/sf/mapping-verify.md:275`, V22). **C**
- **Isolation-related config keys**: `_routeIntent`, `_isolationSupport` and `_magicTradeOnly`
  (`research/sf/dossier-model.md:97`); the food record's `magicTradeChannel` (`research/sf/dossier-model.md:53, 142`).
  SettlementForge's `isolationPass` gives isolated towns "teleport infrastructure, subsistence stripping"
  (`research/sf/dossier-generation.md:387`). **C**
- **How we read isolation.** Our `isolation` row: `magical_transit` → a `teleport_circle` use; `seasonal_access` → a
  "Winter road" name; the rest → §4.9's defaults (`docs/volumes/V08-settlementforge.md:967-971`). **C**
- **Institution access gates.** Records carry `tradeRouteRequired[]` and `forbiddenTradeRoutes[]`
  (`research/sf/dossier-model.md:112`). The port ignores them (`research/sf/mapping.md:143`, row 35). **C**
- **Open: do isolated births list import labels?** The soak's import-label counts are given by tier, not by access
  (`research/sf/dossier-outputs.md:130-131`). **U**. A census of the 19 isolated births would settle it.

### 4.2 Partner-level goods — the only record of "trade specifically with another settlement"

- **The record.** `economicState.tradeLinks[] {good, goodId (a goods-catalogue id or category.<cat>), direction
  ('import'|'export'), partner (the neighbour's NAME), viaNeighbour, viaCategory?}` (`research/sf/dossier-model.md:152`). **C**
- **When SettlementForge generates it.** Only when the settlement is created with an imported neighbour. It is "Empty
  when there's no neighbour, the relationship is hostile/suppressed, or there's no overlap"
  (`research/sf/mapping-verify.md:279`, V26, citing `domain/region/tradeLinks.js:12-14, 45-60`). **C**
  - It is blocked only for `hostile` or a suppressed economy. A rival or cold-war partner trades
    (`research/sf/mapping-verify.md:305-313`, V31). **C**
- **How rare it is.** 4 links in 1 of 155 births (`research/sf/mapping.md:161`); 0 of 120 soak dossiers
  (`research/sf/dossier-outputs.md:137, 162`). **C**
- **Observed example** (`research/sf/dossier-outputs.md:392-425`), town-nb-1 with partner Pianopagus:
  - import "Shipbuilding timber (coastal stands cleared)" (goodId `timber`)
  - import "Arcane reagents and energy (local ley node exhausted)"
  - export "Sea salt"
  - export "Quality tools and weapons" (`category.military`, `viaCategory`)

  The first import is a native timber source exhausted and replaced by a named partner's timber. That is the owner's
  mechanism, already in SettlementForge's own words. **C** for the record; **P** for the reading.
- **What an import link implies.** SettlementForge makes a link only where the neighbour's goods and the settlement's
  overlap (V26's "no overlap"). **P**: an `import` link therefore means the partner exports that good, which is "a
  settlement that has that material".
- **How we read it today.**
  - The digest: `economy.tradeLinks {good, goodId, flow, partner}` (`07-s14.md:251`).
  - The carried fact: `trade.links {good, flow, partner}` (`docs/volumes/V08-settlementforge.md:569-570`).
  - The consumers: the trade slice's partner weights (a partner's weight = its listed links) and `TradeFlow`
    (`03-s7-editing.md:1431-1449`); DR3 and DR4 (`03-s7-editing.md:1743-1744`); F14 at the next epoch
    (`03-s7-editing.md:1857`).
  - **`goodId` is carried; nothing resolves it to one of our goods.** `goodWords` resolves only the label lists and chain
    outputs (`docs/volumes/V08-settlementforge.md:1535-1539`). **C**
  - `TradePartner` carries `key, mode, weight, bearingCdeg, relationship?, source` and no goods
    (`03-s7-editing.md:1508-1509`). **C**

### 4.3 What the dossier says a partner HAS or PRODUCES

- **The imported neighbour** (generation only). `neighborRelationship` = `{name, tier, relationshipType,
  primaryExports[21], primaryImports[10], activeChains[25], economicStrength, militaryStrength, governmentType,
  dominantFactionTypes, tradeRoute (the neighbour's access KEY), dynamics, npcs, factions}`
  (`research/sf/dossier-outputs.md:168`; `research/sf/dossier-model.md:153`). **C**
  - The partner's export labels and its supply chains are there. Each chain names its raw `resource` and `resourceKey`
    (§3.1), so a partner running a quarry chain is visible. **P** for that example; **C** for the chain fields.
  - The partner's deposit list (`nearbyResources`) is **not** embedded (absent from the field list at
    `research/sf/dossier-outputs.md:168`). **C**
  - Our port reads only its name and relationship, as `economy.partners {key, name, relationship}` (`07-s14.md:251`).
    The exports and chains are dropped by the closed-digest rule (`03-s7-editing.md:1595-1598`). **C**
  - The neighbour object is about 50 KB of the largest dossier (261 KB vs about 165 KB median town,
    `research/sf/dossier-outputs.md:108`). **P**: reading its exports is cheap; reading its whole object is not needed.
- **Campaign neighbours.** `neighbourNetwork[] {id (generated_*|link_*|live_*), name, neighbourName, neighbourTier, tier,
  relationshipType (LIVE), description, fromGeneration}` carries no goods and no resources
  (`research/sf/dossier-model.md:153`). **C**
- **Relation words.** The vocabulary is neutral, trade_partner, allied, rival, cold_war, hostile, criminal_network,
  vassal and smuggling_partner. The regional graph adds supplier, dependent, protector, tax_authority,
  pilgrimage_center, market_hub, refugee_source, military_threat, religious_superior, **resource_provider** and other
  (`research/sf/dossier-model.md:153`). **C** that `supplier` and `resource_provider` exist as words.
  - Whether a dossier-held `relationshipType` ever takes `resource_provider`, or only the derived regional graph does,
    is **U**. The regional graph is a derived read-model (`research/sf/dossier-model.md:52`), though
    `regionalGraph.edges[].relationshipType` is listed as a live field (`research/sf/dossier-model.md:53`).
- **Campaign ledgers outside the dossier, only under the lit presets.**
  - `spatialLedgers.supplyShipments`: per active link `${settlementId}:${institutionId}:${input}` →
    `{institutionId, settlementId, input, sourceId, arrivalTick, starving}` — the SOURCE settlement of an institution's
    input, named.
  - `commodityStocks` (per settlement per good units), `tradeFlow` (display-only in/out), `entrepots`
    (`research/sf/dossier-model.md:154`; `research/sf/dossier-generation.md:753`). **C**
  - The port never reads any of them: "every `worldState.spatialLedgers.*` sub-ledger" is on §7.7 item 1's never-read
    list (`03-s7-editing.md:1584-1585`). **C**
  - The only optional campaign input is the realm block, which carries bearings, distances, cell words and a latitude
    only (`07-s14.md:235-239`). **C**

### 4.4 Goods with no partner

- **Label lists.** `primaryExports[]`, `primaryImports[]`, `transit[]`, `localProduction[]` and `necessityImports[]` are
  label strings "with NO partner" (`research/sf/dossier-model.md:138, 151`). Counts per settlement: 0–21 export labels,
  0–12 import labels (`research/sf/dossier-outputs.md:162`). **C**
- **The port resolves them to our goods** by V11's `goodWords`: `economy.goods {exports, imports (with necessityImports),
  transit}` (`docs/volumes/V08-settlementforge.md:707, 1538-1539, 1551-1552`), read by DR33's supply web
  (`03-s7-editing.md:1773`). **C**
  - **Inconsistency, noted for the writers.** V11 §3.13.5 says `goodWords` also resolves the "local-production" list
    (`docs/volumes/V11-content.md:3113-3114`). V08's `economy.goods` has no local-production slot
    (`docs/volumes/V08-settlementforge.md:707`). **C**
- **`tradeDependencies[]`** = `{institution, category, resource, detail, severity, impact, affectedServices[]}` names the
  resource an institution depends on importing, with no partner (`research/sf/dossier-model.md:118`). The port reads it
  as `economy.dependencies` for DR10 (`docs/volumes/V08-settlementforge.md:706, 1537-1538`). **C**
- **SettlementForge's goods catalogue** (`region/goodsCatalog.js`) was read by header only. It holds stable goods ids for
  known staples and `custom.<slug>` for unknown labels (`research/sf/dossier-model.md:35, 145`).
  - `timber` is an SettlementForge goods id (`research/sf/dossier-outputs.md:396`). **C**
  - Whether stone, bricks, lumber, lime or clay are SettlementForge goods ids is **U**.
- **Our goods table.** `goodWords` maps SettlementForge labels as follows (`docs/volumes/V11-content.md:3141-3150`). **C**

  | SettlementForge label words | our good |
  |---|---|
  | `logs`, `lumber`, `wood` | logs |
  | `timber`, `beams` | timber |
  | `planks`, `boards` | planks |
  | `firewood`, `fuel` | firewood |
  | `charcoal` | charcoal |
  | `reed`, `reeds`, `thatch` | reed |
  | `stone` | stone |
  | `lime` | lime |
  | `clay` | clay |
  | `bricks`, `tiles` | bricks |

  - Our goods rows mark logs, firewood, reed, stone and clay as `site` goods (from a land use), and timber, lime, charcoal and
    bricks as `made` (`docs/volumes/V11-content.md:2065-2074`). **C**
  - No marble or slate good exists. **C**
- **Income rows name extraction.** Two income sources are material extraction: `Stone Quarrying` (29 of 155 dossiers,
  median 5 %) and `Timber Trade` (28, median 6 %). Both map to our `extraction` sector
  (`research/sf/mapping.md:317`; `docs/volumes/V08-settlementforge.md:834`). **C**

### 4.5 Trade over time

- **What changes trade.** Authored changes: `ADD/REMOVE_TRADE_GOOD`, `CUT/OPENED_TRADE_ROUTE` and `CREATE_ROUTE`
  (`research/sf/dossier-model.md:171, 174`). Authored records survive regeneration: `customTradeGoods`, `_cutRoutes` and
  `_userRoutes` (`research/sf/dossier-generation.md:319, 353-357`). The port's F14 reads `_cutRoutes`, `_userRoutes`, a
  route link, `tradeLinks` and a partner's LIVE relationship, "the trade slice at the next epoch"
  (`03-s7-editing.md:1857`; `research/sf/mapping.md:636`). **C**
- **Open: does `ADD_TRADE_GOOD` name a partner?** Its payload is not in the surveys. **U**
- **Open: does the simulator rewrite `tradeLinks` after birth?** The surveys observed it only at generation
  (`research/sf/dossier-model.md:156`). **U**

## 5. Prosperity

- **One word per settlement.** `economicState.prosperity` ∈ Subsistence (internal), Struggling, Poor, Moderate,
  Comfortable, Prosperous, Wealthy (`research/sf/dossier-model.md:91`; `research/sf/mapping-verify.md:276`, V23).
  - At birth: Poor 42, Prosperous 41, Comfortable 36, Moderate 25, Struggling 11; Wealthy only after lit ticks
    (`research/sf/mapping.md:155`). **C**
  - "No per-household or per-class wealth exists anywhere in the stored dossier" (`research/sf/dossier-model.md:91`). **C**
- **District wealth is derived, and we ignore it.** SettlementForge's district `wealth` (destitute…opulent) is a derived
  read, never stored (`research/sf/dossier-model.md:192`). Our port ignores it (`research/sf/mapping.md:126`, row 23;
  `03-s7-editing.md:1586`). **C**
- **Our reading.** `wealth.label` → `intent.wealthLevel` by the `wealth` row (Subsistence 0.05 squalid … Wealthy 0.95
  rich) (`docs/volumes/V08-settlementforge.md:828-830`) → DR6's field and each plot's band. The bar: the mean band lies
  within one band of the row's (`03-s7-editing.md:1746`). The word must never be copied into a plot band
  (`research/sf/mapping.md:492-501`, conflict 4.7). **C**
- **So "neighbourhood prosperity" is ours.** It is the map's band field (six bands, squalid … rich), a map fact under
  item 20 (h). SettlementForge supplies only the settlement-wide word. **C**
- **Change over time.** Prosperity moves by one step under the flagged movers. No event handler writes it
  (`research/sf/dossier-generation.md:749`). The lit preset lifted a city Comfortable → Prosperous (week 5) → Wealthy
  (week 33) (`research/sf/dossier-generation.md:849`). Our receipt F9 carries it into an epoch
  (`research/sf/mapping.md:631`). **C**
- **Item 114's reader.** It confirms that `economicState.prosperity` is the one wealth word the digest carries, and that
  a creation-time ceiling must not contradict it
  (`docs/validation/coherence/work/g114-115/read-sf.md:80-102`). **C**

## 6. Climate, culture and era

- **Climate: no dossier field.**
  - `desert` → the arid biome (`docs/volumes/V08-settlementforge.md:767`).
  - The culture → a latitude by the `cultures` row (`docs/volumes/V08-settlementforge.md:879-882`; DR29,
    `03-s7-editing.md:1769`).
  - The realm digest's biome, climate and lake sub-digests exist "dark" (`research/sf/dossier-generation.md:351-352`),
    outside the dossier. **C**
- **Culture: a key plus prose.**
  - `config.cultureProfileKey` (= `config.culture` in 155 of 155; `mediterranean` → `latin`)
    (`research/sf/mapping.md:111`; `research/sf/mapping-verify.md:267`, V14). **C**
  - `culturalIdentity = {key, label, scope, builtForm, civicPattern, exchangePattern, foodways, sacredLife,
    defensePattern, socialTexture, architecturalDetail}` (`research/sf/dossier-model.md:97`). **C**
  - **SettlementForge's culture does imply building traditions, in prose that names materials:**
    - a latin city: builtForm "Masonry courtyard buildings and tiled roofs gather around public squares and
      processional streets"; architecturalDetail "warm tile roofs and enclosed courtyards break up the stone streets"
      (`research/sf/dossier-model.md:97`);
    - norse: "Long halls, boat sheds, turf-roofed outbuildings, and timber yards face a landing or sheltered common";
      celtic: "Older round or oval compounds sit among later rectangular halls"
      (`research/sf/dossier-outputs.md:438`). **C**
  - `architecturalDetail` varies within one profile (`research/sf/dossier-outputs.md:438`). `culturalIdentity` never
    changed in any tick run (`research/sf/dossier-outputs.md:187`). **C**
  - **Our reading: the key only.** Mapping row 14: "prose for descriptions and the clerk; never parsed into geometry"
    (`research/sf/mapping.md:112`). R15: the culture key selects "a template-family row, fixed in a table by us, never
    parsed from prose at run time" (`research/sf/mapping.md:413`). §7.7 item 1 reads no prose beyond a description seed
    (`03-s7-editing.md:1593-1595`). **C**
- **Era: no field.** "The line has no era field": the `era` row maps every culture to `c14`, region `western`
  (`docs/volumes/V08-settlementforge.md:955-958`; `docs/volumes/V11-content.md:3365-3367`). **C**
  - The settlement's age is `history.age` in years (`research/sf/dossier-model.md:170`). **C**

## 7. Institutions that produce or work materials

**What the catalogue holds.** SettlementForge's catalogue is 280 kinds on the branch
(`research/sf/dossier-model.md:121`). V11 §3.11 maps every one to our class (`docs/volumes/V11-content.md:2352-2633`). The
material-relevant kinds, with SettlementForge's tiers (T thorp, H hamlet, V village, W town, C city, M metropolis), are
below. **C**, from V11's rows at the cited lines:

| SettlementForge kind (catalogId) | tiers | our class | line |
|---|---|---|---|
| `stone_quarry` (Crafts) | H, V | `quarry` | 2413 |
| `mine` / `mine_open_cast` (Crafts) | V / H | `mine` | 2396-2397 |
| `woodcutter_s_camp` (Economy) | T | `lumber_camp` | 2528 |
| `sawmill` / `sawmill_commercial` (Crafts) | V / W | `sawmill` | 2406-2407 |
| `carpenter`, `carpenter_part_time`, `carpenters_5_15` (Crafts) | V, H, W | `carpenter` | 2374-2376 |
| `woodcarver` (Crafts) | V | `woodcarver` | 2424 |
| `charcoal_burner` (Crafts) | H, V | `charcoal_burner` | 2378 |
| `brickmaker` (Crafts) | V | `brickworks` | 2372 |
| `potter` (Crafts) | V | `potter` | 2401 |
| `thatcher` (Crafts) | V | `thatcher` | 2419 |
| `peat_cutter` (Crafts) | H | `peat_works` | 2400 |
| `glassblower` / `glassmakers` | W / C | `glassblower` / `glassworks` | 2388-2389 |
| `smelter` (Crafts) | W | `smelter` | 2409 |
| `shipyard` (Economy), `river_boatyard` (Economy) | W, C / V | `shipyard` / `boatyard` | 2513, 2510 |

**What the tier gating means.**
- **No stone institution at TOWN and above.** SettlementForge lists no quarry kind at W, C or M (`stone_quarry` is H, V
  only). So at our rungs, stone access is stated only by the `stone_quarry` DEPOSIT, the `Stone Quarrying` income row, or
  a quarrying supply chain. **C** from the table; **P** as a reading.
- **No mason's yard, lime kiln or tile works** exists among the 280 kinds. **C** from V11's full table. Our classes
  `mason_yard`, `lime_kiln` and `brickworks` exist (`docs/volumes/V11-content.md:1459-1461`); only `brickworks` is bound,
  from `brickmaker` at V.

**Other catalogue signals.**
- **Tags.** The canonical vocabulary includes `timber`, `shipbuilding`, `metalwork`, `craft` and `industry`
  (`research/sf/dossier-model.md:114`); `timber` is among the 42 tags seen (`research/sf/mapping.md:140`). Our `tags`
  row maps `timber` → timber-yard and `resource_extraction` → extraction
  (`docs/volumes/V08-settlementforge.md:900`). **C**
- **Supply chains.** They are grouped by need key, including `raw_extraction` and `manufacturing`
  (`research/sf/dossier-model.md:139`). The port reads them as `economy.chains`, each resource joined to a listed deposit
  by `resourceKey` (`docs/volumes/V08-settlementforge.md:1535-1537`), for DR33. **C**
- **Quarters and landmarks.**
  - The quarter `Woodcutters' Ground` ("At the forest edge") occurs in 4 of 153 (`research/sf/dossier-outputs.md:436`).
  - The landmark strings `Timber stacks` and `Charcoal pit` are village-product rows only
    (`docs/volumes/V08-settlementforge.md:814`; `research/sf/PLAN.md:237`). **C**
- **The housing stock's description.** `Housing (180-1000 structures)`'s catalogue `desc` reads "Timber and stone,
  raised to more than one floor." (`research/sf/dossier-outputs.md:273`). A `desc` is a description seed only, never
  geometry (`research/sf/mapping.md:144`, row 36). **C**

## 8. The one structured material word: a custom record's `materialFamily`

- **The token.** A custom institution may carry the scene tokens `sceneProfileId`, `landmarkLevel` and `materialFamily`,
  present "only when the author set them" and absent on the reference pack's record
  (`docs/volumes/V08-settlementforge.md:1225-1227`). The adapter checks them against the line's enumerations — 17, 2 and
  6 values (`docs/volumes/V08-settlementforge.md:2045-2047`). The six material words are CONFIRMED
  (`docs/volumes/V08-settlementforge.md:3205`). **C**
- **Our `materials` row.** `brick` → `brick`; `stone` → `ashlar`; `marble` → `ashlar`; `ruined-stone` → `rubble`;
  `timber` → `timber_frame`; `steel` → `ashlar` with a note; else no material, noted
  (`docs/volumes/V08-settlementforge.md:959-962`). It feeds DR15. V11 selects "the row whose walls share is largest for
  that family" (`docs/volumes/V11-content.md:3392-3393`). The drawing passes it to the building's material row
  (`docs/volumes/V08-settlementforge.md:2476`). **C**
- **SettlementForge's own map reads the same token.** Its legacy map-input typedef names `materialFamily` per
  institution (`research/sf/dossier-seam.md:167-170`). That is SettlementForge's map program: never read, never an input
  (`research/sf/mapping.md:128`, row 25). **C**
- **Clean-room note.** SettlementForge's town-fabric kernel header calls itself "the growth layer for STONE … Map =
  projection(dossier + fabric)" (`research/sf/dossier-generation.md:208-210`). It is SettlementForge's map memory,
  `urbanFabric`, never read (`03-s7-editing.md:1584`). **C**. What "STONE" names there is **U** and irrelevant.

## 9. Fields that must stay unread

All are on §7.7 item 1's never-read list, `03-s7-editing.md:1584-1595` (**C**):
- `economicViability` = `{viable, issues, warnings, dependencies, suggestions, plotHooks, summary, metrics{foodBalance,
  tradeAccess, criticalIssueCount, dependencyCount, warningCount}}` (`research/sf/dossier-model.md:144`). It is the host's
  own verdict; ignored also by `research/sf/mapping.md:167` (row 54).
- `resourceAnalysis` (§3.1).
- `config.priority*` (the sliders), per `research/sf/mapping.md:167` (J-M5).
- The campaign ledgers (§4.3).
- `urbanFabric`.
- SettlementForge's derived district and map profiles.

## 10. `docs/volumes/V08-settlementforge.md`, searched whole

Hits per word (case-insensitive): material 23, timber 5, stone 22, quarry 7, clay 1, brick 2, resource 51, deposit 72,
trade 40, goods 15 (`tmp/v08-material-hits.txt`, `tmp/v08-trade-hits.txt`). Many "stone" hits are "milestone". The
substantive statements:

- **The owner's plain words.** "A supply chain SettlementForge reports as active is laid out as one working line: the raw
  material at its field or quarry, the workshops stepping inward, the seller near the market." (`:105-106`)
- **Scope.** "the goods, era and material rows [are] volume V11's" (`:242-243`). The wiring row lists the row sets
  `era`, `materials`, `isolation` and others, whose consumers include "V11's material rows" (`:308`).
- **The revision's traced reads.** `materialFamily` → the `materials` row (DR15); the culture → `CircumstanceSlice.era`;
  `isolationSupport.paths` → `site.isolation` → DR19; `primaryExports`, `primaryImports` and `transit` → `goodWords` →
  DR3, DR10 and DR-V8.5 (`:355-369`).
- **The facts this volume reads.** "deposits → `site.deposits` → DR19 and `DepositSite`" (`:346`).
- **The carried facts.** `resource {state, custom}` and `trade {partners, links {good, flow, partner}, entrepot, goods,
  incomeShares}` (`:566, 569-570`).
- **The row sets.** `site` (`:759-768`), `access` (`:769-773`), `deposits` (`:776-807`, including the derived
  `res:derived:<landuse>` for salt and peat), `wealth` (`:828-830`), `sectors` (`:831-841`), `tags` (`:895-907`), `era`
  (`:955-958`), `materials` (`:959-962`), `isolation` (`:967-971`), `chainStatus` (`:972-977`), `dependencySeverity`
  (`:978-979`) and `threats` (`:988-997`; `hostileSeaPartner` is a trade partner read as hostile).
- **The digest.** `economy.chains` joins the chain's resource to a deposit by `resourceKey` and reads the outputs through
  `goodWords`; `economy.goods` (`:700-707, 1535-1539`). The diff rows for `resource` and `trade` (`:1572, 1575`).
- **Deposits as records.** Each listed deposit is put as a `DepositSite` with S12a's bearing and land use (`:1968-1975`).
- **Custom resources.** Their kind is read only from the admitted library (`:1232-1238, 2054-2058`).
- **Drawing.** A `DepositSite` is drawn as its land use, `worked-out` when depleted (`:2470`). A custom building's
  `material` is "passed to the building's material row (§2.6; the row's content is V02's)" (`:2476`).
- **The quarry-ossuary.** `stone_quarry` feeds V04's quarry-ossuary candidate (`:1030, 1047`).
- **The six material words** are CONFIRMED (`:3205`).
- **What V08 never says.** No V08 passage derives a building material from terrain, a deposit, a trade link, a partner
  or prosperity. **C** (by the whole-file search).

## 11. Findings for the item-116 writers — each a decision to pin

**F1. No material field.** SettlementForge states no material for any generated building.
- The only structured material word is the optional custom `materialFamily` (§8).
- Every material on a dossier map is therefore a MAP fact under item 20 (h), derived from dossier facts. Nothing is to
  be asked of SettlementForge.
- The three sources map to digest fields that already exist: `site.terrain`, `site.deposits` (with state), and the trade
  records (`economy.tradeLinks`, `economy.partners`, `economy.goods`, `site.access`, `site.isolation`). The prosperity
  pairing reads our band field (DR6).
- DR15's inputs (`03-s7-editing.md:1755`) and `MaterialRow`'s key (`01-domain-model-and-schemas.md:844-845`) must gain
  them: DR15 is the row the item extends.

**F2. What "native" means.** The owner's word "native" has no pinned meaning on our side, and SettlementForge's
`nearbyResourcesNative[]` has no established meaning (§3.4, **U**). The item must define "native" from facts the port
already reads.
- **P, recommended:** a material is native when a listed deposit of its family is `available` (or `discovered`, from the
  next epoch), OR when the site's terrain yields it by a table row of ours (e.g. `forest` → timber; `hills` and
  `mountain` → fieldstone or rubble; a marsh or `swamp` → reed; clay by a riverside row), OR when a custom resource's
  admitted kind opens it.
- **Terrain is the owner's first-named source.** SettlementForge's own deposits are terrain-legal draws
  (`research/sf/dossier-generation.md:381`). The terrain rows must not grant what the dossier contradicts: for example,
  a depleted `stone_quarry` must not be re-granted by a `hills` row. That rule has to be stated.
- **The alternative.** Adopting SettlementForge's `…Native` lists needs a first-hand read of `resolveResources.js` at
  `5d699cc68` and a new digest field. Unestablished, and not available to this reader.

**F3. Which trade evidence licenses a non-native material.** The owner's refinement demands "trade specifically with
another settlement that has that material". The dossier's partner-level evidence is:
- (a) an `import` `tradeLinks` entry whose `goodId` or `good` resolves to the material's good. SettlementForge makes one
  only on overlap, so the partner has it (§4.2).
- (b) `neighborRelationship.primaryExports` or `activeChains[].resourceKey` of the imported neighbour: the partner
  produces it (§4.3). It is not read today; admitting it needs a digest field (e.g. `economy.partners[].goods`, resolved
  by `goodWords`).

What does NOT name a partner:
- the label lists (`primaryImports`, `necessityImports`, `transit`) and `tradeDependencies`;
- `neighbourNetwork` relations (no goods);
- the magical-transit or teleport paths (no partner);
- our derived `TradePartner`s (`source: 'derived'`, `03-s7-editing.md:1431-1433`) — the map's own, having nothing the
  dossier states.

The item must rule whether any of these license a material. **P, recommended:** none do. A derived or realm-block
partner carries a bearing, never goods.

**F4. How rare the evidence is.** 1 of 155 births carries any partner-level link; 0 of 120 soak dossiers
(`research/sf/mapping.md:161`; `research/sf/dossier-outputs.md:137`). Under a strict reading, almost every SettlementForge
map is native-only at creation, and gains a non-native material only when a partner link arrives (F14's absorb).
- The item should say so plainly, as the owner's intended consequence.
- It should also rule what the prime case's evidence can be: a named `trade_partner` in `neighbourNetwork` with no goods
  does not name the material.
- `goodId` is carried but never resolved to our goods (§4.2). The item needs `goodWords` (or a goods-id row) applied to
  `tradeLinks`.

**F5. Isolated settlements.**
- `tradeRouteAccess: isolated` occurs in 19 of 155.
- The design still derives a partner per through route when none is named (`03-s7-editing.md:1431-1433`). The access
  row's `isolated` gives "1 gate on a track-class approach" (`docs/volumes/V08-settlementforge.md:771`).
- The refinement binds here: an isolated settlement has no non-native material at any epoch, until a dossier trade fact
  (F3 (a) or (b)) names a partner holding it.
- `_magicTradeOnly`, `magicTradeChannel` and the `magical_transit` path name no partner.
- Whether isolated births still list import labels is **U** (§4.1). The item's bar must not depend on it.

**F6. Where the owner's own example already sits in SettlementForge.** Depletion and re-supply is SettlementForge's own
story: "Shipbuilding timber (coastal stands cleared)" imported from a named partner (§4.2), and depletions over a lived
year (§3.3). The item must rule what depletion does:
- existing buildings keep their material (item 22, least disruption; `MaterialLedger` salvage,
  `01-domain-model-and-schemas.md:1717`);
- new construction and rebuilds may use the material only while a native source or a licensing trade link stands;
- `discovered` opens it from the next epoch (`docs/volumes/V08-settlementforge.md:793`).

**F7. The prosperity pairing is ours.** SettlementForge gives one settlement-wide word (§5). The richer-areas-in-stone
pairing must key on our plot band (DR6), never on SettlementForge's derived district wealth (ignored). This collides with
item 19's default "never a material keyed to the prosperity band" (`01-domain-model-and-schemas.md:1166-1170`; the
`band` key only in the off-by-default regional rows, `:845`). That is the conflict the item must state and rule; the base
reader has the detail.

**F8. Culture.** SettlementForge's `culturalIdentity` prose states building traditions with materials (masonry, tile,
stone streets; timber yards, turf roofs), constant over time (§6). Our port reads only the key and must not parse prose.
- If the item wants a culture's building tradition among the material weights, it can only be a culture-key row of our
  own (clean-room; no SettlementForge text copied), riding DR15's existing `site.culture` input.
- The `era` row is one constant, `c14`, for dossier maps (§6).

**F9. Tier gating of producers.** At TOWN and above SettlementForge has no quarry, mason, lime or tile institution (§7).
So the item must not require a producing institution as evidence of a native material at our rungs. The deposit, the
terrain row, the `Stone Quarrying` or `Timber Trade` income rows and a `raw_extraction` chain are the dossier's signals.
Where a material is native but no dossier record places its producer, the map derives the producer (`quarry`,
`lumber_camp`, `claypit`, `mason_yard`; V11's classes) as a map fact, with `existence: 'map'`.

**F10. Missing vocabulary.** No SettlementForge deposit, good or institution word exists for marble, slate, limestone or
lime, or peat as a deposit (§3.2, §4.4, §7). Only the custom `materialFamily` names `marble`.
- Our material ids hold `slate` only as a roof (`docs/volumes/V11-content.md:3389-3391`).
- The item must say which of our material ids each source can open. A material with no dossier source (e.g. a slate
  roof) is native only by a terrain row, else trade-only. Under the refinement it is trade-only unless a row makes it
  native.

**F11. Inconsistencies found in passing.**
- DR19 names "the realm cell's resources (optional)" as an input (`03-s7-editing.md:1759`; also
  `research/sf/mapping.md:417`), but `RealmBlock.cell` carries no resources field (`07-s14.md:238`).
- V11 §3.13.5 names a local-production list that V08's digest does not carry (§4.4).

**F12. Time and receipts.**
- Deposits change by F13 at their week (a `DepositSite` put) and convert land uses at the next epoch.
- Trade changes by F14 at the next epoch; prosperity by F9 at the next epoch.
- Culture and terrain never change after birth (§2, §6; `research/sf/dossier-outputs.md:187`).
- The item's material availability should therefore be an epoch input: the licence set re-evaluated at each epoch, with
  §4.11's rebuilds reading it. Standalone, the blueprint's rows fill the same inputs: the site toggles, a declared
  partner list, and no trade link unless a partner is declared.
