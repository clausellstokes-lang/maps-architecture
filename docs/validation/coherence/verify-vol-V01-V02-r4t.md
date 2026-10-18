# Verify — volumes V01 and V02 after repair round 4 (lane coherence/verify-vol-V01-V02-r4t)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/verify-vol-V01-V02-r4t; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V01-V02-r4t`, 2026-10-01)
- P1 brief read whole; r3t result (6 issues); adjudication-r4 R4-01, R4-04, R4-05, R4-11 – R4-14, Part H (scope … V03, V09) and Part I; round4-work V01/V02 items; repair-r4-V01 header; assemble-r4 §1, §2.1, §5, §6, §9 read; live V01 a0c15b71… / V02 2579cb16… equal assemble-r4's after; pre-r4 texts from 96bdae2 (8260b2a8… / 4696951c…): done
- P2 round-3 findings re-checked on live with their second ends (V02, base §2.6 step 7, §8.2, §10.2 (d), §11.2, T-ER-27, V03, V09, V11): done — all six FIXED
- P3 V01 diff (29 hunks) and V02 diff (13 hunks) read; V01 §2.3's Find and disaster block, §3.16, §3.17.3, §5.4 and V02 §1d, §5.7, §8.6 read whole; the texts they cite (V06 §3.15.2, V07 §5.6 (3), (7), (8), T-V7-69 (c), V11 §3.24.2 and §12, V12 §3.11's line, base §2.7 *The clearance*, §4.3's crossing paragraph, §10.2 (d), §11.2 *At a drawn week*, V09 §1b and §4.21.10) read: done
- P4 references (resolver re-run on a mirror of the live set), ids, deferral, review ids, phone clauses, document checks (provisional), words: done
- P5 report, result saved, LANDED: done

