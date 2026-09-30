# Experiment — authoring a KNOWN city through the edit layer (the Baldur's Gate test)

Owner, 2026-09-27 ~18:00 EDT, sharing the official Baldur's Gate map (colour) and its ink-only variant
(`research/reference-maps/baldurs-gate/`, study-only, copyrighted): "Also as a bit of an experiment once you get to the
edit build, what tools and builds would you need to build the following for edits. And see if you should build it."

Assessment by the Fable manager, 2026-09-27 18:15 EDT, against the current design (`docs/ARCHITECTURE.md` sha e9c0b828…,
§7.1 edit vocabulary, §16 milestones). Labels: CONFIRMED = read in the design text this session; PLAUSIBLE = judgment.
Recorded as J78 in `docs/PROGRESS.md`; parked as backlog lane `experiment/known-city-authoring` until the edit build.

## 1. What the map is, structurally (the features an editor must be able to declare)

A harbour city on a bluff: a walled UPPER CITY (citadel, high hall, temples, manors) on the high ground; a walled LOWER
CITY sloping to a harbour with many piers and a ship used as a tavern; nine named gates in two enceintes; an OUTER CITY
of unwalled sprawl strung along three roads; a large hill inside the extent; cliffs and a cliffside cemetery; a fortress
mid-bridge with a bridge town on the deck; a satellite district across the river; district-defining places (an ethnic
enclave, a graveyard district, a temple district); some sixty named landmarks (taverns, shops, houses, towers, a
hospital, a theatre, a park, stables, a slaughterhouse) labelled with leader lines; region labels (UPPER / LOWER / OUTER
CITY) in curved type; a title cartouche, a compass, a scale bar in feet and a mile, a decorative border; hachured relief;
the same model rendered twice — district-tinted and ink-only.

## 2. Tool by tool: what the editor needs, what the design has, where it lands

| feature of the map | edit or mechanism in the design | status | build |
|---|---|---|---|
| terrain: bluff, hill, cliffs, river, coast | `setField` terrain strokes, `warp`, `drawWater`, `moveCourseKnot` (§7.1); relief tier with contour and hachure marks (§8) | CONFIRMED designed | M2a core brushes, M3a warps; relief tier base should-have (off by default) |
| two enceintes with nine gates | `drawWall` (open or closed, kind) with S7 re-trace and water gates; gates where ways cross the wall strip (`wall.gate` symbol) | CONFIRMED designed; an explicit "gate here" edit is `drawWay` through the wall — PLAUSIBLE that no separate gate edit is needed | M3a drawn constraints |
| districts drawn, kinds and names declared | `drawBoundary` (snaps to L1 cells), a whole-neighbourhood `assign`, `renames`; item 72's character vector with dossier or declared kinds winning over emergent ones | CONFIRMED designed | M3a assignments |
| landmarks pinned and named | `placeAt` (item 20 (g) positive placement), `assign`, `build` / `drawFootprint` for a specific shape, label `moveLabel`; a ship-tavern is a data-defined class row | CONFIRMED designed | M2a pins, M3a placement solver |
| harbour with piers and quays | `drawWay` with class `pier` or `quay` (WayClass includes both) | CONFIRMED designed | M3a |
| outer sprawl along roads | ribbon outskirts along arterials beyond the last enceinte (§4) are generated; drawn arterials steer them | CONFIRMED designed | M1 generation, M3a drawn roads |
| leader-line labels on every landmark | point labels get a leader line only when the footprint is under 12 px (§9) | GAP, small: a style-sheet switch "leader lines for all landmark labels at the city band" | with the label engine (M2b/M3b) |
| region labels UPPER / LOWER / OUTER CITY | curved quarter labels at the city cut of the QuarterNode tree (§9.1, §9.4) | CONFIRMED designed; a user-named quarter grouping is a rename on the tree — PLAUSIBLE | M2b |
| cartouche, compass, scale bar, border | scale bar and compass furniture (§9.5), emblem, frame and legend settings (§2) | CONFIRMED designed (title cartouche = emblem + name; PLAUSIBLE) | M3b exports |
| district-tinted and ink renders of one model | style families and thematic overrides (§8.2) | CONFIRMED designed | M1 ink, M2b thematic |
| a fortress and a town ON the bridge deck | `Bridge` is a site or a way's span through two bank vertices; ways may cross a deck; no plots on a deck; `bridge-town` exists only as a settlement-character preset (a town at a bridgehead) | GAP, larger: plots on a deck as a buildable surface | staged; not the base |
| tracing over the reference image | no underlay layer in the editor | GAP, small UI: an image underlay with opacity, never exported, never read by the model | M3a |
| authoring the whole map at once | the log's creation prefix: the blueprint's own assignments and edits enter as the log's first events (§2.9, §7.7); "Rebuild around my drawings" rebase (§7.3) | CONFIRMED mechanism; GAP, small: a SKELETON file format (terrain, water, walls, ways, boundaries with kinds and names, placements) read as that prefix | M3a |

