# Verify — rendering (§8, §9, §11, §12), round 2 (after repair round 2 / assemble-r2)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-rendering-r2t; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-rendering-r2t`, 2026-10-01, cloud checkout)
- P0 resume check (no output, no LANDED line): fresh start — done
- P1 inputs: brief, round-1 findings (16), adjudication-r2 (rulings R2-05, R2-10, R2-21, R2-29 – R2-42; Part H · rendering), assemble-r2, repair-r2-rendering preamble, g items 119–126, canon routings 120–126 — done
- P2 word diff pre-round (`137ecc0e…`) → live (`4ed292e9…`) over every §8/§9/§11/§12 subsection (19 replaced) — done
- P3 re-check of VRC1T-01..11 and G120–G124-rendering against the live text — done (all FIXED / PRESENT)
- P4 new problems in every replaced subsection, with their seams (§2.6, §2.9, §6.1, §6.3, §7.7, §10.2, §13.2, §14, V02, V03, V04, V06, V09, V10, V11, V12) — done
- P5 owner items 120–126 rendering parts as new design (wiring, lifecycle, edges, tests, agreement) — done
- P6 report, result file, LANDED — done

## Outcome

**19 issues: 0 blocker, 7 major, 12 minor** — owners rendering 15, model 2, pipeline 1, V12 1.

* **Round 1: all 16 of this seat's findings are closed in the live text** — VRC1T-01 … VRC1T-11 FIXED as their rulings word them
  (VRC1T-09 at scope, VRC1T-11 at model), and G120-, G121-, G122-, G123- and G124-rendering written at build depth
  (NEW DESIGN, §4 below). The other seats' rendering ids of Part H (VAH-31 with VV910-02 and VV1112-r1-06, VAL-R1-05/-11/-12,
  VAT-R1-01, VDC1-15, VEW-r1-05, VV34-r1-04, VV56-r1-06, VV910-r1-01, G122h- and G125-rendering) are applied as their
  rulings word them; R2-42's `stopAfter` and R2-33 (b)'s travelling view commands are in §11.2–§11.3.
* **Owner items.** 120, 121, 122 (with (h)–(i)), 123, 124 and 125: rendering's parts PRESENT. 126 routes nothing to
  rendering; no phone clause is left in §8–§12 (R2-41). The new design has seven major defects: Find's chip cues repeat
  with the colours (VRC2T-01); the crisis barricades against the carriageway rule, at three units (VRC2T-02 – -04); full
  precision given up first against §8.4 (g)'s tolerance rule (VRC2T-05); the battle-map damage clauses against items
  122 (f) / V03 / V04 (VRC2T-06); Find on a scrubbed week (VRC2T-07); Auto and a DPR change with no gesture (VRC2T-08).
* **Size.** §8/§9/§11/§12: 59 158 words in the pre-coherence archive → 80 190 before this round → **91 201** now (+13.7 %
  this round; +54.2 % against the archive). The growth is items 120–125 at build depth (≈ 9 500 words) and their edge rows
  T-ER-25 – T-ER-29 (≈ 1 300); the removals (≈ 450 words) are restatement (the `BarrierKind` union ×3 and its gloss, the
  `LadderStep` union, the margin's value) and one duplicated mechanism (`live.coverage`, folded into Find's Show gaps with
  every Coverage behaviour kept: for a class, the catchments with no member, `catchmentOf`, knowledge-filtered). Each was
  checked at its home; no nuance lost. The unit did not shrink, so no shrink-nuance audit was due.
* **Checks.** `doc_checks.py --sections 8,9,11,12` exit 0 — C1 5/0, C2 1/0, C3 188/0, C4 3/0, S1 0/0, S2 208/0 — with the
  warning that the reference corpus is incomplete (captures, research/patreon, research/devlogs, research/ftg-docs,
  research/external absent): provisional, NOT authoritative. Receipts `coh_repair_rendering_r2_resolution` and
  `coh_repair_rendering_r2_roles` re-run byte-identical. New ids T-ER-25 – T-ER-29 and R12-35 – R12-38 each defined once.

## 1. Method and coverage

* **Texts.** The live base (`docs/ARCHITECTURE.md`, sha256 `4ed292e9…`, = assemble-r2's installed hash) against the pre-round
  base (`git show 682e8e9:docs/ARCHITECTURE.md`, sha256 `137ecc0e…`, the base every repair-r2 file was written against). Every
  subsection under `## §8 `, `## §9 `, `## §11 `, `## §12 ` cut at its heading in both; a word diff of each changed one read
  whole. Changed: exactly rendering's 19 blocks — §8.1, §8.2, §8.4, §8.6, §8.7, §8.8, §8.9, §8.11, §9.5, §11.1, §11.2,
  §11.3, §11.4, §11.6, §12.1, §12.5, §12.7, §12.8, §12.10. Byte-identical and keeping their round-1 verdict: §8.0, §8.3,
  §8.5, §8.10, §9.0–§9.4, §9.6, §9.7, §11.0, §11.5, §12.0, §12.2–§12.4, §12.6, §12.9.
* **Removed words.** Every deleted run of the 19 diffs listed and traced (scratch `wd/`): each a restatement now cited, a
  ruled change (R2-10, R2-21 (e), R2-29, R2-30, R2-31, R2-33, R2-40, R2-42) or an owner item's replacement (item 121's
  order for J-A68.89's step-down; item 123's damage layer for §8.6's "a ruin's fallen walls and open rooms"; item 125 for
  §11.4's host fields and §11.1's realm fit). The inventory ids they touch: RENDERING-0302, -0322, -0323, -0452, -0465,
  -0494, -0562, -0632, -0636 — each CHANGED only by a ruling or owner item, except as VRC2T-05 and VRC2T-11 state.
