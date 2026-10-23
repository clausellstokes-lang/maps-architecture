# The physical world and the DM's hand — from continent to room

> Provenance: written by Opus 5.5 under the Fable manager (J392); read and weighed by the manager's synthesis.

**What this is.** A reading seat's judgement of the paired product's *substance and experience* along one slice: the
physical world as a game master meets it, from the formation of a continent down to a flooded cellar and an encounter
crop exported to a virtual tabletop. It does not judge build time, cost or debt. It walks the slice as a DM would,
cites the text that promises each moment, says what the DM would see and feel, and then gives verdicts.

**Read.** V13 §0, §2.2–§2.3 (the tables), §3.1–§3.6, §3.10–§3.14, §4.1–§4.7, §5.1–§5.2; V09 §4.22; V14 §0, §1.4,
§3.1–§3.13, §5.2–§5.3; the base's §4.2 S0 and II.7.6; `docs/AMENDMENTS-2026-10-23r.md` items 926–933 (the owner's F1,
F3, F7, F8). Host, read only: `DESIGN_EDIT_MODE_AND_DECREES.md` §0, §2.6, §2.7, §14, §22; `DESIGN_FP_ARCH_MF.md` §5.-1c.
No code was read or copied.

---

## 1 The walkthrough

Each act: what happens (cited), what the DM sees, and what editing it feels like — previews, warnings, conflict
choices, undo.

### Act 0 — Opening a world

**What happens.** "A new world document opens already generated … the dialog open beside the map with every option
reading **random** and its rolled value shown greyed beneath it ('random — rolled: temperate, 42° N'). There is no
wizard and no empty state: the user edits a world, never a form" (V09 §4.22 (1)). The panel is layered: **Random all**
with its seed, **Basic** always visible (size, shape — templates and the scenario card —, climate band, land and sea,
ruggedness, wetness, the *Include my settlements* toggle), **Advanced** collapsible groups each with random and reset,
**Deep constraints** (sketch landmasses and mountain lines, pin a feature, import a heightmap, lock regions and
regenerate the rest), and the physics toolbar beside them (V09 §4.22 (2)). Every option cycles random · set · locked,
and the choices are stored apart from what was rolled, so "a rolled latitude box does not pin the next run, and a
locked one does" (V09 §4.22 (3); V13 §3.1 (1), J-V13.123).

**What the DM sees.** A map at once, not a questionnaire. Hovering an option shows a coarse thumbnail of the world it
would make, "within 300 ms at the realm rung", and "the preview is the run — the same stages on the coarse grid, never
a cheaper proxy" (V09 §4.22 (4); V13 §3.1 (7)). After **Generate** a verification report says what was done: "every
row met, partly met or unmet with its reason (… 'arid at 180 mm/yr in the Greyspine's shadow') … never faked"
(V13 §3.1 (7)).

**How it feels.** This is the best first minute in the slice: the DM is never asked to understand the machinery before
seeing a world, and every greyed rolled value is an invitation ("I'd like that colder") rather than a form field.
The one oddity: **Random all never runs the formation step.** "`scenario` default `'none'` — the authored path, no
formation op … a scenario is never drawn by chance, and the one-click world is the authored path" (V13 §3.1 (1)). The
one-click world is a template heightmap (`continent`, `archipelago`, `peninsula`, `highland`, `riverlands`, `coast`;
V13 §3.1 (3)), the reference generator's idea in the volume's own words. The geology the owner asked for in F1 is
opt-in, behind the scenario card.

### Act 1 — A formation scenario and the terrain it gives

**What happens.** The DM opens the scenario card and picks one at the continent rung. W0 draws its knobs and writes a
`formation` op first in the recipe (V13 §3.1 (3)). The op then runs once on the formation grid (V13 §3.2.1). The crust
blocks are irregular and non-convex, "a plain partition reads as artificial" (step 2). Their boundaries are classified as
convergent, divergent or transform (step 3). Uplift profiles give each class its landform. Ocean–continent gives "a
trench at 0, a forearc high at 50–100 km, the arc's peak … a back-arc plateau or basin beyond". Continent–continent
gives "the range centred 50–150 km on the overriding side, the plateau behind …, the foreland basin in front". A rift
is "a graben between uplifted shoulders". A hotspot is "a swell with an edifice … and a decaying, subsiding chain".
Relict sutures appear as "worn mountains that last" (step 5). Rivers are cut by a steady-state stream-power fixed
point, so the relief is "fully dendritic … obeying the Hack and bifurcation statistics" (step 6). Ice carves troughs and
cirques, and the overdeepenings later fill as glacial lakes. A sea-level lowstand cuts valleys across the shelf, so the
drowned valleys read as **rias**, the glacial troughs at the coast as **fjords** with sills, and the rebound as
**raised beaches** (step 7). Bedrock follows the formation story (arc volcanics, folded belts, shield, flood basalt,
evaporite basins, alluvium, till, ash; step 8). Soils come from climate, slope, wetness, parent rock and surface age
(step 9). Then the op traces its **landforms** as named entities and **deletes** everything else: "no crust block
moves after this line" (step 10). W9 names the ranges, volcanoes, rifts, fjords, glacial lakes, plateaus and basins
through the naming service and labels them along crests or at their pole of inaccessibility (V13 §3.10 (1)–(2)).

At the realm and province rungs the scenario honestly shrinks. A realm "holds on average 300–500 km of active
boundary, one boundary or none", so it gets one or two boundaries plus relict belts. A province gets one regional
profile: "a mountain front, a rift, a volcanic field, a coastal plain, a shield" (V13 §3.2.1 (1)).

**What the DM sees.** Relief, with `landforms`, `bedrock` and `soil` layers on demand (V13 §5.1); the clerk's "a
collision range of the young-range scenario" (V13 §2.2); a knob change costing a 0.3–2.3 s bake "with a progress strip
and the last bake's thumbnail shown meanwhile" (V13 §3.1 (7); §3.2.1).

**How it feels.** Real, and earned. A DM who knows a little geography will recognise a fjord coast with its sills, a
foreland basin in front of a young range, a worn suture across a craton. These are exactly the features the template
path cannot give. The deletion rule is the owner's (F1: "tectonics are only used in the formation of the world … After
which it's deleted for full customization"). It is right for the DM: nothing afterwards argues with their brush.
The cost is that the story ends at the bake. After formation, a DM sees landforms with names and a provenance line,
and nothing that says *where the boundary was* or *which way the blocks moved*. The richest generative idea in the slice
leaves almost no visible trace beyond its results.

### Act 2 — Climate: months, belts, monsoons, currents

**What happens.** W3 runs on the coarse grid with twelve monthly temperatures. The seasonal amplitude grows with
latitude and continentality (V13 §3.4 (2)). Continentality is measured *by upwind fetch*: "a cell 50 km inland on an
east coast in the westerlies is continental and a cell 500 km inland on the west coast still a third maritime" (step
3). The wind belts follow a convergence zone that swings with the month (step 5). A monsoon is *emergent* at the
continent rung and, at smaller rungs, "never emergent (a 1 280 km map cannot make one; it can only receive one from a
continent larger than itself)". There it is a world-context knob, and asking for a monsoon without it raises
`W_MONSOON_CONTEXT` with the knob offered (step 5). Rain comes from a moisture march per month, with orographic drop
and rain shadows (step 6). Ocean currents are a solved gyre per basin at the continent rung, or a coast-facing rule at
smaller rungs. The coastal effect is spelled out: "a cold-upwelling coast is a desert coast and a warm-current coast a
humid one" (step 6b).

