# Fix-all round 5 — RENDERING area (§8 rendering and style, §9 labels and furniture, §11 export and interop, §12 performance budgets)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat fixall/draft-rendering-r5 (2026-09-25); queued in docs/FABLE-REVIEW-QUEUE.md.

Lane `fixall/draft-rendering-r5` · 2026-09-26 · fix architect for the RENDERING area, round 5 (opus stand-in for the Fable
seat). Status: COMPLETE (2026-09-26).

## 0. How to read this file

**In plain words.** The round-4 check found six small things still wrong in the drawing, labelling, export and speed
sections. All six are fixed here; none is put off and none is waved away.

* **Trees no longer bunch up along invisible grid lines in a wood (NR4-1).** A wood is filled by repeating four
  ready-made tree patterns side by side. Where two different patterns met, some trees came too close together. Now the
  four patterns share the same thin strip of trees along their edges, so any two of them fit together without a
  seam; measured, not one pair of trees comes too close across any edge, where the old patterns had three to five per
  64 m of edge. The shared strip is kept narrow (about one tree in eight), so the patterns still look different.
* **Printing a large map no longer freezes the screen while its labels are placed (NR4-2).** Placing the labels of a
  poster-sized print is now done in tiny pieces, like drawing its tiles, so the map you are looking at, the compass
  and the ruler keep answering in the meantime. The result is exactly the same as placing them in one go.
* **Tree positions in GIS and 3-D files are now the same on every browser (NR4-3).** They are worked out with the
  product's own maths functions and rounded to whole centimetres, as everything else in the town is.
* **The rescue plan for a slow PNG print now works in a browser too (NR4-4).** Browsers cannot be told to compress
  "less hard", so the rescue is now to skip a preparation step that turned out to take most of the time; measured on
  test maps, this makes the file's encoding three to six times faster for a file at most a tenth larger.
* **With the moving sun switched on, roofs and tree crowns are lit consistently (NR4-5).** Their lighting now moves in
  small whole steps shared by the whole view, and every step redraws the whole view once, so no part of the map keeps
  the old light.
* **Two sentences about speed are clearer (NR4-6):** "a typical run" now says what the number means — 19 runs in 20 —
  and a sentence about checking a reopened file no longer reads as if two things run in the same place.

**Format.** §1 is the disposition table, with the places where a required change was refined and why. §2 holds the
eleven replacement blocks, each starting with `=== REPLACE <section and exact heading> ===` and followed by the complete
new text of that subsection in the architecture's voice, with its review banner under the heading (the §12 block
replaces only the section's opening — its heading, banner and *In plain words* paragraph — up to §12.1). §3 lists
what other areas must change (the integrator applies it), what this file folded in from other lanes' round-5
requests, and the judgment-call rows (J-R50 – J-R54 new, J-R42 restated). Every new choice is recorded in its block as
"chose X over Y because Z". §4 separates what was executed from what is reasoning.

**Evidence.** Two new receipts, our own code, plain Node 24.12 on the reference machine, output committed beside them:
* `docs/validation/bench/fixall_rendering_r5_seamstrip.mjs` / `.out` (NR4-1): four configurations on five seed sets —
  the chosen band (r₀ ÷ 2, cut from a full tile), the verifier's width (r₀, cut), the verifier's sampling (Bridson
  inside an r₀ band) and four independent tiles — checked over all 256 arrangements of 2 × 2 cells for pairs closer
  than r₀ across cells (all ranks, rank < 0.6, rank < 0.25), with density, the largest empty circle and the insertable
  area by edge distance, build time and asset size.
* `docs/validation/bench/fixall_rendering_r5_png.mjs` / `.out` (NR4-4): a synthetic A2 300-dpi map raster in three
  looks (flat `ink`-like, smooth relief shading, textured `lit`-like), encoded as §8.8 does — the JavaScript filter
  pass by the per-row rule, by Sub and by None, each deflated by `zlib` at levels 1 / 3 / 6 and by `CompressionStream`
  with no option, `{ level: 1 }` and `{ level: 9 }`.
The item sources are `r4-verify-rendering.md` §4 (NR4-1 – NR4-6) and its receipt
`fixall_verify_rendering_r4_seams.out`; no `r4-validate.md` exists. The architecture was read in full at §8, §9, §11
and §12 and in place at §2.9 step 3, §3.1's Poisson row, §6.1's registry, §6.5, §13.2's contract tests, §13.3, §13.7's
O19 (d) row, §13.8, §14's labels and render interfaces, §15.1's B19, §16's M1 / M2b / M3a rows and the J-R rows named
in §3; and the other areas' round-5 drafts' requests to this area (determinism RR5-1 – RR5-5, pipeline X-R1).

**Output shifts, stated.** NR4-1 changes the stamp tiles, so every stamped tree (woods, gardens, parks, scatter) moves;
NR4-3 moves instance positions by ≤ 0.71 cm (the rounding); NR4-5 changes `path`-sun pixels of `lit` and `hatched`
roofs and crowns; NR4-4 fixes the PNG encoder's filter rule, which decides PNG bytes (not pixels). No golden, stamp-tile
hash or PNG hash exists yet (goldens start at M1, §13.3), so nothing recorded moves and no shift record is needed;
from M1 on the first would be a `render.stampTiles` view shift. NR4-2 and NR4-6 change no output: a stop placed in
steps gives the same placement digest as one placed whole.

**Deferral scan.** A scan of every added line for TBD, later, "at M0", open, defer, postpone, "to be decided", future,
eventual, "not yet", revisit, undecided, TODO, pending, provisional and placeholder finds only ordinary prose ("an open
RFC 7946 validator", "pending re-rasters"). Every measurement named in a block carries its pre-decided fallback in the
same passage. Nothing is left open, and no item is staged by the owner.

**Document checks.** The eleven blocks applied to a copy of `docs/ARCHITECTURE.md` by script, and
`docs/validation/bench/doc_checks.py` run on that copy over the changed subsections: C1 5 / C2 0 / C3 62 / C4 2 / S2 2
hits, all reviewed — five C3 hits (three runs of this lane's measured numbers, and a number run and a phrase of
round-2 text in §8.4 and §8.8) were added to `docs/validation/doc-checks-allow.tsv` under this lane's block with
reasons, and nine other first-run hits of ordinary phrasing were reworded instead. One S1 hit remains, outside this area: the J-I15 row of the Judgment calls table has a
bare `|` inside a code span (§3.4, SC-9).

## 1. Disposition table

| id | sev | disposition | sections changed | mechanism (one line) |
|---|---|---|---|---|
| NR4-1 | minor | **FIX** | §8.10 (*Tiles*, *One construction everywhere*, the asset, release changes, closing reasons), §8.3 (new *stamp-tile seams* row); cross: §6.1 registry (determinism D1), §3.1 Poisson row (kernel K1), §13.2, §13.8 PR row, §15.1 B19, §16 M1, J-R42, J-R50 (scope) | a class's four tiles share one **border band** — the points within r₀ ÷ 2 of a tile edge, cut from a fifth, full toroidal tile (creation index 4) — and each fills the rest by Bridson seeded with the band; two points of different cells closer than r₀ always include a band point, which each tile holds at the same place and was spaced against, so the minimum distance holds at every seam and for every band's subset; measured 0 close pairs in all 256 2 × 2 arrangements on five seed sets (independent tiles: 16 672); the seam check is a §8.3 census row, enforced by the build tool and the PR tier |
| NR4-2 | minor | **FIX** | §9.2 (new *Resumable placement* with `LabelPlacer.begin` / `PlacementJob`, *Budget*, reason), §8.9 (queue classes 3 and 4, new *Placement is stepped like a raster*, reason), §11.1 (*Where exports run*), §12.7 (*Labels*, *PNG*), §8.3 (new *sliced placement* row); cross: §14, §13.2, §13.8, §16 M1, J-R51 (scope) | S13b is a resumable job whose unit is one decision — a rung-(5) test, one pin, one push or decision of the local evaluation on an explicit stack, or one placed label's glyphs — reading the clock after each unit, with its stack and memo kept between steps; an export's S13b is the first work of class 4, the view's is class-3 work; a delta restarts the view's job keeping valid memo; ≈ 1 µs per candidate (≤ 20 ms for 20 000) counted inside the PNG row's ≤ 20 s; whole and sliced placement give identical digests |
| NR4-3 | minor | **FIX** | §8.10 (*Stamp*, *Grid and line*, *Budgets*), §11.1 (GeoJSON row); cross: §6.5 (3) (determinism D2), §13.3, §13.8 nightly row, §16 M3a, J-R52 (scope) | R_θ's cosine and sine are `dmath.cos` / `dmath.sin` of the integer `rotationCdeg` × (π ÷ 18 000); every instance's world position is rounded to integer centimetres before the face test, the density test, drawing, override resolution and every export; the whole instance function is in the allowlist lint's closure; the nightly five-engine run compares one golden CITY seed's GeoJSON with trees byte for byte from M3a |
| NR4-4 | minor | **FIX** | §8.8 (*Print and large PNG*: the default row-filter rule), §12.7 (*PNG*, the confirmation's fallback, reasons); cross: J-R53 (scope) | default: per row, the filter type whose filtered bytes have the smallest sum of absolute signed values; PNG time fallback per host — every host: filter None on every row (measured: encoding 3.5 / 5.4 / 10.5 s → 0.6 / 1.3 / 4.4 s on flat / relief / textured synthetic A2 maps, the file −4 % to +10 %); Node then zlib level 3; browsers, whose `CompressionStream` takes no level (measured: the option is ignored), re-declare the budget at the measured p95 (D-18) |
| NR4-5 | minor | **FIX** | §8.4 (*Sun*, new *Light steps* with measurement, fallback and reasons), §8.8 (*Layers*, *Cache and invalidation*, the canvas scratch), §8.2 (`lit` paragraph), §8.10 (crown library, *Budgets*), §8.9 (class 3), §12.7 (crown library), §8.3 (new *light steps* row); cross: §16 M2b, J-R54 (scope) | a **light step** — the path sun quantised to 15° of azimuth and 5° of altitude — is what `faceLight`, the two-tone roofs, `hillshade` and the `lit` crown bake read; the `under` and `over` layers (or `base`) carry it in their tile key; a **light pass** bakes the crowns and re-rasters the visible tiles once and is never cancelled (the newest step starts next), so no tile keeps an old light and both tiers draw the same roof and crown tones; crown sets per (style, light step), the drawn one always cached; bake ≤ 20 ms; M2b measures; fallback: the fixed sun for all but shadows |
| NR4-6 | minor | **FIX** | §12 opening (*In plain words*), §12.6 (*Replay and load verification*); cross: the one-page summary (scope SC-6) | (a) "for a typical run" → "for 19 runs in 20" in both places (and the same phrase in the one-page summary); (b) the two-parenthesis sentence rewritten exactly as required: the edits run single-worker in the generation worker, and the replay runs there only at pool size 0 |

**Totals:** 6 items — 6 FIX, 0 INVALID, 0 STAGED-BY-OWNER, 0 deferred.

**Folded from other areas' round-5 requests into this area's blocks** (so each subsection is replaced once; where the
owning lane's final wording differs, the owning lane's wording governs and the integrator aligns these sentences to
it): determinism `r5-determinism.md` RR5-4 (a)–(c) — the load recomputation of the model and records trees
(≈ 35–38 ms), "once the saved copy's own roots have matched" (VD4-2) and "5 ms finalises the model and records
digests" (VD4-6) — and pipeline `r5-pipeline.md` X-R1 — the warp Apply budget counting §2.6's wing carry and check,
with its M3a measurement and pre-decided fallback (NP4-6) — both into the §12.6 block. Determinism RR5-1 (§11.2),
RR5-2 (§11.3), RR5-3 (§9.6) and RR5-5 (§12.8) target subsections this file does not replace; the integrator applies
them as written, as it does kernel `r5-kernel.md` X-R1 (§12.8). Determinism's round-5 §6.5 block already carries
NR4-3's lint closure; D2 (§3.2) aligns its wording.

**Where a required change was refined, and why.**
* **NR4-1 — the band's width and how it is sampled.** The required change shares "the points within r₀ of any tile
  edge", sampled "by the same Bridson construction restricted to that toroidal strip". Two measured refinements.
  (1) *Width r₀ ÷ 2.* A point outside a half-width band is at least r₀ ÷ 2 from its cell's edges, so two such points
  in different cells are already r₀ apart; every closer pair includes a band point, which lies in the other point's
  own tile and was spaced against it there. Both widths gave 0 close pairs across cells in all 256 arrangements on five
  seed sets, and the half-width band repeats ≈ 11–14 % of a tile's points in every cell instead of ≈ 20–25 %.
  (2) *Cut from a full tile.* Bridson restricted to the band packs points against the band's inner edge: 4.7–5.3
  points per 100 m² in the band against 2.8–3.6 in the ring inside it, a density stripe along every lattice line; a cut
  of a full toroidal tile keeps a full tile's density (3.6–4.4 in the band and elsewhere; independent tiles
  3.1–4.7), at the price of slightly larger holes along the band's inner edge (largest empty circle 1.20 × r₀ against
  ≤ 1.08 × r₀; insertable area 0.11 % of a tile against 0.04 %). The census row checks all 256 2 × 2 arrangements,
  which contain the required 16 ordered pairs (both directions) and every corner.
* **NR4-4 — None, not Sub, as the fallback filter.** Measured on flat, relief and textured synthetic A2 maps, the
  fixed None filter is both faster and no larger than Sub: Sub still spends ≈ 0.2 s filtering, deflates as slowly as
  the default and makes files 7–30 % larger than the default's, while None's are 4 % smaller to 10 % larger. The
  measurement also showed that zlib's level (the old fallback) is the smaller lever — the filter pass is 2.7–3.4 s of
  the 3.5–10.5 s — so the level-3 step is kept only for Node, after the filter change, and a browser miss that
  remains goes to the D-18 re-declaration, the path §12 uses for every other measured miss.
* **NR4-5 — the cache and the pass.** The required change caches "the last four" crown sets. Every raster reads only
  the drawn light step's set, so correctness needs one; four sets of the library could exceed the ≤ 5 MB that §8.8's
  scratch gives crowns and glyph atlases together, so the block keeps the drawn step's set always and earlier sets
  while they fit. The block also makes a light pass run to completion (the newest step starts next) instead of the
  shadows' latest-wins cancellation, because an animated sun would otherwise cancel each pass — a whole settle —
  before it completes; names every program that reads the light (`faceLight`, the two-tone `roof` that `hatched` and
  `ink` also draw, `hillshade`, the `lit` crowns); and keys a tier's `base` by the 1° sun only while projected shadows
  are on, so a `path` sun with shadows off re-rasters on light steps only.
* **NR4-2, NR4-3.** As required, with the mechanisms the text needed: the local evaluation runs on an explicit stack
  (recursion cannot stop between units), a delta restarts the view's job keeping valid memo entries, and the export's
  job never sees a delta; `Math.round` is named as the rounding, the lattice's cells are found with the same `dmath`
  cosine and sine, and the ≤ 1.5 cm the rounding can take off the spacing is stated.

## 2. Replacement blocks