* **Seams read.** §2.6 step 7, §2.9 (the six per-viewer keys, *The week's source*, *Weather effects*, *The crisis
  framing*), §6.1 (`plan.damage`, `view.weather`, *The weather stream*), §6.3 *Plan damage*, §7.7 (layer 2's *Bearing*,
  DR44), §10.2 (`RosterTables.crisis`, *Crisis looks* (a)–(i), EP-27), §13.2 (T120-n – T126-n, the T-ER line), §13.8, §14
  (`HostContext`, the error codes), J-A68.89, J-A121.01; V02 §2.4/§5.7, V03 §5.3/§5.6, V04 §5.6, V06 W94 and §3.15.2,
  V09 §2.12 rows, §4.21.9 – §4.21.12, V10 §2.13 (`FindAnswer`), V11 §2.8 (`WeatherKind`, `DamageElementRow`), V12 §3.15
  (`time.findSuggest`, T122-n measures).

## 2. Round-1 findings — re-checked against the live text

| id | owner | ruling | verdict | where it now stands |
|---|---|---|---|---|
| G120-rendering | rendering | NEW DESIGN per R2-32, R2-33, R2-35 | FIXED (written) | §8.2 *Find* (veil, halo, area chips, pins and bubbles, ghost pins with a Below band label — VV34-r1-04 —, Show gaps, `find.1`…`find.8` with glyph and dash), `live.find` replacing `live.coverage`; §9.5 Find; §11.1; §11.2 `GazetteerAnswer` and the match listing; §12.5 and R12-35; T-ER-25; M5. New defects: VRC2T-01, -07, -09, -18 |
| G121-rendering | rendering | NEW DESIGN per R2-35, R2-36 | FIXED (written) | §8.8 *Resolution and the Auto loop*, *Fitting the need — one order*, the split composition; §8.4 (g) the give-up order; §8.9 `'ultra'`; §12.1 the ultra bar; §12.5 frame budgets; §12.8; R12-36; T-ER-26; M4. New defects: VRC2T-05, -08, -19 |
| G122-rendering | rendering | NEW DESIGN per R2-37 | FIXED (written) | §8.2 *Crisis looks* (`live.crises`, the `crises` key, the table by band, glyphs, cues, slots 15b/19b, the extension marker, the legend); §8.1 `crisis.place`; §11.1; §12.5 and R12-37; T-ER-27; M3b. New defects: VRC2T-02, -10 |
| G123-rendering | rendering | NEW DESIGN per R2-38 (4) | FIXED (written) | §8.6 *The damaged plan* (the forms table, the states' looks, unsafe rooms, patches, `lookLevel`, the no-op pin); §8.1 `plan.rubble`; §8.8's drawn week in the key; §11.1 battle maps; T-ER-28. New defects: VRC2T-06, -13, -15 |
| G124-rendering | rendering | NEW DESIGN per R2-39 (a) | FIXED (written) | §8.2 *Weather effects* and *Snow and the sun*'s hard rule (`snow` draws as `clear` on an `arid` or non-freezing row); §8.4 (i); §8.8 *The weather effects layer*; §8.9; §11.1 no export draws them; §12.5 and R12-38; T-ER-29; M3b. New defect: VRC2T-17 |
| VRC1T-01 | rendering | FIX per R2-31 (d) | FIXED | §12.1 "an `advance` of time and a history-first generation …, each in total, never per epoch (item 119 (a2); V06 §6.8 …)"; R12-31 "… the history replay, each in total (item 119 (a2))" |
| VRC1T-02 | rendering | FIX per R2-33 (b) | FIXED | §11.3 *View state*: the per-viewer keys incl. `find` and `crises`, the weather spell, never cross; `knowledge` travels; *The host's view commands* (a week, the layers shown, a selection) travel as commands. Agrees with §2.9 ("Six per-viewer keys (never over a bridge, §11.3)") and V09 §2.12's rows |
| VRC1T-03 | rendering | FIX | FIXED | §8.4 (h): the extension marker over item 117's rows and sun, `live.festival`, `live.crises`, the weather effects and the boats, "a parity preset draws the map as drawn, under its sheet's sun, in every week"; T-ER-23 and T-ER-24 parity fixtures |
| VRC1T-04 | rendering | FIX | FIXED | §8.4 *Sun through the year*: clamp to [7.1°, 89°], cursor ratio over tan(max(`altitudeCdeg`, 7.1°)), the loader clamping (0°, 90°); T-ER-23's 10° and 0° sheets |
| VRC1T-05 | rendering | FIX | FIXED | §12.1, §12.7 and R12-31 scope the export comfort level to the preset sizes up to A2 at 300 dpi; a custom size past them stays offered (§8.7) |
| VRC1T-06 | rendering | FIX per R2-42 | FIXED | §11.2 `Progress.wait` adds `'verify'`, `'undo'`; `edit`'s `onProgress`; `open`'s comment; V09's `progress.verify` and `progress.undo` lines |
| VRC1T-07 | rendering | FIX | FIXED | §8.8 "the margin is the base settings cell `view.zoomOutMarginStops` (V11 §3.25.5)", no value |
| VRC1T-08 | rendering | FIX | FIXED | T-ER-23 "a water mark whose `season` column holds no ice kind; … a face whose `season` column names no `season.surfaces` row (§8.1 item 8)" |
| VRC1T-09 | scope | FIX per R2-06 | FIXED | §13.2 "the T-ER rows of §8.11, §9.7 and §11.6", §13.8's row the same (no stale range) |
| VRC1T-10 | rendering | FIX | FIXED | §8.2 "(§2.9's key: absent, V09's machine default `AppPrefs.cvdDefault`; V09 §4.21.2)" |
| VRC1T-11 | model | FIX | FIXED | §2.5's comment names S6 on the ground and S13a for a sky island's root |

## 3. The replaced subsections — what changed and what was checked

* **§8.1.** Render tags `crisis.place`, `plan.rubble` appended; item 8's `water.lead` marks cite §8.2's *Water in winter*,
  whose leads keep every reach the removed words listed (2 m per km, mill frontage, 12 m discs) and add a leat's take-off.
* **§8.2.** Roles `find.1`–`find.8`, the crisis roles, `fog`, with their contrast pairs (receipt re-run); slot resolution
  for every shipped sheet and the `under.*` entries (VAL-R1-05); the place table's and the covers' village readings
  (VAL-R1-11, -12); `live.find` for `live.coverage`; *Crisis looks*, *Find*, *Weather effects*; the second-cue table;
  slots 15b and 19b; `cvdVariant`'s default. Seams: §10.2's table and placement (VRC2T-02/-03), §2.9's keys, §6.1's
  stream (VRC2T-17), V09 §4.21.10 (VRC2T-09), V11's `WeatherKind` (agrees).
* **§8.4.** (g) the give-up order (VRC2T-05); (h) the extension marker; (i) the weather light terms (shower, fog with
  depth fade and halos, dust, cloud shadows, shimmer, the vector wash, ≤ 10 % luminance a second); the sun clamp.
* **§8.6.** *The damaged plan* against §2.6 step 7, §6.3, V02 §5.7, V03 §5.6, V04 §5.6, V06 W94 (VRC2T-13, -15).
* **§8.7, §8.8.** The limit bounds with the crisis framing and stop 0 where nothing fits (VEW-r1-05, R2-30); the split
  composition; the canvas need's one order and worked cases (VRC2T-05, -19); Resolution and the Auto loop (VRC2T-08); the
  weather layer; the surrounding ring (VRC2T-16).
* **§8.9, §8.11, §9.5.** Compositors, transfers, `tier: 'ultra'`; T-ER-08's cap fixtures (1 280 × 720, 600 × 480; no phone
  viewport), T-ER-23/-24 parity fixtures, T-ER-25 – T-ER-29; Find among the tools, Fit at stop 0, the legend's crisis and
  Find entries.
