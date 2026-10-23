# The world-growth critic — gap list

> Written by the session's Fable critic seat check/world-growth-critic (J392; 2026-10-23).

PROGRESS (this file is written incrementally; a restart resumes at the first unticked line)
- §0 Method, inputs and the mechanical checks (md5s, the bundle, the lane log) | done
- §1 The gap list (numbered; severity; the exact fix) | done
- §2 Owner words F1–F16 against the applied texts | done
- §3 The six seams of spine §14 by name in the applied V13; the vocabulary of spine §12 | done
- §4 Research spot-check (ten load-bearing claims of the two Opus notes) | done
- §5 Verdict | done

## 0 Method, inputs and the mechanical checks

**Read whole, in order:** `docs/PROGRESS.md` J390–J394 (the owner's words F1–F16 and the manager's rulings J393, J394);
`docs/design/spine-world-growth-2026-10-23.md` (455 lines) whole; `docs/validation/coherence/world-growth-r.md` (the
application record); the two critiques (`docs/volumes/critique/V15.md`, 440 lines; `docs/volumes/critique/world-growth-r-science-host.md`,
431 lines) and the seam file (`docs/volumes/critique/seam-world-growth-r0.md`, 529 lines) whole, so that nothing they
record as closed is re-raised; file r's head, its owner-rule items 926–934 and 1029, its review record; then the APPLIED
texts as they stand on disk — V13's amended sections (the revision note, §1.1, §1.3, §1.4, §1b, §2.2, §2.3, §2.5–§2.7,
§3.0–§3.2 incl. §3.2.1, §3.4, §3.6–§3.8, §3.10–§3.11, §3.14, §3.16–§3.18, §4.1–§4.3, §4.5, §5.1–§5.4, §5.8, §6–§12), the
base's `HistoryHint` readers comment, §4.2 S2, II.7.6 "At generation from age", §7.7 and §11.4 (5); V09 §4.3, §4.14, §4.22,
§5.13; the proposal, the brief, INDEX, SUMMARY, README; and `docs/volumes/V15-atlas.md` (2 185 lines) whole. The two Opus
research notes (`research/world/formation-ecology-science.md`, 1 393 lines; `research/world/formation-ecology-state.md`,
1 332 lines) were read where the design leans on them and ten load-bearing claims spot-checked (§4), the state note against
the host repository `/home/user/clausellstokes-lang/settlement-engine` (read only) and the science note against its sources.

**Mechanical checks, all passed:**
- Every md5 of the record's "after" column matches the file on disk on 2026-10-23: V13 `ce535bdd…` (5 827 lines), the base
  `0d27d9ca…` (24 509), V09 `0401167b…` (5 169), the proposal `401f149e…`, the brief `1a9042a5…`, INDEX `a0674e6b…` (272),
  SUMMARY `d82309a6…` (259), README `d180f98e…` (32); V14 `a1c6d7c2…` unchanged (3 208). The working tree is clean.
- `python3 tools/bundle_architecture.py --check` → `UP TO DATE docs/ARCHITECTURE-FULL.md` (84 801 lines by the bundler's
  count, 84 800 newlines); the bundle's sources are the base, INDEX and V01–V15, so V15 is in it.
- The lane log (`docs/lane-events.log`) carries this pass's five LANDED lines, 2026-10-23 14:23–16:47:
  `volumes/architect-V15` (V15), `amendments/world-growth-r` (file r), `volumes/seam-world-growth` (the seam file),
  `volumes/revise-world-growth` (file r and V15), `amendments/world-growth-r-apply` (the record). See G-07 for what the log
  does not carry.

**Severity.** *Blocker*: a contradiction a builder would build, an owner word not carried, a host law or an M0 rule
broken. *Major*: a rule with no record, table row, test or decision; a seam V15 consumes that V13 does not define; a
budget that breaks V13 §6 or the 300 MB line; a stale statement a builder could act on. *Minor*: wording, a count, a
citation, a note a reader needs. Ids are `G-nn`. Nothing the three review files record as closed is re-raised; where a
review's fix was accepted by the reviser and the applied text still does not carry it, that is raised here as new.

## 1 The gap list

