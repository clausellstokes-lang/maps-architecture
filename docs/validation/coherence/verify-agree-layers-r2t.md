# Agreement check, round 2 — the layers and the variant products (verify-agree-layers-r2t)

> PENDING FABLE REVIEW — opus seat coherence/verify-agree-layers-r2t (agreement re-check after assemble-r2), standing in for the Fable seat.

PROGRESS
- P0 resume check (no output, no LANDED line for this key): fresh start — done
- P1 brief read whole (ROUND-2 NOTES, ORCHESTRATION NOTES); adjudication-r2 Parts A–H for this lane's units; assemble-r2 whole; file g items 120–126 whole — done
- P2 round-1 findings (VAL-05, VAL-08, VAL-18, VAL-R1-01 – VAL-R1-14, the eighteen G-parts) re-checked against the live text — done
- P3 round-2 blocks in scope re-read (before = HEAD `d49a590`, after = the live files at assemble-r2's sha256) — done
- P4 owner items 120–126 in scope checked as new design (wiring, lifecycle, edges, agreement, the owner's words) — done
- P5 matrix gaps hunted in the new text; sibling round-2 reports read for overlap — done
- P6 report, result file, LANDED — done

**Result: 9 issues — 0 blocker, 7 major, 2 minor** (DISAGREE 5, MATRIX-GAP 1, HANDOFF-OPEN 1, AMBIGUOUS 1, COHESION 1).
Owners: rendering 3, pipeline 2, V07 2, V05 1, determinism 1. **All 35 round-1 findings are closed**: the 17 VAL findings
are fixed as the adjudicator ruled them (R2-06, R2-12, R2-25, R2-26, R2-28, R2-29, R2-34, VRC1T-11's text), and the 18
owner-item parts (G120 – G125 in model, pipeline, rendering, V04, V07) are written. Four issues are new to this lane
(VAL-R2-01 – VAL-R2-04: the weather effects over the underground view, `depthBand` across the bridge, the `cryptVault`
key at §6.3, V05's stale owner-item ranges); five are seams between this lane's members that sibling round-2 seats
also raised, filed here as ONE FIX with their ids so each closes once (VAL-R2-05 – VAL-R2-09).

## Scope and method

**Members.** model (§2), pipeline (§4, §10, PART II, PART III), rendering (§8, §9, §11, §12), V04 (underground), V05 (sky),
V07 (village); determinism, scope and other volumes only where a member's statement or hand-off lands there.

**Inputs read.** The brief whole; `verify-agree-layers-r1t.md` and its result; `adjudication-r2.md` (Parts A–G whole, Part H
for scope, model, kernel, pipeline, determinism, rendering, V01–V07, Part I); `assemble-r2.md` whole (410 of 410 blocks
applied, 0 skipped, 0 RULING REQUEST; V04 24 blocks, V05 10, V07 21; the base 71 across six units); file g items 120–126
and 122 (h)–(i) whole; the round-2 results of the sibling seats that have landed (determinism, kernel, model, pipeline,
rendering, scope, vol-V01-V02, vol-V03-V04, vol-V05-V06, vol-V07-V08, vol-V09-V10), read for overlap only.

**How the repaired text was read.** The live files equal assemble-r2's sha256 after (base `4ed292e9…`, V04 `2786cc53…`, V05
`7617d87c…`, V07 `8a4302dc…`) and the pre-round copies its sha256 before (HEAD `d49a590`). Line diffs: V04 57 hunks,
V05 17, V07 51, every one read; the base's 326 hunks filtered to the layers' and the village's subjects (120 hunks:
model 19, pipeline 33, rendering 33, determinism 7, scope 28) and read whole with their subsections where a shared item
was involved — §2.2's frame, §2.3's `mining`, §2.5's `DistrictKind` and quarter comment, §2.6 step 7, §2.7's
`ConditionOverlay`, `RaisedWayRecord.feet` and the strip, §2.9's year-position, festival, crises, Find, week-source,
weather and crisis-framing keys; §4.2 S1 (10), S3 (9), §4.6's strip and cliff band, §4.7's levelling steps, §4.11's
clock, §4.13 EP-21/26/27, §10.2's crisis tables and *Crisis looks* (a)–(i), II.6, II.7.2, II.7.4, II.7.6, PART III;
§6.1's `plan.damage` and `view.weather` rows, §6.3 *Plan damage*; §8.2's seasons, festival, crisis, Find and weather
blocks and slot resolution, §8.4 (e)–(i), §8.6's damaged plan, §8.8's ladder, Auto, effects layer and ring, §8.11
T-ER-08 and T-ER-23 – T-ER-29, §9.5, §11.1's picture and battle-map rules, §11.2's gazetteer and match listing, §11.3's
view state, §11.4, §12.1, §12.5, §12.8; §13.2's item 120–123 groups and take-over rows, §13.8, §14, §16 and INDEX §1–§2.
V04 §1.2, §1.3, §1b, §2.6, §3.2, §3.5, §3.10–§3.12, §5.1, §5.2, §5.5, §5.6, §6–§9, §13; V05 §1.2, §1b, §3.21, §3.23,
§4.5, §5.6, §7, §8, §9, §13; V07 §1, §1b, §2.2a, §2.6, §3.4, §3.5a, §3.11, §3.12, §3.16, §3.17, §4.5, §5.1 – §5.6,
§6–§9, §13. Counterparts read at the seams: V01 §3.16, §5.4; V03 §5.6; V06 §3.22, §3.23; V09 §4.19, §4.21.10, V09
l. 518; V11 §3.25.10's item-123 rows; V12 §3.15.14's edge row.

## Round-1 findings re-checked against the live text

| id | owner | adjudication | verdict | evidence |
|---|---|---|---|---|
| VAL-05 | pipeline | ONE FIX with VPC-R1-08 (R2-28 (b)) | FIXED | II.7.4 l. 20853: `accessForecastMin: number /* 0.5: P7's forecast access chance … */; forecastSafety: number /* 0.85 */` |
| VAL-08 | pipeline | ONE FIX with VPC-R1-04 (R2-12) | FIXED | II.7.6 l. 21286–21289 `openings: UnderOpeningRow[]`, comment "DigRule, UnderOpeningRow and CatacombRule are V04 §2.3's" |
| VAL-18 | model | ONE FIX with VRC1T-11 | FIXED | §2.5 l. 1152: "built by S6 on the ground (§4.5) and, for a sky island's root, by S13a (§9.1; V05 §3.14)" |
| VAL-R1-01 | scope | FIX | FIXED | §14 l. 19114: "the systems, the access pass (U-ACCESS), II.7.3's sewer-front neighbourhoods (U-FRONT), the undercity, then the connection stage" |
| VAL-R1-02 | pipeline | FIX per R2-12 | FIXED, both ends | II.7.6 l. 21286–21288 (`scope?: EpochScope`, `reached: ExcavationRecord[]`); V04 l. 202, 323, 1944, 2230, 2298 and V06 l. 227, 1028, 2485 name `AccessPassStrategy.run(doc, rules, ctx, k, scope)` |
| VAL-R1-03 | V07 | ONE FIX with VPC-R1-06, VV78-r1-03 (R2-12) | FIXED | V07 l. 254 (W46), l. 2870 (§3.16 (3) (iii)); 0 bare `OpeningRow` in V04, V06, V07, V11 |
| VAL-R1-04 | scope | FIX per R2-06 (a) | FIXED | §13.2 l. 17755 "Every T-V4 test (V04 §7)"; take-over row l. 18222 "every T-V4 test (V04 §7)" with T120-4/5 (T-V4-81) and T123-1/2/6 (T-V4-82) |
| VAL-R1-05 | rendering | FIX per R2-29 (a) | FIXED | §8.2 *Slot resolution* l. 13189–13196 lists `ink`, `lit`, `hatched`, `parchment`, `bw-print`, `night`, `painterly`, the parity presets for the sky's and the `under.*` entries |
| VAL-R1-06 | V04 | FIX per R2-29 (a) | FIXED | V04 §5.2 *Every shipped sheet* l. 2793–2809: per-family facts of every `under.*` semantic in every shipped sheet, T-V4-27 loads them all |
| VAL-R1-07 | pipeline | ONE FIX with VPC-R1-16 (R2-25 (b)) | FIXED as ruled | II.7.2 l. 20636–20640 is VAL-R1-07's text. Round 2's V04 N2 (VV34-r1-08) then added "a bank whose stretch is **empty** or lies wholly on water" (V04 l. 990), which the base sentence lacks — a new seam, VAL-R2-08 (= VPC-R2-08) |
| VAL-R1-08 | pipeline | FIX per R2-28 (a) | FIXED, every end | §4.2 S1 (10) l. 5123–5127 (the test once, `miningCellShare` named, no value); §2.3 l. 961; V04 l. 422, 1591; V07 l. 2845; V11 l. 3674 |
| VAL-R1-09 | V07 | FIX per R2-26 (d) | FIXED | V07 l. 571, 608, 1603 cite §4.6 S8's strip and `raisedWays.structure.stripMarginM`; 0 `stripClearM` in the set |
| VAL-R1-10 | V07 | FIX per R2-34 | FIXED | V07 §5.5 (3) l. 3366–3368: "a dwelling in a cavern or ruin … (V04 §5.1); an access is no Find target (V05 §5.6 (1))" |
| VAL-R1-11 | rendering | FIX per R2-29 (b) | FIXED, both ends | §8.2 place table l. 12819–12827 carries the village readings of `heart`, `square`, `market`, `green`, `gate`/`gates`, `castle`; V07 §5.1 *Festivals* l. 3241–3247 cites it, keeping the tiers' kinds and the church lane |
| VAL-R1-12 | rendering | FIX per R2-29 (b) | FIXED, both ends | §8.2 l. 12718–12728 (way classes by §2.4's `WayClass`, crofts, closes and toft yards, the palisade's and yard walls); l. 12744–12745 (a leat's take-off an open lead); V07 §5.1 l. 3226–3240 cites §8.2's rows |
| VAL-R1-13 | scope | FIX per R2-06 (b), R2-07 | FIXED | §16 l. 19742 (30.5–43, "items 111, 113–120 and 122"), l. 19748 and l. 19783 (18–24.75), l. 19785 (30.5–43), l. 19782 (28.5–39.5); INDEX l. 27–30 — equal to V04 §8 (28.5–39.5), V05 §8 (18–24.75) and V07 §8 (30.5–43, recomputed from its itemised additions) |
| VAL-R1-14 | pipeline | ONE FIX with VKr1-08 | FIXED | none of the ten bare continuations remains (l. 6137 "V05 §3.2–V05 §3.7", l. 6779 "V05 §3.10 (5)", l. 7155 "V07 §3.10", l. 7490 "V07 §3.4", l. 14939 "V07 §2.4", l. 20427 "V05 §3.7", l. 21318 "V07 §3.5"); assemble-r2's ambiguous list holds none of this lane's subjects |

## Owner items 120–126 — this lane's parts as new design

| id | adjudication | verdict | where it now stands; what it agrees with |
|---|---|---|---|
| G120-model | NEW DESIGN per R2-33 (a) | PRESENT | §2.9 l. 3042 `FindChip` (kind, address, dossier chips), l. 3357–3365 the `find` key with its lifecycle, writers and readers (V04's `underFindPlaces`, V05 §5.6, V07 §5.5 among them); `thematic`'s `coverage` migration l. 3313–3315 |
| G120-rendering | NEW DESIGN per R2-32, R2-33, R2-35 | PRESENT | §8.2 *Find* l. 12939–12983 (veil over the underground's rock and ghost, V04 §5.1; bubbles within one layer and one island, V05 §5.6 (2); ghost pins with a band's depth range, V04 §5.1 (2)–(3); an island's and a village end's area chips); §9.5 l. 14815; §11.1 l. 15648; §11.2 l. 16062–16070; §12.5 l. 16710 |
| G121-rendering | NEW DESIGN per R2-35, R2-36 | PRESENT | §8.8 l. 14013–14088 (ladder with 0.75 and 0.5, ultra 512 MB, the 4K ceiling, the Auto loop, M4); §8.4 (g) l. 13565–13572; §12.1 l. 16428; §12.5 l. 16704; §12.8 l. 16983. No member volume restates a tier figure |
| G122-model | NEW DESIGN per R2-37 (1), (2) | PRESENT | §2.7 l. 2424 (`week` in [`sinceWeek`, `untilWeek`), never `yearWeek`); §2.9 l. 3349–3356 `crises` |
| G122-pipeline | NEW DESIGN per R2-37 (3) | PRESENT | §10.2 l. 15012–15027 the shapes, l. 15342–15425 *Crisis looks* (a)–(i); its `CrisisPlace` union equals V07 §5.6 (2)'s place list. Its village readings and the hamlet's siege line: VAL-R2-06 |
| G122-rendering | NEW DESIGN per R2-37 | PRESENT | §8.2 *Crisis looks* l. 12877–12937; §11.1 l. 15648; §12.5 l. 16716; `crisis.army.*` cycling past four, as V07 §5.6 (5)'s `.a – .d` |
| G122-V07 | NEW DESIGN per R2-37 (4), R2-35, R2-36 | PRESENT | V07 §5.6 l. 3387–3501 (scale, places, units in V01 §2.3's `DisasterUnit` shape, hand-over, bands, edges, T-V7-69 at V-M3); §13.2's T122-5/6 village clauses name T-V7-69 at both ends |
| G123-model | NEW DESIGN per R2-38 (1) | PRESENT | §2.6 step 7 l. 2072–2096 ("below ground the cellar's and the crypt's kinds (V04)") |
| G123-rendering | NEW DESIGN per R2-38 (4) | PRESENT | §8.6 l. 13837–13873; §11.1 l. 15805–15822. Its battle-map wall rule below ground: VAL-R2-07 |
| G123-V04 | NEW DESIGN per R2-38 (4), R2-35, R2-36 | PRESENT | V04 §5.6 l. 2865–2929: five kinds whose V11 ranges (V11 l. 4601–4602: 0.75–0.92 to 1) lie inside V06 §3.23 (2)'s `ruined` third [2/3, 1]; `decayPeak` is V06 §3.23's; the J-V4.130 row; T-V4-82 names T123-1, -2, -6 at both ends; lands at U5 inside M6-U (R2-36). Its key at §6.3: VAL-R2-03 |
| G124-model | NEW DESIGN per R2-39 (f) | PRESENT | §2.9 l. 3378–3387 (switch in `AppPrefs`, spell session-transient, `weather` the cover, no phone default) |
| G124-rendering | NEW DESIGN per R2-39 (a) | PRESENT | §8.2 l. 12747–12753 (arid: `snow` draws `clear`, agreeing with V05 T-V5-34 (d), R2-39 (c)), l. 12985–13011; §8.4 (i) l. 13599–13617; §8.8 l. 14097–14109; §11.1; §12.5 l. 16720. Over the underground view: VAL-R2-01 |
| G122h-pipeline | NEW DESIGN per R2-37 (3) | PRESENT | §10.2 (c) and (f) l. 15362–15409 (45 m² a head, one engine per 1 500, the coalition's spread) |
| G122h-rendering | NEW DESIGN per R2-37 (8), R2-30 | PRESENT | §8.8 *The surrounding ring* l. 14110–14120 |
| G122h-model | NEW DESIGN per R2-37 (8) | PRESENT | §2.9 *The crisis framing* l. 3388–3397; V07 §5.2 l. 3277–3279 cites it for the township view |
| G125-model | NEW DESIGN per R2-40 (1) | PRESENT | §2.9 *The week's source* l. 3372–3377. V07's restatement of the old source: VAL-R2-09 |
| G125-rendering | NEW DESIGN per R2-40 (2), R2-33 (b) | PRESENT | §11.3 l. 16277–16287 (the host's view commands); §11.4 l. 16341–16344 |
| G125-pipeline | ONE FIX with VPC-R1-27 (R2-40 (1)) | PRESENT | §4.11 *The clock* (1)–(2) l. 8267–8287; `EpochInputs.week` l. 8181 |

**Item 126 (R2-41).** No phone clause remains in model, pipeline, rendering, V04, V05 or V07 (the base's only phone
words are scope's statements that no phone view exists, l. 94, 265, 313, 18210, 22404).

## Agreement confirmed in the repaired text (no issue)

* The access pass's slot: one signature at II.7.6, cited by name and parameters in V04 §1b.2, §3.5.7 and §3.10 and in
  V06 l. 227, 1028 and 2485 (`under.access`, order 20); `UnderOpeningRow` the one name for V04's row everywhere.
* The outfalls per bank and the moat's level: II.7.2 cites V04 §3.2 N2–N3 (J-V4.129); V04 N7 (1) and T-V4-2 read the moat's
  derived level of §4.2 S3 (10), as §2.6's water table does (R2-25 (a)).
* The mining flag: one test at S1 (10); §2.3, V04, V07 and V11 read `Terrain.mining`, the cell named once at V11.
* The under-deck strip: one strip, one margin cell (`raisedWays.structure.stripMarginM`), cited by §4.6, V01, V06, V07, V11.
* Find across the layers: §2.9's key, §8.2's rows, §11.2's listing and §12.5's budget agree with V04 §5.1 (glow by band,
  ghost pins with depth ranges, Go there sets `depthBand`), V05 §5.6 (bubbles per island, offset pins, an access no
  target) and V07 §5.5 (the ends as Show gaps' units, by V01 §5.4's delegation below TOWN); an island is a city-cut
  quarter node (§9.1), so V01's `findAreas` lists it as V05 §5.6 (1) says; T120-1/4/5's clauses are named at both ends
  for T-V4-81, T-V5-36 and T-V7-68.
* The damage layer below ground: §2.6 step 7, §6.1's `plan.damage` row, §8.6, V03 §5.6's kind table (l. 2665),
  V06 §3.23 and V11's rows agree with V04 §5.6's five kinds, their ranges and their reading of the level.
* Crisis looks and the layers: §10.2 (d) stands a look only on the ground arena's part 0 (no sky look, none below);
  V07 §5.6's units use V01 §2.3's shape, which V01 l. 530 declares for V07; V01 lands `campLand` at M3b as V07 §8 (14)
  reads it; the village's township view takes the crisis framing.
* Prices and ranges: §16 and INDEX equal V04, V05 and V07's §8 totals; §13.2's take-over rows and the volumes' test heads
  name the same item 120–123 clauses (R2-08).

## Issues

Severity as the brief rules: a DISAGREE is a BLOCKER where the two statements would build different behaviour, else a
MAJOR; HANDOFF-OPEN and MATRIX-GAP are MAJOR. VAL-R2-03 and VAL-R2-04 are minor defects found in this lane's text that
are not disagreements between units.

### VAL-R2-01 — major — MATRIX-GAP — owner rendering

**Claim.** Missed shared subject: item 124's weather effects layer over V04's underground view. Its outcome is stated
nowhere. §8.8 *The weather effects layer* (l. 14097–14109) draws the spell in force every frame "above the tiles and below
the labels, the chrome and every overlay". §8.4 (i) (l. 13599–13617) adds per-frame terms beyond the direct-light
multiplier:
* fog and mist fade the picture toward `fog` with distance from the view's centre;
* at night fog gives "every drawn `LightSource` (§8.1 item 7) a soft halo";
* heat shimmer "offsets the base's sampling";
* dust fades toward `sand`.

§8.2 *Weather effects* gives the falling marks and the ripples on §8.8's water mask. None of the three names a layer. V04
§5.1 draws the underground, when visible, in three modes:
* `cutaway`: the ground ghosted;
* `overlay`;
* `solo`: "the underground alone, the ground reduced to its way centrelines", also the export default.

§8.4 (e) says "Underground there is no global light at any setting". So with Below shown, the text does not decide whether
rain and snow fall over the plan of a sewer, fog fades the band and haloes the undercity's torches, and shimmer moves the
rock. No test sweeps the combination:
* T-ER-29 (§8.11) sweeps "every climate row … at every rung" and names no layer;
* V12 §3.15.14's edge row 35 lists no layer;
* V04 §3.11 and V04 §5.1 say nothing of the effects.

Principle (11) requires a defined outcome and a test for every layer on and off. This is an undefined edge where two
units' features meet. The effects layer is rendering's (canon routing of item 124: §8.2, §8.4, §8.8), so the outcome
belongs there.

**Required change.**
1. §8.8 *The weather effects layer* adds: "While the underground layer is drawn (V04 §5.1's `cutaway`, `overlay` or
   `solo`), the spell draws nothing over the view — no mark, ripple, fog, mist or dust fade, shimmer or night halo — and
   §8.4 (i)'s terms are not applied (the underground has no global light, §8.4 (e)); the effects return when the
   underground layer is hidden, the spell's timeline running on (§6.1's `view.weather`)."
2. §8.4 (i) states the same in one clause.
3. T-ER-29 adds the case "the underground layer drawn in each of its three modes during a spell", with its outcome
   "nothing drawn, the underground tiles and light byte-identical with the effects on and off".
4. V04 §5.1 cites §8.8's rule in one clause (V04's end, R2-05).

### VAL-R2-02 — major — DISAGREE — owner rendering

**Claim.** `depthBand` crosses the bridge under round 2's §11.3, against the units that make it per viewer.

Before round 2, §11.3's *View state* sent every view key across the bridge except the pointer and `underlay`. VRC1T-02
(R2-33 (b)) rewrote it (l. 16277–16281). It now names "the per-viewer keys a viewer's client keeps — `yearWeek`,
`seasonFollow`, `festival`, `cvdVariant`, `find` and `crises` (§2.9), `thematic`, `workingLayer`, `showUnexcavated` and
V09 §4.19's per-viewer keys —, which never cross the bridge". The list leaves out `depthBand`, the underground's drawn
band. Three statements make that band per viewer:
* §8.4 (l. 13368) calls it "the per-viewer view key `depthBand` (§2.9)".
* V04 §1b.3 (l. 373) says "`depthBand` and `showUnexcavated` are view keys (§2.9), set by V09's per-viewer controls".
* V09's `WorkingLayer` (V09 l. 518) keeps the underground's band as "the view key `depthBand` alone (§2.9), never copied
  here". The working layer is per viewer and never crosses.

Two further statements leave it out of the per-viewer set:
* V09 §4.19's table, which §11.3's list delegates to, does not carry `depthBand`.
* §2.9's entry (l. 3293) does not mark it per viewer, unlike `showUnexcavated` and `workingLayer`.

Read by §11.3, the key's home for what travels (R2-33 (b)), `depthBand` is a shared key. A host's or another viewer's
band change would move this viewer's drawn band and Find's **Go there** target. That viewer's working layer would not
move, though the band belongs to it. The two readings sync the view differently.

**Required change.** §11.3's never-cross list adds `depthBand` beside `workingLayer` and `showUnexcavated`: "…
`thematic`, `workingLayer`, `depthBand` (the underground's drawn band, V04 §5.1), `showUnexcavated` and V09 §4.19's
per-viewer keys —, which never cross the bridge". §2.9's entry needs no change, since §2.9 defers which keys travel to
§11.3.

### VAL-R2-03 — minor — AMBIGUOUS — owner determinism

**Claim.** §6.3 *Plan damage* (l. 9786–9792) is the home of the threshold's key. It lists "the id's parts — its element
kind and V03 §2.2's plan-part id (`wall:`, `op:`, `win:`, `core:`, `furn:`), a floor area and the roof bay over a room by
their room's address". That list has no form for V04 §5.6 (2)'s two room-keyed kinds below ground (l. 2887–2889):
* `cellarVault`, keyed by "the room's id";
* `cryptVault`, keyed by "(its room's id, the cell's grid node (i, j)) … a key, never a new id". V04 gives each cell its
  own threshold ("a rubble heap filling the cell, its columns standing").

Read as an exhaustive list, §6.3 folds every `cryptVault` cell of one crypt to one key (kind and room address). Every bay
would then fall at the same level, against V04's per-cell thresholds and T-V4-82 (c). VV34-r2-03 (vol-V03-V04) raises
the other half: which node names a cell.

**Required change.** §6.3's sentence reads: "… a floor area, the roof bay over a room and a `cellarVault` by their room's
address, and a `cryptVault` cell by its room's address and the cell's grid node (V04 §5.6 (2)) — folded into the key …".
ONE FIX with VV34-r2-03, whose V04 end fixes the node that names the cell.

### VAL-R2-04 — minor — COHESION — owner V05

**Claim.** R2-07 (a canon change) sets the form of owner-item lists. A list meaning every owner item states no upper
number. A subset list "is brought to item 126 this round". Assemble set "items below 200 the owner's" in the title blocks
of V04, V06, V07 and V08. V05, whose seat sent no note, still carries three stale ranges:
* l. 11, the reading guide: "items 1–120 the owner's, items 200 and above file f's". This leaves items 121–126 in no
  class.
* l. 198, §1.2's hook table: "items 102–120 of `docs/AMENDMENTS-2026-09-28g.md` as the coherence pass applies them to
  the base | their island parts".
* l. 3015, §12's reading record: "items 102–120 of `docs/AMENDMENTS-2026-09-28g.md`".

**Required change.**
1. V05 l. 11: "items 1–120 the owner's" → "items below 200 the owner's". This is the title block's form in V04, V06, V07
   and V08 (Assemble's to set, R2-07).
2. l. 198: "items 102–120 of `docs/AMENDMENTS-2026-09-28g.md`" → "file g's items".
3. l. 3015: "items 102–120 of `docs/AMENDMENTS-2026-09-28g.md`" → "file g's items in `docs/AMENDMENTS-2026-09-28g.md`".

### VAL-R2-05 — major — DISAGREE — owner V07

**Claim.** Same defect as VM-R2T-11 (verify-model) and VV78-r2-04 (vol-V07-V08). V07 §5.5 (l. 3323–3325) says Find's state
is "saved only in view pins — never in the document, its hash or the log", and V07 §3.17's Find row (l. 2948) says "the
`find` key never in the document — saved in view pins only". Two texts say otherwise:
* §2.9, the key's home (R2-33 (a)), saves it "with the other view keys (`Document.view`; item 120 (a))" (l. 3360).
* V09 §4.21.10 (1) saves it "with the other view keys in the document's `view` section".

So a load restores Find under the base and V09, and not under V07.

**Required change.** ONE FIX with VM-R2T-11 and VV78-r2-04, in VV78-r2-04's words:
* V07 §5.5: "… and saved only in view pins — never in the document, its hash or the log" → "… and saved with the other
  view keys in the document's `view` section and in view pins (§2.9) — never in its canonical form, a digest, its hash
  or the log".
* V07 §3.17's Find row: "the `find` key never in the document — saved in view pins only" → "the `find` key in no digest
  — saved with the other view keys (§2.9) and in view pins".

### VAL-R2-06 — major — HANDOFF-OPEN — owner pipeline

**Claim.** Same defect as VV78-r2-05 (vol-V07-V08); it is a rung rule shared by this lane's members. V07 §1 (15)
(l. 197–200) hands §10.2 "its places read at the village rungs as V07 §5.6 (2) states". §10.2 *Crisis looks*, the
placement home, does not carry that end:
* (d) defines the main approach road by §4.3's `TradeFlow` and `affectedQuarter` as "the district …". Only
  `neighbourhoods` cites V07.
* (f) draws `siege`'s "line of trenches and earthworks round the walled arcs" at every rung with walled arcs, and §8.2's
  siege row (l. 12892) draws it.

V07 §5.6 (1) (l. 3400–3402) and T-V7-69 draw no siege line at THORP or HAMLET. That is item 122 (c)'s "a hamlet gets a war
band's camp, a city a full siege line", which §13.2's T122-5 (l. 18159) also quotes. No V11 `scale` cell can suppress the
line, since the cells are camped-ground areas. So the base and V07 draw a hamlet's siege differently.

**Required change.** ONE FIX with VV78-r2-05, in its words:
1. §10.2 (c) adds that a share s of a place's n units takes round(s × n) clamped to [1, n] where s > 0 and none where
   s ≤ 0 (V01 §3.16 (5)'s count).
2. (d) adds "at THORP, HAMLET and VILLAGE the main approach road, the outskirts' land and each place below read on the
   village's records as V07 §5.6 (2) states, `affectedQuarter` a unit of V07 §5.6 (3)".
3. (f)'s `siege` reads "at VILLAGE and above, a line of trenches and earthworks round the walled arcs at it — none at
   THORP and HAMLET, item 122 (c)'s war band's camp (V07 §5.6 (1))".
4. (h) adds "and no siege line at THORP and HAMLET".

§8.2's siege row draws the line where §10.2 (d)–(f) place it, so it needs no change.

### VAL-R2-07 — major — DISAGREE — owner rendering

**Claim.** Same defect as VRC2T-06 (b) (verify-rendering); it is the rendering–V04 seam of this lane. §11.1's underground
band scene (l. 15806–15808) takes `line_of_sight` from "every underground building's footprint less its doors and the
runs its damage layer draws broken (V04, by their own thresholds; §8.6)". The per-storey scene (l. 15820–15821) likewise
removes "the wall runs and partitions §8.6's damage layer draws broken". V04 §5.6 says otherwise:
* §5.6 (2) draws a damaged `cellarWall` or `cryptWall` run as "the run's middle third broken over a rubble spill …,
  still a wall to sight and passage" (l. 2886, 2888).
* §5.6 (5) and V04 §5.5's VTT row (l. 2922, 2852) keep its segment: "a `cellarWall` run keeps its segment". An
  underground building's runs on its rock are `cellarWall`.

Under §11.1 those runs leave the battle map's walls. Under V04 they stay, so the exported scene differs.

**Required change.** ONE FIX with VRC2T-06 (b). §11.1's underground band clause reads "… every underground building's
footprint less its doors and the outer wall runs its damage layer fells (V04 §5.6 (5)) — a `cellarWall` run keeping its
segment —". The per-storey clause adds "`cellarWall` and `cryptWall` runs keeping their segments (V04 §5.6 (2))".

### VAL-R2-08 — major — DISAGREE — owner pipeline

**Claim.** Same defect as VPC-R2-08 (verify-pipeline). It is a residual of this lane's VAL-R1-07, made by round 2's
other end. II.7.2 (l. 20638–20639; VAL-R1-07's text, R2-25 (b)) gives gutter and pit only to "a bank whose stretch of the
boundary lies wholly on water and that holds no candidate". Round 2's V04 §3.2 N2 (l. 990–991; VV34-r1-08), the
fallbacks' home, reads "A bank whose stretch is empty or lies wholly on water … and that holds no candidate makes none".
T-V4-80 (j) tests "a stretch empty or wholly on water". The base sends an empty-stretch bank to "its own field outfall",
which N2 builds from a stretch cell's D8 path, and such a bank has none.

**Required change.** ONE FIX with VPC-R2-08. II.7.2 reads "… and a bank whose stretch of the boundary is empty or lies
wholly on water and that holds no candidate drains by gutter and pit, its area reported unsewered …".

### VAL-R2-09 — major — DISAGREE — owner V07

**Claim.** Same defect as VV78-r2-03 (vol-V07-V08); it is model's week source against the village. §2.9 *The week's
source* (l. 3372–3377; R2-40 (1): "one sentence in every unit") makes a dossier-bound map's present week "the dossier's
own latest stamped tick", never the campaign's calendar. §4.11 *The clock* (1) says the same: "never the campaign's
calendar or any host input". V07 still reads the retired input in three places:
* the dossier trace (l. 324–325): "the campaign calendar's week and season → §7.7's DR42 → W80";
* W80's dossier column (l. 288): "the campaign calendar's week and season (V08)";
* T-V7-65 (l. 3664): "a campaign dossier opens on its own week".

**Required change.** ONE FIX with VV78-r2-03, in its words:
* V07 §1b's dossier trace: "the dossier's present week — its latest stamped tick (V08 §3.16 (4); item 125 (b)) → §7.7's
  DR42 → W80".
* W80's dossier column: "the dossier's present week, its latest stamped tick (V08 §3.16 (4))".
* T-V7-65: "a dossier village opens on its present week (its latest stamped tick), one with no stamped tick on the
  season control's midsummer".

## Sibling findings in this lane's text, not refiled

These seams touch this lane's members. Sibling seats raised them, and a member outside this lane carries their other end,
so they are left to those ids: VV34-r2-01, -02, -05, -07 (V04 against V03, V12 and R2-07); VPC-R2-09, VPC-R2-10,
VV56-r2-02 and VV56-r2-03 (the disaster look's end per building, against V06); VPC-R2-11 and VPC-R2-15 (inputs before
their milestones); VRC2T-02/03 (barricades on a carriageway); VRC2T-07 (Find at a scrubbed week); VV78-r2-01/02 (V07
against V08's retired latitude and realm river); VV78-r2-06 (V01's `campLand` and units at the village rungs).

## CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed and read):**
* The live files' sha256 equal assemble-r2's after-values. The pre-round copies equal its before-values (HEAD `d49a590`).
* Every V04, V05 and V07 hunk was read, and the base's 120 layer-filtered hunks were read with the subsections the shared
  items sit in.
* Each round-1 finding was checked by grep and by reading its home and every end the ruling names.
* The R2-07 title-block state was checked by grep in V04, V05 and V07.
* No phone clause remains in the members.

**PLAUSIBLE:**
* The reading of §11.3's dash-enclosed list as exhaustive (VAL-R2-02). The alternative, that "per-viewer" in §8.4 decides
  on its own, still leaves §2.9 and V09 §4.19 silent on `depthBand`.
* That no unit states the effects' outcome over the underground in a section this seat did not read (VAL-R2-01). The
  greps cover V04, V05, V07, V09 and V12 for "weather effect", "effects layer" and "spell" with every layer word.
* That the sibling seats' required changes quoted under ONE FIX are their final wording.