* **§11.1 – §11.4, §11.6.** Exports of Find, the looks and the effects; the geo anchor (VRC2T-11); the VTT damage rules
  (VRC2T-06); §11.2's types (R2-10, R2-21 (e), R2-42; VRC2T-12, -18); §11.3's travelling keys and view commands; §11.4's
  only data input with `audience`, `displayNames`, `line` (agrees with §14's `HostContext`, `E_LINE_UNSUPPORTED` declared);
  T-ER-21's item-125 edges.
* **§12.** §12.1's open, advance and export scopes; the ultra bar; §12.5's Auto, Find, crisis and weather budgets; §12.8's
  canvases; R12-35 – R12-38.

## 4. Owner items — rendering's parts

| item | canon routing (rendering) | status |
|---|---|---|
| 120 | §8.2, §9.5, §11.1, §11.2, §12.5 | PRESENT (VRC2T-01, -07, -09, -18) |
| 121 | §8.8, §8.4 (g), §12.1, §12.5, §12.8 | PRESENT (VRC2T-05, -08, -19) |
| 122 | §8.2, §11, §12.5 | PRESENT (VRC2T-02, -10; pipeline VRC2T-03, V12 VRC2T-04) |
| 122 (h)–(i) | §8.8 the ring | PRESENT (model VRC2T-16) |
| 123 | §8.6, §11.1 | PRESENT (VRC2T-06, -13, -15; model VRC2T-14) |
| 124 | §8.2, §8.4, §8.8, §11, §12.5 | PRESENT (VRC2T-17) |
| 125 | §11.3, §11.4 | PRESENT (VRC2T-11) |
| 126 | none (no phone clause may remain) | no phone clause in §8–§12 (the `hit` query's "coarse pointer" is touch, not a phone) |

Each part was read as new design: its producer and every reader (e.g. `find` → `live.find` → §8.2, §11.1; `crises` →
`live.crises`, DR44, §10.2; `decayLevel` → §8.6, §11.1), its lifecycle (view keys outside every digest, undo and log;
the spell session-transient; the damage derived), its edges (T-ER-25 – T-ER-29 and the gaps above) and its agreement with
the other units' parts (V02, V03, V04, V06, V09, V10, V11, V12). No part makes a look the model, the document or its hash.

## 5. Issues

### VRC2T-01 — major · CONFLICT · owner rendering

**Claim.** Find's chip cues repeat with the colours' period, so chips past eight are told apart by nothing (item 120 (d): 'past eight chips the colours repeat and the glyph tells them apart'). §8.2 *Each chip's colour and second cue*: chip k draws in `find.((k − 1) mod 8 + 1)`, its glyph from eight glyphs (circle, square, triangle, diamond, star, cross, hexagon, bar) 'cycling by k', its dash pattern from eight 'by ((k − 1) mod 8)' — so chips k and k + 8 share colour, glyph and dash, while the same sentence claims 'two chips that share a colour past eight differ in glyph'. T-ER-25's 'nine or more chips → each chip told by its glyph and dash' cannot pass.

**Required change.** §8.2's *Each chip's colour and second cue* draws chip k's glyph from nine glyphs — circle, square, triangle, diamond, star, cross, hexagon, bar and ring — by (k − 1) mod 9, its colour by (k − 1) mod 8 and its dash pattern by (k − 1) mod 8 as now, so chips k and k + 8 (one colour, one dash) differ in glyph and no two of the first 72 chips share colour and glyph; T-ER-25's 'nine or more chips' row checks chips 1 and 9 (and 8 and 16) differ in glyph on their pins, in the legend and in V09's panel.

### VRC2T-02 — major · CONFLICT · owner rendering

**Claim.** Crisis looks: the barricades item 122 (b) asks for ('raiders — … barricaded roads'; 'rebellion — street barricades') stand on a way's carriageway, which §8.2 and T-ER-27 forbid. §8.2's *Placement, scale and the land* says a look stands 'never on water, a way's carriageway, a gate's passage or a label's keep-out', while §8.2's look table draws 'a `barricade` across the road' (`blockade`), 'a `barricade` across each approach road' (`raiders`) and 'a `barricade` at each junction of the principal market's streets' (`rebellion`) — the glyph 'a 1.5 px `ink` zig-zag across the way' — and puts the `blockade` city-band `campCluster` 'across each approach road' where §10.2 (d)'s `approachRoads` places camps on the verges. T-ER-27's bar '0 look pixels on water, a carriageway, a gate's passage or a keep-out' fails on any such look (its siege of an unwalled place draws `blockade`; its fixtures test neither `raiders` nor `rebellion`).

**Required change.** §8.2's placement bullet reads '… never on water, a gate's passage or a label's keep-out, and on a way's carriageway only a `barricade` (item 122 (b)'s barricaded roads and street barricades: `blockade`, `raiders`, `rebellion`; §10.2 (d)) — no camp, tent, cart, engine or other part'; the look table's `blockade` city-band cell reads 'a `campCluster` on each approach road's verges (§10.2 (d)'s `approachRoads`)'; T-ER-27's bar reads '0 look pixels on water, a gate's passage or a keep-out, and none on a carriageway but a barricade's', and its fixtures add `raiders` and `rebellion` (each previewed at every rung) beside the unwalled siege's `blockade`.

### VRC2T-03 — major · CONFLICT · owner pipeline

**Claim.** §10.2 *Crisis looks* (d) — the placement rule's home — says 'A look stands only on the ground arena's part 0 and never on water, a way's carriageway, a gate's passage … or a label's keep-out', while its own (f) draws `raiders` 'barricaded roads' and `rebellion` 'street barricades' (item 122 (b)), and §8.2's table draws them as a `barricade` across the way; the two statements of one table contradict each other, and V12's T122-6 measure inherits the carriageway clause (VRC2T-02, VRC2T-04 are its other ends).

**Required change.** §10.2 (d)'s sentence reads '… never on water, a gate's passage (its opening and 4 m along its way each side …) or a label's keep-out, and on a way's carriageway only a `barricade` across it ((f)'s `raiders` barricaded roads and `rebellion` street barricades, §8.2's `blockade` barricade; item 122 (b)) — never a camp or any other part'.

### VRC2T-04 — minor · CONFLICT · owner V12

**Claim.** V12's T122-6 measurement (`crisis.blocked` 0, 'a way's carriageway included (§10.2 (d))') runs every look kind previewed, so the `blockade`, `raiders` and `rebellion` barricades that item 122 (b) and §8.2's look table place across a way fail it (VRC2T-02, VRC2T-03).

**Required change.** V12's T122-6 clause reads '`crisis.blocked` 0 — water, a gate's passage and a label's keep-out, and a way's carriageway save a `barricade` across it (§10.2 (d))', its previews naming `blockade`, `raiders` and `rebellion` among the kinds checked.

### VRC2T-05 — major · CONFLICT · owner rendering

**Claim.** Item 121's 'one order' gives up full precision first, but full precision is not a quality option in the design: §8.4 (g) holds it only on 'a tier whose GPU pass misses §13.4's tolerance' (one-byte pyramids move a far shadow tip ≈ 10 px), and such a tier 're-measured and, still missing, draws rung 3 (J-A68.85)' — never the standard surface. §8.8's *Fitting the need — one order* and Auto's ladder (§8.4 (g), §8.8) now take 'full precision (to the standard surface)' first, and the worked cases draw exactly that: 'a tier that took full precision gives it up first: the reference view is lit on the standard surface at DPR 2 on the high tier … the low-end device at 1 366 × 768 on the standard surface at DPR 1 (… where full precision's 106.5 MB drew the vector rung before)' (receipt `coh_repair_rendering_r2_resolution.out`: 'mid full: d = 1, drawn lit'). On every such tier the lit view then lies outside §13.4's tolerance, against §8.4 (g)'s rule and T-ER-10's bar ('CPU reference = GPU within §13.4's tolerance' on each rung), and differs from every export (the CPU reference).

**Required change.** §8.4 (g) and §8.8 state that the standard surface is no lawful rung on a tier whose GPU pass misses §13.4's tolerance (the only tiers that take full precision): there Auto's ladder and §8.8's fitting order pass over it as they pass over a step that frees nothing — lighting detail is given up from full precision to rung 2's half-resolution global term at full precision, then sharpness, then the light pass (rung 3) — so no lit frame outside §13.4's tolerance is drawn (item 121 (e)'s order kept for every tier that passes the tolerance); §8.8's full-precision worked cases are restated by that rule (the low-end 1 366 × 768 device at full precision on rung 3, as J-A68.89 had it; the high and mid tiers' full-precision reference view at the DPR where 6.5P + 7 MB + Q_f plus the text layer fits, else rung 3), the resolution receipt re-run; T-ER-26 adds a full-precision tier under Auto and under a manual level it cannot hold: every lit frame within §13.4's tolerance.

