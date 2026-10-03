# Adjudication round 5 — binding rulings for repair round 5

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/adjudicate-r5; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/adjudicate-r5`, 2026-10-01)
- P0 brief read whole; inputs located (round5-work 17 files, 91 issues, no V02 file; repair-r4 ×18; verify r4t ×20; adjudication-r2 – r4; canon's dated rulings; file g items 102–126): done
- P1 ruling requests of round 4's repair files: none filed (all eighteen headers say 0): done
- P2 every issue read whole (91); multi-reporter, ping-pong and blind-spot groups found; the live text checked at every site a ruling changes: done
- P3 binding rulings R5-01 – R5-10, each checked against the owner rules it touches and swept over the three blind spots: done
- P4 Part H, all 91 issues (82 FIX, 9 MERGED, 0 INVALID), J141 grades (1 regrade), 35 END lines under 15 units: done
- P5 canon dated ruling "2026-10-01 (adjudication round 5)" appended; result saved; LANDED: done


## How to read this file

**Who reads what.** Each repair seat of round 5 reads (1) its row of the table of contents, (2) every ruling that row
lists, whole, and (3) its unit's heading in Part H: the disposition of each issue it owns, then its **END lines** — the
exact text this unit writes for a fix another unit owns. A seat's whole work is under its own heading (R3-01, kept by
R4-01 and R5-01). V02 owns no issue this round but holds END lines, so it runs (R5-01 (4)).

**Dispositions** (Part H, one row per issue of `docs/validation/coherence/work/round5-work/<unit>.json`):

| word | meaning |
|---|---|
| **FIX** | apply the issue's `required_change` as written |
| **FIX per R5-nn** | apply it, but where R5-nn's text differs from the `required_change`, R5-nn governs |
| **FIX, amended** | apply it with the amendment the note states (the note's text governs) |
| **MERGED into X** | the same defect at the same unit as issue X: X's fix (as ruled) closes it; nothing further at this id |
| **INVALID** | closed for good, with its reason; never raised again |

Where one defect spans several units, each unit's text is its own FIX (or an END line under it), "one fix with" the
primary id; MERGED is used only inside one unit.

**Grades** (J141's SEVERITY STANDARD). The `sev` column is the reporter's; the `grade` column is this adjudicator's,
with a one-line reason where it differs. A regrade never changes the disposition: every issue is FIXED, MERGED or
INVALID this round.

**Precedence used** (principle (3)): the owner's words (file g items 102–126, the owner's instructions, DEFINITION) > an
f item or a J-VI decision > the base's canonical home > a volume's restatement. A ruling made under J122 says so and is
vetoable. adjudication-r2.md, -r3.md and -r4.md stay binding except where an entry below supersedes one of their rulings
or END lines by name.

**No ruling id in design text** (R3-02, kept). Every text below that a seat writes into the design names a design home,
never an `R5-nn`, `R4-nn`, `R3-nn` or verifier id; where a quoted text below cites a ruling, the seat writes the home the
ruling names.

## Summary

* **Ruling requests:** none filed in round 4's eighteen repair files (Part A).
* **10 binding rulings** (R5-01 – R5-10), each checked against the owner rules it touches (quoted in the ruling) and
  swept across the set for every text that reads or restates what it changes — the three readers round 4's sweeps kept
  missing (V07's village restatements; V09's panels and V10's clerk; the tests, fixtures and milestone cells) named in
  each ruling's *Sweep*, an END line for each it found.
* **The raised-way × wall family is replaced by one rule (R5-02, J122, vetoable; supersedes R4-09 whole):** a raised
  way's piers are placed once, at the commit that creates it, and held at generation as after it; everything laid after
  it gives way — a way crosses under a span by §4.3's rule, a channel passes beneath or stops at the under-deck strip, a
  face is cut or holed round it, and **a wall stretch laid after it runs on beneath its deck**, built against the
  supports, ramps, stairs, feet and `vault` spans in its band and walled up to a span's soffit, with no station taken and
  no gate on the deck, its strips stopped at the under-deck strip. A crossing station — an aqueduct's arch, a raised
  gate — exists only where a raised way is created across a standing wall (item 110 (b)'s arch: every generated
  aqueduct, laid at S6's end or by V06's founding, and every hand aqueduct), and no removal of the wall takes it. The
  generation re-siting, the last support run after S7 and its give-way rungs, the station a later trace took, the
  palisade's separate clause and the lock clause are gone; a frame growth's extension keeps the old deck's stations
  ((7)). It closes VEW-r4-01 – 03, VM-R4T-01, VPC-R4-01, VM-R4T-02, VM-R4T-05, VV34-r4-01 = VAL-R4-04, VAL-R4-02,
  VAL-R4-03, VDC4-03 – 05, VEW-r4-04, VM-R4T-03, VM-R4T-06, VV12-r4-03, VDC4-06 and VM-R4T-04 = VPC-R4-03, frames
  VAP-r4-01's regrowth fixture and VV56-r4-02's H-AQUA, and lists its END sites across pipeline, determinism, rendering,
  scope, V04, V06, V07, V09 and V11 in R5-02's *Ends*. The behaviour it changes is said plainly there: a road deck passing over a wall laid after it is
  ungated (as the palisade's already was); the veto option is a gate standing on the deck.
* **Other recurring classes ruled once:** a late dossier change never moves the clock back and a late calamity is never
  lost — held in `DossierBinding.lateCalamities` for the next folded epoch when the absorb's week is the last epoch's
  own (R5-03, amending R4-08); the restoring re-cut's entry week at §6.3, §8.6, V02, V09 and T-ER-28 (R5-04); Find at a
  drawn week — one reader list with `findAreas` and V07's village reading, a re-evaluation budget, and every drawn-week
  test clause scheduled at the later of its milestone and V06's E6 (R5-05); V07's count and hand-over (R5-06); item 125
  at an absorb — a field is a row's own path, the cadence reads the carried population, §14 in V08's terms (R5-07);
  the crisis look's readers in V09 and V10 (R5-08); the working layer's type and a removed target (R5-09); the
  fixtures that must run a ruled case (R5-10).
* **Dispositions of the 91 issues:** 82 FIX (26 as written, 39 under a ruling as written, 17 amended), 9 MERGED into a
  sibling id of the same unit, 0 INVALID. Parts of required changes not written (each in its issue's note): VEW-r4-01's
  bend past a foot and its "not already another trace's" station (no later trace takes a station); VEW-r4-03's quay bend
  and re-join (the quay corridor is an obstacle at the raised way's commit); VM-R4T-01's and VPC-R4-01's crossing shift
  after the fact (ways keep off the supports from the commit); VEW-r4-04's pin on the deck; VM-R4T-03's sentence after
  the outer strip; VAL-R4-03's and VM-R4T-02's "through one station on the deck"; VV56-r4-02's declared viaduct (a raised
  gate needs a founding across the standing ring); VV78-r4-04's `W₀` + 1 at an absorb in the last epoch's own week.
* **Grades (J141):** reported 0 blocker, 39 major, 52 minor; graded 0 blocker, 38 major, 53 minor — one regrade
  (VV1112-r4-01 major → minor: a fixture list omitting a case its own test names, VV78-r4-08's grade for the same defect).
* **END lines:** 35, under 15 unit headings (kernel, V05 and V12 hold none); V02 owns no issue and runs for its one.
* **Canon:** one dated ruling appended to `canon.md` (Part I).

## Table of contents by unit

Each row: the issues the unit owns, the END lines it writes for others, and the rulings it applies whole (every seat
reads R5-01, and R3-01 – R3-03 and R4-01, which stand); then its heading in Part H.

| unit | issues | END lines | rulings binding it (with R5-01) | its heading |
|---|---|---|---|---|
| scope (base §0–§1, §13–§17, the index, INDEX.md) | 10 | 3 | R5-02, R5-03, R5-07, R5-10 | Part H · scope |
| model (base §2) | 9 | 2 | R5-02, R5-09 | Part H · model |
| kernel (base §3) | 1 | 0 | — | Part H · kernel |
| pipeline (base §4, §10, PART II, PART III) | 11 | 4 | R5-02, R5-03 | Part H · pipeline |
| determinism (base §5–§7) | 6 | 4 | R5-02, R5-03, R5-04 | Part H · determinism |
| rendering (base §8, §9, §11, §12) | 9 | 4 | R5-02, R5-04, R5-05, R5-08 | Part H · rendering |
| V01 | 2 | 1 | R5-05 | Part H · V01 |
| V02 | 0 | 1 | R5-04 | Part H · V02 |
| V03 | 1 | 2 | R5-05, R5-08, R5-10 | Part H · V03 |
| V04 | 2 | 2 | R5-02, R5-05 | Part H · V04 |
| V05 | 2 | 0 | R5-05 | Part H · V05 |
| V06 | 2 | 2 | R5-02, R5-10 | Part H · V06 |
| V07 | 7 | 1 | R5-02, R5-05, R5-06 | Part H · V07 |
| V08 | 9 | 2 | R5-03, R5-07, R5-10 | Part H · V08 |
| V09 | 10 | 4 | R5-02, R5-04, R5-05, R5-08, R5-09 | Part H · V09 |
| V10 | 4 | 2 | R5-05, R5-08 | Part H · V10 |
| V11 | 1 | 1 | R5-02 | Part H · V11 |
| V12 | 5 | 0 | R5-10 | Part H · V12 |

Parts: A the ruling requests · B the whole round (R5-01) · C the rulings (R5-02 – R5-10) · H per-unit dispositions · I
canon changes.

## Part A — the ruling requests

Round 4's eighteen repair files (`docs/validation/coherence/repair-r4-*.md`) carry **no** `RULING REQUEST` block: each
file's header says "Ruling requests: 0" (V01, V02, V03, V04, V05, V06, V07, V08, V09, V10, V11, V12, determinism, kernel,
model, pipeline, rendering, scope), and a search of all eighteen finds none. Nothing to rule here. The questions round
4's seats left in their HAND-OFFS are ruled where they belong: the model's (the S5b or S5c way under a station the last
support run cannot clear; the locked Re-derive's fixture; the `dismantled` regrowth's fixture; `W_RAISED_CROSSING` in
§5.4) in R5-02; V04's (the frame growth's deck extension, "the base's text decides") in R5-02 (7); pipeline's (the late
calamity at the last epoch's own week) in R5-03; rendering's (the `districts`' tone at §10.2 (d); the reference viewport)
under VRC4T-09 and VCS-r4-01; V01's (`findAreas`' week at V09) in R5-05; V12's (`item107.spread` for B-CITY's seeds) under
VV1112-r4-02; the kernel's observation 1 (a frame growth that keeps the arena) under VKr4-01.

## Part B — the whole round

### R5-01 Both ends, the three blind spots, supersession by name, and grading

**Governs:** every issue of round 5.

**Decision.** (1) R3-01 – R3-03 and R4-01 stand: each seat applies every FIX and every END line under its heading in
Part H, in the same round as the owning seat's share; an END line's text is written as given (where it says "in its
words", at build depth with the content stated); no review id in design text; J141's grades. (2) **The sweep is the
seat's too, and it now covers the three readers round 4's sweeps kept missing** (orchestrator's round-5 notes (2)):
(a) **V07's village-rung restatements** of a town rule (the units, the hand-over, the crossing rule, Find over the village);
(b) **V09's panels and dialogs and V10's clerk**, which restate the base's rules in their own words (the why card, the
plan panel, the crisis lines, Find's panel and `read_map`); (c) **the tests and fixture lists** that must run a ruled case
— §13.2's bars and §13.8's rows, V08 §7.1's fixtures, V12's fixtures and statistics, each volume's T- tests and the
milestone cells that schedule them. A seat applying a ruling greps its own unit for the term, field, key, string key and
section the ruling changes, in prose, tables, edge rows, tests and milestone cells alike, and conforms every restatement
it finds in the same block, naming each in its report; one it missed goes to its HAND-OFFS, never open wording. This
adjudicator's sweep of all three kinds is the END lines below. (3) **Supersession by name.** This round supersedes:
**R4-09 whole** (the raised-way crossing rule: generation's re-siting of a crossing station, the last support run after S7
and its give-way rungs, a later trace bent through a station, the palisade's separate clause, the lock clause) by R5-02,
which restates what of it stands (the held raised way, §4.3's crossing rule, V04's one reconcile trigger, V11's two cells,
V01's citation); R4-08's "with the absorb's week itself before the last epoch's … it folds no epoch and its dated changes
apply finished" by R5-03; R4-15 (a)'s reach to a record's sub-fields by R5-07 (a field is a row's own path); R4-12's
routing list, extended by R5-05 (V07, `findAreas` at V09, V10's wording). R3-25 (d) (the band under a crossing station held
while its deck stands) stands inside R5-02. (4) A seat whose unit owns no issue but holds END lines runs: V02. (5) No
seat re-raises an issue ruled INVALID or MERGED in adjudication-r2, -r3, -r4 or here.

**Grading (J141), as the orchestrator's note (6) states it.** An untested edge whose outcome the text defines but no bar
runs, so that a wrong build passes every bar, stays MAJOR (principle (11); round 4's practice); a test or fixture list that
omits a case its own test text names is MINOR; two units stating two outcomes for one case is MAJOR however rare the case.
One regrade this round: VV1112-r4-01 (major → minor), the same defect VV78-r4-08 reports as minor — V12's test text
names the METROPOLIS cap and V08's fixture sentence omits the cap's mutation.

## Part C — the rulings

### R5-02 Raised ways and walls: one rule — a raised way is held from its creation; a wall laid after it runs on beneath its deck

**Governs (the raised-way × wall family, four rounds running):** model — VEW-r4-01, VEW-r4-02, VEW-r4-03, VM-R4T-01,
VPC-R4-01 (MERGED), VM-R4T-05, VV34-r4-01, VAL-R4-04 (MERGED); pipeline — VEW-r4-04, VM-R4T-03, VM-R4T-06, VV12-r4-03,
VDC4-05; determinism — VDC4-03, VDC4-04, VM-R4T-04, VPC-R4-03 (MERGED); scope — VM-R4T-02, VAP-r4-01; V06 — VV56-r4-02;
V07 — VAL-R4-02, VAL-R4-03; V09 — VDC4-06. Ends at model, pipeline, determinism, rendering, scope, V04, V06, V07, V09 and
V11. **Supersedes R4-09 whole** — generation's re-siting of a crossing station at a stage's S5a commit, the support step's
last run after S7 and its give-way rungs (a strip cut round a ring, a quay or castle path "ending at the ring and resuming
beyond it"), a later trace bent along the deck through a station "which becomes its crossing station", the separate
palisade clause (iv), and the lock clause — and R3-25 (c) (already superseded). What of R4-09 stands is restated below
(the held raised way and its reservation; §4.3's crossing rule with V11's `clearWidthM` and `squareDeg`; V04's one
reconcile trigger; V01 §3.17.3 (3) citing §4.3). R3-25 (a), (b) and (d) stand.

**Why one rule (orchestrator's round-5 note (3)).** Every round added a clause for the narrower case the last clause
opened: a station re-sited at an S5a commit (no interior station; a station on a ramp; a station already taken; a span
past its bound), a last support run that cannot clear an S5b or S5c way, a quay or a castle path, a palisade over a
`vault` span, a carried-down station, a frame growth that re-spaces piers, a delete under a deck. All of it came from one
choice — later work moving a standing raised way's piers or taking one of its stations. The rule below never does: a
raised way's piers are placed once, at the commit that creates it, and held; whatever is laid after it, a wall included,
gives way. Only the meeting the owner describes — a raised way laid across a standing wall, carried through an arch or a
gate — keeps a crossing station.

**Owner rules checked.** Item 110 (b): "a raised way crosses the ways beneath WITHOUT a junction; its two ends are ramps
or stairs joined to ground vertices"; the aqueduct "carried across low ground on arches to a basin, cistern or fountain,
crossing the wall through an arch"; "a removal is an edit that holds through regeneration". Item 110 (f): "a raised way
crosses ground ways with zero junctions and its parts never share a planar arrangement with part 0; generated raised ways
appear only at CITY and METROPOLIS, each with its reason recorded (drop, link or water need), within the rung's cap, and
a removed one stays removed after regeneration". Kept: no junction, gate or join is made on the deck by later work; the
rung gate, reasons, caps and suppression are untouched; **the arch** is the crossing station of (3) for every aqueduct
created across a standing wall — every generated one (laid at S6's end, after every trace of its generation, and by V06
§3.19's founding across standing curtains) and every hand aqueduct drawn across a wall (§7.1) — while a wall built
after an aqueduct runs on beneath its arches, the arch over the wall's line walled up and the piers in its band built into
it, so the aqueduct still passes the wall's line on an arch and no gate is ever made for it. Item 101 R2 (a declaration
bent to the nearest lawful one) and R13 (a declared or pinned thing is held): kept — a hand wall or way is bent at its
dry run, the raised way held. Item 114 (walls decay into gaps): the band under a crossing station held while its deck
stands (R3-25 (d)) is kept, with its release and its regrowth. Nothing else of the owner's text speaks to the meeting:
raised gates, the held stretch, crossing stations at epochs, the palisade and the last run were program design under
J122, and this ruling is too (vetoable). **What changes in behaviour, said plainly:** a wall stretch laid after a
raised way carrying a road no longer takes a raised gate on the deck — the deck passes over it ungated, as the palisade's
already did; the rejected alternative (a gate standing on the deck between its supports) is the veto option.

**Decision (J122, vetoable). Home: §2.7's support step (model).** The binding texts:

* **(3), the obstacles.** "an enceinte's wall strip (`Enceinte.strips`) but for a crossing station on its band (below)"
  → "an enceinte's wall strip (`Enceinte.strips`, or before S7 has cut it the strip S7 cuts beside the standing trace —
  its band's half, setback and glacis by §4.8's rows and the berm up to its moat) but for a crossing station on its band
  (below)"; and "a part-0 way's corridor (a bridge's, a pier's, a mole's or a quay's deck among them)" adds ", and along
  a bank of kind `quay` (§4.2 S1 (7)) the corridor of the quay S7 lays there (§4.8)". (So a raised way created before
  S7 keeps its piers out of the strips and quays S7 lays — the outcome the last run after S7 gave, without the run.)
* **(3), the palisade parenthesis** "(a village map's palisade, `VillagePlan.palisade`, is no crossing: its trace abuts
  each support standing in its band, never moving it, and passes beneath every span, with no crossing station and no
  gate; V07 §3.5a (4))" → "(only a stretch standing when the raised way is created; a stretch laid after it — a village
  palisade's among them — takes no station and runs on beneath the deck, (6) (d))".
* **(3), the station's ring** "(no pier raised, no pier-height test; at a standing station a later trace takes, the
  pier's former ring with it, (6) (b) (iii))" → "(no pier raised, no pier-height test)".
* **(3), the held stretch**, after "… and a hand op's dry run bends its stretch round it (item 101 R2)" add: "; nor does a
  removal of the wall around it take it — a hand `delete` of the enceinte is bent to a `dismantle` of every other run, the
  record kept, and one of its raised gate or wall opening there changes nothing (§7.1's `bend.wall.held`), and
  `wallToWay`, `absorbWall` (§4.11; V06 §3.7.6 (5)) and the hand-off down that makes the enceinte the village's palisade
  (V07 §3.5a (4)) each leave it standing as a free-standing gate tower or arch carrying the deck, with no gate law and no
  junction with a ring road, the enceinte's record kept while it stands". The rest of (3) — the release from the first
  epoch after the raised way is removed or both spans have fallen, the landfall, the salvage and topple passing over it,
  a `repairRaised` beside a fallen stretch repairing it first by `repairWall` (on a `dismantled` stretch the op's bend, a
  new stretch on its line) — stands.
* **(6)**, replacing from "(6) **later work across a raised way**, at generation and after it:" to "…so a locked or pinned
  raised way is crossed as an unlocked one is (§7.4's lock column; T110-2).":

  "(6) **Held from its creation; later work gives way.** A raised way's stations, keys and spans are placed by (1)–(5)
  and the span rule at the commit that creates it — at generation inside S4's or a stage's S5b route solve or at S6's
  end, at an epoch by V06 §3.19's founding, by hand at its declaration's commit — against the obstacles standing then;
  from that commit, at generation as after it, it is **held**: nothing laid later re-runs this step on it, moves, adds or
  omits a station, mints a key, re-rules a span or drops it; only an op that names it changes it (its edits, V06 §3.19's
  ops, a landfall, a frame growth's extension of its deck by (7)), and such an op keeps how it meets each wall stretch
  ((d)). A lock or pin holds the same; at a regeneration a locked, pinned or declared raised way stands before every stage
  the regeneration runs (§7.2). Its supports, its ramps, stairs and feet (`RaisedWayRecord.feet`) and, once the span
  rule has run, the under-deck strip of each `vault` span are a **reservation** on ground part 0, and everything laid
  after the raised way gives way to it:
  * (a) *a part-0 way* — a route, S5c's proposal, a stage-2 seed's way, a village tracker, S7's quay, intervallum or
    castle path, a hand way — crosses the rest of its under-deck strip only by §4.3's crossing rule, each with its own
    ladder (§4.3's for a route; §4.4's for S5c's proposal; V01 §3.17.3 (3)'s; V07 §3.5a (3)'s for a tracker; §7.1's
    `bend.raised.underSpan` and `bend.raised.around` for a hand way), a way whose ladder offers no crossing ending at the
    strip as at a reservation;
  * (b) *a channel* — a moat's or a carve's — passes beneath where its crossing of the under-deck strip meets no part of
    the reservation; elsewhere it stops at the strip's edges, ending against the ground as against a berm (§4.2 S3
    (10)), reported (`W_RAISED_CROSSING`), a hand carve's crossing first moved along the deck to the nearest that passes
    (`bend.raised.underSpan`);
  * (c) *a face* — S8 holes its plots round the reservation and the under-deck strip (§4.6); a square, a reservation or
    a gate plaza is cut round the reservation; S7 roots no pier, mole or breakwater on it, a root moved along the shore
    to the nearest clear one;
  * (d) *a wall stretch laid after the raised way was created* — a later stage's S5a trace at generation, an epoch's
    circuit, contraction or re-anchored stretch, a hand `drawWall`, a moved trace vertex, a dismantled stretch rebuilt
    on its line, a village palisade — keeps its course and **runs on beneath the deck**: each part of the reservation
    standing in its band is taken into the line, the run abutting its faces and closed against it, never moving it
    (town walls were built against standing aqueduct piers), at a `vault` span ending at its arch vault's two walled-up
    arch mouths, the chamber kept whole; beneath every other span it is an ordinary run whose top is no higher than that
    span's soffit (the arch walled up; derived at read, never stored — §4.5's daylight casters, §8.4's casters and
    heightfield and §11.1's glTF wall read it); it takes no crossing station and makes no gate on the deck, which passes
    over it (a raised arterial crossing a stage's boundary on its deck pins no gate, §4.4 S5a); no gate or tower stands
    in the under-deck strip — one the wall's law would place there moves to the nearest point clear of it, a tower along
    the trace and a gate along its way, or along the trace where the way is laid after the gate and follows it (a
    village track, V07 §3.5a (4)); the stretch's setback, glacis and berm stop at the under-deck strip's edges,
    closed along them, and its moat is a channel by (b). Each such meeting is reported (`W_RAISED_CROSSING` at
    generation; `walls.raisedCrossings` at an epoch, V06 §2.10; `bend.wall.raisedCrossing`'s line at a hand edit's dry
    run).

  A stretch standing when the raised way is created carries it at a crossing station by (3); a stretch (3)'s repair
  re-lays under a crossing station is that station's support, never a later stretch; at a regeneration the stretches it
  re-derives are laid after a held raised way (above) — a re-derived stretch on a crossing station's line takes the
  station into the line as its support again, so an unchanged regeneration reproduces it, and a station no stretch lies
  under any more stands as a pier, its `supports` entry then carrying its own `state`. Nothing waits for a raised way,
  and no generated course is dropped for later work (T110-2)."
* **(7)**, new, after (6): "(7) **A frame growth's extension** (§3.2 (9)) keeps every station of the old deck — its key,
  position and support `ring` — and every span between two of them as it stands (`use`, `reason`, `state`, `held`);
  (1)–(5) and the span rule run on the extension alone, from the old deck's last interior station (with none, from its
  other foot) to the deck's new end on the new ring, against the obstacles standing then, its stations' keys minted after
  the largest the way has held ((5)); so no pier of the old deck moves and no footing leaves (V04 §3.5.0 *At an epoch*)."
  (VV34-r4-01's text; VAL-R4-04 merged.)
* **`RaisedFoot`'s comment** "then extends the deck to the new ring as §4.11 continues a through-road" adds "(the old
  deck's stations kept, the support step's (7))".
* **`supports`' `state` comment** "never on a crossing station, which reads its wall stretch's `condition` (the support
  step (3), below)" → "never on a crossing station while a wall stretch lies under it, whose `condition` it reads (the
  support step (3), (6), below)".

**The equivalence (what each superseded piece carried and where it now lives).** Generation's crossing station at an
S5a commit → none: a later stage's ring runs on beneath the deck ((6) (d)); the ring's gate on a raised arterial → none on
the deck (S5a pins none; S5b's count reads ground crossings); the last support run's work (piers off S7's strips, gate
plazas and quays) → (3)'s obstacles read the strip and the quay S7 will lay; its give-way rungs (a strip cut round a ring,
a quay or castle path ending and resuming) → unreachable for strips and quays, and for any way laid later (a)'s crossing
rule; S5b and S5c ways → keep off the supports from the raised way's commit ((a); the verifier's own alternative in
VM-R4T-01); a later trace bent through a station → (6) (d), no station taken, so no "no interior station", "every station
taken" or "station on a ramp" case exists (VEW-r4-01); the palisade's clause (iv) → (d), extended to `vault` spans
(VEW-r4-02) and to every later wall; the lock clause → (6)'s "a lock or pin holds the same", a locked raised way at a
regeneration standing before every stage (VM-R4T-02); "none drops it" → "nothing laid later … drops it" (VM-R4T-05); a
raised gate's or wall opening's survival of `wallToWay`, `absorbWall`, a delete and the hand-off down → (3)'s held
stretch (VDC4-04, VDC4-05, VAL-R4-03). Every bar R4-09 set survives in T110-2 below: zero junctions, no support in water,
every clear span and pier within its bound, the raised way unchanged by later work, 0 way corridors over a support, ramp,
stair, foot or `vault` span, `W_RAISED_CROSSING` reported, nothing waiting, no course dropped.

**Ends** (each an issue's own FIX or an END line in Part H; old → new, every other word as it stands):

* **pipeline**
  * (P1) §4.3 *Lattice and costs*, from "A standing raised way's support rings, ramps, stairs and feet
    (`RaisedWayRecord.feet`) and the under-deck strips of its `vault` spans are impassable" to "— the one rule S5c's
    proposals (§4.4) and stage 2's ways (V01 §3.17.3 (3)) keep." → "A raised way is held from the commit that creates it
    (§2.7's support step (6)): its support rings, ramps, stairs and feet (`RaisedWayRecord.feet`), and once the span rule
    has run (its one eager run, after §4.6's cut) the under-deck strips of its `vault` spans, are impassable to every
    route and growth proposal on ground part 0 laid after it, at generation as after it; the rest of its under-deck strip
    (§4.6) is crossed only under a span — an `open` one once the span rule has run — whose clear width between the
    supports' rings is at least the way's width + `raisedWays.structure.clearWidthM` and whose soffit meets §2.7's *The
    clearance* for the crossed way, within ± `raisedWays.structure.squareDeg` of square to the deck (V11 §3.24.2), never
    along the strip. A route's crossing shifts along the strip to the nearest crossing these admit, else the route takes
    another course by F-ROUTE's ladder (§5.2). S5c's proposals (§4.4), stage 2's ways (V01 §3.17.3 (3)), V07's village
    trackers (V07 §3.5a (3)) and S7's quays, intervallum and castle paths keep the same crossing rule, each with its own
    ladder (S5c's deflection along the strip or its end there; V01's F-TEMPLATE rungs and §4.6's lane ladder; the
    tracker's turn; S7's way ending at the strip as at a reservation; §2.7's support step (6) (a))." (VM-R4T-06,
    VV12-r4-03, VPC-R4-01's and VAL-R4-02's pipeline ends.)
  * (P2) §4.3 *The slot*: "After S7's batches and before S7b, §2.7's support step runs once more on every raised way, its
    keys kept (§2.7's support step (5), (6) (a)). So S7b's capacity" → "Its stations and spans are placed at that commit
    and held from then (§2.7's support step (6)), so S7b's capacity".
  * (P3) §4.1's S7 row: "· after the last enceinte's batches and before S7b, §2.7's support step once more on every
    raised way (§4.8's lead), where a station can be neither slid nor omitted the S7 part it meets cut round its ring or
    ended at it in one L1 batch (§2.7's support step (6) (a))" → "· beside a raised way standing before the trace, its
    strips stopped at the under-deck strip, a gate plaza cut round the raised way's supports and no pier or mole rooted
    on them (§4.8's lead; §2.7's support step (6))".
  * (P4) §4.4 S5a *Trace* (2), after "(stage 1: S3's gates; k ≥ 2: every crossing of an S4, earlier-S5b or this stage's
    S5b arterial)": "— on ground part 0: an arterial crossing the boundary on a raised deck pins no gate there, the deck
    passing over the trace (§2.7's support step (6) (d)), and a pin inside a raised way's under-deck strip moves along its
    arterial to the nearest point clear of it" (VEW-r4-04, amended: no pin on the deck).
  * (P5) §4.4 S5a *Outer moats*, from "The carve clears no raised-way support: §2.7's support step (6) (a) re-sites one
    first in the same commit," to "(S7 lays both, §4.8 *Gates*)." → "The carve clears no raised-way support: a raised way
    standing before the trace is held (§2.7's support step (6)) — the trace runs on beneath its deck, the berm stops at
    the under-deck strip's edges and the channel passes beneath only where its crossing meets no support, ramp, stair,
    foot or `vault` span, else stops there too, reported (`W_RAISED_CROSSING`); a raised arterial passing over the trace
    takes no gate and
    no part-0 deck, and a part-0 way beneath it takes its own ground gate clear of the under-deck strip by §4.2 S3 (4)'s
    gate law (§4.8 *Gates*)."
  * (P6) §4.4 S5b: "so they cross the new boundary `c` times" → "so they cross the new boundary `c` times on ground part 0
    (a crossing on a raised deck no gate, S5a *Trace* (2))"; "An outer enceinte never gets fewer gates than arterials
    cross it" → "An outer enceinte never gets fewer gates than arterials cross it on ground part 0".
  * (P7) §4.5 *The daylight term*'s casters: "walls, gatehouses," → "walls (a run beneath a raised way's span to its
    soffit, §2.7's support step (6) (d)), gatehouses,".
  * (P8) §4.8's lead: "After S7's batches and before S7b, §2.7's support step runs once more on every raised way, its
    keys kept (§2.7's support step (5), (6) (a)): where a station can be neither slid nor omitted, the S7 part it meets
    gives way round its ring (§2.7's support step (6) (a)), reported." → "A raised way standing before a trace is held
    (§2.7's support step (6)): the strips S7 cuts beside that trace stop at its under-deck strip's edges, their setback,
    glacis and berm closed along them, reported (`W_RAISED_CROSSING`); a gate plaza is cut round its supports, ramps,
    stairs and feet; a quay, the intervallum or a castle path crosses its under-deck strip by §4.3's crossing rule, else
    ends at the strip as at a reservation; and no pier, mole or breakwater is rooted on its supports, ramps, stairs or
    feet, a root moved along the shore to the nearest clear one. A raised way created across a standing trace kept its
    piers out of the strip S7 cuts there and out of the quay S7 lays along a `quay` bank (§2.7's support step (3))."
    (VM-R4T-03, amended; VEW-r4-03's §4.8 end.)
  * (P9) §4.8 *Gates*: "Main gates are where S4's and S5b's arterials cross the trace:" → "Main gates are where S4's and
    S5b's arterials cross the trace on ground part 0, or at a raised gate where the arterial's raised way was created
    across the standing trace (§2.7's support step (3)) — a deck passing over a stretch laid after it is no crossing
    (§2.7's support step (6) (d)):", and "so roads leaving each walled stage = its gate count" → "so roads leaving each
    walled stage, so counted, = its gate count"; and the paragraph from "**A trace across a standing raised way** (at
    generation" to "by §4.2 S3 (4)'s gate law." → "**A raised way created across a standing trace** (§2.7's support step
    (3): at generation an S4 viaduct across S3's ring, or an elevated road or aqueduct at S6's end across any ring; at an
    epoch V06 §3.19's founding across a standing curtain; by hand an aqueduct, §7.1) takes the crossing as furniture, at
    generation as at an epoch, in the form V06 §3.7.6 (5) gives it: for an aqueduct a **wall opening** — an arch in the
    curtain under the deck, no gate (no portal, no gate law); for a viaduct or an elevated road a **raised gate** at deck
    level — a gate whose tower carries the deck, its portal on the raised part only — the part-0 way beneath, if any,
    taking its own ground gate by §4.2 S3 (4)'s gate law. A stretch laid after a raised way takes no crossing furniture:
    it runs on beneath the deck, which passes over it with no gate (§2.7's support step (6) (d))."
  * (P10) §4.11's carve: "A raised way the channel passes under keeps its course; a support the channel meets is re-sited
    at generation by §2.7's support step (6) (a); after generation the channel passes under an `open` span, its course
    bent at the dry run (§2.7's support step (6) (b))." → "A raised way keeps its course and every station: the channel
    passes beneath it only where its crossing of the under-deck strip meets no support, ramp, stair, foot or `vault`
    span, else stops at the strip's edges, ending against the ground as against a berm, reported — a hand carve's
    crossing first moved along the deck to the nearest that passes (§2.7's support step (6) (b); §7.1's
    `bend.raised.underSpan`)."
  * (P11) §4.11 `wallToWay`: VDC4-05's text (its own FIX), "§2.7's support step (3)" its citation.
  * (P12) §4.13's raised-way row, `wall` cell: "crosses a town enceinte only on a gate's line or as the aqueduct's arch;
    no support in a wall strip but the crossing's station on the band (§2.7's support step (3), (6)); a village palisade
    abuts its supports, the deck passing over with no gate (V07 §3.5a (4))." → "created across a standing enceinte,
    crosses it only on a gate's line or as the aqueduct's arch, no support in its wall strip but the crossing's station
    on the band (§2.7's support step (3)); a wall stretch laid after it — a village palisade's among them — runs on
    beneath its deck, built against the supports, ramps, stairs, feet and `vault` spans in its band, no gate on the deck,
    its strips stopped at the under-deck strip (§2.7's support step (6) (d); V07 §3.5a (4))." (VEW-r4-02's and
    VAL-R4-03's pipeline ends.) Its `river, coast, moat` cell: "and one laid after the course stopped at the under-deck
    strip where it cannot pass under the deck, the course kept (§2.7's support step (6); `W_RAISED_CROSSING`)" → "and one
    laid after the course passing beneath only where it meets no support, ramp, stair, foot or `vault` span, else stopped
    at the under-deck strip, the course kept (§2.7's support step (6) (b); `W_RAISED_CROSSING`)".
* **determinism**
  * (D1) §7.1's outcome table: `bend.wall.held`'s cause cell → "a hand `convert` `breach` or `dismantle` of an enceinte
    stretch, or a `delete` of the enceinte or of its raised gate or wall opening there, meeting the stretch held under a
    raised way's crossing station while its deck stands (§2.7's support step (3))"; its outcome cell adds after "an op
    wholly on the held stretch changes nothing, with its line": "; a `delete` of the enceinte takes the rest as a
    `dismantle` of every other run, the record kept with the held stretch standing as a free-standing gate tower or arch
    carrying the deck (as `wallToWay` and `absorbWall` leave it, V06 §3.7.6 (5))" (VDC4-04's FIX). `bend.wall.raisedCrossing`'s
    row → "| a hand `drawWall`, a moved trace vertex or a re-anchored stretch across a standing raised way (§2.7's support
    step (6) (d)) | bent | the stretch on its course beneath the deck, built against each support, ramp, stair, foot or
    `vault` span in its band and topped at a span's soffit, no gate or tower in the under-deck strip (moved along the way
    or the trace clear of it), its setback, glacis and berm stopped at the under-deck strip's edges and its channel
    passing beneath only where it meets none of these; the raised way unchanged; named in one line |
    `bend.wall.raisedCrossing` |". `bend.raised.underSpan`'s row → "| a ground `drawWay`, a moved way or a hand carve
    meeting a standing raised way's supports, ramps, stairs, feet or a `vault` span's strip, or crossing its under-deck
    strip where §4.3's crossing rule does not admit it (§2.7's support step (6) (a)–(b)) | bent | the way or channel moved
    along the deck to cross under the nearest span that admits it; where none does, a way takes another course by §4.3's
    router as a route does — round the raised way — else the nearest routable pair (§4.3 *Two-point roads*; item 101
    R2), and a carve's channel stops at the under-deck strip's edges, ending against the ground as against a berm; named
    in one line | `bend.raised.underSpan`, `bend.raised.around` |" (VDC4-03's FIX, amended: one row, two keys). The
    catch-all: VDC4-06's second end.
  * (D2) §7.3's S7 row: "on each standing raised way the new run crosses, the run bent through its nearest station on the
    deck at its level and its strips stopped under the deck where they cannot pass (§2.7's support step (6) (b)) — that
    raised way's crossing station in the effective scope and the fate report (§7.3 item 4), nothing else of it
    re-derived" → "on each standing raised way the new run meets, the run passing beneath its deck and its strips stopped
    at the under-deck strip's edges (§2.7's support step (6) (d)) — nothing of the raised way re-derived or in the
    effective scope".
  * (D3) §7.4's raised-way row: "its deck and piers held (a later trace's crossing station taking the band's stretch,
    §2.7's support step (6) (b))" → "its deck and piers held, as every raised way is from its creation (§2.7's support
    step (6))".
  * (D4) §5.3's gate row: "the roads leaving each walled stage equal its gate count" and "an outer enceinte's gates ≥ its
    arterial crossings" each add "(on ground part 0 or at a raised gate; a deck passing over a stretch laid after its
    raised way is no crossing, §2.7's support step (6) (d))".
  * (D5) §5.4's `warnings` comment: VM-R4T-04's FIX in VPC-R4-03's words.
* **rendering** (R1) §8.4's shadow casters "curtain walls (prism of the band)" → "curtain walls (prism of the band; a run
  beneath a raised way's span topped at its soffit, §2.7's support step (6) (d))"; its heightfield writers "flat roofs,
  walls, towers and gatehouses as the tops of their prisms" adds "(a wall run beneath a raised way's span topped at its
  soffit)"; §11.1's 3-D row: a wall run beneath a raised way's span exported topped at its soffit (§2.7's support step
  (6) (d)), in its words.
* **scope** (S1) §13.2's T110-2, from "later work across a raised way (§2.7's support step (6)):" to "(`bend.raised.underSpan`
  for the hand road; §4.3);" → "later work across a raised way, held from its creation (§2.7's support step (6)): a CITY
  c14 fixture whose S4 viaduct over a valley is crossed by stage 2's moated ring — the ring running on beneath the deck,
  each support, ramp or stair in its band taken into the line, no crossing station and no gate on the deck, the arterial
  on the deck pinning no gate and S5b's count read on ground part 0, the setback, glacis and berm stopped at the
  under-deck strip's edges and the channel passing beneath only where it meets no support, ramp, stair or foot, every
  station, key and span as S4's commit laid them; (1) a CITY c15 town with `moat: 'all'` whose S4 timber viaduct is
  crossed by stage 2's ring at the widest moat row — the channel stopped at the under-deck strip's edges, no support in
  water, `W_RAISED_CROSSING` reported; (2) a stage-2 S5b viaduct crossed by stage 2's own moated ring, and a stage-2 ring
  whose boundary falls on an S4 viaduct's ramp at a valley rim — the ramp taken into the line, no ramp, stair or foot in
  a strip or the channel; (3) on the CITY and METROPOLIS fixtures, 0 piers in a setback, glacis, berm, moat, gate plaza,
  quay's corridor, pier, mole or a way's corridor — among them a CITY masonry viaduct across a `quay`-banked river at its
  clear-span bound (both bank stations behind the quays' corridors, each quay one connected way passing under its span)
  and a CITY S4 timber viaduct crossed by a `through` S5b road and an S5c street, each crossing under a span clear of its
  supports; (4) an epoch circuit across a standing aqueduct and one across a standing timber elevated road, a hand
  `drawWall` across a standing aqueduct and one across a declared one-span masonry viaduct, and an epoch contraction
  meeting an aqueduct within p ÷ 2 of an older ring's crossing station, each run again with the raised way locked — the
  stretch on its course beneath the deck, each support, ramp, stair, foot or `vault` span in its band taken into the
  line, an ordinary run beneath every other span topped at its soffit, no gate or tower in the under-deck strip, its
  setback, glacis and berm stopped at the under-deck strip's edges and its channel beneath only where it meets none of
  these, the older ring's crossing station untouched, every station, key, span and state of the raised way unchanged,
  the hand case naming `bend.wall.raisedCrossing`; and a hand `delete` of a wall whose raised gate carries a standing
  viaduct's deck — every other run dismantled, the gate tower kept carrying the deck, `bend.wall.held`; (5) an H-AQUA
  epoch growing a stage over a standing aqueduct's land, an epoch route re-solved under a viaduct, a hand road drawn
  across one and a hand road wider than every `open` span's clear width drawn across one — 0 way corridors over a support
  ring, ramp, stair, foot or `vault` span, every crossing under a span §4.3 admits (`bend.raised.underSpan`; the wide
  road routed round the raised way, `bend.raised.around`); (6) a Re-derive from S4 of (1)'s c15 fixture with its S4
  timber viaduct locked — stage 2's ring and moat meeting it as in (1), no station moved, added or omitted and no key
  minted, 0 S5b or S5c way corridors over a support ring, ramp, stair or foot;" (VM-R4T-02's FIX, amended; the scope ends
  of VEW-r4-01, VEW-r4-03, VM-R4T-01, VDC4-03 and VDC4-04). T110-2's frame-growth clause adds "every station of the old
  deck at its key, position and ring after the growth" (VV34-r4-01's scope end). The T110 runs sentence ("Volume 6 runs
  T110-2's epoch clauses (4) and (5) on its engine (T-V6-47)") and §13.8's row stand.
* **V04** — §1b's `ArchVaults.reconcile` row (l. 328): "the tail's T2 vaults step (every raised way, after generation's
  last support run, §2.7's support step (6) (a))" → "the tail's T2 vaults step (every raised way, after the span rule's
  eager run, §2.7)", and its list drops "and a hand trace through one of its stations (§2.7's support step (6) (b)
  (iii))" and, in the epoch list, "a circuit's, contraction's or re-anchored stretch's crossing station,"; the edit row
  (l. 372) drops "or crossed by a hand trace through one of its stations (`drawWall`, or `moveVertex` on an enceinte's
  trace, a re-anchored stretch among them; §2.7's support step (6) (b) (iii))" and its "T3 `wall`" tool; the arch-vault
  entity row (l. 867) drops "and a trace's crossing station taken on it (§2.7's support step (6) (b) (iii))" and "a
  trace's crossing station,"; §3.5.0 *At an epoch* (l. 1338–1351): "a trace's crossing station and the frame growth's
  deck extension among them" → "the frame growth's deck extension among them, its old stations kept (§2.7's support step
  (7))", and "a crossing station its pier's former ring (§2.7's support step (6) (b) (iii))" is dropped; §3.10 (l.
  2283–2289): "re-lays those of a raised way a circuit, contraction or re-anchored stretch crossed through one of its
  stations (§2.7's support step (6) (b) (iii): that station's support the band's stretch, each vault between its
  raised-way piers' inner faces) or whose deck the frame growth extended" → "re-lays those of a raised way whose deck the
  frame growth extended (the old deck's stations and spans kept, §2.7's support step (7))"; §4.3's row (l. 2579) drops "a
  hand trace through one of its stations (…)" and "a circuit's, contraction's or re-anchored stretch's crossing
  station,"; §6 (l. 3009): "(its add, re-shape or removal, a hand trace's crossing station)" → "(its add, re-shape or
  removal)"; T-V4-63: "crossed through one of its stations by an epoch circuit and, on a second run, by a hand `drawWall`
  (§2.7's support step (6) (b) (iii))" → "passed beneath by an epoch circuit and, on a second run, by a hand `drawWall`
  (§2.7's support step (6) (d)) — the `vault` span's arch vault taken into the line, never entered, and no arch vault
  changed by either —", "(a crossing station's support its band stretch)" dropped, and "the hand case's undo restores the
  vaults with the same ids and footprints" → "the frame growth's case keeping every old station and its vaults" ;
  T-V4-65's at-epoch clause: VV34-r4-01's V04 end. (V04's one trigger — the commit of every change to a raised way's
  `feet`, `supports` or `spans`, whoever makes it — stands; a later trace is no longer such a change.)
* **V06** — §3.6 (4) (l. 1436) and §3.19's lead (l. 2736): "(§2.7's support step (6) (b))" → "(§2.7's support step (6))";
  §3.19's lead "and a later wall trace crosses it only through one of its stations (V06 §3.7.6 (5))" → "and a later wall
  trace runs on beneath its deck (V06 §3.7.6 (5))"; §3.7.1's widening (l. 1462–1463): "excepted where the trace crosses it
  (its strips stop there, §2.7's support step (6) (b))" → "excepted where the trace meets it (the trace running on
  beneath its deck, its strips stopping there, §2.7's support step (6) (d))"; §3.7.6 (5)'s second and third bullets →
  "* a trace this section makes meets a standing raised way as a stretch laid after it (§2.7's support step (6) (d)): it
  runs on beneath the deck, each support, ramp, stair, foot or `vault` span in its band taken into the line, no crossing
  station and no gate on the deck, its setback, glacis and berm stopped at the under-deck strip's edges and its moat
  passing beneath only where it meets none of these — never along its under-deck strip; * a **wall opening** (an
  aqueduct) or a **raised gate** (a viaduct or an elevated road) is S7 furniture only where a raised way is created
  across a standing curtain (V06 §3.19's founding; §2.7's support step (3)): for an aqueduct an arch in the curtain, not a
  gate (no portal, no gate law); for a viaduct or an elevated road a gate whose tower carries the deck, its portal on the
  raised part only (the part-0 way beneath, if any, takes its own ground gate by S5a's gate law)"; the continuity bullet's
  "(§2.7's support step (6) (b); …)" → "(§2.7's support step (6) (d); …)"; the absorb bullet cites "§2.7's support step
  (3)" for the stretch left standing; W64, `EpochScope.raised` (l. 465) and §2.1: "a trace's crossing station" dropped
  from each list; W68's middle cells → "the trace's cost field and strip rule; the trace running on beneath the deck
  (built against the supports in its band, no crossing station, no gate on the deck), its strips stopped at the
  under-deck strip's edges, counted `walls.raisedCrossings` (V06 §2.10); a wall opening (aqueduct) or a raised gate
  (viaduct, elevated road) as S7 furniture where V06 §3.19's founding creates a raised way across a standing curtain;
  `absorbWall` and `wallToWay` leaving the raised way and its crossing station standing" and its home cell "§2.7's support
  step (3), (6)"; §2.10's `raisedCrossings` comment "(…; §2.7's support step (6) (b))" → "(…; §2.7's support step (6)
  (d))"; T-V6-47's H-AQUA clauses → "on H-AQUA an aqueduct is met by both a new circuit and a later contraction: each
  trace runs on beneath its deck, each support, ramp or stair in its band taken into the line, no crossing station, gate
  or opening made, its setback, glacis and berm stopped at the under-deck strip's edges and its moat passing beneath only
  where it meets no support, ramp, stair, foot or `vault` span, each stop counted in `walls.raisedCrossings`; a viaduct a
  later trace meets gets no gate; `wallToWay` of a ring a raised way was created across leaves the raised way and its
  crossing station standing, with no junction to the ring road; **later work across a standing raised way** on H-AQUA
  (takes T110-2's epoch clauses): an epoch circuit across its standing aqueduct and one across its standing timber
  elevated road, each run again with the raised way locked — the same outcome, no trace waiting, every station, key, span
  and state of the raised way unchanged; an epoch growing a stage over the aqueduct's land and an epoch route re-solved
  under its viaduct — 0 way corridors over a support ring, ramp, stair, foot or `vault` span, every crossing under a span
  §4.3 admits (§4.3)" and its bar cell "0 sheer-arc edges; 0 crossing stations taken, 0 gates on a deck and 0 supports
  in a strip by a later trace; 0 stations moved, added or omitted and 0 keys minted on a standing raised way, locked or
  not; 0 way corridors over a support ring, ramp, stair, foot or `vault` span; exact"; §7's table row for T110-2's epoch
  clauses (l. 4099): "through one station on the deck at its level" → "running on beneath the deck"; J-V6.91 → "chose
  that a raised way created across a standing curtain crosses it at one station — a wall opening for water, a raised gate
  for traffic — and that a trace laid after a raised way runs on beneath its deck, built against its supports, with
  continuity a hard rule (what cannot pass beneath stopped at the under-deck strip's edges and reported, never a trace
  waiting; §2.7's support step (3), (6)), over routing the trace around the raised way or re-siting its piers, because
  walls let aqueducts through by arches, gates stood where roads met walls, and town walls were built against standing
  aqueduct piers". VV56-r4-02 (H-AQUA's definition) and VAP-r4-01's T-V6-73 end are under V06 and scope.
* **V07** — VAL-R4-02 and VAL-R4-03 (its own FIXes, as R5-02 words them in Part H), with VEW-r4-02's V07 ends folded into
  VAL-R4-03's text.
* **V09** — §4.9's `bend.wall.raisedCrossing` row's words → "The wall runs on beneath {way}, built against its piers;
  the raised way stays as it is." and its source cell "§7.1's outcome row for a hand `drawWall`, a moved trace vertex or
  a re-anchored stretch across a standing raised way (§2.7's support step (6) (d))"; a new row `bend.raised.around`
  "No arch of {way} is wide or high enough for {name}, so it goes round." — `{name}` and `{way}` as in
  `bend.raised.underSpan` — `button.showWhy` why, source "§7.1's `bend.raised.underSpan` row: a ground way no span of a
  standing raised way admits"; §4.20.2 (4)'s **Later work** sentence → "**Later work across a standing raised way** gives
  way to it, the raised way held (§2.7's support step (6); §7.1's outcome table): a wall T3 `wall` draws, a trace vertex
  moved or a stretch re-anchored across one runs on beneath its deck — built against each support, ramp, stair, foot or
  `vault` span in its band, no gate on the deck, its setback, glacis and berm stopped at the under-deck strip's edges and
  its moat passing beneath only where it meets none of them, nothing of the raised way changing
  (`bend.wall.raisedCrossing`); while the deck stands, a **Change over time** breach or dismantle, or a delete of the
  wall, meeting the stretch held under a crossing station leaves that stretch standing (`bend.wall.held`; §2.7's support
  step (3)); and a ground road T4 `road` draws, a way moved or a carve across it crosses under the nearest span §4.3
  admits, never over a support, ramp, stair, foot or `vault` span (`bend.raised.underSpan`), a road no span admits going
  round it (`bend.raised.around`)." (VDC4-06's own FIX writes the sentence before it.) T-V9-52: "a wall drawn across a
  standing viaduct passes through its station on the deck at its level nearest where it would cross, that pier built into
  the wall and every other station, key and span unchanged, with `bend.wall.raisedCrossing`" → "a wall drawn across a
  standing viaduct runs on beneath its deck, built against each support in its band, no gate on the deck, every station,
  key and span unchanged, with `bend.wall.raisedCrossing`"; "a breach on the stretch held under a crossing station leaves
  that stretch standing, with `bend.wall.held`" adds "and a delete of that wall dismantles its other runs and keeps the
  gate tower carrying the deck, with `bend.wall.held`"; "a road drawn across a viaduct crosses under its nearest `open`
  span …, with `bend.raised.underSpan`" adds "and one wider than every `open` span goes round it, with
  `bend.raised.around`".
* **V11** — §3.24.2's readers (l. 3907): "the support step's re-runs in S5a and after S7's batches (§2.7's support step
  (6) (a))," dropped; (l. 3981): "on a raised way a stage's S5a trace or outer moat crosses and once more after S7's
  batches (S5a, S7; §2.7's support step (6) (a))," dropped. The cells and values stand.

**Sweep (the three blind spots).** (a) V07: §3.5a (2)–(4), (7), §3.12's item-110 paragraph, §3.12a (4)'s ruin abutment
(l. 2705: "abuts it as it abuts a support" — stands), §3.17's palisade row and T-V7-48 — all in VAL-R4-02's and
VAL-R4-03's texts. (b) V09 and V10: V09 §4.9's three bend rows, §4.20.2 (4), T-V9-52 and row 39 (no crossing-station
words; stands); V10 states no crossing rule (searched: no hit for a crossing station, a raised gate or the support step).
(c) Tests and fixtures: T110-2 (rewritten above), T114-3 (VAP-r4-01; the crossing station's decay, landfall and regrowth
stand), §13.8's T110 row and the take-over's evolution row (stand), T-V6-47 and V06 §7's row (above), T-V6-73 (stands,
with VAP-r4-01's end; its H-AQUA fixture is VV56-r4-02's), T-V5-14's raised-gate clause (stands: a crossing station on a
raised gate), T-V4-63 and T-V4-65 (above), T-V7-48 (VAL-R4-03), T-V9-52 (above). V01 (§3.17.3 (3) cites §4.3; its raised
gate and wall-arch readings at l. 978, 1424, 2485 stand), V05 (§3.16's landfall rows: a crossing station's support is its
wall stretch — stands), V12 (no crossing statistic) and V02, V03, V08, V10 need nothing.

### R5-03 A late dossier change never moves the clock back, and a late calamity is never lost

**Governs:** VAT4-r4-01 (pipeline), VPC-R4-02 (pipeline, MERGED), VV78-r4-04 (V08); ends at determinism (§7.1's
`dossierFacts`, §7.7's `DossierBinding`), V08 and scope (T76-1). **Amends** R4-08's last clause ("with the absorb's week
itself before the last epoch's (V08 §3.6's degenerate row) it folds no epoch and its dated changes apply finished,
noted"); the rest of R4-08 stands.

**The case.** Round 4 gave a calamity dated at or before the last epoch's week `W₀` a ride on the absorb's first epoch.
At an absorb whose week `W₁` equals `W₀` — the ordinary second sync in the week the last epoch fell — no epoch can fold
(its span would be empty), so the base wrote an impossible epoch and V08 an absorb in which the calamity, no longer
"newly carried" at the next sync, never strikes. And a late non-calamity change in an absorb with `W₁` after `W₀` had no
week at all: folded "at its week", it set the document's current week back before the last epoch (VV78-r4-04).

**Owner rules checked.** Item 122 (a): what a crisis leaves "reaches the map only by the existing path (the calamity and
the population change into the next epoch, V06's hazard phase …)" — so a calamity rides the next epoch that is folded,
whenever that is. Item 125 (b): "a missing or empty field never refuses, never stalls, and is reported". Item 125 (a)/(c):
the dossier is the only input; nothing here reads a host clock.

**Decision.** **§4.11 *The clock* (4)** (pipeline's home), from "A newly carried calamity dated at or before the last
epoch's week folds no epoch at its own week:" to "…its dated changes apply finished, noted." →
"A newly carried change dated at or before the last epoch's week `W₀` is **late**: it never folds at a week before `W₀`, so
the document's current week ((1)) never falls back. A late **calamity** folds no epoch at its own week and is never lost:
where the absorb's week `W₁` is after `W₀` it rides the first epoch this absorb folds (`DossierPort.absorb`; with none,
the port folds one at `W₁` for it), its `EpochInputs.events` entry at that epoch's first week `W₀` + 1 and its F5 targets'
dossier events in that epoch's `EpochInputs.dossier` at the same week; where `W₁` is not after `W₀` (a second absorb in the
last epoch's own week, or a clock turned back) this absorb folds no epoch — the calamity's F5 targets' dossier events
apply now at `W₀` as element events, finished (no Works), and the calamity is held in the binding
(`DossierBinding.lateCalamities`, §7.7) until the first epoch a later absorb folds, which it rides at that epoch's first
week. Either way its own tick stays in its receipt, its hazard strikes and its deaths reach the burial need. Every other
late change folds after the last epoch at `W₀` + 1 where `W₁` is after `W₀`, else at `W₀`, applied finished (no Works), noted
(`unreceipted_change`'s `late` variant, V08 §4.6); a population move carried by an absorb whose week is not after `W₀`
crosses at the next absorb whose week passes `W₀` (V08 §3.6 (3))."

**Ends.**
* **determinism** — §7.7's `DossierBinding` adds `lateCalamities: string[] /* the binding keys of late calamities held
  for the first epoch a later absorb folds (§4.11 The clock (4)); set by folding each dossierFacts event's list, as
  quarantined is; [] in an older document */`; §7.1's `dossierFacts` event adds `lateCalamities: string[] /* the whole
  held list after this absorb (§4.11 The clock (4); V08 §3.6 (4)) */`; §7.4's lifecycle of the binding's fields is the
  fold's, as for `quarantined` (no undo: a dossier event is no undo target).
* **V08** (VV78-r4-04's FIX carries its own texts; these join it) — §3.6 (3): "A newly carried calamity dated at or before
  `W₀` folds no epoch at its own week: it rides the first epoch this absorb folds — with none, one the port folds at `W₁`
  for it — at that epoch's first week `W₀` + 1, its tick kept in its receipt, by §4.11 *The clock* (4)'s rule (with `W₁`
  not after `W₀`, V08 §3.17's degenerate row)" → "A newly carried calamity dated at or before `W₀` is late and folds no
  epoch at its own week (§4.11 *The clock* (4)): with `W₁` after `W₀` it rides the first epoch this absorb folds — with
  none, one the port folds at `W₁` for it — at that epoch's first week `W₀` + 1; with `W₁` not after `W₀` its F5 targets'
  dossier events apply now at `W₀`, finished, and it is held in `DossierBinding.lateCalamities` (§7.7; (4)) for the first
  epoch a later absorb folds, which it rides at that epoch's first week; its tick kept in its receipt either way"; the
  crossing clause adds "— none when `W₁` is not after `W₀`, the crossing then read at the next absorb whose week passes
  `W₀`"; the calamities' parenthesis "(one carried late: of the first epoch this absorb folds, at `W₀` + 1, its F5 targets'
  dossier events riding that epoch with it, above)" → "(one carried late: of the first epoch this absorb folds, or for one
  held a later absorb's, at that epoch's first week — its F5 targets' dossier events riding that epoch's
  `EpochInputs.dossier` with it where `W₁` is after `W₀`, above)". §3.6 (4): the ledger event lists `lateCalamities`
  beside `quarantined`, "folding it sets `DossierBinding.lateCalamities` to the list". §3.6 (6): VV78-r4-04's sentence
  reads "A newly carried change dated at or before the last epoch's week `W₀` folds after the last epoch at `W₀` + 1 where
  `W₁` is after `W₀`, else at `W₀`, applied finished (no Works), its own tick kept in its receipt and noted by
  `unreceipted_change`'s `late` variant — never at a week before `W₀`, so §4.11 *The clock* (1)'s current week never falls
  back (a late calamity: (3))." §4.6's `unreceipted_change` row: VV78-r4-04's text. §3.17's 'changes to events and epochs'
  row: its degenerate inputs read "an absorb whose week is the last epoch's own (`W₁` = `W₀`) or before it (a clock
  turned back): no epoch; late changes at `W₀`, finished, noted `late`; a late calamity's targets applied and the
  calamity held for the next folded epoch; a population move read at the next absorb past `W₀`", and add VV78-r4-04's
  `W₁`-after-`W₀` row. §2.6's binding lifecycle gains the `lateCalamities` row (written by folding `dossierFacts`; read by
  the port's next absorb; persisted with the binding, rebuilt by the fold; no undo; absent in an older document `[]`).
  T-V8-49 (g) adds VAT4-r4-01's fixture (a second absorb in the last epoch's own week carrying a calamity dated that week
  and a population move past the tolerance — no epoch, the calamity's targets applied; the next absorb past `W₀` folding
  the crossing and the calamity's strike at its first epoch's first week, its deaths in that epoch's burial need) and
  VV78-r4-04's (the current week not before `W₀`).
* **scope** — T76-1's late-calamity fixture adds "and one carried by a second absorb in the last epoch's own week — no
  epoch, its targets applied, the calamity riding the next absorb's first epoch at that epoch's first week, its deaths in
  that epoch's burial need; and a late non-calamity change in an absorb whose week is after the last epoch's — folded at
  the last epoch's week + 1, the document's current week never before it".

**Sweep.** V06's hazard phase and burial need read `EpochInputs.events` and `CalamityRef.deaths` as before (no change);
V09's and V10's dossier readers (the history panel, `read_map` of a calamity) read the folded events and need no change;
V12 has no late-change statistic. Tests: T-V8-49 (g), T76-1 (above); T-V6-24's catch-up fixtures are unaffected.

### R5-04 A restoring re-cut's entry week at every restatement of the plan's damage

**Governs:** VDC4-01 (determinism, §6.3 — the home of the comparison), VAF-R4T-03 (rendering, §8.6; V02's end),
VAH-r4-01 (V09), VAT-r4-04 (V09, MERGED). R4-03 stands; this writes its comparison at the sites R4-03's sweep missed.

**Owner rule checked.** Item 123 (b): "the building's decay level … shows every element whose threshold it has passed …
Restoration … lowers the level and the damage leaves in reverse order, a repaired element drawn in patch material" — an
element the restoration itself made was never damaged, so it is neither drawn damaged nor patched.

**Decision.** One comparison, stated at §6.3 and cited everywhere: an element shows damaged exactly while the level is
above 0 and at least its threshold t, **compared from its entry week into the plan** (V03 §5.6 (2) (a)–(b)) — for an
element a restoring event's re-cut mints, the week that restoration ends, before which it draws as built (V06 §3.23 (3))
— but for §2.6 step 7's roofless case; and a building never decayed draws its plan unchanged only when no disaster look
stands over it. Texts: VDC4-01 (§6.3), VAF-R4T-03 (§8.6's lead), VAH-r4-01 with VAT-r4-04's row-92 edge (V09).

**Ends.** **V02** — §5.7 (2): "damaged, by §6.3 *Plan damage*'s one comparison (the level above 0 and at least its keyed
threshold t: §6.3's `plan.damage`, V11's ranges)" adds "from the element's entry week into the plan (V03 §5.6 (2) (a))",
and "so an element added after its building's damage left (a wing an `extend` adds, an element a re-cut makes) is drawn
as built" → "so an element added after its building's damage left (a wing an `extend` adds, an element a re-cut makes),
or one a restoring event's re-cut mints (V06 §3.23 (3)), is drawn as built". **rendering** (the tests' blind spot) —
T-ER-28's input "an element a restoring re-cut or an `extend` adds after its building's damage left" → "an element a
restoring re-cut mints while its `repair` Works still runs, and one a re-cut or an `extend` adds after its building's
damage left", its outcome "drawn as built, never as a repair" reading "drawn as built in every week, never damaged by
that restoration nor as a repair".

**Sweep.** V03 §5.6 (2) and T-V3-39 (c), §2.6 step 7, V06 §3.23 (3) and T-V6-76 (b), V10 §3.9a (l. 1829, 1856) already
carry it; V04's underground plan damage reads `decayPeak` with V03's `since` and needs nothing; V12 has no per-element
statistic. V09's T-V9-86 and V10's T-V10-53 run "a restoration with patches" through `planDamage` and need nothing.

### R5-05 Find at a drawn week: every reader passes the week, and its clauses land with V06's frames

**Governs:** VV12-r4-01 (V09), VAF-R4T-02 (V07), VAT-r4-03 (V10), VAH-r4-02 (V10, MERGED), VRC4T-04 (rendering),
VV12-r4-02 (V01); the scheduling class VAP-r4-06 (V04), VAP-r4-07 (V05), VAP-r4-08 (V09), VAP-r4-09 (V10), VV12-r4-04
(V01); ends at rendering, V01 and V03. **Extends** R4-12's routing (R4-12 stands).

**Owner rules checked.** Item 120 (f): "Every commit, regenerate, undo, advance of time and season change re-evaluates the
chips at once — a new smithy glows as it appears, a closed one goes dark"; item 120 (k): "each chip's matches equal the
gazetteer query's rows at the key"; item 120 (a): Find never changes the model, the document, its hash or the edit log.

**Decision.** (a) **One reader list.** §11.2 *At a drawn week*'s list is the canonical list of the readers that pass
their view's week, and every one of them reads the frame's listing there: `live.find`, V09's panel, V10's `read_map find`,
V01's `findAreas` and `gapUnits`, V04's and V05's Find places, and V07 §5.5's village reading. A text that restates one of
these reads the week (VV12-r4-01 at V09, VAF-R4T-02 at V07, VAT-r4-03 at V10). (b) **Re-evaluation.** A change of the
drawn week re-evaluates the chips, off the scrub's path, within ≈ 100 ms of the frame being drawn at the METROPOLIS cap —
the same interaction budget as a chip's glow (item 119 (d)'s budgets unchanged; VRC4T-04's texts). (c) **Scheduling.**
A test clause that reads a drawn week whose frame is not the head lands at the later of its own milestone and V06's E6
(V06 §3.15.2's history frames), and its timing cell says so (INDEX §5 risk 2's rule, "each named in its volume").

**Ends.** **rendering** — §11.2 *At a drawn week*: "(`live.find`, V09's panel, V10's `read_map find`, V01's `gapUnits`,
V04's and V05's Find places)" → "(`live.find`, V09's panel, V10's `read_map find`, V01's `findAreas` and `gapUnits`, V04's
and V05's Find places, V07 §5.5's village reading)" (VV12-r4-01's end, with VRC4T-04's FIX in the next sentence). **V01**
(the tests' blind spot) — T-V1-60's timing cell "From M5; clause (e) from M3b, …" adds "; (c)'s scrubbed-week clause at
the later of M5 and V06's E6 (V06 §3.15.2's frames)". **V03** — T-V3-39's timing cell adds "; its scrub across the run at
the later of P4 and V06's E6 (V06 §3.15.2's frames)".

**Sweep.** (a) V07: §5.5 (1), (2), (4), W83 and T-V7-68 — VAF-R4T-02's text, its T-V7-68 timing naming E6. (b) V09:
§1b's Find rows (l. 311, 312), §4.21.10 (3) (iii), (7) — VV12-r4-01; (8) and (10) already read the frame (R4-12). V10:
§3.9b (7), §3.23 row 32, T-V10-51 — VAT-r4-03 (VAH-r4-02's wording merged). (c) Tests: T-V1-59 (VV12-r4-02, VV12-r4-04),
T-V1-60 (above), T-V3-39 (above), T-V4-81 (VAP-r4-06), T-V5-36 (VAP-r4-07), T-V7-68 (VAF-R4T-02), T-V9-83 (VAP-r4-08),
T-V10-51 (VAP-r4-09), R12-35 and T120-6 (VRC4T-04). T-V6-21 and T-V6-76 are V06's own, at E6.

### R5-06 V07's village restatements of the town's crisis rules: the count and the hand-over

**Governs:** VAF-R4T-01, VAL-R4-05, VV78-r4-01, VV78-r4-02 (all V07). R4-04 and R4-13 stand; their sweeps did not reach V07
(the orchestrator's blind spot (a)).

**Owner rules checked.** Item 122 (b): "**disaster** — whole neighbourhoods in a temporary ruined state … the share by
severity … the calamity's `targets` win where the dossier names the place hit"; (a): "a disaster's ruined look gives way
to the Works scaffolding of `reconstruction`"; (d): "Interiors in a disaster's ruined neighbourhood show item 123's damage
as a look while it lasts".

**Decision.** At the village rungs the disaster's units are counted as V01 §3.16 (5) counts them — the first max(k,
|`matched`|) of the order, all of a shorter fire order, the shortfall reported (VAF-R4T-01), and every reader of the
look's damage, tone, lines and rows reads R4-04 (b)'s one predicate — the look stands over a building of its units until
V06 §3.22 (3)'s `crisisLookYields` turns true on it, a preview never handing over (VAL-R4-05 at T-V7-69 (c); VV78-r4-01 at
§4.5, W74, §5.6 (6) and T-V7-69 (e); VV78-r4-02 at §5.6 (3), (5) and §3.17's row). Each issue's text as written.

**Sweep.** V07 §5.6 (1)–(8), §4.5, W74, §3.17's crisis rows and T-V7-69 (a)–(e) are the sites; V07 §5.6 (7)'s barriers
stand (R4-06). V09's and V10's village rows read V07's provider (R3-16 (e)) and need nothing.

### R5-07 Item 125 at an absorb: the population the cadence reads, a record's own fields, the name, the key and §14's words

**Governs:** VEL4-r4-01, VV78-r4-03, VV78-r4-07 (V08); VDC3-03, VAH-r4-03, VAH-r4-04 (scope). **Amends** R4-15 (a)'s reach
(R4-15 stands).

**Owner rule checked.** Item 125 (b): "Every dossier field the map uses has a stated standalone fallback — the generator's
own choice, exactly as on a map made without a dossier — so a missing or empty field never refuses, never stalls, and is
reported"; (e): "A dossier with only SettlementForge's required keys generates a full map".

**Decision.** (a) **A field is a row's own path** — a top-level key or a whole list. At an absorb a field that takes its
fallback changes nothing, the carried fact standing (R4-15 (a)); inside a record the digest reads, an absent or
unreadable sub-field takes its row's reading — an institution field's `else`, the `activeConditions[]` row's missing
`label`, `duration` and `sourceEventType` — at an absorb as at a creation and is compared as read, so a record follows
what the dossier now says of it (VV78-r4-03: SettlementForge's current-only stamps mean what they say; an institution it
reopens reopens). (b) **The cadence reads the carried population** where an absorb's `population` took its fallback —
in the linear target and in the crossing test at `W₁` — never the digest's fallback value (VEL4-r4-01). (c) The name's
fallback serves a creation; an absorb keeps the carried name (VV78-r4-07). (d) §14 restates V08 in V08's terms: the key
never checked against a minted one (VDC3-03), `select`'s two refusals by the required keys (VAH-r4-03), and the
`field_fallback` comment's "empty" as V08 §3.5 defines it — an empty list is a value (VAH-r4-04). Each issue's text as
written.

**Sweep.** V08 §2.4's table lead, §3.5, §3.6 (3), §3.17's rows, §5.5, T-V8-61 (a) — in the texts above. V09's title and
V10's dossier answers read the document's name and the carried facts, not the digest's fallback; V12's port statistics
count `field_fallback` notes and need nothing.

### R5-08 The crisis look's readers in V09 and V10: the why line's forms, a look's own marks, a field a famine bares, a section read at the view's week

**Governs:** VV910-r4-01 (V09), VV910-r4-02 (rendering), VV910-r4-03 (V09; its rendering end), VAT-r4-01 (rendering; V10,
V03 and V09 ends), VV910-r4-04 (V10). R4-04 (c) and R4-05 stand; this closes the inputs their readers name (the
orchestrator's blind spot (b)).

**Owner rules checked.** Item 122 (f): "The 'Why?' card and the clerk name the crisis and its weeks"; item 122 (e): "a
condition the viewer's key withholds is not drawn"; item 120 (a) (no reader writes).

**Decision.** (a) Every form a crisis line can take has a string — a look with no name, no `untilWeek`, neither, and a
preview (VV910-r4-01's keys). (b) Each `live.crises` mark carries its look (the `ConditionOverlay`'s interned handle in
`entity`; none for a preview), so **Show** and Find's **Go to** frame one look (VV910-r4-02). (c) §11.2's `looks` takes a
`field` as it takes a `building`, each famine look saying whether it bares that field, evaluated in the generation
worker (VV910-r4-03; the village rungs' field row stays V07's provider's). (d) A why section whose rows read the drawn
week reads the why's view week, else the document's current week (VAT-r4-01's texts at §11.2, V10 §2.13, §3.9, §3.23
row 34, V03 §4.6 and T-V9-86). (e) A `look` read asked with a `building` that names no building answers no `over`
(VV910-r4-04). Each issue's text as written.

**Sweep.** V09: §1b's crisis rows (l. 377), §2.12 (l. 1007, 1010), §4.9's `info.crisis.*` rows, §4.21.12 (4)–(7),
§4.21.13 (1)–(3), rows 90 and 92, T-V9-85, T-V9-86 — in the texts. V10: §2.12, §2.13's `says` and `rows`, §3.9, §3.9b (8),
§3.23 rows 14 and 34, T-V10-50 — in the texts. Rendering: T-ER-27 (VV910-r4-02's clause). V07 §4.5's view-bound rows read
`opts.view` already (R4-05).

### R5-09 The working layer: one value type, and a target the document no longer holds

**Governs:** VAL-R4-01 (model), VEL4-r4-02 (V09). R4-02 stands.

**Owner rule checked.** Item 120 (a): Find "is per-viewer view state" and never changes the model, the document, its hash
or the edit log; item 120 (f)'s **Go there**.

**Decision.** `workingLayer`'s value is V09 §2.4's `WorkingLayer` — ground, a sky island's `PlatKey`, or the underground,
its band the view key `depthBand` alone (VAL-R4-01, the canon's V09-XCONF-1 text). A working layer naming what the
document no longer holds reads as Ground — a view key, nothing written, no event — at the `doc.changed` that removes it
and at a load; a redo restoring the island leaves it Ground (VEL4-r4-02). Each issue's text as written.

**Sweep.** V04 §5.1 (2)'s **Go there** (sets `workingLayer` to Below and `depthBand` to the band — agrees), V05 §5.6 (3)
(agrees), V09 §1b (l. 315), §2.12 (l. 974), §4.2, BCR-V9-3 (agree once VEL4-r4-02's §2.12 row is written), V10's
`useTool` on a mode's layer and §3.23 row 26 (view keys only — agree), rendering §8.4 and §11.3's kept keys (agree).

### R5-10 The fixtures and lists that must run a ruled case

**Governs:** VV1112-r4-01 (V08, regraded minor), VV78-r4-08 (V08, MERGED), VAP-r4-05 (V12; V08's end), VAP-r4-02 (V03),
VAP-r4-03, VAP-r4-04 (V12), VV56-r4-02 (V06, amended), VV1112-r4-02 (V12), VKr4-02 (scope). The orchestrator's blind
spot (c).

**Decision.** A test that names a case runs it on a fixture that holds it, and the fixture list names that case: the
three-crisis week at the METROPOLIS cap on a copy of `metropolis-3` mutated test-side to 120 000 people (VV1112-r4-01's
text); the two fires `crisis.scale`'s second count names (VAP-r4-05); T-V3-40's rebuild and `none`-row condition
(VAP-r4-02); T114-3's landfall clause and T124-9's three fixtures at V12 (VAP-r4-03, VAP-r4-04); H-AQUA's viaduct on a
raised gate and its elevated road (VV56-r4-02, amended in Part H: a raised gate exists only where a raised way is created
across a standing curtain, so the viaduct is founded by V06 §3.19 at the CITY epoch, never declared); B-CITY's seeds
registered on the pin their clause names (VV1112-r4-02); the frame growth that keeps the arena (VKr4-02).

**Sweep.** V08 §7.1's fixture sentences and §13.2's frozen manifest (VV1112-r4-01's mutation, as T-V8-36's and the force
fixtures'); V12 §3.15.12's crisis fixtures and X-V12-5 (VAP-r4-05); V12 §3.15.4 and §3.15.14 (VAP-r4-03, -04); V06 §7's
H-AQUA (VV56-r4-02); T-V6-24's three catch-up fixtures and its over-budget one (VV56-r4-03, VV78-r4-05).

## Part H — per-unit dispositions (all 91 issues)

### scope (base §0–§1, §13–§17, the index, INDEX.md)

Rulings: R5-01, R5-02, R5-03, R5-07, R5-10.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAF-R4T-04 | minor | minor | HANDOFF-OPEN | FIX |  |
| VAH-r4-03 | minor | minor | DISAGREE | FIX per R5-07 |  |
| VAH-r4-04 | minor | minor | DISAGREE | FIX per R5-07 |  |
| VAP-r4-01 | major | major | HANDOFF-OPEN | FIX | the crossing station's release and its regrowth through `repairWall`'s bend stand under R5-02 ((3)); T114-3's regrowth clause as written; its V06 end is an END line under V06 |
| VDC3-03 | major | major | CONFLICT | FIX per R5-07 | both §14 sites (l. 19600, l. 19722) |
| VKr4-02 | major | major | EDGE-UNTESTED | FIX | one fix with VKr4-01 (kernel); its fixture runs (a) and (c) without (b) |
| VM-R4T-02 | major | major | EDGE-UNTESTED | FIX per R5-02, amended | T110-2 takes R5-02's (S1) text whole: its (6) is this issue's locked Re-derive, its outcome R5-02's — stage 2's ring and moat meeting the locked viaduct as later work (the ring running on beneath the deck, no station taken), not "through one station on the deck" |
| VRC4T-05 | minor | minor | WIRING | FIX | the three lists add Box after LodBand |
| VRC4T-06 | minor | minor | TERM | MERGED into VCS-r4-01 | the same site, T121-3 |
| VCS-r4-01 | minor | minor | TERM | FIX | closes VRC4T-06 |

**END lines under this heading** (other units' fixes this seat writes):

* END of VEW-r4-01, VEW-r4-03, VM-R4T-01 (with VPC-R4-01), VDC4-03 and VDC4-04: their fixtures are inside T110-2's text in R5-02's (S1), written once with VM-R4T-02's FIX — (3)'s quay and way-corridor fixtures, (4)'s one-span viaduct, contraction beside an older station and hand delete, (5)'s wide road. *(R5-02)*
* END of VV34-r4-01 (model): T110-2's frame-growth clause ("the same aqueduct through an epoch's frame growth — …") adds "every station of the old deck at its key, position and ring after the growth". *(R5-02 (7))*
* END of VAT4-r4-01 (pipeline; VPC-R4-02 merged): T76-1's late-calamity fixture adds "and one carried by a second absorb in the last epoch's own week — no epoch, its targets applied, the calamity riding the next absorb's first epoch at that epoch's first week, its deaths in that epoch's burial need; and a late non-calamity change in an absorb whose week is after the last epoch's — folded at the last epoch's week + 1, the document's current week never before it". *(R5-03)*

### model (base §2)

Rulings: R5-01, R5-02, R5-09.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAL-R4-01 | major | major | MATRIX-GAP | FIX per R5-09 | §2.9's entry as written (the canon's V09-XCONF-1 text) |
| VAL-R4-04 | major | major | DISAGREE | MERGED into VV34-r4-01 | the same site and text; its scope and V04 ends are VV34-r4-01's |
| VEW-r4-01 | major | major | EDGE-UNDEFINED | FIX per R5-02, amended | the case is removed, not patched: support step (6) is replaced by R5-02's (6) text, written under this id; a later trace takes no station, so neither a one-span raised way nor a taken station needs a rule. Its determinism, V06 and V09 ends are R5-02's D1, V06 and V09 lines; its fixtures are in T110-2 (4) |
| VEW-r4-02 | major | major | CONFLICT | FIX per R5-02 | (3)'s palisade parenthesis and (6) (d)'s `vault`-span clause as R5-02 words them (written under this id); its pipeline end is R5-02's P12; its V07 ends are folded into VAL-R4-03's text |
| VEW-r4-03 | major | major | EDGE-UNDEFINED | FIX per R5-02, amended | no last support run remains: (3)'s obstacles read the strip S7 cuts and the quay S7 lays along a `quay` bank (R5-02's (3) texts, written under this id); its pipeline ends are P3 and P8; its fixture is in T110-2 (3) |
| VM-R4T-01 | major | major | EDGE-UNDEFINED | FIX per R5-02, amended | the verifier's own alternative rung: S5b's and S5c's ways keep off the supports from the raised way's commit (R5-02 (6) (a)); no way's crossing is moved after the fact; its pipeline end is P1, its scope end in T110-2 (3); closes VPC-R4-01 |
| VM-R4T-05 | minor | minor | NEW-PROBLEM | FIX per R5-02 | R5-02's (6) reads "nothing laid later … drops it" |
| VPC-R4-01 | major | major | EDGE-UNDEFINED | MERGED into VM-R4T-01 | the same defect at §2.7 (6) (a); its pipeline and scope ends are VM-R4T-01's (P1; T110-2 (3)) |
| VV34-r4-01 | major | major | EDGE-UNDEFINED | FIX per R5-02 | its text is R5-02's (7) — the old spans kept "as they stand (`use`, `reason`, `state`, `held`)", and "with none, from its other foot" — with the `RaisedFoot` comment; its scope and V04 ends are END lines there; closes VAL-R4-04 |

**END lines under this heading:**

* END of VDC4-04 and VDC4-05 (determinism, pipeline) and VAL-R4-03 (V07): §2.7's support step (3), after "… and a hand op's dry run bends its stretch round it (item 101 R2)", R5-02's held-stretch clause ("; nor does a removal of the wall around it take it — … the enceinte's record kept while it stands"). *(R5-02)*
* END of VM-R4T-02 (scope): §2.7's (6) carries the regeneration sentence ("at a regeneration a locked, pinned or declared raised way stands before every stage the regeneration runs (§7.2)") — written with VEW-r4-01's (6). *(R5-02)*

### kernel (base §3)

Rulings: R5-01.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VKr4-01 | major | major | EDGE-UNDEFINED | FIX, amended | in (1), "at a change of frame law only (a town handed down to the village product, item 322, regrowing across a village band, its territory frame plus `territory.marginShare` within the arena it kept)" reads "after a change of frame law only (a town handed down to the village product, item 322, its territory frame growing within the arena it kept — at a village band's re-crossing or at a later growth inside that arena)": the frame may grow more than once inside an arena a wider law left; the rest, and (2), as written. Item 116's zoom-out limit reads `Plat.frame`, so the update is owed |

**END lines under this heading:** none.

### pipeline (base §4, §10, PART II, PART III)

Rulings: R5-01, R5-02, R5-03.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAL-R4-06 | minor | minor | DISAGREE | FIX |  |
| VAL-R4-08 | minor | minor | DISAGREE | MERGED into VRC4T-09 | the same site, §10.2 (d) |
| VAL-R4-10 | minor | minor | NARRATION | FIX |  |
| VAT4-r4-01 | major | major | EDGE-UNDEFINED | FIX per R5-03 | §4.11 *The clock* (4) is R5-03's text; the held list is §7.7's `DossierBinding.lateCalamities` (the base owns the record — an END under determinism), not V08 §2.3; its V08 and scope ends are END lines there; closes VPC-R4-02 |
| VDC4-05 | major | major | CONFLICT | FIX per R5-02 | its text as written, citing "§2.7's support step (3); V06 §3.7.6 (5)" (R5-02's P11) |
| VEW-r4-04 | minor | minor | WIRING | FIX per R5-02, amended | R5-02's P4 in place of its text: an arterial crossing on a raised deck pins no gate there, and a pin inside an under-deck strip moves along its arterial clear of it — with P6 (S5b's count on ground part 0) |
| VM-R4T-03 | minor | minor | WIRING | FIX per R5-02, amended | §4.8's lead takes R5-02's P8 (the strips beside a trace laid after a raised way stop at its under-deck strip, closed along it, reported); the sentence its required change adds after the outer strip's definition is not added |
| VM-R4T-06 | minor | minor | NEW-PROBLEM | FIX per R5-02, amended | §4.3's paragraph takes R5-02's P1 ("once the span rule has run (its one eager run, after §4.6's cut)"); no run at an S5a commit remains to except |
| VPC-R4-02 | major | major | CONFLICT | MERGED into VAT4-r4-01 | the same sentence of §4.11 (4); its scope end (T76-1) is VAT4-r4-01's |
| VRC4T-09 | minor | minor | TERM | FIX | both sites (l. 15650, l. 15277); closes VAL-R4-08 |
| VV12-r4-03 | minor | minor | CONFLICT | FIX per R5-02 | §4.3's paragraph is R5-02's P1, which carries this issue's sentence and adds V07's trackers and S7's ways |

**END lines under this heading** (R5-02's pipeline texts, each verbatim from R5-02):

* END of VAL-R4-02 (V07) and VM-R4T-01 (model; VPC-R4-01 merged): §4.3 *Lattice and costs* — R5-02's P1 (one text with VM-R4T-06 and VV12-r4-03). *(R5-02)*
* END of R5-02 (the adjudicator's sweep): §4.3 *The slot* — P2; §4.1's S7 row — P3; §4.4 S5a *Outer moats* — P5; §4.4 S5b's count — P6; §4.5 *The daylight term*'s casters — P7; §4.8 *Gates* — P9; §4.11's carve — P10. *(R5-02)*
* END of VEW-r4-03 (model): §4.8's lead — P8 (one text with VM-R4T-03) and §4.1's S7 row — P3. *(R5-02)*
* END of VEW-r4-02 (model) and VAL-R4-03 (V07): §4.13's raised-way `wall` cell and its `river, coast, moat` cell — P12. *(R5-02)*

### determinism (base §5–§7)

Rulings: R5-01, R5-02, R5-03, R5-04.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VDC4-01 | major | major | CONFLICT | FIX per R5-04 | both sentences of §6.3 *Plan damage* as written |
| VDC4-03 | major | major | EDGE-UNDEFINED | FIX per R5-02, amended | `bend.raised.underSpan`'s row is R5-02's D1 text — one row, two keys (`bend.raised.underSpan`, `bend.raised.around`), a way with no admitting span routed round the raised way, else the nearest routable pair; a carve's channel first moved, else stopped; its second end (the wide road) is in T110-2 (5) and T-V9-52 |
| VDC4-04 | major | major | EDGE-UNDEFINED | FIX per R5-02 | `bend.wall.held`'s two cells as R5-02's D1 words them; §2.7 (3)'s clause is an END under model; its test is in T110-2 (4) and T-V9-52 |
| VM-R4T-04 | minor | minor | WIRING | FIX | in VPC-R4-03's words: "S5a's and S7's `W_RAISED_CROSSING` (§2.7's support step (6); §4.4 *Outer moats*; §4.8)"; closes VPC-R4-03 |
| VPC-R4-03 | minor | minor | WIRING | MERGED into VM-R4T-04 | the same comment, §5.4 l. 9253 |
| VRC4T-07 | minor | minor | TERM | FIX |  |

**END lines under this heading:**

* END of VEW-r4-01 (model): §7.1's `bend.wall.raisedCrossing` row — R5-02's D1 text. *(R5-02)*
* END of R5-02 (the adjudicator's sweep): §7.3's S7 row — D2; §7.4's raised-way row — D3; §5.3's gate row — D4. *(R5-02)*
* END of VDC4-06 (V09): §7.1's catch-all "a wall's ridge, reach, waterfront, open ground and aqueduct arch" → "a wall's ridge, reach, waterfront and open ground, the arch a wall takes for an aqueduct drawn across it". *(R5-02)*
* END of VAT4-r4-01 (pipeline): §7.7's `DossierBinding` adds `lateCalamities: string[] /* the binding keys of late calamities held for the first epoch a later absorb folds (§4.11 The clock (4)); set by folding each dossierFacts event's list, as quarantined is; [] in an older document */`; §7.1's `dossierFacts` event adds `lateCalamities: string[] /* the whole held list after this absorb (§4.11 The clock (4); V08 §3.6 (4)) */`; the binding's lifecycle (§7.4, as for `quarantined`): written by the fold, no undo target. *(R5-03)*

### rendering (base §8, §9, §11, §12)

Rulings: R5-01, R5-02, R5-04, R5-05, R5-08.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAF-R4T-03 | minor | minor | DISAGREE | FIX per R5-04 | §8.6's lead as written; its V02 end is an END line under V02 |
| VAT-r4-01 | major | major | MATRIX-GAP | FIX per R5-08 | (1) as written; ends (2)–(4) under V10, (5) under V03, (6) under V09 |
| VAT-r4-02 | major | major | DISAGREE | FIX | (1), (2) and (4) as written; (3) is an END line under V09 |
| VDC4-02 | major | major | EDGE-UNDEFINED | FIX | the fades checked against V11 §3.25.11's rows: every kind's `lengthS` lower end, and every climate override's, at least twice its new fade |
| VRC4T-01 | major | major | CONFLICT | FIX | R4-10's phrase whole at §8.8's DPR sentence; T-ER-26's input as written |
| VRC4T-02 | minor | minor | WIRING | FIX | its V09 end is an END line under V09 |
| VRC4T-03 | minor | minor | EDGE-UNDEFINED | FIX |  |
| VRC4T-04 | minor | minor | EDGE-UNTESTED | FIX per R5-05 | the re-evaluation budget is the chip glow's ≈ 100 ms (item 119 (d)'s budgets unchanged) |
| VV910-r4-02 | major | major | WIRING | FIX per R5-08, amended | "— a preview's marks none, the preview drawn alone —" reads "— a preview, drawn alone, carries no condition, so its **Show** frames every crisis mark —"; the rest and T-ER-27's clause as written |

**END lines under this heading:**

* END of VV12-r4-01 (V09): §11.2 *At a drawn week*'s reader list "(`live.find`, V09's panel, V10's `read_map find`, V01's `gapUnits`, V04's and V05's Find places)" → "(`live.find`, V09's panel, V10's `read_map find`, V01's `findAreas` and `gapUnits`, V04's and V05's Find places, V07 §5.5's village reading)". *(R5-05)*
* END of VV910-r4-03 (V09): §11.2's `looks` member adds `field?: Id /* g item 122 (f): with it, each famine look says whether it draws that field bare (§10.2 (d)'s fields, (f)) */`, and `LooksAnswer.crises[].over`'s comment adds "; with the query's field, whether this famine look draws that field bare at the view's week (§10.2 (d)'s `fields`), evaluated in the generation worker". *(R5-08)*
* END of R5-02 (the adjudicator's sweep): §8.4's shadow casters "curtain walls (prism of the band)" → "curtain walls (prism of the band; a run beneath a raised way's span topped at its soffit, §2.7's support step (6) (d))"; §8.4's heightfield writers "flat roofs, walls, towers and gatehouses as the tops of their prisms" adds "(a wall run beneath a raised way's span topped at its soffit)"; §11.1's 3-D row: a wall run beneath a raised way's span exported topped at its soffit (§2.7's support step (6) (d)), in its words. *(R5-02)*
* END of R5-04 (the adjudicator's sweep, the tests' blind spot): T-ER-28's input "an element a restoring re-cut or an `extend` adds after its building's damage left" → "an element a restoring re-cut mints while its `repair` Works still runs, and one a re-cut or an `extend` adds after its building's damage left", its outcome "drawn as built, never as a repair" → "drawn as built in every week, never damaged by that restoration nor as a repair". *(R5-04)*

### V01

Rulings: R5-01, R5-05.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VV12-r4-02 | major | major | EDGE-UNTESTED | FIX per R5-05 | both texts as written (T-V1-59 (f), §3.18 (e)'s Find row) |
| VV12-r4-04 | minor | minor | COHESION | FIX per R5-05 |  |

**END lines under this heading:**

* END of R5-05 (the adjudicator's sweep, the tests' blind spot): T-V1-60's timing cell "From M5; clause (e) from M3b, with `campLand` (V01 §8.1); the VILLAGE fixture's clauses once V07's village readings land (V-M3, V07 §8)" adds "; (c)'s scrubbed-week clause at the later of M5 and V06's E6 (V06 §3.15.2's frames)". *(R5-05)*

### V02

Rulings: R5-01, R5-04. V02 owns no issue this round and runs for its END line (R5-01 (4)).

**END lines under this heading:**

* END of VAF-R4T-03 (rendering): §5.7 (2): "damaged, by §6.3 *Plan damage*'s one comparison (the level above 0 and at least its keyed threshold t: §6.3's `plan.damage`, V11's ranges)" adds "from the element's entry week into the plan (V03 §5.6 (2) (a))", and "so an element added after its building's damage left (a wing an `extend` adds, an element a re-cut makes) is drawn as built" → "so an element added after its building's damage left (a wing an `extend` adds, an element a re-cut makes), or one a restoring event's re-cut mints (V06 §3.23 (3)), is drawn as built". *(R5-04)*

### V03

Rulings: R5-01, R5-05, R5-08, R5-10.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAP-r4-02 | minor | minor | MATRIX-GAP | FIX per R5-10 |  |

**END lines under this heading:**

* END of VAT-r4-01 (rendering): §4.6's `plan` damage rows (l. 2377–2378): "read from `PlanDamage` at the own level (V03 §5.6 (2) (d))" adds "at the why's view's drawn week (`opts.view.week`, V10 §2.13; §11.2's view-bound `why`), else the document's current week". *(R5-08)*
* END of R5-05 (the adjudicator's sweep, the tests' blind spot): T-V3-39's timing cell adds "; its scrub across the run at the later of P4 and V06's E6 (V06 §3.15.2's frames)". *(R5-05)*

### V04

Rulings: R5-01, R5-02, R5-05.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAL-R4-07 | minor | minor | DISAGREE | FIX |  |
| VAP-r4-06 | minor | minor | DISAGREE | FIX per R5-05 |  |

**END lines under this heading:**

* END of R5-02 (the adjudicator's sweep): the V04 lines of R5-02's *Ends* — §1b's `ArchVaults.reconcile` row (l. 328), the edit row (l. 372), the arch-vault entity row (l. 867), §3.5.0 *At an epoch* (l. 1338–1351), §3.10 (l. 2283–2289), §4.3's row (l. 2579), §6 (l. 3009) and T-V4-63 — verbatim from R5-02. A later trace no longer changes a raised way, so it is no trigger; the one trigger (every change to a raised way's `feet`, `supports` or `spans`, whoever makes it) stands. *(R5-02)*
* END of VV34-r4-01 (model): T-V4-65's at-epoch clause adds "and an aqueduct whose deck a frame growth extends over a cavern chamber within reach of its piers: no old pier moved, the collapsed set equal to a regeneration's". *(R5-02 (7))*

### V05

Rulings: R5-01, R5-05.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAL-R4-09 | minor | minor | NARRATION | FIX |  |
| VAP-r4-07 | minor | minor | DISAGREE | FIX per R5-05 |  |

**END lines under this heading:** none (T-V5-14's raised-gate clause stands under R5-02: a crossing station on a raised gate is a raised way created across a standing wall).

### V06

Rulings: R5-01, R5-02, R5-10.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VV56-r4-02 | minor | minor | NEW-PROBLEM | FIX per R5-10, amended | a raised gate exists only where a raised way is created across a standing curtain (R5-02), and a raised road drawn by hand across a wall comes down before it (§7.1), so the viaduct cannot be declared. H-AQUA's definition adds, after "in year 170": "; at its CITY epoch V06 §3.19's founding lays its masonry aqueduct across the standing ring, through a wall opening, and a viaduct where its main approach road crosses a valley outside a gate, across the ring at a raised gate (the recipe's valley deeper than `viaduct.minDropM`, and the viaduct's chance raised to 1 by an `editTable` in the fixture's recipe so the founding lays it); and a timber elevated road declared in the recipe beyond the CITY ring, between two high wards the METROPOLIS epoch's circuit encloses, so that circuit is laid across it (a declared raised way is held, V06 §3.19.2 (1))". T-V6-47's and T-V6-73's H-AQUA clauses name "its viaduct" and "its timber elevated road" as these |
| VV56-r4-03 | minor | minor | CONFLICT | FIX |  |

**END lines under this heading:**

* END of R5-02 (the adjudicator's sweep): the V06 lines of R5-02's *Ends* — §3.6 (4) and §3.19's lead, §3.7.1's widening, §3.7.6 (5)'s bullets, W64, `EpochScope.raised` and §2.1, W68, §2.10's `raisedCrossings`, T-V6-47 (with its bar cell), §7's table row for T110-2's epoch clauses (l. 4099) and J-V6.91 — verbatim from R5-02. *(R5-02)*
* END of VAP-r4-01 (scope): T-V6-73 adds after its crossing-station clause "**the station's regrowth** (T114-3's regrowth clause): on H-AQUA's ring, both spans beside the aqueduct's crossing station toppled and the curtain absorbed, then the aqueduct repaired by hand and, on a second run, by V06 §3.19.2 (5) with its reason live — the stretch re-laid by `repairWall`'s bend in the batch before its spans, never a deck over a gap, the hand repair's undo restoring the gap and the spans", and V06 §7's table row for T114-1 – T114-5 adds "the station's regrowth on H-AQUA". *(R5-02 (3))*

### V07

Rulings: R5-01, R5-02, R5-05, R5-06.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAF-R4T-01 | major | major | DISAGREE | FIX per R5-06 |  |
| VAF-R4T-02 | major | major | DISAGREE | FIX per R5-05, amended | its timing clause for T-V7-68 ("its scrubbed-week clause at the first exit after M6-E's history frames (V06 §8, E6)") reads "its scrubbed-week clause at the latest of V-M3, M5 and V06's E6 (V06 §3.15.2's frames)" — T-V7-68's cell is "the later of V-M3 and M5" |
| VAL-R4-02 | major | major | DISAGREE | FIX per R5-02 | (3)'s two bullets and T-V7-48's clause as written; its pipeline end is R5-02's P1 |
| VAL-R4-03 | major | major | DISAGREE | FIX per R5-02, amended | §3.5a (4) is replaced whole by: "**(4) VS3 — the palisade.** The palisade is a wall laid after the raised way (§2.7's support step (6) (d)): a support whose `state` is absent or `ruined`, a ramp, a stair, a foot or a `vault` span's arch vault standing in the planned palisade's band is taken into the stretch — the stretch abutting its faces (town walls were built against aqueduct piers), at an arch vault ending at its two walled-up arch mouths, the chamber kept whole and closing the line between them, never laid through it; it is never moved and never a gate, and a gate VS4 would make inside the raised way's under-deck strip, or within `raised.supportClearM` of such a support, moves along the trace to the nearest clear point, the track following it (§2.7's support step (6) (d)). The trace passes beneath an `open` span as an ordinary stretch; a raised way crossing the circuit makes no gate (its deck passes over). A raised way carried down (V07 §3.12) whose crossing station stands on the enceinte that becomes the palisade keeps that station as standing fabric — its support the band's stretch under the deck, held while the deck stands, with its raised gate whose tower carries the deck or the aqueduct's arch (§2.7's support step (3)) — the one gate at a support the palisade carries. The barrier closure never treats a raised way as a barrier." §3.17's row 'a raised way over the palisade' → "the stretch abuts the standing supports, ramps, stairs and `vault` spans' arch vaults (a `cleared` support none), no gate under the deck; a carried-down crossing station on the palisade kept with its raised gate or arch (V07 §3.5a (4))", its test cell T-V7-48. T-V7-48's "the palisade abuts each standing support in its band and has 0 gates at supports" → "the palisade abuts each standing support, ramp, stair and `vault` span's arch vault in its band — 0 palisade stretches inside an arch vault's footprint, no gap in the line, on a declared viaduct with a `vault` span in the planned palisade's band — and has 0 gates at supports but a carried-down crossing station's raised gate, kept with its tower carrying the deck (its CITY fixture's viaduct created across the innermost ring at a raised gate)". The model's and pipeline's ends are R5-02's (3) held-stretch clause and P12 |
| VAL-R4-05 | major | major | DISAGREE | FIX per R5-06 |  |
| VV78-r4-01 | major | major | CONFLICT | FIX per R5-06 |  |
| VV78-r4-02 | minor | minor | TERM | FIX per R5-06 |  |

**END lines under this heading:**

* END of VEW-r4-02 (model): folded into VAL-R4-03's text above (the arch vault abutted at its arch mouths; T-V7-48's `vault`-span fixture) — written once, with VAL-R4-03. *(R5-02)*

### V08

Rulings: R5-01, R5-03, R5-07, R5-10.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VEL4-r4-01 | major | major | EDGE-UNDEFINED | FIX per R5-07 | its three texts as written |
| VRC4T-08 | minor | minor | TERM | FIX | the three sites (l. 489, 2450, 2521) |
| VV78-r4-03 | major | major | NEW-PROBLEM | FIX per R5-07 | its three texts as written |
| VV78-r4-04 | major | major | EDGE-UNDEFINED | FIX per R5-03, amended | "folds after the last epoch at `W₀` + 1" reads "folds after the last epoch at `W₀` + 1 where `W₁` is after `W₀`, else at `W₀`" (R5-03's §3.6 (6) sentence); its (3) parenthesis, §4.6 row, §3.17 row and T-V8-49 (g) clause as written, joined by R5-03's V08 texts |
| VV78-r4-05 | minor | minor | NEW-PROBLEM | FIX |  |
| VV78-r4-06 | minor | minor | WIRING | FIX | the row takes the next free W id if W101 is taken |
| VV78-r4-07 | minor | minor | CONFLICT | FIX per R5-07 |  |
| VV78-r4-08 | minor | minor | CONFLICT | MERGED into VV1112-r4-01 | the same fixture sentence of V08 §7.1 |
| VV1112-r4-01 | major | **minor** — a fixture list that omits a case its own test text names (V12's test names the METROPOLIS cap; V08's fixture sentence omits the cap's mutation): VV78-r4-08's grade for the same defect (R5-01) | WIRING | FIX per R5-10 | its text; closes VV78-r4-08 |

**END lines under this heading:**

* END of VAT4-r4-01 (pipeline; VPC-R4-02 merged): R5-03's V08 texts — §3.6 (3)'s late-calamity sentence, crossing clause and calamities' parenthesis; §3.6 (4)'s `lateCalamities` in the ledger event; §3.17's degenerate-input row; §2.6's `lateCalamities` lifecycle row; T-V8-49 (g)'s second-absorb fixture — verbatim from R5-03. *(R5-03)*
* END of VAP-r4-05 (V12): V08 §7.1's crisis fixtures, after "the calamities' `targets` resolved (V08 §3.16 (7))", add "; on `city-1` a second fire naming more target districts than its severity's share of the place's units, and a fire at severity 1 on a fixture holding a district the adjacency from its seed does not reach (a fire never jumps a gap, V01 §3.16 (4)), this section naming the fixture and what parts its districts (X-V12-5)". *(R5-10)*

### V09

Rulings: R5-01, R5-02, R5-04, R5-05, R5-08, R5-09.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAH-r4-01 | minor | minor | DISAGREE | FIX per R5-04, amended | its three texts, with VAT-r4-04's row-92 edge: row 92's edge "a restored building, re-cut or extended after its repair" adds "or re-cut by its restoring event while its `repair` Works runs"; closes VAT-r4-04 |
| VAP-r4-08 | minor | minor | DISAGREE | FIX per R5-05 |  |
| VAT-r4-04 | minor | minor | DISAGREE | MERGED into VAH-r4-01 | the same sites, §4.21.13 (2) and row 92 |
| VDC4-06 | minor | minor | CONFLICT | FIX per R5-02, amended | its first sentence and §4.9's `bend.wall.aqueductArch` source cell as written; its second sentence reads "From the other side, a wall T3 `wall` draws across a standing aqueduct runs on beneath its arches, never a gate — the crossing below (`bend.wall.raisedCrossing`; T110-2)."; its determinism end is an END line there |
| VDC4-07 | minor | minor | CONFLICT | FIX |  |
| VEL4-r4-02 | major | major | EDGE-UNDEFINED | FIX per R5-09 | its four texts as written |
| VV12-r4-01 | major | major | WIRING | FIX per R5-05 | its rendering end is an END line there |
| VV56-r4-01 | minor | minor | CONFLICT | FIX |  |
| VV910-r4-01 | major | major | EDGE-UNDEFINED | FIX per R5-08 | its V10 end is an END line under V10 |
| VV910-r4-03 | major | major | WIRING | FIX per R5-08 | its rendering end is an END line under rendering |

**END lines under this heading:**

* END of R5-02 (the adjudicator's sweep): §4.9's `bend.wall.raisedCrossing` row (words and source cell), the new `bend.raised.around` row, §4.20.2 (4)'s **Later work** sentence and T-V9-52's three clauses — verbatim from R5-02's V09 lines. *(R5-02)*
* END of VAT-r4-02 (rendering): l. 4137's "never in pictures unless "Show pins" is on in the Picture tab" → "never in pictures unless the Picture tab's **pins and public notes** is on (§11.2's `ExportOpts.pins`)"; §5.10's Picture options cell "pins and public notes on · off (off by default)" adds "(`ExportOpts.pins`)".
* END of VRC4T-02 (rendering): §5.15's row (l. 4126) "one LineString per link in view scope" → "one LineString per link within the export's scope (§11.1; §11.2's `ExportOpts.links`)".
* END of VAT-r4-01 (rendering): T-V9-86 adds "at a scrubbed week (V06 §3.15.2) the why card's `plan` section shows that week's own-level lines and head years, as the plan panel does". *(R5-08)*

### V10

Rulings: R5-01, R5-05, R5-08.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAH-r4-02 | minor | minor | DISAGREE | MERGED into VAT-r4-03 | the same sites, §3.9b (7) and T-V10-51 |
| VAP-r4-09 | minor | minor | DISAGREE | FIX per R5-05 |  |
| VAT-r4-03 | minor | minor | DISAGREE | FIX per R5-05 | its three texts; closes VAH-r4-02 |
| VV910-r4-04 | minor | minor | EDGE-UNDEFINED | FIX per R5-08 |  |

**END lines under this heading:**

* END of VAT-r4-01 (rendering): §2.13's `rows(model: ModelView, id: Id, key: Knowledge): WhySection['rows']` → `rows(model: ModelView, id: Id, key: Knowledge, opts: { view?: ViewHandle /* the view the kind's provider is passed (§11.2's view-bound why); a section whose rows read the drawn week — V03 §4.6's plan damage rows — reads view.week, else the document's current week */ }): WhySection['rows']`; §3.9's query paragraph "then appends the rows of every registered `WhySectionProvider` whose `appliesTo` holds" adds "— each passed the same `opts.view` —"; §3.23 row 14's no-view outcome adds "the `plan` section's damage rows at the document's current week". *(R5-08)*
* END of VV910-r4-01 (V09): §2.13's `says` comment reads "V09's line — info.crisis.line, .lineOpen, .lineUnnamed, .lineUnnamedOpen or .preview —"; §3.23 row 34 adds the edge "a condition with neither a name nor an `untilWeek`" with the outcome "worded `info.crisis.lineUnnamedOpen`". *(R5-08)*

### V11

Rulings: R5-01, R5-02.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VV1112-r4-03 | minor | minor | CONFLICT | FIX |  |

**END lines under this heading:**

* END of R5-02 (the adjudicator's sweep): §3.24.2's readers — l. 3907 drops "the support step's re-runs in S5a and after S7's batches (§2.7's support step (6) (a))," and l. 3981 drops "on a raised way a stage's S5a trace or outer moat crosses and once more after S7's batches (S5a, S7; §2.7's support step (6) (a))," — the cells, values and provenance stand. *(R5-02)*

### V12

Rulings: R5-01, R5-10.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAP-r4-03 | minor | minor | DISAGREE | FIX per R5-10 |  |
| VAP-r4-04 | minor | minor | DISAGREE | FIX per R5-10 |  |
| VAP-r4-05 | minor | minor | MATRIX-GAP | FIX per R5-10, amended | V12's two texts as written; V08's end is the END line under V08 (its second fire on "a fixture holding a district the adjacency from its seed does not reach", V08 naming it, in place of "on `town-1` … whose district adjacency from its seed ends before its count") |
| VV1112-r4-02 | minor | minor | CONFLICT | FIX |  |
| VV1112-r4-04 | minor | minor | CHANGED | FIX | principle (3): R4-09 moved the two cells, not their calibration route; the archive's route (`corpus` at M-CAL) kept |

**END lines under this heading:** none.

## Part I — canon changes (appended to canon.md as one dated ruling)

The dated ruling "2026-10-01 (adjudication round 5)" at the end of `docs/validation/coherence/canon.md` records, by
pointer to the rulings above: the seat's sweep over the three blind spots — V07's village restatements, V09's panels and
V10's clerk, the tests, fixtures and milestone cells (R5-01); raised ways and walls by one rule — a raised way held from
the commit that creates it, everything laid after it giving way, a wall stretch laid after it running on beneath its deck
with no station and no gate, a crossing station only where a raised way is created across a standing wall and no removal
of the wall taking it, a frame growth's extension keeping the old deck's stations (R5-02, J122, superseding R4-09 whole);
a late dossier change never moving the clock back and a late calamity never lost, held in `DossierBinding.lateCalamities`
when the absorb's week is not after the last epoch's (R5-03, amending R4-08's last clause); the restoring re-cut's entry
week at every restatement (R5-04); Find at a drawn week — one reader list, a re-evaluation budget and every drawn-week test
clause at the later of its milestone and V06's E6 (R5-05, extending R4-12); V07's count and hand-over (R5-06); item 125 at
an absorb — a field is a row's own path (R5-07, amending R4-15 (a)'s reach); the crisis look's readers in V09 and V10
(R5-08); the working layer's type and a removed target (R5-09); the fixtures that must run a ruled case (R5-10). Nothing is
ruled INVALID this round.
