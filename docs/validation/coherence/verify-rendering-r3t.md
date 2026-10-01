# verify-rendering-r3t — base §8, §9, §11, §12 after repair round 3

> Lane `coherence/verify-rendering-r3t` (opus verifier). Base `docs/ARCHITECTURE.md` sha256 593c657d… (assemble-r3's output;
> before the round 4ed292e9…), rationale e7b59eac…. Scratch: `scratchpad/coherence/vr3/`.

PROGRESS
- P0 brief read whole; RESUME/CONTINUE check (no output, no LANDED): done
- P1 inputs: verify-rendering-r2t (19 findings), adjudication-r3 (R3-01 – R3-27; Part H · rendering with its 6 END lines; the
  END lines and rulings that close my findings' second ends), repair-r3-rendering's header, assemble-r3 (only rendering's
  12 REPLACE blocks touch §8, §9, §11, §12): done
- P2 the 12 replaced subsections' word diffs read whole, pre → live; the changed passages read in context: done
- P3 VRC2T-01 – VRC2T-19 re-checked against the live text, each END line's second end included: done
- P4 receipts, doc checks, references, terms, review ids, deferral: done
- P5 new findings, report, result, LANDED: done

## 1. What changed in scope

Pre-round base 4ed292e9… (`git show 920d280`) against live 593c657d…; only `repair-r3-rendering.md`'s blocks touch §8, §9,
§11 and §12 (assemble-r3: 0 overlaps, no other unit's block in scope). Twelve subsections replaced, each word diff read
whole, every other subsection byte-identical:

| subsection | words pre → live | what the round wrote |
|---|---|---|
| §8.1 | 2 949 → 2 963 | the week change re-emits buildings whose damage marks differ (VV12-r2-06 (3)) |
| §8.2 | 18 091 → 18 438 | barricade exception, `blockade` verges cell, five banners, nine chip glyphs, Find's drawn week and its no-chip rule, the hand-over by `crisisLookYields`, the legend's `looks` reader, the spell's kind at `yearWeek`, weather mark keying, ADJ-r3-02's bar citation, the Works `decaying` row |
| §8.4 | 6 803 → 6 904 | (g) the standard surface no lawful rung on a full-precision tier; (i) off while the underground layer is drawn |
| §8.6 | 1 421 → 1 574 | §6.3's comparison, the roofless bays, the per-element `decayPeak` repaired rule, the plan last lived in, the look in the drawing only |
| §8.8 | 5 503 → 5 752 | tile key's `crises` and key; the fitting order and Auto's ladder on a full-precision tier, worked cases re-run; idle view settled; effects off under the underground layer |
| §8.11 | 3 163 → 3 819 | T-ER-25 – T-ER-29 rows and bars |
| §9.5 | 1 565 → 1 578 | the legend's crisis entries are the `looks` evaluation |
| §11.1 | 6 436 → 6 528 | the geo anchor (item 125); battle-map damage at the own level, `cellarWall`/`cryptWall`, broken flights, no room light |
| §11.2 | 6 974 → 8 099 | `ViewHandle`, `Format`, `ExportOpts`; `gazetteer` `week?`; the `looks` reader and `LooksAnswer`; `FindLayer` → `Layer`; `RaisedKind`; *At a drawn week* |
| §11.3 | 2 542 → 2 601 | the host's layers by a logged `setLayer`, `view.set { week }` writes `week` only, `depthBand` never crosses |
| §11.4 | 959 → 956 | `line` checked against the dossier's own selection (G125-V08's END) |
| §11.6 | 391 → 402 | T-ER-21's outcome for the host's commands |

Size (principle (9)): §8 + §9 + §11 + §12 91 201 → 94 018 words this round (+3.1 %); against the pre-coherence archive
59 158 → 94 018. The unit has not shrunk; the growth is the g items' new design (111 – 126) and the rounds' required
fixes, none of it narration (no review id, `R2-`/`R3-` id or round talk in the twelve subsections). No nuance audit is
triggered (no shrink past half).

## 2. Round-2 findings re-checked (VRC2T-01 – VRC2T-19)

| id | Part H | verdict | evidence (live) |
|---|---|---|---|
| VRC2T-01 | FIX | **FIXED** | §8.2 *Each chip's colour and second cue*: nine glyphs (ring added) by (k − 1) mod 9 against eight colours and dashes; "no two of the first 72 chips share colour and glyph" (lcm 8, 9 = 72, right); T-ER-25 bars chips 1/9 and 8/16 on pins, legend and V09's panel. V09 END: §4.21.10 (5) "chip k's from §8.2's nine glyphs by (k − 1) mod 9". |
| VRC2T-02 | FIX per R3-14 (3) | **FIXED** | §8.2 placement: "on a way's carriageway only a `barricade` … — no camp, tent, cart, engine or other part"; `blockade` city cell on `approachRoads`' verges; T-ER-27's bar and `raiders`/`rebellion` fixtures. |
| VRC2T-03 | FIX per R3-14 (3) (pipeline) | **FIXED** | §10.2 (d): "on a way's carriageway only a `barricade` across it … — never a camp or any other part", with R3-14 (2)'s footprint clause. |
| VRC2T-04 | FIX per R3-14 (3) (V12) | **FIXED** | V12 l. 2706: "`crisis.blocked` 0 — … a way's carriageway save a `barricade` across". |
| VRC2T-05 | FIX | **FIXED** | §8.4 (g) "On a tier that holds full precision … the standard surface is no lawful rung"; §8.8's order and ladder pass over it; worked cases checked by hand (P = 12/24/35 at DPR 1/1.5/2 of 1 440 × 900; 106.5 / 141.5 / 191.5 / 226.5 / 268.5 MB; 5K 475.17; 8K vector 329) and the receipt `coh_repair_rendering_r3_resolution.py` re-run byte-identical, its (3) "no fitted frame on a full-precision tier … standard surface: True"; T-ER-26 adds the tier. |
| VRC2T-06 | FIX (closes VAL-R2-07) | **FIXED** | §11.1 storey, underground-band and footprint clauses read the own level, never `lookLevel`; `cellarWall`/`cryptWall` keep segments (V04 §5.6 (2), (5)); a broken flight below level 0 a portal (V04 §5.6 (3)); no room light in a decay run (V03 §5.6 (6)); agrees with V03 §5.3 l. 2524–2531 and V04 §5.6 (5); T-ER-28's disaster-look scene fixture. |
| VRC2T-07 | FIX per R3-24 | **FIXED as ruled** | §8.2 re-runs on the drawn week and states the outcome; §11.2 `gazetteer` `week?` and *At a drawn week*; `live.crises` over the model the view draws; T-ER-25's scrub rows. Ends: V09 §4.21.10 (7)–(8) (the `week` change among the triggers), V10 l. 1446 / §3.9b (7), V01 §3.16 l. 2325. The ruled mechanism leaves a defect of its own: **VRC3T-01**. |
| VRC2T-08 | FIX | **PARTLY FIXED** | §8.8 (idle view settled; DPR change at once when idle) and T-ER-26 fixed, J-A121.07 records it. §12.5 *The frame budgets Auto holds* still says "each applied only at the settle" — the defect stands there (kept, below); its scope and V09 restatements are **VRC3T-03** and **VRC3T-04**. |
| VRC2T-09 | FIX | **FIXED** | §8.2: "While §2.9's per-viewer key `find` holds a chip …"; "with no chip it delivers nothing — … `gaps` alone draws no veil"; T-ER-25 "no gap and no veil". |
| VRC2T-10 | FIX | **FIXED** | §8.2: five banner glyphs by (i − 1) mod 5 against four colours by (i − 1) mod 4 (first repeat together at the 21st army, right); T-ER-27's five-army coalition. |
| VRC2T-11 | FIX per R3-22 (a) (closes VDC2-12) | **FIXED** | §11.1: "No input gives a true bearing (§7.7 layer 2's *Bearing*; item 125 (a)–(b)), so a dossier-bound map's anchor takes the same default (0°, 0°, 0°) and stays a user setting". |
| VRC2T-12 | FIX | **PARTLY FIXED** | `interface ExportOpts` declared once in §11.2 with `Format` and `ViewHandle`; §14's `Exporter` (l. 19476), §11.1 and V08 W81 cite it. It still lacks options V09 §5.10 and §11.1 offer (kept, below, minor). |
| VRC2T-13 | FIX per R3-04 (closes VDC2-08) | **FIXED** | §8.6 "damaged while the level is above 0 and at least t — §6.3 *Plan damage*'s one comparison". No "level ≥ t" left in the set. |
| VRC2T-14 | MERGED into VM-R2T-02 | **FIXED** | §2.6 step 7 carries R3-06's binding text ("while above 0 (§6.3 *Plan damage*'s one comparison: a level of 0 damages nothing)"). |
| VRC2T-15 | FIX per R3-08 (b) | **FIXED** | §8.6: "an element whose threshold lies above the own level and at or below V06's per-element `decayPeak` (since its entry into the plan, V06 §3.23 (3)) … until the plan changes …; a look leaves no patch". |
| VRC2T-16 | FIX (model) + END (pipeline) | **FIXED** | §2.9 *The crisis framing*: "… and the ring's massed camp marks beyond it, §8.8's *The surrounding ring*"; §10.2 (g): "The placed camps' and the ring arcs' bounds". |
| VRC2T-17 | FIX per R3-23 (c) | **FIXED** | §8.2 *Weather effects*: "at the year position — §2.9's `yearWeek`, never the drawn week; §6.1's stream". |
| VRC2T-18 | FIX (elegance) | **FIXED** | `FindLayer` gone from the set; `GazetteerAnswer`'s three `layer` fields typed `Layer`; V10 `FindAnswer` cites §2.1's `Layer` (END). |
| VRC2T-19 | FIX | **FIXED** | Rationale J-A121.02 – J-A121.07, J-A122.02, J-A124.02 with index rows (base l. 22657–22664); J-A68.89 restated with the mid-tier clause ("at 1.5 on the mid tier on a device of ratio 1.5, 123.25 MB (at the reference ratio 2, DPR 1 with item 121's text layer, 103.75 MB, §8.8)") and the full-precision figures. |