### VRC2T-06 — major · CONFLICT · owner rendering

**Claim.** §11.1's battle-map damage clauses (item 123 (e), new this round) disagree with item 122 (f) and with V03 §5.3 / V04 §5.6, which own the plan's scenes. §11.1 takes `line_of_sight` 'minus … the outer-wall runs §8.6's damage layer draws broken at the export's drawn week', per storey 'minus … the wall runs and partitions §8.6's damage layer draws broken', an underground building 'less … the runs its damage layer draws broken (V04, by their own thresholds; §8.6)', and 'the stair core a named portal … while its flights stand'. But (a) §8.6 draws a building of a disaster look's district at the higher of the look's `lookLevel` and its own level, so a cosmetic look would remove walls and portals from a VTT scene — against item 122 (f) ('battle-map exports draw them in the image only, never as walls or obstacles') and §11.1's own crisis paragraph; V03 §5.3 and J-V3.138 take walls, portals and lights from the building's OWN level, the look in the image only; (b) V04 §5.6 (2) keeps every `cellarWall` and `cryptWall` run 'still a wall to sight and passage' though drawn damaged, and an underground building's runs on its rock are `cellarWall`; (c) V04 §5.6 (3) / V03 §5.3 keep a broken stair below level 0 as climbable rubble that stays a portal; (d) V03 §5.6 (6) writes no room light for a building in a decay run, which §11.1's `lights` rule does not state.

