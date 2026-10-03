# repair-r4-rendering — lane coherence/repair-rendering-r4 (unit rendering: base §8, §9, §11, §12)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-rendering-r4; covered by the whole-design retrovalidation (J84).

# Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): text before the first block header
# is ignored. Base: docs/ARCHITECTURE.md sha256 593c657d34849302… (assemble-r3's output); rationale e7b59eac90a75327….
# Each REPLACE body is the live subsection with count-asserted substitutions — work dir
# docs/validation/coherence/work/repair-rendering-r4/: orig/ split from the live base by split.py, patches/010–130
# (61 hunks, each OLD text found exactly once), apply.py, gen_blocks.py, extra-blocks.md (the J-ROWS and RATIONALE-A
# blocks), swap_restated.py (the NOTE FOR ASSEMBLE below); every untouched line is verbatim.
# Blocks: 14 REPLACE (§8.1, §8.2, §8.4, §8.6, §8.8, §8.11, §9.1, §9.2, §11.1, §11.2, §11.3, §11.6, §12.5, §12.10),
# 1 J-ROWS (1 row, restated), 1 RATIONALE-A (3 rows, restated). Ruling requests: 0. Binding rulings applied:
# adjudication-r4's R4-01, R4-02, R4-04, R4-05, R4-06, R4-10, R4-12 (Part H · rendering, with its 5 END lines); R3-01 –
# R3-03 (standing); R4-11's class on this unit's own test (note 4).
#
# PROGRESS
# - P0 brief read whole; adjudication-r4 (TOC, R4-01 – R4-06, R4-10 – R4-14, Part H · rendering with its 5 END lines),
#   adjudication-r3's R3-01 – R3-03: done
# - P1 issue sources read (verify-rendering-r3t, -agree-fabric, -agree-layers, -agree-tools, -scope, -vol-V01-V02,
#   -vol-V03-V04, and pipeline's VPC-R3-03 / VV56-r3-03 for the END lines); live §8.1, §8.2 (crisis looks, Find), §8.4,
#   §8.6, §8.8, §8.11, §9.1, §9.2, §11.1, §11.2 (whole), §11.3, §11.6, §12.5, §12.10 read where touched; V03 §5.1 /
#   §5.6 (1), V04 §5.6 (5), V06 §3.15.2 / §3.22 (3), V09 §4.21.10 / §5.10 / §5.15, V02 §5.5, §2.6's `Use`, §2.9's
#   `thematic`, file f item 447 and g item 120 (f) read for the shared names: done
# - P2 patches 010–130: done (14 ids: 13 fixed, 1 merged; the 5 END lines written; the sweeps below)
# - P3 blocks generated; dry run on copies, with the swap: done
# - P4 doc checks, references, size: done
# - P5 result saved; LANDED: done
#
# ISSUES → WHERE FIXED (14 routed ids; Part H: 13 FIX, 1 MERGED; none INVALID; nothing to a fix list)
#  §8.6   VV34-r3-02: the floor-area row picks the damaged form by the element's kind (V03 §5.6 (1)) — an `upperFloor`
#         element a hole, a `groundFloor` element (at ground level, under it, or a wing's first storey on a solid wing) a
#         walkable rotten patch — and the `ruined` sentence leaves "the ground storey — with a solid wing's first storey —"
#         the only one that can be walked. VAL-R3-06 (R4-04 (a), (b)): "A building a disaster look stands over (§10.2 (d)'s
#         units; (f)'s hand-over: until V06 §3.22 (3)'s `crisisLookYields` turns true on it, a preview never handing over;
#         §8.2's *Crisis looks*) draws the same layer …" (its §8.2 part is VV12-r3-02's).
#  §8.2   VV12-r3-02 (R4-04; closes VAF-R3T-03, MERGED, and VAL-R3-06's §8.2 part): the `disaster` row's city-band cell
#         "its units in the `ruinTone` (districts; at THORP, HAMLET and VILLAGE V07 §5.6 (3)'s units, on the plots
#         `villageUnitPlots` gives each)"; `ruinTone` "a unit's faces — a district's, or at the village rungs its unit's
#         plots' (V07 §5.6 (3)) —"; "their units (V01 §3.16 (1)) the `ruinTone`"; "a unit's `ruinTone` stands while the look
#         stands over any of its buildings (§10.2 (f))" (Part H's note). VRC3T-01 (R4-12): *Find*'s drawn-week sentence
#         cites §11.2's listing at that week, a building matched by its use then.
#  §11.2  VV12-r3-02: `LooksAnswer.crises[].districts` "(at the village rungs V07 §5.6 (3)'s ends or toft groups)".
#         VAT-r3-02 (R4-05): the `why` member's `view?: ViewHandle` with VAT-r3-02's comment and R4-05's "a provider that
#         states no view's look ignores it"; *Knowledge*: "a `why` with a `view` admits its view-bound rows as `looks`
#         does". VRC3T-01 (R4-12): *At a drawn week* is the frame's listing (VRC3T-01's text; note 2). VRC2T-12:
#         `ExportOpts` gains `raised`, `retaining`, `links`, `wings`, `terrain`, `lights` (each with its default), `trees`
#         reaches the 3-D formats and `vtt.scene` the form `{ raisedWay: Id }`. VRC3T-05: the out-of-range rule beside
#         `ExportOpts` — clamped and named where a nearest lawful value exists, else refused with `E_EXPORT_OPTION` naming
#         the member (note 1). VRC3T-06: `ExportOpts.frame` and `thumbnail`'s `box` read `Box`.
#  §8.1   VRC3T-06: `type Box = { x0: Cm; y0: Cm; x1: Cm; y1: Cm }` declared in the code block (listed among the
#         @plat/model types), the one box type every `Box` reader of §8, §9, §11 and §14 names; no `BoxCm` left in the set.
#  §11.1  VAL-R3-04: the underground band's `portals` — "an underground building's entrances whose door its own decay level
#         leaves standing (a door past its threshold an open gap, no portal; V04 §5.6 (5))". No V04 end (Part H).
#  §11.3  VRC3T-07: `export.request { fmt: Format, opts?: ExportOpts, bundle?: true }` — `knowledge` and `displayNames`
#         `opts`' members (§11.2); V08 §2.2's comment is V08's END line.
#  §11.6  VAT-r3-04: T-ER-21's outcome "the week view state that travels, the selection a command (the frame selects and
#         reports `entity.selected`; never a stored key), the layers a logged `setLayer` — never an input". VRC3T-05:
#         T-ER-19 adds a scripted or bridged request of each out-of-range member, with its outcome and bar.
#  §12.5  VRC2T-08 (R4-10): "each applied only while the view is settled — at once when no gesture runs, at the gesture's
#         settle otherwise — and at most once in 10 s (§8.8's Auto loop)".
#  terms  VCS-r3-07 (G-refview): J-A121.02's index row "the mid tier's lit reference viewport (D = 2)" (J-ROWS, restated);
#         and Part H's note: §8.8 (two), §12.10's R12-38 and R12-36, T-ER-26, and the Part A entries J-A68.85, J-A68.89 and
#         J-A68.90 (RATIONALE-A, restated) — "reference view(s)" → "reference viewport(s)", nothing else in the rows
#         changed. No retired "reference view" is left in §8, §9, §11, §12 or this unit's J rows.
#  §8.11  T-ER-25 (VRC3T-01: the scrub fixture adds a week before a matched use closed and a building whose use changed;
#         the outcome and bar read the frame's listing), T-ER-26 (G-refview), T-ER-27 (VV12-r3-02: the fire at VILLAGE
#         striking one end, the `ruinTone` on the struck end's plots only — with the end-less THORP's toft group, R4-04's
#         graded case; the unit's tone outcome), T-ER-28 (VAL-R3-06: "a building a disaster look stands over").
#
# END LINES WRITTEN (Part H · rendering, all five, as given)
#  VPC-R3-03 (pipeline; R4-06): §8.2's placement sentence — "on a way's carriageway only a barrier across it — a
#    `barricade` (… `blockade`, `raiders`, `rebellion`), `beast`'s `stakes` where the edge crosses a way, and the
#    quarantine's `cordon` where it crosses a way into its quarter (§10.2 (d), (f)) — no camp, tent, cart, engine or other
#    part"; T-ER-27's input "a barrier across a way's carriageway (…)", its outcome "(the cordon closing the quarter,
#    §10.2 (f))", the fixture "a quarantine whose affected quarter ways enter" and the bar "none on a carriageway but a
#    barrier's across it (a barricade's, a `stakes` barricade's or a cordon's)". Agrees word for word with pipeline's
#    §10.2 (d) and (f) in repair-r4-pipeline.md.
#  VV56-r3-03 (pipeline): T-ER-27's input "a refugee camp of two heads" with its outcome "placed by the overflow belt by
#    the gate (`approachByGate`'s `h` at least 1, §10.2 (d)), never undefined", one-to-one with the row's inputs.
#  VAL-R3-01 (V09; R4-02): §8.4's *Toggles are visibility* sentence (after "… `recipe.layers.islands`, II.6)."), §9.2's
#    candidate set and §11.2's `ExportOpts.layers` comment, each R4-02's text.
#  VV910-r3-02 (V09; R4-04 (c)): §11.2's `looks` member with `building?: Id` and `LooksAnswer.crises[].over?: boolean`,
#    each with the END's comment.
#  VV910-r3-03 (V10): `LooksAnswer.festivals`' comment adds "standalone the list is empty (DR43: no tradition exists and
#    none is invented); a previewed generic festival is no entry — it reaches the view by §2.9's `festival`".
#
# SWEEPS (R4-01 (2): every restatement in this unit of what a ruling changes, conformed in the same blocks)
#  R4-02 (the view draws its working layer): §8.4 — the underground's depth band "when drawn — visible, or Below the
#    view's working layer —", the lights and casters of "a layer the view does not draw — hidden and not its working
#    layer —", the cursor sun's floor "whenever the sky layer is drawn — visible, or Sky the view's working layer —";
#    §8.8 — the tile key's "the model layers the view draws (their toggles and the working layer, §8.4)" and the weather
#    effects returning "when the underground layer is no longer drawn"; §9.1 — an undercity's labels candidates "while
#    the underground layer is drawn"; §11.3 and T-ER-21 — the host's command is "a layer's visibility" (a logged
#    `setLayer`), never "the layers shown". Find's "layer shown" (note 5).
#  R4-04 (one phrase each): §8.2 "The buildings of a disaster look's units (§10.2 (d))" and the hand-over restated with
#    V06 §3.22 (3)'s exception ("… begun on it by the view's week, unless finished before the overlay's `sinceWeek`"), as
#    pipeline's §10.2 (f) words it; §8.8's tile key "a building a disaster look stands over (§10.2 (f); V02 §5.7 (8))".
#  R4-10 (one phrase): §8.8's device-pixel-ratio sentence "applied while the view is settled — at once when no gesture
#    runs, at the gesture's settle otherwise (T121-7)"; §8.8's Auto loop and T-ER-26 already agree.
#  R4-12: T-ER-25's outcome and bar (above); §9.5's Find bullet already cites §11.2's listing.
#  VRC3T-07: §11.1 *Knowledge* "the bridge's `export.request` carries it in its `opts`, §11.3".
#  R4-05, R4-06: no further restatement in this unit (`why` is declared once, §11.2; the carriageway rule once, §8.2).
#
# NOTES ON THE TEXTS (where a ruling or the set's homes shaped a required change)
#  1. VRC3T-05's "named in the export's report": no export report object exists (`export` answers bytes, the bridge
#     `export.ready { bytes }`), so the clamp is listed in the file's own metadata, `plat.clamped: { member, asked, used }[]`
#     — every member with a nearest lawful value belongs to a format that carries metadata (the `.dd2vtt`'s `plat`
#     extension object, a Foundry scene's `flags.plat`, the SVG's `<metadata>` JSON) — read by the requester, so nothing
#     is silent and no API or bridge type changes. The refusal's API error `E_EXPORT_OPTION` is new, beside
#     `E_KNOWLEDGE_TIER` and `E_HOST_FORMAT`; over the bridge it is `export.refused`'s `error`, whose type V08 §2.2 leaves
#     open. `vtt.squareM` (1.5 or 1) is clamped to the nearer by the same rule, and a `frame` wholly outside the limit
#     bounds is the zero-area case.
#  2. VRC3T-01's "`opened` at or before the week": §2.6's `Use.opened` and `closed` are `{ epoch, seq }`, so the text reads
#     "whose `opened` event falls at or before the week and whose `closed` event, if any, after it" (the event's week,
#     V06 §3.15.2's effective week). The readers named are R4-12's (V01's `gapUnits`, V04's and V05's Find places added).
#  3. VRC2T-12: each new member's effect is the one §11.1's row and V09 §5.10 / §5.15 / V02 §5.5 define — `raised` off
#     leaves out the features on a raised part with the `raisedSupport` and `span` Polygons; `terrain` the ground
#     partition (glTF) and `TINRelief` (CityJSON); `lights` glTF's `KHR_lights_punctual` lights; `trees` 'none' the crowns
#     (glTF) and vegetation objects (CityJSON).
#  4. R4-11's class on this unit's own test (no END line named it): T-ER-27's input "a condition the key withholds" could
#     only be staged as a `none`-row condition (DR44 withholds no look-bearing condition), so it reads R4-11's words — "a
#     `none`-row condition carried beside the looks, under View as at `public`, `local` and `secret`", outcome "drawn,
#     legended and counted at no key, each look-bearing condition's look the same at every key (`public`, §7.7's DR44)".
#     §8.2's and §11.2's general sentences ("a condition the key withholds is never drawn …") stand: they hold for a
#     `none`-row condition, as R4-11 says of V02's and V03's.
#  5. Find's "layer shown" (R4-02 (d) read against item 120 (f)): the owner's words are "matches on the layer shown glow;
#     matches on another layer show as faint ghost pins", and V09 §4.21.10 (8), V04 §5.1 (2)–(3) and V05 §5.6 (3) make
#     every match off the working layer a ghost pin, a hidden sky layer's included. Read as "draws", §8.2's "a layer not
#     shown" would let a match on a drawn, dimmed non-working layer glow against item 120 (f); so §8.2's ghost pins name
#     "a layer other than the one shown — the view's working layer (§8.4), whatever other layers the view draws —", Show
#     gaps outlines "on the layer shown (the view's working layer)", and T-ER-25's input names the working layer.
#  6. T-ER-27 stays one-to-one: each new input has its outcome at the same position.
#
# NOTE FOR ASSEMBLE (restated rows; assemble-r1's swap rule, script work/repair-rendering-r4/swap_restated.py)
#  The J-ROWS block restates the judgment-index row of J-A121.02 and the RATIONALE-A block the Part A entries of
#  J-A68.85, J-A68.89 and J-A68.90 (VCS-r3-07: "reference view" → "reference viewport"; nothing else changes). After the
#  blocks apply, each appended row takes its older row's place and the older row is deleted:
#  `python3 work/repair-rendering-r4/swap_restated.py BASE RATIONALE BASE_OUT RATIONALE_OUT`. The script stops unless each
#  id occurs exactly twice in its table. Dry run: index l. 22706 ← l. 22714; Part A l. 685, 689, 772 ← l. 852; index 805
#  rows, Part A 805 rows, one id set, no duplicate.
#  Proposed allow rows (docs/validation/doc-checks-allow.tsv; the corpus here is incomplete, so provisional):
#   * S2 §5.15 — a volume-prefixed pointer: its one occurrence in the base reads V09 §5.15 (§11.2's `ExportOpts.links`);
#     S2 reads the base's headings only; it resolves in V09.
#   * C3 "layer that is not the" — our own plain English, the END line's text as given (§9.2's candidate set, R4-02).
#   * C3 "it at the view s" — our own plain English, the END line's text as given (§11.2's `LooksAnswer.crises[].over`).
#
# HAND-OFFS (R3-01 (3): ends no END line names, for round 5's verifiers; none is open wording in the design text)
#  * scope: §13.8's T121-3 (base l. 18387) "over §12.5's reference views" → "reference viewports" (G-refview; VCS-r3-07's
#    term outside this unit).
#  * V12: "reference view(s)" → "reference viewport(s)" at l. 1206, 1207, 1212, 2651, 2653, 2657, 2669, 2766, 3076.
#  * V08: §5.4 (2)'s bridge form (l. 3092–3093) `export.request { fmt: 'dd2vtt' | 'foundry', opts, knowledge?,
#    displayNames?, bundle: true }` → `opts` carrying `knowledge` and `displayNames` (§11.3; VRC3T-07's second V08 site;
#    §2.2's comment is V08's END line).
#  * pipeline: §10.2 (d)'s footprint exception "a disaster's ruins and its districts' tone" → "its units' tone" (R4-04 (a),
#    in repair-r4-pipeline.md's draft as it stood at this seat's dry run).
#  * The volumes' ends of these fixes are their own END lines in Part H (V10 §2.13's `view?` opts, §3.9 and the `why`
#    tool; V09 §2.7's `WhyCardModel`, §4.2, row 21, §4.21.10 (7), (8), (10), §4.21.11 (2) and T-V9-83 (g); V07 §4.5 and
#    W74; V05 §5.6; V04 §5.1; V08 §2.2's comment).
#
# JUDGMENT CALLS (vetoable; J122 where new design): note 1's place for a clamp (the file's own metadata, over a new API
#  or bridge report) and the error id `E_EXPORT_OPTION`; note 5's reading of Find's "layer shown" (item 120 (f)'s words).
#  No new J row: each is a required change's form, recorded here.
#
# SIZE (principle (9)): §8, §9, §11, §12 94 018 → 95 380 words (+1 362, +1.4 %): §11.2 +659, §8.11 +186, §8.2 +135,
#  §8.4 +126, §11.6 +117, §8.1 +35, §8.6 +24, §11.1 +23, §8.8 +19, §12.5 +18, §9.2 +14, §11.3 +6, §9.1 0, §12.10 0. Removed:
#  restatement (§11.3's two duplicate export slots; the head-index restriction's clause) and verbose prose (§8.6's look
#  sentence folded into one parenthesis). What holds the growth is content the issues require: `ExportOpts`' six members
#  and the out-of-range rule (≈ 330 words), the view-bound why and the per-building look (≈ 150), the frame's listing
#  (≈ 90), R4-02's working-layer rule and its readers (≈ 140), the tests' new inputs, outcomes and bars (≈ 300); no
#  content was thinned. The rationale's three Part A rows and the index's one row are restated in place (no growth).
#
# CHECKS (scratch: scratchpad/coherence/; cycle.sh reruns them)
#  * apply.py: 61 hunks, each OLD text found exactly once; gen_blocks.py: 14 REPLACE blocks + the J-ROWS and RATIONALE-A
#    blocks.
#  * apply-blocks.py on copies of the live files: 16 found, 16 applied, 0 skipped; audit not OK 0; headings 153 → 153;
#    fences balanced (140 → 140); title block unchanged; the notes the four expected duplicates, settled by the swap
#    (index 805 = Part A 805, no duplicate, one id set). With pipeline's round-4 draft present (repair-r4-pipeline.md,
#    8 blocks; the other base drafts held no block yet): 24 applied, 0 skipped, audit not OK 0; no sibling block touches
#    §8, §9, §11 or §12.
#  * doc_checks.py --sections 8,9,11,12 before / after (hits / unreviewed): C1 5/0 → 5/0, C2 1/0 → 1/0, C3 189/0 →
#    191/2, C4 3/0 → 3/0, S1 0/0 → 0/0, S2 251/0 → 262/1 — the three unreviewed hits the proposed allow rows above (four
#    C3 runs of new plain English reworded away). WARNING printed both times: reference corpus incomplete (captures,
#    research/patreon, research/devlogs, research/ftg-docs, research/external absent) — clean-room results NOT
#    authoritative; provisional.
#  * Every new reference resolves (V03 §5.6 (1), V04 §5.6 (5), V07 §5.6 (3) with `villageUnitPlots`, V01 §3.16 (1),
#    V06 §3.15.2 / §3.22 (3), V09 §5.10 / §5.15, V02 §5.5, §2.6's `Use.opened`/`closed`, §2.9's `thematic` value `links`,
#    §10.2 (d)'s `approachByGate`, §11.1 *Per raised way*, §7.7's DR44, §8.8's Auto loop, `Cm` §2.1); no adjudication or
#    issue id in the design text; no deferral wording; no phone clause; no "reference view" or `BoxCm` left in the unit.
