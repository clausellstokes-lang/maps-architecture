# Rewrite — base part rendering (§8, §9, §11, §12)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-rendering; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/rewrite-rendering`, 2026-09-29)
- P1 inputs gathered (sections, canon unit, f items 405–481/572/583 and the touching items with their 70 BCR texts, g 102/109–112, edges, agreement, elegance, wiring): done
- P2 §8 new text: done — `new/base/rendering/01-s08-rendering-and-the-style-system.md`
- P3 §9 new text: done — `new/base/rendering/02-s09-labels-and-map-furniture.md`
- P4 §11 new text: done — `new/base/rendering/03-s11-export-and-interop.md`
- P5 §12 new text: done — `new/base/rendering/04-s12-performance-budgets.md`
- P6 report: done

Base read at md5 01fea21f (L9515–11046, 11047–11434, 11889–12323, 12324–12915). Each file starts with its section's
heading line exactly as today. Method: the four sections were copied and edited in place by exact-match patches
(`scratchpad/.../rep.py`, each patch asserting a unique match), so every sentence not named below is the original's.

## 1. Sizes and the shrink goal (principle (9))

| section | words before | words after | KB before | KB after | words deleted | words inserted |
|---|---|---|---|---|---|---|
| §8 | 31 909 | 36 725 | 186.4 | 215.1 | 596 | 5 412 |
| §9 | 6 554 | 7 160 | 39.1 | 42.5 | 227 | 833 |
| §11 | 9 320 | 13 478 | 56.9 | 82.5 | 495 | 4 653 |
| §12 | 11 375 | 12 641 | 62.3 | 68.4 | 1 840 | 3 106 |
| **total** | **59 158** | **70 004** | **344.7** | **408.5** | **3 158** | **14 004** |