**Required change.** §11.1's damage clauses read: `line_of_sight` leaves out the wall runs and partitions the building's OWN decay level breaks (V06's `decayLevel` at the export's drawn week; §6.3's comparison) — never a crisis look's `lookLevel`, which the scene's image alone draws (item 122 (f)) —, `cellarWall` and `cryptWall` runs keeping their segments (V04 §5.6 (2)); `portals` none for a door that level breaks (a gap), the stair core a named portal while its flights at or above level 0 stand and a broken flight below level 0 a portal still (climbable rubble, V04 §5.6 (3)); `lights` none for a room of a building in a decay run (V03 §5.6 (6)); the image draws the drawn level (V03 §5.3; J-V3.138); T-ER-28 adds a disaster-look fixture whose battle-map scene's walls and portals equal its own-level scene's.

### VRC2T-07 — major · EDGE-UNDEFINED · owner rendering

**Claim.** Find at a scrubbed week (principle (11): two units' features at their limits). §2.9's `week` is the week drawn, which a user scrubs (item 67), and at a week before the last epoch the renderer draws V06 §3.15.2's history frame — another model (V06 W21; V06's `frontierFor` reads 'the model the view draws (the head, or a history frame)'). §8.2's *Find* re-runs `live.find` 'at every commit, regenerate, undo, redo, advance, load and migration, whenever the key, band, layer or year position changes, and when the view moves' — not when `week` changes — over §11.2's gazetteer match listing, which answers over the head (no week), from an index 'rebuilt once per commit'. So on a scrubbed frame Find glows, pins and counts buildings the frame does not hold and misses ones it holds; no outcome is stated and T-ER-25 tests no `week` change. The same reading is open for §8.2's *Crisis looks* layer, whose placement services run 'over the model' with no frame named.

**Required change.** §8.2's *Find* adds the `week` change to `live.find`'s re-runs and states the outcome at a drawn week whose frame is not the head (V06 §3.15.2): each chip's matches are §11.2's listing restricted to the entities the drawn frame holds — one the frame lacks is not drawn, pinned or counted there, a chip with none reads count 0 for that frame, the head's chips unchanged —, and §8.2's *Crisis looks* places over the model the view draws (the head, or that frame), as V06's `frontierFor` already reads; T-ER-25 adds a scrub to a week before a matched building was built and after a closed use's end; V09 §4.21.10 (7)'s triggers add the `week` change (V09's end).

