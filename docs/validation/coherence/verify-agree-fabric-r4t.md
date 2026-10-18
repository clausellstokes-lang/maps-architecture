# Agreement check, round 4 — the fabric chain (model, pipeline, V01, V02, V03, V11) after assemble-r4

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-agree-fabric-r4t; covered by the whole-design retrovalidation (J84).

> **PROGRESS** — [x] brief read whole (ROUND-4 NOTES (1)–(5), items 114–119 routing, ORCHESTRATION NOTES) · [x] inputs (round-3 report and result; adjudication-r4 R4-01 – R4-16 and Part H; assemble-r4) · [x] live = assemble-r4's after-hashes; pre = `96bdae26` · [x] VAF-R3T-01 … 03 re-checked on the live text, END lines' second ends included · [x] round-4 hunks in the six members read whole at their shared items · [x] the six members' repair-r4 HAND-OFFS checked at their destinations · [x] matrix gaps hunted · [x] ids · [x] peers' nine r4t results read (no duplicate raised) · [x] issues written · [x] result saved · [x] LANDED

## Scope and method

Members: **model** (§2), **pipeline** (§4, §10, PART II, PART III), **V01**, **V02**, **V03**, **V11**.

The live texts are `docs/ARCHITECTURE.md` (sha256 `5f34cceb…`) and `docs/volumes/V01/V02/V03/V11-*.md` (`a0c15b71…`,
`2579cb16…`, `9af5ffd5…`, `47b14d9f…`). Each equals assemble-r4's after-hash. The pre-round text is the committed
`96bdae26`, the text every repair-r4 file was written against. What was done:

* **Round-3 findings.** Each of the three ids was re-read at every site its claim, its required change and its Part H
  disposition name, with the ruling's text as the measure where Part H says "per R4-04" or MERGED. The second ends of
  VAF-R3T-02's merged sibling VAH-r3-06 (V08 l. 2717, V10 l. 1020) were checked too.
* **Round-4 hunks.** A line diff pre → live gives these hunk counts in the members:
  * the base: model's §2 13 (§2.6 4, §2.7 6, §2.9 3); pipeline's §4 19 (§4.1 1, §4.3 2, §4.4 2, §4.8 4, §4.11 6, §4.13
    3), §10.2 10, PART II 1;
  * V01 29; V02 12; V03 18; V11 24.

  Every hunk was read in its subsection wherever it touches a subject another unit states. The checks covered:
  * §2.6 step 7's disaster predicate and restoring re-cut against §8.2's `ruinTone`, §8.6, §10.2 (d) and (f), V02 §5.7
    (1), (2), (6), V03 §5.6 (2) and (4), V06 §3.22 (3) and §3.23 (3);
  * §2.7's support step (3) and (6) (a)–(b), §4.3 *Lattice and costs*, §4.4 S5a and S5c, §4.8's lead, against V01
    §3.17.3 (1)–(4), T-V1-51 and V11 §3.24.2, rows 80 and W50, and its lifecycle row;
  * §2.7's `HistoryHint` bound and §4.11 *The clock* against the members' history readings (V11 §3.25.2, l. 4626);
  * §10.2 (c)'s count, (d)'s `neighbourhoods`, barriers and places, (f)'s hand-over and the lead's pre-E2 yield,
    against V01 §3.16 (1)–(5), V02 §5.7, V03 §5.6 (4), V11 §3.25.9 (rows and C-crisis-tables), V07 §5.6 (1)–(3),
    T-V7-69 and V12 l. 2709;
  * V01's drawn-week Find (`findAreas`, `gapUnits`, §5.4 (1)–(6), T-V1-59) against §11.2 *At a drawn week*, V09
    §4.21.10 and V07 §5.5;
  * V01's withdrawn `raised.*` constants against V11's new cells, V12 §3.11's `raisedWays.structure` line and every
    citation of the old names;
  * V02's and V03's village units, `none`-row fixtures and build-plan landings against V07 §5.6 (3), T-V7-69, §10.2's
    lead and §16.