The other ids Part H routed to rendering, and the six END lines under its heading, are written as ruled: VAF-R2T-02
(§8.6's roofless bays, R3-05), VAF-R2T-06 (`RaisedKind`), VAL-R2-01 (§8.4 (i), §8.8, T-ER-29), VAL-R2-02 (`depthBand` never
crosses), VAT-r2-04 (§11.3 `setLayer`, T-ER-21), VAT-r2-05 (`looks` reader, §8.2's legend in R3-16 (a)'s words, §9.5),
VKr2-08, VV12-r2-06 (§8.1, §8.8's key, §8.2's `decaying` row), VV56-r2-02 (R3-10's hand-over); END G125-V08 (in §11.4,
where the quoted sentence lives), VEW-r2-03, VEW-r2-05, VPC-R2-03 (T-ER-27), VV56-r2-06 (inside §8.6's sentence), ADJ-r3-02
(§8.2's greyscale bar). The repair's hand-off on `CrisisLookRow.label` is moot: §10.2 declares `label` (l. 15153).

## 3. Checks

* Resolution receipt `docs/validation/bench/coh_repair_rendering_r3_resolution.py` re-run: output byte-identical to the
  committed `.out`.
* `doc_checks.py --sections 8,9,11,12` exit 0: C1 5/0, C2 1/0, C3 189/0, C4 3/0, S1 0/0, S2 251/0 (hits/unreviewed). WARNING
  printed: reference corpus incomplete (captures, research/patreon, research/devlogs, research/ftg-docs, research/external
  absent) — clean-room results NOT authoritative; provisional.
* References (`work/assemble-r3/refs.py` over the live set): in scope 0 broken; 2 external (RFC 7946 §3.1.6, §4) and 1
  ambiguous ("V06 §2.3, §4.1", l. 16043), both pre-existing (earlier verdict kept).
* Canon retired terms: none added in the twelve subsections. Review ids and deferral wording: none. Phone clause: none
  (item 126 (a2)).
* New types declared this round resolve: `ViewHandle`, `Format`, `ExportOpts`, `LooksAnswer`; `Admission`, `PlatKey`,
  `CrisisLookKind`, `CrisisMapRow`, `ViewState`, `LayerSpec`, `RaisedKind` declared; `BoxCm` is not (VRC3T-06).

## 4. Issues

Severity by J141's standard. Ids of round 2 kept where the defect persists; new ids carry `r3` (VRC3T-…).

### VRC2T-08 (major, rendering) — §12.5 restates the old settle rule

**Claim.** §8.8 now applies an Auto change at once while the view is idle and a DPR change at once when idle (J-A121.07),
but §12.5 *The frame budgets Auto holds* still reads "a rolling p95 over the budget through 2 s steps one rung … down, one
under 60 % of it through 10 s one up, each applied only at the settle and at most once in 10 s". *The settle* is §8.8's
gesture event (*Gestures*: "the **settle**, at which the Auto changes decided during the gesture apply"), so a builder
reading §12.5 never applies a change decided on an idle view — VRC2T-08's defect, restated in the same unit.

**Required change.** §12.5's clause reads "… each applied only while the view is settled — at once when no gesture runs,
at the gesture's settle otherwise — and at most once in 10 s (§8.8's Auto loop) …".

### VRC3T-01 (major, rendering) — Find at a drawn week matches by the head's uses

**Claim.** §11.2 *At a drawn week* (new): "every row, count, match and gap unit is the head index's restricted to the
entities the frame holds". A kind chip's match is "every entity holding an admitted `Use` whose `cls` is among its
classes … one match per entity" (*Find's match listing*), and a `Use` is itself an addressed record with `opened` and
`closed` (§2.6). So at a scrubbed week (V06 §3.15.2's frame is a whole model with its own uses): (a) a building that held
a smithy then and a bakery at the head is matched by "Bakery" (the building is held by the frame) and not by "Smithy",
glowing, pinning and counting a use the frame does not draw, unless "entities" is read to include the `Use` — two
builders read it two ways; (b) a use or building the frame holds that the head has since closed, moved or demolished is
in no head row and is never matched, though drawn — the second half of VRC2T-07's claim ("misses ones it holds"), which
the restriction leaves standing against R3-24's own sentence ("Find counts, glows, pins, lists and gaps only the entities
that frame holds" — the frame's, not the head's). T-ER-25's scrub fixtures (before a matched building was built; after a
closed use's end) exercise neither case.

**Required change.** §11.2 *At a drawn week* reads: "where that week's frame is not the head, the listing is the frame's:
the head index's matches less those whose entity, or whose matching use, the frame does not hold open at that week, plus
the frame's own uses and entities of the chip's classes or target that the head lacks or holds otherwise — read from
V06 §3.15.2's frame (its `Use` records with `opened` at or before the week and no `closed` by it; the `HistoryStore`
images between the frame and the head) — so a building matches by its use at that week, never its head use, and an
entity or use the frame holds matches though the head has since closed, moved or demolished it; a chip with none there
counting 0; absent, the head"; §8.2's *At a drawn week* sentence cites it ("each chip's matches are §11.2's listing at that
week"); T-ER-25's scrub fixture adds a week before a matched use closed and a building whose use changed since that week
(matched by its use then; the closed use matched and drawn). V09 §4.21.10 (8) and V10's `read_map find` then read the
same listing (their "restricted to the entities that frame holds" cites §11.2).

### VRC3T-02 (major, model) — §2.9 still lists "layer choices" as view state

**Claim.** R3-21 (a) rules the layers shown document style state — `LayerSpec.visible` set by a logged `setLayer`, "never a
`view.set` key" — and §11.3 now says "`LayerSpec` is the document's style state, §8.4, and no view key, so `view.set`
never carries it". §2.9 *View state* still opens "time, location, favourites, notes and public notes, view pins, **layer
choices**, `stylePreset` …" (l. 3318), the per-viewer, unlogged state "outside every digest". One builder makes the layers
shown a per-viewer view key, another a logged, undoable, shared event (§7.1's T12 `dress`; §8.4).

**Required change.** §2.9's *View state* list drops "layer choices" and adds after the list: "The layers shown are no view
key: `LayerSpec.visible` is the document's style state, set by a logged `setLayer` (§8.4, §7.1; §11.3)."

### VRC3T-03 (major, scope) — T121-2 bars a change to "§8.8's settle"

**Claim.** T121-2 (§13.8, l. 18384–18386): "no level change while a pan, zoom or drag is in progress — a change lands only
at §8.8's settle —". Under §8.8's new rule a change decided while the view is idle lands at once, with no settle event;
T-ER-26's bar runs T121-2 with "with the view idle the DPR change and the step-down each applied within one frame of the
decision (T121-2, T121-7)". The two bars disagree on the idle case; T121-2 as written fails a correct implementation.

**Required change.** T121-2's dash clause reads "— a change lands only while the view is settled: at once when no gesture
runs, at §8.8's settle after one —".

### VRC3T-04 (major, V09) — T-V9-84 holds a DPR change to "the next settle"

**Claim.** T-V9-84 (V09 l. 4367): "a device-pixel-ratio change re-evaluates within one frame and the level changes only at
the next settle (T121-7)", unqualified, while §8.8 applies a DPR change "at once while the view is idle, at the settle
while a gesture runs" and T-ER-26 requires the idle change "applied within one frame of the decision". On an idle view
T-V9-84 fails the design's behaviour or makes the builder wait for a gesture. (V09's row 89 and V12's edge row 32 speak of
a change during a gesture and agree.)

**Required change.** T-V9-84's clause reads "a device-pixel-ratio change re-evaluates within one frame and the level
changes at once when the view is idle, at the gesture's settle when one runs (§8.8; T121-7)".

### VRC2T-12 (minor, rendering) — `ExportOpts` lacks options the set offers

**Claim.** §11.2's `ExportOpts` says it holds "every option an export reads, declared once … written by V09 §5.10's
dialog", but V09 §5.10 offers, and §11.1 / V02 §5.5 / V09 §5.15 define, options with no member: Map data's **Raised ways**
and **Retaining walls** checkboxes (file f item 447 (a)) and **include supply links** (V09 §5.15's `supplyLink`
LineStrings); GeoJSON's optional `wings` layer (§11.1; V02 §5.5); 3-D's **terrain, trees and lights on · off** (`trees`
is typed for GeoJSON only); Tabletop's layer **a raised way's deck** (`vtt.scene` has no raised-way form).

**Required change.** `ExportOpts` gains, each with its default: `links?: boolean` (GeoJSON, V09 §5.15; default on while the
view's `thematic` is `links`), `raised?: boolean` and `retaining?: boolean` (GeoJSON, file f item 447 (a); default true),
`wings?: boolean` (GeoJSON, V02 §5.5; default false), `terrain?: boolean` and `lights?: boolean` (3-D; default true) with
`trees` extended to the 3-D formats (`'none'` leaving them out, else drawn), and `vtt.scene` the form
`{ raisedWay: Id }` (one deck scene, §11.1 *Per raised way*).

### VRC3T-05 (minor, rendering) — an `ExportOpts` value outside its stated range has no outcome

**Claim.** The new typed members state ranges a script or a bridged `export.request` can pass outside — `vtt.pxPerSquare`
"at least 50", `band` "'neighbourhood' only for a district-sized or smaller frame", `vtt.scene` naming a building, storey
or depth band, `stride` (years), `size` (`px`, `dpi`) — and nothing says what an export does with 30 px a square, the
neighbourhood band over a whole town, a storey the building lacks, a stride of 0 or a zero-sized picture (clamp, refuse
or draw); T-ER-19 and T-ER-20 test none. The dialog never produces such values (hence minor: no normal path).

**Required change.** §11.2 states beside `ExportOpts`: a member outside its range that has a nearest lawful value is
clamped to it and named in the export's report (`pxPerSquare` → 50; `band` 'neighbourhood' over a larger frame →
'district'); one with none — a `vtt.scene` naming what the scope lacks, a `stride` ≤ 0, a `size` side or `dpi` ≤ 0, a
zero-area `frame` — refuses the export (`export.refused` / the rejected promise, naming the member), never a crash or a
hang; T-ER-19 adds a request of each.

### VRC3T-06 (minor, rendering) — `BoxCm` and `Box`: two undeclared names for one box

**Claim.** `ExportOpts.frame?: BoxCm` (new) and `thumbnail`'s `box: BoxCm` use `BoxCm`; `DisplayList.bounds: Box`,
`dirty: Box[]`, `LiveLayerProvider.marks(…, region: Box)`, `VectorBackend`'s `frame: Box` (the writer `ExportOpts.frame`
feeds) and §14's `ObstacleSource` use `Box`. Neither is declared anywhere in the set (principle (2): one name).