### VRC2T-08 — major · EDGE-UNDEFINED · owner rendering

**Claim.** Item 121's Auto changes and a device-pixel-ratio change have no application moment while no gesture runs. §8.8: 'A change is applied only when the view settles (*Gestures*, below)'; *Gestures* defines the settle as the animation '120 ms after input stops' a pinch, wheel or pan; and 'A device-pixel-ratio change (the window moved to another monitor) refits d at once, applied at the next settle (T121-7)'. A window dragged to another monitor, or an idle view whose frame-time p95 passes its budget (a weather spell or the path or cursor sun animating, item 124 (b)), is followed by no gesture, so 'the next settle' may never come: the view keeps a DPR fitted for the old screen and Auto never steps down, while T121-7 requires 'a device-pixel-ratio change re-evaluates at once'. T-ER-26 tests the monitor change only mid-gesture.

**Required change.** §8.8 states that the view is settled whenever no gesture runs: a change Auto's loop decides is applied at once when the view is idle (still at most once in 10 s, never during a pan, zoom or drag) and at the gesture's settle otherwise, and a device-pixel-ratio change is refitted and applied at once when idle, at the settle when a gesture runs; T-ER-26 adds a DPR change with the view idle and a loop step-down reached while idle under a weather spell: each applied within one frame of the decision (T121-2, T121-7).

### VRC2T-09 — minor · CONFLICT · owner rendering

**Claim.** §8.2's *Find* starts `live.find` 'While §2.9's per-viewer key `find` holds a chip, or Show gaps is on', and its first mark is the veil 'over the view, cut out at each match's shapes'; so Show gaps with no chip — the state an older view's `thematic: 'coverage'` opens in (§2.9; V09 §4.21.10 (10)) — veils the whole map with nothing lifted. Item 120 (e) and V09 §4.21.10 (6) draw the veil only 'while any chip is on', and V09 disables Show gaps with no kind chip; T-ER-25's 'Show gaps with no kind chip' row states 'no gap drawn' but not the veil.

**Required change.** §8.2's *Find* opens 'While §2.9's per-viewer key `find` holds a chip, the overlay provider `live.find` …' and its no-op sentence reads 'with no chip it delivers nothing — Show gaps reads the kind chips (V09 §4.21.10 (10)), so `gaps` alone draws no veil — the tiles byte-identical'; T-ER-25's row adds 'and no veil' to that case's outcome.

### VRC2T-10 — minor · CONFLICT · owner rendering