* **Hand-offs.** The HAND-OFFS sections of repair-r4-model, -pipeline, -V01, -V02, -V03 and -V11 were checked at their
  destinations. Open ones are peers' issues (VM-R4T-01 / VPC-R4-01, VM-R4T-04 / VPC-R4-03, VV12-r4-01) or VAF-R4T-04
  below; the rest are written or need no text.
* **Ids.** Every `T-Vn-m`, `J-Vn.m`, `J-VI.n`, `T-ER-n`, `EP-n` and `X-Vn-m` the six members cite is defined in the set,
  and none is defined twice (the eleven apparent repeats in V02 are its registration table and its "beyond" paragraph,
  not definitions).
* **Peers.** Nine round-4 results had landed: verify-determinism, -kernel, -model, -pipeline, -rendering, -scope,
  -vol-V01-V02, -vol-V03-V04 and -vol-V05-V06. They were read, and no defect a peer raised is raised again. In this
  chain they already hold:
  * V09's `findAreas(key)` with no week, and §11.2's reader list (VV12-r4-01);
  * the held area chip at a drawn week, and T-V1-59 (f)'s landing (VV12-r4-02, -04);
  * §4.3's "the one rule" (VV12-r4-03) and its generation regime (VM-R4T-06);
  * the last support run's give-way for a way and a locked raised way (VM-R4T-01, -02, VPC-R4-01);
  * `W_RAISED_CROSSING` in §5.4 (VM-R4T-04, VPC-R4-03);
  * a frame growth's deck extension (VV34-r4-01);
  * §6.3's comparison and the restoring re-cut (VDC4-01);
  * §10.2 (d)'s "its districts' tone" (VRC4T-09);
  * a late calamity at the last epoch's week (VPC-R4-02).

## Round-3 findings re-checked

| id | disposition (Part H) | state | where it stands now |
|---|---|---|---|
| VAF-R3T-01 | FIX (V01) | FIXED | V01 §3.16 `campLand` (1) (l. 2375–2377) reads "or the outermost town enceinte's outer strip where that lies beyond it (§10.2 (d): the enceintes of kinds other than `bailey`, `outermost` the outer envelope of their walled arcs)". §1b's row (l. 283) reads "the outermost town enceinte's outer strip (§10.2 (d))". The home (§10.2 (d), l. 15653–15657) defines both terms in those words. |
| VAF-R3T-02 | FIX per R4-04 (V11; VAH-r3-06 MERGED) | FIXED | V11 l. 4543 reads "at THORP, HAMLET and VILLAGE of V07 §5.6 (3)'s units (`villageDisasterUnits`: its ends, or in an end-less thorp its toft groups)". l. 4813 reads "a disaster look's units are V07 §5.6 (3)'s (`villageDisasterUnits`: …)". Both are R4-04 (a)'s gloss. The merged sibling's second ends are written: V08 l. 2717 ("V07 §5.6 (3)'s units at the village rungs (its ends, or an end-less thorp's toft groups)") and V10 l. 1020. |
| VAF-R3T-03 | MERGED into VV12-r3-02 (rendering) | FIXED | §11.2's `LooksAnswer.crises[].districts` (l. 16324) reads "a disaster look's units: V01's disasterDistricts over the model the view draws (at the village rungs V07 §5.6 (3)'s ends or toft groups)", VV12-r3-02's text. No "V07's ends" gloss is left in the base. V02 T-V2-60 (a) l. 3777 names the VILLAGE fixture's ends with the end-less THORP's toft groups beside them, which is a fixture statement and not the gloss alone. |

All three round-3 ids are closed. The defects the round-4 text newly makes, or newly exposes, in this chain are below
under fresh ids. Peers' ids already cover the rest.

## Issues (4: 0 blockers, 2 major, 2 minor)

