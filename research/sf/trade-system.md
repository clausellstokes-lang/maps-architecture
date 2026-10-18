# SettlementForge's trade and caravans — production, consumption, imports and exports, movement between settlements, and what a map lens can show

> Fable-reviewed 2026-10-18: PASS-WITH-CORRECTIONS — the physics, gating and constants hold; 22 verifier findings and 4 of the validator's own applied in place; two §9 readings amended in fact (boom hysteresis; the culture term's premise), none in design; §9 item 1 superseded by J-V13.63 (lane retrovalidation/trade; J392)

Synthesis seat `research/sf-trade`. Host: `/home/user/clausellstokes-lang/settlement-engine` at `origin/master`
`81f1cd96`, read-only (nothing written there). Three reading seats returned structured readings: (A) the trade
physics, the FP trade and economy volumes and the presets; (B) the generation economy (production, consumption,
exports, imports, services, prosperity), with scratch probes that ran the host's own generator functions read-only;
(C) the movers (caravans, entrepôts, smuggling, the trade war, salience, supply-web warfare, generosity, brokerage, the
lived route network, the sovereignty market). This note merges them, settles where they disagreed, and adds my own
re-reads of the code at `81f1cd96` (§11.3). Everything is in my own words; no code is copied; constants are quoted as
values.

Tags: [STATED] = a document or a code comment says it; [OBSERVED] = a seat or I read it in code ("re-checked" = I read
it again myself); [INFERRED] = reasoning, with the reason given.

Path abbreviations: `wp/` = `src/domain/worldPulse/`, `sp/` = `src/domain/spatial/`, `rg/` = `src/domain/region/`,
`gen/` = `src/generators/`, `econ/` = `src/generators/economy/`, `map/` = `src/components/map/`, `disp/` =
`src/domain/display/`, `lib/` = `src/lib/`, `data/` = `src/data/`, `store/` = `src/store/`. Documents: TRADE =
`docs/DESIGN_FP_TRADE.md`, ARCH_TR = `docs/DESIGN_FP_ARCH_TR.md`, EC = `docs/DESIGN_FP_ARCH_EC.md`, SWW =
`docs/DESIGN_SUPPLY_WEB_WARFARE.md`, PHASE55 = `docs/PHASE55_SPATIAL_ENGINE_DESIGN.md`, WY = `docs/DESIGN_FP_ARCH_WY.md`,
MAGIC = `docs/DESIGN_MAGIC_ECONOMY.md`, FOLD = `docs/DESIGN_FP_COHERENCE_FOLD.md`.

Presets (`wp/simulationRules.js:863-1223`): QL `quiet_local`, **RR `realistic_regional` (the default)**, DC
`dramatic_campaign`, SC `static_campaign`, NC `narrative_campaign`, LR `living_realm`, FS `full_simulation`. Three
gating words recur:

- **RR applied / RR born.** The keys that light most of the trade physics in RR (`commodityFlowEnabled`,
  `disastersEnabled`, the nine WAVES keys, the ONE_REGEN keys) are VIRTUAL: they are absent from the default rules and
  exist only in a preset's override spread [OBSERVED re-checked `wp/simulationRules.js:705-752`, `:873-902`]. The
  new-campaign birth door is null, so a campaign born through the plain door carries `presetId: realistic_regional`
  but none of those keys [OBSERVED re-checked `:31`, `:1552-1558`; `wp/worldState.js:664-669`; STATED EC:397 S28
  "ABSENT from the birth door"]. They arrive only when the preset's rules are actually applied: by the Instant World
  composer's tone preset (default RR, `lib/instantWorld/composeInstantWorld.js:417-419`) or by the DM's preset chip in
  the Simulation Rules dialog (`map/SimulationRulesDialog.jsx:274-279`). In the tables, "RR born" and "RR applied" are
  separate columns.
- **canon.** The spatial-canon marker `worldState.spatialCanonVersion > 0`, written only by the premium "Map
  geography" action on a loaded, generated FMG map (imported or custom-backdrop maps stay aspatial) [OBSERVED re-checked
  `store/campaignWorldPulseSlice.js:391-394`; `src/components/settlements/LivingWorldGates.jsx:103-117`]. Instant
  worlds are born uncanonized (`composeInstantWorld.js:31-36`, `:414`). Every physical caravan mechanic needs it.
- **W.** A premium DM can light `warLayerEnabled` per campaign from the Living-World gate, which requires Relationship
  drift (`LivingWorldGates.jsx:55-76`).

---

## 1. Summary

**What trade is in SettlementForge.** Three layers sit on top of each other and must not be confused:

1. **Generation economy (every world, every preset).** Each settlement is born with *labels*, not quantities. Its
   production is the set of about 74 authored supply chains (resource → processor → outputs, in 11 need groups) that its
   tier, resources, institutions and route class allow, plus the commodities its terrain yields. Its consumption is a set
   of needs: raw inputs its institutions lack, finished-goods demand by institution category, necessity staples (salt,
   iron, grain, timber), tier structural imports, faction-and-culture prestige demand, and a calorie deficit. From these
   come at most 12 exports (service exports are appended past the cap), at most 10 imports, a percentage income mix in
   which tolls, duties and transit trade appear as named rows, a food import-coverage rate keyed on the route class, and
   a prosperity label. None of it carries a quantity or a price. It is stamped once; calamities, resource changes and DM edits rewrite its chains and lists later, and the pulse rewrites the prosperity label and the food ledger's storage and deficit every tick (EC S18; §2.1, §3).
2. **Phase 5.5 commerce physics (built before FP; runs only on a canonized realm).** Each non-food imported good of
   each consuming institution becomes a *supply link* that pulls from the three cheapest reachable producers of that
   good, ranked once by the frozen path cost. Caravans travel the territory-adjacency graph at about one week per
   median adjacent hop, slower in winter, re-scored by danger and tolls. Two models exist and a world runs exactly one:
   **M2** (infinite origins, 8-week buffers, starvation only on a total cut) wherever the realm is canonized and
   `commodityFlowEnabled` is absent, and **M6a** (finite warehouses, integer caravans of 2–12 units, road-side towns
   tapping loads, exact conservation) in RR applied and FS. M6a brings entrepôts and tolls (M6b), a greed-against-danger
   dispatch decision (M6c), a throughput tally (M6d) that drives prosperity booms and busts, and smuggling at hostile or
   contraband gates (M7) (§5).
3. **The FP trade program (TR-1…TR-9) and its successor, the economy family (EC-0…EC-18).** Nothing of it is lit:
   TR-1, TR-2, TR-3 and the TR-9 contract are built dark; TR-4…TR-8 were absorbed into EC; EC is unbuilt [STATED
   FOLD:340]. The fold's "TR: LIT —" is correct for FP, but it does not mean "no trade runs": layer 2 does.

**The owner's question — how goods and services flow between settlements from their imports, exports, production and
consumption — answered directly.**

- **Catalog services never move, but some service exports do.** Twelve institutional service patterns produce service
  labels and service exports; the goods catalog classes eight services, and the caravan layer excludes those. But the
  caravan layer reads *normalized labels*, and two service export labels normalize to goods: an alchemist quarter or
  shop is indexed as a caravan producer of alchemical_goods, a planar trader or embassy as a producer of arcane_reagents
  (a critical good). The freight and tourism exports become custom goods that no import label is known to match. The
  only explicit service-import path is a suggested healing dependency channel (§3.4) [OBSERVED re-checked by a
  read-only probe, §2.2].
- **Food never moves as cargo.** The six food goods (grain, flour, fish, livestock, provisions, salt) are excluded from
  every caravan; a settlement's food import is a standing coverage *rate* by route class (port 0.70 down to the mountain pass's 0.14), applied once at generation to its raw deficit (`gen/foodGenerator.js:319-331`); the tick carries that base deficit forward and, under a siege or occupation stressor, adds the import-dependency share back (§3.8). Relief grain between bonded partners moves the same tick with no
  caravan and no route (§5.9).
- **On a world that has not been canonized — every born world, every Instant World, every preset — no goods move at
  all.** What crosses settlement lines is consequence: (a) the regional graph's trade channels, proposed from
  overlapping export and import lists with no distance read and made true by DM confirmation, carry shortage
  conditions from a supplier in crisis to its dependents (lit in RR born, RR applied, DC, LR, FS); (b) the generosity
  engine moves grain storage between bonded pairs (WAVES: RR applied, DC, LR, FS); (c) the trade war re-points a
  buyer's primary-supplier channel (War: DC, FS, or W).
- **On a canonized realm the non-food goods move physically** as described in layer 2, pulled by the consumer from the
  nearest producers. Who supplies whom is geometry, not diplomacy: confirmed channels, relationship labels and the trade
  war's winner never choose a caravan's origin; a hostile-but-not-at-war exporter still ships; only war fronts and naval
  blockades cut caravans; embargoes, hostile labels and a DM-cut route do not (§5.5, §5.13).
- **There is no realm market.** Nothing clears supply against demand; there is no price. The only "price" a player
  sees is five relative movement phrases derived from a settlement's own stock band (§4).
- **Prosperity (the owner's addendum).** Generation prosperity is dominated by the route class (crossroads or port 3,
  road or river 2, isolated 1). On canonized RR-applied and FS realms, prosperity then moves *with trade*: a boom mints after throughput ≥ 3.0 with centrality ≥ 0.3 has held for 3 ticks (the dwell survives dips to 1.5); it then accrues +0.14 band-steps per tick (one rung about every 7 ticks, ladder-capped) until throughput falls below 1.0, embattlement appears or the resource is removed, when it busts: one rung down (−0.9, rounded) and −3 legitimacy [Fable-reviewed 2026-10-18: the 3.0/0.3 gate is the mint test, not the sustain condition; `wp/upswingKernel.js:617`, `:656-659`, `:669-671`, `:915`]. The entrepôt toll lift does *not* move prosperity: it raises only the economy-health score that
  institution foundings and closures read (§3.7, §6).

