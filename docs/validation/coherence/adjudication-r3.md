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

## Part D — item 122: crisis looks

### R3-09 The disaster look's source, and which calamity it takes

**Governs:** VPC-R2-03 and VV78-r2-09 (V08: no dossier source reaches the `disaster` look), VV12-r2-01 (V01 against V08:
which calamity), VV12-r2-04 (V02: the pattern's reader), VV1112-r2-11 (V08's fixtures); ends at V11 §3.25.9, §10.2 (b),
DR44, T-V6-75, T-ER-27, V12's crisis fixtures and V01 §2.3's comment.

**Decision (J122, vetoable; canon change).**
(a) **The source.** Item 122 (a), as the owner approved it, draws every look "from the `ConditionOverlay`s standing in the
view's week"; a calamity is no overlay. So a disaster look stands through a condition: V08 §3.16 (7) (b) adds, after
"every other condition reads the `archetype` row of its archetype", VPC-R2-03's sentence — a condition linked to a
carried calamity by (d) whose own row is `none` (the `reconstruction` condition SettlementForge raises after a calamity
among them) carries `event` `calamity` and reads that row, so the disaster look stands for that condition's weeks, its
units the calamity's `targets` first, each building's ruin yielding to its rebuild (R3-10); a calamity linked to no
condition draws no look, its aftermath DR28's epoch event — **and** "one look per calamity: where several none-row
conditions link to one calamity, the earliest-triggered (ties by condition id) carries `event` `calamity`, the others
reading `none`". V08 §2.5's `event` comment names the `calamity` word; a J-V8 row records the reading.
(b) **Which calamity.** V08 §3.16 (7) (d)'s link is the one rule (the carried calamity whose week equals the condition's
`triggeredAt.tick`, else the latest carried in the 52 weeks up to its `sinceWeek`). V01 §3.16 (2) takes the overlay's
calamity from its condition's carried `calamity` field — VV12-r2-01's text **amended**: it reads the carried calamity fact
that key names (V08 §2.3's `calamity` fact: its `type`, severity band and `targets`, resolved through the binding table
to entity ids, V08 §3.5 (6)), as a `CalamityRef` built the way V08 §3.6 (3) builds the epoch's entry — not from the
committed `epoch` events, so a calamity carried with no event (one dated at or before the last absorbed week) still gives
its targets and its pattern. A condition with no `calamity` field, a stressor's overlay and a preview give none (the
`scatter` pattern). J-V1.104, §1b's dossier row, §3.18 (e) and T-V1-60 (d) follow as VV12-r2-01 words them.
(c) **The pattern's reader.** V02 reads `disasterSource(…).pattern` (VV12-r2-04); V01 §2.3's `DisasterSource.calamity`
comment names no V02 reader ("the overlay's calamity, read by §10.2's `affectedQuarter` through `matched`"), and
`pattern`'s comment names §8.2's disaster row and V02 §5.7 (4).
(d) **The base names the source word, not its rule.** §10.2 (b)'s source sentence and DR44's map-row clause read "the
`map` row of the source word V08 §3.16 (7) (b) gives the overlay (a stressor's type, a simulator crisis event, the
`calamity` word of a linked condition, else its archetype)", with R3-11's regional clause and R3-12's pairing cited.
(e) **Fixtures.** Every disaster fixture of the set is a calamity with its linked `reconstruction` condition: V08 §7.1's
crisis fixtures (VV1112-r2-11), T-V8-59's calamity-linked fixture, T-V6-75, T-ER-27, V12 §3.15.12 / X-V12-5 and T-V1-60's
fixture calamities (each named so where it says "a fire", "a flood", "an earthquake" or "a disaster condition").

### R3-10 The disaster look leaves building by building; a preview never hands over

**Governs:** VPC-R2-09 and VV56-r2-03 (pipeline §10.2 (f)), VV56-r2-02 and VPC-R2-10 (rendering §8.2), VAT2-r2-09 (V06);
V01 §3.16's closing sentence, V02 §5.7 (1) and V03 §5.6 (4) (END lines). Supersedes R2-37 (6)'s "the `disaster` look
ending in the week the `reconstruction` Works begins".

