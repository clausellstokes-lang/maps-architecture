# Agreement check — proof and plan, round 6: tests, bars, calibration and the build plan (verify-agree-proof-r6t)

> PENDING FABLE REVIEW — opus seat coherence/verify-agree-proof-r6t (round-6 agreement check after assemble-r6), standing in for the Fable seat.

PROGRESS
- P1 inputs: brief whole (ROUND-6 NOTES, NEW OWNER RULES, ORCHESTRATION NOTES); round-5 report and result (5 issues); adjudication-r6 (R6-01 – R6-11 with R6-02's tables and Ends (S1)–(S4), Part H every unit, Part P); assemble-r6 (live = its after-hashes, re-hashed: base `f39f1c30…`, INDEX `90e2844a…` unchanged, V01 `bd9b4ceb…` … V12 `006b8ef1…`); pre = HEAD b3f83a0d's text (base `2d84eac2…`) — done
- P2 round-5 VAP-r5-01 – VAP-r5-05 re-checked on the live text, END lines included — done (all 5 FIXED as Part H rules)
- P3 round-6 repair-touched subsections in scope (tests, fixtures, milestone cells, §13, §16, INDEX, every §7/§8 hunk) — done (73 hunks word-diffed, each test read whole)
- P4 R6-02 crossing-table cells' tests (13 × 13, scratch agp6/cells.tsv); R6-03 held-calamity clauses; censuses (test ids, take-over, pins, prices, phone); peers' r6t reports read for overlaps — done
- P5 report and result — done

**Result: 4 issues — 0 blocker, 2 major, 2 minor** (DISAGREE 3, MATRIX-GAP 1). Owners: scope 3, V06 1. Every round-5
finding of this seat is closed on the live text, each END line's second end included: VAP-r5-01's drawn-week timing stands
at T120-6, §13.8 and V12's three statements (R6-04); VAP-r5-02's famine at severity 0.5 in V08 §7.1; VAP-r5-03's H-AQUA
variant at V12 §2.13 and V06's E1 line; VAP-r5-04's two village mutations in T-V7-69; VAP-r5-05's `'derived'` manifest row.
Return: `docs/validation/coherence/results/coherence_verify-agree-proof-r6t.json`. Design files untouched.

No issue is a blocker. Both majors are test bars. In the first, five cells of §2.7's crossing table state "no
`refuse.locked`" or a held raised way's meeting "as C2" for hand and conversion ops. Each names a T110-2 or T114-3 clause
that never locks the raised way for that op. In the second, T-V6-64 bars any arch vault under a fallen span, which V04
§3.5.4 (d) (2), V06 §3.2 and §4.11's `DeclineOp` all keep as a `collapsed` chamber. This is the defect VAT6-r6-01 found in
T-V4-63, at V06's bar. The minors: the crossing table's other "as C2" cells of the hand and conversion rows name clauses
that run only the standing raised way (the class the round's V06 and V07 seats raised for their rows), and the derived
fixture rows of §13.2's manifest have no stated reach.

## Scope and method

**Members.** scope (§0–§1, §13–§17, INDEX.md) and V01–V12, on the proof-and-plan subjects. These are:
- every test id and bar (T⟨item⟩-n, T-Vn-m, the take-over of base bars);
- calibration (§13.2's convention, §13.8, §12.10's register rows that name V12 statistics, V12's pins, metrics, register
  and schedules);
- the combined build plan (§16) and INDEX.md, checked against every volume's tests (§7) and build plan (§8).
The fabric, layers, time, host, tools, edges and unit seats hold the other subjects. Their r6t reports were read (below).

**Checks run** (scripts in this seat's scratch folder `agp6/`; pre = HEAD b3f83a0d's text, live = assemble-r6's):
- *Round-5 re-check.* Each round-5 finding was read against the live subsection its required change named. It was also
  read against Part H's disposition (FIX under R6-04, R6-06, R6-11) and each END line's second end.
- *Hunks* (`hunks.py`, `wd.py`). 77 base hunks and 199 volume hunks were listed. Every hunk in scope was read whole in its
  subsection by word diff: §13.2, §13.8, §14's port comment, the T-ER rows, every volume's §7 and §8, V12 whole, V04's
  UE33 and V06's H-AQUA. That is 73 hunks. Every test whose row changed was read whole.
- *The crossing table's cells* (round-6 note (6) (b)). All 13 × 13 cells and the way-and-channel table's five rows were
  extracted with the test each names (`cells.tsv`). Each named test was read for the case. The results are in "R6-02 in
  the tests" below.
- *Test-id census on the live set* (`census.py`). There are 734 volume tests, every family gap-free and unchanged from
  round 5: V01 1–60, V02 1–60, V03 1–40, V04 1–82, V05 1–36, V06 1–76, V07 1–69, V08 1–63, V09 1–87, V10 1–53, V11 0–48,
  V12 1–59. 341 base bars are defined in §13. There are **0 unresolved references** to a volume test or a base bar in the
  base, INDEX, the rationale or the volumes. Every clause reference new this round resolves: T110-2 (1)–(8), T-V2-59 (c),
  T-V3-40 (e), T-V8-49 (g).
- *The take-over's both ends.* §13.2's take-over row (l. 18874), the runs sentence (l. 18627–18629), V06 §7's lead
  (l. 4039–4044), its T110-2 and T114 rows (l. 4113–4117), T-V6-47, T-V6-73, T-V5-14 and T-V12-52 were all compared. They
  agree except T-V6-47's coverage of T110-2 (7), which is VCS-r6-04 and VV56-r6-04 (see "Overlaps").
- *Pins.* V12 §2.13's `item110.*` and `item123.damage` rows were compared with their registering clauses (V06's E1 line,
  T-V6-65; T123-7, T-V2-59 (d), T-V3-39 (g), T-V4-82 (g)). The never-decayed scope reads "under no disaster look" at every
  restatement R6-07 names.
- *Schedules.* §13.8's changed rows (T76-1, T110, T114, T120-6) were checked against the taking tests' cells and each
  volume's §8. So was every timing cell a round-6 hunk touched: T-V1-60 (d) at SF3, T-V2-59/60 at E2, T-V3-39 (e) and (h)
  at P5, T-V5-14's VILLAGE variant at V-M3, T-V6-11's sky clause at P6, T-V6-27's burial need at E8, T-V7-69's mutations
  at M-SF, T-V8-11 at SF4, T-V9-65 at M3b, T-V9-85 on T-V3-40's fixture, T-V10-52's famine at M-SF, and T-V12-52 at E6.
- *Prices.* No price or range cell of any §8, of §16, of INDEX or of the rationale changed this round. Every `x–y` cell of
  each §8 was compared pre against live; V02's one new pair is "weeks 10–17", not a price. §16 and INDEX carry no hunk.
- *Retired forms* (R6-02 (b) (ii), R6-03 (c)). "crossing station" appears once in the set: T-V6-47's bar "0 crossing
  stations", the ruling's own (V6-21) words. "raised gate", "held stretch", `bend.wall.held` and `lateCalamities` appear
  0 times. "wall opening" appears three times, none about a raised way (V03's openings, V04's VTT walls). "held in the
  binding" appears once (§4.11 (4): "nothing is held in the binding").
- *Phone census* (item 126 (a2)): 36 mentions before and after, unchanged.

## Round-5 findings — status on the live text

| id | owner | grade (Part H) | status | where |
|---|---|---|---|---|
| VAP-r5-01 | scope | major | FIXED (R6-04) | T120-6 (base l. 18771–18775): "…and at a drawn week whose frame is not the head the chips re-evaluated within ≈ 100 ms of that frame being drawn, the frame never waiting for them (§12.5; that clause from the later of M5 and V06's E6, V06 §3.15.2's frames)". §13.8's T120-6 row (l. 19485): "M5 (its drawn-week clause at the later of M5 and V06's E6)". END at V12: the catalogue row (l. 1173), §3.15.10's T120-6 bullet (l. 2642–2644), T-V12-52's planted re-evaluation and its cell (l. 3176) and §8.2's M5 (l. 3222), each in VAP-r5-01's words. R12-35 (l. 17582) and §12.5 agree with the three |
| VAP-r5-02 | V08 | minor | FIXED (R6-06) | V08 §7.1 (l. 3248–3249): "a famine at severity 0.5 (its look baring part of the arable faces and leaving the rest sown, V09's T-V9-85 and V10's T-V10-52)". T-V9-85 (V09 l. 4443) and T-V10-52 (V10 l. 3167, "on V08 §7.1's famine fixture (T-V9-85's, a famine at severity 0.5)") read the same fixture, as R6-06 (c) rules |
| VAP-r5-03 | V12 | minor | FIXED (R6-11) | V12 §2.13 (l. 923): "H-100, H-AQUA without its two raised-way edits (the CITY viaduct row's `editTable` and the declared elevated road), H-TERRACE, H-DECK (V06, T-V6-65)". END at V06 §7's E1 line (l. 4275): "(H-100, H-AQUA without its two raised-way edits, H-TERRACE, H-DECK; T-V6-65)". Both edits still stand in H-AQUA as rewritten this round (V06 l. 4065–4071) |
| VAP-r5-04 | V07 | minor | FIXED (R6-11) | T-V7-69's fixture list (V07 l. 3704) carries both mutations as written: more named ends than k, and a severity-1 fire on an end no other end neighbours, the harness asserting its isolation. V07 §7's frozen small-dossier fixtures (l. 3624) are the source |
| VAP-r5-05 | scope | minor | FIXED (R6-11) | §13.2 (l. 18364–18371): "one per derived fixture a volume names — a run-time, test-side mutation of one file, never written as a file (…)"; `kind` adds `'derived'`; `derivedFrom?` as written. Its required fields' meaning for a derived row is VCS-r6-05. Its reach is VAP-r6-03 (new) |

## Agreement confirmed (no issue)

- **R6-03 in the tests.** The late calamity's whole life reads the same at T76-1 (l. 18289–18304), its §13.8 row
  (l. 19452), T-V8-49 (g) (V08 l. 3316), T-V8-11 (l. 3278) and T-V6-27 (V06 l. 4150). T76-1 is R6-03's scope text word for
  word, its burial-need clause at M6-E's E8. In T-V8-49 (g) the second absorb carries "none of the calamity, its targets'
  records or the condition", is noted `lateDeferred`, and the next absorb past `W₀` carries the calamity late. T-V8-49 (g)
  also covers the clock turned back and the current week never falling back. T-V8-11's uncarried calamity is carried after
  the migration under the new line's key, at SF4, which M-SF puts after M6-E (V08 §8.1). T-V6-27's two copies
  (PRB6-16's shared target) are dossier-bound and wait for V08's carriage (V06 §8 (5)); the burial-need clause waits for
  E8 (V06 §8's E8 cell). No held-calamity clause stands in any test.
- **R6-02's (S1)–(S4) at the home.** T110-2 (l. 18520–18629) is (S1) and (S2) as amended. The runs sentence, the take-over
  row and §13.8's T110 row are (S4) as amended (PRB6-06): (1)'s and (2)'s foundings on volume 6's engine (T-V6-73), and
  (4), (5), (7) and (8) on it (T-V6-47). §13.8's T114 row drops the regrowth clause. T114-3 (l. 18666–18672) is (S3).
  V06 §7's new T110-2 row "its founding clauses (1) and (2) at an epoch | T-V6-73" agrees. So does T-V6-73's
  "takes … T110-2 (1)'s founding across a decayed ring and (2)'s founded viaduct across a standing ring". So does V12
  §3.15.4 ("T114-3's crossing clause on H-AQUA").
- **The way-and-channel table's tests.** Each row's named tests hold its case. Row (a): T110-2 (3)'s intervallum and (5)'s
  S5b road, S5c street and quay, and T-V7-48. Row (b): T110-2 (4)'s gate case, (5)'s hand roads, and T-V9-52's new
  clause, both with `bend.raised.underSpan`. Row (c): T110-2 (8) and T-V6-47's two `wallToWay` runs. Row (d): T110-2 (2)'s
  spawned primary, `N_k` gates on ground part 0. Row (e): T110-2 (1)'s moat water, (3)'s channel and `moat: 'all'`, and
  (5)'s two carves. T-V9-52 now carries VDC5-02's two carves in the same words.
- **The crossing table's cells that do hold their case.** W1·C1 and C11 are held by T110-2 (1), (2) and T-V6-73. W1·C2
  by (3), T-V6-47 and T-V7-48. W1·C3–C6 and C10 by (7) and T-V6-47, and W1·C6 also by T-V4-63's breached-first rerun.
  W1·C7 by T110-3, W1·C8 by (4) and (6), W1·C9 by T-V7-48, and W1·C12 by the frame clause. W2·C2–C6 are held by (4),
  T-V9-52 and T-V4-63; W2·C8 by (4) run locked and pinned; W2·C12 by the frame clause run by hand. Rows W1–W13 in the C9
  column are held by T-V7-48's clauses, each by name. Row W12's states are held by T-V5-14's new passage. That passage
  runs each state on its own run of the landfall fixture, with the locked aqueduct kept by V05 §3.16 (2)'s covered set.
  W12·C8's "as C2" agrees with it, since a locked part is never covered.
- **R6-04, R6-05, R6-06, R6-07, R6-10 and R6-11 at their tests.** T120-6 and V12 agree (above). T-V9-85 runs the unnamed
  forms on a test-side copy of V08 §7.1's fixture, and the famine's two fields. T-V9-86's card follows a scrubbed week.
  T-V9-65's view-bound card is at M3b. T-V10-52 has its building, preview and famine-field clauses at M-SF and M5.
  T-V10-50 (33) carries both `building` and `field`. T-V7-69 (e) names the forms "in the form V09 §4.21.12 (4) chooses".
  T-V3-39 (f)–(g), T-V4-82 (b) and (g), UE33's E1, T123-7 and V12 §2.13, §3.7 and §3.15.13 carry "under no disaster
  look". T-V1-56 runs the `pins` and `trees` group switches. T-V1-59 (f) carries the merged fourth district, and T-V8-61
  (a) the `city-1` and probe-town records. T-V12-57's second planted case is rewritten to the drawn E kept, on T124-9's
  year-position fixture, whose "and back" change carries a live spell into a week with no live kind (l. 18845–18849).
  V09's `bend.raised.around` channel line is present.
- **R6-09's schedules.** V02 §8.6 runs T-V2-59 (c)'s reoccupied house and T-V2-60's hand-over clauses at the later of M6b
  and V06's E2. Each clause it cites exists ((a)'s patched rings, (c)'s reverse order, T-V2-60 (a) weeks 10–17, (d) from
  week 18, (g)'s step 17 → 18). V03 §8's P4 and P5 cells and T-V3-39's timing cell agree on "(e) and (h)'s exports from
  P5". V06's E3 cell names T-V6-11's sky clause at the later of E3 and V05's P6. Its E8 cell names T-V6-27's burial need.
- **§16 and INDEX.** Neither changed this round. No round-6 hunk in any §8 moves a milestone, a dependency or a price.
  INDEX names no crossing station, raised gate, late calamity, H-AQUA, T110, T114 or T120 detail that could disagree.
- **T-V7-23's frame citation.** The written text cites "the base's `Frame.marginShare`, §3.2 (9)", where Part H's END line
  read "§3.2 (1)". (9) is the frame law that spans the arena over the frame plus `marginShare`; (1) is the integer
  world. The seat's citation is the correct home. Nothing is raised.

## R6-02 in the tests (round-6 note (6) (b))

- **(i) One outcome and a test that runs it.** Every cell gives one outcome; W1·C1 and C11 give one per raised-way kind,
  as the column says. Every test a cell names exists. The cells whose named test does not hold their case are:
  - **raised by peers:** W3·C3–C6 and C10–C13, W7·C2's vault, W11·C2's vault (VM-R6T-02, VEL6-r6-02, VM-R6T-03); W5, W6
    and W8 at C3–C13 (VV56-r6-03); W9 at C3–C13 (VAL-R6-06);
  - **raised here:** the C8 cells of the hand and conversion rows W4, W7, W10, W11 and W13 (VAP-r6-01, major), and those
    rows' other states, C3–C6, C10, C12 and C13, with W10·C2's new-stretch clause (VAP-r6-02, minor).
- **(ii) No restatement, no station.** No test, fixture list or milestone cell keeps a crossing station, raised gate, wall
  opening or held stretch. T-V6-47's "0 crossing stations" is the ruling's own bar. Each test cites the tables by name;
  none restates a cell.
- **(iii) Every citation exists.** The citations in the tests all resolve: W1·C6 (T-V4-63), W1·C12 and W2·C12 (T110-2),
  row W12 (T-V5-14), row c (T-V7-48), the four outcomes, and "§2.7's crossing and way-and-channel tables" (T-V9-52,
  T110-2). So do the clause names the cells cite in T-V7-48 (its Regenerate, decay, hand `breach` and `dismantle`,
  `gateToJunction`, `wallToWay`, `absorbWall`, `repairWall`, `delete` and frame-growth clauses).

## Overlaps with the r6t verifiers (read; not raised again)

- **VAT6-r6-01** (verify-agree-time, V04, major): T-V4-63's "every arch vault's key names a standing span" fails its own
  breached-first and frame-growth cases. I concur. VAP-r6-04 is the same defect at V06's T-V6-64. One wording closes both.
- **VCS-r6-04** (verify-scope) and **VV56-r6-04** (verify-vol-V05-V06), V06, minor: T-V6-47 takes T110-2 (7) but leaves
  out its `repairRaised` re-cap and its cells'-own-order clauses (W1·C3, C5, C10), and its scripted dismantle leaves a span
  standing beside a cleared support. Seen here from the take-over's end. I concur with the grade: R6-01 grades a volume
  list that omits a case its own taken clause names as minor.
- **VM-R6T-02** (verify-model) and **VEL6-r6-02** (verify-edges-life), scope, major: W3's regeneration at C3–C6, C10–C13;
  W7·C2's re-laid vault. **VM-R6T-03** (model, minor): W11·C2's vault names T110-2 (4), not T-V4-63.
- **VV56-r6-03** (V06, minor): rows W5, W6, W8 at C3–C13. **VAL-R6-06** (V07, minor): row W9 at C3–C13. VAP-r6-02 carries
  the same class for the rows these leave: W4, W7, W10, W11 and W13.
- **VCS-r6-03** (scope) and **VAT6-r6-03** (V06), minor: the epoch arch-vault clauses of T110-2 and of T-V6-11 and T-V6-47
  are scheduled before E8, which builds the epoch reconcile.
- **VCS-r6-05** (scope, minor): what a `'derived'` manifest row's required fields hold. VAP-r6-03 is its reach and can be
  written in the same block.
- **VAL-R6-02** (verify-agree-layers, V07, major): whether a way may cross a fallen span's strip (V07 says free; the base
  gives no rule). A way crossing a raised way's fallen part is run by no bar. Once that ruling is made, T110-2 (5)'s hand
  road and S4 route should run it. This seat raises no separate issue, since the outcome is that ruling's to state.

## Matrix gaps found (shared subjects the matrix holds no row for)

- The lock at the crossing table's hand and conversion rows (§7.1's lock row; W4, W7, W10, W11 and W13 in C8; T110-2 (4),
  (8), T114-3): **no bar locks the raised way for these ops** (VAP-r6-01).
- The arch vault under a fallen span (V04 §3.5.4 (d) (2); V06 §3.2; §4.11's `DeclineOp`; T-V4-62, T-V4-63, T-V6-64):
  **T-V6-64 bars it** (VAP-r6-04; T-V4-63 is VAT6-r6-01).
- The derived fixtures' reach (§13.2's manifest; V08 §7.1's run-time mutations; the mutations V07, V08, V09 and V10 tests
  make): **which take a row is not stated** (VAP-r6-03).

## Issues

| id | sev | kind | owner | subject |
|---|---|---|---|---|
| VAP-r6-01 | major | DISAGREE | scope | the crossing table's C8 cells of W4, W7, W10, W11 and W13 name T114-3 and T110-2 (4), (8), which never lock the raised way for those ops |
| VAP-r6-02 | minor | DISAGREE | scope | the other states (C3–C6, C10, C12, C13) of rows W4, W7, W10, W11 and W13, and W10·C2's new-stretch clause, name T114-3 and T110-2 (4), (8), which run only the standing raised way |
| VAP-r6-03 | minor | MATRIX-GAP | scope | §13.2's "one per derived fixture a volume names" against V08 §7.1's unregistered run-time mutations |
| VAP-r6-04 | major | DISAGREE | V06 | T-V6-64 bars an arch vault under a fallen span; V04 §3.5.4 (d) (2), V06 §3.2 and §4.11's `DeclineOp` keep it `collapsed` |

### VAP-r6-01 — DISAGREE, major, owner scope

**Claim.** §2.7's crossing table states the held raised way's meeting (column C8: "held (locked, pinned or declared) — as
C2, a lock or pin never refusing work that passes beneath (§7.1's lock row)") for every wall event. Each cell names the
test that runs it. In the hand and conversion rows, the named test never locks the raised way for that op:

| cell (base l.) | outcome | test named | what the test runs |
|---|---|---|---|
| W4·C8 (l. 2701) | *unchanged meeting* | T114-3 | the neglected ring's decay beneath a standing aqueduct (l. 18667–18669), unlocked |
| W7·C8 (l. 2704) | "as C2, no `refuse.locked`" | T110-2 (8) | `wallToWay` of (3)'s ring under an unlocked viaduct (l. 18615–18618); T-V6-47, which takes (8), unlocked too |
| W10·C8 (l. 2707) | as C2 | T114-3 | no `repairWall` beneath a locked raised way; its landfall clause repairs under an unlocked one |
| W11·C8 (l. 2708) | as C2 | T110-2 (4) | "a hand `delete` of a run beneath a standing viaduct" (l. 18574–18575), unlocked |
| W13·C8 (l. 2710) | "as C2, no `refuse.locked`" | T110-2 (4) | "a hand `placeGate` inside a viaduct's under-deck strip" (l. 18581–18582), unlocked |

T110-2 (4) runs its locked and pinned cases for the epoch circuits, the contraction and the two hand `drawWall`s only.
It reads: "each run again with the raised way locked and with it pinned: no `refuse.locked`". T110-2 (5) does the same
for hand roads and carves, and T-V9-52 for a wall drawn across a locked viaduct.

The lock check is a refusal path of its own: §7.1's lock row (l. 10631). That row refuses "a map event … crosses, targets
or moves a locked or pinned entity". It exempts "a ground way, a carve or a wall stretch passing beneath a locked or
pinned raised way's deck". §7.1's `bend.wall.raisedCrossing` row (l. 10674) names "a `placeGate` inside its under-deck
strip, locked, pinned or neither". A `convert`'s dry-run re-route (`wallToWay`), a `delete` and a `breach` or `dismantle`
of the run beneath, a `repairWall` and a gate stub are each a different path into that check. A build that applies the
exemption only to drawn ways and wall strokes refuses them under a locked raised way. That build passes every bar.

R6-01's grading: an edge the text defines but no bar runs, so that a wrong build passes every bar, is MAJOR. The cells
also name a test that does not hold their case (round-6 note (6) (b) (i)).

**Required change.**
- §13.2's T110-2 (4):
  - "a hand `delete` of a run beneath a standing viaduct — the viaduct unchanged, no bend, the run back on its undo" →
    "a hand `delete` of a run beneath a standing viaduct — the viaduct unchanged, no bend, the run back on its undo — and
    a hand `convert` `breach` and `dismantle` and a `repairWall` of that run, each run again with the viaduct locked and
    with it pinned: no `refuse.locked`, the viaduct unchanged (§2.7's crossing table, W4·C8, W10·C8, W11·C8)";
  - "a hand `placeGate` inside a viaduct's under-deck strip — moved along the trace clear of it,
    `bend.wall.raisedCrossing`" → "a hand `placeGate` inside a viaduct's under-deck strip — moved along the trace clear
    of it, `bend.wall.raisedCrossing` — and the same with the viaduct locked and with it pinned, no `refuse.locked`
    (W13·C8)".
- §13.2's T110-2 (8), after "no junction with the raised way" add: "; and the same with the viaduct locked and with it
  pinned — no `refuse.locked`, the ring road's re-route as without the lock (W7·C8)".

Model's end, for an END line: the crossing table's W4·C8 and W10·C8, "· T114-3" → "· T110-2 (4)".

V06's end, for an END line (T-V6-47 takes (8)): T-V6-47, after "no junction with a raised way, the raised ways
unchanged" add "; each `wallToWay` run again with the raised ways locked and with them pinned, no `refuse.locked`".

### VAP-r6-02 — DISAGREE, minor, owner scope

**Claim.** In the crossing table's hand and conversion rows that this seat's tests hold, the other raised-way states
name a clause that runs only C2 (the standing raised way):

- **W4** (`DeclineOp`'s `breach` or `dismantle`, l. 2701), C3–C6, C10, C12 and C13: "*unchanged meeting* · T114-3". T114-3
  runs the epoch decay beneath a standing aqueduct (a `breach` by neglect) and its landfall clause. It runs no `breach` or
  `dismantle` beneath a raised way whose span has fallen, whose support is cleared, whose `vault` span is breached, which
  was repaired or extended, or whose spacing was edited. Even W4·C2's `dismantle` is held only by T-V6-11's `absorbWall`,
  which the cell does not name.
- **W7** (`wallToWay`, l. 2704), C3–C6, C10, C12 and C13: "as C2 · T110-2 (8)". (8) re-routes the ring road under a standing
  viaduct only. The row's outcome reads the crossing rule at that state, and V04 lays again "an arch vault the old wall
  stood over".
- **W10** (`repairWall`, l. 2707), C3–C6, C10, C12 and C13: "as C2 · T114-3". C2's own clause, "the bend's new stretch is a
  wall laid after: W2·C2 · T114-3, T-V6-11", is not held either. T-V6-11's repair on a dismantled stretch has no raised way
  over it. T114-3 repairs only a `breached` run under its landfall.
- **W11** (a hand `delete`, l. 2708) and **W13** (a hand `placeGate`, l. 2710), C3–C6, C10, C12 and C13: "as C2 · T110-2 (4)".
  (4)'s delete and gate cases have a standing viaduct only.

Each outcome is defined, and by construction it is C2's: the op writes its own records and the run's cap is read by
*beneath*. So the class is the one VV56-r6-03 (rows W5, W6, W8) and VAL-R6-06 (row W9) raise, graded minor. V05 met the
rule for row W12 with one T-V5-14 passage, run on each state in turn. These rows have none.

**Required change.**
- §13.2's T110-2 (4), after "its station in the band slid off it, the band whole there" add: "; and the hand rows of
  §2.7's crossing table at the raised way's other states, each on its own run of the hand `drawWall` above across the
  standing aqueduct with a `vault` span in its line, the state made first by scripted `DeclineOp`s or the aqueduct's own op:
  - the span over the run `ruined` and, on a second run, `cleared`;
  - every span over it fallen;
  - a support by the run's band `cleared` and, on a second run, `ruined` with both its spans;
  - its `vault` span over the run breached with its chamber;
  - a fallen span repaired by `repairRaised`;
  - the deck extended by a frame growth;
  - its Arch spacing edited.

  Then come a hand `convert` `breach` and `dismantle` of the run (W4), a `repairWall` of the breached run and of the
  `dismantled` one (W10), a hand `delete` of the run (W11) and a hand `placeGate` inside the under-deck strip (W13). The
  dismantled run's new stretch is drawn on its line and meets the aqueduct as a hand `drawWall` does (W2·C2). Each takes
  its cell's outcome: the op's own records, nothing of the aqueduct written, the run's top read by *beneath* for that
  state, a gate moved clear of the strip, and an arch vault laid again by the delete `collapsed` where its span has
  fallen (V04 §3.5.4 (d) (2))".
- §13.2's T110-2 (8), after "no junction with the raised way" add: "; and the same `wallToWay` with (3)'s viaduct, before
  it, at each other state, each on its own run: a span over the ring `ruined` and, on a second run, `cleared`; every span
  over it fallen; a support by its band `cleared`; its `vault` span over the ring breached; a fallen span repaired by
  `repairRaised`; the deck extended by a frame growth; its Arch spacing edited. In each the ring road follows the
  way-and-channel table (row c) read at that state, and V04's re-laid vault is `collapsed` where its span has fallen
  (§2.7's crossing table, W7·C3–C6, C10, C12, C13)".

Model's end, for an END line:
- the crossing table's W4·C3–C6, C10, C12 and C13, and W10·C3–C6, C10, C12 and C13: "· T114-3" → "· T110-2 (4)";
- W10·C2: "· T114-3, T-V6-11" → "· T114-3, T110-2 (4)";
- W4·C2: "· T114-3" → "· T114-3, T-V6-11".

V06's end, for an END line (T-V6-47 takes (8)): T-V6-47's `wallToWay` clause adds "and on a third run, of its CITY ring
at each other state T110-2 (8) names, the ring road by §2.7's way-and-channel table (row c) read at that state".

### VAP-r6-03 — MATRIX-GAP, minor, owner scope

**Claim.** Round 6 wrote VAP-r5-05's manifest row (§13.2, l. 18364–18365): "Their `manifest.json` holds one row per file,
and one per derived fixture a volume names — a run-time, test-side mutation of one file, never written as a file (V12
§1b's `<dossier>@pop×k` levels; V08 §7.1's crisis, force and required-keys fixtures)".

The volumes name many more run-time mutations than the parenthesis lists, and V08 keeps two classes:
- V08 §7.1 (l. 3242–3245): "Fixtures are §13.2's frozen dossier set … plus test-side mutations of a fixture's digest or JSON
  made by the harness at run time, never written back into a fixture file. V12's item-122 and item-125 fixtures are
  test-side mutations made here (X-V12-5), each in §13.2's frozen manifest". So some mutations are registered and the rest
  are not.
- The tests name further mutations of their own: T-V7-69's two village mutations (written this round), T-V9-85's copy whose
  reconstruction condition the dossier names not (this round), T-V10-52's copy whose plague is unnamed, T-V8-36's
  `city-1` population mutation, and T-V8-61 (a)'s reductions and status mutations.

Read literally, "one per derived fixture a volume names" gives each of these a manifest row. Read with V08 §7.1 and the
parenthesis, only those that V12's specs look up by id take one. V12's spec field `dossier` is "a fixture id of the
frozen manifest" (V12 l. 633). One harness registers every test's mutation and another only V12's ids. Nothing in the
product or in a bar's outcome changes, so the grade is minor.

**Required change.** §13.2's sentence: "and one per derived fixture a volume names — a run-time, test-side mutation of
one file, never written as a file (V12 §1b's `<dossier>@pop×k` levels; V08 §7.1's crisis, force and required-keys
fixtures):" → "and one per derived fixture a spec or bar refers to by its fixture id — a run-time, test-side mutation of
one file, never written as a file (V12 §1b's `<dossier>@pop×k` levels; V08 §7.1's crisis, force and required-keys
fixtures, X-V12-5); a mutation a test makes inside its own run and names only in its own text (V08 §7.1's other test-side
mutations; V07's T-V7-69, V09's T-V9-85 and V10's T-V10-52 copies) takes no row:". This can be written in the same block
as VCS-r6-05's field comments.

### VAP-r6-04 — DISAGREE, major, owner V06

**Claim.** Round 6 rewrote T-V6-64 (V06 l. 4187): "the arch vaults follow their spans at every batch (a chamber under every
standing `vault` span no wall stands over, none under a fallen one or under a wall, §2.7's crossing table)". "None under a
fallen one" is kept from the old text. Every home of the rule keeps the chamber under a fallen span, `collapsed`:
- V04 §3.5.4 (d) (1)–(2) (V04 l. 1695–1712): each `vault` span no wall stands over "has one chamber", and "its closure
  follows its span …: `collapsed` where the span's `state` is `ruined` or `cleared` … or where a bounding support's `state`
  is `ruined` or `cleared`". (3) removes one only where the span no longer exists, is `open`, or has a wall over it.
- V06's own §3.2 (l. 1037–1040): the reconcile brings each raised way to "a chamber for each standing `vault` span no wall
  stands over, a collapse under a `ruined` or `cleared` span".
- §4.11's `DeclineOp` raised member (base l. 8764): "breach and dismantle collapse the span's arch-vault chambers in the same
  batch (V04), and removal deletes them".
- T-V4-62 (V04 l. 3155): "each `collapsed` exactly when V04 §3.5.4 (d) (2) says so (the span's or a bounding support's
  `state` `ruined` or `cleared`…)". T-V4-63's frame clause, written this round: "a vault laid in a `ruined` or `cleared` one
  `collapsed`".

So on H-AQUA, whose lapse breaches spans (T-V6-61: "the vaults collapse with their span in the same batch"), T-V6-64 fails
a correct build at the batch that breaches a `vault` span. A builder who keeps T-V6-64 deletes the chamber when its span
falls, against V04 and §4.11. Two units state two outcomes for one case, so this is MAJOR. VAT6-r6-01 raises the same
reading of "standing" in T-V4-63. The two bars should take one wording.

**Required change.** T-V6-64: "(a chamber under every standing `vault` span no wall stands over, none under a fallen one or
under a wall, §2.7's crossing table)" → "(a chamber under every `vault` span no wall stands over — open under a standing
one, `collapsed` under one whose span or a bounding support is `ruined` or `cleared` (V04 §3.5.4 (d) (2)) — and none under
a wall (§2.7's crossing table) or where the span no longer exists)".
