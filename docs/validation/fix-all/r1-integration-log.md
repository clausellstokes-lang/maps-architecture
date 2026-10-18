# Fix-all round 1 — integration log (lane fixall/integrate-r1)
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat fixall/integrate-r1 (2026-09-25); queued in docs/FABLE-REVIEW-QUEUE.md.

**In plain words.** Five area architects each rewrote their part of `docs/ARCHITECTURE.md` under the owner's
no-defer rule. This seat merged the five drafts into the one document, applied every change one area asked another to
make, settled the 22 places where two areas disagreed (each written down below and, where it is a real design choice,
as a judgment call J-I1–J-I8 in the architecture), turned the old "Deferrals" list into a list of the subjects the
owner's own roadmap puts later, and recorded the outcome of all 299 items in `docs/ARCHITECTURE-VALIDATION.md`. Result:
282 items FIXED (8 of them duplicates fixed with their primary), 17 STAGED BY THE OWNER with concrete hooks, 0 INVALID,
0 deferred.

Status: COMPLETE (2026-09-25).

## 1. Method

1. **Blocks.** Every `=== REPLACE` / `=== INSERT AFTER` block of `r1-{kernel,determinism,pipeline,rendering,scope}.md` was
   spliced into `docs/ARCHITECTURE.md` by a script that matched each marker to the heading it names (100 blocks; area by
   area in the order kernel → determinism → pipeline → rendering → scope; the pre-integration file, 2 200 lines, was kept
   in the session scratchpad as `ARCHITECTURE.pre-r1.md`). "Plain words" blocks replaced only the paragraph under the
   heading. Each block's draft banner became `> PENDING FABLE REVIEW — revised by opus stand-in (fixall/integrate-r1);
   drafted by fixall/draft-<area>-r1`.
2. **Cross-area requests.** All 181 request rows were read (kernel 49, determinism 27, pipeline 32, rendering 54, scope 19)
   together with each receiving draft's coordination record. 100 had already been absorbed by the receiving draft
   (verified by spot checks); the integrator applied the other 81 as targeted edits (every edit asserted a unique match
   before replacing). Where a request contradicted the owning area's text, the disagreement was settled (§3).
3. **Coherence.** The sections a request or conflict touched were re-read end to end (§2.1–§2.9, §3.1–§3.10, §4.1–§4.12,
   §5, §6.1–§6.4, §8, §9, §10, §11, §12, §13.1–§13.2, §14 package lines, §16, PART II, PART III, the summary, §0.4, §1);
   every `§n.m` pointer resolves to a heading (scripted check: 0 dangling); bare milestone names M2 / M3 remain only in
   historical sentences; every revised section carries the banner (129 headings); the section numbering is contiguous.
4. **Validation record.** The per-item table was generated from the five drafts' disposition tables joined to
   `index.json` (299 of 299 ids, each exactly once, each under its owner area).

## 2. Progress by area

**Step 1 — area blocks applied.**

| area | blocks applied | architecture lines after the area |
|---|---|---|
| kernel | 12 (7 replace, 5 insert: §3.6–§3.10) | 2 719 |
| determinism | 23 (21 replace, 2 plain-words: §6 and §7) | 3 509 |
| pipeline | 27 (26 replace, 1 insert: II.6) | 4 474 |
| rendering | 13 (12 replace, 1 insert: §8.8–§8.10) | 5 405 |
| scope | 25 (22 replace incl. 2 plain-words, 1 insert: §13.6–§13.9) | 6 146 |

**Step 2 — cross-area requests.**

| from → to | rows | absorbed by the receiving draft | applied at integration | declined or superseded (conflict) |
|---|---|---|---|---|
| kernel → determinism / pipeline / rendering / scope | 17 / 15 / 5 / 12 | 17 / — / — / 12 | — / 15 / 5 / — | — |
| determinism → kernel / pipeline / rendering / scope | 3 / 8 / 5 / 11 | — / — / — / 11 | 3 (K-1 verified, K-2, K-3) / 8 / 5 / — | — |
| pipeline → kernel / determinism / rendering / scope | 4 / 12 / 6 / 10 | 4 / 12 / — / 10 | — / — / 6 / — | K-a's drainage-as-L0-edges clause (C-12); R-d's METROPOLIS preview (C-2); R-c's frame-share number (C-15) |
| rendering → kernel / determinism / pipeline / scope | 6 / 12 / 20 / 16 | 6 / 12 / — / 16 | — / — / 20 / — | the 2.5× pure-JS boolean-fallback budget (C-8) |
| scope → kernel / determinism / pipeline / rendering | 1 / 4 / 8 / 6 | — | 1 (K-S1 confirmed) / 4 / 8 / 6 | — |
| **total** | **181** | **100** | **81** | 4 clauses, each settled in §3 |

**Step 3 — document-level work.** The "Deferrals" section became **"Staged by the owner's roadmap (this document defers
nothing)"**, listing only the seven roadmap subjects with the sections that carry their hooks; its "formerly deferred, now
decided" table moved to `docs/ARCHITECTURE-VALIDATION.md` (round 1). Added: §0.7 (the round-1 record), J-I1–J-I8, A.5, a
revision note under the title; the one-page summary gained the two design facts integration settled (the first picture is
always the finished map; city-zoom quarter labels at MFCG's count); §1.2's label sentence follows C-1.

## 3. Conflicts resolved

| # | areas | the disagreement | resolution (and where) | judgment |
|---|---|---|---|---|
| C-1 | pipeline × rendering | quarters: a flat grouping into N_q quarters in S6 (§4.5) versus a full merge tree built in S13a with a per-stop cut (§9.4) | one merge tree built by S6 with one cost (area, + 1 000 ha across kind families, + 10 000 ha across a wall or water barrier); the city cut is the N_q nodes of the count law (model data, `QuarterNode.cityCut`); finer cuts between the city and district bands are view data; the ladder's quarter rung yields to the smallest ancestor that fits (§2.5, §4.5, §8.5, §9.1, §9.4, §12.4, §14, §16 M1, §1.2, summary) | J-I1 |
| C-2 | pipeline × rendering, scope | a METROPOLIS-only block preview (§4.1) versus no preview at any rung (§8.5, J-R7, §1.2) | no preview at any rung; the derivation pool meets the one-second bar; the single-worker fallback's 0.2 s miss is declared in §12.5 (§4.1) | J-I2 |
| C-3 | pipeline × rendering | eager city-band label placement inside the model (§4.1, §4.10) versus placement as view data at every band (§9.1, GEO-29) | S13a (names, candidates, the tree's names) is model and eager; S13b placement is view data at every band, deterministic from the bundled fonts' metrics (§4.1 flowchart and laziness bullet, §4.10) | J-I3 |
| C-4 | pipeline × rendering (scope had reconciled J-P10 with J-R18) | single worker first with the pool behind a METROPOLIS measurement (§4.1) versus the pool as the primary configuration (§12.3, D-18) | the pool is primary, measured at M1 (CITY p95 ≤ 300 ms, identical digests for pool sizes 0–3); the single worker is the pre-decided fallback; M2b repeats the METROPOLIS check (§4.1) | J-P10 as amended |
| C-5 | pipeline × determinism | `DerivationRecord` defined twice with different fields (§2.5, §2.8) | one definition in §2.8, gaining the pipeline's `allocationRow` and `epoch`; §2.5 points to it | — |
| C-6 | pipeline × kernel | entity schemas and PART II stored `HalfEdgeId` / `VertexId` / `FaceId` (§2.4–§2.7, §4.11, II.1) against §2.2 rule 5 | every record reaches geometry through `FaceRef` / `ChainRef` / `EdgeSetRef` / `VertexRef` or a persisted `LatticePoint` (kernel P1–P4, P11); `Frontage` and `PlotBound` gained ids so their edge sets are addressable; `outskirtToDistrict` takes a region | J-I4 |
| C-7 | pipeline × kernel × determinism × rendering | the pool's merge: per-worker arenas with reserved id ranges (§4.1) versus overlays on the one arena (kernel P6) versus lineage-derived addresses with no reserved ranges (determinism P-1); "id order" (§12.4) versus "lineage order" (§6.2–§6.3) | per-worker overlays of disjoint district face sets on the one arena, committed in district lineage order; no reserved ranges (§4.1, §12.4 merge row) | — |
| C-8 | rendering × kernel, scope | §12.4 budgeted S9 / S11 at 2.5× with a pure-JS boolean fallback and WebAssembly in the embed contract, versus one engine on every host (§3.7, GEO-9) | withdrawn: S9 is `corridorUnion` on the arrangement; no WebAssembly assumption; the pre-decided Clipper2-WASM fallback surfaces as `E_ENGINE_UNAVAILABLE` in §11.2 (§12.4, §11.2) | J-K4 |
| C-9 | rendering × scope | TOWN band 2 000–10 000 with a clamp to 2 000 (§12.2) versus 1 500 (D-33, §1.1) | 1 500; below it `LadderRouter` routes to the village product, clamped and reported while none is registered (§12.2, §4.2 S0, PART III) | D-33 |
| C-10 | pipeline × determinism × rendering | stored stream keys (`subseed`, `compositionSeed`, `treeStream`, `subSeed`) versus lineage-keyed streams (determinism P-5) and `instanceKey` (rendering) | no record stores a seed or key; tree instances come from `render.instances/<entity>` by ordinal (§2.4 note, §2.5–§2.7, II.1, §4.9) | J-I4 |
| C-11 | pipeline × rendering | a travel-cost field per growth stage (§4.4) versus "a level set of S4's cost field, no new field" (§12.4) | one field computed once after S4 on S4's lattice with the road multiplier (≈ 4 ms at CITY), stage thresholds on cumulative land, incremental re-settling for S5b's roads; the lattice is built at S3 (§4.3, §4.4, §12.4) | J-I5 |
| C-12 | pipeline × kernel | drainage lines as L0 typed edges (pipeline K-a) versus raster queries (kernel §2.3) | the kernel's position: drainage stays queryable per cell; a visible drainage line is a `tributary` water body; §4.2 S1 (9) already agreed | — |
| C-13 | pipeline × rendering | open-field strips as model faces (§4.9) versus render-time segmentation inside FTG-sized field faces (§12.4) | the model's field faces are ≈ 2.5 ha furlongs carrying crop, livestock and rotation; strips are render-time segmentation (§4.9) | J-I6 |
| C-14 | pipeline × determinism | a refine close-up as derived data never stored (II.4) versus a `closeup` event entering the digest (§7.1, §2.9) | both: derived until a logged `closeup` event precedes its first edit, then in the digest under `closeups` (II.1 rule 4, II.4) | — |
| C-15 | pipeline × rendering | a shadow budget of ≤ 10 % of the city-band frame with a drop-mode fallback (pipeline R-c) versus ≤ 20 % of a tile's raster time (§8.4) | the rendering number kept; the pipeline's pre-decided `drop`-mode fallback added with an M2b measurement (§8.4, §16 M2b) | J-I7 |
| C-16 | kernel × rendering, scope | the range bound derived at the METROPOLIS target (9× headroom) while the ladder admits 120 000 people (153.6 km²) | re-derived at the cap and aspect 2: \|x\| ≤ 1.40 × 10⁶ cm, ≈ 6× headroom; `area2` bounds restated (box 2.81 × 1.41 × 10⁶ cm, terms < 2⁴³, 1 024-term partials 8.05 × 10¹⁵ < 2⁵³ — executed); D-12 says six-fold (§3.2 (1), (6), §12.2) | J-I8 |
| C-17 | rendering × pipeline | §12.4 costed a roster fixed point while §10.2 builds the sequential grid roster (J-P20) | §12.4's S2 / S3 row costs the sequential roster | — |
| C-18 | rendering × pipeline | §12.4 had no row for S7b's allocation and no cost for C-11's field | S7b joined the allocation row (+2 ms) and the field sits in S5 (+4 ms); CITY critical path 239 → 245 ms p50 (p95 ≤ 300 ms unchanged); §12.3's p50s 74 / 245 / 585 ms (PLAUSIBLE until M0 and the fusion gate) | — |
| C-19 | rendering × kernel | `shoreForm` (§8.1) versus `shoreClass` (§2.3) for the same bay / headland / straight attribute | `shoreClass` everywhere (§8.1, §4.2 S1 (7)) | — |
| C-20 | pipeline × rendering | a `Label` record in §2.7 beside `LabelEntity` / `QuarterNode` in §9.1 | §9.1's records are the only label schema; §2.7 and `NeighbourhoodResult` point to them | — |
| C-21 | rendering × determinism | `regenerate(h, scope, 'keep' \| 'adjust' \| 'newSeed')` (§11.2) versus §7.1's named actions | `regenerate(h, scope, 'keep' \| 'newRandom')` plus `adjust(h, param, value)`; `Query` gained people facets, `relations` and `inView` (§11.2) | — |
| C-22 | rendering × determinism | the bridge's version handshake on `generatorVersion` (§11.3) versus replay keyed by `outputVersion` (§6.4) | the handshake compares `outputVersion`; `ready` announces the output versions; convergence is stated per output version (§11.3) | — |

## 4. Changed sections of docs/ARCHITECTURE.md

Every heading below carries `> PENDING FABLE REVIEW — revised by opus stand-in (fixall/integrate-r1)` (129 headings;
"drafted by" names the area whose block the section is; "integration" marks sections this seat wrote or edited without a
block). Sections edited at integration on top of a block are those named in §3 and the request rows of §2 — chiefly
§2.4–§2.8, §3.2–§3.4, §4.1–§4.12, §6.4, §7.1, §7.4, §7.8, §8.1–§8.10, §9.1–§9.5, §10.1–§10.4, §11.1–§11.3, §12.2–§12.8,
§13.2, §14, §16, II.1–II.5, PART III, the judgment calls and the staged list.

* **kernel** (12): 2.2 The plat — one arena per layer, five refinement levels as views, roles instead of stored indices; 2.3 Terrain and water; 3.1 Build-versus-adopt, per primitive; 3.2 Numeric policy; 3.3 The transaction protocol — batches, one level each, canonical order, indexes rebuilt at stage end; 3.4 Kernel operations the pipeline needs (complete list); 3.5 Why this kernel closes the creators' failure classes; 3.6 Insertion, contact and move semantics — attraction instead of a weld dead band; 3.7 One geometry engine on every host — booleans, buffers and the kerb on the arrangement (the boolean-library; 3.8 The straight skeleton — numeric contract, validator, downgrades (the port-versus-build choice decided); 3.9 Geometry in the document — each arena stored once; 3.10 Kernel invariants — what is checked, when, and at what cost
* **determinism** (22): 2.1 Layers, coordinates, units, ids; 2.8 Identity, lifecycle, provenance, the entity registry; 2.9 The document and serialisation; 5.1 Principles and the seven tiers (G-P7); 5.2 Failure classes: detection, ladder, test; 5.3 The invariant suite, by scope (SCL-1); 5.4 The generation report; §6 Determinism; 6.1 RNG and stream design; 6.2 What a seed determines, and the model digest; 6.3 Identity: address ids, lineage keys, carry-over (and the scope of stability, stated); 6.4 Permalinks, version axes, retention and goldens; 6.5 Floating-point policy, determinism lint, determinism tests (G-P10); §7 Editing and regeneration locality — everything is editable; 7.1 Edits are ordered events on addresses; the named actions; the edit targets; dry-run validation; 7.2 Locks, pins, edited and assigned entities, drawn constraints, field brushes; 7.3 Locality — effective scope, local operators, edit fates, recorded inputs, the oracle (G-P3); 7.4 Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) — G-P8; 7.5 Migration and upgrade (G-P9); 7.6 The override layer and editable tables (G-P12; owner amendment 5); 7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the ASSIGN hook); 7.8 Controls: monotone, continuous, documented; the control-surface budget (O16 f, R15)
* **pipeline** (26): 2.5 Districts, quarters, blocks, plots — the PLOT MODEL, reservations, allocations and the context vector; 2.6 Buildings, heights and ground datum, wings, materials, sub-locations, the stage-3 interface; 2.7 Walls, gates, towers, castle, bridges; greenery, land use, decorations, pins; labels; content entities; th; 4.1 Stage graph, evaluation model, laziness contract, transactions, the worker; 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, reservations and gate sites; 4.3 S4 Backbone — arterials routed between named destinations, built as one graph; 4.4 S5 Growth stages — boundary and wall first, main roads, then FTG-shaped growth, then a capacity check; 4.5 S6 Districts, quarters and fields · S7b Allocation and district claims; 4.6 S8 Infill — the measured bent cut as a kernel transaction, per district, with the deep-interior rule; 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b Placement · S11 Site plans and footprints — the pl; 4.8 S7 Fortification furniture (per enceinte) · the castle · water furniture; 4.9 S12a Hinterland land and outside plots · S12b Greenery — the rule tables (O14 / O19); 4.10 S13 Names and labels · S14 Display list · S15 Simulation; 4.11 Incremental mode, transformations and conversions (the evolution hook; one path built in the base); 4.12 The strategy interface, stage registration by declared I/O, and the stage-2 seam (pointer); 10.1 Scope and depth (judgment J-9; IMPROVEMENTS J-S adopted; the content locality contract); 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values); 10.3 People, households, relations, sub-locations, schedules; 10.4 Names, descriptions and setting packs; II.1 The district → neighbourhood interface; II.2 Templates as fabric strategies (NG B2, B7, B8); II.3 Block content dispatch, pins, local identities (S2 context features); II.4 The render tier, the workflow and the close-up's persistence status (S5, S6); II.5 What the base already carries for stage 2 (all base requirements in PART I); II.6 The staged layers — floating islands and sewers: the hooks the base carries now; PART III — What a later village product needs from the base (one page; the hooks are concrete)
* **rendering** (34): §8 Rendering and the style system; 8.1 The display list (renderer-independent, columnar, incremental); 8.2 Style sheets as data: roles, contrast, symbolisation, paint programs, layer order, presets (G-R2); 8.3 Symbol catalogue and draw-style census; 8.4 Layers, shadows, heights; 8.5 Level of detail, the city-band figure-ground contract, way selection, first paint; 8.6 Stage-2 render tier and stage-3 LOD; 8.7 Export resolution; 8.8 Tiles, zoom stops, print and the canvas budget; 8.9 Backends, text, threads and the worker boundary; 8.10 Decoration instances (trees, scatter, crowns, roof detail); §9 Labels and map furniture; 9.1 What is model and what is view; 9.2 Placement (S13b): font metrics, zoom stops, the global greedy evaluated locally; 9.3 Spines and candidates; 9.4 Sizes, floors, the ladder, quarters, overflow, halos; 9.5 Furniture, framing and tools; 9.6 Names; §11 Export and interop; 11.1 Formats; 11.2 The embedding API and the worker boundary (SCL-6); 11.3 The host bridge — the host is the store (FTG-12); 11.4 Host inputs (DEF-11); 11.5 Sharing and multi-client use without a hosted service (DEF-12, COV-FTG-N07); §12 Performance budgets; 12.1 Reference hardware and how budgets are measured (SCL-15); 12.2 Size ladder and matched reference sizes (MFP-5, MN-1, MN-2); 12.3 Model budgets on the one-click path; 12.4 CITY per-stage split, with the mechanism each budget assumes (SCL-3); 12.5 First map, frames, zoom, pan, draw calls, uploads (SCL-7, SCL-17, VIS-6); 12.6 Edits, regeneration, replay and warp, as functions of scope (SCL-9); 12.7 Labels, trees, exports (SCL-8, SCL-10, SCL-14); 12.8 Memory (what is counted, per rung); 12.9 Reference comparisons and the declared trade
* **scope** (31): The whole design in one page (plain words); 0.4 Where the seven late owner rules (`docs/AMENDMENTS-2026-09-25.md`) land; 1.1 What is built, in what order; the two size ladders; 1.2 The one-click default, stated once; 1.4 Fusion thesis, stage by stage; 1.5 Incremental growth (the evolution hook, answered by the thesis); 1.6 Stage 2 and the village in one paragraph each; 1.7 Tech stack (reasons; no dependence on any existing project); §13 Testing and verification; 13.1 Kernel property tests (fast-check; B-FUZZ) and the ladder coverage test; 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT; 13.3 Seed goldens with the declared-shift protocol (G-P11, G-R9), from M1; 13.4 Visual regression, B-ZOOM and the app harness; 13.5 Reference-parity metrics (B-REF), read from one numbers-only baseline file; 13.6 The owner's side-by-side protocol (D-5); 13.7 Thresholds without a reference source (IMP-6, DEF-1; D-30); 13.8 CI tiers and compute budgets (SCL-18; D-34); 13.9 The corpus-calibration interface (staged by the owner; DEF-9); §14 Package and module layout, key interfaces, dependency rules, extension points; §15 Parity matrix and improvement matrix; 15.1 Parity matrix — every capability row of `docs/confidence/*.md` (rows per `judge-parity.md` §2), plus the ; 15.2 Improvement matrix — every must-have / should-have / hook / stage-2 item of `docs/IMPROVEMENTS.md` §5; §16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2; §17 Clean-room and legal posture; third-party licences; 17.1 The clean-room chain (IMP-1; D-29); 17.2 Fonts (IMP-15); 17.3 Our own licence (D-22; DEF-14); 17.4 Dependencies (IMP-14); Delegated decisions (the owner deferred all judgment; each is final unless vetoed); Judgment calls ("chose X over Y because Z"; each vetoable); Staged by the owner's roadmap (this document defers nothing)
* **integration** (4): ARCHITECTURE — PLAT, the fused town/city generator (base), neighbourhood composition (stage 2), and what a vil; 0.7 Fix-all round 1 (2026-09-25): five area drafts, one integration; 2.4 Ways (the skeleton) and typed edges; Appendix A — reading record, and CONFIRMED versus PLAUSIBLE

Unchanged: §0.1–§0.3, §0.5, §0.6, §1.3, the plain-words paragraphs of §1, §2, §3, §4, §5, §10 and PART II.
`docs/ARCHITECTURE.md`: 2 200 → 6350 lines.

## 5. Counts

| measure | value |
|---|---|
| items on the master list | 299 (kernel 21, determinism 47, pipeline 128, rendering 64, scope 39) |
| FIXED | 282 (8 of them marked by their drafts as duplicates fixed with their primary: SCL-22 → GEO-9, VIS-5 → LC-20, VIS-6 → SCL-7, VIS-18 → SCL-14, COV-NG-XB32 → COV-VG-VN-158, COV-FTG-L08 → COV-MFCG-L10, COV-NG-OBS3 → MFP-8, DEF-1 → IMP-6) |
| STAGED-BY-OWNER (hooks concrete) | 17 — COV-VG-VN-156, COV-NG-XA36, COV-VG-VN-090, COV-VG-VN-179, COV-NG-N06, COV-NG-N12, COV-NG-XA07, COV-VG-VN-002, COV-VG-VN-003, COV-VG-WC4, AM-2, MN-4, DEF-7, DEF-8, DEF-9, DEF-15, DEF-17 |
| INVALID | 0 |
| deferred | 0 |
| replacement / insertion blocks applied | 100 |
| cross-area request rows | 181 (100 absorbed by the receiving draft, 81 applied here; 4 clauses declined or superseded, each in §3) |
| conflicts resolved | 22 (C-1–C-22) |
| new judgment calls | 8 (J-I1–J-I8) |
| judgment-call rows in the architecture | 111 (103 from the drafts + 8) |
| dangling `§` pointers after integration | 0 (scripted check) |

**CONFIRMED versus PLAUSIBLE.** CONFIRMED (executed): every block landed at its named heading; 299 / 299 ids in the
validation table, each once; 0 dangling section pointers; 129 banners; the range-bound and `area2` arithmetic of C-16;
the §12.4 critical-path sum (245 ms). PLAUSIBLE (this seat's reasoning): every conflict resolution in §3 and the budget
additions of C-18 — none is measured until M0 / M1.

**What a Fable reviewer should re-check first.** (1) C-1 / J-I1 — one quarter tree with a count-law city cut, and the
label ladder's quarter rung that now climbs the tree. (2) C-11 / J-I5 — one travel-cost field for all growth stages
(including the claim that measuring from the previous boundary equals `T − t_(k−1)` while costs are unchanged) and the
+6 ms it adds to §12.4. (3) C-2 / C-4 — no preview at any rung with the pool as the primary configuration, which makes
the METROPOLIS first-map bar depend on the M1 pool measurement.
