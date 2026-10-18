# Consistency rewrite — RENDERING part (§8 rendering and styles, §9 labels, §11 export and interop, §12 performance budgets)

> Fable-reviewed 2026-09-26: CORRECTED — docs/validation/consistency/validate.md

Status: COMPLETE (2026-09-26). Pipeline artifact for the Assemble and validation seats. Inputs read in full:
`docs/ARCHITECTURE.md` §8 (l.6774–7886), §9 (l.7887–8202), §11 (l.8397–8703), §12 (l.8704–9251);
`inventory-rendering.md/.json` (599 items, 8 conflicts); `canon.md/.json` (Part RENDERING: STATE 500, MOVE IN 1,
MOVE OUT 1, REFERENCE 29, section restatement 1, RATIONALE OUT 60, HISTORY OUT 8, the 13 conflicts routed here, the
three routed open items, the detail gaps); the section headings of every other part; `docs/OWNER-INSTRUCTIONS-2026-09-25.md`;
`docs/DEFINITION.md`; `still-open-r5.json` rows NR5-1 – NR5-3 and their source `docs/validation/fix-all/r5-verify-rendering.md`.
No decision, mechanism, interface, number, budget, rule or test was added, dropped or changed except the three open items
and the conflict resolutions below; where single-sourcing inside the part needed a choice of home, the choice is listed
under *Homes chosen inside the part*.

## Outcome

| file | what |
|---|---|
| `docs/validation/consistency/new/rendering/01-s8-rendering-and-style-system.md` | complete new `## §8 Rendering and the style system` (8.1–8.10) |
| `docs/validation/consistency/new/rendering/02-s9-labels-and-map-furniture.md` | complete new `## §9 Labels and map furniture` (9.1–9.6) |
| `docs/validation/consistency/new/rendering/03-s11-export-and-interop.md` | complete new `## §11 Export and interop` (11.1–11.5) |
| `docs/validation/consistency/new/rendering/04-s12-performance-budgets.md` | complete new `## §12 Performance budgets` (12.1–12.9) |
| `docs/validation/consistency/rewrite-rendering-rationale.md` | the 60 inline "Chose … because …" passages and 8 history passages removed from the part, **verbatim as whole source lines** (48 line ranges), each with its J row or "history", so nothing is lost; J-R55 (RENDERING-321) and J-R56 (RENDERING-515) are the canon's new ids for the scope rewriter |
| this file | sizes, headings, open items, conflicts, homes chosen, removed narration, cross-part notes, and the mapping of all 599 inventory ids |

**Sizes.** Before: 2 284 lines, 245 132 bytes. After: 1 876 lines, 197 732 bytes — **80.7 %** (§8 118 171 → 92 209,
78.0 %; §9 32 047 → 26 439, 82.5 %; §11 36 716 → 31 275, 85.2 %; §12 58 198 → 47 809, 82.1 %). Gone from the part: its
34 per-section "PENDING FABLE REVIEW" lines; all 60 inline judgment passages (≈ 30 KB; now "(J-Rx)" pointers); the 8
history items and the inline narration listed below; 29 restatements of other parts' facts and 1 section restatement
(now pointers); one fact moved out (the `.plat` round-trip test → §13.2); and the within-part duplicate clusters the
inventory found (canvas budget ×3, SVG budgets ×2, the declared misses ×4, export transient list ×6, "the tile worker
holds no model" ×4, placement and tree budgets ×2 each, the export-beside-the-view run ×2, settle bounds ×4, the label
floor ×3, pin vocabulary ×2, scale bar ×2, VTT grid default ×3, the quarter-candidate rule ×2, the default request ×2,
the milestone index). The part lands above the 55–65 % target, in the same range as the other parts' rewrites (kernel 75 %,
model 76 %, determinism 84 %, pipeline 85 %), because 500 of its 599 items are home statements — interfaces, algorithms
(the stamp-tile construction, slot resolution, the queue), tables (contrast matrix, role values, symbolisation, layer
order, presets, census, what-crosses, formats, budgets) and measured evidence the pass keeps. A number-survival check
(every digit group in the `values` and `statement` fields of the 500 home items searched in the new text) finds every
value present; the two statement-level misses are the plain-words intro's non-canonical "≈ 59 000" (now the canonical
58 800) and "0.48 s", which §12.3's table states as 481 ms.

**Headings.** Every subsection keeps its number: 8.1–8.10, 9.1–9.6, 11.1–11.5, 12.1–12.9; internal anchors others cite
keep their labels (§8.1 items 1–6, §9.4 rungs (1)–(7), §12.3's *Which configuration is primary*, §12.6's V law). One
title changed: **§12.4** "CITY per-stage split, with the mechanism each budget assumes (SCL-3)" → "CITY per-stage split
(SCL-3)" (CANON-C05: the mechanism is §4's). The four top-level heading lines are unchanged. New bold labels inside
sections: §11.1 **Rotation** (the MOVE IN), §12.8 **Canvases during a raster export**, §9.2 the `LabelRows` declaration.

## Open items fixed (routed to this part)

| item | fix | where |
|---|---|---|
| **NR5-1** — a raster export is not told its sun, light step or look; `TileRasterOpts` cannot name the drawn light step; the export's crown set may be evicted | `TileRasterOpts` gains `lightStep?: { azimuthCdeg; altitudeCdeg }` (the drawn light step, read by `faceLight`, the two-tone roof, `hillshade` and the crowns) beside `sun?` (now stated as the shadow sun, read only by the projected-shadow pass); the queue passes the view's drawn light step for `under`, `over` and `base` and the shadow sun wherever projected shadows are drawn; §8.4 says the drawn light step is passed as `TileRasterOpts.lightStep`. The raster-export request row now carries the look and view state as they stood at the request — the sheet (id@version, or the viewer's `stylePreset` sheet with the document's rows), §8.8's view-state switches (season, weather, shadow mode, model-layer toggles, `base` live layers), the shadow sun and the light step — which the tile worker keeps until the export completes and rasters every export tile with. Class 4 gains, in `lit` with a `path` sun, the export's crown bake (one sprite per unit) when its set is not cached, the set held until the export completes; §8.10 and §8.8 say a running export's set is held and counted with the export's canvases; §12.8 counts it in the export canvases and in *Canvases during a raster export*. §11.1: the export shows "the model, its look and its view state as they stood when it was requested". §12.7's *Export beside the view* run adds a `lit` export while a `path` sun advances one step per frame, byte-identical to the export made with the sun stopped at the request's time. | §8.4, §8.8, §8.9 (code, row, queue), §8.10, §11.1, §12.7, §12.8 |
| **NR5-2** — `LabelPlacer` takes `LabelEntity[]`, which lacks `areaM2`, `parent`, `revision` and contradicts the tile worker's delta-updated list | §9.2 declares `interface LabelRows { labels: LabelTable; strings: StringTable; geom: GeomTable }` in `@plat/model` beside `LodBand`, `Role`, `ZoomStop`; `begin` and `place` take `labels: LabelRows`; the tile worker's display list and each export's transient list implement it; `LabelEntity` stays the model record S13a writes and S14 reads. So that `@plat/labels` still never imports `@plat/render`, §8.1's first comment now places `LabelTable`, `StringTable` and `GeomTable` in `@plat/model` with `LabelRows` (their shapes are unchanged and declared once, in §8.1) — see *Homes chosen*, item 1. | §9.2, §8.1 |
| **NR5-3** — "7–10 % smaller" inverted | §12.7 now reads "the per-row rule gives the smallest file wherever rows carry gradients or texture — 6–9 % smaller than None's on the relief and textured looks" (receipt: 12.2 vs 13.4 MiB and 43.4 vs 46.3 MiB = 9.0 % and 6.3 %); the sentence stays in §12.7 (fact RENDERING-574), its "because" clauses point to J-R53. | §12.7 |

