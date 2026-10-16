# Amendments j — the owner's rules on the world, sites, encounters and hydrology (2026-10-16)

Numbered from **131** (file i ended at 130). Received in one session on 2026-10-16 (the cloud session
`session_01DxkDeo1r9XpgCsPP9TrbDC`, on the designated branch `claude/focused-cray-qhz855`), while M0's hardening rounds
were in flight and before M0's commit, at the owner's word: "before we commit that, I wanted it to know what it needs
to have and be completely excellently integratable into all of what we would require of it", and, at the close,
"yes please fold these into the architecture". Legend as in file c: the owner's words are the authority; the
consequences are the program's vetoable interpretation. NOT yet applied to the base: the items name the proposals that
carry their design (`docs/design/proposal-world-native.md`, `proposal-sites-encounters.md`,
`proposal-hydrology-water-state.md`), the brief that charters the design volume
(`docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md`, Parts A–E), and the base change requests the coherence
pass applies when the world-and-sites volume lands (§BCR below). The items that bind M0's close are marked **M0 GATE**.

---

131. **OWNER DIRECTIVE — The world, site and hydrology brief (owner, 2026-10-16).** The owner issued a thirty-seven-section
     brief ("SettlementForge — Native Procedural World, Map, Site & Hydrology Architecture") asking for one authoritative
     native architecture reconciling world generation, procedural sites, persistent-site simulation and hydrology, and
     stating the central question: whether SettlementForge is "a city generator, a world generator, or a general
     procedural spatial/world engine capable of materializing worlds, settlements, cities, districts, neighbourhoods,
     blocks, plots, buildings, interiors, underground spaces, ruins, forts, caves, persistent sites and encounter maps
     from one coherent world-state architecture". The brief's principles stand in full (one truth; causality over
     decoration; existence before condition; edits sacred and local; time real; evidence labelled; restraint).

     **(a) THE PREMISE CORRECTIONS** (the session, vetoable): this repository is the map module and SettlementForge is
     the host, so every "SettlementForge" in the brief reads as host, map module or both, recorded per sentence; the
     proposals the brief asks to reconcile did not exist in the repository and are now written (item 139); the
     clean-room rule governs the research; one classification vocabulary (CONFIRMED / PLAUSIBLE / owner question);
     the kernel's planar cm scope is a premise, so world scale is a second representation with a placement transform.
     **(b) THE IDENTITY RULING** (the session under the delegation, vetoable; the owner: "yes" to "achievable", and
     "fold these in"): SettlementForge's spatial engine is a **persistent world-state materializer with
     scale-partitioned representations** — one world state, several materializers, two coordinate regimes (a world
     regime in metres on a raster plus a graph; the cm planar kernel from settlement through interior and site scale)
     with an explicit placement transform — never a collection of generators. The host owns political facts and the
     map module owns the world regime (the boundary option (a) of the brief draft §4; the host audit of
     `research/fmg/notes/sf-host-fmg-integration-audit.md` supports it).
     **(c) THE METHOD** (the session, accepted by the owner: "okay but first…", then "yes please fold these in"):
     contract-first. Two contracts — the world-fact contract (identity with a namespace, kind, placement in a regime,
     elevation against the datum, water class now and at construction, knowledge layers, lifecycle state with cause, a
     reason record) and the materializer contract (world facts plus a context record in; arenas, derived facts and
     reason records out) — and an executable M0 gate asking whether the kernel and model satisfy them (item 140).

