# Verify — volumes V01, V02 after repair round 3 (coherence/verify-vol-V01-V02-r3t)

> PENDING FABLE REVIEW — written by opus standing in for the Fable verifier seat; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V01-V02-r3t`, 2026-10-01; scratch `scratchpad/coherence/r3t/`)
- P1 brief read whole; r2t result (7 issues), adjudication-r3 R3-01..R3-27 (Parts B-G), Part H scope/rendering/V01/V02, repair-r3-V01/V02 headers, assemble-r3's sha table read: done
- P2 round-2 findings VV12-r2-01..07 re-checked on the live text, each END line's second end included: done (7 of 7 closed)
- P3 V01 round-3 blocks read whole (20 changed hunks, word diff against HEAD 920d280d5e58): done
- P4 V02 round-3 blocks read whole (25 changed hunks): done
- P5 references, ids, deferral, review ids, phone clauses, owner rules, doc_checks (provisional), words: done
- P6 report, result JSON, LANDED: done

## 1. What was verified

**Live files** (assemble-r3's outputs, sha256 confirmed): `docs/volumes/V01-neighbourhoods.md` `8260b2a8…` (3 742 lines),
`docs/volumes/V02-buildings.md` `4696951c…` (4 205 lines), base `593c657d…`. **Before**: HEAD `920d280d5e58` (V01 `fb2d1496…`,
V02 `c4d39837…`, base `4ed292e9…`), each equal to assemble-r3's "before" sha. Every changed hunk of both volumes was read as a
word diff against that copy; every base, V03, V06, V07, V08, V09, V12 home the new text cites was read at its live line.

**Scope of this round** (ROUND-3 NOTES (2)): (a) the seven round-2 findings against the live text, as Part H rules them;
(b) the round-3 blocks — repair-r3-V01's 12 REPLACE blocks (VPC-R2-05, VV12-r2-01, -02, -03, VV78-r2-06; END lines of
VAF-R2T-04, VPC-R2-09, VV12-r2-04, VRC2T-07, VPC-R2-03) and repair-r3-V02's 14 (VAP-r2-02, VCS-r2-05, VV12-r2-04, VV12-r2-05,
VV1112-r2-09; END lines of VAF-R2T-01, VAT2-r2-09, VV56-r2-06) — subsection by subsection for new problems; (c) the hand-offs
both repair files leave for this round. Other ids keep their earlier verdicts.

## 2. Round-2 findings re-checked

| id | owner | ruling | verdict on the live text | evidence |
|---|---|---|---|---|
| VV12-r2-01 | V01 | FIX, amended per R3-09 (b) | **FIXED** as amended | V01 §3.16 (2) (l. 2333–2341) takes the calamity the condition's carried `calamity` field names, read from V08 §2.3's carried `calamity` fact as a `CalamityRef` built as V08 §3.6 (3) builds it, never from the committed `epoch` events; a stressor's overlay, a condition with no `calamity` field, a key no carried fact holds and a preview give none. J-V1.104, §1b's dossier row (l. 343), §1.2's hook row (l. 211), `disasterSource`'s §1b row (l. 282), §3.18 (e) (cases 10–13 of 21, each paired with its outcome) and T-V1-60 (d) follow. Agrees with V08 §3.16 (7) (b), (d) (l. 2510–2533), V08 §2.3's `calamity` fact (`type`, `week`, `severity`, `targets`), base DR44 and §10.2 (b) ("the `calamity` word of a linked condition"). No text in the set keeps the old association by week. |
| VV12-r2-02 | V01 | FIX per R3-14 (1) | **FIXED** | `campLand` (2) (l. 2375–2380): the `commons` faces and the fallow `arable` / `strip_field` faces bordering an arterial; meadow, pasture and a field in crop named as no camp land; J-V1.105, T-V1-60 (e), §3.18 (e)'s outskirts row (8 cases, 8 outcomes) and §1b's row follow. Agrees with base §10.2 (d) (l. 15519–15521) and V07 §5.6 (2)'s village reading. The rotation's fallow course is a stored per-field slot (§4.9, l. 7767), so the set is fixed per commit. |
| VV12-r2-03 | V01 | FIX (graded major) | **FIXED** | T-V1-60 (a) carries the required fire clause verbatim. |
| VV12-r2-04 | V02 | FIX per R3-09 (c) | **FIXED** | V02 §5.7 (4) reads `disasterSource(doc, overlay, key).pattern` (`scatter` with no calamity, a preview's included); §2.4's `look.pattern: 'fire' \| 'flood' \| 'scatter'`; §1b and X35 name `disasterSource`. Second end: V01 §2.3's `calamity` comment names no V02 reader and `pattern`'s names §8.2's disaster row and V02 §5.7 (4) (l. 535–536). V03's `PlanDamage.look` comment still describes the old field — VV12-r3-06. |
| VV12-r2-05 | V02 | FIX | **FIXED** | V02 §5.7 (8) (l. 3124–3162): `exteriorDamage` runs in the generation worker inside S14; its result travels as damage marks (`building.look`, `building.roof.hole`, `building.roof.patch`, `building.wall.gap`, a `wing` attribute column) in the district's group of the display list or a `DisplayDelta`; the re-emission triggers (week step, `crises` or key change, a plan entering or leaving force, a commit) are each stated; the tile worker clips against its memoised roofscape. §1b, §1c, §2.4, §2.5, §3.1, §3.18, §6.3, §6.6, T-V2-59 (e), T-V2-60 (g) follow. The repair left `level` and `reading` off the marks, with its reason: the tile worker draws no level-dependent form (the massing reading's tone is a fixed 30 % lerp, §5.7 (3); every hole, gap and patch is decided in the generation worker), so a `level` column would have no reader and would re-emit every decaying building each week. The reason holds (principle (7)); not raised. |
| VV12-r2-06 | rendering | FIX | **FIXED** | §8.2's Works `decaying` row (l. 13201) yields to V02 §5.7's holes where the plan is in force; §8.8's tile key (l. 14102–14104) carries `crises` and the effective key for a tile holding a building under a disaster look; §8.1 item 7 (l. 12370) re-emits the buildings whose damage marks differ; T-ER-27 adds the toggle and View-as case on a cached district-band tile. |
| VV12-r2-07 | scope | MERGED into VCS-r2-04 | **CLOSED** (VCS-r2-04 fixed) | §16's M5 row (l. 19981) names "item 122's disaster districts — volume 1's `disasterSource` and `disasterDistricts` (W10; V01 §3.16)". |

**END lines' second ends in this scope** — all written as given: V01 §1b's `campLand` row reads `approachRoads` and adds §10.2 (e)'s
cap (VAF-R2T-04); V01 §3.16's closing sentence names `crisisLookYields` (VPC-R2-09); V01 §2.3's comments (VV12-r2-04); V01
§3.16's drawn-model sentence and its four followers (VRC2T-07); T-V1-60's linked-condition fixtures (VPC-R2-03); V02 §5.7 (2)
and X34 cite §2.6 step 7 for the roofless case, which the model's step 7 now states (l. 2088–2097) (VAF-R2T-01); V02 §5.7 (1)'s
preview clause (VAT2-r2-09); V02 §5.7 (2)'s per-element `decayPeak`, read through V03 §5.6 (2) (b) and V06's
`decayPeak(doc, lineage, week, since)` (V06 l. 3382) (VV56-r2-06). The R3-26 registrations agree at both ends: V02 §1b's two
rows, T-V2-58 (f), T-V2-59 (d), T-V2-60 (c) against V12 §2.13 (l. 927, 932, 933), §3.7.8's list (l. 1711), X-V12-11 and §13.2's
stage-3 take-over row (l. 18473).

## 3. Round-3 blocks read for new problems

**V01** (20 hunks): §1.2's item-122 hook row; §1b's `disasterSource`, `campLand` and dossier rows; §2.3's `DisasterUnit` and
`DisasterSource` comments; §3.4.1's holes (the cliff band) and the cut-through sentence; §3.6 (7)'s cliff band inside a district
(agrees with base §4.6, l. 6798–6804, and EP-24); §3.16 (1)–(5), the closing sentence and `campLand`; §3.18 (b)'s village row,
(e)'s disaster row (21 cases, 21 outcomes, paired one by one) and outskirts row (8 and 8), (f)'s cliff row; §5.4 (6); T-V1-45;
T-V1-60; §8.1's M3b item (agrees with V07 §5.6 (8) and V07's risk (14)); J-V1.104, J-V1.105; §12's list. New problems:
VV12-r3-03 (Find's gaps and a disaster's frame at a scrubbed week). V01's round-3 text also names, for the first time, V02 §5.7,
V03 §5.6 and §8.2's disaster row as readers of V07's `villageUnitPlots`; none of the three reads it (VV12-r3-01, -02, -04 —
repair-r3-V01's hand-off (1), confirmed). repair-r3-V01's hand-off (2) is confirmed too (VV12-r3-05).

**V02** (25 hunks): §1b (the `exteriorDamage` row, two registration rows), §1c's §8.1/§8.9 row, §2.4 (`ExteriorDamage`'s
`pattern`, `holes`/`gaps`/`patched` with `wing`, the path paragraph), §2.5's row, §3.1's new row, §3.18's three rows, §5.7
(1)–(8), §6.3's damage-marks bullet, §6.6's rows and fallback (c), T-V2-24, T-V2-58 (f), the damage and look fixtures,
T-V2-59, T-V2-60, §8.6's M6b row, X34–X37, the X-V12-11 received row. The homes the new text cites resolve: the elaboration
cache in §2.9 (l. 3038), §8.1's `group` and `attrs` columns, §8.9's worker boundary, V02 §5.3's `rubbleReachM`, V02 §2.2's
`RoofFacet.wing`, V06 §3.22 (3), §3.23 (3). The damage marks take no slot (no shipped sheet has a `building.*` prefix entry
that could paint them); their bytes follow V02's "counted in §12.8's line and re-declared at the intake" convention, as its
model line does. New problem: VV12-r3-01 (village units read as ends).

## 4. Issues

### VV12-r3-01 — major — WIRING — owner V02

**Claim.** V07 §5.6 (3) makes a village disaster's units `villageDisasterUnits` — the ends, or in an end-less thorp its toft
groups — and gives each unit's land by `villageUnitPlots(doc, unit)`, whose comment names "the buildings' damage (V02, V03)"
as its reader; V01 §3.16 (1), rewritten this round, states that V02 §5.7 reads a returned unit's buildings through it. V02
never names `villageUnitPlots` and reads the village units as ends: §5.7 (1) "at THORP, HAMLET and VILLAGE every end V07
returns" (l. 3045), §1b's `exteriorDamage` input cell "V07's ends at THORP, HAMLET and VILLAGE" (l. 199), §2.4's paragraph
"V07's ends at the village rungs" (l. 367), X35 (l. 4175), T-V2-60 (a) "(V07's ends at VILLAGE)" (l. 3771) and §8.6's note
"the look's units wait for V07's ends" (l. 3882). At an end-less thorp the units are toft groups (each id its lowest plot's)
and no end exists, so V02 as written draws the ruined look on none of a struck toft group's buildings, while V07 §5.6 (3)
draws item 123's damage on every building of the unit's plots: a hook with one end, and two outcomes for one case.

**Required change.** V02 §5.7 (1)'s "and at THORP, HAMLET and VILLAGE every end V07 returns" reads "and at THORP, HAMLET and
VILLAGE every unit it returns there — V07 §5.6 (3)'s `villageDisasterUnits`, its ends or in an end-less thorp its toft
groups — a unit's buildings being those on the plots V07's `villageUnitPlots(doc, unit)` gives it". §1b's input cell reads "at
THORP, HAMLET and VILLAGE V07 §5.6 (3)'s units and their land `villageUnitPlots`" for "V07's ends at THORP, HAMLET and VILLAGE";
§2.4's paragraph reads "V07 §5.6 (3)'s units and their plots (`villageUnitPlots`) at the village rungs"; X35 reads "and at
THORP, HAMLET and VILLAGE V07 §5.6 (3)'s units (its ends, or an end-less thorp's toft groups) with their land
`villageUnitPlots`"; §8.6's note reads "at THORP, HAMLET and VILLAGE the look's units wait for V07's `villageDisasterUnits`
and `villageUnitPlots` (V-M3, V07 §5.6 (8))". §3.18's ruined-look row adds the case "an end-less thorp" → "its toft groups'
buildings, by `villageUnitPlots`". T-V2-60 (a)'s parenthesis reads "(at VILLAGE V07's ends, each on the plots
`villageUnitPlots` gives it)", and the look fixture adds an end-less THORP of B-VILLAGE whose struck toft group's buildings all
draw the look and no other building does.

### VV12-r3-02 — major — CONFLICT — owner rendering

**Claim.** §8.2 draws a disaster's city-band tone over districts: the `disaster` row "its districts in the `ruinTone`"
(l. 12985), `ruinTone` "the district's faces under a `crisis.ash` wash" (l. 13004), and "their districts the `ruinTone` at the
city band … a district's `ruinTone` stands while any of its buildings still draws the look" (l. 13012–13016). At THORP, HAMLET
and VILLAGE the village product holds one district and the units are V07 §5.6 (3)'s ends or toft groups: V07 §5.6 (3) has "the
unit's plots' faces take §8.2's ruined tone at the city band", and V01 §3.16 (1) (this round) names §8.2's disaster row as
reading a returned unit's faces through `villageUnitPlots`. §8.2 as written washes the whole village when one end is struck;
V07 washes that end's plots. §11.2's `LooksAnswer.crises[].districts` comment (l. 16163) also reads "at the village rungs
V07's ends", missing the toft groups.

**Required change.** §8.2's `disaster` row's city-band cell reads "its units in the `ruinTone` (districts; at THORP, HAMLET and
VILLAGE V07 §5.6 (3)'s units, on the plots `villageUnitPlots` gives each)"; `ruinTone`'s definition reads "a unit's faces — a
district's, or at the village rungs its unit's plots' (V07 §5.6 (3)) — under a `crisis.ash` wash …"; the rule sentence's "and
their districts the `ruinTone` at the city band" reads "and their units (V01 §3.16 (1)) the `ruinTone` at the city band", and
"a district's `ruinTone` stands while any of its buildings still draws the look" reads "a unit's `ruinTone` stands while any
of its buildings still draws the look". §11.2's `districts` comment reads "a disaster look's units: V01's `disasterDistricts`
over the model the view draws (at the village rungs V07 §5.6 (3)'s ends or toft groups); key-filtered, ≤ limits.members".
T-ER-27's fire fixture at VILLAGE adds the outcome "the `ruinTone` on the struck end's plots only".

### VV12-r3-03 — major — WIRING — owner V01

**Claim.** Base §11.2 *Find's match listing* (rendering's round-3 text, R3-24; l. 16292–16297) states that at a drawn week
whose frame is not the head "every row, count, match and gap unit is the head index's restricted to the entities the frame
holds", so a reader passing its view's week "counts, glows, pins, lists and gaps only what the drawn frame holds", and names
"V01's `gapUnits` (its members)" as a reader of that listing; §8.2's `live.find` (l. 13041–13044) says a match the frame lacks
is not "gapped there". V01's `gapUnits(chip, key)` (V01 §2.3 l. 547; §3.16; §5.4 (3)) takes no week and is "memoised per
commit and per key" over committed state; V09 §4.21.10 (10) calls it with `(chip, key)` too. A builder of V01 draws the
head's gaps at a scrubbed week — a district whose only member was built after the drawn week shown served, a district or plot
the frame does not hold given a gap — while §8.2 and §11.2 draw only what the frame holds. In the same scope, V01 §5.4 (6)
frames a disaster look by "the union of the Ground shapes of its units' `FindArea`s" (`findAreas(key)` over committed state),
while at a scrubbed week the units are read over the frame (V01 §3.16, R3-24): a district an epoch split or merged after the
drawn week has no `FindArea` at the head, so its **Show** frame is undefined.

**Required change.** V01 §5.4 (3) reads `gapUnits(chip, key, week?)`: "`week` the view's drawn week (§2.9's `week`), absent
the head: at a drawn week whose frame is not the head (V06 §3.15.2) its members are §11.2's match listing at that week and its
units only those the frame holds — a district, parish cell or residential plot the frame lacks is no unit (§11.2's *At a
drawn week*)", memoised per commit, key and drawn frame; V01 §2.3's signature, §3.16's bullet and §5.4's head follow. §5.4 (6)
adds "at a scrubbed week whose frame is not the head, a unit's Ground shape is its faces in that frame (V06 §3.15.2), so a
district the head no longer holds is still framed". §3.18 (e)'s Find row (l. 2678) adds "a scrubbed week whose frame is not the
head" → "the frame's members and units (§11.2); a disaster look framed by the frame's faces". T-V1-59 adds that case on a
B-EDIT CITY document with a district split after the drawn week. V09 §4.21.10 (10)'s call passes the view's week (an END line
for V09).

### VV12-r3-04 — major — WIRING — owner V03

**Claim.** The same one-ended hook as VV12-r3-01, at V03: V03 §5.6 (4) (l. 2725) places a building under a disaster's look
"in a district V01's `disasterDistricts` returns, or at THORP, HAMLET and VILLAGE in an end of V07's"; §1b's damage-layer row
(l. 303) reads "V07's ends", and §3.18's look row (l. 2095) "V07's ends as the units". V07 §5.6 (3)'s `villageUnitPlots` names
"the buildings' damage (V02, V03)" as its reader and V01 §3.16 (1) names V03 §5.6. At an end-less thorp no building lies "in an
end", so V03 draws no plan damage on a struck toft group's buildings, against V07 §5.6 (3) ("every building on a returned
unit's plots draws … V03's plan").

**Required change.** V03 §5.6 (4)'s "or at THORP, HAMLET and VILLAGE in an end of V07's" reads "or at THORP, HAMLET and
VILLAGE on a plot V07's `villageUnitPlots(doc, unit)` gives a unit it returns (V07 §5.6 (3): its ends, or in an end-less thorp
its toft groups)"; §1b's row reads "V07 §5.6 (3)'s units and `villageUnitPlots`" for "V07's ends"; §3.18's row reads "V07 §5.6
(3)'s units (ends, or an end-less thorp's toft groups), each building on the plots `villageUnitPlots` gives it" for "V07's ends
as the units".

### VV12-r3-05 — minor — BROKEN-REFERENCE — owner pipeline

**Claim.** §10.2 (d)'s `approachRoads` bullet (l. 15532, R3-14's binding text) cites the verges as "(V01 §3.16 (2))". V01
§3.16's numbered item (2) is `disasterSource`'s "**The calamity**"; the verges are `campLand`'s inline part (2) in the next
bullet. The reference resolves, to the wrong rule (repair-r3-V01's hand-off (2)). Beside it, §10.2 (d)'s `neighbourhoods`
bullet reads "at THORP, HAMLET and VILLAGE V07's ends (V07)", where V01 §3.16 (1) now reads V07 §5.6 (3)'s
`villageDisasterUnits`, ends or toft groups.

**Required change.** §10.2 (d)'s `approachRoads` reads "(V01 §3.16's `campLand` (2))" for "(V01 §3.16 (2))"; its
`neighbourhoods` reads "at THORP, HAMLET and VILLAGE V07 §5.6 (3)'s units (its ends, or an end-less thorp's toft groups)" for
"at THORP, HAMLET and VILLAGE V07's ends (V07)".

### VV12-r3-06 — minor — CONFLICT — owner V03

**Claim.** V03 §5.6 (2)'s `PlanDamage` record (l. 2683) declares `look: ExteriorDamage['look']; // V02 §2.4's: the condition
(null for a preview) and the calamity's type; null with no look`. V02 §2.4's field is now `pattern: 'fire' | 'flood' |
'scatter'`, V01's `DisasterSource.pattern` (R3-09 (c)); the type follows V02's record, so only the comment is stale
(repair-r3-V02's hand-off to V03).

**Required change.** The comment reads "V02 §2.4's: the condition (null for a preview) and its pattern (V01's
`DisasterSource.pattern`); null with no look".

