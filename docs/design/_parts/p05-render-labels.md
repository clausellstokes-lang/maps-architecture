## §9 Rendering and the style system (the first contract)

### 9.1 The display list (hard-to-reverse; alternatives in §19)

A **renderer-independent, layered list of marks** generated from the model per LOD band, cached by entity id, consumed by every back end:

```ts
type LodBand = 'city'|'district'|'neighbourhood'|'building';
type MarkKind = 'area'|'ribbon'|'outline'|'hatch'|'glyph'|'text'|'instances'|'shadow';
interface Mark {
  entity: Id<any>; layer: Layer; z: number;           // z within layer; layer order underground < ground < sky
  semantic: string;                                  // 'water.sea' | 'way.primary' | 'building.roof.lit' | 'wall.curtain' | 'field.furrows' | 'label.district' …
  kind: MarkKind; lod: LodBand[];                    // bands in which the mark exists (geometry never changes with zoom)
  geometry: Geometry;                                // polygon(s) with holes | polyline + widths | point set + params | text spine
  attrs: Record<string, number|string>;              // height, prosperity, class, orientation, seed — inputs to paint programs
}
interface DisplayList { bands: Record<LodBand, Mark[]>; index: SpatialIndex; heights: Map<Id<any>, Heights>; sun?: [number, number, number]; }
```

