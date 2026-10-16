# Proposal — sites and encounters (the site column of the decision matrix)

Status: a design proposal written by the session on 2026-10-16 from the owner's rules of that day
(`docs/AMENDMENTS-2026-10-16j.md` items 132–134, 136) and the existing design (V03 interiors, V04 underground, V06
evolution, V07 village, §7 editing, §9.2 and §11.2 knowledge, §11.1 exports). Research-side; the design volume
restates what it adopts. CONFIRMED where it cites the base or a volume; PLAUSIBLE where it is the session's design.

## 1 One operation, two retention policies

**Materialize detail at an address at a scale.** A transient encounter is that operation with the discard policy; a
persistent site is that operation inside the site's own frame with the persist policy; a transient encounter at a
persistent site is the first on top of the second. Promotion turns a transient into a persistent card: a named place,
or a site card with a request record derived from what was there (the second is preferred: it stays editable as a
site). Both kinds filter at the viewer's knowledge key.

## 2 Transient encounters

- **Keyed by world address and time; derived deterministically** from seed and world facts; never retained unless
  promoted; the same click returns the same map.
- **Resolve, complete, crop, overlay.** Resolve the point to the arenas and levels present (ground L0–L4, underground
  parts, sky, storeys); complete lazily what is not materialized (interiors by V03, deterministic from the seed; the
  moment's occupancy by an abstraction, never individuals); choose the extent by a rule table keyed by the location's
  profile (a corner, a bend, a creek, a tavern plus its street, a sewer junction and its chambers); lay a transient
  layer (combatants, carts, fires, barricades, fog) on a transient arena (§3.4's stub, M6-P) that never enters the
  world's hash, as the crisis looks already do not.
- **No hour.** Light fixtures export as fixtures; the DM narrates the time.
- **In the world regime** the crop at a point with no named place derives from terrain, biome, route, territory and
  recent events there; generic means only that nothing named exists there yet. This half waits on the world regime.
- **Consequences flow one way**: the DM commits an outcome, a world event changes a fact, the map rematerializes
  locally; the encounter map never writes into the world.

## 3 The persistent site card

Kind and purpose; placement (free-standing: own frame and arenas placed in the world; attached: an anchor in a
settlement document); extent; parts above and below ground; owner or faction; condition; lifecycle state with cause;
age; knowledge layers (exists, DM knows, players know, players reached, discoverable); history; effects on the world.
Host-owned facts: existence, ownership, status, simulation effects. Map-owned facts: the programme and the shape. A
site's derived capacity reaches the host through the port as a derived fact.

**Two attachment modes.** Attached (a crypt under a house, a hideout off a sewer): a separate document with an anchor
record (address: layer, part, storey or tunnel; site reference; knowledge flag) in the host document, and one access
record on the anchor (V04's stair, shaft, door, trapdoor, with its own knowledge flag and condition); the city's
plots never move. Free-standing (a fort, a tower, a mine): a document of its own with a placement; when a settlement
forms around it the site's arenas are adopted as parts of the settlement document keeping identities and locks. The
surface exception: a site with a footprint in town is a building on a plot through the assignment path, the site
programme riding as the building's programme.

**The admissibility table.** Context → allowed kinds and attachment modes: urban surface (tower, temple, guildhall,
manor → assignment path); urban below or inside (crypt, hideout, cellar complex, sewer lair → attached); hinterland
(by distance from the enclosure: attached in the settlement's frame or free-standing); country (fort, tower, mine,
cave, shrine, ruin → free-standing; a cave attached to a terrain feature). Editable like every rule table.

## 4 The request record and the programme

The user states what they care about: kind, size preset, floors above, levels below, footprint shape, terrain
shaping, owner, purpose, condition, age, hidden entrance, a flooded level. Everything unstated is derived from
context by derive before invent, never rolled blind. The request resolves into a programme whose complexity is a
vector with units, measurable on the finished geometry: units, storeys below, vertical links, entrances, loops (the
cyclomatic number of the unit graph), branching factor, chokepoints, open-space share, concealed share, defensive
depth (rings between entrance and core), hazards, flooded share, historical layers, damage. A preset is a named
vector. A test asserts the generator delivered the vector; the clerk reads it.

## 5 Materialization: composition, topology first

A site is three physical kinds laid down in time — built (architecture rules; the plan programme generalized),
carved (excavation rules: shafts, levels, drifts following what was dug for), natural (geology: outlines from the
coast's noise routine, passages along water's old paths) — and the classic dungeon is their superposition in
chronological order: geology, first construction, use, abandonment or damage, reuse, each layer by its kind's
materializer. Topology first: a unit graph with roles (entrance, hub, chokepoint, loop, dead end, secret, vertical
link) chosen by purpose (a fort concentric with gatehouse chokepoints; a temple axial to a sanctum with the crypt
below; a mine a tree on a vertical spine; a cave a loopy organic graph; a hideout one hard approach and a bolt-hole),
then embedded on the kernel under constraints (envelope, rock, entrance on the accessible side, water table,
adjacency): units are faces with owners, passages corridor bands, walls role edges, centrelines from the skeleton and
medial axis, vertical links storey records with the existing stair kinds, placement by the existing relational
solver. Technique placement: grammars as data for programme expansion; skeletons and medial axes for passages; agent
excavation for mines over the geology input; noise outlines for caves with cellular automata as an optional raster
pre-pass; Voronoi for crypt bays and cavern partitions; binary space partition and room-and-corridor rejected as
structure (the plan programme gives every room a role and a reason); wave-function collapse rejected for structure
because it cannot carry a reason chain; tactical analysis (cover, sightlines, chokepoints, loops) as a check on the
result against the vector, never as a generator. Every unit carries its reason: layer, programme role, event.

Siting is causal and purpose-specific on the same suitability and route logic the settlement uses, with purpose
weights by table (a fort wants overlook and road control; a mine the ore and a stream; a hidden temple concealment
and one hard approach; a tower solitude). A site is a destination in the settlement siting score.

## 6 Lifecycle, condition, history

States (candidate, generated, persistent, occupied, active, abandoned, damaged, destroyed, cleared, restored,
repurposed, expanded, collapsed, submerged) as a set with explicit causes, not a sequence. Condition is a transform
over a persisted plan (item 123's damage layer; V06's decay and robbed-for-stone): collapses close units or open new
connections, roofs fall, stone is robbed; occupants add a later layer (barricades, camps) under the occupancy
abstraction. Authored edits survive every state because the plan beneath is untouched. Water state is classified
after generation per unit (`proposal-hydrology-water-state.md` §4) and never changes identity. A site pre-existing a
settlement is the older layer the settlement grows around; a destroyed site leaves a ruin and a record; a removed
site is a retcon. Promotion from an event: a battlefield becomes a site with graves and later ruins; a camp becomes
permanent.

## 7 Editing, iconography, knowledge

Everything on a site is PLAT geometry, so locks, undo, local repair and persistent addresses apply unchanged. "Move
this wall" is kernel geometry; "add a floor", "flood the lower crypt", "collapse this passage", "expand this
fortress" are programme or lifecycle edits rematerialized locally with locks preserved, each a recorded event.
Dropping an icon creates a card materialized lazily on first open (candidate → generated). Moving the icon changes
the anchor and re-digs the access; the interior stays locked. Deleting takes two verbs: remove (retcon) or destroy
(event). The icon draws only in the view whose context contains the anchor's address; secret state is one of DM only,
revealed, discovered, rendered with a second cue beside colour; the existing admission function withholds the icon,
the access and the site below the viewer's key.

## 8 Scale and export

An encounter crop is 30 to 100 m on a side at 1 cm with 152 cm tactical squares as a display overlay; the canonical
geometry never snaps to the grid. The VTT path is §11.1's profile with a crop scope and a stable grid origin per
address; a site exports one scene per floor and basement through the per-storey path; the transient layer exports as
walls, portals and objects, tokens being the VTT's. Submerged units draw as water or are withheld by depth and key;
swimming and diving routes export as difficult terrain.

## 9 Decision-matrix rows contributed

| Question | Existing architecture | World proposal | This proposal | Reconciled decision | Reason |
|---|---|---|---|---|---|
| What an encounter map is | a battle-map export of the town | a crop of world facts at a point | one operation, two retention policies, promotion | as proposed | the map comes from the world; transient is derived, not random |
| What a site is | V04's voids, catacombs, ruins beneath a town | a world fact with placement | a card composed by existing materializers under a policy | as proposed | no dungeon generator; sites are world facts with maps |
| Attachment | the underground layer of a settlement | free-standing documents placed in the world | both modes plus the surface exception through assignment | as proposed | the city map stays one truth |
| Dungeon structure | the plan programme for buildings | — | topology first, embedded on the kernel; history as superposition | as proposed | explainable, measurable, reuses the kernel |
| Complexity | — | — | a vector with units, measured on the result | as proposed | the brief forbids sliders |
| Sites and the simulator | institutions in settlements | the host owns political facts | institution-like host records with a location outside a settlement | as proposed | the one-way flow holds |
| Sites seeding settlements | a castle reserve claims ground first | a site is a destination | adoption of the site's parts into the settlement document | as proposed | history explains geography; the gate rows protect it |
| Secrets | `knownTo` and admission | — | DM only / revealed / discovered on the anchor and access | as proposed | the existing hook, one more layer |