132. **OWNER RULE — Two kinds of encounter map (owner, 2026-10-16).** "we have two types of encounter maps: 1. transient.
     If we are in an urban setting, or a the world map …, a user as a DM could click anywhere on those maps and state
     that an encounter is happening there. In such cases, it will produce an appropriately scaled encounter map based
     on where the battle is selected. … The shops nearby where i clicked get generated (as appropriate) in there too as
     places villains or players can enter or use tactically for combat … complete with the interior which is already
     planned to be made. If it was a place clicked such as on the road or wilderness from the world map, then it will
     generate an appropriate generic place matching the area it was clicked, terrain, biome, recent battle, etc. The
     urban example also applies related to sewers, cavers, floating ilsnads, etc. 2. Persistent location: this includes
     things like forts, rural wizards towers, abandoned above ground ruins, hidden temples to underneath people's houses,
     dungeons, etc. These are places that exist out in the world and have potential consequences once generated. Where
     they were generated persists and are built into the simulator where appropriate and these should have some
     combination of using elements from the hinterlands generator, buildings generator, etc, to match a list of
     selections a user might wnat."

     **(a) ONE OPERATION, TWO RETENTION POLICIES.** Both kinds are one operation — materialize detail at an address at a
     scale — with two retention policies (discard unless promoted; persist) and a promotion path between them
     (`proposal-sites-encounters.md` §1). **(b) TRANSIENT IS NOT RANDOM.** A transient encounter is keyed by world address
     and time and derived deterministically from seed and world facts, so the same click returns the same map; it is
     derived state, retained only when promoted. **(c) IN TOWN NOTHING NEARBY IS GENERATED, ONLY COMPLETED**: the
     interiors (V03) and the moment's occupancy of the buildings already there, by an occupancy abstraction, never
     individuals. **(d) EXTENT BY TABLE**: the crop's extent comes from a rule table keyed by the location's profile.
     **(e) THE WORLD-MAP CASE** is derived from the world regime's facts at the point (terrain, biome, route, territory,
     recent events) and waits on the world regime; in-settlement and hinterland encounters, sewers, caverns beneath and
     sky islands included, work on the existing design. **(f) A PERSISTENT SITE IS A CARD, NOT A GENERATOR**: its map
     is a composition of existing materializers (hinterland, enclosure, site plan and massing, plan programme,
     underground void systems) under a site policy, with the few new materializers named (natural caves, rock-cut
     spaces, ruination by V06's decay transforms). **(g) THE REQUEST RECORD** resolves the user's selections by derive
     before invent, into a programme whose complexity is a vector with units, never a slider. **(h) SIMULATOR
     INTEGRATION** under the one-way flow: a persistent site is an institution-like host record whose location is not
     inside a settlement; consequences reach the map as dossier events.

133. **OWNER RULE — Editable sites, floors and basements, persisting iconography, context-dependent visibility, DM
     secrets (owner, 2026-10-16).** "and of course everythign editable and for the second one, dungeons as well. A user
     should be able to set the number of floors and basements for the second sone depending, shape terrain, etc. have a
     clickable iconography or something and if in an urban setting is not added to the city map rather accessible or it
     pops up from a clickable iconography that persists in whatever location we drop it. (for example) if we dropped it
     in the interior of a house, it shows only once we access that interior and specific floor of the house (the
     iconogrophy) if it is in the sewers, it only shows once we access the sewers, etc etc. These are DM secrets btw
     toggled secret on and off."

     **(a) THE ANCHOR RECORD** — the one new piece: an address (layer, part, storey or tunnel) plus a site reference
     plus a knowledge flag; the icon is its rendering, map furniture over a canonical anchor. **(b) ATTACHED SITES ARE
     SEPARATE DOCUMENTS**: own arenas, floors and basements; the city map holds only the anchor and one access record
     (V04's stair, shaft, door or trapdoor, with its own knowledge flag and condition). **(c) THE SURFACE EXCEPTION**: a
     site with a footprint in town (a wizard's tower on a street) is a building on a plot and goes through the
     assignment path (item 101's vocabulary), the site programme riding as the building's programme. **(d) VISIBILITY
     BY CONTEXT**: the icon draws only in the view whose context contains the anchor's address (that storey, the
     sewers). **(e) SECRETS ARE THE KNOWLEDGE LAYERS**: DM only, revealed to players, discovered by players, on the
     existing `knownTo` and admission function, with a second cue beside colour. **(f) FLOORS, BASEMENTS, SHAPE AND
     TERRAIN** are the request record; multi-floor is the existing storey and stair model; terrain shaping is a terrain
     edit run before siting. **(g) DUNGEONS** are a site whose interior is a room-and-corridor programme, the plan
     programme generalized to carved and natural space; topology first (a unit graph with roles), geometry second
     (embedded on the kernel), the complexity vector measured on the result; wave-function collapse rejected for
     structure, room-and-corridor and binary space partition rejected as structure, grammars for programme expansion,
     skeletons and medial axes for passages, agent excavation for mines, noise outlines for caves. **(h) EDITING** comes
     free on PLAT arenas; "move this wall" is geometry, "add a floor" is a programme edit rematerialized locally;
     dropping an icon creates a card materialized lazily on first open; deleting takes two verbs, remove (retcon) or
     destroy (an event leaving a ruin).

134. **OWNER RULE — Context filters the selection; sites evolve; sites seed settlements (owner, 2026-10-16).** "we will
     filter out of the selection what is possible in urban vs country … and in the case of buildings or temples that are
     generated for encounter maps, they can evolve depending on whether occupied or vacant or damaged or pristine
     depending on the flow of things. Also, certain generated locations from the country persisted category can be prime
     locations for a new settlement based off of the simulator... for example a thorpe that establishes itself in front
     of or surrouding and abandoned or occupied fort."

     **(a) THE ADMISSIBILITY TABLE**: context (urban surface, urban below or inside, hinterland, country) → allowed
     site kinds and attachment modes, with the edge of town decided by distance from the enclosure; editable like
     every rule table. **(b) CONDITION IS A TRANSFORM OVER A PERSISTED PLAN**, never a reroll (the design's "a building
     never decayed draws byte-identically to its plan", item 123's damage layer): pristine, occupied, vacant, damaged,
     ruined are card states applying condition transforms to locked geometry; the driver is a host or DM event through
     the one-way flow; transient content has nothing to evolve unless promoted. **(c) SITES AS DESTINATIONS**: a site
     enters the siting score as a destination; a settlement the host founds there takes the site as an existing
     landmark that claims its ground first (as a castle reserve does today), older and so prior in the layout; the
     relation runs both ways (garrisoned, or robbed for stone and absorbed as the ruin beneath the village). **(d)
     ADOPTION**: when a settlement forms around a free-standing site, the site's arenas become parts of the settlement
     document keeping every identity and lock, and its placement becomes the settlement's — which is what the M0 gate
     rows on multi-part arenas and namespaced addresses protect (item 140).

135. **OWNER RULE — Scale coherence across encounter, city and world (owner, 2026-10-16).** "also make sure that scaling
     is completely scaled according to encounter, city, and world generating processes..."

     **(a) THREE REGIMES, ONE CHAIN OF REFINEMENT**: a finer scale refines what the coarser says and never contradicts
     it; a river on the world map, in the town and at the bank in a crop is one geometry refined three times. **(b)
     THE HANDOFF DOWNWARD IS BOUNDARY CONDITIONS, NOT COPIES** — the charter (`proposal-world-native.md` §5): edge
     elevation profiles, datum, water edges with body and level, river crossings with discharge, width profile, bed,
     stage, basin and navigability, downstream head, roads, climate scalars, water table, biome, resources, territory.
     **(c) RESOLUTION IS ADDED DETERMINISTICALLY** from the coarse fact, position and seed, so neighbouring frames agree
     at a shared edge unseen. **(d) EDITS ARE STORED AT THE SCALE THEY WERE MADE**; a fine edit never silently rewrites
     a coarse fact; a coarse edit invalidates the frames it touches. **(e) EXTENT, DETAIL, EXAGGERATION AND BUDGETS**
     are per regime, by table.

136. **OWNER RULES — Time of day is not a parameter; VTT compatibility (owner, 2026-10-16).** "time of day is not a
     parameter. But something that does need to be said. This all needs to be compatible with VTT (the encounter maps)".

     **(a)** No map carries an hour; the DM narrates it; light fixtures export as fixtures (a room's `lit` from its role
     or an edit, V03 §5.6) for the DM to switch in the VTT. **(b)** VTT compatibility is §11.1's existing profile
     (Universal VTT and Foundry-class scenes; one scene set per layer, per storey, per depth band, per deck; walls and
     line of sight derived from the model, openings as portals, model widths only, knowledge tiers enforced at export)
     plus two additions: **a crop scope** in the export options (an address with an extent) and **a stable grid origin
     per address** derived deterministically from the address so re-exports never shift tokens. **(c)** A research seat
     re-verifies the current Universal VTT fields and Foundry's wall and door schema against their published
     documentation before the encounter milestone and pins the profile's version.

137. **OWNER RULE — Terrain and water edits react, persisting as visual history or outright removed (owner, 2026-10-16).**
     "remember that the DM could eventually change terrain over preexisting water levels or lower water levels, or edit
     things, so make sure that edits react accordingly as well. both persisting as visual history or outright removed".
     And, on classification: "how do you determine partially flooded vs competely submerged?" and "also consider that
     surface levels ruins and buildings can also be submerged".

     **(a) TWO VERBS FOR EVERY TERRAIN AND WATER EDIT**: "this happened" (a dated event; the old surface or terrain
     kept as a dated record; traces are facts the renderer projects) and "this was always so" (a retcon; the base
     rewritten; descendants without a cause go too); the default is "this happened". **(b) THE CASCADE** recomputes in
     dependency order within the affected watershed and dirty set only. **(c) LOCKS HOLD GEOMETRY, PHYSICS DECIDES
     STATE**: a locked cellar lowered below the table stays where drawn and is flooded with a reason; an impossible
     locked thing is kept as a reported anomaly with the DM's choice, never silently deleted or moved. **(d) PREVIEW
     BEFORE COMMIT** on a counterfactual fork. **(e) A TRACE IS DELETABLE ON ITS OWN** without deleting the event. **(f)
     THE WATER CLASS TEST** (`proposal-hydrology-water-state.md` §4): one governing surface against a unit's floor and
     ceiling, read through a table of dry / damp / partially flooded (wading, swimming) / completely submerged; a floor
     range gives a flooded share; accessibility is a route class computed on the path; the site's state is an
     aggregate; the same test on dated and seasonal surfaces gives historical and seasonal classes. **(g) SURFACE
     THINGS**: buildings per storey, a ruin's ceiling the standing height from the damage layer, open water spreading
     from the body by priority flood with barrier tops (walls, dykes, quays) blocking the spread, groundwater never
     flooding above-ground units, streets as route classes, bridges by deck elevation, submergence feeding
     discoverability.

138. **OWNER RULE — FMG fully native, surveyed completely, improved and refined (owner, 2026-10-16).** "what are your
     thoughts about making FMG fully native?"; "i also want you to still completely survey it and all of their updates
     and posts and find all the best ways to make it completely native and comptiable with our systems as its best most
     refined (by you) version"; "so... with this, can we make it all native?"; "can we improve upon it, refine it, while
     making it native and in what ways?"; "you can see our forked FMG in the settlement-engine folder".

     **(a) THE SURVEY IS DONE**: `research/fmg/FMG-survey.md` and ten notes, every release 2017–2026-10, the wiki, the
     source, all fifteen blog posts with 193 comments, all sixty Patreon posts with 104 comments (one patron-only post
     unread), the roadmap and ecosystem, and the audit of the host's vendored fork (upstream v1.114.2, a rebuilt bundle
     whose modified source is absent, a geography-only iframe, a frozen digest without coordinates, and no settlement
     generation input from the map). **(b) NATIVE** is `proposal-world-native.md`: the physical world and the
     materializer in our representation, bounded by the host on one side and the settlement frame on the other, with
     the charter as the contract and a version-pinned import adapter for existing maps; not feature parity. **(c) THE
     REFINEMENTS** are the proposal's §3–§4 and §10: metres against a datum; surfaces as dated records with the carve
     kept; priority flood and D8 with discharge in real units; namespaced addresses with field locks and validated
     deltas; dependency-driven recomputation with FMG's eighteen stale-data paths as tests; an id-keyed versioned
     format; determinism as a rule; two-scale coherence; groundwater and springs; history as an axis; reason chains;
     knowledge layers; preview-and-commit editing; a world that explains its towns; sites as world facts; water as a
     consequence system; siting that answers the host's demand; level of detail by the hierarchy. **(d) NOT BUILT**
     (the session's recommendation, the owner: "gotcha"): tectonics, erosion over time, fluid dynamics, a sphere in the
     first version, an economy or military simulation in the map module; a tectonic pass may later be one recipe
     operation emitting ranges and troughs. **(e) THE HOST CHANGES** are the proposal's §6, for the owner to schedule in
     SettlementForge.

139. **OWNER DIRECTIVE — Fold these into the architecture (owner, 2026-10-16).** "gotcha. okay, then yes please fold these
     into the architecture".

     **(a) WHAT THIS FILE IS**: the owner's rules of 2026-10-16 as items 131–141, the series' vehicle for owner words.
     **(b) THE PROPOSALS**: the three design proposals under `docs/design/` are the three columns of the brief's
     decision matrix; `proposal-world-native.md` §13, `proposal-sites-encounters.md` §9 and
     `proposal-hydrology-water-state.md` §8 carry the matrix rows with the reconciled decision and reason. **(c) THE
     CHARTER**: `docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md` is rewritten to the contract-first shape
     with every thread of this session folded in; its Part D charters **volume 13, World and hydrology**, and **volume
     14, Sites and encounters**, written after M0 to the volume template with base change requests. **(d) THE BASE**:
     until those volumes land, the base change requests below are the record of what the base will change; the
     coherence pass applies them with the volumes, never by editing `docs/ARCHITECTURE.md` in place.

140. **SESSION RULING — The M0 close gate (the session under the delegation, 2026-10-16; vetoable; M0 GATE).** The
     owner: "we are liable to finish M0 in the next few days, before we commit that, I wanted it to know what it needs
     to have". The gate is the brief's Part A: the kernel-frozen rows must be resolved before M0 commits and the model
     rows are recorded as M1 items; every row is "do not foreclose", none adds a feature; where a row can be a test it
     joins M0's exit suite.

     **Kernel-frozen rows** (resolved before commit, or carried to M1's API pass with a reason): K1 `Layer` append-only
     codes in digest and block format, no path assuming `'ground'` is the root; K2 `PlatKey.part` round-trips with
     independent frames and lattice specs, parts not assumed dense; K3 `Frame` purely local, no absolute position in
     any digest; K4 reference forms resolved against a separately supplied key; K5 role registry append-only without
     digest change, `LINEAR_PARTS` extensible per transaction; K6 concern and stage registries append-only without
     renumbering, new streams independent; K7 a rank function over two stage registries; K8 encode-decode digest-equal
     for every arena kind including parts ≥ 1, `compactSlots` deterministic; K9 the transient-arena stub's designed
     contract admits an arena with no owner document; K10 every persisted block names every version it depends on; K11
     no algorithm branches on a domain role beyond the documented defaults; **K12 the commit journal records stage,
     concern and inputs read, so a reason record can be reconstructed** (the primitive the brief's "why" depends on).
     **Model rows** (recorded now, M1's to change): M1 a namespace segment in the address form; M2 the carve delta or
     pre-carve heightfield recoverable, water surfaces separate from the heightfield; M3 the datum behind one accessor;
     M4 the water table behind one function; M5 S1's terrain and water parameters as one input record (the charter's
     landing); M6 a placement record reserved per arena set; M7 an anchor record reserved (item 133 (a)); M8 a reason
     record reserved per generated fact. The deliverable is `docs/build/checks/M0-world-sites-gate.md`, every row
     CONFIRMED or PLAUSIBLE with evidence, signed in the clean-room ledger; M0 does not close without it, and no row is
     closed by changing the design to match the code without a choices row.

141. **OWNER RULE — A 2.5D mode over the same model, and its rows in the gate (owner, 2026-10-16).** "we want to keep
     everything that M0 has done for 2D, but what if we want the whole architecture to have a 2.5 mode? how would that
     work?" and, on the answer, "add all of these to the testing gate".

     The owner's clarification (2026-10-16, on the launch of the volumes): "i'm not replacing 2d with 2.5d. i want
     both" — the flat 2D map stays the default and the 2.5D view is a second, switchable view of the same document;
     nothing of M0's 2D work changes.

     **(a) THE MODEL IS ALREADY 2.5D; 2.5D IS A PROJECTION.** The kernel stays planar and stores no elevation; every
     record on it carries one (terrain against the datum, building base and storey heights and roofs, wall heights,
     retaining-wall step profiles, deck elevations in their own parts, water surfaces as records, depth bands below,
     islands at altitude). A 2.5D mode is a render-tier projection family (isometric, oblique, perspective) with depth
     sorting and occlusion, a draped terrain, extruded footprints with the massing's roofs and the existing casters,
     per-storey slabs for interiors, cutaway slabs by depth band, islands at altitude, vertical exaggeration as a style
     setting, hit testing projected back to the 2D address, one new edit kind (raise or lower an elevation), a 2.5D
     family in the validated style store, a canvas or WebGL renderer, the projection as a picture export beside the
     existing glTF and CityJSON. Nothing enters the hash. **(b) THE LIMITS**: not 3D — no overhangs, arches as volumes
     or a chamber above a chamber in one arena; stacked spaces are separate arenas or levels linked by vertical-link
     records drawn as stacked slabs, a sloped passage a ramp record on a link; true solids go through the glTF path.
     **(c) THE GATE ROWS** (item 140 gains them; the brief's Part A): **K13** no digest, reference form, invariant or
     kernel operation reads or assumes an elevation, and `Frame` and the lattice are two-dimensional only — z is absent
     from the kernel by construction and must stay so; **M9** z-completeness: every drawable record kind declares a
     base elevation and a top, or a surface, or is listed as flat with a reason (today: terrain, buildings, storeys,
     walls, decks, water surfaces; the gap list is the row's finding); **M10** vertical-link records (stair, shaft,
     ramp, trapdoor, access) carry an elevation at both ends; **M11** the projection and the vertical exaggeration are
     view state outside the document hash, and the style store's schema admits a projection family. **(d) THE
     ACCEPTANCE BARS** (the brief's Part E gains them): the same document hashes identically under the flat and every
     2.5D projection; a pointer in a 2.5D view resolves to the same address as in the flat view at the same point;
     every drawable entity has a base and a top or is listed flat with a reason; an interior draws as per-storey slabs
     from the same plan the flat view draws, byte-identical in the model. **(e) WHERE IT LANDS**: a section of the
     rendering chapter of volume 13, and a renderer milestone after the viewable town.

---

## BCR — base change requests these items imply (applied by the coherence pass with volumes 13 and 14; not yet applied)

| # | base section | change | from item |
|---|---|---|---|
| BCR-j1 | §1 scope, §14 packages | the world regime as `@plat/world` between kernel and site; the identity statement of item 131 (b) | 131 |
| BCR-j2 | §2.3 Terrain | `datumCm` derived from the world datum and the frame's placement; S1's parameters as the charter input record; the carve delta kept; water surfaces as dated records | 135, 137, 138, 140 |
| BCR-j3 | §2.4 water table | a derived groundwater field with springs replacing the nearest-body rule; one accessor | 137, 138 |
| BCR-j4 | §2.1 arenas, §2.8 identity | placement record per arena set; a namespace segment in addresses; adoption of a site's parts into a settlement document | 134, 135, 140 |
| BCR-j5 | §2.7 / V04 | the anchor record and the access record's knowledge flag; attached-site documents; the admissibility table | 133, 134 |
| BCR-j6 | §2.8 lifecycle, V06 | the site card and lifecycle states with causes; condition transforms over a persisted plan; the two deletion verbs; promotion of a transient encounter | 132, 133, 134 |
| BCR-j7 | §4.2 S1, §5 | the water class test and route classes; barrier tops in the flood spread; per-storey classification; the two edit verbs and the cascade; locks hold geometry, physics decides state | 137 |
| BCR-j8 | §7 editing | field-level locks; validated deltas; the counterfactual fork; dependency-driven invalidation; the reason record read by the clerk | 131, 137, 138 |
| BCR-j9 | §9.2, §11.2 knowledge | DM-only / revealed / discovered layers; submergence feeding discoverability | 133, 137 |
| BCR-j10 | §11.1 VTT | the crop scope; the stable grid origin per address; the profile's version pin re-verified | 136 |
| BCR-j11 | §12 budgets, §8 styles | per-regime budgets, extents and exaggeration; level of detail by tier | 135 |
| BCR-j12 | §7.7 / V08 port | the derived-facts port replacing the host's capture and digest; the charter per campaign; the settlement-map record (geography by the engine, institutions by the host) | 138 |
| BCR-j13 | §6 determinism | per-stage seeding from (seed, stage); the version table naming format, tables and generator; no randomness in comparators as a lint | 138 |
| BCR-j14 | §3 kernel (M1 API pass) | only what the gate's kernel rows carry; no domain primitive | 140 |
| BCR-j15 | §8 rendering, §2 records | the 2.5D projection family and the z-completeness rule; the raise-or-lower edit kind; elevation at both ends of every vertical link | 141 |