**What a DM in the default preset actually feels.** A campaign born through the plain door runs channel discovery, trade relationship drift, depth-1 regional waves on trade channels, the trade-scarcity cascade, export re-diffs on depletion and the stressor food-import cut (the plain default rules: `relationshipDynamicsEnabled`, `resourceDriftEnabled`, `stressorsEnabled`, `tradeFlowsEnabled` and `propagationMode: 'first_order'`, `wp/simulationRules.js:63-74`, `:1552-1558`; §7's "RR born" column), and, once premium-canonized, M2 caravans with starvation; no relief, no M6a, no Roads missions [Fable-reviewed 2026-10-18: the earlier sentence said "nothing else of trade"]. An Instant World (RR applied)
adds relief, credit and purchase between partners; after "Map geography" it runs the full M6a stack (finite stocks,
entrepôts, tolls, booms, smuggling at contraband gates). In peace even that stack has no danger term. Route danger
is embattlement. A war-front siege always starts it alone. An occupation starts it alone only while contested or
unstable, and only against weak security. War exhaustion can start it with high crime or the entrepôt premium. Crime
with the premium tops out at 0.5, under the 0.55 entry. Siege, occupation and exhaustion are all war-layer ledgers (a
siege *stressor* does not count), so in a realm whose graph has never held a live war front the dispatch refusal,
banditry, interception and smuggle spill are inert (§10, item 40).

**What this means for the map.** A trade lens can honestly draw supply links with their estimated arrival, entrepôt
centrality and tolls, stock bands, throughput, starvation and trade-war prizes; it cannot place a caravan on a road,
because a shipment record keeps no path and no departure tick [STATED WY:167-172 C4; OBSERVED re-checked
`sp/commodityFlow.js:781-785`]. The one trade traveller it can place is a named merchant on a Roads trade mission, which
keeps a frozen path and a leg clock (canon in RR applied, DC, LR, FS; §5.13). Four unrelated "trade link" sets exist in the host and must be kept apart (§9, item
14). The caravan graph *is* the host's frozen territory adjacency, so a map territory lens that differs from the host's
nearest-settlement-by-cost partition shows chokepoints the simulation does not use, and if the map's sway (V13 W8b) were ever supplied as the host's territory it could cut the caravan graph — which is why V13 §3.9 keeps W8a, the unbudgeted nearest-seat partition, as the host's territory (J-V13.63; §9, item 1). Patrols have no host term in
routing today; the nearest host slot is the embattlement ramp's capped security relief (§9, item 4).

---

## 2. The data model

### 2.1 What a settlement carries (generation; `economicState`)

| Field | What it holds | Writers | Source |
|---|---|---|---|
| `activeChains` | the running chains, each with status impaired / vulnerable / running / entrepot / operational, dependency and upstream-missing marks | generator; calamity prune; resource reconcile | `gen/computeActiveChains.js:178-567`; `econ/economicState.js:731-748` |
| `localProduction` | terrain commodities of non-depleted resources + the first two outputs of resource-activated, non-impaired chains | generator; resource reconcile | `gen/computeActiveChains.js:889-922`; `econ/customTradeEndpointIntegration.js:120-126` |
| `primaryExports` | ≤ 12 goods labels, then service exports appended past the cap; '(transit)' entries for entrepôt chains | generator; `economyReconcilePass`; DM trade-good events; calamity prune; resource reconcile | `econ/economicState.js:802-846`; `gen/computeActiveChains.js:677-798` |
| `primaryImports` | ≤ 10 labels | generator; `economyReconcilePass`; DM trade-good events (never the pulse's resource or calamity writers) | `gen/computeActiveChains.js:804-884`; `econ/economicState.js:782-809` |
| `necessityImports`, `tradeDependencies` | staples under stress; institutions needing a non-local raw input (critical under siege or isolation, else vulnerable) | generator | `econ/economicState.js:548-559`, `:688-732` |
| `institutionalServices`, `availableServices` | sellable service rows; the visitor's service menu in 11 buckets | generator / `economyReconcilePass` | `gen/computeActiveChains.js:926-1032`; `gen/servicesGenerator.js:53-387` |
| `tradeAccess`, `isEntrepot`, `transit` | the config route class echoed; crossroads or international port; up to 4 transit goods | generator | `econ/tradeGoods.js:90-97`, `:139-162` |
| `incomeSources` | named revenue rows summing to 100 (tolls, duties, transit, tithes, criminal…) | generator; `economyReconcilePass` only if the roster changed | `econ/economicState.js:66-368`, `:531-547` |
| `foodSecurity` | deficit, import coverage, storage months | generator; the food-stockpile tick rewrites storage months, `deficitPct`, `surplusPct` and `resilienceScore` (`wp/foodStockpile.js:404-411`); relief writes storage months | `gen/foodGenerator.js:160-200`, `:284-345` |
| `prosperity` | a label (six at generation, seven on the runtime ladder) | generator; band-step writers (upswing boom/bust, generosity purchase, traditions, roads). The entrepôt toll lift is *not* a writer: it feeds only institution-lifecycle economy health (`wp/institutionLifecycle.js:693-701`) | `econ/prosperity.js:27-314`; `data/constants.js:92-100` |
| `tradeLinks` | per-good links with the one neighbour bound at generation | generator | `rg/tradeLinks.js:45-81`; `gen/steps/generateEconomy.js:218-265` |
| `inputStockpiles` | M2's per-input buffers in weeks | M2 only (M6a never writes it) | `wp/supplyKernel.js:296-297`, `:495-497` |

[STATED `disp/economyFreshness.js:6-12`, `:24-25`] the chains, services, prosperity label and resource analysis keep their generation values after an applyEvent ("as judged at the last survey"); [STATED `econ/economicState.js:51-61`] the compound flags are stamped once; [OBSERVED] trade dependencies and the income mix have no runtime writer; the food ledger keeps its generation *base* deficit (`stockpile.baseDeficitPct`, `wp/foodStockpile.js:288`, `:411`) while the stockpile tick rewrites the visible `deficitPct`, `surplusPct` and `resilienceScore` every tick (`:404-409`). [Fable-reviewed 2026-10-18: the earlier sentence cited economyFreshness for services, the food deficit, trade dependencies and the income mix, which it does not name, and said the food deficit stays, which it does not.]

### 2.2 The goods catalog — the join key between settlements

27 rows: **19 goods and 8 services** [OBSERVED re-checked `rg/goodsCatalog.js:28-250`; seat B's "about 25" and seat C's
"28 / 20 goods" counted the custom fallback]. Criticality in brackets.

| Category | Goods | Ships by caravan? |
|---|---|---|
| food | grain (0.95), flour (0.90), provisions (0.84), fish (0.82), livestock (0.78), salt (0.72) | **never** |
| raw_material | iron (0.72), timber (0.62), raw_materials (0.55), stone (0.50), furs (0.40), clay (0.38) | yes |
| fuel | fuel (0.68) | yes |
| finished_good | leather (0.48), textiles (0.46) | yes |
| military | arms (0.76) | yes (contraband by culture) |
| luxury | luxury_goods (0.28) | yes |
| arcane | arcane_reagents (0.58), alchemical_goods (0.44) | yes (contraband by law or culture) |
| service / transport / military / arcane services | financial, legal, religious, education, medical (0.70), military (0.66), transport (0.74), arcane | **never** |

- **13 goods ship**; seven of them are *critical* (criticality ≥ 0.5: iron, timber, raw_materials, stone, fuel, arms,
  arcane_reagents), which matters for the fragile-link brake (§5.4) [OBSERVED re-checked `wp/supplyKernel.js:71-86`].
- Normalization: an exact alias, else a fuzzy token overlap of at least 0.42, else a custom good `custom.<slug>` with
  kind *good*, category *other* and criticality 0.35 [OBSERVED re-checked `rg/goodsCatalog.js:447-477`]. A custom good
  is therefore shippable whenever an exporter's and an importer's labels slug to the same id. Merging uses exact hits
  only, because the fuzzy path reads "Baked goods" as iron (`:405-414`), but the caravan producer index uses the fuzzy
  path, so a bakery town is indexed as an iron producer [OBSERVED seat B probe; `wp/supplyKernel.js:95-109`].
- The same fuzzy path decides whether service exports and stress imports are goods or services [OBSERVED re-checked:
  a read-only `normalizeGood` probe at `81f1cd96`; labels from `gen/computeActiveChains.js:926-985`, `:1028-1032` and
  `econ/economicState.js:548-559`]. 'Alchemical trade (potions, reagents)' becomes alchemical_goods (shippable).
  'Planar trade access' becomes arcane_reagents (shippable, critical, 0.58). 'Waterborne freight services (cargo,
  pilotage)' and 'Cultural tourism revenue' become shippable custom goods. 'Maritime services (cargo, pilotage)' becomes
  transport_services, which stays home. 'Scholarly services (…)' becomes financial_services. The plague import
  'Medicinal herbs' becomes medical_services, so plague demand never ships. The siege import 'Iron (weapons)' becomes
  iron, which ships. A goods lens must key on the normalized id, never on the label.

### 2.3 Realm-level state

| State | Shape | Writer | Lit (§7) |
|---|---|---|---|
| `regionalGraph.channels` (trade) | `trade_dependency` supplier → dependent; `export_market` buyer → exporter; `trade_route` both ways; `service_dependency`; each with strength, status suggested / confirmed, goods, visibility | discovery (DM confirms); trade war mints and demotes | always |
| `relationshipStates` trade labels | trade_partner and the drift rules neutral_to_trade_partner, trade_to_allied, trade_route_disruption, trade_smuggling_pressure; trade-salience secondary statuses | relationship drift; salience overlay | drift on |
| `spatialLedgers.supplyShipments` | one record per active link: institution, destination, input good, source, arrival tick, starving; under M6a also the carried load and optional ranDanger / smuggle flags — **no path, no departure tick** | M2 or M6a | canon |
| `spatialLedgers.commodityStocks` | settlement → good → integer units | M6a | RR applied, FS + canon |
| `spatialLedgers.entrepots` | settlement → centrality, toll, since, last tick | M6b | as M6a |
| `spatialLedgers.tradeFlow` | settlement → in, out, last tick | M6a | as M6a |
| `spatialLedgers.merchantAppetite`, `dispatchWillingness` | per origin appetite 0.3–2.0; per link refusal latch | M6c | as M6a |
| `spatialLedgers.embattlement` | settlement → 0..1 danger level with a hysteresis phase (written by `setSpatialLedger`, `wp/pulseKernel.js:2394`; read by `getSpatialLedger`, `sp/embattlement.js:303`; only `sp/embattlement.js:9`'s header keeps the old `worldState.embattlement` spelling) | the embattlement advance | canon |
| `worldState.tradeWarState` | prize (buyer, commodity) → winner, incumbent, last flip, coercion tick | trade war | War |
| `spatialLedgers.campaignPlans` | aggressor → target, ≤ 4 stages (mode, satellite, input, status), EV, strangulation | supply-web warfare; two DM verbs | War + wave + canon |
| `spatialLedgers.obligations`, `tradeOverture`, `refugePostures`, `generosityWillingness`, `bufferDiscipline`, `lendAppetite` | the relief economy | generosity | WAVES |
| `spatialDigest` | frozen at canonize: per-cell `territory`, `gates`, the all-pairs `distanceMatrix`, tiers (the calibration is derived at read from the matrix and tiers and memoized, `sp/distanceRead.js:540-560`; the digest stores none), `routeReceipts`, reserved slots `seasonalOverlay`, `seaLanes` (with ports and capacity), `teleportEdges`, `kmScale` (never written) | canonize only | canon |

Time depth: every one of these keeps **current values only**; there is no per-good or per-link history; history lives
in pulse history (cap 80) and world news (cap 240) [STATED EC:432 S53, :654].

### 2.4 Vocabulary that collides

- **Gate** means three things: (1) the digest's *gate*, the cheapest boundary crossing between two adjacent territories,
  which is an edge of the settlement graph [OBSERVED re-checked `sp/spatialDigest.js:697-736`]; (2) a *route
  intermediary*, the settlement whose territory a route passes through, which is where tolls, taps, contraband and
  hostility are checked; (3) a town wall gate in the income mix ("Gate Tolls" on a road with a gate or wall). The
  Living-World "gates" are UI flags, unrelated.
- **Toll** means four things: generation income rows (Toll Revenue, Gate Tolls, River Tolls, Port Duties); the M6b
  entrepôt toll (a route cost; no goods taken, no coin moves); the smuggle pipeline's "toll" branch (= delivered); the
  W-COIN treasury's market_tolls and port_customs (dark) and EC-6's tariffs (unbuilt).
- **Entrepôt** has three definitions (§3.5). **Supply chain** names the generation chain engine, the
  `supplyChainState` pressure adapter, the DM's inferred custom chains, and the host map's "Supply chains" layer, which
  has its own six-row table (§8.1).
- **Brokerage** in the host is *information* brokerage (houses selling answers and intercepts for political capital),
  built dark (§5.12); it is not a trade broker.
- **Besieged** (and **blockade**) mean two things. (1) The *war-front siege*: a confirmed war_front channel into the
  settlement that is not a pure hostile-relationship bundle (`wp/warFrontReads.js:1-84`). Embattlement, caravan
  severance and the Roads damper read this one. (2) An active siege or occupation *stressor*, born from conflict
  pressure (siege at 0.72, occupation at 0.76; `wp/stressorsCore.js:55-77`) wherever stressors run. The food stockpile
  calls this a "blockade" (`wp/foodStockpile.js:99`). It cuts the food-import share and impairs airship docks (§3.8) but
  drives no caravan mechanic. The naval *blockade* is a third thing: a fleet on a port's sea approaches (§5.5). A lens
  must keep the two kinds of besieged apart [OBSERVED re-checked].

---

## 3. The per-settlement picture

### 3.1 Inputs

Tier; the route class `tradeRouteAccess` (road, river, crossroads, port, coastal, mountain_pass, isolated, none); terrain;
the native nearby resources and their depletion; the final institution roster; the priority sliders; stresses (siege,
occupation, famine, plague); culture; factions; the one neighbour bound at generation; DM goods and service toggles;
custom content [OBSERVED seat B]. No distance, coordinate or map fact enters, except through the route class, terrain
and resources, all config strings.

### 3.2 Production of goods

- **Chains.** About 74 chains in 11 need groups: food 9, raw extraction 19, manufacturing 11, trade/entrepôt 10, defence
  4, healing 3, knowledge 4, arcane 4, religion 3, entertainment 3, criminal 4 [OBSERVED seat B census of
  `data/supplyChainData.js`, 1,482 lines]. A chain runs when its tier gate is met, the magic dial is above 0 for arcane
  chains, its resource is available, depleted-but-present, substituted or not needed, and at least one roster
  institution matches a processor (by catalog id or a 12-character fuzzy prefix). Entrepôt-only chains also need a
  crossroads, port or river route (arcane ones accept a teleport, planar or airship institution). A grain chain milled
  at an external lord's mill runs but cannot export (banalité) [OBSERVED `gen/computeActiveChains.js:178-362`].
- **Status.** Impaired, vulnerable, running, entrepot or operational, from trade dependencies, a hard-coded dependency
  cascade (brewing ← grain, smelting ← fuel/timber, caravan trade ← animal husbandry/grain …) and the data's upstream
  chains; a missing upstream makes a chain vulnerable and becomes an import label (`:402-564`).
- **localProduction** = terrain commodities + the first two outputs of each resource-activated, non-impaired chain
  (`:889-922`). A newly founded mill produces nothing until the next resource change, because institution foundings do
  not re-run chains [STATED EC:377 S18].

### 3.3 Consumption of goods (needs)

| Need | Rule | Source |
|---|---|---|
| Raw-input dependencies | an institution named in the dependency table whose resource is neither local nor agricultural; critical under siege or isolation | `econ/economicState.js:688-732` |
| Finished goods | per category (military and religious from hamlet up; maritime only on port or river; luxury from town up; alchemical) demand weights 1–5 of consumer keywords against supply weights; a gap adds a small / medium / large import, a surplus below −2 an export | `econ/finishedGoodsDemand.js:18-106` |
| Necessity staples | Salt unless port, river or a salt resource; Iron at city+ without a smith; Grain at a port or city+ without farm or granary; Timber at city+ without a carpenter or sawmill | `econ/tradeGoods.js:53-86` |
| Stress staples | grain and salt under siege or famine; "Iron (weapons)" under siege; medicinal herbs under plague. Normalized: grain and salt are food (never shipped), "Iron (weapons)" is iron (ships), "Medicinal herbs" is medical_services (never ships) (§2.2) | `econ/economicState.js:548-559`; `gen/computeActiveChains.js:834` |
| Tier structural | town+ without grain: bulk grain; city+: luxury textiles; metropolis: bulk raw materials | `gen/computeActiveChains.js:863-872` |
| Faction × culture prestige | one good per faction of power ≥ 8, budget 0–4 by tier | `gen/steps/economyReconcilePass.js:161-185` |
| Food (calories) | need = population × 2 lb/day; the deficit against local food chains | STATED EC S14; `gen/foodGenerator.js:258-262` (the constant at `:34-36`) [Fable-reviewed 2026-10-18: `:160-166` is the storage-buffer block] |

Non-food consumption is never subtracted from anything at generation, and non-food demand is ordinal (set by tier,
institutions and culture), not by population [STATED EC S14-S15].

### 3.4 Services

- **Production.** `INSTITUTIONAL_SERVICE_MAP` has **12** pattern rows: banking, legal, religious/pilgrimage, education,
  military contracts, arcane, medical, entertainment and culture, port revenue (waterborne freight, maritime wording
  only with a major port, navy or shipyard), scholarly, alchemical, planar [OBSERVED re-checked
  `gen/computeActiveChains.js:926-985`; seat B's "11 rows" miscounted its own list of 12]. Each match yields one
  service, status always operational; every row but medical is exportable and adds an export label
  (`:1018-1032`).
- **Local menu.** Each permitted institution resolves a service menu and rolls each service at p × a tier chance (thorp
  0.25 up to metropolis 0.95), with demand multipliers and crime overlays (contraband transport, customs bypass
  texture) [OBSERVED `gen/services/institutionServices.js:24`, `:102-201`; `gen/servicesGenerator.js:102-363`].
- **Movement.** Catalog services (kind *service*; the category list food/service/transport is a second filter on goods, so military_services and arcane_services, whose categories are military and arcane, are excluded by kind) are excluded from shipping (`wp/supplyKernel.js:71-86`). Tier service pools are filtered out of imports (`econ/tradeGoods.js:431-436`). The only
  explicit cross-settlement service is a *suggested* service_dependency channel from a healing provider to a
  settlement without healing (`rg/discoverDependencyCandidates.js:406-420`). EC-1's service condition arm ("healing:
  dear") is designed only [STATED EC:465-481, J-EC-7]. **But service exports are not services to the caravan layer
  when their labels normalize to goods.** Service exports join `primaryExports` (`econ/economicState.js:802-806`), and
  the producer index runs every export label through the fuzzy catalog (`wp/supplyKernel.js:95-109`). So the alchemy
  and planar rows (`gen/computeActiveChains.js:972-979`) index their settlements as caravan producers of
  alchemical_goods and arcane_reagents, which ship to any importer of those goods. The freight and tourism exports
  (`:956-967`) become custom goods that no import label is known to match [INFERRED from the probe and the import
  vocabulary; not probed realm-wide]. The maritime wording becomes transport_services and stays home (§2.2)
  [OBSERVED re-checked].

### 3.5 Exports and imports

- **Exports** are rebuilt from three sources: raw resource goods that pass extraction gates (no mine, no ore export)
  and processing gates; the first two outputs of each exportable, non-impaired, non-depleted chain (institution-gated);
  and the first output of each entrepôt chain marked '(transit)'. Then: a besieged settlement keeps at most 3 "(naval
  route only)" exports if maritime, else none; an occupied one at most 5 "(taxed by occupation)"; DM toggles; a cap of
  12; service exports appended *after* the cap; military-service exports (village+, military ≥ 60, a mercenary,
  garrison, barracks or professional guard) and, where the content profile allows, slave-trade entries; the subsistence
  boundary; the neighbour bias; and finally reconciliation drops any export whose canonical good is also imported,
  sparing transit [OBSERVED `gen/computeActiveChains.js:582-798`; `econ/economicState.js:612-687`, `:802-846`].
- **Imports**: chain dependency labels, necessity and stress staples, upstream intermediates, tier structural needs,
  capped at 10; then depleted-resource shortage imports at town+ and finished-goods gaps; `economyReconcilePass`
  appends faction demand and re-caps [OBSERVED `gen/computeActiveChains.js:804-884`; `econ/economicState.js:782-809`].
- **Isolation**: a thorp, hamlet or village on an isolated route, or any settlement on 'none' without magic trade, gets
  no chain imports or exports; the subsistence boundary clears an isolated thorp or hamlet entirely; but an isolated
  *town* keeps 11 exports and a finished-goods import in a probe [OBSERVED seat B `probe.mjs`;
  `econ/customTradeEndpointIntegration.js:100-119`].
- **The route class barely changes the goods.** A probe town (mill, blacksmith, tannery, weekly market, parish church,
  brewer, merchant guild, caravaneer's post, courthouse; grain, iron, grazing) gave *identical exports* on road,
  crossroads, mountain pass and port; only imports, transit and prosperity differed (Moderate on road and pass,
  Comfortable on crossroads and port, Poor isolated) [OBSERVED seat B `probe.mjs`].
- **Entrepôt, three ways**: `isEntrepot` (a crossroads, or a port with an international trade centre or warehouse
  district; `econ/tradeGoods.js:90-97`); entrepôt chains (crossroads, port or river; `gen/computeActiveChains.js:322-331`);
  and M6b's earned centrality from real crossings (§5.7). A river town runs entrepôt chains while `isEntrepot` is false.
- **Generation-time trade links**: with the one bound neighbour, an economy mode from the relationship (suppress caps
  our exports at 4; complement drops competing exports; compete keeps overlap; dependent adds the patron's imports as
  our exports, up to 8) and per-good links by canonical id or a finished-goods category bridge. There are no links
  when the neighbour is hostile *or* when the economy mode is suppress [OBSERVED `econ/neighbourEconomicBias.js:21-68`;
  `rg/tradeLinks.js:26`, `:45-81`; re-checked `:48`]. "Neighbour" here is an authored
  partner, not a geometric one.

### 3.6 The income mix (where tolls and duties live at generation)

Keyword gates over roster, tier, route and priorities, weighted by the economy slider and normalized to 100 [OBSERVED
`econ/economicState.js:66-368`, `:531-547`; `econ/tradeGoods.js:138-157`]: agricultural rents 65 (thorp–village) or 30
(a town without a market); market taxes 45 / 35 / 22 (× 0.4 when isolated trade runs on magic); guild fees 28 or 18;
**Port Duties 35** where world law supports maritime trade and a dock, harbour master or shipyard exists, else **River
Tolls 20**; banking 22 or 14; **Toll Revenue 20 only at a crossroads**; **Gate Tolls 10 only on a road with a gate or
wall**; church tithes and **Pilgrim Trade** on crossroads or roads; **Entrepôt Trade 18 / 20 / 25** at a crossroads (not
thorp or hamlet); **International Commerce 25** at a port with an international trade centre; Security Contracts 12
under a merchant army; criminal revenue equal to the black-market capture when above 10 (flagged criminal); resource
streams sized from the economy slider. No pulse writer rewrites it.

### 3.7 Prosperity (where trade touches it)

- **Generation** [OBSERVED `econ/prosperity.js:121-290`]: route base crossroads or port 3, road or river 2, isolated 1
  (2 with working teleportation), isolated thorp or hamlet 0; tier bonus town and city +1, metropolis +2; economy slider
  (p − 50)/40; magic bonus; plagued −1, frontier −0.5; military above 75 −0.3; walls + garrison + major route +0.3;
  institution depth ±1; income diversity 7+ sources +0.5, 5+ +0.25; capped at 4, then food security caps, stress caps
  and small-tier floors; mapped to six labels, Struggling to Wealthy.
- **Over time**: one rung at a time on the seven-rung ladder (Subsistence to Wealthy). Trade writers: the upswing boom
  (+0.14 band-steps per tick) and bust (−0.9, legitimacy −3), reading the M6d tally, M6b centrality and regional
  arteries; the generosity purchase (one band-step debit on the buyer, a small credit to the seller). (The M6b toll lift is not a prosperity writer: it feeds only institution-lifecycle health, `wp/institutionLifecycle.js:698-701` [Fable-reviewed 2026-10-18].) Other writers: traditions, roads [Fable-reviewed 2026-10-18 (lane retrovalidation/prosperity): corruption, faction capture and demographics only read the band — the src-wide writes of a `PROSPERITY_TIERS[...]` label are `wp/upswingKernel.js:917`, `wp/generosityUpdates.js:137`, `wp/traditionsKernel.js:405` and `rd/state.js:495`, and the demographics wave is dark; `research/sf/prosperity-system.md` §3.11, C16]
  [OBSERVED `wp/upswingKernel.js:100-130`, `:600-700`; `sp/entrepots.js:175-183`].
- Prosperity has exactly one *consumption* read: how much grain a buyer can purchase [STATED EC S16]. It is also the
  migration pull axis [STATED PHASE55 §4c].

### 3.8 Food import coverage

The raw deficit is covered at a rate keyed on the route class: port 0.70, crossroads 0.60, river 0.50, road 0.35 (+0.15
on mountain, desert or hills), mountain pass 0.14 (0.4 × the road rung, "open in season"). A disconnected route takes the
larger of the magic rate (teleport 0.3, airship 0.3, besieged airship 0.15, halved without an arcane maintainer) and
the minor-route trickle (town+ 0.08, village 0.05, zero under siege) [OBSERVED re-checked: the writer's rung with the
terrain boost at `gen/foodGenerator.js:284-316` (boost :298-305); `data/foodImportRates.js:17-23`;
`src/domain/tradeRouteSemantics.js:76` (the 0.14 rate)]. The viability view `econ/foodBalance.js:191-213` carries a
second copy of the ladder *without* the +0.15 terrain boost. It also grants the minor-route trickle on any
disconnected route (isolated or none), where the writer grants it only when the route is 'isolated'. Since a recorded
fix, the view reads the writer's published split when one exists (`econ/foodBalance.js:308-336`; STATED
`gen/foodGenerator.js:413-418`). Its own ladder survives only as the fallback for settlements saved before the writer
published that split (§10, item 42). (`gen/foodGenerator.js:182-189` is a different table: the import-dependency table — importCapacity, road 0.20, river 0.28, crossroads 0.42, port 0.58, capped by tier need into `importDependency` at `:190-191` — which the siege/occupation stressor cut reads (`wp/foodStockpile.js:322-324`) and the resilience score weighs (`:468`) [Fable-reviewed 2026-10-18: not descriptive].)

At tick time the stashed base deficit, already net of the coverage share, is carried forward (`wp/foodStockpile.js:288`, `:346-349`). An active **siege or occupation stressor** at effective
severity ≥ 0.4 adds the import dependency back as deficit, less the teleport (0.3), besieged-airship (0.15) and
underways bypass shares [OBSERVED re-checked `wp/foodStockpile.js:86`, `:99`, `:207-218`, `:301-322`; called every tick
at `wp/pulseKernel.js:599`]. The same stressor stamps a severity-scaled access impairment on airship docks
(`wp/blockadeTransport.js:1-60`; `wp/pulseKernel.js:649`). These stressors are born from conflict pressure (siege 0.72,
occupation 0.76; `wp/stressorsCore.js:55-77`) wherever `stressorsEnabled` runs: every preset but SC
(`wp/simulationRules.js:66`, `:968`). They need neither War nor naval transit. A naval blockade cuts caravans (§5.5),
not this rate. The effective deficit sums base, blockade, famine, deployment drain and seasonal cut, less the seasonal
boost [OBSERVED `wp/foodStockpile.js:287-345`]. Physical grain (TR-4 / EC-12,
`foodCaravansEnabled`) is designed only, with no gate read anywhere [STATED EC:575].

### 3.9 The per-settlement picture on a canonized realm

| | M2 (canon, no commodity flag) | M6a (canon + `commodityFlowEnabled`) |
|---|---|---|
| Consuming link | one per (settlement, consuming institution, imported shippable good), K = 3 ranked producers | same |
| Stock | buffer in weeks, refilled to 8 × the banditry-surviving share on arrival, drained 1 per week | integer stock, target 8, drawn 1 unit per week |
| Producer | infinite origin | warehouse: rate max(3, 6 × producing chains) per week, cap rate × 6, starts full |
| Starvation | every source severed + buffer empty + not fragile → `supply_starved` impairment (severity 0.6) naming the siege | stock 0 + no clear stocked source + nothing in transit + not fragile |
| Display | — | band per good: shortage below 0.35 × target, surplus above 1.25 × target, else adequate; market phrases |
| Also | M2b: the starving share feeds the siege verdict | entrepôt record, throughput tally (quiet < 0.25 < trickle < 0.9 < steady < 2.5 < busy), boom/bust, appetite, refusal latches, seizure loot at its gate |

Sources: `sp/supplyShipments.js:160-177`, `:326-418`, `:504-517`; `wp/supplyKernel.js:213-334`, `:350-390`;
`sp/commodityFlow.js:94-136`, `:190-197`, `:700-800` (re-checked); `sp/tradeFlow.js:53-69`. A settlement never draws on
its own export, so export pressure never reduces local availability [STATED EC S31-S32].

### 3.10 Constants in one place

| Constant | Value | Lives in |
|---|---|---|
| Export / import caps | 12 (+ services past it) / 10 | `gen/computeActiveChains.js:797`, `:876-883` |
| Supply candidates per link | K = 3 producers | `sp/supplyShipments.js:69` (`K_SOURCES`); `sp/distanceRead.js:917` is a different constant, `K_CANDIDATES` = 3 routes cached per pair |
| M2 buffer | 8 weeks | `sp/supplyShipments.js` tuning |
| Critical good | criticality ≥ 0.5 (fragile if < 2 sources) | `wp/supplyKernel.js:76` |
| Caravan risk tolerance | 0.6 | `wp/supplyKernel.js:81`; `sp/entrepots.js` |
| M6a production / floor / cap | 6 per chain per week / 3 / rate × 6 | `sp/commodityFlow.js:109-111`, `:206-217` |
| M6a target / draw | 8 / 1 per week | `:98-101` |
| Load min / max; origin minimum | 2 / 12; 1 | `:120-121`, `:115` |
| En-route tap cap | 3 per intermediary | `:126` |
| Band thresholds | 0.35 / 1.25 × target | `:134-135` |
| Route danger | 1.5 × median hop cost × risk tolerance × Σ embattlement on hops | `sp/embattlement.js:99-103`, `:348-367` |
| Banditry | chance = danger × 0.25; loss = (4–20 %) × danger, capped at 20 %, where danger is the route's mean embattlement per hop | `sp/embattlement.js:107-112`, `:384-389`, `:439-447` |
| Embattlement hysteresis | enter 0.55, exit 0.3, dwell 6; ramp 0.34, relax 0.12 | `sp/embattlement.js:74-82` |
| Embattlement weights | war-front siege 0.85; occupation 0.75 × its state (contested 1, unstable 0.85, extractive 0.5, stabilized 0.3, vassalized 0.15); war exhaustion 0.45; crime 0.3 (above 0.5); + the entrepôt premium; security relief 0.4 × security, capped 0.25 | `:84-98`, `:115-119`, `:196-206` |
| Entrepôt | EWMA decay 0.08 (~12 ticks), floor 0.02, throughput ceiling 6, toll = min(1.0, centrality), prosperity weight 0.3 vs upkeep 0.35, target premium 0.3 × c capped 0.2, foundings at ≥ 0.5 for 8 ticks | `sp/entrepots.js:63-106` |
| Dispatch EV | refuse > 0.2, resume < 0.05 after 4 ticks; siege danger 0.95; appetite 0.3–2.0, +0.25 / −0.3, decay 0.1; baseline 1.0 + 0.6 merchant − 0.4 lawful | `sp/dispatchEV.js:85-121` |
| Smuggle | success 0.12 + 0.4 network + 0.45 corruption − 0.35 resistance, max 0.65; boldness floor 0.3; seizure take ≤ 0.85; spill warrant 0.35, network ≥ 0.15 | `sp/smuggle.js:58-79` |
| Contraband | slaves (good or lawful gate, culture ≥ 0.5); military (culture ≥ 0.55); arcane (lawful gate, culture ≥ 0.6); lawful > 0.6, good = malice < 0.4 | `sp/smuggle.js:87-98` |
| Tally | decay × 0.6, prune 0.05; land 1, sea +1, airship 1.5, teleport 2 | `sp/tradeFlow.js:53-69` |
| Boom / bust | enter 3.0 with centrality ≥ 0.3, dwell 3 (the dwell continues above 1.5: `BOOM_EXIT_THROUGHPUT` is the building-phase floor, not a boom exit), +0.14 per tick / bust below 1.0, −0.9, −3 legitimacy, hold 3 | `wp/upswingKernel.js:114-126` |
| Trade war | ≥ 2 contenders with completeness ≥ 0.2; +0.15 for allied/patron/vassal; cooldown 6; winner channel 0.55 + 0.35 × score; loser's channel re-minted at the winner's new strength − 0.2; escalation at strength ≥ 0.5 | `wp/tradeWar.js:86-95`, `:400-418`, `:574`, `:592-611`, `:651-653` |
| Trade-scarcity cascade | crisis below trade_connectivity 35; severity 0.4 + 0.3 × strength; p ≤ 0.4; proposal at ≥ 0.62 | `wp/flows.js:124-166` |
| Generosity | need ≥ 0.5, bond ≥ 0.2, ≤ 24 asks per tick, capture 0.9, overture warmth ≥ 0.6 for 6 ticks → +0.04 trust | `wp/generosityKernel.js:204`, `:488-529`, `:1139-1187` |
| Season (land) | 13-week seasons; winter mountain 6.0, glacier 5.0, tundra 2.8, wetland 2.3, forest 1.8, grassland 1.5, desert 1.2; ≤ 6 | `sp/spatialCost.js:85-101`; `sp/distanceRead.js:82` |
| Season (sea) | spring 1.3, summer 1.0, autumn 1.5, winter 2.5; never severs | `sp/seaLanes.js:118-120` |
| Distance | median adjacent hop = 1 week; 1..52 weeks; distance weight floor 0.35 | `sp/distanceRead.js:75-92`; `sp/supplyShipments.js:140-145` |
| Sea-lane capacity | 10 per edge, read only by naval convoys | `sp/seaLanes.js:102`; `sp/navalLayer.js:298-326` |

---

## 4. The realm picture

**There is no realm market, no price and no realm-wide balance — by law** ("buyers who believe, never markets that
clear") [STATED TRADE:56-62; EC:532-540, J-EC-6]. The display speaks only in five relative movement phrases ("nearly
double" … "a third under its usual price") derived from the settlement's own M6a band, with no number and no coin
[OBSERVED `disp/marketPrices.js:1-82`]; an aspatial world reads "usual". What the realm does hold:

1. **The regional channel graph** — the realm's trade web in every world: trade_dependency, export_market and
   trade_route channels proposed from overlapping goods with no distance read, confirmed by the DM, realigned by trade
   wars. Shocks propagate along confirmed channels as regional_import_shortage, export_market_loss and route_disruption
   conditions at severity × strength × decay (depth 1 in RR born, RR applied and LR; 2 in DC and FS; 0 in QL, NC, SC),
   which strain the receiving settlements' chain statuses [OBSERVED `rg/propagation.js:150-175`, `:405-450`;
   re-checked `wp/applyWorldPulse.js:279`; `wp/simulationRules.js:1578-1586`; `src/domain/supplyChainState.js:343-458`].
2. **On a canonized realm**: the producer index (good → exporters), rebuilt every tick from the labels; the shipment
   ledger; under M6a, the stock map, the throughput tally and the entrepôt ledger with its Gini soak guard; four brakes
   on runaway hubs (tolls divert traffic, the throughput ceiling of 6, the wartime target premium, the toll cap)
   [OBSERVED `sp/entrepots.js:63-106`, `:370-381`]. M6a asserts realm-wide integer conservation every tick (before +
   produced = after + consumed + lost) and refuses to persist a tick that fails it [OBSERVED
   `sp/commodityFlow.js:263-272`; re-checked `wp/supplyKernel.js:489-493`].
3. **Trade-war incumbency** per (buyer, commodity), where War is lit.
4. **Supply-web campaign plans**, one per aggressor.
5. **The relief economy**: obligations, credit, refuge postures, overtures.
6. **Trade salience**: a per-pair value of the trade tie that dampens hostility and stamps critical_supplier,
   military_supplier, preferred_supplier or trade_partner statuses (War).
7. **Telemetry**: `lib/spatialUsage.js:120-190` counts caravans, starving links, smuggle runs and entrepôts.

**Realm reach of goods.** Every exporter of a good is a candidate source for every importer within the three cheapest
reachable producers, whatever their relationship. The real limits are war fronts, naval blockades, embattlement and
toll costs on route choice, the dispatch EV's believed danger, and (M6a) finite origin stock [OBSERVED seat C]. The
realm picture is exactly as good as the labels and the fuzzy catalog: "Spices and rare aromatics" becomes a singleton
custom good that matches nothing; food and catalog services never form a link [OBSERVED seat B `probe3.mjs`], though
the alchemy and planar service exports do, as goods (§3.4).

**Designed but dark realm aggregates**: realm self-sufficiency (J route lifecycle), the trade convergence endings
{fortune, ruin, monopoly, collapse, severance, cornered} (TR-9 contract), the house Gini (TR-2), and realm pressure's
trade-agreement consumer ("buy the grain before you bleed for it", TR-5's trade half, owned by no one, OD-FC-2) [STATED
EC; FOLD:340].

---

## 5. MOVEMENT BETWEEN SETTLEMENTS

### 5.1 Every channel at a glance

| # | Channel | Moves | Route / geometry | Travel time | Season | Capacity | Cut by | Gate (§7) |
|---|---|---|---|---|---|---|---|---|
| 1 | Generation neighbour links | nothing (export bias, link labels) | none | — | — | — | hostility or suppress mode (no links) | always |
| 2 | Regional channel discovery | nothing (proposals) | none; any two saves with overlapping goods | — | — | — | hostility (no channels) | always |
| 3 | Trade-scarcity cascade | a shortage condition | confirmed trade_dependency channel | same tick | — | p ≤ 0.4 per candidate | — | `tradeFlowsEnabled` ∧ propagation ∉ {off, local} |
| 4 | Regional propagation waves | conditions | confirmed channels | dated waves | — | depth 1 or 2 | — | propagation depth |
| 5 | M2 caravans | time-buffer refills (no quantity) | gate graph, k = 3 candidates, sea/teleport edges | route weeks ÷ tick weeks, ≥ 1 pulse | yes (overlay) | one per link | besieged source, gate at war with destination, blockade | canon ∧ ¬commodity flag |
| 6 | M6a caravans | 2–12 integer units of one of 13 goods | as M2, re-chosen at arrival | route weeks (not converted by tick span) | yes | one per link, ≤ 12, taps ≤ 3 | besieged source; hostile gate → one smuggle roll | canon ∧ commodity flag |
| 7 | M7 smuggle runs | as M6a, by the criminal channel | the worst gate decides | as M6a | yes | as M6a | seizure / confiscation | as M6a |
| 8 | Food import coverage | a rate, netted | none (route class) | — | harvest swing only (`seasonsEnabled`) | the rate | a siege or occupation *stressor* at severity ≥ 0.4 (no War, no navy; less magic and underways bypass) | rate always; cut where stressors are born (all but SC) |
| 9 | Generosity relief, credit, purchase | grain storage months | none: same tick | 0 | 13-week outlook in the EV | 24 asks per tick | — | `constructiveFlowsEnabled` |
| 10 | Treaty streams | grain-month arithmetic | none | — | 52-week treaty year | reserve floor | — | war-peace |
| 11 | Trade war | re-points a channel | none | — | — | one prize per (buyer, good) | cooldown 6 | War |
| 12 | Supply-web warfare | a strangulation pressure (no goods) | reads the M2 link geometry | stages, one per tick | — | ≤ 4 stages | EV collapse | War ∧ wave ∧ canon |
| 13 | Information brokerage | answers, feeds, intercepts, plants | none (distance surcharge always 0) | — | — | one act per settlement per tick | — | DARK |
| 14 | Designed movers | grain caravans, speculative push caravans, houses' ventures, factors, positioned caravans | the same physics | — | — | — | — | DESIGNED ONLY |
| 15 | Roads trade missions (§5.13) | a named merchant NPC (no goods) | `chooseRoute` on the digest over the court's believed view; a frozen settlement path | leg weeks from the digest; a node position along the path | yes | per-court travel slots, yearly cadence | war damper on the home court; believed-danger refusal; hazards, capture, ransom | `roadsEnabled` (ONE_REGEN) ∧ digest |
| 16 | DM route verbs (§5.13) | a cut annotation and condition; a chartered neutral neighbour link | cut: none; charter: the digest's distance matrix (band) and sea-lane set (mode) | — | — | — | undo | DM verb (charter needs the canon phase and a digest) |

### 5.2 The road model every caravan uses (canon only)

- **Graph.** Territories come from one multi-source flood over the FMG pack cells, each cell going to the settlement
  that reaches it cheapest; for every pair of adjacent territories the *gate* is the cheapest boundary crossing, costed
  settlement-to-border + crossing + border-to-settlement; the gates form a sparse settlement graph and Floyd–Warshall
  fills the all-pairs distance matrix [OBSERVED re-checked `sp/spatialDigest.js:690-740`]. There is no unclaimed land in
  this partition: every reachable cell belongs to some settlement.
- **Candidates.** Up to three routes per pair: the shortest path plus single-edge detours, memoized per digest, never
  re-pathfound [OBSERVED `sp/distanceRead.js:1078-1129`]. A trip with a port endpoint adds the frozen sea lanes; a trip
  with a teleport-circle holder adds teleport edges (the cheapest possible); inland-to-inland trips stay on land
  [OBSERVED `sp/distanceRead.js:940-1006`].
- **Choice.** Each candidate's seasonal cost + a danger cost (1.5 × median hop cost × risk tolerance × the summed
  embattlement of the hops) + a toll cost (median hop cost × the summed tolls of the intermediaries); the cheapest wins
  [OBSERVED re-checked `sp/embattlement.js:348-367`, `:395-423`]. The route is recomputed at dispatch, at every cut
  check and at arrival, so it can change mid-journey with no record [OBSERVED seat C].
- **Duration.** Route weeks = round(seasonal cost × weeks-per-cost), clamped 1..52, where the calibration makes the
  median adjacent hop one week [OBSERVED re-checked `sp/supplyShipments.js:140-145`; `sp/distanceRead.js:70-92`]. The
  absolute arm (`kmScale` and a five-mode speed table) is built but no caller supplies the scale, so every world runs
  the normalized read [STATED fp-physical-integration.md §1, D3; FOLD:344 WY row].
- **Seasons.** The road season is derived from the calendar every tick, independent of `seasonsEnabled`
  [OBSERVED re-checked `wp/pulseKernel.js:569-575`]; its multipliers apply only when the digest carries the seasonal
  overlay, which every new canon writes [OBSERVED `store/campaignSpatialCanonize.js:118-123`]. Winter can make a mountain
  route six times dearer (slow, never severed); sea storms multiply crossings by 2.5 in winter. Seasons change both the
  route chosen and the arrival.
- **Capacity.** None on land. Sea lanes record a capacity of 10 that only naval convoys read. The effective ceiling is
  one caravan in transit per link, at most 12 units, plus the entrepôt throughput ceiling of 6 crossings per tick
  toward centrality (not a cap on traffic) [OBSERVED re-checked `sp/seaLanes.js:102`; `sp/navalLayer.js:298-326`].
- **Unmapped settlements.** A settlement founded after the canonize has no territory, gate or distance row until a
  premium re-map; its links are dropped [OBSERVED `sp/supplyShipments.js:170-172`; STATED
  `LivingWorldGates.jsx:89-101`].

### 5.3 Who sends what to whom

Caravans are *pulled* by the consumer. A link exists for every imported shippable good that some other mapped,
reachable settlement exports; its origin is the first clear source among the three cheapest by frozen path cost. No
confirmed channel, relationship label or trade-war winner enters the choice; a hostile-but-not-at-war exporter still
ships [OBSERVED `wp/supplyKernel.js:95-109`, `:146-180`; `sp/supplyShipments.js:160-177`, `:236-259`]. One override: an
occupied vassal must ship to its occupier whatever the dispatch EV says ("tribute") [OBSERVED re-checked
`wp/supplyKernel.js:664-668`]. The documented ally-relief override is never returned (§10).

### 5.4 M2 — routed time buffers

Per tick and link: an in-transit record is dropped if its source is besieged or a gate at war with the destination now
sits on the route; on arrival the buffer refills to 8 weeks × the share banditry lets through; otherwise it drains a
week; with nothing in transit the failover walks the ranked list and dispatches, arriving after route weeks ÷ tick
weeks pulses (at least one) [OBSERVED re-checked `sp/supplyShipments.js:381-402`]. A link starves only when every source
is severed, the buffer is empty and the link is not *fragile*; a critical good with fewer than two sources is flagged
fragile and **never** starves (the "resilience inversion", EC S33). A starving link stamps `supply_starved` on the
consuming institution with a receipt naming the besieger; the starving share feeds the siege verdict (M2b)
[OBSERVED `wp/supplyKernel.js:213-334`; `sp/supplyShipments.js:504-517`].

### 5.5 M6a — finite stocks and conserved caravans

Per tick: PRODUCE (refill warehouses); ARRIVE (re-choose the route; the one smuggle roll at the worst gate; each
intermediary that itself imports the good taps up to 3 units toward its own target; banditry takes a share of the rest;
the destination is credited); CONSUME; DISPATCH (only below target and with nothing in transit; the first stocked,
clear source; load = min(target − stock, 12, origin stock), nothing under 2; the origin is debited at once); STARVE
[OBSERVED `sp/commodityFlow.js:447-897`, re-checked `:700-800`]. Destinations are served in id order, first come first
served against shared origin stock — no allocation [STATED EC S31]. Severance: a besieged source cannot ship; a naval
blockade of the destination's sea approaches severs sea sources and makes blockaders and sea-lane neighbours hostile
gates [OBSERVED `sp/navalLayer.js:520-530`; `wp/supplyKernel.js:248-258`]. Severance asks only about the source, and
interception only about the intermediaries, so a source that is itself at war with the destination still ships
(§10, item 43). Under M6a a hostile gate no longer cuts a
caravan in transit; it gets the smuggle roll instead (§5.8). **Embargoes, sanctions and hostile labels do not stop a
caravan; only war fronts and blockades do** [STATED EC:416 S42; OBSERVED `rg/tradeLinks.js:26`].

### 5.6 M6c — whether a caravan goes

The origin weighs the destination's need premium ((target − stock)/target) × its own appetite against the danger it
believes the destination poses × its caution (alignment lawfulness); it refuses above 0.2 and resumes below 0.05 after
4 ticks. Believed danger is ground truth when beliefs are off or the world is omniscient (siege 0.95, an occupation
term), else the origin's belief of the destination's readiness × confidence, and 0 when unheard. Appetite (0.3–2.0)
rises 0.25 after a risky delivery, falls 0.3 after a risky loss, and decays toward a baseline raised by merchant-faction
strength and lowered by lawfulness [OBSERVED `sp/dispatchEV.js:78-122`, `:169-288`, `:332-368`;
`wp/supplyKernel.js:608-670`]. RR is omniscient, so there the EV reads truth; FS reads belief.

### 5.7 M6b — entrepôts and tolls

Each tick every intermediary of every active shipment's (re-chosen) route counts one crossing; endpoints earn nothing.
Centrality is an EWMA of min(crossings, 6)/6; toll = min(1.0, centrality) in median-hop units, added to the route cost
of anyone passing through (not risk-discounted), so a greedy hub diverts traffic to a toll-free detour. The prosperity
lift is 0.3 × the positive part of (centrality × toll − 0.35 × centrality), so a marginal hub earns nothing; a wartime
premium (0.3 × centrality, ≤ 0.2) feeds the embattlement ramp below its 0.55 entry threshold; centrality ≥ 0.5 held for 8
ticks founds the next of Warehouse, Customs House, Carriers' Guild, one per tick [OBSERVED re-checked
`sp/entrepots.js:63-116`; `sp/entrepots.js:175-300`; `wp/entrepotKernel.js:44-127`]. The toll takes no goods and moves no
coin; "no actor owns the income" [STATED TRADE §2].

