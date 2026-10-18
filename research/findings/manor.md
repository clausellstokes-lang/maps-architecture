# manor — watabou's Fantasy Manor (FM) and its building-generator lineage: exhaustive extraction

> PENDING FABLE REVIEW — Opus-produced, not yet checked by a Fable seat; queued in docs/FABLE-REVIEW-QUEUE.md as B14.

Lane `manor-read`, 2026-09-25. Reference for stage 3 (buildings inside neighbourhood lots, "from a giant manor to a small hovel").
STATUS: COMPLETE (2026-09-25).

Evidence tags: **[STATED]** creator's own words (quoted briefly) · **[SHOWN]** visible in a recording, draw record or image · **[INFERRED]** my reconstruction, reasoning given · **[NAMED-ONLY]** named with no method.
Abbreviations: **FM** Fantasy Manor · **PM** Procgen Mansion · **HPG** House Plan Generator (renamed **DW** Dwellings) · **NG** Neighbourhood Generator · **VG** Village Generator · **MFCG** Medieval Fantasy City Generator · **UP** Urban Places.

---

## 0. Sources read and skipped

**Read in full (text):**

- `research/manor/README.md` and `research/worklists.json` key `manor` (32 dirs): the slice definition.
- `research/devlogs/manor/_page.md` and `_comments.md` (29 posts, 5 by the creator). FM has **no devlog** (itch 404, confirmed by the archive lane).
- All **31** `research/patreon/watabou-manor/<id>/post.md` files (body, links, complete comment thread): `28327848 32477317 34131516 35009607 42879157 47744240 49191011 54745111 63952852 65675282 66544756 70917627 79147510 86093774 86436420 86635425 86852618 88328982 96522502 97493516 111909860 112799146 113347826 118772106 120395768 121415691 143036785 143565705 144816210 145140009 158074424`. `63952852` (*Dark Clues*) is locked: no body, no comments. One comment in `28327848` has an empty body (checked in `comments.json`).
- `research/devlogs/procgen-mansion/`: `_page.md` (full controls list, including the Z/X/C size keys), `_comments.md` (0 parsed), devlog `374538-212-permalinks/post.md` (a teaser of `65675282`).
- `research/devlogs/dwellings/`: `_page.md`, `_comments.md` (83 posts, 31 by the creator; the richest source on DW's method and limits) and all 15 devlog `post.md` files. Fourteen are teasers of the Patreon posts above; `567246-keyboard-shortcuts` is the only full text (the complete DW shortcut list).
- Recordings: `captures/manor/README.md`; `2026-09-25T10-45-12/report.md` (2192 lines) and `2026-09-25T10-48-38/report.md` (913 lines), read through (layer-order listings read run-length-compressed); `meta.json`; all five `coverage/gen-N.calls.json` (every `com.watabou.*` label tabulated across the five generations, §1 and §2.3); all five `draw/gen-N.draw.json` logs (roof sections and facets segmented per building, §2.3); `_probes/*.log`.
- `coverage/gen-0.coverage.json` of both captures: **function names, byte lengths and hit counts only, no source text**. Used for the complete `com.watabou.manor.*` inventory including never-executed functions (§2.1), the same treatment `profile-neighbourhood.md` gives its coverage files. `profile/gen-N.cpuprofile` node names were searched for the layout and tower function names (§2.4).

**Images viewed and used as evidence (Read tool):** all 13 capture screenshots (`profile/`, `coverage/`, `draw/` gen-N.png of both captures) and the 3 probe screenshots; FM `_page-images/01–04`; release post `42879157/01–04` (01 = 03 and 02 = 04 at two resolutions); `145140009/02`; `28327848/02–03`; `34131516/03`; `35009607/03`; `47744240/05`; `66544756/01, 03, 04`; `70917627/02, 03, 05, 08`; `79147510/02`; `86093774/04–06`; `86436420/03–06`; `86635425/02`; `86852618/02`; `88328982/01, 03, 05`; `96522502/03–04`; `97493516/02`; `111909860/03–04`; `112799146/03–04`; `113347826/02`; `118772106/02`; `120395768/02`; `143036785/04`; `143565705/02`; `158074424/03`; Dwellings `_page-images/01, 02, 05` and `_comments-images/06` (the creator's tags dialog). Every FM image cited (`42879157/01–04`, `_page-images/01–04`, the capture screenshots) was re-opened and re-checked immediately before being cited, because early images were displaced from the working context by later ones.

**Opened but displaced from context before they could be described; not cited:** `28327848/01, 04–06`, `32477317/02–03`, `34131516/04`, `35009607/04`, `47744240/04, 06`, `49191011/06–11`, `54745111/01, 03`, `63952852/01–02`, `65675282/03–04`, `70917627/06–07`, `144816210/01`. Their posts' text was read in full. None carries a claim in this file.

**Not opened, with reason:**

- **Captured JavaScript bundles** (`captures/**/network/bodies/*.js`): forbidden by the lane rule and never opened. `network/index.jsonl` was not needed.
- **Post-header thumbnails that duplicate a larger image in the same post** (820-px `01`/`02` files) and byte-identical pairs (`79147510/02=03`, `88328982/03=04`, `118772106/02=03`, `120395768/02=03`): `32477317/01`, `34131516/01–02`, `35009607/01–02`, `47744240/01–03`, `65675282/01–02`, `66544756/02`, `70917627/01, 04`, `79147510/01`, `86093774/01–03`, `86436420/01–02`, `86635425/01`, `86852618/01`, `88328982/02`, `96522502/01–02`, `97493516/01`, `111909860/01–02`, `112799146/01–02`, `113347826/01, 03`, `118772106/01`, `120395768/01`, `143036785/01–03`, `143565705/01`, `145140009/01`, `158074424/01, 02, 04`, and `121415691/01–06` (the VG/MFCG/DW-furniture update images).
- **Off-topic images:** `49191011/01–05` (bisection neighbourhood maps, not buildings), `54745111/02, 04–08` (Perilous Shores), `144816210/02` (Hair, a head generator).
- **Dwellings devlog images** (15), Dwellings `_page-images/03–04`, `_comments-images/01–05` (user images), and the `procgen-mansion` devlog image. The devlog images have the same pixel dimensions as the Patreon originals of the same posts (for example 1280×2240 = `86436420/03`, 3600×2400 = `145140009/02`, 1280×720 = `65675282/03`); they are re-encodes [INFERRED from identical dimensions; not byte-identical].
- **Outside the slice, not read:** `research/findings/*` other than the two format references (only their headings and opening sections were read); the MFCG devlog `101529` creator reply about PM's origin, which the archive README lists as a cross-reference.


## 1. What the generator does — product surface

**Identity.** FM is a single-screen top-down *roof plan* generator. The creator: it "produces top-down images of random fantasy manors. And that's pretty much it" (itch page) [STATED]. Released 2020-10-18 (`42879157`), Haxe + OpenFL, images free for any use [STATED]. The itch meta line calls it a generator of "a plan of random fantasy manor" [STATED]. There is **no devlog and no later FM release post**; the build on the CDN is upload 2851818, `Last-Modified` 2026-06-24, which matches a bulk re-upload window of five watabou builds (README of `research/manor`) — nothing announces an FM change [SHOWN / PLAUSIBLE bulk re-upload].

**Why it exists** [STATED, `42879157`]: an experiment "without immediate purpose", triggered by a New Horizons town map on Cartographer's Guild Twitter whose buildings "are pretty complex and there are no two on the map that are exactly alike". He explicitly did **not** plan to transplant the buildings into MFCG or VG "not right now anyway", and listed three possible futures: (1) nicer images with more details on the building (stairs, chimneys, beams) and around it (wells, fences, trees) for battle maps; (2) use the buildings in MFCG or "(more likely)" VG, "At the very least I can make nicer castles using the ideas of this generator"; (3) generate interiors "in the same way as it works in Procgen Mansion … I expect it to be hard". None of the three shipped in FM.

**Inputs.** None. No URL parameters (`?seed=12345` loaded twice gives two different buildings; the app never writes the URL), no seed display, no size or style option, no console marker [SHOWN, `captures/manor/README.md`, `_probes/probe-url-params.log`, `_probes/seed12345-load1/2.png`]. `index.html` embeds with `parameters: {}` [SHOWN].

**Controls** [SHOWN, `_probes/context-menu.png`, capture README; STATED where noted]:

| control | effect | evidence |
|---|---|---|
| **Enter** | New building (full regeneration inside the key event: `Scene.onKeyDown → ManorScene.onKey → ManorScene.reset`) | CPU profiles gen-1/gen-2 [SHOWN] |
| **C** | In the recorded build toggles **Slate roof** (`ManorScene.toggleSlate`; roofs turn blue-grey; model not regenerated, grass and paving stones re-rolled). The creator's 2022 reply "It's C for New lighting (I don't remember why)" is out of date for this build | capture 10-48-38 [SHOWN]; itch comment 2022-08-18 [STATED] |
| **L** | nothing (a 2022 user asked for L = New lighting) | `_probes/probe-keys-L.log` [SHOWN] |
| right-click menu | New building · New lighting · Simplified view │ Slate roof · Grass ■ · Pathways ■ · Shadow ■ · Noise ■ │ Fullscreen (■ = on by default) | `context-menu.png`, `42879157/images/01.png` (identical menu in 2020) [SHOWN] |

The menu has been unchanged since release: the 2020 release image already shows the same nine items [SHOWN]. Named handlers in the coverage inventory cover six of the nine items: `toggleSimplified`, `toggleSlate`, `toggleGrass`, `toggleRoads` (= "Pathways"), `toggleShadow`, `toggleFullscreen` (plus `showMenu`, and New building = `reset`). There is no `toggleNoise` or `newLighting` method, so those two items are handled by anonymous closures (one 50-byte anonymous `ManorScene` function exists) [SHOWN names / INFERRED routing].

**"New lighting".** The creator: "Intensity of specular light is a random parameter, sometimes it's zero" (itch reply 2020-10-20) [STATED]. So lighting is a separately re-rollable random state (light direction / specular intensity) applied at draw time; the building is not rebuilt [INFERRED from the menu split and from `prepareColors` running once per view]. Not recorded (menu clicks are not scripted in the profiler — capture README "deliberately deferred").

**"Simplified view"** [SHOWN, `_page-images/03.png`]: flat single roof colour, ink outlines of every facet, ridge, hip and dormer, no hatching, no shadow, no grass, no noise — i.e. the line-art skeleton of the same model.

**Exports: none.** Requests for PNG export with transparent background (2020-10-31, 2022-11-01, 2024-09-18) got "Maybe." (2020) and "I'll try to find time to add basic export functionality here" (2024-09-25) [STATED]; no export exists in the recorded build (no export handler name in the inventory) [SHOWN].

**The "New building" flow, as recorded** (CPU profile + coverage, `captures/manor/2026-09-25T10-45-12`) [SHOWN]:

```
ManorScene.reset
 ├─ ManorScene.getPoly            → exactly one of ring | closed | arc | rect | snake  (ArrayExtender.weighted ×1, sum ×1)
 ├─ model.Manor.new
 │    ├─ Manor.createWings        → Wing.new ×N (N = number of plan segments: 4/6/8 for square/hex/oct rings)
 │    │     each Wing: createSlab, updateGeometry, spawnDormers → spawnAlong ×2 (one per long side), spawnPorch (→ createPorch only when a porch is made)
 │    ├─ Manor.spawnTowers ×1     → Tower.new 0..2 seen in images (Tower.intersects: mutual rejection, never ran)
 │    └─ Manor.getShapes (9–18×)  + PolyCreate.rect / PolyTransform.asRotateYX / PolyBounds.testShapeVsShape (overlap tests)
 ├─ ManorView.new → prepareColors ×1, then per roof facet shaded+thin, per hatch line line, per section stroke,
 │                  drawDiamond / drawDormer / drawPorch / drawTower per element
 ├─ visuals.Shadow.new            (bitmap drop shadow; ≈90 % of the time)
 ├─ ManorScene.createGrass → Grass.new ×1–4
 ├─ ManorScene.createRoads → PavedRoad.new ×(number of entrances) → drawStone ×31–69
 └─ visuals.Noise (cold load only; setSize on layout)
```

Model time (`Manor.new`) 0.6–1.7 ms; the whole reset 39–70 ms of which `Shadow.new` 35–63 ms [SHOWN].


## 2. The composition grammar

FM's creator prose about the method is almost nil (one release post, five comment replies, no devlog). The grammar below is therefore mostly **[SHOWN]** from the two recordings (exact per-method call counts over 5 generations, 13 screenshots, the draw records) and from the 8 FM images (release post `42879157` 01–04, two of which repeat the other two at another resolution; itch page `_page-images` 01–04), with the complete `com.watabou.manor.*` function inventory (names, byte lengths, hit counts — including never-executed functions) taken from `coverage/gen-0.coverage.json` of both captures. That file carries function names and offsets only, no source text; the JS bundle was not opened.

### 2.1 Package inventory — the whole manor model is four small classes [SHOWN]

From the coverage inventory (bytes = function length in the minified build; count = calls in the cold-load generation of capture 10-45-12):

| class | functions (bytes; calls in 45-12 gen-0) |
|---|---|
| `ManorScene` | `reset` (1747; 1) · `getPoly` (452; 1) · **`ring` (754; 1) · `closed` (1062; 0) · `arc` (873; 0) · `rect` (1006; 0) · `snake` (2341; 0)** · `createGrass` (1794) · `createRoads` (562) · `layout` · `onKey` · `showMenu` (1186) · `toggleSimplified/Slate/Grass/Roads/Shadow/Fullscreen` |
| `model.Manor` | constructor (1100) · `createWings` (985) · `spawnTowers` (2695) · `getShapes` (578; 11) |
| `model.Wing` | constructor (449; 4) · `createSlab` (2495; 4) · `updateGeometry` (1597; 4) · `spawnDormers` (145; 4) · **`spawnAlong` (5224; 8 — the largest model routine)** · `spawnPorch` (3671; 4) · `createPorch` (1417; 0) · 4 anonymous closures (454–759) · a 53-byte accessor |
| `model.Tower` | constructor (547; 0) · `intersects` (229; 0) |
| `ManorView` | constructor (3200) · **`prepareColors` (5253 — the largest routine in the package)** · `shaded` (1529) · `thin` · `line` (68) · `stroke` · `drawDormer` · `drawDiamond` (1122) · `drawPorch` (574) · `drawTower` (990) · **`zigzag` (752; never ran in 5 recorded generations)** |
| `visuals` | `Shadow` (767) · `Grass` (3365) · `PavedRoad` (3056) + `drawStone` (2359) · `Noise` (833) + `setSize` |

The model classes (`Manor`, `Wing`, `Tower`) span ≈ 24 KB of minified code and the five layout routines plus `getPoly` ≈ 6.5 KB; the whole package including view and visuals ≈ 62 KB (function ranges can nest, so these are upper bounds). That is: a **plan-path generator** (5 layouts), a **Wing** that turns one path segment into a roofed slab with dormers and a porch, a **Tower** with a mutual-intersection test, and a view. There is **no class for courtyards, gardens, walls, outbuildings, rooms, floors, chimneys or plots** [SHOWN by absence in the complete inventory].

### 2.2 Step 1 — the plan is a *path*, chosen from five layouts [SHOWN names and counts; INFERRED shapes]

`getPoly` runs once and calls exactly one of `ring`, `closed`, `arc`, `rect`, `snake`; `ArrayExtender.weighted` and `ArrayExtender.sum` each run exactly once per model build, so the layout is a **weighted random pick** [SHOWN counts; INFERRED that the weighted call is the layout pick — it is the only weighted choice in the build].

| layout | recorded | what it produces (reading of screenshots and the 16-building gallery `42879157/04.png`) |
|---|---|---|
| `ring` | 45-12 coverage gen-0/1/2 (square, hexagon, octagon) | a closed regular-ish polygon of 4–8 sides around an open courtyard; one wing per side. The gallery also shows rectangles, a rhombus and a pentagon ("they hit the pentagon", itch 2026; "it seems to like hexagons", 2021) [SHOWN] |
| `arc` | 48-38 coverage gen-0 | an open chain of 4 wings bending one way — U / C shapes [SHOWN] |
| `closed`, `rect`, `snake` | not in a coverage pass | PLAUSIBLE readings: `rect` = rectangular courtyard ring (45-12 profile gen-0, draw gen-0), `closed` = irregular closed polygon (rhombus 45-12 draw gen-2, the open-triangle 48-38 draw), `snake` (the largest layout routine, 2341 bytes) = the meandering multi-bend chains (45-12 profile gen-2; gallery row 3 #2). Which screenshot belongs to which is not provable from pictures |

`Wing.new` = number of plan segments exactly: 4 / 6 / 8 for the square / hexagonal / octagonal rings, 4 for the 4-segment U [SHOWN counts; one-wing-per-side is a visual reading].

### 2.3 Step 2 — every segment becomes a Wing (slab + two-facet roof) [SHOWN]

Per wing, always exactly once: `createSlab` (the wing's footprint quad), `updateGeometry`, `spawnDormers`, `spawnPorch`; `spawnAlong` exactly **twice** per wing (8/12/16 for 4/6/8 wings) — once per long side, since dormers appear on both the outer and the courtyard side [SHOWN counts + images].

**Roof arithmetic — exact identities over all 5 recorded generations** (`ManorView.shaded` = `thin` = `Color.lerp` = `PolyBounds.rect` = one call per roof facet; `ManorView.stroke` = one call per outlined roof section):

| gen | layout | wings | "diamond" blocks | dormers | porches | facets predicted = 2·W + 4·D + 2·d + 32·P | `shaded` | sections predicted = W + D + d + P… | `stroke` |
|---|---|---|---|---|---|---|---|---|---|
| 45-12 g0 | ring (square) | 4 | 3 | 6 | 0 | 8+12+12 = **32** | 32 | 4+3+6 = **13** | 13 |
| 45-12 g1 | ring (hexagon) | 6 | 4 | 6 | 0 | 12+16+12 = **40** | 40 | 6+4+6 = **16** | 16 |
| 45-12 g2 | ring (octagon) | 8 | 2 | 9 | 0 | 16+8+18 = **42** | 42 | 8+2+9 = **19** | 19 |
| 48-38 g0 | arc (U) | 4 | 1 | 6 | 2 | 8+4+12+64 = **88** | 88 | 4+1+6+2 = 13 | 13 |
| 48-38 g1 (C) | same building, slate | 4 | 1 | 6 | 2 | 88 | 88 | 13 | 13 |

(W = `Wing.new`, D = `drawDiamond`, d = `drawDormer`, P = `drawPorch`.) The **section identity** `stroke` = W + D + d + P has no free parameter and holds in all five generations — CONFIRMED. The **facet coefficients** 2 / 4 / 2 are determined uniquely by the three porch-free builds (the 3×3 system has determinant −42, so this is a solution, not a fit); the porch's 32 then follows from the fourth build and is independently confirmed by the 32-facet half-cone section in the 45-12 draw gen-1 log — CONFIRMED on four distinct buildings, which is a small sample. Consequences:

- **A wing roof is always 2 facets** — a straight ridge along the segment; on a closed ring the corners are mitred (hip on the outside, valley on the inside, `_page-images/03.png` Simplified view shows the mitre lines), so no extra facets appear at joints [SHOWN].
- **Open ends of an arc do not add facets either** (48-38: 4 wings still 8 facets), consistent with the end wings meeting the neighbouring block or ending in a flat gable cut [INFERRED].
- **A "diamond" is a 4-facet hip-roofed rectangular block** — the big pavilions that straddle ring corners or sides in the coverage screenshots (3, 4, 2, 1 of them, matching `drawDiamond` exactly). When square its roof is a pyramid (`seed12345-load1/2.png`, gallery row 4 #4) [SHOWN]. The name reads as the X of hips seen from above. `PolyCreate.rect` + `PolyTransform.asRotateYX` run 3/5/3/3 times (≥ the number of diamonds kept) and `PolyBounds.testShapeVsShape` 50/65/83/25 times: candidate rectangles are made in the wing's frame and tested against the shapes returned by `Manor.getShapes`; since kept blocks visibly overlap wings, the test must reject only some overlaps (probably block–block or block–tower) [SHOWN counts; INFERRED mechanism, rule not identified].
- **A dormer is 2 facets** (small gable or triangular hip dormer perpendicular to the wing ridge), spawned in rows along either eave; rows of 3–6 read as crenellation at plan scale [SHOWN].
- **A porch is a 32-facet half-cone ("half-dome")** on the wall at a doorway — visible as the semicircular roof at the start of each pathway in 48-38 coverage gen-0/gen-1 and 45-12 profile gen-1/2 [SHOWN]. The draw record of 45-12 draw gen-1 confirms it independently: its first roof section is 32 facets outlined by a 35-segment half-circle polyline, painted *before* the wings [SHOWN].

**Draw-record cross-check** (sections = fills between ink outlines on the scale-1 building canvas, `draw/gen-N.draw.json`): 45-12 draw g0 = 4 wings (2 facets each) + 8 dormers (2) + one **64-facet full cone** (the tower), total 88; g1 = 32-facet porch + 3 wings + 4 dormers + 64-facet tower = 110; g2 = 4 wings + 10 dormers = 28; 48-38 draw g0/g1 = 10 two-facet sections (one projecting gabled bay painted first, then 4 wings, then dormers) + 2 **4-facet diamonds painted last** = 28 [SHOWN]. So a **tower cone is 64 facets**, a porch half-cone 32. **Painter's order is fixed: porch → wings → dormers → towers and diamonds** — the tall elements are painted last so they overlap the wing roofs, and the porch is tucked under the eave [SHOWN, all five draw generations].

### 2.4 Step 3 — towers [SHOWN counts; INFERRED rule]

`Manor.spawnTowers` (2695 bytes) runs once per build; `Tower.new` ran **0 times in all 5 coverage generations** but a `Tower.new` sample appears in the 45-12 profile gen-1 CPU profile, whose screenshot has a conical tower. Towers are **round, with a conical roof of 64 radial facets on a smooth colour ramp** (draw record, 45-12 draw gen-0: 64 triangle fills #523f39 → #a07962 → back, one seam stroke each; `ManorView.drawTower` 990 bytes). The concentric rings visible on the cones in the screenshots are not in the facet runs; which draw calls make them was not isolated [SHOWN rings; path unknown]. The capture README's "32 or 64" conflates the 32-facet porch with the tower. They sit at wing ends and ring corners and overlap the wing roofs (a tower cone is 64 facets, painted after everything else — §2.3); one building may carry two (gallery row 3 #4); one small plan is dominated by a single big tower (45-12 draw gen-1, `_page-images/04.png`) [SHOWN]. `Tower.intersects` exists for tower–tower rejection [NAMED-ONLY — never ran]. Frequency: towers in 9 of 16 gallery buildings (`42879157/04.png`) and in 4 of the 14 distinct buildings in the capture and probe screenshots [SHOWN counts of images].

### 2.5 Step 4 — entrances, pathways, grass [SHOWN]

- **Entrances.** `Wing.spawnPorch` runs once per wing (a per-wing chance of an entrance); `createPorch` runs only when a half-dome porch is actually built (2 in 48-38 g0). Buildings with no porch still get a doorway: the pathway then starts at a small gabled bay on the wall (45-12 draw gen-2, coverage gen-1/gen-2) [SHOWN]; the square ring 45-12 g0 has **no entrance and no path** (`PavedRoad.new` 0) [SHOWN].
- **Pathways** ("Pathways" option): one `PavedRoad` per entrance (0/1/1/2), each a trail of 31–69 stepping stones meandering away from the door and fading out a few wing-widths away. Every stone is `Circle.new` → `Chaikin.render` → `drawStone` (all three counts identical in every generation: 32/31/69/63) — a circle perturbed and Chaikin-smoothed into a pebble, filled #c3baac–#dcd2c2 and outlined in ink at 20 % alpha. `openfl.geom.Point.distance` jumps from 26 (no road) to 6 518–18 955 with roads: stones are placed with pairwise distance tests [SHOWN counts; INFERRED rejection placement]. Stones thin out and shrink with distance from the door (screenshots). On **C** the stones are re-rolled (69 → 63) while the building is not [SHOWN].
- **Grass** ("moss" in the comments): `createGrass` → `Grass.new` ×1–4 small canvases each filled with 5–149 radial-gradient blobs (`createRadialGradient` + `arc`), placed against the building's walls, typically at re-entrant corners and near the entrance [SHOWN]. Users called the "moss and stones" a "very cute detail" (itch 2020–2021) [STATED by users].
- **Ground**: flat beige ≈ rgb(200,192,177) with a 64×64 pixel-noise tile repeated 432× ("Noise") [SHOWN].

### 2.6 Orientation, scale and framing [SHOWN]

The whole building is rotated by an arbitrary angle (screenshots at every angle; `PolyTransform.rotateYX` 8–15 calls) and centred (`PolyCore.center` ×1). `ManorScene.layout` scales the view to fit: the scale-1 building canvas (e.g. 432×383 px) is redrawn at display scale ×1.37 (593×526 px) [SHOWN draw record]. There is **no world scale**, no north, no boundary, no neighbour — see §3.

### 2.7 What FM does not compose [SHOWN by absence + STATED]

No interiors, floors or rooms; no chimneys, stairs, beams, wells, fences, trees, walls, gardens, outbuildings or second building — the release post lists exactly these as *possible future* details [STATED `42879157`], and the class inventory has none of them [SHOWN]. The courtyard is simply the empty inside of a `ring`/`closed` path (grass may be drawn there) — it is not an object.

### 2.8 Creator statements that bear on the grammar

- "Most of these buildings a large enough to be called manor, but occasionally small cottage-like ones are spawned." (`42879157`, 2020-10-18) [STATED]
- "There will be some sort of editing tool, but first I'm going to enable creating more diverse shapes procedurally." (itch reply 2020-10-20) [STATED] — never delivered in FM.
- Asked to "standardize gable types", he asked back whether it was "about some parts of the same building having gable roofs and other having hip roofs" — i.e. a building mixes gable-ended wings, hip-roofed blocks and two dormer types [STATED + SHOWN]; the user meant dormers.
- 2025-12-01 (`144816210`): he started a PROCJAM remake of "my old Fantasy Manor generator", found it "a boring idea", and moved the progress into Dwellings as "nicer looking roofs" (Dwellings 1.4.1, `145140009`) [STATED]. **The live descendant of FM's roof work is Dwellings, not FM.**

(PM and Dwellings lineage grammar: §2.9–2.10, below.)

### 2.9 The sibling that FM defers to: Procgen Mansion (PM, PROCJAM 2018) [STATED unless marked]

The FM page sends readers to PM "For something more substantial" (itch page). PM is a 3-D (Away3D) mansion generator whose composition grammar is **grid-first**:

- **Ground plan = a polyomino on a square grid.** "Procgen mansions are built from polyomino-like ground plans, which used to be generated randomly" (`34131516`, 2020-02-18). The blueprint editor (B) lets the user paint cells; disconnected cell groups become **separate buildings**, and a ring of cells with a hole becomes a courtyard mansion (`34131516/03.png`: a hollow polyomino → four ranges round a court, spire tower, dormers) [STATED + SHOWN].
- **Wings are built from the plan.** Towers: Shift+click marks tower cells, and "other cells can become towers as well in the process of 'wing building'" (`35009607`). Shift+Enter makes "different buildings from the same blueprint" — the plan is one random stage, the wing/roof/tower building a second, separately re-rollable stage (`35009607`, itch page) [STATED].
- **Size classes are keys:** Z / X / C = small / medium / large mansion (PM itch page) [STATED].
- **Entrances:** Ctrl+click marks a wall as a door; "Not all marked entrances are guaranteed to turn into doors … the generator has its own ideas about how many doors there should be" (`47744240`, 2021-02-19) [STATED].
- **Parametric style:** an Overhangs window (depth; max pile height above which corbels replace piles; whether overhangs may attach to overhangs) and a Style editor that edits geometry values such as roof pitch and window size (`47744240`) [STATED].
- **Roof details:** dormers added 2019-12 because big roofs lacked detail (`32477317`); tower roofs changed from two stacked pyramids to smooth "concave cones" (`35009607`, image 03) [STATED + SHOWN]. Window recesses are boxes outside the walls with inverted normals (creator reply, `35009607`) [STATED].
- **Scale:** "the side of a grid cell in Procgen Mansion should be around 3 meters", but "both 2x2m and 4x4m buildings will be displayed as a 1 cell 'shack'" and "Dimensions are a mess in all my generators" (creator reply, `79147510`, 2023-03-08) [STATED].
- **Floor plans:** PM exports per-floor SVG plans (`28327848`, 2019-07) and later tables of floors (`65675282`). A better floor-plan sub-generator was planned for PM and then dropped: the recursive-bisection method conceived for it "turned out to be not good enough to bother with mansion" and went to *Dark Clues* instead (`86093774`, 2023-07-14) [STATED]. The creator's later verdict: PM's plans "are pretty useless imo" (Dwellings itch reply, 2024-09-25) [STATED].

### 2.10 The live successor: House Plan Generator → Dwellings (DW, 2023-07 → 2025-12) [STATED unless marked]

DW replaced PM as the suite's building generator on 2024-10-04 (`113347826`), and FM's PROCJAM-2025 remake went into DW's roofs (`144816210`, `145140009`). Its grammar is **plan → partition → roles**, the reverse of FM's roof-first grammar:

1. **Ground plan.** Random orthogonal shape (or a blueprint: "random shape (R) or a random rectangle (X)", or a plan passed in by a settlement generator via permalink, `112799146`, `111909860`). Only **connected shapes without holes**: "if you draw two unconnected shapes, Dwellings will only process the largest of them. And if you draw a shape with a hole, the hole will be ignored" — courtyards were promised and postponed twice as "even more complicated" (`112799146`, `113347826`) [STATED].
2. **Floors.** 1–3 floors originally, later `low`/`tall` tags and a "Number of floors" drop-down, basements "almost always smaller than … the ground floor", upper floors "more likely to be smaller than floors below", and "Houses with larger ground plans tend to be higher now" (`86436420`, `86852618`, `96522502`, `111909860`) [STATED]. Upper-floor plans show the roofs of the lower parts as outlines (`111909860/03.png`, `86852618/02.png`) [SHOWN].
3. **Partition.** Each floor is cut into rooms, halls and corridors by the recursive-bisection method from *Dark Clues* (`86093774`: tweaks to "how the original shape is bisected and how the doors are placed", corridors merged "to avoid spawning unnecessary doorways"; `120395768`: DW "has grown out" of Dark Clues). Tags `organic`/`mechanical` change the partition style; `spacious` became the default in 1.4.0 and `hallways` requests the maze (`96522502`, `143036785`, `143565705`) [STATED]. The method's author: "while the method is capable of generating fairly large layouts, small ones look much better" (`86093774`) [STATED].
4. **Vertical links.** External spiral staircase in a shaft first ("easier to place"), then regular staircases placed so "they don't obstruct movement across a floor", a trapdoor when no space, and a `stairwell` tag that stacks all stairs (`86436420`, `86852618`, `112799146`, `143565705`). "Each pair of adjacent floors is connected independently" and the generator "Occasionally … fails to connect two floors" [STATED].
5. **Roles.** "first it creates floor plans made of rooms. Then it builds a list of room types this house needs … Then the generator tries to assign the room types from that list to the rooms" (itch reply 2023-10-02); multiple attempts, best accepted; primary vs secondary types; per-type requirements (kitchen on the ground floor, bedroom ≤ 1 door, windows per type, doors per type); special rooms only if the **house name** asks for them (an *Armoury* only in a knight's or adventurer's house) (`86436420`, `86635425`, `86852618`, `96522502`) [STATED]. "each room type is not just a name, but also its average size, how regularly shaped it should be, how many windows it requires" (itch reply 2024-04-30) [STATED].
6. **Dressing.** Entrance chosen "to avoid the longest wall" (1.3.0), or marked in the blueprint (1.3.8); abstract furniture (1.3.6); lights and vector AO; elevations drawn as stacked Tiny-Pubs façades (1.3.0–1.3.2); **roofs** (1.4.1): hip roofs per block, Simple/Detailed/Hidden, Shade/Fade/Shrink, chimneys "not affected by the rooms below them", gable roofs and other materials listed as future work (`145140009`; image 02 shows every block hipped, higher blocks drawn over faded lower ones) [STATED + SHOWN].

**Taverns** (`158074424`, 2026-05-12) is the creator's admission that this grammar cannot do typed buildings: DW "is not good at creating tavern/inn layouts or more broadly at creating layouts with specific topology", so Taverns uses "a different generation method" with a fixed programme (common room + kitchen / guest-room corridor / unstructured basement) and **no size option** [STATED].


## 3. Plan versus plot / lot — the owner's question

### 3.1 What FM does today: nothing with a plot [SHOWN]

FM has **no boundary input, no world scale and no orientation constraint**:

- The plan is generated from one of five internal path layouts (§2.2), then rotated by an arbitrary angle and centred (`PolyTransform.rotateYX`, `PolyCore.center` ×1), then scaled to fit the 1500×1100 canvas by `ManorScene.layout` (scale-1 building canvases 300×194 to 432×383 px, displayed ×1.37). Every screenshot shows a different rotation [SHOWN].
- The only spatial tests are **internal**: `PolyBounds.testShapeVsShape` (25–83 calls) and `PolyBounds.containsPoint` (62–178) against the shapes collected by `Manor.getShapes` (9–18 calls), plus `Tower.intersects`; they reject some colliding blocks or towers, but which overlaps count is not identifiable (blocks and towers visibly overlap wings) [SHOWN counts; INFERRED use].
- Pathways run from each entrance in an arbitrary direction and thin out a few wing-widths away — there is no street to connect to (every screenshot) [SHOWN].
- The creator never claimed FM fits anything. His one plan for use elsewhere was "I can try to find a way to use these buildings in MFCG or (more likely) in Village Generator" and "nicer castles" (`42879157`) [STATED]; it was never done for FM.

### 3.2 How the creator *did* drive a building from a settlement lot — the PM and DW hand-offs [STATED]

The evidence for lot-driven generation in this lineage is the "Open in PM" / "Open in Dwellings" integration, not FM:

| date | from → to | what is passed | creator's words |
|---|---|---|---|
| 2022-05-18 | VG → PM (`66544756`) | **size only** (VG houses are rectangles) | PM plans from rectangles "don't look particularly interesting" and give "boring floor plans", so "I allowed ground plans to be more intricate. The building's dimensions still correlate with its size on a map." |
| 2022-05-18 | plan for MFCG/NG | shape | "there I'm going to reproduce buildings in stricter accordance with their shape on a map. In theory, I can even make PM place entrances where they should be (on a street-facing facade) but I doubt it's worth bothering." |
| 2022-08-24 | NG → PM (`70917627`) | **size and shape** | "Procgen Mansion approximates irregular polygons with squares, but overall shapes remain recognizable." Large buildings: "Procgen Mansion is not designed to visualized 'palaces' or 'cathedrals'." |
| 2023-02-24 | MFCG → PM (`79147510`) | building | "you can now open any building on a city map in Procgen Mansion" |
| 2024-09-12 | NG → DW (`111909860`) | ground plan via permalink | "It took some extra effort to 'teach' Dwellings to accept a ground plan as a parameter for integration with other generators." |
| 2024-10-04 | MFCG, VG → DW (`113347826`) | same | "I'll need to fine-tune this functionality later to take advantage of all the options the new generator supports." |
| 2025-11-07 | DW 1.3.8 (`143036785`) | **entrance position** in the blueprint, saved in permalinks | built "to allow MFCG, VG and Urban Places to specify where the house entrance should be … This isn't currently working, as it requires appropriate changes to each of these generators." |

The VG → PM screenshot (`66544756/03.png`) shows the result: a small rectangular village house opened as a five-floor PM plan whose ground floor is a stepped, more intricate polyomino with two spiral-stair turrets, upper floors shrinking over grey roofs of the lower parts [SHOWN].

**So the creator's own recipe for "building from lot" is: rasterise the lot polygon onto the building generator's square grid (cells ≈ 3 m in PM), pass it as the ground plan, pass the street-facing entrance edge, and let the building generator do everything inside that footprint** [STATED pieces; the assembled recipe is INFERRED]. What it loses is also stated: sub-cell detail ("2x2m and 4x4m … a 1 cell 'shack'"), holes (DW), and any building class the generator was not designed for (palaces, cathedrals, taverns).

### 3.3 What a lot-driven FM would need [INFERRED — reasoning given]

FM's grammar is well suited to being driven by a lot, because its only free structure is **a path of wing segments** plus decorations that are rejection-tested against each other:

1. **Replace `getPoly`'s random layout with a lot-derived path.** `ring`/`closed` ≈ the lot boundary inset by half a wing width (a courtyard manor filling a big lot); `rect` ≈ the lot's oriented bounding box inset; `arc` ≈ the frontage edge plus one or two side edges (U / L range open to the rear); `snake` ≈ a polyline along the frontage for long narrow plots. The recorded counts show one wing per path segment, so segment count is the complexity dial.
2. **Wing width** becomes the second size parameter (within one building the ring/arc wings read as one constant width in every screenshot [SHOWN, visual reading]); the lot's depth caps it.
3. **Orientation is fixed by the frontage** instead of a random angle; the entrance (`spawnPorch`) is restricted to the street-facing wing, which is exactly the DW 1.3.8 "marked entrance" idea.
4. **Add the lot polygon to the collision set** that `testShapeVsShape` already uses, so hip blocks, towers and dormers that would poke outside the lot are rejected like colliding ones.
5. **Pathways** start at the porch and run to the street edge instead of an arbitrary direction.

A **size budget** maps onto the same knobs: footprint area ≈ Σ(segment length) × wing width + hip blocks + towers; a budget picks the layout (hovel → a single short `rect` wing or a two-segment `arc`; manor → `ring`/`closed` with 4–8 segments), then the number of hip blocks (0–4 recorded), towers (0–2) and dormer density. None of this exists in FM; it is the smallest change that turns its grammar into a lot filler.


## 4. Diversity and size classes

### 4.1 What FM covers today [SHOWN + STATED]

- **Creator:** "Most of these buildings a large enough to be called manor, but occasionally small cottage-like ones are spawned" (`42879157`) [STATED]. There is **no size option**; a user asked for "house size" on release day (itch, 2020-10-18) and nothing followed [STATED].
- **Release gallery** (`42879157/04.png`, 16 buildings) [SHOWN]: 12–13 courtyard, arc or L-shaped manors (square, rectangular, rotated-square, pentagonal and octagonal rings; C-shaped arcs; an L/meander) and **3–4 compact buildings without a court** (a hip block plus a dominant cone tower and one or two short wings) — the "cottage-like" end (the L-shaped one sits between the two readings). Towers in 9 of 16, two towers on one. Roofs 8 slate, 8 wood [SHOWN]; that the author toggled Slate roof per building for the gallery, rather than slate being random, is INFERRED from the build having slate only as a menu toggle.
- **Recorded range** [SHOWN]: exact counts over the 4 distinct coverage buildings — wings 4–8, hip blocks ("diamonds") 1–4, dormers 6–9, porches 0–2, towers 0; draw-log segmentation of the 4 distinct draw buildings — 2-facet sections (wings + dormers + bays) 7–14, of which 3–4 wings, 4-facet blocks 0–2, a 64-facet tower in 2 of 4, a 32-facet porch in 1, facets 28–110 per building. Towers appear in 3 of the 11 distinct capture buildings (4 of 14 counting the probe screenshots). Scale-1 footprint canvas 300×194 px (compact, tower-dominated) to 432×383 px (rectangular ring with tower).
- **Where diversity comes from** [INFERRED from the counts and pictures]: (1) which of five path layouts; (2) the number of segments and their angles (4/5/6/8-gons, rhombus, open chains); (3) independent per-wing dormer rows on both eaves (`spawnAlong` ×2 per wing) and per-wing entrance chances (`spawnPorch` ×1 per wing); (4) 0–4 hip blocks straddling the path; (5) 0–2 towers; (6) random roof hue per building plus random light (`prepareColors`, "New lighting"). The small end is not a separate class — it is the same grammar with a short path and a large tower.
- Users noticed the bias: "it seems to like hexagons" (2021), "they hit the pentagon" (2026) [STATED by users].

### 4.2 Size classes elsewhere in the lineage [STATED]

| generator | classes | rule / note | source |
|---|---|---|---|
| PM | small / medium / large mansion (keys Z/X/C); blueprint for custom size | "both 2x2m and 4x4m buildings will be displayed as a 1 cell 'shack'" | PM itch page; `79147510` |
| HPG/DW | tags `small`, `medium`, `large` (+ `1/2/3 floors`, later `low`/`tall`, `slab`, `square`, `basement`, `blank`, `spiral`, `transparent`) | size tags exist since 1.2.0 (tags dialog, creator image 2023-08-31); **no `huge`**: "My algorithm tends to produce very unrealistic plans for buildings larger than 'large', and I wouldn't like to expose it" — larger via the blueprint editor | itch reply 2024-09-27; `_comments-images/06.png` |
| DW | height follows size | "Houses with larger ground plans tend to be higher now"; upper floors "more likely to be smaller" | `96522502` |
| DW | basement chance | "for a single-storey building the probability is 50%" | itch reply 2024-09-27 |
| DW | programme follows the house | bedrooms ≈ number of floors; special rooms only if the house **name** requires them (Armoury ↔ knight/adventurer) | itch reply 2023-09-01; `86635425` |
| DW | room sizes are ordinal, not metric | "the goal wasn't to make the bathroom 10 times smaller than the bedroom … but just to make the bathroom the smallest room and the ballroom the largest" | itch reply 2025-09-22 |
| NG | regular houses vs "large buildings" | large ones get a dome, spire or dormers; **"If there is enough space around a large building (i.e. when the plot it's placed on is significantly larger than the building itself), trees are planted around it"**; spaced apart; `secular` tag disables | `70917627` |
| NG | district character | "it can only choose different values for the minimum and maximum street widths, the average building and block size, and some other variables" | creator reply, `70917627` |
| MFCG | regular / church / Temple / Citadel | churches "larger than regular ones, but usually smaller than the Temple", each with a small square | `79147510` |
| Taverns | none | "There is no way to request a larger or smaller tavern, more floors or no basement." | `158074424` |

A user asked NG for socio-economic classes ("wealthy, clean, large homes spaced out more, while a poorer part of town might be smaller, dense, squalid shacks", `70917627`, 2022-09-04); the creator's answer above is that only street widths and average building/block size are available as levers [STATED].

### 4.3 Small houses and floor plans (DW's answer to the hovel end) [STATED + SHOWN]

- HPG's goal was "fairly small, mostly residential houses … relatively simple, but not trivial"; "there is no explicit scale" (`86436420`) [STATED]. `86093774/06.png` shows nine small orthogonal plans of two to four rectangular blocks, each partitioned into a few rooms with windows and an entrance stair — the size range where the bisection method "look[s] much better" [SHOWN + STATED].
- The small end has its own rules: external spiral stair in a shaft for multi-floor houses, basements smaller than the ground floor, kitchens on the ground floor, bathrooms attached to bedrooms, one-cell rooms merged into corridors (`86436420`, `86852618`, `96522502`) [STATED].
- The large end fails: plans beyond `large` are "very unrealistic"; temples need symmetry the algorithm cannot give (itch reply 2023-09-01); taverns need a topology it cannot give (`158074424`) [STATED].

### 4.4 Evidence for rules that pick a class per plot [STATED facts; INFERRED synthesis]

The corpus contains every ingredient of a per-plot class picker, spread across generators, but **no generator implements one**:

1. **Plot-size → building treatment** exists in NG: a plot "significantly larger than the building" gets trees; large buildings are spaced apart (`70917627`) [STATED].
2. **Class → generator parameters** exists in PM (small/medium/large) and DW (size tags, `low`/`tall`, name-driven room programme) [STATED].
3. **Footprint + entrance hand-off** exists (NG/VG/MFCG → PM/DW, 2022–2025) [STATED].
4. **Cheap model**: FM's whole model build is 0.6–1.7 ms (§6), so one plan per lot is affordable even for a thousand-lot district [SHOWN; the scaling is INFERRED].

Missing and to be designed: the mapping *lot area × frontage × district character → class* (hovel / cottage / house / hall / manor / special), and the per-class grammar limits (layouts allowed, segment count, wing width, hip blocks, towers, courtyards). §9 sketches it.


## 5. Rendering and style [SHOWN unless marked]

All from the draw records (`draw/gen-N.draw.json`, 5 generations), the reports and the images.

- **Projection.** Pure top-down roof plan; the building is drawn twice, at scale 1 on an off-screen canvas (shadow source) and at display scale (×1.37 in the recordings). One WebGL stage canvas composes the layers.
- **Roof facets.** Each facet: one fill in its lit colour → three 0.5-px strokes in the same colour (seam hiding) → one **hatching path** of parallel lines (9–39 segments, i.e. ~5–20 lines, roughly proportional to facet size) in ink at 50 % alpha, 0.5 px → one 1-px ink outline (#33322e) per roof section. Round joins and caps everywhere. `ManorView.line` is called once per hatch line (437–951 per building) and `PolyCut.pierce` ≈ `line` + 27…151 clips them to the facet [SHOWN counts; clipping PLAUSIBLE].
- **Lighting.** Facet colour is a function of facet orientation: the two facets of a wing get a dark/light pair (e.g. #523e37 / #7d5f4e, and #4c3a34 / #836351 for the perpendicular orientation); rotated plans (rhombus, octagon) produce many distinct shades up to near-white highlights (#fbcba6, #ffe7be) [SHOWN]. Cones use a 64-step ramp around the axis, which reads as a specular highlight [SHOWN]. The creator: "Intensity of specular light is a random parameter, sometimes it's zero" (itch 2020-10-20) [STATED]. A user asked for "softer light on the cone shapes" (2020-10-19) [STATED user]. `prepareColors` (the largest routine in the package, 5253 bytes) runs once per view; `Color.hsv`/`level`/`rgbfSafe` run hundreds to thousands of times [SHOWN].
- **Palettes.** Wood roofs are warm browns whose base hue varies per building (#4c3a34…#a17962 in one, #504135…#e3c098 in another, #564235…#fbcba6 in a third); **Slate roof** switches to blue-grey (#474c58, #4b515c, #747c8c, #8991a1 … #a1aaba) on the same geometry. Ink #33322e; hatching rgba(51,50,46,0.5); paving stones #c3baac–#dcd2c2 outlined rgba(51,50,46,0.2); ground ≈ rgb(200,192,177) with a 64×64 pixel-noise tile repeated 432×; grass = soft radial-gradient green blobs (gradient stops not captured) [SHOWN].
- **Shadow.** A drop shadow offset to one side (lower-right in most screenshots), built from the scale-1 silhouette by 11–15 draw + colour-transform passes (`getImageData`/`putImageData` pairs; `BitmapData.draw` exactly 2× per `colorTransform`). It is a soft, slightly blurred dark band along the leeward walls — the only cue to wall height [SHOWN]. PLAUSIBLE: the passes step the silhouette outward to fake a soft penumbra.
- **Painter's order.** Porch half-cones → wing roofs → dormers → tower cones and hip blocks (§2.3); then shadow, noise, grass, pathways composited under the display-scale building [SHOWN draw order; final WebGL z-order PLAUSIBLE].
- **Simplified view** (`_page-images/03.png`): one flat roof colour, ink outlines of every facet, ridge, hip, valley and dormer, no hatching, shadow, grass, noise or paths; a pyramid block reads as a square with an X [SHOWN].
- **What FM lacks visually**: walls (never visible from straight above), windows, chimneys, text, scale bar, north arrow.
- **Lineage comparison.** NG (2022) draws houses as strips of gabled sections with hatching, chimneys and "more pronounced ridges", and large buildings with pyramid roofs, domes or spires plus trees (`70917627/03, 05`) [SHOWN]; its cobble paths look like FM's pebble trails. DW 1.4.1 draws **hip roofs only** with tile rows, bead-line ridges and hips, square chimneys, a radial-and-ring tiled cone for the stair tower, and Shade/Fade/Shrink to separate heights (`145140009/02.jpg`) [SHOWN]; gable roofs are future work (`145140009`) [STATED].


## 6. Performance and determinism [SHOWN]

| quantity | value | source |
|---|---|---|
| model build (`model.Manor.new`) | 0.6–1.7 ms | CPU profile gen-0/1/2 |
| view build (`ManorView.new`) | 0.9–1.5 ms | same |
| whole regeneration (`ManorScene.reset`) | 39–70 ms | same |
| of which drop shadow (`Shadow.new`) | 35–63 ms (≈ 90 %), dominated by `getImageData` (18–23 ms) and `ImageDataUtil.colorTransform` (10–23 ms) | same |
| grass / roads | < 2 ms each | same |
| cold load wall time | ≈ 2.3 s, of which `lime.media.AudioContext.new` 133 ms and app start 75 ms | profile gen-0 |
| calls per generation | 68 661–153 625, overwhelmingly OpenFL vector plumbing | coverage |

- Generation is **synchronous inside the Enter key event**; the page is idle again before the first 12-ms poll [SHOWN].
- **No determinism handle.** No URL parameters (`?seed=` ignored), no seed display, the URL is never written; `Math.random` 0 calls in all five draw generations and the URL probe, `Date.now` 0 calls in the URL probe; `com.watabou.utils.Random.reset` runs once at start-up and never on regeneration, so all buildings in a browser session share one hidden PRNG stream [SHOWN]. No recorded building can be replayed; the Slate-roof pair (C) is the only same-building comparison [SHOWN].
- The C toggle re-rolls grass and paving (stones 69 → 63) but not the model, so decoration consumes randomness at view time, most likely from the same session stream [SHOWN re-roll; shared stream INFERRED from the single `Random.reset`]. A re-implementation should give decoration its own seeded stream.
- By contrast DW is fully seeded and permalinked (`?seed=1341473638&tags=large,slab`, creator reply 2025-12-18; permalinks since 1.3.2) and PM since 2.1.2 (`65675282`) [STATED].
- **Cost implication for stage 3** [INFERRED]: the plan grammar is cheap (≈1 ms per building); the expensive part is FM's bitmap shadow, which a district renderer would replace with a vector offset shadow or one shared shadow pass per map.


## 7. Limits, requests, complaints, failure modes

### 7.1 Creator-admitted limits [STATED]

- FM is "an experiment without immediate purpose" with "nothing but roofs"; interiors "possible, but I expect it to be hard" (`42879157`). Its 2025 remake was abandoned as "a boring idea" (`144816210`).
- Promised in 2020 and never delivered in FM: "some sort of editing tool, but first I'm going to enable creating more diverse shapes procedurally"; "All my generators get customizable colors eventually"; "at the very least there will PNG export with transparent background" (itch 2020-10-20); "I'll try to find time to add basic export functionality" (itch 2024-09-25).
- The C hotkey: "It's C for New lighting (I don't remember why)" (2022) — in the 2026 build C is Slate roof (§1) [STATED + SHOWN].
- PM: "not designed to visualized 'palaces' or 'cathedrals'" (`70917627`); its plans "pretty useless" (DW itch 2024-09-25); dimensions "a mess" (`79147510`); hills are "pretty glitchy" (trees sometimes float above the ground) (`47744240`); "castles and fortresses deserve their own generator - with curtain walls, gatehouses and dungeons" (`47744240`).
- DW: nothing larger than `large` ("very unrealistic plans"); no holes/courtyards; no circular plans ("The lack of support for circular plans IS a problem", itch 2026-04-10); stairs between floors are "a mind bending task" and sometimes fail; guaranteeing a room type is blocked by plan-first/roles-later ("the method I use is not suitable for this", itch 2025-09-30); temples need symmetry; taverns need topology; it is "designed to create maps of 'house-like dungeons'" (itch 2026-04-10).

### 7.2 User requests and complaints on FM (itch thread, 29 posts) [STATED by users]

| request / complaint | date(s) | creator response |
|---|---|---|
| PNG export, transparent background; "Floorplan with no roof" | 2020-10-18, 10-31; 2022-11-01; 2024-09-18 | "Maybe." (2020); "I'll try to find time…" (2024); not shipped |
| floor plans / insides ("would be better if it was just the floor plans", +3; "floorplans a la Mansions") | 2020-10-18; 2021-03-05 | none |
| house size and backgrounds as options | 2020-10-18 | none |
| softer light on cones; warp tool for the basic shape/"line"; toggleable details (chimneys, decorations, clutter); custom palettes; uniform dormer style; RGB export for Wonderdraft symbols | 2020-10-19 | specular is random; editing tool after more procedural diversity; colours "eventually" |
| moss and stones "very cute"; bring the style to PM | 2020-11-09; 2021-01-27 | "I'll try the moss and stones" in PM |
| controls menu; "70 percent of the keys do not work"; L for New lighting | 2020-11-09; 2021-12-04; 2022-08-18 | "It's C for New lighting" |
| shape bias: "it seems to like hexagons"; "they hit the pentagon" | 2021-09-03; 2026-01-27 | — |
| combine all tools into a world generator; desktop/offline versions | 2020-10-18/21 | — |

### 7.3 Failure modes visible in the recordings and images [SHOWN]

- **Buildings without an entrance**: the square ring of 45-12 coverage gen-0 has no porch, no doorway and no pathway (`PavedRoad.new` 0).
- **Overlaps are allowed between classes of element**: towers overlap wings and even sit on hip blocks (`_page-images/04.png`, 45-12 draw gen-1); hip blocks straddle ring corners and sides. Whatever `testShapeVsShape` and `Tower.intersects` reject, it is not block–wing or tower–wing overlap [SHOWN overlaps; rejection scope INFERRED].
- **Projecting stubs**: a single gabled wing can stick out of a ring at an odd angle (48-38 draw, the first-painted section) [SHOWN].
- **Paths ignore context**: pathways leave in arbitrary directions and fade out; two paths can leave the same building in different directions [SHOWN].
- **Scale ambiguity**: a compact tower-dominated plan and an 8-wing octagon are framed to the same screen size (fit-to-view), so size is only readable relative to wing width and dormers [SHOWN].


## 8. Open questions and the single next measurement

**Open (not answerable from this slice):**

1. The **layout weights** of `getPoly` (ring / closed / arc / rect / snake) and which screenshot shapes `closed`, `rect` and `snake` produce — only `ring` (3×) and `arc` (1×) were recorded.
2. The **segment-count and angle distributions** per layout (4, 5, 6, 8 sides seen; is 3 or 7 possible? are rings always near-regular?), segment lengths and wing width, and whether wing width varies between buildings.
3. The **per-element rates**: hip blocks per building, their placement rule (corners vs mid-sides), dormer spacing, per-wing entrance probability (`spawnPorch` → `createPorch`), towers per building and their placement (ends vs corners), and what `zigzag` (never ran) draws — PLAUSIBLE candidates are crenellations or a thatch edge.
4. The **light model** behind "New lighting" (direction? specular intensity? both?) — needs a menu-click step the profiler lacks.
5. Whether the "cottage-like" small buildings are a **separate branch** (e.g. `rect` with one or two segments) or the tail of the same distribution.
6. For the lineage: how PM rasterises a lot polygon to cells (cell size relative to the lot, rounding rule) and how DW turns a passed plan + marked entrance into a building — both are generator internals not described anywhere in the corpus.

**The single next measurement:** one coverage-plus-screenshot run of **≥ 40 Enter regenerations in a single browser** (`node record.mjs --target manor --runs 40 --passes coverage` with a screenshot per generation), tabulating per generation from `calls.json`: which of `ring/closed/arc/rect/snake` ran, `Wing.new`, `drawDiamond`, `drawDormer`, `createPorch`, `PavedRoad.new`, `Tower.new`, `ManorView.shaded`, plus the scale-1 building canvas size from a draw pass. That single table fixes the layout weights, the element rates and the size distribution (and tells whether the small buildings are their own branch), which is everything §9 needs to parameterise a lot-driven version. It is a measurement of recorded behaviour only; no bundle reading is required. The C/Slate and menu options add nothing to the model and can stay deferred.


## 9. What changes for a re-implementer (one page)

**Keep from FM (the composition grammar, re-parameterised):**

- A building = **a path of wing segments** (closed ring, open arc, rectangle, meander) → one constant-width **wing slab per segment** with a two-facet ridge roof and mitred joints → **decorations spawned along each eave** (dormer rows on both sides) → **0–4 hip-roofed blocks** straddling the path and **0–2 round towers** at wing ends and corners, each rejection-tested against earlier shapes (the exact rule is not identified) → **entrances** chosen per wing (half-cone porch or small gabled bay) → pathway, grass and shadow as dressing. The model is ≈ 1 ms, so one plan per lot is affordable.
- Rendering recipe: facet fill by orientation against one light direction (+ random specular), 0.5-px same-colour seams, hatch lines clipped to each facet, 1-px ink outline per section, fixed painter's order (porch → wings → dormers → towers and blocks), soft offset shadow, optional flat "simplified" mode.

**Change for stage 3:**

1. **Seed everything** and split streams (model / decoration / light), unlike FM (§6).
2. **Replace the random layout with a lot-derived path** and fixed orientation (§3.3): the path comes from the lot polygon (inset ring for big lots, frontage-plus-sides arc for deep lots, frontage meander for narrow ones, OBB rectangle for small ones), the entrance goes on the street-facing wing, and the lot polygon joins the collision set.
3. **Add an explicit class picker per plot** — FM has none (§4). The lineage supplies the levers: size classes (PM small/medium/large; DW size tags and `low`/`tall`), size → height (DW), plot much larger than building → trees/garden (NG), large/special buildings spaced apart (NG), and a name/role that decides special rooms (DW). A minimal picker: *lot area × frontage × district character → {hovel, cottage, house, hall, manor, special}*, each class bounding the allowed layouts, segment count, wing width, hip blocks, towers and courtyard.
4. **Cover the small end deliberately.** FM's "cottage-like" buildings are a by-product; a hovel should be a single `rect` wing (or two-segment `arc`) with at most one dormer and no tower. DW's small plans (two to four orthogonal blocks) are the reference for the small end's shapes (`86093774/06.png`).
5. **Courtyards and holes are cheap in FM's path grammar** (a closed path *is* a courtyard) but were never solved in DW's partition grammar (holes ignored, `112799146`). If stage 3 ever adds interiors, keep FM-style roof composition for the exterior and treat interiors as a separate stage, which is how the creator moved: FM's roof work went into DW's roof layer, not the other way round (`144816210`, `145140009`).
6. **Metric scale is the owner's call.** The creator's generators have none ("Dimensions are a mess in all my generators"; PM cell ≈ 3 m; DW room sizes ordinal only). A lot-driven generator must choose wing width and dormer spacing in world units.
7. **Do not copy**: the bitmap drop shadow (90 % of the time), unseeded randomness, cross-kind overlaps (towers on hip blocks), buildings without an entrance, and pathways that ignore the street.

**Evidence level of this page:** the grammar steps and counts are [SHOWN]; the lot-driven changes and the class picker are [INFERRED] designs built on [STATED] lineage facts.


## Fable review (2026-09-27) — B14

**Verdict: CORRECTED** (`docs/fable-review/main/evidence-captures.md`, row B14). Read whole. The four-class inventory, the
five-layout `getPoly` with one `weighted` pick, the Wing-per-segment step, the facet and section identities of §2.3, "no plot /
scale / orientation input" (§3.1) and the hand-off history (§3.2) are CONFIRMED; the 41-generation run
(`captures/manor/README-frequencies.md`) extends §2.3's identity with 2-facet bays and 4-facet pyramids and finds the five
layouts at equal rates, and the 2026-09-27 code reading (`docs/AMENDMENTS-2026-09-27c.md` item 59; `research/findings/code-
manor.md`) agrees: the model's whole input is one polyline and one wing width, five layouts at equal odds, a fixed scale of
800 model units. One INFERRED sentence is wrong: §2.3's "When square its roof is a pyramid" (of a hip block) — the code reading
has hip blocks never pyramidal (a separate optional record with a ridge stopping a quarter of the short side from each end);
the pyramids are square towers standing on blocks, as `README-frequencies.md` §2 already reads the 4-facet towers. §2.2's
INFERRED shapes are refined by the code: `closed` = star-shaped closed plans of 4–6 corners, `arc` = 2–7 equal chords,
`snake` = self-avoiding walks on a 4 × 4 grid, `ring` = regular 4/5/6/8-gons; about 70 % of the "dormers" are cross-gables
projecting past the eave; ≈ 14 % of buildings have no entrance (4 of 41 measured). §3.3 / §9's lot-driven adaptation is
INFERRED design and is consumed as such by `docs/ARCHITECTURE.md` §2.6's stage-3 hook; item 59 adopts the layout vocabulary
as path-shape rows and keeps our departures (wings in the collision set, a street-facing main door, metric scale).
