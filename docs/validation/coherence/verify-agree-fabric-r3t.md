# Agreement check, round 3 — the fabric chain (model, pipeline, V01, V02, V03, V11) after assemble-r3

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-agree-fabric-r3t; covered by the whole-design retrovalidation (J84).

> **PROGRESS** — [x] brief read whole (ROUND-3 NOTES (1)–(5), items 114–119 routing, ORCHESTRATION NOTES) · [x] inputs (round-2 report and result; adjudication-r3 R3-01 – R3-27 and Part H for model, pipeline, rendering, V01, V02, V03, V09, V11; assemble-r3) · [x] live = assemble-r3's after-hashes; pre = `920d280d` · [x] VAF-R2T-01 … 07 re-checked on the live text, END lines' second ends included · [x] round-3 hunks in the six members read whole at their shared items · [x] matrix gaps hunted · [x] ids · [x] peers' ten r3t results read (no duplicate raised) · [x] issues written · [x] result saved · [x] LANDED

## Scope and method

Members: **model** (§2), **pipeline** (§4, §10, PART II, PART III), **V01**, **V02**, **V03**, **V11**.

The live texts are `docs/ARCHITECTURE.md` (sha256 `593c657d…`) and `docs/volumes/V01/V02/V03/V11-*.md` (`8260b2a8…`,
`4696951c…`, `f4458cf4…`, `1671da41…`). Each equals assemble-r3's after-hash. The pre-round text is the committed
`920d280d`, the text every repair-r3 file was written against. What was done:

* **Round-2 findings.** Each of the seven ids was re-read at every site its claim, its required change and its Part H
  disposition name. Where Part H says "per R3-05" or "per R3-14 (1)", the ruling's text is the measure. Each END line's
  second end was checked too: V02 §5.7 (2) and X34 for VAF-R2T-01, and V01 §1b for VAF-R2T-04. All seven are closed
  (below).
* **Round-3 hunks.** A line diff pre → live gives these hunk counts:
  * the base: model's §2 7, pipeline's §4 16, §10 12, PART II 1, and the decision and appendix rows 4;
  * V01 20; V02 25; V03 20; V11 35.

  Every hunk was read in its subsection wherever it touches a subject another member states. The checks covered:
  * §2.6 step 7's level and roofless sentences, against §6.3, §8.6, V02 §5.7, V03 §5.6 and V06 §3.23 (1)–(4);
  * §2.8's frozen occupant inputs against V03 §3.11 *Decay re-cuts no plan*;
  * §2.7's support step (3) and (6), §4.3, §4.4 S5a and §4.8's raised gate and wall opening, against V01 §3.4.2 (a) and
    §3.17.3;
  * §4.11 *The clock* (1) and (4) against V11's `defaultAgeYears` and V06 §3.23 (4);
  * §10.2's `CrisisLookRow.label`/`icon?`, (b) and (c)–(h), and R3-15's lead, against V01 §3.16, §3.18 and §8, V11
    §3.25.9 and V08 §3.16 (7) (b)–(d);
  * V01's cliff band against §4.6 S8;
  * V02 §5.7 (8)'s damage marks against §8.1 item 7 and §8.8's tile key;
  * V11's `stepMinCm < stepMaxCm ÷ 2` against §4.7's step regions;
  * V11's totality rules and named-row deletes, and the new pin registrations against V12 §2.13, §3.7.8 and X-V12-11.
* **Ids.** Every `T-Vn-m`, `J-Vn.m`, `J-VI.n`, `T-ER-n` and `EP-n` the six members cite is defined in the set; none of
  them is defined in two table rows.
* **Peers.** Ten round-3 results had landed: verify-determinism, -kernel, -model, -pipeline, -rendering, -scope,
  -vol-V01-V02, -vol-V03-V04, -vol-V05-V06 and -vol-V07-V08. They were read, and no defect a peer raised is raised
  again. In this chain they already hold:
  * the roofless case at §6.3 (VDC3-02);
  * the village units at V02, V03 and §10.2 (d)'s `neighbourhoods` (VV12-r3-01, -04, -05);
  * `(V01 §3.16 (2))` for the verges (VPC-R3-07, VV12-r3-05);
  * V01's `gapUnits` at a drawn week (VV12-r3-03);
  * `PlanDamage.look`'s and `.own`'s comments (VV12-r3-06, VV34-r3-06);
  * §8.6's floor form by position (VV34-r3-02) and V09's `storeyGone` (VV34-r3-03);
  * V03's disaster fixtures (VV34-r3-05);
  * `crisisLookYields` before M6-E (VPC-R3-02);
  * the carriageway rule (VPC-R3-03);
  * V07's village camp rows (VPC-R3-04);
  * `approachByGate`'s `h` (VV56-r3-03);
  * step 7's disaster sentence (VM-R3T-07);
  * the creation week at §2.7 and §4.11 (VM-R3T-02, VPC-R3-05);
  * the support step's edges (VM-R3T-03 – -06, VKr3-01 – -04).

