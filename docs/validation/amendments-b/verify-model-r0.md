# verify-model-r0 — lane amendments-b/verify-model-r0 (verify the MODEL part, §2, after amendments b)

> PENDING FABLE REVIEW — Opus-produced verification seat (lane amendments-b/verify-model-r0, 2026-09-27).

> PROGRESS (kill-safe ledger; one line per item — planned | done):
> INPUTS: route.json model entries, owner's words 8–31 (incl. 28 (f)), amend-model.md whole, the eight other seats' cross-part notes to model, assemble-r0.md, §2 whole (l. 367–1980) | done
> ITEM 28 / 28 (f) / 29 (home): verdicts + checks | done (§1, §2)
> REFERENCING 8,10,11,12,16,17,18,19,20,22,24,25,27,30,31: verdicts | done (§1)
> CROSS-PART NOTES to model (determinism, kernel, assignments, emulation-hidden, evolution-islands, prosperity, sewers, rendering, scope): checked | done (§3)
> SWEEPS single-source / stale / deferral / broken-reference / new-problem | done (§4)
> ISSUES V-MAB-01 … V-MAB-42 written | done (§2)

Read whole: `docs/AMENDMENTS-2026-09-25b.md` items 8–31 (28 (f) with the owner's 2026-09-27 words as relayed); the
route entries for every item routed to model (`route.json`: home 28, 29; referencing 8, 10, 11, 12, 16–20, 22, 24, 25,
27, 30, 31); `amend-model.md` whole; the CROSS-PART NOTES to model in `amend-determinism.md` (§4, §8.7), `amend-kernel.md`
(§4), `amend-pipeline-assignments.md` (§4, §7), `amend-pipeline-emulation-hidden.md` (§8), `amend-pipeline-evolution-islands.md`
(§7), `amend-pipeline-prosperity-change-dossier-plan.md` (§4 and the 28 (f) re-run notes), `amend-pipeline-sewers.md` (§4),
`amend-rendering.md` (§4), `amend-scope.md` (§4); `assemble-r0.md` whole; §2 of `docs/ARCHITECTURE.md` whole (l. 367–1980,
sha256 `87d8969209c7deb5…` as installed); and every subsection that cites a §2 fact the checks below needed, read at the
cited lines (§0.2 rows 11, 25, 28–31; §3.4 `transientArena`; §3.10 l. 3024–3042; §4.5 middle band; §4.6 exposure and
passage; §4.7 S10b households, S11 mutator; §4.11 rung 1, the floor paragraph, `DeclineOp`, `TerrainWaterOp`, sealing;
§5.2 F-PLAN; §5.3 rows l. 5405–5412; §6.3 anchor rows; §7.1 table and `EditBase`; §7.3 stale-click rows; §7.4 rows and the
warp paragraph; §7.5; §8.1 `LabelTable.knownTo`; §8.4 / §8.5 view keys; §9.2 knowledge filter; §10.2 row types; §11.3
view state; §12.7 plan row; §13.2 T19, T28, T29 bars; II.4; II.6 underground paragraph; II.7.3; II.7.4). Mechanical
references: `refs.py` on the installed document reports the same 2 external citations as the assembler and 0 inside §2.

## 1 Item verdicts (the mechanism in the terms the route required)

| item | verdict | where and what (quoted or named exactly) | issues |
|---|---|---|---|
| 28 (home) | PRESENT, with defects | §2.6: `Composition.lod: ('outline'\|'wings'\|'rooms'\|'plan')[]`; the records `Room`, `Plan`, `Storey`, `ProgramRoom`, `Wall`, `Opening`, `WindowRec`, `StairCore`, `Chimney`, `RoomRole`, `LayoutPattern`; `BuildingGenerator.plan(input, composition, k, prior?)` "prior = the canonical prior a re-cut mutates … — never the cache"; "The plan rung" steps 1–7 ("*Inputs — nothing is rolled*" … "*Streams, re-rolls, edits, failure, cost*": `plan.program`, `plan.layout`, `plan.roles`, `plan.furnish` with the rung's own reroll; the eight plan events); "Elaboration by click, and the rung states" (`absent` / `current` / `stale` / `edited`; "Pre-assigned plots are the eager content decision … 'just not generated' until the click"); §2.8 `ElaborationRecord` "outside both digests"; §2.9 `Document.elaborations: ElaborationChunk[]`, `derived.elaborations`, the `elaborate` view key | V-MAB-01, 09, 24, 25, 26, 38 |
| 28 (f) (home) | PRESENT, with defects | §2.6 "The interior ladder — the interior has no floor": the programme "written for the **occupants' band** — the plot's prosperity **field** band and value … never the manifested band and never `geometryFloor` — and for the household count (`Building.households`)"; the six-row table (unit form, households per shell, unit's rooms, shared rooms, staff rooms "count; size as a share of the owners' principal chamber's target; placement", circulation, room-size factor); "The dwelling unit" (`Room.unit`, `Plan.units`, the unit-door rule); "One capacity function"; "Never omit a household"; "The re-cut, both ways" (FIXED / RE-DERIVED / LEAST DISRUPTION, "Re-uniting the households removes what the subdivision added", the canonical chain "first the ROWS … then the HOUSEHOLDS"); "Staff and shared rooms"; "Bars (§13.2)"; §2.7 `Household.building` "its dwelling unit is the rooms of that building's plan carrying its id … cut for the plot's field band, not for `wealth`"; §2.8 the elaboration inputs "the occupants' band and value … and the households housed". Every clause of the owner's message is carried: larger home for a smaller family (rich `[1, 1]`, factor 1.25), staff rooms "dwarfed" (0.35 of the principal chamber), same shell with a partitioned interior and corridors to separate family rooms (`modest`, `poor`), common rooms where the band allows, larger versus smaller rooms (the size factor), "all apartments … a bedroom and a small place … to cook food. maybe not even that" (`poor`, `squalid`), both directions (rich ↔ middle), "the more rooms for more occupying families the richer a building gets" read as the shell's capacity (J-A28.23, vetoable) | V-MAB-19, 20, 21, 22, 32, 34 |
| 29 (home) | PRESENT, with defects | §2.6 `entrances: Entrance[]` "≥ 1 … exactly one of role main"; `Entrance { vertex: VertexRef /* ('entrance', building id, i) */; role; faces; wing; side; offsetCm }`; "Entrances": one function `deriveEntrances(building, plot, template row)` "that S11 (§4.7), the designation mutator … and the edit layer … all call, as `deriveBase` is called", rules 1–5; "Basements": derived "never rolled alone" from the class row's `cellar` columns, prosperity, size and storeys, gated by terrain (`terrainClass`, the water table, half and walk-out cellars), `Basement { floors; kind; ring; access }`, `Heights.floorsBelow`, "A cellar never joins a sewer as a room"; §2.2 rule 7 `entrance` indexed; §2.5 `BuildingSlot.entranceOn` widened; §2.3's closing sentence names the facts the gate reads | V-MAB-02, 14, 15, 16, 17, 18, 30, 38, 42 |
| 8 | PRESENT, one defect | §2.8 decline hooks: "*buildings* occupied → vacant (`abandoned`) → derelict (`decayed`, roofless: `RoofSpec.kind 'none'`) → ruin (`ruined`) → robbed or cleared (`cleared` …) → reused (`reused` …)", walls and gates, tunnels, islands; "Which conversion … moves which state is a data table"; "a cleared or reused building is a **live record**"; `Existence` gains `cleared`, `reused`; §2.7 `Enceinte.supersededBy`, `MaterialLedger`; §2.6 `Building.predecessor`, `RoofSpec 'none'` | V-MAB-29, 39 |
| 10 | PRESENT | §2.7 `SkyIsland.supply: { town; carried }`, `areaHa`, `state: 'floating'\|'waning'\|'settled'\|'fallen'`; the staged-layers paragraph "an island exists **only where prosperity supplies it** … only at CITY and METROPOLIS and never certain" | — |
| 11 | PRESENT in §2; its cited home missing | §2.7 `Tunnel.closure?: 'collapsed'\|'sealed'`, "its condition … is a reading of existence and closure through II.6's condition table (whose open column …)"; §2.8 tunnels mapped onto `Existence` — II.6 carries no such table | V-MAB-10, 35 |
| 12 | PRESENT | §2.1 "The underground arena's content"; §2.2 rule 1 "The underground arena's levels" (L0 rock … L4 buildings "flush against the kerb (U3)"); `District.kind` `underground`; `Allocation.target`; `ContextVector.arena`; `Tunnel.headroomCm`, `navigable`; the `access_point` vertex role; §2.9 `derived.features`; depth and ceiling through `elevationCm` and `Heights` (II.7.3); `cellarOf` not adopted (J-A12.42) | V-MAB-11, 37 (other parts' side) |
| 16 | PRESENT | §2.5 context vector confirmed: `upwind`, `upstream`, `terrainClass`, `dist.*` (`market` "the nearest market of either rank"), `roadClass`, `areaM2`, `shape`, `prosperityBand`, `arena`, the plot's `exposure` / `knownTo`; `BuildingSlot.frontage`; §2.6 `ClassRules.pick` "the class row and its designation template (§4.7 S11, item 19)" | V-MAB-23 (pick's inputs) |
| 17 | PRESENT | §2.7 `Use { id; cls; specialisation?; plot; buildings; assignment?; owner?; pinned; opened; closed?; lifecycle }`; §2.6 `use?` ("absent: vacant"), `formerUses`; §2.8 `LifecycleEvent.kind` `'open'\|'close'\|'relocate'` with `detail.from` / `to`; the registry's `Use` row | — |
| 18 | PRESENT, one pointer missing | §2.8 `LifecycleEvent.kind 'mutate'`, `detail.mutation` "index into the causing event's mutations (EditBase.mutations, §7.1)"; §2.6 entrances "re-derived when the designation mutates", the re-cut "as item 18's mutation applied to rooms", "a shell mutation by item 18 keeps nothing in the wing that changed", a STORED plan "re-cut inside the event that changes its inputs"; §2.8 derivation record "may also cite the designation-template and compatibility slices" | V-MAB-31 |
| 19 | PRESENT | §2.6 "Materials": "A material is a **rendering attribute only** … never a footprint, a wing, a storey, a height or a roof form", default rows FTG's per-stage model with district-kind and class overrides, the optional `extension: 'regionalShift'`; `MaterialRow.key.band` only in those rows; `ClassRules.pick` reads the template; the rule's single home (§4.7 l. 4382, §8.2 l. 7419 point to it) | V-MAB-23 |
| 20 | PRESENT | §2.8 `Identity.dossier?: DossierRef` "such an entity is never removed by a map edit, only rejected from a site"; kinds `'reject'\|'lapse'\|'place'`; the registry's `Rejection`; §2.9 "dossier events … enter the log through the host door … every map edit lives here and never in the dossier, and the module never writes the dossier" | — |
| 22 | PRESENT | §2.9 "so the log is the ordered dossier history the map is a function of (§6.2)" | — |
| 24 | PRESENT | §2.5 `Reservation.rank?: 'principal'\|'secondary'`; `District.kind` "market (one per market of either rank)"; `dist.market` "the nearest market of either rank" | V-MAB-36 (`rank` has no §7.1 row) |
| 25 | PRESENT, name and record conflicts | §2.3 "Slow change — what each terrain and water conversion changes"; `WaterBody.kind 'ditch'`; §2.7 `LandUse.reclaimed?: { from; epoch }` | V-MAB-12, 13, 33, 34, 35, 40 |
| 27 | PRESENT | §2.5 `FieldBands.bands` "cuts.length + 1 of them — from §4.5's `prosperity.bands` table", `FieldBands.middle` "the band that holds its median household … (§4.5; J-A27.42)"; districts stay feature-named (J-P1) | — |
| 30 | PARTIAL | §2.5 `Plot.exposure` (six values, "derived at §4.6"), `Plot.knownTo`, `Block.reach`, `Passage { face; …; sealed }`; §2.4 "No `passage` way class"; §2.6 `Building.knownTo`, `Wing.spans`, the stage-3 contract on ground rings; §2.7 `Institution.knownTo`; §2.8 "a sealed passage's plots … enter the ladder as vacant"; §2.9 `knowledge` — but the plan's reserved passage contradicts `Wing.spans`, the seal's storage and the sealed plot's `knownTo` conflict with other parts, and the `knowledge` key conflicts with §11.3 | V-MAB-01, 03–08, 16, 37, 41 |
| 31 | PARTIAL | §2.5 `Block.due`, `Plot.builtBand`, `builtProsperity`, `geometryFloor` "derived at read and never stored", the `DerivationRecord` bullet ("**an epoch never re-derives plots by τ**"); §2.6 `Building.households`, `condition`; §2.8 "**Two band memories, kept apart**", `'relet'` — the route's two §2.6 pointers (replaceability; a class change keeps the shell) are absent, and §2.5 restates the floor formula §4.11 owns | V-MAB-23, 27, 28, 36 |

## 2 Issues (id · item · severity · kind · owner — claim — required change)

**V-MAB-01 · 30 × 28 · major · new-problem · model.** The plan rung treats item 30's passage as a reserved ring INSIDE the
building's storey, while the adopted representation puts it OUTSIDE the ground ring. §2.6 step 1 "a reserved passage
(`Wing.spans`)", step 3 "a reserved passage are anchors fixed in their wing", step 4 "fixed rings the stair core's bay, the
chimney stacks, the passage", step 5 "a `passage` opening at each end of a reserved passage", the re-cut's FIXED list "the
reserved passage cells", `Opening.entrance` and Entrances rule 5 "the two ends of a reserved passage are entrances onto
it" — against `Wing.spans` ("the ground storey ends at the passage's edge and every storey above extends over it (the
wing's extent at level ≥ 1 is footprint ∪ the passage face's ring)"), the stage-3 contract ("the passage face lying outside
the union at the ground") and the fourth rung / step 6 ("per storey the union of the plan's rooms equals the union of the
rings of the wings that reach the storey"). At level 0 the passage lies outside every seed ring, so a fixed passage ring
breaks §3.10's seed-tiling row; at level ≥ 1 "rings" omits the extent `Wing.spans` adds; and J-P48's check (4) "every room
ring inside the face" fails for every room above a passage. **Required change (§2.6):** (i) the fourth-rung sentence and
step 6 read "per storey the union of the plan's rooms equals the union of the extents of the wings that reach the storey
— a wing's ring, and above the ground its ring ∪ the passage face it spans (`Wing.spans`) — and, at the ground storey, also
the face of each passage a wing of the building spans, which the plan reserves before any cut as one room of role
`passage`, scope `circulation`, its two end edges exterior walls carrying the passage's arch openings"; (ii) step 1's "a
reserved passage (`Wing.spans`)" reads "each spanned passage face (`Wing.spans`): at the ground storey a seed ring and a
fixed ring"; (iii) J-P48 check (4) reads "every room ring inside the face or inside a passage face the building spans".
The kernel's `fixed` "a passage under the wing" (§3.4), §4.6's "the plan rung reserves those cells", §5.3's and §7.3's
"reserved passage cell(s)" then hold as written; §7.4's warp sentence follows (V-MAB-38). Record the ruling (the spanned passage face as a reserved ground-storey room of the spanning building's plan) in J-A30.21's index row and Part A entry.

**V-MAB-02 · 29 · major · new-problem · model.** An edited or derived basement's ring is left behind by every footprint
move. `Basement.ring` is "world lattice points, carried with the wings", but `CarriedShapes { wings; composition? }`, the
wing-carrying rule, J-P48's list, §2.2 rule 5's exception and §7.4's warp paragraph ("wing rings — and a stored stage-3
composition's rings and tower centres") carry no basement; after a `warp`, `moveVertex` or `moveFootprint` the ring stays
at its old points unless the terrain gate happens to change, and §5.3's row "a basement lies inside its ground storey's
wings" fails. **Required change (§2.6):** `CarriedShapes` gains `basement?: Basement`, its ring carried by rule 2 (b)'s
mean-value coordinates in the same call; rule 4's check adds "the basement ring inside the ground storey's wings"; an
unedited basement whose carried ring fails it is re-derived by the basement decision, an edited one fails the step as a
held pin does; the `Basement.ring` comment cites the carry, and §2.2 rule 5's sentence on points that are no vertex names the basement ring among the points carried with their building.
§7.4 follows (V-MAB-38).

**V-MAB-03 · 30 (e) · major · conflict · determinism.** The seal's one stored fact has two homes. §2.5: `Passage.sealed` is
"the one stored bit behind 'a sealed access edge' and a plot's exposure 'sealed'", chosen by J-A30.21 "over an access-row
flag in the kernel … the role table has no flag column and needs none"; §7.4's row "drawPassage / sealPassage / openPassage
/ setAttr(knownTo)" persists "the access rows' `sealed` flag", and J-A30.71 (index and Part A) chose "a flag on the access
row". **Required change:** §7.4's row, persisted-state cell: "the access rows' `sealed` flag" → "`Passage.sealed` (§2.5; an
access row on a sealed passage face reads sealed)"; J-A30.71's index row "a sealed passage is an access-row flag skipped by
the reachability walk" → "a sealed passage is `Passage.sealed` (§2.5, J-A30.21), its access rows read as sealed and
skipped by the reachability walk", and its Part A entry likewise.

