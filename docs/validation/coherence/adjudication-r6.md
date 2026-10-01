# Adjudication round 6 — binding rulings for repair round 6

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/adjudicate-r6; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/adjudicate-r6`, 2026-10-01)
- P0 brief read whole; inputs located (round6-work 15 files, 73 issues; repair-r5 ×18; verify r5t ×20; adjudication-r2 – r5; canon's dated rulings; file g items 102–126): done
- P1 ruling requests and HAND-OFFS of round 5's repair files: none filed (all eighteen headers say 0); every HAND-OFFS section read: done
- P2 every issue read whole (73); groups of the round-6 notes (4) checked; the method for the raised-way family chosen (no crossing station in either order; a road deck never crosses a standing trace): done; live text at every site: in progress
- P3 the raised-way × wall TABLE (R6-02) and the held late calamity's life (R6-03): done
- P4 the other rulings R6-04 – R6-11, each checked against its owner rules and swept over the four blind spots (live text verified at every site): done
- P5 Part H, all 73 issues (65 FIX, 8 MERGED, 0 INVALID), J141 grades (2 regrades, one group graded once), 36 END lines under 14 units: done
- P6 canon dated ruling appended ("2026-10-01 (adjudication round 6)"); the table attacked and amended (ramps and feet off a standing band; no arch vault in a `vault` span under a wall; the strips' closure where an intervallum or moat stops; non-wall T110-2 fixtures kept); result saved; LANDED: done

## How to read this file

**Who reads what.** Each repair seat of round 6 reads (1) its row of the table of contents, (2) every ruling that row
lists, whole, and (3) its unit's heading in Part H: the disposition of each issue it owns, then its **END lines** — the
exact text this unit writes for a fix another unit owns. A seat's whole work is under its own heading (R3-01, kept by
R4-01, R5-01 and R6-01). V05 and V11 own no issue this round but hold END lines, so they run (R6-01 (4)).

**Dispositions** (Part H, one row per issue of `docs/validation/coherence/work/round6-work/<unit>.json`):

| word | meaning |
|---|---|
| **FIX** | apply the issue's `required_change` as written |
| **FIX per R6-nn** | apply it, but where R6-nn's text differs from the `required_change`, R6-nn governs |
| **FIX, amended** | apply it with the amendment the note states (the note's text governs) |
| **MERGED into X** | the same defect at the same unit as issue X: X's fix (as ruled) closes it; nothing further at this id |
| **INVALID** | closed for good, with its reason; never raised again |

Where one defect spans several units, each unit's text is its own FIX (or an END line under it), "one fix with" the
primary id; MERGED is used only inside one unit.

In a table cell, `\|` stands for the `|` the design text carries (a markdown escape, never written).

**Grades** (J141's SEVERITY STANDARD). The `sev` column is the reporter's; the `grade` column is this adjudicator's,
with a one-line reason where it differs. A regrade never changes the disposition: every issue is FIXED, MERGED or
INVALID this round.

**Precedence used** (principle (3)): the owner's words (file g items 102–126, the owner's instructions, DEFINITION) > an
f item or a J-VI decision > the base's canonical home > a volume's restatement. A ruling made under J122 says so and is
vetoable. adjudication-r2.md – r5.md stay binding except where an entry below supersedes one of their rulings or END
lines by name.

**No ruling id in design text** (R3-02, kept). Every text below that a seat writes into the design names a design home,
never an `R6-nn`, `R5-nn` or verifier id; where a quoted text below cites a ruling, the seat writes the home the ruling
names. The new design names this round introduces are **§2.7's crossing table** (the raised-way × wall table at §2.7's
support step (6) (d)) with its four outcomes *over the band*, *down before the wall*, *beneath* and *unchanged
meeting*, and **§2.7's way-and-channel table** (support step (6) (a)–(b)); a citation writes "(§2.7's crossing table,
*beneath*)" or "(§2.7's crossing table, row …)", never a restatement.

## Summary

* **Ruling requests:** none filed in round 5's eighteen repair files; every open hand-off of their HAND-OFFS sections is
  given an owner and an END line, or the reason none is needed (Part A).
* **11 binding rulings** (R6-01 – R6-11), each checked against the owner rules it touches (quoted in the ruling) and
  swept across the four blind spots — V07's village restatements, V09's panels and V10's clerk, the tests, fixtures and
  milestone cells, and the base's own summary and index rows — with an END line for each site found.
* **The raised-way × wall family is ruled as one table (R6-02, J122, vetoable), by the change of method the round-6 notes
  ask.** The split R5-02 left by build order — a crossing station for a raised way created across a standing wall, a run
  beneath the deck for a wall laid after — is removed: **a raised way and a wall never bear on each other.** There is no
  crossing station, raised gate, wall opening or held stretch. An aqueduct created across a standing wall keeps its supports
  off the band and crosses it on its own arch (*over the band*). A road deck never crosses a wall standing when its course
  is laid: it comes down and crosses on ground part 0 through the gate (*down before the wall*; file f item 363's hand rule,
  now for generated roads). A wall laid after a raised way runs beneath it (*beneath*: the band laid through the supports,
  the run capped at a standing span's soffit, no arch vault in a `vault` span under the wall, no gate or tower in the
  under-deck strip, ungated, gates counted on ground part 0). Every other wall op is an *unchanged meeting*. §2.7's crossing
  table states it once — 11 wall events × 12 raised-way states, each cell an outcome and a test — with a smaller
  way-and-channel table beside it; some forty sites are reduced to citations of the two tables (R6-02's Ends). It closes
  the round's 24 family majors and its five family minors. The behaviour changes are said plainly in
  R6-02, each with its veto option.
* **The late calamity's whole life is ruled once (R6-03).** An absorb in or before the last epoch's week leaves the
  calamity, its targets' records and a condition naming it uncarried. The next absorb past that week carries them by the
  existing late rule, the strike and its targets in one epoch. `DossierBinding.lateCalamities` is removed, and with it every
  open step of the hold (a fork, a migration, an absorb with no epoch, a strike on targets already ruined). The current week
  is the greatest folded week.
* **Other groups ruled once:** Find's drawn-week timing at T120-6 and V12 (R6-04); the crisis line's forms at V07 and V10
  and the why card that follows its view (R6-05); a famine's bare field at V10 and §11.2 (R6-06); the plan's damage
  conditions at every restatement (R6-07); item 125's two base summaries (R6-08); clauses scheduled before their provider
  (R6-09); rendering's readers — public notes in a picture, a look's Show, drawing-group switches, crisis marks out of the
  hit stack, V09's DPR timing (R6-10); fixtures and bars that must hold their case (R6-11).
* **Dispositions of the 73 issues:** 65 FIX (32 as written, 14 under a ruling as written, 19 amended), 8 MERGED into a
  sibling id of the same unit, 0 INVALID. Parts of required changes not written (each in its issue's note): VEW-r5-03's
  `repairWall` at a founding (no deck rests on a wall); VEW-r5-05's raised gate leaving `gates`, VM-R5T-03's plaza
  exception, VDC5-03's and VDC5-04's raised-gate clauses, VEW-r5-04's reproduced raised gate and VM-R5T-02's `dismantled`
  station (no station or raised gate exists); VAL-R5-02's door moved along its face (no arch vault in a `vault` span under a wall);
  VM-R5T-01's and VPC-R5-01's stopped strips (the strips run on); VEW-r5-01's extra spawn (spawned primaries come down);
  VPC-R5-02's kept stretch; VV78-r5-01's, VEL5-r5-03's and VAT5-r5-01's held-list texts (nothing held); VV910-r5-04's
  outcome (the clerk would say less than the card).
* **Grades (J141):** reported 0 blocker, 40 major, 33 minor; graded 0 blocker, 42 major, 31 minor — the Find chips'
  drawn-week group graded once MAJOR (VRC4T-04 and VCS-r5-02 minor → major, merged into VAP-r5-01).
* **END lines:** 36, under 14 unit headings (kernel, V02, V08 and V10 hold none); V05 and V11 own no issue and run for
  theirs.
* **Canon:** one dated ruling appended to `canon.md` (Part I).

## Table of contents by unit

Each row: the issues the unit owns, the END lines it writes for others, and the rulings it applies whole (every seat
reads R6-01, and R3-01 – R3-03, R4-01 and R5-01, which stand); then its heading in Part H.

| unit | issues | END lines | rulings binding it (with R6-01) | its heading |
|---|---|---|---|---|
| scope (base §0–§1, §13–§17, the index, INDEX.md) | 10 | 6 | R6-02, R6-03, R6-04, R6-07, R6-08, R6-11 | Part H · scope |
| model (base §2) | 9 | 2 | R6-02, R6-03, R6-10 | Part H · model |
| kernel (base §3) | 0 | 0 | — | Part H · kernel |
| pipeline (base §4, §10, PART II, PART III) | 9 | 3 | R6-02, R6-03, R6-10 | Part H · pipeline |
| determinism (base §5–§7) | 4 | 3 | R6-02, R6-03, R6-08 | Part H · determinism |
| rendering (base §8, §9, §11, §12) | 5 | 1 | R6-02, R6-06, R6-10 | Part H · rendering |
| V01 | 4 | 2 | R6-02, R6-03, R6-10, R6-11 | Part H · V01 |
| V02 | 1 | 0 | R6-09 | Part H · V02 |
| V03 | 4 | 1 | R6-07, R6-09 | Part H · V03 |
| V04 | 3 | 3 | R6-02, R6-07, R6-10 | Part H · V04 |
| V05 | 0 | 1 | R6-02 | Part H · V05 |
| V06 | 4 | 4 | R6-02, R6-03, R6-09, R6-11 | Part H · V06 |
| V07 | 3 | 1 | R6-02, R6-05, R6-11 | Part H · V07 |
| V08 | 7 | 0 | R6-03, R6-06, R6-11 | Part H · V08 |
| V09 | 4 | 5 | R6-02, R6-05, R6-10, R6-11 | Part H · V09 |
| V10 | 4 | 0 | R6-05, R6-06 | Part H · V10 |
| V11 | 0 | 2 | R6-02, R6-07 | Part H · V11 |
| V12 | 2 | 2 | R6-04, R6-07, R6-11 | Part H · V12 |

Parts: A the ruling requests and the open hand-offs · B the whole round (R6-01) · C the rulings (R6-02 the crossing
table, R6-03 the late calamity, R6-04 – R6-11) · H per-unit dispositions · I canon changes.

## Part A — the ruling requests and the open hand-offs

**Ruling requests.** Round 5's eighteen repair files (`docs/validation/coherence/repair-r5-*.md`) carry **no** `RULING
REQUEST` block: each header says "Ruling requests: 0" (V01, V02, V03, V04, V05, V06, V07, V08, V09, V10, V11, V12,
determinism, kernel, model, pipeline, rendering, scope; V10's two "stated, not a ruling request" notes included). Nothing
to rule here.

**The open hand-offs (round-6 note (3)).** Every `HAND-OFFS` section of the eighteen files was read. Each hand-off below
has an owner and an END line in Part H, or the reason none is needed. A hand-off left open becomes next round's finding.

| from | hand-off | owner · where it closes |
|---|---|---|
| repair-r5-V02 | V03 §3.13's damage-layer row: "every element damaged at 1" with its entry week | V03 — VAF-R5T-04 (FIX), R6-07 |
| repair-r5-V04 | the arch vault's door under a wall laid after its raised way ("if a rule is wanted … it is model's (6) (d)") | model and V04 — R6-02: no arch vault stands in a `vault` span under a wall (VAL-R5-02) |
| repair-r5-V06 | V12 §2.13's `item110.*` pin row against T-V6-65's H-AQUA without its two raised-way edits | V12 — VAP-r5-03 (FIX); V06's E1 line an END under V06 |
| repair-r5-V06 | scope's runs sentence, §13.8's T110 row and T114-3's regrowth clause against T-V6-47 and H-AQUA | scope — R6-02's scope END (S1–S4): T110-2 and T114-3 rewritten, the runs sentence and both §13.8 rows with them |
| repair-r5-V06 | model, pipeline, determinism: "a verifier checks the numbering landed as cited" | no END needed: R6-02 rewrites every one of those citations to §2.7's crossing table |
| repair-r5-V07 | (1) §3.5a (3)–(4), T-V7-48, §3.17 citing R5-02's texts; (2) §5.5 (5) citing §12.5's budget; (3) §4.3 adding V07's trackers | (1) V07 — R6-02's V07 END; (2), (3) landed in round 5 (§12.5 carries the budget, R12-35; §4.3 names V07's trackers): no END needed |
| repair-r5-V08 | scope's frozen manifest naming V08 §7.1's derived crisis fixtures | scope — VAP-r5-05 (FIX) |
| repair-r5-V08 | V12 §3.15.12 and X-V12-5 "may cite" `town-1` | no END needed: V12's text names the place by V08 §7.1's fixture already; citing it by name is not a defect |
| repair-r5-V08 | §7.7's `lateCalamities` comment agrees with V08 §3.6 (4) | superseded: R6-03 removes `DossierBinding.lateCalamities` |
| repair-r5-V09 | §7.1's key for a hand carve's stopped channel; V09's `bend.raised.around` line for it | determinism and V09 — VDC5-01 and VDC5-05 (FIX), R6-02's way-and-channel table |
| repair-r5-V09 | T-V9-85's famine at severity 0.5 named in V08 §7.1 | V08 — VAP-r5-02 (FIX) |
| repair-r5-V09 | V10's explanation of a building under a previewed `disaster` renders `info.crisis.ruinedForPreview` | V10 — VAT-r5-05 and VAH-r5-03 (FIX), R6-05 |
| repair-r5-V09 | model, rendering, V01, V03, V06 homes V09 cites | no END needed: each landed in round 5 as cited (R6-02 rewrites the model's) |
| repair-r5-V11 ↔ V12 | V11 §3.24.2 and §8 pointers to V12's default line | closed in round 5 (V11 received and wrote them): no END needed |
| repair-r5-V12 (received) | `time.findGlow` at a drawn week, waiting on §13.2's T120-6 | scope and V12 — VAP-r5-01 (FIX), R6-04 |
| repair-r5-determinism | V09's channel line; scope's or V09's carve bar | VDC5-05 (V09); VDC5-02 (scope), with VCS-r5-03 merged; V09's T-V9-52 an END under V09 |
| repair-r5-kernel | the `VG` preset's arena margin asserted by no V07 test | V07 — an END line under V07 (T-V7-23 asserts the VG arena's ring): R6-01 (6) |
| repair-r5-model | the quay crossing (an observation) | no END needed: R6-02's way-and-channel table states it |
| repair-r5-pipeline | (1) a hand viaduct on a gate's line across a standing trace; (2) S5b's spawned radial raised across its own boundary | pipeline — R6-02: a road deck never crosses a trace standing when its course is laid (*down before the wall*); (2) is VEW-r5-01 |
| repair-r5-rendering | scope's T120-6; V12's `time.findGlow`; model's (6) (d) reader list adding CityJSON | scope and V12 — VAP-r5-01, R6-04; model — R6-02's home text names CityJSON's wall objects |
| repair-r5-scope | names landed as cited; §13.1's reverse fold; T-V6-73's regrowth clause and H-AQUA | no END needed for the first two (landed); the third superseded by R6-02 (no crossing station, so no regrowth clause) |
| repair-r5-V01, -V03, -V05, -V10 | none | — |

## Part B — the whole round

### R6-01 Both ends, the four blind spots, supersession by name, and grading

**Governs:** every issue of round 6.

**Decision.** (1) R3-01 – R3-03, R4-01 and R5-01 stand: each seat applies every FIX and every END line under its heading in
Part H, in the same round as the owning seat's share; an END line's text is written as given (where it says "in its
words", at build depth with the content stated); no review id in design text; J141's grades. (2) **The sweep is the
seat's too, and it now covers four readers** (round-6 note (5)): (a) **V07's village restatements** of a town rule;
(b) **V09's panels and dialogs and V10's clerk**; (c) **the tests, fixture lists and milestone cells** that must run a
ruled case; (d) **the base's own summary and index restatements** — §7.7's derivation index (item 10 and its rows),
§14's note and record comments, §13.8's milestone rows, §5.3's check rows. A seat applying a ruling greps its own unit
for the term, field, key, string key and section the ruling changes, in prose, tables, edge rows, tests, milestone
cells and index rows alike, and conforms every restatement it finds in the same block, naming each in its report; one it
missed goes to its HAND-OFFS, never open wording. This adjudicator's sweep of all four is the END lines below.
(3) **Cite, never restate** (round-6 note (2) (c)): a site that restated part of a rule a ruling here homes is reduced to
a citation of the home (a table's row, cell or outcome name), with at most the outcome's name. (4) A seat whose unit
owns no issue but holds END lines runs: V05 and V11. (5) **Supersession by name.** This round supersedes: **R5-02**,
except what R6-02 restates as standing (the held raised way of (6)'s lead, (6) (a)–(c), (7) and the `RaisedFoot`
comment; P1, P2, P4, P6, P10, and P7 and VDC4-03's `bend.raised.underSpan` row as R6-02's (P5) and (D8) amend them) — gone are the crossing
station, its held stretch and their every clause (R5-02's (3) palisade and station texts, (3)'s held-stretch clause, (6)
(d) as written, (6)'s closing paragraph, P3, P5's berm, P8, P9's raised gate and wall opening, P11's kept stretch, P12's
wall cell, D1's `bend.wall.held` and `bend.wall.raisedCrossing` rows, D2, D4, R1, S1's station clauses and its V04, V06,
V07, V09 and V11 ends); **R3-25 (d)** (the band under a crossing station held); **R4-09** (already gone); and V06's
**J-V6.91, J-V6.114 and J-V6.140**, amended by R6-02's V06 END. **R5-03**'s hold — its clause "where `W₁` is not after
`W₀` … held in the binding … until the first epoch a later absorb folds" and `DossierBinding.lateCalamities` with every
reader R5-03's Ends gave it — by **R6-03**; R5-03's other clauses stand. (6) **The kernel's hand-off** (repair-r5-kernel:
the `VG` arena's margin, which the base's `Frame` now names, is asserted by no V07 test): principle (11) owes the
mechanism a bar, so V07 writes one END line (Part H · V07). (7) No seat re-raises an issue ruled INVALID or MERGED in
adjudication-r2 – r5 or here.

**Grading (J141), as the round-6 note (7) states it.** An untested edge on a path a builder can only guess is MAJOR; an
untested edge whose outcome the text defines but no bar runs, so that a wrong build passes every bar, stays MAJOR
(principle (11): "an undefined or untested edge is a MAJOR"; R5-01); a test or fixture list that omits a case its own test
text names is MINOR; two units stating two outcomes for one case is MAJOR however rare the case. One group is graded once:
the Find chips' re-evaluation at a drawn week (VAP-r5-01 major, VRC4T-04 and VCS-r5-02 minor) is MAJOR — R12-35's
register row names a measurement that V12's statistic, as specified, never takes, so two builders of the statistic build
different code (VAP-r2-11's grade). No other regrade.

## Part C — the rulings

### R6-02 Raised ways and walls: one form whichever is laid first — the crossing table

**Governs (the raised-way × wall family, five rounds running; every round-5 finding in it is a cell below):** model —
VAL-R5-01, VAL-R5-02, VAT5-r5-02, VEW-r5-02, VEW-r5-03, VEW-r5-04, VM-R5T-02, VRC5T-01, VV56-r5-02; pipeline —
VEW-r5-01, VEW-r5-05, VM-R5T-01, VM-R5T-03, VPC-R5-01, VPC-R5-02, VV56-r5-01; determinism — VDC5-01, VDC5-03, VEL5-r5-04;
scope — VDC5-02, VCS-r5-03, VCS-r5-04; V01 — VAF-R5T-02, VAF-R5T-03; V04 — VV34-r5-02; V06 — VDC5-04, VV56-r5-03; V07 —
VAL-R5-03; V09 — VDC5-05. Ends at pipeline, determinism, rendering, scope, V01, V04, V05, V06, V07, V09 and V11.
**Supersedes** R5-02 (but what is restated below as standing), R3-25 (d), and V06's J-V6.91, J-V6.114 and J-V6.140 (their
amended texts are V06's END); R4-09 was already gone.

**Why the method changes (round-6 note (2)).** R5-02's rule split by build order: a raised way created across a standing
wall took a **crossing station** — a raised gate or a wall opening, the wall's band its pier, the stretch under it held —
while a wall laid after a raised way ran on beneath its deck. Every life step of that station then needed its own clause
(its stretch held from decay, released when both spans fall, breached by a landfall, repaired before its deck, spared by
the pathway's dismantling, left free-standing by `wallToWay`, `absorbWall`, a delete and the hand-off down, opened by a
gate opening, reproduced at a regeneration, read as a pier once its stretch is gone, founded across a decayed run,
counted as a gate, given a plaza), and some twenty sites restated them; round 5's majors are those clauses. The station is
the split, so this ruling removes it: **a raised way and a wall never bear on each other.** Whichever is laid first, the
wall runs beneath the deck and the deck stands on its own supports; the newer one gives way by rules that already exist
(the support step's obstacles for a raised way, *beneath* for a wall). Every station life step goes with the station.

**Owner rules checked.** Item 110 (b): "a raised way crosses the ways beneath WITHOUT a junction"; "the spaces between
piers stay open or hold the base's vaults"; the aqueduct "carried across low ground on arches to a basin, cistern or
fountain, crossing the wall through an arch"; "a removal is an edit that holds through regeneration". Item 110 (f): "a
raised way crosses ground ways with zero junctions and its parts never share a planar arrangement with part 0; generated
raised ways appear only at CITY and METROPOLIS, each with its reason recorded (drop, link or water need), within the
rung's cap, and a removed one stays removed after regeneration". Kept, all: no junction or gate is ever made on a deck;
the rung gate, reasons, caps and suppression are untouched; **the arch** — an aqueduct created across a standing wall
keeps its supports off the wall's band, so it crosses the wall on one of its own arches, the run beneath walled up to the
arch's soffit where the soffit is lower; a wall laid after an aqueduct passes beneath its arches likewise. File f item 363
(V09's J-V9.61: "bring a raised road or viaduct down before a town wall, through its ground way's gate, over carrying it
over the wall, because a raised deck over a curtain would be an unguarded way in; the aqueduct's arch is item 110 (b)'s
own rule"): kept and extended — every road deck, generated or drawn, comes down before a wall standing when its course is
laid. Item 114 (walls "decay into gaps and patchwork when poor and safe, and recover"): every run now decays and recovers
by its own condition, none held by a deck. Item 101 R2 (a declaration bent to the nearest lawful one) and R13 (a declared
or pinned thing is held): kept — a hand wall or way is bent at its dry run, the raised way held, a lock never refusing work
that passes beneath it. Nothing else of the owner's text speaks to the meeting; the crossing station, raised gates, wall
openings, the held stretch and this table are program design under J122, and this ruling is too (**vetoable**).

**What changes in behaviour, said plainly** (the owner may veto each):
1. **No crossing station, raised gate or wall opening anywhere.** A generated road deck — S4's or S5b's viaduct, an
   elevated road at S6's end, V06 §3.19's founded viaduct or elevated road — no longer crosses a wall standing when its
   course is laid on a raised gate: its course comes down before the trace and crosses it on ground part 0 through the
   gate there, as a hand raised road already does (file f item 363); an elevated road that cannot is not built, reported.
   *Veto option:* R5-02's raised gate for a road deck created across a standing wall.
2. **An aqueduct created across a standing wall crosses it on a span**, its supports kept off the wall's band; the run
   beneath is no longer held: it wears, breaches and recovers as every run, the deck standing on its own supports.
3. **A wall laid after a road deck still passes beneath it ungated** (R5-02's ruling, of which the owner was told; kept).
   *Veto option:* a gate standing on the deck over the wall's line.
4. **The setback, glacis and berm are no obstacle to a support and no longer stop at the under-deck strip**, in either
   order (only the band is crossed on a span, the moat's water kept clear) — J-V6.140's own reason: a span clearing the
   whole strip (18–33 m) passes `maxClearSpanM` (masonry 30 m, V11 §3.24.2), so an aqueduct across a standing wall could
   not be built at all.
5. **No arch vault stands in a `vault` span under a wall** — one whose under-deck strip meets the wall's band or a wall
   strip — in either order (at generation the span rule already makes such a span `open`; the arch beneath the band walled
   up by the run); R5-02 kept the chamber whole in the line with an undefined door (VAL-R5-02).
6. **A run beneath a span keeps its own height, cut down to the soffit where the soffit is lower** (VRC5T-01's first
   form), never raised to it.
7. **A frame growth's extension carries the old end span's `state` and hold** (VAT5-r5-02).

**Decision (J122, vetoable). Home: §2.7's support step (model).** The binding texts, written by the model under its
issue ids (Part H · model):

* **(M1) (3)'s obstacles.** "or a reservation, an enceinte's wall strip (`Enceinte.strips`, or before S7 has cut it the
  strip S7 cuts beside the standing trace — its band's half, setback and glacis by §4.8's rows and the berm up to its
  moat) but for a crossing station on its band (below), or an oasis's grove" → "or a reservation, an enceinte's band
  (`Enceinte.band`, or before S10 has built it the band beside the standing trace, its half-widths by §4.8's rows along
  the stretch profile), whatever its runs' condition — never a wall strip's setback, glacis or berm, in which a support
  may stand (§2.7's crossing table, (6) (d)) —, or an oasis's grove".
* **(M2) (3)'s crossing.** From "a course across an enceinte's trace — on a gate's line or as an aqueduct's wall arch, the
  only crossings §4.3 allows —" to "so no deck stands on a fallen wall;" → "a course across an enceinte's band crosses it
  on a span by this rule — an aqueduct's, a road deck never crossing a trace standing when its course is laid (§4.3
  *Where it may not go*) — and meets the wall by the crossing table ((6) (d));"; and "(4) each other pier's `ring`" →
  "(4) each pier's `ring`".
* **(M3) `supports`' `state` comment.** "; never on a crossing station while a wall stretch lies under it, whose
  `condition` it reads (the support step (3), (6), below)" is deleted (the comment ends "§4.11)").
* **(M4) *An enceinte's condition by run*.** "The stretch of the band under a raised way's crossing station is held while
  its deck stands, as the support step (3) states (*Raised ways*, below). " is deleted.
* **(M5) (6)'s lead.** "only an op that names it changes it (its edits, V06 §3.19's ops, a landfall, a frame growth's
  extension of its deck by (7)), and such an op keeps how it meets each wall stretch ((d))." → "only an op that names it
  changes it (its edits, V06 §3.19's ops, a landfall, a frame growth's extension of its deck by (7)); a wall meets it,
  whichever was laid first, by the crossing table ((d))."
* **(M6) (6) (a) and (b)** are replaced by **the way-and-channel table** (below), whose lead is "(a)–(b) *a part-0 way or a
  channel laid after the raised way* — at generation, at an epoch or by hand, the raised way locked, pinned or neither —
  meets its under-deck strip by this table; §4.3 *Lattice and costs* is the crossing rule's home:". (c) stands.
* **(M7) (6) (d)** is replaced by **the crossing table** (below), whose lead is "(d) *a wall and a raised way* meet by this
  table, whichever was laid first; its four outcomes are defined once here and every other text cites them:".
* **(M8) (6)'s closing paragraph** — from "A stretch standing when the raised way is created carries it at a crossing
  station by (3);" to "its `supports` entry then carrying its own `state`." — is deleted; its last sentence, "Nothing
  waits for a raised way, and no generated course is dropped for later work (T110-2).", stands.
* **(M9) (7)** — VAT5-r5-02's text, as written: "keeps every station of the old deck — its key, position, support `ring`
  and `state` —", and after "…its stations' keys minted after the largest the way has held ((5))" its sentence "; the
  deck's condition at the old ring carries over: each span the extension lays takes the old end span's `state` (a
  `ruined` or `cleared` end span leaving each new span `ruined` or `cleared`, so only a repair raises it — V06 §3.19.2
  (5)'s for a generated way, a hand Repair for a declared one, V06 §3.19.2 (1)) and, where that span's `use` was `held`,
  the same `use` held (an input override the extension keeps as a regeneration does, §7.2), its new supports standing
  (supports outlast spans, V06 §3.19.2 (3)); with no interior station, the one old span is that end span". Across a
  standing band the extension's new spans meet it *over the band* (the crossing table).
* **(M10) `RaisedFoot`'s comment** "(the old deck's stations kept, the support step's (7))" → "(the old deck's stations
  kept and its end span's condition carried, the support step's (7))".

#### The crossing table — §2.7's support step (6) (d), written by the model in these words

**The four outcomes** (each defined here once; every other text cites the outcome's name):

* ***over the band*** — a raised way created across a standing wall: its supports are kept off the wall's band by (3), and
  its ramps, stairs and feet by its course (§4.3 *Where it may not go*: a course crosses a standing band only on a span),
  whatever the runs' condition, so the band lies beneath a span — an aqueduct's arch (item 110
  (b)) — and a span over the band is `open`, reason `clear` (the span rule (2)); its under-deck strip keeps clear of the
  trace's gates and towers (§4.3 *Where it may not go*; V06 §3.19 (5); a hand course bent there, §7.1); nothing of the
  wall is written, the run beneath keeping its own condition (a `breached` or `dismantled` run a gap beneath the arch);
  the meeting then reads as *beneath*. An aqueduct only: a road deck takes *down before the wall*.
* ***down before the wall*** — a road deck (a viaduct's or an elevated road's) never crosses a trace standing when its
  course is laid — at S5b the stage's picked boundary counting as standing: its course comes down to a ground vertex
  before the trace and crosses it on ground part 0, through the gate there (§4.3 *Where it may not go*; by hand §7.1,
  `bend.raised.wall`); a generated course that cannot is re-routed by the solver's ladder or not built, reported. The
  meeting does not arise.
* ***beneath*** — a wall's run and a standing raised way, read from what stands, never stored: the trace keeps its
  course and its strips, band, towers and gates are laid as anywhere (S7, S10, VS3, V06 §3.7, §7.3's S7 operator); the
  band is laid through every support, ramp, stair or foot standing in it — built into the run's line, never cut round
  it — so where one goes the run stands whole across its footprint; beneath a span whose `state` is absent the run's top
  and walk are the lower of its own top and the span's soffit (the soffit lower: the arch walled up to its crown; the run
  lower: the arch open above it), beneath a fallen span or with none its own top (§4.5's daylight casters, §8.4's casters
  and heightfield, §11.1's glTF wall and CityJSON wall objects read it); no arch vault in a `vault` span under the wall — one whose under-deck
  strip meets the wall's band or a wall strip (V04 §3.5.4 (d) (1): read as the `open` span the span rule makes there at
  generation, the arch beneath the band walled up) —, the span's record unchanged; no gate and no tower in
  the under-deck strip — one the wall's law would place there moves to the nearest point clear of it, a tower along the
  trace and a gate along its way, or along the trace where the way is laid after the gate and follows it (a village
  track, V07 §3.5a (4)); no gate on the deck, which passes over the run and is no crossing of the gate law (gates counted
  on ground part 0: §4.8 *Gates*, §5.3's gate row; a raised arterial over a stage's boundary pins no gate, §4.4 S5a); the
  moat a channel by the way-and-channel table (row e); the run's condition its own (item 114: a `breached` or
  `dismantled` run a gap beneath the deck, the deck on its own supports). Reported once per meeting of a wall laid after
  a raised way: `W_RAISED_CROSSING` at generation, `walls.raisedCrossings` at an epoch (V06 §2.10),
  `bend.wall.raisedCrossing`'s line at a hand edit's dry run.
* ***unchanged meeting*** — the event writes only its own records, as on any run or gate; nothing of the raised way is
  written or passed over and nothing is bent for it; the meeting re-reads as *beneath*.

**What *beneath* reads from each raised-way state** (the columns): C1 created across the wall, and C11 created across a
`breached` or `dismantled` run — *over the band* or *down before the wall*; C2 standing — the cap at each standing span's
soffit; C3 one span over the band fallen (`ruined` or `cleared`) — the run at its own top beneath it; C4 every span over
the band fallen — its own top throughout; C5 a support, ramp or stair in or by the band cleared or toppled — the band
whole across its footprint (a `ruined` support's stump drawn in it, a `cleared` one's not); C6 a `vault` span over the
trace breached with its chamber — no chamber stood under the wall (V04), the span `ruined` read as C3; C7 deleted or suppressed —
no raised way, the run at its own top, V04's vaults of the way gone with it; C8 held (locked, pinned or declared) — as
C2, a lock or pin never refusing work that passes beneath (§7.1's lock row); C9 carried down to the village product — as
C2 (V07 §3.12: the standing fabric unchanged); C10 repaired by `repairRaised` — as C2, the repair writing the raised way
alone; C12 extended by a frame growth — the old deck as it stood, the extension's new spans *over the band* where they
cross a standing band ((7)).

**The table.** Rows are the wall events; each cell gives the outcome for that raised-way state and the test that runs
it. The last column gives what the event itself writes (its op and records), the gates and §5.3's checks, and a hand
edit's bend and dry-run fate — the same for every cell of its row. "—" in C1 and C11 means: a raised way created after
this event meets the wall as the event left it, by W1·C1 or W1·C11.

| wall event | C1 created across it | C2 standing | C3 one span fallen | C4 all spans fallen | C5 support cleared or toppled | C6 `vault` span breached | C7 deleted or suppressed | C8 held | C9 carried down | C10 repaired | C11 created across a breached or dismantled run | C12 frame growth | the event's op and records · gates and §5.3 · bend and fate |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **W1** a generated trace laid — S3's or S5a's with S7's strips, towers and gates and S10's band; VS3's palisade; an epoch's circuit, contraction or re-anchored stretch (V06 §3.7) | *over the band* (an aqueduct at S6's end or V06's founding) or *down before the wall* (S4's and S5b's viaducts, S6's elevated road, a founded road deck) · T110-2 (1), (2) | *beneath* · T110-2 (3) (generation), T-V6-47 (epoch), T-V7-48 (village) | *beneath*, own top beneath the fallen span · T110-2 (7), T-V6-47 | *beneath*, own top · T110-2 (7) | *beneath*, the band whole across the footprint · T110-2 (7), T-V6-47 | *beneath*, no chamber, read as C3 · T110-2 (7), T-V4-63 | no meeting; a suppressed generated way stays removed (item 110 (f)) · T110-3 | *beneath* (at a regeneration: row W3) · T110-2 (4), (6) | *beneath* (VS3's palisade laid after it) · T-V7-48 | *beneath*, the cap back · T110-2 (7) | *over the band*, the gap left a gap, no repair; a road deck *down before the wall* · T110-2 (1), T-V6-73 | the extension *over the band*; the old deck as it stood · T110-2's frame clause | the trace's own batches (S3 or S5a L1; S7's L1 strips, towers and gates; S10's band; VS3's; V06's fortification batch) · gates on ground part 0: S5a pins none on a deck, S5b spawns to `N_k` (way-and-channel table, row d); §5.3's gate row on ground part 0 · reported `W_RAISED_CROSSING` (generation) or `walls.raisedCrossings` (epoch); no bend |
| **W2** a hand `drawWall`, a moved trace vertex or a re-anchored stretch | — | *beneath*; an arch vault in a `vault` span now under the wall removed by V04's reconcile in the commit · T110-2 (4), T-V9-52, T-V4-63 | *beneath*, own top beneath the fallen span · T110-2 (7) | *beneath*, own top · T110-2 (7) | *beneath*, the band whole · T110-2 (7) | *beneath*, no chamber · T110-2 (7) | no meeting · T110-2 (4) | *beneath*, no `refuse.locked` · T110-2 (4) | *beneath* (a village T3 `wall`) · T-V7-48 | *beneath* · T110-2 (7) | — | as C2 · T110-2 (4) | §7.3's S7 operator over the run · a gate it makes for a ground way inside the under-deck strip moved along its way clear of it; §5.3's gate row on ground part 0 · `bend.wall.raisedCrossing`, one line; the vault's removal a fate; the undo restores the run and the vault with the same id |
| **W3** a regeneration re-deriving a ring under a held raised way | — (a held way is not re-created; a generated one the regeneration lays is W1·C1) | *beneath*, laid by W1's rules after the held way: nothing of the meeting reads the order, so a ring re-derived on its old trace reproduces its strips, band, towers, gates and vaults · T110-2 (6) | *beneath* as read · T110-2 (6) | *beneath* as read · T110-2 (6) | *beneath* as read · T110-2 (6) | *beneath* as read · T110-2 (6) | a suppressed way stays removed · T110-3 | as C2 · T110-2 (6) | as C2 (a village Regenerate) · T-V7-48 | as C2 · T110-2 (6) | as C2 (the held way as it stands) · T110-2 (6) | as C2 · T110-2 (6) | the regenerated stages' batches; the held raised way written by none; V04's T2 vaults step reads the trace · gates on ground part 0 · no bend |
| **W4** `DeclineOp`'s `breach` or `dismantle` (an epoch's, a hand `convert`'s) | — | *unchanged meeting* · T114-3 | *unchanged meeting* · T114-3 | *unchanged meeting* · T114-3 | *unchanged meeting* · T114-3 | *unchanged meeting* · T114-3 | no meeting · T114-3 | *unchanged meeting* · T114-3 | *unchanged meeting* · T-V7-48 | *unchanged meeting* · T114-3 | — | *unchanged meeting* · T114-3 | the runs' `condition`, `conditionEpoch` and material over the op's stretch (§2.7), nothing passed over · gates unchanged · a hand op's line as any `convert`; no bend |
| **W5** V06 §3.7.7's decay (`wearWall`, a breach by neglect or poverty) | — | *unchanged meeting* · T114-3, T-V6-73 | *unchanged meeting* · T-V6-73 | *unchanged meeting* · T-V6-73 | *unchanged meeting* · T-V6-73 | *unchanged meeting* · T-V6-73 | no meeting · T-V6-73 | *unchanged meeting* · T-V6-73 | *unchanged meeting* (V07 §3.4 (8)'s decay) · T-V7-48 | *unchanged meeting* · T-V6-73 | — | *unchanged meeting* · T-V6-73 | the draws over every run alike, none filtered for a deck · gates unchanged · — |
| **W6** V06 §3.7.2 (1)'s gate opening (`gateToJunction`) | — | *unchanged meeting*: no gate stands in an under-deck strip, so none it opens lies under a deck · T-V6-47's bar | as C2 · T-V6-47 | as C2 · T-V6-47 | as C2 · T-V6-47 | as C2 · T-V6-47 | no meeting · T-V6-47 | as C2 · T-V6-47 | as C2 · T-V7-48 | as C2 · T-V6-47 | — | as C2 · T-V6-47 | the junction (and square) as at any gate · gates on ground part 0 · a hand `convert`'s line; no bend |
| **W7** `wallToWay` | — | the ring road by the way-and-channel table (row c); V04 lays again an arch vault the old wall stood over · T110-2 (8), T-V6-47 | as C2 · T110-2 (8) | as C2 · T110-2 (8) | as C2 · T110-2 (8) | as C2 · T110-2 (8) | no meeting · — | as C2, no `refuse.locked` · T110-2 (8) | as C2 · T-V7-48 | as C2 · T110-2 (8) | — | as C2 · T110-2 (8) | `retypeEdges`, S9's `corridorUnion`, the ring road's re-route by §7.3's S4 operator in the dry run · gates become junctions (none under a deck); no junction with the raised way · the re-route and the vault a fate |
| **W8** `absorbWall` | — | *unchanged meeting*: the cleared record's runs stand and are dismantled in time as any; V04 lays again an arch vault the wall stood over once the record is dropped · T-V6-11 | as C2 · T-V6-11 | as C2 · T-V6-11 | as C2 · T-V6-11 | as C2 · T-V6-11 | no meeting · — | as C2 · T-V6-11 | as C2 · T-V7-48 | as C2 · T-V6-11 | — | as C2 · T-V6-11 | `absorbWall` (V06 §2.8) and V06 §3.7.2 (2)–(3)'s dismantling · gates go with their runs · a hand `convert`'s line |
| **W9** the hand-off down that makes the enceinte the village's palisade | — | *unchanged meeting* (V07 §3.12: the standing fabric unchanged); VS3's later re-lay is W1·C9 · T-V7-48 | as C2 · T-V7-48 | as C2 · T-V7-48 | as C2 · T-V7-48 | as C2 · T-V7-48 | no meeting · — | as C2 · T-V7-48 | as C2 (this column) · T-V7-48 | as C2 · T-V7-48 | — | as C2 · — | the plan's revival (V07 §3.12) · the palisade's gates on ground part 0 · — |
| **W10** `repairWall` (on a `dismantled` run its bend: a new stretch drawn on its line) | — | *unchanged meeting*; the bend's new stretch is a wall laid after: W2·C2 · T114-3, T-V6-11 | as C2 · T114-3 | as C2 · T114-3 | as C2 · T114-3 | as C2 · T114-3 | no meeting · — | as C2 · T114-3 | as C2 · T-V7-48 | as C2, neither repair waiting on the other · T114-3 | — | as C2 · T114-3 | `repairWall` (V06 §2.8) · gates unchanged · `bend.wall.newStretch` on a dismantled run |
| **W11** a hand `delete` of a run or of the enceinte | — | *unchanged meeting*: the run (its band, towers, gates) removed, the raised way untouched; V04 lays again an arch vault the run stood over · T110-2 (4) | as C2 · T110-2 (4) | as C2 · T110-2 (4) | as C2 · T110-2 (4) | as C2 · T110-2 (4) | no meeting · — | as C2 · T110-2 (4) | as C2 · T-V7-48 | as C2 · T110-2 (4) | — | as C2 · T110-2 (4) | §7.1's `delete` · its gates go with it · fates in the dry run; no bend; the undo restores the run and removes the vault again |

#### The way-and-channel table — §2.7's support step (6) (a)–(b), written by the model in these words

The crossing rule is §4.3 *Lattice and costs*' (a span whose clear width between the supports' rings is at least the
way's width + `raisedWays.structure.clearWidthM`, whose soffit meets *The clearance* for the crossed way, within ±
`raisedWays.structure.squareDeg` of square to the deck; never over a support ring, ramp, stair, foot or a `vault` span's
under-deck strip; never along the strip). A lock or pin on the raised way never refuses any row (none changes it).

| row | outcome | ladder · bend | gates | test |
|---|---|---|---|---|
| **(a)** a route, S5c's proposal, a stage-2 seed's way, a village tracker, S7's quay, intervallum or castle path | crosses the under-deck strip only by the crossing rule | its own ladder: §4.3's F-ROUTE for a route; §4.4's deflection along the strip or its end there for S5c; V01 §3.17.3 (3)'s F-TEMPLATE rungs and §4.6's lane ladder; V07 §3.5a (3)'s turn; S7's way ending at the strip as at a reservation (an intervallum ending so, the inner strip bounded across the under-deck strip by its inner setback line, §4.8's lead) | — | T110-2 (3), (5); T-V7-48 |
| **(b)** a hand `drawWay` or a moved way | the same | `bend.raised.underSpan` (moved along the deck to cross under the nearest span that admits it); none admits it: `bend.raised.around` (another course by §4.3's router, round the raised way, else the nearest routable pair, §4.3 *Two-point roads*) | a way crossing a trace makes its gate there on ground part 0 (§7.3's S7 row) | T110-2 (5); T-V9-52 |
| **(c)** the ring road `wallToWay` makes | the same, the old line being where it is laid | in the dry run its spine there is re-routed by §7.3's S4 local operator, between its nearest nodes on either side of the under-deck strip, to cross under the nearest span the rule admits; none admits it: it ends at the strip's edges as at a reservation, reported | its gates become junctions on ground part 0; none with the raised way | T110-2 (8); T-V6-47 |
| **(d)** S5b's spawned primary | its course comes down before the stage's picked boundary (*down before the wall*), so it crosses the boundary on ground part 0 | §4.3's ladder | each spawned primary a main gate; an earlier arterial crossing the new boundary on a deck is no gate and no part of `c`, so the stage reaches `N_k` gates on ground part 0 (§4.4 S5b; §4.8 *Gates*; §5.3's gate row) | T110-2 (2) |
| **(e)** a channel — a moat (S3 (10)'s; S5a's outer moat), a canal or a hand carve | passes beneath where its crossing of the under-deck strip meets no support, ramp, stair, foot or `vault` span's strip; elsewhere it stops at the strip's edges, ending against the ground as against a berm (§4.2 S3 (10)), reported (`W_RAISED_CROSSING`) — a moat stopped so leaving the wall's outer strip closed across the under-deck strip as on a dry stretch (§4.7 S10 (0)); a raised way created across a standing channel keeps its supports out of its water ((3)) | a hand carve: its crossing first moved along the deck to the nearest crossing that meets none of these (`bend.raised.underSpan`), else stopped at the strip's edges (`bend.raised.around`) | an arterial's deck across a moat by S5a *Outer moats* | T110-2 (1), (3), (5) |

#### Attacking the table (round-6 note (2) (e)): what a second builder might build, and the words that close it

1. *Is the band cut round a support standing in it?* No: "laid through … never cut round it". A support's `ring` is a
   point attribute (§2.2 rule 5), not a face, so the band's L3 face and the ring overlap with no planar conflict; the
   drawn wall and the pier share the ground, and when the support goes nothing is re-cut (VEW-r5-02's outcome by
   construction, no op).
2. *Is a run beneath a span raised to the soffit?* No: "the lower of its own top and the span's soffit"; a soffit above
   the run leaves the arch open above it (VRC5T-01).
3. *Does the wall hold the deck, or the deck the wall?* Neither: no station exists, so no stretch is held, released,
   repaired first or left free-standing; a `breached` run beneath a deck is a gap, and the deck stands on its piers.
4. *Which op writes each record?* The raised way's records: only its own ops (its creation, its edits, V06 §3.19's ops, a
   landfall, (7)). The wall's: only the wall's ops (the row's last column). The arch vault: V04's reconcile, in the commit
   that lays, moves or removes a wall's band or strip over a `vault` span's under-deck strip (V04's END). Nothing else writes; *beneath* is read.
5. *Does a support of an aqueduct created across a wall keep off the setback, glacis or berm?* No: only the band and the
   moat's water — the span over the band then fits `maxClearSpanM` (behaviour change 4).
6. *May a road deck cross a standing wall if the solver finds it cheaper?* Never: *down before the wall* is a lattice
   exclusion for deck edges across a standing (or, at S5b, picked) trace, as the harbour mouth is.
7. *A gate or tower under a deck?* Never, in either order: the wall's law moves one clear (*beneath*), and a raised way
   created later keeps its under-deck strip off them (*over the band*). So `gateToJunction` never meets a deck (W6), and
   a gate plaza never lies under one.
8. *Does a locked raised way refuse a wall, a way or a carve passing beneath?* No (§7.1's lock row, VEL5-r5-04): none
   changes it. Its arch vaults are V04's, derived from its spans and the walls over them, never held by its lock.
9. *What does `W_RAISED_CROSSING` count?* One per meeting of a wall laid after a raised way, and one per channel stopped
   at an under-deck strip — never a raised way created across a wall (it gave way; nothing to report).
10. *What does a regeneration reproduce?* Everything of the meeting: S7 and S10 lay the strips and band, and S7 the
    towers and gates, by the same rules whichever was laid first, so a ring re-derived on its old trace under a held
    raised way equals the old one (W3).

**The equivalence — what each superseded piece carried, and where it now lives or why it is gone.**
* The crossing station (its pier the wall's band; one per crossing; set before the other stations slid) → gone: an
  aqueduct's supports keep off the band and a span passes over it (*over the band*) — item 110 (b)'s arch is the
  aqueduct's own; J-V6.140's clear-span reason is met because only the band is spanned.
* The raised gate (a viaduct's or elevated road's deck carried through the trace at a gate) → gone: a road deck comes
  down before a standing trace (*down before the wall*; file f item 363's rule, now for generated roads too); the gate
  law counts ground part 0 only, so §5.3's gate row, §4.8 *Gates*, S5b's count and the gate plaza read one kind of gate.
* The wall opening (an arch in the curtain under an aqueduct) → gone: the aqueduct's own arch, the run beneath walled up
  to the soffit where the soffit is lower.
* The held stretch (R3-25 (d)) with its release, its landfall row, `repairRaised`'s `repairWall` first, the decay and
  the pathway's dismantling passing over it, `wallToWay`, `absorbWall`, a delete and the hand-off down leaving it as a
  free-standing tower or arch, `bend.wall.held`, and (6)'s closing paragraph (a station reproduced at a regeneration, a
  station standing as a pier once its stretch is gone) → gone with the station; every run decays and recovers by item
  114's rules, and a regeneration reproduces the meeting because nothing of it reads the order.
* R5-02's (6) (d) "taken into the line, the run abutting its faces and closed against it" → "built into the run's line,
  the band laid through it" (so the run stands whole when the part goes); "at a `vault` span ending at its arch vault's
  two walled-up arch mouths, the chamber kept whole" → no chamber in a `vault` span under a wall (V04); "an
  ordinary run whose top is no higher than that span's soffit" → stands, made exact (the lower of the two); "the
  stretch's setback, glacis and berm stop at the under-deck strip's edges" → gone (they run on); "no gate or tower stands
  in the under-deck strip" and "no gate on the deck … pins no gate" → stand, now in both orders.
* Every bar R5-02 set survives in T110-2 (scope's S1 below) but those of the station and the stopped strips, which go
  with what they barred: zero junctions; no support in water or in a wall's band standing at the raised way's creation;
  every clear span and pier within its bound; the raised way unchanged by later work, locked or not; 0 way corridors over a
  support ring, ramp, stair, foot or `vault` span's strip; `W_RAISED_CROSSING` reported; nothing waiting; no course
  dropped; and new: 0 road decks across a trace standing when laid, 0 gates or towers in an under-deck strip, 0 gaps in a
  band where a raised-way part went, 0 arch vaults in a `vault` span under a wall, 0 runs above a standing span's
  soffit.

#### Ends (each an issue's own FIX or an END line in Part H; old → new, every other word as it stands)

**pipeline**
* (P1) §4.1's S7 row: "· beside a raised way standing before the trace, its strips stopped at the under-deck strip, a
  gate plaza cut round the raised way's supports and no pier or mole rooted on them (§4.8's lead; §2.7's support step
  (6))" → "· a raised way it meets met by §2.7's crossing table (*beneath*; §4.8's lead), a gate plaza cut round its
  supports, ramps, stairs and feet and no pier, mole or breakwater rooted on them". (VPC-R5-01's and VM-R5T-01's §4.1
  parts.)
* (P2) §4.3 *Where it may not go*: "crosses a moat or a city wall standing when it is laid only as the aqueduct's wall
  arch or on a gate's line (a wall laid after the raised way runs on beneath its deck, and a moat laid after it passes
  beneath it or stops at its under-deck strip; §2.7's support step (6) (b), (d))," → "meets a wall by §2.7's crossing
  table — an aqueduct crossing a standing wall's band on a span, its ramps, stairs and feet off the band and its
  under-deck strip clear of the trace's gates and towers (*over the band*); a road deck, a viaduct's or an elevated road's, never crossing a trace standing when its
  course is laid (at S5b the stage's picked boundary counting as standing): its course comes down to a ground vertex
  before the trace and crosses it on ground part 0 through the gate there, a generated course that cannot re-routed by
  the solver's ladder or not built, reported (*down before the wall*; by hand §7.1, file f item 363) — and crosses a
  moat or a canal standing when it is laid only on a span, no support in its water (a channel laid after it by §2.7's
  way-and-channel table),". (VEW-r5-01's lattice exclusion; the hand viaduct of repair-r5-pipeline's hand-off.)
* (P3) §4.4 S5a *Outer moats*: from "The carve clears no raised-way support: a raised way standing before the trace is
  held" to "by §4.2 S3 (4)'s gate law (§4.8 *Gates*)." → "The carve clears no raised-way support: a raised way standing
  before the trace is held, the trace meeting it by §2.7's crossing table (*beneath*) and the channel by its
  way-and-channel table (row e), reported (`W_RAISED_CROSSING`); a raised arterial passing over the trace takes no gate
  and no part-0 deck, and a part-0 way beneath it takes its own ground gate clear of the under-deck strip by §4.2 S3
  (4)'s gate law (§4.8 *Gates*)."
* (P4) §4.4 S5b: "and may raise a viaduct by §4.3's rules." → "and may raise a viaduct by §4.3's rules, its course coming
  down before the stage's picked boundary (§4.3 *Where it may not go*), so each spawned primary crosses the boundary on
  ground part 0 and is a main gate (§2.7's way-and-channel table, row d)."; its **Test** adds "; a stage whose spawned
  primary's best course is raised across its boundary still has `N_k` gates, each on ground part 0". (VEW-r5-01, amended:
  no further spawn is needed.)
* (P5) §4.5's daylight casters: "walls (a run beneath a raised way's span to its soffit, §2.7's support step (6) (d))," →
  "walls (a run beneath a raised way's standing span capped at its soffit, §2.7's crossing table),". (VRC5T-01's
  pipeline end.)
* (P6) §4.8's lead: from "A raised way standing before a trace is held (§2.7's support step (6)):" to "(§2.7's support
  step (3))." → "A raised way S7 meets is met by §2.7's crossing table: the strips, band, towers and gates beside a
  trace laid after it as *beneath* states — the strips and band as anywhere, no tower or gate in its under-deck strip
  (one the spacing or the gate law would place there moved clear of it), reported (`W_RAISED_CROSSING`) —, a gate plaza
  cut round its supports, ramps, stairs and feet, a quay, the intervallum or a castle path crossing its under-deck strip
  by §2.7's way-and-channel table (an intervallum ending at the strip leaving the inner strip bounded across it by its
  inner setback line), and no pier, mole or breakwater rooted on its supports, ramps, stairs or feet, a root
  moved along the shore to the nearest clear one." (VM-R5T-01's and VPC-R5-01's §4.8 texts, amended: the strips are no
  longer stopped, so the band is built beneath the deck by S10's step (0) as anywhere.)
* (P7) §4.8 *Condition at generation*: ", a `breached` draw on the band's stretch under a raised way's crossing station
  read as `worn` while its deck stands (§2.7's support step (3))" is deleted.
* (P8) §4.8 *Gates*: "Main gates are where S4's and S5b's arterials cross the trace on ground part 0, or at a raised gate
  where the arterial's raised way was created across the standing trace (§2.7's support step (3)) — a deck passing over a
  stretch laid after it is no crossing (§2.7's support step (6) (d)):" → "Main gates are where S4's and S5b's arterials
  cross the trace on ground part 0 — a deck passing over a trace is no crossing (§2.7's crossing table):"; "and each outer
  enceinte's gates are its S5b primaries' crossings," → "and each outer enceinte's gates are its S5b primaries' crossings
  on ground part 0 (§4.4 S5b),"; and the paragraph from "**A raised way created across a standing trace**" to "(§2.7's
  support step (6) (d))." → "A raised way and a trace meet by §2.7's crossing table: no station, gate or opening on a
  deck." The gate-plaza sentence stands — every main gate is on ground part 0 (VM-R5T-03's case cannot occur).
* (P9) §4.11 `wallToWay`: "gates become junctions with a `square` option — save the stretch held under a raised way's
  crossing station while its deck stands (a raised gate with its tower, the curtain under an aqueduct's arch), which
  stays as a free-standing gate tower or arch carrying the deck, the new ring road taking no junction with the raised way
  (§2.7's support step (3); V06 §3.7.6 (5) gives its form)." → "gates become junctions with a `square` option. Where the
  old line meets a standing raised way the ring road is a way laid after it (§2.7's way-and-channel table, row c): in the
  dry run its spine there is re-routed by §7.3's S4 local operator, between its nearest nodes on either side of the
  under-deck strip, to cross under the nearest span §4.3's crossing rule admits, else it ends at the strip's edges as at
  a reservation, reported; it takes no junction with the raised way, nothing of which changes, and V04 lays again the
  arch vault of a `vault` span the old wall stood over (V04 §3.5.4 (d))." (VPC-R5-02, amended: no kept stretch.)
* (P10) §4.11's frame batches: "the old deck's stations kept (§2.7's support step (7))" → "the old deck's stations kept
  and its end span's condition carried (§2.7's support step (7))". (VAT5-r5-02's pipeline end.)
* (P11) §4.13's raised-way row: the `wall` cell → "meets a wall by §2.7's crossing table: created across a standing one
  *over the band* (an aqueduct) or *down before the wall* (a road deck); a wall laid after it — a village palisade among
  them — *beneath*. *Rung:* — (defined)"; the `river, coast, moat` cell's "a moat spanned outside its wall strip, and one
  laid after the course passing beneath only where it meets no support, ramp, stair, foot or `vault` span, else stopped
  at the under-deck strip, the course kept (§2.7's support step (6) (b); `W_RAISED_CROSSING`)" → "a moat spanned with no
  support in its water, and one laid after the course by §2.7's way-and-channel table (row e), the course kept
  (`W_RAISED_CROSSING`)".

**determinism**
* (D1) §5.3's way-and-trace row: "a raised way's deck, on its own part, meets a trace by §2.7's support step (3) and (6)
  (d) (§4.8 *Gates*)" → "a raised way's deck, on its own part, meets a trace by §2.7's crossing table, no crossing of
  this row".
* (D2) §5.3's gate row, both parentheses "(on ground part 0 or at a raised gate; a deck passing over a stretch laid after
  its raised way is no crossing, §2.7's support step (6) (d))" → "(on ground part 0; a deck passing over a trace is no
  crossing, §2.7's crossing table)". (VDC5-03, amended: no raised gate exists.)
* (D3) §5.4's `warnings` comment: "S5a's and S7's `W_RAISED_CROSSING` (§2.7's support step (6); §4.4 *Outer moats*;
  §4.8)" → "S5a's and S7's `W_RAISED_CROSSING` (one per meeting of a wall laid after a raised way and per channel stopped
  at its under-deck strip: §2.7's crossing and way-and-channel tables; §4.4 *Outer moats*; §4.8)".
* (D4) §7.1 *Raised ways, aqueducts and retaining walls*: "while an aqueduct crosses a wall by an arch in the curtain,
  never a gate (item 363)" → "while an aqueduct crosses a standing wall on a span over its band, its course bent clear of
  the wall's towers and gates, never a gate (item 363; §2.7's crossing table, *over the band*)".
* (D5) §7.1's lock row: VEL5-r5-04's (1), in these words — "— a drawn way across a locked entity," → "— a drawn way
  across a locked entity (never a ground way, a carve or a wall stretch passing beneath a locked or pinned raised way's
  deck, which changes none of its parts: §2.7's crossing and way-and-channel tables, bent by the rows below as beneath an
  unlocked one),".
* (D6) §7.1's `bend.wall.held` row is deleted.
* (D7) §7.1's `bend.wall.raisedCrossing` row → "| a hand `drawWall`, a moved trace vertex or a re-anchored stretch across a
  standing raised way, locked, pinned or neither (§2.7's crossing table, *beneath*) | bent | the stretch on its course
  beneath the deck as *beneath* states, an arch vault in a `vault` span under it removed (a fate), a gate it makes for a ground way
  inside the under-deck strip moved along its way clear of it; the raised way unchanged; named in one line |
  `bend.wall.raisedCrossing` |".
* (D8) §7.1's `bend.raised.underSpan` row: VDC5-01's cause and outcome texts (its own FIX), the cause reading "a standing
  raised way's — locked, pinned or neither —" (VEL5-r5-04's (2)).
* (D9) §7.1's catch-all: "the arch a wall takes for an aqueduct drawn across it" → "the span an aqueduct drawn across a
  standing wall takes over its band, clear of its towers and gates".
* (D10) §7.3's S7 row: "; an aqueduct's crossing adds an arch to the curtain's run and no gate, item 110 (b)" is deleted,
  and "on each standing raised way the new run meets, the run passing beneath its deck and its strips stopped at the
  under-deck strip's edges (§2.7's support step (6) (d)) — nothing of the raised way re-derived or in the effective
  scope" → "on each standing raised way the new run meets, the meeting by §2.7's crossing table (*beneath*) — nothing of
  the raised way re-derived or in the effective scope, V04's reconcile removing an arch vault in a `vault` span the new run
  stands over and laying again one the old run stood over (V04 §3.5.4 (d))". (VM-R5T-01's and VPC-R5-01's §7.3 texts superseded.)
* §7.4's raised-way row ("its deck and piers held, as every raised way is from its creation (§2.7's support step (6))")
  stands.

**rendering**
* (R1) §8.4's heightfield writers: "(a wall run beneath a raised way's span topped at its soffit)" → "(a wall run beneath a
  raised way's standing span capped at its soffit, §2.7's crossing table)".
* (R2) §8.4's shadow casters: "a run beneath a raised way's span topped at its soffit, §2.7's support step (6) (d)" → "a
  run beneath a raised way's standing span capped at its soffit, §2.7's crossing table".
* (R3) §11.1's 3-D row: "and a run beneath a raised way's span topped at that span's soffit (§2.7's support step (6)
  (d))" → "and a run beneath a raised way's standing span capped at its soffit (§2.7's crossing table)".
* (R4) §11.1's CityJSON row: "a run beneath a raised way's span topped at its soffit as in glTF (§2.7's support step (6)
  (d))" → "a run beneath a raised way's standing span capped at its soffit as in glTF (§2.7's crossing table)".
  (R1–R4: VRC5T-01's and VEW-r5-02's rendering ends.)

**scope**
* (S1) §13.2's T110-2, from "a CITY masonry aqueduct across a moated c15 wall with an intervallum and a timber viaduct on a
  gate's line, both built," to "0 S5b or S5c way corridors over a support ring, ramp, stair or foot;" (the text just
  before "(T110-3)") → "**the wall and later work** (§2.7's crossing and way-and-channel tables): (1) *over the band* — a
  CITY c15 town with a moated ring and an intervallum whose masonry aqueduct, laid at S6's end, crosses S3's ring: its
  supports off the band and out of the moat's water, the span over the band `open` (reason `clear`) and within every
  bound, the run beneath at the lower of its own top and the soffit, no station, gate or opening, the ring's gates and
  strips as without it; the same aqueduct founded by V06 §3.19 at a CITY epoch across the ring where its run is
  `breached` and, on a second run, `dismantled` — the gap left a gap beneath the arch, no `repairWall`; and a hand
  aqueduct drawn across a standing wall, its course bent clear of a tower, with `bend.wall.aqueductArch`; (2) *down
  before the wall* — a CITY whose S4 route's best course crosses a valley at S3's gate, its deck down before the trace
  and its route through the gate on ground part 0; an elevated road whose course would cross a standing ring, not built
  and reported; and a stage-2 primary S5b spawns whose best course is raised across its picked boundary, down before it —
  the stage's `N_k` gates all on ground part 0; 0 road decks across a trace standing when laid; (3) *beneath* at
  generation — a CITY c14 fixture whose S4 viaduct over a valley is crossed by stage 2's moated ring: the ring on its
  course, its band laid through each support, ramp or stair in it, its setback, glacis and berm as anywhere, a run
  beneath each standing span capped at its soffit and, beneath a span whose soffit stands above the ring's top, at its
  own top with the arch open above it, no gate or tower in the under-deck strip and no gate on the deck, the arterial on
  the deck pinning no gate and S5b's count read on ground part 0, the channel passing beneath only where it meets no
  support, ramp, stair, foot or `vault` span's strip, else stopped at the strip's edges (`W_RAISED_CROSSING`), its
  intervallum (the c14 fixture's era row laying one) crossing under a span §4.3 admits or ending at the strip, the inner
  strip then bounded across it by its inner setback line, every station, key and span as S4's commit laid them; the same with `moat: 'all'` at the widest moat row — the channel
  stopped at the under-deck strip's edges, the outer strip closed across it as on a dry stretch, `W_RAISED_CROSSING`
  reported, no support in water; and a stage-2 ring whose boundary falls on an S4 viaduct's ramp at a valley rim — the
  band laid through the ramp, no ramp, stair or foot in the channel; (4) *beneath* by hand and at an epoch — an epoch circuit across a standing aqueduct and one across a standing
  timber elevated road, an epoch contraction across an aqueduct, a hand `drawWall` across a standing aqueduct with a
  `vault` span in its line and one across a declared one-span masonry viaduct, each run again with the raised way locked
  and with it pinned: no `refuse.locked`, the `vault` span's arch vault removed in the wall's commit (a fate in the hand
  dry run, the hand undo restoring it with the same id), a gate the wall makes for a ground way moved clear of the
  under-deck strip, every station, key, span and state of the raised way unchanged, the hand cases naming
  `bend.wall.raisedCrossing`; and a hand `delete` of a run beneath a standing viaduct — the viaduct unchanged, no bend,
  the run back on its undo; (5) ways and channels — on the CITY and METROPOLIS fixtures, 0 supports in a moat's water, a gate plaza, a quay's
  corridor, a pier, a mole or a way's corridor, and none in the band of a wall standing at the raised way's creation —
  among them a CITY masonry viaduct across a `quay`-banked river at its clear-span bound (both bank stations behind the
  quays' corridors, each quay one connected way passing under its span) and a CITY S4 timber viaduct crossed by a
  `through` S5b road and an S5c street, each crossing under a span clear of its supports; an H-AQUA epoch growing a stage
  over a standing aqueduct's land, an
  epoch route re-solved under a viaduct, a hand road drawn across one, a hand road wider than every `open` span's clear
  width drawn across one, a hand carve of a canal across a standing viaduct whose drawn crossing meets a support and one
  wider than the clear width between every two of its supports, each hand case run again with the raised way locked and
  with it pinned — 0 way corridors over a support ring, ramp, stair, foot or `vault` span's strip, every way crossing
  under a span §4.3 admits (`bend.raised.underSpan`; the wide road round the raised way, `bend.raised.around`), the first
  carve moved along the deck to the nearest crossing that meets none of these and passing beneath with no support in
  water (`bend.raised.underSpan`), the second stopped at the under-deck strip's edges, both ends against the ground as
  against a berm (`bend.raised.around`), no `refuse.locked`, every station, key and span unchanged; (6) regeneration —
  (1)'s c15 fixture with its aqueduct locked, regenerated (keep): the ring, its strips, band, towers and gates
  byte-identical; then given New random, its seed searched so that the new ring's band falls on one of the aqueduct's
  supports — that support built into the new band's line, every station, key and span of the aqueduct unchanged; and
  (3)'s `moat: 'all'` fixture re-derived from S4 with its viaduct locked — stage 2's ring and moat meeting it as in (3), no station moved,
  added or omitted and no key minted, 0 S5b or S5c way corridors over a support ring, ramp, stair or foot; (7) parts
  going — after (4)'s epoch circuit ran beneath the standing aqueduct, a span over the band `ruined`, a support in the
  band `cleared` and a `vault` span over the trace breached by scripted `DeclineOp`s (as its lapse's salvage would, V06
  §3.19.2 (3)); and, on a second run, the aqueduct deleted by hand: the run whole across each former footprint and at its own top beneath each
  fallen span, 0 gaps in its band and the enceinte's closure unchanged, the delete's undo restoring the cap; then the
  lapsed span repaired by `repairRaised` — the cap back, no wall op; (8) `wallToWay` of (3)'s stage-2 ring once
  superseded, its fate set to `road` — the ring road crossing the viaduct's under-deck strip under a span §4.3 admits,
  re-routed by §7.3's S4 operator, else ended at the strip's edges; 0 way corridors over a support ring, ramp, stair,
  foot or `vault` span's strip, no junction with the raised way;". (VCS-r5-04, VDC5-02 with VCS-r5-03, VEL5-r5-04's (3),
  VEW-r5-01's, VEW-r5-02's, VEW-r5-03's, VPC-R5-02's and VRC5T-01's scope ends, as one text.)
* (S2) T110-2's frame-growth clause: VAT5-r5-02's scope END, as written.
* (S3) §13.2's T114-3: from "and on a neglected, poor CITY ring over 20 epochs with a masonry aqueduct through its wall
  arch and a viaduct on a raised gate," to "the hand repair's undo restoring the gap and both fallen spans;" → "and on a
  neglected, poor CITY ring over 20 epochs with a masonry aqueduct over it, the run beneath the aqueduct decays through
  `worn` to `breached` as every other run, the deck standing on its own supports throughout (§2.7's crossing table,
  *unchanged meeting*); its landfall clause, on volume 5's landfall (V05 §3.16): a landfall over an aqueduct's span and
  the run beneath it — the run `breached` by the wall row and the span and the supports it covers `ruined` by theirs,
  then each repaired by its own op (`repairWall`, `repairRaised`), neither waiting on the other, the landfall's undo
  restoring both;". (VEW-r5-05's T114-3 end superseded: no raised gate.)
* (S4) The runs sentence "Volume 6 runs T110-2's epoch clauses (4) and (5) on its engine (T-V6-47)." → "Volume 6 runs
  T110-2's epoch clauses (4), (5), (7) and (8) on its engine (T-V6-47), and (1)'s founding across a decayed ring
  (T-V6-73)."; §13.8's T110 row: "(T110-2's epoch clauses — the frame growth, and (4)'s and (5)'s circuits, contraction,
  stage growth and route re-solve — from M4 on the hook fixtures, those of (4) and (5) on volume 6's engine with M6-E's
  E2 and E3)" → "(T110-2's epoch clauses — the frame growth, (1)'s founding, (4)'s and (5)'s circuits, contraction, stage
  growth and route re-solve, (7)'s lapse and (8)'s ring road — from M4 on the hook fixtures, those of (1), (4), (5), (7)
  and (8) on volume 6's engine with M6-E's E2 and E3)"; §13.8's T114 row: "and H-AQUA's for T114-3's crossing clause and
  T114-3's regrowth clause on volume 6's engine" → "and H-AQUA's for T114-3's crossing clause on volume 6's engine".

**V01**
* (V1-1) The parts table's rank (l. 978): "a part-0 gate (never an aqueduct's wall arch or a raised gate, V01 §3.17.3
  (6))" → "a part-0 gate (every gate is one: no gate stands on a deck, §2.7's crossing table)".
* (V1-2) The gate approach (l. 1424–1425): "An aqueduct's arch through a curtain wall and a raised gate at deck level are
  wall openings, not gates: no gate portal, no gate plaza and no wall-side feature reads them (V01 §3.17.3 (6))." → "An
  aqueduct's arch over a curtain wall is no gate: no gate portal, no gate plaza and no wall-side feature reads it (V01
  §3.17.3 (6))."
* (V1-3) §3.17.3 (6): "6. **Wall openings are not gates.** An aqueduct's arch through a curtain wall and a viaduct's or
  elevated road's raised gate at deck level are wall openings: no gate portal, no `gate` rank or kind factor, no gate
  plaza, no wall-side feature and no S9b square reads them." → "6. **A raised way over a wall is no gate.** A raised way
  meets a wall by §2.7's crossing table, never with a gate or an opening: an aqueduct's arch over a curtain and a deck
  over a wall laid after it give no gate portal, no `gate` rank or kind factor, no gate plaza, no wall-side feature and no
  S9b square."
* §3.17.3 (2) and §3.17.4 are VAF-R5T-02's and VAF-R5T-03's own FIXes (VAF-R5T-02 amended in Part H).

**V04**
* (V4-1) §3.5.4 (d) (1) **Lay**: "Each span of use `vault` has one chamber" → "Each span of use `vault` that no wall stands over — none of whose
  under-deck strip an enceinte's band or wall strip meets — has one chamber (under a wall no chamber is laid, whatever the
  runs' condition: the span reads as the `open` one the span rule makes there at generation, the arch beneath the band
  walled up by the run; §2.7's crossing table, *beneath*)".
* (V4-2) (3) **Remove**: "Every arch vault of the way whose span no longer exists or whose use is `open`," → "Every arch
  vault of the way whose span no longer exists, whose use is `open` or over which a wall now stands,".
* (V4-3) §1b's `ArchVaults.reconcile` row (l. 328), its trigger cell adds "; the commit of every enceinte band or wall strip
  laid, moved or removed over a `vault` span's under-deck strip — a hand `drawWall`, a moved trace vertex, a re-anchored
  stretch, `repairWall`'s bend, a hand `delete` of a run or of the enceinte, `wallToWay`, an absorbed record dropped; at an
  epoch a circuit, contraction or re-anchored stretch through `EpochScope.raised` (V06 §2.1); at a village derivation
  VS3's palisade".
* (V4-4) The arch-vault entity row (l. 867): its writer cell adds the same commits; its "**removed** in the same commit as
  its raised way is deleted, generated or drawn, or its span is gone or set `open`" → "**removed** in the same commit as
  its raised way is deleted, generated or drawn, its span is gone or set `open`, or a wall comes to stand over its span (laid
  again, its id kept by its key, when none stands over it any more)".
* (V4-5) The edit row (l. 2577): "(a crossing station's band stretch where the way is created across a standing wall,
  §2.7's support step (3))" is deleted.
* (V4-6) §3.10's epoch reconcile: after "re-lays those of a raised way whose deck the frame growth extended (…)", add ",
  removes those of a `vault` span a wall the epoch laid or moved now stands over and lays again those of one no wall
  stands over any more (V04 §3.5.4 (d) (1))".
* (V4-7) T-V4-62: "an arch vault in exactly each `vault` span" → "an arch vault in exactly each `vault` span no wall stands
  over".
* (V4-8) T-V4-63: "on a CITY fixture whose viaduct holds a `vault` span with its arch vault, passed beneath by an epoch
  circuit and, on a second run, by a hand `drawWall` (§2.7's support step (6) (d)) — the `vault` span's arch vault taken
  into the line, never entered, and no arch vault changed by either —" → "on a CITY fixture whose viaduct holds a `vault`
  span with its arch vault, passed beneath by an epoch circuit and, on a second run, by a hand `drawWall` (§2.7's
  crossing table, *beneath*) — that arch vault removed with its door, links and accesses in the wall's commit (the hand
  case a fate, its undo restoring it with the same id), no other arch vault changed, and the hand wall's delete laying it
  again with the same id —"; its bar "no chamber stands under an `open` span" adds "or in a `vault` span a wall stands
  over"; and VV34-r5-02's text (its own FIX).

**V05**
* (V5-1) §3.16 (4)'s landfall table (l. 1342): "raised-way pier (its footprint; a crossing station's support is its wall
  stretch, §2.7: the wall row's breach)" → "raised-way pier (its footprint)", and "a span whose pier is ruined — or whose
  crossing station's stretch the wall row breaches — becomes `ruined` with it" → "a span whose pier is ruined becomes
  `ruined` with it (a wall run beneath it breached by the wall row as any run the footprint covers)".
* (V5-2) §3.16 (5) (l. 1353): "— never a deck plot, which is tombstoned with its deck and listed as a fate, nor a crossing
  station's support, which is its wall stretch (the wall row) —" → "— never a deck plot, which is tombstoned with its deck
  and listed as a fate —".
* (V5-3) T-V5-14's clause (l. 2556–2562), from "**A raised gate** (T114-3's landfall clause):" to "the landfall's undo
  restores the stretch and both spans." → "**A raised way over a wall** (T114-3's landfall clause): on a fixture whose
  footprint covers an aqueduct's span and the run beneath it, the run `breached` by the wall row and the span and the
  supports it covers `ruined` by theirs, `members` holding the span and the supports; then the deck's repair, by hand
  and, on a second run, by V06 §3.19.2 (5) at the next epoch — `repairRaised` alone, no `repairWall` (§2.7's crossing
  table, *unchanged meeting*) — and the landfall's undo restoring the run and the span."

**V06**
* (V6-1) W68's middle cell → "the trace's cost field and strip rule; the meeting by §2.7's crossing table (*beneath*; a
  founding *over the band* or *down before the wall*), counted `walls.raisedCrossings` (V06 §2.10); `wallToWay`'s ring
  road by §2.7's way-and-channel table", its home cell "§2.7's support step (3), (6)" → "§2.7's crossing table".
* (V6-2) W79: "V06 §3.7.2 (3)'s dismantling on a cleared record, a stretch under a crossing station whose deck stands
  excepted (V06 §3.7.6 (5))" → "V06 §3.7.2 (3)'s dismantling on a cleared record".
* (V6-3) §2.1's `EpochScope.raised` comment: "whose `feet`, `supports` or `spans` an epoch op, a landfall (sky.islands) or
  the frame growth changed, address order" → "whose `feet`, `supports` or `spans` an epoch op, a landfall (sky.islands)
  or the frame growth changed, or whose `vault` span a wall the epoch laid, moved or removed now stands over or no longer
  stands over (V04 §3.5.4 (d) (1)), address order".
* (V6-4) §2.8's `repairRaised` comment: "(a support a topple or a landfall ruined; beside a crossing station, whose support
  is the wall's band, a `repairWall` of its `breached` or `dismantled` stretch first, in the same batch, in item 114's
  patch material — §2.7's support step (3), V06 §3.19.2 (5))" → "(a support a topple or a landfall ruined)".
* (V6-5) §2.10's `raisedCrossings` comment → "meetings of a trace this epoch laid with a standing raised way, and channels
  stopped at its under-deck strip's edges (§2.7's crossing and way-and-channel tables; V06 §3.7.6 (5))".
* (V6-6) §3.7.1's widening: "excepted where the trace meets it (the trace running on beneath its deck, its strips
  stopping there, §2.7's support step (6) (d))" → "excepted where the trace meets it (§2.7's crossing table, *beneath*)".
  (VM-R5T-01's and VPC-R5-01's V06 ends superseded.)
* (V6-7) §3.7.2 (2): "A stretch under a crossing station whose deck stands — a raised gate's, or a wall opening's under
  an aqueduct — is no candidate, filtered before the draw (J-V6.7), until that raised way is removed or the spans on both
  sides of its crossing station have fallen (`ruined` or `cleared`; §2.7's support step (3); V06 §3.7.6 (5))." is deleted.
* (V6-8) §3.7.2 (3): "until every run is `dismantled` but a stretch under a crossing station whose deck stands (V06 §3.7.6
  (5));" → "until every run is `dismantled`;". §3.7.2 (1) stands: every gate is on ground part 0 (VDC5-04's case cannot
  occur).
* (V6-9) §3.7.4 (4)'s contraction: "a deck passing over the trace takes none, §2.7's support step (6) (d))" → "a deck
  passing over the trace takes none, §2.7's crossing table)".
* (V6-10) §3.7.6 (5), its bullets after "meets the standing raised ways by these rules:" → "* a raised way's **support
  footprint is a footprint** for V06 §3.7.1's strip rule (but where the trace meets it, V06 §3.7.1) and is
  **impassable** in V06 §3.7.4 (2)'s cost field (it is never demolished for a wall); * the trace meets it by §2.7's
  crossing table, *beneath* — its band laid through each support, ramp, stair or foot standing in it, no station, gate or
  opening made, no gate or tower in the under-deck strip, the moat by §2.7's way-and-channel table — and `wallToWay`'s
  ring road crosses its under-deck strip by that table (row c), with **no junction** with it; * **continuity**: a trace
  never waits for a raised way; only its moat stops, at the under-deck strip's edges where it cannot pass beneath,
  reported (`walls.raisedCrossings`, V06 §2.10) — `walls.waited` kept for the other continuity rules (the water access of
  (2), the occupied footprints of V06 §3.7.4 (3)); * `absorbWall` and `wallToWay` leave standing every raised way the old
  line meets, and V06 §3.7.2 (2)'s dismantling takes every run, a run beneath a deck among them (*unchanged meeting*)."
* (V6-11) §3.7.7 (2): "The breaches pass over a stretch under a crossing station while its deck stands (§2.7's support
  step (3)), as V06 §3.7.6 (5)'s dismantling does — its `worn` or `patched` → `breached` draw not taken, filtered before
  the draw (J-V6.7) — so the band carrying the deck never breaches under it; it may still wear, and a repair writes it as
  any run." is deleted.
* (V6-12) §3.11's stone weight (l. 2148–2151): ", passing over the stretch under a crossing station while its deck stands
  (§2.7's support step (3))" and " — never a crossing station's, whose support is the wall's band (§2.7's support step
  (3))" are deleted.
* (V6-13) §3.19's lead: "and a later wall trace runs on beneath its deck (V06 §3.7.6 (5))" → "and a wall meets it by
  §2.7's crossing table (V06 §3.7.6 (5))".
* (V6-14) §3.19 (5): "where the course crosses a standing curtain it passes through a **wall opening** (an aqueduct) or a
  **raised gate** (a viaduct or an elevated road) added as S7 furniture in the commit (V06 §3.7.6 (5))" → "a course
  meeting a standing curtain meets it by §2.7's crossing table — an aqueduct *over the band*, its under-deck strip clear
  of the curtain's towers and gates (impassable above), a road deck *down before the wall* (its course coming down before
  the trace and crossing it on ground part 0, else re-routed or not founded, reported)". (VEW-r5-03's V06 end
  superseded: no repair is owed.)
* (V6-15) §3.19.2 (3): " — never a crossing station's: its support is the wall's band, read from its stretch's
  `condition`, which once both spans have fallen decays as the wall's (V06 §3.7.7 (2)) and is never dismantled as a
  support (§2.7's support step (3))" is deleted.
* (V6-16) §3.19.2 (4): " — never a crossing station's (§2.7's support step (3); V06 §3.11.4)" is deleted; "a landfall
  ruins the spans and supports it covers whatever their state, and over a crossing station breaches its stretch and ruins
  the spans beside it (§2.7's support step (3))" → "a landfall ruins the spans and supports it covers whatever their
  state (a run beneath them breached by the landfall's wall row, V05 §3.16)".
* (V6-17) §3.19.2 (5): "(its ruined supports with it; beside a crossing station whose stretch is `breached` or
  `dismantled`, a `repairWall` of that stretch first, in the same batch, in item 114's patch material — the row V06
  §3.7.7 (3) draws, a `dismantled` stretch taking the op's bend, a new stretch drawn on its line (V06 §2.8) — so no deck
  stands on a fallen wall, §2.7's support step (3))" → "(its ruined supports with it)".
* (V6-18) §7's H-AQUA: VV56-r5-03's FIX as amended in Part H · V06 (the aqueduct *over the band*, the viaduct *down
  before the wall* and laid across by the METROPOLIS circuit).
* (V6-19) §7's T110-2 row → "| T110-2, its epoch clauses (4), (5), (7) and (8) | T-V6-47 | on H-AQUA, an epoch circuit
  across its standing aqueduct, one across its standing timber elevated road and its contraction across its aqueduct,
  each run again locked and pinned, *beneath* (§2.7's crossing table); an epoch stage and route re-solve crossing a
  standing raised way only under a span §4.3 admits; the aqueduct's lapse beneath its circuit; `wallToWay`'s ring road |";
  §7's T114 row: "the crossing stations over 20 epochs on H-AQUA; the station's regrowth on H-AQUA" → "the run beneath the
  aqueduct over 20 epochs on H-AQUA; its aqueduct founded across the decayed ring (T110-2 (1))".
* (V6-20) T-V6-11: "and after `absorbWall` every run is `dismantled` in time but one holding a raised gate under a
  standing deck or a wall opening under a standing aqueduct, each taken from the epoch after that raised way's removal
  (…) and, on a second run of each, from the epoch after both spans beside its crossing station have fallen (a scripted
  `topple` of the support next to the station on either side), never before (§2.7's support step (3))" → "and after
  `absorbWall` every run is `dismantled` in time, the run beneath a standing deck among them (on H-AQUA, its CITY ring
  once the METROPOLIS circuit supersedes it, its fate set to `absorb` by a hand `setAttr`, the aqueduct over it standing;
  §2.7's crossing table, *unchanged meeting*), V04 laying again the arch vault of a `vault` span the old wall stood over
  once the record is dropped".
* (V6-21) T-V6-47: its H-AQUA clauses and bar → "on H-AQUA an aqueduct is met by both a new circuit and a later
  contraction, each *beneath* (§2.7's crossing table) — the band laid through each support, ramp or stair in it, a run
  beneath each standing span capped at its soffit, no station, gate or opening made and no gate or tower in the under-deck
  strip, the strips laid as anywhere and the moat passing beneath only where it meets no support, ramp, stair, foot or
  `vault` span's strip, each meeting counted in `walls.raisedCrossings`; its viaduct, which the METROPOLIS circuit meets,
  gets no gate on its deck, its crossing no gate of that circuit's count (gates counted on ground part 0); `wallToWay` of
  its CITY ring (once the METROPOLIS circuit supersedes it, its fate set to `road` by a hand `setAttr`) and, on a second
  run, of its METROPOLIS circuit by a hand `convert` after the contraction — the ring road crossing each under-deck strip
  under a span §4.3 admits, else ended at the strip's edges, no junction with a raised way, the raised ways unchanged;
  **later work across a standing raised way** on H-AQUA (takes T110-2's epoch clauses (4), (5), (7) and (8)): an epoch
  circuit across its standing aqueduct, one across its standing timber elevated road and its contraction across its
  aqueduct, each run again with the raised way locked and with it pinned — the same outcome, no trace waiting, every
  station, key, span and state unchanged; an epoch growing a stage over the aqueduct's land and an epoch route re-solved
  under its viaduct — 0 way corridors over a support ring, ramp, stair, foot or `vault` span's strip, every crossing under
  a span §4.3 admits; after the METROPOLIS circuit ran on beneath the aqueduct, a `vault` span in the circuit's band
  breached and a support in the band dismantled by scripted `DeclineOp`s (as its lapse's salvage would, V06 §3.19.2 (3);
  E3's ops) — and, on a second run, the timber elevated road deleted by hand: the run whole across each former part and at its own top beneath each
  fallen span, the circuit's closure unchanged, the delete's undo restoring the cap" | "0 sheer-arc edges; 0 crossing
  stations, 0 gates on a deck, 0 gates or towers in an under-deck strip; 0 wall runs above a standing span's soffit; 0 gaps
  in a band where a raised-way part went; 0 arch vaults in a `vault` span under a wall; 0 stations moved, added or
  omitted and 0 keys minted on a standing raised way, locked or not; 0 way corridors over a support ring, ramp, stair, foot
  or `vault` span's strip; exact". (VPC-R5-02's, VV56-r5-01's, VV56-r5-02's, VDC5-04's and VV56-r5-03's T-V6-47 ends, as
  one text.)
* (V6-22) T-V6-73: from "**under a crossing station**:" to "the hand repair's undo restoring the gap and the spans;" →
  "**beneath a raised way** (T114-3's crossing clause): on H-AQUA's CITY ring held neglected and poor over 20 epochs, the
  run beneath its masonry aqueduct decaying through `worn` to `breached` as every other run, the aqueduct standing on its
  own supports (§2.7's crossing table, *unchanged meeting*); **a founding across a decayed ring** (T110-2 (1)): H-AQUA's
  aqueduct founded at its CITY epoch where the ring's run at its course is `breached` and, on a second run,
  `dismantled` — *over the band*, the gap left a gap beneath the arch, no `repairWall`;".
* (V6-23) V06 §8's E3 tests cell: VV56-r5-04's FIX as amended in Part H · V06 (the topple clauses are gone).
* (V6-24) The decisions. **J-V6.91** → "chose that a raised way and a curtain never bear on each other — an aqueduct
  created across a standing curtain crosses it on a span over its band, a road deck comes down before it, and a trace laid
  after a raised way runs on beneath its deck with its band laid through the supports in it — with continuity a hard
  rule (a moat that cannot pass beneath stopped at the under-deck strip's edges and reported, never a trace waiting;
  §2.7's crossing table), over a station on the curtain, routing the trace around the raised way or re-siting its piers,
  because aqueducts crossed walls on their own arches, roads came down to gates, town walls were built against standing
  aqueduct piers, and a deck that never rests on a wall needs no rule for the wall's decay". **J-V6.114** → "*amended
  by §2.7's crossing table.* Chose that V06 §3.7.2 (2)'s dismantling of a superseded or absorbed curtain takes every run,
  a run beneath a standing deck among them, over keeping a stretch for a gate tower, because no deck rests on a wall (the
  pool holds no enceinte part, as before)". **J-V6.140** → "*amended by §2.7's crossing table.* Chose that an aqueduct
  created across a standing curtain keeps its supports off the curtain's band alone — its setback, glacis and berm no
  obstacle — so a span over the band passes, over a station whose pier is the wall's band, because a span over the whole
  wall strip and its setbacks would pass `maxClearSpanM`, and a span over the band alone never does".

**V07** — VAL-R5-03's own FIX, as R6-02 words it in Part H · V07 (§3.5a (4), §3.17's row, T-V7-48).

**V09**
* (V9-1) §4.9's `bend.wall.held` row is deleted.
* (V9-2) `bend.wall.raisedCrossing`: its words "The wall runs on beneath {way}, built against its piers; the raised way
  stays as it is." → "The wall runs on beneath {way}, its piers built into the wall; the raised way stays as it is."; its
  source cell → "§7.1's outcome row for a hand `drawWall`, a moved trace vertex or a re-anchored stretch across a standing
  raised way, locked, pinned or neither (§2.7's crossing table, *beneath*)".
* (V9-3) `bend.wall.aqueductArch`: its words "The wall lets the aqueduct through by an arch." → "The aqueduct crosses the
  wall on one of its arches."; its source cell adds "(§2.7's crossing table, *over the band*)".
* (V9-4) `bend.raised.wall`: its source cell "file f item 363" → "file f item 363 (§2.7's crossing table, *down before the
  wall*)".
* (V9-5) §4.20.2 (4) → "4. **Walls** (file f item 363; J-V9.61). A raised way and a wall meet by §2.7's crossing table: a
  raised road or viaduct whose course meets an enceinte's trace ramps down to a ground vertex before it and passes through
  the gate the ground way makes there (*down before the wall*; `bend.raised.wall`); an aqueduct drawn across a standing
  wall crosses it on one of its arches, its supports off the band and its course clear of the wall's towers and gates,
  never a gate (*over the band*; `bend.wall.aqueductArch`, its ghost drawing the arch mark); a wall T3 `wall` draws, a
  trace vertex moved or a stretch re-anchored across a standing raised way runs on beneath its deck, its piers built into
  the wall, nothing of the raised way changing (*beneath*; `bend.wall.raisedCrossing`); a **Change over time** breach,
  dismantle or delete of a wall beneath a deck acts as on any wall; and a ground road T4 `road` draws or a way moved across
  a raised way crosses under the nearest span §4.3 admits, a road no span admits going round it, and a carve's channel
  passes beneath where it meets no support, ramp, stair, foot or `vault` span, else moves along the deck to the nearest
  crossing that meets none, else stops at the under-deck strip's edges (§2.7's way-and-channel table;
  `bend.raised.underSpan`, `bend.raised.around`) — each the same on a raised way locked, pinned or neither." (VDC5-01's
  V09 end is written in these words.)
* (V9-6) T-V9-52: "an aqueduct passes a wall by an arch, never a gate" → "an aqueduct passes a standing wall on one of its
  arches, its supports off the band, never a gate"; from "a wall drawn across a standing viaduct runs on beneath its deck,"
  to "and keeps the gate tower carrying the deck, with `bend.wall.held`;" → "a wall drawn across a standing viaduct runs on
  beneath its deck, its piers built into the wall, no gate on the deck, every station, key and span unchanged, with
  `bend.wall.raisedCrossing`, and the same with the viaduct locked; a breach and a delete of that wall act as on any wall,
  the viaduct unchanged;"; after "and one wider than every `open` span goes round it, with `bend.raised.around`" add VDC5-02's
  V09 end ("; a carve across a viaduct passes beneath clear of its piers, with `bend.raised.underSpan`, and one too wide
  for every gap between its piers stops at the under-deck strip's edges, with `bend.raised.around`"); and "(§2.7's support
  step (3), (6); T110-2)" → "(§2.7's crossing and way-and-channel tables; T110-2)".

**V11**
* (V11-1) §3.24.2's readers: "(`stripMarginM`, §4.6; at S5a and S7 a later wall's strips and berm stop at its edges, its
  gates and towers moved clear, §2.7's support step (6) (d))" → "(`stripMarginM`, §4.6; a wall meeting it by §2.7's
  crossing table, its gates and towers kept out of it)". (VM-R5T-01's V11 end superseded.)
* (V11-2) Registry row 80's reader cell: "S5a and S7 (a wall laid after a raised way meeting its under-deck strip at
  `structure.stripMarginM`, §2.7's support step (6) (b), (d), §4.4 S5a, §4.8;" → "S5a and S7 (a wall meeting a raised way's
  under-deck strip at `structure.stripMarginM`, §2.7's crossing table, §4.4 S5a, §4.8;".

**Sweep (the four blind spots).** (a) V07: §3.5a (3)–(4), §3.12's hand-off (the standing fabric — stands), §3.12a (4)'s
ruin abutment ("abuts it as it abuts a support" — stands: a ruin is no wall), §3.17's palisade row, T-V7-48 — in VAL-R5-03's
text below. (b) V09 and V10: V09 §4.9's five rows, §4.20.2 (4), T-V9-52 (above); row 39 names no crossing (stands); V10
states no crossing rule (searched: no crossing station, raised gate, wall opening or support step). (c) Tests, fixtures
and cells: T110-2, T114-3, §13.8's T110 and T114 rows, the runs sentence (S1–S4); T-V4-62, T-V4-63 (V04); T-V5-14 (V05);
T-V6-11, T-V6-47, T-V6-73, V06 §7's T110-2 and T114 rows, §8's E3 cell (V06); T-V7-48 (V07); T-V9-52 (V09); V12's
`item110.*` pin row and H-AQUA's suite (VAP-r5-03; no crossing statistic). (d) The base's summaries: §5.3's two rows and
§5.4's comment (D1–D3); §4.13's row (P11); §7.3's and §7.4's rows (D10); §13.8 (S4); §7.7 and §14 name no crossing
(searched). V02, V03, V08, V10 and V12 need nothing more.

### R6-03 The late calamity's whole life, ruled once: it waits in the dossier, never in the binding

**Governs:** VEL5-r5-01, VV78-r5-01 (pipeline); VEL5-r5-02, VEL5-r5-03, VV78-r5-02, VV78-r5-04 (V08); VAT5-r5-01 (V06);
VAF-R5T-01 (V01); VCS-r5-01 (scope). **Supersedes** R5-03's clause "where `W₁` is not after `W₀` (a second absorb in the
last epoch's own week, or a clock turned back) this absorb folds no epoch — the calamity's F5 targets' dossier events
apply now at `W₀` as element events, finished (no Works), and the calamity is held in the binding
(`DossierBinding.lateCalamities`, §7.7) until the first epoch a later absorb folds, which it rides at that epoch's first
week", and with it `DossierBinding.lateCalamities` and every reader R5-03's Ends gave it (§7.7's field, §7.1's
`dossierFacts` member, §7.4's row, V08 §2.3, W20, §2.6's row, §3.6 (3)–(4), §3.17's row, T-V8-49 (g)'s held clauses,
T76-1's). R5-03's other clauses — a late change never folds before `W₀`; with `W₁` after `W₀` a late calamity rides the
first epoch the absorb folds (one folded at `W₁` for it where none other is) at `W₀` + 1 with its F5 targets' events;
every other late change at `W₀` + 1, else at `W₀`, finished, noted; the population move read at the next absorb past
`W₀` — stand.

**The case (round-6 note (2b)).** R5-03 split a late calamity in two where the absorb's week is not after the last epoch's:
its targets applied now, the calamity held in the binding for a later epoch. Each moment of that hold then needed a rule
and had none: the strike on targets already ruined (VAT5-r5-01), the list across an absorb that folds no epoch (VEL5-r5-02),
a line migration (VEL5-r5-03), a detached what-if copy (VV78-r5-01), the note's words (VV78-r5-02), the batch row
(VV78-r5-04), V01's gloss (VAF-R5T-01), the burial need's schedule (VCS-r5-01) — and the current week (VEL5-r5-01).

**The form chosen: the simpler one the verifiers name, taken one step further.** Hold the calamity's targets *with* it, so
targets and strike ride one epoch's first week — and keep the hold where the dossier already keeps it: an absorb whose week
is not after `W₀` simply does not carry the late calamity, its targets' records or a condition naming it. The dossier still
holds all three, so the first later absorb whose week passes `W₀` finds them as newly carried late changes and folds them
by the rule that already exists for `W₁` after `W₀`. There is then nothing held in the binding, so no step of the old hold
can be left open: a later absorb needs no rule (it finds them, or, before `W₀` again, leaves them), a migration none (an
uncarried change has no binding key to re-key), a fork none (an uncarried change is a dossier change the copy never
receives, V06 §4.4), and the strike always meets its targets in the same epoch, struck in place (V06 §3.11.1). The cost,
said plainly: a calamity dated in the last epoch's own week appears on the map at the next update after that week (one sync
later), its ruined targets with it — never before its strike. The form with the binding list (R5-03, its targets applied at
the hold) is rejected because it leaves five steps to rule and a strike on targets already ruined on its common path.

**Owner rules checked.** Item 122 (a): what a crisis leaves "reaches the map only by the existing path (the calamity and the
population change into the next epoch, V06's hazard phase …)" — the calamity reaches the map only through an epoch, now
always with its targets. Item 125 (a) ("the dossier is the only SettlementForge data input") and its readable values never
replaced: nothing is replaced; a late calamity is carried one absorb later, the dossier unchanged. Item 125 (b) ("never
refuses, never stalls, and is reported"): no absorb is refused or stalled; the deferral is noted. Item 76 (the clock in weeks)
and item 20's immutable dossier: the current week never falls back (VEL5-r5-01's (1)).

**The life, as one sequence (home §4.11 *The clock* (4); each step's writer and test):**
1. **Carried late, `W₁` after `W₀`** — the port carries the calamity in the absorb's `dossierFacts`; it rides the first
   epoch the absorb folds (one the port folds at `W₁` for it where none other is), its `EpochInputs.events` entry at `W₀` +
   1, its F5 targets' dossier events in that epoch's `EpochInputs.dossier` at the same week, struck in place; noted by
   `unreceipted_change`'s `lateCalamity` variant. Writer: `DossierPort.absorb` (V08 §3.6 (3)). Test: T-V8-49 (g), T76-1.
2. **Late, `W₁` not after `W₀`** — the absorb carries neither the calamity, nor the records of its F5 targets, nor a
   condition naming it: their carried facts stay as they were, no event emitted for them, noted by the `lateDeferred`
   variant; every other late change of the absorb folds at `W₀`, finished, as before. Writer: the port's diff (V08 §3.6
   (3)). Test: T-V8-49 (g).
3. **Each later absorb** — one whose week is not after `W₀` finds them again and leaves them again (step 2); the first
   whose week passes `W₀` finds them newly carried and late and folds them by step 1 — with no year end, crossing or other
   calamity, the epoch the port folds at its week for the calamity. Writer: the port. Test: T-V8-49 (g) (VEL5-r5-02).
4. **A fork or a what-if copy** — a calamity left uncarried by step 2 is a dossier change the original has not absorbed,
   so it does not reach the copy, which no later dossier change reaches (V06 §4.4): nothing is held and nothing is lost.
   Writer: none. Test: none needed (no state to carry); V06 §4.4 says it.
5. **A line migration** — an uncarried change has no binding key; the migrating absorb (or a later one) mints its key
   by the new line as for any change. The binding's own list, `quarantined`, is re-keyed by the `fromLines` entry
   (VEL5-r5-03's other half). Writer: V08 §3.8. Test: T-V8-11.
6. **The strike** — in the epoch it rides, at its first week, its targets struck in place (V06 §3.11.1: the hazards phase
   reads the epoch's F5 records tied to it, the targets close as ruined where they stand). A target whose F5 record an
   earlier event applied — SettlementForge changing a target's record before it carried the calamity — is struck by no op,
   kept `ruined`, counted as struck (VAT5-r5-01's rule, as amended in Part H · V06). Writer: V06's hazards phase. Test:
   T-V6-27.
7. **The current week throughout** — the greatest week the folded events carry (§4.11 *The clock* (1), VEL5-r5-01): a
   late change folded at `W₀` + 1 or `W₀` after an event of a later week never moves it back.

**Decision. §4.11 *The clock* (4)** (pipeline's home), from "A newly carried change dated at or before the last epoch's week
`W₀` is **late**:" to "…crosses at the next absorb whose week passes `W₀` (V08 §3.6 (3))." →
"A newly carried change dated at or before the last epoch's week `W₀` is **late**: it never folds at a week before `W₀`. A
late **calamity** folds no epoch at its own week and is never lost. Where the absorb's week `W₁` is after `W₀` it rides the
first epoch this absorb folds (`DossierPort.absorb`; with none, the port folds one at `W₁` for it), its
`EpochInputs.events` entry at that epoch's first week `W₀` + 1 and its F5 targets' dossier events in that epoch's
`EpochInputs.dossier` at the same week, struck in place (V06 §3.11.1). Where `W₁` is not after `W₀` (a second absorb in the
last epoch's own week, or a clock turned back) the absorb carries neither the calamity, nor the records of its F5 targets,
nor a condition naming it — their carried facts stay as they were, noted (`unreceipted_change`'s `lateDeferred` variant,
V08 §4.6) — so the first later absorb whose week passes `W₀` finds them newly carried and folds them by the rule before;
nothing is held in the binding, and a copy forked meanwhile never receives them (V06 §4.4). Either way its own tick stays in
its receipt, its hazard strikes once and its deaths reach the burial need. Every other late change folds after the last
epoch at `W₀` + 1 where `W₁` is after `W₀`, else at `W₀`, applied finished (no Works), noted (`unreceipted_change`'s `late`
variant, V08 §4.6); a population move carried by an absorb whose week is not after `W₀` crosses at the next absorb whose week
passes `W₀` (V08 §3.6 (3))." And **(1)**: VEL5-r5-01's text as written ("the greatest week the folded events carry, so an
event folded after one of a later week … never moves it back").

**Ends.**
* **pipeline** — (1) and (4) above (VEL5-r5-01, VV78-r5-01's own FIXes); T76-1 is scope's.
* **model** — §2.9's `EpochRecord` comment: VEL5-r5-01's end, as written ("the greatest week the folded events carry").
* **determinism** — §7.7's `DossierBinding`: the `lateCalamities` line is deleted; §7.1's `dossierFacts`: its member
  "lateCalamities: string[] /* the whole held list after this absorb (§4.11 *The clock* (4); V08 §3.6 (4)) */; " is deleted;
  §7.4's `dossierFacts / dossierRecord` row: "`DossierBinding.quarantined`, `.lateCalamities` and `.notes` among it, each
  rebuilt by folding the `dossierFacts` events, §7.7; `lateCalamities` read by the port's next absorb, §4.11 *The clock*
  (4))" → "`DossierBinding.quarantined` and `.notes` among it, each rebuilt by folding the `dossierFacts` events, §7.7)".
* **scope** — J-A67.45's index row: VEL5-r5-01's end, as written; T76-1: "else the first epoch a later absorb folds, held
  meanwhile in `DossierBinding.lateCalamities`; §4.11 *The clock* (4))" → "else, carried by no absorb whose week is not
  after the last epoch's, by the first later absorb whose week passes it, by the same rule; §4.11 *The clock* (4))"; "and
  one carried by a second absorb in the last epoch's own week — no epoch, its targets applied, the calamity riding the next
  absorb's first epoch at that epoch's first week, its deaths in that epoch's burial need;" → "and one dated in the last
  epoch's own week reaching a second absorb in that week — no epoch and nothing of it carried, then carried by the next
  absorb past that week, riding its first epoch at that epoch's first week with its targets struck in place, its deaths in
  that epoch's burial need (that clause from M6-E's E8, V06 §3.18.2 (3));"; "the document's current week never before it"
  → "the document's current week never before it nor before the week of any event an earlier absorb folded"; §13.8's
  T76-1 row: VCS-r5-01's timing cell, as written. (VCS-r5-01's and VEL5-r5-01's scope ends.)
* **V08** — §2.3's lead: "`quarantined`, `lateCalamities` (the held late calamities, V08 §3.6 (3)) and `notes`" →
  "`quarantined` and `notes`"; W20: "`.quarantined`, `.lateCalamities`, `.notes`" → "`.quarantined`, `.notes`" and its
  reader cell's "; each held late calamity's ride on the first epoch a later absorb folds (3.6 (3))" deleted; §2.6's
  `DossierBinding.lateCalamities` row deleted; §3.6 (3): "with `W₁` not after `W₀` its F5 targets' dossier events apply
  now at `W₀`, finished, and it is held in `DossierBinding.lateCalamities` (§7.7; (4)) for the first epoch a later absorb
  folds, which it rides at that epoch's first week; its tick kept in its receipt either way;" → "with `W₁` not after `W₀`
  this absorb carries neither it, nor its F5 targets' records, nor a condition naming it — their carried facts unchanged,
  noted by `unreceipted_change`'s `lateDeferred` variant (V08 §4.6) — and the first later absorb whose week passes `W₀`
  carries them by this rule; its tick kept in its receipt either way, noted by the `lateCalamity` variant when carried;";
  the calamities' parenthesis "(one carried late: of the first epoch this absorb folds, or for one held a later absorb's, at
  that epoch's first week — its F5 targets' dossier events riding that epoch's `EpochInputs.dossier` with it at `W₀` + 1
  where `W₁` is after `W₀`, above and (6))" → "(one carried late: of the first epoch this absorb folds, at that epoch's
  first week `W₀` + 1, its F5 targets' dossier events riding that epoch's `EpochInputs.dossier` with it, above and (6))";
  "; a held one's from its carried `calamity` fact under the held key" deleted; §3.6 (4): "`dossierFacts { changes,
  quarantined, lateCalamities, notes, notesCleared }`" → "`dossierFacts { changes, quarantined, notes, notesCleared }`",
  "and the whole held list of late calamities after it (`lateCalamities`: the binding's list less each calamity the first
  epoch this absorb folds carries, plus each late calamity this absorb holds, (3))" deleted, and "and
  `DossierBinding.lateCalamities` to the held list" deleted; §3.6 (6) and ## 6's batch row: VV78-r5-04's texts; §3.8:
  VEL5-r5-03's `quarantined` re-key; §3.17's row: "a late calamity's targets applied and the calamity held for the next
  folded epoch" → "a late calamity, its targets' records and a condition naming it not carried, noted `lateDeferred`, the
  next absorb past `W₀` carrying them by V08 §3.6 (3)"; §4.6's row: VV78-r5-02, amended; T-V8-49 (g) and T-V8-11: the
  issues' texts as amended in Part H · V08.
* **V06** — §4.4's `forkAt`: after "so no later dossier event reaches it;" add "a late calamity an absorb left uncarried
  (§4.11 *The clock* (4)) is such a change, so it never reaches the copy;"; §3.11.1, §3.21's hazards row and T-V6-27:
  VAT5-r5-01, amended.
* **V01** — VAF-R5T-01, amended (its four sites).

**Sweep.** (a) V07: no late-calamity text (searched `late`, `held`, `lateCalamities`). (b) V09's history panel and V10's
`read_map` of a calamity read the folded events and need nothing; V10's port answers name no held list (searched). (c)
Tests: T-V8-49 (g), T-V8-11, T76-1 and its §13.8 row, T-V6-27 (in the texts); T-V1-60 (d) (VAF-R5T-01); T-V6-24's catch-up
fixtures are unaffected (their calamities are on time). (d) §7.7 item 10 and §14's port comments name no held list
(searched); §7.4's row (above).

### R6-04 Find's chips at a drawn week: T120-6 and V12's `time.findGlow` take the timing R12-35 names

**Governs:** VAP-r5-01 (scope; VRC4T-04 and VCS-r5-02 MERGED into it, graded once MAJOR — R6-01); ends at V12. Closes
repair-r5-rendering's and repair-r5-V12's open hand-offs. R5-05 (b)–(c) stand.

**Owner rules checked.** Item 120 (f): "Every commit, regenerate, undo, advance of time and season change re-evaluates the
chips at once"; item 120 (j)–(k): the interaction times and §12.5's budget; item 119 (d): interaction budgets unchanged —
the re-evaluation budget is §12.5's (R5-05 (b)), nothing new.

**Decision.** The drawn-week re-evaluation is one measurement with three statements that must agree: §12.5 and R12-35
(rendering, written), §13.2's T120-6 and §13.8's row (scope), V12's `time.findGlow` (§3.4's row, §3.15.10's bullet,
T-V12-52). VAP-r5-01's texts, as written, are the scope FIX and V12's END lines: T120-6 adds the drawn-week clause from
the later of M5 and V06's E6, §13.8's cell names that exit, and V12's statistic measures "a drawn week's frame (one that is
not the head) drawn to its chips' re-evaluated glow drawn", with a planted re-evaluation over 100 ms failing it. V12 writes
its three statements in the same round as scope (R6-01 (1)), so neither states a clause the other lacks.

**Sweep.** (b) V09 §4.21.10 (14) and §6.4 cite §12.5 (stand); V10's Find answers name no timing. (c) T-ER-25 and R12-35
(stand); T120-6, §13.8, V12 (above). (d) §13.8's row (above).

### R6-05 The crisis line's forms at the why card, the clerk and the village, and the card that stays open

**Governs:** VV910-r5-01, VV910-r5-02 (V09); VAH-r5-03 (V10; VAT-r5-05 MERGED into it); VV910-r5-03 (V07). R5-08 (a)
stands; this closes its readers in V07 and V10 (blind spots (a), (b)) and the bars that run its forms.

**Owner rules checked.** Item 122 (f): "The 'Why?' card and the clerk name the crisis and its weeks" — one key, one
sentence (J-V9.79) at the card, the clerk and V07's village rows; item 120 (a) (no reader writes): re-asking a view-bound
answer at a view change writes nothing.

**Decision.** (a) **One set of forms.** V09 §4.21.12 (4) is the home of the five forms of a look's line and of its why-card
row (`ruinedFor`, `ruinedForOpen`, `ruinedForUnnamed`, `ruinedForUnnamedOpen`, `ruinedForPreview`). V07 §4.5, W74 and
T-V7-69 (e) name the row "in the form V09 §4.21.12 (4) chooses" (VV910-r5-03, as written); V10's clerk tells a look over a
building in the why card's words — VAH-r5-03's text, with VAT-r5-05's (1) and (2) (§3.9b (8)'s quoted sentence keyed
`info.crisis.ruinedFor` in its form; C10's outcome naming the key), one T-V10-52 clause for the building and the preview
(both issues name it). (b) **Every form run.** T-V9-85 runs the unnamed forms on the card's line and row (VV910-r5-02, as
written). (c) **The card follows its view.** A view-bound why answer is re-asked at each change of its view's `week`,
`yearWeek`, `festival` or `crises` while its card or panel is open, and the `WhyCardModel` row says so (VV910-r5-01, as
written) — the row then agrees with §2.12's damage-lines row ("recomputed at … each week change").

**Sweep.** (a) V07 §4.5, W74, T-V7-69 (e) — VV910-r5-03. (b) V09 §2.7, §2.12, §5.8, T-V9-85, T-V9-86 — the issues' texts;
V10 §3.9a, §3.9b (8), C10, T-V10-52 — VAH-r5-03. (c) T-V9-85, T-V9-86, T-V10-52 (above), T-V7-69 (e). (d) none in the base
(the forms are V09's strings).

### R6-06 A field a famine bares: the clerk reads it as the card does

**Governs:** VAT-r5-01 (V10; VV910-r5-04 MERGED into it), VRC5T-05 (rendering), VAP-r5-02 (V08). R5-08 (c) stands.

**Owner rules checked.** Item 122 (f) (above): the card names the famine on a bare field (V09 §4.21.12 (4), from §11.2's
`looks` asked with that field), so the clerk must be able to say the same of the same field — VAT-r5-01's form (the read
carries `field`, the clerk names the famine on a bare field and none on a sown one). VV910-r5-04's form (the clerk says a
share of fields is bare, never this one) would make the clerk say less than the card on the same question: two units, two
outcomes; it is not written. Item 117 (seasons a look): a field bare by season is told by its own `why` (its crop stage),
which VAT-r5-01's (5) keeps.

**Decision.** (a) VAT-r5-01's seven texts, as written, at V10 (`read_map`'s `look` takes `field?`, its `over` for a famine
look, §3.5's pass-through, §1.2's row, §3.9b (8)'s *A field under a famine look*, row 34's edges and outcomes, T-V10-52 and
T-V10-50 (33)). (b) The answer's home states what a `building` or `field` naming none returns: `over` absent on every look,
never an error (VRC5T-05, as written, at §11.2), and V10's row 34 cites it. (c) The fixture the field clauses run on is a
famine at severity 0.5 (VAP-r5-02, as written, at V08 §7.1); V09's T-V9-85 and V10's T-V10-52 read the same fixture.

**Sweep.** (b) V09 §4.21.12 (4), §5.8, row 90, T-V9-85 (stand); V10 (above). (c) V12 §3.15.12 and X-V12-5 restate V08 §7.1's
crisis fixtures by citation and need nothing. (d) §11.2's `looks` member (VRC5T-05).

### R6-07 The plan's damage: the entry week and the disaster look at every restatement

**Governs:** VRC5T-03 (scope), VAF-R5T-04, VAF-R5T-05, VV34-r5-04 (V03), VAL-R5-04, VV34-r5-03 (V04). R5-04 stands; this
writes its two conditions — the element's entry week, and "under no disaster look" — at the restatements R5-04's sweep
missed (blind spots (c) and (d)).

**Owner rules checked.** Item 123 (b): an element "shows" damage by the building's decay level, compared from its entry
week (R5-04); item 122 (d): "Interiors in a disaster's ruined neighbourhood show item 123's damage as a look while it
lasts" — so a never-decayed building under a disaster look is not byte-identical while the look stands, and every "never
decayed ⇒ unchanged" statement carries "and under no disaster look".

**Decision.** Each issue's text, as written, with VRC5T-03's END lines; VRC5T-03's V12 END adds the two V12 restatements
its list omits — §2.13's `entityScope` comment ("item 123's buildings whose lineage never held those states (decay level 0,
§2.6 step 7; §6.3)" → "… (decay level 0, §2.6 step 7; §6.3) and over which no disaster look stands at the drawn week
(§10.2 (f))") and §3.7's pin text at l. 1747 ("a building whose lineage never held `abandoned`, `decayed` or `ruined`" →
"… or `ruined` and over which no disaster look stands at the drawn week") — and V03's T-V3-39 (g) end and VV34-r5-04's (f)
are written together. V03 §5.2's export block ("so a never-decayed building's block is unchanged", l. 2513) stands: that
block never carries a look.

**Sweep.** (a) V07's crisis rows read V03's provider (stand). (b) V09 §4.21.13 and row 92, V10 §3.9a — carry both
conditions (R5-04, R5-08). (c) T123-7, T-V3-39 (f)–(g), T-V4-82 (b), UE33's E1, V11 l. 3828 and l. 4649, V12 l. 904–905,
933, 1747, 2761 (above). (d) §6.3, §8.6 (stand).

### R6-08 Item 125 at an absorb: the base's two summaries say what V08 says

**Governs:** VAH-r5-01 (determinism), VAH-r5-02 (scope). R5-07 (a) stands.

**Owner rule checked.** Item 125 (b): "Every dossier field the map uses has a stated standalone fallback … so a missing or
empty field never refuses, never stalls, and is reported" — a record's sub-field is read by its row (R5-07 (a)), and both
summaries must say so.

**Decision.** §7.7 item 10's index clause (VAH-r5-01) and §14's `field_fallback` comment (VAH-r5-02), each as written.

**Sweep.** (d) §7.7 item 10, §14's `PortNote` — the two sites; §14's other port comments name no fallback outcome
(searched). (a)–(c) V08 carries R5-07 already.

### R6-09 Clauses scheduled before their provider

**Governs:** VV12-r5-02 (V02), VV34-r5-01 (V03), VV56-r5-04 (V06, amended), VCS-r5-01 (scope, under R6-03). R5-05 (c) and
INDEX §5 risk 2 stand: a test clause whose provider lands later runs at the first exit after it, each named in its volume.

**Decision.** VV12-r5-02 and VV34-r5-01, as written. VV56-r5-04, amended by R6-02: T-V6-11's and T-V6-73's topple clauses
on a crossing station are gone with the station, so V06 §8's E3 cell adds only "(T-V6-11's sky clause at the later of E3
and V05's P6, which builds the landfall)" and E5's cell is unchanged. VCS-r5-01: T76-1's burial-need clause from M6-E's E8,
in R6-03's T76-1 text with §13.8's cell.

**Sweep.** (c) V02 §8.6, V03 §8's P4 and P5 cells, V06 §8's E3 cell, §13.8's T76-1 row (above); R6-02's new clauses are
scheduled where they are written (T110-2's epoch clauses with M6-E's E2 and E3 — the lapse by scripted `DeclineOp`s, which
E3 builds; T-V6-47 at E3; T-V6-73 at E3).

### R6-10 What a picture, a click and a switch read: public notes, a look's Show, the drawing groups, crisis marks, the DPR timing

**Governs:** VAT-r5-02, VAT-r5-03, VAT-r5-04, VRC5T-02 (rendering); VRC5T-04 (V09). Ends at model, pipeline, V01, V04 and
V09.

**Owner rules checked.** Item 122: "the crisis looks are looks, never the model" — so a crisis mark is no hit-test target
and a click reaches the model thing beneath it (VRC5T-02), and a look's **Show** frames by V09's rule, which reads the look's
units, not only what is drawn (VAT-r5-03). Item 121 (a), (d)–(e): a resolution change applies while the view is settled,
Auto's and a device-pixel-ratio change at most once in 10 s together (§8.8; VRC5T-04 restates it at V09). §2.1's wording
rule ("the toggleable drawing groups … are display-list groups selected by `semantic`, never a fourth model layer"): a
drawing-group switch is style state — §7.4's `setLayer / setStyle / paintGround` row already makes style "canonical,
outside the model digest", logged, undone by its inverse — so `StyleSheet.groups` set by a logged `setStyle` fits the
existing record and event (VAT-r5-04), and V01's choice of style (beside `details` and `shadows`) stands. The knowledge
rule of §11.1 (a picture admits only what its key admits): a public note on a withheld thing is left out (VAT-r5-02).

**Decision.** Each issue's text, as written, but VAT-r5-04 (8), whose test is named: **T-V1-56**'s fixture for V01
§3.18 (e)'s `pins` and `trees` row runs each switch — the group hidden, logged as one `setStyle`, undone, the model digest
unchanged. VAT-r5-04's sweep adds two readers its list omits: §8.2's `hatched` row "(the `pins` and `trees` layers named;"
→ "(the `pins` and `trees` drawing groups named, `StyleSheet.groups`;" (rendering's own text), and V04's J-V4.96 "and the
`pins` toggle" → "and the `pins` switch (`StyleSheet.groups.pins`, §8.2)" (an END under V04).

**Sweep.** (b) V09's entity table (VAT-r5-02's END), T-V9-85 (VAT-r5-03's END), the T12 `dress` row (VAT-r5-04's END),
§4.21.11 (2) and T-V9-84 (VRC5T-04); V10's `entity { at }` reads §11.2's `HitAnswer` (VRC5T-02 — no V10 text names crisis
marks; stands). (c) T-ER-19, T-ER-26, T-ER-27, T-V1-56, T-V9-84, T-V9-85 (above). (d) §2.1's wording rule (VAT-r5-04's
model END), §4.9 (its pipeline END), §7.4's style row (stands).

### R6-11 Fixtures, manifests and bars that must hold their own case

**Governs:** VAP-r5-04 (V07), VV12-r5-01 (V01), VV78-r5-03, VV78-r5-05, VAP-r5-02 (V08), VAP-r5-03, VV1112-r5-01 (V12),
VAP-r5-05 (scope), VDC5-05 (V09). R5-10 stands: a test that names a case runs it on a fixture that holds it, and the
fixture list names that case; a bar that cannot pass is rewritten to the outcome the rule gives.

**Decision.** Each issue's text, as written: T-V7-69's two village mutations (VAP-r5-04); T-V1-59 (f)'s merged fourth
district (VV12-r5-01); T-V8-61 (a)'s `city-1` and probe-town records (VV78-r5-03); V08 §3.17's row citing §3.6 (3)'s target
(VV78-r5-05); the famine at severity 0.5 (VAP-r5-02); V12's pin row naming H-AQUA without its two raised-way edits, with V06's
E1 line an END (VAP-r5-03; R6-02 changes neither edit: the CITY viaduct row's `editTable` and the declared elevated road both
stand in H-AQUA); T-V12-57's second planted case rewritten to a gap re-drawn from the host's clock at a year-position change
(VV1112-r5-01 — §6.1 keeps the drawn E and a running spell's kind and length, so the old clause could not pass); §13.2's
manifest holding the derived fixtures as rows of kind `'derived'` (VAP-r5-05); V09's `bend.raised.around` line for a stopped
channel (VDC5-05, the key R6-02's way-and-channel table (e) gives it).

**Sweep.** (c) V08 §7.1 and §13.2's frozen manifest (VAP-r5-02, VAP-r5-05); V12 §3.15.12 and X-V12-5 cite V08 §7.1 (stand);
V12 §2.13's suites column against V06's E1 line (VAP-r5-03); T-V12-57 against T124-9's year-position fixture (stands).

## Part H — per-unit dispositions (all 73 issues)

Each heading lists the rulings binding the unit (with R6-01), the disposition of every issue it owns, then its **END
lines**: the texts it writes for fixes other units own. Where an END line points to a labelled text of a ruling — R6-02's
(P1) … (V11-2), R6-03's Ends — that text is written exactly as the ruling gives it.

### scope (base §0–§1, §13–§17, the index, INDEX.md)

Rulings: R6-01, R6-02, R6-03, R6-04, R6-07, R6-08, R6-11.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAH-r5-02 | minor | minor | DISAGREE | FIX | R6-08 |
| VAP-r5-01 | major | major | HANDOFF-OPEN | FIX | R6-04; its V12 texts are END lines under V12; closes VRC4T-04 and VCS-r5-02 |
| VAP-r5-05 | minor | minor | MATRIX-GAP | FIX | R6-11 |
| VDC5-02 | major | major | EDGE-UNTESTED | FIX per R6-02 | its clause is T110-2 (5)'s carves in R6-02's (S1), written with VCS-r5-04's (S1); its V09 end is an END line under V09 (V9-6); closes VCS-r5-03 |
| VRC4T-04 | minor | major | EDGE-UNTESTED | MERGED into VAP-r5-01 | graded once with VAP-r5-01 (R6-01): R12-35 names a measurement V12's statistic does not take |
| VRC5T-03 | major | major | CONFLICT | FIX | R6-07; its V12 END adds §2.13's `entityScope` comment and the pin text at l. 1747 (R6-07); its V03, V04 and V11 ends are END lines there |
| VCS-r5-01 | minor | minor | COHESION | FIX per R6-03 | T76-1's burial-need clause from M6-E's E8, inside R6-03's T76-1 text, and §13.8's cell as written |
| VCS-r5-02 | minor | major | HANDOFF-OPEN | MERGED into VAP-r5-01 | the same T120-6 and V12 texts; graded once (R6-01) |
| VCS-r5-03 | major | major | EDGE-UNTESTED | MERGED into VDC5-02 | the same T110-2 (5) clause: R6-02's (S1) runs a carve meeting a support and one too wide for every gap (its "all `vault` spans" variant is the second's case) |
| VCS-r5-04 | major | major | EDGE-UNTESTED | FIX per R6-02 | no crossing station exists, so the clause is R6-02's (S1) (6): a locked regeneration byte-identical and New random with a support in the new band; written with (S1) whole, (S3) and (S4) |

**END lines under this heading:**
* END of VEW-r5-01, VEW-r5-02, VEW-r5-03 and VRC5T-01 (pipeline, model), VPC-R5-02 (pipeline) and VEL5-r5-04's (3)
  (determinism): their fixtures are inside T110-2's text in R6-02's (S1), written once with VCS-r5-04 and VDC5-02 — (1)'s
  founding across a breached and a dismantled run, (2)'s spawned primary, (3)'s span above the ring's top, (5)'s locked
  and pinned runs, (7)'s parts going, (8)'s ring road. *(R6-02)*
* END of VAT5-r5-02 (model): T110-2's frame-growth clause adds VAT5-r5-02's text, as written (R6-02's (S2)). *(R6-02)*
* END of VEW-r5-05 and VM-R5T-02 (pipeline, model): T114-3's crossing, landfall and regrowth clauses → R6-02's (S3). *(R6-02)*
* END of R6-02 (written with VCS-r5-04): the runs sentence and §13.8's T110 and T114 rows → R6-02's (S4). *(R6-02)*
* END of VEL5-r5-01 (pipeline): J-A67.45's index row "(the last folded event's)" → "(the greatest folded week, §4.11 *The
  clock* (1))"; T76-1's "the document's current week never before it" → "the document's current week never before it nor
  before the week of any event an earlier absorb folded". *(R6-03)*
* END of VV78-r5-01 (pipeline): T76-1's held clauses → R6-03's scope text (the second absorb's calamity left uncarried,
  carried by the next absorb past that week), written with VCS-r5-01. *(R6-03)*

### model (base §2)

Rulings: R6-01, R6-02, R6-03, R6-10.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAL-R5-01 | major | major | DISAGREE | FIX per R6-02, amended | the case is removed, not patched: no crossing station exists, so the held-stretch clause it amends is deleted with (M2); the hand-off down is the crossing table's row W9 (*unchanged meeting*). Its V07 side is VAL-R5-03 as R6-02 words it |
| VAL-R5-02 | major | major | HANDOFF-OPEN | FIX per R6-02, amended | no arch vault stands in a `vault` span under a wall (the crossing table's *beneath*; V04's (V4-1)–(V4-8)), so no door meets a run; written with (M7) |
| VAT5-r5-02 | major | major | DISAGREE | FIX | as written: (M9) and (M10); its pipeline, V06 and scope ends are END lines (P10; V06 §3.19's lead; (S2)); closes VV34-r5-02's mechanism (V04's own FIX) |
| VEW-r5-02 | major | major | EDGE-UNDEFINED | FIX per R6-02 | the crossing table's *beneath*: the band laid through, never cut round, the cap read from standing spans only — the outcome the verifier proposes, by construction and no op; its rendering ends are (R1)–(R4), its scope end (S1) (7); V06 §3.19.2 (3)–(4) need no text (no V06 sentence restates the wall there once (V6-15)–(V6-16) are written); closes VV56-r5-02 |
| VEW-r5-03 | major | major | EDGE-UNDEFINED | FIX per R6-02, amended | *over the band*: the band an obstacle whatever its condition, the gap left a gap beneath the arch — no deck rests on the wall, so no repair is owed; the required `repairWall` texts are not written; its V06 end is (V6-14), its tests (S1) (1) and (V6-22) |
| VEW-r5-04 | major | major | CONFLICT | FIX per R6-02, amended | no raised gate exists; a regeneration reproduces the meeting because nothing of it reads the order (row W3); its test is (S1) (6); its §4.8 end is superseded by (P8) |
| VM-R5T-02 | major | major | EDGE-UNDEFINED | FIX per R6-02 | the station and its every life step are gone: (M2), (M3), (M8) are written under this id |
| VRC5T-01 | major | major | CONFLICT | FIX per R6-02 | its first form: the lower of the run's own top and the soffit (the crossing table's *beneath*, with CityJSON's wall objects among its readers); ends (R1)–(R4), (P5), (D7), (S1) (3), (V6-21) |
| VV56-r5-02 | major | major | EDGE-UNDEFINED | MERGED into VEW-r5-02 | the same defect at §2.7; its T-V6-47 end is in (V6-21), its lapse scripted by `DeclineOp`s so it runs at E3 |

**Binding texts this unit writes** (its own FIXes, as R6-02 gives them): (M1)–(M10), with the crossing table and the
way-and-channel table whole, in R6-02's words.

**END lines under this heading:**
* END of VEL5-r5-01 (pipeline): §2.9's `EpochRecord` comment "the week of the last folded event that carries one" → "the
  greatest week the folded events carry". *(R6-03)*
* END of VAT-r5-04 (rendering): §2.1's wording rule "are display-list groups selected by `semantic`, never a fourth model
  layer" adds "— trees and pins switched by `StyleSheet.groups` (§8.2)". *(R6-10)*

### kernel (base §3)

Rulings: R6-01. No issue and no END line this round; the kernel's round-5 hand-off is closed under V07 (R6-01 (6)).

### pipeline (base §4, §10, PART II, PART III)

Rulings: R6-01, R6-02, R6-03, R6-10.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VEL5-r5-01 | major | major | EDGE-UNDEFINED | FIX per R6-03 | (1) as written; its model and scope ends are END lines there; its V08 end is in T-V8-49 (g)'s text under V08 |
| VEW-r5-01 | major | major | EDGE-UNDEFINED | FIX per R6-02, amended | a road deck never crosses a trace standing or picked when its course is laid, so S5b's spawned primary comes down before its boundary and is a gate: (P2) and (P4); no further spawn, and §4.8's "on ground part 0" is (P8) |
| VEW-r5-05 | major | major | EDGE-UNDEFINED | FIX per R6-02 | the case is removed: no raised gate exists ((P8)); (P7) is written under this id; its scope end is (S3) |
| VM-R5T-01 | major | major | CONFLICT | FIX per R6-02, amended | the strips are no longer stopped at all — the band and the setback, glacis and berm run on beneath the deck: (P1), (P6), (P11) and (P3) are written under this id; its determinism, V06 and V11 ends are (D10), (V6-6) and (V11-1); closes VPC-R5-01 |
| VM-R5T-03 | major | major | CONFLICT | FIX per R6-02 | the case is removed: every main gate is on ground part 0 ((P8)), so the gate-plaza sentence stands as written |
| VPC-R5-01 | major | major | CONFLICT | MERGED into VM-R5T-01 | the same sites (§4.8's lead, §4.1's row, §4.13's cell); its tower rule is in the crossing table's *beneath* and (P6) |
| VPC-R5-02 | major | major | EDGE-UNDEFINED | FIX per R6-02, amended | (P9): the ring road by the way-and-channel table (row c), no kept stretch; its V06 ends are (V6-10) and (V6-21); its scope end (S1) (8); closes VV56-r5-01 |
| VV56-r5-01 | major | major | EDGE-UNDEFINED | MERGED into VPC-R5-02 | the same §4.11 text; its T-V6-47 fixture is in (V6-21); its §2.7 list addition is the way-and-channel table's row (c) |
| VV78-r5-01 | major | major | EDGE-UNDEFINED | FIX per R6-03, amended | nothing is held, so a copy forked meanwhile never receives the late calamity: §4.11 *The clock* (4) as R6-03 words it; its V06 end is §4.4's sentence (END under V06); its determinism ends are R6-03's (END under determinism); its V08 texts are V08's under R6-03 |

**Binding texts this unit writes:** R6-02's (P1)–(P11) and R6-03's §4.11 *The clock* (1) and (4).

**END lines under this heading:**
* END of VAT5-r5-02 (model): §4.11's frame batches → R6-02's (P10). *(R6-02)*
* END of VRC5T-01 (model): §4.5's daylight casters → R6-02's (P5). *(R6-02)*
* END of VAT-r5-04 (rendering): §4.9 "trees are a layer toggle" → "trees are a drawing-group switch
  (`StyleSheet.groups.trees`, §8.2)". *(R6-10)*

### determinism (base §5–§7)

Rulings: R6-01, R6-02, R6-03, R6-08.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAH-r5-01 | minor | minor | DISAGREE | FIX | R6-08 |
| VDC5-01 | major | major | CONFLICT | FIX per R6-02 | its cause and outcome texts at `bend.raised.underSpan`'s row, the cause reading "— locked, pinned or neither —" ((D8)); its V09 end is written in (V9-5)'s words; V09 §4.9's source cell takes the new words (END under V09) |
| VDC5-03 | major | major | CONFLICT | FIX per R6-02, amended | no raised gate exists: both parentheses read "(on ground part 0; a deck passing over a trace is no crossing, §2.7's crossing table)" ((D2)) |
| VEL5-r5-04 | major | major | EDGE-UNDEFINED | FIX per R6-02 | (1) at the lock row ((D5)), (2) at the two bend rows ((D7), (D8)); its (3) is inside (S1) (4)–(5) |

**END lines under this heading:**
* END of VM-R5T-02 (model) and VEW-r5-05 (pipeline): R6-02's (D1), (D3), (D4), (D6) and (D9). *(R6-02)*
* END of VM-R5T-01 (pipeline): §7.3's S7 row → R6-02's (D10). *(R6-02)*
* END of VV78-r5-01 (pipeline) and VEL5-r5-03 (V08): §7.7's `DossierBinding.lateCalamities` line deleted; §7.1's
  `dossierFacts` member `lateCalamities` deleted; §7.4's `dossierFacts / dossierRecord` row → R6-03's determinism text.
  *(R6-03)*

### rendering (base §8, §9, §11, §12)

Rulings: R6-01, R6-02, R6-06, R6-10.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAT-r5-02 | major | major | DISAGREE | FIX | R6-10; its V09 end is an END line under V09 |
| VAT-r5-03 | major | major | DISAGREE | FIX | R6-10; its V09 end (T-V9-85) is an END line under V09 |
| VAT-r5-04 | major | major | MATRIX-GAP | FIX, amended | R6-10: (8) is T-V1-56's fixture (END under V01); §8.2's `hatched` row "(the `pins` and `trees` layers named;" → "(the `pins` and `trees` drawing groups named, `StyleSheet.groups`;" written with (1)–(2); its model, pipeline, V01, V04 and V09 ends are END lines there |
| VRC5T-02 | major | major | NEW-PROBLEM | FIX | R6-10 |
| VRC5T-05 | minor | minor | EDGE-UNDEFINED | FIX | R6-06: the home of the answer V10's row 34 cites |

**END lines under this heading:**
* END of VRC5T-01 and VEW-r5-02 (model): §8.4's heightfield writers and shadow casters, §11.1's 3-D and CityJSON rows →
  R6-02's (R1)–(R4). *(R6-02)*

### V01

Rulings: R6-01, R6-02, R6-03, R6-10, R6-11.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAF-R5T-01 | minor | minor | DISAGREE | FIX per R6-03, amended | no late calamity is held any more (R6-03); the one calamity carried with no epoch event is one a declared remap fills into an older document (V08 §2.7). §3.16 (2): "so a calamity carried with no event (one dated at or before the last absorbed week) still gives its targets and its pattern" → "so a calamity carried with no epoch event — one a declared remap fills into an older document (V08 §2.7) — still gives its targets and its pattern"; §3.18's disaster row and J-V1.104: "(dated at or before the last absorbed week)" → "(one a declared remap fills in, V08 §2.7)"; T-V1-60 (d): "a linked calamity carried with no epoch event (dated at or before the last absorbed week) strikes its targets, with its pattern" → "a linked calamity carried with no epoch event — one a declared remap fills into an older document (V08 §2.7), on a document upgraded through such a remap — strikes its targets, with its pattern" |
| VAF-R5T-02 | minor | minor | DISAGREE | FIX per R6-02, amended | §3.17.3 (2): "the base's arch vaults (II.7.6; volume 4's `vault` spans) fill it where they exist, and an `open` span stays open ground, a way passing under it or bare ground" → "the base's arch vaults (II.7.6; volume 4's `vault` spans) fill it where they exist — none in a span under a wall — and an `open` span stays open ground, a way passing under it, bare ground or a wall's run beneath it (§2.7's crossing table, *beneath*)" (the quotation of item 110 (b) after it kept) |
| VAF-R5T-03 | minor | minor | DISAGREE | FIX | as written |
| VV12-r5-01 | minor | minor | NEW-PROBLEM | FIX | R6-11 |

**END lines under this heading:**
* END of VM-R5T-03 (pipeline): no gate stands on a deck — R6-02's (V1-1), (V1-2) and (V1-3). *(R6-02)*
* END of VAT-r5-04 (rendering): §5.1.3's "**Layer toggles** (T12's `setLayer`; NG F1): the hood pins, model pins and access
  symbols belong to the `pins` layer and block trees to the `trees` layer" → "**Group switches** (T12's `setStyle` of
  `StyleSheet.groups`, §8.2; NG F1): the hood pins, model pins and access symbols belong to the `pins` group and block trees
  to the `trees` group", its "the `pins` toggle" → "the `pins` switch"; the T12 `dress` bullet's "its layer toggles
  (`setLayer`) hide the hood pins with the `pins` layer and the block trees with the `trees` layer" → "its group switches
  (`setStyle` of `StyleSheet.groups`, §8.2) hide the hood pins with `pins` and the block trees with `trees`"; §3.18 (e)'s
  row "the `pins` and `trees` layers" → "the `pins` and `trees` group switches (`StyleSheet.groups`)"; T-V1-56's fixture
  for that row runs each switch — the group hidden, logged as one `setStyle`, undone, the model digest unchanged. *(R6-10)*

### V02

Rulings: R6-01, R6-09.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VV12-r5-02 | minor | minor | COHESION | FIX | R6-09 |

**END lines under this heading:** none.

### V03

Rulings: R6-01, R6-07, R6-09.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAF-R5T-04 | minor | minor | HANDOFF-OPEN | FIX | R6-07; closes repair-r5-V02's hand-off |
| VAF-R5T-05 | minor | minor | DISAGREE | FIX | R6-07; one fix with VRC5T-03 |
| VV34-r5-01 | minor | minor | COHESION | FIX | R6-09 |
| VV34-r5-04 | minor | minor | DISAGREE | FIX | R6-07; written with the END of VRC5T-03 at T-V3-39 (g) |

**END lines under this heading:**
* END of VRC5T-03 (scope): T-V3-39 (g) "a never-decayed building draws, exports and answers byte-identically to its plan
  without the layer" → "a never-decayed building under no disaster look draws, exports and answers byte-identically to its
  plan without the layer". *(R6-07)*

### V04

Rulings: R6-01, R6-02, R6-07, R6-10.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAL-R5-04 | minor | minor | DISAGREE | FIX | R6-07; UE33's E1 written once, in these words (VRC5T-03's V04 end at the same cell) |
| VV34-r5-02 | minor | minor | NEW-PROBLEM | FIX | as written (§2.7's support step (7), with VAT5-r5-02's carried state); written with R6-02's (V4-8) |
| VV34-r5-03 | minor | minor | DISAGREE | FIX | R6-07 |

**END lines under this heading:**
* END of VAL-R5-02 (model): no arch vault under a wall — R6-02's (V4-1)–(V4-8). *(R6-02)*
* END of VRC5T-03 (scope): l. 2962 "a building never decayed draws byte-identically to its build without the layer" →
  "a building never decayed and under no disaster look draws byte-identically to its build without the layer"; UE33's E1
  is VAL-R5-04's text. *(R6-07)*
* END of VAT-r5-04 (rendering): l. 2780 "the `pins` toggle" → "the `pins` switch (`StyleSheet.groups.pins`, §8.2)", and
  J-V4.96's "and the `pins` toggle" → "and the `pins` switch". *(R6-10)*

### V05

Rulings: R6-01, R6-02. V05 owns no issue; it runs for its END lines (R6-01 (4)).

**END lines under this heading:**
* END of VM-R5T-02 (model): no crossing station — R6-02's (V5-1), (V5-2) and (V5-3). *(R6-02)*

### V06

Rulings: R6-01, R6-02, R6-03, R6-09, R6-11.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAT5-r5-01 | major | major | EDGE-UNDEFINED | FIX per R6-03, amended | the held calamity is gone, so its case is a target whose F5 record an earlier event applied. §3.11.1, after "…which is idempotent.": "A target whose F5 record an earlier event applied — SettlementForge changing a target's record before it carried the calamity — is already `ruined` when the calamity's epoch runs: the hazards phase strikes it by no op — it keeps `ruined` (its use already closed, never relocated, never taken back to `decayed`, no Works) while counting as struck: a fire's ignition is the target nearest the place and its spread starts from every target as a burning building, each counted toward `maxBuildings`; a flood's or a quake's struck set and count include it likewise; every other building is struck by the hazard's own rule, and the calamity's `deaths` reach that epoch's burial need (V06 §3.18.2)." §3.21's hazards row adds the input "a calamity whose target an earlier F5 record ruined" and the outcome "that target kept `ruined`, struck by no op, the hazard spreading from it (V06 §3.11.1)"; T-V6-27 adds "and a calamity carried by an absorb after one that applied its target's F5 record: at its epoch the target stays `ruined` with no op on it, its fire spreads from it to its live neighbours, and its deaths are in that epoch's burial need". No V08 end (no held case) |
| VDC5-04 | major | major | EDGE-UNDEFINED | FIX per R6-02 | the case is removed: no raised gate exists, so §3.7.2 (1) opens every gate as it stands; the raised-gate texts go by R6-02's (V6-7), (V6-8), (V6-10), written under this id; T-V6-47's bar "0 gates or towers in an under-deck strip" (V6-21) runs it; its model and determinism ends are superseded ((M2); (D6)) |
| VV56-r5-03 | minor | minor | NEW-PROBLEM | FIX, amended | §7's H-AQUA: "lays its masonry aqueduct across the ring standing then (its **CITY ring**), through a wall opening, and a viaduct where its main approach road crosses a valley outside a gate, across the ring at a raised gate (the recipe's valley deeper than `viaduct.minDropM`, its rim at the ring's foot so that the reading's `A` lies inside the ring, V06 §3.19 (2);" → "lays its masonry aqueduct across the ring standing then (its **CITY ring**) on a span over its band (§2.7's crossing table, *over the band*), and a viaduct where its main approach road crosses a valley outside a gate, its deck coming down before the ring and its road passing the gate on ground part 0 (*down before the wall*) (the recipe's valley deeper than `viaduct.minDropM`, its near rim just outside the ring's band so that the reading's `A` lies there, the main approach road's ground course from `A` to `B` longer than (1 + `viaduct.spanCostFactor`) × `\|AB\|` with `\|AB\|` within `viaduct.maxSpanM` so that the reading's strength is above 0, and its piers and clear spans within `raisedWays.structure.maxPierM` and `maxClearSpanM`, V06 §3.19 (2), (5); its far foot `B` beyond the land the METROPOLIS epoch's circuit encloses, so that circuit is laid across its deck;"; T-V6-47's clause is in (V6-21) |
| VV56-r5-04 | minor | minor | NEW-PROBLEM | FIX, amended | R6-09: E3's cell "T-V6-9–11, 46–49, 57–61, 73" → "T-V6-9–11, 46–49, 57–61, 73 (T-V6-11's sky clause at the later of E3 and V05's P6, which builds the landfall)"; E5's cell unchanged — the topple clauses on a crossing station are gone with it (R6-02) |

**END lines under this heading:**
* END of the raised-way family (model's VAL-R5-02, VEW-r5-02, VEW-r5-03, VM-R5T-02; pipeline's VM-R5T-01, VPC-R5-02,
  VEW-r5-01; scope's VCS-r5-04): R6-02's (V6-1)–(V6-6), (V6-9)–(V6-17), (V6-19)–(V6-22) and (V6-24), each written as the
  ruling gives it. *(R6-02)*
* END of VAT5-r5-02 (model): §3.19's lead "(§3.2 (9), the old deck's stations kept, §2.7's support step (7))" → "(§3.2 (9),
  the old deck's stations kept and its end span's condition carried, §2.7's support step (7))", written with (V6-13). *(R6-02)*
* END of VV78-r5-01 (pipeline): §4.4's `forkAt`, after "so no later dossier event reaches it;" add "a late calamity an
  absorb left uncarried (§4.11 *The clock* (4)) is such a change, so it never reaches the copy;". *(R6-03)*
* END of VAP-r5-03 (V12): §7's E1 registration line "(H-100, H-AQUA, H-TERRACE, H-DECK; T-V6-65)" → "(H-100, H-AQUA without
  its two raised-way edits, H-TERRACE, H-DECK; T-V6-65)". *(R6-11)*

### V07

Rulings: R6-01, R6-02, R6-05, R6-11.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAL-R5-03 | major | major | DISAGREE | FIX per R6-02 | no crossing station exists, so V07 keeps none. (a) §3.5a (4): from "**(4) VS3 — the palisade.** The palisade is a wall laid after the raised way" to "The barrier closure never treats a raised way as a barrier." → "**(4) VS3 — the palisade.** A palisade meets a raised way by §2.7's crossing table. Laid after it — VS3's trace at generation and at every derivation that re-lays it, or a palisade T3 `wall` draws — it is *beneath*: its band laid through each support, ramp, stair or foot standing in it (town walls were built against aqueduct piers), so it stands whole where one goes; no arch vault in a `vault` span under it; capped beneath each standing span at its soffit; no gate on the deck, and a gate VS4 would make inside the raised way's under-deck strip, or within `raised.supportClearM` of a support, moves along the trace to the nearest clear point, the track following it. A hand aqueduct drawn across the standing palisade crosses it *over the band*, on a span. A raised way carried down with the town (V07 §3.12) meets the palisade — the innermost standing enceinte — as it met that enceinte. A raised way crossing the circuit makes no gate (its deck passes over). The barrier closure never treats a raised way as a barrier." (b) §3.17's row → "\| a raised way over the palisade \| §2.7's crossing table: a palisade laid after it *beneath* (its band laid through the supports, ramps, stairs and feet in it, whole where one goes; no arch vault in a `vault` span under it), a hand aqueduct across the standing palisade *over the band*; no gate under the deck or on it (V07 §3.5a (4)) \| — \| T-V7-48 \|". (c) T-V7-48: from "the palisade abuts each standing support, ramp, stair and `vault` span's arch vault in its band" to "after a support is `cleared` the next derivation makes no obstacle, hole or abutment at it;" → "the palisade's band laid through each support, ramp or stair standing in it, no gap in the line, and no arch vault in a `vault` span under it (on a declared viaduct with a `vault` span in the planned palisade's band); 0 gates in an under-deck strip and 0 on a deck; a hand aqueduct drawn across the standing palisade — its supports off the band, a span over it; the carried-down raised way meeting the palisade as it met its CITY fixture's innermost ring (its aqueduct created across that ring on a span); after a support is `cleared` the band stands whole across its footprint and the next derivation makes no obstacle or hole at it;", and its lead's "(a declared viaduct and aqueduct, and one carried down from a CITY fixture)" stands |
| VAP-r5-04 | minor | minor | MATRIX-GAP | FIX | R6-11 |
| VV910-r5-03 | minor | minor | CONFLICT | FIX | R6-05 |

**END lines under this heading:**
* END of the kernel's round-5 hand-off (R6-01 (6)): T-V7-23 adds "; the arena's frame VG's view at `rules.vg.frameM` for the
  matched size plus `rules.vg.marginM` on each side (the base's `Frame.marginShare`, §3.2 (1))". *(R6-01)*

### V08

Rulings: R6-01, R6-03, R6-06, R6-11.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAP-r5-02 | minor | minor | HANDOFF-OPEN | FIX | R6-06; closes repair-r5-V09's hand-off |
| VEL5-r5-02 | major | major | EDGE-UNTESTED | FIX per R6-03, amended | written with R6-03's V08 ends (§2.3, W20, §2.6's `lateCalamities` row deleted, §3.6 (3)–(4), §3.17's row). T-V8-49 (g): "a second absorb in the last epoch's own week carrying a calamity dated that week and a population move past the tolerance — no epoch, the calamity's targets applied, noted by `unreceipted_change`'s `late` variant, the calamity held in `DossierBinding.lateCalamities`; the next absorb past `W₀` folding the crossing and the calamity's strike at its first epoch's first week, its deaths in that epoch's burial need;" → "a second absorb in the last epoch's own week carrying a calamity dated that week, its targets' records, a condition naming it and a population move past the tolerance — no epoch, none of the calamity, its targets' records or the condition carried (their carried facts unchanged), noted by `unreceipted_change`'s `lateDeferred` variant; the next absorb past `W₀` folding the crossing and carrying the calamity late, its strike at its first epoch's first week with its targets' F5 events, struck once in place, the condition with it, its deaths in that epoch's burial need; and on a copy, that next absorb carrying no year end, no crossing and no other calamity — an epoch folded at its week for the calamity, the same strike;"; "a calamity carried late — dated at or before the last epoch's week, its event in the absorb's first epoch at that epoch's first week" adds ", noted by the `lateCalamity` variant"; and VEL5-r5-01's V08 end: after "the document's current week after the absorb not before `W₀`" add "; and on a copy, an absorb past `W₀` with no year end, crossing or calamity folding a standalone change at `W₀` + 3 that begins a Works, then an absorb carrying a non-calamity change dated at or before `W₀` — folded at `W₀` + 1, the document's current week still `W₀` + 3 and that Works drawn at its stage there" |
| VEL5-r5-03 | major | major | CATALOGUE-GAP | FIX per R6-03, amended | `lateCalamities` is gone; `quarantined` stays. (1) §3.8's line-change bullet, after "re-keys the binding rows (a `rebind` `setAttr` per changed key, V08 §3.6 (5), no address changes)", add ", and each `quarantined` entry's `key` by the same entry in that absorb, before the diff, the absorb's `dossierFacts` event carrying the list under the new keys (V08 §3.6 (4)); a key the entry does not map keeps its key"; (2) §2.6's `DossierBinding.quarantined` row, its migrate cell, adds "; a line migration re-keys it by the `fromLines` entry (V08 §3.8)"; (3) T-V8-11 adds "on its test line with a `fromLines` table that re-keys binding keys, a document holding a quarantined record migrated by an absorb — the record's key re-keyed, its carried state still skipped by the diff; and a calamity left uncarried by a second absorb in the last epoch's own week (T-V8-49 (g)) carried after the migration under the new line's key, struck once" |
| VV78-r5-02 | minor | minor | NEW-PROBLEM | FIX per R6-03, amended | §4.6's row: "for a change carried at or before the last epoch's week (V08 §3.6 (3), (6); V08 §3.17), the row's variant `host.note.unreceipted_change.late` "{name} is dated before the map's last update, so the map shows it as already finished."" → "for a change other than a calamity carried at or before the last epoch's week (V08 §3.6 (6); V08 §3.17), the row's variant `host.note.unreceipted_change.late` "{name} is dated before the map's last update, so the map shows it as already finished."; for a late calamity carried (V08 §3.6 (3)), the variant `host.note.unreceipted_change.lateCalamity` "{name} is dated before the map's last update, so the map shows it striking in the week after that update."; for a late calamity an absorb in or before the last update's week leaves uncarried (V08 §3.6 (3)), the variant `host.note.unreceipted_change.lateDeferred` "{name} is dated in or before the week of the map's last update, so the map shows it, and the places it struck, at the next update after that week.""; the args and Show cells' "the variant for a late calamity" → "the `lateCalamity` and `lateDeferred` variants"; §3.17's row: "riding the first epoch the absorb folds at `W₀` + 1 (V08 §3.6 (3))" → "riding the first epoch the absorb folds at `W₀` + 1, noted `lateCalamity` (V08 §3.6 (3))"; §3.6 (3) and T-V8-49 (g) carry the notes in R6-03's and VEL5-r5-02's texts |
| VV78-r5-03 | minor | minor | NEW-PROBLEM | FIX | R6-11 |
| VV78-r5-04 | minor | minor | NEW-PROBLEM | FIX per R6-03 | as written: a late calamity's F5 targets' events ride its epoch only where it is carried (`W₁` after `W₀`), which is the batch rows' case |
| VV78-r5-05 | minor | minor | CONFLICT | FIX | R6-11 |

**END lines under this heading:** none beyond the texts above (VEL5-r5-01's V08 end is in VEL5-r5-02's T-V8-49 (g)
text).

### V09

Rulings: R6-01, R6-02, R6-05, R6-10, R6-11.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VDC5-05 | minor | minor | CONFLICT | FIX | R6-11: the line for a channel the way-and-channel table (e) stops; its source cell as written |
| VRC5T-04 | major | major | CONFLICT | FIX | R6-10 |
| VV910-r5-01 | major | major | WIRING | FIX | R6-05 |
| VV910-r5-02 | major | major | EDGE-UNTESTED | FIX | R6-05 |

**END lines under this heading:**
* END of VM-R5T-02 (model), VDC5-01, VEL5-r5-04 (determinism) and VDC5-02 (scope): R6-02's (V9-1)–(V9-6) — §4.9's rows,
  §4.20.2 (4) (VDC5-01's V09 end in its words), T-V9-52 (VDC5-02's V09 end and the locked run). *(R6-02)*
* END of VDC5-01 (determinism): §4.9's `bend.raised.underSpan` source cell takes §7.1's new cause and outcome words
  ((D8)). *(R6-02)*
* END of VAT-r5-02 (rendering): the entity table's notes row "notes in panels" adds "; in a picture with the Picture tab's
  **pins and public notes** on, each public note a numbered marker at its thing, its text on the legend sheet (§11.2's
  `ExportOpts.pins`; §9.5)". *(R6-10)*
* END of VAT-r5-03 (rendering): T-V9-85 adds "on T-V3-40's fixture (T-V9-86's) with the rebuild begun on every building
  of one of the disaster's units, the standing look's **Show** and Find's **Go to** framing the union of all its units'
  `FindArea` shapes, that unit's among them". *(R6-10)*
* END of VAT-r5-04 (rendering): the T12 `dress` row's "V01 (pinGate, vignette)" adds "; the Dress panel's **Trees** and
  **Pins** switches (`setStyle` of `StyleSheet.groups`, §8.2)". *(R6-10)*

### V10

Rulings: R6-01, R6-05, R6-06.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAH-r5-03 | minor | minor | HANDOFF-OPEN | FIX, amended | R6-05: its three texts, with VAT-r5-05's (1) (§3.9b (8)'s *A house under a disaster look* in the why card's words, keyed `info.crisis.ruinedFor` in its form) and (2) (C10's outcome naming the key); T-V10-52 takes one building-and-preview clause (VAH-r5-03's words); closes VAT-r5-05 and repair-r5-V09's hand-off |
| VAT-r5-01 | major | major | MATRIX-GAP | FIX | R6-06: its seven texts as written; closes VV910-r5-04 |
| VAT-r5-05 | minor | minor | HANDOFF-OPEN | MERGED into VAH-r5-03 | the same sites (§3.9b (8), C10, T-V10-52); its (1) and (2) written there |
| VV910-r5-04 | minor | minor | EDGE-UNDEFINED | MERGED into VAT-r5-01 | the same gap at §3.9b (8) and row 34; its outcome (the clerk never says this field is bare) is not written — it would make the clerk say less than the card (R6-06) |

**END lines under this heading:** none.

### V11

Rulings: R6-01, R6-02, R6-07. V11 owns no issue; it runs for its END lines (R6-01 (4)).

**END lines under this heading:**
* END of VM-R5T-01 (pipeline): §3.24.2's readers and registry row 80's reader cell → R6-02's (V11-1) and (V11-2). *(R6-02)*
* END of VRC5T-03 (scope): l. 3828 and l. 4649 "a building never decayed (level 0) draws its plan unchanged" → "a building
  never decayed (level 0) and under no disaster look draws its plan unchanged" (l. 3828 reads "a building never decayed
  draws its plan unchanged" → "a building never decayed and under no disaster look draws its plan unchanged"). *(R6-07)*

### V12

Rulings: R6-01, R6-04, R6-07, R6-11.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAP-r5-03 | minor | minor | HANDOFF-OPEN | FIX | R6-11; its V06 end is an END line under V06; closes repair-r5-V06's hand-off |
| VV1112-r5-01 | major | major | CONFLICT | FIX | R6-11 |

**END lines under this heading:**
* END of VAP-r5-01 (scope): the catalogue row (l. 1172), §3.15.10's T120-6 bullet, T-V12-52's text and its cell — VAP-r5-01's
  four V12 texts, as written. *(R6-04)*
* END of VRC5T-03 (scope): l. 933's `entities` "the buildings whose lineage never held `abandoned`, `decayed` or `ruined`" →
  "the buildings whose lineage never held `abandoned`, `decayed` or `ruined` and over which no disaster look stands at the
  drawn week (§10.2 (f))", and l. 2761–2762 the same; §2.13's `entityScope` comment (l. 904–905) and §3.7's pin text
  (l. 1747) as R6-07 words them. *(R6-07)*

## Part I — canon changes (appended to canon.md as one dated ruling)

The dated ruling "2026-10-01 (adjudication round 6)" at the end of `docs/validation/coherence/canon.md` records, by
pointer to the rulings above: the four blind spots and the supersessions (R6-01); raised ways and walls by one form
whichever is laid first — §2.7's crossing table with its four outcomes and §2.7's way-and-channel table, no crossing
station, raised gate, wall opening or held stretch, road decks down before a standing wall, the strips no longer stopped,
no arch vault in a `vault` span under a wall, the run capped at a standing span's soffit, the frame growth's carried end span
(R6-02, J122, vetoable, superseding R5-02 but what it restates and R3-25 (d)); the late calamity left uncarried until the
next absorb past the last epoch's week, `DossierBinding.lateCalamities` removed, the current week the greatest folded week
(R6-03, superseding R5-03's hold); Find's drawn-week timing at T120-6 and V12 (R6-04); the crisis line's forms and the open
card (R6-05); a famine's bare field at V10 and §11.2 (R6-06); the plan's damage conditions at every restatement (R6-07);
item 125's two base summaries (R6-08); the clauses scheduled before their provider (R6-09); rendering's readers (R6-10);
the fixtures and bars that must hold their case (R6-11). Nothing is ruled INVALID this round.