Scope: `docs/volumes/V01-neighbourhoods.md` (3 757 lines, sha256 `a0c15b713802a1ed…`) and `docs/volumes/V02-buildings.md` (4 217
lines, `2579cb1696f494b6…`), each equal to assemble-r4's "after". The round's blocks in scope: V01 11 (§1.2, §1b, §2.3, §3.14,
§3.16, §3.17.3, §3.18, §5.4, ## 6, ## 7, ## 12), V02 8 (§1b, §1d, §3.18, §5.7, §7.8, §8.6, ## 9, ## 13). Read as word diffs
against the pre-round text (git `96bdae2`), each changed subsection then read whole.

## 1. Round-3 findings re-checked

| id | owner | disposition (adjudication-r4 Part H) | verdict on the live text |
|---|---|---|---|
| VV12-r3-01 | V02 | FIX per R4-04, with J-V2.113 and l. 2455 | **FIXED.** §5.7 (1) (l. 3043–3048): "at TOWN and above every district it returns, and at THORP, HAMLET and VILLAGE every unit it returns there — V07 §5.6 (3)'s `villageDisasterUnits`, its ends or in an end-less thorp its toft groups — a unit's buildings being those on the plots V07's `villageUnitPlots(doc, unit)` gives it". §1b's `exteriorDamage` input cell (l. 199), §1d (l. 367), the THORP–VILLAGE rung row (l. 2455, R4-04 (a)'s gloss), §3.18's ruined-look row (the case "an end-less thorp" → "its toft groups' buildings, by `villageUnitPlots` (V07 §5.6 (3)), and no other building"), T-V2-60 (a) and its look fixture (an end-less THORP of B-VILLAGE, V07 §5.6 (7)'s no-end case as T-V7-69 (c) runs it), §8.6's note (V-M3, V07 §5.6 (8)), J-V2.113 (l. 4015) and X35 (l. 4187) all read R4-04 (a). No "V07's ends" stands alone in V02 (the one left, T-V2-60 (a)'s "at VILLAGE V07's ends, each on the plots `villageUnitPlots` gives it", is the required text). The cited homes say it: V07 §5.6 (3) (units, toft groups, `villageUnitPlots` read by "the buildings' damage (V02, V03)"), (7) ("no end — the toft groups"), (8) (V-M3). |
| VV12-r3-02 | rendering | FIX per R4-04 | **FIXED.** §8.2's `disaster` row (l. 13091) "its units in the `ruinTone` (districts; at THORP, HAMLET and VILLAGE V07 §5.6 (3)'s units, on the plots `villageUnitPlots` gives each)"; `ruinTone` (l. 13110) "a unit's faces — a district's, or at the village rungs its unit's plots' (V07 §5.6 (3))"; the rule (l. 13121–13125) "their units (V01 §3.16 (1)) the `ruinTone` … a unit's `ruinTone` stands while the look stands over any of its buildings (§10.2 (f))" — R4-04's wording; §11.2's `districts` comment (l. 16324) as required; T-ER-27 adds "the fire at VILLAGE striking one end: the `ruinTone` on the struck end's plots only, and at an end-less THORP on the struck toft group's plots only". VAF-R3T-03 (merged) closed with it. |
| VV12-r3-03 | V01 | FIX per R4-12 | **FIXED.** §5.4 (3) (l. 3188–3191) carries the required text verbatim, plus "`catchmentOf`'s discs and cells are read over that frame"; §5.4's lead and §3.16's bullet memoise "per commit, key and drawn frame"; §2.3's signatures `findAreas(key, week?)` and `gapUnits(chip, key, week?)`; §5.4 (6) adds the frame sentence; §3.18 (e)'s Find row adds the case and its outcome (13 cases, 13 outcomes); T-V1-59 (f) runs it on B-EDIT CITY. The second end: V09 §4.21.10 (10) (l. 3546) and its §1b row (l. 313) call `gapUnits(chip, key, week)` at the view's drawn week. V06 §3.15.2's frame is a whole model (the log prefix through an epoch, before-images applied by effective week), so districts, faces and lazy rungs are defined over it. (V01 also gave `findAreas` the week; its one caller, V09, does not pass it — VV12-r4-01.) |
| VV12-r3-04 | V03 | FIX per R4-04 | **FIXED.** V03 §5.6 (4) (l. 2730) "or at THORP, HAMLET and VILLAGE on a plot V07's `villageUnitPlots(doc, unit)` gives a unit it returns …"; §1b's damage-layer row (l. 303) "V07 §5.6 (3)'s units and `villageUnitPlots`"; §3.18's look row (l. 2095) "V07 §5.6 (3)'s units (ends, or an end-less thorp's toft groups), each building on the plots `villageUnitPlots` gives it"; no "V07's ends" left in V03. |
| VV12-r3-05 | pipeline | FIX per R4-04 | **FIXED.** §10.2 (d)'s `approachRoads` (l. 15664) cites "(V01 §3.16's `campLand` (2))"; its `neighbourhoods` (l. 15688–15693) reads R4-04's text ("at THORP, HAMLET and VILLAGE V07 §5.6 (3)'s units (`villageDisasterUnits`: its ends, or an end-less thorp's toft groups). Every building of a returned unit — a district's, or one on a returned unit's plots (`villageUnitPlots`) — draws … while the look stands over it ((f))"). The merged VPC-R3-07 and VAL-R3-08 close with it; VAL-R3-08's model end is §2.6 step 7 (l. 2107, "A building a disaster look stands over …", VM-R3T-07). |
| VV12-r3-06 | V03 | FIX | **FIXED.** `PlanDamage.look`'s comment (V03 l. 2684): "V02 §2.4's: the condition (null for a preview) and its pattern (V01's DisasterSource.pattern); null with no look". |

**The repair's other issues in this scope.** **VAF-R3T-01** (V01, FIX): §3.16 `campLand` (1) and §1b's row read "the outermost
town enceinte's outer strip (§10.2 (d) …)"; §10.2 (d) (l. 15652–15656) defines the town enceintes (kinds other than `bailey`, a
castle's curtain only along `Castle.cityWeld`) and "outermost" in those words — FIXED. **VAP-r3-03** (V02, FIX per R4-11):
T-V2-60 (e) reads R4-11's text (the disaster's condition `public`, the same drawing under View as at `public`, `local` and
`secret`; an `infiltrated` stressor — `none` in V11's map rows, l. 4573 — drawing no look at any key, added to the look fixture);
(g)'s withheld-key staging replaced by "View as changed among `public`, `local` and `secret`, the look standing at every key —
the same drawing, no struck building's marks re-emitted (their `revision` unchanged, V02 §5.7 (8)) and the tile drawn under
its new key"; §5.7 (8)'s `revision` hashes no key, so that bar can pass; §3.18's withheld-condition row stands, glossed "a
`none`-row one" (R4-11 keeps it); §3.18's damage-marks row splits "View as changed" into its own case with its outcome (7
cases, 7 outcomes) — FIXED. **VAT3-r3-06** (V02, FIX): §5.7 (6) and the §3.18 aftermath row read "from the week its change
shows (V06 §3.23 (1): the hazard's week, a `vacate`'s `decay` Works' start)" — FIXED.

**END line written into V01** (END of VEW-r3-01, R4-09): §3.17.3 (3) "crosses a strip by §4.3's rule: only through an `open`
span … clear width ≥ the way's width + `raisedWays.structure.clearWidthM` … §2.7's *The clearance* … within ±
`raisedWays.structure.squareDeg` of square to the deck (V11 §3.24.2)", its ladder (F-TEMPLATE rungs 1–2; §4.6's for a bent-cut
lane) kept; §3.14's row withdrawn; §1.2's V11 row, §3.14's lead, T-V1-51 (c) and §12's PLAUSIBLE list conformed. Its second
end, V11 §3.24.2 (l. 3958–3962), holds `clearWidthM` 1 m and `squareDeg` 30° (`cdeg`), ranges [0, 3] m and [10°, 45°], `own`,
calibratable, shipped at M3a — V01's archived row's values, ranges, units and provenance; V12 §3.11's `raisedWays.structure`
line covers them by "every other calibratable column but the `span` block"; V11 §12 lists "item 110's cells"; §2.7 *The
clearance* (l. 2616–2619) is V01's removed clause in meaning (the held `clearanceCm`, else V11's for the crossed class, cart or
foot). No text of the set still names `raised.clearWidthM` or `raised.squareDeg`.

