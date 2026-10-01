# verify-rendering-r4t — base §8, §9, §11, §12 after repair round 4

> Lane `coherence/verify-rendering-r4t` (opus verifier). Base `docs/ARCHITECTURE.md` sha256 5f34cceb… (assemble-r4's output;
> before the round 593c657d…), rationale a480f02e… (before e7b59eac…). Scratch: `scratchpad/coherence/vr4/`.

PROGRESS
- P0 brief read whole; RESUME/CONTINUE check (no output, no LANDED): done
- P1 inputs: verify-rendering-r3t (9 findings), adjudication-r4 (R4-01, R4-02, R4-04, R4-05, R4-06, R4-10, R4-12; Part H ·
  rendering, scope, model, V08, V09 with the END lines closing my findings' second ends), repair-r4-rendering's header,
  assemble-r4 (only rendering's 16 blocks touch §8, §9, §11, §12): done
- P2 the 14 replaced subsections' word diffs read whole, pre → live (only rendering's blocks touch §8, §9, §11, §12): done
- P3 round-3 findings re-checked against the live text, each END line's second end included: done (9/9 FIXED)
- P4 receipts, doc checks, references, terms, review ids, deferral: done
- P5 new findings, report, result, LANDED: done

## 1. What changed in scope

Pre-round base 593c657d… (`git show 96bdae2`) against live 5f34cceb…. Only `repair-r4-rendering.md`'s blocks touch §8, §9,
§11 and §12 (assemble-r4: 0 overlaps; model's, pipeline's, determinism's and scope's blocks lie outside). Fourteen
subsections replaced, each word diff read whole, every other subsection of the four sections byte-identical:

| subsection | words pre → live | what the round wrote |
|---|---|---|
| §8.1 | 2 971 → 3 006 | `type Box` declared (VRC3T-06) |
| §8.2 | 18 453 → 18 588 | the disaster look's units and `ruinTone` (R4-04); the barrier across a carriageway (R4-06); Find's drawn week cites §11.2's listing (R4-12); ghost pins and Show gaps on "the layer shown (the view's working layer)" |
| §8.4 | 6 909 → 7 035 | R4-02's working-layer sentence; the depth band, lights and sky floor "when drawn — visible, or … the working layer" |
| §8.6 | 1 582 → 1 606 | the floor-area row by `upperFloor` / `groundFloor` (VV34-r3-02); "a building a disaster look stands over" (VAL-R3-06) |
| §8.8 | 5 762 → 5 781 | tile key "the model layers the view draws"; R4-04's look phrase; the DPR sentence in R4-10's words (part); "reference viewport" |
| §8.11 | 3 826 → 4 012 | T-ER-25 (frame listing, working layer), T-ER-26 (term), T-ER-27 (R4-06, R4-11, refugee camp of two heads, village unit tone), T-ER-28 (R4-04) |
| §9.1 | 924 → 924 | undercity labels "while the underground layer is drawn" |
| §9.2 | 2 786 → 2 800 | the candidate set read as R4-02 words it |
| §11.1 | 6 531 → 6 554 | *Knowledge*: the bridge carries it in `opts`; portals "whose door its own decay level leaves standing" (VAL-R3-04) |
| §11.2 | 8 109 → 8 768 | `Box`; `ExportOpts.layers` (R4-02); six new members, `trees` for 3-D, `vtt.scene { raisedWay }` (VRC2T-12); the out-of-range rule and `E_EXPORT_OPTION` (VRC3T-05); `looks` `building?` and `crises[].over` (R4-04 (c)); `why` `view?` (R4-05); `festivals` comment (VV910-r3-03); *At a drawn week* the frame's listing (R4-12) |
| §11.3 | 2 613 → 2 619 | `export.request { fmt: Format, opts?: ExportOpts, bundle?: true }` (VRC3T-07); the host's "a layer's visibility" |
| §11.6 | 407 → 524 | T-ER-19's out-of-range requests; T-ER-21's selection a command (VAT-r3-04) |
| §12.5 | 1 809 → 1 827 | Auto's clause in R4-10's words (VRC2T-08) |
| §12.10 | 3 026 → 3 026 | R12-36, R12-38 "reference viewport(s)" |

Rationale: only J-A68.85, J-A68.89, J-A68.90 (Part A) and the index row J-A121.02 changed in this unit, each "reference
view" → "reference viewport", nothing else (the fourth changed line, 639, is pipeline's J-A81.41).

