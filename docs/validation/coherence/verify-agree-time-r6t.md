# Agreement check, round 6 — time and change (determinism, V06, V01, V02, V03, V04, V05, V07) after assemble-r6

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-agree-time-r6t; covered by the whole-design retrovalidation (J84).

> **PROGRESS** — [x] brief read whole · [x] resume check (fresh start) · [x] adjudication-r6 read (R6-01 – R6-11, Part H
> for every member, Part P) · [x] live files = assemble-r6's "after" sha256 · [x] round-5 findings VAT5-r5-01 and
> VAT5-r5-02 re-checked with their END lines · [x] round-6 blocks in scope re-read (diff b3f83a0d → live) · [x] the
> members' and peers' HAND-OFFS checked at their destinations · [x] peers' round-6 results read (11 seats landed while I
> worked) · [x] issues written · [x] result saved · [x] LANDED

## Scope and method

**Members:** determinism (base §5–§7), V06, V01, V02, V03, V04, V05 and V07. The base's §2.7, §3.2 (9), §4.11 and §13
are read where they carry a time-and-change subject the members share; V08 is read for the ends it carries. Every live
file equals assemble-r6's sha256 "after" column: base `f39f1c30…`, V01 `bd9b4ceb…`, V02 `c7fbb705…`, V03 `894955c2…`,
V04 `fefd0cd4…`, V05 `a0dd3b65…`, V06 `9653164e…`, V07 `46dfede9…`, V08 `83382cac…`. The commits after assemble-r6 touch
only logs and reports.

**Round-5 findings.** Each is read against adjudication-r6's Part H and the ruling it names, END lines included:
- VAT5-r5-01 (V06): "FIX per R6-03, amended" — V06 §3.11.1, §3.21's hazards row, T-V6-27, §4.4's `forkAt`, with R6-03's
  whole life (§4.11 *The clock* (1) and (4), §2.9's `EpochRecord`, §7.1's `dossierFacts`, §7.4's dossier row, §7.7's
  `DossierBinding`, T76-1 and its §13.8 row, J-A67.45 and its rationale entry; V08 §2.3, W20, §2.7, §3.2, §3.6 (2)–(6),
  §3.8, §3.17, §4.6, T-V8-49 (g), T-V8-11; V01 §3.16 (2), §3.18, J-V1.104, T-V1-60 (d); V06 §3.22 (1)).
- VAT5-r5-02 (model): "FIX" as written — R6-02's (M9) and (M10), with its END lines (P10) (§4.11's frame batches), V06
  §3.19's lead and (S2) (T110-2's frame clause), and the mechanism VV34-r5-02 closes at V04 (§3.10, T-V4-63).

**Round-6 blocks.** The line diff of every member against the pre-round commit `b3f83a0d`:
- base 76 hunks; V01 17, V02 1, V03 4, V04 21, V05 5, V06 46, V07 12; read for the ends they carry: V08 20.

Every hunk on time and change was read with the whole subsection it lands in and its counterpart in the other units:
- **the late calamity left uncarried (R6-03):** the sites above;
- **walls and raised ways over time (R6-02):** §2.7's support step (3), (6), (7), the crossing table's outcomes, columns
  and every row (checked cell by cell against the ruling: identical once the "(amended, PRB6-nn)" markers are stripped),
  the way-and-channel table, `RaisedFoot`, the span rule; §4.11's frame batches; §5.3's and §5.4's rows; §7.1's lock
  and bend rows; §7.3's S7 row; §7.4's rows; T110-2, T114-3, the runs sentence, §13.8's T110 and T114 rows, the take-over
  row; V06 W64, W65, W68, W79, `EpochScope.raised`, §2.8, §2.10, §2.12, §3.2's reconcile, §3.6 (4), §3.7.1, §3.7.2,
  §3.7.4 (4), §3.7.6 (5), §3.7.7, §3.11's stone weight, §3.17 (9), §3.19 (lead, (5), §3.19.1, §3.19.2), §3.21's rows,
  §7's T110-2 and T114 rows, T-V6-11, T-V6-47, T-V6-64, T-V6-73, H-AQUA, §8's E1–E8 cells, J-V6.91, J-V6.114, J-V6.140;
  V04 §0, §1.2, §1b.2, §1b.3, §2.6, §3.5.0, §3.5.4 (d), §3.10, §4.1–§4.4, §4.6, T-V4-62, T-V4-63; V05 §3.16 (4)–(5),
  T-V5-14, §8's P6; V07 §3.5a (1)–(4), §3.12a (4) (d), §3.17's row, T-V7-23, T-V7-48; V01 §3.4.2, §3.6 (5), §3.17.3,
  §3.17.4;
