# Agreement check, round 5 — the fabric chain (model, pipeline, V01, V02, V03, V11) after assemble-r5

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-agree-fabric-r5t; covered by the whole-design retrovalidation (J84).

> **PROGRESS** — [x] brief read whole (ROUND-5 NOTES (1)–(5), items 114–119 routing, ORCHESTRATION NOTES) · [x] inputs (round-4 report and result; adjudication-r5 R5-01 – R5-10 and Part H; assemble-r5) · [x] live = assemble-r5's after-hashes; pre = `3310b538` · [x] VAF-R4T-01 … 04 re-checked on the live text, END lines' second ends included · [x] round-5 hunks in the six members read whole at their shared items · [x] R5-02's raised-way rule checked across model, pipeline, V01, V11 and the readers it names · [x] the members' repair-r5 HAND-OFFS checked · [x] matrix gaps hunted · [x] ids · [x] peers' twelve r5t results read (no duplicate raised) · [x] issues written · [x] result saved · [x] LANDED

## Scope and method

Members: **model** (§2), **pipeline** (§4, §10, PART II, PART III), **V01**, **V02**, **V03**, **V11**.

The live texts are `docs/ARCHITECTURE.md` (sha256 `2d84eac2…`) and `docs/volumes/V01/V02/V03/V11-*.md` (`4585e1a5…`,
`fb46c676…`, `3fe82c82…`, `b1445a5f…`). Each equals assemble-r5's after-hash. The pre-round text is the committed
`3310b538`, the text every repair-r5 file was written against. What was done:

* **Round-4 findings.** Each of the four ids was re-read at every site its claim, its required change and its Part H
  disposition name. Where Part H says "per R5-nn" or "amended", the ruling's text was the measure. VAF-R4T-03's END line
  at V02 was checked too.
* **Round-5 hunks.** A line diff pre → live gives these hunk counts in the members:
  * the base: model's §2 5 (§2.7 4, §2.9 1); pipeline's §4 25 (§4.1 2, §4.3 3, §4.4 5, §4.5 1, §4.7 1, §4.8 4, §4.11 4,
    §4.13 2), §10.2 2, PART II 1;
  * V01 6; V02 5; V03 6; V11 8.

  Every hunk was read in its subsection wherever it touches a subject another unit states. The checks covered:
  * R5-02's one rule (a raised way held from its creation; a wall laid after it running on beneath its deck). The home,
    §2.7's support step (3), (6) (a)–(d) and (7), was read whole. It was checked against pipeline's P1 – P12 (§4.1's S5
    and S7 rows, §4.3 *Lattice and costs*, *The slot* and *Where it may not go*, §4.4 S5a *Trace* (2), *Outer moats*,
    S5b and S5c, §4.5's casters, §4.8's lead and *Gates*, §4.11's carve, `wallToWay` and frame growth, §4.13's two
    cells), and against T110-2. It was also checked against V01 §3.17.3 (1)–(7), §3.17.4, l. 978 and l. 1423–1425, and
    against V11 §3.24.2's cells and readers and row 80;
  * R5-03's late change (§4.11 *The clock* (4)) against every member that reads a late calamity (V01 §3.16 (2), §3.18,
    T-V1-60 (d), J-V1.104);
  * R5-04's entry week (§6.3, §8.6's lead) against V02 §5.7 (2), §3.18, §7.8 and T-V2-59, against V03 §5.6 (2), §3.13
    and §5.2, and against V11 l. 3828, 4649;
  * R5-05's reader list and re-evaluation budget (§11.2 *At a drawn week*, §12.5's Find, R12-35) against V01 §5.4,
    §3.18 (e), §6 and T-V1-59 / T-V1-60's timing cells, and V03 T-V3-39's timing;
  * R5-06's count at V07 §5.6 (1) and T-V7-69 (c) against V01 §3.16 (5), the home;
  * R5-08's forms and view week (§11.2's `why` and `looks`) against V03 §1, §4.5, §4.6 and T-V3-40;
  * §10.2's `lookLevel` comment and "its units' tone" against §8.2's `ruinTone` row, V02 §5.7 (1), V03 §5.6 (4) and
    V11 l. 4544–4553;
  * §16's M3b row against V07 §5.6 (8), V02 §8.6 and V03 §8.
* **Hand-offs.** The HAND-OFFS sections of repair-r5-model, -pipeline, -V01, -V02, -V03 and -V11 were checked at their
  destinations:
  * model's quay observation agrees with §4.3 and §4.8's lead;
  * pipeline's first item is moot: §7.1 brings a hand viaduct or elevated road down before a wall, so §4.8 *Gates*' list
    is whole;
  * pipeline's second item (a spawned S5b radial on its own viaduct) is VEW-r5-01's;
  * V02's one end, at V03 §3.13, is open (VAF-R5T-04);
  * V01, V03 and V11 hold none.