Size (principle (9)): §8 + §9 + §11 + §12 94 018 → 95 380 words this round (+1.4 %); against the pre-coherence archive
59 158 → 95 380. Growth is the required fixes' content (the `ExportOpts` members and range rule, the view-bound why, the
per-building look, the frame listing, R4-02's rule, the tests' rows); no narration added. The words removed this round
were read against the new text: each removed clause survives in the new wording (the head-index restriction replaced as
R4-12 rules; §11.3's two duplicate slots now `opts`' members; §8.6's look sentence folded with its hand-over, preview and
drawing-only clauses kept). No nuance lost; no shrink past half (no nuance audit triggered).

## 2. Round-3 findings re-checked

| id | Part H | verdict | evidence (live) |
|---|---|---|---|
| VRC2T-08 | FIX per R4-10 | **FIXED** | §12.5 l. 17109–17110: "each applied only while the view is settled — at once when no gesture runs, at the gesture's settle otherwise — and at most once in 10 s (§8.8's Auto loop)" — R4-10's phrase. Sweep end V09 §4.21.11 (2) (l. 3579–3580) reads R4-10's END text. |
| VRC3T-01 | FIX per R4-12 | **FIXED** | §11.2 *At a drawn week* (l. 16455–16463) is the frame's listing in VRC3T-01's text (with `Use.opened`/`closed` read as their events' weeks); §8.2 l. 13151 cites it; T-ER-25 adds the two scrub fixtures, outcome and bar on the listing. Readers: V01 l. 3170, 3189 and `gapUnits(chip, key, week?)` l. 547; V04 l. 2751; V05 l. 2337, 2819; V09 §4.21.10 (7), (8) (l. 3537), (10) `gapUnits(chip, key, week)` (l. 3546); V10 already passes the week. No "restricted to the entities" left in the set. |
| VRC3T-02 | FIX per R4-02 | **FIXED** | §2.9 l. 3384–3396: "layer choices" gone from the list; after it R4-02's sentence ("The layers shown are no view key … the per-viewer `workingLayer` (above) is drawn whatever its visibility (§8.4)"). |
| VRC3T-03 | FIX per R4-10 | **FIXED** | T121-2 l. 18579–18581: "a change lands only while the view is settled (§8.8): at once when no gesture runs, at the gesture's settle otherwise". |
| VRC3T-04 | FIX per R4-10 | **FIXED** | T-V9-84 (V09 l. 4407): "the level changes while the view is settled — at once when no gesture runs, at the gesture's settle otherwise (§8.8; T121-7)". |
| VRC2T-12 | FIX | **FIXED** | `ExportOpts` gains `raised`, `retaining`, `links`, `wings`, `terrain`, `lights`, each with its default, `trees` for the 3-D formats and `vtt.scene { raisedWay }`; each member's effect agrees with §11.1's rows and V09 §5.10's dialog (Map data's checkboxes "both on", "include supply links (on when the link view is on)"; 3-D's "terrain, trees and lights on · off"; Tabletop's "a raised way's deck"). The `links` feature's home is VRC4T-02. |
| VRC3T-05 | FIX | **FIXED** | §11.2 l. 16241–16248: clamp where a nearest lawful value exists (listed in `plat.clamped` of the formats that carry metadata, §11.1 l. 15947, 15998, 16114), else `E_EXPORT_OPTION` naming the member, nothing written, never a crash or a hang; T-ER-19 adds each request with its outcome and bar. The prose error matches the base's pattern (`E_KNOWLEDGE_TIER`, `E_HOST_FORMAT`: no typed export-error union); §11.3's `export.refused` "(an API error of `export`)" carries it. A residual tie is VRC4T-03. |
| VRC3T-06 | FIX | **FIXED** | §8.1 l. 12344 declares `Box`; `thumbnail`'s `box` and `ExportOpts.frame` read `Box`; no `BoxCm` in the set. §14's lists are VRC4T-05. |
| VRC3T-07 | FIX | **FIXED** | §11.3 l. 16615–16617: `export.request { fmt: Format, opts?: ExportOpts, bundle?: true }`, `knowledge` and `displayNames` `opts`' members; §11.1 l. 15974 "carries it in its `opts`". V08 END: §2.2's comment (l. 417) reads as ruled; V08 §5.4 (2) (l. 3121–3122) also reads `opts` carrying both. |