| id | sev | kind | owner | claim | required change |
|---|---|---|---|---|---|
| VAF-R4T-01 | major | DISAGREE | V07 | R4-13 made the disaster's unit count two-stage. §10.2 (c) (l. 15631–15635) keeps round(s × n) clamped to [1, n] as every place's count, and then "the `neighbourhoods` place … draws at least every matched target (max(k, \|`matched`\|)) and, by fire, stops where its order ends, the shortfall reported (V01 §3.16 (5))". V01 §3.16 (5) (l. 2361–2366), the home, takes "the first max(k, \|`matched`\|) units of the order — all of a shorter fire order". V12 l. 2709 agrees. V07 §5.6 (1) (l. 3411–3415) still equates the look's units with the first stage: "A look scaled as a share of its place's units (§10.2 (c)) takes … round(s × n) clamped to [1, n] where s is above 0 and none where it is not — V01 §3.16 (5)'s count of the disaster's units, read for every share at the village rungs". T-V7-69 (c) bars the same ("a look scaled as a share of its place's n units at share s takes round(s × n) clamped to [1, n] where s is above 0"). Take a VILLAGE of four ends and a calamity naming two of them at severity 0: s = 0.05, so k = round(0.2) clamped to 1. V07 strikes one end, V01 strikes both, and a correct build fails T-V7-69 (c). A fire whose order ends before k gives a third outcome. R4-13's routing named only pipeline and V12. Two units, two outcomes for one case (R3-03 (b)). | V07 §5.6 (1): after "… round(s × n) clamped to [1, n] where s is above 0 and none where it is not" replace "— V01 §3.16 (5)'s count of the disaster's units, read for every share at the village rungs," with "— §10.2 (c)'s count k, read for every share at the village rungs," and, after "… never rounds to nothing", add: "; the disaster's `neighbourhoods` place then strikes at least every matched target — the first max(k, \|`matched`\|) units of its order — and, by fire, stops where its order ends, the shortfall reported (V01 §3.16 (5), the home)". T-V7-69 (c): after "… takes round(s × n) clamped to [1, n] where s is above 0" add "— a disaster's units the first max(k, \|`matched`\|) of its order, k that count, or all of a shorter fire order (V01 §3.16 (5)) — on a VILLAGE fixture whose calamity names more ends than k (every named end struck) and on a fire whose order ends before k (the shortfall reported)". |
| VAF-R4T-02 | major | DISAGREE | V07 | R4-12: "Every Find reader at a drawn week reads that listing over the model the view draws". §11.2 *At a drawn week* (l. 16455–16463) makes the listing the frame's ("every row, count, match and gap unit") wherever that week's frame is not the head. V01 §5.4, the town's reading, now reads the frame (lead l. 3139–3142; (1) l. 3167–3171; (3) l. 3188–3191; (4) a change of the drawn week re-evaluates). V01 §5.4's lead hands the village rungs to V07 §5.5 ("Below TOWN the village's reading is V07 §5.5's"), and V09 §4.21.10 (3) and (10) read V07 §5.5 there. V07 §5.5 (1) (l. 3339) builds the list "by §11.2's gazetteer query over the committed records", and W83 (l. 291) says the same. (2)'s gap units are the ends with no date. (4) re-evaluates on "Every commit, regenerate, undo, village epoch and hand-off" but not on a change of the drawn week. T-V7-68 runs no scrubbed week. So at a scrubbed VILLAGE week whose frame is not the head, one builder lists, glows and gaps the head's ends and uses (V07), and another the frame's (§11.2, V01). Examples are a smithy an epoch opened after that week, or two ends merged since. This is the class R4-12 graded major (VRC3T-01, VV12-r3-03, VAL-R3-05); R4-12's sweep did not reach V07. | V07 §5.5 (1): "built by §11.2's gazetteer query over the committed records" → "built by §11.2's gazetteer query over the model the view draws — the committed head or, at a drawn week (§2.9's `week`) whose frame is not the head, V06 §3.15.2's frame (§11.2's *At a drawn week*) —"; its **areas** bullet adds "at such a week, the ends and field groups that frame holds". (2) adds: "At a drawn week whose frame is not the head, the units and their members are read over that frame (§11.2's *At a drawn week*; V01 §5.4 (3)): an end the frame lacks is no unit." (4): "Every commit, regenerate, undo, village epoch and hand-off re-evaluates the chips at once" → "Every commit, regenerate, undo, village epoch and hand-off, and every change of the view's drawn week (§2.9's `week`), re-evaluates the chips at once". W83's input cell "§11.2's gazetteer at the view's effective key over the committed records" → "§11.2's gazetteer at the view's effective key and drawn week (§11.2's *At a drawn week*; V06 §3.15.2's frame)". T-V7-68 adds: "at a scrubbed week whose frame is not the head, on a VILLAGE fixture whose later epoch opened a smithy, closed another's use and merged two ends, each chip's matches, the ends listed and Show gaps' units equal §11.2's listing at that week, and the head's are back at the head". Its timing cell adds "its scrubbed-week clause at the first exit after M6-E's history frames (V06 §8, E6)". |
| VAF-R4T-03 | minor | DISAGREE | rendering | R4-03 made an element a restoring event's re-cut mints enter the damage only when that restoration ends: "Before that week it is drawn as built" (V06 §3.23 (3)). V03 §5.6 (2) (a) (l. 2693–2694: "an element is compared with the level only from its entry week") and §2.6 step 7 (l. 2099–2101) carry it. R4-03's sweep cleared §8.6 and V02 l. 3058 for the `decayPeak` they read. Their restatements of the *damaged* comparison still omit the entry week. §8.6's lead (l. 14069–14072) has "each plan element whose threshold t … its decay level reaches at the drawn week (… damaged while the level is above 0 and at least t — §6.3 *Plan damage*'s one comparison every reader makes) is drawn damaged". V02 §5.7 (2) (l. 3057–3063) has "damaged, by §6.3 *Plan damage*'s one comparison (the level above 0 and at least its keyed threshold t …)", and it names only "a wing an `extend` adds, an element a re-cut makes … added after its building's damage left" as drawn as built. During a `reoccupy` whose `repair` Works still runs, a minted room's roof bay or partition whose t the level reaches is damaged by these two texts and as built by V03, V06 and §2.6. Both texts take each element's state from V03's `planDamage` (V03 §5.6 (3); V02 §5.7 (2): "V03's damage layer gives each element its state"), so nothing built changes. This is VDC4-01's case (§6.3, the home) at two restatements. | One fix with VDC4-01. §8.6's lead: after "(V06's `decayLevel`; damaged while the level is above 0 and at least t" insert ", compared from the element's entry week into the plan (V03 §5.6 (2) (a)–(b); an element a restoring event's re-cut mints from the week that restoration ends, before which it draws as built, V06 §3.23 (3))". END at V02 §5.7 (2): "damaged, by §6.3 *Plan damage*'s one comparison (the level above 0 and at least its keyed threshold t: §6.3's `plan.damage`, V11's ranges)" adds "from the element's entry week into the plan (V03 §5.6 (2) (a))", and "so an element added after its building's damage left (a wing an `extend` adds, an element a re-cut makes) is drawn as built" → "so an element added after its building's damage left (a wing an `extend` adds, an element a re-cut makes), or one a restoring event's re-cut mints (V06 §3.23 (3)), is drawn as built". |
| VAF-R4T-04 | minor | HANDOFF-OPEN | scope | repair-r4-V03's HAND-OFF 1 (round 5's verifiers): §16's M3b row (l. 20181) lands "the `disaster` look's districts (§10.2's `neighbourhoods`) with volume 1's `disasterSource` and `disasterDistricts` at M5 (W10)". At THORP, HAMLET and VILLAGE the look's units are V07 §5.6 (3)'s and land at V-M3. V03 §8 (l. 2959–2960, P4's exit), T-V3-40's timing cell, J-V3.140, V02 §8.6 (l. 3893–3894), T-V1-60 and T-V7-69 all say so, as does §10.2's lead ("at the village rungs before V07's step the village draws no disaster unit"). The base's build-plan row names neither the village units nor their milestone, and it writes "districts" where R4-04 (a)'s phrase is "the look's units". §10.2's lead states the landing, so nothing built changes. | §16's M3b row: "the `disaster` look's districts (§10.2's `neighbourhoods`) with volume 1's `disasterSource` and `disasterDistricts` at M5 (W10)" → "the `disaster` look's units (§10.2's `neighbourhoods`) with volume 1's `disasterSource` and `disasterDistricts` at M5 (W10) — at the village rungs volume 7's `villageDisasterUnits` and `villageUnitPlots`, V-M3 (V07 §5.6 (8)) —", the rest as it stands. |

## Checked and agreeing (round 4)

* **A disaster look's units and the buildings it stands over (R4-04).**
  * Units (a): §2.6 step 7 (l. 2107–2111), §10.2 (d)'s `neighbourhoods` (l. 15689–15694) and §8.2's `disaster` row
    with `ruinTone` (l. 13091, 13110–13111) give the phrase or its gloss. So do V01 §3.16 (1), V02 §5.7 (1) with §1b,
    §3.18, J-V2.113 and X35, V03 §5.6 (4) with §1b, §3.13 and J-V3.139, and V11 l. 4524, 4543, 4586 and 4813.
  * Stands over (b): those texts read `crisisLookYields` with one predicate — no Works other than a `decay` Works begun
    by the view's week, unless finished before the overlay's `sinceWeek`, and a preview never hands over. So do V06
    §3.22 (3) and V02 §5.7 (6). V11's damage line (l. 4551–4552) reads the same predicate.
  * The pre-E2 yield in §10.2's lead stands inside item 122's base parts (M3b), which V02 §8.6 and V03 §8 already
    depend on.
* **The disaster's count (R4-13).** §10.2 (c), V01 §3.16 (5), T-V1-60 (a) and V12 l. 2709 agree. Only V07 does not
  (VAF-R4T-01).
* **A barrier across a way (R4-06).** §10.2 (d) and (f) and §8.2's placement sentence and `stakes` and `cordon` rows
  agree. EP-27's cell reads "a carriageway holding only a barrier across it (§10.2 (d))". V11 holds no restatement of
  the parts.
* **Raised ways (R4-09).**
  * §4.3's crossing rule (l. 5623–5634) has the same terms as V01 §3.17.3 (3) and T-V1-51 (c): an `open` span only;
    clear width ≥ the way's + `raisedWays.structure.clearWidthM`; §2.7's *The clearance*; ± `squareDeg` of square;
    never along the strip.
  * The cells (1 m, 30°, ranges [0, 3] m and [10°, 45°], `own`, calibratable) now stand at V11 §3.24.2 (l. 3958–3962),
    in the type (l. 709), row 80, W50, T-V11-1 (a) and V11 §8 (C3b = M3a). Their lifecycle row is l. 863, and V12
    §3.11's `raisedWays.structure` catch-all covers them.
  * V01's `raised.*` row, its §1.2 and §1b cells, its §3.14 lead and its PLAUSIBLE list are conformed. No unit cites the
    old names.
  * V01 §3.17.3 (2)'s strip agrees with (6) (b)'s reservation. The `vault` spans are filled by the base's vaults and an
    `open` span stays open ground.
  * V11's support-step reader rows (l. 3906–3907, 3980–3981; row 80's S5a, S7 and S5c) name (6) (a)'s runs.