**What the DM sees.** `climate`, `monthly` (with a month slider and a wind arrow field) and `currents` layers (V13
§5.1). The world's own "why" for any cell: "the band and the parcel's moisture at arrival" (V13 §3.4, *Output*).

**How it feels.** For a DM this is the layer that makes the map *usable* rather than pretty. The design does not just
put deserts in the right places; it makes them findable and explainable. Its edges are drawn honestly: a realm's open
sea "reads its context's coast current and no gyre of its own" (V13 §3.4, *Edges*). The month slider pays off at the
table: the wet-season river, the frozen lake's ice weeks (V13 §3.3 (3)) and the sail routes priced "by direction,
month and vessel kind" (V13 head, file r). Nothing here is conventional.

### Act 3 — Water: rivers, lakes, springs, the table

**What happens.** Lakes form by spill height and are classed. A lake is `fresh` when its inflow beats its
evaporation, `dry` (a flat) when closed and heavily evaporating, `salt` when closed and arid, else `brackish`. "Ice is a
season, never a subtype" (V13 §3.3 (2)–(3)). Rivers are reaches of real discharge in m³/s, with width and depth from
hydraulic geometry, deltas split into 2–3 distributaries, estuaries widening, and navigability by discharge (V13 §3.5.3).
The water table "rises inland from the rivers and lakes by how wet the country is and what the rock lets through, and
where it meets the surface there is a spring — the first thing a village is sited by" (V13 §0; §3.5.4).

**What the DM sees.** `water`, `watershed` and `waterTable` layers; springs as pins; a reason per reach (V13 §3.5.3).

**How it feels.** Groundwater with springs is new to most DMs' tools (the reference "has no groundwater", V13 §3.5.4),
and it pays off later, at the cellar and the crypt, without the DM asking for it.

### Act 4 — Vegetation, resources, and what the land looks like today

**What happens.** W5 classifies every land cell's twelve months by Köppen thresholds into a potential natural
vegetation. The temperatures are lapsed to the fine cell's own height, "so a peak inside a coarse cell reads its own
climate, never its valley's". Then the overrides apply: a treeline by growing season, wetlands by accumulation and
slope, **gallery forests** along rivers through arid land, and edaphic heaths and grasslands by soil (V13 §3.6 (1)).
Resources come from eight rule rows: timber, stone, ore, salt, clay, fish, peat, pasture (V13 §3.6 (3)). Separately,
**land cover** — "fields, pasture, coppice, fallow, scrub, regrowth, a burn scar, a flood's silt, ash" — is a pure
function of dated facts. Around each seat, its population's land demand is met by travel time ("a seat of 10 000 fills
a disc of 7–10 km"), and abandoned or disturbed land runs a succession table by biome (V13 §3.6 (5)).

**What the DM sees.** By default, the relief map with the used and disturbed classes laid over it: "the world page
shows its fields and scars by default" (V13 §5.1, `landCover`, J394). A hover names a cell's class, its last event and
the weeks since.

**How it feels.** The fields around towns are the single most "lived-in" touch on the world page. Unlike most map
generators, they grow and shrink with the campaign, through the host's events. The biome-versus-land-cover split is
right, and it is said in plain words in the legend: "the host's dossier holds the biome". The resources are thin for a
fantasy table. Eight mundane kinds, with "ore" generic, means no silver vein, no gem pipe, no mage-touched spring. The
volume says "the resource rule is own" (V13 §3.6). It is a sensible floor and not yet a game-maker's palette.

### Act 5 — Editing the physical world

**Raising a range.** In T2 `ground` the DM appends a `range` op with a brush at the pointer's extent. The op runs on a
fork, and the DM sees "the relief before the commit" (V13 §3.2, *Preview before commit*; §4.2 T2). Because "a rain
shadow is not local — a raised range dries the land 200–700 km downwind", any relief edit "however small" re-runs the
whole monthly march and every basin's current solve (V13 §3.14.2; J393). The change list shows "reaches moved, lakes
opened or closed, placements whose charter goes stale; the precipitation diff downwind" (V13 §4.2 T2). If a
settlement's biome would change, the conflict list opens before the commit (Act 7).

**Draining a lake.** There is no single verb. The DM can drag the lake's **level slider**, "with the seasonal pair
marked" (`setSurface`, V13 §4.2 T2). That records a dated surface the physics then keeps: "a dated or edited surface
kept" (V13 §3.14.2 step 3). Or they can remove the `pit` op that made the basin, so that "no lake survives without
inflow or a filled depression" (V13 §3.14.3 row 5). Or they can cut the spill saddle with a terrain stroke and let the
cascade re-fill it lower. The three give different, defensible results — a lake held low by fiat, a basin unmade, an
outlet cut — but a DM who thinks "drain that lake" must already know which one they mean.

