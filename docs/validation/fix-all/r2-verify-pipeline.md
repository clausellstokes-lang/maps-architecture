# Fix-all round 2 — PIPELINE area verification (fixall/verify-pipeline-r2)

> PENDING FABLE REVIEW — Opus-produced (fixall/verify-pipeline-r2), not yet checked by a Fable seat; queued in docs/FABLE-REVIEW-QUEUE.md.

Status: COMPLETE (2026-09-25). Verifier seat for the PIPELINE area after integration round 2.

## 0. In plain words

I checked the 18 pipeline items that round 2 set out to fix. **All 18 are accepted**: for each one the design now
contains a concrete mechanism that removes the failure the checker described, with no deferral wording. The main ones:
the first wall, its gates, the castle and the moat now come from one construction, so gates no longer sit in dents;
moats and canals come with bridges; row houses on curved streets keep their shared walls; lanes can no longer be cut
through the wall zone; each district plants trees only on its own ground; and lanes that end on a boundary street are
recorded in one shared record that both neighbours read.

I also re-checked the 128 items this area passed in round 1, because their sections were rewritten. All still hold.

The rewrite introduced or exposed **ten new problems: one major, nine minor.**

* **The major one.** Digging a canal by hand is promised to change nothing outside a thin strip along the new water.
  But the canal's own road rules (bridging main roads, cutting and tidying lanes) reach whole blocks beyond that strip.
  As written, the test would fail every time, and every hand-dug canal would fall back to rebuilding the whole town.
* **The minor ones.**
  * The harbour road can cross the first wall without a gate.
  * A park or institution may be placed inside the wall zone.
  * One safety check forbids what two wall edits must do.
  * Four places describe the same thing in slightly different words or numbers.
  * One sentence calls the shadow drawing a later stage although the design builds it now.
  * A castle's ring moat would cut through the town wall where the castle sits on the wall.

Each problem has a stated fix and an owning area. Nothing is deferred.

## 1. Scope and method

* **Read line by line** in the integrated `docs/ARCHITECTURE.md` (8 383 lines): the one-page summary and §0.8; §2.5–§2.7;
  §4.1–§4.12; §10.1–§10.4; PART II; PART III; the pipeline and integration judgment rows (J-P26–J-P33, J-I9–J-I11); the
  staged list. **Read for cross-references and conflicts:** §2.2 rules 1 and 3, §3.3 (clear regions, the pool steps,
  J-K14), §5.2 F-ROUTE / F-WALL, §5.3's pipeline invariant rows, §6.1, §7.3 items 1–3 and its operator table, §8.2's relief
  tier and programs, §8.4, §9.4's quarter bar, §12.2, §12.4, §13.1 / §13.2 / §16 fixture rows. The rest of the file was
  searched by grep for every pointer into the pipeline sections, not re-read.
* **Sources of each item:** `docs/validation/fix-all/r1-verify-pipeline.md` §3 (NF-P1–NF-P14),
  `r1-verify-determinism.md` (NF-D8, NF-D9, NF-D16), `r1-verify-rendering.md` (N-20, N-21, COV-VG-VN-029, with
  `coverage-audit-vg.md` VN-029), the §R2.1 rows of `docs/ARCHITECTURE-VALIDATION.md`, the pipeline draft
  `r2-pipeline.md` §1 and the integration log `r2-integration-log.md` (C-1–C-7).
* **Acceptance rule:** FIXED is ACCEPTED only when the text now holds a concrete mechanism that defeats the item's failure
  scenario (quoted below); deferral wording counts as UNRESOLVED. No item in this lane was claimed INVALID or
  STAGED-BY-OWNER.
* **Executed checks (this lane):** (1) a script (`vp-r2-quotecheck.py`, session scratchpad) re-found every quoted
  mechanism of the 128 round-1 items this area accepted: 110 quotes survive verbatim, the 18 that changed were re-read by
  hand (§3); (2) the two round-2 receipts `docs/validation/bench/fixall_pipeline_r2_{levelset,quarters}.out` re-read
  against the numbers the text cites; (3) §12.4's CITY critical path re-summed from its rows (251 ms — matches);
  (4) a deferral-word scan of every pipeline section (§5).

