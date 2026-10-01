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

114. **OWNER RULE — Walls decay into gaps and patchwork when a settlement is poor and safe, and recover when it is not (owner,
     2026-09-30).** Owner: "the walls, if there are walls, the visual of those over a long time if the prosperity and defense of a
     settlement is low over enough time should show deterioration in walls and recovery when they go back up. what do you think as an
     added extra variable?" / "deterioration like broken down sections or walls or pallisades using patchwork material rather than
     robust material. visual gaps that a user can internalize" / "yes". **What the design has (CONFIRMED):** V06 §3.7.3 neglects an
     outermost ring after `walls.neglectAfterYears` (30) at `threat ≤ walls.neglectThreatMax` (0.20) and breaches it per 120 m stretch
     at `walls.breachChancePerYear` (0.01); V06 §3.7.5 repairs breached runs when threat returns (`repairWall`, no Works, the `fabric`
     cap); a `dismantled` run stays a gap; file f item 575's `Enceinte.condition` is a step profile along the trace (`standing` ·
     `breached` · `dismantled`); §8.2's state row draws a gap glyph over a breached run and a dismantled run's towers as trace discs;
     palisades, earthworks and walls are one `Enceinte` record. Prosperity plays no part, and the look jumps from whole to gap.
     Program's interpretation (vetoable; decided under J122):
     **(a) TWO DRIVERS.** NEED — the settlement's defence need (its threat as §7.7 derives it, with the dossier's defence readiness)
     — decides whether a gap is closed; MEANS — its prosperity (the settlement's wealth level at the epoch, the districts the run
     bounds weighting it locally) — decides what it is closed with. Both are read as values sustained over a table window of years,
     so a run's condition never flickers between epochs at a threshold.
     **(b) THE CONDITION LADDER** per run of the enceinte, extending item 575's profile by the same knot mechanism: `standing` (the
     wall's own robust material) · `worn` (weathered, parapet broken; still a wall) · `patched` (a former gap closed in a cheaper
     material than the wall's own: timber hoarding, a wattle or hurdle fence, an earth-and-turf bank or dry-stone infill in a masonry
     wall; odd stakes, hurdles or brush in a palisade — the patch material a table row by wall kind and culture) · `breached` (a gap
     with rubble) · `dismantled` (stone taken; a gap for good). Each run records its material (robust or a patch row) and the
     epoch of its last change.
     **(c) TRANSITIONS** (rates and windows are table cells, our own defaults, calibratable): low need sustained → neglect, as now, now
     through `worn` before `breached`; low means sustained, even under threat → `worn`, then `breached` at a lower rate than neglect;
     both low → fastest. Need returns with low means → breached runs are `patched`, not rebuilt; need with means → breached and
     patched runs are rebuilt robust (patches replaced oldest first, at a table rate, within the `fabric` cap); means without need →
     a wall still in use has its `worn` runs restored, while a neglected wall keeps decaying (a rich place without fear lets its wall
     go). A `dismantled` run stays a gap unless a hand edit or a new wall decision rebuilds it.
     **(d) AT GENERATION.** A map generated as the present with no replay takes each run's condition from the same two drivers through
     a derivation row (§7.7): the dossier's defence readiness (SettlementForge's `readiness` label) and wealth, at table shares (a
     vulnerable, poor town shows patched and breached runs; a fortress in a rich city stands whole). With item 113's history replay
     the condition comes from the replay.
     **(e) THE LOOK, legible at every zoom.** A `breached` run is a clear break in the wall line with a rubble spill; a `patched` run is
     drawn in its patch material's own line style and colour (thinner, lighter and irregular — timber, wattle or earth reads apart
     from stone), so a user sees at a glance where the wall is makeshift; `worn` shows at the district band and finer only (weathering,
     broken crenellations); `dismantled` as now. The legend names each; item 112's colour-blind rule holds (pattern, never colour
     alone).
     **(f) TOOLS, CLERK, EXPORTS.** The wall tool's repair takes a material (robust or a patch row); the clerk tells each run's story
     ("patched with timber in the lean years; rebuilt in stone after the siege"); exports carry condition and material (a battle-map
     export treats a patch as a wall and a breach as an opening).
     **(g) BARS.** A poor, threatened fixture shows patched runs and no robust rebuild; a rich, threatened one rebuilds in stone; a
     safe one decays through `worn` to `breached`; recovery replaces patches oldest first; no condition changes without a sustained
     driver (no flicker across two epochs at a threshold); every state distinguishable in greyscale at the bands stated; the
     generation-time condition derives from readiness and wealth; with need and means at neutral values the existing neglect and
     repair behaviour is reproduced (no-op pin).
     **HOMES:** §2.7 (`Enceinte.condition`'s values and each run's material), §7.1 and §7.4 (`repairWall`'s material, lifecycle rows),
     §7.7 (the derivation row from readiness and wealth), §8.2 (state rows, legend), §11 (exports), §13.2 (bars). Volumes: V06 (§3.7's
     transitions with need and means), V07 (the palisade's patches), V08 (readiness and wealth read from the dossier), V11 (patch
     materials by wall kind and culture; rates and windows), V09 (the repair tool's material; the legend), V10 (the story told), V12
     (register lines and bars). Applied by the coherence pass to base and volumes like items 111–113 (J127).

115. **OWNER RULE — Small settlements are not grand: a ceiling on building grandeur by settlement tier (owner, 2026-09-30).**
     Owner: "And to clarify, buildings from village and lower tiers generally not have grand building designs, unless specified, even
     if high in prosperity correct? like they can be high in prosperity but that doesn't mean that everything is a manor for a village
     and especially so for a hamlet." / "yes". **What the design has (CONFIRMED):** a building's shape starts from its class (V02 §3.10's
     rows by template family, four prosperity anchors); the `dwelling-compound` family, which `v.yeoman_house` and `v.manor_house`
     read through `composition.classFamily`, reaches `H` .15 and `U` .15 at the rich anchor, and `dwelling-detached` reaches `H` .1;
     the base's S10b class mix makes the rich row all manors (the owner's town rule) with cuts relative to the settlement; V07's
     `bandShares` (rich 0 / 0.02 / 0.03 at THORP / HAMLET / VILLAGE) shift with DR6's wealth; `v.manor_house` is a singleton sited by
     seigneurial government (a small chance by population otherwise). So a very wealthy hamlet could show several manor-like farms.
     Program's interpretation (vetoable; decided under J122):
     **(a) QUALITY, NOT GRANDEUR.** Prosperity in small places shows as larger plots and ranges within the class's own row, more
     outbuildings, hearths, dormers and porches, better roofs and materials — never a courtyard plan, an `H` or `U` plan, a tower, a
     turret or a gatehouse on a dwelling.
     **(b) THE CEILING** (a table by rung; our own defaults): THORP and HAMLET — every dwelling at most `single`, `L` or `T`; no `H`,
     `U`, courts, towers or turrets; no manor-class dwelling unless specified. VILLAGE — at most one manor house, only with a lord
     (seigneurial government) or when specified; every other dwelling at most `L` or `T`; the manor alone takes the grand
     arrangements. TOWN and above — unchanged (the "all manors" rule stands there).
     **(c) "UNLESS SPECIFIED."** A grand building the dossier names (a manor, hall or similar record), or one the user places or
     reshapes by hand, keeps its full design: the ceiling is a default, never a refusal (item 101 R2); the clerk says it exceeds the
     tier's usual.
     **(d) WEALTH IN VILLAGES.** DR6 still shifts the band shares, but a band only moves a dwelling along its capped row (the richest
     farmhouse is the capped row's rich anchor), and the manor count never rises with wealth.
     **(e) OVER EPOCHS.** A village that grows into a town lifts the ceiling for buildings new or rebuilt from that epoch; a town that
     shrinks to a village keeps its grander buildings as they stand (history, item 113) and never reshapes them down; new ones follow
     the village ceiling.
     **(f) BARS.** Rich THORP, HAMLET and VILLAGE fixtures at the wealth maximum: no `H`, `U`, court, tower or turret dwelling but the
     manor; at most one manor, only with a lord or a dossier record; a dossier-named hall keeps its design; TOWN rungs and above
     byte-identical (no-op pin).
     **HOMES:** §4.2 S10b (the rung ceiling on the class mix; the "all manors" rule scoped to TOWN and above), §10.2 (the ceiling
     table's shape), §13.2 (bars). Volumes: V02 (the composition rows' ceiling by rung in the resolution chain), V07 (the village
     class mix, the manor's singleton rule, the wealth shift), V08 (what "specified" reads from the dossier), V11 (the ceiling table),
     V06 (epochs across a rung change), V09 and V10 (a hand edit beyond the ceiling honoured and explained), V12 (bars). Applied by the
     coherence pass like items 111–113 (J127).

116. **OWNER RULE — A zoom-out limit: a map never zooms out past its own land (owner, 2026-09-30).** Owner: "oh and regarding how in
     a village and lower it would be a speck in the overall map, just zoom in and set a ceiling to the maximum zoom, or a ceiling to
     the amount of total land to render. is that a problem you were facing?" / "yes". **What the design has (CONFIRMED):** V07 §5.2
     (J-V7.4) opens a village on its perimeter × 1.6 (at least 400 m) at the district band, the township one zoom-out away; the
     territory law bounds the land by population and rung, and beyond `bounds` is paper; §9.5's framing (A06) opens a town on its
     settlement; §8.8's pyramid runs 35 stops from 1:50 000 to about 1:125, the same at every rung (T-ER-08: "every rung draws every
     stop"), so a thorp can be zoomed out to a speck.
     Program's interpretation (vetoable; decided under J122):
     **(a) THE LIMIT.** Each map's zoom-out limit is the stop at which its whole `bounds` (a village's township, a town's frame) fits
     the viewport's short side, plus one stop of margin (a table cell); the view never settles beyond it and the pyramid draws no
     tile past it. The zoom-in end is unchanged.
     **(b) THE LAND** is already capped by the frame laws (the territory law per head and per rung; the town frame): stated, not added.
     **(c) EXPORTS** frame within the same limit (the whole bounds at most).
     **(d) GROWTH** — an epoch or a hand edit that grows the bounds moves the limit with them.
     **(e) BARS.** At every rung from THORP to the cap the zoom-out limit shows the whole bounds and no stop beyond it is reachable in
     the view; T-ER-08 restated (every rung draws every stop from its limit inward); the first view unchanged.
     **HOMES:** §8.8 (the per-map limit on the pyramid), §9.5 (framing), §12.5 (budget: fewer stops, never more), §13.2 (T-ER-08
     restated). Volumes: V07 (§5.2's township view is the limit's view less its margin), V09 (the view controls stop there), V12
     (bars). Applied by the coherence pass like items 111–113 (J127).

117. **OWNER RULE — Seasons: the map dressed for the time of year, following SettlementForge's calendar (owner, 2026-09-30).**
     Owner: "oh and the last big thing... seasons! lakes freeze during winter, fall leaves during fall, growing season during spring,
     we have seasons in settlementforge. can those be integrated in?" **What SettlementForge gives (CONFIRMED, research/sf):** one tick
     is one week; `worldState.calendar` carries `season` (spring | summer | autumn | winter, thirteen weeks each, spring first; the
     4-4-5 month grid) and the week; the settlement's `config.terrainType` (plains, coastal, riverside, hills, mountain, forest,
     desert) feeds our biome; the realm map's optional climate and biome digests exist behind a flag. **What the design has
     (CONFIRMED):** §8.2's view keys `season` ∈ {spring, summer, autumn, winter} and `weather` ∈ {clear, overcast, snow} (§2.9 view
     state) select override rows — autumn and winter re-skin deciduous crowns (autumn tint; winter a bare-crown symbol), snow lays the
     `snow` role over ground, fields and roofs, overcast removes direct light; the model and its hash are untouched; V06 reads
     SettlementForge's season for a campaign week (item 67 (b): masonry pauses in winter); the biome's climate row (item 111) holds
     aridity. Missing: frozen water, fields and gardens through the growing year, the season following SettlementForge, climate
     deciding what a season looks like, and the low winter sun.
     Program's interpretation (vetoable; decided under J122):
     **(a) A LOOK, NEVER A CHANGE OF THE MAP.** A season dresses the same map: it never moves, adds or removes a building, way, wall,
     field boundary or water edge, never changes the model or its hash, and a save is the same save in every season. It lives in view
     state and in exports.
     **(b) THE YEAR POSITION.** The view's season is a week of the year (0–51, spring first, SettlementForge's grid); the four named
     seasons are picks of their middle weeks. Every seasonal effect is a band of weeks per climate, so the year turns gradually: leaves
     colour, then fall; the first ice on ponds before lakes; the fields green, ripen and are cut.
     **(c) FOLLOWING SETTLEMENTFORGE.** With a dossier from a campaign, the default season is the dossier's current week and season
     (a derivation row, §7.7); the user may pick another (view state) or set it to follow SettlementForge again. Standalone, the
     default is midsummer and the season is a picker.
     **(d) CLIMATE DECIDES.** The biome's climate row gains season columns (a table, our own defaults): how cold its winter is (none,
     mild, cold, severe), the weeks of leaf colour and fall, of the growing season and harvest, of ice and snow. Arid and warm climates
     never freeze and rarely snow; a mild winter freezes only ponds and moats in its coldest weeks; a cold one freezes ponds, moats,
     millponds, lakes and slow wide rivers; a severe one freezes rivers and the harbour's edge too. The climate comes from
     SettlementForge's climate digest when present, else from its terrain type with the site's height (mountain and upland colder),
     else the user's choice.
     **(e) WATER IN WINTER.** Still water freezes first and flowing water last: ice drawn in an `ice` role with crack lines and a
     snow-dusted surface where snow lies; open leads kept at a river's fast current, weirs, mill races, springs and outfalls; the sea
     frozen only in a severe climate and only along sheltered shores. Boats drawn hauled up on the banks while their water is frozen.
     **(f) THE GROWING YEAR.** Fields, gardens, orchards, meadows and commons carry season rows by their kind: spring — fresh green and
     sown strips, orchard blossom; summer — full crops, meadows high; late summer to autumn — ripening gold, then stubble and stooks after
     the harvest weeks; winter — ploughed brown and bare fallow (under snow where it lies). Deciduous trees, hedges and vines follow the
     leaf weeks; evergreens stay. Gardens and greens follow their climate.
     **(f2) AUTUMN, A PLETHORA OF FALL COVERS — ADDED 2026-09-30 (owner: "for autumn make it a plethora of fall covers").** Autumn is
     the richest season, never one flat tint: each deciduous tree takes its own colour, drawn per tree by a keyed draw from a
     species palette (gold, amber, orange, scarlet, crimson, russet, bronze and brown, with some crowns still green in the first
     weeks), so a wood or an avenue reads as many colours at once; fallen leaves COVER the ground under and around the trees and
     drift along streets, lanes, greens, lawns, gardens, churchyards and roofs and gather at walls and kerbs, thin at first and
     deepening through the leaf-fall weeks, and float on still water near trees; creepers on walls turn red; hedges, vines and orchards
     turn; bracken on the commons goes rust and the stubble fields gold; late autumn thins the crowns toward winter's bare ones. All of
     it by the climate's leaf weeks (item 117 (d)), a look only (item 117 (a)); the leaf palettes and cover densities are table rows.
     **(g) LIGHT AND WEATHER.** The rendered sun's default height follows the week (low in winter, long shadows; high in summer) — the
     view's light only, never item 102's model-side daylight, which stays fixed so the map never changes with the season; `snow`
     weather defaults on in the snow weeks of a cold or severe climate and off in arid ones, and remains the user's to switch.
     **(h) EXPORTS, TOOLS AND CLERK.** Image and print exports draw the chosen season and name it; battle-map exports record it (ice
     is walkable ground in a severe winter, water otherwise); the editor shows the season control and a "follow SettlementForge"
     switch; the clerk explains a seasonal look ("the millpond is frozen: it is midwinter, and winters here are cold").
     **(i) BARS.** The same document hashes identically in all 52 weeks; an autumn fixture shows at least five distinct crown colours across its deciduous trees and leaf cover on the ground that deepens week by week through the leaf-fall weeks; every climate's season rows cover all 52 weeks with no gap;
     an arid fixture never draws ice or snow; a cold fixture freezes still water before flowing water and keeps open water at mill
     races and weirs; a campaign dossier opens on its own week; each season's look passes the contrast and colour-blind checks
     (item 112); switching season re-skins cached tiles within §12.5's budget.
     **HOMES:** §2.9 (view state: the year position, "follow SettlementForge"), §7.7 (the derivation row: the dossier's week and season;
     the climate's source), §8.2 (the season rows: water and ice, fields, gardens, orchards and trees through the year, snow by climate;
     the sun's default height), §4.2 S0 and §10.2 (the climate row's season columns), §11 (exports), §12.5 (the re-skin budget), §13.2
     (bars). Volumes: V07 (the village's fields, strips, commons, green and pond through the year), V08 (reading SettlementForge's
     calendar and climate), V11 (the season tables by climate and by field, garden and water kind), V09 (the season control), V10
     (the explanations), V05 (the sky islands' seasonal look), V12 (bars). Applied by the coherence pass like items 111–116 (J128).

118. **OWNER RULE — Festival decorations: procedural, purely decorative, shown in the weeks a SettlementForge festival is scheduled,
     at every tier (owner, 2026-09-30).** Owner: "and some procedural festival decorations for all levels. Note that we have festivals
     in settlementforge. so purely decorative that coincide with the week a festival is scheduled." **What SettlementForge gives
     (CONFIRMED from research/sf; the record's full field list to be read from SettlementForge's code at the pinned baseline,
     read-only, as every port read is):** `traditions[]` on the dossier (and in the custom-content traditions bucket), each festival
     with a week-bearing `window` and its staging described in prose places ("long tables set in the square"); the campaign clock
     (`calendar`: week and season); `culturalIdentity` and deities. **What the design has (CONFIRMED):** `traditions` sits on the
     port's ignore-list (research/sf/mapping.md: "nor are npcLadder, traditions, …"); no festival look exists; item 117 makes the view
     a week of the year that follows SettlementForge's calendar.
     Program's interpretation (vetoable; decided under J122):
     **(a) A LOOK, NEVER A CHANGE OF THE MAP** (as item 117): decorations never move, add or remove a building, way, wall, plot or
     water edge, never change the model or its hash; they are drawn from view state and the dossier's festival schedule.
     **(b) WHEN.** A festival's decorations show while the view's week (item 117's year position) falls inside its `window`; with the
     season following SettlementForge, a campaign map opens dressed when a festival is on that week. The user may switch decorations
     off, or preview any listed festival (view state). Standalone, with no dossier, the user may preview a small set of generic
     festivals chosen by the culture and season (spring, midsummer, harvest, midwinter).
     **(c) WHERE.** The staging prose maps to a place kind by a keyword table (square, market, green, church or temple, the deity's
     temple, river or harbour, gate, fair field, the castle), with a fallback by the festival's kind (religious → its temple and a
     procession route from it to the main square along primary ways; market or fair → the market square or fair field; harvest → the
     green and the field edge; water → the waterfront); the dossier's named places win where it names one. Never over a label's
     keep-out or a gate's passage.
     **(d) WHAT, BY TIER** (a table; our own defaults): THORP — a garland or bonfire at the heart; HAMLET — a maypole or bonfire on the
     green, garlands on doors; VILLAGE — maypole, bunting along the church lane, stalls and tables on the green; TOWN — bunting across
     streets between facing fronts, banners on the gates and the hall, stalls in the market square, lantern strings; CITY and
     METROPOLIS — the procession route lined with banners, pennants on towers and walls, pavilions and stages in the squares, lanterns
     along main ways, decorated boats on the water. Sky islands carry pennants on their rims and landings.
     **(e) PROCEDURAL AND STABLE.** Every decoration is placed by rule from the seed, the festival's id and the place (keyed draws), so
     a festival looks the same each time it is shown and in every export, and different festivals look different; its colours and
     motifs come from the culture (`culturalIdentity`) and the deity where one is named, and the season adds its own (flowers in
     spring, sheaves in harvest, evergreen boughs and lanterns in winter).
     **(f) AT EVERY ZOOM.** The city band shows the festival as colour along the procession route and pennants on towers; the district
     band adds bunting, stalls and pavilions; the neighbourhood band adds lanterns, tables and garlands; item 112's colour-blind rule
     holds (shape and pattern, never colour alone).
     **(g) EXPORTS, TOOLS AND CLERK.** Image and print exports draw the decorations shown and name the festival; battle-map exports
     draw them in the image only (never walls or obstacles); the editor lists the festivals with their weeks and the switch; the clerk
     says what is on ("the streets are hung for the Feast of the Lantern, weeks 20–21; the tables are in the market square").
     **(h) BARS.** The same document hashes identically with decorations on and off and in every week; a festival shows exactly in its
     window's weeks; the same festival draws identically across views and exports (byte-stable tiles per seed); each tier fixture
     shows its tier's kinds and no larger; staging lands on the named or keyed place, else its fallback; nothing blocks a gate or
     covers a keep-out; with no traditions and no preview, byte-identical to the base (no-op pin).
     **HOMES:** §2.9 (view state: festival display follow / off / preview), §7.7 (`traditions` moved from the ignore-list to a consumed
     input — its window and staging — with a derivation row; the ignore-list entry amended), §8.2 (the decoration rows by tier and
     band), §10.2 (the decoration table and the staging keyword table), §11 (exports), §12.5 (budget: decorations drawn lazily per
     visible tile), §13.2 (bars). Volumes: V07 (the village and smaller: maypole, bonfire, the green, the church lane), V08 (reading
     `traditions` and the custom-content traditions at the baseline; the window and staging mapping), V11 (the decoration, staging and
     culture tables), V05 (the sky islands' pennants), V09 (the festival list and switch), V10 (the explanations), V12 (bars). Applied by
     the coherence pass like items 111–117 (J129).

119. **OWNER RULE — As fast as possible; ten seconds of total time is the comfort level (owner, 2026-09-30).** Owner: "also note
     that to a suer, the difference between milliseconds and 10 seconds is negligable and both are percieved effectively as instant.
     Even more so if the longer time correlates to a better product." / "that is for total time" / "i would still ask for it to be as fast as possible but note where our comfort levels really are". **What the design has
     (CONFIRMED):** §12.3's model budgets on the one-click path (p95: TOWN 100 ms, CITY 300 ms, METROPOLIS 800 ms, laws up to 1.9 s at
     the 35 000-building cap) and §12.5's first-map law (up to ≈ 2.3 s at the metropolis cap), with two declared misses at the
     largest sizes left for the owner's veto (D-18); frame, pan, zoom and edit budgets beside them.
     Program's interpretation (vetoable; decided under J122):
     **(a) TWO LINES — REVISED 2026-09-30 (owner: "i would still ask for it to be as fast as possible but note where our comfort
     levels really are").** The TARGET is as fast as possible: §12's present laws (§12.3's model budgets, §12.5's first-map law and
     every volume's) remain the targets the build works to meet and beat. The COMFORT LEVEL is ten seconds of total time: every wait a
     user sits through once — generate, regenerate, open a map from SettlementForge, a dossier change applied, advance time and item
     113's history replay, an export, a migration — takes at most TEN SECONDS from the click to the complete result on the reference
     hardware (§12.1), at every size up to the metropolis cap; past it a wait is a failure. D-18's two misses stay declared as TARGET
     misses, now inside the comfort level (no longer a veto question).
     **(a2) LONG RUNS OF TIME — owner's choice, 2026-10-01: "Total".** Asked whether advancing time and item 113's history replay
     take the comfort level per visible step or in total, the owner chose TOTAL: an `advance` request and a history-first generation
     each complete within ten seconds from the click to the complete result on the reference hardware, like every other one-time wait.
     Where the epochs at the requested detail would not fit, the run COARSENS its cadence (fewer, longer epochs, as V06 §3.20.1 (3)
     already coarsens the replay) until its estimate fits, the cadence chosen reported; progress is shown past one second.
     **(b) SLOWER ONLY FOR A MEASURED GAIN.** A step may run slower than its target only where it buys a measured gain (a calibration
     bar met or raised, §13, V12) and stays inside the comfort level, recorded as such (the step, its cost, its gain); nothing is made
     slower otherwise, and the build keeps pressing every path toward its target.
     **(c) FEEDBACK DURING THE WAIT.** A wait beyond about one second shows progress — the stage by name and the map filling in —
     and never an empty screen; the first picture is still always complete, never a rough preview (§8.5).
     **(d) INTERACTION STAYS FAST.** Moment-to-moment feedback is not total time and keeps its budgets: pan and zoom at frame rate,
     dragging a handle and a tool's live preview, hover and click-to-inspect, undo and redo, the season and festival switches.
     **(e) LOW-END DEVICES.** The low tier (§12.1) aims at the same ceiling; a size it cannot reach within it is declared per device,
     as today.
     **(f) BARS.** §12's target laws measured and reported at every rung; every one-time wait at every rung within the ten-second
     comfort level on the reference hardware; progress shown past one second; every step slower than its target tied to its recorded
     measured gain; interaction budgets unchanged.
     **HOMES:** §12 (the targets kept, the comfort level, the measured-gain rule, the progress rule; D-18 re-declared inside the comfort level), §1 (the performance statement), §13.2 (bars),
     the judgment index. Volumes: V06 (advance time and the history replay within the ceiling), V07 (§6's village budgets), V09 (the
     progress view), V01–V05 (their budget sections read the ceiling for their one-time waits and keep their interactive ones), V12
     (bars and how they are measured). Applied by the coherence pass like items 111–118 (J130).

120. **OWNER RULE — Find: a filter view that picks out institutions, places and areas with a halo-like glow, across every zoom
     and layer, until closed (owner, 2026-10-01).** Owner: "a filter view for specific institutions in a map. What it looks like is
     that if a user just wants to find where all of the blacksmiths are and not have to search for themselves, the map should already
     reference what's in the dossier and have a list of the institutions or districts or neighborhoods or whatever, they can type it
     in or quick [dictation: pick] what they're looking for, and it would have an auto fill feature. When they click it and it's also a grid like you
     can select multiple things and deselect them, the map would turn slightly opaque and the plots of land, whether you're in the city
     view or the neighborhood view turned into producer. He look like [dictation, the owner's correction below: produce a halo-like glow]
     effect on the plots that are being asked to find. This process even if
     you're going through different layers. Until you decide to close the filter or deselect everything." / asked what the effect
     was: "I meant to produce a halo like glow effect" / asked to confirm the shape below (the list from what the town holds, the
     type-ahead, the chip grid, the veil and the halo, pins at the city zoom, persistence across zooms and layers, the knowledge
     filter, Coverage folded in, the clerk and exports): "And yes". **What the design has (CONFIRMED):** `query({ kind: 'gazetteer',
     text, kinds })` with knowledge admission on every answer (§11.2); the class rows' display labels and synonyms (V11 §2.3), already
     matched by the roster reader (V09 §4.16); the Show menu's thematic views as live-layer providers, among them **Coverage** (a
     selected class's districts with and without a member, V09 §5.4); the People panel's "Where is" (V09 §4.18); View as (V09 §4.8);
     item 112's second-cue rule; item 116's zoom ceiling.
     Program's interpretation (approved by the owner's "yes", 2026-10-01; its defaults vetoable under J122):
     **(a) A VIEW, NEVER A CHANGE.** Find never changes the model, the document, its hash or the edit log; it is per-viewer view
     state (view key `find`: the chips and the gaps switch), kept while the viewer zooms, pans, changes layer, changes the season,
     advances time or edits, saved in view pins like the other view keys, and ended only by **Clear** (deselect everything) or
     closing the panel.
     **(b) THE LIST — FROM WHAT THE TOWN HOLDS.** The Find panel lists what this document contains at the view's effective key, by
     the gazetteer query: institution kinds present, each with its count ("Blacksmith · 4"); named institutions (the dossier's names
     first, as SettlementForge gives them); districts, neighbourhoods and quarters; named places (squares, gates, temples, bridges,
     harbours); people, through "Where is" (home and work). Nothing the town lacks is offered. With the box empty, the panel shows the
     institution kinds as a browsable grid, grouped (crafts, trade, faith, rule, defence, learning, health, lodging, the rest; V11's
     groups).
     **(c) TYPE-AHEAD.** As the user types, suggestions match display labels, V11's synonyms ("forge", "smithy" → Blacksmith),
     the dossier's names and the place names — prefix and whole-word matches, one-letter typos forgiven in words of five letters or
     more — grouped by kind with their counts; arrow keys and Enter add the highlighted suggestion as a chip. A word matching several
     kinds ("smith": black-, silver-, gold-, locksmith) offers each and an "all smiths" chip.
     **(d) THE CHIP GRID.** Each selection is a chip in a grid; click to add, click again (or its ×) to deselect; any number at once,
     shown as their union. Each chip has its own colour from the thematic palette and its own second cue (a glyph on its pins, a
     dash pattern on its halo's outline, item 112); past eight chips the colours repeat and the glyph tells them apart.
     **(e) THE LOOK — THE VEIL AND THE HALO.** While any chip is on, everything else lies under a veil (the style's paper colour at
     α 0.55; our default) — the "slightly opaque" map; every match is drawn above the veil at full strength with a HALO-LIKE GLOW
     (owner's words): a soft outer glow in its chip's colour fading to nothing over about 8 px of screen, inside a 2 px outline,
     its label kept above the veil. An area chip (a district, neighbourhood or quarter) lifts the whole area from the veil and glows
     along its boundary. At the city zoom, where a plot is under about 6 px, each match also carries a pin with its chip's glyph,
     and pins closer than about 24 px merge into a count bubble ("12") that zooms in when clicked — so a match is never a lost speck
     (with item 116's ceiling).
     **(f) ACROSS ZOOMS AND LAYERS.** The filter holds from the city band to the interior band and on Ground, Below and Sky: matches on
     the layer shown glow; matches on another layer show as faint ghost pins where they lie, and the panel says "2 more Below" / "1 on
     Sky" with **Go there**; at the interior band, the rooms an institution uses glow. Every commit, regenerate, undo, advance of time
     and season change re-evaluates the chips at once — a new smithy glows as it appears, a closed one goes dark.
     **(g) THE RESULTS.** Under the chips, the matches are listed (name, kind, district) with **Go to** (flies to the band that shows
     it), **Next** and **Previous** (keyboard too), and each chip's count.
     **(h) WHAT THE VIEWER MAY KNOW.** The list, the suggestions, the counts, the glow, the pins and the ghost pins all pass the same
     knowledge admission as every query (§11.2, View as V09 §4.8): a thing the key withholds is never suggested, counted, drawn or
     hinted at — in a player view, a concealed Thieves' Guild is not in the list.
     **(i) ONE MECHANISM.** The Show menu's **Coverage** view becomes Find's **Show gaps** switch (for each chip's class, the districts
     or catchments with none: outlined dashed and labelled "none here"), so the two never coexist; Find draws over whichever Show view
     is on. The clerk's "show me the blacksmiths" sets the chips (a view action, never an edit) and it can say what Find shows. A
     picture export draws Find as shown, with the chips in the legend (a player handout: "where the smiths are"); battle-map exports
     leave it off unless asked.
     **(j) SPEED.** Interaction, not total time (item 119 (d)): suggestions within about 50 ms of a key, a chip's glow drawn within
     about 100 ms of the click; Find is an overlay provider and never re-renders the base tiles; its index is rebuilt once per commit.
     The phone shows the panel as a bottom sheet under V09's phone policy.
     **(k) BARS.** The document hashes identically with Find on and off; turning everything off restores byte-identical tiles; each
     chip's matches equal the gazetteer query's rows at the key; the knowledge canary (T-V9-66's fixture) never surfaces in a
     suggestion, count, glow or pin under a player view; the filter survives every band and layer change and every commit, advance and
     undo; at the city band every match has a pin or a bubble; every chip has its second cue; the interaction budgets of (j) hold at
     the metropolis cap.
     **HOMES:** §2.9 (the view key `find`, outside the document and its hash), §8.2 (the veil, halo, outline, pin and bubble rows;
     second cues), §9.5 (the Find tool among the furniture and tools), §11.2 (the gazetteer's class counts and match listing by class,
     area and layer, under knowledge admission), §11.1 (picture exports draw it), §12.5 (the overlay's budget), §13.2 (bars), the
     judgment index. Volumes: V09 (the Find panel, type-ahead, chip grid, results, the `live.find` overlay provider, Coverage folded
     into Show gaps, the phone sheet), V11 (the labels, synonyms and groups as the search lexicon), V08 (the dossier's names as list
     entries), V10 (the clerk's "show me" sets the chips), V01 (districts, neighbourhoods, quarters and catchments as area targets and
     gaps), V03 (the rooms an institution uses, at the interior band), V04 and V05 (ghost pins and matches on Below and Sky), V07 (the
     village and smaller rungs), V12 (bars). Applied by the coherence pass like items 111–119 (J133).

121. **OWNER RULE — A resolution adjuster, automatic and manual; Auto the default; the live view up to 4K (owner, 2026-10-01).**
     Owner: "there needs to be a resolution adjuster both automatic and manual since we are asking to use GPU. I would like for it
     to go as high as HD or 4k but I'll leave that decision to you. Default should be set to an autoadjustment. What are your
     thoughts?" / asked to confirm the shape below: "both and the above are yes". **What the design has (CONFIRMED):** §8.8's
     hardware tiers (low, mid, high), each with a canvas ceiling (72 / 128 / 192 MB) and a tile-DPR cap (1 / 2 / 3); the tile DPR is
     the device's pixel ratio capped by the tier and stepped down (3 → 2 → 1.5 → 1) until §8.8's canvas need fits; the tier picked
     once at app start from `bench/calibrate` (§12.1) and the device memory, overridable only in the advanced panel and shown with
     the tile DPR in the view status (J-R22); §8.4 (g)'s light ladder (the GPU pass at the tile DPR → a half-resolution global term →
     the vector rung); exports at any DPI (§8.7). By §8.8's formula a native 4K view (3 840 × 2 160 device px, P = 54) needs about
     169 MB unlit (inside the high tier), about 257 MB lit and about 399 MB at full precision (beyond every tier).
     Program's interpretation (approved by the owner's "yes", 2026-10-01; its numbers our defaults, PLAUSIBLE until M2b's canvas
     measurement, vetoable under J122):
     **(a) THE SETTING.** Settings › Display › **Resolution**: **Auto** (the default) · **4K** · **1440p** · **1080p (HD)** · **720p**,
     device state (`AppPrefs.resolution`), never in the document, its hash or the log; a map opened on another machine takes that
     machine's setting. A manual level sets the tile DPR d = min(the device pixel ratio, the level's height ÷ the screen's height in
     CSS px), rounded down to the ladder 3 · 2 · 1.5 · 1 · 0.75 · 0.5 (the two steps below 1 are new: tiles drawn below CSS density
     and scaled up). Levels above the screen's own resolution are shown greyed ("your screen is 1440p"). The view status shows the
     level in force ("Auto · 1440p"), its tooltip saying why Auto chose it.
     **(b) THE CEILING — 4K FOR THE LIVE VIEW (the owner left it to us).** The live view never draws more than the 4K pixel count
     (3 840 × 2 160 ≈ 8.3 million device px for the whole view); a larger screen (5K, 6K, 8K) draws at the 4K-equivalent tile DPR and
     is scaled up — invisible at map-viewing distance, at a half to a quarter of the graphics memory. Exports are not bound by it
     (§8.7's any DPI stands).
     **(c) A TOP TIER SO 4K IS REAL.** A fourth hardware tier, **ultra** — canvas ceiling 512 MB, tile-DPR cap 3 (under (b)'s
     ceiling) — chosen at app start by `bench/calibrate` only where the device reports the memory and the benchmark clears the
     tier's bar, so a strong GPU holds native 4K with the light pass on, at full precision.
     **(d) AUTO ADJUSTS LIVE.** Beyond the start-up pick, Auto watches frame times: a frame-time p95 over the tier's frame budget
     (§12.5: 60 fps on the reference and higher tiers, 30 fps on the low tier) through 2 s steps one rung down; a p95 under 60 % of the
     budget through 10 s, with the canvas need fitting, steps one rung up. A change is applied only when the view settles (§8.8's
     settle after a gesture), never during a pan, zoom or drag, and at most once every 10 s, so nothing flickers; a change of the
     device pixel ratio (the window moved to another monitor) re-evaluates at once.
     **(e) WHAT AUTO GIVES UP, IN ORDER.** The frame rate is protected first; then Auto gives up lighting detail (full precision →
     the standard surface → §8.4 (g)'s half-resolution global term), then sharpness (the tile-DPR steps down to 1), then the light
     pass (the vector rung), then the steps below 1. **Labels, text, the chrome and every overlay (the halo of item 120, the
     handles, the ghost) are always drawn at the device's full pixel ratio**, whatever the level: only the map's painted tiles soften.
     **(f) A MANUAL CHOICE HOLDS.** Choosing a level turns Auto off; where the device cannot hold that level's canvas need, the view
     draws the nearest level that fits and says so ("4K needs more graphics memory than this device has; showing 1440p") — never a
     refusal, never a crash.
     **(g) EXPORTS ARE UNAFFECTED.** A picture, print or battle-map export is byte-identical whatever the display setting.
     **(h) BARS.** Auto is the default on a fresh install; no level change during a gesture; at most one change per 10 s on a
     fixture loaded at its threshold (no oscillation); Auto holds the frame budget's p95 on the reference and low devices over
     §12.5's reference views; a manual level is honoured or its explanation shown; labels and chrome at the device pixel ratio at
     every level (a pixel test); exports byte-identical across settings; a pixel-ratio change re-evaluates; native 4K lit at full
     precision on the ultra tier within its 512 MB.
     **HOMES:** §8.8 (the setting's ladder, the steps below 1, the ultra tier, the 4K ceiling, the live Auto loop), §8.4 (g) (the
     order of what Auto gives up), §12.1 (calibration picks ultra), §12.5 (the frame budgets the loop holds; the settle rule),
     §12.8 (memory per tier, ultra included), §13.2 (bars), the judgment index. Volumes: V09 (Settings › Display, the view-status
     chip and its why, the message of (f), `AppPrefs.resolution`), V12 (bars and how each is measured). Applied by the coherence pass
     like items 111–120 (J134).

122. **OWNER RULE — Crisis looks: SettlementForge's stressors and conditions drawn while they last, purely cosmetic (owner,
     2026-10-01).** Owner: "We have some stressors in settlement forge such as siege, disease outbreak, mass immigration, under famine,
     beast and raider effect, disaster, etc that could benefit from some cosmetic visuals. for example, for a siege, having some
     generated military camps and siege apparatuses outside of the settlement, for mass immigration, having something like a bunch of
     tents in hte outskirts of the city, for disease having a dedicated and segrated area outside of the city for plagued citizens, for
     disaster, random combination of whole neighborhoods all having a temporary ruined cosmetic state, for famine, if any fields are
     shown then having them be bare, etc. What do you think?" / asked to confirm the shape below: "both and the above are yes".
     **What SettlementForge gives (CONFIRMED from research/sf; the full type lists to be read from SettlementForge's code at the
     pinned baseline, read-only, as every port read is):** `stressors` (fifteen types, fourteen seen in the census), normalised by
     the port into `conditions[]`; `activeConditions[]` (archetype, severity, status, its tick and duration — war_pressure, famine,
     plague, regional_migration_pressure, rebellion, occupation, reconstruction, boom, bust, resource_strike, vein_exhausted and the
     regional_* archetypes); `calamityHistory[]` (type, tick, deaths, exodus, `targets`); the simulator's PLAGUE, REFUGEE_WAVE and
     RAID_OR_MONSTER_ATTACK events. **What the design has (CONFIRMED):** the port writes each condition on a `ConditionOverlay`
     (§2.7: archetype, severity 0–1, sinceWeek, untilWeek; no geometry), read today only as item 67's share of buildings in Works;
     calamities go to V06's hazard phase through `EpochInputs.events` (DR28); item 118's decoration engine (keyed placement, staging
     by place kind, never over a keep-out or a gate's passage, a look only).
     Program's interpretation (approved by the owner's "yes", 2026-10-01; its defaults vetoable under J122):
     **(a) A LOOK WHILE IT LASTS; THE AFTERMATH IS REAL.** A crisis look never moves, adds or removes a building, way, wall, plot or
     water edge and never changes the model or its hash; it is drawn from the `ConditionOverlay`s standing in the view's week (item
     117's year position, following SettlementForge's calendar). What the crisis LEAVES — deaths, ruined institutions, a burned
     quarter, settled newcomers — reaches the map only by the existing path (the calamity and the population change into the next
     epoch, V06's hazard phase and growth), so the look hands over to the real thing: a disaster's ruined look gives way to the Works
     scaffolding of `reconstruction`; a refugee camp is placed where V06's growth frontier would build, so newcomers who stay become
     the next epoch's suburb.
     **(b) THE CLOSED TABLE.** Every SettlementForge stressor type and condition archetype has one row — a look or an explicit "no
     look" — so nothing falls through; our default looks: **siege** (war_pressure with a siege, the siege stressor) — besiegers' camps
     beyond bowshot (≈ 300 m from the walls), a line of trenches and earthworks round the town, siege engines facing the gates or the
     weakest wall stretch (item 114's), burned farmsteads outside; an unwalled place gets blockade camps on its approach roads;
     **mass immigration** (regional_migration_pressure, REFUGEE_WAVE) — a tent and shanty camp on common or fallow land along the main
     approach road by a gate, carts and cooking fires, its size by the arrivals; **disease** (plague) — a fenced quarantine camp
     outside the town with huts and a pest-house, fresh grave rows and smoke, and inside, at the neighbourhood band, marked doors in
     the affected quarter and a cordon; **famine** — fields bare and withered (overriding item 117's crop stage), empty pens, shuttered
     market stalls; **beast attack** — torn palisade sections, watch-fires along the edge, stake barricades; **raiders** — burned
     outlying farms, smoke, abandoned carts, barricaded roads; **disaster** — whole neighbourhoods in a temporary ruined state, the
     share by severity, the pattern by the disaster: fire spreads through contiguous blocks downwind, flood takes the low ground by
     the water (the terrain raster), earthquake scatters; the calamity's `targets` win where the dossier names the place hit;
     **occupation** — foreign banners on gates and keep, a garrison camp; **rebellion** — street barricades; **boom** — scaffolding;
     **bust** — shuttered shops; the regional_* pressures — no look (nothing physical).
     **(c) PROCEDURAL AND STABLE.** Every element is placed by rule from the seed, the condition's id and the place (keyed draws, as
     item 118 (e)), so a crisis looks the same in every view and export; the scale follows severity and tier (a hamlet gets a war
     band's camp, a city a full siege line); several crises at once share the outskirts by priority (the siege camp, then the
     quarantine camp, then refugees) under a density cap; never on water, a gate's passage or a label's keep-out.
     **(d) AT EVERY ZOOM.** The city band shows camps as clusters, the siege line, smoke and the ruined neighbourhoods' tone; the
     district band adds engines, tents and fences; the neighbourhood band adds marked doors, rubble and detail; item 112's second
     cues hold. Interiors in a disaster's ruined neighbourhood show item 123's damage as a look while it lasts.
     **(e) SWITCH, PREVIEW, KNOWLEDGE.** A **Show crises** switch (on by default); a manual crisis preview for maps without a dossier
     (as item 118 (b)); a condition the viewer's key withholds is not drawn (View as, §11.2's admission).
     **(f) EXPLAINED, FOUND, EXPORTED.** The "Why?" card and the clerk name the crisis and its weeks ("Refugee camp: the Northmarch
     migration, weeks 12–20"); Find (item 120) lists the crisis looks; picture exports draw them; battle-map exports draw them in the
     image only, never as walls or obstacles.
     **(g) BARS.** The same document hashes identically with crises on and off and in every week; each look shows exactly in its
     condition's weeks; byte-stable per seed across views and exports; every SettlementForge type and archetype has its row; tier
     and severity scaling; nothing on water, a gate's passage or a keep-out; with no condition and no preview, byte-identical to the
     base (no-op pin).
     **HOMES:** §2.7 (`ConditionOverlay` read for the look; nothing added to the model), §7.7 (the derivation row: every stressor type
     and archetype → its look kind; knowledge admission), §10.2 (the crisis look table and its placement rules), §8.2 (the look rows by
     tier and band), §11 (exports), §12.5 (budget: drawn lazily per visible tile), §13.2 (bars). Volumes: V08 (reading every stressor
     type and archetype and the calamities' targets at the baseline; the closed mapping), V11 (the look, symbol, scale and placement
     tables), V06 (the hand-over: aftermath through the epoch path; the camp at the growth frontier; reconstruction as Works), V01
     (neighbourhoods as disaster targets; the outskirts' common land), V02 (the ruined look of a disaster's buildings), V03 (item
     123's damage as a look inside them), V07 (the village and smaller rungs), V09 (Show crises, the preview, the why lines, Find),
     V10 (the explanations), V12 (bars). Applied by the coherence pass like items 111–121 (J135).

123. **OWNER RULE — A ruined building's floor plans show its ruin, and are the SAME plans amended, never redrawn (owner,
     2026-10-01).** Owner: "if you have a buiilding in a ruined state, make sure that hte floor plans generated also have things like
     dilapiated floors, broken rooms etc. If it was priorly generated, then the same generated floorplans have to be amended rather
     than redrawn as new. what do you think?" / "both and the above are yes". **What the design has (CONFIRMED):** `Existence`
     (§2.7: generated · built · altered · converted · abandoned · decayed · ruined · cleared · reused · demolished); V03 §5.1 already
     draws a `decayed` or `ruined` building's plan as "a drawing of the same plan" — fallen walls as broken ink over rubble stipple,
     open rooms without labels (§2.6 step 7, §8.6) — uniformly, with no floors, no partial damage and no progression; a collapsed
     access head drawn as a trace with rubble (V03 §5.3).
     Program's interpretation (vetoable; decided under J122):
     **(a) ONE PLAN, DAMAGED.** A building's floor plans are derived once from what it was built as (its built band and era) and
     never re-derived because it decays: ruin is a damage layer over the same plan — every room, wall, opening and id unchanged
     (V03 §2.2's identity). A building first met already ruined (generated as a ruin, or reached by item 113's history replay) still
     gets the plan it had when built, then its damage, so scrubbing history shows one plan aging.
     **(b) PROGRESSIVE AND MONOTONE.** Each plan element (each wall run, floor area, door, window, stair, roof bay over a room,
     furniture piece) draws ONE keyed threshold (by lineage and element id); the building's **decay level** (0–1, from its
     existence state and the years since it was abandoned, V06; timber rotting faster than stone, V11) shows every element whose
     threshold it has passed. Damage therefore only accumulates as decay goes on and is never relocated: what was broken stays
     broken in the same place. Restoration (`reused`, a repair) lowers the level and the damage leaves in reverse order, a repaired
     element drawn in patch material (item 114's patchwork).
     **(c) WHAT IT LOOKS LIKE.** `abandoned` — dust and debris, broken furniture, doors off their hinges; `decayed` — rotten floor
     patches and holes, partition walls down, roof holes open to the sky, some rooms marked unsafe; `ruined` — outer walls broken,
     upper storeys mostly floorless (fragments over the void), rubble heaps, the ground floor the only walkable storey, cellars and
     crypts intact or partly collapsed by their own thresholds (a ruined church keeps its crypt, V03 §5.1).
     **(d) INSIDE AND OUTSIDE AGREE.** The building band's exterior (V02) draws the same damage — a roof hole over a room is a hole in
     the roof seen from above, a broken outer wall a gap in the footprint's outline.
     **(e) EXPORTS AND PLAY.** Battle-map exports follow the damage: a fallen wall run leaves line-of-sight; a doorless opening is a
     gap; rubble heaps and floor holes are drawn in the image (never invented as walls); the panel and the clerk say it ("roof fallen
     in over the hall; the upper floor is gone").
     **(f) BARS.** Room, wall and opening ids identical between the intact and the damaged plan; damage monotone in the decay level
     (a higher level's damage ⊇ a lower's, on every element); the same element breaks at the same level for a given seed; restoring
     reverses it; the exterior agrees with the plan; exports' line of sight follows fallen walls; a building never decayed is
     byte-identical to today's plan (no-op pin).
     **HOMES:** §2.6 (step 7: the damage layer on the same plan), §6.3 (the keyed thresholds by lineage and element id; no new ids),
     §8.6 (drawing), §11.1 (battle-map walls, portals and line of sight), §13.2 (bars). Volumes: V03 (the damage layer, its drawing,
     the plan's exports, the panel lines), V06 (the decay level over time; restoration), V02 (the exterior agreeing), V04 (cellars,
     crypts and underground buildings), V11 (the thresholds' tables by material and element kind), V09 (the panel lines), V10 (the
     explanations), V12 (bars). Applied by the coherence pass like items 111–122 (J136).