## 2. The round's text re-checked (V01, V02)

* **V01 §5.4** (whole). The lead, (1)'s *At a drawn week*, (3)'s `week`, (4)'s week re-evaluation and its "save at a drawn week
  whose frame holds that id", (6)'s frame sentence: consistent with §11.2 *At a drawn week* (R4-12's listing) and V06 §3.15.2.
  Two gaps at its seams: its one caller does not pass the new `week` to `findAreas` (VV12-r4-01), and (4)'s new clause has no
  test (VV12-r4-02).
* **V01 §2.3, §3.16** (whole). Memo keys gain the drawn frame for `findAreas`, `gapUnits`, `disasterSource`/`disasterDistricts`
  and `campLand`, whose `doc` was already the model the view draws (round 3) — no behaviour moved. §3.16 (1) names V02 §5.7, V03
  §5.6 and §8.2's disaster row as the readers of `villageUnitPlots`, and all three now read it; (5) carries R4-13's
  max(k, |`matched`|).
* **V01 §3.17.3** (whole). Agrees with §4.3's new crossing paragraph (l. 5624–5634) on the crossing itself. §4.3's closing
  clause misattributes the route's fallback ladder to stage 2 (VV12-r4-03).
* **V01 §1.2, §1b, §3.14, §3.18, ## 6, ## 7, ## 12.** Each changed row read whole; T-V1-51 (c) and T-V1-59 (f) bars are
  satisfiable as written. T-V1-59 (f) needs M6-E's epochs and V06's frames but carries no exit of its own (VV12-r4-04).