## Round-2 findings re-checked

| id | disposition (Part H) | state | where it stands now |
|---|---|---|---|
| VAF-R2T-01 | FIX per R3-05 (model) | FIXED | §2.6 step 7 l.2088–2095: "One case has no threshold: while a building is `decayed` or `ruined` — however V06 §3.23 reads its level, its existence state alone before that level lands (M6-E) included — every roof bay over a room of a wing whose `RoofSpec.kind` is `none` … is damaged whatever its t …; a standing wing an author roofed `none` keeps its plan unchanged. V03 §5.6 (2) (c) and V02 §5.7 (2) cite this." The END at V02 is written: §5.7 (2) l.3080–3083 and X34 l.4174 cite §2.6 step 7 with the scope "while the building is `decayed` or `ruined`" and no other; T-V2-59 (b) agrees, as does V02 §3.18's row l.2520. |
| VAF-R2T-02 | FIX per R3-05 (rendering) | FIXED | §8.6 l.13951–13953 has "— and every roof bay over a room of a roofless wing of a `decayed` or `ruined` building, whatever its t (§2.6 step 7's one case without a threshold; V03 §5.6 (2) (c)) — every other element as built". Its restoration sentence l.13980–13981 counts such a bay as reached. |
| VAF-R2T-03 | FIX per R3-05 (V03) | FIXED | V03 §5.6 (2) (c) l.2704–2712 reads "(however V06 §3.23 reads its level: in a decay run, a generated building's run of V06 §3.23 (4) included, or by its existence state alone before that level lands at M6-E)". §13's V02 row l.3247 reads "of a `decayed` or `ruined` building (§2.6 step 7)". §3.13's row l.2094 adds the masonry-`decayed` and pre-M6-E edge. T-V3-39 (b) adds the ashlar `decayed` fixture. J-V3.136 follows. |
| VAF-R2T-04 | FIX per R3-14 (1) (pipeline) | FIXED | §10.2 (d) l.15519–15548 is R3-14's binding text, its outskirts sentence VV12-r2-02's END. `beyondWalls`, `approachRoads`, `approachByGate` and `outside` take `campLand` alone, and (e)'s cap reads "`densityCap` of `campLand`'s free land". The END at V01 is written: §1b's row l.283 reads "`approachRoads`". The new reference-point bullet agrees with V01 §3.18's `campLand` row. |
| VAF-R2T-05 | FIX (V09; graded minor) | FIXED | V09 l.409 reads "a dossier-bound record of a class in `grandeur.ceiling`'s `settings.grandClasses` (V11 §3.25.4), or a dossier government whose `villageSeat` names the manor house, seigneurial or crown (V11 §3.21.1) — V08 §3.16 (3)'s "specified", item 115 (c)". |
| VAF-R2T-06 | FIX (rendering; graded minor) | FIXED | §11.2 l.16188 has `kind: RaisedKind /* §2.7 */`. |
| VAF-R2T-07 | FIX (V09) | FIXED | V09 l.3155 reads "(viaduct, raised road, aqueduct; §2.7's `RaisedKind`)". |

All seven round-2 ids are closed. The defects the round-3 text newly makes in this chain are below under fresh ids.
Peers' ids already cover the rest.

## Issues (3: 0 blockers, 0 major, 3 minor)