## Conflicts resolved

| conflict | resolution in the new text |
|---|---|
| RENDERING-C01 (NR5-2) | as NR5-2 above |
| RENDERING-C02 (NR5-1) | as NR5-1 above |
| RENDERING-C03 (NR5-3) | as NR5-3 above |
| RENDERING-C04 bench/calibrate 8 vs 32 tiles | §12.1 states 32 fixed tiles and carries the ≈ 40 ms ("the part that also picks the hardware tier at app start, §8.8"); §8.8 says "the Canvas2D part of `bench/calibrate` (§12.1)" |
| RENDERING-C05 the title | §9.1: the `title` label entity carries the map title's text as model data; the title is placed by §9.5's furniture rule (slot 24), not by S13b's greedy; §9.2's order drops "title >"; §9.5's title bullet names its text source |
| RENDERING-C06 wood and annotation | §9.2: ordered by the numeric `LabelEntity.priority`, "by default quarter / district > water > landmark > gate > way > address" (the default ranking of the kinds it lists); no rank invented for wood and annotation (**GAP-2 stays open for the owner / Fable**) |
| RENDERING-C07 interaction bar above the cap | §12.5: "in O12 (b)'s stress view of 40 000 buildings and 200 000 trees (above the request cap of §12.2, so a bench fixture, not a generated request)" |
| RENDERING-C08 warp-preview band | §12.6 states "≥ 30 fps for a brush radius ≤ 150 m at the district band"; §8.8 keeps the mechanism and says "frame rate: §12.6" |
| CANON-C01 pin vocabulary | §8.2 `symbol(glyph)` and §8.3's catalogue: "a point symbol for every `Pin.kind` of §2.7" — the 17-item list (with "tent") is gone |
| CANON-C03 frames called squares | §12.2's frame column: "frame area at the target (a rectangle of the blueprint's aspect, §3.2 (9); the square at the default aspect 1; + 30 % margin per side)" |
| CANON-C05 §4 vs §12.4 mechanisms | §12.4's header drops "(§4 follows it)"; its column reads "mechanism" with a pointer to the stage section (§4.2–§4.10, §3.3, §3.7); the rows keep work counts, rates and p50 |
| CANON-C06 overflow-rung inference | §9.4's acceptance keeps "≥ 99 % of all area-label glyph area inside its face (O13 a)" and drops "which caps the overflow rung at 5 % of the on-map area labels" |
| SCOPE-C01 model time against MFCG | §12.9 states the matched-count ratios (1.8× / 2.3× / 5.1×, pointing to §12.3's table) as the canonical figures; §12's intro paraphrases them as "about twice … five times" with a pointer; the other edits (§13.5, D-18, §1.1) are scope's |

## Homes chosen inside the part (single source; each vetoable)

1. **NR5-2's package placement.** `LabelRows` must live in `@plat/model`; declaring its column list there a second time
   would duplicate §8.1's `LabelTable`. I placed `LabelTable`, `StringTable` and `GeomTable` in `@plat/model` with
   `LabelRows` (shapes unchanged, declared once in §8.1) rather than copying 20 column declarations into `LabelRows`.
   Alternative for Fable: a structural `LabelRows` repeating the columns, keeping the three tables in `@plat/render`.
2. **NR5-1's sheet in the request.** The request carries the sheet as id@version (or the viewer's preset sheet with the
   document's rows), "which the tile worker keeps until the export completes"; the request bound stays "≤ 4 KB plus the
   list". How the tile worker holds an older sheet version while the view restyles is stated only as that rule
   (PLAUSIBLE that ≤ 4 KB holds when the preset sheet's rows are large).
3. **NR5-1's crown set.** Counted with the export's canvases (§12.8); its size is not quantified (the source gives none);
   the "≈ 15 MB" of band and tile canvases is unchanged and the held set is named beside it.
4. **Budgets are §12's (R8):** SVG size / element budgets (from §11.1) → §12.7; label placement budget (from §9.2) → §12.7;
   tree placement / drawing, stamp-tile load and crown-bake budgets (from §8.10) → §12.7; the label-composition number
   (from §8.9) → §12.7 with §8.9 keeping its measurement and fallback; re-compose cost (from §8.8) → §12.5's F(B);
   settle bounds → §12.5 only. Mechanisms stay at §8: the canvas budget (3P + 7 MB, tiers, DPR caps, worked cases) is
   stated once in §8.8 and §12.8 points to it.
5. **Other facts stated once:** scale bar accuracy → §9.5 (from §8.7); VTT grid default, 0 px per cell, model widths →
   §11.1 (from §8.7); SVG default band → §11.1 (from §8.7); "the default request" and the band ends' definition → §12.2
   (from §12.3 and §12.5); the quarter-candidate creation rule → §9.4 rung (5) (from §9.2); the placement unit → §9.2
   (from §8.9); the export-beside-the-view run → §12.7 (from §8.9); SVG text option → §11.1's SVG row (the separate
   paragraph merged in); §12.1's milestone list → each budget section states its own (§12.1 keeps the rule).
6. **Fix-round tags** (NR-, NR3-, NR4-, NR5-, VD2–4-, VK2–3-, VS4-, VP2-, NP4-) are dropped from the normative text as
   history pointers; requirement and audit tags (O-items, VIS-, GEO-, SCL-, MFP-, LC-, NF-, K, XB, COV-FTG-, DEF-, N-)
   are kept.
7. **Kept, although the canon lists them as restatements, because the home lacks them** (R13 union; noted for the home's
   editor below): the replay kinds "(load verification, migration, undo beyond the scoped records, the undo of an
   upgrade after a reload)" in §12.6; "Proxy thumbnails draw S0–S4 marks in a distinct preview style and are never
   presented as the map" in §8.5; the stamp-tile key's "four-lane finaliser" and "reroll, attempt, epoch and salt 0" in
   §8.10; the measured recomputation ≈ 35–38 ms (`fixall_det_r4_loaddigest.out`, `fixall_det_r5_recordsdigest.out`) in
   §12.6.

## Narration removed (validation record keeps it)

The 8 history items (058, 298, 382, 498, 530, 532, 556, 583) and: "retuned by fix-all round 2" (§8.2 role values);
"This replaces the 'WebGL2 post hooks' pointer" (§8.2); "`LayerSpec` gains" (§8.4); "the synchronous `raster()` call it
replaces" and "where the verifier's order put band answers after them" (§8.9, inside J-R40 / J-R46 passages); "moved
from S4" / "moved from S5" (§12.4 S2/S3 row); the round-by-round delta paragraph of §12.4 (a one-line PLAUSIBLE status
kept); "as D-18 did before" (§12.3); "over leaving it deferred" (J-R14 passage); "new in round 2" and the "≈ 6 MB per
thread" correction (§12.8); "The earlier TOWN bar at MFCG size 25" (§12.2); the old label bar ≥ min(12, …) (§9.4); the
NR4-1 no-shift note (§8.10). All are verbatim in `rewrite-rendering-rationale.md` where they sat on a rationale or
history line, and in the archived document otherwise.

