# verify-scope-r6t — the SCOPE part after repair round 6 / assemble-r6

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-scope-r6t; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-scope-r6t`, 2026-10-01, cloud checkout)
- P0 brief read whole; resume check (no output, no LANDED): fresh start — done
- P1 inputs: verify-scope-r5t + result (4 issues); adjudication-r6 (R6-01, R6-02 whole with Part P's amendments, R6-03,
  R6-04, R6-07, R6-08, R6-09, R6-11; Part H · scope and every END line naming scope); round6-work/scope.json (10
  issues); repair-r6-scope (header, dispositions, END lines, sweep, judgments, hand-offs); the other sixteen repair-r6
  files' HAND-OFFS; assemble-r6 (live base `f39f1c30…`, rationale `a3f45a3f…`, INDEX `90e2844a…` = the live files'
  sha256, re-checked); pre-round-6 copies from HEAD `b3f83a0d` (base `2d84eac2…`, rationale `a480f02e…`, the twelve
  volumes); scope-part line diff: 16 hunks — done
- P2 the four round-5 findings re-checked against the live text, with each END line's second end — done (all closed)
- P3 every round-6 hunk in scope re-read in its whole subsection (§13.2's convention (5), T76-1, the dossier manifest,
  T110-2, T114-3, T120-6, T123-7, the take-over row; §13.8's T76-1, T110, T114 and T120-6 rows; §14's `PortNote`;
  J-A67.45's index row and Part A entry), each against its ruling's text (scripted comparison) and its homes; R6-02's
  three checks (cells, restatements, citations) over the scope part; the crossing table's cells that name T110-2 read
  one by one against T110-2's clauses — done
- P4 cross-checks (ids, index = Part A, references, retired terms, deferral, phone clauses, review ids, held-calamity
  census, volume §8 build plans against §16, doc_checks, sizes, nuance, edges, hand-offs) — done
- P5 report, result file, LANDED — done

**Verdict.** All four round-5 findings are closed as ruled: VCS-r5-01 is FIXED per R6-03, VCS-r5-02 is closed with
VAP-r5-01 (FIXED, V12's ends written), VCS-r5-03 is closed with VDC5-02 (FIXED, V09's end written), and VCS-r5-04 is
FIXED per R6-02. Every other disposition under scope is applied as written: VAH-r5-02, VAP-r5-01, VAP-r5-05, VDC5-02 and
VRC5T-03 as fixes, VRC4T-04 merged. The six END lines under scope are written; the (S1)–(S4) and R6-03 texts are in the
live text word for word (a scripted comparison, Part P's markers stripped). No held calamity, crossing station, raised
gate, wall opening or held stretch survives in scope.

**5 issues (0 blocker, 2 major, 3 minor)** — four owned by scope, one by V06:
* **VCS-r6-01** (major, scope) — the crossing table's column C13 names T110-2 (4) for a raised way re-shaped across a
  standing wall, and T110-2 (4) runs only the Arch-spacing edit.
* **VCS-r6-02** (major, scope) — T110-2 (6)'s New random asserts "under the nearest span" for S3's pulled trace. The
  crossing table gives that outcome only to a stretch that is bent locally.
* **VCS-r6-03** (minor, scope) — T110-2's new arch-vault clauses are scheduled at M3a, but their provider is volume 4's
  U3, which lands at M6-U.
* **VCS-r6-04** (minor, V06) — T-V6-47 says it takes T110-2 (7), but it leaves out (7)'s repair clause and its
  cells'-order clause.
* **VCS-r6-05** (minor, scope) — the new `derived` manifest row does not say what `file` and the provenance fields
  hold.

No nuance was lost. The unit grew by 1 257 words (+1.18 %). doc_checks exits 0, but the result is provisional because
the reference corpus is incomplete in this checkout.

## 1. Round-5 findings, re-checked on the live text

Line numbers are the live base after assemble-r6 (`f39f1c30…`) and each volume's live file.

| id | Part H | status | evidence |
|---|---|---|---|
| VCS-r5-01 (minor) | FIX per R6-03 | **FIXED** | T76-1 (l. 18289–18304) reads "… its deaths in that epoch's burial need (that clause from M6-E's E8, V06 §3.18.2 (3));", inside R6-03's T76-1 text. §13.8's row (l. 19452) reads "M3a (T76-1's coarsened catch-up fixture with M6-E; its second-absorb fixture's burial-need clause with M6-E's E8)". Its homes hold: V06 §3.18.2 (3) is the catacomb need; V06 §8's E8 lands "the calamity deaths in the need" (V06 l. 4236); §16 puts E8 after V04's U5. |
| VCS-r5-02 (minor → major) | MERGED into VAP-r5-01 | **closed** | T120-6 (l. 18771–18774) adds the drawn-week clause as VAP-r5-01 words it. §13.8's T120-6 cell (l. 19485) reads "M5 (its drawn-week clause at the later of M5 and V06's E6)". The second end, V12, is written: §3.4's catalogue row (V12 l. 1173), §3.15.10's bullet (l. 2643), and T-V12-52's planted case and its cell (l. 3176). §12.5's budget and R12-35 stand (l. 17234, 13288). |
| VCS-r5-03 (major) | MERGED into VDC5-02 | **closed** | T110-2 (5) (l. 18591–18598) runs both carves: one meeting a support, moved along the deck (`bend.raised.underSpan`), and one too wide for every gap, stopped at the strip's edges (`bend.raised.around`), each locked and pinned. The second end, V09's T-V9-52 (V09 l. 4411), adds the carve clause. The way-and-channel table's row (e) (l. 2589) names T110-2 (5). |
| VCS-r5-04 (major) | FIX per R6-02 | **FIXED as ruled** | No crossing station exists, so the regeneration clause is R6-02's (S1) (6) (l. 18598–18607). It runs a locked regeneration that is byte-identical, the oblique-route variant re-solved, a New random whose new ring meets a support, and (3)'s `moat: 'all'` fixture re-derived from S4. A new defect in the New-random wording is VCS-r6-02. |

## 2. The round-6 blocks in scope

Scope's repair replaced §13.2, §13.8 and §14 by count-asserted substitutions. It also restated J-A67.45's index row
and its Part A entry, which assemble-r6 swapped. No other unit's block touched the scope part, and INDEX.md is
unchanged. A line diff of the scope part against `b3f83a0d` gives 16 hunks, and every line outside them is verbatim.
Each hunk was read in its whole subsection.

### The ten dispositions and the six END lines

* **VAH-r5-02** (§14 `PortNote.field_fallback`, l. 19810) — **FIXED per R6-08.** It agrees with §7.7 item 10's clause
  (l. 12111) and with V08 §2.4, §3.5 and §3.17 (V08 l. 628, 1684, 2635).
* **VAP-r5-01** — **FIXED** (see VCS-r5-02 above).
* **VAP-r5-05** (§13.2's manifest paragraph and `DossierFixtureRow`, l. 18364–18374) — **FIXED per R6-11**, as written.
  V12 §1b's `<dossier>@pop×k` rows and V08 §7.1's "each in §13.2's frozen manifest" now have their rows. One new
  ambiguity in the row type is VCS-r6-05.
* **VDC5-02** — **FIXED** (see VCS-r5-03 above).
* **VRC4T-04** — merged into VAP-r5-01 and closed with it.
* **VRC5T-03** (T123-7, l. 18829–18831) — **FIXED per R6-07.** §13.2's convention (5) is conformed in the same words
  (judgment 2, l. 17969). The second ends hold: V12's `entityScope` comment, the pin row and §3.7's text (V12 l. 905,
  934, 1748, 2762); V03, V04 and V11 each say "under no disaster look". V03 l. 2513 stands, by R6-07.
* **VCS-r5-01, VCS-r5-03, VCS-r5-04** — above.
* **END of VEW-r5-01 … VEL5-r5-04's (3)** — (S1), checked by script: the whole 1 619-word text appears in the live
  T110-2, character for character after whitespace normalisation and with Part P's 13 markers removed.
* **END of VAT5-r5-02** ((S2)) — VAT5-r5-02's text and (S2)'s fixture both appear verbatim (l. 18528–18533), joined by
  "; " (judgment 4). §2.7's support step (7) (l. 2712–2724) states both.
* **END of VEW-r5-05 and VM-R5T-02** ((S3)) — T114-3 (l. 18666–18672) appears verbatim. Its landfall clause agrees with
  row W12 and with V05's T-V5-14 ("A raised way over a wall").
* **END of R6-02** ((S4)) — the runs sentence (l. 18627–18629), §13.8's T110 row (l. 19455) and the T114 row
  (l. 19466) appear verbatim. Their second ends are written:
  * T-V6-47 takes (4), (5), (7) and (8) (V06 l. 4170), but leaves two of (7)'s clauses out: VCS-r6-04.
  * T-V6-73 takes (1)'s founding and (2)'s founded viaduct (V06 l. 4196).
  * V06 §7's lead (l. 4036–4041) now lists "(1), (2), (4), (5), (7) and (8)". This closes repair-r6-scope's hand-off.
* **END of VEL5-r5-01** — the J-A67.45 index row (l. 22853) and its Part A entry (rationale l. 631) both read "the
  greatest week the folded events carry". This agrees with §4.11 *The clock* (1) (l. 8510) and §2.9's `EpochRecord`
  comment (l. 3239). T76-1's current-week clause is as written.
* **END of VV78-r5-01** — T76-1's trigger parenthesis and its second-absorb fixture are R6-03's text verbatim. No
  `DossierBinding.lateCalamities` remains anywhere in the set.

### The repair's judgment calls

All five are sound:
1. The take-over row is conformed to (S4).
2. Convention (5)'s `entityScope` wording is conformed.
3. J-A67.45's Part A entry is restated with its index row.
4. The joining "; ".
5. The two parentheses in T120-6.

### R6-02's three checks where scope touches the family (round-6 note (6) (b))

* **(i) Cells and their tests.** Scope's text cites W1·C12 and W2·C12. Each gives one outcome and names the
  frame-growth clause, which runs it (l. 18531–18533). I also read the crossing table's 58 cells that name a T110-2
  clause against that clause (rows W1–W13, l. 2698–2710):
  * Where a cell gives its own outcome, T110-2 runs it: W1·C1–C6, C10–C12; W2·C2–C6, C8, C12; W3·C2; W7·C2;
    W11·C2; W13·C2.
  * The exception is the C13 column: W1·C13 and W2·C13 name T110-2 (4) for a re-shaped course, which no bar runs.
    That is **VCS-r6-01**.
  * W3's other cells name T110-2 (6) for states that (6) does not regenerate. That is already raised as VEL6-r6-02
    (verify-edges-life-r6t), so it is not repeated here.
  * The "as C2" cells of W4–W13 name the C2 test, and the outcome is the same by construction. VAL-R6-06 grades this
    class minor for row W9, and Part P (PRB6-12) left these cells as they stand.
* **(ii) Restatements.** No scope site restates either table in its own words. No scope site keeps a crossing station,
  raised gate, wall opening, held stretch or wall arch (0 hits each). The other scope sites were all read: the
  one-page summary's "a gate wherever a main road crosses it", §0.2's item-110 row, §16's M3a row, and the J-A110.* and
  J-C4 index rows. Each states no crossing rule, or agrees with §4.8 *Gates* (gates counted on ground part 0).
* **(iii) Citations.** Every citation names an outcome or cell that exists:
  * the four outcome names;
  * "§2.7's crossing and way-and-channel tables";
  * W1·C12 and W2·C12;
  * `bend.wall.aqueductArch`, `bend.wall.raisedCrossing`, `bend.raised.underSpan`, `bend.raised.around` and
    `raised.waited` (V09 §4.9; §7.1 l. 10674–10675; V06 §3.19 (5)).
* **(6) (c).** No held-calamity clause stands in scope. A set-wide search finds 0 `lateCalamities` and no "held late",
  "held in the binding" or "targets applied".
* **(6) (d).** R6-02's list of behaviour changes is not graded. Its items are the owner's to accept or veto.

## 3. Hand-offs addressed to scope (round 6's repair files)

* **V06**: the take-over row. Closed by scope's judgment 1. V06 §7's lead now lists the same clauses.
* **pipeline**: J-A67.45's Part A entry. Closed (the rationale's l. 631).
* **V04, determinism and V02**: these raise nothing at scope. V04's arch-vault case is raised as VAL-R6-01 and
  VEW-r6-02, owned by model. Determinism's S3 moat report is VDC6-02, owned by determinism.
* **scope's own hand-off (model, pipeline, determinism, V06, V09, V12: "a verifier checks each landed as cited")** —
  every name it lists resolves (§2 (iii)). T-V6-47's coverage is VCS-r6-04.

## 4. Cross-checks on the whole part

* **Ids.**
  * Base T-ids: 341 defined in §13, and every one cited in scope is defined. T101-6's second hit is a citation.
  * Volume test ids: 150 cited, all defined. V02 and V05 define theirs in bullet form.
  * Judgment ids: the index equals Part A, 805 rows in the same order, 0 duplicates.
* **References.** assemble-r6 reports 0 broken references set-wide. I opened every target new in scope this round:
  * §2.7's tables and cells, and §2.7's support step (7);
  * §4.11 *The clock* (1) and (4); §6.3 *Plan damage*; §12.5;
  * V06 §3.15.2, §3.18.2 (3), §3.19 and §3.19.2 (3);
  * V05 §3.16; V08 §7.1; V12 §1b and §3.7.8 (5).
* **Retired terms** (the canon's 35 patterns over the part, pre-round 6 → live): G-lot 41 → 41, G-unitinput 3 → 3 and
  G-M6U 1 → 1, all judged in earlier rounds. No other pattern has a hit.
* **Deferral, review ids and phone clauses.** I checked the 142 added lines (3 129 words):
  * They hold no review id, PRB6 marker, phone, mobile or small-screen clause.
  * The four "later" are temporal: "a later absorb", "later work", and twice "the later of M5 and V06's E6".
  * The five "open" are a span's `use` or "open ground".
* **Volume build plans and §16.** Every volume's §8 person-week figures are unchanged from `b3f83a0d` (a scripted
  comparison), so earlier rounds' sums stand. The §8 text changes in V01, V02, V03, V05, V06, V10 and V12 are R6-09's
  scheduling notes and R6-11's E1 line, and none moves a milestone §16 states. §16 and INDEX.md are unchanged.
* **doc_checks.py** `--sections "0,1,1.1,13,13.1,13.2,13.4,13.8,14,15,16,17,Delegated decisions,Judgment calls,Staged,Appendix A"`:
  * **exit 0** — hits/unreviewed: C1 5/0, C2 1/0, C3 458/0, C4 2/0, S1 0/0, S2 298/0.
  * **WARNING printed: reference corpus INCOMPLETE (captures, research/patreon, research/devlogs, research/ftg-docs,
    research/external missing) — NOT authoritative; provisional.**
* **Sizes (principle (9); whitespace words).**
  * Scope part: 106 561 → 107 818 (+1 257, +1.18 %): §13.2 +1 201, §13.8 +28, §14 +24, the judgment index +4. These
    match repair-r6-scope's report. The rationale's J-A67.45 entry grew from 108 to 115 words.
  * Against the archive: 98 458 → 107 818 (+9.5 %). Items 111–126's bars and the rulings' fixtures hold the growth:
    irreducible content, not a defect.
  * The only cut is T114-3's station clauses (209 → 101 words), removed with the station by R6-02's unification.
* **Nuance.** Every bar on R6-02's equivalence list is in the live T110-2:
  * zero junctions (head);
  * no support in water or in a band standing at creation ((1), (3), (5));
  * every clear span and pier within its bound ((1); the obstacles clause);
  * the raised way unchanged by later work, locked or not ((4)–(6));
  * 0 way corridors over a support ring, ramp, stair, foot or `vault` span's strip ((5), (6), (8));
  * `W_RAISED_CROSSING` ((3));
  * no course dropped (every station, key and span unchanged); "nothing waiting" stays T-V6-47's;
  * 0 road decks across a standing trace ((2));
  * 0 gates or towers in an under-deck strip ((1), (3), (4));
  * 0 gaps in a band ((7));
  * the arch-vault and soffit bars ((1), (3), (4));
  * 0 trace lines across a ramp, stair, foot or standing support ((3), (4), (6)).

  T114-3 lost only clauses about the station, which R6-01 (5) supersedes. No NUANCE-LOST, and the more-than-half audit
  does not apply.
* **Edges (principle (11)).** Each new clause brings its edge with a defined outcome and a bar: the second absorb in the
  last epoch's week, the drawn-week chip timing, the derived fixture, and the crossing table's outcomes at generation,
  by hand, at an epoch, at a regeneration and as parts go. The exceptions are VCS-r6-01 (the re-shape edge has no bar)
  and VEL6-r6-02 (raised elsewhere). The edges.json entries outside the touched text keep their earlier verdicts.

## 5. Issues

**VCS-r6-01** (scope · major · EDGE-UNTESTED). *A raised way re-shaped across a standing wall has an outcome but no
bar.*
* The crossing table's column C13 (l. 2676–2681) gives the outcome of a raised way edited by its own op: "a hand
  re-shape of its course, `spanSpacingCm` (V09's Arch spacing) or `clearanceCm` (Deck height)". Its outcomes are:
  * a station in a band laid after the deck slides off it;
  * "a re-shaped aqueduct stretch across a standing band *over the band*";
  * "a re-shaped road deck stretch across a standing trace bent down before it (`bend.raised.wall`)".
* W1·C13 names T110-2 (4) as its test (l. 2698), and W2·C13 reads "as W1·C13 · T110-2 (4)".
* T110-2 (4) (l. 18582–18583) runs only the Arch-spacing case: "the viaduct's Arch spacing changed after the wall was
  drawn — its station in the band slid off it, the band whole there".
* No bar in the set runs a re-shape (V04's `moveVertex`, V04 l. 372) across a standing wall:
  * T-V9-52 runs a raised road *declared* across a wall;
  * T110-2 (1) runs an aqueduct *drawn* across one.
* A build whose re-shape dry run skips the wall check passes every bar, leaving a road deck carried over a curtain or an
  aqueduct pier in a band. That is an untested edge with a defined outcome on an editing path: MAJOR (principle (11);
  R6-01's grading).

*Required change:* in §13.2's T110-2 (4), after "and the viaduct's Arch spacing changed after the wall was drawn — its
station in the band slid off it, the band whole there" add:

> ; and, on a CITY fixture with a standing ring, a standing aqueduct's course re-shaped by hand so that a stretch of it
> crosses the ring — that stretch *over the band*, its supports off the band and its under-deck strip clear of the
> ring's gates and towers — and a standing declared viaduct's course re-shaped so that a stretch of it crosses the
> ring — that stretch brought down before the trace, its way through the gate there on ground part 0, with
> `bend.raised.wall` —, each run again with the raised way locked, no `refuse.locked` (§2.7's crossing table, W1·C13)

**VCS-r6-02** (scope · major · CONFLICT). *T110-2 (6) gives a pulled trace the outcome of a locally bent stretch.*
* T110-2 (6)'s New random (l. 18602–18605) reads: "its seed searched so that the new ring's boundary meets one of the
  aqueduct's supports — the trace crossing the deck line under the nearest span, a support's edge its band meets built
  into the band".
* At a regeneration, S3 lays that ring by the `EnceinteStrategy`'s pull. *Beneath* (l. 2622–2625) says such a trace
  "treats … an aqueduct's standing supports as impassable". Only "a stretch laid by neither" is "bent locally … to cross
  an aqueduct under the nearest span (ties: the span nearer the deck's first foot in spine order)" (l. 2627–2631).
* The pull goes wherever its cost path and its 40 m search band take it, so "the nearest span" is not its outcome. When
  the boundary meets the support at its centre, the two spans beside it tie, and the pull has no spine-order tie rule.
* So two units state two outcomes for one case. A test written from T110-2 checks for the nearest span. A generator
  built to pass it would bend S3's regenerated trace locally, against *beneath*. Under R6-01's rule ("two units stating
  two outcomes for one case is MAJOR however rare the case") this is MAJOR.

*Required change:* in §13.2's T110-2 (6), "— the trace crossing the deck line under the nearest span, a support's edge
its band meets built into the band," → "— the trace crossing the deck line under a span, never at a support, S3's pull
treating the aqueduct's standing supports as impassable (§2.7's crossing table, *beneath*), a support's edge its band
meets built into the band,".

**VCS-r6-03** (scope · minor · COHESION). *T110-2's new arch-vault clauses are scheduled before their provider.*
* T110-2 (4) (l. 18570–18573) asserts that a hand `drawWall` across an aqueduct with a `vault` span in its line removes
  "the `vault` span's arch vault … in the wall's commit (a fate in the hand dry run, the hand undo restoring it with the
  same id)". T110-2 (1) (l. 18543) asserts "a `vault` one read `open` with no chamber". Both are new this round.
* The arch vault and `ArchVaults.reconcile` are V04's: U3 lands "the arch vaults and `ArchVaults.reconcile`" (V04
  l. 3207), and §16 puts M6-U after M5.
* §13.8's T110 row (l. 19455) runs T110-2 at M3a. It names a later exit only for the epoch clauses (M4; M6-E's E2 and
  E3), and R6-09's sweep scheduled only those.
* Before U3 no arch vault exists, so (4)'s clause cannot run and (1)'s holds vacuously. INDEX §5 risk 2 and R5-05 (c)
  move such a clause to the first exit after its provider. V04's T-V4-63 runs the same case at its own step, so nothing
  built changes: minor (VCS-r5-01's class, R6-09).

*Required change:* in §13.8's T110 row, after "… those of (1), (2), (4), (5), (7) and (8) on volume 6's engine with
M6-E's E2 and E3" add "; (1)'s and (4)'s arch-vault clauses at the later of their milestone and M6-U's U3, which lays
the arch vaults (V04 §8)".

**VCS-r6-04** (V06 · minor · COHESION). *T-V6-47 leaves out two clauses of T110-2 (7), which it says it takes.*
* The runs sentence (l. 18627–18629) reads: "Volume 6 runs T110-2's epoch clauses (4), (5), (7) and (8) on its engine
  (T-V6-47)". The take-over row (l. 18874) and V06 §7's T110-2 row and lead say the same.
* T-V6-47 (V06 l. 4170) runs (7)'s lapse and the hand delete, but not two of its clauses:
  * "then the lapsed span repaired by `repairRaised` — the cap back, no wall op";
  * the cells'-order clause (l. 18612–18615): an epoch circuit laid across the aqueduct after a span over its planned
    band fell `ruined` and after a support there was `cleared`, and an epoch contraction laid after a support by its
    planned line was `cleared`.
* The crossing table's cells W1·C3 and W1·C5 name "T110-2 (7), T-V6-47", and W1·C10 names T110-2 (7).
* T110-2 (7) still states these bars, scheduled on volume 6's engine with E3 by §13.8. So this is a volume test list
  that omits cases its taken clause names: minor (R6-01's grading; VAL-R6-06's class).

*Required change:* in V06's T-V6-47, after "the circuit's closure unchanged, the delete's undo restoring the cap" add:

> ; then the breached span repaired by `repairRaised` — the cap back, no wall op; and an epoch circuit laid across the
> aqueduct after a span over its planned band fell `ruined` and after a support there was `cleared` — the run at its
> own top beneath the fallen span, the trace through the cleared ring as open ground — and an epoch contraction laid
> after a support by its planned line was `cleared` — the trace through its former ring (T110-2 (7); §2.7's crossing
> table, W1·C3, W1·C5)

**VCS-r6-05** (scope · minor · NEW-PROBLEM). *The new `derived` manifest row does not say what its required fields
hold.*
* VAP-r5-05's row (l. 18369–18374) adds `kind: 'derived'` and `derivedFrom?: { file; mutation }`. A derived fixture is
  "never written as a file".
* `DossierFixtureRow` still requires `file`, `seed` ("the synthetic seed the file was generated from"), `config`,
  `generatedBy`, `population` and `ourRung` on every row, and says nothing of them for a derived row.
* V12 §1b names a derived fixture by its id, "`<dossier>@pop×k`" (V12 l. 633: "a fixture id of the frozen manifest").
  The row has no id field but `file`.
* A `@pop×k` row's population and rung are not its source's. One harness keys the row by its source's file, another by
  the derived id, and V12's `dossier` lookup misses in one of them. This is test-kit only, so minor.

*Required change:* in §13.2's `DossierFixtureRow`, make two comment changes.
* `file: string` takes the comment:
  > /* the row's fixture id (V12 §1b's `dossier`): a file's name, or for a `derived` row the id its volume names —
  > `<file>@pop×k`, or V08 §7.1's fixture name — naming no file */
* `derivedFrom`'s comment adds:
  > ; its provenance fields (`sfLine` to `generatedBy`) are its source row's, its `population`, `tierWord` and
  > `ourRung` those of the mutated dossier
