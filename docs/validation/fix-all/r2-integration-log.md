# Fix-all round 2 — integration log (lane fixall/integrate-r2)
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat fixall/integrate-r2 (2026-09-25); queued in docs/FABLE-REVIEW-QUEUE.md.

**In plain words.** After round 1, five checkers listed 99 things still wrong or newly broken in the design. The five
area architects each fixed theirs in a draft; this seat merged the five drafts into `docs/ARCHITECTURE.md`, made every
change one area asked another to make, and settled seven places where two drafts (or a draft and the kernel's rules) did
not fit together — the biggest: the town wall's band is now built in its own strip of ground after the lanes, and the
part of that work that touches both sides of the wall runs before the parallel workers start, because two districts
share the wall line (the same holds for the town's outer edge, which now gets a thin strip on each side). Result: all 99 items FIXED (one of them a duplicate fixed with its twin), none INVALID, none staged,
none deferred; the per-item record is `docs/ARCHITECTURE-VALIDATION.md` §R2.

Status: COMPLETE (2026-09-25).

## 1. Method

1. **Blocks (step 1).** Every `=== REPLACE` block of `r2-{kernel,determinism,pipeline,rendering,scope}.md` (90 blocks) was
   spliced into `docs/ARCHITECTURE.md` by a script that matched each marker to the heading it names and replaced the
   section's own lines (heading to the next heading), area by area in the order kernel → determinism → pipeline →
   rendering → scope, logging after each area (the pre-integration file, 6 350 lines, is kept in the session scratchpad
   as `ARCHITECTURE.pre-r2.md`). The pipeline's one `=== INSERT AFTER` block (J-P26–J-P33) was not applied: the scope
   block's judgment table already carries the same eight rows byte for byte (md5 compared). Each block's banner became
   `> PENDING FABLE REVIEW — revised by opus stand-in (fixall/integrate-r2); drafted by fixall/draft-<area>-r2`.
   Blocks go in before requests because a request aimed at another area's section would otherwise be overwritten by that
   area's block.
2. **Cross-area requests (step 2).** All 125 request rows were read with each receiving draft's coordination record;
   71 were already in the receiving block (phrase-grep verified), 50 were applied here as targeted edits (each asserted a
   unique match before replacing), 4 were superseded by a conflict resolution (§3–§4).
3. **Coherence (step 3).** Beyond the requests, the integrated text was checked for contradictions the drafts could not
   see in one another: the kernel's pool scope rule against the pipeline's pooled wall-strip step (C-3) and against the settlement perimeter and the hinterland unit (C-7), the kernel's
   dissolution rule (C-5), the district-boundary statement (C-6), stale bars (§13.4's `min(12, …)` label count, §13.1's
   S7-band fixture, §1.5's "provisional boundary"), §12.4's rows against §4's new stage contents (re-summed: CITY
   ≈ 251 ms p50, p95 ≤ 300 ms unchanged; §12.3's p50 column updated to 75 / 251 / 600 ms), the summary and the staged
   list. Scripted checks: every `§n.m` pointer resolves to a heading (0 dangling; the only three non-matching `§`
   strings point into other documents — RFC 7946 §3.1.6, `os-geometry.md` §2.1.4, `proposal-product.md` §16.2); the
   section numbering is contiguous (0.1–0.8, 1.1–1.7, …, 17.1–17.4, II.1–II.6); every section this round changed (100)
   carries a banner naming `fixall/integrate-r2`; the FTG-22 receipt — the 35 identifiers of
   `research/findings/ftg-payload-visual.md` §7.2 plus `SET_TIME`, whole-word grep — gives 0 hits (the only token that
   matches, `README.md`, is a file name, not an FTG identifier); a deferral-language scan finds no deferral.
4. **Validation record (step 4).** The §R2 table was generated from the five drafts' disposition tables joined to the
   verification files (source and severity per id) and `index.json` (for the nine round-1 items the verifiers judged
   UNRESOLVED): 99 of 99 ids, each exactly once.

## 2. Progress by area (step 1 — blocks)

| area | blocks applied | architecture lines after the area |
|---|---|---|
| kernel | 11 REPLACE (§2.2, §2.3, §3.1–§3.4, §3.6–§3.10; §3.5 unchanged) | 6 750 |
| determinism | 16 REPLACE (§2.1, §2.9, §5.1–§5.3, §6.1, §6.3–§6.5, §7.1–§7.6, §7.8) | 7 051 |
| pipeline | 20 REPLACE (§2.5–§2.7, §4.1–§4.9, §4.11, §4.12, §10.4, II.1, II.4–II.6, PART III); its INSERT of J-P26–J-P33 not applied (already in the scope block's table) | 7 442 |
| rendering | 23 REPLACE (§8.1–§8.6, §8.8–§8.10, §9.1, §9.2, §9.4, §11.1–§11.3, §12's heading and plain words, §12.1, §12.3, §12.5–§12.9) | 7 906 |
| scope | 20 REPLACE (§1.2, §1.4, §1.7, §13.1–§13.9, §14, §15.1, §15.2, §16, §17.1, §17.2, Delegated decisions, Judgment calls) | 8 193 |
| after steps 2–3 | (requests, conflicts, summary, §0.8, staged list, §12.4, banners) | 8 383 |

## 3. Cross-area requests (step 2)

Every request row of the five drafts was read with the receiving draft's coordination record (kernel Part 3's closing
note; determinism §3; pipeline §3 "Coordination"; rendering §3.0; scope §3.5). A row counts as *absorbed* when the
receiving area's block already carries it (checked by a phrase grep on the integrated text), *applied* when this seat
edited the text (every edit asserted a unique match; scripts `p_kernel.py`, `p_pipeline.py`, `p_det.py`, `p_124.py`,
`p_rend.py`, `p_misc1.py`, `p_misc2.py`, `p_16.py`, `p_15.py` in the session scratchpad), and *superseded* when a
conflict resolution replaced it (§4).

| from → to | rows | absorbed by the receiving draft | applied at integration | superseded or amended (conflict) |
|---|---|---|---|---|
| kernel → pipeline (P1–P16) | 16 | P2–P8, P10, P15, P16; P9's op-form declarations | P1 (§2.4 `Way.width` as a knot profile, paragraph wording); P9's `txForm` in §4.12 `StageDecl` | P9's "S7 L3 batch", P11, P12, P13 (C-1: wall strips instead); P14 (C-2: geometry-free S12a) |
| kernel → determinism (D1–D7) | 7 | — (the determinism draft landed first) | D1, D2, D5, D6, D7 as written | D3, D4 amended by C-1 ("S10's step (0)" for "S7's band step") |
| kernel → rendering (R1–R6) | 6 | R4, R5, R6 | R1, R2, R3 (§12.4, not replaced by the rendering draft) | — |
| kernel → scope (S1–S7) | 7 | all seven | — | S1's "S7 band parts" fixture reworded to "kept L3 content" (C-1) |
| determinism → kernel (KR-1–KR-3) | 3 | KR-3's pointer (VK-12) | KR-1 (`deck` structural role, §2.2 rule 7), KR-2 (§3.9 chunks), KR-3's Clipper2 sentence (§3.7) | — |
| determinism → pipeline (PR-1–PR-6) | 6 | PR-1, PR-2, PR-3, PR-4, PR-5 (§4.1), PR-6 | PR-5's `StageDecl.workLimits` (§4.12) | — |
| determinism → rendering (RR-1–RR-7) | 7 | all seven (RR-7 needs no text) | — | — |
| determinism → scope (SR-1–SR-7) | 7 | all seven (SR-3's 29 700 harmonised to 29 900 by scope) | — | — |
| pipeline → kernel (K1–K5) | 5 | — (the kernel draft landed first) | K1 (§2.2 rules 1 and 7), K4 (§3.8), K5 (§2.2 rule 1, §3.7) | K2 adopted as clear regions (C-4); K3 refined by the `split` flag (C-5) |
| pipeline → determinism (D1–D8) | 8 | — | D1–D8 (§5.2 F-ROUTE, F-SITE, F-WALL, F-CASTLE; §5.3 three rows and the deck row's coverage; §6.1 note; §6.3 two anchor rows and units; §6.5 (9); §7.3 items 1, 7 (ii), the S7 and carve rows; §7.4 draw walls) | — |
| pipeline → rendering (R1–R5) | 5 | R2, R3, R4, R5 | R1 (§12.4, with §12.3's p50 column re-summed) | R1's "band parts into the pooled row" (C-3: eager, ≈ 1 ms on the critical path) |
| pipeline → scope (S1–S6) | 6 | all six | — | — |
| rendering → determinism (D1–D7) | 7 | D4 (N-1 already in §2.9 load step 3 and §7.3 item 2) | D1, D2, D3, D5, D6, D7 | — |
| rendering → pipeline (P1–P3) | 3 | P1, P2 | P3 (§4.10) | — |
| rendering → scope (S1–S18, J-R19–J-R37) | 18 | all eighteen and the nineteen rows | — | — |
| scope → rendering (RR-S1–RR-S8) | 8 | RR-S5 | RR-S1 (§11.3), RR-S2 (§9.5), RR-S3 (§8.10), RR-S4 (§8.5), RR-S6 (§8.2), RR-S7 (§12.6), RR-S8 (§8.1, §8.2, §8.8) | — |
| scope → pipeline (PR-S1–PR-S2) | 2 | — | PR-S1 (§10.3 calendar), PR-S2 (§4.7, §4.9) | — |
| scope → determinism (DR-S1–DR-S4) | 4 | — | DR-S1 (§6.1 town root, rerollable concerns), DR-S2 (§5.3), DR-S3 (§6.5 (9)), DR-S4 (§7.3 (iv), §6.1 reroll cap) | — |
| **total** | **125** (kernel 36, determinism 23, pipeline 24, rendering 28, scope 14 — counted from the tables; the lane summaries' 22 / 23 / 13 counted some rows as one) | **71** | **50** (5 of them amended: kernel D3, D4 by C-1; pipeline K2 by C-4, K3 by C-5, R1 by C-3) | **4** superseded (kernel P11–P13 by C-1, P14 by C-2) |

## 4. Conflicts resolved

| # | areas | the disagreement | resolution (and where) | judgment |
|---|---|---|---|---|
| C-1 | kernel × pipeline | the wall band: kernel VK-1 builds it as S7's kept L3 content before S8, with S8 / S9 domains excluding band ⊕ setback and edits re-running "S7's band step" (kernel P11–P13, D3, D4); pipeline NF-P5 cuts two L1 wall strips at S7 and builds the band, setback, glacis, tower and gatehouse parts inside them after S9 (S10 step (0)) | the pipeline's order, for its stated reason: an S8 cut toward the wall needs an L1 boundary to end on, and a band edge is L3 and invisible at L1. The kernel's kept-content rule stays as the general safety net (the one-click order now produces no kept content). Kernel text changed to match: §2.2 rules 1, 6 and 7 (`setback` structural role; strips as L1 faces), §3.3 (one-level example, kept-content paragraph, declared-form list, J-K14's reason), §3.7 (the kerb paragraph); determinism §7.1 dry-run resolution and §7.3 item 2 read "S10's step (0)" instead of "S7's band step" (kernel D3 / D4 as amended by pipeline D7) | J-P29 (pipeline), J-K14 amended |
| C-2 | kernel × pipeline | the hinterland: kernel P14 has S12a commit its own corridors and outside plots before S8 / S9 and S12b write boundary-way roles after the merge; pipeline makes S12a geometry-free, lets S9 commit the hinterland's corridors, runs the hinterland's S10–S12b as a unit on the generation worker, and writes avenue rows as `Greenery.along` records with no edge | the pipeline's version (no kept content arises; S9 stays one uniform stage); kernel P14 declined. §3.3 pool step 3 now names the hinterland unit as one more overlay and states that avenue rows write no role | J-P27 (pipeline) |
| C-3 | pipeline × kernel (found at integration) | pipeline §4.1 runs a wall-strip block's band parts as the first part of S10 *inside the derivation pool*; kernel §3.3's scope check forbids a district overlay from writing an edge outside its face set — and the wall trace those parts split with Steiner vertices lies between the inner strip (the walled district) and the outer strip (another district or the hinterland), so both sides' overlays would write the same base edge (`E_SCOPE` at merge) | S10's wall-strip step (0) runs **eagerly on the generation worker**, one L3 batch per enceinte covering both sides of the trace, after S10a and before the pool's freeze; everything else in S10–S12b stays pooled. Written into §3.3 pool step 1, §4.1 (chart, batch table, pool bullet), §4.7 S10 (0), §12.4 (S10 (0) joins the critical path; ≈ 3 ms with C-7's margin bands) | J-I9 (new) |
| C-4 | pipeline → kernel (new semantics the kernel draft never saw) | pipeline K2 asks for local coarse insertion — a carve or outer moat that clears finer content only near the new channel and meets finer geometry only at prepared vertices — which §4.4, §4.11 and determinism's S1 water operator all rely on; without it an L0 batch would clear its whole land component | adopted as §3.3's **clear regions** (`KernelTx.clearRegion`; promotion of the prepared vertices; `E_LEVEL` / `E_KEPT` for any other contact), with the pipeline's own pre-decided fallback (clear the whole L0 land face and re-derive; `moat: 'all'` only before S5c; an edit carve as a declared town-wide re-derivation) and an M3a confirmation by fixtures (§13.1, §13.2) | J-I10 (new) |
| C-5 | pipeline → kernel (refined at integration) | pipeline K3 asks `removeEdges` / `clearFiner` to dissolve *any* degree-2 vertex left with no role, no pin and identical role sets on both edges; taken literally that would also dissolve a spine's own shape vertex on which a removed lane had been attracted, straightening the spine | dissolution is limited to vertices carrying a new kernel `split` flag (created on an existing edge by a split foot or a crossing and not moved by a warp since; Steiner vertices always carry it), so removing a lane restores the split edge exactly and never touches a chain's own shape vertices (§2.2 `flags`, rule 3; §3.4) | — |
| C-6 | pipeline × kernel × determinism (found at integration) | "district boundaries (always spine edges)" (§2.2 rule 1, §2.9's chunk argument) against S6's settlement perimeter (a `district_bound` chain that is not a way) and the grower's wall-trace boundaries | district boundaries are "always L1 edges (a spine, a wall line, a shore or the perimeter)"; the chunk argument needs only that, and holds (§2.2 rule 1, §2.9, §3.9) | — |
| C-7 | kernel × pipeline (found at integration; the family of C-3) | the kernel's scope rule (a pooled overlay writes nothing outside its face set) rested on "district boundaries are spines", but round 2's pipeline adds non-spine shared edges: the **settlement perimeter** between the districts and the hinterland unit (both pooled), and any reservation boundary two districts share; a plot line and a furlong line ending on the perimeter would both split it (`E_SCOPE` at merge), and, read literally, the rule also forbade a waterfront plot line ending on its own bank | §3.3 pool step 3 now defines the **scope** exactly (faces of the set, edges with the set on both sides, vertices wholly inside, and — for splits only — boundary edges whose other side no overlay writes: water, the frame margin); S10's eager step (0) becomes the **shared-edge step**: besides the wall parts it lays a 2 m **margin band** (a backland strip on the district side, a headland on the hinterland side, unbuildable residue drawn as its side's ground) along every other shared non-spine L1 edge, so the pooled lines end inside their own set. Written into §2.2 rule 1, §3.3 steps 1 and 3, §4.1 (chart, laziness, batch table, pool bullet), §4.5, §4.7, §4.9, §12.3, §12.4 (≈ 3 ms; CITY ≈ 251 ms p50) | J-I9 (extended) |

## 5. Document-level work

* **Summary (the one page).** Kept true to the revised design: the first wall, its gates, the castle weld and the moat
  come from the main roads to the gates (NF-P1); moats and canals come with their bridges (NF-P4); a strip along every
  wall stays free of houses and lanes (NF-P5); the first-map promise is stated as the rendering law gives it — under a
  second for every town and city and for a metropolis up to about 48 000 people, about 2.3 s at the 120 000 cap, a
  trade declared for the owner's veto (N-2, D-18); moving a river moves its bridges and undo works in a shared town
  (LC-7, NF-D1); an unrated owner panel keeps the build going but never claims parity (NF-S2).
* **Title revision note and §0.8** (new): the round-2 record in the architecture.
* **"Staged by the owner's roadmap"** (the former "Deferrals" section, converted in round 1) re-checked: it lists only the
  seven roadmap subjects; three rows gained the hooks round 2 added (stage 2: the shared `Seam` records, `baseLane`
  portals and the seam exception; stage 3: `BaseWing.kind` and `fixedWings`, S11's geometry share and the stage-3
  re-budget; sky islands: the sky allocations S7b creates before any island, the tunnel's invert profile, drainage over
  frame and margin). No other former deferral reappears; round 2 staged nothing.
* **Judgment calls.** The scope block's table (172 rows) plus J-I9, J-I10, J-I11 and the amended J-K14 (175 rows); J-P27's
  wording repaired (its "over" clause had lost its separation).
* **§12.4 / §12.3.** Kernel R1–R3 and pipeline R1 applied with C-3's eager wall-strip row; the CITY critical path
  re-summed to ≈ 251 ms p50 (S2 / S3 16, S4 10, S5 40, S7 4, S12a 1, S10 (0) 3, merge 8 + copies 3; p95 ≤ 300 ms
  unchanged); the single-worker CITY path ≈ 332 ms; METROPOLIS ≈ 600 / 795 ms; TOWN ≈ 75 ms (all PLAUSIBLE until M0 / M1).

## 6. Changed sections of docs/ARCHITECTURE.md

Every heading below carries `> PENDING FABLE REVIEW — revised by opus stand-in (fixall/integrate-r2)` (101 headings:
100 changed sections plus the new §0.8; "drafted by" names the area whose block the section is; *integration* marks
sections this seat changed without a block). Sections this seat edited on top of a block (requests and conflicts):
§2.2, §2.7, §2.9, §3.3, §3.4, §3.7, §3.8, §3.9, §4.1, §4.5, §4.7, §4.8, §4.9, §4.11, §4.12, §5.2, §5.3, §6.1, §6.3, §6.5,
§7.1, §7.3, §7.4, §8.1, §8.2, §8.5, §8.8, §8.10, §11.1, §11.3, §12.3, §12.6, §13.1, §13.4, §16, the judgment calls.

* **kernel** (11): 2.2 The plat; 2.3 Terrain and water; 3.1 Build-versus-adopt, per primitive; 3.2 Numeric policy; 3.3 The transaction protocol; 3.4 Kernel operations the pipeline needs (complete list); 3.6 Insertion, contact and move semantics; 3.7 One geometry engine on every host; 3.8 The straight skeleton; 3.9 Geometry in the document — each arena stored once; 3.10 Kernel invariants — what is checked, when, and at what cost
* **determinism** (16): 2.1 Layers, coordinates, units, ids; 2.9 The document and serialisation; 5.1 Principles and the seven tiers (G-P7); 5.2 Failure classes: detection, ladder, test; 5.3 The invariant suite, by scope (SCL-1); 6.1 RNG and stream design; 6.3 Identity: address ids, lineage keys, carry-over (and the scope of stability, stated); 6.4 Permalinks, version axes, retention and goldens; 6.5 Floating-point policy, determinism lint, determinism tests (G-P10); 7.1 Edits are ordered events on addresses; the named actions; the edit targets; dry-run va; 7.2 Locks, pins, edited and assigned entities, drawn constraints, field brushes; 7.3 Locality; 7.4 Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate); 7.5 Migration and upgrade (G-P9); 7.6 The override layer and editable tables (G-P12; owner amendment 5); 7.8 Controls: monotone, continuous, documented; the control-surface budget (O16 f, R15)
* **pipeline** (20): 2.5 Districts, quarters, blocks, plots; 2.6 Buildings, heights and ground datum, wings, materials, sub-locations, the stage-3 inte; 2.7 Walls, gates, towers, castle, bridges; greenery, land use, decorations, pins; labels; ; 4.1 Stage graph, evaluation model, laziness contract, transactions, the worker; 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, reservations, the stage-1 boundary ; 4.3 S4 Backbone; 4.4 S5 Growth stages; 4.5 S6 Districts, quarters and fields · S7b Allocation and district claims; 4.6 S8 Infill; 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b Placement · S11 Site plans and; 4.8 S7 Fortification furniture (per enceinte) · the castle · water furniture; 4.9 S12a Hinterland siting and the hinterland unit · S12b Greenery; 4.11 Incremental mode, transformations and conversions (the evolution hook; one path built; 4.12 The strategy interface, stage registration by declared I/O, and the stage-2 seam (poi; 10.4 Names, descriptions and setting packs; II.1 The district → neighbourhood interface; II.4 The render tier, the workflow and the close-up's persistence status (S5, S6); II.5 What the base already carries for stage 2 (all base requirements in PART I); II.6 The staged layers; PART III
* **rendering** (23): 8.1 The display list (renderer-independent, columnar, incremental); 8.2 Style sheets as data: roles, contrast, symbolisation, paint programs, layer order, pre; 8.3 Symbol catalogue and draw-style census; 8.4 Layers, shadows, heights; 8.5 Level of detail, the city-band figure-ground contract, way selection, first paint; 8.6 Stage-2 render tier and stage-3 LOD; 8.8 Tiles, zoom stops, print and the canvas budget; 8.9 Backends, text, threads and the worker boundary; 8.10 Decoration instances (trees, scatter, crowns, roof detail); 9.1 What is model and what is view; 9.2 Placement (S13b): font metrics, zoom stops, the global greedy evaluated locally; 9.4 Sizes, floors, the ladder, quarters, overflow, halos; 11.1 Formats; 11.2 The embedding API and the worker boundary (SCL-6); 11.3 The host bridge — the host is the store (FTG-12); §12 Performance budgets; 12.1 Reference hardware and how budgets are measured (SCL-15); 12.3 Model budgets on the one-click path; 12.5 First map, frames, zoom, pan, draw calls, uploads (SCL-7, SCL-17, VIS-6); 12.6 Edits, regeneration, replay and warp, as functions of scope (SCL-9); 12.7 Labels, trees, exports (SCL-8, SCL-10, SCL-14); 12.8 Memory (what is counted, per rung); 12.9 Reference comparisons and the declared trade
* **scope** (20): 1.2 The one-click default, stated once; 1.4 Fusion thesis, stage by stage; 1.7 Tech stack (reasons; no dependence on any existing project); 13.1 Kernel property tests (fast-check; B-FUZZ) and the ladder coverage test; 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT; 13.3 Seed goldens with the declared-shift protocol (G-P11, G-R9), from M1; 13.4 Visual regression, B-ZOOM and the app harness; 13.5 Reference-parity metrics (B-REF), read from one numbers-only baseline file; 13.6 The owner's side-by-side protocol (D-5); 13.7 Thresholds without a reference source (IMP-6, DEF-1; D-30); 13.8 CI tiers and compute budgets (SCL-18; D-34); 13.9 The corpus-calibration interface (staged by the owner; DEF-9); §14 Package and module layout, key interfaces, dependency rules, extension points; 15.1 Parity matrix; 15.2 Improvement matrix; §16 Build plan; 17.1 The clean-room chain (IMP-1; D-29); 17.2 Fonts (IMP-15); Delegated decisions (the owner deferred all judgment; each is final unless vetoed); Judgment calls ("chose X over Y because Z"; each vetoable)
* **integration** (11): ARCHITECTURE; The whole design in one page (plain words); 0.8 Fix-all round 2 (2026-09-25): the items still open after round 1; 1.5 Incremental growth (the evolution hook, answered by the thesis); 2.4 Ways (the skeleton) and typed edges; 4.10 S13 Names and labels · S14 Display list · S15 Simulation; 6.2 What a seed determines, and the model digest; 9.5 Furniture, framing and tools; 10.3 People, households, relations, sub-locations, schedules; 12.4 CITY per-stage split, with the mechanism each budget assumes (SCL-3); Staged by the owner's roadmap (this document defers nothing)

## 7. Counts

| measure | value |
|---|---|
| items handled in round 2 | 99 (kernel 24, determinism 16, pipeline 18, rendering 27, scope 14) — 9 round-1 items judged UNRESOLVED by the verifiers (GEO-3, GEO-5, GEO-35, LC-7, LC-17, COV-VG-VN-029, COV-NG-XB32, FTG-22, IMP-7) and 90 new findings of the five round-1 verifications |
| by severity | 26 major, 71 minor, 2 coverage (1 medium, 1 low); 0 blocker |
| FIXED | 99 (1 of them a duplicate fixed with its primary: N-21 → NF-P9) |
| STAGED-BY-OWNER | 0 |
| INVALID | 0 |
| deferred | 0 |
| replacement blocks applied | 90 (kernel 11, determinism 16, pipeline 20, rendering 23, scope 20); 1 insert block subsumed |
| cross-area request rows | 125 — 71 absorbed by the receiving draft, 50 applied here (5 amended by a conflict), 4 superseded |
| conflicts resolved | 7 (C-1–C-7) |
| new or amended judgment calls | 3 new (J-I9, J-I10, J-I11), 1 amended (J-K14), 1 reworded (J-P27); 175 rows in the table |
| dangling `§` pointers | 0 |
| sections carrying the round-2 banner | 101 |
| FTG protocol identifiers left in the architecture | 0 |
| `docs/ARCHITECTURE.md` | 6 350 → 8 383 lines |

## 8. CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed in this lane):** every block landed at its named heading (script log per area); the J-P26–J-P33
rows identical in the pipeline insert and the scope table (md5); 99 / 99 ids in the §R2 table, each once, all 90 new
findings of the verification files covered; 0 dangling section pointers; contiguous numbering; 101 round-2 banners;
0 FTG protocol identifiers; the §12.4 critical-path sum (≈ 251 ms p50, computed from the table's rows).
**PLAUSIBLE (this seat's reasoning):** every conflict resolution in §4 — in particular that the eager wall-strip step
and its margin bands cost ≈ 3 ms at CITY (C-3, C-7), that clear regions cover every coarse edit the drafts rely on (C-4) and that the `split` flag
is sufficient for exact restoration (C-5); the re-summed p50 figures of §12.3–§12.4. None is measured until M0 / M1 /
M3a; each carries its confirming measurement and pre-decided fallback in the architecture.

## 9. What a Fable reviewer should re-check first

1. **C-1 / C-3 / C-7 / J-I9 — shared edges in the pool.** The pipeline's L1 wall strips with the band built after S9,
   and this seat's eager shared-edge step before the pool's freeze (wall parts, and 2 m margin bands along the
   settlement perimeter and shared reservation boundaries): whether the exact scope definition of §3.3 step 3, the
   laziness contract and §7.3's re-derivation of wall-adjacent cells now agree everywhere, and whether any shared
   non-spine edge remains that the step does not band.
2. **C-4 / J-I10 — clear regions.** New kernel semantics adopted from a pipeline request the kernel draft never saw: the
   carve, the outer moat and S1's water operator all depend on it; check the promotion of prepared vertices against
   VK-18's rule and the fallback's cost.
3. **C-5 / J-I11 and the re-summed budgets.** The `split` flag as the dissolution criterion (a warp clears it), and the
   §12.3 / §12.4 figures this seat re-summed without a measurement.
