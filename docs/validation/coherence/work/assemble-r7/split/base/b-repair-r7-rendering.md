=== REPLACE ### 8.4 Layers, shadows, heights ===
### 8.4 Layers, shadows, heights

* **Layers** draw in `zOrder`: `underground` marks (sewers) through a cut-away mask or a translucent overlay; `sky`
  marks above, their shadows projected onto the ground layer. Occlusion policy (VIS-17):

  ```ts
  interface LayerSpec { id: Layer; zOrder: number; elevationCm: Cm; visible: boolean;
    castsShadowOnto?: Layer;                // rung 3: the layer whose base this layer's projected shadows are composited into (the sky's onto the ground); absent: its own
    exportSeparately: boolean;              // read by §11.1's layered exports (its *Layers* rule)
    showCircuit?: boolean;                  // the wall layer: each committed enceinte's barrier-closed arcs as a faint dashed line with anchor ticks (g item 106 (g)); off by default; V09 §5.4 (M3a; file f item 413)
    underView?: 'cutaway'|'overlay'|'solo'; // the underground layer: the ground ghosted beneath, the ground at full, or the underground alone; default cutaway (M6-U; file f item 413)
    occlusion: 'opaque'|'ghost'|'offset';   // how a sky layer treats the ground it covers
    ghostAlpha: number;                     // ghost: the covered ground shows through at this share (default 0.35)
    offsetPerMetre?: [number, number] }     // offset: the layer drawn displaced by elevation × this screen vector (default [0, 0.25] px per m, up the screen), tethered to its ground footprint
  ```

  `opaque` hides the ground beneath; `ghost` (the default for `sky`) draws the layer at alpha 1 − g so the covered
  district stays readable; `offset` moves the whole layer clear of its footprint. Island placement is §4.2 S1 (2)'s,
  `SkyIsland.placement`'s (§2.7) and II.6's; B-ZOOM reports the ground area sky layers occlude. The island generator is
  owner-staged; these fields are its hook. **The underground layer is one layer over several systems (item 65; II.7.6; J-A65.81):**
  the sewer network in arena part 0 and each other system — catacombs, caverns, quarries and mine voids, vaults, a
  buried old town, dug passages — in its own part, the undercity in the part of its void (II.7.5), so their topologies stay apart while the view draws them as one layer: every item of every
  part is grouped into the depth bands of `depthBandCm` by the band that holds its floor, the cut-away draws the chosen
  band in full and the items of the bands directly above and below it as `trace` hairlines at α 0.5, and inside one band
  a shallower item draws over a deeper one (`z` by `elevationCm`). Where two parts cross in plan, the crossing therefore
  reads over and under — the upper passage drawn, the lower one's trace passing beneath it — and every link between parts
  (`UndergroundLink`, II.7.6) draws at its own depth with its kind's row (§8.2's `states`).
