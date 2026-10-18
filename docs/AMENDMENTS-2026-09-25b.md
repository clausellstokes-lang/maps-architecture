# Amendments received during the fix-all pass (2026-09-25, evening)

Owner rules received while workflows/06-fix-all.js was running. Apply AFTER it completes with
`Workflow({ scriptPath: ".../workflows/04-amendments.js", args: { amendmentsFile: "docs/AMENDMENTS-2026-09-25b.md", fableModel: "opus" } })`
(stand-in marked for Fable review while Fable is unavailable). Numbering continues from docs/AMENDMENTS-2026-09-25.md.

8. **Decline and regrowth are part of evolution (hooks now; the evolution engine stays roadmap-staged).** Owner: "consider
   what regression would look like … what if something happens that forces it to shrink organically … it's this
   combination of growth, regression and growth where appropriate." The owner's war example is hypothetical and NOT to be
   written into the design. Requirements for the hooks: (a) entity lifecycle states include decline — occupied → vacant →
   derelict (roofless) → ruin → robbed/cleared (footprint trace) → reused (garden, orchard, field, or a new building on the
   old foundations); walls and gates: in use → neglected → breached/partly dismantled → superseded by a shorter inner ring
   (the old ring's line persists); (b) decline TENDS to strip the fabric in persistence order — uses first, then buildings, then
   plot boundaries (vacant plots merge into gardens and fields); street lines and wall lines usually persist longest;
   terrain and water change only slowly and rarely (see item 25) — tendencies with weights and chance, not fixed laws; (c) where decline strikes first is WEIGHTED by drivers, not a fixed order — undefended
   suburbs, marginal ground (low, damp, flood-prone, downwind, near noxious trades) and the intramural periphery are more
   exposed, the core around markets, churches and castle more resilient, but causes vary and chance plays a part; fields
   and gardens may go on being worked after the dwellings beside them are gone; the prosperity field contracts and may concentrate (surviving households absorbing
   neighbouring plots); (d) salvage: cleared buildings supply material to nearby repairs and new building (a material
   ledger), so cleared zones appear near active building; (e) regrowth reoccupies the old plan first — old plots and street
   lines are refilled before new growth passes the old circuit; (f) population drives it with lag and memory: built extent
   follows population with a vacancy lag on the way down and quick reoccupation on the way up; (g) everything stays
   deterministic from the same seed and circumstance timeline, ruins keep their ids, nothing is re-rolled; (h) the style
   system has classes for vacant, derelict, ruined, robbed and reused fabric and for superseded walls.
9. **Size is set by population, even within each tier.** Owner: "the actual size of the town, even within each tier is
   determined by population." The tiers (thorp/hamlet/village; town/city/metropolis) are population bands, not fixed
   sizes: extent, building counts, plot demand, walls, districts and greenery scale continuously with the population
   inside a band; parity comparisons map a population to the reference size with the same building count.

10. **Floating islands are a product of prosperity (magic is a supplied resource).** Owner: "Floating islands are also a
    product of prosperity. If there is no prosperity, there is no floating islands. Because we consider magic to be a
    resource that needs to constantly be supplied so the size of an island correspond to prosperity both of the
    neighborhood and the overall city respectively." Requirements: islands exist only where prosperity supports them
    (none without it); an island's size is a function of BOTH the prosperity of the neighbourhood it carries and the
    prosperity of the whole city; the rule lives in the same rule tables as coverage, plot granularity and greenery and
    reads the same prosperity field. PROPOSED by the program (vetoable, not owner-stated): because supply is continuous,
    an island responds to decline in the evolution stage — it loses area and altitude as prosperity falls, and below the
    supporting threshold it is abandoned and settles or falls, leaving a ruin; regrowth can raise a new island.
11. **The underground fades like the walls.** Owner: "Sewer systems and the underground like the walls fade slowly,
    rather some tunnels simply cave in or become decommissioned rather than intentionally taken down by populations."
    Requirements for the sewer/underground layer's lifecycle: in use → neglected (silted, unmaintained) → partly caved
    in → collapsed or decommissioned (sealed, abandoned) — never deliberately demolished; abandoned tunnels persist as
    underground ruins that later growth may reopen or reuse; decline follows the same drivers and lag as the surface
    (population, prosperity, persistence order), with the underground the slowest layer to change after terrain.

12. **Underground neighbourhoods along the sewers.** Owner: "Some sewer systems will have underground neighborhoods, or
    buildings … each plot can only occupy an adjacent space next to a sewer line (there are no sewer alleys for example)
    and the buildings are also adjacent flush against the external wall of the sewer. Rule should be given that governed
    how they are generated." Owner requirements: underground plots exist ONLY as frontage plots along a sewer line; no
    access-only tunnels ("sewer alleys"); buildings sit flush against the sewer's outer wall. PROPOSED RULE SET (program,
    vetoable): (a) the tunnel is the underground street — plots are strips along a tunnel segment on either side, limited
    in depth (one to two rooms), with corner plots at junctions; no plot reaches a second tunnel; doors open only onto the
    tunnel; (b) only navigable tunnels qualify (the fantasy sewer preset and large trunk sewers), never small drains — so
    the restrained historical preset has few or no underground quarters; (c) the surface constrains the underground: no
    rooms under rivers, the harbour or below the water table (low, damp ground stays empty or floods), none under walls,
    gates, the castle keep or cathedral foundations; an underground room lies under public ground (streets, squares) or
    yards, or under a surface building only as that building's own cellar or undercroft; (d) access by stairs and shafts
    at chosen points (street stairs, wells, cellars of surface buildings), at least one per underground neighbourhood,
    plus air and light shafts at a set spacing; (e) who lives there follows the same rule tables and prosperity field:
    mostly the poor and those with reasons to hide, plus specialised vaults (cellars, cold stores, breweries, crypts,
    guild halls); crowding on the surface pushes growth underground; poor stretches are many small cells, institutional
    stretches a few large vaults; (f) lifecycle as the sewers: neglect, flooding and cave-ins close segments, and their
    frontage plots become sealed or ruined; later growth may reopen them; (g) every underground building carries depth and
    ceiling height and is drawn on its own level (its own virtual-tabletop level); (h) order of generation: city → sewer
    network → underground plots and buildings, all from the same seed, all editable.