**Painting a biome.** The layer brush under *always so* writes an `Override`: "a boundary condition of every dirty set
… which the living physics respects and derives its neighbours against and no re-derivation ever overwrites" (V13
§3.14.1). It survives rerolls and physics passes ("a painted biome and a dated fire survive the reroll", V13 §3.14.3
row 15). The `traces` layer hatches the overridden cells in their layer's colour (V13 §5.1). This is the owner's F3
exactly ("A painted biome is a 'this was always so' override that the physics respects and builds around").

**A fire.** The disturbance stamp (*this happened*, with a severity and an optional date) writes a `Disturbance` that
"the land recovers from … at the pace its biome recovers", and it is "never a terrain or water change by itself" (V13
§0; §4.1 `disturb`). The DM sees "a disturbance's recovery stages on a year slider" (V13 §4.2 T2): burn scar, then
scrub, then regrowth, then young forest, by the `world.cover` recovery rows. Clearing and regrowth "never raise the
conflict list … only a change of `biome` can" (V13 §3.6 (5)). A fire never pops up a dossier question. That is right.

**The physics pass, three depths.** One toolbar with the DM's three verbs over the whole world, a box or a drawn region
(V13 §4.2 T10; V09 §4.22 (8)): *reroll* (regenerate a stage's draws), *re-run physics* (**Re-derive** around every
override, or **Release** the overrides with "keep as history" or "remove"), and *let time pass* (**Weather**, 100 to
10⁶ years). Every pass runs on the fork. The diff layer shows "the cells changed by layer, the overrides released, the
sailing legs and band crossings moved and the conflicts raised", and the DM commits under the verb the depth implies
(V13 §4.5). Weather states its effect in words before the commit: "over 10 000 years the valley floors of this shield
lower by about 1 m; the soils age one class" (V13 §3.2.1 (11)). Two invariants protect the DM's other work: a pass
never touches "a placed frame's interior nor a free-standing site's footprint (clipped, `W_PHYSICS_CLIPPED`)", and
"every `Disturbance` [is] kept" (V13 §4.1 `physicsPass`).

**The two verbs and the cascade.** Every terrain and water edit carries *this happened* (default) or *this was always
so* (V13 §3.14.1). *Happened* keeps the past as a trace: "the old ford stays as a `trace` the clerk can name: 'the ford
is gone because the river was re-routed in year 412, this happened'". *Always so* rewrites history, and "the history
frames show the new state in every epoch". A trace can be deleted alone. The cascade has a fixed order — terrain,
climate, flow, surfaces, the table, then the consumers, then one level up — and the consumers are named: 22 readers,
from V04's cellar `flood` attribute to the encounter memo and the sailing legs (V13 §3.14.2, T-V13-21b). The eighteen
"model drift" failures of the reference generator are each turned into a test that the map does *not* drift (V13
§3.14.3).

**Undo.** A placement edit undoes as one group with its blend and charter. A *happened* edit's undo removes its dated
surface and traces together. "The world and the frame have separate logs and separate undo stacks" (V13 §4.4). "The
frame's user cannot undo the world's placement from the frame; `unplaceFrame` on the world is the way". On a host-bound
world, an edit the host has `consumed` "is sealed: its undo is refused and its reversal is a new edit offered to the
host" (V13 §4.4).

**How editing feels.** Consequential and safe at once. That pairing is rare, and it is the slice's core achievement.
The fork as a universal preview ("What if the sea rose 2 m?", V13 §4.2 T10) is the right primitive: the DM never
commits a consequence they have not seen. The friction is in the count of verbs and states a DM must hold: two verbs,
three pass depths, override versus disturbance, released-with-history versus removed, sealed versus undoable, and two
undo stacks.

### Act 6 — The water class test and a flooded town

**What happens.** One function answers, for any room, cellar, street, crypt, cave or ruin: "dry, damp, flooded to the
knees, flooded to the neck or under water", from one governing level against floor and ceiling (V13 §0; §3.13.2's
table: `dry`, `damp`, `wading`, `swimming`, `submerged`). Underground units take the highest of the local water table
and any open water reached through a passage below its surface. A **liner** holds the table back until it stands
1.5 m over the floor (V13 §3.12.6). Above-ground units are wetted "from above by open water and flood stages" only
(V13 §3.13.1). Paths get a route class: `walkable`, `wading`, `swimming`, `diving` or `none` (V13 §3.13.3).

**The flooded town.** In the town's own document the DM raises the sea's stage on a fork. The flood spreads cell by
cell "into every cell whose ground … is below the stage, **not crossing a blocked cell edge**". Enceintes, retaining
walls, quays, dykes and sea walls carry their top heights. A barrier lower than the stage "is overtopped and recorded
in `overtopped`, the blocking ones in `blockedBy`" (V13 §3.12.4). "No fluid dynamics … the spread is a level set with
barriers" (J-V13.43). Buildings are stacks of storeys, so the flood wets the ground floor and leaves the upper floors
dry. A submerged plot's household "is displaced by the existing flood cause … and whose fields stop yielding" (V13
§3.13.4). A permanent drowning runs the building's lifecycle "to `submerged ruin` at the waterlogged rate". The
renderer draws "a waterline on walls, submerged ruins as ghosts" up to 3 m deep and withholds them deeper (V13 §5.1).
The same test against a dated surface tells the DM what a cellar *was* in an earlier epoch, and against the wet-season
stage what it is in spring (V13 §3.13.3).

**What the DM sees.** The `waterClass` overlay (dry none, damp hatched blue, wading light blue, swimming blue,
submerged dark blue with a ghosted outline), the `flood` overlay with the barrier edges that stopped it, and per unit a
reason the clerk reads aloud: "flooded because the floor sits 212 cm below a table set by the river's surface 40 m
away, reached through the collapsed passage" (V13 §3.13.2; §5.1).