**Claim.** A coalition of five or more armies draws two armies identically, against item 122 (h) ('a coalition's armies each keep their own camp and colours'). §8.2 colours an army by `crisis.army.*` 'by the army's index in its coalition, cycling past four' and gives its banner a glyph 'plain, cross, chevron, saltire, cycling by its index in the coalition' — four colours and four glyphs on the same period, so armies i and i + 4 share colour and glyph and nothing tells them apart (item 112's second cue). T-ER-27 tests a two-army coalition only.

**Required change.** §8.2's banner glyphs number five — plain, cross, chevron, saltire and pale — by (i − 1) mod 5 against the four `crisis.army.*` colours by (i − 1) mod 4, so armies i and i + 4 differ in glyph (colour and glyph first repeat together at the 21st army); T-ER-27 adds a five-army coalition whose armies are each told by colour or glyph.

### VRC2T-11 — minor · CONFLICT · owner rendering

**Claim.** §11.1's geo-anchor default (rewritten this round for item 125) reads 'For a dossier-bound map whose dossier carries its partners' true bearings (§7.7 layer 2's *Bearing*; item 125 (b)), the port sets the anchor's `bearingDeg` to the turn of model north that fits the derived gates to those bearings'. The cited home says the opposite: §7.7 layer 2's *Bearing* takes a partner's bearing from the user's setting, else a draw on `gate.pick`, 'no host input gives one', and 'No input sends a true bearing after creation (item 125 (a)): … the geo anchor's `bearingDeg` (§11.1) stays a user setting'; item 125 (b) makes 'the neighbours' bearings … our generator's defaults or the user's settings'. §11.1's rule has no producer and contradicts §7.7.

**Required change.** §11.1's sentence reads 'No input gives a true bearing (§7.7 layer 2's *Bearing*; item 125 (a)–(b)), so a dossier-bound map's anchor takes the same default (0°, 0°, 0°) and stays a user setting; no geometry moves for it.'

### VRC2T-12 — minor · WIRING · owner rendering

**Claim.** `ExportOpts` is read and extended but declared nowhere in the set: §11.1 reads `ExportOpts.find` (new this round) and `ExportOpts.knowledge`, §11.2's `export(h, fmt, opts?: ExportOpts & {…})`, §11.4's `exportDocument(doc, fmt, opts?: ExportOpts)` and V08 W81 / §3.14 (`ExportOpts.knowledge`) use it, and §14's `Exporter<Opts>` is generic — no `interface ExportOpts` exists (repair-r2-rendering's own hand-off records the gap). The frame, scale, DPI, layers and sheet §8.7 and §8.9's raster-export request carry have no typed home on the API.

**Required change.** §11.2 declares once `interface ExportOpts` with every member the set reads — `knowledge?: Admission` (§11.1 *Knowledge*; V08 §3.14), `find?: boolean` (§11.1: absent = drawn on a picture export, off on a battle map), and the frame, scale, DPI, layers, sheet and post operations §8.7 and §8.9's raster-export request carry, each with its default — and §11.4's `exportDocument`, §14's `Exporter` registry and V08 W81 cite it.

### VRC2T-13 — minor · CONFLICT · owner rendering

**Claim.** §8.6 restates item 123's comparison as 'level ≥ t, the one comparison every reader makes'; its home, §6.3 *Plan damage*, says 'the element shows damaged exactly while the level is above 0 and at least t — a level of 0 damages nothing … whatever its kinds' ranges' (V03 §5.6 (2) (a) the same). V11's `DamageElementRow.range` allows lo = 0, so an element whose t is 0 is damaged at level 0 by §8.6's wording, breaking the no-op pin `item123.damage` (T123-7) that §8.6 states two paragraphs later.

**Required change.** §8.6's parenthesis reads '(V06's `decayLevel`; damaged while the level is above 0 and at least t — §6.3's one comparison every reader makes)'.

### VRC2T-14 — minor · CONFLICT · owner model

**Claim.** §2.6 step 7's damage layer says the decay level 'shows damaged every element whose t it has reached (level ≥ t), the one comparison every reader makes' with t in [0, 1), while §6.3 *Plan damage* states the comparison as 'above 0 and at least t' and V11 allows lo = 0; at t = 0 the step-7 wording damages an element at level 0, against its own 'a building never decayed (level 0) draws byte-identically' (VRC2T-13's model end).

**Required change.** §2.6 step 7 reads '… shows damaged every element whose t it has reached while above 0 (level > 0 and level ≥ t, §6.3's one comparison every reader makes) …'.

### VRC2T-15 — minor · WIRING · owner rendering

**Claim.** §8.6 draws 'each repaired element … in item 114's patch material' after a restoration but never says which elements are repaired; the predicate is V06's `decayPeak` (V06 §3.23; V03 §5.6 (2) (b): 'an element whose threshold lies above the own level and at or below `decayPeak` is drawn repaired … until the plan itself changes'; 'A look leaves no patch'), and V06's W94 lists '§8.6's drawing and §11.1's battle maps' among `decayPeak`'s readers. The base drawing's home reads only `decayLevel`, so W94's reader end at §8.6 is one-ended.

**Required change.** §8.6's restoration sentence reads 'A restoration lowers the level and the damage leaves in reverse threshold order: an element whose threshold lies above the own level and at or below V06's `decayPeak` is drawn repaired, in item 114's patch material (…), until the plan changes (a rebuild, a demolition, a successor on the trace); a look leaves no patch (`decayPeak` never reads a look; V03 §5.6 (2) (b))'.

### VRC2T-16 — minor · CONFLICT · owner model

