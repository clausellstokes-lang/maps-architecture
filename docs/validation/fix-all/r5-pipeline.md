# Fix-all round 5 — PIPELINE area (§2.6, §2.7, §4, §10, PART II, PART III): the eight items still open after round 4
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat fixall/draft-pipeline-r5 (2026-09-25); queued in docs/FABLE-REVIEW-QUEUE.md.

Lane `fixall/draft-pipeline-r5` · 2026-09-26 · seat: fix architect, PIPELINE area, round 5 (Fable role; opus stand-in).
Status: COMPLETE — 8 items: 8 FIX (all minor), 0 INVALID, 0 STAGED-BY-OWNER, nothing deferred (NP4-2 is stage-3
subject matter; its hook is now concrete, so it is FIXED under the governing rule); 7 replacement blocks (§2.6, §2.7,
§4.1, §4.2, §4.3, §4.4, II.4); 16 cross-area requests (kernel 3, determinism 6, rendering 1, scope 6); 3 new judgment
rows (J-P47 – J-P49) and 4 restated (J-P35, J-P42, J-P44, J-P45); one committed measurement script
(`docs/validation/bench/fixall_pipeline_r5_wingcost.mjs` with its `.out`).

## 0. How to read this file (plain words)

After round 4 the checkers left eight small problems in the part of the design that builds the town. All eight are
fixed here; none is postponed.

* **Where a new bridge's two ends are placed when a river is moved (VD4-10).** When a road needs a bridge where the
  river offers no crossing place, the design adds one by cutting two points into the two river banks. But when the
  river itself is being moved, its new banks do not exist yet at that moment, so that rule would cut the old banks —
  the ones about to disappear. Now the design says: while a river is being moved (or a canal dug), such a bridge is
  only *planned* at first; its two ends are placed on the road where the new banks will be, and they become bank points
  when the new water is put in — exactly like every other bridge of that move.
* **A neighbour's roof outlines in the reroll rule (NP4-1).** When one district is rerolled, a new lane can add one
  point to the street edge of the district next door, and the roof outlines of the house there gain that point too. One
  paragraph (II.4) still listed the allowed neighbour changes without the roof outlines, so a test written from it would
  have failed. It now lists exactly what the two other statements of the rule list.
* **Edited manor-style buildings follow the ground too (NP4-2).** The later "manor" stage (stage 3, which the owner
  placed after the neighbourhoods) will let a user edit a building's detailed layout — wings, courtyards, towers, rooms.
  An edited layout is stored as fixed positions, and nothing moved it when the ground under the house was dragged. Now
  the same step that moves a house's roof outlines also moves a stored layout, by the same rules, and checks that its
  wings still fill the house outline exactly. If something ever went wrong outside a drag, the user is told and the
  edit is kept in the "orphaned edits" list — never lost silently. The stage-3 entry test now includes this check.
* **Gardens touching a house wall (NP4-3).** When the greenery step lays a formal garden or an orchard that touches a
  house wall, it adds a point to the house outline; the roof outlines were only updated after edits, not during
  generation, so "Regenerate this block, same settings" could produce a different file from the first generation. Now
  the roof outlines are updated after *every* step that changes a house outline, whether generating or editing, so the
  two always agree, and a test checks it on a rich house with a garden and an orchard.
* **A rare harbour case (NP4-4).** A walled port's harbour road is kept short by making one of the town's gates face
  the harbour. In a town with several centres, the centre nearest the harbour can have all its gates already committed
  to facing the other centres. Now, in that case, the extra harbour gate (already defined for other cases) is always
  available, so the harbour road stays within 1.5 times the shortest possible path; a new test covers such a town.
* **Three test sentences that miscounted gates (NP4-5).** They counted "roads out of the walls = N" and forgot the one
  harbour gate a port may have. All now say "N main gates, plus a harbour gate where one was placed".
* **The time the roof-outline check adds to a drag (NP4-6).** The check that roof outlines still fill each house runs
  inside every drag step. I measured it on a model: about 0.06–2.7 millionths of a second per house, about 0.4
  thousandths of a second for the ≈ 450 houses a big brush covers, and it is now counted in the drag's time budget.
  Most houses need no expensive check at all (one-wing houses and terraced houses by construction; houses made of
  abutting rectangles by a cheap exact test). If the first editing milestone measures it as too slow, a pre-decided
  simpler form takes over.
* **Three wording slips about unused bridge places and bridge furniture (NP4-7)** are corrected.

**What is in this file.** §1 lists each item with its outcome. §2 holds the complete new text of every subsection this
area changes, ready for the integrator. §3 lists the changes other areas must make in their sections so that
everything agrees. §4 lists the new and restated decisions ("chose X over Y because Z") for the decision table. §5
shows the check that nothing is postponed, what was measured versus reasoned, and what a Fable reviewer should look at
first.

**Reading record.** Read in full for this round: `docs/validation/fix-all/r4-verify-pipeline.md` (NP4-1 – NP4-7) and
`r4-verify-determinism.md`'s VD4-10 row (`docs/validation/fix-all/r4-validate.md` does not exist); in
`docs/ARCHITECTURE.md` (10 723 lines) §2.6 and §2.7 whole, §4.1–§4.4 whole, §4.9 and §4.11 whole, II.1–II.6 and PART
III whole, §7.3 whole, §7.4's warp paragraph and "draw bridges" row, §2.2 rules 5 and 7 (the parts these items touch),
§3.3's commit-record paragraph, §3.6's whole-step validation, §3.7's S11 geometry-share figures, §5.2's F-ROUTE,
F-WALL and F-REDERIVE rows, §5.3's wing and gate rows, §8.6, §12.6, §13.2's B-EDIT and harbour fixtures, §13.5's
towers-and-gates row, §16's M1 and M3a rows, the staged list and the J-P / J-I judgment rows; `r4-pipeline.md`'s
structure and the round-4 wing receipt `docs/validation/bench/fixall_pipeline_r4_wings.py` / `.out`. The rest of the
architecture was searched by grep for every term the fixes touch (`carryWings`, `wing-carrying`, `composition`,
`shore split`, `drawn bridge`, `harbour gate`, `detour guard`, `gates = N`, `roads leaving`, `commit record`). The
`AMENDMENTS`, `OWNER-INSTRUCTIONS`, `DEFINITION` and §0.M manager notes were not needed: none of the eight items
touches greenery shares, prosperity, the bent-cut recipe or the village palisade. Nothing outside
`/Users/cstokes/Desktop/Maps` was read; no reference code, grammar, palette or table is reproduced (clean-room, IMP-1).

**Sibling items that name this area as a companion, left for their owners.** Three round-4 findings owned by other
areas list a pipeline section as a companion: VK4-4 (kernel; §4.4's water-gate sentence), VD4-5 (determinism; §10.4)
and VS4-4 (scope; II.2's `SquareFabric` default mode). Their owners decide the mechanism this round, so this file does
not pre-empt them: §4.4's water-gate sentence is carried verbatim in the §4.4 block below, and §10.4 and II.2 are not
replaced — the integrator applies those owners' requests on top.

## 1. Disposition table

Every item is FIX: the replacement text in §2 carries a mechanism that defeats the checker's failure scenario, and the
cross-area requests in §3 complete it in sections other areas own. "X-" ids are the §3 requests.

| id | sev | disposition | sections changed (this file) [other areas, by request] | mechanism, in one line |
|---|---|---|---|---|
| VD4-10 | minor | FIX | §4.2 S1 (5) and J-P44; §4.1 S4 and edits rows; §4.3; §2.7 `Bridge.over` and the Bridges paragraph [X-D1 §5.2 F-ROUTE; X-K2 §2.2 rule 7] | inside S1's water operator or a carve — whose new water is not yet inserted — F-ROUTE's extra-bridge rung only **sites** its deck with the operator's other crossings; the operator's L1 batch places the two `deck_end` vertices on the way's new route under a fresh `Bridge` and its L0 batch promotes them when the water goes in (§7.3 (b) 2–4, §4.11 (1)–(2)); the one-L0-batch-of-two-shore-splits placement is stated for standing water only (S4 at generation, S4's operator in an edit that moves no water, a drawn bridge) |
| NP4-1 | minor | FIX | II.4 | II.4's seam exception now reads as §4.6 step 7 and §7.3 item 1 do — "the neighbouring cells, plots and footprints whose rings pass through those vertices, and the wing rings of the buildings on them (§2.6's wing-carrying rule), which change only by them — … a promoted vertex returning to its level when the lane goes (§2.2 rule 3)" — and names itself the set II.5's reroll-isolation tests check |
| NP4-2 | minor | FIX (stage-3 subject; its hook made concrete) | §2.6: `CarriedShapes` in `carryWings`'s signature, the stored-composition paragraph, the stage-3 intake bullet, the Test paragraph, J-P48 [X-K1 §2.2 rule 5; X-D4 §7.4; X-D5 §7.3 item 7 (ii); X-D6 §5.3; X-S6 §13.2 and the staged list] | a stored stage-3 `Composition` is carried in the same `carryWings` call as the base wings: the edit that stores it makes every boundary point of its wing, court and room rings and every tower centre on the boundary a shape vertex of the footprint (rule 1; a row neighbour sharing the split party wall is in that edit's scope, changed only by the collinear vertex), boundary runs are re-read by identity, other points follow mean-value coordinates, composed wings and towers are re-based; rule 4's check adds the composed wings' union, rooms inside, tower centres inside or on; undo keeps the former composition; a failure halves a warp, and after any other batch the stored composition is **orphaned** (listed, kept in the log and orphan table, never silent); a definitional sentence makes every "wing rings" mention (§2.2 rule 5, §4.6 step 7, §5.3, §7.3, §7.4, II.1 (3), II.4) include it; the stage-3 intake and B-EDIT (with a hand-built composition, from M3a) run §2.6's test on it |
| NP4-3 | minor | FIX | §2.6: the trigger paragraph ("When it runs is stage-agnostic"), the code comment, the Test paragraph, J-P47; §4.1 S12b and edits rows [X-S1 §13.2; X-D6 §5.3] | `carryWings` runs after **every** committed batch — generation or edit, pool, hinterland unit or generation worker — whose commit record lists a footprint face among the L4 faces it changed or a vertex of one among those it moved (§3.3), for that face's building, before the writer's next batch (S12b's L3 and L4 batches and the hinterland unit's included); S11's own batch ends with the first carry; the carry is pure and writes only the building's own records, so generation, any pool size, replay and Regenerate (keep settings) store the same bytes; a §13.2 fixture: Regenerate (keep settings) of a block with a rich compound whose formal-garden grid and orchard part meet the house wall is byte-identical |
| NP4-4 | minor | FIX | §4.2 S3 (4), (7), (11)'s test; the J-P35 and J-P45 paragraphs [X-S2 §13.2; J-P35, J-P45 rows (§4)] | if the nucleus nearest the harbour has no unforced pick left (its `N₁` taken by polycentric forced picks — a nucleus under about 10 ha between two neighbours, or a twin town's requested `N₁` = 1), no pick is forced and the detour guard of (7) applies to that town unconditionally, whatever M1's measurement finds — so the harbour route stays ≤ 1.5 × `L*` through an existing gate or the guard's harbour gate on `L*`; chosen over raising `N₁` (breaks the gate law and the prefix) and over releasing a polycentric forced pick (cuts the inter-nucleus route); a polycentric coastal fixture joins S3 (11)'s test and §13.2 |
| NP4-5 | minor | FIX | §4.2 S3 (11)'s test [X-D2 §5.2 F-WALL test column; X-S3 §13.2 walled coastal fixture; X-S4 §13.5's towers-and-gates row] | every test statement reads "the roads leaving the walled stage equal its N main gates, plus a harbour gate of §4.2 S3 (7) where one was placed (a sealed town's, or the detour guard's)"; F-WALL counts "main gates = N exact" and "sealed cities at 0 main gates"; §13.5's B-REF row (a fourth statement found by grep) is worded the same way |
| NP4-6 | minor | FIX | §2.6 rule 4 (the pairing, three check tiers, the measured cost, the pre-decided fallback; J-P49); the bench script [X-R1 §12.6; X-S5 §16 M3a; X-K3 §3.6; X-D6 §5.3] | the check is tiered by the building's **pairing** (found from vertex identities once per edit, unchanged by every halving): no union for a wing re-read whole (one-wing house, row quad); for tiled wings only simple counter-clockwise rings — exact by the winding-number identity, confirmed on 75 884 carries (3 574 failing) against the full geometric test; the arrangement union only for overlapping wings; it runs after the kernel's own checks and stops at the first failure; measured ≈ 0.06–2.7 µs per building per pass, ≈ 0.4 ms per pass for 450 buildings, ≈ 3.6 ms worst case (step + 8 halvings), counted in §12.6's warp Apply budget and measured at M3a on a 150 m brush over a CITY core; pre-decided fallback: one check after the final step, F-REDERIVE for a failure |
| NP4-7 | minor | FIX | §4.2 S3 (10); §4.4 outer moats; §2.7 Bridges paragraph [X-D3 §5.2 F-REDERIVE] | (a) S3 (10): every deck has S1 (5)'s form "and its two states … its span, once a way is laid through it, carrying the structural `deck` role beside `way` — a `site` until then … S7 builds the furniture of the built ones"; (b) §4.4: the outer moat's L1 batch places the `deck_end` rows of a fresh `Bridge`, `built` with its arterial, and "S7 builds its bridge furniture"; §2.7 states that decks placed on their way before the water exists are `built` from that batch; (c) F-REDERIVE gains "a `site` left over land is removed — its `deck_end` rows by `removeEdges`, its record a tombstone (§7.3 (b) 9)" |

## 2. Replacement blocks

Seven blocks, in document order. Each replaces the named subsection completely (heading, banner and body). Every
sentence of a replaced subsection that no item touches is carried over verbatim: the blocks were built by a script
(scratchpad `r5p/build.py`) that extracts the current subsection from `docs/ARCHITECTURE.md` (10 723 lines) and applies
only the listed substitutions, each required to match exactly once; a line diff of every block against the current
text (scratchpad `r5p/diff.txt`) shows only those changes — §2.6 8 substitutions, §2.7 4, §4.1 4, §4.2 10, §4.3 2,
§4.4 3, II.4 2 (the banner line counted in each). Unchanged by this round in the pipeline area: §2.5, §4.5–§4.12, §10,
II.1 – II.3, II.5, II.6 and PART III (II.1 (3) and §4.6 step 7 already name the wing rings; §2.6's new definitional
sentence extends every such mention to a stored composition, so neither needs replacing).

=== REPLACE §2.6 Buildings, heights and ground datum, wings, materials, sub-locations, the stage-3 interface ===

### 2.6 Buildings, heights and ground datum, wings, materials, sub-locations, the stage-3 interface

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r5); earlier revisions fixall/integrate-r4, fixall/draft-pipeline-r4, fixall/integrate-r3, fixall/draft-pipeline-r3

```ts
interface Heights { baseCm: Cm /* ground datum: floor level in terrain cm (§4.7 S11) */; floors: number; eaveCm: Cm; ridgeCm: Cm; towerCm?: Cm /* eave, ridge, tower above baseCm */ }   // owner HEIGHT ruling: always populated
interface BaseWing { kind: 'rect'|'quad'|'polygon';
  ring: Polygon /* world lattice points, counter-clockwise — a derived shape record that §2.6's wing-carrying rule keeps on the footprint (NP3-1).
                   rect: a rectangle — its four corners, and on its sides, between them, the footprint's and the building's other wings' vertices that lie
                   there · quad: a row footprint clipped to its plot (§4.7 S11) — four sides in ring order from corners[0]: sides 1 and 3 are the party-wall
                   chains (straight, or with the lot cut's one bend, §4.7 S10 (4)), sides 2 and 4 the front and rear chains, which may be bent or curved —
                   or a rect the carry turned into a quad (below) · polygon: a template part (apse, octagon, star point) */;
  corners?: [0, number, number, number] /* rect and quad: the ring indices at which sides 1, 2, 3 and 4 begin (the ring starts at the first corner);
                   S11 records them when it clips a row (VP2-5) or when a rect's sides carry other vertices, and every carry re-indexes them (NP3-1);
                   absent on a rect whose ring is its four corners ([0, 1, 2, 3]) */;
  ridgeAxis: 0|1 /* rect: along side 1 (0) or side 2 (1) · quad: 0 = the ridge joins the arc-length midpoints of sides 1 and 3, the party-wall chains
                    (eaves to the street), 1 = it joins the arc-length midpoints of sides 2 and 4, the front and rear chains (gable to the street) ·
                    polygon: unused (pyramid, cone or dome) */;
  heights: Heights; roof: RoofSpec }
interface Building {
  id: Id; plot: Id; slot: number; footprint: FaceRef /* L4 */; wings: BaseWing[] /* ≥ 1; the footprint is their union exactly, kept so through every move by the wing-carrying rule below (rectangle = 1, L = 2, T = 2–3, templates n; a clipped row house = 1 quad, or stepped quads on a slope) */;
  class: BuildingClass /* hovel, cottage, house, row_house, hall, inn, workshop, warehouse, chapel, church, temple, manor, keep, tower, mill, tent, … data-defined */;
  use: Id /* roster building type */; dwelling?: Id /* the household living in a workplace (live-in), §4.7 S10b */;
  entrance: VertexRef /* ('entrance', building id): a vertex on the footprint edge that lies on the access edge */; heights: Heights /* the building's max over its wings */;
  roof: RoofSpec /* the model's default roof construction; a style sheet may override the construction, never the heights (§8.2) */;
  material: { walls: string; roof: string } /* from MaterialRow; setAttr-overridable */; description?: TextRef; openingHours?: OpeningRow[];
  subLocations: Id[] /* SubLocation records, from the class table */;
  composition?: Composition /* stage 3: lazily generated, stored only when edited; its streams derive from the building's lineage (§6.1) */;
  assignment?: Id; drift?: DriftBounds; occupants: Id[]; lifecycle: Lifecycle;
}
type RoofSpec = { kind: 'gable'|'hip'|'flat'|'pyramid'|'cone'|'dome'|'skeleton'|'tent'|'plain' /* the F-SKELETON downgrade: no ridge or hip lines, §3.8 */|'none' /* a ruined building's roofless state, §2.8 */; pitch?: number; material?: string };
interface MaterialRow { key: { districtKind: string; cls: string; band: string; era: string }; walls: string; roof: string; weight: number }   // a rule table (§7.6), our own rows
interface OpeningRow { dayType: string; openH: number; closeH: number }
interface SubLocation { id: Id; building: Id; name: string; tags: string[] /* table, counter, stage, bed, bath, pickup, deliver, … data-defined */;
  capacities: { leisure: number; tempResidential: number; guestWorker: number; studying: number; working: number }; relax?: string[] }   // from the class table; rooms at stage 3 refine, never replace
interface Composition { lod: ('outline'|'wings'|'rooms')[]; wings: Wing[]; towers: Tower[]; courts: Polygon[]; rooms?: Room[] }
interface Wing { footprint: Polygon; heights: Heights; roof: RoofSpec; dormers?: number; porch?: Porch }
interface Tower { centre: Point; radiusCm: Cm; heights: Heights; roof: RoofSpec }
interface BuildingInput { lot: Polygon; access: Segment[]; slot: SlotPlan /* §2.5: at S11 the site plan's working hint; at a later outline() or compose() call the building's current footprint ring, resolved at the call */; ctx: ContextVector; cls: BuildingClass; assignment?: Assignment; drift: DriftBounds; seed: StreamKey /* derived from the building's lineage for this call; never stored */; terrain: TerrainSampler;
  fixedWings?: BaseWing[] /* the row arrangement's clipped quads (§4.7 S11): outline() returns them with heights and roofs and never re-fits them */ }
interface BuildingGenerator {   // the stage-3 hook, split by cost (SCL-13)
  outline(input: BuildingInput, k: Kernel): KernelResult<{ wings: BaseWing[] }>;              // every LOD, exports, shadows: cheap and deterministic
  compose(input: BuildingInput, outline: BaseWing[], lod: 'wings'|'rooms', k: Kernel): KernelResult<Composition>;   // lazy, per visible tile
}
interface ClassRules { pick(ctx: ContextVector, assignment?: Assignment): { cls: BuildingClass; heights: Omit<Heights, 'baseCm'>; roof: RoofSpec; template?: string } }   // a data table, not code
// The wing-carrying rule (below; NP3-1, NP4-2, NP4-3, NP4-6) — pure, + − × ÷ and sqrt only (§6.5); run by S11 at the end of its block batch (the first carry),
// after every other committed batch, in generation or in an edit, whose commit record changes a footprint face's rings (S12b's and the hinterland unit's
// batches included), and inside a warp's or moveVertex's whole-step validation (§3.6, §7.4):
interface CarriedShapes { wings: BaseWing[]; composition?: Composition /* only when stored (an edited stage-3 composition): its wing, court and room rings and its tower centres (NP4-2) */ }
declare function carryWings(shapes: CarriedShapes, before: Polygon[] /* the footprint's rings before the change, outer first */, after: Polygon[],
  moved: (p: LatticePoint) => LatticePoint | null /* the position after the change of the footprint vertex that stood at p; null: the change dissolved it */,
  pairing?: 'tiled' | 'overlapping' /* rule 4's pairing verdict, found from the vertex identities once per edit and reused by every halving of one step; computed when absent */): KernelResult<CarriedShapes>   // E_INVARIANT when §2.6's check fails
```

