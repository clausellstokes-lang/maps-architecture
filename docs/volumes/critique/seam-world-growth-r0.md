# Seam check: the world as amendments r leaves it (V13) and the atlas (V15) against each other, the spine, the base, INDEX, SUMMARY and README — round 0

> PENDING FABLE REVIEW — written by the session's seam seat volumes/seam-world-growth under the owner's delegation (J392; 2026-10-23); covered by the whole-design retrovalidation (J84).

PROGRESS
- §0 Method and inputs (files, md5, lines) | done
- §1 Seam findings SW-01 – SW-19: the two texts, the ruling, the edit made or requested | done
- §2 The in-place edits made to V15 and to file r, and the items added to file r (1006–1028) | done
- §3 Open issues for the reviewers | done
- §4 CONFIRMED versus PLAUSIBLE; the dry-run result | done

## 0 Method and inputs

Lane `volumes/seam-world-growth`, 2026-10-23. Read whole, in order, nothing sampled: the spine
`docs/design/spine-world-growth-2026-10-23.md` (455 lines, md5 f9bd77e6…; its §12
vocabulary and §14 seams read twice), `docs/AMENDMENTS-2026-10-23r.md` as it landed (3 176 lines, md5 fd387368…;
after this lane's edits 3 691 lines, md5 6dd6ca4b…), `docs/volumes/V15-atlas.md` as it landed (2 128 lines, md5
de3fb6e5…; after this lane's edits 2 122 lines, md5 9c8265f1…). The V13 sections file r amends were
read twice: as they stand (`docs/volumes/V13-world.md`, 4 438 lines, md5 9e4e8b9b…) and as the items would leave them — seat A's
dry-run script (`world-growth/dryrun-A/dryrun.py`, md5 d01147df…) was copied to the seam scratch directory
(`world-growth/seam/`), run in `apply` mode over copies of every target, and the amended copies read where V15 depends
on them: §1b.2, §2.2 (`Placement`, `FrameCharter`, `WorldEvent`, `LensFacts`, `PolityFacts`, `PolitySeat`, `PolityRelation`,
`Sway`, `Allegiance`, `WorldRoute`, `TravelLaw`, `WorldHeader`, the new `Requirement`, `SolveResult`, `solve`, `WorldEdgeCharter`,
`RenderedWorld`), §3.1 (1), (5)–(7), §3.11's world-first order and transient form, §3.18, §4.1, §5.1–§5.4, §5.8 (1)–(9), §5.9's row
heads, §6, §7's T-V13-68 and T-V13-70, §8.2's M-W6 row, §8.5's H1–H34, §9's J-V13.44 and J-V13.107–130, §10's head and
§10.2, §13 and the integration notes. The base (`docs/ARCHITECTURE.md`, 24 461 lines) was read where V15's BCR rows quote it
(§2.9 `Recipe` l. 3886–3900 and `Document.lensPlates` l. 3881, the view keys l. 4200, §9.5's cue sentence l. 15976, §11.5 l.
17744, §12.8 l. 18273, the `Rung` type l. 338); every quote V15 §10.1 gives of the base exists in the base as it stands
(verified by fragment search). `docs/volumes/INDEX.md` (257 lines, md5 8972b3d9…) and `docs/volumes/SUMMARY.md` (211 lines,
md5 c6264602…) were read whole as they stand and as items 1001–1005 leave them (the amended copies); `README.md` (31
lines, md5 bc1f950f…) whole. The form of this file is `critique/seam-world-sites-r0.md`'s §0–§1 (md5 8eceb066…).

**What a seam piece is here.** Every record, field, function, signature, stage duty, edit kind, milestone, budget row,
host row, decision, test clause, INDEX/SUMMARY/README row and vocabulary word that V15 reads of V13 (the spine's §14's five
seams and the sixth that forbids a reverse one), or that file r's new texts and V15 both state (the ladder's rule, the
microcosm rule, the §12 words), traced both ways: V15 §10.2's RQ-V15-1 – RQ-V15-6 and §1b.6 against what file r's items
942, 943, 946, 953, 954, 960, 975, 981, 984, 985, 986 declare; file r's W-SEAM row and T-V13-68 against what V15 consumes;
V15 §1b.5's field names against V13 §2.2 and §5.9; V15 §10.4's INDEX and SUMMARY texts against the files as items
1001–1005 leave them; every id against file r's census and V15's own series.

**The rule of decision.** The spine's §14 is the contract; V13 owns every definition (names, signatures, fields,
semantics, milestones, budgets); V15 owns its own records, page and view. Where V15 asked for a piece V13 lacked, an item
was added to file r (continuing its numbering, after item 1005, quoting the targets as items 935–1005 leave them); where
V15 asked for a piece file r defines differently, the ruling is written under the finding and V15 was edited in place
(exact-match replacements, each occurrence count asserted, §2). The dry run of file r was re-run after the edits
(§4).

**Severity.** *Blocker*: the two sides cannot both be built as written (two definitions of one thing; a request shape W0
cannot read). *Major*: a reading V15 takes that file r does not define, or defines otherwise; a milestone order the two
state differently. *Minor*: wording, a vocabulary slip, a count, a citation.

## 1 Seam findings

### SW-01 — blocker, fixed — the continuation's request shape: V15 wrote the recipe's entry into the request

