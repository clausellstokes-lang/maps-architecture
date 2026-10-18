## §10 Simulation and content layer (FTG parity, with restraint)

*In plain words.* As in FTG, every building has a purpose and people: the town starts from how many people live there and
what such a town needs (our own tables, not FTG's), places those needs onto plots by rules, and derives households and
people on demand. What drawing and editing the map needs is in the base; hourly schedules, a day schedule, factions'
meetings and events are an optional module over the same ids, so the one-click map never waits for a simulation.

### 10.1 Scope and depth (judgment J-9; IMPROVEMENTS J-S adopted; the content locality contract)

**Base must-haves:** the sequential roster (S2) with its need propagation over the supply edges (§4.2 S2, §10.2), the
per-plot context vector, the eager allocation (S7b, S10a), the one placement solver with the relation templates, the siting
rulebook and the supply web (S10b, §4.7), the designation templates and the designation mutator (S11, §4.7), the `Use`
record with its hand relocation path (§2.7, §4.11), households and people derived lazily from their keys, typed open
spaces, rule-placed landmarks and furniture, a gazetteer via `query`. **Base schema from M1, materialised by the module:**
the relation store (family units, relations, memberships, postings), sub-locations, factions with roles and goals,
religions, the government's offices (§2.7), and the economy and personality schema stubs of D-32 (§10.3) — the supply
edges that place a workshop near its suppliers are base placement data (item 16), while prices, stock and trade volumes
remain the module's (D-32). **Optional module `@plat/sim`** (delivered at M4b, §16; never gating milestone 1, never in the
one-click path): professions ↔ workplace matching, occupancy and schedules as a query, the day schedule and hour clock with
external time sync, factions' and religions' meetings, events as templates, relations by the family-unit model. Schedules
and the day schedule are not in the base (J-9). Restraint: the map stays a clean plan; content lives in data, hover, the
gazetteer and export; one click never asks a questionnaire.

**The content locality contract (FTG-9; J-P21).** Content is global and relational (a family spans households, an employee
works across the town, a faction has members everywhere), while regeneration is spatial. So: (1) the allocation is
persisted, and a scoped regeneration re-places only its own scope's allocation — global rebalancing of content is a
separate, reported action; (2) once the module has materialised the relation store, a scoped regeneration changes no
relation outside the scope: relations of people whose households were superseded are carried over by the household's
address (§6.3) or dropped and reported; (3) the locality oracle and O2 (c) cover content and relation hashes as well as
geometry. The relation store's schema is in the base; its data is materialised once by the module and then persisted, and
the one-click path never pays for it.

### 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values)

The row types below are the base's reading surface; volume 11 owns every table's rows and values (its registry, V11 §3.1)
and declares the row types marked "V11 §2.x" with their fields; the base cites them.