**The base outline builder.** The base ships `OutlineBuildingGenerator`: the site plan's rectangle, an L or T composed of
2–3 rectangular wings (MFCG Complex mode, FTG Dense/Gaps looks), a row's `fixedWings` passed through unchanged (below),
and — for institution classes (keep, temple, church, manor, hall, farmstead) — two further constructions behind the same
`outline()`:
1. **Footprint templates** (COV-FTG-F16): data rows of normalised shapes fitted to the claim — cruciform church (nave,
   transept, apse), cruciform keep with corner projections, octagon, n-gon (a 9-gon theatre), 6- and 7-pointed star
   temples, U-court, ring cloister around a court. Fitting is an affine map of the template into the claim's `lir`,
   then a boolean intersection with the claim; each template is stored as its constituent rectangles and wedges so the
   wing rule below holds.
2. **The axis-locked composer** (COV-MFCG-G05; our own construction of MFCG's idea): take the claim's OBB axes; cut the
   axis-aligned rectangle on the axis more perpendicular to the current longest edge at a ratio drawn from U(0.4, 0.6);
   recurse until cells reach the class's minimum cell (`minCell = baseCell · 2^(2·size − 1)`, a table row); keep each
   cell with the class's `fill` probability, keeping the cell nearest the entrance and rejecting any drop that
   disconnects the kept set; retry ≤ 3 times on the `…/attempt=n` stream, then the full rectangle (reported). U, H,
   comb, cross and ring footprints emerge — the landmark silhouettes that show at city zoom.

Every footprint is stored as **wings** (VIS-10) of three kinds: `rect` (the outline builder's rectangles and its L / T
compositions), `quad` (a row house clipped to its plot, below) and `polygon` (non-rectangular template parts — apse,
octagon, star points — with a `pyramid` / `cone` / `dome` roof). Each wing carries its ridge axis (the wing's long axis,
or the short axis in a table share of wings — NG measures ≈ 36 %), its heights and its roof; the footprint is the wings'
union, so the footprint hash at city LOD does not depend on the wing split. The roof *construction*
the renderer draws (plain, skeleton-hip, skeleton-gable, fake gable per wing) is a style-sheet parameter over the stored
wings (§8.2); the model's `roof.kind` is the default that the 3-D export uses, so presets can change the picture without
changing the model. *Judgment:* chose wings stored in the base over a single-wing L/T because NG's per-wing roofs,
two-tone law and hatching cannot be derived from one ridge line (VIS-10) and the wing split costs one small array per
building.

**Row footprints are quads (NF-P2).** S11's row arrangement builds each row house's footprint by the boolean
`plot ∩ frontage band` (§4.7 S11, GEO-26), so two neighbours share one party-wall edge even on a bent or curved frontage.
That polygon is stored as one `quad` wing — its two side chains are the plot's party walls, straight or bent once where
the lot cut's bend falls inside the row depth (the side lines are bent lot cuts, §4.7 S10 (4)), its front and rear are the
clipped chains, and S11 records the four corners where the side chains meet the front and rear chains (`corners`) — and
S11 hands it to `outline()` as `fixedWings`; `outline()` adds heights and the roof and never re-fits it, so the footprint
the boolean made is the footprint the model stores (on a slope beyond `skirtMaxCm` S11 first splits it along the contour
into stepped quads, each a wing with its own corners). The quad's model ridge joins the arc-length midpoints of the two
chains its `ridgeAxis` names, so every row house has a ridge without a skeleton, and a bent party-wall chain has one
well-defined midpoint (on whichever of its two segments half its length falls). The drawn roof follows §3.8 wing by
wing: a quad that passes the near-rectangle test (its four OBB corners matched by footprint vertices within 30 cm, area
≥ 0.97 of its OBB) takes the exact OBB roof; any other quad — a strongly bent party wall included — takes the validated
skeleton with its plain-roof downgrade; the per-wing fake-gable construction draws the stored ridge directly. No reader
asserts that a party-wall side is straight. The union rule, O17 (i)'s identical footprint hash at every LOD and the
stage-3 contract therefore hold for attached rows on curved frontages exactly as for rectangles; the contract test runs
on the curved-street fixtures (§13.2), which include rear lines oblique to the frontage so that bent party-wall chains
occur. *Judgment (J-P31):* chose a `quad` wing kind that stores the clipped footprint over re-fitting row houses as
rectangles, which breaks GEO-26's shared party wall, and over storing them as `polygon` wings, which loses the ridge the
per-wing roofs and NG's two-tone law need, because the quad keeps the party wall exact and still names a ridge by
construction. *Judgment (J-P39; VP2-5):* chose to store the quad's four corner indices over inferring its sides from the
ring, because a party-wall chain carrying the lot cut's bend has three vertices, so no rule on vertex count or turning
angle can tell a bent party wall from a bent front, while S11 knows the corners exactly when it clips the row.

**Wings follow their footprint — the wing-carrying rule (NP3-1; Judgment J-P42).** A wing's ring stores world lattice
points, some of them its footprint's vertex positions — with a stored stage-3 composition (below), the only entity
records that store positions of vertices (§2.2 rule 5 names both; §7.4's point records hold points that are no vertex) — so
one function, `carryWings`, keeps every building's wings on its footprint face through every change of that face's
rings that the building's own S11 batch did not make — a `warp` or `moveVertex` that moves a vertex of the face (the
commit record's `moved` list, §3.3); a later batch that adds a vertex to one of its rings (a neighbouring plot re-fitted
with a corner on a shared party wall; II.1 (3)'s neighbour step splitting a kerb that a row footprint fronts; S12b's
formal-garden grid line or orchard-part edge ending on a house wall, §4.9) or takes one out (a dissolution, or that
step's reversal); and S11's own insertion of the footprint, which is the first carry. **When it runs is
stage-agnostic (NP4-3; Judgment J-P47).** After every committed batch — in generation or in an edit; in the derivation
pool, in the hinterland unit or in the generation worker — whose commit record lists a footprint face among the L4
faces it changed, or a vertex of one among the vertices it moved (§3.3), the batch's writer runs `carryWings` for that
face's building before its next batch; the building's own S11 batch ends with the first carry instead, and a `warp` or
`moveVertex` runs it inside the step's validation (rule 4). The carry is pure and writes only the building's `wings`
(and its stored composition), which belong to the writer's own faces — a district's S12b changes only its own
footprints (§4.1's laziness contract), an edit only those of its effective scope and seam exception (§7.3 item 1) — so
generation, a pool of any size, a replay and Regenerate (keep settings) run the same carries on the same rings and
store the same bytes (O9 (c)). The rule:
1. *Boundary runs are footprint runs.* The parts of a wing's ring that lie on the footprint's boundary — its **boundary
   runs** — are runs of the footprint's rings vertex for vertex, so a wing vertex on the boundary is a footprint vertex,
   identified by its lattice point (a vertex is unique per lattice point, §3.10). S11 establishes this at the first
   carry: it inserts the footprint's rings through every wing vertex that lies on the wings' union boundary — a collinear
   one included, as a shape vertex of the ring, which never dissolves (§2.2 rule 3) — and then carries the wings from the
   ring it inserted to the committed face, each input vertex matched to the vertex its insertion placed
   (`ChainInsert.placed`, §3.4; a row's quad, which the boolean on the arrangement made, already is its committed ring).
   Inside the footprint the same holds between wings: a vertex that one wing has on another wing's side — the joint of
   an L's two rectangles, a T's stem corner on its bar — is a vertex of both rings (a rect records it between its
   corners), so wings that share a side share it vertex for vertex. Every later carry keeps both properties.
2. *Carry.* For each such building, from the footprint's rings before the change and after it: (a) each boundary run is
   re-read from the rings after the change between its two end vertices, in the direction that keeps the footprint's
   interior on its left, matched by identity — an end keeps the vertex it was, wherever that vertex now stands — so a
   vertex the change added to the boundary joins every wing ring that runs along it, a dissolved one leaves it, and a
   moved one moves; a wing whose ring lies wholly on the boundary (a one-wing house, a row's quad) is re-read whole, from
   its first corner's vertex; (b) every other wing vertex — a joint where two wings
   meet inside the footprint, or the hidden corner of a wing that overlaps another — takes its mean-value coordinates
   with respect to the footprint's rings (outer and holes) before the change, applied to the rings after it with
   `+ − × ÷` and `sqrt` only (§6.5) and rounded to the lattice, so a joint two wings share maps to one point for both.
3. *Kinds.* A rect's and a quad's `corners` name the same corner vertices after the carry and are re-indexed. A rect
   whose carried ring fails §3.8's convex near-rectangle test (every turn non-negative by exact `orient2d`, its four OBB
   corners matched by ring vertices within 30 cm, area ≥ 0.97 of its OBB) becomes a `quad` with its four corners recorded
   and its `ridgeAxis` swapped — a rect's axis 0, along side 1, is a quad's axis 1, the line joining the midpoints of
   sides 2 and 4 — so the ridge keeps its direction and the roof path is re-chosen on the carried ring (§3.8, §8.6); a
   quad and a polygon wing keep their kinds.
4. *Check.* Every carried ring is simple and counter-clockwise, and the union of the building's wings equals its
   footprint face (integer equality after snapping — the stage-3 contract's own test, below). It is decided exactly, at
   the least cost, by the building's **pairing** (NP4-6; Judgment J-P49): whether every directed edge of its wing rings,
   keyed by vertex identity (a footprint vertex, or a joint the meeting wings share), is an edge of the footprint's
   rings — each used once — or the reverse of exactly one other wing's edge. The pairing depends on identities only, so
   it is found once per edit and holds through every halving of a step, which moves vertices and never adds or removes
   one; a batch that adds or removes a vertex recomputes it. Then: (i) a building whose every wing is re-read whole by
   rule 2 (a) — a one-wing house, a row's quad — needs no union: its ring is its footprint's ring, which the step's own
   validation keeps simple (§3.6), and only rule 3's test runs, on a rect; (ii) a building whose pairing holds — tiled
   wings: an L, T, cross or U of abutting rects, a template of tiles — needs only every carried ring simple and
   counter-clockwise, because the pairing makes the wings' winding numbers sum to the footprint face's at every point
   off the edges, so simple counter-clockwise rings cover each point of the face exactly once and nothing outside it —
   their union is the face and they overlap nowhere; (iii) a building whose pairing fails — wings that overlap, such as a
   T whose stem runs into its bar — is checked by the kernel's boolean union on the arrangement (§3.7) against the face.
   For a `warp` or a `moveVertex` this check is part of the step's whole-step validation, which halves the step when it
   fails (§3.6; the edit layer's record check, as for a held pin, §7.4); it runs after the kernel's own checks of the
   step pass and stops at the first failing building in address order, since one failure halves the step. After any
   other batch a building whose check fails is re-derived by S11 on its plot (F-REDERIVE, reported); by rule 1 that
   cannot happen on the boundary, whose runs follow the rings exactly, and a joint moves only by the sub-centimetre
   route changes such a batch makes (§2.2 rule 3). *Cost (NP4-6; measured on a model of the rule, our own script
   `docs/validation/bench/fixall_pipeline_r5_wingcost.mjs` → `.out`, Node 24 on the bench machine, per building per
   validation pass, the carry and rule 3 included):* ≈ 0.06 µs for a row's quad, ≈ 0.4 µs for a one-wing rect (rule 3's
   near-rectangle test), ≈ 0.9–2.7 µs for tiled L, T, cross, U and inner-joint compositions (their check 0.15–0.4 µs of
   it), and ≈ 0.3–0.9 µs once per edit for the pairing; an overlapping composition adds its union, bounded by S11's
   compound geometry share (≤ 25 µs, §3.7; PLAUSIBLE). On an assumed core mix — 55 % row quads, 25 % one-wing houses,
   18 % tiled, 2 % overlapping — 450 buildings, §12.6's district ceiling and about what a 150 m brush (≈ 7 ha) covers in
   a dense CITY core, cost ≈ 0.4 ms per pass and ≈ 3.6 ms in the worst case of a step and eight halvings, inside §12.6's
   warp Apply budget, which counts it and which M3a measures on that brush (§12.6, §16). *Pre-decided fallback* if M3a
   finds that budget exceeded: the wing check leaves the whole-step validation — it runs once, after the final step, and
   a building that fails it is re-derived by S11 on its plot (F-REDERIVE, reported) instead of halving the step. The
   same model confirms (ii)'s equivalence: on 75 884 tiled carries at 8 m amplitude, 3 574 of them failing, the ring
   test with the pairing agreed with the full geometric edge test every time.
5. *Undo, replay, `moveFootprint`.* The edit's undo record keeps the former rings (§7.4), and a replay performs the same
   carry on the same geometry, so it gets the same rings. `moveFootprint` applies its rigid move to the wing rings and
   S11 re-fits the plot with them as `fixedWings` — the first-carry path.
**A stored composition is carried with its wings (NP4-2; Judgment J-P48).** A stage-3 `Composition` is derived lazily
and stores no position until an edit stores it (`Building.composition`; the edit kinds that do so are stage 3's, and
B-EDIT stores a hand-built one, below); from then on its world geometry — each composed `Wing.footprint`, each court,
each room ring and each tower's centre — is carried in the same `carryWings` call as the base wings, by the same rules:
(1) the edit that stores it establishes rule 1 for it in the same batch — every point of those rings and every tower
centre that lies on the footprint face's boundary is inserted into the footprint's rings as a shape vertex (an L4
same-level split, which never dissolves, §2.2 rule 3; the base wings gain it by rule 2 (a)), and a point one composed
ring has on another's side is made a vertex of both (a data step on the record); a footprint that shares the split edge
— a row neighbour's party wall — gains the same collinear vertex, and that neighbour's footprint and wing rings are in
the edit's effective scope, each changed only by those vertices (its prior ring with them removed, the check §7.3 item 7
(ii) makes for the seam exception); (2) boundary runs are re-read by identity and every other point takes its
mean-value coordinates in the footprint's rings before the change, applied after it and rounded, so a point that a
wing, a court and a room share maps to one point for all of them, and a tower centre on the boundary, a footprint
vertex, moves with it; each composed wing and tower is then re-based by `deriveBase` on the ground it now stands on, as
the base wings are (§7.4); (3) a composed `Wing` has no kind to lose — its roof construction is re-chosen on the carried
ring (§8.6); (4) the check adds every carried composition ring simple and counter-clockwise, the composed wings uniting
to the footprint face (the stage-3 contract, by rule 4's tiers), every room ring inside the face and every tower centre
inside or on it (exact `orient2d` tests); (5) the undo record keeps the former composition with the former wing rings
(§7.4). A failure inside a warp or `moveVertex` halves the step, as for the wings; after any other batch — where rule 1
makes it as rare as for the wings — the stored composition's fate is **orphaned** (§7.3 item 4): the dry run lists it,
the edit that stored it stays in the log and in the document's orphan table, the record is dropped and the building
composes lazily from its carried wings until the user re-attaches or discards the edit — never silently. Wherever this
document names a building's wing rings as carried, re-based, excepted from locality or restored — §2.2 rule 5, §4.6
step 7, §5.3, §7.3 (a) 4 and items 1 and 7 (ii), §7.4, II.1 (3), II.4 — a stored composition's rings, wings and tower
centres are included, by this rule.
**Test (B-EDIT; "§2.6's test", §13.2).** A `warp` and a `moveVertex` over a built block holding a two-wing L house, a
three-wing T whose wings overlap, a row of quads on a curved frontage and a footprint with a hole: after each, every
building's wing union equals its footprint face (integer equality), every carried ring is simple, every drawn roof line
lies inside its footprint (§3.8's paths re-chosen on the carried rings), and a rect that failed the near-rectangle test
is a quad with its four corners; a neighbouring plot re-fitted onto a shared party wall adds its corner to the wing ring
along that wall; undo restores every ring byte for byte, and a replay reproduces them. The block also holds a building
with a hand-built stored `Composition` — its composed wings the base wings each cut in two, a court on the footprint's
hole, a tower centred on a corner and one inside, rooms in one wing: after each move the composed wings unite to the
moved footprint face, every room lies inside it and every tower centre inside or on it, and undo restores the
composition byte for byte (NP4-2). **Generation equals regeneration (NP4-3):** on a rich compound whose yard holds a
formal-garden grid and an orchard part with edges ending on the house wall, the wing rings after generation carry those
wall vertices, and Regenerate (keep settings) of the block is byte-identical to the one-click result (§13.2).
*Measured on a model of the rule*
(our own script, `docs/validation/bench/fixall_pipeline_r4_wings.py` → `.out`; integer centimetres, smooth random
displacement fields of 0.25–8 m amplitude over 20–80 m wavelengths): tiled L, T, cross and U houses keep their wings'
union exactly equal to the footprint in 48 000 of 48 000 carries at 0.25, 1 and 3 m amplitude, and a T whose stem
overlaps its bar by 1 m in 11 838 of 12 000 (the 162 failures, all at 3 m, are hidden corners pushed out of the bar);
at 8 m, with the footprint itself still simple, 3–3.6 % of tiled carries fail (a wing's inner side, straight between two
moved boundary vertices, leaves the footprint) and 14 % of overlapping ones — each a step the whole-step validation
halves (rule 4). A warp de-rectangles wings readily: 33–46 % of carried tiled rects fail the near-rectangle test at 0.25 m and 87–99 % at
1–3 m, so the roof path must be re-chosen on every carry, as rule 3 does. *Judgment (J-P42):* chose to
carry the stored wing rings with their footprint — boundary runs re-read from the footprint's rings, joints by
mean-value coordinates — over making wings L4 sub-faces now, which needs a per-wing entity and the stage-3 face split in
the base, and over re-fitting wings from the moved footprint, which changes the ridges and wing split of every warped
house; a carry moves each wing exactly as far as the ground under it moved. *Judgment (J-P47; NP4-3):* chose to run the
carry after every committed batch whose commit record changes a footprint face, whatever stage or edit wrote it, over
naming its callers (S11 and the edit layer) and over forbidding S12b's L4 edges to end on a footprint ring, because a
list of callers goes stale with every stage that writes L4 — S12b's gardens now, a stage-2 close-up or a registered
stage later — while the commit record names every changed face by construction, and because a garden's grid line or an
orchard's edge meeting the house wall is the natural layout, which a ban would push off the wall or onto its corners.
*Judgment (J-P48; NP4-2):* chose to carry a stored stage-3 composition in the same call as the base wings, its boundary
points made footprint vertices when it is stored, over leaving it at fixed coordinates (a warp would leave its roofs,
rooms and 3-D export behind the moved house — the NP3-1 failure one level down) and over re-composing it from the moved
outline (which discards the user's edit that stored it), because the composition's union is the outline's by contract,
so the same boundary-run and mean-value rules move it exactly as far as the ground under it moved. *Judgment (J-P49;
NP4-6):* chose a check tiered by the building's pairing — none for a wing re-read whole, simple counter-clockwise rings
for tiled wings, the arrangement union only for overlapping ones — inside the step's validation, with a measured cost
and a pre-decided fallback (one check after the final step, F-REDERIVE for a failure), over one union per building per
step (up to ≈ 25 µs each, ≈ 11 ms a pass for 450 buildings at that bound), because the pairing turns the union into a ring test, exactly,
for every building whose wings tile, and over checking only after the step, which re-derives a building that halving
would have kept.

**Heights and the ground datum (owner HEIGHT ruling; AM-3; FTG-13).** Every building, wing, tower, keep, wall run, gate
and bridge carries heights; eave, ridge and tower heights are measured above `baseCm`, the floor level in terrain
centimetres. One per-entity function, `deriveBase(entity, sampler)`, computes every ground datum, and S11, S7, S1's terrain operator (§7.3 (a)) and the edit layer after a warp or vertex move (§7.4) all call it: a wing's `baseCm` from the terrain sampler (bilinear on the refined 2.5 m raster at
the wing's vertices and centroid) is `max(samples) + plinthCm` (table, default 30 cm), so no floor is buried; the fall under the
wing (`max − min`) is a foundation skirt the 3-D export extrudes down to the terrain and the shadow pass includes. Where
the fall across a row footprint would exceed `skirtMaxCm` (table, default 300 cm) the footprint is split along the
contour into stepped wings, each within the limit — terraces step down a hill instead of floating. Walls store their base
as a knot profile along the trace (§2.2 rule 5), gates and towers their own base from the samples under their footprints,
bridges and pier decks a deck height from the two bank elevations plus a clearance row.
Shadows and the 3-D export (§11.1) read the same numbers, so they agree on any terrain, not only on flat sites. The
shadow pass is §8.4's (optional, off by default, timed at M2b); the base populates every height and keeps the display
list's shadow hook (§8.1) and its budget (§8.4, §12). Acceptance: heights on 100 % of buildings, wings, towers and
wall runs; on the hilly
golden seeds and after every terrain stroke, 0 wings whose `baseCm` differs from the highest terrain sample under the wing
plus the plinth, user-edited bases excepted (the rule is exact, §7.3 (a)).

**Materials (COV-FTG-F20).** `MaterialRow` is a rule table keyed by district kind × class × prosperity band × era (weighted
rows; temples and churches stone by row), read by S11; a district's `materialOverride` and a building's `setAttr` override
it; enceintes carry their own wall material (§2.7). The style sheet maps materials to colour and texture roles.

**Descriptions, opening hours, sub-locations (COV-FTG-F21, FTG-11).** A building's description is generated by the naming
engine (§10.4) from its class, use, owner and district, persisted per entity and editable; opening hours come from the
class table and are what the simulation module reads. `SubLocation` records (named parts of a building with tags and
capacities for leisure, temporary residence, guest workers, study and work) are filled from the class table when the
building is created; stage-3 rooms refine them (a room may host a sub-location) and never replace their ids.

**The stage-3 hook and its cost contract (owner-staged; DEF-17, SCL-13).** Stage 3 replaces `OutlineBuildingGenerator`
with a lot-driven Fantasy-Manor-class generator (`manor.md` §3.3, §9 via the proposals: a lot-derived path of wings,
orientation fixed by the frontage, the lot polygon in the collision set, a class picker per plot from the same
`ClassRules` table). The interface is split so the city view never waits for a manor:
* `outline(input)` returns the wings every LOD, every export and the shadow hook use — a row's `fixedWings` unchanged,
  with heights and roofs added. The base `OutlineBuildingGenerator`'s `outline()` is part of S11's geometry share
  (≤ 3 µs per plot median, §3.7, §12.4). A stage-3 generator's `outline()` is admitted at ≤ 10 µs per building median by
  the intake measurement below, and registering it re-declares S11's row of §12.4 by the measured difference — a declared
  budget amendment under §3.7's rule — so the METROPOLIS city view still composes no manor to show its footprints.
* `compose(input, outline, lod)` returns wings with roofs, dormers, porches, towers, courts and rooms, lazily per visible
  tile at district LOD and finer; ≤ 1 ms per building median at `wings`, one tile's compositions within 16 ms of frame
  work (amortised: a tile draws the outline until its compositions arrive). **Contract test:** the union of the composed
  wings equals the outline's union exactly (integer equality after snapping), so O17 (i)'s identical footprint hash at
  every LOD holds by construction.
* **Stage-3 intake measurement and fallback, decided now.** The stage-3 intake measures the generator's `outline()` time
  per building class on B-CITY METROPOLIS seeds. If it exceeds the 10 µs median, `outline()` runs the generator's own
  massing step only (its wing rectangles without roofs or rooms); if that still exceeds the budget, the base
  `OutlineBuildingGenerator` keeps producing the outline and stage-3 `compose()` is constrained to it (its wings must
  union to the base outline). Diversity "from a giant manor to a small hovel" stays a property of `ClassRules` (data keyed
  by the context vector), not of the generator. The intake also runs §2.6's test (B-EDIT) with every fixture building's
  composition stored: after each `warp` and `moveVertex` the composed wings unite to the moved footprint face, every
  room lies inside it, every tower centre lies inside or on it, and undo restores the composition byte for byte
  (NP4-2), so a stage-3 generator is admitted only with compositions the base can carry.

=== REPLACE §2.7 Walls, gates, towers, castle, bridges; greenery, land use, decorations, pins; labels; content entities; the staged layers' records ===

### 2.7 Walls, gates, towers, castle, bridges; greenery, land use, decorations, pins; labels; content entities; the staged layers' records

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r5); earlier revisions fixall/integrate-r4, fixall/draft-pipeline-r4, fixall/integrate-r3, fixall/integrate-r2, fixall/draft-pipeline-r2

```ts
interface Enceinte { id: Id; kind: 'citadel'|'inner'|'outer'|'suburb'|'bailey'|'palisade'|'earthwork';
  trace: ChainRef /* ('wall', id): the L1 wall chain, a ring or an open chain */; closure: 'ring'|'shore' /* 'shore': an open chain whose enclosure is closed by the L0 shoreline */;
  anchors?: { end: 0|1; on: 'shore'|'bank'|'cliff'|'enceinte'; vertex: VertexRef /* ('anchor', enceinte id, end) */ }[] /* typed end anchors of an open chain */;
  waterfront: 'open'|'quay_wall'|'sea_wall'; placement: 'aroundAll'|'aroundStage';
  strips: { inner: FaceRef; outer: FaceRef } /* L1 wall-strip faces S7 cuts off beside the trace: inside, band + inner setback (bounded by the setback line or the
                                                intervallum); outside, band + outer setback + glacis, or the berm up to a moat; S8 never cuts them and lanes end on them (§4.6, §4.8) */;
  band: { inner: FaceRef; outer: FaceRef } /* L3 half-bands on each side of the L1 wall chain, built by bandUnion inside the strips by S10's first step (§4.7); nesting holds */; glacis?: { inner?: FaceRef; outer: FaceRef };
  thicknessCm: Cm; walkCm: Cm; heightCm: Cm; base: ChainProfile /* 'base_knot' on the trace: the wall's base elevation, one knot per trace vertex S7 places, linear between (§2.2 rule 5) */; setbackCm: { inner: Cm; outer: Cm } /* both faces unbuildable */;
  intervallum?: Id /* the lane inside the wall when the era row asks for it */; material: string;
  gates: Id[]; towers: Id[]; moat?: Id /* the wet moat WaterBody along the trace, named as `Castle.moat` is: carved at S3 for the innermost enceinte, by S5a's carve for an outer one (§4.2, §4.4); a dry ditch is residue, never this field (§4.7 S10 (0), §4.8; NP3-8) */; stage: number; lifecycle: Lifecycle }
interface Gate { id: Id; enceinte: Id; junction: Id; way: Id | null /* null: a postern or water gate without an outward way */;
  kind: 'main'|'postern'|'water'|'gatehouse'|'castle'; heights: Heights; footprint: { inner: FaceRef; outer: FaceRef }; plaza?: FaceRef;
  banks?: [VertexRef, VertexRef] /* a water gate: ('gate_end', gate id, 0 | 1), its two bank vertices on the trace; the wall's edge between them lies across the water (§2.2 rule 7; VK3-2) */ }
interface Tower { id: Id; enceinte: Id; vertex: VertexRef /* ('tower', id) */; radiusCm: Cm; heights: Heights; kind: 'round'|'square'|'bastion'|'octagonal'; footprint: { inner: FaceRef; outer: FaceRef } }
interface Castle { id: Id; plot: Id; reservation: Id; curtain: Id /* its own Enceinte, kind 'bailey' */; cityWeld?: [VertexRef, VertexRef] /* ('weld', castle id, 0 | 1): ends of the shared wall stretch (one edge carrying both enceintes' 'wall' roles) when on the enceinte */;
  keep: Id; keepShape: 'rect'|'square'|'octagon'|'round'|'cruciform'; keepAt: 'opposite_gate'|'highest'|'centre'; innerWard?: FaceRef; gatehouse: Id /* one town-side gate, sited at S3 on the bailey side facing the plaza by least cost (§4.2 S3) */;
  paths: Id[] /* keep ↔ gate ↔ wall stairs, 'path' ways inside the bailey */; bailey: FaceRef; moat?: Id; surround: 'none'|'esplanade'|'park'|'plaza'|'cliff'; siteScore: number; template: string }
interface Bridge { id: Id; state: 'site' | 'built' /* site: two pinned bank vertices, no span, no way, no furniture, not drawn; built: a way's span laid through them (NP3-4) */;
  way: Id | null /* the way whose L1 edge between the two deck ends is the span; null while a site */;
  deck: [VertexRef, VertexRef] /* ('deck_end', bridge id, 0 | 1): the pinned bank-to-bank deck, perpendicular to the local flow or channel; once built, its span carries the structural `deck` role; held under a warp unless fromLevel = 0 (§3.6) */;
  over: 'river'|'moat'|'castle_moat'|'canal'|'carve'|'added' /* who emitted the deck: S1, S3, S5a, a carve edit, or one L0 shore-split batch for a deck no site offered on standing water — F-ROUTE's extra bridge, a drawn bridge (§4.2 S1 (5), §4.3, §4.4, §4.11, §7.4); a deck F-ROUTE's extra-bridge rung sites inside S1's water operator or a carve takes the value of that operator's other decks, since their batches place it (VD4-10) */;
  spanCm: Cm; deckCm?: Cm; kind?: 'stone'|'timber'|'draw'|'ford'; piers?: number /* deckCm, kind and piers are set by S7 when the bridge is built (§4.8) */ }
interface Greenery { id: Id; kind: 'park'|'garden'|'formal_garden'|'orchard'|'green'|'commons'|'avenue'|'street_trees'|'churchyard'|'market_green'|'esplanade'|'grove'
    |'wood'|'coppice'|'meadow'|'hedgerow'|'shore_band'|'ambient'|'yard_planting';
  face?: FaceRef; line?: ChainRef /* ('green_line', id): hedgerows, a role on L3 field boundaries */;
  along?: { way: Id; strip: FaceRef /* one half-corridor strip on the planting district's own side */; offsetCm: Cm } /* avenues and street trees: a row derived along the strip; no plat edge (§4.9) */;
  owner?: Id | 'commons'; rule: string; density: number;
  species: { kind: string; inner: number; outer: number; leafType?: 'deciduous'|'evergreen' /* read by §8.2's season rows; deciduous when absent */ }[] /* shares per species kind (§4.9) */;
  layout?: 'fan'|'semi_fan'|'grid'|'free' /* parks and groves, §4.9 */; paths?: FaceRef /* L3 path faces of a park layout (§4.9) */;
  overrides?: { seq: number /* the instance event */; at?: PointCm /* the current position of a move's `to` or an add's `point` */; recorded?: PointCm /* a line layout's recorded generated point */ }[] /* written when the instance event applies, moved only by a warp or vertex move (§7.4; VK2-13); model data, hashed with the entity; every kind that carries an `instances` mark has this field, per the entity registry */;
  lifecycle: Lifecycle }
  // tree instances: stamped at render from the `render.instances/<entity>` stream by ordinal (§6.1, §8.10); never stored; overrides are `instance` events (§7.1) whose current positions the entity's `overrides` table holds (§7.4, §8.10)
interface LandUse { id: Id; kind: 'arable'|'strip_field'|'meadow'|'pasture'|'commons'|'orchard'|'vineyard'|'coppice'|'wildwood'|'quarry'|'claypit'|'mine'|'lumber'|'fishery'|'saltpan'|'marsh'|'reserve';
  face: FaceRef /* L3 faces inside the hinterland's blocks: furlongs, lots, woods (§4.9) */; owner?: Id; furrowAxisCdeg?: number; crop?: string /* from the era / region crop table */; livestock?: string; rotation?: { scheme: string; slot: number } }
interface SiteResources { cellCm: Cm; ore: Float32Array; stone: Float32Array; timber: Float32Array; fish: Float32Array; clay: Float32Array; fertile: Float32Array }   // S1 output on the terrain grid, 0..1 per cell (§4.2)
interface Decoration { id: Id; kind: string /* pond, copse, stone circle, ruin, wayside shrine, boundary stone, gallows hill, … data-defined */; face?: FaceRef; point?: Point /* moves with its host face under a warp or a vertex move (§7.4; VK2-13) */;
  trail?: FaceRef /* the L3 path face to the nearest way corridor (§4.9) */; keepClearCm: Cm; rule: string; lifecycle: Lifecycle }
interface Pin { id: Id; kind: 'well'|'fountain'|'large_tree'|'cross'|'market_cross'|'shrine'|'pump'|'gallows'|'statue'|'monument'|'bandstand'|'campfire'|'fire_pit'|'stall'|'trough'|'lamp';
    point: Point /* moves with its host face under a warp or a vertex move (§7.4; VK2-13) */; host: Id /* the yard, square, corridor or plot face */; rule: string; lifecycle: Lifecycle }   // in the entity registry (§2.8) from M1; placed by §4.7 S11 / §4.9 rules and by stage 2 (II.3)
// Labels are model records `LabelEntity` and `QuarterNode`, defined in §9.1 (names, candidates, pinned and hidden placements; S13a)
interface Institution { id: Id; kind: string; plots: Id[]; buildings: Id[]; faction?: Id; roster: RosterRef; name: NameRef; reservation?: Id }
interface Household { id: Id /* the address: stable across re-derivation of its plot (§6.3); people are keyed by it */; plot: Id; building: Id; members: number /* size; people derived lazily */; wealth: number; tableVersion: string /* person tables at creation */ }
interface Person { id: Id; key: { household: Id; ordinal: number; bornEpoch: number }; status: 'worker'|'unemployed'|'retired'|'student'|'dependent';
  role: string; workplace?: Id; carer?: Id /* dependent → the person whose schedule it follows */; derived: true; pinned?: Partial<PersonFields> /* only by an explicit edit */ }
interface Faction { id: Id; kind: 'guild'|'religion'|'lordship'|'company'|'criminal'|'council'; seats: Id[]; turf?: Id[]; influence: number; secret: boolean;
  goals: { id: string; method: string; progress: number }[]; roles: { name: string; criteria: string; count: number }[]; template: string }
interface Government { kind: 'crown'|'seigneurial'|'ecclesiastical'|'chartered_commune'|'merchant_oligarchy'; seat: Id /* the institution */; offices: { name: string; seatClass: string; count: number }[] }
interface Religion { id: Id; name: NameRef; deities: { name: NameRef; domain: string }[]; practiceShare: number; clergyPerThousand: number; temples: Id[]; faction: Id }
// The relation store (FTG-9): schema in the base registry from M1; materialised by @plat/sim's first run, then persisted with lifecycle and reference integrity (§10.3)
interface FamilyUnit { id: Id; kind: 'couple'|'parents_children'|'single_parent'|'extended'; members: Id[]; households: Id[] }
interface Relation { id: Id; a: Id; b: Id; kind: 'partner'|'parent'|'sibling'|'carer'|'friend'|'rival'|'business'|'religious'|'affair'; since: number; lifecycle: Lifecycle }
interface Membership { id: Id; person: Id; faction: Id; role: string; since: number }
interface Posting { id: Id; workplace: Id; profession: string; filledBy?: Id; lifecycle: Lifecycle }
// The staged layers' records (owner-staged: floating islands and sewers are toggles after the city is mastered; the base carries these records empty)
interface SkyIsland { id: Id; outline: Polygon; elevationCm: Cm; terrain?: Terrain; terrainEcho?: { river?: Id /* the ground river it echoes */; relief?: 'echo'|'own' };
  key: PlatKey /* its own arena, part 1–3 (§2.2) */; districts: Id[]; reason: 'prosperity'|'institution'; institution?: Id; placement: { over: 'water'|'fields'|'outskirts'|'core'; byAssignment: boolean }; occlusion: 'opaque'|'ghost'|'offset' }
interface Tunnel { id: Id; kind: 'drain'|'main'|'culvert'|'passage'; centreline: ChainRef /* ('tunnel', id) in the underground arena */; widthCm: Cm; invert: ChainProfile /* 'invert_knot' on the centreline, below ground */; follows?: Id /* way */;
  outfall?: Outfall; serves: Id[] /* plots or buildings drained */; chambers?: FaceRef; rule: string }
```

People are never materialised in the document unless an explicit edit pins them (FTG's rule: "locked in" on manual
edit, never on view — LC-16, FTG-10): derivation is `derivePerson(seed, key, tableVersion)` under the person tables current
at the household's creation (`Household.tableVersion`), so a later table edit applies only to later households unless
the user re-derives existing people through a diffed action (§7.5 pattern). Which people a user has opened is per-user
view state outside the document. Content references geometry by id and never the reverse, so the map can be
regenerated without deleting content and content re-solved without moving the map.

**What the new wall, castle and water records settle.**
* **Open traces and the waterfront (FTG-8, COV-MFCG-C07).** An enceinte may be an open chain whose ends are anchored on a
  shore, bank, cliff or another enceinte; its enclosure is closed by the L0 shoreline for every "enclosed" and "sealed"
  test. `waterfront` is a preset row: `open` (MFCG's default and FTG's captured open chain: no wall along quays and
  beaches), `quay_wall` (a wall along the waterfront with a water gate at every quay access), `sea_wall` (a full wall
  with water gates only at the harbour mouth). `placement: 'aroundStage'` walls only a stage's new ring, anchored on the
  previous enceinte (FTG's "around stage lots").
* **Both faces unbuildable (MFP-9).** `setbackCm.inner` and `setbackCm.outer` are both unbuildable bands; the invariant
  "footprints ∩ (band ⊕ setback) = ∅ on both faces" is hard (§5.3), and ribbon plots start beyond the outer setback
  (§4.4).
* **Nesting and build order (GEO-38, NF-P5).** S7 cuts two L1 **wall strips** off the faces beside each trace — the
  band plus the inner setback inside (bounded by the setback line, or by the intervallum spine where the era row has
  one), the band plus the outer setback and glacis outside (or the berm up to a moat) — so the lane cutter never sees
  that ground: S8 does not cut a strip and its lanes end on the strip's boundary as they end on a reservation (§4.6).
  Wall bands, glacis, towers and gatehouses are `FaceRef` unions of per-side L3 parts, like corridors, built by
  `bandUnion` inside the strips by S10's shared-edge step (0) (§4.7), after S9 has committed the strips' corridors and
  eagerly, on both sides of the trace at once, before the derivation pool starts (the trace is shared by two
  districts' face sets, §3.3; J-I9) — so no L1 or L2 batch ever splits an L3 band face, and each part nests in the strip
  on its side of the wall edge.
* **Castles (COV-FTG-G09, COV-FTG-G10).** A castle is a reservation (§4.2 S3) with its own curtain, one town-side
  gatehouse on the bailey side facing the plaza (fixed at S3, so the castle street and a castle-moat deck exist before S4
  routes), a keep whose shape and position are template rows, internal paths
  (keep ↔ gatehouse ↔ wall stairs), an optional inner ward (an inset of the bailey with its own gate) and a surround row
  (esplanade, park with a perimeter path, plaza, cliff skirt, moat).
* **Bridges (GEO-17, NF-P4, NP3-4).** A bridge is a deck pinned bank to bank, perpendicular to the local flow or
  channel, emitted by whichever step makes the water: S1 at a river crossing site; S3 on the water it carves — at every
  gate across a city moat, at the castle gate across a castle moat, and along a canal at the crossing spacing row; S5a
  on an outer moat; a `carve` edit by its way rule (§4.11). It is emitted as a **site** — its two `deck_end` bank
  vertices on the shores and its record, with no span and no way — and becomes **built** when a way is laid through
  those vertices: its span is then the way's own L1 edge between them, carrying `deck` beside `way` (§2.2 rule 7), and S7
  builds the bridge furniture on it (§4.8). A deck placed on the way that uses it before its water exists — a carve's
  kept way (§4.11), an outer moat's arterial (§4.4), a kept way of S1's water operator (§7.3 (b) 3), and a deck F-ROUTE's
  extra-bridge rung sites inside one of these — is `built` from that operator's L1 batch, under a fresh `Bridge`, and
  its bank vertices are promoted to L0 when the water is inserted through them (§3.3). Ways route to a deck's endpoints as a fixed graph edge (§4.3). A site no way
  uses by the end of S5 stays a site: not drawn, named, labelled or exported (S13a names a bridge once it is
  built, and the renderer and the exports draw deck spans, which a site does not have), no furniture, outside §5.3's deck rows, and available to an epoch's
  growth, to a drawn bridge within `crossing.snapM` of it and to F-ROUTE's move rung (§4.2 S1 (5), §4.3, §4.4, §7.4). A
  deck where no site stands on water that already stands — F-ROUTE's extra bridge at generation or in S4's operator on
  standing water, a drawn bridge away from every site — is placed by one L0 batch of two same-level shore splits before
  its way is laid (§4.2 S1 (5)); so every bridge, whenever and however it is made, has one structure (J-I12, VD4-10).

**What the content records settle.** `Faction` gains goals, named roles with member criteria and a secret flag (COV-FTG-B12);
`Government` is a blueprint circumstance whose offices force seats (COV-FTG-B13, §10.2); `Religion` carries a generated
pantheon, practice share and clergy rate (COV-FTG-B14); `Person` carries a status and a carer (COV-FTG-C08); the relation
store holds family units, relations, memberships and postings (FTG-9, COV-FTG-C04). `SiteResources` makes raw-resource
availability a site property (COV-FTG-B09), `LandUse` carries crop and livestock (COV-NG-VS27), `Greenery.species` the
species mix (COV-FTG-I11), `Decoration` the hinterland decoration table's output (COV-FTG-I12), and `Pin` the complete
furniture vocabulary: statue, monument, bandstand, market cross, campfire, fire pit, stall (COV-FTG-J02, COV-NG-XB23,
COV-NG-CR23, COV-MFCG-I01, COV-FTG-J05, COV-FTG-E07). The placement rules are in §4.7 S11 and §4.9.

**The staged layers (AM-2, DEF-7).** `SkyIsland` and `Tunnel` are schema-complete hooks, empty in the base; the owner
stages both layers after the city is mastered. An island exists for one of two reasons (`reason`): a very prosperous
neighbourhood or set of neighbourhoods, or a unique institution (a palace overlooking the land, a cathedral, a prison
isolating criminals), by rule or by assignment; it may carry its own terrain that echoes the ground (a conjured river
with the ground river's bearing); it has no relation to the underground layer. A tunnel records what it drains, where it
falls (its invert profile, a `ChainProfile` on its centreline, §2.2 rule 5) and where it discharges, so the later sewer
rules (II.6) have their data model now (VK3-8).

=== REPLACE §4.1 Stage graph, evaluation model, laziness contract, transactions, the worker ===

### 4.1 Stage graph, evaluation model, laziness contract, transactions, the worker

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r5); earlier revisions fixall/integrate-r4, fixall/draft-pipeline-r4, fixall/integrate-r3, fixall/draft-pipeline-r3

```
S0 Blueprint ─► S1 Site ─► S2 Programme ─► S3 Siting, reservations, stage-1 boundary + trace ─► S4 Backbone ─► S5 Stage k (for k = 1 … K) ─────────────────►
 params, sub-    terrain, L0   roster demand,    centre(s) + plazas, lattice, gate picks,      L1 arterial     S5a boundary + trace + gates (k = 1: S3's trace committed;
 seeds, auto     water, river  plot quotas per   gate routes solved, field T, stage-1          graph: S3's     outer moats carved, k ≥ 2)
 features        decks,        stage × class ×   contour, gates, castle + its gate, trace;     gate routes     S5b main-road step (new primaries for stage k)
                 resources     band              L0 carvings + their decks + ponds; L1         + the rest      S5c growth of secondaries (regime rules; district scale in walled cores)
                                                 barrier faces (plazas, precinct, castle …)                    S5d capacity check (one bounded top-up)
     ─► S6 Districts, quarters, field pass 1 ─► S7 Wall strips + fortification lines ─► S7b Allocation + district claims ─► S12a Hinterland siting (no geometry)
        perimeter, grower over coarse faces,     setback / glacis lines, intervallum,     roster → districts, hinterland,     field system, outside sites and seeds,
        typing, quarters, FieldBands             gate plazas, castle paths, quays, piers  sky (staged); claims > 1 block;     decoration sites, crops (count-driven)
                                                                                          edge orchards → hinterland
     ─► S8 Infill (per district) ─► S9 Corridors (L2; districts + hinterland) ─► S10a Block allocation + field pass 2
        bent cuts, deep interior,                                                  ─► S10 (0) Shared-edge bands (eager, both sides
        rear lanes (L1); lane ends                                                      at once: each wall's band, setback, glacis, tower
        on bounding spines = seam portals                                               and gatehouse parts; margin bands, 2 m a side, on the perimeter and shared reservation boundaries)
     ─► per district in the derivation pool, and the hinterland unit on the generation worker, merged in lineage order:
        S10 Plots (per block; the hinterland's furlongs, lots, driveways, trails, orchards)
        ─► S10b Placement ─► S11 Site plans + footprints (per block) ─► S12b Greenery (own faces only)
     ─► S13a Names + label candidates ─► S14 Display list ─► S15 Simulation (optional module)
        (S13b label placement is view data, computed per zoom stop with the display list, §9.2; never in the model)
```

* **The graph is built from declared I/O (COV-VG-VN-002).** Each `Stage` registration declares `{inputs, outputs,
  streamKeys, invariants with their scopes, ladder, work-limit laws (operation counts over the batch scope's
  population-derived counts, §5.1 (5)), budgetMs per rung (reporting only), batch scope, lineageUnit, op form}` (§14).
  The **op form** is the transaction form of §3.3: *callback* for the stages whose ops read the faces earlier ops made —
  S5c, S8, S10 — and *declared* for S3, S4, S5a, S5b, S7, S9, S11 and an edit's inserted feature; every other stage
  (S6, S7b, S12b and the hinterland unit's stages) registers as *callback*, which is always safe. The pipeline is the
  directed acyclic graph those
  declarations induce, topologically sorted with the stage id as the deterministic tie-break; the base's registrations
  yield exactly the order drawn above, and a cycle is a registration error caught at load. A later product may register a
  stage that the base does not have (the village's density stage before its network, its palisade before its roads —
  PART III) without editing the pipeline. Each growth stage k runs S5a–S5d in order, and the same S5 runs incrementally
  for an epoch (§4.11).
* **Order rationale.** Water before roads, *including* every carved water body — harbour basins, canals, moats and the
  hinterland's decoration ponds are carved into L0 at S3 together with the decks their crossings need, so no street is
  ever laid on ground that later becomes water and no route meets water without a deck (FTG's order, `_critic.md` C12;
  GEO-19, NF-P4, NF-P7); the one water body that follows a later wall — an outer enceinte's moat — is carved by S5a
  through the carve path of §4.11 before that stage's secondaries grow, when the only ways it meets are the arterials
  through its gates. Programme before layout (FTG: buildings and people decided before geometry — kept as the *demand*
  side; geometry answers with capacity, O7). Large claims before streets: the castle bailey, the main plazas, the market,
  church precincts and large institutions are reservations inserted as L1 barrier faces at S3, before S4 commits any way
  (MFP-3); district-level claims larger than one block are cut out at S7b, before S8 cuts lanes (FTG's landmark-first,
  FTG-3). Walls before the streets they enclose: the first enceinte is one construction at S3 — the gate routes are solved
  on the lattice first, the stage-1 boundary is the travel-cost level set over them, the gates are where the routes cross
  it, and the castle weld and the moat are placed on the trace pulled from that boundary — so no later stage recomputes a
  boundary the gates, the castle or the moat were fixed on (NF-P1); each later stage's boundary and trace are fixed in S5a,
  gates first, *before* that stage's secondaries grow, so a secondary never crosses a wall except at a gate and the
  intramural fabric inherits the wall's direction (MFCG builds its wall before its bisection; GEO-18, MFP-2). Districts and
  the first field pass before infill (the infill's block band is the district class's, J-2). The wall strips before
  infill (S7 before S8), so no lane is planned through a wall's band and setback (NF-P5). The hinterland's decisions before
  placement (S12a before S10b), so the roster's farms, mills and quarries have outside sites to go to (FTG-7). Greenery
  after site plans (it reads yards and claims).
* **The laziness contract (LC-2, FTG-1).** A stage may run lazily for a scope X (a district, a block, a tile) only if its
  output for X is a pure function of eager upstream state and X's own sub-streams, it reads no other scope's lazy output,
  and it writes nothing outside X. Everything that decides the town's *content* is eager and town-wide: S2's roster, S3's
  reservations, S6's field bands, S7b's and S10a's allocations, S12a's hinterland siting, and S10's shared-edge step (0),
  whose bands lie on L1 edges two districts (or a district and the hinterland) share (§4.7; J-I9). The per-district stages that may
  run lazily or in the pool — S10, S10b, S11 and S12b, for every district and for the hinterland unit — read those
  records and their own district's sub-stream only and **write only inside their own faces**; S12b is held to the same
  rule as the others: a district plants avenue and street-tree rows only in its own half-corridor strips, and an edge
  orchard in the hinterland is a hinterland allocation row built by the hinterland unit, never by the district (§4.9;
  NF-P3). So any order of derivation — viewer order, worker order, headless order — gives the same model. S8 is eager: it
  runs in the generation worker, district by district in lineage order, and its only writes outside a district's own
  faces are the vertices where its lanes end on a bounding spine, each recorded as a `baseLane` portal in the shared
  `Seam` record (§4.6, II.1; NF-P6). The F-CUT substitution rung reads the district's allocation, never live roster
  state; S13a's names and label candidates are eager for every district, a name drawn from the entity's `naming` stream
  only for an entity without a predecessor or on a reroll (§6.3; VD2-10); label
  *placement* (S13b) is view data at every band, outside the model hash, and deterministic for a given zoom stop because
  it measures with the bundled fonts' own metrics (§9.1–§9.2).
* **The one-click first paint is the complete city LOD (SCL-4).** `generate({seed})` runs S0–S13a eagerly for every
  district and for the hinterland at city-band detail — every footprint with its wings and heights, every quarter and
  district label candidate, the hinterland's fields and the greenery faces — and S14 with S13b builds the city band's
  first frame. Laziness is restricted to what the city band does not draw: yard sub-part detail at district LOD, entrance
  glyphs, roof constructions and hatching, way names and addresses, pins below the city band, tree instances and crowns,
  stage-2 close-up detail and stage-3 compositions — each a pure function under the contract. **No rung shows a preview**
  (§8.5, J-R7): the first map is under one second with the derivation pool below for every TOWN and CITY request and for
  METROPOLIS up to ≈ 14 200 buildings; the slower first map above that knee (≈ 2.3 s at the 120 000 cap) and the
  single-worker knee (≈ 11 400 buildings) are declared in §12.5 for the owner's veto rather than hidden behind a partial
  picture (integration record, `docs/validation/fix-all/r1-integration-log.md` C-2).
* **The model digest (LC-2).** The model digest covers the eager model — everything the city LOD draws plus the
  allocation and field-band records; label placement is excluded as view data (§2.9, §6.2, §9.1; NF-D16: the document
  digest is the separate hash over the canonical bytes). CI derives every lazy output of 50 METROPOLIS seeds — every
  district's S10, S10b, S11 and S12b and the hinterland unit's, **S12b named explicitly** because its rows are the ones
  that border other districts (NF-P3) — in three random district orders and with pool sizes 0–3, and requires identical
  *derived-complete* digests (§6.5); a viewer's order can therefore never change the town.
* **Transactions: one level per batch, listed per stage (NF-P7; §3.3).**

  | stage | its batches, in order — each writes one level |
  |---|---|
  | S1 | L0: first the arena's outer ring — the frame plus its context margin (§3.2 (9)), one closed chain carrying the structural `margin` role on the arena's `Terrain` entity, so every L0 face has a boundary before any water exists — then water faces, shores and banks (a sea or river reaching the arena's edge shares that ring, one edge carrying both roles), islets, and every crossing site's two pinned `deck_end` bank vertices (each `Bridge` a `site` until a way is laid through them, §2.7) |
  | S3 | L0: harbour basins, canals, the castle moat, the city moat, the hinterland's decoration ponds, and the deck bank vertices of every channel it carves (each span is laid later by the way through them, §2.2 rule 7) · then L1: the **map border** — the frame rectangle of §3.2 (9), one closed chain carrying the structural `border` role on the arena's `Terrain` entity, laid across land and water alike as a deck span lies across its water (no L0 edge is added, §2.2 rule 1) — and the land reservations as barrier faces (plazas, precinct, market, castle bailey), independent ops of one declared batch |
  | S4 | L0, only when F-ROUTE's "one bridge at extra cost" rung fires on standing water (§5.2): the new deck's two `deck_end` bank vertices, by two same-level shore splits, nothing cleared (§4.2 S1 (5)) — inside S1's water operator or a carve, whose water is not yet inserted, the rung only sites the deck, and that operator's L1 batch places its bank vertices on the route and its L0 batch promotes them (§4.2 S1 (5), §7.3 (b) 2–4; VD4-10) · then L1: the arterial graph's spines, inserted once, each span laid through the deck ends its route uses (those bridges become `built`, §2.7) |
  | S5, per stage k | k = 1 — S5a L1: S3's trace with its gate vertices · k ≥ 2 — S5b L1: main roads, picked on the stage's boundary (data, no batch), then S5a L1: the trace with every arterial crossing as a gate, then an outer moat's carve batches (L1: each arterial's crossing made one straight edge between two deck bank vertices, its deck span; L0: the channel, with those vertices as `KernelTx.prepared`, §3.3, §4.11) · every k — S5c L1: growth, then L1: the between-stage prune and trim · S5d: a top-up re-runs S5a's arc and S5c on the rim, each L1 |
  | S6 | L1: the settlement perimeter chain, then district owners and `district_bound` roles (one batch) |
  | S7, per enceinte | L1: setback and glacis lines (the wall strips), the intervallum, gate-plaza claims, castle paths and inner-ward trace, quays, piers and moles |
  | S7b, per district | L1: district claims (`claimSubFace`) |
  | S12a | none — siting decisions only; the hinterland's geometry is written by its unit's S10–S12b |
  | S8, per district | L1: lanes, rear lanes and through-alleys with their T-junction ends |
  | S9, per district and for the hinterland | L2: `corridorUnion` |
  | S10a, S10b | none — allocation and placement records; field pass 2 is a raster |
  | S10 | L3, step (0): eagerly on the generation worker after S10a and before the pool's freeze, the shared-edge bands on both sides at once — per enceinte, its wall-strip blocks' band, setback, glacis (or dry ditch, §4.8), tower and gatehouse parts; the margin band — half-width 2 m (2 m on each side; a table value ≥ the residue class's minimum width) — along the settlement perimeter and any reservation boundary two districts share (§4.7, §3.3; J-I9) — ending with the rebuild of the L3 static partitions it touched, before the freeze (VK2-1) · then per block, in the pool: claims, plots, alleys-as-faces and residue; in the hinterland unit's blocks, furlongs, outside lots, driveways, trails, woods and edge orchards |
  | S11, per block | L4: footprints and yard parts (a row's party walls are one shared L4 edge, §4.7) |
  | S12b, per district and for the hinterland unit | L3: park and grove layouts on its own reserved green faces and residue · then L4: yard-planting parts; avenue and street-tree rows write no plat edge (§2.7 `Greenery.along`); each batch whose commit record changes a footprint face's rings — a formal-garden grid line or an orchard part's edge ending on a house wall — is followed by §2.6's carry for that building before the next (NP4-3) |
  | edits | one batch per operator and level, in §7.3's chain order, validated together in the dry run (§3.3, §7.1); a conversion that must touch several levels (a carve, `wallToWay`) is a declared sequence of single-level batches (§4.11); a deck an edit needs where no site stands on standing water (a drawn bridge, F-ROUTE's extra bridge in S4's operator) is one L0 batch of two shore splits before the way's L1 batch (§4.2 S1 (5), §7.4), and inside S1's water operator or a carve the rung's deck is placed by that operator's L1 batch and promoted by its L0 batch (§7.3 (b) 2–4; VD4-10); every committed batch that changes a footprint face's rings is followed by §2.6's carry (NP4-3) |

  L0 is therefore written by S1, S3, S4 (F-ROUTE's extra bridge only) and S5a (an outer moat's carve, §4.4), and L1 by
  S3 — the map border first — S4, S5, S6, S7, S7b and S8, in that order, and by no generation stage after S9 (VK3-8;
  *Judgment J-P46:* chose the arena's outer ring as an L0 chain written first by S1 and the map border as an L1 chain
  written first by S3's L1 batch, over both at L1 — every L0 face needs a boundary and the sea and the rivers run out to
  the arena's edge — and over the border at L0, which is land and water only and would split every water body the frame
  crosses; laid after S3's L0 batch, the border meets no generation L0 insertion — S4's shore splits keep `attractCm`
  from it (§4.2 S1 (5)) — and an outer moat's carve and an edit prepare it as §3.3 rule 2 states); S10
  never writes L1 — a
  rear or back lane is decided by S8's deep-interior rule (§4.6), and a lane a user adds later is a `drawWay` edit
  through §7.3's S5 operator, whose tree scoping re-derives every finer level under it (GEO-25). Static spatial indexes
  are rebuilt at stage end, never per batch, and S10's eager step (0) ends like a stage: it rebuilds the L3 partitions
  it touched before the pool's freeze, so the frozen copy carries the static partitions of L0–L3 and every dynamic grid
  is empty at the freeze (§3.3 pool step 1, §3.10; VK2-1); a freeze after edits first rebuilds every partition the edits
  left dirty, at every pool size (VK3-5); each stage's `workLimit` counts kernel operations, never
  milliseconds, and the wall-clock watchdog lives in `@plat/api`'s worker host and only reports (§5.2 F-BUDGET-TIME).
* **The generation worker, the derivation pool and the hinterland unit, decided now (DEF-16; D-18; NF-P8).** The
  pipeline runs in one generation Web Worker with transferable buffers and incremental delivery; the tile worker rasters
  tiles from the display list and the main thread composites the transferred tiles (§8.9 — nothing model-sized reaches
  the main thread; N-20), behind the worker boundary of §8.9 / §11.2. The **primary configuration** at every rung adds a
  derivation pool of up to three workers (`min(3, hardwareConcurrency − 1)`) for the per-district stages S10, S10b, S11
  and S12b, which run after the eager S10a allocation and S10's eager shared-edge step (0). Because the laziness contract
  makes each district's output a pure function of eager state, its allocation and its own sub-stream, districts run in
  parallel, each on its own copy-on-write overlay over a read-only copy of the arena
  frozen after those two eager steps — its typed arrays and lookup tables and every non-empty level's static index
  partitions (L0–L3 at the one-click freeze; L4 too after edits), with every dynamic grid empty, the partitions edits
  left dirty rebuilt first (§3.3 step 1; ≤ ≈ 15 MB at CITY, VK3-6) —
  and merge in district lineage order with a
  slot remap and their index partitions — §3.3's merge steps; any write outside a district's face set is `E_SCOPE`, and
  pool size 0 runs the same path in the generation worker. Addresses and lineage keys derive from lineage (§6.3), so no
  id ranges are reserved, and there are no shared-edge writes (district boundary edges belong to L1/L2, committed before
  S10). **The hinterland unit** — the hinterland pseudo-district's S10
  (furlongs, outside lots, driveways, trails, woods, edge orchards), S10b (outside classes and farm households), S11
  (farmstead and outside site plans) and S12b (ring supply, ambient scatter, shoreline band) — runs **on the generation
  worker while the pool workers run the districts**, on its own overlay over the same frozen arena. Its faces are the
  hinterland's L2 blocks, disjoint from every district's, so its overlay obeys the same merge rule and merges with the
  districts' in lineage order (its lineage is the hinterland pseudo-district's); from the freeze to the merge no other
  writer touches the arena. On the single-worker fallback the hinterland unit runs first, then the districts in lineage order.
  While a loaded document is verified (§2.9 step 3), every edit runs its per-district stages S10, S10b, S11 and S12b in
  the generation worker by the pool-size-0 path (§3.3 step 5) — identical digests by construction — so the pool freezes
  no copy while a pool worker holds the verification replay's model (VD3-5).
  **Measurement:** M1 (TOWN and CITY) and M2b (METROPOLIS) run each band's bottom, target and top with the pool and
  with one worker on the same B-CITY-lite generations, in §12.1's timing phase; the pool stays primary at a size when
  its p95 is within the pooled law + 10 %, below the single worker's p95 there, and the model digests are identical
  for pool sizes 0–3 on 200 seeds, with §12.3's pre-decided outcomes — a size range where the single worker measured
  faster runs with pool size 0, which gives the same model (§3.3 step 5) (NR3-1). **Pre-decided fallback:** the single-worker configuration (§12.3's fallback
  column) — also used on the low tier and in hosts that forbid extra workers; the golden suite already runs pool sizes
  0–3 and requires identical digests (§6.5, §13.2), so the switch is a configuration, not a redesign.
  *Judgment (J-P10, reconciled with J-R18 at integration):* chose the pool as the primary configuration, measured at M1
  with the single worker as the pre-decided fallback, over single-worker-first, because after the eager allocation the
  per-district stages share no writes, and by the laws the pool keeps CITY's p95 within 300 ms up to ≈ 5 200 buildings (a single worker: ≈ 3 770) and moves
  METROPOLIS's one-second knee from ≈ 11 400 to ≈ 14 200 buildings (§12.3, §12.5). *Judgment (J-P27):* chose to run the hinterland unit on the otherwise idle generation worker
  as one more overlay of disjoint faces over keeping the field partition as an eager L1 stage before S8, which would add
  its ≈ 12 ms to CITY's p50 critical path (§12.4's sum, ≈ 255 ms with round 4's counted index copies, to ≈ 267 ms;
  NP3-8), because the fields are L3 content of the hinterland's own blocks and
  the generation worker waits for the pool anyway.

=== REPLACE §4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, reservations, the stage-1 boundary and its trace ===

### 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, reservations, the stage-1 boundary and its trace

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r5); earlier revisions fixall/integrate-r4, fixall/draft-pipeline-r4, fixall/integrate-r3, fixall/draft-pipeline-r3

**S0 Blueprint.** `Blueprint = { version, seed, size: { rung: TOWN|CITY|METROPOLIS, population? | areaHa? | buildings?, tolerance, aspect /* 0.5–2, default 1: frame width ÷ height, §3.2 (9) */ },
intent (§7.7), site request (coast side / bearing with two arm rows, river with inflow bearing, islands and mouth, lake,
hill, …), toggles (walls, castle: 'inside'|'on_enceinte'|'outside'|'auto'|'none', castles: 0–2, plaza, temple, harbour,
farms, forests, shanty, greens, waterfront: 'open'|'quay_wall'|'sea_wall', wallPlacement, moat: 'none'|'inner'|'all'|'auto' /* the
innermost enceinte (S3) or every enceinte (outer ones by S5a's carve, §4.4) */ — MFCG's flags kept as intent),
circumstances (era, government, biome, economy, landscape toggles: fertile land, mines, quarries, fishing, logging),
style, assignments, edits }`. Parameter expansion (intent → the ≈ 200 internal parameters) is a pure function held in data
(§7.7). The blueprint's assignments and edits become log events at positions 0…k when the document is created (§2.9,
§7.7); the entry mode is the recipe field `entryMode`. **Size by population (AM-4).** The population chooses the rung by
its band (§1.1); a rung without a population takes the rung's target; a rung with a population outside its band is an
F-EDIT conflict offering the right rung (§5.2), and a population below the TOWN floor of 1 500 is routed to the village
product by `LadderRouter` (§1.1, D-33). **Auto features (COV-MFCG-A03).** Every toggle left on `auto` is resolved by a per-rung **feature table** —
P(coast), P(river), P(castle), P(castle on the enceinte), P(temple), P(harbour | coast), P(shanty), P(greens) … — drawn
once from its own concern `blueprint.features` before any other stage, never redrawn by a later rung, so "Enter" varies
the structural features the way MFCG's master switch does; every auto-resolved value is recorded in the report with its
reason (O16 b). **What the base supports, stated (COV-MFCG-Q01).** Several enceintes (§4.8); 0–2 castles (a second castle
is a citadel on the outer enceinte, by request or by the METROPOLIS row); islands, confluences and distributaries (S1);
non-circular and multi-cluster (polycentric) settlements (S3); routed non-radial arterials (§4.3); generated institutions
(S2); multi-line labels (§9); continuous zoom, save and load (§8, §2.9).

**S1 Site (O1; the mechanism that removes whole-map restarts).** (1) **Heightfield**: 5-octave fBm (VG's measured
character, `_critic-vg-ng.md` V7) with a low base frequency and a relief-character amplitude (flat / rolling / hilly /
mountainous, metres by class) plus **authored site primitives** from the request (hill, spur, valley along the river
bearing, terrace, cliff, ravine, hollow for a lake — VG's `createMount/Hollow/Ridge` idea); heights are stored in the
range and datum §2.3 declares. *Mechanism the budget assumes (§12.4, SCL-3):* the fBm is evaluated on a 32 m grid over
frame + margin; the stored raster (TOWN 5 m, CITY 8 m, METROPOLIS 10 m) is its bilinear refinement plus one fine octave
inside the built extent; slope queries at 2.5 m go through the `TerrainSampler`'s on-demand interpolation (§2.3).

(2) **Coast.** From a sea bearing (MFCG's `sea` angle kept as the request's coast bearing) and an intent (bay / headland /
straight / fjord / islands), one **closed-outline routine** draws the sea polygon. *Arms (COV-FTG-H04):* the base line is two
arms from a point near the town toward two frame edges, each arm with its own **shape** row (smooth / gentle / sharp: the
lateral amplitude and count of the arm's 3–5 control points, then a centripetal Catmull-Rom through them) and its own
**detail** row (none / bays / deep bays / rough / jagged: fBm amplitude, frequency, warp strength and, for bays, the count
and depth of indentations) — our own values, all calibratable. The base line is displaced by domain-warped fBm with an
amplitude envelope that damps detail near the town (FTG's "ease into detail") → resample → Chaikin. **Simplicity
(GEO-13):** the normal displacement at every sample is clamped to 0.8 × the local feature size on that side (the distance
from the sample to the base shape's medial axis, taken from its straight skeleton — for an open arm, the distance to the
facing arm or the frame), which keeps small islands, elongated ovals (whose end radius is ≈ b²/a) and fjords simple for any
fBm draw; if the resampled ring still self-touches, a non-zero union repairs it, the component containing the anchor (the
town side) keeps the outline's id, and every other loop is typed by rule — a land loop in the sea above the minimum islet
area is an `islet`, a water loop on land above the minimum pond area is a `pond`, anything smaller is absorbed — and
reported. Property test: 10 000 outlines per intent → 0 self-intersections, 0 untyped loops. **Contours and coast
(GEO-14):** the vector coast is authoritative; the raster is lowered below sea level on the sea side and every land cell
within two cells of the shore is raised to at least sea level + 10 cm (every sea cell at most sea level − 10 cm), and
contour lines are not model geometry: they are extracted per render tile by marching squares and **clipped to the land
faces in vector space before emission** (§8), so a contour cannot cross the shore on any coast, cliffs and sub-cell spits
included; steep-coast and cliff fixtures are in the golden suite. The same routine with a closed base curve makes lakes
(from sinks), ponds, islands (a raised closed curve) and — with `elevationCm` set — **the floating-island outline of the
LAYER hook**, which gets its own arena, `Terrain`, datum and frame (§2.2, §2.3) and may carry its own terrain from the
same S1 with a request that echoes the ground (e.g. a conjured river with the ground river's bearing; AM-2); its ground
footprint lies over water, fields or outskirts by default and over the built core only by assignment (`SkyIsland.placement`,
§2.7), and its occlusion is §8.4's `LayerSpec.occlusion`. For a standalone or sky outline the base curve comes from an **outline
template** row — disc, D-shape, lozenge, crescent, spindle — scaled to the requested area (COV-NG-N06; II.1).

(3) **Hydrology.** Priority-flood sink filling with the flat resolution §2.3 declares (a bucket-queue priority flood on the
integer heights of the hydrology grid `Terrain.hydro` over frame and margin — 16 m at TOWN, 25 m at CITY, 32 m at
METROPOLIS, §2.3, §12.4), D8 flow direction and accumulation; **rivers by descent**: the inlet on the arena's upstream edge
(frame + margin; from the requested bearing or the highest edge), so the drawn margin shows the river arriving, the
course traced by steepest descent with a lateral meander term — a Chaikin-smoothed control polyline whose knots sit
mostly on alternating sides, our own construction; VG's live course is a different one, a terrain-independent spline
through 6–7 control points laid before its terrain (COV-VG-WC2) — **the terrain carved to the course** (after the carve,
D8 is recomputed on the carved corridor and accumulation once, §2.3) so the river always
reaches the sea, a lake or the frame; width `w = w0 · acc^0.4` clamped to the class band (FTG's ≈ 31 m mean river width at
CITY is one calibration point); tributaries by the same rule from secondary inlets. **Bounds (GEO-36):** knot offsets are
clamped to half the control spacing (the table value `river.controlSpacingM`; S1 records the course's control knots in
`WaterBody.controls` with ordinals in course order, §2.3, as the recorded input a `moveCourseKnot` edit addresses,
§7.1; VK2-12) and the course is tested for simplicity (a self-touching course is re-traced with the
offsets halved); carving is capped at `carveMaxCm` (table: 400 cm at TOWN and CITY, 600 cm at METROPOLIS) — a course that
would need more is re-routed by the F-RIVER rung (re-trace from the last good knot, then move the inlet), never trenched.
**Mouths (IMP-9, COV-FTG-H11):** `mouth: 'estuary'` is a widening width profile (`deltaRiver` in MFCG is a widened mouth,
`_critic.md` C15); `mouth: 'delta'` splits the course inside the delta zone (within the table's distance of the sea, where
the bed slope is below its threshold) into 2–4 **distributaries** at splits spaced ≥ 3 channel widths, each carrying a
share of the accumulation drawn from the `water.delta` stream (each ≥ 0.2), each of width `w0 · (share · acc)^0.4`, each
traced by descent to the sea without rejoining; a distributary that would meet another merges, and the land between
becomes a river island under rule (4).

(4) **River islands** (the parity judge's shared repair): a `river: { islands: n }` request adds a branch that leaves the
course and rejoins it after k cells, typing the enclosed land as an `islet` L0 face, **only if** the branch's separation
from the main channel stays ≥ (w_main + w_branch)/2 + the minimum islet width (table: 20 m); otherwise the island is
reported as not built. Mid-channel islets appear at reaches wider than a table threshold with a per-reach probability.

(5) **Crossing sites and decks (GEO-17, NP3-4).** One function, `siteCrossings(reaches, bandM, existingDecks)`, sites
crossings: S1 runs it over every reach, S1's water operator (§7.3 (b)) over the re-traced reach only. The narrowest /
shallowest reaches within the search band (`crossing.searchBandM`, table default 120 m) become crossing sites, typed
`ford` (width < table) or `bridge_site`, with a minimum spacing (FTG's 40 m as the table default). Each site is emitted
as a **pinned deck**: a bank-to-bank segment perpendicular to the local flow (the course tangent averaged over one
channel width upstream and downstream), its endpoints on the banks — inserted by S1's L0 batch into the shores as the two
`deck_end` vertices of a `Bridge` in state `site`, pinned against every later smoothing. **A site becomes a bridge only
when a way uses it** — as FTG turns only the crossing road proposals into bridges, gated by its 40 m minimum distance,
and MFCG draws one bridge per street crossing (1–4 per city; `research/findings/ftg-docs-params.md`,
`profile-mfcg.md`): the way S4 or S5 routes through its two vertices lays its span, the way's own L1 edge between them
carrying the structural `deck` role beside `way`, and the `Bridge` becomes `built`, with its way, and S7 builds its
furniture (§2.7, §4.8) — so no L0 edge crosses the water and no deck splits a reach's L0 face (§2.2 rule 7; J-I12). A
site no way uses by the end of S5 stays a `site`: two pinned bank vertices and a record, no span, no way and no
furniture, not drawn, and outside §5.3's deck rows; an epoch's growth (§4.4, §4.11), a drawn bridge (§7.4) and
F-ROUTE's move rung (§4.3) may use it later. S3's decks on the water it carves (S3 (2), (10)) have the same form and the
same two states. S4 routes to a site's endpoints as a fixed graph edge (§4.3), so "bridges within ± 10° of the channel
normal" holds on the way itself by construction. **A deck where no site stands** on water that already stands — F-ROUTE's
"one bridge at extra cost" rung (S4 at generation, after S1 and S3 committed every shore; S4's operator in an edit that
moves no water), or a drawn bridge with no site within `crossing.snapM` (table: 20 m,
half the minimum spacing) of the point where it crosses the channel's centreline — is placed by **one L0 batch of two
same-level shore splits**: `splitThrough` at L0 on each shore at the deck's bank point, perpendicular to the local flow,
with the `deck_end` row of a fresh `Bridge` (`over: 'added'`), pinned; a street end already within `attractCm` of that
point (a vertex carrying a `way` row) is attracted onto and promoted (§3.6), and any other bank point keeps `attractCm`
from every vertex on the shore's route — the map border's crossing included — by the placement rule; nothing is cleared, and the finer faces whose
rings run along the shore gain the vertex (§3.3's same-level-split rule). The way's L1 batch then lays its span through
the two vertices, as at a site (§2.2 rule 7; J-I12, J-P44). **Inside an operator whose water is not yet inserted
(VD4-10)** — S1's water operator (§7.3 (b)), which chains S4's, and a carve (§4.11), whose kept ways S4's operator
re-routes — the new shores do not exist when the rung fires, so the rung only **sites** the deck, as data, with every
other crossing of that operator (§7.3 (b) 2): its two `deck_end` vertices are placed on the way's new route at the new
bank points, under a fresh `Bridge`, by the operator's L1 batch (§7.3 (b) 3; §4.11 batch (1)), and promoted to L0 by
its L0 batch when the water is inserted through them (§7.3 (b) 4; §4.11 batch (2)); no shore split runs, because the
shores that exist then are the ones the L0 batch removes.

(6) **Harbour candidates**: coast faces with depth ≥ threshold. (7) **Bank classes and bay / headland (COV-FTG-H06):**
every shore segment is classed `bay`, `headland` or `straight` (`WaterBody.shoreClass`, §2.3) by the signed curvature of the shoreline smoothed over
200 m (thresholds in a table); its bank kind — beach / rock / cliff / quay / marsh — is drawn from a per-class weight
table (our own weights) conditioned on slope and exposure (G-R5), so bays tend to beaches and headlands to rock and
cliff; the class is kept per segment for the shore decoration of §8. (8) Water faces enter L0 with `shore` / `bank` edges;
land components by flood fill (MFCG's `buildDomains`); every land component gets uses later (O14 g). **Shore setback
(COV-FTG-H07):** a table `shoreSetback` per bank kind (plots: beach 6 m, marsh 10 m, rock 3 m, cliff 5 m from the edge,
quay 0 m because quay plots front the quay way; fields: 10 m) is read by S10 and the hinterland unit (§4.9); the band is typed `shore` greenery
or commons. (9) Drainage stays queryable. (10) **Resources (COV-FTG-B09):** `SiteResources` rasters on the terrain grid —
stone from slope, rock class and cliffs; ore from relief times an fBm propensity (hills only); timber from the forest
propensity (slope and soil class, realised as woods by the hinterland unit, §4.9); fish from water adjacency and reach width; clay from low
damp river flats; fertile land from gentle, dry, non-rock ground. The S0 landscape toggles clamp a kind to zero or raise
its floor. S2's resource gates and S12a's outside sites read these rasters.

**Restart-free by design**: if a requested feature is infeasible on the drawn site, S1 adjusts inside its own ladder
(F-RIVER, §5.2) — the source moves along the frame edge, a sink is carved deeper within its cap, the course re-traces —
never the whole map.

**S2 Programme (the roster demand side; O7).** From `population` (or derived from area / buildings by the size tables):
households by wealth band, institutions (market, temple, churches per capita, guild halls, inn, mill on water, tannery;
the seats the `government` circumstance forces — a crown seat or a lord's castle or keep, a bishop's palace, a town hall
or guildhall, per §10.2, COV-FTG-B13), building demand per class from **our own** dependency tables run as the
**sequential, prefix-stable roster** of §10.2 (FTG's idea, none of its values), with resource gates read from
`SiteResources` ("no farmland → no farms, shops instead"). Outside classes (farmsteads, mills, quarries, lumber yards,
fisheries, mines) are demanded here, sited by S12a and placed on the outside plots the hinterland unit builds (FTG-7).

*Demand in plot counts (FTG-2).* Stage demand is **plot counts per class × band**: `n(c, b, k)` = the class's demand ×
the band shares × stage k's quota share. Residential band shares are the roster's household wealth shares (the character
vector shifts them); workplace bands come from the class row's lifestyle band. The stage's land is
`A_k = Σ_(c, b) n(c, b, k) · plotArea(c, b) / plotShare(regime_k)`, with `plotArea` the *plot* area of the granularity
table's band centre (§4.7; footprints and coverage are not in this formula) and `plotShare` the measured share of a
stage's land that is plots (the rest is corridors, squares, greens and residue): **dense core 0.62** — MFCG's gross lot
cover inside the wall is 0.60–0.65 at sizes 40–250 and its lots are plots in our sense (`captures/mfcg/exports-sweep-
2026-09-25/README.md`, CONFIRMED) — gapped rings 0.55, ribbon 0.45 (PLAUSIBLE). *Judgment:* chose plot counts per band with
a measured plot share over the synthesis seat's single area per class with `builtBlockShare = 1 − 0.38`, because FTG's 38 %
is footprint over lot, not plots over land, and one area per class ignores the 11× plot-size spread across bands.
**Measurement:** M-1 #5 (FTG face recovery) measures FTG's plot share; M1 measures B-CITY's own per regime. **Fallback:**
if S5d's top-up fires on more than 10 % of B-CITY seeds at a rung, the `plotShare` rows are refitted from B-CITY's
measured share per regime by one scripted pass, with a declared golden shift (§13.3).

*Stages and the walled share (MFP-6).* Stage rows per rung (a table, era-calibratable): **TOWN** 2 stages — walled core
0.90 of buildings, ribbon 0.10; **CITY** 3 — inner walled 0.55, outer walled 0.33, ribbon 0.12; **METROPOLIS** 4 — inner
0.30, middle 0.30, outer 0.28 (all walled), ribbon 0.12; the FTG cul-de-sac **suburb** regime is added only by the era or
form preset or by the shanty toggle. The share inside the outermost wall is thus ≈ 0.9 at TOWN and ≈ 0.88 at CITY and
METROPOLIS, anchored on MFCG's measured 0.87–0.92 inside the wall at sizes 40–250 with shanty towns off (sweep README,
CONFIRMED). *Judgment:* chose MFCG's walled share over the synthesis seat's 0.35–0.5 (an addition to D-2, not the owner's
era default) because a mostly-extramural default reproduces MFCG's size-80 shanty case, the wall is the town's signature
silhouette (R6), and a compact walled town with ribbons on its approach roads is the historically constrained medieval
pattern; FTG's ≈ 20 % walled preset stays reachable as a preset row, and the corpus phase recalibrates the rows. Output:
`Roster` (demand by class with area / frontage requirement classes, district affinities, wealth bands) and `StageQuotas[]`
(plot counts per class × band, land area, regime per stage: dense core → gapped rings → ribbon, plus the optional suburb;
FTG's zonal gradient, R4).

**S3 Siting, reservations, the stage-1 boundary and its trace (the large decisions, made before any street).** S3 decides
everything the first enceinte depends on in one construction and commits it in two batches — L0 (every water body it
carves, with the decks its crossings need) and then L1 (the land reservations) — before S4 commits a single way (NF-P1,
NF-P4, NF-P7).
1. **Centre(s).** Candidate centres on a coarse lattice inside the frame's middle third are scored by a rule table:
   distance to a crossing site (river towns sit at fords and bridges), to the harbour candidate, slope, elevation above the
   flood line, wind exposure, distance from the frame, plus a controlled random term; the best is the **centre / market**.
   **The site is placed relative to the river** (G-P14), so "no river through the core" cannot occur when a river is
   requested; the invariant is checked here and repaired by moving the centre, never by re-rolling. **Polycentric forms
   (IMP-9, NF-P10):** the `twin-town` and `polycentric` form rows site k = 2–3 nuclei (candidates inside the frame's middle
   half), each scored the same way, each with its own share `A_1,i` of stage 1's land (a form-row share), its own main
   plaza (2) and its own gates (4); the market sits at the highest-scoring nucleus. Nuclei are sited at least the
   **separation floor** apart: `sep_ij = τ(a₁) · (R_i + R_j) + (outer setback + glacis)_i + (outer setback + glacis)_j + g`,
   with `R = √(A_1/π)` a nucleus's equal-area radius, `τ(a)` the tip factor of the anisotropic level set — its reach along
   a road over R: table 1.2 at a = 1.3 and 1.4 at a = 1.8, above the executed 1.13–1.18 and 1.24–1.34
   (`docs/validation/bench/fixall_pipeline_r2_levelset.out`, this lane), and τ = a for any other a, a safe bound because
   the reach along a road is a times the off-road reach, which never exceeds R — and `g` one ribbon plot depth (30 m). The form
   row's separation band runs from that floor to 400 m beyond it (≈ 800–1 200 m for two 29 ha nuclei at TOWN, where the
   old band's 400 m floor left the level sets overlapping by ≈ 200 m); the ground between the nuclei is grown as an
   extramural regime in S5.
2. **Plazas and the reservations that do not read the boundary (MFP-3, GEO-19).** The **main plaza** of every nucleus
   (area band TOWN 0.25–0.45 ha, CITY 0.35–0.6, METROPOLIS 0.45–0.8, anchored on MFCG's 0.32–0.58 ha across sizes 40–250
   and the red team's 0.36–0.54 ha; a compact 4–6-vertex polygon at the nucleus aligned to the contours, compactness ≥ 0.8;
   its vertices are the attach points arterials end at, so the plaza acts as MFCG's roundabout); the **temple or
   cathedral precinct** adjacent to the main plaza by score, sized from its institution row; a separate **market square**
   when the roster asks for one (CITY and above); the **harbour basin** (a template shape: rectangle, semi-octagon,
   semi-hexagon, L wide or narrow, scaled to port demand) at the chosen harbour candidate; and **canals** along a
   least-cost line between two water bodies, each carrying crossing decks at the spacing row `canalDeckSpacingM` (table:
   150 m inside the predicted built extent, 600 m outside it), each deck a bank-to-bank segment perpendicular to the
   channel with its bank vertices pinned — the form of S1 (5)'s decks. These are planned polygons at this point: the
   lattice sees them as reservations and water (water impassable except along its decks), and they are committed in (10)
   and (12) (NP3-8).
3. **Lattice and costs.** S4's candidate lattice and its edge costs (§4.3) are built here, once, over the planned water
   and reservations of (2).
4. **Gate picks and bearings (MFP-4, COV-MFCG-E04).** `N₁` (per nucleus) = the request, or `round(1 + 0.47 · √A_ha)` with
   A the stage-1 land — a law that reproduces MFCG's 5 / 8 / 12 gates at sizes 40 / 80 / 130 from their walled areas of
   58 / 220 / 548 ha (and 18 at size 200) (`docs/validation/bench/fixall_pipeline_mfcg_fits.out`, from the sweep README).
   Picks are **sequential nested picks** from the `gate.pick` stream on the **pick contour** — the level set of stage 1's
   land in the terrain-only field (a = 1), which serves only to score candidates: pick i scores the contour's candidate
   points by angular gap to the earlier picks, nearness to a requested bearing, terrain (saddles and valley exits score
   up, steep ground down) and a jitter, so a smaller N is always a prefix of a larger one. Each pick carries a **bearing**:
   the requested bearing it serves or, when none was requested, the least-cost outward direction from the pick to the
   frame. A polycentric nucleus's first picks are forced at the bearings of its adjacent nuclei. **The harbour pick
   (NP3-7; J-P45).** When the town has a harbour (the basin (2) plans at the chosen candidate) and `N₁ ≥ 1`, let `L*` be
   the path to the harbour's destination node (13) in the plaza-rooted Dijkstra tree over (3)'s lattice — the tree (5)
   routes the gates with, computed here once — from the plaza of the nucleus nearest the harbour: the least-cost lattice
   path with the wall ignored, since no wall exists yet. When that node lies outside the pick contour,
   that nucleus's first unforced pick is **forced** at `L*`'s first node beyond the contour, after any polycentric
   forced picks, so a smaller N is still a prefix of a larger one and N is unchanged. **If that nucleus has no
   unforced pick left (NP4-4)** — its `N₁` taken by polycentric forced picks: a nucleus of under about 10 ha between two
   neighbours, whose law gives `N₁` = 2, or a twin town's requested `N₁` = 1 — no pick is forced and its forced picks
   stay; the detour guard of (7) applies to that town unconditionally, whatever M1's measurement finds, so its harbour
   route is bounded by 1.5 × `L*` through an existing gate or through the harbour gate the guard places on `L*`. The pick's outward bearing is the
   least-cost outward direction to the frame, as for an unrequested pick: the harbour is a destination, not an exit, and
   a bearing into the sea routes nowhere. Its gate route's inward part is `L*`'s own prefix (a subpath of a least-cost
   path is least-cost), so a walled port has a main gate on its harbour side and the harbour route (11) leaves through
   it. *Measurement (M1):* the committed harbour route (11) against `L*` on every B-CITY walled coastal seed — p99 of
   the ratio ≤ 1.5 — and ≤ 1.5 on every §13.2 walled coastal fixture. *Pre-decided fallback:* the **detour guard** of
   (7). Where the river crosses the boundary, **water gates** are added (not counted in N). `N = 0` produces no main
   gate and no external arterial through the wall — a harbour outside the stage-1 region still gets the harbour gate of
   (7) (NP3-6); the sealed circuit is reported and the extramural stages are folded into the walled stage.
5. **Gate routes, solved (not committed).** For every pick: the route from its plaza's attach point through the pick to
   the frame at its bearing — the plaza-rooted Dijkstra tree to the pick, heap A\* beyond it — on (3)'s lattice with S4's
   cost function (§4.3); an island town routes to its landings and a polycentric pair gate to gate. S4 commits exactly
   these routes and reuses the plaza-rooted tree for its own plaza-anchored routes (§4.3). The harbour ↔ plaza route is
   **not** among them and never enters `T`'s road set: whether it may run straight to the harbour or must leave through a
   gate depends on the boundary (6)–(7) and the trace (9), so it is solved in (11), once both exist (VP2-2).
6. **The stage-1 field and boundary.** The one travel-cost field `T` of §4.4 S5a is computed here: a multi-source
   Dijkstra from the plaza(s) over (3)'s lattice with the road multiplier `1/a₁` (a₁ = stage 1's regime row: walled core
   1.3) on the lattice edges of (5)'s routes. Each node records its source nucleus, so a polycentric town's T is
   partitioned by nearest source; `t_1,i` is chosen so that nucleus i's nodes with `T ≤ t_1,i` hold its land `A_1,i`
   (exact to one cell), and the **stage-1 boundary** is that contour, Chaikin-smoothed and resampled. If two nuclei's
   regions come closer than their setbacks, glacis and `g`, the later-scored nucleus is re-sited to its next candidate
   (≤ 3 attempts); if they still come too close, the two are merged — one enceinte around their union and a **cross wall**
   along T's partition line between them (an open wall chain anchored on that enceinte at both ends, with a gate where the
   inter-nucleus route crosses it) — and the merge is reported.
7. **Gates on the boundary.** Each gate is the **first point at which its solved route, walked outward from its plaza,
   reaches `T = t_1`** — on the boundary by construction; the pick was only the route's waypoint, and the gate keeps the
   pick's identity, ordinal, bearing and route. Two routes that cross the boundary at one point (a shared run there) cannot
   both be gates: the later pick is re-drawn from its next candidate (≤ 3 attempts), then dropped and reported (F-WALL).
   **A sealed town's harbour (VP2-2).** When `N = 0` and the harbour's destination node (13) lies outside the stage-1
   region `{T ≤ t_1}`, one **harbour gate** — kind `water`, not counted in N, carrying a way like a quay-access water gate
   (§4.8), and reported — is placed where the plaza ↔ harbour least-cost route on (3)'s lattice (`L*`, (4)) first reaches
   `T = t_1`, so the trace (9) pins it and the harbour route (11) leaves through it. The same gate, placed by the same
   rule, is (4)'s pre-decided fallback, the **detour guard**: should M1's measurement of the harbour pick fail — and,
   whatever that measurement finds, when the nucleus nearest the harbour had no unforced pick left to force ((4);
   NP4-4) — a town with gates gets it whenever its best gate-bound harbour route — solved as data on (3)'s lattice with the stage-1
   boundary impassable except at the gates just placed — is longer than 1.5 × `L*`.
8. **The castle (MFP-3, COV-FTG-G09).** When a castle is requested or drawn, the **castle bailey** is sited by
   defensibility (height + water on ≥ 1 side + control of the main route, `docs/IMPROVEMENTS.md` O8 d), restricted by the
   `castle` option to inside / on / outside the stage-1 boundary, under a hard filter that no (5) route crosses the claim
   or, when water is within reach, the castle-moat band planned with it by (10)'s rule (a castle stands beside the road it
   controls, so no route ever meets its moat): a 5–7-vertex polygon on a jittered circle, area band TOWN 1.0–3.0 ha,
   CITY 1.5–3.5, METROPOLIS 2.0–5.0, anchored on MFCG's plain-size castles of 1.3–3.4 ha, compactness ≥ 0.75 — MFCG's
   threshold. `on_enceinte` places it across the boundary so that exactly two of its vertices lie on the boundary — the
   **weld vertices** — and the bailey's **outer arc**, its boundary between the welds on the side outside the boundary,
   becomes the stretch of town wall the castle shares (9). The castle's **town-side gate** is fixed now, at the midpoint of
   the bailey side with the least-cost path to the plaza — for an `on_enceinte` castle, among the sides of its town-side
   arc — so the castle street is a routable destination and a ring castle moat can carry its deck.
9. **The stage-1 trace.** For a walled stage 1 the registered `EnceinteStrategy` traces the enceinte here, by S5a's rules
   (§4.4): the boundary pulled to defensible ground within the 40 m band with the gates and the weld vertices pinned, then
   pinned-vertex smoothing and topology-preserving simplification. Between the weld vertices of an `on_enceinte` castle
   the trace is the bailey's outer arc itself, so that stretch is one wall carrying both enceintes' `wall` roles (§2.7
   `Castle.cityWeld`). The pull and the simplification treat the water planned in (2) and an `inside` or `outside`
   castle's planned ring moat (8) as water, which they never cross (§4.4), so no channel (10) carves can cut the trace
   (VP2-10). S5a commits this trace unchanged for k = 1; an unwalled town keeps the boundary itself as stage 1's boundary.
   **Test:** every gate and weld vertex lies on the committed trace exactly (lattice equality), and the trace departs from
   the boundary by ≤ 40 m everywhere except along an `on_enceinte` castle's shared stretch, which is the bailey's own
   outer arc and may bulge up to the bailey's width beyond the boundary. The two-construction
   mismatch this replaces — the anisotropic contour 76 m beyond the terrain-only contour at the gates and 35 m inside it
   between them, for 58 ha and five roads at a = 1.3 (147 m and 82 m at a = 1.8; `fixall_pipeline_r2_levelset.out`) —
   cannot occur, because stage 1 has one boundary.
10. **Water carvings and their decks → the L0 batch (GEO-19, NF-P4, NF-P7, VP2-10).** Carved into L0 here, before S4,
   and seen as water by every later stage: the harbour basin and the canals of (2) with their decks; a **castle moat**
   when water is within reach — around an `inside` or `outside` castle, a ring band around the bailey, outside its
   curtain's outer half-band and a berm, with **one deck at the castle gate**, perpendicular to the moat; for an
   `on_enceinte` castle, **only its outer arc** (8): the channel along the shared stretch between the weld vertices,
   outside the trace's outer half-band and a berm — the city moat's own stretch there when the town has one (one channel,
   at the wider of the two width rows), otherwise a channel clipped at each end by the trace ⊕ (outer half-band + berm),
   so it ends against the town wall's berm beside each weld — while the bailey's town-side arc takes its castle template
   row's `townSide`, a dry ditch or nothing (§4.8), and the castle gate on that side needs no deck; a **city moat** when
   the blueprint's `moat` is `inner` or `all` — a channel of the era row's width along the (9) trace, outside its outer
   half-band and a berm (table 2–5 m) — with **one deck at every main gate and at a harbour gate (7)**, where the gate's
   route (for a harbour gate, the route that placed it) crosses the channel, perpendicular to it; and the hinterland's
   **decoration ponds** — the pond row of §4.9's decoration table (count by rung and biome), sites scored on hollows, flow
   accumulation and damp ground, each at least `pondClearM` (table: 150 m) beyond the predicted built extent `{T ≤ t_K}`
   and at least 30 m from every (5) route and planned canal. No castle moat crosses the city trace: a ring surrounds a
   bailey the trace keeps off (9), and an outer arc runs beside the trace, never across it, so §4.4's rule that the
   trace crosses water only at a river's water gate holds with every castle option. Every deck has the form of S1 (5)'s,
   and its two states: a bank-to-bank segment perpendicular to the channel, its bank vertices pinned against every later
   smoothing, and its span, once a way is laid through it, carrying the structural `deck` role beside `way` — a `site`
   until then. S4 and S5 route through deck endpoints as fixed graph edges (§4.3), and S7 builds the furniture of the
   built ones (§4.8; NP4-7). When a moat was carved, `T` is recomputed once over the new water (≈ 4 ms
   at CITY) for the stages k ≥ 2; stage 1's boundary is never re-derived from it.
11. **The harbour route (VP2-2).** Once the L0 batch has committed, the harbour ↔ plaza route is solved on (3)'s lattice
   with the committed water impassable except along its decks, every reservation of (2) and (8) impassable, and — for a
   walled stage 1 — the (9) trace impassable except at its gates. A harbour whose destination node lies inside the
   stage-1 region `{T ≤ t_1}`, and any harbour of an unwalled town, is routed by heap A\* from the plaza of the nucleus
   whose partition of `T` holds it, and so stays inside the trace. A harbour outside the region is reached **through a
   gate**: one multi-source Dijkstra from every gate's exit — the far bank vertex of its moat deck where (10) carved a
   city moat, the gate itself otherwise — over the lattice outside the trace finds the **serving gate** (the least cost
   to the harbour; ties by gate ordinal; a harbour gate of (7) competes with the rest, and with `N = 0` it is the only
   gate) and the branch to the harbour at once.
   The harbour route is that gate's inward street, its passage and moat deck (its own route to the exit, which S4
   re-solves through the deck, §4.3) and the branch. So the harbour road leaves through a gate, crosses a moat only on
   that gate's deck and adds no road through the wall: the roads leaving the walled stage stay N, plus a harbour gate
   of (7) where one was placed (§4.3). The route is
   data, committed by S4 with the others; it is not in `T`'s road set (5). Cost: one heap search of the castle street's
   size, inside S3's row of §12.4 (PLAUSIBLE). **Test:** on the walled coastal fixtures with the harbour outside the
   stage-1 region — with and without `moat: 'inner'`, sealed with `N = 0`, and a polycentric coastal town whose nucleus
   nearest the harbour has no unforced pick left (NP4-4) — the harbour is served (never F-ROUTE's `unserved`), 0
   non-gate ways reach the trace, every way–moat crossing lies on a deck, the roads leaving the walled stage equal its
   N main gates, plus a harbour gate of (7) where one was placed (a sealed town's, or the detour guard's; NP4-5), and the
   harbour route is at most 1.5 × `L*` long (4).
12. **Land reservations → the L1 batch.** The plazas, the precinct, the market square and the castle bailey enter L1 as
   barrier faces carrying the `reserved` role: no way crosses them (S4, S5), S8 does not cut them, and the claimed entity
   is built inside them (§4.7, §4.8).
13. **Destinations** are typed entities: the plazas' attach points; each gate and its bearing (an **external bearing** per
   gate for a walled town; an unwalled town derives its bearings by the same law on its own land); the **town bridge** —
   the crossing site nearest the centre when a river passes through the stage-1 region, which (1) scored the centre
   against; it connects in town — while every other site becomes a bridge only when a route (S4) or a growth proposal
   (S5c) uses it and stays a `site` otherwise (S1 (5); J-P44); the harbour (its destination node is
   its basin's landward attach point; its route, (11)); the castle's town-side
   gate; the precinct. **Island towns (FTG-19):** when the settlement's land component does not touch the frame, external
   destinations are shore points — the harbour, one **landing** per requested bearing (the shore point nearest the bearing
   with the best deep-water score) and a ferry point — and O4 (g) counts landings as the external connections.

*Judgment (J-P26; NF-P1):* chose to solve the gate routes at S3 and take the stage-1 boundary, the gates, the castle weld
and the moat from one travel-cost construction over the two alternatives the verifier named — a provisional boundary on
straight corridors along the bearings, which still differs from the routed arterials by their bends, and sliding the
gates at S5a, which leaves a moat carved at S3 on a line the wall no longer follows or forces water into L0 after the
arterials exist — because a moat must enter L0 before any L1 edge (§2.2 rules 3 and 6), and it can follow the real wall
only if the real wall is known then; the plaza-rooted Dijkstra and the field are the work S4 and S5a already did, moved
earlier (§12.4).

*Judgment (J-P35; VP2-2):* chose to solve the harbour route after the trace and the moat, through the serving gate and
outside `T`'s road set, over keeping it among the (5) routes that shape `T`, because whether it must leave through a gate
depends on the boundary `T` produces — a route in `T`'s road set would make the boundary depend on a route whose form
depends on the boundary — and over adding a gate for it beyond N, which would break MFCG's gate law and "roads leaving =
N"; a sealed town (`N = 0`) is the one case that gets a harbour water gate, because no gate exists to serve it — and
the detour guard, where M1's measurement of the harbour pick fails or where the harbour's nucleus has no unforced pick
left to force (4), (7). This changes `T` slightly on harbour
towns whose harbour route used to lower it (a declared design change; no golden exists yet).

*Judgment (J-P44; NP3-4):* chose to emit every crossing site as a `site` — two pinned bank vertices and a record, no span
— that becomes a built bridge only when a way uses it, with the town bridge the one site S3 makes a destination, over
making every emitted site a destination (which would line a river with roads to dozens of bridges) and over emitting no
site until a route needs one (which would leave growth, epochs and drawn bridges to place decks after L1 exists every
time), because FTG turns only crossing proposals into bridges and MFCG draws one per street crossing, so a bridge should
stand where a road needs it; and chose one L0 batch of two same-level shore splits for a deck where no site stands over
widening the carve's preparation path to it, because nothing is inserted into the water, so there is no clear region to
declare and the only contact is the two shore points; and, inside S1's water operator or a carve, where the water is
being inserted, chose to let the rung only site its deck and the operator's own batches place it, over splitting the
old shores, which that operator's L0 batch removes (VD4-10).

*Judgment (J-P45; NP3-7):* chose to force one of the N picks at the point where the plaza ↔ harbour least-cost path
leaves the pick contour, with the detour guard's harbour water gate as the pre-decided fallback, over letting the
harbour's bearing only score the picks (a jitter or a terrain term could still move the pick away, leaving the detour
unbounded) and over always adding a harbour gate beyond N (J-P35's objection: it breaks MFCG's gate law), because the
forced pick's gate route runs along that least-cost path's own prefix, so the harbour road leaves on the harbour side by
construction and N is kept; this is a declared design change to `T` and the gates of harbour towns (no golden exists
yet). Where the harbour's nucleus has no unforced pick left (NP4-4), chose the detour guard unconditionally over
raising that nucleus's `N₁` by one, which breaks the gate law and the nested-pick prefix, and over releasing one of its
polycentric forced picks, which cuts the gate-to-gate route §4.3 joins the nuclei by, because the guard's harbour gate
is already the declared exception to N and bounds the detour by the same 1.5 × `L*` test.

*Judgment (J-P36; VP2-10):* chose to carve an `on_enceinte` castle's moat only along its outer arc, joined to the city
moat where there is one, with a dry ditch or nothing on its town side, over a ring band around the whole bailey, because
the town wall arrives at each weld vertex from outside the bailey and so must cross a ring band — against §4.4's rule
that the trace crosses water only at a river's water gate — while the outer arc is the stretch that faces the field, and
the town side, where the castle gate opens, needs no water; the hard filter of (8) keeps every solved route off a
planned castle moat, so no castle moat needs a deck except at a ring moat's castle gate.

=== REPLACE §4.3 S4 Backbone — arterials routed between named destinations, built as one graph ===

### 4.3 S4 Backbone — arterials routed between named destinations, built as one graph

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r5); earlier revisions fixall/integrate-r4, fixall/draft-pipeline-r4, fixall/integrate-r2, fixall/draft-pipeline-r2

**Lattice and costs.** The lattice and its edge costs are built once, at S3 (they depend only on the frame, terrain, water
and reservations; §4.2 S3 (3)), and reused by S3's pick contour, its gate routes and its field `T`, by S4's routes and by
every S5a boundary. Arterials (`through`, `primary`) are routed between the S3 destinations on this **candidate lattice**: a
jittered hexagonal point set at ≈ 25 m spacing whose adjacency is known by construction (six neighbours per point, the
jitter bounded so no edge crosses another; no Poisson sampling, relaxation or triangulation is needed). Edge cost =
length × (1 + k_slope · slope²) × waterCrossingPenalty (impassable except along a pinned crossing deck — a site or a
built bridge, S1's on rivers, S3's on the moats and canals it carves, §4.2 S1 (5), S3 (2), (10)) ×
reservationPenalty (impassable inside a reservation; the plaza and castle are reached only at their attach points and
gate) × wallCrossingPenalty (only at gates) × existingFabricCost (epoch > 0: crossing a built face costs by its class, so
growth reuses streets) × landValue. At epoch 0 the plaza-rooted Dijkstra that S3 computed for its gate routes gives every
plaza-anchored route through its shortest-path tree; a tree path that crosses a claim or water S3 added after the tree
(the castle bailey, a moat) is re-solved by heap A\*, as are routes without a plaza end and every route at epoch > 0 (with
`existingFabricCost`) (the 2017 BFS is replaced; §12.4).

**Routes.** The gate routes arrive solved from S3 (§4.2 S3 (5)), and S4 commits them without re-solving: each is split at
its gate (S3 (7)) into the inward street (its plaza attach point ↔ the gate, `primary`) and the outward arterial (the gate ↔
the frame edge at the gate's bearing, `through`), so roads leaving the walled stage = N (plus a harbour gate of §4.2
S3 (7) where one was placed: a sealed town's, or the detour guard's; NP3-6) and each gate carries one road out and one
street in (MFCG's gate identity; MFP-4). Where S3 carved water across a solved route — the city moat just
outside each gate — S4 re-solves only that stretch, from the last lattice node before the channel to the first beyond it,
through the gate's deck; the deck continues the gate passage straight across the moat, perpendicular to it (NF-P4).
S4 then solves the remaining routes: the town bridge (§4.2 S3 (13)) connects each of its two ends to the nearest arterial on its bank in town, and a
site outside the boundary that a route uses is reached through the nearest gate, never through a new wall crossing;
every other site stays a `site` unless S5's growth uses it (§4.2 S1 (5), §4.4); the castle's town-side gate ↔ plaza
(the castle street, across the castle-moat deck when there is a moat); the precinct's frontage ↔ the plaza side it faces;
canal decks inside the boundary ↔ the nearest arterial. Harbour ↔ plaza and island-town gate ↔ landing were solved at S3.
A polycentric town's gate-to-gate route between each pair of adjacent nuclei (solved at S3 between their forced gates,
§4.2 S3 (4)) joins their plazas through both nuclei's gates; when a pair was merged under one enceinte, the route crosses
the cross wall at its gate (NF-P10).

**One graph, then one smoothing (GEO-16).** All routes are solved first on the lattice; the arterial graph is the union of
the lattice edges they use, each edge carrying its multiplicity (how many routes share it). The graph is split into
chains at every node of degree ≠ 2 and at every pinned node (gates, attach points, deck endpoints, landings); junctions
closer than 8 m are merged *on the graph*; each chain is then simplified (Visvalingam) and smoothed (Chaikin × 2, then
curvature-limited to the class's minimum radius) **once**, with its end nodes pinned, and inserted into L1 **once** as a
spine — a `mandatory` chain carrying the `way` role (§3.6), whose attraction folds any residual near-duplicate within
26 cm into a shared stretch. Routes that share a run leaving the plaza therefore become one street, never braided near-duplicates. Class and
width come from multiplicity and betweenness on this graph (the width table is keyed by class and the class by
betweenness, O4 c); where a way's width varies along it (a widening at a market or a gate), S4 places `width_knot`
vertices at the class-change junctions (`insertChain` `opts.knots`, §3.4), so the width is a knot profile on the spine
(§2.2 rule 5). Junction rules: minimum crossing angle 30° (else deflect), **Y → T conversion** where the acute arm can
be bent within its class curvature limit (G-P5). A deck is a fixed edge of the graph: smoothing never moves its vertices
and each approach curve stays within the class radius; if an approach to a river or canal deck cannot meet the radius,
F-ROUTE's move rung takes another crossing site on the same reach within its search band — one S1 or S3 already
emitted, a `site` no way uses yet (§4.2 S1 (5)) — and its extra-bridge rung, where no site serves, places a new deck by
one L0 batch of two same-level shore splits before S4's L1 batch (§4.1, §4.2 S1 (5); §5.2; NP3-4) — or, inside S1's
water operator or a carve, whose new water is not yet inserted, only sites it, that operator's L1 batch placing its
bank vertices on the route and its L0 batch promoting them (§7.3 (b) 2–4; VD4-10) — while a moat deck
stays fixed to its gate, whose passage it continues straight. Every deck a route uses — a site, or a deck added this
way — becomes a `built` bridge when S4's spine lays its span through the two bank vertices (§2.7). Test: on B-CITY, no two spines run closer than their class separation for more than
one step length; every deck's way angle is within ± 10° of the channel normal.

**Result.** Through-roads continue to the context margin with their bearings (O14); MFCG's radial gate → plaza legibility
(CONFIDENCE B7: streets converge on the plaza) with real metres and terrain (O4 a, d). Later growth stages add main roads
through the **main-road step** (§4.4 S5b), which runs this same router incrementally with every existing arterial fixed.
**S4's local operator** (§7.3): an edit re-routes an arterial only between its nearest pinned nodes (junctions of degree
≥ 3, destination nodes) on either side of the edit region, over this lattice, with every deck — a re-sited one included —
a fixed graph edge.

=== REPLACE §4.4 S5 Growth stages — boundary and wall first, main roads, then FTG-shaped growth, then a capacity check ===

### 4.4 S5 Growth stages — boundary and wall first, main roads, then FTG-shaped growth, then a capacity check

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r5); earlier revisions fixall/integrate-r4, fixall/draft-pipeline-r4, fixall/integrate-r3, fixall/draft-pipeline-r3

Each growth stage k runs four sub-steps; stage 1 commits the boundary, gates and trace S3 fixed in one construction
(§4.2 S3 (6)–(9)), and a stage k ≥ 2 takes its boundary first, then its main roads, then its trace, so every gate lies on
the boundary it was picked on (NF-P1).

**S5a Stage boundary and enceinte trace.** *Boundary (FTG-5, COV-FTG-D26):* the boundary of stage k is a level set of
**network travel cost**: `T(x)` = the least cost from the plaza(s) over the S3 / S4 lattice, where a lattice edge inside an arterial's corridor costs ρ_road per metre and any other edge ρ_off per metre,
both times the slope term; water is impassable except along decks and reservations are impassable. The **anisotropy
ratio** `a = ρ_off / ρ_road` is a stage-regime and form row — our equivalent of FTG's spoke-priority control: walled core
1.3, walled rings 1.8, ribbon 4, suburb 3, `linear-street` form 8 (our own values; FTG's measured road / non-road
90th-percentile radius ratio of 1.26–1.65 on its two captured cities is the calibration target for the extramural
stages). `T` is **one field**: computed at S3 by a multi-source Dijkstra on the lattice and edge costs with the road
multiplier applied on the lattice edges of the gate routes S3 solved (§4.2 S3 (6); ≈ 4 ms at CITY), recomputed once after
S3's L0 batch only when a moat was carved; S4's remaining routes and S3's harbour route (§4.2 S3 (11)) are not in `T`'s
road set; and each
S5b's new main roads re-settle `T` incrementally, only at the nodes whose cost they lower — so no stage computes a new
field (SCL-3). **Stage 1's boundary is S3's contour, and S5a commits S3's trace for it unchanged.** For k ≥ 2, stage k's
boundary is taken from `T` **as it stands when stage k begins**, before its own S5b: the threshold `t_k` is chosen so that
the land of `{T ≤ t_k}` ∪ the enclosure of stage k − 1 equals the land of stages 1…k from S2 (lattice nodes sorted by T,
their cell areas accumulated; exact to one cell) — the union keeps the stages nested even where a moat raised T just
outside the previous wall — and the boundary is that region's outer contour, Chaikin-smoothed and resampled. S5b then
picks and routes the stage's new primaries on that boundary, and their re-settlement of `T` serves stage k + 1 onward,
so the boundary a gate was picked on is the boundary the trace passes through. On a flat, dry site a walled core is therefore compact and the outer stages stretch along the main roads;
`a` is also the control over the wide-versus-elongated balance of ribbons and suburbs. B-REF measures the land-sector r90
coefficient of variation and the road / non-road r90 ratio on ours and on FTG's payloads and requires both to be monotone
in `a` (§13.5).

*Trace (GEO-18, FTG-8).* For a walled stage the trace is fixed **before the stage's secondaries grow** — for stage 1 by
S3 (§4.2 S3 (9)), for k ≥ 2 right after S5b — by one rule set (the registered `EnceinteStrategy`): the boundary → pulled
to defensible ground within a 40 m search band (local ridges, slope breaks, river banks: a cost-surface path around the
town with a penalty for leaving high ground) with **the gates pinned** where the arterials cross the boundary (stage 1:
S3's gates, the first crossings of its solved gate routes; k ≥ 2: every crossing of an S4, earlier-S5b or this stage's
S5b arterial) and an `on_enceinte` castle **welded through its two weld vertices on the boundary** (the shared castle edge
is one wall; MFP-3; a second castle on an outer enceinte — the citadel of §4.2 S0 — is sited by S3 (8)'s rules against its
stage's boundary and entered as an L1 barrier face in that stage's trace batch, with its gate and any moat deck) → pinned-vertex Laplacian smoothing → **topology-preserving**
Visvalingam (the kernel's `simplify`, §3.4: minimum segment 20 m, no interior angle < 100°; a removal that would make the
trace touch itself, cross water, enter a reservation or move a pinned vertex is refused) → inserted on L1 through
`insertChain` as a `mandatory` chain carrying the `wall` role, gate vertices carrying `wall_gate`; on a shore or bank the
trace is attracted onto the outline, so the shared stretch is one edge carrying both roles (§3.6). Water: the trace
never crosses water except at a **water gate** where a river passes; the trace's two vertices on the river's banks carry
`('gate_end', gate, 0 | 1)` and the `Gate` names them in `banks` (§2.2 rule 7, §2.7), as an edit's re-traced run's do
(§4.11, §7.3 (b) 3), so every water gate — generated or edited — names its bank vertices the same way (VK3-2); on a
coast or a river bank the trace is an **open
chain** anchored on the shore at its two ends, with the enclosure closed by the shoreline, and the preset's `waterfront`
row decides whether a quay wall or sea wall is added along the water (with a water gate at every quay access, so every
quay stays reachable through a gate) or the waterfront stays open (the default: MFCG's coastal wall stops at the water,
FTG's captured wall is an open 17-tower chain from bank to coast). `placement: 'aroundStage'` traces only the stage's new
ring as an open chain anchored on the previous enceinte. Nothing grown later can cross the trace except at a gate, and
S6 treats it as a barrier. If an inward pull would leave the stage's land short by more than the S5d tolerance, the pull
is capped at the smoothing step (reported); the F-WALL ladder's last rung (§5.2) cuts any way that still reaches the wall
at the setback band and prunes the outer stub.

*Outer moats (NF-P4).* When the blueprint's `moat` is `all`, S5a carves stage k's moat (k ≥ 2) right after committing
its trace, through the carve path of §4.11. Its way rule meets only arterials here — each just outside one of the stage's
gates, because the stage's secondaries have not grown — so every way is kept with a deck and nothing is cut: the L1 batch
places each deck's two pinned bank vertices on its arterial where the channel's banks will cross it — the `deck_end`
rows of a fresh `Bridge`, `built` with that arterial as its way (§2.7) — the span between them carrying `deck` (re-routing the arterial between the gate and its next pinned node beyond the channel where it would
meet the channel more than 10° off its normal, as §4.3 re-solves S3's moat stretches), and the L0 batch inserts the
channel (the era row's width, outside the outer half-band and a berm) through those prepared vertices, so each span
becomes its deck. Each deck is perpendicular to the channel and continues its gate's passage across; S7 builds its
bridge furniture (§4.8; NP4-7), and S5c treats the moat as water. Nothing finer than L1 exists yet, so the carve's footprint (§4.11) clears nothing. The
innermost enceinte's moat is S3's (§4.2 S3 (10)).

**S5b Main-road step (FTG-4; stages k ≥ 2 and every epoch stage).** The stage's primaries are made to match its gates:
`N_k` = the gate law of §4.2 S3 on the land inside the stage's enceinte (walled), or one primary per `mainRoadSpacingM` of
boundary (unwalled; table: 450 m at CITY). The existing arterials all continue to the frame, so they cross the new
boundary `c` times; when `N_k > c`, S5b spawns `N_k − c` radial destinations on the boundary by nested picks (largest
angular gaps first, terrain-scored like gates) and routes each with the incremental S4 router from the nearest junction on
an existing primary *outside* the previous enceinte (never through an inner wall) to the frame at its bearing; the
crossings become stage k's main gates, posterns only for an explicitly requested remainder. An outer enceinte never gets
fewer gates than arterials cross it; a request below that is raised and reported (a requested gate count applies to the
innermost enceinte, MFCG's semantics). Test: primary length per km² and the share of gates on primaries in band from
TOWN to METROPOLIS; each epoch stage whose `N_k` exceeds its crossings adds ≥ 1 primary.

**S5c Growth of the secondaries.** Inside the boundary a priority queue of proposals grows streets FTG-style (CONFIDENCE C5;
`ftg-docs-params.md` §2.2 via the proposals): each proposal `{origin junction, heading, curvature, goalHeading, class,
remainingSegments, branchCounter, priority}`, lowest priority first; step length by class (secondary 25–40 m, lane 15–25 m;
FTG's district streets persist at (L + 0.5)/2 ≈ 25–30 m, `_critic-ftg.md` F3, our tables start there).
* **Division of labour with the bent cut (MFP-2).** In **walled regimes** S5c grows only the arterial-connecting
  secondary network at district scale — proposals seeded at arterial junctions and gate plazas, separation floor
  120 / 160 / 200 m at TOWN / CITY / METROPOLIS, destination bias toward other arterials — and every lane and every
  finer intramural street comes from S8's recursive bent cut of the district polygon, which inherits the wall's and the
  shore's direction (MFCG's measured lot-orientation coherence of 0.84–0.97 within 60 m falling to 0.32–0.68 within 250 m,
  and its lots within 40 m of the wall aligned to it at a median 3.5–4.5°, are the targets §13.5 measures). In
  **extramural regimes** (ribbon, suburb, unwalled rings, the ground between polycentric nuclei) growth works at block
  scale as FTG's does. *Judgment:* chose the bent cut for the intramural fabric and FTG growth outside the walls over FTG
  growth everywhere, because MFCG's intramural signature (coherence, wall alignment, the connected three-valent alley
  mesh) comes from recursion on the district polygon and the tiebreaker favours the measured construction, while FTG's
  staged growth along roads is the historically constrained form of extramural expansion.
* **Heading model per proposal class and preset (FTG-17, FTG-6).** `ou` — a mean-reverting curvature walk:
  `κ ← ρ·κ + (1 − ρ)·κ_goal + s·√(1 − ρ²)·ξ` per step Δs, with `ρ = e^(−Δs/ℓ)` (correlation length ℓ),
  `κ_goal = (θ_goal − θ)/L_r` (reversion toward the proposal's goal heading over L_r), `s` from `headingSigma` stated in
  degrees per 100 m; organic defaults 20° per 100 m, ℓ = 90 m, L_r = 250 m; planned 5° per 100 m. Executed (this lane,
  `docs/validation/bench/fixall_pipeline_ou_heading.out`, 4 000 streets per setting): at the organic defaults a 600 m street's net turn is p50 21°, p90 50°, 0.1 %
  beyond 90°, and the per-30 m-step turn has p95 11.4°, p99 14.9° with Gaussian tails — no cliff and no curling.
  `radiusHold` — ring proposals keep the curvature 1/r of their radius about the centre with a small `s` (the `ringed`
  preset); `gridLock` — headings snap to the preset's grid table (`american`). CI tests the drift distribution per preset.
* **Branching** after `n` segments with a per-class probability, perpendicular ± jitter (FTG's `Continue`) or tangential
  to the centre (FTG's `Curve around origin`, the `ringed` preset's ring branch).
* **Destination bias**, switchable per class and preset: a proposal that can reach an unserved destination or an existing
  spine within ≈ 1.5 step lengths turns toward it (this connects the fabric and ends cul-de-sacs deliberately); it is off
  for suburb offshoots and ring proposals.
* **Legality (explicit, unlike FTG's unstated thresholds).** Minimum separation from parallel spines = the regime's
  separation; **the same clearance applies to shores, wall setback bands, reservations and the stage boundary** (GEO-37):
  a proposal running within `max(minimum block depth of the regime, separation / 2) + half its corridor` of any of them
  and within 30° of parallel is deflected or rejected, so no strip thinner than a plot depth is left; a proposal meeting
  a shore or a reservation at ≥ 30° ends there (a street arriving at the quay). A wall is never crossed except at a gate:
  a proposal reaching the setback band stops there. Snap to a junction within `0.35 · step`. **Crossings follow the
  preset's crossing matrix** (proposal class × crossed class → stop in a T, cross with a materialised crossroads, or
  deflect): organic crosses only a lower-or-equal class collinear within 6° (the rare crossroads, O4 b); `ringed` crosses
  radials with rings; `american` crosses on the grid. Reject water unless the way crosses on a deck: a proposal that
  meets a river or canal bank within `0.35 · step` of a `site`'s bank vertex (§4.2 S1 (5)) snaps to it and continues
  across that deck to the far bank vertex, which builds the bridge (§2.7), when its class row allows a bridge (a table
  row: `secondary` and `lane` by default) — FTG's crossing proposals becoming bridges, the sites' 40 m minimum spacing
  playing its minimum distance between bridges (NP3-4); any other proposal meeting water ends there as at a shore;
  slope ≤ class limit.
  Junction rules as §4.3 with T-preference in organic regimes; the junction-degree band is a preset row (organic 4-way
  0–15 %, ringed 20–45 %, american 40–80 %).
* **Between stages:** prune dangling `secondary` chains shorter than one block width; trim only S5-grown provisional
  spines that run beyond the boundary (FTG-18) — **S4 and S5b arterials are never trimmed**. The boundary becomes the next
  stage's start.

**S5d Capacity check (FTG-2).** Right after S5c, the stage's new coarse faces are priced: built land per face = face area
minus the corridor reserve of its spines (declared half-widths) minus reservations; each face's band is the driver-only
prosperity field at its centroid (the same kernels as S6's pass 1) cut by provisional cut points computed exactly as §4.5
computes the recorded bands, over the land grown so far (S6 then records the town's `FieldBands` once, over all stages). If the land per band
falls short of the stage's demand `Σ n(c, b, k) · plotArea(c, b) / plotShare` by more than 5 % in total, **one top-up**
runs: the level set grows to cover the shortfall, S5a re-traces only the affected arc between its pinned gates, and S5c
grows the added rim — except along a moat: a moated arc is never re-traced, so a moated stage's shortfall moves to the
next stage's quota (the last stage's to the exact check below), reported. A remaining shortfall goes to the exact check after S10 (plots per class × band against the quota)
and to the F-SITING reconcile, reported (F-BUDGET-STAGE, §5.2). B-CITY sweeps `wealthLevel` ∈ {0, 0.5, 1} and asserts
population ± 5 % and the walled share inside its rung band.

**Stage regimes (a table; `StageRegime` rows per rung, era and form):**

| regime | where | block-depth band floor | separation | anisotropy `a` | heading model / bias | notes |
|---|---|---|---|---|---|---|
| dense core (walled) | stage 1 | 30–45 m (applied by S8) | 120–200 m (district-scale secondaries only) | 1.3 | `ou`, bias on | lanes come from S8; T-preference |
| walled rings | walled stages ≥ 2 | 45–70 m (S8) | 120–200 m | 1.8 | `ou`, bias on | courts and rear lanes (S8) |
| ribbon (default extramural) | outside the last enceinte along arterials | plots directly on the arterial, depth band 30–50 m, **starting beyond the outer setback / glacis** (MFP-9), density falloff by a distance-to-gate kernel (MFCG's `filterOutskirts` idea) | — | 4 | — | MFCG's outskirts: 71–85 % of its extramural buildings lie within 100 m of a gate road (red-team EXP) |
| **suburb** (FTG C10; preset, era row or shanty toggle only — MFP-6) | a final regime outside the last enceinte | 40–60 m | 80 m | 3 | offshoots, bias off | an optional **perimeter lane** (FTG-20): the previous enceinte's outer boundary offset by setback and glacis, typed `lane`, broken at arterials, seeds offshoots at a 60–90 m spacing row besides the arterial seeds; offshoots grow as `cul_de_sac` / `lane` proposals **without destination-bias termination** (deliberate dead ends), no infill below the band; plots **directly along the offshoots with small lots from the outset**, a per-plot density Bernoulli from the distance-to-gate kernel leaves gaps; calibration references: FTG's 83 cul-de-sacs, 30.00 m suburb streets, 14.70 m lot outlines (`research/ftg-capture/roadlength100/README.md` via `_critic-ftg.md`) |
| `american` / `ringed` presets | on request | — | preset | preset | `gridLock` / `radiusHold` | crossing matrix and junction band per preset; fixture: `ringed` on a flat site gives ≥ 3 closed rings with radius CV ≤ 10 % and ring × radial crossroads |

**Alternatives rejected (written, as required).** 1 *Partition seeded from a grown skeleton via Voronoi cells around the
arterials*: cell edges are again widthless, classless "streets"; fails the tiebreaker and O4 (a)–(c). 2 *Pure FTG growth
including infill*: the 15°-clamp fabric and "vaguely circular" sameness; loses the NG signature R3 requires; a queue cannot
guarantee block-size bands. 3 *Pure MFCG partition with FTG plots inside*: no destinations, no growth (the evolution hook
needs it), no metres, restart-prone water. 4 *Urban Places' base mesh*: street geometry becomes a function of mesh
resolution, which the precision tiebreaker forbids; its warp/edit affordances are obtained by the vertex arena and
`warp`. 5 *Least-cost connectors instead of growth for the secondaries* (the pipeline proposal's default): defensible
under the tiebreaker, but it leaves FTG's organic staged accretion and the measured suburb signature on the shelf, and the
owner asked for the best of both. 6 *Walls traced after growth* (this document's first version): streets grown before
the wall must then be cut or gated, and the fabric cannot inherit the wall's direction (GEO-18, MFP-2).

**The fusion risk gate (O4 f), and the fallback if it fails.** S4 + S5 + S8 infill ≤ 100 ms at CITY on reference
hardware, block-area and junction-degree distributions of the infill inside the NG-measured bands on the same district
shapes **and** MFCG's street-signature rows (orientation coherence at 60 / 120 / 250 m, wall and shore alignment by distance
band, T/Y share, intramural dead ends, blocks per ha, lots per block) inside their bands (§13.5). M0 measures this before
anything else is built (§16). If the gate fails on time, extramural growth also stops at `secondary` (`lane` becomes
infill-only everywhere) and the gate is re-run; if it fails on statistics, the infill constants are recalibrated against
the NG vertex captures and the MFCG size-sweep exports (spike M0-b) before M1. Neither fallback changes the architecture.
The gate is repeated at M1 on B-CITY-lite's river, coast and relief configurations with the reordered stages, with M1's
pre-decided fallbacks (§16; IMP-13).

=== REPLACE II.4 The render tier, the workflow and the close-up's persistence status (S5, S6) ===

## II.4 The render tier, the workflow and the close-up's persistence status (S5, S6)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r5); earlier revisions fixall/integrate-r3, fixall/draft-pipeline-r3

The `hatched` preset at neighbourhood LOD (§8.2, §8.6): tapered hatch triangles from the ridge, two-tone roofs by the
measured law over the stored wings, prism shadows from stored heights, cobbles / tiles / outlined / dashed road programs,
chimneys, wells, lobed depth-sorted trees, the hood title in the emptiest corner; ≈ 25 canvas ops per wing as the
ceiling; instanced hatching.

**Persistence status (LC-18).** A `refine` close-up is **derived data**: a pure function of the district's committed base
state, sub-seed, strategy and params, identical whether computed eagerly or lazily, held outside the base hash and never
stored — so the town is the same before and after anyone opens a district. The first edit inside a close-up is preceded
by a logged `closeup` event (strategy and params, §7.1), from which point the close-up enters the digest under
`closeups` (§2.9) and replays exactly. Editing a close-up element (moving a well, removing a tree, restyling a pin) records
an **instance-override event** on the element's host entity and ordinal (§7.1),
which persists, undoes and replays after regeneration, re-matched by position; when the base re-derives the district, the
close-up re-derives with those overrides carried over and orphans reported. Close-up lanes, plots and houses are base
entities (the base's S8–S11 already produce the finest model fabric), so renaming a lane or locking a house is an ordinary
base edit. A `replace` close-up (a template fabric) is **a model edit**: `setAttr(district.fabric, template)` plus a scoped
regeneration of the district — logged, hashed, the same for every viewer, and visible at city LOD because city-LOD footprints
read the same model at every zoom.

**Workflow.** Open any district at neighbourhood LOD from the city view; "Same kind, new seed" per district with locks — New
random on the district, one of §7.1's named actions scoped to it; per-district reroll isolation — rerolling district D
leaves every other district byte-identical (R8) except the **seam exception** of §4.6 (NF-P6): the chains and `Corridor`
records of the ways that bound D; the half-corridor strips on both sides and the junction wedges at the vertices D's
batches insert or remove on those spines — S8's `baseLane` ends and a close-up's T-junctions — which on a neighbour's
side are only II.1 (3)'s neighbour step: one `corridor_split` edge and the one kerb vertex it lands on (promoted) or
adds; the neighbouring cells, plots and footprints whose rings pass through those vertices, and the wing rings of the
buildings on them (§2.6's wing-carrying rule), which change only by them — the same polygon point for point, checked
by comparing the rings with the vertices removed, and a promoted vertex returning to its level when the lane goes
(§2.2 rule 3; NP4-1) — and the `Seam` records D is party to. This is the set §4.6 step 7 and §7.3 item 1 state, and
the one II.5's reroll-isolation tests check. The locality oracle
computes this set from the batches' commit records and checks everything else byte for byte (§7.3). Export of one
district as its own SVG / PNG / VTT scene.

## 3. Cross-area requests

Each request quotes the current text (line numbers in the 10 723-line `docs/ARCHITECTURE.md`) and gives the new text.
They complete this round's mechanisms in sections other areas own; the integrator applies them with those areas'
blocks.

### 3.1 To the kernel area (§2.2, §3)

* **X-K1 (NP4-2) — §2.2 rule 5, the named exception (l. 703–706).** Replace "save a building's wing rings (§2.6), whose
  points on its footprint's boundary are that footprint's vertices and which §2.6's wing-carrying rule re-reads from the
  footprint face after every change of it, so they cannot go stale (NP3-1)" with "save a building's wing rings and its
  stored stage-3 composition's rings and tower centres (§2.6), whose points on its footprint's boundary are that
  footprint's vertices and which §2.6's wing-carrying rule re-reads from the footprint face after every change of it, so
  they cannot go stale (NP3-1, NP4-2)".
* **X-K2 (VD4-10) — §2.2 rule 7, the `deck` parenthesis (l. 800–802).** Replace "and a deck where no site stands once L1
  exists — F-ROUTE's extra bridge, a drawn bridge — has its two bank vertices placed by one L0 batch of two same-level
  shore splits, nothing cleared, before its way's L1 batch lays the span (§4.2 S1 (5); NP3-4)" with "and a deck where no
  site stands on water that already stands once L1 exists — F-ROUTE's extra bridge, a drawn bridge — has its two bank
  vertices placed by one L0 batch of two same-level shore splits, nothing cleared, before its way's L1 batch lays the
  span, while inside S1's water operator or a carve F-ROUTE's extra-bridge rung only sites its deck, which that
  operator's preparation batch places on the way and its L0 batch promotes (§4.2 S1 (5); NP3-4, VD4-10)".
* **X-K3 (NP4-6, NP4-2) — §3.6 whole-step validation (l. 2701–2703).** Replace "and every building whose footprint the
  step moves valid under §2.6's wing-carrying rule (its carried rings simple, its wings uniting to its footprint face)"
  with "and every building whose footprint the step moves valid under §2.6's wing-carrying rule (its carried rings — a
  stored composition's included — simple, its wings uniting to its footprint face, decided by §2.6 rule 4's tiered
  test after the kernel's own checks of the step pass, stopping at the first failing building in address order;
  NP4-2, NP4-6)".

### 3.2 To the determinism area (§5, §7)

* **X-D1 (VD4-10) — §5.2 F-ROUTE, ladder column (l. 4785).** After "→ allow one bridge at extra cost: a new deck whose two
  `deck_end` vertices one L0 batch of two same-level shore splits places, nothing cleared, before the way's L1 batch
  lays its span (§4.2 S1 (5), §4.3)" insert "— inside S1's water operator (§7.3 (b)) or a carve (§4.11), whose new
  water is not yet inserted, the rung only sites the deck: its bank vertices are placed on the route by the operator's
  L1 batch and promoted by its L0 batch (§7.3 (b) 2–4; VD4-10)".
* **X-D2 (NP4-5) — §5.2 F-WALL, test column (l. 4787).** Replace "B-CITY: gates on arterials 100 %, `gates = N` exact, 0
  non-gate crossings;" with "B-CITY: gates on arterials 100 %, main gates = N exact, and the roads leaving each walled
  stage equal its N main gates, plus a harbour gate of §4.2 S3 (7) where one was placed (a sealed town's, or the detour
  guard's; NP4-5); 0 non-gate crossings;", and "MFCG baseline: sealed cities at `gates = 0` without fallback" with
  "MFCG baseline: sealed cities at 0 main gates without fallback".
* **X-D3 (NP4-7 (c)) — §5.2 F-REDERIVE (l. 4797).** Detection column: after "a deck span no longer crosses water" add
  "; a crossing `site` whose bank vertices no longer stand on a shore of its reach". Ladder column: after "— or leaves
  with the way if the way itself was removed." insert "**A site over land** (its reach moved away and no successor site
  matched it, §7.3 (b) 2): the site is removed — its `deck_end` rows by `removeEdges` on their `VertexRef`s, its record
  a tombstone (§2.7; §7.3 (b) 9; NP3-4, NP4-7)." Test column: "0 decks over land" becomes "0 decks and 0 sites over
  land".
* **X-D4 (NP4-2) — §7.4 warp paragraph (l. 6071–6080).** Replace "**A building's stored wing rings** (§2.6; its site-plan
  slots store no polygon, §2.5) are carried with its footprint face in the same pass" with "**A building's stored wing
  rings** — and, when a stage-3 composition is stored, its wing, court and room rings and its tower centres (§2.6;
  NP4-2) — are carried with its footprint face in the same pass (its site-plan slots store no polygon, §2.5)"; after
  "halving the step when it fails, as for a held pin (§3.6)" add "— the composed wings uniting to the moved face, its
  rooms inside and its tower centres inside or on it, by §2.6's stored-composition rule"; and replace "The undo record
  keeps every former point, wing ring and base" with "The undo record keeps every former point, wing ring, stored
  composition and base".
* **X-D5 (NP4-2) — §7.3 item 7 (ii) (l. 5921–5923).** Replace "checks each excepted neighbour cell, plot, footprint and
  wing ring equal to its prior ring after removing those vertices (NF-P6, NP3-1)" with "checks each excepted neighbour
  cell, plot, footprint and wing ring — a stored composition's rings included (§2.6) — equal to its prior ring after
  removing those vertices (NF-P6, NP3-1, NP4-2)". (Item 1's wording already matches the new II.4 and needs no change.)
* **X-D6 (NP4-2, NP4-3, NP4-6) — §5.3, the wing row (l. 4826).** Replace the row with: "| every building's wing rings —
  and a stored composition's composed wings — are simple and counter-clockwise and unite to its footprint face exactly
  (integer equality), after S11's first carry and after the carry that follows every later committed batch changing a
  footprint face, in generation or in an edit (§2.6's wing-carrying rule; NP3-1, NP4-2, NP4-3) | batch-local | the
  buildings whose footprint faces the batch changed, by §2.6 rule 4's tiered test — no union for a wing re-read whole,
  the ring test with the pairing for tiled wings, a union only for overlapping ones (≈ 0.06–2.7 µs a building, NP4-6) |".

### 3.3 To the rendering area (§12)

* **X-R1 (NP4-6) — §12.6, the warp line (l. 8460).** Replace "* **Warp preview:** ≥ 30 fps for a brush radius ≤ 150 m;
  Apply ≤ the scoped-regeneration budget of the touched faces." with "* **Warp preview:** ≥ 30 fps for a brush radius
  ≤ 150 m; Apply ≤ the scoped-regeneration budget of the touched faces, counting §2.6's wing carry and check inside the
  whole-step validation — ≈ 0.4 ms per validation pass for 450 buildings on an assumed core mix and ≈ 3.6 ms in the
  worst case of a step and eight halvings (`docs/validation/bench/fixall_pipeline_r5_wingcost.out`; §2.6 rule 4;
  NP4-6). *Measurement (M3a):* the Apply time of a 150 m brush over a CITY core on B-CITY-lite seeds, the carry and
  check counted. *Pre-decided fallback* if it exceeds the budget: the wing check leaves the whole-step validation — it
  runs once after the final step, and a building that fails it is re-derived by S11 on its plot (F-REDERIVE, reported)
  instead of halving the step (§2.6 rule 4)."

### 3.4 To the scope area (§13, §16, the staged list, the judgment-calls table)

* **X-S1 (NP4-3) — §13.2 B-EDIT (l. 8822–8823).** After "Regenerate (keep settings) of a perimeter district, a walled
  district and the hinterland, byte-identical" insert ", and of a block holding a rich compound whose yard has a
  formal-garden grid and an orchard part with edges ending on the house wall — byte-identical to the one-click result,
  the wing rings after generation already carrying those wall vertices (§2.6; NP4-3)".
* **X-S2 and X-S3 (NP4-4, NP4-5) — §13.2's walled coastal harbour fixtures (l. 8800–8803).** Replace "— the harbour
  outside the stage-1 region, with and without `moat: 'inner'`, and sealed with `N = 0` — each with the harbour served,
  0 non-gate ways reaching the trace, every way–moat crossing on a deck, roads leaving = N, plus the harbour gate at
  `N = 0` (VP2-2), and the harbour route" with "— the harbour outside the stage-1 region, with and without
  `moat: 'inner'`, sealed with `N = 0`, and a polycentric coastal town whose nucleus nearest the harbour has no unforced
  pick left (NP4-4) — each with the harbour served, 0 non-gate ways reaching the trace, every way–moat crossing on a
  deck, roads leaving = the N main gates, plus a harbour gate of §4.2 S3 (7) where one was placed — a sealed town's, or
  the detour guard's (VP2-2, NP4-5) — and the harbour route".
* **X-S4 (NP4-5) — §13.5, the towers-and-gates row (l. 9087).** In the bands column replace "N exact; roads leaving each
  walled stage = N" with "main gates = N exact; roads leaving each walled stage = its N main gates, plus a harbour gate
  of §4.2 S3 (7) where one was placed". (The MFCG column's "`gates = N` exact" describes MFCG and stays.)
* **X-S5 (NP4-6) — §16, the M3a row's exit column (l. 9781).** Add "; the warp cost measurement — a 150 m brush over a
  CITY core on B-CITY-lite seeds, Apply within §12.6's budget with §2.6's wing carry and check counted, or §12.6's
  pre-decided fallback (one check after the final step, F-REDERIVE for a failure) applied before exit (NP4-6)".
* **X-S6 (NP4-2) — §13.2's §2.6 test (l. 8830–8833) and the staged list's stage-3 row (l. 10680).** In §13.2 replace
  "de-rectangled rects turned quads, undo byte-identical (NP3-1, pipeline round 4 X-S3)" with "de-rectangled rects
  turned quads, undo byte-identical, and a building with a hand-built stored `Composition` whose composed wings unite
  to the moved footprint face after each move, its rooms inside and its tower centres inside or on it, undo restoring
  it byte for byte (NP3-1, NP4-2; pipeline round 4 X-S3)". In the staged list replace "`carryWings`, which keeps every
  stored wing on its footprint through every move — the union test a stage-3 `compose()` must pass —" with
  "`carryWings`, which keeps every stored wing, and a stored composition's rings and tower centres, on its footprint
  through every move — the union test a stage-3 `compose()` must pass, run at the stage-3 intake on stored compositions
  (NP4-2) —".
* **X-S7 — the judgment-calls table.** Add rows J-P47 – J-P49 and replace rows J-P35, J-P42, J-P44 and J-P45 by the
  texts of §4 below.

## 4. Judgment calls for the architecture's table

New rows (append after J-P46):

| id | judgment |
|---|---|
| J-P47 | Chose to run §2.6's wing carry after every committed batch whose commit record changes a footprint face — in generation or in an edit, in the pool, the hinterland unit or the generation worker — over naming its callers (S11 and the edit layer) and over forbidding S12b's L4 edges to end on a footprint ring, because a list of callers goes stale with every stage that writes L4 (S12b's gardens now, a stage-2 close-up or a registered stage later) while the commit record names every changed face by construction, and a garden's grid line or an orchard's edge meeting the house wall is the natural layout a ban would distort; generation, every pool size, replay and Regenerate (keep settings) then store the same bytes (§2.6, §4.1; NP4-3). |
| J-P48 | Chose to carry a stored stage-3 composition in the same `carryWings` call as the base wings — its boundary points made footprint vertices by the edit that stores it, boundary runs re-read by identity, other points by mean-value coordinates, the composed union checked, a failure outside a warp orphaning the stored record visibly — over leaving it at fixed coordinates (a warp would leave its roofs, rooms and 3-D export behind the moved house) and over re-composing it from the moved outline (which discards the user's edit that stored it), because the composition's union is the outline's by contract, so the same rules move it exactly as far as the ground under it moved (§2.6; NP4-2). |
| J-P49 | Chose to decide §2.6's wing check by the building's pairing — no union for a wing re-read whole, simple counter-clockwise rings for tiled wings (exact by the winding-number identity; 75 884 of 75 884 agreements with the full geometric test, measured), the arrangement union only for overlapping wings — inside the step's whole-step validation, with a measured cost (≈ 0.4 ms a pass for 450 buildings, ≈ 3.6 ms worst case) counted in §12.6's warp Apply budget and a pre-decided fallback (one check after the final step, F-REDERIVE for a failure), over one union per building per step (up to ≈ 11 ms a pass for 450 buildings) and over checking only after the step, which re-derives a building that halving would have kept (§2.6 rule 4, §12.6; NP4-6). |

Restated rows (replace the current text):

| id | judgment |
|---|---|
| J-P35 | Chose to solve the harbour route after the trace and the moat, through the serving gate (least cost from the gates' exits) and outside `T`'s road set, over keeping it among the gate routes that shape `T` (the boundary would depend on a route whose form depends on the boundary) or adding a gate for it beyond N (breaks MFCG's gate law and "roads leaving = N"); only a sealed town (`N = 0`) gets a harbour water gate by rule, and the serving gate's detour is bounded by the harbour pick (J-P45), with the same harbour-gate rule — the detour guard — as its pre-decided fallback and, where the harbour's nucleus has no unforced pick left, as its rule (§4.2 S3 (4), (7), (11); VP2-2, NP3-7, NP4-4). |
| J-P42 | Chose to carry a building's stored wing rings with its footprint face — boundary runs re-read vertex for vertex from the footprint's rings after every change of them, joints by mean-value coordinates, a de-rectangled rect turned quad, the union check inside a warp's whole-step validation — over making wings L4 sub-faces now (a per-wing entity and the stage-3 face split in the base) and over re-fitting wings from the moved footprint (which changes the ridges and wing split of every warped house), because a carry moves each wing exactly as far as the ground under it and keeps the wings' union equal to the footprint (48 000 of 48 000 tiled carries at 0.25–3 m warps, measured); the carry runs after every committed batch that changes a footprint face (J-P47), carries a stored composition with the wings (J-P48) and decides its check by the wings' pairing (J-P49); and chose to stop storing the slot hint over carrying it too, because nothing after S11 reads it (§2.5, §2.6, §4.7; NP3-1, NP4-2, NP4-3, NP4-6). |
| J-P44 | Chose to emit every crossing site as a `Bridge` in state `site` — two pinned bank vertices, no span, no way, no furniture, not drawn — that becomes `built` only when a way lays its span through them, with the town bridge the one site S3 makes a destination, over making every emitted site a destination (a river lined with roads to dozens of bridges) and over emitting no site until a route needs one (growth, epochs and drawn bridges would then place decks after L1 exists every time), because FTG turns only crossing road proposals into bridges and MFCG draws one bridge per street crossing (1–4 per city); chose one L0 batch of two same-level shore splits, nothing cleared, for a deck where no site stands on standing water (F-ROUTE's extra bridge, a drawn bridge beyond 20 m of every site) over the carve's preparation path, because nothing enters the water, so the only contact is the two shore points; and, inside S1's water operator or a carve, whose water is not yet inserted, chose to let F-ROUTE's rung only site its deck, placed by the operator's L1 batch and promoted by its L0 batch like the operator's other decks, over splitting shores that the operator's L0 batch removes (§2.7, §4.2 S1 (5), S3 (13), §4.3, §4.4; NP3-4, VD4-10). |
| J-P45 | Chose to force one of the N gate picks at the node where the plaza ↔ harbour least-cost lattice path (the wall ignored) leaves the pick contour, whenever the harbour lies outside it, with the harbour-gate rule as the pre-decided fallback if M1's measurement fails (p99 of harbour route ÷ that path ≤ 1.5 on B-CITY walled coastal seeds), over letting the harbour's bearing only score the picks (a jitter or terrain term can still move the pick away, leaving the detour unbounded) and over always adding a harbour gate beyond N (J-P35's objection), because the forced pick's gate route is that least-cost path's own prefix, so the harbour road leaves on the harbour side by construction and N is kept; where the harbour's nucleus has no unforced pick left (its `N₁` taken by polycentric forced picks), chose the detour guard unconditionally over raising that nucleus's `N₁` (breaks the gate law and the nested-pick prefix) and over releasing a polycentric forced pick (cuts the gate-to-gate route between the nuclei); a declared design change to `T` and the gates of harbour towns (no golden exists) (§4.2 S3 (4), (7), (11); NP3-7, NP4-4). |

## 5. Deferral scan, CONFIRMED versus PLAUSIBLE, and what a Fable reviewer should re-check first

**Deferral scan.** Every changed sentence of §2 and every request of §3 was scanned for TBD, "to be decided / defined /
determined", defer, postpone, later, "at M0", "open question", "left open", future, eventually, "not yet", "for now",
TODO, revisit, "if needed", "as needed" and "out of scope" (scratchpad `r5p/deferral.txt`): 10 hits, all ordinary
sequence words — "a later batch", "every later smoothing" and "every later committed batch" (order of batches), "whose
water is not yet inserted" ×5 (the order inside an operator, VD4-10) and "a registered stage later" ×2 (J-P47's
reason: what a list of callers would miss). The one owner-staged subject touched, stage 3 (NP4-2), has its hook
concrete now — `CarriedShapes`, the carry rules, the check and the orphaned fate — and B-EDIT exercises it with a
hand-built composition from M3a. Each choice an experiment must confirm carries its measurement
and pre-decided fallback in the text: the wing check's cost (M3a, a 150 m brush over a CITY core; fallback: one check
after the final step, F-REDERIVE) and the harbour pick (M1, p99 ≤ 1.5; fallback: the detour guard, now unconditional
for a nucleus with no unforced pick).

**CONFIRMED (executed in this lane):** the bench `docs/validation/bench/fixall_pipeline_r5_wingcost.mjs` → `.out`
(Node 24, seeded, 20 000 buildings × 7 repetitions per class): per building per validation pass 0.06 µs (row quad),
0.43 µs (one-wing rect), 0.86–2.74 µs (tiled L, T, cross, U, inner-joint), 1.15 µs (the overlap model's stand-in check);
the identity pairing 0.26–0.92 µs once per edit, holding for every tiled class and failing for the overlapping T; 0.17
ms per pass for 450 buildings on the assumed mix (≈ 0.4 ms with the overlapping unions at their 25 µs bound); and the
simple-counter-clockwise-with-pairing test agreeing with the full geometric edge test on 100 000 carries at 1 m (all
passing) and on 75 884 carries at 8 m (3 574 failing). Every substitution in §2 matched the current text exactly once
(the build script asserts it), and a line diff of each block against the current text shows only the listed changes.
The deck, gate and composition greps behind §3's line numbers were run on the current file.
**PLAUSIBLE (reasoning on the text; no engine exists):** that each mechanism defeats its failure scenario in an
implementation; the core mix (55 % row quads, 25 % one-wing, 18 % tiled, 2 % overlapping) and 450 buildings for a 150 m
brush over a CITY core, which M3a measures; the overlapping-union bound (S11's compound geometry share, ≤ 25 µs); the
bench's absolute times, taken on the bench machine, not §12.1's reference hardware; the 1.5 × `L*` bound through the
guard's harbour gate on the polycentric fixture (the fixture tests it).

**What a Fable reviewer should re-check first:** (1) J-P49's exactness argument — that the pairing (by vertex identity)
plus simple counter-clockwise rings is equivalent to "the wings' union equals the footprint face and they overlap
nowhere", and that a step which only moves vertices cannot change the pairing (the bench agrees on 175 884 carries,
but the argument carries the weight); (2) J-P48's storing step — that inserting a stored composition's boundary points
into the footprint ring, with a row neighbour's collinear vertex taken into the edit's scope, is the right price for
an owner-staged hook, and that "orphaned" is the right fate for its rare non-warp failure; (3) VD4-10's reach — that
the water-operator exception is also right for a carve's kept ways (§4.11), where the carve's own way rule already
solves each kept way's deck through S4's operator.

## Fable review (2026-09-27) — A-fixall/draft-pipeline-r5

**Verdict: CONFIRMED.** Reviewed by Fable (lane fable-review/main/pipeline, `docs/fable-review/main/pipeline.md`) on the live design (`docs/ARCHITECTURE.md` sha256 1c23190f…, 13 026 lines). The 8 dispositions stand; J-P47–J-P49 are the right calls. J-P49's exactness argument re-derived: under the pairing every wing edge is the reverse of exactly one other wing's edge (the pair cancels in the winding-number sum, the vertices being identical) or a footprint edge used once with the interior on the left, so Σ wind = 1 inside the face and 0 outside; simple counter-clockwise rings contribute 0 or 1 each, hence the wings tile the face without overlap — exact for every ring shape; a step that only moves vertices leaves the pairing unchanged. The wing-cost receipt `fixall_pipeline_r5_wingcost.mjs` re-run: every structural line identical, timings within noise. No correction.
