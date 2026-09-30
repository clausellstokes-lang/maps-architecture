# Amendments g — owner rules received after the bundled pass (2026-09-28)

Numbered from **102** (item 101 is the authoring toolkit, file e; the volumes' base change requests are file f, from 200 — moved from 110 on 2026-09-28 ~23:30 so owner rules could continue past 109).
Applied by the coherence, cohesion and wiring pass (`workflows/18-coherence.js`), which applies g items exactly as it applies
f items; the design volumes that touch an item (named per item) read it from `docs/OWNER-INSTRUCTIONS-2026-09-25.md`, where the
owner's words are also filed. Legend as in file c: the owner's words are the authority; the consequences are the program's
vetoable interpretation.

---

102. **OWNER RULE — Sunlight as a soft driver of prosperity: the shaded tend poorer, the rich seek the sun (owner,
     2026-09-28 ~17:25).** Owner, after the island-shadow question (J98): "And for added flavor. I would imagine that there is
     another axis of relationship between poor and rich areas, depending on if they are covered by the shadow more during the
     day. Not a hard and fast rule. But I'm sure more prosperous people would love more sun."

     **(a) THE TERM.** The prosperity field (§4.5, `P(x) = Σ_i w_i · kernel_i(x) + characterOffset + ε`) gains one declared
     driver, **daylight share** `D(x)` ∈ [0, 1]: the fraction of a representative day's daylight during which the ground at x
     is in shade, read from the settlement's own geometry under the path sun (§8.4's `path` mode at the settlement's latitude
     and the default season, equinox; a fixed set of sun positions — for example nine from sunrise to sunset — so the value is
     deterministic, cheap and independent of any view, cursor or style). The driver's kernel is `−w_sun · shade(x)`, with a
     SMALL default weight — a tendency, never a rule (the owner's "not a hard and fast rule"): at full all-day shade it lowers P
     by about a tenth of a band's width, it never alone moves a plot across two bands, the field's controlled chance (ε) still
     applies, and the dossier's facts are untouched (item 20 (h)).
     **(b) WHAT CASTS THE SHADE.** Only geometry that exists before the term is read, so nothing is circular: terrain (a
     valley's shaded side, a cliff's foot, the far side of a steep hill — historically the less wanted ground), walls,
     gatehouses, the castle and great towers (whose lee already reads as poorer in the drivers), and FLOATING ISLANDS — the strip
     their shadow sweeps across the day is the clearest case (an island that hangs over a quarter all morning leaves that
     quarter in its shade: a natural "under-hang" of cheaper lodging and workshops). Ordinary buildings do NOT feed the term in
     generation (their heights are chosen from the field; a loop), but at an EPOCH (§4.11) the previous epoch's buildings do, so
     a quarter walled in by tall new houses drifts down over time.
     **(c) ORDER.** Terrain and wall shade enter the field's first pass (§4.5, S6); island shade enters its second pass, after
     S7b has allocated the islands — one pass each, never iterated (determinism, §6). The islands' own supply law (II.6) reads
     the field before the island shade term, as it does today.
     **(d) THE RICH SEEK THE SUN.** Beside the field, item 71's class placement gains a small preference for the sunlit side:
     among otherwise equal prime frontages, the larger classes take the sunnier ones (the side of a street that faces the sun,
     a slope that faces it); the smaller classes the shadier backs.
     **(e) OVER TIME.** An island that sinks or moves, a new wall, or tall new building shifts the shade, and the evolution
     engine (V06) moves the field and the uses by its normal lag — a sunnier quarter slowly improves, a newly shaded one slowly
     declines.
     **(f) EDITABLE AND VISIBLE.** `w_sun` is a table value (§7.6); the prosperity brush overrides the result like any driver;
     the daylight share is an optional thematic view (a shade map), and the clerk can answer "why is this quarter poor" with it.
     **(g) BARS.** With `w_sun` = 0 the field and the town are byte-identical to today's (no-op pin); on a fixture with an island
     over a uniform district, the island's shade strip averages lower prosperity than the sunlit remainder by the declared
     weight within tolerance, and no plot changes by more than one band from this term alone; the term is computed within a
     budget stated per rung (§12).
     **HOMES:** §4.5 (the driver and its order), §4.7 S10b (the sunlit-side preference in the class mix), II.6 and the sky
     volume V05 (the island's shade strip), §4.11 and the evolution volume V06 (drift over epochs), §8.4 (the path sun reused as
     a model-side sampler, never the view's light), §7.6 (the weight), §13 (the bars). *Scope:* BASE for (a)–(d), (f), (g);
     STAGED with evolution for (e).

103. **OWNER RULE — A comprehensive siting rulebook: how institutions pull toward and push away from each other (owner,
     2026-09-28 ~17:30).** Owner: "You need to create a comprehensive set of rules of spatial relations between many buildings
     and institutions that will go into the generator. Think about it, a thieve's guild does not want to be close to the
     garrison generally. The bakery might want to be closer to a mill possibly. Supply chains institution want to be closer to
     each other to reduce the cost of travel and to improve efficiency. But of course, these are offset or complicated by other
     things such as the tannery needs to be away from residential areas and down river if there is a river. Shops want to be on
     streets that feed into the market(s) and were close to places that produce their supply. And then we fill in everything in
     between. This is again, not necessarily a hard rule because random things get in the way, but a correlating general rule."
     The machinery exists (item 16: `RelationRule` rows with near / far / avoid / clustered / downstream / downwind /
     nearMarket / nearGate / frontage kinds, `SupplyEdge`s, the placement solver of §4.7 S10a–S10b); what does not exist yet is
     the RULEBOOK — the rows, for every class and every SettlementForge institution kind (the catalogue's 270 kinds, 280 seen
     across the 155 surveyed dossiers). Program's interpretation (vetoable):
     **(a) FACTORED, NOT PAIRWISE.** Nobody can author or maintain 280 × 280 pairs. Each class carries a small SITING PROFILE,
     and a dozen RELATION FAMILIES turn profiles into the solver's pulls automatically: EMITS (smell, smoke, noise, fire risk,
     water pollution, heavy traffic, crowds, disorder, sacredness) and IS SENSITIVE TO (the same list); NEEDS (running water,
     a river bank, a road, a gate, the harbour, the market, space, security, secrecy); CLIENTELE (daily-local, town-wide,
     travellers, elite, clandestine), which sets access (daily needs dispersed by catchment near homes; town-wide trades on
     streets feeding a market; travellers' services at gates, bridges and quays); SUPPLY (the class's inputs and outputs —
     the existing `SupplyEdge`s — attracting by transport cost × volume, river and sea legs cheaper than carts); ALIGNMENT
     (law and enforcement versus crime; sacred versus profane; elite versus common), where opposites repel and like attracts;
     COMPETITION (a craft that clusters on its own street, historically common, versus a service that spaces itself out for
     its catchment — the `distribution` column of item 72 (d-prime)). SettlementForge's own tag vocabulary (`research/sf/
     dossier-model.md`: industry, leather, food, criminal, law_enforcement, religious, market, port …) gives every catalogue
     kind a default profile by tag; a kind's own row refines it.
     **(b) A SPARSE TABLE OF SIGNATURE PAIRS** for relations the families do not capture, each with its reason: bakery near
     mill and granary; tannery near the shambles (hides) yet downstream and downwind of homes and outside the walls where the
     town allows; dyers upstream of tanners; smiths and farriers at gates and stables; inns and stables at gates; chandlers
     and ropewalks at the harbour; apothecary near physician and hospital; scriptorium near church or university; thieves'
     guild away from garrison, watch and courts yet near crowds and wealth (markets, inns, the rich quarter's edge) — the
     tension is the point.
     **(c) SOFT, WEIGHTED, CORRELATING.** Every family and pair row is soft with a weight, except true physical needs (a
     watermill on water, a quay on the shore); the solver sums the pulls with the prosperity field (and item 102's sunlight),
     the neighbourhood character (item 72) and controlled chance, then fills everything in between by the ordinary class
     rules — "not a hard rule because random things get in the way". Dossier facts and assignments outrank every pull
     (items 20, 20 (h)); a pinned or declared place is held (item 101 R13).
     **(d) EMULATION FIRST, REALISM AS TIEBREAKER.** Defaults follow what FTG's resource graph and professions and MFCG's ward
     logic already imply; where they are silent, historically attested siting (noxious trades downstream and extramural,
     markets at crossroads and bridgeheads, guild streets, parish spacing) — each row carries its provenance (§7.6) so the
     corpus stage can calibrate it later.
     **(e) PROVABLE AS CORRELATIONS.** A siting statistics suite over many seeds (§13.2's bench): each family's effect shows
     as a measured shift against a random-placement baseline (tanneries downstream in most river towns; the thieves' guild's
     distance to the garrison above the baseline; shops' distance to the market below it), never as a guarantee; the clerk
     answers "why is this here" from the rows that pulled it (item 101).
     **HOMES:** §10.2 (the siting profile columns on `BuildingClassRow`, the relation families as derived `RelationRule`s,
     the signature-pair table), §4.7 S10b (the solver's score reads them; unchanged in shape), §7.6 (the tables and their
     provenance), §13.2 (the statistics suite); the CONTENT — every class's profile, the catalogue kinds' tag defaults and
     overrides, the supply edges and the signature pairs, written out in full — is the content volume's (docs/volumes/
     V11-content.md). *Scope:* BASE.
     **(f) COVERAGE — the other half of competition (owner refinement, 2026-09-28 ~17:40).** Owner: "Regarding competition,
     don't forget our distribution … maybe there needs to be one apothecary per district simply because it makes sense and it
     is marketable. Again, just to be included into the potential weighted pools." Program's interpretation (vetoable): the
     siting profile gains a COVERAGE row per class — a catchment unit (a district, a neighbourhood, a walking radius, or N
     households) and a soft target per unit (for example apothecary one per district; bakery one per walking radius of about
     400 m; parish church one per parish's worth of households; tavern by households and footfall). In placement it is a
     weighted pull toward units the class does not yet serve, and away from over-served ones — added to the pools with the
     other families, never a quota. Counts stay where they come from: with a dossier, the dossier's count is the truth and
     coverage only decides WHERE its members go (spread across the unserved districts first, then by demand); without a
     dossier, the roster's count draw for a class with a coverage row takes the coverage target as a weighted option beside
     its per-capita rate, never a hard minimum. Over time (item 17), a closed shop's catchment gap raises the pull that
     reopens one where people now are. Bar (§13.2): across seeds, the share of districts served by a class with a coverage
     row rises above its random-placement baseline; with the coverage weight at 0, placement is byte-identical to (a)–(e).

104. **OWNER RULE — Generic siting for custom content: custom institutions and their supply chains land sensibly with no
     hand-written rules (owner, 2026-09-28 ~17:50).** Owner: "Regarding the rules for special placement, create a generic set of
     ones for custom content creations institution supply chains. Read that code to get a grasp on how it should be
     structured." Read (read-only, SettlementForge branch fp/integration-2026-09-23 @ 5d699cc68, exported to the session
     scratchpad): `schema/custom-content.manifest.json`, `domain/customContentSchema.js`, `generators/steps/
     assembleInstitutions.js` (the custom block), `domain/inferSupplyChains.js` and `domain/content/
     customSupplyChainActivation.js` (headers and types); SettlementForge's own map and scene code was NOT read (J67).
     **What SettlementForge gives us (CONFIRMED).** A custom institution enters the DOSSIER as an instance with `source:
     'custom'`, `isCustom`, a stable `localUid` (and `customDefinitionId`, revision, content hash), its `name`, a free-text
     `category` (≤ 100 characters: usually one of the catalogue's 11 categories or the 8 content groups — government,
     infrastructure, economic, military, religious, arcane, criminal, social — or "Other"), free `tags`, a `description`,
     `required` (the author's `essential` flag), and bounded scene tokens: `sceneProfileId` (17 archetypes: agrarian-farmstead,
     agrarian-mill, civic-archive, civic-hall, domestic-house, exotic-tower, industrial-forge, industrial-workshop,
     martial-barracks, martial-keep, martial-watchtower, mercantile-guildhall, mercantile-inn, mercantile-market,
     ruined-landmark, sacred-sanctuary, sacred-shrine), `landmarkLevel` (standard or landmark), `materialFamily`. The richer
     definition fields — `authority`, `defenseRole`, `criminal`, `magical`, `foodImpact`, `economicWeight`, `satisfies`, and the
     dependency references `produces`, `requires`, `subsumes` — live in the author's content library, not in the dossier
     instance. SUPPLY CHAINS are never authored directly: SettlementForge DISCOVERS them from those references (outputs matched
     to inputs across institutions, services, resources and trade goods; unmatched inputs become IMPORT candidates, unmatched
     outputs EXPORT candidates), the author confirms them, and a confirmed chain is ACTIVE in a settlement only when its nodes
     are present there (reviewed chain nodes: institution, resource, service, good). Resources carry a kind (water, land,
     special, subterranean).
     **(a) PROFILE RESOLUTION — a custom kind gets a siting profile (item 103) from what it carries, strongest first, each
     contribution recorded with its source:** (1) the author's map-side declaration for that kind in our editor (item 101: a
     place, a quarter, a pin, or a siting-profile override stored in the MAP document keyed by `localUid` — never written back to
     the dossier, item 20); (2) the scene archetype `sceneProfileId` → one of 17 profile rows (agrarian-mill: running water,
     extramural or edge, road; industrial-forge: fire risk, noise, gate or road, away from thatch-dense housing; mercantile-market:
     market square frontage; mercantile-inn: gates, main roads, bridges, quays; martial-barracks / keep / watchtower: walls,
     gates, high ground; sacred-sanctuary / shrine: square or parish centre, quiet; civic-hall / archive: centre, main street;
     exotic-tower: its own ground, apart; ruined-landmark: as found; domestic-house: residential); (3) the `category` → the
     generic profile of its catalogue category or content group, with a small synonym table for common free-text categories;
     (4) the `tags` → profile deltas through SettlementForge's canonical tag vocabulary (industry, leather, metalwork, textile,
     food, market, port, water, sanitation, religious, civic, legal, law_enforcement, defense, criminal, smuggling, illicit,
     underground, arcane, luxury, healing, lodging, …), each tag a documented delta; (5) the definition fields WHEN the port
     receives them — declared OPTIONAL inputs of the dossier port (item 20 (h) (iv)): `authority` → the alignment family,
     `defenseRole` → garrison / watch / fortification siting, `criminal` → clandestine and alignment rows (item 63's
     concealment chance), `magical` → arcane rows, `foodImpact: produces` → agrarian edge, `economicWeight` → significance
     (item 72); (6) keywords of the name and description — the WEAKEST signal, from our own keyword table, flagged
     low-confidence in the report (SettlementForge itself warns that mechanics should read tags, not names); (7) the fallback:
     the generic 'Other' profile (main-street frontage by `landmarkLevel`, no nuisance, dispersed). `landmarkLevel: landmark`
     raises significance and asks for a prominent site (a square frontage, high ground, a vista). The resolved profile, its
     sources and their weights are stored with the use, shown by the clerk ("why is this here") and editable by the author.
     **(b) CUSTOM SUPPLY CHAINS → PULLS.** Each ACTIVE reviewed chain of the dossier (SettlementForge's own activation rule:
     all its nodes present) becomes `SupplyEdge`s between the placed institutions that are its producer, processor and consumer
     nodes — attraction by transport cost × volume (item 103 (a)'s supply family; volume from `economicWeight` when visible,
     else 'moderate'); a chain node that is a RESOURCE is sited on the terrain feature its kind implies (water → river or coast,
     land → fields or pasture in the hinterland, subterranean → a mine or quarry at the hinterland edge, special → its own
     deposit site by the resource rows); an IMPORT endpoint pulls its consumer toward the gate or quay that faces the partner's
     bearing when the realm block gives one (items 77, 85), else the main gate or the harbour; an EXPORT endpoint likewise; an
     inactive chain pulls nothing. A chain never forces a hard rule, and never moves a dossier-declared or author-declared place.
     **(c) DISTRIBUTION AND COVERAGE DEFAULTS** by the resolved profile (item 103 (f)): a service-like kind (lodging, food,
     healing, legal) disperses by catchment; a guild-like kind may cluster; a landmark is singular.
     **(d) NEVER FAILS.** A custom kind always resolves to a profile and always finds a site; an unplaceable preference is
     reported with the closest options (item 20 (g)); nothing custom can stall generation.
     **(e) STABLE AND REVISABLE.** Resolution is a pure function of the dossier's custom record, our tables and the map's
     declarations, keyed by `localUid` (a rename changes nothing); a new revision (a changed content hash) re-resolves the
     profile and re-sites the use by item 22's least disruption, with the report saying why.
     **(f) EVIDENCE.** The historical checks the owner opened on 2026-09-28 (`partitioned/corpus-preview/history.md`) witness
     markets as foci and warehouses on waterfronts, contradict a single central market and a central cathedral as universals, and
     record NOTHING on noxious trades downstream, bakeries by mills, inns at gates or trade streets (its rows 6 and 7d: ABSENT) —
     so every such default in items 103 and 104 is a soft row with provenance "general historical knowledge, not
     corpus-witnessed", calibrated at the reconciliation stage; the corpus law "possibility, not prevalence" binds.
     **(g) BARS.** Fixtures of custom institutions carrying only a category; a category and tags; a scene archetype; the optional
     definition fields; and an active reviewed chain — each resolves, sites and reports as specified; a chain's nodes sit closer
     than a random baseline across seeds; a revision re-sites with least disruption; zero placement failures.
     **HOMES:** §7.7 (the port reads the custom record and the optional definition fields), §10.2 (the resolution order, the
     17 archetype rows, the category and tag delta tables, the keyword table, the fallback), §4.7 S10b (unchanged solver);
     the full rows are the content volume's (V11), the host side (reading the library's definition fields when SettlementForge
     can supply them) the SettlementForge volume's (V08). *Scope:* BASE for (a)–(e), (g); the optional inputs of (a) (5) at the
     SettlementForge stage.
     **(h) CUSTOM CONTENT IN SPATIAL RELATION WITH EACH OTHER — the chain as a spatial unit (owner clarification,
     2026-09-28 ~18:00).** Owner: "Regarding custom content, I meant custom content creations in spatial relations with each
     other regarding supply chain and their place within the settlement." Program's interpretation (vetoable): an ACTIVE
     custom chain is placed as one connected thing, not as unrelated institutions that happen to pull on each other:
     (1) FLOW ORDER — goods move inward: a chain's RESOURCE node sits at its terrain feature (a spring, a well, a quarry, a mine,
     a grove, fields or pasture, a special deposit — created as a map feature when the settlement has none, sized by the chain's
     volume); its FIRST PROCESSOR sits by the resource or on the road between the resource and the town (extramural or at the
     edge when its profile emits a nuisance); each LATER PROCESSOR sits a step further in; the FINAL SELLER sits on a street
     feeding a market or inside its consumers' catchment; the chain's CONSUMERS (institutions, catalogue or custom, that require
     its output) pull its final node, and its final node pulls them.
     (2) LINK STRENGTH — each link's pull scales with the volume moved (`economicWeight` when visible, else moderate) and the
     nature of the good: perishable goods keep their links short; bulky goods favour water and main roads; small valuable goods
     tolerate distance but seek security (walls, the watch, a guarded quarter).
     (3) SHAPE — REVISED 2026-09-28 ~18:20 by item 107 (e) (the earlier wording said a compatible chain "CLUSTERS into a working
     quarter", which conflicted with the owner's dispersal ruling J-A72.46): a chain whose in-town nodes are compatible (no node
     emits what another cannot bear) sits CLOSE AT STREET SCALE — its links satisfied within their comfortable distances
     (item 107 (b)) — and is NAMED a working quarter ("the Glassworks") only when item 72's quarter-identity threshold is
     crossed, or the dossier or the author declares one; a chain is never assigned a neighbourhood; an incompatible chain
     STRETCHES along its road, the noxious steps out at the edge and the clean steps in town, still ordered by the flow.
     (4) CROSS-LINKS — a custom node that requires or supplies a CATALOGUE node (a custom good made from a native resource, a
     custom institution selling to a native guild) is pulled by that node the same way; placement runs upstream first, so a
     downstream node always sees its suppliers' sites; a custom pull never moves a native, dossier-declared or author-declared
     place beyond item 22's least disruption.
     (5) SERVICES AND SUBSUMPTION — a custom service `providedBy` an institution sits inside it (a sub-location) or on an
     adjoining plot; a custom institution that subsumes others takes over their site needs (a larger compound where they would
     have stood), never a second site.
     (6) TRADE ENDPOINTS — an import feeds its first consumer through a store (a warehouse, a yard) at the gate or quay facing its
     partner; an export leaves from its last node through the same kind of store; a chain that lives on imports therefore leans
     toward its gate.
     (7) CHANGE — when a chain becomes inactive (a node leaves the dossier), its remaining nodes keep their sites and lose the
     pulls; they may drift over epochs by item 17; when a chain activates, its new nodes are placed against the existing ones
     by least disruption, upstream first.
     (8) BARS — across seeds with custom chains: a chain's nodes sit closer together than a random baseline; the flow order
     holds (resource farther from the market than the final seller) in most placements; a compatible chain's in-town nodes
     sit within their links' comfortable distances in most placements (revised with (3); a quarter name only past item 72's threshold); zero placement failures; a chain toggled off and on returns its nodes to
     their sites where nothing else changed.

105. **OWNER RULE — The supply web: links, not lines; every link pulls both ends (owner, 2026-09-28 ~18:05, filed ~18:20 on
     "Integrate these into the current work").** Owner: "What about when an institution has two or more outputs going to two or
     more different institutions in two or more different supply chains? What about if it's one output going into two more
     different supply chains? … If there is an institution that receives one or more inputs in produces two or more outputs,
     how do we specially position both it's institutions upstream, and downstream in relation to each other." What the base
     does today (CONFIRMED by reading §10.2 and §4.7): `SupplyEdge` lives on the CONSUMER class, keyed by the input; S10a and
     S10b score a consumer's distance to the nearest provider, decaying linearly from 1 at the provider to 0 at `maxDistanceM`;
     `produces` is a plain list, so a producer is never pulled toward its buyers; S7b (1) allocates classes to districts by
     capacity and the district kind's affinity, never by supply, so links act only inside a district; S2's need propagation
     already adds a provider per `perConsumers` consumers. Program's interpretation (vetoable):
     **(a) A WEB, NOT A LINE.** Every supply relation is a LINK between two placed members carrying one good; a chain is a path
     through the web, and item 104 (h)'s chain rules read the web. `SupplyEdge` stays the class-level declaration; the links
     are derived at placement — each consumer member binds to its NEAREST provider member of that good by the edge's mode —
     never stored as truth: recomputed by S10a/S10b on every placement path (generation, assignment, dossier event, positive
     placement, relocation, undo re-derivation) and by the explain query, so no path can leave a stale link.
     **(b) TWO-WAY PULL AND ORIENTATION.** A link pulls both ends: the consumer toward its provider (today's term) and, new, the
     provider toward the weighted centre of its bound consumers. Which end leads is the class's ORIENTATION, derived per class
     from a GOODS table (columns `bulk`, `perishable`, `value`, `comfortM`; item 107 (b)) and overridable per row: SOURCE when
     its inputs' bulk × volume exceeds its outputs' by a table factor (ore into iron, logs into charcoal) — placed near its
     dominant input; MARKET when an output is perishable or bulkier than the inputs (bread, beer, fresh meat) — placed near
     its dominant demand; BALANCED otherwise — placed where its input and output routes meet (the route graph's junction
     nearest the weighted balance point: often a gate, a bridgehead, a landing or a crossroads; scored, never forced).
     **(c) SEVERAL OUTPUTS.** A producer with several goods has one outgoing pull per good, each weighted by the good's volume
     × transport cost (item 103 (a): river and sea legs cheaper than carts). It settles nearest its dominant output's
     consumers; durable or light outputs make the longer trip (the slaughterhouse: meat to the market, hides to the tannery,
     tallow to the chandler).
     **(d) ONE OUTPUT, SEVERAL CHAINS.** Each consumer binds to its nearest provider, so the consumers of a shared provider sit
     within reach of it and so of each other; demand beyond one provider's `perConsumers` adds a provider by S2's existing
     need propagation, and consumers re-bind to the nearer; a provider serving consumers spread over districts is pulled to
     their weighted centre, never they to it.
     **(e) HUBS.** A member with several inputs and several outputs is placed by the balance of all its links under its
     orientation; its suppliers then fan out toward their resources and its consumers toward their markets.
     **(f) ORDER AND LOOPS.** Anchors first (terrain resources and outside classes at S12a's sites, the markets, gates and
     harbour — fixed before S10a, unchanged); then S10a's field-driving classes (unchanged); then source-oriented classes by
     depth from their resources (a topological order over the class supply graph); then balanced; then market-oriented. A
     loop in the class graph (a smith's tools for the mine whose ore feeds the smelter that feeds the smith) is broken for the
     order at its lowest-weight link, and ONE bounded RELAXATION pass (≤ 2, a table cap) re-scores the two-way classes with
     the full provider and consumer rasters, moving a class's block only where the gain exceeds a table threshold and only
     inside its district's allocation; deterministic on the `alloc.block` stream, no new concern.
     **(g) DISTRICT SCALE.** S7b (1)'s district affinity gains a small supply term (a class's links' satisfaction at the
     district's centroid against the providers already allocated in S7b's declared order), weighted low enough that J-A72.46's
     dispersal holds with its random share unchanged — so chance does not split a chain across opposite ends of the town.
     **(h) SPLIT SITES — a works and a shop (owner-approved with this filing).** A class whose row declares `split` (default rows:
     the butcher — slaughterhouse and stall; the brewer — brewhouse and taphouse; the potter — kiln yard and shop) may, where its
     nuisance pushes out and its dominant perishable or retail output pulls in beyond a table threshold, be placed as ONE item
     on TWO plots: the works by its nuisance and input rows, the shop by its output and clientele rows. One institution, one
     dossier binding, two buildings: the shop's building carries a `Use` with a new `branchOf` naming the works' use. Every
     lifecycle path covers both: creation by S10b as one item; a state, closure or removal of the institution reaches both
     (item 14's spread); relocation moves each by its own rows; undo restores both; the clerk and the author may merge them
     back onto one plot (a map-side declaration, item 104 (a) (1)); migration: an absent `branchOf` is no split. Off in the
     parity presets; every split reported.
     **(i) SETTLEMENTFORGE'S OWN CHAINS.** For a dossier-backed town the dossier's `activeChains[]` (processors by name,
     outputs, `upstreamChains`, status) become links between the bound members — research/sf/mapping.md row 46 upgraded from
     evidence to input, processor names resolved by kind family as that row states; an `impaired` or `vulnerable` chain's links
     weaken by a status table; an `entrepot` chain's ends are item 104 (b)'s import and export pulls. Without a dossier the web
     comes from our class rows alone.
     **(j) EXPLAIN AND EDIT.** The clerk answers "why is this here" by naming the links and goods that pulled it (items 101,
     103 (e)); the author may pin, move or cut a link, stored map-side (item 104 (a) (1)), never written to the dossier.
     **(k) BARS (§13.2).** Across seeds: a multi-output producer sits nearer its dominant output's consumers than a random
     baseline; consumers of a shared provider sit nearer it than baseline; source-oriented classes nearer their inputs and
     market-oriented classes nearer their demand than baseline; a loop fixture settles within the relaxation cap, the second
     pass moving fewer members than the first, byte-stable across runs; the share of districts holding a dispersed class stays
     within tolerance of the base's (J-A72.46 holds); split pairs appear for split classes past the threshold and never in the
     parity presets; with the web's weights at 0 the placement is byte-identical to the base (no-op pin).
     **HOMES:** §10.2 (the goods table, the orientation column, `split` rows), §4.7 S10a and S10b (order, two-way term,
     relaxation, split placement), §4.5 S7b (1) (the district supply term), §2.6 and §2.7 (`Use.branchOf`), §7.7 (activeChains
     as a port input; a DR row), §13.2. Volumes: V11 (the goods table and every class's and catalogue kind's orientation and
     split rows), V01 (street-scale closeness, the district term), V02 (the works and shop buildings), V06 (links re-binding as
     members open and close; splits over epochs), V08 (activeChains as input), V09 (the link view and edits), V10 (the link
     explanations). *Scope:* BASE.

106. **OWNER RULE — Walls that use natural barriers: never cut off the water; cliffs, gorges, marsh and the sea close the
     circuit (owner, 2026-09-28 ~18:00, filed ~18:20).** Owner: "Also regarding walls! The base idea is right, but also in some
     cases, they need to both respect and integrate into natural barriers. For example, you'll be hard pressed to find a wall
     that crosses into or completely blocked off water access but rather the wall cuts at the coast and then treats the water,
     access or mountains or cliffs or ridges as an extension of their defense." What the base does today (CONFIRMED, §2.7, §4.2
     S3 (9), §4.4 S5a): the trace never crosses water except at a water gate; an open chain may END on a shore, bank, cliff or
     enceinte anchor, but `Enceinte.closure` is `ring`|`shore`, so only a shoreline closes the enclosure; the trace is pulled to
     defensible ground (ridges, slope breaks, banks) within a 40 m band; thickness, height and walk are per enceinte; the
     `waterfront` row (open by default, `quay_wall`, `sea_wall`, a water gate at every quay access under either wall) is a
     preset, not derived; there is no harbour-mouth chain. Program's interpretation (vetoable), refining the owner's rule to
     "never cut off water access" because many coastal towns did wall their waterfront, always with sea gates:
     **(a) BARRIER CLOSURE.** `Enceinte.closure` gains `barrier`: open stretches whose enclosure is closed by natural barrier
     edges — a shoreline (as today), a cliff or escarpment (bank kind `cliff`, or terrain slope above a table threshold over a
     table height), a gorge or ravine (`SiteFeature`), deep marsh (bank kind `marsh`) — for every "enclosed" and "sealed" test.
     The trace strategy classifies the boundary's arcs by DEFENSIBILITY (a table per barrier kind: sheer cliff or deep water
     closes; steep slope or marsh closes behind a light wall; open ground needs the full wall) and walls only the approachable
     arcs, each stretch's ends anchored on its barrier (the existing anchor kinds) with a tower at each anchor. A river loop or
     a spur is walled across its neck only (Toledo, Besançon, Bern — general historical knowledge, not corpus-witnessed).
     **(b) REACHING THE BARRIER.** When a barrier edge lies within `wall.barrierReachM` (a table value, default 150 m, capped at
     a share of the stage's radius) beyond the stage boundary, the trace may extend to it; the spare ground it encloses is typed
     by S12b as intramural gardens, orchards and paddocks and is not counted as the stage's built land; otherwise the 40 m pull
     stands. The historical checks witness walls fitted to routes, terrain and existing plots and forbid "settlement hull ⇒
     wall" (partitioned/corpus-preview/history.md rows 4a–4d) — this moves the trace further from the hull, never onto it.
     **(c) GRADED BY STRETCH.** The wall's thickness, height, walk and tower spacing become a `ChainProfile` along the trace,
     keyed by each arc's defensibility class: the full curtain on open approaches; a lighter parapet on cliff tops, steep
     slopes and waterfronts; no wall where the drop is sheer or the water deep (closure only); the strongest towers where wall
     meets barrier and across a neck. The per-enceinte values become the profile's defaults (migration: an absent profile is
     uniform, today's wall).
     **(d) THE WATERFRONT FROM CIRCUMSTANCES (DR2).** `open` by default; `quay_wall` with sea gates where the dossier's threats
     come by sea (a naval or raider threat, a hostile sea partner, a coastal monster threat) or on a sea-exposed port above a
     table size; `sea_wall` only by preset or request; the preset row still overrides. A river through the town keeps the
     base's water gates.
     **(e) THE HARBOUR MOUTH.** A walled port's harbour entrance gets two towers on the mole or breakwater heads (or the shores)
     and a chain between them: a `Gate` of kind `water` across the entrance, its banks the two heads; S7 furniture (§4.8),
     drawn raised or lowered by the era row.
     **(f) CASTLES AND LATER RINGS.** A castle's curtain uses the same closure (a cliff-top castle walls only its approach); a
     later ring anchors on barriers as it anchors on the previous enceinte; a shoreline change (reclamation) re-evaluates the
     closure by item 22's least disruption.
     **(g) EDITING.** The wall tool snaps a stretch's ends to barriers and shows barrier arcs as part of the circuit (item 101);
     the clerk explains an unwalled side ("the cliff is the wall here").
     **(h) BARS.** A river-loop fixture walls only the neck and is sealed; a cliff-backed coastal fixture anchors on the cliff and
     the shore with zero wall edges along sheer arcs; 100 % of quays reachable through a gate or an open front; a sea-threat
     dossier gets a quay wall with sea gates and a peaceful one an open front; every walled port gets its harbour-mouth chain;
     F-WALL extended (every open stretch's ends anchored on a barrier or an enceinte); with `barrier` closure and the profile
     off, byte-identical to the base (no-op pin).
     **HOMES:** §2.7 (the closure kind, the stretch profile, the harbour-mouth gate), §4.2 S3 (9) and §4.4 S5a (classification,
     reach, anchors), §4.8 (graded furniture, anchor towers, the chain), S12b (intramural gardens), §7.7 DR2, §5.2 F-WALL, §13.2.
     Volumes: V06 (later rings and barriers, shoreline change), V07 (a village palisade uses the same closure), V05 (an island's
     rim as a cliff barrier), V09 (the wall tool's snapping), V10 (explaining an unwalled side), V11 (the defensibility and
     waterfront-threat table rows). *Scope:* BASE.

107. **OWNER RULE — Spread and pull in balance: distribution and competition beside the supply web (owner, 2026-09-28 ~18:10,
     filed ~18:20).** Owner: "we have to talk about distribution in competition of institutions while also talking about this
     supply chain. It means that we have rules for pulling on both ends up streaming downstream, but we also want to avoid them
     all congregating together we're relevant like multiple apothecaries being in several districts. To generally get a wider
     coverage where appropriate." Program's interpretation (vetoable):
     **(a) A BALANCE PROFILE PER CLASS.** Every member feels SPREAD (item 103 (a)'s competition spacing, 103 (f)'s coverage) and
     PULL (item 105's links, 103 (a)'s other families). The balance is a per-class profile defaulted from its clientele
     (103 (a)) and overridable per row: EVERYDAY SERVICES (daily-local clientele: apothecary, baker, tavern, chapel, barber,
     bathhouse) — coverage strong, supply weak, so they spread toward districts lacking one; TOWN-WIDE SPECIALISTS (goldsmith,
     bookbinder, luxury trades) — neither dominant, may share a street near a market (103 (a)'s clustering crafts), no coverage
     target; HEAVY PROCESSORS (mill, tannery, smelter, brewery, dyer) — supply and physical needs strong, no coverage;
     WHOLESALE AND STORAGE — the gates and quays.
     **(b) NEAR ENOUGH IS GOOD ENOUGH.** A supply link's satisfaction gains a plateau: full within the good's `comfortM` (the
     goods table, 105 (b); short for perishable bulk, long for light durable goods), decaying to 0 at `maxDistanceM` — the
     base's linear decay is the case `comfortM` = 0, which the parity presets keep. Inside the plateau, coverage and spacing
     decide, so buyers do not bunch on a supplier.
     **(c) NEAREST PROVIDER ONLY** (105 (a)): several providers split their consumers; no class-wide centre pulls every member.
     **(d) SAME-KIND SPACING.** A spreading class carries a soft `far` row to its own class inside a district (a table radius
     per class), off for the clustering crafts.
     **(e) QUARTERS ARE NEVER ASSIGNED.** No chain or trade is given a neighbourhood by rule (J-A72.46 holds). A quarter forms only
     by the dossier (a district-defining record, item 72, or a ladder QUARTER record, item 108), an author's declaration (item
     101), or emergence past item 72's quarter-identity threshold, whose per-hectare scaling gives cities more quarters than
     towns and villages few or none. Item 104 (h) (3) is revised accordingly.
     **(f) THE APOTHECARY CASE.** Everyday service: coverage one per district (103 (f)), spaced inside a district, a link to a
     herbalist or physic garden with a generous `comfortM`; with a dossier's "Apothecary district", that district holds the
     raised share (item 72) and the rest still spread (item 108 (a)).
     **(g) BARS.** A coverage class's served-district share stays above its random baseline with the web's weights on (the pull
     never defeats coverage); a spaced class's nearest-member distance above baseline; consumer-to-provider distance within
     `comfortM` in most placements; with `comfortM` and spacing at 0, byte-identical to items 103 and 105 alone.
     **HOMES:** §10.2 (the balance profile, `comfortM`, the spacing row), §4.7 S10a and S10b, §4.5 S7b (1), §13.2. Volumes: V11
     (every class's and catalogue kind's balance row), V01 (the spread across districts), V06 (coverage gaps reopening), V10
     (the explanations). *Scope:* BASE.

108. **OWNER RULE — Institution ladders: a greater tier stands for its members (owner, 2026-09-28 ~18:10, filed ~18:20).**
     Owner: "some institutions with settlement Forge is simply the upstream advanced tier (combination of multiple of) lower tier
     institutions and should be treated as such. Like multiple blacksmith (5-10) for example, is for our purposes one
     institution, but that also means that we should treat the map as having 5 to 10 individual blacksmith buildings that scale
     according to population size." **What SettlementForge gives (CONFIRMED, read-only, the port's baseline branch export):**
     `src/data/institutionLadders.js` holds UPGRADE_CHAINS — pairs of scale tiers of one function where "the greater replaces
     the lesser" (Blacksmith → Blacksmiths (3-10); Carpenter → Carpenters (5-15); Parish church → Parish churches (2-5) →
     (10-30); Apothecary → Apothecary (established) → Apothecary district; Alchemist shop → Alchemist quarter; Theaters →
     Multiple theaters; Courthouse → Multiple courthouses; Town granary → City granaries; Small hospital → Major hospital;
     Barracks → Garrison; Town hall → City hall; Citizen militia → Town watch → Professional city watch; Palisade or earthworks →
     Town walls → City walls and gates; Craft guilds (5-15) → (30-80); Merchant guilds (3-8) → (15-40); Bowyer & fletcher →
     Bowyers & fletchers (guild); River boatyard → Shipyard; …) — and SUBSUMPTION_RULES, where a greater absorbs named lessers
     (brewery over brewer; cobbler's guild over cobbler; tailor's guild over tailor; cathedral over parish church, resident
     priest and wayside shrine; major port over docks, river boatyard and ferry; luxury goods quarter over jeweller; stable
     district over stable master and stable yard; fish market over fishmonger; …). In a dossier the greater appears and the
     lesser is gone. **What we do today (CONFIRMED):** the port parses only NUMERIC count ranges as collective records (DR9:
     members keyed `#k`, their count S2's per-capita rows clamped into the range, dispersed; J-A74.73, J-A80.72); the
     non-numeric qualifiers ("(multiple)" 38, "(guild)" 36, "(district)" 47, "(established)" 44 across the 155 surveyed
     dossiers; research/sf/mapping-verify.md V15) stay in the kind label, and T9 maps such a record to one building or a
     district-defining neighbourhood with no members tied to it. Our design never read the ladder file. Program's
     interpretation (vetoable):
     **(a) THE LADDER TABLE, EACH STEP TYPED.** Our tables carry every ladder pair and subsumption rule (provenance
     `ref:SettlementForge institutionLadders.js`, pinned to the port's baseline and re-checked when the baseline moves), each
     typed by what the step means on the map: COUNT (more of the same, numbered or "multiple") — a collective record whose
     members are n buildings of the lesser class; QUARTER (a trade's district or quarter) — a district-defining record (item 72)
     whose district holds the raised share AND which owns the trade's members, inside its district and, by the class's ordinary
     spread (item 107), outside it; GUILD (a trade's guild) — one guild hall, the record's own building, plus a collective of the
     trade's workshops tied to the record; SIZE (a bigger single establishment: brewery, major hospital, city hall, garrison,
     shipyard; city granaries as one compound of several stores) — one larger building or compound by its template, no extra
     members; REPLACEMENT (a professional watch over the militia, city walls over town walls) — the greater only.
     **(b) MEMBERS SCALE WITH POPULATION.** Every member count reads S2's per-capita rows for the lesser class, clamped into the
     record's numeric range or, unnumbered, into a table range per kind and rung; the range is the dossier fact the coherence
     bar checks (T73-4); members keyed `#k` (J-A74.73); a record's state spreads over them (J-A80.72).
     **(c) NO DOUBLE COUNTING.** Where a greater and a lesser of one ladder both reach the map (a custom institution, an event
     adding the lesser, a stale record), the lesser becomes a member of the greater's collective, never an addition; our
     roster's own per-capita members of that class ARE the record's members.
     **(d) OVER TIME.** A ladder step in SettlementForge (an upgrade by growth or reconstruction, a demotion by disaster; the
     `promotedFrom` / `demotedFrom` receipts already re-bind the key, J-A74.73) adds or removes members by item 22's least
     disruption: an upgrade keeps the existing building as member #1 and places the rest; a demotion keeps the member nearest
     its demand and vacates or ruins the rest by fate (item 17).
     **(e) CUSTOM CONTENT.** A custom institution whose library `subsumes` names other kinds (item 104) is typed the same way —
     a guild-like custom kind over a craft is GUILD, a larger same-function kind SIZE — default SIZE when unknown.
     **(f) BARS.** On the surveyed dossiers: every COUNT, QUARTER and GUILD record shows members inside its range, rising
     monotonically across a population sweep; no ladder pair double-counted; a SIZE record is one building; T9's rows for the
     unnumbered qualifiers updated; a promotion or demotion changes the member count by least disruption.
     **HOMES:** §7.7 (T9 and DR9 extended; the ladder table as a port input pinned to the baseline), §10.2 (the step-type
     table), §4.2 S2 (member counts), §4.5 item 72 (quarter records owning members), §13.2. Volumes: V08 (reading the ladder
     data, the unnumbered qualifiers, promotions and demotions), V11 (every pair typed), V01 (quarter records with members), V06
     (ladder steps over epochs), V10 (the clerk naming a record's members). *Scope:* BASE.

109. **OWNER RULE — Caverns where mountains and mines are; underground RUINS of an older civilisation, structured, connected
     and lived in (owner, 2026-09-28 ~19:15).** Owner: "caverns are more likely to form if they are in a mountainous region or
     if they have mines as a resource. Something similar that I would like to have as well in the underground is ruins. Like
     underground ruins. And that's into the resource related to ancient civilization or magical whatever. Ruins act very
     similar similarly to caverns, but they are much more structured and should have something along the lines of the remain
     outline of past civilization with relevant connection points to anything else underground where appropriate in our
     current roles" / "Also place for undercities or underground dwellings". **What the base does today (CONFIRMED, §4.2 S1,
     II.7.3, II.7.5, II.7.6; V04 §3.5):** caverns exist only on `soluble` or `volcanic` geology, which S1 draws by relief
     (P(soluble) plain 0.10, rolling 0.20, hilly 0.30, mountainous 0.30; P(volcanic) 0, 0.02, 0.05, 0.10), then with the system
     chance (soluble 0.7, volcanic 0.4) — so a mountain site is barely likelier than a hilly one, and mines change nothing;
     mine voids are a separate `quarry` system on ore cells where the roster holds a mining class. The only buried remains are
     the settlement's own earlier grade (`buried`, from `raiseGrade` or a history scar). The dossier's `ancient_ruins`
     resource maps to a SURFACE ruin decoration only and `magical_node` to II.6's supply term and a decoration
     (research/sf/mapping.md, V08). The undercity's void sources are cavern halls, quarry galleries, catacombs, cisterns and
     vaults, and a buried old town (II.7.5 (1)). **What SettlementForge sends (CONFIRMED, read-only):** a `mountain` terrain
     whose allowed resources include `iron_deposits`, `precious_metals`, `gemstone_deposits`, `coal_deposits`,
     `stone_quarry` and `ancient_ruins` (`src/data/geographyData.js`); `magical_node`; "Magical ley lines" income rows
     (`economicData.js`); history events of type `magical`; Adventuring institutions such as "Dungeon delving supply
     district". Program's interpretation (vetoable):
     **(a) CAVERNS FOLLOW MOUNTAINS AND MINES.** (1) Relief: the mountainous rows rise clearly above hilly — P(soluble) 0.45,
     P(volcanic) 0.15 (table values, `extension`, calibratable); a dossier's `mountain` terrain is mountainous relief (DR1).
     (2) Mines: where the site holds mining — `SiteResources.ore` ≥ 0.5 over the frame, a roster mining class, or the dossier's
     mining deposits (iron, precious metals, gemstones, coal, copper) — the cavern system's chance is multiplied by
     `cavern.mineBoost` (1.4, capped at 0.9), and in `ordinary` rock of hilly or mountainous relief a `fissure` cavern variant
     applies with its own chance (0.15): narrow fissure galleries along the steepest relief with one or two chambers, never
     great halls — rock type stays the physical gate for large systems (general knowledge: large caves need soluble or volcanic
     rock), the owner's drivers raise the odds. (3) Mines break into caves: a mine working within `cavern.breachM` (40 m) of a
     cavern gallery joins it by a `breach` link (V04's U-LINK), the mine's shaft then an access to the cavern. Provenance of
     every row: general knowledge, not corpus-witnessed.
     **(b) UNDERGROUND RUINS — a new system kind `ruin`,** distinct from `buried` (`buried` is this settlement's own earlier
     street level; a `ruin` is an older, different civilisation's). EXISTENCE from what explains it, strongest first: the
     dossier's `ancient_ruins` resource or a ruined-landmark record (scene archetype `ruined-landmark`); a `magical_node` or a
     ley-line income row; a `magical` history event or an ancient founding; an Adventuring institution that implies delving
     nearby, as supporting evidence; without a dossier, a blueprint chance by rung and relief under the fantasy toggle (D-3);
     0 in the parity presets. The surface `ancient_ruins` decoration stays and becomes the system's surface marker and, where
     placed, its entrance.
     **(c) STRUCTURE — a remnant plan, not a cave.** The ruin is laid by our own generator as an ANCIENT PLAN from an
     ancient-culture row (a grid, an axial temple precinct, a radial citadel, a terraced cliff city — our own table rows), at
     its own orientation or, with a table chance, sharing one axis with today's main street (the old axis surviving as the new,
     general knowledge), sized by its source's significance (a shrine complex, a palace, a sunken district; capped at a share
     of the frame), at the `ruin` depth band (8–30 m: below a buried old town, above the deep caverns). It is then DECAYED by a
     persistence order (monumental halls, walls, colonnades, cisterns, gates and paved axes survive longest; ordinary rooms
     least) keeping a survival share by age and cover, the rest collapsed or filled. It is laid FIRST in II.7.6's system order,
     so the later systems meet it: caverns, quarries, catacombs, wells and foundations cut through it by the connection graph.
     The result: galleries (old streets and corridors) and chambers (halls, temples, courts, tombs, vaults) with straight walls,
     right angles, columns and axial symmetry — legibly built where a cavern is organic.
     DISTINCT FROM THE TOWN ABOVE (program refinement, owner-approved ~19:55 "Integrate all of your refinements as well"): the
     ancient-culture rows differ from every current culture row in at least block size, grid regularity and orientation law, so a
     ruin reads as another civilisation, never a copy of the streets overhead; a bar measures it.
     **(d) CONNECTIONS, only where our current rules allow** (II.7.6's graph; V04's U-LINK; each link a record with the base's
     closure states — open, silted, caved in, sealed — editable, never breaking another system's hard rule): a cavern gallery
     crossing a ruin street breaks into it (`breach`); a mine or quarry working within reach breaks into a hall (`breach`); a
     catacomb may reuse a ruin's tombs (`reuse`); the sewer may adopt an ancient drain as a trunk stretch where one lies along its
     course (`reuse`, never against the sewer's own hydraulics); a basement over a ruin chamber within its reach may hold an
     access (II.7.3's basement access, its chance raised over a ruin); a well shaft piercing a chamber is an access; a buried
     old town above may reach it by a stair; its surface marker, a ruined landmark or a cave mouth is its entrance.
     **(e) A PLACE TO LIVE.** A ruin is a VOID SOURCE for the undercity (II.7.5 (1)) and for underground dwellings: its halls and
     courts are ready plazas (an ancient forum or temple hall of at least `mainChamberM2` is the first plaza candidate), its
     streets the walkways, its capacity its connected floor area ÷ `m2PerHousehold`. Where several void sources qualify, a ruin
     ranks ABOVE caverns and quarries (a table weight): a built city is readier to live in. The undercity's existence bound is
     unchanged (cities and metropolises; a large town only with a void source; at most 1–3 neighbourhoods). Below the undercity
     threshold a ruin may hold scattered dwellings (squatters, hermits, a cult) by the sewer-front dwelling rows (II.7.3).
     **(f) MAGIC.** Under magic ≥ low a ruin's chambers may carry lights (V04's lighting row, source `magic`), and a dossier's
     `magical_node` sits at the ruin's heart — the node term V05 and V08 read, taken at the ruin's centre.
     **(g) DRAWN, NAMED, EXPLAINED.** A masonry style in the underground view (straight double-lined walls, column dots in halls,
     rubble stipple where collapsed), distinct from the cavern's irregular fill; named from a `ruin` naming slice (the ancient
     civilisation named by the dossier's history when it gives one); the clerk explains it ("the ruins under the old quarter;
     the miners broke into its hall").
     **(h) LIFECYCLE, TIME AND EDITING.** The system record and its arena part persist like every system's (the next unused part
     number, never reused); regeneration re-derives it from its source; undo is the log's; migration: a document without a
     `ruin` system has none. Over epochs a ruin decays slowly, may be excavated (a `dug` link), reoccupied or sealed, an
     excavation or collapse exposing parts by least disruption (item 22). The author draws or pins ruins with the existing
     underground tools (`drawTunnel`, `drawChamber` with system `ruin`).
     **(i) BARS.** Across seeds: cavern frequency rises with relief and is higher with mining than without, per relief class;
     every mine–cavern breach lies within `breachM`; a dossier carrying `ancient_ruins` gets a ruin system or a reported reason,
     its surface marker linked; ruin plans beat the cavern baseline on a structure test (share of right angles and straight
     walls) and differ from the town above on block size, grid regularity and orientation; every ruin link obeys the connection graph; an undercity takes a ruin void over a cavern when both qualify, at the
     ranked share; with the ruin chance 0 and the relief, boost and fissure rows at the base's values, byte-identical to the base
     (no-op pin).
     **(j) ANY TIER; ACCESS IS OPTIONAL AND GROWS WITH THE SETTLEMENT (owner additions, 2026-09-28 ~19:25).** Owner: "the thing
     about caverns and ruins is that they can be in any tier. And they may or may not have an access point to them. It just
     simply means that they were. Unexcavated, but have a chance to be excavated for whatever reason of building sits directly on
     top of it and now they built an access to there or maybe there's just a public opening into these places" / "So a village
     or a Hamlet could be sitting on top of a ruins or caverns. But as they grow, there's much more likely the chance that they
     get access to them and once access established is when dwellings can be established". Program's interpretation (vetoable),
     superseding (b)'s and II.7.6's TOWN-and-above gate for these two kinds and (d)'s assumed entrance:
     (1) ANY TIER. Caverns and ruins exist by (a) and (b) at every rung, thorp to metropolis, the village product included (V07);
     their extent is the site's, not the settlement's, so a hamlet may sit over a large one. Catacombs, quarries, vaults, the
     buried town and the undercity keep their own gates.
     (2) UNEXCAVATED BY DEFAULT. A cavern or ruin exists whole whether or not anyone can reach it; its state is `unexcavated`
     until an access exists. The map still knows it: the underground view draws it in an unexcavated style (dashed, faded)
     under a view toggle, so a game master sees what the inhabitants do not; the clerk says so.
     (3) HOW ACCESS ARISES — each by chance, each recorded as an `AccessPoint` with its cause: (i) DUG FROM ABOVE — every building
     standing directly over a chamber or gallery within `dig.reachM` of its footprint's floor draws once, when it is built, for an
     access down (a cellar stair, a shaft, a well that broke through), at a chance by its class (a temple, a mansion, an inn's
     cellar, a mine or quarry highest; a hovel lowest), by the void's depth (shallower likelier) and by the building's basement
     (II.7.3); (ii) A PUBLIC OPENING — a sinkhole, a cave mouth where a gallery meets a slope's face (the base's `mouth` rule), a
     collapsed shaft in a square or a field, or a ruin entrance at its surface marker — each with its own row chance; (iii) NONE —
     the void stays sealed. Because (i) draws once per building over the void, the chance of access RISES AS THE SETTLEMENT GROWS:
     every growth stage at generation and every epoch that adds buildings over a void adds draws (keyed per building on the
     `sewer` concern, prefix-stable, no new concern), so a hamlet over a cavern is usually sealed and a town over it usually is
     not. An access can later be sealed (the base's closure states) and a sealed void returns to `unexcavated` for dwellings.
     (3b) ACCESS THROUGH ANOTHER SYSTEM (owner addition, 2026-09-28 ~19:50: "Access can also be granted in case if overlapping
     undergrounds. Let's say that, a city has yet to overlap with a hidden underground ruins chamber. It grows to the point where
     its sewer system overlaps with it and crosses through it. Now it has access to it."). When any underground system grows —
     the sewer network extending with the city, a catacomb's growth, a quarry or mine working, a dug passage, an undercity
     lifeline — and one of its tunnels or galleries crosses or meets a sealed cavern or ruin where their depth ranges meet, the
     crossing becomes a `breach` link (V04's U-LINK; the sewer's own course and hydraulics never bent for it), and the void is
     reached through that system. Where they pass at different depths they stay apart, as the base keeps parts apart, save a
     small row chance of a connecting shaft. ACCESS IS TRANSITIVE: a void is `accessible` when the connection graph links it to
     any surface access point, so opening one void can open those beyond it. Every such access records its cause (the system
     and the event that grew it).
     (4) DWELLINGS ONLY AFTER ACCESS. No dwelling, scattered or an undercity, is placed in a cavern or ruin that has no access; once
     an access exists, scattered dwellings (squatters, hermits, a cult) may settle by the sewer-front dwelling rows (II.7.3) at
     any tier, and an undercity still needs its own existence test and bound (II.7.5); an epoch that opens an access may start
     them, one that seals the last access empties them by the base's vacancy rules.
     (5) BARS: a sewer or other system growing through a sealed void at a shared depth yields a breach and makes it accessible;
     DEPTH KEEPS SECRETS (program refinement, owner-approved ~19:55): the dig-down chance falls steeply with a void's depth below a
     building's reach, so even at METROPOLIS a declared share of deep chambers stays sealed — bar: across metropolis seeds, the sealed
     share of voids deeper than `dig.reachM` stays at or above the row's floor;
     caverns and ruins occur at every rung; the share of voids with an access rises monotonically with the number of
     buildings over them across a growth sweep; zero dwellings in a void without an access; every access carries its cause.
     **(k) CATACOMBS — where, how many, and growth that never shrinks (owner, 2026-09-28 ~19:40 and ~19:50).** Owner: "I would
     say that catacombs needs at least the level of a town and it can only be under the largest church or cathedral or under a
     cemetery only one per settlement until they get to city of Metropolis wish there may be two or more depending on the number
     of churches, but the largest one is the cathedral. And catacombs do grow and never shrink. They do some moderately." /
     "[Catacombs] can reach stagnation which means that they just can't expand further for whatever reason and people just switch
     out the corpses inside you know these things happen. But it can't shrink." What the base does today (CONFIRMED, II.7.6; V04
     §3.5.1): TOWN and above; a catacomb may form under every qualifying source — crypted churches, churchyards, religious
     precincts and monasteries — each by its own chance, dry ground and a 100-year age gate, so a town may hold several
     complexes; extent from the ossuary need (the population a source serves over its years × burial rate × ossuary share); no
     explicit rule keeps a recalculated catacomb from shrinking. SettlementForge has no catacomb institution (Graveyard at village,
     'Cemetery network' at metropolis with burial beyond every gate, 'Underground city' at metropolis), so no dossier forces one
     below TOWN. Program's interpretation (vetoable; the owner's words are the rule, the refinements marked):
     (1) TOWN AND ABOVE (unchanged). Catacombs keep the base's gate, unlike caverns and ruins (part (j) (1)).
     (2) SOURCES — REVISED 2026-09-28 ~20:05 (owner: "switch it then, cathedral also gets crypts but cemetaries get catacombs";
     the earlier wording put catacombs under the largest church or cathedral): catacombs lie ONLY under CEMETERIES — a churchyard,
     a separate burial ground, a monastery's burial ground, or a cemetery outside the walls (historically the usual place, Rome's
     by law; SettlementForge's 'Cemetery network' puts burial beyond every gate, so a metropolis's catacombs sit under those
     grounds first) — and, in a CITY or METROPOLIS, a worked-out quarry under or beside the town turned into an ossuary for a
     cemetery's bones (the Paris pattern), counted within the limit. CHURCHES GET CRYPTS: the cathedral always has a crypt, the
     largest crypt in the settlement, and every other church may have one by the base's crypted-class rows — a burial vault in
     the church's own basement, never a catacomb system. Where a church stands in or beside its cemetery and the catacomb grows
     under it, its crypt may join the catacomb by a link (part (j) (3b)).
     (3) HOW MANY: at most ONE per settlement at TOWN; at CITY and METROPOLIS one plus one more per `catacomb.churchesPer` churches
     (table rows, default 10 at CITY and 8 at METROPOLIS), capped by rung (3 and 5); the dossier's church records and ranges
     (item 108's collective members) give the count. The LARGEST catacomb is the largest cemetery's — in a big city usually
     the main cemetery outside the walls (revised with (2)). Candidates are taken in order (cemeteries by the burials they serve,
     then a quarry ossuary) until the count is reached, each still subject to the base's dry ground, age gate
     and source chance, so not every town has one.
     (4) GROWTH, MODERATE AND NEVER SHRINKING. The extent is a RATCHET: every derivation — a growth stage, an epoch, a dossier
     event, a regeneration — may only add galleries and chambers; the ossuary need is recalculated, but the extent becomes the
     larger of the current extent and the need, and its growth per epoch is capped at `catacomb.growthCapShare` of its floor area
     (a table value; a plague epoch's burials included), so growth stays moderate. A new cemetery or church taking a share of burials never
     removes an older catacomb's galleries. Galleries may silt, cave in or be sealed by the base's closure states, and stay part of
     the extent.
     (5) STAGNATION (owner). When growth is blocked — its reach limit, wet ground, another system or a foundation in the way, the
     wall strip, the rock's depth, or its source closed — the catacomb is `stagnant`: its extent holds, and the unmet need is
     absorbed by REUSE (old bones moved into the ossuary chambers, niches cleared and refilled), recorded as the ossuaries' fill
     rising and drawn as denser ossuaries, never as loss. When the block lifts (a plot above demolished, the source reopened), growth
     resumes by least disruption. A catacomb whose cemetery is closed stops growing and stays; a new cemetery may begin a new one
     only where the count allows. A catacomb's growth that meets a sealed cavern or ruin opens it by part (j) (3b).
     (6) BARS: at most one catacomb at TOWN; counts at CITY and METROPOLIS within the table bound; the largest under the largest
     cemetery; every catacomb under a cemetery or a quarry ossuary, none under a church; the cathedral always has a crypt; the extent non-decreasing over every epoch sequence (a property test); growth per epoch within the cap;
     a stagnant catacomb's ossuary fill rises while its extent holds; sources only those of (2).
     **HOMES:** §2.7 (`UndergroundSystem.kind` gains `ruin`; link kinds `breach` and `reuse`), §4.2 S1 (the relief rows, the
     mining boost, the fissure variant), II.7.6 (caverns and the ruin system, its order and depth band), II.7.5 (a ruin as a void
     source and its rank), II.7.3 (basement access over ruins), §7.7 (DR rows for `ancient_ruins`, `magical_node`, the mining
     deposits and the history events), §8.2 (the ruin style), §13.2. Volumes: V04 (the ruin system at build depth — the ancient
     plan, decay, links, dwellings — the cavern boost and fissures, overlap access and the catacomb rules of (k)), V08 (the dossier's ruin, magic and mining sources), V11
     (the ancient-culture plan rows, the ruin persistence order, the cavern and ruin chance rows, the `ruin` naming slice), V06
     (ruins over epochs), V09 (drawing and viewing ruins), V10 (the explanations). *Scope:* BASE design; built with the
     underground layer as the roadmap stages it.

110. **OWNER RULE — Four authoring gaps closed, and a second known-city fixture (owner, 2026-09-28 ~23:30: "they go in").**
     From the Port Nyanzaru assessment (docs/experiments/known-city-authoring.md §6; J114; the reference is study-only and nothing
     of it enters the design). The four gaps were found by search of the design and volumes (CONFIRMED absent). Program's
     interpretation (vetoable):
     **(a) TERRACE RETAINING WALLS.** A new line record, `RetainingWall` (§2.7): a chain on the ground layer holding level ground on
     its high side, with a step-height profile along it (from the terrain on each side), a material and optional towers or
     buttresses (decorative, a table row), never an enclosure (it is not an `Enceinte`). SOURCES: the generator raises one where a
     block, a plot or a ward is levelled on ground steeper than `terrace.slopeMin` and the step exceeds `terrace.stepMinCm`
     (S10 and S11's levelling, and along a terraced district's edge when the relief row asks for terraces); the author draws one
     with T3 `wall` in its `retaining` kind or as the edge of a T2 `ground` terrace stroke. A way that crosses it becomes a stair or
     a ramp by its slope (a way-class rule, never a gap in the wall). RENDERED as a wall line with its shadow on the low side (heights
     feed §8.4). LIFECYCLE: generated walls re-derive with their terrain; drawn ones are held; undo is the log's; a document without
     them has none (migration).
     **(b) RAISED WAYS — viaducts, elevated roads, aqueducts.** A way may be carried above the ground on arches over land, over other
     ways, or over water. Its deck lives in its own ARENA PART of the ground layer (ground parts from 1, allocated once and never
     reused, as the underground's and sky's parts are, §3.4), so the ground's planar rule is untouched: a raised way crosses the ways
     beneath WITHOUT a junction; its two ends are ramps or stairs joined to ground vertices. The invariant "a way crosses water only on
     a deck, and a deck only over water" (§5.3) is REVISED to "… and a ground-part-0 deck only over water; a raised part's deck may
     span land and ways". Its piers are footprints on the ground part; the spaces between piers stay open or hold the base's vaults
     (II.7.6); an aqueduct is a raised water channel of the same kind. SOURCES — REVISED 2026-09-28 ~23:40 (owner: "i think raised
     ways for cities is fair for the genertor to generate adn then a user can decide to add or remove"; the earlier wording allowed
     them only by declaration): at CITY and METROPOLIS the generator raises a way where there is a reason, each a soft rule with a
     table chance and a count cap per rung: a VIADUCT where a primary or secondary route's best course crosses a ravine or valley
     whose drop exceeds `viaduct.minDropM`, priced in the route solver against the detour (span length × a cost row); an ELEVATED
     ROAD linking two high wards, terraces or a citadel and a great temple over a lower district, likelier with prosperity and
     with dossier landmarks on high ground; an AQUEDUCT where the city's water need exceeds what its wells, river and cisterns
     supply inside the walls (the base's cistern rule reads the same distances) and a higher spring or upstream river lies within
     reach, carried across low ground on arches to a basin, cistern or fountain, crossing the wall through an arch, with the era
     and culture rows raising or lowering its chance. A TOWN gets them only by declaration. The USER may add one (T4 `road` with
     `raised`, or the aqueduct class) or remove a generated one; a removal is an edit that holds through regeneration, as every
     edit of generated content does. RENDERED above what it crosses, with its shadow; labelled like any way.
     **(c) STEPPED MASSING.** Buildings may be composed of stacked TIERS: each tier a wing standing on the one below, inset by a
     table step, with its own height, stairs up its faces and a flat roof or a shrine on the top tier. Used by stepped pyramid
     temples, terraced palaces and tiered towers, and by item 109 (c)'s ancient ruins, through composition rows (volume 2) and
     class rows (volume 11); the plan rung (volume 3) plans each tier's rooms; each tier casts its own shadow.
     **(d) BUILDINGS ON MOLES, JETTIES AND BRIDGE DECKS — un-staged.** A mole, a pier, a quay platform or a bridge deck may carry
     plots: its deck face is buildable along its way, frontage plots with a `deck` size budget (small, light, a table row), towers
     and forts at mole heads and mid-mole as placed landmarks. This takes 'plots on a bridge deck' off the staged list (J-A101.04,
     J78 (c)) — the same mechanism serves both. LIFECYCLE: removing or ruining the deck ruins what stands on it by least disruption;
     rebuilding it re-offers the plots.
     **(e) A SECOND KNOWN-CITY FIXTURE at M3a,** beside the first (J78): an ORIGINAL skeleton with this structure and our own names —
     a landward wall anchored on the sea at both ends with towers and a gate plaza, an enclosed harbour behind a mole with a
     mid-mole tower, a fort at its mouth and a causeway to a lighthouse islet, a second open anchorage of jetties, terraced wards with
     inner and retaining walls, ring streets round precincts, a raised straight road, a ravine of stepped housing, a stepped temple,
     an arena — authored both ways (the skeleton file and by hand) with the same acceptance bars as the first fixture.
     **(f) BARS.** Retaining walls appear on terraced slopes above the thresholds and nowhere flat; every way crossing one is a stair or
     ramp; a raised way crosses ground ways with zero junctions and its parts never share a planar arrangement with part 0; generated raised ways appear only at CITY and METROPOLIS, each with its reason recorded (drop, link or water need), within the rung's cap, and a removed one stays removed after regeneration; a stepped
     building's tiers nest and cast one shadow each; deck plots stay within the deck's width and budget and fall with the deck; both
     known-city fixtures pass; with the terrace, raised-way and deck-plot rows off, byte-identical to the base (no-op pin).
     **HOMES:** §2.7 (`RetainingWall`, the raised ways' parts, deck plots), §3.4 (ground parts from 1), §4.3 and §4.6 (raised
     ways, stairs and ramps), §4.7 S10 and S11 (terrace levelling, deck plots), §5.3 (the revised deck invariant), §7.1 (T3's
     retaining kind, T4's raised flag), §8 (drawing and shadows), §13 and §16 (the fixture at M3a). Volumes: V01 (terraced wards),
     V02 (stepped massing, deck-plot buildings), V03 (plans of tiers), V04 (vaults under raised ways, ruins' stepped monuments), V06
     (retaining walls and decks over time), V09 (the tools), V10 (the clerk's calls), V11 (terrace, deck and tier rows), V12 (the
     fixture's bars). *Scope:* BASE design; built with the editing and authoring milestones.

111. **OWNER RULE — Water in dry country: oases as an option, and water shaping the town (owner, 2026-09-29 ~03:05).** Owner:
     "Those gaps work. Please integrate them in. But I will mention that some desert areas to have access to a lake or river or
     coast. Just making sure that oasis are an option." What exists (CONFIRMED): sites need no river, lake or coast; an arid
     climate row; the content volume's water table (V11 §3.24.6: litres per head, wells per hectare by ground, well yield, roof
     capture by climate, rain per year) read only by item 110's aqueduct reason; wells, fountains and cisterns spread by walking
     coverage (V11's water-supply family, about 150 m) and as square, gate-plaza and yard furniture; the SettlementForge port maps
     a desert's `oasis_water` deposit to a pond or lake (V08). Missing: the word oasis in the base, so a standalone desert gets
     none; and any pull of the town toward its water. Program's interpretation (vetoable):
     **(a) DESERT WATER, ALL OPTIONS.** A desert or other arid site keeps every water setting a site can have — a river (an exotic
     river from wetter uplands), a lake, a coast — at the arid row's chances, AND gains the OASIS as a further option: a
     spring-fed pond or small lake in a hollow or at a fault line, with a spring as its source, a grove around it (palms or the
     culture and climate row's trees) and irrigated gardens fed by short channels. Standalone, an arid site draws an oasis with
     the arid row's chance (likelier where the site has no river, lake or coast, still possible where it has one); a dossier's
     `oasis_water` makes one exist (item 20); the user adds or removes one with T2 `ground` (the lake's point-and-level form with
     a spring flag). An oasis is water like any other for every rule that reads water — mills where it falls, water trades,
     bathhouses, wells nearby, the aqueduct's supply, the island and underground rules.
     **(b) WATER SHAPES THE TOWN.** A soft WATER PULL, its weight rising with aridity (strong in arid rows, weak in temperate, near
     zero in wet ones where water is everywhere), acts in three places: the settlement's growth field (S3's travel-cost boundary
     and nucleus in towns, the crowding map in villages, V07) leans toward reliable water — a river bank, a lake or oasis shore,
     a spring, the best-yield well ground (alluvial ground, a dry riverbed's gravels, low ground by the water table) — so a
     desert town crowds around its water; the prosperity field gains a water term, so the wealthy hold the land nearest the
     water and its gardens; and wells and public fountains are placed with extra weight on high-yield ground, their walking
     coverage tightened in arid rows. Over epochs a spring or oasis that fails weakens its pull and the quarters around it may
     decline (V06).
     **(c) SUN AND SHADE BY CLIMATE (program interpretation of item 102 in hot, dry country; vetoable).** Item 102's owner words
     are "more prosperous people would love more sun". In hot arid climates the historically valued ground is shaded and
     watered, so item 102's sunlight term reads the climate row: temperate and cold rows keep it as ruled; hot arid rows set
     its weight to zero or turn it toward shade (a table cell per climate row), with the water term of (b) carrying the
     prosperity pull there. With the cell at its temperate value everywhere, item 102 behaves exactly as filed.
     **(d) BARS.** On arid seeds the share of households within walking distance of water exceeds the non-arid baseline; oases
     appear only on arid sites unless drawn or supplied by a dossier; arid sites still draw rivers, lakes and coasts at the arid
     row's chances; the richest band's mean distance to water falls below the middle band's on arid seeds; with the oasis
     chance, the water pull and (c)'s cell at their neutral values, byte-identical to the base (no-op pin).
     **HOMES:** §4.2 S0 and S1 (the oasis and spring features, the arid chances), §4.2 S3 and §4.4 (the growth pull), §4.5 (the
     prosperity water term; item 102's climate cell), §4.7 S10b (well placement by yield), §7.1 (T2's spring flag), §13.2 (bars).
     Volumes: V07 (the village crowding map's water pull and oasis villages), V08 (the dossier's desert with or without
     `oasis_water`, and deserts with rivers, lakes or coasts), V11 (the oasis chance, grove and garden rows, the water-pull weights
     and the sunlight cell per climate row), V06 (failing springs and oases over epochs), V05 (an island's own water, unchanged),
     V09 and V10 (the tool and the explanations), V12 (the bars). *Scope:* BASE design. *Routing:* this item reached the program
     after the volumes pass had integrated, so the coherence pass (workflows/18-coherence.js) applies it to the base AND writes
     the named volumes' parts at build depth (J120).

112. **PROGRAM RULE under the owner's delegation — Colour-blind-safe maps, and a game-master trial before launch (2026-09-29
     ~08:05; J122).** Owner: "With the exceptional fable, I leave all decisions to you." Decided by the program, vetoable.
     **(a) COLOUR-BLIND-SAFE MAPS.** Every style family and thematic view that encodes meaning in colour (district tints, prosperity,
     ownership, knowledge, the underground's systems, water and ground classes) carries a second cue — a pattern, a line style, a
     label or a shape — so no meaning rests on hue alone; each such style has a checked variant for the three common colour
     deficiencies, selectable in the view settings; the style checks measure it (simulated deficiency contrast between every pair
     of categories a legend distinguishes, against a table threshold). Default styles keep their look; the second cues are drawn
     where they do not clutter (at legend-bearing zoom stops and thematic views). **(b) A GAME-MASTER TRIAL BEFORE LAUNCH.** Beyond
     the owner's panel and the first-five-minutes rounds, a trial with ten to twenty SettlementForge game masters using the map on
     their own settlements for at least two sessions of play, before the map's public release; its findings enter the calibration
     record (V12) and the fix list; participants thanked by credit and early access, no payments. **(c) BARS:** every legend's
     categories pass the simulated-deficiency contrast check in the checked variants; the trial's report exists before release.
     **HOMES:** §8 (the style families and their checked variants), §9 (legends), §13 (the style check, the trial's place in the
     release gate); V09 (the view settings, the trial's running), V12 (the trial's record). Applied by the coherence pass to base
     and volumes like item 111.

113. **OWNER RULE — History shapes the map at generation: the high-water mark, destruction and refounding, ruins of the
     settlement's own past, sewers reopened, and access lost when its link closes (owner, 2026-09-29 ~14:05–14:10).** Owner:
     "Histories. According to settlementForge of course we have different tiers of towns. We also give them a history. In
     accordance to how long of a history that they have and what happens in their history … This is my call for as part of the
     generation. Maybe it grew into a city in regressed and at the time of the generation would be actually have is a village
     with ruins and everything else and all other stuff already generated symbolizing what it was as a fully fledged city. This
     also can be symbolized with ruins underground as well but only after a substantial amount of years of passed and it has to
     be derived from the then geometry of what that's prior, your existing city would have been." / "if the city starts to
     expand in a direction of pre-existing sewers that were once closed off. Then those sewer systems are simply going to be
     reopened rather than a new one constructed again." / "any access that was granted because it was an overlap … if there is
     no other access to the ruins that is preserved and the sewer system that it connect with closes off, then I access to there
     is also removed until it is refound." / "In some cases, an entire settlement was just destroyed outright and people come in
     and just build a hamlet village or another town or city right on top of it". **What SettlementForge gives (CONFIRMED,
     read-only, its history and simulation code, never its map code):** a history with an age by tier (`AGE_BY_TIER`: thorp
     15–300 years, hamlet 30–120, village 30–250, town 50–300, city 100–500, metropolis 200–800), a founding, and historical events
     of 29 types (among them great_fire, plague_years, great_flood, occupation_legacy, trade_collapse, market_crash,
     demographic_pressure, pilgrimage_surge, external_threat), each with years ago and a severity; in campaigns `tierHistory`,
     `populationHistory` and `calamityHistory`; a lifecycle with terminal death and resettlement (a resettled place forced to
     thorp); opt-in ancient ruins ("The Fall of …", 120–400 years before the founding, an `ancientRuin` marker); and its own
     HIGH-WATER LAW (`domain/highWater.js`): built extent derives from the historical maximum population and occupancy from the
     current one, stamped as `peakTier` — with a documented gap where some demotion paths write no stamp, and the rule that a peak
     is never inferred from a demoted state. **What the design has (CONFIRMED):** `HistoryHint` (age and scars) read by the stage
     count, the catacombs' age and the buried old town; volume 6's evolution engine (growth, decline, walls, ruins, regrowth)
     driven by a stated future or the dossier's weeks; volume 4 already REOPENS closed sewer runs on a growth path before digging
     new ones (J-V4.29); item 109 (3b)'s transitive access. Program's interpretation (vetoable):
     **(a) HISTORY-FIRST GENERATION.** A settlement with a known history is generated as its past and then aged to the present.
     (1) The PEAK: built extent follows the high-water mark — SettlementForge's `peakTier` or high-water population when present;
     without them, the history's events are soft hints only and no peak is invented (SettlementForge's own rule); standalone, a
     blueprint history option ("once a city, now a village") does the same. (2) The REPLAY: the evolution engine runs the recorded
     history as coarse epochs (decades by default, a table value) from the founding or the peak to the present — growth; the
     events (a great fire burns and rebuilds a quarter, a great flood raises the grade, plague years and a trade collapse empty the
     edges, an occupation leaves a citadel, a pilgrimage surge adds hostels); decline to the present population — and the
     dossier's present facts are met exactly at the end (item 20: history shapes only what the dossier does not say). (3) The
     RESULT carries its past: walls far beyond the houses, abandoned street lines kept as tracks and field boundaries, a church
     too big for today's congregation, a market square too large for its market, empty plots, roofless and ruined buildings. The
     replay is deterministic from the seed and the history, runs inside a stated generation budget (coarse epochs, detail lazily),
     and is recorded so the clerk can tell the story ("the walls were built when this was a city of twelve thousand").
     **(b) DESTRUCTION AND REFOUNDING.** Where the history says the place was destroyed outright (SettlementForge's terminal death
     and resettlement, a catastrophic event, or an ancient "Fall of" event on the site), the old settlement's geometry becomes
     ruins and the new one — hamlet, village, town or city — is generated on top: it tends to reuse the old roads, gate gaps and
     bridges (the route cost favours them), builds on old foundations and quarries the ruins for stone (the salvage ledger), and
     may follow a different plan and culture; the old plan persists wherever it helps.
     **(c) TIME DECIDES SURFACE OR UNDERGROUND.** Recent ruins stand on the surface. After a substantial time — a table threshold, a
     century by default, shortened by floods, river silt and rebuilding on top, lengthened on bare rock — they are buried and become
     an UNDERGROUND RUIN DERIVED FROM THE FORMER SETTLEMENT'S OWN GEOMETRY: its streets, walls and major buildings at their old
     ground level (the base's buried old town, generalised to the replay). These differ from item 109's ruins of an older, different
     civilisation, which keep their ancient-culture plans. Access to them follows item 109 (j).
     **(d) SEWERS REOPEN** — as already designed (volume 4, J-V4.29): growth over closed sewers reopens them before new ones are dug,
     in the replay as in the live epochs.
     **(e) ACCESS LOST WHEN ITS LINK CLOSES.** Access counts only through OPEN links. When every open path from a void to the surface
     closes — its sewer sealed or caved in, a cellar filled, the building above lost, a disaster — the void becomes LOST: remembered
     as once known, drawn faded like an unexcavated void, until it is refound (the sewer reopened, a new dig, a collapse, an
     excavation). Dwellings in a lost void empty by the base's vacancy rules and may return when access returns.
     **(f) THE PEAK GAP — REVISED 2026-09-29 ~14:20 (owner: "P can simply be used symbolically for a difference in tier"; the earlier
     wording left an unrecorded peak unknown).** Where SettlementForge wrote no `peakTier` but the dossier shows the place once stood
     higher, the map uses an EFFECTIVE PEAK (owner, ~14:22: "Or effectively"): the higher tier itself, treated as the peak for everything the replay builds, sized at a representative value inside that tier's population range
     (a table cell; by default the range's lower quartile), marked `symbolic` in the fact's provenance. The evidence, strongest first:
     `tierHistory`'s from-tier on a demotion; the maximum of `populationHistory`; losses in `calamityHistory`; institutions of a higher
     tier still listed as ruined or remnant (SettlementForge never deletes a record, and its catalogue is tiered, so a village holding a
     ruined "City walls and gates" or a remnant cathedral was once larger); a resettlement after a terminal death. The symbolic peak
     only sizes the remnants the replay leaves — the extent of old walls, streets and ruins — and never contradicts a present dossier
     fact; the clerk says what it is ("the old walls show this was once a city; its exact size is not recorded"). With no evidence of a
     higher tier, there is no peak. SettlementForge's own reporting rule (never infer a peak) is untouched: this is the map's
     derivation (item 20 (h)), not a claim written back.
     **(g) BARS.** A "city to village" history fixture shows walls and street lines beyond the present fabric and an oversized church
     while the dossier's present facts match exactly; the replay is byte-stable per seed and history; a refounded fixture reuses old
     roads where they serve; buried ruins appear only past the threshold and match the former geometry; closing a void's last open
     link makes it LOST and reopening restores it; a symbolic peak only with evidence of a higher tier, sized inside that tier and marked symbolic, and no peak without evidence; with history replay off, byte-identical to the base
     (no-op pin).
     **HOMES:** §4.2 S0 (the history option), §4.11 and §7.7 (the replay at generation; derivation rows for history), II.7.6 (the
     buried former settlement), §13.2 (bars). Volumes: V06 (the replay engine at generation, coarse epochs, the event-to-epoch
     mapping), V08 (reading SettlementForge's history, `peakTier`, lifecycle and ancient ruins), V04 (buried former-town ruins; lost
     access), V07 (a village over a former city; refounding at village rungs), V11 (event-to-epoch rows, burial thresholds), V09 (the
     history option in the editor), V10 (the story told), V12 (the bars and the replay's budget). Applied by the coherence pass to base
     and volumes like items 111 and 112 (J124).

114. **OWNER RULE — The economy slider sets the map's prosperity ceiling at the first generation (owner, 2026-09-30 ~00:48;
     J126).** Owner: "one thing i wanted to add, at generation time the first generation, teh economy slider determines the
     cieling prosperity for the entire map" — and, of this item and item 115 (~00:56): "bundle these into the rewrite phase";
     and, of items 114–116 (~01:10): "bundle all this with g114-115". **What SettlementForge gives (read-only, from the
     survey of its branch `fp/integration-2026-09-23` @ `5d699cc68`, `research/sf/`):** five generation sliders —
     `priorityEconomy`, `priorityMilitary`, `priorityReligion`, `priorityCriminal`, `priorityMagic` — each 0–100 with default
     50, their resolved values in `config` and their raw inputs, `'random'` sentinels intact, in `_config`, which
     SettlementForge keeps secret on every shared surface (CONFIRMED); a further copy in `economicState.priorities`
     (CONFIRMED as a key; that it always equals `config` is PLAUSIBLE only, since `resolveConfig` floors one priority); no
     survey found a writer of the sliders after birth (PLAUSIBLE that they keep their birth values); the settlement's wealth
     is one live word, `economicState.prosperity` (Subsistence … Wealthy), which births reach up to Prosperous (41) but never
     Wealthy ("Wealthy only after lit ticks") (CONFIRMED); the 152 census dossiers generated from rotated configs sit at the
     default sliders (CONFIRMED), the three sample cards' slider values are not recorded (NOT ESTABLISHED); the sliders' UI
     labels, any banding of a slider value, the roll of `_randomizePriorities` and whether `priorityEconomy` moves the
     prosperity word are not recorded (NOT ESTABLISHED). **What the design has:** the standalone wealth slider
     (`Intent.wealthLevel` ∈ [0, 1], required; T1 `intend`; the basic panel's "wealth level"; II.7.1's default 0.5); a
     dossier's wealth level from its prosperity word (DR6, V08 §2.6's `wealth` row); per-town quantile cuts (`FieldBands`,
     §4.5), so "rich" is relative to the town; item 72 (d‴)'s per-district band range, the only ceiling today;
     `config.priority*` on §7.7 item 1's never-read list (item 86; research row 54, J-M5). Program's interpretation
     (vetoable):
     **(a) THE SLIDER — one control, one value.** The **economy priority**, `Intent.economyPriority?: number` — a real in [0,
     100], SettlementForge's range, stored as given; absent reads 50, its default — declared in §7.7's `Intent` and recorded
     in `Recipe.intent` (§2.9). (1) *Hosted:* the port reads the resolved `config.priorityEconomy` into
     `DossierDigest.settlement.economyPriority?: number`, clamped to [0, 100] (noted `value_clamped`), absent where the
     dossier carries none or a non-number (noted `value_absent`); `_config` (raw sentinels, SettlementForge's secret) and
     `economicState.priorities` (a second home of the value, which the closed digest leaves unread) stay unread. The port's
     creation half writes it into `Recipe.intent.economyPriority`; a dossier without it leaves the recipe's value absent
     (50), a map fact the author may change. The economy priority the creation's absorb carried — the creation prefix's
     `dossierFacts` event — is one of the settlement's own facts, carried in `Document.dossier` and `Recipe.intent` on no
     entity (§2.8's dossier paths; §7.7 item 9): dossier-owned exactly when that absorb carried a value, and a value that
     arrives, changes or vanishes later never re-tiers it or moves it ((e)). (2) *Standalone:* T1's wealth slider IS this
     control, re-pointed and renamed — label **"Economy"** (the program's pick: the word both of SettlementForge's keys for
     it use; its own UI label is not recorded), range 0–100, step 1, default 50, continuous — so the basic panel keeps twelve
     controls (§7.8's control-surface budget, R15; J-A101.77). `Intent.wealthLevel` becomes optional. **The wealth level in
     force** — the one term every reader of the wealth level reads: layer 1's expansion, II.7.1's TOWN sewer law, item 71's
     class mix, DR8, V05's `S_town` fallback, V07's `bandShares` — is the recipe's `wealthLevel` where set, else
     `economyPriority ÷ 100` (a §7.7 layer 1 derivation row), and at an epoch the `EpochInputs.wealthLevel` installed past
     `dial.hysteresis` (V06 §3.3.5). So the Economy moves the town's overall wealth exactly as the wealth slider did — the
     one-click default is the Economy at 50 with the wealth level derived 0.5, the value II.7.1, §13.2's sweeps and T15-1
     take — and, below 50, its prosperity ceiling too. A preset or form row that sets `wealthLevel` keeps it (§7.5). Where a
     wealth level is stored (every document older than this item, where it was required; any document whose advanced Wealth
     level an author set; a dossier map, whose port fills it from the word), the Economy moves only the economy priority and
     shows `hint.wealthSeparate` — "Wealth level {w} is set separately (Advanced)."; the advanced **Wealth level** (0–1)
     shows the layer word "from the Economy" while absent and carries **Follow the Economy**, `adjust('intent.wealthLevel',
     null)` (Re-derive from S0), which clears it; on a dossier map it is filled from the word, a map fact, editable (V08
     §5.1), and it moves the town's mean, never its prosperity ceiling ((b) 2). A standalone neighbourhood's
     `HoodRecipe.intent.wealth`, absent, reads the same wealth level in force (V01); the village product's T1 slider is the
     same control (V07). **Surprise me** draws the economy priority as 100 × the wealth level's draw, in the wealth level's
     place in its draw order on `intent.surprise`, and writes no wealth level — so a surprise town's wealth is today's draw,
     and below 50 it now has a prosperity ceiling. (3) *Host frame:* where the creation's absorb supplied it, the Economy is
     dossier-owned — shown locked (`host.locked`); its `adjust` is refused `dossier-owned` (§7.7 item 11), the advanced
     Wealth level offered as the map-side alternative for the town's overall wealth; while SettlementForge's carried value
     differs from the recorded one, the lock's hint shows V08's `host.note.frozen_fact_changed` line ((e)). Absent in the
     dossier, the Economy is a map fact and editable. (4) *Registry (§7.8):* id `intent.economyPriority`; label "Economy";
     output metrics the median plot area and the top band's household share; range 0–100; default 50; consuming stage S0
     (II.7.1's TOWN sewer law reads the wealth level in force); locality *re-derive from S0*; continuous, with item 115's
     economy clause a declared owner step at `gate.economyMin` (75 by default), reported, outside the sweep (which runs with
     islands off); anchor §4.5. §7.1's early-parameter list (seed, rung, …, wealth level, the pack list) gains the Economy.
     **(b) THE PROSPERITY CEILING — a position on the band set, one table, the dossier's word lifting it.** The **prosperity
     ceiling** is a position `at` on the band set's ranks (`squalid` 0 … `rich` 5 on the default set); the **highest allowed
     band** is the band `c` at rank ⌈at⌉ — the highest band any household, plot, district or building may take — and its
     **share** `f = at − ⌈at⌉ + 1` ∈ (0, 1] is the part of the would-be mass at and above it that it keeps ((c)). Design text
     writes "prosperity ceiling", never a bare "ceiling": item 72's "ceiling band", a district range's upper end, keeps its
     meaning. (1) *The table:* `BandSet.ceiling: BandCeilingRow[]`, with `interface BandCeilingRow { economy: number /* 0–100
     */; band: string /* a band id of the set */ }`, ascending in `economy` with band ranks non-decreasing — one cell of
     `prosperity.bands` (V11 row 6), provenance `own` (the program's reading under J122, vetoable), `calibratable: false`
     ("no corpus measures a slider"), and no `ownerRule` stamp: the owner fixed that the economy slider sets the prosperity
     ceiling, not these rows, so V12 §1 lists the rule, never the rows. It is read by linear interpolation in rank and held
     at its end rows. Default rows `{ 0, 'modest' }` and `{ 50, 'rich' }`: on the default set `at = 2 + 3 · min(e, 50) ÷ 50`
     — economy 0 gives `modest` whole, 16⅔ `comfortable` whole, 33⅓ `prosperous` whole, 50 and above `rich` whole, which is
     no prosperity ceiling. *Why:* the default must be the identity — emulation first (FTG's aristocratic tier and MFCG's
     patriciate exist at their defaults) and SettlementForge's own default births reach Prosperous — so the one-click town,
     the goldens and every parity run stay as they are; the lowest row is `modest`, FTG's modest tier and MFCG's craftsmen,
     below which the whole town would be poor, which no reference town shows and no village rung's shares reach (V07's THORP
     keeps comfortable and prosperous households); linear rows make the Economy a continuous, monotone control (§7.8).
     `BandSet` is declared once, in §2.5 beside `FieldBands`: `interface BandSet { bands: { id: string; share: number /* the
     default household share */; ftgTier: string; mfcgClass: string }[] /* in rank order */; blend: 'linear'|'step' /* 'step'
     under the parity presets, item 23 */; ceiling: BandCeilingRow[] }`, the table's name and version being the registry's
     (§7.6); a pack's band set without `ceiling` rows reads the single row `{ 0, <its top band> }`, no prosperity ceiling.
     (2) *The position:* the pure function `ceilingAt(economyPriority, bandSet, liftWealth?)` (§4.5; called by S2, the epoch
     prelude and, for item 116's top means, S3, S4, S5a and S5b — every reader that runs before S6 writes the record) — the
     table's rank at the economy priority, raised by the **wealth lift** to `rank(wealthBand(w))` wherever that is higher,
     `wealthBand(w)` the band of V08 §2.6's `wealth` row whose value is the largest not above `w` (below every row, the
     lowest row's; a row whose band the set lacks skipped) — the band DR6's bar reads. `w` is never an author's value: at the
     first generation it is the dossier's own word (DR6's wealth level from `wealth.label`), after it the lived wealth ((e));
     standalone at the first generation there is no lift. So a dossier's word always keeps its own band allowed (item 20 (h):
     Wealthy keeps `rich`, Prosperous `prosperous`, Comfortable `comfortable`) and a low slider never contradicts it, while a
     word below the economy's row changes nothing. The lift is the least item 20 (h) requires — the word's own band, no
     margin above it — so the owner's rule yields only where the dossier's truth forces it. `FieldBands.ceiling.by` records
     the term that set the position, `'economy'` where both give the same. (3) *Rungs:* no rung row caps a band (§1.1);
     `RungProfile`'s band-keyed rows (`granularity.joinMaxDelta`) are read by (c) 4. (4) *Parity presets:* the `ceiling` cell
     carries `presets` entries, the single row `{ 0, <the set's top band> }`, for `MFCG`, `FTG` and `VG`, and `NG` resolves
     as `MFCG` does (§7.6); `FM`, building-scope, carries none. So under a parity preset the Economy moves only the wealth
     level, as the wealth slider did. (5) *The table at its limits* (§10.2's EP-18 list; V11's compiler, T-V11-2): an empty
     `ceiling` reads no prosperity ceiling; unsorted knots are sorted, a duplicate knot's later row winning, named in the
     report; a knot outside [0, 100] is clamped; a band the set lacks, or a band rank that falls as the economy rises, is
     refused at compile (tier 1, the table's reason row) and an edit that would write one is bent to the nearest lawful row.
     **(c) HOW IT BINDS — the band, never the value.** (1) *The fold (S2).* With `w_r` the residential household shares by
     rank after S2's town-level character shift and `W = Σ_{r ≥ c} w_r`: band `c` holds `f · W`, band `c − 1` holds `w_{c−1}
     + (1 − f) · W` (no such term when `f` = 1), every band above `c` holds 0, the rest are unchanged — continuous and
     monotone in `at`, and the identity exactly when `at ≥ r_max`, the highest rank holding a share. Every other demand row's
     households at a band at or above `c` — a workplace's lifestyle band, a hinterland class's — split the same way, `f` of
     them at `c` and the rest at `c − 1`, rounded by the roster's rule; one entity's band (an institution's) is a discrete
     read by (4). S2 reads the position from `ceilingAt`, since it runs before S6 writes the record; S5d's provisional cuts,
     at generation and at an epoch, are §4.5's folded cuts. A lower Economy therefore builds a smaller town, since poorer
     households' plots are smaller. (2) *The cuts (S6):* §4.5 computes the cuts from the folded demand; every cut at or above
     band `c`'s upper boundary reads 1, and banding reads a value into the lower of the band its cuts give and `c`. A
     fixed-cut set (a standalone neighbourhood's default cuts, J-V1.9) applies the share by one cut: every cut at or above
     band `c`'s upper boundary reads 1 and the cut between bands `c − 1` and `c` is raised to `lower_c + (1 − f) · (1 −
     lower_c)`, so band `c` keeps the top `f` of its value range — J-V1.9's cuts at `f` = 1 and the top rank, band `c` empty
     as `f → 0`. `FieldBands.middle` is designated from the folded shares. (3) *The field is untouched:* `P(x)` is neither
     clamped nor compressed; the richest quarters keep their order and their distances in the value, which the class mix's
     prestige order, `S_town` and the drivers oracle read. A value clamp was rejected — with per-town quantile cuts it binds
     no band, it flattens the top quarters to one value, and standalone it would count the economy twice, since the Economy
     already moves the absolute level through the derived wealth level; a compression of the upper tail was rejected because
     it would move directly the absolute values `S_town` and V05's calibrated supply rows read (the fold moves them only
     through the town's extent). (4) *Reads — continuous at every position:* `R(b)` is a rule table's row for band `b` — its
     own row, or, for a band it carries none for, the row §4.5's interpolation gives at `b`'s centre. Under a prosperity
     ceiling below the top, band `c`'s row is `R*_c = lerp(R(c − 1), R(c), f)` (`R(c)` where `c` is the lowest band), read as
     the end row: values up to band `c − 1`'s centre read by §4.5's rule on the rows at or below `c − 1`, values between band
     `c − 1`'s centre and band `c`'s interpolate from `R(c − 1)` to `R*_c`, values above band `c`'s centre read `R*_c`, and
     no row above `c` is read. At `f` = 1 this is §4.5's end-band rule at `c` and at the top rank today's read; as `f → 0` it
     tends to the rule at `c − 1`. An interval row — item 116's means `[lo, hi]` — is read by item 116 (f)'s one statement of
     it, whose upper end is `R*_c`'s. It holds for every table read along the value — granularity, the designation templates'
     continuous columns, greenery, the hidden-plot shares, the class mix; a read at an entity's own band (the interior ladder
     at the occupants' band, a template's discrete columns) reads that band's own row, every such band lying at or below `c`
     but a held one's ((7)). A discrete read keyed by one named band at or above `c` — one entity's lifestyle or institution
     band, a template row, an `IslandInstitution.requirementBand`, a placement criterion's `prosperityBands` filter — reads
     `c` with probability `f` and `c − 1` otherwise: one draw per entity, keyed by that entity on the concern that already
     draws for it (`roster` by the row's ordinal, `siting` for a placement, `island.place` `reason:k` for an island row),
     made only where `f` < 1, so an uncapped run draws nothing new. So "the rich quarter" means the town's richest. (5)
     *Which bound wins:* each end of a district's `bandRange` is lowered to `c` where it lies above it — the map's prosperity
     ceiling wins over item 72 (d‴)'s rows — and the range still holds the district's own band (J-A72.50), which never lies
     above `c`; the three dials stay inside the range; the pressure's `excess` is measured against the range as lowered, so
     at `c`, whose upper cut is 1, no upward excess arises. A capped town's richest quarter therefore mixes in the band below
     its richest (`[c − 1, c]`): the exclusive enclave of the `rich` row's upper half is the patriciate's, which a town
     capped below it does not have. (6) *The other terms:* item 102's daylight and item 111's water terms stay value terms
     (their bars hold a fortiori); the underground (`undergroundOffset`) and the undercity (`undercityOffset`) are banded by
     the town's `FieldBands` (II.7.3, II.7.5), so never above `c`; the shanty trigger reads the folded shares. (7)
     *Precedence* (lock > dossier existence > assignment > drawn geometry > rule tables > defaults; the prosperity ceiling is
     a rule-table bound): a locked, pinned or declared entity above it holds, `EditFate { fate: 'kept', reason:
     'held_above_ceiling' }`, listed. An author's explicit band above it is HELD, never bent: T5 `quarter`'s band (its sugar
     expansion gains, where the band lies above `c`, a `setAttr` of the district's band beside its stroke — the path §7.1's
     T5 row binds, held in `LifecycleFlags.editedPaths`), a `setAttr` of a district's band, or a `setAttr` on the
     `FieldBands` cuts that opens a band above `c`. The plots of such a district, and of a band an author's cuts opened, band
     at the declared band (the banding clamp of (2) skips them); the households S10a homes there read that band, raised from
     the fold's and listed; the rest of the town keeps the fold; a re-derivation that recomputes the cuts re-applies the
     prosperity ceiling to every cut the author did not set. The dry run confirms the fate with `info.ceiling.held` and
     `button.economyUp` ((h)). A T8 prosperity stroke moves values, which band by the town's cuts under the prosperity
     ceiling; to hold a band above it the author declares the band (T5). A dossier-backed element exists with its own class,
     built by (4)'s reads, its occupants at most `c`; an assignment's class stands, its occupants at most `c`. A seat the
     government row forces (V07's `v.manor_house`, the base's government seats, §10.2) keeps its class's own toft and
     template rows — its geometry is the seat's, as at a THORP today, where no household is rich — while its occupants' band,
     condition and upkeep read at most `c`. (8) *Dossier facts are never moved:* the population (the fold moves shares, never
     counts), the institutions, the prosperity word (it only lifts), the priority itself (read, never written).
     **(d) THE RECORD, AND WHAT READS THE SLIDER.** *The record:* `FieldBands.ceiling?: { at: number /* the position on this
     record's band ranks */; by: 'economy'|'wealth' /* 'wealth': the dossier's word or the lived wealth */ }` on the
     prosperity record (§2.5). S6 writes it with the cuts only where `at` lies below the top rank — at the top rank the
     record carries none, so every uncapped town's model digest is today's — and every epoch that rewrites the cuts rewrites
     it ((e)). It is read after S6 by S7b's provisional range, S10a's `bandRange`, every band read of S10b and S11, item
     116's top means (S7, S10, S10a, S11, II.7.2 and §4.11's builds; S3 to S5b read `ceilingAt`, (b) 2), V01's dispatch,
     V05's island reads, `ProsperityField.drivers()` (which fills `FieldDrivers.ceiling`, (h)), the why card, the Wealth
     legend, the report panel and the clerk; model data in the digest; derived, with no edit kind (§7.1's edit-target row
     names it derived; a `setAttr` naming it bends, (h)); absent is no prosperity ceiling; load recomputes it with the cuts.
     *Reads the economy priority:* the creation — standalone `generate`, T1's first map, Surprise me, a skeleton imported as
     a new document, the port's creation half, and a history-first generation's peak and replay (item 113; (f)); a whole-map
     regenerate from the recipe (Regenerate keep settings, a whole-map New random), which reads the RECORDED value, never the
     dossier's current one; T1's Economy drag, `adjust('intent.economyPriority', v)` — a Re-derive from S0 whose ghost
     regenerates the whole town under the hand and whose fates show "prosperity ceiling: {old} → {new}" (standalone, or a
     dossier map whose creation carried none); and the dry runs of these. *Carries the record, never re-reading the
     priority:* local edits and scoped regenerations (brushes, T5, placements, a scoped New random); undo and redo (each
     Economy change one undo step, the fold restored with its record); load (the replay recomputes the record from the recipe
     and the log). *Lifecycles:* `Intent.economyPriority` — created by T1, a blueprint, Surprise me or the port's creation
     half; read by `ceilingAt`, the layer 1 derivation, item 115's economy clause, the clerk and the report panel; persisted
     in `Recipe.intent`; regenerated as recorded; undone by the adjust's inverse; migrated absent → 50, the identity.
     `BandSet.ceiling` under an `editTable` — created by the edit; read by `ceilingAt`; persisted in the pack and the
     `tablePins`; re-derived from S2; undone by the edit's inverse; migrated absent → `{ 0, <top> }`; the report names the
     departure ("prosperity ceiling rows edited (owner rule 114)"); no stamp binds a user's edit (IN-V11-1).
     **(e) AFTER THE FIRST GENERATION — the founding prosperity ceiling carried, the lived wealth lifting it.** The owner's
     rule binds the first generation: the economy priority is read from its source (the dossier, T1, a blueprint) once per
     creation and recorded in `Recipe.intent.economyPriority`, and every later reader reads that recorded value. What follows
     is the program's reading (vetoable). At every epoch the position is `ceilingAt` of the recorded priority with the wealth
     lift at the **lived wealth** — `EpochInputs.wealthLevel` once it has replaced the level in force past `dial.hysteresis`
     (V06 §3.3.5): the dossier's changed word by receipt F9 through V08 §3.5's `wealth` diff row (W-DOS-02), or a standalone
     trajectory's target; BCR-V6-9's field, which the pipeline's late seat writes into §4.11's `EpochInputs` — computed in
     the epoch's prelude before S2's delta demand, which is folded at it. §4.11 states the prelude's one order: the epoch's
     slice (the magic in force, the partners), deposit states and `TradeFlow`; the lived wealth; this position; item 116's
     material supply (116 (d)); then S2's delta demand and the epoch's builds, whose materials read this position (116 (f)).
     An epoch whose position differs from the record rewrites the cuts by §4.5's rule from the whole town's residential
     demand folded at the new position, with the record, at §4.11 step (a); otherwise this item changes nothing in how an
     epoch treats the cuts. So a lived settlement whose word rises (SettlementForge's lit ticks) or a standalone history
     whose trajectory raises the wealth grows richer than its founding allowed: the occupants' field band re-bands at the
     epoch by §4.5's rule and the built geometry follows by the wealth ladder; a fall brings the position back toward the
     founding's row, never below it, survivors keeping `builtBand` and item 31's floor. *Why (the program's):* realism — a
     town's top never jumps without cause, and a prosperity ceiling that lapsed at the first epoch would give an economy-10
     town grown by 1 % a rich band at once; no survey found a writer of SettlementForge's sliders after birth (PLAUSIBLE)
     while its prosperity word lives (CONFIRMED); item 20 (h) keeps the lived word the truth. *Rejected:* the prosperity
     ceiling lapsing after the first generation (the jump above); following the slider's current value (the owner said the
     first generation); a ratchet (history state for no gain); a limit of one rank per epoch (the word is the dossier's
     truth, the ladder already paces the geometry, and an epoch runs from a week to decades). *A later slider change in the
     dossier* (a same-id re-offer): the settlement's carried fact gains `economyPriority?`, and V08 §3.5's settlement diff
     row compares it and, where it changed, writes one `frozen_fact_changed` note (W-DOS-08's note for a creation-only fact;
     class report; args `field`, `was`, `now`) — no event and no model change: every later reader reads the value recorded at
     creation, so the change re-derives nothing (§7.7 item 11 (b)); a SettlementForge generation with a new seed is a new id,
     a new map whose creation reads its slider. *A later change in the panel:* standalone, the Economy is an adjust that
     re-runs the first generation (Re-derive from S0 with carry-over); in host mode it is refused `dossier-owned` where the
     creation's absorb supplied it.
     **(f) HISTORY (item 113).** A history-first generation IS the first generation: its peak is generated under the recorded
     priority and the dossier's word at creation — SettlementForge records no history of either, so none is invented — and
     every replayed epoch carries the prosperity ceiling by (e), constant while no wealth arrives. So no remnant, ruin,
     survivor or `builtBand` lies above it at any replayed epoch; the high-water mark sizes the extent (a population), never
     a band; a symbolic peak (item 113 (f)) the same. In a destruction and refounding (item 113 (b)) both settlements are
     generated under the recorded priority, and their ruins and buried remains carry no band beyond their `builtBand`. The
     clerk's story names the prosperity ceiling where it bound ("even as a city, its richest households were only
     prosperous").
     **(g) J-M5 AND ROW 54 — narrowed, not reversed.** `config.priorityEconomy` moves from §7.7 item 1's never-read list to
     one named consumer — the port's creation half, which copies it into `Intent.economyPriority` for this item's prosperity
     ceiling and item 115's economy clause. Nothing is counted twice: a bound and a gate clause add no weight to anything the
     institutions (DR9) or the income shares (item 72's economy dial, DR13) carry — the fold bounds the top of the household
     band distribution, which neither states, and the clause decides whether islands may rise, which neither states — and on
     a dossier map the slider never sets the wealth level (the word does, DR6). Whether `priorityEconomy` moves
     SettlementForge's prosperity word is not recorded (NOT ESTABLISHED); if it does, the word sets the mean and the
     prosperity ceiling bounds the top — two moments, not one weight counted twice. `priorityMilitary`, `priorityReligion`
     and `priorityCriminal` stay never-read, and `priorityMagic` is read once at creation by item 115 (a) 1 (the program's
     correction of 2026-09-30); §7.7 item 1's list reads "its generation sliders (`config.priority*`) but `priorityEconomy`
     and `priorityMagic`, each read once at creation (items 114, 115)", and V08's J-V8.45, BCR-V8-25 and T-V8-20's ignore
     clause follow it.
     **(h) EXPLANATIONS AND WORDS** (V09's rows unless named). The why card on a plot in band `c` while the prosperity
     ceiling lies below the top shows `info.ceiling` — "The town's economy ({economy}) caps its prosperity at {band}." — or,
     where the lift set it, `info.ceiling.wealth` — "Its wealth ({word}) lifts the cap to {band}." — carried by V10's
     `FieldDrivers.ceiling?: { band: string; economyPriority: number; by: 'economy'|'wealth' }`, which `drivers()` fills from
     the record where the points' band is `c`; there is no driver term, so the terms still sum to the stored value
     (T-V10-10). The words name the highest band the model holds (band `c` may hold no household when `f · W · N` is below
     one half; the words then name `c − 1`), and the report gives ⌈at⌉ and `f` beside it. The Wealth view's key (§8.2's rule:
     a theme's key lists only the values drawn) closes, where `FieldBands.ceiling` is present, with "Richest here: {band}" —
     the line §8.2's, its words V09's key `legend.wealth.richest`. T1's Economy shows `hint.economyRichest` — "Richest
     households: {band}" — below 50 only. The report panel's recipe line is `report.ceiling` — "Prosperity ceiling: {band}
     ({f}) — economy {economy}", with ", lifted by its wealth" where `by` is `'wealth'`. A held band ((c) 7) is confirmed
     with `info.ceiling.held` — "Richer than the town's economy allows ({band}); held as you drew it." — and
     `button.economyUp`, commit `event:economyTo` = `adjust('intent.economyPriority', n)`, `n` the least whole economy at
     which the asked band is reached whole (17 comfortable, 34 prosperous, 50 rich on the defaults), absent where the Economy
     is dossier-owned. A `setAttr` naming `FieldBands.ceiling` bends with `bend.ceiling.follows` — "The richest band follows
     the town's Economy." — and `button.openEconomy`. The fate rows are `fate.held.ceiling` and, for V05's existing words
     `held against its supply` (II.6's island supply law), `fate.held.islandSupply` (`reason: 'held_against_island_supply'`).
     The clerk (V10): `IntendInput` gains `economy?: number /* 0–100 */`; the lexicon's six wealth rows (penniless … opulent)
     take the field `economy` at their value × 100 (8, 25, 42, 55, 72, 90); V10 §4.1's T1 encoder writes `economy` to
     `intent.economyPriority` (creation) or `adjust('intent.economyPriority')` (edit), and also as `wealth` = economy ÷ 100
     to `adjust('intent.wealthLevel')` where a wealth level is stored, or instead of it where the Economy is dossier-owned;
     "why is no quarter rich?" is answered from `FieldBands.ceiling`.
     **(i) EDGES — outcome; rung of §5.1's ladder where it can fail; test.** (1) Economy 0: `modest` whole (97.8 % of the
     default town's households in it); tier 0, feasible by construction (T114-2). (2) 100 and (3) the default 50: no
     prosperity ceiling, no record, the identity (T114-1). (4) The knots and every fractional position: continuous by
     construction ((c) 1, 2, 4); should §7.8's sweep still fail, its fallback replaces only the layer 1 derivation row
     (`wealthLevel = economyPriority ÷ 100`) over the failing interval — the `ceiling` rows are not calibratable and no
     fallback moves them — and, failing again, the control is declared discrete at the steps its report lists (§7.8 (2))
     (T114-3). (5) A band `c` that rounds to no household (`f · W · N` below one half, e.g. economy 16.67 at TOWN): (c) 4's
     reads and (h)'s words (T114-2). (6) A dossier's word above the economy's row: lifted, `by: 'wealth'`; an author's wealth
     level above the Economy: no lift — the mean moves, the fold caps the top, and the advanced Wealth level shows
     `info.ceiling` with `button.economyUp`, `n` for the band its value names by V08's `wealth` row (T114-5). (7) A THORP and
     the village product: V07's `bandShares` folded (a THORP's `rich` is 0 already, so its fold is the identity at economy ≥
     33⅓); the forced manor keeps its seat's rows ((c) 7) (T114-9). (8) A METROPOLIS: the same table, no rung term;
     `joinMaxDelta`'s rich entry unread while `rich` is empty (T114-2). (9) The standalone neighbourhood: its fixed cuts
     share-adjusted ((c) 2); with `c` below `prosperous` its manor quota is 0 by V01's own formula (`H_top` = 0), so no manor
     block is made and F-DISPATCH never fires; where a quota still finds no household, F-DISPATCH's existing ladder (the
     block stays `ordinary`) (T114-9). (10) The underground and the undercity: never above `c`, by their banding (T114-2).
     (11) Locks, pins and declarations above the prosperity ceiling after an Economy lowered: held, their fates listed
     (T114-10). (12) An author's declared band or cut edit above it: held ((c) 7) (T114-10). (13) A custom or dossier
     institution whose class or `prosperityBands` filter asks for a band above `c`: placed and built by (c) 4, no F-SITING
     entry; a household no range admits still meets S10a's re-home ladder (tier 2) (T114-10). (14) A town at `at ≥ r_max`:
     the fold is the identity, and the model digest is the uncapped run's but for `FieldBands.ceiling` (T114-4). (15) A
     dossier missing the value or holding a non-number: 50, editable, `value_absent`; out of range: clamped, `value_clamped`
     — tier 5, substitution (T114-11). (16) A slider change after creation: (e) (T114-7). (17) Epochs, a rise, a two-band
     jump and a fall (T114-8). (18) The history replay and a refounding (T114-12). (19) An older document: reads 50, its
     stored wealth level kept, replays and upgrades with no prosperity ceiling, its Economy showing `hint.wealthSeparate`
     (T114-13). (20) An edited or pinned `ceiling` table at its limits: (b) 5 (T114-14).
     **(j) BARS (§13.2).** (T114-1) The no-op pin: at economy ≥ 50 the band shares, cuts, bands and every plot equal the
     uncapped town's and `FieldBands.ceiling` is absent; the one-click recipe writes neither `economyPriority` nor
     `wealthLevel`, and at 50 with the wealth level derived, standalone TOWN and CITY have the model digest and every stage
     digest (§6.2, §13.3) of the same town at `wealthLevel` 0.5 without this item, every other rule as filed (item 116's
     materials included) — B-CITY, the goldens, the realism golden (T13-1), every NG, FM and VG parity run — and the parity
     presets `MFCG`, `FTG`, `VG` and `NG` equal their no-prosperity-ceiling runs at every economy. (T114-2) The cap: on 50
     seeds at each of TOWN, CITY and METROPOLIS and economy 0, 10, 16.67, 25, 40 and 49, no household, plot, block, district
     band, `bandRange` end, composition row, occupants' band, underground or undercity plot lies above `c` but a held entity,
     and band `c` holds `f · W` of the households within the roster's rounding (± 1 household per band and stage). (T114-3)
     §7.8's sweep of the Economy (21 steps × 50 seeds at TOWN and CITY, METROPOLIS nightly, islands off) is monotone and
     continuous in the median plot area and continuous in the top band's household share, the class mix's manor share and the
     land share of workplaces in the top two bands, with continuity checks across the knots at 16 ↔ 17 and 33 ↔ 34. (T114-4)
     The value is kept: the drivers oracle on capped fixtures holds no prosperity-ceiling term and its terms sum to the
     stored value (T-V10-10); on a skeleton-imported document (item 101), whose drawn roads, walls and districts pin S5's
     output, economy 20 and 50 with the wealth level held equal give the same pass-1 field cell for cell — except where the
     shanty trigger's verdict differs, reported — and every pass-2 driver term but the placed institutions' and noxious
     kernels; inside band `c` the larger classes stand on the higher values (T71-1's monotone share); edge (14) holds.
     (T114-5) The lift: a fixture at Wealthy and economy 10 has the prosperity ceiling `rich`, `by: 'wealth'`; at Prosperous
     and 10, `prosperous`, `by: 'wealth'`; at Moderate and 0, `modest`, `by: 'economy'`; each of the 35 births and the 12
     after-tick dossiers, re-offered as V12's derived fixtures at `priorityEconomy` 0 and 10, has no plot above its
     prosperity ceiling, and T73-7 passes wherever it passes uncapped; standalone, economy 10 with the advanced wealth level
     0.9 keeps the prosperity ceiling at the Economy's row, `by: 'economy'`, and shows `info.ceiling`. (T114-6) Every
     district's `bandRange` lies at or below `c` and holds its own band; at economy 0 no range reaches above `modest`.
     (T114-7) A same-id re-offer that changes only `config.priorityEconomy` leaves the model digest unchanged and reports
     `frozen_fact_changed`; a migrated dossier document absorbing an offer that now carries the value keeps the Economy an
     editable map fact at 50; an offer that drops the value changes no tier; Regenerate reads the recorded value; a
     standalone Economy change re-derives from S0 and its undo restores the digest; an adjust of a dossier-supplied Economy
     is refused `dossier-owned`. (T114-8) A history whose wealth rises past a band (F9 to Wealthy; a trajectory target of
     0.95; a two-band word jump) lifts the prosperity ceiling at that epoch, the reopened band's lower cut below 1 and the
     record rewritten; the position never falls below the founding's row; no plot's `builtBand` or built geometry moves by
     more than the wealth ladder's step in an epoch; with the wealth held, 20 epochs keep the founding's prosperity ceiling.
     (T114-9) The slum card (economy 10) and the great-houses card (90) of a standalone neighbourhood hold nothing above
     their prosperity ceilings; a hood swept over economy 30–40 shows no step at 33⅓; the hood's manor blocks are 0 below
     `prosperous` with no F-DISPATCH entry; a seigneurial VILLAGE at economy 0 keeps its manor on the manor toft with no
     F-PLAN, its lord's household at `modest`; DR6's bar holds at village rungs wherever it held uncapped. (T114-10) An
     Economy lowered from 60 to 10 keeps every locked, pinned or declared building with its fate; a T5 band chip above the
     prosperity ceiling is held with `held_above_ceiling`, its plots banded as declared, and its undo restores the digest; a
     `setAttr` of the cuts reopening `rich` holds; a `prosperityBands: ['rich']` criterion places by (c) 4 with no F-SITING
     entry; a dossier institution whose class reads `rich` stands. (T114-11) The port reads `config.priorityEconomy` — and,
     for item 115, `config.priorityMagic` — and no other slider (T-V8-20's ignore clause with the three others, `_config` and
     `economicState.priorities`); absent reads 50, noted `value_absent`, editable; 140 reads 100, noted `value_clamped`.
     (T114-12) Item 113 (g)'s city-to-village fixture, run as a standalone blueprint history (item 113 (a) 1) at economy 20:
     no survivor, remnant, ruin or `builtBand` above the prosperity ceiling at any replayed epoch, the peak generated under
     it; a refounded fixture the same for both settlements; byte-stable per seed and history. (T114-13) A document written
     before this item replays byte-identically at its own output version and upgrades with no prosperity ceiling in its diff;
     its Economy shows 50 with `hint.wealthSeparate`; Follow the Economy re-derives it with the wealth level at 0.5, and its
     undo restores the digest. (T114-14) Each malformed `ceiling` table of (b) 5 is refused at compile with its reason row,
     each such edit bent, and an empty table reads no prosperity ceiling.
     **(k) THE UNITS — applied IN the coherence pass's Rewrite phase with items 115 and 116 (owner, 2026-09-30 ~00:56:
     "bundle these into the rewrite phase"; ~01:10: "bundle all this with g114-115"): the units whose rewrite had landed when
     this item was filed — the base parts model, kernel, pipeline, determinism and rendering, and the volumes V03 and V04 —
     in a late rewrite seat where they have a part; every other unit in its main rewrite. One canonical home per shared
     decision (STATES); every other unit cites it (REFERENCES); the three items' one routing is
     docs/validation/coherence/work/g114-116/routing.json with the canon's ruling of 2026-09-30.** *Base — model (§2), late
     seat:* STATES §2.5's `FieldBands.ceiling` and the `BandSet` declaration with `BandCeilingRow`; §2.8's dossier-paths list
     ("its name, tier word, population and economy priority at creation"); REFERENCES §4.5, §7.7. *Base — kernel (§3):* no
     part. *Base — pipeline (§4, §10, PART II, PART III), late seat:* STATES §4.5's prosperity ceiling whole — (b)'s table,
     defaults, parity entries and limits, `ceilingAt` and the wealth lift, (c)'s fold and demand split, the cuts with the
     fixed-cut rule, the continuous reads, the band-range rule and the enclave sentence, the precedence with the held band's
     banding and the forced seat, the record's writing rule, `drivers()` filling `FieldDrivers.ceiling`; §4.2 S0's and §4.7
     S10b (2)'s "the wealth level in force", S2's fold, S5d's folded cuts; §10.2's rows read by (c) 4 and EP-18's limits;
     II.7.1's wealth level in force ("derived from the Economy, 0.5 at its default 50"); §4.11's prosperity ceiling at each
     epoch, the cut rewrite, `EpochInputs.wealthLevel?` and the history-first and refounding sentences; REFERENCES II.7.3 and
     II.7.5 (their banding caps), PART III (V07's fold). *Base — determinism (§5, §6, §7), late seat:* STATES §7.7 layer 1
     (`Intent.economyPriority`, the optional `wealthLevel`, the wealth level in force and its derivation row, Surprise me,
     and the exception "the filled values are map facts, but the economy priority the creation's absorb supplied"), §7.7 item
     1's narrowed list with (g)'s reason, item 9's dossier facts gaining "the settlement's economy priority at creation where
     the dossier supplied one", item 11's refusal gaining "an adjust of the economy priority the dossier supplied at
     creation", the derivation table's DR6 (inputs gaining `settlement.economyPriority`; bar gaining "no plot above the
     highest allowed band but a held one"), DR7 and DR9 (inputs gaining `settlement.economyPriority`) and DR8 ("the wealth
     level in force"); §7.1's early-parameter list (the Economy), its edit-target row (`FieldBands.ceiling` derived) and the
     T5 `quarter` sugar's held band; §7.4's `regenerate / adjust / re-derive from Sk` row naming the Economy (from S0) and
     Follow the Economy, and the `quarter` row's held fate; §7.5's rows (`economyPriority` absent reads 50; a stored
     `wealthLevel` stays; `FieldBands.ceiling` absent is none; `BandSet.ceiling` absent is `{ 0, <top> }`); §7.6's list of
     the cells that carry `presets` entries gaining the `ceiling` cell, citing §4.5 for its entries; §7.8's Economy row, the
     basic panel's "Economy" in place of "wealth level" and the advanced Wealth level; §5.3's coherence row "no household,
     block band, plot band, `bandRange` end or occupants' band above the highest allowed band but a held entity" (stage-end
     S6, S10a, S11; each epoch); §6.2's recorded inputs (the recipe's economy priority); REFERENCES §4.5, V08. *Base —
     rendering (§8, §9, §11, §12), late seat:* STATES §8.2's Wealth key closing line where `FieldBands.ceiling` is present;
     REFERENCES V09. *Base — scope (§0, §1, §13–§17, judgment index), main rewrite:* STATES §13.2's T114-1 – T114-14; §14's
     `DossierDigest.settlement.economyPriority?`, the port's creation and absorb duties for it, `PortNote.kind`'s
     `value_absent`, `value_clamped` and `frozen_fact_changed`, and the T1 row ("drag the Economy slider"); §1.2's defaults
     (the Economy at 50, the wealth level derived 0.5); §0.2's row 114 (principal home §4.5); the judgment index's J-A114.21,
     J-A114.41 – J-A114.48, J-A114.71 – J-A114.75 and J-A114.81 (the first digit naming the part that states the rule; titles
     in the canon's ruling of 2026-09-30); §16's placement (the Economy and the prosperity ceiling at M2b with the prosperity
     field and its band set, the port's reading at M-SF); REFERENCES §1.1 (no rung caps a band). *V01:* STATES the hood's
     Economy (`Recipe.intent.economyPriority`; `HoodRecipe.intent.wealth` absent reads the wealth level in force), the cards'
     values (great houses 90, slum 10), the shanty condition `intent.wealth ≤ 0.2` read as the wealth level in force, the
     manor quota at 0 below `prosperous`; REFERENCES §4.5 for the fixed-cut rule and the band ranges. *V02:* REFERENCES (c) 4
     at §3.2 step 3 — the significance shift reads at most band `c`'s row — in one sentence. *V03, V04:* no part of this item
     (V04's underground and undercity are banded through II.7's `FieldBands` reads, its wealth-level rows are the dossier's
     explicit value or a test's; V03's rooms follow the occupants' band); their late seats carry item 116's parts. *V05:*
     STATES that its `S_town` fallback reads the wealth level in force; REFERENCES (c) 3–4 (`S_town` untouched; an
     institution island's `requirementBand` read by (c) 4; a held island's carried bands at most `c`) and item 115 (e).
     *V06:* STATES the prelude's computation of the position (after the wealth level, before S2's delta demand), the cut
     rewrite at row 4 (`field`), BCR-V6-9's field as the lift's input, start small and the replay under the prosperity
     ceiling, and its bars; REFERENCES §4.11. *V07:* STATES the fold on `bandShares`, the forced manor's rows, T1's Economy
     on the village, and DR6 at village rungs; REFERENCES §4.5. *V08:* STATES the adapter row `config.priorityEconomy` →
     `settlement.economyPriority` (range, clamp, absent), §4.6's rows for `value_absent` and `value_clamped` (class standing)
     and `frozen_fact_changed`'s args, the carried settlement fact's `economyPriority?` and §3.5's settlement diff row
     writing `frozen_fact_changed`, §2.7's lifecycle row (create: the adapter; read: the creation half and the diff; persist:
     the carried fact; regenerate and undo: none; migrate: an older carried fact lacks it and is filled at the next absorb
     with no event, the recipe keeping its creation value and tier), J-V8.45 and BCR-V8-25 restated, the host frame (the
     Economy locked where supplied, the wealth level editable), W-DOS-02's `wealth` diff row, which (e) reads, the census
     reading (the 152 generated dossiers at 50: no prosperity ceiling), and T-V8-20's ignore clause citing T114-5, T114-7 and
     T114-11. *V09:* STATES T1's Economy (label, range, step, default, `hint.economyRichest`, `hint.wealthSeparate`, its host
     lock), the advanced Wealth level (the layer word "from the Economy", Follow the Economy), `info.ceiling`,
     `info.ceiling.wealth`, `info.ceiling.held`, `bend.ceiling.follows`, `button.economyUp` with `event:economyTo`,
     `button.openEconomy`, `fate.held.ceiling`, `fate.held.islandSupply`, `report.ceiling`, the key `legend.wealth.richest`
     (the words of §8.2's closing line of the Wealth key, which rendering states), and BCR-V9-2's cells. *V10:* STATES
     `IntendInput.economy`, the lexicon's wealth rows re-valued, §4.1's T1 encoder row, `FieldDrivers.ceiling` and the why
     answers. *V11:* STATES row 6's `ceiling` cell in `bands.json` (provenance `own`, `calibratable: false`, its `presets`
     entries as §4.5 states them) and its compiler bars (T-V11-2); REFERENCES §4.5 for the rows. *V12:* STATES §1's
     owner-rule list entry (the rule, never its rows), `Level.intent?: { wealthLevel?: number; economyPriority?: number }`,
     the rule that a level setting `wealthLevel` explicitly keeps the economy at its default (so every existing bar,
     `T110b.elevated.prosperity` included, is unchanged), the derived fixture form `'<dossier>@economy<e>'` beside
     `'@pop×k'`, and the register's entries for the `ceiling` rows (own, not calibratable). *Scope:* BASE for (a)–(d) and
     (g)–(j); STAGED with evolution for (e) and (f).

115. **OWNER RULE — Floating islands at the first generation need both high magic and a high economy (owner, 2026-09-30
     ~00:54, replaced ~00:55; J127).** Owner (~00:54): "and only high magic on the slider allows for floating islands in the
     initial generation.", then (~00:55), replacing it: "actually floating islands has to have both high magic and high
     economy" — and (~00:56) "bundle these into the rewrite phase"; (~01:10, with item 116) "bundle all this with g114-115".
     High magic is read on the magic slider, as the owner said it (the program's correction of 2026-09-30,
     docs/validation/coherence/work/g114-115/program-correction.md). **What SettlementForge gives (read-only, from the same
     survey):** a magic slider `priorityMagic` (0–100, default 50) and a toggle `magicExists` among the wizard's raw settings
     (CONFIRMED); a resolved word `config.magicLevel` ∈ none, low, moderate (alias `medium`), high, which its step 1
     (`resolveConfig`) provides (CONFIRMED) — how it is resolved, from the slider, the toggle, culture or tier, is not
     recorded (NOT ESTABLISHED); `medium` in 152 of the 155 census dossiers and `low` in 3, none `high` (CONFIRMED);
     SettlementForge's own map profile reads `config.magicLevel`, `config.priorityMagic` and `config.magicExists`
     (CONFIRMED), so that the resolved `config` carries `magicExists` is PLAUSIBLE (its census city lists 23 keys without
     it); the 152 census dossiers generated without setting a slider sit at `priorityMagic` 50, the three sample cards'
     values are not recorded (NOT ESTABLISHED); the economy slider of item 114; no banding of either slider (NOT
     ESTABLISHED). **What the design has:** II.6's island rule — the model setting `recipe.layers.islands` (off by default,
     D-3), the rung gate, the supply law `h(S_town)`, `h(S_carried)` with the `magical_node` term, and no magic clause; V05
     §3.2 (1)'s `skyGate` with a parity clause and a dossier-only clause "magic not `none`"; §7.7 item 11 and J-V5.19's
     refusal of the setting where the dossier's `site.magic` is `none`, and V05 §4.4's wane of every island at a later
     dossier `none`, against V08's rule that the site is creation's (W-DOS-08); `CircumstanceSlice.magic` ∈ none, low, high
     (`none` by default) with no standalone control; V08 §2.6's `magic` row (medium → low, J-V8.47: "magic present but not
     shaping the town unless the dossier says `high`"); research row 12 ("none → no islands"; "word → a supply multiplier").
     Program's interpretation (vetoable):
     **(a) THE MAGIC THE GATE READS — the magic slider beside the map's one magic.** The gate reads two things. The **magic
     in force**: the creation slice's `CircumstanceSlice.magic` at the first generation and, at a later rising, the slice in
     force at that epoch — the one magic the lights, the magic-gated classes and the access kinds read. And the **magic
     priority**, `Intent.magicPriority?: number` — a real in [0, 100], SettlementForge's magic slider's range, stored as
     given, absent 50 — declared in §7.7's `Intent` and recorded in `Recipe.intent`, read once per creation and carried after
     it as item 114 (e) carries the economy priority; the gate reads it, and standalone the Magic control's word follows it
     ((2)); nothing else reads it. **High magic** is (b)'s reading of the two. (1) *Hosted:* "high magic" reads
     SettlementForge's magic slider, as the owner said it, with SettlementForge's own word beside it. The port reads the
     resolved `config.priorityMagic` into `DossierDigest.settlement.magicPriority?: number`, clamped to [0, 100] (noted
     `value_clamped`), absent where the dossier carries none or a non-number (noted `value_absent`, read 50), and the port's
     creation half writes it into `Recipe.intent.magicPriority` as item 114 (a) 1 writes the economy priority — one of the
     settlement's own facts, carried in `Document.dossier` on no entity, dossier-owned exactly when the creation's absorb
     carried a value. It reads SettlementForge's resolved word, `config.magicLevel`, through V08 §2.6's `magic` row into
     `site.magic` and the creation slice (none → none; low → low; moderate → low; medium → low; high → high), and where
     `config.magicExists` is false the row gives `none` whatever the word; `_config` (raw sentinels, SettlementForge's
     secret) stays unread. *Why:* the owner named the slider ("high magic on the slider"); SettlementForge's own `high`
     states that its world's magic is high whatever its slider; a world SettlementForge states without magic has none, and
     nothing floats there (item 20 (h)); and the one threshold on the slider is (b)'s. `priorityMagic` leaves §7.7 item 1's
     never-read list, read once at creation (item 114 (g)). The report names both values and their source ("magic low, slider
     50 — SettlementForge" for a `moderate` world: the record carries the magic in force). A dossier whose `magicLevel` is
     absent carries no `site.magic` (`DossierDigest.site.magic?`, noted `value_absent`), and a word the row lacks the same
     (noted `unmapped_word`); the creation slice's magic is then the map's own, `none` under D-3, a map fact the author may
     change. So a dossier carrying `priorityMagic` but no `magicLevel` reads a world without magic until the author sets its
     magic, and its slider alone opens no island — the program's reading (vetoable; D-3; the alternative: read an absent word
     as `low` where `magicExists` is not false, SettlementForge's default); SettlementForge's step 1 always resolves the
     word, so only a malformed or older dossier meets it. The creation slice's magic word is dossier-owned exactly when the
     creation's absorb supplied it (§2.8's dossier paths, beside the typed slices; §7.7 item 9), and an `adjust` of it, or of
     a dossier-supplied magic priority, is refused `dossier-owned` (§7.7 item 11's "a slice value the dossier supplied", and
     item 114's refusal for a priority). The site is creation's (V08 §2.7; W-DOS-08): a later `magicLevel` or `magicExists`
     is compared by V08 §3.5's `site` row and a later `priorityMagic` by its settlement row, each writing one
     `frozen_fact_changed` note and moving nothing — so V05 §4.4's wane at a later dossier `none` is withdrawn. (2)
     *Standalone:* a new advanced-panel control **Magic**, mirroring SettlementForge's magic slider and its `magicExists`: a
     0–100 slider, the magic priority (label "Magic", step 1, default 50, high at 75 or more), with a switch **No magic in
     this world**, on by default (D-3). The switch is the creation slice's magic: on, `none`; off, the word the slider reads
     — `high` at a magic priority of 75 or more, else `low` (a §7.7 layer 1 derivation row) — so the lights, the magic-gated
     classes, the access kinds and the gate read one magic. Its registry rows (§7.8): `intent.magicPriority` (label "Magic";
     output metric the magic word it reads (standalone) and the gate's magic clause; range 0–100; consuming stage S2, V11
     §3.5's magic-gated classes; locality *re-derive from S2*; continuity *discrete*, its levels split at 75 (the word) and
     at `gate.magicMin` (the gate, 75 by default), shown as a stepped slider, reported, outside the sweep; anchor II.6) and
     `circumstances.magic`, the switch (label "No magic in this world"; output metric the magic in force; the timeline's
     first entry; S2; *re-derive from S2*; *discrete*, on · off; anchor II.6). It sits in the advanced panel's "Programme"
     group (V09 §4.14 groups by consuming stage) and the Islands control links to it by `button.magicHigh`. The slider emits
     `adjust('intent.magicPriority', v)` and, where the world has magic and the word it reads changes,
     `adjust('circumstances.magic', w)` in the same `group` (one undo step); the switch emits `adjust('circumstances.magic',
     'none')`, or, turned off, the slider's word; §7.1's T1 row binds both. A word set otherwise — a level's, the clerk's, an
     older document's, a later timeline entry's — stands until the control next moves. Where the dossier supplied them both
     parts are shown locked. *This follows SettlementForge's magic slider and toggle, with one departure:* D-3 keeps a
     standalone world without magic by default (SettlementForge's default reads low), so the switch starts on and the
     one-click town is unchanged; the slider's high at 75 is (b)'s pick, fixed in the control's reading (an edited
     `gate.magicMin` moves the gate alone). Surprise me leaves the magic priority absent and the world's magic untouched: it
     draws the economy priority in the wealth level's place and no other new intent, and the magic priority matters only
     where the world has magic, a circumstance Surprise me leaves as it is (no magic by default, D-3). The clerk's
     `IntendInput.magic` and `IntendInput.magicPriority` encode it (V10); V12's `Level.intent.magicPriority?` and
     `Level.magic?: 'none'|'low'|'high'` set a level's.
     **(b) "HIGH".** *Magic:* **high magic** holds where magic exists — the magic in force is not `none` — and either the
     magic priority is at or above **75**, inclusive, on SettlementForge's 0–100 scale (the stored value, absent 50), or the
     magic in force is the word `high`; never where magic does not exist. *Economy:* item 114's economy priority ≥ **75**,
     inclusive, on the same scale, comparing the stored value (absent 50). *Why 75 (the program's pick, vetoable), on both
     sliders:* SettlementForge records no banding of its sliders; "high" must lie above the default 50, since a default
     settlement is not high, and 75 is the upper half of the range above the default, a round, neutral cut, the same on both;
     for the economy it also lies where item 114's prosperity ceiling is already the top band (≥ 50), so an island town is
     never capped. *The cells:* `IslandRule.gate: { magic: ('low'|'high')[] /* the words that make magic high: ['high'] */;
     magicMin: number /* 75, inclusive: the magic slider's high */; economyMin: number /* 75, inclusive */ }` on both rung
     rows of `islands.json` (V05 §2.4, `IslandRule`'s declaring home). All three cells carry provenance `own`, `calibratable:
     false` ("no corpus measures a slider") and no `ownerRule` stamp. The owner fixed the two conjunctive clauses — high
     magic on the magic slider, and a high economy — not the word list, not 75 and no row. So V12 §1 lists the rule, never
     the cells, as item 114 (b) 1 does for its rows. SettlementForge's word `high` beside the slider is the program's
     correction (vetoable). The economy clause reads the slider's value — never the field, `S_town` or item 114's prosperity
     ceiling; the magic clause reads the magic priority and the magic in force — never the deposits (the node term stays the
     supply law's). Research row 12's "none → no islands" is superseded by the magic clause, and its "word → a supply
     multiplier" stays unadopted: the clause gates, the supply law sizes. *The cells at their limits* (V11's compiler,
     T-V11-2): an empty `gate.magic` leaves the slider's reading alone, reported; a word outside low and high — `none`
     included, since magic that does not exist is never high — is refused at compile (tier 1, the table's reason row); a
     `magicMin` or `economyMin` outside [0, 100] is clamped; an author's `editTable` of any `gate` cell is named in the
     report ("islands gate edited (owner rule 115)"), re-deriving from S7b.
     **(c) THE GATE — four clauses in order, then the supply law.** Islands rise by rule only where all hold: (1) *setting* —
     `recipe.layers.islands = 'on'`, stored as `Recipe.params['layers.islands']` ('off' | 'on', absent 'off') as
     `islands.count` is `recipe.params['islands.count']`, its `adjust` param `layers.islands`; (2) *rung* —
     `RungProfile.layers.islands = 'possible'` (CITY, METROPOLIS); (3) *magic* — high magic ((b)): the magic in force is not
     `none`, and `Intent.magicPriority ≥ gate.magicMin` or the magic in force is among `gate.magic`; (4) *economy* —
     `Intent.economyPriority ≥ gate.economyMin`. Then II.6's supply law runs as today (`h_town`, the slots, the reasons, the
     fill). V05's parity clause is dropped: the parity presets hold the setting off and zero the island chances (§7.6;
     J-V5.25), so clause (1) and the slot law already give them no island, and an author who turns the setting on under one
     has departed from the preset as by any edit (`Recipe.presetId` stays provenance only, §2.9). *The record:* `SkyGate {
     open: boolean; failed: { clause: 'setting'|'rung'|'magic'|'economy'; value?: string | number /* the magic clause: the
     magic in force */; magicPriority?: number /* the magic clause only */; source: 'map'|'dossier' }[] /* every failing
     clause, in the order above */ }`, computed by one pure function `skyGate(recipe: Recipe, rung: Rung, magic:
     CircumstanceSlice['magic'], dossierOwned: { rung: boolean; magic: boolean; magicPriority: boolean; economy: boolean }):
     SkyGate` (V05 §3.2 (1); exported by `@plat/sky`; the two priorities from `recipe.intent`), which S7b (5),
     `IslandEpochStep`, §7.8's Islands control, the report and the clerk all call; derived, never stored. A clause's source
     is `'dossier'` where no map-side change can open it — for the magic clause, a world the dossier states without magic, or
     a word and a magic priority both the dossier's. *The report:* with the setting off, nothing; with the setting on and the
     gate closed, one `GenerationReport.requestedVsBuilt` entry `{ subject: 'layers.islands', requested: 'on', built:
     SkyGate['failed'], reason: 'islands_gated' }` — §5.4's `ReportCode` gains `islands_gated`, its row's class cell "the
     island gate closed (II.6; item 115) — an outcome, never a failure" and its landing `requestedVsBuilt`; an epoch's closed
     rising counts in V06's `EpochReport.islandsGated: number` with one chronicle line; V09's rows `report.islands.gated` —
     "Floating islands are on, but {clauses}." — and `report.islands.clause`, naming each value and its source ("magic low,
     slider 50 — SettlementForge"; "economy 50 — this town"). The old `gated: dossier magic` folds into the magic clause.
     *Subsumed and replaced:* V05 §3.2 (1)'s dossier-only clause "magic not `none`" is subsumed by (3) in every document;
     §7.7 item 11's refusal of the SETTING where the dossier states `none`, and J-V5.19, are replaced by (d) 4–5; II.6's
     missing magic clause is closed. *The count:* the gate precedes it — under a closed gate no slot opens by rule, and an
     integer `islands.count` opens none (its adjust applied, the report `islands_gated`). Forced slots — a creation-prefix T5
     `sky` declaration, an assignment whose criteria carry `sky` — are the author's and are judged by (d) 4: S7b (5) runs its
     forced slots at every rung that admits islands whatever the setting and the gate, and its rule-driven slots only through
     the gate. With SettlementForge's census values no dossier city generated without setting a slider — 152 of the 155 — has
     islands at its first generation: its magic slider sits at 50 and its economy at 50, and none of the 155 is `high`
     (CONFIRMED); the three sample cards' sliders are not recorded (NOT ESTABLISHED), so they meet the gate at whatever
     values they carry — the consequence of the owner's condition at SettlementForge's present values. A SettlementForge city
     gets islands only where its world has magic, its magic slider is at 75 or more or its word resolves `high`, and its
     economy slider is at 75 or more.
     **(d) AFTER THE FIRST GENERATION — the gate binds what rises, never what stands.** The owner's rule governs the initial
     generation: the creation, every re-derivation of it, and the history-first replay, which item 113 makes part of the
     generation (§4.11: the replay's epochs are the creation prefix). Gating every later rule-driven rising by the same
     clauses is the program's reading (vetoable): the "actually" message restated the condition without narrowing it to a
     moment, and a rising without both would contradict "has to have both". *Rejected:* later risings under today's law alone
     (a low-magic city would gain islands at its first epochs). (1) *What rises:* generation and every re-derivation through
     S7b, the history replay, an epoch's `raiseIsland` (V05 §3.15 (5)) and an epoch's refloat of a SETTLED island (V05 §3.15
     (4): a settled island is empty at its floor, and re-peopling it is a rising, which V05 already gates by the rung) each
     read the gate — the magic in force at that time and the recorded magic and economy priorities, constant after creation
     (item 114 (e)). They differ in time because they differ in kind: the magic in force is a circumstance of the timeline
     (item 68's slice, which a standalone history's `trajectory.slice.magic` may change), the two priorities creation inputs;
     on a dossier map all three are the creation's ((a) 1). A closed gate at an epoch draws nothing on `island.place` for
     that slot, and since every island draw is keyed by lineage and index no other draw moves. A start-small town (V06
     §3.3.3) fails the rung at its founding; the epoch that carries it into CITY may raise an island only through an open
     gate. At a destruction outright (item 113 (b)) every island of the old settlement falls in that epoch (`fallIsland`, its
     landfall among the ruins) — the one case where an island falls without its dwells, reported — and the refounded
     settlement's islands rise only through the gate. (2) *What stands:* a floating or waning island follows the supply law
     and the rung (II.6 (6)); magic falling from high to low, or the economy clause failing, neither wanes it nor stops a
     waning island's recovery. Magic `none` in force — which after creation arises only from a standalone timeline's slice,
     the dossier's magic being the creation's — makes every island's target 0 at the next epoch (they wane, settle and fall
     over their dwells, never vanish: magic is what keeps them aloft, II.6; V05 §4.4's law, which read only a dossier's
     `none`, now reads the magic in force), save an island a lock or a declaration holds, which stands with `EditFate { fate:
     'kept', reason: 'held_against_magic' }`. At the epoch a magic change reaches, every generated access whose kind the
     magic in force no longer admits converts to the nearest admitted kind in V05 §3.10's order (a listed fate), and an
     author's placed access holds, `held_against_magic`. (3) *A later change:* the economy is creation-only (item 114 (e)); a
     dossier's later `priorityMagic`, `magicLevel` or `magicExists` is a `frozen_fact_changed` note ((a) 1); standalone, the
     Magic — either part — is an adjust that re-runs the first generation (Re-derive from S2), whose generated islands rise
     again only through an open gate, their fates listed. (4) *The author's own islands* (item 101 R2, R13): a T5 `sky`
     declaration, a T6 placement onto an island the dry run turns into one, and a creation-prefix assignment whose criteria
     carry `sky` are judged only by the rung — absolute, `refuse.islandsRung` — and by a dossier-stated `none` — refused
     `dossier-owned` with `refuse.islandsNoMagic`, "This world has no magic; nothing floats here.", the one refusal (item 20
     (h)), reading the creation slice's magic where the dossier supplied it. With the setting off, under a parity preset, or
     under a failed magic or economy clause, the island is allowed and the setting stays as it is; a failed clause gives the
     fate `EditFate { fate: 'kept', reason: 'held_against_magic' | 'held_against_economy' }`, confirmed at the dry run beside
     V05's `held_against_island_supply` (J-V5.10 extended), and a locked generated island under a failed clause carries the
     same fate. A held island stands by R13 and no gate wanes it; undo is the declaration's inverse. V05 §4.2's "the gate …
     must hold" is rewritten to this. (5) *The Islands control* (§7.8), at CITY and METROPOLIS: where every failing clause is
     the map's, turning it on applies the setting and shows `info.islandsGated` — "Floating islands need high magic —
     {magicMin} or more on the Magic — and an economy of {economyMin} or more." (args the gate's `magicMin` and `economyMin`)
     — with `button.magicHigh` (commit `event:magicHigh`: the Magic control set to high magic in one `group` —
     `adjust('circumstances.magic', 'high')` where the world has no magic, and `adjust('intent.magicPriority',
     gate.magicMin)` where the magic priority is below `gate.magicMin`) and `button.economyHigh` (commit `event:economyHigh`
     = `adjust('intent.economyPriority', gate.economyMin)`), each shown only for its own failing clause; where any failing
     clause is the dossier's the setting can raise nothing, so the control is disabled with its reason row —
     `refuse.islandsDossier.magic` "SettlementForge sets this world's magic to {magic}, its slider at {magicPriority};
     floating islands need high magic.", `refuse.islandsDossier.economy` "SettlementForge sets this town's economy to
     {economy}; floating islands need an economy of {economyMin} or more.", or `refuse.islandsDossier.both` "SettlementForge
     sets this world's magic to {magic}, its slider at {magicPriority}, and its economy to {economy}; floating islands need
     high magic and an economy of {economyMin} or more." — each carrying `button.drawIsland`, "Place an island by hand" (T5
     with `sky`, held), unless the dossier states `none`, and `button.showWhy`. V05 §3.2 (5)'s supply sentence gets its row,
     `info.islandsNone`, with the remedies "raise the Economy, or place an island by hand". J-V5.19 becomes: "Chose to gate
     every rule-driven rising by item 115's clauses in every document, to disable the Islands control where a failing clause
     is the dossier's, and to refuse only a declared island in a world the dossier states magic-less, because the owner
     coupled islands to magic and the economy (item 115) and a floating island would contradict a magic-less dossier world
     (item 20 (h))." (6) *Presets:* no shipped preset turns islands on; a user's preset with the setting on meets the gate
     like any recipe. (7) *The view toggle* shows the islands a settlement has and creates none (J-A15.41), unchanged. (8)
     *Load* replays and recomputes the gate from the recorded inputs. (9) *Migrate:* the schema chain reads the economy and
     magic priorities absent (50) and the magic word as stored, except that a carried `site.magic` whose standing port note
     is `unmapped_word` (the old row's "else none, noted") reads absent, so its `none` becomes an editable map fact with the
     same value. An older document replays unchanged at its own output version. Its `upgrade` to a version with the gate
     re-imposes, at the upgrade's position, each island the upgraded replay no longer raises, by its state: a floating or
     waning island as a declared island — ring, anchor, altitude and kind, an institution island's institution named by its
     `sky` assignment — `held_against_magic` or `held_against_economy`, filled by V05 §4.2's relocation, its households
     listed in the diff and never promised as they stood; a settled island the same, followed by `settleIsland`; a fallen
     island's landfall is ground content the upgraded replay no longer holds, listed in the diff and not re-imposed; a
     removed island nothing. The user may drop any of them there (§7.5's orphaned-lock rule, extended to islands).
     **(e) WITH ITEM 114.** Under the default tables every economy the gate admits (≥ 75) lies above the prosperity ceiling's
     last row (50), so an island town's prosperity ceiling is the top band whole at its creation and at every epoch — it
     never falls below the founding's row — and a prosperity island carries the richest band as today. Where an edited table
     admits a capped town (the gate's `economyMin` below the economy of the `ceiling` table's last row), and for a held
     island in a capped town, the island fills from band `c` down, and an institution island reads its `requirementBand` by
     item 114 (c) 4, its supply by the law.
     **(f) EDGES — outcome; rung of §5.1's ladder where it can fail; test.** A closed gate is an outcome, reported by clause,
     never a failure. (1) The magic priority 0, 50, 74, 75 and 100 against the magic in force none, low and high, and the
     economy 0, 50, 74, 75 and 100 — the minimum, the default and either side of each threshold: open only where magic
     exists, the magic priority is ≥ 75 or the word is high, and the economy is ≥ 75 (T115-1). (2) Both clauses failing: both
     listed (T115-1). (3) A thorp, a village, a town: the rung first (T115-1). (4) A metropolis: as a city (T115-1). (5) The
     village product: never raises by rule; an island carried down from a town continues V05's steps and falls (T115-5). (6)
     The standalone neighbourhood: islands off by its recipe; the gate never runs (T115-1). (7) The undercity and the
     underground: no part — islands never touch them (J-V4.101). (8) Pins and locks: a locked island stands, its fate by (d)
     4; a locked slot is neither opened nor closed (T115-4). (9) A dossier or custom institution whose row or archetype would
     go up under a closed gate: it stands on the ground — the island moves where an institution stands, never whether it
     exists (DR27) (T115-4). (10) A dossier missing a value: the magic word `none`, editable (`value_absent`); `moderate`:
     low; an unknown word: `none`, editable (`unmapped_word`); `magicExists` false: `none` whatever the word; the magic
     priority and the economy 50, editable (`value_absent`); a priority out of range clamped (`value_clamped`); a dossier at
     `priorityMagic` 100 and economy 90 without `magicLevel`: closed on the magic clause, source `map`, opened by
     `button.magicHigh` ((a) 1) (T115-2). (11) A slider or word change after creation: (d) 3 (T115-3). (12) An epoch's rising
     under an open or a closed gate; a standing island and an access under a magic change (T115-3). (13) The replay and a
     refounding (T115-5). (14) An integer count or a forced slot under a closed gate (T115-6). (15) A declaration with the
     setting off, under a parity preset, or under each failed clause (T115-4). (16) An older document with islands:
     re-imposed on upgrade — §7.5's mapping, tier 5, substitution (T115-7). (17) The view toggle: T15-1's clause. (18) A
     declared island no site can hold: V05's F-SKY ladders, unchanged (T115-4). (19) An edited or pinned `gate` at its
     limits: (b) (T115-10).
     **(g) BARS (§13.2).** Every island bar runs with high magic by the slider — magic in the world and the magic priority
     100, whose word is `high` — an economy ≥ 75 and `wealthLevel` set explicitly at its old level: T10-1 at economy 100 and
     `wealthLevel` 0.5; T15-1 and T-V5-2 at economy 100 with `wealthLevel` 0.5 and 1; V05's P0 run and every island fixture
     (T-V5-15's goldens, T-V5-18's budgets), V06's T-V6-66 and V12's M6-sky seeds likewise; T13-1 is unchanged. (T115-1) The
     truth table: 200 CITY and 100 METROPOLIS seeds per cell, the setting on, of the magic priority {0, 50, 74, 75, 100} ×
     the magic in force {none, low, high} at economy 100, and of the economy {0, 50, 74, 75, 100} × the magic priority {50,
     100} with the magic in force `low`: islands only where the magic in force is not `none`, the magic priority is ≥ 75 or
     the word is `high`, and the economy is ≥ 75; every other cell 0 islands with one `islands_gated` entry listing every
     failing clause in order; TOWN, the village rungs and a standalone neighbourhood none whatever their magic and economy;
     the parity presets none; in the open cells T15-1's count law. (T115-2) The dossier (V12's derived fixtures): a `medium`
     city at `priorityMagic` 50 and economy 90 has 0 islands, its Islands control disabled with `refuse.islandsDossier.magic`
     and nothing requested in its report — with the setting on through a user's preset, `islands_gated` naming the magic; a
     `medium` city at `priorityMagic` 80 and economy 90 follows the supply law (the slider alone opens the magic clause);
     `high` at `priorityMagic` 50 and economy 90 follows the supply law (the word alone opens it); `high` at economy 50 is
     disabled with `refuse.islandsDossier.economy`; a city whose `magicExists` is false at `priorityMagic` 100 and economy 90
     has none, and a declared island there is refused with `refuse.islandsNoMagic`; a dossier without `magicLevel` reads
     `none`, editable, noted `value_absent`, and at `priorityMagic` 100 and economy 90 it has 0 islands, its magic clause
     failing with source `map`, until one click on `button.magicHigh` opens it; without `priorityMagic` reads 50, noted
     `value_absent`; `priorityMagic` 140 reads 100, noted `value_clamped`; `moderate` reads low; the 32 births at the default
     sliders carry no island, and each of the three sample cards meets the gate at the values its dossier carries (not
     recorded by the survey). (T115-3) Epochs: 200 standalone start-small towns grown past 10 000 raise islands only with the
     gate open (high magic by the slider, economy 80) and none with either clause failing; a standing island keeps its state
     through a magic change from high to low and wanes over its dwells under `none`, never in one epoch; a settled island
     refloats only through an open gate; a generated bridge of light under a slice's `low` converts and a placed one holds; a
     same-id re-offer that changes `magicLevel`, `magicExists` or `priorityMagic` moves no island and reports
     `frozen_fact_changed`. (T115-4) The author: a T5 `sky` declaration with the setting off, under `MFCG`, and under each
     failing clause stands with its fate (magic, economy, supply) and holds through Regenerate and epochs; a `sky` assignment
     in the creation prefix the same; a locked generated island stands through an Economy lowered below 75 with
     `held_against_economy`; under a dossier-stated `none` a declaration is refused `dossier-owned`; at TOWN
     `refuse.islandsRung`; each undo restores the digest. (T115-5) The replay: a city-to-village history (item 113 (a) 1's
     blueprint history, or V12's derived fixture `'<dossier>@economy90@magic100'`) with the gate open at its peak carries
     islands at its CITY epochs that wane, settle and fall over their dwells, leaving landfalls in the present village; with
     the gate closed none; a refounded fixture's old islands fall at the destruction; byte-stable per seed and history.
     (T115-6) Under a closed gate an integer `islands.count` opens no slot; each failing clause shows its message and only
     its own button; one click on each of `button.magicHigh` and `button.economyHigh` opens the gate — from a world without
     magic, `button.magicHigh` turns magic on and sets the Magic to `gate.magicMin` in one undo step — and the ghost shows
     the supply law's islands. (T115-7) An older document with islands replays unchanged at its own version; its upgrade
     re-imposes every island the gate no longer raises by its state, listed in the diff; dropping one there removes it; the
     upgrade's undo restores the digest; an older dossier document whose dossier lacked `magicLevel` has, after the upgrade,
     an editable `none` and a magic priority 50. (T115-8) Every CITY the gate admits has its prosperity ceiling at the top
     band whole at creation and at every epoch of a 20-epoch history. (T115-9) The clerk: "floating islands" on a low-magic
     town ends in `info.islandsGated` with its buttons; "an opulent city of high magic with floating islands" sets the
     economy 90, the magic priority 90 with magic in the world (its word `high`) and the setting on, and islands are
     possible. (T115-10) Each `gate` cell at its limits of (b) is refused or clamped with its reason row; an empty
     `gate.magic` leaves the slider's reading alone, reported, and `gate.magic` naming `none` is refused; with
     `gate.magicMin` and `gate.economyMin` edited to 80, one click on `button.magicHigh` and one on `button.economyHigh` open
     the gate, and the messages name 80.
     **(h) THE UNITS — applied IN the coherence pass's Rewrite phase with items 114 and 116 (owner, 2026-09-30 ~00:56:
     "bundle these into the rewrite phase"; ~01:10: "bundle all this with g114-115"): the units whose rewrite had landed when
     this item was filed — the base parts model, kernel, pipeline, determinism and rendering, and the volumes V03 and V04 —
     in a late rewrite seat where they have a part; every other unit in its main rewrite. One canonical home per shared
     decision (STATES); every other unit cites it (REFERENCES); the three items' one routing is
     docs/validation/coherence/work/g114-116/routing.json with the canon's ruling of 2026-09-30.** *Base — model (§2), late
     seat:* STATES §2.8's dossier-paths list gaining the settlement's magic priority at creation (beside item 114's economy
     priority) and "the creation slice's magic word where the dossier supplied it" beside the typed slices, and §2.9's note
     that `recipe.layers.islands` is `Recipe.params['layers.islands']`; `SkyIsland` unchanged; REFERENCES II.6, V05. *Base —
     kernel (§3):* no part. *Base — pipeline, late seat:* STATES II.6's gate — (c)'s four clauses in order, the parity clause
     dropped, the closed gate as an outcome, the forced slots, the count after the gate, citing V05 §2.4 for the cells — II.6
     (6)'s what rises and what stands, the wane under magic `none` in force, the access conversion and the destruction fall;
     S7b (5)'s wording (forced slots at every admitting rung, rule-driven slots through the gate); §4.11's islands at an
     epoch (a raise and a settled refloat read the gate; no draw under a closed gate); REFERENCES V05 §3.2 (1) for `skyGate`.
     *Base — determinism, late seat:* STATES §7.7 layer 1's `Intent.magicPriority?` and the standalone magic word's
     derivation row ((a) 2), DR27 (inputs gaining `settlement.magicPriority` and `settlement.economyPriority` beside
     `site.magic`; bar: the gate's clauses resolved and traced to those fields or to their map defaults), §7.7 item 1's list
     (with item 114 (g)), item 9's list gaining the magic priority and the creation slice's magic word, item 11 (the
     setting's refusal withdrawn; an adjust of a dossier-supplied magic priority or word refused; a declared island in a
     dossier-stated magic-less world refused `dossier-owned`), layer 2's "the recipe's feature set holds `layers.islands`"
     becoming `Recipe.params['layers.islands']`, §7.1's T1 binding row gaining "the magic priority and the creation slice's
     magic (the Magic control)", §7.4's `regenerate / adjust / re-derive from Sk` row naming the Magic (from S2) and the
     `quarter` row's held fates, §7.5's upgrade rule (d) 9, the magic priority absent 50 and the optional `site.magic`,
     §7.8's two Magic rows and the Islands control's states, §5.3's sky row gaining "no island raised or refloated by rule
     under a closed gate; under magic `none` in force every unheld island's target 0", §5.4's `ReportCode` `islands_gated`
     with its row (class cell "the island gate closed — an outcome, never a failure"; landing `requestedVsBuilt`); §6.2's
     recorded inputs gain the recipe's magic priority, beside item 114's economy priority. *Base — rendering:* no part
     (§8.4's view toggle unchanged). *Base — scope, main rewrite:* STATES §13.2's T115-1 – T115-10 and the island bars'
     fixture rule (g); §14's `settlement.magicPriority?` and `site.magic?`; D-3's sentence ("floating islands … only at CITY
     and METROPOLIS; at the first generation — and, by the program's reading of item 115, at every later rising — only with
     high magic (the magic slider at 75 or more, or the world's magic `high`, never in a world without magic) and an economy
     of 75 or more; and only where prosperity supplies them"); §1.2's default (the Magic at 50, no magic in the world);
     §0.2's row 115 (principal home II.6); the judgment index's J-A115.41 – J-A115.46 and J-A115.71 – J-A115.75 (titles in
     the canon's ruling of 2026-09-30); §16's placement (the gate and the Magic control at M6-sky, the port's reading at
     M-SF). *V01, V02, V03, V04:* no part (a hood holds islands off). *V05 (the principal build home):* STATES `skyGate` at
     depth (the record, the function, its callers, the report entry's args), §0's plain words (only a city whose magic is
     high — its Magic at 75 or more, or its world's magic high — and whose economy is strong gets a roll at all), the §1b
     wiring row, `IslandRule.gate` and its defaults (`['high']`, `magicMin` 75, `economyMin` 75) in §2.4 with §2.6's
     lifecycle row, §3.2 (1)'s parity clause dropped and (3), (4) and (5) (the forced slots; the gate before the count; the
     sentence split by cause), §3.15 (4) and (5), the wane under magic `none` in force and the access conversion, each built
     as II.6 states them, §4.2's declaring rule, citing §7.4's fates, §4.4's coherence restated (the absorb wane withdrawn),
     citing DR27's inputs, §4.5's why naming the clauses, J-V5.10 and J-V5.19 restated, §7's T-V5-1 extended with the truth
     table and the fixture rule, and §8's P0 run with the gate held; REFERENCES II.6 (the rules), DR27 (its inputs), §7.4
     (the held fates), §7.1's T1 row (the Magic, which V05 §4.1's T1 row cites) and item 114 (e); item 116's island parts
     (the landfall credit, the island buildings on the material supply) sit beside these in V05 and leave the gate unchanged.
     *V06:* STATES that `sky.islands`' raise and a settled refloat read the gate, `EpochReport.islandsGated`, the replay's
     islands, the start-small crossing, that the time card is unchanged (`trajectory.slice.magic` is how a standalone history
     changes magic), and its bars; REFERENCES II.6, V05. *V07:* STATES §1's out-of-scope sentence rewritten — the village
     never raises an island by rule, and an island carried down from a town continues V05's steps and falls — resolving its
     contradiction with §3.12 and V06 §3.2. *V08:* STATES the adapter row `config.priorityMagic` → `settlement.magicPriority`
     (range, clamp, absent) beside item 114's, the `magic` row (moderate → low; `magicExists` false → none; an absent or
     unmapped word carries no `site.magic`), the carried settlement fact's `magicPriority?` under the settlement diff row and
     the carried site fact's `magic?` under W-DOS-08's `site` row (a later value: one `frozen_fact_changed` note), T-V8-20's
     ignore clause reading `priorityMagic` and `magicExists`, the census effect ((c)'s last sentence), DR27's inputs, the
     host frame's locked Magic; REFERENCES T115-2. *V09:* STATES the Magic control — the slider and its switch "No magic in
     this world", in the "Programme" group —, the Islands control's states and rows (`info.islandsGated`,
     `refuse.islandsDossier.magic`, `.economy` and `.both`, `refuse.islandsNoMagic`, `info.islandsNone`,
     `report.islands.gated`, `report.islands.clause`), the buttons `button.magicHigh`, `button.economyHigh` and
     `button.drawIsland` with their event forms, `fate.held.magic` and `fate.held.economy`, and its bars. *V10:* STATES
     `IntendInput.islands?: 'off'|'on'` (edit mode `adjust('layers.islands')`; creation mode the new document's
     `Recipe.params['layers.islands']` beside its blueprint), the lexicon row "floating islands, sky islands, flying islands
     → `islands: on`" (the words set the switch alone; the gate's message says what is missing), `IntendInput.magicPriority?:
     number` (0–100) with the magic row "magic, wizards, fantasy · high magic" taking `magic` `low` · `high` and
     `magicPriority` 50 · 90, §4.1's T1 encoder writing both to the Magic control (creation mode the new document's
     `intent.magicPriority` and creation slice; edit mode the control's two adjusts in one `group`), and the island's why
     naming the clauses. *V11:* STATES row 56's `gate` cells in `islands.json` (`gate.magic`, `magicMin` and `economyMin`
     own, not calibratable, unstamped) with their compiler bars, and that §3.5's `magicGate` for classes stays `≠ 'none'` — a
     separate gate from the islands'. *V12:* STATES §1's owner-rule list entry, `Level.intent.magicPriority?` and
     `Level.magic`, the derived fixture forms `'<dossier>@magic<m>'` (the magic slider, 0–100) and
     `'<dossier>@magicLevel<word>'` (the word), chained after `'@pop×k'` and item 114's `'@economy<e>'` in the order
     `@economy`, `@magic`, `@magicLevel` — the fixture for high magic sets `priorityMagic` 100, and, separately, the word
     `high` —, the register's entries, and M6-sky's panel seeds generated with the gate held. *Scope:* BASE for (a)–(c) and
     (e)–(g); STAGED with the sky layer (V05) and evolution (V06) for their parts of (d).

116. **OWNER RULE — Building materials come from terrain, resources and trade, paired with prosperity; a material that is not
     native exists only by trade with a named settlement that has it (owner, 2026-09-30 ~01:08; refined ~01:10; filed under
     J122 and J128).** Owner (~01:08): "oh and material for buildings is determined by terrain, resoucres, and trade. paired
     with prosperity. Think about it. if you are in a river nearby a forrest for timber but no quarry, then most building
     material is going to be wood based. That is not to say that they can't have stone buildings, that would come from trade
     and be reserved for teh very rich as they are exotic and expensive to transport. Pairing all of this with neighborhood
     prosperity, if a town has both a quarry and timber, the richer areas will have buidlings mostly made out of the more
     expensive material stone, the middling areas will have buildings mixed btween wood and stone or individual buildings
     that is a combination of the two. Expand this to all relevant pieces. What do you think?" / (~01:10) "also to say that
     material not native requires trade which means isoalted settlements cant have non nattive materials or grow to have them
     until and unless they trade specifcially with another settlement that has that material." / (~01:10) "bundle all this
     with g114-115" / (~01:35, on which partners count, after the program's recommendation — every neighbour SettlementForge
     names counts, supplying the materials its named exports, goods or resources show; a settlement with no named neighbour
     is native-only whatever its access; one port-side partner record, because SettlementForge is reworking trade) "note that
     we are reworking trade as we speak. but for now its your recomendation". The messages are filed in
     docs/OWNER-INSTRUCTIONS-2026-09-25.md. **What exists (CONFIRMED by reading the coherence pass's base files and the
     volumes):** a material is a rendering attribute only (§2.6; item 19; the owner, 2026-09-26: "different materials for
     construction is only represented by a change in texture or color. It has nothing to do with the shape"); `MaterialRow`'s
     default rows reproduce FTG's model — item 19's "DEFAULT: that FTG model" (J28's application of the owner's "emulation
     first", item 23): one share mix per growth stage, overridden by district kind and by class (churches stone by row), with
     wealth shown by the lifestyle pools and the roof-colour role by band, which §2.6 restates as "never by a material keyed
     to the prosperity band", and an optional regional shift off by default; `Building.material` is one `{ walls; roof }`
     pair and `RoofSpec.material` a field no rule writes; nothing reads terrain, resources or trade for a material;
     `TradePartner` carries no goods, the dossier's trade links are read only as a count, and the supply web serves every
     material good by a generic `import`; retaining walls, raised ways and bridges key their material by band or era; the
     salvage ledger is keyed by a free string and is "never a hard constraint"; the quarry voids are sized by all the stone
     the town is built of; three thresholds say "there is stone or clay here" (V04 0.5, V07 0.4, V11 none); V07 cites a
     "geology row" no table holds; the material id `timber` names sawn boards beside a good and a resource of the same word.
     Program's interpretation (vetoable; J122; the working notes are docs/validation/coherence/work/g116/):

     **(a) THE WORDS, THE VOCABULARY AND THE RECORDS.** A settlement's **material supply** states, for each material
     **family**, whether it is **native** — the owner's word; what counts as the settlement's own is the program's reading
     (vetoable): by **land** (a source in the arena the settlement was created in, or a dossier fact that the settlement
     works it, (b)) or by **ruins** (the salvage ledger's unspent stock near the building site, (b)) — **traded** (only
     through a named partner that supplies it, (c)) or **unavailable**. The owner's isolated settlements ("isoalted
     settlements") are, in the design, **native-only** settlements: ones no partner supplies. *Why a new word:* V07's road
     form `isolated` and SettlementForge's access key `isolated` both name a road or access form, which says nothing about
     partners; they keep their meanings, and neither alone makes a settlement native-only or not. A **family**
     (`MaterialFamily`) is what the land yields or a partner ships; a **material** is a built id with its texture and colour
     roles (§8.2); SettlementForge's `materialFamily` names a material in its own words, which V08's `materials` row maps to
     our material id and so to its family. A builder's **means** is the cost level it can pay ((f)); the **top means**
     (derived, never a cell) is the means at the top of item 114's highest allowed band; a **work's means** is a public or
     lordly work's. A built material's **origin** records where it came from; a **mixed** building has two wall materials
     ((h)). **The owner's wealth words** (vetoable; FTG's lifestyle tiers read on our six bands, item 27): "the very rich" is
     the `rich` band, "the richer areas" are `prosperous` and `rich`, "the middling areas" `modest` and `comfortable`, the
     poorer `squalid` and `poor`; the bars of (q) are written in these words. **The records** (§2.6 states the types; V11 the
     rows; every number below is a default V11 states and V12 calibrates):

     ```ts
     type MaterialFamily = 'stone'|'slate'|'fired_clay'|'timber'|'earth'|'thatch'|'lead';
     type MaterialMass = 'masonry'|'timber'|'earth';
     type MaterialSlot = 'walls'|'roof'|'enceinte'|'gate'|'bridge'|'harbour'|'raised'|'retaining'|'lining'|'paving'|'host';
     interface MaterialDef { id: string; requires: MaterialFamily[] /* every one available */; nativeOnly: boolean /* never drawn from a partner */;
       slots: MaterialSlot[]; covers?: { kinds: RoofSpec['kind'][]; minPitch?: number; maxPitch?: number } /* a covering: the roof forms that admit it */;
       mass?: MaterialMass; baseCost: number /* cost units */;
       factors: { climate?: Record<string, number>; culture?: Record<string, number>; era?: Record<string, number>; region?: Record<string, number> } /* the one home of every per-row cost factor; 0: not built there */;
       flammability: number /* V06's fire scale */; floodCollapse: boolean /* V06's flood */ }
     interface MaterialPreference { key: { structure?: string; cls?: string; districtKind?: string } /* no field: the default row */; slot: MaterialSlot;
       admits: { id: string; weight: number /* shares a tie place */ }[]; fallback?: string[] /* join only when no admitted candidate is native or affordable */;
       prestige?: number /* an institution's multiplier on its plot's means, (f) */ }
     interface MaterialMixRow { lower: MaterialMass; upper: MaterialMass; parts: { upper?: number; gable?: number; outshots?: number } }
     interface MaterialRow { key: { era: string; stage?: number; districtKind?: string; cls?: string }; walls: string; roof: string; weight: number }   // the parity rows only, (n): `band` and `extension` removed
     ```

     The materials (V11 writes the full rows; ids are texture and colour roles, §8.2; base cost in cost units):

     | id | requires | slots | mass | base cost | beyond the base cost (defaults) |
     |---|---|---|---|---|---|
     | `ashlar` | stone | walls, enceinte, gate, bridge, harbour, raised, retaining, lining, paving (`paved`) | masonry | 5.0 | — |
     | `rubble` | stone | walls, enceinte, gate, bridge, harbour, raised, retaining, lining, paving (`cobble`) | masonry | 3.0 | — |
     | `dry_stone` (dry-laid or clay-bonded fieldstone) | stone, native only | walls, retaining, enceinte (village) | masonry | 1.3 | no carriage; × `groundFactor` off stony ground ((e)) |
     | `brick` | fired clay | walls, enceinte, gate, bridge, harbour, raised, retaining, lining, paving (`brick`) | masonry | 3.5 | era c12 × 1.4, c13 × 1.2, c15 × 0.9; × `kilnFuelFactor` where kiln fuel is not native |
     | `timber_frame` | timber | walls | timber | 2.0 | — |
     | `log` | timber, native only | walls | timber | 1.8 | climate cold × 0.9, temperate-coniferous × 1.0, mixed × 1.3, else 0 |
     | `boards` (sawn boards; the id `timber` renamed) | timber | walls (shacks, sheds, deck buildings), gate (village), bridge, harbour (piers), raised (never an aqueduct), lining (shoring), paving (`planks`), an enceinte's crest | timber | 1.5 | — |
     | `timber_crib` | timber, native only | retaining (steps ≤ 150 cm), harbour | timber | 1.5 | — |
     | `wattle_daub` | timber and earth, native only | walls | timber | 1.2 | — |
     | `cob` | earth, native only | walls | earth | 1.0 | arid 0; the earth-wall admission ((g)) |
     | `adobe` (new; sun-dried earth brick) | earth, native only | walls | earth | 1.0 | arid only; the earth-wall admission |
     | `earth_bank` | earth, native only | retaining (steps ≤ 150 cm), enceinte (a rampart), harbour (sheltered water, (i)), host (unlined) | earth | 0.8 | — |
     | `turf` | earth, native only | roof: pitched, pitch 0.3–0.8 | — | 0.8 | arid 0 |
     | `mud` (new; the flat earthen roof) | earth, native only | roof: flat | — | 0.8 | arid only |
     | `thatch` (reed or straw) | thatch | roof: pitched, pitch ≥ 0.8 | — | 1.0 | × `walledThatch` inside an enceinte at CITY and METROPOLIS from `c13` |
     | `shingle` | timber | roof: pitched ≥ 0.5 | — | 2.0 | — |
     | `clay_tile` | fired clay | roof: pitched ≥ 0.3, dome | — | 3.0 | era and kiln fuel as `brick` |
     | `stone_slate` (new; fissile flags) | stone, native only, where `Terrain.fissile` is `flag` | roof: pitched ≥ 0.5, flat | — | 3.5 | — |
     | `slate` | slate | roof: pitched ≥ 0.4 | — | 4.0 | — |
     | `lead` | lead | roof: every kind but `tent` | — | 8.0 | — |
     | `canvas` | nothing (carried) | a `tent`'s walls and roof, no pick | — | 0.5 | — |
     | `rock` (new) | nothing | host (rock-cut) | masonry | — | never picked |

     "Pitched" is `gable`, `hip`, `shed`, `pyramid` and `cone`; `skeleton` and `plain` read as the kind they downgrade from;
     `none` takes no covering. A material marked native only is never drawn from a partner — fieldstone, logs, wattle rods,
     cribs and earth were not worth carrying — so it is a candidate only where its families are native (fieldstone by land or
     by ruins). Flammability (V06's scale): thatch 1.0; shingle, boards, timber frame, wattle and daub, log, canvas 0.9; clay
     tile 0.45; turf 0.3; cob, adobe, mud 0.2; every other masonry, slate, stone slate and lead 0.15; flood collapse on
     timber and earth masses. **The cells** (V11 row 49's `settings`, `own`, calibratable; paths pinned):
     `materials.supply.enabled`; `materials.pick.{blend 0.2, mix 0.5, tieBand 0.05}`; `materials.means.{bands, rungMeans,
     works}`; `materials.cost.{importPremium 1.5, routeRate {sea 0.15, river 0.45, road 1.5}, refLegM 30 000, distClamp [0.5,
     3], riverJoinM 500, salvageFactor 0.8, groundFactor 1.5, stonyReachM 2 000, kilnFuelFactor 2.0, timberScarcityMax 3,
     walledThatch {CITY 1.5, METROPOLIS 2.0, from c13}}`; `materials.native.{stone {threshold 0.5}, timber {threshold 0.4,
     areaHa 20}, clay {threshold 0.4}, straw {threshold 0.4, areaHa 10}, pebbleReachM 3 000}`; `materials.ruinsReachM` 1 500.
     **The tables:** V11 row 49 `materials` (`materials.json`) holds `defs` (`MaterialDef`), `preferences`
     (`MaterialPreference`), `mixes` (`MaterialMixRow`), `parity` (`MaterialRow`) and its named row `settings`; its readers
     are S1, S2, S3, S4, S5a, S5b, S7, S7b, S10, S10a, S11, S12a, `EVO_PRELUDE`, `EVO_SITING`, `EVO_GROWTH`, `EVO_WORKS`,
     `EVO_HAZARD`, U-NET, U-SYS, U-FORECAST and VS1–VS6. The climate, culture and era tables hold no material cell.

     **(b) NATIVE — THE LAND, THE DOSSIER, THE RUINS.** (1) *By land — one test per family, over the creation arena.* A
     family is native by land when its source lies anywhere in the arena the settlement was created in — the frame and its
     margin at creation (§3.2 (9)), the scope S1's mining test already reads — or when a dossier fact makes it so ((2)). *Why
     the arena, not a radius:* the supply must be known before S2 and S3 site anything, and a radius about the frame's origin
     misses the town where the centre lies off it (up to 2.9 km at a METROPOLIS); the arena is the land the settlement's
     rasters describe, and what lies farther within it shows in the price ((e)). Frame growth at an epoch never adds a native
     family. The tests (thresholds are V11's cells, read by every reader — V04's quarry cells, V07's village gates and V11's
     `requires` rows included):

     | family | native by land when | the dossier deposits (V08's `supplies` column) | the standalone toggle that clamps it |
     |---|---|---|---|
     | stone | a cell with `SiteResources.stone` ≥ 0.5 | `stone_quarry` | `quarries` |
     | timber | cells with `timber` ≥ 0.4 over ≥ 20 ha of ground no epoch has built on or converted, plus the standing `coppice`, `wildwood` and `lumber` land uses and `wood` and `coppice` greenery (at generation, the raster alone — so nothing flips at the first epoch) | `managed_forest`, `mountain_timber`, `shipbuilding_timber` (`ancient_grove` is a reserve, never felled) | `logging`; the `forests` feature |
     | fired clay | a cell with `clay` ≥ 0.4, and kiln fuel native: timber native, a `marsh` in the arena (peat) or a listed `coal_deposits`; clay with no native fuel is native at `kilnFuelFactor` on `brick` and `clay_tile` ((e); baked brick was dear in fuel-poor clay country) | `river_clay` (`glass_sand` supplies none) | — |
     | thatch | reed: a `marsh` land use or bank kind in the arena; straw: `fertile` ≥ 0.4 over ≥ 10 ha of unbuilt ground | `marshlands` | `fertileLand` (straw only) |
     | slate | `Terrain.fissile` is `slate` | none (the relief draw decides on a dossier map too) | the site request's `fissile` |
     | lead | `Terrain.lead` | `precious_metals` | the site request's `lead` |
     | earth | always — every settlement can dig its own ground (the floor) | — | — |

     (2) *The dossier's facts win over the raster;* S1 raises the raster's floor for a family they make native, as a
     landscape toggle does, so a source cell exists. **Deposits:** a listed deposit `available`, or `discovered` from the
     next epoch, makes its family native. A `depleted` deposit: at generation — which stands for the settlement's past, as
     V04 §3.5.3 and item 113 read it — its family is native for every build generation makes (V04 lays its workings worked
     out; DR32's quarry ossuary has its quarry); from the first live epoch a point family (stone, fired clay, lead) whose
     listed deposits are all `depleted` or `removed` is not native by land whatever the raster, while an area family's
     depleted deposit (a timber key, `marshlands`) works out only its own land use and the family reads its standing test. A
     `removed` deposit is no evidence of past working (V08 reads a remove): it grants nothing at any time and, for a point
     family, denies the land basis as a depleted one does. A family the dossier lists no deposit for reads the raster, as
     standalone — also the rule for a dossier that names no resources. **Production records** (item 20 (b), (h): what the
     dossier says the settlement works exists, and the map derives its source): a family is native by land where the dossier
     shows the settlement itself producing it — a dossier-backed institution bound to an extraction or first-working class
     (`quarry` → stone; `lumber_camp`, `sawmill` → timber; `claypit`, `brickworks` → fired clay, its fuel included;
     `thatcher` → thatch; `peat_works` → kiln fuel); an income row `Stone Quarrying` → stone or `Timber Trade` → timber,
     unless the settlement is an `entrepot`; an active chain of its own whose resource key maps to a family; or its own
     `economy.exports` resolving through V11's `goodWords` to a good of a family, unless `entrepot`. *Why these:* those
     crafts stood at their source — the kiln at the clay pit, the saw pit by the woods, the thatcher by the reed bed — while
     a mason's or a timber yard works what arrives; a current production fact outranks a depleted deposit of its family.
     **Slate and lead:** S0's site request gains `fissile` (`'auto'|'none'|'slate'|'flag'`) and `lead` (`'auto'|'on'|'off'`),
     default `auto`, resolved by S1 (10) beside the geology flag on two uniforms appended to `blueprint.features` after the
     sewer draw (fissile, then lead), each drawn whether or not its toggle is set and recorded in `autoResolved`: by relief
     plain · rolling · hilly · mountainous, P(slate) 0 · 0.05 · 0.25 · 0.4 and P(flag) 0.05 · 0.2 · 0.25 · 0.15 (`slate`
     below P(slate), `flag` at or above 1 − P(flag), else `none`); P(lead) 0.3 where `Terrain.mining` holds, else 0; stored
     as `Terrain.fissile` and `Terrain.lead` beside `Terrain.mining` (§2.3 declares all three), editable on the terrain row
     as `geology` is; a listed `precious_metals` sets lead `on` while available; a sky island's terrain takes `none` and
     false. *Why:* slates and stone flags come from particular beds, not from relief alone; the geology flag is the precedent
     (an appended draw moves no other draw). (3) *By ruins — native at a site.* A family is native by ruins at a building
     site while the ledger's unspent credit of that family from sources within `materials.ruinsReachM` (1 500 m) of the site
     covers the pick's debit (the class row's `salvageM3` for that material). *Why:* the owner's "what used to be old houses
     has been repurposed for building material" (item 8) and item 113 (b)'s refounding that "quarries the ruins for stone":
     robbed stone lies on the settlement's own ground and needs no partner; it is finite and local, and it was carted a few
     kilometres, so the licence reads its own reach while the base's haul radius keeps its clearance-weighting role (§4.11).
     The ledger is keyed by family and each credit carries its position, `at` (the robbed entity's centroid; a landfall's,
     its `fallen_island` decoration's face centroid). **At generation** each surface ruin in the arena — V04's ancient ruin,
     a hinterland `ruin` decoration — credits the ledger once, `from` the ruin at epoch 0, with its robbable masonry: its
     footprint × V11 §3.18's yield × the share its survival rule has already lost (the spolia case: a stoneless town beside
     an older people's ruin builds of it near the ruin while its stock lasts). (4) *What never licenses:* no rung,
     population, prosperity, era, epoch count, growth, frame growth or access key makes a family native or traded — only the
     land, a dossier fact, the ruins or a partner.

     **(c) TRADED — ONLY BY A NAMED PARTNER THAT HAS IT.** One record carries trade into the rule, the one the port and the
     blueprint already fill (§7.7 layer 2):

     ```ts
     interface TradePartner { key: string; name?: string /* item 116: the display name — DR3 from economy.partners[].name; the Trade control standalone */;
       mode: 'road'|'river'|'sea' /* the route, (e) prices it */; weight: number /* Σ = 1 over the partners TradeFlow reads; 0 hostile; 0 for a declared partner */;
       bearingCdeg: Cdeg; relationship?: string; source: 'dossier'|'derived'|'realm'|'declared' /* item 116: a standalone partner the author declared (V09) */;
       supplies: { family: MaterialFamily; from: 'exports'|'resources'|'link'|'declared' }[] /* item 116: the families it has; [] for every derived partner */;
       distanceM?: number /* the realm block's distance, when the host sends one */ }
     ```

     **The licence:** a family is traded when a partner lists it in `supplies` and is either `declared` or of weight above 0;
     a hostile partner, or one under a suppressed economy, licenses nothing — the program's one narrowing of the decision the
     owner adopted ("every neighbour SettlementForge names counts"; vetoable; SettlementForge itself makes no trade link with
     a hostile or suppressed neighbour, J121). **From a dossier** (the owner's decision of ~01:35, adopting the program's
     recommendation, docs/validation/coherence/work/g116/read-owner-decision.md; DR3 amended; V08 writes its rows) every
     neighbour SettlementForge names counts: the generation neighbour (`neighborRelationship`), whose `primaryExports`
     resolve through V11's `goodWords` to goods whose `family` names a family (`from: 'exports'`) and whose
     `activeChains[].resourceKey` resolve through V08's `deposits` row's `supplies` column (`from: 'resources'`); the partner
     an `import` trade link names, its `good` label through `goodWords` (`from: 'link'`; the link's `goodId` stays unread, no
     goods-id row existing; an export link licenses nothing); a `neighbourNetwork` link's partner, which supplies what that
     partner's other records show, else nothing (V08's note `partner_no_supplies`). `DossierDigest.economy.partners[]` gains
     `exports?: string[]` (our good ids), `resources?: string[]` (deposit keys) and `access?: string` (the neighbour's access
     key, a word of V08 §2.6's `access` row, typed as §14 types `site.access`; an unknown word reads `road`, noted
     `unmapped_word`); the closed-digest rule admits exactly these three through V08 §2.4's field-table rows
     (`neighborRelationship.primaryExports`, `.activeChains[].resourceKey`, `.tradeRoute`), and item 86's never-read list is
     unchanged. **Standalone** (the owner's decision: the recipe's own partner list, native-only by default; its details
     below the program's, vetoable): the recipe's partners are the blueprint's per-bearing partners (`source: 'derived'`,
     supplying nothing), then the partners the author declares in V09's Trade control (`source: 'declared'`: a name, a route
     and the families it supplies). A declared partner is a **material licence only**: `TradeFlow`, S3 (4)'s requested
     bearings and the Σ = 1 normalisation read every partner but the declared ones (weight 0), so a declaration moves no
     gate, road or field; its bearing is a draw on `gate.pick` keyed by its key, read by the endpoint store that faces it
     ((k)). *Why:* the owner's rule is about materials, and a declaration should re-derive only what the material rule reads
     ((l)). **Never:** a `derived` partner, an undeclared partner of weight 0, the label lists (`primaryImports`,
     `necessityImports`, `transit`), `tradeDependencies`, a magical transit path, a `realm` partner beyond the dossier
     partner of its key (the realm block adds a bearing and `distanceM`, never supplies), and the supply web's generic
     `import` ((k)). **The route:** DR3's `mode` fill gains a first step — a partner whose access key the dossier gives takes
     the mode of the pair (this site's harbour and the neighbour's `port` → `sea`; this site's harbour or navigable river and
     the neighbour's `river` or `port` → `river`; else `road`); the rest keep DR3's water-fraction fill. **The adapter** (the
     owner: SettlementForge is "reworking trade as we speak"): DR3's supplies fill is the one reader of SettlementForge's
     trade fields and the material rule reads only `TradePartner`; each SettlementForge line's adapter fills
     `TradePartner.supplies`, and the port's migration and change envelope carry existing maps (J121). **The consequence,
     stated plainly:** SettlementForge names a neighbour with goods rarely (4 trade links in 1 of 155 births), so most
     dossier maps are native-only at creation and gain a traded family only when a partner arrives (receipt F14, at the next
     epoch); a port, river, crossroads or road town with no named partner imports no material. A standalone map — the
     one-click town and every Surprise me map — is native-only until its author declares a partner, so the owner's first
     example (stone brought to a timber town) needs one declared partner; Surprise me declares none, since partners are
     circumstances and §7.7 layer 1 draws intent only (vetoable: Surprise me could declare one named partner).

     **(d) THE SUPPLY — ONE RECORD, DERIVED.**

     ```ts
     type NativeReason = 'raster'|'deposit'|'producer'|'income'|'chain'|'export'|'toggle'|'terrain_flag'|'standing'|'floor';   // §2.7 beside MaterialSupply; never a §5.4 code
     interface MaterialSupply {   // §2.7; Document.derived.materialSupply: derived, never canonical, outside every digest
       epoch: number;
       families: Record<MaterialFamily, {
         status: 'native'|'traded'|'unavailable' /* town-wide: native by land, else traded, else unavailable; the ruins basis is per site, (b) (3) */;
         land?: { reasons: NativeReason[]; carriage?: number /* (e)'s land carriage, written at S3's commit */; kilnFuel?: boolean /* fired clay */; scarcity?: number /* timber */ };
         partners: { key: string; route: 'road'|'river'|'sea'; carriage: number }[] /* every licensing partner, cheapest first */;
         ruinsM3: number /* the ledger's unspent stock of the family, town-wide */ }> }
     ```

     **Producer:** a new step **S1 (11)** — after the resources and the terrain flags, before S2 — writes each family's
     status, reasons and partners; S3's commit writes the land carriage (S2 reads only `status`, and every cost reader runs
     after S3); §4.11's epoch prelude (V06 §3.2 row 1) re-derives it after the epoch's slice, deposit states and `TradeFlow`
     apply and after item 114 (e)'s prosperity ceiling position, before S2's delta demand and any build (§4.11's one prelude
     order, item 114 (e)); load recomputes it, as it does `TradeFlow`. **Consumers:** S2 (producer demand, the web's material
     goods, (k)); S3 and S5a (an enceinte's pick where its trace is fixed); S4's and S5b's router (bridge feasibility); S7
     (towers, gates, the castle curtain, bridges, harbour works); S10's levelling (retaining walls); S10a (way surfaces); S11
     (buildings); §4.9 (land uses on native sources, the timber shortfall); §4.11 (builds, rebuilds, refurbishments, fire
     rebuilds, the ruins stock); II.7.2 (linings); II.7.6 and U-FORECAST (quarry voids and their forecast); the raised-way
     support step; V05, V07, V09's view and panels, V10's why, V12's measures and §11.1's exports; the stage registrations
     (§4.1, §4.12) declare `materialSupply` as S1's output and these stages' input. **Slices:** each family entry is a
     derivation slice — `SliceRef.kind: 'supply'`, `table: 'derived.materialSupply'`, key the family, the hash over its entry
     (§2.8) — so an `Adjust` of the creation slice's trade, of the switch ((n)), or of the terrain's resources, flags or
     deposits at creation re-derives exactly the entities whose picks cited a changed family (§7.6's slice rule, §7.3's
     locality). An epoch never invalidates by a supply slice: standing fabric keeps its material ((j) (1)).

     **(e) COST — THE MATERIAL, THEN ITS CARRIAGE, PAID PER LOAD.** A candidate material m's cost for a pick at a site:
     native by land, `c(m) = baseCost(m) × F(m) + Σ_{f ∈ requires(m), f ≠ earth} carriage(f)` with `carriage(f) = refCost(f)
     × routeRate[r] × bulk(f) × d ÷ refLegM`, d the principal centre's distance to the nearest source cell of f and r `river`
     where that cell and the centre lie within `riverJoinM` of one navigable river, else `road`; native by ruins, `c(m) =
     baseCost(m) × F(m) × salvageFactor` (0.8: reused stone is cheaper than quarried); traded, `c(m) = importPremium ×
     (baseCost(m) × F(m) + Σ_f refCost(f) × routeRate[route] × bulk(f) × dist)` with `dist = clamp(distanceM ÷ refLegM, 0.5,
     3)`, 1 when the distance is unknown; the cheapest basis available at the site wins. `refCost(f)` is the family's
     reference material's base cost (stone `rubble`, fired clay `brick`, timber `timber_frame`, slate `slate`, thatch
     `thatch`, lead `lead`); `bulk(f)` its good's `ResourceRow.bulk` (stone, fired clay, timber, slate 3; thatch, lead 2);
     earth pays no carriage and is never traded. `F(m)` is the product of `MaterialDef.factors` (climate, culture, era and
     region rows; the culture row keyed by `site.culture`, our own rows, clean-room) and the site factors: `dry_stone` pays
     no carriage (fieldstone lies at hand) and takes `groundFactor` (1.5) off **stony ground** — ground where no cell within
     `stonyReachM` of the principal centre has clay ≥ 0.2 or fertile ≥ 0.4; `brick` and `clay_tile` take `kilnFuelFactor`
     (2.0) where kiln fuel is not native; every timber material takes the **scarcity** `clamp(managedWoodHa ÷ the wood the
     arena lays, 1, timberScarcityMax)` (§4.9's demand; at generation the wood S12a lays from the propensity, at an epoch the
     standing wood); `thatch` takes `walledThatch` on a plot inside an enceinte at CITY (1.5) and METROPOLIS (2.0) from `c13`
     (the urban thatch bans). *Why carriage per load:* a load of ashlar costs no more to move than a load of rubble, so
     freestone was the stone worth shipping; sea carriage at a tenth of road's keeps a 90 km sea leg cheaper than a 15 km
     cart haul — the owner's "expensive to transport" and item 103 (a)'s water legs cheaper than carts; the premium stands
     for margins, tolls and risk. **Worked** (TOWN, temperate, sources 1 km out by road, woods ample; receipt
     `work/g116/tmp/pick-worked.txt`): wattle and daub 1.5, fieldstone 1.95 (1.3 on stony ground), timber frame 2.3, rubble
     3.45, brick 4.03, ashlar 5.45; rubble brought by sea 6.53, by river 10.58, by road 24.75; ashlar by sea 9.53, by river
     13.58; timber frame brought by sea 4.35.

     **(f) MEANS — PAIRED WITH NEIGHBOURHOOD PROSPERITY.** *A plot's means* is read from the value its new fabric is built
     for — `Plot.builtProsperity` as the build writes it ((j) (2)); at generation the field value — first clamped into its
     district's band range (item 72 (d‴), owner: "this neighborhood prosperities defines the bounds (floor, and ceiling) of
     what any building inside of it can be"; the range as item 114 (c) (5) lowers it), then read on its band's means row
     `[lo, hi]`, interpolated linearly along the value between the band's cuts, × `rungMeans[rung]` — an interval rule of
     §2.6's own, not §4.5's point-row rule:

     | band | squalid | poor | modest | comfortable | prosperous | rich |
     |---|---|---|---|---|---|---|
     | means `[lo, hi]` | 0.6–0.9 | 0.9–1.3 | 1.3–2.3 | 2.3–3.2 | 3.2–4.5 | 4.5–10 |

     `rungMeans` THORP 0.5 · HAMLET 0.6 · VILLAGE 0.75 · TOWN 1.0 · CITY 1.15 · METROPOLIS 1.3. *Why:* bands are per-town
     quantiles, so "rich" is relative and the rich band's wide top is "the very rich"; a metropolis's rich outspend a
     thorp's, so a thorp with a stone partner does not import stone like a city. **With item 114 (its one statement for this
     read):** in the highest allowed band c (its share f, item 114 (b)) the band's upper cut reads 1 and its row is `[lo_c,
     lo_c + f × (hi_c − lo_c)]` — item 114 (c) (4)'s continuous read for an interval row: its upper end is `R*_c`'s,
     `lerp(hi_{c−1}, hi_c, f)`, since each band's `lo` is the band below's `hi` (V11's compile checks the rows contiguous),
     and its lower end stays the band's own, so the row is continuous in the economy at every knot; a band an author holds
     above c (item 114 (c) (7)) reads its own row. The **top means** is that row's upper end, from the prosperity ceiling's
     position — `ceilingAt` for the picks that run before S6 writes the record (S3, S4, S5a, S5b; item 114 (b) (2)),
     `FieldBands.ceiling` after it, the prelude's position at an epoch (10, the `rich` row's, with no prosperity ceiling).
     The rows are keyed by the band set's ids; a band a pack's set adds without a row takes the interval interpolated between
     its neighbours' rows at its rank, named by V11's compile. So the town's wealth reaches the means only through the bands
     the field and the prosperity ceiling leave — one mechanism, item 114's; this item adds no wealth term. **The very rich
     are the rich band:** a capped town — economy below 50 on item 114's default table — keeps only the share f of its rich
     band, and at 33⅓ and below none, so its top purse is lowered and its houses and institutions take traded stone only
     where the capped top means pays its landed price within the blend: at the defaults a town capped at `prosperous` or
     lower builds no house or institution of river- or road-borne stone at any rung, and of sea-borne stone only from a
     partner within about 17 km at TOWN, 29 km at CITY and 42 km at METROPOLIS, and at TOWN river-borne stone from a partner
     at the 30 km reference leg reaches the very rich from an economy of about 45.3 (receipt
     `work/g114-116/tmp/cap-stone.txt`); its works keep their factors on the lowered top means. **Which prosperity reads
     which:** the built value places the plot in the cost order; its district's band range bounds it (a squalid street holds
     no ashlar house by derivation); the field band — its occupants — never moves a standing material (a decline leaves the
     stone house standing, its condition falling). **Institutions** (item 72 (d‴), owner: "any amplifier specific to the
     institution regarding its prosperity let's stay with the neighborhood bounds until the neighborhood itself upgrades"): a
     class whose preference row gives a `prestige` reads `M = min(M_plot × prestige × patronage, M_ceil)` — `M_plot` its
     plot's means, `patronage` §4.5's [1, 2], `M_ceil` the `hi` of its district's ceiling band (in the highest allowed band,
     that row's upper end) × `rungMeans` — so an institution builds at the top of its neighbourhood's bounds, never above
     them, and the neighbourhood's upgrade widens what it is rebuilt in (chapel and watchtower 1.5; tower house 1.8; church,
     monastery, town hall, guildhall 2.0; mage tower 2.4; cathedral, keep, castle and palace buildings 3.0). The clamp adds
     nothing to `District.pressure`: item 72's pressure measures value, and the institution's significance and dial term
     already carry it (§4.5 (1), (6), (8)), so a material term would count it twice. **Works** — a public or lordly work is
     no building inside a neighbourhood: its means is `W = top means × rungMeans × works[kind]` — enceinte 0.8, castle
     curtain 1.5, gate 1.2, bridge 0.8, harbour 0.8, raised way 1.0, a retaining wall on a civic face 0.8, lining 0.5, paving
     0.6 (vetoable: the town's top purse scaled per work; with these defaults a TOWN walls itself in stone brought by sea but
     never by river or road, a CITY in river-borne stone on about a third of seeds, a METROPOLIS on most; gates and castles
     reach further). **Item 115:** its gate adds nothing to the means; an island's plots read their own bands through this
     rule and its fabric draws on the settlement's material supply ((i)) — never II.6's island supply law, which sizes the
     islands.

     **(g) THE PICK — ONE FUNCTION FOR EVERY CONSUMER.** `pickMaterial(consumer, slot, M)`: (1) **The row** — the most
     specific preference row that exists: a structure key (`retaining`, `raised:<kind>`, `pier`, `quay`, `mole`, `deck`,
     `enceinte`, `gate`, `bridge`, `lining`, `paving`), then the class (`v.` classes and cluster classes included), then the
     district kind (a district-kind row applies to every class without its own row in that district: `docks` admits masonry
     and timber frame, tile and slate, no thatch or shingle; `shanty` boards, wattle, cob and adobe, thatch, turf, mud and
     canvas), then the default row; F-MATERIAL steps down the same order. **Candidates** — the materials the row admits for
     the slot, that the roof form admits (a covering), that no factor zeroes, and whose every required family is native (by
     land, or by ruins at this site) or traded (a native-only material: native). An earth wall (`cob`, `adobe`) is a
     candidate only where timber is not native by land and fieldstone does not lie at hand (stone native by land on stony
     ground) — *why:* where wood lies at hand the poor build of it (wattle and daub, log), where fieldstone lies at hand of
     that, and cob and adobe are the walls of wood-poor, stone-poor ground (the owner: "a forrest for timber … most building
     material is going to be wood based"). The row's `fallback` materials join only when no admitted candidate is native or
     affordable, and a tie place never merges an admitted material with a fallback one. (2) **Places** — the candidates
     sorted by cost; a place begins at its cheapest member and holds every candidate within `tieBand` of it (≤ 1.05 × its
     cost); its members share it by the row's weights. (3) **Affordable** — the dearest place with cost ≤ M, else the
     cheapest; **next** — the next dearer place, with `t = clamp((M − c_next × (1 − blend)) ÷ (c_next × blend), 0, 1)`. (4)
     **Draws** on concern `material`, keyed by the consumer's lineage and the slot with no epoch component (a fixed-key draw,
     E-03), always drawn in full — four for a building's walls, two for its roof, two for a structure: `u₀ < t` takes next,
     else affordable; `u₁` chooses within the place by the weights; for a building's walls `u₂ < mix × 4t(1 − t)` makes it
     mixed ((h)) and `u₃` chooses the part. So the poor take the cheapest, the rich the dearest they can pay, the middling
     mix exactly where two materials meet, and nothing is taken above one's means but a partial take within 20 % below the
     next price; with the draws fixed the pick is monotone in M, so a richer rebuild never picks a cheaper place. **The
     owner's examples at TOWN** (≈ % of each band's buildings, "mixed" the share within the band that a mix draw would make
     where the building is eligible; the defaults' outcome under a uniform value within each band, receipt
     `tmp/pick-worked.txt`; V12 calibrates, the bars of (q) bound):

     | case | squalid | poor | modest | comfortable | prosperous | rich |
     |---|---|---|---|---|---|---|
     | quarry and woods native — "the richer areas … mostly … stone, the middling areas … mixed" | wattle | wattle | wattle 46 · fieldstone 33 · timber frame 22 (mixed 26) | timber frame 84 · rubble 16 (mixed 18) | rubble 96 · timber frame 3 | ashlar 92 · rubble 8 |
     | woods native, no quarry, a river partner with stone — "wood based", stone "for teh very rich" | wattle | wattle | wattle 77 · timber frame 23 | timber frame | timber frame | timber frame 90 · rubble 10 (mixed 10: a stone ground storey) |
     | the same, the partner by sea | wattle | wattle | wattle 77 · timber frame 23 | timber frame | timber frame | rubble 49 · ashlar 26 · timber frame 25 |
     | the same, no partner | wattle | wattle | wattle 77 · timber frame 23 | timber frame | timber frame | timber frame |
     | stone native on good ground, timber by sea | cob | cob | fieldstone 54 · cob 46 | fieldstone 84 · rubble 16 | rubble 52 · timber frame 44 (by sea) | ashlar 92 · timber frame 8 |
     | stone native on stony ground, no timber (an upland) | fieldstone | fieldstone | fieldstone | fieldstone 84 · rubble 16 | rubble 96 | ashlar 92 · rubble 8 |
     | clay, fuel and woods native, no quarry, a river partner with stone | wattle | wattle | wattle 77 · timber frame 23 | timber frame | brick 67 · timber frame 33 | brick 90 · rubble 10 |

     In the owner's first example the TOWN's circuit is an earth rampart with a timber palisade (river-borne rubble costs
     10.58 and the enceinte's means is 8.0), its gates are river-borne stone (12.0), its bridges timber, a castle's curtain
     stone (15.0). *Reading:* a traded material reaches only the builders whose means pay its landed price — in the owner's
     example the rich band's upper span; a cheap sea-borne family reaches further down (timber by sea to stone country: the
     prosperous and the rich, as Baltic timber reached the middling of the North Sea towns; vetoable: a hard gate at the rich
     band instead).

     **(h) MIXED CONSTRUCTION — "INDIVIDUAL BUILDINGS THAT IS A COMBINATION OF THE TWO".** `Building.material` becomes:

     ```ts
     interface BuildingMaterial {   // §2.6; a rendering attribute only: texture and colour, never shape
       walls: string /* the wall material of every part `mix` does not name */; roof: string /* the building's covering */;
       mix?: { part: 'upper'|'gable'|'outshots'; walls: string /* the named part's wall material; at most two per building */ };
       origin: { walls: MaterialOrigin; roof: MaterialOrigin; mix?: MaterialOrigin } }
     type MaterialOrigin =   // where a built material came from, recorded when it was built or set, with §4.11's epoch (0 at generation)
       | { kind: 'native'; basis: 'land'|'ruins'; epoch: number }
       | { kind: 'traded'; partner: string /* TradePartner.key */; route: 'road'|'river'|'sea'; epoch: number }
       | { kind: 'dossier'|'edit'|'rows' /* rows: the parity MaterialRow, (n) */; epoch: number }
       | { kind: 'host'; host: Id /* an underground building's tunnel, chamber or ruin, (i) */; epoch: number };
     ```

     WHETHER a building is mixed is decided by cost (the blend zone of (g), peaking where two materials meet — the middling
     streets); WHERE each material goes is decided by mass for `upper` and `gable` (the heavier below and at the gable:
     masonry over earth over timber) and by cost for `outshots`. *Why:* a timber storey under a stone one is structurally
     absurd, and where timber is the traded family the dearer material is the timber; whether by cost and where by physics
     keeps both the owner's pairing and realism. `upper` — the ground storey takes the heavier, every storey above the
     lighter (a stone or brick ground storey under timber-framed storeys; a stone plinth storey under adobe); `gable` — the
     main wing's gable-end facets and every chimney take the heavier, the other walls the lighter (a stone chimney gable on a
     timber house); `outshots` — the main range takes the dearer, the wings of role `back` or `service` the cheaper.
     Eligibility is read from facts S11 holds: `upper` needs at least two floors, `gable` a gabled main wing, `outshots` a
     base wing of role `back` or `service`; the part is drawn by the pair's `MaterialMixRow` (V11: masonry over timber and
     masonry over earth — upper 0.6, gable 0.3, outshots 0.1; earth over timber — upper 0.5, outshots 0.5; a pair of one mass
     — outshots only), renormalised over the eligible parts; none eligible leaves the building single. **A part's share** —
     one geometry, read alike by V04's quarry law, V11 §3.18's salvage and the ledger's credits, and V12: `upper` the share
     of the building's wall area (perimeter × storey height) above the ground storey, `gable` the gable-end facets' share,
     `outshots` the `back` and `service` wings' share of perimeter × height, computed at S11. Every chimney draws in the
     building's heaviest masonry or earth wall material, else in the roof tone as today. **The covering** is one per
     building, chosen over the main wing's form; a wing whose form rejects it takes `RoofSpec.material` — the cheapest
     candidate its own form admits, written by S11 with `RoofSpec.materialOrigin` (the field keeps its home and gains its
     writer). A mixed building's massing, composition, plan, heights and datum are byte-identical to the same building
     unmixed (item 19). A `tent` takes `canvas` for walls and roof, with no pick.

     **(i) EVERY PIECE.** Each piece calls the pick with its slot and its means; a structure's material within its kind is
     texture and colour only, and its kind follows the supply as (m) rules.
     * **Roofs** — thatch where reed or straw is available, slate where slate, clay tile where fired clay, shingle where
       timber, stone slates where stone and fissile flags are native, lead for the rich and at prestige, turf and mud as the
       floor; every covering admitted by its roof's form — shape decides the covering, never the reverse.
     * **Town walls, towers, gates and the castle** (S3, S5a, S7; §4.8). `Enceinte.kind` keeps its ring role; its
       construction is its material's mass. The material is picked where the kind and trace are fixed — S3 for the first
       enceinte, S5a for each later one, since S5c stops at the setback band the section sets — at the works means: at TOWN
       and above over the masonry its row admits and `earth_bank` (a rampart of bank and ditch, with a timber palisade on its
       crest, `Enceinte.crest: 'palisade'`, where `boards` is native or traded within the means); masonry keeps the stage
       row's section and towers, earth reads V11's `earthwork` section rows at the rung (bank width and height; no towers
       along runs; a timber tower only at a gate); `bastion` and `octagonal` towers are drawn only on masonry. Towers take
       their enceinte's material. A gate picks on its own over masonry and `boards` at the gate factor, never lighter in mass
       than its enceinte (`Gate.material`, `Gate.materialOrigin`) — the stone gatehouse on an earth circuit. The castle
       curtain reads the castle factor; the keep and the castle's buildings are buildings of their district ((f)). At village
       rungs V07's kind draw (`palisade` / `earthwork` / `inner`) renormalises over the kinds whose material is native, or
       traded and within the works means (`earthwork` always is), and a REPLACEMENT retypes to the available masonry, else
       keeps its kind. The trace, closure and grading are item 106's: material never moves a wall.
     * **Bridges** (S4, S5b, S7). `Bridge.material` (new, with `materialOrigin`) by the pick at the bridge means;
       `Bridge.kind` `'stone'` for masonry, `'timber'` for timber; `draw` and `ford` as today. Feasibility is decided where
       the route is: S4's and S5b's router takes a crossing as a bridge candidate only where the bridge's candidate set is
       non-empty (the same pick and draws S7 then builds); with neither masonry nor timber the crossing takes the ford where
       the river admits one, else F-ROUTE's existing rungs (another crossing site … the destination `unserved`), reported
       `bridge_no_material`. A bridge the dossier implies (a `kinds` row's `implies: 'bridge'`, a "…Bridge" landmark) is
       always built: by the pick, else in `boards` with origin `dossier`, reported `material_dossier`.
     * **Harbour works** (S7). Quays, piers, moles and breakwaters carry `Way.material` and `Way.materialOrigin`, present
       exactly on `quay` and `pier` ways and on raised ways (a bridge's way reads its `Bridge`; a `quay_wall` waterfront is
       its enceinte's, the quay way under it reading the enceinte's material): quays and moles on a river, an estuary, a lake
       or the carved basin over masonry, `timber_crib` and `earth_bank`; a sea-facing mole or breakwater over masonry and
       `timber_crib` only (an earth bank facing the sea washes out); piers over `boards` and masonry; a work with no admitted
       material is omitted, reported `harbour_no_material`. A deck building reads the `deck` row (timber frame, boards,
       brick).
     * **Retaining walls and raised ways** (item 110). V11 §3.24.1's and §3.24.2's band rows become preference rows and the
       band enters through the means: a private terrace reads its high side's plot, a civic face at CITY and METROPOLIS the
       civic works means; `earth_bank` and `timber_crib` only for steps ≤ 150 cm; `RetainingWall.material` is a `MaterialDef`
       id with `materialOrigin`. A raised way's picked mass sets its structure kind, which sets `pierSpacingM` (item 110
       (b)'s rule, re-keyed by mass) and whether its spans may be `vault` (masonry only, so V04's `archVault` chambers stand
       only under masonry); an aqueduct admits masonry only; its material is `Way.material` once built. A step above 150 cm
       with no masonry is split by the levelling's terrace rung, else left unlevelled, reported `retaining_no_material`; a
       raised way with no admitted material is not raised, reported `raised_no_material`. With the switch off their band
       draws run on their own streams; on, those draws are not made.
     * **Paving** (V01's `way.surface` rule at S10a's end). The table keeps its structure and its band reads; each surface is
       a material's paving — `paved` (setts) costs as `ashlar`; `cobble` as `rubble`, admitted where stone is available or a
       river or beach lies within `pebbleReachM` of the principal centre (its pebbles, native); `brick` (new) as `brick`,
       from `c14`; `planks` as `boards` — admitted where its family is native, or traded where the paving works means covers
       its cost — a gate and a fallback that draw nothing; the fallback order paved → cobble → brick → planks (quays, piers
       and bridges, and ways fronted at comfortable or above) → dirt. The era row's `market paved` chance applies only where
       `paved` is admitted. A structure way's surface follows its structure's mass (V01's rule: masonry `paved`, timber
       `planks`). `Way.surfaceOrigin` is written for `paved`, `cobble` and `brick`. An epoch's surface re-derivation raises a
       surface only within the epoch's supply and lowers it only by the band rule, never because a family became unavailable:
       laid paving stands.
     * **The underground.** `Tunnel.lining?` and `liningOrigin?` (II.7.2) and `Gallery.lining?` and `liningOrigin?` on the
       passages a town digs (V04's digs and cellar links): masonry, `boards` (shoring), or absent — unlined earth, or
       rock-cut where the ground class is rock — by the pick at the lining works means, texture only (the section is the
       profile row's); caverns, catacomb galleries, quarry and mine workings and ruins are rock and carry none. A **building
       on an `underground` plot** takes its host's material — its tunnel's lining (unlined `earth_bank`; rock-cut `rock`), a
       cavern's or quarry chamber's `rock`, a ruin's recorded masonry, else `rubble` — with origin `host`: no pick, no ledger
       debit, no quarry volume, its roof `none`. **Quarry voids** (II.7.6, V04 §3.5.3) count only fabric whose origin is
       native stone by land — buildings by their stone parts' shares ((h)); enceintes, towers, gates, bridges, harbour works,
       retaining walls and linings by `materialOrigin` at V11 §3.18's structure volumes — so traded or robbed stone lays no
       local working and a stoneless site lays none; II.7.6 keeps its `reachM` from the town for laying the workings, and a
       native-stone site with no stone cell within it takes its whole volume from the surface quarry on the nearest native
       cell (§4.9). **The forecast** (S7b; V04's U-FORECAST): the predicted stone stock is the expected native-land stone
       wall volume of the roster's demanded buildings — over classes and bands, the class template's perimeter × height × the
       share of the band's means range whose pick is of the stone family (the expectation of (g), no draws) — and 0 where
       stone is not native by land.
     * **Islands** (V05). An island's buildings read the settlement's material supply with their own plots' means; the
       island's rock, its conjured water and its magical structures (the floating stair, a bridge of light) are neither a
       source nor a material; a landfall's rock credits the ledger as `stone` at its decoration's face centroid (native by
       ruins; vetoable: the fallen rock lies on the settlement's own land).
     * **The village** (V07). The same rows and rule at the village rungs through `rungMeans`, the `v.` classes with their
       own preference rows; both "geology row" citations read (b)'s tests; `roof.palette` reads `Building.material.roof`
       (VG's own weighted list under `VG`); a wall record naming stone, "Town walls" or "City walls and gates" builds the
       `inner` circuit in masonry, and one naming stone is a dossier-declared material ((l)); the prime case: a standalone
       village with no declared partner is native-only at every rung and epoch.
     * **Interiors** (V03). The plan's exterior walls take their storey's material (ground or upper), a gable segment and the
       chimneys the gable part's; wall thickness, openings and stair kinds never read a material; an underground building
       keeps its host's styling.
     * **Institutions.** The prestige rows (`chapel`, `church`, `monastery`, `cathedral`, `keep`, `castle`, `palace`,
       `town_hall`, `guildhall`, `tower_house`, `mage_tower`, `watchtower`, `v.watchtower`) admit masonry with fallback
       `timber_frame` and `log`, and roofs lead, slate, stone slate and clay tile with fallback shingle and thatch: an
       institution takes native masonry at any means (the cheapest when none is affordable), traded masonry only where its
       clamped means reaches it, else its fallback — a stave church in a timber town with no stone partner; a brick church
       where clay is native and stone is not; a stone church brought by river where the partner ships it and the
       neighbourhood's bounds reach it; never a material the supply lacks.
     * **Culture and era** — cost factors only (`MaterialDef.factors`), never a material outside the supply.
     * **Names** — V01's naming features gain `material`: a district whose buildings are ≥ 60 % of one wall family other than
       the town's dominant family offers V11's naming rows the feature `material`, a weighted guard like V01 §3.7.4's
       features ("Stone Row", "Brick Lane"; words ours, V11 §3.20).
     * **Works** (§4.11). `WorksRow.material` and `WorksTable.pauses.material` read a key: `masonry`, `timber` or `earth` is
       the mass, any other key a material id (the `timber` → `boards` alias applies to stored material fields only), an id's
       row winning over its mass's; the base's pause rows are re-keyed by mass (`stone` → `masonry`): masonry pauses in
       winter in temperate and cold climates, earth in winter and in the climate row's wet season (cob rises in lifts that
       must dry), timber never; the decay factor 0.6 applies to timber mass and to thatch coverings; a mixed building's Works
       reads its heavier part; a traded material adds no duration (its expense is its cost).
     * **Fire and flood** (V06). V06 reads `MaterialDef.flammability` and `.floodCollapse` and keeps no list, combining roof
       and wall as it does today; a mixed building burns by its more flammable wall part and floods by its ground storey's
       material for `upper`, by the lighter material for `gable` and `outshots`; a deck, pier or raised-way support reads its
       structure's mass as V06 §3.19 does.
     * **Boundaries.** A plot boundary of treatment `wall` draws in the wall family of its plot's main building (texture
       only, derived at draw); field boundaries stay the field system's hedgerows (§4.9) — a walled field system is a
       field-system row a region pack may add (V11), not a material.

     **(j) OVER TIME (§4.11 states it; V06 builds it).** The owner's "cant have … or grow to have them until and unless they
     trade" governs construction. (1) **Standing fabric keeps its material and origin** whatever the supply later does; a
     repair (`reoccupy` from derelict, a `repair` Works, `repairRaised`, `repairRetaining`) is in kind, reusing the fabric's
     own material, so it debits nothing traded and needs no licence. (2) **Re-picks** at the epoch's supply: a new build, a
     `rebuild`, a `reuse … build`, a fire rebuild, a new or contracted circuit (`contractWall`), a new stretch on a ruined
     retaining wall or raised way, and a **completed upward refurbishment** (the `mutate` that raises `builtBand`, §4.11),
     which now also writes `builtProsperity` = the plot's field value at completion clamped into the raised band's cuts
     (added to J-A31.44's list) and re-picks at it, keeping its material where the new pick would be cheaper — so a quarter
     grown rich is rebuilt over time in dearer materials and a refurbishment never downgrades. (3) **A partner arrives** with
     the first epoch whose slice lists it (a dossier receipt F14 enters the next epoch's slice; standalone, a timeline entry
     declares one): its families are traded for that epoch's builds. **A partner leaves** (or turns hostile) with the first
     epoch whose slice no longer licenses it: its families are unavailable to that epoch's builds; buildings raised with them
     keep them; new building falls back to the pick over what remains. Removing a declared partner from the CREATION slice is
     another act — an edit of the settlement's premise, so the fabric whose origin names it re-picks unless locked or edited
     ((l)). (4) **Native sources open and end:** a deposit `discovered` (from the next epoch) or put `available`, a landscape
     toggle turned on in a timeline slice, woods regrown past the test; a deposit `depleted` or `removed` (receipt F13), a
     toggle turned off, or woods cleared below the test by an epoch's conversions, each from the next epoch's prelude. A
     standalone quarry never works out by use (V04's surface quarry is unbounded): stone ends only by a timeline toggle, or
     on a dossier map by F13. Frame growth adds no native family; a rung change moves `rungMeans` for new builds only. (5)
     **Ruins:** `robStone`, `clear`, `dismantle`, `demolish`, a ruined span and a landfall credit the ledger BY FAMILY at
     their position (V11 §3.18's yields per material: timber frame's "timber 8, infill 4" credits timber 8; earth credits
     nothing reusable), a mixed building each part by its share ((h)); a build of a family native only by ruins debits it and
     is built only while the stock within `ruinsReachM` covers the debit — evaluated at each pick against the ledger as it
     stands, builds in the epoch's order — else the pick falls back, reported `ruins_stock_short`. The ledger never creates a
     material (J-A8.45 amended); for a family native by land or traded it stays a flow record. (6) **Fire** (V06 §3.11.2
     (4)): for `fire.rebuildYears` after a fire, a rebuild on a burnt plot takes the least flammable covering and wall among
     its candidates within `fire.ordinanceStretch` (1.25) × its means — the historical ordinances; none available leaves the
     pick unchanged, reported `fire_rebuild_unavailable`; this rule replaces `fire.rebuildShift`'s step while the switch is
     on, the switch-off path keeping it. (7) **The history replay** (item 113; vetoable): each coarse epoch reads the present
     partner set, as generation does for all the fabric it builds, a partner whose arrival a receipt (F14) dates only from
     that week; no history event names a partner, so none is otherwise added or removed (the alternative: a replay epoch
     before the present has no partner, and a peak built before the link is native-only); a deposit listed `depleted` today
     is available in the replay epochs before the week its depletion receipt (F13) dates, and in every replay epoch before
     the last where no receipt dates it, a `removed` one in none; remnants keep their materials; a refounded settlement
     builds from its ruins' stock while it lasts. (8) **Decline** leaves fabric standing in its material, its condition
     stepping down. (9) **The chronicle** names each cause ("1410: rebuilt in timber; no stone came up the river after
     Kellmoor's trade ended"; "1352: the quarry at Hollins worked out").

     **(k) PRODUCERS AND THE SUPPLY WEB.** V11's goods table gains a `family?: MaterialFamily` column (`stone` → stone;
     `logs`, `timber`, `planks` → timber; `reed`, `straw` → thatch; `clay`, `bricks` → fired clay; `slate` → slate; `lead` →
     lead) and three goods: `slate` (site, subterranean · quarry where `Terrain.fissile` is `slate`, bulk 3, made by `quarry`
     there, demand `market`), `lead` (site, subterranean · mine where `Terrain.lead` holds, bulk 2, made by `mine` there,
     demand `market`) and `straw` (site, land · arable, bulk 2, demand `classes`), with good words `slate`, `slates`, `lead`,
     `straw` and `marble`, `granite`, `limestone`, `sandstone` → `stone`, so T-V11-28's totality holds. The thatcher's edge
     reads the thatch family ("supply `reed` | `straw` 3 000 m road"): S2 resolves it to the first good the supply holds,
     natively or by a partner, else the first. **The one home of the refusal is V11 §3.5.2's reading rule:** a supply edge
     whose good has a `family` takes no `import` substitute; it is served by a native provider (its land use or producing
     class), by the endpoint store at the gate or quay facing a partner that supplies the family (V11 §3.13.4), or not at all
     — an unserved edge reported `material_unsupplied`, soft as every web edge is; every other good keeps the generic import
     (§10.2 cites it). **Producer gates** (§10.2's `BuildingClassRow.requiresFamily?: { family: MaterialFamily; basis:
     'land'|'available' }[]`; V11's rows): `quarry` and `lime_kiln` need stone native by land, `lumber_camp` and `sawmill`
     timber, `claypit` and `brickworks` fired clay; `thatcher` thatch available, `mason_yard` stone available, `timber_yard`
     timber available; §4.9 sites quarries, clay pits and lumber only on native sources. A dossier-backed producer exists
     regardless (item 20 (b)) and, being a production record, makes its family native ((b) (2)). **The timber shortfall**
     (§4.9): the managed wood is laid up to what the arena holds; the rest is served by a partner that supplies timber
     through its endpoint store, else reported `timber_short` — never a generic import, never a failure (J-A26.42 amended);
     (e)'s scarcity prices what is short.

     **(l) EDITS, OVERRIDES AND THE DOSSIER — THE OWNER'S EDITABILITY AND "CANT … GROW TO HAVE THEM", RULED (vetoable).** The
     owner asked that everything be editable "if a user wants to change something to fit their preference"; the refinement
     binds what a settlement builds by derivation and growth. So **an author's act on an element wins on that element**: a
     `setAttr` of a building's `material.walls`, `.roof` or `.mix` (T12 `dress`; `paint` gains the targets `wallMaterial` and
     `roofMaterial`, a `wallMaterial` paint setting `walls` and clearing `mix`) or of a structure's `material` (its row's
     home tool) — origin `edit`, implicitly pinned, held through regeneration, licensing nothing; outside the supply it is
     reported `material_edit_unsupplied` and the clerk's critique names it (K19); standalone, the edit's alternatives line
     offers "say {town} trades with a place that has {material}". **A district's `materialOverride`** (T5; retyped `{ walls?:
     Record<string, number>; roof?: Record<string, number> }`) binds the buildings standing when it is set and every re-pick
     inside the supply, its shares drawn with the pick's fixed uniforms (`u₁` for walls, the roof's first) and never making a
     mix; at a later epoch new builds in the district draw only the shares whose families the epoch's supply holds,
     renormalised, and with none left take (g)'s pick, reported `override_share_dropped` — so growth never adds a material
     the settlement cannot have. **Locks and pins:** a supply change (a partner declared or removed, the switch turned on, an
     epoch) holds a locked building's or structure's material and origin, its fate `EditFate { fate: 'kept', reason:
     'held_against_material_supply' }` (V09's `fate.held.materialSupply`) listed; a pinned one re-picks (a pin keeps
     existence and position only, §7.2). **Dossier facts never move:** the partners, their relationships and listed goods,
     the deposits and their states are dossier facts; the supply and every material are map facts derived from them (item 20
     (h)). A dossier-declared material — a custom record's `materialFamily` (V08's `materials` row → our material id, so its
     family), a record whose `kinds` row declares one, a wall record whose words name stone — is honoured on that element
     (origin `dossier`), reported `material_dossier`, and licenses nothing else. **Declaring a partner** standalone (V09's
     Trade control) is `adjust('circumstances.trade', …)` on the timeline's first entry — an `Adjust` scoped by the supply's
     family slices ((d)): the picks (a building moves no geometry; a structure whose kind changes re-derives by its stage's
     operator) and S2's producer demand for a changed family, placed or withdrawn by §7.7 item 5's least disruption — or on a
     later entry for an epoch. On a dossier map a map-side partner is refused `dossier-owned` (§7.7 item 11, beside items
     114's and 115's refusals), its alternatives the material edit and the dossier.

     **(m) ITEMS 19 AND 23 — THE CONFLICT, STATED AND RULED.** *What conflicts:* item 19's default — "DEFAULT: that FTG
     model", FTG setting "one default material per stage, overridden per district and per building type — e.g. temples always
     stone — with wealth expressed through lifestyle pools and roof colour" (file b; J28's application of the owner's
     2026-09-26 "emulation first", not an owner ruling on materials) — which §2.6 restates as wealth shown "through the
     lifestyle-banded building pools … and the roof-colour role by band … never by a material keyed to the prosperity band",
     with `MaterialRow.key.band` "absent from every default row"; and item 23, which quotes the owner ("I still want it to be
     based in our base of MFCG and FTG emulation first") and makes every default reproduce MFCG and FTG, our extensions
     "data-driven tendencies with chance or as options — never as fixed laws". *The ruling:* the owner's 2026-09-30 rule is
     newer and pairs material with neighbourhood prosperity and with terrain, resources and trade, so **item 116 supersedes,
     as the DEFAULT, item 19's FTG material default** — its default rows (V11 §3.19.3) and §2.6's band clause — **and the
     roof-colour role by band in the default sheets**; the default material is (g)'s pick over (d)'s supply. **The licence**
     — no material outside the supply but by a dossier fact, an author's act, the parity rows or an underground host — **is
     an absolute of the model while `materials.supply.enabled` is on** (the owner's "cant … until and unless"): it is the one
     exception to §7.6's "tendencies, never fixed laws", the reading rule met only in that the whole model is a cell a preset
     or the author may turn off, and it does not bind under the parity presets or with the switch off ((n)), where item 23's
     emulation stands. *What agrees and is kept:* item 19's owner words and its (a), which put "materials and roofing" in
     each designation's prosperity-scaled template, agree with pairing material to prosperity; item 19's "never a universal
     ladder" holds — the cost order is each settlement's own, from its supply, routes and climate, culture, era and region
     rows, and no fixed stone > brick > timber order exists; the lifestyle-banded pools are kept; and item 19's "a MATERIAL
     IS A RENDERING ATTRIBUTE ONLY … never footprint, wings, storeys, heights or roof form" is kept for every building and
     for every structure's material within its kind. *For structures, the reading (vetoable):* a structure's kind — a stone
     or a timber bridge, a masonry curtain or an earth rampart, a masonry or a timber raised way — is a structural choice the
     supply constrains, as terrain decides where a ford can be, never a material's look; the base already chose bridges
     "stone or timber by era and prosperity rows" (§4.8) and item 110 (b) keys pier spacing by masonry or timber. So a
     settlement lacking every admitted material gets a ford or no bridge, no harbour work and no raised way, each reported
     (T116-2, T116-27); no building's geometry ever reads the supply. **The regional shift is retired and folded**, one
     mechanism for one concept: its "shift with the band within what the region builds with" is now the default; its rows
     become region cost rows of a region pack (`MaterialDef.factors.region`); `MaterialRow.key.band` and `extension:
     'regionalShift'` go; D-2's region preset carries the region's cost rows; `EraRow.region` keys them and
     `EraRow.materialRows` the parity rows. J-A19.21 is superseded by J-A116.21; J-A19.41 – J-A19.43 stand (materials are not
     template columns; built things read the built band); J-A19.81 stands under the FTG preset and with the switch off;
     J-A8.45, J-A26.42 and J-A65.45 are amended as (j), (k) and (i) state.

     **(n) THE SWITCH AND THE PRESETS.** One cell, `materials.supply.enabled` (an `extension` option over both references;
     default on; `presets`: `MFCG`, `FTG`, `VG` and `NG` off; `FM` zeroes none, as §7.6 states), provenance `ownerRule: '116
     (n)'`, reached through the presets and the tables editor. **Off:** S11 reads the kept parity `MaterialRow` rows — FTG's
     per-stage rows with their district and class overrides, the band and regional-shift rows removed, our own rows
     (clean-room) — every structure keeps its pre-116 rule and its band draws on their own streams, and no field this item
     adds is written (an absent origin reads `rows`); the model is byte-identical to the base under V11's one id rename
     (`timber` → `boards`, §7.5's alias at read); the two appended `blueprint.features` uniforms are drawn and move no other
     draw. **The parity presets:** under `MFCG`, `FTG`, `VG` and `NG` the references are emulated, the one place the owner's
     refinement does not bind (item 23's emulation, kept); every other preset and every region pack keeps it. **The look:**
     the `lit` family's default sheet colours a roof by its covering's role while the switch is on and by its band tint while
     it is off (the band-tint rows kept for the FTG sheet and for switch-off documents; J-A19.81) — under the owner's rule
     the material already carries wealth, and a band tint would paint a rich thatched roof "the deepest clay"; `ink` keeps
     MFCG's one roof role at the town and city bands and draws the roof family as an ink pattern at the building band and the
     close-up (the `MFCG` sheet draws none); `hatched` keeps NG's two tones under `NG` and otherwise reads the covering's
     role; V07's `painterly` reads `Building.material.roof` (VG's weighted list under `VG`). **Old documents** lack the cell
     and read it off, so they replay byte for byte at their own output version; turning it on is an `Adjust` from S1 (11)
     that re-picks every material, re-derives the producer classes and the structure kinds the supply changes, keeps every
     edit and every locked element, and moves no building's geometry.

     **(o) THE EDGES.** Each has a defined outcome, its fallback on §5's ladder where it can fail, and a test; §4.13's EP
     table gains the row for S1 (11) and the pick citing this table, and B-EDGE runs its rows.

     | edge | outcome | fallback (§5 tier) | test |
     |---|---|---|---|
     | nothing native but earth, no partner | earth walls (cob; adobe in arid rows); thatch where straw, else turf or mud | the floor, tier 5 `material_floor`, only when no admitted candidate stands; never tier 6 for a building | T116-15 |
     | everything native | the full cost order; the dearest family's share rises with the band | — | T116-16 |
     | a native-only settlement | no traded material at any epoch; it grows only in what it has | — | T116-3, T116-25 |
     | a desert (item 111) | adobe walls and mud roofs; stone where native; an oasis grove no timber source; baked brick at its fuel factor | the floor | T116-17 |
     | a marsh or a delta | reed thatch; wattle where timber; brick where clay and peat; cob | the floor | T116-18 |
     | a mountain or stony upland | fieldstone for the poor, rubble and ashlar above, slate or stone slate where drawn, log in cold and coniferous rows | — | T116-19 |
     | a coastal port | a sea partner's families cheapest; with no named partner, native-only | — | T116-20 |
     | a thorp; a metropolis | `rungMeans` 0.5 and 1.3: a thorp's road-borne stone reaches no house; a metropolis's timber priced by its scarcity | — | T116-21 |
     | item 114's prosperity ceiling | no plot or institution means above the top means × `rungMeans` but a held band's (item 114 (c) (7)), no work's above the top means × its factors, continuous in the economy; a town capped at `prosperous` or lower builds no house of river- or road-borne stone | — | T116-22 |
     | islands (item 115) | the settlement's material supply; island rock no source; a landfall credits stone | — | T116-23 |
     | a history replay | present partners (one a receipt dates, from its week); depleted deposits worked before their dated depletion, else before the last epoch; remnants keep their materials; the ruins' stock serves a refounding | `ruins_stock_short` → the pick | T116-24 |
     | a building's candidate set empty | the preference row → the default row → the floor | tier 5 `material_floor` | T116-15 |
     | a masonry structure with no masonry | an enceinte's earth construction; a sheltered harbour work's timber crib or earth bank | tier 5 `material_kind_substituted`; a bridge with neither: the ford, else F-ROUTE's rungs, `bridge_no_material`; a sea mole or breakwater, a raised way, a step > 150 cm: tier 6 with their codes | T116-27 |
     | a dossier-implied bridge on a site with no bridge material | built in `boards`, origin `dossier` | tier 0, `material_dossier` | T116-27 |
     | a building on an `underground` plot | its host's material, origin `host` | none needed | T116-33 |
     | a declared material outside the supply | honoured on its element | tier 0, `material_dossier` / `material_edit_unsupplied` | T116-30 |
     | a district override at a later epoch | only the shares the supply holds, renormalised; none left: the pick | tier 0, `override_share_dropped` | T116-30 |
     | a supply change reaching a locked or a pinned element | a locked one holds, `held_against_material_supply`, listed; a pinned one re-picks | — | T116-30 |
     | a declared partner removed from the creation slice, or its route edited | an `Adjust` by the family slices; the fabric that named it re-picks unless locked or edited | — | T116-30 |
     | a terrain edit that changes a resource raster | the supply re-derives by the slice rule; the dry run lists the re-picked ("stone now native: n re-picked") | — | T116-31 |
     | frame growth; a rung change at an epoch | no family added; new builds read the new `rungMeans`, standing fabric keeps its material | — | T116-26 |
     | a standalone quarry | never works out by use; stone ends only by a timeline toggle (F13 on a dossier map) | — | T116-26 |
     | a tent | canvas walls and roof, no pick | — | T116-15 |
     | the switch off; a parity preset | the parity rows; no field of this item written | — | T116-1 |

     **(p) WIRING.** **Records and their lifecycles** (§2.8's registry rows and §7.4's lifecycle rows for each):
     `MaterialSupply` (derived: S1 (11), S3's carriage, each epoch's prelude, load; no edit kind — a `setAttr` naming
     `Document.derived.materialSupply` bends with `bend.material.supplyFollows`, "The materials follow what the land, the
     ruins and trade supply.", and `button.openTrade`, which opens the Trade control, on a dossier map its read-only trade
     panel); `BuildingMaterial`, `MaterialOrigin` and `RoofSpec.material`/`materialOrigin` (S11 and §4.11's builds; `setAttr`
     and `paint`; in the building's leaf digest, outside its geometry subtree; undo the log's; §2.8's `factTier` reads
     `dossier` for an origin `dossier`, a map fact otherwise); `Enceinte.materialOrigin` and `crest`,
     `Gate.material`/`materialOrigin`, `Bridge.material`/`materialOrigin`, `Way.material`/`materialOrigin`/`surfaceOrigin`,
     `RetainingWall.material`/ `materialOrigin`, `Tunnel.lining`/`liningOrigin`, `Gallery.lining`/`liningOrigin` (their
     stages; their rows' `setAttr`); `TradePartner.name`, `supplies`, `distanceM` and `source: 'declared'` (recipe data: the
     creation slice and timeline entries; `adjust('circumstances.trade')`; §11.1's skeleton carries declared partners and
     material `setAttr`s); `Terrain.fissile`, `.lead`, `.mining` (S1 (10); the terrain row's `setAttr`);
     `MaterialLedger.rows[].family` and `.at` (§4.11's salvage events; generation's ruin credits);
     `District.materialOverride` retyped; §2.9's thematic view key gains `materials`. **Migration** (§7.5; reads of absent or
     superseded values, never a rewrite): a `Building.material` without origin reads origin `rows` at epoch 0 and no mix; a
     stored id `timber` reads `boards`; a structure's absent `materialOrigin` reads `rows`; an absent `Bridge.material` reads
     `rubble` for kind `stone`, `boards` for `timber`, absent for `draw` and `ford`; an `Enceinte.material` that is no
     `MaterialDef` id reads `rubble` for `stone` and the `inner` kind, `boards` for `palisade`, `earth_bank` for `earthwork`,
     else `rubble`, reported; a ledger row's `material` reads as its family through V11's id → family map (`timber_frame`'s
     "timber 8, infill 4" → timber 8), an absent `at` as its `from` entity's ground centroid; `TradePartner.supplies` absent
     reads `[]`; `Terrain.fissile` absent `none`, `.lead` false; the switch absent off. **Streams** (§6.1): concern
     `material` — every pick, buildings and structures alike, keyed by the consumer's lineage and slot with no epoch
     component (E-03): four uniforms for a building's walls, two for its roof, two for a structure; its readers S3, S4, S5a,
     S5b, S7, S10, S11, II.7.2, `EVO_*` and VS1–VS6; with the switch off S11's parity draw keeps its keying and the retaining
     and raised band draws their own streams; `blueprint.features` appends, after the sewer draw, the fissile and the lead
     uniforms. **Failure** (§5.2): a new class **F-MATERIAL** — where: S3, S4, S5a, S5b, S7, S10's levelling, S10a's
     surfaces, S11, II.7.2, §4.11's builds; detection: an empty candidate set, a ruins-only candidate the stock cannot cover,
     a declared material outside the supply; ladder: for a building the preference row → the default row → the floor (tier 5:
     walls `adobe` in arid rows, `wattle_daub` where timber is native, else `cob`; the covering `mud` on a flat roof or in an
     arid row, else `turf`, the form's bounds ignored), never tier 6; for a structure its kinds in the order of (i) (tier 5
     `material_kind_substituted`) → tier 6 with its code; a declared material honoured (tier 0, reported). **Report codes**
     (§5.4's closed `ReportCode` gains each with class F-MATERIAL and its landing, each a `MsgRef` key in V09 §4.9's
     catalogue): in `ladderUses` `material_floor`, `material_kind_substituted`, `ruins_stock_short`,
     `fire_rebuild_unavailable`, `bridge_no_material`, `harbour_no_material`, `raised_no_material`, `retaining_no_material`;
     in `unserved` `material_unsupplied`, `timber_short`; in `requestedVsBuilt` `material_dossier`,
     `material_edit_unsupplied`, `override_share_dropped`. `partner_no_supplies` is a port note (§14's `PortNote` kinds, V08
     §4.6). The supply's facts are `NativeReason`s, never report codes. **§5.3:** a hard invariant row — no material outside
     the supply but origins `dossier`, `edit`, `rows` and `host` and a family native by ruins at its site — checked at S11's
     stage end, at each epoch and on load; the neighbourhood-character row stands unchanged (institutions stay inside their
     range). **The clerk's why** (§11.2's `why` on `material.*`; V10's `material` section): the material and its family; its
     origin (the native fact with its DR row — raster, deposit and state, production record, toggle, flag or floor — or the
     partner, its route and the good that licensed it, or the ruins, the dossier record, the edit or the host); the means,
     the band range that bounded it and the district; today's candidates with their costs ("Stone would need a trade partner
     that has it; none does"). **The legend** (§9.5; V09's Materials view): only the families drawn, each with a second line
     of origin words from §8.1's origin column — "from the land", "brought from {partner}", "reused from ruins", "from
     SettlementForge", "yours" — and item 112's second cue, the family's pattern. **Display list** (§8.1): `attrs` columns
     `materialWalls`, `materialRoof`, `mixPart`, `mixWalls`, `materialOrigin`. **Export** (§11.1; V02 §5.5 for the parts):
     GeoJSON buildings carry `material_walls`, `material_roof`, `material_mix_part`, `material_mix` and `material_origin`;
     enceintes, gates, bridges, ways, retaining walls, tunnels and galleries their `material` and origin; glTF names wall
     surfaces by storey or part and roofs by covering; CityJSON as attributes. **Registry** (§7.8): the Trade control, id
     `circumstances.trade` (label "Trade"; output metric the families traded; consuming stage S1; locality *re-derive from S1
     (11)*; *discrete*, its levels the declared partners; anchor §7.7; the advanced panel's "Site" group, V09 §4.14's
     grouping by consuming stage, beside the Economy; the Magic sits in "Programme"); the `fissile` and `lead` requests
     (output metric `Terrain.fissile` / `Terrain.lead`; consuming stage S1; *re-derive from S1 (10)*; *discrete*, their
     levels the request's words; anchor §4.2 S1 (10); rows of the advanced panel's "Site" group, outside the basic panel's
     count, their labels V09's); the switch through the presets and the tables editor. **Budgets** (§12.4's rows): the supply
     ≤ 5 ms at CITY per derivation (S1's row); the pick ≤ 2 ms per 10 000 buildings (S11's row).

     **(q) BARS (§13.2; the volumes cite them and extend their own).** T116-1 **no-op pin**: with the switch off every
     material, the model digest and every golden are byte-identical to the base under V11's id rename, no field this item
     adds is written, and an older document replays byte for byte. T116-2 **texture only**: any change of supply, pick, mix,
     override or edit leaves every building's geometry subtree unchanged, and a structure's geometry changes only through its
     kind (T19-3 extended; V02's T-V2-25). T116-3 **the licence**: across the fixtures and 200 seeds per rung, 0 materials
     with origin `traded` whose partner did not supply the family in the recorded slice of the build epoch, 0 materials
     outside the supply but origins `dossier`, `edit`, `rows` and `host` and a family native by ruins at its site, and 0
     traded materials on a native-only settlement at every epoch (exact bound 0). T116-4 **both native** (the owner's second
     example: a river TOWN with woods and a quarry): the richer bands ≥ 90 % stone-family walls; the middling bands hold both
     families, ≥ 15 % of their buildings of the minority family or mixed; the poorer bands ≥ 80 % in the two cheapest native
     materials; the share with stone in walls or mix non-decreasing from the poorer to the middling to the richer bands.
     T116-5 **woods, no quarry, no partner** (the owner's first example): 0 stone fabric and every wall of timber mass, in
     every band. T116-6 **the same with a river partner that has stone**: stone only on plots whose means reach 0.8 × its
     landed cost — at TOWN only the `rich` band, "the very rich" — ≤ 3 % of houses; every stone building's origin names the
     partner; the circuit an earth rampart, the gates stone, the bridges timber; by sea ≥ 50 % of the rich band stone, by
     road none. T116-7 **the reverse** (stone native, timber by sea): the richer bands together ≥ 60 % stone-family walls;
     traded timber only in the prosperous and rich bands; every prestige institution masonry. T116-8 **cost**: for one family
     and partner sea < river < road; cost monotone in distance; the carriage of two materials of one family equal; a 90 km
     sea leg cheaper than a 15 km road leg; ruins 0.8 × the base. T116-9 **monotone pick**: with the draws fixed a higher
     means never picks a cheaper place, and a refurbishment never downgrades. T116-10 **mixed**: exactly two wall materials;
     the heavier on the ground storey or the gable; on T116-4's fixture the mixed share highest in the middling bands; 0
     mixed where one candidate stands; a mixed stone-and-timber house burns as its timber part. T116-11 **one native test**:
     stone native exactly when the creation arena holds a stone cell ≥ 0.5 or a dossier fact makes it so; V04's quarry cells
     and V07's and V11's gates read the same test on every fixture; frame growth adds no family. T116-12 **the dossier's
     facts**: an available deposit forces native; a depleted `stone_quarry` gives native stone fabric and worked-out V04
     workings at generation (at CITY and above DR32's ossuary has its quarry) and no land stone from the first live epoch; a
     removed one grants nothing; a depleted timber deposit on a forest site leaves timber native; discovered opens at the
     next epoch; a dossier `quarry`, `brickworks` or `Stone Quarrying` row makes its family native on a raster without it; no
     resources → the raster rule. T116-13 **partners (DR3)**: a partner supplies a family only when its records show it;
     derived and hostile partners supply none; a dossier with no named neighbour has no licensing partner whatever its access
     key; the access-pair route; the fill reads only the named fields. T116-14 **web and producers**: 0 goods of a family
     served by the generic import; no map-derived `mason_yard` where stone is unavailable and no `quarry` where it is not
     native, while a dossier-backed producer always stands; the timber shortfall only through a partner, else `timber_short`;
     T-V11-28's totality with `slate`, `lead` and `straw`. T116-15 **earth only and the floor**: every building has walls and
     a covering; F-MATERIAL never reaches tier 6 for a building; a tent is canvas. T116-16 **everything native**: ≥ 4 wall
     materials drawn; the dearest family's share non-decreasing across the bands. T116-17 **desert**: ≥ 90 % earth-family
     walls where stone and timber are not native; 0 coverings a wing's form does not admit, checked per wing; an arid clay
     site without fuel has baked brick only at prestige and in the rich band, its houses below it adobe. T116-18 **marsh**:
     thatch ≥ 60 % of roofs where reed is native and slate is not; brick only with clay, at its fuel factor where the fuel is
     not native. T116-19 **mountain**: on a stony site with no native timber stone-family walls ≥ 80 % and the squalid, poor
     and modest bands ≥ 60 % fieldstone; with native coniferous timber both families drawn; slate only with `fissile =
     'slate'` or a partner, stone slate only with `fissile = 'flag'`; log only in cold, coniferous and mixed rows. T116-20
     **port and route**: on one fixture the traded share at `rich` by sea ≥ by river ≥ by road. T116-21 **rungs**: at one
     supply the top band's dearest share METROPOLIS ≥ CITY ≥ TOWN ≥ VILLAGE ≥ THORP; a THORP with a road partner that has
     stone has 0 stone houses; at one arena of wood the rich band's timber share falls as the rung rises. T116-22 **item
     114**: no plot's means above the top means × `rungMeans` but a held band's (item 114 (c) (7)), no institution's above
     its ceiling band's, no work's above the top means × its factors; the means continuous in the economy, across the knots
     at 16⅔ and 33⅓; the S3 to S5b picks reading `ceilingAt` equal to the record S6 writes; the traded share non-increasing
     as the prosperity ceiling lowers; at economy 33⅓ and below, a TOWN with a river or road partner that has stone builds 0
     houses and institutions of traded stone; under the lowest prosperity ceiling a stone- or brick-native town has every
     prestige institution in masonry. T116-23 **islands**: island materials ⊆ the settlement's material supply; no family
     native by island rock; a landfall credits stone at its face. T116-24 **history**: remnants keep their materials; a
     refounded fixture builds stone from ruins only while the stock covers it; a stoneless site beside an ancient ruin has
     stone by ruins at generation, near the ruin only; no partner beyond the present set in a replay epoch. T116-25 **a link
     over epochs** (V06's H-TRADE): no traded fabric before the link's epoch, no new traded fabric after it ends, every
     standing traded building keeps its material and origin until struck, repairs in kind; H-NATIVE (a native-only timber
     village over 20 epochs) holds 0 traded fabric. T116-26 **sources over epochs** (H-QUARRY, H-WOODS): a discovered quarry
     native from the next epoch, a depleted one lays no new land stone, woods cleared below the test end native timber from
     the next prelude; frame growth and a rung change add no family; a standalone quarry works out only by a toggle. T116-27
     **structures**: every enceinte, gate, bridge, harbour work, raised way, retaining wall and lining material is in the
     supply or carries its code; an aqueduct only in masonry; no bastion or octagonal tower on a non-masonry enceinte; an
     earthwork's section is its row's; every gate at least as heavy as its enceinte; no earth mole or breakwater facing the
     sea; a dossier-implied bridge always built; S4's router takes no bridge candidate its pick cannot build. T116-28
     **paving**: `paved` and `cobble` only with their sources or within the paving means; `brick` only with fired clay from
     `c14`; the fallback order holds; an epoch never lowers laid paving for want of a family. T116-29 **institutions**: in a
     native-only timber town every prestige institution is timber; with clay and fuel, brick; with a river partner that has
     stone, the stone share equals the share of institutions whose clamped means reach it, ± the blend; houses and
     institutions never outside their district's range. T116-30 **overrides, locks and the dossier**: a `setAttr` material
     holds through regeneration with origin `edit` and changes no other building's pick; a `materialOverride` wins in its
     district and, on a native-only fixture, adds 0 non-native materials by growth; a locked element keeps material and
     origin through a supply change, a pinned one re-picks; removing a declared partner from the creation slice re-picks the
     fabric that named it; a declared `materialFamily` is honoured on its building only; a map-side partner on a dossier map
     is refused `dossier-owned` with its alternatives. T116-31 **determinism and load**: six uniforms per building on
     `material`; declaring an unrelated partner changes only the picks whose candidates changed and moves no gate; a terrain
     edit that changes a raster re-picks by the slice rule and lists the re-picked; the supply recomputed on load equals the
     derivation's; the replay byte-stable. T116-32 **why, legend, export, compile**: every drawn family in the Materials
     legend with its origin; the why names the basis or partner, the means and the costs; the exports carry every field of
     (p); V11's compile proves every `MaterialDef` complete — cost, flammability, flood, Works key, salvage and dwell row,
     texture tile and a colour role in every family —, the means rows contiguous over the band set in force (a row-less band
     named), and every consumer resolving a material over every supply case, the earth-only case included. T116-33 **the
     underground**: every building on an `underground` plot takes its host's material with origin `host`, no pick and no
     ledger debit; quarry voids count only native-land stone, 0 on a stoneless site; U-FORECAST's stone stock is 0 where
     stone is not native by land. T116-34 **fire, flood and Works**: a rebuild within `fire.rebuildYears` of a fire takes the
     least flammable candidate within the stretch; flood collapse only on timber and earth masses; a mixed building's Works
     reads its heavier part; masonry pauses in winter, earth in winter and the wet season. **Schedule (§13.8):** T116-1 –
     T116-3, T116-8, T116-9, T116-11 and T116-15 PR from M1; T116-4 – T116-7, T116-10, T116-16 – T116-21 nightly from M1 on
     V12's bar-map rows, T116-22 nightly from M2b, which lands item 114's prosperity ceiling; T116-12 – T116-14 on
     B-DOSSIER-lite from M1 (T116-13's fill from M-SF); T116-27 nightly, T116-29 – T116-31 PR, each clause from the milestone
     that lands its mechanism (M1, M3a); T116-32 at M3b and M3c; T116-28 at M5; T116-33 at M6-U; T116-23 at M6-sky; T116-24 –
     T116-26 and T116-34 in the milestone tier from M6-E; the village's clauses from V-M1.

     **(r) THE UNITS — applied IN the coherence pass's Rewrite phase, bundled with items 114 and 115 (owner, ~01:10: "bundle
     all this with g114-115"): the landed units — the base model, kernel, pipeline, determinism and rendering parts, V03 and
     V04 — in a short late rewrite seat each where they have a part (the kernel has none), every other unit in its Rewrite;
     the owner's refinement binds every part. Each shared decision has one canonical home (STATES); every other unit cites it
     (REFERENCES); the three items' one routing is docs/validation/coherence/work/g114-116/routing.json with the canon's
     ruling of 2026-09-30.**

     | unit | STATES | REFERENCES |
     |---|---|---|
     | base **model** (§2), late seat | §2.6's *Materials* rule rewritten — the owner's words, (a)'s terms and wealth words, (e)'s cost, (f)'s means (the interval rule, the top means, institutions inside their range, works), (g)'s pick (row order, earth-wall admission, fallback, places, draws), (h)'s mix with the parts' shares and the per-wing covering, item 19's shape clause kept and (m)'s supersession; the types `MaterialFamily`, `MaterialMass`, `MaterialSlot`, `MaterialDef`, `MaterialPreference`, `MaterialMixRow`, the narrowed parity `MaterialRow`, `BuildingMaterial`, `MaterialOrigin`; `RoofSpec.material` and `materialOrigin` as the wing's covering; §2.7's `MaterialSupply` and `NativeReason`, `MaterialLedger.rows[].family` and `.at`, `Enceinte.materialOrigin` and `crest`, `Gate.material`/`materialOrigin`, `Bridge.material`/`materialOrigin`, `RetainingWall.material` (an id)/`materialOrigin`, `Tunnel.lining`/`liningOrigin`, `Gallery.lining`/`liningOrigin`; §2.4's `Way.material`/`materialOrigin`/`surfaceOrigin` and `surface` `'brick'`; §2.5's `materialOverride` retyped; §2.3's `Terrain.fissile`, `.lead` and `.mining`; §2.8's registry rows for the new edit paths, `factTier` for origin `dossier`, `SliceRef.kind 'supply'`; §2.9's `Document.derived.materialSupply` and the thematic key `materials` | the producers (§4), the edits and DR rows (§7), `TradePartner` (§7.7), the roles (§8), the rows and values (V11) |
     | base **kernel** (§3), no seat | no part: a material is never geometry and no kernel call reads one | — |
     | base **pipeline** (§4, §10, PART II, PART III), late seat | S0's `fissile` and `lead` requests; S1 (10)'s two draws and the struck sentence that only II.7.6 reads `Terrain.mining`; **S1 (11)**, the supply's derivation with (b)'s tests (the arena, the deposit rule at generation and at epochs, the production records, the ruins basis and its reach, generation's ruin credits) and S3's carriage; S2's producer gate and the thatch-family edge; S3's and S5a's enceinte pick, the construction by mass, the crest and the earthwork rows' reading; S4's and S5b's bridge feasibility; S7's towers, gates, castle, bridges, the dossier-implied bridge, harbour works and sea moles; S10's retaining pick; S11's building pick, institutions, deck buildings, the per-wing covering, tents and the host rule for underground buildings; §4.9's native land uses, the timber shortfall and scarcity; §4.11's (j) whole — the prelude, re-picks, the refurbishment writing `builtProsperity` (J-A31.44's list), the fire ordinance, repairs in kind, the ledger by family with positions, the ruins stock, sources over epochs, the replay's partners and deposits — and its Works keyed by mass; §4.1's and §4.12's stage I/O; §4.13's EP row; §10.2's `requiresFamily`, `salvageM3` by id with family credits, the citation of V11 §3.5.2's refusal and the corrected sentence on which rows name a material; II.7.2's lining pick; II.7.6's quarry voids from native-land stone (structures included), its reach from the town and the surface-quarry fallback; II.7's S7b stone-stock forecast | the pick and the types (§2.6), the cells (V11), V06's engine, V04's U-FORECAST, V01 §3.7.3's surface gate and table (S10a runs it) |
     | base **determinism** (§5–§7), late seat | §5.2's F-MATERIAL; §5.3's licence invariant; §5.4's codes with class and landing; §6.1's `material` row (keying, readers) and `blueprint.features`' order (… sewer, fissile, lead); §6.2's leaf-digest note; §7.1's edit paths (T12 `dress`, `paint`'s two targets clearing `mix`, T5's `materialOverride` and its growth rule, the terrain row's `fissile` and `lead`, each structure's `material` under its row's tool, the dossier-map partner refusal, stated at §7.7 item 11); §7.3's locality for the partner and switch `Adjust`s; §7.4's lifecycle rows; §7.5's migration reads; §7.6's switch cell, its presets, the retired regional shift and the licence as the one exception to the reading rule; §7.7's `TradePartner` fields, layer 2's standalone fill order and declared partners outside `TradeFlow`, DR3 amended (covers gain `TradePartner.supplies`, `.name`, `.distanceM`; inputs the neighbour's exports, chains' resource keys and access key, the import links' goods and the network's names; rule (c)'s fill and route step; bar "a partner supplies a family only when its records show it; derived and hostile partners supply none; no partner is invented"), DR15 amended (inputs DR41's supply, the plot's built value and its district's range, the class's prestige and patronage, a declared `materialFamily`; rule (g); bar "no material outside the supply but origins `dossier`, `edit`, `rows` and `host`"), **DR41** (family `site`; covers `Document.derived.materialSupply`, derived and no registry kind; inputs `site.terrain`, `site.deposits` with state, the dossier's producing institutions, income rows, own chains and exports with `entrepot`, `site.culture`, the biome, DR3's partners, the ledger at epochs; rule S1 (11) and §4.11's prelude; chance `blueprint.features`; bar: every native family traced to a site or dossier fact, no depleted or removed deposit's point family native by land after generation, no traded family without a partner whose records show it), the closed-digest admission, item 9's tiers; §7.8's registry rows | V08's fill, V09's controls, §2.6 |
     | base **rendering** (§8, §9, §11, §12), late seat | §8.1's `attrs` columns; §8.2's roles `wall.<id>` and `roof.<id>` for every `MaterialDef` id with their palette rows in `ink`, `lit` and `hatched` and their contrast rows; `lit`'s roof by covering with the switch on, by band tint off; `ink`'s pattern; the total id → tile map (new tiles: ashlar, brick, timber frame, log, boards, wattle and daub, earth, turf, slate, lead, canvas — a set of 26, at M2b; `hatched`'s rows at M5); the mixed parts drawn per facet, the chimneys, the per-wing covering; the boundary wall by family; the colour-deficiency row re-pointed and a Materials row; the Materials `ThematicRow` with item 112's second cue; §8.11's, §9.7's and §11.6's edge rows; §9.5's legend with its origin line; §11.1's export fields and skeleton; §11.2's `why` on `material.*`; §12.4's two budget rows | V02's facets, V03's plan, V09's view, V07's `painterly` values |
     | base **scope** (§0, §1, §13–§17, the judgment index), Rewrite | §0's row for item 116 and item 19's row amended; §0's index terms (native, traded, native-only, material family, means, top means, work's means, origin, mixed); §1's buildings row ("item 116's supply model by default; FTG's under the FTG preset and with the switch off"); §1.2's one-click default gaining the materials switch on (item 116's supply model); §13.2's T116-1 – T116-34, T8-5 (a ruins-only shortfall blocks the build) and T26-1 (the timber import by partner or `timber_short`) amended; §13.8's schedule rows; §14's `DossierDigest.economy.partners[]` fields and the `PortNote` kind `partner_no_supplies`; §16's milestones (J-A116.01: the supply, the pick, the rows and the records at M1 with V11's C1; the mixed facets, the edit paths and the Trade control at M3a; the exports at M3b; the why at M3c; the plan at M6-P; linings, voids and host buildings at M6-U; the epoch parts at M6-E; the dossier fill at M-SF; the hood's paving and names at M5; the village at V-M1); D-2 amended; the register's J-A116.01, .21 (the default model; J-A19.21 superseded), .22 (which prosperity reads which), .23 (institutions at the top of their range), .24 (carriage per load), .41 (the ledger never creates a material; the ruins basis and reach; J-A8.45 amended), .42 (the timber shortfall and scarcity; J-A26.42 amended), .43 (quarries of native stone, structures included; J-A65.45 amended), .44 (the native test over the creation arena and the dossier's facts), .61 (the streams), .71 (a declared partner is a licence only), .81 (`lit`'s roof by covering; J-A19.81 kept under FTG and switch off) — the first digit naming the part that states the rule | every other unit |
     | **V11** content | every row and cell of (a): `defs`, `preferences` (structures; classes with the prestige rows and their fallbacks; `v.` and cluster classes; district kinds `docks` and `shanty`; the default row), `mixes`, `parity` (FTG's rows, band and regional-shift rows removed, `timber` → `boards`), `settings`; the relief rows' P(slate), P(flag) and P(lead); `ResourceRow.family` (V11 §2.5) and the goods column; the goods `slate`, `lead`, `straw` and the good words; §3.5.2's refusal and the family edge; the `requiresFamily` rows; §3.18's salvage and dwell rows for every id and the family credits; the `earthwork` section rows at TOWN, CITY and METROPOLIS; row 48's (`works`) pause rows re-keyed by mass (`stone` → `masonry`); §2.8c's `RetainingProfileRow.material` and `RaisedWayStructure.material` retired into preference rows; `pierSpacingM` by mass; §3.20's words for the `material` naming feature; the culture and region rows as `MaterialDef.factors`; T-V11-28 and the compile totality; §1b, §2.1 and §3.1's rows with readers; register lines; C1 | the formulas (§2.6), `TradePartner` (§7.7), the Works (§4.11) |
     | **V02** buildings | the mix parts' facets (`upper` every storey above the ground storey, a stacked tier above tier 0; `gable` the main wing's gable-end facets and every chimney; `outshots` the `back` and `service` wings) and their shares; the roofscape and façade programs per part and the per-wing covering (§5.2, §5.3; the band-tint line replaced); §1b's trace rows for the supply's inputs; the mutator keeps the material, except a completed upward refurbishment, which re-picks (§3.9); deck buildings' row; §5.5's exports by part; T-V2-25 extended with T116-10's heavier-part clause (no new id) | `BuildingMaterial` (§2.6), the pick (§4.7 S11) |
     | **V03** interiors, late seat | the exterior-wall fill per storey and per gable segment; chimneys in the heavier material; thickness, openings and stairs never read a material; an underground building's host styling read from origin `host` | `BuildingMaterial` (§2.6) |
     | **V04** underground, late seat | §3.5.3's volume law over native-land stone by origin, structures and linings included, by the parts' shares; a stoneless site lays no workings; the surface-quarry fallback; U-FORECAST's stone stock; the dug passages' `Gallery.lining`; `vault` spans and `archVault` only under masonry raised ways; an ancient ruin's credit at generation and when robbed; §3.13's edge rows (a stoneless site; traded stone) | the lining pick (II.7.2), the supply (§2.7), II.7.6 |
     | **V05** sky | the landfall credit as family `stone` at the decoration's face centroid; island buildings on the settlement's material supply; the island's rock, conjured water and magical structures neither source nor material; item 115's gate unchanged | the supply, the pick |
     | **V06** evolution | its engine parts only: `EVO_PRELUDE`'s supply step; §3.11.2 (4)'s ordinance with `fire.ordinanceStretch` (1.25) in its fire row beside `fire.rebuildShift` (the switch-off path); the hazard reads of `MaterialDef.flammability` and `.floodCollapse` (buildings by part; decks, piers and supports by mass); which structure events are repairs in kind and which re-pick; the chronicle lines; fixtures H-TRADE, H-NATIVE, H-QUARRY, H-WOODS; T-V6-16 stratified by supply; T-V6-17 amended for mixed buildings and the new ids | §4.11's (j), V11's cells |
     | **V07** village | the village application through `rungMeans`; the `v.` preference rows; the kind draw over admitted kinds and the REPLACEMENT's retype; `roof.palette` and `painterly`'s role values for every `MaterialDef` id (`roofJitter` kept); both "geology row" citations replaced by (b)'s tests; the wall records' materials (J-V7.15 and T-V7-32 amended); the entry store as the arrival point; `roads: isolated` a road form only; T116-3 and T116-25's H-NATIVE run at the village rungs from V-M1 (no new id) | the pick, the supply |
     | **V08** settlementforge | DR3's supplies fill from the dossier's four sources and the port's fill of the three new partner fields and `name`; the access-pair route's key rows; the `deposits` row's `supplies` column (every key listed: `glass_sand` none, `coal_deposits` fuel only) and `precious_metals` → lead; the production records feeding DR41; the `materials` row → our id and family; the note `partner_no_supplies`; the consequence statement; the adapter (J121); §1b's rows; T-V8-20's ignore clause extended — the fill reads only the three admitted partner fields (T116-13; no new id) | `TradePartner`, DR3, DR41 (§7.7), the digest fields (§14) |
     | **V09** application | the Materials view in the Show menu with its legend words and origin line; the About tab's material with its origin chip and "Why this material?"; the standalone Trade control (name, route, supplies; the advanced panel's "Site" group, id `circumstances.trade`); the `fissile` and `lead` rows in the same "Site" group; the dossier map's read-only trade panel and the refusal's alternatives; `paint`'s two targets; §4.3's binding rows (T12 `dress`, T5's override, T3 and the wall tools for structures, the terrain row, the Trade control); the catalogue keys (every new report code, `critique.K19`, `bend.material.supplyFollows`, `button.openTrade`, `fate.held.materialSupply`, the legend words) | the records, the why |
     | **V10** clerk | the `material` why section; K19 in `CritiqueFinding`, T-V10-17 and CVR-V10-4 ("{n} buildings in {material}, which {town} has no source for"); a description naming a material the site lacks — standalone, in creation mode the new document's creation-slice `trade` gains a declared partner (as `magic` goes to the creation slice) and in edit mode `adjust('circumstances.trade', …)` is proposed; on a dossier map, reported; the chronicle answers | §11.2's `why`, V06's chronicle |
     | **V12** calibration | §1's owner-rule entry (`'116 (n)'`); `Level.trade?: TradePartner[]` (declared partners, `source: 'declared'`: the fixture's creation-slice trade) in the one `Level` declaration, for the bar-map rows' partner fixtures; bar-map rows for T116-3 – T116-7, T116-10, T116-16 – T116-22 and T116-25 with their owners (V11, V02, V06); register lines for every new cell (`panel`, then `corpus`; the switch never calibrated); the item-110 material register lines re-pointed to the preference rows; the switch's preset resolution; the known-city fixtures' stated supply; `MeasureInput` gains building material records | the bars (§13.2) |
     | **V01** neighbourhoods | the paving gate over V01 §3.7.3's table (the surface-to-material costs, the `brick` row, the fallback order, the epoch rule); that `hatched`'s roof program reads the covering's role (NG's two tones under `NG`); the `material` naming feature (§3.7.4); the lone neighbourhood's supply from its recipe's creation-slice `trade`, native-only by default | the pick, the supply, §8.2's role values |

     **HOMES:** §2.3, §2.4, §2.5, §2.6 (the rule, the vocabulary, the means, the pick, the mix), §2.7 (`MaterialSupply`, the
     ledger, the structures' fields), §2.8, §2.9; §4.1, §4.2 S0–S3 (the flags, S1 (11), the carriage, the first enceinte),
     §4.2 S2 and §10.2 (producers, the web's material goods), §4.3–§4.4 (S4, S5a, S5b), §4.7 S10–S11, §4.8, §4.9, §4.11,
     §4.12, §4.13, II.7, II.7.2, II.7.6; §5.2, §5.3, §5.4, §6.1, §6.2, §7.1, §7.3, §7.4, §7.5, §7.6, §7.7 (`TradePartner`,
     DR3, DR15, DR41), §7.8; §8.1, §8.2, §8.11, §9.5, §9.7, §11.1, §11.2, §11.6, §12.4; §0, §1, §13.2, §13.8, §14, §16, D-2.
     Volumes: V11 (every row and cell), V02 (the mix at the building), V06 (materials over time), V07 (the village), V04
     (quarry voids, linings, the forecast), V05 (islands and landfall), V03 (the plan's walls), V01 (surfaces, roof colour,
     names), V08 (the partners' supplies and the production records from the dossier), V09 (the view, the panels, the Trade
     control), V10 (the why, the critique), V12 (the bars). *Scope:* BASE (the records, the supply, the pick, the structures,
     the edits, the dossier rows); STAGED with evolution for (j), with stage 3 for the mixed facets and the plan, with the
     underground for linings, voids and host buildings, with the sky layer for islands, with stage 2 for the hood. *Routing:*
     bundled with items 114 and 115; applied IN the coherence pass's Rewrite phase by every unit named in (r), the landed
     units in a short late seat.