The other ids Part H routed to rendering, and its five END lines, were read in the new text and are written as ruled:
VAL-R3-04 (§11.1's portals, agreeing with V04 §5.6 (5)), VAL-R3-06 and VV12-r3-02 (R4-04's phrases at §8.2, §8.6, §11.2's
`districts`, T-ER-27, T-ER-28; §8.2's restated hand-over agrees with V06 §3.22 (3) l. 3385–3391), VAT-r3-02 (R4-05's `why`
`view?`; its ends V10 l. 986, 1642–1644, V09 l. 620, V07 l. 3097, 3123, 3128 written), VAT-r3-04 (T-ER-21), VCS-r3-07 (no
"reference view" left in this unit), VV34-r3-02 (§8.6's floor row agrees with V03 §5.6 (1) l. 2660–2661); END VPC-R3-03
(§8.2's barrier sentence word for word with §10.2 (d) l. 15645–15648), VV56-r3-03 (T-ER-27; §10.2 (h)'s rule l. 15728),
VAL-R3-01 (§8.4 l. 13580–13586, §9.2 l. 14798–14799, §11.2 l. 16215–16216 in R4-02's words; V04 l. 2694, V05 l. 2323 written),
VV910-r3-02 (`looks` `building?`, `crises[].over`; V09 l. 1007, 3633 and V10 l. 1021 read them), VV910-r3-03 (`festivals`).
The repair's note-5 reading of Find's "layer shown" as the working layer agrees with item 120 (f)'s words and V09
§4.21.10 (8), V04 §5.1 and V05 §5.6 (3); R4-02's rule is tested at V09's row 21 (T-V9-80 (21)) and T-V9-83 (g).

## 3. Checks

* `doc_checks.py --sections 8,9,11,12` exit 0: C1 5/0, C2 1/0, C3 191/0, C4 3/0, S1 0/0, S2 272/0 (hits/unreviewed; the
  repair's three proposed rows reviewed and appended by assemble-r4). WARNING printed: reference corpus INCOMPLETE
  (captures, research/patreon, research/devlogs, research/ftg-docs, research/external absent) — clean-room results NOT
  authoritative; provisional.
* References (`work/assemble-r4/refs.py` over the live set, 55 885 references): in §8, §9, §11, §12 2 940 resolved, 0
  broken; 2 external (RFC 7946 §3.1.6, §4) and 1 ambiguous ("V06 §2.3, §4.1", l. 16184), all pre-existing (earlier verdict
  kept).
* Canon retired terms over the fourteen subsections pre → live: none added. The new "hand-over" in §8.6 matches G-unitinput's
  coarse pattern but is the crisis look's established word (§10.2 (f) l. 15623, T122-1 l. 18611), not the retired
  unit-run view. "reference view" left only at scope's T121-3 (VRC4T-06) and in the rationale's verbatim Part F record.
* Review ids, narration, deferral wording in the added text: none. Phone clause (item 126 (a2)): none in §8–§12.
* Old settle phrases ("next settle", "only at the settle") left in the set: none but V12's edge row 32 (a change during a
  gesture; agrees, as R4-10 says).

## 4. Issues

Severity by J141's standard. No round-3 finding persists; new ids carry `r4` (VRC4T-…).

### VRC4T-01 (major, rendering) — whether a DPR change waits for the 10 s window: two outcomes

**Claim.** §8.8 (l. 14330–14332) applies a device-pixel-ratio change "at once when no gesture runs, at the gesture's
settle otherwise (T121-7)", with no rate limit, while the same unit's judgment J-A121.07 holds it to the loop's window —
the base index row (l. 22865: "a change Auto's loop decides while no gesture runs, and a device-pixel-ratio change,
applied at once (at most once in 10 s)") and its Part A entry ("are applied at once, still at most once in 10 s") — and
R4-10's binding phrase for "Auto's or a device-pixel-ratio change's timing" ends "— and at most once in 10 s (§8.8)". The
repair's sweep wrote R4-10's phrase into §8.8's DPR sentence without its last clause. A window dragged to another monitor
within 10 s of a loop change (an idle view stepped down under a weather spell, then moved): one builder applies the new
DPR at once, another holds it until 10 s have passed since the last change. No bar separates them (T121-7 bars the
re-evaluation only; T-ER-26's idle fixture has no change before it).

**Required change.** §8.8's sentence reads "A device-pixel-ratio change (the window moved to another monitor) refits d at
once and is applied while the view is settled — at once when no gesture runs, at the gesture's settle otherwise — and at
most once in 10 s, counted with the loop's changes, so one coming within 10 s of the last change applies when those 10 s
end (T121-7)"; T-ER-26 adds the input "a monitor change with the view idle within 10 s of a loop step-down" with the
outcome "applied within one frame of the end of the 10 s since that step-down".

### VRC4T-02 (minor, rendering) — the GeoJSON `supplyLink` feature has no home in §11.1 and two scopes

**Claim.** §11.2's new `ExportOpts.links` writes "one LineString of kind `supplyLink` per supply link within the export's
scope … (V09 §5.15)", but §11.1's GeoJSON row — the base's list of the exporter's features, whose builder is the base's —
names no `supplyLink` feature (only `supplyChain`, file f item 410), and V09 §5.15 (l. 4126) says "one LineString per link
in view scope": the feature is stated in an options comment and a volume, and the two disagree in form on which links it
holds (the Map data export has no scope of its own, V09 §5.10).

**Required change.** §11.1's GeoJSON row adds, after the `supplyChain` clause: "with `ExportOpts.links` (§11.2), one
LineString of kind `supplyLink` per supply link within the export's scope — `good`, `consumer`, `provider`,
`satisfaction`, `declared`, as the `links` query reads them (§11.2), a withheld end by address and kind and a concealed
use's links left out"; §11.2's `links` comment cites "§11.1" for the feature (V09 §5.10 for the checkbox); V09 §5.15's row
reads "one LineString per link within the export's scope (§11.1; §11.2's `ExportOpts.links`)" (V09's end).

### VRC4T-03 (minor, rendering) — the out-of-range rule leaves a tie and a non-number open

**Claim.** §11.2's out-of-range rule clamps "`vtt.squareM` to the nearer of 1.5 and 1": a scripted 1.25 is equidistant, so
two builders write a 1 m or a 1.5 m grid. A non-finite numeric member (`NaN` for `vtt.pxPerSquare`, `stride` or a `size`
side, which a script or a bridged message can carry) is neither "below 50" nor in the refusal list, so whether it clamps
or refuses is unstated. Off the dialog's path (V09 §5.10 offers none), hence minor.

**Required change.** The rule reads "… `vtt.squareM` to the nearer of 1.5 and 1 (1.25 to 1.5, the default) …" and adds to
the refusal list "a numeric member that is not a finite number"; T-ER-19's out-of-range list adds `vtt.squareM` 1.25 and a
`NaN` `vtt.pxPerSquare` with those outcomes.

### VRC4T-04 (minor, rendering) — the drawn-week listing's trigger and budget are not stated in the base

**Claim.** §11.2 now computes the listing at a drawn week from the frame ("read from V06 §3.15.2's frame (its `Use`
records …; the `HistoryStore` images between the frame and the head)"), yet its closing sentence and §12.5's Find budget
say the readers read "the generation worker's Find index, rebuilt once per commit" (R12-35: "the index once per commit"),
while V09 §4.21.10 (7) rebuilds it also "at each change of §2.9's `week` (a timeline scrub, a host's `view.set { week }`)
and at each `onEffectiveKey`". The base's trigger list omits the week and key changes its own rule needs, and no budget
or timing bar covers the re-evaluation a scrub causes (T120-6 and R12-35 time a key's suggestions and a click's glow only;
V06 §6.4 budgets the frame, not Find over it).

**Required change.** §11.2's sentence reads "… read it, from the generation worker's Find index, rebuilt once per commit
and at each change of the effective key (§12.5), and, at a drawn week whose frame is not the head, re-derived from that
frame at each change of §2.9's `week` (V09 §4.21.10 (7))"; §12.5's Find paragraph adds "a change of the drawn week
re-evaluates the chips' listing (§11.2's *At a drawn week*) off the scrub's path, within ≈ 100 ms of the frame being drawn
at the METROPOLIS cap (V06 §6.4), the frame never waiting for it"; R12-35's row and T120-6 add that timing.

### VRC4T-05 (minor, scope) — §14's `@plat/model` lists omit `Box`

**Claim.** §8.1 now declares `Box` among the types "declared in @plat/model (§14), so @plat/labels and @plat/render share
them", and `labels`' own `ObstacleSource` (§14 l. 19654–19655) takes `Box`, but §14's `@plat/model` line (l. 19396: "the
shared view vocabulary `LodBand`, `Role`, `ZoomStop` and the label-row tables"), its dependency rule (l. 19529: "the types
both use (`LodBand`, `Role`, `ZoomStop`, `LabelEntity`, the label-row tables and `LabelRows`) come from `model`") and the
type index (l. 19662: "LodBand, Role, ZoomStop, LabelTable, StringTable, GeomTable: §8.1, §8.2, §8.8") name no `Box`.

**Required change.** Each of the three lists adds `Box` after `LodBand`: "the shared view vocabulary `LodBand`, `Box`,
`Role`, `ZoomStop` …"; "(`LodBand`, `Box`, `Role`, `ZoomStop`, `LabelEntity`, …)"; "LodBand, Box, Role, ZoomStop,
LabelTable, StringTable, GeomTable: §8.1, §8.2, §8.8".

### VRC4T-06 (minor, scope) — T121-3 keeps the retired "reference views"

**Claim.** T121-3 (§13.8 l. 18583) reads "over §12.5's reference views"; the canon's G-refview retires "reference view"
for "reference viewport" (§12.5's home), and every other site in the set now reads "reference viewport(s)" (the repair's
hand-off named this site).

**Required change.** T121-3 reads "over §12.5's reference viewports".

### VRC4T-07 (minor, determinism) — §7.7 calls the host's layer command "the layers shown"

**Claim.** §7.7 (l. 11873–11874): "the host's commands (§11.3: a week and a selection by `view.set`, the layers shown by a
logged `setLayer` …)". Under R4-02 a host's layer command sets a layer's visibility, while the view draws its working
layer whatever its visibility (§8.4); §11.3 and T-ER-21 now say "a layer's visibility". A restatement left in the older
form.

**Required change.** The parenthesis reads "(§11.3: a week and a selection by `view.set`, a layer's visibility by a logged
`setLayer` sent by `doc.apply`, as a user's toggle)".

### VRC4T-08 (minor, V08) — V08 calls the host's layer command "the layers shown"

**Claim.** V08 l. 489 (`setView`'s comment: "the layers shown go as a logged setLayer by doc.apply (§8.4)"), l. 2450 and
l. 2521 ("A host sets the frame's view only by §11.3's commands — `view.set { week }`, `view.set { select }` and the layers
shown by a logged `setLayer`") restate §11.3 in its pre-R4-02 form; `setLayer` writes the document's style, not the
frame's view, and the frame draws its working layer whatever its visibility (§8.4).

**Required change.** l. 489 reads "a layer's visibility goes as a logged setLayer by doc.apply (§8.4)"; l. 2450 and l. 2521
read "… `view.set { week }` and `view.set { select }`, and a layer's visibility by a logged `setLayer` sent by `doc.apply`
(the document's style, §8.4) …".

### VRC4T-09 (minor, pipeline) — §10.2 keeps "its districts'" for a disaster look's units

**Claim.** R4-04 (a) makes "the look's units (§10.2 (d))" the one phrase, never "district" alone at the village rungs, and
§8.2's `ruinTone` lies on "a unit's faces — a district's, or at the village rungs its unit's plots'". §10.2 (d)'s footprint
exception (l. 15650: "a disaster's ruins and its districts' tone") and `CrisisLookRow.lookLevel`'s comment (l. 15277: "the
decay level its districts' buildings draw") still say districts (the repair's hand-off named the first).

**Required change.** l. 15650 reads "a disaster's ruins and its units' tone (§8.2's `ruinTone`)"; l. 15277 reads "the
disaster row only: item 123's decay level the buildings it stands over draw ((f)) at severity 0 and 1, linear between".

## 5. Summary

9 round-3 findings: 9 FIXED (VRC2T-08, VRC3T-01 – VRC3T-04 major; VRC2T-12, VRC3T-05 – VRC3T-07 minor), every END line's
second end written. New: 9 (VRC4T-01 major; VRC4T-02 – VRC4T-09 minor).
Total open: **9 issues — 0 blocker, 1 major, 8 minor**; owners rendering 4 (VRC4T-01 major; VRC4T-02, -03, -04 minor),
scope 2 (VRC4T-05, -06), determinism 1 (VRC4T-07), V08 1 (VRC4T-08), pipeline 1 (VRC4T-09).