- **the plan's damage and its schedules (R6-07, R6-09):** V02 §8.6; V03 §3.13's row, §5.2, §5.6 (2), T-V3-39, §8's P4
  and P5 cells; V04 UE33, §5.6, T-V4-82; V06 §8's E2 row (`crisisLookYields`, the decay level);
- **the crisis line at the village (R6-05):** V07 W74, §4.5, T-V7-69.

**Hand-offs.** The HAND-OFFS of all seventeen repair-r6 files were read and each time-and-change end checked at its
destination:
- **landed:** repair-r6-V06's three (§13.2's take-over row now names T110-2's (1), (2), (4), (5), (7) and (8); V04's
  (V4-1), (V4-2) and (V4-6) as V06 §3.2, W64, W65 and T-V6-64 cite them; the model's and pipeline's homes under the cited
  names); repair-r6-scope's first (V06 §7's lead now names the same clauses); repair-r6-pipeline's (the rationale's
  J-A67.45 entry reads "the greatest week the folded events carry"); repair-r6-V08's (no unit quotes the variants);
- **open:** repair-r6-V02's observation on T-V3-40's hand-over clause, routed by no adjudication (VAT6-r6-04 below);
  repair-r6-V04's locked arch vault (raised by peers: VAL-R6-01, VEW-r6-02); repair-r6-determinism's and -model's minor
  citation ends (raised by peers: VDC6-02, VPC-r6-05).

**Peers.** Eleven round-6 verifiers landed before or while this seat worked: agree-layers, agree-tools, determinism,
edges-life, edges-world, rendering, model, pipeline, scope, vol-V05-V06 and vol-V09-V10. I read every issue they raised.
The working files of agree-fabric, agree-proof and vol-V11-V12 held no issue when I read them. Where a peer's issue
covers a defect in this lane I list it under *Confirmed peer findings* and do not raise it again.

## Outcome

**4 issues: 0 blocker, 2 major, 2 minor.** Owners: V04, model (with scope and V06 ends), V06, V03.

**Round-5 findings — both FIXED** (table below).

**New this round:**
- **VAT6-r6-01 (V04, major):** T-V4-63's bar, kept from round 4, says every arch vault's key names a *standing* `vault`
  span. Round 6 added two clauses to the same test that leave a `collapsed` arch vault in a `ruined` span (the breached
  `vault` span before the circuit, W1·C6; the frame growth's extension carrying a `ruined` end span). The bar fails on a
  correct build of its own fixtures.
- **VAT6-r6-02 (model, major):** a frame growth's extension "keeps the deck's course" and "is no course laid" (C12, (7)),
  and the way is held ((6)), yet (7) runs (3) and (4), whose clear-span and pier bounds "drop a generated course" or
  bend a declared one "by its dry run". An extension meeting a river or valley the grown ring reveals has no defined
  outcome. A literal drop or wait leaves the ring-end foot's two ends on different rings.
- **VAT6-r6-03 (V06, minor):** T-V6-11's and T-V6-47's new arch-vault clauses run at E3. An epoch's arch-vault
  reconcile is built by E8 (after V04's U5), and no vault exists before M6-U.
- **VAT6-r6-04 (V03, minor):** T-V3-40 (b)'s hand-over clause (`crisisLookYields`) still runs from P4 with no exit after
  V06's E2. R6-09 conformed the same clause at V02 only (repair-r6-V02's open hand-off).

**What agrees** after round 6:
- **The late calamity's whole life:** §4.11 *The clock* (4) (base l. 8531) is R6-03's Decision text word for word,
  amendments included, and (1) defines the current week as the greatest folded week. Every reader of the held list is
  gone: `lateCalamities` occurs nowhere in the set. The other sites agree with it:
  - §7.1, §7.4 and §7.7 (determinism);
  - V08 §2.3, W20, §2.7 (one `quarantined` row with its migration), §3.2's `unchanged`, §3.6 (3)–(4) and (6), §3.8's
    re-key, §3.17's row, §4.6's three variants and the `standing` class;
  - T-V8-49 (g) and T-V8-11; T76-1 and §13.8's row (the burial-need clause from E8).
- **The strike:** V06 §3.11.1 strikes in place, a target an earlier F5 record or an earlier calamity ruined is struck by
  no op, and the hazard order is week, then row, then events order. §3.21's row and T-V6-27 (both copies) agree with
  §3.11.1. V06 §3.22 (1) and §4.4's fork sentence agree with (4).
- **Nothing is lost:** the next absorb finds an uncarried calamity because the port diffs carried facts against the
  newest dossier (V08 §3.2). A dossier that advances past `W₀` changes its own ticks, so its hash changes and it is
  offered. A retracted calamity's `lateDeferred` note is cleared by the next run that does not write it (V08 §3.6 (4)'s
  `notesCleared`).