**Decision.** V06 §3.22 (3) and J-V6.138 are the home and stand: item 122 (a)'s "a disaster's ruined look gives way to
the Works scaffolding of `reconstruction`" holds on each building — `crisisLookYields(doc, building, overlay, week)` turns
true once a Works other than a `decay` Works has started on the building (and did not finish before the overlay's
`sinceWeek`); a building no such Works reaches keeps the look until its condition ends; no week draws both the look and
a Works' stage on one building. Ending the whole look at the first rebuild's week would clear the ruin from every building
not yet rebuilt in one week, which the hand-over does not ask. Texts: §10.2 (f) reads "`disaster`: (d)'s
`neighbourhoods`, each building leaving the look in the week V06 §3.22 (3)'s `crisisLookYields` turns true on it (a
Works other than a `decay` Works begun on it), a building no such Works reaches keeping it until its condition ends, so
no week draws both on a building"; §8.2 is VV56-r2-02's text (a district's `ruinTone` stands while any of its buildings
draws the look; *The layer* reads `crisisLookYields` and re-runs when the week crosses a Works' start week on a building
of a standing disaster look). **A preview never hands over** (VAT2-r2-09's text): `overlay: Id | null`, `crisisLookYields`
false for `null`, so a previewed ruin draws over every building of its units whatever their Works.

### R3-11 `regional_migration_pressure` draws the refugee camp

**Governs:** VPC-R2-01, VDC2-10, VV56-r2-08 (pipeline §10.2 (b)); VPC-R2-02, VDC2-09 (determinism DR44).

**Decision.** Item 122 (b)'s approved text names "**mass immigration** (regional_migration_pressure, REFUGEE_WAVE)" a
refugee camp and "the regional_* pressures — no look"; the named archetype governs the general class (V11 §3.25.9 already
maps it so; T-V6-75 already fixtures it). One clause, both units: "`regional_migration_pressure` the refugee camp (item
122 (b)'s mass immigration), the other regional_* pressures `none`" — inside R3-09 (d)'s sentence at §10.2 (b) and in
DR44's map-row clause. Grade MAJOR: the base as written draws the owner's archetype as nothing.

### R3-12 A stressor and a condition of one look draw one look

**Governs:** VAH-r2-02 (V08); DR44's source clause (END); V11's round-2 hand-off to V08.

**Decision (J122, vetoable).** The pairing test the verifier proposed (an archetype equal to the stressor's type, or a
`triggeredAt` naming the stressor, "as SF0's census confirms") rests on fields the pinned line is not confirmed to carry.
One rule needs none and keeps item 122 (c)'s scale by severity: **a `cond:stress:<type>` overlay draws no look while a
condition's overlay whose map row gives the same look kind stands; the condition's look — its name, weeks, severity and
forces — is the one drawn, and the stressor's look resumes if the condition ends while the stressor is still listed.**
Two conditions of one look kind still draw two looks (two crises). Home: V08 §3.16 (7) (b); V08 §3.17's crisis row adds
the edge; T-V8-59 adds a siege stressor and a `war_pressure` condition standing together (one siege drawn, the stressor's
resuming when the condition ends); a J-V8 row records the choice over a promotion link; DR44's source clause cites V08
§3.16 (7) (b) for it.

### R3-13 A condition's knowledge tier has its home in DR44

**Governs:** VAH-r2-01 (determinism), VAH-r2-07 (V10); ends at V08 §3.16 (7) (e) and V09's T-V9-85.

**Decision.** DR44's rule cell states the tier (VAH-r2-01's text): `public` where the condition's map row gives a look,
`secret` where it is `none`, a key form listing the overlay's address admitting it whatever its tier. V08 §3.16 (7) (e)
then cites DR44. A look-bearing condition is therefore never withheld at any key: T-V10-52's fixture loses "a plague
condition withheld at public" (VAH-r2-07's text), and V09's T-V9-85 tests the knowledge clause on a none-row condition
carried beside its looks (END). V12's planted case (VAP-r2-12) stays a planted fault, as every planted case is.

