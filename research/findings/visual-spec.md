# Visual specification of the four reference generators

Slice: **visual-spec**. Sources are *our own recordings only* — screenshots, `*.draw.json` canvas2D paint logs,
`report.md` drawing-record sections, CPU-profile class names, and the network asset index.
No captured JavaScript bundle was opened (per the hard rule). Where I quote a number that came out of a
PNG I re-measured it in Python/PIL; those measurements are reproducible from the paths cited.

Evidence tags used throughout:

* **[SHOWN]** — directly visible in a screenshot or directly present in a recorded paint log.
* **[MEASURED]** — a number I extracted from the PNG myself (pixel scan / histogram) — a stronger form of SHOWN.
* **[INFERRED]** — my reconstruction, with the reasoning given.
* **[UNKNOWN]** — a re-implementer has to decide; I say what the decision is.

There is no **[STATED]** material in this slice: none of these files contain creator prose. The devlog/post
slices own that.

---

## 0. What the recordings are, and what they can and cannot tell us

| Generator | Recorded as | Renderer (from the record) | Paint log available? |
|---|---|---|---|
| MFCG | `captures/mfcg/2026-09-21T05-03-24/`, `…T05-06-58/` | OpenFL/Haxe → **canvas2D rasterised per display object, uploaded to WebGL as textures** | yes, 7 maps |
| Village (VG) | `captures/village/2026-09-21T05-04-05/`, `…T05-37-29/`, `…T05-38-17/` | **single canvas2D painter** (plus a few WebGL blits) | yes, 8 maps |
| Neighbourhood (NG) | `captures/neighbourhood/2026-09-21T05-04-54/`, `…T05-38-59/`, `…T05-40-05/` | **canvas2D painter**, same family as VG but far simpler | yes, 8 maps |
| FTG | `captures/ftg/2026-09-21T05-08-07/`, `…T05-23-58/` | **three.js / WebGL**, merged BufferGeometry + normal maps + SDF text | **no** — no canvas2D to hook; evidence is screenshots, CPU-profile symbols and the asset list |

### 0.1 How to read a `*.draw.json`

`rec.log` is the ordered paint log. Entries are
`[tMs, op, canvasSize, style, segments]` for `fill`, `[tMs, op, canvasSize, style, segments, lineWidth]` for
`stroke`, and `[tMs, 'fillText', canvasSize, text, font]` for text. `canvasSize` is the size of the canvas the
op landed on.

* For **VG and NG** there is essentially **one big canvas** (≈1300–1450 px) so `canvasSize` changes only when
  the painter switches to a per-object offscreen (NG draws every *tree* on its own small canvas). The runs in
  the log are therefore the **layers**, in order.
* For **MFCG** every `openfl.display.Graphics` is rasterised into its **own canvas sized to that object's
  screen-space bounds**, then uploaded (`texImage2D` counts track object counts: 416/462/332/304/740/590/664).
  So a change of `canvasSize` = a change of *display object*, and the run order **is the display-list order**,
  i.e. the layer order. Canvas dimensions are screen pixels, so they double as a bounding-box readout for
  every layer (e.g. a `475×1110` canvas is a shape that occupies 475×1110 screen px).

### 0.2 MFCG's two coordinate spaces — the key to reading its line widths

MFCG's recorded `lineWidth` values are **object-local units**, not pixels. Two spaces coexist:

* **Map space** — everything geographic. World units are converted by a per-map scale `s` px/unit.
* **Screen space** (`s = 1`) — grid, scale bar, compass, all text.

`s` is recoverable from the record because MFCG sets the hairline used for every building outline to
**half a screen pixel**: `hairline h ≈ 0.5 / s`.

Cross-check on `captures/mfcg/2026-09-21T05-03-24/draw/gen-0.draw.json` ("Feygate"), `h = 0.119`:

| feature | recorded lw | predicted px at `s = 4.15` | measured px | source of measurement |
|---|---|---|---|---|
| building outline | 0.119 | 0.49 (→ 1 px at ~50 % ink) | 1 px at `#605d56` over `#a5a095` = 0.50 coverage | scan row 245, x 946–978 |
| city/castle wall | 1.9 | 7.9 | **8 px** solid `#1a1917` | cols 380/400/420/440, y 55–130 |
| road fill | 2.0 | 8.3 | **9 px** paper between two dark slivers | row 1000, x 894–902 |
| pier fill | 1.081 | 4.5 | **4 px** | col 300, y 85–320 |
| river fill | 7.138 | 29.6 | 31–38 px on oblique cuts (~33 perpendicular) | river profile scan y 520–1095 |
| grid (screen space) | 0.267 | 0.27 ⇒ 27 % ink | 1 px of `#a09a90`; 27 % of `#1a1917` over `#ccc5b8` = `#9c` ✓ | row 620 / col 1200 |

`h` across the seven recorded MFCG maps: `0.119, 0.121, 0.245, 0.143, 0.556, 0.578, 0.905`
⇒ `s ≈ 4.2, 4.1, 2.0, 3.5, 0.90, 0.87, 0.55` px/unit. The three fixed screen-space widths `1.9`, `0.267`,
`0.533` (and `1.067` on the big maps) never change across any map. `1.9` however behaves as a *world* width —
it is the only map-space constant that is literally constant, so the wall is **1.9 world units ≈ 8 m** thick.
[MEASURED] + [INFERRED]