(Gaps are listed in the order found; the severity counts are totalled in §5. "r item n" is a file r item; "V15 §n" a
section of the applied V15; line numbers are the files' on disk on 2026-10-23.)

**G-01 — major — V15 §3.2 (2) (l. 883–902; the prose at l. 883, "a realm at 500 m is … stop 1 at levels 5–7", shares the table's reading), J-V15.7, `ATLAS-2`, `ATLAS-6`, T-V15-13 (a) — the level–stop table
contradicts its own formula at the three "native" cells, and a builder would build the formula.** The rule is
`stop = clamp(floor(log4(c ÷ p)) + 1, 0, 3)` with `c` the member's fine cell (250 / 500 / 1 000 m) and `p` the level's
metres per pixel (4 194 304 ÷ 256 ÷ 2^L: 256 / 512 / 1 024 m at levels 6 / 5 / 4). At those levels c ÷ p is 250 ÷ 256 =
0.977, not 1: log4(0.977) = −0.017, floor −1, stop **0** — but the table's cells read "1 (native)" for the province at
level 6, the realm at level 5 and the continent at level 4, and §3.2 (2)'s definition of "native" ("the level at which
the member's stop 1 picture … is sampled one to one") rests on them. The other eighteen cells follow the formula
(3.9 → 1, 15.6 → 2), so no tolerance reproduces the table. Built from the formula, every member at its native level
draws its stop-0 picture (0.25 px per cell) magnified four times instead of its cached stop-1 picture — the visible
quality the cache of J-V15.7 was designed to give, lost by a rounding hair; T-V15-13 (a) reads "the rule", so the test
passes either way. *Fix (V15):* in §3.2 (2) write `c` as the member's **pyramid cell** — the fine cell rounded up to the
pyramid's power of two, 256 / 512 / 1 024 m — and recompute the table from it (province: L4 0 one-to-one · L6 1 native ·
L7 1 · L8 2 · L9 2 · L10 3 · L11 3; realm: L3 0 · L5 1 native · L6 1 · L7 2 · L8 2 · L9–L11 3; continent: L2 0 · L4 1
native · L5 1 · L6 2 · L7 2 · L8–L11 3), so stop 2 ("on demand") begins one level earlier per rung than the table now
says; restate J-V15.7's and `ATLAS-6`'s "stop 2 on demand" levels and `ATLAS-2`'s 1.0625 law against the new table; and
T-V15-13 (a)'s clause "a 1 km-cell continent and a 250 m-cell province at level 6 sample 4 and 1 cells per pixel" reads
"4 and 1 **pixels per cell**" (at 256 m per pixel a 1 km cell spans 3.9 px, not the reverse).

**G-02 — major — V13 §2.2 `WorldCharter.edges` (l. 1124), §3.11.4 "The world subject" (l. 3091–3096), §1b.2's
`edgeCharter` row — the named producer cannot produce the record.** `edgeCharter(world, side, span)` is declared as the
reading of "one edge of a world": `side` names the world's own boundary and `span` is one-dimensional along it
(`WorldEdgeCharter { side; span: { fromCm; toCm }; stations[].atCm }` carries no offset from the edge). `WorldCharter.edges`
says "four: the parent's present ground along each side of the extent (`edgeCharter` on the parent over the side's
span), `side` the child's side" — but a derived child's sides are **interior lines of the parent** (its extent lies
inside the parent, `extentCm { x0; y0; w; h }`), which `edgeCharter` as signed cannot read; only the image-only child's
own four edges (`edgeCharter(child, …)`, V15 §3.5 (b)) are true boundary edges. A builder of `requestCharter`'s world
subject (M-W6) must invent the interior reading; `WORLD-20`'s bound "≤ 4 × `edgeCharter` over the child's sides" assumes
the function. *Fix (V13, one item):* `edgeCharter(world, side, span, line?: WorldCm /* the station line's offset inward
from the named side, in the axis across it; absent: the world's own edge (0) */)` in §1b.2's row and §2.2's comment on
`WorldEdgeCharter` ("… produced by `edgeCharter(world, side, span, line?)`; a `WorldCharter`'s four edges are read at
the extent's sides, `line` their offsets"), §3.11.4's sentence "(`edgeCharter` on the parent over each side's span **at
the extent's side**)"; V15 §1b.6 and RQ-V15-3 cite the four-argument form. The record itself needs no new field
(`WorldCharter.extentCm` fixes the lines).

**G-03 — major — V13 §6 `WORLD-1` (l. 4654), §2.3's size rows (l. 1267–1269) against §6's one-click table (l. 4583) and
its re-declaration (l. 4587) — one budget, three numbers, and the register row is broken by the table it points at.**
The one-click table's authored totals are 840 / 3 350 / 7 700 ms and the text re-declares `budgetMs` at 1 000 / 3 500 /
8 000 ms ("V13 §2.3's cell is data"); the budget register's `WORLD-1` still reads "the one-click totals above per rung
(900 / 3 000 / 7 000 ms …)", which the realm (3 350) and continent (7 700) totals exceed; and §2.3's `WorldSizeRow`
table still carries `budgetMs` 600 / 1 800 / 4 500 with no `formationRatio` and no `formationMs` column, though the
interface declares both and the prose under the table says "the rows gain" them. Before file r the totals (730 / 2 900 /
6 700) fitted `WORLD-1`'s bar; file r's monthly W3 and classification (+110 / 450 / 1 000 ms, item 983) put two rungs
over it and did not move the register row. A builder measuring T-V13-16's `WORLD-1` row against 3 000 / 7 000 ms fails
a world the volume's own table calls inside budget. *Fix (V13, r item 983 (g) and item 954 (d)):* `WORLD-1` reads "the
one-click totals ≤ `budgetMs` (1 000 / 3 500 / 8 000 ms on the authored path; + `formationMs` 400 / 1 300 / 2 800 with
a scenario; the noise cap and the two continent caps pre-decided)"; §2.3's rows gain the columns `formationRatio` (4)
and `formationMs` (400 / 1 300 / 2 800) and their `budgetMs` cells read 1 000 / 3 500 / 8 000 (the cell is data: the
re-declared value is the cell); the sentence "(the province row's `budgetMs` re-declared at 1 000 ms, V13 §2.3's cell
is data)" then names the cell, not a re-declaration.

**G-04 — major — V13 §6 `WORLD-5` (l. 4657) against the memory paragraph (l. 4607–4613) — the register's bar is
below the text's own arithmetic after every pre-decided fallback.** The paragraph computes ≈ 302 MB resident during W4
before the two fallbacks file r added (−1.7 MB, −5.2 MB) and "≈ 295 MB with them"; the register row reads "`WORLD-5`
memory ≤ 285 MB resident at the continent rung". 295 > 285: the bar is failed by design, with no third fallback named.
The 300 MB world line (BCR-V13-14) itself holds (295 < 300). *Fix (V13, r item 983 (f)):* either `WORLD-5` reads "≤ 300
MB (the §12.8 world line), ≈ 295 MB expected at the continent rung after the two fallbacks", or a third pre-decided
fallback is named that reaches 285 (`watershed` as Uint16 with a per-world id table, −18 MB, which brings it to ≈ 277
MB) and the paragraph's "≈ 295 MB" becomes "≈ 277 MB"; T-V13-16's clause follows.