13. **Floating islands only in cities and metropolises.** Owner: "floating islands be limited only to cities and
    metropolises." The island toggle is unavailable for towns and for every village tier (thorp, hamlet, village); it
    applies only to the CITY and METROPOLIS population bands, and within them the prosperity rule of item 10 still
    decides whether islands exist and how large they are. In the evolution stage, a settlement that falls below the city
    band can no longer sustain islands (they follow the decline behaviour proposed in item 10); one that grows into the
    city band may gain them once prosperity allows.

14. **Sewers by tier.** Owner: "Sewers can exist in towns though more rare and then becomes a necessity for cities and
    Metropolis." Rule: sewers are optional and uncommon in TOWNS (a probability that rises with population and prosperity
    within the town band, never certain); in CITIES and METROPOLISES a sewer network is always present — the sewer
    toggle then only controls whether it is SHOWN, not whether it exists (the city's drainage, outfalls, plot rules and
    underground neighbourhoods depend on it). Village tiers (thorp, hamlet, village) have no sewers. Underground
    neighbourhoods (item 12) follow: rare in towns (only where a navigable sewer exists), possible in cities and
    metropolises.
15. **Not every city has islands.** Owner: "not all cities or Metropolis have floating islands." Refines items 10 and 13:
    being a city or metropolis makes islands POSSIBLE, never guaranteed; whether any exist, and how many (0–3), is drawn
    from the seed and weighted by prosperity — a poor city has none, a rich one may have none or several. The island
    toggle shows islands where the settlement has them; it does not create islands the settlement cannot sustain.

16. **Assignments obey spatial and supply-chain rules.** Owner: "when it comes to neighborhood assignments and building
    assignments, this is after you already built the city, make sure that there are rules or templates of rules in place
    for their respective spatial relations with other buildings, supply chains, etc." Requirements (the assignment layer
    of the SettlementForge phase; the base carries the rule machinery now): (a) RELATION RULES as data templates per
    building/neighbourhood type — adjacency, proximity and avoidance to other types (e.g. near / far from / adjacent to /
    same street as / clustered with), environmental relations (upwind / downwind, upstream / downstream, near water,
    high / low ground), access (frontage on a road class, near a gate, the market, the harbour), capacity (plot size and
    shape) and prosperity band — each marked HARD (must hold) or SOFT (weighted preference); (b) SUPPLY CHAINS from the
    same data-driven resource/dependency graph the demand stage uses (inputs, outputs, how far each may travel and by what
    mode — street, river, sea), so a placement scores its distance to suppliers and customers and an assignment can
    propagate needs (a new brewery requires a grain and malt supply; a tannery requires water, bark and a downstream,
    downwind edge site); (c) the PLACEMENT SOLVER uses these rules both during generation and for assignments made after
    the city is built: it picks the plots that satisfy the hard rules and score best on the soft ones, joins plots where
    the assigned use needs more land, and relocates displaced uses by the same rules — as a local, recorded repair, never a
    whole-map redo; when no plot satisfies the hard rules it says so and offers the closest options instead of breaking a
    rule silently; (d) the rule templates are editable and later calibrated against the historical corpus (e.g. trades
    clustering on named streets, noxious trades at the edge and downstream, inns at gates and on main roads, warehouses at
    the harbour, bakeries near mills and granaries, smithies away from thatch, the cathedral and market central).

17. **Assignments and uses move as the city grows and declines.** Owner: "assignments can change as cities grow and
    decline — a shop may close down here but reopen over there organically, and according to distribution."
    Requirements (evolution stage; hooks in the base): (a) uses (shops, workshops, inns, institutions) are separate from
    the buildings that house them, so a use can close in one building and open in another while the building persists
    (vacant, re-let, converted); (b) each epoch re-scores the town's uses against the same relation rules and supply
    chains (item 16) and the current distribution of population, prosperity and demand: uses whose catchment empties or
    whose suppliers vanish close or relocate; new demand opens uses where the rules score best — organic relocation
    follows distribution (e.g. markets and shops drift toward where people now live, inns toward the busiest gate);
    (c) relocation is a recorded event (closed here, opened there) with inertia — uses do not move for small score
    changes, and old buildings keep traces of former uses (a former inn, a guildhall turned tenement) that later regrowth
    can revive; (d) OWNER/HOST ASSIGNMENTS (from SettlementForge) are stable identities that move with their use: an
    assigned business may relocate or close under the same rules unless the assignment is PINNED in place, in which case
    it stays and the rest of the town adapts around it; every such change is reported; (e) same seed and same
    circumstance timeline give the same history of openings, closings and moves.

18. **A plot's buildings MUTATE to match a new designation.** Owner: "if a new plot is assigned, then the buildings can be
    regenerated appropriately to match the actual designation of the building" — clarified: "it is a mutation of its
    previous design to the newest design, with additions and subtractions." Refines item 17(a). Rules: (a) a change of
    designation (host assignment, user edit, or relocation) never replaces the plot's buildings with a fresh roll: the
    new design is DERIVED from the previous one by a recorded set of additions and subtractions — keep every part that
    still fits the new use, add what the designation needs (a forge and yard for a smith, stables and a court for an inn,
    a storefront for a shop, an extra wing or floor where the size budget grows), remove or convert what no longer fits —
    driven by the plot's own seed stream for that step, so continuity is visible (the old house is still recognisable
    inside the new workshop); (b) the mutation is local: the plot keeps its identity, neighbours are untouched unless the
    rules join a neighbouring plot; (c) timing: a host or user assignment applies the whole mutation immediately; in the
    EVOLUTION stage the same mutation is spread over epochs as recorded events (occupy if compatible, then adapt, extend,
    and only rebuild parts that cannot be adapted); (d) locks and user edits survive — locked parts are never subtracted;
    (e) deterministic and reversible: the same designation change from the same state gives the same mutation, and
    changing the designation back applies the inverse mutation, restoring the earlier design where nothing else changed.

