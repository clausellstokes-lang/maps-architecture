# repair-r5-rendering — lane coherence/repair-rendering-r5 (unit rendering: base §8, §9, §11, §12)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-rendering-r5; covered by the whole-design retrovalidation (J84).

# Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): text before the first block header
# is ignored. Base: docs/ARCHITECTURE.md sha256 5f34cceb61432ac4… (assemble-r4's output); rationale a480f02e58a893fe….
# Each REPLACE body is the live subsection with count-asserted substitutions — work dir
# docs/validation/coherence/work/repair-rendering-r5/: orig/ split from the live base by split.py, patches/010–090
# (36 hunks, each OLD text found exactly once), apply.py, gen_blocks.py, cycle.sh; every untouched line is verbatim.
# Blocks: 11 REPLACE (§8.2, §8.4, §8.6, §8.8, §8.11, §9.5, §11.1, §11.2, §11.6, §12.5, §12.10). No J-ROWS or RATIONALE-A
# block. Ruling requests: 0. Binding rulings applied: adjudication-r5's R5-01, R5-02 (R1), R5-04, R5-05, R5-08 (Part H ·
# rendering, its 9 issues and 4 END lines); R3-01 – R3-03 and R4-01 (standing); R4-10's phrase (VRC4T-01).
#
# PROGRESS
# - P0 brief read whole (issue list, ROUND-5 NOTES, NEW OWNER RULES, ORCHESTRATION NOTES); adjudication-r5: TOC, R5-01,
#   R5-02 (whole), R5-04, R5-05, R5-08, Part H · rendering with its 4 END lines: done
# - P1 issue sources read (verify-rendering-r4t VRC4T-01 – 04; verify-agree-tools-r4t VAT-r4-01, -02; verify-determinism-r4t
#   VDC4-01, -02; verify-agree-fabric-r4t VAF-R4T-03; verify-vol-V09-V10-r4t VV910-r4-02); live §8.2 (*Crisis looks*,
#   *Find*), §8.4 ((a), (i), the casters), §8.6, §8.8 (the Auto loop), §8.11, §9.5, §11.1 (GeoJSON, 3-D, CityJSON, VTT),
#   §11.2 (`ExportOpts`, the out-of-range rule, `Query`, `LooksAnswer`, *Knowledge*, *Find's match listing*), §11.6,
#   §12.5, §12.10 read whole where touched; V11 §3.25.11 (every kind's and override's `lengthS`), V09 §4.21.10 (7),
#   §4.21.12 (5), §1b, §5.10, §5.15, V10 §2.13, V03 §4.6 / §5.6, V06 §3.23, §6.4, V12 §3.15.10, §2.9's `week` and view
#   pins, §2.7's `ConditionOverlay`, §6.1's press, §10.2 (d)'s keying, §13.2's T120-6 and §13.8's T-ER row read: done
# - P2 patches 010–090: done (9 ids fixed; the 4 END lines written; the sweeps below)
# - P3 blocks generated; dry run on copies, alone and with the round-5 model and pipeline drafts: done
# - P4 doc checks, references, size: done
# - P5 result saved; LANDED: done
#
# ISSUES → WHERE FIXED (9 routed ids; Part H: 9 FIX, 0 MERGED, 0 INVALID; nothing to a fix list)
#  §8.6   VAF-R4T-03 (FIX per R5-04): the lead's restatement of §6.3's comparison reads "damaged while the level is above
#         0 and at least t, compared from the element's entry week into the plan (V03 §5.6 (2) (a)–(b); an element a
#         restoring event's re-cut mints from the week that restoration ends, before which it draws as built, V06 §3.23
#         (3))". Its V02 end is V02's END line (Part H · V02).
#  §11.2  VAT-r4-01 (1) (FIX per R5-08 (d)): the `why` member's `view` comment adds "a section provider whose rows are read
#         at the drawn week — V03 §4.6's `plan` damage rows (V03 §5.6 (2) (d)) — reads that view's `week`, and with no
#         view the document's current week (§2.9's `week` default)". Its ends (2)–(4) are V10's, (5) V03's, (6) V09's END
#         lines (Part H).
#  §11.2, §9.5, §11.6  VAT-r4-02 (1), (2), (4) (FIX): `ExportOpts.pins?: boolean` (a picture's annotation layer — the
#         view pins and public notes, §2.9; V09 §4.19 — default false) and `furniture`'s "the annotation layer excepted
#         (`pins`)"; §9.5's *Annotation layer* bullet "the view pins, §2.9; V09 §4.19 — in a picture only with
#         `ExportOpts.pins`, §11.2"; T-ER-19's pins input, outcome ("no annotation drawn, then every pin drawn") and bar.
#         (3) is V09's END line.
#  §8.4   VDC4-02 (FIX): (i)'s phase — "rising from 0 and back to 0, each over its kind's fade, s moving by 1 ÷ that fade
#         a second: 5 s for a shower (`rain`, `drizzle`), `snow` and `leaves`, 60 s for `fog`, `mist`, `dust` (dust
#         haze), `cloudShadow` (cloud cover) and `shimmer` (heat shimmer) — each kind's `lengthS` lower end in V11
#         §3.25.11 at least twice it; §6.1's press reads the same fade". Checked against V11 §3.25.11 (Part H's note):
#         rain 30, drizzle 60, snow 60, leaves 20 ≥ 10 s; mist 120, cloudShadow 120, shimmer 120, dust 120, fog 180 ≥
#         120 s; the climate overrides (temperate rain 60–180 s, arid rain 20–60 s) ≥ 10 s — every one at least twice its
#         fade (note 1).
#  §8.8, §8.11  VRC4T-01 (FIX): §8.8's device-pixel-ratio sentence takes R4-10's phrase whole — "… at once when no gesture
#         runs, at the gesture's settle otherwise — and at most once in 10 s, counted with the loop's changes, so one
#         coming within 10 s of the last change applies when those 10 s end (T121-7)"; T-ER-26's input "one with the view
#         idle within 10 s of a loop step-down", its outcome "applied within one frame once 10 s have passed since that
#         step-down" and its bar. §8.8 now agrees with J-A121.07's index row and Part A entry (no row restated).
#  §11.1, §11.2  VRC4T-02 (FIX): §11.1's GeoJSON row names the feature — "with `ExportOpts.links` (§11.2), one LineString
#         of kind `supplyLink` per supply link within the export's scope — `good`, `consumer`, `provider`,
#         `satisfaction`, `declared`, as the `links` query reads them (§11.2), a withheld end by address and kind and a
#         concealed use's links left out"; `ExportOpts.links`' comment cites §11.1 for the feature and V09 §5.10 for the
#         checkbox, its restated field list dropped (the definition lives once, §11.1). Its V09 end is V09's END line.
#  §11.2, §11.6  VRC4T-03 (FIX): the out-of-range rule's "`vtt.squareM` to the nearer of 1.5 and 1 (1.25 to the default,
#         1.5)" and the refusal list's "a numeric member that is not a finite number (`NaN` or ±∞, never clamped)";
#         T-ER-19's out-of-range list adds `vtt.squareM` 1.25 and a `NaN` `vtt.pxPerSquare`, with those outcomes.
#  §11.2, §12.5, §12.10, §8.11  VRC4T-04 (FIX per R5-05 (b)–(c); Part H: the budget is the chip glow's ≈ 100 ms, item
#         119 (d)'s budgets unchanged): §11.2's closing sentence "… rebuilt once per commit and at each change of the
#         effective key (§12.5), and, at a drawn week whose frame is not the head, re-derived from that frame at each
#         change of §2.9's `week` (V09 §4.21.10 (7))"; §12.5's Find paragraph the same triggers and "each change of the
#         drawn week re-evaluates the chips' listing (§11.2's *At a drawn week*) off the scrub's path, within ≈ 100 ms of
#         the frame being drawn at the METROPOLIS cap (V06 §6.4), the frame never waiting for it"; R12-35's row: the
#         triggers, the timing (`time.findGlow` from a scrubbed week's frame being drawn) at the later of M5 and V06's E6,
#         its bar; T-ER-25's bar runs it (R12-35). T120-6 is scope's text: HAND-OFF below.
#  §8.2, §8.11  VV910-r4-02 (FIX per R5-08 (b), amended): *The layer* — "Each mark carries its look: in `entity`, the
#         interned handle (§2.1) of the `ConditionOverlay` whose look draws it — a preview, drawn alone, carries no
#         condition, so its **Show** frames every crisis mark — so one look's marks are told apart; V09 §4.21.12 (5)'s
#         **Show** and Find's **Go to** on a look read them so, asking the provider in the generation worker for one
#         look's marks at its row's `band` over the map's `bounds` and §8.8's ring, whatever the view, and framing their
#         box." (Part H's amendment in place of "a preview's marks none, the preview drawn alone"); T-ER-27's input "a
#         siege and a refugee camp standing together", its outcome and its bar as written.
#
# END LINES WRITTEN (Part H · rendering, all four, as given)
#  VV12-r4-01 (V09; R5-05 (a)): §11.2 *At a drawn week*'s reader list "(`live.find`, V09's panel, V10's `read_map find`,
#    V01's `findAreas` and `gapUnits`, V04's and V05's Find places, V07 §5.5's village reading)".
#  VV910-r4-03 (V09; R5-08 (c)): §11.2's `looks` member `field?: Id /* g item 122 (f): with it, each famine look says
#    whether it draws that field bare (§10.2 (d)'s fields, (f)) */`; `LooksAnswer.crises[].over`'s comment adds "; with the
#    query's field, whether this famine look draws that field bare at the view's week (§10.2 (d)'s `fields`), evaluated in
#    the generation worker" (a preview's bare fields are keyed on its look kind, §10.2 (d), so the answer is defined there).
#  R5-02 (R1): §8.4's shadow casters "curtain walls (prism of the band; a run beneath a raised way's span topped at its
#    soffit, §2.7's support step (6) (d))"; its heightfield writers "… as the tops of their prisms (a wall run beneath a
#    raised way's span topped at its soffit)"; §11.1's 3-D row "a curtain wall's top carrying its walk … and a run beneath
#    a raised way's span topped at that span's soffit (§2.7's support step (6) (d))".
#  R5-04 (the tests' blind spot): T-ER-28's input "an element a restoring re-cut mints while its `repair` Works still runs,
#    and one a re-cut or an `extend` adds after its building's damage left", its outcome "drawn as built in every week,
#    never damaged by that restoration nor as a repair (V06 §3.23 (3))".
#
# SWEEPS (R5-01 (2): every restatement in this unit of what a ruling changes, conformed in the same blocks)
#  R5-02: "crossing station", "raised gate", "wall opening", "support step", "under-deck strip", `W_RAISED_CROSSING`,
#    `bend.raised.*` and `bend.wall.*` searched in §8, §9, §11, §12 — no hit; the wall-height readers are §8.4's two (R1)
#    and §11.1's 3-D row (R1) and CityJSON's `OtherConstruction` wall objects (note 2); §12.4's daylight row is a budget,
#    no geometry. §8.2's `raisedWay` program draws the deck over part 0 by layer, unchanged.
#  R5-04: §8.6's lead (VAF-R4T-03) and its closing sentence — "A building never decayed and under no disaster look draws
#    byte-identically to its plan without the layer" (R5-04's decision; it follows the look's own sentence, which draws
#    such a building at `lookLevel`); T-ER-28 (END). §11.1's battle-map rows cite §6.3's comparison and V03 §5.3's
#    `ownDamaged` by reference and need nothing.
#  R5-05: §11.2's reader list (END) and its second list, which now refers to the first ("those readers and V12's
#    statistics read it" — one reader list, R5-05 (a)); §12.5's index sources add V07 §5.5's village reading; §8.2's Find
#    budget restatement ("suggestions ≈ 50 ms …, the index rebuilt once per commit"), stale against §12.5, becomes
#    "§12.5's (R12-35)"; §9.5's Find bullet reads the listing "at the view's effective key and drawn week"; R5-05 (c) in
#    the tests: T-ER-25's scrub clauses "from the later of M5 and V06's E6" and T-ER-27's drawn-week clause "from the later
#    of M3b and V06's E6" (V06 §3.15.2's frames) — the T-ER rows have no timing cell, so the bar column says it.
#  R5-08: §11.2's `why` (VAT-r4-01) and `looks` (END); §8.2's *The layer* (VV910-r4-02); T-ER-27. The `WhyAnswer` and
#    `why` comments name "the section providers" and need nothing; the section providers' signature is V10 §2.13's.
#
# NOTES ON THE TEXTS (where a ruling or the set's homes shaped a required change)
#  1. VDC4-02: "s moving by 1 ÷ that fade a second" states the rate §6.1's press already reads ("its strength falls from
#     its present value to 0 at its kind's fade rate (§8.4 (i))"), so the wait before a pressed spell is s × fade and
#     T124-9's replay of a press during a spell is defined; the kinds are named by V11's `WeatherKind` keys (the English
#     words kept beside them), so all nine have one fade. The photosensitivity bound of (i) (≤ 10 % of mean luminance a
#     second) is unchanged: the 5 s shower fade was already the old lower bound.
#  2. R5-02 (R1) at §11.1: the END names the 3-D row; CityJSON's `OtherConstruction` wall objects are the same prisms, and
#     the 3-D row's own note "shadows, glTF and CityJSON agree by construction" binds them, so CityJSON's wall run beneath
#     a span is topped at its soffit "as in glTF (§2.7's support step (6) (d))" — HAND-OFF to model for (6) (d)'s list of
#     readers. "Topped at its soffit" is the END's wording; §2.7's (6) (d) is the home of the rule ("an ordinary run whose
#     top is no higher than that span's soffit"), cited at each site.
#  3. VRC4T-03: "never clamped" settles the one overlap the new refusal clause opens (−∞ for `vtt.pxPerSquare` is also
#     "below 50"): a non-finite member is refused whatever its range.
#  4. VRC4T-04: `time.findGlow` is reused for the drawn week's re-evaluation (R5-05 (b): the chip glow's budget), timed
#     from the scrubbed week's frame being drawn; V12's statistic row and T120-6 are HAND-OFFS.
#  5. VV910-r4-02: no new provider member — one look's marks are the provider's marks whose `entity` is that look's
#     `ConditionOverlay` (`id: Id`, §2.7), whose interned handle §2.1 gives.
#  6. Each test row stays one-to-one: every new input has its outcome at the same position, and its bar.
#  7. doc_checks' C3 runs of new plain English ("of the end of the 10", "over the map with the", "to 1 5 the default",
#     "a change of the drawn") were reworded away; no allow row is proposed.
#
# HAND-OFFS (R3-01 (3): ends no END line names, for round 6's verifiers; none is open wording in the design text)
#  * scope (§13.2 T120-6; VRC4T-04, R5-05 (b)–(c)): after "a chip's glow within ≈ 100 ms of its click" add "and, at a
#    drawn week whose frame is not the head, the chips re-evaluated within ≈ 100 ms of the frame being drawn, the frame
#    never waiting (that clause from the later of M5 and V06's E6, V06 §3.15.2's frames)"; R5-05's sweep lists T120-6
#    with VRC4T-04, but §13.2 is scope's text and Part H gives no END line for it. (§12.10's R12-35 and T-ER-25 carry the
#    budget and its bar in this unit.)
#  * V12 (§3.15.10's statistic row, l. 1172, and T120-6's V12 text, l. 2637–2638; T-V12-52): `time.findGlow` "a chip's
#    click to its matches' glow drawn" adds "and a scrubbed week's frame drawn to its matches' glow drawn" (R12-35), that
#    clause at the later of M5 and V06's E6.
#  * model (§2.7's support step (6) (d)): its reader list "§4.5's daylight casters, §8.4's casters and heightfield and
#    §11.1's glTF wall read it" adds "and CityJSON's wall objects" (note 2).
#  * The volumes' ends of these fixes are their own END lines in Part H: V10 §2.13's `rows` opts, §3.9's query and §3.23
#    row 14, V03 §4.6's `plan` rows, V09's T-V9-86 (VAT-r4-01); V09 l. 4137 and §5.10's Picture cell (VAT-r4-02); V09
#    §5.15's `supplyLink` row (VRC4T-02); V02 §5.7 (2) (VAF-R4T-03).
#
# JUDGMENT CALLS (vetoable; each a required change's form, recorded here — no new J row): note 1's explicit fade rate;
#  note 2's CityJSON reading; note 3's "never clamped"; note 4's reuse of `time.findGlow`; the second reader list of §11.2
#  and §8.2's Find budget turned into references (principle (1)).
#
# SIZE (principle (9)): §8, §9, §11, §12 95 380 → 96 178 words (+798, +0.8 %): §11.2 +175, §8.11 +174, §11.1 +79, §8.2
#  +63, §8.4 +62, §12.10 +59, §12.5 +52, §11.6 +48, §8.6 +40, §8.8 +29, §9.5 +17. Removed: restatement (§8.2's Find budget,
#  §11.2's `links` field list and its second reader list, ≈ 45 words). What holds the growth is content the issues and END
#  lines require: the tests' new inputs, outcomes and bars (≈ 260), `pins` and the annotation layer (≈ 90), the crisis
#  marks' look (≈ 70), the `supplyLink` feature (≈ 50), the drawn week's triggers and budget (≈ 140), the fades (≈ 45), the
#  section providers' week, the `looks` field (≈ 90), the entry week (≈ 40); no content was thinned.
#
# CHECKS (scratch: scratchpad/coherence/; cycle.sh reruns them)
#  * apply.py: 36 hunks, each OLD text found exactly once; gen_blocks.py: 11 REPLACE blocks.
#  * apply-blocks.py on copies of the live files: 11 found, 11 applied, 0 skipped; audit not OK 0; headings 153 → 153;
#    fences balanced (140 → 140); title block unchanged; index 805 rows and Part A 805 rows, no duplicate. With the round-5
#    model and pipeline drafts present (repair-r5-model.md, repair-r5-pipeline.md as they stood at this seat's dry run):
#    23 applied, 0 skipped, audit not OK 0; no sibling block touches §8, §9, §11 or §12.
#  * doc_checks.py --sections 8,9,11,12 before / after (hits / unreviewed): C1 5/0 → 5/0, C2 1/0 → 1/0, C3 191/0 →
#    191/0, C4 3/0 → 3/0, S1 0/0 → 0/0, S2 272/0 → 280/0. WARNING printed both times: reference corpus incomplete
#    (captures, research/patreon, research/devlogs, research/ftg-docs, research/external absent) — clean-room results NOT
#    authoritative; provisional.
#  * Every new reference resolves (V03 §4.6, §5.6 (2) (a)–(d), V06 §3.23 (3), §3.15.2, §6.4, E6, V09 §4.19, §4.21.10 (7),
#    §4.21.12 (5), §5.10, V07 §5.5, V11 §3.25.11, §2.9's `week` default and view pins, §2.7's support step (6) (d),
#    `ConditionOverlay.id`, R12-35, T121-7); no adjudication or issue id in the design text; no deferral wording; no phone
#    clause.