**G-05 — minor — V13 §1b.1 (l. 548–604) and §1b.4 (l. 689–719) — two new records have no wiring row.** §1b.1 wires
`WorldEdgeCharter`, `RenderedWorld` and `SailingLeg` but not `WorldCharter` (a record persisted in the child's recipe as
`WorldRecipe.parentCharter` and the parent's `Placement.charter`, produced by `requestCharter`'s world subject and the
transient `charterFor`, consumed by the child's W0–W1 and V15's A5) nor `ViewFacts` (a view read, as `RenderedWorld` is,
which has its row); the `WorldRecipe` row names "the edge charters it was generated from" but not `parentCharter`; §1b.4
has no `WorldCharter` row (never rendered or labelled, exported with the recipe's provenance on request, persisted in the
child's recipe). The volume's own rule is "every record … with its producer and its consumer". *Fix (V13):* the two
§1b.1 rows and the §1b.4 row above, and `parentCharter` added to the `WorldRecipe` row's list.

**G-06 — minor — stale status lines: README.md l. 16, INDEX.md §7 l. 257, V15 l. 67.** File r is APPLIED (the record
`docs/validation/coherence/world-growth-r.md`; its head says so), but README's row under the heading "Changes the volumes
need in the core (not yet applied)" lists it as "pending application", INDEX §7 reads "beside amendments r (…, pending
application)", and V15's reading paragraph says "volume 13 (…, as amendments r **will** extend it)". A reader of the
index is told the growth rules are not yet in V13. *Fix:* README — move file r to its own sentence "applied 2026-10-23 by
`amendments/world-growth-r-apply` (record `docs/validation/coherence/world-growth-r.md`)"; INDEX §7 — "beside amendments
r (…, applied 2026-10-23 by its record)"; INDEX's opening paragraph (l. 15) names file r among the applied files beside
m–q; V15 l. 67 — "as amendments r extended it (applied 2026-10-23)".

**G-07 — minor — `docs/lane-events.log` — five files of this pass have no LANDED line.** The log carries the pass's
five lines (9545–9549: V15, file r, the seam file, the revision, the record) and none for the spine
(`docs/design/spine-world-growth-2026-10-23.md`), the two research notes (`research/world/formation-ecology-science.md`,
`formation-ecology-state.md`, both Opus-written with the J392 provenance line, which is right) or the two critiques
(`docs/volumes/critique/V15.md`, `critique/world-growth-r-science-host.md`); `docs/lanes.json` has no row for any of
the seven. The program's rule (every landed file a LANDED line; V15 §8's "evidence that ends each step is … the LANDED
line") is bent for the files the whole pass built from. *Fix:* five LANDED lines through `tools/lanes.py` naming the
seats (design/spine-world-growth; research/formation-ecology-science and -state, marked "(opus; validated by the Fable
design and critic seats)"; volumes/critique-V15-and-r; review/world-growth-science-host "(opus; weighed by the Fable
reviser and critic)").

**G-08 — minor — V13 §2.3 `PresetRule.options` (l. 1527) and §2.2 `Requirement.target`'s comment (l. 1078) — a source
word used as a kind.** "the inclusion chips with amounts, each an `inclusion` requirement" and "a biome id with an amount
in km² (`inclusion`)": the kind is `biome` and `inclusion` is its `source` (`Requirement.source`), as §3.1 (5) and V09
§4.22 (5) say ("a `biome`, `landform` or `water` row"). *Fix:* "each a `biome` requirement of source `inclusion`" in
both places.

**G-09 — minor — file r, the 13 "superseded in-file" new texts (items 942 (a), 946, 953 (part), 960 (a), (c), 981
(c), 983 (h), 984 (f), (g), (i), 985 (b), 986 (c), 1003 (d)) — no note at the item.** The record lists the 13 fragments
whose new text a later item of the same file (1006–1016, 1025) quotes and replaces at its own turn, "occurring zero
times by design"; file r itself carries no note at any of them (a search for "superseded" in file r finds nothing;
only the seam group's head says its quotes are "the target's text as it stands AFTER items 935–1005 would leave it").
A reader who takes item 942 (a)'s new text to V13 finds it nowhere and has no pointer to item 1006 (a). *Fix (file r):*
one line after each of the 13 fragments' new text — "*Superseded at its turn by item 1006 (a), whose new text carries
this one; the lines it now occupies are the record's.*" — or the record's 13-row list copied into file r's census under
"New texts superseded in-file".

**G-10 — minor — V13 §9 (l. 5124–5125) — J-V13.135 stands before J-V13.134.** The rows run …133, 135, 134. *Fix:*
swap the two rows.

**G-11 — minor — the proposal §10's last row (l. 274) against V13 §3.1 (1), (3) and §6 — what a one-click world does
with the formation op.** V13: "`scenario` default `'none'` — the authored path, no formation op — unless the preset or a
requirement asks for one", the one-click budget "the authored path (no scenario)", Q5 gating "a scenario … as the host
gates its own premium acts"; the proposal's row (r item 999 (e)): "the one-click world draws a scenario, the authored
path stays". The owner-facing proposal says the opposite of the volume on the default. *Fix (the proposal):* "a scenario
is an option of the world dialog, `none` by default (the authored path); when asked, tectonics and erosion run once and
are baked, never re-run". (V13 §2.3's `PresetRule` lists `scenario` among the options "`default: 'random'`" — the
sentence in §3.1 (1) should say once what `random` means for `scenario`: the row `'none'` unless a preset or a
requirement names a scenario; today it does, by implication only.)

