# Fix-all round 4 — verification of the RENDERING area (lane fixall/verify-rendering-r4)
> PENDING FABLE REVIEW — Opus-produced (fixall/verify-rendering-r4), not yet checked by a Fable seat; queued in docs/FABLE-REVIEW-QUEUE.md.

Lane `fixall/verify-rendering-r4` · 2026-09-26 · verifier for §8 (rendering and style), §9 (labels and furniture), §11
(export and interop) and §12 (performance budgets) after integration round 4. Status: COMPLETE (2026-09-26).

## 0. In plain words

All seven things round 4 set out to fix in the drawing, labelling, export and speed sections are fixed in the text:
the first milestone now keeps several background workers wherever they really are faster than one, instead of
switching to the slower setup when they merely meet their own speed rule; a map tile can be drawn in slices, so the
compass, title, legend and ruler get their answers within one screen refresh; two labels the user pinned can no longer
land on top of each other (the later one is hidden and reported); the "no town more than a quarter slower than its
rule" check is decided by timing the suspect towns again, alone on the test machine, so one hiccup cannot fail it; two
per-building speed figures are corrected; a large print now waits behind the map you are looking at instead of holding
it up, and an edit made during the print cannot tear it; and the tree-pattern library is built when the product is
built and shipped as about 31 KB of data. Every number behind these was re-computed and agrees, and none of the earlier
fixes in these sections broke.

Checking the new text turned up six new small problems (all minor, all in this area): (1) the claim that scaled tree
patterns always keep trees at least one spacing apart is false where two different patterns meet — measured here, three
to five pairs of trees per 64-m seam come closer than that, some to an eighth of it; (2) the new print queue has no slot
for placing the print's labels; (3) tree positions written into GIS and 3-D exports use a rotation whose sine and cosine
may differ between browsers, although those files are promised byte-identical everywhere; (4) the pre-decided rescue
for a slow PNG export ("compress less hard") cannot be done in a browser, whose built-in compressor has no such setting
— measured here; (5) with the moving sun switched on in the lit style, roofs and tree crowns keep the old lighting on
some tiles and take the new one on others; (6) two owner-facing sentences read ambiguously. Items (3)–(5) were already
in the text before this round and only came to light while checking it.

## 1. Scope and method

* **Read in full:** `docs/ARCHITECTURE.md` §8 (l. 6319–7335), §9 (l. 7336–7615), §11 (l. 7809–8108) and §12
  (l. 8109–8617) as integrated in round 4 (10 723 lines); the round-4 integration log
  (`docs/validation/fix-all/r4-integration-log.md`); §R4 of `docs/ARCHITECTURE-VALIDATION.md` (the NR3 rows); the
  rendering draft's disposition and request tables (`r4-rendering.md` §1, §3); the item sources
  (`r3-verify-rendering.md` §4, NR3-1 – NR3-7) and that verification's §2–§3 evidence for the earlier FIXED items.
* **Read where my sections point or are pointed at** (each passage read in place): §2.7 `Bridge` and the bridges
  bullet (sites are not drawn or exported), §2.9 step 3 (load verification), §4.1's pool paragraph, §4.10's S14 sentence,
  §6.1's concern registry and decoration bullet, §6.5 (3) (the allowlist lint), §7.1's `EditBase.seq` and `moveLabel`,
  §13.2's cost-model and contract tests, §13.3's stamp-tile shift, §13.4's B-ZOOM pin fixture, §13.7's O19 (d) row,
  §13.8's three tiers, §14's render, labels and export interfaces, §16's M1 / M2a / M2b rows, D-11, D-18, J-10, J-P10,
  J-R17, J-R18, J-R38, J-R40 – J-R49. The kernel, pipeline, determinism and scope sections outside those passages were
  not re-read; their verifiers own them.