* **Toggles are visibility; existence is model** (the rule's home is II.7.1 and II.6; J-A12.81): the sewer control at
  CITY and METROPOLIS and the island view toggle set `LayerSpec.visible`, so hiding a layer changes no digest and a
  toggle never creates what the settlement lacks (at TOWN the *Sewers* control is a model setting, II.7.1; whether
  islands exist is the model setting `recipe.layers.islands`, II.6). The view's working layer (§2.9's per-viewer
  `workingLayer`, V09 §4.2) is drawn in that view whatever its `LayerSpec.visible`, every other layer by its
  `LayerSpec.visible`; switching the working layer — V09's view bar, Find's **Go there**, a clerk's `useTool` — sets view
  keys only and never writes `LayerSpec`, so it sends no event and a viewer switches as an owner does (§11.3), and Find
  changes no document, hash or log (item 120 (a)); a layer's own visibility changes only by its toggle (§7.8's layer
  controls, T12 `dress`) or a host's layer command, each a logged `setLayer`; the trees and pins drawing groups (§2.1)
  are switched by `StyleSheet.groups` (§8.2), a logged `setStyle`, and no drawing group by `setLayer`. The per-viewer view key
  `showUnexcavated` (§2.9) draws unexcavated voids for a key that admits them (file f item 413; the `unexcavated`
  program, §8.2). The `underground`
  layer is hidden by default at every rung; when drawn — visible, or Below the view's working layer — the cut-away or
  overlay draws one **depth band** at a time
  (`depthBandCm`, II.7.3): the per-viewer view key `depthBand` (§2.9) names it, default the shallowest band holding a
  tunnel with frontage plots, else the shallowest tunnel; every underground entity's `elevationCm` is its depth below the
  datum (§2.1, II.7.3), and a tunnel, cell or vault is drawn — and exported, §11.1 — on its own level, the band that holds its
  floor, `z` ordering the bands across the underground layer's parts (§2.1's `PlatKey`, one arena each in §3.4). The `sky` layer's `visible` shows the islands a
  settlement has; a waning or settled island keeps its lowered `elevationCm` (II.6), so its shadow falls from its lowered underside (the
  lighting model's slab, below) and §8.2's `states` row lowers its alpha. The lights and casters of a layer the view does
  not draw — hidden and not its working layer — are not drawn and light nothing on the layers drawn, yet they still exist
  (J-A12.81, J-A15.41).
* **Two different things (K06).** The **raised under-copy** (`raised`) is MFCG's Raised: a dark copy of each footprint
  beneath it, swept by an offset read from a class row (§8.2's symbolisation row; item 54) — ON by default in `ink`; not a shadow and not sun-dependent, so it is drawn identically by day, at night and on every
  rung of the ladder below. **Cast shadows** are the lighting model's (below): height-derived, the absence of one
  source's light.
* **The lighting model (item 68; owner: "a daytime view is the default. the global light is the cursor" … "shadows
  are gradients affected by light sources"; underground: "they don't have the sun or moon").** One model, stated here; its view keys are §2.9's (`light`, `sunMode`, `sunHeight`,
  `handLantern`, with their controls in §7.8), its records §2.7's (`LightSource`), its placement §4.7's light table, its
  failure row §5.2's F-LIGHT, its determinism §6.5 (9)'s and its budgets §12.5, §12.7 and §8.8's.

  ```ts
  interface LightingSpec {                // StyleSheet.light (§8.2)
    model: 'field'|'vector'|'none';       // field: the light pass (every rung of the ladder below); vector: rung 3 by the sheet's own choice (`hatched`); none: no cast shadow and no light (the `MFCG` preset)
    castShadows: boolean;                 // the one switch for the global light's shadows: true in every shipped family, false under the `MFCG` preset (J-A68.81)
    mono: boolean;                        // light changes value only, never hue: true in `ink` (its restraint, J-R3), false in `lit` and `hatched`
    sun: SunSpec; moon: MoonSpec;
    ambient: { day: number; night: number; underground: number };   // the sky's light relative to the global light's direct term on a surface facing it — by day ink 1.3, lit 0.85, hatched 1.05; at night 0.10; underground 0.02 (own)
    occlusion: { radiusM: number; strength: number };               // ambient occlusion from the surface: 6 m, 0.5 (own)
    bounce: { radiusM: number; share: number };                     // the indirect spill: 4 m, 0.15 (own)
    exposure: { nightLux: number };                                 // E_key at night and underground: 2 lx drawn at the albedo's full value (own); by day E_key is derived, (c)
    defaultLight?: 'day'|'night'|'time';                            // the `light` key a viewer takes when this sheet becomes its drawn style, (e): `night` in the `night` preset; absent in every other shipped sheet
    vector: { projected: 'drop'|'prism'; penumbraPx: number } }     // rung 3's look, and `hatched`'s own at every rung
  type SunSpec = { mode: 'cursor'|'fixed'|'path' /* the family's default */; admits: ('cursor'|'fixed'|'path')[] /* the modes a viewer's `sunMode` may choose, (d): all three by default; a parity preset only its own */; azimuthCdeg: number; altitudeCdeg: number /* the fixed sun: 31 500, 4 500 */;
    heightRatio: number /* h₀ of the cursor sun: 1 */; discCdeg: number /* the apparent radius: 27 */; colour: Color; intensityLux: number /* 100 000 */;
    latitudeDeg: number /* path mode; the view's default is the latitude in force — the recipe's `Intent.latitudeDeg` (g item 102; DR29), else 50 — while the model-side sampler reads the recipe's latitude itself (§4.5) (file f items 296, 391) */ };
  type MoonSpec = { colour: Color; intensityLux: number /* a full moon: 0.25 */; phase: { at: number /* 0 new … 0.5 full … 1 */; factor: number }[] /* interpolated */; discCdeg: number /* 26 */ };
  ```

  (a) **The surface.** The tile worker rasters, beside each tile's base, a **surface layer** from the same marks
  (§8.8): per pixel the surface normal, its height above the tile's datum (the tile's lowest terrain sample) and the
  unlit coverage (below). Its writers: terrain `field` marks (height and normal from the field); roofs as surfaces from
  the roof construction of §8.6 — eave, ridge and the construction's own faces, never the straight skeleton directly, so
  §3.8's readers stay three (J-A28.32); flat roofs, walls, towers and gatehouses as the tops of their prisms (a wall
  run's top as §2.7's laws give it, law 1 (7); its worked example *the cap* in *beneath*);
  bridge and pier decks at `deckCm`; tree crowns as domes to their crown height (the top-down view never shows the
  ground beneath a crown); water at its level; a building under Works at its stage heights (`heightsAt`, §4.11; item
  67); a retaining wall as the top of its prism at its high side's level (its step from `stepProfile`, §2.7); raised-way
  piers as prisms; on the underground layer each floor, its walls and its ceiling. **The slab list** holds what a single
  height per pixel cannot — a caster whose covered ground the view draws: a sky island, under every occlusion mode, as
  its underside's tiers (V05 §3.9), each a slab (M6-sky; file f item 415), the span marks of a building over a passage
  (§8.5 (2); their `baseCm` column the underside), a bridge or pier deck over drawn water and a raised way's deck over
  the ground (its soffit the underside; item 110 (b)) — each a **slab** of the document's slab list (§8.8): its
  outline, its top and its underside, so the ground beneath is shaded from above and lit from the side, and an island's
  shadow falls from its underside (J-A68.83).
  (b) **The sources.** The **global light** — the sun by day, the moon at night (`LightingSpec.sun`, `.moon`); the
  **placed lights** — `LightSource` records (§2.7), placed by §4.7's light table or by hand (`placeLight`, §7.1), each a
  `light` mark (§8.1) with its height, intensity (cd), radius, colour and flicker; the **derived lights**, never
  records (J-A68.72) — lit windows (`live.windows`, §8.2's live layers, by §10.3's rule at the view's hour and week), the
  room lights of the plan rung (building band, §8.5), and **light shafts** (II.7.3, II.7.5, II.7.6: every access,
  grate, well or opening that breaks the surface, a downward source at its underground end whose intensity is the
  current global light's × the opening's `areaM2` × its `lightTransmission` (V04's `UnderLayoutRule.openings`) × its
  direct-light visibility — the ground pass's shadow term at its `ground.at` under the current sun, every caster
  included, a sky island's slabs among them (V05 §5.3 (1)) — plus its sky-ambient share, a cosine lobe whose radius is
  its depth plus 4 m (M6-U; file f item 414: the render's shadow term only, never item 102's model share)); finally the
  **hand lantern** — the viewer's own light (`handLantern`, underground only, off by default: a 20 cd source 1.5 m above
  the pointer's floor point, radius 6 m), never a record. Every light lights only where its host draws (§8.1 item 7).
  (c) **Brightness.** At a pixel with albedo `A` (the base raster's colour in linear light), normal `n` and height `z`:
  L = A ⊙ (a · (1 − O) · E_g · c_g + Σ_s E_s · V_s · c_s + β · Spill) ÷ E_key. The sum runs over the global light —
  E = its intensity × max(0, n · l), no fall-off, since it stands for the sky's sun or moon — and over every point light
  whose radius reaches the pixel — E = I_s · max(0, n · l_s) ÷ d_s² × f(d_s ÷ r_s), the inverse-square law with the
  smooth cutoff f(x) = (max(0, 1 − x⁴))², so a light fades with distance and ends at its radius (the owner's "optimal
  distances and gradients of effectiveness"); `c` gives each source's colour; `a` the family's ambient share for day, night
  or underground; `O` the ambient occlusion — the mean over eight directions of the sine of the surface's horizon angle
  within `occlusion.radiusM`, × `occlusion.strength` (narrow alleys, courts and the foot of tall walls receive less sky);
  `Spill` = max(0, B(D) − D), D the pixel's direct sum (the Σ term) and B its blur over `bounce.radiusM` (three box
  passes, margin included), weighted by `bounce.share` — the indirect light that "also helps to illuminate": light
  bounced from lit surroundings into a darker pixel, nothing on uniformly lit ground and never a darkening; `E_key` by day
  is the illuminance of an unshadowed level surface under the fixed sun at its drawn altitude α_f (45° in the sheet, set
  by the week under *Sun*) — E_g · (a + sin α_f), exactly, since such ground takes neither spill nor occlusion — so open
  level ground shows exactly its albedo in every week and §8.2's palette targets hold on the lit map, a shadow there
  keeping a ÷ (a + sin α_f) of it before the spill's lift (at 45°: ≈ 0.65 in `ink`, the ink family's shadow alpha 0.35;
  ≈ 0.55 in `lit`; `docs/validation/bench/amendc_repair_rendering_r1_light.out` (C)), a surface near
  the cursor sun reading a little brighter; at night and underground `E_key` is
  `exposure.nightLux`. In a `mono` family the bracket's colour is replaced by its luminance
  (Rec. 709 weights), so light moves value and never hue. The result is encoded back to sRGB and clamped.
  **Visibility** `V_s` is found along the ray from the pixel toward the source, over the surface layer's heights and the
  slab list, the ray's height rising linearly from `z` to the source's height with slope m: V_s = clamp(min over the ray
  of (z_ray − h) ÷ (t · σ_s), 0, 1), with `t` the ground distance along the ray and `σ_s` the source's apparent size as a
  slope (the sun's or moon's disc; a flame's radius ÷ its distance). **The traversal** — one law, used alike by the CPU
  reference, the GPU pass and the light map's bake (J-A68.83) — takes that minimum over the surface as a field of
  constant-height texels, read through the **max-height pyramid** each surface layer carries and, beyond the view's first
  ring, the **ring blocks** (§8.8; each height raised by its datum, so every cell compares in one frame). A cell the ray
  crosses over [t_a, t_b] whose greatest height
  h_max lies above `z` bounds every value inside it from below by (z + t_a · m − h_max) ÷ (t_a · σ_s); the cell is
  **resolved** — that bound taken as its value — at level 0, where the bound is the texel's exact minimum, or at the
  **resolution floor** ℓ(t_a) = max(0, ⌊log₂(4 · t_a ÷ S)⌋), S the tile side (§8.8's world-aligned tiles at the stop and
  DPR drawn; for the point lights one level more on every host once §12.7's pre-decided bake fallback is taken), and is
  otherwise divided into its four cells. So a caster within half a tile side of the pixel is resolved to its texel and one
  at distance t to a **floor cell** of side at most t ÷ 128, its shadow lengthened by at most that cell's diagonal —
  √2 × its side (≤ t ÷ 90), the chord a ray crossing it corner to corner runs — and never shortened, the same length at
  every stop to within it. Evaluated front to back from the pixel, a cell whose bound
  cannot lower the minimum found so far is skipped whole, and the traversal ends at V_s = 0; neither changes the value,
  since no cell's bound exceeds its four cells'; the result is therefore the law's, whatever the order of evaluation, and
  every caster the ray crosses is met, however narrow (`docs/validation/bench/amendc_repair_rendering_r2_traversal.out` (2): one
  unbroken shadow behind towers 2, 6 and 12 m wide under a 15° sun). The ray runs to the **window** R: for a point light
  its ground distance from the pixel; for the global light the distance past which the ray clears the highest surface the
  document holds by t · σ_s, so no penumbra is cut — R = (Z − z) ÷ (m − σ_s), Z − z being the display list's
  `surfaceLayerTopCm` (§8.1) less the pixel's elevation, with m = max(tan altitude, ⅛) for the fixed and path suns (*Sun*'s cap
  of a shadow at 8 × its caster's height, below) and, for the cursor sun, m = (H − z) ÷ |P − G| toward its ground point
  G, R there at most |P − G| and |P − G| itself where m ≤ σ_s (P the pixel's ground point); the ray also ends where it
  leaves the list's `bounds` (§8.1), beyond which nothing is drawn. The window is a world distance, so a shadow crosses every tile
  line at its similar-triangles length and never depends on the tile grid (receipt (1): the start within 1 px of the
  similar-triangles point on every grid offset, the floor adding at most its cell's diagonal — 1.33 × its side under a
  15° diagonal sun, `amendc_verify_rendering_r2_diag.out`). Each slab whose shadow sweep — its outline swept away from
  the sun from (underside − z) ÷ m to (top − z) ÷ (m − σ_s) — crosses the ray's plan is tested exactly by its outline
  over that reach, whatever R is, and a tile culls the slabs whose sweep's bounding box misses it (V05 §5.3 (2); file f
  item 416). R, the floor and the resolved cells depend on the source, the pixel and the surface
  only — never on the device, the rung, the frame time or the view's extent, and never on where a cell is held (a visible
  tile's pyramid, a first-ring position's or a ring block, §8.8), since each is held from a level at or below the floor
  it serves and every level is a greatest height by one rule (`amendc_repair_rendering_r3_blocks.out` (1): 0 of 672
  pixels differ from the law over a pyramid held whole, a 3 000 m hill under a 7° sun among them) — so the CPU reference
  and the GPU pass resolve the same cells and differ only by the GPU's arithmetic and the encoding of the surface, its
  pyramids and the blocks, which §13.4's tolerance bounds; §12.5 and §12.7 cost this traversal. So a
  **shadow is one source's absence** and a gradient, never one shade: its edge softens with the source's size and
  distance; a spot every side of which other lights reach has no shadow; the spill lifts a shadow from its lit surroundings, a narrow one most. And it is
  **height-aware** (the owner's point 4): a tall caster's shadow falls on a lower roof wherever the ray from that roof
  passes below the caster's top — shortened there by that roof's height — and continues beyond it onto open ground or the
  neighbouring building; a lower caster's shadow never climbs a taller neighbour, whose roof's rays pass above it; the shadow's
  length follows the source's height and distance.
  (d) **The cursor sun** (`SunSpec.mode 'cursor'`, the default; the owner: "the cursor moves the global light which
  creates different angles for every shadow"). With `V` the view centre on the ground, `D` the view's half-diagonal in
  metres, `C` the pointer's ground point, u = C − V and s = `sunHeight` (≥ 1; default 1), the sun stands at
  G = V + s · u, height H = max(h₀ · D · s, 1.5 × the list's `surfaceTopCm` above the view's ground whenever the sky layer
  is drawn — visible, or Sky the view's working layer — and the document holds an island that is not fallen, whatever is
  in view) (h₀ = `sun.heightRatio`; the
  floor V05 §5.3 (4), M6-sky). At s = 1 it stands over the pointer, and every caster's
  shadow falls straight away from it; a caster of height h at horizontal distance d from G throws its tip to
  d · h ÷ (H − h) beyond it (similar triangles), capped where the view ends when h ≥ H. As `sunHeight` rises the sun
  recedes along the line from `V` through `C` and rises in proportion, so the shadows turn from radial toward parallel,
  the pointer then setting the sun's bearing (from the view centre toward the pointer) and its elevation
  (atan(h₀ · D ÷ |u|)) — "very high: nearly parallel, realistic; lower: dramatic and radial". **Which sun draws** (one
  rule; J-A68.84): the sheet's `SunSpec.mode` is the family's default and `SunSpec.admits` the modes it offers — a parity
  preset admits only its own, the `FTG` preset `fixed` and `path`; the per-viewer `sunMode` (§2.9) chooses among the
  admitted modes, and a value the sheet does not admit (the key's `cursor` default under the `FTG` preset) draws the
  sheet's `SunSpec.mode`; a drawn `cursor` sun where there is no pointer — the first map, a touch screen, every export, a
  still, a headless render — or on rung 3 is `fixed` (`SunSpec`'s fixed sun). The pointer is a transient input,
  never stored, logged or hashed (§6.2). Because H scales with the view, a zoom changes the on-screen shadow lengths of
  the radial sun; the lengths of the fixed and path suns never depend on zoom (J-A68.84). The **moon** follows the same
  geometry at the night view's intensity and colour, its intensity × the `phase` row's factor at the phase of the drawn
  week and the `time` key's day on a 29.53-day cycle from week 0 (our stylisation).
  (e) **Day and night.** The per-viewer key `light` (§2.9): `day` (the default) — the sun; `night` — the moon and every
  point light, the scene dark but for them; `time` — day or night by the path sun's altitude at the `time` key, night
  below −6°, the two blended over −6° to +6°. A sheet may carry `LightingSpec.defaultLight`: when that sheet becomes a
  viewer's drawn style — chosen as its `stylePreset` (§11.3), or the document's own style opened by a viewer whose view
  state holds no `light` value — the viewer's `light` key is set to it, a view change like any other that the viewer can
  change back; so the `night` preset opens at night and §2.9's `day` default stands everywhere else. By day point lights contribute nothing on the ground and sky layers (a lamp
  post stays a symbol). **Underground there is no global light at any setting** — the ambient is `ambient.underground`
  (near zero) and every lux comes from the point lights, the shafts and the hand lantern, dense in the undercity and
  around the dwellings below ground by the light table's underground rows (§4.7; II.7.3, II.7.5). How much light a night has is not a style value: it
  is the light table's rows (§4.7) with the era, `magic` and prosperity rows, so rich streets and magical districts are
  lit and poor alleys and hidden courts stay dark.
  (f) **The light pass** — one function with two implementations (J-A68.82). It is a **post operation over the base**
  (slots 1–20 of §8.2's order; what it never lights is §8.2's layer-order rule), so the label floor holds at night
  (§9.4): the tile worker composes labels and `overlay` marks into the tile's
  one bitmap (J-R21) and writes their pixels' coverage into the surface layer's unlit coverage, and the
  pass leaves a covered pixel at its composed colour (lit ⊕ composed, weighted by that coverage). **§8.2's post operations
  run after the light** wherever it runs (J-A68.87): on rungs 1–2 the tile worker leaves them off the base it rasters and
  the GPU pass applies them to the lit base after the global term and the baked light; an export or still applies them
  after its CPU reference pass, band by band, before its labels are composed (§8.8); on rung 3, and under a sheet with no
  light, the tile worker applies them to the base after its marks. On every path they act on the base picture alone — a
  covered pixel keeps its composed colour — and a **cell operation** (`pixelate`, `dotScreen`) takes its cells on each
  tile's own grid from the tile's corner (a partial cell at its far edges where the cell does not divide the tile) and
  averages only the base in each, every pixel weighted by 1 − its unlit coverage — the tile worker and the CPU reference
  taking the coverage of the labels and overlays they will compose, the GPU the coverage the surface layer carries — and
  puts that average into the cell's uncovered share alone (J-A68.91); so a coloured light never re-colours a greyscale,
  sepia or tinted base, and a view agrees with a CPU-reference export of the same frame. The **CPU reference**
  runs in the tile worker for every export and still, the goldens and the tests, in float64 with its transcendentals
  through `dmath`, every sum in a fixed order — byte-identical on the five engines (§6.5 (9); J-A68.62). The **GPU pass**
  (WebGL2, WebGPU where available) is the main-thread compositor's (§8.9) for the interactive view and is held to
  the reference by §13.4's tolerance. The static lights and the occlusion are **baked** per tile into a **light map**
  (the Σ over point lights of their terms with their visibility, and `O`) by the tile worker, once per **light-map key**
  (§8.8), so a view switch or an edit that changes the surface a light's traversal reads or the lights that draw (§8.1
  item 7) re-bakes it — a light entering a tile's bake only when its
  radius reaches the tile, its traversal reading the surface of the tile dilated by that radius — so thousands of torches
  cost only what is on screen. Per frame the global light's term — and, underground with `handLantern` on, the hand
  lantern's, a point light by (c)'s law and traversal over the pixels within its radius (J-A68.92) — is evaluated on the
  GPU over the visible tiles' surface layers and pyramids, assembled into one view texture with the first ring's
  positions and the ring blocks round them that the global light's window reaches (§8.8), so a shadow crosses tile edges
  seamlessly; an export or still, which has no pointer, draws no lantern, and the CPU reference evaluates the lantern
  only at a pointer point a test supplies, by (c)'s law and traversal, as it evaluates the cursor sun for §13.4's
  stills (§8.3's hand-lantern row; J-A68.92). A fire light's **flicker**
  scales its baked term in the view by a pure function of its render key and the view's time (J-A68.61); the CPU
  reference draws it at its mean. A tile an island's drawn land face touches carries a second base and surface layer for
  the sky, lit by the same law at the island's true position and composed by the occlusion mode; a tile no island's land
  touches is re-lit where an island's shadow falls (V05 §5.3 (2); M6-sky).
  (g) **The fallback ladder** (F-LIGHT, §5.2; J-A68.85). Rung 1 — the GPU pass at the tile DPR; rung 2 — the GPU pass with
  the global term at half resolution, upsampled by the surface layer's normals and heights; rung 3 — the **vector rung**:
  projected shadows (§8.2's `shadowPass` program, `drop` or `prism` by `vector.projected`, `vector.penumbraPx`) from the fixed or path sun, the family's
  night role variants (`@night`, §8.2) with a `glow` sprite at each light mark, and the light step (below) for
  `faceLight`, the two-tone roof, `hillshade` and the crowns. A tier's rung is chosen at app start from §8.8's canvas
  budget and the measured frame time (§12.5), lowered at run time on a lost GPU context or three consecutive frames over
  the pass's budget and, under Auto, moved down and up by §8.8's Auto loop in the order below — otherwise never raised
  mid-session, and a rung a lost GPU context lowered never in the session; every change is counted in the view
  telemetry, never an error and never a model change; these are F-LIGHT's triggers (§5.2 cites them). **What Auto gives
  up, in order (g item 121 (e); J134).** The frame rate is protected first (§12.5's frame budgets): Auto's loop gives
  up, one rung at a time, the weather effects (item 124 (f); (i) below), then lighting detail — full precision to the
  standard surface (below), then rung 1's full-resolution global term to rung 2's —, then sharpness (the tile DPR's
  steps down to DPR 1, §8.8), then the light pass (rung 3), then the tile DPR's last two steps (0.75, then 0.5), and
  takes them back in reverse; §8.8's fitting of the canvas need follows this order too. **On a tier that holds full
  precision** — one whose GPU pass misses §13.4's tolerance on the standard surface (below), the only tiers that hold
  it — the standard surface is no lawful rung: Auto's loop, a manual level and §8.8's fitting pass over that step as
  over a step that frees nothing, lighting detail going from rung 1 to rung 2's half-resolution global term at full
  precision, then sharpness and the light pass as above, so no lit frame outside §13.4's tolerance is drawn on any tier
  (T-ER-26). Labels, text, the chrome and every
  overlay (Find's halo, the handles, `live.ghost`) are drawn at the device's full pixel ratio at every rung (§8.8's
  split composition): only the painted tiles soften. **A tier whose GPU pass misses §13.4's tolerance** at its milestone transfers its surface layers at full
  precision — the height and the octahedral normal's two components in float32 with the unlit coverage byte beside them,
  13 B per pixel (3.25 MB per position at 512² instead of 1 MB) — and its pyramids, its first ring's heights and its ring
  blocks in 16 bits: whole centimetres above each one's datum, rounded up, 2 B per cell, the step widening to
  ⌈range ÷ 65 535⌉ cm only where one's range passes 655.35 m (§8.8 counts them in Q_f). The GPU then reads every height
  the reference reads to within one step — 1 cm wherever a range stays under 655.35 m — whereas one byte's square-root
  step, ≈ 0.67 m at 45 m, would move a far caster's shadow tip by that step × cot(altitude) (≈ 10 px at the 1:500 stop
  under the fixed sun). The traversal is unchanged, since the reference resolves the same cells ((c)); the tier is
  re-measured and, still missing, draws rung 3 (J-A68.85). Every export and still takes the CPU reference; an SVG draws rung 3's vector shadows, or with the export
  option `lighting: 'raster'` one embedded raster lighting layer from the CPU reference (§11.1). The `hatched` family
  draws rung 3 at every rung — its look is the prism pass of NG 1.2.2, below — while its night lights still come from the
  light marks.
  (h) **The parity presets and the families** (item 23; J-A23.71). `MFCG` — `model: 'none'`: the raised under-copy only
  (K06, above), no cast shadow, no night view and no light — our preset's behaviour, with no claim about the reference's
  (J-A68.86); `FTG` — the fixed or path sun and a low-intensity moon on the same path at night, one ambient term and the
  directional term only, and with it every shadow present only under `clear` or `snow` weather, and one window light
  at each lit building's main entrance (the anchor at which the FTG client as captured on 25 September 2026 draws its
  night lights, item 50; provenance `ref:FTG client (captured 25 September 2026) ambient-and-directional light (code)`, P22); `hatched` — the
  prism pass of NG 1.2.2, which offsets one shadow per wing by height against the light, shadows trees and pins the same
  way and multiplies them at the sheet's alpha, and at night an ambience wash with a glow per lit building (`ref:NG 1.2.2 prism shadow and night glow (code)`, P23); the stage-3 building band under the parity presets — the
  per-facet diffuse-and-specular shading from one light, with a swept-silhouette shadow, as Fantasy Manor build 890 draws it
  (`ref:FM build 890 facet shading (code)`, P24). No constant of
  those readings enters a cell. Every default row of ours — the field model, the cursor sun, the moon, the point lights,
  the ambient, occlusion and spill terms, item 117's season rows and sun through the year (§8.2, *Sun* below), item 118's
  decorations (`live.festival`), item 122's crisis looks (`live.crises`), item 124's weather effects (§8.2, §8.4 (i)) and §8.10's
  boats — carries the `extension` marker, so the parity presets switch it off: a parity preset draws the map as drawn,
  under its sheet's sun, in every week. Find (item 120) is a tool's overlay, not a look, and draws under every preset.
  (i) **The weather effects' light terms (g item 124 (b), (d); J137).** The spell in force (§2.9's *Weather effects*) —
  its kind, its strength s in [0, 1] by its phase (rising from 0 and back to 0, each over its kind's fade, s moving by
  1 ÷ that fade a second: 5 s for a shower (`rain`, `drizzle`), `snow` and `leaves`, 60 s for `fog`, `mist`, `dust`
  (dust haze), `cloudShadow` (cloud cover) and `shimmer` (heat shimmer) — each kind's `lengthS` lower end in V11
  §3.25.11 at least twice it; §6.1's press reads the same fade) — enters the per-frame terms above,
  never a tile, a light map or a cached layer (§8.8). **A shower** (`rain`, `drizzle`) multiplies the global light's direct
  term by 1 − s/2 and the drawn sun's disc radius by 1 + 3s, so the shadows dim and soften and then return. **Fog** —
  and `mist` at half its strength — multiplies the direct term by 1 − 0.6s and the disc radius by 1 + 4s, fades the lit
  picture toward the `fog` role by 0.45 s × smoothstep(0.25, 1, r ÷ R) (r a pixel's distance from the view's centre, R
  the half-diagonal: the map fading with depth) and at night gives every drawn `LightSource` (§8.1 item 7) a soft halo —
  the baked point-light term spread by a separable Gaussian of σ = 6 CSS px and added at 0.35 s. **Dust haze** fades as fog
  does, toward `sand` at half fog's weight, with no halo. **Cloud shadows** multiply the direct term by 1 − 0.3 s × c(x, t),
  c a two-octave value noise over 400 m world cells drifting with the spell's wind. **Heat shimmer** (by day only) offsets
  the base's sampling by at most 0.5 CSS px × s along a moving noise. Each is weighted per pixel as §8.8's effects layer
  is, so no label, halo or overlay is dimmed, faded or moved; while the underground layer is drawn none applies (§8.8's
  effects layer; (e)). **On the vector rung** a spell is a wash and the halos only:
  fog, mist and dust a full-view wash of their role at 0.3 s with the same fade from the centre, a shower or cloud cover an
  ink wash at α 0.08 s (× c for cloud cover), and at night each light mark's `glow` sprite drawn at 1.5 × its radius, its
  alpha × (1 + s). No term changes the light faster than its fade allows — the view's mean relative luminance moves by at
  most 10 % in any second, with no flash and no lightning (photosensitivity; T124-7) — and none reaches a model value
  (item 102's daylight keeps its fixed days and hours) or an export, which takes the CPU reference without effects
  (§11.1). On a lost GPU context the terms take the vector rung's form.
* **Shadow casters** (WC5; the surface layer's and the slab list's writers on rungs 1–2, projected on rung 3): buildings and wings (prism from `baseCm` to eave and ridge, a wing's foundation skirt, §2.6,
  included; a building over a passage also casts its span marks, §8.5 (2) — each a prism from its wing's `baseCm`
  plus the passage's `headroomCm` to that wing's eave over its span ring, projected from its underside like a bridge
  deck), towers and gatehouses (prism), curtain walls (prism of the band up to each run's top as §2.7's laws give it,
  law 1 (7); its worked example *the cap* in *beneath*), bridges and piers (deck prism over water),
  trees (crown offset by the crown height), sky layers (each island's underside tiers projected from their undersides,
  at rung 3 in the `prism` form whatever `vector.projected` says, V05 §5.3 (3)), retaining walls (a prism from the low
  side's ground to the high side's level, casting onto the low side only), raised ways (piers as prisms; the deck a slab
  projected from its soffit, like a bridge deck), a stepped building's tiers (each tier from its own base — the top of
  the tier below — so each casts its own shadow, onto the tier below and beyond; item 110 (c)); a building under
  Works casts at its stage heights (§4.11). On rung 3 every caster projects along the sun vector from its base elevation
  (`baseCm`, FTG-13) onto the ground; the ground under a footprint lies within FTG-13's plinth tolerance, so a flat
  projection from the base is exact to that tolerance — the height-aware receivers of (c) are rungs 1–2's. Rung 3's
  shadows are unioned per layer and composited once per layer per tile — into the base raster in `fixed` sun mode, into
  a per-tile shadow layer of their own in `path` mode where the tier's canvas budget admits it (§8.8), so a moving sun
  re-rasters only shadows. `drop` offsets each caster's footprint by height × cot(altitude) along the sun's azimuth;
  `prism` draws the swept prism; both from the same heights.
* **Sun (K05).** `SunSpec` (above; which mode draws is (d)'s rule): the `fixed` sun (light from the upper left); in
  `path` mode from `sunPath(latitudeDeg, dayOfYear, hour)` (solar declination and hour angle with `dmath`), driven by the
  view-state time (§2.9's `time` key; the simulation module's clock when it runs), the hemisphere following the latitude's
  sign. The same `sunPath` is the model's daylight sampler (§4.5 *Fields*, g item 102 (a)), evaluated at the site latitude
  on the model's fixed hours and never at the view's time, latitude or sun mode, so no view setting moves a model value
  (g item 102; file f item 296). Projected shadows
  read the path-mode sun quantised to 1° in azimuth and altitude (§8.8, N-8); every other program that reads the sun —
  `faceLight`, the two-tone `roof`, `hillshade`, the `lit` crown bake (§8.2, §8.10) — reads its **light step**, the
  path-mode sun quantised to 15° of azimuth and 5° of altitude — on rung 3 (on rungs 1–2, §8.2's *Paint programs*).
  Below −6° the view is night by (e). Shadow length is
  capped at 8 × height near sunrise and sunset for the fixed and path suns. Rung 3's shadows are vector with no
  shadow-resolution setting; rungs 1–2's are resolved by (c)'s traversal at the surface layer's resolution, to its floor
  cell beyond half a tile side (§8.8). **The sun through the year (g item 117 (g)).** The view sun's default height
  follows the year position w (§2.9's `yearWeek`) by δ(w) = 23.44° × sin(2π (w − 6) ÷ 52) — 0 at weeks 6 and 32,
  +23.44° at midsummer (19), −23.44° at midwinter (45): the fixed sun stands at `altitudeCdeg` + δ(w) (45° in every
  shipped sheet: 68.4° at midsummer, 21.6° at midwinter), clamped to [atan ⅛ ≈ 7.1°, 89°] — the altitude at which the
  8 × shadow cap above starts — so the drawn sun stays above the horizon in every week of any sheet; the cursor sun's h₀ is
  `heightRatio` × tan(that clamped altitude) ÷ tan(max(`altitudeCdeg`, 7.1°)), so its shadows lengthen in winter in the
  same proportion. The sheet loader clamps a `SunSpec.altitudeCdeg` outside (0°, 90°) into [7.1°, 89°] and reports it
  (a sheet is data: saved, edited or a preset's). The path sun reads `dayOfYear` = 80 +
  7 (w − 6) + d (mod 365), d the `time` key's day of the week — week 6 opening at the March equinox, half a year later
  (+ 182) for a negative latitude, so summer is high in either hemisphere. It is the view's light only — item 102's model
  daylight keeps its fixed days and hours (§4.5), so no week moves a model value — and without item 117's season rows
  (V11's off form) the sun keeps the sheet's values.
* **Budget (AM-3; rung 3).** Projected shadows cost ≤ 20 % of a tile's raster time (vector offsets, one union per layer;
  `penumbraPx` is two vector rings, not a blur). **Measurement:** M2b times it on METROPOLIS tiles with `prism` shadows.
  **Pre-decided fallback:** a rung that misses draws `drop` instead of `prism` (same heights, one offset polygon per
  caster), reported. **A moving sun (N-8):** in `path` mode one 1° step re-rasters and re-composes the visible tiles'
  shadow layers — ≤ 20 % of the view's settle raster plus ≈ 0.2 ms per tile, inside §12.5's settle budget — and a newer
  step cancels an older one's pending tiles (latest wins); on a tier with no room for shadow layers the step re-rasters
  the base tiles within the same settle budget. **Measurement:** M2b times steps on METROPOLIS views, one step per frame,
  on the reference and low-end devices. **Pre-decided fallback:** a tier whose step misses quantises the path sun to 3°
  instead of 1°, reported.
* **Light steps (rung 3).** When the path sun enters a new light step, a **light-step pass** bakes the `lit` crown sprites for it
  (§8.10), then re-rasters the visible tiles' `under` and `over` layers (or `base` on a tier without shadow layers) at
  that step, centre-out like a settle and within §12.5's settle bound, each tile swapped in when ready. A light-step pass is
  never cancelled by a newer light step: the newest waits and starts its own pass when the running one completes,
  skipping steps between, so the view reaches one light step within two settles; 1° shadow steps go on beside it (latest
  wins). Every raster of the view uses its **drawn light step** — the running pass's, or the last completed pass's —
  passed to each raster job as `TileRasterOpts.lightStep` (§8.9), so a tile exposed during a pass is rastered at the
  pass's step. Once a pass completes no tile keeps another light step, and tiers with and without shadow layers draw the
  same roof and crown tones (§8.3's light-step row). **Measurement (M2b, the moving-sun runs):** every light-step pass
  within the settle bound and the crown bake within §12.7's budget. **Pre-decided fallback:** in `path` mode `faceLight`, the
  two-tone roofs, `hillshade` and the crowns hold the sheet's fixed sun — only shadows follow the path — reported (J-R54).
* **Heights** are §2.6's (at a Works stage §4.11's stage heights), so the surface layer, the shadows, glTF and CityJSON
  agree (O17 g).
=== END ===

=== REPLACE ### 8.11 Edges and combinations (principle (11)) ===
### 8.11 Edges and combinations (principle (11))

Every outcome below is on §5's ladder (check, repair locally, retry that piece, simpler shape, substitute, leave out and
report — never a whole-map retry); the tests are census rows of §8.3's kind, registered by id in §13.2.

| id | mechanism at its limit | defined outcome and rung | test |
|---|---|---|---|
| T-ER-01 | the display list at the cap (§8.1): 35 000 buildings, the city band's marks, a METROPOLIS-cap export list (≈ 67 MB, §12.8) | sized by §8.1 item 6's per-mark figures; handles are 32-bit (never reached); a list over the tile worker's line takes R12-25's steps — check, then substitute (a configuration), reported | B-CITY at the cap: every band's list within item 6's figures + 25 %; 0 allocation failures |
| T-ER-02 | degenerate geometry at render time (§8.1–§8.3): S14 reads only committed kernel geometry, which holds none (§3.1; §5.1's general rule); an artefact that degenerates in a tile — a roof facet under 1 px, an inverted offset ring, a chain clipped to a point, a zero-length stair interval, a hatch over a zero-width facet | that draw is left out of the tile's sequence and counted in the census; a point symbol keeps its `minPx` (the 2-px floor); never an error — leave out and report | a fixture with a 1-cm roof sliver, a zero-length stair interval and a chain clipped to a point on a tile edge: every tile rasters, the counts reported, 0 errors, the seam rows of §8.3 pass |
| T-ER-03 | degenerate casters and slabs (§8.4): zero height, zero area, a slab whose top equals its underside, m ≤ σ_s | nothing cast; the slab dropped from the slab list; m ≤ σ_s is (c)'s stated window — leave out and report | CPU reference and GPU pass on the fixture: 0 shadow pixels from the degenerate casters; the rest equal to the render without them |
| T-ER-04 | the light's lifecycle (§8.4, §8.8, §8.9): save, load, undo, redo, regenerate, migrate | nothing of the light pass persists: its view keys persist with the view state (§2.9); surface layers, light maps, blocks, sprites and worker queues are caches keyed by §8.8's keys, rebuilt from the display list; a `LightSource`'s lifecycle is §2.7's and §7.4's | a lit CITY view saved and reloaded, an edit undone and redone, a scoped regeneration and a migrated document: every lit tile equal to a fresh render of that state |
| T-ER-05 | the city band's closing (§8.5 (2)) on a mass thinner than 2r, or a block with no footprint | the footprints stay unmerged; a mass under (2 px)² is a settlement dot; an empty block draws its `ground` — simpler shape | B-CITY-lite seeds with sub-pixel blocks: 0 masses closed across a drawn way, every structure a mass or a dot |
| T-ER-06 | the close-up and stage 3 at every rung (§8.6), THORP to the cap | every rung with a district opens its close-up at the neighbourhood band (a village rung its one district, §8.5's first map); a composition that fails the stage-3 contract draws the outline (§2.6; F-SKELETON's plain downgrade) — substitute, reported | THORP, HAMLET, VILLAGE, TOWN, CITY, METROPOLIS fixtures opened at every band: every band draws; a forced contract failure draws the outline |
| T-ER-07 | an export with nothing to draw (§8.7): a frame over empty ground or beyond `bounds` | the paper, the furniture and the empty layer groups are written, the report saying so — never an error | each picture format over an empty frame: a valid file, the report line present |
| T-ER-08 | the pyramid at every rung (§8.8): stops and band entry are scales, the same at every rung; each map's zoom-out limit k_min (g item 116); an empty tile is paper; `bounds` grown by an epoch or a hand edit; a resized viewport; a `bounds` that fits at stop 34; limit bounds wider than the short side at stop 0 (J122); a crisis look widening the limit bounds to town and camps (g item 122 (i)) | every rung draws every stop from its limit inward (k_min … 34) and no stop beyond it is reachable; the first view unchanged; k_min moves with the limit bounds and the viewport; k_fit capped at 34; where no stop fits, k_fit and k_min are 0, the view at stop 0 showing as much of the limit bounds as fits, centred, the view status saying so; while a look stands the limit, the opening view and Fit take town and camps (the ring's arcs among them), restored when none stands, a view the user moved never re-framed; a view at the limit shows paper beyond the limit bounds | each rung from THORP to the cap swept from stop 34 outward until the zoom stops: it stops at k_min, where the whole `bounds`, or stop 0 where it does not fit, fits the short side, less the margin; the METROPOLIS cap at 1 280 × 720 CSS px and at the medium class's minimum, 600 × 480: k_min = 0, the view centred on the town, V09's `info.zoom.coarsest` shown; 0 tiles rastered or cached coarser; 0 pops beyond B-ZOOM's bar, 0 errors; the first view's stop the framing rule's; after a hand edit growing `bounds`, the new k_min; a siege fixture whose camps and ring arcs lie beyond `bounds`: the limit, the opening view and Fit contain every camp while the look stands and return to `bounds` after it, a moved view left as it was |
| T-ER-09 | instances at their limits (§8.10), at every rung THORP to the cap: a face smaller than one spacing, a line shorter than one spacing, an override whose point left its host | zero instances (a valid set); the override orphaned and reported (J-R24) | fixtures of each at every rung from THORP to the cap, a village rung's hinterland woods and orchards included: the empty sets drawn as their fill; the orphan reported |
| T-ER-10 | light × every physical feature (§8.4), at every rung each exists: cliffs and steep ground (the terrain field's heights and normals), rivers, coasts and moats (water at its level, no cast shadow; foam by shore class), bridges and raised ways (deck slabs, pier prisms), retaining walls (a step prism, shade on the low side only), deck plots (their buildings at the deck's surface height), squares (ground), an oasis (water at its level, the grove's crowns as domes), the frame's edge (the ray ends at `bounds`), terraced wards (terrain and retaining walls), V02's roofscape and crypts, V03's plans (the building band), V04's caverns, catacombs and voids (no global light: point lights, shafts, the lantern), V05's landfall (its fallen members as ground casters), village rungs (the same law) | one law for all; a feature a stage has not registered draws by its base marks | a fixture holding each feature at each rung where it exists, day and night, on each rung of the ladder: CPU reference = GPU within §13.4's tolerance, every shadow where (c)'s law puts it, 0 errors |
| T-ER-11 | labels × features (§9): cliffs and steep ground (no label effect; the plan view), moats and an oasis (`water` labels), raised ways (way labels along the raised way, as any way), retaining walls (unlabelled; not a protected obstacle), deck plots (their buildings' labels as any), the frame's edge (a candidate whose boxes leave the view's frame is not placed at that stop, rung (7) at the frame), terraced wards (district labels) | §9.2's greedy over the admitted candidates | the same fixture at every stop: 0 collisions, every label inside the frame |
| T-ER-12 | exports × features (§11.1): cliffs and steep ground (glTF's draped terrain, VTT `line_of_sight` cliffs), moats and an oasis (water bodies; `oasis`, `spring`), raised ways, retaining walls and deck plots (file f item 447's properties; §11.1's VTT rule for raised supports), a `vault` span §2.7's laws read `open` and a wall run beneath a raised way (§2.7's laws, law 1 (7), (8)), the hinterland (`LandUse` faces in GeoJSON and CityJSON) | each by its format's row; a span's `use` one reading in GeoJSON's `span` feature, glTF's end walls and CityJSON's `BridgeRoom`, and a run's top one top in glTF, CityJSON and §8.4's surface layer | the same fixture exported in every format at every rung: validators pass, every feature present with its properties; T110-2 (4)'s hand `drawWall` across its standing aqueduct with a `vault` span in its line, exported in every format: that span `open` in GeoJSON's `span` feature, closed by no end walls in glTF and no `BridgeRoom` in CityJSON (§2.7's laws, law 1 (8); its worked example *beneath*), the run beneath the aqueduct at its own top in glTF, CityJSON and §8.4's surface layer (law 1 (7)), and after the hand undo the span `vault`, closed by its end walls and, from M6-U, its arch vault a `BridgeRoom`; and T110-2 (3)'s c14 fixture exported so: each run beneath its S4 viaduct at one top in glTF, CityJSON and §8.4's surface layer, the top §2.7's laws give it (law 1 (7); its worked example *the cap* in *beneath*) |
| T-ER-22 | wall runs in decay and repair (§8.2's wall rows; g item 114) at every rung THORP to the cap (a village palisade's runs included, V07): a run shorter than the minimum feature; a run whose material no `walls.patchMaterials` row names; a whole enceinte `breached`; save, load, undo, redo, regenerate and migrate of a run's condition and material | drawn 2 px long, centred; its wall kind's first row's look, reported; every run a gap with its rubble, the towers and gates standing; the runs persist as §2.7's profiles, a regeneration keeps them (§7.4's row), an undo restores condition and material, a migrated document draws `standing` and robust — never an error | the fixture of §8.3's wall row at every rung: tiles as stated; the reports present; each lifecycle step's tiles equal to a fresh render of its state |
| T-ER-23 | seasons (§8.2, §8.4; g item 117) at every rung THORP to the cap: every week 0–51; a climate band wrapping the year's end; a climate with no ice or snow band; a water mark whose `season` column holds no ice kind; a crown with no `season.leaf` row; a face whose `season` column names no `season.surfaces` row (§8.1 item 8); a document with no season tables; a sheet whose `SunSpec.altitudeCdeg` is 10° or 0°; an `arid` row, or one whose winter does not freeze, with `weather` `snow` (item 124 (c)); a parity preset; save, load, undo, redo, regenerate and migrate | each week's looks by their rows; the band read cyclically; nothing frozen or snowed; that water and that face as drawn; that crown unchanged all year (evergreen); the off form's four named rows; the drawn sun's altitude clamped into [7.1°, 89°] in every week, the loader reporting a sheet it clamped (§8.4's *Sun through the year*); `snow` drawn as `clear`; under a parity preset the map as drawn, under its sheet's sun, in every week (§8.4 (h)); the year position is view state (§2.9) — persisted with the view, in no digest, left as it was by an undo, a redo and a regeneration, kept by a migration — never an error | the season fixture of §8.3 at every rung and every week: tiles as stated, the model digest constant; sheets at 10° and at 0° swept through all 52 weeks: the sun above the horizon and every value finite in every week; the arid and the non-freezing fixtures with `snow` set: 0 snow pixels in every week; a parity-preset fixture: its tiles equal in all 52 weeks; each lifecycle step's tiles equal to a fresh render of its state |
| T-ER-24 | festival decorations (§8.2; g item 118) at every rung THORP to the cap and on a sky island: no traditions and no preview; a window wrapping the year's end; two windows overlapping; a staging place that does not stand, and none of its fallbacks; a place too small for its count; a tradition with no readable week; a festival shown under a parity preset; save, load, undo, redo, regenerate and migrate | nothing drawn, tiles byte-identical; the window read cyclically; both drawn, in window order; the next fallback, then the heart; as many as fit, the rest reported; shown only in preview (DR43); nothing drawn under a parity preset (the `extension` marker, §8.4 (h)); the display and the year position are view state (§2.9) and the schedule the dossier's facts (DR43), so each lifecycle step draws what its state shows — never an error | §8.3's festival fixtures at every rung and on an island fixture: as stated; a parity-preset fixture with a festival shown: its tiles identical, in every week, to the preset's without it; each lifecycle step's tiles equal to a fresh render of its state |
| T-ER-25 | Find (§8.2's *Find*, §8.8, §11.2, §12.5; g item 120) at every rung THORP to the cap, at every band and on Ground, Below and Sky: no chip; a chip with no match; a chip whose target is gone; nine or more chips; a match under 6 px at the city band, at item 116's limit and at the METROPOLIS cap; pins closer than 24 px across two layers or two islands; a match on a layer other than the working layer — that layer drawn or not —, and one Below off the band shown; Show gaps with no kind chip; a player key on the knowledge canary; the halo at every tile DPR and device ratio (item 121); under the weather effects and over a crisis look; every commit, regenerate, undo, redo, advance, load, migration and change of the year position or the drawn week; a scrub to a week before a matched building was built, to a week after a closed use's end, to a week before a matched use closed, and to a week before a building's use changed | nothing drawn, tiles byte-identical; count 0, the chip dark; the same until removed; the colours repeating past eight, each chip told by its glyph (nine, by (k − 1) mod 9) beside its dash; a pin, or a count bubble; bubbles never across layers or islands; a ghost pin, Below with its band's depth range; no gap and no veil drawn (V09 disables the switch); nothing withheld suggested, counted, drawn or hinted at; the halo, pins and labels at the device ratio; the effects under the halo, the looks under the veil; the chips re-evaluated at each, the key `find` and the document unchanged; the drawn frame's listing (§11.2's *At a drawn week*) — counted, glowed, pinned, listed and gapped —: a building matched by its use at that week, never its head use, a use closed since matched and drawn, a chip with none there at count 0, the head's matches back at the head — never an error | Find fixtures at every rung, band and layer: as stated; T120-1, T120-3, T120-4 and T120-5's bars; at the METROPOLIS cap T120-6's budgets; chips 1 and 9 (and 8 and 16) differ in glyph on their pins, in the legend and in V09's panel; the scrub fixture's counts, glows and pins those of the drawn frame's listing, and at the METROPOLIS cap the chips re-evaluated within ≈ 100 ms of each scrubbed frame being drawn, the frame never waiting (R12-35) — the scrub clauses from the later of M5 and V06's E6 (V06 §3.15.2's frames) |
| T-ER-26 | the resolution adjuster (§8.8, §8.4 (g); g item 121) on the reference, the low-end and an ultra-tier device, at every rung: Auto and each manual level; a level above the screen's; a level the device cannot hold; a 5K and an 8K screen; a monitor change mid-gesture, one with the view idle, and one with the view idle within 10 s of a loop step-down; a load at a threshold, and a loop step-down reached while the view is idle under a weather spell; a lost GPU context under Auto; a tier that holds full precision (its GPU pass missing §13.4's tolerance) under Auto and under a manual level it cannot hold; save, load and every export at each level | the fitted step by §8.8's one order; greyed by V09; the nearest step that fits, said (`memory`) — never a refusal; the 4K ceiling's DPR with the text layer at D, on the high tier's 8K the text layer stepped down, said; refitted at once, applied at the settle, with the view idle applied within one frame of the decision, and within 10 s of a loop step-down applied within one frame once 10 s have passed since that step-down; one change, then the lower rung held (60 s, doubling), and the idle step-down applied within one frame of the decision; the light rung lowered and never raised in the session; never the standard surface — lighting detail from rung 1 to rung 2 at full precision, then sharpness, then the vector rung (§8.4 (g)); labels, text, chrome and overlays at D; the setting device state, the document, hash and log unchanged, every export byte-identical — never a crash | a scripted Auto run over §12.5's reference viewports on each device: no change during a gesture, ≤ 1 change per 10 s at the threshold fixture, the p95 within the frame budget (T121-2, T121-3); each manual level honoured or the nearest drawn and said (T121-4); a pixel test of text and chrome at every level (T121-5); exports and the document byte-identical across settings (T121-6); a DPR change re-evaluated, and with the view idle the DPR change and the step-down each applied within one frame of the decision, and a monitor change within 10 s of a step-down within one frame once those 10 s have passed (T121-2, T121-7); on the full-precision tier every lit frame within §13.4's tolerance; native 4K lit at full precision on the ultra tier within 512 MB (T121-8) |
| T-ER-27 | crisis looks (§8.2's *Crisis looks*, §8.8's ring, §10.2; g item 122) at every rung THORP to the cap and on an island town: no condition and no preview; a `none`-row condition carried beside the looks, under View as at `public`, `local` and `secret`; one standing in some weeks; a condition with no `untilWeek`; one whose `untilWeek` is not after its `sinceWeek`; an unmapped source; several crises at once past the density cap; a siege and a refugee camp standing together; a force whose camps exceed the frame and its margin; a siege of a place with no standing town enceinte; an island town with no land beyond its shore; a headcount of 0; the preview without a dossier; Show crises off; a parity preset; a coalition of five armies; a barrier across a way's carriageway (a `barricade` of `blockade`, `raiders` or `rebellion`, a `beast`'s `stakes` where its edge crosses a way, a quarantine's `cordon` across a way entering its quarter); a disaster whose rebuild Works begin on some of its buildings, and a disaster previewed over buildings under Works; Show crises toggled, and View as changed, over a cached district-band tile of a struck district; an unwalled TOWN with an `inside` castle, a walled CITY with an `outside` castle, a twin town with two rings, a walled town with extramural ribbons inside the standoff; the unserved mesa (S3 (9) (a)) with a refugee camp and a quarantine standing; a refugee camp of two heads; a drawn week whose frame is not the head; a click on a building, a plot and a camp mark under a standing look; a `looks` query whose building names a district and whose field names a plot; save, load, undo, redo, regenerate, advance and migrate | tiles byte-identical; the `none`-row condition drawn, legended and counted at no key, each look-bearing condition's look the same at every key (`public`, §7.7's DR44); drawn exactly in its weeks; from `sinceWeek` on; never; nothing (`none`, reported); by priority under the cap, the rest on the ring; every mark carrying its own look's overlay in `entity`, one look's box holding its parts alone; filling the land to the margin, the rest on the ring at the city band, the limit and Fit containing it; `blockade`, no engines; the ring; the severity's scale; the look at `previewSeverity`; nothing; nothing (the `extension` marker); each army told by its colour or its banner's glyph; drawn across the way (the cordon closing the quarter, §10.2 (f)), no other part on a carriageway; each building leaving the look in its Works' start week, the unit's `ruinTone` standing while the look stands over any of its buildings, the preview drawn over every building whatever its Works; the tile redrawn each time; 0 look pixels on a building footprint but the parts §10.2 (d) draws on the buildings themselves (the burned farmsteads among them), the blockade at the castle-only town; each on `campLand`, else on the ring marks, never undefined; placed by the overflow belt by the gate (`approachByGate`'s `h` at least 1, §10.2 (d)), never undefined; placed over that frame (V06 §3.15.2); no crisis mark in the hit stack: the building, the plot, and under a camp what lies beneath it selected; `over` absent on every look, the rest as without them; the looks view-only — each lifecycle step draws what its week, key and DR44 show, the hash unchanged — never an error | crisis fixtures — a siege by a two-army coalition and one by a five-army coalition, a quarantine whose affected quarter ways enter, refugees, a famine, a fire, a flood and an earthquake by their calamities, each with its linked `reconstruction` condition (V08 §3.16 (7) (b)), an occupation, and `raiders` and `rebellion` (each previewed at every rung) beside the unwalled siege's `blockade` — at every rung through every week of their windows: T122-1 – T122-3 and T122-5 – T122-7's bars; 0 look pixels on water, a gate's passage or a keep-out, and none on a carriageway but a barrier's across it (a barricade's, a `stakes` barricade's or a cordon's); the four siege fixtures: 0 look pixels on a building footprint but the burned farmsteads', and the blockade at the castle-only town; the mesa fixture's camps each on `campLand` or the ring; every army of the five-army coalition told by colour or glyph; no week drawing a building both ruined and under its rebuild's stage; the fire at VILLAGE striking one end: the `ruinTone` on the struck end's plots only, and at an end-less THORP on the struck toft group's plots only (V07 §5.6 (3)); the cached district-band tile redrawn at each toggle and each View as change; with a siege and a refugee camp standing together, every `live.crises` mark carries its own look's overlay, and the box of one look's marks holds that look's parts alone; 0 crisis marks in any hit stack; the drawn-week clause from the later of M3b and V06's E6 (V06 §3.15.2's frames) |
| T-ER-28 | the damaged plan (§8.6; g item 123) at every rung where plans draw: a building never decayed; level 0 and level 1; every state and a restoration with patches; a building generated ruined and one first met in item 113's replay; a stale plan; a one-room and an empty plan; a church with its crypt; a building a disaster look stands over (§10.2 (f); a struck district's, and at VILLAGE a struck end's), and its battle-map scene; a roofless wing of a `decayed` building, its level below its roof bays' thresholds; an element a restoring re-cut mints while its `repair` Works still runs, and one a re-cut or an `extend` adds after its building's damage left; the week scrubbed back and forth; save, load, undo, redo, regenerate and migrate | byte-identical to its plan; no element damaged, every element damaged; by thresholds; the damage leaving in reverse threshold order, repaired elements in patch material; its as-built plan, then its damage; its cached rooms under the change marker until re-derived; that room's elements by their thresholds; its outline only; the crypt by its own thresholds; at `lookLevel`, or its own level where higher, until the look leaves it, the scene's walls, portals and lights its own level's (§11.1); every roof bay over its rooms open (§2.6 step 7); drawn as built in every week, never damaged by that restoration nor as a repair (V06 §3.23 (3)); monotone with the level; nothing stored — each lifecycle step draws what its state shows, every id unchanged — never an error | a fixture of every element kind at the levels 0, ¼, ½, ¾ and 1: T123-1, T123-2, T123-4, T123-6 and T123-7's bars, on the plan as on its battle-map export; the exterior agreeing with the plan (T123-5, V02); a disaster-look fixture whose battle-map scene's walls and portals equal its own-level scene's |
| T-ER-29 | the weather effects (§8.2's *Weather effects*, §8.4 (i), §8.8; g item 124) on every climate row through all 52 weeks, at every rung: the switch off; reduced motion and the low tier; the densest spell; a spell over every label, halo, Find glow and handle; fog at night among lights; a snow spell on an `arid` or non-freezing row; a spell on the vector rung and after a lost GPU context; a spell during an export, a resize and a gesture; a parity preset; the underground layer drawn as `cutaway`, `overlay` or `solo` during a spell; the timeline replayed from its seed and clock | nothing drawn; off by default (V09); ≈ 1 ms per frame (§12.5); nothing covered; a halo on every drawn light; nothing falls or lies; the wash and the halos only; the export without effects, the layer redrawn at the new size, the gesture's frames within budget; nothing drawn; nothing drawn, the underground tiles and light byte-identical with the effects on and off; the identical sequence — never a crash or a change of any tile | T124-1 – T124-9's bars on V12's harness: the hash and every tile identical with the effects on and off, exports byte-identical, a pixel test of labels and chrome, the luminance trace within the photosensitivity limit; the underground fixture in `cutaway`, `overlay` and `solo` with a spell: 0 effect pixels, its tiles and light byte-identical with the effects on and off |
=== END ===

=== REPLACE ### 11.1 Formats ===
### 11.1 Formats

| target | mapping | notes |
|---|---|---|
| **native `.plat`** | §2.9's format and canonical form; its byte-identical round trip is tested in §13.2 | import of our own export (MFCG cannot re-import its export; FTG's export ≠ its edit format) |
| **JSON schema** | published, versioned (generated from the `zod` types); entities by id with containment; a `plan` block per building whose plan rung is not `absent`, its state (§2.8) recorded on the block (§2.6; items 28 and 28 (f); J-A28.84): storeys, each with its rooms (address, ring in integer cm, role, `scope` — `unit`, `shared`, `service` or `circulation` — and, for a `unit` room, `unit`, the address of the household whose dwelling unit it belongs to), walls by kind, openings (kind, width, and the entrance of §2.6's set an `entrance` opening serves) and windows; the plan's `units` (each household's address, its unit form and its entry opening), stair cores and chimneys; with the output version and the supersedes table, so an exported plan says who lives where and the room graph follows from the openings; a `massing` block per building and a `composition` block with its state where the `wings` rung is current or stored (V02 §5.5; M6, file f item 449); every record's fields with their tier (*Authorship and tiers*, below) and each event's authorship with the log; each district's character vector, identity, band range and name history (item 72); each `Works` with its stage at the export's drawn week (§4.11; item 67); each `LightSource` (item 68); a clandestine building's concealed use and its concealed parts (item 63), the document formats being admitted whole (*Knowledge*, below); our own schema, never a cell grid | the API's response type |
| **compact twin** | CBOR with typed-array tags; varint zig-zag int32 cm in **world** coordinates, the settlement centre stored in the header, so it is an encoding of the same schema (FTG-21) | embeds and sharing; a decoder is part of the library |
| **GeoJSON** (RFC 7946) | two declared variants (N-14, below): the default **strict RFC 7946** file in WGS84 longitude / latitude through the geo anchor, and the **metric** file by prior arrangement; neither has a `crs` member. One FeatureCollection per layer (*Layers*, below); one feature per entity with `id` (its address, §6.3), `kind`, `layer`, `epoch` and public attributes; **districts included** (FTG omits them); ways as LineStrings with class and model width; faces as Polygons with holes, emitted without antennae (an antenna: §3.6 rule 3); MultiPolygons for face unions; walls, towers, gates and built bridges as typed features (a crossing `site` is not exported, §2.7), each enceinte's wall LineStrings split per run of equal `condition` and material (§2.7), each run carrying the enceinte's `id` and `run` (its ordinal from the trace's first vertex in vertex order), `condition` absent when standing and `material` — the `wallKind/id` key of its V11 `walls.patchMaterials` row — absent when robust (file f item 575; g item 114) — an enceinte closed by `shore` or `barrier` adding its closing edges as LineStrings of kind `closure` carrying the barrier kind (`shore`, `cliff`, `gorge`, `marsh`, `sheer`, `enceinte`; J-VI.3), every enceinte its enclosure as one Polygon of kind `enclosure`, each gate carrying its kind (`land` or `water`, §2.7) (g item 106; M2b, file f item 447); **item 110's entities (M3a, file f item 447; one text for both variants):** every way carries `part` (0 the ground); a raised way's LineString adds `raisedKind` (`viaduct` · `elevated` · `aqueduct`), `source` (`generated` · `declared`, item 244's derived reading), `reason` (`drop` · `link` · `water`, absent when declared; J-VI.2), `deckMinCm`, `deckMaxCm` and `underuseSince` (a week, absent when in use); each support a Polygon of kind `raisedSupport` (`way`, `key`, `state`); each span a Polygon of kind `span` (`use` as §2.7's laws read it (law 1 (8); its worked example *beneath*), `state` — item 244's, absent when standing); an aqueduct's channel is its way's LineString (class `aqueduct`); a retaining wall one LineString of kind `retaining` per run of equal state along its chain (`wall` its id, `run` the run's ordinal from the chain's first vertex in vertex order, `highSide` of the vertex order, `stepMinCm` and `stepMaxCm` over the run, `material`, `state` — absent when standing); stairs and ramps as `stair` and `ramp` flags on the way segments they occupy; a plot or building on a deck `onDeck` (its deck kind) and `deck` (the host's id), a deck host's feature `plat:deckState` (`decayed` · `ruined`, absent when standing); a stepped building `tiers` (the count); features on a raised part stay in the ground layer's collection with their `part`; boundary treatments as LineStrings with `treatment` (VIS-8); **trees** per green entity as one MultiPoint of its instance positions (§8.10's function at the finest band, overrides applied: integer-centimetre positions under §6.5's lint, so the file is byte-identical on every host) with `species[]` (each instance's species kind), `crownM[]` and `leafType[]` in the same order, or one Feature per tree on request with `species`, `crownM` and `leafType`, or none (VN-158, XB32); model widths only, never symbol widths; public attributes include the lifecycle states (`existence`, `condition`, a wall's `supersededBy`, a tunnel's `closure`, an island's `state`; items 8, 11, 31), a plot's `exposure` and `knownTo`, a building's `knownTo`, and an institution's `knownTo` on the features of its buildings (item 30), a building's `entrances` as points with their roles (item 29), an underground building's `baseCm` as its depth below the datum and `eaveCm` as its ceiling and a tunnel's invert profile (II.7), a market reservation's `rank` (§4.2); also each building's `worksStage` at the export's drawn week (item 67), an access point's `state` (item 64), each gallery, chamber and link of the underground systems with its `system`, `kind` and `depthBand` (II.7.6; item 65), a district's `identity` and band range (item 72), each lit `LightSource` whose host draws for the export's key (§8.1 item 7) as a Point with `kind`, `heightM`, `intensityCd`, `radiusM` and `colour` (item 68), and every property's tier as `plat:tier` — `dossier`, `declared` or `map` (item 20 (h)); the `name` and the purpose of a place (its `use`, or an institution's kind) the export's knowledge key does not admit (*Knowledge*, below) are withheld, the feature staying in the file, and a concealed use's features — its rooms, its concealed entrance, its way down (item 63) — and a secret access or link are left out for such a key, their lights with them; a fallen island's archived arena is not exported (II.6); an oasis's water body carries `oasis: true` and its spring a Point of kind `spring` (g item 111); a land-use feature's `deposit` and `depositState`, one `condition` feature per overlay (no geometry of its own; its `targets`) and one `supplyChain` LineString per active chain whose every joined node the key admits (V08 §5.2; SettlementForge stage, file f item 410); with `ExportOpts.links` (§11.2), one LineString of kind `supplyLink` per supply link within the export's scope — `good`, `consumer`, `provider`, `satisfaction`, `declared`, as the `links` query reads them (§11.2), a withheld end by address and kind and a concealed use's links left out; the history properties of V06 §5.3 — for raised ways the properties above plus `plat:why`, no second `reason` meaning (M6-E, file f item 409); the sky content of V05 §5.5 (M6-sky, file f item 415); the optional `wings` layer of V02 §5.5 (M6); with the option `exportWhy` (default false; M3a, file f item 456) each use's `cls`, `family`, `specialisation`, `significance` and its top three siting row ids (V11 §2.4; a raised way's `rw/<kind>` id travels there, never as its `reason`) | the default file validated by an open RFC 7946 validator in CI and loaded by the scripted QGIS test (O11 d); the metric file checked for geometry validity and its sidecar against its schema |
| **SVG** | written from a transient display list the generation worker builds for the export (below) at a declared band — the city band by default; the district band on request, after a size estimate is shown; the neighbourhood band only for a district-sized or smaller scope; `<g id="layer.ground"><g id="sem.building.footprint">` groups per layer and semantic; inside a group one compound `<path>` per (semantic, district), and a `<metadata>` JSON map from subpath index ranges to entity ids, so every entity stays addressable without an element each; trees as one compound path per green entity (crowns at the district band, the wood outline at the city band); text (N-13; the export dialog's `text` option) by default as **outlines** — each glyph used written once in `<defs>` as a path from the bundled face's own `glyf` outlines (the face the labels were measured with, §9.2; quadratic segments as SVG `Q`), each placed glyph a `<use>` at the per-glyph position S13b computed, the label's text carried in an `aria-label` and a `<title>` so it stays searchable — or, with `text: 'embedded'`, as editable `<text>` (curved labels per glyph, straight labels as one `<text>` with explicit per-glyph x positions) in the bundled face embedded unmodified as an `@font-face` data URI (OFL permits embedding; no subsetting, §17.2) (J-R32); halos by paint-order in both; hatching as compound paths; symbol widths; the light (item 68) as the vector rung's shadows in `<g id="layer.shadow">` and glow sprites, or, with the export option `lighting: 'raster'`, one embedded raster lighting layer from the CPU reference (§8.4 (f)) in `<g id="layer.light">`, multiplied over the base groups; the colour-matrix post operations (§8.2) as one filter on a wrapper group `<g id="lit">` that holds every base layer group, `layer.shadow`, the glow sprites and `layer.light`, under the label groups, so they act after the light as §8.4 (f) orders and never on a label; raised parts in their own group `layer.ground.raised` above ground part 0 (item 110; M3a); with stage 3 registered, at the district band and finer the roofscape's facets in the semantics `sem.building.roof`, `sem.building.roof.dormer`, `sem.building.roof.porch`, `sem.building.roof.tower` and `sem.building.roof.cupola` and its lines in `sem.building.roofline` (V02 §5.5), the map naming each facet's subpath range by its wing address `wing:<building>/<key>` (M6, file f item 449); the sky content of V05 §5.5 (M6-sky) | size and element budgets: §12.7; CI opens the METROPOLIS file in Inkscape headless (export to PNG within 120 s) and checks every layer id (O11 h) (SCL-14, VIS-18); the outline file's Inkscape PNG and the embedded file's Chromium PNG each match PLAT's own PNG of the same frame within the visual-regression threshold (§13.4) |
| **PNG / tiles** | §8.8's band-streamed tile assembly at any DPI, rastered in the tile worker from the export's transient list (below) and lit by §8.4's CPU reference at the request's light setting — the fixed or path sun by day, the moon and the lights at night, since an export has no pointer (item 68); transparent background; per-layer transparent PNGs (the largest MFCG ask; raised parts their own PNG, item 110); print presets A4…A2 at 300 dpi; the animated history (APNG over history frames; V06 §5.3, M6-E) | O12 (e): A2 at 300 dpi with no canvas larger than one tile band |
| **VTT** | Foundry-class scene JSON and **Universal VTT (`.dd2vtt`)** by the profile below, one scene set per model layer — the ground; the sky per island (its content V05 §5.5's; M6-sky); the underground one scene per depth band (`depthBandCm`, II.7.3) at that band's depth, every system of the layer in it (II.7.6; item 65) — with its elevation, plus one scene for each storey of a building whose plan rung exists (the profile below; item 28) and one deck scene per raised way crossing the scope (the profile below); model widths only | grid alignment error 0 px per cell (O11 g); no manual steps on import |
| **3-D** | glTF 2.0 binary (D-8): **ground as one planar partition** — the plat's leaf faces at the finest committed level, each boundary read once from the arena (§3.9) and each face exported once (no coplanar overlap), clipped to the terrain cells and draped (vertex z by bilinear terrain sample), material by role; **rivers as sloped surfaces** — the water level at each vertex is that of the nearest course station, falling monotonically downstream along S1's carved course; lakes, ponds and sea as level planes (GEO-40); buildings extruded from `baseCm` (FTG-13) to eave height with roof meshes to ridge height, per wing, each wing that spans a passage also extruded over its span ring from the passage's `headroomCm` above that wing's base to its eave (a stepped front's quads each), the passage left open beneath (§8.5 (2); `Passage`, §2.5; `BaseWing.spans`, §2.6), a basement (§2.6; item 29) extruded down from `baseCm` by its storeys inside its inset ring, an underground cell or vault (II.7.3) at its own depth — each wing's `ring` (§2.6), its roof by the wing's kind as in §8.6, or from the building's roofscape (V02 §5.2) with stage 3 registered, the export option `compositions: 'asDrawn' \| 'derive' \| 'none'` choosing (M6, file f item 449) — each wing's foundation skirt extruded down to the terrain (§2.6); walls, towers and gatehouses as prisms on their bases, a curtain wall's top carrying its walk (`Enceinte.walkCm` wide) at each run's top as §2.7's laws give it (law 1 (7); its worked example *the cap* in *beneath*), by run (g item 114): a `standing`, `worn` or `patched` run its prism with `extras.condition` and `extras.material` (absent when standing and robust), a `breached` or `dismantled` run no prism (its towers standing); bridge and pier decks at `deckCm`; a raised way a deck mesh swept at its deck height with its parapets, its supports extruded from the ground to the soffit, each `vault` span closed by its end walls but one §2.7's laws read `open` (law 1 (8); its worked example *beneath*); a retaining wall extruded between the ground heights on its two sides; glTF nodes carrying `extras.part` (item 110; M3a, file f item 447); the `interiors` option (default off) adding each plan's walls, floors, stairs and columns per V03 §5.3 (M6-P, file f item 450); the sky content of V05 §5.5 (M6-sky); trees as instanced crown meshes (`EXT_mesh_gpu_instancing`, positions from §8.10), one instancing node per (green entity, crown class) whose `extras` carry the entity's address and, per instance in instance order, `species`, `crownM` and `leafType` (XB32); a building under a Works at the export's drawn week (§4.11's *Which week is drawn*) extruded at its stage heights (`heightsAt`, §4.11; item 67); lights (item 68) as `KHR_lights_punctual` — a point light per lit `LightSource` (its position, colour, intensity in candela and `range` its radius) and one directional light for the fixed sun, the lights of an underground layer in that layer's node, each light only where its host draws for the export's key (§8.1 item 7). OBJ as a flat secondary (one mesh per entity, unlike MFCG's merged OBJ) | shadows, glTF and CityJSON agree by construction (heights are model data, §2.6) |
| **CityJSON 2.0** | `transform { scale: [0.01, 0.01, 0.01], translate }` so every vertex is our integer centimetre (lossless); `Building` (LoD1.2 solid from base to eave; LoD2.2 roof surfaces — the roofscape's facets, with dormers and porches when compositions are exported (V02 §5.5; M6); over a passage the solid takes each spanning wing's span-ring prism, from the passage's `headroomCm` above that wing's base to its eave, the passage open beneath), `WaterBody`, `Road` (lines with class and width, sampled from the way's width profile, §2.2 rule 5), `PlantCover` (greenery faces), `SolitaryVegetationObject` (trees from §8.10, one per instance: a `GeometryInstance` of the crown class's template, with `species`, `crownDiameter` and `height`; XB32), `LandUse`, `OtherConstruction` (walls, towers, gatehouses — an enceinte one object per run that stands, `standing`, `worn` or `patched`, with the attributes `condition` and `material`, a `breached` or `dismantled` run none (g item 114), each run's top as in glTF (§2.7's laws, law 1 (7); its worked example *the cap* in *beneath*); a retaining wall with `function: 'retainingWall'`), `Tunnel` (II.7's tunnels, swept from the invert profile and the bore), `Bridge` (and a viaduct, a raised road and an aqueduct each a `Bridge` with `function` `viaduct` · `raisedRoad` · `aqueduct`, an arch vault a `BridgeRoom`; item 110, M3a), `TINRelief` (terrain); a basement as a `BuildingPart` below `baseCm` — and, for a building whose plan rung is not `absent`, `BuildingStorey`, `BuildingUnit` and `BuildingRoom` children as V03 §5.3 states (M6-P, file f item 450) — and an underground cell as a `Building` whose base lies below the datum (items 12, 29); the sky content of V05 §5.5, PLAT's extension gaining `+FloatingIsland` and `+SkyAccess` (M6-sky, file f item 415); with `exportWhy`, the uses' siting fields as GeoJSON's; a building under a Works at its stage heights (`heightsAt`) at the export's drawn week (§4.11; item 67); no `referenceSystem` (a local metric CRS); a geo anchor, when the export has one, is recorded in the root property `+platGeoAnchor { latDeg, lonDeg, bearingDeg }`, defined by PLAT's own CityJSON Extension and listed in the file's `extensions` member (below; DEF-5) | validated against the CityJSON 2.0 schema in CI — the anchor-less file as it is, the anchored file with PLAT's extension schema given to the validator from the repository |
| **CSV / statistics** | the statistics record per generation with provenance (O6 d); people, buildings, plots; `chronicle.csv` and `uses-history.csv` (V06 §5.3; M6-E) | the corpus-calibration input |
| **permalinks** | §6.4's format and refusal rule; `&doc=` references resolve through §11.5's `DocResolver` | a document format (*Knowledge*) |
| **skeleton** (item 101) | the document's **declared subset**: a `.plat` document with no model, whose log is the recipe's intent and, in log order, every event whose entities §2.8's `factTier` reads `declared` — the author's declarations, the sugar events among them (§7.1) — and every author's `delete` of generated content, by its address, and a suppressing delete (item 110 (b)) with the key the fold recorded, written by the skeleton writer as `delete { id, suppress }` (the one place an event carries a suppression key; never written by a client), whose import suppresses the key whether or not the address arises — a removal whose address or key does not arise in the new document reported as applied with nothing to remove, never as a failure (file f item 455); each marked `creation`, each keeping its `proposedBy` on its line (file f item 365), so importing makes them the creation prefix of a new document, whose stages read its drawn declarations ahead (§4.1, §7.7); the declared subset adds the `history` block (a `Trajectory`; V06 §5.3, M6-E) | with the same seed, a skeleton exported and imported again reproduces the city byte for byte, removals included (§6.5 (9)'s skeleton round trip); a clerk's transcript of tool calls is itself a valid skeleton, re-importing with every clerk event still marked (T-V10-12); a document format (*Knowledge*) |

**Rotation.** Picture exports (SVG, PNG, VTT) use the view's rotation (§9.5); GeoJSON keeps model coordinates and records
the rotation.

**The season and the festival (g items 117 (h), 118 (g)).** Every picture export — PNG, print, SVG and the VTT scene's
image — draws the request's year position, weather and festival display (the request carries them, §8.9; the export's
transient list holds `live.festival`'s marks over its frame, for SVG as for the raster formats) and names
them: a line in its legend and in its metadata (SVG `<metadata>`, the PNG's text chunk, the scene's `plat` object) with
the season's name and week, the weather and, while one shows, the festival's name and weeks. A battle-map export
(`.dd2vtt`, Foundry) records the season in its `plat` object — `season { week, name, winter }`, `winter` the climate
row's severity — with each frozen water face as a polygon `ice { walkable }`, walkable in a `severe` winter and water in
any other (item 117 (h)), and draws decorations and boats in its image only — never as walls, doors, lights or obstacles
(item 118 (g)). GeoJSON, glTF and CityJSON carry neither: a season and a festival are looks, never model facts.

**Find, crisis looks and weather effects (g items 120, 122, 124).** Every picture export — PNG, print, SVG and the VTT
scene's image — draws, as the request's view state holds them (the export's transient list holding `live.find`'s and
`live.crises`' marks over its frame, for SVG as for the raster formats): **Find** as shown — the veil, the halos, pins and
gaps — with its chips in the legend, each with its colour and glyph (item 120 (i): a player handout, "where the smiths
are"), unless the request's `ExportOpts.find` is `false`, while a battle-map export (`.dd2vtt`, Foundry) draws it only
with `find: true`, in its image only; and the **crisis looks**, the ring's arcs among them, each named in its legend
and metadata with its condition's weeks (item 122 (f)), a battle-map export drawing them in its image only — never as
walls, doors, lights or obstacles. **No export draws the weather effects** (item 124 (h)): they are never in a tile or
the transient list, so an export is byte-identical with them on or off (T124-8), the season's cover still applying
(above). A match or a condition the request's key withholds is in no file (*Knowledge*, below).

**Layers.** `LayerSpec.exportSeparately` (§8.4) is read by the layered exports: where it is
true, SVG writes the layer as its own top-level group `layer.<id>`, the per-layer PNG zip its own PNG, GeoJSON its own
FeatureCollection and glTF its own node; where false, the layer's features join the ground layer's group, PNG, collection
or node, each keeping its `layer` attribute. VTT writes one scene set per model layer whatever it says (a scene is one
elevation).

**Knowledge (item 30; J-A30.83, J-A30.85).** Every picture and interchange export takes the requesting viewer's
knowledge key with the view state (§11.3), or a lower admission the request names (`ExportOpts.knowledge`: §11.2's
`Admission` — a tier, or a key form `{ tier, places }` — admitting exactly what both it and the caller's key admit, so
never above the caller's; the bridge's `export.request` carries it in its `opts`, §11.3; an application passes the view's
effective key there by default, V09 §5.10; file f item 453), and reads it through §9.2's admission function at its band —
an SVG its declared band, a raster the band of its export stop, a storey's scene the building band, a file without a
band (GeoJSON, CityJSON, glTF extras, CSV, a scene's journal entries) as at the city band — so a shared SVG, PNG, VTT
scene or GeoJSON carries no name and no purpose of a local or secret place the key does not admit — the place itself,
its faces and its doors, stays in the file (§9.2) — and none of a concealed use's concealed parts (its rooms, its
concealed door, its way down; item 63) or of a secret access or link (items 64, 65), which §9.2's refinement withholds as
marks too (J-A63.81), nor the lights, glows and shafts those hosts carry (§8.1 item 7). An `unexcavated` cavern or ruin
element (V04's excavation reading), its label, its links and its lights are admitted only at tier `secret`: a picture
draws them only when the request's view has `showUnexcavated` on, GeoJSON and glTF carry them only at `secret`, and a VTT
scene never (M6-U, file f item 278); a `lost` element is admitted as its `knownTo` says, drawn by the `unexcavated`
program in every picture whatever `showUnexcavated`, and written with `excavation: 'lost'` (V04 §5.2; g item 113 (e)).
**The document formats** — `.plat`, the compact twin, the JSON schema, a permalink
(its recipe and log, or the document a `&doc=` link names, rebuild every name, §6.4) and the skeleton — are the model and
carry every name, so they are admitted whole or not at all: `export` offers them
only to a key of tier `secret` (the `owner` and `editor` roles by default, §11.3; a script's by-value `exportDocument`
runs as the owner) and refuses any other key with the API error `E_KNOWLEDGE_TIER`, naming the tier the format needs.
The key governs what the module shows and writes; it does not hide what a client that loads the document holds, so a
host that keeps a place secret from a client sends that client pictures and interchange exports, never the document.

**Authorship and tiers in every export (items 20 (h), 101 R19; J-A101.82).** Every model and interchange format carries,
per record or feature, the tier of each fact by §2.8's `factTier` (GeoJSON as `plat:tier`) — and every format that carries the log (`.plat`,
the compact twin, the JSON schema, a skeleton) carries each event's author, its `proposedBy: 'clerk'` where a clerk
proposed it (§7.1) and its `dossierChange` where the dossier caused it (§7.7 item 13); a picture's metadata (SVG
`<metadata>`, the PNG's text chunk, the VTT scene's `plat` object) states the share of its entities in each tier and
whether any clerk-proposed event made them. The hobby reads what was hand-declared, what the rules derived and what an
AI clerk proposed from the file itself.

**Inert exports (item 85 (c); J-A85.81).** Every text node, attribute value and metadata string an exporter writes is
escaped by its format's own rule — XML escaping in SVG and every XML text, JSON string escaping, the VTT formats' JSON —
so a name from a dossier or from another user's edit can never become active content; the SVG writer emits no script
element, no event attribute, no `foreignObject` and no external reference (its fonts and images are data URIs, §17.2), and
§9.5's emblem imports stay sanitised. The bar — CI runs hostile names through every exporter and asserts inert,
well-formed output — is §13.2's. **Display names (item 85 (b)).** A host may pass `HostContext.displayNames` (dossier key
→ text; §14) with one export request: the exporter draws those texts for that request only and writes them nowhere else —
never into the document, a cache or a later export.

**The two GeoJSON variants (N-14).** RFC 7946 fixes WGS84 longitude and latitude and removed the `crs` member, so the
default export writes exactly that. A **geo anchor** `{ latDeg, lonDeg, bearingDeg }` places the settlement centre and
turns model north by the bearing; it is an export option, remembered per document in the view key `exportAnchor`
(§2.9), and defaults to (0°, 0°, 0°) — the conventional "no real location" point, so a default export is never mistaken
for a real place. No input gives a true bearing (§7.7 layer 2's *Bearing*; item 125 (a)–(b)), so a dossier-bound map's
anchor takes the same default (0°, 0°, 0°) and stays a user setting; no geometry moves for it. Each model vertex (x, y)
in metres, rotated by the bearing, is taken as a transverse Mercator easting
and northing — scale 1 on the central meridian through the anchor, false origin at the anchor — and inverted to WGS84
latitude and longitude with Krüger's published series to fourth order in the third flattening, evaluated with `dmath`
so the file is byte-identical on every host; coordinates are written with 7 decimals (≈ 1 cm), exterior rings
counter-clockwise and holes clockwise (RFC 7946 §3.1.6). Distances a GIS measures on the ellipsoid then match model
distances within a factor 1 + (d ÷ R)² ÷ 2 — at most 3.1 × 10⁻⁶, ≤ 5 cm, at the farthest corner of the largest frame
(≈ 15.7 km from the centre at aspect 2, §3.2 (1)). A foreign member `plat` records the anchor, whether it is the default,
the document id and the output version. The **metric** variant — offered "by prior arrangement" (RFC 7946 §4) for tools
that want the model's own metres — writes x east and y north in metres from the settlement centre with 2 decimals (the
centimetre lattice exactly), no `crs` member, in `<name>.metric.geojson`, beside a sidecar `<name>.metric.json` giving
the origin, the unit, the axes, the document id and the anchor if one is set (J-R31). The metric variant's features also
carry, beside their public attributes, `use` (the class family key), `district` (the id of the district the feature lies
in) and, on plots and buildings, `prosperity` (the field's value, 3 decimals) — V12 §2.2's measurement profile — its
schema version bumped once for them; the strict variant is unchanged (M2b, file f item 447).

**Where exports run.** Every `export(h, fmt)` runs in the generation worker, which holds the document (§8.9). *Model
formats* — `.plat`, the JSON schema, the compact twin, the skeleton, GeoJSON, glTF / OBJ, CityJSON, CSV and permalinks — read the model
and §8.10's instance function (`Exporter.write(doc, null, opts)`) — except the JSON schema's `plan` blocks, which
carry every stored plan and the derived plans the exporting session's elaboration cache holds, each with its rung state
(§2.8), so which derived plans a JSON export carries depends on what was clicked, the cache being non-canonical (§2.9;
J-A28.86). *SVG* needs a display list and label placement at the export's own stop (§8.7): the SVG exporter builds the
export's transient list (§8.1 item 6) for its band and frame with `DisplayListBuilder.build(model, band)`
(≈ 4 µs per building at the city band), runs S13b there at the export stop through `@plat/labels` with `@plat/render`'s
`ObstacleSource` and `RoleIndex` over that list — the code the tile worker runs, with the export frame as the visible
region of §9.2's scope, so the placement is the one the tile worker would compute at that stop and §13.3's placement
digests test the code both run — and writes the file (time: §12.7; the list is §12.8's export-time peak). A
district-band SVG's list is counted in the size estimate shown before writing (J-R41). *Raster formats* — PNG,
print and the `.dd2vtt` scene image — use a transient list too: the generation worker builds it the same way for the
export's band and frame (including the live layers the export's layer set names, as their providers stand at the
request) and transfers it with the raster-export request (§8.9), which also carries the look and view state as they
stood at the request — the sheet, §8.8's view-state switches, the shadow sun and the light step. In its queue's export
class (§8.9) the tile worker runs S13b at the export stop over the list, with the export frame as the visible region; in
`lit` with a `path` sun it bakes the request's crown set when it is not cached and holds it until the export completes;
it rasters every tile with the request's look and view state by §8.8's band-streamed assembly and streams the encoded
bytes and a progress message per band back; the generation worker wraps the VTT scene around the image. A lit export's transient list also
carries what its light reads beyond the frame (§8.8): its band's marks over the frame dilated by one export tile side (its
tiles' first rings) and by the largest light radius, and the city band's casters (§8.1 item 2) over the frame dilated by
§8.4 (c)'s largest window R, which its ring blocks read. That R takes Z from the city band's surface tops (the
`DisplayList` comment) with the frame's lowest terrain sample and the export's sun, so a caster beyond the frame's edge still shades it; the casters'
rows, at most a whole city band's (≈ 1.9 KB per building), count in the export-time peak and its size estimate (§12.8).
The export therefore shows the model, its look and its view state as they stood when it was requested, whatever is
edited, restyled or animated while its bands are rastered; the export dialog shows the bands done out of the bands total
(J-R47).

**The CityJSON extension.** By the CityJSON 2.0 convention a root property outside the core schema is named with a
leading `+` and defined by an Extension listed in the file's `extensions` member; whether a validator rejects an
undeclared one was not executed (PLAUSIBLE), so PLAT declares its one. `@plat/export` ships
`schemas/cityjson/plat.ext.json`, a CityJSON Extension (`type: "CityJSONExtension"`, name `Plat`, its own version,
`versionCityJSON: "2.0"`) whose `extraRootProperties` define `+platGeoAnchor` as an object of exactly three numbers —
`latDeg` in [−90, 90], `lonDeg` in [−180, 180) and `bearingDeg` in [0, 360) — and whose `extraAttributes`,
`extraCityObjects` and `extraSemanticSurfaces` are empty. A file with an anchor lists
`"extensions": { "Plat": { "url": …, "version": … } }`, the url being the address at which each release publishes the
schema beside the package; a file without an anchor — the default — has neither the property nor the member and is
plain CityJSON. CI validates both kinds with the extension schema supplied from the repository, so no check fetches
anything. A change to the property bumps the extension's version with the exporter's output version (§6.4).
**Measurement** at the CityJSON exporter's milestone (M3b, D-8): the anchored file passes the CityJSON validator with the
extension. **Pre-decided fallback:** the anchor moves to a sidecar `<name>.geoanchor.json` beside `<name>.city.json` —
the three numbers, the document id and the output version, checked against its own JSON schema like the metric
GeoJSON's sidecar — the CityJSON file carries neither the property nor the member, and the report says so (J-R43).
CityJSON is built for its lossless integer-vertex encoding (J-R14).

**Identity in every export (LC-1, LC-28).** Every export carries entity addresses (§6.3) and the document's supersedes
table (tombstone → successor), so an outside tool that keyed data to an entity can follow it across re-derivations; ids
cross the API and bridge boundary as `<docId>/<id>`.

**The `.dd2vtt` profile (DEF-4).**
* **Scope:** a rectangle or a district chosen by the user — by default the current view snapped to whole grid squares —
  cut to the limit bounds as every export frame is (§8.7; g items 116 (c), 122 (i)).
  One scene image is ≤ 8 192 px on a side at the declared grid (default 1 square = 5 ft = 1.5 m at 100 px, so ≈ 123 m);
  a larger scope is split into a grid of scenes aligned to grid lines, or the user lowers the pixels per square (≥ 50) —
  the export dialog shows the choice before writing. Output is exact pixels per cell (grid alignment error 0 px per
  cell, O11 g).
* **Fields:** `format` 0.3; `resolution { map_origin: {x: 0, y: 0}, map_size: {x, y} in squares, pixels_per_grid }`;
  `line_of_sight` — polylines in grid units from building footprint edges (minus door openings and the outer-wall runs
  the building's own decay level breaks at the export's drawn week — V06's `decayLevel`, §6.3 *Plan damage*'s
  comparison: a fallen run leaves line of sight, item 123 (e) — never a crisis look's `lookLevel`, which the scene's
  image alone draws, item 122 (f); V03 §5.3), enceinte faces along
  every `standing`, `worn` and `patched` run (a patch is a wall) and none along a `breached` or `dismantled` run (an
  opening; g item 114 (f)), yard
  walls and hedges from boundary treatments (fences and railings do not block sight), cliffs, retaining walls whose
  derived step (`stepProfile`, §2.7) is at least `vtt.retainingMinCm` (150 cm, a cell of the VTT export settings) as
  polylines along the wall broken over every stair or ramp interval (an opening, not a portal), and a raised part's
  supports' footprints as closed polylines as cliffs are (one rule; M3a, file f items 447, 448); no portal
  where a raised way crosses a street; `objects_line_of_sight`
  empty; `portals` — doors at every entrance of a building's entrance set (§2.6; item 29: `main`, `side`, `rear`, `yard`
  and `service`, each the width of its plan opening where the plan rung exists (V03 §3.6 O3; M6-P, file f item 451), else
  1.2 m) and gates (their opening), each
  `{ position, bounds: [two points], rotation, closed: true, freestanding: false }` — a concealed door only for a key
  that admits its use (item 63); a window, where a storey's scene writes one, a portal written `closed: false`, since the
  format has no window flag and importers read an open portal as a window (file f item 454); `lights` — the model's
  lights in the scope (item 68): every `LightSource` lit at the export's drawn week and every lit window at the export's
  hour (§10.3), `{ position, range in squares (its radius), intensity: 1, color, shadows: true }` with `color` as eight
  hexadecimal digits, alpha first (`AARRGGBB`), and on the underground layer its shafts — each by §8.1 item 7; `environment { baked_lighting: true,
  ambient_light }` with the ambient of the export's light setting; `image` — the scene PNG (base64) rendered by §8.8 at
  `pixels_per_grid` without the grid drawn in, lit by §8.4's CPU reference at the export's light setting (a day or a
  night scene).
* **Per layer:** one file per model layer — the underground one per depth band (II.7.3) — its elevation in the file name
  and in a `plat` extension object; coordinates exact to the grid (O11 g). An underground band's scene (M6-U, file f
  item 452) takes `line_of_sight` from every void kerb and chamber wall and every underground
  building's footprint less its doors and every outer wall run its own decay level fells (V04 §5.6 (5)) — a `cellarWall`
  run keeping its segment —;
  `portals` only at openings in a wall line — a door access, a door or breach link,
  an underground building's entrances whose door its own decay level leaves standing (a door past its threshold an open
  gap, no portal; V04 §5.6 (5)), each tunnel grille (closed when locked, bricked, gated or secret); every vertical
  access (stair, shaft, ladder, hatch, well, grating, mouth, sinkhole) a shaft light plus a `plat` extension object; and
  `lights` the band's lights and shafts — each only where the export's key admits it (§8.1 item 7).
* **Per raised way (item 110 (b); M3a):** each raised way crossing the scope adds one deck scene at its mean deck
  elevation, named as a storey scene is, its parapet edges `line_of_sight`, its end stairs or ramps open portals
  (`closed: false`) and the ground beneath drawn dimmed — at most 8 per export, the longest first, the dialog saying so;
  a Foundry scene writes each deck as one more level with its elevation band.
* **Per storey (item 28):** a building whose plan rung exists exports one scene for each storey, at that storey's elevation:
  `line_of_sight` from its walls minus their openings and the wall runs and partitions the building's own decay level
  breaks at the export's drawn week (V03 §5.3's `ownDamaged`: V06's `decayLevel`, §6.3 *Plan damage*'s comparison —
  never a crisis look's `lookLevel`, item 122 (f)), `cellarWall` and `cryptWall` runs keeping their segments
  (V04 §5.6 (2)); `portals` from every opening and every entrance whose door that level leaves standing — a doorless
  opening is a gap, no portal —; the stair core a named portal on both storeys' scenes while its flights at or above
  level 0 stand, a broken flight below level 0 a portal still (climbable rubble, V04 §5.6 (3)); floor holes, rubble and
  debris appear in the image only, never invented as walls (g item 123 (e); T123-6), the image drawing the drawn level,
  a disaster's look in it only (V03 §5.3; J-V3.138); `lights` — one per lit room (`Room.lit`, §2.6) that draws for the
  export's key (a concealed room's only for a key that admits it, §8.1 item 7), none for any room while its building is
  in a decay run (V03 §5.6 (6)), at its spine summit (§3.8's `spine` reader, its sampled medial axis on a downgrade; §8.5),
  `{ position, range, intensity: 1, color, shadows: true }` as the scene-level `lights` above, `range` being the room's
  diameter in squares and `color` the `glow` role's; the walls keep their centimetre positions and only the scene's grid
  snaps.
* **Foundry scene JSON:** the same geometry as walls (`c: [x0, y0, x1, y1]` with movement and sight types; doors flagged;
  an enceinte's walls by run as `line_of_sight` above — a `patched` run a wall, a `breached` or `dismantled` run none),
  the same lights, a background image file, grid size and distance units — written before the walls — and journal
  entries from the gazetteer.
* **Plain scene PNG:** on request a plain PNG of the scene named `{cols}x{rows}` is written beside the file, for
  tabletops that read the grid from the file name (file f item 454).
=== END ===