Eleven blocks. Each starts with its heading and its review banner; the text between the banner and the next block is
the complete new subsection (for §12, the section's opening up to §12.1).

=== REPLACE 8.2 Style sheets as data: roles, contrast, symbolisation, paint programs, layer order, presets (G-R2) ===

### 8.2 Style sheets as data: roles, contrast, symbolisation, paint programs, layer order, presets (G-R2)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r5); earlier: revised by opus stand-in (fixall/integrate-r4); earlier revision fixall/integrate-r3; drafted by fixall/draft-rendering-r3

A style sheet maps (semantic, attribute predicates, band) to **paint programs**, over a palette of **roles** and a
**symbolisation table** (the `Role` type is declared in `@plat/model`, §14, so `@plat/labels` and `@plat/render` share
it without either importing the other's code):

```ts
interface StyleSheet {
  id: string; version: string; family: 'ink'|'lit'|'hatched'|'painterly'|'graphic';
  palette: Record<Role, Color | Color[]>;                               // multi-colour roles: the pick rule below
  symbols: Record<string /* semantic */, Partial<Record<LodBand, Symbolisation>>>;
  order: Record<LodBand, OrderSlot[]>;                                   // draw order per band, with reasons
  programs: Record<string /* semantic */, Partial<Record<LodBand, PaintProgram[]>>>;
  roofConstruction: 'plain'|'skeletonHip'|'skeletonGable'|'fakeGablePerWing';   // over stored wings (§2.6)
  labels: LabelStyle;                                                    // faces, floors, halo rule (§9.4)
  shadows: { projected: 'off'|'drop'|'prism'; penumbraPx: number; sun: SunSpec;
             raised: { on: boolean; offsetM: [number, number]; minPx: number; maxPx: number } };
  overrides: ThematicRow[];                                              // thematic layers, materials, season, weather, tints
  post: PostOp[];                                                        // per-tile post operations
  budgets: Record<LodBand, DetailBudget>;
  referenceBackend: 'canvas2d';                                          // every shipped preset (§8.9)
}
interface Symbolisation { mode: 'model'|'paper'; k?: number /* drawn = k × model width */; minPx?: number; maxPx?: number; px?: number /* paper width at 1× */ }
interface OrderSlot {
  slot: number;                     // its row of the layer-order table below; several entries may share a row
  semantic: string;                 // a semantic ('way.pier') or a dotted prefix ending in '.*' ('way.*')
  passes?: number[];                // the MarkTable passes (§8.1) of that semantic this entry places; absent = every pass (NR-3)
  derived?: 'raised'|'shadow';      // instead of the matched marks' own draws: the per-tile raised under-copy or projected-shadow union over them (§8.4)
  reason: string; recordedAs?: string /* the reference step it matches, for order parity (§8.3) */ }
```

**Roles.** `paper` (margin and background), `road` (way bodies, squares, bridges — equal to `paper` in the ink family,
so streets are negative space), `ground` (built-block ground, yards at the city band, settled ground), `court` (enclosed
in-block courts), `garden` (private planted yard parts), `green` (parks, greens, commons, churchyards), `tree`, `field`,
`verge`, `water`, `building`, `roof`, `wall`, `ink` (every outline and text), `label`, `shadow`, `ambience`, `light`,
`sand`, `plank`, `grid`, `snow`, `lights`. A role never changes meaning across the bands or the presets of one family.
The reference schemas (MFCG 13 keys, NG 26, VG 40) map onto this set without loss.

**Contrast matrix (replaces the luminance rule; O12 f).** Pairs that must separate wherever both roles are drawn — the
city band unless the row says otherwise — with floors on CIEDE2000 and on the lightness difference:

| pair | ΔE2000 ≥ | ΔL* ≥ |
|---|---|---|
| road / ground | 6 | 5 |
| ground / building | 12 | 12 |
| road / building | 15 | 15 |
| garden / building; green / building | 10 | — |
| tree / water | 10 | — |
| green / road; tree / green | 8 | — |
| water / road; water / ground | 8 | — |
| wall / water | 20 | — |
| field / road; field / ground | 4 | — |
| court / road (district band and finer: courts are drawn as `ground` at the city band, §8.5) | 4 | — |
| court / ground (district band and finer) | 3 | — |
| ink / road; ink / ground; ink / paper (text, its halo and outlines: the **label floor**, §9.4) | 40 | 50 |
| ink / building (outlines and landmark rims; text crosses masses only on a halo, §9.4) | 30 | 40 |
| ink / tree (crown outlines) | 25 | 30 |

Checked (1) on every palette when it is loaded — built-in, user-edited or random — and (2) on rendered city-band images
in B-ZOOM: the mean CIELAB of the pixels whose top mark has each role (read from the pick buffer), for every pair
present in the view. A user edit that fails is shown with the failing pair and kept only with an explicit "accept low
contrast" flag recorded in the report. MFCG's default palette has garden = building (ΔE2000 0.6) and tree = water
(0.0); both are recorded as reference weaknesses not to copy (VIS-2).

**Random styles and their bounded repair (N-26).** *Random style* draws each role's L* within ± 12 of the family's
shipped value, chroma in [0, 18] in `ink` and [0, 30] otherwise, and any hue, keeping `road` = `paper` where the family
ties them; the draw comes from the `style.random` stream (§6.1) with the `setStyle` event's `seq` as its creation index
and the attempt (0–2) as its attempt component — a style-time draw whose result is written into the event as row
operations, so a replay never re-draws it. A
failing draw is **repaired in bounded steps**: take the first failing pair in the matrix's row order; raise its lighter
role's L* by 1 (up to 97), or, when that role is already at 97, lower its darker role's L* by 1 (down to 3); re-check
every pair; stop when all pass or after 100 steps; a repaired palette must still pass after conversion to sRGB. A draw
that fails its repair is redrawn on the next attempt; after three failed attempts the family's shipped palette is used
and the report says so. The loop ends by construction (≤ 300 steps), where the old rule — raise the lighter role until
every pair passes — could cycle (raising `ground` for ground / building lowers road / ground) or never end (a darker
role above L* 50 against a ΔL* 50 floor). Measured on 2 000 seeded draws per family with every row of the matrix
(`docs/validation/bench/fixall_rendering_r2_palette.out`): 4–18 % pass as drawn, 77–83 % after the first repair (median
5–17 steps), 99.1–99.6 % within three attempts; the shipped-palette fallback fires for 0.4–0.9 %. **Confirmation (M3b,
where random styles ship with O12's extras):** the shipped-palette fallback ≤ 2 % of 10 000 draws per family;
pre-decided fallback: the L* window narrows from ± 12 to ± 8 and the run repeats. Chose a bounded repair with redraws
and a shipped-palette floor over the unbounded raise because O12 (f) asks that every presented style meet the floors
and only a bounded procedure can promise an answer.

**Role values (our own; PLAT 2026-09-25, retuned by fix-all round 2; calibratable table rows).** Every pair of the matrix,
the outline rows included, was computed on these sRGB values and passes its floor
(`docs/validation/bench/fixall_rendering_r2_palette.out`; e.g. `ink` road / ground 6.9 / 10.0, ground / building
16.1 / 21.1, tree / water 20.7, court / ground 4.2, ink / building 41.9 / 47.9 — `lit` ink / building 37.8 / 43.0,
`hatched` 34.5 / 40.6):

| role | `ink` (default) | `lit` | `hatched` |
|---|---|---|---|
| paper | `#F6EDDE` | `#DED6CC` | `#D4CABF` |
| road | `#F6EDDE` (= paper) | `#D8D0C8` | `#B6A99B` |
| ground | `#DED0BB` | `#CBB9A2` | `#D4CABF` (= paper) |
| court | `#ECE0C6` | `#D1C5B2` | `#B7B898` |
| building / roof (lit side) | `#A49689` | `#AD8A72` | `#9D7D68` |
| ink / label | `#292522` | `#34281E` | `#2A231D` |
| wall | `#292522` (= ink) | `#857A6E` | `#685C51` |
| water | `#AABBC5` | `#6D9CB9` | `#98AFBB` |
| green | `#BCC8AB` | `#9AB37F` | `#B0B48C` |
| garden | `#C7CCAF` | `#8EA96D` | `#A8AF83` |
| tree | `#7E907A` | `#5B7A4F` | `#798C67` |
| field | `#ECDFBF` | `#D8BE89` | `#E5D6B5` |
| verge | `#D9DCC5` | `#ADBB95` | `#BBBEA1` |
| shadow | ink at α 0.35 | ink at α 0.45 | ink at α 0.40 |

The ink family keeps its character by value steps: eight role colours at the city band — paper (= road), ground,
building, ink (= wall = label), water, green, tree and field; courts are drawn as `ground` at the city band (§8.5), and the
raised under-copy and shadows are the ink at an alpha, not further colours — and no role with CIELAB chroma above 18
(`field` is the highest at 17.3) (IMPROVEMENTS O12 restraint: one ink, 4–8 roles). Chose low-chroma value steps over
saturated hues for the default because the restraint clause asks for one ink and a few roles, and eight tones meet
every floor. Chose to draw walls in the ink itself and courts as `ground` at the city band over a ninth city-band tone
because the restraint clause names one ink and 4–8 roles, and at city zoom a court is enclosed by masses on every side,
where its small step from `ground` adds noise rather than information (N-25). Chose to darken `lit`'s and `hatched`'s
ink (L* 25 → 17 and 18 → 14) over lowering the outline floors because building outlines and text over masses need the
separation the `ink` family already has (N-3).

**Symbolisation table (VIS-1).** Drawn width in px = clamp(k × model width × px per metre, minPx, maxPx) in `model`
mode, or a fixed paper width at 1× (times the device pixel ratio) in `paper` mode; no length is written in any
reference's private unit. Exaggeration never enters the model, GeoJSON, VTT, glTF or CityJSON (they carry model widths);
styled SVG and PNG carry drawn widths. The `ink` rows are calibrated on MFCG's metre-unit export at the matched view
scale (MFCG size 40 at 0.816 px/m, 1.23 m/px): MFCG draws walls 7.6 m wide, towers 15.2 m across, road cores 8 m and
piers 4.8 m; its SVG writes the same numbers in its 4 m internal unit (wall 1.9, road 2) (MN-1, MFP-8).

| semantic | bands | mode | rule | at MFCG size 40's scale |
|---|---|---|---|---|
| `wall.curtain` | city, district | model | k = 3 on the band thickness (2.5 m → 7.5 m), minPx 2, maxPx 12 | ≈ 6.1 px (MFCG 6.2) |
| `wall.tower` | city, district | model | diameter = 2 × the drawn wall width, never below the model diameter | ≈ 12.2 px (MFCG 12.4) |
| `wall.gate` | city, district | model | a gap in the wall stroke = max(model opening, 1.2 × drawn wall), flanked by two square blocks of side 2 × drawn wall | ≈ 12 px blocks |
| `way.through`, `way.primary` body | all | model | k = 1, minPx 1.5 | 8 m core ≈ 6.5 px |
| `way.secondary`, lane symbol body | city | model | k = 1, minPx 1 | — |
| way casing | all | paper | h = 0.5 px each side (casing = body + 2h) | — |
| `way.pier`, bridge deck | city, district | model | k = 1, minPx 1 | 4.8 m ≈ 3.9 px |
| building outline | city | paper | 0.5 px × clamp(s ÷ 8, ⅓, 1), s = the median footprint side in px at the zoom stop — outlines thin, then hold at one third (MFCG's Thin lines made a law) | — |
| building outline | district and finer | paper | 0.5 px | — |
| raised under-copy offset | city, district | model | (+0.4 m, −1.0 m) east / north, drawn length clamped to [0.3 px, 2.5 px] | — |
| boundary treatment (fence, hedge, yard wall, railing) | district and finer | paper | ≤ ½ of the building outline weight, never filled, gaps at gates | — |
| minimum feature | all | — | 2 px, met by masses and settlement dots (§8.5), never by enlarging one footprint | — |

Curtain walls draw after footprints (the order below) and the wall symbol is clipped on its inner side to the band's
inner edge minus the setback, so the exaggerated symbol overhangs only outward (over the berm, the moat or the glacis)
and never covers a plot. **The dry ditch (VP2-10).** The `ditch` residue on the town side of an `on_enceinte` bailey
(§4.7 S10 (0), §4.8) draws with the glacis parts' role in a dry-ditch variant — its fill 5 ΔL* darker than the glacis
fill and, at the district band and finer, a short inward hachure along its inner edge; at the city band it takes the
glacis parts' plain fill. The overhang rule above already covers it.

**Paint programs (the vocabulary).** `fill`; `stroke(width by symbolisation, join, cap)`; `casing(w, h)` (ink at
`w + 2h` in the casing pass, body at `w` in the body pass — MFCG's most reusable trick); `bands(N, W, exponent, ramp)`
(VG's water law); `raised(offset)` (the constant-offset under-copy); `shadowPass(mode, colour, alpha, penumbraPx)`
(projected shadows, §8.4); `hatch(angle | ridge, pitch, taper)`; `roof(construction, dark = lit × lerp(ambience,
shadow, α))`; `crown(library)`; `halo(role rule)` (§9.4); `glyphAlongSpine`; `pattern(texture, tintRole, metresPerTile)`
(tinted seamless textures); `faceLight(dir)` (a per-face tone from the face normal and the light: roof faces from the
skeleton or the wings, wall sides); `ramp(field, stops)` (per-tile pixels from a field raster: water depth, terrain
colour); `hillshade(sun, strength)` (Lambert on bilinear-interpolated cell normals of the terrain field, water faces
masked, strength from the `shadow` role's alpha, multiply-composited after fills and way bodies and before buildings
and trees — VG's recipe without a blur); `contourMarks(levels, mode: contour | hachure | grass)`; `foam(widthM, alpha)`
(from the shore-distance field on `open` segments, half alpha on `river`, none on `sheltered` and `quay`);
`feather(widthM)` (three inset vector bands at α ⅔, ⅓, 0 toward open ground — no bitmap blur; COV-FTG-I05);
`outlineMix(factor)`; `tint(method, strength)`; `weathering(amplitude)`; `instances(library)` (§8.10); `vignette`;
`ruin` (outline dashed by an entity-keyed pattern, fill at 30 % alpha, rubble stipple — the hook for the owner-staged
ruined state, with the `none` roof kind, §2.6), beside two tone overrides keyed by the decline states of §2.8:
`existence = abandoned` (the roof tone lerped 30 % toward `ground`, no raised under-copy) and `existence = decayed` (the
outline dashed, the fill at 60 % alpha); `symbol(glyph)` (point symbols for the whole pin vocabulary of §2.7: tent, stall,
well, fountain, large tree, cross, market cross, shrine, pump, trough, gallows, statue, monument, bandstand, campfire,
fire pit, lamp post). Lane ends: a lane's body and casing end square at the kerb of the way it meets; the junction wedge
belongs to the higher-class way (the renderer half of GEO-21). Hairlines and casings are in paper px; ribbons and
symbols follow the symbolisation table — MFCG's two coordinate spaces, now stated.

**Relief tier (VN-029, VN-031; base should-have, optional, off by default).** Contour, hachure and grass marks are
extracted per render tile from the terrain `field` mark by marching squares over the tile's cells plus a margin, then
resampled evenly along each level line (`contourMarks`); `hillshade` runs on the same field. VG-specific looks (its
spotlight vignette and dramatic forest) stay in the reserved `painterly` family.

**Multi-colour roles (XB17).** A role may hold a list; an individual mark (a building, a roof, a tree, a stall) takes
index `RH32(role, key, salt[, instance ordinal], style id) mod n` over the mark's render key (§8.1 item 5; VD2-6); aggregate fills (block ground, city-band masses,
wood fills) take index 0. Deterministic, so two renders of one model are pixel-identical (§6.2).

**Tints and weathering (K12).** `tint`: per district a hue from a greedy colouring of the district adjacency graph in
address order (§6.3) (hue = base + 137.5° × colour index, stepped by 30° until every neighbour differs by ≥ 30°); method `spectrum`
(hue at fixed saturation and value), `brightness` (value scaled) or `overlay` (blend toward the hue), strength 0–1;
applied to the roofs of built districts; outlines take lerp(ink, tint, 0.3); recomputed when the palette changes; off in
`ink` by default. `weathering`: each roof's RGB scaled by 1 + u·w, u ∈ [−1, 1] from `RH32('weathering', key, salt, style id)`, w = 0.04 (ink), 0.06
(hatched), 0.08 (lit).

**Materials, season, weather (COV-FTG-F20, K06).** Override rows may key roof and wall colours by `roof.material` and the
enceinte's wall material. The view state (§11.3) carries `season` ∈ {spring, summer, autumn, winter} and `weather` ∈
{clear, overcast, snow}; they select override rows: autumn and winter re-skin deciduous crowns (by the instance's
`leafType`, deciduous when absent) through role variants (`tree@autumn`; winter uses a bare-crown symbol); snow lays the
`snow` role over ground, fields and roofs while `road` keeps its value, so streets stay legible; overcast turns the
projected shadow pass off (the raised under-copy stays). Nothing in the model changes and the model hash is untouched.

**Post operations (K07).** `post` lists operations applied once per tile after its marks: `greyscale`, `sepia`,
`tint(colour, strength)`, `vignette` (on the view), `pixelate(cellPx)`, `dotScreen(cellPx, angle)`,
`scanline(periodPx, alpha)`, `crosshatchNoise(periodPx, alpha)`; Canvas2D on the tile's pixels in the tile worker
(≈ 1–2 ms per 512² tile); PNG export applies the same operations per tile; SVG carries greyscale, sepia and tint as
colour-matrix filters and omits the pixel operations, which the export report lists. This replaces the "WebGL2 post
hooks" pointer.

**Live layers (K13, N-4).** `interface LiveLayerProvider { id: string; target: 'base'|'overlay'; marks(view: ViewState, model: ModelView, region: Box): MarkTable }`
adds display-list groups that are view data (never in the model hash). Providers run in the **generation worker**, which
holds the model: it calls a provider when the view state it reads, the model or the visible region (dilated by one
tile) changes, and delivers the marks as a `DisplayDelta` of group `live.<id>` (§8.9). An `overlay` provider's marks are
drawn in the tile worker's composition step with the labels (§8.8), so a selection or a moving person re-composes tiles
without re-rastering them; a `base` provider (a thematic recolouring) is part of the tile key (§8.8). Shipped:
`live.selection` (overlay), `live.favourites` (base: favourite buildings as a thematic override keyed by the view
state's `favourites`) and, registered by the simulation module, `live.people` (overlay: favourite persons' positions
from the module's occupancy at the view-state hour, one categorical colour per person).

**Thematic layers.** FTG D7's matchers are override rows keyed by entity attributes (`prosperity`, `use`, `epoch`,
`owner`, `material`) — data, not code.

**Layer order (data; `ink` shown; the same list serves the city and district bands).** Each slot names its reason and
the reference step it matches; MFCG's recorded order (water → road casing → road body → river → landmarks → wards →
piers → fields → walls → towers → grid → scale bar → compass → labels → title) is a subsequence (order parity, §8.3):

| # | slot | reason |
|---|---|---|
| 1 | paper | background; streets and squares are paper by omission |
| 2 | water | MFCG: water |
| 3 | ground.block | new: the figure-ground contract (§8.5) |
| 4 | relief (hillshade, contour marks; off by default) | new: under everything built (VG) |
| 5 | way casings (`way.*`, pass 1), every class drawn at the band | MFCG: road casing |
| 6 | way bodies (`way.*`, pass 2) | MFCG: road body |
| 7 | river casing and body | MFCG: river |
| 8 | shore marks | new: on the water edge, after water and river |
| 9 | greens, parks, yard parts by role | new: the plot model |
| 10 | projected shadows (off by default; `derived: 'shadow'` over the casters) | new: shadows after roads, before buildings (NG) |
| 11 | raised under-copy (`derived: 'raised'` over the footprints and masses) | part of MFCG's building draw |
| 12 | landmark footprints (solid ink) | MFCG: landmarks |
| 13 | building masses / footprints / roof detail | MFCG: wards |
| 14 | piers and bridges | MFCG: piers |
| 15 | fields and hinterland land use | MFCG: fields |
| 16 | trees: wood fills and crowns | MFCG's recorded tree slot: after fields, before walls; woods may cover track casings (K16) |
| 17 | boundary treatments (district band) | new: yard walls and fences over yards, under curtain walls |
| 18 | curtain walls | MFCG: walls, after buildings |
| 19 | towers and gate blocks | MFCG: towers |
| 20 | grid | MFCG: grid |
| 21 | scale bar | MFCG: scale bar |
| 22 | compass | MFCG: compass |
| 23 | labels (glyphs composed onto each tile, §8.8) | MFCG: labels |
| 24 | title, legend, emblem | MFCG: title |
| 25 | live layers, annotations, measure overlay | new: view data on top |

NG's recorded order (greens → roads → shadows → buildings → props → trees depth-sorted → title) is the `hatched`
sheet's, again a subsequence of its slots. The order is **slot-major across the whole scene**, with casings before
bodies inside each slot (§8.1 item 3); "every casing before any body" holds for ways because their casings (slot 5) and
bodies (slot 6) are separate slots, and a bridge or pier (slot 14) is cased along its sides only — its ends are open
where it meets its way — so no later casing crosses an earlier body. Slots 1–20 are the base raster; slot 23 and slot
25's world-space live marks and annotations are composed onto each tile by the tile worker (§8.8); slots 21, 22, 24 and
the measure overlay are screen-space furniture drawn by the main thread over the composed tiles (§9.5). The census
checks that every tile's draw calls follow this table (§8.3).

**Slot resolution (NR-3).** When a sheet is loaded — built-in, user-edited, random or host-supplied — the loader takes,
per band, every (semantic, pass) pair that the entity registry declares S14 emits at that band and that the sheet
paints (binds a program to), and resolves it against the band's entries without `derived`: the candidates are the
entries whose pattern matches the semantic (equal to it, or a prefix `x.*` with the semantic under `x.`) and whose
`passes` include the pass or are absent; the winner is the most specific — an exact semantic before any prefix, a
longer prefix before a shorter. The sheet is **refused** when a pair has no candidate, when two candidates tie at the
highest specificity, or when one `derived` kind is placed in two slots of a band. The result is §8.1 item 3's table
from (semantic index, pass) to slot, cached per style version. The shipped sheets place `way.*` pass 1 in slot 5 and
pass 2 in slot 6, while the pier and bridge-deck semantics have exact entries in slot 14 that outrank the prefix, and a
river's casing and body share slot 7 through one entry with no `passes`; a CI test loads every shipped sheet at every
band (§8.3). A refused user edit is shown in the style dialog with each unresolved or ambiguous pair and is not
applied, and a `setStyle` event carrying a refused sheet fails its dry run with the conflict action `invalid` (§7.1),
so no document holds a sheet whose order two loaders could read differently. Chose explicit passes with
most-specific-wins over one slot per semantic, because a way's casing and body must sit in different slots (N-7)
while a river's share one, and over an order fixed in code, because sheets are data (G-R2) and must say where every
casing goes. Chose to place the raised under-copy and the projected shadows as `derived` per-tile operations over
the caster marks over emitting marks of their own, because they are unions computed per tile from the casters'
geometry and heights (§8.4), so extra marks would add a row per caster to the list for no information.

**Presets — each family defines all four bands with invariant roles (VIS-9).** Detail is added band by band, never
re-coloured; added detail cross-fades over the band's hysteresis interval (α 0 → 1 across it); B-ZOOM checks role
continuity (mean roof and mean ground colour ΔE2000 < 2 across every band switch within a family) from the milestone
that ships the family's four bands: `ink` and `lit` at M2b, the ink-family variants at M3b, `hatched` at M5 (§13.4,
§16; N-23).

| family | city | district | neighbourhood | building (stage-3 hook) |
|---|---|---|---|---|
| **`ink`** (default; MFCG family) | figure-ground contract (§8.5), masses, symbolised walls / towers / gates, raised under-copy on (K06; the projected pass stays off), casings `w + 2h` with round joins and caps, hairline furrows, quarter and district labels in letter-spaced small caps, grid, scale bar with old-style figures, 8-ray compass | footprints with thin outlines, yards by role, boundary treatments, every way stroked, way names, library crowns | an ink close-up: ridge hairlines by the roof construction (`skeletonHip` by default), tapered ticks in the ink role at α 0.5 on the roof colour, prism shadows at ink α 0.25 when shadows are on, cobbles as ink stipple, pins as ink symbols, every named way labelled | wings and rooms as ink outlines |
| **`lit`** (FTG family; second preset) | tinted pattern textures at city scale, flat roof tones, raised under-copy with a 2-px penumbra, filled corridors in `road` over `ground` | + `faceLight` on roofs, soft projected shadows when on, hedgerow instances along field bounds, stone-patterned wall band with tower nodes, harbour basin tone with pontoon bars, water `ramp` and `foam` | + pre-shaded crowns per instance, depth-sorted trees, props | wings with per-face light |
| **`hatched`** (NG family; the stage-2 close-up) | masses in the lit roof tone, ground = paper, the street stripe in `road`, wood fills | two-tone roofs by `fakeGablePerWing` | tapered-triangle hatching from the ridge (≈ 17 per wing), one prism shadow pass, lobed crowns in two greens, depth-sorted trees, chimneys and wells | per-wing hatching |
| `parchment`, `bw-print`, `night` | ink-family variants: parchment texture role; monochrome; `lights` role with glow instances | same | same | same |
| `painterly` (reserved; VG family for the village product) | colour ramps, water bands, relief tier on, spotlight vignette, selective outlining | same | same | same |

Faces follow §17.2's ruling — the default label face is IM FELL Great Primer in every family; small caps and old-style
figures come from the font's own substitution tables, or from the family's small-caps cut and lining figures when a
face lacks them (§9.2, N-12).

**`lit` on the reference backend (VIS-7).** Every `lit` program runs on Canvas2D: textures are `pattern` fills of
greyscale seamless tiles tinted by the role colour (multiply); lighting is `faceLight` per face from stored geometry,
one directional light from the sheet's sun — in `path` sun mode from the sun's **light step**, its path position
quantised to 15° of azimuth and 5° of altitude, which every tile of the view shares (§8.4; NR4-5); soft shadows are `shadowPass` polygons with `penumbraPx`: the shadow polygon
plus two outward offset rings at ½ and 1 penumbra with α ⅔ and ⅓ — vector, no bitmap filter, so Fantasy Manor's ≈ 90 %
bitmap-shadow cost is avoided; canopy shading is baked into the crown sprites per (style, light step) — once per
session with a `fixed` sun, once per light step with a `path` sun (§8.4, §8.10); the
water depth ramp and foam are `ramp` and `foam` over the shore-distance field, per tile (≈ 1.3 ms per 512² tile). The one
thing not drawn is per-pixel normal-map relief on roofs and walls; `lit` uses per-face tones plus texture instead, and
the style dialog says so. **Texture set** (our own, procedural: generated by `plat/tools/textures/`, inside the product
repository (§17.1 (3)), with fixed seeds; every file in `plat/assets/textures/` names that script and its seed (§17.1
(5)); no third-party texture; NF-S11): tilled soil, grain, pasture, meadow, orchard ground, marsh, sand, pebble,
rock / cliff, paving stone, clay tile, thatch / shingle, wall stone, water ripple, parchment — 15 greyscale 256 × 256 px
toroidal tiles (≈ 1 MB raw, ≈ 0.6 MB as PNG), metres per tile per band in the sheet; crop and livestock variants of the
arable and pasture tiles are chosen by `LandUse.crop` and `LandUse.livestock` when present (VS27) and by the land-use kind
otherwise; authored in M2b (≈ 1 person-week). Chose Canvas2D as `lit`'s reference backend over WebGL2 because one drawing path keeps screen, PNG
and print identical (O12 c), removes the duplicate render path both creators warned about, and every part of the lit
look has a vector or per-tile raster form inside the tile budgets; normal-mapped relief is the only loss.

**Style constraints.** The contrast matrix above; the option-interaction matrix test (no option silently disables
another — MFCG's Block mode dropping trees); every preset survives a render with no fills and one with no outlines (R13).

=== REPLACE 8.3 Symbol catalogue and draw-style census ===

### 8.3 Symbol catalogue and draw-style census

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r5); earlier: revised by opus stand-in (fixall/integrate-r4); drafted by fixall/draft-rendering-r4; earlier revision fixall/integrate-r3, drafted by fixall/draft-rendering-r3

**Catalogue.** Filled faces with hairline outlines; cased ribbons with square lane ends at kerbs; shore marks per bank
segment; repeated-offset shoreline bands; raised under-copies and prism shadows from heights; library crowns (20 per
class per style, §8.10); clipped hatching at a per-face angle and tapered ticks; one composited shadow pass per layer;
tinted pattern textures with per-face light; field-raster ramps, hillshade and contour / hachure marks; curved per-glyph
text with a role halo; point symbols for the whole pin vocabulary of §2.7 (tent, stall, well, fountain, large tree,
cross, market cross, shrine, pump, trough, gallows, statue, monument, bandstand, campfire, fire pit, lamp post);
screen-space furniture (§9.5). Every semantic visible at a band has exactly one registry glyph, from which
the legend is generated (O12 d).

**Draw-style census** (G-R2 / G-R18): a regression suite per preset, run on the golden suite (§13.3) and in B-ZOOM
(§13.4). Order parity is defined, not assumed: *the reference's recorded order is a subsequence of the preset's order,
and every semantic the reference never drew sits at a declared slot with a reason* (§8.2's `OrderSlot`s) (VIS-16).

| check | presets | pass |
|---|---|---|
| casing Δ = 2h on every ribbon, at every settled view | all | ± 0.1 px (hairline fidelity) |
| 0.5-px hairline ink coverage at 1× | ink | 50 % ± 10 % |
| round joins and caps | ink | ≥ 99.9 % |
| drawn wall, tower and road-core widths against MFCG at the matched scale (MFCG size 40, 0.816 px/m) | ink | within ± 15 % of 6.2 / 12.4 / 6.5 px |
| outline share of footprint pixels at the city band, default view, every rung | ink | ≤ 25 % |
| walls after buildings; wall-symbol pixels inside plots | ink | order holds; 0 pixels |
| order parity | all | subsequence and declared slots, as defined above |
| draw order: the (slot, pass) sequence of every tile's draw calls, logged by an instrumented raster (N-7) | all | non-decreasing in the style's slot table, then in pass, in every tile |
| sliced rasters (NR3-2): per preset and band, the golden views' densest district-band and neighbourhood-band tiles and a whole-CITY city-band view, each tile rastered by one `step(Infinity)`, by `step(1)` until done, and by `step(1)` with another tile's job, a furniture query and a band answer for districts outside the tile served between every two steps (§8.9) | all | pixel-identical in the three runs; the logged (slot, pass, z, key) call sequence identical |
| sliced placement (NR4-2): per preset, every golden view's stop and the stop of an A2 300-dpi export of a golden CITY, S13b run by one `step(Infinity)` and by one unit per step, with a furniture query, a raster step and a band answer for districts outside the view served between every two steps (§8.9, §9.2) | all | identical placement digests (§13.3) |
| light steps (NR4-5): a METROPOLIS view in `lit` with `prism` shadows and a `path` sun advanced one 1° step per frame across three light steps and then stopped, on a tier with shadow layers and on one without, both at tile DPR 1 (§8.4, §8.8) | lit | after the stop, every cached `under` and `over` (or `base`) tile of the view carries the final light step; the two tiers' tiles equal outside the projected-shadow pixels; the view pixel-identical to a fresh render at the final sun |
| slot resolution: every (semantic, pass) pair the entity registry emits at a band and the sheet paints, resolved by §8.2's rule (NR-3) | every shipped sheet at every band in CI; every sheet at load | 0 unresolved, 0 ambiguous; each `derived` kind in one slot per band |
| contrast matrix (§8.2) on the rendered city band | all | every pair present at or above its floors |
| text against its halo, every placed glyph (N-3) | all | the label floor (ΔE2000 ≥ 40, ΔL* ≥ 50), halo role by §9.4's rule |
| foam on `quay` and `sheltered` shore segments | lit | 0 % |
| tree marks over a tier-1/2 casing at the city band | all | 0 pixels |
| casing pixels inside junction mouths on district boundaries | all | 0 |
| role continuity across band switches | each family | mean roof and ground ΔE2000 < 2 |
| decoration stability over a city → neighbourhood → city sweep, for stamped classes (woods, gardens, parks, scatter) and jittered `grid` (orchards) and `line` (avenues, hedgerows) classes (N-10) | all | each instance appears at most once and keeps its position; every coarser band's set is a subset of the finer band's; an unchanged view re-renders pixel-identically |
| render-time keys: an unchanged model saved, reloaded and rendered, and derived in two district orders (NF-D10) | all | tiles pixel-identical to the first render |
| render keys across seeds: two B-CITY-lite seeds per rung, every pair of entities with equal lineage hashes (VD2-6) | all | the render keys differ for every pair |
| stamp tiles: the H128 of each (class, tile index) tile of the shipped asset — its points' centimetre coordinates and ranks in point-index order (§8.10; NR-6, NR3-7) | all | as loaded in the generation worker and in the tile worker: equal to the asset's stored value (PR tier; every session checks it too, §8.10); as rebuilt by `plat/tools/stamptiles/`: byte-identical to the shipped asset on the five engines (Node x86 / arm64, Chromium, Firefox, WebKit; nightly); a moved stored value is a view shift (§13.3) |
| stamp-tile seams (NR4-1): per stamped class, every 2 × 2 arrangement of cells drawing its four tiles — all 256, which include every ordered pair of tiles side by side in both directions and every corner — for the full point sets and for the rank subset of every band that draws a subset (§8.10's r < s_b) | all | 0 pairs of points in different cells closer than r₀ (an integer test on tile centimetres); `plat/tools/stamptiles/` refuses to write an asset that fails, and the PR tier re-runs the check on the loaded asset |
| roof lines outside their footprint (the F-SKELETON plain downgrade) | all | 0 |
| per wing, `hatched` | hatched | hatch triangles 15–20; no ridge stroke; outline = footprint only (NG BG-3; N35) |
| two-tone roof law with our palette | hatched | dark = lit × lerp(ambience, shadow, α) within ± 0.02 (IMP-15) |
| water bands | painterly | band widths follow W · (i / N)^1.5 for our N and W within 1e-4 |
| label floors, counts, collisions | all | §9.4 |
| street-edge recoverability, access ways drawn | ink | §8.5 |

=== REPLACE 8.4 Layers, shadows, heights ===

### 8.4 Layers, shadows, heights

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r5); earlier: revised by opus stand-in (fixall/integrate-r2); drafted by fixall/draft-rendering-r2

* **Layers** draw in `zOrder`: `underground` marks (sewers) through a cut-away mask or a translucent overlay; `sky` marks
  above, with their shadows projected onto the ground layer. `LayerSpec` gains an occlusion policy (VIS-17):

  ```ts
  interface LayerSpec { id: Layer; zOrder: number; elevationCm: Cm; visible: boolean; castsShadowOnto?: Layer; exportSeparately: boolean;
    occlusion: 'opaque'|'ghost'|'offset';   // how a sky layer treats the ground it covers
    ghostAlpha: number;                     // ghost: the covered ground shows through at this share (default 0.35)
    offsetPerMetre?: [number, number] }     // offset: the layer is drawn displaced by elevation × this screen vector (default [0, 0.25] px per m, up the screen) with a tether line to its ground footprint
  ```

  `opaque` hides the ground beneath; `ghost` (the default for `sky`) draws the layer at alpha 1 − g so the covered
  district stays readable; `offset` moves the whole layer clear of its footprint so the ground is fully visible. Where an
  island is placed (over water, fields or outskirts by default; over the built core only by assignment) is decided by
  §4.2 S1 (2), `SkyIsland.placement` (§2.7) and II.6's placement rule (N-9 d); B-ZOOM reports the ground area occluded
  by sky layers. The island generator itself is owner-staged; these fields
  are its hook.
* **Two different things, stated separately (K06).** The **raised under-copy** (`raised`) is MFCG's Raised: a dark copy
  of each footprint beneath it at one constant offset (§8.2's symbolisation row) — ON by default in `ink`, not a shadow
  and not height-dependent. **Projected shadows** (`ShadowPass(layer, sun)`) are height-derived and OFF by default
  (owner: shadows optional).
* **Shadow casters** (WC5): buildings and wings (prism from `baseCm` to eave and ridge), towers and gatehouses (prism),
  curtain walls (prism of the band), bridges and piers (deck prism over water, which VG draws), trees (crown offset by the
  crown height), sky layers (the island outline projected by `elevationCm`). Every caster projects along the sun vector
  from its base elevation (`baseCm`, FTG-13) onto the ground; the ground under a footprint lies within the plinth
  tolerance of FTG-13's invariant, so a flat projection from the base is exact to that tolerance; a wing's foundation
  skirt (§2.6) is part of its prism. Shadows are unioned per layer and composited once per layer per tile — into the base raster
  in `fixed` sun mode, and into a per-tile shadow layer of their own in `path` mode where the tier's canvas budget admits
  it (§8.8), so a moving sun re-rasters only shadows. `drop` mode offsets each caster's footprint by height ×
  cot(altitude) along the sun's azimuth; `prism` mode draws the swept prism; both from the same heights.
* **Sun (K05).** `SunSpec = { azimuthCdeg; altitudeCdeg; colour: Color; intensity: number; mode: 'fixed'|'path'; latitudeDeg: number /* path mode; default 50 */ }`;
  fixed by default (azimuth 315°, altitude 45°: light from the upper left); in `path` mode azimuth and altitude come from
  `sunPath(latitudeDeg, dayOfYear, hour)` (solar declination and hour angle, evaluated with `dmath`), driven by the
  view-state time (§11.3; the simulation module's clock when it runs), the hemisphere following the latitude's sign;
  the shadow pass reads the path-mode sun quantised to 1° in azimuth and altitude (§8.8, N-8), and every other
  program that reads the sun — `faceLight`, the two-tone `roof`, `hillshade` and the `lit` crown bake (§8.2, §8.10) —
  reads its **light step**, the path-mode sun quantised to 15° of azimuth and 5° of altitude (NR4-5);
  below −6° the sheet switches to its night variant (`night` roles; `lights` glow instances from the module); shadow
  length is capped at 8 × height near sunrise and sunset. Shadows are vector, so there is no shadow-resolution setting.
* **Budget (AM-3).** The projected pass costs ≤ 20 % of a tile's raster time (vector offsets and one union per layer);
  Fantasy Manor's ≈ 90 % bitmap-shadow cost is avoided by construction, and `penumbraPx` (§8.2) is two vector rings, not
  a blur. **Measurement:** M2b times the pass on METROPOLIS tiles with `prism` shadows on. **Pre-decided fallback:** a rung
  that misses the budget draws `drop` mode instead of `prism` (the same heights, one offset polygon per caster), and the
  report says so. **A moving sun (N-8):** in `path` mode one 1° step re-rasters the visible tiles' shadow layers and
  re-composes them — ≤ 20 % of the view's settle raster plus ≈ 0.2 ms per tile, inside the settle budget of §12.5 — and
  a newer step cancels an older step's pending tiles (latest wins); on a tier whose budget has no room for shadow layers
  the step re-rasters the base tiles instead, within the same settle budget. **Measurement:** M2b times steps on
  METROPOLIS views with the sun advancing one step per frame, on the reference and low-end devices. **Pre-decided
  fallback:** a tier whose step misses the settle budget quantises the path-mode sun to 3° instead of 1° (one step in
  three), and the report says so. **Light steps (NR4-5).** When the path sun enters a new light step, a **light pass**
  first bakes the `lit` crown sprites for it (§8.10) and then re-rasters the visible tiles' `under` and `over` layers —
  or their `base` layers on a tier without shadow layers — at that step, centre-out, like a settle (≤ 150 ms at CITY,
  ≤ 250 ms at METROPOLIS, §12.5), each tile swapped in when ready. A light pass is never cancelled by a newer light
  step: the newest step waits and starts its own pass when the running one completes, skipping any steps between, so
  the view reaches one light step within two settles and never re-rasters without finishing; 1° shadow steps go on
  beside it (latest wins). Every raster of the view uses its **drawn light step** — the running pass's step, or the
  last completed pass's — so a tile newly exposed during a pass is rastered at the pass's step. Once a pass
  completes, no tile of the view keeps another light step, and a tier with shadow layers and a tier without draw the
  same roof and crown tones for the same view (§8.3's light-step row). **Measurement (M2b, in the moving-sun runs
  above):** every light pass within the settle bound and the crown bake ≤ 20 ms per light step (§12.7). **Pre-decided
  fallback:** in `path` mode `faceLight`, the two-tone roofs, `hillshade` and the crowns hold the sheet's fixed sun —
  only the shadows follow the path — and the report says so. Chose quantised light steps for the lit programs over the
  1° sun because every 1° step would then re-raster the `under` and `over` layers too — a full settle per frame of an
  animated sun — while a 15° / 5° step moves each face's tone in whole steps that every tile shares, a few times per
  simulated hour; and over holding the fixed sun as the primary, because shadows that swing with the hour beside roofs
  whose light never moves contradict each other (the fallback accepts that, reported). Chose to let a light pass
  finish over latest-wins cancellation, which the shadow steps use, because a light pass is a whole settle and an
  animated sun would otherwise cancel it before it completes, leaving tiles of several light steps side by side.
* **Heights** come from §2.6 for every building, wing, tower and roof, so shadows, glTF and CityJSON agree (O17 g).

=== REPLACE 8.8 Tiles, zoom stops, print and the canvas budget ===

### 8.8 Tiles, zoom stops, print and the canvas budget

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r5); earlier: revised by opus stand-in (fixall/integrate-r2); drafted by fixall/draft-rendering-r2

* **Pyramid (N-9 a).** Zoom stops (`ZoomStop`, declared in `@plat/model`, §14, so `@plat/labels` and `@plat/render`
  share it without either importing the other's code) at 2^¼ steps of scale (four per doubling) cover B-ZOOM's 1:50 000
  → 1:500 in 27 stops; stop k has a scale of m_k metres per **CSS** pixel. Tiles are 512 × 512 device px at the view's **tile DPR** d
  (the device pixel ratio after the tier's cap, below) and **world-aligned** per (stop, d): tile (i, j) covers the world
  square of side 512 × m_k ÷ d metres whose corner is (i, j) × 512 × m_k ÷ d from the world origin — so tiles are stable
  under panning and shared between views and exports at that stop and DPR.
* **Content (GEO-28, N-7).** A tile draws every mark whose bbox meets the tile dilated by a margin m = the largest of
  the casing half-width, the drawn wall half-width, the projected-shadow length, the largest crown radius and the halo
  width at the stop, in the slot-major order of §8.1 item 3 (every mark of a slot before any mark of the next, passes in
  order inside a slot), identical in every tile. Each tile clips to its own square, so the same scene clipped on
  both sides of an edge yields the same pixels: no seams and no casing bar across a junction on a district boundary.
  Fills of one semantic within a tile are one `Path2D` with the non-zero rule (a union: no anti-aliasing seam between
  same-role neighbours); semantics declared `seamClose` (ground, masses, yard parts, the shadow union) also get a ½-px
  same-colour stroke underneath (NG's seam dilation). Render tests: 0 casing pixels inside junction mouths on district
  boundaries; the census's draw-order check (§8.3).
* **Layers of a tile and composition (N-5).** The tile worker rasters a **base** layer per tile (slots 1–20 of §8.2)
  and keeps it; it then **composes** the tile — the base, the glyphs of the labels placed at that stop (§9.2) and the
  `overlay` live marks (§8.2) — into one bitmap and transfers that to the main thread, one bitmap per tile position. A
  label edit, a label toggle, a selection or a moving person re-composes the tiles it touches (≈ 0.1 ms per tile plus
  ≈ 1 µs per glyph) and never re-rasters a base. In `path` sun mode (§8.4), on a tier whose budget admits it, the base
  is rastered as `under` (slots 1–9) and `over` (slots 11–20) with the projected shadows (slot 10) in a layer of their
  own at half resolution (256² per tile; the penumbra rings already soften its edges; bilinear-scaled when composed), so
  a 1° step of the sun re-rasters only the shadow layers, and only a new light step (15° / 5°, §8.4) re-rasters `under`
  and `over`, through §8.4's light pass. Chose composition in the tile worker over two tile layers
  committed separately to the main thread because it halves the bitmaps committed at first paint and the main thread's
  draws per frame at the same memory (the worker keeps the base the labels are composed on), while a label change still
  never re-rasters the map.
* **Cache and invalidation (LC-23, N-8).** Tile key = (stop, i, j, tile DPR d, tile layer — `base`, or in path mode
  `under`, `shadow`, `over` —, style version, the view-state switches that change that layer's pixels: season, weather,
  shadows on or off and their mode, model-layer toggles and `base` live layers; for the `shadow` layer — or, while
  projected shadows are on, for the `base` layer on a tier without shadow layers — the path-mode sun's azimuth and
  altitude quantised to the tier's sun step (1°, or 3° after §8.4's fallback); and for the `under` and `over` layers —
  or the `base` layer on a tier without shadow layers — of a sheet whose programs at the band read the light
  (`faceLight`, the two-tone `roof`, `hillshade`, `lit` crowns), the light step (§8.4; NR4-5); in `fixed` mode the
  sheet's sun belongs to the style version). Content version
  = the combination of the `revision`s of the marks drawn. A composed bitmap is keyed by its base key plus the label
  placement's revision at that stop and the `overlay` providers' versions. A `DisplayDelta`'s dirty boxes invalidate
  every cached tile they meet, at every stop and DPR. In path mode a new 1° step invalidates only the layers keyed by
  it, and a newer 1° step cancels an older one's pending re-rasters (latest wins); a new light step invalidates the
  layers keyed by the light step, which §8.4's light pass re-rasters to completion.
* **Canvas budget per hardware tier (N-9 b).** Every canvas the view needs is counted: per visible tile position the
  worker's base (1 MB at 512²) and the main thread's composed bitmap (1 MB); the next coarser stop's composed bitmaps
  kept for gestures (≤ 1 MB per visible position); and fixed scratch — the shadow and post-operation buffers (2 MB), the
  crown library's sprites (with a `path` sun in `lit`, one set per cached light step: the drawn step's set always,
  earlier sets while they fit, §8.10) and the glyph atlases (≤ 5 MB). With P the worst-case number of tile positions covering a
  W × H CSS-px view at tile DPR d, P = (⌈W·d ÷ 512⌉ + 1) × (⌈H·d ÷ 512⌉ + 1), the need is **3P + 7 MB**, and
  **4.25P + 7 MB** with path-mode shadow layers (`under` and `over` replace the base; the shadow layer adds ¼ MB). Tier
  ceilings: low 72 MB, mid 128 MB, high 192 MB; tile-DPR caps: low 1, mid 2, high 3. The tile DPR is the device's pixel
  ratio capped by the tier, then stepped down (3 → 2 → 1.5 → 1) until 3P + 7 MB fits the ceiling; path-mode shadow
  layers are used only where 4.25P + 7 MB also fits, and otherwise a sun step re-rasters the base. Worked cases
  (`docs/validation/bench/fixall_rendering_r2_budgets.out`): the reference view, 1 440 × 900 CSS px at DPR 2, has
  P = 35 and needs 112 MB (156 MB with shadow layers) — mid or high tier; the low-end device at 1 366 × 768 or
  1 920 × 1 080 at DPR 1 needs 43 or 67 MB — inside the low tier's 72 MB with the fallback stop, the scratch buffers
  and the atlases counted. Cached tiles beyond the visible and fallback sets are evicted least-recently-used by bytes.
  The tier is chosen when the app starts, from the Canvas2D part of `bench/calibrate` (8 fixed tiles, ≈ 40 ms) and the host's
  reported device memory, can be overridden in the advanced panel, and is shown with the tile DPR in the view status.
  Chose a budget derived from the viewport over fixed per-tier numbers because the old low tier's 24 MB equalled the
  visible base and label tiles of a 1 366 × 768 view with nothing left for the fallback stop and the scratch buffers
  (N-9 b), and the mid tier's 64 MB could not hold the reference view at DPR 2.
* **Gestures (SCL-7, VIS-6).** During a pinch or wheel zoom the compositor shows the nearest cached stop's composed
  tiles scaled (GPU-composited bitmaps; the labels scale with them, which keeps them apart); 120 ms after the input stops
  the view animates (≤ 150 ms) to the nearest stop and the tile worker re-rasters the visible tiles centre-out, swapping
  each one in when ready. Panning composites cached tiles and shows newly exposed ones from the next coarser cached stop
  until they are rastered. While a gesture runs, at most 4 new bitmaps are committed per animation frame; at first paint
  and at settle every ready tile is committed in the frame it arrives (§12.5). Chose settling on exact 2^¼ stops over
  re-rastering at arbitrary scales because an arbitrary-scale raster defeats the cache and the per-stop label placement;
  the settled scale is within ± 9 % of the requested one, and every settled view has exact hairlines, exact casings and
  a collision-free label set.
* **Print and large PNG (O12 e).** Horizontal bands of tiles (512 device px high) are rastered and composed at the
  export scale and each band's scanlines are streamed into the PNG encoder — each row filtered by the **per-row rule**
  (of PNG's five filter types, the one whose filtered bytes have the smallest sum of absolute values, each byte read as
  a signed value; NR4-4), then one zlib stream through the platform's `CompressionStream` in browsers and `zlib` at
  level 6 in Node — and written as IDAT chunks band by band; §12.7 holds the encoding's time and its fallback. Peak canvas memory
  is one band (A2 at 300 dpi: 7 016 px × 512 px × 4 B ≈ 14 MB); no canvas is larger than a tile band. Per-layer
  transparent PNGs use the same path with the layer set restricted.
* **Warp preview (SCL-9).** While a warp brush is held, the moved L1 vertices are applied to a transient copy of the
  affected ways' and blocks' marks, and only the tiles meeting the brush's dirty box re-raster (≥ 30 fps for a brush
  radius ≤ 150 m at the district band). **Apply** commits the `warp` event (§7.1), whose invariants and re-derivation run
  then; **Discard** drops the copy — MFCG's staged warp, on our event model.

=== REPLACE 8.9 Backends, text, threads and the worker boundary ===

### 8.9 Backends, text, threads and the worker boundary

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r5); earlier: revised by opus stand-in (fixall/integrate-r4); drafted by fixall/draft-rendering-r4; earlier revision fixall/integrate-r3, drafted by fixall/draft-rendering-r3

* **Canvas2D is the reference backend of every shipped preset** (`ink`, `lit`, `hatched` and their variants), running
  on an `OffscreenCanvas` in the tile worker, through the resumable raster jobs below (NR3-2); programs render typed-array paths, one `Path2D` per (program, semantic,
  variant) per tile, sprites by `drawImage`.
* **SVG** is written from the same display list (§11.1).
* **WebGL2 draws no marks.** It exists only as a **pre-decided fallback compositor** that uploads the composed
  Canvas2D tiles as textures, composites them with the view transform and runs the post operations as one fragment pass
  — so there is no stroke tessellation, no SDF text and no look that differs by backend (VIS-7). Measurement at M2b: pan
  and zoom frame rates of the Canvas2D compositor on the reference and low-end devices at METROPOLIS scale (§12.5); the
  WebGL2 compositor is enabled for a hardware tier only if the Canvas2D compositor misses ≥ 60 fps (reference) or
  ≥ 30 fps (low end) there.
* **Text (DEF-6).** All text is drawn by Canvas2D in the tile worker's composition step (§8.8), glyph by glyph at the
  positions computed from the bundled font's own metrics (§9.2), through a glyph atlas per (face, size, stop): each glyph
  is drawn once into the atlas and copied per placement. SVG writes the same per-glyph positions — as the face's own
  glyph outlines by default, or as text in the embedded face on request (§11.1, N-13). Chose Canvas2D glyphs composed
  onto the tiles over SDF text because, once tiles are composited, text never needs to be drawn by the GPU, and one text
  path keeps text identical on every output. Measurement at M1: a tile's label composition ≤ 3 ms at ≤ 150 glyph runs;
  pre-decided fallback: whole words cached as bitmaps per (text, size, stop) in the atlas.
* **Threads (N-4).** (1) The **generation worker** holds the document and the model and runs S0–S14; it also resolves
  instance overrides (§8.10), runs the live-layer providers (§8.2), builds on-demand bands — the district, neighbourhood
  and building bands of the districts a band request names (`DisplayListBuilder.build(model, band, groups)`) —, writes
  every export (§11.1: SVG from a transient list it builds and releases; raster formats from a transient list it builds
  and transfers to the tile worker with the request; NR-5, NR3-6),
  answers the API's `hit` and `inView` queries (§11.2) from the model and the 24-B index it keeps (the entity, bbox and
  group columns — all a hit test or a features-in-view list reads), and hands stage-3 `compose()` and close-up
  derivation (§8.6) to the derivation pool. (2) The **derivation pool** — up to three
  workers — runs the per-district stages at every rung (§12.3; the merge protocol of §4.1) and, on request, `compose()`
  and close-up derivation from the committed state of the district it is handed; with the pool off the generation worker
  runs them itself. (3) The **tile worker holds no model**: it holds the display list with its label, instance and
  string tables — the only full copy (§8.1 item 6) — and from them rasters base layers, runs label placement (S13b,
  §9.2) and decoration instancing (§8.10), composes labels and `overlay` live marks onto each tile (§8.8) and runs the
  post operations; it answers the main thread's furniture and snap queries and rasters the generation worker's raster exports from the
  transient list each export request carries (§11.1; NR3-6), all of it through the queue below; everything it needs
  arrives through the table below. (4) The **main thread** runs the UI, compositing
  of the transferred tiles, pointer hit-testing on the hit-test slices, screen-space furniture (§9.5) — whose placement
  scores and ruler snaps it asks of the tile worker (below) — and input. Nothing model-sized ever reaches the
  main thread.
* **What crosses (SCL-6, N-4).**

  | from → to | what | how | bound |
  |---|---|---|---|
  | generation → tile worker | display-list deltas: mark columns (with `key`), geometry, field rasters, and the rows of the label, instance and string tables they change (candidates, priority, parent node, pinned placement and `hidden` per label; stamp parameters, species mix and resolved overrides per `instances` mark) | transferred: the generation worker copies each slice into a fresh buffer and transfers it, and keeps only the 24-B index columns (§8.1 item 6) | O(changed marks); ≤ 96 B per label row, ≤ 40 B per instance row, ≤ 16 B per species row, ≤ 32 B per override row, plus geometry and UTF-8 text |
  | generation ↔ tile worker (cross-origin-isolated hosts only) | the mark table | `SharedArrayBuffer` columns, no copy — optional, never required (it needs COOP / COEP from the embedding host) | — |
  | tile worker → generation | band requests: the districts (group handles) and band that tiles entering the view need and the tile worker lacks, and the buildings needing `compose()` at the building band | copied | ≤ 4 KB per request |
  | generation or pool → tile worker | the answers: on-demand band marks, `compose()` wings and rooms, close-up marks, as `DisplayDelta` slices naming the request | transferred | ≤ 1 MB per answer |
  | generation → tile worker | live-layer marks (`live.<id>` groups), when the view state a provider reads, the model or the visible region changes | transferred | ≤ 256 KB per delivery |
  | tile worker → main | composed tile `ImageBitmap`s; per-tile hit-test slices (mark bboxes + entity handles) | transferred (zero-copy) | ≤ 1 MB bitmap + ≤ 64 KB slice per tile |
  | main → tile worker | furniture-placement queries (view, stop, ≤ 16 candidate boxes: the compass's eight, the title's and the legend's four corners) and snap queries (a pointer in world cm, a radius in px, the stop), each with a request id (NR-4) | copied | ≤ 4 KB per query |
  | tile worker → main | per candidate box its `ObstacleSource.coverage` record; the snapped point from `RoleIndex.snap`, or none (NR-4) | copied | ≤ 4 KB per answer, within one 16.7 ms frame (below) |
  | generation → tile worker | raster-export requests — PNG, print and the `.dd2vtt` scene image: frame, scale, band, layers, post operations and the export's zoom stop (§8.7; NR-5) — each carrying the export's transient list: its mark, geometry, label, instance and string tables for the export's band and frame (§11.1; NR3-6) | the request copied; the list's columns transferred | ≤ 4 KB plus the list (≈ 1.9 KB per building at the city band, §12.8) |
  | tile worker → generation | the encoded raster: PNG bytes, streamed band by band (§8.8); a progress message per band (bands done, bands total) for the export dialog (NR3-6) | bytes transferred; progress copied | the file's size; < 64 B per progress message |
  | main → workers | view changes, input, API calls (§11.2) | copied | small |

  Budget: main-thread receive work ≤ 4 ms per delivery (bitmaps and slices only), measured in B-CITY's browser runs.

  **Resumable rasters (NR3-2).** A worker serves its message queue only between two calls it makes, so a tile is
  rastered by a job the tile worker can stop and resume:

  ```ts
  // @plat/render — the tile backend (§14 declares the same). A tile address is §8.8's (stop, i, j, tile DPR); an export's tiles are addressed at the export's stop and DPR
  type TileAddress = { stop: number; i: number; j: number; dpr: number };
  interface TileRasterOpts { layers: Layer[]; tileLayer: 'base'|'under'|'shadow'|'over'; shadows: 'off'|'drop'|'prism' /* §8.2's StyleSheet.shadows.projected */;
    sun?: { azimuthCdeg: number; altitudeCdeg: number }; tier: 'low'|'mid'|'high'; dpr: number }
  interface TileBackend { begin(tile: TileAddress, list: DisplayList, style: StyleSheet, opts: TileRasterOpts): RasterJob }   // fixes the tile's draw sequence; draws nothing
  interface RasterJob {
    step(deadlineMs: number): boolean;   // runs the draw sequence on from where it stopped and returns after the first draw call that ends deadlineMs or more after this call began; true when the tile is complete
    finish(): ImageBitmap;               // once step() has returned true: the finished layer, its canvas transferred
    cancel(): void;                      // drops the job and frees its canvas: the tile left the view, a newer sun step, a delta that dirties the tile
    readonly spentMs: number;            // tile-worker time spent so far; the budgets and the census read it
  }
  ```

  `begin` finds the tile's content — every mark whose bbox meets the dilated tile (§8.8) — and fixes its **draw
  sequence**: the native calls in §8.1 item 3's (slot, pass, z, key) order, each a fill or stroke of one batched
  `Path2D` (≤ 80 per tile, §12.5), a run of ≤ 64 sprite draws (crowns, glyph copies), or a derived per-tile operation
  (the projected-shadow union, the raised under-copy, a post operation; §8.2, §8.4). `step` runs the sequence on from
  where the last step stopped. The JavaScript that prepares a call — appending the marks' rings to its `Path2D`,
  generating a stamp's instances (§8.10) — reads the clock after every mark and every 64 instances and can stop there;
  a native call is never split (a batched fill split in two would draw anti-aliasing seams between same-role
  neighbours, §8.8), and a derived operation, which uses the shared shadow and post-operation buffers (§8.8), runs
  whole inside one step. The overrun past the deadline is therefore at most one native call or one derived operation.
  Each job owns its canvas and its context state, and what it reads does not change under it: deltas are applied
  between steps, a removed mark becomes a dead row and an added mark a new row, and the tile worker compacts its list
  only while no job is live, so a live job's mark indices stay valid; a job whose tile a delta's dirty boxes meet is
  cancelled and queued again, its pixels being stale. Slicing therefore changes when the calls run, never which calls
  run or in what order: a tile rastered whole and in 1-ms slices is pixel-identical (§8.3's census row). The queue
  below calls `step(8)` — `step(4)` after the pre-decided fallback.

  **The tile worker's queue (NR-4, NR3-6).** Between two steps the tile worker serves its message queue, then runs one
  step of the highest class that has ready work:

  | class | work | why it stands there |
  |---|---|---|
  | 1 | furniture and snap queries (below) | an answer is due within one frame |
  | 2 | incoming deltas — edit deltas, band answers, live-layer deliveries — in arrival order; each O(changed marks), ≤ 1 MB per answer (the table above) | a visible tile that needs a band's marks cannot be rastered before its answer is applied, and a tile rastered before a pending delta that dirties it is rastered twice |
  | 3 | the visible view: S13b at the view's stop — a resumable placement job, stepped one unit at a time (§9.2; NR4-2) —; with a `path` sun, after a new light step, the `lit` crown bake (one sprite per unit) and §8.4's light pass; the visible tiles' raster jobs centre-out, their compositions and commits (§8.8); re-compositions for label and `overlay` changes | the picture the user is looking at |
  | 4 | exports: first S13b at the export's stop over its transient list — a resumable placement job, stepped one unit at a time, its memo held by the job (§9.2, §11.1; NR4-2) —; then, band by band, the raster jobs of the band's tiles, the band's composition, read-back (64 rows per step) and encoding (§8.8) | an export waits for the view, never the reverse |

  A class runs only while every higher class is empty, one step at a time, and within a class the job in progress runs
  to completion before the next begins, so at most one raster job per class is live; a query waits for at most one
  step, and a pan or zoom during an export pre-empts the export within one step: newly exposed tiles are rastered at once, not
  behind the export's bands. **No starvation:** an export that has waited 100 ms since its last step runs the next
  step ahead of class 3 (never ahead of classes 1 and 2) — at most one step in any 100 ms, ≤ 8 % of the worker — so an animated view (a
  `path`-mode sun, moving people, a live layer) slows an export but cannot stop it; a settle then contains at most two
  export steps at CITY (≤ 150 ms) and three at METROPOLIS (≤ 250 ms), ≤ 16 and ≤ 24 ms beside the ≈ 42–83 ms settle
  rasters of §12.5. A newer sun step or a tile that leaves the view cancels its job (latest wins; §8.4, §8.8). The
  export dialog shows the tile worker's progress messages (bands done of bands total) and, while class 3 holds the
  worker, that the export is waiting for the view.

  **Placement is stepped like a raster (NR4-2).** S13b — the view's in class 3, an export's in class 4 — is a
  `PlacementJob` (§9.2) that the queue calls with `step(8)` (`step(4)` after the fallback below). Its unit is one
  decision — a label's rung-(5) test, one pin of the pin pass, one push or one decision of the local evaluation, or the
  glyph layout of one placed label — and it reads the clock after every unit, so its overrun past the deadline is one
  unit (≈ 1 µs on average, tens of µs for the longest name). A print's placement over its whole frame (≈ 1 µs per
  candidate, ≤ 20 ms for 20 000 candidates, §12.7) therefore runs as a few class-4 steps with queries, deltas and the
  view served between them, and every bound above — a query waits for at most one step, a settle holds at most two
  or three export steps — holds while an export places its labels. A crown bake after a new light step (§8.4, §8.10)
  is stepped the same way, one sprite per unit.

  **Queries to the tile worker (NR-4).** Compass, title and legend placement (§9.5) and the ruler's snapping read the
  display list, which only the tile worker holds, so the main thread asks for them through the query rows above and the
  tile worker answers with `ObstacleSource.coverage` and `RoleIndex.snap` over its list — the implementations S13b uses
  (§14). A query is class 1: it runs at the next step boundary, so it waits ≤ 8 ms plus one native call or derived
  operation, and runs in ≤ 4 ms of tile-worker time: its answer arrives within one 16.7 ms frame. Most tiles are one
  step (a city-band tile of a whole-CITY view rasters in ≈ 1.2 ms, §12.5). The ruler keeps one snap query in flight — a
  newer pointer position replaces a queued one — and shows the unsnapped point until the answer arrives; furniture
  placement is asked when the view settles, and the furniture keeps its previous place until its answer arrives.
  **Measurement** with the first map (M1 at TOWN and CITY, M2b at METROPOLIS) in B-CITY's browser runs: the query round
  trip p95 ≤ 16 ms during a settle raster, and ≤ 4 ms of tile-worker time per query, with each tile's longest native
  call and derived operation logged beside it; and a scripted pan and zoom during an A2 300-dpi export of a CITY
  (§12.7) — pass: every settle within §12.5's bound, the export completes, and its PNG matches, byte for byte, the
  export made with the view idle and one during which an edit is made (the export's transient list, §11.1).
  **Pre-decided fallback:** the step limit falls from 8 ms to 4 ms (`step(4)`), which halves both a query's wait and an
  export step's share of a settle. Chose queries answered in the tile worker over copying the marks' kinds and vertices
  into the main thread's hit-test slices, because the slices would then carry model-sized geometry to the main thread
  (N-4, SCL-6), and over placing furniture in the generation worker, because its 24-B index has no kinds, vertices or
  placed labels.
  Chose a resumable job — `begin`, `step`, `finish` — over the synchronous `raster()` call it replaces, because a
  synchronous raster makes a query wait for the longest tile in progress and J-R40's one frame cannot be met by an
  implementation that follows it, and over splitting batched calls to bound the overrun, because a batched fill split
  in two draws anti-aliasing seams between same-role neighbours (NR3-2). Chose four fixed classes with a bounded export
  share over first-come order, because an A2 print's bands (up to ≈ 20 s, §12.7) would otherwise sit ahead of newly
  exposed tiles and every settle during the export would miss §12.5's bound, and over strict priority alone, because an
  animated view never empties class 3 and would stop an export for as long as it runs (NR3-6); chose to apply deltas
  and band answers ahead of the view's rasters, where the verifier's order put band answers after them, because
  applying one is O(changed marks) copying and every tile that waits for it is visible work. Chose to step S13b one
  decision at a time — the view's in class 3, an export's in class 4 — over running it whole as one unit, because a
  large print's placement grows with the candidates in its frame and would hold a query and the view behind it, while
  the strict order with its memo makes every unit boundary a safe stop that leaves the result unchanged (NR4-2).
  Chose a handle-and-tiles boundary over sending the document or `Mark[]` objects to the main thread because
  structured-cloning a CITY entity table costs the receiver ≈ 162 ms and a 60 000-mark object list ≈ 140 ms
  (redteam-scale §7.3) — both inside the first-frame budget — while bitmaps and typed arrays transfer in constant time.
  Chose to run every model-reading step — providers, overrides, on-demand bands, `compose()`, close-ups — where the
  model is, and to hand the tile worker display-list tables only, over a model replica in the tile worker, because a
  replica would double the CITY working set (§12.8) and have to follow every edit, while the tables cross as the same
  typed-array deltas the marks already use (N-4).

=== REPLACE 8.10 Decoration instances (trees, scatter, crowns, roof detail) ===

### 8.10 Decoration instances (trees, scatter, crowns, roof detail)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r5); earlier: revised by opus stand-in (fixall/integrate-r4); drafted by fixall/draft-rendering-r4; earlier revision fixall/integrate-r3, drafted by fixall/draft-rendering-r3

```ts
interface InstanceStyle { species?: string /* a species kind of the entity's mix */; crown?: number /* crown-library index */;
  scale?: number /* 0.5–1.5 */; tone?: number /* colour jitter, −1…1 */; leafType?: 'deciduous'|'evergreen' }   // what a `restyle` or `add` override sets (§7.1)
```

* **One instance set per entity, independent of the band.** Every `instances` mark (a wood, garden, park, copse, orchard,
  avenue, hedgerow, yard planting or scatter class) has one set of positions, in one of three layouts: a **stamp** of a
  per-class blue-noise tile for areas; a jittered **grid** for orchards (6–8 m); a jittered **line** for avenues and
  street trees — along the row §4.9 derives in the planting district's own half-corridor strip at `Greenery.along`'s
  `offsetCm` from the kerb (no plat edge) — and for hedgerows along their L3 field-boundary chains (8–12 m along the
  line). S14 draws the layout's parameters — offset, rotation, and the spacing in whole centimetres inside its class's
  range (§4.9; 300–500 cm for woods, 400–600 cm for gardens) — from the entity's `render.instances` stream (§6.1) in
  the generation worker and carries them in the mark's `InstanceTable` row (§8.1).
* **Tiles (NR3-7, NR4-1).** Per stamped class: four toroidal blue-noise tiles of 6 400 × 6 400 cm at the **reference
  spacing** r₀ = 400 cm (≈ 162 points each; `docs/validation/bench/fixall_rendering_r5_seamstrip.out`), each point
  carrying a **progressive rank** (void-and-cluster order: every prefix of the ranked list is itself evenly spread — the
  quarter of lowest rank keeps ≈ 1.5–1.8 × r₀ between any two of its points, measured by the same benchmark). The four
  tiles are **seam-compatible**: they share one **border band** — every point whose edge distance
  e = min(x, 6 400 − x, y, 6 400 − y) is below r₀ ÷ 2 — and differ only inside it (the construction below). An entity
  whose spacing is r stamps them scaled by s = r ÷ r₀: blue noise scaled is blue noise at the scaled spacing, so one set
  of tiles serves every spacing of the class (a wood at 3 m stamps 48-m tiles, a garden at 6 m 96-m tiles). **No two
  instances of one stamp lie closer than the entity's spacing** (less ≤ 1.5 cm of centimetre rounding, *Stamp* below):
  inside a cell because each tile is spaced at r₀ toroidally, and across every seam, between cells of any two variants,
  because a point outside the band lies at least r₀ ÷ 2 from its cell's edges — so two such points in different cells
  are at least r₀ apart — while a band point is present, at the same position, in the other point's own tile and was
  spaced against it there (toroidally — a distance never larger than the one across the seam). Every band draws a
  subset of these points (its ranks below s_b, below), so the same holds at every band. Measured on five seed sets
  (`fixall_rendering_r5_seamstrip.out`): 0 pairs closer than r₀ across cells in all 256 arrangements of 2 × 2 cells,
  for all ranks and for the rank < 0.6 and < 0.25 subsets, where four independent tiles have 3.5–5 such pairs per 64-m
  seam (NR4-1). The tile variant used by a stamp cell is `RH32('stamp.variant', key, salt, u, v) mod 4` (§8.1 item 5),
  which breaks visible repetition: only the band, ≈ 11–14 % of a tile's points, repeats in every cell. The tiles are
  built once, when the product is built, and shipped (below); nothing samples or ranks at run time.
* **One construction everywhere (NR-6, NR3-7, NR4-1).** A class's band depends on the class alone, and each tile on
  (class, tile index) and the band; all are built by `plat/tools/stamptiles/` — a build-time script in the
  product repository, like the texture set's (§8.2) — with `@plat/kernel`'s `poisson` module (§14), held to §6.5's
  allowlist lint like every model package, so any machine that runs the script builds the same bytes. Its random
  source is `rng.stream` (§6.1, §14) with a **constant entity key** — §6.1's four-lane finaliser over the words (a fixed
  stamp-tile domain constant, the decoration class's registry index, the reference spacing 400 cm, and the creation
  index: 0–3 for the four tiles, 4 for the class's band) —, the stage `STAGE_VIEW`, the non-rerollable concern
  `render.stampTiles` (§6.1's registry) and reroll, attempt, epoch and salt 0. **Sampling:** Bridson with k = 50
  candidates, all evaluated (the reference variant, paid once per release instead of per tree). Every accepted point is
  rounded at once to integer centimetres inside the 6 400-cm tile, so the spacing test is an exact integer comparison
  of squared toroidal distances with r₀². The first point is (`int(0, 6 399)`, `int(0, 6 399)`); the active point is
  `int(0, n − 1)` over the active list in insertion order, a retired point being replaced by the list's last; each
  candidate lies at a radius r₀ × (1 + `float01`) along the angle 2π × `float01`, whose cosine and sine come from `dmath`
  (§6.5), and candidates are tried in draw order. **The band (creation index 4):** a full toroidal tile is sampled as
  above and cut to its points with e < 200 cm, in their index order. **Each tile (creation index 0–3):** the band's points are
  pre-placed in that order — in the spacing grid and as the initial active list — and the sampling continues from them
  over the region e ≥ 200 cm: no first point is drawn, and a candidate with e < 200 cm is rejected like one too close;
  the tile is the band's points followed by its own, in acceptance order. **Ranking**, per tile over all its points: every point's energy is the sum, over the other
  points in point-index order, of exp(−d² ÷ (2σ²)) with d their toroidal distance in centimetres, σ = r₀ and the
  exponential `dmath.exp`; the point of highest energy (equal energies: the lower point index) is removed and takes the
  highest free rank (n − 1 first), and every point still present then has the removed point's term subtracted from its
  energy, in point-index order — the **removal update**, so ranking costs n(n − 1) + n(n − 1) ÷ 2 ≈ 1.5 n²
  exponentials (O(n²)), never a re-sum after each removal (O(n³): ≈ 53 ms per tile against ≈ 1.8 ms at 161 points,
  measured cost model). A square root, where one is needed, is `Math.sqrt`, exact by specification (§6.5 (2)). The crown
  library's shapes (below) use `dmath` the same way, so only their rasterisation into sprites is engine-specific. A
  class's band and four tiles build in ≈ 19.5 ms (measured cost model, `fixall_rendering_r5_seamstrip.out`). Chose to
  cut the band from a full tile over sampling it by Bridson restricted to the band, because a band sampled on its own
  packs points against its inner edge — measured, 4.7–5.3 points per 100 m² in the band against 2.8–3.6 in the ring
  inside it, a density stripe along every lattice line — while a cut keeps a full tile's density (3.6–4.4 in the band,
  3.6–4.4 elsewhere); the price is slightly larger holes along the band's inner edge (the largest empty circle 1.20 × r₀
  against ≤ 1.08 × r₀ elsewhere; 0.11 % of a tile's area could take one more point, against 0.04 % in an independent
  tile). Chose a band of r₀ ÷ 2 over one of r₀ because both give 0 close pairs across seams — two points outside a
  half-width band are already r₀ apart — while the narrower band repeats ≈ 12 % of a tile's points in every cell
  instead of ≈ 23 % (NR4-1).
* **The shipped stamp-tile asset (NR3-7).** `plat/assets/stamptiles/stamptiles.bin` holds, per stamped class in
  registry order, its four tiles — each self-contained, its band points first: a point count, then per point its x and
  y as int16 centimetres and its rank as a u16, 6 B per point, ≈ 1 KB per tile, ≈ 31 KB for eight classes — with a
  header naming the asset version, the format
  version, the generating script and its constant key words (§17.1 (5)) and the stored H128 of every tile. `@plat/render`
  bundles the bytes into the code of both workers, so no host serves an extra file (§11.2); at worker start each worker
  takes typed-array views over them and checks every tile's H128 against the stored value (≈ 0.03–0.06 ms for 8–16
  classes, measured cost model). **Pre-decided fallback** when a tile's hash differs (a damaged bundle): that worker
  rebuilds the class's band and tiles with the same `poisson` construction at start-up, before its first district-band
  raster (≈ 19.5 ms per class at r₀, measured cost model), and the report says so; a rebuilt tile that still differs is a
  determinism defect, which the census's rebuild check (§8.3) fails in CI. **Release changes:** a new stamped class adds
  its four tiles and moves no stored hash, so no drawn wood moves; a change to the construction (r₀, σ, k, the tile
  side, the band width, the key words) moves stored hashes and is recorded as a `render.stampTiles` view shift (§13.3),
  bumping the style version of every shipped sheet that draws stamped classes. A new spacing needs nothing, being a
  scale. The shared band (NR4-1) changed the construction before any asset or golden existed (goldens start at M1,
  §13.3), so it moves no recorded hash and needs no shift record. Chose a
  constant key over the seed or the document because the tiles are a library shared by every document, session and
  host — the per-town variety comes from the stamp's offset, rotation and spacing, drawn from the entity's
  `render.instances` stream, and from the seed-dependent tile variant — and a seed-keyed library would have to be
  rebuilt per document for no visible gain.
* **Stamp (NR4-3).** From the row: the offset o ∈ [0, 6 400)² in whole reference centimetres, the rotation
  `rotationCdeg` ∈ [0, 36 000) in whole centidegrees (S14 draws it as `int(0, 35 999)`), and the scale
  s = spacing ÷ 400 cm. R_θ's cosine and sine are `dmath.cos` and `dmath.sin` of `rotationCdeg` × (π ÷ 18 000), the
  factor a double literal. Tile point t of cell (u, v) lies at R_θ · (s · (6 400 · (u, v) + t + o)), each coordinate
  then rounded to whole centimetres (`Math.round`): that integer point is the instance's **world position**, the one
  position the face test, the density test, drawing, override resolution and every export read. The cells are those of
  the rotated, scaled lattice covering the entity's face — its bounding box taken into lattice coordinates by the same
  cosine and sine and widened by one cell — and a point survives if its world position falls inside the face (by the
  exact point-in-polygon with holes on integer centimetres, §3.2) and, for woods, passes the edge test of a domain-warped
  density evaluated once per point at its world position in metres. Rounding moves a point by ≤ 0.71 cm, so two
  instances keep the entity's spacing less ≤ 1.5 cm. **Ordinal** = (u, v, p): stable — editing the face's boundary
  changes only which edge points survive, never the interior's ordinals or positions. **One result on every engine:**
  this whole function — the stamp, grid and line layouts, the per-instance look draws below and the density test, with
  everything they call — is held to §6.5 (3)'s allowlist lint, so it computes the same integer positions and the same
  draws on every engine, and a GeoJSON, glTF or CityJSON file with trees is byte-identical on every host (§11.1; the
  five-engine golden run compares one, §13.3). Chose integer-centimetre world positions computed with `dmath` over
  double positions from the engine's `Math.cos` because the model-format exporters write these positions and promise
  byte-identical files, and a last-bit difference in a cosine can move a coordinate across a GeoJSON file's 7-decimal
  (≈ 1 cm) rounding; the centimetre is the model's own lattice (§3.2), so the face test is exact as well (NR4-3).
* **Grid and line.** A `grid` places one point per cell (u, v) of the rotated lattice at the row's spacing, jittered by
  ± 15 % of the spacing in x and y from two `RH32` draws over (key, salt, u, v) (tags `grid.jitter.x` and `grid.jitter.y`),
  rounded to whole centimetres like a stamp's point and kept if that world position lies in the face; ordinal = (u, v). A `line` places point i at arc length (i + ½) × spacing from the line's
  start end — the end whose junction address sorts first (for an `along` row, the end at its way's first junction) —
  jittered along and across the line the same way and rounded to whole centimetres; ordinal = i. Park paths are L3 `path` faces drawn by the path
  program, not instances.
* **Rank and band thinning (N-10).** Every instance has a normalised rank r ∈ [0, 1): a stamp point's progressive rank
  ÷ its tile's point count; a `grid` point's r = the 32-bit bit-reversal of the Morton interleave of (u, v) ÷ 2³² — the
  two-dimensional van der Corput order, every prefix of which is evenly spread over the lattice; a `line` point's r = the
  bit-reversal of i ÷ 2³² — the van der Corput sequence along the line. Band b draws the instances with r < s_b (city:
  none — the wood, orchard or green fill; district: 0.6; neighbourhood and finer: 1), so every coarser band is a subset of
  the finer one for every layout: an instance keeps its position once visible and appears at most once in a zoom sweep
  (LC-20, VIS-5); the census covers all three layouts (§8.3).
* **Per-instance look, keyed by (key, ordinal).** The instance's species, drawn by its share from the entity's
  `Greenery.species` mix (inner or outer share by the point's distance from the edge), picks the crown class; the crown
  index into the style's **crown library** (20 crowns per class per style, built once per session from `rng.stream`
  keyed by the sheet's key (the hash of its id@version), `STAGE_VIEW`, the concern `style.crowns` with its salt, and the
  class and the index i as the creation index — §6.1's structured components; the path form is a report rendering,
  §14 — drawn as sprites; a `lit` sheet, whose crowns are shaded by the light, bakes its sprites per (style, light
  step): once with a `fixed` sun, and with a `path` sun again at each light step, in the tile worker as one-sprite
  units of §8.9's queue, the drawn step's set always kept and earlier sets while they fit §8.8's crown-and-atlas
  scratch (§8.4; NR4-5)), colour jitter, scale jitter ± 15 %, and `leafType` (from the
  species when present, deciduous otherwise) are `RH32` draws over (the entity's render `key` — the low 64 bits of its entity key, which mixes in the
  seed (§8.1 item 5; VD2-6) —, ordinal, the concern's salt). Hatch phase and roof detail are keyed by the entity's `key`. Nothing is keyed by band or by the
  session's interned handle.
* **Edits (LC-20, NF-D11).** `{ t: 'instance', entity, ordinal | point, op: 'add'|'move'|'remove'|'restyle', to?, style? }`
  events (§7.1) apply after the set is generated: `remove` drops the ordinal, `move` replaces its position, `add` appends
  a user ordinal `u<n>` at `point`, `restyle` sets its `InstanceStyle`. For an ordinal-addressed event the dry run also
  records the instance's generated position in `point`. **Resolution** runs in the generation worker whenever a commit
  touches an entity that carries overrides (it re-runs this section's function for that entity only): an override
  **applies by ordinal** when the entity's lineage is unchanged since the event — no `carry` lifecycle event and no
  supersession of the entity is recorded after the event's `seq` (§6.3) — **and** that ordinal's generated position
  lies within 0.5 × the spacing of the recorded `point`; otherwise — a carried successor with a fresh lineage, a
  superseded entity (its overrides move to the `supersededBy` successor), or an ordinal that moved (a line edited at its
  start end) — it **re-matches by position** to the nearest generated instance within 0.5 × the spacing of `point` that
  no other override has claimed (candidates in (distance, ordinal) order, overrides in log order), and else is kept
  **orphaned** and reported. Resolution reads each positional override's current position from its entity's `overrides` table (§2.7) — a
  `move`'s `to`, an `add`'s `point`, and for a `line` layout the recorded generated `point` — which the event writes
  when it applies and a warp or vertex move displaces with the host face (§7.4; VK2-13); for stamp and grid layouts the
  recorded generated `point` stays world-anchored, as their instances are. An `add` stays while its point lies in the entity's face (or within 0.5 × the spacing of its
  line) and is orphaned otherwise. The resolved overrides — ordinal, op, position, style and state (`byOrdinal`,
  `rematched`, `orphaned`) — cross to the tile worker as the `InstanceTable`'s override rows (§8.1, §8.9). A tree brush
  is a batch of instance events (COV-FTG-M04). Chose to apply by ordinal only while the lineage and the position both
  hold over applying by ordinal whenever the address survives, because under §6.3 a carried successor keeps the address
  but not the lineage, so its stamp — drawn from the lineage-keyed stream — puts the same ordinal on a different tree.
* **Where it runs (N-4).** Instances are generated per tile in the tile worker from the `InstanceTable` row and
  memoised per (key, revision, style version) for the session; they are never written to the document except as
  overrides. The generation worker runs the same function, on the same shipped stamp tiles (NR-6, NR3-7), for entities
  that carry overrides (to resolve them) and for exports: the GeoJSON, glTF and CityJSON exporters call it at the finest
  band with the overrides applied and write each instance's position, species, crown diameter and leaf type (§11.1;
  VN-158, XB32); the bench computes tree statistics from it (SCL-21).
* **Budgets.** Placement ≤ 1 µs per instance (stamp, scale, rounding and point-in-polygon), drawing ≤ 2 µs per instance
  as a sprite (§12.7); the stamp-tile asset ≤ 5 ms per worker per session, loaded and checked at worker start, never on
  a settle (§12.7); the crown library's build, and in `lit` with a `path` sun each light step's bake, ≤ 20 ms of
  tile-worker time in one-sprite units, built when the style loads, before any district-band raster needs it (§12.7;
  NR4-5).

Chose the stamped, ranked tile over per-entity Bridson sampling because sampling costs ≈ 12 µs per tree (a 36 ha wood
takes 170 ms; redteam-scale §7.2) while a stamp costs under 1 µs, and ranked tiles give every band a subset of the finer
band by construction. Chose bit-reversal ranks for the jittered layouts over a second blue-noise ranking of their points
because the van der Corput order is a pure function of the ordinal, so the rank is as stable as the ordinal itself
(N-10). Chose to build the tiles at build time and ship them over building them in each session because the session
build ran on the interaction path — the first zoom to the district band, under §12.5's ≤ 150 ms settle — with no
budget, in both workers, and NR-6 had already made the tiles a constant, so a build-time asset costs a bundled ≈ 31 KB
and a hash check instead (NR3-7). Chose one set of tiles per class scaled by the entity's spacing over one set per
(class, spacing) because the spacing is drawn per entity in whole centimetres, so a per-spacing library has hundreds of
members per class (≈ 19 ms each in the session, measured cost model; megabytes as an asset), while uniform scaling
keeps the blue-noise property and the ordinals and costs one multiplication per point (NR3-7). Chose four
seam-compatible variants sharing a border band over one larger toroidal tile per class (MFCG's and VG's single tile,
here 128 m at r₀) — which has no seams by construction — because a single tile repeats every instance position on a
periodic lattice, while the variants keep ≈ 88 % of each cell's points varying among four tiles at the same asset
size, for the price of one band per class and slightly larger holes along the band's inner edge; and over the
independent variants they replace, whose seams put 3.5–5 pairs of trees per 64-m seam closer than the spacing (NR4-1).

=== REPLACE 9.2 Placement (S13b): font metrics, zoom stops, the global greedy evaluated locally ===

### 9.2 Placement (S13b): font metrics, zoom stops, the global greedy evaluated locally

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r5); earlier: revised by opus stand-in (fixall/integrate-r4); drafted by fixall/draft-rendering-r4; earlier revisions fixall/integrate-r3, fixall/integrate-r2, drafted by fixall/draft-rendering-r2

* **Metrics.** `@plat/labels` parses the bundled OFL font files itself (the default label face is IM FELL Great Primer,
  §17.2): `cmap`, `hmtx`, `kern` and GPOS pair adjustments (formats 1 and 2), GSUB single substitutions for `smcp`
  (small caps) and `onum` (old-style figures), and `loca` / `glyf` for SVG's outline text (§11.1). Advance widths and
  kerning in font units become world metres at a zoom stop; there is no contextual shaping (the label faces are Latin,
  ligatures off). Glyphs are placed and drawn one by one (§8.9), so what is drawn equals what was measured on every
  backend and in SVG.
* **Font features, checked (N-12).** From M1, a PR-tier CI test asserts for each bundled label face that it carries
  `cmap`, `hmtx` and TrueType `glyf` outlines and reports whether its GSUB has `smcp` and `onum` single-substitution
  lookups for the Latin script. The label style then takes a **pre-decided path per face, chosen by that test, never by
  hand**: with `smcp`, small caps come from the face; without it, the family's OFL small-caps cut (for IM FELL Great
  Primer, its SC face, bundled unmodified, whose lower-case slots are small capitals) supplies them, measured by the
  same reader; where a family has no such cut (a user face), small caps are synthesised as the face's capitals scaled
  to 0.75 × the cap height with the letter-spacing kept, measured by the same reader; without `onum`, the scale bar
  uses the face's default figures. The report of the style names the path each face took, and the census's floors
  (§9.4) run on whichever path is active.
* **Zoom stops.** Placement is computed per zoom stop (§8.8). At stop k each glyph box, in world units, is its pixel box ×
  the stop's metres per pixel; protected obstacles (gates, castle, plaza, bridges, walls — MFCG's measured defect) are
  their drawn symbol extents at that stop. S13b reads the display list through `ObstacleSource` and `RoleIndex` (§14); both implementations, what they
  call and the S14 writers of the columns they read are under §6.5 (3)'s allowlist lint, so S13b's inputs are
  bit-identical on every engine and the placement digests of §13.3 can be compared across the five engines (VS2-4); a
  symbol's rotated extent is computed with `dmath`, never `Math.cos` or `Math.hypot`. Between stops the view uses the placement of the stop at or coarser than the
  current scale: zooming in only shrinks every label's world box, so no collision can appear, and crossing below a stop
  switches to that coarser stop's placement. Zero collisions therefore hold at every zoom, not only at the stops.
* **The candidate set of a stop** is fixed before the greedy runs: every `LabelTable` row drawn at the band, minus the
  labels that §9.4's rung (5) hands to a quarter at this stop, plus one candidate per `QuarterNode` that rung (5)
  activates — created once however many members yield to it, and not again when the stop's cut already labels that node
  — with the highest priority among its yielding members, the node's area and the node's own label id (N-11). Rung (5)
  is decided from geometry alone (whether a label fits its own face at the floor), so the set is known before any
  collision is tested.
* **The greedy.** Candidates at a stop are totally ordered by priority (title > quarter / district > water > landmark >
  gate > way > address), then larger target area, then id. A candidate takes its first alternate (its spines in order,
  then the ladder of §9.4) that meets no placed higher candidate, no obstacle and no fixed pin; otherwise it yields.
  This whole-map greedy is **evaluated locally**: deciding c first decides (memoised) every higher candidate whose
  alternate boxes meet c's; the dependency graph is acyclic because the order is strict, so the result is the same
  whichever tiles are computed first and whatever the viewport.
* **Resumable placement (NR4-2).** S13b runs as a job the tile worker can stop between any two units and resume, as it
  does a raster (§8.9):

  ```ts
  // @plat/labels (§14 declares the same)
  interface LabelPlacer {
    begin(stop: ZoomStop, labels: LabelEntity[], obstacles: ObstacleSource, roles: RoleIndex, fonts: FontMetrics, memo: PlacementMemo): PlacementJob;
    place(stop: ZoomStop, labels: LabelEntity[], obstacles: ObstacleSource, roles: RoleIndex, fonts: FontMetrics, memo: PlacementMemo): PlacementSet;   // begin(…) then step(Infinity): SVG exports and tests
  }
  interface PlacementJob {
    step(deadlineMs: number): boolean;   // runs units on from where it stopped; returns after the first unit that ends deadlineMs or more after this call began; true when the stop's placement is complete
    result(): PlacementSet;              // once step() has returned true
    cancel(): void;                      // drops the job; the memo entries it wrote stay valid (keyed by stop, candidate id and revision)
    readonly spentMs: number;
  }
  ```

  A **unit** is one of: the rung-(5) test of one `LabelTable` row (building the candidate set, above); one pin of the
  pin pass (below); one step of the local evaluation, which runs on an explicit stack instead of recursion — push the
  highest undecided candidate whose alternate boxes meet those of the candidate on top, or, when every such candidate
  is decided, decide the top (its first alternate that meets no placed higher candidate, obstacle or fixed pin), write
  the memo and pop; or the glyph layout of one placed label. The job takes the scope's candidates as roots in the strict
  order, pins first, so most roots find every higher neighbour already decided and push nothing. The stack and the memo
  persist between steps, so the job can stop after any unit, and every decision reads only candidates already decided,
  so where the steps fall never changes the result: a stop placed whole and placed one unit per step give identical
  placement digests (§8.3, §13.3). A unit costs ≈ 1 µs on average (the budget below) and tens of µs at most — a long
  name trying every spine and rung — so a step overruns its deadline by one unit. The view's job reads the tile
  worker's list, which deltas change between steps: a delta applied between two steps drops the memo entries its dirty
  boxes invalidate (*Incremental*, below) and, when it changes a label row or an obstacle of the job's stop, the job is
  begun again, keeping every memo entry left valid. An export's job reads its own transient list, which nothing
  changes (§11.1).
* **Pinned labels (N-28, NR3-3).** A pinned label (`LabelEntity.pinned`, a `PinnedPlacement`, §9.1) is shown only in its
  bands. At its own stop and at every finer stop it is placed exactly as the user left it, before any other candidate,
  by the **pin pass**: the pins eligible at the stop — in their bands, with their own stop at this stop or a coarser
  one — are taken in the order of their `moveLabel` event's `seq`, then label id (`LabelTable.pinSeq`, §8.1), and each whose box at the stop meets no pin already fixed there becomes a **fixed
  pin** — an obstacle every candidate avoids. A pin whose box meets an already fixed pin is not fixed at that stop: as
  at a coarser stop, its only alternate is its own placement, which the fixed pin it meets blocks, so the pin is
  **hidden at that stop and reported** ("pinned label hidden: overlaps pin P at stop k"). The pass is a greedy in a
  strict order, evaluated locally like the main greedy — deciding a pin decides, memoised, every earlier pin whose box
  meets it — so its result does not depend on which tiles are computed first. A pin's box is sized in pixels, so
  zooming in only shrinks it in world units: a pin fixed at stop k meets nothing at a finer stop that it did not meet at
  k, and a pin hidden at k is fixed again at the finer stops where the two boxes part. `moveLabel`'s dry run (§7.1)
  refuses a placement whose box at its stop meets another pinned label's box at that stop, returning the nearest free
  position as the conflict's action — the **interactive guard**; the pin pass is the guarantee, because pins also come
  together without a `moveLabel`: a warp or vertex move carries them with the ground (§9.1, §7.4), a `setAttr` rename or
  an ids-scoped `rerollLayer(naming)` lengthens a pin's text (§9.6), and a `setStyle` changes the label face's widths.
  At a **coarser** stop a pin's world box grows, so it is not fixed there: it keeps its anchor and spine and enters the
  greedy as a candidate, at its entity's priority, whose only alternate is that placement — drawn when it meets no higher
  candidate, obstacle or fixed pin, and otherwise hidden at that stop and reported ("pinned label hidden at stops coarser
  than k"). Zero collisions therefore hold at every zoom with pins included. **Test (B-ZOOM, §13.4):** two pins 20 px
  apart brought together by a warp, and two brought together by a rename that lengthens the earlier pin's text — at
  every stop 0 collisions, the later pin reported hidden at the stops where the boxes meet, and the per-stop placement
  digests (§13.3) identical after a replay of the log.
* **Scope.** Area and way labels for all candidates of the band; addresses and repeated street names only for candidates
  in visible tiles and their dependency closure. The memo is keyed by (stop, candidate id, candidate revision).
* **Incremental (SCL-9).** After an edit, memo entries of candidates whose boxes meet the dirty boxes are dropped and
  re-decided; a change propagates only through candidates whose outcome changes (the priority cascade stops when nothing
  more moves).
* **Budget (SCL-10).** ≤ 2 ms per stop for ≤ 2 000 visible candidates, in the tile worker (§12.7), from the
  `LabelTable` alone (§8.1, §8.9); an export's placement ≈ 1 µs per candidate in its frame, in class-4 steps (§8.9,
  §12.7; NR4-2).

Chose fixed pins at their own and finer stops and yielding candidates at coarser ones over pins fixed at every stop,
because a pixel-sized box grows in world units as the view zooms out, so a pin fixed everywhere would collide at coarse
stops with other pins and higher labels, against "0 collisions at every zoom" (N-28). Chose a pin pass at placement
time over refusing, in their dry runs, the warps, renames, rerolls and style changes that bring two pins together,
because those edits are not about labels — a warp is continuous and a rename is the user's wording — so refusing them
for a label overlap would block edits the user means, while hiding a pin is a reported view change the user can undo
by moving either pin (NR3-3). Chose the `moveLabel` order over the greedy's priority order because `moveLabel`'s guard
already makes a new pin give way to the pins already there, so the pass keeps the pin that stood first, and a stored
`seq` does not change when a later edit changes a target's priority or area; the price is a `seq` on the pinned
placement and a 4-B `pinSeq` column (NR3-3). Chose to decide rung (5) from
geometry before the greedy over letting it fall out of collisions inside the greedy, because the quarter candidate must
have a fixed place in the strict order that the local evaluation relies on, and a candidate whose existence depended on
later outcomes would break that order (N-11). Chose a resumable placement job whose unit is one decision over running
S13b whole at a stop, because a large print's placement over its whole frame — tens of thousands of candidates at a
fine band — would be one unbounded unit in the tile worker, against §8.9's rule that a query waits for at most one
step, while an explicit stack with the memo makes every unit boundary a safe stop without changing the result (NR4-2).

=== REPLACE 11.1 Formats ===

### 11.1 Formats

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r5); earlier: revised by opus stand-in (fixall/integrate-r4); drafted by fixall/draft-rendering-r4; earlier revision fixall/integrate-r3, drafted by fixall/draft-rendering-r3

| target | mapping | notes |
|---|---|---|
| **native `.plat`** | §2.9; round trip byte-identical | the canonical form; import of our own export (MFCG cannot re-import its export; FTG's export ≠ its edit format) |
| **JSON schema** | published, versioned (generated from the `zod` types); entities by id with containment | the API's response type |
| **compact twin** | CBOR with typed-array tags; varint zig-zag int32 cm in **world** coordinates, the settlement centre stored in the header, so it is an encoding of the same schema (FTG-21) | embeds and sharing; a decoder is part of the library |
| **GeoJSON** (RFC 7946) | two declared variants (N-14, below): the default **strict RFC 7946** file in WGS84 longitude / latitude through the geo anchor, and the **metric** file by prior arrangement; neither has a `crs` member. One FeatureCollection per layer; one feature per entity with `id` (its address, §6.3), `kind`, `layer`, `epoch` and public attributes; **districts included** (FTG omits them); ways as LineStrings with class and model width; faces as Polygons with holes, emitted without antennae (§3.6 (6)); MultiPolygons for face unions; walls, towers, gates and built bridges as typed features (a crossing `site` is not exported, §2.7); boundary treatments as LineStrings with `treatment` (VIS-8); **trees** per green entity as one MultiPoint of its instance positions (the §8.10 function at the finest band, overrides applied — integer-centimetre positions computed under §6.5's lint, so the file stays byte-identical on every host, NR4-3) with `species[]` (the §8.10 draw: the species kind of each instance), `crownM[]` and `leafType[]` in the same order, or one Feature per tree on request with `species`, `crownM` and `leafType`, or none (VN-158, XB32); model widths only, never symbol widths | the default file validated by an open RFC 7946 validator in CI and loaded by the scripted QGIS test (O11 d); the metric file checked for geometry validity and its sidecar against its schema |
| **SVG** | written from a transient display list the generation worker builds for the export (below; NR-5) at a declared band — the city band by default; the district band on request, after a size estimate is shown; the neighbourhood band only for a district-sized or smaller scope; `<g id="layer.ground"><g id="sem.building.footprint">` groups per layer and semantic; inside a group one compound `<path>` per (semantic, district), and a `<metadata>` JSON map from subpath index ranges to entity ids, so every entity stays addressable without an element each; trees as one compound path per green entity (crowns at the district band, the wood outline at the city band); text (N-13) by default as **outlines** — each glyph used is written once in `<defs>` as a path from the bundled face's own `glyf` outlines (quadratic segments as SVG `Q`), and each placed glyph is a `<use>` at the per-glyph position S13b computed, the label's text carried in an `aria-label` and a `<title>` so it stays searchable — or, with the option `text: 'embedded'`, as editable `<text>` (curved labels per glyph, straight labels as one `<text>` with explicit per-glyph x positions) in the bundled face embedded unmodified as an `@font-face` data URI (OFL permits embedding; no subsetting, §17.2); halos by paint-order in both; hatching as compound paths; symbol widths; the colour-matrix post operations as filters (§8.2) | budgets at METROPOLIS, city band: ≤ 650 B per building (MFCG measured 410–500 B per building: 0.42–0.66 MB for 837–1 512 buildings, 6.3 MB for 15 392) plus the text — outlines ≤ 64 B per placed glyph and ≤ 0.5 KB per distinct glyph, or each embedded face's base64 bytes once (≤ 0.5 MB per face, checked against the bundled files) — and ≤ 60 000 elements; CI opens the METROPOLIS file in Inkscape headless (export to PNG within 120 s) and checks every layer id (O11 h) (SCL-14, VIS-18); the outline file's Inkscape PNG and the embedded file's Chromium PNG each match PLAT's own PNG of the same frame within the visual-regression threshold (§13.4) |
| **PNG / tiles** | the band-streamed tile assembly of §8.8 at any DPI, rastered in the tile worker from the export's transient list (below; NR3-6); transparent background; per-layer transparent PNGs (the largest MFCG ask); print presets A4…A2 at 300 dpi | O12 (e): A2 at 300 dpi with no canvas larger than one tile band |
| **VTT** | Foundry-class scene JSON and **Universal VTT (`.dd2vtt`)** by the profile below, one scene set per model layer (underground / ground / sky) with its elevation | grid alignment error 0 px per cell (O11 g); no manual steps on import |
| **3-D** | glTF 2.0 binary (D-8): **ground as one planar partition** — the plat's leaf faces at the finest committed level, each boundary read once from the arena (§3.9) and each face exported once (no coplanar overlap), clipped to the terrain cells and draped (vertex z by bilinear terrain sample), material by role; **rivers as sloped surfaces** — the water level at each vertex is that of the nearest course station, falling monotonically downstream along S1's carved course; lakes, ponds and sea as level planes (GEO-40); buildings extruded from `baseCm` (FTG-13) to eave height with roof meshes to ridge height, per wing — each wing's `ring` (§2.6), its roof by the wing's kind as in §8.6 — each wing's foundation skirt extruded down to the terrain (§2.6); walls, towers and gatehouses as prisms on their bases; bridge and pier decks at `deckCm`; trees as instanced crown meshes (`EXT_mesh_gpu_instancing`, positions from §8.10), one instancing node per (green entity, crown class) whose `extras` carry the entity's address and, per instance in instance order, `species`, `crownM` and `leafType` (XB32). OBJ as a flat secondary (one mesh per entity, unlike MFCG's merged OBJ) | shadows, glTF and CityJSON agree by construction (heights are model data) |
| **CityJSON 2.0** | `transform { scale: [0.01, 0.01, 0.01], translate }` so every vertex is our integer centimetre (lossless); `Building` (LoD1.2 solid from base to eave; LoD2.2 roof surfaces), `WaterBody`, `Road` (lines with class and width, sampled from the way's width profile, §2.2 rule 5), `PlantCover` (greenery faces), `SolitaryVegetationObject` (trees from §8.10, one per instance: a `GeometryInstance` of the crown class's template, with the attributes `species`, `crownDiameter` and `height`; XB32), `LandUse`, `OtherConstruction` (walls, towers, gatehouses), `Bridge`, `TINRelief` (terrain); no `referenceSystem` (a local metric CRS); when the export has a geo anchor it is recorded in the root property `+platGeoAnchor { latDeg, lonDeg, bearingDeg }`, defined by PLAT's own CityJSON Extension and listed in the file's `extensions` member (below; DEF-5, NR-7) | validated against the CityJSON 2.0 schema in CI — the anchor-less file as it is, the anchored file with PLAT's extension schema given to the validator from the repository |
| **CSV / statistics** | the statistics record per generation with provenance (O6 d); people, buildings, plots | the corpus-calibration input |
| **permalinks** | §6.4's format; `&doc=` references resolve through the `DocResolver` of §11.5 | one line for unedited towns; refused, with the `.plat` file or `&doc=` offered, when the town needs a non-shipped setting pack, host content or a non-shipped style sheet (§6.4) |

**The two GeoJSON variants (N-14).** RFC 7946 fixes WGS84 longitude and latitude and removed the `crs` member, so the
default export writes exactly that. A **geo anchor** `{ latDeg, lonDeg, bearingDeg }` places the settlement centre and
turns model north by the bearing; it is an export option, remembered per document in the view key `exportAnchor`
(§11.3), and defaults to (0°, 0°, 0°) — the conventional "no real location" point, so a default export is never
mistaken for a real place. Each model vertex (x, y) in metres, rotated by the bearing, is taken as a transverse Mercator
easting and northing — scale 1 on the central meridian through the anchor, false origin at the anchor — and inverted
to WGS84 latitude and longitude with Krüger's published series to fourth order in the third flattening, evaluated with
`dmath` so the file is byte-identical on every host; coordinates are written with 7 decimals (≈ 1 cm), exterior rings
counter-clockwise and holes clockwise (RFC 7946 §3.1.6). Distances a GIS measures on the ellipsoid then match model
distances within a factor 1 + (d ÷ R)² ÷ 2 — at most 3.1 × 10⁻⁶, ≤ 5 cm, at the farthest corner of the largest frame
(≈ 15.7 km from the centre at aspect 2, §12.2). A foreign member
`plat` records the anchor, whether
it is the default, the document id and the output version. The **metric** variant — offered "by prior arrangement"
(RFC 7946 §4) for tools that want the model's own metres — writes x east and y north in metres from the settlement
centre with 2 decimals (the centimetre lattice exactly), no `crs` member, in `<name>.metric.geojson`, beside a sidecar
`<name>.metric.json` giving the origin, the unit, the axes, the document id and the anchor if one is set. Chose a strict
WGS84 default with a documented default anchor over the local metric CRS with a `crs` member because the latter cannot
pass an RFC 7946 validator and would be read by GIS tools as degrees, placing the town at meaningless coordinates; the
metric file keeps the lossless path for tools that agree to it.

**SVG text (N-13).** The export dialog offers `text: 'outlines'` (the default) or `'embedded'`. Outlines are read from
the same bundled face the labels were measured with (§9.2), so every consumer draws the glyphs S13b placed; the
embedded face travels unmodified inside the file (OFL-permitted; no subsetting, §17.2) for users who want editable text.
Chose outlines as the default over embedded text because only outlines draw the same glyphs in every consumer — an
embedded `@font-face` is honoured by browsers but not reliably by desktop editors (PLAUSIBLE; CI renders each variant
in the consumer it targets, §11.1's SVG row), and a substituted face at our per-glyph positions changes widths and can
collide — which is what "text identical on every output" (§8.9) requires.

**Where exports run (NR-5).** Every `export(h, fmt)` runs in the generation worker, which holds the document (§8.9).
*Model formats* — `.plat`, the JSON schema, the compact twin, GeoJSON, glTF / OBJ, CityJSON, CSV and permalinks —
read the model and §8.10's instance function (`Exporter.write(doc, null, opts)`). *SVG* needs a display list and label
placement at the export's own stop (§8.7), while the generation worker keeps only a 24-B index of the tile worker's
list (§8.1 item 6): the SVG exporter builds a **transient list** for the export's band and frame with
`DisplayListBuilder.build(model, band)` (≈ 4 µs per building at the city band: ≈ 21 ms at CITY, ≈ 54 ms at the
METROPOLIS target), runs S13b there at the export stop through `@plat/labels` with `@plat/render`'s `ObstacleSource`
and `RoleIndex` over that list — the code the tile worker runs, with the export frame as the visible region of §9.2's
scope, so the placement is the one the tile worker would compute at that stop and §13.3's placement digests test the
code both run — writes the
file, and releases the list. The whole is inside §12.7's ≤ 2 s, and the list is §12.8's export-time peak (≈ 1.9 KB per
building at the city band). A district-band SVG's list is counted in the size estimate shown before writing. *Raster
formats* — PNG, print and the `.dd2vtt` scene image — use a transient list too (NR3-6): the generation worker
builds it the same way, for the export's band and frame (including the live layers the export's layer set names, as
their providers stand at the request), and transfers it with the raster-export request (§8.9); the tile worker runs
S13b at the export stop over it with the export frame as the visible region — the first work of the export's class
in its queue, a resumable placement job stepped one decision at a time (§8.9, §9.2; NR4-2) —, rasters the export's
tiles from it by
§8.8's band-streamed assembly — each tile a resumable job in the queue's export class, below the view's work, and
each band's composition, read-back and encoding sliced the same way (§8.9) — streams the encoded bytes and a progress
message per band back, and releases the list; the generation worker wraps the VTT scene around the image. The export
therefore shows the model as it stood when it was requested, whatever is edited while its bands are rastered, and the
export dialog shows the bands done out of the bands total. Chose a transient list in the generation worker over
handing SVG to the tile worker because the SVG writer also reads the document (addresses, the supersedes table, layer
and entity metadata), which the tile worker never holds (N-4), and over keeping a second full list resident because
exports are occasional and the list is rebuilt in tens of milliseconds. Chose a transient list for raster exports as
well over rastering them from the view's list, because an A2 print takes up to ≈ 20 s and longer while the view
pre-empts it (§8.9), so an edit made meanwhile would reach the view's list between two bands and tear the picture —
bands above and below the edit drawn from two model states — and because the view's list holds the finer bands only
for the districts the view has visited, while the transient list is one model state, complete for the frame (NR3-6).

**The CityJSON extension (NR-7).** By the CityJSON 2.0 convention a root property outside the core schema is named
with a leading `+` and defined by an Extension listed in the file's `extensions` member; whether a validator rejects
an undeclared one was not executed here (PLAUSIBLE), so PLAT declares its one. `@plat/export` ships
`schemas/cityjson/plat.ext.json`, a CityJSON Extension (`type: "CityJSONExtension"`, name `Plat`, its own version,
`versionCityJSON: "2.0"`) whose `extraRootProperties` define `+platGeoAnchor` as an object of exactly three numbers —
`latDeg` in [−90, 90], `lonDeg` in [−180, 180) and `bearingDeg` in [0, 360) — and whose `extraAttributes`,
`extraCityObjects` and `extraSemanticSurfaces` are empty. A file with an anchor lists
`"extensions": { "Plat": { "url": …, "version": … } }`, the url being the address at which each release publishes
the schema beside the package; a file without an anchor — the default — has neither the property nor the member and
is plain CityJSON. CI validates both kinds with the extension schema supplied from the repository, so no check
fetches anything. A change to the property bumps the extension's version with the exporter's output version (§6.4).
**Measurement** at the CityJSON exporter's milestone (M3b, D-8): the anchored file passes the CityJSON validator with
the extension. **Pre-decided fallback:** the anchor moves to a sidecar `<name>.geoanchor.json` beside
`<name>.city.json` — the three numbers, the document id and the output version, checked against its own JSON schema
like the metric GeoJSON's sidecar — the CityJSON file carries neither the property nor the member, and the report says
so. Chose a declared extension over a sidecar as the primary because it keeps the anchor inside the one file a GIS
user moves around, and the sidecar as the fallback because it leaves the CityJSON file valid by construction.

**Identity in every export (LC-1, LC-28).** Every export carries entity addresses (§6.3) and the document's supersedes
table (tombstone → successor), so an outside tool that keyed data to an entity can follow it across re-derivations; ids
cross the API and bridge boundary as `<docId>/<id>`.

**The `.dd2vtt` profile (DEF-4).**
* **Scope:** a rectangle or a district chosen by the user — by default the current view snapped to whole grid squares.
  One scene image is ≤ 8 192 px on a side at the declared grid (default 100 px per 1.5 m square, so ≈ 123 m); a larger
  scope is split into a grid of scenes aligned to grid lines, or the user lowers the pixels per square (≥ 50) — the export
  dialog shows the choice before writing.
* **Fields:** `format` 0.3; `resolution { map_origin: {x: 0, y: 0}, map_size: {x, y} in squares, pixels_per_grid }`;
  `line_of_sight` — polylines in grid units from building footprint edges (minus door openings), enceinte faces, yard
  walls and hedges from boundary treatments (fences and railings do not block sight), and cliffs; `objects_line_of_sight`
  empty; `portals` — doors at building entrances (1.2 m openings) and gates (their opening), each
  `{ position, bounds: [two points], rotation, closed: true, freestanding: false }`; `lights` — the module's light sources
  in the scope, none otherwise, `{ position, range in squares, intensity: 1, color, shadows: true }`;
  `environment { baked_lighting: true, ambient_light }`; `image` — the scene PNG (base64) rendered by §8.8 at
  `pixels_per_grid` without the grid drawn in.
* **Per layer:** one file per model layer, its elevation in the file name and in a `plat` extension object; coordinates
  exact to the grid (O11 g).
* **Foundry scene JSON:** the same geometry as walls (`c: [x0, y0, x1, y1]` with movement and sight types; doors flagged),
  the same lights, a background image file, grid size and distance units, and journal entries from the gazetteer.

Chose to build CityJSON over leaving it deferred (D-8) because its integer-vertex-plus-transform encoding carries our
centimetre lattice losslessly, so the exporter is a thin view (≤ 1 person-week, M3b), and it gives GIS users a standard
3-D city path that GeoJSON cannot.

=== REPLACE §12 Performance budgets — the section's opening only (its heading, banner and *In plain words* paragraph, up to §12.1) ===

## §12 Performance budgets

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r5); earlier: revised by opus stand-in (fixall/integrate-r4); earlier revision fixall/integrate-r3; drafted by fixall/draft-rendering-r3

*In plain words.* A town appears in under a quarter of a second, a city in under half a second up to about 25 000 people
and in under 0.6 s at 30 000, and a metropolis of up to about 48 000 people in about a second — the bar MFCG sets for
itself and FTG misses by several seconds. Because a bigger town has more buildings, each size gets a rule rather than a
single number: a fixed part plus a cost per building. Under that rule every town and every city appears within one
second, and so does a metropolis of up to about 48 000 people; the largest metropolises, up to 120 000 people, take up
to about 2.3 seconds. The same is true of building the town before it is drawn: the improvement plan's targets — a tenth
of a second for a town, three tenths for a city, one second for a metropolis — are met for 19 runs in 20 up to about
4 500, 17 700 and 59 000 people and for every single run up to about 3 400, 13 600 and 46 000, and the largest towns,
cities and metropolises take up to about 0.2, 0.5 and 1.9 seconds in 19 runs in 20; no single town may take more than a
quarter longer than its size's rule. Both misses are stated here for the owner to veto rather than hidden behind a
half-finished picture or a thinner town. Every step has its own budget, with the method that makes the budget possible
named beside it, measured on one named machine so the numbers can be checked. Compared with MFCG drawing the same number
of buildings, PLAT takes about twice as long for towns and cities and about five times as long for a metropolis, because
it builds what MFCG does not — real terrain and rivers, plots with yards, a plan for every plot, a roster of trades
placed by rule, greenery and non-colliding labels. That trade is stated here so the owner can veto it too.

=== REPLACE 12.6 Edits, regeneration, replay and warp, as functions of scope (SCL-9) ===

### 12.6 Edits, regeneration, replay and warp, as functions of scope (SCL-9)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r5); earlier: revised by opus stand-in (fixall/integrate-r4); earlier revision fixall/integrate-r3; earlier revision fixall/integrate-r2, drafted by fixall/draft-rendering-r2

* **Scoped regeneration:** ≤ 3 ms + 60 µs × the buildings in scope (a district of ≤ 450 buildings in ≤ 30 ms), plus the
  S13a and S14 deltas ≤ 3 ms; the dirty tiles re-raster in the tile worker off the edit path (≤ 12 ms per 1 000
  buildings); edit-to-redraw < 100 ms.
* **A single plot edit:** ≤ 5 ms of model work plus ≤ 2 ms of deltas.
* **Coarse edits** (PLAUSIBLE; measured with §13.2's B-EDIT coarse-edit sequences): a course-knot, moved-shore or drawn-water
  edit ≤ 60 ms of model work at CITY for a re-traced reach ≤ 500 m (re-trace and carve ≈ 5 ms, crossing search ≈ 1 ms,
  the L1 batch of kept-way routes, deck vertices and cuts ≈ 5 ms,
  S4 re-route of ≤ 3 arterials ≈ 5 ms, S5 regrowth in ≤ 4 cells, F-REDERIVE of the touched blocks at the
  scoped-regeneration law); a terrain stroke ≤ 3 ms + 1 µs per re-based entity + the field-brush law for the blocks its
  drivers re-derive.
* **Scope invariance:** the same scope costs the same at TOWN, CITY and METROPOLIS within ± 20 % (a B-EDIT test:
  TOWN → CITY from M2a, TOWN → METROPOLIS from M2b, §13.2; NF-S6).
* **Replay and load verification (N-16, N-1).** Replay (load verification, migration, undo beyond the scoped records,
  the undo of an upgrade after a reload) folds the log on the model through the session's code path — S13a's scoped
  delta runs at each event that re-derives names, ≤ 3 ms per such event — and only S14 and S13b are suppressed and run
  once at the end (§7.3). Its cost is therefore a sum over the log, not a constant:

  V = M(B) + Σ c(e) + S14(B) + 5 ms

  where M(B) is §12.3's model law for the document's size (the recipe is replayed from S0; checkpoints are session
  memory, §7.4, and are not saved), S14(B) ≈ 4 µs × B is one display-list build, 5 ms finalises the model and records
  digests, and c(e) is
  each event's replay cost — its model scope cost, plus succession matching (≤ 2 µs per re-derived entity, §6.3), plus
  S13a's delta when it re-derives names: ≤ 0.5 ms for an event that re-derives nothing (attribute, label, lock, pin,
  style and table-row edits whose slices no entity reads); ≤ 8 ms for a plot-scale edit; ≤ 3 ms + 60 µs × the buildings
  in scope + matching + 3 ms for a scoped regeneration, a local operator (§7.3) or an epoch; ≤ M(B) for a Re-derive from
  Sk. For the **reference verification mix** of 300 edits on a CITY document of 5 200 buildings — 200 light edits, 80
  plot-scale edits, 15 block regenerations of ≤ 60 buildings and 5 district regenerations of ≤ 450 buildings — V ≈ 1.4 s
  p95 (`docs/validation/bench/fixall_rendering_r2_budgets.out`); a log of 300 district regenerations takes ≈ 11 s. The
  law replaces the earlier "300 edits in ≤ 1 s", which assumed checkpoints a saved document does not have. Verification
  never delays the picture or an edit: the saved model is displayed at once, editable once its own digest is recomputed
  and checked (§2.9 step 3; open-to-editable ≤ T(B), §12.5's law for the document's building count; the recomputation
  of its model and records trees ≈ 35–38 ms at CITY, measured synthetic (`fixall_det_r4_loaddigest.out`,
  `fixall_det_r5_recordsdigest.out`)), and verified by a replay in a pool worker beside the edits, while every edit
  made meanwhile runs its per-district stages single-worker in the generation worker (§2.9 step 3); with pool size 0
  the replay itself runs in the generation worker and yields to each edit at its next batch boundary (§2.9 steps 3–4);
  the report shows the law's estimate and the progress, and "trust the saved town" ends the wait once the saved copy's
  own roots have matched (NR-8, VD4-2). B-EDIT times the reference mix at M2a (pass: ≤ V + 10 %); pre-decided fallback: the
  per-kind costs c(e) are re-declared at their measured p95 and the reference mix's V restated here, reported for the
  owner's veto (the verification wait is off the path to the picture, so no mechanism changes). Chose to state the bound
  as a law of the log over saving checkpoints because a checkpoint holds the arena chunks changed since the last one,
  which would multiply the 3 MB CITY document (§2.9) for edit-heavy files, while the verification wait is already off
  the path to the picture.
* **Warp preview:** ≥ 30 fps for a brush radius ≤ 150 m; Apply ≤ the scoped-regeneration budget of the touched faces,
  counting §2.6's wing carry and check inside the whole-step validation — ≈ 0.4 ms per validation pass for 450
  buildings on an assumed core mix and ≈ 3.6 ms in the worst case of a step and eight halvings
  (`docs/validation/bench/fixall_pipeline_r5_wingcost.out`; §2.6 rule 4; NP4-6). *Measurement (M3a):* the Apply time
  of a 150 m brush over a CITY core on B-CITY-lite seeds, the carry and check counted. *Pre-decided fallback* if it
  exceeds the budget: the wing check leaves the whole-step validation — it runs once after the final step, and a
  building that fails it is re-derived by S11 on its plot (F-REDERIVE, reported) instead of halving the step (§2.6
  rule 4).
* **Proxy thumbnails:** §7.8's budget.

=== REPLACE 12.7 Labels, trees, exports (SCL-8, SCL-10, SCL-14) ===

### 12.7 Labels, trees, exports (SCL-8, SCL-10, SCL-14)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-rendering-r5); earlier: revised by opus stand-in (fixall/integrate-r4); drafted by fixall/draft-rendering-r4; earlier revision fixall/integrate-r3, drafted by fixall/draft-rendering-r3

* **Labels:** S13a 12 ms at CITY and ≤ 30 ms at METROPOLIS (model); S13b ≤ 2 ms per zoom stop for ≤ 2 000 visible
  candidates — ≈ 1 µs per candidate, the rate an export's placement is budgeted at too (below) — run in resumable
  steps of one decision (§8.9, §9.2; NR4-2); a tile's label composition ≤ 3 ms at ≤ 150 glyph runs (§8.9).
* **Trees:** placement ≤ 1 µs and drawing ≤ 2 µs per instance. A district-band view with 10 000 visible trees composes in
  one 16 ms frame from cached tiles, and its tiles raster in ≤ 30 ms of tile-worker time (O19 e, restated); the 200 000
  trees of a METROPOLIS are never all instantiated — only visible tiles generate instances. The stamp-tile asset (§8.10)
  is loaded and hash-checked at worker start in ≤ 5 ms per worker per session (≈ 0.03–0.06 ms for 8–16 classes,
  measured cost model, `docs/validation/bench/fixall_rendering_r4_stamptiles.out`); nothing is sampled or ranked at run
  time, so the first zoom to the district band carries no library build (NR3-7). **The crown library (NR4-5):** its
  build (20 crowns per class per style, once per session) and, in `lit` with a `path` sun, each light step's bake run
  in the tile worker as one-sprite class-3 units (§8.9), ≤ 20 ms of tile-worker time per (style, light step) for eight
  crown classes (PLAUSIBLE: ≈ 20–60 µs per sprite on Canvas2D, ≈ 3–10 ms for 160 sprites), started when the style loads
  so the first district-band raster finds it ready; a light step's bake runs at the head of §8.4's light pass, inside
  its settle bound. Measured with M2b's moving-sun runs (§8.4), where `lit` ships; pre-decided fallback: §8.4's — with a
  `path` sun the lit programs and the crowns hold the sheet's fixed sun, so the library is baked once, reported.
* **SVG** at METROPOLIS, city band: ≤ 650 B per building plus the text — outlines ≤ 64 B per placed glyph and ≤ 0.5 KB
  per distinct glyph, or each embedded face's base64 bytes once (≤ 0.5 MB per face) (§11.1, N-13) — and ≤ 60 000
  elements, written in ≤ 2 s in the generation worker — the transient list's build (≈ 4 µs per building, ≈ 54 ms at the
  METROPOLIS target), S13b at the export stop (≤ 2 ms per 2 000 candidates) and the writing, with the list released
  after it (§11.1; NR-5); Inkscape opens it within 120 s (§11.1).
* **PNG:** A2 at 300 dpi of a CITY in ≤ 20 s on the reference machine **with the view idle**, the peak canvas one tile
  band. Inside it: the transient list's build in the generation worker (≈ 4 µs per building at the city band —
  ≈ 21 ms at CITY — and more at the finer band a large print's scale selects; §8.7, §11.1); the export's placement in
  the tile worker (≈ 1 µs per candidate in the frame — ≤ 20 ms for 20 000 candidates, more than a whole CITY's label
  rows at any band: ≈ 3 500 names, §12.4, one address per building and the repeats of long street names — in class-4
  steps, §8.9; NR4-2); and the
  encoding (§8.8's per-row filter rule, then the deflate), measured on a synthetic A2 map in Node 24
  (`docs/validation/bench/fixall_rendering_r5_png.out`) at 3.5 s for flat `ink`-like colours, 5.4 s under smooth
  relief shading and 10.5 s for a textured `lit`-like look, of which the filter pass takes 2.7 to 3.4 s and the
  deflate the rest
  (PLAUSIBLE for browsers, whose filter pass is the same JavaScript and whose deflate is native code behind
  `CompressionStream`). View
  work pre-empts the export's steps (§8.9), so a pan or zoom during an export lengthens it by that work, which the
  export dialog's progress shows, and an animated view still leaves it one step in every 100 ms (NR3-6).
* **Confirmation of the export budgets (N-27 c).** The SVG and PNG budgets are measured at M1 on B-CITY-lite's TOWN and
  CITY seeds and at M2b on METROPOLIS. Pre-decided fallbacks, taken once and reported: an SVG size or element miss at
  the city band writes path coordinates with one decimal of the export's unit instead of two and merges compound paths
  per (semantic, quarter of the city cut) instead of per (semantic, district), re-keying the `<metadata>` map; a
  district-band SVG that misses its estimate draws woods and orchards as their outlines instead of crowns; a PNG time
  miss is answered per host, the same pixels in a larger file each time (NR4-4): **on every host** the row filter is
  fixed to type None for every row instead of §8.8's per-row rule — on the synthetic A2 the filter pass disappears and
  the unfiltered rows also deflate faster, so encoding falls from 3.5, 5.4 and 10.5 s to 0.6, 1.3 and 4.4 s for the
  flat, relief and textured looks, the file 4 % smaller to 10 % larger; **in Node**, whose `zlib` takes a level, a miss that
  remains deflates at level 3 instead of 6 (a further 0.35–2.5 s on the synthetic looks, the file 8–51 % larger);
  **in browsers**, whose `CompressionStream` takes a format and no options — in Node 24's implementation of the same
  standard a `{ level }` option is ignored, 5.3 MiB with none, level 1 and level 9 alike — a miss that remains after
  the filter change re-declares the PNG budget at the measured p95 as a D-18 amendment for the owner's veto. Chose type
  None over the fixed Sub filter as the fallback because, measured on all three looks, None is both faster and no
  larger — Sub still spends ≈ 0.2 s filtering and deflates as slowly as the default, and its files are 7–30 % larger
  than the default's — and chose §8.8's per-row rule as the default over None because it gives the smallest file
  wherever rows carry gradients or texture (7–10 % smaller on the relief and textured looks) and the budget has room
  for its filter pass. **Export beside the view
  (NR3-6):** B-CITY's browser run at M1 adds a scripted pan and zoom during an A2 300-dpi export of a CITY, in §12.1's
  timing phase — pass: every settle within §12.5's bound, the export completes, and its PNG matches, byte for byte, the
  export made with the view idle and one during which an edit is made (§8.9, §11.1); pre-decided fallback:
  §8.9's `step(4)`. **The stamp-tile load (NR3-7)** is timed with the first map at M1, per worker from worker start to
  the library ready; pre-decided fallback on a miss: the per-session hash check moves to CI and the release build,
  leaving typed-array views over the bundled bytes.
* **Stage-3 hook (§2.6; SCL-13):** the base outline builder's `outline()` is inside S11's geometry share (≤ 3 µs per plot
  median, §3.7); a stage-3 generator's `outline()` is admitted at ≤ 10 µs per building median and its registration
  re-declares S11's row of §12.4 by the measured difference (§2.6, §3.7); `compose()` ≤ 1 ms per building median at
  `wings`, in the derivation pool on the tile's band request (§8.6, §8.9), one tile's
  compositions within 16 ms of pool time, amortised (a tile draws the outline until its compositions arrive).
* **Simulation module (§10.3; FTG-11):** one hour of occupancy for 50 000 people ≤ 50 ms in the worker, with a cost-model
  test (§13.2); never on the one-click path.

## 3. Cross-area requests

The integrator applies these in the owning areas' sections. Every quoted "before" text was found exactly once in the
current `docs/ARCHITECTURE.md` (10 723 lines) by a whitespace-normalised search (17 strings). Each request names the
item it serves.

### 3.0 Other areas' round-5 requests to this area, and where they went

| from | request | where |
|---|---|---|
| determinism RR5-4 (VD4-6, VD4-2) | §12.6: the load recomputation of the model and records trees, "once the saved copy's own roots have matched", "5 ms finalises the model and records digests" | folded into this file's §12.6 block verbatim (determinism's final wording governs) |
| pipeline X-R1 (NP4-6) | §12.6's warp line: the Apply budget counting §2.6's wing carry and check, M3a measurement, pre-decided fallback | folded into this file's §12.6 block verbatim |
| determinism RR5-1 (§11.2), RR5-2 (§11.3), RR5-3 (§9.6), RR5-5 (§12.8); kernel `r5-kernel.md` X-R1 (§12.8, VK4-5: the arena's figure names the index's home column) | — | not in this file: those subsections are not replaced here; the integrator applies them as written |
| determinism, its §6.5 block | NR4-3's lint closure, folded by determinism ("the rendering area's wording governs") | aligned by D2 below |

### 3.1 Kernel (§3.1)

| # | section | request |
|---|---|---|
| K1 | §3.1, row **Poisson-disc / blue noise** (NR4-1) | replace "to build the small set of ranked, periodic blue-noise tiles of §8.10 at a reference spacing of 4 m, shipped as a hash-checked asset" with "to build the small set of ranked, periodic blue-noise tiles of §8.10 at a reference spacing of 4 m — four per class, sharing one border band cut from a fifth, full tile, so that any two meet without a seam (NR4-1) — shipped as a hash-checked asset". |

### 3.2 Determinism (§6.1, §6.5)

| # | section | request |
|---|---|---|
| D1 | §6.1 **Concern registry**, the `render.stampTiles` entry (NR4-1) | replace "(stamp-tile domain, decoration class index, the reference spacing 400 cm, tile index), with `STAGE_VIEW`;" with "(stamp-tile domain, decoration class index, the reference spacing 400 cm, creation index — 0–3 for the class's four tiles, 4 for their shared border band, §8.10; NR4-1), with `STAGE_VIEW`;". The key's word count and order are unchanged, so no other key moves. |
| D2 | §6.5 (3), the allowlist lint's view-code closure (NR4-3) | determinism's round-5 block already adds "— and §8.10's instance function, which the model-format exporters and override resolution call in the generation worker (NR4-3; the rendering area's wording governs)". This area's wording: "— and §8.10's instance function with every function it calls — the stamp, grid and line layouts, the per-instance look draws and the density edge test — which the model-format exporters and override resolution run in the generation worker and whose positions §13.3 compares byte for byte across engines (NR4-3)"; and in the next sentence replace "the import closure of those implementations and column writers" with "the import closure of those implementations, column writers and the instance function". |

### 3.3 Scope (§13.2, §13.3, §13.8, §14, §15.1, §16, the one-page summary, Judgment calls)

| # | section | request |
|---|---|---|
| SC-1 | §13.3, the nightly cross-platform golden run (NR4-3) | replace "identical model digests per stage, identical derived-complete digests and identical placement digests on every engine." with "identical model digests per stage, identical derived-complete digests and identical placement digests on every engine; and, from M3a (the GeoJSON exporter's milestone), the strict GeoJSON of one golden CITY seed (`coast+river`) with its trees — §8.10's integer-centimetre instance positions with their species, crown diameters and leaf types — byte-identical on every engine, workers on and off (§11.1; NR4-3)." |
| SC-2 | §13.2 **Stage contract tests** (NR4-1, NR4-2) | after "a tile rastered whole and in 1-ms slices is pixel-identical (§8.3; NR3-2; rendering round 4 S5)." add "A stop placed whole and placed one unit per step gives identical placement digests (§8.3, §9.2; NR4-2); the shipped stamp tiles pass the seam check — 0 point pairs closer than r₀ across cells in all 256 2 × 2 arrangements of each class's four tiles, for every band's rank subset (§8.3, §8.10; NR4-1)." |
| SC-3 | §13.8 tiers (NR4-1, NR4-2, NR4-3) | PR row: replace "the stamp-tile asset's loaded hashes against their stored values (§8.10);" with "the stamp-tile asset's loaded hashes against their stored values and its seam check (§8.3, §8.10; NR4-1);". Nightly row: replace "the stamp-tile asset rebuilt on the five engines and its loaded hashes in both workers, and the sliced-raster census rows (§8.3);" with "the stamp-tile asset rebuilt on the five engines and its loaded hashes in both workers, the sliced-raster and sliced-placement census rows (§8.3; NR4-2), and from M3a the five-engine GeoJSON with trees (§13.3; NR4-3);". |
| SC-4 | §14, `@plat/labels` interfaces (NR4-2) | replace the line "`interface LabelPlacer { place(stop: ZoomStop, labels: LabelEntity[], obstacles: ObstacleSource, roles: RoleIndex, fonts: FontMetrics, memo: PlacementMemo): PlacementSet /* §9.2; view data */ }`" with §9.2's declarations: `interface LabelPlacer { begin(stop: ZoomStop, labels: LabelEntity[], obstacles: ObstacleSource, roles: RoleIndex, fonts: FontMetrics, memo: PlacementMemo): PlacementJob; place(stop: ZoomStop, labels: LabelEntity[], obstacles: ObstacleSource, roles: RoleIndex, fonts: FontMetrics, memo: PlacementMemo): PlacementSet /* begin(…) then step(Infinity) */ }   // §9.2; view data` · `interface PlacementJob { step(deadlineMs: number): boolean /* runs units on from where it stopped; returns after the first unit that ends deadlineMs or more after the call began; true when complete */; result(): PlacementSet; cancel(): void; readonly spentMs: number }   // resumable, so the tile worker serves queries and view work between units (§8.9, §9.2; NR4-2)`. |
| SC-5 | §16 build plan (NR4-1, NR4-2, NR4-3, NR4-5) | M1 exit: after "the stamp-tile asset load (§8.10, §12.7);" add " the stamp tiles' seam check (§8.3; NR4-1); the sliced-placement census row, and the export's placement stepped in class 4 during the pan-and-zoom export run (§8.3, §8.9; NR4-2);". M2b exit: after "the moving-sun step budget (§8.4);" add " the light passes and the crown bake of a `path` sun in `lit`, with §8.3's light-step row (§8.4, §12.7; NR4-5);". M3a exit: replace "GeoJSON loads in QGIS with districts \|" with "GeoJSON loads in QGIS with districts; the GeoJSON with trees byte-identical on the five engines (§13.3; NR4-3) \|". |
| SC-6 | The whole design in one page (NR4-6 (a)) | replace "meets the improvement plan's speed bars for a typical run in towns" with "meets the improvement plan's speed bars for 19 runs in 20 in towns", and "1.9 seconds in a typical run and up to a quarter longer in the slowest" with "1.9 seconds in 19 runs in 20 and up to a quarter longer in the slowest" — the same p95 figures §12's plain words now describe that way. |
| SC-7 | §15.1, row **B19** (NR4-1) | replace "(Poisson k = 50, built when the product is built and shipped; scaled per entity by its spacing)" with "(Poisson k = 50, built when the product is built and shipped; four seam-compatible variants sharing one border band; scaled per entity by its spacing)". |
| SC-8 | Judgment calls (NR4-1 – NR4-5) | restate J-R42 and append J-R50 – J-R54 as §3.4 gives them; the preface's round list gains "Round 5 (rendering) added J-R50 – J-R54 and restated J-R42" beside the other areas' round-5 rows. |
| SC-9 | Judgment calls, row **J-I15** (observation, not an item of this area) | `doc_checks.py` S1 flags the row: its code span "`('gate_end', gate, 0 \| 1)`" (written here with the pipe escaped) holds a bare pipe, which GitHub-flavoured Markdown splits into a third cell. Write the pipe as `\|` inside the code span. |

### 3.4 Judgment-call rows (restated and new)

| id | row |
|---|---|
| J-R42 (restated) | Chose a constant stream key for the stamp-tile library — (class, reference spacing, creation index: 0–3 for the four tiles, 4 for their shared border band), `STAGE_VIEW`, `render.stampTiles` — with integer-centimetre points, `dmath` transcendentals, index-order sums and ties and the stated removal update, built when the product is built by `plat/tools/stamptiles/` and shipped as a hash-checked asset, over a seed- or document-keyed library and over building it in each session, because the tiles are shared by every document, session and host, the per-town variety comes from the stamp's offset, rotation, spacing and seed-dependent variant, and a session build ran unbudgeted on the first district-band settle in both workers (§8.10; NR-6, NR3-7, NR4-1). |
| J-R50 | Chose four seam-compatible stamp tiles per class sharing one border band — the points within half the reference spacing of a tile edge, cut from a fifth, full toroidal tile, each tile filling the rest by Bridson seeded with the band — over the independent variants (3.5–5 pairs of trees per 64-m seam closer than the spacing), over one larger toroidal tile (every instance position repeats on a periodic lattice), over a band of the full spacing (≈ 23 % of each cell's points repeated instead of ≈ 12 %) and over a band sampled by Bridson inside itself (a density stripe along every lattice line), because the half-width cut band gives 0 close pairs across every seam for every band's subset (measured on all 256 2 × 2 arrangements) while keeping ≈ 88 % of each cell varying and a full tile's density; the price is slightly larger holes along the band's inner edge (largest empty circle 1.20 × r₀ against ≤ 1.08) (§8.10; NR4-1). |
| J-R51 | Chose S13b as a resumable placement job — one decision per unit, the local evaluation on an explicit stack with the memo kept between steps — stepped in the tile worker's queue (class 3 for the view, class 4, first, for an export) over running it whole at a stop, because a large print's placement grows with the candidates in its frame and would hold queries and the view behind one unbounded unit, while every unit boundary is a safe stop that leaves the placement digest unchanged (§8.9, §9.2, §11.1, §12.7; NR4-2). |
| J-R52 | Chose integer-centimetre instance positions computed with `dmath` (R_θ from the integer `rotationCdeg`), the whole instance function under §6.5's allowlist lint, over double positions from the engine's `Math.cos`, because the model-format exporters write those positions and promise files byte-identical on every host, and the centimetre is the model's own lattice, so the face test is exact too; the price is ≤ 1.5 cm off the spacing (§8.10, §11.1; NR4-3). |
| J-R53 | Chose, for a PNG time miss, the None row filter on every row on every host — then zlib level 3 in Node, and in browsers, whose `CompressionStream` takes no level, the D-18 re-declaration — over zlib level 3 alone, which browsers cannot apply and which measured the smaller lever, and over a fixed Sub filter, which measured slower and larger than None on flat, relief and textured synthetic maps; and kept the per-row minimum-sum rule as the default because it gives the smallest file wherever rows carry gradients or texture (§8.8, §12.7; NR4-4). |
| J-R54 | Chose a light step — the path sun quantised to 15° of azimuth and 5° of altitude — for `faceLight`, the two-tone roofs, `hillshade` and the `lit` crown bake, keying the `under` and `over` layers (or `base`) by it and re-rastering them in a light pass that runs to completion, over lighting them by the 1° sun (a full re-raster per 1° step) and over keying only the shadows by the sun (roofs and crowns of several suns side by side, differing by tier); the fallback holds the fixed sun for all but the shadows (§8.4, §8.8, §8.10, §12.7; NR4-5). |

## 4. CONFIRMED versus PLAUSIBLE, and what a Fable reviewer should re-check first

**CONFIRMED (executed in this lane).** (1) `fixall_rendering_r5_seamstrip.mjs` on the reference machine (Apple M1,
Node 24.12), output committed: the chosen construction's 0 close pairs across cells in all 256 2 × 2 arrangements on
five seed sets, for all ranks and the rank < 0.6 and < 0.25 subsets (independent tiles 16 672, < r₀ ÷ 2: 2 368);
within-tile minimum distance r₀; quarter-prefix spread 1.52–1.77 × r₀; band share 11–14 %; density and hole figures;
≈ 19.5 ms per class; ≈ 30.9 KB for eight classes. (2) `fixall_rendering_r5_png.mjs`, output committed: the encoding
split on three synthetic A2 looks, the filter-rule and zlib-level comparisons, and `CompressionStream` ignoring a
`{ level }` option in Node 24.12 (the same bytes with none, 1 and 9; `CompressionStream.length` = 1). (3) The eleven
blocks applied to a copy of the document by script (every edit matched its subsection exactly once) and
`doc_checks.py` run on the copy: 0 unreviewed hits in this area; the one remaining S1 hit is J-I15's (SC-9). (4) Every
"before" string of §3 (17) found exactly once in the current file, whitespace-normalised. (5) A diff of each block
against the section it replaces shows only the changes §1 lists, plus the folded RR5-4 and X-R1 text in §12.6.

**PLAUSIBLE (this seat's reasoning; no engine exists).** That browsers' `CompressionStream` ignores a level as Node's
does (the standard's constructor takes a format only; not executed in a browser — the built-in browser cannot open
local files); that the synthetic looks stand for real `ink`, relief and `lit` renders; the crown bake's ≈ 20–60 µs per
sprite and ≤ 20 ms per light step (M2b measures it, with the fixed-sun fallback); that a placement unit costs ≈ 1 µs on
average and tens of µs at most, and that ≤ 20 000 candidates bound a CITY print; that a light pass fits the settle
bound (it is a settle). The seam bench is a cost-and-property model (a software exponential, our own PRNG), not the
product's code; its property results (0 close pairs) follow from the stated proof, which holds for any seeds.

**What a Fable reviewer should re-check first.** (1) **NR4-1's two refinements** of the required change: a band of
r₀ ÷ 2 instead of r₀, and the band cut from a full tile instead of sampled inside itself — check the proof in §8.10's
*Tiles* bullet and whether the slightly larger holes along the band's inner edge (1.20 × r₀) are acceptable to the
owner's eye, against the alternative of one larger toroidal tile (J-R50). (2) **NR4-4's None filter** as the fallback
over the verifier's Sub, and keeping the per-row rule as the default although None was smaller on the flat look
(J-R53). (3) **NR4-5's premise** — that `faceLight`, the two-tone roofs, `hillshade` and the `lit` crowns should follow
a `path` sun at all (light steps), where the verifier asked whether they are meant to; the fallback (fixed sun for all
but shadows) is the other reading (J-R54).