- **The frame growth's carried end span:** (M9) and (M10) are written as ruled (base l. 2712–2724, l. 2317), and (P10)
  is at §4.11 (l. 8566). V06 §3.19's lead (l. 2738), V04 §3.10 (l. 2291) and T110-2's frame clause with (S2)
  (l. 18527–18534) cite it. V04 §3.5.4 (d) (1)–(2) lays a chamber in a carried `ruined` `vault` span and reads it
  `collapsed`, as T-V4-63's clause says. V06 §3.19.1 (3) and §3.19.2 (3)–(5) agree with the carried state: a `cleared`
  span releases the way, a `ruined` one is repaired by (5), and new supports are dismantled on salvage like any other.
- **Walls and raised ways over epochs:**
  - W4 and W5 (decline, decay) are an *unchanged meeting* throughout. V06 §3.7.2 (2)–(3) and §3.7.7 (2) filter nothing
    for a deck, and T114-3 and T-V6-73 run the run beneath the aqueduct decaying as any.
  - W12 (landfall): V05 §3.16 (4)–(5), V06 §3.19.2 (4) and T-V5-14 agree with T114-3's landfall clause. Each record is
    repaired by its own op, and a locked aqueduct is kept as content.
  - V06 §3.19 (5)'s founding of a road deck across a standing curtain waits (`raised.waited`, §2.10, §3.17 (9), §3.21's
    row, T-V6-73).
  - V04's epoch reconcile and `EpochScope.raised` read walls laid, moved or removed (W64, W65, §3.2, V04 §1b.2, §2.6,
    §3.10).
  - V07's village derivations re-lay VS3's palisade *beneath*, and T-V7-48 runs the C9 column's decay, convert, repair,
    delete, Regenerate and frame-growth clauses.
- **The plan's damage at its entry week and under no disaster look:**
  - V03 §3.13's row, §5.2, §5.6 (2) (a)–(b), T-V3-39;
  - V04 §5.6, UE33's E1, T-V4-82 (b);
  - V02 §8.6's restoration and hand-over clauses at the later of M6b and E2 (E2's row builds `crisisLookYields` and
    V06 §3.23's decay level).
- **The crisis line's forms at the village:** V07 W74, §4.5 and T-V7-69 (e) read V09 §4.21.12 (4)'s forms.

## Round-5 findings re-checked

| id | ruling | verdict | where it is fixed |
|---|---|---|---|
| VAT5-r5-01 (V06) | FIX per R6-03, amended (Part H · V06) | **FIXED** | V06 §3.11.1 (l. 2077–2086): Part H's sentence with PRB6-16's same-phase clause; the hazard order with the events order (l. 2091–2092); §3.21's hazards row (l. 3284) with both inputs, outcomes and T-V6-27; T-V6-27 (l. 4150) with the earlier-F5 target and the two late calamities sharing a target; §4.4's `forkAt` (l. 3609–3610). No V08 end (no held case), as Part H rules. R6-03's other ends verified above. |
| VAT5-r5-02 (model) | FIX, as written | **FIXED** | (M9): (7) keeps `ring` and `state` and carries the end span's `state` and held `use` (base l. 2713–2721), with PRB6-07's band sentence (l. 2722–2724); (M10) (l. 2316–2317); END pipeline (P10) (l. 8566); END V06 §3.19's lead (l. 2737–2739); END scope (S2), T110-2's frame clause (l. 18527–18534), with PRB6-07's and PRB6-12's fixtures. VV34-r5-02's mechanism closed at V04 §3.10 (l. 2289–2292) and T-V4-63 — but see VAT6-r6-01 for its bar. |