* **Ids.** Every `T-Vn-m`, `J-Vn.m`, `J-VI.n`, `T-ER-n`, `EP-n` and `X-Vn-m` the six members cite is defined in the set,
  and none is defined twice. The apparent repeats are reference tables, not definitions: the J-VI rows that volumes
  restate from `_integrate.md`, and V02's registration table and its "beyond" paragraphs.
* **Peers.** Twelve round-5 results had landed: verify-agree-host, -agree-layers, -agree-proof, -agree-tools,
  -determinism, -edges-world, -model, -rendering, -vol-V01-V02, -vol-V07-V08, -vol-V09-V10 and -vol-V11-V12. They were
  read, and no defect a peer raised is raised again. In this chain they already hold:
  * §4.8's lead, §4.1, §4.13, §7.3, V06 and V11 l. 3906 stopping a later wall's "strips" where (6) (d) stops only its
    setback, glacis and berm (VM-R5T-01);
  * a crossing station whose stretch is taken whole (VM-R5T-02);
  * a raised gate's gate plaza against V01 §3.17.3 (6) (VM-R5T-03);
  * the soffit height of a wall run beneath a span (VRC5T-01);
  * T123-7 and its restatements (V03 T-V3-39 (g), V11 l. 3828, 4649) without "under no disaster look" (VRC5T-03);
  * the carve in `bend.raised.underSpan` (VDC5-01, -02, -05) and §5.3's raised-gate count (VDC5-03);
  * the carried-down crossing station on a palisade (VAL-R5-01, -03) and the arch vault's door under a later wall
    (VAL-R5-02);
  * T-V7-69's fixture list (VAP-r5-04), T-V1-59 (f)'s merge (VV12-r5-01) and T-V2-59 (c)'s E2 landing (VV12-r5-02);
  * the S5b radial on its own viaduct (VEW-r5-01) and the wall run's other edges (VEW-r5-02 – 05).

## Round-4 findings re-checked