19. **Every designation scales with prosperity.** Owner: "a town has multiple blacksmiths dispersed across different bands
    of prosperity. They should scale appropriately in size and structure … this goes for all of the buildings across
    prosperity bands." Rules: (a) each designation (blacksmith, inn, bakery, church, house, guildhall …) has a
    PROSPERITY-SCALED TEMPLATE in the rule tables — size budget, number and kind of structures (main building, workshop,
    yard, stables, outbuildings), storeys and heights, materials and roofing (emulation baseline: FTG sets one default material per stage, overridden per district and per
    building type — e.g. temples always stone — with wealth expressed through lifestyle pools and roof colour; MFCG uses one
    roof role with per-building variation and district tints; DEFAULT: that FTG model; our optional regional table may
    shift materials with prosperity within what the region builds with — never a universal ladder; a MATERIAL IS A
    RENDERING ATTRIBUTE ONLY (owner, 2026-09-26: "different materials for construction is only represented by a change in
    texture or color. It has nothing to do with the shape") — it changes texture and colour and never footprint, wings,
    storeys, heights or roof form, exactly as in FTG, where the same geometry renders in any material; shape is decided only
    by the designation template and prosperity), frontage treatment (lean-to stall → shopfront → arcaded front), court and garden, and specialisation (a
    poor-quarter smith is a farrier or nail-maker in a lean-to forge; a middling one a general smithy with a yard; a rich
    one a master armourer or cutler with a storefront, a court and journeymen's rooms); (b) the template is interpolated
    along the continuous prosperity field (item 6), with bands only where a discrete choice is needed, so two smiths a few
    streets apart differ by degree, not by switch; (c) it applies to EVERY building type and to every path that creates or
    changes a building — generation, host assignment, relocation and the mutations of item 18 (a smith moving into a
    richer street mutates toward the richer template); (d) the templates are data, editable, and later calibrated against
    the historical corpus.

20. **One-way data flow; the dossier is the authority.** Owner: "the map does not edit the dossier … This module only takes
    input from SettlementForge and returns back the map. So if a player, for example, deletes one smithy from the map, not
    the dossier, then the map generator needs to still respect it and build the smithy somewhere else and all of the other
    elements in a coherent way, still based off of that same seed. The smithy can only truly be deleted if it is removed
    via instructions from the dossier/SettlementForge." Rules: (a) data flows one way — SettlementForge → map module → map;
    the module never writes to, patches or proposes changes to the dossier, and its bridge has no command that does;
    (b) everything the dossier specifies (buildings, institutions, assignments, population, named features) EXISTS on
    every map the module returns; map edits cannot remove it — deleting a dossier-backed element on the map is recorded as
    a PLACEMENT REJECTION: the solver re-places it elsewhere by the relation and supply-chain rules (items 16–19), repairs
    the surroundings locally and coherently, all from the same seed. The rejection is NOT permanent (owner: "it is not permanent because if a settlement grows
    or declines that might be appropriate to put something there … but the immediate effect should be that that place is
    not there"): it takes effect immediately and holds while the settlement stays in the same state; when the settlement
    grows or declines (an evolution epoch, or a dossier change that alters that area), the rejection lapses and the site is
    eligible again under the normal rules; (c) only an instruction from the dossier removes, adds or re-designates a dossier-backed element; (d) map
    edits (moves, rejections, style, labels, locks, geometry tweaks) live in the map's own document that the module
    returns — SettlementForge may store it as an opaque map artifact, but it never flows into the dossier; (e) PROPOSED
    (program, vetoable): elements the generator added on its own (filler houses, trees, lanes) that the dossier does not
    specify may be deleted on the map, with local repair — but anything needed to satisfy the dossier (e.g. housing for
    its population) is re-provided elsewhere; (g) POSITIVE PLACEMENT (owner: "maybe you want a specific place to be something"): a map edit may ask for
    a specific place to hold something — pin a dossier-backed element to a chosen plot, or designate a plot for a use the
    generator controls (non-dossier filler); the solver honours it when the hard rules allow (joining plots and mutating
    the buildings per items 18–19, relocating whatever was there), otherwise it reports which rule blocks it and offers
    the closest acceptable sites; a positive placement never creates or deletes dossier content, persists until the user
    changes it or the dossier removes the element, and follows the same seed-determinism; (f) when the dossier changes,
    the module re-applies it as dossier events
    with the same local-repair rules, keeping the map's own edits wherever they remain compatible and reporting the ones
    that no longer are.
21. **Licence: PRIVATE FOR NOW (owner ruling 2026-09-27, superseding the 2026-09-25 GPL-3 intent).** Owner, 2026-09-25:
    "I intend to make this module, and this module not the rest of the project from SettlementForge, GPL-3 license."
    Owner, 2026-09-27, after the inspired-versus-derived distinction: "then lets stay private for now." RULING: the
    architecture's existing default stands — §17.3 / D-22, proprietary, "Copyright © the owner. All rights reserved.",
    the option-preserving default (an open licence can be granted later by one act and never withdrawn). Consequences
    for the design: (a) §17.3 and D-22 are UNCHANGED (this item is SATISFIED by the current text; no GPL-3 wording enters
    the document); (b) the clean-room chain of §17.1 stays absolute: TownGeneratorOS (GPL-3) is an IDEA SOURCE ONLY —
    the 2026-09-25 permission (J23) to consult and adapt its code with attribution is WITHDRAWN; no code, grammar,
    palette, wordlist or asset from any reference enters the module; the findings files that quote its code stay out of
    implementers' hands (the sanitised-digest rule); (c) dependencies remain permissive-only over the production closure
    (§17.4) — nothing copyleft linked or bundled, so the private choice is never constrained by a library; (d) the module
    stays a SEPARATE PROGRAM talking to SettlementForge through a data protocol only — kept as a design choice because it
    preserves every later licensing option and keeps the seams clean, not because a licence requires it; (e) the design
    records that the work is INSPIRED, not derived: methods, measured behaviour and published descriptions re-implemented
    independently, provable by the clean-room chain, the document checks (identifiers, phrases, lists) and the notices
    file. Editors: apply nothing beyond (b)'s explicit withdrawal sentence in §17.1 if J23's permission was ever written
    into the design (grep TownGeneratorOS; the current text already says "No code from TownGeneratorOS"), and a one-line
    note in the rationale that the GPL-3 intent of 2026-09-25 was withdrawn on 2026-09-27.

22. **Dossier changes mutate the existing map; they never re-roll it.** Owner: "we start off with the seed and then the player
    decides to add an institution or building to the dossier. The seed must respect that as well, and in some ways respect
    the previous layout prior to the addition or subtraction." Rules: (a) a dossier addition, removal or re-designation
    after the first map is applied to the CURRENT map as a mutation — the placement solver (items 16–19) finds the site
    with the least disruption: vacant or under-used plots first, then plots whose uses can move within the same
    neighbourhood, joining plots only when the new use needs the land; displaced uses relocate by the same rules; a
    removal leaves its plot vacant for the rules to re-use (item 17), never a reshuffle; (b) a disruption budget and
    report: the change states what moved, what was joined or vacated, and why; everything not involved keeps its exact
    geometry and identity; (c) the map is therefore a function of the seed, the ORDERED history of dossier changes and the
    map's own edits — replaying the same history from the same seed reproduces the same map exactly; two players reaching
    the same dossier by different histories may see different, equally valid maps (continuity is chosen over
    path-independence); the map document keeps this history so any map can be reproduced; (d) a brand-new map from an
    existing dossier (no history) is generated with every dossier element present from the start; (e) the same rules
    apply inside the evolution stage: dossier changes arriving mid-history are mutations at that epoch.

23. **Emulation-first defaults; no hard-coded universals (program, 2026-09-26; owner: "I still want it to be based in our
    base of MFCG and FTG emulation first").** Every rule's DEFAULT configuration reproduces what MFCG and/or FTG do where
    they have the behaviour (parity is the base); our extensions are layered on top as data-driven tendencies with chance
    or as options — never as fixed laws or fixed orders. Where the design says "always", "never" or "first … then", it
    means "by default, as a table value that can be changed per region, era and setting". (No corpus content enters the
    design; this only removes over-strong claims of our own.)
24. **Several markets — as MFCG and FTG already do.** Emulation baseline: MFCG's central plaza is a market, secondary
    market wards/plazas can appear (never touching another market, preferring small patches; 0.9.2 made secondary plazas
    rarer) and it spawns several churches; FTG places market districts/squares by its district rules (two market squares in
    the captured city). Default: one central principal market plus secondary markets and churches by size, as those
    references do; our extension lets the count also follow growth nuclei and demand. Data model, demand and siting must
    allow N markets; the principal market is central by default (MFCG plaza), not by law — owner (2026-09-26) confirmed it need not be
    central: its site is scored by where trade meets (the convergence of main roads, a bridgehead, the harbour, just inside
    or outside a gate, a widened main street), which usually lands near the centre in an MFCG-style walled town but may not
    elsewhere; FTG-style placement (landmarks first, by district rules) follows the same scores.
25. **Terrain and water can change, slowly.** Reclamation (draining marsh, filling foreshore), canal digging, silting and
    river-course shifts are rare conversion events in the evolution hooks (and user edits already exist for water); they
    are the slowest-changing layer, not immutable. The data model and the incremental path must allow terrain and water
    conversions with the same local-repair and event rules as everything else. Emulation note: neither reference has time; MFCG's warp and FTG's water drawing (draw river path, ocean shape,
    demolish) already let users reshape water, which the base keeps as edits — this item only adds slow change over epochs.
26. **The hinterland is decided with the town, drawn after it — FTG's order.** Emulation baseline: FTG decides buildings
    and people first (farm households included) and draws the "outer settlement" (main roads extended outward, farms,
    forests, landscape features) last, with farmland modes (farmsteads fill all remaining space; around-perimeter along the
    main roads out) chosen by settlement size and landscape; MFCG fills countryside cells outside the walls with farms and
    fields. Default: FTG's order and modes — the DEMAND stage decides the farm households, food, fuel and timber needs
    (with item 16's supply chains), and the outer-settlement stage draws fields and woods into the available countryside
    as both references do. Our extension: the hinterland's extent follows that demand, and a minimum hinterland is kept
    clear of suburb growth only when the demand requires it (off by default). The town and its countryside are decided
    together and drawn in the references' order.

27. **Prosperity maps onto the references' wealth models.** Emulation baseline: MFCG expresses wealth through discrete ward
    types (patriciate, merchant, craftsmen, slum …) whose buildings differ in size and spacing; FTG gives every building a
    lifestyle tier (squalid, poor, modest, comfortable, wealthy, aristocratic) drawn from a distribution, types residential
    districts by class, banding building pools by lifestyle, and places shanty towns (replacing lower-class districts when
    the average lifestyle is squalid or poor) only after the first half of the settlement is built. Default: the prosperity
    field is configured so that its bands reproduce those classes and distributions (MFCG's ward mix, FTG's lifestyle
    weights and shanty-town rule); the continuous gradient between and within bands is our extension.

28. **Floor plans and elaboration by click — the Dwellings rung (owner, 2026-09-26 evening).** Owner: "a user can go click
    into a building from within the neighborhood view and pull this up which takes all of the geometry and height and
    pieces from the manor view and then makes a coherent floor plan of the building also taking and tailoring to the
    building type and function." And: "the first thing that gets built is the city level view with a general view of
    different neighborhoods as plots without buildings. A user clicks into a neighborhood and that generates that
    neighborhoods buildings. Once generated it is saved. Plots can be preassigned institution/buildings as well just not
    generated. The same thing happens when users click a building in a neighborhood. This cuts back on loading everything
    all at once. of course generated buildings and neighborhoods as you zoom out are saved to be viewed until something
    changes in them from the simulator which lets the user know to click and see changes at their own pace." Reference:
    watabou's Dwellings (https://watabou.itch.io/dwellings; Haxe + OpenFL; 1.4.x adds roofs, JSON export with the room
    graph, marked entrances; a blueprint editor; "restrictive rerolls": Shift+Enter re-rolls inner walls keeping the ground
    plan, Ctrl+Enter re-rolls room labels keeping the walls). Its author states the method is partition-then-label, so a
    specific room cannot be guaranteed, inns and taverns are not yet supported, circular plans are unsupported, and the
    plans are "house-like dungeons" that make "a limited amount of sense" — the gap we exceed. Clean-room: ideas only.
    Program's interpretation (vetoable):
    (a) A FOURTH RUNG on the building ladder of §2.6 — outline → wings → rooms → **plan** — as the stage-3 building's
    floor plan: per storey (`Heights.floors`), a partition of each wing's ring into rooms with walls, doors and windows on
    exterior sides, stairs stacked across storeys (a spiral stair in a tower), the entrance on the frontage or access
    side, a cellar where the class table says; furniture as abstract shapes by room role. FUNCTION FIRST: a ROOM PROGRAM
    derived from the building's designation (its class and assignment) and its prosperity band — the required rooms with
    size bands and adjacency rules (a smithy: forge, workshop, store, quarters above; an inn: common room, kitchen, guest
    rooms; a manor: hall, wings, service; a hovel: one room) — and the partition fitted to the program, the reverse of the
    reference's partition-then-label. Coherence with the exterior: a composed tower is a round room, a dormer sits over
    an upper room, the porch at the entrance, chimneys over hearths, the plan's outer walls are the wing rings exactly.
    Materials stay texture only. Editable as everything else: room roles, wall moves and door moves are events scoped to
    the building (§7). Per-rung streams from the building's lineage (§6.1): re-rolling the plan never changes the
    exterior; re-rolling the room roles never moves a wall — the reference's restrictive rerolls, as our own rule.
    (b) ELABORATION BY CLICK, per rung, as the trigger policy over the laziness contract (§4.1) and the stage-3 hook
    (`outline` / `compose`, §2.6): the city view shows the eager footprints (the outline rung — MFCG parity at city zoom;
    NOT bare plots by default: a "plots only" cadastral view is a view-state option of §8, not the default); a
    neighbourhood click composes that neighbourhood's buildings to the wings rung (heights, roofs, towers, porches); a
    building click derives its plan. The trigger is a document setting: `elaborate: 'click'` (the owner's default) or
    `'view'` (automatic within §12's budgets, per visible tile as the design already allows). Pre-assigned plots: the
    eager content decision (use, class, assignment, `Lifecycle.assigned`) is taken at the city level before any building
    geometry — the design's existing rule (§2.5, §4.1) — named here as the pre-assignment the owner asks for.
    (c) SAVED, THEN STALE UNTIL CLICKED: derived rungs are deterministic (same seed, same result), so "once generated it
    is saved" holds without storing them, and the document stores only edits (§2.6). ADD an elaboration cache per rung —
    the derived result with its derivation record's input digests (§2.8), kept across zoom-outs and sessions through
    §2.9's snapshot mechanism — so that when the simulator or the dossier changes an input, the rung is marked STALE and
    keeps showing the cached result with a visible change marker at every zoom (a neighbourhood with stale buildings, a
    building with a stale plan) until the user clicks; the click re-derives as a MUTATION of the cached state (least
    disruption, §7), never a re-roll. Rung states: absent, current, stale, edited.
    (d) STAGED VERSUS BASE: the plan rung is staged after the Fantasy-Manor buildings in the owner's order (city →
    neighbourhoods → buildings → village …); the base carries the hooks now: `'plan'` as a value of `Composition.lod`,
    `Heights.floors`, the entrance side on `Wing`/`Porch`, a room-program column in the class table, the rung states in
    `Lifecycle`/`DerivationRecord`, the `elaborate` setting, a §12 budget row for one plan per click, the room graph in
    §11's export (like the reference's JSON, our own schema). §13 gains the plan's acceptance bars (every program room
    present; every room reachable; stairs stacked; walls equal the wing rings). docs/DEFINITION.md gains the rung after
    this pass lands.
    (f) THE INTERIOR HAS NO FLOOR (owner, 2026-09-27: "following on the fact that we put a floor to the geometry
    regarding prosperity, that does not mean the interior has to be … more prosperity means a larger home for a smaller
    family with potential for staff rooms which are dwarfed compared to the owners. where if it gets poorer … each
    building may stay … to the floor we have described, however the interior then becomes rearranged so a larger space
    gets partitioned, hallways may be created that lead into separate rooms for different families … common rooms may be
    a thing if in appropriate prosperity, larger rooms vs smaller rooms too. but if it gets really poor, then its just
    simply all apartments that can probably fit no more than a bedroom and a small place within to cook food. maybe not
    even that second part … same building geometry but not the interior"). The ROOM PROGRAM reads the OCCUPANTS'
    prosperity band and the household count (the dossier: households per building, item 31 rung 1), not the plot's
    geometry floor, and the plan is re-cut inside the unchanged wing rings as the occupants change — the INTERIOR LADDER,
    a rule table by band: RICH — one household in the whole shell, large principal rooms (hall, parlours, chambers, a
    solar), a service side with staff rooms small beside the owners' rooms, corridors few; MIDDLE — one or two households,
    moderate rooms, a kitchen and parlour each; MIDDLING-POOR — a lodging house: several households on separate floors or
    wings, a corridor or stair hall inserted to give each its own door, a shared kitchen and a common room where the band
    allows; POOR — a tenement: the shell partitioned into one-family apartments of a bedroom and a small cooking place
    off a corridor and the stair core; DESTITUTE — single rooms off the corridor, no cooking place, shared or no
    facilities. Households per building falls as the band rises and rises as it falls, and room sizes follow (the
    reference's ranked sizes made real). The re-cut is item 18's mutation applied to rooms: the stair core, the
    exterior walls, the entrances and the chimneys stay; partition walls, corridors and doors are re-derived with
    least disruption (rooms that still fit their new role keep their rings); the cycle rich ↔ middle of item 31 runs
    through this ladder in both directions, and only the interior — never the shell — falls below the middle. This is
    where the poor live when every area is developed: the same geometry, a different interior. Common rooms, shared
    kitchens and the cooking place are program rows, so a class or culture can vary them. §13 bar: for a building whose
    occupants' band falls two rungs, the re-cut plan houses every dossier household with its own door off a corridor
    or stair hall, inside the same wing rings, with the stair core unmoved.

29. **Entrances and basements (owner, 2026-09-26 evening).** Owner: "larger buildings can have more than one entrance.
    there should always be a street facing entrance. back or side entrances if an alley presents itself are optional or
    random but limited. back entrances in the case of a larger court or yard is recommended. and selective but
    appropriate basements. I leave all judgement to you." Program's interpretation (vetoable):
    (a) ENTRANCES ARE A SET, NOT ONE. `Building.entrance` (§2.6, today a single vertex on the access edge) becomes
    `entrances: Entrance[]` with `{ vertex: VertexRef; role: 'main'|'side'|'rear'|'yard'|'service'; faces: 'street'|'lane'|
    'alley'|'yard'|'court' }`, at least one per building. RULES: (1) the MAIN entrance always faces the street — the
    plot's frontage way, or for a set-back building on a multi-building plot, the court or path that leads from the
    plot's street gate (the plot itself always has a street-facing gate or door on its frontage); (2) a SIDE or REAR
    entrance is allowed only where an access edge other than the frontage exists — the plot touches a lane, a
    through-alley or a back lane (§2.5 `Plot.access` beyond the frontage; S8's block interior and S10's alley rung decide
    when an alley "presents itself") — and is drawn by a class-table probability (rows by class × size × prosperity band;
    hovels and row houses ≈ never, shops and inns often on a corner, workshops and warehouses toward the lane), capped at
    one side and one rear entrance for ordinary classes, more for institutions (service entrances to a court); (3) a
    YARD door is RECOMMENDED — the default — when the building's plot has a yard or court of at least a class-table area
    behind or beside it (§2.5 `SitePlan` yard parts): a kitchen or service door onto the yard, not a public entrance;
    (4) every entrance is a named vertex on the footprint edge, on the wing that faces its way, kept through moves by the
    wing-carrying rule, editable (§7: add, remove, move an entrance as building edits), and re-derived when the
    designation mutates (item 18: a house that becomes a shop gains its street door; a shop that closes keeps the door as
    a house door); (5) the floor-plan rung (item 28) opens a door at every entrance and roots its circulation at the
    main one; side and rear doors become secondary roots, so a plan may legitimately have more than one way in.
    (b) BASEMENTS ARE SELECTIVE AND APPROPRIATE. A `basement` decision per building, derived (never random alone) from:
    the class table (cellars for inns, taverns, breweries, storehouses, manors, keeps, temples by row; none for hovels,
    tents, sheds); the terrain — no cellar where the water table or the flood band of §2.3's drainage puts water under the
    floor (marsh, foreshore, the river's flood margin), a half-cellar or walk-out cellar on a slope where the fall under
    the footprint exceeds the class threshold (the same `baseCm`/skirt facts §2.6 already computes), rock as a cost that
    lowers the probability; prosperity raising it within the class band; the size and storeys of the building (larger
    and taller more likely, as the reference's own rule goes). The basement lies inside the ground-floor footprint,
    smaller than it, with its own storey record in `Heights` (floors below ground) and a stair or trapdoor the plan rung
    places with the stair core; it has no relation to the sewer layer (item 12: underground neighbourhoods front sewer
    tunnels only; a cellar never joins a sewer). Editable and re-derived like any derived state.
    (c) Emulation note: the references' rules are the baseline — MFCG and FTG give one entrance per building; Dwellings
    gives one entrance and no back doors (its users asked), a basement about half the time for one-storey houses,
    always smaller than the ground floor; our rules extend these, never contradict them by default.
    (d) HOMES: the entrance set and rules in §2.6 and §4.7 S11 (placement), the yard door in §2.5's site plan, the
    class-table columns in the rule tables (§7.6 / §14), the basement decision in §2.6 with its terrain gate reading §2.3,
    edits in §7, the plan-rung consumption in item 28, and §13 acceptance bars: every building has exactly one main
    entrance facing its street or court; no side or rear entrance without an access edge; no cellar under the flood band.

30. **Hidden plots and clandestine places (owner, 2026-09-26 evening).** Owner: "there should be some plots that do not
    have a direct access to streets, these are generally only accessible via alleys. but imagine slums or hidden or
    clandestine places outside of public view, plots with buildings or institutions that only those that grew up there
    or knew about it have access to or the knowledge of." Program's interpretation (vetoable):
    (a) EXPOSURE IS A PLOT PROPERTY. `Plot.exposure: 'street'|'lane'|'alley'|'court'|'hidden'` — derived from how the
    plot is reached: a frontage on a public way; a lane; an alley or back lane (S8's deep-interior treatments `back_lane`,
    `through_alley`, `rear_plots` and F-PLOT's alley rung already produce such plots); a court behind a gate; HIDDEN = no
    edge of the plot is visible from any public way — reached only through a passage or a chain of alleys, courts and
    other plots. The access guarantee stays (every plot ≥ 1 access edge, §5.2 F-PLOT): a hidden plot is reachable, only
    not from the street. Historic warrant (the realism tiebreaker): closes, courts and Hinterhöfe, Lyon's traboules
    (passages through buildings), the gated dead-end lanes of Damascus and Cairo — places whose entrance is a door in a
    wall or an arch under a house.
    (b) THE SHARE IS BY PROSPERITY AND DENSITY, AS A RULE TABLE. Hidden plots are made deliberately by S8's deep-interior
    rule and S10's plot cut (not left over): the band row sets a target share of interior and hidden plots — high in the
    poorest, densest bands (back courts and rear tenements reached by a passage: the slum), low in the middling bands,
    and present again at the top as PRIVATE courts and gardens behind gates (a rich house's hidden garden, a guild's
    court); city and metropolis bands higher than town; villages none by default. Emulation baseline: MFCG and FTG give
    every building a street; NG's infill yields back lanes and courts; the hidden share is our extension, off in the
    references' modes and on by band in ours.
    (c) PASSAGES THROUGH BUILDINGS. A new way class `passage` (§2.4 way classes; drawn as an arch glyph, §8; a room of
    kind passage in the plan rung, item 28): a covered way under a building's wing connecting a public way or alley to a
    court or hidden plot behind; the wing above it keeps its storeys (the passage takes the ground storey's cells along
    the way). S10's alley rung may choose a passage instead of an open alley where the frontage is continuous (row
    houses); the plan rung reserves the passage cells before partitioning.
    (d) KNOWLEDGE IS SEPARATE FROM GEOMETRY. `Plot.knownTo: 'public'|'local'|'secret'` and the same on an institution
    or building record — a dossier fact (SettlementForge may designate an institution as hidden or secret; the map
    then prefers hidden plots for it, by the assignment templates of item 16), defaulting from exposure (hidden → local).
    It drives the LABELS and the reader, not the geometry: §9's label policy hides the names of local and secret places
    at settlement zoom, shows local ones at neighbourhood zoom, and shows secret ones only on the building's own view or
    when the viewer holds the knowledge (a view-state switch; the future clerk answers about secret places only to a
    viewer who does). The place is always on the map; what is hidden is its name and its purpose.
    (e) EVOLUTION HOOKS (staged, item 8): hidden plots arise by densification (a rear yard cut into a court of tenements
    reached by a new passage) and vanish by clearance; a passage can be SEALED (a bricked arch: the plot's access edge
    marked sealed, the plot's exposure becomes `sealed`, its buildings decay as vacant) and later reopened — the lost
    place rediscovered. The base carries the states; the engine comes with evolution.
    (f) EDITABLE like everything: a user can seal or open a passage, hide or reveal a place, and the seed survives.
    (g) HOMES: exposure and knownTo on the plot and building records (§2.5, §2.6); the share rows and the passage choice
    in §4.6 S8 and §4.7 S10 (with F-PLOT's ladder, §5.2); the way class in §2.4 and the arch glyph in §8; the label
    policy in §9; the view switch in §8/§7; the assignment preference in item 16's templates; the plan-rung passage room
    in item 28; the sealed state in §2.8's decline hooks; §13 bars: every hidden plot reachable by a chain of access
    edges from a public way; hidden share within the band's target ± tolerance; no label of a secret place at settlement
    zoom; legibility kept (a hidden court reads as a court behind buildings, never as an empty block — banned prior #4).

31. **Prosperity change drives plot fusion and splitting — as a slow ladder, the stock outliving its occupants (owner,
    2026-09-26 evening; corrected the same evening).** Owner: "in regards to settlements changing some neighborhoods can
    grow poor or grow rich, this should affect plot aggregation and fusing or separation organically." And, on the first
    draft: "even if a neighborhood grows poor, it is hard to imagine that it would be torn down into a slum if it was
    filled with mansions." Program's interpretation (vetoable), corrected to the owner's second point:
    (a) THE TRIGGER IS A BAND CHANGE WITH HYSTERESIS. The prosperity field is recomputed at an epoch (the simulator's
    clock or a dossier change; §4.5's `FieldBands` already carry cuts and a hysteresis of 0.02); a block whose band
    changes past the hysteresis becomes DUE. Nothing happens on a flicker; the rule table says how fast, with a churn
    cap per epoch and per block, so a neighbourhood changes over many epochs, never all at once.
    (b) THE STOCK PERSISTS; FORM FOLLOWS WEALTH WITH A LAG. The response is a LADDER by duration in the new band and by
    what the buildings allow, and NO OCCUPIED BUILDING IS DEMOLISHED BY A BAND CHANGE:
    — Rung 1, immediate (every due epoch): USE and OCCUPANCY. Growing poor: a mansion is let out as lodgings — several
    households per building (the dossier's roster and item 17's relocation), its room program re-cut for many tenants
    (item 28: the plan mutates from one household to many, the great rooms partitioned), stables and outbuildings
    converted to dwellings and workshops, sheds and hovels infilling the yard, the garden built over; the fabric shows
    NEGLECT (§2.6 materials and §2.8 decline states: wear, patched roofs, a missing roof late). Growing rich: renovation,
    extension by item 18's additions, outbuildings restored, gardens reclaimed, infill cleared.
    — Rung 2, after the table's duration in the band: TENURE and YARDS. The holding fragments without the front changing:
    a yard becomes a back court with its passage (item 30) when poor; a court is cleared and re-gardened when rich; big
    houses change class (mansion → tenement, inn, workshop, chapel) by item 18's mutation, keeping their shells.
    — Rung 3, on VACANCY, RUIN, FIRE, WAR or REDEVELOPMENT only: the GEOMETRY follows. A ruined or abandoned mansion's
    plot is split into row houses or tenements (the palace cut into lodgings, or replaced when it falls); when rich, a
    new owner joins two or three worn small plots and replaces their houses with one large building. Fusion joins
    vacant or same-owner plots first, then rear plots into their front plot; splitting takes the widest frontage first,
    then the deepest yard. These are the least-disruption mutations of §7 and the incremental path (§4.11): S10's plot
    cut re-run for the due block with its neighbours fixed, under the band's granularity target, capped by churn.
    Slums arise where the stock was small and cheap to begin with, or from rung 1 and 2 inside big shells; a district
    of mansions grows poor as tenements behind grand fronts, not as a cleared slum.
    THE LADDER IS ASYMMETRIC (owner: "it is much easier for a poor neighborhood to grow rich and merge plots"). What
    sets the speed is the REPLACEABILITY of the stock that stands there — a class-table column: tents, sheds and hovels
    replaceable at once; cottages and timber row houses after a short duration; stone houses after a long one; manors,
    halls and institutions only by ruin or redevelopment — and the DIRECTION: growing RICH reaches rung 3 fast because
    it replaces cheap stock (a buyer joins two or three small worn plots and builds one large house; back courts are
    cleared; passages sealed and gardens laid), so fusion follows a rising band within a few epochs; growing POOR stays
    at rungs 1 and 2 for generations because expensive stock cannot be torn down, so splitting waits for vacancy, ruin
    or fire. The rule table carries both: a duration per rung by direction and by the replaceability of the stock.
    (Rung 1's interior re-cut is item 28 (f), the interior ladder: the interior has no floor.)
    THE GEOMETRY HAS A FLOOR (owner: "rich places can be changed but their floor is bounded to middle class in a sense.
    think of it as refurbished housing or development. so once a neighborhood generally gets to a middle class outcome,
    that forever remains its geometry until vacancy, ruin, fire, war, or redevelopment shifts things entirely. it would
    cycle in appropriate circumstances between rich and middle"). Each plot records `builtBand` — the prosperity band its
    present stock was built for — and derives `geometryFloor`: for stock built at or above the middle band the floor is
    the MIDDLE band; for stock built below it, its own built band (a hovel cannot read poorer than a hovel; it can only be
    replaced upward). The plot's MANIFESTED geometry band never falls below its floor by wealth change alone: a mansion
    district that grows poor reads as middle-class geometry — big plots, big shells, subdivided into lodgings, yards
    infilled — while its occupants, condition and labels (rung 1) may be as poor as the field says; between the rich and
    the middle manifestation it CYCLES freely and reversibly (renovation and re-unification of households upward,
    subdivision and infill downward — rungs 1 and 2, no geometry change). Only rung 3's events reset `builtBand`, after
    which the new stock sets a new floor. The middle band is the town's own (the field's cuts are per settlement, §4.5),
    so a metropolis's middle and a town's middle each bound their own districts.
    (c) LINEAGE SURVIVES, SO THE SEED SURVIVES. A fused plot takes the lineage key of its largest parent (its buildings'
    streams continue); a split plot's children are keyed by the parent's key plus the child index — §6.1's lineage rule
    extended — so the same seed with the same history gives the same town, and an undo returns the former plots exactly
    (§7's undo record keeps the former rings and records).
    (d) STAGED ENGINE, BASE HOOKS: the epoch-driven trigger, the ladder's durations and the churn belong to the evolution
    stage (item 8); the base carries now: the per-block re-cut through the incremental path with fixed neighbours
    (already §4.11 and F-PLOT), the lineage rules of (c), a `due` mark on the block record with the band it must meet and
    the epochs spent there, `builtBand` and `geometryFloor` on the plot record (§2.5) with the floor rule, the ladder rows (duration per rung by direction and stock replaceability, churn cap, orderings) and the replaceability column in the rule tables, households-per-building
    and the decline states on the building record (§2.6, §2.8), plot fusion and splitting as EDIT KINDS in §7 (a user may
    fuse or split by hand today; the engine calls the same edits later), and §13 bars: after a re-cut every plot keeps
    ≥ 1 access edge and the class minimums, party walls agree on both sides, granularity lies within the band's target ±
    tolerance, the churn cap holds, no occupied building is removed by a band change, and generation-then-mutation
    equals the same history replayed.
    (e) Emulation note: no reference evolves; MFCG fixes granularity by ward type and FTG by lifestyle tier at
    generation, and FTG's "regenerate area" is a re-roll. The static baseline is unchanged when no epoch passes.

32. **Provenance: the current generators' compiled code was read for understanding (owner directive 2026-09-27; apply in
    the pass after 09 — 09's routing is closed).** Owner: "oh read them. don't hesitate. we captured it, we read it, unless
    we directly copy their code line by line, that is copyright. but to read them and to understand their logic, that is
    another thing entirely." Program's interpretation: §17.1's clean-room chain gains one sentence of provenance — from
    2026-09-27 the captured bundles of MFCG, the Village Generator, Neighbourhood, Fantasy Manor, Dwellings and the FTG
    client were READ by reader lanes (research/findings/code-*.md) to understand their logic; no code, constant table,
    grammar, palette, wordlist or asset was copied; the reader-tier findings join the os-*.md files behind the implementer
    firewall (implementers receive the architecture and the sanitised digest only); the identifier check (C1) and the
    phrase and list checks stay in the build gate. Mechanisms the readings show to differ from the design's inferences
    are candidate amendments (docs/AMENDMENTS-2026-09-27c.md), adopted only as our own re-derivations with provenance.
