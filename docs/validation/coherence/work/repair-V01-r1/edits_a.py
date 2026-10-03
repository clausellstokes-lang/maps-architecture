# Edits A: §0, §1.1, §1.2, §1.3, §1b, §2.3, §2.6, §2.7, §3.3.6, §3.4.4, §3.4.5, §3.5.3, §3.5.7, §3.8.8, §3.10.1,
# §3.10.3, §3.12. Each edit is tagged with the issue it answers.


def add(E, L):
    # ------------------------------------------------------------------ §0 (G120-V01, VV12-03: plain words)
    h = '## 0 In plain words'
    E(h, """hips, towers — the hatching follows each roof face and stops at its edges.""",
      """hips, towers — the hatching follows each roof face and stops at its edges.

**Finding things, and waiting (items 119 and 120).** Find, the map's filter view, can pick out a whole district,
neighbourhood or quarter: it lifts from the dimmed map and glows along its edge. Its **Show gaps** switch outlines the
parts of town that have none of what you are looking for (V01 §5.4). Opening a district stays as quick as it is; the
longer waits stage 2 adds once — generating a town, laying a new layout, making a standalone neighbourhood — finish within
ten seconds and show their progress as they go (V01 §6).""", tag='G120-V01; VV12-03')

    # ------------------------------------------------------------------ §1.1
    h = '### 1.1 What this volume builds (to build depth)'
    E(h, '(V01 §3.2, §3.3). S7c runs', '(V01 §3.2, V01 §3.3). S7c runs', tag='VV12-12')
    E(h, '(V01 §3.8, §3.9).', '(V01 §3.8, V01 §3.9).', tag='VV12-12')
    E(h, '(V01 §3.5.12, §4.5, V01 §5.2.1)', '(V01 §3.5.12, V01 §4.5, V01 §5.2.1)', tag='VV12-12')
    E(h, '(V01 §2.3, §3.6); item 109', '(V01 §2.3, V01 §3.6); item 109', tag='VV12-12')
    E(h, '(V01 §3.7.1, V01 §3.8.9, §3.9).', '(V01 §3.7.1, V01 §3.8.9, V01 §3.9).', tag='VV12-12')
    E(h, """    neighbourhood document (V01 §2.3, V01 §3.4.3, V01 §3.4.4, §3.6, §3.11, V01 §3.17, §5).""",
      """    neighbourhood document (V01 §2.3, V01 §3.4.3, V01 §3.4.4, V01 §3.6, V01 §3.11, V01 §3.17, V01 §5).
13. **File g items 119 and 120's neighbourhood parts**: the one-time waits stage 2 adds or lengthens held within item
    119's ten-second comfort level, every line of V01 §6 kept as its target and every interactive budget unchanged
    (V01 §6); Find's area targets — districts, neighbourhoods, quarters and regions — and Show gaps' units over the
    catchments, through `findAreas` and `gapUnits` (V01 §5.4, V01 §3.16).""", tag='VV12-12; VV12-03; G120-V01')

    # ------------------------------------------------------------------ §1.2
    h = '### 1.2 The base hooks this volume consumes'
    E(h, '| V01 §3.8, §3.9, §4 |', '| V01 §3.8, V01 §3.9, V01 §4 |', tag='VV12-12')
    E(h, '(V01 §2.5, §3.8); `HoodRecipe`', '(V01 §2.5, V01 §3.8); `HoodRecipe`', tag='VV12-12')
    E(h, "the panel's members (V01 §3.5.12, §4.5) |", "the panel's members (V01 §3.5.12, V01 §4.5) |", tag='VV12-12')
    E(h, 'gardens excluded (V01 §2.3, §3.6) |', 'gardens excluded (V01 §2.3, V01 §3.6) |', tag='VV12-12')
    E(h, "V04 §3.1, §3.3 (P7, `forecastSafety`), §3.4 (F6), V04 §3.5.1, V04 §3.6a (`underDistance`), V04 §3.7a (T8), §3.10, §4.3 |",
      "V04 §3.1, V04 §3.3 (P7, `forecastSafety`), V04 §3.4 (F6), V04 §3.5.1, V04 §3.6a (`underDistance`), V04 §3.7a (T8), V04 §3.10, V04 §4.3 |",
      tag='VV12-12')
    E(h, '(V01 §3.7.1, V01 §3.8.8, §3.9, V01 §3.10.1, V01 §3.16) |',
      '(V01 §3.7.1, V01 §3.8.8, V01 §3.9, V01 §3.10.1, V01 §3.16) |', tag='VV12-12')
    E(h, "| V05 §2.3, V05 §2.3a, §2.4, §3.2, §3.5 (3), §3.8 (4), V05 §3.12, V05 §3.15 (5), §4.2, §4.3; item 280's sky stage |",
      "| V05 §2.3, V05 §2.3a, V05 §2.4, V05 §3.2, V05 §3.5 (3), V05 §3.8 (4), V05 §3.12, V05 §3.15 (5), V05 §4.2, V05 §4.3; item 280's sky stage |",
      tag='VV12-12')
    E(h, '(V01 §3.17.2–V01 §3.17.5, §2.3);', '(V01 §3.17.2–V01 §3.17.5, V01 §2.3);', tag='VV12-12')
    E(h, '| V02 §2.1, §2.6, §3.7, §3.11, V02 §3.15–V02 §3.17, §5.2–§5.3 |',
      '| V02 §2.1, V02 §2.6, V02 §3.7, V02 §3.11, V02 §3.15–V02 §3.17, V02 §5.2–§5.3 |', tag='VV12-12')
    E(h, '| V03 §3.3, V03 §3.7.1–V03 §3.7.3, §5.1, §5.4, O1 (e), J-V3.73 |',
      '| V03 §3.3, V03 §3.7.1–V03 §3.7.3, V03 §5.1, V03 §5.4, O1 (e), J-V3.73 |', tag='VV12-12')
    E(h, """| items 447, 448 (§11.1); J-VI.3 | item 110's GeoJSON names and the VTT rule; the six closure barrier kinds | V01 §5.3; II.1's seam typing (item 541) |""",
      """| items 447, 448 (§11.1); J-VI.3 | item 110's GeoJSON names and the VTT rule; the six closure barrier kinds | V01 §5.3; II.1's seam typing (item 541) |
| g item 119 (a)–(f) (J130); §12.1 (the targets and the comfort level), §12.6, §12.7, §12.10; V11 §3.25.8; V09 §4.21.9 | the targets; the ten-second comfort level for one-time waits; the measured-gain rule and its `perf.qualitySpend` rows; the progress rule and the progress view; the interaction budgets kept | V01 §6's lines kept as the targets, stage 2's one-time waits held to the comfort level, its interactive lines unchanged (J-V1.103); T-V1-29's one-time-wait clause |
| g item 120 (a)–(k) (J133); §2.9's view key `find`, §8.2's Find rows, §11.1, §11.2's gazetteer match listing and admission, §12.5's overlay budget; V09's Find panel and `live.find` overlay; V10 §2.13's `FindAnswer`; V11's lexicon (labels, synonyms, groups) | the per-viewer chips and the Show gaps switch; the veil, halo, outline, pin and count-bubble rows; each chip's matches at the view's effective key | the town's area targets and Show gaps' units (`findAreas`, `gapUnits`; V01 §5.4, V01 §3.16; J-V1.102); T-V1-59 |""",
      tag='VV12-03; G120-V01')

    # ------------------------------------------------------------------ §1.3
    h = '### 1.3 Out of scope, and whose it is'
    E(h, """* **Calibration runs** — volume 12;""",
      """* **Find's panel, type-ahead, chip grid, results and overlay** (item 120) — volume 9; the veil, halo, outline and pin
  rows §8.2's; the gazetteer's counts and match listing §11.2's; the search words V11's; the clerk's "show me" volume
  10's. This volume gives the town's area targets and Show gaps' units (V01 §5.4).
* **Calibration runs** — volume 12;""", tag='G120-V01')

    # ------------------------------------------------------------------ §1b
    h = '### 1b WIRING TABLE — every new piece, what feeds it and what it feeds'
    E(h, '(V01 §3.5.12, §3.9) |', '(V01 §3.5.12, V01 §3.9) |', count=2, tag='VV12-12')
    E(h, "V11's `naming.ruin` and culture rows, V10's explanations, volume 9's coverage and voids views | §4.7 S10b (item 103 (f)); II.7.5 (2) |",
      "V11's `naming.ruin` and culture rows, V10's explanations, Find's Show gaps (`gapUnits`, V01 §5.4, into which item 120 (i) folds volume 9's Coverage view) and volume 9's voids view | §4.7 S10b (item 103 (f)); II.7.5 (2) |\n"
      "| Find's area targets `findAreas` and Show gaps' units `gapUnits` (V01 §5.4, V01 §3.16; item 120) | committed districts of every layer, §9.1's city-cut `QuarterNode`s and `RegionGroup`s with their `LabelEntity` names, `District.identity`, the districts' L1 faces; `catchmentOf` (V01 §3.16) over the class's compiled `profile.coverage` (V11 §2.3); the chip's matches the view's key admits (§11.2's match listing) | volume 9's Find panel (the list's area entries) and `live.find` overlay (an area's lift, halo and pin; Show gaps' dashed outlines and their \"none here\" labels); V10's `FindAnswer` (a chip's `none`); §11.1's picture exports; T-V1-59 | §2.9's view key `find`; §11.2; §8.2's Find rows; §12.5 |",
      tag='G120-V01')
    E(h, '(M1, M2b, M3a or M5; V12 §2.8, §3.11)', '(M1, M2b, M3a or M5; V12 §2.8, V12 §3.11)', tag='VV12-12')
    E(h, '| V12 §2.6 `CalibrationEntry`, §3.11 |', '| V12 §2.6 `CalibrationEntry`, V12 §3.11 |', tag='VV12-12')
    E(h, "| stage-2 budgets (V01 §6) | measurements at M5 | §12's rows | §12.4–§12.6 (item 474) |",
      "| stage-2 budgets (V01 §6) | measurements at M5; item 119's comfort level for one-time waits (§12.1) | §12's rows; T-V1-29 (its one-time-wait clause) | §12.4–§12.6 (item 474); §12.1 (item 119) |",
      tag='VV12-03')

    # ------------------------------------------------------------------ §2.3
    h = '### 2.3 Views and services (derived, never stored)'
    E(h, '(V01 §3.4.5 (c), V01 §3.5.3–V01 §3.5.5, §3.6) |', '(V01 §3.4.5 (c), V01 §3.5.3–V01 §3.5.5, V01 §3.6) |', tag='VV12-12')
    E(h, """  // null where V12 reads `notApplicable`
""", """  // null where V12 reads `notApplicable`
// Find's area targets and Show gaps' units (V01 §5.4; item 120): view data — derived per commit and per view key, outside the document, its hash and the log
interface FindArea {   // findAreas' row (V01 §5.4 (1))
  id: Id /* the District's, the city-cut QuarterNode's or the RegionGroup's */; kind: 'district'|'quarter'|'region';
  word: 'district'|'neighbourhood'|'quarter'|'region' /* the panel's word: 'neighbourhood' for an `undercity` or `underground` district and a standalone
    neighbourhood document's district, 'district' for every other (J-V1.35: one target per area, never two) */;
  name: NameRef /* its LabelEntity's text, `displayText` where set */; identity?: string /* a district's identity row label (item 72): a search word */;
  districts: Id[] /* itself, or its member districts the key admits, in address order */;
  shapes: { layer: 'ground'|'underground'|'sky'; area: PolygonCm[] /* the union of those districts' L1 faces on the layer, one per component;
    a sky shape in its island's local frame (S14 places it, V05 §5.4) */ }[];
  anchor: { layer: 'ground'|'underground'|'sky'; at: PointCm } /* on its largest shape: its label's first spine's midpoint, else that shape's pole of
    inaccessibility — the pin below item 120 (e)'s pin threshold and the ghost pin on another layer (V01 §5.4 (2)) */ }
interface GapUnit {   // gapUnits' row (V01 §5.4 (3)): one per unit holding no member of the chip that the key admits
  unit: CoverageSpec['unit'] /* the unit read (V01 §5.4 (3)): the class's, 'neighbourhood' read as 'district' (J-V1.35), 'district' for a class with none */;
  id: Id /* the district (a `district` unit, and the district holding a per-plot unit's gap); a parish cell's church member (the district before any church);
    `TOWN_ROOT` (§6.1, §14) for `settlement` */;
  layer: 'ground'|'underground'|'sky';
  plots: Id[] /* the gap's plots: a partition unit's plots; a per-plot unit's unserved residential plots */;
  area: PolygonCm[] /* a `district` unit's faces united, else the union of `plots`' faces; one per component, each drawn dashed with one "none here" */ }
""", tag='G120-V01')
    E(h, """//   skyDistrictCount(plotLandM2: number, districtHa: number): number /* a sky island's district count, 1–3 (V01 §3.16) */
""", """//   skyDistrictCount(plotLandM2: number, districtHa: number): number /* a sky island's district count, 1–3 (V01 §3.16) */
//   findAreas(key: Admission): FindArea[] /* Find's area targets on every layer, at the view's effective key (V01 §5.4 (1)) */
//   gapUnits(chip: { classes: string[] }, key: Admission): GapUnit[] /* Show gaps' units of a kind chip on every layer (V01 §5.4 (3)) */
""", tag='G120-V01')

    # ------------------------------------------------------------------ §2.6
    h = "### 2.6 The standalone neighbourhood document's recipe"
    E(h, "/* the chips: `buildings` ≈ 85, 700, 1 050 (NG's bands) */",
      "/* the chips: `buildings` ≈ `size.small`, `size.medium`, `size.large` (NG's bands; V01 §3.14) */", tag='VV12-11')
    E(h, "/* greenery 0.9 and court greening × 1.5 (NG's `leafy`) */",
      "/* greenery 0.9 and court greening × `green.leafyCourt` (NG's `leafy`) */", tag='VV12-11')

    # ------------------------------------------------------------------ §2.7
    h = '### 2.7 Lifecycle of every state field this volume adds (create · read · persist · regenerate · undo · migrate)'
    E(h, "`FabricSignature`, the three services' answers, `HoodPin`,",
      "`FabricSignature`, the three services' answers, Find's area targets and Show gaps' units (`FindArea`, `GapUnit`: view\n"
      "data, outside the document, its hash and the log; V01 §5.4), `HoodPin`,", tag='G120-V01')

    # ------------------------------------------------------------------ §3.3.6 (VAT0-03)
    h = '#### 3.3.6 Epochs — the `hood.fabric` participant (volume 6)'
    E(h, """`block.squareType` in `EpochOps.ops`, drawn on `ctx.stream(S7c | S9b, entity)` (`epoch.transform`). An epoch with no new
face,""", """`block.squareType` in `EpochOps.ops`, drawn on `ctx.stream(S9b, entity)` (`epoch.transform`; the participant's registered
stage, V06 §2.1, V06 §3.16), item (1)'s S7c rule included, its table reads recorded under `S9b`. An epoch with no new
face,""", tag='VAT0-03')

    # ------------------------------------------------------------------ §3.4.4 (VAF-R0S-22, VV12-07, VV12-11)
    h = "#### 3.4.4 The ring primitive (item 58 (a); the courses are II.2's)"
    E(h, """3. **Radii.** `s₁ = eLo + u (R − eLo)` (u on `cut.arc`, creation index 0); `r₁ = s₁ / 2`; **one growth factor per
   district**, `g = 1 + f` with `f` the folded four-uniform bell (§6.1's `bell4`) on `cut.arc` (creation index 1), and
   `s_k = s₁ × g^(k−1)`, `r_k = r_{k−1} + s_k` — NG 1.2.2's geometric law (one factor per map; `code-neighbourhood.md`
   §2.1; J-V1.37). Ring k is laid while its jittered, smoothed course lies wholly inside the face inset by
   `eLo + w_tpl / 2` and the series'""", """3. **Radii.** The spacings `s₁, s₂, …` are II.2's law over the radius budget `R` (its one growth factor `g` per
   district and its `cut.arc` draws included; NG 1.2.2 draws one factor per map, `code-neighbourhood.md` §2.1;
   J-V1.37); the radii are `r₁ = s₁ / 2` and `r_k = r_{k−1} + s_k`. Ring k is laid while its jittered, smoothed course
   lies wholly inside the face inset by `ring.insetELo × eLo + w_tpl / 2` and the series'""", tag='VAF-R0S-22; VV12-11')
    E(h, """   (J-V1.70): its course is the reservation's outline offset outward by `dBar + w_tpl / 2` (the kernel's `insetRing`
   with a negative inset) — one plot row between the precinct and the street round it — with three corner-cutting
   passes (II.2's smoothing), resampled to 48 vertices;""", """   (J-V1.70): its course is the reservation's outline offset outward by `dBar + w_tpl / 2` — one plot row between the
   precinct and the street round it — as the kernel offsets (§3.7 *Insets*): the kernel's `insetRing` with that negative
   inset where the outline is convex, else the outer ring of the union of the outline's face with a `buffer` of its ring
   by `dBar + w_tpl / 2` (a pocket the offset closes lies inside the course); then three corner-cutting passes (II.2's
   smoothing), resampled to 48 vertices;""", tag='VV12-07')
    E(h, """   A precinct ring is laid when it lies wholly inside the face inset by `eLo + w_tpl / 2` and at""",
      """   A precinct ring is laid when it lies wholly inside the face inset by `ring.insetELo × eLo + w_tpl / 2` and at""",
      tag='VV12-11')
    E(h, """   `max(6 m, 2 ×` the wider lane's width)""", """   `max(ring.portalGapM, 2 ×` the wider lane's width)""", tag='VV12-11')

    # ------------------------------------------------------------------ §3.4.5 (VV12-11)
    h = '#### 3.4.5 The plaza primitive'
    E(h, """A rectangle has aspect `1 + bell4` when that exceeds
1.2, else 1,""", """A rectangle has aspect `1 + bell4` when that exceeds
`plaza.aspectMin`, else 1,""", tag='VV12-11')
    E(h, '`voidCorner = { junction, radiusCm: 1.2 × √(A ÷ π) }`', '`voidCorner = { junction, radiusCm: plaza.voidRadius × √(A ÷ π) }`',
      tag='VV12-11')

    # ------------------------------------------------------------------ §3.5.3 (VV12-11)
    h = '#### 3.5.3 Squares'
    E(h, '`smallBlockM2 = eLo² ÷ 2`', '`smallBlockM2 = eLo² ÷ sq.smallDiv`', tag='VV12-11')

    # ------------------------------------------------------------------ §3.5.7 (VV12-11)
    h = '#### 3.5.7 Courts greened (§4.9, item 313)'
    E(h, "× 1.5 for a `leafy` standalone recipe", "× `green.leafyCourt` for a `leafy` standalone recipe", tag='VV12-11')

    # ------------------------------------------------------------------ §3.8.8 (VV12-12)
    h = '#### 3.8.8 Underground, sky, and the ground access symbols'
    E(h, '(V03 §3.7.2 (5), V03 §3.7.3, §5.1; a `secret` head by §5.4)',
      '(V03 §3.7.2 (5), V03 §3.7.3, V03 §5.1; a `secret` head by V03 §5.4)', tag='VV12-12')

    # ------------------------------------------------------------------ §3.10.1 (VAF-R0S-14, VV12-11)
    h = "#### 3.10.1 The standalone neighbourhood document (`Recipe.product = 'hood'`)"
    E(h, """the `size` chip sets `buildings` to about 85, 700 or 1 050 (NG C8's small, medium and large bands);""",
      """the `size` chip sets `buildings` to `size.small`, `size.medium` or `size.large` (NG C8's small,
     medium and large bands; V01 §3.14);""", tag='VV12-11')
    E(h, """A
     `buildings` target sets `areaHa = buildings × plotArea(band) ÷ 0.62 ÷ 10 000` (0.62, §4.2 S2's dense-core plot
     share).""", """A
     `buildings` target sets `areaHa = buildings × plotArea(band) ÷ plotShare(dense core) ÷ 10 000`, `plotShare` §4.2 S2's
     measured share read by name.""", tag='VAF-R0S-14')
    E(h, "`leafy`: greenery 0.9 and court greening × 1.5;", "`leafy`: greenery 0.9 and court greening × `green.leafyCourt`;",
      tag='VV12-11')
    E(h, "with `L_hood` the outline face's built land (area × 0.62)",
      "with `L_hood` the outline face's built land (its area × §4.2 S2's `plotShare(dense core)`)", tag='VAF-R0S-14')

    # ------------------------------------------------------------------ §3.10.3 (VV12-16)
    h = "#### 3.10.3 A sky island's districts (J-V1.49)"
    E(h, "do not reach an island's districts (V05's sentence).", "do not reach an island's districts (V05 §3.8).", tag='VV12-16')

    # ------------------------------------------------------------------ §3.12 (VAT0-03)
    h = '### 3.12 Determinism'
    E(h, "`epoch.transform` (the `hood.fabric` participant, V01 §3.3.6).",
      "`epoch.transform` (the `hood.fabric` participant's draws, item (1)'s S7c rule included, all under its\n"
      "registered stage `S9b`, V01 §3.3.6).", tag='VAT0-03')