## Issues

### VAT6-r6-01 — V04 — major — DISAGREE (a bar its own fixtures fail)

**Claim.** Round 6 rewrote T-V4-63 (V04 l. 3156) with R6-02's (V4-8) and VV34-r5-02. Two of its new clauses leave an
arch vault `collapsed` under a fallen span:
- "the circuit's case run again with that `vault` span breached with its chamber first (`ruined`, its arch vault
  `collapsed`) … (§2.7's crossing table, W1·C6)";
- the frame growth's "each new span taking that end span's `state` … a vault laid in a `ruined` or `cleared` one
  `collapsed` (V04 §3.5.4 (d) (2))".

The bar, kept from round 4 (adjudication-r4's "every arch vault's key a standing `vault` span's"), still reads "after
each commit every arch vault's key names a standing span of use `vault`". In the set, a *standing* span is one whose
`state` is absent:
- V06 §3.19.1 (3): "every span standing or ruined";
- V06 §3.19.2 (3): "each standing span … → `breach`";
- V06 §3.2 (l. 1038): "a chamber for each standing `vault` span …, a collapse under a `ruined` or `cleared` span".

V04 §3.5.4 (d) (2)–(3) keeps a `collapsed` vault in a `ruined` or `cleared` span. Only a span gone, set `open` or under a
wall removes it. So after the breach commit, and after the frame growth's commit, the test's own fixtures hold a
`collapsed` vault keyed to a `ruined` span, and the bar fails on a correct build.

Two builds follow. One builder keeps the bar and suppresses those vaults, against (d) (1)–(2) and against the clause's
own "a vault laid in a `ruined` … one `collapsed`". Another reads "standing" as "existing".

**Required change.** T-V4-63's bar "after each commit every arch vault's key names a standing span of use `vault`" →
"after each commit every arch vault's key names a span of the way whose `use` is `vault` and over which no wall stands —
standing, or `ruined` or `cleared` with that vault `collapsed` (V04 §3.5.4 (d) (2))".

### VAT6-r6-02 — model — major — DISAGREE (the frame growth's extension against the support step's bounds)

**Claim.** The texts that meet at a frame growth's extension:
- **(7)** (base l. 2712–2716) runs "(1)–(5) and the span rule … on the extension alone, from the old deck's last
  interior station … to the deck's new end on the new ring, against the obstacles standing then".
- **(3)** (l. 2544–2547): "a merged clear span longer than `raisedWays.structure.maxClearSpanM` … drops a generated
  course (`raised_too_long`, which waits as `raised_too_tall` does, V06 §3.19 (5)) and makes a declared one's dry run
  bend it".
- **(4)** (l. 2552–2554): "a pier higher than `maxPierM[kind]` … drops a generated course (`raised_too_tall`) and makes
  a declared one's dry run bend it".
- **Round 6** wrote that the extension "keeps the deck's course" and "is no course laid": C12 (l. 2674–2676), (7)'s last
  sentence and (M2)'s "excepted: (7)".
- **(6)** holds the way: "nothing laid later … drops it".

The frame growth lays new ground and water in the band between the old and the new margin (S1, §4.11 *The rung at an
epoch*). An extension whose course meets, there, a river wider than `maxClearSpanM` with no support in its water, or a
valley deeper than `maxPierM` (35 m for an aqueduct, V11 §3.24.2), has no outcome:
- **Read literally**, a generated aqueduct is dropped, or "waits". But the foot batch has already moved its ring-end
  foot's ground end onto the new ring (§3.2 (9), l. 3778–3788). A deck that waits leaves the foot's two ends on
  different rings, against §3.10's stored-references row ("both ends resolve at every stage end").
- **A declared way** has no dry run at an epoch to bend it.
- **Another builder** keeps the course and lays the span or the pier past its bound. That fails T110-2's "every clear
  span and pier within its bound".

So two builders build different behaviour. No bar runs the case: T110-2's frame clause, T-V4-63 and T-V5-14 extend over
open ground.

**Required change.** (7), after "against the obstacles standing then," add: "— where the extension's course meets (3)'s
clear-span bound or (4)'s pier bound (a water face or a valley the grown ring reveals), the way, being held ((6)), is
neither dropped nor left waiting: the extension's course is bent, as item 101 R2 bends a declared course, to the nearest
course from that station to the new ring whose piers and clear spans fit, kept across a band (C12), the ring-end foot's
two ends re-placed where that course meets the new rings (§2.7 `RaisedFoot`); with none, it is laid on its course with
each span or pier past its bound reported (V06 §2.10's `raised` section) —".

END lines:
- **under scope:** T110-2's frame clause adds "and, on a variant whose grown ring holds, across the aqueduct's course, a
  river wider than `raisedWays.structure.maxClearSpanM` and, on a second run, a valley deeper than its `maxPierM` — the
  extension bent to the nearest course whose clear spans and piers fit, the aqueduct kept, nothing waiting, both ends
  of its ring-end foot on the new rings".
- **under V06:** §2.10's `raised` section adds `extendedPastBound: number /* frame-growth extensions laid past a
  support-step bound with no fitting course (§2.7's support step (7)) */`.

(If the adjudicator rules the other form instead — the bounds do not apply to an extension, which is no course laid —
(7) says so in those words, and T110-2's bound bar reads "on every course laid".)

### VAT6-r6-03 — V06 — minor — DISAGREE (build-plan dependency: clauses scheduled before their provider)

**Claim.** R6-02 wrote two arch-vault clauses into E3 tests:
- T-V6-11 (l. 4134, (V6-20)): "V04 laying again the arch vault of a `vault` span the old wall stood over";
- T-V6-47's bar (l. 4170, (V6-21)): "0 arch vaults in a `vault` span under a wall".

At an epoch, both are V04's `ArchVaults.reconcile` over `EpochScope.raised`, which V06's `under.extend` runs. V06 §3.2
calls that reconcile "the epoch-side guarantee … that no chamber stands … under a wall and every `vault` span no wall
stands over has its chamber". V06 §8 builds these adapters at E8 ("the `under.*` adapters over V04's functions with the
epoch scope (`raised` and `levelled` included: the arch-vault reconcile …)"), and INDEX §4 puts "E8 after V04's U5".
M6-E starts after M4, and M6-U, which lays the arch vaults, after M5.

V06 §8's E3 cell runs T-V6-11 and T-V6-47 whole at E3; only T-V6-11's sky clause is deferred. Before E8, T-V6-11's
clause cannot run, and T-V6-47's bar holds vacuously. R5-05 (c) and INDEX §5 risk 2 require each such clause to name the
first exit after its provider. This is R6-09's class: nothing built changes. VCS-r6-03 raises the same class for
T110-2's base clauses at §13.8, and VV56-r6-05 the fixture's `vault` spans; neither schedules V06's two clauses.

**Required change.** V06 §8's E3 tests cell, "(T-V6-11's sky clause at the later of E3 and V05's P6, which builds the
landfall)" → "(T-V6-11's sky clause at the later of E3 and V05's P6, which builds the landfall; T-V6-11's and T-V6-47's
arch-vault clauses at E8, which builds the epoch's arch-vault reconcile)". E8's tests cell, "T-V6-33–40, 50, 51, 55, 56,
64, 67–69; T-V6-27's burial-need clause" adds "; T-V6-11's and T-V6-47's arch-vault clauses".

### VAT6-r6-04 — V03 — minor — HANDOFF-OPEN (repair-r6-V02's hand-off, routed by no adjudication)

**Claim.** T-V3-40 (b) (V03 l. 2907) asserts that each building of a returned district draws its look "exactly in the
condition's weeks, and at its own level outside them, after the hand-over (`crisisLookYields`)". It also asserts that
"a `disaster` preview draws its ruin over a building under a rebuild Works (a preview never hands over)". Its timing
cell runs (b) "from P4 once item 122's base parts (M3b) and V01's districts (M5) stand". V03 §8's P4 cell defers only
(b)'s village clause.

V06's E2 builds `crisisLookYields` (V06 §8's E2 row: "the crisis hand-over (item 122 (a), V06 §3.22 …)"). Until E2,
V02 reads X36's stand-in, "nothing repaired, the look standing until its condition no longer stands" (V02 §8.6). R6-09
scheduled V02's twin clause, T-V2-60's hand-over at the later of M6b and E2, but not V03's. repair-r6-V02 handed V03's
off "for the adjudicator to route", and assemble-r6 §2.1 records it unrouted.

Grade: R6-09's class, so minor. Nothing built changes; the clause runs before its provider.

**Required change.** In T-V3-40's timing cell, after "(b)'s village clause at the later of that and V-M3 (V07's
units)," add " (b)'s hand-over clause at the later of that and V06's E2 (V06 §3.22 (3)'s `crisisLookYields`),". In V03
§8's P4 tests cell, "T-V3-40 but (d), its (b)'s village clause at the later of P4 and V-M3" adds ", its (b)'s hand-over
clause at the later of P4 and V06's E2".

## Confirmed peer findings in this lane (not raised again)

- **VV56-r6-02** (model, major): the crossing table's W8 and T-V6-11 re-lay a vault "once the record is dropped", but no
  op drops a cleared enceinte record (V06 §2.8, §3.7.2 (3)). My own reading found the same gap: builders diverge on
  whether the vault returns at `absorbWall`, at the last run's dismantling, or never. Its required change also conforms
  `EpochScope.raised`, W64, V06 §2.8 and V04's epoch bullet. Two more sites name the same event and should take the same
  words: V04 §1b.2's `ArchVaults.reconcile` trigger "an absorbed record dropped" (l. 328) and the arch-vault entity row
  (l. 867).
- **VCS-r6-04** (V06, minor) and **VV56-r6-04** (V06, minor): T-V6-47 takes T110-2 (7) but omits its cells'-own-order
  clauses and its `repairRaised` re-cap clause (W1·C3, W1·C5).
- **VEL6-r6-02** (scope, major), **VM-R6T-02** (scope, major), **VAL-R6-06** (V07, minor) and **VV56-r6-03** (V06,
  minor): cells of rows W3, W5, W6 and W9 name tests that run only C2 (W3: a regeneration under a fallen, cleared or
  breached held raised way).
- **VAL-R6-05** (V06, minor): `EpochScope.raised` was widened to walls, but `Foundations.apply`'s caller still reads the
  old set.
- **VEL6-r6-03** (V08, major): "a condition naming" a late calamity names no field SettlementForge carries.
- **VEW-r6-02** (model, major) and **VAL-R6-01** (model, major): a locked arch vault under a wall laid at an epoch or a
  regeneration (UC18).
- **VEW-r6-04** (V06, major): a founding across a drawn or locked wall.
- **VV56-r6-06** (V06, minor): T-V6-73's "`raised.waited` at each epoch" cannot hold at TOWN epochs.
- **VCS-r6-03** (scope, minor): T110-2's arch-vault clauses run at M3a, before M6-U.

## Considered and not raised

- **The uncarried calamity is found again:** V08 §3.2 offers on a changed dossier hash and diffs carried facts, and a
  week past `W₀` changes the dossier's ticks. A retracted calamity's `lateDeferred` note clears by `notesCleared`.
- **A frame growth of a released way** (a `cleared` end span) lays `cleared` spans and standing supports. Salvage takes
  those supports in time (V06 §3.19.2 (3)), so this is the ruled (M9) behaviour, not a disagreement.
- **The epoch cost field's obstacles:** V06 §3.7.4 (2)'s cost field treats every standing support as impassable, and
  the generation pull treats only an aqueduct's that way. Both lie inside *beneath*'s lawful outcomes (the model seat
  reached the same view).
- **A late change folded at `W₀` + 1 after a standalone event at `W₀` + 3** and V06 §3.15.2's frames for `w` after the
  last epoch. This is pre-round text that no round-6 block touched, so the earlier verdict stands.

## Checks

- Live sha256 equal to assemble-r6's "after" column for every member (above).
- The crossing table's thirteen rows at base l. 2698–2710 equal R6-02's (Part P amended) rows byte for byte once the
  amendment markers are stripped (script in scratch `coherence/`).
- `lateCalamities`, `held late`, `calamity held`, `held in the binding`: 0 hits in the base, the volumes and the rationale.
- doc_checks.py was not run: this seat writes no design text.