```ts
interface RosterTables { classes: BuildingClassRow[]; districtKinds: DistrictKindRow[] /* the relation templates of the neighbourhood kinds (item 16 (a)) */;
  resources: ResourceRow[] /* the goods table (V11 §2.5): id, kind, bulk, perishable, value, comfortM, maxDistanceM, modes, security, site, demand, volume — the resource ids the supply edges name */;
  institutions: InstitutionRow[]; government: GovernmentRow[] /* offices and seat classes per government kind */; religions: ReligionRow[];
  households: HouseholdRow[] /* size distributions by class */; professions: ProfessionRow[]; farm: FarmTable /* §4.9 */;
  settings: RosterSettings /* rosterMode 'minimiseUnemployment'|'matchRatios', unemploymentThreshold, propagation.depth, placement.extensionWeight, detourFactor, crypt.rankShare (V11 §3.5.1) */;
  roomProgram: RoomProgramRow[] /* item 28: the room programmes, below, with the plan rung's tables (V03 §2.4) */; basementGate: BasementGateRow /* item 29 (b): the basement's terrain-gate values, one row, below */;
  covers: CoverRow[] /* item 63: the fronts a concealed class may take, below */;
  classMix: ClassMixRow[] /* item 71 */; clusters: ClusterRow[]; tenure: TenureRow[] /* item 70 */;
  quarterIdentities: QuarterIdentityRow[]; powerLinks: PowerLinkRow[]; sectorLinks: SectorLinkRow[]; bandRanges: BandRangeRow[] /* item 72 */;
  sectors: SectorRow[] /* item 78: the sector set the economy slice is keyed by (§7.7 layer 2) */;
  portRows: PortRows /* item 88: the staged rows the dossier port fills — schema-complete, empty, extension */;
  names: NamePack; provenance: Provenance }   // GovernmentRow, ReligionRow, HouseholdRow, InstitutionRow, ProfessionRow, HeightsRow, CompatibilityRow, ClimateRow, EraRow, GrammarDef, TemplateDef, RosterSettings, item 110's row types and the tables named above are declared as V11 §2.8 (and §2.4, §2.5) gives them; RosterTableId is the union of these field names; the siting tables (`siting.profiles`, `siting.families` of `RelationFamilyRow`, `siting.pairs` of `SignaturePairRow`, `siting.web`, `siting.custom`) and the dossier tables (`dossier.archetypes`, `dossier.categorySynonyms`, `dossier.keywords`, `dossier.ladders` of `LadderStepRow`, `dossier.status`) are registry tables of their own (V11 §3.1), read beside these
interface BuildingClassRow { id: string; use: string; perCapita: [number, number]; perOther?: { class: string; ratio: number }; min: number; max: number; firstAtPopulation: number;
  requires: ('water'|'coast'|'route'|'farmland'|'ore'|'stone'|'timber'|'fish'|'clay')[] /* the site-resource gates S2 reads from SiteResources (§4.2) */;
  presence?: { member?: number /* 1 when absent */; when?: PresenceWhen; law: PLaw }[] /* read by S2 only at the rungs whose RungProfile.frameLaw is 'territory' (the village rows, V07 §2.4): member m is drawn once on roster/<class>/<m> against the law of the first entry for m whose condition holds, m ≥ 2 only when m − 1 is present; the members after the drawn ones are the per-capita count less those drawn, never below 0; the roster's coverage option adds none there; a government's villageSeat class is present with at least one member whatever its entries (V07 §3.11 DR11); absent: perCapita, min and firstAtPopulation as at every rung; PLaw and PresenceWhen are V07 §2.2's and §2.4's */;
  outside: boolean; liveIn: boolean; cluster?: string; noxious: boolean; lifestyleBand: string; shopProb: number; priority: number;
  relations: RelationRule[] /* the class's relation template (item 16 (a)) */; produces: string[] /* resource ids */; producesShare?: Record<string, number> /* item 105 (c): the output shares, equal when absent */; supply: SupplyEdge[] /* its supply chain (item 16 (b)) */;
  profile: SitingProfile /* item 103: the compiled siting profile — family, emits, sensitive-to, needs, clientele, alignment, competition, coverage, balance, orientation, split, landmark; SitingProfile, NeedSpec, CoverageSpec, Nuisance, Lvl, Need and Clientele are V11 §2.3's */;
  staff: { band: string; workers: [number, number] }[]; villageForm?: string /* the class that plays this class at village rungs — a `v.` class key (V11 §2.3, §2.9); absent, the class plays itself */; templateFamily: string;
  template: DesignationTemplateRow[] /* one row per band: the designation template S11 reads (item 19; §4.7) */; useRules: UseRuleRow /* item 17; §4.11; absent: V06 §3.9.9's clientele defaults */;
  secondaryChance?: number /* market rows: the TOWN chance of a secondary market (§4.2 S2) */; salvageM3: Record<string, number> /* item 8: the material yield and debit §4.11's ledger reads */;
  drain: 'none'|'pit'|'channel'; underground: 'never'|'allowed'|'preferred'; undercity: 'never'|'allowed'|'preferred' /* item 65 */;
  undergroundAccess: { prob: Record<string, number> /* item 64: per band row, interpolated along the value — the chance that a basement within reach of an underground element holds an access (II.7.3) */ };
  crypt: 'always'|'basement'|'never' /* item 109 (k) (2): default 'never'. always: the building always has a crypt, taken by §2.6's no-refusal crypt ladder (full, half, raised) and exempt from the terrain gate's wet-ground refusal; basement: a crypt exactly when §2.6 draws a full, half or walk-out basement, the class's cellar row its crypt chance, the terrain gate binding; never: none. A crypt is part of its building's basement, never an underground system and never a catacomb source */;
  cryptM2?: [number, number, number, number] /* m²: the crypt ring's growth target at poor, modest, prosperous, rich; required when crypt ≠ never */;
  deckOk: ('bridge'|'pier'|'mole'|'quay')[] /* item 110 (d): compiled — the deck kinds a class may stand on; absent = [] (V11 §3.24.4) */;
  concealment?: ConcealmentRow[] /* item 63: the default-mode weights of a class our tables mark clandestine; absent: never concealed unless the dossier or an assignment says so */;
  distribution: 'district-defining'|'dispersed'|'singular'; significance: number; powers: { kind: string; weight: number }[]; sectors: { sector: string; weight: number }[] /* items 72, 78 and 79: how the class spreads, its weight in a neighbourhood's reading, its association with the power kinds and the sectors (weights summing to 1 per column) — read by §4.5's neighbourhood character */;
  subLocations: SubLocationRow[]; openingHours: OpeningRow[]; tags: string[];
  label: string; icon?: string /* a V09 §5.1 sprite id, compiled from the family */; synonyms: string[]; commonness: number /* the roster reader's tie-break (V11 §3.5.1) */ }
interface RelationRule {   // one row of a class's or a neighbourhood kind's relation template; read by the placement solver (§4.7 S10a, S10b) and, for district kinds, by §4.5's typing scorer
  kind: 'adjacent'|'near'|'far'|'sameStreet'|'clustered'|'avoid'                                  // to another class, cluster tag or feature class
      | 'upwind'|'downwind'|'upstream'|'downstream'|'nearWater'|'highGround'|'lowGround'|'dry'   // environmental: without a `to`, the plot's own ContextVector.upwind and upstream, terrainClass, dist.water (§2.5); with a `to`, relative to the nearest member of `to` (§4.7 S10b)
      | 'frontage'|'nearGate'|'nearMarket'|'nearHarbour'|'nearCentre'|'extramural'|'intramural'  // access: roadClass, dist.* (the nearest of N markets, item 24)
      | 'plotArea'|'plotShape'|'frontageM'                                                        // capacity: areaM2, shape, frontageM, against the template's size budget
      | 'band'|'exposure'                                                                         // the prosperity band; Plot.exposure and knownTo (item 30)
      | 'coverage';                                                                               // item 103 (f): unit, per and target below
  to?: string /* a class, a cluster tag, or a feature class of V11 §3.3.3 (emit:<n>:<L>, sens:<n>, align:*, #<tag>, landuse:<kind>, deposit:<family>, bridge, quay, wall, wallInner, open:square, open:green, gate, harbour, raised:terminal), whose distance rasters §4.7 S10b builds like its provider rasters */;
  withinM?: number; beyondM?: number; min?: number; max?: number; values?: string[]; falloff?: 'step'|'linear'|'smoothstep';
  strength: 'hard'|'soft'; weight: number /* soft rows: the score at full satisfaction; hard rows: 0 */; extension: boolean /* true: a row the references lack, scaled by placement.extensionWeight (§4.7 S10b) */;
  id: string /* V11 §2.4's row id forms (cls/, fam/, sig/, sup/, cov/, spc/, bal/, dk/, pc/, drv/, rw/, ter/, ret/, deck/, deckok/, slot/, spec/, cross/), reported by PlacementSolver.explain */;
  unit?: 'district'|'walk'|'households'|'settlement'|'parish'; per?: number; target?: number /* kind 'coverage' only */ }
interface SupplyEdge { resource: string; maxDistanceM: number; mode: 'street'|'river'|'sea'|'road'; strength: 'hard'|'soft'; weight: number;
  perConsumers: number /* S2's need propagation: one provider per this many consumers (§4.2 S2) */; substitutes?: string[] /* resources whose provider also satisfies this edge (S2's need propagation, S10b's links) */ }
interface DesignationTemplateRow {   // one per band of §4.5's band set; continuous columns interpolate along the prosperity value, discrete ones switch at the cut (§4.7 S11)
  band: string; specialisation?: string /* discrete: the designation's variant in this band; drives the use's specialisation, its description and its room programme (item 28) */;
  plotAreaM2: [number, number] /* the size budget a join is asked for (§4.7 S10 (7)) */; footprintM2: [number, number, number] /* p10, p50, p90 */; floors: [number, number];
  heights: string /* the template family's HeightsRow (V11 §2.8), with its attic, parapetCm and towerStoreyCm columns */;
  structures: { role: string; count: [number, number]; footprintShare: number; required: boolean; houses: boolean /* item 28 (f): a residential slot — its building houses households by §4.7's generation fill; a live-in class's main slot is one whatever this cell holds, unless §4.7's fill finds it no household (BuildingSlot.unhoused, §2.5) */;
    composition?: string /* stage 3: the slot's own CompositionRow (V02 §2.3); absent: V02 §3.2's role chain */ }[] /* the slot list: main building, workshop, forge, yard, court, stables, store, dwelling, journeymen's rooms … data-defined roles */;
  arrangement: 'row'|'compound'|'detached'|'hovel'|'tents'|'cluster'|'institution'; coverage: number; densityShift: number;
  jitter: { maxM: number; minM: number } /* m — item 43's cap and floor (§4.7 S11) */; separation: 'party_wall'|'slot'|'passage';
  frontage: 'none'|'lean_to'|'stall'|'shopfront'|'arcade'|'gate'|'wall' /* discrete: the main slot's frontage treatment; the entrance set is §2.6's */;
  yard: { part: string; share: number }[] /* court, garden, formal_garden, forecourt, orchard, midden, pen … (§2.5 YardPart) */; bounds: 'none'|'fence'|'hedge'|'wall'|'railing' /* the compound rows' 'wall' is an extension the parity presets set to 'fence' (item 44) */;
  programme: string /* item 28: the key of a RoomProgramRow, read by §2.6's plan rung */;
  composition?: string /* stage 3 and item 110 (c): the CompositionRow (V02 §2.3) the massing and the composer read for the main slot — the base outline builder's stepped construction from M3a (item 426); absent: V02 §3.2's resolution chain */;
  underSize: 'compact'|'refuse' /* what the mutator does when the plot cannot be joined to the size budget (§4.7 S11) */;
  replaceability: 'immediate'|'short'|'long'|'ruin_only' /* item 31: read at the plot's builtBand row */;
  works?: string /* item 67: the key of the WorksTable row (§4.11); absent: the class's default row */;
  households: { built: number; max: number } /* item 31: the households the design is built for, and the most it holds when let out */;
  entrances: { side: number; rear: number; service: number; capSide: number; capRear: number; yardDoorMinM2: number } /* item 29: side, rear or service door probabilities given an access edge beyond the frontage, their caps, the yard area that recommends a yard door — §2.6 reads them */;
  cellar: { prob: number; kinds: { full: number; half: number; walkout: number }; slopeCm: Cm; rockCost: number; depthCm: Cm /* default 220 */; insetCm: Cm /* default 60 */ } /* item 29 (b): §2.6's basement decision's inputs; the terrain gate is §2.6's, its values the basementGate row */ }
interface UseRuleRow { serviceRadiusM: number; closeShare: number; closeAfterYears: number; starveAfterYears: number; inertia: number; moveChance: number /* per year */ }   // §4.11's use step (item 17): a use closes when its Use.strain (§2.7) of kind demand has lasted closeAfterYears, or of kind supply starveAfterYears, on the weekly clock; a document's epoch counts migrate to years one for one (§7.5)
interface DistrictKindRow { kind: string; relations: RelationRule[] /* read by §4.5's typing scorer and S7b's affinity rows, and by the solver for a whole-neighbourhood assignment (§7.7) */;
  affinity: { tag: string /* a class tag */; band?: [string, string]; weight: number }[] /* read by §4.5's typing scorer (a kind's score gains Σ weight × the remaining demand of the matching classes) and S7b (1)'s affinity (V11 §3.9) */ }
interface ConcealmentRow {   // item 63: one row of a clandestine class's default-mode weights (§4.7's Concealed institutions); our own rows, extension
  band?: string /* absent: every band; rows interpolate like every band row (§4.5) */; districtKind?: string /* absent: every kind */;
  weights: { none: number; front: number; hidden: number; underground: number } /* the non-none weights are extension, scaled by placement.extensionWeight (0 in the parity presets) */;
  hiddenWithFront: number /* the share of hidden and undercity placements that also take a front, drawn on siting */;
  accessMultiplier: number /* item 64: × the access probability of a surface building that carries this concealed use (II.7.3); default 6 */ }
interface CoverRow {   // item 63: the plausible fronts of one concealed class; our own rows, extension
  trueCls: string /* the concealed class */; band?: string /* absent: every band */;
  covers: { cls: string /* a front class whose designation template has a row at the band */; weight: number }[] }
```

