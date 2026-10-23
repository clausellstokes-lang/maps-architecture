# Design volume 15 — The atlas: world maps as saves, arrangement, continuation, microcosms and the relational historical style

> **Revision 0 — 2026-10-23 (lane volumes/architect-V15, the design seat B of the world-growth pass; written on Fable 5.1
> under the J392 model ruling and the owner's delegation).** This volume builds, to implementation depth, the owner's
> rules **F10–F15** (docs/PROGRESS.md J392, verbatim there) as the spine `docs/design/spine-world-growth-2026-10-23.md`
> decided them: its §2 (the scale ladder and its one rule), §10 (the atlas: the document, isolation, arrangement,
> continuation at generation, microcosms, seams between sizes, drill-down), §11 (the relational historical style), §12
> (the vocabulary) and §14 (the five seams V13 owes this volume and the one it owes nothing to). Nothing the spine
> decided is re-decided here; every one of its rulings is designed to depth and cited by its section. The lens rulings
> of J384 (the four fact classes, the audience filter, no player view of alignment, the plates and their horizon) bind
> every fact the relational style reads. The two research notes of the pass — `research/world/formation-ecology-science.md`
> §9 (historical cartography and the warping algorithms) and §10 (tiled growth, multi-resolution seams, insets) and
> `research/world/formation-ecology-state.md` (what V13, the base, V09 and the host hold today; Part E's gaps 10–15) —
> are read evidence, cited by section, never restated and never a source of a mechanism. Findings of the state note
> that bind this volume: there are three size rungs (`province`, `realm`, `continent`) and no "region" rung — the
> owner's "region map" is the province rung; `Recipe.product` has no atlas kind (requested here, V15 §10.1); each
> settlement frame belongs to one world and the design stores one world document per campaign — membership of a world
> in an atlas, by reference, changes neither; the world view today draws under one affine transform with no relational
> distortion, no embellishment layer and no true-scale toggle — V15 §3.6's view is new; the host keeps one map per
> campaign and names no atlas, so the atlas is map-side only and its sharing follows the host's gallery model only as
> a host-change request (V15 §10.2's H-row), never an assumption. Ids: decisions `J-V15.n` (V15 §9), tests `T-V15-n`
> (V15 §7), base change requests `BCR-V15-n` (V15 §10.1), budget rows `ATLAS-n` (V15 §6), requests to the sibling
> volumes `RQ-V15-n` (V15 §10.2–§10.3). The state note's next free ids (item 926, J-V13.107, T-V13-57, D-V13.9,
> BCR-V13-41, H31, `WORLD-16`, SP-W9) were consumed the same day by amendments r (`docs/AMENDMENTS-2026-10-23r.md`,
> seat A: items 926–1005, J-V13.107–130, T-V13-57–72, BCR-V13-41–46, H31–H34, `WORLD-16`–`WORLD-19`, SP-W9–SP-W10,
> D-V13.9–10), so the next free ids after it were item 1006, J-V13.131, T-V13-73, BCR-V13-47, H35, `WORLD-20`, SP-W11 and
> D-V13.11 — this volume mints none of them and names H35 only as the row it asks the seam seat to add to V13 §8.5;
> where amendments r defines a seam this volume consumes (`solve`, `WorldEdgeCharter` and `edgeCharter`, `renderAt`
> and `RenderedWorld`, the rung-general `placeFrame` and the `fit` edit, `Requirement`, `WorldRequest.edgeCharters`),
> this volume reads r's text (its items 942, 943, 954, 975 and its §2.2 records) and aligns to it, naming its own
> additions as such (V15 §10.2, §13). **Reconciled 2026-10-23** by the world-growth seam seat
> (`docs/volumes/critique/seam-world-growth-r0.md`): file r's items 1006–1017 define every reading this volume takes of V13
> (the label boxes and the `atlas` layer set of `renderAt`, the world subject of `requestCharter` with `WorldCharter`,
> `solve.registerEvaluator`, `viewFacts`, the `landform` requirement kind, re-matching on request, `WORLD-20`, H35,
> J-V13.131 – J-V13.134), its items 1018–1028 carry this volume's INDEX, SUMMARY and README rows, and this volume was
> edited in place to match (its §13 rows closed; M-ATLAS-A after M-W6). **Revised 2026-10-23** by the reviser seat
> volumes/revise-world-growth under the manager's rulings J393 (the edge charter's test: a present physical fact, never a
> record; F10–F15 quoted whole in §1.3 and F16 the manager's rule; no stacking on the host's storm multiplier) and J394
> (the atlas picture is the member's default picture) on the two reviews — `docs/volumes/critique/V15.md` (the
> map-architecture lens) and `docs/volumes/critique/world-growth-r-science-host.md` (the science-and-host lens); every
> finding against this volume is recorded in §14 with what changed. **Closed 2026-10-23** by the closing seat
> amendments/world-growth-s (`docs/AMENDMENTS-2026-10-23s.md`, its §"V15 in-place edits"; record
> `docs/validation/coherence/world-growth-s.md`): the critic's gaps against this volume
> (`docs/validation/coherence/world-growth-r-critic.md` G-01, G-02, G-06, G-13, G-14, G-17, G-18) — the level–stop table
> over the pyramid cell (256 / 512 / 1 024 m), the four-argument `edgeCharter`, the applied-r line, the six terms' world
> readings cited from V13 §1b.2, the cover overlay's milestone, three loose *override*s, and the route facts row.

<!-- PROGRESS (the architect seat's ledger; removed at revision)
0 In plain words ................................ done
1 Scope, hooks, owner rules, out of scope ....... done
1b Wiring table ................................. done
2 Data model .................................... done
3 Generation (A1–A7) ............................ done
4 Editing ....................................... done
5 Rendering, labels, exports .................... done
6 Performance budgets ........................... done
7 Tests and acceptance bars ..................... done
8 Build plan .................................... done
9 Decisions ..................................... done
10 Base change requests and requests ............ done
11 Owner questions .............................. done
12 CONFIRMED versus PLAUSIBLE ................... done
13 Fix list ..................................... done
-->

**How to read this volume.** It builds the fourth layer of the owner's ladder — the **atlas**, the owner's "world map"
of F11–F15: an individual save made of finished world maps stitched together by their pictures, arranged by the user,
continued into its voids at the next map's generation, each member a microcosm on its own clock — and the **relational
historical style** of F10, a view over an atlas (or one world) that swells what its mapmaker cared about and shrinks what
it did not, keeps every true measurement one hover away, and fills the edges of knowledge with the creatures its
fictional cultures feared. The implementer holds the base (`docs/ARCHITECTURE.md` with files f–q applied), volume 13
(`V13-world.md`, the world regime, placement, the port and the lenses, as amendments r extended it, applied 2026-10-23), volume 9
(`V09-application.md`, the application that hosts the atlas page), volume 14 where a drill-down reaches a site, and this
volume, and nothing else. Every fact the base, volume 13, volume 9 or another volume states is cited, never restated;
every new fact is stated once, here. The spine is this volume's source of every shape, name, precedence, lifetime and
seam and is cited as `spine §n`; it is a design document, never an implementer's reference, and every mechanism this
volume adopts from it is stated here in full. **Citations:** a bare `§n` or `II.n` is the base's; `Vnn §n` is a design
volume's section, this one included (`V15 §3.6`); `spine §n` the spine's; `item n` is an amendment item; `J384`–`J392`
are docs/PROGRESS.md rows; `F10`–`F15` the owner's rules by number. **Naming (spine §12, one word, one meaning):**
**world** is V13's simulated document and its page, never the stitched layer; **atlas** is the stitched, image-only
save of this volume (the product label — "World map" is allowed — is the owner's, V15 §11 Q1); a **member** is a world
document the atlas holds by reference; a **seam** is a shared edge between two members (the base's and the critique
lane's "seam" between volumes is a document-review word confined to `docs/volumes/critique` — admitted in this volume and in V13 only
inside the fixed phrases that cite the spine's §14, "the seams owed to V15", "no reverse seam" and "the dossier seam";
the seam seat's ruling, seam-world-growth-r0 SW-08); **continuation** is a
world generated with its atlas neighbours' edge charters as locked requirements, at its generation and never after;
**fit** is V13's placement machinery used across rungs; a **viewpoint** is an audience plus a culture; **plate** is the
lens cache's snapshot per host advance (V13 §5.8), never a tectonic plate. The owner's "region map" is the **province**
rung (`WorldSizeRung`, V13 §2.2): no fourth rung and no "region" word is introduced. In records this volume's prefix is
`Atlas`; the bare word `atlas` names only the `Recipe.product` value `'atlas'`, the `atlas` concern, the `atlas.*`
tables and the stage ids `A1`–`A7`.

## 0 In plain words

**A map of maps.** A game master who has made a realm map and, beside it, a province map of the borderlands, and
somewhere else a continent they drew for another campaign, can now lay them on one table. That table is the **atlas**:
a save of its own, with its own name, that holds nothing of those maps but a picture of each and the knowledge of where
each one lies. Drag a map to where it belongs, turn it, snap its edge to its neighbour's, lock it; or say it in words —
"Varn lies east of Ashmark across a narrow sea", "Thornwood sits inside Ashmark", "Kesh lies far to the south beyond
unknown lands" — and the atlas arranges them for you, warning (never refusing) when two maps overlap, when a cold north
sits beside a hot south, when a desert shore meets a rainforest shore. Between maps that do not touch there is sea, or
mist, or mountains, or honest blank parchment marked *terra incognita*, as you choose. Along an edge two maps share,
the pictures are softened into one another so no step shows; where a finer map lies inside a coarser one, the finer wins
on its own ground and, zoomed in, either eases into the coarser over a band or sits inside a thin frame like an inset in
a printed atlas. The same place is never drawn twice at two sizes: every map is metric and every one measures its heights
from the same sea, so laying them side by side at true scale needs no fitting at all.

**Each map is its own world.** Nothing crosses a seam after a map is made. A river you move in Ashmark does not move in
Varn; a plague in Varn does not reach Ashmark; each map runs on its own calendar and is shown at its own present with
its own date in a small cartouche — "Year 412, early spring" beside "Year 1 071, deep winter" — and only if you ask does
the atlas try to show them all at one week, drawing honestly "at its own present" on any map whose present lies earlier.
If the two maps drift apart at their shared edge, the atlas softens the picture and, for the game master only, can show
a small marker saying how far; it never pulls either map back. Delete a map and every atlas that held it keeps a
marked gap where it was, never a silent hole.

**Continuation.** The one time a map reads its neighbours is at its own birth. Click the void beside or between maps and
say "make a map here": the atlas asks each neighbour for a **world edge charter** — the present facts of the ground along the shared
edge: the land's height and the ranges that run off the edge, the coast and the sea, the rivers crossing with their
flow, the ground water, the monthly temperature, which way the wind blows and how much rain it still carries, the
currents, the rock, the soil, the natural vegetation, the latitude the neighbour sits at, the sea level — the ground as
it stands that day, however it came to be — and never anything that merely happened (no fire, no clearing, no plague)
nor any edit made after the new map was born: an edit made in the neighbour before that is the ground. Those charters go
to the world generator as locked requirements, the new map's basic choices come pre-filled from its neighbours' basics
(climate band, wetness, ruggedness), and the map that is born meets its neighbours at their edges. When two neighbours
contradict each other at a corner the atlas says so and proposes a reconciling feature — a sea, a strait, a mountain
belt — for you to take or change. The neighbours themselves do not change; a request that would need one to change
shows that change in the usual conflict list, and nothing moves without your approval. The new map keeps the charters
it was born from, with each neighbour's version, as a settlement keeps its charter; the atlas carries only their names.

**Deeper and deeper.** Zoomed out, the atlas is pictures. Click a map, or zoom past where its picture has no more to
give, and the live world opens as its own page, where you click a town to open the town, a house to open its floors, a
site to open the site — the owner's "click deeper", run from the top. A player's atlas shows only what their party
knows, drawn, if the relational style is on, the way their culture would draw it; the game master's arrangement is the
true layout underneath.

**Somebody's map.** The **relational style** is how a medieval mapmaker would have drawn this world: the holy city or the
capital at the centre and huge; the lands that matter swollen, the lands that do not squeezed into the rim; east at the
top if the faith says so; the roads drawn as strips with the days between towns written on them; and, where knowledge
ends, serpents in the deep and little-sailed seas, dragons where the known world stops, monstrous peoples and devils in
the lands the mapmaker's culture fears or hates or holds to be of an enemy faith, a skull where the Wasting struck,
banners where a war was fought, the cathedral of the holy city drawn as large as a province. A slider morphs between the
true map and the relational one, and wherever you hover the true distance and the true travel time show, because the true
map never goes away: every measurement, every export, every scale bar reads it. All of this is derived from facts the
world already holds — who is holy, who is a capital, who trades, who hates whom, who knows what — and from the
**fictional** cultures' beliefs only, never from any real-world people; the game master may add, move or remove any
figure, and may make a map as another culture saw it, or as the party knows it today, or as it was found, centuries old,
in a dungeon. Three presets come shipped — the sacred *mappa mundi*, the practical *portolan* with its compass roses and
rhumb lines, the *itinerary strip* with roads straightened and distances in days — and the art they need (monsters,
vignettes, cartouches, lettering) is content, on the owner's budget.

**What the atlas never does.** It runs no physics and no simulation; it holds no copy of any map and no host data; it
writes nothing into a map after that map is born; it never exports a stitched world in the shape the ecosystem's tools
read, because a stitched world is not a world; and it shares a picture of a map only where that map may be shared.

## 1 Scope, the base hooks consumed, the owner's rules obeyed, and what is out of scope

### 1.1 What this volume builds

Seven operations, one page and one view, in one package `@plat/atlas` registered in `@plat/layout`'s registry as
`@plat/sites` is (V14 §1.1's pattern; J-V15.1), with the atlas page in `@plat/app` (V09 hosts it) and the tile
composition, the seam softening and the warp in `@plat/render/atlas` (the base's §8 render tier; §14):

| engine | the base's slot | what it makes | V15 § |
|---|---|---|---|
| **A-ARRANGE** A1 | a product-like stage set (`ProductDecl.stages`, §4.12) on an **atlas document** of its own, never inside a world's stage graph | `AtlasRecipe` (the members by reference, their `Arrangement`, the `Relation`s, the `GapStyle`s, the `Viewpoint`s, the style and conflict settings); the described relations as requirements solved through V13's `solve` interface at atlas scale; the layout presets; the warnings | 3.1 |
| **A-RENDER** A2 + A3 | the base's tile pipeline (§8.1, §8.8) with the world's `renderAt` reading (V13's; RQ-V15-2) | the imagery cache per member at the member's own present week (the tile pyramid at one pixel resolution per level, symbols by one shared zoom rule), the seams (softening along shared stretches only, unknown space, eased detail steps or insets with a frame, precedence), one label pass over every member's placed labels | 3.2, 3.3 |
| **A-CONTINUE** A4 | an edit's fold that **drafts a request** for V13's generator; V13's `edgeCharter` reading (RQ-V15-1) | `ContinuationRequest`: the void, one `WorldEdgeCharter` per shared edge (the neighbour's present ground, never a record; locked), the pre-filled basics, the contradictions with a proposed reconciling feature, the neighbour-change conflicts; the new member's provenance | 3.4 |
| **A-FIT** A5 | V13's placement machinery in its rung-general form (RQ-V15-3) with the fork preview and the conflict list | a child member inside a parent: derived from the parent (preferred), separate image-only with a mismatch warning, or separate-then-fitted (the parent bends, the child never changes) — a `FitRecord` on the atlas, the edit on the parent's own log | 3.5 |
| **A-VIEW** A6 | a view (V13 §5.8's fact class 4: an owner-ruled projection, labelled, never host truth) in the render tier | the relational view: the adjacency-preserving warp (a flow-based area cartogram composed with a centre magnification and an orientation), the slider, the true readout on hover, the distortion from facts (centre, size, orientation, detail by knowledge), the derived embellishments and the DM's own, the viewpoints, the style presets, determinism | 3.6 |
| **A-DRILL** A7 | V09's document pages (V13 §5.2's pattern: a member opens as another page) | the thresholds, the handoff to the live member at the true point, then settlement, interior, site | 3.7 |
| **the atlas page** | V09's shell (V09 §5.1), its binding table (V09 §4.3) and its Open / recent / new (V09 §5.13) | the canvas, the member list, the arrangement tools, the relations box, the gap brush, Continue here, the fit sheet, the viewpoint picker, the style cards, the slider, the embellishment tray, the common-week toggle, the drift markers, the export tab and the share sheet's member list — a request to V09 (RQ-V15-7) | 5.1 |

Package rule (J-V15.1): `@plat/atlas` depends on `@plat/kernel` (`dmath`, `rng`, `index` and nothing geometric: the
atlas is no plat arena), `@plat/model`, `@plat/tables` and `@plat/world` (V13: the world document's reader, `edgeCharter`,
`renderAt`, the placement edits, `solve`, the lens readings), never on `@plat/render`, `@plat/export` or `@plat/app`; the
renderer, the exporters and the app read its records through the registry and §11.2's reader, as they read V14's. It
imports no writer of a world document's log (spine §14 (6); RQ-V15-6; the lint T-V15-19): the only world edits an atlas action
causes are the user's own on a member's own page (the fit's placement on the parent, a neighbour's change before a
continuation), committed there under that document's verbs and undo.

### 1.2 The base hooks this volume consumes (cited, never restated)

| hook | where | how this volume uses it |
|---|---|---|
| `Document`, `Recipe` with `product` and its per-product block, the canonical form, the four digests, the caches outside them (`derived`, `elaborations`, `lensPlates`) | §2.9, §6.2 | the atlas document (a `Document` of product `atlas`, `Recipe.atlas` its block; BCR-V15-1); the imagery cache as a document cache outside every digest beside `lensPlates` (BCR-V15-2); what is in which digest (V15 §2.11) |
| `Identity`, `Lifecycle`, `LifecycleEvent` with `cause`, `Tombstone`, `DerivationRecord`, `Provenance`; the namespace segment | §2.8, §6.3, V13 §2.5 | every record of V15 §2 carries them; a member is named by its world's `docId` and namespace, never by an address inside it |
| view state and its keys, per viewer and shared | §2.9 | the atlas's keys `atlasZoom`, `atlasCentre`, `relational`, `viewpoint`, `commonWeek`, `showDrift`, `showRelations`, `atlasPreset` (V15 §2.7; BCR-V15-3) |
| the edit events, the dry run, the outcome table, the closure rule, locality, undo, the per-document sessions | §7.1, §7.3, §7.4 | V15 §4's edit kinds (BCR-V15-4), each with its lifecycle row and undo; one undo stack per atlas, separate from every member's |
| migration and older documents | §7.5 | V15 §4.9 |
| the override layer and editable tables | §7.6 | the four tables `atlas.arrange`, `atlas.seams`, `atlas.style`, `atlas.embellish` (V15 §2.4; BCR-V15-5) |
| the display list and the tile worker; the tile key; zoom stops; print and the canvas budget | §8.1, §8.8, §8.9 | the atlas's tile pyramid as tile sets of the render tier keyed by (member, version, week, audience, level); the warp as a per-viewer mesh transform on the drawn tiles; the picture exports' bands |
| the style sheets, roles, programs, layer order, presets | §8.2, §8.4 | the atlas's own layer specs (V15 §5.2), the style presets' rows (V15 §2.5), the viewer's `stylePreset` never writing `setStyle` |
| the label placer and the admission function `admit(knownTo, key, band)` | §9.2 | one placer run over every member's placed label boxes at the atlas stop (collisions across seams resolved; V15 §5.3); the player view's admission (V15 §5.4) |
| furniture: the scale bar, the compass, the grid, the title, the legend's second cue, view pins and notes | §9.5 | the atlas's scale bar and ruler on the true plane; the viewpoint's compass under its orientation; the date cartouches; the legend's note "drawn as X saw the world" and the member marks' cues (BCR-V15-14); a drift marker drawn as a DM-only view mark |
| formats; the picture exports; the provenance block; the VTT and ecosystem rows | §11.1 | the atlas's picture exports and tile export (BCR-V15-6); the refusal of an ecosystem-shaped export of a stitched world |
| the embedding API and the worker boundary; the reader | §11.2 | `PlatApi.atlas.*` (BCR-V15-7); the render tier reads the atlas's records as any document's |
| the host bridge | §11.3 | an atlas in host mode: its document through the bridge, its members through the resolver (V15 §2.2 `Member.ref`) |
| sharing and multi-client use without a hosted service; `DocResolver` | §11.5 | members resolved by reference; a shared atlas carries imagery only for shareable members (V15 §5.5); the host's store an H-row (V15 §10.2) |
| budgets, the comfort level, memory, the register | §12, §12.8, §12.10 | V15 §6's `ATLAS-n` rows (BCR-V15-8) |
| the test families, fixtures, goldens, the declared-shift protocol | §13.2–§13.4, §13.8 | V15 §7's bars; the fixtures `B-ATLAS` (BCR-V15-9) |
| the package and registry rules; the staged milestones | §14, §16 | `@plat/atlas`, `@plat/render/atlas`; M-ATLAS-A/B/C (BCR-V15-10, -11) |
| the stream key, concern and stage registries, fixed-key draws | §6.1, §6.3 | the `atlas` concern and the stage ids `A1`–`A7` (BCR-V15-12); the draws V15 §3.9 lists |
| the failure classes, the report and its codes | §5.2, §5.4 | F-ATLAS and the `W_ATLAS_*` codes (BCR-V15-13) |
| **V13:** the two coordinate regimes, `WorldCm`, `WorldPointCm`, the world datum (sea level, 0), `WorldHeader` (unit cm, x east, y north, the extent, a geometry version), the latitude box as a climate device only, the world's week and date | V13 §2.1, §2.2 | the atlas plane is the same unit and datum, so every member lies at true scale by construction; a member's version carries the header's `geometryVersion`; the week and its label are read, never set |
| **V13:** `WorldRecipe` and `WorldRequest` (W0; amendments r's requirements, options and strengths), the size rows, the templates and formation scenarios | V13 §2.2, §2.3, §3.1; spine §4, §6 | a continuation's request is a `WorldRequest` pre-filled and carrying locked edge requirements (V15 §3.4); the rungs are V13's three |
| **V13:** the pipeline's registration and materializer contract; determinism and streams; the work laws | V13 §3.0, §3.17 | A1–A7 declare inputs, a context record and reason records as W0–W9 do; the `atlas.*` streams (V15 §3.9) |
| **V13:** placement P1–P5, `PlaceContext`, `placeFrame` with `preview`, the blend band, the conflict list `W_EDIT_DOSSIER` and its choices, the forced-fact precedence, `hostLocked`; the counterfactual fork | V13 §3.11, §3.11.5, §4.5; spine §5 | the fit across rungs (V15 §3.5) calls the rung-general form (RQ-V15-3) and shows V13's own preview and conflict list, never a second one |
| **V13:** the edit events and their outcome rows, the authoring tools, locality, undo, the sealed host-consumed edit | V13 §4.1–§4.4 | the parent's fit edit and a neighbour's pre-continuation change are V13 edits on those documents |
| **V13:** the world view's layers and the player picture; the zoom stops and opening a settlement as another page; labels; exports and picture exports | V13 §5.1–§5.5 | `renderAt` renders the member's `atlas` layer set at a stop for an audience (RQ-V15-2); drill-down follows V13 §5.2's page pattern; a member's labels come placed; the ecosystem-shaped export stays a world's |
| **V13:** the lens mechanism — the four fact classes and the refusals, the honesty rule and the bias notes, the audience filter, the plates and the scrub; the lenses' rows (religion, sway, trade, populations, prosperity, plague) | V13 §5.8, §5.9; J384 | the relational style's facts (RQ-V15-4) read through `lensAt`/the plates as class 4, labelled "projection"; no DM-only row reaches a player viewpoint; alignment never read |
| **V13:** budgets and the `WORLD-n` register; milestones M-W0h – M-W5 and amendments r's M-W6 – M-W9; the host-change list H1–H34 (H35 this volume's, appended by file r item 1015) | V13 §6, §8.2, §8.5; spine §15 | `ATLAS-n` rows beside them; M-ATLAS-A/B/C placed after the milestones they read (V15 §8); H35 requested (V15 §10.2) |
| **V13:** the port's presentation inputs `audienceKnowledge`, the party key, the player picture's whitelist; `worldFactsAt`; `derivedTime` and the travel law's rule that times are labelled | V13 §3.11.6, §2.4, §1b.2, §5.1 | the known-world sets per audience (RQ-V15-2's last item); the true readout's travel time labelled with its law and "on foot" standalone (V15 §3.6 (3)) |
| **V13 (amendments r):** the requirement record `{ id; source; rank; kind; target; strength; scope }`, the precedence ladder, the conflict list, decisions remembered; the solver interface `solve(requirements, state, goal)`; the world edge charter `WorldEdgeCharter` and `edgeCharter(world, side, span)`; the three lifetimes of world state | spine §3, §4.1, §5, §10.4, §14 (1), (5) | the arrangement's requirements and strengths (V15 §3.1); the continuation's charters (V15 §3.4); the test "a present physical fact, never a record" (J393; T-V15-2) |
| **V09:** the shell, the binding table, the view bar's keys, the share sheet, Open / recent / new, autosave and the local store, the message catalogue, the fates sheet | V09 §4.3, §4.19, §5.11, §5.13, §3.8, §2.11, §4.9, §5.5 | the atlas page and its rows (RQ-V15-7); "New world map" and "Open a world map…"; the share sheet's member list; the catalogue keys of V15 §4.8 |
| **V14:** the drill-down's last rungs (a site document opened from a world); the 2.5D renderer's `ZDecl` rule | V14 §3.9, §5.1; V14 §5.4 | A7's last handoff; every atlas drawable declares `{ flat: true; reason: 'imagery' }` — the atlas has no 2.5D view (V15 §5.6) |
| **V10:** the why providers and sections; the clerk's proposals | V10 §3.9, §3.9a | the `atlas` why section (V15 §4.8); a described relation typed in words parsed by the clerk's `propose` route |
| **V11:** the registry, the symbol catalogue, naming slices | V11 §2.1, §3.6 | the four tables' rows and the figure library's rows (V15 §2.4–§2.5; RQ-V15-9) |
| **V12:** the register, bars, panels, no-op pins | V12 §2.6, §3.6b, §3.7.8, §3.11 | every calibratable cell's entry; the pin `item.atlas.none` (no atlas open: the world view byte-identical) |

### 1.3 The owner's rules this volume obeys (quoted by number; each a design in V15 §3–§5)

The owner's words are the authority (docs/PROGRESS.md J392, verbatim there; typos kept); the spine's reading of each
is cited, never restated; where this volume lands the rule is the third column.

| rule | the owner's words (J392) | the spine's reading (cited) | where it lands |
|---|---|---|---|
| F10 | "Regarding the realm map style, I would like a mix of historical relational mixed with realistic scale and I’m curious to your thoughts. The relational scale predominant in medieval and renaissance in some ways disregard north south west etc, and center it on a primary location (in many cases Jerusalem or capital cities) drawing areas of import wildly out of proportion in comparison to other places. Which if we could get something of that for immersion but also keep absolute scale true for practical purposes, and not to mention other embellishments such as mythical creatures like a dragon in the sea or pagan savages and devils because if barabarous areas. I just wanted to confirm if what I thought was right and your thoughts on the whole idea." | spine §11: a view (fact class 4) over an atlas or one world; the true map keeps every measurement; the relational map an adjacency-preserving warp; a slider; hover shows true distance and travel time; the distortion from facts (centre, size, orientation, detail by knowledge); embellishments derived from the fictional cultures' facts, never real-world peoples; the DM adds, moves, removes; viewpoints; three presets; deterministic | V15 §3.6 (A6), §2.2 (`Viewpoint`, `Embellishment`), §2.5 (the presets), §5.2, §5.4; J-V15.14 – J-V15.19, J-V15.30, J-V15.31; T-V15-5, T-V15-6 |
| F11 | "What are your thoughts on a fourth layer map called the world map which is only derived from completed region, realm maps stitched together. Isolated in everything but image. Similar to how we can click deeper into settlement map for more detail but in reverse order? What are your thoughts?" then "But how woykd this work for seems between different sizes?" | spine §2 (rung 1 of the ladder: imagery, arrangement and viewpoints, no clock of its own), §10.1–§10.2 (the document; isolation with the one coupling), §10.6 (seams between sizes: the more detailed member wins; side by side softened on the shared stretch; a member inside another by three paths; one pixel resolution and one zoom rule; eased or inset; equal rungs the DM's, newer by default), §10.7 (drill-down) | V15 §2.2 (`AtlasRecipe`, `Member`), §3.2–§3.3 (A2, A3), §3.5 (A5), §3.7 (A7); J-V15.2 – J-V15.9; T-V15-1, T-V15-4, T-V15-12, T-V15-13 |
| F12 | "Oh letters users choose the configurations of where maps are in relation to each other" | spine §10.3: direct placement and described relations solved by the requirement engine at atlas scale; layout presets; warnings never refusals; undo for every change; true-scale alignment automatic | V15 §3.1 (A1), §2.2 (`Arrangement`, `Relation`), §2.3 (the relation vocabulary), §4.1; J-V15.10 – J-V15.12; T-V15-10 |
| F13 | "And where there is a void between two or more or on the side of a generated map, the next map would have basic configurations to be a continuation of it including the simulation for ongoing effects. What are your thoughts?" | spine §10.4 (narrowed by F14): the world edge charter per shared edge — the neighbour's present ground, never a record (J393) —, locked requirements of the new world; the basics pre-filled; contradictions reported with a reconciling feature; neighbours unchanged by default; provenance in the new world; the "ongoing effects" level withdrawn (spine §10.2) | V15 §3.4 (A4), §2.2 (`ContinuationRequest`, `Member.continuedFrom`); J-V15.13, J-V15.28, J-V15.29; T-V15-2, T-V15-11, T-V15-23 |
| F14 | "Edits after generation should not carry over, every map is effectively its own microcosm on different literal times." | spine §10.5: after generation nothing crosses a seam; each member its own clock and history; seams drift and the atlas softens; a DM-only drift marker; re-matching only on request, one member's border strip, previewed; each member at its own present with its date label; a common-week display an option | V15 §4.7 (microcosms), §4.5–§4.6 (deletion; version changes), §3.3 (3) (drift), §5.2 (date labels); J-V15.3, J-V15.5, J-V15.25; T-V15-1, T-V15-3, T-V15-22 |
| F15 | "So what do you think about all of our latest additions? Also to clarify, world maps are individual saves. So a user could have multiple world maps." | spine §10.1: an individual save; many per user; one world may belong to several atlases; references, never copies; deleting a member leaves a marked gap; sharing shares imagery only for shareable members | V15 §2.2 (the document), §2.11 (storage), §4.5, §5.5; J-V15.2, J-V15.4, J-V15.26, J-V15.27; T-V15-7, T-V15-8 |

The rules F1–F9 are seat A's (amendments r: V13, the base and the volumes; spine §13); F16 — the integration itself —
is the manager's rule, quoted in amendments r item 1029 and assigned to no seat (J393 (5)); this volume reads seat A's
results — the requirement record, the solver, the conflict list, the edge charter, formation's baked landforms,
bedrock and soils, the living physics' monthly climate and currents — as V13's facts and names each as a dependency
(V15 §1b.6). Amendments r (`docs/AMENDMENTS-2026-10-23r.md`) was written the same day and read for its seam definitions; where
this volume names a dependency by the spine's section and r's item, the seam seat reconciles the names (V15 §13).

### 1.4 Out of scope, with the reason

* **Physics and simulation of any kind** — the atlas runs no stage of V13's W0–W9, no formation, no living physics, no
  ecology, no sail routing; it holds no raster and no record of a member beyond the member's reference, its version and
  a picture. The one place a world's physics meets the atlas is a continuation at that world's generation (V15 §3.4),
  and there the atlas only carries V13's edge charters to V13's generator. (spine §2's rung 1: "no — imagery,
  arrangement and viewpoints"; §10.1 "It holds no physics, no simulation and no host data, and feeds nothing back".)
* **Host data** — the atlas has no port of its own and no door of the base's §11.4; it is never a host-bound document.
  Every host fact the relational style reads reaches it through a member's own V13 readings (the lens facts, the
  player picture, the known sets per audience) at that member's version, and the atlas stores none of them (V15 §1b.5).
  The host's storage of atlases across campaigns and its gallery and share rules are the host's own, asked for as a
  host-change row (V15 §10.2, H35) and the owner's (V15 §11 Q2).
* **Writing into a member after its generation (F14)** — no atlas action writes a member's log. The fit of a child into
  a parent (V15 §3.5 (c)) and a neighbour's change before a continuation (V15 §3.4 (6)) are the user's explicit,
  previewed edits on that world's own page, under its own verbs and undo (V13 §4.1, §4.4); the atlas records only that
  they happened (`FitRecord`, `ContinuationRequest.conflicts`). Nothing ever re-fits, re-matches or re-blends a member
  because another member changed; re-matching a border strip is only on request (V15 §4.1's `rematchStrip`), always
  one member's, always previewed.
* **The requirement solver, the edge charter's production, the rung-general placement, the lens readings and
  `renderAt`** are V13's (spine §14's seams 1–5): this volume consumes them as declared in V15 §1b.6 and requests each
  of V13 in V15 §10.2, and restates none. Formation's baked landforms, bedrock and soils and the living physics'
  monthly climate and currents are amendments r's (spine §3, §13): the charter carries what the member holds.
* **The relational style's art** — the library of monsters, vignettes, cartouches and lettering is content (V11's
  symbol catalogue, RQ-V15-9), on the owner's art budget (spine §16; V15 §11 Q3); this volume states the rows, the
  rules and the lint, and ships a minimal figure set per preset (V15 §2.5) so the mechanism runs before the art lands.
* **The F13 "ongoing effects" level** is withdrawn by F14 (spine §10.2): no level of coupling exists between members
  after generation, and none is designed, reserved or named here.
* **An ecosystem-shaped export of a stitched world** (V13 §5.4's `ecosystemJson`, `ecosystemGeoJson`, `heightmap16`,
  `worldCsv`) — never: a stitched picture is not a world, its members disagree at their seams by right (F14), and the
  shapes those tools read carry one cell graph with one scale. The atlas exports pictures and tiles of the view as drawn
  (V15 §5.5) and each member exports itself through V13 §5.4 from its own page; a request for the world shapes on an
  atlas is refused (`refuse.atlas.export`, V15 §4.1).
* **A sphere or a globe** — J-V13.44 stands (a bounded planar region with a latitude box for climate); the atlas is the
  same plane, bounded by its integer-centimetre lane (V15 §2.2's `AtlasCm`: ±21 474 km of its origin, a planet's
  width), and no projection of a sphere is drawn. The relational style's "orientation" is a rotation of the plane.
* **A fourth size rung or a "region" rung** — the owner's region map is the province rung (the state note's finding;
  V13 §2.3's three rows); the atlas adds no rung and no extent of its own beyond its members' union.
* **The encounter crop, world sites and the 2.5D view on an atlas** — a crop opens on a member (V14 §3.10's `world`
  context) after the drill-down (V15 §3.7); a site is a member's; the atlas has no 2.5D view (its drawables are
  imagery, flat with a reason; V15 §5.6).
* **The world page's own style** — V13 §5.1's layers and `style.world` are unchanged; the relational view lives here
  (spine §11: "It lives in V15"), and a single world is viewed relationally as the one member of an unsaved atlas opened
  from the world page (J-V15.14), never by a toggle inside V13's view.
* **Nothing else is out of scope.** An atlas holds members of every rung, from every campaign the user may read, in any
  number; its page opens standalone and in host mode; every arrangement, relation, gap, viewpoint and embellishment is
  editable with undo; every one of its pictures exports.

## 1b Wiring table — every new piece, what feeds it and what it feeds

Every record, field, table, stage output, interface, edit kind and entity kind this volume adds, with its producer and
its consumer. A piece the base carries names its base home and the request that put it there (V15 §10.1); the base
declares it and this volume states only its own producers and consumers. No piece is listed without a consumer; a piece
V13 supplies is marked **V13** and listed again in V15 §1b.6, a piece V09 draws marked **V09** and listed in V15 §10.3.

### 1b.1 Records, fields and tables

| piece | fed by (producer) | feeds (consumers) | home |
|---|---|---|---|
| `AtlasRecipe` (`Recipe.atlas`; V15 §2.2): the seed, `members`, `relations`, `gaps`, `viewpoints`, `style`, `conflicts`, `layoutPreset`, `snapshot` | the atlas's creation (`generate` with an `AtlasRecipe` of one member, or none); every edit of V15 §4.1 | A1–A7; the view; the exports; the clerk; V12's measures | `Recipe.atlas`, present exactly when `Recipe.product` is `'atlas'` (BCR-V15-1); in the model digest |
| `Member` (V15 §2.2): the world by reference (`world: { doc; namespace; ref? }`), its `version`, `rung`, `header`, `latBox`, `presentWeek`, `dateLabel`, `arrangement`, `origin`, `continuedFrom`, `fit`, `parent`, `shareable`, `state`, `name` | `addMember`; a continuation's generated world (`origin: 'continued'`); a derived child (`'derived'`); `fitChild` (`'fitted'`); the open-time version check (`state`, `version` compared, imagery marked stale) | A1 (its extent and lock), A2 (what to render and at which week), A3 (its seams), A4 (its edges), A5, A7 (what to open), the member list (V09), the share sheet, the exports, the clerk | the atlas's entities block; the model digest holds everything but `state` (a derived reading of the session; V15 §2.11) |
| `Arrangement` (V15 §2.2): `originCm`, `bearingCdeg`, `locked`, `z`, `by`, `since` | `arrangeMember`, `lockMember`, A1's solve, a layout preset | A2 (where tiles land), A3 (which edges touch), A4 (the void's neighbours), A6 (the true plane), the ruler, the exports | on the member |
| `Relation` (V15 §2.2–§2.3): `kind`, `a`, `b`, `widthKm?`, `side?`, `strength`, `text` | `relate`, `unrelate` (a tombstone); the clerk's parse of a typed sentence (V10's `propose`) | A1 (a requirement each), the relations box (V09), the DM-only relation lines, the clerk | the entities block; the model digest |
| `GapStyle` (V15 §2.2): `kind`, `region`, `label?` | `setGapStyle`; a layout preset's defaults; a removed or missing member's gap (V15 §4.5) | A3's unknown-space fill, A6's terra incognita, the legend, the exports | the entities block; the model digest |
| `Viewpoint` (V15 §2.2): `audience`, `culture`, `centre`, `orientation`, `stylePreset`, `knowledge`, `asOfWeek?` | `setViewpoint`; the shipped defaults "the game master's" (true map) and "the party's" | A6 (the warp's centre, orientation, importance and known region), A2's audience, the embellishments, the legend's note, the player view (V15 §5.4) | the entities block; the model digest |
| `AtlasStyleState`, `ConflictSettings` (V15 §2.2) | `setAtlasStyle`, `setConflictSettings` | A1's warnings and asks, A3's precedence and treatments, A6's rest position and figures, the common-week display | `Recipe.atlas`; the model digest |
| `Embellishment` (V15 §2.2): `kind`, `at`, `sizeCm`, `facing`, `source`, `derivedFrom?`, `hidden?`, `viewpoint`, `week` | A6's derivation (`source: 'derived'`, a derived cache, never stored); `setEmbellishment` (`source: 'dm'` records and the `hidden` marks, stored) | the embellishment layer, the legend, the exports, the clerk ("why a serpent here") | the DM's records and hidden marks in the entities block (the model digest); the derived set in `derived` (no digest) |
| `ContinuationRequest` (V15 §2.2): the void, `edges[]` (side, neighbour, charter, locked), `prefill`, `contradictions[]`, `conflicts[]`, `status`, `member?` | `requestContinuation` (drafted → sent → generated or cancelled) over **V13**'s `edgeCharter` | V09's world dialog (the pre-fill and the locked edge chips), V13's W0 (the locked requirements, through the request), the new member's `continuedFrom`, the clerk | the entities block; the carried `WorldEdgeCharter`s in the records digest as recorded inputs (V15 §2.11) |
| `FitRecord` (V15 §2.2): `child`, `parent`, `mode`, `placement?`, `conflicts`, `parentVersionBefore/After`, `since` | `fitChild` after **V13**'s `placeFrame` (rung-general) commits on the parent, or the `derivedFromParent` generation, or the `imageOnly` choice | A3 (the nested seam's treatment), A5's re-render of the parent, the member list, the clerk | the entities block; the model digest |
| `MemberImagery` (V15 §2.2; a cache): per member and audience the tile pyramid at the member's present (or the common week), its `version`, `week`, `stops`, `labels` (the placed label boxes), `stale` | A2 over **V13**'s `renderAt`; `refreshImagery` (a cache command, never an edit) | A3, A6, the view, the picture and tile exports, the shared atlas (shareable members only) | `Document.atlasImagery` beside `lensPlates`: outside every digest, kept across loads and saves, dropped and rebuilt when the member is openable (BCR-V15-2) |
| `SeamRecord`, `DriftReading`, `InsetLayout` (V15 §2.6; derived) | A3 over the members' arrangements, rungs and versions; the drift over **V13**'s `edgeCharter` at two versions | the seam compositor, the drift markers (DM-only), the inset frames and locator boxes, the clerk | `derived` (never persisted; rebuilt on open) |
| `WarpField`, `KnownRegion`, `TrueReadout` (V15 §2.6; derived) | A6 over the viewpoint, the week, the imagery, **V13**'s lens facts and known sets | the mesh warp of the drawn tiles, the hover readout, the drill-down's unwarp, the embellishment placement | `derived` (the warp cached per (atlas version, viewpoint, week, preset, grid); never in a digest or an export's model) |
| the tables `ArrangeRule` (`atlas.arrange`), `SeamRule` (`atlas.seams`), `AtlasStyleRule` and `StylePresetRow` (`atlas.style`), `EmbellishRule` and `FigureRow` (`atlas.embellish`) (V15 §2.4–§2.5) | shipped defaults (provenance `own`, calibratable unless marked); `editTable` (§7.6) | A1, A3, A6, the presets' cards (V09), V12's register | §7.6's registry (BCR-V15-5; V11's rows RQ-V15-9) |
| the view keys `atlasZoom`, `atlasCentre`, `relational`, `viewpoint`, `commonWeek`, `showDrift`, `showRelations`, `atlasPreset` (V15 §2.7) | V09's controls | the view, the readout, the exports' request | §2.9 (BCR-V15-3) |
| the warnings `W_ATLAS_OVERLAP`, `W_ATLAS_LATITUDE`, `W_ATLAS_CLIMATE`, `W_ATLAS_NORTH_DIFFERS`, `W_ATLAS_RELATION_UNMET`, `W_ATLAS_LOCKED_MOVE`, `W_ATLAS_MEMBER_STALE`, `W_ATLAS_MEMBER_MISSING`, `W_ATLAS_MEMBER_UNOPENABLE`, `W_ATLAS_MISMATCH`, `W_ATLAS_EDGE_CONTRADICTS`, `W_ATLAS_EDGE_UNLOCKED`, `W_ATLAS_NEIGHBOUR_CHANGE`, `W_ATLAS_DRIFT`, `W_ATLAS_WARP_FALLBACK`, `W_ATLAS_DETAIL_UNAVAILABLE`, `W_ATLAS_NOT_SHARED`, `W_ATLAS_BEHIND_WEEK` | the stages and the view | the report (§5.4), V09's catalogue, V10 | §5.4 (BCR-V15-13) |
| the register entries of this volume's calibratable columns (V12 §2.6) | the seat landing each step of V15 §8 | V12's lint and the corpus stage | §13.7, §13.9 |

### 1b.2 Stage outputs and interfaces

| output or interface | implementer | caller or consumer |
|---|---|---|
| `AtlasStrategy.generate(recipe, ctx)` → the atlas's stage set A1 (arrange), A2 (render), A3 (seams) with A6 on demand (V15 §3.0) | `@plat/atlas` (the `atlas` product's stages, each a `StageDecl` with `phase: 'main'`, `txForm: 'records'`, `lineageUnit: 'atlas'`) | `generate` with an `AtlasRecipe` (§11.2); every edit's fold over its dirty set (V15 §4.3) |
| `arrange(doc, requirements, goal): { arrangements: Arrangement[]; unmet: Requirement[]; warnings; reasons }` (A1) | `@plat/atlas/arrange` over **V13**'s `solve(requirements, state, goal)` with the atlas-scale requirement kinds of V15 §3.1 | A1; the relations box's live preview; a layout preset |
| `requirementsOf(relation): Requirement[]` (V15 §2.3) | `@plat/atlas/arrange` | `arrange`; the clerk ("what this relation asks") |
| `renderMember(doc, member, { audience; week?; stops }): MemberImagery` (A2) | `@plat/atlas/render` over **V13**'s `renderAt` (RQ-V15-2) in the tile worker | A2; `refreshImagery`; the common-week display; the share writer |
| `composeSeams(doc): SeamRecord[]` and `blendSeam(tileA, tileB, seam, level)` (A3) | `@plat/atlas/seams` (the records); `@plat/render/atlas` (the pixel blend: a band-limited multiresolution blend over the shared stretch, V15 §3.3) | the atlas tile set's composition per level; the drift markers; the inset frames |
| `labelsAcrossSeams(doc, stop): LabelBox[]` (A3 (5)) | `@plat/atlas/seams` over the base's placer (§9.2) and the members' placed label boxes | the tile set's label layer; the exports |
| `draftContinuation(doc, void: { region; rung }): ContinuationRequest` (A4) | `@plat/atlas/continue` over **V13**'s `edgeCharter(world, side, span)` (RQ-V15-1) and V15 §3.4's prefill and contradiction rules | `requestContinuation`'s dry run and fold; V09's Continue here; the world dialog (V09) that opens on it |
| `fitChild(doc, child, parent, mode, opts): FitRecord` (A5) | `@plat/atlas/fit` over **V13**'s rung-general `placeFrame` / `requestCharter` (RQ-V15-3), its `preview` and its conflict list | the fit sheet (V09); `fitChild`'s fold after the parent's edit commits |
| `knownRegion(doc, viewpoint, week): KnownRegion` (A6 (4)) | `@plat/atlas/view` over **V13**'s known sets per audience (RQ-V15-2) and the lens facts (RQ-V15-4) | the warp's detail-by-knowledge, the player view's admission, the embellishments at knowledge's edge |
| `importanceField(doc, viewpoint, week): Float32Array` over the warp grid (A6 (2)) | `@plat/atlas/view` over **V13**'s lens facts (RQ-V15-4), labelled "projection" | `bakeWarp` |
| `bakeWarp(doc, viewpoint, week, preset): WarpField` (A6 (1)) — a cache command, on request or on the first move of the slider | `@plat/atlas/view` (the flow-based area cartogram on the grid, the centre magnification, the orientation; `dmath` only; V15 §3.6) | the mesh warp of the drawn tiles (`@plat/render/atlas`), `trueReadout`, `drillTarget`, the embellishment placement |
| `warp(field, s, p: AtlasPointCm): ScreenPt` and `unwarp(field, s, q): AtlasPointCm` | `@plat/atlas/view` | `@plat/render/atlas` (per tile-mesh vertex), the hover readout, the drill-down, hit testing of embellishments |
| `trueReadout(doc, q): TrueReadout` (A6 (3)) — the true point, the distance to the viewpoint's centre or to a pinned point, the travel time along a route under its member's law when both points lie in one member | `@plat/atlas/view` over `unwarp` and **V13**'s `derivedTime` and route stations | V09's hover card; the ruler |
| `embellish(doc, viewpoint, week): Embellishment[]` (A6 (5)) | `@plat/atlas/view` over the `atlas.embellish` rules and `viewFacts` (the seats' points, the sways' poles, areas and borders, the routes, the bathymetry on request, the events), keyed draws on the `atlas.embellish` stream | the embellishment layer; `setEmbellishment`'s baseline; the clerk |
| `drillTarget(doc, q, zoom): { member; worldPoint: WorldPointCm; stop } | null` (A7) | `@plat/atlas/view` over `unwarp` and the arrangements | V09's click and zoom threshold; the document router's open of the member (V13 §5.2's pattern) |
| `PlatApi.atlas.open(h)`, `.members(h)`, `.readout(h, q)`, `.drill(h, q)`, `.continuation(h, void)`, `.fit(h, child, parent, mode)`, `.refresh(h, member)`, `.bake(h, viewpoint)` and the `query` kind `atlas` (BCR-V15-7) | the generation worker (`@plat/atlas`) behind §11.2's boundary; the render tier for the composition | V09's atlas page, the clerk's `useTool`, the export dialog |
| the messages `atlas.memberStale { atlas; member; version }`, `atlas.memberMissing { atlas; member }` (posted by the open-time check) | `@plat/api` | V09's member list and toasts; the gap mark |
| the `atlas` `WhySectionProvider` and the `Member`, `Relation`, `Embellishment`, `SeamRecord` `WhyProvider`s | `@plat/atlas` (V15 §4.8) | V10's `why`, V09's cards and panels |

Each output is consumed: A1's arrangements by A2 (tile placement), A3 (seams), A4 (voids), A6 (the true plane) and the
exports; A2's imagery by A3, A6, the view, the exports and the share writer; A3's seams by the compositor, the drift
markers and the clerk; A4's request by V09's world dialog and V13's W0; A5's record by A3 and the member list; A6's warp
by the render tier, the readout and A7; A7's target by V09's router.

### 1b.3 Edit kinds (each with its tool, lifecycle row and undo)

| edit | the authoring tool (§7.1's binding table; V09 §4.3; RQ-V15-7) | lifecycle row | undo |
|---|---|---|---|
| `addMember` (V15 §4.1) | the member list's **Add a world map…** (the recent list, a file, a link; a drag of a world's card onto the atlas) | V15 §2.10's member row | the member tombstoned, its imagery cache dropped, its relations tombstoned; a gap left as `blank` |
| `removeMember` | the member list's delete gesture → the fates sheet (V09 §5.5) with **Remove from this atlas** (the world untouched) | V15 §2.10 | the member, its relations and its imagery restored |
| `arrangeMember` (`originCm`, `bearingCdeg`) | T6 `place` on the atlas (a drag; a rotation handle snapping to right angles; edge snapping; the ruler) | V15 §2.10's arrangement row | the former arrangement |
| `lockMember` | the member card's lock | V15 §2.10 | the inverse |
| `relate` / `unrelate` | the relations box (structured chips: member, relation, member, width or side) or a typed sentence parsed by the clerk's `propose` route (V10 §3.5) | V15 §2.10's relation row | the relation tombstoned or restored; the arrangements it solved kept (an explicit `arrange` re-solve undoes them) |
| `setLayoutPreset` | the layout cards (clustered continent · archipelago · scattered realms) | V15 §2.10 | the former arrangements and gaps |
| `setGapStyle` | T2 `ground` on the atlas: the gap brush (a region, or "between these two", or "around this side") and the kind picker | V15 §2.10's gap row | the former gap |
| `setConflictSettings`, `setAtlasStyle` | the atlas's settings sheet; the style cards | V15 §2.10 | the inverse |
| `requestContinuation` (`action: 'draft'\|'send'\|'cancel'`) | **Continue here** on a void (a click in empty space beside or between members, or a member's edge handle) → the world dialog (V09) pre-filled with locked edge chips | V15 §2.10's continuation row | a drafted or cancelled request tombstoned; a sent one whose world was generated is kept (the world exists; removing it is `removeMember`) |
| `fitChild` (`mode: 'derivedFromParent'\|'imageOnly'\|'fitted'`) | the fit sheet on a nested member (three cards; the fitted card opens V13's placement preview on the parent's page) | V15 §2.10's fit row | the atlas's record only (the parent's edit is undone on the parent, V13 §4.4; the two are not one group — J-V15.9) |
| `rematchStrip` | the seam's context action **Re-match this edge…** (a request: which member, which strip; V13's edit on that member, previewed there) | V15 §2.10 | the atlas's request record; the member's edit on its own page |
| `setViewpoint` (`action: 'add'\|'update'\|'remove'`) | the viewpoint picker's **New viewpoint…** sheet (audience, culture, centre rule, orientation, preset, as-of week) | V15 §2.10's viewpoint row | the inverse |
| `setEmbellishment` (`action: 'add'\|'move'\|'remove'\|'restore'`) | T6 `place` with the embellishment tray (the DM): a drag from the tray, a drag of a figure, delete | V15 §2.10's embellishment row | the inverse (a removed derived figure's `hidden` mark cleared) |
| `setAttr` on a member's `name`, a gap's `label`, a viewpoint's `name` | T9 `shape` | §7.4's setAttr row | the inverse |
| `refreshImagery(member?)`, `bakeWarp(viewpoint)`, `pinImagery(member, keepStops)` | the member list's refresh; the slider's first move; the member card's **Keep detail** | cache commands, never events (as `pinPlate`, V13 §5.8 (8)) | — |

The view keys of V15 §2.7 are view state (§2.9): never events, never undone, never in any digest.

### 1b.4 Entity kinds (each rendered, labelled, exported, persisted)

| entity | rendered | labelled | exported | persisted |
|---|---|---|---|---|
| a member's imagery | the member's tiles composited at the level, under the seams, in the viewpoint's warp | the member's placed labels (its own, through `renderAt`), its date cartouche, its name on hover | the picture exports as drawn; the tile export; the shared atlas (shareable only) | the imagery cache (`Document.atlasImagery`), outside every digest |
| a gap (`GapStyle`) | the kind's fill: sea tint with the style's wave hatching, a strait's double shore, a mountain-belt hachure, mist, terra incognita's blank parchment and lettering, blank | its `label` in the style's lettering | the picture exports; GeoJSON of the atlas (a Polygon of kind `gap`) | the entities block |
| a seam (`SeamRecord`) | the softened band (nothing of its own); under `showDrift` a DM-only tick at the stretch's midpoint with the drift's figures; an inset's thin frame and the locator box on the coarser member | the drift figures ("coast 2.1 km apart · 1 river unmatched") | the frame line in a picture; never the drift figures below the DM's key | derived, never |
| a relation (DM-only diagnostic) | under `showRelations`: a dashed line a → b with the kind's glyph, red where unmet | the kind word and width | never | the entities block |
| an embellishment | the figure at its point, facing, sized by the preset's rows; a vignette at its seat; a cartouche at its corner | a figure's caption in the preset's lettering ("here be serpents"); a vignette's event word | the picture exports as drawn; GeoJSON a Point of kind `embellishment` with `source` and `derivedFrom` | the DM's records; the derived ones never |
| the relational furniture (rhumb lines, compass roses, the itinerary strip's stations and day counts, the T-O rim) | by the preset's rows | the day counts in the preset's numerals | the picture exports | never (derived) |
| a missing-member mark | the last imagery ghosted at `atlas.seams.missingGhostAlpha` (or blank) under a hatched frame with "missing map: {name} (last seen {version})" | the mark's words | the picture exports draw it as drawn; the shared atlas writes the gap | the member's `state` is derived; the gap persists as a `GapStyle` only if the user converts it |
| the true-distance readout and the ruler | the hover card; a dashed ruler line on the true plane unwarped through the view | km (the `worldUnits` view key's unit, V13 §2.1) and, within one member, the travel time labelled with its law | never | never |

### 1b.5 Host facts, traced to their field and derivation row

The atlas holds no host fact (V15 §1.4). The relational style reads host facts of a **member** through V13's lens
readings at that member's version and week, as V13 §5.8's fact classes mark them, and derives from them two map-side
values it labels "projection" (class 4): an **importance** per seat and a **known region** per viewpoint. Nothing is
stored; every reading is re-made from the plates and the events when the view is drawn (the embellishments a derived
cache). The alignment lens is never read (DM-only, J384 (7)); suppressed creeds, covert links and criminal channels are
never read (V13 §5.8 (7)); a row the host resolved DM-only never reaches a player viewpoint (fail closed).

| fact the view uses | V13's port field (the host's fact, through V13's plates and events) | V13's row | reader here |
|---|---|---|---|
| the holy city of a culture | `LensFacts.hierarchy[]` (superior → member), `LensFacts.faithPlaces[]` (the host's pilgrimage-centre, religious-superior and holy-site labels), `LensFacts.faith[].patron`, `LensFacts.realmRank[]` | V13 §5.9 (6) | A6 (2)'s centre rule `holyCity` and the holiness term; the city vignette's tier |
| the capital of a realm | `Allegiance.root` and `members` (the sway's root seat), `PolitySeat.tier` | V13 §3.9, §5.9 (2) | A6 (2)'s centre rule `capital` |
| a seat's tier and population | `PolitySeat.tier`, `LensFacts.sizes[]` | V13 §5.9 (5) | the importance's size term |
| trade importance | `LensFacts.economy[].entrepot.centrality`, `.exports` (count), `LensFacts.links` of the trade lens (channels) | V13 §5.9 (4) | the importance's trade term; a port drawn red in the portolan preset |
| prosperity | `PolitySeat.prosperity` (the host's rung) | V13 §5.9 (7) | the importance's prosperity term (the host's rung relative to the realm's median, as the sway reads it, V13 §3.9 (7)) |
| hostility and distance between cultures | `PolityRelation.word` mapped to respect / neutral / adversarial, `.atWar`; `PolityFacts.culture[].band` (the host's culture distance in fifths); `Sway.neighbours[].class` | V13 §3.9, §5.9 (2) | A6 (5)'s monstrous peoples and devils rules; the "far lands" term |
| an enemy faith | `LensFacts.faith[].patron` of the land's holder against the viewpoint culture's patron; the religion lens's `contested` and `historic front` links | V13 §5.9 (6) | A6 (5)'s devils rule (never the alignment lens's posture link) |
| knowledge per audience | `RenderedWorld.known[].cells` per audience (amendments r: the coarse cells the audience's places have reached through the world's `knownTo` — V13's reading of the party key `party: { tier; places }` (§2.9), `audienceKnowledge` and the player picture's whitelist, V13 §5.1) | V13 §3.11.6, §5.1, §5.4, §5.8 (7) | A6 (4)'s known region per audience; the player view (V15 §5.4) |
| dated realm events | `WorldEvent` (kind, week, `at` or `seats`, audience): plague arrivals and realm arcs, battles, sieges, raids, razings, booms and busts, patron falls | V13 §2.2, §5.8 (1), (8) | A6 (5)'s vignettes (a skull, banners, a siege mark, a ruin, a fallen idol) within `atlas.embellish.vignetteWeeks` of the viewpoint's week |
| sailed and storm-feared waters | `WorldRoute` (mode `water`, its `waterRuns`), `TravelLaw.water.stormFactor` per quarter (the host's law when bound, the default row standalone) | V13 §2.2, §3.8 | A6 (5)'s sea-serpent rule |
| a seat's position and a sway's extent; a culture's label; the sea's depth | `ViewFacts.polity.seats[].at`, `.sways[].poleCm`, `.areaKm2`, `.border`; `ViewFacts.polity.cultures[]`; `ViewFacts.water.bathymetry` on request (file r item 1007 as the reviser widened it, C15-02, C15-03) | V13 §5.8 (10) | A6 (1) (b), (2), (5), (8) |
| a route's course and stations (the itinerary's spine, the travel-time readout, the known region along routes) | `ViewFacts.routes[]` (every route of both modes in force at the week, with its polyline, `stations` and `sailing`; file s item 1050) | V13 §2.2, §3.8 | A6 (1) (c), (3), (4) |
| the member's present week and date label; its known sets | `renderAt`'s result (RQ-V15-2) | V13 §2.1 | the date cartouche; the common-week display; the known region |

Every value above is read as the host resolved its audience; a gap in the host's facts (no hierarchy sent, no culture
band, no events) leaves the corresponding term at its neutral value and the legend says so ("no faith seated: the
centre is the capital"; "no culture distance sent: far lands by distance alone") — V13 §5.8 (3)'s honesty rule, never a
guess.

### 1b.6 Volume 13's dependencies (named, never restated; spine §14's five seams and their readings)

| what V15 needs | V13's piece (spine §14) | V15's reader | until it lands |
|---|---|---|---|
| **the world edge charter** `WorldEdgeCharter` as amendments r defines it (V13 §2.2, file r item 953: every field, cited and never restated — the neighbour's PRESENT physical ground along the edge at the moment it is read, however that ground came to be, and **never** a record: no event, no land cover, no plate, no political fact, no simulation state, nor any change made after the reading; J393's test, which V13 states once), produced by `edgeCharter(world, side, span, line?)` as a read (`line` absent for a world's own edge; the extent's side for a `WorldCharter`'s four interior edges, file s item 1033) and consumed by W0's step 6 as `locked` `Requirement`s of source `edgeCharter` carried in `WorldRequest.edgeCharters[]`, stored whole in the new world's `WorldRecipe.edgeCharters`; T-V13-68 the present-ground bar | spine §14 (1), §10.4; amendments r items 942, 953; RQ-V15-1 | A4 (one per shared edge); A1's edge summaries (the full side's span); the drift reading (two versions compared); T-V15-2 | a continuation is refused with `refuse.atlas.noCharter` naming the member's version (the void can still be filled by an ordinary new world, un-continued) |
| **the rendered member**: `renderAt(world, week, audience)` → `RenderedWorld` as amendments r defines it — the §8.1 tile sets at the four stops over the `atlas` layer set — the member's default picture for the audience (J394): relief with the land cover's used and disturbed classes over it, water, routes, settlements, labels, the sway's fills and borders, the occupation, debatable and fighting overlays and the event pins, each under the audience's admission (the player picture for a party); no lens, no diagnostic, no DM-only mark for a player —, the extent, the datum, the latitude box, the rung, the present week, the date label and the known sets per audience as coarse cells; a view read cached per (digest, week, audience) — with the placed label boxes per stop (`tiles[].labels`), both V13's by file r items 1007 and 1011, `opts.layers` for the parent's towns over a derived child (item 1006), and `week` below the present for the common-week display | spine §14 (2); amendments r item 942 and its V13 §5.4 text; RQ-V15-2 | A2; the common-week display; A6's known region; the drill-down's stop | no atlas: M-ATLAS-A waits on M-W6, which lands `renderAt` over M-W3's labels and picture rows (file r item 1015) |
| **the fit across rungs**: `placeFrame` with `frame: { kind: 'world'; doc }` (amendments r item 975; the `fit` edit row of item 943: P1's terms over the child's edge profile at its own cell size, P2's band in the parent scaled by the parent's cell ratio (item 942), P3–P5 as for a frame, the child never changed; `Placement`'s world subject, item 1030), with `preview` and the conflict list; this volume's asked additions: `requestCharter` with a world subject for the derived-from-parent path (the parent's rasters as the child's coarse ground, its frames as planned sites) and the transient `charterFor` at a world-rung extent for the mismatch reading | spine §14 (3), §10.6; amendments r items 943, 975, 1030; RQ-V15-3 | A5 | a nested member is image-only with its mismatch warning (`W_ATLAS_MISMATCH`); the fitted and derived paths wait on M-ATLAS-B |
| **the relational style's facts**: `viewFacts(world, week, audience)` → `ViewFacts` (V13's: V13 §2.2 and §5.8 (10) by file r items 1007 and 1012; J-V13.133; RQ-V15-4) → the religious hierarchy and faith places, the realm rank, the sway's roots and members, tiers, sizes, prosperity rungs, the trade entrepôts and exports, the relations and culture bands, the dated events — each with its fact class and its resolved audience, read from the plates at `week` (V13 §5.8 (8)); with every seat's point, every sway's pole, area and border, the culture table and the bathymetry on request (C15-02, C15-03) | spine §14 (4); RQ-V15-4 | A6's importance field, centre rules, hostility terms and vignettes | the relational view runs on the recipe's seats and the sway's recipe regime alone (a standalone world: V13 §3.9 (5)); on a host-bound member the terms read neutral and the legend says "the host's facts not sent" |
| **the arrangement solver**: `solve(requirements, state, goal, opts)` as amendments r defines it (items 942 and 1007: `state` `{ members: ArrangeMember[] }` — each member's `Placement` of subject kind `world` with its extent, rung, coarse cell and lock —, `goal: 'arrange'` over placements only, `SolveResult { ops; placements?; report; conflicts }`; r names V15 as the caller) — the relations as r's `Requirement` records of kind `relation` with V15 §2.3's words as the target's `word`, the compatibility checks of kinds `latBox` and `climateRow` at rank 4, the atlas-scale evaluators registered through V13's `solve.registerEvaluator` (file r item 1007; J-V13.132) | spine §14 (5), §4; amendments r items 942, 1007; RQ-V15-5 | A1 | — (M-ATLAS-A follows M-W6, which lands `solve`; V15 §8) |
| **no reverse seam** — V15 writes nothing into a world document after its generation | spine §14 (6) | the lint T-V15-19 over `@plat/atlas` | — (this volume's own promise) |
| the world's week and date label, `WorldHeader` and the member's version digests (through the base's reader of §11.2, the one reading beside the six — R-V15-4, file r item 1017), `WorldSizeRung`, the size rows, `WorldPointCm`; `worldFactsAt`; `derivedTime` and the travel-law labelling rule | V13 §2.1, §2.2, §2.3, §2.4, §1b.2, §5.1; §11.2 | A2, A6 (3), A7 | — |
| the lens mechanism's fact classes, refusals, honesty rule, audience filter; the plates' horizon; the lenses' rows named in V15 §1b.5 | V13 §5.8, §5.9 | A6 | M-ATLAS-C after M-W5 |
| the placement edits' conflict list (`W_EDIT_DOSSIER` and the choices the spine generalises) and the fork preview | V13 §3.11.5, §4.5; spine §5.3 | A5 (c); a neighbour's pre-continuation change | — |
| the four stops and the glyph levels; opening a document as another page; the picture exports' rows | V13 §5.2, §5.4 | A2's shared zoom rule; A7; the exports | — |

## 2 Data model

### 2.1 What the base, volume 13 and volume 9 already declare (read as declared)

`Document`, `Recipe` and its per-product blocks, `Base`, `Snapshot`, `ChunkRef`, `ViewState` and the view keys (§2.9);
the four digests and what each hashes (§6.2, §2.9); `Identity`, `Lifecycle`, `LifecycleEvent`, `DerivationRecord`,
`Provenance` (§2.8); `EditBase`, `EditEvent`, `EditScope`, `EditFate`, `ConflictAction` (§7.1); `StageDecl`,
`StageContext`, `ProductDecl`, `StrategyRegistry` (§4.12, §14); `PlatApi`, `ExportOpts`, `Query`, `Admission`, the
reader (§11.2); `DocResolver` (§11.5); `LayerSpec`, `StyleSheet` and the style presets (§8.2, §8.4); the tile key and
the zoom stops (§8.8); `LabelEntity` and the placer (§9); the knowledge tiers `'public'|'local'|'secret'` and the party
key (§2.9, §9.2). From V13: `WorldCm`, `WorldPointCm`, the world datum, `WorldHeader`, `WorldSizeRung`, the size rows,
`WorldRecipe` and `WorldRequest`, `FrameCharter`, `Placement`, `PlaceContext`, `CoherenceCost`, `WorldRoute`,
`Territory`, `Sway`, `Allegiance`, `PolityFacts` and its rows, `WorldEvent`, `TravelLaw`, `ReasonRecord`, `LensId`,
`FactClass`, `LensFacts`, `LensPlate`, `Aud`, `WorldFacts` (V13 §2.2, §2.4); amendments r's `Requirement` and the
`WorldEdgeCharter` (spine §4.1, §10.4). From V09: `AppPrefs.recent`, `LocalDocRecord`, the share sheet's options, the
document pages (V09 §2.11, §5.11, §5.13).

**Units.** Every length is an integer centimetre (`Cm`, `AtlasCm`) or a field named `…M` / `…Km`; a bearing is
centidegrees clockwise from north (`Cdeg`); a week is §4.11's `Week`; a pixel measure is `Px`; a share is a number in
[0, 1]. **The atlas plane** (J-V15.2) is a planar, bounded, axis-aligned plane in **integer atlas centimetres**
(`AtlasCm`, an int32 lane as `WorldCm` is: x east, y north) whose origin is the south-west corner of the atlas's first
member at the atlas's creation (an atlas with no member has its origin at (0, 0) and takes the first member's corner
when one is added); it is the same unit as every member's `WorldCm` and the same datum (sea level, 0 cm), so a member's
point `w` lies on the atlas at `toAtlas(m, w) = m.arrangement.originCm + R(m.arrangement.bearingCdeg) · (w − c) + c'`,
where `c` is the member's extent centre in its own frame and `c'` that centre's atlas position (a rotation about the
member's centre, through `dmath`'s sine and cosine, rounded to the centimetre; bearing 0 — the default and the only
bearing a continuation or a fit admits — reduces it to a translation), and `toMember` is its inverse. The lane bounds
the atlas: every member's corners must lie within ±2 147 483 647 cm (±21 474 km) of the origin — a planet's width —
and an `addMember` or `arrangeMember` that would exceed it is refused (`refuse.atlas.extent`, V15 §4.1). The atlas
has no latitude of its own (J-V15.11): a member's latitude box is V13's climate device (V13 §2.1: "no coordinate is
ever a degree") and the atlas reads it only to check neighbours' continuity (V15 §3.1 (4)) and to pre-fill a
continuation's box (V15 §3.4 (4)). **The atlas's week** does not exist (spine §2's rung 1: "none of its own"): every
member is drawn at its own present, and the common-week display is a view option over the members' own histories
(V15 §4.7).

### 2.2 New records

```ts
// @plat/atlas — the atlas document (a Document of product 'atlas', §2.9; BCR-V15-1)
type AtlasCm = WorldCm; type AtlasPointCm = { x: AtlasCm; y: AtlasCm };   // the atlas plane (V15 §2.1): integer cm, x east, y north, the world datum
type MemberOrigin = 'placed'|'continued'|'derived'|'fitted';
type MemberState = 'present'|'missing'|'unopenable';   // derived at open: never in a digest
interface AtlasRecipe {                        // Recipe.atlas, present exactly when Recipe.product is 'atlas'; Recipe.rung reads 'atlas' (the one rung the product registers)
  seed: Seed /* the atlas's own seed: keys the embellishment draws and the solver's tie-breaks on the `atlas.*` streams (V15 §3.9); never a member's */;
  members: Member[]; relations: Relation[]; gaps: GapStyle[]; viewpoints: Viewpoint[];
  style: AtlasStyleState; conflicts: ConflictSettings; layoutPreset?: 'clustered'|'archipelago'|'scattered' /* the last preset applied; provenance only */;
  snapshot: { tables: Record<TableId, string> /* every atlas.* table version read */; generator: string; format: string; renderer: string /* the member renderer's output version the imagery was made under (V15 §2.11) */ } }
interface Member {
  id: Id; world: { doc: Uuid; namespace: string /* V13 §2.5's segment, read once at add */; ref?: string /* a DocResolver reference (§11.5) when the world lives outside the local store: the host's or a file's; absent for a local document */ } /* BY REFERENCE: never a copy of any raster or record (F15; J-V15.4) */;
  version: MemberVersion /* the version the imagery, the seams and every carried charter were taken at; a differing live version marks the imagery stale (V15 §4.6) and never re-fits */;
  rung: WorldSizeRung; header: WorldHeader /* the scale declaration only (unit, axes, origin, extent, geometryVersion), copied at add and at every refresh through the base's reader of §11.2 (R-V15-4) */;
  latBox?: { southDeg: number; northDeg: number } /* the member's climate box (V13 §2.2), read for continuity checks and a continuation's pre-fill only */;
  presentWeek: Week; dateLabel: string /* the member's present and its date label as renderAt returned them at the last refresh (V15 §4.7) */;
  arrangement: Arrangement;
  origin: MemberOrigin; continuedFrom?: { request: Id; charters: { neighbour: Id; side: 'N'|'E'|'S'|'W'; charter: Id /* the carried WorldEdgeCharter's id in this atlas's records */; neighbourVersion: MemberVersion }[] } /* the atlas's side of a continuation's provenance; the world stores its own copy (spine §10.4) */;
  parent?: Id /* the member whose extent wholly contains this one (a nested member; V15 §3.5) */; fit?: FitRecord;
  shareable: boolean /* this member's imagery may travel in a shared atlas or picture (V15 §5.5): the default follows the world's own sharing (its resolver access, §11.5), the user may narrow it, never widen it beyond the world's; the host's rule across campaigns the owner's (V15 §11 Q2) */;
  name?: NameRef /* the member's title: the world's own name by default */; lifecycle: Lifecycle; reason: Id }
interface MemberVersion { modelDigest: Hash128; recordsDigest: Hash128; logHead: number; geometryVersion: number; outputVersion: string }
interface Arrangement {
  originCm: AtlasPointCm /* where the member's south-west corner lies (bearing 0), or its centre's anchor under a bearing (V15 §2.1) */;
  bearingCdeg: Cdeg /* the member's north turned clockwise on the atlas plane; 0 by default; snapped to right angles by the tool (`atlas.arrange.rotateSnapCdeg`); presentation on the atlas plane only — the member's own north stays its +y (J-V15.12) */;
  locked: boolean /* held by every solve and preset; a solve that would move it asks (`W_ATLAS_LOCKED_MOVE`: unlock · cancel) */;
  z: number /* the draw order among overlapping members of equal rung: the higher draws over; by default the newer member's add ordinal (`ConflictSettings.seamPrecedence`) */;
  by: 'direct'|'solved'|'preset'|'continuation' /* the last writer */; since: { seq: number } }
type RelationKind = 'eastOf'|'westOf'|'northOf'|'southOf'|'acrossSea'|'inside'|'farFrom'|'adjacent'|'beyondUnknown';   // V15 §2.3
interface Relation { id: Id; kind: RelationKind; a: Id; b: Id /* members: "a <kind> b" */;
  widthKm?: number /* acrossSea: the sea's width between the facing edges; farFrom: the least distance between the extents; absent: the kind's default cell */;
  side?: 'N'|'E'|'S'|'W' /* adjacent: the side of `a` that `b` touches; eastOf and its kin imply it */;
  strength: 'set'|'locked' /* the requirement's strength (spine §4.1): a relation is never 'random'; 'locked' holds against every later solve and preset */;
  text: string /* the relation as the user wrote or chose it, kept for the clerk and the relations box */; lifecycle: Lifecycle; reason: Id }
interface GapStyle { id: Id; kind: 'sea'|'strait'|'mountains'|'mist'|'terraIncognita'|'blank';
  region: { ring: AtlasPointCm[] } | { between: [Id, Id] } | { around: Id; side: 'N'|'E'|'S'|'W'; depthKm: number } | { everywhereElse: true } /* at most one `everywhereElse` gap: the atlas's background kind (default `terraIncognita`) */;
  label?: NameRef /* a sea's or land's name in the style's lettering */; lifecycle: Lifecycle; reason: Id }
interface Viewpoint {                          // "every map is somebody's map" (spine §11): an audience + a culture
  id: Id; name: NameRef;
  audience: 'dm'|'party'|'public' /* the knowledge key the view admits by (§9.2): the DM everything, the party its places and pictures, the public tier `public` */;
  culture: { member: Id; cultureId: number /* a culture id of that member (V13 §2.2 WorldRaster.culture's table) */ } | 'none' /* no mapmaker: the true map's conventions */;
  centre: { rule: 'holyCity'|'capital'|'mapmakerSeat'|'point'; at?: AtlasPointCm /* rule 'point': the DM's choice */; resolved?: { member: Id; seat: string | Id; at: AtlasPointCm } /* derived at draw (never stored): what the rule found (V15 §3.6 (2)), `at` the seat's `ViewFacts.polity.seats[].at` through `toAtlas` */ };
  orientation: 'northUp'|'eastUp'|'southUp'|'westUp'|'towardCentre' /* the preset's default; the DM's override */;
  stylePreset: string /* an atlas.style preset row key: 'true', 'mappaMundi', 'portolan', 'itinerary' */;
  knowledge: { source: 'audience'|'culture'|'everything'; heardOfBands: number /* the bands of "heard of" beyond the known edge (`atlas.style.heardOfBands` default) */ } /* how the known region is derived (V15 §3.6 (4)) */;
  asOfWeek?: Week /* a map as it was at a past week (a map found in a dungeon): the plates at that week on every member (never later than a member's present) */;
  route?: { member: Id; routes: Id[] } /* the itinerary preset's spine: a chain of one member's WorldRoutes */;
  lifecycle: Lifecycle; reason: Id }
interface AtlasStyleState { preset: string /* the atlas-wide default preset for a viewpoint that names none */; relational: number /* 0–1: the slider's rest position saved with the atlas; the per-viewer `relational` key overrides it */;
  embellish: boolean /* the derived embellishments drawn at all (the DM's own always) */; insets: boolean /* detail steps as insets where the seam rule says so, else always eased */; dateCartouches: boolean /* default true */ }
interface ConflictSettings { overlap: 'warn'|'allow' /* two extents overlapping: warned (default) or admitted silently as an inset */; latitudeClash: 'warn'|'ignore'; climateClash: 'warn'|'ignore'; northDiffers: 'warn'|'ignore';
  seamPrecedence: 'newer'|'older'|'dm' /* equal rungs: which wins on a shared stretch (the newer by default; 'dm' reads each member's `z`) */;
  commonWeek: boolean /* the common-week display on (default false: each member at its own present, F14) */; missing: 'ghost'|'blank' /* how a missing member's gap is drawn (V15 §4.5) */ }
type EmbellishmentKind = 'seaSerpent'|'whale'|'dragon'|'monstrousPeople'|'devils'|'ruinVignette'|'skull'|'banners'|'siege'|'idolFallen'|'cityVignette'|'cathedral'|'cartouche'|'compassRose'|'ship';
interface Embellishment {
  id: Id; kind: EmbellishmentKind; at: AtlasPointCm /* on the TRUE plane: drawn through the viewpoint's warp */; sizeCm: Cm /* its drawn size on the true plane; the preset's rows scale it */; facing: Cdeg;
  source: 'derived'|'dm'; derivedFrom?: { rule: RuleRef; facts: { field: string; value: number | string }[] /* the port fields and the member readings the rule read, by V13's field names — never a culture's or a people's name (V15 §3.6 (5)) */ };
  hidden?: boolean /* a derived figure the DM removed: kept so the derivation does not re-add it */; viewpoint: Id; week: Week; member?: Id /* the member whose facts placed it */;
  caption?: NameRef /* the preset's lettering, e.g. "here be serpents"; a vignette's event word */; lifecycle: Lifecycle; reason: Id }
interface ContinuationRequest {
  id: Id; void: { region: AtlasPointCm[] /* the void's rectangle on the atlas plane */; rung: WorldSizeRung; extentCm: { w: AtlasCm; h: AtlasCm } /* the rung's extent, or the void's where it is smaller (clamped to V13's band, W_WORLD_RECIPE_CLAMPED) */ };
  edges: { side: 'N'|'E'|'S'|'W' /* the void's side */; neighbour: Id; neighbourSide: 'N'|'E'|'S'|'W'; span: { fromCm: AtlasCm; toCm: AtlasCm } /* the shared stretch along the side */; charter: Id /* the carried WorldEdgeCharter */; neighbourVersion: MemberVersion; locked: boolean /* true unless the neighbour could give no charter (W_ATLAS_EDGE_UNLOCKED) */ }[];
  prefill: { climateBand?: string; wetness?: number; ruggedness?: number; seaShare?: number; latBox?: { southDeg; northDeg }; poles?: { equatorDeciC: DeciC; poleDeciC: DeciC }; calendarSouth?: boolean; scenario?: string } /* the world dialog's basics pre-filled from the neighbours' charters (V15 §3.4 (4)); never a recipe's template (a record, not ground); each still `random` / `set` / `locked` in the dialog as the user leaves it */;
  contradictions: { a: Id; b: Id; fact: 'sea'|'elevation'|'climate'|'latitude'|'river'|'bedrock' /* the field that disagrees at the void's corner or across it */; detail: string; proposal: 'sea'|'strait'|'range'|'rift'|'escarpment' /* the reconciling feature offered as an extra requirement — V13's `landform` feature words (file r item 1007 (a)); the chip's label may say "a mountain belt" */; accepted?: boolean }[];
  conflicts: { neighbour: Id; change: string /* the neighbour's change a requirement would need; shown in V13's conflict list on that neighbour's page */; decided?: 'dropped'|'neighbourEdited' }[];
  status: 'drafted'|'sent'|'generated'|'cancelled'; member?: Id /* the member the generated world became */; lifecycle: Lifecycle; reason: Id }
interface FitRecord { child: Id; parent: Id; mode: 'derivedFromParent'|'imageOnly'|'fitted';
  placement?: Id /* mode 'fitted': the parent world's Placement of the child (V13's rung-general form, RQ-V15-3), by its id in the parent */;
  conflicts: { list: Id /* the parent's conflict-list record (V13's), by id */; decided: string[] }[] /* what the user chose on the parent's page */;
  parentVersionBefore: MemberVersion; parentVersionAfter?: MemberVersion /* the geometry version step the fit caused; the parent re-rendered */;
  mismatch?: DriftReading /* mode 'imageOnly': where the two disagree, computed once at the fit (W_ATLAS_MISMATCH) */; since: { seq: number } }
interface MemberImagery {                      // Document.atlasImagery[]: a cache per (member, audience), OUTSIDE every digest (BCR-V15-2)
  member: Id; audience: 'dm'|'party'|'public'; version: MemberVersion; week: Week /* the member's present, or the common week where below it */;
  header: WorldHeader; stops: { stop: 0|1|2 /* the V13 stop cached: 0 and 1 always, 2 on `pinImagery` (J-V15.7) */; pxPerCell: number; cols: number; rows: number; tiles: ChunkRef[] /* 256 px tiles, lossy-coded (V15 §2.11), row-major */; labels: { box: [Px, Px, Px, Px]; text: string; kind: string; priority: number }[] /* the placed label boxes at the stop, in the member's pixel frame */ }[];
  known?: { audience: 'dm'|'public'|`party:${string}`; cells: Uint32Array /* the member's COARSE cells this audience's places have reached, as `RenderedWorld.known` returned them (amendments r) */ }[];
  stale: boolean /* the member's live version differs: shown with the stale mark until refreshed (V15 §4.6) */; renderer: string }
```

The frame's side and the world's side of the base are untouched by an atlas: a world document carries no reference to
any atlas (J-V15.4; no back-reference exists, so membership moves no world digest — T-V15-1 (c)); an atlas opened in a
session resolves each member by `world.doc` through the local store (V09 §2.11) or `world.ref` through the embedding
app's `DocResolver` (§11.5), opens it **read-only** in the generation worker for `renderAt`, `edgeCharter` and the lens
readings, and never holds a write handle to it. **Knowledge on atlas records:** every record above carries `knownTo` as
§9.2 reads it, default `public` for an arrangement, a gap, a viewpoint's existence and a DM-placed embellishment the DM
marks shown, `secret` for a relation (a DM diagnostic), a drift reading, a hidden embellishment and the DM's viewpoints
not marked shared; a member's imagery is admitted per audience by its own picture (V15 §5.4).

### 2.3 The described relations (the vocabulary F12 asks for, as requirements)

A relation is "a *kind* b" with at most one measure. Each becomes one or more **requirements** for V13's `solve`
(amendments r's `Requirement` record: `source: 'relation'`, `rank` 3 — the user's generation requests on the
precedence ladder, spine §5.1 —, the relation's `strength`, `kind: 'relation'` with the atlas-scale word of this table
as the target's `word` (`atlas.arrange.kinds` lists the words), the member ids and the measure in `target`, no `scope`
(the arrangement state is the whole atlas, file r item 1007); the compatibility checks of V15 §3.1 (4) are kinds `latBox` and `climateRow` at rank 4). The
solver holds every `locked` requirement and every locked arrangement, pursues every `set` one, changes the existing
arrangement as little as possible (least-change: the sum of members' displacements in km, weighted by their extent),
keeps physical plausibility (the compatibility requirements of V15 §3.1 (4), rank 4) and lets the layout preset's
packing fill the rest (rank 5).

| kind | the sentence (the relations box's chips; the clerk's parse) | the requirement(s) it becomes | default measure (`atlas.arrange`) |
|---|---|---|---|
| `eastOf` (and `westOf`, `northOf`, `southOf`) | "Varn lies east of Ashmark" | `relPosition`: b's extent centre lies within ±`sectorHalfDeg` (30°) of the compass direction from a's centre; `noOverlap`: the extents do not overlap (soft: a warning when they must) | — |
| `acrossSea` | "Varn lies east of Ashmark across a narrow sea" (always with a direction; the width word maps narrow · wide · open to a cell) | `relPosition` as above; `gapBetween`: the facing edges `widthKm` apart (`seaNarrowKm` 60, `seaWideKm` 250, `seaOpenKm` 800 by the word); `gapKind`: the space between them a `sea` gap style (written as a `GapStyle { between }` when the user accepts the solve) | the word's cell |
| `inside` | "Thornwood sits inside Ashmark" | `contains`: b's extent wholly inside a's (b the finer rung: a province in a realm, a realm in a continent); `parent` written on b; the nested seam's treatment follows (V15 §3.3 (4)); a coarser b inside a finer a is unmet, warned | — |
| `farFrom` | "Kesh lies far from Ashmark" | `minDistance`: the least distance between the extents ≥ `widthKm` (`farKm` 600); no direction | `farKm` |
| `adjacent` | "Varn borders Ashmark on the east" | `touch`: b's facing edge coincides with a's named side over a shared stretch ≥ `adjacentMinShareKm` (40); `northAgrees`: both bearings 0 (else `W_ATLAS_NORTH_DIFFERS`); the compatibility requirements of V15 §3.1 (4) evaluated on the stretch; the seam softened; a continuation between them later reads this stretch | — |
| `beyondUnknown` | "Kesh lies far to the south beyond unknown lands" (a direction plus the unknown) | `relPosition`; `minDistance` ≥ `beyondKm` (900); `gapKind` `terraIncognita` between (the gap written on accept) | `beyondKm` |

A relation never names a settlement, a river or a coast — those are a member's own facts, isolated by F14; a user who
wants "the river of Varn to flow into Ashmark" is asking for a continuation (V15 §3.4) or a fit (V15 §3.5), and the
relations box says so (`info.atlas.relation.insideOnly`). Two relations that contradict ("Varn east of Ashmark", "Varn
west of Ashmark") are both kept and both reported unmet; the solver takes the later one as `set` and the earlier as a
warning, never a refusal (spine §10.3). The clerk's parse of a typed sentence (V10's `propose` route, RQ-V15-8) yields
the chips the user confirms; the sentence is kept in `text`.

### 2.4 New rule tables (data, editable by `editTable`, §7.6; every cell `{value, unit, provenance, calibratable}`)

Every value below is **our own** (provenance `own`, `extension`), PLAUSIBLE until measured (V15 §12), calibratable
against the owner's sittings and V12's register when its milestone comes (§13.9; V15 §8), save the cells marked
*fixed* (a tile size, a grid order), which are not calibratable. Where a value leans on the science note's figures the
note names its section as evidence (research/world/formation-ecology-science.md §9–§10), never as a source of the
number; every number is this volume's. The tables join V11's registry as new rows (`atlas.*`; V11 §3.1's next free row
numbers, assigned at M-ATLAS-A's landing; RQ-V15-9).

```ts
interface ArrangeRule {                                                                              // atlas.arrange — A1
  kinds: string[] /* the atlas-scale requirement kinds registered with V13's solver as data: relPosition, noOverlap, gapBetween, gapKind, contains, minDistance, touch, northAgrees, latitudeContinuous, climateCompatible (V15 §2.3, §3.1) */;
  sectorHalfDeg: number /* 30 */; seaNarrowKm: number /* 60 */; seaWideKm: number /* 250 */; seaOpenKm: number /* 800 */; farKm: number /* 600 */; beyondKm: number /* 900 */; adjacentMinShareKm: number /* 40 */;
  snapEdgeKm: number /* 8: a dragged edge snaps to a neighbour's edge within it */; rotateSnapCdeg: Cdeg /* 9 000: the rotation handle snaps to right angles; free rotation on the modifier */;
  latitudeToleranceDeg: number /* 2: neighbours' latitude boxes continue within it (V15 §3.1 (4)) */; climateBandTolerance: number /* 1: `world.biomes` rows apart at a shared stretch before W_ATLAS_CLIMATE — adjacency as V13 §3.11's `biome` term reads it (one class apart) */;
  contradictions: ContradictionRow[] /* V15 §3.4 (5)'s table: a fact pair at a void's corner or across it → the reconciling feature and its placement rule */;
  leastChange: { weightByExtent: boolean /* true: a continent moves last */; maxIterations: number /* 200 */ }; maxMembers: number /* 64 */;
  presets: { clustered: { gapKm: number /* 0 */; order: 'rungDesc' }; archipelago: { gapKm: number /* 120 */; gapKind: 'sea' }; scattered: { gapKm: number /* 400 */; gapKind: 'terraIncognita' } } }
interface ContradictionRow { facts: ['sea'|'elevation'|'climate'|'latitude'|'river'|'bedrock', 'sea'|'elevation'|'climate'|'latitude'|'river'|'bedrock']; threshold: number /* the step that counts: metres, classes (V13 §3.11's `biome` term's adjacency), degrees, m³/s, a bedrock class */;
  proposal: 'sea'|'strait'|'range'|'rift'|'escarpment' /* V13's `landform` feature words */; place: 'corner'|'acrossWind'|'between'|'alongStep' /* where the feature's sketch requirement is laid in the void */ }   // atlas.arrange.contradictions (V15 §3.4 (5))
interface SeamRule {                                                                                 // atlas.seams — A2, A3, A5, A7
  tilePx: number /* 256; fixed */; pyramidBaseKm: number /* 4 194.304 (2^22 m): the level-0 tile's side; fixed */; maxLevel: number /* 11: 8 m per pixel, finer than any member's stop 3 (a province's 250 m cell at 16 px is 15.6 m per pixel) */;
  cacheStops: (0|1|2)[] /* [0, 1]: the V13 stops cached per member; 2 on pinImagery only (J-V15.7) */; lossyQuality: number /* 85: the cached tiles' codec quality */;
  bandPx: number /* 24: the softening band's width in pixels at every level, along the shared stretch only */; bandMaxShareOfStretch: number /* 0.5 */;
  easeAboveStep: number /* 1: a detail step of one rung is eased over the band */; insetAboveStep: number /* 2: two rungs or more becomes an inset with a frame (AtlasStyleState.insets) */; insetFramePx: number /* 1.5 */; locatorBoxPx: number /* 1 */;
  gapFills: Record<GapStyle['kind'], string /* a style row key: the sea tint and wave hatching, the strait's double shore, the mountain hachure, the mist gradient, the terra incognita parchment and lettering, blank */>; missingGhostAlpha: number /* 0.4 */;
  fit: { marginCells: number /* 8 parent coarse cells around the child's extent */ } /* the blend band is V13's and no cell of this volume's: `place.coherence.blendBandM` scaled by the parent's cell ratio (4 000 m under a 500 m realm, 8 000 m under a continent; file r item 942) */;
  drift: { coastShiftM: number /* 1 000 */; riverMissed: number /* 1 */; elevationRmsCm: number /* 5 000 */; biomeDisagreePct: number /* 20 */ } /* a marker shows above any threshold (V15 §3.3 (3)) */;
  labelSpreadPx: number /* 12 (the base's §9 margin) */; drill: { pastStop: number /* 3: zooming finer than the member's stop 3 opens it */; shareOfView: number /* 0.5: a member filling this share of the view at its stop 3 opens on the next zoom step */ } }
interface AtlasStyleRule {                                                                           // atlas.style — A6
  warpGrid: number /* 512: the cartogram grid's side (cells over the known world's bounding square); fixed per bake */; flowSteps: number /* 64: the integration steps from the true map to the full warp */; warpMaxMs: number /* 8 000: the bake's work cut, then W_ATLAS_WARP_FALLBACK */;
  magnifyMax: number /* 2.5: the centre magnification at the slider's end */; unknownBlurPx: [number, number] /* [2, 12]: the blur's radius from the known edge outward at level 6 */; heardOfBands: number /* 1 */;
  known: { travelWeeks: number /* 4: a culture knows what lies within this many weeks on foot of its seats, along routes */; heardOfWeeks: number /* 8 */; tradeKnows: boolean /* true: a trade channel's far end is known */ };
  itinerary: { sideKm: number /* 120: a point farther from the route than this fades to the strip's margin */; stationMinKm: number /* 20: stations closer than this merge on the spine */ };
  importance: { tier: Record<Rung, number> /* thorp 1, hamlet 1.3, village 1.8, town 3, city 6, metropolis 10 */; tradeExp: number /* 0.5: (1 + centrality + exports/4)^tradeExp */; holiness: number /* 3: a faith place's or the patron seat's multiplier */; prosperityPerRung: number /* 0.15 per rung above the realm's median */; capital: number /* 2 */; centreMass: number /* 4: the centre's own multiplier */ };
  density: { land: number /* 1 */; sea: number /* 0.35 */; sailedSea: number /* 0.8 */; unknown: number /* 0.25 */; heardOf: number /* 0.6 */; floor: number /* 0.1 */ } /* the target density's base per cell class before the seats' mass */;
  presets: StylePresetRow[] /* V15 §2.5 */ }
interface StylePresetRow { id: string; label: MsgRef; orientation: Viewpoint['orientation']; centreRule: Viewpoint['centre']['rule'];
  relationalDefault: number /* the slider's rest position the preset proposes */; areaScaling: number /* 0–1: how much of the cartogram's warp applies at the slider's end */; magnify: number /* the centre magnification at the end, ≤ magnifyMax */;
  coasts: 'true'|'warped'; interiors: 'drawn'|'blank' /* the portolan's blank interior beyond the coast */; unknown: 'blank'|'legend'|'monsters';
  figures: string[] /* the FigureRow ids the preset admits */; lettering: { face: string /* a bundled label face (§8.2, §17.2) */; smallCaps: boolean; numerals: 'arabic'|'roman'|'oldStyle' };
  furniture: { rhumbLines?: { roses: number /* 16 on a circle plus the centre */; directions: number /* 32 */ }; toRim?: boolean; compassRose: boolean; scaleBar: boolean /* always true: the true scale bar is never hidden (J-V15.15) */; itinerary?: { unit: 'days'; straighten: boolean; vignettes: boolean } };
  ports: { red: boolean }; labels: { perpendicularToCoast: boolean }; vignettes: { byTier: boolean; minTier: Rung } }
interface EmbellishRule {                                                                            // atlas.embellish — A6 (5)
  seaSerpent: { minDepthM: number /* 1 000 */; farFromRouteKm: number /* 150 */; stormFactorMin: number /* 2.0: the quarter's storm factor at or above it marks a sea storm-feared */; per1000Km2: number /* 0.3 */; maxPerBody: number /* 3 */ };
  whale: { minDepthM: number /* 400 */; per1000Km2: number /* 0.2 */; maxPerBody: number /* 2 */ };
  dragon: { bandKm: [number, number] /* [50, 150] beyond the known edge */; perBandSegmentKm: number /* 1 per 600 km of edge */ };
  monstrousPeople: { cultureBandMin: 0|1|2|3|4|5 /* 4 */; farKm: number /* 800 from the culture's nearest seat */; minLandKm2: number /* 20 000 */; perRegion: number /* 1 */ };
  devils: { enemyFaith: 'patronDiffersAndContested' /* the holder's patron differs from the mapmaker's and the religion lens marks the seat contested or on a historic front */; atWar: boolean /* true: a land at war with the mapmaker's allegiance */; perRegion: number /* 1 */ };
  vignetteWeeks: number /* 104: a dated event within it of the viewpoint's week draws its vignette */; events: Record<'plague'|'battle'|'siege'|'raid'|'razing'|'patronFall'|'boom'|'bust', EmbellishmentKind | null> /* plague → skull, battle and raid → banners, siege → siege, razing → ruinVignette, patronFall → idolFallen, boom and bust → null */;
  city: { minTier: Rung /* town */; sizeExp: number /* 0.5: the vignette's size ∝ importance^sizeExp */; cathedralAtHolyCity: boolean /* true */ };
  blocklist: string /* the shipped list of real-world ethnonyms, demonyms, faith names and region names the lint T-V15-6 reads: no FigureRow, caption or catalogue string of this volume may match it */;
  figures: FigureRow[] }
interface FigureRow { id: string; kind: EmbellishmentKind; preset: string | '*'; trait: 'deepWater'|'storm'|'unsailed'|'knowledgeEdge'|'hostile'|'far'|'enemyFaith'|'event'|'city'|'holyCity'|'furniture' /* the ONLY key a figure is chosen by, beside the preset: never a culture's, a people's or a faith's name */;
  asset: string /* the symbol catalogue's glyph id (V11; the shipped minimal set is line art, the art library the owner's, V15 §11 Q3) */; sizeCm: Cm /* on the true plane at level 6 */; caption?: MsgRef /* "here be serpents" in the preset's lettering; the catalogue's text, lint-checked */ }
```

**Shipped cells** (the values in the comments above; V12's register holds one line per calibratable cell at
M-ATLAS-A's exit): the relation measures of V15 §2.3; the softening band 24 px (the science note §10.2: a Laplacian
pyramid blend hides a seam at every scale; the width is ours); the inset rule at two rungs (a province inside a
continent is 4 × finer per axis: eased, it would smear 16 cells of the parent per child cell; framed, it reads as an
inset — the printed-atlas convention, the science note §10.2); the cached stops 0 and 1 (J-V15.7; V15 §6); the fit's
margin (the band itself is V13's: `blendBandM` × the parent's cell ratio, file r item 942 — 8 cells of a 500 m parent are
4 000 m); the drift thresholds; the warp grid 512 (the science note §9.2: seconds at 512–1 024); the importance
exponents and the density classes (the mappa mundi's swollen Holy Land and squeezed rim are the effect to reach, the
science note §9.1; the numbers ours); the embellishment thresholds (deep, unsailed, storm-feared water — Van Duzer's
functions of sea monsters as the science note §9.1 cites them: danger and the open sea; the numbers ours); the contradiction rows (a sea edge meeting an edge above 1 000 m at a corner → a strait at the corner; a wet edge facing a dry one within 400 km → a `range` (a mountain belt) across the wind; two inflowing rivers and no outlet → a sea between them; a bedrock class step → a rift along it; a plateau meeting a plain with 800 m or more between → an escarpment along the step).

### 2.5 The style presets (rows of `atlas.style.presets`; each a `StylePresetRow`)

| id | orientation | centre | areaScaling · magnify · rest | coasts · interiors · unknown | figures admitted (by trait) | lettering and furniture | what it is for |
|---|---|---|---|---|---|---|---|
| `true` | northUp | — (no centre: the warp is the identity) | 0 · 1 · 0 | true · drawn · blank | none (the DM's own only) | the base's label faces; the scale bar, the compass, the grid | the game master's working map; every player view's default; every export's measurement (J-V15.15) |
| `mappaMundi` | eastUp (the preset's default; a viewpoint may override) | holyCity, else capital | 1 · 2.5 · 0.8 | warped · drawn · monsters | deepWater, storm, unsailed, knowledgeEdge, hostile, far, enemyFaith, event, city, holyCity | small capitals in the bundled uncial-like face, roman numerals; a T-O rim when the known world is one landmass round one sea (`toRim`), no rhumb lines, the holy city's cathedral vignette, unknown lands filled with figures and legend ("here are monsters"), the scale bar kept small in a corner | the sacred map (the science note §9.1's Hereford and Ebstorf conventions as evidence: east up, the centre, importance scaling, monstrous races along the rim) |
| `portolan` | northUp | mapmakerSeat (a home port) | 0.15 · 1.2 · 0.5 | true · blank · blank | deepWater (ships, not serpents), storm, furniture (roses) | names perpendicular to the coast, important ports in red, a network of rhumb lines from 16 roses on a circle in 32 directions, a scale bar; interiors blank beyond the known coast | the practical sea chart: true coasts, decorated seas, empty interiors (the science note §9.1's portolan conventions) |
| `itinerary` | towardCentre (the strip's start at the bottom) | mapmakerSeat (the journey's start) | 1 (along the route only) · 1 · 1 | warped · drawn · blank | event, city | the chosen route straightened into a vertical strip, towns as vignettes graded by tier, the days between stations written in the preset's numerals, side roads as stubs, seas as strips; a distance cartogram along the route (V15 §3.6 (1) (c)) | the pilgrim's strip (the science note §9.1's Paris and Peutinger conventions: sequence and labelled distances true, shape not) |

A preset is data: a fourth row (a "sea-people's chart", a "cosmological wheel") is added by `editTable` with its
figures and furniture, no code. The `true` preset is the one every atlas opens in and the one every measurement reads;
the relational presets are presentation over it.

### 2.6 Derived transients (never persisted)

```ts
interface SeamRecord { a: Id; b: Id; kind: 'sideBySide'|'nested'|'overlap'; stretch: { from: AtlasPointCm; to: AtlasPointCm } /* the shared edge's overlap, or the overlap polygon's boundary for 'overlap' */; sideA: 'N'|'E'|'S'|'W'; sideB: 'N'|'E'|'S'|'W';
  detailStep: number /* |rung(a) − rung(b)| in rungs */; wins: Id /* the more detailed member; equal rungs by ConflictSettings.seamPrecedence */; treatment: 'soften'|'ease'|'inset'|'unknownBetween'; bandPx: number; drift?: DriftReading; reason: Id }
interface DriftReading { seam: [Id, Id]; versions: [MemberVersion, MemberVersion]; coastShiftM: number /* the greatest distance between the two charters' coast crossings on the stretch */; riversMissed: number /* crossings on one side with no match on the other within riverMatchM */;
  elevationRmsCm: number /* the two edge profiles' RMS difference */; biomeDisagreePct: number /* the stretch's length share where the potential-vegetation classes differ by more than one class (V13 §3.11's `biome` term's adjacency) */; above: boolean /* any threshold crossed */ }
interface InsetLayout { member: Id; frame: AtlasPointCm[] /* the thin frame on the true plane */; locator: { onMember: Id; box: AtlasPointCm[] } }
interface WarpField { key: Hash128 /* H128(atlas model digest ‖ viewpoint ‖ week ‖ preset ‖ grid) */; grid: { origin: AtlasPointCm; cellCm: Cm; n: number }; displacement: Int32Array /* per grid vertex (dx, dy) in cm at the full warp (t = 1); the slider's fraction integrates the flow to t = s, cached per step of 1/flowSteps */;
  centre: AtlasPointCm; magnify: number; orientationCdeg: Cdeg; jacobianMin: number /* the smallest determinant over the grid at t = 1: > 0 or the bake failed (T-V15-5) */; bakedMs: number }
interface KnownRegion { viewpoint: Id; week: Week; cells: Uint8Array /* over the warp grid: 0 unknown, 1 heard of, 2 known */; knownSeats: string[]; source: 'audience'|'culture'|'everything' }
interface TrueReadout { at: AtlasPointCm; member?: Id; worldPoint?: WorldPointCm; distanceKm?: { to: 'centre'|'pin'; km: number }; travel?: { weeks: number; days: number; law: string /* the law's version and basis, labelled */; mode: 'foot'; note: 'on foot' | 'the host's leg' } /* only when both points lie in one member and a route joins them (V15 §3.6 (3)) */ }
interface DrillTarget { member: Id; worldPoint: WorldPointCm; stop: 0|1|2|3 }
```

Each is total over its inputs: a seam with no shared stretch is not a record; a drift over a member that gives no
charter reads `above: false` with every figure 0 and the reason `noCharter`; a warp whose bake was cut reads the
fisheye-only field (`W_ATLAS_WARP_FALLBACK`); a known region of audience `dm` is all 2; a readout off every member
carries the true point and the distance alone. Tested by T-V15-17 (a).

### 2.7 View state (never in any digest)

Per viewer (§2.9; BCR-V15-3): `atlasZoom` (metres per pixel, continuous; default the zoom that fits every member),
`atlasCentre` (an `AtlasPointCm`), `relational` (0–1, default the atlas's `style.relational`; the slider), `viewpoint`
(a `Viewpoint` id; default the atlas's "the game master's" for the DM, "the party's" for a player), `commonWeek` (a
`Week` or null; null is each member at its own present; the toggle writes the newest member's present), `showDrift`
(DM-only, default false), `showRelations` (DM-only, default false), `atlasPreset` (a preset choice; default the
viewpoint's), `pinnedPoint` (the ruler's first end, or null). The base's `knowledge`, `viewAs`, `worldUnits`,
`rotation` (the map's own rotation about the view centre), `compass`, the grid, legend and emblem keys apply unchanged.
The atlas's week does not exist; a member's `week`, `lensWeek` and `surfaceDate` are never written by the atlas
(`renderAt` takes a week argument, V15 §1b.6).

### 2.8 Reason records (V13's; this volume's writers)

Every record and every derived set carries V13 §2.2's `ReasonRecord`, declared there once and cited here: A1 writes one
per arrangement a solve changed (the requirements it served, the displacement, the rule); A3 one per seam (the
stretch, the step, the winner, the treatment, the rule) and one per drift reading; A4 one per edge (the neighbour, the
side, the span, the charter's version) and one per contradiction (the two facts, the proposal); A5 one per fit (the
mode, the parent's placement id, the conflicts decided); A6 one per warp bake (the viewpoint, the centre resolved and
why, the importance's top ten seats with their terms, the known region's source) and one per derived embellishment
(the rule, the facts by field name); A7 none (a view action). Each is persisted in the entities block outside the model
digest and inside the records digest (V13 §2.7's rule); a derived set's records live in `derived` with it and are
rebuilt with it. The clerk's `why` over an embellishment answers "a serpent here because the sea is 1 400 m deep, no
route within 180 km, the autumn storm factor 2.5 — the mapmaker's fear, not the realm's fact" (V15 §4.8).

### 2.9 Identity: lineage units and creation keys (item 140 M1's pattern; V13 §2.5's table extended)

The atlas's namespace segment is its own (`Document.namespace`, V13 §2.5): a member's addresses are never rewritten,
and a reference from an atlas record into a member (a charter's neighbour, a fit's placement, an embellishment's
`member`) is written whole with the member's namespace. Two atlases holding one world collide on nothing: each holds
the world's `docId` and namespace, never an address of its own inside it.

| entity | parent | creation key |
|---|---|---|
| the atlas root | — | (`atlas`, the recipe's seed) — the atlas's town-root equivalent; the `atlas.*` streams key from it |
| a `Member` | the atlas root | (`member`, the world's `docId`) — a world is a member of an atlas once (`refuse.atlas.duplicate`); re-adding a removed world finds its tombstone and revives it |
| an `Arrangement` | its member | (the member's lineage) — one per member, an attribute set, never a record of its own |
| a `Relation` | the atlas root | (`relation`, the kind, a's lineage, b's lineage) — a second relation of one kind between one pair replaces the first (a tombstone with `supersedes`) |
| a `GapStyle` | the atlas root | (`gap`, `between` the two lineages sorted, or `around` the lineage and side, or the ring's first vertex, or `everywhereElse`) |
| a `Viewpoint` | the atlas root | (`viewpoint`, the audience, the culture's member lineage and id or `none`, its ordinal) |
| an `Embellishment` (the DM's, and a hidden mark) | its viewpoint | (`embellish`, the viewpoint's lineage, the kind, the true point's warp-grid cell) — a derived figure's identity is the same key, so the DM's hidden mark finds it across bakes |
| a `ContinuationRequest` | the atlas root | (`continuation`, the void's south-west corner, the rung) |
| a carried `WorldEdgeCharter` | its request | (`edgeCharter`, the neighbour's lineage, the side, the neighbour's `geometryVersion`) — a new charter per neighbour version |
| a `FitRecord` | the child member | (`fit`, the child's lineage, the parent's lineage) |
| a `SeamRecord`, `DriftReading` (derived) | the atlas root | (`seam`, the two lineages sorted) |
| a `WarpField` (derived) | its viewpoint | (`warp`, the field's key hash) |
| a `ReasonRecord` | the fact it explains | V13 §2.5's rule |

Two entities whose keys collide take §6.3's ordinal suffix; anchors for §6.3's matching table: a member by its world's
`docId`; a relation by its kind and pair; a gap by its `between` pair or its ring's centroid within one tile; a
viewpoint by audience and culture. Tested by T-V15-17 (b).

### 2.10 The lifecycle of every state field this volume adds or gives a producer

| field | create | read | persist | regenerate | undo | migrate |
|---|---|---|---|---|---|---|
| `Recipe.atlas` (seed, style, conflicts, layoutPreset, snapshot) | the atlas's creation; `setAtlasStyle`, `setConflictSettings`, `setLayoutPreset` | every stage; the view | the recipe | a re-run of A1–A3 reads it | the inverse | the schema versioned; an unknown preset reads `true` and is reported |
| `Member` (the reference, `version`, `rung`, `header`, `latBox`, `presentWeek`, `dateLabel`, `origin`, `continuedFrom`, `parent`, `fit`, `shareable`, `name`) | `addMember` (the reference and the readings at add); a continuation's generation (`origin: 'continued'`, `continuedFrom`); `fitChild` (`fit`, `parent`); `refreshImagery` writes `version`, `header`, `presentWeek`, `dateLabel` as **recorded readings** (a cache command's write of a derived reading: outside the model digest, V15 §2.11) | A1–A7; the member list; the exports | the entities block | the reference is an input: kept by every re-run; the readings re-read at every refresh | `removeMember`'s tombstone and its restore | a member whose world's `outputVersion` lies outside the retention window (§7.5) keeps its imagery and reads `unopenable` (V15 §4.9) |
| `Member.state` (derived) | the open-time check (resolve → compare the version → `present` / `missing` / `unopenable`) | the member list, the gap mark, A7 | never (re-derived at every open) | — | — | — |
| `Arrangement` | `addMember` (the drop point, or the preset's slot), `arrangeMember`, `lockMember`, A1's solve, `setLayoutPreset`, a continuation (the void's position, locked) | A2, A3, A4, A6, A7, the exports | on the member | an input: kept; a solve rewrites the unlocked ones (`by: 'solved'`) | the former arrangement; a solve's undo restores every arrangement it moved as one group | — |
| `Relation` | `relate`; the clerk's parse confirmed | A1; the relations box; the DM diagnostic lines | the entities block | an input: kept; re-solved on request | `unrelate`'s tombstone and its restore | — |
| `GapStyle` | `setGapStyle`; a preset; a solve's accepted `gapKind`; a removed member's gap (`blank`, V15 §4.5) | A3, A6, the legend, the exports | the entities block | kept | the inverse | — |
| `Viewpoint` | `setViewpoint`; the two shipped defaults at creation | A2's audience, A6, the player view, the exports' request | the entities block | kept | the inverse | an older atlas without viewpoints gains the two defaults at load, reported |
| `Embellishment` (`source: 'dm'`) and the `hidden` marks | `setEmbellishment` | the embellishment layer, the exports, the clerk | the entities block | kept through every bake (the DM's word over the derivation) | the inverse | — |
| `Embellishment` (`source: 'derived'`) | A6's `embellish` at draw, keyed draws | the layer, the clerk | `derived` (never canonical) | re-derived at every bake | not an event | — |
| `ContinuationRequest` and its carried `WorldEdgeCharter`s | `requestContinuation` (`draft` writes the request and the charters as recorded inputs; `send` hands the request to V13's generator through V09's dialog; the generated world's add writes `member` and `status: 'generated'`) | A4, the dialog, the clerk, the new member's provenance | the entities block; the charters in the records digest (V15 §2.11) | an input: kept; a re-draft after a neighbour's refresh writes a new request with new charters, the old superseded | a draft's or a cancellation's tombstone; a generated one kept | the charter schema's version (V13's); an older charter version reads through V13's migration chain |
| `FitRecord` | `fitChild` after the parent's edit committed (or the derived child's generation, or the image-only choice) | A3, A5, the member list, the clerk | the entities block | kept | the atlas's record alone (the parent's own undo is the parent's) | — |
| `MemberImagery` | A2 (`renderMember`); `refreshImagery`; `pinImagery` (a third stop) | A3, A6, the view, the exports, the share writer | `Document.atlasImagery` (BCR-V15-2): outside every digest, kept across loads and saves, dropped by `pinImagery(keepStops: [])`, by a quota or by the user; rebuilt when the member is openable | re-rendered when stale (V15 §4.6) or on the common-week change; never re-fitted | not an event (a cache) | absent: rendered on open; a member unopenable and uncached draws its gap with `W_ATLAS_DETAIL_UNAVAILABLE` |
| `SeamRecord`, `DriftReading`, `InsetLayout`, `KnownRegion`, `WarpField` | A3, A6 | the compositor, the markers, the readout, the drill | `derived` (the warp's field kept across a session as `elaborations` is, never canonical) | re-derived when their inputs' digests change | not events | — |
| the view keys of V15 §2.7 | V09's controls | the view, the exports' request | the viewer's view state, never a digest | view only | not events | absent: the defaults |

### 2.11 The version table, the digests and the storage of the atlas

**The version table** is `AtlasRecipe.snapshot`: the atlas generator's output version (§6.4's axis), the file schema,
the four `atlas.*` table versions read, and `renderer` — the member renderer's output version (V13's) the imagery was
made under, so a renderer change marks every cached picture stale without touching the atlas's digests. Every member's
`version` names the member's own versions (V13 §2.7's table through its digests, `logHead`, `geometryVersion` and
`outputVersion`), so an atlas names every version it depends on (item 140 K10) and a diff at load says exactly which
member moved. The carried `WorldEdgeCharter`s carry V13's charter schema version and migrate by V13's chain.

**The model digest** (§6.2) of an atlas hashes `Recipe.atlas` — the seed, the members' declared fields (the reference,
`rung`, `latBox`, `arrangement`, `origin`, `continuedFrom`, `parent`, `fit`, `shareable`, `name`; **not** `version`,
`header`, `presentWeek`, `dateLabel`, which are recorded readings of a cache command, and not `state`), the relations,
the gaps, the viewpoints, the style and conflict settings, and the DM's embellishments with the hidden marks — in schema
order. **The records digest** holds the reason records, the continuation requests with their carried charters (recorded
inputs, as a frame's charter is, V13 §2.7) and the fit records. **In no digest:** the imagery cache, the seams, the
drift readings, the inset layouts, the known regions, the warp fields, the derived embellishments, every view key.
Consequences: a refresh of a member's imagery moves no atlas digest (T-V15-9 (c)); a member's own edit moves no atlas
digest and no other member's (T-V15-1); a bake moves nothing; only the user's atlas edits move the model digest. **A
member's digests never move because of an atlas** (T-V15-1 (c)): no field of any world document names an atlas.

**Storage.** An atlas is a `.plat` container (§2.9) of product `atlas` whose `entities` block holds the records (a
64-member atlas ≤ 1 MB with its reason records and charters) and whose `atlasImagery` cache holds the tiles — 256 px,
lossy-coded at `lossyQuality` 85 (a relief-and-water picture at stops 0 and 1; PLAUSIBLE ≈ 0.4–0.6 B per pixel): a
province member ≤ 1 MB, a realm ≤ 4 MB, a continent ≤ 10 MB per audience, a pinned stop 2 sixteen times its stop 1 (4 × per axis)
(`ATLAS-6`). An atlas of sixteen realm members with a party picture on half of them ≈ 64 + 32 MB of cache beside 1 MB
of records; *pre-decided fallback:* the cache is dropped from the file by a quota (the host's or the local store's)
and rebuilt on open from the members that are openable, the others drawing their gap until a refresh succeeds —
losing only pictures (V15 §4.9). **Where an atlas is stored:** in the standalone application the local store (V09
§2.11's `LocalDocRecord`, its `rung` `atlas`), listed under "Open a world map…" (RQ-V15-7); in host mode the host's
own store beside its per-campaign world records — an atlas spans campaigns, so it is a **per-user** record, which the
host does not have (the state note's Part D: one map per campaign, no atlas) and is asked for as H35 (V15 §10.2); until
it lands an atlas in host mode is saved as a file through the share sheet's **Download** (V09 §5.11) and reopened from
it. **A shared atlas** (V15 §5.5) is the same container written by the share writer with every unshareable member's
`world.ref` and imagery removed (its `state` reads `unopenable`, its gap marked "not shared") and every shareable
member's imagery embedded at the stops cached, flagged read-only (`shared: true` in the header): the recipient sees
pictures, arrangement and viewpoints and can drill into no member it cannot resolve.

## 3 Generation

### 3.0 The atlas pipeline: registration, order, the materializer contract

The atlas is a product (`ProductDecl` `atlas`, registered by `@plat/atlas` into `StrategyRegistry.products`;
BCR-V15-1; J-V15.1) whose stage set is **A1 Arrange → A2 Render → A3 Seams**, with **A6 View** a stage run on demand
(the first move of the slider, or `bakeWarp`) and never on the one-click path, each a `StageDecl` (§4.12) with
`phase: 'main'`, `txForm: 'records'` (the atlas runs no kernel transaction: it is no plat arena, V15 §2.1) and
`lineageUnit: 'atlas'` (the atlas root). **A4 Continue, A5 Fit and A7 Drill are not stages**: A4 and A5 are the
folds of the edits `requestContinuation` and `fitChild` (V15 §4.1) and A7 a view action, each declared with its
inputs and outputs below so the contract holds for every piece (item 131 (c)'s materializer contract as V13 §3.0
states it: declared inputs, one `StageContext`, one `ReasonRecord` per record it writes). Every stage and operation
declares its ladder (V15 §3.8) and its work limits over the member count and the visible tiles (V15 §6).

| stage / operation | reads | writes | streams | ladder | budget row |
|---|---|---|---|---|---|
| A1 Arrange | `Recipe.atlas` (members, relations, gaps, conflicts, the preset); each member's `header`, `latBox` and its four edge summaries (`edgeCharter` over the whole side, cached per member version; **V13**) | every unlocked `Arrangement` a solve moves; the warnings; the accepted `GapStyle`s of a solve | none (no draw: the solver's tie-break is deterministic, V15 §3.9) | F-ATLAS `arrange` | `ATLAS-1` |
| A2 Render | the members (reference, version, arrangement, `shareable`), the viewpoint's audience, the common week; `renderAt` (**V13**) | `MemberImagery` per (member, audience); the member's recorded readings (`version`, `header`, `presentWeek`, `dateLabel`, `known`) | none | F-ATLAS `render` | `ATLAS-2`, `ATLAS-6` |
| A3 Seams | the arrangements, rungs and versions; the imagery; the gaps; the conflict settings; the edge charters at two versions for the drift (**V13**) | `SeamRecord[]`, `DriftReading[]`, `InsetLayout[]` (derived); the composed atlas tile set per level in the render tier; the labels across seams | none | F-ATLAS `seams` | `ATLAS-3` |
| A4 Continue (`requestContinuation`'s fold) | the void; its neighbours' arrangements and versions; `edgeCharter` per shared edge (**V13**); the neighbours' basics through their charters | a `ContinuationRequest` with its carried charters; on `send`, V09's world dialog opened with the request; on the world's generation, a `Member` with `origin: 'continued'` and its arrangement locked at the void | none | F-ATLAS `continue` | `ATLAS-4` |
| A5 Fit (`fitChild`'s fold) | the child and parent members; V13's rung-general `placeFrame` / `requestCharter` on the parent (**V13**); the parent's conflict list | a `FitRecord`; the child's `parent`; after the parent's commit, the parent's `version` refreshed and its imagery re-rendered | none | F-ATLAS `fit` | `ATLAS-5` |
| A6 View (on demand) | the viewpoint, the week, the known sets and lens facts of every member (**V13**), the imagery's extents, the rules | `WarpField`, `KnownRegion`, the derived `Embellishment[]` (derived caches) | `atlas.embellish` (the figures' jitter within their admitted region, keyed) | F-ATLAS `view` | `ATLAS-7`, `ATLAS-8` |
| A7 Drill (a view action) | the pointer, the zoom, the warp field, the arrangements | nothing (an `open` of the member through V09's router) | none | — | `ATLAS-9` |

**Where stages may write.** A1–A6 write the atlas document only — its records, its caches — and **never a member**
(spine §14 (6); the lint T-V15-19): the parent's placement in a fit and a neighbour's pre-continuation change are V13
edits the user commits on those documents' pages, and the generated continuation is V13's `generate` run by V09's
dialog. **Scheduling.** `generate` with an `AtlasRecipe` runs A1 → A2 → A3 once (an atlas created from one world, or
empty); every edit of V15 §4.1 re-runs A1–A3 over its dirty set (V15 §4.3) after its own batch; A2 runs in the tile
worker in the background, the view drawing the stale picture (marked) until each member's tiles land, so an atlas page
never waits on a render (V15 §6). **Order against members:** an atlas reads a member only through a read-only handle
opened by the resolver; a member open for editing in another page of the same session is read at its current log
head (its version then marks the imagery stale on the next check); a member's own stages never read an atlas.

### 3.1 A1 — Arrangement (F12; spine §10.3)

1. **Direct placement.** `addMember` drops the member at the pointer (its south-west corner, bearing 0, `by:
   'direct'`), or at the layout preset's next slot when no point is given; `arrangeMember` moves it (a drag), turns it
   (the rotation handle, snapped to right angles by `rotateSnapCdeg`, free under the modifier — a bearing other than a
   right angle is admitted and warned where it touches a neighbour, `W_ATLAS_NORTH_DIFFERS`, J-V15.12) and snaps a
   dragged edge to a neighbour's edge within `snapEdgeKm` (the snap writes an `adjacent` relation on release only if
   the user confirms the chip the tool shows; a silent snap writes position alone). The ruler (`pinnedPoint`) measures
   true distance across the whole plane. Every placement is one event with its undo (V15 §4.4).
2. **Described relations.** Each `Relation` becomes its requirements by V15 §2.3's table (`requirementsOf`); each
   locked arrangement and every `locked` relation is a `locked` requirement; the compatibility requirements of (4) are
   added for every touching or adjacent pair at rank 4. The set is handed to V13's `solve(requirements, { members }, 'arrange', { decisions, seed, maxIterations })`
   (amendments r items 942 and 1007's signature; RQ-V15-5; spine §14 (5)) with `members` the arrangements expressed as
   `ArrangeMember`s — each member's `Placement` of subject kind `world` (file r item 1030) with its extent, rung,
   coarse cell and lock —, the locked ones as rank-2 `lockRegion` requirements (`{ source: 'lock'; kind:
   'lockRegion'; target: { placement } }`, item 1007), and the atlas-scale evaluators of V15 §2.3's words registered by `@plat/atlas` through V13's `solve.registerEvaluator` (file r item 1007; J-V13.132): each an `ArrangeEvaluator` whose cost over the arrangement is its measure's error — the sector's angular error, the gap's width
   error, containment, distance, the shared stretch's length, each 0 when met. The engine and its search are V13's (the least-change search over the
   placements on a coarse lattice, bounded by `leastChange.maxIterations` passed as `opts.maxIterations`), with the precedence ladder of spine
   §5.1 — rank 2 the locks, rank 3 the relations, rank 4 compatibility, rank 5 the preset's packing — and the
   least-change goal (the extent-weighted sum of displacements), run on the DM's command (**Arrange** in the relations
   box) and in the box's live preview (a dry run, the ghost outlines shown; V15 §5.1). The solve ends with the
   verification list (`SolveResult.report`): every relation met / partly met / unmet with its reason (`whyCell`'s form), the unmet ones
   `W_ATLAS_RELATION_UNMET` with the actions `keep` (the relation kept, marked unmet), `drop`, `unlock` (where a lock
   blocked it). A requirement that cannot be met says so and never fakes the result (spine §4.5): "Varn cannot lie both
   east and west of Ashmark".
3. **Layout presets.** `setLayoutPreset` writes an initial arrangement for every unlocked member and the preset's gap
   style, then solves: *clustered continent* packs the members edge to edge in descending rung (the largest first at the
   origin, each next member against the longest free edge, `gapKm` 0) with `adjacent` chips offered for every touching
   pair; *archipelago of known lands* the same packing with `gapKm` 120 between every pair and a `sea` gap written
   `everywhereElse`; *scattered realms in the unknown* a spiral of slots `gapKm` 400 apart with `terraIncognita`
   written `everywhereElse`. A preset never moves a locked member and never deletes a relation; it is one event.
4. **Compatibility requirements (rank 4; warnings, never refusals).** For every pair whose extents touch, overlap or
   stand `adjacent`: **`latitudeContinuous`** — where both carry a latitude box, along an N–S shared edge the northern
   member's `southDeg` must lie within `latitudeToleranceDeg` of the southern member's `northDeg`, along an E–W edge
   the two boxes must agree within the tolerance; a member without a box is compatible with anything; the error is the
   cost, the warning `W_ATLAS_LATITUDE` ("Ashmark's north edge sits at 55°, Varn's south edge at 31°: a 24° step across
   the seam") with the actions `keep` and `setBox` (which opens the member's own world dialog on its page — the atlas
   never writes it). **`climateCompatible`** — along the shared stretch the two edge charters' potential-vegetation
   classes at matching stations must lie within `climateBandTolerance` classes of each other — adjacency as V13 §3.11's
   `biome` term reads it (one `world.biomes` row apart) — for at
   least `(1 − bandMaxShareOfStretch)` of the stretch; else `W_ATLAS_CLIMATE` ("a rainforest shore meets a tundra
   shore along 60 km"), `keep` or `drop` the relation. **`northAgrees`** — both bearings equal (`W_ATLAS_NORTH_DIFFERS`:
   `snap`, `keep`). **`noOverlap`** — two extents overlapping is `W_ATLAS_OVERLAP` under `overlap: 'warn'` with
   `keep` (the overlap drawn by A3's precedence), `inset` (the finer framed), `move` (a re-solve with `noOverlap` at
   rank 3); under `'allow'` an inset silently. Where the solver cannot meet a compatibility requirement without
   breaking a relation, the relation wins (rank 3 over rank 4) and the warning stands — the owner's "warnings, never
   refusals" (spine §10.3). Both checks read `edgeCharter`, which M-W6 lands before any atlas exists (V15 §8): no proxy.
5. **Locks and asks.** A solve or a preset that would move a locked member asks (`W_ATLAS_LOCKED_MOVE`: `unlock`,
   `cancel`) — spine §5.2's rule: it asks exactly when an action would change something a higher rank owns; it never
   asks about ranks 4 and 5. A continuation's member is locked at its void when added (`by: 'continuation'`), a fitted
   child locked at its parent's placement.
6. **Output.** Every arrangement a solve moved carries `by: 'solved'` and a reason naming the requirements it served and
   its displacement; a solve's accepted `gapKind`s become `GapStyle { between }` records; the warnings and the
   verification list are the edit's outcome rows (V15 §4.1). The ruler and the scale bar read the true plane throughout.
*Edges:* an atlas of one member — nothing to solve; a relation naming a removed member — unmet, reported, kept with
the tombstone; more than `maxMembers` members — `refuse.atlas.members`; a solve that oscillates — cut at
`leastChange.maxIterations` with the best state kept and `W_ATLAS_RELATION_UNMET` on the rest.

### 3.2 A2 — Member rendering (spine §10.6: one pixel resolution, one shared zoom rule)

1. **The pyramid.** The atlas plane is tiled by one fixed scheme (J-V15.6): level 0's tile is `pyramidBaseKm` square at
   `tilePx` pixels (16.4 km per pixel), level L's tile a quarter of level L − 1's area (level 4: 1 024 m per pixel —
   the continent's fine cell; level 6: 256 m — the province's; level 11: 8 m), the tile grid anchored at the atlas
   origin, so adding, moving or removing a member re-tiles no other member. Tiles exist only where a member lies.
2. **One pixel resolution per level.** At level L every member is drawn at the level's metres per pixel: a member
   whose fine cell is finer than the level is downsampled by the tile pipeline (the base's §8.8 band composition);
   one whose cell is coarser is magnified from its nearest coarser stop (bilinear; its glyphs and labels are drawn by
   V13 at that stop's size, so a continent's dots stay dots and never swell). The rule that maps a level to a
   member's V13 stop (V13 §5.2's four): with `p` the level's metres per pixel and `c` the member's **pyramid cell** in
   metres — its fine cell (V13 §2.3's size rows: 250 / 500 / 1 000 m) rounded up to the pyramid's power of two, 256 /
   512 / 1 024 m, so the native level samples one to one and never a rounding hair under it (the critic's G-01; file s) —,
   `stop = clamp(floor(log4(c ÷ p)) + 1, 0, 3)` — a realm (512 m) is stop 0 through level 4, stop 1 at levels 5–6,
   stop 2 at levels 7–8, stop 3 from level 9; so **one shared zoom rule** governs every member's symbols: at one atlas
   level two members of one rung show the same glyph level, and a finer member shows at most one more level of detail
   than a coarser one, never a different symbol size for the same thing. The levels and the stops (the rung's pyramid
   cell, 256 / 512 / 1 024 m, from its fine cell in V13 §2.3's size rows; each cell is the formula's value — C15-08):

   | level | m per px | province (256 m; fine 250) | realm (512 m; fine 500) | continent (1 024 m; fine 1 000) |
   |---|---|---|---|---|
   | 2 | 4 096 | 0 | 0 | 0 (stop 0 one to one) |
   | 3 | 2 048 | 0 | 0 (stop 0 one to one) | 0 |
   | 4 | 1 024 | 0 (stop 0 one to one) | 0 | 1 (native) |
   | 5 | 512 | 0 | 1 (native) | 1 |
   | 6 | 256 | 1 (native) | 1 | 2 (on demand) |
   | 7 | 128 | 1 | 2 (on demand) | 2 (on demand) |
   | 8 | 64 | 2 (on demand) | 2 (on demand) | 3 (on demand) |
   | 9 | 32 | 2 (on demand) | 3 (on demand) | 3, magnified |
   | 10 | 16 | 3 (on demand) | 3, magnified | 3, magnified |
   | 11 | 8 | 3, magnified | 3, magnified | 3, magnified |

   "native" is the level at which the member's stop 1 picture (1 px per fine cell, the finer of the two cached stops,
   J-V15.7) is sampled one to one — the cache's one-to-one level; its stop 0 picture (0.25 px per fine cell) is one to
   one two levels coarser, and below that a member's stop-0 tiles are drawn reduced by the tile pipeline; "on demand"
   is V15 §3.2 (3)'s per-tile render of a stop the cache does not hold; "magnified" (c ÷ p above 16, the stop-3
   picture's own density) the stop-3 picture scaled up with `W_ATLAS_DETAIL_UNAVAILABLE` only when the member cannot
   render (an openable member opens instead, V15 §3.7).
3. **The request.** For each member and each audience the view needs (the DM's always; the party's when a party key
   or a host audience exists on the member), A2 calls V13's `renderAt(world, week, audience)` (amendments r's `RenderedWorld` with its label boxes and `atlas` layer set, file r items 1007 and 1011; RQ-V15-2) with `week` the member's present (or the common week where below it) and the viewpoint's `audience`, and pulls the returned tile sets' tiles through the member's read-only
   handle for the stops in `cacheStops` (0 and 1 — J-V15.7: stop 2 is 16 × stop 1's pixels and stop 3 is 256 ×; they
   are rendered **on demand per visible tile** for a member that is openable, cached for the session and dropped, and
   a member pinned with `pinImagery` keeps its stop 2 in the document) and stores the tiles, the placed label boxes,
   the header, the datum, the latitude box, the rung, the present week, the date label and the known set as
   `MemberImagery` and the member's recorded readings. The `atlas` layer set is V13's — the member's default picture for the audience at the week
   (J394): relief with the land cover's used and disturbed classes over it, water, routes, settlements with their
   glyphs at the stop, labels, the sway's fills and borders, the occupation, debatable and fighting overlays and the
   event pins, each under the audience's admission — no lens, no diagnostic layer, no placement outline, no DM-only
   mark for a player audience (V13 §5.4's `atlas` layer set over V13 §5.1's rows; file r item 1011); the page's one
   legend line for the cover overlay, "derived land cover", is the atlas's (V15 §5.2).
4. **At the member's own time (F14).** The default week is the member's present (V13 §2.1: its greatest folded week,
   or on a host-bound world the end of its latest window); the date label is V13's string for that week on that
   member's calendar. Under the common-week display (V15 §4.7) the week is `min(commonWeek, presentWeek)`: a member
   whose present lies before the common week is drawn at its own present and marked `W_ATLAS_BEHIND_WEEK` on its
   cartouche ("at its own present, Year 412") — never extrapolated (V13 §5.8 (3)'s honesty rule).
5. **Staleness and refresh.** A member's live version (its digests, `logHead`, `geometryVersion`) compared at every
   open and at every `refreshImagery`: a difference marks every stop stale (`W_ATLAS_MEMBER_STALE`, the stale mark on
   the member and its cartouche); A2 re-renders in the background and replaces the tiles; nothing else happens (never a
   re-fit, never a re-solve, V15 §4.6). A member that cannot be opened keeps its cached tiles and reads `unopenable`
   (`W_ATLAS_MEMBER_UNOPENABLE`); beyond its cached stops it is magnified with `W_ATLAS_DETAIL_UNAVAILABLE`.
6. **Audiences.** The DM's imagery is V13's DM picture; a party's is V13 §5.1's player picture at that member (covert
   links, DM-only events and unrevealed sites absent, never greyed), rendered by V13, never filtered here; a public
   audience is the player picture under the `public` tier. The atlas never widens an audience: a viewpoint's audience
   selects which imagery is drawn and the admission function (§9.2) withholds every atlas record below the viewer's
   key.
*Edges:* a member larger than a level-0 tile (a continent 3 840 km wide spans one level-0 tile; fine); a member rotated
— its tiles are drawn rotated (the tile quads turned, the labels with them, V15 §5.3); a member of another output
version — `renderAt` refused by the retention window (§7.5): the cached tiles kept, stale, `unopenable`; a member
whose `renderAt` is cut by a work limit — its tiles arrive per stop as they land.

### 3.3 A3 — Seams (F11b; spine §10.6: the more detailed member wins; softened along the shared stretch only)

1. **Detection.** For every pair of members A3 finds the shared geometry on the true plane: `sideBySide` when two
   extents touch along a stretch (or lie within `bandPx` at the drawn level), `nested` when one extent wholly contains
   another (`Member.parent` set by a relation `inside`, a fit, or detection), `overlap` when the extents intersect
   otherwise. The stretch is the overlap of the two facing edges (a segment on the true plane); for an overlap the
   intersection polygon's boundary. No record is written for pairs that share nothing.
2. **Precedence on the shared stretch.** The more detailed member wins (the finer rung; equal rungs by
   `ConflictSettings.seamPrecedence`: the newer's `z` by default, the DM's `z` under `'dm'`): inside the overlap its
   pixels are the base; the yielding member's pixels enter only through the softening band. **Softening along the
   shared stretch only:** at every level the band of width `bandPx` (never more than `bandMaxShareOfStretch` of the
   stretch's length) astride the stretch is blended by a band-limited multiresolution blend — each tile pair's band
   decomposed into a three-level Laplacian pyramid, the two members' coefficients mixed by a smoothstep across the
   band at each level, so the seam disappears at every scale without ghosting (the science note §10.2's cited
   principle; the band width and levels ours) — and nothing outside the band changes: a member's picture away from its
   edges is byte-identical to its own `renderAt` tiles (T-V15-13 (b)). The softening is pixels only: **nothing of
   either member's data changes** (F14; T-V15-1).
3. **Unknown space and drift.** Between members that do not touch, the gap styles draw (`GapStyle` regions first,
   then `everywhereElse`'s kind, default terra incognita); a sea gap between `acrossSea` members draws the sea tint to
   both shores with the shores' own coast lines kept from their tiles. Where two members that were matched at
   generation (a continuation) or merely abut have since changed, A3 computes a `DriftReading` — the carried charter
   against the neighbour's live `edgeCharter` for a continued seam, the two live charters against each other for any
   other, over the shared stretch: the coast crossings' greatest shift, the river crossings unmatched within V13's
   `riverMatchM`, the edge profiles' RMS difference, the vegetation classes' disagreement — and, where any
   `atlas.seams.drift` threshold is crossed, a DM-only marker at the stretch's midpoint under `showDrift`
   (`W_ATLAS_DRIFT`, information only: "the coast has moved 2.1 km apart since Varn was continued; 1 river unmatched").
   The atlas softens the picture whatever the drift and never pulls either member back; re-matching is only on request
   (V15 §4.1's `rematchStrip`).
4. **Detail steps.** When the two members' native stops differ at the drawn level (a province inside or beside a realm
   is one rung finer: `detailStep` 1; inside a continent, 2): a step of `easeAboveStep` rungs is **eased** — the finer
   member's tiles are drawn with their high-frequency detail attenuated toward the coarser member's level across the
   band (the same pyramid blend, the finer member's upper levels faded over the band's width), so the eye reads one
   map that grows sharper inward; a step of `insetAboveStep` or more (and any step when `AtlasStyleState.insets` is on
   and the DM chooses it per seam) is **embraced as an inset**: the finer member drawn at its own detail inside a thin
   frame (`insetFramePx`) with no easing, and, at levels where the coarser member's stop is 0 or 1, a locator box
   (`locatorBoxPx`) drawn on the coarser member at the child's extent — the printed-atlas convention (the science
   note §10.2). The treatment is a seam setting (`treatment` on the record, the DM's choice kept as an attribute of
   the pair in `ConflictSettings`-style per-seam treatment settings written by `setAttr`).
5. **Labels across seams.** A member's placed label boxes come with its tiles (V13 places them per stop). A3 runs the
   base's placer (§9.2's global greedy) once over every visible member's boxes at the atlas level — the boxes as fixed
   candidates with their priorities, the seam bands as obstacles — and drops the yielding member's labels whose boxes
   cross a band or collide with the winning member's, so no label is cut by a seam and none collides across one; the
   members' label images are drawn through their boxes' admission (a dropped box's pixels masked). Positions are
   cached per (atlas model digest, imagery versions, level).
6. **Nested members.** A child inside a parent (V15 §3.5) is a seam of kind `nested` with the child winning on its
   footprint whatever the fit mode; `imageOnly` adds the mismatch warning's marker; `fitted` and `derivedFromParent`
   seams show no drift at the fit's versions by construction (the parent's edge meets the child's, V13 §3.11.2's
   blend) and a drift reading thereafter like any seam.
7. **Overlaps.** Two overlapping extents of different rungs: the finer wins inside the overlap with the band inside it;
   equal rungs: the precedence setting, the loser blended out over the band inside the overlap; `W_ATLAS_OVERLAP`
   stands until the DM chooses `keep`, `inset` or `move` (V15 §3.1 (4)).
*Edges:* a stretch shorter than the band — the band shrinks to half the stretch; three members meeting at a corner —
each pair's band computed, the corner's pixels the finest member's with the two bands' smoothstep products; a member
rotated against its neighbour — the stretch is the segment of their boundaries within `bandPx`, the blend run along
it, `W_ATLAS_NORTH_DIFFERS` standing; a missing member — its gap drawn by `ConflictSettings.missing`, its seams keep
their last drift reading, marked.

### 3.4 A4 — Continuation requests (F13 narrowed by F14; spine §10.4)

The one coupling between members, at the new member's generation only, by the user's choice.

1. **The void.** **Continue here** on a click in empty atlas space, or on a member's edge handle, with a rung chosen
   (the province by default beside a province, the neighbour's rung otherwise): the void is the largest axis-aligned
   rectangle of that rung's extent (V13 §2.3's size row; a smaller void clamps the extent to the space, inside V13's
   band, reported `W_WORLD_RECIPE_CLAMPED` by W0) that fits the empty space anchored to the member edges it touches —
   beside one member (one shared edge), between two (two facing edges), in a corner (two edges meeting), among three or
   four — its shared edges aligned exactly with the neighbours' edges. Only a neighbour at **bearing 0 relative to the
   void** shares an edge (J-V15.12): a rotated neighbour is reported (`W_ATLAS_NORTH_DIFFERS` with `snap`, which turns
   it to a right angle on its own arrangement) and, unsnapped, does not constrain the void. A void that touches no
   member is an ordinary new world (no continuation, `info.atlas.continue.none`).
2. **One world edge charter per shared edge.** For each shared edge the fold calls V13's `edgeCharter(neighbour,
   neighbourSide, span)` (RQ-V15-1) — the span the shared stretch in the neighbour's own frame — and carries the
   `WorldEdgeCharter` it returns as a recorded input of the request (V15 §2.11) with the neighbour's version; the edge
   is `locked`. A neighbour that cannot give one (an older schema the chain cannot migrate; an unopenable member)
   leaves its edge `locked: false` with `W_ATLAS_EDGE_UNLOCKED` ("Varn's edge could not be read; the new map is free
   on that side") — the continuation proceeds on the other edges.
3. **The present ground, never a record.** The charter carries exactly V13 §2.2's `WorldEdgeCharter`, every field
   (file r item 953; cited, never restated): the neighbour's PRESENT physical ground along the edge at the moment it is
   read — its terrain, bedrock, soils and the landforms that run off the edge, its water bodies at their present level
   and its river crossings at their present flow, its climate, currents and groundwater, its potential vegetation
   graded, its latitude box, datum and world-level climate inputs, its always-so overrides along the edge — however
   that ground came to be (an override and a disturbance that have shaped it are both in it, since both are the
   ground), and **never** a record: no this-happened event, no land cover, no simulation state, no placed frame, no
   route (J-V15.13: a road is a lay version on a standalone world and the host's lived network on a bound one — a
   record either way; the new world lays its own, and a road ending at a seam is the DM's to continue by the new
   world's own tools), no sway, no lens plate, no political fact, nor any change made after the reading (F14: an edit
   in the neighbour before the continuation's generation is in the charter because it is the ground; one after it
   never is). The test is J393's, stated once in V13 §2.2: *is this a present physical fact, never a record?* —
   T-V15-2 asserts the charter unchanged under a razing, a sway revision and a land-cover change and changed by a
   happened terrain stroke at the edge, and a lint over the charter's declared fields that none names a dated record
   kind.
4. **Pre-filled basics.** The request's `prefill` is derived from the neighbours' charters (present facts), each a `set`
   option the user may change in the dialog and never a lock: the **latitude box** continued from the neighbour across
   the void (the neighbour's degrees per kilometre along y extrapolated; two N–S neighbours average), the **poles**
   and the calendar hemisphere from the charter's `world` (V13 §2.2: the neighbour's present climate inputs at world
   level), the **climate band** the box implies, **wetness** the
   mean annual precipitation along the shared edges mapped to the dialog's dial, **ruggedness** the edge profiles'
   relief and the landforms running off (a range running off the edge proposes the `collision` scenario, whose regional
   feature is a mountain front at the province rung, V13 §2.3's `world.formation` rows — the range's profile fixed by the
   charter's landforms running off the edge, V13 §3.1 (6)), the **sea share** the coast fraction along the edges and whether a sea
   touches the void. Every other option — the template among them: a recipe's template is a record, not ground —
   stays `random` (spine §6's three states); the pre-fill rides as `OptionChoice { strength: 'set' }` rows of the
   request (amendments r's record).
5. **Contradicting edges.** Where two charters disagree in a way no world can honour — at a corner (one neighbour's
   edge ends in sea where the other's ends on a 2 000 m plateau), across the void (a desert edge faces a rainforest
   edge 300 km apart; two latitude boxes that cannot both continue; two rivers entering with no exit), or in the rock
   (bedrock classes that cannot meet) — A4 reports each `W_ATLAS_EDGE_CONTRADICTS` with a **reconciling feature
   proposed** as an extra `set` requirement the user accepts, moves or drops: a *sea* (between facing coasts), a
   *strait* (a sea opening between two land edges), a *mountain belt* — V13's `range` feature, its `bearingCdeg` set across the wind — (between a wet and a dry edge),
   a *rift* or an *escarpment* (between bedrock classes or a plateau and a plain). The proposals are rows of
   `atlas.arrange`'s contradiction table (data: the fact pair → the feature kind and its placement rule), and the
   solver (spine §4) takes the accepted feature as a `set` requirement of kind `landform` (file r item 1007) at rank 3.
6. **Neighbours unchanged by default.** A request that can be met only by changing a neighbour (the user asks that a
   river flow from Varn into the void where Varn's edge carries none; that the void's coast continue where Varn's edge
   is inland) is reported `W_ATLAS_NEIGHBOUR_CHANGE` naming the neighbour's change: `drop` drops the requirement;
   `editNeighbour` opens the neighbour's own page at that edge with V13's fork preview and conflict list (V13 §4.5;
   spine §5.3) for an edit the user commits **there**, under Varn's own verbs and undo, after which the request is
   re-drafted from the neighbour's new version. Nothing changes without approval, and nothing is changed by the atlas.
7. **Send.** `requestContinuation { action: 'send' }` opens V09's world dialog (the layered panel of spine §6) with the
   request: the locked edge chips (each naming its neighbour and side, un-removable but showing its charter's facts),
   the pre-filled basics, the accepted features, and Generate; V13's W0 takes each charter as a `locked` `Requirement` of source `edgeCharter` and kind `edge` from the
   request's `edgeCharters[]` (amendments r's W0 step 6; spine §10.4), the coarse live preview shows the edges meeting, and Generate creates the new world document (in the
   standalone application a new document; in host mode the host decides which campaign owns a world made from an
   atlas — H35; until it lands a continuation in host mode is refused `refuse.atlas.hostWorld` and the user makes the
   world standalone). The new world **stores the charters it was generated from with each neighbour's version**
   (provenance, V13's side as a settlement stores its charter; RQ-V15-1); the atlas adds it as a member with `origin:
   'continued'`, its arrangement at the void, locked, `by: 'continuation'`, and `continuedFrom` naming the carried
   charters — the atlas carries only the charters (spine §10.4's last sentence).
8. **After generation: nothing crosses.** The neighbours' versions are unchanged by the generation (T-V15-11); the new
   member's drift readings start at zero and grow only as either side is edited; no later edit on either side is ever
   carried over (F14; V15 §4.7).
*Edges:* a void among four members (a hole) — four edges, four charters; a void whose rung's extent exceeds the hole —
clamped, reported; two voids drafted at once — independent requests; a neighbour refreshed between draft and send —
the draft marked stale (`W_ATLAS_MEMBER_STALE`) and re-drafted on send; a continuation of a continuation — the same
rules, the chain recorded in each member's own charters.

### 3.5 A5 — Fit across rungs (spine §10.6: a member inside another)

A child member whose extent lies wholly inside a parent's (a province in a realm, a realm in a continent; detected, or
declared by `inside`) takes one of three paths on the fit sheet (V09; RQ-V15-7), in this order of preference:

(a) **Derived from the parent — the preferred path (J-V15.8).** The child does not exist yet: the fit sheet's first card
   is **Make a finer map here**, which asks V13 for a world-rung charter of the chosen extent on the parent —
   `requestCharter` with a world subject (RQ-V15-3; V13 §3.11.4's world subject, file r item 1009, emitting a `WorldCharter`: a `Placement` of
   subject kind `world` (item 1030) in the parent with `precedenceStamp: 'world'`, P1 not run, no blend, P4 only) — and opens V09's
   world dialog with it: the child's recipe carries the parent's charter (`WorldRequest.parentCharter`) as its one boundary record (the four sides'
   profiles, water edges and river crossings; the climate at the stations; the parent's rasters over the extent as the
   child's **coarse ground**, which the child's W1 refines by the position-keyed lattice at its finer cell — V13
   §3.11.4's principle and spine §3's "the fine DEM is the coarse result refined by the existing position-keyed
   detail"; the parent's placed frames inside the extent as the child's **planned sites**, spine §4.2's W0; no
   formation op, the child's `scenario` `'none'` and its card disabled with "the ground is the parent's", V13 §3.1 (1)),
   so the child is coherent by construction. The parent gains the placement record only (its geometry untouched; its model
   digest moves by that record alone, as a world's does for any placement, V13 §2.7), committed on the parent's page
   by the sheet's one confirmation; the child is added with `origin: 'derived'`, `parent`, locked at its extent. The
   parent's frames inside the extent stay the parent's (a frame belongs to one world, V13 §3.18 (7)) and the sheet
   offers **Move the towns into the finer map** — V13's `unplaceFrame` on the parent and `placeFrame` on the child,
   settlement-first, each previewed on its own page in one guided sequence — or **Keep them on the parent**, in which
   case the atlas draws the parent's towns over the child inside its footprint through `renderAt(parent, week,
   audience, { layers: ['settlements', 'labels'] })` (file r item 1006: the set's two rows alone), labelled "from the
   parent" (V15 §3.3 (6)).
(b) **Separate, image only.** An existing world dropped inside a parent: no write to either; the child wins on its
   footprint (V15 §3.3 (6)) and the fold computes the **mismatch** once — V13's transient `charterFor` on the parent
   at the child's extent (a world-rung transient placement, no record, `WORLD-9`'s form; RQ-V15-3) against the
   child's own four `edgeCharter`s — as a `DriftReading` on the `FitRecord`, and warns `W_ATLAS_MISMATCH` where any
   threshold is crossed ("the coast of Thornwood lies 3 km from Ashmark's here; its river enters where Ashmark has
   none"). The warning stands on the seam until the DM fits (c) or accepts it.
(c) **Separate, then fitted.** The parent bends around the child through V13's placement machinery (RQ-V15-3; spine
   §14 (3)): `placeFrame { frame: { kind: 'world'; doc } }` — amendments r's rung-general form, its edit row `fit` — with the
   child world document as the frame and the parent as the world, settlement-first —
   P1's coherence over the six terms in their world-child readings (V13 §1b.2's `placeFrame` row, file s item 1046: the
   child's own coast rings, its reaches at its edge, its `dem`, its W5 mode, `territory` 0, and the ∞ `dossier` term only
   where a host-bound seat of the parent lies inside the child's extent),
   the bearing search admitted only at 0 (a world is never turned or mirrored: `W_ATLAS_NORTH_DIFFERS` refuses the fit
   until the child's bearing is 0); P2's blend band in the parent scaled by the parent's cell ratio (V13's rule, file r item 942: `blendBandM` ×
   the parent's fine cell ÷ the frame cell — 4 000 m under a 500 m realm, 8 000 m under a continent, widened as V13
   §3.11.2 widens it); P3's local drainage in the parent over
   the extent + margin + band; P4's charter both ways; P5's stamp `settlement` — **the child never changes** (T-V15-4;
   the owner's rule at world scale). The sheet opens V13's own preview on the parent's page (the counterfactual fork,
   V13 §4.5): the cost by term, the blend band's outline, the anomaly list, and the **conflict list** for every parent
   settlement whose dossier facts the blend would contradict (V13 §2.2's `ConflictChoice`s, as the ladder admits them
   there) and for every parent frame
   the child's extent covers (V13's `W_PLACEMENT_OVERLAP`, accepted or not, with (a)'s two offers); the user commits
   **there**, always `happened` (V13 §3.11's rule for a placement, with its `oldGround` trace), a geometry version step
   on the parent (on a host-bound parent a geometry shift the host adopts by its re-canonize, `W_HOST_CANON_BEHIND`
   until then). The atlas then writes the `FitRecord` (`mode: 'fitted'`, the parent's placement id, the conflicts
   decided, the parent's versions before and after), refreshes the parent's imagery (its version moved) and locks the
   child at its placement. Thereafter nothing crosses: the parent is never re-bent when the child changes and the child
   never re-fitted when the parent changes (V15 §4.6).
The three paths are the spine's three; a fourth — the child bending to the parent — does not exist (the more detailed
rung wins on its footprint, spine §2). *Edges:* a child straddling the parent's edge — not nested; a side-by-side seam
on the inside part, and the fit refused (`refuse.atlas.fit.straddles`); a child of the same rung as the parent — an
overlap, not a fit; a child covering the whole parent — the parent is the child's parent in name only, the fit refused
(`refuse.atlas.fit.covers`); a parent that is itself a child — allowed, the chain's innermost wins.

### 3.6 A6 — The relational view (F10; spine §11)

A **view** — V13 §5.8's fact class 4: an owner-ruled projection, labelled, never host truth — over the atlas (or over a
single world as the one member of an unsaved atlas, J-V15.14). The true map keeps absolute scale and every measurement;
the relational map is a warp of it drawn on the same tiles; a slider morphs between them.

**(1) The warp.** (a) *The family and why* (J-V15.16). The warp is a **flow-based area cartogram** (the science note
§9.2's third row: a flow whose density interpolates linearly from the importance density to uniform, the velocity
field integrated once; topology-preserving by construction; seconds on a 512-grid) composed with a **radial
magnification about the centre** (the fisheye of §9.2's fourth row: a closed-form, invertible, real-time map) and an
**orientation rotation**. Chosen over the rubber-sheet method because that one can fold and break adjacency at the
distortion the mappa mundi needs; over the classic diffusion cartogram because the flow method's single integration
bakes in seconds where diffusion takes tens; over a fisheye alone because a fisheye cannot swell many places at once
by their importance; and over a hand-drawn deformation because the distortion must be derived from facts and
re-derived when they change (F10's "based on facts", spine §11). (b) *Construction.* Over the known world's bounding
square (the viewpoint's known region plus every drawn member, V15 §3.6 (4)) a grid of `warpGrid` cells; each cell's
**importance density** ρ = the class base (`atlas.style.density`: land 1, sea 0.35, a sailed sea 0.8, heard-of 0.6,
unknown 0.25, never below `floor`) plus every seat's mass spread uniformly over its sway's extent (`ViewFacts.polity.sways[].border` and `areaKm2`,
or a disc of the tier's reach about the seat's `at` where no sway holds it) — importance (V15 §3.6 (2)) × the cell's share — plus the centre's
`centreMass`; the target is areas proportional to ρ. With ρ̄ the mean, the density at flow time t is ρ_t = ρ + t (ρ̄ −
ρ); one Poisson solve ∇²φ = ρ̄ − ρ on the grid (a multigrid relaxation in fixed row-major order, `dmath` only; no
transform library) gives the potential; the velocity at t is v = −∇φ ÷ ρ_t; every grid vertex is integrated from
t = 0 to t = 1 in `flowSteps` steps (a fourth-order step, the field read bilinearly), and the displacement at each
step is kept, so the slider's position s ∈ [0, 1] is **the flow at time s** — an invertible map at every s, not a
linear blend of two maps (J-V15.17). The preset's `areaScaling` scales ρ's departure from uniform before the solve
(0: identity; 1: the full cartogram). Then the **magnification** about the centre: with r the normalised distance
from the warped centre over the known world's half-diagonal and d = (`magnify` − 1) × s the distortion, r′ = (d + 1)
r ÷ (d r + 1) — the holy city huge, the rim squeezed; then the **orientation** rotation about the centre (east up:
90° anticlockwise), free. The composed map W_s = R ∘ F_s ∘ D_s is applied in the render tier as a **mesh warp**: each
drawn tile's quad is subdivided into an n × n mesh (n by the tile's displacement variation, 2–8) whose vertices are
mapped through W_s on the true plane, the tile's texture drawn through the mesh — every pixel of every member's
picture stays a pixel of that member, moved; nothing is re-rendered for the warp. *Numerics:* the grid is the known world's bounding square padded by a quarter on every side, its border vertices fixed (zero displacement: the unknown rim holds the frame, as a printed map's edge does), the Poisson solve under ∂φ/∂n = 0 on the padded border (no flux through the frame), solvable because ρ̄ is the mean over the whole padded grid; the Poisson relaxation a four-level multigrid V-cycle with Gauss–Seidel sweeps in fixed row-major order (eight sweeps per level, the residual's norm reported in the bake's reason record); the velocity read bilinearly between vertices; the time step 1 ÷ `flowSteps` with a fourth-order step; a vertex whose step would cross a neighbour clamped to half the cell (the fold guard that, if it trips, fails the Jacobian check and takes the fallback); the displacement at each step quantised to integer centimetres before the next, so the cached step fields are exact and hash alike; the magnification's radius normalised by the known world's half-diagonal in true centimetres. (c) *The itinerary strip.* The
`itinerary` preset replaces D_s by a **distance cartogram along the viewpoint's route** (the science note §9.2's fifth
row's idea): the route chain's stations (V13's `WorldRoute.stations`, land effort-metres) laid on a straight vertical
spine at a y proportional to the travel time between them under the member's law (`derivedTime`), every other point
placed at its angle and true distance from the nearest station's true point, folded about the spine; a point off the
route by more than `atlas.style.itinerary.sideKm` fades to the margin. The spine's day counts are the preset's
labelled distances (Peutinger's convention, the science note §9.1): true, as every readout is. (d) *Invertibility.* F_s
is a flow of a smooth field (no fold while the integration stays stable), the magnification monotone in r, the
rotation rigid: the composition has a positive Jacobian everywhere, checked on the grid after the bake
(`WarpField.jacobianMin` > 0, T-V15-5 (a)); a bake that fails the check or the work cut falls back to the
magnification-and-rotation alone with `W_ATLAS_WARP_FALLBACK` ("the relational warp could not be built for this
viewpoint; the centre is drawn large, the areas true"). The inverse `unwarp` is a fixed-point iteration on the cached
forward field (three steps from the bilinear inverse), used by the readout, the drill and the embellishments' hit
test. (e) *Determinism and cost.* Every number through `dmath`, every pass in fixed order, the displacement quantised
to integer centimetres and hashed: the same atlas version, viewpoint, week, preset and grid give a byte-identical
field on every §13.2 platform (T-V15-9); the bake ≤ `ATLAS-7` (V15 §6), cached per key, re-made only when its inputs'
digests change; the slider is free (the step fields are cached) and the mesh warp runs per frame at `ATLAS-8`.

**(2) The distortion from facts — never from whim.** Every input is a reading of a member's facts at the viewpoint's
week through V13's lens facts and polity rows (RQ-V15-4; V15 §1b.5), labelled "projection" in the legend:
- **The centre.** By the viewpoint's rule: `holyCity` — the seat the religion lens's hierarchy and faith places name as
  the religious superior or pilgrimage centre of the deity the mapmaker's culture holds as patron (the mode of
  `faith[].patron` over the culture's seats; ties by `realmRank`), else the top-ranked deity's highest-tier patron
  seat; `capital` — the root seat of the allegiance (`Allegiance.root`) the mapmaker's seat belongs to; `mapmakerSeat`
  — the highest-tier seat of the viewpoint's culture; `point` — the DM's. Resolved at draw (its point `ViewFacts.polity.seats[].at` carried onto the atlas plane by
  `toAtlas`), recorded on the viewpoint as a derived reading and in the bake's reason ("the centre is Sarn, the pilgrimage centre of the Ember Faith");
  where the facts are absent the next rule down applies and the legend says so (V15 §1b.5).
- **Size.** A seat's importance = `tier[rung]` × (1 + centrality + exports ÷ 4)^`tradeExp` × (1 + `holiness` where
  the seat carries a faith-place label or is the patron seat of the mapmaker's deity) × (1 + `prosperityPerRung` ×
  its rung above the realm's held median, clamped ±3 as the sway reads it) × (`capital` where it is an allegiance's
  root) — the mappa mundi's "areas of import wildly out of proportion" from the host's own tiers, trade and faith
  through V13's rows; a standalone world's seats take the recipe's tiers and W8b's recipe sways, no trade or faith.
- **Orientation.** The preset's (east up for the sacred style; north up for the portolan; the route's start at the
  bottom for the itinerary), the viewpoint's override.
- **Detail by knowledge.** Over the known region (4): cells known are drawn as they are; heard-of cells are drawn with
  their imagery blurred by `unknownBlurPx`'s lower bound and their labels dropped but for seats; unknown cells blur
  further with distance from the known edge, their members' imagery fading into the preset's `unknown` treatment —
  blank parchment, a legend ("beyond here the maps fail"), or the figures of (5) — and their labels gone; an unknown
  member is a vague outline or nothing. The warp's density treats them by class, so the unknown shrinks.

**(3) The true readout.** Hover anywhere: `trueReadout` unwarps the pointer to the true plane and the hover card shows
the true point (the member and its world point), the **true distance** to the viewpoint's centre, or to the pinned
point when the ruler is set (the `worldUnits` unit; as the crow flies, across seams as well since the plane is metric),
and, when both points lie in **one member** and a route chain joins them, the **travel time** along it under that
member's law — V13's `derivedTime` over the route's stations, labelled with the law's version and basis and "on foot"
on a standalone member, and on a host-bound member the host's own leg (V13 §5.1's rule that times are the host's) —
never a time across a seam ("no road crosses a map's edge", the card says so). On the warped map, route labels in the
`mappaMundi` and `itinerary` presets print the true distance in the preset's numerals (Peutinger's labelled distances,
spine §11): the shape lies, the number never does. The scale bar is drawn on the true plane and never hidden
(J-V15.15); the ruler's line is drawn unwarped through the view.

**(4) Knowledge: the known region.** `knownRegion(viewpoint, week)` over the warp grid: by the viewpoint's
`knowledge.source` — `everything` (the DM's: all known); `audience` (the party or the public: the member's known cells as `renderAt` returned them for that audience — the coarse cells the audience's places have reached, amendments r's `RenderedWorld.known` — mapped onto the warp grid; one `heardOfBands` band beyond, within `heardOfWeeks` along routes); `culture` (the mapmaker's culture: its seats' territories and sways, the cells within `travelWeeks`
along routes, the far ends of its trade channels (`tradeKnows`), the seats of its allies and vassals, one heard-of
band beyond; the plates at `asOfWeek` where set, so a map "found in a dungeon" knows what its culture knew then). A
projection (class 4), labelled; the DM may widen or narrow it only by choosing another source or audience, never by
painting (knowledge is a fact of the audience, V14 §2.3's reading of §9.2; the party learns through the host's reveal
and reach).

**(5) Embellishments — derived, and the DM's.** `embellish(viewpoint, week)` places figures by the rows of
`atlas.embellish`, each a pure function of the facts named and a keyed draw for its jitter within the region the rule
admits (the `atlas.embellish` stream, keyed by the viewpoint's lineage, the kind and the grid cell: deterministic,
T-V15-9); every figure carries its rule and the facts it read by V13's field names (`derivedFrom`), answered by the
clerk; the DM adds, moves or removes any (`setEmbellishment`; a removed derived figure's `hidden` mark survives every
bake; a moved one becomes `source: 'dm'` keeping `derivedFrom`).

| figure | the rule (the facts, by V13's names; the thresholds `atlas.embellish`'s) | where it draws | audience |
|---|---|---|---|
| **sea serpent** | a sea cell whose bathymetry (`ViewFacts.water.bathymetry`: the member's coarse `dem` below the datum, read once per member on request) is deeper than `minDepthM`, farther than `farFromRouteKm` from any `WorldRoute` of mode `water`, or in a body whose quarter's `TravelLaw.water.stormFactor` ≥ `stormFactorMin` at the viewpoint's season — deep, little-sailed or storm-feared water | one per `per1000Km2` of such water, at most `maxPerBody`, at the admitted cells' centroid jittered | every |
| **whale** | deep water sailed (a route within reach): the Carta Marina's real animals, the science note §9.1 | as above | every |
| **dragon** | the band `bandKm` beyond the known region's edge (4): where knowledge ends | one per `perBandSegmentKm` of the edge, on the band's midline | every (the edge is the audience's own) |
| **monstrous peoples** | land held by a seat whose culture distance band from the mapmaker's culture (`PolityFacts.culture[].band`) ≥ `cultureBandMin`, or whose allegiance stands adversarial to the mapmaker's (`PolityRelation` mapped adversarial; `Sway.neighbours[].class`), or farther than `farKm` from the culture's nearest seat and of another culture — the lands the mapmaker's culture is hostile to or far from | one per such sway or culture region of at least `minLandKm2` (`ViewFacts.polity.sways[].areaKm2`), at its pole (`.poleCm`) | every, from public rows; a DM-only relation never draws for a player viewpoint |
| **devils** | land held by a seat whose patron deity differs from the mapmaker's and whom the religion lens marks contested or joined to the mapmaker's seats by a historic-front link, or whose allegiance is `atWar` with the mapmaker's — an enemy faith or an enemy at war (never the alignment lens, DM-only, J384 (7)) | one per such region, beside the seat (`ViewFacts.polity.seats[].at`) | every, from public rows |
| **skull** | a `WorldEvent` of the plague kinds (an arrival, a realm arc naming the seat) within `vignetteWeeks` of the week | at the seat | the event's resolved audience |
| **banners**, **siege**, **ruin**, **fallen idol** | a battle or raid, a siege, a razing, a patron fall, within `vignetteWeeks` | at the seat or the border segment V13 placed the event at | the event's resolved audience |
| **city vignette**, **cathedral** | a seat of at least `city.minTier`: its vignette's size ∝ importance^`sizeExp`; the holy city's a cathedral when `cathedralAtHolyCity` | at the seat, under the preset's `vignettes.byTier` | every |
| **cartouche**, **compass rose**, **ship** | furniture by the preset's rows: the title and the viewpoint's cartouche; roses on the rhumb circle; a ship on a sailed route | by the preset | every |

**The rule that binds every figure (J-V15.18), and its test.** A figure is chosen by its **trait** alone — deep water,
storm, unsailed, the edge of knowledge, hostility, distance, an enemy faith, an event, a tier — and by the preset; it
reads culture **ids**, relation **classes**, culture-distance **bands**, deity **keys** and event **kinds**, and never
a culture's, a people's, a deity's or a region's **name** or label; the figure library (`FigureRow`) keys no row by
any name; its captions and the catalogue's strings for this volume are linted against a shipped blocklist of
real-world ethnonyms, demonyms, faith names and region names (`atlas.embellish.blocklist`) and against any culture or
deity label of the member (a build-time and a per-document check); and the legend carries the note "the mapmaker's
fear, not the realm's fact: its enemies drawn as monsters" whenever a monstrous-peoples or devils figure is drawn — the
honesty rule of V13 §5.8 (3) applied to a culture's prejudice. T-V15-6 asserts: renaming every culture, deity and
seat of the fixture changes no figure; changing one relation to adversarial moves exactly the figures its rule names;
no string of the volume or of a derived caption matches the blocklist; no figure reads an alignment, suppressed-creed,
covert or DM-only row for a player viewpoint.

**(6) Viewpoints.** Every map is somebody's map (spine §11). Two ship with every atlas: *the game master's* (audience
`dm`, culture `none`, preset `true`) and *the party's* (audience `party`, culture `none`, preset `true`, knowledge by
audience). A DM adds a culture's map (a culture of one member, its centre by the preset's rule, its knowledge by
culture), a party's relational map (audience `party`, a culture of the party's choosing, preset `mappaMundi`: "the
world as the Ember priests draw it, as far as the party has seen"), or **a map found in a dungeon** (a culture's
viewpoint with `asOfWeek` centuries before the present, every member read at its plates and events up to that week,
`W_ATLAS_BEHIND_WEEK` where a member's history does not reach so far back): each a `Viewpoint` record, switchable in
the picker, each with its own warp bake, known region and figures. A party's map **improves as they learn**: its known
region is re-derived from the member's known sets at every refresh, so a revealed place or a reached site widens it.

**(7) Presets applied.** The viewpoint's preset (V15 §2.5) sets the orientation, the centre rule, the warp's
`areaScaling` and `magnify`, whether coasts stay true (the portolan's: `areaScaling` 0.15 keeps them to the eye),
whether interiors beyond the known coast are blank, the unknown's treatment, the figures admitted, the lettering (a
bundled face, small capitals, roman or old-style numerals, §9.2's font paths), the furniture (16 roses on a circle
with 32 rhumb directions; the T-O rim when the known world is one landmass round one sea; the itinerary's strip), red
ports, coast-perpendicular labels (the member's labels re-laid by A3 (5)'s placer run with the preset's angle rule)
and tiered vignettes. A `true` viewpoint draws no warp, no figure of the derivation's and only the DM's own.

**(8) The legend's honesty.** The relational view's legend begins with "drawn as {culture} saw the world at {week}:
{centre} at the centre, {orientation} up, its enemies as monsters, the unknown as legend — a projection; every
distance and time shown is true" and lists the absent facts that fell to defaults (V15 §1b.5), as V13 §5.8 (2)–(3)'s
banner does for a lens; {culture} is the DM's christening of the culture id (`ViewFacts.polity.cultures[].label`), else
"culture {id}".

**(9) Over a single world (J-V15.14).** The world page's **View relationally…** makes an unsaved atlas of that one
member (a scratch `AtlasDocument` in the session, V15 §4.9's unsaved form) and opens it on the atlas page with the
party's and the DM's viewpoints; **Save as a world map** keeps it. V13's own view gains no toggle, no warp and no
figure (spine §11: the atlas is the style's home).

### 3.7 A7 — Drill-down (spine §10.7)

Zoomed out, the atlas is image tiles. A **click** on a member at any zoom, or a **zoom past the threshold** — the
member under the view centre at its stop 3 with `drill.pastStop` reached and the member filling `drill.shareOfView`
of the view — hands over to the **live member**: `drillTarget` unwarps the point through the viewpoint's field to the
true plane and through `toMember` to the member's `WorldPointCm`, and V09's document router opens the world document
as another page at that point and the equivalent world stop (V13 §5.2's pattern: the atlas page kept in its tab; the
back action returns to the atlas at the same centre and zoom), where V13's own drill opens a settlement (V13 §5.2),
V03's plan rung an interior, V14's icon a site — the owner's "click deeper", run from the top. A player's drill-down
opens the member's player view only when the member is `shareable` and the audience knows a place inside it, else the
click answers `refuse.atlas.drill.audience`; a `missing` member refuses with its gap's words, an `unopenable` one
with `refuse.atlas.drill.unopenable` naming the reason (the version, the resolver). The relational view's drill lands
on the **true** point (T-V15-12): a warped click opens the place that is really there.

### 3.8 Failure handling (the ladders, in §5.2's form: F-ATLAS)

| stage | rung 1 (soft) | rung 2 (reported, degraded) | rung 3 (refused) | never |
|---|---|---|---|---|
| A1 arrange | an unmet relation: kept, marked, `W_ATLAS_RELATION_UNMET` | an oscillating solve cut at `maxIterations`, the best state kept | `refuse.atlas.members` (over `maxMembers`), `refuse.atlas.extent` (the lane), `refuse.atlas.duplicate` | a refusal for any overlap, latitude or climate clash (spine §10.3) |
| A2 render | a stale member drawn stale until refreshed | a work-cut render: the stops that landed, the rest magnified, `W_ATLAS_DETAIL_UNAVAILABLE` | — | an atlas page waiting on a render; a member written |
| A3 seams | a drift above threshold: a marker | no charter for a drift: the reading `noCharter`, no marker | — | a member pulled back |
| A4 continue | an edge with no charter: unlocked, `W_ATLAS_EDGE_UNLOCKED` | contradictions reported with proposals; a neighbour change reported with `editNeighbour` | `refuse.atlas.noCharter` (no edge at all can be read and the user asked for a matched continuation), `refuse.atlas.hostWorld` (host mode before H35) | a neighbour changed by the atlas |
| A5 fit | a mismatch warning (image only) | V13's `F-PLACE` offers (no lawful fit: the asked placement kept unlawful, the least-cost ones offered — V13 §3.11.1) | `refuse.atlas.fit.straddles`, `refuse.atlas.fit.covers`; V13's own refusals on the parent | the child changed; the parent re-bent later |
| A6 view | absent facts: neutral terms, the legend says so | a bake cut or folded: the magnification-only fallback, `W_ATLAS_WARP_FALLBACK` | — | a figure from a name; a DM-only row on a player viewpoint |
| A7 drill | — | — | `refuse.atlas.drill.unopenable`, `refuse.atlas.drill.audience` | an in-place zoom into a member's arena |

No member problem aborts an atlas: a missing, unopenable, stale or refused member is drawn as its state says and
reported; the only bug aborts (§5.1 (8)) are a tile pyramid index out of range (`E_ATLAS_TILE`) and a warp field whose
grid does not match its key (`E_ATLAS_WARP`).

### 3.9 Determinism (§6's form)

The atlas draws on one stream: `atlas.embellish` (a figure's jitter within its admitted region, keyed by the
viewpoint's lineage, the figure kind and the warp-grid cell on the atlas root's `atlas` concern, BCR-V15-12). A1 draws
nothing (the solver's tie-break: the lowest member ordinal, then the lexicographic id); A2 is V13's rendering (its own
determinism, T-V13-1); A3's blend is arithmetic in fixed order; A6's solve and integration run in fixed row-major
passes with every transcendental through `dmath` and the result quantised to integer centimetres; A4's charters are
V13's. Work limits: A1 ≤ `leastChange.maxIterations` × members²; A3 ≤ the visible tiles × the band's pixels × 3
levels; A6 ≤ `warpMaxMs` as a work count over grid cells × passes (never a timeout — F-WORK's `work_cut`, V13 §3.17's
rule); a limit reached is reported. T-V15-9 asserts byte identity of every record, tile and field across §13.2's
platforms, workers on and off.

### 3.10 Edges

(1) An atlas with no member — the empty state (V15 §5.1): the origin at (0, 0), nothing to render, **Add a world
map…** and **Make a world map** (V09's world dialog, the result added as the first member). (2) One member — no seam,
no solve; the relational view runs over it (J-V15.14). (3) Two copies of one world (a clone with a new `docId`, V13
§2.5) — two members; the same picture twice, each its own clock; no refusal (only the same `docId` is refused). (4) A
member of every rung at once — the pyramid's levels cover all; a province inside a continent is an inset by default.
(5) A member rotated by 37° — drawn turned, its labels with it; every seam it touches `W_ATLAS_NORTH_DIFFERS`; no
continuation or fit admits it until snapped. (6) A member deleted on disk — `missing`, its gap marked, its relations
and seams kept and marked (V15 §4.5). (7) A member of an older output version — `unopenable` with its cached picture;
drill-down opens the frozen view the base offers (§7.5). (8) An atlas opened on a machine without the local store that
holds its members — every member `unopenable`, the cached pictures drawn, every refresh reported; nothing lost. (9) A
viewpoint whose culture's member is removed — the viewpoint reads culture `none` and is reported. (10) The slider at 1
on the `true` preset — the identity. (11) A warp over a known region of one cell — the identity with the
magnification. (12) A continuation whose void is narrower than the neighbour's edge — the span is the void's side; the
rest of the neighbour's edge faces unknown space. (13) The lane's edge — a member that would cross ±21 474 km is
refused (`refuse.atlas.extent`). (14) A shared atlas opened by its recipient — read-only members, pictures only,
drill-down refused for the unresolvable (V15 §5.5). Each is one test of T-V15-17 (c).

### 3.11 A worked example (Ashmark, Varn, Thornwood, the Marches, Kesh)

**Ashmark** is a realm (1 280 × 800 km, 500 m cells, latitude box [30°, 55°]) on which a campaign stands at Year 412;
**Varn** a realm the same user made for another campaign, at Year 1 071; **Thornwood** the province the user wants
inside Ashmark's north-east; **the Marches** and **Kesh** do not exist yet.

1. **New world map** opens empty. **Add a world map…** → Ashmark drops at the origin (`addMember`, `by: 'direct'`); A2
   renders its stops 0 and 1 in the background (`ATLAS-2`: ≤ 1.5 s), its cartouche reads "Year 412, early spring".
2. Varn is added; the relations box takes "Varn lies east of Ashmark across a narrow sea" (the clerk's parse → the
   chips eastOf · acrossSea · narrow); **Arrange** solves: Varn's centre within 30° of east of Ashmark's, the facing
   edges 60 km apart (`seaNarrowKm`), a `sea` gap written between them; the compatibility check reads both members'
   east and west edge summaries: the latitude boxes equal, the vegetation classes within one — no warning. Had Varn's
   box been [5°, 30°], `W_ATLAS_LATITUDE` ("a 25° step across the sea") with `keep` and `setBox` (Varn's own dialog).
3. Thornwood does not exist: the fit sheet on a dragged rectangle inside Ashmark's north-east offers **Make a finer
   map here** (V15 §3.5 (a)): `requestCharter` with a world subject on Ashmark (a placement record on Ashmark, no
   geometry change), the world dialog pre-filled from the charter, Generate; Thornwood joins with `origin: 'derived'`,
   `parent` Ashmark, locked; the nested seam is a one-rung step, eased; Ashmark's two towns inside the extent: **Move
   the towns into the finer map** runs V13's `unplaceFrame` on Ashmark and `placeFrame` on Thornwood, each previewed on
   its page. Had the user already made Thornwood standalone and dropped it inside, the seam would read image-only with
   `W_ATLAS_MISMATCH` ("the coast lies 3 km from Ashmark's; a river enters where Ashmark has none"), and **Fit** would
   open V13's preview on Ashmark's page — the cost by term, a 4 km band, the conflict list for Ashmark's riverside town
   whose river the blend would move (the `ConflictChoice`s the ladder admits there) — committed there, the `FitRecord` written, Ashmark re-rendered, Thornwood untouched (T-V15-4).
4. **Continue here** on the void south of Ashmark at the realm rung: the void's north edge is Ashmark's south edge
   (1 280 km shared), one charter from `edgeCharter(Ashmark, 'S', { fromCm: 0, toCm: 128 000 000 })` (the full side), locked; the pre-fill: the latitude box
   continued to [5°, 30°] (Ashmark's 25° over 800 km, run on), a warmer climate band, wetness from the south edge's
   precipitation, ruggedness from the Greyspine running off the edge (the `collision` scenario, its mountain front where the charter's landform runs off at bearing 95°),
   sea share 0.1 (the edge is inland), the poles Ashmark's; the template left random (a record, not ground). The user also drags Varn south until its west edge
   meets the void's north-east corner; now two charters, and a contradiction: Ashmark's edge ends on an 1 800 m
   plateau at that corner where Varn's ends in sea — `W_ATLAS_EDGE_CONTRADICTS` proposes **a strait** at the corner;
   accepted. Send → the world dialog with two locked edge chips; Generate; **the Marches** joins with `origin:
   'continued'`, locked at the void, its recipe storing the two charters with Ashmark's and Varn's versions; Ashmark's
   and Varn's digests unchanged (T-V15-11). Its cartouche reads "Year 1, spring".
5. "Kesh lies far to the south beyond unknown lands": Kesh is made as an ordinary world (no shared edge), dropped
   beyond the Marches, the relation `beyondUnknown` solved (≥ 900 km, `terraIncognita` between) — no charter, no
   continuation: the user chose the unknown, not a seam.
6. **A year later** Ashmark's campaign advances 52 weeks, a flood raises a lake, the DM paints a clearing: Ashmark's
   version moves; the atlas re-renders Ashmark alone (`W_ATLAS_MEMBER_STALE`, then fresh), the Marches and Thornwood
   byte-equal (T-V15-1); the Ashmark–Marches drift reading: the coast unchanged, no river unmatched, the profile's RMS
   0 — no marker (the flood is inland and does not reach the edge; the clearing is land cover, a record: neither moves
   the charter, T-V15-2).
   Later the DM re-routes a river to leave Ashmark's south edge elsewhere: one river unmatched → the DM-only marker
   under Show drift; the Marches still reads "Year 1, spring"; **Re-match this edge…** on the Marches' side would run
   V13's regenerate over a 20 km strip of the Marches under Ashmark's live charter, previewed on the Marches' page —
   only if asked.
7. **The Ember Church's map** — a viewpoint (audience `party`, culture Ashmark's culture 2, preset `mappaMundi`): the
   centre resolves to Sarn (the religion lens's pilgrimage centre of the Church's patron), east up; Varn's lands (its
   allegiance at war with Ashmark's) take devils, the far southern sways of another culture at band 5 monstrous
   peoples; the sea between Ashmark and Varn is sailed → whales; the deep southern sea with no route → serpents; the
   Marches are known as far as the Church's missions reach in four weeks, then one heard-of band, then dragons; "The
   Wasting" (a plague realm arc 60 weeks ago at two seats) → two skulls; the legend reads "drawn as the Ember Church
   saw the world at Year 413: Sarn at the centre, east up, its enemies as monsters …". The slider at 0.6 swells Sarn's
   province to a third of the sheet; hovering the Sarn–Ashby road reads "312 km · 2 weeks 3 days on foot (the default
   law, absolute)"; a click on Varn's warped coast opens Varn's page at the true point (T-V15-12). **The party's map**
   (audience `party`, culture `none`, `true`): Varn, which the party has never heard of, is parchment.
8. **Sharing:** Varn is another user's shared world the user may not re-share → the share sheet excludes it (its
   extent "not shared"); the file carries Ashmark, Thornwood, the Marches and Kesh as pictures (T-V15-8).

## 4 Editing

Every edit of an atlas is one of §7.1's ordered events on the atlas's own log, with the dry run, the outcome table,
the closure rule, locality and undo the base gives every document (§7.1, §7.3, §7.4); the atlas's log is separate from
every member's, and no event below writes a member (V15 §1.1's package rule; T-V15-19). The base's `delete` and
`setAttr` serve the atlas's records as any; the atlas adds the kinds below (BCR-V15-4).

### 4.1 The edit events (declared in §7.1's form)

```ts
type EditEvent = EditBase & (
  // … the base's and V13's variants …
  | { t: 'addMember'; world: { doc: Uuid; namespace: string; ref?: string }; at?: AtlasPointCm /* the drop point; absent: the layout preset's next slot */; name?: NameRef; shareable?: boolean }   // the fold reads the world's header, rung, latBox, present and date through the resolver (read-only) and writes the Member with its first readings; refuses `refuse.atlas.duplicate`, `refuse.atlas.extent`, `refuse.atlas.members`, `refuse.atlas.unresolved` (the reference cannot be opened: a member may still be added from a shared atlas's embedded picture, state 'unopenable')
  | { t: 'removeMember'; member: Id; gap?: GapStyle['kind'] /* the gap left where it was; default 'blank' */ }
  | { t: 'arrangeMember'; member: Id; originCm?: AtlasPointCm; bearingCdeg?: Cdeg; snapTo?: { member: Id; side: 'N'|'E'|'S'|'W' } /* the edge the drag snapped to, so the fold can offer the `adjacent` chip */; accept?: ('overlap'|'latitude'|'climate'|'north')[] /* the warnings the DM accepted */ }
  | { t: 'lockMember'; member: Id; locked: boolean }
  | { t: 'relate'; relation: Omit<Relation, 'id' | 'lifecycle' | 'reason'>; solve?: boolean /* true: the fold runs A1's solve at once; false: stored, the box shows it unmet until Arrange */ }
  | { t: 'unrelate'; relation: Id }
  | { t: 'arrange'; scope?: Id[] /* the members the solve may move; absent: every unlocked one */; accept?: string[] /* warnings accepted */ }   // the relations box's Arrange: A1's solve over the stored relations; the dry run returns the ghost arrangements, the verification list and the warnings
  | { t: 'setLayoutPreset'; preset: 'clustered'|'archipelago'|'scattered' }
  | { t: 'setGapStyle'; gap: Omit<GapStyle, 'id' | 'lifecycle' | 'reason'> } | { t: 'removeGap'; gap: Id }
  | { t: 'setConflictSettings'; settings: Partial<ConflictSettings> } | { t: 'setAtlasStyle'; style: Partial<AtlasStyleState> }
  | { t: 'requestContinuation'; action: 'draft'; void: { at: AtlasPointCm; rung: WorldSizeRung } }   // A4's fold: the void, the charters, the prefill, the contradictions; the dry run shows the void's outline and the edge chips
  | { t: 'requestContinuation'; action: 'send'; request: Id; accepted: { contradiction: number; proposal?: ContinuationRequest['contradictions'][number]['proposal'] }[]; dropped: Id[] /* the requirements dropped at W_ATLAS_NEIGHBOUR_CHANGE */ }   // opens V09's world dialog with the request; the member is added by the dialog's generate through `addMember` with origin 'continued'
  | { t: 'requestContinuation'; action: 'cancel'; request: Id }
  | { t: 'fitChild'; child: Id | { extent: AtlasPointCm[]; rung: WorldSizeRung } /* a derived child names its extent, not yet a member */; parent: Id; mode: 'derivedFromParent'|'imageOnly'|'fitted'; parentEdit?: { placement: Id; seq: number } /* mode 'fitted' or 'derivedFromParent': the parent's committed V13 event the atlas records (never performs) */ }
  | { t: 'rematchStrip'; seam: [Id, Id]; member: Id /* the ONE member whose border strip is re-matched */; stripKm: number }   // a request record: the fold opens the member's own page with V13 §3.1 (6)'s re-matching (file r item 1008): `setRequirements` replacing that side's `edge` rows by the neighbour's live charter, then V13's regenerate over the strip's box (EditScope { kind: 'world'; stage: 'W1'; box }) under the recipe's rows, previewed there; nothing happens in the atlas but the record and, on the member's commit, a refresh
  | { t: 'setViewpoint'; action: 'add'; viewpoint: Omit<Viewpoint, 'id' | 'lifecycle' | 'reason'> } | { t: 'setViewpoint'; action: 'update'; viewpoint: Id; patch: Partial<Viewpoint> } | { t: 'setViewpoint'; action: 'remove'; viewpoint: Id }
  | { t: 'setEmbellishment'; action: 'add'; embellishment: Omit<Embellishment, 'id' | 'source' | 'lifecycle' | 'reason'> } | { t: 'setEmbellishment'; action: 'move'; embellishment: Id; at: AtlasPointCm; facing?: Cdeg; sizeCm?: Cm } | { t: 'setEmbellishment'; action: 'remove'; embellishment: Id } | { t: 'setEmbellishment'; action: 'restore'; embellishment: Id }
);
```

`setAttr` admits a member's `name` and `shareable` (narrowing only: a value wider than the world's own sharing is
refused `refuse.atlas.share`), a gap's `label`, a viewpoint's `name`, a seam's `treatment` (`ease` | `inset`, keyed by
the pair). Every event's dry run (§7.1) runs the fold on the scratch overlay: `arrangeMember`'s and `arrange`'s with
the ghost outlines, the compatibility warnings and the verification list; `requestContinuation`'s with the void's
outline, the edge chips and the contradictions; `fitChild`'s with V13's own preview on the parent (mode `fitted`,
`derivedFromParent`) or the mismatch reading (`imageOnly`). **The outcome table's new rows** (§7.1's catalogue;
BCR-V15-4; the refusals §7.1 outcome keys rendered by V09's catalogue, never `ReportCode`s — V13 §4.1's rule):
`refuse.atlas.duplicate`, `refuse.atlas.extent`, `refuse.atlas.members`, `refuse.atlas.unresolved`,
`refuse.atlas.share`, `refuse.atlas.noCharter`, `refuse.atlas.hostWorld`, `refuse.atlas.fit.straddles`,
`refuse.atlas.fit.covers`, `refuse.atlas.drill.unopenable`, `refuse.atlas.drill.audience`, `refuse.atlas.export` (a
world-shaped export asked of an atlas, V15 §5.5); the warnings with their `ConflictAction`s — `W_ATLAS_OVERLAP`
(`keep`, `inset`, `move`), `W_ATLAS_LATITUDE` (`keep`, `setBox`), `W_ATLAS_CLIMATE` (`keep`, `drop`),
`W_ATLAS_NORTH_DIFFERS` (`snap`, `keep`), `W_ATLAS_RELATION_UNMET` (`keep`, `drop`, `unlock`), `W_ATLAS_LOCKED_MOVE`
(`unlock`, `cancel`), `W_ATLAS_EDGE_CONTRADICTS` (`accept` with `proposal`, `move`, `drop`),
`W_ATLAS_NEIGHBOUR_CHANGE` (`drop`, `editNeighbour`), `W_ATLAS_MISMATCH` (`fit`, `keep`), `W_ATLAS_MEMBER_STALE`
(`refresh`, `keep`), `W_ATLAS_MEMBER_MISSING` (`remove`, `keep`), `W_ATLAS_NOT_SHARED` (`keep`, `include` where the
world's own sharing allows) — `ConflictAction.kind` gaining `'inset'|'move'|'setBox'|'drop'|'unlock'|'snap'|'accept'|
'editNeighbour'|'fit'|'refresh'|'remove'|'include'` and `proposal?: string` (BCR-V15-4). The author of every atlas
event is the user (`EditBase.author` `user`), of the continuation's generated member's `addMember` the dialog
(`user`); no event of an atlas carries `author: 'host'` or `'world'`, and the atlas's log has no reserved session.

### 4.2 The authoring tools (V09's binding table; RQ-V15-7)

| tool | mode on the atlas document | what it shows while the user works |
|---|---|---|
| T1 `intend` | the atlas's settings sheet: the conflict settings, the style state, the layout presets, the common-week toggle | the member count, the plane's extent, the imagery cache's size |
| T2 `ground` | the **gap brush** (a region, "between these two", "around this side"; the kind picker) | the gap's fill previewed |
| T6 `place` | **Arrange**: a drag of a member (edge snapping with the `adjacent` chip; the ruler), the rotation handle (right-angle snaps), the lock; **Add a world map…** (the recent list, a file, a link; a drag of a world's card); **Continue here** on a void; the **embellishment tray** (the DM) | the ghost outline, the snap chip, the compatibility warnings beside the pointer; the void's outline with its edge chips; a figure's ghost |
| T7 `roster` | the **relations box**: chips (member · relation · member · width or side), or a typed sentence sent to the clerk's parse (V10), each relation's met/unmet mark, **Arrange** | the solve's dry run as ghost outlines with the verification list |
| T9 `shape` | `setAttr` on a member, a gap, a viewpoint, a seam's treatment; the **fit sheet** on a nested member (three cards; the fitted card opens V13's preview on the parent's page); **Re-match this edge…** on a seam; the **viewpoint picker** and its New viewpoint sheet; the **style cards** | the fit's preview on the parent's page (V13's own); the viewpoint's resolved centre and known region outlined |
| T10 `hold` | **Refresh** a member's picture; **Keep detail** (`pinImagery`); **Bake** the relational warp; the slider's rest position | the stale marks; the bake's progress strip |

The view bar gains the **relational slider**, the **viewpoint picker**, the **common-week toggle**, **Show drift** and
**Show relations** (the DM), and the date cartouches' switch (V15 §2.7's keys). The compass rose turns with the
viewpoint's orientation (derived presentation, §9.5's rule as V13 §3.11.5 turns it for a placement).

### 4.3 Locality (§7.3's form): effective scope, local operators, what is pinned

| edit reaches | local operator | pinned | beyond it (declared, never presented as local) |
|---|---|---|---|
| `addMember` | A2 for the member (its stops rendered in the background); A3 over the seams it creates; A1's compatibility check over its neighbours | every other member's arrangement and imagery; every relation | — |
| `removeMember` | the member tombstoned, its imagery dropped, its relations and fit tombstoned, its gap written; A3 over the seams it had | everything else | — |
| `arrangeMember`, `lockMember` | A3 over the seams the member leaves and enters; the compatibility check over its new neighbours; the inset layouts it touches | every other member; every relation (a relation it now breaks is marked unmet, never re-solved unasked) | — |
| `relate`, `unrelate` (with `solve: false`) | the record alone; the box's marks | every arrangement | — |
| `arrange`, `relate` with `solve`, `setLayoutPreset` | A1's solve over the unlocked members in scope; A3 over every seam that changed | locked members; every relation outside scope; every member's imagery | a preset re-places every unlocked member: declared whole-atlas |
| `setGapStyle`, `removeGap` | A3's fill over the gap's region | everything else | — |
| `setConflictSettings` (`seamPrecedence`, `missing`, `commonWeek`), `setAtlasStyle` | A3's precedence over equal-rung seams; A2 for every member when the common week changes (the week argument) | the arrangements | the common week re-renders every member whose present differs from it: declared whole-atlas (background) |
| `requestContinuation` | the request's records; the void's outline | every member (the neighbours are read, never written) | the generated world is V13's `generate`, on its own document |
| `fitChild` | the record; A2 for the parent (its version moved) and the child; A3 over the nested seam | every other member | the parent's placement is V13's edit on the parent: declared there, with V13's budget |
| `rematchStrip` | the request record; on the member's commit, A2 for that member and A3 over the seam | the neighbour (never touched) | the member's regenerate over the strip is V13's edit on that member, previewed there |
| `setViewpoint`, `setEmbellishment` | the viewpoint's warp field, known region and derived figures invalidated (re-baked on request) | every member's imagery; every other viewpoint | — |
| `refreshImagery`, `pinImagery`, `bakeWarp` (cache commands) | the member's imagery; the viewpoint's field | every record | — |

**Edit fates** (§7.3's `EditFate`) on an atlas re-run: a member `kept`; an arrangement a solve moved `reshaped` with its
displacement; a relation it could not meet `kept` and marked; a gap written by a solve `created`; a seam's treatment
override `carried` by its pair; a derived embellishment `discarded` and re-derived. **Recorded inputs** of the atlas are
its members' references, its relations, its gaps, its viewpoints, the DM's embellishments and the carried charters.

### 4.4 Undo

Every event's undo is V15 §1b.3's row: the replaced scope (a solve, a preset — one group restoring every arrangement
it moved) or the inverse (an attribute, a lock, a relation). A `removeMember`'s undo restores the member, its
arrangement, its relations, its fit and its gap's absence, and its imagery from the cache if still held (else
re-rendered). The atlas and every member have **separate logs and separate undo stacks** (§7.4's per-document
sessions; V13 §4.4's pattern): the parent's placement in a fit and a member's re-matched strip are undone on **that
document's** page by its own undo, and the atlas's `FitRecord` or `rematchStrip` record is undone on the atlas — the
two are not one group (J-V15.9: the atlas never holds a member's event, so it cannot undo one; a parent's placement
undone there leaves the atlas's fit record stale, reported `W_ATLAS_MEMBER_STALE` with `refresh`, which re-reads the
parent's version and marks the fit `mode: 'imageOnly'` with its mismatch recomputed). A continuation's generated world
is a document of its own: undoing the `addMember` that admitted it removes it from the atlas and never deletes it.
Cache commands are not events and have no undo. T-V15-17 (d) replays every edit kind forward and back.

### 4.5 When a member is deleted (F15: a marked gap, never a silent hole)

A world document deleted outside the atlas — in the local store, in the host, on disk — is found at the atlas's next
open or refresh: the resolver answers nothing, the member's `state` reads `missing`, `W_ATLAS_MEMBER_MISSING` is
raised with `keep` (the default) and `remove`. **Kept**, the member stays in the atlas with every relation, seam and
fit it had, its last imagery drawn by `ConflictSettings.missing` — `ghost`: the picture at `missingGhostAlpha` under a
hatched frame with the words "missing map: {name} (last seen {version}, {dateLabel})"; `blank`: the hatched frame and
the words alone — in every atlas that held it; its relations are marked unmet, its seams keep their last drift,
drill-down refuses with the gap's words; a world restored later (the same `docId`) is found again at the next open and
the member reads `present`, its imagery refreshed. **Removed** (`removeMember`), the gap becomes a `GapStyle` of the
kind chosen (`blank` by default) where the member lay, its relations tombstoned; the removal is one undoable event. A
member removed from one atlas is untouched in every other (an atlas holds only references). T-V15-7.

### 4.6 When a member's version changes (re-render; never re-fit)

A member's live version — its model and records digests, `logHead`, `geometryVersion`, `outputVersion` — is compared
with the atlas's recorded one at every open, at every `refreshImagery` and whenever the session's bridge reports the
member's log head moved (§11.3's `logHead`). A difference: marks every cached stop stale (`W_ATLAS_MEMBER_STALE`, the
stale mark on the member card and its cartouche; the stale picture still drawn), re-renders the member in the
background (A2) and replaces its tiles stop by stop, re-reads the member's present week, date label and known sets,
re-computes the seams' drift readings and the viewpoints' known regions, invalidates the warp fields that read it, and
**does nothing else**: no re-solve of the arrangement (a member that grew by a world `adjust` keeps its origin; its new
extent may now overlap a neighbour — `W_ATLAS_OVERLAP` on the next check, the DM's to resolve), no re-fit of a child
or a parent (the fit record stands with its versions; the nested seam's drift reading says how far they have drifted),
no re-match of any seam, no re-draft of a continuation request already sent. The one write of a version change is the
member's recorded readings and its cache — outside every digest (V15 §2.11). T-V15-22.

### 4.7 Microcosms (F14; spine §10.5)

1. **Nothing crosses a seam after generation.** No event of an atlas and no refresh of a member reads one member to
   change another; the only reads across members are the seams' drift readings (information), the continuation's
   charters (at the new member's generation, before it exists) and the fit's mismatch and placement (at the fit, the
   user's explicit act on the parent). T-V15-1 asserts: an edit of any kind on one member leaves every other member's
   model and records digests byte-equal and the atlas's model digest byte-equal.
2. **Each member runs its own clock.** The imagery is at the member's present (V15 §3.2 (4)); the **date cartouche**
   on each member (under `AtlasStyleState.dateCartouches`) prints V13's date label for that member — "Year 412, early
   spring" — in the viewpoint's lettering; two members' cartouches may differ by centuries, and the atlas says nothing
   of it (there is no atlas clock to disagree with). A member advanced by its host moves its own present and its own
   picture; its neighbours do not move.
3. **Seams drift; the atlas softens.** V15 §3.3 (3): the drift readings, the DM-only markers under `showDrift`,
   information only; re-matching only on request through `rematchStrip` — one member, one strip (`stripKm` wide along
   the seam), V13 §3.1 (6)'s re-matching on request (file r item 1008): `setRequirements` replacing that side's `edge`
   rows by the neighbour's live charter, then V13's regenerate over that box (`EditScope { kind: 'world'; stage: 'W1';
   box }`, V13 §4.1) under the recipe's rows, previewed on the member's page and committed there; the neighbour
   untouched.
4. **The common-week display is an option, not the default.** `ConflictSettings.commonWeek` and the view's
   `commonWeek` key: every member whose present reaches the chosen week is rendered at it (`renderAt` with `week` —
   V13's own history for the `atlas` set's layers that keep one: the dated surfaces, the routes in force, the sway's
   revisions, the events up to the week and the cover plate at the week; the physical layers as they stand); a member whose present lies before it is drawn at its own present with
   `W_ATLAS_BEHIND_WEEK` on its cartouche ("at its own present, Year 412 — this map has not reached Year 1 071"); never
   extrapolated (V13 §5.8 (3)). Off (the default), each member is at its own present. T-V15-3.

### 4.8 The clerk's view and the catalogue (V10 §3.9, §3.9a; V09 §4.9)

The `atlas` `WhySectionProvider` answers `why` for a member ("here because you placed it; locked; continued from Varn's
east edge at version 12"), a relation ("Varn east of Ashmark: met — Varn's centre lies 14° north of east; the sea
between is 80 km, asked narrow (60)"), a seam ("softened over 24 px; Thornwood wins, two rungs finer, drawn as an inset;
drift: the coast 2.1 km apart since version 9"), an embellishment (V15 §2.8's sentence), the warp ("the centre is Sarn
by the holy-city rule; the ten largest: …"), a continuation ("edge N from Varn, locked, 212 km shared; contradiction
at the NE corner: Varn's sea meets Kesh's plateau — a strait proposed"); `whatChanged` over the atlas's log and
`whatIf` over a solve's dry run; `propose` parses a typed relation (RQ-V15-8: "Varn lies east of Ashmark across a narrow
sea" → the chips, confirmed by the user). The catalogue's new keys (V09 §4.9's families; RQ-V15-7): `info.atlas.*`
(the member added, the solve's summary, the continuation drafted, the fit recorded, the stale mark, the missing mark,
the behind-week mark), `bend.atlas.*` (an unmet relation kept, an overlap kept, an inset chosen), the `refuse.atlas.*`
rows of V15 §4.1 each with at least one button (T-V9-13's rule), `share.atlas.*` (the share sheet's member lines), the
legend's notes (V15 §3.6 (8)) — English, our own words, lint-checked (V15 §3.6 (5)).

### 4.9 Loading older documents, and the unsaved form (§7.5)

An atlas has no older form before this volume; its schema chain starts here. A member whose world's `outputVersion`
lies outside the retention window reads `unopenable` with its cached picture (the base's frozen view for the member
when drilled, §7.5); a member whose charter version is older than V13's current one migrates through V13's chain when
re-read. An atlas file without `atlasImagery` (dropped by a quota, V15 §2.11) opens with every member stale and
renders what it can. **The unsaved form** (J-V15.14's one-member atlas from the world page; a fresh "New world map"
before its first save) is a session document as V09 §3.2's empty-state town is: held in the local store's draft mirror,
added to the recent list on its first edit or save, never written to the host before **Save as a world map**.

## 5 Rendering, labels and exports

### 5.1 The atlas page (V09 hosts it; RQ-V15-7)

The atlas is a document page of V09's shell (V09 §5.1's frame: the canvas, the rail, the view bar, the context panel,
the drawers), opened from **Open a world map…** / **New world map** (V09 §5.13's rows gain them; the labels follow the
owner's product word, V15 §11 Q1), from a world page's **View relationally…** (J-V15.14) or from a shared atlas file.
**What a person sees when they open it:** the members' pictures laid on parchment at the zoom that fits them all, the
seams softened, the gaps in their styles, each member's date cartouche in a corner of its extent, the scale bar and the
compass; the member list in the context panel (a card per member: its thumbnail, name, rung, date, version, the stale
or missing mark, the lock, the shareable flag, Refresh, Keep detail, Remove); the relations box (T7's) with its chips
and Arrange; the view bar's slider, viewpoint picker, common-week toggle, Show drift and Show relations. **The empty
state** (no member): the parchment, **Add a world map…** and **Make a world map** (V09's world dialog; its result the
first member), nothing else. **The controls' semantics are this volume's** (V15 §3–§4); V09 draws them and decides
none of their rules, as it draws V13's lens controls (BCR-V13-39's pattern). The page is standalone and host-mode alike
(V09 §2.2); in host mode its members resolve through the host's resolver (§11.5) and the page is read-only for a viewer
role. **The page's frame** (V09 §5.1's regions, unchanged): the canvas fills the frame; the rail holds T1, T2, T6, T7,
T9 and T10 as V15 §4.2 binds them; the view bar's **Atlas** group holds the relational slider (0–1, the preset's name
beside it), the viewpoint picker (the atlas's viewpoints and **New viewpoint…**), the common-week toggle with its week
field, **Show drift** and **Show relations** (the DM), **Cartouches**; the context panel opens on the **Members** tab
(the cards), the **Relations** tab (the box), the **Seams** tab (every seam with its treatment, its precedence and its
drift) and the **Viewpoints** tab (the picker's long form: audience, culture, centre rule, orientation, preset, as-of
week, knowledge source); the hover card shows the true readout; the status strip shows the stale count and a bake's
progress. Below 600 × 480 CSS px the medium layout holds and the page scrolls (V09's J-V9.9).

### 5.2 The atlas view: layers and styles (§8's pipeline; BCR-V15-6)

The atlas renders through the base's tile pipeline (§8.1) with its own layer set, declared as `LayerSpec` rows of the
`atlas` product (the structural layers always draw; the view keys choose the rest):

| layer | kind | draws | style row |
|---|---|---|---|
| `parchment` | fill | the atlas's background: the `everywhereElse` gap's kind (terra incognita's parchment by default) | `style.atlas`'s gap rows (`atlas.seams.gapFills`) |
| `gaps` | fill | every `GapStyle` region by its kind | the gap rows |
| `members` | raster | every member's composed tiles at the level, the seams softened, insets framed, missing members by `ConflictSettings.missing`; under a relational viewpoint drawn through the mesh warp | — (the members' own pictures) |
| `insets` | vector | the inset frames and locator boxes (`InsetLayout`) | `insetFramePx`, `locatorBoxPx` |
| `labels` | the base's label layer | the members' placed labels after A3 (5)'s cross-seam placer run; the gaps' labels; under a preset, the preset's lettering and angle rule | the preset's `lettering` |
| `cartouches` | vector | each member's date cartouche ("Year 412, early spring"; stale and behind-week marks), the viewpoint's cartouche and the title | the preset's lettering |
| `furniture` | vector | the preset's furniture: rhumb lines and roses, the T-O rim, the itinerary strip's spine and day counts, ships; the base's scale bar (true, always), the compass under the orientation, the grid, the legend with its honesty note and, where a member's picture carries the cover overlay, the one line "derived land cover" (V13 §5.8 (9); J394) | the preset's `furniture` rows |
| `embellishments` | pins | the derived and the DM's figures at their warped points, sized by the preset | the figure rows' assets |
| `drift` (DM-only, `showDrift`) | pins | a tick at each seam's midpoint above threshold with its figures | the notice style |
| `relations` (DM-only, `showRelations`) | vector | dashed lines a → b with the kind's glyph, red where unmet | the notice style |
| `ruler` | vector | the pinned point and the pointer's line on the true plane, unwarped through the view, with the distance | the base's ruler |

The view's transform is the base's integer-cm viewport (§8.1) on the atlas plane, as V13's world view is on the
world's, plus the **mesh warp** of V15 §3.6 (1) under a relational viewpoint: the tile quads subdivided and their
vertices mapped through W_s on the GPU path, the canvas backend drawing each sub-quad affinely (a declared
approximation: ≤ 1 px error at n = 8, T-V15-13 (c)). The tile cache is keyed by (member, version, audience, week,
stop) for the members' tiles and by (atlas model digest, imagery versions, level, viewpoint, s, preset) for the
composed tiles. **The player picture** is V15 §5.4's.

### 5.3 Labels

A member's labels are its own, placed by V13 at the stop and shipped as pixels with their boxes (V15 §3.2 (3)); the
atlas never re-places a label inside a member — it drops a yielding member's labels across seams (A3 (5)), drops every
label of a heard-of or unknown region but seats' (V15 §3.6 (2)), and re-lays, under a preset with an angle rule
(coast-perpendicular names in the portolan), only the labels the preset names, from their text and anchor through the
base's placer with the preset's face (§9.2's metrics). The gaps' labels, the cartouches, the figure captions and the
itinerary's day counts are the atlas's own label candidates (§9.1's `LabelEntity` form) placed by the base's placer at
the atlas stop with `labelSpreadPx`; positions cached per (atlas model digest, imagery versions, level, viewpoint).
A rotated member's labels turn with its tiles (they are pixels); under a map rotation (`rotation`) everything turns.

### 5.4 Player views (spine §10.7)

A player sees only what their party knows, drawn in their culture's style if the relational style is on; the DM's
arrangement is the true layout. Concretely: the viewpoint's audience (`party` or `public`) selects, per member, the
imagery V13 rendered for that audience (the player picture, V13 §5.1 — never re-filtered here) and the known sets it
returned; a member the audience knows nothing of (no seat, place or event in its known set) is drawn only as the
preset's unknown treatment (blank, legend or figures) — not at all under `true`; the known region (V15 §3.6 (4))
governs blur and labels; every atlas record below the viewer's key is withheld by the admission function (§9.2): the
relations and drift readings (`secret`), the DM's viewpoints not marked shared, a hidden embellishment, a member's
version and state words; the member list shows a player the members they know by name only; drill-down follows V15
§3.7's audience rule; a figure derived from a DM-only row never draws (V15 §3.6 (5)). **The player's style:** a party
viewpoint's preset is the DM's choice for the party (the default `true`); "as their culture would draw it" is a party
viewpoint with a culture and a relational preset. A picture export under a player viewpoint carries the same
admission (§11.1's knowledge rule); a `.dd2vtt` export does not exist for an atlas (V15 §5.5).

### 5.5 Exports and sharing (§11.1's pipeline; BCR-V15-6)

| export | shape | contents | rule |
|---|---|---|---|
| the picture exports | the base's (§11.1: PNG at any DPI, the print presets, SVG, PDF of the view at a level) | the atlas view **as drawn**: the composed tiles, the seams softened, the gaps, the cartouches, the furniture, the embellishments, under the request's viewpoint, slider position and preset; the warp applied as the mesh warp (SVG: the tiles as warped images, the vector furniture through W_s); the legend with its honesty note; the provenance block names the atlas's digests, every member's version and the renderer version | §11.1 unchanged; the atlas is one more document kind; the knowledge key admits as V15 §5.4 |
| `atlasTiles` | a zip of the composed tile pyramid (PNG tiles per level over the members' extent) with a manifest (the levels, the tile scheme, the atlas origin, the metres per pixel per level, the members' extents, versions and shareability) | the true plane only (no warp: a tile set is a map, not a picture of one); the audience's imagery; unshareable members' tiles omitted and their extents listed as "not shared" | own; for a VTT's world map or a web page; `ExportOpts.atlas.tiles { levels; audience }` |
| `atlasGeoJson` | a FeatureCollection in the atlas plane's metric coordinates (the metric variant of §11.1's GeoJSON; no geographic anchor) | every member's extent as a Polygon with `rung`, `version`, `origin`, `shareable`; every gap, inset frame and (DM key) relation and drift reading; every embellishment as a Point with `kind`, `source`, `derivedFrom`; no member content | own |
| **the world shapes** (`ecosystemJson`, `ecosystemGeoJson`, `heightmap16`, `worldCsv`) | — | **refused** on an atlas (`refuse.atlas.export`: "a world map is pictures of maps; export each map from its own page") | V15 §1.4; J-V15.20 |
| the `.plat` atlas and the shared atlas | §2.9's container; the share writer's form (V15 §2.11) | the records; the imagery cache embedded for shareable members only | the share sheet (below) |

**Sharing** (F15; spine §10.1's last sentence). The share sheet (V09 §5.11) on an atlas offers: (1) **Link** — a
permalink when §6.4 allows one (an atlas with no imagery is a short recipe: its members by reference, which the
recipient must be able to resolve; the sheet says which members the recipient will see as pictures and which not at
all), else the atlas file; (2) **Picture** — one PNG of the current view, "What it shows" defaulting to what anyone
knows (V09's J-V9.13); (3) **World map file** — the shared atlas: the sheet lists every member with its shareable
state — a member whose world the user may share (its own sharing allows it: a published world, the user's own
standalone world; in host mode the host's gallery rule once H35 lands, until then the user's own worlds only) is
included with its imagery; a member the user may not share is **excluded** — no reference, no picture, its extent a
gap marked "not shared" (`W_ATLAS_NOT_SHARED`, `include` only where the world's sharing allows) — so **sharing shares
imagery only for members the user may share**, never a member's data (the atlas holds none) and never an unshareable
member's picture (T-V15-8); a host that configures a publishing resolver adds (4) **Publish a link** (§11.5), under
the host's own access levels and, across campaigns, the owner's rule (V15 §11 Q2). A recipient's atlas is read-only
(`shared: true`): pictures, arrangement, viewpoints; drill-down only into members the recipient can resolve.

### 5.6 Accessibility, the clerk's rendering, and no 2.5D

Every layer has the base's high-contrast variant (§8.3); the gap kinds carry a pattern beside their colour (waves,
hachure, stipple, blank) and the member marks (stale, missing, behind-week, not shared) a glyph beside their tint so
each reads without colour (g item 112's second cue); the relational view's legend and every readout are text; the
screen-reader summary (V09's) lists the members by name, rung and date, the relations, and the viewpoint drawn. The
atlas has **no 2.5D view**: its drawables are imagery and furniture, each registered with `ZDecl { flat: true;
reason: 'imagery' }` (V14 §5.4's rule; BCR-V14-5's lint passes), and the `projection` key is ignored on an atlas page
with `info.atlas.flat` ("a world map is pictures: open a map to see it in 2.5D"); the drill-down's member page has
V14's view.

## 6 Performance budgets (§12's form)

**Reference hardware and method** are §12.1's; the measure is the tile worker's and the generation worker's wall clock
at p95 over five atlases of the fixture set (V15 §7), nightly; the laws are declared over the member count `m`, the
visible tiles `v` (≤ 48 at a 2 560 × 1 440 view), the band's pixels and the warp grid's cells.

| row | what | budget (p95) | law | pre-decided fallback |
|---|---|---|---|---|
| `ATLAS-1` | A1's solve over `m` members with `r` relations | ≤ 200 ms at `m` 32, `r` 64; the live preview ≤ 60 ms | ≤ `maxIterations` × m² × 10 ns + r × 2 µs | the live preview evaluates rank 3 only, the full ladder on Arrange |
| `ATLAS-2` | A2's `renderMember` at stops 0 and 1, per member, in the background | province ≤ 0.6 s, realm ≤ 1.5 s, continent ≤ 3.5 s (V13's `renderAt` over 1.0625 × stop 1's pixels — stop 1 plus stop 0 at a sixteenth, stop 1 one to one at the native level 6 / 5 / 4 of §3.2 (2)'s table: `WORLD-8`'s first frame ≤ 400 ms for 16 tiles at stop 0, scaled by the tile count at stop 1 — PLAUSIBLE until SA0) | ≤ V13's tile law × the tiles | stop 1 rendered as the view asks for its tiles (per visible tile) and cached as it lands |
| `ATLAS-3` | A3's seam blend per composed tile at a level | ≤ 2 ms per tile pair with a band; a frame's composition ≤ 16 ms at `v` 48 with ≤ 12 banded tiles | ≤ 25 ns × the band's pixels × 3 levels | the band's pyramid at two levels on the low tier |
| `ATLAS-4` | A4's draft: the void, up to four `edgeCharter` reads, the prefill, the contradictions | ≤ 100 ms + 4 × V13's `edgeCharter` (requested ≤ 200 ms per edge, RQ-V15-1) ≈ ≤ 0.9 s | — | the charters read in the background, the edge chips landing one by one |
| `ATLAS-5` | A5's fit: V13's rung-general `placeFrame` dry run on the parent for a province child in a realm parent | ≤ 3 s preview (P1 over the child's ring at the parent's cells + P2 over an 8-cell band + P3 over the dirty watersheds — V13 §6's placement laws scaled by the child's ring stations ×  the band's cells; PLAUSIBLE until SA1); the commit ≤ 5 s | V13's | the preview on the coarse rung (V13 §4.5's fork at the parent's coarse raster), the fine run at commit |
| `ATLAS-6` | the imagery cache on disk | province ≤ 1 MB, realm ≤ 4 MB, continent ≤ 10 MB per audience at stops 0–1 (lossy 85); a pinned stop 2 ≤ 16 × its stop 1 (4 × per axis; on demand from level 8 / 7 / 6, §3.2 (2)); the records ≤ 1 MB at 64 members | ≤ 0.6 B × the cached pixels | `lossyQuality` 75 on the low tier; the cache dropped by quota (V15 §2.11) |
| `ATLAS-7` | A6's bake: the Poisson solve, the flow integration, the Jacobian check at `warpGrid` 512 | ≤ 1.5 s (the multigrid solve ≈ 10 × 30 ns × 262 k cells ≈ 80 ms; the integration 64 steps × 262 k vertices × 12 bilinear reads — four velocity evaluations of three reads each — ≈ 0.6–0.9 s; PLAUSIBLE until SA3); the progress strip past 1 s | ≤ 12 ns × cells × (passes + 12 × steps) | `warpGrid` 256 on the low tier; `flowSteps` 32; the magnification-only fallback at the work cut |
| `ATLAS-8` | the per-frame mesh warp and composition under a relational viewpoint | ≤ 6 ms per frame at `v` 48, n ≤ 8 (the slider free at 60 Hz); `unwarp` for the readout ≤ 0.2 ms | ≤ v × n² × 0.5 µs | n capped at 4 on the canvas backend |
| `ATLAS-9` | the atlas page's first frame with cached imagery; the drill-down's handoff | ≤ 600 ms at 16 realm members (the composed tiles at the fit-all level from the cache); the handoff ≤ V13's page open + 50 ms | — | the first frame draws stop 0 only, stop 1 following |
| `ATLAS-10` | memory, all threads, excluding canvases: the decoded visible tiles (an LRU of ≤ 256 tiles ≈ 64 MB), the warp fields (≤ 8 MB each, ≤ 3 resident), the records (≤ 2 MB), the read-only member handles' working sets (V13's `WORLD-5` per **open** member: at most one member's rasters resident at a time for a render, released after) | ≤ 96 MB beside one open member's line (§12.8's world line unchanged: a member rendered counts under it, in turn; BCR-V15-8) | — | the LRU halved on the low tier; one member handle at a time (already the rule) |

**Edits** (§12.6's form, flat across member counts): `addMember` ≤ 50 ms + its render (background); `arrangeMember` ≤
20 ms + the seams it touches (≤ 2 ms each); `setGapStyle` ≤ 10 ms; `setViewpoint` ≤ 5 ms (the bake on request);
`setEmbellishment` ≤ 5 ms; `removeMember` ≤ 30 ms. **The view:** pan and zoom at §12.5's frame budget over cached
tiles; a stop-2 tile rendered on demand for an openable member ≤ V13's tile law per tile, drawn as it lands.
**Exports:** a picture at A2 300 dpi ≤ §11.1's print budget + the warp's mesh (≤ 1 s); `atlasTiles` at 16 realm
members, levels 0–6 ≤ 10 s on the export worker. **The comfort level** (§12): opening an atlas, adding a member, a
solve, a bake and an export each finish inside ten seconds from the click, the renders excepted (background, the
stale picture shown meanwhile). Each row has its T-V15 clause (T-V15-15); the register holds `ATLAS-1` – `ATLAS-10`
(BCR-V15-8).

## 7 Tests and acceptance bars

Every test is a `T-V15-n` row of §13's suites (BCR-V15-9 adds them to §13.2's families); the fixtures are our own
(`fixtures/atlas/*.json`; RQ-V15-10), never a captured map. **B-ATLAS** is the fixture set: three worlds of B-WORLD-lite (V13
§7) — a province **P**, a realm **R**, a continent **C** — plus **R2**, a realm continued from R's east edge (V15 §3.4;
built once at M-ATLAS-B and frozen with its carried charters), **P-in-R**, a province derived from R (V15 §3.5 (a)),
**P2**, a separate province dropped inside R (image-only, then fitted), and for R a scripted lens window set of
B-POLITY's kind (V13 §7): two cultures (ids only, their labels deliberately set to real-looking words the lint must
ignore), two allegiances at war, culture bands 1–5 between seats, a faith hierarchy with a pilgrimage centre, an
entrepôt, a plague realm arc and a razing, a party key with three places. The atlases: **B-ATLAS-1** (R and P side by
side, `adjacent`), **B-ATLAS-2** (C with R and P-in-R nested), **B-ATLAS-3** (R and R2, continued), **B-ATLAS-16**
(sixteen realm clones for the budgets), **B-ATLAS-SHARE** (R shareable, P not, C missing), **B-ATLAS-VIEW** (R alone
with the lens set, four viewpoints: the DM's, the party's, a culture's mappa mundi, the same culture as of a past week).

### 7.1 Isolation, time, the charter, the fit (F11, F13, F14)

| id | what it asserts | how |
|---|---|---|
| T-V15-1 (isolation after generation) | (a) on B-ATLAS-1 and B-ATLAS-3, every edit kind of V13 §4.1 applied to R (a terrain stroke at the seam, a sea-level change, a placement, a polity window, a plague window, a host advance of 52 weeks) leaves P's and R2's model and records digests byte-equal and the atlas's model digest byte-equal; the atlas re-renders R alone (its imagery version moves; P's and R2's do not); (b) every atlas edit of V15 §4.1 leaves every member's model and records digests byte-equal; (c) adding R to a second atlas, removing it, and deleting the first atlas leave R's digests byte-equal — no world field names an atlas; (d) the lint T-V15-19 | the digests before and after each edit; the second-atlas fixture |
| T-V15-2 (the charter is the present ground, never a record — J393) | `edgeCharter(R, 'E', span)` is byte-identical at R's week w and at w + 520 after a dated clearing (ecology) over the edge's cells, a razing event, a plague window and a sway revision — all within the span (records: none crosses) — and differs, reading the present ground, after a this-happened flood raising the sea 2 m at the edge in the window (the present level), a happened terrain stroke raising the edge, an always-so override along the edge (a painted biome) and a recipe op on the edge; a lint over `WorldEdgeCharter`'s declared fields finds no field whose type is a dated record kind (V13's own bar on the charter is T-V13-68, amendments r; this row bars the atlas's use of it) (`WorldEvent`, land cover, a plate, a route, a placement, a political fact) | the R fixture at two weeks with the scripted edits; the schema lint in CI |
| T-V15-3 (each member at its own time) | on B-ATLAS-3 with R at week 412·13 and R2 at week 40, each cartouche prints its own member's date label as V13's `dateLabel` gives it; the common-week toggle at R's week renders R2 at its own present with `W_ATLAS_BEHIND_WEEK` and R at the week; at R2's week renders R at that week through `renderAt(week)` and the picture equals V13's own view of R at that week drawing exactly the `atlas` layer set (T-V13-68 (g); `lensWeek` and `surfaceDate` set there) pixel for pixel; no member is ever rendered at a week past its present | the two fixtures' presents; the pixel compare against V13's view |
| T-V15-4 (the fit never changes the child) | on B-ATLAS-2, fitting P2 into R (mode `fitted`): P2's model and records digests byte-equal before and after; R's `dem` differs only inside P2's extent + margin + the band (every other cell byte-equal), R's `oldGround` trace covers exactly that set, R's `geometryVersion` stepped once; the atlas's `FitRecord` names the parent's placement and both versions; a later edit of P2 moves nothing in R and a later edit of R moves nothing in P2 (T-V15-1's clauses re-run on the fitted pair); mode `derivedFromParent` on P-in-R: R gains one placement record and no raster change; mode `imageOnly`: neither moves and the mismatch reading matches the drift thresholds' crossings on the fixture | the digests and the cell diff; the trace's cell set |

### 7.2 The relational view (F10)

| id | what it asserts | how |
|---|---|---|
| T-V15-5 (the warp preserves adjacency and reports true distance) | (a) on B-ATLAS-VIEW under the mappa mundi viewpoint at s = 1 and at s = 0.5, the baked field's Jacobian determinant is > 0 at every grid vertex, every member's boundary ring warped is simple (no self-intersection), and the adjacency graph of R's sways (which touch which) is unchanged under the warp; (b) `unwarp(warp(p)) = p` within 1 cm for 10 000 random points; (c) the hover readout at 200 random screen points equals the true planar distance to the centre within 0.5 % and the travel time between two route-joined points equals V13's `derivedTime` over the same stations, labelled with the law; across a seam no time is given; (d) the itinerary strip's day counts equal `derivedTime` between consecutive stations; (e) the scale bar's length under every preset and slider position equals the true plane's within 0.5 % (§9.5's O6 c) | the fixture's bake; the inverse test; the readouts against V13's function |
| T-V15-6 (embellishments from facts only, never real-world peoples) | (a) renaming every culture, deity, seat, allegiance and region label of the R fixture (including to real-world ethnonyms and faith names) gives a byte-identical derived embellishment set; (b) changing one `PolityRelation` to adversarial adds exactly the monstrous-peoples figure the rule names for that sway and nothing else; changing a seat's patron to the mapmaker's deity removes the devils figure beside it; a plague arc within `vignetteWeeks` adds a skull at each named seat and none beyond the window; (c) no `FigureRow`, caption, catalogue string or legend note of this volume matches the blocklist (CI); a document whose culture labels match the blocklist draws the same figures and never prints the label in a caption; (d) a party viewpoint draws no figure whose `derivedFrom` names an alignment row, a suppressed creed, a covert link or a row resolved DM-only — the fixture's DM-only war relation draws a devils figure for the DM's viewpoint and none for the party's; (e) the legend carries the prejudice note exactly when a monstrous-peoples or devils figure is drawn | the renamed fixture's set compared; the relation and patron edits; the blocklist lint; the two audiences' sets |
| T-V15-25 (viewpoints) | the culture viewpoint as of a past week reads the plates at that week (the centre, the importance and the known region equal those computed from the plate's facts alone; a seat founded after that week is unknown); the party's known region grows when the party key gains a place and when a `reveal` event arrives (V08 §3.14 through the member), and never otherwise; "View relationally…" on R's page makes an unsaved one-member atlas whose true viewpoint draws R pixel-identical to V13's view drawing the `atlas` layer set | the plate fixture; the party key edits |

### 7.3 Saves, arrangement, seams, continuation, drill-down (F11, F12, F15)

| id | what it asserts | how |
|---|---|---|
| T-V15-7 (deletion leaves a marked gap) | deleting C on disk under B-ATLAS-SHARE: at the next open C reads `missing`, `W_ATLAS_MEMBER_MISSING` raised with `keep` and `remove`, the gap drawn ghosted (and blank under `missing: 'blank'`) with the words naming C's last version and date, in every atlas that held C (a second atlas fixture holding C too); C's relations marked unmet, its seams keep their drift; restoring the file finds C again; `removeMember` writes the gap style chosen, tombstones the relations, and its undo restores all | two atlases; the file deleted and restored |
| T-V15-8 (sharing excludes unshareable members) | the shared atlas written from B-ATLAS-SHARE holds R's imagery at the cached stops, no reference and no tile of P (its extent a gap "not shared"), C's gap as missing; the recipient opens it read-only, drills into nothing it cannot resolve (`refuse.atlas.drill.unopenable`), sees P's gap and C's; `setAttr(shareable)` wider than a world's own sharing is refused `refuse.atlas.share`; the picture export under the party viewpoint withholds every `secret` record and every figure T-V15-6 (d) withholds; the permalink lists the members a recipient will see | the share writer's file re-read; the recipient harness |
| T-V15-9 (determinism) | (a) an atlas generated twice from one `AtlasRecipe` over resolvable members is byte-identical per record, per composed tile at every level and per warp field on every §13.2 platform, workers on and off; (b) the solver over permuted relations and members gives the same arrangements; a preset applied twice from the same state is idempotent; (c) a refresh of a member whose version did not change moves no atlas digest and no tile; (d) the embellishment set for a viewpoint is byte-identical across bakes and platforms; the comparator lint finds no draw inside a sort key in `@plat/atlas` | per-record and per-tile digests over B-ATLAS; the lint in CI |
| T-V15-10 (arrangement) | (a) every relation kind of V15 §2.3 on B-ATLAS-1 and B-ATLAS-16 produces exactly its requirements and, solved, is met within its measure (the sector, the width, containment, the distance, the stretch) with the verification list saying so; (b) every compatibility clash (a 24° latitude step, a rainforest shore against tundra, a rotated member, an overlap) is a warning with its actions and never a refusal; (c) least change: a solve over sixteen members with one new relation moves at most the two members it names, the others byte-equal; (d) a solve that would move a locked member asks `W_ATLAS_LOCKED_MOVE` and moves nothing on `cancel`; (e) two contradicting relations are both kept, the later met, the earlier unmet and reported; (f) the lane bound refuses `refuse.atlas.extent` at 21 475 km and admits 21 473 | the relation fixtures; the solver over B-ATLAS-16 |
| T-V15-11 (continuation) | on B-ATLAS-3's making: the request carries one charter per shared edge, each `locked`, each naming R's version; the prefill equals the values V15 §3.4 (4) derives from R's edge facts; V13's W0 on the sent request reports every edge requirement met and the generated R2's west edge profile meets R's east edge within V13's `edgeRmsRefCm` (V13's T-V13-13 at world rung, as RQ-V15-1 requests); R's digests are byte-equal before and after the generation; R2's recipe stores the charters with R's version (read back through V13); the atlas's member R2 carries `origin: 'continued'`, `continuedFrom` naming the charters, its arrangement at the void, locked; an unopenable neighbour leaves its edge unlocked with `W_ATLAS_EDGE_UNLOCKED`; a request needing a neighbour change is reported `W_ATLAS_NEIGHBOUR_CHANGE` and `editNeighbour` opens R's page with V13's fork preview, nothing changing in R until committed there | the R fixture; V13's generator on the request |
| T-V15-23 (contradicting edges) | a void between R and a fixture realm whose facing edge ends in a 2 000 m plateau where R's ends in sea: `W_ATLAS_EDGE_CONTRADICTS` names the fact pair and proposes a strait; between a desert edge and a rainforest edge 300 km apart: a mountain belt proposed across the wind; two rivers entering with no exit: a sea proposed; each accepted proposal enters the request as a `set` requirement and the generated world holds the feature (V13's verification report) | the contradiction fixtures |
| T-V15-12 (drill-down lands on the true point) | a click at 200 random screen points under the mappa mundi viewpoint at s = 1 opens the member really under the unwarped point at the world point within one fine cell, at the stop V15 §3.2 (2)'s rule gives; the zoom threshold opens the member at its stop 3 with `drill.shareOfView` met and not before; the back action returns to the same centre and zoom; a player's drill into a member they know nothing of is refused with the reason | the fixture's clicks against `toMember` of the true point |
| T-V15-13 (one pixel resolution, one zoom rule, the band only) | (a) at every atlas level each member's tiles are drawn at the level's metres per pixel: a 1 km-cell continent and a 250 m-cell province at level 6 (256 m per pixel) are drawn at 4 and 1 pixels per cell respectively (the continent's stop 2 on demand, the province's native stop 1, §3.2 (2)'s table); the glyph level drawn for a seat equals V13's rule for the member's stop at that level, so two town-tier seats on R and R2 draw at one glyph level and size; (b) outside the seam bands every composed pixel equals the member's own `renderAt` pixel; inside a band the blend's weights sum to 1 and the band is never wider than `bandMaxShareOfStretch`; (c) the mesh warp's maximum pixel error against the exact W_s at n = 8 is ≤ 1 px (canvas) and 0 px on the GPU path; (d) the inset rule: P-in-R inside C draws as an inset with a frame and a locator box at C's stops 0–1 and in place at levels where C's stop is ≥ 2; P beside R is eased | the pixel compares; the band's weights; the inset fixture |
| T-V15-14 (labels across seams) | over B-ATLAS-1 and B-ATLAS-2 at every level no two drawn labels' boxes intersect, no drawn label's box crosses a band, every dropped label belongs to the yielding member, and every label of a member away from its seams is drawn as V13 placed it | the label boxes at each level |
| T-V15-21 (gaps, missing members, insets) | every gap kind draws its fill and pattern; the `everywhereElse` gap is at most one; a solve's accepted `gapKind` writes a `between` gap; a missing member's ghost alpha and words as V15 §4.5; a seam's treatment setting by `setAttr` holds across refreshes | fixtures per kind |
| T-V15-22 (a version change re-renders, never re-fits) | editing R under B-ATLAS-2 (a terrain stroke inside P2's fitted extent's band; a world `adjust` of R's size): P2's placement in R and the atlas's `FitRecord` are unchanged, P2's arrangement unchanged, R's imagery re-rendered with its new version, the nested seam's drift reading moved, every other member's imagery version unchanged; no solve ran (every arrangement's `since` unchanged) | the fixture's edits; the records compared |

### 7.4 Editing, view, exports, budgets, platform

| id | what it asserts | how |
|---|---|---|
| T-V15-15 (budgets) | every `ATLAS-n` row of V15 §6 measured on B-ATLAS-16 (and B-ATLAS-2 for `ATLAS-5`) at p95 over five runs on the reference hardware, inside its budget or its pre-decided fallback applied and named in the register | the nightly tier |
| T-V15-16 (the clean-room lint) | no file under `@plat/atlas` or `@plat/render/atlas` contains a string from §17.1's identifier lists (the base's references and V13's reserved words extended with the host's world and gallery words the state note names) | §14's lint, CI |
| T-V15-17 (totality, identity, edges, undo) | (a) every derived transient of V15 §2.6 is total over empty, missing and refused inputs; (b) every record of V15 §2.9 keeps its address across a refresh, a solve and a preset; two atlases holding one world collide on no address; (c) V15 §3.10's fourteen edge cases, each one test; (d) every edit kind of V15 §4.1 replayed forward and back gives the same digests in session and in replay; a fit's parent edit undone on the parent leaves the atlas's record stale and reported as V15 §4.4 states | fixtures; B-EDIT-style sequences over B-ATLAS-1 |
| T-V15-18 (player views) | under the party viewpoint on B-ATLAS-VIEW: the imagery drawn is V13's player picture pixel for pixel; a member with nothing in its known set draws only the unknown treatment; relations, drift readings, hidden figures and the DM's unshared viewpoints are absent from the view, the member list, every answer and every export at the party's key; the picture export equals the view | the admission harness |
| T-V15-19 (no reverse seam) | a build-time lint over `@plat/atlas` and `@plat/render/atlas` finds no import of a world document's edit entry points (V13's `edit`, the placement folds, `regenerate`, the port's inbound messages) and no call that obtains a writable handle on a member; the runtime harness asserts that every member handle an atlas opens is read-only and that no event appears on any member's log during an atlas session's edits (T-V15-1 (b) re-asserted at the log level) | the lint in CI; the log watch |
| T-V15-20 (older documents, the unsaved form) | an atlas file without its imagery cache opens with every member stale and renders what it can; a member outside the retention window reads `unopenable`, its cached picture drawn, its drill-down the frozen view; the unsaved one-member atlas from a world page is not in the recent list until its first edit or save and never reaches the host before Save | fixtures |
| T-V15-24 (the report codes and the catalogue) | every warning of V15 §7.5 is raised by its stated stage on a fixture that provokes it, carries its arguments and at least one action; every `refuse.atlas.*` row renders its catalogue line with at least one button (T-V9-13's rule); `W_ATLAS_*` never a refusal | the provoking fixtures; the catalogue test |

### 7.5 The report codes (§5.4's form; BCR-V15-13)

| code | kind | emitted by | arguments |
|---|---|---|---|
| `W_ATLAS_OVERLAP`, `W_ATLAS_LATITUDE`, `W_ATLAS_CLIMATE`, `W_ATLAS_NORTH_DIFFERS` | warning | A1 (a placement, a solve, a check) | the pair, the measure (the overlap's area, the latitude step, the stretch share, the bearing) |
| `W_ATLAS_RELATION_UNMET`, `W_ATLAS_LOCKED_MOVE` | warning | A1 | the relation and its reason; the locked member and the displacement asked |
| `W_ATLAS_MEMBER_STALE`, `W_ATLAS_MEMBER_MISSING`, `W_ATLAS_MEMBER_UNOPENABLE`, `W_ATLAS_DETAIL_UNAVAILABLE`, `W_ATLAS_BEHIND_WEEK` | warning | the open-time check; A2 | the member, the versions, the reason, the stop, the week |
| `W_ATLAS_DRIFT`, `W_ATLAS_MISMATCH` | warning (DM-only) | A3; A5 (`imageOnly`) | the seam, the reading's figures |
| `W_ATLAS_EDGE_UNLOCKED`, `W_ATLAS_EDGE_CONTRADICTS`, `W_ATLAS_NEIGHBOUR_CHANGE` | warning | A4 | the edge and the neighbour; the fact pair and the proposal; the change named |
| `W_ATLAS_WARP_FALLBACK` | warning | A6 | the viewpoint, the cause (the work cut; the Jacobian) |
| `W_ATLAS_NOT_SHARED` | warning | the share writer | the member |
| `refuse.atlas.duplicate`, `refuse.atlas.extent`, `refuse.atlas.members`, `refuse.atlas.unresolved`, `refuse.atlas.share`, `refuse.atlas.noCharter`, `refuse.atlas.hostWorld`, `refuse.atlas.fit.straddles`, `refuse.atlas.fit.covers`, `refuse.atlas.drill.unopenable`, `refuse.atlas.drill.audience`, `refuse.atlas.export` | refusal: a §7.1 outcome key rendered by V09's catalogue, never a `ReportCode` | the dry run; the view; the export dialog | the member, the distance, the count, the reference, the world's sharing, the version, the mode, the audience, the format |
| `E_ATLAS_TILE`, `E_ATLAS_WARP` | bug abort (§5.1 (8)) | the compositor; the bake | the tile index; the field key |

**Bars carried as rows:** the spine §17's atlas families — members isolated after generation → T-V15-1; the edge
charter carries no dated fact → T-V15-2; each member at its own time → T-V15-3; fit across rungs never changes the
child → T-V15-4; the relational warp preserves adjacency and reports true distance → T-V15-5; embellishments derived
from facts and never from real-world peoples → T-V15-6. The seam seat places the rows in §13.2 as BCR-V13-15's merged
text places V13's and V14's (one T- row per bar; V14's J-V14.54 pattern).

## 8 Build plan

**Where it slots (J-V15.21; §16's staged-milestones table gains three rows, BCR-V15-11).** Three milestones in the
spine's order (spine §15): **M-ATLAS-A — the image-only atlas with arrangement and drill-down**, after V13's **M-W6**
(which lands `renderAt` with its label boxes and `atlas` layer set, `edgeCharter` and `solve` with the evaluators'
registration — V13 §8.2's M-W6 row as file r item 1015 amends it — over M-W3's labels and picture rows and M-W1's view
and glyphs) and beside M-W7 – M-W9: the seam seat's ruling (seam-world-growth-r0 SW-15; V13 owns where its readings
land, and the spine's §15 orders the atlas after the growth milestones), so no registry lookup is needed and the solved
arrangement and the drift readings run from the first day; **M-ATLAS-B — continuation at
generation and the fit across rungs**, after M-W6 (the solver, the edge charter, the rung-general placement and the
world subject of `requestCharter`, RQ-V15-1, -3 and -5; formation's bedrock and soils reach the charter when M-W7
lands, the charter carrying what the world holds before it) and after M-ATLAS-A; **M-ATLAS-C — the relational style**,
after M-W5 (the lenses, whose facts `viewFacts` reads) and M-ATLAS-A. Staffing per the owner: rulings on the Fable seat,
building and verification on Opus seats. Prices are expert estimates (PLAUSIBLE; the spine's guesses 2–4, 2–3 and 2–3
plus art, refined by step); the total is this volume's own line, outside §16's first total, computed once by the
coherence pass (item 568's rule); the art library is the owner's budget line (V15 §11 Q3), outside it.

| step | content | exit (executed, not asserted) | est. (pw) |
|---|---|---|---|
| **SA0 — spike** (risk retirement, at M-ATLAS-A's start) | the pyramid and the seam blend over B-ATLAS-16 (sixteen realm clones): `renderAt` at stops 0 and 1 per member timed; the cache's size at `lossyQuality` 85; the composed frame at the fit-all level and at level 7 with twelve banded tiles; a stop-2 tile on demand | `ATLAS-2`, `ATLAS-3`, `ATLAS-6`, `ATLAS-9` inside their rows or their fallbacks chosen; the band's look judged by eye on three seams (the owner's sitting, V12 §3.6b) | 0.5 |
| **SA1 — the document, arrangement, rendering, seams, drill-down (M-ATLAS-A)** | `Recipe.atlas` and the `atlas` product (BCR-V15-1), the records of V15 §2.2, the imagery cache (BCR-V15-2), the view keys (BCR-V15-3), the edit kinds and their rows (BCR-V15-4), the tables `atlas.arrange` and `atlas.seams` (BCR-V15-5); A1 whole over V13's `solve` (the evaluators registered, RQ-V15-5), snapping, locks, presets, the relations box; A2 whole with `renderAt` (RQ-V15-2); A3 whole with the drift readings over `edgeCharter` (insets, easing, precedence, labels across seams); A7; the atlas page (RQ-V15-7) with Open / recent / new; the missing-member gap; the exports (BCR-V15-6) and the share writer; the clerk's section; the `atlas.none` pin | T-V15-1 (a)–(c), T-V15-3, T-V15-7, T-V15-8, T-V15-9 (a)–(c), T-V15-10, T-V15-12, T-V15-13, T-V15-14, T-V15-16, T-V15-17, T-V15-18 (the `true` viewpoint), T-V15-19, T-V15-20, T-V15-21, T-V15-24; the register check | 2–3.25 |
| **SA2 — continuation and the fit (M-ATLAS-B)** | A4 whole over `edgeCharter` (RQ-V15-1) and the solver (RQ-V15-5): the void, the charters carried, the prefill, the contradiction table and its proposals, the neighbour-change conflicts, the send to V09's world dialog with locked edge chips, the generated member's provenance; A5's three paths over V13's rung-general placement, the world subject of `requestCharter` and the transient world-rung charter (RQ-V15-3); `rematchStrip` | T-V15-2, T-V15-4, T-V15-11, T-V15-22, T-V15-23; `ATLAS-1`, `ATLAS-4`, `ATLAS-5` measured; the register check | 2–3 |
| **SA3 — spike** (at M-ATLAS-C's start) | the warp bake at `warpGrid` 512 on B-ATLAS-VIEW: the time, the Jacobian check, byte identity across §13.2's platforms; the mesh warp's frame at `v` 48 | `ATLAS-7`, `ATLAS-8` inside their rows or the fallbacks chosen; T-V15-9 (d)'s platform clause green | 0.25–0.5 |
| **SA4 — the relational view (M-ATLAS-C)** | A6 whole: the bake, the slider, the readout and the ruler, the centre rules, the importance field, the known region per audience and culture, the three relational presets' rows and furniture (rhumb lines, roses, the T-O rim, the itinerary strip), the embellishment rules with the minimal line-art figure set, the DM's tray, the hidden marks, the lint and the blocklist, the legend's note, the viewpoints (the defaults, a culture's, as-of, the party's), **View relationally…** on the world page; the tables `atlas.style` and `atlas.embellish` | T-V15-5, T-V15-6, T-V15-25, T-V15-18 (the relational viewpoints); the owner's sitting on the three presets (V12 §3.6b, legibility and immersion rated, the sitting's rows offered); the register check | 1.75–2.5 |
| content | the four tables' rows, the preset rows, the minimal figure set (line art, one glyph per trait per preset), the catalogue's `info.atlas.*`, `bend.atlas.*`, `refuse.atlas.*`, `share.atlas.*` lines and the legend notes (English, own, lint-checked), the blocklist | reviewed by the clean-room scanner (§17.1); every cell with provenance; the register check | 0.5–0.75 |
| **total** | | | **7–10** (M-ATLAS-A 2.5–3.75 with SA0; M-ATLAS-B 2–3; M-ATLAS-C 2–3 with SA3; content 0.5–0.75); the art library outside it (V15 §11 Q3) |

**Dependencies.** SA1 waits on M-W6 (`renderAt`, `edgeCharter` and `solve` land there, file r item 1015, over M-W3's
labels and picture rows; the `atlas` set's cover overlay — a member's fields and scars — lands at M-W8, so a picture
rendered before it draws relief without them, V13 §8.2) and on V09's world page (the document router's open of a member); SA2 waits on M-W6 (the
solver interface, the edge charter, the rung-general placement and the world subject of `requestCharter`, file r items
1009 and 1015), and in host mode on H35 for a continuation
owned by a campaign (until then standalone only, reported); SA4 waits on M-W5 (the lenses' facts through
`viewFacts`, RQ-V15-4) and on nothing of amendments r beyond M-W5; the art library lands when the owner funds it and
replaces the line-art set row by row (a content change, no mechanism). The research notes are read evidence, not
dependencies.

**The register at each exit** (X-V12-16; V04 §8's pattern): every step that lands a registry table of this volume, or a
calibratable column of one, exits with `plat calibrate register --check` green over the cells it lands — their entries
from V12 §3.11's default line (`--defaults --milestone <the step's id>`), this volume writing no register line of its
own (J-V15.22): SA1 lands `atlas.arrange` and `atlas.seams`; SA4 `atlas.style` and `atlas.embellish`. No reference owns
the subject; the owner's sittings rate the presets and the default line's corpus stage closes `fixed` with "no
admissible frame" at M-CAL (or `M-CAL/atlas` when a step lands after it).

**Risks, in order.** (1) The imagery cache's size and the render time at sixteen members (SA0 measures; fallbacks:
`lossyQuality` 75, stop 1 per visible tile). (2) The warp's byte identity across platforms and its time (SA3;
fallbacks: `warpGrid` 256, `flowSteps` 32, the magnification-only field with a declared shift). (3) M-W6 landing late or in parts: nothing of the atlas ships before its readings land (INDEX's risk 13; no fallback
can stand in for them); within M-W6, the rung-general placement and the world subject landing after `renderAt` and
`edgeCharter` (fallback: nested members image-only with the mismatch warning, `fitted` and `derivedFromParent` greyed
with their reason until they land — nothing of the atlas is lost). (4) The solver's `'arrange'` goal landing after
`renderAt` within M-W6 (fallback: direct placement and presets, relations stored and marked unmet). (5) The host's atlas store (H35) landing
late or in another shape (fallback: the atlas a file in host mode through the share sheet's Download; continuation in
host mode refused with its reason). (6) Legibility and immersion of the relational presets before the art lands (the
minimal line-art set; the owner's sitting at SA4; a preset rated poorly stays shipped with its figures off by default
— a table cell). (7) Label collisions across seams the placer run cannot resolve (fallback: the yielding member's
labels dropped within twice the band). (8) A member's `renderAt` at stop 1 over budget for a continent (fallback:
stop 1 per visible tile for continents, stop 0 cached whole).

**Risk spikes.** (a) At SA1's start, SA0 above. (b) At SA4's start, SA3 above. (c) At SA2's start: the fit's preview
on B-ATLAS-2 (a province in a realm) timed against `ATLAS-5` with V13's fork at the coarse rung; fallback: the preview
over the coarse raster only, the fine run at commit.

**Evidence that ends each step** is the step's bars executed and quoted, the declared shifts recorded (§13.3), the
register check green over the cells it lands, and `docs/lane-events.log`'s LANDED line.

## 9 Decisions (each "chose X over Y because Z"; vetoable)

A decision another later one replaced or changed carries one mark: *superseded by* or *amended by* the governing row,
which keeps the reason. The owner delegated every decision of this pass to the session (J392's F16 and the delegation
the spine records); each row below is vetoable, and none re-decides a spine ruling — where a row restates a spine
ruling it names the spine section and adds only the depth this volume designed.

| id | decision |
|---|---|
| J-V15.1 | chose one package `@plat/atlas` for the records, the arrangement, the seams' records, the continuation drafts, the fit's call, the warp's solver and the embellishment derivation, with the tile composition, the pixel blend and the mesh warp in `@plat/render/atlas` and the atlas page in `@plat/app`, over spreading them through V13 or the render tier, because each lands and versions as one unit, §14's dependency rule keeps the renderer and the app readers of records they never own, and the one promise that matters (no writer of a member's log, spine §14 (6)) is a lint over one package |
| J-V15.2 | chose the atlas plane as integer atlas centimetres on the same unit and datum as every member (`WorldCm`, sea level 0), bounded by the int32 lane (±21 474 km of its origin, the first member's corner), planar, over a plane of its own unit or scale, a sphere, or a floating-point plane, because every member is metric and shares the datum (spine §10.3: true-scale alignment automatic), J-V13.44's bounded plane stands, and a planet's width fits the lane |
| J-V15.3 | chose an atlas that holds imagery, arrangement and viewpoints and nothing of a member's rasters or records (spine §2's rung 1), with every read of a member through a read-only handle, over a merged world raster or a cached copy of members' records, because F11's "isolated in everything but image" is literal: a picture cannot carry an edit across a seam, and a copy would |
| J-V15.4 | chose members by reference (`docId`, namespace, an optional resolver reference) with no back-reference in any world document, so one world belongs to many atlases and no atlas moves a world's digest, over a world naming its atlases, because F15 wants many saves over the same maps and the base's one-`worldRef`-per-frame rule (V13 §3.18 (7)) must not be mirrored upward |
| J-V15.5 | chose every member drawn at its own present with its own date cartouche, the common-week display an option that renders a member at an earlier week through V13's own history and never past its present (`W_ATLAS_BEHIND_WEEK`), over an atlas clock or an extrapolated picture, because F14 says each map is on its own literal time and V13 §5.8 (3)'s honesty rule forbids a drawn guess |
| J-V15.6 | chose one fixed tile scheme anchored at the atlas origin (level 0 a 4 194 km tile, each level a quarter of the last, to 8 m per pixel), every member drawn at the level's metres per pixel and its V13 stop by `clamp(floor(log4(cell ÷ p)) + 1, 0, 3)`, over a pyramid re-tiled to the members' union or per-member tilings, because adding or moving a member must re-tile nothing else, and one metres-per-pixel per level is what "one pixel resolution" and "one shared zoom rule" mean (spine §10.6) |
| J-V15.7 | chose to cache V13's stops 0 and 1 per member (lossy, `ATLAS-6`), render stop 2 on demand per visible tile for an openable member (pinnable into the document) and never cache stop 3, over caching every stop, because stop 2 is 16 × and stop 3 256 × stop 1's pixels (a continent's stop 3 is 2.4 gigapixels) and an openable member renders its own detail, while an unopenable one keeps a usable picture at stops 0–1 (stop 1 native at level 6 / 5 / 4 for a province / realm / continent, stop 2 first on demand two levels finer, at 8 / 7 / 6 — §3.2 (2)'s table over the pyramid cell) |
| J-V15.8 | chose the spine's three fit paths with **derived from the parent** preferred — a world-first `requestCharter` with a world subject on the parent, the parent's rasters as the child's coarse ground refined by the position-keyed lattice, the parent's frames inside the extent as the child's planned sites, offered **Move the towns into the finer map** (V13's `unplaceFrame` then `placeFrame`, each on its own page) or **Keep them on the parent** (drawn over the child from the parent's picture, labelled) — over a child generated blind inside a parent, because coherence by construction is the spine's preference (§10.6) and a frame belongs to one world (V13 §3.18 (7)), so the towns are moved explicitly or left where they are, never duplicated |
| J-V15.9 | chose separate logs and undo stacks for the atlas and every member, the atlas holding a `FitRecord` or a `rematchStrip` request and never a member's event, the two not one undo group (a parent's placement undone there leaves the atlas's fit record stale, reported, and re-read as image-only), over a cross-document undo group as V13's placement pair is, because V13 §4.4's pair exists only because the world's fold writes the frame's `charter` event, and the atlas writes no member's event by F14 |
| J-V15.10 | chose described relations as requirements of V13's solver at rank 3 of the precedence ladder (spine §5.1), the compatibility checks at rank 4, warnings never refusals, two contradicting relations both kept with the later met, over an atlas-side solver or refusals, because the spine names one requirement engine for every scale (§4, §14 (5)) and F12 gives the user the configuration whatever the physics says |
| J-V15.11 | chose no latitude on the atlas plane — a member's latitude box stays V13's climate device, checked pairwise for continuity across a seam within a tolerance and extrapolated to pre-fill a continuation — over a global latitude law on y, because V13's boxes are not geodetic (a realm 800 km tall spans a 25° default box) and a law on y would contradict every member at once |
| J-V15.12 | chose a member's rotation as presentation on the atlas plane (its own north stays its +y), snapped to right angles by default and warned where a turned member touches another, with a continuation or a fit admitting only bearing 0 between the two, over forbidding rotation or admitting it everywhere, because F12 lets users arrange freely while a world's climate and a charter's sides are axis-aligned facts no rotation can honour |
| J-V15.13 | chose the edge charter's content exactly as the spine lists it (§10.4) with routes excluded beside events, land cover and simulation state — a road is a lay version on a standalone world and the host's lived network on a bound one, dated either way — over carrying a road's crossing as a present physical fact, because the test is J393's — a present physical fact, never a record — and a road is a record; the new world lays its own, and a road ending at a seam is the DM's to continue |
| J-V15.14 | chose the relational view's home in this volume with a single world viewed through an unsaved one-member atlas opened from the world page (**View relationally…**), over a toggle in V13's world view, because the spine places the style in V15 (§11) and V13's view keeps one affine transform, no embellishment layer and no true-scale toggle (the state note's finding), which the atlas page already has |
| J-V15.15 | chose the true plane as the home of every measurement — the scale bar always drawn and never warped, the ruler and the readout unwarped, the route labels of the relational presets printing true distances, every export's coordinates true — over a warped scale bar or hidden measurements, because F10 asks that absolute scale stay true for practical purposes and the Peutinger convention (the science note §9.1) shows a warped shape with true numbers is a map people used |
| J-V15.16 | chose the flow-based area cartogram composed with a radial magnification about the centre and an orientation rotation as the warp family, over the rubber-sheet method (folds at the needed distortion), the diffusion cartogram (tens of seconds), a fisheye alone (one centre, no areas by importance) and a hand deformation (not derived from facts), because adjacency must survive (T-V15-5), the bake must take seconds (`ATLAS-7`) and F10's distortion is by importance and by centre at once (the science note §9.2 as evidence; the construction ours) |
| J-V15.17 | chose the slider as the flow's time (the field integrated to t = s, every intermediate map invertible) over a linear blend of the identity and the full warp, because a blend of two invertible maps can fold and the readout and the drill need an inverse at every slider position |
| J-V15.18 | chose embellishments chosen by trait alone — deep, storm-feared or unsailed water, the edge of knowledge, hostility, distance, an enemy faith, an event, a tier — reading ids, classes, bands, keys and kinds and never a name, the figure library keyed by trait, a blocklist lint over every string, no DM-only row for a player viewpoint, and the legend's prejudice note, over figures keyed by culture or placed by the DM alone, because F10's "pagan savages and devils" must be the fictional mapmaker's prejudice toward fictional neighbours and nothing a real-world people could be read into (spine §11), and only a rule with a test keeps it so as the facts and the art change |
| J-V15.19 | chose the known region per viewpoint as a class-4 projection derived from the member's known sets per audience or from a culture's seats, travel reach and trade, never painted by the DM, over a painted knowledge mask, because knowledge is a fact of the audience (V14 §2.3's reading of §9.2; the party learns through the host's reveal and reach) and a painted mask would be a second truth |
| J-V15.20 | chose to refuse the world shapes (`ecosystemJson`, `ecosystemGeoJson`, `heightmap16`, `worldCsv`) on an atlas and to export pictures as drawn, a composed tile pyramid and a GeoJSON of the atlas's own records, over a stitched world export, because a stitched picture is not a world, its members disagree at their seams by right (F14), and the ecosystem's shapes carry one cell graph with one scale (V13 §5.4) |
| J-V15.21 | chose three milestones in the spine's order — M-ATLAS-A after M-W6 beside M-W7 – M-W9, M-ATLAS-B after M-W6 and M-ATLAS-A, M-ATLAS-C after M-W5 and M-ATLAS-A — over one milestone after amendments r lands whole, because the image-only atlas with arrangement and drill-down works on the readings M-W6 lands (`renderAt`, `edgeCharter`, `solve`) and is the owner's F11 in hand, while continuation and the style wait on the rung-general placement and the lenses by their nature; *amended by* the seam seat (seam-world-growth-r0 SW-15): revision 0 placed M-ATLAS-A after M-W3 with the solve switched on at M-W6 by a registry lookup, which file r's M-W6 row (where V13 lands `renderAt`) and the spine's §15 order overrule |
| J-V15.22 | chose to bind every calibratable column this volume lands to V12 §3.11's default line and to write no register line of its own, with the register check at every exit, over lines of this volume's, because no reference owns the subject, the owner's sittings rate the presets, and a second line for one column fails the lint (V14's J-V14.35, the same reason) |
| J-V15.23 | chose seam precedence by rung (the more detailed wins on its footprint; equal rungs by the DM's `z`, the newer by default), softening along the shared stretch only by a band-limited multiresolution blend, a one-rung step eased and a two-rung step framed as an inset with a locator box, over blending whole overlaps or resampling members to one resolution, because the spine's one rule (§2, §10.6) makes the finer member the truth on its ground and the printed atlas's inset is the honest way to show a step of 16 cells per cell |
| J-V15.24 | chose labels across seams resolved by one run of the base's placer over every member's placed label boxes (the yielding member's dropped where they cross a band or collide), the labels inside a member never re-placed but for a preset's angle rule, over re-placing every label on the atlas, because a member's labels are its own picture (F11) and the placer's global greedy already arbitrates fixed candidates |
| J-V15.25 | chose the drift reading from V13's edge charters at two versions (the carried charter against the live one for a continued seam; the two live charters otherwise), DM-only, information only, and re-matching only on request as V13's regenerate over one member's border strip with the neighbour's live charter as a locked requirement, previewed on that member's page, over any automatic re-match or a drift computed from pixels, because F14 forbids anything crossing a seam after generation and the charter is the one present-ground reading both sides already give |
| J-V15.26 | chose a missing member kept with a marked, ghosted gap (`missing: 'ghost'` by default) in every atlas that held it until the user removes it, over its silent removal, because F15 and the spine (§10.1) say a deleted member leaves a marked gap, never a silent hole, and a world restored later must find its place again |
| J-V15.27 | chose sharing as a share writer that embeds imagery for shareable members only, removes every reference and picture of an unshareable one and marks its extent "not shared", `shareable` narrowing a world's own sharing and never widening it, the host's rule across campaigns an H-row and the owner's question, over sharing every member's picture or a permission model of the atlas's own, because the spine (§10.1) shares imagery only for members the user may share and the base has no hosted service of its own (§11.5) |
| J-V15.28 | chose a continuation's neighbour-change conflicts reported with `editNeighbour` opening the neighbour's own page under V13's fork preview and conflict list, the request re-drafted from the neighbour's new version, over the atlas applying the change or the request silently dropping it, because the spine (§10.4) says a neighbour's change is shown in the conflict list and nothing changes without approval, and the one place that approval lives is the neighbour's own verbs |
| J-V15.29 | chose the continuation's basics pre-filled from the neighbours' charters (their edge facts and world-level climate inputs; never a recipe's template, which is a record) as `set` options (never locks) with the edges alone `locked`, over pre-filling as locks or not at all, because F13 asks for "basic configurations to be a continuation" and the spine (§10.4) keeps them changeable where not locked |
| J-V15.30 | chose viewpoints as records with two shipped defaults (the game master's true map; the party's), a culture's map as a viewpoint with a culture and a preset, and a map found in a dungeon as a culture viewpoint at an as-of week read from the plates, over a style switch alone, because the spine's "every map is somebody's map" (§11) is an audience plus a culture plus a time, each of which changes the centre, the known region and the figures |
| J-V15.31 | chose the itinerary preset as a distance cartogram along one member's route chain (true days on a straightened spine; nothing across a seam), over a strip spanning members, because travel times are a member's own law (V13 §5.1) and no road crosses a map's edge (F14) |
| J-V15.32 | chose the architecture's word **atlas** for the document and the layer, with **"World map"** admitted as the product label and left to the owner (V15 §11 Q1), over calling the document a world map in the design, because V13's "world" is taken (spine §12) and one word must mean one thing in every record, test and message of this volume |
| J-V15.33 | chose no 2.5D view for the atlas (every drawable `ZDecl { flat: true; reason: 'imagery' }`; the `projection` key ignored with a reason; the member's page has V14's view), over projecting the members' pictures, because the atlas has no heights — its members' heights are theirs, one drill-down away |
| J-V15.34 | chose the atlas in host mode as a document through the bridge whose members resolve through the host's resolver, stored per user (H35) and, until that lands, saved as a file through the share sheet, over an atlas inside a campaign's world record, because an atlas spans campaigns by F15's nature and the host keeps one map per campaign (the state note's Part D) |
| J-V15.35 | chose to read `renderAt` over V13's `atlas` layer set — the member's default picture for the audience (J394): relief with the land cover's used and disturbed classes over it, water, routes, settlements with glyphs, labels, the sway's fills and borders, the occupation, debatable and fighting overlays and the event pins; no lens, no diagnostic, no placement outline, no DM-only mark for a player — with the placed label boxes returned beside the tiles as part of the rendered member (both V13's definitions, file r items 1007 and 1011; J-V13.134), over the five-layer set of the land alone (the owner's "world map" must show realms and borders, and a member's picture at its own time includes its fields and scars — J394), over the world's full layer set (a lens is an instrument a user toggles on a world page, V13 §5.8) and over tiles without their boxes (a label the atlas cannot see cannot be kept from a seam) |
| J-V15.36 | chose the arrangement's compatibility checks to read the members' edge summaries through V13's `edgeCharter` (cached per member version), over a second edge reading of the atlas's own, because one present-ground edge reading serves the checks, the drift and the continuation alike |

## 10 Base change requests, and requests to volumes 13 and 9

Every request names the exact base heading, quotes the current text once where this volume read it, and gives the new
text or mechanism; the base is **not** edited here — the coherence pass applies them with amendments r's (spine §13),
numbered into the amendments series from item 1033 (amendments r, with the seam seat's and the reviser's items, ends at 1032) in the order the seam seat sets,
and this volume is designed as if each were applied. Requests to a volume (V15 §10.2–§10.3) are that volume's
architect's to apply, reconciled by the seam seat.

### 10.1 Requests to the base (BCR-V15-n)

| request | base heading | the current text (quoted once) | the new text or mechanism |
|---|---|---|---|
| **BCR-V15-1** the atlas document kind | §2.9 `Recipe`; §4.12 `StrategyRegistry.products`; §1.1's rung type | `product?: 'town'\|'hood'\|'world'\|'site' /* absent reads 'town'; 'hood' a standalone neighbourhood document (V01 §3.10.1); 'world' a world document (V13); 'site' a world-site document (V14 §3.1) */` | `product?: 'town'\|'hood'\|'world'\|'site'\|'atlas'` with `atlas?: AtlasRecipe /* present exactly when product is 'atlas' (V15 §2.2; its snapshot names every version, K10) */`; `Recipe.rung` admits `'atlas'` (the one rung the `atlas` product registers, as V07 widened the type); the §4.12 union gains `'atlas'` as BCR-V13-7's merged text places it (V13 writes the one union text; V14's SW-13 pattern); a document of product `atlas` has no arena, no part counters in use (each stays 1) and its `base` holds its records in the entities block |
| **BCR-V15-2** the imagery cache | §2.9 `Document` | `lensPlates?: LensPlate[];    // file p item 890 (BCR-V13-38): a world document only — the host-fed lens plates …` | after it: `atlasImagery?: MemberImagery[];    // V15 §2.2: an atlas document only — the members' rendered tiles at the cached stops per audience (V15 §3.2); never canonical, outside every digest, kept across loads and saves as `lensPlates` is, dropped by a quota, by `pinImagery(keepStops: [])` or by the user and rebuilt from the members that are openable (V15 §2.11); never read by a stage of any world`; the canonical-form sentence lists it with `lensPlates` among the non-canonical sets |
| **BCR-V15-3** the atlas's view keys | §2.9 *View state*, "**The world's and the site's keys**" | "**The world's and the site's keys** (file k item 608): per viewer `worldZoom` (0–3, default 1), `worldLayer` (default `relief`), …" | a sentence after it: "**The atlas's keys** (V15 §2.7): per viewer `atlasZoom` (metres per pixel, default fit-all), `atlasCentre`, `relational` (0–1, default the atlas's `style.relational`), `viewpoint` (a `Viewpoint` id), `commonWeek` (a `Week` or null), `showDrift` and `showRelations` (DM-only, default false), `atlasPreset` and `pinnedPoint` — never in a digest, an export's model or the log; the atlas has no `week` key of its own (V15 §2.1)" |
| **BCR-V15-4** the atlas's edit kinds, their outcome rows and conflict actions | §7.1 `EditEvent`; §7.1's outcome table; `ConflictAction` | the union and the table as they stand (V13's and V14's variants appended by files k and o) | V15 §4.1's variants (`addMember`, `removeMember`, `arrangeMember`, `lockMember`, `relate`, `unrelate`, `arrange`, `setLayoutPreset`, `setGapStyle`, `removeGap`, `setConflictSettings`, `setAtlasStyle`, `requestContinuation`, `fitChild`, `rematchStrip`, `setViewpoint`, `setEmbellishment`) with their lifecycle rows (V15 §2.10) and undo (V15 §4.4); the `refuse.atlas.*` keys and the `W_ATLAS_*` warnings with their actions; `ConflictAction.kind` gaining `'inset'\|'move'\|'setBox'\|'drop'\|'unlock'\|'snap'\|'accept'\|'editNeighbour'\|'fit'\|'refresh'\|'remove'\|'include'` and `proposal?: string`; `setAttr` admitting V15 §4.1's targets |
| **BCR-V15-5** the four tables' home | §7.6 *editable tables*; V11 §3.1's registry (by RQ-V15-9) | the registry's rows are V11's; no atlas table exists | the registry gains `tables/atlas/*` (`arrange`, `seams`, `style`, `embellish`; V15 §2.4–§2.5) editable by `editTable` with §7.6's validation, the preset rows and figure rows by their schemas, the blocklist read-only (shipped) |
| **BCR-V15-6** the atlas's layers and exports | §8.4 *Layers* (`LayerSpec` rows per product); §11.1 *Formats* | the world's rows: "a world document exports one FeatureCollection per world layer, V13 §5.4 (file k item 628)"; the formats table's world rows (`ecosystem-shaped JSON (world)`, `GeoJSON (world)`, `16-bit heightmap (world)`, `world CSV`) | the `atlas` product's `LayerSpec` rows (V15 §5.2); three rows after the world's: **the picture exports (atlas)** — the view as drawn under the request's viewpoint, slider and preset, the warp as a mesh warp, the provenance naming every member's version (V15 §5.5); **`atlasTiles`** — the composed pyramid with its manifest, the true plane, unshareable members omitted; **`atlasGeoJson`** — the atlas's records in the metric variant; and the sentence "the world shapes are refused on an atlas document (`refuse.atlas.export`; V15 §5.5)" |
| **BCR-V15-7** the atlas's door through `PlatApi` | §11.2 `PlatApi` and the `query` kinds | the API's members and kinds as they stand (`encounter.*` added by file k) | `atlas.open(h)`, `atlas.members(h)`, `atlas.readout(h, q)`, `atlas.drill(h, q)`, `atlas.continuation(h, void)`, `atlas.fit(h, child, parent, mode)`, `atlas.refresh(h, member)`, `atlas.bake(h, viewpoint)` and the `query` kind `atlas` (V15 §1b.2); the bridge's vocabulary gains them (§11.3); a member handle an atlas opens is read-only by the API's contract |
| **BCR-V15-8** the budget rows and the memory line | §12.10 *The budget register*; §12.8 *Memory* | "**World document, all threads, excluding canvases:** ≤ 300 MB on the high tier …" | the register's rows `ATLAS-1` – `ATLAS-10` (V15 §6) with their homes, measurement, pass bars and pre-decided changes; a sentence after the world line: "**Atlas document:** ≤ 96 MB beside one open member's line (the decoded visible tiles' LRU, the warp fields, the records; V15 §6 `ATLAS-10`); a member rendered for an atlas counts under the world line, one at a time (M-ATLAS-A)" |
| **BCR-V15-9** the bars of V15 §7 | §13.2 | the volumes' take-over rows (V13's and V14's placed by BCR-V13-15's merged text) | the T-V15 rows and the fixture set `B-ATLAS`; the no-op pin `atlas.none` on V12 §3.7.8's engine (no atlas open: the world view byte-identical); one T- row per spine §17 atlas family (V15 §7.5's map) |
| **BCR-V15-10** the package | §14 | the package list with `@plat/world` (BCR-V13-1) and `@plat/sites` (BCR-V14-18) | `@plat/atlas` after `@plat/sites` with V15 §1.1's dependency rule (depends on `@plat/kernel`'s `dmath`, `rng`, `index`, `@plat/model`, `@plat/tables`, `@plat/world`; never on `@plat/render`, `@plat/export`, `@plat/app`; imports no writer of a world document's log); `@plat/render/atlas` (the composition, the blend, the mesh warp); the atlas page in `@plat/app` |
| **BCR-V15-11** the milestones | §16 *The staged milestones, in the owner's order* | the staged rows as BCR-V13-19's and BCR-V14-20's merged texts place them | the rows M-ATLAS-A, M-ATLAS-B and M-ATLAS-C with V15 §8's starts, companions, exits and prices (7–10 pw in all; the art library outside), placed after M-W3 / M-W6 / M-W5 as V15 §8 states |
| **BCR-V15-12** the `atlas` concern and the stage ids | §6.1 *RNG and stream design*, the concern registry and the stage ids | the concerns and stage ids listed (the world's `W0`…`W9`, `WORLD_PLACE`; the site's `G1`…`G8`, `E1`…`E4`) | the concern `atlas` (the stream `atlas.embellish`, V15 §3.9) and the stage ids `A1`…`A7`, appended after M0 under K6 (no existing key moves; bar 1) |
| **BCR-V15-13** F-ATLAS, the warnings, the refusals | §5.2 *Failure classes*; §5.4's `stages[].warnings`; §7.1's outcome keys | the classes and codes as they stand (F-WORLD, F-PLACE, F-SITE among them) | F-ATLAS with V15 §3.8's ladder; the codes `W_ATLAS_*` and the aborts `E_ATLAS_TILE`, `E_ATLAS_WARP` (V15 §7.5); the `refuse.atlas.*` outcome keys |
| **BCR-V15-14** furniture and the legend | §9.5 *Furniture, framing and tools* (the legend's second cue; the scale bar) | "the secret cue of each state listed while one is drawn ("DM only · revealed to the party · discovered by the party"; V14 §5.1 …)" | after it: "on an atlas the legend's first line under a relational viewpoint is V15 §3.6 (8)'s note and its last the member marks' cues (stale · missing · at its own present · not shared, each with a glyph beside its tint; V15 §5.6); the scale bar on an atlas reads the true plane under every warp (V15 §3.6 (3); J-V15.15); the compass turns with the viewpoint's orientation as it turns with a placement's bearing" |
| **BCR-V15-15** sharing | §11.5 | "`&doc=<ref>` links are produced only when a resolver with `publish` is configured; otherwise the app offers the `.plat` file …" | after it: "an atlas document's members are resolved through the same `DocResolver.resolve(ref)` by their `Member.world.ref` (V15 §2.2), read-only; a shared atlas embeds imagery for shareable members only and removes every unshareable member's reference (V15 §5.5); the host's access levels across campaigns are the host's (V13 §8.5's H35; V15 §11 Q2)" |

### 10.2 Requests to volume 13 (exactly the spine §14 seams; single source: these stay V13's facts)

| request | what V15 needs (designed here as if granted) | V15's reader |
|---|---|---|
| **RQ-V15-1** the world edge charter (spine §14 (1)) | **as amendments r defines it** (its §2.2 records and items 942, 953: `WorldEdgeCharter { version; world; side; span; stationCm; stations[] { atCm; demCm; bedrock; soil; biome /* graded */; water; tableCm; monthly { tempDeciC; precipMm; windCdeg; windStrength; moisture; maritime } }; riverCrossings[]; landforms[]; currents? /* twelve monthly stream functions */; overrides[]; latBox; datum: 'sea0'; world { poles; calendarSouth }; neighbourVersion; reason }`, produced by `edgeCharter(world, side, span)` as a read, consumed by W0's step 6 as `Requirement { source: 'edgeCharter'; kind: 'edge'; strength: 'locked' }` rows from `WorldRequest.edgeCharters: WorldEdgeCharter[]` — W0 writes each as a `WorldRecipe.edgeCharters` entry `{ side; neighbour: { doc; version }; charter }` from the charter's own `world`, `side` and `neighbourVersion` —, stored whole in `WorldRecipe.edgeCharters` for provenance and never re-read but by a re-match; its present-ground test (J393) barred by T-V13-68) — this volume consumes it as designed, under the seam seat's rulings (seam-world-growth-r0 SW-02): (a) a whole side is asked as the full side's span `{ fromCm: 0, toCm: the side's length }` (no `'whole'` sentinel: V13's signature stands) for A1's edge summaries and the drift read (V15 §3.1 (4), §3.3 (3)); (b) the budget is V13's `WORLD-20` (file r item 1013: ≤ 60 / 120 / 200 ms per side at the three rungs, inside `ATLAS-4`); (c) the re-match (V15 §4.7 (3)) is V13 §3.1 (6)'s re-matching on request (file r item 1008): `setRequirements` replacing that side's `edge` rows by the neighbour's live charter, then `regenerate` of W1 over the strip's box under the recipe's rows — no field is added to `regenerate`; (d) the charter's `latBox` is the neighbour's own and the void's box is the request's pre-fill (V15 §3.4 (4)) | V15 §3.1 (4), §3.3 (3), §3.4, §3.5 (b), §4.7 (3) |
| **RQ-V15-2** the rendered member (spine §14 (2)) | **as amendments r defines it** (`renderAt(world, week, audience)` → `RenderedWorld { doc; week; presentWeek; dateLabel; rung; extentCm; datum: 'sea0'; latBox; tiles: { stop: 0\|1\|2\|3; set: Id /* §8.1's tile sets, rendered by the tile worker on demand */ }[]; known: { audience: 'dm'\|'public'\|`party:${string}`; cells: Uint32Array /* coarse */ }[] }`, a view read cached per (digest, week, audience), the player picture for a party; r item 942 and its V13 §5.4 text) — this volume consumes it as designed (A2 pulls every tile of stops 0 and 1 from the sets into its cache and stop-2 tiles as the view asks, V15 §3.2 (3); the known cells feed the known region, V15 §3.6 (4)) and reads two pieces V13 now defines (file r items 1007 and 1011; F15-3 closed by the seam seat, SW-03): (a) the **placed label boxes** per stop beside the tile set (`RenderedWorld.tiles[].labels: { box; text; kind; priority }[]`), so a seam can drop a yielding member's labels whole (V15 §3.3 (5)); (b) the **`atlas` layer set** `renderAt` draws (V13 §5.4; J394): the member's default picture — relief with the land cover's used and disturbed classes over it, water, routes, settlements with their glyphs at the stop, labels, the sway's fills and borders, the occupation, debatable and fighting overlays and the event pins, each under the audience's admission — **no lens layer, no diagnostic layer** (placement outlines, anomalies, proposals, traces, the resource and spring pins) **and no DM-only mark for a player audience**, whatever the member's own view keys hold — `renderAt`'s one layer set, with `opts.layers` for the parent's towns over a derived child (item 1006); and reads `week` below the present as r's "at a week" admits (the common-week display, V15 §4.7 (4)) | V15 §3.2, §3.3 (5), §3.6 (4), §4.7 (4), §5.4 |
| **RQ-V15-3** the fit across rungs (spine §14 (3)) | **as amendments r defines it** (item 975: `placeFrame { frame: Uuid \| { kind: 'world'; doc: Uuid }; originCm?; bearingCdeg?; best?; requirements?; preview?; accept? }` — the rung-general form: P1's terms over the child's edge profile at its own cell size, P2's band in the parent scaled by the parent's cell ratio (item 942), P3–P5 as for a frame, the child never changed; the edit row `fit` of item 943; `Placement.subject` `{ kind: 'world'; doc?; rung; extentCm }`, item 1030) — this volume calls it with `preview` and the conflict list as V15 §3.5 (c) states (bearing 0 only, no mirror; the band is V13's rule — `blendBandM` × the parent's fine cell ÷ the frame cell (file r item 942 as the seam seat amended it) — and this volume keeps no cell for it) and reads two pieces V13 now defines (file r items 1007, 1009, 1010; J-V13.131; F15-6 closed): (b) `requestCharter` with a world subject (V13 §3.11.4: a `Placement` of subject kind `world` with `precedenceStamp: 'world'`, P4 only) emitting a `WorldCharter` — the parent's four edge charters (`edgeCharter(parent, side, span, line)`, `line` the extent's side, file s item 1033), the parent's rasters over the extent as the child's **coarse ground** and the parent's placed frames inside the extent as **planned sites** (`Requirement`s of source `frame`), read by the child's W0–W1 through `WorldRequest.parentCharter` (the coarse result refined by the position-keyed lattice, spine §3's principle) — the derived-from-parent path, V15 §3.5 (a); (c) the transient `charterFor(world, TransientPlacement)` at a world-rung extent (a read, `WORLD-9`'s form; `WORLD-20`) for the mismatch reading, V15 §3.5 (b); budgeted as `ATLAS-5` asks | V15 §3.5, §4.6 |
| **RQ-V15-4** the relational style's facts (spine §14 (4)) | **granted** (file r items 1007 and 1012; J-V13.133; widened by the reviser with every seat's point, every sway's pole, area and border, the culture table and the bathymetry on request — C15-02, C15-03): `viewFacts(world, week, audience)` → `ViewFacts`, one reading per member, from the plates and events at `week` through V13 §5.8's mechanism, each row with its fact class and resolved audience: the religion lens's hierarchy, faith places, patrons and realm rank (V13 §5.9 (6)); the sway's allegiances with roots and members, each seat's tier, size third and prosperity rung with the realm's held median (V13 §3.9, §5.9 (2), (5), (7)); the trade lens's entrepôt centrality, exports count and channels (V13 §5.9 (4)); the relations (respect / neutral / adversarial, `atWar`) and the culture bands (V13 §3.9 (6)); the `WorldEvent`s of the kinds V15 §2.4's `events` names with their resolved audience; every route in force at the week with its polyline, stations and sailing (`ViewFacts.routes`, both modes) and the travel law's storm factors; the bathymetry as one coarse grid per member on request (`ViewFacts.water.bathymetry`) — **never** the alignment lens (DM-only, J384 (7)), suppressed creeds, covert links or criminal channels; a row the host resolved DM-only never returned for a player audience; absent facts returned as absent (never a default), so the legend can say so | V15 §1b.5, §3.6 (2), (4), (5) |
| **RQ-V15-5** the arrangement solver (spine §14 (5)) | **as amendments r defines it** (items 942 and 1007: `solve(requirements: Requirement[], state: WorldDocument \| { members: ArrangeMember[] } \| null, goal: 'generate'\|'leastChange'\|'arrange', opts?: { rung?; decisions?; seed?; maxIterations? }): SolveResult { ops; placements?; report; conflicts }` — `'arrange'` runs over placements only, no world stage, and r names V15 as its caller) — this volume calls `solve(reqs, { members }, 'arrange', { decisions, seed, maxIterations })` with `members` the arrangements as `ArrangeMember`s (each member's `Placement` of subject kind `world`, item 1030, with its extent, rung, coarse cell and lock) and `reqs` r's `Requirement` records: a described relation `{ source: 'relation'; kind: 'relation'; target: { a; b; word: RelationKind; widthKm?; side? }; strength: 'set'\|'locked' }` (V15 §2.3's words as the `word`), a locked arrangement a rank-2 `{ source: 'lock'; kind: 'lockRegion'; target: { placement }; strength: 'locked' }`, the compatibility checks `{ source: 'context'; kind: 'latBox' \| 'climateRow'; rank: 4 }`; granted (file r item 1007; J-V13.132): (a) the **evaluators** of these kinds over an arrangement state (V15 §2.3's table; the costs of V15 §3.1 (2)) are registered by `@plat/atlas` through `solve.registerEvaluator` (`ArrangeEvaluator`), V13's one path, the search V13's and bounded by `opts.maxIterations`; (b) the verification list in `SolveResult.report` with V15 §3.1 (2)'s unmet actions; (c) `placements` returned as the moved members' arrangements with their reasons; budgeted ≤ `ATLAS-1` | V15 §3.1 |
| **RQ-V15-6** no reverse seam (spine §14 (6)) | nothing of V13: this volume's promise that `@plat/atlas` writes nothing into a world document after its generation (T-V15-19), stated here so V13 §10.2's request list may cite it; V13 may assert it in its own lint over its edit entry points (a caller whose package is `@plat/atlas` refused at the API) | V15 §1.1, §7.4 |
| **H35** (a host-change row for V13 §8.5's one list; the seam seat appends it with the next free H id) | *with M-ATLAS-A:* a **per-user atlas record** beside the campaign's world records (snapshot, backups, quota, lifecycle) and a resolver reference for a world document of any campaign the user may read, read-only; *with M-ATLAS-B:* which campaign owns a world generated from an atlas's continuation request (the dialog's generate in host mode); *the gallery:* the host's share and access rules for an atlas and for a member's imagery across campaigns (the owner's, V15 §11 Q2) — each optional, dark by default, with its tier line and degraded arm (absent ⇒ the atlas a file; a continuation refused in host mode) | V15 §2.11, §3.4 (7), §5.5 |

### 10.3 Requests to the other volumes (not base changes)

| to | request | V15's reader |
|---|---|---|
| **V09** (**RQ-V15-7**) | the **atlas page** as V15 §5.1 lays it out: the canvas over the atlas plane with the member list in the context panel (a card per member with its marks and commands), T6's arrange mode (drag, snap chip, rotation handle, lock, ruler), **Add a world map…** (the recent list, a file, a link, a drag of a world's card), **Continue here** on a void opening the world dialog with locked edge chips and the pre-fill, T7's relations box (chips and a typed sentence to the clerk, met/unmet marks, Arrange with the ghost preview), T2's gap brush, T9's fit sheet (three cards; the fitted card opening V13's placement preview on the parent's page), **Re-match this edge…**, the viewpoint picker and New viewpoint sheet, the style cards, T10's Refresh / Keep detail / Bake; the view bar's relational slider, common-week toggle, Show drift, Show relations, the cartouche switch; **Open a world map…** and **New world map** in Open / recent / new (V09 §5.13; the words the owner's, V15 §11 Q1); the world page's **View relationally…** and **Save as a world map**; the share sheet's member list with shareable states and the **World map file** option (V15 §5.5); the export dialog's Atlas tab (the picture, `atlasTiles`, `atlasGeoJson`; the world shapes greyed with `refuse.atlas.export`); the fates sheet for **Remove from this atlas**; the catalogue keys of V15 §4.8 (`info.atlas.*`, `bend.atlas.*`, `refuse.atlas.*`, `share.atlas.*`, the legend notes); the binding rows of V15 §4.2 in V09 §4.3's table, checked by T-V9-12's rule; the `projection` switch disabled on an atlas with `info.atlas.flat` | V15 §4.2, §5.1, §5.5 |
| **V10** (**RQ-V15-8**) | the `atlas` why section's rows and the chain test; the `propose` route's parse of a described relation into V15 §2.3's chips (the sentence kept in `text`), confirmed by the user before `relate` | V15 §4.8 |
| **V11** (**RQ-V15-9**) | the registry rows for `tables/atlas/*` (BCR-V15-5) with V15 §2.4–§2.5's schema and shipped values; the symbol catalogue's glyphs for the minimal figure set (one line-art glyph per trait per preset; the art library replacing them row by row under the owner's budget); the blocklist as a shipped, read-only table; the naming slice `atlas` (a gap's or a sea's name; never a people's); the bundled lettering faces the presets name (§8.2's and §17.2's licence rule) | V15 §2.4, §2.5, §3.6 (5) |
| **V12** (**RQ-V15-10**) | the fixture set `B-ATLAS` (V15 §7) and the scripted lens set for R; the panel **V15-P** (`PanelSpec`: the three presets rated for legibility and immersion, three seams for the band's look, by the owner's sitting at SA4 and SA0); the no-op pin `atlas.none` with its off form; the measures `atlas.bakeMs`, `atlas.cacheMb`, `atlas.solveMs`; the register's default-line entries at each exit | V15 §7, §8 |
| **V14** (**RQ-V15-11**) | the drill-down's last rungs (a site opened from the member's page, V14 §3.9; the encounter crop on a member's point after the drill, V14 §3.10); the `ZDecl` reason `'imagery'` admitted by the gap lint (T-V14-16) for the atlas's drawables | V15 §3.7, §5.6 |

### 10.4 The INDEX.md and SUMMARY.md rows for V15 (the exact texts the seam seat folded into file r as items 1018–1028; one source: file r's items)

**INDEX.md §1, the product-map table, a row after V14's (file r item 1019):**

`| V15 | `V15-atlas.md` | the atlas — the owner's "world map" (F11–F15): an individual save of finished world maps held by reference, arranged by the user (direct placement and described relations solved by the requirement engine at atlas scale, layout presets, warnings never refusals), rendered at one pixel resolution per level with seams softened along shared stretches, detail steps eased or framed as insets, continued into its voids at the next map's generation through V13's world edge charters (the neighbour's present ground, never a record; locked), a child fitted into a parent through V13's rung-general placement or derived from it through the world subject of `requestCharter`, each member a microcosm at its own present with its date, drift read and never corrected, deletion leaving a marked gap, sharing imagery only for shareable members, drill-down to the live member; and the relational historical style (F10): a view over an atlas or one world — an adjacency-preserving flow-based cartogram with a centre magnification and an orientation, a slider to the true map, true distance and travel time on hover, the distortion from facts (centre, importance, orientation, knowledge) read through V13's `viewFacts`, embellishments derived from the fictional cultures' facts and never real-world peoples, viewpoints (an audience plus a culture), three presets (mappa mundi, portolan, itinerary strip) | §2.9 (`Recipe.product` `'atlas'`, `Recipe.atlas`, `atlasImagery`, the atlas's view keys), §4.12, §5.2, §5.4, §6.1, §7.1, §7.6, §8.4, §9.5, §11.1, §11.2, §11.5, §12.8, §12.10, §13.2, §14, §16 (BCR-V15-1 – BCR-V15-15, pending the coherence pass) | **M-ATLAS-A** after M-W6 (`renderAt`, `edgeCharter`, `solve`; file r item 1015) beside M-W7 – M-W9; **M-ATLAS-B** after M-W6 and M-ATLAS-A; **M-ATLAS-C** after M-W5 and M-ATLAS-A (V15 §8) | 7–10 (M-ATLAS-A 2.5–3.75; M-ATLAS-B 2–3; M-ATLAS-C 2–3; content 0.5–0.75; the art library the owner's own line) |`

**INDEX.md §1, the request census paragraph, a sentence after "Files m–r since added seventeen requests …" (item 1020):** "Volume 15 (2026-10-23) adds fifteen requests to the base (BCR-V15-1 – BCR-V15-15) and eleven to the siblings (RQ-V15-1 – RQ-V15-11, the first six V13's spine §14 seams, each defined by file r items 1006–1017 as V13's own; an H-row, H35, appended to V13 §8.5 by file r item 1015), each base request for the world-growth coherence pass to admit by an item from 1033; none is applied yet."

**INDEX.md §2, the wiring table, a row after V14's (item 1021):**

`| V15 | §2.9 (`Recipe.product` `'atlas'` and `Recipe.atlas`; `Document.atlasImagery`; the atlas's view keys), §4.12's `atlas` product, §5.2 F-ATLAS, §5.4's `W_ATLAS_*`, §6.1's `atlas` concern and stage ids `A1`–`A7`, §7.1's atlas edit kinds and conflict actions, §7.6's `atlas.*` tables, §8.4's atlas layers, §9.5 (the legend's note, the true scale bar, the compass under a viewpoint), §11.1's atlas exports and the refusal of the world shapes, §11.2 `PlatApi.atlas.*`, §11.5's member resolution and the shared atlas, §12.8's atlas line, §12.10's `ATLAS-n`, §13.2's T-V15 rows, §14 `@plat/atlas` and `@plat/render/atlas`, §16's M-ATLAS rows | V13 (`WorldHeader`, the rungs and size rows, `edgeCharter` and `WorldEdgeCharter`, `renderAt` with the placed labels and the known sets, the rung-general placement, the world subject of `requestCharter` and the transient world-rung charter, `viewFacts` over the lens plates, `solve` with its registered evaluators, `derivedTime`, `worldFactsAt`, the conflict list and the fork preview), V09 (the atlas page, Open / recent / new, the share sheet, the catalogue), V10 (the parse of a described relation; the `atlas` why section), V11 (the `atlas.*` rows, the figure glyphs, the blocklist, the lettering faces), V12 (B-ATLAS, V15-P, the pin, the register), V14 (the drill's last rungs; the `ZDecl` reason `imagery`) | the user (the atlas page, the pictures, the shared atlas); V13 (a continuation's `WorldRequest` with locked edge charters; a fit's placement request on a parent; a re-match's regenerate under a charter — each the user's act on the member's page); V09 (the page's rows and keys); V10 (the section); V12 (the fixtures and measures) |`

**INDEX.md §2, the wiring-density sentence, after "Volumes 13 and 14 (counted 2026-10-17) …" (item 1021):** "Volume 15 (2026-10-23) cites V13 in every section and V13 cites V15 only in the readings file r's items 942 and 1006–1017 define for it (the one-way seam the spine §14 names: V13 supplies, V15 consumes); the `seam-world-growth` check's pair (`critique/seam-world-growth-r0.md`)."

**INDEX.md §3, the mermaid graph, three lines after `MW -.-> M25` (item 1022):**

```
  MW --> MATA["M-ATLAS-A image-only atlas, arrangement, drill-down (V15), after M-W6 (its readings) beside M-W7 … M-W9"]
  MATA --> MATB["M-ATLAS-B continuation at generation, the fit across rungs (V15), after M-W6 and M-ATLAS-A"]
  MATA --> MATC["M-ATLAS-C the relational style (V15), after M-W5 and M-ATLAS-A"]
```

**INDEX.md §3, the milestone table, three rows after M-25D's (item 1022):**

`| M-ATLAS-A (V15) | M-W6 (`renderAt` with its label boxes and `atlas` layer set, `edgeCharter`, `solve` with the registered evaluators; file r item 1015) and V09's world page | M-W7 – M-W9; M-SITE-F | the atlas in host mode a file until H35 |`
`| M-ATLAS-B (V15) | M-W6 (the solver, the edge charter, the rung-general placement and the world subject of `requestCharter`) and M-ATLAS-A | M-W7 – M-W9 | the charter carries formation's bedrock and soils once M-W7 lands; a continuation owned by a campaign in host mode waits on H35 |`
`| M-ATLAS-C (V15) | M-W5 (the lenses, read through `viewFacts` from M-W6) and M-ATLAS-A | M-ATLAS-B | the art library lands on the owner's budget, replacing the line-art figures row by row (content only) |`

**INDEX.md §4, after the sentence on volumes 13 and 14 (item 1022):** "Volume 15 (2026-10-23; the owner's rules F10–F15 under the spine, each decision vetoable) adds, as its §8 states and BCR-V15-11 asks of §16: M-ATLAS-A after M-W6 beside M-W7 – M-W9; M-ATLAS-B after M-W6 and M-ATLAS-A; M-ATLAS-C after M-W5 and M-ATLAS-A."

**INDEX.md §5, the cross-volume risks table, a row 13 (item 1023):**

`| 13 | the atlas's readings landing late — `renderAt`, `edgeCharter`, `solve` with its evaluator registration, the rung-general placement and the world subject of `requestCharter` (all M-W6; file r item 1015), the lens readings (`viewFacts` over M-W5's lenses); the host's atlas store (H35) | none needed: each order is written out (V15 §8) | nothing of the atlas ships before M-W6; image-only nesting with the mismatch warning until the fit lands; the relational terms neutral with the legend saying so; the atlas a file in host mode (V15 §8's risks 3–5) |`

**INDEX.md §5, the spikes sentence (item 1023):** "SP-W1 – SP-W7 (M-W0, once M0 closes; before M-W1), SP-W9 and SP-W10 (M-W7's gate; file r item 985); V15's SA0 (M-ATLAS-A's start), SA3 (M-ATLAS-C's start) and its fit spike (c) at M-ATLAS-B's start. The first-five-minutes sessions …"

**INDEX.md §6, the owner-questions table, four rows after V14's (item 1024):**

`| V15 | Q1 — the product label for the atlas ("World map" is admitted; the architecture's word stays "atlas") | "World map" in every user-facing string, "atlas" in every record and test (recommended; the owner's word) |`
`| V15 | Q2 — sharing and privacy across campaigns: may an atlas show, share or publish a member world of another campaign, and under which gallery rule (a capability across the host's boundary; H35) | a member's imagery travels only where that world's own sharing allows it; across campaigns the host's gallery rule once H35 lands, until then the user's own worlds only (recommended; vetoable) |`
`| V15 | Q3 — money: the art library for the relational style (monsters, vignettes, cartouches, lettering), outside the volume's line | fund it after the owner's sitting on the line-art presets at M-ATLAS-C; the mechanism ships without it (recommended; vetoable) |`
`| V15 | Q4 — money: the cost, 7–10 person-weeks across three milestones (V15 §8) | accept; M-ATLAS-A's 2.5–3.75 pw buys F11, F12 and F15 in hand, M-ATLAS-B's 2–3 pw F13 narrowed by F14, M-ATLAS-C's 2–3 pw F10 (recommended; vetoable) |`

**INDEX.md's opening paragraph (item 1018):** "the fourteen design volumes (`docs/volumes/V01`–`V14`)" reads "the fifteen design
volumes (`docs/volumes/V01`–`V15`)"; INDEX.md §7's paragraph gains (item 1025): "Volume 15 (2026-10-23) was written under the spine `docs/design/spine-world-growth-2026-10-23.md` beside amendments r (`docs/AMENDMENTS-2026-10-23r.md`, pending application) and reconciled with it by the world-growth seam check (`critique/seam-world-growth-r0.md`: every finding fixed in place in V15 or carried as an item of file r, 1006–1028); its own critique round is pending."

**SUMMARY.md, "What each volume makes possible", an item 15 (item 1027):**

"15. **The world map, and the mapmaker's eye (volume 15).** Lay the maps you have made on one table: your realm, the
province beside it, a continent from another campaign. Drag each to where it belongs, or say it — "Varn lies east of
Ashmark across a narrow sea" — and the table arranges them, warning (never refusing) where a cold north meets a hot
south; where two maps share an edge the pictures are softened into one another, where a finer map lies inside a coarser
one it sits in a thin frame like an inset in a printed atlas, and between maps there is sea, mist, mountains or honest
blank parchment. Each map stays its own world on its own calendar: nothing you change in one ever changes another,
each shows its own date, and if two drift apart at an edge the table says so to the game master and corrects nothing.
Click the empty space beside a map and say "make a map here", and the new map is born meeting its neighbours — their
coasts, heights, rivers, winds, rock and climate continue across the edge, and nothing that merely happened to them
does. Click any map to open it, then a town, a house, a dungeon. A player's table shows only what the party knows.
And turn on the mapmaker's eye: the world as a medieval scribe of one of your cultures would have drawn it — the holy
city huge at the centre, east at the top, the lands that matter swollen and the rest squeezed to the rim, serpents in
the deep seas, dragons where knowledge ends, monsters in the lands that culture fears or hates, a skull where the
plague struck — with a slider back to the true map and the true distance and travel time under your cursor at every
moment. Every monster comes from your invented cultures' facts and never from any real people; you may add, move or
remove any of them. Three looks ship: the sacred map, the sea chart with its compass roses, and the pilgrim's strip
with the days between towns."

**SUMMARY.md, "The order they would be built in", a bullet 7 (item 1027):** "7. **The world map (volume 15)** slots in after the world's requirement solver (which also brings the picture reading and the edge charter the world map needs), its continuation and fitting beside it, and the mapmaker's eye after the map lenses."

**SUMMARY.md, "How big the whole program is", a bullet after volume 14's (item 1027):** "- **The world map and the mapmaker's eye (volume 15):** about **7–10 person-weeks** (the image-only world map with arrangement and drill-down 2.5–3.75, continuation and fitting 2–3, the mapmaker's eye 2–3, content under 1), plus the art for the mapmaker's eye — monsters, vignettes, cartouches, lettering — on your own budget, which the design does not price."; and the whole-program bullet re-summed (the earlier 392–539 plus the three new volumes' lines: 476–651).

**SUMMARY.md, "Decisions that are yours", a bullet (item 1027):** "- **The world map** (four questions; your rules of 22–23 October, each decision vetoable): the product's name for it ("World map" is fine; the design calls it an atlas inside); whether and how a world map may show or share a map from another campaign (recommended: only where that map's own sharing allows, under your host's gallery rule once it has one); the art for the mapmaker's eye (recommended: fund it after you have seen the plain line-art version); and its cost, about 7–10 person-weeks."

**README.md (item 1028):** the volume count ("fourteen volumes" reads "fifteen volumes"), a row naming this volume and the seam check, and file r among the pending amendment files.

## 11 Owner questions

Only true owner decisions — a name, money, a capability across the host's boundary — each with the session's
recommendation under the delegation (J122's form; spine §16 names the first three as the owner's); nothing the owner
already ruled (F10–F15) is re-asked, and every other choice is a J-V15 row.

| # | question | recommendation |
|---|---|---|
| Q1 | **The product label.** The architecture's word is *atlas* (spine §12; J-V15.32); the owner's own word was "world map". Which word do users see — "World map", "Atlas", or another? | "World map" in every user-facing string (the page, Open / recent / new, the share sheet, the catalogue), "atlas" in every record, key, test and message id — one product word, one architecture word, never mixed; the owner's word |
| Q2 | **Sharing and privacy across campaigns** (a capability across the host's boundary; spine §16; H35): may an atlas show, share or publish a member world that belongs to another campaign of the same user, or to another user who shared it, and under which gallery and access rule? | a member's imagery travels only where that world's own sharing allows it (V15 §5.5; J-V15.27); across campaigns the host's gallery rule once H35 lands — the host already keeps per-map publication state and share kinds, the state note's Part D, so the rule is the host's to extend to an atlas — and, until then, the user's own worlds only; never a world the user may not open |
| Q3 | **Money: the art library** for the relational style — monsters, vignettes, cartouches, lettering per preset (spine §16: "the art budget for the relational style") — outside this volume's line | fund it after the owner's sitting on the line-art presets at M-ATLAS-C (V15 §8's SA4): the mechanism ships with one line-art glyph per trait per preset and the library replaces them row by row as content, so nothing waits on the art |
| Q4 | **Money:** the cost, 7–10 person-weeks across three milestones (V15 §8) | accept; M-ATLAS-A's 2.5–3.75 pw buys F11, F12 and F15 in hand on the world's picture rows, M-ATLAS-B's 2–3 pw F13 narrowed by F14, M-ATLAS-C's 2–3 pw F10 |

## 12 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed evidence this volume was written from):
* The owner's words F10–F15 are docs/PROGRESS.md J392, read whole with J384–J391; the spine
  `docs/design/spine-world-growth-2026-10-23.md` read whole, its §2, §10, §11, §12, §14 the rulings designed here,
  its §13 the landing table, its §15 the milestones and budget guesses, its §16 the owner's reservations, its §17
  the test families; nothing of it re-decided.
* The two research notes read for the sections named: the science note's §9 (the historical conventions and the
  warp algorithms' properties and costs as the literature states them; cited as evidence for the family chosen, J-V15.16)
  and §10 (one-way coupling, halos, multi-resolution blends, insets); the state note whole, its findings in this
  volume's revision notes (three rungs, no atlas product kind, one world per campaign, one affine world view, no host
  atlas) and its Part E gaps 10–15 each answered by a section here.
* Amendments r (`docs/AMENDMENTS-2026-10-23r.md`, seat A; read after this volume's first draft for its seam
  definitions — its §2.2 records `Requirement`, `WorldEdgeCharter`, `RenderedWorld`, `SolveResult`, its items 942, 943,
  953, 975 and its revision notes' id ledger): this volume's RQ rows name r's shapes and mark the additions this volume
  asks beyond them; r's "Not items" leaves the atlas, the relational style and the INDEX/SUMMARY V15 rows to this
  volume and the seam seat.
* V13 as it stands (its revision notes to file q): §2.1 (the regimes, `WorldHeader`, the week and its source), §2.2
  (the records, the lens records), §2.3 (the size rows), §2.4–§2.7 (the transients, identity, the lifecycle, the
  digests and storage), §3.0 (registration), §3.1 (`WorldRequest`), §3.11 (P1–P5, the transient charter, the port's
  laws), §3.17, §3.18, §4.1–§4.5, §5.1–§5.4, §5.8–§5.9, §6, §7's forms, §8.2, §8.5's row form, §9's and §10's forms,
  §11 — read in the text; the base's §2.9 `Document` and `Recipe` (the `product` union, `lensPlates`, the view keys'
  paragraph), §6.2, §9.2's admission, §9.5, §11.1's formats table, §11.5, §12.8 — read in the text; V09's §2.11,
  §3.11, §4.3's world rows, §4.19, §5.11, §5.13 — read in the text; V14's §0–§1b and §8–§13 as the template of this
  volume's form.
* That the base's §9.2 admission and the party key serve a player viewpoint without a new admission rule (V14's
  J-V14.12's reasoning, read); that V13's `renderAt` does not exist today and the world view draws under one affine
  transform with no embellishment layer (the state note A.15; the request RQ-V15-2 is new); that V13's placement
  admitted a frame subject and a site subject only (V13 §2.2 `Placement.subject`; the world subject is file r item
  1030's, added by the reviser on the map-architecture review's C15-01); that no table, record or message of V13 or the base carries an atlas, an arrangement or a relation.

**PLAUSIBLE** (reasoned, not measured):
* Every default constant of V15 §2.4–§2.5 (own, calibratable): the relation measures, the snap distances, the
  tolerances, the band width and levels, the inset rule's step, the cache stops and quality, the fit's bands, the
  drift thresholds, the warp grid and steps, the magnification, the blur, the knowledge reaches, the importance
  exponents and density classes, the embellishment thresholds and densities, the vignette window; the historical
  anchors (a mappa mundi's centre and swollen Holy Land; a portolan's rhumb network; a strip's day counts) are
  conventions the science note confirms, never numbers.
* That the flow-based cartogram at a 512 grid bakes in ≤ 1.5 s with a positive Jacobian on every fixture (SA3), that
  the multigrid solve and the integration are byte-identical across §13.2's platforms through `dmath` with
  quantisation (T-V15-9 (d); the fallback declared), and that the mesh warp at n ≤ 8 draws within 1 px on the canvas
  path.
* That the band-limited blend at 24 px hides a seam between members of one rung to the eye, that easing hides a
  one-rung step and that a two-rung step reads better framed (the owner's sitting at SA0 decides; the cells are data).
* The budgets of V15 §6 (SA0, SA3 and spike (c) measure them; the fallbacks are pre-decided) and the estimates of
  V15 §8; that the imagery cache at `lossyQuality` 85 is ≈ 0.4–0.6 B per pixel on relief-and-water pictures.
* That the compatibility checks' latitude and climate tolerances flag the clashes a user would call clashes and no
  more; that the contradiction table's five proposals cover the corner cases a continuation meets (the generator's
  verification report is the check).
* That the known region's reach rules (four weeks on foot along routes; one heard-of band) and the importance's
  exponents give the mappa mundi's look the owner asked for (the sitting at SA4); that the culture-band threshold of 4
  and the enemy-faith rule place monsters where a mapmaker's prejudice would, and nowhere a player would read a real
  people into (T-V15-6 bars the mechanism; the look is the sitting's).
* That V13's rung-general placement scales as V13 §6's laws predict for a world frame (`ATLAS-5`; spike (c)); that
  `edgeCharter` costs ≤ 200 ms per edge; that `renderAt` at stop 1 costs the tile law over 1.0625 × stop 1's pixels.
* That the two shipped viewpoints and the three presets are the right minimum; that "World map" is the owner's
  preferred label (Q1); that the host will want a per-user atlas record (H35; Q2).
* Revision 0's mechanisms, reasoned and not yet measured: the on-demand stop-2 render per visible tile keeping pan
  and zoom inside §12.5's frame budget; the label placer's one run over sixteen members' boxes ≤ 3 ms per level; the
  solver's atlas-scale evaluators inside `ATLAS-1`; the drift reading's cost inside A3's row.

## 13 Fix list

Revision 0 (2026-10-23): no critique has yet been written against this volume, so the list holds the items the
author leaves for the seam seat and the next revision, each with its reason and guard:

| id | finding | why it is left | guard |
|---|---|---|---|
| F15-1 | the H-row is named **H35**: amendments r consumed H31–H34 (its revision notes' ledger) after the state note named H31 free; the seam seat numbers the world-growth pass's H-rows once | V13 §8.5 is the one list; this volume names the row by its content wherever the number might move | **closed** — H35 confirmed free and appended to V13 §8.5 by file r item 1015 (seam-world-growth-r0 SW-12) |
| F15-2 | `RQ-V15-n` is this volume's own prefix for requests to the siblings (V14 used plain numbered lists in its §10.2 and V13 `R-V14-n` for requests the other way); the seam seat may fold them into V13 §10.2's and V09's forms under their own ids | one request list per supplier is the program's rule; this volume's ids are stable handles until folded | **closed** — V13 §10.3's R-V15-1 – R-V15-4 (file r item 1017) state what V13 asks back; the RQ ids stay this volume's handles (seam-world-growth-r0 SW-13) |
| F15-3 | amendments r's `renderAt(world, week, audience)` → `RenderedWorld` carries the tile sets at the four stops over the layers the audience may see and the known sets as coarse cells; this volume asks two additions — the placed label boxes per stop (a seam needs them whole, V15 §3.3 (5)) and an `atlas` layer set without lens or diagnostic layers (V15 §3.2 (3)) — and reads `week` below the present for the common-week display (r's "at a week") | the additions are small and inside the seam's spirit (spine §14 (2)); r's text is the single source | RQ-V15-2 names both; **closed** — V13 defines both (file r items 1007 and 1011; the set J394's — the member's default picture, the cover overlay included; seam-world-growth-r0 SW-03, C15-04) |
| F15-4 | `Recipe.rung` for an atlas reads `'atlas'` (BCR-V15-1) — a rung that is not a size; the base's `Rung` type is widened as V07 widened it, which the coherence pass may prefer to express as a product-specific exemption | the base requires a rung per recipe for replay; one value keeps the replay rule | BCR-V15-1's text offers both forms; **ruled** by the seam seat (seam-world-growth-r0 SW-14): `'atlas'` is the one rung the `atlas` product registers, which the base's own `Recipe.rung` comment admits; the coherence pass may write it as the product-specific exemption, the replay rule unchanged |
| F15-5 | amendments r's `Requirement.kind` is a closed union (`relation`, `latBox`, `climateRow` among its kinds) and `solve`'s `'arrange'` goal runs over `{ members: Placement[] }` — this volume maps its atlas-scale kinds onto r's (V15 §2.3's words as a `relation` target's `word`; the compatibility checks as `latBox` and `climateRow` at rank 4) and leaves the evaluators' home open: registered by `@plat/atlas` through one path of `@plat/world/solve`, or housed in V13 as rows of V15 §2.3's table | one engine, one registration path, is the spine's rule (§4, §14 (5)); the evaluators are small and may live in either package | **closed** — registered by `@plat/atlas` through V13's `solve.registerEvaluator` (file r item 1007; J-V13.132; seam-world-growth-r0 SW-05); V15 §2.3's table stays the single statement of what each kind asks |
| F15-6 | the derived-from-parent path (V15 §3.5 (a)) asks V13 for a world-rung charter that carries the parent's rasters as the child's coarse ground and the parent's frames as planned sites — a mechanism V13 must design (RQ-V15-3 (b)); until it exists the path is greyed with its reason | the spine names the path and its principle (§10.6, §3); the design is V13's one rung up | **closed** — V13 defines the world subject of `requestCharter` and the `WorldCharter` (file r items 1007, 1009, 1010; J-V13.131; seam-world-growth-r0 SW-06); V15 §8's risk 3 and its fallback stand until M-W6 lands it |

## Integration notes (for the seam seat and the world-growth coherence pass)

* **What this volume reads from V13, by name** (V15 §1b.6): `WorldHeader`, `WorldSizeRung` and the size rows,
  `WorldPointCm` and the datum, the world's week and date label, `edgeCharter` and `WorldEdgeCharter` (amendments r),
  `renderAt` (amendments r items 942, 1007, 1011; RQ-V15-2), the rung-general `placeFrame` / `requestCharter` / transient `charterFor` (amendments r items 975, 1009, 1010;
  RQ-V15-3), `viewFacts` over the lens plates (amendments r items 1007, 1012; RQ-V15-4), `solve` (amendments r item 942 with 1007's evaluator registration; RQ-V15-5), `derivedTime`,
  `worldFactsAt`, the conflict list and the fork preview, V13 §5.2's page pattern, V13 §5.4's export rows (refused on
  an atlas). Nothing of V13 is restated; every spine §14 seam is one RQ row.
* **The spine's shared rules** are obeyed: the ladder's one rule at the atlas ⇄ world seam (the more detailed wins on
  its footprint; a rung reads the rung above only at its own generation through a boundary record — the edge charter —
  and nothing dated crosses); the three lifetimes untouched (the atlas holds none); one requirement engine (the
  arrangement's kinds registered with it); the precedence ladder and the approval rule (the fit's and the
  continuation's conflicts are V13's lists on the member's page); the vocabulary (atlas, member, seam, continuation,
  fit, viewpoint, plate); the ids minted only from this volume's own ranges.
* **M0:** nothing here touches `plat/packages/kernel`; the `atlas` concern and the stage ids `A1`–`A7` are registry rows
  appended after M0 under K6 (BCR-V15-12), listed in the BCR ledger.
* **The coherence pass** applies BCR-V15-1 – BCR-V15-15 after amendments r's items 926–1032, numbered from 1033, adds the three milestones
  to §16 and INDEX.md's tables with the row texts of V15 §10.4, folds RQ-V15-1 – RQ-V15-11 into V13 §10.2's, V09's,
  V10's, V11's, V12's and V14's fix lists, appends H35 (or its renumbered id) to V13 §8.5's list, and reads the
  review record of V15 §14 (the two critiques' findings against this volume, and what changed) beside V15 §13's list.

## 14 Review record (the reviser seat volumes/revise-world-growth, 2026-10-23; J393, J394)

PROGRESS: the two reviews read whole; every finding against this volume verified at its source and ruled below; the
edits made in place (§0, §1.2, §1.3, §1b.2, §1b.5, §1b.6, §2.2, §2.3, §2.4, §2.11, §3.1, §3.2, §3.4, §3.5, §3.6, §3.11,
§4.7, §5.2, §6, §7, §8, §9, §10, §11, §12, §13, the integration notes, the revision note); the findings against
amendments r are recorded in that file's own review record. The map-architecture review's ids are `C15-nn`; the
science-and-host review's are its numbered findings, written `S-nn`.

| id | severity | verdict | what changed, or why not |
|---|---|---|---|
| C15-02 | blocker | accepted | file r item 1007's `ViewFacts` widened (every seat's `at`, every sway's `poleCm`, `areaKm2` and `border`, the `cultures` table, the events' `at`); here §1b.5 gains the row, §1b.6 and RQ-V15-4 name the widening, §3.6 (1) (b), (2), (5) and (8) read the fields by name |
| C15-03 | major | accepted | (a) the template pre-fill dropped (a recipe's template is a record); the poles and the calendar asked of r as `WorldEdgeCharter.world` (item 953), read in §3.4 (4) and `ContinuationRequest.prefill`; (b) the bathymetry asked of r as `ViewFacts.water.bathymetry`, one coarse grid per member on request (item 1007), read in §3.6 (5) — not `worldFactsAt` per cell; (c) the base's reader of §11.2 added to R-V15-4 (item 1017) for the header and the digests, named in §1b.6 and `Member.header`; (d) the culture label from `ViewFacts.polity.cultures[]`, §3.6 (8) |
| C15-04 | major | accepted as J394 rules | the `atlas` layer set is the member's default picture — relief with the cover's used and disturbed classes over it, water, routes, settlements, labels, the sway's fills and borders, the occupation, debatable and fighting overlays, the event pins; lenses, diagnostics and DM-only marks for a player excluded (file r items 979, 1007, 1011, 1014, 1016; here §1.2, §1b.6, §3.2 (3), §4.7 (4), §5.2's legend line, RQ-V15-2, J-V15.35, §13's F15-3) |
| C15-05 | major | accepted | the state `{ members: ArrangeMember[] }`, `opts` optional, no `scope` on an atlas requirement, a lock a rank-2 `lockRegion` row, `maxIterations` in the call (file r item 1007 (c); here §1b.6, §2.3, §3.1 (2), RQ-V15-5) |
| C15-07 | major | accepted | `'range'` is the one word: `ContinuationRequest.contradictions[].proposal` and `ContradictionRow.proposal` take V13's `landform` feature words; §3.4 (5) names the chip's label "a mountain belt" and sets `bearingCdeg` across the wind; §2.4's shipped cells follow |
| C15-08 | major | accepted | the level–stop table recomputed from the formula (every cell its value); "native" defined as the level where stop 1 is one to one, stop 0 two levels coarser; `maxLevel` 11 is 8 m per pixel (the comment and J-V15.6 corrected); `ATLAS-2`'s law 1.0625 × stop 1's pixels (and §12); `ATLAS-6`'s pinned stop 2 at 16 × stop 1 (and §2.11) |
| C15-10 | minor | accepted | §3.5 (c) and §3.11 (3) cite V13 §2.2's `ConflictChoice` and list nothing (the counts are file r's to state once: its items 935, 939, 984, 985, 987 now say seven, five offered everywhere) |
| C15-19 | minor | accepted | "the host's boundary" in §10.4's Q2 row and §11 (twice); file r item 1024 (b) likewise |
| C15-20 | minor | accepted as J393 (5) rules | §1.3's last paragraph: F1–F9 are seat A's; F16 is the manager's rule, quoted in file r item 1029 and assigned to no seat |
| C15-21 | minor | accepted | the records' item is 953 in the revision note's reading (§12), §1b.6 and RQ-V15-1 (item 954 is the rule tables) |
| C15-22 | minor | accepted | the restatement deleted in §1b.6 and RQ-V15-3; both cite item 942's rule (the parent's cell ratio) |
| C15-23 | minor | accepted | `ContradictionRow.threshold`: "classes (V13 §3.11's `biome` term's adjacency)", "a bedrock class" |
| C15-24 | minor | accepted | the proxy sentence of §3.1 (4) deleted ("both checks read `edgeCharter`, which M-W6 lands before any atlas exists"); §8's risks (3) and (4) rewritten as the M-W6-order risks they are, their fallbacks kept where they still mean something; J-V15.36's proxy clause deleted; §1b.6's "until it lands" cell for `solve` emptied |
| C15-25 | minor | accepted | §4.7 (4) lists the set's layers that keep a history (the dated surfaces, the routes in force, the sway's revisions, the events, the cover plate); T-V15-3 and T-V15-25 name the `atlas` layer set and T-V13-68 (g) |
| C15-26 | minor | accepted | `MemberImagery.audience` admits `'public'` |
| C15-27 | minor | accepted | §3.4 (3) cites V13 §2.2's `WorldEdgeCharter`, every field, and restates none; §1b.6's first row likewise |
| C15-28 | minor | accepted | `renderAt(world, week, audience, { layers })` asked of r (item 1006; the `settlements` and `labels` rows alone) and read in §3.5 (a) |
| S-1 | major | accepted in part, as J393 (1) rules | the test is "a present physical fact, never a record" (the neighbour's present ground at the moment of reading, however it came to be; never a dated record nor any later change), stated once in V13 §2.2 and cited here: §0, §1.2, §1b.6, §3.4 (3), §3.11 (4), (6), T-V15-2, J-V15.13, J-V15.25, J-V15.29, RQ-V15-1; the review's "timeless state with the traces' former values" is rejected (a `happened` edit made before the continuation is the ground, J393), and no J-V15 row is added (the ruling is the manager's, recorded in file r's choice (q)) |
| S-17 | major | accepted in part, as J393 (5) rules | F10, F11, F13 and F15 quoted whole in §1.3 from J392 (the orientation clause of F10 restored; typos kept); F16 is file r item 1029, the manager's rule, not seat A's (§1.3's last paragraph) — the review's items 1029–1035 for F10–F16 in file r are not taken |
| S-29 | minor | accepted | §3.6 (1) (b)'s numerics state ∂φ/∂n = 0 on the padded border and ρ̄ the mean over the whole padded grid; `ATLAS-7`'s law reads 12 reads per step (four velocity evaluations of three), its estimate 0.6–0.9 s inside the same ≤ 1.5 s, re-checked by SA3 |
| S-32 (open issue 1) | minor | accepted as J394 rules | the land-cover layer's overlay is in the picture (above, C15-04); the one legend line "derived land cover" is the atlas page's (§5.2) |
| S-33 (open issues 4, 6) | minor | accepted | `WorldCharter.ground.biome` dropped in file r item 1007; the proxy sentence and the vacuous guards deleted here (C15-24) |

The map-architecture review's C15-01 (the `world` placement kind), C15-06 (the parent charter and a scenario), C15-09,
C15-11 – C15-18 and the science-and-host review's findings 2–16, 18–28, 30, 31 and 34 are findings against amendments r
and are ruled in its review record; where this volume reads what they changed (`Placement`'s world subject, item 1030;
the `range` feature; `WorldEdgeCharter.world`; the derived child's `scenario` `'none'`), the sections above cite the item.
The seam seat's open issues 2, 3, 5 and 8 stand as both reviews judged them (no change). **Counts against this volume:**
22 findings — 20 accepted, 2 accepted in part (S-1, S-17: their findings real, their fixes replaced by the manager's
rulings), 0 rejected.