(word diff by `difflib` over whitespace tokens.) **The goal band (35 495–44 368 words) is not met: the part grew by
18 %.** Words removed, by source: restatement ≈ 1 250 (the nine REFERENCE items, the seventeen RESTATEMENTS and the
sixteen INTERNAL DUPLICATIONS replaced by pointers), narration ≈ 170 (NARRATION-001–010), duplicated mechanisms
≈ 1 550 (E-18's ≈ 25 measurement-and-fallback clauses of §12 folded into §12.10's register; E-17's re-stated admission;
E-19's per-viewer key list), verbose prose ≈ 190 (local rewording only). Words added, all ruled content: file f items
and their BCR texts ≈ 8 900 (§11.1's item-110 GeoJSON/VTT/3-D clauses and §11.2's API — items 447–471, 572, 583 — are
≈ 5 900 of them), g items 110–112 ≈ 900 (drawing, colour-deficiency cues and variants, oasis), wiring closures ≈ 700
(LabelStyle, ThematicRow, PostOp, render-tag table, role values, band entry stops, *Layers*), the edge tables ≈ 1 700
(T-ER-01–21) and the register ≈ 1 800 net. What holds the size: the part is dense normative text whose every sentence is
an inventoried fact; a deep verbose-prose pass (rewording every paragraph) was not made in this lane — its potential is
estimated at 10–15 % of the original, and it is the one principle-(9) item not delivered here (a missed shrink is not a
defect by the brief; the verifier may direct it).

## 2. Mapping table

Every one of the 704 inventory ids is mapped in §10 of this file (generated from `inventory-rendering.json` and
`canon.json → by_inventory_id`): 551 facts stay at their subsection (§8.5's heading now ends "first map"), 144 terms
stay at their subsection with their glossary home, 9 REFERENCE items point to their homes, 30 measurement clauses of
§12 map to their subsection plus their §12.10 register row, and four items map to a removal ruling (below). None is
missing.

## 3. Elegance rulings applied (equivalence lists ticked)

* **E-16** (§8.2): post operations renamed `wash` (whole-tile tint, the condition overlay's settlement-wide tint
  included) and `edgeFade` (the view's vignette); programs keep `tint` and `vignette`; the role `lights` → `glow`
  (§8.1, §8.2 roles and values table, presets, §8.4 (g), §8.5 room lights, §11.1 VTT colour).
  ✓ a program runs per mark in its slot, a post operation once per tile base after the light (§8.2 *Post operations*,
  §8.4 (f)); ✓ the painterly spotlight vignette is the `vignette` program (§8.2 programs list, *Relief tier*);
  ✓ the two roles' uses kept apart: `light` the glyph tone, `glow` the sprite.
* **E-17** (§9.2): one admission function `admit(knownTo, key, band)`, its readers listed (S13b, thematic rows, concealed
  marks and lights, legend, `live.voids`, the reader, every export); §8.2, §9.5, §11.1 and §11.2 cite it.
  ✓ each reader's band kept (the view's/stop's, the export's, the city band when band-less); ✓ `viewAs` (V09, J-V9.86)
  and `admitAs` / `filtered` (V10) lower the key the function reads (§9.2, §11.2).
* **E-18** (§12): §12.10's register, 29 rows (budget, measured at, pass, pre-decided change, owner's veto); §12.1,
  §12.3–§12.8 cite rows. ✓ every bar, milestone and fallback value (each moved clause's values are in its row; R12-1–R12-28);
  ✓ D-18's owner-veto declarations (§12.3's and §12.5's declared misses untouched; the veto column); ✓ the per-rung
  laws (§12.3, §12.5 untouched). Rows R12-11, R12-12 and R12-24 had no stated fallback; they take R12-10's rule (the
  row re-declared at the measured p95 for the owner's veto) — an undefined edge defined, recorded here.
* **E-19** (§8–§12): one home each — `surfaceTopCm` (the `DisplayList` comment), every caster (§8.1 item 2), rungs
  1–2 albedo (§8.2 *Paint programs*; §8.2 *lit on the reference backend* and §8.4 *Sun* cite it), never-lit overlays
  (§8.2 layer order; §8.4 (f) and §9.4 cite), light host (§8.1 item 7; §8.4 (b), §11.1 cite), band-less admission
  (§9.2), fixed sun (`SunSpec`), canvas formulae (§8.8; §12.8 cites), 24-B index and sizes (§8.1 item 6), frozen copies
  (§12.4's merge row, now with the after-edits and METROPOLIS figures; §12.8 cites), port refusal (§7.7 item 15 / §1.1),
  one-way rule (§11.3), transient list (§8.1 item 6). §11.3 reads "every view key of §2.9 travels … except the pointer
  and `underlay`". ✓ `time`'s `sim.advance` and the host's `week` kept (§11.3).

No other unification was made.

## 4. File f and g items applied

Applied at their sections (each marked in the text with its item number and milestone): 405, 406, 407, 408, 409, 410,
411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 447, 448, 449, 450, 451, 452 (as corrected by
V04-ICONF-3), 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473,
474, 475, 476, 477, 478, 480, 481, 572, 583. Parts of the touching items: 202 (§11.4's refusal/routing cite), 223
(§12.7 admission; R12-22), 232 (§12.8's cache), 245 and 575 (§8.2's retaining and `decayed` rows; §11.1's runs), 278
(§11.1 unexcavated rule; §11.3 view keys), 296 (§8.4 *Sun*), 365 (skeleton `proposedBy`), 372 (`alternatives`
comment), 391 (`SunSpec.latitudeDeg`, DR29), 482 (§8.3 plan-draw row), 518 (`live.ghost` AI mark), 568 (nothing in
this part: §16's totals). **Item 479**: its target sentence (who leaves) is §4.11's epoch order (c), not §12.6's — no
rendering text; cross-part note to pipeline. g items: 102 (§8.4's model-sampler sentence; `live.shade`; §12.4's
daylight row and R12-29 — its (g) budget per rung), 109 (`ruinMasonry`, `unexcavated`), 110 (programs `retaining`,
`raisedWay`, `way.stair`; slots 9b/12/13/14; casters and slabs; symbolisation rows; census row; exports), 111 (§8.2
oasis drawing and spring symbol, §9.1 labels, §11.1 `oasis`/`spring`, T-ER-10–12), 112 (§8.2 second-cue table,
`StyleSheet.variants`, `CvdVariant`, the census row; §9.5 legend cues).

## 5. Conflicts, findings and wiring closed

RIC-01 (parchment's status and chroma), RIC-02 (light by family), RIC-03 (≈ 1.0 m at 100 m), RIC-04 (one list of
document formats, the skeleton in it and among the generation-worker formats), RIC-05 (§12.5's WebGL2 sentence), RXC-01
(`ObstacleSource` kind `room` cited at §8.1, §8.5, §9.2), RXC-02 (§8.4 (g) names itself F-LIGHT's triggers), SCOPE-C06
(J-C1, J-C2 cited at §8.2), V01-XCONF-2 (one VTT rule, §11.1), V04-ICONF-3 (§11.1's underground scene), V08-XCONF-5
(§11.4's export bundle). RWG-01 (`pinDirCdeg`, `pinLines`), RWG-02 (values for `ambience`, `light`, `glow`, `sand`,
`plank`, `grid`, `snow`, `tree@autumn`, the wall-material roles; the `@night` derivation; matrix rows for snow, sand,
plank, grid — ΔE2000 computed on the sRGB values), RWG-03 (m_k, `ZoomStop`, band entry stops 0/16/20/24), RWG-04
(`LabelStyle`, `ThematicRow`, `PostOp` declared; `budgets`/`DetailBudget` removed), RWG-05 (`graphic` removed; `tintKey`
wired to S14 and `tint`/`outlineMix`; `castsShadowOnto` read by rung 3's composition; `outlineMix` the tint rule's 0.3;
FieldRaster `custom` → `daylightShare`, `live.shade`'s), RWG-06 (§11.1 *Layers*), RWG-07 (§8.2's end: registration
through §14's registry — §10.3's end is pipeline's), RWG-08 (render-tag table at §8.1 item 5; `OrderSlot.seamClose`),
RWG-09 (gate gap, gate blocks and pier widths in §8.3's MFCG row). RTD-01–04 and the six glossary replacements
(G-lot, G-refview, G-firstmap, G-shadows, G-postop, G-reservedparch); RBR-01–03; REDGE-01–04 (§9.1 region spine,
§9.2 `knownTo` and priority lists, §8.2 island alpha). `DisplayDelta.rasters` added so a provider's field raster has
a carrier (the §8.9 delta row already named it). J121: §11.3's origin, accounts and audiences, AI key/relay,
assistant and tier, §11.5's accounts/plans/backups and §11.2's clerk are read as SettlementForge's decisions.

**Removal rulings (principle (7)).** `StyleSheet.family 'graphic'` (no family row, preset or reader), `StyleSheet.budgets`
with `DetailBudget` (no content, reader or test; the band's detail is its programs and §8.10's rank thinning, the tier
acting through the tile DPR and the light rung), FieldRaster `'custom'` (no producer; replaced by `daylightShare`, which
has one). **Name disambiguations** (one term per concept, not unifications): V01's raised-way program is the base's
`raisedWay` (the MFCG under-copy keeps `raised`); V04's underground masonry program is `ruinMasonry` (the ruined
building's `ruin` keeps its name); V04's unexcavated style is the `unexcavated` program.

## 6. Renumberings

None. Added subsections: §8.11, §9.7, §11.6 (edge tables), §12.10 (the register). §8.5's heading ends "first map"
(G-firstmap). New ids: T-ER-01–T-ER-21 (unique across the set, grepped), R12-1–R12-29 (section-local register rows).

## 7. Edges and combinations

§8.11 (T-ER-01–12), §9.7 (T-ER-13–18), §11.6 (T-ER-19–21) define every UNDEFINED and UNTESTED edge the catalogue routes
to rendering (37 + 11) and the 38 owned combinations (grouped: light × feature T-ER-10, labels × feature T-ER-11,
export × feature T-ER-12), each with its outcome, its §5 rung and its test.

## 8. Cross-part notes (what another unit must change)

* **scope (§14):** `ObstacleSource.protectedExtents` gains kind `room`, implemented by `@plat/render` from the plan
  draw's room-label marks (RXC-01); if §14 lists `LabelTable` columns, add `pinDirCdeg`, `pinLines`; the
  `LiveLayerProvider` registry lists `live.shade`, `live.links`, `live.coverage`, `live.voids`, `live.history` and
  `live.people`'s registration (RWG-07); the keymap's PageUp/PageDown (item 413's V04 BCR-10 part); T1's time card and the
  app's timeline and history panel (item 458 (b)); `@plat/clerk` (item 518). **(§13):** register T-ER-01–21 in §13.2 by
  pointer (their bars are at §8.11/§9.7/§11.6); g item 112's style check (the simulated-deficiency contrast test with its
  table threshold and id) that §8.2 and §8.3 cite; the band entry stops' B-ZOOM pop check (RWG-03). **(§16):** item 474
  (d)'s M5 row and effort line; the daylight term's measurement at M2b (R12-29); item 568's totals.
* **model (§2.9):** view keys `cvdVariant` (`'none'`|`'protan'`|`'deutan'`|`'tritan'`, per viewer; g item 112),
  `showUnexcavated` (item 278 (a)), `roomNumbers` (item 420's §2.9 part); `docId`'s comment (item 459). **(§2.7):**
  `Enceinte.walkCm`'s reader is §11.1's glTF wall top (W-FLD-05); the oasis's spring and grove records S1 writes (g 111's
  wiring consequence) are read by §8.2, §9.1 and §11.1.
* **determinism:** §5.2 F-LIGHT's detection cites "§8.4 (g)'s and §8.8's triggers" (RXC-02); F-EDIT's messages are
  `MsgRef`s (items 463, 470 (c)); §5.4 `GenerationReport.prefix` (470 (d)); §6.1 `island.place` and §6.3's sky-access
  anchor (476); §6.3's host-given `docId` (459); §7.3 item 10's committed forms of variations (461) and item 9 (d)'s
  dwelling closure (372); §7.1's `proposedBy` through `generate` and the skeleton (365); §7.7's `Intent.latitudeDeg` with
  DR29 (391).
* **pipeline:** §4.11 order (c) — "who leaves is the departure matching's" (item 479); §10.3 names `live.people` and its
  registration (RWG-07); §10.4's naming feature `formerWall` (409 (c)); II.5's per-district regeneration figure (474 (c));
  II.7.1 cites §11.1 *Layers* for `exportSeparately` (RWG-06); §4.5's daylight term cites §12.4's row and R12-29; if
  W-IF-07 removes door (4), §11.2's `registerProvider` and §11.4's door (4) must go with it.
* **V01:** its raised-way program is the base's `raisedWay`; `retaining` and `way.stair` are defined in base §8.2
  (V01 cites); V1-5.3's VTT row cites §11.1 (V01-XCONF-2). **V04:** its underground `ruin` program is `ruinMasonry` and
  its unexcavated style the `unexcavated` program (§8.2). **V08:** §5.4 states the bundle call and §7 its test
  (V08-XCONF-5; base §11.4 cites). **V09:** the view settings offer `cvdVariant`. **V02:** V02-WGAP-1's cells land in
  §8.2 (its editor names them). **V10:** §2.13 stays the home of the reader kinds' types (base §11.2 cites).

## 9. CONFIRMED versus PLAUSIBLE

CONFIRMED (executed): every patch matched its original sentence exactly once (the patch tool's counts); the new role
values' contrast pairs were computed (CIEDE2000 on sRGB); the T-ER namespace is unused elsewhere; the word counts and
the diff. PLAUSIBLE (reasoning): the daylight term's cost (≈ 20 ns per cell and sun) and the band entry stops, both
marked PLAUSIBLE or calibratable in the text; that no fact was lost (the mapping table is by inventory subsection, not a
per-sentence re-read by a second reader).

## 10. The mapping table (every inventory id)

| inventory id | kind | old § | new home |
|---|---|---|---|
| RENDERING-0001 | type | §8.1 | §8.1 |
| RENDERING-0002 | type | §8.1 | §8.1 |
| RENDERING-0003 | interface | §8.1 | §8.1 |
| RENDERING-0004 | rule | §8.1 | §8.1 |
| RENDERING-0005 | rule | §8.1 | §8.1 |
| RENDERING-0006 | rule | §8.1 | §8.1 |
| RENDERING-0007 | rule | §8.1 | §8.1 |
| RENDERING-0008 | rule | §8.1 | §8.1 |
| RENDERING-0009 | interface | §8.1 | §8.1 |
| RENDERING-0010 | interface | §8.1 | §8.1 |
| RENDERING-0011 | interface | §8.1 | §8.1 |
| RENDERING-0012 | interface | §8.1 | §8.1 |
| RENDERING-0013 | rule | §8.1 | §8.1 |
| RENDERING-0014 | interface | §8.1 | §8.1 |
| RENDERING-0015 | interface | §8.1 | §8.1 |
| RENDERING-0016 | interface | §8.1 | §8.1 |
| RENDERING-0017 | rule | §8.1 | §8.1 |
| RENDERING-0018 | interface | §8.1 | §8.1 |
| RENDERING-0019 | interface | §8.1 | §8.1 |
| RENDERING-0020 | rule | §8.1 | §8.1 |
| RENDERING-0021 | rule | §8.1 | §8.1 |
| RENDERING-0022 | rule | §8.1 | §8.1 |
| RENDERING-0023 | rule | §8.1 | §8.1 |
| RENDERING-0024 | rule | §8.1 | §8.1 |
| RENDERING-0025 | rule | §8.1 | §8.1 |
| RENDERING-0026 | rule | §8.1 | §8.1 |
| RENDERING-0027 | rule | §8.1 | §8.1 |
| RENDERING-0028 | rule | §8.1 | §8.1 |
| RENDERING-0029 | rule | §8.1 | §8.1 |
| RENDERING-0030 | rule | §8.1 | §8.1 |
| RENDERING-0031 | rule | §8.1 | §8.1 |
| RENDERING-0032 | rule | §8.1 | §8.1 |
| RENDERING-0033 | mechanism | §8.1 | §8.1 |
| RENDERING-0034 | rule | §8.1 | §8.1 |
| RENDERING-0035 | mechanism | §8.1 | §8.1 |
| RENDERING-0036 | term | §8.1 | §8.1 (term; glossary home §8.1) |
| RENDERING-0037 | term | §8.1 | §8.1 (term; glossary home §8.1) |
| RENDERING-0038 | rule | §8.1 | §8.1 |
| RENDERING-0039 | budget | §8.1 | §8.1 |
| RENDERING-0040 | rule | §8.1 | §8.1 |
| RENDERING-0041 | rule | §8.1 | §8.1 |
| RENDERING-0042 | mechanism | §8.1 | §8.1 |
| RENDERING-0043 | rule | §8.1 | §8.1 |
| RENDERING-0044 | rule | §8.1 | §8.1 |
| RENDERING-0045 | decision | §8.1 | §8.1 |
| RENDERING-0046 | interface | §8.2 | §8.2 (family `graphic` and `budgets` removed: RWG-04/05 ruling) |
| RENDERING-0047 | term | §8.2 | §8.2 — `graphic` removed (RWG-05 ruling: no preset or family row reads it) |
| RENDERING-0048 | type | §8.2 | §8.5 — `budgets`/DetailBudget removed (RWG-04 ruling: nothing read it; detail is programs + rank thinning; tier acts via DPR and light rung) |
| RENDERING-0049 | interface | §8.2 | §8.2 |
| RENDERING-0050 | interface | §8.2 | §8.2 |
| RENDERING-0051 | interface | §8.2 | §8.2 |
| RENDERING-0052 | term | §8.2 | §8.2 (term; glossary home §8.2) |
| RENDERING-0053 | rule | §8.2 | §8.2 |
| RENDERING-0054 | rule | §8.2 | §8.2 |
| RENDERING-0055 | table | §8.2 | §8.2 |
| RENDERING-0056 | mechanism | §8.2 | §8.2 |
| RENDERING-0057 | mechanism | §8.2 | §8.2 |
| RENDERING-0058 | algorithm | §8.2 | §8.2 |
| RENDERING-0059 | number | §8.2 | §8.2 |
| RENDERING-0060 | test | §8.2 | §8.2 |
| RENDERING-0061 | table | §8.2 | §8.2 |
| RENDERING-0062 | rule | §8.2 | §8.2 |
| RENDERING-0063 | table | §8.2 | §8.2 |
| RENDERING-0064 | rule | §8.2 | §8.2 |
| RENDERING-0065 | rule | §8.2 | §8.2 |
| RENDERING-0066 | test | §8.2 | §8.2 |
| RENDERING-0067 | rule | §8.2 | §8.2 |
| RENDERING-0068 | table | §8.2 | §8.2 |
| RENDERING-0069 | rule | §8.2 | §8.2 |
| RENDERING-0070 | constant | §8.2 | §8.2 |
| RENDERING-0071 | constant | §8.2 | §8.2 |
| RENDERING-0072 | constant | §8.2 | §8.2 |
| RENDERING-0073 | constant | §8.2 | §8.2 |
| RENDERING-0074 | constant | §8.2 | §8.2 |
| RENDERING-0075 | constant | §8.2 | §8.2 |
| RENDERING-0076 | constant | §8.2 | §8.2 |
| RENDERING-0077 | constant | §8.2 | §8.2 |
| RENDERING-0078 | constant | §8.2 | §8.2 |
| RENDERING-0079 | constant | §8.2 | §8.2 |
| RENDERING-0080 | rule | §8.2 | §8.2 |
| RENDERING-0081 | constant | §8.2 | §8.2 |
| RENDERING-0082 | constant | §8.2 | §8.2 |
| RENDERING-0083 | constant | §8.2 | §8.2 |
| RENDERING-0084 | constant | §8.2 | §8.2 |
| RENDERING-0085 | constant | §8.2 | §8.2 |
| RENDERING-0086 | rule | §8.2 | §8.2 |
| RENDERING-0087 | rule | §8.2 | §8.2 |
| RENDERING-0088 | mechanism | §8.2 | §8.2 |
| RENDERING-0089 | rule | §8.2 | §8.2 |
| RENDERING-0090 | rule | §8.2 | §8.2 |
| RENDERING-0091 | rule | §8.2 | §8.2 |
| RENDERING-0092 | rule | §8.2 | §8.2 |
| RENDERING-0093 | rule | §8.2 | §8.2 |
| RENDERING-0094 | rule | §8.2 | §8.2 |
| RENDERING-0095 | rule | §8.2 | §8.2 |
| RENDERING-0096 | rule | §8.2 | §8.2 |
| RENDERING-0097 | rule | §8.2 | §8.2 |
| RENDERING-0098 | rule | §8.2 | §8.2 |
| RENDERING-0099 | rule | §8.2 | §8.2 |
| RENDERING-0100 | rule | §8.2 | §8.2 |
| RENDERING-0101 | rule | §8.2 | §8.2 |
| RENDERING-0102 | rule | §8.2 | §8.2 |
| RENDERING-0103 | mechanism | §8.2 | §8.2 |
| RENDERING-0104 | rule | §8.2 | §8.2 |
| RENDERING-0105 | algorithm | §8.2 | §8.2 |
| RENDERING-0106 | constant | §8.2 | §8.2 |
| RENDERING-0107 | rule | §8.2 | §8.2 |
| RENDERING-0108 | table | §8.2 | §8.2 |
| RENDERING-0109 | rule | §8.2 | §8.2 |
| RENDERING-0110 | mechanism | §8.2 | §8.2 |
| RENDERING-0111 | interface | §8.2 | §8.2 |
| RENDERING-0112 | rule | §8.2 | §8.2 |
| RENDERING-0113 | rule | §8.2 | §8.2 |
| RENDERING-0114 | rule | §8.2 | §8.2 |
| RENDERING-0115 | rule | §8.2 | §8.2 |
| RENDERING-0116 | mechanism | §8.2 | §8.2 |
| RENDERING-0117 | table | §8.2 | §8.2 |
| RENDERING-0118 | table | §8.2 | §8.2 |
| RENDERING-0119 | table | §8.2 | §8.2 |
| RENDERING-0120 | table | §8.2 | §8.2 |
| RENDERING-0121 | table | §8.2 | §8.2 |
| RENDERING-0122 | table | §8.2 | §8.2 |
| RENDERING-0123 | table | §8.2 | §8.2 |
| RENDERING-0124 | table | §8.2 | §8.2 |
| RENDERING-0125 | table | §8.2 | §8.2 |
| RENDERING-0126 | table | §8.2 | §8.2 |
| RENDERING-0127 | table | §8.2 | §8.2 |
| RENDERING-0128 | table | §8.2 | §8.2 |
| RENDERING-0129 | table | §8.2 | §8.2 |
| RENDERING-0130 | table | §8.2 | §8.2 |
| RENDERING-0131 | table | §8.2 | §8.2 |
| RENDERING-0132 | table | §8.2 | §8.2 |
| RENDERING-0133 | table | §8.2 | §8.2 |
| RENDERING-0134 | table | §8.2 | §8.2 |
| RENDERING-0135 | table | §8.2 | §8.2 |
| RENDERING-0136 | table | §8.2 | §8.2 |
| RENDERING-0137 | table | §8.2 | §8.2 |
| RENDERING-0138 | table | §8.2 | §8.2 |
| RENDERING-0139 | table | §8.2 | §8.2 |
| RENDERING-0140 | table | §8.2 | §8.2 |
| RENDERING-0141 | table | §8.2 | §8.2 |
| RENDERING-0142 | table | §8.2 | §8.2 |
| RENDERING-0143 | table | §8.2 | §8.2 |
| RENDERING-0144 | table | §8.2 | §8.2 |
| RENDERING-0145 | table | §8.2 | §8.2 |
| RENDERING-0146 | rule | §8.2 | §8.2 |
| RENDERING-0147 | rule | §8.2 | §8.2 |
| RENDERING-0148 | rule | §8.2 | §8.2 |
| RENDERING-0149 | rule | §8.2 | §8.2 |
| RENDERING-0150 | table | §8.2 | §8.2 |
| RENDERING-0151 | rule | §8.2 | §8.2 |
| RENDERING-0152 | rule | §8.2 | §8.2 |
| RENDERING-0153 | algorithm | §8.2 | §8.2 |
| RENDERING-0154 | rule | §8.2 | §8.2 |
| RENDERING-0155 | test | §8.2 | §8.2 |
| RENDERING-0156 | rule | §8.2 | §8.2 |
| RENDERING-0157 | table | §8.2 | §8.2 |
| RENDERING-0158 | test | §8.2 | §8.2 |
| RENDERING-0159 | rule | §8.2 | referenced to scope §17.2 |
| RENDERING-0160 | rule | §8.2 | §8.2 |
| RENDERING-0161 | rule | §8.2 | §8.2 |
| RENDERING-0162 | constant | §8.2 | §8.2 |
| RENDERING-0163 | test | §8.2 | §8.2 |
| RENDERING-0164 | rule | §8.3 | §8.3 |
| RENDERING-0165 | rule | §8.3 | §8.3 |
| RENDERING-0166 | test | §8.3 | §8.3 |
| RENDERING-0167 | rule | §8.3 | §8.3 |
| RENDERING-0168 | test | §8.3 | §8.3 |
| RENDERING-0169 | test | §8.3 | §8.3 |
| RENDERING-0170 | test | §8.3 | §8.3 |
| RENDERING-0171 | test | §8.3 | §8.3 |
| RENDERING-0172 | test | §8.3 | §8.3 |
| RENDERING-0173 | test | §8.3 | §8.3 |
| RENDERING-0174 | test | §8.3 | §8.3 |
| RENDERING-0175 | test | §8.3 | §8.3 |
| RENDERING-0176 | test | §8.3 | §8.3 |
| RENDERING-0177 | test | §8.3 | §8.3 |
| RENDERING-0178 | test | §8.3 | §8.3 |
| RENDERING-0179 | test | §8.3 | §8.3 |
| RENDERING-0180 | test | §8.3 | §8.3 |
| RENDERING-0181 | test | §8.3 | §8.3 |
| RENDERING-0182 | test | §8.3 | §8.3 |
| RENDERING-0183 | test | §8.3 | §8.3 |
| RENDERING-0184 | test | §8.3 | §8.3 |
| RENDERING-0185 | test | §8.3 | §8.3 |
| RENDERING-0186 | test | §8.3 | §8.3 |
| RENDERING-0187 | test | §8.3 | §8.3 |
| RENDERING-0188 | test | §8.3 | §8.3 |
| RENDERING-0189 | test | §8.3 | §8.3 |
| RENDERING-0190 | test | §8.3 | §8.3 |
| RENDERING-0191 | test | §8.3 | §8.3 |
| RENDERING-0192 | test | §8.3 | §8.3 |
| RENDERING-0193 | test | §8.3 | §8.3 |
| RENDERING-0194 | test | §8.3 | §8.3 |
| RENDERING-0195 | test | §8.3 | §8.3 |
| RENDERING-0196 | test | §8.3 | §8.3 |
| RENDERING-0197 | test | §8.3 | §8.3 |
| RENDERING-0198 | test | §8.3 | §8.3 |
| RENDERING-0199 | test | §8.3 | §8.3 |
| RENDERING-0200 | test | §8.3 | §8.3 |
| RENDERING-0201 | test | §8.3 | §8.3 |
| RENDERING-0202 | test | §8.3 | §8.3 |
| RENDERING-0203 | test | §8.3 | §8.3 |
| RENDERING-0204 | test | §8.3 | §8.3 |
| RENDERING-0205 | test | §8.3 | §8.3 |
| RENDERING-0206 | test | §8.3 | §8.3 |
| RENDERING-0207 | test | §8.3 | §8.3 |
| RENDERING-0208 | test | §8.3 | §8.3 |
| RENDERING-0209 | test | §8.3 | §8.3 |
| RENDERING-0210 | test | §8.3 | §8.3 |
| RENDERING-0211 | test | §8.3 | §8.3 |
| RENDERING-0212 | test | §8.3 | §8.3 |
| RENDERING-0213 | test | §8.3 | §8.3 |
| RENDERING-0214 | test | §8.3 | §8.3 |
| RENDERING-0215 | test | §8.3 | §8.3 |
| RENDERING-0216 | test | §8.3 | §8.3 |
| RENDERING-0217 | test | §8.3 | §8.3 |
| RENDERING-0218 | test | §8.3 | §8.3 |
| RENDERING-0219 | test | §8.3 | §8.3 |
| RENDERING-0220 | test | §8.3 | §8.3 |
| RENDERING-0221 | test | §8.3 | §8.3 |
| RENDERING-0222 | test | §8.3 | §8.3 |
| RENDERING-0223 | test | §8.3 | §8.3 |
| RENDERING-0224 | test | §8.3 | §8.3 |
| RENDERING-0225 | test | §8.3 | §8.3 |
| RENDERING-0226 | test | §8.3 | §8.3 |
| RENDERING-0227 | test | §8.3 | §8.3 |
| RENDERING-0228 | test | §8.3 | §8.3 |
| RENDERING-0229 | test | §8.3 | §8.3 |
| RENDERING-0230 | test | §8.3 | §8.3 |
| RENDERING-0231 | interface | §8.4 | §8.4 |
| RENDERING-0232 | rule | §8.4 | §8.4 |
| RENDERING-0233 | rule | §8.4 | §8.4 |
| RENDERING-0234 | rule | §8.4 | §8.4 |
| RENDERING-0235 | rule | §8.4 | referenced to pipeline II.7.1 |
| RENDERING-0236 | rule | §8.4 | §8.4 |
| RENDERING-0237 | rule | §8.4 | §8.4 |
| RENDERING-0238 | rule | §8.4 | §8.4 |
| RENDERING-0239 | mechanism | §8.4 | §8.4 |
| RENDERING-0240 | interface | §8.4 | §8.4 |
| RENDERING-0241 | type | §8.4 | §8.4 |
| RENDERING-0242 | type | §8.4 | §8.4 |
| RENDERING-0243 | mechanism | §8.4 | §8.4 |
| RENDERING-0244 | mechanism | §8.4 | §8.4 |
| RENDERING-0245 | rule | §8.4 | §8.4 |
| RENDERING-0246 | rule | §8.4 | §8.4 |
| RENDERING-0247 | algorithm | §8.4 | §8.4 |
| RENDERING-0248 | algorithm | §8.4 | §8.4 |
| RENDERING-0249 | algorithm | §8.4 | §8.4 |
| RENDERING-0250 | algorithm | §8.4 | §8.4 |
| RENDERING-0251 | rule | §8.4 | §8.4 |
| RENDERING-0252 | algorithm | §8.4 | §8.4 |
| RENDERING-0253 | rule | §8.4 | §8.4 |
| RENDERING-0254 | rule | §8.4 | §8.4 |
| RENDERING-0255 | rule | §8.4 | §8.4 |
| RENDERING-0256 | rule | §8.4 | §8.4 |
| RENDERING-0257 | mechanism | §8.4 | §8.4 |
| RENDERING-0258 | rule | §8.4 | §8.4 |
| RENDERING-0259 | mechanism | §8.4 | §8.4 |
| RENDERING-0260 | mechanism | §8.4 | §8.4 |
| RENDERING-0261 | mechanism | §8.4 | §8.4 |
| RENDERING-0262 | rule | §8.4 | §8.4 |
| RENDERING-0263 | rule | §8.4 | §8.4 |
| RENDERING-0264 | mechanism | §8.4 | §8.4 |
| RENDERING-0265 | rule | §8.4 | §8.4 |
| RENDERING-0266 | rule | §8.4 | §8.4 |
| RENDERING-0267 | rule | §8.4 | §8.4 |
| RENDERING-0268 | rule | §8.4 | §8.4 |
| RENDERING-0269 | rule | §8.4 | §8.4 |
| RENDERING-0270 | rule | §8.4 | §8.4 |
| RENDERING-0271 | budget | §8.4 | §8.4 |
| RENDERING-0272 | budget | §8.4 | §8.4 |
| RENDERING-0273 | mechanism | §8.4 | §8.4 |
| RENDERING-0274 | rule | §8.4 | referenced to model §2.6 |
| RENDERING-0275 | rule | §8.5 | §8.5 (heading: "… first map") |
| RENDERING-0276 | rule | §8.5 | §8.5 (heading: "… first map") |
| RENDERING-0277 | constant | §8.5 | §8.5 (heading: "… first map") |
| RENDERING-0278 | rule | §8.5 | §8.5 (entry stops now §8.8) |
| RENDERING-0279 | mechanism | §8.5 | §8.5 (heading: "… first map") |
| RENDERING-0280 | rule | §8.5 | §8.5 (heading: "… first map") |
| RENDERING-0281 | rule | §8.5 | §8.5 (heading: "… first map") |
| RENDERING-0282 | algorithm | §8.5 | §8.5 (heading: "… first map") |
| RENDERING-0283 | rule | §8.5 | §8.5 (heading: "… first map") |
| RENDERING-0284 | rule | §8.5 | §8.5 (heading: "… first map") |
| RENDERING-0285 | rule | §8.5 | §8.5 (heading: "… first map") |
| RENDERING-0286 | test | §8.5 | §8.5 (heading: "… first map") |
| RENDERING-0287 | rule | §8.5 | §8.5 (heading: "… first map") |
| RENDERING-0288 | algorithm | §8.5 | §8.5 (heading: "… first map") |
| RENDERING-0289 | rule | §8.5 | §8.5 (heading: "… first map") |
| RENDERING-0290 | rule | §8.5 | §8.5 (heading: "… first map") |
| RENDERING-0291 | rule | §8.5 | §8.5 (heading: "… first map") |
| RENDERING-0292 | rule | §8.5 | §8.5 (heading: "… first map") |
| RENDERING-0293 | rule | §8.5 | §8.5 (heading: "… first map") |
| RENDERING-0294 | rule | §8.5 | §8.5 (heading: "… first map") |
| RENDERING-0295 | rule | §8.5 | §8.5 (heading: "… first map") |
| RENDERING-0296 | rule | §8.6 | §8.6 |
| RENDERING-0297 | mechanism | §8.6 | §8.6 |
| RENDERING-0298 | mechanism | §8.6 | §8.6 |
| RENDERING-0299 | algorithm | §8.6 | §8.6 |
| RENDERING-0300 | rule | §8.6 | §8.6 |
| RENDERING-0301 | rule | §8.6 | §8.6 |
| RENDERING-0302 | rule | §8.6 | §8.6 |
| RENDERING-0303 | rule | §8.7 | §8.7 |
| RENDERING-0304 | rule | §8.8 | §8.8 |
| RENDERING-0305 | type | §8.8 | §8.8 |
| RENDERING-0306 | rule | §8.8 | §8.8 |
| RENDERING-0307 | term | §8.8 | §8.8 (term; glossary home §8.8) |
| RENDERING-0308 | mechanism | §8.8 | §8.8 |
| RENDERING-0309 | constant | §8.8 | §8.8 |
| RENDERING-0310 | mechanism | §8.8 | §8.8 |
| RENDERING-0311 | rule | §8.8 | §8.8 |
| RENDERING-0312 | mechanism | §8.8 | §8.8 |
| RENDERING-0313 | mechanism | §8.8 | §8.8 |
| RENDERING-0314 | mechanism | §8.8 | §8.8 |
| RENDERING-0315 | budget | §8.8 | §8.8 |
| RENDERING-0316 | rule | §8.8 | §8.8 |
| RENDERING-0317 | rule | §8.8 | §8.8 |
| RENDERING-0318 | rule | §8.8 | §8.8 |
| RENDERING-0319 | rule | §8.8 | §8.8 |
| RENDERING-0320 | rule | §8.8 | §8.8 |
| RENDERING-0321 | budget | §8.8 | §8.8 |
| RENDERING-0322 | constant | §8.8 | §8.8 |
| RENDERING-0323 | number | §8.8 | §8.8 |
| RENDERING-0324 | rule | §8.8 | §8.8 |
| RENDERING-0325 | rule | §8.8 | §8.8 |
| RENDERING-0326 | mechanism | §8.8 | §8.8 |
| RENDERING-0327 | mechanism | §8.8 | §8.8 |
| RENDERING-0328 | mechanism | §8.8 | §8.8 |
| RENDERING-0329 | mechanism | §8.8 | §8.8 |
| RENDERING-0330 | rule | §8.9 | §8.9 |
| RENDERING-0331 | rule | §8.9 | §8.9 |
| RENDERING-0332 | rule | §8.9 | §8.9 |
| RENDERING-0333 | mechanism | §8.9 | §8.9 |
| RENDERING-0334 | rule | §8.9 | §8.9 |
| RENDERING-0335 | rule | §8.9 | §8.9 |
| RENDERING-0336 | rule | §8.9 | §8.9 |
| RENDERING-0337 | rule | §8.9 | §8.9 |
| RENDERING-0338 | table | §8.9 | §8.9 |
| RENDERING-0339 | budget | §8.9 | §8.9 |
| RENDERING-0340 | interface | §8.9 | §8.9 |
| RENDERING-0341 | algorithm | §8.9 | §8.9 |
| RENDERING-0342 | rule | §8.9 | §8.9 |
| RENDERING-0343 | mechanism | §8.9 | §8.9 |
| RENDERING-0344 | rule | §8.9 | §8.9 |
| RENDERING-0345 | rule | §8.9 | §8.9 |
| RENDERING-0346 | rule | §8.9 | §8.9 |
| RENDERING-0347 | test | §8.9 | §8.9 |
| RENDERING-0348 | interface | §8.10 | §8.10 |
| RENDERING-0349 | rule | §8.10 | §8.10 |
| RENDERING-0350 | mechanism | §8.10 | §8.10 |
| RENDERING-0351 | rule | §8.10 | §8.10 |
| RENDERING-0352 | rule | §8.10 | §8.10 |
| RENDERING-0353 | algorithm | §8.10 | §8.10 |
| RENDERING-0354 | algorithm | §8.10 | §8.10 |
| RENDERING-0355 | constant | §8.10 | §8.10 |
| RENDERING-0356 | rule | §8.10 | §8.10 |
| RENDERING-0357 | algorithm | §8.10 | §8.10 |
| RENDERING-0358 | rule | §8.10 | §8.10 |
| RENDERING-0359 | algorithm | §8.10 | §8.10 |
| RENDERING-0360 | rule | §8.10 | §8.10 |
| RENDERING-0361 | rule | §8.10 | §8.10 |
| RENDERING-0362 | mechanism | §8.10 | §8.10 |
| RENDERING-0363 | mechanism | §8.10 | §8.10 |
| RENDERING-0364 | rule | §8.10 | §8.10 |
| RENDERING-0365 | rule | §8.10 | §8.10 |
| RENDERING-0366 | rule | §9.1 | §9.1 |
| RENDERING-0367 | interface | §9.1 | §9.1 |
| RENDERING-0368 | interface | §9.1 | §9.1 |
| RENDERING-0369 | interface | §9.1 | §9.1 |
| RENDERING-0370 | interface | §9.1 | §9.1 |
| RENDERING-0371 | rule | §9.1 | §9.1 |
| RENDERING-0372 | rule | §9.1 | §9.1 |
| RENDERING-0373 | rule | §9.1 | §9.1 |
| RENDERING-0374 | rule | §9.1 | §9.1 |
| RENDERING-0375 | rule | §9.1 | §9.1 |
| RENDERING-0376 | rule | §9.1 | §9.1 |
| RENDERING-0377 | rule | §9.1 | §9.1 |
| RENDERING-0378 | mechanism | §9.2 | §9.2 |
| RENDERING-0379 | test | §9.2 | §9.2 |
| RENDERING-0380 | rule | §9.2 | §9.2 |
| RENDERING-0381 | rule | §9.2 | §9.2 |
| RENDERING-0382 | rule | §9.2 | §9.2 |
| RENDERING-0383 | mechanism | §9.2 | §9.2 |
| RENDERING-0384 | table | §9.2 | §9.2 |
| RENDERING-0385 | rule | §9.2 | §9.2 |
| RENDERING-0386 | rule | §9.2 | §9.2 |
| RENDERING-0387 | rule | §9.2 | §9.2 |
| RENDERING-0388 | rule | §9.2 | §9.2 |
| RENDERING-0389 | rule | §9.2 | §9.2 |
| RENDERING-0390 | rule | §9.2 | §9.2 |
| RENDERING-0391 | rule | §9.2 | §9.2 |
| RENDERING-0392 | algorithm | §9.2 | §9.2 |
| RENDERING-0393 | interface | §9.2 | §9.2 |
| RENDERING-0394 | interface | §9.2 | §9.2 |
| RENDERING-0395 | algorithm | §9.2 | §9.2 |
| RENDERING-0396 | algorithm | §9.2 | §9.2 |
| RENDERING-0397 | rule | §9.2 | §9.2 |
| RENDERING-0398 | test | §9.2 | §9.2 |
| RENDERING-0399 | rule | §9.2 | §9.2 |
| RENDERING-0400 | rule | §9.2 | §9.2 |
| RENDERING-0401 | budget | §9.2 | §9.2 |
| RENDERING-0402 | algorithm | §9.3 | §9.3 |
| RENDERING-0403 | rule | §9.3 | §9.3 |
| RENDERING-0404 | rule | §9.3 | §9.3 |
| RENDERING-0405 | rule | §9.3 | §9.3 |
| RENDERING-0406 | rule | §9.3 | §9.3 |
| RENDERING-0407 | term | §9.3 | §9.3 (term; glossary home §9.3) |
| RENDERING-0408 | rule | §9.3 | §9.3 |
| RENDERING-0409 | constant | §9.4 | §9.4 |
| RENDERING-0410 | algorithm | §9.4 | §9.4 |
| RENDERING-0411 | algorithm | §9.4 | §9.4 |
| RENDERING-0412 | rule | §9.4 | §9.4 |
| RENDERING-0413 | rule | §9.4 | §9.4 |
| RENDERING-0414 | rule | §9.4 | §9.4 |
| RENDERING-0415 | test | §9.4 | §9.4 |
| RENDERING-0416 | rule | §9.4 | §9.4 |
| RENDERING-0417 | rule | §9.5 | §9.5 |
| RENDERING-0418 | rule | §9.5 | §9.5 |
| RENDERING-0419 | algorithm | §9.5 | §9.5 |
| RENDERING-0420 | rule | §9.5 | §9.5 |
| RENDERING-0421 | rule | §9.5 | §9.5 |
| RENDERING-0422 | rule | §9.5 | §9.5 |
| RENDERING-0423 | interface | §9.5 | §9.5 |
| RENDERING-0424 | rule | §9.5 | §9.5 |
| RENDERING-0425 | mechanism | §9.5 | §9.5 |
| RENDERING-0426 | mechanism | §9.5 | §9.5 |
| RENDERING-0427 | rule | §9.5 | §9.5 |
| RENDERING-0428 | rule | §9.5 | §9.5 |
| RENDERING-0429 | rule | §9.6 | referenced to pipeline §10.4 |
| RENDERING-0430 | algorithm | §9.6 | §9.6 |
| RENDERING-0431 | rule | §9.6 | §9.6 |
| RENDERING-0432 | test | §9.6 | §9.6 |
| RENDERING-0433 | rule | §9.6 | §9.6 |
| RENDERING-0434 | rule | §11.1 | §11.1 |
| RENDERING-0435 | rule | §11.1 | §11.1 |
| RENDERING-0436 | rule | §11.1 | §11.1 |
| RENDERING-0437 | rule | §11.1 | §11.1 |
| RENDERING-0438 | rule | §11.1 | §11.1 |
| RENDERING-0439 | interface | §11.1 | §11.1 |
| RENDERING-0440 | rule | §11.1 | §11.1 |
| RENDERING-0441 | rule | §11.1 | §11.1 |
| RENDERING-0442 | rule | §11.1 | §11.1 |
| RENDERING-0443 | rule | §11.1 | §11.1 |
| RENDERING-0444 | rule | §11.1 | §11.1 |
| RENDERING-0445 | rule | §11.1 | §11.1 |
| RENDERING-0446 | rule | §11.1 | §11.1 |
| RENDERING-0447 | rule | §11.1 | §11.1 |
| RENDERING-0448 | rule | §11.1 | §11.1 |
| RENDERING-0449 | rule | §11.1 | §11.1 |
| RENDERING-0450 | rule | §11.1 | §11.1 |
| RENDERING-0451 | rule | §11.1 | §11.1 |
| RENDERING-0452 | algorithm | §11.1 | §11.1 |
| RENDERING-0453 | rule | §11.1 | §11.1 |
| RENDERING-0454 | mechanism | §11.1 | §11.1 |
| RENDERING-0455 | mechanism | §11.1 | §11.1 |
| RENDERING-0456 | rule | §11.1 | §11.1 |
| RENDERING-0457 | rule | §11.1 | §11.1 |
| RENDERING-0458 | test | §11.1 | §11.1 |
| RENDERING-0459 | rule | §11.1 | §11.1 |
| RENDERING-0460 | rule | §11.1 | §11.1 |
| RENDERING-0461 | rule | §11.1 | §11.1 |
| RENDERING-0462 | rule | §11.1 | §11.1 |
| RENDERING-0463 | interface | §11.2 | §11.2 |
| RENDERING-0464 | type | §11.2 | §11.2 |
| RENDERING-0465 | type | §11.2 | §11.2 |
| RENDERING-0466 | type | §11.2 | §11.2 |
| RENDERING-0467 | type | §11.2 | §11.2 |
| RENDERING-0468 | interface | §11.2 | §11.2 |
| RENDERING-0469 | rule | §11.2 | §11.2 |
| RENDERING-0470 | rule | §11.2 | §11.2 |
| RENDERING-0471 | rule | §11.2 | §11.2 |
| RENDERING-0472 | rule | §11.2 | §11.2 |
| RENDERING-0473 | mechanism | §11.2 | §11.2 |
| RENDERING-0474 | rule | §11.2 | §11.2 |
| RENDERING-0475 | table | §11.2 | §11.2 |
| RENDERING-0476 | rule | §11.2 | §11.2 |
| RENDERING-0477 | rule | §11.2 | §11.2 |
| RENDERING-0478 | mechanism | §11.3 | §11.3 |
| RENDERING-0479 | rule | §11.3 | §11.3 |
| RENDERING-0480 | interface | §11.3 | §11.3 |
| RENDERING-0481 | rule | §11.3 | §11.3 |
| RENDERING-0482 | term | §11.3 | §11.3 (term; glossary home §11.3) |
| RENDERING-0483 | mechanism | §11.3 | §11.3 |
| RENDERING-0484 | test | §11.3 | §11.3 |
| RENDERING-0485 | rule | §11.3 | §11.3 |
| RENDERING-0486 | rule | §11.3 | referenced to model §2.9 |
| RENDERING-0487 | rule | §11.3 | §11.3 |
| RENDERING-0488 | rule | §11.3 | §11.3 |
| RENDERING-0489 | rule | §11.3 | §11.3 |
| RENDERING-0490 | rule | §11.3 | §11.3 |
| RENDERING-0491 | mechanism | §11.3 | §11.3 |
| RENDERING-0492 | rule | §11.3 | §11.3 |
| RENDERING-0493 | rule | §11.4 | §11.4 |
| RENDERING-0494 | rule | §11.4 | §11.4 |
| RENDERING-0495 | rule | §11.4 | referenced to determinism §7.7 |
| RENDERING-0496 | rule | §11.4 | referenced to determinism §7.7 |
| RENDERING-0497 | rule | §11.4 | §11.4 |
| RENDERING-0498 | rule | §11.4 | §11.4 |
| RENDERING-0499 | decision | §11.5 | §11.5 |
| RENDERING-0500 | interface | §11.5 | §11.5 |
| RENDERING-0501 | constant | §12.1 | §12.1 |
| RENDERING-0502 | constant | §12.1 | §12.1 |
| RENDERING-0503 | mechanism | §12.1 | §12.1 |
| RENDERING-0504 | rule | §12.1 | §12.1 |
| RENDERING-0505 | rule | §12.1 | §12.1 |
| RENDERING-0506 | rule | §12.1 | §12.1 (cites §12.10) |
| RENDERING-0507 | rule | §12.1 | §12.1 |
| RENDERING-0508 | table | §12.2 | §12.2 |
| RENDERING-0509 | constant | §12.2 | §12.2 |
| RENDERING-0510 | constant | §12.2 | referenced to kernel §3.2 |
| RENDERING-0511 | rule | §12.2 | §12.2 |
| RENDERING-0512 | rule | §12.3 | §12.3 |
| RENDERING-0513 | budget | §12.3 | §12.3 |
| RENDERING-0514 | budget | §12.3 | §12.3 |
| RENDERING-0515 | rule | §12.3 | §12.3 |
| RENDERING-0516 | decision | §12.3 | §12.3 |
| RENDERING-0517 | test | §12.3 | §12.3 + §12.10 R12-1 |
| RENDERING-0518 | rule | §12.3 | §12.3 + §12.10 R12-2 |
| RENDERING-0519 | test | §12.3 | §12.3 + §12.10 R12-3 |
| RENDERING-0520 | table | §12.4 | §12.4 |
| RENDERING-0521 | rule | §12.4 | referenced to determinism §6.1 |
| RENDERING-0522 | rule | §12.4 | §12.4 + §12.10 R12-4 |
| RENDERING-0523 | test | §12.4 | §12.4 + §12.10 R12-5 |
| RENDERING-0524 | budget | §12.5 | §12.5 |
| RENDERING-0525 | budget | §12.5 | §12.5 |
| RENDERING-0526 | decision | §12.5 | §12.5 |
| RENDERING-0527 | test | §12.5 | §12.5 + §12.10 R12-6 |
| RENDERING-0528 | budget | §12.5 | §12.5 |
| RENDERING-0529 | budget | §12.5 | §12.5 + §12.10 R12-7 |
| RENDERING-0530 | budget | §12.5 | §12.5 |
| RENDERING-0531 | budget | §12.5 | §12.5 |
| RENDERING-0532 | budget | §12.5 | §12.5 + §12.10 R12-8 |
| RENDERING-0533 | budget | §12.5 | §12.5 + §12.10 R12-9 |
| RENDERING-0534 | budget | §12.6 | §12.6 |
| RENDERING-0535 | budget | §12.6 | §12.6 |
| RENDERING-0536 | budget | §12.6 | §12.6 + §12.10 R12-10 |
| RENDERING-0537 | budget | §12.6 | §12.6 + §12.10 R12-11 |
| RENDERING-0538 | test | §12.6 | §12.6 + §12.10 R12-12 |
| RENDERING-0539 | budget | §12.6 | §12.6 + §12.10 R12-13 |
| RENDERING-0540 | budget | §12.6 | §12.6 + §12.10 R12-14 |
| RENDERING-0541 | budget | §12.6 | §12.6 |
| RENDERING-0542 | budget | §12.6 | §12.6 + §12.10 R12-15 |
| RENDERING-0543 | budget | §12.7 | §12.7 + §12.10 R12-16 |
| RENDERING-0544 | budget | §12.7 | §12.7 |
| RENDERING-0545 | budget | §12.7 | §12.7 + §12.10 R12-17 |
| RENDERING-0546 | budget | §12.7 | §12.7 |
| RENDERING-0547 | budget | §12.7 | §12.7 + §12.10 R12-18 |
| RENDERING-0548 | budget | §12.7 | §12.7 |
| RENDERING-0549 | budget | §12.7 | §12.7 |
| RENDERING-0550 | test | §12.7 | §12.7 + §12.10 R12-19 |
| RENDERING-0551 | test | §12.7 | §12.10 R12-20 |
| RENDERING-0552 | test | §12.7 | §12.10 R12-21 |
| RENDERING-0553 | budget | §12.7 | §12.7 + §12.10 R12-22 |
| RENDERING-0554 | budget | §12.7 | §12.7 + §12.10 R12-23 |
| RENDERING-0555 | budget | §12.7 | §12.7 + §12.10 R12-24 |
| RENDERING-0556 | rule | §12.8 | §12.8 |
| RENDERING-0557 | budget | §12.8 | §12.8 |
| RENDERING-0558 | test | §12.8 | §12.8 + §12.10 R12-25 |
| RENDERING-0559 | budget | §12.8 | §12.8 + §12.10 R12-27 |
| RENDERING-0560 | budget | §12.8 | §12.8 |
| RENDERING-0561 | budget | §12.8 | §12.8 + §12.10 R12-26 |
| RENDERING-0562 | budget | §12.8 | §12.8 |
| RENDERING-0563 | test | §12.8 | §12.10 R12-25 |
| RENDERING-0564 | budget | §12.8 | §12.8 + §12.10 R12-28 |
| RENDERING-0565 | rule | §12.9 | §12.9 |
| RENDERING-0566 | rule | §12.9 | §12.9 |
| RENDERING-0567 | decision | §12.9 | §12.9 |
| RENDERING-0568 | term | §8.1 | §8.1 (term; glossary home §8.1) |
| RENDERING-0569 | term | §8.1 | §8.1 (term; glossary home §8.1) |
| RENDERING-0570 | term | §8.1 | §8.1 (term; glossary home §8.1) |
| RENDERING-0571 | term | §8.1 | §8.1 (term; glossary home §8.1) |
| RENDERING-0572 | term | §8.1 | §8.1 (term; glossary home §8.1) |
| RENDERING-0573 | term | §8.1 | §8.1 (term; glossary home §8.1) |
| RENDERING-0574 | term | §8.1 | §8.1 (term; glossary home §8.1) |
| RENDERING-0575 | term | §8.1 | §8.1 (term; glossary home §8.1) |
| RENDERING-0576 | term | §8.1 | §8.1 (term; glossary home §8.1) |
| RENDERING-0577 | term | §8.1 | §8.1 (term; glossary home §8.1) |
| RENDERING-0578 | term | §8.2 | §8.2 (term; glossary home §8.2) |
| RENDERING-0579 | term | §8.2 | §8.2 (glossary; `graphic` dropped from the family list) |
| RENDERING-0580 | term | §8.2 | §8.2 (term; glossary home §8.2) |
| RENDERING-0581 | term | §8.2 | §8.2 (term; glossary home §8.2) |
| RENDERING-0582 | term | §8.2 | §8.2 (term; glossary home §8.2) |
| RENDERING-0583 | term | §8.2 | §8.2 (term; glossary home §8.2) |
| RENDERING-0584 | term | §8.2 | §8.2 (term; glossary home §8.2) |
| RENDERING-0585 | term | §8.2 | §8.2 (term; glossary home §8.2) |
| RENDERING-0586 | term | §8.2 | §8.2 (term; glossary home §8.2) |
| RENDERING-0587 | term | §8.2 | §8.2 (term; glossary home §8.2) |
| RENDERING-0588 | term | §8.2 | §8.2 (term; glossary home §8.2) |
| RENDERING-0589 | term | §8.2 | §8.2 (term; glossary home §8.2) |
| RENDERING-0590 | term | §8.2 | §8.2 (term; glossary home §8.2) |
| RENDERING-0591 | term | §8.2 | §8.2 (term; glossary home §8.2) |
| RENDERING-0592 | term | §8.2 | §8.2 (term; glossary home §8.2) |
| RENDERING-0593 | term | §8.2 | §8.2 (term; glossary home §8.2) |
| RENDERING-0594 | term | §8.2 | §8.2 (term; glossary home §8.2) |
| RENDERING-0595 | term | §8.4 | §8.4 (term; glossary home §8.4) |
| RENDERING-0596 | term | §8.4 | §8.4 (term; glossary home §8.4) |
| RENDERING-0597 | term | §8.4 | §8.4 (term; glossary home §8.4) |
| RENDERING-0598 | term | §8.4 | §8.4 (term; glossary home §8.4) |
| RENDERING-0599 | term | §8.4 | §8.4 (term; glossary home §8.4) |
| RENDERING-0600 | term | §8.4 | §8.4 (term; glossary home §8.4) |
| RENDERING-0601 | term | §8.4 | §8.4 (term; glossary home §8.4) |
| RENDERING-0602 | term | §8.4 | §8.4 (term; glossary home §8.4) |
| RENDERING-0603 | term | §8.4 | §8.4 (term; glossary home §8.4) |
| RENDERING-0604 | term | §8.4 | §8.4 (term; glossary home §8.4) |
| RENDERING-0605 | term | §8.4 | §8.4 (term; glossary home §8.4) |
| RENDERING-0606 | term | §8.4 | §8.4 (term; glossary home §8.4) |
| RENDERING-0607 | term | §8.4 | §8.4 (term; glossary home §8.4) |
| RENDERING-0608 | term | §8.4 | §8.4 (term; glossary home §8.4) |
| RENDERING-0609 | term | §8.4 | §8.4 (term; glossary home §8.4) |
| RENDERING-0610 | term | §8.4 | §8.4 (term; glossary home §8.4) |
| RENDERING-0611 | term | §8.4 | §8.4 (term; glossary home §8.4) |
| RENDERING-0612 | term | §8.4 | §8.4 (term; glossary home §8.4) |
| RENDERING-0613 | term | §8.4 | §8.4 (term; glossary home §8.4) |
| RENDERING-0614 | term | §8.4 | §8.4 (term; glossary home §8.4) |
| RENDERING-0615 | term | §8.4 | §8.4 (term; glossary home §8.4) |
| RENDERING-0616 | term | §8.4 | §8.4 (term; glossary home §8.4) |
| RENDERING-0617 | term | §8.4 | §8.4 (term; glossary home §8.4) |
| RENDERING-0618 | term | §8.4 | §8.4 (term; glossary home §8.4) |
| RENDERING-0619 | term | §8.4 | §8.4 (term; glossary home §8.4) |
| RENDERING-0620 | term | §8.4 | §8.4 (term; glossary home §8.4) |
| RENDERING-0621 | term | §8.5 | §8.5 (term; glossary home §8.5) |
| RENDERING-0622 | term | §8.5 | §8.5 (term; glossary home §8.5) |
| RENDERING-0623 | term | §8.5 | §8.5 (term; glossary home §8.5) |
| RENDERING-0624 | term | §8.5 | §8.5 (term; glossary home §8.5) |
| RENDERING-0625 | term | §8.5 | §8.5 (term; glossary home §8.5) |
| RENDERING-0626 | term | §8.5 | §8.5 (term; glossary home §8.5) |
| RENDERING-0627 | term | §8.5 | §8.5 (term; glossary home §8.5) |
| RENDERING-0628 | term | §8.5 | §8.5 (term; glossary home §8.5) |
| RENDERING-0629 | term | §8.5 | §8.5 (term; glossary home §8.5) |
| RENDERING-0630 | term | §8.5 | §8.5 (term; glossary home §8.5) |
| RENDERING-0631 | term | §8.8 | §8.8 (term; glossary home §8.8) |
| RENDERING-0632 | term | §8.8 | §8.8 (term; glossary home §8.8) |
| RENDERING-0633 | term | §8.8 | §8.8 (term; glossary home §8.8) |
| RENDERING-0634 | term | §8.8 | §8.8 (term; glossary home §8.8) |
| RENDERING-0635 | term | §8.8 | §8.8 (term; glossary home §8.8) |
| RENDERING-0636 | term | §8.8 | §8.8 (term; glossary home §8.8) |
| RENDERING-0637 | term | §8.8 | §8.8 (term; glossary home §8.8) |
| RENDERING-0638 | term | §8.8 | §8.8 (term; glossary home §8.8) |
| RENDERING-0639 | term | §8.8 | §8.8 (term; glossary home §8.8) |
| RENDERING-0640 | term | §8.1 | §8.1 (term; glossary home §8.1) |
| RENDERING-0641 | term | §8.9 | §8.9 (term; glossary home §8.9) |
| RENDERING-0642 | term | §8.9 | §8.9 (term; glossary home §8.9) |
| RENDERING-0643 | term | §8.9 | §8.9 (term; glossary home §8.9) |
| RENDERING-0644 | term | §8.9 | §8.9 (term; glossary home §8.9) |
| RENDERING-0645 | term | §8.9 | §8.9 (term; glossary home §8.9) |
| RENDERING-0646 | term | §8.10 | §8.10 (term; glossary home §8.10) |
| RENDERING-0647 | term | §8.10 | §8.10 (term; glossary home §8.10) |
| RENDERING-0648 | term | §8.10 | §8.10 (term; glossary home §8.10) |
| RENDERING-0649 | term | §8.10 | §8.10 (term; glossary home §8.10) |
| RENDERING-0650 | term | §8.10 | §8.10 (term; glossary home §8.10) |
| RENDERING-0651 | term | §8.10 | §8.10 (term; glossary home §8.10) |
| RENDERING-0652 | term | §8.10 | §8.10 (term; glossary home §8.10) |
| RENDERING-0653 | term | §8.10 | §8.10 (term; glossary home §8.10) |
| RENDERING-0654 | term | §8.10 | §8.10 (term; glossary home §8.10) |
| RENDERING-0655 | term | §9.1 | §9.1 (term; glossary home §9.1) |
| RENDERING-0656 | term | §9.1 | §9.1 (term; glossary home §9.1) |
| RENDERING-0657 | term | §9.1 | §9.1 (term; glossary home §9.1) |
| RENDERING-0658 | term | §9.1 | §9.1 (term; glossary home §9.1) |
| RENDERING-0659 | term | §9.1 | §9.1 (term; glossary home §9.1) |
| RENDERING-0660 | term | §9.1 | §9.1 (term; glossary home §9.1) |
| RENDERING-0661 | term | §9.1 | §9.1 (term; glossary home §9.1) |
| RENDERING-0662 | term | §9.2 | §9.2 (term; glossary home §9.2) |
| RENDERING-0663 | term | §9.2 | §9.2 (term; glossary home §9.2) |
| RENDERING-0664 | term | §9.2 | §9.2 (term; glossary home §9.2) |
| RENDERING-0665 | term | §9.2 | §9.2 (term; glossary home §2.8) |
| RENDERING-0666 | term | §9.2 | §9.2 (term; glossary home §9.2) |
| RENDERING-0667 | term | §9.2 | §9.2 (term; glossary home §9.2) |
| RENDERING-0668 | term | §9.2 | §9.2 (term; glossary home §9.2) |
| RENDERING-0669 | term | §9.2 | §9.2 (term; glossary home §9.2) |
| RENDERING-0670 | term | §9.3 | §9.3 (term; glossary home §9.3) |
| RENDERING-0671 | term | §9.3 | §9.3 (term; glossary home §9.3) |
| RENDERING-0672 | term | §9.4 | §9.4 (term; glossary home §9.4) |
| RENDERING-0673 | term | §9.4 | §9.4 (term; glossary home §9.4) |
| RENDERING-0674 | term | §9.4 | §9.4 (term; glossary home §9.4) |
| RENDERING-0675 | term | §9.5 | §9.5 (term; glossary home §9.5) |
| RENDERING-0676 | term | §9.5 | §9.5 (term; glossary home §9.5) |
| RENDERING-0677 | term | §9.5 | §9.5 (term; glossary home §9.5) |
| RENDERING-0678 | term | §9.5 | §9.5 (term; glossary home §9.5) |
| RENDERING-0679 | term | §9.5 | §9.5 (term; glossary home §9.5) |
| RENDERING-0680 | term | §11.1 | §11.1 (term; glossary home §11.1) |
| RENDERING-0681 | term | §11.1 | §11.1 (term; glossary home §11.1) |
| RENDERING-0682 | term | §11.1 | §11.1 (term; glossary home §11.1) |
| RENDERING-0683 | term | §11.1 | §11.1 (term; glossary home §11.1) |
| RENDERING-0684 | term | §11.1 | §11.1 (term; glossary home §11.1) |
| RENDERING-0685 | term | §11.2 | §11.2 (term; glossary home §11.2) |
| RENDERING-0686 | term | §11.2 | §11.2 (term; glossary home §11.2) |
| RENDERING-0687 | term | §11.2 | §11.2 (term; glossary home §11.2) |
| RENDERING-0688 | term | §11.3 | §11.3 (term; glossary home §11.3) |
| RENDERING-0689 | term | §11.3 | §11.3 (term; glossary home §11.3) |
| RENDERING-0690 | term | §11.4 | §11.4 (term; glossary home §11.4) |
| RENDERING-0691 | term | §11.4 | §11.4 (term; glossary home §11.4) |
| RENDERING-0692 | term | §12.1 | §12.1 (term; glossary home §12.1) |
| RENDERING-0693 | term | §12.1 | §12.1 (term; glossary home §12.1) |
| RENDERING-0694 | term | §12.1 | §12.1 (term; glossary home §12.1) |
| RENDERING-0695 | term | §12.3 | §12.3 (term; glossary home §12.3) |
| RENDERING-0696 | term | §12.3 | §12.3 + §12.10 R12-3 |
| RENDERING-0697 | term | §12.5 | §12.5 (term; glossary home §12.5) |
| RENDERING-0698 | term | §12.5 | §12.5 (term; glossary home §12.5) |
| RENDERING-0699 | term | §12.5 | §12.5 (term; glossary home §12.5) |
| RENDERING-0700 | term | §12.5 | §12.5 (term; glossary home §12.5) |
| RENDERING-0701 | term | §12.6 | §12.6 (term; glossary home §12.6) |
| RENDERING-0702 | term | §12.8 | §12.8 (term; glossary home §12.8) |
| RENDERING-0703 | term | §12.8 | §12.8 (term; glossary home §12.8) |
| RENDERING-0704 | term | §12.9 | §12.9 (term; glossary home §12.9) |
