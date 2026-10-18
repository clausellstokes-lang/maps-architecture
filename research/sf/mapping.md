# SettlementForge dossier to PLAT design: the mapping (sf/mapping)

> PENDING FABLE REVIEW — Opus-produced (sf/mapping).

## PROGRESS

| step | what | state |
|---|---|---|
| 0 | lane logged STARTED; skeleton written | done 2026-09-27 18:06 |
| 1 | read research/sf/dossier-model.md in full | done (lines 1–251) |
| 2 | read research/sf/dossier-generation.md in full | done (lines 1–1152) |
| 3 | read research/sf/dossier-outputs.md in full | done (lines 1–490) |
| 4 | read research/sf/dossier-seam.md in full | done (lines 1–598) |
| 5 | read docs/ARCHITECTURE.md (sha256 e9c0b828…) §2, §7.7, §10, §11, §14 | done: §2 (363–2078), §7.1 (6392–6622, for EditBase, DossierRef and the edit kinds), §7.7 (7308–7460), §10 (8849–9142), §11 (9143–9456), §14 (10904–11097); plus §1.1's ladders (185–215), §4.2 S0's Blueprint (3362–3380), §4.5's typing, field and band set (4030–4082), §4.7's Designation (4630–4650), §4.11 (4950–5009, 5140–5165, 5265–5320: `ConversionOp`, `LadderOp`, `EpochInputs`, uses and dossier content across epochs) |
| 6 | read owner items 16–22, 28 (f), 29, 30, 63–67, 70–72 | done: AMENDMENTS-2026-09-25b items 16–23 (86–222) and 28–30 (254–410, item 28 whole with (f)); AMENDMENTS-2026-09-27c items 63–67 (665–894), 70–72 (1019–1225) and §G item 20 (h) (1226–1276); OWNER-INSTRUCTIONS-2026-09-25 lines 63–136; DEFINITION.md whole; PROGRESS.md J63–J78; workflows/14-dossier-survey.js (the verify and plan seats that read this file) |
| 6r | CONTINUATION 18:15 (a new seat; the 18:06 run wrote the skeleton only and its reading did not survive): steps 1–6 re-read into this seat — the four surveys in full, ARCHITECTURE unchanged at sha256 e9c0b828…, the same ranges and items as rows 5–6 | done 18:27 |
| 6c | census of the 155 generated dossiers and the 12 after-tick members already in scratch (branch fp/integration-2026-09-23 @ 5d699cc68, made by sf/outputs; no SettlementForge file read): enumerations and name joins | done — receipts below |
| 7 | write part 1 (mapping table): 77 rows in nine groups plus the enumeration tables T1–T16 | done 18:32 |
| 8 | write part 2 (gaps in the design): G-D1 (a)–(f) to G-D17 | done 18:33 |
| 9 | write part 3 (gaps in the dossier and their derivations): R1–R24 | done 18:34 |
| 10 | write part 4 (model conflicts): 4.1–4.17 | done 18:36 |
| 11 | write part 5 (change feed): F1–F22, dating and cadence, creation, the ignore-list | done 18:37 |
| 12 | §0 summary, §6 judgments and open questions, §7 evidence ledger written 18:39; queue row B-sf/mapping appended to docs/FABLE-REVIEW-QUEUE.md; LANDED line written | done 18:40 |

## Reading log, method and labels

**Read in full by this seat:** the four surveys `research/sf/dossier-{model,generation,outputs,seam}.md`; the design
ranges and owner texts listed in rows 5–6 above. **Not read:** anything inside `/Users/cstokes/Desktop/settlement-engine`
(this lane reads SettlementForge only through the four surveys and through scratch copies of dossiers the surveys
generated); nothing of SettlementForge's own map programs (the surveys did not read them either).

**Executed by this seat (receipts in the session scratchpad, `…/scratchpad/sf/mapping/`):** `census.py` → `census.out`
(enumerations, counts and name joins over the 155 generated dossiers of `scratchpad/sf/outputs/r2/{gen,soak}/`: 35 by
tier, culture, sample card, neighbour and custom content, plus the 120-dossier soak); `census2.py` → `census2.out` (the
names that fail to join); `ticks.py` → `ticks.out` (the 12 settlement files after one week, one season and one year under
the birth default and one year under `realistic_regional`, compared with their births). These files are copies the
sf/outputs lane generated on the branch baseline; reading them wrote nothing anywhere but the scratchpad.

**Baseline.** Every SettlementForge fact here describes branch `fp/integration-2026-09-23` @ `5d699cc68` (2026-09-24),
the baseline all four surveys share; SettlementForge's on-disk working tree is older and even generates a different
settlement from the same seed (sf/outputs §7.1). Which SettlementForge line the port binds to is an open owner question
(sf/model §15 Q1, sf/generation Q9).

**Labels.** `C` = CONFIRMED: read on disk or executed — for a SettlementForge fact, by the survey cited or by this
lane's census (`k`); for a design fact, by this lane's reading of `docs/ARCHITECTURE.md` (`A`) or an owner item. `P` =
PLAUSIBLE: inferred — every transformation, derivation, proposal and verdict on fit below is `P` unless it says
otherwise. Source tags: `m` sf/model, `g` sf/generation, `o` sf/outputs, `s` sf/seam, `k` this lane's census, `A` the
design, `i<n>` owner item n. "SF" = SettlementForge. "Tier D" = a DOSSIER FACT (carried by its dossier key, immutable on
the map — item 20 (h) (i)); "tier M" = a MAP FACT (the map's own construction, derived); "ignored" = deliberately no
consumer.

## 0. In plain words — the outcome first

1. **Most of what a SettlementForge dossier says has a place in our design already.** Its institutions become the
   map's dossier-backed assignments (one per record; a record such as "Taverns (5-20)" becomes a counted group; a
   "red light district" claims a whole neighbourhood); its population sets the size and the household roster; its site
   words (coastal, riverside, hills …) and its trade access (road, river, port, crossroads, isolated) choose the site,
   the gates and the main roads; its wealth label sets the town's wealth level; its government, powers, economy and
   conditions feed the neighbourhood rules of item 72 and the transitions of item 67 (part 1: 77 rows, all C for the
   dossier side, measured on 155 generated dossiers).
2. **Where the dossier holds nothing, the map derives it** (item 20 (h)): every position, district, street, wall line,
   plot, building, household and class, the prosperity field, the direction trade comes from, who sits where, and
   every name the dossier does not give — 24 derivation rows, each naming its dossier inputs, its rule, where seeded
   chance enters and the bar it must never contradict (part 3). Nothing is asked of SettlementForge.
3. **Where our design has no place for a dossier fact** (part 2, 17 gaps), the largest are: powers of kind military and
   arcane, the powers materialised in the base (item 72 needs them), a trade-flow record for item 72's trade term, the
   economy's sector shares for its economy dial, a named person the dossier lists, live conditions between epochs, a
   ruined-but-listed institution, and the week and cause of each dossier change.