**Across scales — the seam.** If the DM instead raises the *world's* sea 2 m, the world's coasts move and its
consumers re-derive. The town, however, does not flood. The cascade's last step is: "the world marks every placement
whose charter facts moved (`Placement.charter` stale) and offers `worldWins` per frame; it never writes a frame" (V13
§3.14.2 step 6). To see the town's cellars flood, the DM must either take `worldWins` — "a Re-derive from S1 on the
frame … every generated fact re-derived", confirmed with a change count (V13 §3.11.5 (3)) — or open the town and raise
its sea again, by hand, in a second document with a second undo stack. §0's promise ("Raise the sea a metre … a
cellar floods") holds *within* a scale. Between scales it becomes a stale flag.

### Act 7 — The dossier pop-up: when the land contradicts a town

**What happens.** A brush, a range, a reroll, a pass or a placement can change something a campaign town says about
itself: its terrain word, its coast and side, its river, its latitude band, its climate row. Then "the conflict list"
opens before the commit. It has one row per affected settlement, "one stroke that touches several settlements lists
them all", and the same choices everywhere (V13 §3.11.5 (1); V09 §4.22 (6)):
- **Cancel**;
- **Fit the world** — the change applies "except in a natural-looking zone around the settlement with graded edges";
- **Paint around** — an override at the settlement's extent;
- **Keep the mismatch** — flagged on the DM view;
- **Update the dossier** — "the only choice that changes the settlement, and only on the user's approval". On a
  canonized town it asks *"the land changed"* (a dated host event at the next advance; the default) or *"it was always
  so"* (the host's retcon path). On a draft it offers only *"it was always so"* — "(a plain edit, which re-rolls the
  settlement)";
- **Move the settlement** (never under a host lock) and **Change my request** (at generation).

The pop-up previews which dossier fields would change, whether the host's economy or food "would feel it" (else
"unknown"), what the host will do — "on a draft settlement a regeneration under its same-seed law — its people, trades
and history drawn again", "on a canonized settlement a decree applied at the next advance, not this week" — and that
the settlement *map* itself does nothing until the DM asks for `worldWins` (V13 §3.11.5 (1)). The dossier reads
unchanged until the host confirms; `W_DOSSIER_PENDING` stands meanwhile (V09 §4.22 (6)). The ladder decides when it
asks: dossier facts > the DM's overrides and locks > the user's requests > physical plausibility > randomness. It asks
"exactly when an action would change something owned by a HIGHER rank … and never about ranks 4 and 5, so 'Random all'
keeps its one-click promise". Decisions are remembered and re-asked only when what they rest on changes. Presets may
pre-decide map-side choices, "never `updateDossier`: updating a dossier always asks" (V13 §3.11.5 (1)).