* **The damage layer (R4-03).**
  * §2.6 step 7, V03 §5.6 (2) (a)–(b), §1b l. 303, §2.5 l. 926, §3.13's damage row, T-V3-39 (c), V03 §13's V06 row, V06
    §3.23 (3) and `decayPeak`'s `since` comment, and V10 l. 1856 give one entry week for a restoring re-cut's minted
    elements. Its two restatements are VAF-R4T-03, and its home is VDC4-01.
  * The week an aftermath's own level starts (VAT3-r3-07, -08) reads "the week its change shows (V06 §3.23 (1))" alike
    in §2.6 step 7, V02 §5.7 (6) and §3.18, V03 §5.6 (4) and V11 l. 4626.
* **`campLand` and the town enceintes.** V01 §3.16 (1) and §1b now read §10.2 (d)'s town enceintes and *outermost*.
  `beyondWalls`, `outside` and `edge` read the same. `campLand`'s and the disaster pair's memo keys gain the drawn frame,
  and their `doc` is already the model the view draws (§8.2).
* **Find at a drawn week (R4-12), V01's part.**
  * `findAreas(key, week?)` and `gapUnits(chip, key, week?)` (§2.3, §3.16, §5.4 (1), (3)) read §11.2 *At a drawn week*.
  * §5.4 (6)'s Show frame takes the frame's faces, and V09 §4.21.10 (10) passes the week.
  * The open ends are VV12-r4-01 (V09's `findAreas(key)`), VV12-r4-02 and VAF-R4T-02 (V07).
* **`HistoryHint` (R4-07).** §2.7's hint, its `ageYears` and `calamities` bound ("up to and including the present at
  creation") and §2.9's `Recipe.history` agree. No member restates the old bound: V11 l. 3819 is a scar reading, and
  V01 l. 343 reads carried calamity facts.
* **Tests and landings.**
  * T-V2-60 (a), (e), (g) and V02 §3.18's rows stage no withholding key for a look-bearing condition (R4-11), and
    neither does T-V3-40 (b) with V03 §3.13.
  * T-V3-40 (b)'s village clause reads T-V7-69's fixtures with and without an end, landing at the later of P4 and V-M3.
    V03 §8's P4 exit and J-V3.140 say the same.
  * V02 §8.6's village wait (V-M3, V07 §5.6 (8)) agrees with T-V1-60 and T-V7-69.

## Counts

* **Texts read.** The members' texts were read at their shared items:
  * model §2: 13 hunks, with §2.6 step 7 and §2.7's support step (3), (6) and `HistoryHint` whole;
  * pipeline: §4 (19 hunks; §4.3 *Lattice and costs*, §4.4 S5a and S5c and §4.8's lead whole), §10.2 (10 hunks;
    *Crisis looks* (a)–(i) whole) and PART II (1 hunk);
  * V01: 29 hunks, with §3.16, §3.17.3 and §5.4 (1)–(6) whole;
  * V02: 12 hunks, with §5.7 (1)–(4), (6) and §8.6 whole;
  * V03: 18 hunks, with §5.6, §3.13's two rows and T-V3-39 and T-V3-40 whole;
  * V11: 24 hunks, with §3.24.2's structure cells and §3.25.9's rows whole.
* **Other texts read as homes and counterparts.** §8.2's crisis rows, §8.6's damaged plan, §6.3 *Plan damage* and
  §11.2's `LooksAnswer` and *At a drawn week*; V06 §3.22 (3) and §3.23 (3); V07 §5.5, §5.6 (1)–(3), W83, T-V7-68 and
  T-V7-69; V09 §4.21.10 (3); V12 l. 2175 and l. 2705–2710.
* **Round-3 findings.** All three were re-checked and are FIXED (02's merged sibling's two second ends included).
* **Issues.** Four: 0 blocker, 2 major, 2 minor. By owner: V07 2, rendering 1, scope 1.
* **doc_checks.** Not run by this seat: it writes no design text.