### 5.8 M7 — smuggling and contraband

At arrival the route's worst gate is ranked hostile > contraband > toll, then by danger. Only a hostile or contraband
gate triggers the one roll; detected at a hostile gate → **seizure** (the gate loots floor(load × (1 − conscience) ×
0.85) into its own stock, conserved); detected at a contraband gate → **confiscation** (all lost); undetected →
delivered [OBSERVED re-checked `sp/commodityFlow.js:576-636`; `sp/smuggle.js:258-262`, `:287-320`]. The roll applies to
*every* M6a caravan crossing such a gate, legal or not. Contraband is relational: a category is banned by the gate's own
law or alignment, or by its plain culture distance from the origin. The rule's signature accepts a trade-tie term that
would close the distance, but its only caller never passes it, so the term is always 0 [OBSERVED re-checked
`sp/smuggle.js:87-98`, `:150-178`; `wp/supplyKernel.js:753-756`]. The criminal channel also runs links a legal caravan refused
(the EV spill) or whose every legal route is blocked (the besieged trickle), when the need premium × (0.5 + 0.5 ×
network) reaches 0.35 with network ≥ 0.15 and boldness > 0.3; network = the stronger thieves' guild of the two
endpoints plus an underways bonus [OBSERVED `sp/smuggle.js:335-343`; `sp/commodityFlow.js:756-772`;
`wp/supplyKernel.js:743-782`]. Smuggle runs feed the criminal rumour carrier only where the rumour ledgers run, and
those stay dormant without a digest or under an omniscient infoMode [OBSERVED re-checked `wp/pulseKernel.js:2069-2105`;
`sp/rumorNetwork.js:552-554`]. Of the two M6a presets, FS (infoMode full) lights the carrier and RR applied (omniscient,
`wp/simulationRules.js:56`) does not. The corruption-web coupling was not re-checked.