**The sequential roster (FTG-14; J-P20).** FTG's documented *shape* (`ftg-docs-params.md` §3.3), none of its 209 types, 80
nodes, 299 professions or 323 items. A **virtual population** advances on a fixed grid of Δ = 10 people up to the rung's
maximum. At each grid point the target count of every class is a monotone step function of the virtual population —
`perCapita` or `perOther` ratios converted to per-person ratios, core versus shop pools, lifestyle-banded pools with rare
outliers (weights ours), hard `min` / `max`, **size gates** (`firstAtPopulation`), **resource gates** read from
`SiteResources` (no farmland → no farms, shops instead), and, where a class has a coverage row and no dossier gives its
count, the coverage target as a weighted option beside its per-capita rate, never a minimum (item 103 (f);
`coverage.rosterWeight`, V11) — and every class below its target receives its next building, in class-priority then
class-id order (the compiler orders the classes so that every class a `with`, `without` or `perOther` names is drawn first,
refusing a cycle). Every draw is keyed by the building's ordinal (`roster/<class>/<ordinal>`: shop or core, lifestyle
outlier), so the n-th chandler is the same chandler at any population. The run records each building's **appearance
population**; the manifest for population P is every (class, ordinal) that appeared at or below P. Hence manifest(P₂) ⊇
manifest(P₁) whenever P₂ > P₁ (property test on 1 000 seeds, §13.2), an epoch's delta demand is exactly the suffix, a
population fall selects the suffix in reverse order, negative deltas arise only from declared circumstance events, and
§7.8's population control is monotone by construction. **Mode (COV-FTG-B06):** `settings.rosterMode`:
`'minimiseUnemployment'` (default: at each grid point, when the unemployed share of the virtual population exceeds
`unemploymentThreshold`, the workplace class with the largest weighted job deficit receives one extra building) or
`'matchRatios'` (the configured ratios only, FTG's alternative); both are grid-sequential, so both are prefix-stable.

**Output:** demand per class with area / frontage requirement classes, district affinities, cluster tags, live-in flags,
outside flags and wealth bands; the **town-level character** shifts the ratios — read from the economy slice's sector
shares (`circumstances.economy`, §7.7 layer 2) through each class's `sectors` weights, so one input drives both the roster
and the neighbourhoods' economy dial (items 72 and 78; an even mix, the neutral default, shifts nothing). **Government
(COV-FTG-B13):** the blueprint's `government` circumstance selects a `GovernmentRow` whose offices force seats — a crown
seat a royal castle or palace, a seigneurial lordship a lord's castle or keep, an ecclesiastical lordship a bishop's palace
beside the cathedral, a chartered commune a town hall and guild halls, a merchant oligarchy a merchants' hall — plus a
military share (guard posts per 1 000 inhabitants; barracks at CITY and above near the castle or the gates); the castle
toggle `auto` reads it. At the rungs whose `RungProfile.frameLaw` is `territory` the step reads the row's `villageSeat`
alone — a dossier government's (§7.7 DR11) or an `@seat` record's `villageSeat` class present with at least one member, a
request government's feeding only the `presence` conditions — and reads neither the row's seat class, nor its offices'
seat classes, nor its military share; there an `@office` record binds to the `villageSeat` member's building and a
religious office to the parish church, and a guard post arises only from a town-watch record or a class's `presence`
entries (V07 §3.2 (3), §3.11). **Religion (COV-FTG-B14):** religions come from `ReligionRow`s with worshipper shares
(shifted by the town-level character), a practice share and clergy per 1 000; temples per religion are proportional to its
practising worshippers; each religion has a faction (§2.7). S2 writes each `Religion` record (§2.7) from them: its
`practiceShare` and `clergyPerThousand` copied from the row, its `deities` the dossier's `religion.deityKey` or
`deityName` when present (§7.7 DR14), else the row's pantheon — read by §10.4's dedication of the principal temple. S7b
then allocates the demand and S10b places it (§4.5, §4.7); where capacity is short, placement's reconcile and F-SITING's
ladder decide, and surplus capacity is typed as yards, greens or vacant plots (§4.7 S10b); population is honoured within
tolerance and reported (O7 a, e).

**Relation templates, supply edges, designation templates and use rules (items 16, 17 and 19; rows are data, §7.6,
re-signed by the corpus phase, §13.9).** A class's `relations` are the rows the placement solver filters and scores by (§4.7
S10a, S10b); its `produces` and `supply` are the resource and dependency graph S2's need propagation walks (§4.2 S2) and the
solver's links are bound on; a neighbourhood kind's rows serve §4.5's typing scorer and a whole-neighbourhood assignment
(§7.7). Default rows are the references' placement rules where a reference has one and soft tendencies where it has none
(item 23; `extension: true`, scaled by §4.7 S10b's `placement.extensionWeight`) — for instance a tannery `downstream` soft
(weight 1.0), `nearWater` hard and `extramural` soft, with supply `hides` 800 m by street and `bark` 2 000 m by road; a
brewery with supply `malt` 1 000 m by street (hard) and `nearWater` soft; a maltings with supply `grain` 3 000 m by road; a
bakery with supply `flour` 600 m by street; a warehouse `nearHarbour` 150 m hard with supply `import` by sea; an inn
`frontage` primary or through soft (weight 1.0) and `nearGate` 150 m soft; a market hall `nearMarket` 60 m hard; a trade
group's shops `sameStreet` and `clustered` soft; a mill `nearWater` hard with a fall (its outside row, §4.9). A row is hard
only for a physical need (item 103 (c)), and in the parity preset whose reference has the rule (§7.6's per-preset values).
The `template` rows are S11's (§4.7); the `useRules` are §4.11's use step's; the `produces` of the outside classes — grain,
timber, fuel, stone, ore, fish — are the hinterland's food, fuel and timber rows (§4.9, item 26). No row of this table names
a material: a material is a rendering attribute (§2.6), and §4.11's `WorksTable` alone reads it, for durations — time, never
shape (item 67).

**The siting rulebook (item 103; the rows V11's).** Each class carries a **siting profile** (`BuildingClassRow.profile`):
EMITS (smell, smoke, noise, fire risk, water pollution, heavy traffic, crowds, disorder, sacredness) and IS SENSITIVE TO (the
same list); NEEDS (running water, a river bank, a road, a gate, the harbour, the market, space, security, secrecy);
CLIENTELE (daily-local, town-wide, travellers, elite, clandestine), which sets access — daily needs dispersed by catchment
near homes, town-wide trades on streets feeding a market, travellers' services at gates, bridges and quays; SUPPLY (its
inputs and outputs, attracting by transport cost × volume); ALIGNMENT (law and enforcement versus crime; sacred versus
profane; elite versus common: opposites repel, like attracts); COMPETITION (a craft that clusters on its own street versus a
service that spaces itself for its catchment — the `distribution` column); COVERAGE (a catchment unit and a soft target per
unit); BALANCE, ORIENTATION and SPLIT (item 105, 107; below). A dozen **relation families** (`RelationFamilyRow`) turn
profiles into the solver's pulls automatically: `resolveSiting` (V11 §3.3.4) derives, per class, `RelationRule` rows (ids
`fam/…`) from the families; a sparse **signature-pair table** (`SignaturePairRow`, ids `sig/…`) adds, with its reason, the
relations the families do not capture (a bakery near the mill and the granary; a tannery near the shambles yet downstream
and downwind of homes; dyers upstream of tanners; smiths and farriers at gates and stables; the thieves' guild away from the
garrison, watch and courts yet near crowds and wealth). A catalogue kind gets a default profile from SettlementForge's tag
vocabulary, its own row refining it. Every family and pair row is soft with a weight, except true physical needs; the solver
sums the pulls with the field and the character under §4.5's soft-term contract (item 103 (c)). Provenance per row
(§7.6): emulation first — what FTG's resource graph and professions and MFCG's ward logic imply — then historically attested
siting, each row marked "general historical knowledge, not corpus-witnessed" where the historical checks record nothing
(item 104 (f); the corpus law "possibility, not prevalence" binds).

**Custom kinds — a profile from what the dossier carries (item 104 (a)–(e); the rows V11 §3.13).** A custom institution
(`source: 'custom'`, keyed by its `localUid`, §7.7) resolves its siting profile — and with it its class — by this order,
strongest first, each contribution recorded with its source: (1) the author's map-side declaration for that kind (item 101:
a place, a quarter, a pin, or a profile override stored in the map document by `localUid`, never written to the dossier);
(2) the scene archetype `sceneProfileId` → one of the 17 rows of `dossier.archetypes` (agrarian-farmstead, agrarian-mill, civic-archive,
civic-hall, domestic-house, exotic-tower, industrial-forge, industrial-workshop, martial-barracks, martial-keep,
martial-watchtower, mercantile-guildhall, mercantile-inn, mercantile-market, ruined-landmark, sacred-sanctuary,
sacred-shrine); (3) the free-text `category` → the generic profile of its catalogue category or content group, through a
small synonym table (`dossier.categorySynonyms`); (4) the `tags` → profile deltas through the canonical tag vocabulary
(its tag delta rows, V11 §3.13); (5) the definition fields when the port receives them (§7.7; optional) — `authority` → the alignment family,
`defenseRole` → garrison, watch and fortification siting, `criminal` → clandestine and alignment rows (item 63's
concealment), `magical` → arcane rows, `foodImpact: produces` → an agrarian edge, `economicWeight` → significance (§4.5 (1))
and link volume (§4.7); (6) keywords of the name and description (`dossier.keywords`) — the weakest signal, flagged low-confidence
in the report; (7) the fallback, the generic `Other` profile (main-street frontage by `landmarkLevel`, no nuisance,
dispersed). `landmarkLevel: landmark` raises significance and asks for a prominent site (a square frontage, high ground, a
vista). The resolved profile, its sources and their weights are stored with the use, shown by the clerk and editable by the
author. Distribution and coverage default by the resolved profile (a service-like kind disperses by catchment, a guild-like
kind may cluster, a landmark is singular). Resolution is a pure function of the custom record, our tables and the map's
declarations, keyed by `localUid` (a rename changes nothing); a new revision (a changed content hash) re-resolves the
profile and re-sites the use by least disruption (§4.7 S10b). It never fails: a custom kind always resolves a profile.