**V-MAB-04 · 30 (e) · minor · conflict · kernel.** §3.10 "Nesting admits no exception": "the seal is an attribute of the
plot's record (§2.5, §2.8)" contradicts §2.5's `Passage.sealed`. **Required change:** "the seal is `Passage.sealed`, an
attribute of the passage's record (§2.5)".

**V-MAB-05 · 30 (e) · minor · conflict · pipeline.** §4.11 "Hidden plots over epochs": "`sealPassage`: the passage face's
access edges are marked sealed" states a stored mark on edges. **Required change:** "`sealPassage` sets `Passage.sealed`
(§2.5), so the access edges on its face read as sealed".

**V-MAB-06 · 30 (d) · minor · conflict · model.** The default `knownTo` of a sealed plot. §2.5 `Plot.knownTo`: "defaults
from exposure (hidden → local, else public)" makes a sealed plot `public`; §8.1 `LabelTable.knownTo` ("a sealed plot's
reads secret") and §9.2's knowledge filter ("a `sealed` plot's reads `secret`, §4.6") read it `secret` — the lost place
of item 30 (e). **Required change (§2.5):** "defaults from exposure (hidden → local, sealed → secret, else public)",
and J-A30.22's index row and Part A entry name the sealed default; rendering's pointer follows (V-MAB-41).