* **Executed (CONFIRMED):**
  * `node docs/validation/bench/fixall_rendering_r4_stamptiles.mjs` re-run: point counts (286 / 161 / 107 / 76 / 650),
    prefix spreads (1.46 / 1.61 / 1.59 / 1.66 / 1.67 × spacing) and asset sizes (30.8 KB / 61.4 KB) identical to the
    committed `.out`; timings within ≈ 10 % (e.g. 4-m ranking 2.24 against 1.82 ms, re-sum 60 against 53 ms, asset
    load 0.030 / 0.062 ms). Every NR3-7 figure in §8.10 and §12.7 (≈ 161 points, ≈ 1.6 × r₀, ≈ 53 against ≈ 1.8 ms,
    ≈ 19 ms per class, ≈ 31 KB, 0.03–0.06 ms) agrees.
  * `python3 docs/validation/bench/fixall_rendering_r3_budgets.py` re-run: output byte-identical to the committed
    `.out` (`diff` empty). Every NR3-1 / NR3-5 number re-derived by hand from the laws: 100 ÷ 1 333 = 75.0 µs,
    300 ÷ 5 200 = 57.7 → 58 µs, 800 ÷ 13 460 = 59.4 µs; the pooled CITY law at 4 500–6 000 buildings 265–340 ms and the
    single-worker law 351–454 ms (gap 86–114 ms, J-R44's "≈ 85–115 ms"); single-worker CITY knee 3 768 buildings
    (§12.9's "≈ 3 770"); §12.9's first-map comparisons 143 / 374 / 932 ms and ≈ 2.1 s re-computed from §12.5's laws;
    §12.8's canvas sums (112 + 15 ≤ 128, 43 + 15 ≤ 72, 67 + 15 > 72 → 47 + 15 = 62 MB) and the CITY line's
    itemisation (≈ 76 / ≈ 34 MB; ≈ 91 / ≈ 19 MB); §8.1's `LabelTable` row with the new 4-B `pinSeq` is 88 B ≤ 96 B;
    §8.9's queue shares (8 ms per 100 ms = 8 %; ≤ 2 export steps in 150 ms, ≤ 3 in 250 ms).
  * **New receipt** `docs/validation/bench/fixall_verify_rendering_r4_seams.mjs` (our own code; `.out` beside it):
    four stamp-tile variants built exactly as the round-4 cost model builds them, every ordered pair placed side by
    side — same-variant seams 0 pairs closer than r₀ (toroidal), different-variant seams 3.5–5.0 pairs per 64-m seam
    closer than r₀, 0.6–0.8 closer than r₀ / 2, closest 0.12–0.23 × r₀ (NR4-1).
  * A Node 24.12 check (scratch script): `CompressionStream.length` = 1; deflating the same 4 MB with no options,
    `{ level: 1 }` and `{ level: 9 }` gives 324 679 bytes each time — the option is ignored — while Node's `zlib` gives
    903 356 / 324 679 / 229 757 bytes at levels 1 / 6 / 9 (NR4-4).
  * A script extracted every quoted fragment of the earlier verifications' evidence (`r1-verify-rendering.md` §2,
    `r2-verify-rendering.md` §2–§3, `r3-verify-rendering.md` §2–§3: 502 fragments) and compared the pre-round-4 file
    (`ARCHITECTURE.pre-r4.md`, the integration seat's copy) with the integrated one: 24 fragments present before and
    absent now, each explained in §3. Every quote in this file was checked by script against the integrated file with
    line breaks folded: 0 missing, the only non-matching quoted strings being the pre-round-4 phrases §3 names as
    replaced.
  * A deferral scan over the four sections' line ranges (§5).
* **Verdict rule.** ACCEPTED only when the quoted sentence is a concrete mechanism that defeats the item's failure
  scenario; an assertion, promise or deferral counts as UNRESOLVED. A follow-on problem that does not reopen the item's
  own scenario is recorded as a new finding (§4) and cross-referenced, not held against the item.

## 2. Per-item verdicts — the 7 round-4 items

"—" in the last column means nothing further is required for the item itself.

| id | sev | verdict | quoted evidence (section) | required change |
|---|---|---|---|---|
| NR3-1 | minor | **ACCEPTED** | §12.3 *Which configuration is primary*: "The pool is primary at a size when (a) it passes the sweep rule above against the pooled law, (b) its p95 there is below the single worker's p95 on the same generations, and (c) the model digests are identical for pool sizes 0–3 on the 200 seeds"; pre-decided outcomes "(c) fails, or the single worker is faster at all three sizes of a rung** → the single-worker column becomes that rung's declared budget", "(b) fails at one or two sizes only** → each size range runs the configuration that was faster at the nearest measured size" and "only (a) fails** → the pooled law is re-declared at the measured p95 as a D-18 amendment (the fallback above), and the pool stays primary wherever (b) holds"; the scenario itself: "A pool that runs exactly at its law passes (a): the default CITY request lands at 265–340 ms (the law at 4 500–6 000 buildings), where the single worker's law gives 351–454 ms, so the rule keeps the faster configuration". Mirrored in §4.1's **Measurement**, §12.1's timing phase ("the pool comparison"), §12.9, §13.8's milestone row, §16 M1 / M2b, D-18, J-P10, J-R18, J-R44 (all read; consistent). The failure — a pool at its own law replaced by the slower single worker — is defeated. | — |
| NR3-2 | minor | **ACCEPTED** | §8.9 *Resumable rasters* and §14: "interface TileBackend { begin(tile: TileAddress, list: DisplayList, style: StyleSheet, opts: TileRasterOpts): RasterJob }", "step(deadlineMs: number): boolean;", `finish()`, `cancel()`, `spentMs`; the cut rule "a native call is never split … The overrun past the deadline is therefore at most one native call or one derived operation"; deltas applied between steps with compaction only while no job is live; "Slicing therefore changes when the calls run, never which calls run or in what order: a tile rastered whole and in 1-ms slices is pixel-identical (§8.3's census row)"; §8.3's sliced-raster census row (whole, 1-ms slices, and slices interleaved with another job, a query and a band answer: pixel-identical, identical call log); §13.2 contract test; §16 M1; J-R40. The synchronous `raster()` the finding named is gone from §8.9 and §14 (grep: 0 hits for `raster(tile`). | — (follow-on for the queue: NR4-2) |
| NR3-3 | minor | **ACCEPTED** | §9.2 *Pinned labels*: "the pins eligible at the stop — in their bands, with their own stop at this stop or a coarser one — are taken in the order of their `moveLabel` event's `seq`, then label id (`LabelTable.pinSeq`, §8.1)"; "A pin whose box meets an already fixed pin is not fixed at that stop"; it is "**hidden at that stop and reported** ("pinned label hidden: overlaps pin P at stop k")"; `moveLabel`'s refusal kept as the interactive guard because "the pin pass is the guarantee, because pins also come together without a `moveLabel`" (warp, rename, reroll, `setStyle` — the finding's three routes); the test "two pins 20 px apart brought together by a warp, and two brought together by a rename that lengthens the earlier pin's text" (also §13.4 B-ZOOM, §16 M1). §9.1 `PinnedPlacement` ("seq: number }", written by applying the `moveLabel` event, kept by a warp that carries the pin); §8.1 `pinSeq` column. Lifecycle checked: §7.1's `EditBase.seq` is "never reset; survives rebase", so the order is the same on replay, undo (the prior `pinned` with its own `seq` returns), a bridged client (seq assigned in the host's order) and a kept-snapshot rebase. | — |
| NR3-4 | minor | **ACCEPTED** | §12.3 *The max clause, judged on confirmed outliers*: the nightly run "**screens** the clause: it records every generation's ratio T_i ÷ L(B_i) with its pool size"; "each generation whose ratio exceeds 1.25 is **re-timed** three times in §12.1's timing phase — alone on the runner, at its recorded pool size, with the calibration before and after — and is a **confirmed outlier** when the median of its three re-timed ratios exceeds 1.25" (the 20 highest when more than 20 are flagged); "**Pre-decided fallback:** a confirmed outlier re-declares the max clause at the largest confirmed median ratio". §12.1 generalises it: "A timing taken while other suites share the runner — the nightly B-CITY set, which runs beside the invariant suite, B-FUZZ and B-EDIT (§13.8) — screens and never gates"; §13.2, §13.8's nightly timing phase (≤ 20 min, costed), D-18, J-R38, J-R49 agree. The failure (a contended stall fails the gate and the fallback loosens the promise on noise) is defeated. | — |
| NR3-5 | minor | **ACCEPTED** | §12.3 table "\| TOWN \| 76 / 100 ms \| 75 µs \|", "\| CITY \| 255 / 300 ms \| 58 µs \|" and "so its per-building column is 100 ÷ 1 333 = 75 µs, 300 ÷ 5 200 = 58 µs and 800 ÷ 13 460 = 59 µs (NR3-5)"; §12.9 and J-R17 "Chose a per-building cost of ≈ 58–75 µs at p95". Arithmetic re-derived; grep finds no remaining "74 µs", "57 µs" or "57–74". | — |
| NR3-6 | minor | **ACCEPTED** | §8.9 *The tile worker's queue*: four classes (queries; incoming deltas and band answers; the visible view; exports), "A class runs only while every higher class is empty, one step at a time"; "**No starvation:** an export that has waited 100 ms since its last step runs the next step ahead of class 3 (never ahead of classes 1 and 2)"; the export dialog shows progress and "waiting for the view". §11.1: raster formats "use a transient list too (NR3-6): the generation worker builds it the same way, for the export's band and frame", transferred with the request, so "The export therefore shows the model as it stood when it was requested, whatever is edited while its bands are rastered". §12.7: ≤ 20 s stated **with the view idle**, and "**Export beside the view (NR3-6):** B-CITY's browser run at M1 adds a scripted pan and zoom during an A2 300-dpi export of a CITY" (pass: every settle within §12.5, the export byte-identical to the idle-view one and to one with an edit made during it; fallback `step(4)`). §12.8 counts the export's list and ≈ 15 MB of canvases against the tier ceilings, with a rule where they do not fit. §4.10, §8.1 item 6, §14 `Exporter`, J-R46, J-R47 agree. The failure (newly exposed tiles waiting behind ≈ 20 s of export bands) is defeated. | — (follow-on: NR4-2, the export's label placement has no queue slot) |
| NR3-7 | minor | **ACCEPTED** | §8.10: "The tiles are built once, when the product is built, and shipped (below); nothing samples or ranks at run time"; the removal update stated ("every point still present then has the removed point's term subtracted from its energy, in point-index order — the **removal update**", ≈ 1.5 n², O(n²)); the asset "`plat/assets/stamptiles/stamptiles.bin` holds, per stamped class in registry order, its four tiles" (6 B per point, ≈ 31 KB), bundled into both workers and hash-checked at start with a pre-decided rebuild on mismatch; §12.7 "is loaded and hash-checked at worker start in ≤ 5 ms per worker per session" with a measurement at M1 and a fallback; §8.3's census row (loaded hashes; the script's rebuild byte-identical on five engines), §6.1's registry, §3.1, §13.3, §13.8, §14, §15.1, D-11, J-10, J-R42, J-R48 all say build time. The bench numbers re-ran (§1). The failure (an unbudgeted per-session build on the first district-band settle, in both workers) is defeated; the one-set-per-class scaling also removes the unbounded (class, spacing) library. | — (follow-on: NR4-1, the new minimum-distance claim fails at seams between different variants) |