| id | disposition (Part H) | state | where it stands now |
|---|---|---|---|
| VAF-R4T-01 | FIX per R5-06 (V07) | FIXED | V07 §5.6 (1) (l. 3433–3440) now reads "— §10.2 (c)'s count k, read for every share at the village rungs … the disaster's `neighbourhoods` place then strikes at least every matched target — the first max(k, \|`matched`\|) units of its order — and, by fire, stops where its order ends, the shortfall reported (V01 §3.16 (5), the home)". T-V7-69 (c) (l. 3702) adds "a disaster's units the first max(k, \|`matched`\|) of its order, k that count, or all of a shorter fire order (V01 §3.16 (5))" with both cases. This agrees with V01 §3.16 (5), §10.2 (c) and V12. Its fixture-list gap is VAP-r5-04's. |
| VAF-R4T-02 | FIX per R5-05, amended (V07) | FIXED | All of these now read §11.2's listing at the drawn week: V07 §5.5 (1) (l. 3355–3357, "over the model the view draws — the committed head or, at a drawn week … V06 §3.15.2's frame"), its **areas** bullet ("at such a week, the ends and field groups that frame holds"), (2)'s last sentence, (4)'s trigger ("and every change of the view's drawn week (§2.9's `week`)") and W83's input cell. T-V7-68 runs the scrubbed VILLAGE week. Its timing cell reads "its scrubbed-week clause at the latest of V-M3, M5 and V06's E6 (V06 §3.15.2's frames)", Part H's amended text, which V07 §8 (13) repeats. §5.5 (5) carries R5-05 (b)'s ≈ 100 ms re-evaluation. |
| VAF-R4T-03 | FIX per R5-04 (rendering; END at V02) | FIXED | §8.6's lead (l. 14117–14122) compares "from the element's entry week into the plan (V03 §5.6 (2) (a)–(b); an element a restoring event's re-cut mints from the week that restoration ends, before which it draws as built, V06 §3.23 (3))". The END at V02 §5.7 (2) (l. 3057–3064) is written verbatim. V02's sweep also conformed §3.18's two rows (l. 2519, 2521), §7.8's fixture and T-V2-59 (c); that clause's landing is VV12-r5-02's. |
| VAF-R4T-04 | FIX (scope) | FIXED | §16's M3b row (l. 20276) reads "the `disaster` look's units (§10.2's `neighbourhoods`) with volume 1's `disasterSource` and `disasterDistricts` at M5 (W10) — at the village rungs volume 7's `villageDisasterUnits` and `villageUnitPlots`, V-M3 (V07 §5.6 (8)) —". It agrees with V07 §5.6 (8), W84, V02 §8.6 and V03 §8's P4. |

All four round-4 ids are closed. Below are the defects that round 5's text newly makes or exposes in this chain, under
fresh ids. Peers' ids already cover the rest.

## Issues (5: 0 blockers, 0 major, 5 minor)

| id | sev | kind | owner | claim | required change |
|---|---|---|---|---|---|
| VAF-R5T-01 | minor | DISAGREE | V01 | **Background.** R5-03 rewrote §4.11 *The clock* (4) (l. 8476–8487). A calamity dated at or before the last epoch's week `W₀` is late. Where the absorb's week `W₁` is after `W₀`, "it rides the first epoch this absorb folds … its `EpochInputs.events` entry at that epoch's first week `W₀` + 1". Only where `W₁` is not after `W₀` does it fold no epoch: it is then "held in the binding (`DossierBinding.lateCalamities`, §7.7) until the first epoch a later absorb folds". So the one late calamity with no epoch event is a held one. **The defect.** V01 glosses the no-event case the other way at four sites, and R5-03's sweep did not name V01. The sites are §3.16 (2) (l. 2337–2339: "so a calamity carried with no event (one dated at or before the last absorbed week) still gives its targets and its pattern"), §3.18's disaster row (l. 2678), T-V1-60 (d) (l. 3363) and J-V1.104 (l. 3627). The last three read "a … calamity carried with no epoch event (dated at or before the last absorbed week)". The gloss is wrong for the ordinary absorb (`W₁` after `W₀`), and "the last absorbed week" is no term of the base. **Effect.** V01 reads the carried fact either way, so the units are unchanged. But T-V1-60 (d)'s fixture built to the gloss rides an epoch event, so the clause's named case (no epoch event) is never run. | V01 §3.16 (2): "so a calamity carried with no event (one dated at or before the last absorbed week) still gives its targets and its pattern" → "so a calamity carried with no epoch event yet — a late one held in `DossierBinding.lateCalamities` until a later absorb's epoch (§4.11 *The clock* (4)) — still gives its targets and its pattern". §3.18's disaster row: "a linked calamity carried with no epoch event (dated at or before the last absorbed week)" → "a linked calamity carried with no epoch event yet (a late one held in `DossierBinding.lateCalamities`, §4.11 *The clock* (4))". T-V1-60 (d): "a linked calamity carried with no epoch event (dated at or before the last absorbed week) strikes its targets, with its pattern" → "a linked calamity carried late by a second absorb in the last epoch's own week, held in `DossierBinding.lateCalamities` with no epoch event (§4.11 *The clock* (4)), strikes its targets, with its pattern, as does one carried late by an absorb whose week is after the last epoch's (riding that absorb's first epoch)". J-V1.104: "a calamity carried with no epoch event (dated at or before the last absorbed week)" → "a calamity carried with no epoch event yet (a late one held in `DossierBinding.lateCalamities`, §4.11 *The clock* (4))". |
| VAF-R5T-02 | minor | DISAGREE | V01 | **Background.** R5-02 lets a wall stretch laid after a raised way run on beneath its deck. In §2.7's support step (6) (d) (l. 2603–2616), "beneath every other span it is an ordinary run whose top is no higher than that span's soffit (the arch walled up …)". So a later ring passing under a viaduct or an aqueduct stands a wall run under an `open` span. **The defect.** V01 §3.17.3 (2) (l. 2464–2470) still describes the under-deck strip's spans as "the base's arch vaults (II.7.6; volume 4's `vault` spans) fill it where they exist, and an `open` span stays open ground, a way passing under it or bare ground". R5-02's sweep listed V01 §3.17.3 (3) and l. 978, 1424, 2485, not (2). **Effect.** V01 lays nothing in the strip, so nothing V01 builds changes. | V01 §3.17.3 (2): "and an `open` span stays open ground, a way passing under it or bare ground" → "and an `open` span stays open ground, a way passing under it, bare ground or the run of a wall stretch laid after the raised way, walled up beneath it (§2.7's support step (6) (d))" (the quotation of item 110 (b) after it kept). |
| VAF-R5T-03 | minor | DISAGREE | V01 | **Background.** R5-02 makes the commit that creates a raised way load-bearing. Its stations, keys and spans are placed there and held from then. §2.7's support step (6) (l. 2580–2583) names that commit: "at generation inside S4's or a stage's S5b route solve or at S6's end". §4.3 *The slot* (l. 5719–5722: "a viaduct inside S4's route solve (and each later stage's S5b through this router)") and V11 §3.24.2's readers (l. 3903–3904) say the same. **The defect.** V01 §3.17.4 (l. 2495–2496) lists the generated raised parts' commits as "— the viaduct inside S4's route solve, the elevated road and the aqueduct at S6's end (item 290)" and leaves out S5b's viaduct. **Effect.** Its claim that they are all committed before S7b (1) holds for S5b too, so nothing built changes. | V01 §3.17.4: "— the viaduct inside S4's route solve, the elevated road and the aqueduct at S6's end (item 290)" → "— a viaduct inside S4's route solve or a later stage's S5b, the elevated road and the aqueduct at S6's end (item 290; §2.7's support step (6))". |
| VAF-R5T-04 | minor | HANDOFF-OPEN | V03 | **The hand-off.** repair-r5-V02's HAND-OFFS (its one end for round-5 verifiers, no END line naming it) asks V03 §3.13's damage-layer row (l. 2094) to give the entry week in its level-1 outcome. **The defect.** The row's outcome cell still reads "every element damaged at 1". V02's own row on the same case now reads "every element the plan holds damaged, each from its entry week into the plan (V03 §5.6 (2) (a))" (V02 §3.18 l. 2519). The home, V03 §5.6 (2) (a), reads "an element is compared with the level only from its entry week". So V03's own edge row disagrees in form with its home and with V02's row. **Effect.** Nothing built changes. | V03 §3.13's damage-layer row, outcome cell: "every element damaged at 1" → "every element damaged at 1, each from its entry week into the plan (V03 §5.6 (2) (a))". |
| VAF-R5T-05 | minor | DISAGREE | V03 | **One fix with VRC5T-03**, at a site that issue does not list. **Background.** R5-04 conditioned the no-op: §6.3 *Plan damage* (l. 10010–10011) reads "a building never decayed and under no disaster look (§2.6 step 7) draws its plan unchanged (`item123.damage`)", and §8.6 (l. 14157) says the same. **The defect.** V03 §5.2's SVG paragraph (l. 2488) ends the `plan.damage` group's rule with "absent when nothing is damaged or repaired, so a building never decayed exports byte-identically". Its next sentences (l. 2491–2492) make a picture export draw the damage "as the view does, a disaster's look included (item 122 (f))". So a never-decayed building under a disaster look exports the group, and the conclusion states the unconditioned form. **Effect.** The sentence after it decides the case, so nothing built changes. | V03 §5.2: "so a building never decayed exports byte-identically" → "so a building never decayed and under no disaster look (§6.3 *Plan damage*) exports byte-identically". |