**V-MAB-07 · 30 (d) · minor · duplicate · pipeline.** §4.6 restates the `knownTo` default ("`knownTo` on the plot, building
and institution records (§2.5, §2.6) defaults from exposure (hidden → `local`) and is otherwise a dossier fact") — a
second, now incomplete statement of §2.5's. **Required change:** "`knownTo` … takes §2.5's default and is otherwise a
dossier fact".

**V-MAB-08 · 30 (d) · major · conflict · model.** §2.9's `knowledge` view key contradicts its bridge home. §2.9: "the
knowledge sets the viewer holds … the empty set by default and in every golden"; §11.3: "`knowledge` (§9.2: a tier
`public`, `local` or `secret`, and `places`, the known places by address) … defaults from its role — `owner` and `editor`
`secret`, `viewer` `public`" (J-A30.82; §9.2 gives the same tier-and-places shape). **Required change (§2.9 View state):** "`knowledge` (item 30: `{
tier: 'public'|'local'|'secret'; places: Id[] }` — the tier and the places the viewer has learned, which §9.2's label policy
and the reader (§11.2) admit; its default by role and who may set it are §11.3's, J-A30.82; every golden is taken at tier
`public` with no places)".

**V-MAB-09 · 28, 12 · minor · missing · model.** §2.9's View state list omits three per-viewer keys other parts home
there: §8.5 "the per-viewer view key `storey` (§2.9)", §8.4 "the per-viewer view key `depthBand` (§2.9)", and `plotsOnly`
(§8.5, §11.3 — the plots-only view answering the owner's "plots without buildings", item 28 (b)); rendering's cross-part
note asked for all three. **Required change:** add "`storey` (the storey the building band draws, the ground by default,
§8.5; J-A28.82), `depthBand` (the underground depth band drawn, §8.4; J-A12.81), `plotsOnly` (the cadastral plots-only view,
off by default, §8.5; item 28)" beside `elaborate`.

**V-MAB-10 · 11 · major · broken-reference · pipeline.** "II.6's condition table (its `open` column)" does not exist.
§2.7 (`Tunnel.lifecycle`), §2.8 (tunnels "their condition reading and its `open` column are II.6's"), II.7.3 (twice: "the
condition row's `open` flag, II.6") and J-A11.21 cite it; II.6's "The underground fades like the walls" gives the ladder in
prose only. **Required change (II.6, that paragraph):** add the table, the one home the readings cite — state · existence
· closure · open: in use · generated or built · — · true; neglected (silted) · abandoned · — · true; partly caved in ·
decayed · — · false; collapsed · ruined · collapsed · false; sealed (decommissioned) · ruined · sealed · false.

**V-MAB-11 · 12 · minor · conflict · pipeline.** II.7.4 `AccessPoint.under.at: VertexRef /* ('access', id) on the
tunnel's kerb */` names the `access` EDGE role; §2.2 rule 7 declares the vertex role `access_point` for exactly this
(J-A12.21), and the model seat's note asked for it; the trailing "§2.7's registry" is §2.8's. **Required change:**
`('access', id)` → `('access_point', id)`; "// §2.7's registry" → "// §2.8's entity registry".

**V-MAB-12 · 25 · minor · conflict · model.** §2.3 names the reach's silting `silt`; §7.1's edit table names it `siltReach`;
`silt` is also the tunnel ladder's op (§4.11 `DeclineOp`). **Required change (§2.3):** `silt` → `siltReach` (with V-MAB-13).

**V-MAB-13 · 25 · minor · conflict · pipeline.** §4.11's one `ConversionOp` union holds two ops with the discriminant
`'silt'` — `DeclineOp { op: 'silt' | 'caveIn' | 'seal' | 'reopen'; tunnel }` and `TerrainWaterOp { op: 'silt'; water }` —
and §7.1 already cites `siltReach` (the determinism seat's note asked for it). **Required change:** `TerrainWaterOp`'s
`op: 'silt'` → `'siltReach'`, and "Repair" and the rarity bullet's `silt` (the reach) → `siltReach`.

**V-MAB-14 · 29 (b) · minor · new-problem · model.** The half-cellar's freeboard case can never fire: the water table is
"the nearest water body's surface elevation … plus a freeboard (50 cm)", "no cellar where … the cellar floor … would lie
below the water table", then "a **half-cellar** where … the floor would fall inside the freeboard" — a floor inside the
freeboard is already below the water table. **Required change:** "no cellar where even a half-cellar's floor (`baseCm` less
half the cellar depth) would lie below the water table; a half-cellar where the full cellar's floor would lie below it and
the half-cellar's would not, or where `terrainClass` is `low`".

**V-MAB-15 · 29 (b) · minor · broken-reference · model.** "the nearest `hydro` cell under the footprint whose `flowAccum`
passes the drainage-line threshold (§2.3)" — no threshold is defined in §2.3 or anywhere (the phrase occurs once). And
§2.3's closing sentence calls `terrainClass` one of "these" terrain facts, but it is §2.5's `ContextVector` field.
**Required change:** name the threshold as a basement gate value beside `waterTableM` and the freeboard (e.g.
`drainageAccumCells`, in the row V-MAB-42 declares) and cite that row; §2.3's sentence reads "reads `ContextVector.terrainClass` (§2.5) and these
facts — the nearest water surface's elevation and the `hydro` grid's accumulation".

**V-MAB-16 · 29 × 30 · minor · new-problem · model.** `Entrance.faces: 'street'|'lane'|'alley'|'yard'|'court'` cannot name a
passage, yet rule 1 puts "a hidden plot's main entrance" on "its access face — the court or the passage" and rule 2 allows
a side or rear door on "a passage face". **Required change:** add `'passage'` to `Entrance.faces`.

**V-MAB-17 · 29 · minor · new-problem · model.** An entrance's position is stored twice and one copy is never re-read.
`Entrance.vertex` is a footprint vertex the carry moves; `wing`, `side`, `offsetCm` (and `Porch.side` / `offsetCm`, "so the
porch and the plan's front door coincide by construction") are stored numbers no carry step updates, so after a warp that
stretches the side the offset, the porch and the door disagree, and §6.3's re-match "by (wing, side, offset)" reads stale
values. `Opening.entrance` is "index into Building.entrances" while the row is `('entrance', building id, i)`; a removal
by `setEntrance` can shift the array. **Required change:** the wing-carrying rule (rule 3) adds "after every carry each
entrance's `side` and `offsetCm` are re-read from its vertex, and the porch takes the main entrance's"; `i` is a stable
ordinal never re-used after a removal, and `Opening.entrance` names that ordinal.

**V-MAB-18 · 29 (b) · minor · duplicate · model.** `Basement.floors` ("storeys below ground, ≥ 1 (Heights.floorsBelow)")
and `Heights.floorsBelow` store one count twice. **Required change:** keep `Basement.floors`; `Heights.floorsBelow` becomes
"derived: `basement?.floors ?? 0`, never set on its own" (or drop one of the two fields).

**V-MAB-19 · 28 (f) · minor · new-problem · model.** The one capacity function is not yet one integer per shell. (a) "Σ over
the wings that reach the storey of area2(ring)" double-counts overlapping wings, which rule 4 (iii) admits ("a T whose stem
runs into its bar"), and omits the spanned passage extent above the ground (`Wing.spans`); (b) "`num/den` the programme
row's circulation share" does not say WHICH band's programme row — §10.2 reads the programme at the occupants' band, which
would make the shell's capacity move with its occupants. **Required change:** the area term is area2 of the union of the
extents of the wings reaching the storey (the footprint face's area2 at the ground, the kernel's union above it, §3.7);
`num/den` and `minRoomCm2` are read from the same row — the class's programme at the band set's lowest band (its `room`
form) — so the capacity is a property of the shell alone; J-A28.23's Part A entry names the row.

**V-MAB-20 · 28 (f) · minor · conflict · pipeline.** §10.2 `RoomProgramRow.circulation: number` is a float share; §2.6's
capacity reads it "as an integer fraction" `num/den` so "every host computes the same integer". **Required change:**
`circulation: { num: number; den: number } /* integers: the share of a storey given to halls and corridors — §2.6's
capacity reads it exactly */`.

**V-MAB-21 · 28 (f) · minor · new-problem · model.** The ladder's household range and the as-built count are not tied.
The rows say `modest` houses [2, capacity], `poor` [3, capacity], `squalid` [4, capacity]; the as-built plan is "the class's
programme at the plot's `builtBand` row with the template's `households.built`", which S10b fills without reference to the
ladder, and the chain clamps only at ROW steps — so an as-built plan may house fewer households than its own row allows (a
cottage built `modest` for one family). **Required change:** state "the row's household range bounds `relet` and the
chain's row steps only; the as-built count is `households.built` clamped to [1, capacity] whatever its row's range", or add
to §13.2 T28-16 "every template row's `households.built` lies inside its band's interior range".

**V-MAB-22 · 28 (f) · minor · partial · model (PLAUSIBLE).** The occupants' band is named as `ContextVector.prosperityBand`
/ `prosperity`, the vector a plot's derivation read (its digest is `DerivationRecord.ctx`); §2.5 says "an epoch never
re-derives plots by τ", and nothing in §2 says an epoch or a field edit refreshes a survivor's context-vector field
columns — so the interior could follow the band at derivation, not the occupants' band §4.11 reads after S6 re-evaluates
the drivers. **Required change (§2.5, the ContextVector's field line):** "`prosperity`, `prosperityBand`, `density`,
`greenery` are re-sampled from the current fields at every epoch and field edit, without re-deriving the plot" (or §2.6
names "the plot's current field sample, banded by `FieldBands`").

**V-MAB-23 · 19 × 31 · minor · new-problem · model.** `ClassRules.pick(ctx: ContextVector, assignment?)` must read "the
geometry columns … at the plot's manifested band", but the manifested band needs `Plot.builtBand` and `FieldBands.middle`,
neither in `ContextVector` nor in `pick`'s arguments. **Required change:** `pick(ctx, manifested: { band: string; value:
number } /* §4.11's floor rule */, assignment?)`.

**V-MAB-24 · 28 · minor · partial · model.** §2.8 says "a district's close-up, II.4" carries an elaboration record and
`ElaborationChunk` caches "a derived Composition, Plan or close-up", but `ElaborationRecord.rung: 'wings'|'rooms'|'plan'`
has no value for a close-up. **Required change:** `rung: 'closeup'|'wings'|'rooms'|'plan'` (for `closeup` the entity is
the district), or drop the close-up from both sentences.

**V-MAB-25 · 28 · minor · new-problem · model.** A stored plan's world points are not in the carry. §2.6 says "the first
plan edit stores the composition, whose rings `carryWings` carries", but J-P48's list ("each composed `Wing.footprint`, each
court, each room ring and each `ComposedTower`'s centre"), `CarriedShapes`' comment and §2.2 rule 5's exception name no
`Wall.a` / `b`, `StairCore.bay` or `Chimney.column`. **Required change:** J-P48's list and `CarriedShapes`' comment add "a
stored plan's room rings per storey, wall end points, stair-core bays and chimney columns (rule 2 (b))"; §2.2 rule 5's
exception reads "a stored composition's and plan's rings and points".

**V-MAB-26 · 28 · minor · new-problem · model.** `ProgramRoom.anchor?: 'entrance:main'|'entrance:yard'|'core'|'hearth'`
cannot anchor what step 3 anchors: "the entrance rooms (one per entrance)" — side, rear and service doors — and "a reserved
passage". **Required change:** `anchor?: { entrance: number } | 'core' | 'hearth' | 'passage'`.

**V-MAB-27 · 31 · minor · missing · model.** The route's two §2.6 pointers for item 31 are absent (no "replaceab…" and no
class-change sentence in §2). **Required change (§2.6, after the `ClassRules` line):** "How soon a band change may replace a
building's stock is its template row's `replaceability` at the plot's `builtBand` (§10.2), read by §4.11's ladder; a class
change at rung 2 (a mansion to a tenement, inn, workshop or chapel) is item 18's mutation and keeps the shell (§4.7 S11)."

**V-MAB-28 · 31 · minor · duplicate · model.** §2.5 "The built band and the geometry floor" restates §4.11's formula ("—
`min(builtBand, FieldBands.middle)` by the band order of `FieldBands.bands` —") while saying "the floor rule itself … stated
once in §4.11". **Required change:** replace the dash clause with "from `builtBand` and `FieldBands.middle` by §4.11's floor
rule".

**V-MAB-29 · 8 · minor · new-problem · model.** A trace reused as garden, orchard or field has no single owner for its face.
§2.8: "cleared: a footprint trace — the face persists …; reused: a garden, orchard or field laid over the trace"; §4.11
`reuse … as`: "a yard part of the plot over the persisting trace" — an L4 face has one `owner`, and `YardPart` (named in §2.5
and §10.2) is declared nowhere; the route's `reusedAs` is absent. **Required change (§2.8 bullet and §2.6):** the trace keeps
its face and `Building.reusedAs?: 'garden'|'orchard'|'field'` records what it became (drawn as that kind, §8.2), added to J-A8.21's index row and Part A entry; §4.11's
comment follows (V-MAB-39).

**V-MAB-30 · 29 · minor · stale · model.** The axis-locked composer keeps "the cell nearest the entrance" — singular, from
before the entrance set. **Required change:** "the cell nearest the main entrance".

**V-MAB-31 · 18 · minor · partial · model.** J-P48's "A stored composition is carried with its wings" has no pointer for a
designation mutation that adds or removes wings (the route: "stored compositions and plans mutate with the design"); the
mechanism is §4.7 S11's ("a stored composition's or plan's rings … are matched to the target template's structures by
role"). **Required change:** add "A designation mutation (item 18) re-matches a stored composition's and plan's rings to
the target template by role inside its event (§4.7 S11) and re-cuts a stored plan by the re-cut rule (below)."

**V-MAB-32 · 28 (f) · minor · new-problem · model.** `Building.occupants: Id[]` is defined nowhere in the document and now
sits beside the new `households: Id[]` and `dwelling?`. **Required change:** state what `occupants` holds (e.g. "the people
working there — the use's staff, derived; the housed are `households`") or retire it.

**V-MAB-33 · 25 · minor · new-problem · model.** `LandUse.face` is "L3 faces inside the hinterland's blocks", but §2.3 makes
reclaimed ground "an L3 land-use face marked `reclaimed`" and a shifted course's old bed "a `marsh` land-use trace", both of
which can lie inside the town (a filled foreshore at the harbour, an old bed through a quarter). **Required change:**
`LandUse.face`: "L3 faces — inside the hinterland's blocks, and wherever a reclaim or a course shift leaves land (§2.3)".

**V-MAB-34 · 28 (f), 25 · minor · conflict · rendering.** §12.7's plan row: "the ladder has five rows" — §2.6's default
ladder has six (rich, prosperous, comfortable, modest, poor, squalid) and follows the band set; §12.6 lists the conversion
`silt` (V-MAB-13). **Required change:** "the ladder has one row per band of the set (six by default, §2.6)"; §12.6
`silt` → `siltReach`.

**V-MAB-35 · 11, 25 · minor · stale · scope.** §0.2 row 11 names "`Tunnel.condition` and `closure` (§2.7 and §2.8)" — no
`condition` field exists (J-A11.21: a derived reading); row 25 names `silt`. **Required change:** row 11 "a tunnel's
condition (a reading of `existence` and `Tunnel.closure`, J-A11.21)"; row 25 `silt` → `siltReach`.

**V-MAB-36 · 8, 24, 30, 31, 19 · minor · missing · determinism.** §2.8's registry claims "every new attribute has its edit
kind or is declared derived (§7.1)"; §7.1's edit-target table has neither for `Building.condition`, `Block.due`,
`BuildingSlot.frontage`, `Reservation.rank` (§2.5 "setAttr-editable"; no reservations row) and `Institution.knownTo` (no
institutions row). **Required change:** buildings: `setAttr` gains `condition` (or "written only by §4.11's rung-1 and
renovation conversions"); blocks/plots: "`due` derived, written only by §4.11's ladder"; slots: "`frontage` derived from the
designation template, re-derived by S11's mutator"; new rows "reservations — `setAttr` (rank)" and "institutions — `setAttr`
(`knownTo`)".

**V-MAB-37 · 30, 12 · minor · missing · determinism.** §6.3's anchor table has rows for use, room and entrance but none for
`Passage` (an addressed record the registry now lists, §2.8) or `AccessPoint` (II.7.4). **Required change:** add a `passage`
row (anchor: the front plot's address and the passage's kerb-end point; its radius; class family) and an `access point`
row (anchor: its tunnel and kerb vertex, `('access_point', id)`).

**V-MAB-38 · 29, 30 · minor · conflict · determinism.** §7.4's warp paragraph follows the old carry set: it carries "wing
rings — and a stored stage-3 composition's rings and tower centres" (no basement ring, V-MAB-02) and requires a stored
composition's "rooms to lie inside" the moved face (false above a spanned passage, V-MAB-01). **Required change:** add "a
basement's ring" to the carried list, and "its rooms to lie inside it or inside a passage face the building spans".

**V-MAB-39 · 8 · minor · conflict · pipeline.** §4.11 `DeclineOp` `reuse` comment: "a yard part of the plot over the
persisting trace" (see V-MAB-29). **Required change:** "the trace drawn as that kind (`Building.reusedAs`, §2.6), or a
successor on the old foundations (`Building.predecessor`, §2.6)".

**V-MAB-40 · 25 · minor · conflict · pipeline.** §4.11 "Repair": reclaimed land is "drained by a `drainage` ditch trace
along its lowest line, its `LandUse` faces re-typed `meadow` or `arable` with `reclaimed: true`", against §2.3 ("drained to
the nearest outfall by a `ditch` water body cut like a canal") and §2.7 (`reclaimed?: { from: 'marsh'|'foreshore'; epoch:
number }`); J-A25.21 makes §2.3 the one home of each conversion's record change. **Required change:** "drained by a `ditch`
water body and its `LandUse` faces re-typed with `reclaimed` set, as §2.3 states".

**V-MAB-41 · 30 (d) · minor · broken-reference · rendering.** §8.1 (`LabelTable.knownTo`) and §9.2 read "a `sealed` plot's
reads `secret`, §4.6" — §4.6 states no such rule. **Required change:** cite §2.5 (which states it after V-MAB-06).

**V-MAB-42 · 29 (b) · minor · missing · pipeline.** The basement gate's table values have no declared row. §2.6 reads
"the cellar depth (a basement table value, default 220 cm; §7.6)", "inset by the table's `insetCm`, default 60",
`waterTableM` (40 m) and a freeboard (50 cm); §10.2's `cellar` column is `{ prob; kinds; slopeCm; rockCost }` and §7.6 names
only "the entrance and cellar rows (§2.6)". **Required change (§10.2):** `cellar` gains `depthCm: Cm /* 220 */; insetCm: Cm
/* 60 */`, and a one-row basement-gate table `{ waterTableM: M /* 40 */; freeboardCm: Cm /* 50 */; drainageAccumCells:
number }` beside it, both named in §7.6's enumeration.

## 3 Cross-part notes addressed to model — reflected?

| from | the ask | in §2 now | verdict |
|---|---|---|---|
| determinism §4 | `Rejection` in the registry; kinds for reject, lapse, place; `Identity.dossier` | §2.8 registry, `LifecycleEvent.kind`, `Identity.dossier` | reflected |
| determinism §4 | `ElaborationRecord` and cache outside BOTH digests (J-A28.62) | §2.8, §2.9 | reflected |
| determinism §4 | `builtBand` + companion, `knownTo` on plot and building, `entrances`, `basement`, `Use`, passage face | §2.5, §2.6, §2.7 | reflected |
| determinism §4 | "the access rows' `sealed` flag" | not adopted: `Passage.sealed` (J-A30.21) | the other side must follow — V-MAB-03 |
| determinism §4 | the `DerivationRecord` epoch clause rewritten | §2.5 "an epoch never re-derives plots by τ" | reflected |
| determinism §8.7 | `Room.unit`; ladder keyed by band name; ONE canonical order (rows first or households first, stated); fixed anchors; as-built plan; ONE capacity function; the canonical-chain prior; §2.8 inputs; §2.7 household → unit | §2.6 ("first the ROWS … then the HOUSEHOLDS"), §2.7, §2.8 | reflected (capacity defects V-MAB-19; the fixed "reserved passage cells" V-MAB-01) |
| kernel §4 | underground level mapping in §2.2 rule 1 | §2.2 rule 1 | reflected |
| kernel §4 | tunnel wall-thickness row; `Tunnel.kind 'passage'` kept apart from item 30's face | §2.7 `widthCm` comment ("+ the profile row's wall thickness (II.7.2, §3.7)"); `kind` comment | reflected |
| kernel §4 | composition rings ≥ `attractCm` apart except at shared joints | §2.6 stage-3 contract | reflected |
| kernel §4 | passage a face kind, not a way; "the sealed state is an attribute of the plot's record" | §2.4, §2.5 — seal on `Passage` | face kind reflected; seal home differs — V-MAB-04 on §3.10 |
| kernel §4 | plan reserves the passage as a `fixed` ring | §2.6 steps 1, 3, 4 | reflected, but incoherent with `Wing.spans` — V-MAB-01 |
| kernel §4 | 28 (f): kept rooms fixed with the guard "only when its wing ring is unchanged"; capacity from integer `area2`; staff rooms in attic, basement or service wing; shared kitchen by the stair core | §2.6 re-cut, capacity, "Staff and shared rooms" | reflected (overlap double count V-MAB-19) |
| assignments §4 / §7 | `Use`, `Building.use?`, `formerUses`, `Plot.use` unchanged; `BuildingSlot.frontage`; context vector confirmed; `pick` reads the template; Materials the single home; lifecycle kinds; registry `Use`; capacity one function; field band not `wealth` | §2.5–§2.8 | reflected (`pick`'s manifested-band input V-MAB-23) |
| emulation-hidden §8 | `Reservation.rank`, `Block.reach`, `Plot.exposure`, `knownTo`, the covered L3 passage face, `FieldBands.bands` / `middle`; §2.4 one line; `Wing.spans` with the ground-ring union; §2.3 item 25's record changes; §2.8 sealed as an access-edge flag, no new `Existence` value | §2.3–§2.8 | reflected, except the access-edge flag (not adopted; V-MAB-03) and `reclaimed` as an object where the note had a boolean (§4.11 still writes `true` — V-MAB-40) |
| evolution-islands §7 | `cleared`, `reused`; the decline-hooks mapping; `MaterialLedger`; `predecessor`; `supersededBy`; `Tunnel.closure`; `SkyIsland.supply` / `areaHa` / `state`; the staged-layers line | §2.6–§2.8 | reflected |
| prosperity §4 and re-run | `Block.due`, `builtBand` / `builtProsperity`, `geometryFloor` derived, `FieldBands.middle`, the epoch clause, the registry's migration hook; `households`, `condition`, the replaceability pointer, "a class change keeps the shell"; the plan records; the two band memories; `ElaborationRecord`; `elaborate`; `Document.elaborations`; the interior ladder, unit, re-cut, never-omit rule and capacity stated once | §2.5–§2.9 | reflected except the replaceability pointer and the class-change line — V-MAB-27 |
| sewers §4 | underground mapping; `Tunnel.headroomCm`, `navigable`, condition; `AccessPoint` listed, not re-declared; `District.kind` `underground`; `ContextVector.arena`; the cellar-never-a-room wording; `derived.features`; registry rows | §2.1–§2.9 | reflected (condition as a reading; its II.6 table missing — V-MAB-10) |
| rendering §4 | §2.9: `knowledge` `{ tier; places }`, `storey`, `depthBand`, `plotsOnly` beside `elaborate`, the role default being §11.3's | §2.9 lists only `elaborate` and a different `knowledge` | NOT reflected — V-MAB-08, V-MAB-09 |
| rendering §4 | §2.8 record; §2.6 entrance roles, `Basement`, plan records with `unit`, `Opening.entrance`, `knownTo`, `exposure` with `sealed`; §2.7 island, tunnel, enceinte fields; `BuildingSlot.frontage` | §2.5–§2.8 | reflected |
| scope §4 | §2.6 states the interior ladder, unit, capacity, never-omit rule; `SewerExistenceRow` stays II.7.4's; the registry carries each new record with its lineage unit and migration hook | §2.6, §2.8 | reflected; lineage units and anchors are given for `Use` and `Room` only — the rest are §6.3's, which lacks `Passage` and `AccessPoint` rows (V-MAB-37) |

The model seat's own notes to other parts, checked from the other side: II.7.4's `('access_point', id)` — NOT applied
(V-MAB-11); II.6's condition table — NOT added (V-MAB-10); §10.2's `cellar` columns `depthCm` / `insetCm` — NOT added:
§10.2's `cellar` is `{ prob; kinds; slopeCm; rockCost }`, §2.6 cites the depth as "a basement table value … §7.6" and the
inset as "the table's `insetCm`", and §7.6 lists only "the entrance and cellar rows (§2.6)" — so the gate's four values
(depth, inset, `waterTableM`, the freeboard) have no declared row anywhere (V-MAB-42).

## 4 Sweeps over §2

* **SINGLE-SOURCE.** Each routed mechanism has one statement in §2: the plan rung, the interior ladder, the capacity, the
  entrance rules and the basement decision in §2.6; the material rule in §2.6's "Materials" (§4.7 l. 4382 and §8.2 l. 7419
  point to it); the decline mapping in §2.8; the conversions' record changes in §2.3. Duplicates found: the floor formula
  restated in §2.5 (V-MAB-28); `Basement.floors` beside `Heights.floorsBelow` (V-MAB-18); outside §2, §4.6's copy of the
  `knownTo` default (V-MAB-07) and §4.11's copy of the reclaim record changes (V-MAB-40).
* **STALE.** Probed in §2: `entrance: VertexRef`, the three-value `Composition.lod`, the band-keyed `MaterialRow` default,
  "a field brush or an epoch compares", `use: Id /* roster building type */`, "never change" / immutable terrain, one
  central market, lots drawn as buildings, a single wealth switch, size fixed by tier, the map writing the dossier, a
  licence default — all gone or absent (§2.3 now says "the slowest layer, not an immutable one"; §2.9 "the module never
  writes the dossier"; item 21's 2026-09-27 ruling keeps the proprietary default, and §2 names no licence). One leftover:
  "the cell nearest the entrance" (V-MAB-30).
* **DEFERRAL-WORDING.** None. The one "later" of the item text — "adding the rung later is a registration" — is the owner's
  roadmap staging of the plan rung with its hooks present (rule 4), not a deferral.
* **BROKEN-REFERENCE.** `refs.py`: 0 inside §2 (the 2 external citations only). Semantic: "II.6's condition table" (V-MAB-10),
  "the drainage-line threshold (§2.3)" (V-MAB-15), §8.4 / §8.5's "(§2.9)" for `depthBand`, `storey`, `plotsOnly` (V-MAB-09),
  and, outside §2, II.7.4's "§2.7's registry" (V-MAB-11) and rendering's "§4.6" for the sealed default (V-MAB-41).
* **NEW-PROBLEM.** The passage inside versus outside the ground storey (V-MAB-01) and the uncarried basement ring (V-MAB-02)
  are the two that would be built wrong; the rest are schema gaps and definitions (V-MAB-14, 16, 17, 19, 21, 23, 25, 26,
  29, 32, 33).

## 5 CONFIRMED versus PLAUSIBLE

**CONFIRMED (read on disk, 2026-09-27; the installed document `87d89692…`).** Every quotation above was read at its line;
the item verdicts; the absence of "replaceab…", of a class-change line, of a `YardPart` declaration, of a drainage-line
threshold and of II.6's condition table (greps over the whole document); the §7.4 row, J-A30.71's index row and Part A
entry, §3.10's and §4.11's seal sentences; §8.1 / §9.2's sealed-reads-secret and §2.5's default; §2.9 versus §11.3 on
`knowledge`; §8.4 / §8.5 citing §2.9 for keys §2.9 lacks; II.7.4's `('access', id)`; the two `'silt'` discriminants and
§7.1's `siltReach`; §10.2's `circulation: number` and `cellar` columns; §12.7's "five rows"; the 21 model J-A rows present
once in the index and once in Part A; `refs.py` 2 broken, both external.

**PLAUSIBLE (reasoning).** That a fixed passage ring outside the ground storey's seed breaks §3.10's seed-tiling row
(V-MAB-01) and that the chosen repair (the passage face as a reserved ground-storey room) is the smaller one, since the
kernel, pipeline and determinism texts already assume it; that the context vector's field columns are not refreshed at an
epoch (V-MAB-22 — nothing in the document says either way); the capacity's double count needing overlapping wings in
practice (V-MAB-19); every "Required change" wording, which is this seat's proposal for the repairers.

STATUS: COMPLETE (2026-09-27).