**G-12 — minor — V13 §2.6 (the `bedrock`/`soil`/`formation` row, l. 1634) against §3.7 (1) (l. 2463–2465) and §2.2
(`WorldRaster.formation?`, l. 824) — a world with no formation op has two soil rules and no grid for either.** §2.6:
"absent on a world with no formation op: `bedrock` all 0, `soil` by the soil law over the climate alone at W5's run
(reported)"; §3.7: "a world with no formation op reads fertility 0.6 everywhere (the `inceptisol` row)"; §2.2:
`WorldRaster.formation?` is "present exactly when the recipe holds a `formation` or `weather` op or a `parentCharter`"
and `soil` lives on that grid, so an authored world (every world before M-W7, and every world whose `scenario` is
`none`) has no grid to hold the soil the first rule computes. *Fix (one sentence in §2.2 and §2.6):* "a world with no
formation op, `weather` op or `parentCharter` holds no formation grid and no `soil` raster: every reader of `soil`
(W5's overrides, W6's habitability, the cover fold's fertility, the charter's `soil`, `SettlementPhysical.soil`) reads
the `inceptisol` row (fertility 0.6, drainage moderate) and `bedrock` `ordinary sedimentary`"; §2.6's "by the soil law
over the climate alone" deleted.

**G-13 — minor — V13 §1b.2's rung-general `placeFrame` row (l. 645) and §3.11.1's term table (l. 2956–2968) — the six
terms are written for a frame document; their readings for a world child are stated only in V15 §3.5 (c), which may
restate nothing.** §1b.2 says "P1's terms over the child's edge profile at its own cell size … P3–P5 as for a frame";
the table reads "the frame's `WaterBody` of kind sea", "each frame reach", "the frame's host allegiance" — a world
child has `WaterSurface`s, `Reach`es, `coast` rings and sways of its own. V15 §3.5 (c) supplies the mapping for five
terms and the ∞ `dossier` clause, and omits `territory`. *Fix (V13 §1b.2 or §3.11.1, one sentence):* "for a world child
the terms read the child's own records: `coastSide` its W2 coast rings, `riverCrossing` its W4 reaches at its edge,
`edgeElevation` and `relief` its `dem`, `biome` its W5 mode, `territory` 0 (a world holds no host allegiance of its
own), `dossier` ∞ only where a host-bound seat of the parent lies inside the child's extent"; V15 §3.5 (c) then cites it.

**G-14 — minor — V13 §8.2's M-W6 row (l. 4877) against §5.4's `atlas` layer set (l. 4155–4172), T-V13-68 (g) in M-W6's
gate, and V15 §8 — a milestone draws a layer a later milestone lands.** `renderAt` lands at M-W6 and its `atlas` set is
"relief with the cover plate's used and disturbed classes over it"; the cover plate, the cover fold and the `landCover`
row land at M-W8 (two milestones later). T-V13-68 (g), in M-W6's gate, pixel-compares a picture with the cover overlay.
INDEX's M-ATLAS-B row carries the like note for formation's bedrock and soils ("once M-W7 lands"); nothing says it for
the overlay. *Fix:* M-W6's row — "`renderAt`'s picture without the cover overlay until M-W8 lands it (T-V13-68 (g)'s
cover clause in M-W8's gate)"; INDEX's M-ATLAS-A row's last column — "the members' fields and scars join the picture at
M-W8"; V15 §8's SA1 dependencies likewise.

**G-15 — minor — the spine §14 (1) and (2) (l. 406–410) against the applied V13 — two seam statements the pass
superseded without a line in the spine.** (1)'s test "would this fact be identical at every week?" is J393 (1)'s "a
present physical fact, never a record" everywhere in V13 and V15 (file r's head records the departure as its choice
(q)); (2)'s "and nothing else" is R-V15-4's six readings plus the base's reader for the header and the digests (V13
§10.3). The spine is a design document, vetoable, but it is also what the program says every seat built from, and
INDEX §7 names it. *Fix (the spine, one revision line under its title):* "Revised 2026-10-23 by the manager: §14 (1)'s
test is J393 (1)'s; §14 (2)'s readings are V13 §10.3 R-V15-4's; §14 (3) rests on `Placement`'s world subject (file r
item 1030)".

**G-16 — minor — V09 §4.3 (l. 1761–1768) and §4.14 (l. 2652) cite V09 §4.22's paragraphs by letters (d)–(i); §4.22
numbers them (1)–(10).** "(V09 §4.22 (e))" the include toggle, "(f)" the conflict list, "(g)" Best placement, "(h)" the
toolbar, "(i)" the gallery, "(d)" the rerolls — the paragraphs are (5), (6), (7), (8), (9) and (4). *Fix (V09):* the six
citations renumbered.