## 3. Earlier FIXED items re-checked in sections changed this round

Round 4 replaced or edited §8.1, §8.2 (pipeline X-R1: the wall-symbol overhang now "over the berm, the moat or the
glacis"), §8.3, §8.6 (pipeline X-R2: rect wings' corners, warp de-rectangled rects become quads), §8.9, §8.10, §9.1,
§9.2, §9.6 (RR4-1: naming-input re-draws), §11.1, §11.3 (RR4-2: the owner's kept snapshot reaching every client),
§12's plain words (R-3), §12.1, §12.3, §12.4 (kernel X-R1: merge 13 ms, critical path 255 ms), §12.6 (RR4-3), §12.7,
§12.8 and §12.9 (unchanged: §8.4, §8.5, §8.7, §8.8, §9.3–§9.5, §11.2, §11.4, §11.5, §12.2, §12.5). Every earlier FIXED
item with its mechanism in a changed section was re-checked — the 8 round-3 items, the 27 round-2 items and the 60
round-1 ids that the round-3 verification carried. **None regressed.** The quote comparison (§1) found 24 fragments of
their recorded evidence that were present before this round and are absent now; every one is a deliberate replacement:

| id | still ACCEPTED? | what round 4 changed, and where the mechanism now reads |
|---|---|---|
| NR-1 | yes | the max-clause measurement text (5 fragments) was replaced by NR3-4's screen-and-confirm rule and the sweep pass by "the p95 of T_i ÷ L(B_i) over the size's generations ≤ 1.10" (the same rule, read per generation); the laws, the max clause, the declared miss and the D-18 fallbacks stand (§12.3). |
| NR-2 | yes | §12's plain words re-worded by scope R-3 (1 fragment): the numbers (≈ 4 500 / 17 700 / 59 000 people for p95; ≈ 3 400 / 13 600 / 46 000 for the max; ≈ 0.2 / 0.5 / 1.9 s) re-derived and correct; one phrase is imprecise (NR4-6). |
| NR-4 | yes | "A query goes ahead of queued raster work … cut after the draw call in progress" and "the slice limit" (3 fragments) replaced by NR3-2's resumable jobs and NR3-6's class 1: "A query is class 1: it runs at the next step boundary"; the fallback is now `step(4)`; the one-frame measurement stands (§8.9). |
| NR-5 | yes | "a raster-export request crosses to it and the encoded bytes come back" (1 fragment) replaced by the raster exports' transient list (NR3-6); SVG's transient list, thread and peak unchanged (§11.1, §12.8). |
| NR-6 | yes | the (class, spacing, tile index) construction, its key words and census row (7 fragments) replaced by NR3-7's (class, tile index) construction at the reference spacing, built by `plat/tools/stamptiles/` with the same constant key, `dmath`, integer centimetres and index-order ties; the census now hashes the loaded asset in both workers and rebuilds it byte-identical on five engines — NR-6's scenario (tiles differing between workers or engines) is still defeated. |
| VD2-6 | yes | only the capital letter moved ("The tile variant used by a stamp cell is `RH32('stamp.variant', key, salt, u, v) mod 4`"); the render key and every `RH32` use are unchanged (§8.1 item 5). |
| COV-NG-XB32 | yes | "on the same stamp tiles (NR-6)" now reads "on the same shipped stamp tiles (NR-6, NR3-7)"; the exporters still write position, species, crown diameter and leaf type per tree (§8.10, §11.1). |
| SCL-8 | yes | "four toroidal blue-noise tiles of 64 × 64 m, built once per session by Bridson sampling" replaced by the shipped asset; placement ≤ 1 µs and drawing ≤ 2 µs per instance unchanged, the asset load now budgeted (§8.10, §12.7). |
| N-28 | yes | the two pin sentences (2 fragments) were rewritten by NR3-3; the coarser-stop rule stands verbatim in substance ("At a **coarser** stop a pin's world box grows, so it is not fixed there … drawn when it meets no higher candidate, obstacle or fixed pin, and otherwise hidden"), and the own-stop placement is now the pin pass. |
| VIS-3 | yes | the §13.6 (3) sentence was re-worded by the scope draft ("the pair of each rung's first capture shows the extramural suburb at FTG's overview framing, both sides framed alike (VIS-3)"); §8.5's way selection unchanged. |
| NR-8, N-16, VD3-4 | yes | §12.6 now states open-to-editable ≤ T(B) and the edits' pool-size-0 path (RR4-3), consistent with §2.9 step 3; the law V and the reference mix unchanged; §11.3's roles and convergence gain the owner's kept snapshot for every client and an M3a test (RR4-2), consistent with §2.9 step 4. One sentence of §12.6 reads ambiguously (NR4-6). |
| VP2-10, VP2-5, VIS-10 | yes | §8.2's overhang now names "the berm, the moat or the glacis" (the dry `ditch` paragraph unchanged and consistent with `ditch` naming only the dry residue); §8.6's rect and quad roofs now read `BaseWing.corners` and §2.6's carry rule (both exist in §2.6, l. 1179–1185, 1298–1300). |
| N-9, SCL-3, VK3-6 | yes | §12.8's arena and copy figures (kernel X-R2) and the export canvases re-summed (§1); §12.4 re-sums to 255 ms; §12.3's p50 column matches. |

Other areas' round-4 text inside these sections (checked only for contradictions with §8, §9, §11, §12): C-4's "a
crossing `site` is not exported, §2.7" in §11.1's GeoJSON row agrees with §2.7's rule that a site is "not drawn, named,
labelled or exported", which also covers the glTF and CityJSON rows; §9.6's naming-input re-draws agree with §6.3 case
(4) and §10.4; §12.8's M2a load-verification case agrees with §2.9 step 3, §12.1 and §16's M2a row (C-3). No
contradiction found.

## 4. New findings introduced or exposed by the revision

None reopens an item of §2. Owner = the area whose section must change (other sections the change touches are named).
NR4-1, NR4-2 and NR4-6 are in text round 4 wrote; NR4-3, NR4-4 and NR4-5 were already in the text and came to light
while checking the rewritten sections (pre-existing, exposed).

| id | sev | owner | finding (with the failure scenario) | required change |
|---|---|---|---|---|
| NR4-1 | minor | rendering (§8.10, §8.3; scope for §13.7's O19 (d) reason) | **The stamp's minimum-distance claim fails where two different tile variants meet.** §8.10: "An entity whose spacing is r stamps them scaled by s = r ÷ r₀: blue noise scaled is blue noise at the scaled spacing, so the minimum distance is the entity's own spacing", while each stamp cell draws its variant independently ("The tile variant used by a stamp cell is `RH32('stamp.variant', key, salt, u, v) mod 4`"). A toroidal tile is seamless only against a copy of itself. Measured (`fixall_verify_rendering_r4_seams.out`, CONFIRMED): same-variant seams 0 pairs closer than r₀; different-variant seams 3.5–5.0 pairs per 64-m seam closer than r₀, 0.6–0.8 closer than r₀ / 2, the closest 0.12–0.23 × r₀. With three of every four neighbouring cells a different variant, a wood shows clumped or overlapping crowns along the straight seam lines of its rotated 48–96-m lattice (≈ 1 % of trees under half the spacing), where MFCG's and VG's single toroidal tile has no seams; §13.7's O19 (d) fallback reason ("the scaled tiles' minimum distance is the entity's own spacing") rests on the same false claim. | In §8.10, make the four variants of a class seam-compatible: they share one **border strip** — the points within r₀ of any tile edge, sampled once per class by the same Bridson construction restricted to that toroidal strip (its own constant key word) — and each variant fills only its interior (points farther than r₀ from every edge) by Bridson seeded with the strip, its tile index the creation index; ranks stay per variant. Then every pair closer than r₀ across a seam is a pair of strip points, which are identical in all variants and toroidally spaced, so the minimum distance holds across every seam and for every band's subset. Add to §8.3's stamp-tile census row: for all 16 ordered variant pairs, 0 cross-seam pairs closer than r₀ (the receipt's check), run by `plat/tools/stamptiles/` and in CI. The asset's size is unchanged; the construction change moves the stored hashes (nothing has shipped, so no shift record is needed before M1). §13.7's O19 (d) reason then holds as written. |
| NR4-2 | minor | rendering (§8.9, §11.1, §12.7) | **The raster export's label placement has no place in the tile worker's queue.** §11.1: "the tile worker runs S13b at the export stop over it with the export frame as the visible region"; §8.9's class 4 lists only "exports: the raster jobs of the current export band's tiles, then the band's composition, read-back (64 rows per step) and encoding (§8.8)". An implementer following the table has no rule for when that S13b runs or how long it may hold the worker; run whole on arrival (with the request's message) or as one class-4 unit, a large print's placement over every candidate in the frame — above §12.7's "≤ 2 ms per zoom stop for ≤ 2 000 visible candidates" at a finer band — is one unbounded unit, against §8.9's "a query waits for at most one step" and the settle bound it derives for exports. | In §8.9's class 4, name the export's S13b as its first unit, run as a resumable step: the greedy decides candidates one at a time in §9.2's strict order (pin pass first), reads the clock after each decided candidate and stops at the step's deadline with its memo kept, resuming at the next class-4 step; state the same candidate-granular slicing for the view's S13b in class 3. In §12.7 add the export placement's cost (≈ 1 µs per candidate, from the S13b budget) inside the PNG row's ≤ 20 s. |
| NR4-3 | minor | rendering (§8.10); determinism for §6.5 (3) | **Tree positions in the model-format exports are not engine-independent** (pre-existing, exposed). §8.10's function places each instance at "R_θ · (s · (6 400 · (u, v) + t + o))" (and rotates the `grid` lattice the same way), naming no `dmath` source for R_θ's cosine and sine, and §6.5 (3) keeps this code outside the allowlist lint ("the rest of `@plat/render` — paint programs, backends, compositing — stays outside"). The same function runs in the generation worker for the GeoJSON, glTF and CityJSON exporters and for the bench's tree statistics (§8.10 *Where it runs*), while §11.1 promises the GeoJSON file "byte-identical on every host". An engine whose `Math.cos` differs in the last bit moves a tree coordinate across a 7-decimal (≈ 1 cm) rounding boundary and the file differs between Chromium and Firefox for the same document. | In §8.10, compute R_θ from `dmath.cos` and `dmath.sin` of the row's integer `rotationCdeg`, and round every instance's world position to integer centimetres before the face test, the density test and any export; in §6.5 (3), add §8.10's instance function (the code the exporters and override resolution call) to the linted closure; in §13.3, the five-engine golden run compares the GeoJSON of one golden seed with trees, byte for byte. |
| NR4-4 | minor | rendering (§12.7, §8.8) | **The PNG export's pre-decided fallback cannot be applied in a browser** (pre-existing, exposed). §12.7: "a PNG time miss encodes the bands with zlib level 3 instead of 6 (the same pixels, a larger file)"; §8.8 encodes through "a zlib stream through the platform's `CompressionStream` in browsers and `zlib` in Node". `CompressionStream` takes a format and no options: in Node 24.12's implementation of the same standard a `{ level }` option is ignored — 324 679 bytes with none, level 1 or level 9, against Node `zlib`'s 903 356 / 324 679 / 229 757 at levels 1 / 6 / 9 (CONFIRMED; that browsers behave the same follows from the standard's one-argument constructor — PLAUSIBLE, not executed in a browser). A browser miss at M1 would have no working fallback. | State the fallback per host in §12.7: Node — zlib level 3; browsers — the row filter fixed to `Sub` for every row instead of the per-row filter choice (the filter pass is the JavaScript share of encoding; the deflate itself is native), the same pixels and a larger file; and state in §8.8 which row-filter rule is the default (per-row choice by the smallest sum of absolute values). |
| NR4-5 | minor | rendering (§8.2, §8.4, §8.8, §12.7) | **With a moving sun, roofs and crowns in the `lit` style are lit by whichever sun was current when their tile was drawn** (pre-existing, exposed). `lit` lights roof faces by `faceLight` from "one directional light from the sheet's sun", and "canopy shading is baked into the crown sprites once per session per light direction"; in `path` mode that sun moves (§8.4). But on a tier with shadow layers the `under` and `over` layers — roofs and trees are slots 13 and 16 — are not keyed by the sun (§8.8: only "the `shadow` layer — or … the `base` layer on a tier without shadow layers" carries it), "so a 1° step of the sun re-rasters only the shadow layers". After a few steps, a pan draws newly exposed `over` tiles with the new light beside cached ones with the old: a roof-tone and crown-shade seam at tile edges, and a tier without shadow layers draws different pixels for the same view. The crown library's session build and per-direction bake also have no time budget (§12.7 budgets instances only), the gap NR3-7 closed for the stamp tiles. | Pre-decide in §8.2 / §8.8: in `path` mode, `faceLight` and the crown bake read a **light step** — the path sun quantised to 15° of azimuth and 5° of altitude — and the `under` and `over` layers of a sheet whose programs read the light carry the light step in their tile key, so a 1° shadow step still re-rasters only the shadow layers and a light step re-rasters the visible tiles once, within §8.4's settle budget; crown sprites are baked per (style, light step) and cached (the last four). Add to §12.7 the crown library's build and bake (measured with the moving-sun runs at M2b, where `lit` ships), and pre-decide the fallback: in `path` mode `faceLight` and the crowns hold the sheet's fixed sun (only the shadows follow the path), reported. |
| NR4-6 | minor | rendering (§12's plain words, §12.6) | **Two sentences this round wrote read ambiguously.** (a) §12's plain words: the targets "are met for a typical run up to about 4 500, 17 700 and 59 000 people and for every single run up to about 3 400, 13 600 and 46 000", and the largest sizes take "up to about 0.2, 0.5 and 1.9 seconds in a typical run" — both are p95 figures, which hold for 19 runs in 20, not for a typical (median) run. (b) §12.6: "verified by a replay in a pool worker beside the edits, whose per-district stages run single-worker meanwhile (§2.9 step 3) (§2.9 steps 3–4; with pool size 0, in the generation worker, yielding to each edit at its next batch boundary)" — two parentheses in a row, the second read naturally as saying the replay runs in the generation worker too; §2.9 step 3 means the edits run single-worker in the generation worker, and the replay runs there only when the pool size is 0. | (a) Replace "for a typical run" by "for 19 runs in 20" in both places. (b) Rewrite as: "… verified by a replay in a pool worker beside the edits, while every edit made meanwhile runs its per-district stages single-worker in the generation worker (§2.9 step 3); with pool size 0 the replay itself runs in the generation worker and yields to each edit at its next batch boundary (§2.9 steps 3–4)." |

## 5. Deferral-language scan of §8, §9, §11, §12

Scanned l. 6319–7615 and l. 7809–8617 (banners excluded) for TBD, later, open, at M0, defer, postpone, to be decided,
eventual, future, TODO, for now, when needed, not yet, revisit, undecided, to be determined, left for, as needed, maybe,
perhaps: 22 hits, none a deferral — "open" as a shore class, open ground, open ends of a bridge casing, open gardens and
frontages, `open(bytes…)` and open-to-editable; "later" as ordinary sequence ("a later edit", "a later entity", "sorts
later re-draws", "later stages' boundaries", "later outcomes"); "leaving it deferred" inside a reason for building
CityJSON now (D-8). The milestone-bound wording ("PLAUSIBLE until M1", "the first M0 measurement", "the M0
site-and-fields spike") is each a named measurement with a pre-decided fallback in the same passage. No item in these
sections is left open.

## 6. Counts, CONFIRMED versus PLAUSIBLE, and what a Fable reviewer should re-check first

| measure | value |
|---|---|
| round-4 items judged | 7 (NR3-1 – NR3-7): 7 ACCEPTED, 0 UNRESOLVED |
| earlier FIXED items re-checked in changed sections | 8 round-3, 27 round-2 and 60 round-1 ids; 0 regressed; 24 evidence fragments replaced on purpose (§3) |
| new findings | 6, all minor, all owner rendering (NR4-1 also scope's §13.7 reason; NR4-3 also determinism's §6.5 (3)); 3 introduced by round-4 text (NR4-1, NR4-2, NR4-6), 3 pre-existing and exposed (NR4-3, NR4-4, NR4-5) |
| deferral wording in §8, §9, §11, §12 | 0 |
| receipts | 2 benches re-run (stamp tiles: counts and sizes identical; r3 budgets: byte-identical); 1 new receipt (`fixall_verify_rendering_r4_seams.mjs` / `.out`); 1 scratch check of `CompressionStream` in Node 24.12 |

**CONFIRMED (executed here):** the NR3-7 figures and the r3 budget laws (re-run); every NR3-1 / NR3-5 number and the
§12.8, §12.9 and §8.9 arithmetic (by hand, §1); the seam violation of NR4-1 (new receipt); `CompressionStream` ignoring
a level option in Node 24.12 (NR4-4); that every quote here is in the integrated file; the evidence comparison with the
pre-round-4 file. **PLAUSIBLE (reading only):** that the seven fixes defeat their scenarios once built (the M1 / M2b
measurements they carry decide it); NR4-2's claim that a large print's placement exceeds one step (its size depends on
the export band and frame); NR4-3's engine difference (not observed, but nothing in the text prevents it); browsers'
`CompressionStream` behaving as Node's; NR4-5's seams (read from the tile key, not rendered).

**What a Fable reviewer should re-check first.** (1) NR4-1 with its receipt: whether the shared border strip is the
right repair, or one larger toroidal tile per class (MFCG's and VG's way) should replace the per-cell variants. (2)
NR3-6 with NR4-2: whether every unit of work the tile worker does for an export (S13b, composition, read-back, encoding)
is now a bounded step, so the one-frame query answer and the settle bound hold during a print. (3) NR4-5: whether
`faceLight` and the crown bake are meant to follow a path-mode sun at all — the text never says, and the tile key
assumes they do not.