**The two texts.** V15 §10.2 RQ-V15-1 (as landed): "consumed by W0's step 6 as `Requirement { source: 'edgeCharter';
kind: 'edge'; strength: 'locked' }` rows of a `WorldRequest.edgeCharters[]` entry `{ side; neighbour: { doc; version };
charter }`". File r item 960 (V13 §3.1 (1)): "`edgeCharters?: WorldEdgeCharter[] /* a continuation into a void beside
atlas members (step 6) */`" — the request carries bare charters; item 946 (V13 §2.2 `WorldRecipe`): "`edgeCharters?: {
side: 'N'|'E'|'S'|'W'; neighbour: { doc: Uuid; version: string }; charter: WorldEdgeCharter }[]`" — the entry shape is the
recipe's, which W0 writes from the charter's own `world`, `side` and `neighbourVersion`.

**Ruling.** File r's shapes stand (V13 owns the request and the recipe); V15 §3.4 (7)'s mechanism ("V13's W0 takes each
charter as a `locked` `Requirement` … from the request's `edgeCharters[]`") was already right, only its RQ row misnamed
the shape. The atlas's continuation request therefore produces exactly the `WorldRequest` file r's W0 consumes: the
carried `WorldEdgeCharter`s unchanged in `edgeCharters`, the pre-fill as `set` `OptionChoice` rows (V15 §3.4 (4); J-V15.29),
the accepted reconciling features as `set` `landform` rows (SW-04).

**Edits.** V15 RQ-V15-1 reworded (§2, V15-E6b); file r item 1008 (a) states W0's mapping in V13 §3.1 (1) and adds
`parentCharter` beside it (SW-06); V13 §10.3's R-V15-3 (item 1017) asks V15 for exactly this request.

### SW-02 — major, fixed — `edgeCharter`'s `span: 'whole'` and the re-match under a requirement

**The two texts.** V15 §1b.6 and RQ-V15-1 (a): "a `span` of `'whole'` (the full side) for A1's edge summaries and the drift
read"; §3.11's worked example: "`edgeCharter(Ashmark, 'S', whole)`"; RQ-V15-1 (c) and §4.7 (3): "that a `regenerate` over a
box may take an edge charter as a `locked` requirement (the re-match …; r's `regenerate` on any stage holds every
override — the charter requirement is the one addition)". File r item 942: "`edgeCharter(world, side, span)` →
`WorldEdgeCharter`" with item 953's `span: { fromCm: WorldCm; toCm: WorldCm }`; item 975 (c)'s `regenerate` scope `{ kind:
'world'; stage; box?; region? }` — no requirement rides a `regenerate`; item 946: the charters are "never re-read after
generation".

**Ruling.** V13's signature stands: a whole side is the full side's span, no sentinel. The re-match the spine's §10.5
allows ("regenerating or refitting a border strip of ONE member, previewed") is not a new field on `regenerate` but the
two edits file r already has: `setRequirements` replaces that side's `edge` rows by the neighbour's live charter (appended
to `WorldRecipe.edgeCharters` with its version — the one re-read, timeless by construction), then `regenerate` of W1 over
the strip's box runs under the recipe's rows as a continuation's stages do.

**Edits.** File r item 1008 (b) writes the re-matching paragraph into V13 §3.1 (6) (and T-V13-68 (i), item 1014 (a)); V15
edited in RQ-V15-1 (a), (c), §1b.6, §3.11 (4), §4.1's `rematchStrip` comment and §4.7 (3) (V15-E6, E7, E8, E9, E10).

### SW-03 — major, fixed — `renderAt`: the label boxes and the `atlas` layer set (V15 §13's F15-3)

**The two texts.** V15 RQ-V15-2 asked "(a) the placed label boxes per stop beside the tile set … (b) an `atlas` layer set
for the reading — the structural layers with `relief`, the cover layer as V13 §5.8 (9) filters it, no lens layer and no
diagnostic layer … or, failing a parameter, that set as `renderAt`'s one layer set", while V15 §3.2 (3) and J-V15.35 read
the set as "relief, water, routes, settlements with their glyphs at the stop, labels — no lens, no diagnostic, no placement
outlines" (no cover layer): V15 disagreed with itself on land cover. File r item 953: `RenderedWorld.tiles: { stop; set }[]`
— no boxes; item 981 (V13 §5.4): "the §8.1 tile sets at the four stops over the layers that audience may see (the player
picture of V13 §5.1 for a party; the lens and cover layers filtered as V13 §5.8 (7) and (9) say)" — a set that admits lens
and cover layers. The spine's §14 (2): "V15 reads a world's rendered tiles at its present week, extent, datum, latitude box,
size rung, present week and date label, known-world sets per audience, and nothing else".

**Ruling.** V13 defines both. The placed label boxes are the picture's own metadata (the placer's boxes at the stop) and
ride the tile set as `RenderedWorld.tiles[].labels` — inside "the rendered tiles", so inside the spine's "nothing else".
The `atlas` layer set is relief, water, routes, settlements with their glyphs at the stop and labels — no lens layer, no
`landCover` layer, no diagnostic layer: a lens and the cover layer are labelled, legended instruments of a world page (V13
§5.8 (2), (9)) and an atlas's picture carries no legend for them; V15 §3.2 (3)'s list wins over its RQ row. `week` below the
present was already admitted by item 953 ("the week drawn: the world's present unless asked otherwise") — no edit.

**Edits.** File r items 1006 (a) (the §1b.2 row), 1007 (b) (`tiles[].labels`), 1011 (V13 §5.4 names the set), 1014 (a)
(T-V13-68 (g)), 1016 (J-V13.134); V15 edited in RQ-V15-2, §1b.6, §3.2 (3), J-V15.35 and F15-3 (V15-E11 – E15).

### SW-04 — major, fixed — the `landform` requirement kind (file r's own V09 text and V15's reconciling features)

**The two texts.** File r item 992 (V09 §4.22 (5)): the inclusion chips "a desert, a great river, an inland sea, a mountain
range, a monsoon coast, a cold coast … each a `biome`, `landform` or `water` row of the request"; file r item 953's
`Requirement.kind` union: `'extent'|'latBox'|…|'water'|'context'|'density'|'polity'|'names'` — no `landform`. V15 §3.4 (5):
a contradiction's "reconciling feature proposed as an extra `set` requirement … a sea, a strait, a mountain belt, a rift,
an escarpment … the solver (spine §4) takes the accepted feature as a requirement at rank 3" — a feature with no kind.

**Ruling.** One kind, `landform`, with a target `{ feature; extentKm2?; at?; bearingCdeg? }`, satisfied by the formation op
where a scenario runs (its regional feature or a profile laid at the place asked), else by W1's `range`, `trough` or
`strait` ops with `origin: 'solver'`, verified by W1 — the world dialog's chips and the continuation's proposals are the
same row.

**Edits.** File r item 1007 (a); V15 §3.4 (5) names the kind (V15-E33); R-V15-3 (item 1017).

### SW-05 — major, fixed — the arrangement solver's evaluators (V15 §13's F15-5)

**The two texts.** V15 §3.1 (2) and RQ-V15-5 (a): "the atlas-scale evaluators of V15 §2.3's words registered or housed as
F15-5 says … be registered by `@plat/atlas` through one registration path of `@plat/world/solve` — or, if r keeps
`Requirement.kind` closed and the evaluators V13's, that V13 house V15 §2.3's table as its rows"; V15 §3.1 (2) also described
the engine's search ("its atlas-scale evaluation is a rectangle-packing search over the plane"). File r item 953:
`solve(requirements, state, goal, opts?)` with `'arrange'` "over placements only, no world stage" — no registration path and
no search stated; the spine's §14 (5): "the requirement engine's interface is V13's; V15 calls it over map placements".

**Ruling.** As V14's siting terms are V14's plug-ins registered through V13's `terms.register` (seam-world-sites-r0 SW-01),
V15's atlas-scale kinds are V15's evaluators registered once through V13's `solve.registerEvaluator(e: ArrangeEvaluator)`;
the engine — the ladder, the least-change search over the placements (stated once in V13: each step moves the one
unlocked placement whose move lowers the summed cost most, on a lattice of the placements' coarse cells, ties by ordinal,
bounded by `opts.maxIterations`, which is the caller's cell), the report and the conflicts — is V13's and runs no world
stage. V15 §2.3's table stays the single statement of what each kind asks.

**Edits.** File r items 1006 (b), 1007 (c), 1014 (a) (T-V13-68 (f) widened), 1016 (J-V13.132), 1017 (R-V15-2); V15
edited in §1b.6, §3.1 (2), RQ-V15-5 and F15-5 (V15-E19, E21, E22, E23).

### SW-06 — major, fixed — the derived-from-parent path (V15 §13's F15-6)

**The two texts.** V15 §3.5 (a) and RQ-V15-3 (b): "`requestCharter` with a world subject (the world-first order one rung
up …) whose charter carries, beside `FrameCharter`'s fields at the extent's ring, the parent's rasters over the extent as
the child's coarse ground and the parent's placed frames inside the extent as planned sites … a mechanism V13 must design
(RQ-V15-3 (b)); until it exists the path is greyed". File r item 975 gives `placeFrame` the world form (`frame: { kind:
'world'; doc }`) and item 942 the `fit` row; `requestCharter.subject` stays `{ kind: 'frame' } | { kind: 'site' }` (V13 §4.1,
unamended by r). The spine's §10.6: "derived from the parent (generated from the parent's data as a settlement is from its
world — coherent by construction; the preferred path)".

**Ruling.** V13 defines it, one rung up from its own world-first order (C13-04): `requestCharter` with
`subject: { kind: 'world'; rung; extentCm }` creates a `Placement` of subject kind `world` on the parent with
`precedenceStamp: 'world'`, runs P4 only and emits a `WorldCharter` — the four edge charters along the extent's sides, the
parent's rasters over the extent as the child's coarse ground (upsampled by the child's W1 as a baked formation-grid DEM
is, item 961's one principle), the parent's placed frames inside the extent as rank-1 `site` rows; the child's request
carries it as `WorldRequest.parentCharter`, its recipe stores it as `WorldRecipe.parentCharter`; the transient world-rung
`charterFor` builds the same record and writes nothing (the mismatch reading). Two refusals: `refuse.place.worldRung`,
`refuse.place.worldBearing`.

**Edits.** File r items 1007 (b), (d), 1008 (a), 1009, 1010, 1014 (a) (T-V13-68 (h)), (c), 1016 (J-V13.131); V15 edited in
§3.5 (a), RQ-V15-3 and F15-6 (V15-E20, E24, E25).

### SW-07 — major, fixed — `viewFacts`: the relational style's facts (RQ-V15-4)

**The two texts.** V15 §1b.6: "`viewFacts(world, week, audience)` (this volume's name for the one reading amendments r's
W-SEAM row names in V13 §5.8 without a function; RQ-V15-4)". File r item 938's W-SEAM row: "the lens facts the relational
style reads" — a reading named, no function, no record; V13's `lensAt(world, lens, week, audience)` returns a lens's drawn
marks, not a fact set.

**Ruling.** V13 defines `viewFacts` → `ViewFacts` as V13 §5.8 (10): one reading from the plates at `week` and the event
index, audience-filtered as (7) filters a lens, absent facts named by field, class 4 at the reader. **Every field V15
§1b.5 reads exists in V13 as amended, by name** (verified in the amended copy): `LensFacts.hierarchy[]`,
`LensFacts.faithPlaces[]`, `LensFacts.faith[].patron` and `.contested`, `LensFacts.realmRank[]`, `Allegiance.root` and
`.members`, `PolitySeat.tier`, `.sizeThird`, `.prosperity`, `LensFacts.sizes[]`, `LensFacts.economy[].entrepot.centrality`,
`.exports` (a `LensGood[]`, counted), `LensFacts.links` (`LensLink[]`), `PolityRelation.word` (mapped to respect / neutral /
adversarial) and `.atWar`, `PolityFacts.culture[].band` (0–5), `Sway.neighbours[].class`, the religion lens's "historic
front" link (V13 §5.9 (6)), `WorldEvent` (kind, week, `at`, `seats`, `audience`), `WorldRoute.waterRuns`,
`TravelLaw.water.stormFactor[]` (per quarter), `knownTo`, `derivedTime`, `WorldRoute.stations`. Nothing is renamed; `ViewFacts`
is typed from those records.

**Edits.** File r items 1006 (b), 1007 (b), 1012, 1014 (a) (T-V13-68 (j)), 1016 (J-V13.133); V15 edited in §1b.6, RQ-V15-4
and the integration notes (V15-E34a, E34b, E35).

### SW-08 — minor, ruled — the word "seam"

**The two texts.** The spine's §12: "**seam** | a shared edge between atlas members | never: the base's 'seam' between
volumes (a document-review word, confined to docs/volumes/critique)". The spine's own §14 is titled "The seams between
V13 and V15" and its (6) "No reverse seam"; file r's new texts carry "the seams owed to V15" (items 935, 938, 953, 984,
986, 1001; T-V13-68, J-V13.127, the W-SEAM row) and "the dossier seam" (M-W6's name, T-V13-65, BCR-V13-46); V15 carries "no
reverse seam" (RQ-V15-6, T-V15-19) and "the one-way seam the spine §14 names" while its naming paragraph confines the
review sense to the critique lane.

**Ruling.** A word the contract uses in a sense cannot be forbidden to the volumes that cite it: standing alone, "seam"
means a shared edge between atlas members in both files; the interface sense is admitted only inside the fixed phrases
that cite the spine's §14 — "the seams owed to V15", "no reverse seam", "the dossier seam". File r's texts are left as
they stand (every occurrence is one of those phrases, or the atlas sense — "nothing dated crosses a seam", "the seam
fixture (two worlds sharing one edge)"); V15's naming paragraph now states the ruling (V15-E31). Census after the edits:
file r "seams owed to V15" ×7, "dossier seam" ×7; V15 "reverse seam" ×4, "seams owed to V15" ×1, "dossier seam" ×1.

### SW-09 — minor, fixed — "plate" for a crust block in file r's new texts

**The two texts.** The spine's §12: "**plate** | the lens cache's snapshot per host advance | never a tectonic plate";
"**crust block** | formation's moving crustal unit"; file r's own T-V13-72 lints "`plate` never used for a crust block".
File r item 937 (V13 §0): "no plate ever moves again"; item 940 (§1.4): "no plate moves, no clock steps a forest"; item 961
(§3.2.1): "relict structure more than live plates" and "no plate moves after this line"; item 1005 (SUMMARY): "the ground
is made once by plate motion and long erosion".

**Ruling and edit.** Five in-place edits to file r's new texts: "no crust block ever moves again", "no crust block moves",
"live crust blocks", "no crust block moves after this line", "the drift of crust blocks". The owner's own words in item 939
("tectonic plates") stay as quoted, as the head allows. V15 uses "plate" for the lens cache only (its naming paragraph;
verified by search: no "tectonic" but the naming sentence, no "crust").

### SW-10 — minor, fixed — "biome" bands and the scenario's name in V15

**The two texts.** V15 §2.4: "`climateBandTolerance` … biome-matrix bands apart at a shared stretch"; §3.1 (4): "within
`climateBandTolerance` biome-matrix bands (V13 §2.3's matrix)"; §2.6: "differ by more than one band"; §3.11: "the vegetation
bands within one". File r item 963: the matrix is "kept so an imported map with annual climate arrays classifies as it
did, never taken for a generated world"; item 967 (b)'s `biome` term: "0 when the rows agree; 0.5 when adjacent (one class
apart); 1 otherwise". V15 §3.4 (4): "a range running off the edge proposes the formation scenario *a mountain front* with
the range's bearing, spine §3"; §3.11: "the scenario *a mountain front*, bearing 95°". File r item 955's scenarios:
`collision`, `rifting`, `islandArc`, `shield`, `riftCoast`, each with a `regional` feature (`mountainFront` the `collision`
row's, run alone at the province rung); `FormationKnobs` has no bearing; item 960 (6): "a `formation` op takes the landforms
that run off the edge as fixed profiles".

**Ruling and edits.** Adjacency is one `world.biomes` row apart as V13 §3.11's `biome` term reads it (V15-E28a–d); the
scenario is `collision`, whose regional feature is a mountain front, the range's profile fixed by the charter's landforms
(V15-E29a–b). The other §12 words were checked in both files and hold one meaning: *world* (V13's document; "World map"
only as the product label, V15 §11 Q1), *atlas*, *crust block*, *biome* (the potential class) against *land cover* (the
cover plate; V15 excludes it from the charter and from the picture), *override* against *disturbance* (V15 §3.4 (3), J-V15.13),
*formation / living physics / ecology* (V15 §1.4), *continuation* (never an ongoing coupling: V15 §1.4's withdrawn level),
*fit* (V13's machinery across rungs), *viewpoint* (an audience plus a culture), *scenario* (a formation row).

### SW-11 — minor, fixed — the budgets V15 assumes of V13's readings

**The two texts.** V15 §6: `ATLAS-4` "4 × V13's `edgeCharter` (requested ≤ 200 ms per edge, RQ-V15-1)"; `ATLAS-2` "V13's
`renderAt` over 1.33 × the native pixels"; `ATLAS-5` "V13's rung-general `placeFrame` dry run"; `ATLAS-1` the solve. File r
item 983: `WORLD-16` – `WORLD-19` and `WORLD-3`'s best-form bar — no row for any reading owed to V15.

**Edit.** File r item 1013 adds `WORLD-20` (the readings owed to V15: `edgeCharter` ≤ 60 / 120 / 200 ms per side, `renderAt`
the tile law + 2 ms per stop for the boxes, a world-subject charter ≤ 4 × `edgeCharter` + the ground's references, `viewFacts`
≤ 50 ms, `solve(…, 'arrange')` ≤ 200 ms at 32 placements and 64 relations) and item 1014 (b) makes T-V13-70 measure it; V15's
RQ-V15-1 (b) now cites it.

### SW-12 — minor, fixed — H35 (V15 §13's F15-1)

**The two texts.** V15 asks a host row "H35" and says "the seam seat numbers the world-growth pass's H-rows once"; V15
§1.2 cites "the host-change list H1–H30". File r's census: "Next free ids after this file: … H35"; item 985 lands H31–H34.

**Ruling and edit.** H35 is free and is V15's; file r item 1015 (b) appends it to V13 §8.5 with V15 §10.2's text whole;
V15 §1.2 reads H1–H34 (V15-E32); F15-1 closed.

### SW-13 — minor, fixed — the `RQ-V15-n` prefix and what V13 asks back (V15 §13's F15-2)

**The two texts.** V15 §13 F15-2: "one request list per supplier is the program's rule; … the seam seat may fold them into
V13 §10.2's and V09's forms under their own ids". V13 §10.2 holds R-V14-1 – R-V14-13 (what V13 asks of V14); nothing of
V15.

**Ruling and edit.** The RQ ids stay V15's handles (its rows are now each marked granted or closed by the item that
defines them); V13 gains §10.3 "Requests to V15" with R-V15-1 – R-V15-4 (no reverse seam; the evaluators registered; the
continuation's, the derived child's and the re-match's requests in V13's shapes; every reading through the six readings
alone) — file r item 1017. V15's requests to V09 (RQ-V15-7) and to V10, V11, V12 and V14 stay BCR/RQ rows in V15 §10, as the
brief rules (7); none of them changes a base enumeration now.

### SW-14 — minor, ruled — `Recipe.rung` reading `'atlas'` (V15 §13's F15-4)

**The two texts.** V15 BCR-V15-1: "`Recipe.rung` admits `'atlas'` (the one rung the `atlas` product registers, as V07
widened the type)"; F15-4: "a rung that is not a size … which the coherence pass may prefer to express as a
product-specific exemption". The base §2.9: "`rung: Rung /* §1.1's type, widened by the village rows: the replay runs the
stage set of the product that registered the rung; a reader without that product refuses to replay, naming it (§7.5) */`";
`type Rung = 'TOWN'|'CITY'|'METROPOLIS'|'THORP'|'HAMLET'|'VILLAGE'`.

**Ruling.** The base's own comment makes the rung the product's registration, not a size: `'atlas'` as the one rung the
`atlas` product registers keeps the replay rule whole; the coherence pass may write it as the product-specific exemption
BCR-V15-1 offers — the two forms replay alike. It stays a base request of V15 §10.1 (no base enumeration must change now,
brief rule (7)); V15 F15-4 records the ruling (V15-E18). PLAUSIBLE: how BCR-V13-5's merged text reads a world document's
`Recipe.rung` was not re-read here; if it widened `Rung` with the three size rungs, `'atlas'` follows the same pattern.

### SW-15 — major, fixed — where `renderAt` lands and when M-ATLAS-A may start

**The two texts.** V15 §8 and J-V15.21: "M-ATLAS-A … after V13's M-W3 (the world's labels and picture rows, which
`renderAt` composes …) and beside M-W5; its solved arrangement switches on when amendments r's M-W6 lands — a registry
lookup"; V15's INDEX texts likewise. File r item 985's M-W6 row: "`edgeCharter` and `renderAt` (the seams, so V15's
M-ATLAS-A and -B can start)"; item 1003 (b) (INDEX §3): "V15's M-ATLAS-A and -B after M-W6's seams". The spine's §15 order by
value: "… sail routing; M-ATLAS-A; M-ATLAS-B and -C; the weather depth".

**Ruling.** V13 owns where its readings land, and file r's two texts and the spine's order agree: `renderAt` lands in
M-W6 beside `edgeCharter` and `solve`, so M-ATLAS-A follows M-W6 (beside M-W7 – M-W9) — which also removes V15's registry
lookups and proxies (the solve, the drift and the climate check run from the first day). M-ATLAS-B after M-W6 and
M-ATLAS-A; M-ATLAS-C after M-W5 and M-ATLAS-A, its facts through `viewFacts` (M-W6). J-V15.21 is amended, not reversed: its
reason (the image-only atlas is F11 in hand) holds one milestone later.

**Edits.** File r item 1015 (a) (the M-W6 row names every reading), 1016 (J-V13.134), 1022 (INDEX's graph, table and §4),
1019 (the product-map row); V15 edited in §8 (the head, SA1, SA2, the dependencies), J-V15.21, §1b.6 and its §10.4 texts
(V15-E12b, E30a–f, E36). V15 §3.1 (4)'s "until `edgeCharter` lands" proxy sentence and its risks (3)–(4) are left as
harmless guards (§3).

### SW-16 — major, fixed — INDEX, SUMMARY and README: V15's rows become items of file r; the counts

**The two texts.** V15 §10.4 gives its INDEX and SUMMARY row texts "for the seam seat to fold into file r" and names the
amendments series "from item 999 (amendments r ends at 998)"; file r's head: "INDEX and SUMMARY's V15 rows are the seam
seat's (from V15 §10)", its items 1001–1005 amend INDEX and SUMMARY and its census ends at 1005 with the next free item
1006. INDEX counts "the fourteen design volumes (`docs/volumes/V01`–`V14`)" (one occurrence; its bundle sentence names no
file range); SUMMARY "fourteen design volumes now describe" (its other three "fourteen"s count problems and items, not
volumes); README "core + index + fourteen volumes" (line 11), a V13/V14 row (line 14), the pending-changes row (line 15).
Two omissions of file r surfaced on the way: item 1005 widened the world's line to 51–66 without re-summing the
whole-program bullet ("455–620 … the earlier 392–539 plus the two lines above"), and item 1003 left SP-W9 and SP-W10 out of
INDEX §5's spikes sentence.

**Ruling and edits.** Items 1018–1025 (INDEX: the status line; fifteen volumes; the product-map row after V14's; the
request census; the wiring row and the density sentence; the graph, the milestone table and §4; risk 13 and the spikes
sentence with SP-W9, SP-W10, SA0, SA3 and the fit spike; the four owner questions and the §6 count; §7's reconciliation
sentence and §8's PLAUSIBLE price), 1026–1027 (SUMMARY: the status line; fifteen volumes; volume 15 in the opening
paragraph; thirty-seven decisions; item 15; bullet 7; the cost bullet; the whole program re-summed 392–539 + 51–66 +
25.75–36.25 + 7–10 = 476–651; the decisions bullet) and 1028 (README: fifteen volumes; the atlas volume's row naming the
volume and this seam file — its own critique round pending; file r among the pending amendment files). Every quote is
the text as items 1001–1005 leave it, verified by the dry run (§4). V15 §10.4 was rewritten from the same strings (one
source), its id references moved to 1029 / 1028 (V15-E1 – E5), "the `seam-world-atlas` check" to `seam-world-growth`,
"amendments r writes into §16" to "BCR-V15-11 asks of §16" (the M-ATLAS rows are the coherence pass's, not file r's).

### SW-17 — minor, fixed — the blend band of the fit across rungs: one statement

**The two texts.** File r item 942's rung-general row: "P2's band scaled by the child's rung"; V15 §2.4 `SeamRule.fit`:
"`blendBandM`: 4 000 under a realm parent, 8 000 under a continent (V13 §3.11.2's 2 000 scaled by the cell ratio);
`blendBandMaxM`: 12 000, 24 000" and RQ-V15-3: "the band `atlas.seams.fit.blendBandM` by the parent's rung is the atlas's
reading of 'scaled by the rung' — the seam seat reconciles the two tables to one cell".

**Ruling and edits.** The band is measured in the parent's cells (the world being bent), so it scales by the parent's
cell, not "the child's rung": one statement in V13 — `place.coherence.blendBandM` × the parent's fine cell ÷ the frame cell
of 250 m (4 000 m under a 500 m realm, 8 000 m under a 1 000 m continent, widened as §3.11.2 widens it) — written into item
942's row in place (r-V6); V15's two cells removed, its §2.4, §3.5 (c) and RQ-V15-3 citing V13's rule (V15-E25b, E26, E27a–b).
V15's `fit.marginCells` (8 parent coarse cells) stays V15's own (the dirty set the atlas re-renders), not a V13 fact.

### SW-18 — none — the ladder's rule and the microcosm rule are stated alike

The spine's §2: "the more detailed rung wins on its own footprint; the coarser rung yields around it; a rung reads the
rung above only at its own generation, through a boundary record; a rung reads the rung below only as derived readings;
nothing dated crosses a seam". File r item 960 (6): "The charters are stored with the recipe … and never re-read after
generation: nothing dated crosses a seam (the spine's §10.5)"; item 974 (18): "the continuation proceeds on the charter as
emitted and reports the drift (nothing dated crosses a seam; the atlas softens it)"; item 953's charter: "TIMELESS facts
only — the test is 'would this fact be identical at every week?'"; item 975: the world form of `placeFrame` "the child never
changed". V15 §4.7 (1): "Nothing crosses a seam after generation … the only reads across members are the seams' drift
readings (information), the continuation's charters (at the new member's generation, before it exists) and the fit's
mismatch and placement"; §3.3 (2): "the more detailed member wins"; its integration notes: "a rung reads the rung above only
at its own generation through a boundary record — the edge charter — and nothing dated crosses"; T-V15-1 – T-V15-4 carry
the spine's §17 families, T-V13-68 the same from V13's side (both read the seam fixture). The derived-from-parent path
(SW-06) is the same rule one rung up (the child reads the parent only at its generation, through `WorldCharter`). No edit.

### SW-19 — none — the decisions and the ids

J-V15.1 – J-V15.36 were read against J-V13.1 – J-V13.130 as amended: none contradicts a V13 row. J-V15.2 keeps J-V13.44's
bounded plane; J-V15.4 the one-`worldRef`-per-frame rule (V13 §3.18 (7), verified: "a frame belongs to one (`worldRef`)");
J-V15.5 V13 §5.8 (3)'s honesty rule; J-V15.9 V13 §4.4's reasoning; J-V15.12 the bearing search of P1 (admitted only at 0 for
a world); J-V15.13 the charter's content as item 953 lists it; J-V15.20 V13 §5.4's shapes; J-V15.33 V13 §5.7 / V14's `ZDecl`
rule; J-V15.35 now cites V13's definitions (SW-03); J-V15.21 amended (SW-15). V15's series start at 1 and collide with
nothing: T-V15-1 – T-V15-25, J-V15.1 – J-V15.36, BCR-V15-1 – BCR-V15-15, RQ-V15-1 – RQ-V15-11, `ATLAS-1` – `ATLAS-10`, SA0 – SA4,
F-ATLAS, A1 – A7, the `atlas` concern and stream, `W_ATLAS_*`, `refuse.atlas.*`, `E_ATLAS_*`. This lane minted, from file r's
next free ids: items 1006–1028, J-V13.131 – J-V13.134, H35, `WORLD-20`; it extended T-V13-68 with (g)–(j) rather than minting
T-V13-73; D-V13.11, BCR-V13-47 and SP-W11 stay free. Next free after this lane: item 1029, J-V13.135, T-V13-73, D-V13.11,
BCR-V13-47, H36, `WORLD-21`, SP-W11.

## 2 The edits made

### 2.1 The in-place edits to V15 (each old → new, occurrence count asserted at 1 before the replacement)

52 edits (the full strings in `world-growth/seam/edits.json`; the §10.4 rewrite counted once):

| edit | old (exact match; ⏎ a line break) | new | matches |
|---|---|---|---|
| V15-E1 | seat A: items 926–998, J-V13.107–130 | seat A: items 926–1005, J-V13.107–130 | 1 |
| V15-E2 | the next free ids are item 999, J-V13.131, T-V13-73, BCR-V13-47, H35, `WORLD-20`, SP-W11 and | the next free ids after it were item 1006, J-V13.131, T-V13-73, BCR-V13-47, H35, `WORLD-20`, SP-W11 and | 1 |
| V15-E2b | > additions as such (V15 §10.2, §13).⏎ | > additions as such (V15 §10.2, §13). **Reconciled 2026-10-23** by the world-growth seam seat⏎> (`docs/volumes/critique/seam-world-growth-r0.md`): fil … | 1 |
| V15-E3 | numbered into the amendments series from item 999 (amendments r ends at 998) in the order the seam seat sets, | numbered into the amendments series from item 1029 (amendments r, with the seam seat's items, ends at 1028) in the order the seam seat sets, | 1 |
| V15-E5 | applies BCR-V15-1 – BCR-V15-15 after amendments r's items 926–998, numbered from 999, adds the three milestones | applies BCR-V15-1 – BCR-V15-15 after amendments r's items 926–1028, numbered from 1029, adds the three milestones | 1 |
| V15-E6 RQ-V15-1 | stored whole in `WorldRecipe.edgeCharters` for provenance and never re-read; its timelessness barred by T-V13-68) — this volume consumes it as designe … | stored whole in `WorldRecipe.edgeCharters` for provenance and never re-read but by a re-match; its timelessness barred by T-V13-68) — this volume cons … | 1 |
| V15-E6b RQ-V15-1 request shape | rows of a `WorldRequest.edgeCharters[]` entry `{ side; neighbour: { doc; version }; charter }`, stored whole | rows from `WorldRequest.edgeCharters: WorldEdgeCharter[]` — W0 writes each as a `WorldRecipe.edgeCharters` entry `{ side; neighbour: { doc; version }; … | 1 |
| V15-E7 | A1's edge summaries (`span: 'whole'`) | A1's edge summaries (the full side's span) | 1 |
| V15-E8 | one charter from `edgeCharter(Ashmark, 'S', whole)`, locked | one charter from `edgeCharter(Ashmark, 'S', { fromCm: 0, toCm: 128 000 000 })` (the full side), locked | 1 |
| V15-E9 §4.7 (3) |    the seam), V13's regenerate over that box (`EditScope { kind: 'world'; stage: 'W1'; box }`, V13 §4.1) with the⏎   neighbour's live edge charter as  … |    the seam), V13 §3.1 (6)'s re-matching on request (file r item 1008): `setRequirements` replacing that side's `edge`⏎   rows by the neighbour's live … | 1 |
| V15-E10 rematchStrip | the fold opens the member's own page with V13's regenerate over the strip's box (EditScope { kind: 'world'; stage: 'W1'; box }) under its neighbour's  … | the fold opens the member's own page with V13 §3.1 (6)'s re-matching (file r item 1008): `setRequirements` replacing that side's `edge` rows by the ne … | 1 |
| V15-E11 RQ-V15-2 | asks two additions, each flagged in V15 §13 (F15-3): (a) the **placed label boxes** per stop beside the tile set (`labels: { box; text; kind; priority … | reads two pieces V13 now defines (file r items 1007 and 1011; F15-3 closed by the seam seat, SW-03): (a) the **placed label boxes** per stop beside th … | 1 |
| V15-E12a | with this volume's two asked additions, the placed label boxes per stop and an `atlas` layer set (no lens, no diagnostic), and `week` below the presen … | with the placed label boxes per stop (`tiles[].labels`) and the `atlas` layer set (no lens, no cover, no diagnostic), both V13's by file r items 1007  … | 1 |
| V15-E12b | no atlas: M-ATLAS-A waits on M-W3 (the world's labels and picture rows) | no atlas: M-ATLAS-A waits on M-W6, which lands `renderAt` over M-W3's labels and picture rows (file r item 1015) | 1 |
| V15-E13a | (amendments r's `RenderedWorld`; RQ-V15-2 with its two additions) with `week` | (amendments r's `RenderedWorld` with its label boxes and `atlas` layer set, file r items 1007 and 1011; RQ-V15-2) with `week` | 1 |
| V15-E13b | labels — no lens, no diagnostic, no placement outlines (V13 §5.1's⏎   `relief`, `water`, `routes`, `settlements`, `labels` rows; RQ-V15-2 names the se … | labels — no lens, no cover, no diagnostic, no placement outlines (V13 §5.4's `atlas` layer set over V13 §5.1's⏎   `relief`, `water`, `routes`, `settle … | 1 |
| V15-E14 J-V15.35 | \| J-V15.35 \| chose `renderAt`'s `atlas` layer set as V13's relief, water, routes, settlements with glyphs, and labels — no lens, no diagnostic, no p … | \| J-V15.35 \| chose to read `renderAt` over V13's `atlas` layer set — relief, water, routes, settlements with glyphs, and labels; no lens, no cover,  … | 1 |
| V15-E15 F15-3 | \| RQ-V15-2 names both; the seam seat confirms or narrows \| | \| RQ-V15-2 names both; **closed** — V13 defines both (file r items 1007 and 1011; the cover layer excluded; seam-world-growth-r0 SW-03) \| | 1 |
| V15-E16 F15-1 | \| the seam seat's renumbering; V15 §10.2's row text names its content \| | \| **closed** — H35 confirmed free and appended to V13 §8.5 by file r item 1015 (seam-world-growth-r0 SW-12) \| | 1 |
| V15-E17 F15-2 | \| the seam seat's fold; every row names its spine §14 seam \| | \| **closed** — V13 §10.3's R-V15-1 – R-V15-4 (file r item 1017) state what V13 asks back; the RQ ids stay this volume's handles (seam-world-growth-r0 … | 1 |
| V15-E18 F15-4 | \| BCR-V15-1's text offers both forms \| | \| BCR-V15-1's text offers both forms; **ruled** by the seam seat (seam-world-growth-r0 SW-14): `'atlas'` is the one rung the `atlas` product register … | 1 |
| V15-E19 F15-5 | \| the seam seat places them; V15 §2.3's table stays the single statement of what each kind asks \| | \| **closed** — registered by `@plat/atlas` through V13's `solve.registerEvaluator` (file r item 1007; J-V13.132; seam-world-growth-r0 SW-05); V15 §2. … | 1 |
| V15-E20 F15-6 | \| V15 §8's risk 3 and its fallback \| | \| **closed** — V13 defines the world subject of `requestCharter` and the `WorldCharter` (file r items 1007, 1009, 1010; J-V13.131; seam-world-growth- … | 1 |
| V15-E21 §3.1 (2) | and the atlas-scale evaluators of V15 §2.3's words registered or housed as F15-5 says. The engine is V13's; its atlas-scale evaluation is a rectangle- … | and the atlas-scale evaluators of V15 §2.3's words registered by `@plat/atlas` through V13's `solve.registerEvaluator` (file r item 1007; J-V13.132):  … | 1 |
| V15-E22 §1b.6 solver | the atlas-scale evaluators registered or housed as F15-5 says \| spine §14 (5), §4; amendments r item 942; RQ-V15-5 \| A1 \| | the atlas-scale evaluators registered through V13's `solve.registerEvaluator` (file r item 1007; J-V13.132) \| spine §14 (5), §4; amendments r items 9 … | 1 |
| V15-E23 RQ-V15-5 | it asks: (a) that the **evaluators** of these kinds over an arrangement state (V15 §3.1 (2)'s rectangle-packing costs; V15 §2.3's table) be registered … | granted (file r item 1007; J-V13.132): (a) the **evaluators** of these kinds over an arrangement state (V15 §2.3's table; the costs of V15 §3.1 (2)) a … | 1 |
| V15-E24a §3.5 (a) | `requestCharter` with a world subject (RQ-V15-3; V13 §3.11's world-first order one rung up: a `Placement` of | `requestCharter` with a world subject (RQ-V15-3; V13 §3.11.4's world subject, file r item 1009, emitting a `WorldCharter`: a `Placement` of | 1 |
| V15-E24b §3.5 (a) | the child's recipe carries the parent's charter as its one boundary record | the child's recipe carries the parent's charter (`WorldRequest.parentCharter`) as its one boundary record | 1 |
| V15-E25 RQ-V15-3 | asks two additions beyond r: (b) `requestCharter` with a world subject (the world-first order one rung up: a `Placement` of subject kind `world` with  … | reads two pieces V13 now defines (file r items 1007, 1009, 1010; J-V13.131; F15-6 closed): (b) `requestCharter` with a world subject (V13 §3.11.4: a ` … | 1 |
| V15-E25b RQ-V15-3 band | the band `atlas.seams.fit.blendBandM` by the parent's rung is the atlas's reading of "scaled by the rung" — the seam seat reconciles the two tables to … | the band is V13's rule — `blendBandM` × the parent's fine cell ÷ the frame cell (file r item 942 as the seam seat amended it) — and this volume keeps  … | 1 |
| V15-E26 §3.5 (c) band | P2's blend band in the parent scaled by the rung (`atlas.seams.fit.blendBandM`:⏎   4 000 m under a realm, 8 000 under a continent, widened to `blendBa … | P2's blend band in the parent scaled by the parent's cell ratio (V13's rule, file r item 942: `blendBandM` ×⏎   the parent's fine cell ÷ the frame cel … | 1 |
| V15-E27a SeamRule.fit | fit: { marginCells: number /* 8 parent coarse cells around the child's extent */; blendBandM: Record<'realm'\|'continent', number> /* the parent's ban … | fit: { marginCells: number /* 8 parent coarse cells around the child's extent */ } /* the blend band is V13's and no cell of this volume's: `place.coh … | 1 |
| V15-E27b shipped cells | the fit's⏎band scaled by the cell ratio (V13 §3.11.2's 2 000 m at a 250 m frame cell is 8 cells; 8 cells of a 500 m parent are⏎4 000 m) | the fit's⏎margin (the band itself is V13's: `blendBandM` × the parent's cell ratio, file r item 942 — 8 cells of a 500 m parent are⏎4 000 m) | 1 |
| V15-E28a | climateBandTolerance: number /* 1: biome-matrix bands apart at a shared stretch before W_ATLAS_CLIMATE */ | climateBandTolerance: number /* 1: `world.biomes` rows apart at a shared stretch before W_ATLAS_CLIMATE — adjacency as V13 §3.11's `biome` term reads  … | 1 |
| V15-E28b | classes at matching stations must lie within `climateBandTolerance` biome-matrix bands (V13 §2.3's matrix) for at | classes at matching stations must lie within `climateBandTolerance` classes of each other — adjacency as V13 §3.11's⏎   `biome` term reads it (one `wo … | 1 |
| V15-E28c | biomeDisagreePct: number /* the stretch's length share where the potential-vegetation classes differ by more than one band */ | biomeDisagreePct: number /* the stretch's length share where the potential-vegetation classes differ by more than one class (V13 §3.11's `biome` term' … | 1 |
| V15-E28d | the latitude boxes equal, the vegetation bands within one — no warning | the latitude boxes equal, the vegetation classes within one — no warning | 1 |
| V15-E29a scenario | proposes the formation scenario *a mountain⏎   front* with the range's bearing, spine §3) | proposes the `collision` scenario, whose regional⏎   feature is a mountain front at the province rung, V13 §2.3's `world.formation` rows — the range's … | 1 |
| V15-E29b scenario | ruggedness from the Greyspine running off the edge (the scenario *a mountain front*, bearing 95°), | ruggedness from the Greyspine running off the edge (the `collision` scenario, its mountain front where the charter's landform runs off at bearing 95°) … | 1 |
| V15-E30a §8 head | **M-ATLAS-A — the image-only atlas with arrangement and drill-down**, after V13's **M-W3**⏎(the world's labels and picture rows, which `renderAt` comp … | **M-ATLAS-A — the image-only atlas with arrangement and drill-down**, after V13's **M-W6**⏎(which lands `renderAt` with its label boxes and `atlas` la … | 1 |
| V15-E30b SA1 | A1's direct placement, snapping, locks, presets, the relations box storing and marking relations (the solve a registry lookup on M-W6); A2 whole with  … | A1 whole over V13's `solve` (the evaluators registered, RQ-V15-5), snapping, locks, presets, the relations box; A2 whole with `renderAt` (RQ-V15-2); A … | 1 |
| V15-E30c SA1 exit | T-V15-9 (a)–(c), T-V15-10 (b), (d), (f) (and (a), (c), (e) once M-W6 lands), T-V15-12, | T-V15-9 (a)–(c), T-V15-10, T-V15-12, | 1 |
| V15-E30d SA2 | A5's three paths over V13's rung-general placement (RQ-V15-3) and the transient world-rung charter; the drift readings and markers; `rematchStrip`; T- … | A5's three paths over V13's rung-general placement, the world subject of `requestCharter` and the transient world-rung charter (RQ-V15-3); `rematchStr … | 1 |
| V15-E30e dependencies | **Dependencies.** SA1 waits on M-W3 (`renderAt` composes the world's labels and picture rows; RQ-V15-2 is V13's step⏎inside M-W3 or beside it) and on  … | **Dependencies.** SA1 waits on M-W6 (`renderAt`, `edgeCharter` and `solve` land there, file r item 1015, over M-W3's⏎labels and picture rows) and on V … | 1 |
| V15-E30f J-V15.21 | \| J-V15.21 \| chose three milestones in the spine's order — M-ATLAS-A after M-W3 beside M-W5 with the solve switched on at M-W6, M-ATLAS-B after M-W6 … | \| J-V15.21 \| chose three milestones in the spine's order — M-ATLAS-A after M-W6 beside M-W7 – M-W9, M-ATLAS-B after M-W6 and M-ATLAS-A, M-ATLAS-C af … | 1 |
| V15-E31 seam word | lane's "seam" between volumes is a document-review word confined to `docs/volumes/critique`); **continuation** is a | lane's "seam" between volumes is a document-review word confined to `docs/volumes/critique` — admitted in this volume and in V13 only⏎inside the fixed … | 1 |
| V15-E32 H rows | the host-change list H1–H30 \| V13 §6, §8.2, §8.5; spine §15 \| | the host-change list H1–H34 (H35 this volume's, appended by file r item 1015) \| V13 §6, §8.2, §8.5; spine §15 \| | 1 |
| V15-E33 landform kind | the⏎   solver (spine §4) takes the accepted feature as a requirement at rank 3. | the⏎   solver (spine §4) takes the accepted feature as a `set` requirement of kind `landform` (file r item 1007) at rank 3. | 1 |
| V15-E34a §1b.6 viewFacts | `viewFacts(world, week, audience)` (this volume's name for the one reading amendments r's W-SEAM row names in V13 §5.8 without a function; RQ-V15-4) | `viewFacts(world, week, audience)` → `ViewFacts` (V13's: V13 §2.2 and §5.8 (10) by file r items 1007 and 1012; J-V13.133; RQ-V15-4) | 1 |
| V15-E34b RQ-V15-4 | \| **RQ-V15-4** the relational style's facts (spine §14 (4)) \| `viewFacts(world, week, audience)` → one reading per member, | \| **RQ-V15-4** the relational style's facts (spine §14 (4)) \| **granted** (file r items 1007 and 1012; J-V13.133): `viewFacts(world, week, audience) … | 1 |
| V15-E35 integration notes |   `renderAt` (new; RQ-V15-2), the rung-general `placeFrame` / `requestCharter` / transient `charterFor` (new;⏎  RQ-V15-3), `viewFacts` over the lens p … |   `renderAt` (amendments r items 942, 1007, 1011; RQ-V15-2), the rung-general `placeFrame` / `requestCharter` / transient `charterFor` (amendments r i … | 1 |
| V15-E36 §10.4 rewritten from the shared texts | (the section body) | (see file r items 1018–1028) | 1 |

### 2.2 The in-place edits to file r's earlier texts (its head, ledger and census, and the vocabulary and band reconciliations)

13 edits:

| edit | old (exact match; ⏎ a line break) | new | matches |
|---|---|---|---|
| r-V1 item 937 plate | forgets how: no plate⏎> ever moves again | forgets how: no crust block⏎> ever moves again | 1 |
| r-V2 item 940 plate | no plate moves, no clock steps a forest | no crust block moves, no clock steps a forest | 1 |
| r-V3 item 961 plates | relict structure more than live plates, so | relict structure more than live crust blocks, so | 1 |
| r-V4 item 961 plate | no plate⏎>    moves after this line | no crust block⏎>    moves after this line | 1 |
| r-V5 item 1005 plate motion | made once by plate motion and long erosion | made once by the drift of crust blocks and long erosion | 1 |
| r-V6 item 942 the band | P2's band scaled by the child's rung, P3–P5 as for a frame | P2's band in the parent scaled by the parent's cell ratio (`place.coherence.blendBandM` × the parent's fine cell ÷ the frame cell of 250 m: 4 000 m un … | 1 |
| r-H1 head | every quote matched exactly once at its turn and⏎every new text exactly once after). | every quote matched exactly once at its turn and⏎every new text exactly once after). The seam seat's items **1006–1028** (23 items, NN fragments; `doc … | 1 |
| r-H2 ledger | \| 11 \| the census, the five choices to test first (the file's tail) \| — \| done \| | \| 11 \| the census, the five choices to test first (the file's tail) \| — \| done \|⏎\| 12 \| the seam seat's items (volumes/seam-world-growth, 2026- … | 1 |
| r-H3 item 935 range | (`docs/AMENDMENTS-2026-10-23r.md`, items 926–1005; the owner's world-growth rules | (`docs/AMENDMENTS-2026-10-23r.md`, items 926–1028; the owner's world-growth rules | 1 |
| r-H4 item 935 ids | H31 – H34, `WORLD-16` – `WORLD-19`; T-V13-57 – T-V13-72; J-V13.107 –⏎> > J-V13.130; | H31 – H35, `WORLD-16` – `WORLD-20`; T-V13-57 – T-V13-72; J-V13.107 –⏎> > J-V13.134 (J-V13.131 – J-V13.134, H35, `WORLD-20` and the readings owed to V1 … | 1 |
| r-C1 census | the proposal 999, the brief 1000, INDEX 1001–1004 (4), SUMMARY 1005. | the proposal 999, the brief 1000, INDEX 1001–1004 (4), SUMMARY 1005. **The seam seat's items 1006–1028** (23 items, NN fragments; `docs/volumes/critiq … | 1 |
| r-C2 census table | \| 1005 \| SUMMARY \| item 13 and the cost lines \| | \| 1005 \| SUMMARY \| item 13 and the cost lines \|⏎\| 1006 \| V13 \| §1b.2 Stage outputs and interfaces \|⏎\| 1007 \| V13 \| §2.2 New records \|⏎\| 1 … | 1 |
| r-C3 next free ids | Next free ids after this⏎file: item 1006; J-V13.131; T-V13-73; D-V13.11; BCR-V13-47; H35; `WORLD-20`; SP-W11. | The seam seat's items add J-V13.131 – J-V13.134, H35, `WORLD-20`, the clauses T-V13-68 (g)–(j), the refusals `refuse.place.worldRung` and `refuse.plac … | 1 |

### 2.3 The items added to file r (1006–1028; every quote the target's text as items 935–1005 leave it)

| item | target | section | what it defines or carries | finding |
|---|---|---|---|---|
| 1006 | V13 | §1b.2 | the `renderAt` row over the `atlas` layer set with the label boxes; the rows of the world subject, the transient world-rung `charterFor`, `solve.registerEvaluator`, `viewFacts` | SW-03, SW-05 – SW-07 |
| 1007 | V13 | §2.2 | the `landform` kind; `RenderedWorld.tiles[].labels`; `WorldCharter`; `ViewFacts`; `ArrangeEvaluator` and `solve.registerEvaluator` (the search stated); `WorldRecipe.parentCharter` | SW-03 – SW-07 |
| 1008 | V13 | §3.1 | W0: the request's `edgeCharters` as bare charters, `parentCharter`; re-matching on request | SW-01, SW-02, SW-06 |
| 1009 | V13 | §3.11.4 | the world subject of `requestCharter`; the transient world-rung form; the two refusals | SW-06 |
| 1010 | V13 | §4.1 | `requestCharter.subject`'s world form | SW-06 |
| 1011 | V13 | §5.4 | the rendered reading draws the `atlas` layer set and carries the label boxes | SW-03 |
| 1012 | V13 | §5.8 | (10) the view reading `viewFacts` | SW-07 |
| 1013 | V13 | §6 | `WORLD-20` | SW-11 |
| 1014 | V13 | §7 | T-V13-68 (g)–(j); T-V13-70 measures `WORLD-20`; the refusals `refuse.place.worldRung`, `refuse.place.worldBearing` | SW-03, SW-05 – SW-07, SW-11 |
| 1015 | V13 | §8.2, §8.5 | M-W6 lands every reading owed to V15; H35 | SW-12, SW-15 |
| 1016 | V13 | §9 | J-V13.131 – J-V13.134 | SW-05 – SW-07, SW-15 |
| 1017 | V13 | §10.3 (new) | R-V15-1 – R-V15-4 | SW-13 |
| 1018 | INDEX | the status lines; the opening paragraph | the V15 status line; fifteen volumes | SW-16 |
| 1019 | INDEX | §1 | the product-map row for V15 | SW-15, SW-16 |
| 1020 | INDEX | §1 | the request census gains V15's requests (admission from 1029) | SW-16 |
| 1021 | INDEX | §2 | the wiring row; the density sentence (the `seam-world-growth` pair) | SW-16 |
| 1022 | INDEX | §3, §4 | the graph, the milestone table, the order paragraph | SW-15, SW-16 |
| 1023 | INDEX | §5 | risk 13; the spikes sentence (SP-W9, SP-W10; SA0, SA3, the fit spike) | SW-16 |
| 1024 | INDEX | §6 | the question count; V15's Q1–Q4 | SW-16 |
| 1025 | INDEX | §7, §8 | how V15 was reconciled; its price among the PLAUSIBLE ones | SW-16 |
| 1026 | SUMMARY | the status line; the opening paragraph | fifteen volumes; volume 15 named; thirty-seven decisions | SW-16 |
| 1027 | SUMMARY | item 15, the order, the costs, the decisions | item 15; bullet 7; the cost bullet; the whole program 476–651; the decisions bullet | SW-16 |
| 1028 | README | the table | fifteen volumes; the atlas volume's row (the volume, this seam file); file r among the pending files | SW-16 |

The dry-run script's copy in the seam scratch directory gained `README: README.md` as a target (one line, and `README` in
its heading regex); seat A's script is unchanged. File r's head, its PROGRESS ledger (group 12), item 935's id ranges and
its census name the group (§2.2).

## 3 Open issues for the reviewers

1. **Land cover in the atlas's picture.** The ruling (SW-03) excludes the `landCover` layer from `renderAt`'s `atlas` set,
   because the layer is a labelled, legended derivation (V13 §5.8 (9)) and an atlas's picture carries no legend for it. The
   spine's §10.1 ("the rendered imagery of each member at the member's own present week") can be read the other way — a
   present-week picture with the fields drawn. If a reviewer prefers the fields visible, the change is one word in V13 §5.4
   (item 1011) and V15 §3.2 (3), and the member's imagery then goes stale at every host advance (it does anyway: a window
   moves the member's version).
2. **M-ATLAS-A after M-W6** (SW-15) delays the image-only atlas (F11 in hand) behind the solver milestone; the spine's §15
   order supports it and file r's two texts say it, but the owner may want F11 earlier. The cost of the other order is one
   V13 row (`renderAt` into M-W3's row) and the restoration of V15's registry lookups — a reviewer's call, not a mechanism
   disagreement.
3. **The arrangement search's bound as the caller's cell** (`opts.maxIterations`, V15's `leastChange.maxIterations` 200)
   rather than a `world.solver` cell: chosen so V13 holds no atlas number; a reviewer may prefer the cell in V13's table.
4. **`WorldCharter.ground.biome`** carries the parent's potential-vegetation raster although the child's W5 re-classifies
   from the child's own monthly climate; it is kept for the edge grading and the dialog's pre-fill only. A reviewer may
   drop it from the record.
5. **`Recipe.rung` `'atlas'`** (SW-14): ruled as the product's registered rung; the coherence pass chooses the written form
   when it applies BCR-V15-1.
6. **V15's vacuous guards** — §3.1 (4)'s "until `edgeCharter` lands, `climateCompatible` reads the members' imagery's
   dominant biome tint" and risks (3)–(4) — are left in place; with M-ATLAS-A after M-W6 they never run. Harmless; the
   next V15 revision may delete them.
7. **The whole-program total** (SUMMARY, item 1027 (d): 476–651) is this lane's arithmetic over the lines above it; §16
   computes the totals once (file f item 568), which the coherence pass should confirm when it applies file r.
8. **The `fit.marginCells` cell** (8 parent coarse cells) stays V15's while a frame's margin is `frameOf`'s: two margins
   for two rungs, not reconciled to one rule (the atlas's is the re-render's dirty set, the frame's the placement's ring).

## 4 CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed):** the spine, file r and V15 read whole; every V13 section V15 depends on read as it stands and as
file r leaves it (the amended copies written by seat A's script in `apply` mode); every V15 §1b.5 field name searched in
the amended V13 and found (SW-07); every base quote of V15 §10.1 searched in the base and found; every INDEX, SUMMARY and
README quote of items 1018–1028 searched in the amended copies and found exactly once; the 52 in-place edits to V15 and the
13 to file r each applied by exact match with the occurrence count asserted at 1 (§2.1, §2.2; the record
`world-growth/seam/edits.json` in the seam scratch directory); the vocabulary census of SW-08 – SW-10 by search over both
files after the edits (no "biome-matrix", no `'whole'` span, no "registered or housed", no "after M-W3", no "plate" in the
crust sense outside the owner's quoted words). **The dry run of file r after this lane's edits** (its script extended with
README.md as a target), run twice: `apply` — **94 change items, 235 fragments: OK**, every quote matched exactly once at
its turn and every new text exactly once after, the copies written to `world-growth/seam/out/` (the base, V09, the
proposal and the brief byte-identical to seat A's run: md5 939749b2…, e9c4697c…, 6723d513…, 1a9042a5…; V13, INDEX,
SUMMARY and README moved by items 1006–1028 alone); `verify` (every quote against the target as it now stands) reports
exactly the 19 quotes of items 1006–1016, 1022 (c) and 1025 (b) that are written on text items 935–1005 introduce — expected
of a group applied after them, recorded in file r's group head.

**PLAUSIBLE (reasoned, not executed):** `WORLD-20`'s numbers (SW-11; measured by T-V13-70); the arrangement search's form
and its bound (SW-05; T-V13-68 (f) tests its determinism, `ATLAS-1` its cost); that the parent's ground upsampled as a bake
is gives a child coherent with its parent within `edgeRmsRefCm` (SW-06; T-V13-68 (h)); that `viewFacts` from a decoded
plate fits 50 ms (SW-07); the whole-program re-sum (§3 item 7); how BCR-V13-5's merged text reads a world's `Recipe.rung`
(SW-14); that no further V15 passage, beyond those searched by the §12 words and by the identifiers V15 §1b.6 and §10.2
name, reads a V13 fact under a name V13 does not declare.
