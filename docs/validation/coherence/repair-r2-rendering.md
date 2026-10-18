# repair-r2-rendering — lane coherence/repair-rendering-r2 (unit rendering: base §8, §9, §11, §12)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-rendering-r2; covered by the whole-design retrovalidation (J84).

# Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): text before the first block header
# is ignored. Base: docs/ARCHITECTURE.md sha256 137ecc0e4fe12c44… (assemble-r1's output; no round-2 assemble has run).
# Each REPLACE body is the live subsection with count-asserted substitutions — work dir
# docs/validation/coherence/work/repair-rendering-r2/: orig/ split from the live base by split.py, patches/010–200
# (80 hunks, each OLD text found exactly once), apply.py, gen_blocks.py; every untouched line is verbatim.
# Blocks: 19 REPLACE (§8.1, §8.2, §8.4, §8.6, §8.7, §8.8, §8.9, §8.11, §9.5, §11.1, §11.2, §11.3, §11.4, §11.6, §12.1,
# §12.5, §12.7, §12.8, §12.10). Ruling requests: 0. Binding rulings applied: adjudication-r2's R2-05, R2-10, R2-21,
# R2-29, R2-30, R2-31, R2-32, R2-33, R2-35, R2-36, R2-37, R2-38, R2-39, R2-40, R2-41, R2-42.
# Run: started 06:42, cut at ≈ 07:09 by a usage limit with patches 010–050 saved; resumed under the CONTINUE rule (live
# base re-split and found byte-identical to orig/), patches 060–200 written, every saved patch re-checked.
#
# PROGRESS
# - P0 brief, adjudication-r2 (16 rendering rulings, Part H · rendering, receiving ends), g items 120–126 and the canon's
#   routings read: done
# - P1 live §8.1–§8.11, §9.5, §9.7, §11.1–§11.6, §12.1–§12.10 read whole where touched; landed sibling blocks (model r2
#   §2.6 step 7 and §2.9; pipeline r2 §10.2 *Crisis looks*) and the volumes' Find, crisis, damage and weather ends read
#   for shared names: done
# - P2 patches 010–200: done (all 28 ids carried)
# - P3 blocks generated; dry run on copies, alone and with the landed siblings: done
# - P4 doc checks, reference resolution, size: done
# - P5 result saved; LANDED: done
#
# ISSUES → WHERE FIXED (28 routed ids, 25 distinct fixes; every one FIXED in text; none INVALID; none parked)
#  §11.2  VAH-31 (R2-10; with VV910-02 = its (b) and VV1112-r1-06 = its (c), one fix each): `barrier: BarrierKind /* §2.7 */`
#         in WhyAnswer.closure[], MapBrief.walls[].open[] and the preview's arcs[]; RuleAnswer.register in VV910-02's
#         words (V12 §2.10's dist/evidence.json, `entry` optional, status with 'owner'); WhyAnswer.members.step:
#         LadderStep (V11 §2.6). The dropped "'sheer' an island's rim" comment is §2.7's BarrierKind comment (restatement).
#  §11.2  VDC1-15 and VAT-R1-01 (R2-21 (e)): ConflictAction.kind without 'reroute'; `advance` on a dossier-bound document
#         answers { status: 'conflict', outcome: { key: 'refuse.dossierClock' }, actions: [] }, its call-table row
#         adding the dossier-clock conflict. VV910-r1-01 (R2-42): `generate`'s and `export`'s `signal?: AbortSignal`.
#         VRC1T-06 (R2-42): Progress.wait gains 'verify' and 'undo'; `edit` takes opts.onProgress; `open`'s comment.
#         R2-42's receiving end of VV910-r1-02: `advance`'s `stopAfter?: number`.
#  §8.2   VAL-R1-05 (R2-29 (a)): slot resolution lists every shipped sheet for the sky's entries and adds the underground's
#         `under.*` entries (V04 §5.2's per-family facts). VAL-R1-11 and VAL-R1-12 (R2-29 (b)): the place table carries
#         every village reading V07 §5.1 states; *Autumn's covers* names its way classes from §2.4's WayClass under V11's
#         `season.cover` surface keys and adds crofts, closes, toft yards and hedges; *Water in winter* adds a leat's
#         take-off; §8.1 item 8 cites §8.2's leads. VRC1T-10: `cvdVariant`'s default is §2.9's.
#  §8.4   VRC1T-04: the drawn sun clamped to [7.1°, 89°], the loader clamping a sheet outside (0°, 90°); VRC1T-03: (h)'s
#         extension marker covers item 117's rows and sun, `live.festival`, `live.crises`, the weather effects and
#         §8.10's boats (Find, a tool's overlay, draws under every preset).
#  §8.8   VRC1T-07: the margin is the cell `view.zoomOutMarginStops`, no value. VEW-r1-05 (R2-30): where no stop fits,
#         k_fit = k_min = 0, the view at stop 0 centred, V09's `info.zoom.coarsest`; no stop added.
#  §8.11  T-ER-08 (R2-30: the METROPOLIS cap at 1 280 × 720 and 600 × 480 CSS px; the 390 × 844 phone viewport MOOT,
#         R2-41; the crisis-widened limit); T-ER-23 (VRC1T-08's identifiers; VRC1T-04's 10° and 0° sheets; R2-39's snow;
#         VRC1T-03's parity fixture); T-ER-24 (VRC1T-03's parity fixture with a festival). §9.5: Fit reads "the whole
#         limit bounds, or stop 0 where they do not fit".
#  §12    VRC1T-01 and VV56-r1-06 (R2-31 (c), (d)): §12.1's open runs to the editable complete map, verification after it,
#         off the path; advance and a history-first generation each in total; a catch-up coarsened as an advance is
#         (R2-31 (a)); R12-31 likewise. VRC1T-05: §12.1, §12.7 and R12-31 scope the export comfort level to the preset
#         sizes up to A2 at 300 dpi, a custom size past them staying offered (§8.7).
#  §11.3  VRC1T-02 (R2-33 (b)): the per-viewer keys that never cross a bridge — `yearWeek`, `seasonFollow`, `festival`,
#         `cvdVariant`, `find`, `crises` (model r2's hand-off), `thematic`, `workingLayer`, `showUnexcavated`, V09 §4.19's
#         — with the weather spell; `knowledge` travels; the host's view commands travel.
#  NEW DESIGN (owner items, at build depth, each with its wiring, lifecycle, edges, tests and register rows):
#  G120-rendering (R2-32, R2-33, R2-35; with VV34-r1-04): §8.2 *Find* — `live.find` (the Coverage view's one successor,
#         replacing `live.coverage`), the veil (cut out at the matches), the halo, area chips, city-band pins and count
#         bubbles (one layer, one island), ghost pins with a Below match's band label (VV34-r1-04), Show gaps' dashed
#         "none here" outline, chip colours `find.1` … `find.8` with glyph and dash second cues; §9.5 Find among the tools
#         and the legend's chips; §11.1 picture exports draw it, battle maps only on `find: true`; §11.2 the gazetteer's
#         `counts`, `chips`, `gaps` and `GazetteerAnswer` (class counts; the match listing by class, area and layer; the
#         chip kinds' match rule, T120-2's definition); §12.5 and R12-35 the overlay budget; §8.11 T-ER-25; M5.
#  G121-rendering (R2-35, R2-36): §8.8 *Resolution and the Auto loop* (AppPrefs.resolution; the ladder 3 · 2 · 1.5 · 1 ·
#         0.75 · 0.5; a manual level's DPR; the 4K ceiling; the ultra tier 512 MB / cap 3; the loop's 2 s / 10 s / 60 % rule,
#         applied at the settle, at most once in 10 s, with a 60-s doubling hold; the DPR change; the reasons the chip
#         reads), *Fitting the need — one order*, the **split composition** (labels, text and every overlay at the device
#         ratio in a text layer whenever d < D) and the worked cases (receipt coh_repair_rendering_r2_resolution.out);
#         §8.4 (g) Auto's give-up order; §8.9 `tier: 'ultra'`, the text tiles; §12.1 the ultra bar (GPU probe); §12.5 the
#         frame budgets; §12.8 canvases per tier; R12-36; T-ER-26; M4.
#  G122-rendering (R2-37): §8.2 *Crisis looks* (`live.crises`, a base live layer joining the tile key; the `crises`
#         key's follow / off / preview; DR44's standing looks and admission; the parts by band for every look kind; the
#         glyphs; the second cues; slots 15b and 19b; the extension marker; the legend's entries); §8.1 render tag
#         `crisis.place`; §11.1 exports (pictures; battle maps in the image only); §12.5 and R12-37 lazy per tile;
#         T-ER-27; M3b. G122h-rendering (R2-37 (8), R2-30): §8.8 *The surrounding ring* (massed camp marks at the city
#         band, counted among the camps the crisis framing takes in); the limit, opening view and Fit over town and camps
#         (§8.8, §9.5); §8.7 exports frame within the limit bounds; the VTT scope likewise.
#  G123-rendering (R2-38 (4)): §8.6 *The damaged plan* (the one comparison; the damaged forms by element kind; the
#         states' looks as they follow from the thresholds; unsafe rooms; patch material; a disaster look's `lookLevel`;
#         the no-op pin; the drawn week in the tile key, §8.8); §8.1 render tag `plan.rubble`; §11.1 battle maps' line of
#         sight and portals follow the damage; T-ER-28.
#  G124-rendering (R2-39 (a)): §8.2 *Weather effects* (the marks per family and kind, ripples, densities, the hard rules)
#         and *Snow and the sun*'s exception (an `arid` or non-freezing row draws `snow` as `clear`); §8.4 (i) the light
#         terms (shower, fog with its depth fade and night halos, dust, cloud shadows, shimmer; the vector rung's wash;
#         photosensitivity); §8.8 *The weather effects layer* (above tiles, below labels and overlays by the split
#         composition or the coverage weighting; never in a key; the water mask); §8.9 the compositors; §11.1 no export
#         draws them; §12.5 and R12-38 ≈ 1 ms; T-ER-29; M3b.
#  G125-rendering (R2-40 (2), R2-33 (b)): §11.4 the dossier the port's only data input (`audience`, `displayNames`,
#         `line` kept, none a data input; week, realm and custom library never host inputs; T125-3); §11.3 the host's
#         view commands (a week, the layers shown, a selection by `view.set { select }`) as commands; §11.1's geo-anchor
#         default re-sourced to the dossier's bearings; §11.6 T-ER-21's item-125 edges.
#  Receiving ends (Part H): R2-42's `stopAfter` (V09's issue); R2-33 (b)'s travelling view commands; R2-36's milestones
#         (Find M5, item 121 M4, items 122 and 124 M3b, item 123 with V03's plan step), each cited as §16's.
#
# INTERPRETATIONS AND JUDGMENT CALLS (vetoable; J122 where new design; each an addition, no other decision changed)
#  1. Item 121 (e) ("labels, text, the chrome and every overlay always at the device's full pixel ratio") needs labels
#     outside a tile softened below the device ratio, so the composition splits whenever d < D: a text layer at D, the
#     one composed bitmap per position (J-R21) standing where d = D. Consequence, stated in §8.8's worked cases: the mid
#     tier's lit reference viewport (D = 2) is lit at DPR 1 with its text layer (103.75 MB) where it was lit at 1.5
#     (123.25 MB, which with the text layer would pass 128 MB); §12.8's export case follows (it now holds both sets).
#  2. Item 121 (e)'s order governs §8.8's canvas fitting too (one order): full precision is given up before sharpness, so
#     a tier that took full precision draws the standard surface at DPR 2 on the high tier (was full precision at 1.5)
#     and the low-end device at full precision is lit on the standard surface (was the vector rung). Under a manual level
#     the level's DPR is held until nothing else is left.
#  3. Auto's loop holds a rung it left downward for 60 s, doubling each time (our own; calibratable; R12-36), so a load
#     at a threshold settles instead of stepping every 10 s (item 121 (h)'s "no oscillation").
#  4. When nothing fits beside the text layer at D (an 8K screen on the high tier), the text layer steps down the ladder,
#     reported — a defined last rung for item 121 (b)'s ceiling and (e)'s rule meeting.
#  5. The ultra tier's bar (§12.1): ≥ 8 GB reported, the Canvas2D part within the reference time, a GPU probe of the
#     light pass at full precision over a native-4K view ≤ 8 ms a frame — our numbers, PLAUSIBLE until M4.
#  6. Weather effects sit under labels and overlays by the split composition, or by weighting with the composed
#     coverage (the surface layer's byte on rungs 1–2; a ¼ MB coverage plane on rung 3) — no extra memory on rungs 1–2,
#     so the default-on rule (V09: mid, high and ultra tiers) needs no headroom beyond today's.
#  7. The ring lies outside the frame's margin, as deep as the margin, each force's remainder an arc at four times a
#     camp's density; its arcs count among the camps the crisis framing takes in, so the widened limit shows them, and
#     exports frame within the widened limit (item 116 (c) ties exports to the limit; item 122 (i) widens it).
#  8. The host's selection command is `view.set { select }` (a command, never a stored key), as R2-33 (c) words V08's end
#     ("a host sets the frame's view only by §11.3's view.set over the keys that travel").
#  9. New roles placed by rule (receipt coh_repair_rendering_r2_roles.out): `find.1` … `find.8`, `crisis.tent`,
#     `crisis.ash`, `crisis.mark`, `crisis.army.a` … `.d`, `fog`.
#  10. Find's "none here" is overlay text, never a `LabelEntity` (an `annotation` is the user's model marker, §9.1).
#  11. The damaged forms by element kind are §8.6's; V03 §5.1 draws them in its plan program (one statement).
#
# HAND-OFFS (R2-05 (3): ends no ruling names, for round 3's verifiers; none is open wording in the design text)
#  * scope §13.2 / §13.8: register T-ER-22 – T-ER-29 (§13.2's edge line still reads T-ER-01 – T-ER-12 for §8.11) and
#    schedule T-ER-25 – T-ER-29 with their items' milestones; §16's rows name the milestones §8 and §12 cite.
#  * scope's judgment index rows for items 120–124 may cite judgments 1–7 above.
#  * V09: §4.21.10 (Find), cited by §9.5, is V09's this round; V09's chip names a DPR by §8.8's level rule; V09 reads the
#    legend's crisis entries (§9.5) for Show crises and Find's list of looks.
#  * V11: the climate weather columns use the kinds `rain`, `drizzle`, `snow`, `mist`, `fog`, `dust`, `cloudShadow`,
#    `shimmer`, `leaves`, with fades no shorter than §8.4 (i)'s (5 s a shower, 60 s fog, mist, dust and cloud cover) as a
#    compile check; registry rows for the new roles' table cells if V11 keeps palette rows.
#  * determinism §6.1: the `view.weather` draws for marks are keyed by the spell index and the world-aligned cell (§8.2).
#  * V10: `FindAnswer.layers[].layer` may cite §11.2's `FindLayer` (R2-13's class).
#  * V03 §5.1: cite §8.6's damaged forms; V02: the exterior's roof opening and outline gap as §8.6's table names them.
#  * V12: measurements for R12-35 – R12-38 and T-ER-25 – T-ER-29.
#  * §11.1 names `ExportOpts.find`; `ExportOpts` (cited by §11.1, §11.2 and V08) is declared nowhere in the set — a
#    pre-existing gap outside this round's issues.
#
# PROPOSED ALLOW ROWS (for Assemble's doc-checks allow file; S2 reads the base's headings only)
#  S2 | §4.19 | a volume-prefixed pointer — every occurrence in the base reads V09 §4.19 ×1 (§11.3's per-viewer keys); it
#               resolves in V09
#  S2 | §6.8  | a volume-prefixed pointer — V06 §6.8 in §12.1 ×2 (and §4.11 *The clock* (4) ×1, the pipeline seat's); it
#               resolves in V06
#
# SIZE (principle (9)): §8, §9, §11, §12 80 190 → 91 201 words (+11 011, +13.7 %): §8.2 +3 288, §8.8 +1 956, §8.11 +1 497,
#  §8.6 +738, §11.2 +727, §8.4 +714, §12.10 +366, §12.5 +313, §11.1 +294, §9.5 +247, §11.4 +185, §12.1 +162, §11.3 +160,
#  §12.8 +119, §8.9 +107, §11.6 +86, §12.7 +32, §8.7 +16, §8.1 +4. Removed: restatement (the BarrierKind union ×3 and
#  its 'sheer' gloss, the LadderStep union, the margin's value) and a duplicated mechanism (`live.coverage`, now Find's
#  Show gaps, one mechanism). What holds the growth is new design the owner's items require at build depth (items 120–125:
#  ≈ 9 500 words) and their defined edges (T-ER-25 – T-ER-29, ≈ 1 300); no content was thinned.
#
# CHECKS (scratch: scratchpad/coherence/rr2/)
#  * apply.py: 80 hunks, each OLD text found exactly once; gen_blocks.py: 19 REPLACE blocks.
#  * apply-blocks.py on copies of the live files: 19 found, 19 applied, 0 skipped; audit not OK 0; headings 153 → 153;
#    fences balanced (140 → 140); title block unchanged; rationale untouched (630da959…); the diff lies inside §8, §9,
#    §11 and §12 only. With the landed siblings (repair-r2-model.md, repair-r2-pipeline.md): 44 applied, audit 0.
#  * doc_checks.py --sections 8,9,11,12 before / after (hits / unreviewed): C1 5/0 → 5/0, C2 1/0 → 1/0, C3 189/0 → 188/0,
#    C4 3/0 → 3/0, S1 0/0 → 0/0, S2 183/0 → 194/3 (the two volume-prefixed pointers above). WARNING printed both times:
#    reference corpus incomplete (captures, research/patreon, research/devlogs, research/ftg-docs, research/external
#    absent) — clean-room results NOT authoritative; provisional. Forty C3 runs of ordinary English in the new text were
#    reworded away rather than allowed.
#  * Every new volume reference resolves in the live volumes except V09 §4.21.10, which the V09 seat writes this round;
#    no adjudication or issue id in the design text; no deferral wording; no phone clause (item 126 (a2)).

=== REPLACE ### 8.1 The display list (renderer-independent, columnar, incremental) ===
### 8.1 The display list (renderer-independent, columnar, incremental)

```ts
// LodBand, Role (§8.2), ZoomStop (§8.8), and LabelTable, StringTable and GeomTable with §9.2's LabelRows, are declared in
// @plat/model (§14), so @plat/labels and @plat/render share them without either importing the other's code (N-22)
type LodBand = 'city'|'district'|'neighbourhood'|'building';
type MarkKind = 'area'|'ribbon'|'outline'|'hatch'|'glyph'|'text'|'instances'|'shadow'|'field'|'shore'|'light';
// one row per mark; every column a typed array, so any slice is transferable (§8.9); bytes per mark on the right
interface MarkTable {
  count: number;
  kind: Uint8Array;                    // MarkKind index                                                          1
  semantic: Uint16Array;               // index into DisplayList.semantics ('water.sea', 'ground.block', 'way.primary', …)   2
  entity: Uint32Array;                 // interned handle (§2.1): session-local; routes deltas, hit-tests, edits; never hashed   4
  key: Uint32Array;                    // 2 per mark: the render key (item 5)                                     8
  layer: Uint8Array; z: Int32Array;    // model layer (§2.1) and order inside it                                  1 + 4
  lodMask: Uint8Array;                 // one bit per LodBand in which the mark exists; geometry never changes with the band   1
  pass: Uint8Array;                    // 0 fills · 1 casings · 2 bodies · 3 linework and symbols · 4 overlay: the order within a slot (item 3)   1
  group: Uint32Array;                  // district handle: unit of delivery and invalidation, never of raster caching   4
  bbox: Int32Array;                    // 4 per mark, world cm                                                    16
  geomStart: Uint32Array; geomLen: Uint32Array;   // into GeomTable (face rings, chain, point set, text spine) or FieldRaster ids   8
  revision: Uint32Array;               // low 32 bits of the entity's §6.2 leaf digest (its inputs' content revision): the cache key (LC-23)   4
  attrs: Record<string, Float32Array | Uint32Array>;   // named columns, 4 B per mark each: heightCm, baseCm, eaveCm, ridgeCm, prosperity, class, block, bankKind, waterKind, exposure, knownTo, concealed, worksStage, worksKind, material, tintKey, season (item 8), …
}                                                        // fixed columns: 54 B per mark
interface GeomTable { rings: Uint32Array /* ring start offsets into coords */; coords: Int32Array /* x, y cm pairs */ }
interface FieldRaster { id: number; originX: Cm; originY: Cm; cellCm: Cm; cols: number; rows: number;
  values: Float32Array | Int16Array; meaning: 'heightCm'|'shoreDistanceCm'|'depthCm'|'daylightShare' /* the `live.shade` provider's, from `fieldDriver('daylight')`, read by its stepped `ramp` veils (§8.2) */ }
interface StringTable { utf8: Uint8Array; offsets: Uint32Array }                 // names and species kinds as one transferable UTF-8 blob
interface LabelTable {                // one row per LabelEntity drawn at the band (§9.1) — all S13b reads (§9.2); ≤ 97 B per row plus geometry and text
  count: number; mark: Uint32Array /* its text mark */; key: Uint32Array /* 2 per row: render key (item 5) */; kind: Uint8Array; lodMask: Uint8Array;
  priority: Float32Array; areaM2: Float32Array /* the target's area: the order's second key (§9.2) */; text: Uint32Array; shortText: Uint32Array /* StringTable rows; ~0 = none */;
  spines: Uint32Array /* 2 per row: GeomTable ring range, in preference order */; anchors: Uint32Array /* 2 per row: point-anchor range */; breakAt: Uint32Array /* 2 per row: glyph-index range */;
  parent: Uint32Array /* row of the parent QuarterNode's label (§9.4 rung 5); ~0 at the root */;
  pinStop: Int8Array /* −1 = not pinned */; pinSizePx: Float32Array; pinAnchor: Int32Array /* 2 per row, world cm */; pinSpine: Uint32Array /* 2 per row: GeomTable range */;
  pinDirCdeg: Int32Array /* PinnedPlacement.dirCdeg: a pinned point label's direction */; pinLines: Uint8Array /* PinnedPlacement.lines: 1 | 2 */;   // both written by S14 from LabelEntity.pinned (§9.1), read by §9.2's pin pass; the row stays ≤ 97 B
  pinSeq: Uint32Array /* the pin's moveLabel seq (PinnedPlacement.seq, §9.1): the order of §9.2's pin pass */;
  knownTo: Uint8Array /* 0 public · 1 local · 2 secret: the target's knownTo as §9.2's knowledge filter fills and reads it — read by that filter and by nothing else */;
  hidden: Uint8Array; revision: Uint32Array }
interface InstanceTable {             // one row per `instances` mark (§8.10), ≤ 40 B per row
  count: number; mark: Uint32Array; layout: Uint8Array /* stamp | grid | line */; offset: Int32Array /* 2 per row, cm */; rotationCdeg: Int32Array; spacingCm: Int32Array;
  species: Uint32Array /* 2 per row: range into speciesRows */; overrides: Uint32Array /* 2 per row: range into overrideRows */;
  speciesRows: { kind: Uint32Array /* StringTable row */; inner: Float32Array; outer: Float32Array; leafType: Uint8Array };                         // ≤ 16 B per row
  overrideRows: { ordinal: Uint32Array /* 2 per row */; op: Uint8Array; x: Int32Array; y: Int32Array; style: Uint32Array /* 2 per row: InstanceStyle fields */;
                  state: Uint8Array /* byOrdinal | rematched | orphaned (§8.10) */ } }                                                              // ≤ 32 B per row
interface LightTable {                // one row per `light` mark (§8.4; item 68): a placed LightSource (§2.7) or a derived light (a lit window, a room light, a shaft); ≤ 36 B per row
  count: number; mark: Uint32Array; x: Int32Array; y: Int32Array /* the source, world cm */; zCm: Int32Array /* its height above the datum: host ground + LightSource.heightCm */;
  intensityCd: Float32Array; radiusCm: Int32Array /* §8.4's cutoff */; sizeCm: Uint16Array /* the flame's or orb's radius: its penumbra */; colour: Uint32Array /* 0xRRGGBB */;
  flags: Uint8Array /* bit 0 fire (else magic) · bit 1 flicker · bit 2 lit at the drawn week and state · bit 3 downward (a shaft) · bit 4 underground */ }
interface DisplayList { marks: MarkTable; geom: GeomTable; rasters: FieldRaster[]; semantics: string[]; strings: StringTable; labels: LabelTable; instances: InstanceTable; lights: LightTable;
  salts: Record<RerollableConcern, number> /* §6.1's effective salt of every rerollable concern; type generated from the concern registry */; layers: LayerSpec[]; bounds: Box; version: number;
  surfaceTopCm: Cm /* the greatest elevation above the document's datum (`Terrain.datumCm`, §2.3) that a caster of the city band's list writes into the surface layer, a pyramid or the slab list (a slab's top: an island's, a span mark's, a deck's; §8.4 (a), §8.8) — the cursor sun's floor (§8.4 (d)); S14 derives it on the city band's list, which carries every caster (item 2), a delta raising it and a full build re-deriving it, and every other list — a finer band's, an export's transient one — carries that value, never one of its own (item 6; J-A68.93) */;
  surfaceLayerTopCm: Cm /* the same over the surface layers and pyramids only, without the slab list — §8.4 (c)'s Z, the reach of the global light's window; derived, carried and raised exactly as `surfaceTopCm` (M6-sky; file f item 416) */ }
interface DisplayDelta { version: number; groups: number[]; removed: Uint32Array /* entity handles */; marks: MarkTable; geom: GeomTable; rasters?: FieldRaster[] /* new or changed field rasters, as §8.9's delta row carries */;
  strings: StringTable; labels: LabelTable; instances: InstanceTable; lights: LightTable; dirty: Box[]; surfaceTopCm?: Cm; surfaceLayerTopCm?: Cm /* each present when the delta raises it */ }
interface DisplayListBuilder {                                   // S14; runs in the generation worker on the read-only model
  build(model: ModelView, band: LodBand, groups?: number[]): DisplayList;             // full build (generation, load), or one band for the named districts (on-demand bands, §8.9)
  update(model: ModelView, changed: Set<EntityHandle>, band: LodBand): DisplayDelta;   // edits, scoped regeneration, override resolution (§8.10)
}
```

1. **Built by S14** from the model through the entity registry (each type → marks per band); backends never read the
   model. Footprint geometry is identical in every band (O12 a; O17 i); only the marks emitted and the programs run differ.
2. **Kinds.** `field` marks carry a world-space raster (terrain height for hillshade and contours, distance to shore
   for water ramps and foam, depth) and cost nothing when no program reads them (VIS-12). `shore` marks are chains, one
   per maximal run of equal attributes along a water face's boundary: `bankKind` (§2.3), `waterKind`, `exposure` and
   `shoreClass` (bay / headland / straight, §2.3; read by the shore programs' per-class rows). `exposure` = `sheltered`
   where the segment bounds a harbour basin, moat, canal or pond or its fetch (longest straight run across water within
   ± 30° of the outward normal) is below 300 m, `river` on river and tributary faces, else `open` (VIS-13). `instances`
   marks carry a face or chain and one `InstanceTable` row — the offset, rotation and spacing S14 draws from the
   entity's `render.instances` stream, the species mix, the resolved overrides; their points are generated at raster
   time (§8.10), never stored. `text` marks carry one `LabelTable` row each, so S13b needs only the display list (N-4) — except a room label,
   which the plan draw sets inside its own room (building band only) and which S13b reads only as a protected obstacle,
   through `ObstacleSource.protectedExtents` kind `room`, implemented by `@plat/render` from these marks (§14; §8.5, §9.2;
   J-A28.85). `light` marks carry one `LightTable` row each (§8.4): a placed `LightSource` record's (§2.7)
   position, height, intensity, radius, colour and flicker, or a derived light's (a live layer's window, the plan draw's
   room light, a shaft); the light pass reads them and nothing else draws them but the vector rung's `glow` sprite
   (§8.2). A building's `eaveCm` and `ridgeCm` columns (its wing's, for a wing mark; §2.6) let the surface layer (§8.4)
   rebuild each roof face's elevation from the roof's own construction without the model. **The city band carries every
   caster (item 68; J-A68.93)** of §8.4's *Shadow casters*: a tree line's `instances` mark, its city-band rank subset
   empty so that band draws none of its crowns (§8.5's line greenery, §8.10); a caster mark per base wing of a building of
   several, carrying its own `Heights` and drawn by no program there (a building of one wing casts by its footprint mark);
   and the caster marks of every composition's wings and towers and every close-up's casters the elaboration cache holds
   (§2.9, §8.6) — added in the `DisplayDelta` that answers the band request deriving them, removed with the cache entry,
   included in every full build, a composed building's replacing its base wings'. So the city band carries every caster
   any band draws, at the heights that band draws, and the ring blocks (§8.8) and `surfaceTopCm` read them from the one
   list the tile worker always holds.
3. **Slot, pass, draw order (N-7).** The order is **slot-major across the whole scene**: every mark of slot s of the
   style's layer-order table (§8.2) draws before any mark of slot s + 1, in every tile; within a slot by `pass`, then
   `z`, then `key`. A mark's slot comes from its (semantic, pass) by §8.2's slot resolution, cached per style version as
   a (semantic index, pass) → slot table. S14 emits one mark per pass an entity draws in, as the registry declares per
   band: a cased ribbon is a pass-1 casing mark plus a pass-2 body mark over one geometry range (≈ 60 B for the second
   mark, never a second geometry copy; one extra mark per drawn way, a few thousand at CITY). The raised under-copy
   (slot 11) and projected shadows (`shadowPass`, slot 10) are not marks but per-tile operations over the caster marks,
   placed by `derived` entries (§8.2). Way casings (slot 5) and way bodies (slot 6) are separate slots holding every way
   class, so every casing precedes every body across the scene and no district's drawing puts a casing over another's
   body (GEO-28); masses, fields, woods and shadows keep their slots after the roads (K16, NG's shadow order, MFCG's
   wards after roads). `group` only delivers and invalidates; rasters are cached per world-aligned tile (§8.8).
4. **Incremental.** After an edit or scoped regeneration the builder gets the changed handles (§7.3's locality closure)
   and emits a `DisplayDelta`: removed marks; new marks for the changed entities and those whose marks depend on them (a
   way's marks when a junction on it moved; a district's ground mark when one of its blocks changed); their label and
   instance rows; and dirty world boxes = the old and new marks' bboxes dilated by the largest cross-tile effect (§8.8).
   Cost O(changed marks). During a replay the builder is suppressed and runs once at the end (§7.3 item 2; SCL-9).
5. **Cache keys and render-time keys (LC-23).** Every derived artefact — roof geometry, label spine, footprint
   mass, instance set, tile raster, glyph run — is keyed by (the entity's `key` or the tile address, content revision,
   band, style version, roof construction where it applies), never by id alone: a `setAttr` on floors changes the
   building's revision and so its roof; a changed boundary street dirties both its sides. **Every render-time hash** is
   `RH32(tag, key, salt[, ordinal or cell][, style id])`: a tag, an index into the
   fixed **render-tag table** — `role.<name>` (one per multi-colour role: its pick, §8.2), `weathering` (§8.2),
   `hatch.phase` (the `hatch` program), `ruin.dash` (the entity-keyed dash of the `ruin`, `trace` and dashed state rows),
   `stamp.variant`, `grid.jitter.x`, `grid.jitter.y`, `line.jitter.along`, `line.jitter.across`, `crown.species`,
   `crown.index`, `crown.tone`, `crown.scale` and `roof.detail` (§8.10), `wall.rubble` (g item 114), `crown.leaf`,
   `crown.early`, `leaf.cover`, `creeper` and `ice.crack` (g item 117), `festival.place` (g item 118; §8.2),
   `crisis.place` (g item 122: §10.2's keyed placement of the crisis looks and the ruined tone, §8.2) and `plan.rubble`
   (g item 123: the damaged plan's rubble and debris, §8.6), each read by
   the program it names (a new tag is appended, so no existing look moves); the **render key** `key` = the low 64 bits
   (words 0 and 1) of the entity key (§6.1), cached
   in the arena beside the lineage hash; the concern's salt (§6.1); and the style id only for looks (colours, crowns,
   hatch), never positions. `RH32`, the render hash (distinct from §13.6's string hash `H32`), folds the words through
   MurmurHash3's 32-bit finaliser and never reads the interned handle, which changes with interning order. The entity key
   is a pure function of model data, so an unchanged model renders pixel-identically after a reload (§6.2) and golden
   PNGs hold (§13.3); a render rule that orders entities (the tint colouring, §8.2) uses address order (§6.3). A look
   thus follows its entity's lineage and the seed (§6.3).
6. **Size (N-9 c).** 54 B per mark in the fixed columns, plus 4 B per mark per attribute column carried, plus the label
   and instance tables and geometry: a CITY city band of ≈ 60 000 marks is ≈ 3.2 MB of fixed columns, ≈ 2.6 MB of
   attributes (item 8's `season` column among them), ≈ 4 MB of coordinates and ≤ 0.5 MB of label, instance and string rows — ≈ 10 MB; the undrawn caster marks of item 2 add 54 B each and their coordinates, and the slab list (§8.8) 16 B per record and 8 B per outline vertex, both counted on B-CITY at M2b; its light rows add ≤ 36 B
   per light (≈ 0.3 MB for 8 000 lights, PLAUSIBLE until §4.7's light table runs on B-CITY). The tile worker holds the
   only full copy; after each transfer the generation worker keeps only the **24-B index** — the columns `update()`, `hit`
   and `inView` read (`entity`, `bbox`, `group`: 24 B per mark, ≈ 1.4 MB at CITY) — and the city band's two surface tops,
   which every export's list carries (the `DisplayList` comment). An export that draws (SVG, PNG, print, the `.dd2vtt`
   image) builds its own **transient list** in the generation worker: SVG writes from it there; a raster export transfers
   it to the tile worker with its request; each releases it when done — the one statement of its lifecycle, which §8.9,
   §11.1 and §12.8 cite.
7. **The drawn week, and concealed marks (items 67, 63).** The display list is built at the **drawn week** (§4.11's
   *Which week is drawn*; the view key `week`, §2.9): S14 writes
   a Works target's `worksStage` column from `stageAt(works, w)`, its `worksKind` column from the running Works' kind (§4.11's
   `WorksRow.kind`, read by the `states` rows of §8.2 that name one) and its height columns from `heightsAt` (§4.11), and emits
   the stage's marks (a dashed footprint, a pit, walls without a roof, a scaffold ring, rubble; §8.2's `states` rows) and
   the Works' pending and staked plot lines. When the drawn week changes — the clock advancing, a host's `view.set
   { week }`, a scrub — the generation worker re-emits, as a `DisplayDelta`, only the marks of the targets whose stage or
   heights differ between the two weeks and of the lights whose lit bit changes (O(changed Works)); no digest moves (§6.2).
   A concealed part's mark — a concealed room, the concealed entrance's tick, a concealed access point or link down
   (item 63; §2.6, II.7.4) — carries `concealed` = 1 and the concealed use's `knownTo`, drawn only for a viewer whose
   knowledge key admits that use at the band (§9.2; the key then joins the tile key, §8.8); the building's mass and every
   public part carry the building's own `knownTo` and always draw. **A light draws only where its host
   draws (items 63 (c), 64, 68; J-A63.82).** A `light` mark carries its host mark's `concealed` and `knownTo` columns, so
   the light of a concealed room, a lit window of one, a `LightSource` hosted by a concealed part, an `AccessPoint` or an
   `UndergroundLink` (II.7.4, II.7.6) and such an access's shaft (§8.4 (b)) reach the light pass, the light-map bake, the
   vector rung's `glow` and every export's lights (§11.1) only where their host draws at the band under the viewer's
   knowledge key (§9.2; §8.2's `access` and `link` rows), that key then joining the tile key and the
   light-map key (§8.8); a key that does not admit the host sees none of their light, glow or shaft, while a light
   whose host always draws always lights.
8. **The year position (g item 117).** The display list holds no season: S14 writes, once and for every week, each
   mark's `season` column — in its low 16 bits the index of its V11 `season.surfaces` row (land-use, green, garden,
   orchard, vineyard, wood and crown marks), in its high 16 its ice kind (water marks, by §8.2's mapping), ~0 where it has
   none — and emits the `water.lead` marks where §8.2's *Water in winter* lays its open leads, read only while their water
   is drawn frozen; the tile worker applies the week's looks (§8.2's season rows), so a change of the year position re-skins
   tiles and emits nothing, and no digest moves.

Judgment calls: J-R1, J-R2, J-R19, J-R20, J-A67.81, J-A67.83, J-A63.81, J-A63.82, J-A68.90, J-A68.93.
=== END ===

=== REPLACE ### 8.2 Style sheets as data: roles, contrast, symbolisation, paint programs, layer order, presets (G-R2) ===
### 8.2 Style sheets as data: roles, contrast, symbolisation, paint programs, layer order, presets (G-R2)

A style sheet maps (semantic, attribute predicates, band) to **paint programs** over a palette of **roles** and a
**symbolisation table**:

```ts
interface StyleSheet {
  id: string; version: string; family: 'ink'|'lit'|'hatched'|'painterly';
  palette: Record<Role, Color | Color[]>;                               // multi-colour roles: the pick rule below
  variants?: Partial<Record<CvdVariant, Partial<Record<Role, Color | Color[]>>>>;   // the checked colour-deficiency variants (item 112, below)
  symbols: Record<string /* semantic */, Partial<Record<LodBand, Symbolisation>>>;
  order: Record<LodBand, OrderSlot[]>;                                   // draw order per band, with reasons
  programs: Record<string /* semantic */, Partial<Record<LodBand, PaintProgram[]>>>;
  roofConstruction: 'plain'|'skeletonHip'|'skeletonGable'|'fakeGablePerWing'|'roofscape';   // over stored wings (§2.6); 'roofscape' (V02 §5.2): every shipped family's default once stage 3 registers (M6; file f item 406)
  roads?: { mode: 'full'|'outlined'|'dashed'|'hidden'; widthRatio: number /* hatched 0.4 */ };   // the close-up's road surfaces (V01 §5.1; M5, file f item 405)
  hatch?: { pitchM: number /* a world length, calibrated at M5 */; minPx: number /* 1.5: below it every second line */; details: boolean };   // the per-facet hatch (V01 §5.1; M5)
  closeup?: { vignette: 'none'|'fade'|'plateau' };                       // the close-up's framing (V01 §5.1; M5)
  plate?: { waterQualifier: boolean; populationRound: number /* 1; 10 under the `VG` preset */ };   // the title plate (§9.5; V07 §5.3; the village product, file f item 424)
  labels: LabelStyle;                                                    // faces, floors, halo rule (§9.4)
  light: LightingSpec;                                                   // the lighting model, its sun and moon and the vector rung's look (§8.4; item 68)
  raised: { on: boolean; offsetM: [number, number]; minPx: number; maxPx: number;
            ratio: { semantic?: string; classes?: string[]; ratio: number }[] };   // K06: the base offset × the first matching class row's ratio (below; item 54)
  overrides: ThematicRow[];                                              // thematic layers, materials, season, weather, tints
  states: StateRow[];                                                    // decline, condition, Works-stage and layer-state classes (the table below); a family defines every row
  post: PostOp[];                                                        // per-tile post operations
  referenceBackend: 'canvas2d';                                          // every shipped preset (§8.9)
}
type CvdVariant = 'protan'|'deutan'|'tritan';
interface LabelStyle { face: string /* the label face (§17.2) */; smallCapsCut?: string /* the family's bundled OFL small-caps cut, where one exists (§9.2's per-face path) */;
  floorsPx?: Partial<Record<LabelEntity['kind'], number>> /* raises §9.4's floors per kind; never below them */; haloPx: number /* 1.5, §9.4 */;
  leaders: 'small'|'always' /* §9.3: 'small' the 12-px rule */ }       // read by S13b (§9.2) and the tile worker's composition (§8.8)
interface ThematicRow { id: string; key: 'prosperity'|'use'|'epoch'|'owner'|'material'|'identity'|'power'|'sector'|'bandRange'|'season'|'weather'|'condition'|'favourite';
  match: string | [number, number];      // the attribute value, or a numeric range
  bands?: LodBand[]; paint: Partial<{ role: Role; colour: Color; pattern: string; alpha: number }>;   // the tone or texture laid over the mark's programs
  cue?: { kind: 'pattern'|'lineStyle'|'label'|'shape'; value: string };   // item 112's second cue (below)
  legend?: string }                      // the legend key's words (§9.5); absent: the row draws no key
type PostOp = { op: 'greyscale'|'sepia' } | { op: 'wash'; colour: Color; strength: number } | { op: 'edgeFade'; strength: number }
  | { op: 'pixelate'; cellPx: number } | { op: 'dotScreen'; cellPx: number; angleCdeg: number } | { op: 'scanline'; periodPx: number; alpha: number }
  | { op: 'crosshatchNoise'; periodPx: number; alpha: number };  // read by the tile worker, the GPU pass and the CPU reference in §8.4 (f)'s order
interface Symbolisation { mode: 'model'|'paper'; k?: number /* drawn = k × model width */; minPx?: number; maxPx?: number; px?: number /* paper width at 1× */ }
interface OrderSlot {
  slot: number;                     // its row of the layer-order table below; several entries may share a row
  semantic: string;                 // a semantic ('way.pier') or a dotted prefix ending in '.*' ('way.*')
  passes?: number[];                // the MarkTable passes (§8.1) of that semantic this entry places; absent = every pass
  derived?: 'raised'|'shadow';      // instead of the matched marks' draws: the per-tile raised under-copy or projected shadows over them (§8.4)
  seamClose?: boolean;              // its fills also get a ½-px same-colour stroke underneath (§8.8's seam rule); set in the shipped sheets on ground.block, masses, yard parts and the `shadow` entry; read by the tile backend's draw sequence (§8.9)
  reason: string; recordedAs?: string /* the reference step it matches, for order parity (§8.3) */ }
interface StateRow {                 // one row per (kind, state) that §2.8's ladders and the state fields of §2.5 to §2.7 can produce, the undeclined defaults excepted (§8.3's census); the shipped rows are the table below
  kind: 'building'|'wall'|'gate'|'tunnel'|'island'|'passage'|'plotLine'|'access'|'gallery'|'chamber'|'link'|'retaining'|'raised'|'deck'|'skyAccess'|'landUse';
  state: string /* an Existence value (§2.8), Building.condition (§2.6), SkyIsland.state (§2.7), 'superseded' for an enceinte whose supersededBy is set (§2.7), 'sealed' for a passage whose Passage.sealed is set (§2.5);
    a `WorksStage` (§4.11) for a target under a Works at the drawn week — the mark's `worksStage` column, §8.1 — which wins over the ladder state while the Works runs (item 67); 'pendingRemoval' or 'staked' for a plot line in transition (item 67 (g));
    an `AccessPoint.state` (II.7.4; item 64); a gallery's or chamber's system kind with its state (II.7.6; item 65); an `UndergroundLink.kind` (II.7.6; item 65);
    a run's `Enceinte.condition` (§2.7; g item 114), the row then drawing that run of the trace alone */;
  worksKind?: WorksRow['kind'] /* the row matches only a target whose running Works is of this kind (§8.1's `worksKind` column) and is an `override` laid over the row the stage resolves without it (J-A67.83) */;
  bands?: LodBand[] /* absent: every band the kind is drawn at */; paint: 'replace'|'override'; programs: PaintProgram[];
  legend?: string /* the row's legend entry, a catalogue key (V09 §4.9) §9.5's legend draws while a mark in that state is on the map: the wall runs' `legend.wall.<state>` (g item 114); absent: no entry */ }   // replace: drawn instead of the entity's programs; override: the row's tone, alpha, glyph and roof-construction changes laid over them
```

**Roles.** `paper` (margin, background), `road` (way bodies, squares, bridges; = `paper` in the ink family, so streets
are negative space), `ground` (built-block ground, yards at the city band, settled ground), `court` (enclosed in-block
courts), `garden` (private planted yard parts), `green` (parks, greens, commons, churchyards), `tree`, `field`, `verge`,
`water`, `building`, `roof`, `wall`, `ink` (every outline and text), `label`, `shadow`, `ambience`, `light`, `sand`,
`plank`, `grid`, `snow`, `glow`; the wall-material roles `wall.dry_stone`, `wall.earth_bank` and `wall.timber_crib` (item
110 (a); file f item 412); `furniture` (the plan draw's furniture, V03 §5.1; M6-P); `rock` and `void` (the underground's
halo and floors, V04 §5; M6-U); `sky.ground` (a sky island's land, never `ground` itself, V05 §5.1; M6-sky); the
wall-condition role `wall.worn` and the six **patch looks** `patch.timber`, `patch.wattle`, `patch.earth`,
`patch.drystone`, `patch.stakes` and `patch.brush` (g item 114; each row of V11's `walls.patchMaterials` names its look);
the season roles `ice` and the eight **leaf colours** `leaf.gold`, `leaf.amber`, `leaf.orange`, `leaf.scarlet`,
`leaf.crimson`, `leaf.russet`, `leaf.bronze` and `leaf.brown` (g item 117; V11's `season.leaf` weights name them); the
festival roles `festival.a`, `festival.b`, `festival.c`, `festival.d` and `festival.sacred` (g item 118; V11's
`festival.motifs` rows name them, never a colour); the eight **chip colours** `find.1` … `find.8` (g item 120 (d): a Find
chip's colour by its index); the crisis roles `crisis.tent`, `crisis.ash` (burned and ruined ground, the ruined tone),
`crisis.mark` (a marked door's cross, a cordon) and `crisis.army.a` … `crisis.army.d` (a coalition's armies; g item
122); and `fog` (fog's colour, §8.4 (i); g item 124). A role never
changes meaning across the bands or the presets of one family; the reference schemas (MFCG 13 keys, NG 26, VG 40) map
onto it without loss. **The light roles (item 68):** `shadow` is the vector rung's shadow tone (the ink at the family's
alpha); `ambience` the vector rung's night wash and the two-tone roof's dark mix; `light` a lit window's or a light mark's
glyph tone; `glow` the vector rung's glow sprite. On rungs 1–2 of §8.4's ladder the light pass computes light over
the albedo instead of those tones. **Night variants:** the vector rung reads a role's `@night` value when the view is
night (rungs 1–2 light the day albedo, so a family's night is its day palette under the night's light); a sheet may state
it, else it is derived — the day value in linear light × 0.4, mixed 20 % toward `ambience` — `ink`, `label`, `light` and
`glow` keeping their day values (labels are composed after the light, §8.4 (f)). `tree@autumn` serves only the season
rows' off form (below).

**Contrast matrix (O12 f).** Pairs that must separate wherever both roles are drawn (the city band unless the row says
otherwise):

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
| snow / road (snow lies on ground, fields and roofs while `road` keeps its value) | 8 | 5 |
| ice / water (frozen water reads apart from open water and its leads) | 10 | 8 |
| ice / road; ice / ground | 6 | — |
| patch.* / wall (a patch reads apart from the wall it mends, beside its narrower strip and its pattern); patch.* / ground | 8; 10 | — |
| leaf.* / water (fallen leaves on still water); ink / leaf.* (crown outlines, as ink / tree) | 10; 25 | —; 30 |
| festival.* / road; festival.* / ground | 15 | — |
| find.* / paper, road and ground (a chip's halo and pin on the veiled map); crisis.army.*, crisis.mark / road and ground | 15 | — |
| sand / water; plank / water | 8 | — |
| grid / paper | 10 | — |

Checked on every palette when loaded (built-in, user-edited, random) and on rendered city-band images in B-ZOOM (the
mean CIELAB of the pixels whose top mark, read from the pick buffer, has each role, for every pair in the view). A failing
user edit is shown with the failing pair and kept only with an explicit "accept low contrast" flag, recorded in the
report. MFCG's default palette has garden = building (ΔE2000 0.6) and tree = water (0.0) — reference weaknesses not to
copy (VIS-2).

**Random styles and their bounded repair (N-26).** A random style draws each role's L* within ± 12 of the family's
shipped value, chroma in [0, 34] in `ink` and [0, 60] otherwise (the families' role caps, below), any hue, keeping `road` = `paper` where the family ties
them — a style-time draw from the `style.random` stream (§6.1) written into the `setStyle` event as row operations, so a
replay never re-draws it. A failing draw is repaired in bounded steps: take the first failing pair in the matrix's row
order; raise its lighter role's L* by 1 (up to 97), or, if that is at 97, lower its darker role's L* by 1 (down to 3);
re-check every pair; stop when all pass or after 100 steps; the result must still pass after conversion to sRGB. A draw
whose repair fails is redrawn (attempts 0–2); after three failures the family's shipped palette is used and the report
says so — ≤ 300 steps by construction (J-R30). On 2 000 seeded draws per family around the role values below
(`docs/validation/bench/amendc_rendering_palette.out`): 9–27 % pass as drawn, 96–97 % after the first repair (median 4–12
steps, p95 16–39), 100 % within three attempts; the fallback does not fire. **Confirmation (M3b, where random styles ship):** shipped-palette fallback ≤ 2 % of 10 000 draws
per family; pre-decided fallback: the L* window narrows to ± 8 and the run repeats.

**Role values** (our own; calibratable rows; placed on the palette targets below, item 69). Every matrix
pair, outline rows included, passes on these sRGB values (`docs/validation/bench/amendc_rendering_palette.out`, re-running
the pair check of `fixall_rendering_r2_palette.py` on them; e.g. `ink` road / ground 8.4 / 8.9, ground / building
16.7 / 21.2, tree / water 29.2, court / ground 4.7, ink / building 42.5 / 48.8; `lit` ink / building 41.4 / 46.1;
`hatched` 37.4 / 40.7), and every shipped family's paper and ink sit on the targets — paper luma 235.3 and warmth 36, the
ink's luma 35.8–36.3 and warmth 20:

| role | `ink` (default) | `lit` | `hatched` |
|---|---|---|---|
| paper | `#F7EAD3` | `#F7EAD3` | `#F7EAD3` |
| road | `#F7EAD3` (= paper) | `#DDCFC1` | `#C4A683` |
| ground | `#E8CFA6` | `#D4B78F` | `#F7EAD3` (= paper) |
| court | `#F4DFAC` | `#D8C4A3` | `#B5BC6A` |
| building / roof (lit side) | `#AE947B` | `#BD855B` | `#B9723D` |
| ink / label | `#2D2219` | `#2C2218` | `#2C2218` |
| wall | `#2D2219` (= ink) | `#8B7964` | `#74593D` |
| water | `#9ABDD1` | `#2DA0D3` | `#71B4D3` |
| green | `#B4CC94` | `#8AB85D` | `#A9B951` |
| garden | `#C4CF96` | `#7BAF43` | `#9DB541` |
| tree | `#70946A` | `#447F33` | `#5E9434` |
| field | `#F5DEA0` | `#E3BC5D` | `#F3D580` |
| verge | `#D7DEB1` | `#A5BF7C` | `#B7C278` |
| shadow (the vector rung) | ink at α 0.35 | ink at α 0.45 | ink at α 0.40 |
| ambience | `#5A5048` | `#3E4A63` | `#4A4A5A` |
| light | `#FFF1CF` (a value, `mono`) | `#F5C45A` | `#F2C15A` |
| glow | `light`, α 0.6 at the centre falling to 0 at the sprite's radius | the same | the same |
| sand | `#EADBB0` | `#E6CF96` | `#EDDCA9` |
| plank | `#B39B78` | `#9A7650` | `#A07A4C` |
| grid | ink at α 0.25 | ink at α 0.25 | ink at α 0.25 |
| snow | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` |
| tree@autumn | `#9A8A5E` | `#B8782F` | `#B0843C` |
| wall.dry_stone / wall.earth_bank / wall.timber_crib | `wall` / `ground` lerped 30 % toward ink / `plank` | `#8E8574` / `#9C8460` / `#8A6A45` | `#7E6A50` / `#8C7450` / `#7A5A38` |
| wall.worn (`wall` lerped 40 % toward ink, linear light) | `#2D2219` (= wall: its notches carry the state) | `#716250` | `#5F4932` |
| patch.timber / .wattle / .earth / .drystone / .stakes / .brush | `#B39B78` / `#BAA27E` / `#B8A380` / `#60584D` / `#A79070` / `#ABA77F` | `#A78F75` / `#A88F72` / `#A39175` / `#9C9280` / `#A59077` / `#99956A` | `#A6835A` / `#BBA080` / `#9B8668` / `#998871` / `#A28562` / `#B9BF98` |
| ice | `#DCE6EA` | `#C9E1EC` | `#D3E5EC` |
| leaf.gold / .amber / .orange / .scarlet / .crimson / .russet / .bronze / .brown | `#DEC489` / `#D5A878` / `#CE946F` / `#BB7366` / `#B5696B` / `#B6775D` / `#BD8C61` / `#A3785B` | `#D2AC3F` / `#D18D32` / `#D07432` / `#C24B3B` / `#B5444E` / `#AA5E3E` / `#A97649` / `#8D6448` | `#DDB749` / `#DD973D` / `#DC7E3C` / `#CE5544` / `#C14F57` / `#B56848` / `#B48152` / `#986E51` |
| festival.a / .b / .c / .d / .sacred | `#9E5652` / `#A38852` / `#15719F` / `#3C8463` / `#60578D` | `#B94142` / `#AD8617` / `#0872A1` / `#26865E` / `#605790` | as `lit` |
| find.1 … find.8, in order | `#AE6160` / `#996E41` / `#717D41` / `#398562` / `#02848B` / `#157FAD` / `#7271AB` / `#A2628B` | `#D0474F` / `#AA6805` / `#668101` / `#02885B` / `#02848B` / `#0580AE` / `#646DD4` / `#C0499B` | as `lit` |
| crisis.army.a / .b / .c / .d; crisis.mark | `#9D5156` / `#666C31` / `#027477` / `#5B649D`; `#964E49` | `#BF3249` / `#616F01` / `#027477` / `#3D62C7`; `#B53335` | as `lit` |
| crisis.tent / crisis.ash / fog | `#D9C8AD` / `#B4A080` / `#D1C6B2` | `#CFBCA3` / `#A48D6E` / `#CFC5B6` | `#D1BDA2` / `#BFB5A2` / `#D0C5B4` |
| furniture; rock; void; sky.ground | ink at α 0.5; V04 §5 (the 40 %-ink cross-hatch at 1.2 paper px); `paper`; one step lighter than `ground` | a wood tone of the sheet (`plank`); V04 §5 (a dark stone fill); V04 §5; `ground`'s albedo | ink at α 0.5; V04 §5 (its dense hatch); V04 §5; the patch tone (V05 §5.1) |

The matrix's snow, sand, plank and grid rows pass on these values (snow / road ΔE2000 10.7 / 12.6 / 25.1, ΔL* 6.8 / 16.1
/ 30.1 in `ink` / `lit` / `hatched`; sand / water ≥ 29.0; plank / water ≥ 28.5; `tree@autumn` against water, green and
ink ≥ 21.2 / 21.2 / 38.3; each wall-material role against water ≥ 28.5; computed by our CIEDE2000 on the sRGB values, the
loader re-checking them). The rows of items 114, 117 and 118 are placed by rule (`docs/validation/bench/
coh_repair_rendering_r1_palette.out`): a patch look is its material's tone (`plank`, a wall-material role, or `tree`, lerped
toward `ground` or `ink` by look) lifted toward `paper` until its L* is the wall's + 15, then darkened, hue and chroma kept,
to the lightness at which its grey ΔE2000 against `ground` is 11 where it would pass it (the wall states' greyscale bar,
below); a leaf colour its name's CIELCh hue at the family's lightness, its chroma under the family's cap (`ink` 34, the
others 60); `ice` a pale blue-grey; the festival roles five hues at L* 40–58 under the same caps. Their pairs pass: ice /
water ≥ 13.7 (ΔL* ≥ 15.9), ice / road ≥ 13.7, ice / ground ≥ 16.3, patch.* / wall ≥ 8.5, patch.* / ground ≥ 11.8,
leaf.* / water ≥ 32.0, ink / leaf.* ≥ 26.9 (ΔL* ≥ 30.9), festival.* / road ≥ 16.7 and / ground ≥ 18.9. The rows of items
120, 122 and 124 are placed by rule too (`docs/validation/bench/coh_repair_rendering_r2_roles.out`): `find.k` the CIELCh
hue 25° + 45° (k − 1) at L* 50, `crisis.army.a` … `.d` the hues 20°, 110°, 200° and 290° at L* 44 and `crisis.mark` 30°
at L* 42, each at the family's chroma cap or the largest chroma sRGB holds there; `crisis.tent`, `crisis.ash` and `fog`
`plank` lerped 50 % toward `paper`, `ink` lerped 55 % toward `ground` and `paper` lerped 35 % toward `ambience`, in
linear light. Their pairs pass: find.* among themselves ≥ 14.3, find.* / paper, road and ground ≥ 21.9, find.* / ink
≥ 31.1; crisis.army.* among themselves ≥ 26.1 and / road and ground ≥ 30.4; crisis.mark / road and ground ≥ 35.7;
crisis.ash / road and ground ≥ 8.9 (drawn with its rubble stipple); `crisis.tent` and `fog` lie 3.4–11.1 from road and
ground and are never a mark's only cue (a tent has its ink rim, fog is a wash).
`ink` keeps its character by value steps (O12's restraint: one ink, 4–8 roles): eight city-band colours — paper
(= road), ground, building, ink (= wall = label), water, green, tree, field; courts drawn as `ground` at the city band
(§8.5); the raised under-copy and the vector rung's shadows the ink at an alpha, and its light a change of value only
(`LightingSpec.mono`, §8.4); no role above CIELAB chroma 34 (`field` highest, 33.3) — the cap the palette targets set
(below; J-A69.82); walls in ink and courts as ground at the city band (J-R28, J-R29).

**Palette targets — the owner-opened corpus bands (item 69; owner: "Adopt the corpus measured color targets"; J-A69.81 –
J-A69.84).** These bands of the corpus's measured palette, released by the owner (item 69 (a)), are the only corpus
content in this design: every other corpus fact stays with the staged calibration phase (§13.9), and the program reads no
corpus file (the bands came as figures within the owner's item). They are **targets** — bands a rendered plate must land
in — never a palette to copy; the role values above are our own, placed inside them.

| axis | the measure (our definition, J-A69.81) | band | target | provenance |
|---|---|---|---|---|
| paper lightness | the Rec. 601 luma of the median 8-bit sRGB colour of the pixels whose top mark (the pick buffer) is `paper` | 226–244 | 235 | `corpus`, "owner-opened corpus palette exception, 2026-09-27 (item 69)" |
| paper warmth | R − B of that median colour, in 8-bit sRGB units | 20–50 | pinned at 36 | the same |
| darkest ink | the Rec. 601 luma of the darkest 0.5 % of all pixels ("full ink") | ≤ 45 | — | the same |
| ink warmth | the mean R − B of those pixels | 15–25 (our tolerance) | 20 | the same; the tolerance `own` |
| plate chroma | the mean CIELAB C*ab (D65) over every pixel | 18–70 | median 43; `ink` 20–30 (J-A69.82; J-C2) | the same; `ink`'s range `own` |

**Where they bind.** Every shipped family's paper and ink take the paper and ink targets (J-A69.84), hence one paper
value for all three. The `ink` family's other roles keep their L* and hue and take the least chroma scale whose plate
chroma reaches 20, never past 30 — MFCG's restraint in the default map, the corpus's colour at its lower range
(J-A69.82; J-C2); `lit`, `hatched`, `parchment` (a shipping ink-family variant of the presets table, the one exception
to `ink`'s 20–30) and the reserved `painterly` aim at the median (43), each by the chroma scale nearest it that clips no
role in sRGB and puts none above C* 60 (J-A69.83) — on today's values `lit` ≈ 29 and `hatched` ≈ 30, inside the band,
short of the median. The dependent roles (road = paper, ground, court, field, building, the shadow alpha) move with them,
and the bounded repair's L* steps re-check every contrast-matrix pair, leaving the new warmths as they are. The plate
figures are a **plate model**'s — the city-band role shares of a plate-framed render, stated in the receipt — PLAUSIBLE
until the **measurement render** confirms them: a fixed render of the `ink`, `lit` and `hatched` families at
plate-equivalent resolution and framing (§13.3's golden TOWN and CITY framed by §9.5's rule at 300 dpi on A3, labels and
furniture on, default view, day, no pointer), measured on the resolution-stable axes only (paper luma and warmth,
darkest-ink luma and warmth, plate chroma) by our own code written from the definitions above — no corpus instrument
enters `plat/`. A scripted sweep re-finds each family's chroma scale on that render at the milestone that ships its four
bands (`ink` at M1, where its values ship, and M2b; `lit` at M2b; the ink-family variants at M3b; `hatched` at M5;
§13.4's bar), re-signing the table's values. The corpus's own instrument measured the bands, and its definitions are
beyond this program's reach: a definitional mismatch is re-signed at the reconciliation stage (§13.9), never by opening
the corpus earlier. MFCG parity stays judged by style class (the `MFCG` preset needs no MFCG colours), and §17.1 (5)'s
palette audit — no three colours within ΔE2000 2 of a reference palette — compares with the references' palettes only
(the corpus is the owner's material, no reference).

**Symbolisation table (VIS-1).** Drawn width px = clamp(k × model width × px per metre, minPx, maxPx) in `model` mode, or
a fixed paper width at 1× (× the device pixel ratio) in `paper` mode; no length is written in any reference's private
unit. Exaggeration never enters the model, GeoJSON, VTT, glTF or CityJSON (model widths); styled SVG and PNG carry drawn
widths. The `ink` rows are calibrated on MFCG's metre-unit export at the matched view scale (MFCG size 40 at 0.816 px/m,
1.23 m/px): walls 7.6 m wide, towers 15.2 m across, road cores 8 m, piers 4.8 m; its SVG writes them in its 4 m internal
unit (wall 1.9, road 2) (MN-1, MFP-8).

| semantic | bands | mode | rule | at MFCG size 40's scale |
|---|---|---|---|---|
| `wall.curtain` | city, district | model | k = 3 on each run's thickness — the enceinte's `thicknessCm` on a `full` run, the thickness its `walls.barriers` row gives on a `parapet` run (`stretchClass`, §2.7, §4.8), read along the trace by `sampleProfile` (§3.4) — 2.5 m → 7.5 m on a `full` run; minPx 2, maxPx 12 | ≈ 6.1 px (MFCG 6.2) |
| `wall.tower` | city, district | model | diameter = 2 × drawn wall width, never below the model diameter | ≈ 12.2 px (MFCG 12.4) |
| `wall.gate` | city, district | model | a gap in the wall stroke = max(model opening, 1.2 × drawn wall), flanked by two square blocks of side 2 × drawn wall | ≈ 12 px blocks |
| `way.through`, `way.primary` body | all | model | k = 1, minPx 1.5 | 8 m core ≈ 6.5 px |
| `way.secondary`, lane symbol body | city | model | k = 1, minPx 1 | — |
| way casing | all | paper | h = 0.5 px each side (casing = body + 2h) | — |
| `way.pier`, bridge deck | city, district | model | k = 1, minPx 1 | 4.8 m ≈ 3.9 px |
| raised way (`way.*` on a ground part ≥ 1; item 110 (b)) | all | model | deck k = 1, minPx 1.5, a parapet line each side at the outline weight; piers their model footprints, minPx 1 | — |
| retaining wall (item 110 (a)) | all | paper | city band: one line at 2 × the building outline weight with low-side ticks 1 px long every 4 px; district and finer: the `retaining` program | — |
| stair and ramp intervals of a way (item 110 (a)) | district and finer | paper | the `way.stair` program over the way's body | — |
| building outline | city | paper | 0.5 px × clamp(s ÷ 8, ⅓, 1), s = median footprint side in px at the zoom stop (MFCG's Thin lines as a law) | — |
| building outline | district and finer | paper | 0.5 px | — |
| raised under-copy offset | city, district | model | (+0.4 m, −1.0 m) east / north × the class ratio — `raised.ratio`'s first matching row: landmark footprints (the landmark semantic of slot 12, `building.landmark`: keeps, temples, churches, halls) 2, the farmstead class and its outbuildings 0.6, every other building 1 (provenance `ref:MFCG 12710731 raise ratios (code)`, P15; item 54), read from the mark's semantic and `class` column (§8.1), no model field — drawn length clamped to [0.3 px, 2.5 px] × the ratio | — |
| informal cluster structure (a plot of §4.7 S11's `cluster` arrangement; item 70) | city | model | each structure its own small roof mark over the plot's footpath web drawn in `ground`, never closed into one mass across the paths (§8.5 (2)'s exception); a structure below the 2-px floor a settlement dot; from the district band a footprint with its entrance tick like any building | — |
| harbour-mouth chain (`Gate.mouth`, §2.7; g item 106 (e)) | district and finer; its towers at every band | paper | between the `water` gate's two towers, by the era row's `harbourChain` (V11's `EraRow`): `raised` — a solid line across the entrance in `wall` at ½ the drawn wall width (minPx 1), drawn with the gate (slot 19); `lowered` — the same line dashed (2 px on, 2 px off) in slot 7, under the shore marks and everything above the water | — |
| boundary treatment (fence, hedge, yard wall, railing) | district and finer | paper | ≤ ½ the building outline weight, never filled, gaps at gates | — |
| entrance tick (`Entrance.role`, §2.6; item 29) | district and finer | paper | a tick across the footprint edge at the entrance vertex: `main` 1.5 px long at the outline weight; `side`, `rear`, `yard` and `service` 1 px at ½ the outline weight; at the building band the plan's door leaf | — |
| frontage treatment (`BuildingSlot.frontage`, §2.5; item 19) | district and finer | paper | a run along the main slot's frontage edge at ≤ ½ the outline weight: `lean_to` and `stall` as short ticks at bay spacing, `shopfront` a bar inset ½ px, `arcade` arcs at bay spacing; `none`, `gate` and `wall` draw nothing beyond the boundary treatment | — |
| passage arch (a `passage` face, §2.5; item 30) | district, neighbourhood | paper | an arch glyph on the front building's outline (`Passage.frontBuilding`; none while the passage has none, §2.6's `BaseWing.spans`) at each end of the face — where it meets its way and its court — 3 px wide at 1×, never below 2 px; the face's floor takes `road`; none at the city band, where the spanning building's mass covers it (§8.5 (2); J-A30.84, J-A30.87) | — |
| minimum feature | all | — | 2 px, met by masses and settlement dots (§8.5), never by enlarging one footprint | — |

Curtain walls draw after footprints, and the wall symbol is clipped on its inner side to the band's inner edge minus the
setback, so it overhangs only outward (berm, moat, glacis) and never covers a plot. **Dry ditch:** the `ditch` residue on
the town side of an `on_enceinte` bailey (§4.7 S10 (0), §4.8) takes the glacis parts' role in a dry-ditch variant — fill
5 ΔL* darker than the glacis fill and, at the district band and finer, a short inward hachure along its inner edge; at
the city band the glacis parts' plain fill; the overhang rule covers it.

**Paint programs.** `fill`; `stroke(width by symbolisation, join, cap)`; `casing(w, h)` (ink at `w + 2h` in the casing
pass, body at `w` in the body pass); `bands(N, W, exponent, ramp)` (VG's water law); `raised(offset, classRatio)`;
`shadowPass(mode, colour, alpha, penumbraPx)` (§8.4); `hatch(angle | ridge, pitch, taper)`; `roof(construction,
dark = lit × lerp(ambience, shadow, α))`; `crown(library)`; `halo(role rule)` (§9.4); `glyphAlongSpine`;
`pattern(texture, tintRole, metresPerTile)` (tinted seamless textures); `faceLight(dir)` (a per-face tone from the face
normal and the light: roof faces from the skeleton or the wings, wall sides); `ramp(field, stops)` (per-tile pixels from
a field raster: water depth, terrain colour); `hillshade(sun, strength)` (Lambert on bilinear-interpolated cell normals
of the terrain field, water masked, strength from the `shadow` role's alpha, multiply-composited after fills and way
bodies and before buildings and trees, no blur); `contourMarks(levels, mode: contour | hachure | grass)`;
`foam(widthM, alpha)` (from the shore-distance field on `open` segments, half alpha on `river`, none on `sheltered` and
`quay`); `feather(widthM)` (three inset vector bands at α ⅔, ⅓, 0 toward open ground, no bitmap blur; COV-FTG-I05);
`outlineMix(factor)` (an outline's ink lerped toward its district's tint by `factor`: the tint rule's 0.3, below);
`tint(method, strength)`; `weathering(amplitude)`; `instances(library)` (§8.10); `vignette` (a program: the painterly
family's spotlight vignette, drawn per mark in its slot; distinct from the post operation `edgeFade`);
`retaining` (item 110 (a): the wall as a double line in `wall` — its face and its coping — with short ticks toward the low
side every 1 m, buttresses as small filled rectangles on the low side; drawn by its run's state row); `raisedWay` (item
110 (b): the deck body in `road` — an aqueduct's channel in `water` between two `wall` lines — with a parapet line in
`wall` along each side, the piers as filled footprints in `wall`, the spans' openings as a dashed outline in the strip at
the district band and finer; the MFCG under-copy keeps the name `raised`); `way.stair` (item 110 (a): a way's stair
interval draws step ticks across the way over the interval only, every 1.2 m of ground length at the thin stroke; a ramp
interval draws the way's body with two hairlines converging toward its upper end; neither changes the way's shape or its
other marks); `roofscape(tone)`, `dormer`, `porch`, `towerRoof` (V02 §5.3; M6); `surface(kind)` (a shared stamp tile per
road-surface kind), `steps`, the hood pin symbols and the ground-access symbols (V01 §5.1; M5); `planWallShade` (a soft
band inside each plan wall, broken at openings; V03 §5.1; M6-P);
`wallPatch(look)` (g item 114: a patched run's strip in its look's role and pattern, the wall rows below); `iceFill`,
`leafCover` and `creeper` (g item 117's season rows, above);
`ruin` (outline dashed by an entity-keyed pattern, fill at 30 % alpha, rubble stipple: the `ruined` state's program, with
the `none` roof kind, §2.6); `trace(kind)` (a footprint, ring or centreline drawn as a broken hairline with no fill — a
cleared building, a superseded wall's old line, a closed tunnel — at the district band and finer); `vault` (a barrel-vault
hatch along an underground cell's long axis over the `flat` roof kind, II.7.3); `symbol(glyph)` (a point symbol for every
`Pin.kind` of §2.7, for every `AccessPoint.kind` of II.7.4 where the point breaks the surface, for each end of a `passage`
face (an arch, §8.3) and for §8.5's change marker); `glow(radiusPx, role)` (the vector rung's light sprite at a `light`
mark, §8.4); the **Works programs** (item 67) — `stake` (a dashed footprint with a material-pile glyph in the yard),
`pit` (a cellar pit or trench: a darker ground fill with a hachured rim, and a spoil-heap stipple beside it),
`scaffold(ringPx)` (a hatch ring outside a footprint's walls), `frame` (the roof construction's lines without fill:
rafters and ridge) and `charred` (a blackened roofless shell); and the **underground system programs** (item 65) —
`ossuary` (a catacomb gallery's band with niche ticks), `cavern` (a natural gallery's irregular fill with a rock
stipple), `quarry` (a worked gallery's band with pillar squares, laid at `roomM` pitch with side √pillarShare × `roomM`
along a `workings` chamber's OBB axis, V04 §5), `ruinMasonry` (g item 109 (g): an ancient ruin system's double-lined
masonry walls 30 cm apart, 60 cm column dots in halls and temples, rubble stipple where collapsed; M6-U, file f item
407), `unexcavated` (g item 109 (j) (2): dashed kerbs at 40 % alpha, no fill, no light; drawn for an `unexcavated` cluster
only for a `secret` key while the view key `showUnexcavated` is on, and for a `lost` cluster for every key that admits
its elements, whatever `showUnexcavated` (V04 §5.2; g item 113 (e)); M6-U) and `chamber` (a chamber's floor, the undercity's in
`ground` with its buildings drawn as buildings). Which states select these programs and which tone overrides they take
is the `states` table below, keyed by §2.8's ladders and §4.11's Works stages. On rungs 1–2 of §8.4's ladder
`faceLight`, the two-tone `roof`, `hillshade` and the `lit` crowns emit the albedo — the lit side's tone, no face
shading — and write their normals into the surface layer, and the light pass lights them once; on rung 3 they light as
written here (J-A68.87). In the state the ladders leave undeclined, a tunnel draws by
its `Tunnel.kind` — a cased band for a `main`, a hairline pair for a `drain` or `culvert`, a `passage` as a `main` with
arch glyphs at its ends — and an underground building (one on the underground arena) draws its footprint in
`building`, a vault class with the `vault` hatch, both through the underground layer's cut-away (§8.4); access points and gratings are `symbol`s on the
ground layer where they break the surface. A lane's body and casing end square at
the kerb of the way it meets; the junction wedge belongs to the higher-class way (GEO-21's renderer half). Hairlines and
casings are in paper px; ribbons and symbols follow the symbolisation table.

**Relief tier (VN-029, VN-031; base should-have, optional, off by default).** Contour, hachure and grass marks are
extracted per render tile from the terrain `field` by marching squares over the tile's cells plus a margin, then
resampled evenly along each level line, and clipped to the land faces in vector space before emission, so no contour
crosses a shore (F-CONTOUR, §5.2; the coast construction is §4.2 S1 (2)); `hillshade` runs on the same field.
VG-specific looks (spotlight vignette, dramatic forest) stay in the reserved `painterly` family.

**Multi-colour roles (XB17).** A role may hold a list: an individual mark (building, roof, tree, stall) takes index
`RH32(role, key, salt[, instance ordinal], style id) mod n` (§8.1 item 5); aggregate fills (block ground, city-band
masses, wood fills) take index 0.

**Tints and weathering (K12).** `tint`: per district a hue from a greedy colouring of the district adjacency graph in
address order (§6.3) — hue = base + 137.5° × colour index, stepped by 30° until every neighbour differs by ≥ 30°; method
`spectrum` (hue at fixed saturation and value), `brightness` (value scaled) or `overlay` (blend toward the hue), strength
0–1; applied to the roofs of built districts; outlines take lerp(ink, tint, 0.3) (`outlineMix(0.3)`); recomputed when the
palette changes; off in `ink` by default. S14 writes each mark's district colouring index into the `tintKey` column
(§8.1), which the `tint` and `outlineMix` programs read. `weathering`: each roof's RGB × (1 + u·w), u ∈ [−1, 1] from
`RH32('weathering', key, salt, style id)`, w = 0.04 (ink), 0.06 (hatched), 0.08 (lit).

**Materials and weather (COV-FTG-F20, K06).** Override rows may key roof and wall colours by `roof.material` and the
enceinte's wall material. A material is a rendering attribute only (§2.6; item 19): its rows change colour and texture
roles, never a mark's geometry, so a `setAttr` of a material re-keys the same marks' look and moves nothing.
**Wealth in the roof's colour, as FTG draws it (§2.6; items 19, 23; J-A19.81).** The `lit` family's default sheet keys
the `roof` role by the building's prosperity band — one override row per band of `prosperity.bands` (§4.5), keyed by the
band's name and read from the mark's `prosperity` column banded by §4.5's rule (the field, as labels and descriptions
read it; never `builtBand`, below) — the richest roofs the deepest clay, the poorest the greyest: `rich` `#C17C46`,
`prosperous` `#C08051`, `comfortable` `#BD855B` (the role's own value), `modest` `#BA8765`, `poor` `#B48B6E`, `squalid`
`#AF8E78` — our own calibratable rows, moved by `lit`'s chroma scale with its role values (item 69;
`amendc_rendering_palette.out`), each passing, as the loader checks, every contrast-matrix pair of the `building` role
whose value the lit roof side shares (ground, road, garden, green, ink). In `lit` the material picks the roof's
`pattern` texture and the band row its tint, so the two never contend; a sheet that also keys a roof colour by material
applies it after the band row; a band without a row takes §4.5's interpolation between the nearest rowed bands. `ink`
keeps MFCG's one roof role and `hatched` NG's two tones. The retaining walls' material roles (`wall.dry_stone`, `wall.earth_bank`,
`wall.timber_crib`) are picked by `RetainingWall.material` (V11's `MaterialRow` key) as the wall-material rows are. The
view key `weather` ∈ {clear, overcast, snow} (§2.9): `snow` lays the `snow` role over ground, fields and roofs while
`road` keeps its value; `overcast` removes the global light's direct term — its shadows go, the ambient and the
occlusion stay, and on the vector rung projected shadows are off (the raised under-copy stays). The model and its hash
are untouched.

**Seasons (g item 117; J128): a look, never a change of the map.** The view's season is its **year position** — §2.9's
`yearWeek`, 0–51 from the first week of spring on SettlementForge's grid (spring 0–12, summer 13–25, autumn 26–38,
winter 39–51; the named seasons the picks of their middle weeks 6, 19, 32 and 45) — which follows the dossier's week
under §2.9's follow flag (§7.7's DR42) and is midsummer, 19, standalone; the look reads it with the biome's climate row
and its season columns (§4.2 S0, §10.2; V11 §3.25.6: the winter's severity and the bands of weeks of leaf colour, leaf
fall, blossom, growing, harvest, hay, ice and snow, a band wrapping the year's end when it starts after it ends; DR42's
height correction). Nothing below moves, adds or removes a mark's geometry or reaches a model value, a digest or a
save; the tile worker draws it from the display list (§8.1 item 8), so a week change re-skins tiles (§8.8's key; §12.5)
and re-emits nothing.
* **Surfaces through the year (item 117 (f)).** Each land-use, green, garden, orchard and vineyard face, each wood floor
  and each deciduous crown and hedge reads the V11 `season.surfaces` row its `season` column names (§8.1 item 8): at week w,
  the look of the row's last phase whose week — its anchor band's end, plus its offset — lies at or before w, read
  cyclically; a village field by its crop and rotation slot, its strips offset strip by strip (V07 §5.1). The looks,
  each a linear-light lerp of the family's own roles (our own, calibratable):

  | look | paint | pattern |
  |---|---|---|
  | `field.sown` | `ground` lerped 30 % toward `green` | drill rows: 1-px `field` lines every 3 px along the field's long axis |
  | `field.green` | `field` lerped 60 % toward `green` | — |
  | `field.ripe` | `field` | — |
  | `field.harvest` | `field` | stooks: 2-px `plank` dots in rows every 6 px |
  | `field.stubble` | `field` lerped 35 % toward `paper` | stubble rows: 1-px `field` lines every 3 px |
  | `field.ploughed` | `ground` lerped 18 % toward `ink` | furrows: 1-px lines every 3 px in `ground` lerped 30 % toward `ink` |
  | `meadow.green`, `grass.green`, `garden.green`, `orchard.leaf`, `vine.leaf`, `crown.leaf`, `wood.floor` | the mark's own role | — (the map as drawn) |
  | `meadow.high` | its fill lerped 25 % toward `tree` | tall-grass ticks: 1 × 2 px every 4 px |
  | `meadow.mown` | its fill lerped 40 % toward `field` | swaths: 2-px lines every 6 px |
  | `meadow.winter` | its fill lerped 55 % toward `verge` | — |
  | `meadow.dry` | its fill lerped 60 % toward `sand` | — |
  | `grass.autumn` | its fill lerped 45 % toward `field` | — |
  | `commons.bracken` | `green` lerped 45 % toward `leaf.russet` | bracken: 2-px `leaf.russet` ticks every 4 px |
  | `garden.bare` | `garden` lerped 55 % toward `ground` | — |
  | `orchard.blossom` | the crowns | 1-px `paper` dots over 30 % of each crown |
  | `orchard.fruit`, `vine.fruit` | the crowns; the vine rows | 1-px dots over 15 %, in `leaf.scarlet` (orchard) or `leaf.crimson` (vine) |
  | `orchard.colour`, `vine.colour`, `crown.colour` | each crown's leaf colour (below) | — |
  | `orchard.bare`, `vine.bare`, `crown.bare` | the bare-crown symbol in `tree`; a vine's rows as their stakes | — |
  | `wood.floor.leaves` | the wood's fill | the leaf cover (below) |

  "Its fill" is the face's own role (`green` or `field`, as the sheet fills that land use). A look stands where its role
  stands, so it takes that role's matrix rows — a field look the field / road and field / ground pairs, a meadow or grass
  look those of its fill, a garden look the `garden` ones, a crown look the `tree` ones —
  checked as the palette is; every look passes on the shipped families
  (`docs/validation/bench/coh_repair_rendering_r1_looks.out` (B)).
* **Autumn's covers (item 117 (f2)).** Through the leaf-colour band each deciduous crown — §8.10's instances whose
  `leafType` is deciduous, a hedge's, an orchard's, a vine's and a creeper's included — takes its own colour: the keyed
  draw `RH32('crown.leaf', key, salt, ordinal)` picks one of its species' `season.leaf` colours by weight, drawn in that
  `leaf.<colour>` role (a species with no row is evergreen and keeps its look all year); a crown stays green while
  `RH32('crown.early', key, salt, ordinal)` ÷ 2³² is under `earlyGreenShare` × (1 − t), t the share of the leaf-colour
  band elapsed up to its middle week (none past it). From the leaf-fall band's last third the crowns thin: each is drawn
  at alpha 1 − f over its bare-crown symbol, f rising from 0 to 1 across that third. **Fallen-leaf cover** lies by V11's
  `season.cover` rows on the marks of each surface — `underTrees` (a deciduous crown's footprint × 1.5); `street`, the way
  bodies of the `through`, `primary` and `secondary` classes (§2.4's `WayClass`); `lane`, those of the `lane`, `alley`,
  `cul_de_sac` and `track` classes; `green` and `lawn`, green and lawn faces and a village's crofts and closes; `garden`,
  garden yard parts and a village's toft yard parts (V07 §5.1 names which faces are crofts, closes and toft yards);
  `churchyard`, churchyard faces; `roof`, roofs; and `stillWater`, the `pond`, `moat`, `millpond` and `lake` water marks:
  on a world-aligned grid of 1.5 m cells, a cell within the row's `driftM` of a
  deciduous crown (or under one) takes a 1-px leaf dot where `RH32('leaf.cover', key, salt, cell)` ÷ 2³² is under the
  row's share — `start` at the first leaf-fall week rising linearly to `end` at the last, then fading to none over
  `fadeWk` weeks, none while snow lies — × `edgeFactor` within 1 m of a wall line (a palisade's and a yard wall's among
  them), a hedge or a kerb; the dot takes the nearest deciduous crown's leaf colour, so the cover deepens week by week and
  gathers at walls, hedges and kerbs. **Creepers:** a
  building whose draw `RH32('creeper', key, salt)` ÷ 2³² is under 0.15 carries a creeper along its longest street-facing
  wall at the neighbourhood band and finer — in `green` through the leaf weeks, in its `season.leaf` creeper colour
  through the leaf-colour band, gone when bare. Bracken goes rust and stubble gold by their looks above.
* **Water in winter (item 117 (e)).** Each water mark's ice kind (§8.1 item 8's `season` column) — `pond` for a pond,
  an oxbow or a ditch; `moat`; `millpond` for a canal (a leat or a mill cut); `lake`; `slowRiver` for a river,
  tributary, distributary or islet channel whose course falls under 0.5 m per km on average, `river` for the rest;
  `harbourEdge` for a harbour basin; `seaShore` for a sea's or an estuary's `sheltered` shore segments (§8.1 item 2's
  exposure); none for a water body carrying a `spring`, an oasis, which never freezes — is frozen at week w when the climate's winter is at least its
  `season.water` row's `freezesFrom` and w lies in the climate's ice band shortened by the row's `lagWk` at each end
  (V11 §3.25.6), so still water freezes first and flowing water last; a `harbourEdge` freezes within 20 m of the basin's
  shore and a `seaShore` within 30 m of its segment, the rest of that water staying open (our own cells). A frozen face
  draws by `iceFill`: the `ice` role, crack lines — 1-px hairlines in `water`, three per 1 000 m² of face, each a
  three-segment polyline keyed by `RH32('ice.crack', key, salt, k)` — and, while snow lies, a `snow` stipple over 30 % of
  it. **Open leads** stay water over the ice: S14's `water.lead` marks (§8.1 item 8) — a river's stretches whose course
  falls 2 m per km or more (its fast current), each water mill's frontage reach (its weir and race), and a 12 m disc at each
  spring point, each outfall (§2.3; II.7.3) and each leat's take-off (the weir where a mill's canal leaves its river; V07
  §5.1 names a village's leat) — drawn in `water` with a ragged rim. **Boats** (§8.10) are drawn hauled
  up on the bank while their water is frozen.
* **Snow and the sun (item 117 (g)).** While a viewer has set no `weather`, it is `snow` in the climate row's snow band
  when the winter is `cold` or `severe`, and `clear` otherwise — an arid row never snows by default; a viewer's value
  stands until the viewer changes it, except on an `arid` row and on any row whose winter does not freeze (`winter`
  `none`, or no `snow` band; V11 §3.25.6), where a `snow` value draws as `clear` in every week whatever the view holds:
  no snow lies there and none falls (*Weather effects*, below; item 124 (c); T124-3). The view sun's default
  height follows the week (§8.4's *Sun*); item 102's model
  daylight never does.
* **Checks and the off form.** Every look, leaf colour and the ice pass the contrast matrix (above) in every family; a
  season changes no legend meaning — its colours are looks, never legend categories — so the deficiency variants need
  nothing new and every colour-coded category keeps its second cue in every week. A document whose pinned tables hold no
  item-117 season rows (V11's off form) draws the four named seasons' override rows by the season its year position
  falls in — autumn re-skins deciduous crowns (by `leafType`, deciduous when absent) by `tree@autumn`, winter draws the
  bare-crown symbol in `tree`, spring and summer the map as drawn — and keeps the sheet's sun.

**Post operations (K07; `PostOp`).** `greyscale`, `sepia`, `wash(colour, strength)` (a whole-tile tint), `edgeFade` (the
view's vignette), `pixelate(cellPx)`, `dotScreen(cellPx, angle)`, `scanline(periodPx, alpha)`,
`crosshatchNoise(periodPx, alpha)` — named apart from the per-mark programs `tint` and `vignette` — each applied once to a
tile's base picture (slots 1–20, below), never to the labels, live overlays and furniture composed over it: by Canvas2D
in the tile worker after the base's marks (≈ 1–2 ms per 512² tile) where the light pass does not run, after it where it
does (§8.4 (f)'s order), so no light re-colours a greyscale, sepia or tinted base. The cell operations (`pixelate`,
`dotScreen`) take their cells and weights by §8.4 (f), so a view and an export of one frame agree. PNG export applies
them per tile; SVG carries greyscale, sepia and wash as one colour-matrix filter over its lit base (the wrapper group of
§11.1's SVG row) and omits the pixel operations, which the export report lists.

**Live layers (K13, N-4).** `interface LiveLayerProvider { id: string; target: 'base'|'overlay'; readsElaborations?: boolean; marks(view: ViewState, model: ModelView, region: Box, elaborations?: readonly ElaborationRecord[]): MarkTable }`
adds display-list groups that are view data (never hashed). Providers run in the generation worker, which calls one when
the view state it reads, the model, the visible region (dilated by one tile) or — for a provider declaring
`readsElaborations`, such as `live.stale` — the elaboration records (`Document.derived.elaborations`, §2.8, §2.9; passed
as `elaborations`) change, so a click that writes only the cache (§7.3) re-runs it; it delivers its marks as a
`DisplayDelta` of group `live.<id>` (§8.9). `overlay` marks are drawn in the tile worker's composition step (§8.8), so a
selection or a moving person re-composes tiles without re-rastering; a `base` provider (a thematic recolouring) is part
of the tile key (§8.8). Shipped: `live.selection` (overlay); `live.stale` (overlay: §8.5's change markers, one glyph per building or district whose
elaboration record reads `stale`, read from `Document.derived.elaborations` beside the model view, outside every digest;
J-A28.81); `live.favourites` (base: the view state's `favourites` as a
thematic override); `live.ghost` (overlay; item 101: the pending dry run's preview — the derived shape of a points form,
the plots and buildings the declaration would make or move in `ink` at α 0.5, its handles and the anchor of §9.5's count
badge — delivered while a declaration is being drawn or a clerk's proposal waits, removed on commit or cancel, never a
model change; R1, R3, R14); `live.windows` (base; item 68: a `light` mark for each lit window at the view's hour and
drawn week by §10.3's rule, read by the light-map bake, §8.4); `live.shade` (base; g item 102 (f): the daylight-share
driver's raster as six stepped ink veils under the building fills, an island's shade strip outlined by V05's
`sky.island.shadeStrip` and `sky.island.shadePending` rows — V09 §5.4); `live.links` (overlay; g item 105 (j): the bound
supply links as curved provider-to-consumer arcs by volume and good — V09 §5.4); `live.find` (overlay; g item 120: V09's
provider of Find's marks, drawn by *Find* below — the veil, the halos, the pins, count bubbles and ghost pins, and Show
gaps' dashed outlines, which are the Coverage view's one successor: item 103 (f)'s catchments that lack a member of a
class, V01 §5.4 (3)'s `gapUnits` over V01's `catchmentOf`, item 120 (i)); `live.voids` (overlay: the
underground systems' footprints on the ground with the districts above them, from V01's `districtsAbove`, admitted by
§9.2's function); `live.history` (overlay; V06 §5: then-and-now between two weeks — `live.history.added`, `.removed` as
a dashed ghost from the earlier frame, `.changed` as a tint; M6-E); `live.people` (overlay: favourite persons' positions
from the occupancy at the view-state hour, one categorical colour per person; registered by the simulation module
through §14's `LiveLayerProvider` registry, §10.3); `live.festival` (base; g item 118: the festival decorations, below);
and `live.crises` (base; g item 122: the crisis looks, below). The model view a provider receives offers
`fieldDriver(id: 'daylight'): { cellCm: number; origin: PointCm; w: number; h: number; values: Uint8Array }` — the
field's driver raster as §4.5 holds it, or computed on demand by g item 102 (a)'s sampler and cached per document state
when the field skipped it; read-only (file f item 411). A ghost a clerk's `preview` delivers carries `source: 'clerk'` and
draws the AI mark beside its count badge (R19; file f item 518).

**Festival decorations (g item 118; J129): a look, never a change of the map.** While the view's year position (the
season rows above) lies in a festival's weeks, the base live layer `live.festival` draws its decorations: the festivals
are §7.7's DR43 schedule of the dossier's `traditions` (each with its weeks, kind, staging places and deity, a window
wrapping the year's end when it ends before it starts) and the festival display is §2.9's (following the schedule, off,
or previewing one festival — standalone, one of V11's `festival.generic` rows); nothing reaches a model value, a digest
or a save, and with no festival shown nothing is drawn, the tiles byte-identical to the map without the layer (the
no-op pin).
* **What, by tier and band.** The rows of V11's `festival.decorations` for the map's rung (§10.2's shape; V11 §3.25.7),
  `SKY` on a sky island's land (V05): each tier draws its own rows and never a larger tier's, each from its row's `band`,
  the coarsest it shows at; a row with `alt` is one choice per festival, by `RH32('festival.place', the town root's key,
  salt, H32(festival id))` ÷ 2³² against its weight.
* **Where.** A row's place, as DR43 resolves the festival's staging (V11's `festival.staging` keywords, else its kind's
  `fallback` row; a place the dossier names wins), stands on the map as:

  | place | where it stands |
  |---|---|
  | `heart` | the root reservation's square (§4.2 S3); at a village rung V07's heart |
  | `square` | the main square (the root plaza); a staging `hall` key's square before the hall; at a village rung the open space that carries the market, else the flanking square, else a street market's frontage by the heart (V07 §5.1) |
  | `market` | the market squares, highest `rank` first (§4.2); at a village rung as `square` |
  | `green` | the greens, largest first; at a village rung V07's green, else the first nucleus's open space, else the heart |
  | `church`, `temple`, `deityTemple` | the plot of the largest church, or temple, use; `deityTemple` the festival deity's temple where one stands, else `temple` |
  | `waterfront` | the `quay` shore runs and the landings, with their boats (§8.10) |
  | `gate`, `gates` | the gates on `through` and `primary` ways; at a village rung the palisade's gate on the through road, else the through road's perimeter entry |
  | `fairField` | the fair field where one stands (V07), else the largest green outside the walls |
  | `castle` | the castle's bailey; at a village rung the manor house's plot |
  | `fieldEdge` | the edge of the arable land nearest the green |
  | `processionRoute` | the procession route: the shortest path on the part-0 way graph from the festival's religious place (`deityTemple`, else `church`) to the main square, along `through` and `primary` ways where they connect, ties broken by address order |
  | `doors` | the `main` entrance ticks along the main ways within 150 m of the heart |
  | `churchLane` | V07's church lane, else the shortest way from the church's door to the green |
  | `towers`, `walls` | the enceintes' towers and their `standing`, `worn` and `patched` runs |
  | `hall` | the front of the town hall's or guildhall's plot |
  | `mainWays` | the `through` and `primary` ways |
  | `boats` | the boats at the waterfront (§8.10) |
  | `rims`, `landings` | a sky island's rim chain and its landings (V05) |

  A place that does not stand takes the next of its kind's fallback places, and the heart when none stands.
* **Placement, keyed and stable.** An item's count is a keyed draw in its row's `count` range per its `per` unit (per
  place, per 100 m of run, per square, per tower, per boat). A point item — maypole, bonfire, stall, table, pavilion,
  stage, a garland at the heart — takes, in rank order, the cells of a 3 m world grid inside its place's face less 2 m
  from its edges, less every way's carriageway and every gate's passage (its opening and 4 m along its way each side),
  ranked by `RH32('festival.place', the place's render key, salt, H32(festival id) + 64 × item index + ordinal)`; a place
  too small for its count takes as many as fit and the count left out is reported in the view telemetry. A run item —
  bunting, lantern strings, lanterns, banners lining a way, garlands on doors, pennants along walls and rims — stands at
  its spacing along its chain from an offset drawn the same way; bunting spans a way from front to facing front, above its
  carriageway; banners and pennants stand on their gate, hall, tower or wall run. The seed (through the render keys), the
  festival's id and the place fix every decoration, so a festival draws the same in every view and export (byte-stable
  tiles per seed), and two festivals in one week both draw, in window order.
* **The glyphs** (our own; drawn in the festival's two colour roles, alternating along strings; each at least 3 px at
  1×, not drawn coarser than its row's band): `garland` a swag of five motif beads (3 m); `bonfire` a stacked-wood disc in
  `plank` with a flame star in the first role (3 m); `maypole` a 1 m disc with six ribbons 4 m long; `bunting` a line
  hung with triangular flags every 1 m; `stall` a 3 × 2 m rectangle under a striped canopy; `table` a 4 × 1 m `plank`
  rectangle with bench lines; `banner` a 1 × 2 m panel on a pole tick bearing a motif; `lanternString` a line beaded
  every 2 m; `lantern` a 1 m dot in a ring; `pennant` a 2 m triangle on a pole tick; `pavilion` a 6 m disc with radial
  seams; `stage` an 8 × 5 m `plank` platform with a front step; `boatDecor` a pennant on a boat's mast; `routeColour`
  the route's way bodies overlaid in the first role at α 0.5 with chevrons every 20 px along the route. **Motifs and
  colours:** the culture's `festival.motifs` row (`site.culture`, else `mixed`) gives the motif glyphs and the two
  colour roles — `festival.sacred` replacing them for a festival that names a deity — and the year position's
  `season/<name>` row adds its motifs; banners, pennants, pavilions and stall canopies carry a motif, and garlands and
  bunting string them, cycling the culture's then the season's by a keyed draw. The motif glyphs: `wreath` a ring of six
  dots; `ribbon` a bow; `knot` an interlace; `laurel` two leafed arcs; `lanternPierced` a dotted ring; `garlandFlower`
  and `flowers` five-dot flowers, strung or scattered; `canopy` a scalloped edge; `lanternPaper` a ribbed oval; `streamer`
  a wavy tail; `sunDisc` a rayed disc; `pennantSwallowtail` a forked pennant; `sheaf` three strokes tied; `evergreenBough`
  a feathered stroke.
* **Read without colour; never over a label or a passage (item 118 (c), (f)).** Every decoration is told by its glyph
  shape and the route colour by its chevrons (the colour-deficiency table above); the colours name no legend category.
  Nothing is placed in a gate's passage or stood on a carriageway, and the layer draws in slot 19b, under slot 23's labels
  and their halos (§9.4), so no decoration covers a label. Decorations add no light: the lanterns are glyphs (§8.4's
  lights are §2.7's records and the derived ones).
* **The layer.** `live.festival` runs in the generation worker (*Live layers* above) over the model (the places, the
  way graph, walls, towers, gates, the boats by §8.10's function), the view state and DR43's schedule; it delivers
  `glyph` and `ribbon` marks of semantics `festival.<item>` for the visible region dilated by one tile, re-run when the
  year position crosses a window's edge, the festival display changes, the model changes or the view moves — so
  decorations are made lazily, tile by tile as they come into view (§12.5) — and, a `base` layer, joins the tile key (§8.8).

**Crisis looks (g item 122, with (h)–(i); J135, J138): a look, never a change of the map.** While a crisis look stands —
a `ConditionOverlay` whose weeks hold the view's week (§2.7's reader comment: §2.9's `week` in [`sinceWeek`, `untilWeek`),
never `yearWeek`) whose `crisis.map` row gives a look, admitted at the viewer's key by §7.7's DR44 — or one is
previewed, under §2.9's per-viewer key `crises` (`follow` draws the standing looks, `off` none, `preview` one look kind
at §10.2's `previewSeverity` whatever the week, with or without a dossier), the base live layer `live.crises` draws it:
its kind's row of §10.2's `crisis.looks` — its place, band, scale by severity and rung or by headcount, and priority —
placed by §10.2's *Crisis looks* (d)–(f) on the render keys (render tag `crisis.place`, §8.1), the camped ground that
does not fit drawn on §8.8's surrounding ring. Nothing reaches a model value, a digest or a save; a condition the key
withholds is never drawn, legended or counted; with no look standing and none previewed nothing is drawn, the tiles
byte-identical (`item122.crises`; T122-7).
* **By band** (item 122 (d)). A look shows from its row's `band` (V11's value: the first column below holding a part)
  and adds detail at each finer band; its parts:

  | look | city band | district band adds | neighbourhood band adds |
  |---|---|---|---|
  | `siege` | each army's camp a `campCluster` under its smoke; the siege line — the trench a 1.5 px `ink` line, its earthwork bank a 3 px `crisis.ash` band 6 m outward — round the walled arcs at the standoff; burned farmsteads as `crisis.ash` footprints | the tents in rows, the horse lines, the engines facing their gate or wall run, each army's banners | fires, carts, the trench's spoil |
  | `blockade` | a `campCluster` across each approach road | its tents; a `barricade` across the road | fires, carts |
  | `refugeeCamp` | the camp's `campCluster` on its land by the gate, its smoke | tents and `shanty` glyphs in rows along lanes; carts | cooking fires |
  | `quarantine` | the fenced camp's `campCluster`, its smoke | its fence, `hut` glyphs, the `pestHouse`, the `graveRow`s | in the affected quarter, `markedDoor`s and the `cordon` |
  | `famine` | its fields bare (`bareField`, over item 117's crop stage) | its pens empty (`emptyPen`) | the principal market's stalls under `shutter` bars |
  | `beast` | — | the edge's torn palisade sections (the `breached` wall-run row, below), `watchFire`s along the edge | `stakes` barricades |
  | `raiders` | burned outlying farms (`crisis.ash` footprints), smoke | abandoned carts; a `barricade` across each approach road | — |
  | `disaster` | its districts in the `ruinTone` | — (its buildings' damage, below) | rubble at the frontages; by its pattern, scorched (`crisis.ash`) or flood-marked (a `water` stipple at α 0.3 below the flood line) ground |
  | `occupation` | the garrison camp's `campCluster` | its tents; foreign `banner`s on the main gates and the castle, else the principal plaza | — |
  | `rebellion` | — | a `barricade` at each junction of the principal market's streets | — |
  | `boom` | — | `scaffold` on the frontages (the Works rows' program, below) | — |
  | `bust` | — | `shutter` bars on the shops' frontages | — |

* **The glyphs** (our own; each at least 3 px at 1×; never drawn coarser than its look's band): `campCluster` a camp's
  camped ground as its hull at α 0.35 — in its army's colour (`crisis.army.*` by the army's index in its coalition,
  cycling past four), else in `crisis.tent` with an `ink` rim — dotted in `ink`, one 1-px dot per 400 m² of camp; `tent` a 4 × 3 m
  `crisis.tent` rectangle with an `ink` rim and a ridge tick; `shanty` a 3 × 3 m `plank` square with a broken rim; `hut` a
  4 × 4 m `plank` square with an `ink` rim; `pestHouse` an 8 × 6 m `plank` rectangle with a cross tick; `engine` a 6 m
  `plank` frame with a throwing-arm tick toward its target (a trebuchet), or, aimed at a gate, a 6 × 3 m roofed shed
  (a ram); `banner` the festival banner's panel on a pole tick (above) in its army's colour, bearing its army's glyph;
  `fire` a 2 m star in `light`; `smoke` a 40 m plume of 1-px `ambience` stipple at α 0.35, thinning outward and leaning
  downwind; `cart` a 2 × 1 m `plank` rectangle with two wheel ticks; `fence` a 1 px `ink` line with a post every 2 m;
  `cordon` a dashed `crisis.mark` line with a post every 5 m; `graveRow` a row of 1 × 2 m `ground` mounds with `ink` rims;
  `markedDoor` a `crisis.mark` cross over the door's entrance tick; `barricade` a 1.5 px `ink` zig-zag across the way;
  `stakes` a row of 1 px `ink` ticks at 45°; `watchFire` a `fire` on a 2 m `crisis.ash` disc; `shutter` a 1.5 px `ink`
  bar across a frontage; `bareField` the field's own texture at 40 % of its contrast over `field` lerped 40 % toward
  `crisis.ash`; `emptyPen` the pen's outline with no stock; `ruinTone` the district's faces under a `crisis.ash` wash at
  α 0.35 with 1-px `ink` rubble dots where `RH32('crisis.place', key, salt, cell)` ÷ 2³² < 0.15.
* **Placement, scale and the land** are §10.2's: keyed, by severity and rung — a hamlet's war band, a city's full siege
  line — or by the dossier's headcounts at `areaPerHeadM2` (two armies twice the ground; engines one per
  `enginesPerBesiegers`), several looks sharing the outskirts by `priority` under `densityCap`, never on water, a way's
  carriageway, a gate's passage or a label's keep-out. A disaster's buildings draw item 123's damage layer at its row's
  `lookLevel` by severity, or at their own decay level where that is higher (§8.6; item 122 (d)), and their districts the
  `ruinTone` at the city band; the look ends in the week its `reconstruction` Works begins (V06).
* **Read without colour; never over a label** (item 122 (d); item 112). Each look is told by its glyph shapes — an army
  by its banner's glyph (plain, cross, chevron, saltire, cycling by its index in the coalition) beside its colour, a
  marked door by its cross, the ruined tone by its rubble —; the parts draw in slot 19b, under slot 23's labels and
  their halos (§9.4), famine's bare fields in slot 15b over the fields' crop stage. The legend lists each look standing
  with its condition and weeks (§9.5), which V09's Show crises controls and Find's list of looks read.
* **The layer.** `live.crises` runs in the generation worker over the model (the places of §10.2 (d), V01's `campLand`
  and `disasterDistricts`, V06's `frontierFor`, the walls and gates), the view state (`week`, `crises`, the key) and
  DR44's standing looks; it delivers marks of semantics `crisis.<part>` for the visible region dilated by one tile,
  re-run when the week crosses a condition's edge, the crisis display or the key changes, the model changes or the view
  moves — so looks are made lazily, tile by tile (§12.5) — and, a `base` layer, joins the tile key (§8.8). Its rows carry
  the `extension` marker (§8.4 (h)): the parity presets draw no crisis look. Show crises and the preview land at M3b
  (§16).

**Find (g item 120; J133): a view, never a change.** While §2.9's per-viewer key `find` holds a chip, or Show gaps is
on, the overlay provider `live.find` (V09's) delivers the marks below for the visible region dilated by one tile, over
each chip's matches as §11.2's gazetteer match listing gives them at the view's effective key — §9.2's admission, so a
thing the key withholds is never suggested, counted, drawn or hinted at (no glow, pin, ghost pin, gap or legend chip of
it; T120-3) — re-run at every commit, regenerate, undo, redo, advance, load and migration, whenever the key,
band, layer or year position changes, and when the view moves (item 120 (f)). An `overlay` layer, it is composed with the
labels (§8.8) — at the device's pixel ratio — and never re-renders a base tile; with no chip and Show gaps off it
delivers nothing, the tiles byte-identical (`item120.find`; T120-1). It draws over whichever Show view is on, and under
every style preset (§8.4 (h)).
* **The veil** (item 120 (e)). `paper` at α 0.55 (our default) over the view, cut out at each match's shapes — a
  building's footprint, a plot's or place's face, a way's body, an area's faces — so the matches show undimmed
  while everything else reads slightly opaque; on the underground layer it lies over the band's rock, voids and the
  cut-away's ghost alike (V04 §5.1).
* **The halo.** Round each match's shapes, a 2 CSS-px outline in its chip's colour in its chip's dash pattern, and
  outside it a soft glow in that colour fading from α 0.6 to 0 over 8 CSS px; the match's placed label glyphs (§9.2, at
  the stop) are drawn again over the veil. At the interior band the rooms a matched institution uses glow on the storey
  shown (V03 §5.5's `findRooms`).
* **An area chip** — a district, neighbourhood, quarter or region (V01 §5.4's `FindArea`), an island (V05 §5.6), a
  village's end (V07 §5.5) — lifts its whole area from the veil and draws the halo along its boundary; a hole in it
  stays under the veil.
* **Pins and count bubbles** (the city band). A match whose drawn extent at the stop is under 6 CSS px — or an area
  whose shape is — also carries a **pin** at its anchor (a building's footprint pole of inaccessibility, an area's
  `FindArea.anchor`): a 14 CSS-px teardrop in its chip's colour with an `ink` rim and its chip's glyph in `paper`. Pins
  whose anchors lie closer than 24 CSS px merge, greedily in address order, into a **count bubble** — a 20 CSS-px `ink`
  disc holding the count in `paper` —, only among pins of one layer and, on Sky, of one island (V05 §5.6 (2)); a click on a
  bubble zooms to the stop at which its pins part. So no match is a lost speck, at item 116's limit or at the METROPOLIS
  cap (T120-5).
* **Ghost pins** (item 120 (f)). A match on a layer not shown is its pin at α 0.35, with no halo, at the anchor where
  its marks are drawn (an island's displaced under `offset`, V05 §5.6 (3)); a match Below that holds no element in the
  band shown — from Ground, from Sky, or on Below itself — carries beside its glyph its shallowest band's depth range as
  the band ladder writes it, kept above the veil (V04 §5.1 (2)–(3)).
* **Show gaps' outline** (item 120 (i)). With `gaps` on, each of V01 §5.4 (3)'s gap units for each kind chip, on the
  layer shown, is outlined dashed in its chip's colour (1.5 CSS px, 4 on and 3 off) and labelled "none here" once per
  component — overlay text at the component's pole of inaccessibility, composed after the labels from the glyph atlas at
  the point labels' floor (6 px cap, §9.4), and left out at a stop where its box meets a placed label's (it is view data, never a
  `LabelEntity`, §9.1) — while a unit holding a match lies lifted with its matches.
* **Each chip's colour and second cue** (item 120 (d); g item 112). Chip k, its index in `chips` from 1, draws in
  `find.((k − 1) mod 8 + 1)`; its second cue is its **glyph** on its pins — circle, square, triangle, diamond, star,
  cross, hexagon, bar, cycling by k, so two chips that share a colour past eight differ in glyph — and its **dash
  pattern** on its halo's outline — solid, long dash, short dash, dash-dot, dot, dash-dot-dot, long-short, double, by
  ((k − 1) mod 8) — so a chip never rests on hue alone; the legend and V09's panel show both beside the colour (§9.5).
* **Layer and budget.** The marks' semantics `find.veil`, `find.halo`, `find.pin`, `find.bubble`, `find.ghost` and
  `find.gap` draw in slot 25, the veil first and the gaps last; never in a base raster, a light pass or a digest; the
  interaction budget §12.5's (suggestions ≈ 50 ms of a key, a chip's glow ≈ 100 ms of the click, the index rebuilt
  once per commit). Find lands at M5 (§16).

**Weather effects (g item 124; J137): drawn over the map, never in it.** The spell in force (§2.9's *Weather effects*:
its kind from V11's climate weather columns for the climate row at the view's week, its strength s by its phase) is
drawn by §8.8's effects layer every frame, light in density and opacity, in each family's own hand — its marks here, its
light terms §8.4 (i). Positions, lengths and sways come from the spell's own draws on §6.1's `view.weather` stream
(keyed by the spell index and the frame's world-aligned cell), so a spell replays from its session seed and clock
(T124-9):

  | kind | `ink`, `hatched` and the ink-family variants | `lit` | densest, per 10 000 CSS px² |
  |---|---|---|---|
  | `rain` | fine `ink` strokes 8–12 CSS px long, 1 px, at α 0.3, slanted by the wind ≤ 20° from the vertical, falling 600 CSS px a second | soft translucent streaks of `paper`, 10–16 px, at α 0.25 | 5 |
  | `drizzle` | as rain, 4–6 px, α 0.2 | as rain, 6–10 px, α 0.18 | 8 |
  | `snow` | `ink` dots of 1.5 px at α 0.3, drifting down at 40 CSS px a second with a sideways sway | `snow` dots of 2 px with a 1-px soft edge at α 0.7 | 4 |
  | `mist` | 1-px `ink` stipple at α 0.12 drifting slowly, beside its light term | a translucent `fog` band at α 0.15, beside its light term | — |
  | `fog`, `dust`, `cloudShadow`, `shimmer` | their light terms (§8.4 (i)); `dust` adds `sand` motes of 1 px at α 0.15 | the same | `dust` 1 |
  | `leaves` | 2-px dots in the leaf colours V11's `season.leaf` row weights for the climate row, tumbling with the wind | the same at 3 px | 0.5 |

  The densities are s × the column's figure. During rain each water cell of §8.8's water mask may draw a **ripple** —
  a 1-px ring in `ink` (`lit`: `paper`) at α 0.2 growing from 0 to 6 CSS px over 0.6 s — at most 2 per 10 000 CSS px² of
  water.
* **The hard rules** (item 124 (c)). On an `arid` row and on any row whose winter does not freeze, no snow
  falls — a `snow` spell there draws nothing, and V11's compile check makes none — and none lies (*Snow and the sun*,
  above); rain in arid country comes only as V11's row allows it (T124-3, T124-4).
* **Never in the way** (item 124 (e)). The layer lies above the tiles and below the labels, the chrome and every overlay
  (§8.8; T124-6); no lightning or flash (§8.4 (i)); its rows carry the `extension` marker, so the parity presets draw
  none (§8.4 (h)); it is off with V09's switch (`AppPrefs.weatherEffects`: off by default on the low tier and under
  reduced motion; T124-5) and the first thing Auto gives up (§8.4 (g)); no export draws it (§11.1). It lands at M3b
  (§16).

**Thematic layers.** FTG D7's matchers are override rows (`ThematicRow`) keyed by entity attributes (`prosperity`, `use`,
`epoch`, `owner`, `material`) — data, not code; the tile worker applies them over a mark's programs from its `attrs`
columns, and §9.5's legend reads their `legend` and `cue` cells. A row keyed by `use` or `owner` draws unthemed a mark
whose `knownTo` column (§8.1) §9.2's admission function does not admit at the band, and a theme's legend key lists only
the values drawn, so no theme colour and no legend key names a withheld purpose; while such a row is active the
knowledge key joins the tile key (§8.8) (J-A30.85). A front's building themes as its front; its concealed use (item 63;
§9.2) has no theme colour and no legend key for a key that does not admit it. **Character themes (item 72; J-A72.81):**
override rows keyed by a district's `identity`, by the share of a power (`CircumstanceSlice.powers`, §7.7) or of a
sector among its significance-weighted plots, and by its band range (§4.5), like FTG D7's matchers. **Conditions
(item 88; staged):** a `ConditionOverlay` (§2.7) draws as a settlement-wide thematic row — a `wash` plus a legend row,
keyed by its archetype and severity, no geometry — the rows schema-complete and empty in the base until the port fills
the records; the shipped rows `condition.siege`,
`condition.quarantine` and `condition.occupation`, the view `supplyChains` (a chain drawn only when §9.2's function admits
every joined node) and the `states` row `worked-out` are V08 §5.2's, in every shipped family (SettlementForge stage; file f
item 410). **Oases (g item 111):** a spring-fed water body draws as water with a `symbol('spring')` at its spring point;
its grove is the `Greenery` of kind `grove`, drawn by the `instances` program with the climate row's species; its gardens
are `LandUse` faces of kind `garden`; a `water` hairline channel is drawn from the water body to each garden its `fedBy`
names, derived at render, never stored — existing roles and programs, one new point symbol (§8.3's catalogue).

**Colour-deficiency safety (g item 112; J122).** Every family and thematic view that encodes a meaning in colour carries a
second cue, so no meaning rests on hue alone:

| colour-coded meaning | second cue |
|---|---|
| district tints (`tint`) | the district's name label (§9.4) and, at a tint change, the district boundary's line style |
| prosperity (`lit`'s roof-by-band rows; the prosperity theme) | a hatch density by band — none for the richest band, one step denser per band down |
| ownership (`owner`-keyed rows) | a pattern per owner category (dots, stripes, crosshatch, grid, wave, cycling in legend order) |
| knowledge (the admitted tiers of a thematic or game-master view) | the outline's line style: `local` dashed, `secret` dotted |
| the underground's systems (§8.2's gallery, chamber and link rows) | the system's program glyph (niche ticks, rock stipple, pillar squares, masonry double lines, vault hatch) |
| water classes (`waterKind`) | the shore program's line style and the water body's label |
| the procession route's colour (g item 118) | its chevrons; every other decoration its glyph shape |
| a Find chip's colour (g item 120) | its glyph on its pins and its dash pattern on its halo's outline (*Find* above) |
| a crisis look's colours (g item 122) | an army's banner glyph; a marked door's cross; the ruined tone's rubble stipple (*Crisis looks* above) |
| a wall run's condition (g item 114) | its line style: the solid band, the notched band, a patch look's pattern on a narrower strip, the gap with its rubble spill, the dashed trace (the wall rows below) |
| ground classes (land-use kinds) | the land-use `pattern` texture in textured families, a glyph stipple per kind in `ink` |

The cues are drawn at the legend-bearing zoom stops (those at which §9.5's legend shows the meaning) and in every
thematic view; elsewhere the default sheets keep their look. Each such sheet ships a checked variant per common
deficiency — `StyleSheet.variants` for `protan`, `deutan` and `tritan`: role substitutions the loader lays over the
palette — selected by the per-viewer view key `cvdVariant` (§2.9's key: absent, V09's machine default `AppPrefs.cvdDefault`;
V09 §4.21.2), which joins the tile
key (§8.8). A missing variant draws the sheet's palette with its cues and is reported by the loader. **The style check**
measures every variant: under each of `protan`, `deutan` and `tritan` it simulates the swatches of every pair of
categories a legend distinguishes (Machado, Oliveira and Fernandes 2009 at severity 1.0, applied in linear sRGB — our own
code from the published matrices) and passes when their CIEDE2000 is at least **`cvdContrastMin`** — the
deficiency-contrast threshold, one cell of V11's `palette` table for every sheet: ΔE2000 10 (our own; calibratable at
M3b, V12's register line). §13.2's T112-1 reads it; item 114's greyscale bar (J-V12.91) compares the pairs' CIE L*
greys against the same cell (the wall states below). §9.5's legend shows each category's cue.

**Decline, condition and layer states (items 8, 11, 31; II.6, II.7; J-A8.81).** `StyleSheet.states` is a rule table
keyed by kind × state, read after an entity's programs are resolved: a `replace` row draws its programs instead of the
entity's at the row's bands, an `override` row lays its changes over them. The shipped rows, one set per family (`ink`
shown; `lit` and `hatched` keep the same geometry and glyphs with their own tones):

| kind | state (§2.8's value unless noted) | bands | row |
|---|---|---|---|
| building | `abandoned` (vacant) | all | override: roof tone lerped 30 % toward `ground`, no raised under-copy |
| building | `decayed` (derelict, roofless: `RoofSpec.kind 'none'`, §2.6) | all | override: no roof construction, the outline dashed by the entity-keyed pattern, fill at 60 % alpha |
| building | `ruined` | all | replace: the `ruin` program, with the `none` roof kind |
| building | `cleared` (a footprint trace) | district and finer | replace: `trace('footprint')` — a broken hairline, no fill; no mass at the city band |
| building | `reused` (a trace worked as the kind `Building.reusedAs` names — garden, orchard or field, §2.6; J-A8.22) | all | replace: the trace's face filled as that kind — `garden` (`ground` at the city band, a yard there), an orchard's `grid` instances, `field` — with `trace('footprint')` over it at the district band and finer; no mass; a successor raised on the old foundations is a building of its own (`Building.predecessor`) and takes its class's programs |
| building | `condition` `worn` / `neglected` (§2.6; item 31) | district and finer | override: `weathering` amplitude × 2 / × 4 and, at the neighbourhood band and finer, a roof `pattern` variant with patched courses — texture and colour only (item 19); no change at the city band |
| wall, gate | `abandoned` (neglected) | all | override: the wall stroke's casing dropped, its tone 20 % toward `ground` |
| wall, gate | `decayed` (a run of `Enceinte.condition` not `standing`, §2.7) | all | override: nothing on the enceinte as a whole — each run draws by its row below; a gate on a `breached` or `dismantled` run draws its blocks as that run's towers draw |
| wall | a run `worn` (`Enceinte.condition`, §2.7; file f item 575, g item 114) | district and finer | override the run: its stroke in `wall.worn`, its outer edge notched — a notch ⌈w ÷ 2⌉ px deep and 1 px long every 3 px of run from its first vertex, w the drawn wall width (the broken crenellations); its towers unchanged; at the city band the run draws as `standing`; legend `legend.wall.worn` |
| wall | a run `patched` | all | replace the run: `wallPatch(look)` — a strip 0.6 × w wide (minPx 1) centred on the trace in the look's role and line pattern (the patch looks below), the look the `look` of the V11 `walls.patchMaterials` row the run's `conditionMaterial` names (§2.7) — a material no row names (a pack withdrew it) takes the look of its wall kind's first row there and is reported; its towers stand; legend `legend.wall.patched`, one entry per look drawn, naming its row's `label` |
| wall | a run `breached` | all | replace the run: no wall stroke — a clear break — with a bar across the trace in `wall`, 1 px by w, at each end of the gap, and the **rubble spill**: 1-px dots in `ink` over the run's band and one band width outward, a pixel drawn where `RH32('wall.rubble', key, salt, cell)` ÷ 2³² < 0.40, `cell` the pixel's world-aligned cell at the stop (seamless across tiles); its towers stand; legend `legend.wall.breached` |
| wall | a run `dismantled` | all | replace the run: no wall stroke; a 1-px `ink` hairline along the trace, 2 px on and 2 px off from the run's first vertex; its towers as trace discs (`trace('ring')` on each tower's footprint); legend `legend.wall.dismantled` |
| wall | `superseded` (`Enceinte.supersededBy` set, §2.7) | all | replace: `trace('ring')` — the old line as a hairline lighter than a wall, under the new ring's stroke |
| tunnel (II.7) | `abandoned` (silted) / `decayed` (caved in) / `ruined` (`Tunnel.closure` collapsed or sealed) | the underground layer | override: the band dashed / the band broken at the caved stretch with rubble stipple / the band as `trace('centreline')` with a closure glyph at each sealed end |
| island (II.6) | `floating` / `waning` / `settled` (`SkyIsland.state`, §2.7) | the sky layer | override: none / the layer's alpha × 0.8 / × 0.6 — under `ghost` occlusion the island drawn at (1 − `ghostAlpha`) × that factor, the covered ground showing through at the rest (no separate raise) (§8.4); the shadow follows `elevationCm` by itself |
| island | `fallen` | the ground layer (the `fallen_island` decoration's members, V05 §3.16) | replace: the `ruin` program's rubble stipple over the members' faces and bands (M6-sky; file f item 408) |
| island | `removed` | the sky layer | replace: nothing drawn, no label, no shadow (V05 §4.2) |
| skyAccess | its states (V05 §5.1) | the sky and ground layers | V05 §5.1's rows (M6-sky; file f item 415) |
| retaining (item 110 (a)) | per run of `RetainingWall.state` (§2.7): `standing` / `decayed` / `ruined` | all | override: none / a bulged, broken stretch (the double line wavered, ticks broken) / replace: the bank alone (the low side's ticks as a hachure, no wall line) |
| raised (item 110 (b)) | in use / `abandoned` (neglected: no traffic, weathered; an aqueduct run dry) / a span `ruined` (fallen) / supports alone | all | override: none / the deck's casing dropped, its tone 20 % toward `ground` / replace the span: rubble stipple at the span's foot, the arch gone, the supports standing; a vault under a fallen span not drawn (collapsed) / the piers alone as filled footprints |
| deck (item 110 (d)) | its host's existence (file f item 246): `decayed` / `ruined` | all | override: a charred timber deck (the deck in `ground` lerped 40 % toward ink) / replace: the carriageway broken (dashed), the piers or the mole standing; the buildings on its deck plots by their own ruined rows until tombstoned |
| landUse (a deposit) | `worked-out` (V08 §5.2) | district and finer | as V08 §5.2 states (SettlementForge stage) |
| passage | `sealed` (`Passage.sealed`, §2.5; item 30) | district, neighbourhood | override: the arch glyph at each end drawn closed (a bar across the arch); the plots behind it take their buildings' own rows (vacant, §4.11) |
| building | Works `staked` (item 67; §4.11) | all | replace: `stake`; no mass at the city band, the stage glyph (§8.5) on the dashed footprint |
| building | Works `groundBroken` | all | replace: `pit` over the footprint; the stage glyph at the city band |
| building | Works `foundations` | district and finer | replace: the footprint's walls as low wall bands (outline weight × 2) or a sill frame, no roof; the city band a mass at 40 % alpha with the stage glyph |
| building | Works `wallsRising` | all | override: no roof construction, the interior floor in `ground`, `scaffold` round the walls; the heights of `heightsAt` (§4.11), so shadows grow storey by storey |
| building | Works `roofFramed` / `roofed` | all | override: `frame` without fill and `scaffold` / the roof drawn with `scaffold` still up; a work yard in `ground` |
| building | Works `emptied` / `stripped` / `rooflessShell` / `rubble` (a demolition) | all | override: openings as gaps / `frame` over bare rafters / the `decayed` row with rubble stipple inside / the `ruin` program as wall stubs with rubble heaps; `cleared` is the existing row |
| building | Works `decaying` (on the way to `decayed`) | all | override: the roof with gaps along its ridge, the outline dashed at 30 % |
| building | Works `roofless` / `collapsed` / `overgrown` (a decay Works' ruin stages, item 67 (f); §4.11's *Works* (4)) | all | as the `decayed` row / as the `ruined` row / replace: the footprint as a grassy mound — a `green` stipple fill, `trace('footprint')` over it at the district band and finer — with no mass |
| building | a `repair` Works at any stage of the decay ladder — `abandoned`, `decaying`, `roofless`, `collapsed`, `overgrown` (`worksKind: 'repair'`; §4.11's *Works* (4): the decay stages backwards under a scaffold; item 67) | all | override, laid over the row the stage resolves: `scaffold` round the walls and a work yard in `ground`; the city band's stage glyph (§8.5) |
| building | `charred` (a fire, item 67) | all | replace: `charred` — the blackened roofless shell, until a clearance or repair Works starts |
| building | Works `refit` (a conversion without a geometry step) | district and finer | override: `scaffold` along the frontage |
| plotLine | `pendingRemoval` / `staked` (item 67 (g); §4.11's Works lines) | district and finer | replace: the old boundary treatment dashed / the new line as stakes, dashed, until its fence or wall stands |
| access | `open` / `locked` / `bricked` (`AccessPoint.state`, II.7.4; item 64) / collapsed (its derived reading while its element is closed, II.6) | the ground layer where it breaks the surface, and the underground layer | override: the kind's `symbol` / with a bar / filled solid in `wall` / as a trace with rubble stipple; a secret one drawn only for a key that admits it (§9.2) |
| gallery | its system's kind — `catacomb`, `cavern`, `quarry`, `vaults`, `buried` (a buried old town's street), `dug` — or an undercity walkway (II.7.5, II.7.6; item 65), with the closure states of II.6's table | the underground layer | replace: `ossuary`, `cavern`, `quarry`, the `vault` hatch, the old street as a lane's body in `ground` with its buried shells as `trace` outlines, a dug passage as a `passage` tunnel, a walkway as a lane's body in `ground`; its closure states as the tunnel row above, `flooded` in `water` |
| chamber | its `Chamber.kind` (V04's `ChamberKind`; II.7.6, II.7.5) | the underground layer | replace: `chamber` with the kind's fill — `ossuary` niche ticks densening with its complex's `fill`, `workings` the quarry pillars, `cistern` in `water`, `streetVault` and `bridgeVault` the `vault` hatch, `archVault` the `vault` hatch (its floor at grade, its door a daylight opening; V04 §5.2), `market` as the undercity's plaza (the ring walkway and stalls; V04 §5.2), `storey` and `square` as buried-town floors, `cellar` and `storage` as `dug`, the ruin's kinds by `ruinMasonry`; a flooded chamber in `water`; a collapsed one as a trace with rubble stipple; an unexcavated one by `unexcavated` (M6-U; file f item 407) |
| link | `UndergroundLink.kind` — `open` / `gated` / `secret` / `collapsed` / `flooded` (II.7.6; item 65) | the underground layer | replace: a hairline pair / with a gate bar / dashed and drawn only for a key that admits it / broken with rubble stipple / in `water` |

**The patch looks and reading the wall without colour (g item 114 (e); item 112).** `wallPatch` draws its strip by the
look's pattern, along the run from its first vertex: `patch.timber` planks — the strip solid, a 1-px joint every 4 px;
`patch.wattle` a weave — diagonal bands 2 px wide every 4 px; `patch.earth` a bank — the strip solid, its outer edge
dotted (every second pixel); `patch.drystone` stones — blocks one strip-height long with a 1-px gap between; `patch.stakes`
posts — a 1-px post every 3 px; `patch.brush` a broken fill — 2-px runs with one run in three left out, the gap stepping
one pixel per row. The five states therefore differ in line style first — the solid band, the notched band, a patch's
pattern on a narrower strip, the gap with its rubble, the dashed trace — and that is their second cue. **The greyscale
bar** (J-V12.91; V12's `T114g.greyscale`): one run rendered in each of two states at the band is compared with itself
pixel by pixel on CIE L* alone, and the mean grey ΔE2000 over the pixels where either render draws a mark must reach
`cvdContrastMin`, for every pair of different states at every band where both draw (the patch looks among themselves are
one state, told apart by pattern); on the shipped values the least is 11.1 (`lit`, `standing` against `worn` at a 12-px
wall), over every drawn width from 2 to 12 px (`docs/validation/bench/coh_repair_rendering_r1_looks.out` (A)). **A short
run:** a run whose drawn length at the stop is under 2 px (the minimum feature) is drawn 2 px long, centred on its middle,
over its neighbours' strokes, so no condition vanishes at a coarse stop. The standing wall keeps its symbol-key entry;
each other state's entry shows while a run in it is on the map (§9.5).
A Works stage named like a ladder state — the decay Works' `abandoned` and the demolition's `cleared` — takes that
state's row above; `before` draws the target's prior state and `finished` its own programs, the two stages §8.3's census
exempts as undeclined (item 67 (f)). A row naming a `worksKind` is the one exception to one row per (kind, state): it
matches only a target whose running Works is of that kind and is laid over the row its stage resolves without it
(J-A67.83), so a repair draws the decay stages backwards under its scaffold. No reference draws a declined, worn or
hidden state, a building in progress or an underground (item 23): the rows are ours and act only on an entity carrying
the state or a running Works, so a town that never passes an epoch, a scheduled edit or a hand conversion renders as the
references' would.
`builtBand` and the geometry floor (§4.11) are read by no render rule: condition follows `Building.condition`, and
labels and descriptions follow the prosperity field (J-P1).

**Layer order** (data; `ink` shown; one list for the city and district bands). MFCG's recorded order (water → road casing
→ road body → river → landmarks → wards → piers → fields → walls → towers → grid → scale bar → compass → labels → title) is
a subsequence (order parity, §8.3); NG 1.2.2's (greens → roads → shadows → buildings → props → large-tree pins under buildings,
block trees above them → title; item 58 (d)) is a subsequence of the `hatched` sheet's slots.

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
| 8b | open leads (`water.lead`) and boats (§8.10; g item 117) | new: on the water or hauled up on its bank |
| 9 | greens, parks, yard parts by role | new: the plot model |
| 9b | retaining walls (`retaining`; item 110 (a)) | new: over the ground they hold, under the shadows |
| 10 | projected shadows — the vector rung only (§8.4; `derived: 'shadow'` over the casters) | new: after roads, before buildings (NG) |
| 11 | raised under-copy (`derived: 'raised'` over footprints and masses) | part of MFCG's building draw |
| 12 | landmark footprints (solid ink); raised-way piers (in `wall`) | MFCG: landmarks |
| 13 | building masses / footprints / roof detail — each building's wings in stack order (`BaseWing.on`, §8.6), a tier over the tier below | MFCG: wards |
| 13b | leaf cover and creepers (g item 117) | new: on ground, streets, greens and roofs, under the crowns |
| 14 | piers and bridges; raised decks (`raisedWay`), on the vector rung their shadows drawn in a derived pass just before this slot over everything below, roofs included | MFCG: piers; a deck may stand above the roofs beside it |
| 15 | fields and hinterland land use | MFCG: fields |
| 15b | famine's bare fields (`live.crises`' `crisis.bareField`; g item 122) | new: over the fields' crop stage, under the trees |
| 16 | trees: wood fills and crowns | MFCG's tree slot: after fields, before walls; woods may cover track casings (K16) |
| 17 | boundary treatments (district band) | new: over yards, under curtain walls |
| 18 | curtain walls | MFCG: walls, after buildings |
| 19 | towers and gate blocks | MFCG: towers |
| 19b | festival decorations and crisis looks (`live.festival`, `live.crises`; g items 118, 122) | new: over everything built, under the grid, labels and furniture |
| 20 | grid | MFCG: grid |
| 21 | scale bar | MFCG: scale bar |
| 22 | compass | MFCG: compass |
| 23 | labels (glyphs composed onto each tile, §8.8) | MFCG: labels |
| 24 | title, legend, emblem | MFCG: title |
| 25 | live layers (Find's marks, `live.find`, among them), annotations, measure overlay | new: view data on top |

A bridge or pier (slot 14) is cased along its sides only — its ends are open where it meets its way — so no later casing
crosses an earlier body. Slots 1–20 are the base raster; slot 23 and slot 25's world-space live marks and annotations are
composed onto each tile by the tile worker (§8.8); slots 21, 22, 24 and the measure overlay are screen-space furniture
drawn by the main thread over the composed tiles (§9.5). **The light pass** (§8.4; item 68) runs over slots 1–20 and
before slot 21: labels, live overlays and furniture are never lit. §8.3's census checks every tile's draw calls against
this table.

**Slot resolution.** When a sheet is loaded (built-in, user-edited, random, host-supplied) the loader takes, per band,
every (semantic, pass) pair the entity registry says S14 emits at that band and the sheet paints, and resolves it against
the band's entries without `derived`: candidates are the entries whose pattern matches the semantic (equal, or a prefix
`x.*` with the semantic under `x.`) and whose `passes` include the pass or are absent; the winner is the most specific —
an exact semantic before any prefix, a longer prefix before a shorter. The sheet is **refused** when a pair has no
candidate, when two candidates tie at the highest specificity, or when one `derived` kind is placed in two slots of a
band. The result is §8.1 item 3's table, cached per style version. Shipped sheets: `{ slot: 5, semantic: 'way.*',
passes: [1] }` and `{ slot: 6, semantic: 'way.*', passes: [2] }` for way casings and bodies; exact pier, bridge-deck and
raised-deck entries in slot 14 outranking the prefix, and `way.stair` in slot 6's pass 3; one entry with no `passes` for a
river's casing and body in slot 7; the sky's entries in every shipped sheet — the presets table's `ink`, `lit`,
`hatched`, the ink-family variants `parchment`, `bw-print` and `night`, `painterly` once volume 7 ships it (V07 §8's
V-M1), and the parity presets — `sky.island.land` slot 3, `sky.island.underside` slot 2, `sky.island.rim` and `sky.mist`
slot 8, `sky.island.shadow` slot 10, `sky.island.tether` slot 17, `sky.fall` and `sky.access.*` slot 19,
`sky.island.shadeStrip` and `sky.island.shadePending` slot 25, each with the per-family facts of V05 §5.1's slot table
(M6-sky; file f item 408); and the underground's `under.*` entries in every shipped sheet, drawn in the underground
layer's own order (V04 §5.2) with V04 §5.2's per-family facts (M6-U). A CI test
loads every shipped sheet at every band (§8.3). A refused user edit is shown in the style dialog with each unresolved or
ambiguous pair and not applied; a `setStyle` event carrying a refused sheet fails its dry run with the conflict action
`invalid` (§7.1), so no document holds a sheet two loaders could order differently (J-R39).

**Presets — each family defines all four bands with invariant roles (VIS-9).** Detail is added band by band, never
re-coloured, and cross-fades over the band's hysteresis interval (α 0 → 1, §8.5). **Role continuity:** B-ZOOM checks mean
roof and mean ground colour ΔE2000 < 2 across every band switch within a family, from the milestone that ships the
family's four bands: `ink` and `lit` at M2b, the ink-family variants at M3b, `hatched` at M5 (§13.4, §16; N-23).

| family | city | district | neighbourhood | building (stage-3 hook) |
|---|---|---|---|---|
| **`ink`** (default; MFCG family) | figure-ground contract (§8.5), masses, symbolised walls / towers / gates, raised under-copy on (K06), the lighting model's cast shadows on in value only (§8.4; J-A68.81), casings `w + 2h` with round joins and caps, hairline furrows, quarter and district labels in letter-spaced small caps, grid, scale bar with old-style figures, 8-ray compass | footprints with thin outlines, yards by role, boundary treatments, every way stroked, way names, library crowns | ink close-up: ridge hairlines by the roof construction (`skeletonHip` by default), tapered ticks in ink at α 0.5 on the roof colour, cast shadows by the light pass (prism shadows at ink α 0.25 on the vector rung), cobbles as ink stipple, pins as ink symbols, every named way labelled | wings as ink outlines; the plan rung's storey (§8.5): walls by kind as hairlines (exterior at the outline weight, partitions at ½), openings as gaps with a door tick, windows as wall breaks, the stair core's flights, chimney squares, abstract furniture at ink α 0.5, room labels |
| **`lit`** (FTG family; second preset) | tinted pattern textures at city scale, flat roof tones, raised under-copy with a 2-px penumbra, filled corridors in `road` over `ground` | + `faceLight` on roofs, soft cast shadows (§8.4), hedgerow instances along field bounds, stone-patterned wall band with tower nodes, harbour basin tone with pontoon bars, water `ramp` and `foam` | + pre-shaded crowns per instance, depth-sorted trees, props | wings with per-face light; the plan as `ink`'s, the storey's floor in the roof's lit tone |
| **`hatched`** (NG family; the stage-2 close-up) | masses in the lit roof tone, ground = paper, the street stripe in `road`, wood fills | two-tone roofs by `fakeGablePerWing`; by `roofscape` once stage 3 registers (V02 §5.3) | hatching per roof facet of the sheet's roof construction at a world pitch (`StyleSheet.hatch`), each sloped facet's lines parallel to its eave and clipped to the facet (a gable or hip wing's parallel to its ridge), with two ridge tapers per ridge-bearing wing (15–20 triangles per gable or hip wing), one prism shadow pass, lobed crowns in two greens, large-tree pins under the buildings and block trees above them (item 58 (d)), chimneys, pin and ground-access symbols, road surfaces and modes, stepped ticks; its neighbourhood and building bands take V01 §5.1's order list (the `pins` and `trees` layers named; slot 8b retaining walls, the piers in slot 11, raised decks in slot 14 with their shadow pass before it, slot 12's stack order with tier shadows) (M5; file f item 405) | per-wing hatching; the plan as `ink`'s |
| `parchment`, `bw-print`, `night` | ink-family variants: parchment texture role, its plate chroma aimed at the median (above); monochrome; `night` — the `ink` family whose sheet opens the view at night (`LightingSpec.defaultLight`, §8.4 (e)), its `@night` roles and `glow` sprites on the vector rung | same | same | same |
| `painterly` (reserved; VG family for the village product) | colour ramps, water bands, relief tier on, spotlight vignette, selective outlining | same | same | same |

Faces follow §17.2 (the default label face, D-1); small caps and old-style figures come by §9.2's per-face path (N-12).

**Light by family (item 68; the model is §8.4's).** `ink` and `lit` are lit by the field model with the cursor sun by
default and cast shadows on (J-A68.81; J-C1): `ink` in value only (`mono`) and gently (ambient 1.3, so a day shadow on
open ground keeps roughly two thirds of its lit value under the fixed sun's 45° — the ink family's shadow alpha 0.35),
`lit` in colour (ambient 0.85); `hatched` by its own vector prism pass (`LightingSpec.model 'vector'`, §8.4 (g); the
look of NG 1.2.2, §8.4 (h)) with its night glow; each family's night is its day albedo under the night's light (its
`@night` roles on the vector rung). The `MFCG` preset draws no cast shadow and no light; the `FTG` preset draws FTG's
sun, moon, weather rule and entrance window lights (§8.4 (h)).

**`lit` on the reference backend (VIS-7).** Every `lit` program — every mark of every family — runs on Canvas2D, the
lighting a post operation over the Canvas2D base, never a second drawing path (§8.4; J-R4, J-A68.82). Textures are
`pattern` fills of greyscale seamless tiles tinted by the role colour (multiply), which rungs 1–2 light as *Paint
programs* states; on the vector rung lighting is `faceLight` per face from stored geometry, one directional light from
the sheet's sun (with a `path` sun, its light step, §8.4), and soft shadows are `shadowPass` polygons with `penumbraPx`
— the shadow polygon plus two outward offset rings at ½ and 1 penumbra with α ⅔ and ⅓, vector, no bitmap filter
(avoiding Fantasy Manor's ≈ 90 % bitmap-shadow cost); canopy shading is baked into the crown sprites per (style, light
step) (§8.10); water depth ramp and foam are `ramp` and `foam` over the shore-distance field, per tile (≈ 1.3 ms per 512²
tile). Relief lighting across roofs and walls comes from the light pass and the surface layer's normals, with no
normal-map texture; on the vector rung the style dialog says the light is per face (J-R4). **Texture set** (our own, procedural: generated by
`plat/tools/textures/` in the product repository (§17.1 (3)) with fixed seeds; every file in `plat/assets/textures/`
names that script and its seed (§17.1 (5)); no third-party texture): tilled soil, grain, pasture, meadow, orchard
ground, marsh, sand, pebble, rock / cliff, paving stone, clay tile, thatch / shingle, wall stone, water ripple, parchment
— 15 greyscale 256 × 256 px toroidal tiles (≈ 1 MB raw, ≈ 0.6 MB as PNG), metres per tile per band in the sheet; crop and
livestock variants of the arable and pasture tiles chosen by `LandUse.crop` and `LandUse.livestock` when present (VS27),
by the land-use kind otherwise; authored in M2b (≈ 1 person-week).

**Style constraints.** The contrast matrix; the option-interaction matrix test (no option silently disables another —
MFCG's Block mode dropping trees); every preset survives a render with no fills and one with no outlines (R13).
=== END ===

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
  islands exist is the model setting `recipe.layers.islands`, II.6). The per-viewer view key
  `showUnexcavated` (§2.9) draws unexcavated voids for a key that admits them (file f item 413; the `unexcavated`
  program, §8.2). The `underground`
  layer is hidden by default at every rung; when shown, the cut-away or overlay draws one **depth band** at a time
  (`depthBandCm`, II.7.3): the per-viewer view key `depthBand` (§2.9) names it, default the shallowest band holding a
  tunnel with frontage plots, else the shallowest tunnel; every underground entity's `elevationCm` is its depth below the
  datum (§2.1, II.7.3), and a tunnel, cell or vault is drawn — and exported, §11.1 — on its own level, the band that holds its
  floor, `z` ordering the bands across the underground layer's parts (§2.1's `PlatKey`, one arena each in §3.4). The `sky` layer's `visible` shows the islands a
  settlement has; a waning or settled island keeps its lowered `elevationCm` (II.6), so its shadow falls from its lowered underside (the
  lighting model's slab, below) and §8.2's `states` row lowers its alpha. A hidden layer's lights and casters are not
  drawn and light nothing on the visible layers, yet they still exist (J-A12.81, J-A15.41).
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
  §3.8's readers stay three (J-A28.32); flat roofs, walls, towers and gatehouses as the tops of their prisms;
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
  is visible and the document holds an island that is not fallen, whatever is in view) (h₀ = `sun.heightRatio`; the
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
  takes them back in reverse; §8.8's fitting of the canvas need follows this order too. Labels, text, the chrome and every
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
  its kind, its strength s in [0, 1] by its phase (rising from 0 and back to 0 over its fades: at least 5 s for a
  shower, 60 s for fog, mist, dust haze and cloud cover, V11's rows never shorter) — enters the per-frame terms above,
  never a tile, a light map or a cached layer (§8.8). **A shower** (`rain`, `drizzle`) multiplies the global light's direct
  term by 1 − s/2 and the drawn sun's disc radius by 1 + 3s, so the shadows dim and soften and then return. **Fog** —
  and `mist` at half its strength — multiplies the direct term by 1 − 0.6s and the disc radius by 1 + 4s, fades the lit
  picture toward the `fog` role by 0.45 s × smoothstep(0.25, 1, r ÷ R) (r a pixel's distance from the view's centre, R
  the half-diagonal: the map fading with depth) and at night gives every drawn `LightSource` (§8.1 item 7) a soft halo —
  the baked point-light term spread by a separable Gaussian of σ = 6 CSS px and added at 0.35 s. **Dust haze** fades as fog
  does, toward `sand` at half fog's weight, with no halo. **Cloud shadows** multiply the direct term by 1 − 0.3 s × c(x, t),
  c a two-octave value noise over 400 m world cells drifting with the spell's wind. **Heat shimmer** (by day only) offsets
  the base's sampling by at most 0.5 CSS px × s along a moving noise. Each is weighted per pixel as §8.8's effects layer
  is, so no label, halo or overlay is dimmed, faded or moved. **On the vector rung** a spell is a wash and the halos only:
  fog, mist and dust a full-view wash of their role at 0.3 s with the same fade from the centre, a shower or cloud cover an
  ink wash at α 0.08 s (× c for cloud cover), and at night each light mark's `glow` sprite drawn at 1.5 × its radius, its
  alpha × (1 + s). No term changes the light faster than its fade allows — the view's mean relative luminance moves by at
  most 10 % in any second, with no flash and no lightning (photosensitivity; T124-7) — and none reaches a model value
  (item 102's daylight keeps its fixed days and hours) or an export, which takes the CPU reference without effects
  (§11.1). On a lost GPU context the terms take the vector rung's form.
* **Shadow casters** (WC5; the surface layer's and the slab list's writers on rungs 1–2, projected on rung 3): buildings and wings (prism from `baseCm` to eave and ridge, a wing's foundation skirt, §2.6,
  included; a building over a passage also casts its span marks, §8.5 (2) — each a prism from its wing's `baseCm`
  plus the passage's `headroomCm` to that wing's eave over its span ring, projected from its underside like a bridge
  deck), towers and gatehouses (prism), curtain walls (prism of the band), bridges and piers (deck prism over water),
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

=== REPLACE ### 8.6 Stage-2 render tier and stage-3 LOD ===
### 8.6 Stage-2 render tier and stage-3 LOD

The neighbourhood band of every family (§8.2) is the stage-2 render tier (IMPROVEMENTS S5): `hatched` is NG's family, and
the stage-2 side-by-side against NG shows `hatched` with the `ink` close-up alongside, so a default-ink user opening a
district sees the same palette with more detail (VIS-9). Close-up content (PART II) is derived when §4.1's trigger
policy says, from the district's committed state and sub-seed, in the derivation pool, or in the generation worker when
the pool is off (it needs the kernel and the model), and reaches the tile worker as `DisplayDelta` slices answering the
tile's band request (§8.9; under `'click'` from the elaboration cache, §2.9), into the same mark tables and tile pyramid;
a neighbourhood not yet opened draws the base's marks at the neighbourhood band, without close-up content. Stage 3 plugs
in at the building band: marks from `BuildingGenerator.compose(…)` and `plan(…)` (taking a `Kernel` and a
`BuildingInput` with a `TerrainSampler`, §2.6), derived there as §4.1's policy says and kept in the elaboration cache
(§2.9), the only cache of derived rungs — no per-session (entity key, revision, lod) memo beside it; a
rung whose record (§2.8) reads `stale` is served from the cache until the click re-derives it from its canonical
prior, never from the cache, which only memoises the chain's steps (§2.6, §7.3; J-A28.71; item 28 (c)); the tile draws the outline until its compositions arrive, and every other band draws the outline, which equals the
union of the composed wings by contract (SCL-13), so the footprint hash is the same at every band. The tile worker never
runs `compose()`, `plan()` or close-up derivation (§8.9).

With stage 3 registered, the `roofscape` construction (V02 §5.2) draws each building's roof plan from all its wings at
once — ends, valleys, walls and towers resolved, the facets planar and non-overlapping — and the light pass's surface
layer takes its roofs from it; the per-wing constructions below stay for the parity presets' sheets and as the per-wing
downgrade (M6; file f item 406). A wing that stands on another (`BaseWing.on`) is drawn after it, its ring clipping the
lower wing's roof, and a solid stair's `shed` facet carries tread lines by V02's `stairTreads` (V02 §2.6, V02 §5.6); the
per-wing constructions draw a building's wings in that stack order (item 110 (c); M3a; file f item 419).
Roof construction (§8.2) runs per stored wing (VIS-10) by its `BaseWing.kind` (§2.6): a `rect` wing takes exact OBB
ridges with hips from its four corners (`BaseWing.corners` when its sides carry other vertices), a rect a warp
de-rectangled being a `quad` by §2.6's carry rule; a `quad` takes the exact OBB path when it passes the near-rectangle
test (§3.8), the validated skeleton otherwise, and the gable constructions draw its stored ridge (the arc-length
midpoints of the two side chains its `ridgeAxis` names, sides delimited by `BaseWing.corners`, §2.6); a `polygon` wing
takes a pyramid, cone or dome; the plain roof (no ridge or hip lines) is the downgrade (§3.8). Two-tone lit / shadow
faces are assigned per roof face by its normal against the light (`faceLight`) for any face set a construction yields.
The derived-roof cache key includes the construction (§8.1 item 5), so switching `ink`'s hipped roofs to `hatched`'s
per-wing gables needs no regeneration. A derived plan's chimneys (`Chimney`, §2.6) rise through the roof at their
columns, each drawn as a small stack in the roof tone with an ink rim at the neighbourhood and building bands; the roof
detail (§8.10) draws no decorative chimney on a building whose plan rung is not `absent` (J-A28.85).

**A building in progress at the building band (item 67).** A building under a Works draws its wings at their stage
heights (`heightsAt`, §4.11) and, where its plan rung exists, the plan in progress — walls without doors or furniture —
from the committed composition, the parts §4.11's mutation steps have reached at the drawn week drawn and the rest not
yet; a `decay` or `repair` Works draws no build stage over the plan, its drawing being the damage layer at the
building's level (below); the composition is never re-derived per week, and a stage change marks the rung stale through
its elaboration record (§8.5's change markers; item 67 (j)).

**The damaged plan (g item 123; J136).** A building that is `abandoned`, `decayed` or `ruined`, or restored with
patches, draws the plan in force — the plan it was built with, never a re-derived one (§2.6 step 7) — under §2.6 step
7's **damage layer**: each plan element whose threshold t (§6.3's `plan.damage`) its decay level reaches at the drawn
week (V06's `decayLevel`; level ≥ t, the one comparison every reader makes) is drawn damaged, every other element as
built. V03 §5.1 draws each damaged form among its plan marks, storey by storey, and writes them into the plan's exports;
V02 draws the exterior from the same thresholds; V04 draws cellars, crypts and underground buildings by their own; §11.1
draws the battle maps. The damaged forms (our own; in the plan's roles, every rubble pixel keyed by
`RH32('plan.rubble', the building's render key, salt, cell)` on the world-aligned cell and every shifted fragment by the
same tag keyed by the element's ordinal instead of a cell, so nothing moves):

| element | damaged |
|---|---|
| wall run (outer) | a gap in its line, a bar across each end, and a rubble spill — 1-px `ink` dots at density 0.4 — over the run's band and one wall thickness to either side; seen from outside at the building band (V02), an opening in the footprint's outline |
| partition | a stub at each end, half a wall thickness long, and the rubble spill along its line |
| floor area | on any storey above ground level, a hole: the area filled in `void` under a dense `ink` cross-hatch at α 0.4 (the drop), its edge a broken hairline, the storey below seen through it as `trace` hairlines; at ground level and under it, a rotten patch in `ground` stipple, still walkable |
| door | its leaf and swing arc gone: an open gap, one jamb tick broken |
| window | its double line replaced by a single broken tick |
| stair | its flights dashed and broken at mid-flight (no way up) |
| roof bay over a room | the room open to the sky: its floor under a single-direction `ink` hatch at α 0.2, one line every 4 px — told from a hole's cross-hatch — and, on the exterior (V02), an opening in its roof above that room |
| furniture piece | its outline as fragments, two to three of them, at the furniture role, shifted ≤ 0.3 m by the keyed draw |

As the level rises the damage only accumulates, each element breaking at its own threshold in its own place and never
moving (T123-2, T123-3); the states' looks follow from where V11's ranges place the thresholds — at `abandoned`, dust
and debris (the floors' rubble stipple at density 0.1 × the level), broken furniture and doors off; at `decayed`, rotten
patches and holes, partitions down, roof bays open; at `ruined`, outer walls broken, the upper storeys mostly floorless —
fragments over the hole's cross-hatch — leaving the ground storey the only one that can be walked, cellars and crypts by their own
thresholds (a ruined church keeps its crypt where its thresholds hold it, V03 §5.1). A room any of whose floor areas or
the roof bay over which is drawn damaged is marked **unsafe** — a dashed `ink` diagonal cross over it at α 0.5, its label
dropped — a shape, never a colour alone (item 112). A restoration lowers the level and the damage leaves in reverse
threshold order, each repaired element drawn in item 114's patch material: a wall run by `wallPatch` with its material's
look, any other element by the patch look of its material's row (V11's `walls.patchMaterials`), its outline as built.
Every room, wall, opening and id is the built plan's (T123-1). A building of a district a disaster look ruins draws the
same layer at its row's `lookLevel` by severity, or at its own level where that is higher (§8.2's *Crisis looks*). A
building never decayed draws byte-identically to its plan without the layer (`item123.damage`; T123-7); the drawn week
joins its tiles' key (§8.8). It lands with V03's plan step that draws a decayed or ruined plan, the levels from V06 at
M6-E and, before them, from the existence state at V11's default age (§16).
=== END ===

=== REPLACE ### 8.7 Export resolution ===
### 8.7 Export resolution

SVG is resolution-free and layered, written at a declared band (§11.1). PNG and print render by §8.8's band-streamed
tile assembly at any DPI, with labels placed at a zoom stop computed for the export's own scale (§9.2); paper-unit rules
keep hairlines at their paper width at every scale, and symbol widths come from the symbolisation table (§8.2) at the
export scale. VTT exports carry model widths only, on a declared grid with exact pixels per cell (§11.1). Every export
frames within the map's zoom-out limit — the whole limit bounds at most, `bounds`, or while a crisis look stands the
bounds of town and camps (g items 116 (c), 122 (i); §8.8): a requested frame reaching past them is cut to them, and one
that misses them wholly is T-ER-07's empty frame. The scale bar's accuracy is §9.5's.
=== END ===

=== REPLACE ### 8.8 Tiles, zoom stops, print and the canvas budget ===
### 8.8 Tiles, zoom stops, print and the canvas budget

* **Pyramid (N-9 a).** Zoom stops at 2^¼ steps of scale (four per doubling) cover B-ZOOM's range, ≈ 1:45 000 → 1:500, in 27 stops
  (k = 0 … 26), and eight building-band stops continue the same step to ≈ 1:125 (k = 27 … 34), drawn only for buildings
  whose plan draws, with the plan's detail ladder by stop (V03 §5.1; M6-P, file f item 420). Stop k has
  m_k = 0.132 29 m × 2^((26 − k) ÷ 4) metres per **CSS** pixel — stop 26 is 1:500 at 96 CSS px per inch, stop 0
  ≈ 1:45 255 — `interface ZoomStop { k: number; mPerCssPx: number /* m_k */; band: LodBand /* the band a zoom-in reaches
  at it */ }` (declared in `@plat/model`, §8.1's comment). **Band entry stops** (our own; calibratable; B-ZOOM checks the
  pops at M1 and M2b): the city band from stop 0, the district band at stop 16 (≈ 1:2 828), the neighbourhood band at 20
  (≈ 1:1 414), the building band at 24 (≈ 1:707) — read by §8.5's hysteresis and §9.2's placement. **The zoom-out limit
  (g item 116; J127).** Each map's coarsest stop is its limit k_min = max(0, k_fit − `view.zoomOutMarginStops`), where
  k_fit is the finest stop at which the whole **limit bounds** fit the viewport's short side — the largest k ≤ 34 with
  max(their width, height) ≤ the short side in CSS px × m_k — the limit bounds being `bounds` (§8.1's
  `DisplayList.bounds`: a town's frame, a village's township — land the frame laws already cap, §3.2 (9)) and, while a
  crisis look stands, the bounds of town and camps (§2.9's *The crisis framing*; g item 122 (i)); the margin is the base
  settings cell `view.zoomOutMarginStops` (V11 §3.25.5). **Where no stop fits** (J122) — the limit bounds wider
  than the short side × m_0, as the METROPOLIS cap's 17.53 km frame (§3.2) is on any short side under ≈ 1 465 CSS px —
  k_fit is 0 and k_min is 0: the limit is the pyramid's coarsest stop, a ceiling on zoom-out as the owner asked; the view
  there shows as much of the limit bounds as fits, centred by §9.5's framing, and the view status says that the town is
  wider than the window (V09's `info.zoom.coarsest`); no stop is added below 0 (item 116's "fewer stops, never more").
  The view never settles at a stop coarser than k_min — a zoom-out gesture stops there and the zoom control is disabled
  at it (V09) — and the pyramid rasters, caches and keeps no tile coarser, the gestures' coarser-stop set included; the
  zoom-in end is unchanged. k_min is recomputed whenever the limit bounds change — an epoch or a hand edit that grows the
  frame, a crisis look that comes to stand or ends (§2.9) — or the viewport is resized, a view left coarser than a new
  limit settling to it about its own centre; every rung thus draws every stop from its limit inward (T-ER-08). Tiles are
  512 × 512 device px at the view's **tile DPR** d (the device pixel ratio after the tier's cap, the 4K ceiling and the
  Resolution setting, below), **world-aligned** per (stop, d): tile (i, j) covers the world
  square of side 512 × m_k ÷ d metres with corner (i, j) × 512 × m_k ÷ d from the world origin — stable under panning,
  shared between views and exports at that stop and DPR. The view settles on exact stops: the settled scale is within
  ± 9 % of the requested one, and every settled view has exact hairlines, exact casings and a collision-free label set
  (J-R8).
* **Content (GEO-28, N-7).** A tile draws every mark whose bbox meets the tile dilated by m = the largest of the casing
  half-width, the drawn wall half-width, the projected shadows' length, the largest crown radius and the halo width at the
  stop — and, for a light map, the largest radius among the lights that reach the tile (§8.4 (f)) — in §8.1 item 3's order, identical in every tile; each tile clips to its own square, so both sides of an edge yield
  the same pixels — no seams, no casing bar across a junction on a district boundary. Fills of one semantic within a tile
  are one `Path2D` with the non-zero rule (no anti-aliasing seam between same-role neighbours); the order entries marked
  `OrderSlot.seamClose` (§8.2) also get a ½-px same-colour stroke underneath (NG's seam dilation). Tested by §8.3's
  junction-mouth and draw-order rows.
* **Layers of a tile and composition (N-5).** The tile worker rasters and keeps a **base** layer per tile (slots 1–20 of
  §8.2), then **composes** the base, the glyphs of the labels placed at that stop (§9.2) and the `overlay` live marks
  into one bitmap per tile position, transferred to the main thread. **Labels and overlays at the device's pixel ratio
  (g item 121 (e); J134).** Wherever the tile DPR d is below the device pixel ratio D — the tier's cap, the 4K ceiling, a
  manual level or Auto's rungs (below) — the composition is **split**: the base tile is transferred uncomposed (its
  unlit coverage 0), and the label glyphs, their halos and the `overlay` live marks are composed into the **text layer**,
  world-aligned per (stop, D) by the same tiling rule, a text tile being 512 × 512 device px at D and keyed as a composed
  bitmap (below); the compositor draws the base tiles scaled from d to D — lit and post-operated (§8.4 (f)) — then the
  weather effects (below), then the text tiles, then the main thread's furniture, handles and chrome (§9.5). So labels,
  text, the chrome and every overlay (Find's halo, the handles, `live.ghost`) keep the device's full pixel ratio at every
  level and only the painted tiles soften; where d = D the one composed bitmap per tile position stands (J-R21). A label
  edit or toggle, a selection or a moving person re-composes the tiles (or the text tiles) it touches (§12.5's composition
  cost) and never re-rasters a base. In `path` sun mode
  (§8.4), on a tier whose budget admits it, the base is rastered as `under` (slots 1–9) and `over` (slots 11–20) with the
  projected shadows (slot 10) in their own layer at half resolution (256² per tile, bilinear-scaled when composed), so a
  1° sun step re-rasters only the shadow layers and only a new light step re-rasters `under` and `over`, through §8.4's
  light-step pass (J-R21) — the vector rung's machinery. **On rungs 1–2 of §8.4's ladder (item 68)** the tile worker
  also rasters, from the same draw sequence, the tile's **surface layer** — 4 B per pixel at the tile DPR: the octahedral
  normal in two bytes, the height above the tile's datum in one byte on a square-root scale to T (h = (v ÷ 255)² × T; at
  T = 160 m ≈ 0.2 m steps at 5 m, ≈ 1.0 m at 100 m; T is 160 m, or the tile's own range above its datum rounded up to the
  metre where that is greater — a steep tile at a coarse stop — carried beside the datum, so no height clamps; J-A68.94),
  and the unlit coverage in one
  byte (the coverage of the label glyphs, halos and `overlay` marks it composed, so the light pass leaves them as
  composed) — and bakes its **light map** at half resolution (256² × 4 B: the point lights' term in three channels, the
  ambient occlusion in the fourth); both are transferred to the main thread with the composed bitmap, whose one bitmap
  per tile position stands (J-R21). Each surface layer carries its **max-height pyramid** (§8.4 (c)): level 0 its own
  heights; levels 1–9 per cell the greatest height of the city band's caster marks (§8.1 item 2) whose outlines — an `instances` mark's dilated by its
  largest crown radius — meet the cell and of the terrain field's samples whose field cells meet it — never below the
  level-0 heights it covers — written by the same writer from the marks, in one byte on the height's square-root scale
  rounded up (⅓ of the height byte: 1⁄12 MB per position). The GPU pass reads the visible tiles' surfaces and pyramids and,
  round them, what the global light's window reaches (§8.4 (c)) — the view holding what its drawn sun can need, for the
  cursor sun the largest window a pointer anywhere in the view gives, for the fixed and path suns their altitude's, so a
  moving pointer rasters nothing and a sinking path sun adds blocks as a pan adds tiles. A tile position's **ring** is its
  distance in positions from the visible set (the greater of its two index offsets). The **first ring** (2(a + b) + 4
  positions) is held per position from level 0, its heights rastered with their pyramid (⅓ MB) from the marks of the
  view's band, requested for its districts like a visible tile's (§8.9), its shadows completing when the band answer
  arrives. Every farther position is held by a **ring block** (J-A68.90): the world-aligned square of 2^m × 2^m
  positions whose indices agree once shifted right by m, taken at the largest order m whose every position lies in ring
  2^m + 1 or beyond, and held from level max(m + 2, ⌊log₂(4(r − 1))⌋), r its nearest position's ring — the level §8.4
  (c)'s floor resolves there for the nearest visible pixel — so at most 128 × 128 cells at that level (1⁄48 MB with the
  levels above it, at one byte) whatever its order, its levels continuing above level 9 (a cell there spanning 2^(ℓ − 9)
  tile sides) to one cell per block. A block's cells take the pyramid's rule over the **city band's** marks, which the
  tile worker holds for the whole document and which carry every caster (§8.1 item 2; J-A68.93), with its own datum
  and scale top (above); so a block's cell equals the same cell of any pyramid, and no block waits for
  a band answer. The **slab list** is one per document — every slab of the city band's casters (§8.4 (a)), each its outline, top and underside — held whole by the tile worker, transferred to the main thread with the first surface layer and again with any delta that changes a slab, and read by the traversal wherever the ray runs within R; its memory is counted with the display list (§8.1 item 6), since it is held once, not per tile position. The visible tiles, the first ring and the blocks partition the window, the blocks' number growing with
  the logarithm of its reach and the frame bounding them: at most 326 first-ring positions and blocks together at the
  reference viewport (§12.5), and 437 at any view up to tile DPR 3, for a window reaching the whole frame of any rung to the
  population cap, the blocks together ≤ B (the canvas budget, below;
  `amendc_repair_rendering_r3_blocks.out` (2)), where every position held out to R grew with the window's square (5 440
  positions for 300 m of relief under a 15° sun at the 1:500 stop, `amendc_verify_rendering_r2_rings.out`). So a shadow
  cast from beyond the view falls inside it at its full length, and where a cell is held never changes its value (§8.4
  (c)). The CPU reference computes its surface from the marks directly into float32 arrays (height and octahedral
  normal, 12 B per pixel; its arithmetic in float64) and its pyramids, first ring and blocks in float32 by the same rule,
  never from an encoding, which is the GPU pass's approximation within §13.4's tolerance.
* **Cache and invalidation (LC-23, N-8).** Tile key = (stop, i, j, tile DPR d, tile layer — `base`, or in path mode
  `under`, `shadow`, `over` —, style version, the view-state switches that change the layer's pixels: the year position
  while the pinned tables hold item 117's season rows (under their off form the named season) and `weather` (§8.2's
  season rows), `cvdVariant` while the sheet ships a variant (§8.2), shadows on or off and their mode, model-layer
  toggles, `plotsOnly` (city and district bands), `storey` (building band), `depthBand` and, for a `secret` key,
  `showUnexcavated` (the underground layer; §8.4), the knowledge key while a `use`- or `owner`-keyed thematic row is active
  (§8.2) or while the tile holds a concealed mark, a mark drawn only for a key that admits it (§8.2's `access` and `link`
  rows) or a light whose host is either (§8.1 item 7), the drawn week where the tile holds a Works mark (§8.1
  item 7) or a building drawn under item 123's damage layer, whose decay level is read at it (§2.6 step 7; §8.6), the
  `light` key on the vector rung (its `@night` roles), `base` live layers (the festival and crisis displays among them,
  through `live.festival` and `live.crises`, §8.2); for the `shadow` layer — or, while projected
  shadows are on, `base` on a tier without shadow layers — the path-mode sun quantised to the tier's sun step (1°, or 3°
  after §8.4's fallback); for `under` and `over` — or `base` on a tier without shadow layers — of a sheet whose programs
  at the band read the light (`faceLight`, the two-tone `roof`, `hillshade`, `lit` crowns), the light step (§8.4); in
  `fixed` mode the sheet's sun belongs to the style version and, its altitude following the week, to the year position,
  §8.4's *Sun*). Content version = the combination of the drawn marks'
  `revision`s. A composed bitmap is keyed by its base key plus the stop's label-placement revision and the `overlay`
  providers' versions (Find's chips among them, through `live.find`'s version, §8.2), a text tile by (stop, i, j, D)
  with the same revision and versions. No key holds the weather effects or the spell in force, the Resolution setting
  beyond the tile DPR it sets, or Auto's rung beyond the tile DPR and light step it sets (items 121, 124): a spell, a
  level change at the same DPR or a Find chip re-rasters no base. A `DisplayDelta`'s dirty boxes invalidate every cached tile and ring block they meet, at every stop and DPR. In
  path mode a new 1° step invalidates only the layers keyed by it, and a newer 1° step cancels an older one's pending
  re-rasters (latest wins); a new light step invalidates the layers keyed by it, which §8.4's light-step pass re-rasters
  to completion. A `surface` layer and its pyramid are keyed as their tile's base, a first-ring position's heights and
  pyramid likewise (always from level 0); a **ring block** by (stop, its order, its indices, tile DPR, its level) and the
  switches of a `base` key that change which casters draw or their heights (model-layer toggles, `plotsOnly`, the drawn
  week over a Works mark), its content version the combination of the `revision`s of the city band's marks meeting it —
  a held block serving any view whose floor at its nearest position is at or above its level (§8.4 (c)), so a pan that
  brings a position nearer takes the finer block it now needs, never a coarser one found for the same position; a
  **light map** (§8.4 (f)) by its **light-map key** — its tile's surface key with its content version and its switches
  taken over the tile dilated by the largest radius among the lights that reach it, plus the revisions of the `light`
  marks reaching the tile, the drawn week, the drawn hour and the `light` key — and a dirty box invalidates every light map
  whose dilated tile it meets; so a view switch that changes a surface or the lights that draw (a model-layer toggle,
  `plotsOnly`, `storey`, `depthBand`, the knowledge key while a concealed mark, a mark drawn only for a key that admits
  it or a light whose host is either lies in the dilated tile) re-bakes the light maps that read it, while a moving
  pointer, a new `sunHeight` or a zoom inside a stop invalidates nothing cached: only the GPU's per-frame terms — the
  global light's and the hand lantern's (§8.4 (f)) — move.
* **Canvas budget per hardware tier (N-9 b).** Counted: per visible tile position the worker's base (1 MB at 512²) and
  the main thread's composed bitmap (1 MB); the next coarser stop's composed bitmaps kept for gestures (≤ 1 MB per visible
  position); fixed scratch — the shadow and post-operation buffers (2 MB), and the crown sprites and glyph atlases
  (≤ 5 MB), the crown sprites with a `path` sun in `lit` being one set per cached light step (the drawn step's set always,
  earlier sets while they fit, §8.10; a set a running export holds counts with that export's canvases, §12.8). With P the
  worst-case number of tile positions covering a W × H CSS-px view at tile DPR d,
  P = a × b = (⌈W·d ÷ 512⌉ + 1) × (⌈H·d ÷ 512⌉ + 1), the need is **3P + 7 MB**, and **4.25P + 7 MB** with path-mode shadow layers
  (`under` and `over` replace the base; the shadow layer adds ¼ MB), and **4.25P + 7 MB + Q** with the light pass on rungs
  1–2 (item 68: per position the main thread's surface layer, 1 MB, and light map, ¼ MB; the path-mode shadow layers
  are the vector rung's and are then not held; Q = P ÷ 12 + (2(a + b) + 4) ÷ 3 + B, the pyramids, first ring and ring
  blocks above — 1⁄12 MB per position, ⅓ MB per first-ring position — 2(a + b) + 4 of them — plus B, the blocks' bound:
  3.75 MB at tile DPR 1, 4.25 at 1.5, 4.75 at 2 and 5.5 at 3, whatever the window (`amendc_repair_rendering_r3_blocks.out`
  (2): at most 3.60, 4.09, 4.58 and 5.46 MB over every view, frame to the population cap and placement)), and
  **6.5P + 7 MB + Q_f** on a tier that took §8.4 (g)'s full-precision surface (3.25 MB per position instead of 1 MB, and
  16-bit pyramids, first ring and blocks, each twice its byte size: Q_f = 2Q; J-A68.89). The split composition adds its
  **text layer**, P_D MB, P_D being the positions at the device ratio D (the formula's P at d = D), to whichever need
  holds; the weather effects add ¼ MB per position on rung 3 while a spell is drawn over an unsplit composition (its
  coverage plane, below) and their sprite atlas (≤ 0.5 MB) while they are on. Tier ceilings: low 72 MB, mid 128 MB, high
  192 MB, ultra 512 MB (g item 121 (c)); tile-DPR caps: low 1, mid 2, high 3, ultra 3. **Fitting the need — one order**
  (g item 121 (e); J134). The tile DPR starts at the device's pixel ratio capped by the tier, the 4K ceiling and the
  Resolution setting (below), rounded down to the **ladder** of tile DPRs: 0.5 and 0.75 under 1, then 1, 1.5, 2 and 3 (the
  two under 1 drawn below CSS density and scaled up by the compositor); a need that does not fit the ceiling is met by giving up, in this
  order, until it fits: the weather effects (their coverage plane and atlas), full precision (to the standard surface),
  the tile DPR's steps toward 1 (from 3, then 2, then 1.5, to 1), a
  step whose positions number as many as the step below it being passed over —, the light pass (the vector rung, at DPR 1),
  then the two steps under 1 (0.75, then 0.5); under a manual level the level's DPR is kept until nothing else is left, then the
  nearest lower step that fits is drawn and said (below). Where no step down to 0.5 fits beside the text layer at D, the
  text layer itself steps down the ladder, the order rerun at each of its steps, and the view status says so — never a
  refusal. With D = d this is J-A68.89's step-down with full precision given up first. Path-mode shadow layers are used
  only where 4.25P + 7 MB also fits, otherwise a sun step re-rasters the base. Worked cases
  (`fixall_rendering_r2_budgets.out`): the reference viewport (§12.5) has P = 35 and needs 112 MB (156 MB with shadow
  layers) — mid or high tier; the low-end device at 1 366 × 768 or 1 920 × 1 080 at DPR 1 needs 43 or 67 MB — inside the
  low tier's 72 MB, fallback stop, scratch and atlases counted. Lit (rungs 1–2; each case the base need + Q,
  `amendc_repair_rendering_r3_blocks.out` (5); the text layer, `coh_repair_rendering_r2_resolution.out`): the reference
  viewport keeps DPR 2 on the high tier (P = 35, 155.75 + 17 = 172.75 MB); on the mid tier, where DPR 1.5 (P = 24, 109 +
  14.25 = 123.25 MB) would add its text layer at D = 2 (35 MB) past the ceiling, it is lit at DPR 1 with its text layer
  (P = 12, 58 + 10.75 = 68.75 MB, + 35 = 103.75 MB); the low-end device at 1 366 × 768 is lit at DPR 1 (P = 12, 68.75 MB)
  and at 1 920 × 1 080 (P = 20, 92 + 12.75 = 104.75 MB) draws the vector rung; a tier that took full precision gives it up
  first: the reference view is lit on the standard surface at DPR 2 on the high tier (172.75 MB, where full precision would
  need 234.5 + 34 = 268.5 MB) and at DPR 1 on the mid tier (103.75 MB), the low-end device at 1 366 × 768 on the
  standard surface at DPR 1 (68.75 MB, where full precision's 85 + 21.5 = 106.5 MB drew the vector rung before), and the
  ultra tier keeps full precision for the reference view (268.5 MB) as the mid and high tiers do for a 1 366 × 768 view
  at DPR 1 (106.5 MB). The ultra tier holds
  a native-4K view (3 840 × 2 160 device px, P = 54) at its device ratio unlit in 169 MB, lit in 257.08 MB and at full
  precision in 399.17 MB (T121-8); a 5K screen (2 560 × 1 440 CSS px at D = 2) is drawn at the 4K ceiling's DPR 1.5 with
  its text layer at 2 (P_D = 77) — 333.58 MB lit on the ultra tier, and on the high tier at DPR 1, unlit, in 156 MB; an
  8K screen (3 840 × 2 160 CSS px at D = 2) on the ultra tier lit at DPR 1 with its text layer at 2 (P_D = 160) in 416.08 MB,
  and on the high tier with its text layer stepped to 1.5 (104 MB) over tiles at 0.5 in 171 MB (all PLAUSIBLE until M2b's
  canvas measurement and M4's, §12.8). These formulae and cases are the canvas need's one statement; §12.8 cites them.
  Cached tiles beyond the visible and fallback sets are evicted least-recently-used by bytes. The tier is chosen at app
  start from `bench/calibrate` (§12.1; the ultra tier by its own bar there) and the host's reported device memory, can be
  overridden in the advanced panel, and is shown with the tile DPR in the view status (J-R22).
* **Resolution and the Auto loop (g item 121; J134).** The setting is V09's `AppPrefs.resolution` — device state, never
  in the document, its hash, the log or a tile key beyond the DPR it sets: **Auto** (the default, T121-1) or a manual
  level of height h — 4K 2 160, 1440p 1 440, 1080p (HD) 1 080, 720p 720 device px. **A manual level** sets
  d = min(D, h ÷ the screen's height in CSS px), rounded down to the ladder, then capped as above (a level above the
  screen's own is greyed by V09); choosing one turns Auto off. **The 4K ceiling** (item 121 (b)): the live view's tiles
  never hold more than 3 840 × 2 160 = 8 294 400 device px, so d ≤ √(8 294 400 ÷ (W × H)) for a W × H CSS-px view,
  rounded down to the ladder — a 5K, 6K or 8K screen drawn at its 4K-equivalent DPR and scaled up; exports are not bound
  by it (§8.7's any DPI). **Auto** starts at the fitted d with the light rung chosen at app start (§8.4 (g)) and then runs
  the **Auto loop** over **Auto's ladder** — the weather effects; full precision; rung 1's full-resolution global term
  (to rung 2's half resolution); the tile DPR's steps down to 1; the light pass (the vector rung); the steps below 1
  (§8.4 (g)'s order, from the top): the frame time — each frame's main-thread work and GPU pass, by GPU timer queries where the
  context offers them, else by frame intervals — is held as a rolling p95; a p95 over the tier's frame budget (§12.5:
  16.7 ms on the mid, high and ultra tiers, 33.3 ms on the low tier) through 2 s steps one rung down; a p95 under 60 % of
  it through 10 s, with the canvas need of the rung above fitting, steps one rung up. A change is applied only when the
  view settles (*Gestures*, below) — never during a pan, zoom or drag — and at most once in 10 s, and a rung the loop left
  downward is taken again only after 60 s, doubling each time it is left again (our own; calibratable), so a load at a
  threshold settles on the lower rung (T121-2). A device-pixel-ratio change (the window moved to another monitor) refits
  d at once, applied at the next settle (T121-7). Each change and its reason — `screen` (the screen's resolution caps
  it), `memory` (the canvas need), `frames` (the loop) or `ceiling` (the 4K ceiling) — is counted in the view telemetry
  and read by V09's view-status chip, which names a DPR d as the level whose height is nearest below d × the screen's
  height in CSS px. **A level the device cannot hold** (item 121 (f)) draws the nearest lower step that fits by the order
  above, its reason `memory`, and V09 says so with the level shown (`info.resolution.fallback`) — never a refusal, never
  a crash (T121-4). Labels, text, the chrome and every overlay stay at D by the split composition at every level (T121-5);
  exports and the document are byte-identical whatever the setting (`item121.display`, T121-6). It lands at M4 (§16).
* **Gestures (SCL-7, VIS-6).** During a pinch or wheel zoom the compositor shows the nearest cached stop's composed tiles
  scaled (the labels scale with them; under the split composition the stop's text tiles scale with its base tiles, and
  the coarser stop kept for gestures holds base tiles only, drawn without labels until the settle); 120 ms after input
  stops the view animates (≤ 150 ms) to the nearest stop — the **settle**, at which Auto's changes apply — and the tile
  worker re-rasters the visible tiles centre-out, swapping each in when ready. Panning composites cached tiles and
  shows newly exposed ones from the next coarser cached stop until rastered. While a gesture runs at most 4 new bitmaps
  are committed per animation frame; at the first map and at settle every ready tile is committed in the frame it arrives
  (§12.5).
* **The weather effects layer (g item 124; J137).** The spell in force (§2.9's *Weather effects*: session state from
  §6.1's `view.weather` stream and V11's climate weather columns) is drawn by the compositor every frame as a layer of its
  own — its marks §8.2's *Weather effects*, its light terms §8.4 (i) — above the tiles and below the labels, the chrome
  and every overlay: under the split composition between the base tiles and the text tiles; over one composed bitmap
  weighted per pixel by 1 − the composed coverage of labels, halos and `overlay` marks — on rungs 1–2 the surface
  layer's unlit-coverage byte, on rung 3 a **coverage plane** of one byte per pixel (¼ MB per position) the tile worker
  writes beside the composed bitmap while a spell is drawn — so no label, halo, Find glow or handle is ever covered
  (T124-6). Rain's ripples stand only on water, read from a **water mask** — one bit per 8 × 8 device-px cell, 512 B per
  position, written by the tile worker from the water marks when it rasters the base and transferred while a rain spell
  is drawn. Each family's effect sprites are rastered once by Canvas2D into a sprite atlas (≤ 0.5 MB), so the WebGL2 and
  the Canvas2D compositors draw the same look (§8.9). The layer is in no tile key and touches no cached tile: a spell
  re-rasters and re-composes nothing (T124-1); no export draws it (§11.1); Auto gives it up before anything else (above)
  and costs ≈ 1 ms per frame at its densest (§12.5). It lands at M3b (§16).
* **The surrounding ring (g item 122 (i); J138).** Camps keep to the land the map holds — the frame and its context
  margin (§3.2 (9)). The camped ground §10.2's *Crisis looks* (e) cannot place there — a force too large for that land,
  the outskirts full under the density cap, an island town with no land beyond its shore — is drawn at the city band
  only as **massed camp marks** on the **surrounding ring**, a strip outside the margin's outer edge as deep as the
  margin, over `paper` (no terrain lies there): each force's remainder takes a stretch of ring centred on its camp's
  bearing from the town's centre (a coalition's armies at their spread bearings, §10.2 (f)), of length A ÷ (4 × the
  ring's depth) for a remainder of A m² — four times a camp's density, our own — packed with its kind's tent glyph
  (§8.2) on a world-aligned 6 m grid, in the force's colours; several forces' arcs are laid in `priority` order and, where
  the ring is full, overlap. The panel gives the full number (V09). The arcs are `live.crises`' marks (§8.2) — its tile
  key, admission and switch — and count among the camps the crisis framing takes in (§2.9), so the limit shows them;
  no frame, margin, terrain, model value or hash changes.
* **Print and large PNG (O12 e).** Horizontal bands of tiles (512 device px high) are rastered and composed at the export
  scale; each band's scanlines are streamed into the PNG encoder — each row filtered by the **per-row rule** (of PNG's
  five filter types, the one whose filtered bytes have the smallest sum of absolute values, bytes read as signed), then
  one zlib stream (`CompressionStream` in browsers, `zlib` at level 6 in Node) — and written as IDAT chunks band by band;
  §12.7 holds the encoding's time and fallback. Peak canvas memory is one band (A2 at 300 dpi: 7 016 px × 512 px × 4 B
  ≈ 14 MB); no canvas is larger than a tile band. A lit export (item 68) runs §8.4's CPU reference light pass tile by tile, each
  export tile over its own **window**, its first ring and ring blocks taken round the export tile as round a view of one
  position: the tile's float32 surface (12 B per pixel, 3 MB) and pyramid, its first ring's float32 heights and pyramids
  (8 positions, 10.67 MB) and its blocks in float32 (4 B per cell) — ≤ 14 MB plus its blocks whatever R — the blocks ≤ 13.1 MB at the 1:500 scale and 300 dpi over the frame at the population cap (`amendc_repair_rendering_r3_blocks.out` (3)) and ≤ 1.7 MB more per halving of the export tile's world side (18.52 MB at 1:100 and 600 dpi, `amendc_verify_rendering_r3_exportscale.out`), never
  a whole band's surface. The blocks come from the export's **block cache**, which keeps every block the export has
  computed while they fit in max(16 MB, the tile in progress's blocks) (the tile in progress's held, the least recently used released first), a cached block
  serving each export tile after it whose floor there is at or above its level; each first-ring position's heights are
  rastered for every band whose tiles it borders; the light-map bake reads the
  tile dilated by the largest light radius. The export then runs §8.2's post operations (§8.4 (f)) and composes its labels,
  one band's canvas (≈ 14 MB at A2 300 dpi) and one tile's window held at a time (§12.8); its transient list (§8.1 item
  6) carries what its first rings, light maps and blocks read beyond the frame, the window's Z the city band's surface
  top the generation worker keeps, so a caster beyond the frame's edge still shades it. Per-layer transparent PNGs use the same
  path with the layer set restricted.
* **Warp preview (SCL-9).** While a warp brush is held, the moved L1 vertices are applied to a transient copy of the
  affected ways' and blocks' marks, and only tiles meeting the brush's dirty box re-raster (frame rate: §12.6). **Apply**
  commits the `warp` event (§7.1), whose invariants and re-derivation run then; **Discard** drops the copy (MFCG's staged
  warp, on our event model).
=== END ===

=== REPLACE ### 8.9 Backends, text, threads and the worker boundary ===
### 8.9 Backends, text, threads and the worker boundary

* **Canvas2D is the reference backend of every shipped preset** (`ink`, `lit`, `hatched` and variants), on an
  `OffscreenCanvas` in the tile worker through the resumable raster jobs below; programs render typed-array paths, one
  `Path2D` per (program, semantic, variant) per tile, sprites by `drawImage`. SVG is written from the same display list
  (§11.1).
* **WebGL2 draws no marks.** It composites and, on rungs 1–2 of §8.4's ladder, lights: it uploads the composed
  Canvas2D tiles, their surface layers and their light maps as textures, composites them with the view transform, runs
  §8.4's global-light term (underground, the hand lantern's too) and the composition of the baked light as fragment passes and then §8.2's post operations over the lit base (§8.4 (f)) —
  no stroke tessellation, no SDF text, no look that differs by backend (VIS-7): the lit picture is the CPU reference's,
  to which the GPU pass is held by §13.4's tolerance (J-A68.82). WebGPU, where the browser has it, runs the same passes.
  Either compositor draws §8.8's weather effects from their sprite atlas, the WebGL2 one with the light terms of §8.4 (i)
  as fragment passes (g item 124).
  While the light pass is off or on the vector rung the WebGL2 compositor is the **pre-decided fallback compositor**:
  measured at M2b, pan and zoom frame rates of the Canvas2D compositor on the reference and low-end devices at
  METROPOLIS scale (§12.5); enabled for a hardware tier only if Canvas2D misses ≥ 60 fps (reference) or ≥ 30 fps (low
  end) there.
* **Text (DEF-6).** All text is drawn by Canvas2D in the tile worker's composition step (§8.8) — into the composed
  bitmap, or under the split composition into the text layer at the device's pixel ratio (g item 121 (e)) — glyph by glyph at the
  positions computed from the bundled font's own metrics (§9.2), through a glyph atlas per (face, size, stop): each glyph
  drawn once into the atlas and copied per placement. SVG writes the same per-glyph positions — as the face's glyph
  outlines by default, or as text in the embedded face on request (§11.1, N-13) (J-R9). Measured at M1 against §12.7's
  label-composition budget; pre-decided fallback: whole words cached as bitmaps per (text, size, stop) in the atlas.
* **Threads (N-4).** (1) The **generation worker** holds the document and the model and runs S0–S14; it also resolves
  instance overrides (§8.10), runs the live-layer providers (§8.2), builds on-demand bands (the district, neighbourhood
  and building bands of the districts a band request names, `DisplayListBuilder.build(model, band, groups)`), writes every
  export (§11.1), answers the API's `hit`, `hitStack` and `inView` queries (§11.2) from the model and its 24-B index
  (§8.1 item 6), holds the elaboration cache (§2.9), and hands stage-3 `compose()`, `plan()` and close-up
  derivation (§8.6) to the derivation pool as §4.1's policy says. (2) The **derivation pool** (up to three workers, §4.1) runs the per-district
  stages at every rung (§12.3) and, on request, `compose()`, `plan()` and close-up derivation from the committed state of the
  district it is handed; with the pool off the generation worker runs them. (3) The **tile worker holds no model and no
  terrain**: it holds the display list with its label, instance and string tables (the only full copy, §8.1 item 6) and
  from them rasters base layers and, with the light pass, surface layers with their pyramids, the first ring's heights,
  the ring blocks and light maps (§8.4, §8.8), runs S13b (§9.2)
  and decoration instancing (§8.10), composes labels and `overlay` live marks (§8.8), runs post operations and every
  export's CPU reference light pass; it answers the main thread's furniture and snap queries and rasters raster
  exports from the transient list each request carries (§11.1) — all through the queue below, with everything arriving
  through the table below (J-R23). (4) The **main thread** runs the UI, compositing of the transferred tiles, pointer
  hit-testing on the hit-test slices, screen-space furniture (§9.5; placement scores and ruler snaps asked of the tile
  worker), input and, on rungs 1–2, the GPU light pass over the transferred textures, re-evaluated per frame while the
  pointer moves the cursor sun or the hand lantern (§8.4 (d), (f)). Nothing model-sized reaches the main thread (J-R10).
* **What crosses (SCL-6, N-4).**

  | from → to | what | how | bound |
  |---|---|---|---|
  | generation → tile worker | display-list deltas: mark columns (with `key`), geometry, field rasters, and the changed rows of the label, instance and string tables (candidates, priority, parent node, pinned placement, `hidden` and `knownTo` per label; stamp parameters, species mix and resolved overrides per `instances` mark) | transferred: each slice copied into a fresh buffer and transferred; the generation worker keeps only the 24-B index columns (§8.1 item 6) | O(changed marks); ≤ 97 B per label row, ≤ 40 B per instance row, ≤ 16 B per species row, ≤ 32 B per override row, plus geometry and UTF-8 text |
  | generation ↔ tile worker (cross-origin-isolated hosts only) | the mark table | `SharedArrayBuffer` columns, no copy — optional, never required (needs COOP / COEP from the embedding host) | — |
  | tile worker → generation | band requests: the districts (group handles) and band that tiles entering the view — and, after the visible tiles', the first-ring positions round them (§8.8) — need and the tile worker lacks (the ring blocks read the city band, which it holds whole); the buildings whose rungs and the districts whose close-ups the band needs (`compose()`, `plan()`, close-up derivation) — derived on the request under `elaborate: 'view'`, and under `'click'` served only from the elaboration cache (§4.1, §8.6) | copied | ≤ 4 KB per request |
  | generation or pool → tile worker | answers: on-demand band marks, `compose()` wings and rooms, `plan()` storeys, close-up marks, as `DisplayDelta` slices naming the request | transferred | ≤ 1 MB per answer |
  | generation → tile worker | live-layer marks (`live.<id>` groups), when the view state a provider reads, the model, the visible region or — for a provider that reads them, `live.stale` — the elaboration records change (§8.2) | transferred | ≤ 256 KB per delivery |
  | tile worker → main | composed tile `ImageBitmap`s; per-tile hit-test slices (mark bboxes + entity handles + each mark's draw order and, for a raised way's spans, a way's crossings of retaining walls and a stepped building's tiers, the sub-part path — §11.2's `HitAnswer`; file f item 466); with the light pass on rungs 1–2, each tile's surface layer with its pyramid and its light map, and each first-ring position's heights with their pyramid and each ring block (§8.8), and the slab list (its records; §8.8); under the split composition the text tiles (g item 121 (e)); while a spell of the weather effects is drawn, rung 3's coverage plane and, in rain, the water mask (g item 124; §8.8) | transferred (zero-copy) | ≤ 1 MB bitmap + ≤ 64 KB slice per tile; + 1 MB surface (3.25 MB at full precision, §8.4 (g)), 1⁄12 MB pyramid (1⁄6 at full precision) and ¼ MB light map; ⅓ MB per first-ring position and ≤ 1⁄48 MB per ring block (⅔ and 1⁄24 at full precision); ≤ 1 MB per text tile; ¼ MB coverage plane and 512 B water mask per tile |
  | main → tile worker | furniture-placement queries (view, stop, ≤ 16 candidate boxes: the compass's eight, the title's and the legend's four corners) and snap queries (a pointer in world cm, a radius in px, the stop), each with a request id | copied | ≤ 4 KB per query |
  | tile worker → main | per candidate box its `ObstacleSource.coverage` record; the snapped point from `RoleIndex.snap`, or none | copied | ≤ 4 KB per answer, within one 16.7 ms frame |
  | generation → tile worker | raster-export requests (PNG, print, the `.dd2vtt` scene image): frame, scale, band, layers, post operations and the export's zoom stop (§8.7), and the look and view state at the request — the sheet (its id@version, or the viewer's `stylePreset` sheet with the document's rows, §11.3), §8.8's view-state switches (the year position, `weather`, `cvdVariant`, shadow mode, model-layer toggles, `base` live layers — the festival display's `live.festival` among them —, `plotsOnly`, `storey`, `depthBand`, `showUnexcavated`, the drawn week, `light`), the shadow sun, the light step, the lighting — the rung the export draws (the CPU reference for every raster export, §8.4 (g)) with its global light resolved to the fixed or path sun, since an export has no pointer — and the requesting viewer's knowledge key (§9.2, §11.3), which the tile worker keeps until the export completes and rasters every export tile with — each carrying the export's transient list (mark, geometry, label, instance and string tables for its band and frame, and for a lit export the city band's casters its ring blocks read; §11.1) | request copied; list columns transferred | ≤ 4 KB plus the list (§12.8's export-time peak) |
  | tile worker → generation | the encoded raster: PNG bytes streamed band by band (§8.8); a progress message per band (bands done, bands total) for the export dialog | bytes transferred; progress copied | the file's size; < 64 B per progress message |
  | main → workers | view changes, input, API calls (§11.2) | copied | small |

  Budget: main-thread receive work ≤ 4 ms per delivery (bitmaps and slices only), measured in B-CITY's browser runs.

  **Resumable rasters.** A worker serves its message queue only between two calls it makes, so a tile is rastered by a
  job the tile worker can stop and resume:

  ```ts
  // @plat/render — the tile and vector backends (§14 points here). A tile address is §8.8's (stop, i, j, tile DPR); an export's tiles are addressed at its stop and DPR
  type TileAddress = { stop: number; i: number; j: number; dpr: number };
  interface TileRasterOpts { layers: Layer[]; tileLayer: 'base'|'under'|'shadow'|'over'|'surface'|'lightMap'|'ringHeights'|'ringBlock'; block?: { order: number; level: number } /* 'ringBlock': the block of 2^order × 2^order positions whose indices shifted right by order are the address's i and j, held from `level` up from the city band's marks; 'ringHeights': a first-ring position's heights and pyramid from level 0, from the view's band (§8.8) */; shadows: 'off'|'drop'|'prism' /* the vector rung's: StyleSheet.light.vector.projected (§8.2, §8.4) */;
    sun?: { azimuthCdeg: number; altitudeCdeg: number };        // the shadow sun (§8.4's 1° step): read only by projected shadows (`shadowPass`)
    lightStep?: { azimuthCdeg: number; altitudeCdeg: number };  // the drawn light step (§8.4): read by faceLight, the two-tone roof, hillshade and the crowns on the vector rung
    lighting?: { rung: 1|2|3; light: 'day'|'night'; week: number; hour: number;   // item 68: rungs 1–2 draw albedo and write the surface; the `lightMap` layer bakes the tile's point lights at this week and hour
      reference?: { azimuthCdeg: number; altitudeCdeg: number } };                 // an export's or still's CPU reference light pass: the fixed or path global light
    tier: 'low'|'mid'|'high'|'ultra' /* g item 121 (c) */; dpr: number }
  interface TileBackend { begin(tile: TileAddress, list: DisplayList, style: StyleSheet, opts: TileRasterOpts): RasterJob }   // fixes the tile's draw sequence; draws nothing
  interface RasterJob {
    step(deadlineMs: number): boolean;   // runs the sequence on from where it stopped; returns after the first draw call ending deadlineMs or more after this call began; true when the tile is complete
    finish(): ImageBitmap;               // once step() returned true: the finished layer, its canvas transferred
    cancel(): void;                      // drops the job, frees its canvas: the tile left the view, a newer sun step, a delta that dirties the tile
    readonly spentMs: number;            // tile-worker time spent so far; the budgets and the census read it
  }
  interface VectorBackend { write(list: DisplayList, style: StyleSheet, opts: { layers: Layer[]; band: LodBand; frame: Box }): string }   // the SVG writer (§11.1): runs in the generation worker over the export's transient list
  ```

  The queue passes the view's drawn light step for `under`, `over` and `base` and the shadow sun wherever projected
  shadows are drawn; an export's jobs get its request's sheet, switches, shadow sun and light step. `begin` finds every
  mark whose bbox meets the dilated tile (§8.8) and fixes the **draw sequence**: the native calls in §8.1 item 3's
  (slot, pass, z, key) order, each a fill or stroke of one batched `Path2D` (§12.5's per-tile bound), a run of ≤ 64
  sprite draws (crowns, glyph copies), or a derived per-tile operation (projected shadows, raised under-copy, post
  operation; §8.2, §8.4). The JavaScript preparing a call (appending rings to its `Path2D`, generating a stamp's
  instances, §8.10) reads the clock after every mark and every 64 instances and can stop there; a native call is never
  split (a split batched fill would draw anti-aliasing seams, §8.8), and a derived operation, which uses the shared
  shadow and post-operation buffers (§8.8), runs whole inside one step — so the overrun past the deadline is at most one
  native call or derived operation. Each job owns its canvas and context state, and what it reads does not change under
  it: deltas are applied between steps, a removed mark becomes a dead row and an added mark a new row, and the tile
  worker compacts its list only while no job is live; a job whose tile a delta's dirty boxes meet is cancelled and
  queued again. Slicing changes when calls run, never which or in what order: a tile rastered whole and in 1-ms slices is
  pixel-identical (§8.3). The queue calls `step(8)` — `step(4)` after the pre-decided fallback below.

  **The tile worker's queue.** Between two steps the tile worker serves its message queue, then runs one step of the
  highest class with ready work:

  | class | work | why it stands there |
  |---|---|---|
  | 1 | furniture and snap queries (below) | an answer is due within one frame |
  | 2 | incoming deltas — edit deltas, band answers, live-layer deliveries — in arrival order; each O(changed marks), ≤ 1 MB per answer | a visible tile needing a band's marks cannot be rastered before its answer is applied, and a tile rastered before a pending delta that dirties it is rastered twice |
  | 3 | the visible view: S13b at the view's stop (§9.2); on the vector rung with a `path` sun, after a new light step, the `lit` crown bake (one sprite per unit) and §8.4's light-step pass; the visible tiles' raster jobs centre-out, their compositions and commits (§8.8); on rungs 1–2, after a tile's base, its surface layer with its pyramid and its light-map bake (one light per unit), then the next tile, and after the visible tiles the first ring's heights, then the ring blocks, nearest first, one block per unit (§8.8; their costs §12.7); re-compositions for label and `overlay` changes | the picture the user is looking at |
  | 4 | exports: first S13b at the export's stop over its transient list, its memo held by the job (§9.2, §11.1); in `lit` with a `path` sun on the vector rung, when the crown set of the request's light step is not cached, its bake (one sprite per unit), the set then held until the export completes; then, band by band, the band's raster jobs, its surface, its tiles' first rings and the blocks its block cache lacks (one block per unit) and the CPU reference light pass (64 rows per unit) when the export is lit, composition, read-back (64 rows per step) and encoding (§8.8) | an export waits for the view, never the reverse |

  A class runs only while every higher class is empty, one step at a time, and within a class the job in progress runs to
  completion before the next begins (at most one raster job per class live); a query waits at most one step, and a pan or
  zoom during an export pre-empts it within one step (newly exposed tiles are rastered at once, not behind the export's
  bands). **No starvation:** an export that has waited 100 ms since its last step runs its next step ahead of class 3
  (never ahead of classes 1 and 2) — at most one step in any 100 ms, ≤ 8 % of the worker — so an animated view (a
  `path`-mode sun, moving people, a live layer) slows an export but cannot stop it; a settle (§12.5) then contains at most
  two export steps at CITY and three at METROPOLIS, ≤ 16 and ≤ 24 ms. A newer sun step or a tile leaving the view cancels
  its job (latest wins; §8.4, §8.8). The export dialog shows the progress messages (bands done of total) and, while class
  3 holds the worker, that the export is waiting for the view (J-R46).

  **Placement and crown bakes are stepped like a raster.** S13b — the view's in class 3, an export's in class 4 — is a
  `PlacementJob` whose unit is one decision (§9.2), called with the queue's step limit; a crown bake is stepped one sprite
  per unit. A print's placement over its whole frame therefore runs as a few class-4 steps (§12.7) with queries, deltas
  and the view served between them, and every bound above holds while an export places its labels (J-R51).

  **Queries to the tile worker.** Compass, title and legend placement (§9.5) and the ruler's snapping read the display
  list, which only the tile worker holds; the main thread asks through the query rows above and the tile worker answers
  with `ObstacleSource.coverage` and `RoleIndex.snap` over its list — the implementations S13b uses (§14). A query is
  class 1: it runs at the next step boundary, so it waits ≤ 8 ms plus one native call or derived operation, runs in
  ≤ 4 ms of tile-worker time, and its answer arrives within one 16.7 ms frame; most tiles are one step (a city-band tile
  of a whole-CITY view rasters in ≈ 1.2 ms, §12.5). The ruler keeps one snap query in flight (a newer pointer position
  replaces a queued one) and shows the unsnapped point until the answer arrives; furniture placement is asked when the
  view settles, the furniture keeping its previous place until its answer arrives (J-R40). **Measurement** with the first
  map (M1 at TOWN and CITY, M2b at METROPOLIS) in B-CITY's browser runs: query round trip p95 ≤ 16 ms during a settle
  raster and ≤ 4 ms of tile-worker time per query, each tile's longest native call and derived operation logged beside it;
  exports beside the view are §12.7's run. **Pre-decided fallback:** the step limit falls from 8 ms to 4 ms (`step(4)`),
  halving a query's wait and an export step's share of a settle.
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
| T-ER-12 | exports × features (§11.1): cliffs and steep ground (glTF's draped terrain, VTT `line_of_sight` cliffs), moats and an oasis (water bodies; `oasis`, `spring`), raised ways, retaining walls and deck plots (file f item 447's properties; §11.1's VTT rule for raised supports), the hinterland (`LandUse` faces in GeoJSON and CityJSON) | each by its format's row | the same fixture exported in every format at every rung: validators pass, every feature present with its properties |
| T-ER-22 | wall runs in decay and repair (§8.2's wall rows; g item 114) at every rung THORP to the cap (a village palisade's runs included, V07): a run shorter than the minimum feature; a run whose material no `walls.patchMaterials` row names; a whole enceinte `breached`; save, load, undo, redo, regenerate and migrate of a run's condition and material | drawn 2 px long, centred; its wall kind's first row's look, reported; every run a gap with its rubble, the towers and gates standing; the runs persist as §2.7's profiles, a regeneration keeps them (§7.4's row), an undo restores condition and material, a migrated document draws `standing` and robust — never an error | the fixture of §8.3's wall row at every rung: tiles as stated; the reports present; each lifecycle step's tiles equal to a fresh render of its state |
| T-ER-23 | seasons (§8.2, §8.4; g item 117) at every rung THORP to the cap: every week 0–51; a climate band wrapping the year's end; a climate with no ice or snow band; a water mark whose `season` column holds no ice kind; a crown with no `season.leaf` row; a face whose `season` column names no `season.surfaces` row (§8.1 item 8); a document with no season tables; a sheet whose `SunSpec.altitudeCdeg` is 10° or 0°; an `arid` row, or one whose winter does not freeze, with `weather` `snow` (item 124 (c)); a parity preset; save, load, undo, redo, regenerate and migrate | each week's looks by their rows; the band read cyclically; nothing frozen or snowed; that water and that face as drawn; that crown unchanged all year (evergreen); the off form's four named rows; the drawn sun's altitude clamped into [7.1°, 89°] in every week, the loader reporting a sheet it clamped (§8.4's *Sun through the year*); `snow` drawn as `clear`; under a parity preset the map as drawn, under its sheet's sun, in every week (§8.4 (h)); the year position is view state (§2.9) — persisted with the view, in no digest, left as it was by an undo, a redo and a regeneration, kept by a migration — never an error | the season fixture of §8.3 at every rung and every week: tiles as stated, the model digest constant; sheets at 10° and at 0° swept through all 52 weeks: the sun above the horizon and every value finite in every week; the arid and the non-freezing fixtures with `snow` set: 0 snow pixels in every week; a parity-preset fixture: its tiles equal in all 52 weeks; each lifecycle step's tiles equal to a fresh render of its state |
| T-ER-24 | festival decorations (§8.2; g item 118) at every rung THORP to the cap and on a sky island: no traditions and no preview; a window wrapping the year's end; two windows overlapping; a staging place that does not stand, and none of its fallbacks; a place too small for its count; a tradition with no readable week; a festival shown under a parity preset; save, load, undo, redo, regenerate and migrate | nothing drawn, tiles byte-identical; the window read cyclically; both drawn, in window order; the next fallback, then the heart; as many as fit, the rest reported; shown only in preview (DR43); nothing drawn under a parity preset (the `extension` marker, §8.4 (h)); the display and the year position are view state (§2.9) and the schedule the dossier's facts (DR43), so each lifecycle step draws what its state shows — never an error | §8.3's festival fixtures at every rung and on an island fixture: as stated; a parity-preset fixture with a festival shown: its tiles identical, in every week, to the preset's without it; each lifecycle step's tiles equal to a fresh render of its state |
| T-ER-25 | Find (§8.2's *Find*, §8.8, §11.2, §12.5; g item 120) at every rung THORP to the cap, at every band and on Ground, Below and Sky: no chip; a chip with no match; a chip whose target is gone; nine or more chips; a match under 6 px at the city band, at item 116's limit and at the METROPOLIS cap; pins closer than 24 px across two layers or two islands; a match on a layer not shown, and one Below off the band shown; Show gaps with no kind chip; a player key on the knowledge canary; the halo at every tile DPR and device ratio (item 121); under the weather effects and over a crisis look; every commit, regenerate, undo, redo, advance, load, migration and change of the year position | nothing drawn, tiles byte-identical; count 0, the chip dark; the same until removed; the colours repeating past eight, each chip told by its glyph and dash; a pin, or a count bubble; bubbles never across layers or islands; a ghost pin, Below with its band's depth range; no gap drawn (V09 disables the switch); nothing withheld suggested, counted, drawn or hinted at; the halo, pins and labels at the device ratio; the effects under the halo, the looks under the veil; the chips re-evaluated at each, the key `find` and the document unchanged — never an error | Find fixtures at every rung, band and layer: as stated; T120-1, T120-3, T120-4 and T120-5's bars; at the METROPOLIS cap T120-6's budgets |
| T-ER-26 | the resolution adjuster (§8.8, §8.4 (g); g item 121) on the reference, the low-end and an ultra-tier device, at every rung: Auto and each manual level; a level above the screen's; a level the device cannot hold; a 5K and an 8K screen; a monitor change mid-gesture; a load at a threshold; a lost GPU context under Auto; save, load and every export at each level | the fitted step by §8.8's one order; greyed by V09; the nearest step that fits, said (`memory`) — never a refusal; the 4K ceiling's DPR with the text layer at D, on the high tier's 8K the text layer stepped down, said; refitted at once, applied at the settle; one change, then the lower rung held (60 s, doubling); the light rung lowered and never raised in the session; labels, text, chrome and overlays at D; the setting device state, the document, hash and log unchanged, every export byte-identical — never a crash | a scripted Auto run over §12.5's reference views on each device: no change during a gesture, ≤ 1 change per 10 s at the threshold fixture, the p95 within the frame budget (T121-2, T121-3); each manual level honoured or the nearest drawn and said (T121-4); a pixel test of text and chrome at every level (T121-5); exports and the document byte-identical across settings (T121-6); a DPR change re-evaluated (T121-7); native 4K lit at full precision on the ultra tier within 512 MB (T121-8) |
| T-ER-27 | crisis looks (§8.2's *Crisis looks*, §8.8's ring, §10.2; g item 122) at every rung THORP to the cap and on an island town: no condition and no preview; a condition the key withholds; one standing in some weeks; a condition with no `untilWeek`; one whose `untilWeek` is not after its `sinceWeek`; an unmapped source; several crises at once past the density cap; a force whose camps exceed the frame and its margin; a siege of a place with no standing enceinte; an island town with no land beyond its shore; a headcount of 0; the preview without a dossier; Show crises off; a parity preset; save, load, undo, redo, regenerate, advance and migrate | tiles byte-identical; not drawn, legended or counted; drawn exactly in its weeks; from `sinceWeek` on; never; nothing (`none`, reported); by priority under the cap, the rest on the ring; filling the land to the margin, the rest on the ring at the city band, the limit and Fit containing it; `blockade`, no engines; the ring; the severity's scale; the look at `previewSeverity`; nothing; nothing (the `extension` marker); the looks view-only — each lifecycle step draws what its week, key and DR44 show, the hash unchanged — never an error | crisis fixtures — a siege by a two-army coalition, a quarantine, refugees, a famine, a fire, a flood and an earthquake, an occupation — at every rung through every week of their windows: T122-1 – T122-3 and T122-5 – T122-7's bars; 0 look pixels on water, a carriageway, a gate's passage or a keep-out |
| T-ER-28 | the damaged plan (§8.6; g item 123) at every rung where plans draw: a building never decayed; level 0 and level 1; every state and a restoration with patches; a building generated ruined and one first met in item 113's replay; a stale plan; a one-room and an empty plan; a church with its crypt; a building of a disaster look's district; the week scrubbed back and forth; save, load, undo, redo, regenerate and migrate | byte-identical to its plan; no element damaged, every element damaged; by thresholds; the damage leaving in reverse threshold order, repaired elements in patch material; its as-built plan, then its damage; its cached rooms under the change marker until re-derived; that room's elements by their thresholds; its outline only; the crypt by its own thresholds; at `lookLevel`, or its own level where higher; monotone with the level; nothing stored — each lifecycle step draws what its state shows, every id unchanged — never an error | a fixture of every element kind at the levels 0, ¼, ½, ¾ and 1: T123-1, T123-2, T123-4, T123-6 and T123-7's bars, on the plan as on its battle-map export; the exterior agreeing with the plan (T123-5, V02) |
| T-ER-29 | the weather effects (§8.2's *Weather effects*, §8.4 (i), §8.8; g item 124) on every climate row through all 52 weeks, at every rung: the switch off; reduced motion and the low tier; the densest spell; a spell over every label, halo, Find glow and handle; fog at night among lights; a snow spell on an `arid` or non-freezing row; a spell on the vector rung and after a lost GPU context; a spell during an export, a resize and a gesture; a parity preset; the timeline replayed from its seed and clock | nothing drawn; off by default (V09); ≈ 1 ms per frame (§12.5); nothing covered; a halo on every drawn light; nothing falls or lies; the wash and the halos only; the export without effects, the layer redrawn at the new size, the gesture's frames within budget; nothing drawn; the identical sequence — never a crash or a change of any tile | T124-1 – T124-9's bars on V12's harness: the hash and every tile identical with the effects on and off, exports byte-identical, a pixel test of labels and chrome, the luminance trace within the photosensitivity limit |
=== END ===

=== REPLACE ### 9.5 Furniture, framing and tools ===
### 9.5 Furniture, framing and tools

* **Scale bar:** metres ↔ feet, major and minor ticks, old-style figures (`onum`); a 100 m bar is accurate to 0.5 % at
  every zoom (O6 c).
* **Compass (XB08):** a procedural 8-ray design with ink and paper halves, rerollable per town: its stream is keyed from
  the town root's entity key (§6.1, §14 `TOWN_ROOT`) with the concern `style.compass` and that
  concern's salt, so a reroll is a logged `rerollLayer('style.compass')` event and a link or a copy of the document draws
  the same compass. **Auto-placement:** candidates are the four corners and the four edge midpoints, inset 24 px;
  score = the sum over the display-list marks the compass would cover at the view (labels × 3, protected features × 3,
  buildings × 1, ways × 1, water × 0.2, paper 0) plus 0.5 × (1 − distance from the view centre ÷ the half-diagonal); the
  lowest wins, ties broken in the order NE, NW, SE, SW, N, E, S, W; re-evaluated when the view settles. The covers are
  computed where the display list is — in the tile worker, by `ObstacleSource.coverage` per candidate box — and reach
  the main thread through §8.9's furniture query. Dragging places the compass and the wheel rotates it; both are view
  state (§11.3) and pin the compass. Its view key `compass` is `trueNorth` (default: the needle points at model north,
  whatever the view's rotation) or `free`; the map's own rotation is the `rotation` view key about the frame centre
  (§2.9, §7.1: MFCG's Rotate as a view rotation, never a model change).
* **Grid (XB15):** kind none | square | hex (pointy or flat) | mesh (triangular); cell size in metres or feet (default: a
  round ground distance ≈ one tenth of the view's short side on a 1-2-5 sequence; for VTT, the export's declared grid, §11.1); colour role
  `grid`; fades out below its legibility zoom (cell < 12 px); **skip water** clips grid strokes out of water faces (on by
  default for overview grids, off for VTT grids).
* **Title:** its text is the `title` label entity (§9.1); it is placed in the emptiest corner (NG's rule: the corner
  whose box covers the least mark area, the sum of its `coverage` record from the same furniture query); movable. A
  dossier-bound map's word for its size is the dossier's own tier word — a SettlementForge "city" of 5 001 people is drawn
  on the TOWN rung and titled a city — a dossier fact (§7.7 item 15; item 81; J-A81.72); a standalone map's word is its
  rung's. The plate may add a water qualifier after the tier word (`StyleSheet.plate.waterQualifier`; V07 §5.3's row) and
  shows the population rounded to `StyleSheet.plate.populationRound` (1 by default; 10 under the `VG` preset) (the
  village product; file f item 424).
* **Legend (J04):** a gazetteer panel — an embedded title, numbered districts (always in `legend` mode; in `labels` mode
  only for legend fallbacks), lettered landmarks, the scale bar and the emblem (the numbered and lettered lists read §9.2's
  admission function at the stop: a place it does not admit gets no number, no letter and no row, item 30); border none | single | double rule;
  position any corner (default: the emptiest corner other than the title's) or free; metric or imperial; label modes
  `labels` (default), `legend` (districts numbered on the map, MFCG's Districts = Legend) and `hidden`; plus the symbol key
  generated from the registry (O12 d), each active thematic row's key (`ThematicRow.legend`, §8.2) and each state row's
  entry while a mark in that state is drawn (`StateRow.legend`: the wall runs' conditions, g item 114), every
  colour-coded category shown with its second cue beside its colour (g item 112); a line naming the season and week
  and, while one shows, the festival and its weeks (g items 117 (h), 118 (g)); while a crisis look stands, an entry for
  each — its look's glyph, its condition's name and weeks ("Refugee camp: the Northmarch migration, weeks 12–20"), as
  DR44 admits it at the viewer's key — which V09's Show crises controls and Find's list of looks read (g item 122 (f));
  and while Find is on, its chips — each chip's words, colour swatch and glyph (g item 120 (d), (i)). Position, mode and
  border are view state.
* **Emblem (M06):** a furniture slot `Emblem = { source: 'none'|'import'|'generated'; svg?: string; png?: Uint8Array;
  generated?: EmblemSpec }`. Imports are sanitised (no scripts, no external references, ≤ 64 KB). The base ships a
  minimal generator of our own: `EmblemSpec` = a field tincture from the palette's roles, one of eight partitions or
  ordinaries (per pale, per fess, per bend, chevron, cross, saltire, chief, bordure) and zero or one geometric charge
  (roundel, lozenge, mullet), keyed from the town root's entity key with the concern `naming.emblem` and its salt
  (rerolled by `rerollLayer('naming.emblem')`); off by default; drawn in the legend or a corner (J-R13).
* **Annotation layer** (numbered markers and a separate legend sheet); **north arrow**.
* **Measure tool (L10, L08):** an `@plat/app` ruler — click points for a polyline length in metres and feet; area mode
  for a polygon's area in m², ha and acres; snapping to way centrelines, face edges and vertices through the display-list
  index (8 px radius) — `RoleIndex.snap` in the tile worker, reached by §8.9's snap query and answered within one frame,
  the unsnapped point shown until the answer arrives; exact in world centimetres; a measurement is view data and can be
  saved as an annotation.
* **Find (g item 120; J133).** A view tool among the tools, never an edit: its panel, type-ahead, chip grid and results
  are V09's (V09 §4.21.10), screen-space furniture of the main thread; its state is §2.9's per-viewer key `find`; its
  matches are §11.2's gazetteer match listing at the view's effective key; its marks are §8.2's *Find* rows, drawn by
  `live.find`. It sends no event and changes no model, document, hash or log, and the model never reads it. **Go to**,
  **Next** and **Previous** fly the view to the band that shows a match (§8.8's band entry stops) and **Go there** sets
  the working layer and band (V04 §5.1, V05 §5.6) — view changes; a picture export draws Find as shown (§11.1).
* **Authoring surfaces (item 101 (i); R3, R4, R14, R16).** While a declaration is being drawn, or a derived shape is
  selected, the main thread draws its **handles** — four to eight by default, more on the user's request — over the
  `live.ghost` preview (§8.2); dragging one is a new declaration of the same kind on the same entity (§7.1). The
  **feature snap** lights the candidate edge — a street centre-line, a shore, a wall, a ridge, a block edge — as the
  pointer comes within 8 px, answered by the tile worker's `RoleIndex.snap` exactly as the ruler's (§8.9), and holding
  Alt places freely; the snap is resolved into the event's points before its dry run (§7.1), while the kernel's own
  attraction still applies to every insertion (§3.6). The **count badge** beside the ghost shows what an area
  declaration (`quarter`, `fill`, `roster`) will hold — its plots, households and buildings from the dry run (§7.1) —
  with plus and minus that re-run the dry run at the next step of the declaration's size — a quarter's `sizeM2` by (its
  band's maximum − its minimum) ÷ 8, clamped into the band, from the median when unset; a fill's density dial by one step
  (V09 §4.5); a roster's badge has none (its size is its lines) (file f item 348); numbers show while drawing (a way's length, an
  area in hectares). All are screen-space furniture: never exported, never in the model, never read by the clerk.
* **Underlay (item 101, T12 `dress`; J-A101.81).** An image the user drops under the map to trace: the per-viewer view key
  `underlay` (§2.9: the image, its opacity 0–1 — default 0.5 — and its frame as a world-cm affine placement with four
  handles). The compositor draws it first and the composed tiles over it at 1 − its opacity, so the image shows through
  the map without re-rastering a tile; it is never exported and never in a digest, never crosses the bridge (§11.3), and
  no model code or clerk reads it.
* **Framing (A06):** the initial view and the default export frame are the circle centred on the settlement centre with
  radius max(the outer enceinte's radius, the 95th percentile of footprint distances from the centre) × 1.08, fitted to
  the viewport's short side (no letterbox: the long side shows more context), never coarser than the map's zoom-out
  limit (§8.8; g item 116) — the circle lies inside `bounds`, so the first view is the framing rule's at every rung, a
  village's V07 §5.2's; while a crisis look stands the circle is widened to contain every camp (§2.9's *The crisis
  framing*) — and the view's **Fit the town** frames the whole limit bounds (§8.8: `bounds`, or town and camps while a
  look stands) at the limit's stop less its margin, or at stop 0 where they do not fit (J122) (V07 §5.2's township view
  at a village rung; V09). River tails and ribbon tips beyond the
  percentile are outside unless the user frames them; a user frame is view state. Furniture sizes are CSS px × a UI
  scale, drawn at the device's pixel ratio over the tiles, the weather effects and the text layer whatever the tile DPR
  (§8.8; g items 121 (e), 124 (e)).
=== END ===

=== REPLACE ### 11.1 Formats ===
### 11.1 Formats

| target | mapping | notes |
|---|---|---|
| **native `.plat`** | §2.9's format and canonical form; its byte-identical round trip is tested in §13.2 | import of our own export (MFCG cannot re-import its export; FTG's export ≠ its edit format) |
| **JSON schema** | published, versioned (generated from the `zod` types); entities by id with containment; a `plan` block per building whose plan rung is not `absent`, its state (§2.8) recorded on the block (§2.6; items 28 and 28 (f); J-A28.84): storeys, each with its rooms (address, ring in integer cm, role, `scope` — `unit`, `shared`, `service` or `circulation` — and, for a `unit` room, `unit`, the address of the household whose dwelling unit it belongs to), walls by kind, openings (kind, width, and the entrance of §2.6's set an `entrance` opening serves) and windows; the plan's `units` (each household's address, its unit form and its entry opening), stair cores and chimneys; with the output version and the supersedes table, so an exported plan says who lives where and the room graph follows from the openings; a `massing` block per building and a `composition` block with its state where the `wings` rung is current or stored (V02 §5.5; M6, file f item 449); every record's fields with their tier (*Authorship and tiers*, below) and each event's authorship with the log; each district's character vector, identity, band range and name history (item 72); each `Works` with its stage at the export's drawn week (§4.11; item 67); each `LightSource` (item 68); a clandestine building's concealed use and its concealed parts (item 63), the document formats being admitted whole (*Knowledge*, below); our own schema, never a cell grid | the API's response type |
| **compact twin** | CBOR with typed-array tags; varint zig-zag int32 cm in **world** coordinates, the settlement centre stored in the header, so it is an encoding of the same schema (FTG-21) | embeds and sharing; a decoder is part of the library |
| **GeoJSON** (RFC 7946) | two declared variants (N-14, below): the default **strict RFC 7946** file in WGS84 longitude / latitude through the geo anchor, and the **metric** file by prior arrangement; neither has a `crs` member. One FeatureCollection per layer (*Layers*, below); one feature per entity with `id` (its address, §6.3), `kind`, `layer`, `epoch` and public attributes; **districts included** (FTG omits them); ways as LineStrings with class and model width; faces as Polygons with holes, emitted without antennae (an antenna: §3.6 rule 3); MultiPolygons for face unions; walls, towers, gates and built bridges as typed features (a crossing `site` is not exported, §2.7), each enceinte's wall LineStrings split per run of equal `condition` and material (§2.7), each run carrying the enceinte's `id` and `run` (its ordinal from the trace's first vertex in vertex order), `condition` absent when standing and `material` — the `wallKind/id` key of its V11 `walls.patchMaterials` row — absent when robust (file f item 575; g item 114) — an enceinte closed by `shore` or `barrier` adding its closing edges as LineStrings of kind `closure` carrying the barrier kind (`shore`, `cliff`, `gorge`, `marsh`, `sheer`, `enceinte`; J-VI.3), every enceinte its enclosure as one Polygon of kind `enclosure`, each gate carrying its kind (`land` or `water`, §2.7) (g item 106; M2b, file f item 447); **item 110's entities (M3a, file f item 447; one text for both variants):** every way carries `part` (0 the ground); a raised way's LineString adds `raisedKind` (`viaduct` · `elevated` · `aqueduct`), `source` (`generated` · `declared`, item 244's derived reading), `reason` (`drop` · `link` · `water`, absent when declared; J-VI.2), `deckMinCm`, `deckMaxCm` and `underuseSince` (a week, absent when in use); each support a Polygon of kind `raisedSupport` (`way`, `key`, `state`); each span a Polygon of kind `span` (`use`, `state` — item 244's, absent when standing); an aqueduct's channel is its way's LineString (class `aqueduct`); a retaining wall one LineString of kind `retaining` per run of equal state along its chain (`wall` its id, `run` the run's ordinal from the chain's first vertex in vertex order, `highSide` of the vertex order, `stepMinCm` and `stepMaxCm` over the run, `material`, `state` — absent when standing); stairs and ramps as `stair` and `ramp` flags on the way segments they occupy; a plot or building on a deck `onDeck` (its deck kind) and `deck` (the host's id), a deck host's feature `plat:deckState` (`decayed` · `ruined`, absent when standing); a stepped building `tiers` (the count); features on a raised part stay in the ground layer's collection with their `part`; boundary treatments as LineStrings with `treatment` (VIS-8); **trees** per green entity as one MultiPoint of its instance positions (§8.10's function at the finest band, overrides applied: integer-centimetre positions under §6.5's lint, so the file is byte-identical on every host) with `species[]` (each instance's species kind), `crownM[]` and `leafType[]` in the same order, or one Feature per tree on request with `species`, `crownM` and `leafType`, or none (VN-158, XB32); model widths only, never symbol widths; public attributes include the lifecycle states (`existence`, `condition`, a wall's `supersededBy`, a tunnel's `closure`, an island's `state`; items 8, 11, 31), a plot's `exposure` and `knownTo`, a building's `knownTo`, and an institution's `knownTo` on the features of its buildings (item 30), a building's `entrances` as points with their roles (item 29), an underground building's `baseCm` as its depth below the datum and `eaveCm` as its ceiling and a tunnel's invert profile (II.7), a market reservation's `rank` (§4.2); also each building's `worksStage` at the export's drawn week (item 67), an access point's `state` (item 64), each gallery, chamber and link of the underground systems with its `system`, `kind` and `depthBand` (II.7.6; item 65), a district's `identity` and band range (item 72), each lit `LightSource` whose host draws for the export's key (§8.1 item 7) as a Point with `kind`, `heightM`, `intensityCd`, `radiusM` and `colour` (item 68), and every property's tier as `plat:tier` — `dossier`, `declared` or `map` (item 20 (h)); the `name` and the purpose of a place (its `use`, or an institution's kind) the export's knowledge key does not admit (*Knowledge*, below) are withheld, the feature staying in the file, and a concealed use's features — its rooms, its concealed entrance, its way down (item 63) — and a secret access or link are left out for such a key, their lights with them; a fallen island's archived arena is not exported (II.6); an oasis's water body carries `oasis: true` and its spring a Point of kind `spring` (g item 111); a land-use feature's `deposit` and `depositState`, one `condition` feature per overlay (no geometry of its own; its `targets`) and one `supplyChain` LineString per active chain whose every joined node the key admits (V08 §5.2; SettlementForge stage, file f item 410); the history properties of V06 §5.3 — for raised ways the properties above plus `plat:why`, no second `reason` meaning (M6-E, file f item 409); the sky content of V05 §5.5 (M6-sky, file f item 415); the optional `wings` layer of V02 §5.5 (M6); with the option `exportWhy` (default false; M3a, file f item 456) each use's `cls`, `family`, `specialisation`, `significance` and its top three siting row ids (V11 §2.4; a raised way's `rw/<kind>` id travels there, never as its `reason`) | the default file validated by an open RFC 7946 validator in CI and loaded by the scripted QGIS test (O11 d); the metric file checked for geometry validity and its sidecar against its schema |
| **SVG** | written from a transient display list the generation worker builds for the export (below) at a declared band — the city band by default; the district band on request, after a size estimate is shown; the neighbourhood band only for a district-sized or smaller scope; `<g id="layer.ground"><g id="sem.building.footprint">` groups per layer and semantic; inside a group one compound `<path>` per (semantic, district), and a `<metadata>` JSON map from subpath index ranges to entity ids, so every entity stays addressable without an element each; trees as one compound path per green entity (crowns at the district band, the wood outline at the city band); text (N-13; the export dialog's `text` option) by default as **outlines** — each glyph used written once in `<defs>` as a path from the bundled face's own `glyf` outlines (the face the labels were measured with, §9.2; quadratic segments as SVG `Q`), each placed glyph a `<use>` at the per-glyph position S13b computed, the label's text carried in an `aria-label` and a `<title>` so it stays searchable — or, with `text: 'embedded'`, as editable `<text>` (curved labels per glyph, straight labels as one `<text>` with explicit per-glyph x positions) in the bundled face embedded unmodified as an `@font-face` data URI (OFL permits embedding; no subsetting, §17.2) (J-R32); halos by paint-order in both; hatching as compound paths; symbol widths; the light (item 68) as the vector rung's shadows in `<g id="layer.shadow">` and glow sprites, or, with the export option `lighting: 'raster'`, one embedded raster lighting layer from the CPU reference (§8.4 (f)) in `<g id="layer.light">`, multiplied over the base groups; the colour-matrix post operations (§8.2) as one filter on a wrapper group `<g id="lit">` that holds every base layer group, `layer.shadow`, the glow sprites and `layer.light`, under the label groups, so they act after the light as §8.4 (f) orders and never on a label; raised parts in their own group `layer.ground.raised` above ground part 0 (item 110; M3a); with stage 3 registered, at the district band and finer the roofscape's facets in the semantics `sem.building.roof`, `sem.building.roof.dormer`, `sem.building.roof.porch`, `sem.building.roof.tower` and `sem.building.roof.cupola` and its lines in `sem.building.roofline` (V02 §5.5), the map naming each facet's subpath range by its wing address `wing:<building>/<key>` (M6, file f item 449); the sky content of V05 §5.5 (M6-sky) | size and element budgets: §12.7; CI opens the METROPOLIS file in Inkscape headless (export to PNG within 120 s) and checks every layer id (O11 h) (SCL-14, VIS-18); the outline file's Inkscape PNG and the embedded file's Chromium PNG each match PLAT's own PNG of the same frame within the visual-regression threshold (§13.4) |
| **PNG / tiles** | §8.8's band-streamed tile assembly at any DPI, rastered in the tile worker from the export's transient list (below) and lit by §8.4's CPU reference at the request's light setting — the fixed or path sun by day, the moon and the lights at night, since an export has no pointer (item 68); transparent background; per-layer transparent PNGs (the largest MFCG ask; raised parts their own PNG, item 110); print presets A4…A2 at 300 dpi; the animated history (APNG over history frames; V06 §5.3, M6-E) | O12 (e): A2 at 300 dpi with no canvas larger than one tile band |
| **VTT** | Foundry-class scene JSON and **Universal VTT (`.dd2vtt`)** by the profile below, one scene set per model layer — the ground; the sky per island (its content V05 §5.5's; M6-sky); the underground one scene per depth band (`depthBandCm`, II.7.3) at that band's depth, every system of the layer in it (II.7.6; item 65) — with its elevation, plus one scene for each storey of a building whose plan rung exists (the profile below; item 28) and one deck scene per raised way crossing the scope (the profile below); model widths only | grid alignment error 0 px per cell (O11 g); no manual steps on import |
| **3-D** | glTF 2.0 binary (D-8): **ground as one planar partition** — the plat's leaf faces at the finest committed level, each boundary read once from the arena (§3.9) and each face exported once (no coplanar overlap), clipped to the terrain cells and draped (vertex z by bilinear terrain sample), material by role; **rivers as sloped surfaces** — the water level at each vertex is that of the nearest course station, falling monotonically downstream along S1's carved course; lakes, ponds and sea as level planes (GEO-40); buildings extruded from `baseCm` (FTG-13) to eave height with roof meshes to ridge height, per wing, each wing that spans a passage also extruded over its span ring from the passage's `headroomCm` above that wing's base to its eave (a stepped front's quads each), the passage left open beneath (§8.5 (2); `Passage`, §2.5; `BaseWing.spans`, §2.6), a basement (§2.6; item 29) extruded down from `baseCm` by its storeys inside its inset ring, an underground cell or vault (II.7.3) at its own depth — each wing's `ring` (§2.6), its roof by the wing's kind as in §8.6, or from the building's roofscape (V02 §5.2) with stage 3 registered, the export option `compositions: 'asDrawn' \| 'derive' \| 'none'` choosing (M6, file f item 449) — each wing's foundation skirt extruded down to the terrain (§2.6); walls, towers and gatehouses as prisms on their bases, a curtain wall's top carrying its walk (`Enceinte.walkCm` wide), by run (g item 114): a `standing`, `worn` or `patched` run its prism with `extras.condition` and `extras.material` (absent when standing and robust), a `breached` or `dismantled` run no prism (its towers standing); bridge and pier decks at `deckCm`; a raised way a deck mesh swept at its deck height with its parapets, its supports extruded from the ground to the soffit, each `vault` span closed by its end walls; a retaining wall extruded between the ground heights on its two sides; glTF nodes carrying `extras.part` (item 110; M3a, file f item 447); the `interiors` option (default off) adding each plan's walls, floors, stairs and columns per V03 §5.3 (M6-P, file f item 450); the sky content of V05 §5.5 (M6-sky); trees as instanced crown meshes (`EXT_mesh_gpu_instancing`, positions from §8.10), one instancing node per (green entity, crown class) whose `extras` carry the entity's address and, per instance in instance order, `species`, `crownM` and `leafType` (XB32); a building under a Works at the export's drawn week (§4.11's *Which week is drawn*) extruded at its stage heights (`heightsAt`, §4.11; item 67); lights (item 68) as `KHR_lights_punctual` — a point light per lit `LightSource` (its position, colour, intensity in candela and `range` its radius) and one directional light for the fixed sun, the lights of an underground layer in that layer's node, each light only where its host draws for the export's key (§8.1 item 7). OBJ as a flat secondary (one mesh per entity, unlike MFCG's merged OBJ) | shadows, glTF and CityJSON agree by construction (heights are model data, §2.6) |
| **CityJSON 2.0** | `transform { scale: [0.01, 0.01, 0.01], translate }` so every vertex is our integer centimetre (lossless); `Building` (LoD1.2 solid from base to eave; LoD2.2 roof surfaces — the roofscape's facets, with dormers and porches when compositions are exported (V02 §5.5; M6); over a passage the solid takes each spanning wing's span-ring prism, from the passage's `headroomCm` above that wing's base to its eave, the passage open beneath), `WaterBody`, `Road` (lines with class and width, sampled from the way's width profile, §2.2 rule 5), `PlantCover` (greenery faces), `SolitaryVegetationObject` (trees from §8.10, one per instance: a `GeometryInstance` of the crown class's template, with `species`, `crownDiameter` and `height`; XB32), `LandUse`, `OtherConstruction` (walls, towers, gatehouses — an enceinte one object per run that stands, `standing`, `worn` or `patched`, with the attributes `condition` and `material`, a `breached` or `dismantled` run none (g item 114); a retaining wall with `function: 'retainingWall'`), `Tunnel` (II.7's tunnels, swept from the invert profile and the bore), `Bridge` (and a viaduct, a raised road and an aqueduct each a `Bridge` with `function` `viaduct` · `raisedRoad` · `aqueduct`, an arch vault a `BridgeRoom`; item 110, M3a), `TINRelief` (terrain); a basement as a `BuildingPart` below `baseCm` — and, for a building whose plan rung is not `absent`, `BuildingStorey`, `BuildingUnit` and `BuildingRoom` children as V03 §5.3 states (M6-P, file f item 450) — and an underground cell as a `Building` whose base lies below the datum (items 12, 29); the sky content of V05 §5.5, PLAT's extension gaining `+FloatingIsland` and `+SkyAccess` (M6-sky, file f item 415); with `exportWhy`, the uses' siting fields as GeoJSON's; a building under a Works at its stage heights (`heightsAt`) at the export's drawn week (§4.11; item 67); no `referenceSystem` (a local metric CRS); a geo anchor, when the export has one, is recorded in the root property `+platGeoAnchor { latDeg, lonDeg, bearingDeg }`, defined by PLAT's own CityJSON Extension and listed in the file's `extensions` member (below; DEF-5) | validated against the CityJSON 2.0 schema in CI — the anchor-less file as it is, the anchored file with PLAT's extension schema given to the validator from the repository |
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
never above the caller's; the bridge's `export.request` carries the same field; an application passes the view's
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
for a real place. For a dossier-bound map whose dossier carries its partners' true bearings (§7.7 layer 2's *Bearing*;
item 125 (b)), the port sets the anchor's `bearingDeg` to the turn of model north that fits the derived gates to those
bearings, as the key's documented default; with none the default stands; no geometry moves for it. Each model vertex (x, y) in metres, rotated by the bearing, is taken as a transverse Mercator easting
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
  §8.6's damage layer draws broken at the export's drawn week: a fallen run leaves line of sight, item 123 (e)), enceinte faces along
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
  building's footprint less its doors and the runs its damage layer draws broken (V04, by their own thresholds; §8.6);
  `portals` only at openings in a wall line — a door access, a door or breach link,
  an underground building's entrances, each tunnel grille (closed when locked, bricked, gated or secret); every vertical
  access (stair, shaft, ladder, hatch, well, grating, mouth, sinkhole) a shaft light plus a `plat` extension object; and
  `lights` the band's lights and shafts — each only where the export's key admits it (§8.1 item 7).
* **Per raised way (item 110 (b); M3a):** each raised way crossing the scope adds one deck scene at its mean deck
  elevation, named as a storey scene is, its parapet edges `line_of_sight`, its end stairs or ramps open portals
  (`closed: false`) and the ground beneath drawn dimmed — at most 8 per export, the longest first, the dialog saying so;
  a Foundry scene writes each deck as one more level with its elevation band.
* **Per storey (item 28):** a building whose plan rung exists exports one scene for each storey, at that storey's elevation:
  `line_of_sight` from its walls minus their openings and the wall runs and partitions §8.6's damage layer draws broken
  at the export's drawn week, `portals` from every opening and every entrance whose door the layer leaves standing — a
  doorless opening is a gap, no portal —; the stair core a named portal on both storeys' scenes while its flights
  stand; floor holes, rubble and debris appear in the image only, never invented as walls (g item 123 (e); T123-6);
  `lights` — one per lit room (`Room.lit`, §2.6) that draws for the export's key (a concealed room's only for a key that admits it, §8.1 item 7) at its spine summit (§3.8's
  `spine` reader, its sampled medial axis on a downgrade; §8.5), `{ position, range, intensity: 1, color, shadows: true }`
  as the scene-level `lights` above, `range` being the room's diameter in squares and `color` the `glow` role's; the
  walls keep their centimetre positions and only the scene's grid snaps.
* **Foundry scene JSON:** the same geometry as walls (`c: [x0, y0, x1, y1]` with movement and sight types; doors flagged;
  an enceinte's walls by run as `line_of_sight` above — a `patched` run a wall, a `breached` or `dismantled` run none),
  the same lights, a background image file, grid size and distance units — written before the walls — and journal
  entries from the gazetteer.
* **Plain scene PNG:** on request a plain PNG of the scene named `{cols}x{rows}` is written beside the file, for
  tabletops that read the grid from the file name (file f item 454).
=== END ===

=== REPLACE ### 11.2 The embedding API and the worker boundary (SCL-6) ===
### 11.2 The embedding API and the worker boundary (SCL-6)

```ts
type DocHandle = { readonly id: string };            // the document lives in the generation worker
type Progress =                                      // item 119 (c): posted by the generation worker, never polled; read by §12's progress rule (V09 §4.21.9)
  | { stage: StageId; index: number; of: number }   // as each StageDecl of the run starts: its index among the run's stages and their count
  | { wait: 'epoch'|'history'|'dossier'|'export'|'migrate'|'verify'|'undo'; done: number; of: number };   // a wait that is not a stage run: its own steps of their total (epochs, replayed epochs, the port's steps, export bands, a migration's replayed events, an open's load-verification replay's events, a grouped undo's or redo's events)
interface PlatApi {
  generate(bp: Blueprint, opts?: { onProgress?: (p: Progress) => void;
    docId?: Uuid /* a host-minted id, e.g. a SettlementForge map record's mapId; else minted here (SettlementForge stage; file f item 459) */;
    prefix?: EditEvent[] /* the port's creation prefix, written at positions 0…k with `creation` set */;
    scratch?: boolean /* a scratch document, as `scratch` below (M3c; file f item 469) */;
    signal?: AbortSignal /* Stop (V09 §4.21.9): the run ends and the call rejects with an `AbortError`, no handle and no document made — a stopped history-first generation's app then shows `info.history.cancelled` (V06 §3.20.4) */ }): Promise<DocHandle>;
  scratch(h: DocHandle): Promise<DocHandle>;   // the committed state of h at its logHead, written to its snapshot form in the generation worker and opened as a new handle by §2.9's reader: never saved, never bridged, never resolved by a DocResolver; its session 'clerk:<n>', its role and knowledge key h's; an editing role's call (a viewer's refused 'role'); its memory a session line (§12.8; V10 §6.2) (M3c)
  open(bytes: ArrayBuffer, opts?: { readOnly?: boolean; session?: string /* a host-assigned session (§11.3); otherwise the document's stored session, minted on first edit (§7.4) */;
    onProgress?: (p: Progress) => void /* a migration's replay ('migrate'), before the handle returns; the load verification's replay ('verify'), which runs after it, off the path (§2.9 step 3) */ }): Promise<DocHandle>;             // .plat or CBOR twin; bytes transferred in
  edit(h: DocHandle, e: EditEvent | EditEvent[], opts?: { filtered?: boolean; admitAs?: Admission;
    onProgress?: (p: Progress) => void /* 'undo': a group of `undo` or `redo` events, its events undone or redone of the total (V09 §4.21.9, §3.9) */ }): Promise<ApplyResult>;   // an event may arrive with its `fates` filled (below); `filtered` and `admitAs`: *Knowledge*, below (file f items 470, 572)
  regenerate(h: DocHandle, scope: Scope, mode: 'keep'|'newRandom', opts?: { discardEdits?: boolean; onProgress?: (p: Progress) => void }): Promise<ApplyResult>;   // §7.1's Regenerate (keep settings) and New random
  adjust(h: DocHandle, param: string, value: unknown, opts?: { onProgress?: (p: Progress) => void }): Promise<ApplyResult>;   // §7.1's Adjust, or Re-derive from Sk for a parameter consumed early
  confirm(h: DocHandle, token: string, fates: EditFate[], renames?: Rename[]): Promise<ApplyResult>;                     // completes an action that returned `confirm` (below)
  cancel(h: DocHandle, token: string): void;                                                         // drops it; nothing was committed
  preview(h: DocHandle, e: EditEvent | EditEvent[], opts?: { view?: ViewHandle; filtered?: boolean; admitAs?: Admission;
    variations?: 3; page?: number; focus?: number }): Promise<PreviewResult>;   // item 101: the dry run alone — nothing committed; with a view, its ghost drawn as `live.ghost` (§8.2); an editing role's call (*Knowledge*, below); `variations`: *Variations*, below (file f item 461)
  thumbnail(h: DocHandle, req: { previewId: string; variation: number; box: BoxCm; px: [number, number] }): Promise<ImageBitmap>;   // the tile worker's export-class raster of a preview's overlay ghost marks, ≤ 160 × 120 CSS px at the view's DPR, transferred
  undo(h: DocHandle, of?: number): Promise<ApplyResult>;   // appends an `undo` event for the handle's session (§7.4); `of` only for the `owner` role; a conflict lists the dependent events
  redo(h: DocHandle): Promise<ApplyResult>;                  // appends a `redo` event for the handle's session (§7.4)
  query(h: DocHandle, q: Query, opts?: { admitAs?: Admission }): Promise<QueryResult>;   // ≤ 64 KB per page, paginated (kinds below); admitted by the knowledge key (below)
  view(h: DocHandle, target: HTMLCanvasElement | OffscreenCanvas, opts?: ViewOpts): Promise<ViewHandle>;   // tiles flow from the tile worker
  setView(v: ViewHandle, patch: Partial<ViewState>): void;
  setViewOpts(v: ViewHandle, patch: Partial<ViewOpts>): void;   // an `undefined` viewAs clears it (file f item 464)
  export(h: DocHandle, fmt: Format, opts?: ExportOpts & { onProgress?: (p: Progress) => void /* 'export': bands done of total */;
    signal?: AbortSignal /* Stop: the export ends and the call rejects with an `AbortError`, nothing written */ }): Promise<ArrayBuffer>;              // transferred out
  report(h: DocHandle): Promise<GenerationReport>;
  advance(h: DocHandle, req: AdvanceRequest, opts?: { onProgress?: (p: Progress) => void /* wait 'epoch': epochs done of total */;
    stopAfter?: number /* fold at most this many epochs, the last carrying `stoppedAt` as Stop leaves it (V06 §2.3, §4.1): a journalled stopped advance re-issued (V09 §3.8 (3)) */ }): Promise<ApplyResult>;
    // V06 §4 (M6-E; file f item 458). On a dossier-bound document nothing runs and the call answers { status: 'conflict', outcome: { key: 'refuse.dossierClock' },
    // actions: [] } — the host's clock owns its time (V06 §2.3; J-V6.2), a gate outside the dry run (§7.1's outcome table); the what-if copy is that catalogue row's button (V09 §4.9)
  cancelAdvance(h: DocHandle): void;
  forkAt(h: DocHandle, seq: number): Promise<DocHandle>; rerunFrom(h: DocHandle, seq: number): Promise<DocHandle>;   // each an editing role's call
  subscribe(h: DocHandle, handler: (e: ApiEvent) => void): Unsubscribe;
  close(h: DocHandle): void;
  registerProvider(p: { id: string; version: string; moduleUrl: string }): Promise<{ status: 'ok' } | { status: 'refused'; reason: 'nondeterministic'|'origin' }>;
    // §11.4's door (4): the provider's module loaded into the generation worker, the derivation pool and the double-run check's two fresh workers
    // (§6.5 (8)) — refused `nondeterministic` when the two runs differ, `origin` when its URL's origin is neither the embedding page's nor one the
    // embed's origin allowlist admits (§11.3); a call of the page's own or a script's, which no bridge message makes (§11.3, §11.4; J-A85.83)
}
interface ViewOpts { viewAs?: Admission /* a display filter: this view's drawing, labels and reads admit exactly what both the view's knowledge key and viewAs admit (§9.2's admission function) — a tier alone is read with the key's places; a key form is a key in its own right, so when its tier is the lower its places stand in for the key's, a place the key withholds staying withheld (a host's party key: V08's players' view); the knowledge key itself is unchanged, so the document formats stay available to the role (file f item 464) */ }
type Admission = 'public'|'local'|'secret'|{ tier: 'public'|'local'; places: Id[] };   // a lowering of a caller's key (file f item 572); `public` below `local` below `secret`
type MsgRef = { key: string; args?: Record<string, string | number | { id: Id }> };   // declared in @plat/model: a catalogue key with arguments; an address argument rendered under the caller's key (a withheld place as its kind); its English text the application's catalogue's (V09 §2.9) (file f item 463)
type Effect = { kind: 'added'|'removed'|'rerouted'|'joined'|'lost'|'displaced'|'rebuilt'|'moved'; msg: MsgRef; targets: Id[] };   // a consequence to something not held (the held ones are `fates`), filled from the dry run's touched set by the owning volumes' rows — V02's deck buildings, V03's stored plans, V04's arch vaults, V06's generated routes, the base's junctions, water and households (file f item 465)
type ApplyResult =
  | { status: 'ok'; logHead: string /* §11.3 */; changed: number /* addresses whose records changed */; created: Id[] /* the addresses the committed events minted, address order, the first 256 (file f item 470) */ }
  | { status: 'conflict'; outcome: MsgRef /* the row of §7.1's dry-run outcome table: its key (refuse.* …) with its arguments, rendered per caller (§9.2) */;
      actions: ConflictAction[] }                                      // §7.1's dry run: the nearest valid position, the blocking lock, a stale base …
  | { status: 'confirm'; token: string; fates: EditFate[] /* the first 1 000; the rest by query 'fates' */; renames: Rename[] /* the case-(4) renames the dry run listed (§6.3, §7.3 item 4); the rest by query 'fates' */;
      counts: Record<EditFate['fate'], number>; scope: EditScope /* resolved */; effects?: Effect[]; effectsMore?: number; holds?: MsgRef };   // §7.3 item 4: nothing is committed until confirmed
type ConflictAction = { kind: 'moveTo'|'unlock'|'unassign'|'stale'|'invalid' /* §7.1's returned kinds: a route is bent, never refused */; target?: Id; at?: PointCm; message: string /* the English default */; msg: MsgRef /* its own button's words (V09 §2.9) */ };
type PreviewResult =
  | { status: 'refused'; reason: 'role' }   // a viewer's preview (*Knowledge*, below): nothing computed, so no list, count or shape
  | { status: 'ok'|'conflict'; outcome?: MsgRef /* on conflict: as ApplyResult's */; actions?: ConflictAction[] /* on conflict */;
      empty?: MsgRef /* §7.1's empty edit: the reason (V09 §4.9's `edge.*` rows); then status 'ok', every list empty and every count 0 — the edit appends nothing */;
      fates: EditFate[] /* the first 1 000 */; renames: Rename[];
      counts: { plots: number; households: number; buildings: number; byFate: Record<EditFate['fate'], number> } /* §9.5's count badge */;
      created: Id[] /* the addresses the events would mint, from the document's `nextSeq` (§6.3) */;
      shape?: PolygonCm | PointCm[] /* a points form's derived shape, resolved as the event would store it (§7.1) */;
      arcs?: { kind: 'walled'|'barrier'; grade?: 'full'|'light'|'closure'; barrier?: BarrierKind /* §2.7 */; points: PointCm[] }[];   // a `drawWall` or `placeGate` preview: the derived circuit's arcs, typed by g item 106 (a)'s closure and (c)'s grade (file f item 462)
      anchors?: PointCm[] /* each anchor tower's point */;
      bent?: MsgRef /* the reason a declaration was bent to the nearest lawful one (R2) */;
      alternatives?: Id[] /* a placement's (placeAt, assign, roster line) top three plots: the first three `SiteCandidate`s the `sites` query returns for its class at its anchor or locus; for a dwelling closure bent to a dug access (§7.3 item 9 (d)), the further qualifying buildings in that rule's order, at most three (file f items 463, 372) */;
      effects?: Effect[] /* at most 50, in the order of `kind` then of the targets' size */; effectsMore?: number /* the rest */;
      holds?: MsgRef /* a removal whose fold records a suppression or a removed slot: `info.remove.holds` with its verb (`rebuild` · `raise`) and kind */;
      previewId?: string; variations?: { event: EditEvent /* resolved, with its absolute reroll map */; result: PreviewResult; page?: number }[] /* *Variations*, below */ };
type Query =
  | { kind: 'gazetteer'; text?: string; kinds?: string[]; counts?: boolean /* g item 120 (b): the class counts */;
      chips?: FindChip[] /* item 120 (g): each chip's match listing; §2.9's FindChip */; gaps?: boolean /* with chips: Show gaps' units, V01 §5.4 (3) */;
      page?: number }   // answered as GazetteerAnswer (below)
  | { kind: 'people'; type?: string; race?: string; gender?: string; profession?: string; workplace?: Id; ageRange?: [number, number]; household?: Id; district?: Id; page?: number }   // COV-FTG-C13
  | { kind: 'hit'; view: ViewHandle; x: number; y: number; radiusPx?: number /* default 10; 22 under a coarse pointer */ }   // answered by HitAnswer (file f item 466)
  | { kind: 'whereIs'; person: Id; day: string; hour: number }
  | { kind: 'relations'; person: Id; up: number; down: number }   // the family-tree view (COV-FTG-C11), from the relation store
  | { kind: 'inView'; view: ViewHandle }                          // the "features in view" list (COV-FTG-A24; the non-visual route, J-S19)
  | { kind: 'fates'; token: string; page: number }                // the full fate list of a pending confirmation, then its renames
  | { kind: 'why'; id: Id; path?: string; mode?: 'asPlaced'|'asNow'; historyPage?: number }   // item 101: the oracle — the rule, its inputs and the alternatives it weighed, from provenance and §2.8's derivation records; filtered under the caller's key (*Knowledge*, below); answered as `WhyAnswer` by the kind's `WhyProvider` and the registered section providers (§2.8)
  // the reader kinds of file f item 468 (M3a), each answered as its type below (ReaderAnswers):
  | { kind: 'brief' }
  | { kind: 'entity'; id?: Id; at?: PointCm; layer?: Layer; below?: boolean; dossierKey?: string }   // by address, or the top of the hit stack at a model point (item 466's order: a raised part above ground part 0); below: the next one down; dossierKey: by a binding key (file f item 583)
  | { kind: 'sites'; cls: string; near?: PointCm; radiusM?: number; district?: Id; k?: number /* 1–8, default 3 */ }
  | { kind: 'measure'; from: Id; to: Id; by?: 'straight'|'street' }   // default 'street' between two ground entities, else 'straight'
  | { kind: 'frame'; week: number; near?: PointCm; radiusM?: number; page?: number }
  | { kind: 'rule'; table: string; key: string }
  | { kind: 'profile'; cls: string }
  | { kind: 'links'; ids?: Id[]; region?: Box; good?: string; page?: number }   // g item 105 (j): the supply links bound by S10a/S10b's binding function, read from the generation worker's link cache (V09 §3.15), recomputed and never stored — `LinkRow`s (V09 §2.7) with each link's orientation, its declared link-edit row and a SettlementForge chain's status (file f item 460)
  | { kind: 'plan'; building: Id; storey?: number } | { kind: 'planReport'; building: Id }   // V03 §4.6: derives an absent or stale plan into the cache as a click does, logs nothing; knowledge-filtered by V03 §5.4's merge under §9.2's admission function at the building band (M6-P; file f item 457)
  | { kind: 'history.index' } | { kind: 'history.frame'; week: number /* a view state, not a model change */ } | { kind: 'history.diff'; w1: number; w2: number } | { kind: 'history.chronicle'; page?: number };   // V06 §4 (M6-E; file f item 458)
interface HitAnswer { ids: Id[] /* every mark under the point within the radius, top first by §8.2's draw order — a raised part above ground part 0 — one entry per entity */;
  sub?: { id: Id; path: string /* the sub-part under the point: 'spans/<ordinal>' of a raised way, 'crossings/<retaining wall id>' of a way, 'tiers/<k>' of a stepped building */ } }   // computed on the main thread from the hit-test slices (§8.9) within 1 ms
// The gazetteer's answer (§14's non-visual route; g item 120 (b), (g)–(i), J133): the list and search over what the document holds, Find's
// class counts and each chip's match listing — every row, count, match and gap computed after *Knowledge* (below) at the caller's key as at
// the city band, so a thing the key withholds is never suggested, counted, listed or hinted at (item 120 (h)).
type FindLayer = 'ground'|'underground'|'sky';   // the arena a row lies on: Find's Ground, Below and Sky (V10's FindAnswer reads it)
interface GazetteerAnswer {
  rows: { id: Id; kind: string /* the registry kind when withheld */; name?: string; withheld?: true; cls?: BuildingClass /* a use's or institution's class; absent when withheld */;
    district?: Id; layer: FindLayer; tier: FactTier }[];   // `text` matched against names, V11 §2.3's labels and synonyms and the dossier's names; `kinds` filtering; kind, then address order; ≤ 64 KB a page
  classes?: { cls: BuildingClass; count: number; layers: { layer: FindLayer; count: number }[] }[];   // with `counts`: each class of which the document holds an admitted use, its count per layer ("Blacksmith · 4"); a class it lacks is absent
  matches?: { chip: number /* its index in `chips` */; count: number; layers: { layer: FindLayer; count: number }[];
    byClass: { cls: BuildingClass; count: number }[] /* a word chip's split by class */; byArea: { area: Id /* the district a match lies in */; count: number }[];
    ids: Id[] /* this page's matches: the layer the caller names first, then address order */; none?: Id[] /* with `gaps`, a kind chip: V01 §5.4 (3)'s gap units' ids, ≤ limits.members */ }[];
  page: number; more: boolean }
// The reader's and the oracle's answers (file f item 468, M3a; declared here once — V10 §2.13 cites them). Every bearing and distance is
// measured from the growth centre (S3's root reservation, §4.2) in model metres and model north; every name, purpose and reference
// passes *Knowledge* (below) under the caller's key as at the city band.
type Bearing8 = 'N'|'NE'|'E'|'SE'|'S'|'SW'|'W'|'NW';   // the clerk's tool vocabulary reads this type (V10 §2.12)
interface ReaderAnswers { brief: MapBrief; entity: EntityCard | null; sites: SiteCandidate[]; measure: MeasureAnswer; frame: FrameAnswer;
  rule: RuleAnswer; profile: ProfileAnswer; why: WhyAnswer }   // QueryResult of a kind K here is ReaderAnswers[K]; every other kind's page is as its member's comment states
interface MapBrief {
  settlement: { name: string; tier: FactTier; tierWord?: string; product: 'base'|'village'; rung: string /* THORP … METROPOLIS */; population: number;
    form: string; era: string; band: string /* the population-weighted mean band */; dossier: boolean; week?: number;
    arid?: true /* the biome's climate row is arid (§4.2 S0): item 111's oasis chance, water pull and climate cell apply */;
    history?: { peak?: { rung: string; population?: number /* absent when the peak is symbolic */; symbolic: boolean };
      refounded: number; buried: number /* counted after the knowledge filter */ } /* item 113: §2.7's HistoryRecord, present when a replay ran */ };
  frame: { widthM: number; heightM: number; builtRadiusM: number /* the equal-area radius of the districts' union */; centre: Id };
  water: { setting: WaterSetting; coast?: { side: Bearing8 }; rivers: { id: Id; name?: string; enters: Bearing8; leaves: Bearing8 }[];
    lakes: { id: Id; name?: string; bearing: Bearing8; distM: number; spring?: true /* an oasis, item 111 */ }[]; harbour?: { id: Id; bearing: Bearing8 } };
  relief: { class: string; rises: { bearing: Bearing8; distM: number; riseM: number }[] /* the ≤ 3 highest */ };
  walls: { id: Id; kind: string; closure: string; gates: { id: Id; name?: string; bearing: Bearing8; way?: Id }[];
    open: { from: Bearing8; to: Bearing8; barrier: BarrierKind /* §2.7 */ }[] /* item 106: arcs a barrier closes */;
    runs?: Partial<Record<'standing'|'worn'|'patched'|'breached'|'dismantled', number>> /* item 114: the runs of Enceinte.condition by state (§2.7), present when any run is not standing */ }[];   // enceintes only: never a RetainingWall
  districts: { id: Id; name?: string; withheld?: true; kind: string; identity?: string; band: string; bearing: Bearing8; distM: number;
    areaHa: number; walled: boolean; buildings: number; households: number; neighbours: Id[]; declared: boolean }[];
  regions: { id: Id; name: string; members: Id[] }[];
  roads: { id: Id; name?: string; class: WayClass; ends: [string, string] /* a gate id, a district id or a bearing */ }[];   // part-0 ways only
  raised: { id: Id; name?: string; kind: 'viaduct'|'elevated'|'aqueduct'; source: 'generated'|'declared' /* file f item 244's derived value */;
    carriedSince?: number /* a generated way standing below CITY: the week the rung first fell below CITY with it standing, derived at
                             read from its lifecycle and the epochs' rungs (V06 §4.5); the info.raised.carried outcome reads the same */;
    reason?: 'drop'|'link'|'water' /* J-VI.2 */; ends: [string, string] /* ground way, gate or district ids */; crosses: number /* part-0 ways crossed */ }[];   // item 110 (b)
  terraces: { district: Id; walls: number; stepMaxM: number }[];            // item 110 (a): counts per district, never each wall (J-V10.77)
  decks: { host: Id; kind: 'bridge'|'pier'|'mole'|'quay'; plots: number; slots: ('head'|'mid')[] }[];   // item 110 (d): the deck plots and the free landmark slots
  landmarks: { id: Id; name?: string; withheld?: true; kind: string /* the registry kind when withheld */; district: Id; tier: FactTier; declared: boolean }[];
  layers: { islands: number;
    underground: { systems: { id: Id; kind: string /* II.7.6's system kinds, 'ruin' among them (V04 §2.2) */; name?: string; tier: FactTier;
      excavation?: 'accessible'|'unexcavated'|'lost' /* caverns, ruins and a buried former settlement; 'unexcavated' only at a secret key; 'lost' (item 113 (e)) to the key that admitted it while accessible (V04 §5.2) */;
      accesses: number; dwellings: number; source?: Id /* a catacomb's burial face or quarry working: CatacombComplex.source.ref */;
      rank?: number /* a catacomb's */ }[] } };      // computed after the knowledge filter; a crypt is never a system (it is its church's, V10 §3.9a)
  dossier?: { unplaced: { id: Id; name?: string; kind: string }[]; blocked: { id: Id; rows: string[] }[]; rejected: number };
  report: { belowFull: { feature: string; delivered: 'degraded'|'omitted' }[]; unplaced: number };
  counts: { plots: number; buildings: number; households: number; declared: number; clerkProposed: number };
  salts: Record<RerollableConcern, number>;   // §6.1's effective salt of each rerollable concern (the numbers DisplayList.salts carries); no name, no place:
                                              // read by the T11 and T12 encoders (V10 §4.1), never rendered in the map block
}
interface EntityCard {
  id: Id; kind: string /* the registry kind when withheld */; withheld?: true;
  name?: { text: string; tier: FactTier; displayText?: string };
  attrs: { path: string; value: string | number | boolean; tier: FactTier }[];   // the registry's readable paths, ≤ limits.attrs; a withheld entity's only where purpose is false
  where: { district?: Id; plot?: Id; quarterNode?: Id; bearing: Bearing8; distM: number };
  anchor: PointCm; bounds: [PointCm, PointCm]; groundCm?: Cm;                   // the caller's own geometry; stripped from every result a model or host sees
  lifecycle: { existence: Existence; locked: boolean; pinned: boolean; declared: boolean; assigned: boolean; clerkProposed: boolean };
  uses?: { id: Id; cls?: string /* absent when the use is withheld */; withheld?: true }[];
  members?: { id: Id; kind: string; withheld?: true }[];                      // item 108: a record's members, ≤ limits.members — the one owner of a record's members (V09 withdrew its query kind)
  excavation?: 'accessible'|'unexcavated'|'lost';                              // an element of a cavern or ruin cluster (V04 §3.5.7 (g); 'lost', item 113 (e))
  dossierKey?: string;                                                         // the binding key (§7.7 item 12): for V09 and a host reader; stripped from the model-facing projection (V10 §3.12 (3))
  hasBelow?: true;                                                             // entity { at }: another entity lies under this one in the hit stack (a street under a viaduct)
}
interface SiteCandidate { plot: Id; district: Id; score: number; hardFails: string[] /* row ids under the withheld rule */; pulls: WhyPull[] /* top 5 */; distM?: number }
interface MeasureAnswer { from: Id; to: Id; by: 'straight'|'street'; metres: number /* rounded to 10 m */; walkMinutes?: number /* street: metres ÷ 80 m per minute, rounded */;
  via?: Id[] /* street: the ways followed, key-filtered, ≤ 12 */; unreachable?: true }
interface FrameAnswer { week: number; epochWeek: number /* the frame locate(w) chose (V06 §3.15.2) */;
  entities: { id: Id; kind: string; name?: string; withheld?: true; state: string /* standing, begun, ruined … at that week */ }[] /* ≤ 64 per page, address order */;
  page: number; more: boolean; since?: { removed: number; added: number } /* against the current map, in the same radius */ }
interface RuleAnswer { table: string; key: string; says?: string; provenance: string; extension: boolean; readers: string[] /* stages and components */;
  citing: { count: number; ids: Id[] /* ≤ 16, key-filtered: an entity whose purpose the key withholds is absent and uncounted */ };
  register?: { status: CalibrationEntry['status'] | 'owner'; entry?: string /* absent for a stamped or ref: cell */; method?: CalibrationEntry['method']; due?: string }
    /* the cell's row in V12 §2.10's dist/evidence.json, where one exists; an absent file, or one of other table versions: the provenance source
       alone; told plain first, its entry and method only behind "details" (V10 §3.5) */ }
interface ProfileAnswer { cls: string; cells: { column: string; value: unknown; source: string /* family, class delta, custom-resolution rung */ }[] }
interface WhyAnswer {                                                          // the oracle's answer, produced by the kind's WhyProvider and the section providers (§2.8; item 270)
  id: Id; kind: string; withheld?: true;                                       // the oracle rule (1) below: a withheld target carries nothing more
  mode: 'asPlaced'|'asNow';                                                    // J-V10.44: the score as the rules computed it when they placed it, or as it stands now
  facts: { path: string; value: string | number | boolean; tier: FactTier; row?: string /* the DRn that derived it (§7.7 item 10) */ }[];
  cause: WhyCause[];                                                           // how it came to be, oldest first
  pulls?: WhyPull[];                                                           // items 103 (e), 107: the terms of its placement, largest first
  links?: WhyLink[];                                                           // item 105 (j)
  alternatives?: { plot: Id; score: number; hardFails: string[] }[];           // the closest sites weighed (§4.7 S10b), ≤ 3
  drivers?: FieldDrivers;                                                      // item 102 (f)
  closure?: { from: Bearing8; to: Bearing8; barrier: BarrierKind /* §2.7 */; class: string }[];   // item 106 (g)
  profile?: { rung: 'declaration'|'archetype'|'category'|'tags'|'library'|'keywords'|'fallback';
    sources: { rung: string; key: string; weight: number }[]; lowConfidence?: true };                                   // item 104 (a)
  members?: { step: LadderStep /* V11 §2.6 */; range?: [number, number]; count: number; ids: Id[] /* ≤ limits.members */ };   // item 108
  sections?: WhySection[];                                                     // what a volume's provider knows beyond these fields (V10 §3.9)
  history?: { seq: number; week?: number; kind: string; by: 'generation'|'user'|'clerk'|'host'|'epoch'; change?: { changeId: string; source?: string /* DossierChange.source, §7.7 item 13 */; reason?: string } }[];   // newest first, one page of ≤ limits.historyPage
  historyMore?: boolean; historyPage?: number;                                 // further pages by query why { historyPage } or read_map history
  removed?: { seq: number; week?: number; by: 'user'|'clerk'|'host'|'epoch' };  // a tombstoned address a live `delete` removed (V10 §3.9)
  evaluated: { logHead: string; drifted: boolean; exact: boolean; driftCause?: MsgRef };   // V10 §3.9 step 4
}
type WhySection = { kind: string /* registered with its provider: 'underground', 'crypt', 'raised', 'history', 'massing', 'plan', 'fabric', 'island', 'move' … (V10 §3.9, V10 §3.9b) */;
  rows: { key: string; value: string | number | boolean; unit?: string; tier: FactTier; row?: string /* a table row id */;
    says?: MsgRef /* V09's catalogue key with its slots */; ref?: Id; purpose?: true /* withheld with its entity */; withheld?: true }[] };
type WhyCause = { step: string /* a stage id or an event kind */; rule: string /* the rule's name in its home section */;
  slices: string[] /* SliceRef keys consulted, ≤ 8 */; seq?: number; chance?: string /* the concern whose draw chose among equals */ };
type WhyFamily = 'nuisance'|'need'|'clientele'|'supply'|'alignment'|'competition'|'coverage'|'sun'   // V11 §2.4's families
  | 'signature'|'spacing'|'class'|'district'|'field'|'character'|'allocation'|'chance'|'hard';      // the other terms of S10b's score
type WhyPull = { row: string /* V11 §2.4's derived-row id, or 'fam/<family>' under the withheld rule */; family: WhyFamily /* derived from row (V10 §2.13's family table) */;
  says: string /* the row's sentence: a family's says, a pair's reason, a class row's note, a supply edge's good (V11 §3.3.1, V11 §2.4) */;
  share: number /* signed share of the winning score */; target?: Id; withheld?: true; via?: Id /* a cross-arena term's landing access (V05 §3.20) */ };
type WhyLink = { good?: string /* absent when `other` is withheld */; role: 'provider'|'consumer'; other: Id; withheld?: true; distM: number; comfortM: number; maxM: number;
  orientation: 'source'|'market'|'balanced'; branchOf?: Id /* item 105 (h): a split works-and-shop */;
  declared?: 'bindTo'|'avoid'|'cut' /* a siting.linkEdits row pins, avoids or cuts it (item 105 (j)) */; via?: Id /* the landing a cross-arena link crosses */;
  chain?: { id: string; status: 'impaired'|'vulnerable'; entrepot?: 'consumer'|'provider' } /* item 105 (i): a SettlementForge chain's status and an entrepôt's end; V09's LinkRow.chain cites this type */ };
interface FieldDrivers { value: number; band: string;                        // item 297
  terms: { driver: string /* a driver of §4.5's field, 'daylight' (item 102) and 'water' (item 111 (b)) among them, or 'character', 'brush', 'epoch', 'chance' */; delta: number;
    sources?: { caster: Id | 'terrain' | 'walls' | 'buildings'; samples: number }[] /* daylight: V05 §4.5's per-island attribution */ }[];
  climateSun?: number /* item 111 (c): the climate row's sunlight cell that multiplies w_sun — 1 in temperate and cold rows, 0 or negative in hot arid rows */;
  since?: { driver: string; week: number; delta: number }[] /* V06's district provider: the term's change since that week, from the shade masks' history */ }
// @plat/api/node — the same API over worker_threads, plus by-value helpers for scripts and tests
declare function generateDocument(bp: Blueprint): Document;
declare function exportDocument(doc: Document, fmt: Format, opts?: ExportOpts): Uint8Array;
```

**Knowledge (item 30; J-A30.83, J-A30.85).** `query` answers of every kind — `gazetteer`, `people`, `whereIs`,
`relations`, `hit`, `inView`, `why`, `brief`, `entity`, `sites`, `measure`, `frame`, `rule`, `profile`, `links`, `plan`,
`planReport` and the `history` kinds — and hover content list every entity in scope with its kind, address and geometry, but
withhold the `name` and the purpose of a place (its `use`, or an institution's kind) that §9.2's admission function does
not admit, marking the row `withheld: true`; a person's workplace or
household that is a withheld place is given by its address only, and the person's profession is withheld with it where
that profession is the place's use. A view-bound reader (`hit`, `inView`, hover) admits at its view's band; `plan` and
`planReport` at the building band, through V03 §5.4's merge; every other kind, band-less, as at the city band, whatever
the caller's zoom (a view gives `inView` its box only). A
`gazetteer` row of kind `customChain` lists each ACTIVE `CustomChainRecord` with its label only when the key admits
every joined node (a relation, never a `withheld: true` row); an inactive one is not listed (V08 §5.2; file f item 410).
**Find's match listing (g item 120; J133).** A chip's matches are, by its kind: a **kind chip** — every entity holding
an admitted `Use` whose `cls` is among its classes, a building or plot on Ground, an underground or island entity on
Below and Sky (V04 §5.1's `underFindPlaces` and V05 §5.6 read their places), one match per entity whatever its uses; an
**address chip** — its target, a place, an institution or an area (a `FindArea`, V01 §5.4), or a person's household
dwelling and workplace (§10.3); a **dossier chip** — the address `entity { dossierKey }` answers for its key, else its
anchor (V08 §3.16 (6) (e)). A target the document no longer holds, or the key withholds, matches nothing and counts 0.
This listing is T120-2's definition of a chip's matches; V09's panel and `live.find`, V10's `FindAnswer`, V01's
`gapUnits` (its members) and V12's statistics read it, from the generation worker's Find index, rebuilt once per commit
(§12.5).
A `links` answer gives a withheld end by address and kind and leaves a concealed use's links out. A withheld entity
carries no purpose: its `kind` is its §2.8 registry kind, its attributes only the readable paths whose `purpose` flag is
false, a use of it has no `cls`, a row id authored on its class and a hard-fail naming it become `fam/<family>` with the
family's sentence, and a link to it carries no good. An element of a cavern or ruin cluster whose excavation reading is
`unexcavated` is absent — not withheld — for every key below `secret`, from every answer, count and list.
`EntityCard.anchor`, `bounds` and `groundCm` are for the caller's own geometry: a client that forwards answers to a model
strips them, and in host mode the module strips them before an answer leaves the frame (§11.3). An address whose entity
a live `delete` tombstoned answers `why` with its registry kind, a `removed` cause and `removed { seq, week, by }`, and
`entity` from §2.8's `Tombstone.last` — the record's kind, name and shape, and the fields a re-declaration reads (a
way's class, width and `raised`; a wall's kind and `closed`, a retaining wall's `highSide`; a gate's enceinte; a
building's class and its plot; a deck plot's deck host and slot ordinal) with `removed: { seq }` (file f item 467) — to a
key that admitted it before; to any other key it is an unknown address. `entity { at }` answers the top of the hit stack
at the point (`HitAnswer.ids[0]`; a raised part above ground part 0) and, with `below`, the next one down;
`entity { dossierKey }` answers the address of the `DossierBinding.rows` row whose `dossierKey` it is (§7.7 item 12), at
the query's seq, as that address's `EntityCard`, `withheld` as for any address, and `null` when no row holds the key or
the document has no binding (file f item 583). **Lowering (file f item 572).** `admitAs` only lowers: an answer, and a
filtered dry run's fates, renames, actions, bend lines, created addresses and effects, admit exactly what both the
caller's key and `admitAs` admit — a tier given alone is read with the caller key's `places`, a key form `{ tier, places }`
is a key in its own right — so a client never raises what its key admits (J-A30.82). A view's `ViewOpts.viewAs` is the
same lowering for that view's own reads; a client that speaks for a view passes the view's effective key as `admitAs`
(`'secret'` at that tier, else its key form) — the built-in clerk on its band-less reads and its dry runs, an application
on its band-less reads; an application's own dry runs, which its user confirms, stay at the role's key (V09 §2.7).
**`filtered` (file f item 470).** With `filtered`, a dry run's fates, renames, conflict actions, closest options, bend
lines, created addresses and effects are rendered under the caller's key by these rows (a withheld place by address and
kind, a concealed use and an unexcavated element absent, an effect left with no admitted target dropped); its messages
are `MsgRef`s, so a filtered result never carries a withheld name. **The oracle under the key (items 63 (c), 101 (d); J-A101.85).** A `why` answer is filtered by the same function
and never says more than the rows above: (1) a `why` on a place whose name or
purpose the key does not admit gives its address and kind only, marked `withheld: true`, with no rule, input or
alternative; (2) in any other answer, a rule, input or alternative that is such a place — a relation row's target, a
supply edge's end, an alternative site — is given by its address and kind only, marked `withheld: true`; (3) a concealed
use the key does not admit is left out of every answer, as §9.2 leaves it out of the drawing and §11.1 out of every file:
its relation and supply rows, its lineage's draws, its concealed parts and the alternative sites its pair was scored at
name nothing and are not counted, and a `why` on one of its parts answers empty, as for an address the document does not
hold; (4) a front's `why`, for such a key, is the front's own — the oracle's answer for the front's class alone at that
plot: its hard rows, which the site passes, its soft rows scored there and the closest acceptable sites that class alone
would take, evaluated by the oracle from the same tables over the committed model, read-only, as it finds any building's
alternatives — so the answer has the form of every other building's and the front reads as the front (item 63 (c)); a
key that admits the concealed use reads the pair's own derivation whole. **`preview` is an editing role's call**, as
`edit` is (§11.3's roles): a viewer's `preview` is refused (`status: 'refused'`, `reason: 'role'`) with nothing computed,
since an unfiltered preview returns the dry run's fates, renames, counts and shape. `fates` pages and a `confirm` result
go only to an editing role, unfiltered: `confirm` needs the lists back unchanged (*Confirming fates*, below), and an
editing client holds the document it loaded (`open`, above, or §11.3's `doc.load`), for which the key is no secrecy
boundary (§11.1). A content provider (§14) answering through `query` gets the same filtered rows. A host that holds the
dossier knows every place already (§11.4); a viewer learns one only by
the host raising its key (§11.3), never by asking. **Tiers (item 20
(h)).** Every row of every answer marks each fact it gives with its tier by §2.8's `factTier`, and a `why` answer names,
for a derived fact, the derivation table's row that made it (§7.7 item 10); a label's display text is given beside the name (§9.1).

**Variations (file f item 461).** With `variations: 3` a derived fill's dry run returns §7.3 item 10's three overlays in
the `ok` branch as `previewId` and `variations`, `page` advancing past the rerolls used (§5.1 (6), within
`reroll.maxAdvance`) and `focus` choosing the overlay drawn as `live.ghost`; the overlays are held in the generation
worker until the draft commits or cancels, and `thumbnail` rasters one. A clerk's alternatives are separate `preview`
calls, one per variation. The committed form of each source is §7.3 item 10's.

**Confirming fates.** An action whose dry run (§7.1) must be confirmed under §7.3 item 4 — protected entities in
its effective scope (Re-derive from Sk, Adjust of an early parameter, a regeneration over locked, pinned, edited or
assigned entities, "discard edits in scope"), or case-(4) renames (§6.3), including an `unlock`, `unassign`, `undo`,
`redo` or `revert` that frees a name — returns `confirm` with the fate of every protected entity, every listed rename
and a **token** = H128(the document's `logHead` ‖ the canonical bytes of the event without its fates and renames).
Nothing is committed. `confirm(h, token, fates, renames)` commits the event with those fates and renames when the token
is still current (the `logHead` has not moved) and the fates and the renames equal the dry run's lists; if the state
moved it re-runs the dry run and returns a fresh `confirm`, and a changed list is never committed silently. Resubmitting
the event through `edit` with its `fates` and `renames` filled is the same operation — the engine commits when a fresh dry
run computes the same fates and renames and otherwise returns `confirm` — which is how a host bridge carries a confirmed
action (§11.3). "Discard edits in scope" is a new request (`regenerate` with `discardEdits: true`) with its own
confirmation. `cancel` drops the token (J-R33).

**The clerk's tool API (item 101 (b), (d); R10, R19; J-A101.83, J-V10.39).** The tool API a clerk — SettlementForge's
assistant driving it (V10 Q2: J121, J122) or the built-in clerk (M3c) — drives is this API and the reader kinds, scratch
documents and dry-run options added for any client (the `why` extension and the seven reader kinds, `scratch`,
`filtered` and `variations`; file f item 471): the declarations
are §7.1's events and sugar events through `edit`; the reader is `query`; the **oracle** is `query({ kind: 'why' })`,
answered from provenance and §2.8's derivation records — the rule, its inputs and the alternatives it weighed (the
closest acceptable sites of §4.7 S10b, the rows a derivation fell back through, §7.7 item 10); and a proposal is a
`preview` — the dry run's fates, renames, counts and derived shape, drawn as a ghost in the viewer's view (§8.2's
`live.ghost`), nothing committed — which the user accepts as an `edit` carrying `proposedBy: 'clerk'` or drops (J-A101.74,
§7.1); a bridged host's clerk asks for it by §11.3's `preview` message (J-A101.86). A clerk is a client like any other: it holds a role and a knowledge key given by its host (§11.3), so it never
bypasses the dry run or the undo, never writes a dossier fact (a `dossier-owned` refusal stands, §5.2) and reads and says
only what its viewer's key admits — its `why` answers and its `preview`s by *Knowledge* above (§9.2). Its transcript of `edit` calls is a skeleton (§11.1).

| call | crosses | copy or transfer | bound |
|---|---|---|---|
| `generate` | in: the blueprint (a `signal` stops it); out: the handle, progress events | copy | < 64 KB; < 1 KB per event |
| `open` | in: the document bytes; out: the handle, progress events (`migrate`, then `verify`) | transfer; events copied | the document's size; < 1 KB per event |
| `edit`, `regenerate`, `adjust`, `confirm`, `undo`, `redo` | in: events or a token with fates and renames; out: `ApplyResult` — `ok` (the new `logHead`, count of changed addresses), `conflict` (the outcome and its actions) or `confirm` (token, the first 1 000 fates, the renames, counts per fate, the resolved scope); `regenerate` and `adjust` progress events, and `edit`'s for a group of `undo` or `redo` events | copy | < 64 KB per batch; longer fate lists by `query({ kind: 'fates' })` pages; < 1 KB per event |
| `preview` | in: events; out: `PreviewResult` (the ghost reaches the view as a `live.ghost` delivery, §8.9) | copy | < 64 KB; the preview's time §12.6's |
| `thumbnail` | in: a preview id, a variation, a box, a size; out: an `ImageBitmap` | transfer | ≤ 160 × 120 CSS px at the view's DPR; an export-class job (§8.9) |
| `scratch`, `forkAt`, `rerunFrom` | out: a new handle | copy | < 1 KB; the document stays in the generation worker |
| `advance` | in: an `AdvanceRequest`; out: `ApplyResult` — or the dossier-clock conflict on a dossier-bound document —, progress per epoch (`Progress` `epoch`) | copy | < 64 KB; V06 §6's time |
| `setViewOpts` | in: a `ViewOpts` patch | copy | < 1 KB |
| `registerProvider` | in: the provider's id, version and module URL; out: `ok` or `refused` with its reason | copy | < 1 KB; the module loaded once per worker, the check's two runs §6.5 (8)'s |
| `query` | out: one result page | copy | ≤ 64 KB |
| `view` | out: composed tile bitmaps and hit-test slices (§8.9) | transfer | ≤ 1 MB + 64 KB per tile |
| `export` | out: the file bytes, progress per band (`Progress` `export`); a `signal` stops it | transfer; events copied | the format's size; < 1 KB per event |
| `subscribe` | out: `ApiEvent`s (`doc.changed`, `view.changed`, `report.changed` — the `changes` entries of §5.4's `GenerationReport` appended since the last delivery, a dossier event's entries naming its `changeId` and reason (§5.4; item 75); items 17–22) | copy | < 64 KB |

The headless path runs the same worker code, and its model hash equals the browser's (text is not in the model, §9.1);
ids cross this boundary as `<docId>/<id>` (§6.3). The derivation pool uses transferred copies, never `SharedArrayBuffer`
(§3.3), so no embedding host needs cross-origin isolation for generation; the tile worker's optional shared columns
(§8.9) remain the only use of shared memory. **Engine (§3.7, SCL-22):** the product bundle has no WebAssembly dependency;
if M0 triggers the kernel's pre-decided fallback (Clipper2-WASM as the single engine), WebAssembly becomes an embed
requirement and a host without it receives the API error `E_ENGINE_UNAVAILABLE` from `generate` and `open` (not a kernel
result, §3.1).
=== END ===

=== REPLACE ### 11.3 The host bridge — the host is the store (FTG-12) ===
### 11.3 The host bridge — the host is the store (FTG-12)

* **Transport.** `interface BridgeTransport { send(msg: BridgeMessage): void; onMessage(h: (msg: BridgeMessage) => void): void }`.
  Shipped: `WindowPostMessageTransport` (iframe hosts; a fixed target origin; incoming origins checked against the
  embed's allowlist, and — item 85 (d) — the message's source window checked to be the embedding window it was bound to,
  so a second frame of the same origin cannot speak for the host) and `MessagePortTransport` (any relay — a
  browser-extension content script, a SharedWorker, a chat-bus relay; COV-FTG-N06). Envelope:
  `{ plat: 1, type, session, seq, re?, logHead?, body }` — `re` on every reply (`query.result`, `preview.result`, `export.ready` /
  `export.refused`, `doc.applied` / `doc.rejected`) is the `seq` of the request it answers, so a host with several
  requests in flight matches each answer to its question (item 85 (d)); host messages that arrive before the module has
  sent `ready` are queued and delivered in order after it, never dropped. **SettlementForge's configuration** is the module
  in an iframe on its own origin — which origin follows SettlementForge's own hosting decision, read as an input (J121;
  V08 Q1) — speaking through `WindowPostMessageTransport` (item 85 (e)); a worker or a service
  remains the configuration for other hosts (J-A85.82). The bridge is the module's
  boundary with a host program, SettlementForge in its owner-staged phase included: its messages carry data only — a
  dossier's events in, the map document and its report out — and never code, so no message registers a content provider
  (§11.4's door (4); J-A85.83), and the module stays a separate program in its own bundle,
  loaded in a worker, an iframe or a service (item 21 (d): a design choice that keeps the seams clean and every later
  licensing choice open, §17.3; J-A21.81).
* **Vocabulary (our own terms, FTG-22).** Host → PLAT: `doc.load { bytes | ref, role, session }`,
  `doc.apply { baseLogHead, events }`, `view.set { patch }` (a patch of the view keys that travel, or `select`, the
  host's selection command; *View state*, below), `export.request { fmt, opts }`, `query { q }`,
  `preview { events, view?: boolean }` (item 101 (b): a clerk's proposal; J-A101.86) — `true` draws the ghost as
  `live.ghost` in this client's own view (§8.2), which stands for §11.2's `ViewHandle` since a bridged host holds none,
  and `false` or absent computes the dry run alone. PLAT → host:
  `ready { outputVersions, schemaVersion }`, `doc.changed { baseLogHead, events }` (a local user's proposed events),
  `doc.applied { logHead }`, `doc.rejected { reason: 'stale'|'invalid'|'role'|'version', currentLogHead, conflicts? }`
  (`conflicts` as §11.2's conflict member: `{ outcome: MsgRef; actions: ConflictAction[] }`),
  `view.changed { patch }`, `entity.selected { id, kind }`, `export.ready { bytes }` or `export.refused { error, message }`
  (an API error of `export`, §11.1's `E_KNOWLEDGE_TIER` among them), `query.result`, `preview.result { result }` (§11.2's
  `PreviewResult`: the dry run of the events for an editing role, nothing committed, the ghost drawn as `live.ghost` in the
  requesting client's view when `view` is `true`; a viewer's answered `refused`),
  `report.changed { entries }` (§11.2's report event; a dossier event's entries name the `changeId` and the reason of the
  change that caused them, so the host sees why — never a request back; item 75). **The port's vocabulary (SettlementForge
  stage; file f item 472; the types are V08 §2.2's).** Host → PLAT gains `dossier.offer { dossier, dossierHash, host?,
  create? }` and `doc.snapshot {}` (owner or editor only; a viewer's either answered `doc.rejected { reason: 'role' }`),
  `host.state { party?, backups?, partyPicturesAt?, playersView? }` (owner or editor sessions only; kept in the
  session's memory — never in the document, its view state or a save; `playersView` sets the frame's `ViewOpts.viewAs` to
  the party key, never the view's knowledge key) and `party.render { party, since? }` (owner or editor only, a viewer's
  answered `doc.rejected { reason: 'role' }`; not an export: the module resolves `party` to a key form, draws the party
  picture set under it as `knowledge` and lists its
  gazetteer under it as `admitAs`, V08 §3.14); `doc.load` becomes `doc.load { bytes | ref, role, session, audience? }` —
  the module derives role and key from the audience word by §14's table and takes the LOWER of that and `role`;
  `export.request` becomes `export.request { fmt, opts, displayNames?, knowledge?: Admission, bundle?: true }` (§11.1's
  *Knowledge*: `knowledge` lowers the requester's key for that export only; `displayNames` as §11.1's *Display names*);
  in host mode the module answers an `export.request` for any format other than `png`, `svg` and `print` with
  `export.refused { error: 'E_HOST_FORMAT' }` (V08 §5.4), save a `bundle: true` request for `dd2vtt` or `foundry` (the
  export bundle from M-SF, §11.4; V08 §5.4 (2)), rendered under the calling key's §11.1 rules and answered
  `export.ready { bytes }`; `bundle` with any other format, or those formats without it, is refused; neither rule applies
  to `doc.snapshot`. PLAT → host gains `dossier.result { status,
  dossierHash, baseLogHead?, events?, encoded?, seqAfter?, logHeadAfter?, created?, factHash?, week?, report, held? }` (a
  reply carrying `re`; `held` is `{ code, message, reason }`, a `host.held.*` row of V08 §3.9), `doc.snapshot.ready {
  bytes, logHead, lastSeq, outputVersion, schemaVersion, documentDigest }` (a reply), `module.status { phase, detail?,
  progress?, outputVersion? }` (a push; `detail` a `host.*` catalogue key), `host.action { action: 'refresh' | 'restore'
  | 'newMap' | 'reveal' | 'hide' | 'partyTier' | 'assistantSettings', args?: { places?, undo?, tier? } }` (a push from an
  owner's or editor's frame only, which the host runs as V08 §4.2's row says) and `party.rendered { status: 'rendered',
  set } | { status: 'unchanged' }` (a reply; the set V08 §2.1's `PartyPictureSet`, stored as handed); `ready` becomes
  `ready { outputVersions, schemaVersion, protocol, adapters: { line, version }[] }` and `doc.changed` becomes
  `doc.changed { baseLogHead, events, encoded, seqAfter, logHeadAfter }` — each event's canonical CBOR in order, the last
  seq and the head after them — so the host stores what it is handed and computes nothing. **The clerk's configuration
  (M3c; file f item 473).** Host → PLAT gains `clerk.config { mode: 'off'|'builtin'|'host'; transport?: { baseURL: string;
  token: string; expiresAt: number; fallbacks?: 'server'|'client'|'none' /* absent: server */ }; capUsd?: number }` (V10
  §3.17: `off` — the default until one arrives — hides the built-in clerk, `builtin` shows it on the user's key or,
  with a transport, through the host's proxy, `host` hides it because the host's own clerk drives the map; the
  transport's address must be `https`, on the embed's origin allowlist and in the page's `connect-src`, else
  `clerk.config.refused { reason: 'origin' }`; the token is held in memory only), and `preview` gains `proposal?: { id:
  string; reason: string; variations?: { label: string; events: EditEvent[] }[] }` — shown as a proposal card in the
  frame, one waiting proposal per session, a viewer's `preview` still refused; PLAT → host gains `clerk.needsToken {}`
  (sent before the token expires or when it is refused; the host answers with a new `clerk.config`) and `clerk.proposal
  { id, status: 'accepted'|'dropped'|'stale'|'failed', seqs? }`. In host mode the module applies the **host projection**
  to every `query.result` and `preview.result` before it leaves the frame — V08 §5.4 (3)'s rows for the base's kinds and
  the preview reply, V10 §3.17's rows for `brief`, `entity`, `sites`, `why`, `frame` (without `near` and `radiusM`),
  `rule` and `profile`; `measure`, `hit` and `inView` are answered `query.result { error: 'E_HOST_KIND' }` (correlated
  by `re`) — so no length, bearing, extent or coordinate reaches a host (door 1, J86). The AI key or relay, the assistant
  and its model tier follow SettlementForge's own decisions, read as inputs (J121; V10 Q1–Q3). **One way (items 20, 22; J-A20.81).** No PLAT → host message writes,
  patches or proposes a change to the host's dossier: `doc.changed` carries map-document events only, `report.changed` the
  map's report, and the vocabulary has no message that addresses the dossier; a dossier change reaches the map as
  `doc.apply` events with `author: 'host'` and `EditBase.dossier` set (§7.1, §7.7, §11.4), in the host's order — the ordered
  dossier history of item 22 (c) — and the host stores the returned document as an opaque artifact of the map (item 20 (d)).
* **logHead** = a 128-bit hash of (document id, edit-log length, hash of the last event), in hex (our own term, FTG-22).
* **Convergence.** The host holds the canonical document and log. A client sends its user's edit as `doc.changed` against
  its `baseLogHead`; the host accepts only when that base is the current `logHead` — it appends the events, advances the
  `logHead` and fans `doc.apply` out to every client, the sender included — and otherwise answers
  `doc.rejected { stale }`; the client then applies the host's pending `doc.apply` messages, re-runs its own events
  through the dry run (§7.1) on the new state and sends them again, or shows its user the conflicts. An action that needs
  its fates confirmed (§7.3 item 4, §11.2) is sent only after the local user confirmed them, as an event carrying its
  `fates` and `renames`; if the state moved underneath it, the client's re-run returns a fresh confirmation for its user
  instead of resending, and every other client replays the event with those fates, reporting a mismatch if it computes
  different ones. A dossier offer's commit follows the same rule: the host appends a `dossier.result`'s encoded events
  only when its `baseLogHead` is the current head (V08 §3.3); the host verifies that one equality and stores the rest as
  handed. Every client applies the same events in the host's order on the same output version, so every client's
  model hash is the same (§6.2) — after a load mismatch, once the owner has chosen (§2.9 step 4). **Test (M3a):** a host
  and three headless clients applying 1 000 interleaved random events — undo and redo from every client and one owner
  undo through a chain among them — converge to one model hash with 0 lost accepted events; and one forced load mismatch
  settled by an owner's keep while two editors edit on the replayed town: all four converge to one model hash, the
  editors' events re-applied on the saved town.
* **Version handshake.** On `doc.load` the client compares the document's **`outputVersion`** (§6.4) — not the generator
  version — with the output versions it can replay (announced in `ready`); when it cannot, it opens the snapshot
  read-only (its role drops to viewer, and it says so) as §2.9 step 2's frozen view does — checked by its chunks' content
  hashes only and labelled "made with o<k>; not verified by this version", never reported as a mismatch — and it never
  replays under another version silently.
* **View state.** Every view key of §2.9 (its view section, outside the model hash; each last-writer-wins by (Lamport
  counter, session id)) travels as `view.set` / `view.changed`, except the pointer that moves the cursor sun, the
  `underlay` image (§9.5), the weather spell in force (item 124; session state) and the per-viewer keys a viewer's client
  keeps — `yearWeek`, `seasonFollow`, `festival`, `cvdVariant`, `find` and `crises` (§2.9), `thematic`, `workingLayer`,
  `showUnexcavated` and V09 §4.19's per-viewer keys —, which never cross the bridge; `knowledge`, which the host sets per
  viewer (below; J-A30.82), travels. The key `time` is set by `view.set { time }` and advanced by the module-tier message
  `sim.advance { hours }` (§10.3). **The host's view commands (item 125 (c); J139).** A host drives the view as a user
  would — a week (`view.set { week }`, item 67), the layers shown (`view.set` of the view's layer choices, §8.4's
  `LayerSpec.visible`), a selection (`view.set { select: ids }`: the frame selects those entities as a user's list pick
  would, leaves out an id it does not hold or the viewer's key does not admit, and reports the selection by
  `entity.selected`; a command, never a stored key) — and these are commands, never inputs: the map never needs them, and
  no document a dossier makes depends on them (§11.4). **The host's clock (item 67; J-A67.82).** The clock the design calls
  "the simulator's" — the one whose weeks move the map's history — is the host's: its advance reaches the map only as
  dossier events and epochs, which the port dates and groups by §4.11's week and cadence (§7.7 items 1 and 6; §11.4),
  and a host shows its campaign's current week by `view.set { week }`; the module's `time` key counts hours and never
  moves the map (§10.3). A viewer's `knowledge` defaults from its role — `owner` and `editor`
  `secret`, `viewer` `public` — the host may set any viewer's key by `view.set`, and a client never raises its own tier
  above the one its role or the host gave it, so a player learns a secret place when the game master says so (J-A30.82).
* **Style is canonical; the preset a viewer looks through is not (N-15).** The document's style (§2.9 `style`: the sheet
  and version, its row operations, the ground-cover regions) changes only through logged `setStyle` events, which the
  bridge carries in `doc.changed` / `doc.apply` like any edit and which only the `owner` and `editor` roles may send. The
  view key `stylePreset` is a per-viewer choice of preset (for example a player looking at the `lit` family while the
  document is drawn in `ink`): it never writes `setStyle`; the chosen preset replaces the document's sheet for that viewer
  only, and the document's own rows (thematic overrides, ground-cover regions) apply on top where the preset has the roles
  they name, the rest listed in that viewer's style dialog (J-R34).
* **Roles.** `owner` | `editor` | `viewer`, given by `doc.load` — for SettlementForge by the audience table of the port's
  host glue (DM, co-DM, player, anonymous; §14, item 85 (f)), SettlementForge's accounts and audiences read as inputs
  (J121), never a rule of the model. A viewer's client never emits `doc.changed` (model edits
  are disabled in the UI and dropped by the bridge) and emits only the view changes the host allows; the host enforces
  the roles as well. The host assigns one session per user and document and passes it on every load; a bridged client
  never mints a session or writes the `session` view key (§7.4). **Bridged load verification.** Load verification
  (§2.9 step 3) runs while the client's user edits; on a mismatch only an `owner` client may keep the saved town (a
  `rebase` sent like any event; J-DET-42); every other client takes the replayed town for its own working state,
  reports the mismatch, records its root at `h₀` and keeps the `doc.load` bytes (≤ 3 MB at CITY, §2.9's size budget;
  counted in §12.8) until the mismatch is settled or its session ends; when the owner's `keptSnapshot` rebase arrives it
  installs the saved town from them and re-applies the events after `h₀` (the install mechanics: §2.9 step 4); under
  §6.2 (iii) its comparison of its own root with the owner's `stateDigest` waits for its load's recomputation, a client
  still verifying stops, and a client that loads after the owner's choice takes the saved town as its base without
  asking — so every client converges on the owner's choice.
* **Logging (LC-31).** Every model change over the bridge is a `doc.apply` of `EditEvent`s, logged one to one — a host's
  own commands with `author: 'host'` (§7.1's `EditBase`); no bridge command changes the model any other way. Undo and
  redo are `EditEvent`s (§7.4): they travel as `doc.changed` and `doc.apply` like any other event, the envelope's
  `session` is their `EditBase.session`, and a client never truncates a bridged log. A provider output refused at §2.9's
  cap returns the requesting edit as `doc.rejected { reason: 'invalid', conflicts }`.
=== END ===

=== REPLACE ### 11.4 Host inputs (DEF-11) ===
### 11.4 Host inputs (DEF-11)

A host may supply input only through these doors: (1) blueprint fields — seed, rung, population, intent, the district intents (`districtIntent`, §7.7 layer 2),
circumstances, assignments — to `generate`; (2) edit events through the API or `doc.apply`, which are logged — a dossier change arrives as such events with
`author: 'host'` and `EditBase.dossier` set (§7.1), in the host's order, and mutates the current map under §7.7's dossier
contract (items 20, 22); a dossier's designation of a place as `local` or `secret` is one such input
(`Assignment.knownTo`, §7.7, which §9.2's label policy reads), and the module never writes to the dossier (§11.3's
*One way*); (3) tables,
presets and styles as `editTable`, `editPreset` or `setStyle` events, whose content is copied into the document with
provenance `host` (source, date, version), so the document replays without the host; (4) a `ContentProvider` (§14)
registered by `registerProvider` (§11.2) — the embedding page's own call or a script's, the bridge carrying data and never
code (§11.3; item 21 (d); J-A85.83) — accepted only after a **double-run check** (at registration it runs twice on the same input and stream; the two
outputs must be byte-identical, else it is refused), with every output it produces for a document recorded in the
document's `hostContent` block, keyed by (provider id, version, input hash), and read from there on replay; an output
that would pass §2.9's cap on pack data and host content is refused at the call as §2.9 states. So a document never needs
its host to replay, and host code — which the model packages' lint (§6.5) cannot reach — is made deterministic by the
check and the record.

**A dossier comes through the port (items 73–87; §14).** For a dossier, door (1)'s blueprint and the log's creation
prefix, and door (2)'s events and epochs, are produced by `@plat/port` (§14, item 73) from the whole dossier, **the
port's only data input** (item 125 (a); J139): the map reads SettlementForge only through it — never its campaign state,
simulator, derived reads, realm map or code — and every fact it uses comes from the dossier where the dossier carries it,
else from the fallback the generator takes, exactly as on a map made without a dossier, the fallback reported and never a
refusal (item 125 (b); §7.7's derivation table, DR1, DR3, DR19, DR29 and DR42 among its rows; the week by §4.11 *The
clock*). Beside the dossier a host may pass three fields of `HostContext` (§14), none a data input and none able to change
a document a dossier makes: `audience` (the role and knowledge key it sets per viewer, view state that travels, §11.3;
J-A30.82), `displayNames` (inside one export request, never stored, §11.1; item 85) and `line` (which adapter reads the
dossier; with none, the dossier's own version stamps pick it, and a `line` no adapter supports, or one the stamps
contradict, refuses with `E_LINE_UNSUPPORTED`); the week, the realm and a custom library are never host inputs, a custom
definition reaching the map only from the dossier's own entries (§7.7 item 1). A host's view commands (§11.3) stay
commands. The port's adapter imports and reads nothing but the dossier (T125-3). SettlementForge's map comes through doors (1) and (2), which the port produces;
door (3) stays open to it as to any host — logged table, preset and style events over the bridge — and door (4) is the
in-page embedders' and scripts': `registerProvider` loads a provider's code into the module's workers, while the bridge
through which SettlementForge's configuration speaks — the module in an iframe on its own origin (§11.3) — carries data
and never code (J-A85.83). The port's refusals by population and its routing to a registered village product are §7.7
item 15's and §1.1's (item 81; file f item 202); §1.1's clamp serves only a request that carries no dossier. Door (2)'s
events carry §7.7 items 12–13's binding key and change envelope (items 74, 75), dated and grouped into epochs by §4.11's
week and cadence.
**Optional only (item 20 (h) (iv); J-A20.79):** every field these doors accept beyond what the dossier holds today is
optional — a stable id, a location hint, a class; whatever the dossier does not give, the map derives by §7.7's
derivation table; no door, message or report asks the host for a fact. What a host's data the module never reads is
§7.7 item 1's list (item 86), and the port's adapter reports every key it dropped. A host's own undo arrives as a
dossier change like any other and converges by the solver's order; the port's report names the earlier absorbed state
the dossier now equals, `state_matches_absorbed` (§7.7 item 5; item 87). **No door opens the other way (owner, J86 Q2;
J-A73.81):** the host's simulator never reads the map's geometry — the module writes no geometry, layout or district
read for the host (door 1 stays closed); because the map follows purely from its seed and the ordered dossier history
(§7.7 item 6), opening it would need no redesign, and it opens only on the owner's explicit word. **The export bundle
(V08 Q3: J122).** From M-SF the host client gains one call returning the user's chosen scene exports
(§11.1's `.dd2vtt` and Foundry scenes, rendered at the export's knowledge tier and admitted by the calling key) as
opaque byte blobs for SettlementForge's export bundle, which SettlementForge packages unread; before M-SF maps export on
their own. No call returns a structured format — the bundle call returns opaque blobs only — so door 1 stays closed
(J86); V08 §5.4 states the call and V08 §7 its test. The port's wiring to a live host bridge is built with the
SettlementForge stage (SF0–SF7, V08 §8); the port itself is §14's, its creation half built at M1 and its absorb half at M3a (§16).
=== END ===

=== REPLACE ### 11.6 Edges (principle (11)) ===
### 11.6 Edges (principle (11))

| id | mechanism at its limit | defined outcome and rung | test |
|---|---|---|---|
| T-ER-19 | every format (§11.1) at every rung, THORP to the cap, a fixture holding a wall run in each condition (g item 114) among them; degenerate geometry (none in the model, §3.1; faces written without antennae, §11.1; an antenna: §3.6 rule 3); the `.dd2vtt` scope over 8 192 px | each row's mapping — a wall run's `condition` and `material` in GeoJSON, glTF and CityJSON, a `patched` run a wall and a `breached` or `dismantled` run an opening in the VTT scenes; a larger VTT scope split into a grid of scenes or the pixels per square lowered (≥ 50), the dialog showing the choice | each format at THORP, TOWN, CITY, the METROPOLIS target and the cap: validators pass, sizes within §12.7 and §12.8; the wall fixture's runs as stated in every format |
| T-ER-20 | the API's caps (§11.2): a page over 64 KB, more than 1 000 fates, 256 created addresses, 50 effects, three alternatives, three variations; every rung | paginated (`query` pages, `fates` pages); the counts beyond the first given (`effectsMore`); the API identical at every rung | a scripted client at each rung: every list complete across its pages, the counts correct |
| T-ER-21 | host inputs (§11.4): a host passing nothing beyond the dossier; the same dossier with and without a host context (`audience`, `displayNames`, `line`; g item 125); a dossier holding only SettlementForge's required keys; a `line` no adapter supports, or one the dossier's stamps contradict; a host's view commands (a week, the layers shown, a selection); one event; a provider output over §2.9's cap; contradictory dossier data; every rung; save and replay | derived by §7.7's table; the identical document and hash (`item125.host`); a full map, every absent field reported with the fallback taken, never a refusal; `E_LINE_UNSUPPORTED`; view state that travels, never an input; applied as any event; refused as `doc.rejected { reason: 'invalid' }`; §7.7's contract; the port's refusals and routing (§7.7 item 15); door (3)'s events replay without the host | a host fixture of each: the document replays byte-identically without the host; T125-1 and T125-2's bars; the adapter's static check of its imports and reads (T125-3); the refusals as stated; a provider failing the double run refused `nondeterministic` |
=== END ===

=== REPLACE ### 12.1 Reference hardware and how budgets are measured (SCL-15) ===
### 12.1 Reference hardware and how budgets are measured (SCL-15)

* **Reference machine:** Apple M1 (4 performance + 4 efficiency cores) in a MacBook Air (MacBookAir10,1, fanless), 16 GB,
  macOS 14.7, Chrome stable and Node 24 — the machine on which every MFCG, FTG and NG bar in this document was recorded
  and the named mechanisms were timed (redteam-scale §7). The capture record (`captures/mfcg/2026-09-21T11-25-32/meta.json`)
  holds the CPU, 8 cores, arm64 and Node v24.12.0 but no memory size and no Chrome version; the model, memory and OS were
  read from the same host on 2026-09-25 (`fixall_rendering_r2_host.out`, N-27 b). Because the host is fanless, every
  timing batch starts after 30 s idle and runs ≤ 60 s, with `bench/calibrate` before and after it; a batch whose two
  scores differ by more than 5 % is re-run.
* **Low-end device** (O12 b's ≥ 30 fps clause; the `low` hardware tier): Intel Core i3-10110U (2 cores, 4 threads, UHD
  Graphics 620), 8 GB, Chrome stable — or any machine whose calibration score is within ± 15 % of it.
* **Calibration benchmark** (`bench/calibrate`, fixed inputs): 5-octave fBm over 256² cells, a bucket-queue priority flood
  over 256², a 20 000-node Dijkstra, a 100 000-element typed-array sort, and, in browser runs, a Canvas2D raster of 32
  fixed tiles (≈ 40 ms; the part that also picks the hardware tier at app start, §8.8), and in browser runs with a GPU a
  **GPU probe** — §8.4's light pass at full precision over a native-4K view (3 840 × 2 160 device px) of the same fixed
  tiles. The **ultra** tier (g item 121 (c); J134) is picked only where the host reports at least 8 GB of device memory
  (the browser's `deviceMemory`, whose largest reading is 8), the Canvas2D part runs within the reference machine's time
  and the probe holds ≤ 8 ms a frame; otherwise the tier the other parts pick stands (our bar; R12-36 confirms it at M4).
  Every score is stored with the
  host's CPU model and core counts, memory size, OS version, Node version and browser name and version (from the
  user-agent client hints), so a stored score always names its machine (N-27 b). CI divides every timing by (runner
  score ÷ reference score) before comparing it with a budget; the reference score is stored with the goldens.
* **Where each budget is measured (N-27 a):** model budgets in Node 24 (worker_threads for the pool) on every tier, and —
  in the nightly tier (§13.8) — again inside Chrome's worker on the same seeds and sizes; where the two figures differ by
  more than ± 15 %, the Chrome figure is the one checked against the budget (the product runs in browsers) and both
  numbers are reported. Frame, tile, first-map and label budgets are measured in Chrome (Playwright, GPU on). p50 and
  p95 are over B-CITY's seeds per rung and water setting.
* **Timing on shared runners.** A CI timing that gates a budget — the cost-model sweeps (§13.2), the first-map, settle and
  query runs (§12.5, §8.9), the export runs (§12.7), the pool comparison and the re-timing of a max-clause outlier (§12.3)
  — is taken in the **timing phase**: last in its tier, alone on the runner (no other suite, generation or browser
  running), in batches of ≤ 60 s with `bench/calibrate` before and after each, a batch whose two scores differ by more
  than 5 % re-run, and the pool size recorded with every timing. A timing taken while other suites share the runner —
  the nightly B-CITY set, which runs beside the invariant suite, B-FUZZ and B-EDIT (§13.8) — screens and never gates: a
  generation it flags is re-timed in the timing phase (§12.3). The phase costs ≤ 20 min of the nightly budget: the sweeps
  and the first-map runs are nine sizes × five seeds in Node and in Chrome (≈ 1–2 min of generating), and re-timing
  takes at most 20 generations × 3 runs per rung (≤ ≈ 3.5 min at the band tops) (J-R49).
* **Targets and the comfort level (g item 119; J130; owner: "as fast as possible" — "note where our comfort levels
  really are").** §12.3's and §12.5's laws and every budget of this section and of every volume are the **targets**: the
  build works to meet and beat them. The **comfort level** is ten seconds of total time — from the click to the complete
  result, the map's final complete frame or the file written, on the reference machine — for every wait a user sits
  through once: a generate; a regenerate or Re-derive; an open from SettlementForge (to the editable complete map — the
  load's digest checks and any migration included; the verification replay runs after it, off the path, §2.9 step 3,
  §12.6); a dossier change applied (a catch-up's epochs coarsened as an advance's are, V06 §6.8 (6)); an `advance` of
  time and a history-first generation (item 113's replay with the peak's generation before it), each in total, never per
  epoch (item 119 (a2); V06 §6.8 coarsens the cadence until its estimate fits); an export, in every format the export
  dialog offers at its preset sizes up to A2 at 300 dpi, lit included (a custom pixel size or DPI past them stays offered,
  §8.7, outside the comfort level, §12.7); and a migration — at every size up to the population cap. Past it the wait fails its bar (R12-31) and the owning path takes
  its pre-decided change; at run time the wait completes and is reported (F-BUDGET-TIME), never answered by a coarser
  result. A step runs slower than its target only for a **recorded measured gain** inside the comfort level — a row of
  V11's `perf.qualitySpend` (V11 §3.25.8: the stage, the use, the target, the measured extra cost, the bar the gain is
  measured by, the gain and the run that measured it), read by §4.1's quality budget and checked by R12-33 — and nothing
  is made slower otherwise. **Progress:** a wait past about one second (V09's `progress.showAfterMs`, 1 000 ms) names
  its running stage and never leaves an empty screen: the generation worker posts §11.2's `Progress` as each `StageDecl`
  starts and, for a wait that is not a stage run, as each of its own steps completes (epochs, replayed epochs, the port's
  steps, export bands, replayed events), never polled, and V09 §4.21.9 shows it — the current map drawn under the
  progress strip until the complete result replaces it, a first map's stages filling in, in the ghost style and never
  presented as the map (§8.5) — so the first picture is still complete (R12-32). **Interaction stays fast:**
  moment-to-moment budgets are not total time and keep their values — pan and zoom at frame rate, dragging a handle and
  a tool's live preview, hover and click-to-inspect, undo and redo, the season and festival switches (§12.5, §12.6;
  R12-34). **Low-end devices:** the low tier aims at the same ten seconds; a size it cannot reach within them is
  declared per device, the tier and the size recorded beside the measurement (V12 §3.15.9). D-18's two misses (§12.3,
  §12.5) are target misses inside the comfort level: reported, and no veto question.
* **Confirming milestones.** Each budget of §12.3–§12.8 is confirmed by one row of §12.10's register — its measuring
  milestone and suite, its pass bar, its pre-decided change if it misses and whether a miss is declared in D-18 as a
  target miss — and cites that row.
* **Budgets never change output.** A missed budget is reported, never answered at run time by computing something
  coarser (F-BUDGET-TIME is reporting-only, GEO-2); the pre-decided changes are configuration decisions taken once at a
  milestone and reported, and none of them changes the model.
=== END ===

=== REPLACE ### 12.5 First map, frames, zoom, pan, draw calls, uploads (SCL-7, SCL-17, VIS-6) ===
### 12.5 First map, frames, zoom, pan, draw calls, uploads (SCL-7, SCL-17, VIS-6)

**The first map is a law of the building count (N-2).** Size follows population inside a rung (§1.1), so the first-map
budget is a function of B, the number of buildings the request generates (≈ population ÷ 3.4, §12.2), never one number
per rung. Time to first map — click → the complete city band on screen, Canvas2D `ink`, the reference viewport — is
§12.3's model law plus the **first-frame law**

  F(B) ≤ 20 ms + 10 µs × B

made of S14's city band (≈ 4 µs per building, §12.4), the delivery of the column slices to the tile worker (≈ 1 µs), the
city-band raster (≈ 5 µs per building plus 0.25 ms per tile position), S13b at the first stop (≤ 2 ms), the label
composition (≈ 0.1 ms per position plus ≈ 1 µs per glyph) and the commit of the composed tiles (≈ 0.1 ms per position),
for the **reference viewport** — 1 440 × 900 CSS px at device pixel ratio 2, whose worst tile alignment covers P = 35
positions of 512² device px (§8.8) — so the fixed terms sum to ≈ 19 ms. Laws and values
(`fixall_rendering_r2_budgets.out`; bottom and top: the band ends, §12.2):

| rung | buildings B, band bottom → top | time to first map T(B), pool | T at the band's bottom / the default request / the top | the rung's bar holds up to | single-worker fallback |
|---|---|---|---|---|---|
| TOWN | 440 → 2 940 | ≤ 40 ms + 70 µs × B | 71 ms / 124–145 ms / 246 ms | 150 ms: B ≤ 1 570 (≈ 5 300 people) | ≤ 40 ms + 81 µs × B (138–162 ms at the default) |
| CITY | 2 940 → 8 820 | ≤ 60 ms + 60 µs × B | 236 ms / 330–420 ms / 589 ms | 0.4 s: B ≤ 5 670 (≈ 19 300 people) | ≤ 60 ms + 79 µs × B (416–535 ms) |
| METROPOLIS | 8 820 → 35 000 | ≤ 120 ms + 62 µs × B | 667 ms / 864–1 050 ms / 2 290 ms | 1 s: B ≤ 14 190 (≈ 48 000 people) | ≤ 120 ms + 77 µs × B (1.04–1.27 s; 1 s up to B ≈ 11 400) |

**Where O12 (g)'s one second holds, and the declared miss.** The first map is under one second for every TOWN and every
CITY request (their band tops are 246 ms and 589 ms) and for METROPOLIS up to ≈ 14 200 buildings (≈ 48 000 people); the
default METROPOLIS request (50 000 people) lands at 0.86–1.05 s across its building range. Above ≈ 14 200 buildings the
first map grows by 62 µs per building, to ≈ 2.3 s at the 35 000-building cap (120 000 people). **The declared target
miss (D-18; inside the comfort level, §12.1):** the one-click path stays complete at every size — every plot, site plan and building at city-band detail,
no preview (J-R7, J-I2, J-R35) — rather than one second being held above the knee: the model's cost is linear in
buildings (§12.3), and the only ways under the bar there are a partial picture, whose figure-ground differs from the
finished map (MFP-1), or dropping plot and site-plan detail from the one-click path, which the owner's plot-model ruling
forbids. Reversing costs ≈ 1 person-week: above the knee, the city band would appear district by district as the pool
finishes them, with the labels last. With the single-worker fallback the knee is ≈ 11 400 buildings (≈ 39 000 people).

**Measurement and fallback (N-2, N-27 c):** R12-6; the table is re-derived from the measured laws and the knee re-stated
in D-18.

**Interaction** in O12 (b)'s stress view of 40 000 buildings and 200 000 trees (above the request cap of §12.2, so a bench
fixture, not a generated request): **pan** ≥ 60 fps on the reference machine and ≥ 30 fps on the low-end device
(compositing cached tiles; ≤ 4 ms of main-thread work per frame); **zoom gestures** at the same rates (scaled cached
tiles). **Settle:** the visible tiles re-rastered at the new stop within ≤ 150 ms for a CITY view and ≤ 250 ms for a
METROPOLIS view, centre-out, in the tile worker — assuming P ≤ 35 positions, the city band at 0.25 ms per position + 5 µs
per visible building, the district band at 0.25 ms per position + 12 µs per visible building, and 0.2 ms per position to
compose and commit (a whole-CITY city-band view ≈ 42 ms, a whole-METROPOLIS view ≈ 83 ms, a district-band view of 3 000
buildings ≈ 52 ms); hairline fidelity at every settled view (§8.3). **Confirmation (N-27 c):** R12-7; pan and zoom rates
have §8.9's WebGL2 compositor as theirs.

**Draw calls:** ≤ 80 Canvas2D path fill and stroke calls per tile whatever the building count (batched per program and
semantic), so ≤ 80 × P per view (≤ 2 800 at the reference viewport), plus one sprite draw per visible crown and per placed
glyph (from the atlas). **Uploads (N-5):** while a pan or zoom gesture runs, ≤ 4 new composed bitmaps are committed per
animation frame, centre-out (baselines: NG 528 uploads per hood, MFCG 590 per city); at the first map and at settle every
ready tile is committed in the frame it arrives — one composed bitmap per position (§8.8), so a first frame commits ≤ P
bitmaps, not 2P, and no cap stretches it over frames; roof computations per frame after warm-up = 0 (derived roofs
cached, §8.1). **Re-raster** at the district band ≤ 12 ms per 1 000 buildings (MFCG's replay costs 11–15 ms per 1 000).
**Neighbourhood band:** opening one district ≤ NG's 10–96 ms at comparable counts; from M5 (V01 §6; file f item 474):
opening one district — model and display list ≤ 6 ms + 0.06 ms × its buildings (a `ring` district ≤ 10 ms + 0.07 ms × B),
its first visible tiles rastered ≤ NG's 73–111 ms, against NG's 10–52 ms (78–96 ms for ring) at comparable counts;
≈ 25 canvas operations per wing as the `hatched` ceiling. No size rung depends on WebGL2 for its marks; the light
ladder's rungs 1–2 need a GPU context and rung 3 does not (§8.4 (g)).

**The zoom-out limit (g item 116).** The limit (§8.8) removes stops and never adds one: no budget above grows, a map
whose limit lies finer than stop 0 caches fewer stops, and a gesture at the limit shows that stop's own tiles.

**The frame budgets Auto holds (g item 121 (d); J134).** §8.8's Auto loop holds the interaction rates above as its frame
budgets — 60 fps (16.7 ms a frame) on the mid, high and ultra tiers, the reference machine's, and 30 fps (33.3 ms) on
the low tier: a rolling p95 over the budget through 2 s steps one rung of §8.4 (g)'s order down, one under 60 % of it
through 10 s one up, each applied only at the settle and at most once in 10 s, a rung left downward held for 60 s and
doubling (R12-36). The text layer's composition (§8.8) is the label composition above, at the device ratio's positions.

**Find (g item 120 (j); J133).** An interaction budget (item 119 (d)), at the METROPOLIS cap on the reference machine:
suggestions drawn within ≈ 50 ms of a key; a chip's glow within ≈ 100 ms of its click — the Find index's lookup,
`live.find`'s delivery and the re-composition of the visible tiles' overlay; the index (each chip's listing, §11.2, with
V01's areas and gaps and V04's and V05's places) rebuilt by the generation worker once per commit, off the commit's
path; no base tile re-rastered for a chip (R12-35).

**Crisis looks (g item 122).** Drawn lazily for the visible tiles and their first ring (`live.crises`' region, §8.2),
adding ≤ 20 % to a tile's raster time as the decorations do; a change of the crisis display, or the drawn week crossing a
condition's edge, re-skins the visible tiles within the settle bound above (R12-37).

**Weather effects (g item 124 (f); J137).** ≈ 1 ms of frame time at the densest spell on the reference machine — the
sprite instances and the per-frame light terms of §8.4 (i), main thread and GPU together — inside the frame budgets
above; the first thing Auto gives up (§8.4 (g); R12-38).

**Seasons and festivals (g items 117 (i), 118; item 119 (d)).** A change of the year position, the weather or the
festival display re-skins the visible tiles — re-rastered centre-out, each composed tile swapped in as it lands — within
the settle bound above (≤ 150 ms for a CITY view, ≤ 250 ms for a METROPOLIS view), cached tiles of other weeks kept
until evicted; the leaf cover, the ice and the decorations add ≤ 20 % to a tile's raster time (PLAUSIBLE until R12-30
measures them). Decorations are drawn lazily, only for the visible tiles and their first ring (`live.festival`'s region,
§8.2). These are interaction budgets: item 119's comfort level leaves them as they are.

**Lighting (item 68; §8.4).** The first map above is composed unlit and its time never includes the light (§8.5; the
laws stand); the surface layers with their pyramids and the light maps of the visible tiles follow centre-out, then the
first ring's heights and the ring blocks (§8.8), lighting the view within the settle bound above (≤ 150 ms for a CITY
view, ≤ 250 ms for a METROPOLIS view, §12.7's bake, first ring and blocks inside it — the blocks' costs and their
caching per stop being §12.7's, PLAUSIBLE until R12-8 measures them). While the pointer moves the cursor sun or the hand lantern, the
global light's term — and, underground, the lantern's — runs every frame on the GPU: ≤ 1 ms of main-thread work per frame
(its uniforms and one draw per visible tile set) inside the ≤ 4 ms above, and the GPU pass ≤ 8 ms per frame at the
reference viewport on the reference machine (rung 1: the global light's traversal of §8.4 (c) per pixel — 17–22 cells at
the median and ≤ 62 at the 99th percentile on the seeded town of `amendc_repair_rendering_r2_traversal.out` (4) at the
1:500 stop — and the lantern's over the ≈ 113 m² its radius lights (§8.4 (b)), ≤ 0.5 ms of it), ≤ 16 ms per frame for the
low-end device (PLAUSIBLE until R12-9), so pan and the moving sun keep ≥ 60 fps and ≥ 30 fps; the moving pointer
re-rasters and re-bakes nothing (§8.8's keys).
=== END ===

=== REPLACE ### 12.7 Labels, trees, exports (SCL-8, SCL-10, SCL-14) ===
### 12.7 Labels, trees, exports (SCL-8, SCL-10, SCL-14)

* **Labels:** S13a 12 ms at CITY and ≤ 30 ms at METROPOLIS (model); S13b ≤ 2 ms per zoom stop for ≤ 2 000 visible
  candidates — ≈ 1 µs per candidate, the rate an export's placement is budgeted at too — run in resumable steps of one
  decision (§8.9, §9.2), the knowledge filter a one-byte test per row inside the candidate set's unit, no pass of its own; a tile's label composition ≤ 3 ms at ≤ 150 glyph runs (measurement and fallback: §8.9).
* **Trees:** placement ≤ 1 µs per instance (stamp, scale, rounding and point-in-polygon) and drawing ≤ 2 µs per instance
  as a sprite (§8.10). A district-band view with 10 000 visible trees composes in one 16 ms frame from cached tiles, and
  its tiles raster in ≤ 30 ms of tile-worker time (O19 e); the 200 000 trees of a METROPOLIS are never all instantiated —
  only visible tiles generate instances. The stamp-tile asset (§8.10) is loaded and hash-checked at worker start in
  ≤ 5 ms per worker per session, never on a settle (≈ 0.03–0.06 ms for 8–16 classes, measured cost model,
  `fixall_rendering_r4_stamptiles.out`); nothing is sampled or ranked at run time, so the first zoom to the district band
  carries no library build. **The crown library:** its build (20 crowns per class per style, once per session) and, on
  the vector rung in `lit` with a `path` sun, each light step's bake run in the tile worker as one-sprite units (§8.9), ≤ 20 ms of
  tile-worker time per (style, light step) for eight crown classes (PLAUSIBLE: ≈ 20–60 µs per sprite on Canvas2D,
  ≈ 3–10 ms for 160 sprites), started when the style loads so the first district-band raster finds it ready; a light
  step's bake runs at the head of §8.4's light-step pass, inside its settle bound (R12-17).
* **Lighting (item 68; §8.4).** In the tile worker, per visible tile after its base: the **surface layer** ≤ the base
  raster's own time at the band (the same draw sequence writing normals, heights and coverage; PLAUSIBLE), and the
  **light-map bake** ≤ 2 ms per tile for up to 50 lights reaching it and ≤ 4 ms for up to 200 (PLAUSIBLE: 256² texels ×
  the lights whose radius covers them × §8.4 (c)'s traversal toward each, plus the eight-direction occlusion), each light a unit of
  §8.9's class 3; then per **first-ring position** its heights raster ≤ the surface layer's time at the band (the same
  draw sequence writing heights alone), and per **ring block** ≈ 1 µs per city-band mark meeting it, ≈ 2 ns per
  terrain-field sample meeting it and ≤ 0.05 ms for its ≤ 21 845 cells (PLAUSIBLE; one block per unit of class 3) — each mark read
  by about one block of a view's partition, so the blocks of a window reaching a whole frame from the 1:500 stop cost
  ≈ 39 / 85 / 181 / 433 ms at the TOWN, CITY and METROPOLIS targets and the population cap
  (`amendc_repair_rendering_r3_blocks.out` (6)), cached per stop and paid again only for the blocks a pan exposes or a
  delta dirties; so a lit settle stays within §12.5's settle bound for the city and district bands of the golden views
  (the mountainous fixture's: §12.5).
  **A lit export** adds the CPU reference light pass: ≤ 60 ms per 512² tile of the export (PLAUSIBLE: ≈ 262 000 pixels ×
  §8.4 (c)'s global-light traversal, the baked point lights and the occlusion, in float64, with its window's first ring
  and blocks, §8.8 — its first ring rastered per tile, and each block computed a single time as long as the export's
  16-MB block cache holds it, at the ring block's rate above), so A2 at 300 dpi of a
  CITY lit takes ≤ 10 s with the view idle, the comfort level (§12.1) — at ≤ 60 ms per tile its ≈ 133 tiles' light alone
  approach 8 s, so R12-18's half-resolution pass (≈ 2 s) is the expected outcome of the measurement (R12-18).
* **SVG** at METROPOLIS, city band: ≤ 650 B per building (MFCG measured 410–500 B per building: 0.42–0.66 MB for
  837–1 512 buildings, 6.3 MB for 15 392) plus the text — outlines ≤ 64 B per placed glyph and ≤ 0.5 KB per distinct
  glyph, or each embedded face's base64 bytes once (≤ 0.5 MB per face, checked against the bundled files) (N-13) — and
  ≤ 60 000 elements, written in ≤ 2 s in the generation worker: the transient list's build (≈ 4 µs per building,
  ≈ 54 ms at the METROPOLIS target), S13b at the export stop (≤ 2 ms per 2 000 candidates) and the writing (§11.1).
  Inkscape opens it within §11.1's CI bound.
* **PNG:** A2 at 300 dpi of a CITY in ≤ 10 s on the reference machine **with the view idle** — the comfort level
  (§12.1), as every preset export size at every rung is — the peak canvas one tile
  band. Inside it: the transient list's build in the generation worker (≈ 4 µs per building at the city band — ≈ 21 ms
  at CITY — and more at the finer band a large print's scale selects; §8.7, §11.1); the export's placement in the tile
  worker (≈ 1 µs per candidate in the frame — ≤ 20 ms for 20 000 candidates, more than a whole CITY's label rows at any
  band: ≈ 3 500 names, §12.4, one address per building and the repeats of long street names — in class-4 steps, §8.9);
  and the encoding (§8.8's per-row filter rule, then the deflate), measured on a synthetic A2 map in Node 24
  (`fixall_rendering_r5_png.out`) at 3.5 s for flat `ink`-like colours, 5.4 s under smooth relief shading and 10.5 s for a
  textured `lit`-like look, of which the filter pass takes 2.7 to 3.4 s and the deflate the rest (PLAUSIBLE for browsers,
  whose filter pass is the same JavaScript and whose deflate is native code behind `CompressionStream`). View work
  pre-empts the export's steps (§8.9), so a pan or zoom during an export lengthens it by that work, which the export
  dialog's progress shows, and an animated view still leaves it one step in every 100 ms.
* **Confirmation of the export budgets (N-27 c; R12-19).** The SVG and PNG budgets are measured at M1 on B-CITY-lite's TOWN and
  CITY seeds and at M2b on METROPOLIS. Pre-decided fallbacks, taken once and reported: an SVG size or element miss at the
  city band writes path coordinates with one decimal of the export's unit instead of two and merges compound paths per
  (semantic, quarter of the city cut) instead of per (semantic, district), re-keying the `<metadata>` map; a district-band
  SVG that misses its estimate draws woods and orchards as their outlines instead of crowns; a PNG time miss is answered
  per host, the same pixels in a larger file each time: **on every host** the row filter is fixed to type None for every
  row instead of §8.8's per-row rule — on the synthetic A2 the filter pass disappears and the unfiltered rows also deflate
  faster, so encoding falls from 3.5, 5.4 and 10.5 s to 0.6, 1.3 and 4.4 s for the flat, relief and textured looks, the
  file 4 % smaller to 10 % larger; **in Node**, whose `zlib` takes a level, a miss that remains deflates at level 3
  instead of 6 (a further 0.35–2.5 s on the synthetic looks, the file 8–51 % larger); **in browsers**, whose
  `CompressionStream` takes a format and no options — in Node 24's implementation of the same standard a `{ level }` option
  is ignored, 5.3 MiB with none, level 1 and level 9 alike — a miss that remains after the filter change caps the export
  dialog's print sizes at that rung to the largest the measurement holds within ten seconds, the dialog naming it (R12-31:
  no preset print size whose export would pass the comfort level is offered; a custom pixel size or DPI past A2 at 300 dpi
  stays offered, §8.7, outside the comfort level as §12.1 scopes it, its progress shown by §12.1's rule). The per-row rule's encoding alone takes 10.5 s on the synthetic
  textured look, so the textured `lit` family is expected to take the first change. On the synthetic looks None is faster than the
  fixed Sub filter and no larger (Sub spends ≈ 0.2 s filtering, deflates as slowly as the default, and its files are
  7–30 % larger than the default's), and the per-row rule gives the smallest file wherever rows carry gradients or
  texture — 6–9 % smaller than None's on the relief and textured looks (J-R53).
* **Export beside the view:** R12-20. **The stamp-tile load:** R12-21.
* **Stage-3 hook (§2.6; SCL-13):** the base outline builder's `outline()` is inside S11's geometry share (§12.4's S11
  row); a stage-3 generator's `outline()` is admitted at ≤ 10 µs per
  building median over the town, ≤ 60 µs median and ≤ 250 µs p99 over its composed classes, and ≤ 12 µs mean (V02 §6.1),
  and its registration re-declares S11's row of §12.4 by the measured difference (§2.6, §3.7; file f item 223; R12-22);
  `compose()` ≤ 1 ms per building median at `wings`, in the derivation pool as §4.1's policy says (§8.6, §8.9), streamed
  to the tiles centre-out — one tile's compositions within 16 ms of pool time, amortised (a tile draws the outline until its
  compositions arrive). A research-side restatement of the Fantasy Manor model (build 890, version 1.0.0), run as a test
  instrument, takes roughly 0.08 ms for each building warm and about 0.6 ms with view geometry included — so the 1 ms
  `compose()` bound has headroom (item 59).
* **Plan rung (§2.6; item 28; J-A28.83):** `plan()` at most 5 ms at the median and 20 ms at p95 for one building on the
  reference hardware (§12.1), run by the derivation pool as §4.1's policy says — one plan for each click, inside a
  single 16 ms pool frame amortised across clicks; the
  count covers the programme's allocation, the seed clip where the storey's wings overlap (one `tileRings` overlay),
  opening the storey's transient arena (O(seed vertices)), the cuts and the read-back (§3.4). A re-cut — of a `stale`
  plan at its click, or of a stored plan inside the event that changes its
  inputs (§7.3; J-A28.72) — runs as §2.6's chain of such steps along item 28 (f)'s interior ladder: one per band row
  crossed and one per household added or removed, from the as-built plan's row and count for a stale plan (the canonical
  chain) or from the stored plan's, fewer where the cache holds a memoised step (§2.9); its length — at most the band
  set's rows less one (five: the default set has six rows, §2.6) plus the building's capacity less one (none for a building of capacity 0, which houses no household; §2.6) — is known
  before the first open; budgeted at ≤ 5 ms × steps median and ≤ 20 ms × steps p95 (R12-23); a miss at run time is
  reported, never answered by a coarser plan (§12.1).
* **Simulation module (§10.3; FTG-11):** one hour of occupancy for 50 000 people ≤ 50 ms in the worker (R12-24); never
  on the one-click path.
=== END ===

=== REPLACE ### 12.8 Memory (what is counted, per rung) ===
### 12.8 Memory (what is counted, per rung)

Counted: the JS heap, typed arrays and WebAssembly memory of every thread (generation worker, pool, tile worker, main),
with canvas backing stores budgeted separately by §8.8's canvas budget, which depends on the viewport, not the rung.
**Model working set, all threads, excluding canvases:** TOWN ≤ 40 MB, CITY ≤ 110 MB, METROPOLIS ≤ 260 MB.

What each thread holds is §8.9's (the tile worker holds no model) and §8.1 item 6's (the display list in the tile worker,
its 24-B index in the generation worker); the tile worker also holds the
decoration memo and the placement memo, its glyph atlases and crown sprites being canvases; the derivation pool holds its
per-worker overlays (§4.1); the generation worker holds the elaboration cache (§8.6, §2.9) and the close-up caches. The lines assume one kernel arena per
layer (≈ 20 MB at CITY with its typed lookup tables, its spatial index and the index's home column, §2.2; PLAUSIBLE until
M1) plus one frozen arena copy per pool worker (§12.4's merge row) and each district overlay until it merges (§3.3), the
compact entity store and the scoped
undo records of §2 and §7.4 (SCL-5), people derived on demand, tree instances never stored, and the display list at
≈ 11.4 MB at CITY across the two threads that hold any of it. The pool's frozen arena copies are ≈ 45 MB at CITY with
three workers at the one-click freeze and ≈ 60 MB at a freeze after edits (typed tables; `Map`-based tables would cost
each worker more heap and ≈ 10–20 ms of rebuild). While a loaded document is verified, one pool worker holds the replay's
model in place of the frozen copies (no frozen copy is made then, §4.1), its arena and entity columns about the copies'
size — or, with pool size 0, the generation worker holds it beside the working state (§2.9 step 3). **M2a's memory
measurement** (the milestone that builds the log and load verification over M1's document format, §16) includes the load
verification of the reference 300-edit CITY document with a district regeneration and a Re-derive from S3 made during
it; the load's digest trees (at CITY the model tree ≈ 1 MB — ≈ 30 000 entity leaves, ≈ 15 000 face-ring hashes and
their interior nodes at 16 B each — and the records tree ≈ 0.25 MB, §6.2) sit in the entity-store line, and a bridged
client that took the replayed town keeps the `doc.load` bytes (≤ 3 MB at CITY) until the mismatch is settled (§11.3).
The lines stay PLAUSIBLE until R12-25 measures them.

**The elaboration cache (item 28; J-A28.83).** ≤ 1 KB per building at the `wings` rung and ≤ 4 KB for each storey of a
plan (rings and walls as integer cm, openings, windows and furniture as offsets along their walls or in cm; file f item
232), LRU-capped at 8 MB per document
in the generation worker — a session line counted on top of each rung's working set, never inside the rung lines above,
and evicting a rung to `absent`, which loses nothing because each rung is derived purely from its building's committed
state (§4.1); its persisted chunks (§2.9) count toward the document's size budget as non-canonical data and are dropped
first when that budget binds (R12-27).

**The clerk's scratch document (V10 §6.2; M3c, file f item 481).** A scratch copy the built-in clerk opens for an
authoring turn (§11.2's `scratch`) is a session line counted on top of each rung's working set, beside the elaboration
cache: at most TOWN 20 MB, CITY 55 MB, METROPOLIS 130 MB, held only during an authoring turn and while its proposal
waits, released on accept, drop, stale or close; a device that cannot hold it runs the clerk in overlay mode (V10
§3.19).

**The underground parts (V04; M6-U, file f item 475).** Part 0 ≤ 1 MB historical and ≤ 3 MB navigable at CITY; a ruin
part ≤ 2 MB; each other part ≤ 1.5 MB — in the rung's entity-store line.

**The CITY line, itemised (≤ 110 MB).** At the one-click freeze the fixed items are the arena (≈ 20 MB), three frozen
copies (≈ 45 MB) and the display list (≈ 11.4 MB across the tile worker's copy and the generation worker's index) —
≈ 76 MB — leaving ≈ 34 MB for the **entity-store line** — the compact entity store with the load's digest trees
(≈ 1.25 MB) and, on a bridged client during a load mismatch, the kept `doc.load` bytes (≤ 3 MB) — and for the terrain,
hydrology and field rasters, the district overlays until they merge, the scoped undo records, the decoration and
placement memos and each thread's runtime baseline. At a freeze after edits the copies are ≈ 60 MB and the fixed items
≈ 91 MB, leaving ≈ 19 MB; that case has its own first fallback step below. All PLAUSIBLE until M1 measures them.

**Export-time peak.** An export that draws holds a transient display list while it runs (§11.1) — SVG in the generation
worker while it writes; PNG, print and the `.dd2vtt` image in the tile worker, to which the list is transferred with the
request, until the last band is encoded (§8.9): ≈ 1.9 KB per building at the city band (§8.1 item 6's ≈ 10 MB for
≈ 5 200 buildings) — ≈ 2.6 MB at the TOWN target, ≈ 10 MB at CITY, ≈ 26 MB at the METROPOLIS target and ≈ 67 MB at the
35 000-building cap (`fixall_rendering_r3_budgets.out`) — plus the file being written (≤ 650 B per building for SVG at the
city band, §12.7; a PNG's streamed bytes), both released when the file is transferred out. It is counted on top of each
rung's line as a peak, not in the steady working set, and one export runs at a time. A district-band export's list — a
district-band SVG, or a large print whose scale selects the district band (§8.7) — enters the size estimate the export
dialog shows before it starts; its size per band is measured with the export budgets. A raster export also holds
canvases: one band (width × 512 × 4 B, ≈ 14 MB at A2 300 dpi, §8.8), the canvas of the tile job in progress (1 MB) and,
in `lit` with a `path` sun, the crown set it holds until it completes (§8.9), counted with the canvases below (R12-26).

**Canvases during a raster export.** The view's need is §8.8's canvas need, whose 7 MB of scratch holds the drawn light
step's crown set with the atlases. A raster export's ≈ 15 MB of
band and tile canvases count on top of that need. The crown set an export in `lit` with a `path` sun holds (§8.9) is the
drawn step's set while the view keeps that step and adds nothing; from the first light pass that completes while the
export runs (§8.4) it is one more set, bounded by §8.8's ≤ 5 MB crown-and-atlas scratch, which holds one set with the
atlases (a set is §12.7's 160 sprites). The reference viewport on the mid tier (112 + 15 ≤ 128 MB) and the low-end
1 366 × 768 view (43 + 15 ≤ 72 MB) hold both, the latter with the extra set too (43 + 15 + 5 ≤ 72 MB); where the sum
passes the tier's ceiling — the low tier at 1 920 × 1 080 (67 + 15 > 72 MB), and the mid tier's reference viewport once the
extra set is held (112 + 15 + 5 > 128 MB) — the coarser-stop fallback set is dropped for the export's duration (the need
falls to 2P + 7 MB: 47 + 15 = 62 MB on the low tier, 77 + 15 + 5 = 97 MB on the mid tier), and the export dialog refuses
a width whose band does not fit beside the reduced need, naming the widest that does. Lit on rungs 1–2 the need is
4.25P + 7 MB + Q, and 3.25P + 7 MB + Q without the coarser-stop set; such a view bakes no light-step crown set (§8.4's
light steps serve the vector rung), so it holds no extra one: the high tier's lit reference viewport (DPR 2, 172.75 + 15 =
187.75 ≤ 192 MB) and the mid tier's, lit at DPR 1 with its text layer (§8.8: 103.75 + 15 = 118.75 ≤ 128 MB), hold both,
while a mid-tier view of the reference size lit at DPR 1.5 on a device of ratio 1.5 (123.25 + 15 = 138.25 > 128 MB) and
the low-end 1 366 × 768 view, lit at DPR 1 (68.75 + 15 = 83.75 > 72 MB), drop their coarser-stop sets for the export's
duration (99.25 + 15 = 114.25 MB; 56.75 + 15 = 71.75 MB; `amendc_repair_rendering_r3_blocks.out` (5);
`coh_repair_rendering_r2_resolution.out`).

**Canvases per tier (g item 121 (c); J134).** The tier ceilings are §8.8's — low 72 MB, mid 128 MB, high 192 MB, ultra
512 MB — whose worked cases include the ultra tier's native-4K view at its device ratio (169 MB unlit, 257.08 MB lit,
399.17 MB at full precision; T121-8) and the 5K and 8K screens; the split composition's text layer and the weather
effects' coverage plane, water mask and sprite atlas are canvases counted there, never in the rung lines above (R12-36).

**Measurement and fallback:** R12-25 (the lines and the canvases). The document's size budget is §2.9's.

**Lighting (item 68).** The light pass's textures on the main thread — per position the surface layer, its pyramid and
the light map, and the first ring's heights and the ring blocks — are canvases, counted by §8.8's canvas budget
(J-A68.89), never in the rung lines above; the `light` marks' rows sit in the display list's line (≤ 36 B per light,
§8.1 item 6). A lit raster export holds, beside its band canvas, one export tile's window — its float32 surface and pyramid, its
first ring's heights and its block cache, within §8.8's bound (≤ 30 MB at 1:500 and 300 dpi, ≤ 33 MB at 1:100 and 600 dpi) (§8.8;
`amendc_repair_rendering_r3_blocks.out` (3)), the surface and first ring released per tile and the cache when the
export completes — and a lit export's transient list carries the city band's casters over its window (at most a whole
city band's, ≈ 1.9 KB per building; §11.1); both count with the export-time peak above (R12-28).
=== END ===

=== REPLACE ### 12.10 The budget register ===
### 12.10 The budget register

Every measured budget of this section has one row: the budget (at its home), where and when it is measured, its pass
bar, the pre-decided change taken once at that milestone if it misses, and whether a miss is declared in D-18 as a
target miss — which inside the comfort level is no veto question (g item 119 (a)), while a one-time wait past it fails
(R12-31). Every miss is reported; a change is configuration or a declared shift, never a run-time answer (§12.1).

| row | budget (home) | measured at | pass | pre-decided change on a miss | declared in D-18 |
|---|---|---|---|---|---|
| R12-1 | the per-rung model laws (§12.3) | the cost-model sweeps (§13.2, §13.8): every band's bottom, target and top, five seeds each, in §12.1's timing phase; M1 (TOWN, CITY), M2b (METROPOLIS) | at every size, the p95 of T_i ÷ L(B_i) over the size's generations ≤ 1.10 | the law re-declared at the measured p95; §12.3's and §12.5's tables re-derived from it | a target miss |
| R12-2 | the primary configuration (§12.3) | the same sweeps at pool sizes 3 and 0 on the same generations (B-CITY-lite's 50 seeds × 4 water settings per size, paired by seed and water setting); the golden run's 200 seeds at pool sizes 0–3; R12-1's milestones | (a) R12-1 against the pooled law; (b) the pool's p95 below the single worker's; (c) identical digests at pool sizes 0–3 | §12.3's three pre-decided outcomes | a re-declared law: a target miss; O3 (d)'s clause reported missed by the difference |
| R12-3 | the max clause T_i ≤ 1.25 × L(B_i) (§12.3) | screened nightly by B-CITY (1 000 seeds × 4 water settings per rung, §13.8); every flagged generation re-timed three times in the timing phase at its pool size (the 20 highest when more than 20 flag, the count reported); judged at M1 (TOWN, CITY) and M2b (METROPOLIS) | no confirmed outlier (the median of three re-timed ratios > 1.25) | the clause re-declared at the largest confirmed median ratio (for example 1.4 × the law); §12.3's max columns re-derived | a target miss |
| R12-4 | the CITY split's rows (§12.4) | the fusion gate and the M0 site-and-fields spike; S10b's scoring, the siting feature rasters and the daylight term at M2b on B-CITY-lite | the p95 laws of §12.3 (the rows are assumptions) | a row whose p50 exceeds its figure restated at the measured value with §12.3's p50 column; the p95 laws stay | no |
| R12-5 | the M0 site-and-fields spike, S1 + S4 + S6 ≤ 50 ms at CITY (§12.4) | M0, from redteam-scale §7's scripts | ≤ 50 ms | raster cells coarsen one step — fields and the margin 32 → 48 m; hydrology 25 → 32 m at CITY, 32 → 40 m at METROPOLIS, 16 → 20 m at TOWN — and the spike re-runs | no |
| R12-6 | the first-map laws (§12.5) | B-CITY's browser runs, five seeds each on the reference machine, at each band's bottom, default request and top: TOWN at 1 500 / 5 000 / 9 900 people and CITY at 10 000 / 20 000 / 29 900 at M1, METROPOLIS at 30 000 / 50 000 / 120 000 at M2b; both terms of each law fitted | every p95 within its law + 10 % | a raster-side miss (the first frame above F(B)) steps the tier's tile DPR down one level for every view (2 → 1.5; P from 35 to 24, a third off the raster's per-position terms, the labels then composed at the device ratio by §8.8's split composition), fixed at the milestone, and the run repeats; a model-side miss is R12-1's or R12-2's | a model law: a target miss, the knee re-stated in D-18 |
| R12-7 | settle and re-raster (§12.5) | with the first map: M1 on the reference and low-end devices at TOWN and CITY, M2b at METROPOLIS | ≤ 150 ms (CITY view), ≤ 250 ms (METROPOLIS view) | one tile-DPR step down on the tier that missed | no |
| R12-8 | the lit settle, ring blocks included (§12.5) | M2b's settle runs on §8.3's mountainous fixture | within the settle bound | the tier draws the view lit once its visible tiles and first ring are and adds the blocks after the settle, nearest first, each far shadow appearing when its block arrives, their time counted in the view telemetry — the settle's content changes, never a picture | no |
| R12-9 | the GPU frame: ≤ 8 ms (reference), ≤ 16 ms (low end), ≤ 1 ms of main-thread work (§12.5) | M2b in B-CITY's browser runs — the pointer sweeping the reference and low-end views at every rung and §8.3's mountainous fixture under its 15° and 7° suns; M4 on the underground hook fixture of §8.3's hand-lantern row, the lantern on | the frame bounds | the tier drops one rung of §8.4's ladder (1 → 2 → 3), fixed at the milestone, and the run repeats | no |
| R12-10 | the plot edit, assignments, dossier events and hooks (§12.6) | M3a's B-EDIT sequences (the base's hand forms); the hooks with the engine at M4 | the stated bounds | the row re-declared at the measured p95 | a target miss |
| R12-11 | the coarse edits (§12.6) | §13.2's B-EDIT coarse-edit sequences, at the milestone §16 gives them | the stated bounds | the row re-declared at the measured p95, as R12-10 | a target miss |
| R12-12 | scope invariance within ± 20 % (§12.6) | B-EDIT (§13.2): TOWN → CITY from M2a, TOWN → METROPOLIS from M2b | within ± 20 % | the per-rung scope costs re-declared at the measured p95, as R12-10 | a target miss |
| R12-13 | replay and load verification, V (§12.6) | B-EDIT's reference mix at M2a | ≤ V + 10 % | the per-kind costs c(e) re-declared at their measured p95 and the reference mix's V restated (no mechanism changes: the wait is off the path to the picture) | a target miss |
| R12-14 | the warp's Apply (§12.6) | M3a: a 150 m brush over a CITY core on B-CITY-lite seeds, the carry and check counted | within the scoped-regeneration budget of the touched faces | the wing check leaves the whole-step validation — it runs once after the final step, and a building that fails it is re-derived by S11 on its plot (F-REDERIVE, reported) instead of halving the step (§2.6 rule 4) | no |
| R12-15 | previews (§12.6) | B-EDIT at M3a, where the toolkit's area tools ship | the scope's edit budget + ≤ 3 ms | the preview re-runs only on release | no |
| R12-16 | labels: S13b per stop, a tile's label composition (§12.7) | §8.9's measurement at M1 | ≤ 2 ms per stop; ≤ 3 ms per tile | §8.9's (whole words cached as bitmaps; `step(4)`) | no |
| R12-17 | the crown library and each light step's bake (§12.7) | M2b's moving-sun runs (§8.4), where `lit` ships | ≤ 20 ms per (style, light step) for eight classes | §8.4's: with a `path` sun the lit programs and the crowns hold the sheet's fixed sun, the library baked once | no |
| R12-18 | the light-map bake and the lit export (§12.7) | M2b, where the light pass ships with `lit`: METROPOLIS views, B-CITY's A2 exports and §8.3's mountainous fixture | ≤ 2 ms per tile up to 50 lights, ≤ 4 ms up to 200; ≤ 60 ms per export tile; a CITY's lit A2 300 dpi ≤ 10 s | a bake miss resolves §8.4 (c)'s point-light traversal one pyramid level coarser on every host and in the CPU reference alike, a declared view shift (§13.3), never a per-device change; an export miss computes its light pass at half resolution, bilinearly upsampled — the reference defined at that resolution on every host, a declared view shift (§13.3); a lit export still past ten seconds caps the dialog's print sizes as R12-19 does | no |
| R12-19 | SVG and PNG (§12.7) | M1 on B-CITY-lite's TOWN and CITY seeds; M2b on METROPOLIS | the size, element and time budgets | §12.7's (SVG: one decimal and per-quarter compound paths; a district-band SVG's woods and orchards as outlines; PNG: filter None on every host, then zlib level 3 in Node) | no: a miss that remains caps the dialog's print sizes (R12-31) |
| R12-20 | an export beside the view (§12.7) | B-CITY's browser run in the timing phase: at M1 a scripted pan and zoom during an A2 300-dpi CITY export; from M2b a `lit` CITY export while a `path` sun advances one step per frame | every settle within §12.5's bound; the export completes; its PNG byte-identical to the export made with the view idle, to one during which an edit is made (§8.9, §11.1) and, for the `lit` export, to the export with the sun stopped at the request's time | §8.9's `step(4)` | no |
| R12-21 | the stamp-tile load, ≤ 5 ms per worker per session (§12.7) | timed with the first map at M1, per worker from worker start to the library ready | ≤ 5 ms | the per-session hash check moves to CI and the release build, leaving typed-array views over the bundled bytes | no |
| R12-22 | stage 3's `outline()` and `compose()` admission (§12.7) | the stage-3 intake (M6) | the admission bounds | V02 §6.1 (a)–(b)'s fallbacks first; if those still miss, `outline()` runs the generator's own massing step (§2.6) | no |
| R12-23 | the plan rung (§12.7) | §13.2's T28-8 on B-PLAN's fixtures, confirmed at the stage-3 intake | ≤ 5 ms × steps median, ≤ 20 ms × steps p95 | the class's wing-local module doubles (V03 §2.4's `moduleCm`), a declared view shift (§13.3, a plan being derived data), and the measurement re-runs | no |
| R12-24 | the simulation module's hour (§12.7) | its cost-model test (§13.2), with the module (§10.3) | ≤ 50 ms for 50 000 people | the cost re-declared at the measured p95 (never on the one-click path) | a target miss |
| R12-25 | the rung lines and the canvases (§12.8) | B-CITY's browser runs at M1 (TOWN, CITY), M2a (the reference 300-edit CITY document under load verification, with a district regeneration and a Re-derive from S3 made during it) and M2b (METROPOLIS); canvases in the scripted pan and zoom runs | within the lines; within §8.8's tier ceilings | CITY over its line at M1 or M2a: the provenance and lifecycle-history columns leave the working set for the document's on-demand block (SCL-20's archive), decoded only when inspected; still over at a freeze after edits: that freeze makes §3.3 step 1's laziness-contract copy — L0–L2, every L3 partition, only the L4 partitions of the districts the pool derives; still over: the pool shrinks by one worker per step (identical digests by construction, §3.3) and the memory test re-runs. Canvases over a tier's ceiling: its coarser-stop fallback set is dropped (the need falls to 2P + 7 MB), a gesture showing the next coarser cached tiles only where they remain | no |
| R12-26 | the export-time peak (§12.8) | with the export budgets (M1 TOWN and CITY, M2b METROPOLIS) | within the stated figure + 25 % | the transient list built with only the attribute columns the sheet's programs read at the export band, for every export that draws (up to ≈ 2.6 of the ≈ 10 MB at CITY, §8.1 item 6); the figure re-stated at the new measurement and used by the export dialog's size estimate | no |
| R12-27 | the elaboration cache, ≤ 8 MB per document (§12.8) | the stage-3 intake on B-PLAN's fixtures (§13.2) | within the cap | the cap halves and the persisted chunks keep only the `current` plans of the buildings the view state's `favourites` and view pins name (an `edited` plan is model data, §2.6, needing no chunk) | no |
| R12-28 | the light pass's memory (§12.8) | the canvas runs at M2b | §8.8's bounds | the tier's rung drops (§8.4's ladder) or its tile DPR steps down, as §8.8 states | no |
| R12-29 | the daylight term (g item 102 (g); §12.4): TOWN ≤ 5 ms, CITY ≤ 12 ms, METROPOLIS ≤ 30 ms | M2b on B-CITY-lite, with R12-4 | within the rung's budget | the nine sun directions are swept in the derivation pool, three per worker, their bits OR-ed in sun order — the same bits (§6), off the serial path | no |
| R12-30 | the season and festival switches (§12.5; g items 117 (i), 118) | at the milestone that lands the season rows (§16), on the golden views of every family at every rung | each switch's re-skin within the settle bound; the leaf cover, the ice and the decorations ≤ 20 % of a tile's raster time | the leaf cover drawn from the neighbourhood band only and the decorations from the district band only, reported | no |
| R12-31 | the comfort level, ten seconds of total time per one-time wait (§12.1; g item 119) | V12 §3.15.9's wait timer on B-CITY's browser runs and the history and dossier fixtures, five seeds per wait kind at every rung's top and at the population cap, at the milestone that lands each wait: a generate, a regenerate or Re-derive, an open from SettlementForge (to the editable complete map), a dossier change, an advance of time and the history replay, each in total (item 119 (a2)), an export of every offered format at every preset size up to A2 at 300 dpi, a migration | every p95 ≤ 10 000 ms from the click to the complete result | the owning path's own change first (R12-1, R12-2, R12-6, R12-13, R12-18, R12-19; V06 §6's and V08 §6's rows); an export still past ten seconds has the dialog's sizes capped to what holds within them (R12-19); any other wait still past them fails the release until its path is changed — never a declared miss; a low-tier size that cannot reach it is declared per device | no: a failure |
| R12-32 | the progress rule (§12.1) | with R12-31's waits (V12 §3.15.9 (3)) | for every wait over 1 000 ms the first progress frame naming its stage within 1 000 ms of the click; every sampled frame the current map or the progress view, never an empty screen | the generation worker also posts `Progress` per district batch of the pooled stages and per export band, so no step passes a second unannounced | no |
| R12-33 | slower than a target only for a measured gain (§12.1) | the budget-register check at each release (V12 §3.15.9 (4)) over V11's `perf.qualitySpend` rows | every stage running above its §12 target has its row, whose gain the release's runs show and whose step stays inside the comfort level | the stage runs its target path, its row withdrawn | no |
| R12-34 | the interaction budgets (§12.5, §12.6; g item 119 (d)): pan and zoom (R12-7, R12-9), dragging and a tool's live preview (R12-15; §12.6's warp preview), hover and click-to-inspect (§11.2's `hit` within 1 ms; §8.9's queries), undo and redo (§12.6), the season and festival switches (R12-30), Find's suggestions and glow (R12-35) | each row's own run, compared release to release (V12 §3.15.9 (5)) | no row relaxed against the previous release | the row's own change | no |
| R12-35 | Find's overlay budget: suggestions ≈ 50 ms of a key, a chip's glow ≈ 100 ms of its click, the index once per commit (§12.5; g item 120 (j)) | V12 §3.15.10's `time.findSuggest` and `time.findGlow` on V09's app harness at the METROPOLIS cap, in §12.1's timing phase, at M5 (§16) | p95 ≤ 50 ms and ≤ 100 ms (T120-6); 0 base tiles re-rastered by a chip change | the glow first on the visible tiles, then the pins off the view; the suggestions from the index's prefix table first, the one-typo matches added within the next 100 ms; reported | no |
| R12-36 | the resolution adjuster — Auto's loop, the ultra tier's bar and the canvases per tier (§8.8, §12.1, §12.5, §12.8; g item 121) | at M4 (§16) on the reference, the low-end and an ultra-tier device over §12.5's reference views, V12's item-121 bars | T121-2, T121-3 and T121-8's bars; §8.8's canvas cases within their figure + 10 % | the loop's thresholds (2 s, 10 s, 60 %, the 60-s hold) re-declared at the measured values; the ultra tier's bar or ceiling re-declared at the measured need; reported | no |
| R12-37 | the crisis looks' raster (§12.5; g item 122) | at M3b (§16) on the golden views of every family at every rung with the crisis fixtures (T-ER-27) | each re-skin within the settle bound; the looks ≤ 20 % of a tile's raster time | the looks' district- and neighbourhood-band parts drawn from the neighbourhood band only, reported | no |
| R12-38 | the weather effects' frame cost, ≈ 1 ms (§12.5; g item 124 (f)) | at M3b (§16) on the reference and low-end devices, the densest spell of each kind over §12.5's reference view (V12's T124-2 measurement) | p95 ≤ 1 ms a frame on the reference machine | the densest densities halved on that tier, and its default turned off where it still misses; reported | no |

The budgets of §8 keep their own measurement clauses at their homes (§8.2's random-style confirmation, §8.4's projected
shadows, moving sun and light steps, §8.5's recoverability, §8.9's compositor, text and queries), as does §11.1's
CityJSON extension.
=== END ===
