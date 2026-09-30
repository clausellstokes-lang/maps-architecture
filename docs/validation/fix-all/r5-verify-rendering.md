# Fix-all round 5 — verification of the RENDERING area (lane fixall/verify-rendering-r5)
> PENDING FABLE REVIEW — Opus-produced (fixall/verify-rendering-r5), not yet checked by a Fable seat; queued in docs/FABLE-REVIEW-QUEUE.md.

Lane `fixall/verify-rendering-r5` · 2026-09-26 · verifier for §8 (rendering and style), §9 (labels and furniture), §11
(export and interop) and §12 (performance budgets) after integration round 5. Status: COMPLETE (2026-09-26).

## 0. In plain words

All six small things round 5 set out to fix in the drawing, labelling, export and speed sections are fixed in the text:
the four ready-made tree patterns of a wood now share one thin strip along their edges, so no two trees come too close
where two patterns meet (re-measured here: not one close pair in any arrangement); placing a large print's labels is
now done in tiny resumable pieces, so the screen keeps answering; tree positions in GIS and 3-D files are computed with
the product's own maths and rounded to whole centimetres, so every browser writes the same file; the rescue for a slow
PNG print now works in browsers too (re-measured here); with the moving sun, roofs and crowns change light in whole
steps that the whole view shares; and the two ambiguous speed sentences now say what they mean. None of the earlier
fixes in these sections broke.

Checking the new text turned up three new small problems (all minor, all in this area): (1) a print made while the
moving sun is animating is not told which sun, light step or look to use, so its strips could be drawn under different
lights, and the tree-crown pictures for its light may have been thrown away; (2) the declared input of the label placer
is the model's label record, which lacks three things the placer must read (the target's area, the parent quarter and
the revision), although the placer runs where only the drawing tables exist; (3) one percentage in the PNG section is
slightly overstated (6–9 %, not 7–10 %).

## 1. Scope and method

