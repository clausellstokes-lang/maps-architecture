# Adjudication round 3 — binding rulings for repair round 3

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/adjudicate-r3; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/adjudicate-r3`, 2026-10-01)
- P0 brief read whole; inputs located (round3-work 18 files, 214 issues; repair-r2 ×18; verify r2t ×20; adjudication-r2; canon's dated rulings): done
- P1 ruling requests of round 2's repair files collected and ruled: pending
- P2 every issue read whole; multi-reporter and ping-pong groups found: pending
- P3 binding rulings (R3-nn): pending
- P4 Part H, every issue's disposition, severity regrades, END lines per unit: pending
- P5 canon dated ruling appended; result saved; LANDED: pending

## How to read this file

**Who reads what.** Each of the eighteen repair seats of round 3 reads (1) its row of the table of contents, (2) every
ruling that row lists, whole, and (3) its unit's heading in Part H: the disposition of each issue it owns, then its
**END lines** — the exact text this unit writes for a fix another unit owns. A seat's whole work is under its own
heading (R3-01).

**Dispositions** (Part H, one row per issue of `docs/validation/coherence/work/round3-work/<unit>.json`):

| word | meaning |
|---|---|
| **FIX** | apply the issue's `required_change` as written (its `also_reported` versions are context) |
| **FIX per R3-nn** | apply it, but where R3-nn's text differs from the `required_change`, R3-nn governs |
| **FIX, amended** | apply it with the amendment the note states (the note's text governs) |
| **MERGED into X** | the same defect as issue X: X's fix (as ruled) closes it; nothing further at this id |
| **INVALID** | closed for good, with its reason; never raised again |

**Grades** (J141's SEVERITY STANDARD). The `sev` column is the reporter's; the `grade` column is this adjudicator's,
with a one-line reason where it differs. A regrade never changes the disposition: every issue is FIXED, MERGED or
INVALID this round.

**Precedence used** (principle (3)): the owner's words (file g items 102–126, the owner's instructions, DEFINITION) > an
f item or a J-VI decision > the base's canonical home > a volume's restatement. A ruling made under J122 says so and is
vetoable. adjudication-r2.md stays binding except where an entry below supersedes one of its rulings by name.

**No ruling id in design text.** Every text below that a seat writes into the design names a design home, never an
`R3-nn` or `R2-nn` id (R3-02).

<!-- SUMMARY-AND-TOC -->

## Part A — the ruling requests

Round 2's eighteen repair files (`docs/validation/coherence/repair-r2-*.md`) carry **no** `RULING REQUEST` block (each
file's header says so; a search of all eighteen finds none). Nothing to rule here. The questions round 2's seats left
for the adjudicator inside their reports are ruled where they belong: V08's judgment 2 (`HostContext.line` deciding
between two lines) in R3-20; V03's and V11's hand-offs on item 123's `reused` and roofless rule in R3-05 and R3-08;
V06's and V07's hand-offs on the disaster look's end in R3-10; the residual hand-offs nobody raised in R3-27.

## Part B — rulings for the whole round

### R3-01 Part H is each seat's whole work; both ends land this round

**Governs:** every issue of round 3; the class behind round 2's open hand-offs (VAP-r2-01 – VAP-r2-12, VV78-r2-05 – 07,
VV12-r2-06, VV1112-r2-08 – 11, VAH-r2-02, VKr2-04, VPC-R2-05, VPC-R2-18, VEW-04, VM-R2T-06 and others: an end a round-2
repair named for another unit that its receiver, repairing in parallel, never wrote).

**Decision.** (1) Each repair seat applies, at its own unit, every FIX and every END line under its heading in Part H —
an END line is that unit's share of a fix another unit owns, written in the same round as the owning seat's share
(R2-05 (1)–(2) kept). (2) An END line's text is written as given; where it says "in its words", the seat words it at
build depth with the content stated. (3) A seat that meets a further cross-unit end no line names writes its own side
and lists the other in its report's HAND-OFFS for round 4's verifiers (R2-05 (3) kept); it never leaves open wording in
the design. (4) A seat whose unit holds no issue of its own but holds END lines (none this round: every unit owns at
least two issues) would still run. (5) No seat re-raises an issue ruled INVALID or MERGED here.

### R3-02 No review id in design text

**Governs:** VAT-r2-06 and VM-R2T-09 (V09), VV78-r2-11 (V08); every END line below.

**Decision (principle (5); canon change).** Design text names the design home of a rule, never a review-process id: no
`R2-nn` or `R3-nn`, no verifier issue id (`VM-R1T-14`, `VAP-r2-03` …). Decision records (J-…, J-V…, BCR-…), request and
hand-off rows (X-…, CVR-…, a volume's §10 and §13 records) keep theirs as records. Only V08 (8 lines) and V09 (56 lines)
hold such ids today (a search of the base, the rationale's design text and the twelve volumes). Where a required change
in Part H quotes a ruling id inside design text, the seat writes the home this table gives in its place:

| id | the design home written instead |
|---|---|
| R2-05 – R2-09, R2-35 | §13.2's bar ids and take-over table; V12 §2.13 |
| R2-11 | §7.7's row number (DR41 – DR44) |
| R2-18, R2-19 | §7.7's precedence; §7.4 *Replay semantics* |
| R2-21 | §7.1's outcome table (E-07) |
| R2-22 | §7.4's regenerate row and §10.3 |
| R2-23 | §2.7's `HistoryHint` |
| R2-30 | §8.8's zoom-out limit (stop 0) |
| R2-31 | V06 §6.8 and §12.1 |
| R2-32, R2-36 | §16's milestone rows |
| R2-33 | §2.9's `find` and §11.3 |
| R2-34 | V11 §2.3's `CoverageSpec` |
| R2-37 | §2.9's `crises`, §7.7's DR44 and §10.2 *Crisis looks* |
| R2-38 | §6.3 *Plan damage* and V06 §3.23 |
| R2-39 | §8.2's snow rule (item 124 (c)) |
| R2-40 | §7.7's DR42 (the week); item 125 (a) (the host's fields) |
| R2-41 | item 126 (a2) |
| R2-42 | §11.2 |
| any R3-nn | the home the ruling names |

### R3-03 Grading under J141, and the bookkeeping class

**Governs:** the `grade` column of Part H.

**Decision.** Every issue is graded by J141's standard: BLOCKER — cannot be built as written on a common path (a wrong,
impossible or crashing result; an owner rule contradicted where a builder would implement it; principle (11)'s silent
wrong result); MAJOR — two builders would build different behaviour (two units stating different outcomes for one case,
an input with no producer or an output with no reader the build needs, an edge on a normal path with no defined
outcome, a bar that cannot pass or passes a wrong result); MINOR — nothing built or tested changes. Two grades recur:
(a) **bookkeeping** — a take-over table, a test's head or a pin list missing an id that the test's own clause already
names and runs, a stale price in a decision row — is MINOR whatever its reporter graded (VAP-r2-01 – VAP-r2-06,
VAP-r2-09, VAP-r2-10, VAP-r2-13); a list whose gap makes a bar unable to pass (VAP-r2-08 (c), VAP-r2-11, VAP-r2-14) stays
MAJOR; (b) **two units stating two outcomes** for one case is MAJOR however rare the case (the damage comparison's t = 0
at level 0, R3-04; a ramp at a ring-end foot, R3-25), and reporters' MINOR grades of such cases are raised.

## Part C — item 123: the damage layer, its level and its restoration

### R3-04 One comparison: the level above 0 and at least t

**Governs:** VM-R2T-02 (its comparison clause), VDC2-07, VRC2T-14 (model §2.6 step 7); VRC2T-13, VDC2-08 (rendering
§8.6); VV34-r2-04 (V04's T-V4-82 (b)); VAT-r2-02, VAH-r2-04 (V09 §4.21.13 (1)); VAT-r2-03, VAH-r2-05 (V10 §3.9a); and
two unraised restatements of the same slip, V04 §5.6's lead (l. 2868) and V06 §3.23's lead (l. 3348). Five units, one
fact, four wordings: recurring since round 2 wrote R2-38 (4) as "level ≥ t".

**Decision (supersedes R2-38 (4)'s wording; canon change).** §6.3 *Plan damage* is the one home and already reads it:
an element shows damaged **while the building's decay level is above 0 and at least its threshold t** — a level of 0
damages nothing, so a never-decayed building draws its plan unchanged (`item123.damage`) whatever its kinds' ranges
(V11's ranges admit `lo` = 0). Every other unit writes either "§6.3 *Plan damage*'s comparison" or that sentence
verbatim, never "level ≥ t", "reaches" or "at or above its threshold" alone. V03 §5.6 (2) (a) and V11 §3.25.10 already
agree. Grade: MAJOR for the class (two outcomes for one case, an element with t = 0 at level 0; R3-03 (b)).

### R3-05 The roofless wing: the one case with no threshold

**Governs:** VAF-R2T-01 (model), VAF-R2T-02 (rendering), VAF-R2T-03 (V03); V02's X34 (END).

**Decision.** Item 123 (d) (inside and outside agree) and §2.8's derelict state (`decayed` is roofless, `RoofSpec.kind
'none'`) together require it: while a building is `decayed` or `ruined` — however V06 §3.23 reads its level, its
existence state alone before V06's level lands included — every roof bay over a room of a wing whose `RoofSpec.kind` is
`none` (the decline's roofless state, a fire's charred shell) is damaged whatever its t, so the plan's open ceilings
are the roof the exterior lacks; once the building is `decayed` each such bay counts as reached for the repaired-element
rule (V03 §5.6 (2) (b)); a standing wing an author roofed `none` keeps its plan unchanged. **Home: §2.6 step 7**, written
by the model seat in VAF-R2T-01's words (the scope "decayed or ruined" there governs over "in a decay run"); §8.6 draws it
(VAF-R2T-02's text); V03 §5.6 (2) (c) states its drawing and cites §2.6 step 7 (VAF-R2T-03's text, the parenthesis read
as "however V06 §3.23 reads its level"); V02 §5.7 (2) and X34 cite §2.6 step 7 for it. Nesting holds: the bays are
damaged from the week the state is `decayed` and stay so while the state only climbs. It is a case, not a second
comparison: R3-04's comparison governs every other element.

### R3-06 The decay run: where it starts, the default age that ages, and the replay's ruins

**Governs:** VV56-r2-05 (V06 §3.23 (1): the run starts at the week its change shows), VAT2-r2-05 (the replay's ruins have
runs), VAT2-r2-06 (a generated ruin ages), VM-R2T-02 (model §2.6 step 7 cites V06 §3.23); their ends at V11 §3.25.10's
`settings` row, V09 §4.21.13 (1)'s `{, years}` clause and V10 §3.9a's head row (END lines). Supersedes R2-38 (3)'s "a
building with no abandonment epoch (generated ruined; first met in item 113's replay) reads its state at V11's default
age".

**Decision.** **V06 §3.23 is the one home of the level** (R2-38 (3) kept). (a) A run starts at the week its change shows:
the start week of the Works the event started (a hazard's change at the hazard's week, V06 §3.13 (2); a `vacate`'s
`decay` Works at its drawn offset), else the event's effective week (V06 §2.11) — VV56-r2-05's text. (b) A building item
113's replay abandons or ruins has its run in the creation prefix from that replay epoch's week, so scrubbing the
replayed past shows one plan aging (item 123 (a)) — VAT2-r2-05's text. (c) A building generated `abandoned`, `decayed`
or `ruined` (its log holding no event that took it there from a standing state) reads as a run begun V11's default age
`D` years before the week it is first met so — `A` = the creation week (R3-18) − 52 × `D` — and ages from then as any run
(item 123 (b): "damage only accumulates as decay goes on") — VAT2-r2-06's text. (d) Before V06's E2 lands (M6-E) every
reader reads the existence state alone at V11's default age (unchanged). (e) Its plan is unaffected: a building first met
so keeps the as-built plan (V03 §3.11 (c)); the replay derives no plan.

**§2.6 step 7's level sentence, binding text (model; it carries R3-04, R3-07 and R3-08 too).** Replace from "the
building's **decay level**" to "reads its existence state at V11's default age." with: "the building's **decay level** —
V06 §3.23's `decayLevel(doc, lineage, week)` in [0, 1], derived and never stored, from its decay run (from the week the
change that took it from a standing state into `abandoned`, `decayed` or `ruined` — a `vacate`, a `burn`, a `ruin` — shows;
its lifecycle events, §2.8), its state and V11's rate by material (timber faster than stone), read at the drawn week
(§2.9's `week`) — shows damaged every element whose t it has reached while above 0 (§6.3 *Plan damage*'s one comparison:
a level of 0 damages nothing). The level never falls while the building stays abandoned, decayed or ruined, so damage
only accumulates and never moves (a higher level's damaged set contains a lower's); a restoration (item 123 (b)'s
"reused": a `reoccupy` back into use; a repair) lowers it, and the damage leaves in reverse threshold order, a repaired
element drawn in item 114's patch material — an element that entered the plan after its damage left never drawn
repaired (V06 §3.23 (3)). A building generated abandoned, decayed or ruined reads V06 §3.23 (4)'s run, V11's default age
at the week it is first met so and aging from then; one item 113's replay abandons or ruins ages from that replay
epoch's week; every building before V06's level lands (M6-E) reads its existence state alone at V11's default age." Then
add R3-05's roofless sentence after the comparison.

### R3-07 The plan in force under decay is the one last lived in

**Governs:** VM-R2T-01 (model §2.6 step 7 and §2.8's elaboration record). Supersedes R2-38 (1)'s gloss "stored, else
re-derived from its canonical prior at the building's built band and era".

**Decision.** The owner's words decide (item 123: "the same generated floorplans have to be amended rather than redrawn
as new"): the plan that stands under the damage is the plan in force when the decay run began — the stored plan, else
the one re-derived from its canonical prior at the occupant inputs of the week before the run began, the plan the
building was last lived in (its as-built plan when never re-let, or first met so). **V03 §3.11 *Decay re-cuts no plan* is
the home** (J-V3.137); §2.6 step 7 cites it and §2.8's elaboration record states that a building in a decay run reads its
occupant inputs at the week before its run, so neither the leaving nor a later move of the field stales its plan, and
that a `decay` or `repair` Works is no build stage — VM-R2T-01's text (1) and (2), whole.

### R3-08 Restoration: item 123 (b)'s "reused", the per-element peak, and the head word

**Governs:** VV56-r2-01 (V06; its ends at model §2.6 step 7 and scope's T123-4), VV56-r2-06 (V06, BLOCKER; its ends at V03
§5.6 (2) (b), V02 §5.7 (2) and rendering §8.6), VRC2T-15 (rendering), VV1112-r2-15 (V06); and the head word V03 §4.6,
V09 §4.9 and §4.21.13 (1) and V10 §3.9a use for a restored building (V03's round-2 hand-off). Supersedes R2-38 (3)'s
"lowered by restoration (`reused`, `reoccupy`, a repair)".

**Decision (J122, vetoable; canon change).** (a) **The word.** "reused" in item 123 (b) is the program's filing text,
approved by the owner's "both and the above are yes" — not the owner's quotation. Read under J122 so the owner's rule
holds whole (a ruined building's plan is amended, never redrawn; restoration takes the damage away in reverse order, a
repaired element in patch material): item 123 (b)'s "reused" is **the building put back to use — a `reoccupy` from vacant
or derelict (V06 §3.8.2)** — beside a repair. §2.8's `reused` state (the cleared trace worked as a garden, orchard or
field, `Building.reusedAs`) keeps its one meaning (principle (2)): like `cleared` and a demolition it holds no plan, its
level and peak 0 from the event's effective week. VV56-r2-01's texts at V06 §3.23 (3), model §2.6 step 7 (inside R3-06's
binding text) and scope's T123-4, with a J-V6 row recording this reading. (b) **The peak is per element** (VV56-r2-06,
BLOCKER kept: every restoration that re-cuts or extends would draw new elements as patched repairs they never had, a
silent wrong result): `decayPeak(doc, lineage, week, since)` reads the highest level since the element entered the plan —
the as-built plan's elements at the lineage's build; the elements a re-cut makes (V03 §3.11, a restoring event's
included) or a wing an `extend` adds at that change's effective week — so an element added after its building's damage
left is drawn as built, and an element a re-cut keeps keeps its peak. V03 §5.6 (2) (b) passes each element's entry week
and reads it (END); V02 §5.7 (2)'s patched rings read the same peak through V03's thresholds (END); §8.6's restoration
sentence is VRC2T-15's text with "at or below V06's per-element `decayPeak` (since its entry into the plan, V06 §3.23
(3))". (c) **The head word.** A standing building restored with patches is headed `info.damage.head.restored` ("In use
again{, years}"), never `head.reused`: V09 §4.9's row, V09 §4.21.13 (1), V03 §4.6 and V10 §3.9a's head row (END lines).
(d) V06 §3.23 (2)'s range sentence reads VV1112-r2-15's text (a kind's range inside the shares of the states whose looks
item 123 (c) gives it).