## 5. Checks

* **References.** assemble-r3's resolver over the final set: 0 broken; V01's new ambiguous-form references (l. 966 `§4.6`,
  l. 3696 `§2.7`, l. 3698 `§2.3`) and V02's (l. 4177 `§8.2`) each intend the base and resolve as the base's — confirmed. Item
  pointers into V01 §3.16's numbered list were checked by hand across the set: all name the intended step but base l. 15532
  (VV12-r3-05).
* **Ids.** V01: 60 test rows, 105 decision rows, no duplicate; V02: T-V2-1 – T-V2-60 (59 bullets and 11 rows; the second
  "T-V2-4" bullet is its "beyond" note), J-V2.1 – J-V2.113, X1 – X37, no duplicate. No id added or removed this round.
* **Deferral and review ids.** Added text of both volumes (1 407 and 2 521 words) scanned: no deferral wording (the two
  "later" hits are a later calamity, temporal), no `R2-nn`, `R3-nn` or verifier id. No phone clause in either volume (item
  126 (a2)).
* **Owner rules.** Item 122's parts as R3-09, R3-10, R3-14 rule them; item 123's comparison (R3-04: "the level above 0 and at
  least its keyed threshold t", V02 §5.7 (2)), roofless case (R3-05) and restoration reading and per-element peak (R3-08)
  stand in V02. Item 125: V01 reads SettlementForge data only through the carried facts (V08 §2.3). g items 114–121, 124 and
  126: parts unchanged since round 2, found present then.
* **Nuance.** Text removed this round: V01's association by week (superseded by R3-09 (b)), "the open verges" and meadow and
  pasture verges (R3-14 (1)), the `HoodPlace` village parenthetical (restated by (3)'s village sentence), "the look's end in the
  week the `reconstruction` Works begins" (R3-10), the outskirts outcome "the verges alone" (the case cannot occur once the
  verges are common or fallow land, its replacement row stated); V02's roofless restatement ("the model's `decayed`,
  `ruined` and `charred` states") now cited from §2.6 step 7 (R3-05, a burned house `decayed` under V06 §3.11.2 (3)), and the
  element reading's cost moved to the generation worker's row. Each is a ruled change or keeps its content elsewhere: no
  nuance lost.
* **doc_checks** (`--heads docs/ARCHITECTURE.md`): WARNING printed — reference corpus INCOMPLETE (captures, research/patreon,
  research/devlogs, research/ftg-docs, research/external missing), so the clean-room results are NOT authoritative and
  provisional. V01: C1 0, C2 0, C3 403 (347 unreviewed), C4 2 (0), S1 0, S2 286 (3 unreviewed, each `code-neighbourhood.md`
  §2.0, an external research pointer: false positives). V02: C1 0, C2 0, C3 598 (534), C4 1 (0), S1 0, S2 194 (10 unreviewed,
  each V02's own §6.6 read against the base's headings: false positives).
* **Words** (`wc -w`). V01 83 025 → 84 191 (+1 166, +1.4 %); V02 89 697 → 91 901 (+2 204, +2.5 %). Against the archive: V01
  91 139 → 84 191 (−7.6 %), V02 101 328 → 91 901 (−9.3 %). Both are under the 25–40 % band and neither shrank by more than
  half; the growth is repair content (a converging round over defects), the shrink the rewrite's.

## 6. Result

Round 2's seven findings are all closed (six FIXED in text, VV12-r2-07 by VCS-r2-04). Six new issues, from the round-3 text
and its hand-offs: **0 blocker, 4 major, 2 minor** — V02 1, V03 2, V01 1, rendering 1, pipeline 1. Three of the four majors are
one class: V01's round-3 text names V07's `villageUnitPlots` as the land that V02 §5.7, V03 §5.6 and §8.2's disaster row read
for a village unit, and none of the three reads it, so an end-less thorp's struck toft groups draw no ruin (V02, V03) and a
struck end tints the whole village (§8.2). The fourth (V01) is Find's gaps and a disaster's frame at a scrubbed week, where
V01's services take no week but the base's round-3 listing restricts gap units to the drawn frame. Design files untouched by
this seat.