**Against the host's own law.** The host's edit law is generous. "Guards inform and offer; they never refuse, because
at this table a god sits and magic is real" (DESIGN_EDIT_MODE_AND_DECREES §0). Its world-fact edit "NEVER re-rolls —
it re-derives the computed facts with every chosen fact pinned … The teleported port keeps its harbour master"
(§14), and on canon every edit becomes a decree at the next tick (§2.6). The map's pop-up matches the canon half
cleanly ("land changed" = the host's decree). It does **not** match the draft half: V13 promises a draft's re-roll
"under its same-seed law that its own warning names" (V13 §8.5, H32). The host's own design says a world fact never
re-rolls. Its own §22 records, as of its writing, that this flagship pinned re-derivation does not yet run. Whichever
way the host lands, the DM's experience of *Update the dossier* on a draft is undecided, and the two documents
currently promise opposite things.

**How it feels.** The pop-up itself is well made. It asks only when it must, offers the same seven choices
everywhere, says what each will cost, remembers decisions, and never writes the dossier behind the DM's back. The
danger is frequency. Because every relief edit re-runs the whole monthly march (V13 §3.14.2), a modest range raised in
the west can tip the climate class of three towns 400 km east, and the pop-up will list all three for an edit the DM
thought was local. That is physically right, and it is the price of "a rain shadow is never local". The DM needs to
see *why* those towns are on the list; the change list's precipitation diff is the right instrument, and it must sit
beside the pop-up, not behind it.

### Act 8 — A settlement from its charter, and a settlement placed first

**World-first (generated from its charter).** On the world, *Charter here* sizes the frame before generation
(`frameOf(size, aspect)`) and shows its outline (V13 §4.2 T6). P4 then writes the **charter**: the edge height
profiles, the water edges and their levels, every river crossing with its discharge and width, the downstream head,
the roads arriving and toward which town, the climate, the water table, the biome mode with its land-use shares, the
resources and sites, and the territory and culture (V13 §3.11.4 (1)–(11)). The town's S0 and S1 read it as their site.
The heightfield meets the charter's edges. The shore displaces the world's coast. Inflows enter at the charter's
stations with the charter's discharge and width. An `out` crossing is "a required exit" (V13 §3.11.4, *How S0 and S1
read the charter*). Two neighbouring towns "agree in the shared margin within 1 cm" — with one declared deviation until
the base's noise is world-keyed (V13 §3.11.4, C13-05). On a dossier-bound town every dossier-tier value wins over the
charter (V13 §3.11.4, *The dossier's precedence*). The base's S0 (ARCHITECTURE §4.2) keeps its own blueprint words
(relief class, coast side, river with inflow bearing, lake, oasis, toggles, the climate row), so a chartered town is
the same town-maker reading a better-informed site.

**Settlement-first (placed later).** The DM drags an existing town's outline over the world. The **coherence cost by
term** follows the pointer, "green at lawful", and a rotation handle turns it (V13 §4.2 T6). P1 tries 360 bearings at
1°. Coast comes first, and "any coast error is unlawful … the port is first turned, never passed green". On a
dossier-bound town the `dossier` term's weight is infinite: "an inland placement of a `coastal` site … the placement is
unlawful whatever the other terms" (V13 §3.11.1). P2 bends the world into a **blend band** around the frame (the town's
own ground replaces the world's inside: "the settlement never changes"). P3 re-runs the local drainage, so "the town's
river finds its way on into the world's". P5 records the precedence stamp, recomputes sun, wind, sea side, seasons,
compass, river direction words and the table under locked basements, and reports anomalies against locks — `windSide`,
`coastInland`, `riverUphill`, `lockedBelowTable`, `sunDiffers` — holding geometry and never silently moving it (V13
§3.11.5 (4)). Mirroring is the DM's explicit act with a warning (V13 §3.11.5 (2)). `worldWins` is the one verb that
re-derives the town from the world (V13 §3.11.5 (3)).

**Best placement.** One button: "the whole-map search, the three offers with their reasons". When none is lawful, the
**organic correction** steps back for "the smallest causal change — … for an arid row a range upwind of the chosen
site, a basin without outlet, a cold current's coast, a narrowed sea". It is sized "an enclave 10–100 km across", with
"graded edges … (steppe and scrub between desert and green)", protects every other settlement's rows, and is
"explaining itself in its reason ('the rain shadow of the Greyspine')". It is previewed on the fork before anything
commits. "**Painting is the last resort**, only when the DM forbids terrain change … labelled in the DM view 'not
explained by physics'" (V13 §3.11.1; V09 §4.22 (7)). This is the owner's F7 to the letter ("shouldn't just be a random
arid dot in the middle").

**Growing the world around the campaign.** *Include my settlements* turns each town's dossier into derived chips
("Kessar: desert, river, caravan route", read-only). W0 lays planned sites from the towns' relationships: partners
within travel days, rivals across a planned boundary, vassals within reach, isolated seats far off. Every later stage
grows toward them: ranges where rain shadows are needed, coasts where ports need them, a river routed to the riverside
seat "from a real source" (V13 §3.1 (5)). "A 'random all' request with settlements included … always fits the campaign
in one click" (J-V13.118). Contradictory locked rows are refused at W0 "naming the pair … never half-met".

**Beneath the old town.** Old ground has depth. A town raised on its own rubble has its earlier street level as a
`buried` system — "each old way's centreline a gallery, each old building's ground storey a chamber … So an undercity
in it walks the old town's streets under the new" (ARCHITECTURE II.7.6, *A buried old town*). A severe fire or flood
scar buries the first-stage districts (*At generation from a scar*). Under the owner's F3, a settlement old enough
"has earlier levels of its own beneath its oldest fabric". The region is "centred on the founding point, the inverse
of the growth S2 models", and its depth follows V04's law: 60 cm per century, deeper for mud brick, shallower on bare
rock (*At generation from age*). The text is candid that "only a metropolis reaches `ageMinYears` on most draws and a
city at most p ≈ 0.2", and that even then a draw decides whether.

**Opening the town.** A click on its glyph — the town's own outline, walls and water (V13 §3.10 (3)) — "opens the
frame document as another page … never an in-place zoom into the arena" (V13 §5.2).

**How it feels.** Placing a town that already exists is the slice's most reassuring act. The world bends, the town
never does, and the cost is reported, not hidden. *Best placement* plus a correction that names its rain shadow is the
moment a DM will show a friend. The placement card is where it gets dense. "A hover shows the placement card (name,
tier, population, the stamp, the coherence cost by term, anomalies, `open`, `worldWins` when stale)" (V13 §5.2). That
is six cost terms, a precedence stamp, five anomaly kinds and a verb named for the implementation. V09 §4.22 draws the
dialog's words carefully. No V09 section gives the placement card its DM-facing words.

### Act 9 — A persistent site, its dungeon, and an encounter crop to the VTT

**Dropping a site.** In the hills outside town the DM drops "a ruined temple". G1 reads the context: `world`,
`country`, `hinterlandNear` or `hinterlandFar` by the enclosure line's distance. An inadmissible kind is bent "to the
nearest admitted kind of the same purpose", and the bend is named (V14 §3.2). G2 derives every unstated field "before
inventing": purpose from context (under a church it is burial, off a sewer concealment), size by envelope, condition
from the host or from age, and "levels below it [the water table] are cut unless `floodedLevel` is stated — 'a site in
wet ground has fewer levels'". Soluble rock adds a cave level; wet ground removes one (V14 §3.3, A2). "No field is drawn
but `age`'s band, and that only after every derivation fails." G3 sites a drop with no point by purpose weights ("a fort
wants overlook and road control, a mine ore and a stream, a hidden temple concealment and one hard approach", V14 §0).
It keeps the top five as "the other sites considered", which **Why here?** reads (V14 §3.4 (a)). A terrain pre-edit
shapes the ground first. A moat is cut and "V13's cascade fills it from the nearest body whose level reaches it, else
it stays a dry ditch" (V14 §3.4 (b)).

**The dungeon.** G4 builds the topology before any geometry, layer by layer in history: the geology's cave, then the
builders, then their use, then abandonment, then squatters, then expansion. Roles come from a grammar per purpose:
`temple.worship` is "entrance → court (porch) → hub (nave) → core (sanctum)" with a crypt stair, chapels, an
ambulatory and a secret reliquary (V14 §3.5). Loops, chokepoints, defensive depth, entrances (a hideout's bolt-hole is
always secret) and concealment are budgeted against a **measured vector** "that a test can check on the finished map
and the clerk can read back" (V14 §0). G5 embeds the graph on the kernel. Natural caves are noise outlines with passages
along the void's skeleton, built rooms are cut beside them, and later layers draw lighter (V14 §3.6; §5.2). G6 floods
the lower crypt by V13's test, and "submergence feeds discoverability" (V14 §3.7). G7 makes condition "a transform over
a persisted plan, never a reroll: the same wall always falls first … a site set back to pristine draws byte for byte as
it was built". A breach opens "a new `breach` edge … the classic dungeon's 'a wall has fallen through into the old
cave'" (V14 §0; §3.8). G8 attaches and adopts. "When a settlement later forms around it — a thorp in front of an old
fort — the site is the older layer the village grows around". A ruin it adopts is "robbed for stone and absorbed as the
ruin beneath the village" (V14 §0; §3.4 (d)).

**What the DM sees.** The site's own page: the dungeon-map figure-ground (voids in paper, a rock halo), each unit's
role as a small glyph ("a crown for `core`, a wave for `sump`", a key for `secret` only at an admitting key), the
history layers tinted one step apart, water classes with waterlines, damage, and level names in the band ladder ("Level
−2 — the lower crypt") (V14 §5.2). Secrets are DM-only, revealed or discovered, "withheld from any view, listing,
answer or export below the viewer's key" (V14 §0).

**The encounter crop.** At the table, the DM clicks anywhere and says a fight breaks out here. The crop is sized by
table, "so a small tavern takes 45 m and a great inn with its yard 70 m" (V14 §3.12 (3)). Buildings are completed with
their floor plans, the same rooms at every opening (V14 §3.11 (a)). Presence is shown as bands, never people: "the
common room is crowded, the kitchen has a few, the upstairs rooms are empty" (V14 §0). Lights come with no hour, "the
DM narrates the hour" (V14 §5.3). Water is drawn as difficult terrain, and the rooftops under a flood are drawn as dry
ground (V14 §5.3). On the world map, a click yields a 100 m crop frame from a transient charter: the ground, the road
or river, whose land it is, and recent battles adding "corpses, debris, wagons" (V14 §3.10 (4)). The grid origin is the
arena's, so "re-exporting the same crop keeps every token's cell, and two crops of one document side by side share their
cells edge to edge" (V14 §3.12 (5)). The export writes one `.dd2vtt` per scene with walls, portals, lights and objects
(the occluders written into both line-of-sight lists, because Foundry's importer reads only one), plus a Foundry scene
JSON with a native level per storey. Tokens are never exported (V14 §5.3). Same click, same week, same map, on every
machine (V14 §0).

### Act 10 — The world explains itself

Every stage and cascade step writes a reason record; a cell's reason is computed on demand (V13 §4.7). Four readers:
**why** ("flooded because the floor sits 212 cm below …"); **whatCaused**, down to the recorded inputs, naming a gap
honestly ("the chain is incomplete at the sewer outfall: derived before this version"); **whatChanged since week w**
("the ford is gone because the river was re-routed in year 412, this happened"); **whatIf**, a fork's dry run with
"the three largest changes named". A hidden input renders "as 'something you cannot see'". For session prep this is the
difference between a map and a setting bible: every desert, spring and flooded crypt answers "why?" in a sentence a DM
can read to players.

---

## 2 Substance verdicts

### 2.1 Where the physical design is genuinely strong

1. **Coherence across scale is a contract, not a hope.** The charter is a short, inspectable list of what the world
   owes a town at its edge (V13 §3.11.4 (1)–(11)). The town refines inside it and "never contradicts [it] at its
   edge" (T-V13-13). The same hydrology core runs at both scales ("one implementation", V13 §3.5, J-V13.9). The same
   water test runs from a continent's lake to a crypt bay (V13 §3.13). Two towns that never met agree at their shared
   edge. No tool a DM has used makes a town's river *be* the region's river with the region's discharge.
2. **Consequence is complete and honest.** Twenty-two named readers of a water change; eighteen drift paths each
   turned into a test; a rain shadow re-derived across the realm because "a rain shadow is never local" (V13 §3.14.2–
   §3.14.3). The DM's overrides are boundary conditions the physics derives *against*, never through. That is the
   owner's "the DM always wins", in a form that does not make the physics pointless.
3. **History is first-class.** The two verbs give the DM a choice no map tool offers: *this happened* leaves the old
   ford, the old shore and the old bed as traces the clerk can name. Dated surfaces give each epoch its own water
   (V13 §3.12.5). Sites change condition by transform over a persisted plan (V14 §3.8). Old towns have strata beneath
   them (ARCHITECTURE II.7.6). Land cover is a pure function of dated events (V13 §3.6 (5)). The past is kept, not
   repainted.
4. **The world grows around the campaign.** *Include my settlements* with planned sites from relationships, *Best
   placement* with three reasoned offers, and an organic correction that names its cause instead of painting a dot
   (V13 §3.1 (5); §3.11.1). This turns the host's dossiers from constraints a map violates into the brief the map is
   grown to. It is the most product-defining substance in the slice.
5. **It never fakes.** The verification report is "never faked" (V13 §3.1 (7)). Painting is labelled "not explained
   by physics" (V13 §3.11.1). The realm-rung monsoon and gyre are declined with the reason given (V13 §3.4 (5), (6b)).
   Clipping, stale charters and anomalies are reported, never silently resolved. A DM can trust what the map does not
   say.
6. **Geology with names.** At the continent rung the formation scenario gives landforms a DM can build adventures on
   — fjords with sills, rias, raised beaches, cirques and glacial lakes, a worn suture across a craton, a hotspot chain
   — each named and labelled (V13 §3.2.1 (7), (10); §3.10).

### 2.2 Where it is thin or merely conventional

1. **The default world is the conventional one.** Random all always takes the template path; "a scenario is never
   drawn by chance" (V13 §3.1 (1)). The templates are the reference generator's idea (V13 §3.1 (3)). A DM who never
   opens the scenario card gets a careful version of the familiar heightmap-template world, with excellent climate and
   water on top. The geology that distinguishes the product is behind one deliberate click.
2. **"Let time pass" is geological, not campaign time.** Weather spans start at 100 years and say, honestly, "over
   10 000 years the valley floors … lower by about 1 m" (V13 §3.2.1 (11)). At a campaign's span it changes almost
   nothing a DM can see. The visible campaign-time change — fields abandoned to scrub, a forest regrowing on a razed
   village — comes only from the host's dated events through the cover fold (V13 §3.6 (5)). A DM wanting "a century
   later" will reach for the wrong slider. The name invites it.
3. **The fantasy palette is mundane.** Eight resource kinds with a generic "ore" (V13 §3.6 (3)). The `Disturbance`
   kinds are a closed list — fire, flood, clearing, eruption, ashfall, lava flow, razing, plague (V13 §2.2) — with no
   blight, no curse-scar, no wild-magic zone. Biomes are Köppen classes. Every row is calibratable data, but the
   disturbance kinds are a typed union, not a table row. The physical world is Earth's, and fantasy has to be painted
   on as an override with no recovery law of its own.
4. **The world is calm and empty.** Climate is monthly means; storms exist only as a storm surge (V13 §3.12.7), and
   floods are "a dossier calamity, V06's `terrainWater` op or a `setSurface`" (V13 §3.12.4) — the right ownership,
   but no drought year or hard winter of the world's own. Danger is a "later lens" (D-V13.8): the world says where
   the forest is, not what lives in it. The physical layer stops one step short of the encounter table.
5. **The buried past is rare by default.** Under the host's default ages "F3's strata appear … chiefly beneath
   metropolises", and a draw still decides whether (ARCHITECTURE II.7.6). The owner's rule reads "settlement age …
   determines if and how large an underlying ruins would be". The design makes age set a probability, and the DM's
   only lever is the founding age or a table cell. A DM who wants the old city under the new one cannot simply ask for
   it.

### 2.3 Bureaucratic or confusing, versus delightful

**Where the DM's experience would be bureaucratic or confusing.**
- **The cross-scale seam is a stale flag.** Act 6. A world sea rise floods the world and leaves the town dry, with a
  `worldWins` offer that re-derives the whole town from S1. The owner's "the settlement never changes" (V13 §0) is
  being honoured, but at the moment of a flood a DM expects the opposite: *my* town floods, and *my* edits stay. A
  scoped, water-only *carry the new level into the town* — a *happened* surface written into the frame by the DM's
  confirmation — is missing between "nothing" and "re-derive everything".
- **The vocabulary on the placement card.** Act 8. Precedence stamp, six-term coherence cost, blend band, stale
  charter, `worldWins`, `keepMismatch`, five anomaly kinds. V09 gives the world dialog and the conflict list
  plain-language rows (V09 §4.22 (6)). It does not give the placement card, the anomaly list or the stale-charter
  notice any.
- **Two documents, two undo stacks** (V13 §4.4): correct, and still a surprise to a DM who thinks in one campaign.
- **Warnings and refusals by the dozen.** §4.1 lists over twenty refusal keys and over twenty warnings with their
  actions. On a host-bound world: `refuse.world.advancing` while the host advances, `W_HOST_CANON_BEHIND`, and
  `W_TRAVEL_BAND_CROSSED` on "every dry run, route-class edit and fork preview" (V13 §4.1). Each is justified. Together,
  on a busy evening, they read as a customs office.
- **Draining a lake has three meanings and no verb** (Act 5); **conflict-list frequency** from whole-march re-runs
  (Act 7); and **the draft re-roll in *Update the dossier*** (Act 7), the one confusion that can cost a DM work.

**Where it would be delightful** (the five best of §3, plus): no wizard, a generated world with its rolled values
greyed (V09 §4.22 (1)); thumbnails that are the real run, with "3 of 3 inclusions met" (V09 §4.22 (4)); the ford
trace and its sentence, and `whatCaused` naming its own gaps (V13 §3.14.1; §4.7).

### 2.4 The dungeon and encounter side, against dedicated dungeon tools

What DMs expect from dedicated tools (broadly, from general knowledge): instant generators give **stocked, numbered
rooms** in one click; hand-drawing tools give **art**; 3D furnishing tools give **dressing at speed**; a VTT wants
**walls, doors and lights that import cleanly**.

**Where this design is ahead.**
- **Purpose and history.** No common generator builds a temple as porch → nave → sanctum with a crypt below, grown
  over an older cave and squatted later, every room carrying its role and its reason (V14 §3.5–§3.6). BSP,
  room-and-corridor and wave-function collapse are rejected because they leave "a unit [with] no role and no reason but
  'the cut fell here'" (V14 §3.5). For a DM this means the dungeon *makes sense*: the sanctum is deepest, the
  chokepoints guard it, the bolt-hole leads out.
- **Consequence in the world.** The dungeon floods by the same water table as the town's cellars, loses levels in
  wet ground, gains a cave in limestone, is sited by purpose with "Why here?", has a road drawn to it if it is a fort
  or a mine, and is adopted and robbed for stone by a village that grows beside it (V14 §3.3–§3.4, §3.7). No dedicated
  tool connects a dungeon to a world like this.
- **Persistence and condition.** A card with a lifecycle, a ruin that is a deterministic transform, "remove" (it was
  never there) versus "destroy" (an event with a record) (V14 §0; §3.8).
- **Export hygiene.** A stable grid origin, byte-identical re-exports, multi-level scenes with a Foundry level per
  storey, occluders in both line-of-sight lists, portals and lights (V14 §3.12 (5); §5.3). That is better than most
  tools' exports.
- **The encounter crop anywhere.** Click a tavern, a sewer junction or a road on the world map and get a sized,
  completed, lit, gridded battle map with the floors upstairs. In-play, this is the strongest DM moment in the
  program.

**Where it falls short of what DMs expect.**
- **No stocking.** No monsters, no traps (hazards are only `collapse`, `pit`, `swimming`, `diving`, `unstable`, V14
  §2.2), no treasure, no numbered room key. Occupancy is "never individuals … the DM decides who is there" (V14 §3.11
  (b)). That is consistent with the host owning people and the map owning shape. But the first thing an instant
  generator gives a DM is the thing this one withholds, and V14 names no owner for it ("Tokens, initiative and combat
  rules are the virtual tabletop's", V14 §1.4). A DM opening a beautiful, reasoned, empty crypt will still reach for
  another tool to fill it.
- **No room numbers or key sheet.** Units have roles, names for the core and entrances, and reason ids (optionally in
  the export's vendor block, V14 §5.3). A printed dungeon wants "1. Porch, 2. Nave …" and a page of notes. Nothing in
  §5.2's labels produces one.
- **A small grammar shelf.** About a dozen shipped grammars, with the other kinds mapped onto them (V14 §3.5). They
  are good, but variety across many sessions will show the seams: every fort a concentric ring behind a gatehouse.
  They are data and extendable, but none of them is a lair of something non-human.
- **Look.** The style is the town's sheet, deliberately ("no separate tactical sheet", V14 §5.3). It is coherent and
  legible, not the painted look that hand-drawing tools have taught players to expect. The 2.5D view (V14 §0) helps
  the DM's understanding more than the players' delight.
- **No hand-authoring idiom.** Editing is the kernel's: move a wall, add a floor, flood a level, all recorded (V14
  §0). That is powerful, but it is not "draw me a room here" the way dedicated tools are.

**Verdict on this side.** As a *place-maker* the site design is the best-reasoned in its class. As a *session-prep
tool* it hands the DM half a dungeon — the half dedicated generators do worst — and leaves the half they do first.

---

## 3 The five best and five worst moments

### The five best

1. **"Why this desert?" answered by the land itself.** The DM clicks *Best placement* for an arid-dossier town on a
   green world. No lawful site exists, so the map raises a range upwind and offers a graded enclave with steppe and
   scrub at its edges, previewed on a copy. The report reads "arid at 180 mm/yr in the Greyspine's shadow" (V13
   §3.11.1; §3.1 (7)).
2. **"What if the sea rose 2 m?" inside the town.** On a fork the flood stops at the sea wall, overtops the low quay
   (recorded), draws waterlines on the walls, tints the cellars by class and ghosts the drowned quarter. Committed as
   *this happened*, the old shore stays as a trace the clerk can date (V13 §3.12.4; §3.13; §5.1; §3.14.1).
3. **A dungeon whose past you can read.** Cave, then temple, then abandonment, then squatters, tinted by layer. A
   wall "has fallen through into the old cave". The lower crypt is flooded below the table and, with every entrance
   needing a dive, undiscoverable until someone finds the dry secret door (V14 §3.6 (a); §3.8 (3); §3.7).
4. **The DM always wins, and the land still lives.** A painted forest, *always so*, survives a reroll and a physics
   pass, and the neighbours are derived around it. A stamped fire, *this happened*, runs burn scar → scrub → regrowth
   on a year slider and never pops up a dossier question (V13 §3.14.1; §3.6 (5); §4.2 T2).
5. **Click anywhere, fight here, export.** A tavern on a street: the crop sizes itself, completes the floor plans
   upstairs, says "the common room is crowded", lights the lamps without an hour, snaps to a grid that never moves,
   and writes one scene per floor plus a Foundry scene with a level per storey. Same click, same map, every machine
   (V14 §3.10–§3.12; §5.3).

### The five worst

1. **The world floods, the town doesn't.** Raising the world's sea marks the town's charter stale and offers
   `worldWins`, a whole-town re-derivation. Otherwise the DM opens the town and raises its sea again, in another
   document with another undo stack (V13 §3.14.2 step 6; §3.11.5 (3); §4.4).
2. **"Update the dossier" on a draft redraws its people.** A valley repainted, one approval, and "its people, trades
   and history drawn again" (V13 §3.11.5 (1); H32). The host's own law promises a world-fact edit "NEVER re-rolls"
   (DESIGN_EDIT_MODE_AND_DECREES §14).
3. **A small ridge, three pop-ups.** The whole monthly march re-runs on any relief edit (V13 §3.14.2). Three towns
   400 km downwind shift a climate class, and the conflict list asks about each — physically right, felt as
   bureaucracy unless the downwind precipitation diff sits beside the question.
4. **The placement card speaks implementation.** A precedence stamp, six cost terms, `windSide`, `riverUphill`,
   `lockedBelowTable`, a stale charter, a button called `worldWins` — with no DM-facing copy defined for the card in
   V09 (V13 §5.2; §3.11.5 (4); V09 §4.22).
5. **A perfect, empty crypt.** Roles, history, water and reasons, and not a monster, trap, treasure or room number in
   it. The DM opens another generator to stock what this one built (V14 §1.4; §3.11 (b); §2.2).

---

## 4 Open questions of substance

1. **Cross-scale water.** Should a world surface change offer each affected town a *scoped* carry — the new level
   written into the frame as a *this happened* surface by the DM's one confirmation — between today's "stale" and
   `worldWins`' whole re-derivation? The owner's "the settlement never changes" would still hold, since the DM
   authorises it and nothing generated moves.
2. **What *Update the dossier* does on a draft.** Re-roll under the same seed (V13's H32) or re-derive with the chosen
   facts pinned (the host's §14, with its §22 rulings)? The DM's experience differs completely, and the two designs
   should not promise opposite things.
3. **Should the default world be formed?** Should *Random all* ever draw a scenario — at least at the continent rung,
   where the bake fits the size row's budget — so the product's distinctive geology is what most DMs see first?
4. **How loud should climate consequence be?** The ladder asks whenever a dossier fact would change (V13 §3.11.5 (1)).
   Should far-field class shifts from a whole-march re-run be grouped into one row with the downwind diff and a single
   "fit the world for all" choice, so physics' honesty does not become pop-up fatigue?
5. **Refuse, or reconcile with visible strain?** The host's forced-fact law says forced facts are truth and the land
   must be *solved* for them — "STRAIN RENDERS AS WORK … A strained combination doesn't look wrong; it looks HARD-WON"
   — and never misplaces "the port on the peak" (DESIGN_FP_ARCH_MF §5.-1c). The map refuses a contradicting placement
   with `refuse.charter.dossier`, and its organic-correction causes are climate causes (`rangeUpwind`,
   `basinNoOutlet`, `coldCurrentCoast`, `narrowedSea`; V13 §2.3's `SolverRule`). What does *Best placement* do for a
   mountain-and-sea-and-port town on a world with no mountainous coast? Should the correction catalogue include relief
   causes — a fjord, a cliff harbour, a raised coast — the way the host's law names its "landform families"?
6. **Who stocks the dungeon?** Is the room key, its monsters, traps and treasure the host's (it owns people), a later
   volume's, or deliberately the VTT's? Should a site card at least export a numbered key of units with roles and
   reasons, so a DM can print it?
7. **Can a DM ask for the buried past?** Should *At generation from age*'s strata be a requestable feature ("an old
   town under this one") as well as a probability by age, given the owner's "determines if and how large"?
8. **A fantasy physical layer.** Should disturbance kinds, resource kinds and biomes be open table rows with their own
   recovery laws (a blight that recovers like a burn but slower; a mage-scar that never does), rather than a closed
   union with fantasy left to always-so paint?
9. **Two clocks, one word.** Should the physics toolbar's *Weather (years)* be named for what it is (geological
   time) and sit beside a *campaign time* control that scrubs the cover plates and recovery, so the DM finds the
   century they mean?
10. **One campaign, two logs.** Is there a DM-facing notion — a campaign history across the world and its towns —
    that makes the separate undo stacks and sealed host-consumed edits feel like one table, not two documents?