* **V02 §1b, §1d, §3.18, §5.7, §7.8, §8.6, ## 9, ## 13.** §5.7 read whole: (1), (6) and (8) agree with R4-04 (a)–(b) (a
  building the look stands over leaves it when `crisisLookYields` turns true; a preview never hands over) and R4-11. The look
  fixture's end-less THORP and `infiltrated` stressor are defined at their homes. No problem found.
* **R4-04 (a)'s sweep.** No V01 or V02 text names "V07's ends" alone or "district" alone at the village rungs for a disaster
  look (T-V1-60's VILLAGE fixture reads "`villageDisasterUnits`' ends", which are that fixture's units).
* **Nuance.** Text removed this round: V01's §3.14 row of the two raised cells and §12's "the raised-way constants" (both now
  V11's, values, ranges, units, provenance and PLAUSIBLE status kept), the spelled-out clearance clause (now §2.7's, same
  meaning), V02's "V07's ends" phrasings (widened to the units), "that epoch's week (V06's hazard and decline phases)" (made
  exact by V06 §3.23 (1)), and T-V2-60's withheld-key staging (removed by R4-11, a ruled change). No nuance lost.
* **Owner rules.** Item 122 (b), (d), (e) as R4-04 and R4-11 rule them; item 120 (a), (f), (k) as R4-12 rules them (V01's
  services read the frame's listing); item 125: V01 and V02 read SettlementForge data only through carried facts; item 126
  (a2): no phone clause in either volume. Items 114–121, 124 parts unchanged this round.

## 3. Issues

### VV12-r4-01 — major — WIRING — owner V09

**Claim.** V01's round-4 block gave `findAreas` the drawn week: `findAreas(key, week?)` (V01 §2.3 l. 546, §3.16 l. 2315, §5.4
(1) l. 3145) — at a drawn week whose frame is not the head "the areas are the frame's … a district an edit or epoch split or
merged after that week is listed whole, as the frame holds it, one made after it is not listed … absent, the head" (l.
3167–3171); §5.4 (4) re-evaluates it at every change of the drawn week, and §5.4 (6) frames a disaster look by "its units'
`FindArea`s at the view's drawn week". Its only caller, V09, passes no week: §1b's Find-panel row (l. 311) "V01 §5.4's
`findAreas(key)`"; §4.21.10 (3) (iii) "`areas` — V01 §5.4's `findAreas(key)`", although (3)'s own lead lists "what this
document holds at the view's effective key and drawn week"; §4.21.10 (7) "an area's shapes by V01's `findAreas`" and §1b's
`live.find` row (l. 312) "V01 §5.4's `findAreas` for an area's shapes", with no week, while the same sentences pass the model the
view draws to V04's and V05's Find places. At a scrubbed week a V09 builder following its call lists and lifts the head's areas
(a district an epoch made after the drawn week offered; a district it split shown as its successors), while V01 §5.4 (1) and
T-V1-59 (f) give the frame's; the area list and §5.4 (6)'s Show frame then disagree. Two builders build different panels.
repair-r4-V01's HAND-OFF (1) names it. Base §11.2 *At a drawn week*'s list of readers that pass their view's week ("`live.find`,
V09's panel, V10's `read_map find`, V01's `gapUnits`, V04's and V05's Find places", l. 16461–16462) omits `findAreas`.