**G-17 — minor — vocabulary (the spine §12): V15 §3.3 (4) "per-seam overrides written by `setAttr`" (l. 977) and §2.7
"a preset override" (l. 678) use *override* for a seam-treatment setting and a view-key preference; the one meaning is
the always-so edit (rank 2), which V15 otherwise keeps (its `WorldEdgeCharter` citation and J-V15.13).** *Fix:*
"per-seam treatment settings"; "a preset choice". (The other §12 words hold in both files: *plate*, *crust block*,
*biome* against *land cover*, *scenario* (V15's four uses are the formation row), *continuation*, *fit*, *viewpoint*,
*seam* under SW-08's ruling; *world* against *atlas*, "World map" only as the product label.)

**G-18 — major — V13 §2.2 `ViewFacts.water.routes` (l. 1131: "mode `water`") and §10.3 R-V15-4 against V15 §3.6 (1)
(c), (3), (4) and `Viewpoint.route` — the relational style reads land routes, and no granted reading returns one.**
V15's itinerary preset lays "the route chain's stations (V13's `WorldRoute.stations`, land effort-metres)" on a spine;
its true readout gives "the travel time along [a route chain] under that member's law — V13's `derivedTime` over the
route's stations"; its culture known-region reaches "the cells within `travelWeeks` on foot of its seats, along
routes"; `Viewpoint.route` is "a chain of one member's `WorldRoute`s". V13's `derivedTime(effort, mode, week, law)`
(§1b.2) takes an effort, so V15 needs each land route's `stations` and polyline; the only routes `ViewFacts` carries are
`water.routes` (mode `water`), `worldFactsAt` returns a route id at a point, and R-V15-4 forbids "a raster, a record or
a plate". The same class of gap C15-02 closed for seats and sways; the reviser's widening left routes out. M-ATLAS-C's
itinerary preset, its travel-time readout and its culture viewpoint cannot be built from the seam as written. *Fix
(V13, r item 1007 (b)):* `ViewFacts.routes: WorldRoute[] /* every route of both modes in the network in force at
`week`, with its polyline, `stations` and `sailing` */` and `water.routes` dropped (or kept as the water subset by
reference); `WORLD-20`'s `viewFacts` bound restated with the routes ("+ 10 ms with the routes' polylines at the realm
rung"); T-V13-68 (j) gains "and every route in force with its stations". *(V15):* §1b.5 gains the row "a route's
course and stations | `ViewFacts.routes[]` | V13 §2.2, §3.8 | A6 (1) (c), (3), (4)".

**G-19 — minor — V13 T-V13-67 (l. 4797) against the science note §8.5 — the sailing bar's lower bound sits above one
of its two anchors.** The bar: "the `sail` leg's effort with the prevailing wind and current is 3–7 × smaller than
against them (the historical ratio)". Casson's table gives Rome → Alexandria 10–13 days against 53–73 (4.1–7.3 ×) but
Massilia → Alexandria 20–30 against 58–78 (1.9–3.9 ×): the record's ratio is 2–7 ×, "typically 4–6". On the sailing
fixture (two ports across one basin with a seasonal reversal) the expected ratio is the fixture's own. *Fix:* "2–7 ×
(the historical record's span; Casson's Rome–Alexandria pair 4–7 ×)", or the fixture named as the Rome–Alexandria-like
pair and the bar kept at 3–7 ×.

## 2 The owner's words F1–F16 against the applied texts (in the owner's sense)

| rule | the owner's sense | where the applied texts carry it | verdict |
|---|---|---|---|
| F1 | tectonics only at formation, then deleted | V13 §3.2.1 (the `formation` op first in the recipe, run once at W1's first run, its state deleted at the bake, step 10), §2.2 `RecipeOp.formation.baked`, §2.7 (the payload baked, the share code re-fetches), J-V13.107/.111 reversing J-V13.41/.42, T-V13-57 (no block state in any digest, a code change moves no world); the proposal and the brief | carried |
| F2 | biomes simulated with dynamism, the simulation deleted | the three lifetimes (V13 §1.1's table W-FORM / W3–W5 / W-COVER): W3 monthly with belts, monsoon, currents (§3.4), W5's classification into potential vegetation (§3.6 (1)), the cover fold from dated facts (§3.6 (5)); the whole march re-run on every relief edit (§3.14.2, J393 (3)); T-V13-59–62 | carried |
| F3a | let physics pass again, whole world or selected areas | `physicsPass { scope: world \| region \| layer; depth: rederive \| release \| weather }` on the fork (§4.1, §4.3, §4.5), T10's toolbar (§4.2; V09 §4.22 (8)), J-V13.124, T-V13-66, F-PHYSICS | carried |
| F3b | the DM always wins: a painted biome "always so" built around; a painted fire "this happened" recovered from | `Override` (rank 2, a boundary condition of every dirty set) and `Disturbance` (dated, the recovery row) — `paintLayer` under `alwaysSo` only, `disturb` under `happened` only (§3.14.1, §2.2), J-V13.129, T-V13-63 | carried |
| F3c | ruins by settlement age, generation only | the base II.7.6 "At generation from age" (whether, how large, how deep by V04's law × material; composed with the scar burial and the ruin system; never grown later), §4.2 S2, the `HistoryHint` readers, T113-8, J-V13.126 | carried (the host's default ages leave it chiefly to metropolises, said in II.7.6) |
| F4 | ocean currents for sail routes and speed | W3's gyre solve per basin (§3.4 (6b)), every sea leg by direction, month and vessel (§3.8 (12), `SailingLeg`), the host offered the efforts and their mean behind its switch, the canon's water metres unchanged (J393 (2), H33), T-V13-67 | carried (G-19 on the bar) |
| F5 | generated first, then editable; random all / basic / advanced for all user types | V09 §4.22 (1)–(3), (8) (a generated world opens; Random all · Basic · Advanced · Deep constraints — J393 (4); nothing hidden, the gate at Generate); V13 §3.1 (1) (three states, the choices apart from the rolled facts), `PresetRule`, J-V13.123, T-V13-69; Q5 for who may use what | carried (G-11 on what `random` means for `scenario`) |
| F6 | organic biome inclusions | a `biome` requirement with an amount, met by causes through the back-step, never paint (§3.1 (5), §3.0's duties); the `landform` kind for the chips (J-V13.135); T-V13-64 (b), (i) | carried |
| F7 | based off of my settlements; best placement; organic self-correction never a dot | `CampaignFacts` through the port (H31), the planned sites (§3.1 (5)), `placeFrame`'s best form with the whole-map search, the three offers and the correction at `minExtentCells` with graded edges, painting last and labelled (§3.11.1), J-V13.120, T-V13-64 (a), (c), (d); the host's one-button placer re-pointed (H31) | carried |
| F8 | a warning or pop-up; the dossier changed only after approval from the warning | the conflict list (§3.11.5 (1)) with `updateDossier` the one choice that changes the settlement, on the user's approval, through `requestDossierUpdate` / `dossierUpdated` (§3.11.6, §4.1; the base §7.7, §11.4 (5); BCR-V13-45; H32); presets never pre-decide it (J-V13.122); T-V13-65 | carried |
| F9 | the surface and the solver as one process, the same situation or in sequence | the pipeline as the solver (§3.0), the preview the coarse run, "Random all" with settlements the same run, the resumed process at placement (§3.1 (7), §3.11), J-V13.117–119, T-V13-64 (a) | carried |
| F10 | the relational style with true scale and embellishments | V15 §3.6 (the flow cartogram with centre magnification, the slider, the true readout, the distortion from facts, the embellishments by trait with the blocklist), §2.5 presets, J-V15.14–19, T-V15-5, -6 | carried (G-18 for its route facts) |
| F11 | a fourth image-only layer of finished maps, reverse drill-down, seams between sizes | V15 §2.2 (`AtlasRecipe`, `Member` by reference), §3.2–§3.3 (one pixel resolution, the finer wins, softened on the stretch, eased or inset), §3.7 (drill-down); the picture J394's default picture (`renderAt`, V13 §5.4); T-V15-1, -4, -12, -13 | carried (G-01 for the native level) |
| F12 | user-chosen arrangement | V15 §3.1 (direct placement, described relations as V13 `solve` requirements, presets, warnings never refusals), J-V15.10–12, T-V15-10 | carried |
| F13 | continuation into voids with basic configurations | V15 §3.4 (the edge charters locked, the pre-fill as `set` options, contradictions with a proposed feature, neighbours unchanged), V13 §3.1 (6); "ongoing effects" withdrawn by F14 (V15 §1.4, the spine §10.2); T-V15-11, -23, T-V13-68 (b) | carried as narrowed |
| F14 | no carry-over after generation; microcosms on their own times | the present-ground charter never re-read (V13 §3.1 (6), §3.18 (18)); V15 §4.7 (nothing crosses; each member at its own present; drift read, never corrected; re-matching only on request); T-V15-1, -2, -3, -22, T-V13-68 (a), (c), (i); R-V15-1's lint | carried |
| F15 | world maps as individual saves, many per user | V15 §2.2, §2.11 (an atlas document; one world in many atlases; H35 in host mode), §4.5, §5.5; T-V15-7, -8 | carried |
| F16 | integrate cohesively with the best combination of models and effort | the spine and the J392 model ruling; r item 1029 and V13 §1.3 quote it; the provenance lines on the Opus-written files | carried |

## 3 The six seams of the spine §14, by name in the applied V13; the vocabulary of §12

| seam | V13's definition (applied) | V15's consumer | gap |
|---|---|---|---|
| (1) the world edge charter | `WorldEdgeCharter` (§2.2, l. 1115–1120; the present-ground test J393 (1)); `edgeCharter(world, side, span)` (§1b.2); W0 step 6 (§3.1 (6)); re-matching on request (§3.1 (6)); T-V13-68 (a)–(c), (i) | A4, A1's edge summaries, the drift reading, T-V15-2 | none for a world's own edge; G-02 for the derived child's interior lines (seam 3) |
| (2) the rendered member | `renderAt(world, week, audience, opts?)` → `RenderedWorld` with the `atlas` layer set and the label boxes (§1b.2, §2.2 l. 1121–1122, §5.4); J-V13.134; T-V13-68 (d), (g) | A2, §3.5 (a)'s `opts.layers`, the common-week display | G-14 (the cover overlay lands at M-W8) |
| (3) the fit across rungs | `placeFrame { frame: { kind: 'world'; doc } }` (§4.1), `Placement.subject` `world` (§2.2, r item 1030), `requestCharter`'s world subject → `WorldCharter` (§3.11.4, §2.2), the transient world-rung `charterFor` with `TransientPlacement.subject` (§3.11.4), `refuse.place.worldRung/worldBearing` (§7.5); J-V13.131; T-V13-68 (e), (h) | A5's three paths | G-02 (`edgeCharter` cannot read the extent's sides); G-13 (the six terms' world readings) |
| (4) the relational style's facts | `viewFacts(world, week, audience)` → `ViewFacts` with seats' points, sways' poles, areas and borders, the culture table, the events, the water routes, the bathymetry on request (§2.2 l. 1127–1131, §5.8 (10)); J-V13.133; T-V13-68 (j) | A6 | G-18 (land routes and their stations) |
| (5) the arrangement solver | `solve(requirements, { members: ArrangeMember[] }, 'arrange', opts?)`, `ArrangeMember`, `ArrangeEvaluator`, `solve.registerEvaluator`, the rank-2 `lockRegion` lock, no `scope` (§2.2 l. 1093–1097); R-V15-2; J-V13.132; T-V13-68 (f) | A1 | none |
| (6) no reverse seam | R-V15-1 (§10.3: V13's `edit` entry points refuse a caller whose package is `@plat/atlas`); V15 T-V15-19 | V15 §1.1's package rule | none |

Every reading name V15 §1b.6 and §10.2 take exists in the applied V13 by that name (`renderAt`, `edgeCharter`,
`viewFacts`, `charterFor`, `worldFactsAt`, `derivedTime`, the base's reader of §11.2; `WorldRequest.edgeCharters`
and `.parentCharter`; `EditScope { kind: 'world'; stage: 'W1'; box }`; `W_WORLD_RECIPE_CLAMPED`; `WorldSizeRung`; the
`Requirement` kinds `relation`, `latBox`, `climateRow`, `lockRegion`, `landform` and sources `relation`, `lock`,
`context`, `edgeCharter`; every `LensFacts`, `PolitySeat`, `PolityRelation`, `Sway`, `Allegiance` and `WorldEvent` field
of §1b.5). **Vocabulary (the spine §12):** *world* / *atlas* ("World map" the product label only), *plate* (the
cache's snapshot; "crust block" in V13, "tectonic plates" only in the owner's quoted words), *biome* / *land cover* (T-V13-72
lints both), *override* / *disturbance* (G-17 for two loose uses in V15), *formation* / *living physics* / *ecology*,
*requirement* / *conflict* / *decision*, *continuation*, *seam* (SW-08's ruling, both files), *fit*, *viewpoint*,
*scenario* (V15's four uses the formation row; the host's campaign scenario never) — one meaning each in both volumes.
**What the brief asked beside the seams:** no event the map invents (every `Disturbance` is a DM's stamp or an
attributed host event; `Landform.active` a DM's mark; the cover fold and the sailing legs pure functions; the
embellishments derived from facts and linted against names); no dossier write without approval (`requestDossierUpdate`
after `decide`, never `by: 'preset'`; "Random all" resolves to `fitWorld` / `keepMismatch`); nothing crossing an atlas
seam after generation (the charters never re-read, R-V15-1's lint, V15 §4.7); no kernel change (BCR-V13-43's and
BCR-V15-12's rows appended after M0 under K6; `@plat/atlas` takes `dmath`, `rng`, `index` alone); the bundle up to
date; the record's md5s on disk.

## 4 Research spot-check (ten load-bearing claims of the two Opus notes)

| # | claim (note §) | leaned on by | checked against | result |
|---|---|---|---|---|
| 1 | Peel, Finlayson & McMahon 2007 Table 1: the thresholds, P_threshold = 2 × MAT (+28 summer-wet, +14 even), the 0 °C C/D variant, the Cs/Cw tie by the wetter half-year (science §5.1) | V13 §2.3 `KoppenRule`, §3.6 (1), T-V13-61 | the published table (the science-host review fetched the PDF; the rows re-read here against it) | **holds**; V13's cells restate every threshold in deci-°C with MAT in °C at the arid test |
| 2 | Braun & Willett 2013: the implicit stack update z_i = (z_i + Δt U + F_i z_r) ÷ (1 + F_i), F_i = K Δt A_i^m ÷ Δx, unconditionally stable for n = 1; the explicit limit Δt ≤ Δx ÷ (K A^m) (science §2.1) | V13 §3.2.1 (11) (the `weather` op's ≤ 10 implicit steps), §3.2.1 (6), S-4 | the paper's scheme (Geomorphology 180–181, 170–179; FastScape); the limit re-derived: 2 000 m ÷ (5 × 10⁻⁵ × (10¹⁰)^0.45) ≈ 1 270 yr | **holds** |
| 3 | the steady-state Flint integral's fixed point converges in 5–15 iterations (science §2.1, marked PLAUSIBLE, the author's estimate) | `erosion.iterations` 10, T-V13-58's fixed count, F-FORM's fixed-point rung, SP-W9 | no source states it; the note marks it so | **holds as PLAUSIBLE** and is correctly gated (a fixed count, the last iteration taken and reported; SP-W9 measures) |
| 4 | the Munk width (A ÷ β)^⅓ ≈ 50 km with A = 3 000 m²/s, β = 2.3 × 10⁻¹¹ m⁻¹s⁻¹ at the equator, resolved by the 2 / 4 / 8 km coarse grid (science §4.4) | V13 §2.3 `currents.viscosityM2s`, `betaEqPerM`, §3.4 (6b) | β = 2Ω ÷ R = 2 × 7.292 × 10⁻⁵ ÷ 6.371 × 10⁶ = 2.29 × 10⁻¹¹; (3 000 ÷ 2.29 × 10⁻¹¹)^⅓ = 50.8 km; six 8 km cells | **holds** |
| 5 | the lapse rate 6.5 °C/km (ICAO) and the treeline at a growing-season mean of 6.4 °C, attributed to Körner & Paulsen 2004 (science §4.1, §5.2) | `lapseDeciCPerKm` 65, `treelineGrowingSeasonDeciC` 64, S-9's fine-cell lapse | ISA 6.5 K/km; Körner & Paulsen 2004 (J. Biogeogr. 31) report 6.7 ± 0.8 °C, the 6.4 °C global mean being Körner's later figure (Alpine Treelines, 2012; Paulsen & Körner 2014) | **holds** (a citation one paper off; the cell inside the published range) |
| 6 | a rain shadow persists 200–700 km (Great Basin, Patagonia) and the whole monthly march on the coarse grid costs ≈ 0.2–0.4 s (science §4.6, §11) | J-V13.114, J393 (3), `WORLD-19`, T-V13-60 | the anchors standard; the cost re-multiplied from §11's 2 900 ns per coarse cell: 46 / 185 / 418 ms at the three rungs (V13's law 12 × 30 × 8 ns agrees) | **holds** |
| 7 | Casson 1951: with against the prevailing system 3–7 × in time, typically 4–6 (science §8.5) | T-V13-67's 3–7 × bar, `fairKn` 5, the polars | Casson's Table 1: Rome → Alexandria 10–13 d against 53–73 (4.1–7.3 ×); Massilia 20–30 against 58–78 (1.9–3.9 ×); Rhodes 3½ against 7½–10 (2.1–2.9 ×) | **holds in substance; the record's span is 2–7 ×** (G-19) |
| 8 | occupation debris: stone-and-brick 0.2–0.5 m per century, mud brick 0.5–2 (science §7.1) | II.7.6's `ageMaterial` (30 / 24 / 90 cm per century on V04's 60), T113-8 | Rome 6–10 m over ≈ 2 000 yr (0.3–0.5); London ≤ 7 m over ≈ 1 950 yr (≤ 0.36); Çatalhöyük East ≈ 21 m over ≈ 1 150 yr (1.8) | **holds**; the base's rates sit inside the anchors |
| 9 | 0.75 ha arable per person under three fields; a town of 10 000 at 30–50 % arable fills a disc of 7–9 km (science §6.1) | `use.landPerPersonHaByTier` TOWN 0.75, `cropShare` + `fallowShare`, T-V13-62 (b)'s 7–10 km | re-done: 225 kg ÷ (600 kg/ha × 0.75) = 0.5 ha ÷ ⅔ = 0.75 ha; 75 km² ÷ 0.3–0.5 = 150–250 km² → r = 6.9–8.9 km | **holds** |
| 10 | the host's facts (state note Part D): `AGE_BY_TIER`; the storm multipliers 1.3 / 1.0 / 1.5 / 2.5 that never sever; the symmetric lanes; the mode speeds foot 150 … sea 900 km/week; the anonymous lock enforced at the one generate action; the 4-4-5 calendar with no hemisphere or latitude; the autoplacement's three classes and its "this realm has none" row; no climate, latitude or biome field on a settlement; the relation words; the world-fact card; `canon_locked` and the decree registry | H31–H34, `SettlementFacts` (S-13), `closedRisk`'s exclusion (S-12), `Conflict.preview.hostEffect` (S-14), Q5 (S-31), II.7.6's default-age note (S-22) | read in the host at `81f1cd96` (2026-10-17): `historyData.js:1111–1118`, `seaLanes.js:112–119` and `:416` ("codepoint-sorted edges (keyed a<b)"), `modeSpeeds.js:50–63`, `LayeredConfigurationPanel.jsx:23–33`, `settlementGenerateAction.js:228–289`, `worldState.js:40–57`, `autoplacement.js:14–31`, `:536–553`, no `latitude` under `src/generators` or `src/domain`, `region/graph.js:673–708`, `fieldDeclarations.js:159–165`, `editSlice.js:342`, `:512–515` | **holds** (one line reference off: the lane symmetry is `seaLanes.js:416`, not `:237`, which is the port-eligibility comment) |

Two further checks made on the way: the science note's §11 roll-up re-summed (formation 0.26 / 1.04 / 2.34 s; live
0.15 / 0.61 / 1.37 s — V13's `formationMs` 400 / 1 300 / 2 800 and §6's W3 and W5 rows sit above them), and the
cartography and tiling claims V15 rests on (Gastner, Seguy & More 2018 PNAS 115, a flow-based cartogram, topology-
preserving, seconds at 512–1 024; Burt & Adelson 1983's multiresolution spline) hold against the literature.
**Spot-check result: 10 of 10 hold** (two with a nit — a citation one paper off in claim 5, a bar's lower bound above
one anchor in claim 7 — neither moving a cell). The J392 validation these notes require is therefore given: both carry
their provenance line, and every claim the design leans on that was checked stands.

## 5 Counts and verdict

**Gaps:** 19 — **0 blockers**, **5 major** (G-01 the native-level cells of V15's stop table; G-02 `edgeCharter` cannot
read the extent's interior sides a `WorldCharter` needs; G-03 `WORLD-1` and §2.3's `budgetMs` against the re-costed
one-click table; G-04 `WORLD-5`'s 285 MB bar below the text's 295 MB; G-18 land routes absent from `ViewFacts`), **14
minor** (G-05 – G-17, G-19). None is a contradiction that would build an owner rule wrongly, a host law broken, a dossier
written, an event invented, a seam crossed after generation or a kernel file touched; the five majors are a rounding
in a table, a function signature, two register rows that did not follow the arithmetic the same section re-stated, and
one reading left out of a record the reviser had just widened — each a one-item fix in file r or a one-line fix in V15,
none moving a mechanism.

**Verdict.** The integration is coherent as a whole. The spine's shape holds in the applied texts: one world document
with three lifetimes, one solver that is the pipeline, one precedence ladder with one approval rule, one atlas that
holds nothing but references and pictures, and six seams every one of which the applied V13 defines by the name V15
uses. Every owner word F1–F16 is carried in the owner's sense — tectonics formed once and deleted (T-V13-57), biomes
simulated monthly and dynamic through dated facts, the physics pass over the whole world or a region, the DM always
winning through the two verbs on every layer, ruins by age at generation only, currents pricing every sea leg each way
while the host's lane stays symmetric until it adopts direction, a world generated first with Random all · Basic ·
Advanced for every account kind and nothing hidden, inclusions and settlements met by causes with no arid dot, the
dossier changed only on the user's approval and only by the host's own command, the surface and the solver one
process, the relational style true at every hover, the atlas stitched from finished maps and drilled in reverse,
arranged by the user, continued into voids by present ground only, each member a microcosm on its own clock, many
atlases per user. The three reviews and the seam check closed what they found and the reviser's fixes are on disk as
the record says (every md5 matches; the bundle is up to date); what remains is the short list above, chiefly the
table-and-register bookkeeping that a long pass leaves behind, two seam definitions one rung from complete, and the
stale "pending application" lines that still describe a file already applied.