**The supply web's rows (items 105, 107; V11 §2.5, §3.7).** The goods table (`ResourceRow`) gives each good `bulk`,
`perishable`, `value`, `comfortM` (the satisfaction plateau, §4.7 S10b), `maxDistanceM`, `modes`, `security`, `site` (a
good sited on a hinterland land use, §4.2 S2), `demand` and `volume`; absent, `comfortM` is 0 and orientation `balanced`,
the base's linear decay. A class's **orientation** is derived from the goods table — `source` when its inputs' bulk × volume
exceeds its outputs' by a table factor (ore into iron, logs into charcoal), `market` when an output is perishable or bulkier
than the inputs (bread, beer, fresh meat), `balanced` otherwise — and overridable per row; its **balance profile** (everyday
service, town-wide specialist, heavy processor, wholesale and storage, defaulted from its clientele) weighs spread against
pull; its **same-kind spacing** row a radius per class; its **split** row declares a works and a shop (the butcher, the
brewer, the potter by default). Their on-off switches are V11 §3.7.4's (`siting.web.orientEnabled`,
`siting.web.splitEnabled`, false in the parity presets). A dossier chain's links weaken by the status table (`dossier.status`) for an
`impaired` or `vulnerable` status (item 105 (i)); an `entrepot` chain's ends are the import and export pulls (§4.7 S10b).