**Required change.** §8.1's code block declares `type Box = { x0: Cm; y0: Cm; x1: Cm; y1: Cm };   // an axis-aligned box in
world cm, as MarkTable.bbox's four values`; §11.2's `ExportOpts.frame` and `thumbnail`'s `box` read `Box`.

### VRC3T-07 (minor, rendering) — the bridge's `export.request` carries `knowledge` and `displayNames` twice

**Claim.** §11.3: "`export.request` becomes `export.request { fmt, opts, displayNames?, knowledge?: Admission, bundle?: true }`",
while `opts` is now §11.2's `ExportOpts`, whose members include `knowledge` and `displayNames`; §11.1 says "the bridge's
`export.request` carries the same field". Two slots for one value, with no rule for which governs when both are sent.

**Required change.** §11.3's message reads `export.request { fmt: Format, opts?: ExportOpts, bundle?: true }` — the
requester's `knowledge` and `displayNames` being `opts`' members (§11.2) — and V08 §2.2's comment "export.request gains
displayNames?: …, knowledge?: Admission …" reads "export.request's `opts` carries `displayNames` and `knowledge` (§11.2's
`ExportOpts`)" (V08's end).

## 5. Summary

19 round-2 findings: 17 FIXED (VRC2T-14 through VM-R2T-02; VRC2T-07 as ruled), 2 PARTLY FIXED and kept (VRC2T-08 major,
VRC2T-12 minor). New: 7 (VRC3T-01 – VRC3T-04 major; VRC3T-05 – VRC3T-07 minor).
Total open: **9 issues — 0 blocker, 5 major, 4 minor**; owners rendering 6 (VRC2T-08, VRC3T-01 major; VRC2T-12, VRC3T-05,
VRC3T-06, VRC3T-07 minor), model 1 (VRC3T-02), scope 1 (VRC3T-03), V09 1 (VRC3T-04).
