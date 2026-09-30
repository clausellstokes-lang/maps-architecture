# verify-model-r1 — lane amendments-b/verify-model-r1 (verify the MODEL part, §2, after repair round 1)

> PENDING FABLE REVIEW — Opus-produced (amendments-b/verify-model-r1).

> PROGRESS (kill-safe ledger; one line per item — planned | done):
> INPUTS: verify-model-r0, repair-model-r1 report + blocks, assemble-r1, the other five repair reports' notes to model, §2 whole (installed 365e19f2…) | done
> ITEM 28 / 28 (f) / 29 (home): re-verdicts | done (§1)
> REFERENCING 8,10,11,12,16,17,18,19,20,22,24,25,27,30,31: re-verdicts | done (§1)
> V-MAB-01 … V-MAB-42 re-check (fixed / not fixed / regressed) | done (§2)
> CROSS-PART notes to model from repair r1 reports | done (§3)
> Issues V-MAB1-01 … V-MAB1-16 | done (§4)
> SWEEPS single-source / stale / deferral / broken-reference / new-problem over repaired §2 | done (§5); CONFIRMED/PLAUSIBLE (§6) | done

Read whole: my earlier report `verify-model-r0.md`; `repair-model-r1-report.md` and its block file's changes as installed;
`assemble-r1.md`; the cross-part sections of the five sibling repair reports (determinism "Cross-part dependencies",
kernel block-file preamble (3), pipeline §3, rendering "Cross-part notes", scope §3 and block-file preamble (4)); §2 of
the installed `docs/ARCHITECTURE.md` whole (l. 363–2032, sha256 `365e19f2…`, unchanged since assemble-r1's install);
and the subsections that cite the repaired facts at the cited lines (§3.4 transient arena and re-cut, §3.10 seed-tiling
row and nesting paragraph, §4.1 stage graph, §4.5 bands and hysteresis, §4.6 reach, §4.7 S10b and "Households per
building", §4.11 rung 1, `DeclineOp`, `TerrainWaterOp`, Repair, HiddenOp, §5.3 plan and ladder rows, §6.3 anchor rows,
§7.1 edit-target table, §7.4 persisted-state rows and warp paragraph, §7.5 schema transforms, §8.1, §8.4, §8.5 span mark
and view keys, §9.2, §10.2 `DesignationTemplateRow` / `RoomProgramRow` / `RoomRuleRow` / `BasementGateRow`, §13.2
T28-4, T28-13 – T28-19, II.4, II.6 condition table, II.7.4, the model J rows and their Part A entries). `refs.py` on the
installed document: 139 headings, 35 D ids, 459 J ids, 2 broken — the two pre-existing external citations
(`os-geometry.md` §2.1.4, RFC 7946 §3.1.6), none inside §2.

## 1 Item verdicts after repair round 1

| item | r0 | r1 verdict | where and what (quoted or named exactly) | open issues |
|---|---|---|---|---|
| 28 (home) | PRESENT, with defects | PRESENT, with defects | §2.6 `Composition.lod` four rungs; `Room`, `Plan`, `Storey`, `ProgramRoom` (`anchor?: { entrance: number } \| 'core' \| 'hearth' \| 'passage'`), `Wall`, `Opening` (`entrance?: number`, "the passage room's two arch openings are of kind passage and name no entrance"), `StairCore`, `Chimney`; the plan rung steps 1–7 on extents ("its seed rings the extents of the wings that reach the storey, clipped to tile … and at the ground storey each span ring"); the stage-3 contract's fourth rung on extents; J-P48 carrying "each `Wall`'s end points, each `StairCore.bay`, each `Chimney.column`" and "A designation mutation (item 18) re-matches a stored composition's and plan's rings"; §2.8 `ElaborationRecord.rung: 'closeup'\|'wings'\|'rooms'\|'plan'`; §2.9 `storey`, `depthBand`, `plotsOnly`, `elaborate` | V-MAB1-01, 09, 12, 13 |
| 28 (f) (home) | PRESENT, with defects | PRESENT, with defects | §2.6 `InteriorLadderRow` ("the interiorLadder table of roomProgram.json"); the occupants' band "the plot's current prosperity field value and its band … follows the field after it without re-deriving the plot"; "One capacity function (J-A28.23, J-A28.28)" over "the union of the extents of the wings that reach storey s", `num/den` and `minRoomCm2` "both read from one row — the class's programme at the band set's first, poorest band"; the as-built count "`households.built` clamped into [1, capacity], whatever that row's household range"; `ClassRules.pick(ctx, bands: { field; manifested }, assignment?)`; "no occupants list (J-A28.29)" | V-MAB1-03, 05, 06, 08, 09 (and V-MAB1-04, 10, 11 on other parts) |
| 29 (home) | PRESENT, with defects | PRESENT, one follow-up elsewhere | §2.6 `CarriedShapes.basement`, rule 2 (b) "The basement ring's points … are carried the same way, in the same call (J-A29.23)", rule 4's basement check with its failure path; rule 3 "each entrance's `side` and `offsetCm` are re-read from its vertex"; `Building.nextEntrance`; `Entrance.faces` with `'passage'`; `Heights.floorsBelow` "derived, never set on its own"; the gate "no cellar … where even a half-cellar's floor … would lie below the water table"; `cellar.depthCm`, `cellar.insetCm` and "§10.2's basement-gate row" (`BasementGateRow`, l. 8817); §2.3 "reads `ContextVector.terrainClass` (§2.5) and these facts" | V-MAB1-15 (determinism) |
| 8 | PRESENT, one defect | PRESENT | §2.6 `reusedAs?: 'garden'\|'orchard'\|'field'` "the trace keeps its L4 face and is drawn as that kind"; §2.8 "reused (`reused`: the trace keeps its face … `Building.reusedAs`, §2.6 …; J-A8.22)"; §4.11 `DeclineOp` reuse comment follows (l. 5308) | — |
| 10 | PRESENT | PRESENT | §2.7 `SkyIsland.supply`, `areaHa`, `state` (unchanged) | — |
| 11 | PRESENT in §2; home missing | PRESENT | §2.7 `Tunnel.closure` and the condition "reading … through II.6's condition table"; II.6 now carries "**The condition table**" (l. 11731) | — |
| 12 | PRESENT | PRESENT | §2.1, §2.2 rule 1 levels; `access_point` vertex role; II.7.4 `('access_point', id)` (l. 12005); §6.3 access-point row (l. 6019) | — |
| 16 | PRESENT | PRESENT | §2.5 context vector unchanged; `ClassRules.pick` "the class row and its designation template" | — |
| 17 | PRESENT | PRESENT | §2.7 `Use`; §2.6 `use?`, `formerUses` | — |
| 18 | PRESENT, one pointer missing | PRESENT | J-P48 "A designation mutation (item 18) re-matches a stored composition's and plan's rings to the target template by role inside its event (§4.7 S11) and re-cuts a stored plan by the re-cut rule" | — |
| 19 | PRESENT | PRESENT | §2.6 "Materials" unchanged; `pick`'s `manifested` input "the geometry columns" (J-A19.43) | — |
| 20 | PRESENT | PRESENT | §2.8 `Identity.dossier` "carried by the entity the element is — its Use (§2.7) or the assignment's placed member (§7.7) … a building … never carries it" (VD-36) | — |
| 22 | PRESENT | PRESENT | §2.9 one source of truth (unchanged) | — |
| 24 | PRESENT | PRESENT | §2.5 `Reservation.rank`; §7.1 now has "reservations (§2.5) \| `setAttr` on a market's `rank`" | — |
| 25 | PRESENT, conflicts | PRESENT | §2.3 "`siltReach` on a reach or basin"; §2.7 `LandUse.face` "and wherever a reclaim or a course shift leaves land, in the town too (§2.3)"; §4.11 `TerrainWaterOp { op: 'siltReach' }` and "Repair … drained by a ditch water body and its `LandUse` faces re-typed with `reclaimed` set, as §2.3 states" | — |
| 27 | PRESENT | PRESENT | §2.5 `FieldBands.bands`, `middle` (unchanged) | — |
| 30 | PARTIAL | PRESENT, with defects | §2.5 `knownTo` "(hidden → local, sealed → secret — item 30 (e)'s lost place, J-A30.24 — else public)"; `Passage.sealed` the one stored bit, followed by §3.10 (l. 3124), §4.11 (l. 5350), §7.4 (l. 6836) and J-A30.71; §4.6 "takes §2.5's default" (l. 4252); §2.6 `Wing.spans` span ring, the passage room (J-A30.23); §2.9 `knowledge: { tier; places }` "its default by role and who may set it are §11.3's"; §6.3 passage row (l. 6018) | V-MAB1-01, 02, 12 |
| 31 | PARTIAL | PRESENT | §2.6 "Replaceability and class change (item 31)" comment after `ClassRules`; §2.5 "from `builtBand` and `FieldBands.middle` by §4.11's floor rule"; §7.1 declares `due`, `nextEntrance`, `reusedAs`, `frontage` derived and `condition` `setAttr`-editable (J-A31.76) | — |

## 2 The r0 issues re-checked (verify-model-r0 V-MAB-01 … V-MAB-42, and the other seats' model-owned issues)

Every one of the 42 is fixed as the repair claimed, read at the installed text. The repair did not regress any of them;
the new defects it introduced or left are §4's.

| r0 issue | owner | r1 | evidence (installed text) |
|---|---|---|---|
| V-MAB-01 passage inside vs outside the ground storey | model | FIXED | `Wing.spans`: "Its span ring … is derived at read … at the ground storey the plan rung adds the span ring as a seed ring and passes it as a fixed ring — the passage room"; the fourth rung and step 6 on extents; J-P48 (4) "inside the union of the face and the span rings"; entrance rule 5 and `Opening.entrance` (arches are not entrances); J-A30.23 index and Part A |
| V-MAB-02 basement ring not carried | model | FIXED | `CarriedShapes.basement`; rule 2 (b); rule 4's basement check and failure path; §2.2 rule 5 "a basement ring's point … is carried with its building by that rule's mean-value coordinates" |
| V-MAB-03 seal's two homes | determinism | FIXED | §7.4 row (l. 6836) "the passage face and its `Passage.sealed` bit (§2.5; an access row on a sealed passage face reads sealed)"; J-A30.71 "a sealed passage is `Passage.sealed`, §2.5's one stored fact (J-A30.21)" |
| V-MAB-04 §3.10 seal | kernel | FIXED | l. 3124 "seal is `Passage.sealed`, the one bit of the passage's record (§2.5)" |
| V-MAB-05 §4.11 sealPassage | pipeline | FIXED | l. 5350 "`sealPassage` sets" `Passage.sealed` |
| V-MAB-06 sealed default | model | FIXED | §2.5 `knownTo` "sealed → secret … J-A30.24" |
| V-MAB-07 §4.6 default copy | pipeline | FIXED | l. 4252 "takes §2.5's default" |
| V-MAB-08 `knowledge` shape | model | FIXED | §2.9 "`knowledge` (item 30: `{ tier: 'public'\|'local'\|'secret'; places: Id[] }` … its default by role and who may set it are §11.3's, J-A30.82" |
| V-MAB-09 missing view keys | model | FIXED | §2.9 `storey`, `depthBand`, `plotsOnly` (but see V-MAB1-14 on `depthBand`'s default) |
| V-MAB-10 II.6 condition table | pipeline | FIXED | II.6 "**The condition table** — the one statement of a tunnel's condition" (l. 11731) |
| V-MAB-11 II.7.4 role name | pipeline | FIXED | l. 12005 `at: VertexRef /* ('access_point', id) on the tunnel's kerb, §2.2 rule 7 */` |
| V-MAB-12 `silt` in §2.3 | model | FIXED | §2.3 "`siltReach` on a reach or basin" |
| V-MAB-13 two `'silt'` discriminants | pipeline | FIXED | `TerrainWaterOp { op: 'siltReach' … }` (l. 5325); `silt` now only the tunnel ladder's |
| V-MAB-14 unreachable half-cellar | model | FIXED | "no cellar … where even a half-cellar's floor … would lie below the water table; a half-cellar where the full cellar's floor … would lie below it and the half-cellar's would not" |
| V-MAB-15 undefined drainage threshold | model | FIXED | `drainageAccumCells` in `BasementGateRow` (l. 8819); §2.3's closing sentence names `ContextVector.terrainClass` (§2.5) |
| V-MAB-16 `faces` lacks passage | model | FIXED | `faces: …\|'passage'` |
| V-MAB-17 stale side / offset; shifting index | model | FIXED | rule 3 re-read; `Building.nextEntrance`; "`i` a stable ordinal … never re-used after a removal" |
| V-MAB-18 floors stored twice | model | FIXED | `Heights.floorsBelow` "derived, never set on its own" |
| V-MAB-19 capacity double count; which row | model | FIXED | "the union of the extents … the kernel's boolean union … where it fails, so overlapping wings count once"; "the class's programme at the band set's first, poorest band" |
| V-MAB-20 `circulation` a float | pipeline | FIXED | §10.2 `circulation: { num: number; den: number }` (l. 8811) |
| V-MAB-21 as-built count vs row range | model | FIXED | "`households.built` clamped into [1, capacity], whatever that row's household range (the ranges bound `relet` and the chain's row steps only; J-A28.28)" |
| V-MAB-22 occupants' band frozen at derivation | model | FIXED as asked (a defect remains in the new text: V-MAB1-05) | §2.6 the occupants' band "follows the field after it without re-deriving the plot"; §2.5 `ContextVector` comment points to it |
| V-MAB-23 `pick` lacks the manifested band | model | FIXED | `pick(ctx, bands: { field; manifested }, assignment?)` |
| V-MAB-24 close-up rung | model | FIXED | `rung: 'closeup'\|'wings'\|'rooms'\|'plan'`; "for closeup the district" |
| V-MAB-25 stored plan points not carried | model | FIXED (a consequence is V-MAB1-09) | J-P48 list and `CarriedShapes` comment; §2.2 rule 5 |
| V-MAB-26 `anchor` too narrow | model | FIXED | `anchor?: { entrance: number } \| 'core' \| 'hearth' \| 'passage'` |
| V-MAB-27 replaceability and class change | model | FIXED | the comment after `ClassRules` |
| V-MAB-28 floor formula restated | model | FIXED | §2.5 "by §4.11's floor rule" |
| V-MAB-29 reused trace's owner | model | FIXED | `Building.reusedAs`; J-A8.22 |
| V-MAB-30 "the entrance" | model | FIXED | "the cell nearest the main entrance" |
| V-MAB-31 mutation pointer | model | FIXED | J-P48's item-18 sentence |
| V-MAB-32 `occupants` undefined | model | FIXED (retired; its migration is V-MAB1-15) | "no occupants list (J-A28.29)" |
| V-MAB-33 `LandUse.face` | model | FIXED | "and wherever a reclaim or a course shift leaves land, in the town too (§2.3)" |
| V-MAB-34 "five rows"; §12.6 `silt` | rendering | FIXED | no "five rows" in the document; §12.6 `siltReach` (l. 9560) |
| V-MAB-35 §0.2 rows 11, 25 | scope | FIXED | no `Tunnel.condition`; row 25 `siltReach` (l. 156) |
| V-MAB-36 edit kinds for new attributes | determinism | FIXED | §7.1: buildings `setAttr` … `condition`; "reservations (§2.5)" row; "institutions (§2.7) \| `setAttr` (`knownTo`, name)"; J-A31.76 declares `due`, `nextEntrance`, `reusedAs`, `frontage` derived |
| V-MAB-37 §6.3 anchors | determinism | FIXED | l. 6018 passage row; l. 6019 access-point row |
| V-MAB-38 §7.4 warp paragraph | determinism | FIXED | l. 6946–6952 "the building's basement ring", "its plan's points (rooms, wall ends, bays and columns)", "its rooms to lie inside the moved face united with the span rings" |
| V-MAB-39 §4.11 reuse comment | pipeline | FIXED | l. 5308 "the trace drawn as that kind (Building.reusedAs, §2.6), or a successor on the old foundations" |
| V-MAB-40 §4.11 Repair | pipeline | FIXED | §4.11 "Repair" (l. 5329–5331) "drained by a ditch water body … `reclaimed` set, as §2.3 states" |
| V-MAB-41 "§4.6" for sealed → secret | rendering | FIXED | §8.1 `knownTo` column "as §9.2's knowledge filter fills and reads it"; no sealed-default restatement outside §2.5 |
| V-MAB-42 gate values without a row | pipeline | FIXED | §10.2 `cellar.depthCm`, `cellar.insetCm` (l. 8740); `BasementGateRow` (l. 8817); `RosterTables.basementGate`; §14 names it (l. 10727) |

The other seats' r0 issues owned by model, answered by the same repair: **VK-04** (the passage reservation) FIXED with
V-MAB-01; **VK-21** FIXED ("clipped to tile" in step 4; "The plan's seed rings — base or composed, clipped to tile … stand
at least `attractCm` apart"); **VP-36** FIXED (§2.3 `siltReach`; `cellar.depthCm` / `insetCm`; §2.5 "S11's designation
templates" and "the designation templates' arrangement"); **VS-18** FIXED (`InteriorLadderRow`, `interiorLadder`); **VS-19**
FIXED as asked, but the pointer is now one bar short (V-MAB1-13); **VD-36** FIXED; **VR-02** and **VR-33** FIXED with
V-MAB-08 and V-MAB-09.

## 3 Cross-part notes addressed to model after repair round 1 — reflected?

| from | the note | in §2 now | verdict |
|---|---|---|---|
| kernel, block-file preamble (3) | plan step 4 passes wing rings clipped to tile and, at the ground storey, a spanned passage's ring | step 4 "its seed rings the extents … clipped to tile … and at the ground storey each span ring" | reflected |
| kernel (3) | "the kept-room rule reads the wing's *seed* ring (clipped) — otherwise a room kept in a wing whose clipped seed changed because an earlier wing changed is refused (`E_DEGENERATE`, `overlap`)" | the re-cut still reads "a room whose wing ring is unchanged"; §3.4 paraphrases it ("a room is kept only in a wing whose ring is unchanged (§2.6's kept-room rule)") | NOT reflected — V-MAB1-06, V-MAB1-07 |
| kernel (3) | the composition contract's `attractCm` clause should cover base rings too | "The plan's seed rings — base or composed, clipped to tile … stand at least `attractCm` apart" | reflected |
| rendering, "Cross-part notes" | "§2.6 defines the cut on the wing ring only; stating the footprint case beside `Passage.frontBuilding` would make the base case explicit there" (§8.5 (2) draws the span mark before any composition exists) | `spans` is a field of the composed `Wing` only; `BaseWing` has none; `Passage.frontBuilding` still cites "Wing.spans, §2.6" | NOT reflected — V-MAB1-01 (major: the capacity and the leaf digest read it too) |
| rendering hand-offs | §2.9 "every export" → "every picture and interchange export"; `Room.lit` gains §11.1 | both in the installed text | reflected (by the assembler's substitutions) |
| scope, block-file preamble (4) | "model §2.6's Bars pointer should read T28-13 – T28-18" | "**Bars:** §13.2's T28-13 – T28-17." (l. 1488); T28-18 is the `relet` and `setRoomUnit` F-EDIT bar, both §2.6 rules | NOT reflected — V-MAB1-13 (assemble-r1 §8 (1) left it to this round) |
| scope (4) | the model repair's J rows carry 7 C3 runs left unreviewed | the assembler reviewed them (57 rows); the checks exit 0 | resolved outside §2 |
| pipeline §3 | "§2.3 already reads `siltReach`, §2.6 cites `cellar.depthCm` / `insetCm` and the basement-gate row, and §2.5's `builtBand` comment points to J-A31.44's list … §4.11 now cites `Building.reusedAs`" | as stated | reflected |
| determinism "Cross-part dependencies" | no note to model | — | — |

The model repair's own follow-ups to other parts, checked from the other side: determinism §7.4 warp paragraph (V-MAB-38)
— applied, with the containment it asked for ("inside the moved face united with the span rings"); §5.3's stored-plan
tiling row — applied (l. 5540, "at the ground storey with the span ring"); §7.1 `reusedAs` and `nextEntrance` declared
derived — applied (J-A31.76); kernel §3.4 / §3.10 seeds clipped to tile and a fixed ring coinciding with its seed —
applied in §3.4 (l. 2563, 2582–2586), but §3.10's seed-tiling row still names "the wings … clipped to tile" rather than
their extents (V-MAB1-07); pipeline §10.2 `circulation`, `cellar`, `BasementGateRow` and §4.11 `reusedAs` / `siltReach`
— applied; rendering §2.5 citation for sealed → secret — applied; scope T28-4 qualifier (l. 10177–10179) and §14
`InteriorLadderRow` / `interiorLadder` (l. 10726) — applied.

## 4 Issues found in this round (id · item · severity · kind · owner — claim — required change)

Numbered V-MAB1-nn. Each was read at the installed text; "PLAUSIBLE" marks a claim that rests on reasoning about
behaviour rather than on the text alone.

**V-MAB1-01 · 30 × 28 (f) · major · missing · model.** `spans` is declared on the composed `Wing` only (§2.6 l. 983);
`BaseWing` (l. 944–956) has no such field. But S11, which writes `BaseWing`s, is where §4.6 says the front building gets
"a wing that **spans** the passage at every storey above the ground (`Wing.spans`, §2.6 …)" (l. 4221–4222), and three
base-time readers need it: the capacity function at generation ("the union of the extents of the wings that reach storey
`s` … above the ground, its ring ∪ the span ring of the passage it spans (`Wing.spans`)"), the building's leaf digest in
`ElaborationRecord.inputs` ("… sub-locations, Wing.spans"), and §8.5 (2)'s span mark, which rendering had to define
"before any composition exists, the same cut made by the footprint ring" (rendering's cross-part note). With no base
field, the capacity S10b / S11 read at generation omits the span ring above the ground while the plan, cut on a
composition, includes it — the "one capacity function" gives two integers — and no base record says which wing spans the
passage (a stepped front building has several quads). **Required change (§2.6, §2.5, §2.8):** (i) `BaseWing` gains
`spans?: FaceRef /* item 30: the Passage face (§2.5) this wing spans — written by S11 when it builds a passage's front
building (§4.6, §4.7 S10 (9)); its span ring and extent as Wing.spans below */`; (ii) `Wing.spans`' comment opens "item
30: the Passage face (§2.5) the wing spans — a composed wing takes it from the base wing it covers (`BaseWing.spans`)";
(iii) every other `Wing.spans` citation in §2.6 — `Room.ring` (l. 985), the stage-3 contract (l. 1250), the fourth rung
(l. 1255) and plan step 1 (l. 1340, 1344) — reads "`spans` (on the base or the composed wing)"; (iv) `ElaborationRecord.inputs`: "Wing.spans" → "the wings' `spans`"; (v)
§2.5 `Passage.frontBuilding`: "(Wing.spans, §2.6)" → "(`BaseWing.spans`, §2.6)"; (vi) J-A30.23's index row and Part A
entry add "`spans` on the base wing, which S11 writes and a composition inherits". Follow-ups: §4.6 (V-MAB1-02); §7.1's
buildings row lists `spans` among the derived attributes (written only by S11 and `drawPassage`) — determinism, with
J-A31.76's list.

**V-MAB1-02 · 30 · minor · conflict · pipeline.** §4.6's `passage` bullet names the composed wing's field as what S11
writes: "S11 gives its building a wing that **spans** the passage at every storey above the ground (`Wing.spans`, §2.6".
**Required change:** "(`Wing.spans`, §2.6:" → "(`BaseWing.spans`, §2.6, which a composition inherits:" (with V-MAB1-01).

**V-MAB1-03 · 28 (f) · minor · new-problem · model.** §2.6 names S10b as the generation-time reader of the capacity, but
S10b runs before S11 creates the building and its wings (§4.1 l. 3157 "S10b Placement ─► S11 Site plans + footprints";
§4.7 S10b: "households take residential plots of their band ± drift"), and the capacity's area term is the area of the
wings' extents. Three places say it: the capacity bullet "S10b's fill at generation (`households.built`, §4.7), §4.11's
`relet` and F-PLAN (§5.2) read this one function"; `Building.households` "kept by the writer that sets it — S10b's fill at
generation to the template row's households.built (§4.7)"; J-A28.23's index row "one integer capacity function stated in
§2.6 that S10b, `relet` and F-PLAN all read". **Required change:** capacity bullet: "S10b's fill at generation
(`households.built`, §4.7)" → "the generation fill (§4.7: S10b places the households on the plot; S11, which creates
the building and its wings, writes `Building.households` clamped into [1, capacity])"; `Building.households`: "S10b's
fill at generation to the template row's households.built (§4.7)" → "the generation fill — S10b's placement, written by
S11 once the wings exist, clamped into [1, capacity] (§4.7)"; J-A28.23's index row: "that S10b, `relet` and F-PLAN all
read" → "that the generation fill (S10b's placement, S11's write), `relet` and F-PLAN all read". §4.7 follows (V-MAB1-04).

**V-MAB1-04 · 28 (f) · major · new-problem · pipeline.** §4.7 "Households per building (item 28 (f))": "S10b fills a
residential building at generation to its template row's `households.built` and never beyond §2.6's capacity". At S10b
no building record and no wing exists (S11 makes them), so the capacity cannot be read there, and nothing says what
becomes of a household a shell smaller than its row's assumption cannot hold. **Required change (that paragraph):**
"S10b places a residential plot's households — per residential slot at most its template row's `households.built`, by
band ± drift. S11, which creates each building and its wings, writes `Building.households` from its slot's households in
address order, clamped into [1, capacity] (§2.6's one capacity function, read on the wings it has just made); a household
the clamp leaves moves by §10.3's relocation to the nearest residential building of its band in the district with room
below its capacity, in address order, inside the district's S11 batch, and is reported — so the solver and the plan agree
on how many households a shell holds; the plan rung records the count among its inputs (§4.1)." (The relocation target
order is this seat's proposal; PLAUSIBLE.)

**V-MAB1-05 · 28 (f) · minor · new-problem · model (PLAUSIBLE).** The occupants' band's hysteresis memory does not move
with the band. §2.6 bands the value "by §4.5's rule (`DerivationRecord.band` kept until the value crosses a cut by more
than the hysteresis)"; §2.8: `DerivationRecord.band` is "rewritten by every derivation that changes the leaf"; §2.5: "an
epoch never re-derives plots by τ". After an epoch moves a plot's value 2h below a cut c (occupants' band now the poorer
one), the memory still holds the richer band, so a rise back to c − h/2 returns the richer band although the value never
re-crossed c, and a value oscillating about c − h flips the band — re-cutting a stored plan inside each epoch (J-A28.72)
— although §4.5's rule ("A block keeps its recorded band unless its value crosses a cut point by more than the
hysteresis") presumes a memory that follows the band. **Required change (§2.5, §2.6, §2.8):** add to `Plot` `fieldBand:
string /* item 28 (f): the occupants' band — the plot's prosperity band by §4.5's rule, its hysteresis read against this
column; written at derivation (= ctx.prosperityBand), re-banded after S6 at every epoch (§4.11) and by an authorial
field edit's re-derivation (§7.2); derived state in the model digest and the snapshot, never a bare setAttr */`; the
interior-ladder parenthetical becomes "(the plot's `fieldBand`, §2.5, kept until the value crosses a cut by more than
the hysteresis)"; `pick`'s `field.band` and `ElaborationRecord.inputs`' occupants' band read it; J-A28.29's index row and
Part A entry name it. Determinism follows: §7.1 declares it derived (J-A31.76's list) and §7.5's transform fills it from
`DerivationRecord.band`.

**V-MAB1-06 · 28 (f) · minor · conflict · model.** The kept-room rule reads the wing ring, while the arena reads the
clipped seed (the kernel seat's note, not applied). §2.6's re-cut: "LEAST DISRUPTION: a room whose wing ring is unchanged
and whose ring fits a role … keeps its ring and address … a shell mutation by item 18 keeps nothing in the wing that
changed"; step 4 passes the seeds "clipped to tile (where wings overlap, rule 4 (iii), each extent less the union of the
extents before it in wing order …)", and §3.4 refuses a fixed ring outside its seed (`E_DEGENERATE`, `overlap`). After an
item-18 mutation changes an earlier overlapping wing, a later wing's ring is unchanged but its clipped seed is not, so a
kept room in the part the earlier wing now takes is refused and F-PLAN's tier 1 takes the storey. **Required change:** "a
room whose wing ring is unchanged" → "a room whose seed ring — its wing's extent at that storey, clipped to tile as step 4
passes it — is unchanged"; "keeps nothing in the wing that changed" → "keeps nothing in a wing whose clipped seed
changed". §3.4 follows (V-MAB1-07).

**V-MAB1-07 · 28 (f), 30 · minor · conflict · kernel.** Two kernel sentences restate §2.6 in the pre-repair terms. §3.4's
re-cut paragraph: "a room is kept only in a wing whose ring is unchanged (§2.6's kept-room rule)"; §3.10's seed-tiling
row: "the seed rings §2.6 passes — the wings that stand at its level, clipped to tile, plus a spanned passage's ring on
the ground storey". **Required change:** §3.4: → "a room is kept only where its seed ring — its wing's extent clipped to
tile — is unchanged (§2.6's kept-room rule)"; §3.10: → "the seed rings §2.6 passes — the extents of the wings that stand at
its level (above the ground a spanning wing's ring ∪ its span ring), clipped to tile, plus each span ring on the ground
storey".

**V-MAB1-08 · 28 (f) · minor · conflict · model.** The re-cut's FIXED list passes seeds as fixed rings: "FIXED: the wing
rings per storey, the stair core's bay, every entrance and its door, the hearths and chimney stacks, the passage room (the
span ring at the ground storey) and the basement ring — passed as `fixed` rings to the transient arena (§3.4; J-A28.33)".
The wing extents and the basement ring are the arena's seed rings (step 4, step 6 "a basement's outline is
`Basement.ring`"); passed as a `fixed` ring the basement storey would be one uncut face; §3.4's re-cut passes "the anchors
that never move (the stair core's bay, the hearths' chimney stacks, a passage) as `fixed` rings". **Required change:** →
"FIXED: the wing extents per storey and the basement ring — the arena's seed rings, unchanged; the stair core's bay, the
chimney stacks and the passage room (the span ring at the ground storey) — its `fixed` rings; every entrance and its door
and the hearths — anchors placed before any cut (§3.4; J-A28.33)".

**V-MAB1-09 · 28 (f) × 28 · minor · conflict · model.** A stored plan's re-cut changes the shell's rings, against the
byte-identity bars. J-P48 (1), widened by the repair to "every storey's" room rings and "each `Wall`'s end points":
"every point of those rings, wall ends, bays and columns … that lies on the footprint face's boundary becomes a vertex of
the footprint rings … The base wings gain each such vertex by rule 2 (a)". A STORED plan is "re-cut inside the event that
changes its inputs" (J-A28.72), which stores the new plan, so a new partition wall ending on an exterior wall adds a
footprint vertex and a base-wing vertex (and one on a row neighbour's footprint across a party wall). §5.3's
interior-ladder row: "a re-cut along the ladder changes no wing ring … — the shell's leaf digest (wings, heights,
entrances, roof, basement) is byte-identical across it"; T28-14 "checked by the shell's leaf digest before and after the
re-cut". §7.3 item 7 (ii) already compares such rings "after removing the vertices that rule inserted". **Required change
(§2.6, the re-cut bullet, after the LEAST DISRUPTION sentences):** add "A STORED plan's re-cut establishes J-P48 (1) for
its new walls in the same event — a same-level split that moves nothing — so the shell's identity across a re-cut is read
on its rings with the `composition`-role vertices removed, as §7.3 item 7 (ii) reads them (§5.3, T28-14)." §5.3 and T28-14
follow (V-MAB1-10, V-MAB1-11).

**V-MAB1-10 · 28 (f) · minor · conflict · determinism.** §5.3's interior-ladder row (l. 5541): "— the shell's leaf digest
(wings, heights, entrances, roof, basement) is byte-identical across it". **Required change:** → "— the shell's leaf digest
(wings, heights, entrances, roof, basement), its rings read with the `composition`-role vertices a stored plan's re-cut
adds removed (§2.6, J-P48 (1)), is byte-identical across it".

**V-MAB1-11 · 28 (f) · minor · conflict · scope.** §13.2 T28-14 (l. 10197–10198): "checked by the shell's leaf digest before
and after the re-cut". **Required change:** → "checked by the shell's leaf digest before and after the re-cut, a stored
plan's rings read with the `composition`-role vertices its re-cut adds removed (§2.6)".

**V-MAB1-12 · 30 × 28 · minor · new-problem · model (PLAUSIBLE).** The carry is not triggered when only the spanned passage
face moves. The span ring is "derived at read" from the `Passage` face (L3) and the wing's ring; a stored plan holds the
passage room and the rooms above it as world points, carried by J-P48 (2) "in the rings of the footprint face ∪ that span
ring". But the carry runs only after a batch "whose commit record lists a footprint face among the L4 faces it changed or
a vertex of one among the vertices it moved". The passage's far side is the front plot's side line (§4.6), which the
building's footprint does not touch at the ground, so a `moveVertex` on that line, on the passage's kerb or court end, or
a row neighbour's re-fit moves the derived span ring without this building's carry or check (J-P48 (4)): its stored
passage room and the rooms above stop tiling the storey's extent, and §2.2 rule 5's "so they cannot go stale" fails. Also
`carryWings`' `before` / `after` are "the footprint's rings", while J-P48 (2) carries a span-ring point in the rings of
the footprint ∪ the span ring. **Required change (§2.6):** "When it runs": "… whose commit record lists a footprint face
among the L4 faces it changed or a vertex of one among the vertices it moved" → "… lists a footprint face among the L4
faces it changed, a vertex of one among the vertices it moved, or — for a building with a stored plan whose wing spans a
passage (`spans`) — that passage face or one of its vertices"; `carryWings`' `before` comment adds "with a stored plan
over a spanned passage, the rings of the footprint face ∪ each span ring for the points inside a span ring (J-P48 (2))",
and `after` likewise.

**V-MAB1-13 · 28 (f) · minor · stale · model.** "**Bars:** §13.2's T28-13 – T28-17." (l. 1488) omits T28-18, "a hand
`relet` above §2.6's capacity returns F-EDIT … and a `setRoomUnit` that would leave a unit without its own door returns
F-EDIT" — the two refusals §2.6 itself states ("a hand `relet` above the capacity is refused (F-EDIT)"; the unit-door
rule). The scope seat's note asked for it; assemble-r1 §8 (1) left it to this round. **Required change:** "T28-13 –
T28-17" → "T28-13 – T28-18".

**V-MAB1-14 · 12, 28 · minor · duplicate · model.** §2.9's view-key list restates the rendering homes' defaults: "`depthBand`
(the underground depth band the cut-away draws, by default the shallowest band holding a tunnel with frontage plots, else
the shallowest tunnel; §8.4, J-A12.81)" repeats §8.4 l. 7864–7865 ("default the shallowest band holding a tunnel with
frontage plots, else the shallowest tunnel"), and "`storey` (… the ground by default; §8.5 …)" repeats §8.5 l. 7924
("default the ground storey"), while `knowledge` in the same list defers its default to §11.3. **Required change:**
"`storey` (the storey the building band draws; its default is §8.5's, J-A28.82)", "`depthBand` (the underground depth band
the cut-away draws; its default is §8.4's, J-A12.81)", "`plotsOnly` (the cadastral plots-only view; §8.5, item 28)".

**V-MAB1-15 · 28 (f), 29, 30, 31 · minor · missing · determinism.** §7.5's transform list gives older documents no value
for several model fields the amendments add or retire: "a building's single `entrance` becomes `entrances` with one
`main` entrance at that vertex" sets no `Building.nextEntrance`; the retired `Building.occupants` (J-A28.29) is not
dropped; `Building.households` (the reverse of `Household.building`), `Building.condition`, `Block.reach`,
`Plot.exposure` and the `knownTo` columns are not filled; and the list's heading names "(items 17, 20, 28, 29, 31)"
without 30. **Required change (§7.5):** "(items 17, 20, 28, 29, 31)" → "(items 17, 20, 28, 29, 30, 31)"; after "with one
`main` entrance at that vertex" insert "(ordinal 0, `nextEntrance` 1)"; before "an elaboration cache is non-canonical"
insert "a building's `households` is filled from its households' `Household.building` in address order and its retired
`occupants` list is dropped (J-A28.29); `condition` is `kept` and `reusedAs` absent; a block's `reach` is `open`, and
each plot's `exposure` is derived at the first load by §4.6's rule from its access rows (no older document has a
passage), its `knownTo` and its buildings' and institutions' by §2.5's default;".

**V-MAB1-16 · — (pre-existing) · minor · broken-reference · model.** `YardPart` is used as a type (§2.5 `Plot.yard:
YardPart[]`) and cited by §10.2 ("(§2.5 YardPart)", l. 8735) but declared nowhere in the document, nor in the
pre-amendments archive; item 8's reuse no longer leans on it (J-A8.22), but pins host on yard faces (§2.7 `Pin.host`) and
the `yard_part` edge role bounds them (§2.2 rule 7). **Required change (§2.5, beside `PlotBound`):** declare
`interface YardPart { id: Id; kind: 'yard'|'garden'|'court'|'orchard'|'midden'|'pen'|'vacant'|'formal_garden'|'forecourt'|'churchyard'|'shore'; face: FaceRef /* L4: a yard sub-area bounded by 'yard_part' edges (§2.2 rule 7) */; lifecycle: Lifecycle }`,
and `Plot.yard`'s comment reads "typed sub-areas (`YardPart`, below)".

## 5 Sweeps over the repaired §2

* **SINGLE-SOURCE.** The repaired mechanisms are each stated once in §2: the span ring and the passage room in `Wing.spans`
  (the fourth rung, the plan steps and J-P48 cite it); the capacity in its bullet (§4.7, §4.11 and F-PLAN point to it);
  the basement gate in "Basements" with its values in §10.2's `BasementGateRow`; the entrance ordinals in `Entrance` and
  rule 4; `reusedAs` in `Building` (§2.8, §4.11 and §8.2 point to it); the sealed default in §2.5 (§4.6, §8.1 and §9.2
  no longer restate it); the floor formula only in §4.11. Duplicates left: §2.9's view-key defaults (V-MAB1-14); outside
  §2, §3.4's paraphrase of the kept-room rule (V-MAB1-07). The r0 duplicates V-MAB-07, 18, 28 and 40 are gone.
* **STALE.** Probed in §2 on the installed text: "entrance: VertexRef", "reserved passage", "site-plan table",
  `occupants:`, "'silt'", "access-row", "sealed flag", "five rows", "immutable" (only in "not an immutable one"),
  "central market", "the market", "licen", "proprietary", "fixed by tier", "rich quarter" (only as a derived
  *description*, J-P1), lots drawn as buildings (§2.5 "rendering never draws a plot outline as a building"), the map
  writing the dossier (§2.9 "the module never writes the dossier") — no stale statement. Stale pointers: the Bars range
  (V-MAB1-13); outside §2, §3.4's and §3.10's pre-repair wording (V-MAB1-07) and §4.6's `Wing.spans` (V-MAB1-02).
* **DEFERRAL-WORDING.** None. The seven "later" hits in §2 are ordinary English ("any later edit", "a later outline()
  call") and the roadmap staging of the plan rung ("adding the rung later is a registration", the owner's stage 3 with
  its hooks present).
* **BROKEN-REFERENCE.** `refs.py`: 0 inside §2 (the document's 2 are external citations in §3.5 and §11.1). Every J id §2
  cites resolves (25 checked by grep: J-A28.72, J-A28.51, J-A28.62, J-A19.43, J-A31.43, J-A31.44, J-A28.82, J-A12.81,
  J-A30.82, J-A8.46, J-A8.42, J-A12.42, J-A11.21, J-A27.42, J-A29.21, J-A29.22, J-A28.21 – J-A28.33, J-A30.31, J-A31.76).
  Semantic: `YardPart`, used and never declared (V-MAB1-16, pre-existing); "Wing.spans" cited for base-time facts that no
  base record holds (V-MAB1-01).
* **NEW-PROBLEM.** The repair created or exposed: the base wing without `spans` (V-MAB1-01, major); the capacity read before
  the wings exist (V-MAB1-03 with pipeline's V-MAB1-04, major); the stale hysteresis memory (V-MAB1-05); the kept-room
  rule against the clipped seed (V-MAB1-06); seeds called fixed rings (V-MAB1-08); a stored plan's re-cut against the
  shell's byte identity (V-MAB1-09); the carry trigger that misses the passage face (V-MAB1-12).

## 6 CONFIRMED versus PLAUSIBLE

**CONFIRMED (read on disk, 2026-09-27, installed document sha256 `365e19f2…`).** Every quotation above, at its line; the 42
r0 issues' fixes and the eight other-seat model issues' fixes; the absence of `spans` from `BaseWing` and of any
`BaseWing.spans`; the stage order "S10b Placement ─► S11" (l. 3157); §2.6's three S10b statements and J-A28.23's row;
the unchanged kept-room sentence in §2.6 and §3.4; §3.10's "the wings that stand at its level"; the FIXED list's "passed
as `fixed` rings"; J-P48 (1)'s widened list against §5.3's row and T28-14; the carry trigger's wording; "T28-13 – T28-17"
beside T28-18's definition; §2.9's and §8.4 / §8.5's defaults; §7.5's transform list; `YardPart` declared nowhere
(grep over the document and the pre-amendments archive); `refs.py` 2 broken, both external.

**PLAUSIBLE (reasoning).** The behavioural consequences in V-MAB1-05 (the flip-flop of a stale hysteresis memory), V-MAB1-06
(a kept room refused after an overlapping wing changes), V-MAB1-09 (a new wall end on an exterior wall under a stored
re-cut) and V-MAB1-12 (a passage-face move not carried); and every "Required change" wording — above all V-MAB1-04's
relocation order and V-MAB1-05's new `Plot.fieldBand` column — which are this seat's proposals for the repairers.

STATUS: COMPLETE (2026-09-27).
