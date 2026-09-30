# amend-pipeline-evolution-islands — lane amendments-b/amend-pipeline-evolution-islands (PIPELINE part; seat pipeline-evolution-islands)

STATUS: COMPLETE (2026-09-26). Seat: Claude Fable 5.1, architect-editor of the pipeline part (§4, §10, PART II incl. II.6,
PART III) for the rule families evolution and islands. Items: HOME 8, 10, 11, 13, 15; REFERENCING none. Output:
`docs/validation/amendments-b/blocks-pipeline-evolution-islands.md` (8 blocks: six APPEND TO SECTION, J-ROWS, RATIONALE-A)
and this report. Read for this lane, whole: items 8–15 of docs/AMENDMENTS-2026-09-25b.md (the owner's words first) and
items 17, 25, 31 for the shared §4.11; docs/OWNER-INSTRUCTIONS-2026-09-25.md; route.md (preamble, summary table, items
8–15, rule families, cross-cutting duties, stale text); in docs/ARCHITECTURE.md the one-page summary, §1.1, §1.5, §2.7,
§2.8, §4 intro, §4.1, §4.5, §4.7, §4.9, §4.10, §4.11, §4.12, §7.8, §8.4, §10, II.5, II.6, PART III, the Delegated
decisions D-3 / D-25 / D-33, the Judgment-calls index head and tail and *Staged by the owner's roadmap*, plus every line
citing islands, sewers, tunnels or the decline states (grep, 104 + 53 lines); the canon's home rules; Part A's entry
format; workflows/09-amendments-b.js (the assembler's application order); docs/validation/bench/doc_checks.py (the rules).

## 0. Block kinds, the co-homed subsections, and one hazard the verifier must check

* **Every block is ADDITIVE.** §4.11 is co-homed with pipeline-assignments (item 17) and
  pipeline-prosperity-change-dossier-plan (items 25, 31); II.6 with pipeline-sewers (items 12, 14); §4.5 (item 27),
  §4.7 (items 16, 18, 19), §4.9 (item 26) and §10.2 (item 16's supply edges) are other seats' home sections; PART III is
  shared with pipeline-sewers (item 14). By the seat rule no REPLACE is written here.
* **Hazard (file order).** The assembler applies block files in name order and blocks in file order, and reports only
  double REPLACEs. `blocks-pipeline-evolution-islands.md` is applied after `blocks-pipeline-assignments.md` and
  `blocks-pipeline-emulation-hidden.md` and BEFORE `blocks-pipeline-prosperity-change-dossier-plan.md` and
  `blocks-pipeline-sewers.md`. If either of those two later files REPLACEs `### 4.11 …` or `## II.6 …`, my appended text
  in that subsection is overwritten without a report. The verifier of the pipeline part must therefore confirm that the
  §4.11 append (block 1) and the II.6 append (block 2) are present after assembly; if not, the repair round re-applies
  them from the blocks file (their text stands complete there). Cross-part notes §7 tell both seats to carry the text.
* **Stale text.** Additive blocks cannot delete. §8 lists every stale sentence my items retire, who owns the paragraph,
  and the exact replacement sentence, so the owning seat (or the repair round) removes it.

## 1. Item 8 — Decline and regrowth are part of evolution (HOME §4.11; STAGED-HOOK, with the regrowth-first rule built now)

**Landed.** §4.11 (block 1: one bullet group "Decline and regrowth" plus the `DeclineOp` kinds appended to
`ConversionOp`); §4.7 (block 4: vacant plots merge; the design's vacancy runs kept apart); §10.2 (block 5: a fall vacates,
never removes; the class table's `salvageM3` column). The states, style classes, identity rules, edit rows and tests are
cross-part notes (§7).

**Mechanism, in plain words.** Regression is growth run backwards on the same plan. When the population target falls, the
roster's suffix leaves its buildings (they become vacant; nothing is deleted), and what stands then fades down a ladder —
vacant, derelict (roofless), ruin, robbed or cleared to a footprint trace, reused as a garden, field or a new house on the
old foundations — one step per conversion, each a recorded, undoable event a user can also apply by hand today. Which
buildings fade first is not a fixed order but a lottery: every candidate has an exposure (a field built like the
prosperity field from drivers — outside the walls, low damp ground, downwind of the tannery, the edge of the walled town,
poverty — with a resilient core around market, churches and castle, and a quarter of it chance), a persistence rate for its
layer (uses go before buildings, buildings before plot lines, streets and walls last, the underground slower still,
terrain and water slowest), and a seed-keyed draw; the Survivors churn cap bounds each epoch. Each step waits its dwell
(a per-building span of years), so decline lags; regrowth has no lag and refills the old plan first — reoccupy, repair,
rebuild on the traces, the old plan's empty plots and street lines — and only the residual grows a new stage, a rule that
binds the base's built grow path now. Salvage is a ledger: robbing and clearing credit it, building and repair debit it
within a haul radius, and clearance is weighted toward nearby building demand, so cleared zones sit beside active building
and a ruin nobody needs stone from is left standing. Walls neglect, breach and are superseded by a shorter inner ring whose
predecessor's line persists (or becomes a ring road); a struck farmstead's fields stay worked. Everything keeps its address
and comes from the same seed under the same circumstance timeline.

**Rulings.** J-A8.41 (weighted lottery over a fixed order), J-A8.42 (a cleared trace is a live record), J-A8.43 (locked and
pinned exempt; assigned only through item 17's relocation), J-A8.44 (regrowth-first binds the built path; the "only on
new or transformed plots" rule retired), J-A8.45 (salvage as a flow ledger, never a hard budget), J-A8.46 (two new
`Existence` values, `cleared` and `reused`; a superseded wall is a link), J-A8.47 (per-entity dwell bands; no lag up).
Decisions touched and kept: D-25 (one built path; the vocabulary now names the ladders' kinds — a scope note), J-DET-33
(the lifecycle event block is unchanged; every new kind writes its entries by `seq`). Not written: the owner's war
example.

## 2. Item 10 — Floating islands are a product of prosperity (HOME II.6; STAGED-HOOK)

**Landed.** II.6 (block 2, "The island rule", clauses 3, 5, 6 and the new `IslandRule`); §4.9 (block 3: one line — the
island rows are a member of the coverage / granularity / greenery band-row family); §4.11 (block 1, "Islands and the
underground over epochs", and the island kinds in `DeclineOp`). S7b (5)'s reading of the law is a note to the §4.5 seat
(§7); `SkyIsland`'s new fields a note to model.

**Mechanism, in plain words.** Magic is a supplied resource, so an island's size follows two numbers read from the one
prosperity field: how prosperous the whole city is (`S_town`, the mean prosperity of its built land) and how prosperous
the neighbourhood it carries is (`S_carried`, the band value of the households allocated to it). A supply function turns
each into 0–1 — zero below the prosperous band's lower cut, one at the top of the rich band, interpolated between band
rows like every other rule of the family — and the supported area is a per-rung maximum times both: no prosperity, no
island; a rich quarter in a poor city, a small low island; a rich quarter in a rich city, a large high one (altitude
follows the city's number alone). S7b fills the island's allocation from the richest band down and re-computes the
supported area as it goes, so the fill converges and the `areaHaBand` draw is gone. Over epochs the supply is re-read: an
island shrinks when it falls, wanes and settles when the supply runs out, falls after its dwell (its arena archived and a
ruin field laid on the ground where it fell, through the same clear-region path a canal uses), and regrowth re-floats a
settled island before raising a new one — the program's proposal, adopted and marked vetoable.

**Rulings.** J-A10.41 (institution islands gated by the town's supply too), J-A10.42 (the decline response adopted as
conversion kinds), J-A10.43 (the two inputs and the product form). Decisions touched: D-3 (islands remain a named toggle,
off by default — now a MODEL setting; a scope note updates the paragraph), AM-2 and II.6's "1–3 islands" (retired, §8),
§4.5 S7b (5)'s `areaHaBand` draw (retired, §8), AM-6 (the field is read, never duplicated).

## 3. Item 11 — The underground fades like the walls (HOME II.6; STAGED-HOOK)

**Landed.** II.6 (block 2, "The underground fades like the walls"); §4.11 (block 1: the tunnel rung of the ladders, the
`underground` persistence row, and `silt` / `caveIn` / `seal` / `reopen` in `DeclineOp`).

**Mechanism, in plain words.** A tunnel has the same kind of ladder as a wall: in use, then neglected and silted, then
partly caved in, then collapsed or sealed — three conversions on a tunnel or a stretch of it, moved by the same lottery as
the surface at the underground's own, slower rate (after streets and walls, before terrain and water), with the exposure
of the ground above it and dwell spans two steps slower than a building's. The engine never demolishes a tunnel — its plan
may not contain a tunnel `demolish`, and a hook test checks that — while a user may still delete one, because everything
is editable. A closed tunnel stays on the map as an underground ruin at its address, drawn as silted, caved-in or sealed
through the cut-away, and later growth reopens it before digging a new one; the underground neighbourhoods of item 12
front a reopened tunnel like any navigable one.

**Rulings.** J-A11.41 (the engine never demolishes a tunnel; the user's delete stays), J-A11.42 (the underground's place in
the persistence order). Decisions touched: D-25 (vocabulary widened — scope note), DEF-7 and D-3 (unchanged: the network
stays staged and the `navigable` preset the fantasy toggle; the sewers seat rules on tier existence).

## 4. Item 13 — Floating islands only in cities and metropolises (HOME II.6; STAGED-HOOK)

**Landed.** II.6 (block 2, clause 2 "The gate — rung"); PART III (block 6: the village rows carry no island layer); §4.11
(block 1: a settlement that leaves the CITY band runs the decline ladder). The `RungProfile.layers` row itself is scope's
(§1.1) and the control's disabling is determinism's (§7.8) — notes in §7.

**Mechanism, in plain words.** A per-rung data row says whether islands are possible at all: no at TOWN and at every
village rung, yes at CITY and METROPOLIS. The island rule reads that row for the rung the request's population chooses,
and again at every epoch for the rung the epoch's target chooses, so a city that shrinks below the city band cannot sustain
its islands — they wane, settle and fall over their dwell spans, never in one step — and a town that grows into the band
may gain islands once its prosperity admits them. Within the band item 10's supply law still decides whether any exist.

**Rulings.** J-A13.41 (a `RungProfile.layers` row read at generation and per epoch; a band crossing runs the ladder).
Decisions touched: D-33 (the ladder stays the one home of per-rung data — the row is added there), AM-2, D-3.

## 5. Item 15 — Not every city has islands (HOME II.6; STAGED-HOOK)

**Landed.** II.6 (block 2, clauses 1 "Two settings" and 4 "The count"; the `chance` column of `IslandRule`). The view
toggle's home (§8.4 `LayerSpec.visible`) and the control registry rows (§7.8) are notes; the count's draw on `island.place`
is a note to §6.1.

**Mechanism, in plain words.** Two switches are separated. A model setting (`recipe.layers.islands`, off by default, the
realism rule D-3) says whether the world has magic islands at all; the sky layer's visibility is the toggle the owner
means — it shows the islands a settlement has and never creates any, and hiding them changes nothing in the model (the
rich households stay on their hidden island). With the model setting on, how many islands a city has, 0–3, is drawn once
from the seed through three ordered slots: each opens with a table chance scaled by the city's supply and only after the
slot before it, so a poor city has none, and a rich one may have none, one, two or three. An epoch re-draws the slots with
its epoch component; a slot that opens may raise an island where the supply admits one, a slot that closes is read by the
decline ladder.

**Rulings.** J-A15.41 (model setting versus view toggle; hidden islands keep their households — the route's key ruling for
the II.6 editor), J-A15.42 (ordered slots by chance × supply). Decisions touched: D-3 (kept and sharpened), AM-2, II.6's
"The toggle creates 1–3 islands" and `maxIslands` (retired, §8), §4.5 S7b (5)'s "when the island toggle is on" (retired, §8).

## 6. Items already satisfied or not applicable to this seat

None of my five items was already satisfied. Item 9 (size by population) is not mine and is SATISFIED per the route.
Item 25 (terrain and water change) is the prosperity seat's; block 1 only places `terrainWater` in the persistence order
as the slowest layer, its conversion kinds being theirs. Item 17's relocation rule is the assignments seat's; block 1
cites it in the exemptions row. Item 12's underground plots are the sewers seat's; II.6's lifecycle paragraph says only
that they front a reopened tunnel as a navigable one.

## 7. CROSS-PART NOTES (the other part's editor adds these; the verifiers check both sides)

**model (§2)**
* §2.8 `Existence` gains `'cleared'` (a footprint trace: the footprint face persists, heights zeroed in the record, drawn
  by §8.2's trace class) and `'reused'` (a trace or shell reused) — J-A8.46; the "decline hooks" bullet names the ladders
  by kind, mapping plain names to values: buildings occupied → vacant = `abandoned` → derelict = `decayed` (roofless) →
  ruin = `ruined` → `cleared` → `reused`; walls in use → neglected = `abandoned` → breached or partly dismantled =
  `decayed`; tunnels in use → silted = `abandoned` → caved-in = `decayed` → closed = `ruined` (+ `Tunnel.closure`). The
  transitions are a data table (which `DeclineOp` moves which state; the inverse is the undo record's). A cleared or
  reused building stays a live record until `demolish` or succession (J-A8.42). The entity registry gains
  `MaterialLedger` and the edit kinds of the new ops; its completeness test (§13.2) covers them.
* §2.6 `Building.predecessor?: Id` — the trace or ruin a successor was raised on (`reuse … build`); derelict uses the
  existing `RoofSpec.kind 'none'`.
* §2.7 `Enceinte.supersededBy?: Id` (the shorter inner ring; the old ring's record stays live, its line a trace);
  `Tunnel.closure?: 'collapsed'|'sealed'` (with item 12's `navigable`); `SkyIsland` gains `supply: { town: number;
  carried: number }` (the two values the law read), `areaHa: number` (derived from the law), `state:
  'floating'|'waning'|'settled'|'fallen'`; a town-level `MaterialLedger { rows: { epoch: number; material: string; m3:
  number; from: Id; to?: Id }[] }` (one per document, changed only by events, so inside the model digest). The "staged
  layers" paragraph: an island exists only where prosperity supplies it (II.6).
* §2.5: no change — the context vector already carries every driver the exposure function reads.

**determinism (§5–§7)**
* §6.1 concern registry lines: `epoch.transform` also draws the strike lottery's `u` and each entity's dwell spans (keyed
  by entity lineage and epoch); `island.place` draws the island count (three ordered slots), the sky allocations'
  supported-area fills and the outlines — no new concern.
* §6.3: declined entities keep address and lineage (ruins, robbed and cleared traces, superseded rings, closed tunnels);
  `reuse … build` is succession at the trace's address (`supersede`); `raiseIsland` mints the island's arena key and
  lineage from the town's lineage, the slot index and the epoch component, so the same history raises the same island;
  regrowth on an old plot re-uses the plot's address.
* §7.1: the `convert` event's op set gains `DeclineOp` (§4.11). Edit-target rows: buildings + `convert` (vacate, reoccupy,
  reuse); walls, gates, towers + `convert` (neglect, breach, dismantle, contractWall); a new row for tunnels (`setAttr`,
  `delete`, `convert`: silt, caveIn, seal, reopen); a new row for sky islands (`setAttr` on area, altitude and state,
  `lock`, `convert`: resizeIsland, settleIsland, fallIsland, refloatIsland, raiseIsland). `recipe.layers.islands` is an
  `adjust` that re-derives from S7b.
* §7.4: the convert lifecycle row lists the new kinds with their undo — the state and the ledger rows restored from the
  undo record; a `fallIsland` undo restores the arena from the archive and removes the ruin face through the carve path's
  inverse; a `reuse … build` undo returns the address to the trace.
* §7.8: the island control — at TOWN and every village rung disabled, reason "islands only at CITY and METROPOLIS (II.6)";
  at CITY and METROPOLIS a model feature control `layers.islands` (off / on; locality: re-derive from S7b) and the sky
  layer's visibility a view control (§8.4), both in the registry with their locality class (J-A15.41).
* §7.7: `layers.islands` in the recipe's feature set; the circumstance slice carries the activity scalars the field's
  market, harbour and main-street kernels read under decline (default 1).
* §5.3 invariant rows: a `cleared` building's footprint face persists (no dangling trace); no `EvolutionStrategy` plan
  contains `demolish` on a tunnel; every island in state `floating` has a supported area > 0.

**rendering (§8, §9, §11, §12)**
* §8.2 style classes keyed by §2.8's states per kind: vacant (today's `abandoned` tone override), derelict (`decayed`:
  the outline with no roof construction, the `none` roof kind), ruined (the `ruin` program), cleared (a trace class: the
  footprint outline as a broken line, no fill, at district LOD and below), reused (the trace drawn inside the garden,
  orchard or field part), walls neglected / breached (a gap glyph on the trace) / superseded (the old ring's line as a
  trace stroke lighter than a wall), tunnels silted / caved-in / sealed (dash and a closure glyph) through the underground
  cut-away, islands waning / settled (lower alpha; the shadow shortened by the lower elevation), a fallen island's ruin
  face (the `ruin` program's rubble stipple).
* §8.4: the sky `LayerSpec.visible` is the island view toggle (II.6 (1)); a settled island at its band's floor elevation
  shortens its shadow by the existing projection.
* §11.1: exports carry the states as properties; a fallen island's arena is archived and not exported.
* §12.6: `resizeIsland` and `fallIsland` cost their footprint like a carve (hook only; measured with the engine).

**scope**
* §1.1 `RungProfile.layers: { islands: 'none'|'possible'; sewers: … (item 14, the sewers seat's) }`, and a column in the
  rung table: TOWN none, CITY possible, METROPOLIS possible (J-A13.41). PART III's rows are `none` (block 6 says so).
* §0.2's landing table (items 8–31): rows for 8 (home §4.11; §4.7, §10.2; model §2.6–§2.8; determinism §6.1, §6.3, §7.1,
  §7.4; rendering §8.2; scope), 10 (home II.6; §4.5 S7b (5), §4.9, §4.11; model §2.7; determinism §7.1, §7.4; scope), 11
  (home II.6; §4.11; model §2.7–§2.8; determinism §7.1, §7.4; rendering §8.2, §8.4; scope), 13 (home II.6; PART III, §4.5
  S7b (5), §4.11; scope §1.1; determinism §7.8), 15 (home II.6; §4.5 S7b (5); determinism §6.1, §7.8; rendering §8.4).
* D-3's paragraph: islands exist only where prosperity supplies them and only at CITY and METROPOLIS; the model setting
  `layers.islands` is the named toggle, off by default; the view toggle only shows them (II.6). D-25's paragraph: the
  vocabulary now names the decline ladders, the tunnel kinds and the island kinds (§4.11).
* *Staged by the owner's roadmap*: the evolution row gains the decline table, the ledger, the dwell lag, the regrowth-first
  siting (built), the `DeclineOp` kinds; the sewers-and-islands row gains the island rule (rung gate, count law, supply
  law), the tunnel lifecycle, `SkyIsland.state`.
* §13.2 hook tests: (T8-1) every `DeclineOp` kind applied by hand on the golden TOWN undoes to byte identity; (T8-2) the
  regrowth-first fixture — a TOWN with 12 % of its buildings vacated, derelict or cleared by hand, grown by +6 %
  population: 0 new S5 faces, ≥ 95 % of the delta placed inside the old plan, every vacancy-run share within ± 0.02;
  (T8-3) 20 epochs of hand-applied decline and regrowth keep every ruin's, trace's and superseded ring's address (100 %),
  no tombstone for a cleared building unless demolished or succeeded; (T8-4) the exposure function's unit test — the
  field is monotone in each driver's weight and its chance share equals the table's; (T8-5) the ledger's credits equal
  the yields of the robbed and cleared, never negative, shortfalls reported; (T10-1) 200 CITY seeds with the model setting
  on: `S_town` below τ → 0 islands; the supported area monotone non-decreasing in `S_town` and in `S_carried` over the
  band rows; (T13-1) TOWN and village requests never carry a sky allocation; a CITY with the setting off carries none and
  its ground digest equals the realism golden; (T15-1) 500 CITY seeds at the target with the setting on: P(count = 0)
  within ± 0.05 of the table's value at the measured `S_town`, every count 0–3 observed, and hiding the sky layer changes
  no model digest; (T11-1) tunnel conversions by hand undo exactly; no engine plan on the hook fixture contains a tunnel
  `demolish` (lint); a sealed tunnel persists and reopens; (T8-6) a CITY dropped below 10 000 inhabitants loses its
  islands over their dwell spans (waning → settled → fallen), never in one epoch.
* §15.2 hooks row; §16: the hooks priced at M4 beside the incremental path (regrowth-first on the built path is build
  work of the O9 / incremental line — the scope seat's number).

**same-part seats (pipeline)**
* pipeline-emulation-hidden (owner of §4.5, item 27): replace S7b (5) with — "5. **Sky pseudo-districts (owner-staged;
  AM-2, AM-10, AM-13, AM-15; II.6).** When the model setting `recipe.layers.islands` is on and the rung admits islands
  (II.6 (1)–(2)), S7b first draws the island count on the `island.place` stream by II.6's count law and, for each open
  slot, creates its sky pseudo-district's `Allocation` — before (1), and before any island exists — filled from the
  richest band down under II.6's supply law: the allocation's plot land is the supported area `A(S_carried, S_town)` ×
  the dense core's plot share (0.62, §4.2 S2), recomputed as households are added, until it is used or three districts'
  worth of households are allocated; a slot whose supported area is 0 gets no allocation. An `institution` island's
  allocation holds its one institution (the `IslandInstitution` row's, or the assignment's) and exists only where the
  town's supply admits it. The ground's districts are then allocated the remainder, so the population stays whole.
  `SkyStrategy`, registered after S7b by declared I/O, takes these allocations, each with its supported area and altitude,
  and sizes and places each island to hold them (II.6)." — and add to the "Over time (LC-12)" bullet: "under decline the
  field contracts toward the survivors' core (§4.11)".
* pipeline-prosperity-change-dossier-plan (co-home of §4.11, items 25 and 31; applied after this file): if you REPLACE
  §4.11, carry block 1 of blocks-pipeline-evolution-islands.md verbatim at the end of the subsection and fold `DeclineOp`
  into the one `ConversionOp` declaration (`… | DeclineOp`); in the evolution-engine paragraph replace "a decline rule
  table — periphery, lowest value, noxious and extramural first, never locked or assigned — chooses which buildings empty"
  with "the decline table's exposure lottery (below) chooses which buildings empty"; in the Survivors bullet replace
  "Siting across epochs places only delta demand, only on new or transformed plots." with "Siting across epochs places
  only delta demand, in the regrowth-first order below." Your churn cap is the cap block 1's lottery cites.
* pipeline-assignments (co-home of §4.11, item 17): block 1's exemptions row cites your relocation rule (AM-17): an
  assigned use is struck only through it, a pinned assignment never.
* pipeline-sewers (co-home of II.6, items 12 and 14; applied after this file): if you REPLACE II.6, carry block 2 of
  blocks-pipeline-evolution-islands.md verbatim after the sewer paragraphs, delete "The toggle creates 1–3 islands." and
  the old `IslandRule` / `SkyStrategy` declaration (block 2's replace them), and give the sewer toggle the same model /
  view split (J-A15.41: existence is model, the underground `LayerSpec.visible` is the view). AM-12's underground plots
  front a reopened tunnel as they front any navigable one (block 2 says so). PART III's "villages have no sewers" line is
  yours; block 6 states only the island layer.

## 8. Stale text my items retire — owner of the paragraph, and the replacement

| where | stale sentence | replacement | owner |
|---|---|---|---|
| II.6, floating islands | "The toggle creates 1–3 islands." | delete; block 2's island rule (1), (2) and (4) state existence, gate and count | pipeline-sewers (co-home) or the repair round |
| II.6, hook interface | `IslandRule { reason; maxIslands: 1\|2\|3; elevationCmBand; areaHaBand; … }` and the old `SkyStrategy` | delete; block 2's `IslandRule` and `SkyStrategy` | pipeline-sewers (co-home) or the repair round |
| §4.5 S7b (5) | "When the island toggle is on, S7b creates …"; "drawn from `IslandRule.areaHaBand`" | the full (5) text in §7's note to pipeline-emulation-hidden | pipeline-emulation-hidden |
| §4.11, the evolution-engine paragraph | "a decline rule table — periphery, lowest value, noxious and extramural first, never locked or assigned — chooses which buildings empty" | "the decline table's exposure lottery (below) chooses which buildings empty" | pipeline-prosperity-change-dossier-plan (co-home) or the repair round |
| §4.11, Survivors | "Siting across epochs places only delta demand, only on new or transformed plots." | "Siting across epochs places only delta demand, in the regrowth-first order below." | pipeline-prosperity-change-dossier-plan (co-home) or the repair round |

## 9. CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed): the six heading lines targeted exist exactly once each in the live docs/ARCHITECTURE.md (grep,
count 1 each); the owner's words are quoted from docs/AMENDMENTS-2026-09-25b.md and docs/OWNER-INSTRUCTIONS-2026-09-25.md;
the application order and the double-REPLACE rule are read from workflows/09-amendments-b.js; the blocks' tables and §
pointers pass a simulated application of the six APPEND blocks to a copy of the document with
docs/validation/bench/doc_checks.py over the six changed sections (the run's counts are recorded at the end of this file).

**PLAUSIBLE** (design judgment, vetoable): every default number — the persistence rates, the 0.25 chance share, the dwell
bands, the 250 m haul radius, the slot chances [0.6, 0.5, 0.35], the 0.05 hysteresis, the prosperous-band threshold — has
provenance "architecture 2026-09-26" and is a table value calibratable by §13.9; the mechanism choices are the J-A rows.

## 10. Document-check receipts (docs/validation/bench/doc_checks.py, sections "4.7,4.9,4.11,10.2,II.6,PART III")

* **Live document, no blocks (CONFIRMED, executed 22:30):** C1 5 hits / 0 unreviewed · C2 0 · C3 42 hits / 11 unreviewed ·
  C4 1 / 0 · S1 0 · S2 0. The 11 unreviewed C3 runs are pre-existing sentences of §4.7, §4.11, §10.2 and II.6 (for example
  "keyed from the district s", "2 2 rule 7 the", "because it is the same path", "what it does not do").
* **Simulated application of the six APPEND blocks, first wording (CONFIRMED, executed 22:28; scratch copy
  `scratchpad/ARCH-sim.md`, 6 applied, 0 skipped):** C1 5 / 0 · C2 0 · C3 57 hits / 25 unreviewed · C4 1 / 0 · S1 0 · S2 0 —
  so the blocks add no table, pointer, identifier, colour or list hit, and 14 generic-phrase C3 runs came from my text
  ("steps is the owner s", "inside it as the old", "band in the town s", "0 6 0 5 0", "the count is a function of the
  seed and", and nine more).
* **Rewording (CONFIRMED, applied):** all 14 phrases were reworded in the blocks file (ten edits at 22:33); a second
  simulated application (`scratchpad/ARCH-sim2.md`, 6 applied, 0 skipped, 9 873 lines) was started and its check
  (`scratchpad/doc-checks-sim2.out`) was still scanning the corpus at landing because eight checker processes of the
  parallel lanes share the machine. **PLAUSIBLE:** the reworded blocks leave only the 11 pre-existing runs. The
  assembler's own run over the changed sections is the binding check either way; any C3 run it still reports in my
  text is a generic-phrase collision to reword, never a quoted finding.

## 11. Addendum 2026-09-27 — item 28 (f), the interior ladder, against item 8 (recorded after landing; no block written)

The owner's message of 2026-09-27 (about 00:50, "same building geometry but not the interior") is routed as item 28 (f)
to model §2.6 (route.md, "#### Item 28 (f)"); this seat is not named there and its five items are unchanged. One
coherence point touches item 8 and is owed to the verify → repair round and the model seat as a one-liner, vetoable:

* Under (f) a shell holds one or many households (`DesignationTemplateRow.households.built … max`, `relet`, §4.11
  rung 1 — the prosperity seat's REPLACE). Item 8's fall step vacates by BUILDING (`{ op: 'vacate'; building: Id }`;
  "the suffix leaves its buildings"). The two meet in one sentence, owed in §4.11's fall paragraph (owner: the
  prosperity seat's REPLACE, which carries my §4.11 APPEND verbatim): a population fall removes households in reverse
  ordinal order; a building whose count falls but not to zero takes a `relet` down (its plan rung goes `stale`, §2.8),
  and `vacate` fires only when its last household leaves; regrowth reverses it — `relet` up in a standing shell before
  `reoccupy` of a vacant one, before a new plot (the regrowth-first order, J-A8.44). The exposure lottery keeps drawing
  per building: it decides which buildings' households are the suffix's first departures within a district, never a
  per-household draw.
* Test (scope §13.2, on T8-2's fixture): after a −6 % population fall on a TOWN whose buildings are let out, no building
  with a surviving household is `vacant`, and every `relet` down marks its plan rung `stale`.
* Nothing else of items 10, 11, 13 and 15 meets (f): an island carries households by band value (`S_carried`), which
  the interior ladder does not change.

CONFIRMED (read): the routing and the state above come from route.md lines 1523–1760 and from
`blocks-pipeline-prosperity-change-dossier-plan.md` (`relet` at its §4.11 rung 1 and its `ConversionOp` union;
`vacate` by building in its carried copy of my §4.11 text). PLAUSIBLE: the one-liner's wording.