**Institution ladders (item 108; `dossier.ladders` of `LadderStepRow`, V11 §3.12, rows pinned to the port's baseline, provenance `ref:SettlementForge
institutionLadders.js`, re-checked when the baseline moves).** Every ladder pair and subsumption rule is typed by what the
step means on the map: COUNT (more of the same, numbered or "multiple") — a collective record whose members are n buildings
of the lesser class; QUARTER (a trade's district or quarter) — a district-defining record whose district holds the raised
share and which owns the trade's members (§4.5 (3)); GUILD (a trade's guild) — one guild hall, the record's own
building, plus a collective of the trade's workshops tied to the record; SIZE (a bigger single establishment: brewery, major
hospital, city hall, garrison, shipyard; city granaries as one compound of several stores) — one larger building or compound
by its template, no extra members; REPLACEMENT (a professional watch over the militia, city walls over town walls) — the
greater only. A custom institution whose library `subsumes` names other kinds is typed the same way — a guild-like kind over
a craft GUILD, a larger same-function kind SIZE — default SIZE when unknown. Member counts are S2's (§4.2 S2); a ladder step
over time adds or removes members by least disruption (V06): an upgrade keeps the existing building as member #1 and places
the rest; a demotion keeps the member nearest its demand and vacates or ruins the rest by fate (item 17). A step's
`identity` names the QUARTER row its district takes (`QuarterIdentityRow.definedBy`).

**Markets, wealth bands and the countryside's rows (items 24, 26 and 27).** The `market` class row demands the markets by
size — `min` 1 (the principal), `firstAtPopulation` 10 000 and `perCapita` one per 12 000 inhabitants for the secondaries,
`secondaryChance` 0.15 at TOWN (our own rows; §4.2 S2; §13.5's anchors are MFCG's secondary plazas and FTG's two market
squares) — and the market hall's and the market trades' rows cite the market they serve by rank (`nearMarket`, the
principal by default). `HouseholdRow.band` and every class row's `lifestyleBand` name a band of §4.5's band set; the
household shares' default weights are FTG's captured lifestyle distribution (§4.5's table; provenance `ref:FTG lifestyle
distribution`), shifted by the town-level character, and every band-keyed row set of this table may omit bands, which
interpolate (§4.5, item 27). The farm table's fuel and timber rows, the farm modes and the outside classes' seeding rows are
§4.9's. The sky rows (item 213; V05 §2.4; their values V11's): the district kinds `sky-island`, `sky-palace`, `sky-temple`,
`sky-prison` and `sky-tower` (keyed apart from every ground kind), and the classes `sky_landing` and `sky_landing_top`, a
positioned pair placed by their access and never by a pull, `sky_landing` with a `front` column for a secret access's
landing.

**Under a fall (AM-8).** A population fall selects the suffix in reverse ordinal order, and its households leave by §4.11's
step (c); it never removes a building by arithmetic: the standing stock follows with §4.11's dwell lag, and a later rise
reoccupies the same suffix first. `BuildingClassRow.salvageM3` is the class's material yield when robbed, cleared or
dismantled, and the debit of a build or repair of that class — read by §4.11's ledger.

**Replaceability, households, entrances, cellars and the room programme (items 28, 29 and 31; J-A28.43, J-A29.41).**
`DesignationTemplateRow` carries them in its `replaceability`, `households`, `entrances` and `cellar` columns (above);
`RosterTables.roomProgram` holds the room programmes and the plan rung's tables — the role table (`RoomRoleRow`), the
furniture catalogue (`FurnitureRow`), the plan geometry row (`PlanGeometryRow`), `PatternRow`, `EntranceAnchorRow`,
`WingAffinityRow`, `SubLocationRoleRow` and `AccessHostRow`, their types and default rows V03 §2.4 — and
`RosterTables.basementGate` the basement's terrain-gate values:

```ts
interface RoomProgramRow { for: { cls: BuildingClass | string /* a V11 class id, or '*' in a generic slot row */; family?: string /* a V11 template family */; slot?: string /* a structure slot role, '#n' for the n-th of that role */; half?: 'works'|'shop'; band: string; use?: string /* a specialisation name (V11 §3.6.2) */; era?: string };
  rooms: RoomRuleRow[] /* the programme */; shared?: 'all'|'none'|RoomRole[]; unitHearth?: boolean; unitOneRoom?: boolean; fill?: RoomRole[]; staffSleepIn?: number; seatingExits?: boolean /* V03 §2.4, §3.3 S6 (d) */;
  pattern: Record<'basement'|'ground'|'upper'|'top', { weight: number; pattern: LayoutPattern }[]> /* §2.6's layout patterns, weighted per storey class */; circulation: { num: number; den: number } /* integers: the share num/den of a storey given to halls and corridors — §2.6's capacity reads it exactly */;
  stair: { placement: 'by_entrance'|'rear'|'centre'|'tower'; kind: StairCore['kind'] } /* the stair core §2.6 places before any cut */; basementAccess: 'core'|'trapdoor' /* the access §2.6's basement decision derives into Basement.access for a cellar that is no walk-out, read at the plot's builtBand */;
  furnish: { density: number; wallBias: number } /* multipliers (default 1) of the role table's cells */ }
interface RoomRuleRow { role: RoomRole /* §2.6: data-defined */; scope: 'unit'|'shared'|'service'|'circulation' /* item 28 (f): a room of one household's unit, one the households share, the use's or the staff's, or a corridor or stair hall — §2.6's interior ladder says which scopes a band's row allows */;
  count: { n: number; law: 'const'|'perHousehold'|'perStorey'|'perCapacity'|'perSubLocation'; capacity?: string; tag?: string; perRoom?: number /* the perCapacity divisor */ };
  area?: [number, number, number] /* m²: min, target, max; absent: the role table's cell (V03 §2.4) */; storey?: 'any'|'ground'|'upper'|'top'|'basement'|'notBasement'|'belowTop' /* absent: the role's */; exterior?: 'none'|'some'|'max'; door?: 'door'|'arch'|'open' /* absent: the role's */; maxDoors?: number;
  adjacency?: { kind: 'hard'|'soft'; to: 'core'|'entrance:main'|'entrance:yard'|RoomRole; via?: 'direct'|'corridor'|'under' }[] /* absent: none */; priority: 'hard'|'soft'; hearth?: boolean; half?: 'works'|'shop'|'both' /* default both */;
  concealed?: boolean /* item 63: a room of a concealed use's programme — placed away from the main entrance and off the public circulation hub (§4.7) */;
  furnish?: { density: number; wallBias: number; glyphs: string[] } /* absent: the role's */ }
interface BasementGateRow {   // item 29 (b): the values §2.6's basement gate reads; one row per table version
  waterTableM: M /* default 40: within this distance of a shore the water table is the nearest water body's surface plus the freeboard */;
  freeboardCm: Cm /* default 50 */; drainageAccumCells: number /* default 100: the flowAccum at which a hydro cell is the drainage line elsewhere (§2.3; our own, calibratable) */ }
```

The **room programme** lists the rooms a building of that class, use and band must and may have — each with its size band in
m², its storey, its openings, its adjacencies and how many (a fixed number, a number per storey, one for each household of
item 31's `relet`, or a sub-location's capacity) — which §2.6's plan rung writes first and then cuts the walls to fit (item
28), so rooms are never cut before the programme is known. The programme rows follow §2.6's **interior ladder** (item 28
(f)): the ladder's row for the occupants' band gives the cross-class structure — how many households the shell holds, each
unit's rooms, the shared rooms, the staff rooms and their size beside the owners', the circulation form and how large the
rooms may be — and a class's programme row adds what a smithy, an inn or a chapel needs; the `programme` row is read at the
occupants' band (the field band, J-A19.43) and the `households` column at the plot's `builtBand` (the shell's capacity,
§2.6), so the interior has no floor while the shell keeps its own (§4.11). `LayoutPattern`, `StairCore` and `RoomRole` are
§2.6's, with the role names. The plan rung's `plan.program`
stream draws the fractional part of a count law (§6.1). Households per building follow the roster's households — with a
dossier, the households that fill its population (§7.7's derivation table; item 20 (h)) — and item 17's relocation (§10.3);
the `households` row and the shell's floor area bound `relet` through §2.6's one capacity function, which the generation
fill (§4.7), `relet` and F-PLAN (§5.2) all read; with no epoch every residential building houses what §4.7's generation
fill gives it — at least one household and never above its capacity — so the static baseline is unchanged (item 23). Every
column is data with provenance, editable and calibratable (§7.6, §13.9). The entrance rows default to one street entrance
per building — the owner's rule (item 29; provenance `owner`): the FTG client of the 2026-09-25 capture sends no door, its
road-facing anchor being a night light (item 50), and MFCG 12710731's model carries no door record (an inference) — with
side, rear and service doors as our tendencies (`extension`, 0 in the parity presets, item 23); the cellar rows are item 29
(b)'s class rows, whose extensions §2.6's emulation note names; the reference's basement share is a descriptive baseline
only (§13.5).

**The `drain`, `underground`, `undercity`, `undergroundAccess` and `crypt` columns (II.7; items 12, 14, 64, 65 and 109).**
`BuildingClassRow.drain` is the class's drainage need: `none` (tents, sheds, hovels), `pit` (households and most workplaces:
a cess pit or the street gutter of their own), `channel` (the trades and institutions that discharge foul water: tanners,
dyers, fullers, brewers, slaughterhouses, baths, hospitals, monasteries); `underground` names which classes a sewer-front
underground neighbourhood may hold or prefers (II.7.3); `undercity` which classes the undercity may hold or prefers (II.7.5)
— `preferred` for its microcosm: the black market, a fence's hall, a criminal guild's seat, a tavern, a forbidden shrine, a
fighting pit, a healer; `allowed` for the dwellings of the squalid and poor bands and the small trades that serve them;
`never` for the rest; `undergroundAccess.prob` is, per band row interpolated along the value, the chance that a surface
building of the class whose basement reaches an underground element holds an access down to it (II.7.3's *Basement
accesses*) — higher for breweries, bathhouses, warehouses and inns (0.15–0.30 by band), low for houses (0.02, raised with
the plot's age by II.7.3's age term), 0 for a barracks, a courthouse and a temple; a user adds an access to any building by
item 66's edit (§7.3 item 9); `crypt` and `cryptM2` are the churches' crypts (the cathedral `always`, the largest crypt in the
settlement; other churches by their rows; crypts are never catacombs, II.7.6). Every non-`never`, non-zero cell is an
`extension` (no reference has an underground).

**The `concealment` column and the cover table (item 63).** `BuildingClassRow.concealment` gives, for a class our tables
mark clandestine — a thieves' den, an assassins' house, a smugglers' store, a forbidden cult, a black market, a spy ring —
its default-mode weights per band and district kind (`front` highest in every band, `hidden` next in the poor and squalid
bands, `underground` where an underground allocation may exist), the share of hidden and undercity placements that also take
a front, and the multiplier on the building's access draw; `RosterTables.covers` gives each concealed class its weighted
plausible fronts per band (an assassins' house behind a tavern, a fencing hall or an apothecary; a smugglers' store behind a
warehouse or a chandler's; a thieves' den behind a tavern, a pawnshop or a bathhouse; a forbidden cult behind an almshouse,
a bathhouse or a bookbinder's …), and `RoomRuleRow.concealed` marks the rooms of a concealed programme. Every row is our
own and an `extension`, so the parity presets conceal nothing; how they are read is §4.7's *Concealed institutions*.

**The rows of items 70–72, 78, 79, 82 and 88 — their types and default rows.** Every row is our own, calibratable (§13.9)
and an `extension` — zero, a step or empty in the parity presets (item 23) — unless it says otherwise.

```ts
interface ClassMixRow {   // item 71 (§4.7's class mix): one row per band of the band set; a band without a row interpolates (§4.5)
  band: string; weights: { cls: string /* a residential class id */; weight: number; wealthShift: number /* × (wealthLevel − 0.5), §4.7 */ }[];
  prestige: { frontage: 'tier1'|'square'|'park'|'corner'|'water'; weight: number }[]; sun: number /* item 102 (d): prestige.sun, × the climate row's sunlight cell */ }
interface ClusterRow {   // item 70 (§4.7's informal clusters): by band × climate × era
  band: string; climate?: string; era?: string; kinds: { cls: 'shack'|'tent'|'lean_to_shelter'; weight: number; footprintM2: [number, number]; depthM: [number, number] /* drawn in the range on siteplan */ }[];
  householdsPerStructure: { rung: string; range: [number, number] /* households.built of a structure, drawn on siteplan */ }[];
  pathWidthM: number; fireGapM: { rung: string; m: number }[]; wholeBlock: number /* the share of eligible blocks S10 (7) joins into one informal plot */; relations: RelationRule[] }
interface TenureRow { band: string; informal: boolean /* this band's plots with no standing building but shacks, tents or lean-tos are informal (§4.7) */ }
interface QuarterIdentityRow {   // item 72 (d′) (§4.5 (4)): an emergent or dossier-declared identity
  id: string; families: { family: string /* a V11 §3.4 profile family key */; weight: number }[]; threshold: number; perHa?: boolean /* the threshold per hectare of the district */;
  bands?: [string, string] /* the district's band within */; priority: number; singular: boolean;
  power?: string /* the power kind its quarter dial follows */; sector?: string; kind?: string /* the S6 kind an epoch re-types a district to past the hysteresis */;
  definedBy?: string /* a class whose dossier record is district-defining — a QUARTER record's member class (item 108 (a); LadderStepRow.identity names this row) or a class whose row is district-defining: the identity a dossier instance of it claims */;
  targetShare?: number /* its share of that district's placed uses */; magicOnly?: boolean /* admitted only where the magic circumstance is not 'none' or the dossier lists an arcane power */; naming: string /* the naming slice its names draw from (§10.4) */ }
interface PowerLinkRow { element: 'gate'|'wall'|'tower'|'bridge'|'road'|'quay'|'market'|'tollHouse'|'customsHouse'; powers: { kind: string; weight: number }[] }   // item 72 (d″): the infrastructure's powers (the classes' are their `powers` column)
interface SectorLinkRow { element: PowerLinkRow['element']; sectors: { sector: string; weight: number }[] }   // item 72 (d4): the infrastructure's sectors, weights summing to 1 per element
interface BandRangeRow { band: string; lower: [string, string] /* [floor, ceiling] for a district in the band's lower half */; upper: [string, string] /* in its upper half */ }   // item 72 (d‴) (§4.5 (5))
interface SectorRow { id: string; tags: string[] /* the class tags whose classes serve the sector by default */ }   // item 78
interface PortRows {   // item 88: the staged rows the dossier port fills (§14) — schema-complete and empty in the base
  impairments: { type: string; physical: boolean; conditionSteps: number /* a physical type's condition steps per severity band on the building (§7.7's F4 row); a non-physical type's steps per unit of severity on the institution's own dial term (§4.5 (6)) */ }[];
  hinterland: { importPct: number /* 0–1 */; foodChain: Record<string, boolean>; farmlandScale: number } | null /* one row; null while empty (§4.9) */;
  crime: number | null /* in [0, 1]; the staged crime term of §4.6 */;
  customKinds: { kind: string; criticality?: number; economicWeight?: number; defenseRoles?: string[]; powerAuthorities?: string[] }[] /* the rows in force are this table's (empty in the base) overlaid at read time by one row per carried custom institution, from its carried custom-def fact (V08 §3.11); never written into the recipe's params; a custom kind's class is item 104 (a)'s resolution (V11 §3.13) */;
  legitimacy: number | null /* on the government record: × the governing power's amplification in §4.5 (6)'s institution dial, 1 while empty */ }
```

* **Class mix (item 71).** Default weights over the residential classes — squalid: hovel 0.8, row house 0.2; poor: hovel
  0.3, row house 0.6, cottage 0.1; modest: row house 0.6, cottage 0.2, house 0.2; comfortable: row house 0.3, house 0.6, town
  house 0.1; prosperous: house 0.5, town house 0.35, manor 0.15; rich: manor 1.0 — the manor share rises monotonically from
  the prosperous row to all manors in the rich row; `wealthShift` manor +1.0, town house +0.5, house 0, cottage −0.2, row
  house −0.3, hovel −0.6; prestige weights `tier1` 1.0, `square` 0.8, `park` 0.6, `water` 0.6, `corner` 0.4; `sun` 0.3.
  The parity presets make each band row one class, its class rows' `lifestyleBand` pool (a step at each cut), with `sun` 0.
  The `shack`, `tent` and `lean_to_shelter` rows are the cluster's structure classes (§4.7), never drawn by the class mix
  (J-A70.49).
* **Clusters and tenure (item 70).** Squalid: shacks 0.5, tents 0.4, lean-to shelters 0.1; poor: shacks 0.7, lean-to
  shelters 0.2, tents 0.1; footprints shack 6–20 m² (depth 3–4 m), tent 6–15 m² (round or oblong, depth 3 m), lean-to
  shelter 4–12 m² (depth 2 m); households per structure 1 at TOWN, up to 2 at CITY and up to 3 at METROPOLIS in the squalid
  row, while the poor row gives 1, 1 and up to 2; `pathWidthM` 1.2, `fireGapM` 1.0 (in the squalid row 0.8 at CITY and
  METROPOLIS), `wholeBlock` 0.2 in the squalid row, 0 otherwise; relations `nearWater` and the lee of walls and ruins, soft.
  The `shack`, `tent` and `lean_to_shelter` class rows (distinct from the `lean_to` frontage treatment): `drain` `none`,
  `replaceability` `immediate`, cellar 0, one floor, a programme of the one-room unit with no circulation, `households` from
  the cluster row. Tenure: squalid and poor `informal: true`.
* **Distribution and significance (item 72).** `distribution`: `singular` and `district-defining` are the rows V11 §3.5
  marks (a QUARTER record's members are district-defining by item 108 (a)); every other class `dispersed`. `significance`:
  cathedral, great temple and palace 30; castle 20; university 15; church 8; guildhall, town hall and market hall 5; chapel
  3; inn 1.5; workshop 1; shop 0.5; lodging house 0.3; house 0.2; cottage 0.1; shack, tent and lean-to shelter 0.05.
* **Quarter identities (item 72).** The identity rows are V11 §3.10's, their family keys V11 §3.4's profile families
  (worship, garrison, school, port …): the religious, craftsmen's, merchants', harbour, garrison, learned and arcane quarters
  (the arcane `magicOnly`, the row a Mages' Quarter naming claim biases toward, item 82); the defined districts (the
  red-light district `definedBy` its brothels, with no `kind` — §4.5 (3) scores its district by the brothel class row's soft
  `nearHarbour`, `nearGate` and `near` an inn rows, J-A72.51; the slums `definedBy` the dossier's slum kind, kind `shanty`,
  the squalid band's rows); and the plain residential identities, one per band, lowest priority. Each row's `naming` slice is
  our naming pack's (§10.4).
* **Powers and sectors (items 72, 78 and 79).** The classes' `powers` column — guildhalls and workshops `guild`; merchant
  houses and warehouses `company`; churches, chapels and temples `religion`; the castle, manors and keeps `lordship`; the
  town hall and the courthouse `council`; barracks and guard posts `military`; mage towers and alchemists `arcane` (only where
  the magic circumstance or a dossier arcane power admits it); the clandestine classes `criminal` — each an association the
  dossier's `Institution.powers` overrides (§2.7). `powerLinks`: gates 0.5 `military`, 0.5 `council`; walls and towers
  `military`; bridges, roads and quays `council`; the market square `council`; the toll and customs houses `council`. The
  sector set (`sectors`, item 78): trade, taxes and tolls, crafts, agriculture, extraction, fishing, finance, religion,
  military, magic, crime. The classes' `sectors` column and `sectorLinks`: markets, warehouses and quays → trade; gates,
  bridges and roads → taxes and tolls 0.7, trade 0.3; walls, toll houses and the customs house → taxes and tolls 1.0;
  workshops and guildhalls → crafts; farms, mills and granaries → agriculture; quarries and mines → extraction; fisheries →
  fishing; moneylenders → finance; churches → religion; barracks → military; mage towers → magic; the clandestine classes →
  crime.
* **Band ranges (item 72).** squalid: squalid–poor in both halves; poor: squalid–modest; modest: poor–comfortable;
  comfortable: modest–prosperous; prosperous: comfortable–rich (the middle band to rich, item 71's mix); rich: prosperous–
  rich in its lower half, rich alone in its upper half.
* **Notice posts (item 82).** A `notice` pin stands where §4.7's furniture step puts one: at the principal market and at each
  gate plaza by default, at the main entrance of every class whose `tags` hold `notice` (a town hall, a market hall, a
  guildhall), and wherever a named-feature claim of the dossier names one (§7.7).
* **The port's staged rows (items 88, 104; W-DOS-03).** `portRows` is declared in full and empty; the values in force of
  `crime`, `hinterland.importPct`, `hinterland.foodChain` and `legitimacy` are the current slice's `port` values when not null
  (`CircumstanceSlice.port`, §7.7; V08 §2.5), else this table's. Each acts only through its readers: `impairments` §4.5 (6)
  and §7.7's F4 row; `hinterland` §4.9's farm table (`importPct`, `farmlandScale`, `foodChain`); `crime` §4.6's hidden share,
  II.7.3's access and II.7.5's undercity demand; `customKinds` item 104 (a)'s resolution (its definition fields), §4.5 (1)'s
  significance and §4.7 S10b's chain links (`economicWeight`); `legitimacy` §4.5 (6). While empty every factor is 1 and every
  list empty.
* **Rows at their limits (EP-18).** V11's compiler checks every row set before a model reads it (V11 §3.1, T-V11 bars): a
  range whose ends cross, a weight set that sums to 0, a band set missing its middle band, or two rows that contradict (a
  `hard` row no plot of the class's own template can meet) is clamped to the nearest lawful value and named in one line, or
  refused with its reason where no lawful value exists (item 101 R2 for an edit); a band without a row interpolates (§4.5).
  An edited row's lifecycle — saved in the document's override layer, undone, re-read by a regeneration, migrated by its
  table version and orphaned when its base row changes — is §7.6's and §7.4's.

### 10.3 People, households, relations, sub-locations, schedules

**Households and people.** A person is a pure function `derivePerson(seed, key, tableVersion)` of its key — `(household
address, member ordinal, birth epoch)`, a successor's with its `bornWeek` (§2.7; a founding member's key unchanged, a
successor's `bornEpoch` held as 0), so identities do not depend on the cadence; the address is what survives a re-derivation
of the household's plot (§6.3), whereas the household's lineage changes on New random — and of the person tables current
when its household was created (`Household.tableVersion`); it yields name, age, status, role, ancestry, height and
appearance. A host `ContentProvider`'s `people` replaces it where one is registered (§4.2 S2). **Pinning is an explicit
edit, never a view (LC-16, FTG-10; J-P22):** opening a person in the gazetteer writes nothing to the document, the hash or
the undo stack; which people a viewer has seen is per-user view state (§2.9). A table edit applies to households created
afterwards; existing people change only through the diffed **re-derive people** action — §7.5's diffed pattern, a
`regenerate` event of scope `people` over the chosen households (§7.1), its lifecycle §7.4's regenerate row. An epoch ages
everyone by its years through the key's birth epoch; **deaths and successions are derived, never stored**: `derivePerson`
makes two draws after all its others — `lifespanYears` in the ancestry row's `lifespan` and `entryAge` (a birth, or an heir
or spouse joining) — and a member slot passes to ordinal `k + n × j` at its person's **death week** (`birthWeek +
round(52 × lifespanYears)`), the successor keyed by that week (`Person.key.bornWeek`) and shown from the first drawn week at
or after it (V06 §3.14); a pinned person is never succeeded. `AncestryRow` carries `lifespan` (default [45, 80]) and
`entryAge` (`birth` 0.6, `joining` [16, 30]), our own. When regeneration supersedes a household, its pinned or edited people
are fixed inputs re-homed by rule to the household that inherits its address (§6.3), or reported as orphans (their
edit-lifecycle row is §7.4's). **Storage:** aggregates plus explicitly pinned people — kilobytes for a 50 000-person
metropolis (FTG PERF-1 answered; R14) — until the module materialises the relation store, after which relations and
postings are persisted (≈ 12 bytes per relation in the binary block; ≈ 1.8 MB raw for 50 000 people at ≈ 3 relations each,
reported per 10 k population as the O7 module metric). People are derived the same way at every rung, the village's
included (V07); the rung changes only the roster that makes the households.

**People model (COV-FTG-C01, COV-FTG-C08).** `AncestryRow { id, lifeStages: {name, fromAge}[], maxAge, heightCmBand,
nameGrammar, appearanceTemplates, lifespan, entryAge }` and a partnering matrix (pair weights and the child's ancestry rule)
are data; the realism base ships one human ancestry, and further ancestries arrive only through setting packs (§10.4).
`Person.status` ∈ worker, unemployed, retired, student, dependent; a dependent has a `carer` whose schedule it follows; when a
carer is removed the household (then the family unit) supplies the next carer by rule and the change is reported — a
dangling carer is a reference-integrity violation (§5.3). **Appearance (COV-FTG-C02):** appearance text comes from the §10.4
engine — weighted option tables per ancestry, line templates with substitution, conditional lines (by gender, age or a value
predicate), fallback lines and article agreement — our own templates.

**The module (`@plat/sim`).** *Relations (FTG-9, COV-FTG-C04):* the first run materialises the relation store by one global
pass on its own stream (`content/relations`) in person-key order — family units, partnerships, parent / child, siblings,
carer / caree, friends, rivals, business and religious ties, affairs — and persists it with lifecycle and reference integrity
(§10.1's locality contract). *Work (COV-FTG-B11):* professions ↔ workplaces by greedy matching with id tie-breaks, persisted
as `Posting` records; after an edit only the postings of changed workplaces and the unemployed pool are re-matched, in
person-key order; unfilled postings are tracked and reported. *Sub-locations and occupancy (FTG-11):*
`occupancy(dayType, hour)` resolves the whole population in person-key order in two passes — primary behaviours (home, work,
study, care, following carers) from profession templates, then occupancy criteria (leisure, guest workers, temporary
residence) filling `SubLocation` capacities with their relax options — cached per (day type, hour) and invalidated by edits
that touch the people or buildings involved; `whereIs(person, day, hour)` reads the cache; resource *provides / uses* edges
on roster rows are data the schedules may read; its budget is §12.7's. The module registers the live layer `live.people`
through §14's `LiveLayerProvider` registry (§8.2): favourite persons' positions from its occupancy at the view-state hour.
*The day schedule:* hours per day, days per week, rest days and weekday names; the hour is the view key `time`, set by
`view.set { time }` and advanced by the module's `sim.advance { hours }` over the bridge (§11.3), and occupancy is recomputed
for the new hour; neither changes the model or logs an event, and it is never the map's week (§4.11's clock) nor compared
with it (item 76). *Factions (COV-FTG-B12):* seats on plots, an influence field over districts — its weights the base's
power standings (`CircumstanceSlice.powers`, §7.7 layer 2), read by the module's own queries and the naming grammar only
(the prosperity field's power terms are §4.5 (6)'s dials, which need no module) — named roles with member criteria
(predicates over person fields) and counts, goals with methods and progress, a secret flag; role headcounts are reconciled
with the seat building's working capacity (excess roles are filled by members housed elsewhere; the reconciliation is
reported). Government offices and religions are §10.2's. *Events (COV-FTG-C05):* `EventTemplate { id, preconditions
(predicates over relations, factions, buildings), weight, effects: EditEvent[] }` rank candidate events per building;
starting one applies its effects as logged, undoable edit events. Data dictionaries (ages, genders, ancestries) are
append-only and id-referenced, so renaming never re-colours (FTG DAT-3 avoided). The relation store answers the
family-tree query (§11.2).

**Economy, personality and stat-block schema stubs (D-32; COV-FTG-B10, COV-FTG-C03, COV-FTG-C11).** In the base registry
from M1, empty until `@plat/sim` materialises them (their other end is the module's, M4b); every table is our own:

```ts
interface ItemRow { id: string; category: string; unit: string; basePrice: number /* in the setting pack's coin unit */; providedBy?: string[] /* roster class ids */ }
interface ServiceRow { id: string; providedBy: string[]; basePrice: number }
interface Stock { building: Id; item: string; qty: number }
interface PriceTable { multiplier: number; overrides: Record<string, number> }   // global price edits are `editTable` events (§7.6)
interface PersonTraits { traits: string[]; motivation: string; mannerism: string; hobbies: string[]; education: string }   // derived from the person key
interface StatBlockPack { id: string; attributes: string[]; base: Record<string, [number, number]>; professionModifiers: Record<string, Record<string, number>> }   // a named game-system pack, off by default (D-3)
```

**Uses that move (item 17).** When a use relocates (§4.11) its live-in household (`Building.dwelling`) moves with it when the
destination's designation template has a residential slot (a structure with `houses`, §10.2; §4.7 S11) and otherwise stays
in the vacated building as an ordinary household, reported; its people keep their keys, the household address surviving
(§6.3). The module re-matches only the postings of the closed and the opened workplaces and carries business ties over by
the use's address; a household re-homed by item 31's re-letting takes the same path.

**Lit windows, cluster households and dossier people (items 68, 70 and 88).**
* **Lit windows (item 68).** At the view's hour the module's occupancy selects the lit windows — a building is lit while its
  sub-locations hold anyone awake at that hour. Without the module a dwelling is lit in the evening hours of the lighting row
  (`lights.windowHours`, 17–22 h by default; our own row, `extension`) while its households live there at the drawn week
  (§4.11's Works), and a workplace during its `openingHours` rows (§10.2). Window lights are derived per view — §8.4's derived
  sources and §8.2's `live.windows` layer, never records; the `FTG` preset lights each lit building at its main entrance only
  (§4.7's *Light sources*).
* **Cluster households (item 70).** A cluster structure houses the cluster row's households per structure (§4.7, §10.2);
  their people derive as any household's.
* **Dossier people (item 88).** A dossier-backed `Person` (§2.7; staged with the port) is pinned, housed by rule in the
  district of its institution or its power's seat, and never derived away.

### 10.4 Names, descriptions and setting packs

**The naming engine.** An original English-fantasy grammar (D-6) in a Tracery-class engine of our own (rules with
modifiers, feature guards, weighted decks, conditional lines, article agreement) plus syllable and Markov generators over
corpora of our own authoring. **Folk contraction** (FTG's erosion idea; "≤ 3 syllables" a parameter) is an evolution-engine
step: at an epoch V06 may contract a name through the slice `naming.folk` (V11 §3.20.1) as a naming-record update of the
epoch event, drawn on that slice's stream — no event kind of its own, its lifecycle and undo the epoch's (§7.4). Names are
drawn from the naming concerns only (§6.1) and only in §6.3's cases, a successor keeping its predecessor's name and naming
record; names never move geometry, and uniqueness follows §9.6. **Local names (V01; the way-naming context from M1):** S13a
conditions every way's name on its `WayNamingContext` (V01 §2.3, §3.7.2; the type in `@plat/model`), the M1 grammar authored
against its features; the features that read stage 2's squares and places (`to`, `placeOnIt`) and a contour street's
`terraceIndex` take values from M5, a declared shift of those ways' names; S13a names each `HoodPlace` (V01 §3.7.1) after
the ways from the grammar's place rules and gives the district names the neighbourhood's features — `fabric`,
`hasManorBlock`, `hasGreenBlock`, `ringCentre`, `small`, `terraced` (V01 §3.7.4) — from M5; the rows are authored with the
grammar (V11). A district's naming reads its identity (below); the principal temple's name reads its religion's dedication
(`Religion.deities`, §10.2). The same engine writes **descriptions** — a district's one-line summary of its mix and features,
e.g. a waterfront quarter that also holds workshops and a green (COV-FTG-E10), and each building's description (§2.6) — and
people's appearance lines (§10.3); descriptions are regenerated when their inputs change unless edited. A town with no
nameable feature of a kind names none of it, and a grammar rule with no candidate falls to its fallback line; a pack whose
corpus is empty for a slice falls back to the shipped pack's (reported).

**Per-culture generators and user lists (COV-FTG-L06).** Every `AncestryRow` and culture row names its own grammar and
corpora, so personal and place names can differ by culture. A user-uploaded list (plain text, one entry per line) becomes a
`user` corpus: a syllable and a Markov model trained from it at load, stored in the document as pack data with author
`user`, selectable wherever a corpus is. Selecting it is an `adjust` of the recipe's pack list that enters it as
`user:<content hash>` with `shipped: false` (§2.9, §7.6), so a town whose history selects it never emits a link (§6.4). The
pack holds the corpus and the keyed row operation that sets the chosen corpus field of the chosen culture or ancestry row to
it in place of the corpus it replaces, so the binding travels in the pack's content and hash; selecting it re-draws exactly
the unedited names drawn from that field, listed for confirmation (§6.3 case (4)), and never the row's other names, each
corpus field being its own naming slice (§7.6). Deselecting it is a second `adjust`; how long its content stays in the
document is §2.9's pack-set rule. An empty upload is refused at the dry run with its reason.

**Setting packs — format and loading hook (DEF-10).**

```ts
interface SettingPack { id: string; version: string; author: string; date: string; licence: string;
  provides: { grammars?: GrammarDef[]; corpora?: { id: string; kind: 'personal'|'place'|'word'; entries: string[] }[]; ancestries?: AncestryRow[];
    religions?: ReligionRow[]; appearance?: TemplateDef[] /* GrammarDef and TemplateDef: V11 §2.8 */;
    rosterPatch?: { table: RosterTableId /* a RosterTables field (§10.2); never portRows, which only the dossier port fills */; baseVersion: string; ops: RowOp[] /* §7.1 */ }[];
    tablePatch?: { table: TableId /* the naming, culture and ancestry tables */; baseVersion: string; ops: RowOp[] /* keyed row operations, orphaned exactly as a rosterPatch is */ }[];
    styleHints?: Partial<StyleSheet> } }
type NamePack = SettingPack['provides'] /* the pack set's naming content in force: grammars, corpora, ancestries (RosterTables.names) */;
```

A pack is data, never code: schema-validated (`zod`), every entry carrying its author and date (the clean-room rule of §17),
loaded as one layer of the override chain between the shipped defaults and the preset (§7.6), and recorded in the recipe, or
in the `adjust` that adds it, by id, version and content hash. The content of every pack of the document's pack set that is
not shipped with the output version is copied into the document's `packs` block and retained there by §2.9's pack-set rule,
so a replay never depends on what is installed; a link is emitted only when every pack of the pack set is shipped (§6.4). A
pack's **roster patch** and **table patch** are keyed row operations, never positional patches — the `RowOp`s of §7.1, each
`set` carrying the hash of the base row it was written against (`baseRowHash`) and the table version it targets
(`baseVersion`), orphaned and reported exactly as a user override is (§7.6; LC-22) — so a newer table version never silently
misapplies a pack, and a pack edits a table by the same row operations as a user. A user corpus pack is `{ corpora: [the
uploaded list], tablePatch: [one set on the chosen culture or ancestry row's corpus field] }`, so the binding the user chose
is part of the pack's content hash. The base ships exactly one pack, our original English-fantasy set; further packs are the
owner's adopted default "setting packs later" (D-6), and adding one is a file, not a code change.

**Names from character, claimed names, stage words, clusters and the underground (items 65, 67, 70, 72 and 82).**
* **Names follow character (item 72 (c)).** S13a names a district from its identity (§4.5 (4)): the identity row's `naming`
  slice, whose feature guards read the district's dominant components — its trade (Tanners' Row), its anchor institution
  (Temple Hill), its power (the Guildquarter), its gate or trade bearing (the Northgate — the gate of the largest trade
  weight among its routes, §4.3) or its terrain. A name once given is kept: a district whose identity changes past its
  hysteresis at an epoch re-draws its name on its `naming` stream by §6.3's epoch case (J-A72.44), the old name kept in
  `District.nameHistory` (the reader shows it as a former name; the change is reported); a protected name — a `setAttr`, a
  lock, an assignment, a claimed name — is never re-drawn. A quarter node's name reads its members' dominant identity (§9.1).
* **Claimed quarter names (item 82).** A quarter the dossier names becomes the name of whichever district §7.7's claim rule
  matches, protected as an assigned name (§2.8's dormant naming record) and re-matched only past §4.5 (9)'s identity
  hysteresis; an unmatched claim waits, reported, never forced (§7.7).
* **Stage words (item 67; the one list, which §4.10 and §4.11 cite).** A building's description reads its Works stage at the
  drawn week: "being built", "being extended", "being demolished", "under repair", or "ruined since" the calendar year of the
  ladder event that ruined it (§4.11).
* **An informal cluster (item 70)** takes one place name from our naming pack's cluster slice, drawn once for the cluster
  plot on its `naming` stream, and one label (§9.1); its structures are unnamed.
* **An undercity neighbourhood (item 65; J-A65.40)** is named as the underside of its parent's quarter — our naming pack's
  `undercity` slice, whose grammar reads the parent quarter's name (the Under-⟨quarter⟩, ⟨quarter⟩ Below …) — drawn once on
  its own `naming` stream, a quarter node under its parent's (§9.1; II.7.5); like every name it is re-drawn only in §6.3's
  cases, so a later rename of the parent quarter leaves it standing, as a street named after a gate keeps its name when the
  gate is renamed.
* **The underground's other names (II.7).** A trunk sewer run and a culvert take a name from the naming pack's `sewer` slice
  (a culvert reads as its brook's); a void system from its kind's slice (`catacomb`, `cavern`, `quarry`, `vaults`, `buried`,
  `ruin`), a catacomb reading its cemetery's name (a churchyard's its church's; a quarry ossuary its quarter's) and a buried
  town its quarter's; an undercity's plaza from the `undercity.plaza` slice; a ruin the ancient civilisation the dossier's
  history names, else the `ruin` slice (item 109 (g)) — each drawn once on its own `naming` stream in the tail's S13a.