## Checked and agreeing (round 5)

* **A raised way held from its creation (R5-02), pipeline's ends.**
  * P1 – P12 are written at their homes in R5-02's words: §4.3 l. 5643–5655 and l. 5719–5722, §4.1's S5 and S7 rows,
    §4.4 l. 5856–5859, 5899–5903, 5911, 5918 and 5952, §4.5 l. 6150, §4.8 l. 7610–7616, 7655–7659 and 7668–7675, §4.11
    l. 8218–8221, 8239–8243 and 8522, and §4.13 l. 9015 and 9017.
  * §4.3 *Where it may not go* (l. 5750–5753) cites the new (6) (b), (d).
  * Every remaining citation of "(6) (a)" or "(6) (b)" in the members is a part-0 way or a channel, in (6)'s new
    lettering. No member keeps the superseded run after S7, the re-siting, a station a later trace takes, the palisade
    clause or the lock clause.
  * The strip wording at §4.8, §4.1, §4.13 and V11 l. 3906 is VM-R5T-01's.
* **V01's raised-way readings.**
  * V01 §3.17.3 (3)'s crossing rule matches §4.3 and (6) (a): an `open` span, the clear width + `clearWidthM`, *The
    clearance*, ± `squareDeg`, never along the strip. Its ladders match too (F-TEMPLATE rungs 1–2, §4.6's lane ladder,
    the end at the strip's edge), and §4.3 names them.
  * (1) reads the support step's piers.
  * (6) and l. 978, 1423–1425 read a raised gate's portal on the raised part only, as §4.8 *Gates* gives it. Their gate
    plaza is VM-R5T-03's.
  * VAF-R5T-02 and -03 are the two restatements left.
* **V11's raised-way cells.**
  * §3.24.2's readers (l. 3903–3909) and row 80 name S5a and S7 for a later wall's stop at the under-deck strip.
  * `clearWidthM` and `squareDeg` are read by every part-0 way (§2.7's support step (6) (a)), with V07's trackers and
    S7's quays, intervallum and castle paths. This agrees with §4.3 P1.
  * The support step's readers drop the re-runs (R5-02's V11 END) and add (7)'s extension.
  * The cells, ranges and register routes stand. `clearWidthM` and `squareDeg` take V12's default line, and V11 §8
    agrees.
* **R5-04 in the plan and exterior.**
  * V02 §5.7 (2), V02 §3.18's two rows, V03 §5.6 (2) (a)–(b), T-V3-39 (c), §6.3, §8.6 and T-ER-28 give one entry week
    for a restoring re-cut's minted elements.
  * V02 §5.7 (1) ("a building never abandoned, under no look") and V03 §5.6 (2) (a) ("never decayed and under no look")
    carry the conditioned no-op.
  * VAF-R5T-04 and -05 and VRC5T-03's sites are the rest.
* **The disaster look (R5-06, §10.2's hunks).**
  * §10.2's `lookLevel` comment ("the buildings it stands over draw ((f))") and (d)'s "its units' tone (§8.2's
    `ruinTone`)" agree with §8.2's `disaster` row, V02 §5.7 (1), V03 §5.6 (4), J-V2.113, J-V3.139 and V11 l. 4544–4553.
  * V07's count agrees with V01 §3.16 (5).
* **Find at a drawn week (R5-05).**
  * §11.2's reader list names V01's `findAreas` and `gapUnits` and V07 §5.5.
  * §12.5 and R12-35's re-evaluation (≈ 100 ms of the frame drawn, off the scrub's path) is the "overlay budget" V01
    §5.4 (4), §3.18 (e) and §6's Find line cite.
  * T-V1-60's timing cell carries R5-05's END ("(c)'s scrubbed-week clause at the later of M5 and V06's E6").
  * T-V3-39's timing cell carries R5-05's END ("its scrub across the run at the later of P4 and V06's E6"), and V03 §8's
    P4 row repeats it.
