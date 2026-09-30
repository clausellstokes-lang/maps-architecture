# Judgment calls ("chose X over Y because Z"; each vetoable)

Every judgment call is vetoable. Its full text — the choice, the alternative rejected and the reason — is in
`docs/ARCHITECTURE-RATIONALE.md` (Part A); this index names the choice and the section that states the rule it chose.
J-1 – J-18 are the synthesis seat's; the area rows keep their prefixes — J-K (kernel), J-DET (determinism), J-P
(pipeline), J-R (rendering), J-S (scope) — because the sections cite them by those ids; the J-I rows settle a
disagreement between two area drafts; the `J-F⟨lane⟩-⟨n⟩` rows are the Fable review seats' rulings
(`docs/fable-review/`). In `J-A⟨item⟩.⟨n⟩`, ⟨item⟩ is the owner item or file-f item ruled on and the first digit of ⟨n⟩
names the part whose seat ruled — 0 the scope part (§0, §1, §13–§17 and the lists), 2 the model (§2), 3 the kernel (§3),
4 the pipeline (§4, §10, PART II and PART III), 5, 6 or 7 determinism (§5–§7) and 8 rendering (§8, §9, §11 and §12).
J-C1 – J-C4 are the coherence pass's decisions under the owner's delegation (J122). A superseded or amended row carries
one mark, *superseded by* or *amended by*, and the governing row keeps the reason. The volumes' decisions are their §9's
`J-Vn.m` rows; the integrator's `J-VI.n` rows stay in `docs/volumes/_integrate.md`.

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
| J-17 | the codename PLAT (the public name follows SettlementForge's, J121) | D-19 |
| J-18 | running the lane on a relayed status question | rationale file |
| J-K1 | one arena per layer with the five levels as views | §2.2 |
| J-K2 | vertex, segment and stretch attraction at 26 cm | §3.6 |
| J-K3 | role and owner tables with resolved views | §2.2 |
| J-K4 | booleans, buffers and bands on the kernel's own arrangement, one engine on every host | §3.7 |
| J-K5 | an in-house straight skeleton under a numeric contract and validator; exact OBB roofs | §3.8 |
| J-K6 | static indexes rebuilt per partition at §3.3's three moments, queries sorted by a canonical key | §3.3 |
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
| J-K25 | S10's eager step (0) ends with an L3 partition rebuild … | §3.3 |
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
| J-DET-2 | lineage kept only for entities surviving un-derived; successors get the address only — *amended by J-A31.73, J-A28.63, J-A8.61* | §6.3 |
| J-DET-3 | operation-count work limits for every output-affecting budget | §5.1 |
| J-DET-4 | a Merkle digest maintained at batch commit | §6.2 |
| J-DET-5 | version stamps, rule slices, derivation inputs and deps kept out of the model digest | §2.8, §6.2 |
| J-DET-6 | one ordered replay fold for constraints, epochs, rebases and upgrades — *amended by J-A22.72, J-A22.74* | §7.2, §7.4 |
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
| J-DET-36 | references by lattice point across chunks; Steiner splits in their partition's chunk, keyed by their route edge's endpoints | §2.9, §3.9, §6.2 |
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
| J-DET-53 | a transparent successor seed (seed + 1) for Enter — *amended by J-A22.74* | §6.1 |
| J-DET-54 | a pack the new version stops shipping copied into the document at the upgrade | §7.5 |
| J-P1 | feature-named district kinds | §2.5 |
| J-P2 | a quarter level for city-LOD labels | §4.5 |
| J-P3 | reservations and gate sites at S3, and the trace before each stage's growth | §4.2, §4.4 |
| J-P4 | the bent cut inside the walls, FTG growth outside | §4.4 |
| J-P5 | MFCG's walled share | §4.2 |
| J-P6 | plot counts per band with a measured plot share | §4.2 |
| J-P7 | a network-travel-cost level set with an anisotropy row | §4.4 |
| J-P8 | a mean-reverting curvature walk with goal reversion | §4.4 |
| J-P9 | an eager town-wide allocation, a laziness contract and a complete first map | §4.1 |
| J-P10 | the district pool and its merge protocol specified now | §4.1, §12.3, D-18 |
| J-P11 | no bent-cut continuation across district boundaries | §4.6 |
| J-P12 | the vector coast with contours clipped to land | §4.2 |
| J-P13 | per-frontage regions from the block's straight skeleton | §4.7 |
| J-P14 | row footprints by clipping | §4.7 |
| J-P15 | the deep-block interior decided in S8 by band shares | §4.6 |
| J-P16 | NG's perpendicular-ray far side with a fallback chain — *superseded by J-A37.41* | §4.6 |
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
| J-S8 | implementer inputs: the architecture set (the base, INDEX.md, the volumes their milestone builds), a checked digest, a separate repository, numbers-only baselines | §17.1, D-29 |
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
| J-S43 | the unpriced-mechanisms line of §16's effort table widened by 3–4 pw for six new components | §16, D-20 |
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
| J-A8.61 | declined and superseded fabric survives with address and lineage | §6.3, §6.1 |
| J-A16.71 | `PlacementCriteria` are per-assignment `RelationRule` overrides; the solver is declared at §4.7 S10b only | §7.7 |
| J-A17.71 | assignments move with their use unless pinned; "Epochs keep placed members" retired; `swapUse` is two relocations | §7.7, §7.1 |
| J-A18.71 | a designation change is S11's mutation run as a local operator, never tree scoping | §7.3, §7.4 |
| J-A20.71 | dossier existence below the lock and above assignments, drawn geometry, rules and defaults | §7.7, §5.2 |
| J-A20.72 | generator-added elements may be deleted with local repair; what the dossier needs is re-provided by the solver | §7.7 |
| J-A20.73 | positive placements and map edits honoured as pins before a dossier event's mutation | §7.7 |
| J-A20.74 | a map delete of a dossier-backed element is `rejectSite` | §7.7, §7.1, §7.4 |
| J-A22.71 | continuity over path-independence: the map is a function of the seed and the ordered history | §6.2, §7.7 |
| J-A22.72 | dossier-at-creation counted in S2's demand and applied claims-first at positions 0…k; every later dossier event a mutation | §7.7 |
| J-A22.73 | the disruption budget bounds the search and the effective scope, never the dossier's authority | §7.7, §7.3, §5.2 |
| J-A23.71 | the emulation marker in §7.6's cell schema (`provenance.source` + `extension`), the parity presets zero every extension … | §7.6 |
| J-A25.61 | terrain and water conversions draw on `epoch.transform` by the body's lineage and repair through S1's operators or the carve; no new concern | §6.1, §7.3, §7.1, §7.4 |
| J-A28.51 | F-PLAN places the household units first and lets a unit fall to the next poorer unit form … | §5.2, §5.3 |
| J-A28.61 | the stage-3 rungs keep one absolute reroll counter per `regenerate.rung` value … | §6.1, §7.1, §7.4, §5.1 |
| J-A28.62 | the elaboration record and cache outside both digests; a click writes no digest | §6.2 |
| J-A28.63 | an interior re-cut adds no concern | §6.1, §6.3 |
| J-A28.71 | a click on a stale rung re-derives from a canonical prior, never from the cache; a click logs nothing, the first edit stores the composition — *amended by item 28 (f)* | §7.3, §7.1, §6.2 |
| J-A28.72 | a stored plan is re-cut inside the event that changes its inputs, as a recorded mutation | §7.3, §7.4, §7.1 |
| J-A29.61 | one new concern `siteplan.entrance` for the door and basement draws | §6.1 |
| J-A30.71 | a sealed passage is `Passage.sealed`, §2.5's one stored fact — *amended by J-A20.77* | §7.4, §5.3, §7.7 |
| J-A31.71 | `setAttr(builtBand)` refused; the attribute is written only by the paths §4.11 lists (J-A31.44) … | §7.1, §7.4 |
| J-A31.72 | brushes, `Adjust`, the terrain-driven field re-evaluation and a `FieldBands` re-banding stay authorial and set `builtBand` in their scope | §7.2, §7.4 |
| J-A31.73 | fusion and splitting continue lineage; the address by the anchor; a resurrected member's `builtBand` from the event | §6.3 |
| J-A31.74 | plot `join` / `split` are the least-disruption re-cut with S11's mutator | §7.1, §7.4, §7.3 |
| J-A12.31 | `kerb`, `corridorUnion` and `bandUnion` on every arena, the half-width read from the chain's linear entity | §3.7 |
| J-A12.32 | a transaction writes one arena; the services read any arena by its key … | §3.4, §3.10 |
| J-A21.31 | the straight skeleton stays in-house; CGAL rejected on its licence and on the stack and one-engine grounds | §3.1 |
| J-A28.31 | rooms and composed rings cut on a transient arena on the world lattice | §3.4 (with §3.3, §3.10) |
| J-A28.32 | the plan rung reads the skeleton as a `spine` reader only (room labels and lights); no fourth reader | §3.8 |
| J-A28.33 | a re-cut under the interior ladder is a fresh transient arena from the same seed rings (the shell) … | §3.4, §3.10 |
| J-A30.31 | a passage is an L3 `passage` face with the wing above it a composition ring; no nesting exception, no new kernel operation | §3.10 |
| J-A28.21 | the plan rung's records declared in §2.6 | §2.6 |
| J-A28.22 | the elaboration record as a sixth, per-rung, non-canonical part outside both digests, its cache content-addressed chunks beside `model` … | §2.8, §2.9 |
| J-A28.23 | the owner's "more rooms for more families" read as the shell's capacity, one integer capacity function in §2.6 every reader shares | §2.6 |
| J-A28.24 | the interior ladder reads the plot's field band, never `Household.wealth` | §2.6, §2.7 |
| J-A28.25 | the dwelling unit as a household reference on the plan's room (`Room.unit`) with `Plan.units`, five unit forms … | §2.6 |
| J-A28.26 | the re-cut's canonical chain — rows first, then households, from the as-built plan | §2.6 |
| J-A28.27 | staff rooms sized as a share of the owners' principal chamber and placed in the attic … | §2.6 |
| J-A29.21 | entrances as an indexed set with five rules | §2.6, §2.2 rule 7, §2.5 |
| J-A29.22 | the basement as its own record with `Heights.floorsBelow`, gated by a water table defined from §2.3's existing facts | §2.6, §2.3 |
| J-A30.21 | a passage as a `Passage` record over an L3 face whose `sealed` bit is the one stored fact behind a sealed access | §2.5, §2.6, §2.4 |
| J-A30.22 | `knownTo` on plot, building and institution defaulting from exposure, and the viewer's knowledge as a view-state key outside every digest — *amended by J-A30.24* | §2.5, §2.6, §2.7, §2.9 |
| J-A31.21 | `builtBand` and `builtProsperity` as persisted attribute columns in the leaf digest with `geometryFloor` derived at read and never … | §2.5, §2.6, §2.8 |
| J-A17.21 | `Use` as its own record, `Building.use` a reference to it (absent = vacant) and `formerUses` the traces | §2.7, §2.6 |
| J-A19.21 | materials as a rendering attribute only, the default rows FTG's per-stage model with district and class overrides … | §2.6 |
| J-A8.21 | the ladders expressed on one `Existence` with `cleared` and `reused` added; `MaterialLedger` a town record; `predecessor`, `supersededBy` and `closure` as links — *amended by J-A8.22* | §2.8, §2.6, §2.7 |
| J-A11.21 | a tunnel's condition a derived reading of `existence` and `closure` through II.6's condition table (its `open` column) … | §2.7 |
| J-A12.21 | the underground arena's level mapping stated in §2.2 rule 1 | §2.2, §2.5, §2.7 |
| J-A20.21 | `Identity.dossier` as persisted identity, the lifecycle kinds `reject`, `lapse` and `place` … | §2.8, §2.9 |
| J-A25.21 | `ditch` as a water-body kind and `LandUse.reclaimed` as a trace … | §2.3, §2.7 |
| J-A24.21 | `Reservation.rank` on market kinds and `dist.market` the nearest market of either rank | §2.5 |
| J-A27.21 | `FieldBands.bands` and `FieldBands.middle` on the record, the band-set row type staying §4.5's | §2.5 |
| J-A16.41 | one placement solver (§4.7 S10b) for generation, the hinterland unit, every assignment, dossier event, positive placement and relocation | §4.7, §7.7 |
| J-A16.42 | supply distances at block granularity from the eager allocation inside the pooled S10b … | §4.7, §4.1 |
| J-A16.43 | a hard relation row is never relaxed silently | §4.7, §5.2 |
| J-A16.44 | D-32 split: supply edges (resources, producers, distances, modes) are base placement data | §10.1, §10.2, D-32 |
| J-A16.45 | S2's need propagation as a prefix-stable `perOther` floor through the producing classes, to a table depth | §4.2 |
| J-A17.41 | the use as its own record | §4.11, §2.7, §7.7 |
| J-A17.42 | the hand relocation path built now (`relocateUse` generalising `swapUse`, `openUse`, `closeUse`); the epoch re-score staged with the engine | §4.11, §7.1 |
| J-A18.41 | one mutation operator (§4.7 S11) for every designation change | §4.7, §7.7, §4.11 |
| J-A18.42 | reversal by the recorded inverse when the plot's design is still the record's result (leaf digest) … | §4.7, §7.4 |
| J-A18.43 | the mutator's draws from the plot's own `siteplan.mutate` stream (lineage-keyed, non-rerollable) | §4.7, §6.1, §6.3 |
| J-A19.41 | one designation template per roster class with band rows interpolated along the prosperity value … | §4.7, §10.2 |
| J-A19.42 | no material column in the template or the mutator's delta | §4.7, §2.6 |
| J-A19.43 | geometry columns read the manifested band; the specialisation and the room programme read the field band | §4.7, §4.11 |
| J-A23.41 | the pipeline part reads item 23 by one pointer in §4.1 to §7.6's emulation rule … | §4.1, §7.6 |
| J-A24.41 | the centre stays the root of the plaza, the gate routes and `T` | §4.2 S3 (12), §4.3, §4.4 S5a |
| J-A24.42 | secondary markets as S7b claims under MFCG's rules as defaults, one `market` district per market | §4.5 S7b (3), §4.2 S2, §10.2 |
| J-A25.41 | reclamation, silting and course shifts as conversion kinds on the one list … | §4.11, §7.3 |
| J-A25.42 | no new concern for terrain and water conversions: draws from `epoch.transform` keyed by the body's or face's lineage | §4.11, §6.1 |
| J-A26.41 | "drawn after" is a dependency order the pipeline already realises | §4.9, §4.1 |
| J-A26.42 | fuel and timber as farm-table demand rows whose provision is capped by the frame's wood land … | §4.9, §4.2 S2, §10.2 |
| J-A26.43 | FTG's farmland layouts as a rung × landscape `FarmModeRow` playing FTG's `Default` (`fill`, `perimeter`, `rivers`) … | §4.9, §4.4 |
| J-A27.41 | one named band set of six bands equivalent to FTG's tiers, MFCG's ward-class shares as land-share anchors … | §4.5, §4.7, §10.2 |
| J-A27.42 | the middle band designated per settlement as the band of its median household under the wealth shares | §4.5, §4.11 |
| J-A27.43 | FTG's shanty trigger as the default; "only outside the enceinte" retired to a soft `extension` row | §4.5, §10.2 |
| J-A30.41 | hidden plots made deliberately by S8's reach draw and S10's cut against per-band hidden-share targets | §4.6, §4.7, PART III |
| J-A30.42 | exposure by reach depth on the block's interior access graph, by adjacency, never a sight line | §4.6, §2.5 |
| J-A30.43 | a passage as a covered L3 access face cut along a front plot's side line and spanned by the front building's upper storeys | §4.6, §4.7 S10 (9), §2.6, §2.5 |
| J-A30.44 | sealing and reopening as conversion kinds usable by hand now | §4.11, §2.8 |
| J-A8.41 | decline exposure as a weighted strike pool (V06 §3.5.2) over an exposure field with a chance share, in place of the fixed decline order | §4.11 |
| J-A8.42 | a cleared or reused building is a live trace record at its address … | §4.11, §2.8, §6.3 |
| J-A8.43 | locked and pinned entities are never struck; assigned ones only through the use-relocation rule | §4.11 |
| J-A8.44 | regrowth-first siting binds the built grow path now | §4.11, §4.5 |
| J-A8.45 | salvage as a demand-weighted clearance recorded in a flow ledger, never a hard material budget | §4.11, §2.7 |
| J-A8.46 | the ladders reuse `abandoned`, `decayed` and `ruined` and add only `cleared` and `reused` | §4.11, §2.8, §2.7 |
| J-A8.47 | lag as per-entity dwell bands on the way down and none on the way up | §4.11 |
| J-A10.41 | every island, an institution's included, is gated by the town's prosperity supply | II.6 |
| J-A10.42 | the proposed island decline adopted as conversion kinds | II.6, §4.11 |
| J-A10.43 | the supply law's two inputs and product form | II.6 |
| J-A11.41 | the engine never demolishes a tunnel; a user's delete stays | II.6, §4.11 |
| J-A11.42 | the underground after streets and walls and before terrain and water in the persistence order | §4.11, II.6 |
| J-A13.41 | the rung gate as a `RungProfile.layers` row read at generation and at every epoch | II.6, §1.1 |
| J-A15.41 | a model-level fantasy-layers setting, off by default under D-3, separated from the sky layer's view toggle | II.6, §8.4, §7.8 |
| J-A15.42 | the island count as three ordered slots opened by chance × the town's supply … | II.6 |
| J-A31.41 | the three-rung wealth ladder replaces the Survivors rule: use and occupancy, then tenure and yards, geometry only on vacancy, ruin or redevelopment | §4.11 |
| J-A31.42 | replaceability as a column of the designation template row (class × band), read at the plot's `builtBand` | §4.11, §10.2 |
| J-A31.43 | the geometry floor at plot granularity | §4.11, §2.5 |
| J-A31.44 | `builtBand` written by generation, rung-3 events, rung 2's back court for its new rear plots only … | §4.11, §7.2 |
| J-A31.45 | the geometry floor reads the settlement's own middle band | §4.5, §4.11 |
| J-A31.46 | one churn-cap table with rows per kind (geometry, fabric, use) … | §4.11 |
| J-A31.47 | rung 3's triggers stated generically; redevelopment = purchase, relocation, vacancy, then the re-cut | §4.11 |
| J-A31.48 | the pipeline's reading of J-A31.73: fusion and splitting continue lineage by §6.3's JOIN and SPLIT rule | §4.11, §6.3 |
| J-A31.49 | `densify` re-specified at plot level (infill, back court), `thin` and `relet` added … | §4.11, §7.1 |
| J-A20.41 | the epoch's step (h) applies §7.7's lapse rule to every live placement rejection inside the epoch's touched set | §4.11, §7.7 |
| J-A22.41 | dossier-backed elements at creation enter S2's manifest as fixed rows, are allocated first by S7b … | §4.2 S2, §4.5 S7b, §7.7 |
| J-A22.42 | a dossier event arriving with an epoch's inputs applied inside the epoch after the use step and the ladder, before siting | §4.11, §7.7 |
| J-A28.41 | the elaboration trigger (`elaborate`: click or view) is per-viewer view state, not a document setting | §4.1, §2.9 |
| J-A28.42 | click semantics: a neighbourhood click derives the close-up and the wings rung … | §4.1, II.4 |
| J-A28.43 | the room-programme table declared in §10.2 as a roster table read by §2.6's plan rung, which writes the programme first | §10.2, §2.6 |
| J-A28.44 | the interior ladder referenced from the pipeline by one pointer per place | §4.11, §10.2, §4.7 |
| J-A28.45 | a population fall relets a building down before it vacates it — `vacate` only at the last household, the strike pool drawing per building — and a rise relets a standing shell up to its occupants' row first | §4.11 |
| J-A29.41 | the entrance probabilities, caps and cellar rows as columns of the designation template row; the references' one street entrance the default | §10.2, §4.7 |
| J-A14.41 | the sewer existence draw is S0's, from the request's population and the intent's wealth level | §4.2, II.7 |
| J-A14.42 | one Sewers control: a model feature at TOWN, visibility at CITY and METROPOLIS; the layer hidden by default | II.7, §7.8, §8.4 |
| J-A14.43 | the `historical` network is realism; `navigable` is D-3's fantasy toggle; navigability derived per tunnel from bore and headroom | II.7, D-3 |
| J-A14.44 | only the drain connection rule and the underground neighbourhoods depend on the network; siting and yards unchanged | II.7, §10.2 |
| J-A12.41 | the underground is cut by the ground's own S9–S11 on `corridorUnion`'s kerb; no dedicated cutter | II.7, §4.7 |
| J-A12.42 | no underground frontage room under any surface footprint | II.7, §2.6 |
| J-A12.43 | the surface constraint is a sampled `pointLocate` ladder (F-UNDER), never copied ground geometry | II.7, §5.2 |
| J-A12.44 | occupants by an eager S7b pseudo-district allocation from a predicted navigable capacity, on the shifted ground field | II.7, §4.5 |
| J-A12.45 | one underground arena; depth per entity as `elevationCm`, drawn and exported by depth band — *amended by J-A65.31* | II.7, §8.4, §11.1 |
| J-A12.46 | the underground stage runs eagerly after the pool's merge, scoped per tunnel run by declared spatial reads | II.7, §7.3, §4.1 |
| J-A30.81 | the knowledge filter on the label rows before the greedy … | §9.2, §8.1 |
| J-A30.82 | the knowledge key as per-viewer view state travelling like `stylePreset` | §11.3 |
| J-A30.83 | the reader and every picture and interchange export withhold a place's name and purpose by the same table … | §9.5, §11.1, §11.2 |
| J-A30.84 | a passage drawn as an arch glyph per end at district and neighbourhood LOD, covered by the spanning wing at city LOD | §8.2 (the row), §8.3, §8.5 |
| J-A8.81 | one style-sheet `states` table keyed by kind × §2.8 state that every family defines | §8.2 |
| J-A12.81 | the underground and sky toggles are `LayerSpec.visible` | §8.4, §11.1 |
| J-A28.81 | the change marker as a shipped overlay live layer (`live.stale`) read from the elaboration records outside the digests … | §8.2, §8.5 |
| J-A28.82 | the building band draws one storey at a time by a per-viewer `storey` key with the other storeys' … | §8.5 |
| J-A28.83 | the plan budget and the cache's memory line, PLAUSIBLE until T28-8 measures them | §12.7, §12.8 |
| J-A28.84 | the JSON schema's plan block and one VTT scene per storey in our own schema | §11.1 |
| J-A29.81 | entrance ticks by role and frontage-treatment runs as symbolisation rows at the district band and finer | §8.2, §11.1 |
| J-A16.81 | S10b's scoring absorbed in the pooled row's p50 until M2b measures it, then restated with §12.3's p50 column | §12.4 |
| J-A20.81 | the one-way rule as a vocabulary fact | §11.3, §11.2, §11.4 |
| J-A21.81 | the arm's-length bridge kept on design grounds under the owner's 2026-09-27 ruling (private for now) | §11.3 |
| J-A8.01 | the decline and regrowth hooks proved by hand-applied conversions (T8-1 – T8-7) and priced at M4 | §13.2, §16, D-25 |
| J-A9.01 | already the rule: size within a rung follows population (§1.1) and parity pairs match building counts (§13.6 (3)) | §0.2, §1.1 |
| J-A10.01 | D-3 restated: islands a model setting off by default … | D-3 |
| J-A12.01 | the underground registration and its output keys in §14 | §14, §13.2 |
| J-A13.01 | one `layers` object on `RungProfile` — the islands gate (item 13) and the sewer existence row (item 14) | §1.1, D-33 |
| J-A16.01 | amendments b's build work priced line by line in §16 and carried by the milestone rows — *amended by J-A568.01* | §16, D-20 |
| J-A16.02 | one placement solver and one designation mutator in `@plat/plots`, S10b moved out of `@plat/content` | §14, §13.2, D-32 |
| J-A20.01 | the dossier contract's tests (T20, T22) stated in §13.2, its hooks in the staged SettlementForge row … | §13.2, §15.2 |
| J-A21.01 | the licence stays private (the owner, 2026-09-27) | §17.1, §17.3, D-22 |
| J-A23.01 | the parity presets as item 23's proof (T23-1) | §1.4, §13.2, §17.1 |
| J-A24.01 | the principal market's siting shares as a §13.7 threshold with a fallback; MFCG's secondary-plaza rows ⟨M-1⟩ in §13.5 | §13.7 and §13.5 |
| J-A26.01 | O14's letters gain the fuel and timber rows; the hinterland modes and the arable reserve tested as T26 | §13.2, §15.2 |
| J-A27.01 | FTG's lifestyle distribution a descriptive §13.5 row | §13.5, §13.2 |
| J-A28.01 | the eight plan bars with the plan block's schema bar … | §13.2, §13.7, §16 |
| J-A28.02 | the one-page summary amended by an appended paragraph — *superseded by J-S44* | the summary |
| J-A29.01 | the entrance and basement bars (T29); Dwellings' basement share descriptive only, with no baseline row — *amended by J-A50.01, J-A50.21* | §13.2, §13.5 |
| J-A30.01 | the hidden share's tolerance (± 0.03) a §13.7 threshold with a fallback | §13.5, §13.7, §15.2 |
| J-A31.01 | the wealth ladder's twelve bars in §13.2 with the floor's among them | §13.2, §14, §15.2 |
| J-A12.71 | a tunnel drawn by `drawTunnel` and an access point created by `placeAccess`; a tunnel's condition changed only by its `convert` | §7.1, §7.4 |
| J-A20.75 | a map event — one a user, or a host's map edit, appends without `EditBase.dossier` | §7.7, §7.1, §7.2, §5.2 |
| J-A22.74 | the creation prefix — the blueprint's and the creation dossier's `assign` events at positions 0…k, flagged `EditBase.creation` | §7.4, §7.1, §6.2, §7.7 |
| J-A22.75 | the report's `changes` list rebuilt from the log's events and the lifecycle events they wrote, never stored | §5.4, §7.7 |
| J-A24.71 | a market's `rank` is `setAttr`-editable as a Re-derive from S3 with its fate report … | §7.1 |
| J-A30.72 | a block's `reach` is `setAttr`-editable, re-deriving the block's interior by S10 (7)'s re-cut with its neighbours fixed; institutions have their own edit-target row — *amended by J-A20.77* | §7.1, §7.4 |
| J-A31.75 | the epoch invariant compares the touched plots' frontage edges and their buildings' shells with their pre-epoch values … | §5.3 |
| J-A31.76 | `Building.condition` is `setAttr`-editable as an edited attribute the ladder's rung 1 then leaves as set | §7.1, §7.4, §7.5 |
| J-A28.34 | a transient arena's seed and fixed rings enter as exact topology | §3.4, §3.10 |
| J-A30.23 | the passage a wing spans is a room of the spanning building's plan at the ground storey | §2.6, §2.5 |
| J-A30.24 | a sealed plot's `knownTo` defaults to `secret`: the lost place (amends J-A30.22) | §2.5 |
| J-A29.23 | item 29's records follow the footprint by the wing-carrying rule | §2.6, §2.2 rule 5 |
| J-A29.24 | the basement's terrain gate by the cellar floor against the water table | §2.6, §2.3 |
| J-A28.28 | the capacity a property of the shell alone | §2.6 |
| J-A28.29 | who occupies a building, at which band | §2.6, §2.5 |
| J-A8.22 | a reused trace keeps its L4 face and records what it became in `Building.reusedAs` (garden, orchard or field) … | §2.6, §2.8 |
| J-A24.43 | the harbour's kind weight raised to the plaza's and its trade term read against the reference port `portRef` | §4.2 S3 (12) |
| J-A26.44 | FTG's four farmland settings named truly and all three layouts adopted | §4.9, §4.2 S2 |
| J-A31.40 | rung 2's back court is the one ring change below rung 3 | §4.11, §4.6 |
| J-A19.81 | wealth in the `lit` family's roof colour | §8.2 |
| J-A28.85 | room labels set by the plan draw along each room's spine inside the room | §8.5, §8.6, §11.1 (with §8.1, §9.2) |
| J-A28.86 | the JSON schema's plan blocks carry every stored plan and the derived plans the exporting session's cache holds … | §11.1 |
| J-A30.85 | the knowledge filter's reach: every `query` kind | §11.2 and §11.1, with §8.2, §9.2 and §11.3 |
| J-A30.86 | the knowledge admission table as data | §9.2 |
| J-A30.87 | a building over a passage carries one span mark per base wing that spans it | §8.5, §8.4, §11.1 |
| J-A15.01 | T15-1 tests the island count against each seed's expected counts under II.6 (4)'s slot law, and each count's reachability at full supply | §13.2 |
| J-A23.02 | the D-5 MFCG and FTG pairs render PLAT under the matching parity preset … | §13.6 |
| J-A28.73 | F-PLAN's tier 2 answers a transient arena's refusal by what was refused | §5.2 |
| J-A22.76 | the events an epoch carries in `EpochInputs.dossier` take their `seq` from `nextSeq` when the `epoch` event is appended … | §7.7, §7.1 |
| J-A29.25 | a stair core that serves the basement takes a bay inside `Basement.ring` as well as its wing | §2.6 |
| J-A20.22 | `Identity.dossier` is carried by the entity the dossier element is | §2.8 |
| J-A11.43 | a conversion given a tunnel stretch first splits the record at the stretch's ends, so a condition stays one reading per record | II.6, §4.11, §6.3 |
| J-A12.47 | the crowding hook reads the epoch's residual demand after the regrowth-first steps and sends `crowdingShare` of its poorest-band households underground | II.7.3, II.7.4, §4.11 |
| J-A20.42 | S10b's closest options ordered by the number of hard rows failed, then score descending, then plot id | §4.7 |
| J-A28.46 | the generation fill split at the stages that can read each quantity | §4.7, §10.2 |
| J-A28.87 | room labels take a cap-height range of their own among §9.4's floors, 5–9 px … | §9.4, §8.5 (with §8.3) |
| J-A17.01 | the epoch-bound bars — T17-2, T17-3, T20-2's epoch clause and T20-6's epoch clause | §16, §13.2 |
| J-A20.43 | an epoch's forced relocation of a dossier-backed use | §4.11 |
| J-A30.25 | `Passage.headroomCm` derived by S11 with the spans | §2.5, §2.6 |
| J-A30.26 | a passage's span kept true through every change of its front building | §2.5, §2.6 |
| J-A51.51 | the three references' whole-map retries named by build; no restart path kept, every retry a rung of the failing batch's ladder | §5.1 |
| J-A52.61 | the session-history independence test stated in §6.5 (9) as a determinism test; §13.3 points to it | §6.5 |
| J-A41.61 | the stream registry appends `cut.stop` and retires `cut.side` and `cut.farSideAlt` as reserved ids with no reader | §6.1 |
| J-A67.61 | a Works' timing drawn on an appended concern `works` | §6.1 |
| J-A68.61 | the light sources placed on an appended geometry concern `pin.light` … | §6.1 |
| J-A68.62 | the CPU reference light pass inside the determinism lint's allowlist closure and byte-identical across the five engines | §6.5 |
| J-A72.61 | a district's character vector and band range derived, recomputed on load and never hashed | §6.2 |
| J-A72.62 | a fifth naming draw case: a district whose identity row changed at an epoch re-draws its unprotected name | §6.3 |
| J-A37.71 | per-preset values: a cell may carry `presets: { MFCG?; FTG? }` | §7.6 |
| J-A43.71 | under the `FTG` parity preset the front recession is 0 | §7.6 |
| J-A44.71 | the compound enclosure an `extension` with `over: 'both'`, read by both parity presets | §7.6 |
| J-A66.71 | the closure rule general and homed in §7.3 item 9 | §7.3 |
| J-A65.71 | the underground layer's other systems edited with the tunnel events on their own parts | §7.1 |
| J-A67.71 | a Works edited by `startWorks`, `cancelWorks` and `setAttr` on its record | §7.1, §5.4 |
| J-A68.72 | a hand-placed light a declared `LightSource` record, surviving regeneration by its host anchor | §7.1, §7.4 |
| J-A68.71 | the day and night switch, the sun's mode and height and the hand lantern are view controls on … | §7.8 |
| J-A76.72 | an older `epoch` event without a week takes its predecessor's week plus round(52 × `years`) at load | §7.5 |
| J-A101.71 | authoring is declare-then-derive over the existing events, in twelve tools and five layers | §7.1, §7.2 |
| J-A101.72 | the four sugar events logged as themselves and expanded at fold by the versioned `sugar.json` | §7.1, §7.5 |
| J-A101.73 | a points form's shape derived at the dry run and stored resolved in the event, never re-derived; handles are new declarations | §7.1 |
| J-A101.74 | a clerk's accepted proposal logged with `EditBase.proposedBy: 'clerk'`, the user its author | §7.1 |
| J-A101.75 | every re-roll scoped; a derived fill's three variations are its scope's next three rerolls on the dry-run overlay … | §7.3 |
| J-A101.76 | a declared way of a class above lane across an enceinte makes a gate by S7's operator | §7.3 |
| J-A101.77 | T1 `intend` is the basic panel itself; the toolkit adds no basic control | §7.8 |
| J-A20.76 | item 20 (h) (i): every fact is a dossier fact | §7.7 |
| J-A20.77 | item 20 (h) (iii): the coherence rules bind the derivation (generation, re-derivation, dossier events) … | §7.7 with §7.1 and §5.2 |
| J-A20.78 | item 20 (h) (ii): the derivation table is an index of data rows (DR1–DR25) | §13.2, §7.7 |
| J-A20.79 | item 20 (h) (iv): the map never asks the host for a fact | §7.7, §11.4, §14 |
| J-A74.71 | the `Document.dossier` block — binding rows, carried facts, their hash and the absorbed states | §7.7 (the document's block: §2.9; the digest: §6.2) |
| J-A74.72 | the key law stated once at §7.7 (the dossier contract) and applied by the port's adapter … | §7.7, §14 |
| J-A74.73 | a collective record's members keyed `#k` | §7.7 |
| J-A75.71 | the receipt table as one row type with a fate-first dispatch … | §7.7 |
| J-A75.72 | owner Q4 at row F20: a settlement ruined and resettled on its site stays one map regrowing on … | §7.7 |
| J-A76.71 | a rejection lapses at an epoch only when its population target moved past §4.11's roster tolerance; refines J-A20.74 | §7.7 |
| J-A77.71 | `CircumstanceSlice` declared once in §7.7, its trade … | §7.7 |
| J-A77.72 | the trade fill: partners from the dossier's neighbours and link partners, else one per through route | §7.7 |
| J-A78.71 | the sector set stated once as §10.2's rows and the slice keyed by it | §7.7, §10.2 |
| J-A78.72 | a standalone economy slice defaults to an even mix, which amplifies no class | §7.7 |
| J-A80.71 | a dossier-listed ruin stays on the map as its ruin … | §7.7, §5.3 |
| J-A80.72 | a collective record's state spread over its placed members by the severity band's share … | §7.7, §6.1 |
| J-A81.71 | owner Q3: a dossier below 1 500 people is refused by the port naming the village product while no village product is registered; §1.1's clamp serves only requests without a dossier — *amended by file f item 202* | §7.7, §1.1 |
| J-A81.72 | the dossier's tier word titles the map while the rung follows the population | §7.7, §9.5 |
| J-A82.71 | a dossier quarter is a naming claim carried by the best-matching emergent district identity and its phrase a … | §7.7 |
| J-A82.72 | owner Q5 and Q6: the "Eastern district (traditional)" east row a low-weight placeholder dropped on the owner's word | §7.7 |
| J-A82.73 | a claim no district matches above the claim floor (0.5) waits, reported … | §7.7 |
| J-A86.71 | the ignore-list is a rule of the dossier contract's "One way" (§7.7 item 1), §11.4 pointing to it … | §7.7, §11.4 |
| J-A86.72 | owner Q6's other face: a host's own district reads and news names are never inputs … | §7.7 |
| J-A87.71 | a host's undo is a forward dossier change that converges through the solver's own order, reported `state_matches_absorbed` | §7.7 |
| J-A45.31 | one read-only kernel service, `regularFit`, for a ring's least-squares regular n-gon | §3.4 |
| J-A53.31 | §3.1 keeps our contour extraction and binary-heap A\* / Dijkstra after the code readings corrected the reference notes … | §3.1 |
| J-A65.31 | several arenas on the underground layer | §3.4, §3.10 |
| J-A65.32 | every underground part cut by the same functions | §3.7 |
| J-A50.21 | the main door on the footprint side that faces the frontage access edge … | §2.6 |
| J-A59.21 | stage 3's path-shape rows: the reference's layout families (P21) held as a data table, `PathShapeRow` … | §2.6 |
| J-A60.21 | Dwellings' storey-count cellar share and random loop doors written as descriptions of the reference (D2, D3), never gates | §2.6 |
| J-A79.21 | powers typed as standings, never entities | §2.7 |
| J-A79.22 | `Faction.kind` gains `military` and `arcane`; an arcane power is a dossier fact always honoured and, standalone … | §2.7 |
| J-A79.23 | a hidden power keeps its kind and sets `secret` | §2.7 |
| J-A88.21 | the dossier's remaining optional inputs declared now, schema-complete and empty | §2.7, §2.9 |
| J-A88.22 | a dossier-backed `Person` pinned whole, housed by rule, with its `Posting` and `Membership` … | §2.7 |
| J-A20.23 | (h) the fact tier derived at read by `factTier` | §2.8 |
| J-A63.21 | a concealed function is its own `Use` (mode, source, front, knowledge) in the front's building, listed in `Building.concealed` … | §2.6 (with §2.7) |
| J-A64.21 | a basement's way down is an `AccessPoint` of source `basement` made by II.7.3's basement-access lottery (J-A12.42 stands) and a fixed anchor of the basement storey in the plan rung | §2.6 |
| J-A65.21 | the underground layer's systems as records in their own arena parts | §2.1–§2.9 |
| J-A66.21 | a requested basement overrides the class probability, never the terrain gate | §2.6 |
| J-A67.21 | the `Works` record — target building or plots, start week and whole working weeks, its row … | §2.6–§2.8 |
| J-A68.21 | `LightSource` a host-anchored record, lit or unlit a reading of its host; derived lights never records | §2.7, §2.9 |
| J-A70.21 | `Plot.tenure` a stored derived column with a `setAttr` override | §2.5, §2.6 |
| J-A72.21 | `CharacterVector` declared once, for the derived five-component profile, recomputed on load and outside the digest | §2.5, §2.9 |
| J-A101.21 | the author's tier `declared` read from the flags a declaring event sets | §2.8, §2.9 |
| J-A33.41 | §4.6's recipe is cited as the mechanism of NG 1.2.2's plain bisector … | §4.6 |
| J-A33.42 | the slope term kept as our own rule | §4.6 |
| J-A34.41 | the stop test keeps the OBB minor extent as its quantity and draws its threshold per face … | §4.6 |
| J-A34.42 | the block-depth range stated once in §4.6 step 1 | §4.6 |
| J-A35.41 | the cut position `f = (c + b) / 2`, no outlier, clamp or redraw | §4.6 |
| J-A36.41 | a deterministic start — the candidate on the run most nearly parallel to the working major axis | §4.6 |
| J-A37.41 | K, the corner, comes first and the far run is chosen from it | §4.6 |
| J-A37.42 | `cut.bendMode` is `flatten` (NG 1.2.2) in the base, with `cut.flattenM` 0.7 m | §4.6, §7.6 |
| J-A38.41 | the fillet decided by deflection and shorter leg | §4.6 |
| J-A39.41 | the bounded ladder kept; its rung (a) re-plans in frames turned by 36° (at most three) | §4.6 |
| J-A40.41 | the lane width `w_lo + Δw · min(1, L / L_ref)^p` … | §4.6 |
| J-A42.41 | every plot built with an access edge and a deep block's interior chosen by S8's band shares (J-P15) … | §4.7 S10 (10), §4.6 |
| J-A43.41 | the front-line jitter as an area-scaled, uniform, floored recession | §4.7 S11, §10.2, §7.6 |
| J-A43.42 | `jitter.minM` bounded below by `attractCm` + 1 cm (default 0.3 m), a table or preset edit below the bound refused | §4.7 S11, §3.6 |
| J-A44.41 | the set-back compound's enclosure wall is ours | §4.7 S11, §2.5 |
| J-A67.49 | the designation mutator decides and records a change at once | §4.7 S11, §4.11 |
| J-A58.41 | stage 2's ring courses by default | II.2 |
| J-A58.42 | stage 2 keeps its per-band green target and adopts NG 1.2.2's pin weight decay (the chosen kind's weight ÷ 10) | II.3 |
| J-A58.43 | the ≈ 525 m hood span of NG 1.2.2 stated as a descriptive scale only, an inference | II.2 |
| J-A61.41 | the village hooks name VG 1.6.9 (itch 19365073) and record its code-confirmed palisade-first order and steering terms qualitatively … | PART III |
| J-A63.41 | `concealment` resolved dossier → assignment → the class's default-mode weights → `none` | §4.7 |
| J-A63.42 | a front and its concealed function are one solver item and two `Use` records; S11 builds the front | §4.7, §10.2 |
| J-A63.43 | the front drives the designation mutator and the concealed use persists | §4.7 |
| J-A63.44 | concealment and the cover table are `extension` rows, so the parity presets place every institution openly | §4.7, §10.2, PART III |
| J-A64.41 | a basement access decided per building | II.7.3, §10.2 |
| J-A64.42 | the concealment multiplier on the concealed class's row (default 6), not on the building's class | II.7.3, §10.2 |
| J-A64.43 | `AccessPoint` gains a stored `state` (open, locked, bricked), `knownTo` and a general `under` (part, element, vertex) | II.7.4, II.7.3, II.6 |
| J-A65.41 | the undercity's four requirements are its existence test | II.7.5 |
| J-A65.42 | U1–U3 are the sewer network's rules on part 0 | II.7.3, II.7.5 |
| J-A65.43 | catacombs, caverns, quarries, vaults and a buried town are realism by rule | II.7.5, II.7.6 |
| J-A65.44 | an undercity neighbourhood lives in its void source's part, a pseudo-district with a parent surface district … | II.7.5 |
| J-A65.45 | quarries sized by the stone the town is built of | II.7.6 |
| J-A65.46 | a buried old town is the `raiseGrade` conversion | II.7.6 |
| J-A65.47 | one system per kind, part numbers in creation order | II.7.6 |
| J-A65.48 | every underground gallery and chamber takes II.6's condition table, with a `flooded` row of their own | II.6, §4.11 |
| J-A66.41 | the access edit's pieces: a forced but terrain-gated basement, the target in a fixed order … | II.7.6, PART III |
| J-A67.40 | the island slots are re-drawn at an epoch at a per-year rate (`redrawPerYear` 0.1) applied over the epoch's … | II.6 |
| J-A76.45 | every per-unit-time chance of §4.11 stated per year and applied over an epoch's span as 1 − (1 − p)^years | §4.11, II.6 |
| J-A67.41 | a physical change decided and recorded at once by its event | §4.11, §2.7, §7.1 |
| J-A67.42 | a Works' duration scaled by its plot band's labour factor on top of the uniform draw in its `WorksTable` row's range | §4.11 |
| J-A67.43 | material admitted as a duration row of `WorksTable` only, never a shape input; J-A31.42 stands for replaceability | §4.11, §2.6 |
| J-A67.44 | a join or split changes the plot rings when its event lands | §4.11, §2.5, §8.2 |
| J-A67.45 | the drawn week: the document's current week (the last folded event's) unless the per-viewer view key `week` names … | §4.11, §2.9 |
| J-A67.46 | the decay Works carries the dwell band; the strike pool's decay candidates are the buildings whose decay Works has run its span | §4.11 |
| J-A67.47 | no Works at generation: the creation week shows a finished town; Works come only from dated events | §4.11 |
| J-A67.48 | restraint by construction: an epoch's Works start at weeks spread uniformly over its span … | §4.11 |
| J-A76.41 | the map's week is SettlementForge's `calendar.elapsedWeeks` (never `elapsedMonths` or `history.age`) | §4.11, §10.3 |
| J-A76.42 | one calendar: `CalendarRow` with the dossier's `sf445` row and our default of the same shape … | §4.11 |
| J-A76.43 | the roster tolerance ± 5 % as the one number for the epoch cadence's population trigger and §7.7 … | §4.11, §7.7 |
| J-A76.44 | a churn cap scaled by a fractional `years` keeps its fractional part, as a chance of one extra … | §4.11 |
| J-A81.41 | at each epoch the rung profile is read at the population target | §4.11, §3.2 |
| J-A77.41 | `TradeFlow` declared and derived at §4.3 | §4.3, §2.9 |
| J-A101.41 | a skeleton's drawn declarations read ahead by the stages that own their subjects as the base derivation's constraints | §4.1, §7.4 |
| J-A68.41 | lights placed by rule: "partitioned" read as distribution by way class, district and band | §4.7, §8.4 |
| J-A70.41 | a plot's tenure derived (owned, rented, common, informal) from the owner record, the band and the standing stock … | §4.7, §2.5 |
| J-A70.42 | the `cluster` arrangement takes the default preset's informal squalid and shanty plots, subsuming the tents row there | §4.7 |
| J-A70.43 | clusters placed by FTG's trigger and staging as the emulation default … | §4.7, §4.5 |
| J-A70.44 | a cluster structure's main entrance faces its footpath — §2.6's rule 1 read as for a hidden plot | §4.7, §2.6 |
| J-A70.45 | clusters packed paths first: a trunk footpath from each access edge and alternating branches, structures fronting the paths … | §4.7, §2.5 |
| J-A70.46 | households per structure a rung × band row of our own, clamped by §2.6's capacity through a one-room … | §4.7, §10.2 |
| J-A70.47 | lean-to shelters only against a standing wall on their own plot, never inside a wall strip | §4.7, §4.8 |
| J-A70.48 | clusters over epochs: accretion as short build Works, fire as a destructive event (charred, then cleared) … | §4.11 |
| J-A71.41 | the class mix as a draw of the residential class above the template … | §4.7, §10.2 |
| J-A71.42 | the town-wealth shift read from the intent's `wealthLevel`, never from the town's relative field mean | §4.7, §7.7 |
| J-A71.43 | a block's classes drawn as a multiset at each plot's value … | §4.7 |
| J-A71.44 | a household takes any class the mix gives a plot within its band ± drift | §4.7, §4.2 |
| J-A72.40 | the dials' passes: the institution dial on pass 2's institution kernels … | §4.5 |
| J-A72.41 | "character" has one meaning — `CharacterVector` is the derived five-component profile on `District.character` | §4.5 (with §2.5, §7.7) |
| J-A72.42 | typing before placement, identity after it | §4.5, §4.1 |
| J-A72.43 | the roster's town-level character read from the economy slice's sector shares … | §4.2 (with §4.5, §10.2) |
| J-A72.44 | renames at epochs: a district whose identity changed past its hysteresis re-draws its name on its naming stream … | §10.4, §6.3 |
| J-A72.45 | significance = the class's value × rank × size × patronage weighs every count, share and dial | §4.5, §10.2 |
| J-A72.46 | dispersed classes spread over all districts by affinity with a controlled random share | §4.5 |
| J-A72.47 | the pressure a persisted per-district scalar, a leaky sum of the clamped excess (retaining 0.5), written only by epochs and read by the next epoch's field — the owner's reading decided J-C3 | §4.5, §4.11, §2.5 |
| J-A72.48 | a shared building's amplification a blend partitioned by relative standing or share, its contributions split the same way … | §4.5 |
| J-A72.49 | the economy dial proportional to a sector's share over the even share, scaling class kernels | §4.5 |
| J-A82.41 | notice posts by default at the principal market, each gate plaza and every class tagged `notice` … | §4.7, §10.2 |
| J-A88.41 | the staged crime term as multipliers on the hidden-share target, the basement-access probability and the undercity's demand … | §4.6, §10.2, II.7.3, II.7.5 |
| J-Fpipe-2 | a way a carve or a water move cuts in two re-keys its far part and re-points every record naming it | §4.11 |
| J-A45.41 | the castle repair in MFCG 12710731's order and toward its target | §4.8 |
| J-A45.42 | the bloat kept a move of the claim's own vertices inside its reservation … | §4.8, §5.2 |
| J-A46.41 | the waterfront reduction `N₁ = 2 + ⌊0.75 · (N_land − 2) + ½⌋` where the pick contour runs along a shore for at least `gate.waterfrontShare` of its length | §4.2 S3 (4) |
| J-A46.42 | the waterfront reduction applied to a later walled stage's `N_k` by the same condition on that stage's boundary | §4.4 S5b |
| J-A46.43 | the trace's pinned Laplacian smoothing fixed at 3 passes (`wall.smoothPasses`), the gates … | §4.4 |
| J-A47.41 | the grower's round-robin turns with a skip rate per seed kind (`district.growthRate`: gate, castle and bridgehead 0.1, riverbank 0.5, others 1) | §4.5 |
| J-A47.42 | a district grown from a seed whose rate is below 1 exempt from the band floor's merge | §4.5 |
| J-A57.41 | the sector-look preset named by its two builds … | §4.9 |
| J-A57.42 | the MFCG variant's sub-furlong fields and paths drawn as render-time segmentation of the furlong faces (J-I6 kept) | §4.9 |
| J-A57.43 | the farmsteads the farm table's count under either sector variant | §4.9 |
| J-A53.81 | §8.10's sampler takes its candidates from the thin annulus between r₀ and 1.1 r₀ on the tile's torus (`poisson.annulus` 0.1) | §8.10 |
| J-A54.81 | the raised under-copy's offset × a class row's ratio | §8.2, §8.4 |
| J-A55.81 | the horizontal spine first among an area label's candidates, scored in model coordinates so candidates stay model data | §9.3, §9.2 |
| J-A68.81 | the default view: day, the cursor sun and cast shadows on in every shipped family — `ink` gently and in value only — the `MFCG` preset without — decided J-C1 | §8.4, §8.2 |
| J-A68.82 | one drawing path: the light a post operation over the Canvas2D base … | §8.4, §8.2, §8.9 |
| J-A68.83 | the light model: a per-tile surface layer (normal, height, unlit coverage) plus a slab list for casters over … | §8.4 |
| J-A68.84 | the cursor sun at G = V + s·u, height h₀·D·s | §8.4 |
| J-A68.85 | the light pass's fallback ladder: the GPU pass at the tile DPR → a half-resolution global term → the vector rung | §8.4, §8.8, §12.7 |
| J-A68.86 | the `MFCG` preset draws no cast shadow, no night view and no light … | §8.4 |
| J-A68.87 | on rungs 1–2 the lit programs emit albedo and normals and the pass lights them once … | §8.4 (with §8.2's roles and post operations, §8.8's canvas and §9.4) |
| J-A68.88 | the first map composed unlit, its time excluding the light, the lit view following within the settle bound | §8.5, §12.5 |
| J-A68.89 | the canvas need with the light pass is 4.25P + 7 MB + Q … | §8.8, §12.8 |
| J-A69.81 | the palette targets' measures in our own words | §8.2 |
| J-A69.82 | `ink`'s other roles take the least chroma scale whose plate chroma reaches 20 (≤ 30); its role cap rises from 18 to 34, re-ruling J-R3 — decided J-C2 | §8.2 |
| J-A69.83 | `lit`, `hatched` and the reserved families aim at the median plate chroma (43) under a restraint rule | §8.2 |
| J-A69.84 | every shipped family's paper and ink on the targets, one paper value for all three | §8.2, §8.3 |
| J-A63.81 | a concealed use's parts — its rooms, its concealed door, its way down | §9.2, §8.1, §11.1 |
| J-A65.81 | the underground layer drawn as one over its systems' parts by depth band, the adjacent bands as traces … | §8.4, §9.2 |
| J-A67.81 | the display list built at the drawn week | §8.1, §8.8 |
| J-A67.82 | "the simulator's clock" read as the host's | §11.3 |
| J-A70.81 | an informal cluster is the city band's exception to the mass closing | §8.5, §9.1 |
| J-A72.81 | a district's identity, a power's share … | §8.2 with §9.1 and §9.4 |
| J-A20.82 | item 20 (h): the reader, every answer and every export mark each fact's tier by §2.8's `factTier` (`dossier`, … | §9.2 with §9.1, §11.1 and §11.2 |
| J-A73.81 | owner Q2 (J86): no door opens the other way | §11.4 |
| J-A85.81 | the inert-export rule at §11.1 — every exporter escapes by its format's rule … | §11.1 |
| J-A85.82 | bridge correlation at §11.3: `re` on every reply, the source-window check, host messages queued before `ready` | §11.3 |
| J-A101.81 | the underlay as a per-viewer view key drawn by the compositor beneath the tiles, never exported … | §9.5 |
| J-A101.82 | every export carries each fact's tier and each event's authorship | §11.1 |
| J-A101.83 | the clerk's tool API is the embedding API with `preview` and the `why` query added and nothing clerk-specific | §11.2, §8.2 |
| J-A101.84 | region groups as a `RegionGroup` record over the quarter tree with `region` labels at the city band | §9.1 with §9.3 and §9.4 |
| J-A32.01 | the owner's code-reading directive stated once, in §17.1 (1) | §17.1, §0.3, D-29, Appendix A |
| J-A32.02 | amendments c, d and e land in one §0.2 table and one plain-words paragraph appended to the summary — *superseded by J-S44, J-S45* | §0.2, the summary |
| J-A33.01 | the bent cut named by build wherever the scope part cites it | D-16, §1.3, §1.4 |
| J-A34.01 | the plot-depth rows and regime floors behind §4.6 step 1 re-fitted at M-1 before any block band is signed | §16, §13.5 |
| J-A37.01 | M0 (b)'s comparison with NG's distributions is the check of the adopted corner-first rule, `cut.flattenM` calibrated there | §16 |
| J-A41.01 | NG 1.2.2's bent-cut numbers kept as §13.5's targets … | §13.5, §16 |
| J-A41.02 | the code-reading items' bars stated as one §13.2 group | §13.2 |
| J-A47.01 | the growth-rate bar — districts seeded at a gate … | §13.2 |
| J-A48.01 | MFCG's population described as six persons for each lot, the total rounded up at its second significant digit … | §13.5, §1.4, Appendix A |
| J-A49.01 | FTG's ground-cover "lot" figures withdrawn from §13.5 and §1.4, our plot bars standing as C rules | §13.5, §1.4 |
| J-A50.01 | §13.5's entrance row made class C, its bar §2.6's first entrance rule, the owner's rule of item 29 … | §13.5, §13.2 |
| J-A62.01 | a behaviour read in a reference's compiled code carries the `(code)` provenance with its P-id; the reference's class never in the design | §17.1 (6), (8) |
| J-A63.05 | the owner rules of items 63–72 and 20 (h) priced at +11.5–17 pw, item by item … | §16, D-20 |
| J-A68.05 | item 68's scope clauses in D-1, D-3 and D-19 — *amended by J-C1* | D-1, D-3, D-19, §0.2 |
| J-A69.05 | the owner-opened corpus palette bands cited by provenance `corpus` with the evidence "owner-opened corpus palette exception … | §17.1, D-1 |
| J-A72.05 | D-16, D-10, D-32 and §1.4's districts row re-worded for item 72 | D-10, D-16, D-32, §1.4 |
| J-A73.05 | the dossier port priced by its plan's line-by-line estimate, +4.5–6 pw over the O11, O10, content … | §16 |
| J-A101.05 | the authoring toolkit priced at +3.5–5.5 pw | §16, §1.4 |
| J-A56.01 | MFCG's naming row corrected — a feature-conditioned deck grammar, the Markov models MFCG 12710731 builds going unused | §15.1 (with §10.4) |
| J-A20.06 | the coherence bars T20-7 – T20-12 in §13.2's owner-rule group, run from M1 on the frozen fixtures and on a blueprint's own roster | §13.2 |
| J-A63.01 | the owner-rule items' hook tests and bars stated once, as one §13.2 group | §13.2 |
| J-A65.01 | the undercity's existence a third column of `RungProfile.layers` | §1.1 |
| J-A68.01 | changing the light pass is a paint-program change | §13.3 |
| J-A68.02 | the GPU light pass held to the CPU reference (≤ 2 per 8-bit channel at p99.9, ≤ 0.5 on average), a missing tier falling back | §13.4 |
| J-A69.01 | the palette acceptance bar in §13.4's B-ZOOM, not a §13.5 row … | §13.4, §13.7 |
| J-A71.01 | the prime-frontage margin a §13.7 threshold | §13.7 |
| J-A72.01 | `ContentProvider.roster` takes the economy slice's shares as the town-level character, never item 72's district `CharacterVector` (J-A72.41, J-A72.43) | §14 |
| J-A73.01 | owner Q1 (J86): the port's first adapter serves `fp/integration-2026-09-23` pinned at commit `5d699cc68` | §14 |
| J-A73.02 | the port's types split by subject | §14 |
| J-A73.03 | the port's creation half built at M1 and exercised test-side only by B-DOSSIER-lite, its absorb half at M3a … | §14, *Staged* |
| J-A83.01 | the derivation table's totality (T20-10) and the port's vocabulary totality (T73-10) as one test | §13.2 |
| J-A83.02 | B-DOSSIER-lite's creation bars in the PR tier (≈ 45 generations) inside §13.8's existing budget, its fallback applying | §13.8 |
| J-A84.01 | the dossier fixtures at `plat/tests/fixtures/dossier/`, inside the product (the plan's J-P4), never under `research/` or `captures/` | §13.2, §14 |
| J-A84.02 | the fixtures cut only from runs of the named SettlementForge line and re-cut by the same scripts for … | §13.2 |
| J-A85.01 | the one-way seed — `H32("plat:sf-seed" ‖ the dossier's seed)` | §14 |
| J-A85.02 | display names applied inside the one export request they came with and never stored | §14 |
| J-A85.03 | the seam's security rules each at its subject | §14 |
| J-A101.01 | the UX rules R1–R19 and the twelve tools' interactions stated as §14's interaction contract; every gesture with a keyboard form | §14 |
| J-A101.02 | a clerk is any program that drives the map through the tool API alone, its limits the module's; SettlementForge's assistant in the module (J122), the built-in clerk at M3c, opt-in and labelled as AI | §14 |
| J-A101.03 | the first-five-minutes test at the M2a and M3a exits | §13.4 |
| J-A101.04 | plots on a bridge deck staged with no hook beyond the `Bridge` and way records — *superseded by item 110 (d)* | *Staged* |
| J-Fdet-1 | the undo independence check also reads the input layer | §7.4 |
| J-Fredteam-1 | §4.6 step 8's rung (c) made always-succeeding in fact | §4.6 |
| J-A67.72 | `startWorks` carries the hand change it schedules, folded at once at its position under its `seq` | §7.1, §7.4 |
| J-A68.73 | the warp's mean-value rule carries three more point records | §7.4 |
| J-A81.31 | a frame grows at an epoch, never shrinks, by three single-level batches sharing one clear region | §3.2 |
| J-A20.24 | a dossier fact reaches its tier through the entity's dossier ref | §2.8 |
| J-A63.22 | `Use.concealmentSource` names only the map-side origin of a concealment mode and is absent while the dossier sets it | §2.7 |
| J-A67.22 | a Works' kept rings and lines are world points carried with the target's plot face by §7.4's mean-value rule | §2.7, §7.4 |
| J-A77.42 | `TradeFlow` derived in two parts at generation | §4.3, §4.2 |
| J-A70.49 | at generation a plot is informal only where the cluster row takes it | §4.7, §10.2 |
| J-A72.50 | S7b allocates by a provisional, unstored band range, the one the district's pass-1 value gives | §4.5, §4.7 |
| J-A72.51 | a district-defining identity row without a kind scores the unclaimed districts by its defining class's own relation rows | §4.5, §10.2 |
| J-A65.49 | the geology flag an S0 toggle (auto, ordinary, soluble, volcanic) | §4.2, §4.9 |
| J-A65.40 | an undercity neighbourhood named from the naming pack's `undercity` slice, reading its parent quarter's name, drawn once | §10.4, II.7.5 |
| J-A68.42 | a light rule row carries the flame's size, the colour and a flicker flag … | §4.7 |
| J-A88.42 | the staged inputs' readers stated at their homes | §4.2 S2, §4.5, §4.9, II.7.6 |
| J-A64.44 | an underground neighbourhood's fallback cellar stair in a building within reach on a secret plot first … | II.7.3 |
| J-A101.85 | the oracle under the knowledge key | §11.2 with §9.2 |
| J-A72.82 | S12c costed as its own row and S11's light placement added to the pooled row; the p95 laws unmoved | §12.4, §12.3 |
| J-A66.01 | the access edit `addUndergroundAccess` with its closure generators … | §16, §13.2 |
| J-A81.01 | a dossier above the 120 000 cap refused by the port | §7.7 item 15, §1.1, §14 |
| J-A88.73 | the circumstance slice's `disorder` stays the blueprint's setting, never filled from the dossier's crime scalar … | §7.7 |
| J-A65.22 | every further underground part bounded, as the sewer's is, by the ground's frame plus its context margin … | §2.2 |
| J-A68.90 | the global light's shadow window a world distance | §8.4 (c), §8.8, §8.9, §12.5, §12.7, §12.8 |
| J-A63.82 | a light draws only where its host draws | §8.1 item 7 (with §8.4, §11.1 and §8.8) |
| J-A68.91 | the cell post operations (`pixelate`, `dotScreen`) on each tile's own grid from its corner … | §8.4 (f) |
| J-A68.92 | the hand lantern evaluated per frame on the GPU as a point light, never baked, never in an export or still | §8.4 (f), §8.3, §12.5 |
| J-A85.83 | door (4) is `registerProvider` (§11.2), never a bridge message; a bridged host supplies content through the first three doors | §11.4 (with §11.3's bridge and §11.2's call) |
| J-A101.86 | a bridged host's clerk previews through the bridge messages `preview { events, view?: boolean }` and `preview.result` … | §11.3, §11.2 |
| J-A67.83 | a `repair` Works drawn as the decay stages backwards under a scaffold by a `states` row keyed by `worksKind` | §8.2, §8.1 item 7 |
| J-A65.02 | the geology flag's S0 draw and S1 resolution built at M1 with S0's other auto features … | §16, §13.2 |
| J-A68.93 | the ring blocks and the window's Z (`surfaceTopCm`) read the city band … | §8.1 items 2 and 6, §8.8, §8.9, §11.1 |
| J-A68.94 | every one-byte height on a square-root scale to the greater of 160 m and its own range above its datum | §8.8 |
| J-A66.72 | the closure's two further instances named by edit kind and subject | §7.3, II.7.6 |
| J-C1 | the default ink map keeps its gentle cast shadows in its own ink and only the `MFCG` parity preset draws none (J-A68.81 as designed) | §8.4, D-19 |
| J-C2 | the `ink` plate chroma stays 20–30 (J-A69.82 as designed); 43, the corpus median, is `parchment`'s | §8.2 |
| J-C3 | the item-72 surplus-pressure reading stands as designed | §4.5 |
| J-C4 | a raised-way span whose under-deck strip lies wholly on hinterland land-use faces stays open, reason `country`, at every rung (the realism tiebreaker) | §2.7, §4.3 |
| J-S44 | the one-page summary folds every amendment's facts into its plain-words body by subject and describes the whole set | the summary |
| J-S45 | §0.2 as one landing table — item, home, clause map — for items 1–113 with a pointer row for file f | §0.2 |
| J-S46 | `ContentProvider` (door 4) kept as a third party's extension point, exercised by §13.2's fixture provider, over removing it | §14, §13.2 |
| J-S47 | §13.8's schedule table (bar → tier → first milestone) as the one statement of when a base bar runs, cited by §16's exits | §13.8, §16 |
| J-A73.06 | `DossierDigest.government.previous` dropped, no mechanism of the set reading it; §7.7 item 1 lists `powerStructure.previousGovernments` as never read | §14, §7.7 |
| J-A77.06 | `RealmBlock.mPerRealmUnit` dropped: the host client's `realmBlockFrom` turns the realm scale into each partner's `distanceM` | §14 |
| J-A102.01 | the owner-item bars of items 102–113 numbered T⟨item⟩-⟨n⟩, each group naming the volume tests that take it over | §13.2 |
| J-A110.01 | item 110's base bars T110-1 – T110-7, its tendency specs keeping volume 12's ids `T110b.*` | §13.2 |
| J-A111.01 | item 111's base parts built at M1 (the oasis and spring at S0–S1), M2b (the water pull, the water term, wells by yield) and M3a (T2's spring flag) | §16 |
| J-A112.01 | the release gate: the public release inside SettlementForge, its timing SettlementForge's, requires T112-1 green and T112-2's report | §16, §13.4 |
| J-A113.01 | item 113's replay built at M6-E (volume 6), the buried former settlement at M6-U (volume 4), the dossier's history read at M-SF (volume 8) | §16 |
| J-A201.01 | the village rows in §1.1's rung table with their values, V07 §2.1 their households and dwellings | §1.1 |
| J-A505.01 | the staged packages imported only by `@plat/api`'s worker host, which registers them; no ground package imports them | §14 |
| J-A505.02 | `@plat/cli` a package over `api` and `clerk`, built only where volume 10's spike takes its fallback, over hosting `plat clerk` in `@plat/api` | §14 |
| J-A509.01 | the digest's staged fields named in §14 member by member, typed once in V08 §2.5 and §2.8 | §14 |
| J-A568.01 | §16's two totals computed once — 221.5–300.5 pw for the base with stage 2, 392.25–539.25 pw for the whole program — stage 3's 22.5–32.5 split 2–2.75 inside M3a and 20.5–29.75 staged, volume 9's and volume 12's out-of-row shares on one line | §16, D-20 |
| J-A568.02 | volume 11's +2.5–4 pw placed as C2's file-g share at M2b (1.75–2.75) and C3b at M3a (0.75–1.25); the calendar scaled to about 110–150 weeks | §16 |
| J-A568.03 | the base mechanisms of items 102–113 priced by absorption into named lines, their rows in volume 11's line and their bars in the rig line | §16 |
| J-A113.61 | the history replay keys its coarse epochs with the epoch component `0x8000 + r`, the u16 range's upper half, so no replay draw equals a live epoch's | §6.1 |
| J-A110.61 | the raised-way generator's stream registered as `raised.reason` (cap 0) | §6.1 |
| J-DET-55 | the tier-3 concerns' attempt cap is 2 (the tier table's three attempts); `hood.template` keeps its own | §6.1 |
| J-A344.61 | `village.track` kept rerollable (file f item 344), its `rerollLayer` dry run a Re-derive from VS4 with the fate report | §6.1 |
| J-A101.78 | plan-edit refusals, a `relet` above capacity, a passage below two storeys, a table cell out of range and a roster line the rules cannot honour are bends; capacity re-homing that cannot place its excess and a Works edit that strands a plot stay conflicts | §7.1 |
| J-DET-56 | an empty edit appends nothing (the `ok` result, nothing changed) over appending a no-op event | §7.1 |