## Cross-part notes (other parts' canonical text; not edited here)

* **scope — §14.** (a) Replace the `TileRasterOpts` copy by a pointer to §8.9 (the copy lacks NR5-1's `lightStep`) and the
  `RasterJob` / `TileBackend` copies likewise (R12); (b) replace the `LabelPlacer` copy by a pointer to §9.2 (the copy
  still takes `LabelEntity[]`); (c) the `@plat/model` package line (l.19) and the dependency paragraph (l.72: "the types
  both use (`LodBand`, `Role`, `ZoomStop`, `LabelEntity`) come from model") add `LabelRows`, `LabelTable`, `StringTable`
  and `GeomTable` (Homes chosen, item 1) — `@plat/labels` now reads `LabelRows`, not `LabelEntity`.
* **scope — Judgment calls / ARCHITECTURE-RATIONALE.md.** Add J-R55 (RENDERING-321) and J-R56 (RENDERING-515) from
  `rewrite-rendering-rationale.md`; J-R53's text should read "6–9 % smaller" if it quotes the PNG percentage; the
  inline passages of the part are longer than their J rows in places (J-R50's density measurements, J-R40's and J-R46's
  alternatives) — the sidecar holds them verbatim.
* **scope — §13.2** takes MODEL-430 / RENDERING-402 (the `.plat` round trip); **§13.5, D-18, §1.1** point to §12.9 /
  §12.3 for model time against MFCG (SCOPE-C01); **§1.1** frames as areas pointing to §3.2 (9) (CANON-C03); **§15.2's O3
  (d) row and D-18** point to §12.3's declaration (the text here now says "D-18 and §15.2's O3 (d) row refer to this declaration").
* **kernel — §3.7:** `E_ENGINE_UNAVAILABLE` is §11.2's API error (CANON-C04; §11.2 now says "not a kernel result, §3.1").
  §3.1's rows restating stamp tiles, instance placement and budgets (KERNEL-038/039/040) point to §8.10 / §12.7.
* **determinism — §6.1** `render.stampTiles` registry entry may add "four-lane finaliser; reroll, attempt, epoch and salt
  0" (Homes chosen, item 7); **§7.1**'s rotation sentence (DETERMINISM-357) now lives in §11.1 **Rotation** — §7.1
  keeps its "chose a view rotation" rationale and points; **§7.3 item 2** may add the replay kind "the undo of an
  upgrade after a reload" (§12.6); **§7.8** may add the preview-style clause, or keep pointing to §8.5; **§5.2
  F-LABEL** points to §9.4 (CANON-C06).
* **model — §2.9 step 3** may carry the measured recomputation ≈ 35–38 ms at CITY with its two receipts (§12.6 keeps
  it as evidence meanwhile); **§2.1 Layers** (MODEL-011) points to §8.4's `LayerSpec`; **§2.7 Greenery comment**
  (MODEL-289) points to §8.1 item 2 / §8.10; **§2.9 logHead** (MODEL-427) points to §11.3.
* **pipeline — §4.9**'s trees-at-render row calls avenues and hedgerows a "jittered grid (… 8–12 m)", while §8.10 (the
  layouts' home) places them on a jittered **line**; §4.9 should point to §8.10 for layouts and spacings. **II.4**
  (PIPELINE-431) points to §8.6 for the render tier. **§4.1** (PIPELINE-043, -048, -049) points to §8.9 (threads) and
  §12.3 (pool primacy); **§4.2 S1, §4.3, §4.5, §4.7, §4.9** must keep stating the mechanisms §12.4 now points to
  (CANON-C05; checked present on 2026-09-26: fBm grid and refinement, hydrology grids, hexagonal lattice with adjacency
  by construction, splat and three-box blur, distance rasters at 16 m and top-k, margin band 2 m).
* **GAP-2** (ranks for `wood` and `annotation` labels) is unchanged and goes to the owner / Fable.

## CONFIRMED vs PLAUSIBLE

CONFIRMED (executed here): all 599 inventory ids mapped (500 home, 29 referenced, 1 section restatement, 1 moved out, 60
rationale, 8 history; generated from `canon.json` and checked for count); every digit group of every home item's
values and statement found in the new text (script, two expected misses explained above); every `§` reference in the
new files resolves to a heading of the current document; every J id cited exists except the two new ones (J-R55,
J-R56) the canon assigns; the four heading lines are byte-identical to today's. PLAUSIBLE (reasoning only): that the
restatements replaced by pointers lose nothing at their homes beyond the details listed in *Homes chosen*, item 7 (each
home was read for the facts it must carry, not diffed word by word); the NR5-1 request bound (item 2) and the unquantified
crown-set size (item 3).

## Mapping table — every inventory id of this part

"§x.y …" = stated once there; "referenced to §x (FACT)" = the fact's home is in another part, this part points;
"J-Rn — rationale out" = the inline passage left (verbatim in the sidecar), "(J-Rn)" left behind.

| id | kind | new location |
|---|---|---|
| RENDERING-001 | summary | §8 intro (plain words, canonical figures) |
| RENDERING-002 | interface | §8.1 (code comment; package rule §14) |
| RENDERING-003 | type | §8.1 |
| RENDERING-004 | type | §8.1 |
| RENDERING-005 | interface | §8.1 |
| RENDERING-006 | rule | §8.1 |
| RENDERING-007 | rule | §8.1 |
| RENDERING-008 | rule | §8.1 item 3 and MarkTable.group comment |
| RENDERING-009 | rule | §8.1 |
| RENDERING-010 | interface | §8.1 |
| RENDERING-011 | interface | §8.1 |
| RENDERING-012 | interface | §8.1 |
| RENDERING-013 | interface | §8.1 |
| RENDERING-014 | interface | §8.1 |
| RENDERING-015 | interface | §8.1 |
| RENDERING-016 | interface | §8.1 |
| RENDERING-017 | interface | §8.1 |
| RENDERING-018 | rule | §8.1 |
| RENDERING-019 | rule | §8.1 |
| RENDERING-020 | rule | §8.1 |
| RENDERING-021 | rule | §8.1 |
| RENDERING-022 | rule | §8.1 |
| RENDERING-023 | rule | §8.1 |
| RENDERING-024 | rule | §8.1 |
| RENDERING-025 | rule | §8.1 |
| RENDERING-026 | rule | §8.1 |
| RENDERING-027 | rule | §8.1 |
| RENDERING-028 | rule | §8.1 item 3 (shipped entries stated once in §8.2 slot resolution) |
| RENDERING-029 | mechanism | §8.1 |
| RENDERING-030 | rule | referenced to §7.3 (DETERMINISM-407) |
| RENDERING-031 | rule | §8.1 |
| RENDERING-032 | rule | §8.1 |
| RENDERING-033 | defined-term | referenced to §6.1 (DETERMINISM-599) |
| RENDERING-034 | defined-term | §8.1 |
| RENDERING-035 | rule | §8.1 |
| RENDERING-036 | rule | section restatement → one-line pointer in §8.1 item 5 to §6.3 |
| RENDERING-037 | budget | §8.1 item 6 |
| RENDERING-038 | rule | §8.1 item 6 |
| RENDERING-039 | rule | §8.1 item 6 (detail §11.1) |
| RENDERING-040 | decision | J-R1 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R1)" left at §8.1 |
| RENDERING-041 | decision | J-R2 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R2)" left at §8.1 |
| RENDERING-042 | decision | J-R19 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R19)" left at §8.1 |
| RENDERING-043 | decision | J-R20 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R20)" left at §8.1 |
| RENDERING-044 | interface | §8.2 |
| RENDERING-045 | rule | §8.2 |
| RENDERING-046 | rule | §8.2 (StyleSheet comment) and §8.9 |
| RENDERING-047 | interface | §8.2 |
| RENDERING-048 | interface | §8.2 |
| RENDERING-049 | defined-term | §8.2 |
| RENDERING-050 | rule | §8.2 |
| RENDERING-051 | acceptance-bar | §8.2 |
| RENDERING-052 | test | §8.2 |
| RENDERING-053 | rule | §8.2 |
| RENDERING-054 | evidence | §8.2 |
| RENDERING-055 | rule | §8.2 |
| RENDERING-056 | rule | referenced to §6.1 (DETERMINISM-160) |
| RENDERING-057 | algorithm-step | §8.2 |
| RENDERING-058 | history | dropped — history (verbatim in rewrite-rendering-rationale.md; validation record keeps it) |
| RENDERING-059 | evidence | §8.2 |
| RENDERING-060 | acceptance-bar | §8.2 |
| RENDERING-061 | decision | J-R30 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R30)" left at §8.2 |
| RENDERING-062 | number | §8.2 |
| RENDERING-063 | evidence | §8.2 role values (evidence; "retuned by round 2" narration dropped) |
| RENDERING-064 | rule | §8.2 |
| RENDERING-065 | decision | J-R3 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R3)" left at §8.2 |
| RENDERING-066 | decision | J-R29 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R29)" left at §8.2 |
| RENDERING-067 | decision | J-R28 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R28)" left at §8.2 |
| RENDERING-068 | rule | §8.2 |
| RENDERING-069 | rule | §8.2 |
| RENDERING-070 | evidence | §8.2 |
| RENDERING-071 | number | §8.2 |
| RENDERING-072 | number | §8.2 |
| RENDERING-073 | rule | §8.2 |
| RENDERING-074 | rule | §8.2 |
| RENDERING-075 | defined-term | §8.2 |
| RENDERING-076 | rule | §8.2 |
| RENDERING-077 | rule | §8.2 |
| RENDERING-078 | rule | §8.2 |
| RENDERING-079 | rule | §8.2 |
| RENDERING-080 | rule | §8.2 |
| RENDERING-081 | rule | referenced to §2.7 (MODEL-293) |
| RENDERING-082 | rule | §8.2 |
| RENDERING-083 | rule | §8.2 |
| RENDERING-084 | rule | §8.2 |
| RENDERING-085 | rule | §8.2 |
| RENDERING-086 | rule | §8.2 |
| RENDERING-087 | rule | §8.2 |
| RENDERING-088 | rule | §8.2 |
| RENDERING-089 | rule | §8.2 post operations ("replaces the WebGL2 post hooks" narration dropped) |
| RENDERING-090 | interface | §8.2 |
| RENDERING-091 | rule | §8.2 |
| RENDERING-092 | rule | §8.2 |
| RENDERING-093 | rule | §8.2 |
| RENDERING-094 | rule | §8.2 |
| RENDERING-095 | rule | §8.2 layer order (lead paragraph) |
| RENDERING-096 | number | §8.2 layer-order table (RENDERING-C05) |
| RENDERING-097 | rule | §8.2 |
| RENDERING-098 | rule | §8.2 (after the table; RENDERING-C05) |
| RENDERING-099 | test | §8.2 (census pointer) / §8.3 draw-order row |
| RENDERING-100 | algorithm-step | §8.2 |
| RENDERING-101 | rule | §8.2 slot resolution |
| RENDERING-102 | test | §8.2 slot resolution / §8.3 slot-resolution row |
| RENDERING-103 | rule | §8.2 |
| RENDERING-104 | decision | J-R39 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R39)" left at §8.2 |
| RENDERING-105 | decision | J-R39 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R39)" left at §8.2 |
| RENDERING-106 | rule | §8.2 presets |
| RENDERING-107 | acceptance-bar | §8.2 presets (role continuity) |
| RENDERING-108 | number | §8.2 |
| RENDERING-109 | number | §8.2 |
| RENDERING-110 | number | §8.2 |
| RENDERING-111 | rule | §8.2 (faces; ruling §17.2) |
| RENDERING-112 | rule | §8.2 |
| RENDERING-113 | rule | §8.2 lit paragraph (definition of the light step: §8.4) |
| RENDERING-114 | rule | §8.2 |
| RENDERING-115 | rule | §8.2 lit paragraph / §8.10 crown library |
| RENDERING-116 | budget | §8.2 lit paragraph |
| RENDERING-117 | rule | §8.2 |
| RENDERING-118 | rule | §8.2 |
| RENDERING-119 | decision | J-R4 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R4)" left at §8.2 |
| RENDERING-120 | test | §8.2 |
| RENDERING-121 | rule | §8.3 catalogue (pin list → §2.7 Pin.kind, CANON-C01; crown count → §8.10) |
| RENDERING-122 | rule | §8.3 |
| RENDERING-123 | rule | §8.3 |
| RENDERING-124 | defined-term | §8.3 |
| RENDERING-125 | test | §8.3 |
| RENDERING-126 | test | §8.3 |
| RENDERING-127 | test | §8.3 |
| RENDERING-128 | test | §8.3 |
| RENDERING-129 | test | §8.3 |
| RENDERING-130 | test | §8.3 |
| RENDERING-131 | test | §8.3 |
| RENDERING-132 | test | §8.3 |
| RENDERING-133 | test | §8.3 |
| RENDERING-134 | test | §8.3 |
| RENDERING-135 | test | §8.3 |
| RENDERING-136 | test | §8.3 |
| RENDERING-137 | test | §8.3 |
| RENDERING-138 | test | §8.3 census row (floor values stated in §8.2) |
| RENDERING-139 | test | §8.3 |
| RENDERING-140 | test | §8.3 |
| RENDERING-141 | test | §8.3 |
| RENDERING-142 | test | §8.3 census row (bar stated in §8.2 presets) |
| RENDERING-143 | test | §8.3 |
| RENDERING-144 | test | §8.3 |
| RENDERING-145 | test | §8.3 |
| RENDERING-146 | test | §8.3 census row |
| RENDERING-147 | test | §8.3 census row |
| RENDERING-148 | test | §8.3 |
| RENDERING-149 | test | §8.3 |
| RENDERING-150 | test | §8.3 |
| RENDERING-151 | test | §8.3 |
| RENDERING-152 | test | §8.3 |
| RENDERING-153 | rule | §8.4 |
| RENDERING-154 | interface | §8.4 (LayerSpec; "gains" narration dropped) |
| RENDERING-155 | rule | §8.4 |
| RENDERING-156 | rule | referenced to II.6 (PIPELINE-441) |
| RENDERING-157 | defined-term | §8.4 |
| RENDERING-158 | defined-term | §8.4 |
| RENDERING-159 | rule | §8.4 |
| RENDERING-160 | rule | §8.4 |
| RENDERING-161 | rule | §8.4 |
| RENDERING-162 | rule | §8.4 |
| RENDERING-163 | interface | §8.4 |
| RENDERING-164 | number | §8.4 |
| RENDERING-165 | rule | §8.4 |
| RENDERING-166 | rule | §8.4 |
| RENDERING-167 | rule | §8.4 |
| RENDERING-168 | budget | §8.4 budget |
| RENDERING-169 | acceptance-bar | §8.4 |
| RENDERING-170 | budget | §8.4 budget (moving sun) |
| RENDERING-171 | acceptance-bar | §8.4 |
| RENDERING-172 | mechanism | §8.4 light steps |
| RENDERING-173 | rule | §8.4 light steps |
| RENDERING-174 | defined-term | §8.4 light steps (NR5-1: passed as TileRasterOpts.lightStep) |
| RENDERING-175 | acceptance-bar | §8.4 light steps (crown-bake bar → §12.7) |
| RENDERING-176 | decision | J-R54 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R54)" left at §8.4 |
| RENDERING-177 | decision | J-R54 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R54)" left at §8.4 |
| RENDERING-178 | rule | referenced to §2.6 (MODEL-269) |
| RENDERING-179 | rule | §8.5 |
| RENDERING-180 | rule | §8.5 |
| RENDERING-181 | defined-term | §8.5 |
| RENDERING-182 | rule | §8.5 |
| RENDERING-183 | rule | §8.5 |
| RENDERING-184 | algorithm-step | §8.5 |
| RENDERING-185 | rule | §8.5 |
| RENDERING-186 | acceptance-bar | §8.5 metrics (sentence untangled; values unchanged) |
| RENDERING-187 | rule | §8.5 metrics (road/ground rule) + referenced to §13.5 for the cover report (SCOPE-267) |
| RENDERING-188 | acceptance-bar | §8.5 |
| RENDERING-189 | decision | J-R5 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R5)" left at §8.5 |
| RENDERING-190 | rule | §8.5 |
| RENDERING-191 | acceptance-bar | §8.5 |
| RENDERING-192 | rule | §8.5 |
| RENDERING-193 | decision | J-R6 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R6)" left at §8.5 |
| RENDERING-194 | rule | §8.5 |
| RENDERING-195 | rule | §8.5 first paint (preview-style clause kept; proxies → §7.8, DETERMINISM-585) |
| RENDERING-196 | decision | J-R7 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R7)" left at §8.5 |
| RENDERING-197 | rule | §8.6 |
| RENDERING-198 | rule | §8.6 |
| RENDERING-199 | rule | §8.6 |
| RENDERING-200 | rule | §8.6 (one clause) / §8.9 threads (3) |
| RENDERING-201 | rule | §8.6 |
| RENDERING-202 | rule | §8.6 (cache key: §8.1 item 5) |
| RENDERING-203 | rule | §11.1 SVG row ("city band by default"); §8.7 points |
| RENDERING-204 | rule | §8.7 |
| RENDERING-205 | rule | §11.1 VTT row (model widths) and .dd2vtt scope (grid default, 0 px per cell); §8.7 points |
| RENDERING-206 | acceptance-bar | §9.5 scale bar; §8.7 points |
| RENDERING-207 | rule | §8.8 pyramid |
| RENDERING-208 | rule | §8.8 |
| RENDERING-209 | rule | §8.8 |
| RENDERING-210 | rule | §8.8 |
| RENDERING-211 | test | §8.8 content (tests are §8.3 rows 132, 141) |
| RENDERING-212 | mechanism | §8.8 composition (re-compose cost stated once in §12.5 F(B)) |
| RENDERING-213 | rule | §8.8 |
| RENDERING-214 | decision | J-R21 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R21)" left at §8.8 |
| RENDERING-215 | rule | §8.8 cache and invalidation (RENDERING-C02) |
| RENDERING-216 | rule | §8.8 |
| RENDERING-217 | rule | §8.8 |
| RENDERING-218 | budget | §8.8 canvas budget (NR5-1: an export-held crown set counts in §12.8) |
| RENDERING-219 | budget | §8.8 |
| RENDERING-220 | budget | §8.8 |
| RENDERING-221 | evidence | §8.8 |
| RENDERING-222 | rule | §8.8 |
| RENDERING-223 | rule | §8.8 canvas budget (tile count → §12.1, RENDERING-C04) |
| RENDERING-224 | decision | J-R22 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R22)" left at §8.8 |
| RENDERING-225 | rule | §8.8 |
| RENDERING-226 | rule | §8.8 |
| RENDERING-227 | decision | J-R8 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R8)" left at §8.8 |
| RENDERING-228 | mechanism | §8.8 |
| RENDERING-229 | budget | §8.8 |
| RENDERING-230 | rule | §8.8 warp preview (budget → §12.6, RENDERING-C08) |
| RENDERING-231 | rule | §8.9 |
| RENDERING-232 | rule | §8.9 first bullet (one clause → §11.1) |
| RENDERING-233 | rule | §8.9 |
| RENDERING-234 | acceptance-bar | §8.9 |
| RENDERING-235 | rule | §8.9 |
| RENDERING-236 | decision | J-R9 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R9)" left at §8.9 |
| RENDERING-237 | acceptance-bar | §8.9 text (measurement, fallback); budget number → §12.7 |
| RENDERING-238 | rule | §8.9 threads (1) (export detail → §11.1) |
| RENDERING-239 | rule | §8.9 threads (2) (pool size → §4.1) |
| RENDERING-240 | rule | §8.9 threads (3) |
| RENDERING-241 | rule | §8.9 |
| RENDERING-242 | interface | §8.9 |
| RENDERING-243 | interface | §8.9 |
| RENDERING-244 | interface | §8.9 |
| RENDERING-245 | interface | §8.9 |
| RENDERING-246 | interface | §8.9 what-crosses row (NR5-1) |
| RENDERING-247 | interface | §8.9 |
| RENDERING-248 | budget | §8.9 |
| RENDERING-249 | rule | §8.9 |
| RENDERING-250 | type | §8.9 |
| RENDERING-251 | interface | §8.9 TileRasterOpts (NR5-1) |
| RENDERING-252 | interface | §8.9 |
| RENDERING-253 | algorithm-step | §8.9 |
| RENDERING-254 | rule | §8.9 |
| RENDERING-255 | rule | §8.9 |
| RENDERING-256 | number | §8.9 |
| RENDERING-257 | mechanism | §8.9 queue (NR5-1: class-4 crown bake) |
| RENDERING-258 | rule | §8.9 |
| RENDERING-259 | rule | §8.9 |
| RENDERING-260 | budget | §8.9 queue (settle bounds → §12.5) |
| RENDERING-261 | rule | §8.9 |
| RENDERING-262 | mechanism | §8.9 "stepped like a raster" (unit definition → §9.2) |
| RENDERING-263 | budget | §8.9 (print placement budget → §12.7) |
| RENDERING-264 | rule | §8.9 |
| RENDERING-265 | budget | §8.9 |
| RENDERING-266 | rule | §8.9 |
| RENDERING-267 | acceptance-bar | §8.9 queries measurement; the export-beside-the-view run → §12.7 (RENDERING-575) |
| RENDERING-268 | acceptance-bar | §8.9 |
| RENDERING-269 | decision | J-R40 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R40)" left at §8.9 |
| RENDERING-270 | decision | J-R40 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R40)" left at §8.9 |
| RENDERING-271 | decision | J-R46 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R46)" left at §8.9 |
| RENDERING-272 | decision | J-R51 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R51)" left at §8.9 |
| RENDERING-273 | decision | J-R10 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R10)" left at §8.9 |
| RENDERING-274 | decision | J-R23 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R23)" left at §8.9 |
| RENDERING-275 | interface | §8.10 |
| RENDERING-276 | rule | §8.10 |
| RENDERING-277 | rule | §8.10 (canon home; §4.9 also gives the ranges in m) |
| RENDERING-278 | number | §8.10 |
| RENDERING-279 | defined-term | §8.10 |
| RENDERING-280 | rule | §8.10 |
| RENDERING-281 | invariant | §8.10 |
| RENDERING-282 | evidence | §8.10 tiles (evidence) |
| RENDERING-283 | rule | §8.10 |
| RENDERING-284 | rule | §8.10 |
| RENDERING-285 | rule | §8.10 |
| RENDERING-286 | rule | referenced to §6.1 (DETERMINISM-161); key words and zero components kept in §8.10 |
| RENDERING-287 | algorithm-step | §8.10 |
| RENDERING-288 | algorithm-step | §8.10 |
| RENDERING-289 | algorithm-step | §8.10 |
| RENDERING-290 | rule | §8.10 |
| RENDERING-291 | number | §8.10 |
| RENDERING-292 | decision | J-R50 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R50)" left at §8.10 |
| RENDERING-293 | decision | J-R50 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R50)" left at §8.10 |
| RENDERING-294 | interface | §8.10 |
| RENDERING-295 | rule | §8.10 |
| RENDERING-296 | acceptance-bar | §8.10 |
| RENDERING-297 | rule | §8.10 asset (view-shift record → §13.3, SCOPE-236) |
| RENDERING-298 | history | dropped — history (verbatim in rewrite-rendering-rationale.md; validation record keeps it) |
| RENDERING-299 | decision | J-R42 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R42)" left at §8.10 |
| RENDERING-300 | algorithm-step | §8.10 |
| RENDERING-301 | algorithm-step | §8.10 |
| RENDERING-302 | invariant | §8.10 |
| RENDERING-303 | defined-term | §8.10 |
| RENDERING-304 | rule | §8.10 |
| RENDERING-305 | decision | J-R52 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R52)" left at §8.10 |
| RENDERING-306 | algorithm-step | §8.10 |
| RENDERING-307 | algorithm-step | §8.10 |
| RENDERING-308 | rule | §8.10 |
| RENDERING-309 | rule | §8.10 |
| RENDERING-310 | rule | §8.10 |
| RENDERING-311 | rule | §8.10 per-instance look (NR5-1: export-held set) |
| RENDERING-312 | interface | referenced to §7.1 (DETERMINISM-321); op semantics kept in §8.10 edits |
| RENDERING-313 | rule | §8.10 |
| RENDERING-314 | rule | §8.10 |
| RENDERING-315 | rule | §8.10 |
| RENDERING-316 | decision | J-R24 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R24)" left at §8.10 |
| RENDERING-317 | rule | §8.10 |
| RENDERING-318 | budget | §12.7 trees (budgets stated once); §8.10 points |
| RENDERING-319 | decision | J-R11 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R11)" left at §8.10 |
| RENDERING-320 | decision | J-R25 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R25)" left at §8.10 |
| RENDERING-321 | decision | J-R55 (new row) — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R55)" left at §8.10 |
| RENDERING-322 | decision | J-R48 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R48)" left at §8.10 |
| RENDERING-323 | decision | J-R50 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R50)" left at §8.10 |
| RENDERING-324 | summary | §9 intro |
| RENDERING-325 | rule | §9.1 |
| RENDERING-326 | interface | §9.1 (RENDERING-C05: title sentence) |
| RENDERING-327 | interface | §9.1 |
| RENDERING-328 | interface | §9.1 |
| RENDERING-329 | interface | §9.1 |
| RENDERING-330 | rule | §9.1 |
| RENDERING-331 | rule | §9.1 view bullet → §9.2 pin pass |
| RENDERING-332 | rule | referenced to §7.4 (DETERMINISM-514) |
| RENDERING-333 | rule | §9.1 |
| RENDERING-334 | test | referenced to §13.3 (SCOPE-240) |
| RENDERING-335 | rule | referenced to §7.1 (DETERMINISM-328) |
| RENDERING-336 | decision | J-R12 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R12)" left at §9.1 |
| RENDERING-337 | rule | §9.2 metrics (face named in §8.2 / §17.2) |
| RENDERING-338 | test | §9.2 |
| RENDERING-339 | rule | §9.2 font features (+ J-R37 index) |
| RENDERING-340 | rule | §9.2 |
| RENDERING-341 | rule | §9.2 |
| RENDERING-342 | rule | §9.2 |
| RENDERING-343 | rule | §9.2 candidate set (quarter-candidate rule stated once in §9.4 rung (5)) |
| RENDERING-344 | rule | §9.2 greedy (RENDERING-C05, -C06) |
| RENDERING-345 | rule | §9.2 |
| RENDERING-346 | interface | §9.2 LabelRows / LabelPlacer (NR5-2) |
| RENDERING-347 | interface | §9.2 |
| RENDERING-348 | algorithm-step | §9.2 resumable placement |
| RENDERING-349 | rule | §9.2 resumable placement |
| RENDERING-350 | rule | §9.2 resumable placement |
| RENDERING-351 | rule | §9.2 |
| RENDERING-352 | rule | §9.2 |
| RENDERING-353 | rule | §9.2 |
| RENDERING-354 | rule | §9.2 |
| RENDERING-355 | test | §9.2 |
| RENDERING-356 | rule | §9.2 |
| RENDERING-357 | rule | §9.2 |
| RENDERING-358 | budget | §12.7 labels (budget stated once); §9.2 points |
| RENDERING-359 | decision | J-R26 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R26)" left at §9.2 |
| RENDERING-360 | decision | J-R45 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R45)" left at §9.2 |
| RENDERING-361 | decision | J-R45 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R45)" left at §9.2 |
| RENDERING-362 | decision | J-R27 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R27)" left at §9.2 |
| RENDERING-363 | decision | J-R51 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R51)" left at §9.2 |
| RENDERING-364 | algorithm-step | §9.3 |
| RENDERING-365 | acceptance-bar | referenced to §13.7 (SCOPE-326) |
| RENDERING-366 | rule | §9.3 |
| RENDERING-367 | rule | §9.3 |
| RENDERING-368 | rule | §9.3 |
| RENDERING-369 | rule | §9.3 |
| RENDERING-370 | acceptance-bar | §9.4 |
| RENDERING-371 | algorithm-step | §9.4 |
| RENDERING-372 | rule | §9.4 rung (5) |
| RENDERING-373 | rule | referenced to §4.5 (PIPELINE-199) |
| RENDERING-374 | rule | §9.4 |
| RENDERING-375 | rule | §9.4 quarters |
| RENDERING-376 | rule | §9.4 halo (floor values in §8.2) |
| RENDERING-377 | evidence | §9.4 |
| RENDERING-378 | rule | §9.4 |
| RENDERING-379 | decision | J-R28 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R28)" left at §9.4 |
| RENDERING-380 | acceptance-bar | §9.4 acceptance (CANON-C06 clause removed) |
| RENDERING-381 | acceptance-bar | §9.4 |
| RENDERING-382 | history | dropped — history (verbatim in rewrite-rendering-rationale.md; validation record keeps it) |
| RENDERING-383 | acceptance-bar | §9.5 scale bar (merged with RENDERING-206) |
| RENDERING-384 | rule | §9.5 |
| RENDERING-385 | algorithm-step | §9.5 |
| RENDERING-386 | rule | §9.5 |
| RENDERING-387 | rule | §9.5 |
| RENDERING-388 | rule | §9.5 title (RENDERING-C05) |
| RENDERING-389 | rule | §9.5 |
| RENDERING-390 | interface | §9.5 |
| RENDERING-391 | rule | §9.5 |
| RENDERING-392 | decision | J-R13 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R13)" left at §9.5 |
| RENDERING-393 | rule | §9.5 |
| RENDERING-394 | rule | §9.5 |
| RENDERING-395 | rule | §9.5 |
| RENDERING-396 | rule | referenced to §6.3 (DETERMINISM-224) |
| RENDERING-397 | rule | §9.6 |
| RENDERING-398 | rule | referenced to §6.3 (DETERMINISM-232) |
| RENDERING-399 | rule | §9.6 |
| RENDERING-400 | test | §9.6 |
| RENDERING-401 | summary | §11 intro |
| RENDERING-402 | rule | referenced to §13.2 (MODEL-430, moved out) |
| RENDERING-403 | rule | §11.1 |
| RENDERING-404 | rule | §11.1 |
| RENDERING-405 | rule | §11.1 GeoJSON row |
| RENDERING-406 | rule | §11.1 GeoJSON row |
| RENDERING-407 | test | §11.1 GeoJSON row |
| RENDERING-408 | rule | §11.1 SVG row |
| RENDERING-409 | rule | §11.1 SVG row |
| RENDERING-410 | budget | §12.7 SVG (budgets stated once); §11.1 points |
| RENDERING-411 | test | §11.1 SVG row (notes) |
| RENDERING-412 | rule | §11.1 |
| RENDERING-413 | rule | §11.1 |
| RENDERING-414 | rule | §11.1 |
| RENDERING-415 | rule | §11.1 |
| RENDERING-416 | rule | §11.1 |
| RENDERING-417 | rule | §11.1 |
| RENDERING-418 | test | §11.1 |
| RENDERING-419 | rule | §11.1 |
| RENDERING-420 | rule | referenced to §6.4 (DETERMINISM-269) |
| RENDERING-421 | rule | §11.1 |
| RENDERING-422 | algorithm-step | §11.1 |
| RENDERING-423 | number | §11.1 |
| RENDERING-424 | rule | §11.1 |
| RENDERING-425 | rule | §11.1 |
| RENDERING-426 | decision | J-R31 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R31)" left at §11.1 |
| RENDERING-427 | rule | §11.1 SVG row (text option merged in) |
| RENDERING-428 | decision | J-R32 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R32)" left at §11.1 |
| RENDERING-429 | rule | §11.1 |
| RENDERING-430 | mechanism | §11.1 where exports run (≈ 21 / ≈ 54 ms → §12.7) |
| RENDERING-431 | budget | §11.1 (→ §12.7 time, §12.8 peak) |
| RENDERING-432 | mechanism | §11.1 where exports run (NR5-1) |
| RENDERING-433 | rule | §11.1 where exports run (NR5-1: look and view state too) |
| RENDERING-434 | decision | J-R41 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R41)" left at §11.1 |
| RENDERING-435 | decision | J-R47 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R47)" left at §11.1 |
| RENDERING-436 | interface | §11.1 |
| RENDERING-437 | evidence | §11.1 |
| RENDERING-438 | rule | §11.1 |
| RENDERING-439 | acceptance-bar | §11.1 |
| RENDERING-440 | decision | J-R43 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R43)" left at §11.1 |
| RENDERING-441 | rule | §11.1 |
| RENDERING-442 | rule | §11.1 .dd2vtt profile |
| RENDERING-443 | interface | §11.1 .dd2vtt profile |
| RENDERING-444 | rule | §11.1 .dd2vtt profile |
| RENDERING-445 | decision | J-R14 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R14)" left at §11.1 |
| RENDERING-446 | type | §11.2 |
| RENDERING-447 | interface | §11.2 |
| RENDERING-448 | type | §11.2 ApplyResult (logHead → §11.3) |
| RENDERING-449 | type | §11.2 |
| RENDERING-450 | type | §11.2 |
| RENDERING-451 | interface | §11.2 |
| RENDERING-452 | rule | §11.2 confirming fates (API part); semantics referenced to §7.3 item 4 (DETERMINISM-455) |
| RENDERING-453 | rule | §11.2 |
| RENDERING-454 | decision | J-R33 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R33)" left at §11.2 |
| RENDERING-455 | budget | §11.2 |
| RENDERING-456 | rule | §11.2 |
| RENDERING-457 | rule | §11.2 |
| RENDERING-458 | rule | §11.2 engine (CANON-C04) |
| RENDERING-459 | interface | §11.3 |
| RENDERING-460 | interface | §11.3 |
| RENDERING-461 | defined-term | §11.3 logHead (canonical home) |
| RENDERING-462 | rule | §11.3 |
| RENDERING-463 | rule | §11.3 |
| RENDERING-464 | test | §11.3 |
| RENDERING-465 | rule | §11.3 version handshake |
| RENDERING-466 | rule | referenced to §2.9 view state (MODEL-428); §11.3 keeps the bridge messages |
| RENDERING-467 | rule | referenced to §10.3 (PIPELINE-387); one clause kept in §11.3 |
| RENDERING-468 | rule | §11.3 |
| RENDERING-469 | decision | J-R34 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R34)" left at §11.3 |
| RENDERING-470 | rule | §11.3 |
| RENDERING-471 | rule | §11.3 roles — bridged load verification |
| RENDERING-472 | rule | §11.3 |
| RENDERING-473 | rule | §11.4 |
| RENDERING-474 | rule | referenced to §2.9 pack-set cap (MODEL-379) |
| RENDERING-475 | rule | referenced to Staged by the owner's roadmap (SCOPE-552) |
| RENDERING-476 | decision | §11.5 |
| RENDERING-477 | interface | §11.5 |
| RENDERING-478 | decision | J-R15 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R15)" left at §11.5 |
| RENDERING-479 | decision | J-R16 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R16)" left at §11.5 |
| RENDERING-480 | summary | §12 intro (canonical figures: 58 800 not 59 000) |
| RENDERING-481 | defined-term | §12.1 |
| RENDERING-482 | evidence | §12.1 |
| RENDERING-483 | rule | §12.1 |
| RENDERING-484 | defined-term | §12.1 |
| RENDERING-485 | defined-term | §12.1 calibration (32 tiles, ≈ 40 ms; RENDERING-C04) |
| RENDERING-486 | rule | §12.1 |
| RENDERING-487 | rule | §12.1 |
| RENDERING-488 | rule | §12.1 |
| RENDERING-489 | budget | §12.1 |
| RENDERING-490 | decision | J-R49 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R49)" left at §12.1 |
| RENDERING-491 | rule | §12.1 (rule kept; each of §12.3, §12.5, §12.7, §12.8 states its own milestones) |
| RENDERING-492 | rule | §12.1 |
| RENDERING-493 | number | §12.2 table (CANON-C03 header) |
| RENDERING-494 | number | §12.2 |
| RENDERING-495 | rule | §12.2 |
| RENDERING-496 | rule | referenced to §1.1 (SCOPE-076) |
| RENDERING-497 | evidence | §12.2 |
| RENDERING-498 | history | dropped — history (verbatim in rewrite-rendering-rationale.md; validation record keeps it) |
| RENDERING-499 | rule | referenced to §4.1 (PIPELINE-044); configuration sentence kept in §12.3 |
| RENDERING-500 | rule | §12.3 |
| RENDERING-501 | budget | §12.3 |
| RENDERING-502 | budget | §12.3 |
| RENDERING-503 | rule | §12.3 |
| RENDERING-504 | budget | §12.3 |
| RENDERING-505 | rule | §12.2 (default request defined once) + §12.3 values |
| RENDERING-506 | decision | §12.3 declared ("as D-18 did before" dropped) |
| RENDERING-507 | acceptance-bar | §12.3 |
| RENDERING-508 | acceptance-bar | §12.3 |
| RENDERING-509 | test | §12.3 |
| RENDERING-510 | rule | §12.3 |
| RENDERING-511 | evidence | §12.3 |
| RENDERING-512 | decision | J-R44 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R44)" left at §12.3 |
| RENDERING-513 | test | §12.3 |
| RENDERING-514 | acceptance-bar | §12.3 |
| RENDERING-515 | decision | J-R56 (new row) — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R56)" left at §12.3 |
| RENDERING-516 | budget | §12.4 S1 row (mechanism → §4.2, CANON-C05) |
| RENDERING-517 | budget | §12.4 S2/S3 row ("moved from S4/S5" dropped) |
| RENDERING-518 | budget | §12.4 S4 row (mechanism → §4.3) |
| RENDERING-519 | budget | §12.4 S5 row |
| RENDERING-520 | budget | §12.4 S6 row (mechanism → §4.5, CANON-C05) |
| RENDERING-521 | budget | §12.4 S7, S8, S9 rows |
| RENDERING-522 | budget | §12.4 S7b/S10a and S12a rows |
| RENDERING-523 | budget | §12.4 S10 (0) row |
| RENDERING-524 | budget | §12.4 pooled row (CANON-C05) |
| RENDERING-525 | budget | §12.4 hinterland row (CANON-C05) |
| RENDERING-526 | budget | §12.4 merge row |
| RENDERING-527 | budget | §12.4 S13a, statistics, digest, critical path, S14 rows |
| RENDERING-528 | rule | §12.4 stated assumptions |
| RENDERING-529 | rule | §12.4 stated assumptions |
| RENDERING-530 | history | dropped — history (verbatim in rewrite-rendering-rationale.md; validation record keeps it) |
| RENDERING-531 | budget | §12.4 stated assumptions (single-worker, METROPOLIS, TOWN) |
| RENDERING-532 | history | dropped — history (verbatim in rewrite-rendering-rationale.md; validation record keeps it) |
| RENDERING-533 | acceptance-bar | §12.4 M0 spike |
| RENDERING-534 | rule | §12.5 |
| RENDERING-535 | budget | §12.5 |
| RENDERING-536 | budget | §12.5 |
| RENDERING-537 | rule | §12.2 (default request defined once); §12.5 points |
| RENDERING-538 | decision | §12.5 declared miss |
| RENDERING-539 | acceptance-bar | §12.5 |
| RENDERING-540 | acceptance-bar | §12.5 |
| RENDERING-541 | budget | §12.5 interaction (RENDERING-C07: stress fixture above the cap) |
| RENDERING-542 | budget | §12.5 |
| RENDERING-543 | acceptance-bar | §12.5 |
| RENDERING-544 | budget | §12.5 |
| RENDERING-545 | budget | §12.5 |
| RENDERING-546 | budget | §12.5 |
| RENDERING-547 | rule | §12.5 (end of draw calls / uploads paragraph) |
| RENDERING-548 | decision | J-R35 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R35)" left at §12.5 |
| RENDERING-549 | budget | §12.6 (re-raster rate → §12.5) |
| RENDERING-550 | budget | §12.6 |
| RENDERING-551 | budget | §12.6 |
| RENDERING-552 | acceptance-bar | §12.6 |
| RENDERING-553 | rule | §12.6 replay (order → §7.3) |
| RENDERING-554 | budget | §12.6 |
| RENDERING-555 | budget | §12.6 |
| RENDERING-556 | history | dropped — history (verbatim in rewrite-rendering-rationale.md; validation record keeps it) |
| RENDERING-557 | rule | referenced to §2.9 step 3 (MODEL-392); measured recomputation kept as evidence in §12.6 |
| RENDERING-558 | acceptance-bar | §12.6 |
| RENDERING-559 | decision | J-R36 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R36)" left at §12.6 |
| RENDERING-560 | budget | §12.6 warp preview (RENDERING-C08: "at the district band") |
| RENDERING-561 | acceptance-bar | §12.6 |
| RENDERING-562 | rule | referenced to §7.8 (DETERMINISM-586) |
| RENDERING-563 | budget | §12.7 |
| RENDERING-564 | budget | §12.7 |
| RENDERING-565 | budget | §12.7 |
| RENDERING-566 | budget | §12.7 |
| RENDERING-567 | acceptance-bar | §12.7 |
| RENDERING-568 | budget | §12.7 SVG (merged with RENDERING-410) |
| RENDERING-569 | budget | §12.7 |
| RENDERING-570 | evidence | §12.7 |
| RENDERING-571 | rule | §12.7 PNG bullet (last sentence) |
| RENDERING-572 | acceptance-bar | §12.7 |
| RENDERING-573 | acceptance-bar | §12.7 |
| RENDERING-574 | decision | §12.7 (NR5-3: 6–9 %); "because" clauses → J-R53 |
| RENDERING-575 | acceptance-bar | §12.7 export beside the view (NR5-1) |
| RENDERING-576 | acceptance-bar | §12.7 |
| RENDERING-577 | budget | §12.7 |
| RENDERING-578 | budget | §12.7 |
| RENDERING-579 | rule | §12.8 |
| RENDERING-580 | budget | §12.8 model working set (canvas → §8.8) |
| RENDERING-581 | rule | §12.8 thread holdings (roles → §8.9, sizes §8.1 item 6) |
| RENDERING-582 | budget | §12.8 |
| RENDERING-583 | history | dropped — history (verbatim in rewrite-rendering-rationale.md; validation record keeps it) |
| RENDERING-584 | budget | §12.8 |
| RENDERING-585 | rule | referenced to §4.1 (PIPELINE-047); memory consequence kept in §12.8 |
| RENDERING-586 | acceptance-bar | §12.8 M2a measurement |
| RENDERING-587 | budget | §12.8 CITY line |
| RENDERING-588 | budget | §12.8 export-time peak |
| RENDERING-589 | rule | §12.8 export-time peak |
| RENDERING-590 | budget | §12.8 export-time peak (NR5-1: held crown set) |
| RENDERING-591 | acceptance-bar | §12.8 export-time peak |
| RENDERING-592 | budget | §8.8 canvas budget (stated once); §12.8 points |
| RENDERING-593 | rule | §12.8 canvases during a raster export (NR5-1) |
| RENDERING-594 | acceptance-bar | §12.8 measurement and fallback |
| RENDERING-595 | acceptance-bar | §12.8 measurement and fallback |
| RENDERING-596 | evidence | §12.9 |
| RENDERING-597 | evidence | §12.9 |
| RENDERING-598 | decision | §12.9 declared trade (miss figures → §12.3, §12.5) + J-R17 index |
| RENDERING-599 | decision | J-R18 — rationale out (verbatim in rewrite-rendering-rationale.md); "(J-R18)" left at §12.9 |