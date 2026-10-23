# Spine — world growth: formation, living physics, ecology, the requirement solver, the generation surface, the dossier seam, sail routing, ruins by age, the atlas and the relational style (owner rules F1–F16)

Written by the session's Fable manager seat (design/spine-world-growth) on 2026-10-23 under the owner's delegation and
the J392 model ruling. This file is the ONE integrating statement the design seats build from: it decides the shape,
the names, the precedence, the lifetimes and the seams, so that the two design seats (amendments r for V13, the base
and the volumes; the new volume V15 for the atlas) and the seam seat never re-decide them. It is a design document
(docs/design/), not an implementer input; every ruling here is vetoable by the owner. Owner words are cited by their
rule number (docs/PROGRESS.md J390 F1–F4; J391 F4; J392 F5–F16); standing rulings by their J-row.

**How to read.** §1 the rules and the standing rulings they build on. §2 the scale ladder and its one rule. §3 the three
lifetimes of world state. §4 one requirement solver, one process. §5 the precedence ladder and the approval rule.
§6 the generation surface. §7 the DM always wins: verbs, overrides, disturbances, the physics pass. §8 sail routing.
§9 ruins by age. §10 the atlas. §11 the relational style. §12 vocabulary (one word, one meaning). §13 where each rule
lands and who writes it. §14 the seams between V13 and V15. §15 M0, milestones, order, budgets, spikes. §16 what stays
the owner's. §17 the families of tests and decisions the pass must add.

---

## 1 The rules integrated, and what they stand on

| rule | the owner's words (J390–J392, verbatim there) | read as |
|---|---|---|
| F1 | tectonics only in the formation of the world, then deleted for full customization | a formation step run once, its results baked, its state deleted (§3) |
| F2 | biome formation simulated too; the simulation deleted but with dynamism | formation deleted; the living physics kept and re-derived; ecology from dated facts (§3) |
| F3 | a let-physics-pass-again option, whole world or selected areas; the DM always wins (an always-so override respected and built around; a this-happened event recovered from); settlement age, generation only, decides whether and how large the underlying ruins are | §7 and §9 |
| F4 | ocean currents for sail routes and speed | §8 |
| F5 | a world generated first, then editable; preconfiguration options random all / basic / advanced for all user types | §6 |
| F6 | biome inclusions, organic in when and how they are simulated | a requirement to the solver, never paint (§4, §6) |
| F7 | "based off of my settlements"; a best-placement button; organic self-correction, never an arid dot | the same solver at three scales (§4) |
| F8 | a DM authoring a different biome: a warning or pop-up; the dossier changes only after the user's approval | the conflict list and the approval rule (§5) |
| F9 | all coherent and refined; the generation surface and the one requirement solver apply to the same situation or in sequence, and are one process where appropriate | §4.3–§4.5 |
| F10 | a historical relational style mixed with true scale; embellishments | §11 |
| F11 | a fourth layer, the "world map", stitched from completed region and realm maps, isolated in everything but image, drilled into in reverse; seams between sizes | the atlas (§10) |
| F12 | users choose where maps sit in relation to each other | §10.3 |
| F13 | a void beside or between maps: the next map takes basic configurations to be a continuation | §10.4, narrowed by F14 |
| F14 | edits after generation never carry over; every map is its own microcosm on its own literal time | §10.5 |
| F15 | world maps are individual saves; a user may have many | §10.1 |
| F16 | integrate cohesively and coherently with the best combination of models and effort | this spine; the J392 model ruling |

**Standing rulings this spine keeps whole.** The identity ruling (the map module is a persistent world-state
materializer; the host owns political facts and the dossier; the map owns the physical world; one-way host→map political
facts, one derived-facts port back); settlement-first placement (the settlement never changes; the world bends, bearing
first, blend second; V13 §1.3, §3.11); "genesis is sacred" and the host's frozen digest (J-RR.1–J-RR.19); the two verbs
"this happened" and "this was always so" (V13 §3.14); determinism and streams (V13 §3.17); the lens mechanism and its
four fact classes (V13 §5.8; J384); the territory sway and the polity partitions (J377–J389; V13 §3.9); the additive
canon (J388–J389); M0 frozen (no kernel file changes; registry rows appended after M0 under K6).

---

## 2 The scale ladder and its one rule

Five rungs, each a document kind of its own:

| rung | document | simulated? | clock | generated from |
|---|---|---|---|---|
| 1 atlas | an **atlas** (the owner's "world map", F11–F15; V15) | no — imagery, arrangement and viewpoints | none of its own; shows each member at the member's own time | nothing; it holds references |
| 2 world | a **world document** (V13: a realm or region rung; the continent rung where the machine allows) | yes — formation once, living physics always, ecology by dated facts | its own present week (host-bound: the host's) | the solver (§4), optionally conditioned on atlas neighbours' edges at generation (§10.4) |
| 3 settlement | the base's settlement document | yes — the base's generator and epochs | its own (host-bound: the dossier's) | a charter from its world, or standalone then placed |
| 4 interior | V03's plans within the settlement document | derived | the settlement's | the settlement |
| 5 site / encounter | V14's sites and crops | derived | the settlement's or world's | the world or the settlement |

**The one rule, applied at every seam of the ladder:** *the more detailed rung wins on its own footprint; the coarser
rung yields around it; a rung reads the rung above only at its own generation, through a boundary record; a rung reads
the rung below only as derived readings; nothing dated crosses a seam.* The base already states it for settlement and
world (the frame never changes; the charter is read at generation; `worldRef` readings are derived; the blend band). This
spine extends it upward (atlas ⇄ world, §10) and downward (world ⇄ site, V14, unchanged) with no new mechanism.

---

## 3 Three lifetimes of world state (F1, F2)

Inside one world document, every physical layer has exactly one of three lifetimes:

| lifetime | layers | runs | stored as | may read | deleted? |
|---|---|---|---|---|---|
| **formation** | crust blocks (the literature's tectonic plates, §12), uplift and subsidence, fluvial, hillslope and glacial erosion, sea-level history, soil formation | once, at the world's generation, as the first recipe operation; again only under the physics pass's *weather* depth (§7.4) | its RESULTS, baked into the recipe as the formation op's payload: the terrain it produced (the DEM chunks), a **bedrock** raster, a **soil** raster, and **landforms** as entities (ranges, volcanoes, calderas, rifts, faults, hotspot chains, glacial lakes, fjords) | the request's requirements (§4), the atlas neighbours' edge charters (§10.4) | YES — the block set, velocities, boundaries, the erosion solver's state and every intermediate are discarded; a saved world never re-runs formation on load, and a change to the formation code never shifts a stored world |
| **living physics** | climate (monthly temperature and precipitation, seasonal wind belts, monsoon shift, ocean currents and their coastal effect), hydrology (flow, accumulation, reaches, lakes, groundwater), potential natural vegetation (the climate classification over soil and water) | on every generation and on every edit, over the dirty set — which, for a relief or water edit, now extends **downwind** along each wind band until the march's moisture is spent or the edge is reached (the rain-shadow gap in V13 §3.14 closed) | the derived rasters V13 already stores (`dem`-derived, climate, hydro, biome) | the baked formation results, the recipe's later ops, the DM's always-so overrides (§7) | never — it is law, not history |
| **campaign-time ecology** | land cover = potential vegetation × human use × disturbance × succession | at each host advance (a plate, V13 §5.8 (8)) and at each dated DM disturbance | a derived raster per plate in the plate cache, outside every digest; re-derivable from the event log | only dated host facts (seat population and tier → cleared fields and pasture by travel time from the seat; abandonment, razing, plague depopulation → succession by biome) and dated DM events (fire, flood, clearing, eruption); never an invented event | never — but it is a cache |

**Two consequences that settle earlier tensions.** (a) *Land cover is not the dossier's biome.* The dossier holds the
climate-level biome (V11's `ClimateRow`); clearing and regrowth are land cover. Only a climate-level change can raise the
dossier warning (§5.3); ecology never does. (b) *The solver never touches formation.* A later correction (a rain shadow,
a basin) is an ordinary terrain op appended to the recipe (§4.4), so "form once, then delete" and organic correction
coexist.

**Formation's control.** Templates remain (authored ranges and troughs, J-V13.41's reason survives as the *authored*
path); formation **scenarios** join the template table as data rows with a few knobs each (block count, continental
share, speeds, age, ice extent, sea-level history): a young collision range, a splitting supercontinent, an island-arc
archipelago, an old worn shield, a rift coast. A province-rung world inherits ONE regional formation feature (a mountain
front, a rift, a volcanic field) — a full block simulation is a realm or continent rung's. Formation and erosion run on
the **coarse** raster; the fine DEM is the coarse result refined by the existing position-keyed detail and the recipe's
later fine ops (V13 §3.11.4's lattice) — so the continent rung's memory ceiling (V13 §12.8) holds. J-V13.41 and J-V13.42
are reversed by new decision rows that keep their reasons as the authored path and the gating spike (§15).

---

## 4 One requirement solver, one process (F6, F7, F9)

### 4.1 Requirements
A **requirement** is `{ id; source; rank (§5.1); kind; target; strength: 'random'|'set'|'locked'; scope }` where the
sources are: the generation surface's options (§6); biome inclusions and exclusions with amounts (F6); the campaign's
settlements' dossier facts and relationships read through the port (terrain, coast and its side, river and inflow, lake,
climate row, latitude, resources, size and tier, trade access; neighbours, partners, rivals, overlords and vassals,
isolation) (F7); a placed or to-be-placed frame's facts (V13 §3.11's `dossier` and the six terms); the DM's locks and
always-so overrides (§7); the atlas neighbours' edge charters when the world is a continuation (§10.4); the host's
frozen water verdicts (`hostRequires`). Every requirement is a record in the world document (`Recipe.world.requirements`),
with the **decisions** taken on its conflicts (§5.3) beside it; a later run solves against the whole set.

### 4.2 The engine is the pipeline
There is no separate solver program. The world pipeline (V13 §3.0, W0 → W9 and P1–P5) IS the solver: each stage
satisfies the requirements it is best placed to satisfy as it builds, and verifies them as it produces:
- **W0** sets extent, latitude box and sea share from the requirements (two settlements needing arid and tundra land widen
  the latitude box when it is `random`); when settlements are included it lays their **planned sites** first, from their
  relationships (partners within plausible travel, rivals across a border, vassals near their overlord, isolated seats
  remote) — a site plan, not a placement.
- **formation** (the first op) arranges the crust blocks so ranges rise where mountain seats and needed rain shadows are
  and coasts form where ports need them (the scenario's knobs are requirements too).
- **W1** adds local ops so each planned site matches its seat's relief and coast side; **W2** forms lakes for lake seats
  and straits between rival ports; **W3** checks each planned site's climate row and the biome inclusions — anything unmet
  sends ONE bounded back-step to W1 (the smallest cause: a range upwind, a basin without outlet, a cold current's coast,
  a narrowed sea), never more than `solver.maxBackSteps` (3) times, each on the coarse rung; **W4** routes rivers so
  riverside seats get a real river from a real source; **W5–W8** check biomes, resources, routes and polity against their
  requirements; **P1–P5** drop the settlements onto the sites the world was grown around (the blend is minimal by
  construction); the run ends with a **verification report**: every requirement met / partly met / unmet, each with its
  reason (`whyCell`'s form).
- Every correction the solver makes is an ordinary recipe op with `origin: 'solver'` and the requirement id it serves —
  the recipe stays the one authoring history (J-V13.6) and a world re-derives from it without the solver.

### 4.3 The same situation, and in sequence (F9)
- **At once:** the panel's options and the included settlements' requirements enter ONE run; conflicts are shown before
  the run commits (§5.3). "Random all" with settlements included is the same run with every option `random`, so it always
  fits the campaign in one click.
- **In sequence:** placing a settlement later (`placeFrame`, the best-placement button) RESUMES the same process at the
  placement stage with one more requirement, under the **least-change goal** (change nothing that exists; search the
  whole map for a lawful site; show the three best with reasons). Only when no site is lawful does it step back into W3
  or W1 for the smallest causal change — that IS organic self-correction (F7): a plausible extent for the world's scale,
  graded edges (steppe and scrub between desert and green), every other settlement's facts protected, and the new country
  explaining itself ("the rain shadow of the Greyspine"). Painting is the last resort, only when the DM forbids terrain
  change, and then at a plausible extent with graded edges and a DM-view mark "not explained by physics".
- **One process (F9d):** the panel's live preview runs these exact stages at the coarse rung; Generate runs them at the
  fine rung; an option change re-runs from the earliest stage it affects; a later addition resumes; an approval point
  (§5.3) pauses the run and it continues after the decision. Hand placement by the DM is checked by the same stages in a
  dry run and never authored for them.

### 4.4 The solver's goals, in order
1. hold every `locked` requirement and every included settlement's dossier facts; 2. pursue every `set` target;
3. when a world exists, change it as little as possible (least-change); 4. stay physically plausible (the living physics
is never overridden by the solver, only steered through causes); 5. randomness fills the rest.

### 4.5 Determinism and budget
Same requirement set, same decisions, same seed → the same world by either path; the back-step's candidate fixes are
ranked by a deterministic score and drawn on `world.recipe`'s stream with ordinal keys; the search runs on the coarse rung
inside the size row's budget (the preview budget) and the final fine run once. A requirement that cannot be met at the
asked size says so and offers the fix (a larger world, a wider latitude box, more relief) — it never fakes the result.

---

## 5 The precedence ladder and the approval rule (F8)

### 5.1 The ladder (strongest first)
1. **dossier facts** of a placed or included settlement (the host's; the `dossier` term's ∞ weight);
2. the **DM's overrides and locks** (always-so overrides, locked regions, locked options, pinned features);
3. the **user's generation requests** (`set` options, inclusions, described relations);
4. **physical plausibility** (the living physics);
5. **randomness**.
It is one ladder for the panel, the brush, the physics pass, the atlas arrangement and the host's own changes; it is the
map-side counterpart of the host fabric program's forced-fact precedence (V13 §3.11.4's reading of it).

### 5.2 When the process asks, and when it does not
It asks exactly when an action would change something owned by a HIGHER rank than the action's own: a settlement's
dossier facts (always), the DM's overrides or locks (when a reroll, a release or a request would overwrite them). It
never asks about ranks 4 and 5. So "Random all" keeps its one-click promise: conflicts resolve to the safe defaults
(fit the world around the settlement; keep the mismatch flagged) and a short summary says what was done.

### 5.3 The conflict list (the pop-up is this list with one item)
A conflict names every affected settlement (one stroke may touch several) and offers, everywhere, the same choices:
- **cancel**;
- **fit the world / paint around it** — the action applies except in a natural-looking zone around the settlement, with
  graded edges, so the dossier stays true (the solver's least-change correction);
- **keep the mismatch** — the action applies, the dossier stays, the DM view flags the contradiction (`W_EDIT_DOSSIER`'s
  `keepResidual` family);
- **update the dossier** — the only choice that changes the settlement, and only on the user's approval here; it asks the
  kind: *"the land changed"* (default; a dated host event from this week, the old biome kept in history) or *"it was
  always so"* (the host's retcon path, under the host's own guards); the map sends it through the host's own world-fact
  command and shows it done only on the host's confirmation (`consumed`'s form); each side keeps its own undo;
- **move the town** (never under `hostLocked`);
- **change the request** (at generation).
The pop-up previews consequences: the dossier fields that would change, whether the host's economy or food would feel it,
and what the settlement map does (nothing by itself: its surroundings read the new land cover at view time; regenerating
the town's own ground is a separate, explicit act). The reverse direction (the DM changing a settlement's biome inside
the host) runs the same organic correction with the same preview before the land reshapes.

### 5.4 Presets and memory
The surface may pre-decide conflicts on the map side ("always fit the world to my settlements", "keep mismatches and
flag them", "move unlocked towns when better") — never on the host side: **updating a dossier always asks** (F8). Every
decision is stored with its requirement and reused by later rerolls and physics passes; a decision is asked anew only
when what it rested on changed (a new settlement, a dossier edited in the host, an area unlocked).

---

## 6 The generation surface (F5, F6)

- **Generated first, then editable.** Opening a world page shows a generated world at once (the host's instant-world
  precedent); options steer the NEXT run; in a campaign the settlements are fixed inputs and "include my campaign's
  settlements" is a toggle usable with every level.
- **One layered panel, not modes** (the host's own lesson: its Quick/Advanced/Custom fork collapsed into one layered
  panel): *Random all* (one button; the seed shown for sharing) · *Basic*, always visible (size; shape — the templates and
  the formation scenarios; climate band; land and sea; ruggedness; wetness; settlement density on a standalone world) ·
  *Advanced*, collapsible groups each with random and reset (terrain; formation; climate; water; biomes, incl. the
  inclusion chips with amounts; resources; routes and sites; politics on a standalone world; names) · *Deep constraints*
  (sketch landmasses or mountain lines; pin a feature; import a heightmap or a legacy map; lock regions and regenerate the
  rest). **Every option has three states** — random / set / locked (§4.1's strengths); every option defaults to random;
  the user's choices (with their `random` sentinels) are stored apart from what was rolled, and regeneration re-reads the
  choices, never the rolled facts (the host's config/_config law, restated for the world).
- **Derived chips and live conflicts.** With settlements included, their needs appear as read-only chips beside the
  user's choices, and conflicts show BEFORE generation with the §5.3 choices.
- **Targeted rerolls** by stage (terrain, climate, water, biomes, resources, names) and by region.
- **Three verbs for the user** (§7.3): *reroll*, *re-run physics*, *let time pass*.
- **Nothing hidden.** Every control is drawn for every account kind, disabled with its reason where an account kind may
  not use it; the gate is enforced at the one generate action, never in the panel (the host's rule, mirrored).
- **Each option says what it shapes** (a coarse live thumbnail); the world explains itself after generation (reason
  records; "why this desert"); configurations save as named presets and share in the gallery.
- Who gets which level is the owner's (§16).

---

## 7 The DM always wins (F3)

### 7.1 Overrides and disturbances
The two verbs (V13 §3.14) extend to every physical layer: a painted biome, land cover, soil or current is an
**always-so override** — the living physics respects it and derives its neighbours against it (an override is a boundary
condition of the dirty set, never overwritten by a re-derivation; V13's lock law). A painted fire, flood, clearing or
eruption is a **this-happened disturbance** — dated, the land recovers from it by the ecology's succession tables; it
is never undone by physics and never erased by a reroll.

### 7.2 Invariants of every physics action
Never touches a placed settlement frame's interior (the blend band holds, V13 §3.11.2); host-bound facts are offered
(`physicalChange`), never imposed; this-happened events are kept; dossier contradictions raise §5.3.

### 7.3 The three verbs (the user's words for V13's commands)
| verb | V13 command | what it does | asks? |
|---|---|---|---|
| **reroll** | `regenerate` (exists; extended to any stage and region) | new dice for a stage or region, the recipe's other ops kept | when it would overwrite a lock or an override (§5.2) |
| **re-run physics** | `physicsPass { scope: world \| region \| layer; depth: 'rederive' }` and `depth: 'release'` | *rederive*: the living physics over the scope with every override held; *release*: the DM's always-so overrides in scope are released and physics takes over — each released override kept as visual history or removed, the DM's choice (the owner's earlier rule on water edits) | *release* always (rank 2) |
| **let time pass** | `physicsPass { depth: 'weather', years }` | formation's slow processes (erosion, soil, succession at geological pace) over the CURRENT terrain for a chosen span, baked and deleted again (§3) | when it would move a lock, an override or a settlement's dossier fact |
All three run through preview-and-commit on the counterfactual fork (V13 §4.5) and report band crossings and dossier
conflicts before committing.

---

## 8 Sail routing (F4)

The living physics' currents and monthly winds price every sea leg **by direction, month and vessel kind** (sail,
oared, coastal craft): effort = distance ÷ effective speed, the speed from a vessel polar (speed against wind angle)
plus the current's along-track component, with tacking and leeway costs; W7's water legs are chosen per direction and
season (outbound and return may differ; sailing windows emerge: a monsoon route one way in summer and back in winter; a
sea closed in winter). Deterministic — no random weather; storms stay the host's storm season. The port offers
directional, seasonal sea efforts beside the host's symmetric lanes as a host change (an H-row), sending the symmetric
mean until the host adopts direction; the canon's `TravelEdge` stays symmetric unless the host asks. A strait opened or
closed re-derives currents and routes with band crossings reported. A lens drawing a sea link uses the host's own leg
unless the host adopted ours (V13 §5.8's four classes).

---

## 9 Ruins by settlement age (F3)

On the settlement side (the base's generator, not the world): at generation only, the settlement's age
(`HistoryHint.founding.yearsAgo`, else the tier's fallback) decides (a) whether earlier strata lie beneath it,
(b) how large — a share of the oldest growth stages' area, growing with age and tier, bounded, (c) how deep — an
occupation-debris accumulation rate × age, calibrated from the science note's stratigraphy anchors. It composes with the
existing scar burial (a severe fire or flood) and the buried former settlement (the replay): union of extents, the
deepest floor wins; it is a deterministic draw keyed by the settlement's root; its galleries and chambers are the
existing `buried` kind (V04), reached by V14's sites and encounters as that kind already is; never grown during the
campaign. It is a base change (an item of file r applied by the coherence seat) and a base milestone's.

---

## 10 The atlas (F11–F15)

### 10.1 The document
An **atlas** is an individual save (F15); a user may have many; one world document may belong to several atlases. It
holds **references** to member world documents (never copies), their **arrangement** (position, rotation, lock), the
**described relations** between them, the **gap styles** (sea, strait, mountains, mist, terra incognita), the visual
style and viewpoints (§11), its conflict settings, and the rendered imagery of each member at the member's own present
week. It holds no physics, no simulation and no host data, and feeds nothing back. Deleting a member leaves a marked gap
in every atlas that used it, never a silent hole. Sharing shares imagery only for members the user may share. The
architecture's word is **atlas** (V13's "world" is taken, §12); the product label may be "World map" (the owner's,
§16).

### 10.2 Isolation, and the one coupling
Members are isolated in everything but image (F11), with ONE exception, by the user's choice and only at a member's
generation: continuation (§10.4). Three levels, chosen per neighbouring pair: *image only* (seams softened; unknown space
between); *matched at generation* (the new member took its neighbours' edge charters once); the owner's F13 "ongoing
effects" level is **withdrawn by F14** (§10.5).

### 10.3 Arrangement (F12)
Direct placement (drag, rotate, snap edges, lock, a ruler of true distance) and described relations ("Varn lies east of
Ashmark across a narrow sea"; "Thornwood sits inside Ashmark"; "Kesh lies far to the south beyond unknown lands") solved
by the same requirement engine at atlas scale (adjacency, latitude and climate compatibility as requirements; locked
positions held; the rest arranged around them; least-change). Layout presets (one clustered continent, an archipelago of
known lands, scattered realms in the unknown). Warnings, never refusals, for overlaps and latitude or climate clashes.
Undo and history for every arrangement change. Every member is metric and shares the sea-level datum, so true-scale
alignment is automatic.

### 10.4 Continuation at generation (F13, narrowed by F14)
When a world is generated into a void beside or between members, each shared edge supplies a **world edge charter** —
V13's `FrameCharter` pattern one rung up — carrying the neighbour's TIMELESS facts along that edge: the elevation
profile and the landforms that run off the edge; coastline and sea; river crossings with their flow; groundwater;
monthly temperature, the wind's direction and the moisture it carries across the edge (how a rain shadow continues);
currents; bedrock, soils and the potential vegetation (graded, not jumped); latitude and sea level from the atlas
position; the neighbour's always-so overrides along the edge (true at every time by definition). It NEVER carries
this-happened events, land cover, or simulation state. The new world's solver takes each edge charter as a `locked`
requirement (§4.1); its basic options are pre-filled from the neighbours (climate band, wetness, ruggedness) and remain
changeable where not locked; a void between several members has several locked edges; contradicting edges are reported
with a reconciling feature proposed (a sea, a strait, a mountain belt). The neighbours are not changed by default; a
request that would change one shows the neighbour's change in the conflict list and nothing changes without approval.
The new world stores the charters it was generated from with each neighbour's version (provenance, as a settlement
stores its charter).

### 10.5 Microcosms (F14)
After generation nothing crosses a seam: edits stay local; each member runs its own clock and history; seams may drift
apart and the atlas softens them visually; a DM may show a small drift marker on a seam, information only; re-matching is
only on request — regenerating or refitting a border strip of ONE member, previewed. The atlas shows each member at its
own present with its date label ("Year 412, early spring"); a common-week display is an option, not the default.

### 10.6 Seams between sizes (F11b)
The ladder's rule (§2): the more detailed member wins on its footprint; the coarser yields. Side by side: the seam is
softened along the shared stretch only; matched at generation if asked. A member inside another: *derived from the
parent* (generated from the parent's data as a settlement is from its world — coherent by construction; the preferred
path); *separate, image only* (drawn on top with a softened edge; a mismatch warning where they disagree); *separate,
then fitted* (the parent bends around the child through V13's placement machinery — the detailed member plays the
settlement, the parent the world — with the same preview and conflict list). Level of detail: the atlas renders every
member to one pixel resolution and draws symbols by one shared zoom rule; zoomed in, a detail step is eased over a band at
the seam or embraced as an **inset** with a thin frame (the printed atlas convention). Precedence between equal rungs:
the DM decides; the newer member by default.

### 10.7 Drill-down and viewers
Zoomed out, image tiles; click a member or zoom past a threshold and the live world document takes over, then
settlement, interior, site (the reverse of F11's "click deeper"). A player's view shows only what their party knows,
drawn in their culture's style if the relational style is on (§11); the DM's arrangement is the true layout.

---

## 11 The relational historical style (F10)

A **view** (V13 §5.8's fact class 4: an owner-ruled projection, labelled, never host truth) over an atlas or a single
world: the true map keeps absolute scale and every measurement; the relational map is an adjacency-preserving warp of it
(an area cartogram) in which places the mapmaker cares about swell and places it neglects shrink; a slider morphs between
the two; hovering anywhere shows true distance and travel time (the Tabula Peutingeriana's labelled distances). The
distortion is derived from facts, never from whim: the **centre** is a holy city or capital from the host's religious
hierarchy or the mapmaker's realm; **size** follows tier, trade importance and holiness; **orientation** follows the
culture's convention (east-up for a sacred style); **detail** follows what that culture knows — unknown lands blur into
legend and terra incognita. Embellishments are derived: sea serpents in deep, little-sailed or storm-feared waters;
dragons where knowledge ends; monstrous peoples and devils in lands the mapmaker's culture is hostile to, far from, or of
an enemy faith — tied to the FICTIONAL cultures and their beliefs, never to real-world peoples; vignettes for real dated
events (a skull for "The Wasting", banners for a war, the holy city's cathedral drawn huge). The DM may add, move or
remove any of them. **Every map is somebody's map:** a viewpoint = an audience + a culture; a party's map improves as
they learn; a map found in a dungeon is another culture's world. Style presets: the sacred mappa mundi, the practical
portolan (compass roses, rhumb lines), the itinerary strip (roads straightened, distances in days). Deterministic for a
given world, viewpoint and week; the warp costs well under a second; the real cost is art (a library of monsters,
vignettes, cartouches, lettering). It lives in V15 (the atlas is its natural home) and reads a single world through V13's
view and lens facts.

---

## 12 Vocabulary — one word, one meaning (the fold's requirement 21, kept)

| word | means | never |
|---|---|---|
| **world**, world document, world page | V13's realm- or region-rung simulated document and its page | the stitched layer |
| **atlas** | the stitched, image-only save of F11–F15 (product label: the owner's, "World map" allowed) | a simulated document |
| **plate** | the lens cache's snapshot per host advance (`LensPlate`, V13 §5.8) | a tectonic plate |
| **crust block** | formation's moving crustal unit (the literature's tectonic plate; the evidence line may say "plate") | a lens plate |
| **biome** | the climate-level class (the dossier's; V11's `ClimateRow`; W5's output) | land cover |
| **land cover** | the ecology layer's campaign-time state (fields, pasture, scrub, regrowth, scars) | the dossier's biome |
| **override** | an always-so edit (rank 2) | a dated event |
| **disturbance** | a this-happened dated physical event the land recovers from | an override |
| **formation / living physics / ecology** | the three lifetimes (§3) | each other |
| **requirement, conflict, decision** | §4.1 / §5.3 / §5.4 records | UI words |
| **continuation** | a world generated with atlas neighbours' edge charters as locked requirements (§10.4) | ongoing coupling |
| **seam** | a shared edge between atlas members | the base's "seam" between volumes (a document-review word, confined to docs/volumes/critique) |
| **fit** | V13's placement machinery used across rungs (§10.6) | the blend band alone |
| **viewpoint** | an audience + a culture for the relational style (§11) | the lens audience alone |
| **scenario** | a formation template row (§3) | a campaign scenario of the host |

---

## 13 Where each rule lands, and who writes it

| rule | lands in | seat |
|---|---|---|
| F1, F2 (formation; living physics; ecology) | V13: a formation op and its baked payload, bedrock and soil rasters, landform entities (§2.2 records, §2.3 tables, §3.1 W0, §3.2 W1); W3 and W5 upgraded; the downwind dirty set (§3.14); a new ecology stage and its plate; J-V13.41/42 reversed; tests; budgets and the spike; the base's §2.9 keys only if a view key is needed | design seat A (amendments r) |
| F3 physics pass; the DM always wins | V13 §3.14 (the verbs on every layer), §4.1 (`physicsPass`), §4.5 (preview on the fork), §7.5 warnings | seat A |
| F3 ruins by age | the base §4.2 S2 and II.7.6 (an item of file r), V04's buried kind unchanged, V14 unchanged | seat A |
| F4 sail routing | V13 §3.8 W7, §2.2 `WorldRoute`, the port's offer and an H-row | seat A |
| F5, F6, F7, F8, F9 (the surface, inclusions, settlements, placement, correction, the pop-up, one process) | V13 §3.0–§3.1 (requirements, the stage contract), §3.11 (the resumed process; the correction), §4.1 (events), §3.14 (the conflict list generalising `W_EDIT_DOSSIER`), the port (the dossier update through the host's command; an H-row); V09's world dialog hooks as a BCR to V09 (the layered panel is V09's UI; its semantics V13's) | seat A |
| F10 the relational style | V15 (the view) with BCRs to V13 for the facts it reads | design seat B (V15) |
| F11–F15 the atlas | V15 whole; BCRs to V13 (the world edge charter; the rendered-tiles reading at a week; the fit across rungs) and to V09 (the atlas page) and the base (the atlas document kind in §2.9's document kinds, if the base enumerates them) | seat B |
| the vocabulary (§12), the ladder (§2), the seams (§14) | both volumes, reconciled by the seam seat | seam seat |

---

## 14 The seams between V13 and V15 (the seam seat's contract)

1. **The world edge charter** (V13 → V15 → a new world): V13 defines `WorldEdgeCharter` as `FrameCharter`'s sibling
   (the fields of §10.4), produced by `edgeCharter(world, side, span)` and consumed by W0 as locked requirements; V15
   only carries it. Timeless facts only — the test is "would this fact be identical at every week?".
2. **The rendered member** (V13 → V15): V15 reads a world's rendered tiles at its present week, extent, datum, latitude
   box, size rung, present week and date label, known-world sets per audience, and nothing else.
3. **The fit across rungs** (V15 → V13): V15 asks V13's placement machinery to fit a child member into a parent
   (`placeFrame`'s form with a world document as the frame); V13 adds the rung-general form.
4. **The relational style's facts** (V13 → V15): the holy and capital hierarchy, tier and trade importance, hostility,
   knowledge per audience, dated realm events — through V13 §5.8's lens facts and §5.9's rows, as fact class 4.
5. **The arrangement solver** (V13 → V15): the requirement engine's interface (`solve(requirements, state, goal)`) is V13's;
   V15 calls it over map placements.
6. **No reverse seam:** V15 writes nothing into a world document after its generation (F14).

---

## 15 M0, milestones, order, budgets, spikes

- **M0:** nothing here touches `plat/packages/kernel`; stage ids and concerns are registry rows appended after M0 under
  K6, listed in the BCR ledger.
- **Milestones (V13 §8, extended):** M-W6 the requirement solver, the surface and the dossier seam; M-W7 formation and
  the living-physics upgrade (gated by spike SP-FORM: formation + erosion at the coarse rung inside the size budgets,
  and a visual gallery judged by eye); M-W8 ecology and the physics pass (rederive, release); M-W9 sail routing; the
  weather depth after M-W8; ruins by age in the base's own milestone that holds II.7.6. **V15:** M-ATLAS-A the image-only
  atlas with arrangement and drill-down; M-ATLAS-B continuation at generation and the fit across rungs; M-ATLAS-C the
  relational style.
- **Order by value:** ruins by age and the rain-shadow fix; the surface, the solver and the pop-up; the climate upgrade;
  formation and erosion; ecology and the physics pass; sail routing; M-ATLAS-A; M-ATLAS-B and -C; the weather depth.
- **Budgets (guesses until measured, person-weeks):** solver + surface + pop-up 4–6; formation + erosion 4–6; climate +
  soils + ecology 4–6; sail 2–3; ruins ~1; atlas A 2–4; atlas B 2–3; the relational style 2–3 plus art. All off the M0/M1
  path.

---

## 16 What stays the owner's
Account gating of the surface's levels; the atlas's product name; atlas sharing and privacy across campaigns; V13 §11 Q4
(door 1 and the world canon) — unchanged and still open; the art budget for the relational style.

---

## 17 Families of tests and decisions the pass must add
Tests: baked-formation invariance (a formation code change moves no stored world); formation deleted (no block state in
any digest); the downwind dirty set (a raised range dries the land behind it; nothing else changes); override respected
and built around; disturbance recovered by succession; land cover never raises the dossier warning; the solver's two
paths agree (at once = in sequence under the same requirements and decisions); least-change; no arid dot (minimum
extent, graded edges, other settlements protected); the conflict list asks exactly at rank crossings; a dossier changes
only after approval and only through the host's command; presets never approve a dossier change; decisions remembered;
sail legs directional and seasonal, symmetric mean to the host; ruins by age deterministic, bounded, generation-only,
composed with scar burial; atlas members isolated after generation (an edit in one changes nothing in another); the edge
charter carries no dated fact; each member at its own time; fit across rungs never changes the child; the relational
warp preserves adjacency and reports true distance; embellishments derived from facts and never from real-world peoples.
Decisions: J-V13.n for every choice above that changes a V13 decision (incl. the two reversals) and J-V15.n for the atlas.
