# amend-rendering — the RENDERING part (§8, §9, §11, §12) for amendments b (items 8–31)

Lane `amendments-b/amend-rendering` (architect-editor of the rendering part; seat `rendering`; rule families hidden,
evolution, sewers, islands, assignments, dossier, licence, emulation, plan, prosperity-change). Blocks:
`docs/validation/amendments-b/blocks-rendering.md` — 17 REPLACE blocks, J-ROWS (14), RATIONALE-A (14), END — generated
from the live `docs/ARCHITECTURE.md` (sha256 `1dbfd9d4f39723ee…`, 9 667 lines, 140 headings) by
`scratchpad/rend/gen.py`: every subsection copied verbatim, every change an asserted single substitution, so nothing
outside the changed sentences moves. HOME item: 30 (the knowledge label policy, §9.2 — the route's second home).
REFERENCING: 8, 11, 12, 14, 15, 16, 17, 19, 20, 21, 22, 26, 28 (with (f)), 29, 31.

## PROGRESS

ITEM 30: planned §9.2 (home), §8.1, §8.2, §8.3, §8.5, §8.9, §9.5, §11.1, §11.2, §11.3, §11.4, §12.7 | done: all 12 (blocks 1–3, 5, 7–13, 16)
ITEM 8: planned §8.2, §8.3 | done: both (blocks 2, 3)
ITEM 11: planned §8.2, §8.4 | done: both (blocks 2, 4)
ITEM 12: planned §8.2, §8.4, §11.1, §12.4 | done: all (blocks 2, 4, 10, 14)
ITEM 14: planned §8.4 | done (block 4)
ITEM 15: planned §8.4 | done (block 4)
ITEM 16: planned §12.4, §12.6 | done: both (blocks 14, 15)
ITEM 17: planned §11.2, §11.3, §12.6 | done: all (blocks 11, 12, 15)
ITEM 19: planned §8.2, §8.5 | done: both (blocks 2, 5)
ITEM 20: planned §11.2, §11.3, §11.4, §12.6 | done: all (blocks 11–13, 15)
ITEM 21: planned §11.3 (one line under the owner's 2026-09-27 ruling) | done (block 12)
ITEM 22: planned §11.3, §11.4, §12.6 | done: all (blocks 12, 13, 15)
ITEM 26: not applicable to rendering (J-A26.41: no order change) — recorded in §12.4's re-declared-rows paragraph | done (block 14)
ITEM 28 (with (f)): planned §8.2, §8.3, §8.5, §8.6, §8.9, §11.1, §12.7, §12.8 | done: all (blocks 2, 3, 5, 6, 7, 10, 16, 17)
ITEM 29: planned §8.2, §8.3, §8.5, §11.1 | done: all (blocks 2, 3, 5, 10)
ITEM 31: planned §8.2, §12.6 | done: both (blocks 2, 15)
J-ROWS / RATIONALE-A: 14 rows each | done (blocks 18, 19)
VERIFICATION: apply on copies (mine alone; all eight lanes in name order), doc_checks on the changed keys, the reference resolver | done (§6): blocks file sha256 `cb8388671426a03c…`, 1 515 lines, 20 headers, END-closed; my blocks add 0 unreviewed hits

## 1 Outcome

Every item routed to rendering has landed as a mechanism in the design's own terms, in the smallest subsections that
carry it; nothing was deferred. The one home item (30's label policy) is stated in full in §9.2 as a **knowledge
filter** on the label rows, with its data (`LabelTable.knownTo`, §8.1), its per-viewer key (§11.3), its reader (§11.2),
its exports (§11.1), its legend (§9.5) and its census rows (§8.3). The referencing items land as: one style-sheet
**states** table for every decline, condition and layer state (§8.2), glyph rows for entrances, frontage treatments and
passages (§8.2, §8.3), the layer toggles as visibility with a depth-band cut-away (§8.4), the building band's plan draw,
the plots-only view and the change markers (§8.5), the elaboration cache as the one cache of derived rungs (§8.6, §8.9,
§12.8), the plan block and the storey scenes in the exports with states, entrances, basements and the underground
(§11.1), the one-way bridge with a `report.changed` event and the dossier door (§11.2–§11.4), and the budgets — S10b's
re-declared row, the staged stages' row, the assignment and hook edits, the plan rung's row and its re-cut chain (§12.4,
§12.6, §12.7). Fourteen rulings are recorded (J-A30.81–.84, J-A8.81, J-A12.81, J-A28.81–.84, J-A29.81, J-A16.81,
J-A20.81, J-A21.81), each vetoable, with its Part A entry.

## 2 Per item — where it landed, the mechanism in plain words, the rulings

**Item 30 — hidden plots and clandestine places (HOME for the label policy; §9.2).** *Landed:* §9.2 (the candidate set
and the new knowledge-filter bullet), §8.1 (`LabelTable.knownTo`), §8.2 (the passage arch row; the sealed-plot state
row), §8.3 (the arch in the catalogue; the hidden-court and knowledge census rows), §8.5 (a hidden court reads as a court
behind masses), §8.9 (the export request carries the knowledge key), §9.5 (the legend honours the filter), §11.1 (the
knowledge paragraph; `exposure` and `knownTo` as properties; names withheld), §11.2 (the reader withholds names; the
`query` comment), §11.3 (the `knowledge` view key, its default by role, the host's authority over it), §11.4 (a
dossier may designate a place local or secret), §12.7 (the filter's cost). *Mechanism:* a hidden place is always drawn;
what the map withholds is its name and purpose. Each label row carries its target's `knownTo` (public, local, secret; a
sealed plot reads secret; ways, districts, water, woods and gates are public). Each viewer holds a knowledge key — a tier
and a list of places learned — kept as per-viewer view state. Before the label greedy runs, a table admits or withholds
each row: a local name shows from the neighbourhood band, a secret name only on the building's own view, and either shows
wherever the viewer's tier or list admits it. The same table governs hover, the gazetteer, hit-tests, the legend and every
export, so a shared picture leaks no name its key does not hold; the model digest never depends on who is looking, and the
references' towns (every row public) are unchanged. *Rulings:* J-A30.81 (the filter before the greedy by a byte S14 fills;
digests per (stop, key); goldens at `public`), J-A30.82 (the key as view state; defaults by role; the host sets it, a
client never raises its own), J-A30.83 (the reader and exports withhold by the same table; a secret place shows on its
building view), J-A30.84 (the arch glyph at district and neighbourhood LOD, the mass covering it at city LOD; the
legibility bar as a census row in the design's own terms, not the corpus id the item cites).

**Item 8 — decline and regrowth (REFERENCING §8.2, §8.3).** *Mechanism:* the two inline tone overrides become one
style-sheet table, `states`, keyed by kind × §2.8 state, with `replace` rows (a ruin draws its own programs) and
`override` rows (a vacant house keeps its programs with a tone change): buildings vacant, derelict, ruined, cleared (a
trace hairline), reused; walls neglected, breached, superseded (the old ring as a trace under the new); a census row
checks every producible (kind, state) pair resolves a row in every shipped sheet. *Ruling:* J-A8.81.

**Item 11 — the underground fades (REFERENCING §8.2, §8.4).** *Mechanism:* tunnel rows of the states table by kind and
condition — silted (dashed), caved in (broken with rubble), collapsed or sealed (a centreline trace with a closure glyph)
— drawn through the underground layer's cut-away; the `trace` and closure glyph programs are named in §8.2's program list.

**Item 12 — underground neighbourhoods (REFERENCING §8.2, §8.4, §11.1, §12.4).** *Mechanism:* the cut-away draws one
depth band at a time by a per-viewer `depthBand` key, each underground entity on the level of the band that holds its
floor (`elevationCm` = depth below the datum), `z` ordering the bands inside the one underground arena; cells and vaults
draw with the `vault` program over the `flat` roof kind, access points and gratings as registry symbols on the ground
layer; VTT gives one scene per depth band, GeoJSON and CityJSON carry depth and ceiling, CityJSON gets a `Tunnel` object;
§12.4 carries a staged row for the two stages (measured at their intake). *Ruling:* J-A12.81.

**Items 14 and 15 — sewers by tier; not every city has islands (REFERENCING §8.4).** *Mechanism:* the sewer control at
CITY and METROPOLIS and the island view toggle are `LayerSpec.visible`; existence is the model's (`Features.sewers`,
`recipe.layers.islands`); hiding a layer changes no digest and never creates what the settlement lacks; the underground
layer is hidden by default at every rung. (One ruling with item 12: J-A12.81.)

**Item 16 — assignments obey relation and supply rules (REFERENCING §12.4, §12.6).** *Mechanism:* S10b's row names its
new work (a distance transform per producing class present, a bounded relation score per candidate) as absorbed in the
pooled row's p50 until M2b measures it, with the restatement as the pre-decided fallback and the p95 laws unmoved; §12.6
budgets a post-build placement (≤ 30 ms at CITY, one multi-source Dijkstra per provider class) plus one designation
mutation per placed plot. *Ruling:* J-A16.81.

**Item 17 — uses move (REFERENCING §11.2, §11.3, §12.6).** *Mechanism:* use openings, closings, relocations and mutation
records reach the host through the new `report.changed` event (§11.2's `subscribe`, §11.3's vocabulary); a hand
relocation is budgeted as at most two mutations.

**Item 19 — every designation scales with prosperity (REFERENCING §8.2, §8.5).** *Mechanism:* one line at the materials
paragraph — a material is a rendering attribute only, its rows change colour and texture roles and never geometry, so a
material change re-keys the look and moves nothing (§2.6 is the rule's home); the slot's frontage treatment (lean-to,
stall, shopfront, arcade) is a symbolisation row at the district band and finer.

**Item 20 — one-way flow (REFERENCING §11.2, §11.3, §11.4, §12.6).** *Mechanism:* no PLAT → host message writes, patches
or proposes a dossier change — `doc.changed` carries map-document events only, `report.changed` the map's report, and the
vocabulary has no message that addresses the dossier; a dossier change enters through the host door as `doc.apply` events
with `author: 'host'` and `EditBase.dossier`, in the host's order; the host stores the returned document as an opaque
artifact; the rejection and positive-placement reports travel through `report.changed`; §12.6 budgets a dossier event.
*Ruling:* J-A20.81.

**Item 21 — licence (REFERENCING §11.3; the owner's 2026-09-27 ruling).** The amendments file changed while this seat
ran: item 21 now reads PRIVATE FOR NOW, the GPL-3 intent withdrawn, §17.3 and D-22 unchanged, and its (d) keeps the module
"a SEPARATE PROGRAM talking to SettlementForge through a data protocol only — kept as a design choice". *Landed:* one
sentence at §11.3's transport bullet stating exactly (d) — the bridge is the boundary, messages carry data only, the
module a separate program in its own bundle, a design choice that keeps the seams clean and later licensing options open
— with no licence wording. *Ruling:* J-A21.81. A strict reading of the item's "Editors: apply nothing beyond …" could
drop even this sentence; the verifier may strike it and the row, and §11 then still satisfies (d) through the existing
bridge text.

**Item 22 — dossier changes mutate (REFERENCING §11.3, §11.4, §12.6).** *Mechanism:* the host door carries the dossier
events in the host's order — the ordered history of item 22 (c) — applied as mutations by §7.7's contract; budgeted with
item 20's row.

**Item 28 — floor plans and elaboration by click, with (f) the interior ladder (REFERENCING §8.2, §8.3, §8.5, §8.6,
§8.9, §11.1, §12.7, §12.8).** *Mechanism:* the building band draws a derived plan one storey at a time (a per-viewer
`storey` key; the other storeys' outlines faded) with walls by kind, openings and every entrance's door, windows, the
stair core, chimneys, abstract furniture by room role and room labels, in each family's own ink; `plotsOnly` is the
cadastral view and never the default; a stale rung carries a change marker at every band through a shipped overlay live
layer (`live.stale`) read from the elaboration records outside the digests; the elaboration cache (§2.9) is the one cache
of derived rungs, held by the generation worker, replacing the in-memory `(entity key, revision, lod)` memo; under
`click` the tile worker's band requests are served only from the cache, under `view` they derive; the JSON schema gains a
`plan` block whose rooms carry their household unit and entry opening, so an exported plan says who lives where (28 (f));
VTT gives one scene per storey; §12.7 budgets `plan()` (≤ 5 ms median, ≤ 20 ms p95 per building, one plan per click) and
the interior ladder's re-cut as a chain of such steps whose length is known before the first open; §12.8 adds the cache
line (8 MB LRU, ≤ 4 KB a storey, evicting to `absent`). The synthesis's corrections 7, 8 and 10 (view state, the
elaboration record, the non-canonical cache) and the determinism seat's correction (the record outside both digests) are
honoured; the reference's cell grid, export layout and glyphs are not copied. *Rulings:* J-A28.81 (the marker as an
overlay live layer), J-A28.82 (one storey at a time), J-A28.83 (the budget, the chain and the cache line as PLAUSIBLE rows
with the module doubling as fallback), J-A28.84 (the plan block and storey scenes in our own schema).

**Item 29 — entrances and basements (REFERENCING §8.2, §8.3, §8.5, §11.1).** *Mechanism:* door ticks by entrance role
at the district band and finer (`main` heavier; the plan's door leaf at the building band); a census row (exactly one
`main` tick per building; every other tick on an access edge); VTT portals at every entrance of the set; a basement
extruded below `baseCm` in glTF and as a `BuildingPart` in CityJSON; GeoJSON entrance points with roles. *Ruling:*
J-A29.81.

**Item 31 — prosperity change and the geometry floor (REFERENCING §8.2, §12.6).** *Mechanism:* `Building.condition`
`worn` / `neglected` rows of the states table (weathering amplitude and a patched-roof pattern variant at the finer bands,
texture and colour only, nothing at the city band); the states paragraph states that no render rule reads `builtBand` or
the floor — condition follows `condition`, labels and descriptions the field (J-P1); §12.6 budgets a due block's re-cut
as a block regeneration and a `relet` as one plan re-cut.

## 3 Items satisfied or not applicable to this part

* **Item 26 (hinterland order):** not applicable — the emulation-hidden seat ruled (J-A26.41) that "drawn after" is a
  dependency order the pipeline already realises and the hinterland unit's concurrent execution stands, so §12.4's row
  does not move; §12.4's re-declared-rows paragraph records it.
* **Item 21:** satisfied by the existing bridge and bundle text under the 2026-09-27 ruling; the one sentence added is
  (d) stated at its mechanism home, vetoable (§2).
* **§9.1, §9.3, §9.4, §9.6, §8.7, §8.8, §8.10, §11.5, §12.1–§12.3, §12.5, §12.9:** unchanged — the label record needs
  no field (the filter reads the display-list column), the composed-bitmap key already follows the placement revision
  (§8.8), and no budget law of §12.3 or §12.5 moves.

## 4 CROSS-PART NOTES (what another part's editor must add; the verifiers check both sides)

**model (§2)**
* §2.9 view state: declare the per-viewer keys my sections read — `knowledge` (`{ tier: 'public'|'local'|'secret';
  places: Id[] }`, §9.2, §11.3), `storey` (a plan storey level, §8.5), `depthBand` (the underground band shown, §8.4)
  and `plotsOnly` (§8.5) — beside `elaborate` (the prosperity seat's ask); each per viewer, outside every digest,
  last-writer-wins; the default of `knowledge` by role is §11.3's.
* §2.8: the per-rung `ElaborationRecord` (absent / current / stale / edited) as the determinism seat corrected it —
  outside both digests (J-A28.62); §8.5, §8.6, §8.9 and §12.8 read its `state` and §2.9's `Document.elaborations`.
* §2.6: `Entrance.role` (`main`, `side`, `rear`, `yard`, `service`) and `Basement` (floors, kind, ring) as the synthesis
  §4.1 states — §8.2's tick row, §11.1's portals and 3-D basements read them; the plan records (`Plan`, `Storey`,
  `PlanRoom` with its household `unit` — the address, or `shared` / `service` / `circulation` — and `Opening.entrance`)
  — §11.1's `plan` block exports exactly these; `Building.knownTo` and `Plot.knownTo` (with `Institution.knownTo`, §2.7)
  — §8.1's column reads them; `Plot.exposure` including `sealed`.
* §2.7: `SkyIsland.state`, `Tunnel.closure`, `Enceinte.supersededBy` (the evolution seat's asks) and `Tunnel.kind` —
  §8.2's states table keys on them. §2.5: `BuildingSlot.frontage` (the assignments seat's ask) — §8.2's row reads it.

**pipeline (§4, §10, PART II)**
* §4.1 (the prosperity seat's landed APPEND): its "flagged at every zoom stop with a change marker (§8.5)" and "a plots
  only cadastral view is a view option of §8.5" now resolve to §8.5's paragraphs and `live.stale`; nothing to add.
* §4.6 / §4.7 (the emulation-hidden seat, landed): item 30 (c)'s "drawn as an arch glyph, §8" resolves to §8.2's
  symbolisation row and §8.3's catalogue; the glyph sits at the passage face's two ends on the front building's outline.
* II.7 (the sewers seat, landed): §8.4 names `depthBandCm` (II.7.3) and the `depthBand` view key; II.7.3's one scene per
  depth band matches §11.1; the drain query's cost is counted in §12.4's staged row.
* II.6 (the evolution-islands seat, landed): §8.2's island rows key on `SkyIsland.state`; §8.4 confirms the sky
  `visible` toggle and the shadow shortening by `elevationCm`.
* §4.11: §12.7 budgets a `relet`'s plan re-cut as a chain of one step per interior row or household changed, bounded
  because the ladder has five rows and `relet` moves one household at a time; if the ladder gains rows the bound moves
  with it.
* §10.2: `RoomProgramRow`'s furniture spec is what §8.2's building-band presets draw as abstract furniture by room role;
  no glyph list from the reference enters.

**determinism (§5–§7)**
* §5.4: `report.changed` (§11.2, §11.3) carries the report's new entries — placement rejections and positive placements
  with their lapses, use openings, closings and relocations, mutation records, disruption reports — so §5.4 should list
  them as report entries with a stable shape; if §5.4 names them differently, §11.2's list follows §5.4.
* §7.1: `setAttr(knownTo)` (landed) is what §9.2 relies on as the logged model event; §7.7's `Assignment.knownTo` is the
  dossier's fact §11.4 names.
* §7.3's stale-click row: §8.5 and §8.6 say a stale rung is served from the cache until the click re-derives it by
  mutating the cached result; if the model seat takes the route's canonical-chain `prior` instead, §8.6's wording still
  holds (the chain starts from the built programme) and §12.7's chain-length statement is exactly that chain.
* §6.5 (9) / §13.3: per-stop placement digests are now per (stop, knowledge key), goldens at `public` with no places; the
  cross-host placement test should also run one non-public tier (a note to scope below).
* §7.8: `knowledge`, `storey`, `depthBand` and `plotsOnly` are view keys, not controls (as `elaborate` is, landed) — no
  registry rows; the sewer and island controls' view halves are the `LayerSpec.visible` §8.4 names.
* §6.2: `live.stale` reads the elaboration records outside the digests and nothing hashed changes.

**scope (§13–§17, D-rows, the staged list, the landing rows)**
* §13.2 / §13.4 tests (the census rows are stated in §8.3; these are the behaviour tests scope states): (T30-R1) a golden
  CITY at `public` and at `secret`: base tiles pixel-identical, no `local` name glyph at the city or district band and no
  `secret` name above the building band at `public`, each tier's per-stop placement digests stable across the five
  engines; (T30-R2) `query` (`gazetteer`, `hit`, `inView`) and hover on a document with a `secret` institution:
  `withheld: true` at `public`, the name at `secret`, the row present in both; (T30-R3) export leak: an SVG, GeoJSON and
  `.dd2vtt` made from a `public` view contain no `secret` place's name string; (T30-R4) the legend gives a withheld place
  no number, letter or row; (T28-R1) the `plan` block validates against the schema and round-trips; the storey scenes'
  portals equal the plan's openings and entrances; (T28-R2) `plan()` timed by the B-PLAN spike (§16; the synthesis §6)
  and the cache line at the stage-3 intake; (T29-R1) VTT portals at every entrance of the set; glTF and CityJSON
  basements below `baseCm` validate; (T12/14/15-R) the hidden-layer pixel-identity test the sewers seat asked for, and the
  cut-away shows one depth band; (T16-R) §12.4's re-declaration measured at M2b; (T17/20/22-R) `report.changed` carries
  every rejection, placement, lapse, relocation and mutation record of a B-EDIT sequence, and M3a's bridge test confirms
  no PLAT → host message type outside the vocabulary.
* §14: `@plat/labels` reads the `knownTo` column; `@plat/render` ships `live.stale` and the `states` table's programs;
  `@plat/api` holds the elaboration cache and emits `report.changed`; the app's gazetteer honours the knowledge key (item
  30 (g)).
* §15.2: O12 (d)'s legend row and O13's label rows note the knowledge filter; O11's export rows the `plan` block and the
  storey scenes; O17 (f) "doorless" → the entrance set's ticks.
* §16: price the states table and the glyph rows (≈ 0.5 pw on the rendering line, M2b–M3b), the knowledge filter, key and
  reader (≈ 1 pw on the O9 / app line, M3a), the plan draw, cache and export block as stage-3 hooks (≈ 1 pw at the
  stage-3 intake), `report.changed` (small, M3a); keep the milestone rows equal to the total.
* D-3's paragraph: the toggles are visibility (§8.4). The staged list's sewers-and-islands row gains "§8.4's depth-band
  view key and §8.2's `states` rows"; its stage-3 row "§8.5's plan draw and change markers, §8.6's cache, §11.1's plan
  block and storey scenes, §12.7's plan row, §12.8's cache line".
* Item 21 under the owner's 2026-09-27 ruling: §17.3 and D-22 unchanged; the one-line rationale note that the GPL-3
  intent was withdrawn; the kernel seat's landed §3.1 re-grounding and J-A21.31, and any other seat's item-21 mention
  written under the GPL-3 reading, must be re-read by the verify / repair round so no "GPL-3 for the module" wording
  lands; §11.3's sentence carries none.
* The landing rows for items 8, 11, 12, 14–17, 19–22, 28–31 name the rendering sections of §2 above as referencing
  sections; item 30's row names §9.2 as its second home.

**kernel (§3)**
* §3.4's "counted by §12.7's plan row" (item 28 (f)) is carried: §12.7 counts the transient arena's open, cuts and
  read-back per step and a re-cut as a chain by steps. Nothing else.

**assembler**
* `blocks-rendering.md` REPLACEs 17 subsections — §8.1–§8.6, §8.9, §9.2, §9.5, §11.1–§11.4, §12.4, §12.6–§12.8 — none
  touched by any other block file (verified: all eight files applied together in name order on a copy, 120 blocks
  applied, 0 skipped, 0 double replacements, headings 140 → 145 = the sewers seat's II.7, fences balanced). The blocks
  are order-independent.
* The `II.7` references in my blocks resolve once `blocks-pipeline-sewers.md` lands (verified on the combined copy: 0
  broken II references; the only entries are the dotted `J-A` ids, which need the resolver's one-character widening
  every seat has flagged, and the baseline's two).
* Document checks on my sections (§6): exit 0 after my blocks; no allow row needed.

## 5 The owner's question — "what are your thoughts?" (item 28 (f), from the rendering side)

The interior ladder needs nothing new in how the map is drawn: the plan is already the building band's picture, so a
re-cut mansion shows its new corridors and apartments the moment the user clicks, while every band above it shows the
same shell. What the rendering side adds is where the change is *visible* at each zoom. At city zoom a grand district
grown poor still looks grand — big plots, big shells — which is exactly the owner's floor; the poverty shows first in the
district band's condition rows (worn, then neglected: patched roofs and heavier weathering, texture and colour only), in
the yards infilled by rung 2, and in the labels and descriptions that follow the prosperity field, and last in the plan,
where one household's rooms become many households' units off a corridor. The exported plan says who lives where, so a
host that holds the households can read the ladder's outcome without re-deriving it. The one budget consequence is that
a re-cut is a chain rather than one step; it is priced as such (§12.7) and stays a single click.

## 6 Verification — CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed on copies, receipts in `scratchpad/rend/`):**
* Generation: `gen.py` read the live document (sha256 `1dbfd9d4f39723ee…`) and asserted every anchor occurs exactly once
  in its subsection; 17 section blocks, 14 J rows, 14 Part A entries, END.
* Apply, my blocks alone (`peh/apply.py`, the emulation seat's protocol applier): 19 applied / 0 skipped / 0 double;
  headings 140 → 140; fences balanced; the title block and banner byte-identical; every hunk of the diff lies in §8, §9,
  §11, §12 or the judgment index (`diff-mine.txt`, 358 lines); the Part A entries land directly before "## Part B".
* Apply, all eight lanes' block files in name order: 120 applied / 0 skipped / 0 double (`apply-all2.txt`).
* Reference resolver (`assemble-r0-refs.py`) on the combined copy: broken entries = the dotted `J-A` ids (269) plus the
  baseline's two (§2.1.4, §3.1.6); 0 broken § or II pointers from this file.
* Document checks on my simulated copy, `--sections "8,9,11,12,Judgment calls"`: the first baseline (the untouched
  document, 01:3x) exit 0 with C1 5/0, C2 0/0, C3 129/0, C4 1/0, S1 0, S2 0; after my blocks **exit 0** with C1 5/0,
  C2 0/0, C3 131/0, C4 1/0, S1 0, S2 0 (`checks-mine3.txt`; the first draft raised 39 unreviewed C3 runs — my own prose
  echoing the Fable synthesis and section-number sequences — every one rephrased rather than allow-rowed). **Corpus
  growth during this seat:** at 02:00 a parallel lane wrote `research/findings/code-mfcg.md`, which quotes the design's
  own phrases, so the untouched document now raises 5 unreviewed C3 hits of its own (`checks-baseline2.txt`: the §8.9
  "§8.2, §8.4" run, §8.10's "from its cell's edges", §9.5's "are the four corners and the four" and "the scale bar and
  the emblem", §12.8's "SVG in the generation worker" — none in text I changed). The final run on my copy
  (`checks-final3.txt`) gives C1 5/0, C2 0/0, C3 135/5, C4 1/0, S1 0, S2 0 with the unreviewed set **identical** to
  that baseline's: my blocks add 0 unreviewed hits. For the assembler: those five are false positives (the design's own
  text quoted by a findings file) and need reviewed allow rows, or the corpus should exclude files that quote the
  document; the lane that wrote `code-mfcg.md` should be checked against the clean-room rule (a findings file reading
  reference code is fine, but its content must not reach implementers, §17.1).
* The owner's words read against `docs/AMENDMENTS-2026-09-25b.md` twice (before and after its 2026-09-27 change to item
  21), the route against `route.md`, the findings and the synthesis whole.

**PLAUSIBLE (reasoning only):** every mechanism, row value and budget number I wrote — the knowledge table's band rules,
the states table's tones and alphas, the glyph sizes, the plan budget (5 / 20 ms), the chain bound, the cache line (8 MB,
4 KB), S10b's ≈ 4–10 ms, the ≤ 30 ms placement, the report event's shape — until the milestones named beside them
measure them; and the reading of item 21's "apply nothing beyond" (§2).

## 7 Reading record

Read whole: the owner's items 8–31 in `docs/AMENDMENTS-2026-09-25b.md` (and the diff of its 2026-09-27 change);
`docs/OWNER-INSTRUCTIONS-2026-09-25.md`; `route.md` §How to read, the summary table, items 8, 11, 12, 14–17, 19–22, 26,
28 with (f), 29, 30, 31, the rule families, cross-cutting duties, stale-text table, the item-28 reading list;
`docs/ARCHITECTURE.md` §8, §9, §11, §12 whole, the title block and one-page summary, the judgment index's format, the
staged list; the canon's home rules; the first sixty lines of Part A; `research/findings/dwellings-posts.md` §0,
`profile-dwellings.md` §0, `dwellings-exports.md` §0, `_critic-dwellings.md` §0 and §5 (binding rulings),
`dwellings-synthesis.md` whole; the seven landed lanes' cross-part notes to rendering and the fields their blocks declare
(grepped by name); `doc_checks.py`'s header; `assemble-r0-refs.py`; `peh/apply.py`.
