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
#  * doc_checks.py --sections 8,9,11,12 before / after (hits / unreviewed): C1 5/0 → 5/0, C2 1/0 → 1/0, C3 189/0 → 189/0,
#    C4 3/0 → 3/0, S1 0/0 → 0/0, S2 183/0 → 194/3 (the two volume-prefixed pointers above). WARNING printed both times:
#    reference corpus incomplete (captures, research/patreon, research/devlogs, research/ftg-docs, research/external
#    absent) — clean-room results NOT authoritative; provisional. Forty C3 runs of ordinary English in the new text were
#    reworded away rather than allowed.
#  * Every new volume reference resolves in the live volumes except V09 §4.21.10, which the V09 seat writes this round;
#    no adjudication or issue id in the design text; no deferral wording; no phone clause (item 126 (a2)).