**The casing rule (MFCG's single most reusable trick).** Every "ribbon" feature is stroked twice:

```
stroke(path, colour = INK,       width = w + 2h)   # casing
stroke(path, colour = FILL,      width = w)        # body
```

so the visible dark edge is exactly one hairline on each side. Verified on all seven maps:

| map (`h`) | river casing/fill | Δ | road casing/fill | Δ | pier | bridge |
|---|---|---|---|---|---|---|
| 05‑03‑24 g0 (0.119) | 7.375 / 7.138 | 0.237 = 2h | 2.237 / 2.0 | 0.237 | 1.319 / 1.081 | 2.119 / 1.881 |
| 05‑03‑24 g1 (0.121) | 7.096 / 6.854 | 0.242 | 2.242 / 2.0 | 0.242 | 1.321 / 1.079 | 2.121 / 1.879 |
| 05‑03‑24 g2 (0.245) | 13.501 / 13.012 | 0.489 | 2.489 / 2.0 | 0.489 | — | 2.245 / 1.755 |
| 05‑03‑24 g3 (0.143) | — (no river) | — | 2.285 / 2.0 | 0.285 | 1.343 / 1.057 | — |
| 05‑06‑58 g0 (0.556) | 20.052 / 18.94 | 1.112 | 3.112 / 2.0 | 1.112 | 1.756 / 0.644 | 2.556 / 1.444 |
| 05‑06‑58 g1 (0.905) | 15.358 / 13.548 | 1.810 | 2.105 / 0.295 | 1.810 | — | — |
| 05‑06‑58 g2 (0.578) | 15.535 / 14.379 | 1.156 | 3.156 / 2.0 | 1.156 | 1.778 / 0.622 | 2.578 / 1.422 |

Body widths are usually round world constants: **road = 2.0 u, bridge = 2.0 u, pier = 1.2 u, wall = 1.9 u**.
Pier and bridge read as `1.2 ± h` and `2.0 ± h` — the pair *straddles* the nominal width (pier
`1.319/1.081 = 1.2 ± 0.119`) — whereas the road pair is `2.0` and `2.0 + 2h`. Two slightly different
conventions coexist, and the one exception in the sample is `05-06-58 g1` (*Longfair*), whose road body is
`0.295` rather than `2.0` while the casing rule still holds exactly — so the road width is **not** a hard
constant. River width is clearly a model parameter (6.9 – 18.9 u). [MEASURED]

---

## 1. MFCG — Medieval Fantasy City Generator

Style: **monochrome antique print on grey-buff paper.** Four inks, no gradients, no alpha (none recorded),
no dashes (`rec.dashes` is empty on every map), round joins and round caps almost everywhere.

### 1.1 Canvas and resolution strategy

* One DOM canvas, `1500×1100`, `cssW/cssH` identical ⇒ **1× device pixels, no HiDPI** [SHOWN
  (`dom.canvases` in every `*.draw.json`)].
* Rendering is **OpenFL's WebGL backend**: each vector object is rasterised to its own offscreen canvas at the
  object's screen bounds and uploaded with `texImage2D`. Counts per map: 416 / 462 / 332 / 304 (small maps),
  740 / 590 / 664 (metropolis). `drawElements` 188–531, `clear` 43–160, `useProgram` 25–60.
* A ward with ~120 buildings becomes **one** texture (e.g. `344×369` carrying 270 fills + 806 strokes), so
  the number of GPU objects stays in the hundreds even when the map has 46 000 fills. This is the
  performance story: **cache per ward, not per building.** [SHOWN]
* Per-glyph rasterisation: each *character* of a district label becomes its own tiny canvas
  (`36×55`, `26×44`, `19×31`…). This is why `fillText` count = character count (123/127/74/65/195/158/164).

### 1.2 Palette (exact)

| hex | share of "Feygate" frame | role |
|---|---|---|
| `#ccc5b8` | 60.3 % | **paper / ground**, and the *fill* colour of roads, piers, bridges, compass highlights |
| `#7f7a71` | 21.2 % | **water** — sea polygon fill and river body |
| `#a5a095` | 9.2 % | **building body** |
| `#1a1917` | 2.6 % | **ink** — all outlines, walls, towers, building shadows, landmark buildings, all text |
| `#a09a90` | 1.5 % | what a 1 px 27 %-ink **grid line** resolves to over paper (derived, not a set colour) |
| `#a59f93` | — | **field furrows** (the only extra map ink) |
| `#3d3940` | — | UI: Menu-button background |
| `#d9d5c3` | — | UI: Menu-button label |

`fillStyles`/`strokeStyles` across all seven maps contain *only* these plus `#ff0000`/`#000000` used on 1×1
canvases (OpenFL internals). Water and buildings never change colour with map size.
[MEASURED, histogram of `captures/mfcg/2026-09-21T05-03-24/draw/gen-0.png`]

### 1.3 Layer order, bottom → top

Taken verbatim from the run order of `05-03-24/draw/gen-0.draw.json` (canvas sizes in brackets are the
layer's screen bounding box, which is itself informative):

1. **Stage background** `#ccc5b8` — painted by `gl.clear`, not by canvas2D. (The `1×1` `fillRect`s at the top
   of the log are `#ff0000`, `#000000`×2, `#3d3940`×2, `#d9d5c3` = OpenFL solid-colour bitmaps + UI chrome.)
2. **Sea / lake** `[475×1110]` — ONE polygon, **159 segments**, `fill #7f7a71` + `stroke #1a1917 @ h`.
   A single very detailed coastline; no shore band, no ripples, no depth shading.
3. **Roads — casing pass** `[789×1408]`, `[1196×543]`: `stroke #1a1917 @ 2.237`, 63 and 55 segments.
4. **Roads — body pass**: `[865×1628]`, `[1503×626]`, `[120×15]`, `[17×264]`: `stroke #ccc5b8 @ 2.0`.
   (2 long roads + 2 stubs; the stubs get no casing.)
   The two passes are **strictly separated**: *every* casing is laid down before *any* body. Confirmed on
   `05-03-24/draw/gen-2.draw.json` (Longvale), which opens with 4 casings at `2.489` and then 5 bodies at
   `2.0`, and on `05-06-58/draw/gen-0.draw.json` (Great Market), which opens with 5 casings at `3.112`.
   This is the standard cartographic two-pass road render and is what keeps junctions clean.
5. **River + bridges** `[1914×1023]` — bounds exceed the viewport because the river is drawn to its full
   off-map extent. Ops in order: `stroke #1a1917 @7.375` (149 seg) → `stroke #7f7a71 @7.138` (149 seg) →
   `fill #7f7a71` (4 seg, the mouth) → hairlines → bridge pair `#1a1917 @2.119` / `#ccc5b8 @1.881`.
6. **Landmark buildings** `[9×10]`, `[21×46]`, `[85×140]` — solid `#1a1917` fills, 5/5/9 segments.
   These are the castle keep, a temple, a mill: **important buildings are solid black silhouettes.**
7. **Wards** — one cached canvas each (12 in this map: `132×185`, `208×219`, `246×253`, `163×337`, `176×271`,
   `344×369`, `116×90`, `228×435`, `204×241`, `196×206`, `143×194`, `290×135`). See §1.4.
8. **Piers** — interleaved with the wards, one canvas per wharf ward (`56×53`, `58×71`, `57×70`, `65×98`,
   `54×69`), 2–4 piers each, each a 3-segment path stroked `#1a1917 @1.319` then `#ccc5b8 @1.081`.
9. **Farm fields** `[88×136]` — `stroke #a59f93 @ h`, 45 segments = the furrows. No field outline at all;
   the field reads only as a hatch patch.
10. **Walls** `[623×769]` — 2 strokes `#1a1917 @1.9`: the town wall (33 seg) and the castle wall (11 seg).
    Note walls are drawn **after** the buildings, so buildings tuck under the wall.
11. **Towers** — `19×19` ×13 and `24×24` ×4, each `fill #1a1917` with 2 segments (i.e. an `arc`).
    `arc` count 18–28 per map ≈ towers + one compass circle.
12. **Grid** `[1504×1103]` — one `stroke #1a1917 @0.267`, 47 segments, screen space.
13. **Scale bar** `[229×15]` — `stroke #1a1917 @0.533`, 11 segments; then `fillText` "0", "100", "200", "m"
    at **21 px IM FELL Great Primer Roman**.
14. **Compass** `[164×163]` — 2× `fill #1a1917` (16 seg) + 2× `fill #ccc5b8` (16 seg) + 5× `stroke @0.533`;
    then `fillText "N"` at 27 px.
15. **District labels** — per glyph, 27 px, see §1.7.
16. **Title** `[177×72]` — one `fillText` at **54 px**.
17. **UI** — Menu button `fill #3d3940` (13-seg rounded rect, hence `quadraticCurveTo: 8`) + `fillText "Menu"`
    at **18 px Share Tech Regular** `#d9d5c3`.

[SHOWN for the order; the feature labels are [INFERRED] from matching each layer's bounding box, colour,
segment count and width against the rendered PNG, which is unambiguous for every layer listed.]

### 1.4 Buildings

Per building the painter emits exactly four ops: `fill(n)`, `stroke(0)`, `stroke(n+1)`, `stroke(0)` — a filled
polygon and its hairline outline (the zero-segment strokes are graphics-state flushes). `n` is 5–11, i.e.
**quads to nonagons, mostly quads and pentagons**. [SHOWN]

Within a ward the fills come in **alternating runs of dark then light**, one pair per city block:

```
132×185:  D17 L13  D9 L7  D10 L9  D10 L9
344×369:  D16 L12  D12 L10  D18 L11  D9 L7  D6 L4  D20 L18 …  (11 pairs)
116×90 :  D7  L6
```

Dark (`#1a1917`) always precedes light (`#a5a095`) and outnumbers it: over the whole map 786 : 577, 746 : 562,
2374 : 1816, 964 : 714, 19574 : 15367, 46009 : 36480, 17086 : 13349 → **ratio 1.26 – 1.36, mean ≈ 1.30**.

What the dark polygons are: a **drop shadow drawn under the bodies.** [MEASURED] — on an isolated pair of
buildings at `x≈946–978, y≈240–267` in `05-03-24/draw/gen-0.png`, the body ends at y = 264 and a band of pure
`#1a1917` occupies y = 265–267 spanning x = 947–979: a **≈3 px band below, ≈1 px to the right, none above or
left**. At `s ≈ 4.15` that is an offset of about **(+0.25, +0.7) world units, i.e. essentially straight down**.
Because all shadows of a block are laid down before any body of that block, a shadow is visible only where it
escapes the neighbouring bodies — which is exactly the "black bar on the street side" look at 8× zoom.

**[UNKNOWN]** why dark fills outnumber light ones by ~1.3×. The extras are *not visible*, so they are covered
by the bodies. Candidates a re-implementer must choose between: (a) the shadow is the union of the footprint
and its offset copy and is emitted as more than one polygon for concave footprints; (b) a dark base is drawn
under *every* building and an additional offset shadow only for buildings facing open space (36 % would fit);
(c) some buildings are solid-ink landmarks that get no light body — the maps do show a handful of solid black
buildings inside wards (Farvale, Brightwood, Longvale), but nowhere near 30 %. Segment-count multisets rule
out a naive 1:1 offset copy: for ward `116×90` the dark segs are `{5,5,7,7,9,9,11}` against light
`{5,5,6,6,7,7}`.

Other building facts:
* Adjacent buildings **share a single hairline** — there is one 1 px divider, not two [MEASURED, row 300,
  `#3d3b37` single pixel between two `#a5a095` runs].
* Building size in Feygate: bodies measured 15–16 px across ≈ 3.6–3.9 world units ≈ **13–14 m**.
* Nothing indicates roofs, ridges, or per-building colour variation. MFCG buildings are flat grey blocks.

### 1.5 Water, roads, walls, gates, piers, bridges

* **Sea**: one high-vertex polygon — **159 segments** at town scale (Feygate, `475×1110`), **385 segments** at
  metropolis scale (Great Market, `597×1103`) — flat fill, hairline coastline, **no beach, no ripple, no depth
  ramp**. The grid is drawn *over* the water. [SHOWN]
* **River**: a constant-width stroked polyline, `#7f7a71` body with `#1a1917` casing, round caps and joins, so
  the mouth is rounded. Profile measurement across 24 cuts (y 520→1095) gives 31–38 px horizontal,
  ≈33 px perpendicular ⇒ constant. Width varies per map (6.85 – 18.94 world units).
* **Roads**: `2.0` u body (≈8–9 px at town scale) in paper colour with an ink casing. At metropolis zoom the
  body collapses below a pixel and the road reads as a **fine double line** — very characteristic
  [SHOWN, `05-06-58/draw/gen-2.png` NW quadrant].
* **Town wall**: `1.9` u (≈8 px) solid ink polyline, round joins, drawn above the buildings. Vertices that
  carry a **tower** get a filled circle `19 px ⌀`; castle towers `24 px ⌀`. **Gates** appear as short ink
  rectangles straddling the wall where a road crosses (visible as black blocks/diamonds in Brightwood).
  [SHOWN]
* **Castle**: its own smaller wall ring (11 segments) with corner towers, plus a solid ink keep polygon.
* **Piers**: 3-segment cased lines, `1.2 ± h` u ⇒ ~4 px of paper with a dark edge, radiating into the water
  from wharf wards, 2–4 per ward [SHOWN, `mfcg_piers` crop].
* **Bridges**: one cased line per crossing at `2.0 ± h` u (wider than a pier). Named bridges get a label
  ("GREENWOOD BRIDGE", "HONEY BRIDGE", "OLD BRIDGE" in `05-06-58/draw/gen-0.png`).

### 1.6 Fields

Parallel **hairline furrows** in `#a59f93` at the same `h` as building outlines, spaced ≈9–10 px at town zoom,
angled per field (each field has its own direction), **no boundary stroke**. Because the line is sub-pixel and
diagonal, antialiasing breaks it into a dotted texture — that is the intended look, not a dash pattern
(`rec.dashes` is empty). At metropolis zoom the furrows degrade into a **stipple** that reads as a field
texture (`sw_parcels` crop). Counts: 1 field object in Feygate, 16–28 in the others. [SHOWN + MEASURED]

Parks/greens at metropolis scale appear as solid `#a5a095` blobs with no building subdivision
[SHOWN, `05-06-58/draw/gen-2.png` around Bluebridge].

### 1.7 Type, grid, scale bar, compass

* **Faces**: `IM FELL Great Primer Roman` for everything on the map; `Share Tech Regular` 18 px for UI only.
* **Title**: 54 px, mixed case, centred at the top, ink `#1a1917`, **no halo** [MEASURED, `mfcg_title` crop].
  Over water it is still legible because the water is mid-grey.
* **District labels**: 27 px, **all caps**, drawn **one glyph per `fillText`**, each glyph rotated to a curved
  baseline and letter-spaced generously. Each label's TextField is *scaled* to its district: the per-glyph
  canvases in one map are 15, 26, 29, 31, 43, 44, 45, 49, 51, 55 px tall — so **label size ∝ district size**,
  from tiny ("GOLDEN MILL") to huge ("OLD FEYGATE"). Every glyph carries a **thick paper-coloured halo**
  (≈2 px), which is why the glyph canvases are larger than the glyphs. No `strokeText` is recorded, so the
  halo comes from an OpenFL bitmap filter (GlowFilter-style) — **[INFERRED]**.
* **Grid**: 1 px, `#a09a90` (= 27 % ink), pitch **112.4 px** in the 200 m maps and **120 px** in the 1000 m
  maps. It is drawn *above* the map but *below* the furniture, and it crosses water and buildings.
  [MEASURED: row 620 hits at x = 994, 1106, 1218, 1331, 1443 → Δ 112,112,113,112; the 05‑06‑58 map gives
  Δ = 120,120,120,120.]
* **Scale bar**: bottom-left; a baseline from x = 10 to x = 237 with **5 ticks** dropping downward —
  major at 0/100/200, minor at 50/150. Labels sit *above* the bar in 21 px type, using the font's **old-style
  figures** (so "100" prints as "IOO"). One grid square = one major interval = 100 m ⇒
  **1 m = 1.124 px, 1 world unit ≈ 3.7 m** at Feygate's zoom. The unit switches to `km` on large maps
  ("0 1 2 km"). [MEASURED]
* **Compass**: bottom-right, 164×163 px. Construction from the log: `fill #1a1917` (16 segments = four
  triangles) ×2, `fill #ccc5b8` (16 segments) ×2, 5 hairline `@0.533` outlines, one `arc` for a ring, then
  `fillText "N"` at 27 px above it. That is an **8-ray rose, each ray split lengthwise into an ink half and a
  paper half**. Over paper the paper halves vanish and it reads as a 4-point star (Feygate, Brightwood); over
  water the full 8-ray rose with its ring is obvious (`sw_compass` crop). [SHOWN + [INFERRED] for the
  unification of the two appearances]

### 1.8 Stroke discipline

`lineJoin: round` on **4062 of 4063** strokes; `lineCap: round` on 4026, `butt` on 37 (the butt caps belong to
the grid, scale bar and furrows). Every map shows the same split. **There is no miter anywhere on the map.**
This single choice is most of MFCG's soft, inked feel. [SHOWN]

---

## 2. Village Generator — full-colour painterly

Style: **illustrated colour plate**: lit grass, cast shadows, gradient-filled trees, vignette.

### 2.1 Canvas and composition

* Viewport 1500×1100; the map is a **1100×1100 square** centred with **200 px black letterbox bars** left and
  right (black = 26.67 % of the frame exactly = 400×1100). The vignette layer's canvas is `1101×1101`,
  confirming the square. [MEASURED]
* Working canvases are 1300–1450 px — larger than the square, because features (river, forest) extend beyond
  the crop.
* **Everything is drawn in screen pixels** — `lineWidth` values are round numbers (0.5, 1, 2, 4, 8, 16) and the
  water band widths are large (59.188 etc.). No world→screen conversion needed. [SHOWN]
* `getImageData ×4 / putImageData ×2` plus a `128×128` canvas (white `fillRect` + 2 `drawImage`) at the very
  start = **a procedurally generated 128×128 texture/LUT** built once per map. **[UNKNOWN]** exactly what it
  encodes — noise, or an elevation→colour ramp. Its output is not visible as a separate op.
* `createLinearGradient: 694` for 347 trees = **exactly 2 gradients per tree**; `createRadialGradient: 4`
  (2 of which are the vignette).

### 2.2 Layer order, bottom → top (`village/2026-09-21T05-04-05/draw/gen-0.draw.json`)

| # | canvas | what | how |
|---|---|---|---|
| 0 | 1×1 | letterbox | 3× `fillRect #000000` |
| 1 | 128×128 | procedural texture | `fillRect #ffffff` + 2 `drawImage` |
| 1b | 392×346 (only in 05‑37‑29) | **settlement light mask** | 2× `stroke #ffffff @24` over the road graph, then one `drawImage` back — this is the bright halo around the village |
| 2 | 1315×1313 | **terrain contour texture** | 2037 strokes, **3 segments each**, `@0.5`, alternating `#a0b78d` (1008) and `#687f64` (1029) |
| 3 | 1319×710 | **tracks / minor paths** | 14 shapes; each drawn `fill+stroke #728d67 @4` then `fill+stroke #c5beac @2` |
| 4 | 796×1077 | **fields** | 8 polygons: `fill` (unique brown) + outline `@1` (darker) + furrow stroke `@0.5` with up to **666 segments** |
| 5 | 1365×1271 | **roads** | 3× `stroke rgba(197,190,172,0.5) @16` then 3× `stroke #c5beac @8` |
| 6 | 1313×1236 | **water mask** | `fill #ff0000`, 313 segments (never visible — an offscreen mask) |
| 7 | 1511×1367 | **water** | `fill #4c8699` (313 seg) → `stroke #508c9d @59.188` → `stroke #5592a1 @32.218` → `stroke #5a99a6 @11.391` → 2× `stroke rgba(31,54,77,0.5) @8` |
| 8 | 1323×1250 | **bridges** | 13 strokes: `#3b3a39`, `#a3c9cc`, `#bd9d86`, `#39302c` at `@1/@8/@0.5` |
| 9 | 1361×1343 | **shadow layer** | 453 fills + 175 strokes, **all flat `#9699ae`**, `@0.5` |
| 10 | 623×520 | **buildings** | 105 fills + 398 strokes, per-building colours |
| 11 | 483×718 | trees, cluster A | 27 gradient fills + 134 dark-green strokes |
| 12 | 1353×1350 | trees, cluster B | 320 gradient fills + 1600 strokes |
| 13 | 1101×1101 | **vignette** | 2 radial-gradient fills over the whole square |
| 14 | 248×70 / 102×38 | title + population | `fillText` ×2 |

### 2.3 Water — the precise depth-band law

`fill = #4c8699` (deepest) then **three shore-parallel strokes**, lighter and narrower each time, centred on
the shoreline so each contributes a band of half its width inland:

| map | W1 | W2 | W3 | W2/W1 | W3/W1 |
|---|---|---|---|---|---|
| 05‑04‑05 g0 | 59.188 | 32.218 | 11.391 | 0.54433 | 0.19245 |
| 05‑04‑05 g1 | 51.696 | 28.140 | 9.949 | 0.54434 | 0.19245 |
| 05‑38‑17 g0 | 84.889 | 46.207 | 16.337 | 0.54433 | 0.19245 |

`0.54433 = (2/3)^1.5` and `0.19245 = (1/3)^1.5` to five decimals. So for `N = 3` bands:

```
W_i = W * (i/N)^1.5        i = N … 1    (stroke the shoreline, widest/darkest first)
colours: #4c8699 (fill) → #508c9d → #5592a1 → #5a99a6
```

[MEASURED — the ratio identity holds on three independent maps.] The colour ramp steps by about
(+5, +6, +4) per band.

Verified in pixels on a cut across the river at y = 150 (`gen-0.png`): grass → `#a2ae90` → **`#c0baa9` sand,
9 px** → `#5895a3` 13 px → `#538f9e` 16 px → `#4d8798` core → mirror on the far bank → `#383736` dark bank
line → `#b9b3a3` sand. So: **lightest at the shore, darkest in the middle.**

Additional water furniture:
* The dark bank line is `rgba(31,54,77,0.5) @8` drawn **twice** ⇒ reads as a ~4 px near-black shoreline with a
  soft edge.
* A **thin pale line (~#cfe6e8) inset ~12–18 px from the bank** runs parallel to the shore — clearest on lakes
  (Moontree, Middle Pool, Ringdean). It is the boundary between bands 3 and 2 rendered as a highlight;
  **[INFERRED]**, since no separate stroke of that colour is recorded.
* The **beige beach strip** (~10 px, ≈`#c5beac`) is *not* in the water layer's op list. **[UNKNOWN]** — most
  plausibly it falls out of the terrain colour ramp keyed to distance-from-water or elevation, computed via the
  `getImageData/putImageData` pass and the `#ff0000` mask.

### 2.4 Terrain, contours, vignette

* Grass is never a flat colour: the histogram of a whole frame has no single colour above 0.8 %, the greens run
  `#728d69` → `#92b184` continuously. This is the **vignette**: 2 radial gradients over the 1101² square,
  bright at the settlement, dark at the corners. [MEASURED]
* **Contour texture**: 2037 (gen‑0) to 3300 (05‑37‑29) strokes of exactly **3 segments** at `@0.5`, in
  interleaved pairs `#a0b78d` (light) and `#687f64` (dark). Rendered, they are short dashes following long
  smooth curves, each dash doubled with a ~1 px offset ⇒ an **engraved/embossed** look. At 3× zoom
  (`vg_grass` crop) you can see the light/dark pairing directly. [SHOWN + MEASURED]
* **Footpaths** are a separate system: a line of **larger beige dots** (~4 px ⌀, ~8 px pitch, ≈`#d8d0bc`).
* **Settlement glow**: in `05-37-29` a `#ffffff @24` stroke over the road graph is rendered to an offscreen and
  composited — producing the bright halo around the village core seen in *Lost Pit*, *Amelceing*, *Maple
  Thicket*. [SHOWN]

### 2.5 Buildings

Per building: `fill(roofColour)` + `stroke(roofColour)` + **N dark plank strokes** (`@0.5`, N = 2…27) +
outline. Roof colours are sampled per building from two families:

* **warm/thatch**: `#ba9b85 #b99a84 #cdaa91 #c09f88 #b1937e #a48979 #c3a28a #ccaa90 …` with the dark half
  ≈ 0.78× the light half (`#73615e #6e5c59 #685855 …`).
* **slate/blue-grey**: `#55606d #7a878c #6b7880 #8d9d9d #69767e #535e6b`.

The roof is drawn as **two lengthwise halves — a light one and a dark one meeting at the ridge**, both carrying
short random plank dashes in a near-black derived from the roof colour (`#39302c`, `#211c1d`, `#1f1b1c`…).
A small **chimney** rectangle is attached to one gable end. Outline ≈2 px dark brown. [SHOWN, `vg_bldg` crop]

### 2.6 Trees

* Canopy = a **lobed "cloud" polygon**: ~14–20 convex bumps around the perimeter (high segment count; the NG
  equivalent, which is easier to count, uses 143–291 segments per canopy).
* Fill = a **linear gradient** (light at the upper-left → dark at the lower-right), desaturated blue-green.
* Outline = a heavy dark-green/near-black stroke at `@1` that follows every lobe.
* A few short dark arcs inside suggest foliage.
* Trees cluster in groups of 2–8 with overlapping outlines; forests are dense mats of them.
* No `arc` calls in VG's canvas2D tally on `05-04-05` — **canopies are polygons, not circles**. (`arc: 412`
  appears in `05-37-29`, which is the map with the fenced enclosure; those arcs are the fence posts /
  round plaza.) [SHOWN]

### 2.7 Shadows

A **single flat-colour pass** (`#9699ae`) that draws *every* object's shadow shape before the objects
themselves: 453 fills in gen‑0, 780 in `05-37-29`. Composited, it darkens the grass under buildings, trees
and fields. Offset is **down-right**, roughly 15–20 % of the object's size, with a soft edge. Because it is
one pass, overlapping shadows never double-darken. [SHOWN + [INFERRED] for the compositing mode, which is not
recorded — behaviour is consistent with multiply or a low-alpha fill.]

### 2.8 Fields, bridges, type

* **Fields**: rounded polygons (thick round-join stroke gives the rounded corners), mauve-brown fills that
  vary per field, a slightly darker outline `@1`, and **broken furrows** — a single stroke with up to 666
  segments, i.e. ~330 short dashes, angled per field. Each field has its own drop shadow.
* **Bridges**: a tan plank deck with a dark brown outline and **cross ties** (short perpendicular strokes)
  overhanging both long edges — a ladder motif.
* **Piers** (Wolf Town): the same tan bar, shorter, into the water.
* **Fence / palisade** (`05-37-29`, `05-38-17`, and *Amelceing*): a long curve with regular perpendicular
  posts, in dark brown, ringing the settlement and crossing the river on plank bridges. [SHOWN;
  **[UNKNOWN]** whether the generator calls it a fence, hedge or causeway.]
* **Type**: `Cinzel Bold` only. Title **48 px**, subtitle `Pop. NNN` **24 px**, both `#010206`, small-caps
  styling, with a **cream outline halo ~3 px**. Only 2 `fillText` calls and no `strokeText` is recorded, so the
  halo comes from `shadowColor/shadowBlur` or a multi-pass offset fill — **[INFERRED]**.
  Title placement rotates between all four corners depending on where the map is empty (top-left in Godaton,
  top-right in Ringdean, bottom-left in Agnuster's Rest / Middle Pool). [SHOWN]
* **No grid, no compass, no scale bar, no north arrow** anywhere in VG.

---

## 3. Neighbourhood — flat, graphic, minimal

Style: **flat vector illustration on warm paper.** No gradients on buildings, no vignette, no water in any
captured map, 3 stroke colours total.

### 3.1 Canvas / resolution

1500×1100, 1× pixels, one working canvas per layer (≈950–1350 px) **plus one small canvas per tree**
(34×34 … 64×64). `texImage2D` 12–528 tracks (layers + trees). Everything is drawn in screen pixels. [SHOWN]

### 3.2 Palette

| hex | role |
|---|---|
| `#ccc4b7` | **ground / paper**, 75–79 % of every frame (set by `gl.clear`, not canvas2D) |
| `#a69e92` | **streets** — the *only* street colour, no casing |
| `#a5a584` | **green patches** (gardens, commons) |
| `#7a8499` | **shadow** — the one colour of the whole shadow pass; resolves to ≈`#a19e9a` over the ground |
| `#222222` | **ink** — outlines, roof hatching, marker outlines |
| `#4c463c` | title text |
| `#bfbfbf` + `rgba(34,34,34,0.8)` | the small square landmark markers |
| ~90–350 browns | roof planes, light/dark pairs (see below) |
| ~40–60 greens | tree canopies, light/dark pairs |

Only **three** `strokeStyle` values exist in every single NG map: `#7a8499`, `#222222`, `#a69e92`. [SHOWN]

### 3.3 Layer order, bottom → top

1. 2× `fillRect #000000` on a 1×1 canvas (internal).
2. **Green patches** — 8 fills `#a5a584`, 55–137 segments, no outline.
3. **Streets** — `stroke #a69e92`, **`lineCap: square`**, one stroke per street, each with **its own width**.
   Widths in one map: 4.55 – 6.95 px (27 streets); in a denser map 6.35 – 11.56 px (53 streets). The street
   count is exactly the number of distinct widths. The `lineCap: square` count equals the `#a69e92` stroke
   count exactly in six of the eight maps (53/53, 105/105, 63/63, 85/85, 23/23, 7/7) and is 3 short in the two
   `05-38-59` maps (205 vs 208, 123 vs 126) — so **square caps are effectively the street cap**, with a handful
   of street strokes falling back to round. Those two maps also carry one extra very wide street width
   (11.104 / 11.558) repeated 7 times, i.e. a **high-street/market-frontage class**. [MEASURED]
4. **Shadow pass** — 162–3426 fills + strokes, all `#7a8499 @1`, quads for buildings, 150–200-segment blobs
   for trees. Drawn as fill **and** 1 px stroke, so the shadow is 0.5 px larger than the object.
5. **Buildings** — see §3.4.
6. **Markers** — `fill #bfbfbf` (a light square) + `fill rgba(34,34,34,0.8)` (an inner mark) +
   `stroke #222222 @0.6`; 3–11 per map. Three variants are visible across the eight maps [SHOWN]:
   a plain **well** (light square, small dark dot), a **pump/basin** (a small flat blue disc), and a
   **fountain** (square base plus a teal-green disc filled with a radial gradient and radial marks) —
   the fountains explain the `createRadialGradient: 2–6` and `arc: 2–35` counts in the records that have them.
7. **Squares / plazas** — a flat mid-grey (~`#b3aca1`) polygon: a large quadrilateral in *Silver Square* and
   *Sun Square*, a true circle in *Dusk Square* with streets radiating from it. Drawn under the buildings.
8. **Trees** — one canvas each, in ascending size order.
9. **Title** — a single `fillText`. Usually top-left, but bottom-left in *Dusk Square*, *Wheat Street*,
   *Old Row* and bottom-right in *Gany's Gate*, so placement adapts to where the settlement is not.

### 3.4 Buildings

Per building: **two roof-plane polygons** (a light colour and a dark colour that is ≈0.79× the light one,
e.g. `#84644f`/`#685042`, `#7f604c`/`#644d3f`, `#886651`/`#6b5243`), an `#222222 @1` outline including the
ridge, and **~10 tiny `#222222` triangles** — 3-segment fills — that read as tapered hatch ticks running from
the ridge toward the eaves.

The triangle count dominates the whole record: `pathSegs.fill["3"]` = 5150 / 11330 / 5959 / 8446 / 23295 /
13428 / 1897 / 1354 in the eight NG maps, i.e. **~80 % of all fills in an NG map are roof hatch triangles**.
[MEASURED from `pathSegs`]

Rows of buildings are terraced: neighbours share edges, giving continuous ribbons broken by ridge lines.

### 3.5 Trees

Per tree, exactly 6 ops on its own canvas: `fill(darkGreen)`, `fill(lightGreen)`, then 4 strokes `#222222`
(3 at `@1`, 1 at `@0.6`). Canopy outlines carry **143–291 segments** — the scalloped cloud outline is
polygonal, sampled finely. Greens are jittered per tree: `#68764d/#728153`, `#5d6a45/#66734a`,
`#556b4b/#5d7451`, `#6c7c51/#778757`, `#4d6145/#556a4a` …, light ≈ 1.10× dark. The light blob is offset up-left
over the dark one to give a highlight, and fine dark dashed arcs inside suggest foliage. Canopy ⌀ 32–64 px.
[SHOWN + MEASURED]

### 3.6 Streets in the rendered image

A pixel cut across a street (row 700, x 560–700) gives: building → ink → `#ccc4b7` 10 px →
**`#a69e92` 6 px** → `#a19e9a` 6 px (the shadow of the opposite row) → ink → building. So the visible "road"
is a **narrow grey stripe inside a wider cream gap** — NG does not fill the street corridor, it draws a stripe
down its middle. [MEASURED]

### 3.7 Type

`Voltaire` **72 px**, colour `#4c463c`, one line, top-left, **no halo, no subtitle, no scale bar, no compass,
no grid.** Exactly one `fillText` per map. [SHOWN]

---

## 4. FTG — Fantasy Town Generator

Style: **modern cartographic web map** — a slippy map with UI chrome, not a printed plate.

### 4.1 Renderer architecture (from CPU-profile symbols)

`captures/ftg/2026-09-21T05-23-58/report.md` self-time table names, in `ThreeJsPages-*.js` and `index-*.js`:

```
mergeGeometries$1, mergeAttributes, buildingBufferToGeometry, computeVertexNormals,
getColorArrayForThreeColor, applyMatrix4, setXYZ/getX/getY/getZ (BufferAttribute),
getBounds, computeTriangleBounds, partition, partition_indirect,  warmUpSDFCanvas
```

⇒ **three.js**, with (a) per-layer **merged BufferGeometry** built from building/field polygons, (b)
**per-vertex colours**, (c) **computed vertex normals**, (d) a **BVH** (`three-mesh-bvh`'s `partition` /
`computeTriangleBounds`) for picking (the map is clickable per building), (e) **SDF text**
(`warmUpSDFCanvas` is troika-three-text's warm-up). No canvas2D path exists to hook, which is why there is no
`*.draw.json` for FTG. [SHOWN]

### 4.2 Texture assets (all captured under `captures/ftg/2026-09-21T05-23-58/session/network/bodies/`)

| asset | size / mode | what it is |
|---|---|---|
| `grassfield`, `grainfield`, `sheepfield`, `lawn` | 64² RGB | green field tiles, slightly different hue/value |
| `wheatfield` | 64² | pale yellow with horizontal rows |
| `grainfield` | 64² | light green |
| `tilledfield`, `pigfield` | 64² | ploughed browns |
| `flaxfield` | 64² | **pale blue** (flax in flower) |
| `cottonfield` | 64² | pale lilac-white |
| `snowfield`, `snowdirt` | 64² | near-white |
| `forest` | 64² | mottled olive canopy noise |
| `pebble_beach` | 128² + `pebble_beach_normal` 128² RGBA | shingle |
| `cliff` | 128² | grey rock with vertical striation |
| `parchment` | 1024² palette PNG, 923 KB | the paper texture for the parchment map style |
| `sphere_normal` | 512² RGB | normal map — spherical; used for **tree canopies** |
| `tall_stone_normal` | 1024² RGB, 1.9 MB | normal map — used for **buildings / walls** |
| `edges_alpha` | 512² | a horizontal black→white ramp: **edge-fade alpha** |
| `circle_alpha` | 256² | radial black→grey: **soft round alpha mask** (shadows / glows) |
| `matrix-green` | **256×16** | a strip of many vertical colour ramps = a **colour LUT atlas** |

[SHOWN — I opened and measured each PNG; contact sheet reproduced from these files.]
The combination of tiled terrain textures, normal maps and per-vertex colour is the whole visual trick:
FTG **lights** its map with a directional light, so roofs, trees and walls have real shading rather than
painted shading. [INFERRED from the assets + the visible highlight/shadow direction]

### 4.3 Palette (measured from `002-overview.png` / `006-street-level.png`, UI excluded)

| hex | role |
|---|---|
| `#67819c` | deep sea |
| `#7a99b8` | shallow / near-shore and harbour water |
| `#e8dcb5` (approx.) | beach sand band |
| `#c6c2bb`, `#bcb8b2` | street surface / settled ground |
| `#adb69d` | town verge / green space |
| `#98ad81` | countryside grass |
| `#a5c58f` | brighter pasture |
| `#a08d7f`, `#a39082` | ploughed field |
| `#f0e3a8` (approx.) | wheat field |
| brown `#8a6a5c` → `#6b4d45` | building roofs (a wealth/type-driven ramp) |
| grey `#8f949c` | large stone buildings, wall, quays |

### 4.4 Feature treatment

* **Buildings**: tightly packed roof quads, each with a **soft dark drop shadow to the lower-right** and a
  light edge up-left (directional light from the upper-left), and a **fine comb of ticks along the street
  frontage** — the extruded eave/wall seen at a slight angle. Party walls between neighbours are thin darker
  lines. Large civic buildings render grey. [SHOWN, `ftg_b1` / `ftg_wall` crops]
* **Streets**: pale grey-cream polygons (not strokes — the whole corridor is filled), with the building
  extrusions providing the edge texture. Small **blue dots** mark wells/fountains; **grey stars** mark POIs.
* **Town wall**: a dark blue-grey band with a stone texture and **round tower nodes** at intervals, following
  the old-town boundary.
* **Harbour**: lighter blue polygon with a hard boundary; **grey pontoon/jetty bars** at a regular diagonal
  angle; a breakwater drawn as a grey bar with a rubble (pebble) texture; a white **surf line** at the
  waterline of the open sea.
* **Coast**: sand band then a thin white foam line.
* **Trees**: individual canopies, lighter green at the top, darker at the bottom, with a small soft shadow —
  consistent with `sphere_normal` + directional light. Forests are dense mats; **hedgerows are drawn as rows
  of small tree blobs along every field boundary**, which is the single most distinctive FTG texture.
  [SHOWN, `ftg_fields` crop]
* **Fields**: polygons filled with the tiled textures above, each tinted; thin boundary lines plus the
  hedgerow tree rows; farm lanes are thin double lines.
* **River**: a light blue band with a slightly darker edge, crossing under road bridges.

### 4.5 Labels and chrome

* **District labels**: a transitional serif, mixed case, **thick cream halo plus a subtle drop shadow**,
  set on a curved baseline and scaled to the district ("Ticwick" large, "Ashton" small and rotated).
  SDF text, so the halo/outline is a shader parameter. [SHOWN + [INFERRED]]
* **Town plaque**: top-left, a cream box with a red-brown border, `GALEIAWARD` in **Cinzel** small caps.
* **Scale bar**: bottom-right, a plain black bar with a label that changes with zoom
  (`500m` → `250m` → `100m`), plus an `m`/imperial toggle button.
* **UI**: a top row of round dark-red icon buttons; `Search buildings` field; `Satellite` / `Districts` layer
  menus; zoom `+`/`−`; a clock panel ("9:00 Monday", "Next Hour", "Time Skip") with a day/night toggle.
* **No compass and no north arrow.** A **grid-toggle icon button** sits in the bottom-right cluster next to
  the clock, so a grid overlay exists as an option, but no grid is drawn in any captured frame.
* **UI palette from the captured CSS** (`session/network/bodies/*.css`):
  light `--background #f5f3e5`, `--font-colour/--dark-colour #0B0F3C`, `--primary-action #cb3a46`,
  `--primary-action-highlight #A54247`, `--secondary-action #ABABB0`, `--subtext-colour #585555`,
  `--separator-border #ABABB0`; dark `--background #1A1919`, `--font-colour #f5f3e5`,
  `--primary-action #EC5F66`, `--primary-action-highlight #ce7e84`, `--secondary-action #616161`,
  `--subtext-colour #C7C7C7`; plus `--info-callout-colour #3E92CC`, `--dark-highlight-colour #4750B3`,
  `--disabled #bdbdbd`. Fonts: **Cinzel** (serif, headings) and **Noto Sans JP** (sans, body). [SHOWN]
* The settlement payload (`intercept-0018-b39aab95.bin`, 593 KB) is **protobuf**, starting
  `08 fa f1 90 9d fe ff ff ff ff 01 12 0a "Galeiaward" 1a ea dd 09 …`. Its strings are content, not style —
  building types (`middle class home`, `lower class home`, `upper class home`, `house share`,
  `abandoned squat`, `blacksmith`, `bathhouse`, `fishery`, `brewery`, `mill`, `general warehouse`…) and NPC
  descriptors. The relevance to the visual spec is that **building type/wealth is available per building**,
  which is consistent with the brown→grey roof ramp. [SHOWN]

---

## 5. Cross-generator comparison

| dimension | MFCG | Village | Neighbourhood | FTG |
|---|---|---|---|---|
| medium | antique mono print | colour illustration | flat colour vector | lit web map |
| canvas | 1500×1100, 1× | 1100×1100 square, letterboxed | 1500×1100, 1× | full viewport, slippy |
| renderer | OpenFL: canvas2D per object → WebGL textures | one canvas2D painter | canvas2D painter + per-tree canvas | three.js merged geometry, normals, SDF text |
| ground | `#ccc5b8` flat | green + vignette + contour texture | `#ccc4b7` flat | tiled textures per land use |
| ink | `#1a1917` only | per-object darkened colour | `#222222` only | none (shading replaces outlines) |
| water | flat `#7f7a71`, hairline coast | 3 depth bands `(i/N)^1.5`, sand, dark bank, ripple line | none captured | 2 blues, sand, surf line, harbour polygon |
| buildings | grey body + hairline + ink drop shadow, 1.3 dark fills per light | 2-tone gabled roof + plank dashes + chimney + shadow | 2-tone roof + ~10 ink hatch triangles + shadow | lit extrusions, shadow, type-coloured roofs |
| building colour | one grey | ~30 tans + ~6 slates | ~100+ browns, light/dark pairs | brown ramp + grey civic |
| trees | none | lobed polygon, linear gradient, heavy outline, clustered, shadowed | lobed polygon (143–291 seg), 2 flat greens, ink outline, own canvas each | normal-mapped canopy sprites/meshes, hedgerow rows |
| fields | hairline furrows only, no outline | filled + outline + ~330 dash furrows + shadow | none | textured polygons + hedgerows |
| roads | casing + fill (`w+2h` / `w`), 2.0 u | translucent 16 px halo + 8 px core; tracks 4/2 with green casing | single `#a69e92` stroke, per-street width, square caps | filled corridors |
| walls | 1.9 u ink line + circular towers + gate blocks | fence with posts (some maps) | none | textured stone band + towers |
| bridges | cased line, 2.0 u | plank deck with cross ties | none | road over river |
| shadows | ink polygon, offset ≈(+0.25,+0.7) u, per block, under bodies | one flat `#9699ae` pass, down-right | one flat `#7a8499` pass, fill+1 px stroke | real directional lighting |
| joins/caps | round/round (miter 1× in 4063) | round/round | round join, square cap on streets | n/a |
| dash arrays | none | none | none | n/a |
| gradients | none | 2 linear per tree + 4 radial | none (2–6 radial in some maps) | per-vertex colour + normal maps |
| type | IM FELL Great Primer Roman 54/27/21 px; per-glyph curved caps labels with paper halo | Cinzel Bold 48/24 px, cream halo, corner-placed | Voltaire 72 px, no halo | Cinzel plaque + SDF serif labels with halo, curved |
| grid | 1 px `#a09a90`, 112–120 px pitch = 100 m/500 m/1 km | none | none | none |
| scale bar | yes, 5 ticks, old-style figures | none | none | yes, zoom-dependent |
| compass | 8-ray rose + ring + "N" | none | none | none |

---

## 6. Minimum renderer feature list to match all four

**Geometry / path**
1. Filled polygons with ≥300 vertices and hairline outlines.
2. Stroked polylines with **round join + round cap** as the default, **square cap** available.
3. Per-stroke width as a float (sub-pixel widths matter: MFCG's 0.119 px hairline *is* the look).
4. The **casing idiom**: stroke a path twice, `w + 2h` in ink then `w` in body colour.
5. **Repeated-offset shoreline strokes** for depth banding (`W·(i/N)^1.5`).
6. Polygon offset / drop-shadow copies (MFCG, VG, NG all draw an offset silhouette, not a blur).
7. Lobed "cloud" polygon generator for canopies (14–20 convex bumps; NG samples them at 143–291 segments).
8. Clipped hatching inside a polygon at an arbitrary per-polygon angle, both as continuous hairlines (MFCG)
   and as broken dashes emitted as many short segments (VG, ~330 dashes per field).
9. Tapered triangle "ticks" as a line substitute (NG roof hatching — 80 % of its fills).

**Colour / shading**
10. Flat palettes of 4–6 colours (MFCG, NG) *and* per-object jittered palettes (VG, NG roofs/trees: a light
    colour with a dark partner at ≈0.78–0.79×).
11. Linear gradients per object (VG trees: 2 per tree) and radial gradients for vignettes.
12. A single flat-colour **shadow pass** drawn before the objects, composited once.
13. A **vignette / light mask** over the map square, including a road-graph-derived "settlement glow"
    (white thick stroke → offscreen → composite).
14. Tiled textures with per-polygon tint, plus normal maps and one directional light, if FTG-grade
    3D shading is wanted.

**Text**
15. Text with a thick paper/cream **halo** (all four use it except MFCG's title and NG).
16. **Per-glyph placement along a curved baseline** with letter-spacing, and label scale proportional to the
    labelled area (MFCG and FTG both do this).
17. Old-style figures / small caps support (IM FELL, Cinzel).

**Furniture**
18. Screen-space overlay layer that does not scale with the map: grid at a fixed ~112–120 px pitch snapped to
    a round ground distance, scale bar with major/minor ticks and unit switching (m → km), 8-ray compass rose
    with ink/paper split halves.

**Architecture**
19. **Layer ordering is a hard requirement** — every generator paints in a strict bottom-to-top order and
    relies on later layers covering earlier ones (MFCG's shadows are only visible where bodies do not cover
    them; VG's shadow pass depends on being under everything).
20. **Cache per group, not per primitive.** MFCG proves the point: 46 000 fills but only 590 GPU uploads,
    because a whole ward is one bitmap. NG's per-tree canvas is the opposite trade and costs it 528 uploads.

---

## 7. Open questions a re-implementer must decide

1. **MFCG's 1.30× dark-to-light fill ratio inside wards** (§1.4). The visible result is a drop shadow, but the
   op counts do not match a 1:1 offset copy.
2. **MFCG's label halo mechanism** — no `strokeText` is recorded; it is an OpenFL bitmap filter.
3. **MFCG's compass variants** — the metropolis maps show an 8-ray rose with a ring, the town maps appear
   4-ray. My reading is that they are the same object over different backgrounds, but a second design is
   possible.
4. **VG's 128×128 procedural texture** and the `#ff0000` water mask — the `getImageData`/`putImageData` pass
   is invisible in the op log. The beige beach band is almost certainly produced here.
5. **VG's pale ripple line** inset from the bank — no stroke of that colour is recorded.
6. **VG's fence/palisade element** (`05-37-29`, `05-38-17`, *Amelceing*) — name and semantics unknown.
7. **Compositing modes** for the VG (`#9699ae`) and NG (`#7a8499`) shadow passes — `globalAlpha` and
   `globalCompositeOperation` are not in the recording. Measured result over NG's ground: `#7a8499` →
   `#a19e9a`, which is not a clean multiply or a single alpha.
8. **FTG's exact material setup** — how `matrix-green` (the 256×16 LUT), `edges_alpha` and `circle_alpha` are
   sampled. Inferred roles only.
9. **FTG's building-colour rule** — the payload carries wealth/type per building, and roofs visibly range
   brown→grey, but the mapping is unverified.
10. **MFCG world-unit ↔ metre constant** — I derive ≈3.7 m/unit from the grid (112.4 px = 100 m) and
    `s ≈ 4.15 px/unit`. A different reading of `h = 0.5/s` (e.g. `h = 1/s`) would halve it.

---

## 8. Files read for this slice

Screenshots opened (every one in the assigned list):

* `captures/mfcg/2026-09-21T05-03-24/{draw,profile,coverage}/gen-0..3.png` (12)
* `captures/mfcg/2026-09-21T05-06-58/{draw,profile,coverage}/gen-0..2.png` (9)
* `captures/village/2026-09-21T05-04-05/{draw,profile,coverage}/gen-0..3.png` (12)
* `captures/village/2026-09-21T05-37-29/draw/gen-0..1.png`, `captures/village/2026-09-21T05-38-17/draw/gen-0..1.png` (4)
* `captures/neighbourhood/2026-09-21T05-04-54/{draw,profile,coverage}/gen-0..3.png` (12)
* `captures/neighbourhood/2026-09-21T05-38-59/draw/gen-0..1.png`, `…T05-40-05/draw/gen-0..1.png` (4)
* `captures/ftg/2026-09-21T05-23-58/steps/001-007*.png` (7)
* `captures/ftg/2026-09-21T05-08-07/steps/001-landing.png`, `003-all-settings.png`, `013-after-create.png` (3)
* 17 FTG texture PNGs from `captures/ftg/2026-09-21T05-23-58/session/network/bodies/`

Paint logs parsed in full (23 files): every `captures/*/*/draw/gen-*.draw.json`.
Drawing-record sections read in `captures/{mfcg,village,neighbourhood}/*/report.md`; CPU-profile class tables
read in `captures/ftg/*/report.md`. FTG CSS colour variables read from
`captures/ftg/2026-09-21T05-23-58/session/network/bodies/*.css`. No `*.js` body was opened.

Caveat: the two metropolis MFCG recordings and several NG/VG ones hit the recorder's 60 000-entry log cap
(`logDropped` 61 821 – 269 985), so their run lists cover only the first part of the paint. All layer-order
claims above come from uncapped logs (`logDropped: 0`).