### 5.9 Movement that is netted or teleported, not routed

- **Food** — the coverage rate (§3.8). **Treaty streams** — tribute, reparations, restitution, resource share as
  conserved grain-month arithmetic [STATED TRADE §2].
- **Generosity** — a needy receiver (food need ≥ 0.5, or a live obligation) over an allied, trade-partner, vassal,
  patron or client edge with bond ≥ 0.2; the giver's EV weighs bond, history, conscience, strategy, faith, a 13-week
  margin, commitment and belief-mediated route risk; a gift moves storage months instantly with 0.9 capture and mints
  an obligation; a refused gift can fall through to a **purchase** paid in prosperity band-steps; credit matures to
  repayment or default; refuge postures steer migrants; a sustained gift stream adds a +0.04 trust nudge that lets the
  existing neutral → trade_partner rule fire [OBSERVED seat C, `wp/generosityKernel.js:488-1187`]. The route-risk term
  is computed with "hostile gate on route" fixed false and no caravan travels; the travelling-relief refinement is
  deferred [OBSERVED re-checked `wp/generosityKernel.js:109`, `:691`; `sp/generosityEV.js:325-329`].
- **The trade-scarcity cascade** — a supplier in crisis (a route cut, export-market, famine, import-shortage or
  food-anchor condition, or trade connectivity below 35) sends each confirmed dependent a regional_import_shortage
  candidate, severity 0.4 + 0.3 × strength, probability ≤ 0.4, a DM proposal at ≥ 0.62 [OBSERVED `wp/flows.js:124-166`;
  re-checked `wp/candidateEvents.js:600-605`]. WY's law forbids binding the caravan layer to it: a signal, not a flow
  [STATED WY:423-427].

### 5.10 The trade war and trade salience

Each (buyer, imported commodity) is a prize contested by confirmed channels into the buyer whose supplier exports the
good with supply completeness ≥ 0.2 (at least two); score = completeness × economic strength × diplomatic standing,
+0.15 for an allied, patron or vassal supplier, × the conscience-embargo multiplier. An overlord compels its vassal
(vassal_trade_coercion, re-emitted every 6 ticks); otherwise a seeded contest with a 6-tick flip cooldown. A flip mints a
winner → buyer trade_dependency at 0.55 + 0.35 × score and re-mints the defeated supplier's trade_dependency (same
one-commodity goods set) at the winner's new strength − 0.2, whatever its own prior strength
(`wp/tradeWar.js:592-611`). It records disposition, and the
loser escalates (hostility + a war intent for the one opener) if its strength ≥ 0.5 and a roll succeeds, otherwise a
market_shock wind-down [OBSERVED `wp/tradeWar.js:381-726`]. **No distance is read and no caravan changes**: the
caravan's origin stays the nearest producer whoever wins. Trade salience rates each tie (need, irreplaceability,
recency, political lift), scaled on canonized worlds by a distance weight (floor 0.35) with a "distant supplier (≈ N
weeks)" phrase, and dampens hostile candidates [OBSERVED `wp/tradeSalience.js:150-433`; `sp/distanceRead.js:851-908`].

### 5.11 Supply-web warfare

An aggressor reads the target's inbound M2 link graph (empty without a digest), fogged through its own belief; when the
time-discounted indirect EV reaches 0.4 and beats the direct EV by 0.08 it plans up to four stages (raid, occupy,
interdiction, embargo, toll war, purchase denial) against the most fragile satellites; one stage completes per tick;
the plan is abandoned when the target re-sources or the EV drops below 0.28. Strangulation feeds the
economic_strangulation peace reason; bloody stages queue atrocities; a fog-blind commander can hit the wrong village. No
goods are severed: its embargo and toll war touch neither commodity flow nor entrepôt tolls [OBSERVED
`wp/supplyWebWarfare.js:1-80`, `:307-504`, `:664-790`; STATED SWW:73-80]. DM verbs: ORDER_SUPPLY_RAID and
DECLARE_TRADE_EMBARGO.

### 5.12 Built dark and designed movers

- **TR-3 believed markets** (`believedMarketsEnabled`, lit nowhere): a permutation of the dispatch order by believed
  dearness, then true need, then id; never a new caravan; "wrong market" arrivals returned and dropped [OBSERVED
  `sp/dispatchDestination.js:85-253`]. Its governed news kind, the wrong-market arrival, has a registry row, a picker
  and a projector (`wp/marketNews.js`, 184 lines), and its prose corpus is `wp/marketReceiptPools.js` (66). Both are
  equally dark, since `believedMarketsEnabled` is set true in no preset [OBSERVED re-checked headers; grep].
- **IN-0d, the secrecy trade tax** (`wp/secrecyTradeFactor.js`, 216): a pure banded multiplier for how far a HIDE
  secrecy posture closes a settlement's market. It has zero consumers in `src/` by design until FP-TRADE wires it, and a
  test pins that zero (header :1-25) [STATED].
- **TR-1 casus commercii** (writer unmounted) and **TR-2 merchant houses** (no pulse mount) [STATED FOLD:340].
- **J route lifecycle** — the lived network with grades highway / road / track / hidden; 'caravan' is a declared
  traveller kind but caravans route on the frozen digest, and nothing writes the network (genesis and flow accrual have
  no caller) [OBSERVED `wp/routeNetworkConsumers.js:76-132`; `wp/routeNetworkFlows.js:60-140`].
- **Information brokerage** (dark), **the sovereignty market** (dark; its reach reads the unwritten lived network)
  [OBSERVED `wp/brokerageStamps.js:400-409`; `wp/sovereigntyReach.js:1-37`, `:182-202`].
- **Designed only**: grain caravans (TR-4 / EC-12), stance-gated caravans and tariffs (EC-6), speculative push caravans
  toward believed-dear markets (EC-18), ventures (EC-14), the travelling factor (EC-15), positioned caravans with a path
  and a departure tick (WY-3), army supply cargo (WY-8a F9) [STATED EC:544-596; FOLD:340, :344, :346].

### 5.13 Named merchants on the road, and the DM's route verbs

- **THE ROADS trade mission: the one positioned trade traveller.** On a seeded yearly cadence a court may send a named
  NPC on a borrowed purpose. An NPC whose category reads economic, merchant or trade takes the 'trade' purpose when a
  destination within MAX_JOURNEY_HOPS = 2 trade-graph hops is also a *direct* confirmed trade-channel neighbour
  (export_market, trade_dependency or trade_route) [OBSERVED `wp/roadsKernel.js:103`, `:123-140`, `:889`,
  `:953-976`; `src/domain/roads/state.js:239`; `sp/rumorNetwork.js:106-108`]. The trip is routed by the caravan layer's
  own `chooseRoute` on the digest, over the court's believed view. It is refused when the believed danger exceeds the
  NPC's risk tolerance × 2.0. Otherwise it becomes a mission with a frozen settlement path, an outbound leg and a stay
  in weeks, and a return. Its current node is interpolated along the path [OBSERVED `wp/roadsKernel.js:183-206`,
  `:1005-1030`; `src/domain/roads/state.js:246`, `:253`; `wp/namedPersonTransit.js:1-20`, `:171-201`]. Hazards,
  capture and ransom follow (slices R-3 and R-4). The mission carries no goods and touches no stock, link or price. A
  besieged, occupied or mobilizing court sends no routine mission (`wp/roadsKernel.js:108-121`). Gate:
  `roadsEnabled` (ONE_REGEN, spread into RR, DC, LR and FS at `wp/simulationRules.js:742-752`, `:901`, `:963`,
  `:1008`, `:1221`) plus an active digest (`wp/roadsKernel.js:340-351`). So it is lit on canon in RR applied, DC, LR
  and FS, and not in QL, NC, SC or RR born. A trade lens can draw these merchants at a path node, at hop resolution.
- **DM "cut trade route"** (`src/domain/events/mutateWorld.js:419-440`). The event appends to `config._cutRoutes`
  (mirrored to `_config`) and stamps a trade_route_cut active condition. Regional propagation reads both
  (`rg/deriveRegionalState.js:138-149`), and the trade-scarcity cascade treats the condition as a crisis
  (`wp/flows.js:47`). **The caravan layer reads neither**: no file under `sp/` and neither `wp/supplyKernel.js` nor
  `wp/supplyWebWarfare.js` mentions them, so a DM-cut route stops no M2 or M6a caravan [OBSERVED re-checked grep].
  The verb is lit wherever the DM can raise the event.
- **DM user routes** (CREATE_ROUTE; the store verb `store/userRouteCharter.js`, 147 lines). In the canon phase the DM
  charters an edge between two owned settlements. Its cost band is read from the frozen digest's distance matrix, and
  its mode is water if the frozen sea-lane set already connects the pair, else land (`src/domain/roads/userRoutes.js:1-30`).
  The write (`src/domain/events/mutateUserRoute.js`, 218) records a `config._userRoutes` row and appends a *neutral*
  neighbourNetwork entry to both endpoints; undo removes both (`src/domain/events/undoEvent.js:424-447`). Channel
  discovery reads the neighbour network for a pair's relationship (`rg/discoverDependencyCandidates.js:37-70`), and a
  known relationship counts as trade evidence (`:381-390`). So a chartered pair whose routes are both open gets a
  suggested trade_route channel pair (strength 0.45) even without overlapping goods [OBSERVED pieces; INFERRED
  combined effect]. The route does **not** reach generation's trade links, whose bound neighbour comes from
  `config._importedNeighbor` (`gen/steps/resolveNeighbour.js:35-39`), and it does not reach caravan routing, which
  reads digest gates only. The lived-network genesis that would read `_userRoutes` is dark (§5.12).