**Required change.** V09 §1b l. 311: "V01 §5.4's `findAreas(key)`" → "V01 §5.4's `findAreas(key, week)` at the view's drawn week
(§2.9's `week`)". §4.21.10 (3) (iii): "V01 §5.4's `findAreas(key)`" → "V01 §5.4's `findAreas(key, week)` at the view's drawn
week (§2.9's `week`; at a drawn week whose frame is not the head, the frame's areas, V01 §5.4 (1))". §4.21.10 (7): "an area's
shapes by V01's `findAreas`" → "an area's shapes by V01's `findAreas(key, week)` at the view's drawn week"; §1b l. 312: "V01
§5.4's `findAreas` for an area's shapes" → "V01 §5.4's `findAreas(key, week)` for an area's shapes, at the view's drawn week".
END line for rendering: §11.2 *At a drawn week*'s reader list "V01's `gapUnits`" → "V01's `findAreas` and `gapUnits`".

### VV12-r4-02 — major — EDGE-UNTESTED — owner V01

**Claim.** V01 §5.4 (4) gains this round a defined outcome for a held area chip: an area the document no longer holds leaves its
chip "at count 0, dark, until the viewer removes it or presses Clear …, save at a drawn week whose frame holds that id, where the
chip reads the frame's area and its matches ((1))" (l. 3222–3225). No bar runs it: T-V1-59 (c) holds the chip dark at the head;
(f) runs `findAreas`, `gapUnits` and the disaster's frame at a drawn week but places no chip on an area the head lacks; T-V9-83's
scrub clauses (l. 4406) and T-ER-25's "a chip whose target is gone" cover kind chips and the head. A build that keeps the held
chip dark at every week passes every bar. §3.18 (e)'s Find row still pairs "a chip's area no longer held" with "the chip kept at
count 0, dark, until removed or Clear" alone (its separate "a scrubbed week" case covers it only implicitly).

**Required change.** T-V1-59 (f) adds: "a chip held on the district the epoch merged or split away (§6.3's succession), added
at the drawn week from the frame's areas: at that week it lifts that district's faces in the frame and its matches are
§11.2's listing at that week; at the head it stays at count 0, dark, until removed or Clear; scrubbed back, it reads the frame's
area again". §3.18 (e)'s Find row's outcome for "a chip's area no longer held (merged away, or rebuilt under another id)"
reads "the chip kept at count 0, dark, until removed or Clear — at a drawn week whose frame holds its id, the frame's area and
matches (V01 §5.4 (4))".

### VV12-r4-03 — minor — CONFLICT — owner pipeline

**Claim.** §4.3 *Lattice and costs* (round 4's VEW-r3-01 text, l. 5632–5634) ends the raised-way crossing paragraph "A route's
crossing shifts along the strip to the nearest crossing these admit, else the route takes another course by F-ROUTE's ladder
(§5.2) — the one rule S5c's proposals (§4.4) and stage 2's ways (V01 §3.17.3 (3)) keep." Placed after the route's fallback,
"the one rule" reads as the shift-then-F-ROUTE ladder too. Neither reader keeps that ladder: S5c's proposal is "deflected along
it to the nearest such span, or ends at the strip as at a reservation" (§4.4), and a stage-2 seed takes F-TEMPLATE rung 1
(redraw), then rung 2 (shift), a bent-cut lane §4.6's ladder, ending at the strip's edge (V01 §3.17.3 (3); R4-09: "V01's rule,
ladder and values unchanged"). Each home states its own ladder, so nothing built changes.

**Required change.** §4.3: "… else the route takes another course by F-ROUTE's ladder (§5.2) — the one rule S5c's proposals
(§4.4) and stage 2's ways (V01 §3.17.3 (3)) keep." → "… else the route takes another course by F-ROUTE's ladder (§5.2). S5c's
proposals (§4.4) and stage 2's ways (V01 §3.17.3 (3)) keep the same crossing rule, each with its own ladder (S5c's deflection
along the strip or its end there; V01's F-TEMPLATE rungs and §4.6's lane ladder)."

### VV12-r4-04 — minor — COHESION — owner V01

**Claim.** T-V1-59 runs "From M5, Find's milestone (§16's M5 row)". Its new clause (f) needs an epoch that splits a district,
builds one member and closes another (M6-E), and V06 §3.15.2's history frames, which land at M6-E's E6 (V06 §8: "E6 — history
and the app: the history index, store and frames with the effective week"). M5 and M6-E run side by side after M4 (§16; INDEX
§4), so M5's exit can come before E6. INDEX §5 risk 2 moves such a clause "to the first exit after the provider (each named in
its volume)"; T-V1-60 names its later clauses ("clause (e) from M3b …; the VILLAGE fixture's clauses once V07's village
readings land"), T-V1-59 names none. A build agent applies risk 2's rule, so nothing built changes.

**Required change.** T-V1-59's timing sentence "From M5, Find's milestone (§16's M5 row), on the services and on V09's app
harness with V09's Find panel" adds "; clause (c)'s epoch cases and clause (f) at the first exit after M6-E provides them — its
epochs (V06 §8) and, for (f), V06 §3.15.2's history frames (E6)".

## 4. Checks

* **References.** assemble-r4's resolver (`work/assemble-r4/refs.py`) re-run over a mirror of the live set: 55 885 references,
  **0 broken**, 84 ambiguous-form (equal to assemble-r4's). V01's 15 and V02's 13 ambiguous-form references are those of round 3
  (range forms such as "V02 §5.2–§5.3" and "V01 §2–§5", each resolving as intended), lines shifted; none is new. Pointers into
  numbered lists checked by hand: V01 §3.16's `campLand` (2) at §10.2 (d), V07 §5.6 (3), (7), (8), T-V7-69 (c), V06 §3.23 (1),
  §2.7 *The clearance*, §11.2 *At a drawn week* — each names the intended rule.
* **Ids.** V01: 60 test rows, 105 decision rows, no duplicate; V02: 11 test rows and the bullets T-V2-1 – T-V2-60 (the second
  "T-V2-4" bullet its "beyond" note), J-V2.1 – J-V2.113, X1 – X37, no duplicate. No id added or removed this round.
* **Deferral, review ids, phone.** Added text (V01 2 559 words, V02 2 184 words, diff lines) scanned: no deferral wording, no
  `R3-nn`, `R4-nn` or verifier id, no phone clause.
* **doc_checks** (`--doc <volume> --heads docs/ARCHITECTURE.md`): WARNING printed — reference corpus INCOMPLETE (captures,
  research/patreon, research/devlogs, research/ftg-docs, research/external missing): the clean-room results are NOT
  authoritative and are provisional. V01: C1 0, C2 0, C3 406 (351 unreviewed; round 3 403/347), C4 2 (0), S1 0, S2 286 (3
  unreviewed, `§2.0`, the known external pointer). V02: C1 0, C2 0, C3 599 (535; round 3 598/534), C4 1 (0), S1 0, S2 207 (10
  unreviewed, V02's own `§6.6` against the base's headings — the known false positives). The new C3 runs are section numerals
  and function words (assemble-r4 §6: V01 `5 4 1 3 6`, `5 4 1 and 3`, `and of the model the`, `s at the view s`; V02 `5 7 8 and
  the`).
* **Words** (`wc -w`). V01 84 191 → 84 778 (+587, +0.7 %); V02 91 901 → 92 257 (+356, +0.4 %). Against the archive: V01
  91 139 → 84 778 (−7.0 %), V02 101 328 → 92 257 (−9.0 %). Both are under the 25–40 % band and neither shrank by more than half;
  the round's growth is repair content (the drawn-week readings, the village units, the test fixtures), its cuts restatement
  moved to its home (§3.14's row, the clearance clause).

## 5. Result

Round 3's six findings are all **FIXED** on the live text, each second end included (V02, V03, V09, V11, base §2.6 step 7,
§8.2, §10.2 (d), §11.2, T-ER-27); the repair's three other issues here (VAF-R3T-01, VAP-r3-03, VAT3-r3-06) and V01's END line
for VEW-r3-01 are written as ruled. Four new issues from the round-4 text: **0 blocker, 2 major, 2 minor** — V09 1, V01 2,
pipeline 1. The majors: V09 calls V01's `findAreas` without the drawn week V01 now takes, so the panel's area list and an area's
shapes at a scrubbed week are the head's while V01 gives the frame's (V01's own hand-off); and V01 §5.4 (4)'s new held-chip
rule at a drawn week has no test. Design files untouched by this seat.