| id | sev | kind | owner | claim | required change |
|---|---|---|---|---|---|
| VAF-R3T-01 | minor | DISAGREE | V01 | V01 §3.16's `campLand` (1) measures the reach from a **built edge**: the districts' union, "or the outermost enceinte's outer strip where that lies beyond it" (l.2373–2375). §1b's row (l.283) says the same. That counts every enceinte: a castle's `bailey` curtain, and with a twin town one ring or both, left unstated. Round 3 (R3-14 (2)) made §10.2 (d) the home of the walls the crisis looks read. Those are the place's **town enceintes**, kinds other than `bailey`, and **outermost** is the outer envelope of their walled arcs, the arcs of each non-nested ring that no other ring encloses. The camp places read that home, but the land they all take from is measured by the looser term. A castle stands in its own `castle` district, so the two readings move the reach by at most a strip's width. Nothing material is built differently, hence minor. | V01 §3.16 `campLand` (1): "… or the outermost town enceinte's outer strip where that lies beyond it (§10.2 (d): the enceintes of kinds other than `bailey`, `outermost` the outer envelope of their walled arcs)". V01 §1b's `campLand` row: "the outermost town enceinte's outer strip (§10.2 (d))" for "the outermost enceinte's outer strip". |
| VAF-R3T-02 | minor | DISAGREE | V11 | V11 §3.25.9's `disaster` look row (l.4535) reads "share of the districts — at THORP, HAMLET and VILLAGE of V07's ends —". §3.26's C-crisis-tables row (l.4802) reads "at THORP, HAMLET and VILLAGE a disaster's units V07's ends". V07 §5.6 (3), the home, and V01 §3.16 (1), rewritten this round, make the village units `villageDisasterUnits`: the ends, or in an end-less thorp its toft groups. V01 §3.16 (5) computes the share over those units, so nothing built changes. The gloss is a narrower restatement. Its siblings at V02, V03 and §10.2 (d) are VV12-r3-01, -04 and -05; V11's two sites were not raised. | l.4535's cell: "share of the districts — at THORP, HAMLET and VILLAGE of V07 §5.6 (3)'s units (its ends, or an end-less thorp's toft groups) — 0.05–0.5 at every rung; `lookLevel` 0.67–0.95". l.4802: "at THORP, HAMLET and VILLAGE a disaster's units V07 §5.6 (3)'s `villageDisasterUnits` (its ends, or an end-less thorp's toft groups)". |
| VAF-R3T-03 | minor | DISAGREE | rendering | §11.2's new `LooksAnswer` (R3-16 (a)) comments `crises[].districts` (l.16163) as "a disaster look's units: V01's disasterDistricts over the model the view draws, at the village rungs V07's ends". This is the same gloss as VAF-R3T-02. V01's `disasterDistricts` returns V07 §5.6 (3)'s units there, which in an end-less thorp are toft groups (each id its lowest plot's). The field carries what V01 returns, so nothing built changes. The comment misstates the case. | l.16163: "… V01's disasterDistricts over the model the view draws, at the village rungs V07 §5.6 (3)'s units (its ends, or an end-less thorp's toft groups); key-filtered, ≤ limits.members". |

## Checked and agreeing (round 3)

* **The roofless case (R3-05)** is stated at §2.6 step 7 and drawn by §8.6, V03 §5.6 (2) (c) and V02 §5.7 (2).
  * Every member gives it one scope: `decayed` or `ruined`, however V06 §3.23 reads the level.
  * Every member adds the same clause for restoration: such a bay counts as reached once the state is `decayed`. That
    clause is in §8.6, V03 (b) and (c), and §2.6.
  * Every member exempts an author's standing `none` wing.
  * Only §6.3's "exactly" lacks the case, which is VDC3-02's.
* **The level and the run (R3-04, R3-06, R3-18).**
  * §2.6 step 7, V06 §3.23 (1)–(4), V11 §3.25.10's `settings` row and comment l.808, and V03 §3.11 (c) agree on these
    points:
    * the run starts at the week the change shows;
    * a generated ruin ages from `A` = creation week − 52 × `D`;
    * a replay's ruin ages from its epoch's week;
    * before M6-E every building reads its existence state at the default age;
    * before V11's rows ship, `r` and `D` read 0.
  * Every member states the comparison as "above 0 and at least t" or cites §6.3: §2.6, §8.6, V02 §5.7 (2), V03 §5.6 (2)
    (a) and V11 §3.25.10.
* **The plan in force (R3-07).** §2.8's elaboration record l.2864–2867 freezes the same occupant inputs that V03 §3.11 (b)
  freezes, at the week before the run: use, assignment, sub-locations, concealed use, households, and the band and value.
  Both say that a `decay` or `repair` Works is no build stage. §2.6 step 7, §8.6 and V03 §3.11 cite V03 §3.11 as the home.
* **The per-element peak (R3-08 (b)).**
  * `decayPeak(doc, lineage, week, since)` has one signature, in V06 and V03, and V03 passes each element's entry week.
  * V02 reads the peak through V03 (b), and so does §8.6.
  * T-V2-59 (c), T-V3-39 (c) and T-ER-28 bar an `extend` drawn as built.
* **The disaster look (R3-09, R3-10).**
  * V01 §3.16 (2) reads the condition's `calamity` field, which V08 §3.16 (7) (d) writes by its link rule.
  * V11 §3.25.9's `event` row `calamity` and its readings agree with §10.2 (b) and V08 (b).
  * V01 §2.3's `DisasterSource` comments name §8.2's disaster row and V02 §5.7 (4) as `pattern`'s readers.
  * The hand-over is V06's `crisisLookYields(doc, building, overlay, week)`, with a preview never handing over. It agrees
    in §10.2 (f), V01 §3.16, V02 §5.7 (1) and (6) with T-V2-60 (a) and (d), and V03 §5.6 (4) with T-V3-40 (b).
* **The camp land (R3-14).**
  * §10.2 (d)'s outskirts sentence and its places agree with `campLand`'s definition (commons and fallow, reach, verges,
    no meadow or pasture), its village reading and its edges (V01 §3.18): no land, no road, an arterial with no verge.
  * The readers agree too: (c)'s camp places, (e)'s cap, and V11's `densityCap` gloss.
  * V01 §8.1 lands `campLand` at M3b, as §10.2's lead (R3-15) requires.
  * The W10 (M5) clause in §10.2's lead agrees with V01 §8.2's W10.
* **The crisis tables.**
  * `CrisisLookRow.label`/`icon?` are V11's display cells (W77, row 107).
  * Every `scale` m² cell equals heads × `areaPerHeadM2` 45.
  * `lookLevel` 0.67–0.95 lies inside [2/3, 1].
  * The census lists `crisis.stressors`, `.archetypes` and `.events` are named alike in V11 rows 77 and W46, T-V11-46 (a)
    and V08 §2.4.
  * The totality rules over `CrisisLookKind` and `DamageElementKind` agree with T-V11-46 (b) and T-V11-47 (a).
* **Raised ways (R3-25).**
  * The crossing station, the raised gate (its portal on the raised part only) and the aqueduct's wall opening appear in
    §2.7 (3) and (6), §4.4 S5a and §4.8. They agree with V01 §3.4.2 (a) (no part-0 gate portal) and §3.17.3 (3) and (6).
  * §4.3 and §4.6 cite `RaisedWayRecord.feet`.
* **V02's damage marks.** §8.1 item 7's week re-emission names V02 §5.7's damage marks. §8.8's tile key carries the drawn
  week for a damaged building, and `crises` with the effective key for one under a look, as V02 §5.7 (8) and X37 say.
* **Other round-3 subjects.**
  * V01's cliff band (§3.4.1, §3.6 (7), §3.18, T-V1-45) is §4.6 S8's hole.
  * V11's `stepMinCm < stepMaxCm ÷ 2` matches §4.7's "every wall … retains more than `stepMaxCm` ÷ 2".
  * S1's mining clause holds with no cavern row. V11 W32 and §3.23.1 keep `miningCellShare` its cell.
  * §2.9's crisis framing takes in the ring arcs, as §10.2 (g) reads.
* **Pin registrations (R3-26).** V12 §2.13's suites, §3.7.8's list and X-V12-11 hold every registration the members now
  write: T-V2-58 (f), T-V2-59 (d), T-V2-60 (c), T-V3-39 (g), T-V3-40 (f), T-V11-13, T-V11-31 and T-V11-38 (b) –
  T-V11-41 (b).
* **END lines written.**
  * pipeline: ADJ-r3-01, VRC2T-16, VV12-r2-02, VPC-R2-03 with VAH-r2-02, VEW-r2-01.
  * V01: all five lines.
  * V02: all three lines.
  * V03: all three lines, `head.restored` at §4.6 l.2379 among them.
  * V11: both lines.

Noted for other seats: V11's table of absent rows (l.859) lists no outcome for an absent `miningCellShare`. That outcome is
S1's (§4.2 S1, l.5169–5172: the ore clause reads false), which the row may cite. It was not raised: the home states it.

## Counts

* **Texts read.** The members' texts were read at their shared items:
  * model §2: 7 hunks, with §2.6 step 7, §2.7's support step and §2.8's elaboration record whole;
  * pipeline: §4 (16 hunks), §10.2 (12 hunks), and *Crisis looks* whole;
  * V01: 20 hunks, with §2.3's crisis types, §3.16 and §3.17.3 whole;
  * V02: 25 hunks, with §5.7, T-V2-59 and T-V2-60 whole;
  * V03: 20 hunks, with §3.11 and §5.6 whole;
  * V11: 35 hunks, with §3.25.9 and §3.25.10 whole.
* **Other texts read.** V06 §3.23 and V08 §3.16 (7) were read whole as the homes the members cite.
* **Round-2 findings.** All seven re-checked and FIXED.
* **Issues.** Three, all minor (0 blocker, 0 major). By owner: V01 1, V11 1, rendering 1.