**Claim.** Whether the surrounding ring's massed camp marks widen item 116's limit is stated two ways. §8.8 *The surrounding ring* (and T-ER-08: 'the ring's arcs among them') says the arcs 'count among the camps the crisis framing takes in (§2.9), so the limit shows them'; §2.9 *The crisis framing* defines the bounds of town and camps as 'the union of `bounds` … and every camp the looks place, §10.2's placement inside the frame and its margin', the ring (outside the margin) only 'drawn as §8.8's massed marks', and §10.2 (g) speaks of 'the placed camps' bounds'. Read by §2.9, the city-band ring may lie outside the view at the limit.

**Required change.** §2.9's *The crisis framing* parenthesis reads '(the union of `bounds`, …, every camp the looks place — §10.2's placement inside the frame and its margin — and the ring's massed camp marks beyond it, §8.8's *The surrounding ring*)'; §10.2 (g)'s 'The placed camps' bounds' reads 'The placed camps' and the ring arcs' bounds' (pipeline's end).

### VRC2T-17 — minor · TERM · owner rendering

**Claim.** §8.2's *Weather effects* takes the spell's kind 'from V11's climate weather columns for the climate row at the view's week'; §2.9 keeps `week` (the absolute week drawn, against which crisis looks are read) and `yearWeek` (the year position) apart and says the two are never interchanged, and §6.1's weather stream draws the kind 'for the week band of §2.9's `yearWeek`'. 'The view's week' names the wrong key.

**Required change.** §8.2's *Weather effects* reads '… its kind from V11's climate weather columns for the climate row at the year position (§2.9's `yearWeek`; §6.1's stream) …'.

### VRC2T-18 — minor · ELEGANCE · owner rendering

**Claim.** §11.2 declares `type FindLayer = 'ground'|'underground'|'sky'` for the gazetteer's and Find's `layer` fields — the same three values as the model's `Layer` (§2.1: `layer ∈ {underground, ground, sky}`), the type `PlatKey.layer`, `setLayer` and `TileRasterOpts.layers` already use; no rule, value or lifecycle separates them (R2-13's class: a type the base declares is cited, never declared twice). V10 §2.13's `FindAnswer` repeats the union inline twice.

**Required change.** §11.2 drops `FindLayer` and types `GazetteerAnswer.rows[].layer`, `classes[].layers[].layer` and `matches[].layers[].layer` as `Layer` (§2.1: Find's Ground, Below and Sky); V10 §2.13's `FindAnswer` cites §2.1's `Layer` for its two inline unions (V10's end).

### VRC2T-19 — minor · CONFLICT · owner rendering

**Claim.** The repair's vetoable design calls on items 121, 122 (i) and 124 are recorded in no J row, and one contradicts a standing row. J-A68.89 (rationale Part A) still gives its worked case 'the reference view lit … at 1.5 on the mid tier, 123.25 MB', while §8.8 now lights the mid tier's reference view (device ratio 2) at DPR 1 with item 121's text layer (103.75 MB) and gives full precision up first. The split composition and its mid-tier consequence, full precision first in the one order, the loop's 60-s doubling hold, the text layer stepping down where nothing fits, the ultra tier's bar (≥ 8 GB, ≤ 8 ms probe), the weather layer's coverage weighting and the ring outside the margin live only in repair-r2-rendering.md's 'Interpretations and judgment calls 1–7'; J-A121.01 records placement and bars only.

**Required change.** Rationale Part A gains rows (J-A121.02 onward, with their judgment-index lines) recording each of those calls with the alternative it was chosen over, and J-A68.89's worked mid-tier clause reads 'at 1.5 on the mid tier on a device of ratio 1.5, 123.25 MB (at the reference ratio 2, DPR 1 with item 121's text layer, 103.75 MB, §8.8)'.

## 6. CONFIRMED versus PLAUSIBLE

**CONFIRMED (read or executed):** the live and pre-round hashes; the 19 replaced subsections' word diffs read whole and every
deleted run traced; the 16 round-1 verdicts against the live lines; each quoted contradiction of VRC2T-01 – VRC2T-19 (both
texts read: §8.2, §8.4, §8.6, §8.8, §11.1, §11.2 against §2.6, §2.9, §6.1, §6.3, §7.7, §10.2, J-A68.89, V03 §5.3/§5.6, V04
§5.6, V06 W94, V09 §4.21.10, V10 §2.13, V12 T122-6); `ExportOpts` and a second `Layer` type by grep over the set; the
receipts `coh_repair_rendering_r2_resolution` and `_roles` re-run byte-identical; doc_checks exit 0 (provisional); the word
counts (59 158 / 80 190 / 91 201).
**PLAUSIBLE:** the outcomes VRC2T-05 (a lit frame outside §13.4's tolerance on a full-precision tier), VRC2T-07 (a glow on
an entity a scrubbed frame lacks) and VRC2T-08 (a DPR change never applied while idle) are read from the text's rules and
the absence of a stated exception, not executed.