### R3-14 The camp places: one land, the walls a siege reads, barricades, the village rungs, no road

**Governs:** VAF-R2T-04, VEW-r2-03, VEW-r2-05, VRC2T-03, VPC-R2-14, VV56-r2-07, VV78-r2-05 = VAL-R2-06 (pipeline);
VV12-r2-02, VV78-r2-06 (V01); VRC2T-02 (rendering); VRC2T-04 (V12); VV78-r2-07, VV56-r2-10 (V06); ends at V01 §1b, V06
§3.22 (2) d. and T-ER-27.

**Decision.** (1) **One land** (R2-37 (5) kept; its gloss amended): every camp place takes its faces from V01's
`campLand` and from nothing else; `campLand` is the owner's "common or fallow land" — the `commons` faces and the
`arable` and `strip_field` faces in their rotation's fallow course, within `camp.reachM` of the built edge and along the
approach roads by the gates (VV12-r2-02's text; never a field in crop, a meadow or a pasture). `beyondWalls`,
`approachRoads` and (e)'s cap read it (VAF-R2T-04's text). The siege line, the trenches and earthworks, the engines and the
burned farmsteads are no camp and keep their own places. (2) **The walls a siege reads** are the place's enceintes of
kinds other than `bailey` (VEW-r2-05's text); "a place with no standing enceinte" reads "no standing town enceinte", so an
unwalled town with a castle draws the blockade; no camp, line or part stands on a building footprint (burned farmsteads
excepted), a siege line broken at an extramural plot's building. (3) **Barricades**: §10.2 (d) is the home of the
placement rule (VRC2T-03's text: on a way's carriageway only a `barricade` across it, never a camp or any other part);
§8.2 states the same exception and its `blockade` cell (VRC2T-02's text); V12's T122-6 measure (VRC2T-04's text). (4) **The
share of n units**: round(s × n) clamped to [1, n] where s > 0, none where s ≤ 0, at every rung (VV78-r2-05's (c)).
(5) **The village rungs**: §10.2 (d) and (f) read V07 §5.6 (VV78-r2-05's text: the places on the village's records, no
siege line at THORP and HAMLET); V01's `campLand` and the units at those rungs read V07 §5.6 (2)–(3) (VV78-r2-06's text);
V06's no-frontier answer at a village rung is V07 §5.6 (2)'s main approach road's entry (VV78-r2-07). (6) **No road**:
with no main approach road (S3 (9) (a)'s unserved mesa) the places measure from the boundary point closest to the growth
centre (S3's root reservation, §4.2): `approachByGate` the `campLand` nearest `frontierFor`'s answer, else that point;
`outside` the `campLand` furthest from it (VEW-r2-03's text, the reference point so named); V06 §3.22 (2) d.'s answer
there is the belt's faces nearest that point (END). (7) **Roads and camps**: VPC-R2-14's division; `frontierFor(doc, h)`'s
`h` as VV56-r2-07 states; V06 §3.22 (2) (c)'s rich part and a part-seated stage as VV56-r2-10 states.

**§10.2 (d)'s camp-place bullets, binding text (pipeline):**
* `beyondWalls` — the `campLand` faces lying at least `siegeStandoffM` beyond the outermost standing town enceinte's
  outer strip along its walled arcs (the walls above); a closure arc with no wall (V11 §3.16.1) draws none;
* `approachRoads` — `campLand`'s verges of each arterial leaving the settlement (V01 §3.16 (2)), one camp per road, the
  look's camped ground divided equally among them (the remainder to the roads in trade-weight order); with the dossier's
  forces, each army's camp ((c)) whole on one road, the armies in descending size onto the roads in trade-weight order, a
  road taking a second army only when every road holds one; a road whose verges hold no `campLand` takes the `campLand`
  nearest where it leaves; a place no road reaches takes one camp on the `campLand` nearest the reference point (below);
* `approachByGate` — the `campLand` faces along the main approach road by its gate, nearest V06's `frontierFor(doc, h)`,
  `h` the households the sequential roster adds between the present population and that population plus the camp's
  heads (its headcount by (c), else its camped ground ÷ `areaPerHeadM2`): where the next growth would seat the camp's
  people (V06 §3.22 (2)); with no main approach road, nearest `frontierFor`'s answer, else nearest the reference point;
* `outside` — the `campLand` faces furthest from the main approach road (with none, from the reference point), beyond
  the outermost standing town enceinte's outer strip or, unwalled, the built edge;
* the **reference point** where no way leaves the built edge (S3 (9) (a)'s unserved mesa): the boundary point closest to
  the growth centre (S3's root reservation, §4.2).

### R3-15 What the looks draw before the services they read have landed

**Governs:** VPC-R2-11 (pipeline), VCS-r2-04 and VV12-r2-07 (scope).

**Decision.** R2-36's rule ("a look whose subject is not yet built draws nothing of that part") is written in the design,
once, at §10.2 *Crisis looks* — VPC-R2-11's text, its "(R2-36)" written "(§16)": until V01's W10 (M5) the `disaster` look
draws no district (its legend line and Find's listing stand) and `affectedQuarter` is the district with the most
households per hectare; until V06's E2 (M6-E) `approachByGate` ranks the main approach road's `campLand` faces by
nearness to its gate; at the village rungs before V07's step no disaster unit is drawn. §16's M3b item-122 clause, its M5
row and §13.8's T122 row carry the placement (VCS-r2-04's text, the M5 clause once — VV12-r2-07 MERGED; "(R2-36)" written
"(§16)"). Grade of VPC-R2-11 raised to MAJOR (the base read an input with no producer from M3b to M5 and stated no
outcome).

### R3-16 The standing looks reach the main thread through §11.2; the why card's `plan` section keeps the own level

**Governs:** VAT-r2-05 (rendering), VV910-r2-04 (V09, amended), VV34-r2-13 and VV910-r2-05 (V09), VV910-r2-08 and
VV78-r2-08 (V09), VAH-r2-06 (V10); ends at V09 and V10.

**Decision.** (a) §11.2 gains the view-bound reader kind `{ kind: 'looks'; view: ViewHandle }` answered as `LooksAnswer`
(VAT-r2-05's text): the one evaluation `live.crises` draws and §9.5's legend lists, admitted at the view's effective key.
§8.2's legend sentence reads "The legend lists each look standing by its row's `label` with its condition and weeks
(§9.5) — the evaluation §11.2's `looks` reader answers". V09 (§4.21.8 (1), §4.21.12 (3)–(7), §2.12's crisis-card row) and
V10 (§2.13's `LookAnswer.festivals` and `.crises` as projections of `LooksAnswer`; §3.5's `look` read; §1.2's row) cite it
in place of "the legend's entries". (b) VV910-r2-04 **amended**: V09 reads a disaster look's units from
`LooksAnswer.crises[].districts` (V01's `disasterDistricts` at the view's key, evaluated in the generation worker), never
by calling V01 on the main thread; its (5) **Show** frames a `disaster` look by the union of its units' `FindArea` shapes
(V01 §5.4 (6)). (c) **The why card's `plan` section** carries the building's own level only (V03 §4.6, V10 §3.9a, T-V3-40
(d), J-V3.139); the plan panel shows the look's lines; the card names the look by its facts row `info.crisis.ruinedFor` —
VV910-r2-05's text with VV34-r2-13's wiring-row and T-V9-86 clauses (one fix). (d) **Ask the assistant** on a crisis card
uses V10's `drawer` entry with no attachment (VV910-r2-08). (e) At THORP, HAMLET and VILLAGE `info.crisis.ruinedFor` is
the village `WhyProvider`'s answer row, shown once (VV78-r2-08). (f) V10's `LookAnswer` display fields carry §2.9's
shapes as stored (VAH-r2-06's first form).

## Part E — time, epochs, locks and the host

### R3-17 The epoch cadence folds at a newly carried calamity's week

**Governs:** VAT2-r2-01 (pipeline), VAT2-r2-02 (V06).

**Decision.** V08 §3.6 (3) and J-V8.55 fold an epoch at the week of each newly carried calamity no other epoch falls on
(DR28: a destructive event is epoch content); §4.11 *The clock* (4), the cadence's home, omits it. The home takes it:
VAT2-r2-01's text, the catch-up clause kept (a coarse catch-up carries a calamity in the coarse epoch that holds its
week). V06 §3.3.1 cites the home and restates no trigger list (VAT2-r2-02 **amended**): "(at §4.11 *The clock* (4)'s
cadence; a catch-up whose epochs at that cadence would pass the comfort level folds coarser, V06 §6.8 (6), a calamity then
riding the coarse epoch that holds its week)". Grade of VAT2-r2-01 lowered BLOCKER → MAJOR: two units state two
cadences; no rule as written is impossible or crashing, and its worst consequence named (V01's targets missed at a fresh
calamity's week) no longer follows once V01 reads the carried calamity (R3-09 (b)).

### R3-18 The creation week and the present at creation are two values

**Governs:** VAT2-r2-03 (pipeline, BLOCKER kept: the first replay epoch's `years` is negative under the home's
definition — J141's own example of a blocker), VAT2-r2-04 (V06); read by R3-06 (c).

**Decision.** VAT2-r2-03's text at §4.11 *The clock* (1) and EP-15, and VAT2-r2-04's at V06 l. 409 and §3.20.3: the
**present at creation** is the dossier's present week (a standalone map's, week 0); the **creation week** is the week of
the document's `generate` event — that present, except on a history-first document, whose `generate` event stands at
the replay's start (`HistoryIndex.creationWeek`, V06 §2.11); the first epoch's `prevWeek` and `years` read the creation
week. One name each, everywhere.

### R3-19 A fall and the locks: a dossier fall takes them, no other fall does

**Governs:** VEL2-r2-01 (V06), VPC-R2-07 (V06, MERGED), VAT2-r2-07 (V07, amended).

**Decision.** §7.7's precedence and §2.6's clamp (R2-18) are the rule: only a dossier population fall reaches a locked or
pinned household or empties a locked or pinned dwelling. V06 §3.5.1 (1), (4), (5), `EpochReport.households.heldByLock`,
V06 §3.21's two rows and T-V6-70 (f) are VEL2-r2-01's texts, whole. V07's desertion follows it (VAT2-r2-07 **amended**):
V07 l. 2542–2543 reads "every dwelling vacates and decays over the dwell bands — a locked or pinned dwelling excepted
(V06 §3.5.1 (4)–(5)): under a dossier population fall its last household leaves by a `relet` down to 0 and the building
keeps its state; under any other fall it keeps its last household, the fall met short (`households.heldByLock`)", and
T-V7-16 "a target of 0 vacates every dwelling but a locked or pinned one, which keeps its state — with 0 households under
a dossier fall, with its last household under any other (V06 §3.5.1 (5))".

### R3-20 Item 125 (e): the dossier picks its adapter; every field has its fallback

**Governs:** G125-V08 (V08), VCS-r2-02 (V08, MERGED); ends at §14's `HostContext.line` (scope) and §11.3 (rendering).
Amends R2-40 (2)'s `line` clause.

**Decision (owner rule first; the confirmation VCS-r2-02 asked for).** Item 125 (e): "the same dossier with and without a
host context yields the identical document and hash". (1) **Selection** (G125-V08 clause (1), in VCS-r2-02's words): the
dossier's own shape and stamps select the adapter in every case — the bound line when its adapter accepts, else the
single accepting adapter, else (a creation with several accepting) the newest registered line, noted `line_defaulted`;
`HostContext.line` is checked, never chosen from — a named line no adapter supports, or one the dossier's stamps
contradict, refuses `E_LINE_UNSUPPORTED`; a registered, accepting line that differs leaves the selection standing, the
report naming both. R2-40 (2)'s "`line` (it picks the adapter …)" reads "`line` (checked against the dossier's own
selection, V08 §2.4, never chosen from …)" at §14's `HostContext` comment and item (scope) and §11.3 (rendering).
(2) **Fallbacks** (G125-V08 clause (2)): `population`, `_seed` and `institutions` as written. The proposed refusal for
`id` and the three version stamps is **amended to the owner's rule** (item 125 (b): "a missing or empty field never
refuses, never stalls, and is reported"): an empty or unreadable `id` — at an absorb the bound document's
`DossierBinding` key stands (the offer names its map), at a creation the settlement key is minted from the creating map's
id (the offer's `docId`, V08 §3.3) — noted `field_fallback`, `E_OTHER_SETTLEMENT` then not checked for that offer; an
empty or unreadable version stamp — the adapter by (1)'s selection without it, the single adapter whose `recognise`
accepts the dossier's shape, else the newest registered line — noted `field_fallback` and `line_defaulted`. B3 keeps only
what is no dossier at all (not an object of the line's shape; over a size limit). The J-V8 row records these fallbacks;
T-V8-61 (a) adds an empty `id` and an empty `schemaVersion` beside the empty `population` and `_seed`.

### R3-21 The host's view commands: the drawn week, the layers by `setLayer`, the keys that never cross

**Governs:** VAT-r2-04 and VAL-R2-02 (rendering), VV910-r2-02 (V09); ends at §7.7 item 1 (determinism), V08 and V09.
Amends R2-33 (b)–(c).

**Decision.** Item 125 (c): the host sends its commands "as a user would". (a) **The layers shown** travel as the user's
toggle does — a logged `setLayer { layer, spec: { visible } }` sent by `doc.apply` (VAT-r2-04's text), `LayerSpec` being
document style state (§8.4, §7.4), never a `view.set` key. (b) **The week**: `view.set { week }` sets §2.9's `week` (item
67's drawn week) as a user's scrub does and never writes `yearWeek` or `seasonFollow` (VV910-r2-02's text). (c) **A
selection**: `view.set { select }`, unchanged. (d) `depthBand` joins the per-viewer keys that never cross (VAL-R2-02's
text). The restatements follow: §7.7 item 1 (determinism END), V08's `setView` comment and §3.16 (4), (6) (g) (V08
END: "a host sets the frame's view only by §11.3's commands — `view.set { week }`, `view.set { select }` and the layers
shown by a logged `setLayer` sent by `doc.apply`; the per-viewer keys, `find`, `crises` and `depthBand` among them, never
cross the bridge (§11.3; J-V8.127)"), V09 §4.2 and its row 21 (V09 END).

### R3-22 Item 125's retirements reach every reader

**Governs:** VDC2-11 (determinism), VRC2T-11 and VDC2-12 (rendering, one fix), VDC2-13 and VPC-R2-16 (pipeline, one
fix), VDC2-14 (V06), VV78-r2-01, VV78-r2-02 and VDC2-15 (V07, one fix), VV78-r2-03 and VAL-R2-09 (V07, one fix).

**Decision.** Item 125 (a)–(b): no input gives a true bearing, a river course or a latitude after creation; the week is
the dossier's latest stamped tick (R2-40 (1)). (a) Bearings: §7.7 item 1 is VDC2-11's text; §11.1's anchor is
VRC2T-11's text; §4.7's store faces "its partner's bearing (§7.7 layer 2's *Bearing*; items 77, 85)" (VDC2-13's text —
DR3 reads no bearing, so VPC-R2-16's "the trade slice's partner bearing, §7.7 layer 2 and DR3" is not written).
(b) Latitude: V06's row (VDC2-14) and V07's VS1 (VV78-r2-01) read `Intent.latitudeDeg` (DR29), else 50°. (c) The river
course: VV78-r2-02's text (no input selects the descent trace at the village rungs; every village river is course-first)
— VDC2-15's "taken only when the blueprint or the user sets it" names a setting that does not exist and is not written.
(d) The week: VV78-r2-03's text at V07's trace, W80 and T-V7-65.

## Part F — weather, Find at a drawn week, and the world's edges

### R3-23 The weather timeline: the live rate, the hours, and Start a shower now

**Governs:** VDC2-01, VDC2-02, VDC2-03, VDC2-04 (determinism), VV1112-r2-01 (V11), VV910-r2-01 and VDC2-05 (V09, one
fix), VRC2T-17 and VAL-R2-01 (rendering; V04's end).

**Decision.** (a) §6.1 *The weather stream* is the home of the timeline: the gap a unit exponential spent at the live
rate R(t) over view time, none spent while R = 0; a kind live at a moment when its band holds §2.9's `yearWeek` and,
under `light: 'time'`, its `hours` hold the view's hour; the kind drawn when the spell starts (VDC2-01's text, with
VDC2-02's mark keying and VDC2-03's lint scope). V11 §3.25.11 reads its columns in the same terms (VV1112-r2-01's text).
(b) **Start a shower now** starts the commonest live kind at that moment (V11 §3.25.11's rule); at a moment with no live
kind it starts none and V09 disables the button with its reason — never a silent no-op (§7.8). VDC2-04's text **amended**
to "at a moment with no live kind (R = 0)"; VV910-r2-01's V09 text governs over VDC2-05's, **amended**: the key is
`settings.weather.noneNow`, "No weather comes here at this time of year or day." (a moment can lack a live kind by the
hour under `light: 'time'`, not only by the week); row 93's and T-V9-87's wording follow (heat shimmer in an arid row's
dry weeks; the disabled button where none is live). (c) The kind is read at `yearWeek`, never `week` (VRC2T-17). (d) While
the underground layer is drawn the spell draws nothing and §8.4 (i)'s terms are off (VAL-R2-01's text); V04 §5.1 cites it
(END).

### R3-24 Find and the crisis looks at a drawn week whose frame is not the head

**Governs:** VRC2T-07 (rendering), VV910-r2-09 (V09); ends at V10 §3.9b (7) and V01 §3.16.

**Decision.** At a drawn week whose frame is not the head (V06 §3.15.2) Find counts, glows, pins, lists and gaps only the
entities that frame holds, a chip with none there reading count 0 for that week, the chips themselves unchanged; the
crisis looks place over the model the view draws. To make one place compute it, §11.2's `gazetteer` query gains
`week?: number` — the view's drawn week (§2.9's `week`), absent the head — and answers its rows, counts and matches over
the head's index restricted to the entities that week's frame holds (rendering, inside VRC2T-07's fix). `live.find`
(§8.2), V09's panel (VV910-r2-09's text, its triggers adding the `week` change) and V10's `read_map find` (END) pass the
view's week. V01's crisis services take as `doc` the model the view draws, the head or that frame (END).

### R3-25 Raised ways: the feet cited, the frame growth, a trace laid across a standing raised way, the band under a station

**Governs:** VKr2-05 and VM-R2T-04 (pipeline), VKr2-06 and VM-R2T-05 (determinism), VKr2-07 (V05), VKr2-01 (kernel),
VKr2-02 (scope), VEW-r2-01 (model, BLOCKER kept), VM-R2T-03 (model); ends at pipeline §4.4, §4.8, V06 §3.7.1, §3.7.6 (5),
§3.7.7 (2), T-V6-47 and scope's T110-2 and item-114 group.

**Decision.** (a) **The feet** (R2-26 (a) kept): §2.7's `RaisedWayRecord.feet` is the one statement. §4.3 reads
VKr2-05's citation (VM-R2T-04 MERGED; its §4.6 clause written so: "a raised way's feet (§2.7's `RaisedWayRecord.feet`) are
ramps or stairs by the same rule, but a foot at a deck end on the arena's outer ring, which draws neither"); §7.1's
`drawWay` comment reads VKr2-06's citation (VM-R2T-05 MERGED); V05 reads VKr2-07's. VM-R2T-04 graded MAJOR (§4.6 as
written builds a ramp §2.7 forbids). (b) **The frame growth**: VKr2-01's first form (part 0's insertion and strip as two
L0 batches, each ring-end foot moved between them; `Plat.frame` taken as the last batch commits) — the alternative form
is not written; VKr2-02's T110-2 clause bars it. (c) **A trace or moat laid across a standing raised way** (VEW-r2-01): the
support step's (6) is the home, with VEW-r2-01's ends at §4.4 S5a *Outer moats*, §4.8 S7, V06 §3.7.1 and T110-2 — and,
because V06 §3.7.6 (5) still says a trace crosses "only under a span over land, never through a support" against its own
J-V6.140, V06 §3.7.6 (5) and T-V6-47 read with (6) (END). (d) **The band under a crossing station** is held from decay
while the deck stands (VM-R2T-03's text at §2.7's support step (3)); V06 §3.7.7 (2) cites it; scope's item-114 group
gains its fixture (END lines).

## Part G — bars, pins and the hand-offs nobody raised

### R3-26 Take-over bars and pin registrations: both ends, the union written this round

**Governs:** VAP-r2-01 – VAP-r2-14, VCS-r2-05, VV34-r2-05, VV34-r2-12, VV34-r2-15, VV1112-r2-07 – 10, VV1112-r2-12 (the
R2-08 and R2-09 classes, recurring from round 1).

**Decision.** R2-08 and R2-09 stand; this round writes both ends at once, each in the form those rulings fix: a volume
test's head names every base-bar clause it runs and each re-running clause names its bar (VAP-r2-02, -03, -04, -05, -06,
VCS-r2-05); a restating pin clause states "— the `<pin>` registration of <suite> on V12 §3.7.8's engine (V12 §2.13),
written by <seat>" (VAP-r2-09, VAP-r2-10, VV1112-r2-09, VV1112-r2-10, VV34-r2-05, VV34-r2-12); scope's take-over table
and §13.2's runs lists carry the same ids (VAP-r2-01); V12 §2.13's suites column, §3.7.8's list and X-V12-11 are exactly
the union of the registering clauses (VAP-r2-08, VV34-r2-15, VV1112-r2-08), which this round adds: V02's T-V2-58 (f) on
`item115.ceiling`, T-V2-59 (d) on `item123.damage`, T-V2-60 (c) on `item122.crises`; V03's T-V3-39 (g) on
`item123.damage`, T-V3-40 (f) on `item122.crises`; V08's T-V8-59 on `item122.crises`, T-V8-61 (b) on `item125.host`;
V10's T-V10-45 on `item111.water` (the brief's golden excepted); V11's T-V11-39 (b) on `item113.history`, T-V11-40 (b) on
`item114.condition`, T-V11-41 (b) on `item115.off` and `item115.ceiling` (T-V11-13, T-V11-31 and T-V11-38 (b) already
listed, their clauses now stated). V12 takes §13.8's tiers (VV1112-r2-07). Grades: the take-over and head ids are
bookkeeping, MINOR (R3-03 (a)); VAP-r2-07, VAP-r2-08 (its suite that cannot pass), VAP-r2-11, VAP-r2-12 and VAP-r2-14 stay
MAJOR.

### R3-27 Round-2 hand-offs no verifier raised, found unwritten

Two round-2 hand-offs reached no round-3 issue and are still open in the live text; each is an END line under its
receiving unit (adjudicator's ids, MINOR): **ADJ-r3-01** (pipeline; repair-r2-V11's hand-off (d)): §10.2's comment naming
the types V11 declares (l. 14936, "… ClimateRow (with its ClimateSeasonCells, item 117) …") reads "ClimateRow (with its
ClimateSeasonCells, item 117, and WeatherSpells, item 124) and ClimateSettings"; **ADJ-r3-02** (rendering;
repair-r2-V12's hand-off): §8.2's greyscale bar (l. 13116) cites "V12's `T114g.greyscale`", which V12 does not define —
it reads "V12's `BenchBarDef` T114-6 (its statistic `bar.T114-6`, V12 §3.15.4)". The other round-2 hand-offs are either
raised by a round-3 issue (and ruled in Part H) or found written.
