# Judgment calls ("chose X over Y because Z"; each vetoable)

Every judgment call is vetoable. Its full text — the choice, the alternative rejected and the reason — is in
`docs/ARCHITECTURE-RATIONALE.md` (Part A); this index names the choice and the section that states the rule it chose.
J-1 – J-18 are the synthesis seat's; the area rows keep their prefixes — J-K (kernel), J-DET (determinism), J-P
(pipeline), J-R (rendering), J-S (scope) — because the sections cite them by those ids; the J-I rows settle a
disagreement between two area drafts.

| id | the choice | where |
|---|---|---|
| J-1 | the kernel proposal as the base, with the other proposals' mechanisms grafted | §0.1 |
| J-2 | districts typed and fields solved before the bent-cut infill | §4.5, §4.6 |
| J-3 | FTG-shaped growth for the secondary streets outside the walls | §4.4 |
| J-4 | plat-tree scoping as the primary locality mechanism; the dependency graph as audit | §7.3 |
| J-5 | a 128-bit key hash with 32-bit-lane mixing | §6.1 |
| J-6 | `FaceRef` unions with half-corridor strips and junction wedges; nesting exact by construction | §2.2 |
| J-7 | batched transactions (stage / district / block / edit), static indexes rebuilt per partition | §3.3 |
| J-8 | a snapshot-plus-replay document | §2.9 |
| J-9 | IMPROVEMENTS' J-S scope for the simulation | §10.1, D-10 |
| J-10 | Poisson k = 50, ranked tiles built with the product and shipped | §8.10, D-11 |
| J-11 | `dmath` as our own port of fdlibm | §3.1, D-23 |
| J-12 | one generation worker plus a derivation pool, the merge protocol written first | §4.1, §12.3 |
| J-13 | the greenery table, control rules, control budget, forms schema and intent example written here | §4.9, §7.7, §7.8 |
| J-14 | CONFIDENCE §6's experiments #5, #10 and #2 as milestone M-1 | §16 |
| J-15 | M1 re-cut to the viewable town; the honest effort range | §16, D-20 |
| J-16 | the anchor rule with `supersedes` on top of lineage-hash addresses | §6.3 |
| J-17 | the codename PLAT | D-19 |
| J-18 | running the lane on a relayed status question | rationale file |
| J-K1 | one arena per layer with the five levels as views | §2.2 |
| J-K2 | vertex, segment and stretch attraction at 26 cm | §3.6 |
| J-K3 | role and owner tables with resolved views | §2.2 |
| J-K4 | booleans, buffers and bands on the kernel's own arrangement, one engine on every host | §3.7 |
| J-K5 | an in-house straight skeleton under a numeric contract and validator; exact OBB roofs | §3.8 |
| J-K6 | static indexes rebuilt per partition (per district, plus one outside districts) at §3.3's three moments, queries sorted by a canonical key | §3.3 |
| J-K7 | `Int32` centimetre heights relative to a per-document datum | §2.3 |
| J-K8 | no WASM kernel; a byte-identical WebAssembly accelerator only for a missed hot loop | §3.7 |
| J-K9 | role-carrying vertices for entity-held vertices; role signatures for log positions | §2.2 |
| J-K10 | knot profiles for varying chain attributes | §2.2 |
| J-K11 | promote a finer vertex a coarser batch lands on | §2.2 |
| J-K12 | one hydrology grid | §2.3 |
| J-K13 | a magnitude-triggered flush at 2⁵² for `area2` | §3.2 |
| J-K14 | finer content of an earlier stage kept as an obstacle (`E_KEPT`) outside a clear region | §3.3 |
| J-K15 | two transaction forms: declared op sets in canonical order, callbacks in issue order | §3.3 |
| J-K16 | read-only transferred arena copies with one copy-on-write overlay per district | §3.3 |
| J-K17 | one endpoint rule and one constrained placement rule for every new or moved vertex on an edge | §3.6 |
| J-K18 | a warped vertex slides along the fixed coarser route it lies on | §3.6 |
| J-K19 | strict oracle comparison on unattracted cases, an attraction bound on attracted ones | §3.7 |
| J-K20 | S11's geometry share (≤ 3 µs per plot) as the kernel's M0 bar | §3.7 |
| J-K21 | a convexity gate on the exact OBB roof path | §3.8 |
| J-K22 | typed-array open-addressing tables for the role and owner heads | §2.2 |
| J-K23 | cut knots carrying the exact sampled value | §2.2 |
| J-K24 | a coarse insertion's permitted contacts named explicitly (`KernelTx.prepared`) | §3.3, §3.6 |
| J-K25 | S10's eager step (0) ends with an L3 partition rebuild, so every dynamic grid is empty at the freeze | §3.3 |
| J-K26 | the `split` flag cleared on a move except a re-seat onto, or slide along, its own edge | §2.2, §3.6 |
| J-K27 | a move batch keeps nothing and holds locked and pinned geometry | §3.3, §3.6, §7.2 |
| J-K28 | demotion: an edge takes the lowest level among its rows | §2.2 |
| J-K29 | `gate_end` roles on a fresh `Gate` for water-gate bank vertices; transient `anchor` contact names | §2.2, §3.3, §3.4 |
| J-K30 | a warp step's re-seats and slides placed one at a time in canonical order | §3.6 |
| J-K31 | a batch-local `StretchRef` for removing and retyping part of a chain | §2.2, §3.4 |
| J-K32 | a placement bound for the hot pixel and index boxes | §2.2, §3.3 |
| J-K33 | the first stage of §4.1's order as a move batch's `rederivesFrom` | §3.3, §4.1 |
| J-K34 | tombstones for every item a batch deletes, re-levels, changes or moves to another partition | §3.3 |
| J-K35 | a water gate's `gate_end` vertices held under a warp unless `fromLevel = 0` | §2.2, §3.6 |
| J-K36 | a pinned, registry-confirmed `robust-predicates` 3.0.3 with an in-house BigInt fallback | §3.1, §17.4 |
| J-DET-1 | opaque address ids hashed from the entity's lineage key | §6.3 |
| J-DET-2 | lineage kept only for entities surviving un-derived; successors get the address only | §6.3 |
| J-DET-3 | operation-count work limits for every output-affecting budget | §5.1 |
| J-DET-4 | a Merkle digest maintained at batch commit | §6.2 |
| J-DET-5 | version stamps, rule slices, derivation inputs and deps kept out of the model digest | §2.8, §6.2 |
| J-DET-6 | one ordered replay fold for constraints, epochs, rebases and upgrades | §7.2, §7.4 |
| J-DET-7 | a `rebase` event when a saved state is kept | §2.9 |
| J-DET-8 | scoped undo records and cost-driven checkpoints | §7.4 |
| J-DET-9 | output versions bump only with a declared shift; N−1 and N−2 retained | §6.4 |
| J-DET-10 | an edited attribute is implicitly pinned | §7.2 |
| J-DET-11 | lock > assignment in the precedence order | §7.7 |
| J-DET-12 | the prosperity, density and greenery fields recomputed on load | §2.9 |
| J-DET-13 | control monotonicity and continuity stated as rules | §7.8 |
| J-DET-14 | `drawBoundary` snaps to whole L1 cells | §7.1 |
| J-DET-15 | MFCG's Rotate as a view rotation with a model-north compass | §7.1 |
| J-DET-16 | undo and redo as logged events at the head, per-session stacks, an independence check | §7.4 |
| J-DET-17 | non-shipped pack content copied into the document; links needing it refused | §2.9, §6.4 |
| J-DET-18 | an upgrade's undo record is its `from` version; a rebase's is its previous base | §7.4, §7.5 |
| J-DET-19 | content-addressed snapshot chunks per static-index partition | §2.9 |
| J-DET-20 | New random advances an unchanged scope entity's reroll up to `reroll.maxAdvance` (default 3) times | §5.1 |
| J-DET-21 | S13a's scoped delta runs at each event's log position in replay | §7.3 |
| J-DET-22 | `labels` removed from the rerollable concerns; rerollability a registry property | §6.1 |
| J-DET-23 | S1's water operator re-sites crossings and chains S4–S7 in §4.11's order | §4.11, §7.3 |
| J-DET-24 | the terrain brush defaults to `water: 'locked'` with exact re-basing | §7.2, §7.3 |
| J-DET-25 | work limits as laws | §5.1 |
| J-DET-26 | grid-bucketed nearest-neighbour succession matching per kind | §6.3 |
| J-DET-27 | a failing control gets a smoothstep, then becomes a declared discrete control | §7.8 |
| J-DET-28 | byte identity for the WebAssembly accelerator; Clipper2-WASM only as a declared golden shift | §6.5 |
| J-DET-29 | S10's step (0) re-run one-sided for a scope's own side of every shared edge | §7.3 |
| J-DET-30 | a river's control knots as S1's recorded input, addressed by body and ordinal | §7.1, §7.4 |
| J-DET-31 | point-anchored records carried by mean-value coordinates through warps | §7.4 |
| J-DET-32 | harbour works admitted by topology | §5.3 |
| J-DET-33 | a lifecycle event block ordered by `seq`, undone and redone with its target | §2.8, §7.4 |
| J-DET-34 | a session per document and author | §7.4 |
| J-DET-35 | a selected user corpus as a non-shipped pack; the document's pack set saved | §2.9, §6.4, §7.5 |
| J-DET-36 | references by lattice point across chunks; Steiner splits in their partition's chunk | §2.9, §3.9, §6.2 |
| J-DET-37 | a generated name handed to its successor with its address and naming record | §6.3, §7.1, §7.6 |
| J-DET-38 | the displayed snapshot as the working state, editable after its own digest matches | §2.9 |
| J-DET-39 | the NF-P5 invariant scoped to generation batches and undeclared edit batches | §5.3 |
| J-DET-40 | the pre-decided fallback for a slow load recomputation: off the edit path | §2.9, §6.2 |
| J-DET-41 | a naming record persisted with every generated name | §2.8, §7.6 |
| J-DET-42 | a non-owner bridged client keeps the load bytes to install a kept town | §2.9, §7.4, §11.3 |
| J-DET-43 | edits during load verification run their per-district stages in the generation worker | §2.9, §12.8 |
| J-DET-44 | every root check runs under the model packages of the version that recorded it | §2.9, §7.1, §7.4 |
| J-DET-45 | under the off-edit-path check, edits flow but keep, save and export wait | §2.9, §5.3, §6.2 |
| J-DET-46 | a protected name's naming record stays dormant until the protection ends | §2.8, §6.3, §6.5 |
| J-DET-47 | one optional `renames` field on `EditBase`; `fates` on table and preset edits | §7.1, §7.3, §11.2 |
| J-DET-48 | each field of a culture or ancestry row is its own naming slice | §2.8, §6.3, §7.6 |
| J-DET-49 | a separate records digest for derivation and naming records | §2.9, §6.2 |
| J-DET-50 | a link only when the document's base is the recipe | §2.9, §6.4, §7.4 |
| J-DET-51 | the rebase reason `keptOldModel` removed | §2.9, §7.4, §7.5 |
| J-DET-52 | edits made during load verification re-applied on the replay's records | §2.9 |
| J-DET-53 | a transparent successor seed (seed + 1) for Enter | §6.1 |
| J-DET-54 | a pack the new version stops shipping copied into the document at the upgrade | §7.5 |
| J-P1 | feature-named district kinds | §2.5 |
| J-P2 | a quarter level for city-LOD labels | §4.5 |
| J-P3 | reservations and gate sites at S3, and the trace before each stage's growth | §4.2, §4.4 |
| J-P4 | the bent cut inside the walls, FTG growth outside | §4.4 |
| J-P5 | MFCG's walled share | §4.2 |
| J-P6 | plot counts per band with a measured plot share | §4.2 |
| J-P7 | a network-travel-cost level set with an anisotropy row | §4.4 |
| J-P8 | a mean-reverting curvature walk with goal reversion | §4.4 |
| J-P9 | an eager town-wide allocation, a laziness contract and a complete first paint | §4.1 |
| J-P10 | the district pool and its merge protocol specified now | §4.1, §12.3, D-18 |
| J-P11 | no bent-cut continuation across district boundaries | §4.6 |
| J-P12 | the vector coast with contours clipped to land | §4.2 |
| J-P13 | per-frontage regions from the block's straight skeleton | §4.7 |
| J-P14 | row footprints by clipping | §4.7 |
| J-P15 | the deep-block interior decided in S8 by band shares | §4.6 |
| J-P16 | NG's perpendicular-ray far side with a fallback chain | §4.6 |
| J-P17 | wings stored in the base | §2.6 |
| J-P18 | an `outline()` / `compose()` split with a cost contract | §2.6 |
| J-P19 | `baseCm` = the highest sample plus a plinth, with skirts and stepped wings | §2.6 |
| J-P20 | a sequential grid roster keyed by building ordinal | §10.2 |
| J-P21 | a base-schema relation store materialised by the module | §10.1 |
| J-P22 | pinning by explicit edit only | §10.3 |
| J-P23 | close-up refinement as derived data; template replacement as a model edit | II.4 |
| J-P24 | the gate law fitted on MFCG's size sweep | §4.2 |
| J-P25 | an open waterfront as the default | §2.7, §4.4 |
| J-P26 | gate routes, boundary, gates, castle weld, trace and moat from one travel-cost construction | §4.2 |
| J-P27 | the hinterland unit on the generation worker as one more overlay | §4.1, §4.9 |
| J-P28 | the quarter city cut at `min(N_q, L)` | §4.5 |
| J-P29 | wall strips cut as L1 faces at S7, the band built inside them after S9 | §4.8 |
| J-P30 | a carve way rule by class: pinned decks for arterials and sole links, cuts for the rest | §4.11 |
| J-P31 | a `quad` wing kind storing the clipped row footprint | §2.6 |
| J-P32 | a portal gap that slides a planned lane end away from a portal | §4.6 |
| J-P33 | one `Seam` record per boundary run, read by both districts | II.1 |
| J-P34 | one carve footprint: every L1 cell the channel meets or the way rule touches | §4.11 |
| J-P35 | the harbour route solved after the trace and moat, through the serving gate | §4.2 |
| J-P36 | an `on_enceinte` castle's moat carved only along its outer arc | §4.2, §4.8 |
| J-P37 | a `reserve` seam type for a way-less shared reservation boundary | II.1 |
| J-P38 | the neighbour step: one `corridor_split` in the neighbour's strip | II.1, §4.6 |
| J-P39 | a `quad` wing's four corner indices stored | §2.6, §4.7 |
| J-P40 | a carve's kept-way deck is the way's own L1 edge between its bank vertices | §4.11, §7.3 |
| J-P41 | wall-strip faces excluded from S7b's claim candidates | §4.5 |
| J-P42 | a building's stored wing rings carried with its footprint face | §2.6, §4.7 |
| J-P43 | each land face of a carve's footprint takes the typing of its pre-edit L1 cell | §4.5, §4.11 |
| J-P44 | every crossing site a `Bridge` in state `site` until a way builds it | §2.7, §4.2 |
| J-P45 | one gate pick forced where the harbour's least-cost path leaves the pick contour | §4.2 |
| J-P46 | the arena's outer ring an L0 `margin` chain; the map border an L1 `border` chain | §2.2, §3.3, §4.1 |
| J-P47 | §2.6's wing carry after every batch that changes a footprint face | §2.6, §4.1 |
| J-P48 | a stored stage-3 composition carried in the same call as the base wings | §2.6 |
| J-P49 | the wing check decided by the building's pairing | §2.6, §12.6 |
| J-P50 | a slot's shape kept as S11 working data, never stored | §2.5 |
| J-R1 | a columnar, transferable mark table | §8.1 |
| J-R2 | world-aligned tile rasters | §8.1 |
| J-R3 | low-chroma value steps | §8.2 |
| J-R4 | Canvas2D as `lit`'s reference backend | §8.2 |
| J-R5 | the ground tone | §8.5 |
| J-R6 | no avenue trees at the city band | §8.5 |
| J-R7 | no S9 preview | §8.5, §12.5 |
| J-R8 | settling on exact 2^¼ zoom stops | §8.8 |
| J-R9 | Canvas2D glyphs composed onto the tiles | §8.9 |
| J-R10 | a handle-and-tiles worker boundary | §8.9 |
| J-R11 | stamped, ranked scatter tiles | §8.10 |
| J-R12 | label placement as view data, measured with our own font metrics | §9.1 |
| J-R13 | a minimal own emblem generator plus import | §9.5 |
| J-R14 | CityJSON built | §11.1 |
| J-R15 | host-as-store | §11.3, §11.5 |
| J-R16 | a transport-agnostic bridge plus the static VTT exports | §11.5 |
| J-R17 | the per-building cost against MFCG as a declared trade | §12.9, D-7 |
| J-R18 | the derivation pool as the primary configuration | §12.3, §12.9 |
| J-R19 | the low 64 bits of the entity key as the one key of every render-time hash | §8.1 |
| J-R20 | a slot-major draw order with passes inside each slot | §8.1 |
| J-R21 | base and labels composed into one bitmap per tile in the tile worker | §8.8 |
| J-R22 | a canvas budget derived from the viewport with tier ceilings | §8.8 |
| J-R23 | model-reading render steps run where the model is; the tile worker gets tables only | §8.9 |
| J-R24 | an instance override applied by ordinal only while lineage and position hold | §8.10 |
| J-R25 | bit-reversal (van der Corput) ranks for jittered grids and lines | §8.10 |
| J-R26 | pins fixed at their own and finer stops, yielding at coarser ones | §9.2 |
| J-R27 | the quarter-tree rung decided from geometry before the greedy | §9.2, §9.4 |
| J-R28 | `ground` as the one fallback halo role; darker inks for `lit` and `hatched` | §8.2, §9.4 |
| J-R29 | `ink`'s walls drawn in ink and its courts as ground at the city band | §8.2, §8.5 |
| J-R30 | a bounded random-style repair, then the shipped palette | §8.2 |
| J-R31 | a strict WGS84 GeoJSON by inverse transverse Mercator, plus a metric file | §11.1 |
| J-R32 | glyph outlines as SVG's default text | §11.1 |
| J-R33 | fate confirmation by token and fate equality | §11.2 |
| J-R34 | a per-viewer `stylePreset` view key | §11.3 |
| J-R35 | first-map budgets as laws of the building count, the miss above the knee declared | §12.5 |
| J-R36 | load verification stated as a law of the log | §12.6 |
| J-R37 | a CI font test picks each face's small-caps and figure path | §9.2 |
| J-R38 | O3 (d)'s model-time bars read over every size of a rung | §12.3 |
| J-R39 | explicit passes on `OrderSlot` with most-specific-wins resolution | §8.2 |
| J-R40 | furniture and snap queries answered by the tile worker between resumable raster steps | §8.9 |
| J-R41 | a transient display list for SVG exports, released after writing | §11.1, §12.8 |
| J-R42 | a constant stream key for the stamp-tile library | §8.10 |
| J-R43 | a declared PLAT CityJSON Extension for `+platGeoAnchor` | §11.1 |
| J-R44 | the derivation pool primary at each size where it measures faster | §12.3 |
| J-R45 | a pin pass at placement time | §9.1, §9.2 |
| J-R46 | four fixed classes in the tile worker's queue | §8.9 |
| J-R47 | a transient display list for PNG, print and `.dd2vtt` exports | §11.1, §12.8 |
| J-R48 | one set of four stamp tiles per class at 4 m, scaled per entity | §8.10 |
| J-R49 | a timing phase: every gating timing taken last and alone on the runner | §12.1 |
| J-R50 | four seam-compatible stamp tiles per class sharing one border band | §8.10 |
| J-R51 | S13b as a resumable placement job | §8.9, §9.2, §11.1 |
| J-R52 | integer-centimetre instance positions computed with `dmath` | §6.5, §8.10, §11.1 |
| J-R53 | for a PNG time miss, the None row filter, then fixed compression settings | §8.8, §12.7, D-18 |
| J-R54 | a light step: the path sun quantised for lit programs | §8.4, §8.8, §8.10 |
| J-R55 | stamp tiles built at build time and shipped | §8.10 |
| J-R56 | a max clause relative to each generation's own law, confirmed by solo re-timing | §12.3 |
| J-S1 | every acceptance letter tagged C / P / O; a P or O letter for each first-weighted improvement | §15.2 |
| J-S2 | a written, blind side-by-side protocol with the owner as rater | §13.6 |
| J-S3 | every threshold numbered now, with a confirming milestone and a fallback | §13.7 |
| J-S4 | byte identity for Regenerate (keep settings); a calibrated rank campaign for New random | §13.2, §15.2 |
| J-S5 | requested-feature delivery by tier and time on MFCG's worst configurations | §13.5, D-9 |
| J-S6 | the honest effort range, with the possible cuts recorded for the owner's veto | §16, D-20 |
| J-S7 | the editing core before the second preset; M3 split; the module its own milestone | §16, D-7, D-35 |
| J-S8 | implementer inputs: this document, a checked digest, a separate repository, numbers-only baselines | §17.1, D-29 |
| J-S9 | a hashed deny-list of tokens, ordered 3-grams, colour values and file bytes | §17.1 |
| J-S10 | a proprietary default licence | §17.3, D-22 |
| J-S11 | FTG's free BIG_TOWN and BIG_CITY sizes and no purchase | D-31 |
| J-S12 | 1 500 inhabitants as the base's floor and the village ceiling | §1.1, D-33 |
| J-S13 | modest per-rung granularity and greenery modifiers in one `RungProfile` table | §1.1 |
| J-S14 | economy, personality, stats and the family tree in the module, flagged for veto | D-32 |
| J-S15 | IM FELL Great Primer as the default label face | §17.2 |
| J-S16 | three CI tiers with fixed wall-clock budgets | §13.8, D-34 |
| J-S17 | curves resampled at 10 m; junction-to-junction runs compared | §13.5 |
| J-S18 | MFCG's input idiom, stated in an editable keymap | §14 |
| J-S19 | WCAG 2.2 AA for the app's chrome; the gazetteer lists as the non-visual route | §14 |
| J-S20 | an unrated panel continues the build as *provisional — not rated* | §13.6, §16, D-5 |
| J-S21 | candidate 1 ships as `house` when the owner has made no pick by M4's exit | §13.6, D-1 |
| J-S22 | machine-readable shift, cascade, milestone, parity and D-5 records inside `plat/goldens/` | §13.3, §13.5 |
| J-S23 | a moved placement digest is an S13b view shift bumping style versions only | §6.4, §9.1, §13.3 |
| J-S24 | `labels ← render` with renderer inputs passed as parameters | §14 |
| J-S25 | FTG's turning per 100 m as a target for organic presets | §13.5 |
| J-S26 | a letter whose fallback moves its threshold is *not achieved* | §13.7 |
| J-S27 | town-level draws keyed from the town root's entity key | §9.5, §14 |
| J-S28 | METROPOLIS generated from M1, measured and tuned at M2b | §1.1, §13.2, §16 |
| J-S29 | `H32(s)` = the first output word of MurmurHash3 x86 128-bit | §6.1, §13.6 |
| J-S30 | 800 regenerated scopes per nightly faithfulness campaign | §13.2 |
| J-S31 | §6.5's allowlist lint extended to the renderer code that feeds S13b | §6.5, §13.3, §14 |
| J-S32 | scripted document checks, binding every seat that writes this document | §17.1 |
| J-S33 | one FTG pair per FTG capture at the matched size | §13.6 |
| J-S34 | five seeded pairs per NG template for M5's panel (`area` = the base's `bent-cut`) | §13.6, II.2 |
| J-S35 | a list check for copied lists in any order | §17.1 |
| J-S36 | the list check carried into M-1's hashed deny-list | §17.1 |
| J-S37 | memory under load verification at M2a; naming re-draws tested at M3a | §2.9, §16 |
| J-S38 | an optional `at` on `EditEngine.rebase`, anything but the head or h₀ refused | §7.1, §7.4, §14 |
| J-S39 | the table check's cell count; pipes in code escaped | §17.1 |
| J-S40 | the `.plat` writer and reader for generated towns built at M1 | §2.9, §16 |
| J-S41 | an FTG pair's PLAT side generated at the capture's recorded population | §13.6, §17.1 |
| J-S42 | `SquareFabric`'s `void` mode for NG's `square` pairs | §13.6, II.2 |
| J-S43 | the fix-all line widened by 3–4 pw for six new components | §16, D-20 |
| J-I1 | one quarter merge tree, built by S6 with one cost, cut at MFCG's count law | §4.5, §9.1, §9.4 |
| J-I2 | no preview at any rung | §4.1, §8.5, §12.5 |
| J-I3 | label placement as view data at every band | §4.1, §9.1 |
| J-I4 | entity schemas reach geometry only through the kernel's views; no stored seed or key | §2.2, §2.4, §6.1 |
| J-I5 | one travel-cost field for all growth stages | §4.2, §4.4, §12.4 |
| J-I6 | furlong-sized field faces; open-field strips as render-time segmentation | §4.9 |
| J-I7 | the shadow budget kept, with a pre-decided `drop`-mode fallback | §8.4 |
| J-I8 | the kernel's range bound re-derived at the population cap | §3.2, §12.2, D-12 |
| J-I9 | one eager shared-edge band step (S10 (0)) before the pool's freeze | §3.3, §4.1, §4.5 |
| J-I10 | the pipeline's local coarse insertion adopted as the kernel's clear regions | §3.3, §4.4, §4.11 |
| J-I11 | only split-flagged degree-2 vertices dissolve after an edge removal | §2.2, §3.4 |
| J-I12 | every bridge's deck is its way's own L1 edge between two `deck_end` vertices | §2.2, §4.1, §4.11 |
| J-I13 | one preparation list for every coarse insertion | §3.3, §4.11, §7.3 |
| J-I14 | load verification's replay model counted in place of the pool's frozen copies | §2.9, §12.8, §16 |
| J-I15 | the kernel's naming for water gates and transient contact names | §2.2, §7.3 |
| J-I16 | the pipeline's levels for the frame lines; clear regions aligned to them | §2.2, §3.2, §3.3 |
| J-I17 | crossing-site state carried into S1's water operator | §2.7, §7.3 |
| J-I18 | a deck's `deck_end` writers split by the water they are placed on (S5b's extra-bridge batch included) | §2.2, §5.2, §7.3 |
| J-I19 | an M1-format document of the running version regenerated from its recipe when the records digest arrives | §2.9, §13.3, §16 |