---

## 6. Couplings with the rest of the simulator

**Into trade.** Institutions (chains, services, income, dependencies; a ruined institution still counts through the
stamped flags); resources and depletion; factions × culture (demand imports; merchant strength raises appetite;
criminal strength sets the smuggle network); stresses (generation only); the magic dial (chains, substitution, the
teleport and airship rates, routing edges); world law (port duties versus river tolls); the bound neighbour; war fronts
and occupations (severance, interception, vassal must-go); siege and occupation *stressors* (the food-import cut);
embattlement (route danger, banditry); naval transit (blockade); DM route verbs (cuts into propagation, charters into
discovery; §5.13); belief maps (dispatch deterrent, web-war fog, believed markets); settlement alignment (caution, boldness,
conscience, the seizure take, contraband); culture vectors (contraband); clandestine underways (smuggle reach); the
frozen digest; the calendar [OBSERVED seats A–C].

**Out of trade.**
- **War**: `supply_starved` and the interdiction share weaken a besieged hold (M2b, `wp/warDeployment.js:558`); the
  entrepôt premium makes a rich hub the first target; trade-war losers deposit war intents; salience restrains
  hostility; supply-web warfare feeds a peace reason and moral drift. W-C1: the generation supply completeness over the
  war-kit commodities scales deployed army quality (`wp/supplyQuality.js`, 75 lines; `warSupplyQualityEnabled`, lit
  only in FS, `wp/simulationRules.js:1025`). W-C2: the mercenary market reads supply completeness and debits economy
  health while hired forces are engaged (`wp/mercenaryMarket.js`, 261; runs under `warLayerEnabled`, or while a `mercenaryMarket` ledger persists after War is switched off, `wp/pulseKernel.js:1783`; the debit is at `wp/institutionLifecycle.js:697`). Neither reads geometry. A naval
  blockade's commerce strangulation (`sp/navalLayer.js:539-543`) feeds the economic_strangulation peace reason
  (`wp/peaceReasons.js:555-566`) and the naval display (`disp/navalDisplay.js:49`), although its own header still
  calls that wire a seam [OBSERVED re-checked].
- **Prosperity and institutions**: booms and busts; the toll lift into institution-lifecycle health
  (`wp/institutionLifecycle.js:698`); transshipment foundings written to the roster; the purchase debit.
- **Plague and the urban fabric**: both read the throughput tally, so trade spreads plague and grows the "foreign"
  quarter [STATED EC S39].
- **Information**: rumours hop over confirmed trade edges; smuggle runs light the criminal carrier (only where the
  rumour ledgers run: canon and a non-omniscient infoMode, so FS but not RR applied; §5.8); generosity nudges
  observers' beliefs; believed scarcity (SP-B, from generation lists, not stocks) feeds the pact trade_demand trigger in
  DC, LR and FS [OBSERVED `wp/pactTriggers.js:185-216`; STATED EC:389 S25].
- **Relationships**: trade_partner drift; the overture's trust nudge; disposition banked by flips.
- **Faith**: a trade_partner *relationship* is a faith carrier at 0.45 both ways; the trade *channels* are not
  [STATED `research/sf/faith-system.md` §6.2]. Faith-weighted contraband (culture distance at arrival gates), faith in
  the generosity EV, and tolerance drift toward trade partners are the other three faith ↔ trade reads (faith §7.4,
  §7.10).
- **Migration**: refugee columns ride the same embattlement × season road danger; refuge postures steer them.
- **Treaties**: the trade-rights rows exclusivity, market_access and toll_exemption are catalogued with executor
  "seam" and no producer [STATED EC:1321-1328].

**Missing links** [OBSERVED]: trade-war state and channels do not choose caravan origins; web-war embargo and toll war
touch nothing physical; the lived network's shipment accrual is unmounted; caravan arrivals, starvations, "emboldened"
receipts and entrepôt foundings are computed and dropped, never news (`wp/pulseKernel.js:855`, `:866-876`;
`wp/supplyKernel.js:600-605`).

---

## 7. STATUS — by mechanism and preset (checked in `wp/simulationRules.js` at `81f1cd96`)

✓ = runs; – = does not; **c** = runs only on a canonized realm; **W** = only if a premium DM lights War (needs drift);
**t** = a DM can switch the key on in the Simulation Rules dialog's engine-wave toggles
(`map/SimulationRulesAxes.jsx:368-378`). Preset bodies re-checked at `wp/simulationRules.js:705-1223`.
`commodityFlowEnabled` has no toggle anywhere; it comes only from RR or FS.

| Mechanism | Gate in code | QL | RR born | RR applied | DC | SC | NC | LR | FS | Class |
|---|---|---|---|---|---|---|---|---|---|---|
| Generation economy (chains, lists, services, income, food rate, prosperity label) | none | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | LIT (generation) |
| Neighbour trade links / bias | a bound neighbour | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | LIT |
| Channel discovery + DM confirmation | none | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | LIT |
| Trade relationship drift | `relationshipDynamicsEnabled` | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | LIT in 6 |
| Trade-scarcity cascade | `tradeFlowsEnabled` ∧ propagation ∉ {off, local} (`wp/candidateEvents.js:600-605`) | – | ✓ | ✓ | ✓ | – | – | ✓ | ✓ | LIT in 4 (+ RR born) |
| Regional waves on trade channels | propagation depth (`wp/simulationRules.js:1578-1585`) | – | 1 | 1 | 2 | – | – | 1 | 2 | LIT in 4 |
| Exports re-diffed on depletion | `resourceDriftEnabled` | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | LIT in 6 |
| … on discovery / prospecting | `resourceDynamicsEnabled` (WAVES) | t | t | ✓ | ✓ | t | t | ✓ | ✓ | LIT in 4 |
| Calamity prune of chains and exports | `disastersEnabled` (virtual) | – | – | ✓ | ✓ | – | – | – | ✓ | LIT in 3 |
| Food coverage rate | none | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | LIT |
| Food-import cut and airship-dock impairment by a siege or occupation *stressor* ≥ 0.4 | stressor births: `stressorsEnabled` (`wp/simulationRules.js:66`, `:968`); read every tick (`wp/pulseKernel.js:599`, `:649`) | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | LIT in 6 (all but SC) |
| Seasonal food year | `seasonsEnabled` | – | – | – | ✓ | – | – | ✓ | ✓ | LIT in 3 |
| M2 caravans, starvation, M2b | canon ∧ ¬`commodityFlowEnabled` (call site ungated, `wp/pulseKernel.js:843`) | c | c | – | c | c | c | c | – | LIT on canon (5 + RR born) |
| M6a commodity continuity | canon ∧ `commodityFlowEnabled` (`sp/commodityFlow.js:172-177`) | – | – | c | – | – | – | – | c | LIT on canon in 2 |
| M6b entrepôts, tolls, foundings | as M6a (`sp/entrepots.js:144-146`) | – | – | c | – | – | – | – | c | LIT on canon in 2 |
| M6c dispatch EV (belief-read only where beliefs are active) | as M6a; belief: canon ∧ infoMode ≠ omniscient | – | – | c (truth) | – | – | – | – | c (belief) | LIT on canon in 2 |
| M7 smuggling, contraband, seizure | as M6a | – | – | c | – | – | – | – | c | LIT on canon in 2 |
| Smuggle runs → criminal rumour carrier | as M7 ∧ infoMode ≠ omniscient (`sp/rumorNetwork.js:552-554`) | – | – | – | – | – | – | – | c | LIT on canon in FS only |
| M6d throughput tally; Economy drift | as M6a | – | – | c | – | – | – | – | c | LIT on canon in 2 |
| Boom / bust from trade | `upswingArcsEnabled` (WAVES) ∧ the tally | – | – | c | – | – | – | – | c | LIT on canon in 2 |
| Winter roads; storms | digest overlay (new canons) | c | c | c | c | c | c | c | c | LIT on canon |
| Sea-lane and teleport routing | digest slots (≥ 2 eligible ports / circle holders) | c | c | c | c | c | c | c | c | LIT on canon |
| Embattlement route danger, banditry | canon; starts from a war-front siege, a contested or unstable occupation under weak security, or war exhaustion with crime or the premium (§10, item 40) | c+W | c+W | c+W | c | c+W | c+W | c+W | c | effectively War |
| Interception at gates at war; besieged sources | war fronts | c+W | c+W | c+W | c | c+W | c+W | c+W | c | effectively War |
| Naval blockade cutting supply; its strangulation into the peace reason | `navalEnabled` (WAVES) ∧ war ∧ canon | t | t | c+W | c | t | t | c+W | c | LIT on canon in 2 |
| Roads trade missions (named merchants) | `roadsEnabled` (ONE_REGEN) ∧ digest (`wp/roadsKernel.js:340-351`) | – | – | c | c | – | – | c | c | LIT on canon in 4 |
| DM cut trade route (propagation, cascade; not caravans) | DM verb | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | LIT (DM verb) |
| DM user routes (neutral neighbour link → discovery) | DM verb; canon phase ∧ digest | c | c | c | c | c | c | c | c | LIT on canon (DM verb) |
| W-C1 war supply quality | `warSupplyQualityEnabled` (`wp/simulationRules.js:1025`) | – | – | – | – | – | – | – | ✓ | LIT in FS |
| W-C2 mercenary market (reads supply completeness) | `warLayerEnabled`, or a persisting `mercenaryMarket` ledger (`wp/pulseKernel.js:1783`) | W | W | W | ✓ | W* | W | W | ✓ | LIT in 2 |
| Vassal must-go | M6a ∧ an occupation | – | – | c+W | – | – | – | – | c | as M6a + War |
| Trade war | `warLayerEnabled` (`wp/pulseKernel.js:1014`; `wp/tradeWar.js:327`) | W | W | W | ✓ | W* | W | W | ✓ | LIT in 2 |
| Trade salience and its statuses | `warLayerEnabled` (`wp/pulseKernel.js:1520`) | W | W | W | ✓ | W* | W | W | ✓ | LIT in 2 |
| Supply-web warfare | War ∧ `supplyWebWarfareEnabled` (WAVES) ∧ digest | W+t | W+t | c+W | c | W+t | W+t | c+W | c | LIT on canon in 2 |
| Generosity: relief, credit, purchase, refuge, overture | `constructiveFlowsEnabled` (WAVES) (`sp/generosityEV.js:935-938`) | t | t | ✓ | ✓ | t | t | ✓ | ✓ | LIT in 4 |
| Generosity belief nudge | + beliefs active | – | – | – | c | – | – | c | c | LIT on canon in 3 |
| Believed scarcity → pact trade_demand | FP_LIT_BELIEF ∧ pact ∧ beliefs active | – | – | – | c | – | – | c | c | LIT on canon in 3 |
| TR-1 casus commercii | `casusCommerciiEnabled`; writer unmounted | – | – | – | – | – | – | – | – | BUILT DARK |
| TR-2 merchant houses | `merchantHousesEnabled`; no mount | – | – | – | – | – | – | – | – | BUILT DARK |
| TR-3 believed markets (+ its news kind, `wp/marketNews.js`) | `believedMarketsEnabled` | – | – | – | – | – | – | – | – | BUILT DARK |
| IN-0d secrecy trade tax | zero consumers by design (`wp/secrecyTradeFactor.js:1-25`) | – | – | – | – | – | – | – | – | BUILT DARK |
| TR-9 convergence contract | no collectors | – | – | – | – | – | – | – | – | BUILT DARK |
| J route lifecycle (lived network) | `routeLifecycleEnabled` (FS false) + genesis uncalled | – | – | – | – | – | – | – | – | BUILT DARK |
| K4 magic economy | `magicEconomyEnabled` (FS false) | – | – | – | – | – | – | – | – | BUILT DARK |
| W-COIN treasury tolls | `treasuryEnabled` | – | – | – | – | – | – | – | – | BUILT DARK |
| Information brokerage | `informationBrokeragesEnabled` ∧ `infoStatecraftEnabled` | – | – | – | – | – | – | – | – | BUILT DARK |
| Sovereignty market | `sovereigntyTradeEnabled` ∧ demographics ∧ envoys | – | – | – | – | – | – | – | – | BUILT DARK |
| EC-0…EC-18; TR-4…TR-8; WY-3; WY-8a F9 | flags with no gate read / no module | – | – | – | – | – | – | – | – | DESIGNED ONLY |
| Host map: trade channels, trade_partner edges | channel visibility | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | LIT |
| Host map: trade-war prize diamond | live trade wars | W | W | W | ✓ | W* | W | W | ✓ | LIT in 2 |
| Host map: "Supply chains" layer | Cartographer tier | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | LIT (premium tier) |

W* = SC has Relationship drift off, so War needs the DM to turn drift on first. Sources: the preset bodies
(`wp/simulationRules.js:863-1223`), WAVES (`:720-730`), ONE_REGEN (`:742-752`), FP_LIT (`:789-803`), the
Living-World gate (`LivingWorldGates.jsx:55-76`), and each gate cited in the row. The FP status of record agrees for
the FP rows (FOLD:340, TR "LIT —"); it is silent on the Phase 5.5 rows, which are lit (§10, item 3).

---

## 8. MAP TOUCHPOINTS

### 8.1 What the host's maps show about trade today [OBSERVED re-checked]

- **Regional causality layer**: confirmed (and, with the GM toggle, gm) regional channels as straight lines between
  placement points — trade_dependency teal, export_market gold, trade_route blue — with a channel-type filter and
  impact rings at targets (`lib/regionalMapOverlay.js:3-19`, `:41-113`).
- **Relationship edges**: a trade_partner style (`map/relationshipEdgeStyle.js:22`, `:45`).
- **"Supply chains" layer** (Cartographer tier; `map/LayersPanel.jsx:52-59`, `:164-173`): pairwise straight lines
  between placed saves from its **own six-row table** (iron, grain, timber, textile, stone, luxury): an edge A → B when
  A's resource list holds a listed raw resource and B's roster holds a listed consumer institution
  (`lib/supplyChains.js:11-60`, `:91-150`; `lib/computeMapChains.js:1-69`). It reads neither exports, imports, the goods
  catalog nor the caravans, and it draws a grain chain though grain never ships.
- **War & faith overlay**: a public-tier trade-war prize diamond on the contested buyer
  (`map/WarFaithMapOverlay.jsx:11-20`, `:126-131`, `:216-222`).
- **Territory layer**: the digest's territory dots by tier [STATED faith-system.md §9.1]. **Roads**: polylines computed
  in the FMG iframe per session, never persisted, never read by caravans [STATED fp-physical-integration.md R1].
- **Absent**: no caravan, shipment, entrepôt, toll, stock band, throughput, starvation, smuggle or supply-web layer;
  only telemetry and the Economy tab read those ledgers [OBSERVED seat C grep of `src/components`].
- **Beside the map**: the Economy tab (income mix, exports with a blue transit note, imports, chains, the M6d drift,
  market movement phrases), the Supply Chains panel, the Services tab, the PDF trade section, the Realm dashboard.

### 8.2 The town map