* **The why's view week and line forms (R5-08) in V03.**
  * V03 §4.6's `plan` damage rows read "at the why's view's drawn week (`opts.view.week`, V10 §2.13; §11.2's view-bound
    `why`), else the document's current week". This is §11.2's `why` comment.
  * §4.5, §1 and T-V3-40 (e) read `info.crisis.ruinedFor` "in the form V09 §4.21.12 (4) chooses", with
    `ruinedForPreview` under a preview, as V09 l. 3643 and 3728 define them.
* **The late change (R5-03).** No member but V01 restates a late calamity (VAF-R5T-01). V02, V03 and V11 hold no
  "last absorbed" or no-event gloss.

## Counts

* **Texts read.** The members' texts were read at their shared items:
  * model §2: 5 hunks, with §2.7's support step (1)–(7), *The clearance* and the span rule's lead whole;
  * pipeline: §4 (25 hunks; §4.3 *Lattice and costs*, *The slot* and *Where it may not go*, §4.4 S5a *Trace* (2), *Outer
    moats* and S5b, §4.8's lead and *Gates*, §4.11's carve and *The clock* (4) whole), §10.2 (2 hunks) and PART II (1);
  * V01: 6 hunks, with §3.16 (1)–(3), §3.17.3, §3.17.4, §5.4 and T-V1-51, T-V1-59 and T-V1-60 whole;
  * V02: 5 hunks, with §5.7 (2), §3.18's damage rows and §7.8 whole;
  * V03: 6 hunks, with §5.6 (2), §5.2, §3.13's damage row and T-V3-39 and T-V3-40 whole;
  * V11: 8 hunks, with §3.24.2's readers and structure cells and the crisis rows' readings whole.
* **Other texts read as homes and counterparts.**
  * Base: §5.3's gate rows, §6.3 *Plan damage*, §8.2's crisis rows, §8.6's lead, §11.2's `why`, `looks` and *At a drawn
    week*, §12.5's Find, T110-2 and §16's M3b row.
  * V07: §3.5a (3), §5.5, §5.6 (1), T-V7-68 and T-V7-69.
  * V09: l. 3643 and 3728.
* **Round-4 findings.** All four were re-checked and are FIXED (VAF-R4T-03's V02 END included).
* **Issues.** Five: 0 blocker, 0 major, 5 minor. By owner: V01 3, V03 2.
* **doc_checks.** Not run by this seat: it writes no design text.