## 3. Should we build it? Yes — as the edit build's acceptance fixture, in skeleton form, from an original skeleton

**Build:** an ORIGINAL skeleton with this map's structure and our own names (a walled citadel on a bluff, a walled lower
port with piers, outer sprawl along three roads, a hill inside the extent, cliffs and a cliffside cemetery, a satellite
across the river, a bridge fortress; the bridge town only if the staged deck-plot mechanism is built), authored two ways
that must agree: (a) as a skeleton file fed to the creation prefix; (b) by hand in the editor, one declaration at a
time. The generator fills everything the skeleton does not declare — blocks, plots, buildings, uses, labels — coherently
and deterministically (the same seed and skeleton give the same city). Both renders (ink; district-tinted) must read.

**Why it is worth building.** (1) It is the acid test of the owner's rule that everything is editable and of the
derive-before-invent principle (item 20 (h)): a human skeleton is a dossier of geometry. (2) Neither MFCG nor FTG can
reproduce a given city at all; a skeleton mode is a real improvement over the references, not a recreation. (3) It is the
SettlementForge case in miniature: a canon city whose layout is known plus a dossier that names what stands in it.

**Do not build:** an image-to-map converter (pixel tracing). It is large, brittle, and would invite copying real maps.
The underlay layer lets a person trace by hand; the skeleton file is the machine path.

**Cost (PLAUSIBLE, not priced):** almost every declaration is an existing edit kind; the new pieces are four small ones
(the leader-line switch, the underlay layer, the skeleton file format, the fixture itself) and one staged larger one
(plots on a bridge deck). The fixture's build cost is the edit build's own acceptance test, not an extra.

**When:** not before the base. M1 (a viewable town) first; the fixture becomes an acceptance bar of M3a (full editing:
drawn constraints, the rebase, assignments and the placement solver), with the four small pieces folded into the M1
build spec or the next amendments pass as program proposals (they are not owner rules).

**Clean-room:** the reference images stay under `research/`, study-only; the fixture carries no name, shape or colour
traced from them.

## 4. Vetoable calls in this note
* Build the fixture at M3a, not earlier (J78 (a)); veto: schedule an M2a subset (walls, districts, pins) as a smoke test.
* Skeleton file + hand tracing over an underlay, not an image converter (J78 (b)); veto: price a converter as a
  later extra.
* Plots on a bridge deck stay staged (J78 (c)); veto: make them base for M3a.

## 5. Superseded in scope (2026-09-27 ~18:30)

The owner then asked for the toolkit itself: "come up with an elegant set of tools for both an ai clerk and a user where a
dedicated user can build it or emulate it." The toolkit is OWNER RULE item 101 in `docs/AMENDMENTS-2026-09-27e.md`
(twelve tools in five layers, one vocabulary on three surfaces — canvas, clerk API, skeleton file); the fixture above
becomes its acceptance test (e).


## 6. A second reference — Port Nyanzaru (2026-09-28 ~23:15)