* **Read in full:** `docs/ARCHITECTURE.md` as integrated in round 5 (11 477 lines, md5
  `bac60dd7ecb828b0f7926a06efa36c74` — the integration log's value, so nothing has changed it since) at §8 (l. 6774–7886),
  §9 (l. 7887–8202), §11 (l. 8397–8703) and §12 (l. 8704–9251); the round-5 integration log
  (`docs/validation/fix-all/r5-integration-log.md`); §R5 of `docs/ARCHITECTURE-VALIDATION.md`; the rendering draft's
  §0–§1 (`r5-rendering.md`: disposition, refinements, folded requests); the item sources (`r4-verify-rendering.md` §4,
  NR4-1 – NR4-6).
* **Read in place, where my sections point or are pointed at:** the one-page summary (l. 26–105); §2.9 step 2's
  frozen-view label; §3.1's Poisson row; §6.1's concern registry (`render.stampTiles`, creation index 4); §6.5 (3)'s
  lint closure; §13.2's contract tests; §13.3's five-engine run; §13.7's O19 rows; §13.8's PR and nightly rows; §14's
  labels and render interfaces (`ObstacleSource`, `RoleIndex`, `LabelPlacer`, `PlacementJob`, `TileRasterOpts`,
  `TileBackend`, `RasterJob`, `Exporter`); §15.1's B19; §16's M1 / M2b / M3a rows and the effort paragraph; J-R42 and
  J-R50 – J-R54. The kernel, determinism, pipeline and scope sections outside those passages were not re-read; their
  verifiers own them.
* **Executed (CONFIRMED):**
  * The pre-integration copy kept by the integration seat (`r5i/ARCHITECTURE.pre-r5.md`, md5
    `2661eb6826ea537ddcd524941c003e14`, the log's value) compared section by section with the integrated file: 62
    headings changed or new, 15 of them in my sections (§8.2, §8.3, §8.4, §8.8, §8.9, §8.10, §9.2, §9.6, §11.1, §11.2,
    §11.3, the §12 opening, §12.6, §12.7, §12.8). Every one of the 15 was word-diffed against its round-4 text; the
    integration-only edits (§9.6's field slices, §11.2's `renames`, §11.3's frozen view and gated comparison, §12.8's
    records tree and home column) were read in the diff and agree with §2.9, §6.3 and §14 (`EditEngine.apply`'s
    `Confirm(token, fates, renames)`).
  * `node docs/validation/bench/fixall_rendering_r5_seamstrip.mjs` re-run: output identical to the committed `.out`
    except the build timings (medians 19.2 / 18.0 / 15.8 / 17.2 ms against 19.5 / 18.4 / 16.0 / 17.4) — every count,
    distance, density and asset figure the same (0 cross-cell pairs closer than r₀ for the chosen band; 16 672 for
    independent tiles; 158–167 points, median 162; band share 0.11–0.14; prefix spread 1.52–1.77 × r₀; largest empty
    circle 1.20 × r₀; ≈ 30.9 KB for 8 classes). Every NR4-1 figure in §8.10 agrees with it.
  * `node docs/validation/bench/fixall_rendering_r5_png.mjs flat | textured | relief` re-run: file sizes and row-filter
    counts identical to the committed `.out` for all three looks, times within ≈ 3 % (browser-path totals 3.43 / 10.24 /
    5.33 s adaptive, 0.60 / 4.32 / 1.23 s None; `CompressionStream.length` = 1; `{ level: 1 }` and `{ level: 9 }` give
    the no-option size). Every NR4-4 figure in §8.8 and §12.7 agrees, except one percentage (NR5-3).
  * The receipts §12.6 newly cites: `fixall_pipeline_r5_wingcost.out` (0.17 ms per pass + ≤ 0.23 ms for overlapping
    compositions = 0.40 ms; × 9 passes = 3.6 ms — §12.6's "≈ 0.4" and "≈ 3.6 ms") and `fixall_det_r4_loaddigest.out` +
    `fixall_det_r5_recordsdigest.out` (33.5 + 4.0 ms at CITY — §12.6's "≈ 35–38 ms").
  * A script extracted every quoted fragment of the four earlier rendering verifications' evidence rows
    (`r1`–`r4-verify-rendering.md`: 522 fragments) and looked for each in the pre-round-5 and the integrated file: 326
    present in both, 13 present before and absent now (each explained in §3), 182 already absent before round 5 (text
    replaced in earlier rounds, reconciled by those rounds' verifiers), 1 present only now.
  * Every quote in this file's tables was checked by script against the integrated file with line breaks folded (78
    pieces): 0 missing, the only non-matching strings being the pre-round-5 phrases §2 and §3 quote as replaced (9) and
    the wording NR5-3 proposes (1).
  * A deferral scan over my four sections' line ranges (§5).
* **Verdict rule.** ACCEPTED only when the quoted sentence is a concrete mechanism that defeats the item's failure
  scenario; an assertion, promise or deferral counts as UNRESOLVED. A follow-on problem that does not reopen the item's
  own scenario is a new finding (§4), cross-referenced, not held against the item.

## 2. Per-item verdicts — the 6 round-5 items

"—" in the last column means nothing further is required for the item itself; a follow-on problem that does not reopen
the item's own failure scenario is a new finding (§4), cross-referenced here and not held against the item.

| id | sev | verdict | quoted evidence (section) | required change |
|---|---|---|---|---|
| NR4-1 | minor | **ACCEPTED** | §8.10 *Tiles*: "The four tiles are **seam-compatible**: they share one **border band** — every point whose edge distance e = min(x, 6 400 − x, y, 6 400 − y) is below r₀ ÷ 2 — and differ only inside it"; the construction: "**The band (creation index 4):** a full toroidal tile is sampled as above and cut to its points with e < 200 cm, in their index order. **Each tile (creation index 0–3):** the band's points are pre-placed in that order — in the spacing grid and as the initial active list — and the sampling continues from them over the region e ≥ 200 cm: no first point is drawn, and a candidate with e < 200 cm is rejected like one too close"; the argument: "because a point outside the band lies at least r₀ ÷ 2 from its cell's edges — so two such points in different cells are at least r₀ apart — while a band point is present, at the same position, in the other point's own tile and was spaced against it there (toroidally — a distance never larger than the one across the seam)". §8.3's new row: "0 pairs of points in different cells closer than r₀ (an integer test on tile centimetres); `plat/tools/stamptiles/` refuses to write an asset that fails, and the PR tier re-runs the check on the loaded asset", over "all 256" 2 × 2 arrangements and every band's rank subset; §13.2, §13.8 PR row, §3.1's Poisson row, §6.1's registry (creation index 4), §15.1 B19, J-R42, J-R50 agree; §13.7's O19 (d) reason ("the scaled tiles' minimum distance is the entity's own spacing (§8.10)") now holds. I checked the argument case by case (two non-band points: ≥ r₀ across an edge, ≥ √2 r₀ across a corner; a band point with any point: the toroidal distance in the other point's tile is a minimum over lattice offsets, so it bounds the cross-seam distance from below) and re-ran the receipt (§1): 0 cross-cell pairs closer than r₀ for all ranks, rank < 0.6 and rank < 0.25 on five seed sets, against 16 672 for independent tiles. The two refinements of my required change (band width r₀ ÷ 2 instead of r₀; the band cut from a full tile instead of Bridson restricted to the strip) are measured and argued in the text and J-R50. | — |
| NR4-2 | minor | **ACCEPTED** | §8.9's class 4: "exports: first S13b at the export's stop over its transient list — a resumable placement job, stepped one unit at a time, its memo held by the job (§9.2, §11.1; NR4-2) —; then, band by band, the raster jobs of the band's tiles, the band's composition, read-back (64 rows per step) and encoding (§8.8)"; class 3: "S13b at the view's stop — a resumable placement job, stepped one unit at a time (§9.2; NR4-2)"; §8.9 *Placement is stepped like a raster*: "Its unit is one decision … and it reads the clock after every unit, so its overrun past the deadline is one unit"; §9.2 *Resumable placement*: "A **unit** is one of: the rung-(5) test of one `LabelTable` row …; one pin of the pin pass …; one step of the local evaluation, which runs on an explicit stack instead of recursion …; or the glyph layout of one placed label", "The stack and the memo persist between steps, so the job can stop after any unit", with `LabelPlacer.begin` returning a `PlacementJob` (`step`, `result`, `cancel`, `spentMs`), declared again in §14; §12.7's PNG row: "the export's placement in the tile worker (≈ 1 µs per candidate in the frame — ≤ 20 ms for 20 000 candidates … in class-4 steps, §8.9; NR4-2)"; §11.1 names it "the first work of the export's class in its queue"; §8.3's *sliced placement* row (whole against one unit per step, with a query, a raster step and a band answer between steps: identical placement digests), §13.2, §13.8 nightly, J-R51. The failure (a print's placement as one unbounded unit ahead of queries and the view) is defeated. | — (follow-on: NR5-2, the placer's declared input) |
| NR4-3 | minor | **ACCEPTED** | §8.10 *Stamp*: "R_θ's cosine and sine are `dmath.cos` and `dmath.sin` of `rotationCdeg` × (π ÷ 18 000), the factor a double literal", "each coordinate then rounded to whole centimetres (`Math.round`): that integer point is the instance's **world position**, the one position the face test, the density test, drawing, override resolution and every export read", and "this whole function — the stamp, grid and line layouts, the per-instance look draws below and the density test, with everything they call — is held to §6.5 (3)'s allowlist lint"; *Grid and line*: "rounded to whole centimetres like a stamp's point"; §6.5 (3): "and §8.10's instance function with every function it calls — the stamp, grid and line layouts, the per-instance look draws and the density edge test — which the model-format exporters and override resolution run in the generation worker and whose positions §13.3 compares byte for byte across engines (NR4-3)"; §13.3: "from M3a (the GeoJSON exporter's milestone), the strict GeoJSON of one golden CITY seed (`coast+river`) with its trees … byte-identical on every engine, workers on and off"; §11.1's GeoJSON row, §13.8 nightly, §16 M3a (GeoJSON is an M3a deliverable, checked), J-R52. The failure (an engine's `Math.cos` moving a tree across the 7-decimal rounding) is defeated: the lint forbids the engine's transcendentals in the whole function, and the positions are integers before any export. | — |
| NR4-4 | minor | **ACCEPTED** | §8.8: "each row filtered by the **per-row rule** (of PNG's five filter types, the one whose filtered bytes have the smallest sum of absolute values, each byte read as a signed value; NR4-4), then one zlib stream through the platform's `CompressionStream` in browsers and `zlib` at level 6 in Node"; §12.7: "a PNG time miss is answered per host, the same pixels in a larger file each time (NR4-4): **on every host** the row filter is fixed to type None for every row instead of §8.8's per-row rule …; **in Node**, whose `zlib` takes a level, a miss that remains deflates at level 3 instead of 6 …; **in browsers**, whose `CompressionStream` takes a format and no options … a miss that remains after the filter change re-declares the PNG budget at the measured p95 as a D-18 amendment for the owner's veto"; J-R53. The browser path now has a working first fallback (the filter pass is JavaScript on every host), then the D-18 re-declaration §12 uses for every measured miss. The refinement (None instead of my Sub) is measured: re-run here, the receipt's sizes are identical and its times within ≈ 3 % (§1): filter pass 2.7–3.4 s of 3.5–10.5 s; None 0.6 / 1.3 / 4.4 s. | — (a percentage in the reason is slightly overstated: NR5-3) |
| NR4-5 | minor | **ACCEPTED** | §8.4 *Sun*: "every other program that reads the sun — `faceLight`, the two-tone `roof`, `hillshade` and the `lit` crown bake (§8.2, §8.10) — reads its **light step**, the path-mode sun quantised to 15° of azimuth and 5° of altitude (NR4-5)"; *Light steps*: "A light pass is never cancelled by a newer light step: the newest step waits and starts its own pass when the running one completes", "Every raster of the view uses its **drawn light step** — the running pass's step, or the last completed pass's — so a tile newly exposed during a pass is rastered at the pass's step. Once a pass completes, no tile of the view keeps another light step, and a tier with shadow layers and a tier without draw the same roof and crown tones for the same view"; §8.8's tile key: "and for the `under` and `over` layers — or the `base` layer on a tier without shadow layers — of a sheet whose programs at the band read the light (`faceLight`, the two-tone `roof`, `hillshade`, `lit` crowns), the light step (§8.4; NR4-5)"; §8.10 and §8.2: crowns baked "per (style, light step)"; §12.7: "≤ 20 ms of tile-worker time per (style, light step)", measured at M2b with the fixed-sun fallback; §8.3's *light steps* row (both tiers, after the stop: every cached tile carries the final light step, the tiers equal outside shadow pixels, pixel-identical to a fresh render); §8.9 class 3; §16 M2b; J-R54. The failure (roof-tone and crown-shade seams at tile edges, and tiers drawing different pixels) is defeated for the view. | — (follow-on: NR5-1, the light step of an export and of the tile backend's options) |
| NR4-6 | minor | **ACCEPTED** | §12 *In plain words*: "are met for 19 runs in 20 up to about 4 500, 17 700 and 59 000 people and for every single run up to about 3 400, 13 600 and 46 000, and the largest towns, cities and metropolises take up to about 0.2, 0.5 and 1.9 seconds in 19 runs in 20"; §12.6: "verified by a replay in a pool worker beside the edits, while every edit made meanwhile runs its per-district stages single-worker in the generation worker (§2.9 step 3); with pool size 0 the replay itself runs in the generation worker and yields to each edit at its next batch boundary (§2.9 steps 3–4)" — word for word the required rewrite; the one-page summary carries "19 runs in 20" twice. grep: 0 hits for "for a typical run" in the document (the one remaining "a typical run" is §3.3's "after a typical run of edits", an ordinary phrase about edit sequences). | — |

## 3. Re-check of earlier FIXED items whose sections changed this round

**The 13 fragments present before round 5 and absent now**, each checked in the integrated text:

| earlier evidence (verification) | what replaced it | the item still holds? |
|---|---|---|
| r1: "a domain-warped density evaluated once per point in world metres" (O19's ragged edge) | §8.10 *Stamp*: "passes the edge test of a domain-warped density evaluated once per point at its world position in metres" (NR4-3's integer world position) | yes — same test, now at the rounded position |
| r2: `confirm(h, token, fates)` … "the fates equal the dry run's list" (NF-D14) | §11.2: "`confirm(h, token, fates, renames)` commits the event with those fates and renames when the token is still current (the `logHead` has not moved) and the fates and the renames equal the dry run's lists" (VD4-4) | yes — extended by the renames, same token rule |
| r2: the GeoJSON trees row (VN-158, XB32) | §11.1: the same row with "integer-centimetre positions computed under §6.5's lint, so the file stays byte-identical on every host, NR4-3" inserted | yes |
| r2: the shadow layer's key, "for the `shadow` layer — or for the `base` layer on a tier without shadow layers — the path-mode sun's azimuth and altitude quantised to the tier's sun step" (N-8) | §8.8: "for the `shadow` layer — or, while projected shadows are on, for the `base` layer on a tier without shadow layers — the path-mode sun's azimuth and altitude quantised to the tier's sun step (1°, or 3° after §8.4's fallback)" | yes — narrowed correctly: with shadows off nothing in `base` reads the 1° sun, and the light step is now its own key (NR4-5) |
| r4 (9 fragments): the texts NR4-1 – NR4-6 quoted as defective ("so the minimum distance is the entity's own spacing", the old class-4 row, "zlib level 3 instead of 6", "`zlib` in Node", "once per session per light direction", "a typical run" ×3, the two-parenthesis sentence) | replaced by the round-5 fixes, §2 above | — (the items themselves, §2) |

**Earlier FIXED items with their mechanism in a section round 5 rewrote** (each read in the integrated text):

| item (round) | section | still ACCEPTED? | evidence in the integrated text |
|---|---|---|---|
| NR3-2 (4) resumable rasters | §8.9 | yes | "Slicing therefore changes when the calls run, never which calls run or in what order"; §8.3's sliced-raster row unchanged |
| NR3-3 (4) pins that come together | §9.2 | yes | the pin pass: "are taken in the order of their `moveLabel` event's `seq`, then label id"; now also stepped one pin per unit (NR4-2), which the strict order keeps result-neutral |
| NR3-6 (4) exports in the tile worker's queue | §8.9, §11.1, §12.7, §12.8 | yes | "an export that has waited 100 ms since its last step runs the next step ahead of class 3"; "The export therefore shows the model as it stood when it was requested, whatever is edited while its bands are rastered"; §12.7's export-beside-the-view run and §12.8's canvases unchanged. Its model-state guarantee holds; the view-state inputs of an export were never pinned (NR5-1) |
| NR3-7 (4) stamp tiles at build time | §8.10, §12.7 | yes | "The tiles are built once, when the product is built, and shipped (below); nothing samples or ranks at run time."; the asset stays ≈ 31 KB (re-run: ≈ 30.9 KB), its hash check and pre-decided rebuild unchanged (rebuild now ≈ 19.5 ms per class, band included) |
| NR-5 (3), NR-6 (3) | §11.1, §8.10 | yes | "Every `export(h, fmt)` runs in the generation worker"; the constant stream key of NR-6 now with creation index 4 for the band (§6.1 agrees) |
| NR-8, N-16 (2–4) load verification and the replay law | §12.6 | yes | V = M(B) + Σ c(e) + S14(B) + 5 ms unchanged; "Verification never delays the picture or an edit"; the 5 ms now finalises both digests, the recomputation ≈ 35–38 ms (receipts re-read, §1) |
| N-8 (2) moving-sun shadows | §8.4, §8.8 | yes | "in `path` mode one 1° step re-rasters the visible tiles' shadow layers and re-composes them"; "so a 1° step of the sun re-rasters only the shadow layers" |
| N-9 b (2) canvas budget | §8.8, §12.8 | yes | "the need is **3P + 7 MB**" and 4.25P + 7 MB with shadow layers, unchanged; the crown sets fit inside the ≤ 5 MB scratch by "the drawn step's set always, earlier sets while they fit" |
| VIS-7 (1) `lit` on Canvas2D | §8.2 | yes | "Chose Canvas2D as `lit`'s reference backend over WebGL2" unchanged; the crown bake now per (style, light step) |
| NP4-6 (5, pipeline) folded into §12.6 | §12.6 | yes | the warp Apply budget counts the wing carry and check with its M3a measurement and fallback; numbers re-derived from the receipt (§1) |

No earlier FIXED item in my sections regressed.

## 4. New findings

| id | sev | owner | claim (failure scenario) | required change |
|---|---|---|---|---|
| NR5-1 | minor | rendering (§8.9, §11.1, §12.7, §12.8; §14's copy of `TileRasterOpts` for scope) | **A raster export is not told which sun, light step or look to draw with, and the tile backend's options cannot say which light step a layer uses.** §8.9's raster-export request carries "frame, scale, band, layers, post operations and the export's zoom stop" and the export's transient list — no style, no view-state switches, no sun and no light step — while §8.9 expects exports to run beside an animated sun: "so an animated view (a `path`-mode sun, moving people, a live layer) slows an export but cannot stop it". In `lit` with a `path` sun running, an A2 print (≈ 20 s) is rastered band by band with whatever sun and light step the tile worker holds when each band runs, so its shadows swing and its roof and crown tones step from band to band — the torn print NR3-6 fixed for the model, now through the view state; a season, weather or preset change made during the print does the same. Its crown set can also be gone: the cache keeps "the drawn step's set always, earlier sets while they fit", and class 4 has no bake unit to rebuild it. §12.7's byte-identity run covers only a pan, a zoom and an edit. Inside the view the same gap is an interface one: `TileRasterOpts` has only `sun?: { azimuthCdeg: number; altitudeCdeg: number }`, while `under` and `over` must be rastered at the **drawn** light step, which is not the current sun's quantisation while a newer step waits (§8.4). | In §8.9 and §14, give `TileRasterOpts` a `lightStep?: { azimuthCdeg: number; altitudeCdeg: number }` (the quantised light, read by `faceLight`, the two-tone `roof`, `hillshade` and the crowns) beside `sun?` (the shadow sun, read only by the projected-shadow pass), the queue passing the drawn light step for `under`, `over` and `base`. In §8.9's request row and §11.1, make the raster-export request carry the look and the view state as they stood at the request — the sheet (id@version, or the viewer's `stylePreset` sheet with the document's rows), §8.8's view-state switches (season, weather, shadow mode, layer toggles, `base` live layers), the shadow sun and the light step — and raster every tile of the export with them; in `lit` with a `path` sun, bake the export's crown set as class-4 one-sprite units before its first band when it is not cached, and hold it until the export completes (counted in §12.8's export canvases). Add to §12.7's *Export beside the view* run a `lit` export during a `path` sun advanced one step per frame: its PNG byte-identical to the export made with the sun stopped at the request's time. |
| NR5-2 | minor | rendering (§9.2; §14's `LabelPlacer` for scope) | **The label placer's declared input lacks fields its algorithm reads, and names a model record the tile worker does not hold.** `LabelPlacer.begin` (new this round) and `place` take `labels: LabelEntity[]` — §9.1's model record `{ id, target, kind, text, shortText?, priority, lod, candidates, pinned?, hidden? }` — while §9.2 says S13b runs "from the `LabelTable` alone" and §12.8 that "The tile worker holds no model". `LabelEntity` has no target area (the strict order's second key: "then larger target area, then id"; `LabelTable.areaM2`), no parent quarter node (rung (5) "following `LabelTable.parent`") and no revision (the memo "is keyed by (stop, candidate id, candidate revision)"; `LabelTable.revision`), so a placer written against its declared input cannot compute §9.2's order, rung (5) or its memo keys; and an array handed over at `begin` contradicts §9.2's own rule that "The view's job reads the tile worker's list, which deltas change between steps". Round 5 copied the older `place()` signature into the new `begin()`. | Declare the placer's input as the rows S13b reads: a `LabelRows` view — the `LabelTable` columns with the `StringTable` and `GeomTable` ranges they index — declared in `@plat/model` beside `LodBand`, `Role` and `ZoomStop` (so `@plat/labels` still never imports `@plat/render`) and implemented by the tile worker's list and by each export's transient list; use it in `begin` and `place` in §9.2's interface and §14's copy. `LabelEntity` stays the model record S13a writes and S14 reads. |
| NR5-3 | minor | rendering (§12.7) | **One measured percentage is overstated.** §12.7 keeps the per-row rule as the default because it gives the smallest file "7–10 % smaller on the relief and textured looks"; the receipt (re-run, identical sizes) gives 12.2 against 13.4 MiB (relief) and 43.4 against 46.3 MiB (textured) — 9.0 % and 6.3 % smaller; 7–10 % is how much larger None's files are. | Write "6–9 % smaller on the relief and textured looks" (or "None's files 7–10 % larger"). |

## 5. Deferral scan

The four sections' line ranges (l. 6774–8202 and 8397–9251, the review banners excluded) searched for TBD, later, "at
M0", open, defer, postpone, "to be decided", future, eventual, "not yet", revisit, undecided, TODO, pending,
provisional and placeholder: 28 hits, every one ordinary prose — geometry and API senses of "open" (`open` shore
segments, "open gardens", `open(bytes …)`), "later" as sequence ("a later entity whose draw repeats", "a later
edit"), "pending" re-rasters, messages and confirmations, §12.4's "the first M0 measurement" (a measurement with its
pre-decided spike fallback in the same section), and the negation "Chose to build CityJSON over leaving it deferred".
Every measurement the round-5 text names carries its pre-decided fallback in the same passage: the seam check is
enforced by the build tool (no measurement needed); the sliced placement is a census identity; the five-engine GeoJSON
is a determinism test whose cause the lint forbids; the PNG time miss has its per-host steps; the light passes and the
crown bake are measured at M2b with the fixed sun as the fallback. Nothing in my sections is deferred, and no subject
in them is owner-staged this round.

## 6. CONFIRMED versus PLAUSIBLE; what a Fable reviewer should re-check first

**CONFIRMED (executed here):** the integrated file is the integration's (md5); the section-level diff and the word-diffs
of my 15 changed sections; both round-5 receipts re-run (seam counts and PNG sizes identical, times within ≈ 3 %); the
§12.6 receipts re-read; the quote-regression script (13 pre-only fragments, each explained); every quote here present in
the integrated file; the deferral scan; that `LabelEntity` lacks `areaM2`, `parent` and `revision` (read in §9.1 and §8.1);
that neither the raster-export request row nor `TileRasterOpts` names a light step, a style or view-state switches (read
in §8.9 and §14). **PLAUSIBLE (reasoning):** the case-by-case proof that the half-width band defeats every cross-seam pair
(the receipt agrees on five seed sets but is a model, not the product's code); that browsers' `CompressionStream` also
ignores a level (the standard's one-argument constructor; not executed in a browser); NR5-1's torn print (read from the
request's fields and §8.9's queue, not rendered); NR5-2's consequence (read from the types, no placer exists).

**What a Fable reviewer should re-check first.** (1) NR5-1 with NR4-5 and NR3-6: whether every input that changes an
export's pixels — model, sheet, view-state switches, shadow sun, light step, crown set — is now fixed at the request, and
whether the view's `under` / `over` jobs can name the drawn light step through the interface. (2) NR4-1's argument in
§8.10: that a band point's toroidal spacing in the other point's tile bounds the cross-seam distance for every rotation
and scale (the rounding's ≤ 1.5 cm aside). (3) NR5-2: whether moving a label-row view into `@plat/model` is the cleanest
way to give S13b its real input without `@plat/labels` importing `@plat/render`.