4. **Seventeen conflicts of model** (part 4) — the three the brief asked about: SettlementForge counts people, not
   households (households are ours; their total is the dossier's); it keys institutions and powers by NAME with no id
   (the map keeps its own ids in a binding table and re-binds on SettlementForge's rename receipts); and its clock does
   tick in weeks, as item 67 assumes — our design's epochs are in years, so dossier changes fold at their week and an
   epoch at each year boundary or when the population moves past tolerance.
5. **The change feed** (part 5): SettlementForge sends whole dossiers, not changes; the map's port diffs each new dossier
   against the facts the map already carries, dates each change from SettlementForge's receipts, and turns it into our
   `assign`, `unassign`, `setAttr` and `epoch` events — 22 kinds of change, each with its event and its transition.
6. **Two facts the owner may want to know now:** 75 of the 155 generated dossiers (every thorp, hamlet and village and
   five small towns) are below our town floor of 1 500 people and need the staged village product; and SettlementForge's
   quarter list, the only place-like list it has, is fixed at generation and never updated by its simulator, so the
   map treats it as names and hints, not as districts.

## 1. The mapping table — every dossier record and field against the design record that consumes it

Columns: **SF record.field** (what the dossier holds) · **design consumer** (the record and field of
`docs/ARCHITECTURE.md` that takes it, or "none") · **transformation** (units, ids, enumerations; the tables T1–T16 are
§1.10) · **id stable?** · **tier** (D dossier fact / M map fact / ignored) · **label and source**. Every "design
consumer" and "transformation" cell is this lane's proposal (P) unless its label says otherwise; every SettlementForge
fact is C from the source cited.

### 1.1 The settlement: identity, scale, versions

| # | SF record.field | design consumer | transformation | id stable? | tier | label |
|---|---|---|---|---|---|---|
| 1 | `id` (`s_` + 16 hex, an FNV-1a hash of `_seed`) | `DossierRef.element` of the settlement root (§7.1); the key the host stores the `.plat` beside the dossier under (s C-6) | none; opaque to the module | yes across reload and a same-seed regeneration; a new seed is a new id | D | C m§1, o§3.1 |
| 2 | the save UUID (the save envelope's `id`; the campaign's key; outside the dossier) | none in the document (host bookkeeping) | — | yes | ignored | C m§13 |
| 3 | `_seed` (a string, e.g. `sfout-town-1`) | `Recipe.seed` (a u32, §2.9) | one-way `H32("plat:sf-seed" ‖ _seed)`, never SF's seed itself (s C-8 (a): `_seed` is secret on SF's public surfaces) | yes | M, derived from a D value | fact C m§1, s C-8; rule P |
| 4 | `name` | the title label (§9's title furniture) and export names | none; a protected name S13a never re-draws | a name; `rename-settlement` arrives as a change | D | C m§2 |
| 5 | `tier` (thorp, hamlet, village, town, city, metropolis) | no geometric consumer — the rung comes from `population` (§1.1); the word feeds the title, the clerk and descriptions | T1; conflict 4.4 | — | D (the word) | C m§2, A §1.1, k |
| 6 | `population` (an integer; LIVE — the simulator moves it weekly) | `Blueprint.size.population` at creation (§4.2 S0); `EpochInputs.populationTarget` after (§4.11); S2's roster runs at it (§10.2) | people to people; §1.1's bands pick the rung; S2's grid Δ = 10 | — | D (the count); the households that make it up are M | C m§2, A §1.1 §10.2 |
| 7 | `generatorVersion`, `schemaVersion`, `simulationVersion` | the port's adapter choice; `DossierRef.version` (§7.1) | none | — | ignored as map input: the same seed gives different dossiers on two SF lines at one `generatorVersion` (g§4.5) | C g§4.5 |
| 8 | `config` (resolved) and `_config` (raw, `random` sentinels intact) | read `config`; `_config` only for the raw culture word | — | — | D | C g§2.2, k |

### 1.2 Site, world context, culture

| # | SF record.field | design consumer | transformation | id stable? | tier | label |
|---|---|---|---|---|---|---|
| 9 | `config.terrainType` ∈ plains 35, coastal 25, riverside 23, hills 21, mountain 20, forest 19, desert 12 over 155 (`config.terrain` is null in 155 of 155 on the branch) | S0's site request and `circumstances.biome` (§4.2 S0); `Intent`'s water setting (§7.7) | T2 | — | D (the word) → M (the geometry) | C k; T2 P |
| 10 | `config.tradeRouteAccess` ∈ road 66, port 25, river 23, crossroads 22, isolated 19 (goldens also pin `random_trade`, `mountain_pass`, `none`, o§2); `spatialLayout.tradeAccess` is the same fact in words — one prose string per key, paired 1:1 in 155 of 155 | `Intent`'s gate count and arterial count, `toggles.harbour`, S3's gate law (§4.2 S3), §4.3's arterials | T3 | — | D → M | C k; T3 P |
| 11 | `config.monsterThreat` ∈ frontier 59, civilized 45, plagued 25, safe 24, heartland 2 (the sample cards) | `circumstances.threat` → `Intent`'s defence level (§7.7) | T4 | — | D | C k; T4 P |
| 12 | `config.magicLevel` (medium 152, low 3; none and high exist) | II.6's island supply law (item 10: magic is a supplied resource); none → no islands | word → a supply multiplier | — | D | C k, m§2; P |
| 13 | `config.cultureProfileKey` = `config.culture` (11 profile keys in 155 of 155; the raw `_config.culture` `mediterranean` resolves to `latin` in 18 of 18) | the era and region preset and the forms catalogue's weights (§7.7: organic, bastide-grid, radial …); §10.4's per-culture naming row | a culture-key table (ours; our own names and rows, clean-room) | catalogue key | D (the key) → M | C k; P |
| 14 | `culturalIdentity {key, label, scope, builtForm, civicPattern, exchangePattern, foodways, sacredLife, defensePattern, socialTexture, architecturalDetail}` (the same 11 keys in 155 of 155) | no structured consumer: prose for descriptions (§10.4) and the clerk; never parsed into geometry | none | — | D (text) | C k, m§2 |
| 15 | `config.nearbyResources[]` (34 deposit keys seen), `…Native`, `…Depleted`, `…State`; `resourceAnalysis.availableResources` (57 keys), `resourceConditions[]` | `SiteResources` (ore, stone, timber, fish, clay, fertile; §2.7); S0's landscape toggles; S12a's `LandUse` kinds (§4.9); `BuildingClassRow.requires` (§10.2) | T5; depleted → the land use drawn worked out; no position in the dossier → a seeded bearing per deposit key (part 3 R19) | deposit keys | D (presence, state) → M (where) | C k, m§6; T5 P |
| 16 | realm context — CAMPAIGN state, not the dossier: `mapState.placements[burgId] {settlementId (save id), x, y, cellId}`; `worldState.spatialDigest {territory, tiers, distanceMatrix, gates {between, cellA, cellB, cost}, routeReceipts, kmScale?, terrainDisagreements}` | none today; an OPTIONAL realm block inside the one dossier contract (s C-9 (a)) → `Way.from / to` "external bearing" (§2.4), S0's coast side and river inflow bearing, the geo anchor's `bearingDeg` (§11.1) | the digest holds cell ids, no coordinates; a bearing needs the FMG pack's centroids (g§2.5) | burg id, save id | optional input | C m§2, s§4, g§2.5 |
| 17 | `isolationSupport {status (connected 136 of 155), paths[] {type ∈ local_foodshed, hinterland, reserves, seasonal_access, patronage, magical_transit}}` | S12a's hinterland sizing (§4.9); `magical_transit` → a teleport institution's site | path type → a weight row | — | D | C k, m§2; P |
| 18 | `spatialLayout.layout` (one sentence by tier × terrain; 42 lines over 153 outputs) | none — redundant with rows 9–10 | — | — | ignored | C o§6.1 |

### 1.3 Quarters, landmarks, and SettlementForge's own derived place reads

| # | SF record.field | design consumer | transformation | id stable? | tier | label |
|---|---|---|---|---|---|---|
| 19 | `spatialLayout.quarters[].name` — 14 fixed names; 0–8 per settlement | a DISTRICT NAMING CLAIM: the name one district carries (`District.name`, §2.5) and a soft bias on §4.5's typing and item 72 (d′)'s quarter identities; never a zoning | T6 (Wealthy / Common Residential are band biases, never kinds — J-P1: districts are never class-named) | no id; SF derives `district.<snake>` on read | D (that a quarter of that name exists) → M (which district, where) | C k (14 name-location pairs), m§12; T6 P; J-M1 |
| 20 | `quarters[].location` — one FIXED phrase per name (14 phrases); "Eastern district (traditional)" on every Religious Quarter (154 of 154), the only compass statement in a structured field | soft `RelationRule`s (§10.2) on the named district's siting | T7 | — | D (a hint) → M | C k, o§6.1; T7 P |
| 21 | `quarters[].landmarks[]` — 537 of 1 281 are institution names; the other 744 are 26 fixed strings ("Tannery Row", "Slaughterhouse", "Dyer's Bridge", "Noble's Row", "Merchant Estates", "Garden District", "Tanners' Lane", "Weavers' Street", "Cooper's Close", "The Rat's Nest (tavern)", "Blind Alley", "The Warren (slums)", "Warehouse Row", "Common well", "Notice post", "Main Wharf", "Sailors' Quarter", "Barge Wharf", "River Landing", "Drying racks" …) | an institution name → a soft `districts` criterion on that institution's assignment (`PlacementCriteria`, §7.7); a fixed string → a dossier-given NAME for a feature the map already has (a way's `name`, a bridge, a quay, a pin, a tavern use, a sub-area) | T8; the map creates nothing for a string that its roster does not demand (J-M2) | no id | D (the name) → M (the feature carrying it) | C k; T8 P |
| 22 | `quarters[].desc` | none (prose) | — | — | ignored | C m§12 |
| 23 | the derived district profile (`deriveDistrictProfile`: wealth, safety, dominantFaction, `connectedDistricts` = every other quarter) — NOT stored | none: SF's derived reads are never map facts (g§8.6 (7)) | — | derived | ignored | C m§12, g§8.6 |
| 24 | the derived map profile (`deriveMapProfile`: roadImportance, defensiveTerrain, regionalAuthority, hazardMarkers, suggestedFeatures) — NOT stored | none (our own rules recompute the same from rows 9–11) | — | derived | ignored | C m§12 |
| 25 | `urbanFabric` (lit preset: SF's town-map memory), `mapEdits` (the save-time `{layoutLawVersion: 2}` stamp), `fogSessions`, `worldState.spatialLedgers.*` including `spatialSubstrate` | none — the port's ignore-list (g§8.8 (9)); SF's own map layers never feed ours (item 20; what we built stays the base) | — | — | ignored | C g§6.6, s§3 |

### 1.4 Institutions

| # | SF record.field | design consumer | transformation | id stable? | tier | label |
|---|---|---|---|---|---|---|
| 26 | one `institutions[]` record | one dossier-backed `Assignment {existence: 'dossier', dossier: DossierRef}` (§7.7), placed by S10b and applied by S11's mutator; an `Institution` record (§2.7) for an institution kind; a `Use` (§2.7) per placed instance; `Identity.dossier` on the Use and the Institution (§2.8) | the record's granularity by T9: a singular kind → `building`; a count-range kind → `dispersed` (row 29); a district-scale kind → `neighbourhood` (row 30); the housing stock → no assignment (row 29) | NO stored id: 0 of 5 846 records; binding key by the precedence `cat:<catalogId>` → `uid:<localUid>` → `name:<slug(name)>` (SF's own anchor precedence, s C-7) in the map's binding table (item 20 (h) (v)); within each of the 155 dossiers no two records share a `catalogId` or a name (0 duplicates) | D | C k, m§4, s C-7; P |
| 27 | `name` | `Institution.name` for a singular kind (a protected name); for a collective record the name is a KIND LABEL WITH A COUNT ("Taverns (5-20)"), not a place's name — its instances take generated names (S13a) | strip the count range for the label; keep the whole string in the binding key | SF's rename writer cascades a new name across 33 stored-handle paths (m§1) and it arrives as a change | D | C m§1, o§3.4; P |
| 28 | `catalogId` (a KIND key: `merchant_guilds_3_8`, `underground_network` …) | `Institution.roster` (a `RosterRef`) and `Use.cls` = our `BuildingClassRow.id` (§10.2) | T10 (SF catalogue → our class, many-to-one, 280 kinds on the branch, m§4), falling back on `category` and `tags` (rows 31–32) for unknown and custom kinds | kind key, stable | D (kind) → M (our class) | C m§4; T10 P |
| 29 | the count range in a record's name — 22 patterns over 155: `Parish churches (10-30)`, `Blacksmiths (3-10)`, `Merchant guilds (3-8)`, `Craft guilds (5-15)`, `Taverns (5-20)`, `Mills (2-5)`, `Butchers (3-8)`, `Carpenters (5-15)`, `Bakers (5-15)`, `Craft guilds (30-80)`, `District markets (5-10)`, `Major monasteries (5-10)` …; and the housing stock `Dwellings (4-16 / 17-80 / 80-180)`, `Housing (180-1000 / 1000-5000 structures)` | `Assignment.dispersed.count` = n, derived INSIDE [lo, hi] by S2's per-capita rows (§10.2), never outside; the HOUSING records get no assignment: they bound S2's residential building count (a coherence bar, part 3 R7) | parse `(lo-hi)`, `(lo-hi+)`, `(… structures)`, `(district)`, `(multiple)`; members `#1…#n` by ordinal | members ordinal-stable while n holds | D (the range) → M (n) | C k, o§3.4; P |
| 30 | district-scale kinds (o§6.1: `Warehouse district` 47, `Inns and taverns (district)` 47, `Apothecary district` 46, `Luxury goods quarter` 41, `Mercenary quarter` 35, `Brothel (red light district)` 34, `Sage's quarter` 33, `Furrier's district` 27, `Stable district` 26, `Banking district` 21, `Mages' district` 16, `Alchemist quarter` 14, `Red light district` 13, `Gambling district` 7 …) | item 72 (d′)'s DISTRICT-DEFINING class: an `Assignment` of granularity `neighbourhood` claiming ONE neighbourhood per record, the defining class's share raised to its row's target, never every lot | T9 flags each such catalogId; `Multiple market squares` and `District markets (5-10)` → secondary markets instead (§4.2 S2, item 24) | kind key | D → M | C o§6.1; P |
| 31 | `category` — the 10 catalogue categories (Economy 1 682, Crafts 1 435, Infrastructure 614, Religious 557, Defense 364, Criminal 302, Entertainment 252, Adventuring 240, Magic 204, Government 194) plus `Exotic` 1 and a stray lower-case `economic` 1 | T10's fallback family; item 72 (d″)'s class-to-power row and (d4)'s class-to-sector row (tables pass c adds) | case-folded enumeration | — | D | C k; P |
| 32 | `tags[]` — 42 seen (trade, essential, religious, guild, civic, food, market, defense, military, criminal, church, agriculture, legal, healing, law_enforcement, education, water, fortification, housing, transport, luxury, lodging, banking, metalwork, arcane, underground, port, smuggling, information, brokerage, monastery, warehouse, textile, sanitation, leather, adventuring, alchemy, enchanting, shipbuilding, economy, timber, divine) | T10's fallback; `RelationRule`s (§10.2): port → nearHarbour, water → nearWater, market → nearMarket, fortification → the enceinte, sanitation → `drain: 'channel'` and II.7's sewer law, underground → the `underground` and `undergroundAccess` columns | tag → rows | — | D | C k, m§4; P |
| 33 | `facets.clandestine` (11 of 5 846 records) and `facets.subterranean` (36) | item 63's `concealment` (front, hidden, underground) and `knownTo: 'secret'` on the true function (`Assignment.knownTo`, §7.7 item 7); subterranean → the underground mode only where a navigable sewer exists (item 63 (a)), else front, then hidden | facet → default mode; the dossier names no front, so item 63 (a)'s cover table picks it | — | D (that it is concealed) → M (the front, the plot) | C k, o§5.1; P |
| 34 | `forbiddenResources` (e.g. `[marshlands, fertile_floodplain]` on `Underground network`) | a HARD `dry` relation row (no `damp` or `flood` `terrainClass`, §2.5) | resource key → terrain class | — | D | C o§5.1; P |
| 35 | `required`; `source` (generated 3 540, required 1 596, cascade 631, coherence_repair 64, faction_boost 14, custom 1); `baseChance`, `exclusiveGroup`, `priorityCategory`, `magicLicense`, `serviceKeys`, `tradeRouteRequired`, `forbiddenTradeRoutes`, `cascadeAdded`, `cascadeBoost` | none: every dossier institution is dossier-backed whatever its source; the rest are SF's generation internals | — | — | ignored | C k, m§4 |
| 36 | `desc` (catalogue prose, e.g. "None of it on any map.") | a description seed (§10.4) and the clerk; never geometry | — | — | D (text) | C o§5.1 |
| 37 | `status` — absent at generation (0 of 5 846); later `active`, `impaired`, `remnant`, `ruined`, `removed`, `destroyed`, `vacant` | the housing building's `Lifecycle.existence` and `condition` and the `Use`'s opened / closed (§2.6–§2.8) | T11; SF's `vacant` is an EMPTY SEAT (no office-holder), not an empty building | — | D (state) → M (the ladder stage) | C k, m§4, g§6.3; T11 P |
| 38 | `impairments[] {type, severity 0–1, causeEventId, description, appliedAt, covert?}` | physical types (capacity, infrastructure, access, supply_starved) → `Building.condition` steps and a damaged look, then item 67's repair `Works` on restore; non-physical types (legitimacy, influence, wealth, staffing, corruption) → item 72 (d″)'s institution dial, never geometry; `covert` → never in a public view (item 30's knowledge) | severity → condition band (T11) | cause ids stable | D | C m§4, o§4; P; J-M3 |
| 39 | `localUid`, `isCustom`, `customDefinitionId`, `…RevisionId`, `…ContentHash`, `…Version`, `…Fingerprint` (custom records only) | binding key `uid:<localUid>` — the one rename-proof institution identity SF has | class by `category` and `tags` (T10's fallback) | yes | D | C o§3.5, m§13 |
| 40 | `foundedAt {year, tick}` (written once by the simulator's foundings; absent = stood since the founding) | item 67's construction `Works` start week; `Use.opened` | SF week → our week (part 5) | — | D | C g§6.6 |
| 41 | `createdByEventId`, `removedByEventId`, `destroyedByEventId`, `…ByWorldPulseOutcomeId`, `worldPulseFate`, `remnantReason`, `builtReason`, `requiredForTier` | the change's cause and fate (part 5) → `EditBase.disruption.why` and `LifecycleEvent.cause` (§7.1, §2.8) | carried verbatim as the change id and reason | stable | D (receipts) | C g§5.2, §6.3 |

### 1.5 Economy and trade

| # | SF record.field | design consumer | transformation | id stable? | tier | label |
|---|---|---|---|---|---|---|
| 42 | `economicState.prosperity` — the SETTLEMENT'S band on SF's seven-step ladder (Subsistence internal, Struggling, Poor, Moderate, Comfortable, Prosperous, Wealthy); at birth Poor 42, Prosperous 41, Comfortable 36, Moderate 25, Struggling 11; Wealthy only after lit ticks | `Intent.wealthLevel ∈ [0, 1]` (§7.7: the field's `characterOffset`, the join bonus, parks) and the roster's household band shares (§10.2) | T12; NEVER copied into a band field (conflict 4.7) | — | D (the label) → M (the field, the bands) | C k, k-ticks, m§2; T12 P |
| 43 | `economicState.incomeSources[] {source, percentage, weight, desc, priorityNote}` — 30 sources; percentages sum to 100 in 155 of 155 | item 72 (d4)'s ECONOMY DIAL (each sector's market share) | T13; a sector's share = Σ of its sources' percentages ÷ 100 | — | D | C k; T13 P |
| 44 | `primaryExports[]`, `primaryImports[]`, `transit[]`, `localProduction[]`, `necessityImports[]` — label strings, no partner, no direction | item 72 (a)(3)'s trade position: goods → our `ResourceRow` ids (§10.2) → the classes that make or handle them and the mode that carries them (road, river, sea), weighting gates and the harbour (part 3 R4) | a label → resource-id table (SF's goods catalogue ids appear only in `tradeLinks.goodId`) | — | D | C m§6–§7; P |
| 45 | `isEntrepot` (and `transit[]`) | the warehouse and entrepôt-quay weight at the harbour or the busiest gate | boolean → weight | — | D | C m§6; P |
| 46 | `activeChains[] {needKey (11), chainId, resource, processingInstitutions[] (NAMES), outputs, upstreamChains, status (vulnerable 726, operational 696, running 397, impaired 177, entrepot 128, magically_sustained 10), dependency}` | evidence of which of OUR supply edges (§10.2 `SupplyEdge`, item 16 (b)) run in this town: a soft co-location row between the classes of a chain's processors that are on the roster | processor names join a record in 2 585 of 3 381 (76 %); the 796 others (27 names) are catalogue prototypes or other-size variants (`Parish church` against `Parish churches (10-30)`, `Merchant guilds (3-8)` against `(15-40)`, `Courthouse`, `Cathedral`, `Theater` …) → resolve by kind family (strip the range, singular and plural), else "no local processor" | chain keys stable (m§14) | D | C k; P |
| 47 | `tradeDependencies[] {institution, resource, severity, impact, affectedServices}` (the institution joins in 1 001 of 1 001) | a soft `nearGate` or `nearHarbour` row on that institution, weighted by severity, the mode from the access key | severity → weight | — | D | C k; P |
| 48 | `tradeLinks[] {good, goodId, direction (import / export), partner (a NAME), viaNeighbour, viaCategory?}` — only when the town was generated with an imported neighbour (4 links in 1 of 155) | item 72's trade term: a named partner with goods and a flow direction → the partner key for a seeded bearing (part 3 R3) | `direction` is the FLOW, not a compass direction | goods ids stable; partner by name | D | C k, o§5.3 |
| 49 | `neighborRelationship {name, tier, relationshipType, …, tradeRoute (the neighbour's ACCESS KEY)}`; `neighbourNetwork[] {id (link_*, generated_*, live_*), name, relationshipType (LIVE)}` | partners of the trade term; hostile and rival partners carry no trade weight | relationship vocabulary → partner weight | persisted link ids stable | D | C m§7, o§3.5 |
| 50 | `foodSecurity {storageMonths, deficitPct, surplusPct, importPct, chains {Grain & agriculture, Pastoral & livestock, Fishing & water, Hunting & foraging, Trade & imports}, …}` (storage and deficit LIVE) | §4.9's farm table: which hinterland land uses exist and the share of food arriving by gate or harbour | booleans → land-use presence; importPct → a trade weight | — | D | C m§6; P |
| 51 | `safetyProfile {safetyLabel, crimeTypes, blackMarketCapture, flags …}`; `powerStructure.criminalCaptureState` (none 102, adversarial 41, equilibrium 10, corrupted 2) | no field (gap G-D12) | — | — | D | C k, m§6 |
| 52 | `compound.inst.has*` (32 booleans) | `Blueprint.toggles.walls` (`hasWalls` = `hasGates` in 155 of 155: 104 both true, 51 both false); otherwise redundant with the institution list | boolean → toggle | — | D | C k |
| 53 | `availableServices` (11 buckets `{name, desc, institution}`; the institution joins in 8 933 of 9 065 — the 132 others are six parenthesised pseudo-names, `(arcane underground)`, `(street gang)`, `(smuggling)`, `(lawless)`, `(informal)`, `(covert)`) | none structural (gazetteer text, the clerk); a pseudo-name hints at a presence the dossier lists as no record — the map invents no institution for it | — | — | D (text) | C k |
| 54 | `economicViability`, `economicComplexity`, `situationDesc`, `institutionalServices[]` (lower-case names; 578 of 578 join case-folded), `treasury.coin` (dark), the `config.priority*` sliders | none: the sliders are SF's generation inputs whose effect already sits in the institutions and the income shares — reading both would count them twice | — | — | ignored | C k, m§6; J-M5 |

### 1.6 Power and politics

| # | SF record.field | design consumer | transformation | id stable? | tier | label |
|---|---|---|---|---|---|---|
| 55 | `powerStructure.government` = `governingName` — 17 names (Town Council 25, Feudal Stewardship 19, Elder Council 16, Elected Reeve 16, Grand Council 15, Household Council 12, City Council 11, Guild Council 10, Merchant Guild Council 9, Free Elder Council 7, Grand Guild Consortium 7, Noble Governorship 2, Feudal Appointee 2, Merchant oligarchy 1, Merchant City Council 1, Church Council 1, Ducal Governorship 1) | `Government.kind` (§2.7) → its `GovernmentRow` offices and forced seats (§10.2) | T14 | a name | D → M | C k; T14 P |
| 56 | `powerStructure.factions[] {faction (a NAME), category, power, rawPower, powerLabel, desc, isGoverning?, modifier?, captureState?, legitimacyCrisis?}` — 2–10 per settlement; 44 names; categories economy 295, military 146, noble 124, religious 116, government 114, criminal 53, other 47, magic 46 | the `Faction` record (§2.7: kind, influence, secret, seats, turf) and item 72 (d″)'s power dials; `isGoverning` names the government's power | T15; `power` → `influence` normalised to sum 1 over the settlement's powers; binding key `power:<slug>` (an authored `faction.id` wins when present, m§1) | NO id; name-keyed; renames cascade in SF, and a coup can rename the governing power | D | C k, m§5; T15 P |
| 57 | `factionRelationships[] {pair [a, b] (names), type (dependent 273, tense 178, subordinate 134, competitive 134, symbiotic 66, corrupted 4), direction, ratio, captureState, narrative}` | no field (gap G-D1 (c)) | — | a pair of names | D | C k |
| 58 | `publicLegitimacy {score, label, breakdown}`, `stability`, `recentConflict`, `previousGovernments[]` | no field (gap G-D1 (d)); `previousGovernments` → historical names only | — | — | D | C m§2 |
| 59 | `controlledInstitutions` on a power — SIMULATOR-written (absent at generation), keyed by `catalogId`: 28 of 28 resolve to a kind of the same dossier; two powers may hold one kind; the lists come and go week by week | item 72 (d″)(1)'s class-to-power association is "dossier-overridable": this is the override; a kind two powers hold → item 72 (d5)'s partition by relative standing | catalogId → our class; volatility → the association moves only past a hysteresis at an epoch | catalogIds stable | D | C k-ticks, o§4; P |
| 60 | `controlsInstitutionIds`, `fundsInstitutionIds`, `staffsInstitutionIds`, `protectsInstitutionIds` (declared in SF's propagation model, NEVER generated) | the same association, weighted 1.0 / 0.6 / 0.5 / 0.4 as partition weights — an OPTIONAL field used when present | — | — | D (when present) | C m§4 |
| 61 | top-level `factions[]` (NPC social groups `{name, members[] (full NPC copies), powerFactionName}` — `powerFactionName` joins a power in 393 of 393), `conflicts[]` | none (people-side narrative) | — | a name | ignored | C k, m§3 |
| 62 | campaign politics outside the dossier (`worldState.politicsLedgers` blocs, `factionPairStates`, `occupations`) | none (at most an optional input) | — | bloc ids | ignored | C m§5 |

### 1.7 People

| # | SF record.field | design consumer | transformation | id stable? | tier | label |
|---|---|---|---|---|---|---|
| 63 | `npcs[] {id, name, gender, role, title, category, institution (a NAME: present on 92 of 1 440, joining 92 of 92), factionAffiliation (a power NAME: 1 440 of 1 440 join), importance, status and linkedInstitutionIds (names; 44 of 44 join) on structural seats, corrupt, corruptionVector, corruptTies, secondaryAffiliation, plotHooks, secret …}` | no record for a dossier-named person (gap G-D5); nearest: a pinned `Person` (§2.7, `derived: true`, pinned fields only by an explicit edit, §10.3), `Membership {person, faction, role}`, `Posting {workplace, profession, filledBy}` (§2.7) | id shapes: `npc_<n>` 1 288, `npc.<power>_<role>_<i>` for structural seats, `npc.successor_<n>` after ticks | `npc_<n>` survives reload and edits, NOT a regeneration or a reroll (renumbered); a successor takes a NEW id | D | C k, k-ticks, m§1 §3; P |
| 64 | `relationships[] {npc1Id, npc2Id, type, strength, tension …}`, `prominentRelationship` | the module's relation store (`Relation`, §2.7; `@plat/sim`), between the persons bound to the two NPC ids | SF type → `Relation.kind` | a pair of NPC ids | D | C m§3; P |
| 65 | households, families, classes, occupations — ABSENT | `Household`, `Person`, `FieldBands`, the roster (§2.7, §10.2) — all tier M (part 3 R7–R8) | — | — | — | C m§3, o§3.4 |

### 1.8 Defence, religion, history, conditions

| # | SF record.field | design consumer | transformation | id stable? | tier | label |
|---|---|---|---|---|---|---|
| 66 | `defenseProfile.institutions {walls[], garrison[], militia[], watch[], mercenary[], charter[], magicDef[]}` (full copies of institution records, bucketed); wall records per settlement: 0–2 (towns 0 / 1 / 2 = 5 / 15 / 18 of 38) | the walls bucket → `Blueprint.toggles.walls` and the enceinte count; `Citadel` → S0's castle or citadel row (§4.2 S0); garrison and watch → the government's military share (guard posts, barracks, §10.2) | bucket → toggles; the copies duplicate `institutions[]` records — deduplicate by binding key | — | D | C k, m§8; P |
| 67 | `defenseProfile.scores`, `readiness {score, label (Fortress, Lightly Defended, Vulnerable …)}` | `Intent`'s defence level (§7.7) | label → ordinal | — | D | C m§8; P |
| 68 | `config.primaryDeitySnapshot` (by assignment only; generation writes no faith record on the branch); `culturalIdentity.sacredLife` (prose); religious institutions; the Religious Authorities power | `Religion` (§2.7: deities, practiceShare, clergyPerThousand, temples, faction): the deity → `deities[0]` and dedication names; temples are the religious institutions' placements | — | `_deityRef` is a catalogue key | D | C m§9 |
| 69 | `history {age, founding {…}, historicalEvents[] {yearsAgo, type (economic, political, disaster, religious, magical, demographic, occupation_infiltration, exile_return), severity …}, currentTensions, eventsTimeline, legacyAnnotations, siegeNarrative}` | no generation-time consumer (gap G-D9) | — | names; derived `event.<slug>` | D | C k (8 types), m§10 |
| 70 | `activeConditions[] {id condition.<archetype>.<suffix>, archetype, severity, severityBand, status, triggeredAt {tick, sourceEventType}, duration}` — 12 archetypes at birth (war_pressure, regional_authority_instability, regional_tax_revenue_disruption, dominant_npc_removed, famine, faction_challenge, plague, regional_migration_pressure, rebellion, regional_criminal_pressure, regional_religious_pressure, vassal_extraction); later also reconstruction, boom, bust, resource_strike, vein_exhausted, corruption_exposed, stressor_residual, custom_crisis | no live field (gap G-D7): item 67 (i)'s share of buildings in works and overlays; `EpochInputs.circumstances` and `events` at epochs (§4.11) | T16 | condition ids stable | D | C k, k-ticks, m§11, g§6.3 |
| 71 | `stress` = `stressors` (null 97, one object 38, an array 3 — the port normalises; 14 of the 15 types seen) | `EpochInputs.events` kinds (§4.11) and row 70's overlays | T16 | — | D | C k, o§3.2 |

### 1.9 Custom content, canon, edits, receipts, clock

| # | SF record.field | design consumer | transformation | id stable? | tier | label |
|---|---|---|---|---|---|---|
| 72 | `customContentProvenance`, `customContentRoster` (when custom content was in scope) | the port's list of custom definitions; the class fallback for custom kinds (row 39) | — | definition ids stable | D | C o§3.5, g§2.7 |
| 73 | `_userEdits`, `userCanon`, `canonStatus`, `locked`, the save's `locks`, `dmLayer` | the DM's own facts are dossier facts like any other — a DM rename is a dossier rename (a protected name on the map); no other consumer | — | — | D | C m§13, g§5.4 |
| 74 | `decrees[] {id, op, status, orderIndex, tickRef, chronicleRef …}` and the week's `pulseRecord.decreeCauses[]` | the change feed's cause, source `decree` (part 5) | — | decree ids stable | D (receipts) | C g§5.4 |
| 75 | `campaignState.eventLog[]` (canon only), `tierHistory`, `populationHistory`, `institutionHistory`, `resourceHistory`, `calamityHistory` (capped lists) | the change feed's receipts and weeks (part 5) | — | event uuids, outcome ids | D (receipts) | C g§6.5, §7 |
| 76 | the clock (CAMPAIGN state): `worldState.tick`, `calendar {elapsedWeeks, month, year, season}` — one tick is one week; a 52-week year of 4-4-5 months; 13-week seasons, spring first | our week field and item 67's `Works` (part 5; conflict 4.8) | integer weeks, no conversion | — | D | C g§6.1, §6.6 |
| 77 | `arrivalScene`, `pressureSentence`, `settlementReason`, prose of every kind; `simulationTrace` (23 % of a dossier's bytes); `generationCoherenceReceipt`; `structuralViolations`, `structuralSuggestions`; `coherenceNotes`; `aiOverlays` | none (the clerk may read the prose) | — | — | ignored | C o§3.2 |

### 1.10 The enumeration tables the port needs (T1–T16)

Every table below is OUR data (a `@plat/tables` row set with provenance, editable and calibratable, §7.6), written
here as the proposal the plan seat can adopt or change; the SettlementForge vocabularies they read are C (k and the
sources cited); every right-hand side is P. None of them copies a SettlementForge table: they map its words onto our
records.

**T1 — tier and population → our product and rung.** §1.1: the population chooses the rung (TOWN [1 500, 10 000), CITY
[10 000, 30 000), METROPOLIS [30 000, 120 000]); below 1 500 is the staged village product (PART III).

| SF tier (its band, m§2) | our product and rung | the 155 generated dossiers (k, `census3.out`) |
|---|---|---|
| thorp (8–60), hamlet (61–400), village (401–900) | village product (staged) | 70 of 70 |
| town (901–5 000) | 901–1 499 → village product (staged); 1 500–5 000 → TOWN | 33 TOWN, 5 village product (the smallest 1 105) |
| city (5 001–25 000) | 5 001–9 999 → TOWN; 10 000–25 000 → CITY | 20 CITY, 4 TOWN |
| metropolis (25 001–100 000) | 25 001–29 999 → CITY; 30 000–100 000 → METROPOLIS | 21 METROPOLIS, 2 CITY |

**T2 — `terrainType` → S0's site request (§4.2 S0).** plains → no water feature beyond the site row's own P(river);
riverside → a river through the site, its inflow bearing seeded on `blueprint.features`; coastal → a coast, its side
seeded, a harbour by T3; hills → the hill relief row; mountain → a spur or terrace relief row (a pass when the deposit
`defended_pass` is present); forest → the forests toggle on and woods in the hinterland; desert → an arid biome (a pond
or lake only with `oasis_water`). SettlementForge's older words (grassland, river, swamp — the working tree's, m§2) map
to plains, riverside, and plains with a marsh land use.

**T3 — `tradeRouteAccess` → gates and arterials.** road → 2 gates on one through road; crossroads → 3–4 gates on two
through roads; river → 1–2 gates, a water gate and docks, the river as a route; port → a harbour basin and 1–2 gates;
isolated → 1 gate and a track-class approach; `none` → 1 gate, no through road; `mountain_pass` → 2 gates on one route
through a pass; `random_trade` never reaches a dossier (SettlementForge resolves it first, g§2.2 — P). Walls come with
gates in every generated dossier (row 52), so an unwalled settlement's "gates" are its road entries (junctions of
kind `gate` without an enceinte).

**T4 — `monsterThreat` → defence level.** safe 0.1, heartland 0.2, civilized 0.3, frontier 0.6, plagued 0.8 (our
ordinal values, calibratable).

**T5 — deposit keys → resource family and hinterland land use.** `iron_deposits`, `precious_metals`,
`gemstone_deposits`, `coal_deposits` → ore / `mine`; `stone_quarry` → stone / `quarry`; `managed_forest`,
`mountain_timber`, `shipbuilding_timber` → timber / `lumber`, `coppice`; `ancient_grove` → timber / `reserve` wood;
`fishing_grounds`, `river_fish` → fish / `fishery`; `river_clay`, `glass_sand` → clay / `claypit`; `grain_fields`,
`fertile_floodplain` → fertile / `arable`; `grazing_land`, `alpine_pasture`, `camel_herds` → fertile / `pasture`;
`date_palms` → `orchard`; `salt_flats`, `desert_salt` → `saltpan`; `marshlands` → a `marsh` land use (and the `dry`
row of row 34); `hunting_grounds`, `foraging_areas` → `wildwood`, `commons`; `deep_harbour` → P(harbour) = 1;
`river_mills` → mill classes on the river; `hot_springs`, `hot_springs_mineral` → a bath-house site or a decoration;
`magical_node` → II.6's supply and a `Decoration`; `ancient_ruins` → a ruin `Decoration`; `crossroads_position` → a
second through road; `defended_pass` → a pass toward one seeded bearing; `oasis_water` → a pond or lake; a custom deposit
(e.g. `Aurora Grain`) → by its custom kind. A depleted deposit → its land use drawn worked out (a spoil heap, a stump
field).

**T6 — quarter names → the district identity they claim.** Market Quarter → the market identity; Religious Quarter →
temple; Noxious Trades Quarter → craft with the noxious rows; Waterfront District → docks (port) or riverbank (river);
Government Quarter → the government seat's district (castle or central); Mages' Quarter → an arcane identity row (ours,
new); Artisan Quarter → craft; Shadows District → no kind: a low-band and hidden-share bias on the district that takes
the name; Wealthy Residential, Common Residential → no kind: band biases (`characterOffset`); Alehouse & Common,
Fishing Landing, Woodcutters' Ground → village-product rows (staged).

**T7 — location phrases → soft relation rows.** "Downstream/downwind" → `downstream` + `downwind`; "Defensible high
ground", "High ground, good views" → `highGround`; "Central", "Village centre" → `nearCentre`; "Along the river", "Along
the coast", "At the water's edge" → `nearWater`; "Between market and residential" → `nearMarket`; "At the forest edge" →
the edge toward the wood land use; "Isolated area (safety concerns)" → `far` from the centre; "Old town or slums" → the
oldest growth stage and a low band; "Spread throughout" → no district (the Common Residential claim is dispersed);
"Eastern district (traditional)" → a soft east bearing at a low weight (it is the same phrase on every Religious
Quarter in every culture, so it reads as a SettlementForge placeholder — o§8 Q2 asks the owner).

**T8 — landmark strings → the feature that carries the name.** Row / Street / Lane / Close / Alley words ("Tannery
Row", "Tanners' Lane", "Weavers' Street", "Cooper's Close", "Warehouse Row", "Noble's Row", "Blind Alley") → a way's
`name` in that district, of the class the word names (Row and Street → lane or secondary; Lane → lane; Close →
`cul_de_sac`; Alley → `alley`); "Dyer's Bridge" → a bridge; "Main Wharf", "Barge Wharf", "River Landing" → a quay;
"Common well" → a `well` pin; "Notice post" → a pin (no `Pin.kind` fits — gap G-D8); "Slaughterhouse" → the name of a
noxious-trade use the roster already places there; "Merchant Estates", "Garden District", "Sailors' Quarter" → a
sub-area label (a `SubDistrict` or a quarter-tree node); "The Warren (slums)" → the name of an informal cluster or back
court (item 70, item 30); "The Rat's Nest (tavern)" → a tavern use's name; "Drying racks" → yard parts of the fishing
landing. The map places nothing for a string that its roster does not already demand (J-M2).

**T9 — institution record → assignment granularity and item 72 (d′)'s distribution.** A record with a count range →
`dispersed` (distribution DISPERSED); a district-scale kind (row 30) → `neighbourhood` (DISTRICT-DEFINING); an anchor
(a cathedral, the palace or citadel, a university, a great market) → `building` (SINGULAR / ANCHOR); every other record
→ `building`; the housing-stock records → no assignment.

**T10 — SF catalogue kind → our class.** An exact `catalogId` row first; else the family by `category` and `tags`;
else the category's generic class, reported. The rows (≈ 280 catalogue kinds on the branch) are the plan's apply-step
work, not this file's.

**T11 — status and fate → our response** (g§8.2 rows 1–4, re-stated on our records):

| SF | our response |
|---|---|
| absent, `active` | the use open in its building |
| `impaired` + `impairments[]` | physical types: `condition` one step down per severity band (≥ 0.34 worn, ≥ 0.67 neglected) and a damaged look; restoration → item 67's repair `Works`; non-physical types: the institution dial only (J-M3) |
| `remnant` (and the fates `survives_as_remnant`, `downsized`, `reduced_to_watch_post`) | the use kept at a smaller designation — item 18's mutation in place |
| `privatized` | the use converts to a private class; the building kept (item 18) |
| `captured_by_local_powers` | the power association changes (row 59); the building kept |
| `removed`, and the fates `hollowed_out`, `abandoned`, `bankrupt`, `closed_for_want_of_custom`, `shuttered` | `unassign` → `closeUse` → the plot vacant (item 22 (a)); item 67 (f)'s slow ruin only if it stays vacant |
| `ruined` (calamity), `destroyed`, `destroyed_by_disaster` | the housing building to `ruined` — a fire in one week (item 67 (f)) — the element still listed by the dossier (conflict 4.9) |
| `vacant` (SF: a seat without an office-holder) | no physical change |

**T12 — `economicState.prosperity` → `Intent.wealthLevel`.** Subsistence 0.05, Struggling 0.2, Poor 0.35, Moderate
0.5, Comfortable 0.65, Prosperous 0.8, Wealthy 0.95 (equal steps; ours, calibratable).

**T13 — income sources → item 72 (d4)'s sectors.**

| sector (ours) | SF income sources (k: count of dossiers; median share %) |
|---|---|
| trade | Market Taxes (97; 22), Entrepôt Trade (16; 13), International Commerce (3; 12), Port Duties (14; 21) |
| taxes and tolls | Gate Tolls (34; 8), Toll Revenue (22; 13), River Tolls (11; 14), Court Fees & Fines (75; 7) |
| crafts | Iron & Metalwork (101; 7), Wool & Textile Trade (41; 7), Guild Fees (56; 14), Guild Licensing (20; 17), Apothecary & Alchemy (66; 3), Herbalist & Apothecary (32; 4) |
| agriculture | Agricultural Rents (70; 81), Grain Sales (41; 5) |
| extraction | Stone Quarrying (29; 5), Timber Trade (28; 6) |
| fishing | Fish & Preserved Produce (26; 7), Fish & Maritime Produce (23; 6) |
| finance | Banking Fees (49; 11), Financial Services (21; 13) |
| religion | Church Tithes (9; 8) |
| military | Military Levy (1; 7) |
| magic | Spellcasting Services (42; 4), Arcane Industry (12; 6) |
| crime | Criminal Syndicate Revenue (8; 11), Smuggling Network Revenue (7; 11), Black Market Revenue (3; 10) |
| none (neutral: spread over every class by significance) | Property Rents (85; 9) — J-M6 |

**T14 — government name → `Government.kind` (§2.7).** chartered_commune ← Town Council, City Council, Grand Council,
Guild Council, Elder Council, Household Council, Free Elder Council, Elected Reeve, People's Council; merchant_oligarchy
← Merchant Guild Council, Merchant City Council, Grand Guild Consortium, Merchant oligarchy; seigneurial ← Feudal
Stewardship, Feudal Appointee, Noble Governorship, Ducal Governorship; ecclesiastical ← Church Council; crown ← none
seen (P: a royal seat is a fact SettlementForge's outputs here never carry); an `Occupation Authority` power → an
occupation mark on the seat, not a government kind.

**T15 — power category → `Faction.kind` (§2.7) and item 72's power family.** economy → `guild` when the name says craft
(Craft Guilds), `company` when it says merchant, trade or grain (Merchant Guilds, Merchant oligarchy, Grain Holders);
religious → `religion`; noble → `lordship` (Noble Families, Noble Houses, Landed Gentry, Manor Household); government →
`council` (a council) or `lordship` (a stewardship or governorship); criminal → `criminal`; military → NO KIND FITS
(gap G-D1 (a)); magic → NO KIND FITS (gap G-D1 (a)); other → `council` for the crisis blocs (Claimant Bloc A / B, Peace
Faction, War Council, Quarantine Council, Departure Committee, Investigation Faction, Third Bloc (Neutrals), Rival
Faction B, Creditor's Representative, Reform Congregation, People's Council, Resistance Network, Occupation Authority)
and `company` for Monster Hunters / Adventurers; `Unknown Faction (hidden)` → `secret: true`.

**T16 — conditions and stressors → overlays and item 67's rate modifiers.** under_siege, war_pressure → a siege overlay
and building works paused (fortification repair excepted); plague, plague_onset → quarantine marks, works slowed;
famine → works slowed and §7.7's market activity scalar lowered; mass_migration, regional_migration_pressure → item 70's
tent clusters at the edge; occupied, vassal_extraction → an occupation mark on the seat; reconstruction → the repair
share of works raised; boom → the construction share raised; bust → vacancies raised; resource_strike, vein_exhausted →
a hinterland land use opened or closed; monster_pressure → the defence level up and wall-repair works; religious_conversion
→ a temple's dedication at the next epoch; the political ones (rebellion, insurgency, faction_challenge,
politically_fractured, succession_void, dominant_npc_removed, corruption_exposed, infiltrated, recently_betrayed,
indebted, the regional_* archetypes) → no physical overlay: the dials at the next epoch.

## 2. Gaps in the DESIGN — dossier facts the map should use but has no field for

Each gap names the dossier fact (C, from part 1's row), what it would drive, the design as it stands (C, from this
lane's reading of `docs/ARCHITECTURE.md` at e9c0b828…; items 63–72 and 20 (h) are not yet applied there — pass c applies
them), and a proposal for the plan seat (P). BASE = needed from M1 for the design's own roster to stand in for the
dossier (item 20 (h)'s scope for (i)–(iii)); STAGED = a hook now, filled at the SettlementForge stage.

| id | dossier fact (row) | what it would drive | the design today | proposal (P) | base or staged |
|---|---|---|---|---|---|
| G-D1 (a) | power categories `military` (146 records) and `magic` (46) (row 56) | item 72 (d″)'s power dials for the garrison and the arcane orders | `Faction.kind` ∈ guild, religion, lordship, company, criminal, council (§2.7) — no military or arcane kind | add `military` and `arcane` to `Faction.kind` (or make the kind a data row) | BASE (the enumeration) |
| G-D1 (b) | the powers themselves with their standing (row 56) | item 72's political term and both power dials | `Faction` is "base schema from M1, materialised by the module" (§10.1) — the base never materialises it | the base materialises one `Faction` per dossier power at S2 (the design's own roster stands in: powers from its government and religion rows) with `influence` = the normalised standing | BASE |
| G-D1 (c) | `factionRelationships[]` pair types (row 57) | item 72 (a)(2)'s alignment; adjacency of allied and rival quarters (symbiotic near, competitive and tense apart) | no field: `Relation` is person to person (§2.7) | a `PowerRelation {a, b, kind, strength}` read by §4.5's typing as a soft adjacency row | STAGED |
| G-D1 (d) | `publicLegitimacy`, `stability` (row 58) | the governing power's institution dial (a contested seat neglected, a legitimate one kept) | no field | a scalar on the government record, read by the dial table | STAGED |
| G-D1 (e) | shared control of one kind by two powers (row 59) | item 72 (d5)'s partition | `Institution.faction?: Id` holds one power | `Institution.powers: {faction, weight}[]`, weights normalised to one (the class-to-power table's default, the dossier's override) | BASE (the shape) |
| G-D1 (f) | the standing's history (rows 56, 59 are live and volatile week to week) | item 72 (d″)(4)'s recomputation with hysteresis | no memory of the standing a dial last applied | a per-power `appliedStanding` memory beside `influence`, moved only past a hysteresis at an epoch (as `FieldBands` keep band memory) | BASE (the field) |
| G-D2 | trade: goods, modes, entrepôt, tolls and port duties, named partners when a neighbour exists (rows 10, 43–49) | item 72 (a)(3)'s trade position and the weight of each gate and the harbour | no record of trade partners, directions or gate weights; `Way.from / to` can name an "external bearing" (§2.4) and S0 takes coast and river bearings | a derived `TradeFlow` record (tier M): partners `{key, mode, weight, bearingCdeg, source: 'dossier' / 'derived'}`, per-gate and harbour weights; read by S3's gate siting, §4.3's arterials and §4.5's field drivers; the optional realm block (s C-9 (a)) replaces derived bearings when present | BASE (the record; our roster's circumstances fill it standalone) |
| G-D3 | `incomeSources` shares (row 43) | item 72 (d4)'s economy dial | no sector list, no class-to-sector table, no input slot | a `sectors` table (T13's left column), a class-to-sector table, and `EconomyShares {sector → share}` in the recipe's circumstances (the dossier's T13 sums; the standalone default an even mix) | BASE |
| G-D4 | the settlement's prosperity band (row 42) | coherence of the whole town's wealth with the dossier | `Intent.wealthLevel` exists; nothing checks the result against the input's band | a coherence bar: the population-weighted mean household band lies within one band of T12's mapped band | BASE (the bar) |
| G-D5 | named notables — role, workplace institution, power, importance, successor ids (row 63) | their houses and seats on the map, labels ("the house of …"), the clerk's answers | people are derived (`Person`, pinned only by an edit, §10.3); `Membership` and `Posting` live in the module's relation store | a dossier-backed person: a pinned `Person` carrying `Identity.dossier` (the NPC key), housed by rule (a household in its institution's or power seat's district, its band raised by importance), with a `Posting` at its named institution and a `Membership` in its named power | STAGED |
| G-D6 | non-physical impairments — legitimacy, influence, wealth, staffing, corruption (row 38) | the institution dial (a corrupted guildhall neglected) | `Building.condition` is wear only (§2.6) | an impairment-type table: physical types → condition (T11), the others → a negative dial term | STAGED |
| G-D7 | live conditions and stressors — siege, plague, famine, occupation, migration, boom, bust, reconstruction (rows 70–71) | overlays between epochs and item 67 (i)'s share of buildings in works | epochs carry `circumstances` and `events` (§4.11); nothing holds a condition between epochs | a `ConditionOverlay` record `{dossier key, archetype, severity, sinceWeek, untilWeek?}` read by the renderer, item 67's scheduler and the clerk — no geometry | STAGED (item 67's hook) |
| G-D8 | given names: quarter names (row 19), landmark strings (row 21) | district and feature names that match the dossier | names are drawn by S13a; a given name enters only by `setAttr` or `Assignment.name`; an assignment's `target` is "one building / plot or one district" (§7.7) — a way, bridge or quay is not a target, although `Identity.dossier` foresees "a named feature: a bridge, a well, a gate" (§2.8); `Pin.kind` has no notice post | the quarter claim as a `neighbourhood` assignment with `name`; a named-feature assignment whose target may be a way, a bridge, a quay or a pin; a `notice` pin kind | BASE (the target kinds), STAGED (the port's use) |
| G-D9 | pre-creation history — age, founding, historical events (disaster, siege, occupation …) (row 69) | the old town's extent (S5's stage count), ruins and scars at generation, item 65 (b)(1)'s buried old town | no generation-time input; history starts with the document's epochs | a `HistoryHint` input to S0: stage count from `age`; a scar list from event types (a fire-rebuilt block, a breached-and-repaired wall run, a ruin decoration) | STAGED |
| G-D10 | the deity and faith shares (row 68) | temple dedications and the church's weight | `Religion` exists (module-tier schema, §2.7) | the port fills `Religion.deities` and `practiceShare`; the base materialises it when a dossier is present | STAGED |
| G-D11 | food security and isolation paths (rows 17, 50) | the hinterland's size and its land-use mix | §4.9 sizes the hinterland from the roster (FTG's order) | a hinterland row reading `importPct` (less own farmland when food is imported) and the chain booleans (which land uses exist) | STAGED |
| G-D12 | crime and safety — `blackMarketCapture`, `crimeTypes`, `criminalCaptureState`, `safetyLabel` (row 51) | item 30's hidden-plot share and item 64's access and concealment rates | the shares are keyed by band only (§4.6; item 64 (b)) | a crime term on both rows (table columns) | STAGED |
| G-D13 | named deposits with state — depleted, discovered, removed (row 15) | the hinterland's worked-out mines and new pits | `SiteResources` is a raster (§2.7); no record per deposit | a `DepositSite {dossier key, family, state, bearingCdeg, landUse}` anchoring its land use; a state change converts the land use | STAGED |
| G-D14 | the week and the cause of every dossier change (rows 40–41, 74–76) | item 67's `Works` start week; the disruption report's reasons | `EditBase.dossier` is `DossierRef {element, version?}` (§7.1) — no week, no cause, no fate | an optional `EditBase.dossierChange {changeId, week, source, cause?, fate?, reason?}` (`week` null for a draft) (g§8.3's envelope, on our side) | BASE (the optional field) |
| G-D15 | the tier moving under the simulator or a `SHIFT_TIER` (rows 5–6) | a rung change when the population crosses a band of §1.1 | the recipe's rung is fixed; §4.11's growth path adds stages; nothing states what a crossing of 10 000 or 30 000 does | the rung profile read at each epoch's `populationTarget` (a rung is a `ladder.json` row on one pipeline, §1.1), the frame grown with it | BASE (the rule) |
| G-D16 | a ruined institution still listed by the dossier (row 37, T11) | the ruin shown as the dossier's element | a dossier-backed use is open, or closed by a dossier removal (§7.7 item 2); no state for "listed but ruined" | `Assignment.state ∈ active, ruined, removed` (or a `Use` state), the building `ruined`, §5.3's dossier row counting a ruin as present | BASE (the state) |
| G-D17 | custom-content weights — `CRITICALITY`, `ECONOMIC_WEIGHT`, `DEFENSE_ROLES`, `POWER_AUTHORITIES` (m§13) | item 72 (d″)(3)'s significance and the power association of custom kinds | no reader | a fallback row reading them for custom kinds | STAGED |

## 3. Gaps in the DOSSIER — and how the map derives each (owner rule item 20 (h))

The dossier holds no coordinate of anything, no quarter geometry or adjacency, no street, road, wall line, gate
position or river course, no plot, building, household or class, no institution-to-quarter assignment, no faction seat
or territory, no bearing to any neighbour and no settlement-level trade direction (C: o§6.2's key scan of 167 files;
m§12; s§4). Under item 20 (h) every one of these is a MAP FACT: derived from what the dossier does hold, by our rules,
before any chance; never a request to SettlementForge; an optional field is used when present and never required. The
table below is the candidate for §7.7's DERIVATION TABLE (item 20 (h) (ii)): one row per map-fact family, the dossier
inputs it reads (part 1's rows), the rule or table, where seeded chance enters (the stream is the fact's own, §6.1), the
coherence bar it must hold (item 20 (h) (iii)), and the optional input it takes when present. Every cell is P except
the design references, which are C. With no dossier (standalone), the design's own roster and blueprint are the inputs
of every row — the same rows, so connecting the dossier later changes inputs, not rules.

| id | map fact (tier M) | dossier inputs (part 1 rows) | rule or table (design) | seeded chance enters | coherence bar (never contradict) | optional input, used when present |
|---|---|---|---|---|---|---|
| R1 | site geometry: relief, coast and its side, river course and inflow bearing, lake, marsh | terrainType (9), tradeRouteAccess (10), deposits `deep_harbour`, `river_mills`, `marshlands`, `oasis_water`, `defended_pass` (15), culture key (13) | T2; S0's site request; S1's terrain and hydrology (§4.2) | `blueprint.features` (bearings and auto features), then S1's streams | a coastal dossier has a coast, a riverside one a river, a `port` one a harbour basin, a `river` one docks on the river | the realm block: the cell's terrain, river flag and coast (s C-9 (a)) |
| R2 | walls, enceintes, gates (count and position) | walls bucket and `Citadel` record (66), `hasWalls` (52), access (10), population (6), threat (11), readiness (67) | T3's gate counts; S0's walls and castle toggles; S3's gate law; §4.8 | S3's siting streams; the bearings of R3 | walls exactly when the dossier lists a wall institution; the gate count inside T3's row; a `Citadel` record → a citadel | the realm block's gate cells as bearings |
| R3 | arterials and the external bearing each leaves by | access (10), neighbours and their relationship types (48–49), trade links (48), toll and port-duty shares (43), deposits (15), `defended_pass` | §4.3's routing between destinations; one arterial per through route of T3; each partner and deposit given a bearing | each bearing on ITS OWN stream keyed by the partner's or deposit's dossier key, so it never moves when unrelated facts change (s C-9 (b)) | hostile and rival partners carry no trade road; a named partner keeps its bearing across dossier changes | true bearings from the realm block: first turn the map's north (the geo anchor's `bearingDeg`), then move gates only for the residual, by least disruption (s C-9 (c)) |
| R4 | trade flow: the direction trade mostly comes from; per-gate and harbour weights (item 72 (a)(3)) | R3's partners and bearings, goods lists (44) mapped to modes, `isEntrepot` (45), `tradeDependencies` (47), trade and toll shares (43), `importPct` (50) | G-D2's `TradeFlow` record: a gate's weight = Σ over the partners and goods routed through it; road versus water split by the T13 trade and toll shares; entrepôt raises the harbour or the main gate | none (a function of R3) | weights sum to one; a port's harbour carries the sea share; nothing states a partner the dossier does not name except R3's derived ones, marked `source: 'derived'` | SF's campaign `tradeFlow` or `supplyShipments` tallies, if the host ever passes them |
| R5 | districts: count, kinds, boundaries, names | population (N_q law, §4.5), quarter claims (19–20), district-scale records (30), culture key (13: planned ↔ organic via the forms catalogue), power seats (R11) | S6's grower and typing (§4.5); item 72 (d′)'s quarter identities; T6 and T7 as soft rows; a quarter name goes to the district whose emergent identity best matches it (J-M1) | S6's typing random term and growth streams | each dossier quarter name on exactly one district; each district-scale record claims exactly one neighbourhood; no district class-named (J-P1) | — |
| R6 | the prosperity field and each plot's bands | prosperity label (42 → T12's wealthLevel), income shares (43 → the economy dial), power standings (56, 59 → the power dials), crime (51 → G-D12), quarter hints (Wealthy / Common Residential, "Old town or slums", Shadows District: 19–20) | §4.5's field `P(x)` with `characterOffset` from the wealth level and item 72's dial terms; the band set; item 72 (d‴)'s neighbourhood range | the field's ε: a low-frequency fBm on the field's own sub-stream, declared share 0.15 (§4.5) | G-D4's mean-band bar; a "Wealthy Residential" district above the town's median band, a "Shadows District" below it | — |
| R7 | households: how many, how large, which bands (the roster) | population (6, the count), prosperity (42 → the band shares), tier, the housing-stock records (29: a building-count range), sector shares (43: occupations) | S2's sequential roster (§10.2: the Δ = 10 grid, `HouseholdRow` sizes, FTG's lifestyle weights shifted by the wealth level and the character vector) | the roster's ordinal draws `roster/<class>/<ordinal>` | Σ household members = the dossier's population within tolerance (± 5 %, §16's M1 bar); the residential building count inside the housing record's range when one exists; every household the population demands housed (§4.7's re-provision) | — (SF has no households) |
| R8 | the class mix inside each neighbourhood (item 71) | R6's field; the town's wealth level (T12) | item 71's class-mix weights interpolated along the value and shifted by the wealth level; prime frontages to the larger classes | per-plot class draws on the placement streams | the manor share monotone in the value within a band row | — |
| R9 | institution instances: how many of each collective kind, their class and band | `catalogId` (28), the count range (29), population (6), prosperity (42), the district-scale flag (30) | S2's per-capita rows for the class clamped into [lo, hi]; T9, T10; the band from the plot's field at placement (item 19's templates) | the fractional count on the roster's ordinal stream; the specialisation by band row | n inside the dossier's range; every singular record placed exactly once | an explicit instance count, if SF ever writes one |
| R10 | lot assignments: where each institution stands | class (28), tags (32), facets (33), `forbiddenResources` (34), landmarks naming it (21), `tradeDependencies` (47), chains (46), the power association (59–60), `knownTo` (33) | S10b's one solver with item 16's relation templates and supply edges; the quarter hints as soft `districts` rows; item 63's concealment modes; claims-first in the creation prefix (§7.7) | the `siting` streams keyed by the assignment and member | every dossier-backed record placed (F-SITING never drops it, §7.7 item 2); a hard row is never broken silently | a location hint, if SF ever writes one |
| R11 | power seats and turf | power category and standing (56), `isGoverning` and the government's seat (55, T14's forced seats), `controlledInstitutions` (59), structural seats' `linkedInstitutionIds` (63), a power's district-scale records | a power's seat = the plot of its most significant institution (the government's seat for the governing power; item 72 (d″)(3)'s significance); its turf = the districts where its significance-weighted share is highest | none (ties by address order) | the governing power's seat is the government's seat institution | — |
| R12 | each district's political alignment (item 72 (a)(2)) | R10's lots; the class-to-power table with rows 59–60 as overrides; standings (56) | significance-weighted shares of affiliated lots; item 72 (d5)'s partition for shared buildings | none | shares sum to one per district; a shared building counts once | — |
| R13 | each district's economic role (item 72 (a)(4)) | R10's lots; the class-to-sector table; sector shares (43) | significance-weighted sector presence and the economy dial | none | a building serving two sectors counts once, partitioned | — |
| R14 | names | the dossier's names (4, 19, 21, 27, 55, 56, 63); culture key (13) | dossier names are protected (never re-drawn); a district's name from its quarter claim, else §10.4 from item 72 (c)'s dominant components; collective instances and filler named by S13a | the naming concerns (§6.1) | no generated name repeats a dossier name within its kind (§9.6) | — |
| R15 | buildings on each plot: class, footprint, storeys, heights, materials, entrances, basements | the use's class and the plot's bands (R6, R10); culture key (13: a template-family row, fixed in a table by us, never parsed from prose at run time) | §4.7 S11's designation templates (item 19); §2.6's entrance and basement rules (item 29) | the `siteplan` streams; the entrance and basement concerns | a material never changes a shape (item 19) | — |
| R16 | hidden plots, passages, clandestine fronts (items 30, 63) | facets (33), criminal category and tags (31–32), crime (51), covert impairments (38) | §4.6's hidden shares by band; item 63's cover table (a front by true function); `knownTo` defaults | the front pick on its concern; the share draws | a clandestine record's public views show only its front (item 63 (c)) | a front named by the dossier (item 63 (a)), if ever present |
| R17 | the underground: sewers, accesses, the undercity (items 64–66) | population (sewers by tier, item 14), a `Sewage system` or sanitation-tagged record (32), subterranean kinds (`Underground network`, `Underground city`, `Black market bazaar`), `forbiddenResources` (34), crime and poverty (51, 42) | II.7's sewer feature law; item 65 (c)'s undercity (one to three neighbourhoods) and its lifelines; item 64's access rates | the feature table (`blueprint.features`) and the network stage's streams | the underground mode only with a navigable sewer; an `Underground city` record → an undercity exists, as a dossier existence fact | — |
| R18 | informal clusters and tent camps (item 70) | the band field (R6), tier, migration and famine conditions (70–71), the Shadows District and "The Warren (slums)" claims (19, 21) | item 70's cluster rows; FTG's shanty staging as the default (§4.5) | the packing streams | never on a standing middle-or-above-floored plot | — |
| R19 | the hinterland: land uses, their bearings and sizes | deposits (15, T5), food security (50), isolation paths (17), terrainType (9) | S12a and §4.9's farm table; each deposit's land use at its bearing | each deposit's bearing on its own stream keyed by the deposit key; S12a's siting streams | every listed deposit has its land use; a depleted one is drawn worked out | the realm block's cell resources |
| R20 | knowledge (`knownTo`) of places | facets (33), covert impairments (38) | item 30's defaults from exposure; item 63's secret true function | none | a covert fact never reaches a public view | covert blocs from the campaign ledger, if passed |
| R21 | transition timing (item 67's `Works`) | the change's week from the receipts (part 5.3), the season from the week (SF's 4-4-5 law), conditions (T16) | item 67's duration table (class × size × material × prosperity × season); stage = elapsed ÷ duration | none (an optional jitter row) | the stage at week w a pure function of the record and w (item 67 (k)) | a per-tick change list from SF, if ever emitted (g§8.7) |
| R22 | persons beyond the notables | households (R7) | `derivePerson(seed, key, tableVersion)` (§10.3) | the person streams | — | — |
| R23 | the map's scale and extent | population (6) → rung and frame (§1.1, §3.2 (9)) | the rung profile | — | — | `kmScale` from the realm digest |
| R24 | a dossier below 1 500 people (75 of the 155 generated: all 70 thorps, hamlets and villages, and 5 towns) | tier, population (5–6) | the village product (PART III) — STAGED: until it exists the port answers with a refusal that names the staged product, never a TOWN drawn at a village's population | — | — | — |

## 4. Conflicts of model

Each conflict states SettlementForge's model (C, source), ours (C, design section), what breaks if the port copies one
into the other, and the resolution this lane proposes (P; the calls marked J-M are vetoable judgments, listed in §6).

**4.1 Households — SettlementForge counts people; our map counts households.** SF: `population` is one integer; no
household, family, class or occupation record exists in the source or in any of 167 output files (m§3, o§3.4, o§6.2).
Ours: `Household {id, plot, building, members, wealth, tableVersion}` and derived `Person`s (§2.7, §10.3); the design's
text already speaks of "the dossier's roster where one exists" and of "a household of a dossier's roster (the dossier's
population, §7.7 item 2)" that is never taken off the manifest (§4.7, §4.11, §2.6's capacity paragraph); item 28 (f)
reads "households per building" as a dossier fact. Consequence: there is no dossier roster to read; the households are
derived (R7) and are MAP facts under item 20 (h) (i), while their total is a DOSSIER fact. Resolution: read every
"household of a dossier's roster" in the design as "a household that houses part of the dossier's population" — its
existence is protected by the count (never taken off the manifest while the population demands it), its size, band,
building and people are the map's own. A population change arrives as a new count and re-derives the roster's suffix
(§10.2's prefix-stable manifest: a rise adds the suffix, a fall removes it in reverse order), never a list of named
households.

**4.2 Institutions — named kinds with counts, against addressed instances.** SF: an institution record is a catalogue
KIND instantiated once per settlement, keyed by its NAME (0 of 5 846 records carry an `id`; SF's own code calls the
name "its join key", m§1), with a `catalogId` that is a kind key; one record may stand for "5–15 craft guilds"; ids
appear only on records an event or the simulator mints later (`institution.<slug>`), and then only while the name holds
(m§1, g§3.3, k). Ours: an `Assignment` has an address id and members (`placed[]`), a `Use` has an address that moves
with it, an `Institution` record is one institution (§2.7, §7.7, §6.3). Consequence: a name change in SF would orphan a
name-keyed binding; a collective record must become n members whose ids survive a change of n. Resolution: the map's
BINDING TABLE (item 20 (h) (v)) binds each of our records to a dossier key built by SF's own anchor precedence
(`cat:` → `uid:` → `name:`, s C-7) plus a member ordinal `#k` for collectives (row 29); a rename that SF's cascade
receipts identify (a `rename-*` edit, a decree, `_userEdits`) re-binds; a rename with no receipt is a removal plus an
addition, reported (g Q7's re-base answer) — J-M4. Uniqueness holds today: no two records of one dossier share a
`catalogId` or a name (0 duplicates in 155; o§8 found none in 167 files); two records of one key, if SettlementForge
ever emits them, are told apart by the dossier's own order and reported (item 20 (h) (v)).

**4.3 Counts — ranges, not numbers.** SF: 22 name patterns carry a count RANGE; towns hold the most records (40–65) and
cities fewer (33–52) because a city's records are aggregates (`Craft guilds (30-80)`, `Merchant guilds (15-40)`); the
whole housing stock is one record such as `Housing (180-1000 structures)` (o§3.4, k). Ours: S2 demands an exact count
per class from per-capita rows (§10.2). Resolution: n is a map fact derived inside the range (R9), the range a dossier
fact the coherence bar checks; the housing record bounds S2's residential building count rather than creating
assignments (row 29). When SF's range and our per-capita rows disagree at the extremes, the range wins (it is the
dossier's), clamping n — P.

**4.4 Tier against rung.** SF: six tiers with its own population bands (town 901–5 000, city 5 001–25 000, metropolis
25 001–100 000, m§2). Ours: the population chooses the rung by §1.1's bands (TOWN from 1 500, CITY from 10 000,
METROPOLIS from 30 000), and everything below 1 500 is the staged village product (PART III). Consequence: the words do
not align — 4 of 24 SF cities are our TOWNs, 2 of 23 SF metropolises our CITYs, 5 of 38 SF towns fall under our TOWN
floor, and all 70 thorps, hamlets and villages need the staged village product (k, T1). Resolution: the rung is a map
fact read from the population; the SF tier word stays the settlement's title word (a dossier fact) — a "city" of 7 000
people is drawn on the TOWN rung and still called a city; a dossier below 1 500 is refused with a message naming the
staged village product until PART III exists (R24) — J-M7. What a rung crossing at an epoch does is gap G-D15.

**4.5 Powers and government — names and words, not kinds.** SF: power factions keyed by NAME (an authored `faction.id`
honoured when present), 44 names and 8 categories over 155 dossiers — economy, military, noble, religious, government,
criminal, other, magic — with a share-like `power`; the government is a body's NAME (17 seen) that doubles as its type;
coups and crises add and rename powers (m§5, k). SF also has a second faction layer: NPC social groups whose
`powerFactionName` names a power, which need not equal a member's own `factionAffiliation` (o§5.2). Ours: `Faction.kind`
∈ guild, religion, lordship, company, criminal, council, and `Government.kind` ∈ crown, seigneurial, ecclesiastical,
chartered_commune, merchant_oligarchy (§2.7). Consequence: military and magic powers have no kind (G-D1 (a)); two
economy powers (merchant against craft) must be told apart by name (T15); the crisis blocs of `other` are councils at
best. Resolution: T14 and T15 as tables; our `Membership` reads each NPC's own `factionAffiliation` (the power) and
ignores the social layer — J-M8.

**4.6 Faction-to-institution links — none at birth, volatile after.** SF: the explicit control lists are declared and
never generated (m§4); the only link ever observed is the simulator's `controlledInstitutions`, by `catalogId`, absent at
generation, shared between powers and coming and going week by week (o§4, k: 28 of 28 resolve). Ours: item 72 (d″)(1)
associates every class with its power(s) by a table, dossier-overridable. Resolution: the class-to-power table is the
default (a map fact); `controlledInstitutions` overrides it only past a hysteresis at an epoch (G-D1 (f)); a kind held by
two powers is partitioned by their relative standing (item 72 (d5)); the declared lists are optional fields used when
present (row 60).

**4.7 Prosperity — one settlement label, against a field of bands.** SF: `economicState.prosperity` is the whole
settlement's band on a seven-step ladder (m§2); no per-district or per-household wealth exists (SF's district wealth is
a derived read, never stored, m§12). Ours: a continuous field over the town with a six-band set per plot (`squalid`,
`poor`, `modest`, `comfortable` (the middle), `prosperous`, `rich`; §4.5) and three band memories per plot (§2.8).
Consequence: the words collide — SF's `Poor`, `Comfortable` and `Prosperous` name a settlement average, ours a local
band; copying SF's label into `FieldBands` or a plot's band would make a "Poor" town uniformly `poor`. Resolution: the
label maps only to `Intent.wealthLevel` (T12) and the household band shares; the field and every band stay map facts
(R6); G-D4's bar checks the town's mean against the label. SF's label moves one step at a time under the lit simulator
(Comfortable → Prosperous → Wealthy within a year, g§6.6, k-ticks); the map follows it at epochs through the wealth
ladder (item 31), never by re-deriving plots (§4.11).

**4.8 The clock — SF ticks weeks; our design has epochs in years.** SF: one tick is one week (52-week year, 4-4-5
months, 13-week seasons, spring first); an advance runs N weekly ticks and returns each member's WHOLE dossier at the end
(the interior weeks survive only in receipts); a catch-up may run up to 26 weeks; only canon members of a campaign tick
(a draft or a standalone settlement never does); the default rules move population, powers and conditions every week and
institutions often, tiers rarely and only through proposals (g§6.1–§6.6). Ours: an `epoch` event carries `years: number`
and a `populationTarget` (§4.11); an epoch runs growth and the ladders; the optional `@plat/sim` module has its own
calendar in hours as a view key `time` (§10.3) — no weekly clock exists in the design at e9c0b828…; item 67 (not yet
applied) assumes one: `Works` with a start week and a duration in weeks. Consequence: SF's unit and item 67's agree (one
week), but an epoch per SF tick would run growth every week, and an epoch per advance would give an arbitrary cadence.
Resolution (part 5.3): our week = SF's `calendar.elapsedWeeks` (an integer, no conversion); discrete dossier changes fold
as standalone dossier events at their week (the design allows events between epochs, §7.7 item 6); an `epoch` folds at
each SF year boundary or sooner when the dossier's population has moved past the roster tolerance since the last epoch,
with `years` = weeks ÷ 52 — J-M9; item 67's `Works` start at the change's week; the `@plat/sim` hour clock stays
separate (a day inside a week, never SF's). A draft has no week (`week: null`): its changes apply finished, with no
stages (g§8.4) — J-M10.

**4.9 Ruined but listed.** SF: soft removal — a removed, ruined or remnant institution STAYS in the list with a status
(`removed`, `ruined` with `worldPulseFate: 'destroyed_by_disaster'`, `remnant`); the record count never changed in any
tick run (o§4, k-ticks). Ours: every dossier-backed element "exists on every map"; only a dossier event removes it,
leaving the plot vacant through `closeUse` (§7.7 item 2); a building has ruin states (§2.8), a use only opened / closed.
Consequence: `removed` is a removal (→ `unassign`); `ruined` is neither — the dossier still lists it and says it is a
ruin. Resolution: G-D16's `Assignment.state` (active, ruined, removed); a ruined element is present as its ruin (§5.3's
dossier row counts it), its use closed, its building `ruined`; a `RESTORE_INSTITUTION` or reconstruction reopens it in
the same building (repair `Works`).

**4.10 Undo — SF restores exactly; our dossier history only goes forward.** SF: `undoLastEvent` restores from the event
log's snapshot; `undoLastPulse` from a pre-advance snapshot, session only, ten deep (g§5.2, §6.1). Ours: a dossier event
is never an undo or revert target, and neither is an epoch that carried one (§7.4, §7.7 item 6). Consequence: after an SF
undo the DM sees the dossier return exactly while the map applies a forward mutation (an added smithy's plot goes vacant;
what it displaced stays displaced). Resolution: s C-4 / Q-3's proposal stands — the port recognises an SF undo when the
incoming dossier's hash equals an earlier absorbed state and offers a rewind of the dossier events after that state when
no map event depends on them, otherwise a reported forward mutation. It touches ruled undo text (§7.4): Fable's and the
plan seat's to rule.

**4.11 Rerolls and regeneration — same id, new content.** SF: a draft can be re-rolled from `_config` with the same seed
(the settlement `id` unchanged; NPC ids renumbered), sections re-rolled with a fresh seed, and a new seed gives a new
`id` (m§1, g§5.1). Ours: item 22 — a dossier change mutates the current map, never re-rolls it; item 22 (d): a
brand-new map from a dossier has every element from the start. Consequence: a full reroll can replace most institutions
at once (g Q1). Resolution: a change of `id` (a new seed) is a new dossier and a new map; the same `id` with any
content change — a reroll included — is processed as dossier changes by least disruption, reported over budget when it
is (§7.7 item 5: the dossier's authority is absolute); NPC renumbering re-binds persons by name and role, else remove plus
add — J-M11.

**4.12 Quarters — declared once, against emergent and moving.** SF: the quarter list is chosen at generation by
name-keyword tests over the institutions, carries one fixed location phrase per name, and never changes afterwards — not
even when the simulator razes a district-named institution (o§4, o§6.3); its keyword test also misses cities' markets
(a Market Quarter in 36 of 36 towns, 0 of 24 cities — o§6.1). Ours: a neighbourhood's identity is emergent from its lots
and recomputed per epoch with hysteresis (item 72 (a)–(d′)). Consequence: a literal reading — "every SF quarter is a
district with that kind forever" — contradicts item 72, and SF's absences are artefacts. Resolution: a quarter is a
NAMING CLAIM (J-M1): the name exists on the map (a dossier fact), carried by the district whose identity best matches;
its location phrase is a soft row; an ABSENT quarter is never a fact (the map may grow a market district SF never
named); a name survives past the hysteresis as item 72 (c) already allows old names to survive.

**4.13 Economy — revenue categories, not sectors.** SF: `incomeSources` are what the settlement's revenue is made of
(Market Taxes, Property Rents, Court Fees & Fines, Agricultural Rents, Guild Fees …) with percentages summing to 100
(k). Ours: item 72 (d4) reads "the share each sector contributes to the settlement's economy" and amplifies the classes
of a sector in proportion to its share. Consequence: a tax or a rent is not a production sector — "Market Taxes" is
trade's yield, "Court Fees & Fines" is the state's, "Property Rents" is no sector at all. Resolution: T13 maps each
revenue category to the sector whose classes produce it (the owner's own examples: trade → markets; taxes and tolls →
infrastructure), and treats Property Rents as neutral — J-M6.

**4.14 Two derivations of "the district".** SF derives its own district reads (the district profile with wealth, safety
and a dominant faction; the lit preset's `urbanFabric` district-class stocks; the spatial substrate from its own layout
that its simulator reads to place calamity and siege damage) (m§12, g§6.6, s§3). Ours derives districts by our rules.
Consequence: SF's news may name districts of SF's own layout that our map does not have (g Q10). Resolution: none of
SF's derived or map-side layers is an input (row 25); the disagreement is surfaced as g Q10 for the owner and Fable, and
the map never names a district to match SF's news.

**4.15 Seeds and determinism.** SF: `_seed` is a string; the same seed and inputs reproduce a dossier byte for byte
within one SF line, but not across lines at one `generatorVersion` (g§4.5); `_seed` and `_config` are secret on SF's
public surfaces (s C-8). Ours: `Seed` is a u32 (§2.9); the map = f(seed, ordered dossier history, map edits) (item 22
(c)). Resolution: our seed is derived one-way from `_seed` (row 3); the map never regenerates a dossier from
`(_seed, generatorVersion)` and always takes the dossier it is handed (g§4.4).

**4.16 Whole dossiers in, events expected.** SF: no change stream, no revision counter; every change arrives as a whole
new dossier; receipts are partial (a canon-only event log, capped history lists some without a week, a campaign news
feed; g§7). Ours: dossier changes enter as ordered `assign` / `unassign` / `setAttr` events with `EditBase.dossier` (§7.7
item 1, §11.4). Resolution: the port diffs the incoming dossier against the dossier facts the map document already
carries (s C-3: no SF-side history needed) and dates each change from the receipts (part 5).

**4.17 Smaller mismatches.** (a) `stress` is stored null, as one object or as an array (o§3.2): the port normalises it.
(b) SF's status `vacant` is an empty seat, not an empty building (T11). (c) A settlement below town with `port` access
has no port institution (o§3.4): the map may draw a landing (a quay-class way — a map fact) but never adds a port
institution (a dossier fact). (d) Whether SF's `population` includes the hinterland's farming households (which our
roster places as outside classes) is unknown — PLAUSIBLE that it does, since SF has no separate rural count; the port
treats the whole population as the roster's (R7). (e) Walls always come with gates in SF (155 of 155); our unwalled
settlements still have road entries (T3).

## 5. The change feed — what the map subscribes to, and how each change becomes our events

### 5.1 What arrives, and the port's job

SettlementForge sends no change list: every change reaches a consumer as a WHOLE new dossier — a simulator advance's
`settlementUpdates[].settlement`, a persisted save, a re-generated draft — with partial receipts beside it (a canon-only
event log, capped history lists, entity stamps, decrees, a campaign news feed), no revision counter and, after an
advance of several weeks, only the end state (C: g§6.5, §7, §8.1; o§4). Our design takes dossier changes as ordered
`assign`, `unassign` and `setAttr` events with `author: 'host'` and `EditBase.dossier` set, delivered by `doc.apply`
(§7.7 item 1, §11.3, §11.4) — or carried inside an epoch (`EpochInputs.dossier`, §4.11). The port (one package, s C-15)
therefore does four things, in order (P):

1. **Normalise** the incoming dossier (the three `stress` shapes; case-fold `category`; parse count ranges) and key every
   record through the binding table (4.2).
2. **Diff** it against the dossier facts the map document already carries by their dossier keys (s C-3: the map's own
   carried facts are the "previous dossier", so no SettlementForge history is needed), producing one `DossierChange` per
   changed element (g§8.3's envelope, as our own type: `changeId`, `source`, `week`, `cause`, `element`, `op`,
   `before`, `after`, `fate`, `reason`).
3. **Date and attribute** each change from the receipts (5.3).
4. **Emit** our events in the host's order — dossier events at their weeks, epochs at the cadence of 5.3 — each with
   `EditBase.dossier` and the optional `EditBase.dossierChange` (G-D14), so the disruption report (§7.1) can say why.

A map that was closed while SettlementForge advanced absorbs everything since its last absorbed state as one batch when
it is opened, the interior weeks recovered from the receipts (s C-5).

### 5.2 The subscription table

Columns: the change in SettlementForge · detect it by (fields and receipts, C from the sources cited) · our event(s) ·
standalone or inside an epoch · item 67's `Works` (P) · note. "(dossier)" on an event means `EditBase.dossier` set.

| # | change in SF | detect by | our event(s) | when | item 67 | note |
|---|---|---|---|---|---|---|
| F1 | an institution ADDED | a new binding key in the diff; `createdByEventId` (ADD_INSTITUTION, a table event), a decree `add-institution`, `requiredForTier` + `createdByWorldPulseOutcomeId` (a promotion or a DM tier shift), `builtReason` / `_worldPulseEconomyBuilt` and `institutionHistory` fate `built` (an economic build), `foundedAt` (a founding) (g§5.2, §5.4, §6.3, §6.6) | `assign` (dossier) — `existence: 'dossier'`, members for a collective — placed by S10b's `dossier` request in the least-disruption order, applied by S11's mutator (§7.7 item 5) | standalone at its week; inside an epoch when it arrives with one (applied at §4.11's step (e)) | construction `Works` (stages 1–7) from the week | a rejection lapses when the change's scope holds the rejected site's block (§7.7 item 3) |
| F2 | an institution REMOVED | `status: 'removed'` + `removedByEventId` (REMOVE_INSTITUTION), a decree `remove-institution`; closure fates `hollowed_out`, `abandoned`, `bankrupt`, `closed_for_want_of_custom`, `shuttered` (`closedByWorldPulseOutcomeId`) | `unassign` (dossier) → `closeUse` → the plot vacant (§7.7 item 2, item 22 (a)) | standalone | none at once; item 67 (f)'s slow ruin only if the building stays vacant | the building stays: item 17's rules re-use it |
| F3 | an institution REDUCED or CONVERTED | `status: 'remnant'`; fates `privatized`, `downsized`, `reduced_to_watch_post`, `survives_as_remnant`, `captured_by_local_powers` | `setAttr` (dossier) of the use's designation → S11's mutation (item 18); `captured_by_local_powers` → the power association only | standalone | an alteration `Works` (item 67 (d)) where the designation's template changes the building | T11 |
| F4 | an institution IMPAIRED or RESTORED | `status: 'impaired'` ↔ active; `impairments[] {type, severity, causeEventId, covert?}` (IMPAIR / DAMAGE / RESTORE_INSTITUTION, plague, corruption, siege) | `setAttr` (dossier): physical types → the building's `condition` and damaged look; others → the dial input (J-M3) | standalone | restoration → a repair `Works` | `covert` never reaches a public view |
| F5 | an institution RUINED or DESTROYED | `status: 'ruined'`, `worldPulseFate: 'destroyed_by_disaster'`, `remnantReason`, `calamityHistory[].targets`; `destroyedByEventId` | `setAttr` (dossier) of the assignment's state to `ruined` (G-D16) → the building `ruined` | standalone | a fire jumps to a charred shell in one week (item 67 (f)); then decay, clearance or repair `Works` | the element stays present, as its ruin (4.9) |
| F6 | an institution REOPENED or RECONSTRUCTED | `reopenedByWorldPulseOutcomeId`; status back to `active`; the `reconstruction` condition resolved (an upgrade at completion under the upswing mover) | `setAttr` (dossier) of the state to `active`, the designation upgraded when SF says so | standalone | a repair `Works` on the standing ruin or remnant | a former use reopens in its former building first (§4.11 (5)) |
| F7 | POPULATION changed | `population`; `populationHistory[] {tick, delta, population, reason, outcomeId}` (the last 12) | no event of its own: carried into the next epoch's `populationTarget` (§4.11: the roster's suffix added, or removed in reverse order) | the next epoch (5.3) | dwelling construction `Works` on growth; vacancy then decay on decline, at item 67 (i)'s share | weekly drift of a few people never folds on its own |
| F8 | TIER changed | `tier`; `tierHistory[] {fromTier, toTier, direction, outcomeId, institutionFates[]}` (no week field; the outcome-id suffix, e.g. `candidate.tier.demotion.save1.32`); a DM `SHIFT_TIER` (`dm_shift_tier:<id>:town>city`, no suffix) | each fate as F1–F3; the population into an epoch; the rung by G-D15 | an epoch | batched `Works` | 4.4: the tier word renames the title only |
| F9 | PROSPERITY band changed | `economicState.prosperity` (a label step) | the epoch's circumstances: T12's wealth level → the field re-evaluated → due marks → item 31's ladder | an epoch | the ladder's works | never a re-derivation of plots (§4.11) |
| F10 | POWER standings changed | `powerStructure.factions[].power` / `rawPower` / `powerLabel`, `updatedByPulse`, `controlledInstitutions` | the epoch's circumstances: item 72's dials, past the hysteresis of G-D1 (f) | an epoch | none directly | |
| F11 | the GOVERNMENT changed | `governingName`, `previousGovernments[] {label, cause, tick}`, `powerTransfer`, CHANGE_RULING_POWER, a `vassal_extraction` condition, an `Occupation Authority` power | `setAttr` (dossier) of `Government.kind` and seat (T14); the seat's use re-designated when its class must change; an occupation overlay (G-D7) | standalone | an alteration `Works` if the seat's building mutates | |
| F12 | a CONDITION began, changed or ended | `activeConditions[] {id, archetype, severity, status, triggeredAt {tick, sourceEventType}, duration}`; stressors | `setAttr` (dossier) on a `ConditionOverlay` (G-D7) | standalone | T16's rate modifiers | the condition id is stable: one overlay per id |
| F13 | RESOURCES changed | `config.nearbyResources*`, `resourceEdits`, `resourceHistory`; `resource_strike` / `vein_exhausted` conditions | `setAttr` (dossier) on a `DepositSite` (G-D13) → its land use opened, worked out or closed | standalone | a hinterland `Works` (a pit opened) | |
| F14 | TRADE changed | CUT / OPENED_TRADE_ROUTE (`_cutRoutes`), CREATE_ROUTE (`_userRoutes` and a `neighbourNetwork` link), `tradeLinks`, a neighbour's `relationshipType` (LIVE), the export and import lists | the epoch's `TradeFlow` inputs (G-D2); a new partner may add a main road through §4.11's S5b step | an epoch | road and gate `Works` | |
| F15 | a RENAME (settlement, power, institution, NPC) | `rename-*` committed edits and SF's rename cascades (m§1); a name change in the diff | `setAttr` (dossier) of the name; the binding table re-binds (4.2) | standalone | none | a name change without a receipt = removal plus addition, reported (J-M4) |
| F16 | the DEITY changed | SET_PRIMARY_DEITY, IMPOSE_CULT; `config.primaryDeitySnapshot` | `setAttr` (dossier) of `Religion.deities` → temple dedication names | standalone | none | |
| F17 | a NOTABLE changed | `npcs[]` diff; successors `npc.successor_<n>` with `replacedNpc` (the old NAME); KILL / ADD / PROMOTE / DEMOTE_NPC | the dossier-backed person binding (G-D5) | standalone | none | staged with G-D5 |
| F18 | a DECREE applied | `settlement.decrees[]` (`status: 'applied'`, `tickRef`, `chronicleRef`); the week's `pulseRecord.decreeCauses[]` | the decree id becomes the `cause` of every change the diff finds that week (`source: 'decree'`) | as the changes it causes | as those | decrees apply at the head of their tick (g§5.4) |
| F19 | a TABLE EVENT (the clerk's, confirmed by the DM) | ordinary canon events (IMPAIR / RESTORE_INSTITUTION, DEPLETE_RESOURCE …) | as F1–F5, F12, F13 | as those | as those | no separate handling (g§8.8) |
| F20 | a NEW settlement, or this one's END | `memberBirths` (whole new saves); satellites; DESTROY_SETTLEMENT, `lifecyclePatch` (a relic ruin or an abandoned site) | a new dossier → a new map; an end → an epoch that ruins every building by the decline hooks | an epoch | ruin `Works` | a resettlement on the same site: g Q4 (owner) |
| F21 | a draft REROLL, or a regeneration | the same `id`, much new content; or a new `id` | 4.11 (J-M11) | standalone | none on a draft (no week) | |
| F22 | an SF UNDO | the incoming dossier's hash equals an earlier absorbed state's | 4.10 (s Q-3) | — | — | Fable and the plan seat rule |

### 5.3 The week of each change, and the epoch cadence

**Dating (C for the receipts: g§6.5, §6.6, §8.4, §8.8; o§4; k-ticks).** A change takes the first of: an explicit tick
on its receipt — `foundedAt.tick`, an `institutionHistory[].tick` (lifecycle entries; tier-fate entries carry none), a
`populationHistory[].tick`, a condition's `triggeredAt.tick`, a campaign-era `historicalEvents[].tick`, a decree's
`tickRef`, a news entry's `tick`, the provenance ledger's `tick` under the lit presets; else the week suffix of its
outcome id; else the week the dossier arrived (the campaign's `calendar.elapsedWeeks` at the advance's end). Our `week`
is that integer, with no conversion — SettlementForge's tick and item 67's unit are both one week. A draft has no week
(`null`): its changes apply finished, without stages (J-M10). The season of a week is SettlementForge's own 4-4-5 law
(spring first), which item 67 (b)'s season row reads, never a calendar of ours (g§8.4).

**Cadence (J-M9).** Discrete changes (F1–F6, F11–F13, F15–F17) fold as standalone dossier events at their week, in the
host's order — the design already folds a dossier event between epochs at its own log position (§7.7 item 6). An
`epoch` folds at each SettlementForge year boundary crossed (every 52 weeks) or sooner when the dossier's population has
moved away from the last epoch's `populationTarget` by more than the roster tolerance (± 5 %), carrying the
`populationTarget`, the circumstances F9, F10 and F14 feed (the wealth level, the economy shares, the power standings,
the trade inputs), T16's epoch event kinds, and the dossier events of its own week in `EpochInputs.dossier`, with
`years` = the weeks since the last epoch ÷ 52. Within one advance the order is by week, then SettlementForge's own order
(decrees first), then the epoch. (Alternatives rejected: an epoch per weekly tick runs growth fifty-two times a year for
drift of a few people; an epoch per advance ties the map's history to how often a DM presses "advance".)

### 5.4 Creation — the first map from a dossier

The first map is `generate` with a blueprint (host door 1, §11.4) whose fields come from the dossier (P): `seed` (row
3); `size.population` (row 6) — the rung follows (T1); `intent` — the wealth level (T12), the gate count (T3), walls
(row 66), the defence level (T4, row 67), the culture's form weights (row 13); the site request (T2, R1); `toggles` —
walls and castle or citadel (row 66), harbour (T3), shanty (the roster's average band poor or squalid by FTG's rule, §4.5,
or a slums record), sewers `auto`; `circumstances` — the government (T14), the biome (T2), the economy shares (G-D3), the
landscape toggles (T5); `assignments` — every institution record, entering as the creation prefix's `assign` events at
log positions 0…k with `creation: true`, which S2 reads ahead as fixed rows so their land is claimed first (§7.7's one
path). A LIVED dossier (after events and ticks) creates a map with every element present, ruins created as ruins (4.9);
SettlementForge's earlier history is not replayed (item 22 (d)).

**Where J78's skeleton meets the dossier (the relayed owner request of today, answered by the Fable manager as J78 in
`docs/experiments/known-city-authoring.md`).** J78 reads a hand-authored SKELETON file as the log's creation prefix. If a
skeleton and a dossier are ever combined (a known city's skeleton for a SettlementForge town), they share that prefix:
the dossier's `assign` events carry dossier facts; the skeleton's drawn walls, ways and boundaries are user-drawn
geometry — map facts — which rank below dossier existence and below assignments in §7.7's precedence line. So a skeleton
may shape WHERE the dossier's institutions land (its `placeAt`s are positive placements, honoured when the hard rows
allow) and never adds or removes a dossier element. This lane adds no build item for it (P).

### 5.5 What the map never subscribes to

SettlementForge's own map-side and derived layers — `urbanFabric`, `mapEdits`, `fogSessions`, every
`worldState.spatialLedgers.*` sub-ledger including the spatial substrate — and its derived reads (district profile, map
profile, causal state, capacities, daily life, the four-dimension system state, threat profiles) are never inputs (row
25; g§8.6 (7), §8.8 (9)); nor are `npcLadder`, `traditions`, `simulationTrace`, `aiOverlays` or the operation manifest
(declared, never emitted, g§5.4). The separate frozen `worldState.spatialDigest` is not ignored: it is the one campaign
fact the optional realm block may carry (row 16, s C-9).

## 6. Judgment calls (vetoable) and open questions

Each call chose between defensible alternatives inside this lane's scope; say "veto J-M<n>" to flip it. All are P.

| id | chose | over | because |
|---|---|---|---|
| J-M1 | an SF quarter is a NAMING CLAIM: its name exists on the map, carried by the district whose emergent identity best matches; its location phrase is a soft row; an absent quarter is never a fact | a dossier-backed neighbourhood assignment forcing that kind for ever | SF picks quarters by name-keyword tests at generation and never updates them (o§4, o§6.1: no Market Quarter in any city); item 72 makes identity emergent and moving |
| J-M2 | a landmark string names a feature the roster already demands (a lane, a bridge, a quay, a well, a tavern); nothing is created for a string alone | creating a feature per string ("Slaughterhouse", "Notice post") | creating one would invent content the dossier lists as no record (item 20 (h) (iii)) |
| J-M3 | non-physical impairments (legitimacy, influence, wealth, staffing, corruption) feed item 72's institution dial; only physical ones wear the building | every impairment wearing the building | a corruption scandal is not a broken roof; the dial is where item 72 puts an institution's standing |
| J-M4 | a rename SettlementForge's receipts identify re-binds; a name change with no receipt is a removal plus an addition, reported | fuzzy-matching a renamed record by kind and position | guessed identity is how silent mis-bindings begin; SF routes its renames through one cascade writer with receipts (m§1) |
| J-M5 | SF's `config.priority*` sliders are not read | reading them as a character vector | their effect is already in the institutions and the income shares; reading both counts it twice |
| J-M6 | T13: Property Rents neutral (no sector amplified); banking and financial services a `finance` sector of its own | rents → housing; finance folded into trade | rents are not a trade that has buildings to amplify; banks are a visible class the owner's dial should reach |
| J-M7 | the rung comes from the population (T1); the SF tier word stays the title; a dossier below 1 500 is refused with a message naming the staged village product | drawing a small TOWN for a village-sized dossier | §1.1's rule and the owner's roadmap (the village is its own product); a TOWN drawn at 700 people would be a false map |
| J-M8 | `Membership` reads each notable's own `factionAffiliation`; SF's NPC social-group layer is ignored | reading the social group's power | the two layers disagree for some notables (o§5.2); the person's own affiliation is the direct fact |
| J-M9 | discrete changes fold at their week; an epoch at each SF year boundary or sooner when the population moves past the ± 5 % tolerance | an epoch per weekly tick; an epoch per advance | the first runs growth fifty-two times a year for drift of a few people; the second ties history to how often the DM presses "advance" |
| J-M10 | a draft's changes (no week) apply finished, without transition stages | staging them over a notional clock | a draft has no time in SettlementForge (only canon campaign members tick, g§6.1) |
| J-M11 | a new settlement `id` is a new dossier and a new map; the same `id` with any content change — a full reroll included — is processed as dossier changes by least disruption, reported over budget when it is | a new map for any large change | item 22's continuity and §7.7 item 5's absolute authority; the `id` is SettlementForge's own statement of "the same settlement" |
| J-M12 | `DossierRef.element` of the settlement is the dossier's `id` (`s_…`); the save UUID is the host's storage key only | binding the map to the save UUID | the dossier `id` survives a same-seed regeneration and changes with the seed, which is exactly J-M11's line; the save row is the host's business (s C-6) |

**Open questions — only what this lane cannot decide** (each with a recommendation):

1. **Which SettlementForge line the port binds to** (owner; m§15 Q1, g Q9): this file maps branch
   `fp/integration-2026-09-23` @ `5d699cc68`; the working tree and `master` differ materially. Recommendation: bind to
   the product line the owner names, and keep the port's adapter versioned by SettlementForge line.
2. **Village-tier dossiers before PART III** (owner, roadmap): 75 of 155 generated dossiers need the staged village
   product. Recommendation: J-M7's refusal until the village product lands; the roadmap stays as it is.
3. **"Eastern district (traditional)"** on every Religious Quarter (owner; o Q2): a SettlementForge placeholder or a
   rule to honour? Recommendation: a soft east row at low weight (T7), dropped if the owner calls it a placeholder.
4. **SettlementForge's undo against our forward-only dossier history** (Fable and the plan seat; s Q-3; 4.10).
   Recommendation: s C-4's rewind-when-hash-matches, else a reported forward mutation.
5. **SettlementForge's own districts in its news** (owner and Fable; g Q10; 4.14): its simulator places damage by its
   own district reads, so its news may name districts our map does not have. Recommendation: accept the mismatch —
   the map never names districts to match SettlementForge's news.
6. **A settlement that dies and is resettled on its site** (owner; g Q4; F20): the old map to ruin, then a new growth on
   it — or a new map? Recommendation: one map (the ruin stages, then an epoch of regrowth on the old plan, item 8's
   regrowth-first order).

## 7. Evidence ledger

**CONFIRMED by this lane's census** (`census.py`, `census2.py`, `census3.py`, `ticks.py` in the session scratchpad
`…/scratchpad/sf/mapping/`, over the 155 generated dossiers and 12 after-tick files of `…/scratchpad/sf/outputs/r2/`,
branch 5d699cc68): no institution record carries an `id` or a `status` at birth (5 846 of 5 846); no dossier has two
records of one `catalogId` or one name; 22 count-range name patterns; 30 income sources whose percentages sum to 100 in
155 of 155; 17 government names; 44 power names in 8 categories; 6 power-relation types; 14 quarter name-and-phrase
pairs, "Eastern district (traditional)" on 154 of 154 Religious Quarters; the access key and its prose paired 1:1 in 155
of 155; walls with gates in 155 of 155; `config.terrain` null and `config.culture` = `cultureProfileKey` in 155 of 155
(raw `mediterranean` → `latin` in 18 of 18); the name joins (supply-chain processors 2 585 of 3 381; services 8 933 of
9 065; landmarks 537 of 1 281; trade dependencies 1 001 of 1 001; NPC institution 92 of 92; NPC power 1 440 of 1 440;
structural seats' linked institutions 44 of 44; social groups' power 393 of 393; institutional services 578 of 578
case-folded); after ticks: `controlledInstitutions` 28 of 28 resolve by `catalogId`, `spatialLayout` unchanged in 12 of
12, institutions ruined or impaired in place with no id, successors under new ids `npc.successor_<n>`; the SF tier against
our rung for all 155 (T1). **CONFIRMED by this lane's reading:** every design fact cited from `docs/ARCHITECTURE.md`
(sha256 e9c0b828…) and the owner items. **CONFIRMED by the sibling surveys** (relayed, not re-read here): every other
SettlementForge fact, with its section cited.

**PLAUSIBLE:** every design consumer, transformation, table (T1–T16), derivation (R1–R24), gap proposal, conflict
resolution and change-feed mapping above; the judgments J-M1–J-M12. The experiments that would settle the load-bearing
ones: (1) T12 and G-D4 — generate our towns at each of SettlementForge's prosperity labels and measure the mean household
band against the label; (2) J-M9 — replay the sf/outputs lit year through the proposed cadence and count epochs and
standalone events; (3) 4.2 and J-M4 — execute a `rename-faction` and an institution rename on a scratch copy of a
dossier (never in SettlementForge's tree) and check that the receipts identify every renamed key; (4) row 46's kind-family
resolution — apply it to the 796 unresolved processor names and count what still fails; (5) T13 — check that every
income source of the 12 culture towns falls in one sector row.


## Fable review (2026-09-27) — B-sf/mapping

**Verdict: CORRECTED** (Fable reviewer, lane fable-review/main/sf; the full review is `docs/fable-review/main/sf.md`).

**Re-derived and CONFIRMED:** the census re-run with this lane's own scripts (`census.py`, `census2.py`, `census3.py`,
`ticks.py`, outputs rewritten 20:57) and reproduced by an independent script (`scratchpad/fable-review/mycensus.py`):
5 846 / 0 / 0; 0 duplicate keys; 22 range patterns; 30 income sources summing to 100 in 155 of 155; 17 government names;
44 power names in 8 categories; 6 relation types; 14 name–phrase pairs over 13 names; walls = gates 155 of 155; the joins
(2 585 of 3 381; 8 933 of 9 065; 537 of 1 281; 1 001 of 1 001; 92 of 92; 1 440 of 1 440; 393 of 393; 578 of 578); T1's rung
table (70 of 70 below town; town 33 / 5; city 20 / 4; metropolis 21 / 2; 75 below 1 500); after ticks `controlledInstitutions`
28 of 28 resolved and `spatialLayout` unchanged 12 of 12.

**Corrections and refinements** (the verify lane's 18 corrections bind — `research/sf/mapping-verify.md` §0 — and the plan
adopted J-M1–J-M12 with them, J-P14):
1. **J-M1 — CONFIRMED, refined (J-Fsf-5).** The quarter's kind bias enters the placement solver as a soft `districts` row for
   the claim's class family, and a coherence bar REPORTS (never refuses) when the district carrying a dossier quarter name
   does not meet that quarter's identity row at the epoch it is named (`claim_unmet`). Home: the derivation table's R5 row;
   27d item 82 (a).
2. **J-M9 — CONFIRMED with the lapse threshold.** §7.7 item 3 as it stands lapses every rejection at any epoch whose target
   differs (V72); the plan's J-P6 (lapse only past the same ± 5 % tolerance; 27d item 76 (d)) is right and needed standalone
   too (J-Fsf-8).
3. **4.1 — CONFIRMED:** the population count is the dossier fact, every household a map fact; a household roster only ever
   an optional input (item 20 (h) (i), (iv)); the design's "the dossier's roster where one exists" is restated once at §7.7
   by pass c (a design impact, not a block).
4. **4.9 / G-D16 — CONFIRMED;** carried by 27d item 80 with V59's order (fate and `_worldPulseInactive` before `status`) and
   V60 (`captured_by_local_powers` is a criminal house's demotion closure, not a power change).
5. **G-D1 (b) — superseded by the plan's J-P13:** typed circumstance slices (economy shares, trade partners with bearings,
   power standings), `Faction` staying the module's (§10.1). G-D1 (a), (e), (f) stand (27d 79); G-D2 stands as a derived
   `TradeFlow` fed by `circumstances.trade` (27d 77); G-D3 types the existing untyped `circumstances.economy` (V35; 27d 78).
6. **Tables:** T11 keyed on `worldPulseFate` and `_worldPulseInactive` first (V59); T6/T7 gain the Roadside Shrine and the
   Waterfront's second phrase (V10); T8 six strings (V37); T16 `wartime`, `slave_revolt` (V27); 4.3's counts city 33–55,
   metropolis 47–61 (V46); R3 and row 49: a rival or cold-war partner keeps its listed trade — only `hostile` or a suppressed
   economy carries none (`domain/region/tradeLinks.js:26, 48`; V31); rows 26–28: `catalogId` absent on 695 records and on
   every simulator-built one, so T10 falls back on name, category and tags for them (V3, V57); row 59: `controlledInstitutions`
   by `stablePart(id ‖ name)`, first twelve roster positions (V30).
7. **Collective-record states — J-Fsf-4 (refining the plan's J-P12):** impairments by severity share on the record's stream;
   terminal states (`ruined`, `destroyed`, `removed`, a closure fate) on every member, because the dossier's fact is the
   kind's state and SettlementForge has no partial terminal state (`worldPulseFates.js:56-75`). Home: R26.
8. **J-M2–J-M8, J-M10–J-M12 — CONFIRMED** (J-M4's receipts: `rename-settlement`, `rename-faction`, `rename-npc`, `demotedFrom`,
   `promotedFrom`, a successor's `replacedNpc`).

**The plan checked against item 20 (h):** every gap resolves to DERIVE (PLAN §2.8, R1–R26; no ask anywhere in PLAN.md,
SUMMARY.md or 27d); optional fields only (`HostContext`, `RealmBlock`); the build order unchanged (M-1 and M0 gain nothing;
J-P1's creation half at M1 is stated, priced and vetoable — concurred); nothing of SettlementForge's map programs or
designs read (the seam lane's input-side reads ruled within scope, J-Fsf-6). PASSES on all four.