Owner, sharing the official Port Nyanzaru map (`research/reference-maps/port-nyanzaru/`, study-only, copyrighted): "And with
our tools to be built could it emulate this". Assessment by the Opus 5.5 manager against the current design and volumes
(CONFIRMED = found in the design text by search this session; PLAUSIBLE = judgment). Pending Fable review.

**What it is, structurally.** A port city about 0.8 by 1 km, north to the right: sea on three sides; jungle hills with
contours inland; a landward curtain wall with round towers anchored on the sea at both ends and a round gate plaza; an
enclosed harbour behind a long mole with a mid-mole tower, a fort at the mouth and a causeway to a lighthouse on a rocky
islet; a second, open anchorage of many jetties; terraced wards bounded by curving inner walls; ring streets around round
precincts, an arena and a plaza; a long straight road that may be raised; a ravine of stepped informal housing; a volcanic
vent by the old city; stepped pyramid temples, a star-roofed temple in a striped-stall bazaar, walled villa gardens; six
curved ward labels, coloured map markers, a border, cartouche title, ornate compass and scale bar.

| feature | tool or mechanism | status |
|---|---|---|
| coast, cliffs, hills, ravine, islet, harbour basin | T2 `ground` (terrain strokes incl. cliff, knotted coast, drawWater), bank kinds, relief contours | CONFIRMED designed |
| landward wall anchored on the sea at both ends, towers, gate plaza | T3 `wall` open chain with shore anchors (closure `shore`); item 106's barrier closure and graded stretches | CONFIRMED designed |
| inner walls around terraced wards | further enceintes (kind `inner`) via T3 | CONFIRMED designed |
| mole, fort at the mouth, piers and jetties, causeway to the islet | T4 `road` with `pier`/`quay` classes, a way across water as a bridge; item 106 (e) harbour-mouth towers and chain | CONFIRMED designed |
| ring streets around round precincts, curvilinear wards | T4 drawn loops; T8 `fill`; stage 2's `RingFabric` in V01 | CONFIRMED designed |
| wards named with curved labels | T5 `quarter`, T11 `name` | CONFIRMED designed |
| landmarks (arena, round temple, villa compounds, fort, lighthouse) | T6 `place`, T9 `shape` with drawn footprints; dome and cone roofs | CONFIRMED designed |
| ravine of stepped informal housing | slope-following blocks, item 70's informal clusters | CONFIRMED designed |
| volcanic vent, jungle, boats, map markers, border, compass, scale | T12 `dress` (ground paint, greenery, decorations, pins, furniture) | CONFIRMED designed as paint and pins; no volcanic ground mechanism |
| terrace RETAINING walls along the contours | none found | GAP, small |
| a raised road or viaduct crossing over other streets (if that straight road is raised) | none found; bridges span water, moats and canals only | GAP, small |
| stepped pyramid temples as stepped massing | none found; drawn footprints give the plan, not the steps | GAP, small (a composition row, V02) — PLAUSIBLE |
| buildings on the mole and on jetties | same class as plots on a bridge deck, staged (J-A101.04) | GAP, staged |
| the hand-painted look | our own style family; its palette and artwork may not be copied | a styling task, not an architecture gap |

**Verdict (PLAUSIBLE).** The toolkit can emulate its STRUCTURE: a dedicated user or the clerk declares a skeleton of roughly
sixty declarations (coast, cliffs, hills, harbour, mole, causeway, wall and gates, inner walls, the main ring and straight
roads, six wards, about fifteen landmarks) and the generator fills the rest — plots, some thousand buildings, alleys, stalls,
trees. It cannot and must not copy its look. The four small gaps above are PROGRAM PROPOSALS, not filed; the owner decides.
Worth adding as a second known-city fixture at M3a beside the Baldur's Gate one, built from an ORIGINAL skeleton with this
structure, because it exercises what the first does not: a wall anchored on the sea at both ends, an enclosed harbour with a
mole and a fort, ring fabric, terraces and a ravine.