A **style sheet** maps `semantic` (with attribute predicates and LOD band) to a **paint program** — a small vocabulary of operations derived from the minimum renderer feature list of `visual-spec.md` §6: `fill`, `stroke(width in paper units or world units, join, cap)`, `casing(w, h)` (stroke twice: ink at `w + 2h` then body at `w` — MFCG's single most reusable trick, `visual-spec.md` §0.2), `bands(N, W, exponent 1.5, ramp)` (VG's `W·(i/N)^1.5` water law, §2.3), `shadowPass(colour, alpha, offsetFn | prismFromHeight(sun))` (one flat pass under everything — VG/NG; NG's prism = one quad per silhouette edge, `profile-neighbourhood.md` §3.7), `hatch(angle | ridge, pitch, taper)` (MFCG furrows as hairlines; NG tapered triangles from the ridge — 80 % of NG's ops, budgeted), `roof(kind, lit/dark = c × lerp(ambience, shadow, α))` (NG's measured law, §3.6), `crown(lobes, jitter)`, `halo(text, paper, px)`, `glyphAlongSpine`, `texture(tile, tint)` + `light(dir)` (FTG's look), `vignette`, `contourMarks(levels, mark)` (VG's iso-walker, `profile-village.md` §6). Paper-unit widths (px at 1×) are the rule for hairlines and casings; world-unit widths for ribbons — exactly MFCG's two coordinate spaces (§0.2). Colours are named roles (`paper, ink, water, building, green, medium, shadow, ambience, road, sand, plank, roofLight[], fieldLight[], tree[], lights`) so a style file is a palette + program table; the three reference schemas (MFCG 13 keys, NG 26 keys, VG 40 keys — `profile-village.md` §7.1) map onto it without loss.

**Layer order is data**, not code: the style sheet lists the semantic order (bottom → top) per band; MFCG's recorded order (water → roads casing → roads body → river → landmarks → wards → piers → fields → walls → towers → grid → scale bar → compass → labels → title, `profile-mfcg.md` §10.5) and NG's (greens → roads → shadows → buildings → props → trees depth-sorted → title, `profile-neighbourhood.md` §4.3) are the two shipped orderings. Strict two-pass separation (every casing before any body) is a program property so junctions stay clean.

**Level of detail**: `city` (water, walls, towers, gates, tier-1/2 ways, blocks as footprint masses, landmarks, district labels), `district` (plots' footprints, yards, alleys unstroked → stroked, way names), `neighbourhood` (NG-class: hatched two-tone roofs, prism shadows, cobbles, chimneys, wells, lobed depth-sorted trees, street names), `building` (stage 3: wings, roofs, rooms). Footprint geometry is identical in every band (O12 a; owner ruling); only which marks are emitted and which programs run change; minimum symbol sizes and label floors per band; per-band detail budgets by hardware tier (FTG's tiers, made cheap).

**Layers with toggles and shadows**: `underground` marks (sewers) render through the ground with a program (`cutaway` dashes or a translucent overlay); `sky` marks (islands) render above with a `shadowPass(prismFromHeight)` cast onto the ground layer from the sun vector; per-layer toggles and per-layer export are display-list filters.

### 9.2 Backends

* **Canvas2D** (default; every recorded look is provable there): a retained scene of **tiles per district** (MFCG's per-ward cache: 46 000 fills → 590 uploads is the proof that caching per group wins, `visual-spec.md` §1.1, §6 item 20), re-rasterised only when a district's marks change; instanced batches for hatching and vegetation (typed-array paths, one `Path2D` per program per tile); OffscreenCanvas in a worker for tiles; pan/zoom by transform with re-rasterise thresholds.
* **SVG**: the same display list → grouped `<g>` per layer and semantic with entity ids preserved (layered semantic SVG, O11), hatching emitted as paths, text as text (with halo via paint-order), instances as `<use>`.
* **PNG / print**: tiled rendering at any resolution through the Canvas2D back end (300 dpi A2 without the 8 MP ceiling, O12 e).
* **WebGL2** (optional, METROPOLIS): instanced triangles for hatch and crowns, SDF text later; same display list; pixel-difference test against Canvas2D below threshold (O12 c).

### 9.3 Style presets that reproduce each reference's look (as style files, our own values)

| preset | what it must reproduce (evidence) | programs |
|---|---|---|
| **ink** (default; MFCG family) | four inks on buff paper, hairline `h = 0.5 px`, `w + 2h` casing on roads/river/piers/bridges, round joins/caps (4062/4063), ink drop shadow under buildings offset ≈ (+0.25, +0.7) u, solid-ink landmarks, wall 1.9 u with round towers and gate bars, hairline furrows with no field outline, grid at ≈ 112–120 px pitch over the map, scale bar with old-style figures, 8-ray compass, per-glyph curved caps labels with a paper halo (`visual-spec.md` §1) | fill, casing, shadowPass(offset), hatch(hairline), halo, glyphAlongSpine, furniture |
| **shaded** (VG/NG family; stage-2 close-up) | one flat shadow pass, two-tone roofs (dark = lit × lerp(ambience, shadow, 0.4)), tapered-triangle hatching from the ridge, `(i/N)^1.5` water bands, contour marks along iso-levels in two slope-chosen colours, lobed crowns with gradients (VG) or two flat greens (NG), selective outlining `lerp(fill, ink, factor × pressure)` (`visual-spec.md` §2–3; `profile-neighbourhood.md` §3.6–3.7; `profile-village.md` §6–7; `_critic-vg-ng.md` V13/V14) | shadowPass(prism), roof, hatch(taper), bands, contourMarks, crown, outlineMix |
| **lit** (FTG-like) | tiled land-use textures with tint, directional light on extruded roofs with soft drop shadows, hedgerow tree rows along field boundaries, filled street corridors, stone-textured wall band with round tower nodes, harbour polygon with pontoon bars, foam line, SDF-like serif labels with halo and drop shadow (`visual-spec.md` §4) | texture+light, shadowPass(soft), instances(hedgerow), fill(corridor), halo |
| parchment, night, print-mono | additional data files; night = `lights` role + glow instances (VG's soft lights, kept) | — |

Style constraints: every random style must pass minimum luminance contrast between ground/road/building/water (O12 f); an option-interaction matrix test forbids silent couplings (MFCG's Block mode dropping trees, O12 c); the renderer survives a style with no fills or no outlines (R13).

### 9.4 Shadows, relief, greenery at render

Shadows are a layer program driven by stored heights and a sun vector (off by default in `ink`; subtle in `shaded`); relief tiers (hillshade from the terrain normals + stack blur, VG R4; contour marks; hachures) are optional and off by default (O1 restraint); tree instances are derived per `TreeArea` from its seed with LOD (area fill at city → crowns at district → lobed trees at neighbourhood), instanced and never stored (O19).

### 9.5 Print/VTT export resolution

Export declares a grid scale (m or ft per cell; FTG's 2 m / 5 ft grid, `ftg-posts-c.md` §2.19) and a dpi; the tile renderer produces exact-pixel-per-cell output (grid alignment error 0 px per cell, O11 g); a 100 m scale bar is accurate to 0.5 % at every zoom (O6 c).

---

## §10 Labels and map furniture (the second contract)

* **District/area labels**: hole-aware straight-skeleton spine (the skeleton of the district's face *with its holes* — the reference's stated method minus its stated failure, `mfcg-devlogs-b.md` §2.5, `watabou-extra-b.md` T6) → Visvalingam simplification → centripetal Catmull-Rom → per-glyph placement along the curve with letter-spacing (MFCG's `Letter` per character, `profile-mfcg.md` §8) → size ∝ clearance and area with a curvature limit → collision resolution by a priority queue (importance, area) with candidate spines (longest, highest-clearance, straight OBB axis as MFCG's older method and the `Straight` option) → **protected features** (gates, keep, bridges, landmarks, walls) never covered (MFCG's measured defect, `docs/IMPROVEMENTS.md` O13) → halo in paper colour.
* **Street names** (new to all four): path labels along way centrelines at district/neighbourhood LOD, repeated per segment above a length threshold, collision-checked against area labels; addresses (monotone numbering along each way, VG's numbering idea as a layer).
* **Per-zoom label sets**: city (districts, water, major landmarks, gates), district (streets, squares), neighbourhood (every named way; buildings on demand); density bands per LOD; labels are a toggleable layer thinned by LOD; user pin/move/hide as edit events (persisted, O13 e).
* **Furniture**: scale bar (major/minor ticks, m ↔ km ↔ ft, MFCG's old-style figures as a font feature), compass (procedural 8-ray rose with ink/paper halves and a per-document reroll, MFCG `Compass.reroll`), grid (world-pitched, drawn over the map under furniture, fading below the legibility zoom — FTG's "too thin" defect avoided), title (placed in the emptiest corner — VG/NG's rule, R16), legend (generated from the style registry; annotation layer with numbered markers and a separate legend sheet — VG's L1 idea), north arrow.
* **Names**: an original grammar (feature-conditioned; whimsical set flagged; spell-checked word lists in CI; contraction as an EVO event) from the naming sub-stream so names never move geometry (O13).