Transshipment institutions (Warehouse, Customs House, Carriers' Guild) enter the roster with a built reason and so
appear as town buildings; `supply_starved` sits on an institution; the arterial-seed seam that would give town roads a
trade orientation from the lived network is dark (`wp/routeNetworkConsumers.js:478-522`; STATED
fp-physical-integration.md R8). Transport-bucket services (caravan assembly, route intelligence, freight haulage, toll
bridge crossing fee) are the dossier's caravan and toll texture.

### 8.3 Every place trade reads geometry

| Reader | Geometry | When |
|---|---|---|
| Generation economy, food rate, prosperity, capacity, income | the route class, terrain, nearby resources (config strings; "genesis is sacred") | always |
| Supply links (M2, M6a) | frozen `distanceMatrix` / path cost to rank K = 3 producers; `isMapped` | canon |
| Route choice | digest gates (territory adjacency), k = 3 candidates, sea lanes for port trips, teleport edges, seasonal overlay, live embattlement, entrepôt tolls | canon |
| Arrival time | route weeks from the median-hop calibration (normalized; `kmScale` unwritten) | canon |
| Interception and blockade | gates at war (per settlement), sea approaches of a blockaded port | canon + War |
| Entrepôt centrality | the intermediaries of re-chosen routes | RR applied, FS + canon |
| Contraband | culture distance gate ↔ origin (culture vectors, not geometry) | as M6a |
| Trade salience | distance weight (floor 0.35) and a weeks phrase | War + canon |
| Supply-web warfare | the M2 link graph and satellite route cost | War + canon |
| Tally modality | the roster and route class (its own "port" test) | as M6a |
| Roads trade missions | digest route (`chooseRoute` over the believed view), leg weeks, the road season; a frozen settlement path with a node position | RR applied, DC, LR, FS + canon |
| DM user routes | the digest's distance matrix (a reach band) and the sea-lane set (land or water mode) | canon phase + digest |
| Food-import cut | none (membership in a siege or occupation stressor) | all but SC |
| Discovery, cascade, trade war, generosity, DM route cuts | **none** (discovery reads a chartered pair's neutral neighbour link, not its geometry) | — |

### 8.4 What a map-side trade lens needs from the host (read-only facts)

| Fact | Where | Audience |
|---|---|---|
| Whether anything moves: canon marker, resolved `commodityFlowEnabled`, War, WAVES keys | `worldState.spatialCanonVersion`, `worldState.simulationRules` | — (the lens reads resolved rules, never the preset id) |
| Production, consumption, exports, imports, services, dependencies, income mix, food rate, prosperity | `economicState` | public in the dossier; criminal income flagged |
| Goods identity, category, criticality, shippable | the catalog (`rg/goodsCatalog.js`) | — |
| Channels (type, direction, strength, status, goods, visibility) | `regionalGraph.channels` | per channel visibility; criminal_corridor GM by default (`rg/graph.js:93-97`) |
| Supply links and active sources | `supplyShipments` + the ranked sources re-derived from the digest | DM truth in spirit [INFERRED] |
| Stocks and bands; throughput | `commodityStocks`, `tradeFlow` | own-settlement bands public [STATED EC:671 for the designed veil] |
| Entrepôt centrality, toll, foundings | `entrepots`; roster built reason | public facts once founded |
| Danger | `embattlement` | — |
| Trade-war prizes | `tradeWarState` | public tier |
| Supply-web plans | `campaignPlans` | DM only |
| Relief, credit, refuge, overture | generosity ledgers and receipts | news receipts are public |
| Geometry | the frozen digest (territory, gates, matrix, overlays, ports, teleport edges) and the calibration derived from it at read | — |

### 8.5 What a lens could add without inventing host facts [INFERRED]

1. **Per-settlement production and need glyphs** by *normalized* catalog id and category, with *shippable*, *food
   (never shipped)* and *service (never moves)* visibly different. The alchemy and planar service exports belong under
   shippable goods, because that is how the host indexes them (§3.4). Add chain health by need group and the food
   coverage share as a ring, with the stressor cut marked separately from the war-front siege (§2.4).
2. **Supply links**: consumer ← its ranked sources, the active one emphasised, with the arrival tick as an ETA. A path
   can be re-derived honestly by running the host's own route choice on the same digest, ledgers and season, labelled
   "re-derived route" (the host itself re-chooses at arrival). No mid-road position.
3. **Entrepôt heat**: centrality, toll and founded transshipment institutions per gate settlement; the realm Gini as a
   legend figure.
4. **Bands and throughput**: shortage / adequate / surplus per good; quiet / trickle / steady / busy; boom or bust.
5. **Gate markers** (DM): the worst gate kind per active link (hostile, contraband), seizures and confiscations.
6. **Channel web** (public / gm) clearly styled as *relations*, not shipments; relief and overture arcs as relational
   and instant.
7. **Trade-war primacy** arrows and the existing prize diamond; supply-web stages (DM).
8. **Seasonal slowdown**: the same link's ETA under the current season's overlay.
9. **A time scrub** from map-side per-pulse snapshots of these ledgers (§9, item 15).
10. **Named merchants on the road**: Roads trade missions at their current path node, with home, destination and leg
    (§5.13). This is the only trade traveller with a host position. Its audience is unverified; the mission ledger is
    `spatialLedgers.roads`, mirrored onto the NPC's whereabouts.

What a lens must **not** do: place caravans on roads (named merchants on Roads missions are the exception); draw food or
catalog-service flows; draw regional channels as goods movement; draw the DM's created routes or the iframe's road
polylines as caravan roads (caravans route on the digest's gates); draw a DM-cut route as stopping caravans; show smuggle runs, seizures, contraband gates, supply-web plans or gm channels to players; show movement in a
campaign where the resolved rules or the missing canon make it inert.

---

## 9. How this changes the map module's current readings

**Territory (J377, J378, J382).**

1. **The caravan graph is the host's territory adjacency, and it has no wild land.** The host's gates are the cheapest
   crossings between nearest-settlement-by-cost territories frozen at canonize, and every reachable cell belongs to some
   settlement (§5.2). The map's W8 territory was, when this note was written, a *budgeted* flood with unclaimed land, contested marches and vassal realms (`docs/volumes/V13-world.md` §3.9). [SUPERSEDED BY EVENT 2026-10-17 (`docs/AMENDMENTS-2026-10-17m.md`, J-V13.63): V13 §3.9 now makes exactly the two products this item proposes — W8a, the unbudgeted nearest-seat partition the host's crossings ride, and W8b, the sway (no budget; unclaimed land, debatable marches, the vassal chain); budgets and cost vectors are retired; `research/sf/fp-physical-integration.md` row A1 still named the retired budgeted flood.] If W8's territory were ever supplied as the host's territory (the planned
   source in fp-physical-integration.md row A1), two settlements separated by unclaimed land would lose their gate and
   the caravan graph could fragment. **Proposal**: the port supplies two products and never one for the other — a
   *routing partition* (unbudgeted, nearest by cost, the host's A1/A2 semantics) from which the host derives gates, and
   the *political territory* (W8) as a lens and as host facts about rule. Otherwise the host's gate derivation would
   have to treat wild cells as passable non-gates — a host change. [INFERRED]
2. **Gates are per settlement, not per realm.** Interception, contraband and tolls are decided at the individual
   intermediary settlement (its war fronts, its alignment and culture, its centrality). A territory lens that paints a
   vassal's land in the overlord's colour must still label gate settlements individually, or the lens shows a realm
   chokepoint where the host decides by a vassal. [INFERRED from §5.5–§5.8]
3. **Contested marches have no trade analogue.** No host mechanism treats a contested border as a road hazard; route
   danger is embattlement *at settlements* (war-front siege 0.85, occupation 0.75 × its state, war exhaustion 0.45, crime
   0.3, minus security), not along borders. The embattled-march overlay of J378 must not imply caravan danger unless the host adopts a term.
4. **Patrols have one nearby host slot, and it is weak.** Caravan routing has no patrol term. The embattlement ramp's
   security relief (0.4 × security, capped at 0.25, never enough to cancel a siege) is fed today from one minus the
   defense pressure score. Without a war-front siege, an occupation or war exhaustion the ramp cannot pass its 0.55
   entry (crime 0.3 plus the entrepôt premium 0.2 at most), and a calm level only decays. So **in a realm whose graph
   has never held a live war front, route danger is zero and patrols would have nothing to reduce** [OBSERVED
   re-checked `sp/embattlement.js:66-98`, `:115-119`, `:196-206`, `:239-247`; `wp/pulseKernel.js:2365-2394`]. Where
   War runs, security can decide entry for a contested occupation (out at security ≥ 0.5) or for exhaustion with crime
   or the premium, but never for a war-front siege (§10, item 40). Designed slots: TR-1's route_wardenship / route_predation pairs (registered, no
   producer) and EC-6's route_wardenship stance term (unowned, OD-FC-2). J378's "patrol coverage per route segment,
   consumed only by the host's choice" should be offered as a candidate producer for those slots or as a security
   input, with the segment keyed to the host's *gates*, not to map road polylines.
5. **Travel time from seats must be the host's week.** Use the host's calibration (median adjacent hop = 1 week,
   1..52, season multipliers from the frozen overlay), or km ÷ mode speed once `kmScale` is written (OD-FC-22); a lens
   with its own travel-time law will disagree with every caravan's arrival and with salience's "≈ N weeks".
6. **Prosperity as a strength input moves with trade** on canonized RR-applied and FS realms (boom +0.14 per tick,
   bust −0.9), and at generation it is mostly the route class. The entrepôt toll lift does not move prosperity: it
   raises the economy health that institution foundings and closures read (`wp/institutionLifecycle.js:693-701`). A
   strength projection will therefore swell at busy throughput hubs on booms (the boom test includes centrality ≥ 0.3)
   and shrink on busts, but it should not expect a toll-driven swell; J377's "borders move only on dated events with hysteresis"
   should key on the host's boom and bust records (which carry their own hysteresis: enter at throughput 3.0 with centrality 0.3 after a 3-tick dwell that survives dips to 1.5; leave only by a bust below 1.0 or on embattlement [Fable-reviewed 2026-10-18: 1.5 is the building-phase floor, not a boom exit; `wp/upswingKernel.js:644-653`]), not on each band-step. [SUPERSEDED BY EVENT 2026-10-17 (J384 (1), J-V13.65): V13 §3.9 (7) reads the seat's prosperity rung relative to the realm median, held with a 13-week dwell at dated revisions; the boom and bust records themselves are not read — a boom reaches the sway only as the rungs it moves.]
7. **Sea carriage (J382b): for trade the host's sea lanes are lit by data, not by a flag.** Caravans use the digest's
   sea-lane slot wherever a new canon found at least two eligible ports (geography ∧ a maritime institution), in every
   preset; the "Sea lanes" toggle (`navalEnabled`) governs naval war and blockade only [OBSERVED re-checked
   `sp/distanceRead.js:280-312`, `:940-1006`; `map/SimulationRulesAxes.jsx:370`]. And only trips with a port endpoint
   use water. J382's "only where sea lanes are lit" should read "where the frozen digest carries a sea-lane slot", and
   the coastal footholds should anchor on the digest's eligible ports — the set caravans use.
8. **Culture resistance (J382a): the sway reads the plain culture distance by J384 (2), not because the host lacks a trade-closed read.** The host's culture distance takes a relationship-label trade tie (trade_partner 1, allied 0.7, vassal/patron 0.6; `wp/migrationKernel.js:197`; `src/domain/rulingPowerSeat.js:178`). Contraband never passes it, so live contraband reads the plain distance [OBSERVED re-checked `sp/smuggle.js:164-177`; `wp/supplyKernel.js:753-756`]; migration pull (`wp/migrationKernel.js:228-230`) and ruling-seat closeness (`src/domain/rulingPowerSeat.js:361-370`, called at `:673`) read the trade-closed distance. V13 §3.9 (6)'s culture term (the former `foreignCulture`, retired into it by `docs/AMENDMENTS-2026-10-17m.md` item 714) reads the plain form over the whole vector (V13 §2.2 `culture`; J384 (2)) because the sway's relation classes already count the pair's label — a second count, not a run ahead of the host. [Fable-reviewed 2026-10-18: the earlier text called contraband the host's only trade reader and said a trade-adjusted form would run ahead of the host; both wrong.]

**Religion (J379; `research/sf/faith-system.md` §9.6).**

9. **Trade carries faith only as a relationship label.** trade_partner relationships are faith carriers (0.45 both
   ways); trade_dependency, export_market and trade_route channels and caravan links are not (faith §6.2). The religion
   lens's "pressure along carrier links" overlaps the trade lens on trade_partner edges only. Since the generosity
   overture (gift streams → trust nudge → neutral → trade_partner) mints trade_partner edges, relief → partnership →
   faith pressure is a cross-lens chain both lenses should be able to show from the same relationship edge.
10. **The partner flows of faith §9.5 item 8 are the trade lens's relief arcs.** Faith-weighted relief, faith-weighted
    contraband at arrival gates and tolerance drift toward trade partners are one set of host receipts; draw them once,
    filtered by lens.
11. **Pilgrim trade is a label.** "Pilgrim Trade" income and pilgrimage service exports exist; nothing moves pilgrims;
    faith §9.6 item 7 stands.

**The lens mechanism.**

12. **Resolved rules and the canon marker, never the preset id.** A plainly born campaign reads `realistic_regional` and
    carries none of RR's virtual keys; an Instant World carries them but is uncanonized. The trade lens legend must say
    which regime runs: *none* (no canon), *M2* (infinite origins, time buffers) or *M6a* (finite, conserved, tolled),
    and whether War is lit. The same rule fixes faith §9.4's last row.
13. **Links and ETAs, not positions**, for caravans until the host stores a path and departure tick (WY-3). A progress
    estimate from arrival tick minus route weeks is a guess (M6a's arrival clock is off at coarse ticks; every committed advance runs weekly ticks while the default-on `advanceMultiTick` killswitch holds, and is one coarse tick when it is off; §10, item 14 [Fable-reviewed 2026-10-18]). Named merchants on Roads missions already carry both a
    path and a leg clock (§5.13).
14. **Four link sets, four styles.** (a) generation links with the bound neighbour; (b) regional channels, suggested
    versus confirmed, by visibility; (c) physical supply links from the digest; (d) the host map's own "Supply chains"
    pairs; plus (e) trade-war primacy. They disagree by construction: channels are found without distance, caravans use
    only the three nearest producers, the chain layer reads resources × institutions. The legend must not merge them.
15. **The scrub needs snapshots.** Every trade ledger is current-state only (the tally drains in about 6 ticks,
    centrality remembers about 12), and arrivals, starvations and foundings are not news, so receipts cannot replay
    them. Snapshot per pulse on the map side.
16. **The audience filter is the lens's job.** The host projects no audience on the supply ledgers. Public: own
    settlement bands and market phrases, trade-war prizes, public channels, founded institutions. DM: supply links in
    full, smuggle runs, seizures, contraband gates, supply-web plans, gm and criminal channels. Believed versus true
    only in the belief presets on canon.
17. **The lens shows what does not move.** Food, catalog services and relief are explicit absences; a food-flow arrow
    would draw something the host does not move. The alchemy and planar service exports are not absences: the host
    ships them as goods (§3.4).
18. **Unmapped settlements are visible as such.** Foundings after the canonize have no links until a premium re-map;
    the lens marks them rather than drawing nothing.
19. **Two kinds of "besieged", two marks.** The war-front siege drives route danger, caravan severance and the Roads
    damper. The siege or occupation stressor drives the food-import cut and airship impairment, is lit in every preset
    but SC, and needs no War (§2.4, §3.8). A territory or trade lens that shows one "besieged" state would merge them.
20. **DM route verbs are relational, not physical.** A DM-cut route feeds propagation and the cascade but stops no
    caravan. A DM-chartered route adds a neutral neighbour link that discovery reads, but no caravan gate (§5.13). The
    legend should say so wherever it draws either.

---

## 10. Document-versus-code contradictions, defects and open questions

### 10.1 Documents the code has outrun

1. **Where M6a is lit.** TRADE:200's original sentence says commodity flow is lit only in FS. The same line already
   carries an in-place "[CORRECTED 2026-10-16 (coherence fold)]" bracket: lit in RR and FS, and absent from the birth
   door. That matches the code (`wp/simulationRules.js:896`, `:1081`) and EC S28 (EC:397). The stale reading survives
   only for a reader who skips the bracket [STATED re-checked TRADE:200].
2. **The default preset is not the default behaviour.** The birth door is null; a plainly born campaign carries the RR
   id without RR's virtual keys [OBSERVED re-checked `wp/simulationRules.js:31`, `:1552-1558`]. Several notes, including
   this map module's earlier ones, say "lit in RR" without the qualifier.
3. **The status line versus lit code.** FOLD:340's "TR: LIT —" is right for FP and under-states trade: M2/M6a/M6b/M6c/
   M6d/M7, generosity and the boom/bust run in lit presets on canon.
4. **"Display substrate only."** `sp/tradeFlow.js:13-18` says the tally never feeds the engine; upswing, pestilence and
   the urban fabric read it (EC S39 refutes the header).
5. **Caravans on the map.** PHASE55 §4 (:76-80) says caravans are invisible ("a map of dots is noise"); WY makes them a
   map sub-layer (WY:111-131, :734); the record cannot support positions (no path, no departure tick).
6. **Embargo as strangulation.** SWW §4 and PHASE55 §7 ("siege / blockade / embargo / interception — one model");
   in code only war fronts and blockades cut caravans; the embargo paths are modifiers; tariffs do not exist (EC
   S42-S43); web-war embargo is a recorded pressure.
7. **DM route override.** PHASE55 §2 (:54-55) promises forcing a road that bypasses gates. Caravan routing reads only
   digest gates, sea lanes and teleport edges. A DM-chartered route reaches caravans nowhere: it adds a neutral
   neighbour link that channel discovery reads, and a `_userRoutes` row for the dark J genesis. A DM-cut route likewise
   stops no caravan (§5.13).
8. **Water capacity.** PHASE55 §4j calls water "high capacity"; the sea-lane capacity is enforced for nothing but naval
   convoys; land has no capacity.
9. **"supplyShipments has no quantity"** (FOLD WC row; fp-simulator.md:413) is true of M2 records only; M6a records
   carry the load.
10. **Same-named truth reads.** TRADE T1's original sentence says truth-side scarcity derives from physical stocks; the same line already carries an in-place "[CORRECTED 2026-10-16 (coherence fold)]" bracket saying SP-B's believed scarcity reads generation data (the lists plus the frozen food ratio), never physical stocks (EC S25) [STATED re-checked TRADE:62]. As with item 1, the stale reading survives only for a reader who skips the bracket.
11. **No coin (T2)** was reversed by the owner (W-COIN, dark); the headers of `treatyTransfer.js` and `generosityEV.js`
    are stale (EC S45). The entrepôt toll has "no owner" while EC-6 designs tolls into the treasury.
12. **Food is the flagship good but never shipped**, while EC §7's dossier sentences feature salt caravans and sea-borne
    salt (sea-borne salt EC:2261; salt caravans EC:2265; salt as a traded staple EC:2310).
13. **Sovereignty, brokerage and the reputation race** are dark everywhere; FS declares the route lifecycle and
    brokerage false (`wp/simulationRules.js:1119`, `:1153`) though the fold calls FS the ceiling.

### 10.2 Defects and inconsistencies in code

14. **M6a's arrival clock** adds raw route weeks to the pulse tick (`sp/commodityFlow.js:783`), where M2 divides by the
    tick span (`sp/supplyShipments.js:389-399`) [re-checked]. The asymmetry is **latent by default**. Every committed advance runs N one-week kernel calls while the default-on `advanceMultiTick` flag holds (`lib/flagRegistry.js:88`, kept as a "soak killswitch", `lib/flags.js:77`; `wp/advanceInterval.js:97-105`; tick args `interval: 'one_week'` at `:511`), and M6a's production and draw do scale by the span (`sp/commodityFlow.js:454`, `:529`, `:674`). Two coarse kernel calls exist: the Simulation Rules dialog's uncommitted one-month preview (`map/SimulationRulesDialog.jsx:286`; `store/campaignWorldPulseDeferred.js:85-125`), a single tick in which no dispatched caravan arrives under either model [INFERRED]; and the committed single-tick advance that runs when the killswitch is off (`store/campaignAdvanceSession.js:613-614`, `:809-817`), under which an M6a caravan arrives late by a factor of the tick span (a four-week route arrives four monthly ticks on, where M2 arrives at the next). [Fable-reviewed 2026-10-18: the earlier text named one coarse call.]
15. **The fragile-link inversion.** A single-sourced critical input can never starve; two- and three-sourced links can (`sp/commodityFlow.js:927-932`; `sp/supplyShipments.js:333-335`). `STARVE_AFTER_WEEKS` (`sp/supplyShipments.js:83`; `sp/commodityFlow.js:130`) is read only as receipt text (`sp/supplyShipments.js:412`; `sp/commodityFlow.js:806`) (EC S33).
16. **The shortage band does not feed the impairment**, despite `sp/commodityFlow.js:51-56`; only total starvation
    stamps it (`wp/supplyKernel.js:532-563`).
17. **The dormant "no smuggle context" branch is unreachable**: the kernel always builds it, so under M6a a hostile gate
    never hard-cuts (`wp/supplyKernel.js:476`, `:486`).
18. **The ally-relief override** is documented (`sp/dispatchEV.js:65-68`) and never returned (`wp/supplyKernel.js:668`).
19. **Supply-web warfare reads M2 buffers** from `inputStockpiles`, which M6a never writes, so in RR and FS buffer
    thinness reads the default (`wp/supplyWebWarfare.js:340-341`; `wp/supplyKernel.js:495-497`); its veto prose names only
    DC and FS though RR and LR carry the wave once War is lit.
20. **The trade war changes nothing physical.** A flip re-points a channel; caravan origins ignore channels and the
    prize (`wp/supplyKernel.js:155-180`). Discovery proposes partners at any distance while physics ranks only the three
    nearest, so a prize can be contested by a supplier that never ships to the buyer.
21. **Relief teleports**: route risk is computed with the hostile-gate term fixed false (`wp/generosityKernel.js:691`).
22. **Two "port" tests**: the tally's (route class words or a harbour or dock in the roster; `sp/tradeFlow.js:112-140`)
    and routing's (the digest's eligible ports; `sp/distanceRead.js:299-316`).
23. **Brokerage's distance surcharge is always 0** (`delayTicks: 0` at the only `answerBrokerageQuery` call, `wp/brokerageServicesRules.js:277`; the surcharge is `DISTANCE_SURCHARGE × delayTicks`, `wp/brokerageServices.js:175`, `:210`).
24. **'caravan' is a lived-network traveller kind** but caravans route on the digest; genesis and flow accrual have no
    caller, so every lived-network consumer reads empty.
25. **The fuzzy catalog in the producer index**: bakeries index as iron producers; '(transit)' labels such as "Toll
    income (transit)" become shippable custom goods [OBSERVED seat B `probe3.mjs`]. Service export and stress-import
    labels normalize unpredictably. The alchemy and planar exports become shippable goods (alchemical_goods,
    arcane_reagents); "Medicinal herbs" becomes a service, so plague demand never ships; "Scholarly services" becomes
    financial_services (§2.2) [OBSERVED re-checked probe].
26. **Imports are never rewritten at runtime**: the resource reconcile updates chains, exports and local production but
    not imports, so a depleted mine never gains its shortage import (`wp/resourceDynamicsKernel.js:624-680`).
27. **Tier goods drawn then discarded.** The per-tier export probabilities draw RNG and gate income rows but never reach
    the export list (reset at `econ/economicState.js:802`); the tier upgrade-import pools survive only as `transit`
    (`:808`); the TradeDynamicsPanel presents them as the tier's goods.
28. **'(transit)' is unreliable**: exportable entrepôt outputs survive unsuffixed; the cap of 12 truncates transit first
    (`gen/computeActiveChains.js:744-797`).
29. **Entrepôt has three definitions** (§3.5) and **isolation three tier sets** (`econ/tradeGoods.js:54-56`;
    `gen/computeActiveChains.js:689-692`, `:806-818`; `econ/customTradeEndpointIntegration.js:100-110`).
30. **Three chain-dependency encodings disagree** (data upstream chains, the hard-coded cascade, the upstream import
    labels; EC S8; `gen/computeActiveChains.js:458-492`, `:838-852`).
31. **mountain_pass** is honoured by capacity, food coverage and connectivity but produces road-identical goods lists;
    the import-dependency table the stressor cut reads has no mountain_pass or coastal row (`gen/foodGenerator.js:182-189` against `:309-318`), so a siege or occupation stressor cuts no import share on a mountain_pass or coastal settlement [Fable-reviewed 2026-10-18].
32. **The prosperity ladder**: generation emits six labels; the runtime ladder has seven (with Subsistence); the signal
    registry calls it "the generator's 7-label ladder" (`data/constants.js:92-94`; `src/domain/autonomy/signalRegistry.js:76`).
33. **`hasSaltLocal` is inverted** (true when salt is a necessity import) and strips salt-preserved tier goods that are
    discarded anyway (`econ/tradeGoods.js:123-129`).
34. **The `requiredTradeRoute` service gate** has no data row that sets it (`gen/services/institutionServices.js:178`).
35. **`captured`** chain status is produced nowhere (`src/domain/supplyChainState.js:161-164`).
36. **Not news**: arrivals, starvations, "emboldened" receipts and entrepôt foundings are returned and dropped.
37. **The host map's "Supply chains" layer is a fourth, unrelated derivation** (six resource × consumer pairs) that
    draws a grain chain although grain never ships [OBSERVED re-checked `lib/supplyChains.js:11-60`, `:125-150`].
38. **The "Sea lanes" toggle copy** says fleets carry "war and trade" across water, but caravans use sea lanes by
    digest data regardless of `navalEnabled` [OBSERVED re-checked `map/SimulationRulesAxes.jsx:370`;
    `sp/distanceRead.js:286-292`].
39. **The slave contraband row** is the table's flagship but no catalog good has the slave category; it can fire only
    when an exporter's and an importer's slave labels slug to the same custom good that the slave pattern matches
    (`sp/smuggle.js:143-148`; `rg/goodsCatalog.js:466-476`) [INFERRED; unprobed].
40. **In peace the danger half of the stack is inert.** Entry needs a raw threat above 0.55 after security relief
    (at most 0.25) [OBSERVED re-checked `sp/embattlement.js:84-98`, `:115-119`, `:196-206`, `:237-245`].
    - A war-front siege (0.85) always clears it alone.
    - An occupation clears it alone only while contested (0.75, with security below 0.5) or unstable (about 0.64, with
      security below about 0.22). An extractive or milder occupation never does.
    - War exhaustion (0.45) clears it together with high crime (up to 0.3) or the entrepôt premium (up to 0.2), against
      weak security.
    - Crime plus the premium (at most 0.5) never does.

    The tuning comment at `:84-86` says a siege or an occupation "alone clears ENTER even against maximal security";
    the occupation weight contradicts it. All three drivers are war-layer ledgers: `besieged` means a live war front
    into the settlement, not a siege stressor (`wp/pulseKernel.js:2366-2389`). So in a realm whose graph has never held
    a live war front (RR applied without W), the dispatch refusal, banditry, interception and the smuggle spill do not
    fire, and caravans meet only tolls, seasons and contraband gates [OBSERVED re-checked + INFERRED]. See §10.3 for the
    one unchecked path to a war front without War.
41. **Readers' counts settled**: the catalog has 27 rows (19 goods, 8 services), not 25 or 28; the institutional
    service map has 12 rows, not 11 [re-checked].
42. **The two food models disagree, and a comment says they cannot.** The writer's rung (`gen/foodGenerator.js:294-316`)
    gives the road +0.15 on mountain, desert or hills, and grants the minor-route trickle only when the route is
    'isolated'. The view's rung (`econ/foodBalance.js:191-213`) has no terrain boost and grants the trickle on any
    disconnected route (isolated or none). `src/domain/tradeRouteSemantics.js:66-76` says both read the 0.14 pass
    constant "so their route ladders cannot drift apart"; that is true of the pass rung only. The view now reads the
    writer's split when one exists (`econ/foodBalance.js:308-336`), so the drift touches only settlements saved before
    the writer published its split, and calls made without a foodSecurity record [OBSERVED re-checked].
43. **A supplier at war with the destination is not severed.** M2 and M6a severance asks only whether the *source* is
    under a war front or a blockade. Interception asks only about the route's *intermediaries*
    (`wp/supplyKernel.js:254-257`, `:447-450`; `sp/supplyShipments.js:200-216`). So a besieger adjacent to its target
    can remain the target's cheapest supplier. Under M2 no dispatch EV refuses it. Under M6a the destination's siege
    danger (0.95) usually makes the dispatch EV refuse it, except on the vassal must-go [INFERRED from code].
44. **A stale seam note.** `sp/navalLayer.js:533-536` calls the blockade-strangulation → peace-reason wire a documented
    seam, but `wp/peaceReasons.js:564` consumes it (W-MOMENTUM Stage 0(a)), and so does `disp/navalDisplay.js:49`
    [OBSERVED re-checked].

### 10.3 Open questions

- **Will the host canonize from the native map?** Today "Map geography" accepts only a generated FMG map's pack; the
  routing partition, gates, sea lanes and seasonal overlay all come from that capture. Which map product feeds them is
  the owner's and the host's call (fp-physical-integration.md §8).
- **One territory or two?** (§9, item 1.) [SUPERSEDED BY EVENT 2026-10-17: two, W8a and W8b (J-V13.63).]
- **Does the owner want positioned caravans (WY-3) before a lens shows motion?**
- **Would the host adopt patrol coverage** as a route_wardenship producer or a security input (§9, item 4)?
- **Is the RR birth door going to be lit** (`NEW_CAMPAIGN_SIMULATION_PRESET_ID`)? The comment at
  `wp/simulationRules.js:22-30` prices it as a declared shift of seven persisted keys per new campaign.
- **TR-5's trade half** (grain provision, route wardenship, the realm-pressure consumer) has no owner (OD-FC-2), and
  EC-15 cannot light while `tradePactsEnabled` has no gate read (EC:578).
- **Can a war front appear without War?** `isLiveWarFront` rejects only fronts whose evidence is a pure
  relationship-label bundle; "a bare/light/legacy front" still reads as a siege (`wp/warFrontReads.js:1-75`). Discovery
  proposes war_front channels for hostile pairs with evidence source 'neighbourNetwork'
  (`rg/discoverDependencyCandidates.js:83`, `:189-190`). If a DM confirms one and it does not merge with a
  relationship-label bundle, it would embattle, sever caravans and damp Roads missions with War dark. Not traced.

---

## 11. Sources

### 11.1 Read whole by the reading seats (line counts at `81f1cd96`)

- Seat A (trade physics, FP volumes, presets): `docs/DESIGN_FP_TRADE.md` (1,472); `docs/DESIGN_FP_ARCH_TR.md` (627);
  `docs/DESIGN_SUPPLY_WEB_WARFARE.md` (120); `docs/DESIGN_MAGIC_ECONOMY.md` (223); `sp/commodityFlow.js` (998);
  `sp/supplyShipments.js` (517); `wp/supplyKernel.js` (815); `sp/entrepots.js` (381); `wp/entrepotKernel.js` (137);
  `sp/dispatchEV.js` (396); `sp/dispatchDestination.js` (253); `sp/tradeFlow.js` (253); `sp/smuggle.js` (343);
  `wp/tradeWar.js` (731); `wp/flows.js` (178); `rg/tradeLinks.js` (83);
  `src/components/settlements/LivingWorldGates.jsx` (381); `data/foodImportRates.js` (23); `lib/computeMapChains.js` (69).
- Seat B (generation economy): `gen/steps/generateEconomy.js` (480); `econ/tradeGoods.js` (439); `data/tradeGoodsData.js`
  (571); `src/domain/supplyChainState.js` (656); `src/domain/inferSupplyChains.js` (649); `rg/goodsCatalog.js` (641);
  `src/domain/goods.schema.js` (434); `src/domain/capacityModel.js` (1,147); `gen/servicesGenerator.js` (387);
  `gen/services/serviceClassifier.js` (481); `gen/economicGenerator.js` (14); `econ/economicState.js` (896);
  `gen/computeActiveChains.js` (1,032); `data/goods/chains.js` (78); `data/goods/identity.js` (36);
  `econ/customTradeEndpointIntegration.js` (213); `econ/finishedGoodsDemand.js` (106); `econ/neighbourEconomicBias.js`
  (68); `econ/prosperity.js` (314); `gen/steps/economyReconcilePass.js` (361); `gen/demandProfile.js` (213);
  `src/domain/tradeRouteSemantics.js` (193); `gen/services/serviceRollMaterialization.js` (260);
  `gen/services/institutionServices.js` (208); `gen/services/serviceAvailability.js` (93). Structure only:
  `data/supplyChainData.js` (1,482), `data/institutionServices.js` (1,711), `gen/services/serviceCategoryTables.js`
  (613). Probes `probe.mjs`, `probe2.mjs`, `probe3.mjs` in the session scratchpad imported host modules read-only.
- Seat C (movers): `sp/generosityGate.js` (80); `wp/tradeSalience.js` (531); `wp/routeNetworkConsumers.js` (540);
  `wp/routeNetworkConsumersTransit.js` (478); `wp/routeNetworkConsumersRace.js` (388); `wp/brokerageServices.js` (681);
  `wp/brokerageServicesRules.js` (423); `wp/supplyWebWarfare.js` (1,080); `wp/sovereigntyMarketStage.js` (591);
  `wp/generosityKernel.js` (1,391); `sp/embattlement.js` (449); plus the seat A files above it shared.

### 11.2 Read in part or by grep by the seats

`docs/DESIGN_FP_ARCH_EC.md` (2,996: status, §0, §1 laws, §2 census S1–S56, §3–§5, EC-1 scope, EC-3 scope, EC-6 whole,
EC-18 whole, §7 matrix, §8a); `docs/DESIGN_FP_COHERENCE_FOLD.md` (708: §2); `docs/PHASE55_SPATIAL_ENGINE_DESIGN.md` (1,710:
§2–§4d, §7, round 22; grep elsewhere); `docs/world-pulse-roadmap.md` (239: two trade passages); `docs/DESIGN_FP_ARCH_WY.md`
(1,737: :108-175, :405-470); `wp/simulationRules.js` (1,593); `econ/foodBalance.js` (733); `wp/foodStockpile.js` (537);
`sp/distanceRead.js` (1,192); `sp/spatialDigest.js` (923); `sp/seaLanes.js` (629); `sp/generosityEV.js` (938);
`wp/commercialReasons.js` (584); `disp/marketPrices.js` (328); `wp/upswingKernel.js` (978); `wp/pulseKernel.js` (3,007);
`rg/discoverDependencyCandidates.js` (502); `rg/graph.js` (1,029); `rg/propagation.js` (1,179); `wp/pactTriggers.js`;
`wp/beliefMap.js`; `src/domain/canonicalAccessors.js`; `store/campaignSpatialCanonize.js` (229);
`store/campaignWorldPulseSlice.js` (904); `lib/instantWorld/composeInstantWorld.js` (562); `map/SimulationRulesAxes.jsx`
(450); `map/ChainEdges.jsx`; `sp/intelActs.js`; `wp/brokerageStamps.js`; `gen/foodGenerator.js` (488);
`wp/calamityKernel.js` (873); `wp/resourceDynamicsKernel.js` (915); `wp/tierResourceDynamics.js` (742);
`wp/institutionLifecycle.js`; `src/domain/events/mutateWorld.js`; `gen/neighbourGenerator.js`; `gen/spatialGenerator.js`
(335); `data/economicData.js` (881); `data/finishedGoodsCategory.js` (223); `wp/candidateEvents.js` (883);
`sp/navalLayer.js`; `wp/sovereigntyReach.js`; `wp/routeNetworkFlows.js`; `lib/spatialUsage.js`;
`disp/tradeFlowEconomics.js` (136); display headers of `economyFreshness.js` (203) and `tradePressure.js` (213).
Map module: `research/sf/fp-simulator.md` (1,098), `research/sf/fp-physical-integration.md` (481), `docs/PROGRESS.md`
rows J375–J380.

### 11.3 My own re-reads at `81f1cd96` (this seat)

`wp/simulationRules.js` (1,593): :20-120, :680-905, :1530-1593; `wp/worldState.js` (868): :640-669;
`lib/instantWorld/composeInstantWorld.js` (562): :25-50, :410-430; `map/SimulationRulesDialog.jsx` (637): :265,
:270-285; `map/SimulationRulesAxes.jsx` (450): :360-382; `src/components/settlements/LivingWorldGates.jsx` (381):
:1-120; `store/campaignWorldPulseSlice.js` (904): :380-395; `store/campaignSpatialCanonize.js` (229): :118-140, grep
for `kmScale`; `wp/candidateEvents.js` (883): :595-606; `wp/pulseKernel.js` (3,007): :560-578, :825-880, :1000-1152,
:1515-1524, :2362-2394; `wp/supplyKernel.js` (815): :60-110, :205-230, :490-500, :664-670, :700-760;
`sp/supplyShipments.js` (517): :120-146, :380-400; `sp/commodityFlow.js` (998): :90-140, :165-180, :576-800;
`sp/entrepots.js` (381): :60-118, :140-148; `sp/dispatchEV.js` (396): :10-20, :85-121; `sp/smuggle.js` (343): :58-98,
:143-180; `sp/tradeFlow.js` (253): :53-69; `wp/upswingKernel.js` (978): :100-130; `wp/tradeWar.js` (731): grep of
constants; `wp/supplyWebWarfare.js` (1,080): :252-262; `sp/generosityEV.js` (938): :322-329, :933-938;
`wp/generosityKernel.js` (1,391): grep; `sp/embattlement.js` (449): :1-100, :168-178, :340-372; `sp/distanceRead.js`
(1,192): :70-95, :155-170, :205-226, :280-312, exported-function index, :917; `sp/spatialDigest.js` (923): :690-740;
`sp/seaLanes.js` (629): :102-122; `sp/spatialCost.js` (455): :85-120; `rg/goodsCatalog.js` (641): :28-250, :405-480;
`gen/computeActiveChains.js` (1,032): :920-990; `data/foodImportRates.js` (23) whole; `src/domain/tradeRouteSemantics.js`
(193): grep; `lib/supplyChains.js` (150): :1-60, :91-150; `lib/computeMapChains.js` (69): :1-30;
`lib/regionalMapOverlay.js` (113): :1-60; `map/LayersPanel.jsx`: grep; `map/WarFaithMapOverlay.jsx` (229): grep;
`map/relationshipEdgeStyle.js` (74): grep; `docs/DESIGN_FP_COHERENCE_FOLD.md` (708): :325-352; `docs/DESIGN_FP_TRADE.md`
(1,472): :196-214; `docs/DESIGN_FP_ARCH_EC.md` (2,996): :395-399. Map module: `research/sf/fp-simulator.md` §0, the TR
paragraph, §1.13, §2.3, §8; `research/sf/fp-physical-integration.md` §1, §2.5, §2.6, §2.9, §5;
`research/sf/faith-system.md` (1,516) header, §6.2, §7.4, §8 (format), §9 whole; `docs/PROGRESS.md` (1,056) rows
J375–J382; `docs/volumes/V13-world.md` §3.8 (opening) and §3.9 whole.

Verification pass (the fixer seat, §12), all at `81f1cd96`: `wp/supplyKernel.js` (815): :60-115, :240-262, :440-455,
:745-762; `src/domain/canonicalAccessors.js`: :50-75; `gen/computeActiveChains.js` (1,032): :920-1032;
`econ/economicState.js` (896): :545-560, :798-848; `gen/foodGenerator.js` (488): :176-200, :284-330, :410-425;
`econ/foodBalance.js` (733): :150-216, :300-350; `src/domain/tradeRouteSemantics.js` (193): :60-120;
`wp/foodStockpile.js` (537): :80-104, :196-232, grep for blockade; `wp/pulseKernel.js` (3,007): :505-515, :585-615,
:649, :1783, :2068-2108, :2360-2396; `wp/stressorsCore.js` (558): :45-85; `wp/blockadeTransport.js` (73): :1-60;
`wp/simulationRules.js` (1,593): :56-74, :164, :255-268, :864-1225 preset heads, :960-975, :1020-1028;
`sp/supplyShipments.js` (517): :58-70, :200-222; `sp/distanceRead.js` (1,192): :912-920; `sp/smuggle.js` (343):
:140-180; `sp/embattlement.js` (449): :66-125, :180-262, :376-449; `wp/warFrontReads.js`: :1-84; `sp/entrepots.js`
(381): :204-218; `wp/institutionLifecycle.js`: :688-745; `wp/entrepotKernel.js` (137): :14-22; `wp/tradeWar.js` (731):
:568-612; `wp/advanceInterval.js` (684): :85-105, :500-515; `wp/advanceCampaignWorld.js`: :1-40;
`store/campaignWorldPulseDeferred.js`: :85-125; `store/campaignWorldPulseSlice.js`: :296-302;
`map/SimulationRulesDialog.jsx`: :286; `sp/commodityFlow.js` (998): :454, :520-529, :674, :700-706, :778-786;
`docs/DESIGN_FP_TRADE.md`: :200; `docs/DESIGN_FP_ARCH_EC.md`: :397; `wp/roadsKernel.js` (1,245): :1-32, :98-140,
:183-206, :340-362, :950-985, :1005-1030, grep; `src/domain/roads/state.js`: :129, :141-144, :239-253;
`wp/namedPersonTransit.js` (201): :1-20, :160-201; `wp/tickIndices.js`: :179-196; `sp/rumorNetwork.js`: :106-108,
:552-554; `src/domain/events/mutateWorld.js` (1,233): :415-442; `rg/deriveRegionalState.js` (594): :138-150;
`wp/flows.js` (178): :44-50; `src/domain/roads/userRoutes.js` (228): :1-30, :90-150, :200-228;
`store/userRouteCharter.js` (147): :1-80; `src/domain/events/mutateUserRoute.js` (218): :1-40, :100-175;
`src/domain/events/undoEvent.js`: :424-447; `rg/discoverDependencyCandidates.js` (502): :20-92, :165-195, :306-330,
:375-390; `rg/tradeLinks.js` (83): :20-50; `gen/steps/resolveNeighbour.js`: :20-60; `gen/steps/generateEconomy.js`
(480): :215-240, :330-346; `wp/supplyQuality.js` (75): :1-30; `wp/mercenaryMarket.js` (261): :1-40;
`wp/secrecyTradeFactor.js` (216): :1-26; `sp/navalLayer.js`: :530-545; `wp/peaceReasons.js`: :548-580;
`wp/marketNews.js` (184) and `wp/marketReceiptPools.js` (66): headers; `wp/resourceDynamicsKernel.js` (915): grep of
the export, import and chain writers. Read-only probe: `normalizeGood` over 17 service, stress and staple labels,
run from the session scratchpad, importing host modules without writing to the host.

### 11.4 Not read by any seat

`houseLedger.js` (525) and `houseActs.js` bodies; `beliefScarcity.js`, `beliefAxisSubjects.js`; `treasury.js` (1,302;
tolls cited from EC only); `navalKernel.js` and the rest of `navalLayer.js`; `generosityReactions.js`;
`supplyCompleteness.js`, `contestOverThirdParty.js`; `cultureDistance.js`; `clandestineFacet.js`; `armyTransit.js`;
the route-network ledger, genesis, decay, charter bodies and the interdiction and strategic consumers; the brokerage
feed, plant, patronage and fidelity modules; sovereignty appraisal, bundle and intent; `peaceTermsSale`;
`rumorNetwork.js`, `migrationRumors`; `magicSubstitution*.js`; `chainMagicSubstitution.js`;
`tradeConvergenceContract.js` (cited by grep only); `dispositionLedger.js`; `viability.js` (613),
`localSupplyEvidence.js`, `nativeEconomicInputs.js`, `upgradeOpportunities.js`; `generators/helpers.js`;
`safetyProfile.js`; `data/resourceData.js`, `resourceChains.js`, `supplyChainResourceIndex.js`, `servicesData.js`;
`customTradeEndpointProjection.js` (512), `customSupplyChainActivation.js`; `lib/dependencyEngine.js`,
`lib/customRegistry.js`; the rest of `rg/deriveRegionalState.js` (594) and of `wp/roadsKernel.js` (hazards, capture,
ransom; §11.3 lists the parts read); the relationship-bundle code of `rg/graph.js` (§10.3); `traditionsKernel.js`,
`generosityUpdates.js`, `seasons.js`; the components `EconomicsTab.jsx`, `TradeDynamicsPanel.jsx`,
`SupplyChainsPanel.jsx`, `EventComposer.jsx`, `RegionalCausalityLayer.jsx`, `RelationshipEdges.jsx` bodies; the PDF
`EconomicsTrade.jsx`; `docs/DESIGN_ROUTE_LIFECYCLE.md`, `DESIGN_GENEROSITY_ENGINE.md`, `DESIGN_FP_SPINE.md`,
`DESIGN_FP_COUPLINGS.md`, `DESIGN_FP_GRAMMAR.md`; EC-2, EC-4, EC-5, EC-7…EC-11, EC-16, EC-17 bodies and EC §8b-§18;
PHASE55 §4e–§4j bodies and Parts II–VII beyond headings. Nothing was unreadable; these were left for time. Whether any
dossier projection filters trade lists by audience is unverified.

---

## 12. Verification record

A verifier checked this note against the host at `81f1cd96`. It reported 11 checks that did not hold (P1–P11) and 13
omissions (M1–M13). I re-checked each one at the source (§11.3, "Verification pass"). Each row says what the verifier
said, what I found and what changed in the note. Where the verifier was wrong in part, the "found" column says so and
the note follows the source.

| # | Verifier said | What I found | What changed |
|---|---|---|---|
| P1 | "Services never move" is wrong: the alchemy and planar service exports normalize to shippable goods, and freight and tourism to custom goods. | Confirmed by my own read-only probe: alchemical_goods; arcane_reagents (0.58, critical); two custom goods. Also, 'Maritime services' becomes transport_services and stays home. Service exports join `primaryExports` (`econ/economicState.js:802-806`). | Fixed: §1 bullet, §2.2, §3.4 Movement, §8.5 item 1, §9 item 17, §10.2 item 25. |
| P2 | Food coverage citation wrong: foodGenerator :160-200 is the descriptive table; the rung is at :298-316; foodBalance :199-213 lacks the boost; 0.14 is at tradeRouteSemantics :76. | Confirmed. One detail added: the view now reads the writer's split when one exists (`econ/foodBalance.js:308-336`), so its boost-less ladder is only a fallback. The minor-route rule also differs. | Fixed: §3.8 citations and the divergence; new §10.2 item 42. |
| P3 | The food-import cut is not a naval blockade. It is a siege or occupation stressor at severity ≥ 0.4, lit wherever stressors run (all presets but SC). | Confirmed (`wp/foodStockpile.js:86`, `:99`, `:207-218`; `wp/pulseKernel.js:599`; `wp/stressorsCore.js:55-77`; `wp/simulationRules.js:968`). The same stressor also impairs airship docks (`wp/blockadeTransport.js`; `wp/pulseKernel.js:649`). | Fixed: §3.8, §5.1 row 8, §7 (row split in two), §2.4 new "Besieged" bullet, §6. |
| P4 | K = 3 is cited at distanceRead :917, which is `K_CANDIDATES`; the supply K is `K_SOURCES` at supplyShipments :63-66. | Confirmed. The constant itself sits at `sp/supplyShipments.js:69`. | Fixed: §3.10 row. |
| P5 | Contraband's trade-tie term is unwired. | Confirmed: the default is 0 (`sp/smuggle.js:164`), and the only caller (`wp/supplyKernel.js:754-756`) omits it. | Fixed: §5.8, §9 item 8. |
| P6 | Banditry loss is (4–20 %) × the route's mean danger, capped at 20 %. | Confirmed (`sp/embattlement.js:107-112`, `:384-389`, `:439-447`). The chance is exactly danger × 0.25. | Fixed: §3.10 row. |
| P7 | An occupation embattles alone only while contested or unstable, with weak security. | Confirmed, with thresholds: contested needs security below 0.5, unstable below about 0.22. I also found: exhaustion plus the premium can enter against weak security; the code's own tuning comment (`:84-86`) overstates occupation; and `besieged` is the war front, not a stressor. A possible path to a war front without War is noted as open. | Fixed: §1, §3.10 weights row, §7 embattlement row, §9 items 3–4, §10.2 item 40; new §10.3 question. |
| P8 | The toll lift is not a prosperity writer. | Confirmed: `tollProsperityFor` has one consumer (`wp/institutionLifecycle.js:698`), which folds it into economy health only. | Fixed: §1, §2.1 row, §9 item 6. |
| P9 | The loser's channel is re-minted at the winner's strength − 0.2. | Confirmed (`wp/tradeWar.js:598-605`), with the same one-commodity goods set. | Fixed: §3.10, §5.10. |
| P10 | The M6a arrival asymmetry is latent, because advances run weekly ticks. | Confirmed (`wp/advanceInterval.js:97-105`, `:511`). One detail added: there is one coarse kernel call, the Simulation Rules dialog's uncommitted one-month preview (`map/SimulationRulesDialog.jsx:286`). It is a single tick, in which no caravan arrives either way. [Fable-reviewed 2026-10-18: a second, committed coarse call exists under the `advanceMultiTick` killswitch; §10.2 item 14 as corrected.] | Fixed: §10.2 item 14; §9 item 13, including its wrong cross-reference to item 11. |
| P11 | TRADE:200 already carries a [CORRECTED] annotation. | Confirmed. | Fixed: §10.1 item 1. |
| M1 | THE ROADS trade missions are a positioned trade traveller (`roadsEnabled` in ONE_REGEN, plus canon). | Confirmed. The trade purpose goes to econ, merchant or trade NPCs and targets a direct confirmed trade-channel neighbour within 2 hops. Routing uses `chooseRoute`, with a frozen path and a node position. ONE_REGEN is spread into RR, DC, LR and FS, and there is a digest gate. | Added: §5.13, §5.1 row 15, §7 row, §8.3 row, §8.5 item 10, the §1 map paragraph, §9 item 13. |
| M2 | The DM "cut trade route" event feeds propagation and the cascade, not caravans. | Confirmed: grep finds no reader under `sp/`, in `wp/supplyKernel.js` or in `wp/supplyWebWarfare.js`. | Added: §5.13, §5.1 row 16, §7 row, §8.5, §9 item 20, §10.1 item 7. |
| M3 | DM user routes are priced from the digest and add a neighbourNetwork link that generation trade links and channel discovery read. | Partly right. The neighbour link is real and discovery reads it: a known relationship lets discovery suggest a trade_route pair without any goods overlap. **Generation links do not read it**: the bound neighbour comes from `config._importedNeighbor` (`gen/steps/resolveNeighbour.js:35-39`). The charter refuses to run without a digest (`src/domain/roads/userRoutes.js:133-135`). | Added, with the generation claim corrected: §5.13, §7 row, §8.3 row, §10.1 item 7. |
| M4 | Organic siege and occupation stressors drive the food-import cut and the airship impairment, not caravans; keep the two kinds of "besieged" apart. | Confirmed. | Added: §2.4 bullet, §3.8, §9 item 19 (together with P3). |
| M5 | A supplier at war with the destination is not severed. | Confirmed in code (`wp/supplyKernel.js:254-257`, `:447-450`; `sp/supplyShipments.js:209-216`). The consequence is inference. | Added: §10.2 item 43, with a pointer in §5.5. |
| M6 | The smuggle rumour carrier is belief-gated, so RR applied (omniscient) lights none. | Confirmed (`sp/rumorNetwork.js:552-554`; RR inherits the omniscient default at `wp/simulationRules.js:56`). | Fixed: §5.8, §6, new §7 row. |
| M7 | Stress imports and service labels normalize unpredictably. | Confirmed by the same probe. | Added: §2.2, §3.3 row, §10.2 item 25. |
| M8 | supplyQuality (W-C1, FS) and mercenaryMarket (W-C2) are trade→war couplings. | Confirmed: `warSupplyQualityEnabled` is set at `wp/simulationRules.js:1025` (FS only), and the mercenary market runs under `warLayerEnabled` (`wp/pulseKernel.js:1783`). [Fable-reviewed 2026-10-18: or while a `mercenaryMarket` ledger persists; §6 as corrected.] | Added: §6 War bullet, two §7 rows. |
| M9 | secrecyTradeFactor has zero consumers, and blockadeStrangulationOf is an unwired seam. | The first half is confirmed. **The second half is wrong**: `wp/peaceReasons.js:564` consumes blockadeStrangulationOf for economic_strangulation, and `disp/navalDisplay.js:49` displays it. Only the navalLayer header comment is stale. | Added: §5.12 (secrecy tax); §6 and the §7 naval row (strangulation is wired); §10.2 item 44 (the stale seam note). |
| M10 | marketNews and marketReceiptPools are TR-3's dark news registry. | Confirmed; no preset sets `believedMarketsEnabled` true. | Added: §5.12 TR-3 bullet, §7 row. |
| M11 | The two food models disagree, though tradeRouteSemantics says they cannot drift. | Confirmed, with the fallback detail from P2. | Added: §10.2 item 42. |
| M12 | tradeLinks also returns no links under 'suppress'. | Confirmed (`rg/tradeLinks.js:48`; `:47` is the missing-neighbour return). | Fixed: §3.5, §5.1 row 1. |
| M13 | Coverage: §10 item 26 and the `resourceDriftEnabled` row were unverified, as were the territory and road-polyline claims cited from other notes. | §10 item 26 holds: the resource reconcile writes chains, exports and local production, never imports (`wp/resourceDynamicsKernel.js:664-680`). `resourceDriftEnabled` defaults to true and is false only in SC (`wp/simulationRules.js:74`, `:976`), as the row says. The §8.1 territory and road-polyline lines remain [STATED] from other notes and were not re-verified here. | No change beyond §11.3. |