## 2. Verdict table — the round-2 items

| id | verdict | quoted evidence (ARCHITECTURE.md) | required change |
|---|---|---|---|
| NF-P1 | ACCEPTED | §4.2 S3 (5)–(7): the gate routes are solved first; "The one travel-cost field `T` … is computed here … the **stage-1 boundary** is that contour"; "Each gate is the **first point at which its solved route, walked outward from its plaza, reaches `T = t_1`** — on the boundary by construction"; (9) "S5a commits this trace unchanged for k = 1 … **Test:** every gate and weld vertex lies on the committed trace exactly … and the trace departs from the boundary by ≤ 40 m everywhere"; (10) the city moat is carved "along the (9) trace"; §4.4 S5a: "stage k's boundary is taken from `T` **as it stands when stage k begins**, before its own S5b". Receipt re-read: `fixall_pipeline_r2_levelset.out` gives the 76 m / −35 m departure the text cites. | — (see VP2-2 for the one S3 route that is not a gate route) |
| NF-P2 | ACCEPTED | §2.6 `BaseWing { kind: 'rect'|'quad'|'polygon'; ring; ridgeAxis … }`; "That polygon is stored as one `quad` wing … S11 hands it to `outline()` as `fixedWings`; `outline()` adds heights and the roof and never re-fits it"; "a quad that passes the near-rectangle test … takes the exact OBB roof; any other quad takes the validated skeleton"; "Every footprint is stored as **wings** (VIS-10) of three kinds"; §4.7 S11 row: "stored as one `quad` wing … handed to `outline()` as fixed input"; §13.2 curved-street contract test. | — (wording defect in the quad's ring comment: VP2-5) |
| NF-P3 | ACCEPTED | §4.1: "S12b is held to the same rule as the others: a district plants avenue and street-tree rows only in its own half-corridor strips, and an edge orchard in the hinterland is a hinterland allocation row built by the hinterland unit, never by the district"; §4.5 S7b (4): "an **orchard** becomes a row of the **hinterland's** allocation, `{ cls: 'orchard', areaM2, near: district }` … No district stage ever writes a hinterland face"; §4.9 avenue row: "a boundary way gets a row on each side whose district's rule fires — both, one or neither"; §2.7 `Greenery.along`; §4.1 digest test "**S12b named explicitly**". | — |
| NF-P4 | ACCEPTED | §4.2 S3 (10): a castle moat "with **one deck at the castle gate**"; a city moat "with **one deck at every main gate**, where the gate's route crosses the channel"; (2) canals "each carrying crossing decks at the spacing row `canalDeckSpacingM`"; §4.3: "S4 re-solves only that stretch … through the gate's deck"; §4.4 "*Outer moats (NF-P4).* … an L1 batch places a deck's two bank vertices on every way the channel's line crosses"; §2.7 `Bridge.over: 'river'|'moat'|'castle_moat'|'canal'|'carve'`. The scenario (gates cut off by a moat, castle street and canal crossings) is defeated. | — (a non-gate S3 route crossing the moat — the harbour road — is VP2-2) |
| NF-P5 | ACCEPTED | §4.8: "S7's L1 batch cuts two **wall strips** off the L1 faces beside the trace … S8 never cuts a strip and its lanes end on the strip's boundary (§4.6); after S9, S10's eager shared-edge step (0) … builds inside each strip block the L3 half-band"; §4.6: "**The wall is a barrier (NF-P5).** … no cut is ever planned through a wall's band or setback … Test: on every walled B-CITY seed, 0 lanes cross a wall strip and 0 L3 band faces are cleared or split by an L1 batch"; §4.7 S10 (0); integration C-3 runs step (0) eagerly before the pool's freeze (§3.3 step 3). | — (the §5.3 invariant row that polices this needs an edit exemption: VP2-4; S7b claims may land in a strip: VP2-3) |
| NF-P6 | ACCEPTED | §4.6 step 7: "S8 records it as a `baseLane` portal, with its `SeamAmendment`, in the shared `Seam` record … A planned end inside the **portal gap** … slides along the spine out of the gap … When a re-derivation removes a lane, its end vertex loses its `portal` role and is dissolved"; "A district's **effective scope** therefore includes …"; II.1 `Seam` (one per boundary run, both districts read it) and rule (6); II.4 "except the **seam exception** of §4.6 … The locality oracle computes this set from the batches' commit records"; §7.3 item 1 states the same set; II.5 M1 acceptance (every `baseLane` portal matches one lane end; New random on 20 districts per city changes nothing outside the seam exception); §5.3 row "every `baseLane` portal matches one S8 lane end". Dissolution is limited to `split`-flagged vertices (§2.2 rule 3; C-5), and a T-junction vertex made by `splitThrough` carries that flag. | — |
| NF-P7 | ACCEPTED | §4.1 per-stage batch table (S1 … S12b, edits); "L1 is therefore written by S3, S4, S5, S6, S7, S7b and S8, in that order, and by no generation stage after S9"; S12a row "none — siting decisions only"; the stray "separate L1 transaction" clause is gone (grep: 0 hits); §4.2 S3 (10) carves the decoration ponds "before any way", "at least 30 m from every (5) route and planned canal". | — |
| NF-P8 | ACCEPTED | §4.1: "S12a (siting, no geometry) … The **hinterland unit** … runs **on the generation worker while the pool workers run the districts**, on its own overlay over the same frozen arena. Its faces are the hinterland's L2 blocks, disjoint from every district's … from the freeze to the merge no other writer touches the arena"; §4.9 S12a "eager, no geometry; after S7b, before S8"; §12.4 rows S12a 1 ms (eager) and the unit "(≈ 15 ms, hidden by the pool)"; J-P27. | — |
| NF-P9 | ACCEPTED | §4.5: "The **quarters** are the tree's cut at `min(N_q, L)` nodes — the state after `L − min(N_q, L)` merges … so the cut is every district on its own when `N_q ≥ L`"; "N_q = 9–10 at TOWN"; §9.4 bar now "min(N_q, number of districts)" (the old `min(12, …)` bar withdrawn). Receipt re-read: the matched-size cuts 8 / 13 / 17 against MFCG's 9 / 12 / 18 are in `fixall_pipeline_r2_quarters.out`. | — (receipt and three comments disagree with the chosen rule: VP2-7) |
| NF-P10 | ACCEPTED | §4.2 S3 (1): "Nuclei are sited at least the **separation floor** apart: `sep_ij = τ(a₁) · (R_i + R_j) + (outer setback + glacis)_i + (outer setback + glacis)_j + g`"; (6) "a polycentric town's T is partitioned by nearest source … the later-scored nucleus is re-sited to its next candidate (≤ 3 attempts); if they still come too close, the two are merged — one enceinte around their union and a **cross wall** … and the merge is reported"; one main plaza (2) and `N₁` (4) per nucleus; (5) "a polycentric pair gate to gate". Receipt re-read: tip factors 1.13–1.18 (a = 1.3) and 1.24–1.34 (a = 1.8) lie under the table's τ 1.2 / 1.4. | — |
| NF-P13 | ACCEPTED | §4.5 S7b (5): "When the island toggle is on, S7b creates each sky pseudo-district's `Allocation` itself — first, before (1), and before any island exists … These allocations are S7b outputs; `SkyStrategy`, registered after S7b by declared I/O, takes them as inputs and sizes and places each island to hold its allocation"; II.6 `SkyStrategy.place(doc, rules, allocations: Allocation[] …)`. The islands are owner-staged; the base-side hook is concrete. | — |
| NF-P14 | ACCEPTED | §4.11 "**`carve` … and its way rule (NF-P14).**": "**kept with a pinned deck** — every `through` and `primary` way, and any other way that is the only connection …"; "**cut** — every other `secondary`, `lane` … the stretch inside the channel's bank setback is removed and a remainder that now dangles shorter than one block depth is pruned"; quays and piers at ≥ 30°; events with cause `convert:carve`; the declared batch order (1)–(4). The finding's gap (no way rule) is closed. | — (the carve's footprint now contradicts §3.3's clear region: VP2-1) |
| NF-D8 | ACCEPTED | §10.4 `rosterPatch?: { table: RosterTableId; baseVersion: string; ops: RowOp[] }[]`; "**A pack's roster patch is keyed row operations, never a positional patch (LC-22, NF-D8):** … each `set` carrying the hash of the base row it was written against (`baseRowHash`) … the operation is an **orphan**: kept in the pack layer, not applied, and reported … an `insert` whose key already exists is an orphan too." | — |
| NF-D9 | ACCEPTED | §2.5 `Allocation { id; level; target; rows; lifecycle }   // … stores no stream key (§2.4)`; "S7b's town-wide run draws from the town's `alloc.district` stream and S10a's per-district runs from each district's `alloc.block` stream, both derived from lineage on demand"; §4.5 S7b (1) and §4.7 S10a say the same. | — |
| NF-D16 | ACCEPTED | §4.1: "**The model digest (LC-2).** The model digest covers the eager model … NF-D16: the document digest is the separate hash over the canonical bytes". | — |
| COV-VG-VN-029 | ACCEPTED | PART III item 5: "VG's spotlight vignette and grass-tuft look as `painterly` programs — the hillshade, contour and hachure marks are already the base's relief tier (§8.2), built at M2b (§16), so the village adds none of them"; reuse list: "the base's relief tier (hillshade, contour and hachure marks, §8.2)"; "**What the base does not pay for:** … VG's spotlight and painterly look". Consistent with §8.2's relief tier, §15.1's VG R1–R17 row and §15.2's O12 extras row — the §15 / §16 / PART III contradiction the audit named is gone. | — |
| N-20 | ACCEPTED | §4.1: "the tile worker rasters tiles from the display list and the main thread composites the transferred tiles (§8.9 — nothing model-sized reaches the main thread; N-20)"; no other "main thread" rendering wording in §4 (grep). | — |
| N-21 | ACCEPTED (dup of NF-P9) | §4.5's `min(N_q, L)` cut: at ≈ 440 buildings N_q = 7 against 5–6 districts, so the cut is every district and the merge count is never negative. | — |

## 3. Re-check of earlier FIXED items whose sections changed this round

Round 2 replaced every pipeline section this area owns (§2.5–§2.7, §4.1–§4.9, §4.11, §4.12, §10.4, II.1, II.4–II.6,
PART III; integration edited §4.10 and §10.3). The 128 items this area accepted in round 1 (115 FIXED, 13 STAGED-BY-OWNER,
`r1-verify-pipeline.md` §2) were re-checked by re-finding each quoted mechanism. **110 of 128 quotes survive verbatim.**
The other 18 were re-read by hand; **every one still holds**, reworded or strengthened by a round-2 fix:

| id | where the mechanism stands now | still holds |
|---|---|---|
| GEO-18 | §4.4 trace "fixed **before the stage's secondaries grow** — for stage 1 by S3 (§4.2 S3 (9)), for k ≥ 2 right after S5b" | yes |
| GEO-19 | §4.2 S3 (10) "Carved into L0 here, before S4, and seen as water by every later stage"; §4.8 "A carve requested later by an edit goes through the conversion path of §4.11" | yes |
| GEO-21 | §4.6 step 7 unchanged in substance (quote differs only in markup) | yes |
| GEO-26 | §4.7 S11 row "footprint = plot ∩ the frontage band of the row depth (a boolean intersection, GEO-26)"; §4.1 table "S11, per block | L4" | yes (NF-P2 stores it as a quad) |
| GEO-30 | II.1 rule (3): recorded "in the shared `Seam` record that both districts' contracts read; the neighbour re-derives only its corridor half-strip and junction wedge at that vertex", plus promotion of the neighbour's plot-line end | yes (strengthened) |
| GEO-38 | §4.8 / §2.2 rule 1: per-side L3 half-bands by `bandUnion`, now inside the L1 wall strips by S10 (0); §4.11 `wallToWay` clearance unchanged | yes (by NF-P5's order) |
| LC-12 | §4.11 Survivors: "Regenerate (keep settings)" on an untouched block reproduces it byte for byte | yes |
| VIS-10 | §2.6 "Every footprint is stored as **wings** (VIS-10) of three kinds"; the roof construction a style parameter over the stored wings | yes (NF-P2's intended change) |
| MFP-3 | §4.2 S3 (11) "enter L1 as barrier faces carrying the `reserved` role: no way crosses them"; §4.4 "welded through its two weld vertices"; §4.8 in-place compactness repair, ≥ 99 % | yes |
| FTG-1 | §4.1 digest test "50 METROPOLIS seeds … in three random district orders and with pool sizes 0–3" | yes |
| FTG-7 | §4.9 S12a "after S7b, before S8" (so before S10b); outside classes placed by the hinterland unit's S10b; one farm table | yes |
| FTG-10 | §2.7 "locked in" on manual edit, never on view; §10.3 the diffed "re-derive people" action | yes |
| COV-MFCG-E04 | §4.2 S3 (4) each pick's bearing: "the least-cost outward direction from the pick to the frame" | yes |
| COV-FTG-C01 | §10.3 `AncestryRow { id, lifeStages, maxAge, heightCmBand, nameGrammar, appearanceTemplates }` | yes |
| COV-FTG-G07 | §4.8 the intervallum is an era row (`lane` at CITY / METROPOLIS in the high-medieval preset, `none` at TOWN), bounding the inner strip | yes |
| COV-FTG-H07 | §4.2 S1 (8) the shore setback "is read by S10 and the hinterland unit"; §4.9 "Fields keep the shore setback" | yes |
| COV-FTG-I03 | §4.9 "the hinterland unit's S10 then divides the outside land into exactly that many lots by a weighted Voronoi" | yes |
| DEF-10 | §10.4 packs "recorded in the recipe by id, version and content hash", non-shipped content copied into the `packs` block | yes (strengthened by NF-D2) |

The 13 STAGED-BY-OWNER items keep their hooks (stage 2: `Seam` / `SeamContract`, `FabricStrategy`; stage 3:
`BuildingGenerator.outline` / `compose`, `fixedWings`; islands and sewers: `SkyIsland`, `Tunnel`, `IslandRule`,
`SkyStrategy`, `SewerStrategy`; evolution: `EpochInputs`, `EvolutionStrategy`, the `ConversionOp` kinds; village:
PART III items 1–5). None regressed to deferral wording.

## 4. New findings

One major, nine minor. Each names the owning area. "Introduced" says whether round 2 created the defect.

| id | sev. | owner | the defect and its failure scenario | required change |
|---|---|---|---|---|
| VP2-1 | major | pipeline (with kernel §3.3, determinism §7.3, scope §13.1 / §16) | **A carve's footprint contradicts its clear region** (introduced: integration C-4 adopted clear regions without reconciling §4.11). §3.3 defines a carve's clear region as "its new chains ⊕ (`attractCm` + … its bank setback)", says "every finer face outside it is kept content" and "The re-derivation that follows runs only on the finer faces the clear removed … so a carve costs its clear region"; §7.3's carve row keeps "every way and every finer face outside the channel ⊕ its bank setback"; §13.1 and §16 M3a require "every face outside the clear region byte-identical". But §4.11's own batches reach beyond that buffer: (1) "clears the finer content of the L1 cells the channel ⊕ setback meets" (whole cells); a cut way's "remainder that now dangles shorter than one block depth is pruned" (an L1 stretch up to a block depth outside the buffer, whose corridor and fronting plots then have no spine); a kept arterial "is re-routed by §7.3's S4 local operator between its nearest junctions on either side"; access is restored by "the local S5 operator … inside the affected L1 cells" or an F-PLOT alley. Scenario: a canal drawn across a CITY district that cuts one lane — the stub prune removes an L1 lane outside the buffer whose corridor faces and plots are "kept", giving `E_KEPT` or orphan corridor faces in the dry run, and the byte-identity fixture fails by construction; §3.3's pre-decided fallback then makes every such carve "a declared town-wide re-derivation". | Give the carve one footprint used everywhere: its clear region is channel ⊕ (`attractCm` + bank setback) **united with every L1 cell the way rule touches** — the cells the channel ⊕ setback meets, the cells a cut stub is pruned from, the cells a kept way is re-routed through, and the cells whose plots take a re-routed lane or an F-PLOT alley; §4.11 batch (1) declares that region (`KernelTx.clearRegion`) and (4) re-derives exactly it. Restate §3.3's paragraph, §7.3's carve row ("kept: every way and every finer face outside the clear region") and the §13.1 / §16 fixtures ("every face outside that region byte-identical") to the same set. Apply the same union to S1's water operator's re-carved reach (§7.3 (b), determinism). |
| VP2-2 | minor | pipeline | **The harbour road is not a gate route** (partly introduced: round 2 moved the harbour route into S3 (5), before the wall exists, and gave moat decks only to gate routes). §4.2 S3 (5) solves "the harbour ↔ plaza route … here too", but (7) makes gates only from the picks' routes, §4.4 pins stage-1 gates only at "S3's gates, the first crossings of its solved gate routes", (10) puts moat decks only "at every main gate", and §4.3's moat re-solve goes "through the gate's deck". Scenario: a walled coastal town whose harbour candidate lies beyond the stage-1 boundary — the harbour road crosses the first wall with no gate (F-WALL: "a non-gate way reaches the trace"; its last rung cuts the road at the setback band) and, with `moat: 'inner'`, crosses the moat with no deck (F-ROUTE marks the harbour `unserved`). Also §4.4's "S4's remaining routes run inside stage 1" is untrue for §4.3's decks outside the boundary, which "connect … through the nearest gate". | Solve the harbour route in S3 **after** (7) when the harbour lies outside `{T ≤ t_1}`: from the plaza along the inward street of the gate nearest the harbour, then outward to the harbour with the wall penalty, so it leaves through a gate and crosses a moat on that gate's deck (a harbour inside the boundary keeps today's route). Add the case to the §5.3 gate-count invariant's fixtures. Reword §4.4 to "S4's remaining routes are not in `T`'s road set". |
| VP2-3 | minor | pipeline | **S7b's claims can land in a wall strip** (introduced: the strips are new L1 faces cut at S7, which runs before S7b). §4.5 S7b (3) cuts claims "out of the district's coarse faces with `claimSubFace` at the best siting score inside the district" — the strip faces are the district's coarse faces ("the strip faces inherit their district"), and nothing excludes them, while §4.6 excludes them from S8 and §4.7 from plots. Scenario: a park or institution sited against the wall takes part of the inner strip; S10 (0) builds band and setback parts in a strip block that is also a reservation, and the institution's footprints break "footprints ∩ (band ⊕ setback) = ∅". | S7b (3): claim candidates exclude every `wall_strip` face (as S8 does); only S7's own gate-plaza claims use a strip's setback zone. |
| VP2-4 | minor | determinism (§5.3), with pipeline §4.11 / §7.3 | **The wall-strip invariant forbids what two edits must do** (introduced with NF-P5's row). §5.3: "no L3 band, setback, glacis, tower or gatehouse face is cleared or split by an L1 or L2 batch (NF-P5) | batch-local". By design S7's edit operator "re-cut[s] the wall strips' setback and glacis lines … and re-derive[s] the strip blocks' S10 step (0)" (§7.3), and `wallToWay` clears the band, tower and gatehouse faces "with the rest of their finer content" (§4.11). Scenario: every `drawWall` edit and every wall → ring-road conversion fails the batch-local invariant. | Scope the row: it applies to generation batches and to every edit batch except an S7 operator or conversion whose declared re-derivation includes that enceinte's S10 (0). |
| VP2-5 | minor | pipeline | **A quad's party-wall sides are not always straight** (introduced by NF-P2's schema comment). §2.6: "ring sides 1 and 3 are the two straight party-wall sides". But §4.7 S10 (4) makes plot side lines "bent lot cuts perpendicular to the frontage arriving at the region's rear line", so when the rear line is not parallel to the frontage and the bend falls inside the row depth, the clipped footprint's party-wall side carries that bend. An implementer asserting straightness rejects valid rows; "the midpoints of the two party-wall sides" is then undefined for a two-segment side. | "Sides 1 and 3 are the party-wall chains (straight, or with the lot cut's one bend); the ridge joins their arc-length midpoints." The near-rectangle test already routes bent quads to the skeleton. |
| VP2-6 | minor | pipeline (with kernel §3.3) | **Two widths for the margin band** (introduced at integration C-7). §3.3 step 3: "`bandUnion` of half-width 2 m (a table value ≥ the residue class's minimum width) split by the edge into one unbuildable L3 part per side" — 2 m per side. §4.7 S10 (0): "a 2 m band (a table value) split by the edge into one unbuildable L3 part per side"; §4.5 "a 2 m margin band"; §4.1 "the 2 m margin band" — 1 m per side. The residue-width floor then holds under one reading and not the other. | One number everywhere, the kernel's: "half-width 2 m (2 m on each side; a table value ≥ the residue class's minimum width)" in §4.1, §4.5 and §4.7. |
| VP2-7 | minor | pipeline (with rendering §9.1, §9.4) | **Stale quarter-count wording and a receipt that prints the rejected rule** (introduced by NF-P9's fix). §2.5's comment still says "the N_q nodes of its city cut", §9.1 "one of the N_q quarters", §9.4 "the N_q nodes of §4.5's count law" — the cut has `min(N_q, L)` nodes. `fixall_pipeline_r2_quarters.py` is headed "Proposed: N_d* = max(N_d, N_q)" and its ladder column "cut new" prints `min(N_q, N_d*)` — the floored variant J-P28 rejects — so it prints 7 at 1 500 inhabitants, while §4.5 cites the same file for "from 5 (1 500 inhabitants) to 11". The chosen rule does give 5 (min(7, 5)), but no executed output shows it. | Replace "N_q" by "`min(N_q, L)`" in the three comments; re-run the script with the ladder column computing `min(N_q, N_d)` and its header naming J-P28's rule, so the cited receipt prints the cited numbers. |
| VP2-8 | minor | pipeline | **§2.6 calls the shadow pass a later stage; §8.4 builds it** (not introduced; the sentence predates round 2). §2.6: "The shadow pass itself is the owner's later SHADOW stage". §8.4 specifies `ShadowPass(layer, sun)`, "OFF by default (owner: shadows optional)", with an M2b measurement and fallback, and §16 M2b times it. The sentence is deferral wording for a subject outside the owner-staged list, and it contradicts the design. | "The shadow pass is §8.4's (optional, off by default, timed at M2b); the base populates every height and keeps the display list's shadow hook." |
| VP2-9 | minor | kernel (§2.2) | **§2.2's district-boundary list omits reservation boundaries** (introduced at integration C-6). Rule 1: district boundaries are "always L1 edges (a spine, a wall line, a shore or the perimeter)"; §3.3 step 3 and §4.7 S10 (0) band "any reservation boundary two districts share", and the grower's `validateEdge` admits a reservation boundary when "the seed kind allows it". | Rule 1: "(a spine, a wall line, a reservation boundary, a shore or the perimeter)". The chunk argument of §2.9 needs only "an L1 edge" and is unaffected. |
| VP2-10 | minor | pipeline | **A castle moat ring crosses the city wall of an `on_enceinte` castle** (not introduced; round 2's explicit S3 order exposes it). §4.2 S3 (10): "a **castle moat** (a ring band around the bailey …)"; an `on_enceinte` bailey carries the city trace through its two weld vertices (S3 (8), (9)), so the trace arrives at each weld from outside the bailey and must cross the ring band, against §4.4 "the trace never crosses water except at a **water gate** where a river passes". Scenario: `castle: 'on_enceinte'` with water in reach — F-WALL fires, or the moat is dropped silently. | For an `on_enceinte` castle, carve the castle moat only along the bailey's arc outside the trace, between the weld vertices (joining the city moat where there is one); the town-side arc gets a dry ditch (a `glacis`-typed band) or nothing, by the castle template row. |

## 5. Deferral-language scan

Every pipeline section (§2.5–§2.7, §4, §10, PART II, PART III; 2 143 lines) was grepped for TBD, "to be decided / defined",
defer, postpone, later, "at M0", "open question", "left open", future, eventually, "not yet", "for now", TODO and "out of
scope" (pending-review banners excluded). Every hit is sequence wording ("each later stage", "a lane a user adds later")
or an owner-staged subject with concrete hooks (sewers, the evolution engine, the village product, "setting packs later"
— the owner's adopted default D-6, the pack format and loading hook built now) — except §2.6's "the owner's later SHADOW
stage", which is VP2-8. No TBD, no "at M0" promise, no open item.

## 6. CONFIRMED versus PLAUSIBLE; what a Fable reviewer should re-check first

**CONFIRMED (executed here):** 110 of the 128 round-1 quotes survive verbatim and the other 18 were re-found by hand;
§12.4's CITY rows sum to 251 ms; the level-set receipt holds the cited 76 m / −35 m and the tip factors under τ; the
quarters receipt holds 8 / 13 / 17 at the matched sizes and prints 7, not 5, at 1 500 inhabitants (VP2-7); the deferral
scan (§5). **PLAUSIBLE (reading only):** every verdict of §2 and every new finding of §4 — the design is unexecuted.

Re-check first: (1) **VP2-1** — whether any reading of §3.3 lets §4.11's stub prune and S4 re-route stay inside the
clear region (I found none); (2) **VP2-2** — whether the harbour is ever outside the stage-1 boundary on the B-CITY coast
configurations (the centre is scored toward the harbour candidate, so it is uncommon, not impossible);
(3) **NF-P6's portal gap** — whether sliding a planned end along the spine can push a lane's last leg outside its own
kerb.

## Fable review (2026-09-27) — B-fixall/verify-pipeline-r2

**Verdict: CONFIRMED.** Reviewed by Fable (lane fable-review/main/pipeline, `docs/fable-review/main/pipeline.md`) on the live design (`docs/ARCHITECTURE.md` sha256 1c23190f…, 13 026 lines). The 18 ACCEPTED hold; the 10 new findings were real and every one is fixed in the live text (VP2-1 → J-P34's footprint; VP2-2 → J-P35 with J-P45; VP2-3 → §4.5 S7b (3); VP2-5 → J-P39; VP2-6 one width; VP2-7 `min(N_q, L)` and the re-run receipt; VP2-8 the shadow sentence; VP2-10 → J-P36; VP2-4 and VP2-9 in their owners' sections). The portal-gap question is answered by the bounded slide (arrival within 85–95°, else the next ladder rung). No correction.
