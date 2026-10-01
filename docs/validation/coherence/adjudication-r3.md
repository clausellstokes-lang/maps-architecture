# Adjudication round 3 — binding rulings for repair round 3

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/adjudicate-r3; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/adjudicate-r3`, 2026-10-01)
- P0 brief read whole; inputs located (round3-work 18 files, 214 issues; repair-r2 ×18; verify r2t ×20; adjudication-r2; canon's dated rulings; file g items 122–126): done
- P1 ruling requests of round 2's repair files: none filed (all eighteen searched): done
- P2 every issue read whole; multi-reporter, ping-pong and one-sided hand-off groups found; round 2's HAND-OFFS sections read for ends nobody raised: done
- P3 binding rulings R3-01 – R3-27: done
- P4 Part H, all 214 issues (183 FIX, 31 MERGED, 0 INVALID), J141 regrades (64), 55 END lines under their units: done
- P5 canon dated ruling "2026-10-01 (adjudication round 3)" appended; result saved; LANDED: done

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

## Summary

* **Ruling requests:** none filed in round 2's eighteen repair files (Part A).
* **27 binding rulings** (R3-01 – R3-27). The look-first defects of the brief are ruled: the disaster look ends building by
  building, by V06's `crisisLookYields`, a preview never handing over (R3-10, superseding R2-37 (6)); `regional_migration_pressure`
  draws the refugee camp, the other regional_* pressures none (R3-11); the damage comparison is "the level above 0 and at least t"
  everywhere (R3-04, superseding R2-38 (4)'s wording); the why card's `plan` section keeps the building's own level, the plan panel
  showing the look (R3-16 (c)); a disaster overlay takes the calamity V08 links to its condition, read from the carried fact (R3-09
  (b)), and a dossier calamity reaches the look through its linked none-row condition, one look per calamity (R3-09 (a)); item 123
  (b)'s "reused" is read under J122 as the building put back to use (a `reoccupy`) beside a repair, §2.8's `reused` trace keeping its
  meaning and holding no plan (R3-08 (a)). Other recurring classes ended: hand-off ends written at one side only (R3-01, END
  lines); review ids in design text (R3-02); the decay run's start, the aging default age and the replay's ruins (R3-06); the plan
  last lived in (R3-07); the per-element repair peak (R3-08 (b), a blocker); the cadence's calamity week (R3-17); the two meanings
  of "the creation week" (R3-18, a blocker); locks under a standalone fall (R3-19); the adapter picked by the dossier alone and a
  fallback for every field, `id` and the version stamps included (R3-20, owner item 125 over a verifier's proposed refusal); the
  host's layers by `setLayer` (R3-21); item 125's retirements (R3-22); the weather's live rate (R3-23); Find at a scrubbed week
  (R3-24); raised ways crossed by a later trace (R3-25, a blocker); the pin and take-over unions (R3-26); two residual hand-offs (R3-27).
* **Dispositions of the 214 issues:** 183 FIX (91 under a ruling as written, 8 amended by a ruling), 31 MERGED into a
  sibling id, 0 INVALID. Parts of required changes not written (each in its issue's note): VPC-R2-16's bearing source, VPC-R2-18's
  key, VDC2-15's setting, G125-V08's refusal of an empty `id` or stamp, VKr2-01's alternative form, VM-R2T-10's restated order,
  VAT2-r2-02's trigger list, VV12-r2-01's reading from epoch events, VV910-r2-04's main-thread call, VV910-r2-01's key name.
* **Grades (J141):** reported 4 blocker, 90 major, 120 minor; graded 3 blocker, 128 major, 83 minor — 64 regraded
  (50 raised, chiefly two units stating two outcomes for one case; 14 lowered, chiefly bookkeeping lists, and VAT2-r2-01 from
  blocker). The three blockers: VEW-r2-01, VAT2-r2-03, VV56-r2-06.
* **END lines:** 55, under 15 unit headings (two of them the adjudicator's own residual ends, R3-27).
* **Canon:** one dated ruling appended to `canon.md` (Part I).

## Table of contents by unit

Each row: the issues the unit owns, the END lines it writes for others, and the rulings it applies whole; then its heading in
Part H. Every seat reads R3-01 – R3-03.

| unit | issues | END lines | rulings binding it | its heading |
|---|---|---|---|---|
| scope (base §0–§1, §13–§17, the index, INDEX.md) | 10 | 5 | R3-08, R3-15, R3-20, R3-25, R3-26 | Part H · scope |
| model (base §2) | 10 | 1 | R3-04, R3-05, R3-06, R3-07, R3-08, R3-25 | Part H · model |
| kernel (base §3) | 2 | 0 | R3-25 | Part H · kernel |
| pipeline (base §4, §10, PART II, PART III) | 28 | 5 | R3-09, R3-10, R3-11, R3-12, R3-14, R3-15, R3-17, R3-18, R3-22, R3-25, R3-27 | Part H · pipeline |
| determinism (base §5–§7) | 16 | 3 | R3-09, R3-11, R3-12, R3-13, R3-21, R3-22, R3-23, R3-25 | Part H · determinism |
| rendering (base §8, §9, §11, §12) | 28 | 6 | R3-04, R3-05, R3-08, R3-09, R3-10, R3-14, R3-16, R3-20, R3-21, R3-22, R3-23, R3-24, R3-27 | Part H · rendering |
| V01 | 5 | 5 | R3-09, R3-10, R3-14, R3-24 | Part H · V01 |
| V02 | 5 | 3 | R3-05, R3-08, R3-09, R3-10, R3-26 | Part H · V02 |
| V03 | 7 | 3 | R3-05, R3-08, R3-10, R3-26 | Part H · V03 |
| V04 | 10 | 2 | R3-04, R3-23, R3-26 | Part H · V04 |
| V05 | 2 | 0 | R3-25 | Part H · V05 |
| V06 | 18 | 6 | R3-04, R3-06, R3-08, R3-09, R3-10, R3-14, R3-17, R3-18, R3-19, R3-22, R3-25, R3-26 | Part H · V06 |
| V07 | 9 | 0 | R3-19, R3-22 | Part H · V07 |
| V08 | 12 | 3 | R3-09, R3-12, R3-13, R3-20, R3-21, R3-26 | Part H · V08 |
| V09 | 22 | 6 | R3-04, R3-06, R3-08, R3-13, R3-16, R3-21, R3-23, R3-24, R3-26 | Part H · V09 |
| V10 | 9 | 4 | R3-04, R3-06, R3-08, R3-13, R3-16, R3-24, R3-26 | Part H · V10 |
| V11 | 10 | 2 | R3-06, R3-09, R3-23, R3-26 | Part H · V11 |
| V12 | 11 | 1 | R3-09, R3-13, R3-14, R3-26 | Part H · V12 |

Parts: A the ruling requests · B the whole round (R3-01 – R3-03) · C item 123 (R3-04 – R3-08) · D item 122 (R3-09 – R3-16) ·
E time, epochs, locks and the host (R3-17 – R3-22) · F weather, Find and the world's edges (R3-23 – R3-25) · G bars, pins and
residual hand-offs (R3-26, R3-27) · H per-unit dispositions · I canon changes.

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

## Part H — per-unit dispositions (all 214 issues)

### scope (base §0–§1, §13–§17, the index, INDEX.md)

Rulings: R3-01, R3-02, R3-03, R3-08, R3-15, R3-20, R3-25, R3-26.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAP-r2-01 | major | **minor** — bookkeeping: the test already runs the clause; only a list or head lacks the id, R3-03 (a) | HANDOFF-OPEN | FIX per R3-26 | its table and runs-list texts as written |
| VAP-r2-14 | major | major | DISAGREE | FIX |  |
| VEW-r2-02 | major | major | EDGE-UNDEFINED | FIX | R2-30's stop-0 clause stays in T116-1's view bar only (canon) |
| VKr2-02 | major | major | EDGE-UNTESTED | FIX per R3-25 (b) | bars VKr2-01's first form |
| VCS-r2-01 | minor | minor | CONFLICT | FIX |  |
| VCS-r2-03 | minor | **major** — two units state two outcomes (§13.4's pointer-only fabric and finish layers against V09 §4.12's switchable default), §13.4's against item 126 (e) | CONFLICT | FIX | V09's end is an END line under V09 |
| VCS-r2-04 | minor | minor | WIRING | FIX per R3-15 | every "(R2-36)" written "(§16)"; its M5 clause closes VV12-r2-07 |
| VCS-r2-06 | minor | minor | COHESION | FIX |  |
| VV12-r2-07 | minor | minor | COHESION | MERGED into VCS-r2-04 | the M5 row's item-122 clause written once |
| VV910-r2-07 | minor | minor | COHESION | FIX | supersedes R2-32 (2)'s "V10 C3" (canon) |

**END lines under this heading** (other units' fixes this seat writes):

* END of VV56-r2-01 (V06): §13.2's T123-4 reads "(T123-4) restoring — a `reoccupy` back into use (item 123 (b)'s "reused") or a repair — lowers the level and removes the damage in reverse threshold order, each repaired element drawn in item 114's patch material". *(R3-08 (a))*
* END of VEW-r2-01 (model): §13.2's T110-2 adds "a CITY c14 fixture whose S4 viaduct over a valley is crossed at a gate by stage 2's moated ring, and an epoch circuit across a standing aqueduct — each crossing's one station on the trace, 0 piers in a setback, glacis, berm or moat, the raised way kept". *(R3-25 (c))*
* END of VM-R2T-03 (model): §13.2's item-114 group gains "a neglected, poor CITY ring over 20 epochs with a masonry aqueduct through its wall arch and a viaduct on a raised gate: the stretch under each crossing station never `breached` or `dismantled` while its deck stands, every other stretch decaying as T114-1 states". *(R3-25 (d))*
* END of G125-V08 (V08): §14's `HostContext.line` comment (l. 19161) reads "the SettlementForge line the host runs: checked against the dossier's own selection (V08 §2.4), never chosen from; a line no adapter supports, or one the dossier's stamps contradict: `E_LINE_UNSUPPORTED`; a registered, accepting line that differs leaves the selection standing, both reported"; §14's port item (l. 19274–19276) reads "`line` is checked against the dossier's own selection (V08 §2.4), never chosen from — a `line` no adapter supports, or one the stamps contradict, refuses with `E_LINE_UNSUPPORTED`", the rest as it stands. *(R3-20 (1))*
* END of VV78-r2-10 (V11): §13.2's T122-4 reads "every SettlementForge stressor type, condition archetype and crisis event at the pinned baseline has its row in §10.2's closed map …" (V08's census holds the three lists).

### model (base §2)

Rulings: R3-01, R3-02, R3-03, R3-04, R3-05, R3-06, R3-07, R3-08, R3-25.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAF-R2T-01 | major | major | DISAGREE | FIX per R3-05 | VAF-R2T-01's sentence, its scope "decayed or ruined" however V06 §3.23 reads the level |
| VDC2-07 | minor | **major** — two units state two outcomes for one case (t = 0 at level 0), R3-03 (b) | CONFLICT | MERGED into VM-R2T-02 |  |
| VEW-r2-01 | blocker | blocker | EDGE-UNDEFINED | FIX per R3-25 (c) | BLOCKER kept (supports left in a moat or setback: a silent wrong result); its ends at pipeline, V06 and scope |
| VM-R2T-01 | major | major | CONFLICT | FIX per R3-07 | its texts (1) and (2), whole |
| VM-R2T-02 | major | major | CONFLICT | FIX per R3-06 | §2.6 step 7's level sentence is R3-06's binding text, which carries R3-04, R3-07, R3-08 (a)–(b) and R3-05's roofless sentence; closes VDC2-07 and VRC2T-14 |
| VM-R2T-03 | major | major | EDGE-UNDEFINED | FIX per R3-25 (d) | its ends at V06 and scope are END lines there |
| VM-R2T-08 | minor | minor | CONFLICT | FIX |  |
| VM-R2T-10 | minor | minor | RESTATEMENT | FIX, amended | §2.7's *Readers* reads "volume 6's transitions (V06 §3.7.7 (3), which orders the patches' rebuilding)" and restates no order (principle (1)); V06 §3.7.7 (3) already states generation's epoch 0 first |
| VRC2T-14 | minor | **major** — two units state two outcomes for one case (t = 0 at level 0), R3-03 (b) | CONFLICT | MERGED into VM-R2T-02 |  |
| VRC2T-16 | minor | **major** — two units state two outcomes (§8.8 frames the ring's arcs, §2.9 does not) | CONFLICT | FIX | its §10.2 (g) end is an END line under pipeline |

**END lines under this heading** (other units' fixes this seat writes):

* END of VV56-r2-01 (V06), VV56-r2-06 (V06), VAT2-r2-05 (V06) and VAT2-r2-06 (V06): written inside R3-06's binding text for §2.6 step 7 (the restoration clause, the per-element peak, the replay's ruins and the default age that ages), applied under VM-R2T-02.

### kernel (base §3)

Rulings: R3-01, R3-02, R3-03, R3-25.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VKr2-01 | major | major | EDGE-UNDEFINED | FIX per R3-25 (b) | its first form (two L0 batches, each ring-end foot moved between them); the alternative is not written |
| VKr2-03 | minor | minor | CONFLICT | FIX |  |

**END lines under this heading:** none.

### pipeline (base §4, §10, PART II, PART III)

Rulings: R3-01, R3-02, R3-03, R3-09, R3-10, R3-11, R3-12, R3-14, R3-15, R3-17, R3-18, R3-22, R3-25, R3-27.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAF-R2T-04 | major | major | DISAGREE | FIX per R3-14 (1) | §10.2 (d)'s bullets are R3-14's binding text; V01 §1b's end is an END line under V01 |
| VAL-R2-06 | major | major | HANDOFF-OPEN | MERGED into VV78-r2-05 |  |
| VAL-R2-08 | major | major | DISAGREE | MERGED into VPC-R2-08 |  |
| VAT2-r2-01 | blocker | **major** — BLOCKER → MAJOR: two units state two cadences; no rule is impossible or crashing, and its named consequence no longer follows (R3-17) | MATRIX-GAP | FIX per R3-17 |  |
| VAT2-r2-03 | blocker | blocker | DISAGREE | FIX per R3-18 | BLOCKER kept (a negative first span); EP-15 as written |
| VDC2-10 | minor | **major** — two outcomes for the owner's archetype, R3-11 | CONFLICT | MERGED into VPC-R2-01 |  |
| VDC2-13 | minor | minor | CONFLICT | FIX per R3-22 (a) | closes VPC-R2-16 |
| VEW-04 | major | major | EDGE-UNTESTED | FIX | its EP-22 text (the fuller); closes VM-R2T-06 |
| VEW-r2-03 | major | major | EDGE-UNDEFINED | FIX per R3-14 (6) | the reference point so named; EP-27 here; V06's and T-ER-27's ends are END lines |
| VEW-r2-05 | major | major | EDGE-UNDEFINED | FIX per R3-14 (2) | EP-27 here; T-ER-27's fixtures an END line under rendering |
| VKr2-05 | minor | minor | CONFLICT | FIX per R3-25 (a) | with VM-R2T-04's §4.6 clause in R3-25 (a)'s words |
| VM-R2T-04 | minor | **major** — §4.6 as written builds a ramp at a ring-end foot, which §2.7 forbids | CONFLICT | MERGED into VKr2-05 |  |
| VM-R2T-06 | major | major | EDGE-UNTESTED | MERGED into VEW-04 |  |
| VPC-R2-01 | major | major | CONFLICT | FIX per R3-11, R3-09 (d) | §10.2 (b)'s source sentence names the source word V08 §3.16 (7) (b) gives, the regional clause and R3-12's pairing cited; closes VDC2-10, VV56-r2-08 |
| VPC-R2-04 | minor | **major** — two outcomes for a route crossing a barrier in an unwalled k ≥ 2 stage | CONFLICT | FIX |  |
| VPC-R2-08 | minor | **major** — two outcomes for a bank whose stretch is empty | CONFLICT | FIX | closes VAL-R2-08 |
| VPC-R2-09 | minor | **major** — two units end the disaster look differently | CONFLICT | FIX per R3-10 | §10.2 (f) in R3-10's text; closes VV56-r2-03 |
| VPC-R2-11 | minor | **major** — an input with no producer from M3b to M5 and no stated outcome, R3-15 | WIRING | FIX per R3-15 | "(R2-36)" written "(§16)" |
| VPC-R2-12 | minor | minor | CONFLICT | FIX |  |
| VPC-R2-14 | minor | **major** — one army on one road or on four: two builds | CONFLICT | FIX per R3-14 (7) | in R3-14's `approachRoads` bullet |
| VPC-R2-15 | minor | **major** — S1 writes `Terrain.mining` from M1 with no outcome while the cavern row is absent | WIRING | FIX |  |
| VPC-R2-16 | minor | minor | CONFLICT | MERGED into VDC2-13 | DR3 reads no bearing; its "trade slice's partner bearing" is not written |
| VPC-R2-17 | minor | minor | TERM | FIX |  |
| VRC2T-03 | major | major | CONFLICT | FIX per R3-14 (3) | with R3-14 (2)'s footprint clause in the same sentence |
| VV56-r2-03 | minor | **major** — two units end the disaster look differently | CONFLICT | MERGED into VPC-R2-09 |  |
| VV56-r2-07 | minor | **major** — the count passed to `frontierFor` was a dangling input of a two-ended hook | WIRING | FIX per R3-14 (7) | in R3-14's `approachByGate` bullet |
| VV56-r2-08 | minor | **major** — two outcomes for the owner's archetype, R3-11 | CONFLICT | MERGED into VPC-R2-01 |  |
| VV78-r2-05 | major | major | CONFLICT | FIX per R3-14 (4)–(5) | closes VAL-R2-06 |

**END lines under this heading** (other units' fixes this seat writes):

* END of VEW-r2-01 (model): §4.4 S5a *Outer moats* reads, in place of "Nothing finer than L1 exists yet, so the carve's footprint clears nothing": "the carve clears no raised-way support: §2.7's support step (6) re-sites one first in the same commit; a stage gate on a raised arterial is a raised gate whose tower carries the deck, the deck itself crossing the channel (no part-0 deck added for it), the part-0 way beneath taking its own ground gate"; §4.8 S7 lays the raised gate and the aqueduct's wall opening as generation furniture, in V06 §3.7.6 (5)'s form. *(R3-25 (c))*
* END of VRC2T-16 (model): §10.2 (g)'s "The placed camps' bounds" reads "The placed camps' and the ring arcs' bounds".
* END of VV12-r2-02 (V01): §10.2 (d)'s outskirts sentence reads "The outskirts' land is V01's `campLand(doc)` (V01 §3.16): the `commons` faces and the fields in their fallow course within `camp.reachM` of the built edge and along the approach roads by the gates — every camp place below takes its faces from it and from nothing else." *(R3-14 (1))*
* END of VPC-R2-03 (V08) and VAH-r2-02 (V08): §10.2 (b)'s source sentence (written under VPC-R2-01) reads "An overlay reads the `map` row of the source word V08 §3.16 (7) (b) gives it (a stressor's type, a simulator crisis event, the `calamity` word of a linked condition, else its archetype) and draws the look its row names, or nothing for `none` — `regional_migration_pressure` the refugee camp (item 122 (b)'s mass immigration), the other regional_* pressures `none`; a stressor's overlay draws no look while a condition's overlay of the same look kind stands (V08 §3.16 (7) (b))", its unmapped-word sentence unchanged. *(R3-09 (d), R3-12)*
* END of ADJ-r3-01 (adjudicator): §10.2's comment naming the types V11 declares (l. 14936) reads "… ClimateRow (with its ClimateSeasonCells, item 117, and WeatherSpells, item 124) and ClimateSettings …". *(R3-27)*

### determinism (base §5–§7)

Rulings: R3-01, R3-02, R3-03, R3-09, R3-11, R3-12, R3-13, R3-21, R3-22, R3-23, R3-25.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAH-r2-01 | major | major | MATRIX-GAP | FIX per R3-13 | V08's citation is an END line under V08 |
| VAL-R2-03 | minor | **major** — read as exhaustive, every crypt bay falls at one level: two builds | AMBIGUOUS | MERGED into VV34-r2-16 |  |
| VDC2-01 | major | major | EDGE-UNDEFINED | FIX per R3-23 (a) |  |
| VDC2-02 | minor | minor | WIRING | FIX |  |
| VDC2-03 | minor | minor | WIRING | FIX |  |
| VDC2-04 | minor | **major** — the base states no outcome where V09 and V11 state two | CONFLICT | FIX, amended per R3-23 (b) | "in a week with no live kind" reads "at a moment with no live kind (R = 0)" |
| VDC2-06 | minor | minor | CONFLICT | FIX |  |
| VDC2-09 | minor | **major** — two outcomes for the owner's archetype, R3-11 | CONFLICT | MERGED into VPC-R2-02 |  |
| VDC2-11 | minor | minor | CONFLICT | FIX per R3-22 (a) |  |
| VDC2-16 | minor | minor | WIRING | FIX | its three keys (`bend.under.basement`, `refuse.under.basement`, `refuse.under.route`); closes VKr2-04 and VPC-R2-18, whose `refuse.access.route` is not written |
| VKr2-04 | minor | minor | WIRING | MERGED into VDC2-16 |  |
| VKr2-06 | minor | minor | CONFLICT | FIX per R3-25 (a) | closes VM-R2T-05 |
| VM-R2T-05 | minor | minor | CONFLICT | MERGED into VKr2-06 |  |
| VPC-R2-02 | major | major | CONFLICT | FIX per R3-11, R3-09 (d) | DR44's map-row clause names the source word V08 §3.16 (7) (b) gives, with the regional clause; closes VDC2-09 |
| VPC-R2-18 | minor | minor | WIRING | MERGED into VDC2-16 |  |
| VV34-r2-16 | minor | **major** — two builders key a crypt's vault cells differently (one threshold or one per cell) | CONFLICT | FIX | closes VAL-R2-03; the node naming a cell is V04's (VV34-r2-03) |

**END lines under this heading** (other units' fixes this seat writes):

* END of VAH-r2-02 (V08): DR44's source clause adds "; a stressor's overlay draws no look while a condition's overlay whose map row gives the same look kind stands (V08 §3.16 (7) (b))". *(R3-12)*
* END of VPC-R2-03 (V08): written under VPC-R2-02 — DR44 names "the `map` row of the source word V08 §3.16 (7) (b) gives the overlay (a stressor's type, a simulator crisis event, the `calamity` word of a linked condition, else its archetype)". *(R3-09 (d))*
* END of VAT-r2-04 (rendering): §7.7 item 1's "the host's view commands (§11.2, §11.3: a week, the layers shown, a selection)" reads "the host's commands (§11.3: a week and a selection by `view.set`, the layers shown by a logged `setLayer` sent by `doc.apply`, as a user's toggle)", the rest as it stands. *(R3-21)*

### rendering (base §8, §9, §11, §12)

Rulings: R3-01, R3-02, R3-03, R3-04, R3-05, R3-08, R3-09, R3-10, R3-14, R3-16, R3-20, R3-21, R3-22, R3-23, R3-24, R3-27.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAF-R2T-02 | major | major | DISAGREE | FIX per R3-05 |  |
| VAF-R2T-06 | major | **minor** — the inline union equals §2.7's `RaisedKind` value for value; nothing built changes | DUPLICATE-HOME | FIX |  |
| VAL-R2-01 | major | major | MATRIX-GAP | FIX per R3-23 (d) | V04's end is an END line under V04 |
| VAL-R2-02 | major | major | DISAGREE | FIX per R3-21 (d) |  |
| VAL-R2-07 | major | major | DISAGREE | MERGED into VRC2T-06 |  |
| VAT-r2-04 | major | major | DISAGREE | FIX per R3-21 (a) | its ends at determinism, V08 and V09 are END lines; T-ER-21's outcome for the host's commands reads "the week and the selection view state that travels, the layers a logged `setLayer`; never an input" |
| VAT-r2-05 | major | major | MATRIX-GAP | FIX per R3-16 (a) | §8.2's legend sentence in R3-16 (a)'s words; V09's and V10's ends are END lines |
| VDC2-08 | minor | **major** — two units state two outcomes for one case (t = 0 at level 0), R3-03 (b) | CONFLICT | MERGED into VRC2T-13 |  |
| VDC2-12 | minor | minor | CONFLICT | MERGED into VRC2T-11 |  |
| VKr2-08 | minor | minor | BROKEN-REFERENCE | FIX |  |
| VPC-R2-10 | minor | **major** — two units end the disaster look differently | CONFLICT | MERGED into VV56-r2-02 |  |
| VRC2T-01 | major | major | CONFLICT | FIX | V09's panel end is an END line under V09 |
| VRC2T-02 | major | major | CONFLICT | FIX per R3-14 (3) |  |
| VRC2T-05 | major | major | CONFLICT | FIX | the resolution receipt re-run; VRC2T-19's J-A68.89 clause takes its figures |
| VRC2T-06 | major | major | CONFLICT | FIX | closes VAL-R2-07 |
| VRC2T-07 | major | major | EDGE-UNDEFINED | FIX per R3-24 | with §11.2's `gazetteer` `week?` option (R3-24); V01's, V09's and V10's ends are END lines or their own issues |
| VRC2T-08 | major | major | EDGE-UNDEFINED | FIX |  |
| VRC2T-09 | minor | **major** — §8.2 veils the whole map where V09 draws no veil | CONFLICT | FIX |  |
| VRC2T-10 | minor | **major** — armies i and i + 4 drawn alike, against item 122 (h)'s own camp and colours | CONFLICT | FIX |  |
| VRC2T-11 | minor | minor | CONFLICT | FIX per R3-22 (a) | closes VDC2-12 |
| VRC2T-12 | minor | minor | WIRING | FIX |  |
| VRC2T-13 | minor | **major** — two units state two outcomes for one case (t = 0 at level 0), R3-03 (b) | CONFLICT | FIX per R3-04 | closes VDC2-08 |
| VRC2T-15 | minor | **major** — W94's reader end at §8.6 was one-ended: repaired elements undrawn or drawn by another rule | WIRING | FIX per R3-08 (b) | "at or below V06's per-element `decayPeak` (since its entry into the plan, V06 §3.23 (3))" |
| VRC2T-17 | minor | **major** — the kind read at the absolute week gives another season than §6.1's `yearWeek` | TERM | FIX per R3-23 (c) |  |
| VRC2T-18 | minor | minor | ELEGANCE | FIX | elegance, its equivalence: `FindLayer` and §2.1's `Layer` hold the same three values with no rule, value or lifecycle apart; every field keeps its place and meaning; V10's end is an END line |
| VRC2T-19 | minor | minor | CONFLICT | FIX | J-A68.89's worked clause in VRC2T-05's re-run figures |
| VV12-r2-06 | major | major | WIRING | FIX |  |
| VV56-r2-02 | major | major | CONFLICT | FIX per R3-10 | closes VPC-R2-10 |

**END lines under this heading** (other units' fixes this seat writes):

* END of G125-V08 (V08): §11.3's sentence (l. 16347–16349) reads "… and `line` (checked against the dossier's own selection, V08 §2.4, never chosen from; a `line` no adapter supports, or one the dossier's stamps contradict, refuses with `E_LINE_UNSUPPORTED`)". *(R3-20 (1))*
* END of VEW-r2-03 (pipeline): T-ER-27 adds "the unserved mesa with a refugee camp and a quarantine standing" with the outcome "each on `campLand`, else on the ring marks, never undefined". *(R3-14 (6))*
* END of VEW-r2-05 (pipeline): T-ER-27 adds "an unwalled TOWN with an inside castle, a walled CITY with an outside castle, a twin town with two rings, a walled town with extramural ribbons inside the standoff" with the outcome "0 look pixels on a building footprint; the blockade at the castle-only town". *(R3-14 (2))*
* END of VPC-R2-03 (V08): T-ER-27's fixtures read "a fire, a flood and an earthquake by their calamities, each with its linked `reconstruction` condition (V08 §3.16 (7) (b))". *(R3-09 (e))*
* END of VV56-r2-06 (V06): written inside VRC2T-15's sentence. *(R3-08 (b))*
* END of ADJ-r3-02 (adjudicator): §8.2's greyscale bar (l. 13116) reads "(J-V12.91; V12's `BenchBarDef` T114-6, its statistic `bar.T114-6`, V12 §3.15.4)" in place of "V12's `T114g.greyscale`". *(R3-27)*

### V01

Rulings: R3-01, R3-02, R3-03, R3-09, R3-10, R3-14, R3-24.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VPC-R2-05 | minor | **major** — an edge on a normal path (a cliff inside a district) with no outcome for V01's fabrics | WIRING | FIX |  |
| VV12-r2-01 | major | major | CONFLICT | FIX, amended per R3-09 (b) | the calamity read from the carried calamity fact the condition's `calamity` field names, not from the committed `epoch` events |
| VV12-r2-02 | major | major | CONFLICT | FIX per R3-14 (1) |  |
| VV12-r2-03 | minor | **major** — a bar its own fixture fails | CONFLICT | FIX |  |
| VV78-r2-06 | major | major | CONFLICT | FIX per R3-14 (5) |  |

**END lines under this heading** (other units' fixes this seat writes):

* END of VAF-R2T-04 (pipeline): V01 §1b's `campLand` row reads "`approachRoads`" for "`approachRoads`' fallback".
* END of VPC-R2-09 (pipeline): V01 §3.16's "The look's end in the week the `reconstruction` Works begins is V06's hand-over, which this service does not read" reads "The look leaves each building by V06 §3.22 (3)'s `crisisLookYields` (V06's hand-over), which this service does not read". *(R3-10)*
* END of VV12-r2-04 (V02): V01 §2.3's `DisasterSource.calamity` comment reads "the overlay's calamity (V01 §3.16 (2)): null for a preview, a stressor's overlay or a condition with no `calamity` field"; `pattern`'s comment names §8.2's disaster row and V02 §5.7 (4) as its readers. *(R3-09 (c))*
* END of VRC2T-07 (rendering): V01 §3.16 states once that the crisis services' `doc` is the model the view draws — the head, or the history frame V06 §3.15.2 gives at a scrubbed week (§8.2). *(R3-24)*
* END of VPC-R2-03 (V08): T-V1-60's fixture calamities are each linked to a `reconstruction` condition (V08 §3.16 (7) (b)), a preview beside them. *(R3-09 (e))*

### V02

Rulings: R3-01, R3-02, R3-03, R3-05, R3-08, R3-09, R3-10, R3-26.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAP-r2-02 | major | **minor** — bookkeeping: the test already runs the clause; only a list or head lacks the id, R3-03 (a) | HANDOFF-OPEN | FIX per R3-26 |  |
| VCS-r2-05 | minor | minor | CONFLICT | FIX |  |
| VV12-r2-04 | minor | minor | WIRING | FIX per R3-09 (c) |  |
| VV12-r2-05 | major | major | WIRING | FIX |  |
| VV1112-r2-09 | minor | minor | WIRING | FIX per R3-26 |  |

**END lines under this heading** (other units' fixes this seat writes):

* END of VAF-R2T-01 (model): V02 §5.7 (2) and X34 cite §2.6 step 7 for the roofless case — "every roof bay over a room of a wing whose `RoofSpec.kind` is `none`, while the building is `decayed` or `ruined` (§2.6 step 7)" — and restate no other scope. *(R3-05)*
* END of VAT2-r2-09 (V06): V02 §5.7 (1)'s "and has not handed over ((6))" reads "and has not handed over ((6); a preview never hands over, V06 §3.22 (3))". *(R3-10)*
* END of VV56-r2-06 (V06): V02 §5.7 (2)'s patched rings read V06's per-element `decayPeak` through V03 §5.6 (2) (b): an element added after the damage left is drawn as built. *(R3-08 (b))*

### V03

Rulings: R3-01, R3-02, R3-03, R3-05, R3-08, R3-10, R3-26.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAF-R2T-03 | major | major | DISAGREE | FIX per R3-05 | its parenthesis read "however V06 §3.23 reads its level" |
| VAP-r2-03 | major | **minor** — bookkeeping: the test already runs the clause; only a list or head lacks the id, R3-03 (a) | HANDOFF-OPEN | FIX per R3-26 |  |
| VV34-r2-08 | major | major | CONFLICT | FIX |  |
| VV34-r2-09 | major | major | EDGE-UNTESTED | FIX |  |
| VV34-r2-10 | minor | **major** — two rules for `storeyGone` in one volume: a walkable ground storey named gone | CONFLICT | FIX |  |
| VV34-r2-11 | minor | **major** — a solid wing's first storey drawn as a hole onto fill by one rule, a walkable patch by the kind's | NEW-PROBLEM | FIX |  |
| VV34-r2-12 | minor | minor | WIRING | FIX per R3-26 |  |

**END lines under this heading** (other units' fixes this seat writes):

* END of VV56-r2-06 (V06): V03 §5.6 (2) (b) passes each element's entry week to V06's `decayPeak` — the as-built plan's elements at the lineage's build, a re-cut's or an `extend`'s at that change's effective week — and reads the per-element peak; an element added after the damage left is drawn as built. *(R3-08 (b))*
* END of VAT2-r2-09 (V06): V03 §5.6 (4)'s "not yet handed over" test adds "(a preview never hands over, V06 §3.22 (3))". *(R3-10)*
* END of R3-08 (c) (adjudicator): V03 §4.6's head row reads "`info.damage.head.<state>` — its `Existence`, `restored` for a standing building restored with patches —".

### V04

Rulings: R3-01, R3-02, R3-03, R3-04, R3-23, R3-26.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAP-r2-13 | major | **minor** — a stale price in a decision row, R3-03 (a) | DISAGREE | FIX |  |
| VEW-r2-04 | major | major | EDGE-UNDEFINED | FIX |  |
| VKr2-09 | minor | **major** — the wrong kernel union classifies a building's sides, so which runs stay walls to sight differs | CONFLICT | FIX |  |
| VV34-r2-01 | major | major | CONFLICT | FIX |  |
| VV34-r2-02 | minor | minor | CONFLICT | FIX |  |
| VV34-r2-03 | minor | **major** — an element's key left open: two builders give a crypt bay two thresholds | NEW-PROBLEM | FIX | the node naming a cell for §6.3's key (VV34-r2-16) |
| VV34-r2-04 | minor | **major** — two units state two outcomes for one case (t = 0 at level 0), R3-03 (b) | CONFLICT | FIX per R3-04 |  |
| VV34-r2-05 | minor | minor | WIRING | FIX per R3-26 |  |
| VV34-r2-06 | minor | minor | COHESION | FIX |  |
| VV34-r2-07 | minor | minor | NEW-PROBLEM | FIX |  |

**END lines under this heading** (other units' fixes this seat writes):

* END of R3-04 (adjudicator): V04 §5.6's lead (l. 2868) reads "… damaged while the decay level is above 0 and at least the element's keyed threshold (§6.3 *Plan damage*'s comparison; §2.6 step 7) …" in place of "reaches the element's keyed threshold, the one comparison every reader makes".
* END of VAL-R2-01 (rendering): V04 §5.1 adds "while the underground layer is drawn (`cutaway`, `overlay` or `solo`) the weather effects draw nothing over the view (§8.8)". *(R3-23 (d))*

### V05

Rulings: R3-01, R3-02, R3-03, R3-25.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAL-R2-04 | minor | minor | COHESION | FIX | l. 11 is Assemble's (R2-07): the V05 seat records it as an ASSEMBLE NOTE; l. 198 and l. 3015 are its own |
| VKr2-07 | minor | minor | CONFLICT | FIX per R3-25 (a) |  |

**END lines under this heading:** none.

### V06

Rulings: R3-01, R3-02, R3-03, R3-04, R3-06, R3-08, R3-09, R3-10, R3-14, R3-17, R3-18, R3-19, R3-22, R3-25, R3-26.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAP-r2-04 | major | **minor** — bookkeeping: the test already runs the clause; only a list or head lacks the id, R3-03 (a) | HANDOFF-OPEN | FIX per R3-26 |  |
| VAT2-r2-02 | major | major | DISAGREE | FIX, amended per R3-17 | V06 §3.3.1 cites §4.11 *The clock* (4) and lists no trigger |
| VAT2-r2-04 | major | major | DISAGREE | FIX per R3-18 |  |
| VAT2-r2-05 | major | major | DISAGREE | FIX per R3-06 (b) | its model end inside R3-06's binding text; its V11 end an END line under V11 |
| VAT2-r2-06 | major | major | CONFLICT | FIX per R3-06 (c) | the creation week is R3-18's; its V11 end an END line under V11 |
| VAT2-r2-08 | minor | minor | BROKEN-REFERENCE | FIX |  |
| VAT2-r2-09 | minor | **major** — a preview is a normal path, and its two callers pass a value the callee does not take | EDGE-UNDEFINED | FIX per R3-10 | V02's and V03's ends are END lines |
| VDC2-14 | minor | minor | CONFLICT | FIX per R3-22 (b) |  |
| VEL2-r2-01 | major | major | EDGE-UNDEFINED | FIX per R3-19 | its texts 1–6 whole; closes VPC-R2-07 |
| VPC-R2-07 | minor | **major** — two outcomes for a standalone fall at a protected dwelling | CONFLICT | MERGED into VEL2-r2-01 |  |
| VV56-r2-06 | blocker | blocker | EDGE-UNDEFINED | FIX per R3-08 (b) | BLOCKER kept (a silent wrong result on every restoration that re-cuts); its ends at V03, V02, rendering and model |
| VV56-r2-01 | major | major | CONFLICT | FIX per R3-08 (a) | a J-V6 row records the reading (J122); its ends at model and scope |
| VV56-r2-04 | major | major | EDGE-UNDEFINED | FIX | V08's end is an END line under V08 |
| VV56-r2-05 | major | major | CONFLICT | FIX per R3-06 (a) |  |
| VV56-r2-09 | minor | minor | CONFLICT | FIX |  |
| VV56-r2-10 | minor | **major** — two answers of the frontier left unstated on a normal path | EDGE-UNDEFINED | FIX per R3-14 (7) |  |
| VV78-r2-07 | minor | **major** — two units could seat the refugee camp at different entries | CONFLICT | FIX per R3-14 (5) |  |
| VV1112-r2-15 | minor | minor | CONFLICT | FIX per R3-08 (d) |  |

**END lines under this heading** (other units' fixes this seat writes):

* END of VEW-r2-01 (model): V06 §3.7.1's footprint-distance test excepts the supports of a raised way the trace crosses, within one strip width of the crossing (VEW-r2-01's text); V06 §3.7.6 (5)'s second bullet reads "a trace crosses a raised way at one **crossing station** on the trace (§2.7's support step (3), (6): the nearest interior station within half a pitch moved there, keeping its key, else one added; the stations in the new strip's setback, glacis, berm or channel re-sited), never along its under-deck strip"; its continuity bullet reads "a trace that cannot cross every raised way it meets so — where (6) cannot keep each span within `maxClearSpanM` and each pier within `maxPierM` — retraces by the margin rule (V06 §3.7.4 (3)) and then **waits** …", the rest as it stands; T-V6-47's "each trace crosses it under a span" reads "each trace crosses it at one crossing station, its pier the wall's band, 0 supports in the new strip's setback, glacis, berm or channel", its bar cell's "0 supports crossed" reading "0 supports in the strip". *(R3-25 (c))*
* END of VM-R2T-03 (model): V06 §3.7.7 (2)'s breach order adds "passing over a stretch under a crossing station while its deck stands (§2.7's support step (3)), as V06 §3.7.6 (5)'s dismantling does". *(R3-25 (d))*
* END of VEW-r2-03 (pipeline): V06 §3.22 (2) d. adds "with no arterial leaving the settlement (S3 (9) (a)'s unserved mesa), the belt's faces nearest the boundary point closest to the growth centre (S3's root reservation, §4.2)". *(R3-14 (6))*
* END of VEL2-r2-03 (V09): V06 §3.20.4's *Cancel* reads "cancelling a standalone history-first generation leaves no document; …" and adds "A host creation offers no cancel; its replay is coarsened to fit the comfort level (V06 §6.8; V09 §4.21.9)."
* END of R3-04 (adjudicator): V06 §3.23's lead (l. 3348) reads "… each element shown damaged while the building's decay level is above 0 and at least its keyed threshold (§6.3 *Plan damage*'s comparison) …".
* END of VPC-R2-03 (V08): T-V6-75's "a fire calamity under a `disaster` condition over its quarter" reads "a fire calamity over its quarter with its linked `reconstruction` condition (V08 §3.16 (7) (b), (d))". *(R3-09 (e))*

### V07

Rulings: R3-01, R3-02, R3-03, R3-19, R3-22.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAL-R2-05 | major | **minor** — V07 builds no persistence of the key; its words only misstate §2.9's | DISAGREE | MERGED into VV78-r2-04 |  |
| VAL-R2-09 | major | **minor** — the readers V07 names (DR42, W80) read the dossier's week; only the trace's words and a test's wording name the retired source | DISAGREE | MERGED into VV78-r2-03 |  |
| VAT2-r2-07 | major | major | DISAGREE | FIX, amended per R3-19 | the dossier and standalone falls told apart in V07 l. 2542–2543 and T-V7-16 as R3-19 words them |
| VDC2-15 | minor | minor | CONFLICT | MERGED into VV78-r2-02 | its "taken only when the blueprint or the user sets it" names a setting that does not exist and is not written |
| VM-R2T-11 | minor | minor | CONFLICT | MERGED into VV78-r2-04 |  |
| VV78-r2-01 | minor | minor | CONFLICT | FIX per R3-22 (b) |  |
| VV78-r2-02 | minor | minor | WIRING | FIX per R3-22 (c) | closes VDC2-15 |
| VV78-r2-03 | minor | minor | CONFLICT | FIX per R3-22 (d) | closes VAL-R2-09 |
| VV78-r2-04 | minor | minor | CONFLICT | FIX | closes VAL-R2-05 and VM-R2T-11 |

**END lines under this heading:** none.

### V08

Rulings: R3-01, R3-02, R3-03, R3-09, R3-12, R3-13, R3-20, R3-21, R3-26.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| G125-V08 | major | major | F-MISSING | FIX, amended per R3-20 | clause (1) in VCS-r2-02's words; clause (2) with R3-20 (2)'s `id` and version-stamp fallbacks (never a refusal); a J-V8 row; closes VCS-r2-02 |
| VAH-r2-02 | major | major | HANDOFF-OPEN | FIX per R3-12 | the rule without a promotion link; a J-V8 row |
| VAH-r2-03 | minor | minor | DISAGREE | FIX |  |
| VAH-r2-09 | minor | minor | DISAGREE | FIX |  |
| VAH-r2-10 | minor | minor | DISAGREE | FIX |  |
| VAP-r2-05 | major | **minor** — bookkeeping: the test already runs the clause; only a list or head lacks the id, R3-03 (a) | HANDOFF-OPEN | FIX per R3-26 |  |
| VCS-r2-02 | major | major | CONFLICT | MERGED into G125-V08 | the confirmation it asked for is R3-20 (1) |
| VPC-R2-03 | major | major | WIRING | FIX per R3-09 (a) | with the one-look-per-calamity clause; a J-V8 row; closes VV78-r2-09 |
| VV78-r2-09 | major | major | WIRING | MERGED into VPC-R2-03 |  |
| VV78-r2-11 | minor | minor | NEW-PROBLEM | FIX per R3-02 |  |
| VV1112-r2-10 | minor | minor | WIRING | FIX per R3-26 |  |
| VV1112-r2-11 | major | major | WIRING | FIX per R3-09 (e) | the fire, flood and earthquake fixtures each a calamity with its linked `reconstruction` condition |

**END lines under this heading** (other units' fixes this seat writes):

* END of VAT-r2-04 (rendering): V08's `setView` comment (l. 489) reads "view.set: a view command over the keys that travel — a week (`{ week }`) and a selection (`{ select }`) (§11.3; item 125 (c)); the layers shown go as a logged `setLayer` by `doc.apply` (§8.4); never an input, and the map never needs one"; §3.16 (4) (l. 2413) and (6) (g) (l. 2484) read R3-21's sentence ("a host sets the frame's view only by §11.3's commands — `view.set { week }`, `view.set { select }` and the layers shown by a logged `setLayer` sent by `doc.apply`; the per-viewer keys, `find`, `crises` and `depthBand` among them, never cross the bridge (§11.3; J-V8.127)"). *(R3-21)*
* END of VAH-r2-01 (determinism): V08 §3.16 (7) (e) reads as a citation: "DR44 admits a condition at the viewer's effective key at the tier DR44 states — `public` where its map row gives a look, `secret` where it is `none`, a key form listing the overlay's address admitting it whatever its tier (J-V8.128)". *(R3-13)*
* END of VV56-r2-04 (V06): V08 §6's absorb-with-epochs row cites V06 §6.8 (1) and (6) — the events' absorb term in the catch-up's estimate, the one-epoch fold and its F-BUDGET-TIME report where even that passes the catch-up's budget.

### V09

Rulings: R3-01, R3-02, R3-03, R3-04, R3-06, R3-08, R3-13, R3-16, R3-21, R3-23, R3-24, R3-26.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAF-R2T-05 | major | **minor** — a wiring table's gloss; both readers already read V08 §3.16 (3) | DISAGREE | FIX |  |
| VAF-R2T-07 | minor | minor | BROKEN-REFERENCE | FIX |  |
| VAH-r2-04 | minor | **major** — two units state two outcomes for one case (t = 0 at level 0), R3-03 (b) | DISAGREE | MERGED into VAT-r2-02 |  |
| VAH-r2-08 | major | major | DISAGREE | FIX |  |
| VAP-r2-06 | major | **minor** — bookkeeping: the test already runs the clause; only a list or head lacks the id, R3-03 (a) | HANDOFF-OPEN | FIX per R3-26 |  |
| VAP-r2-07 | major | major | HANDOFF-OPEN | FIX | MAJOR kept: V12's T-V12-54, -57 and -59 have no harness without it |
| VAT-r2-02 | major | major | DISAGREE | FIX per R3-04 | closes VAH-r2-04 |
| VAT-r2-06 | minor | minor | NARRATION | FIX per R3-02 | R3-02's table gives each home |
| VDC2-05 | minor | **major** — the volumes state two outcomes for one press | CONFLICT | MERGED into VV910-r2-01 |  |
| VDC2-17 | minor | minor | WIRING | FIX | VDC2-16's keys: `bend.under.basement`, `refuse.under.basement`, `refuse.under.route` |
| VEL2-r2-03 | major | major | EDGE-UNDEFINED | FIX | "(§11.2; R2-42)" written "(§11.2)"; V06's end is an END line under V06 |
| VM-R2T-09 | minor | minor | NEW-PROBLEM | FIX per R3-02 |  |
| VV34-r2-13 | major | major | CONFLICT | FIX per R3-16 (c) | with VV910-r2-05's §4.21.13 (3) and T-V9-86 texts (one fix) |
| VV34-r2-14 | minor | **major** — T-V9-15's literal check cannot pass | CONFLICT | FIX |  |
| VV78-r2-08 | minor | **major** — the village card shows the row twice by one unit, once by the other | COHESION | FIX per R3-16 (e) |  |
| VV910-r2-01 | major | major | CONFLICT | FIX, amended per R3-23 (b) | the key `settings.weather.noneNow`, "No weather comes here at this time of year or day."; closes VDC2-05 |
| VV910-r2-02 | major | major | CONFLICT | FIX per R3-21 (b) |  |
| VV910-r2-04 | minor | **major** — Show had no stated frame for a `disaster` look, which has no camps | WIRING | FIX, amended per R3-16 (b) | the units read from `LooksAnswer.crises[].districts`, never by calling V01 on the main thread |
| VV910-r2-05 | minor | **major** — two units list different damage for one building | CONFLICT | MERGED into VV34-r2-13 |  |
| VV910-r2-08 | minor | **major** — the entry's input (a `WhyAnswer`) does not exist for a look | WIRING | FIX per R3-16 (d) |  |
| VV910-r2-09 | major | major | EDGE-UNDEFINED | FIX per R3-24 | it passes the view's drawn week to §11.2's `gazetteer` query |
| VV1112-r2-14 | minor | minor | CONFLICT | FIX |  |

**END lines under this heading** (other units' fixes this seat writes):

* END of VCS-r2-03 (scope): V09 §4.12's coarse-pointer default reads "`AppPrefs.touch.editFabric` defaults to false for coarse pointers … switchable back on and never removed (item 126 (e))"; T-V9-22's T126-1 clause reads "… completes its canvas script with touch events, with `AppPrefs.touch.editFabric` on (T126-1)".
* END of VAT-r2-04 (rendering): V09 §4.2's "(§7.8's layer controls, view state only)" reads "(§7.8's layer controls: `LayerSpec.visible`, written by `setLayer`, §8.4)"; V09 §3.16 row 21's "(view state only)" reads "(by `setLayer`, §8.4)". *(R3-21 (a))*
* END of VAT-r2-05 (rendering): V09 §4.21.8 (1), §4.21.12 (3)–(7) and §2.12's crisis-card row read the standing looks and festivals from §11.2's `looks` reader (`LooksAnswer`) in place of "the legend's crisis entries"; §4.21.12 (3)'s "one evaluation" is that reader's. *(R3-16 (a))*
* END of VAH-r2-07 (V10): T-V9-85's "under a player view a withheld condition is never drawn, listed, named or counted" reads "under a player view a none-row condition carried beside the three looks (an infiltrated stressor) is named in no line, card or count at public, and only at secret (DR44)". *(R3-13)*
* END of VRC2T-01 (rendering): V09 §4.21.10's chip cue draws chip k's glyph from §8.2's nine glyphs by (k − 1) mod 9.
* END of R3-06 and R3-08 (c) (adjudicator): V09 §4.9's head entry reads `head.restored` "In use again{, years}" in place of `head.reused`; V09 §4.21.13 (1)'s head sentence reads "(`abandoned`, `decayed`, `ruined`, or `restored` for one restored with patches), its `{, years}` clause the whole years of its decay run at the drawn week (V06 §3.23 (1), (4)), dropped before V06's level lands (the existence state alone)".

### V10

Rulings: R3-01, R3-02, R3-03, R3-04, R3-06, R3-08, R3-13, R3-16, R3-24, R3-26.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAH-r2-05 | minor | **major** — two units state two outcomes for one case (t = 0 at level 0), R3-03 (b) | DISAGREE | MERGED into VAT-r2-03 |  |
| VAH-r2-06 | minor | minor | DISAGREE | FIX | its first form (the shapes as stored) |
| VAH-r2-07 | major | major | DISAGREE | FIX per R3-13 |  |
| VAP-r2-10 | major | **minor** — bookkeeping: the test already runs the clause; only a list or head lacks the id, R3-03 (a); the suite's failing half is VAP-r2-08 (c), at V12 | HANDOFF-OPEN | FIX per R3-26 |  |
| VAT-r2-01 | major | major | DISAGREE | FIX |  |
| VAT-r2-03 | minor | **major** — two units state two outcomes for one case (t = 0 at level 0), R3-03 (b) | AMBIGUOUS | FIX per R3-04 | closes VAH-r2-05 |
| VM-R2T-07 | minor | minor | BROKEN-REFERENCE | FIX |  |
| VV910-r2-03 | minor | minor | CONFLICT | FIX |  |
| VV910-r2-06 | minor | minor | ID | FIX |  |

**END lines under this heading** (other units' fixes this seat writes):

* END of VAT-r2-05 (rendering): V10 §2.13's `LookAnswer.festivals` and `.crises` are projections of §11.2's `LooksAnswer` (`.crises.looks[].districts` from `LooksAnswer.crises[].districts`); §3.5's `look` read and §1.2's §9.5 row read §11.2's `looks` reader (a §11.2 row). *(R3-16 (a))*
* END of VRC2T-18 (rendering): V10 §2.13's `FindAnswer` cites §2.1's `Layer` for its two inline layer unions.
* END of VV910-r2-09 (V09): V10 §3.9b (7)'s `read_map find` passes the view's drawn week to §11.2's `gazetteer` query, so the clerk counts what the panel shows at a frame that is not the head. *(R3-24)*
* END of R3-06 and R3-08 (c) (adjudicator): V10 §3.9a's head row (l. 1814) reads "the building's existence state, `restored` for a standing building with a repaired element, and the whole years of its decay run at the drawn week (V06 §3.23 (1), (4)); the years dropped before V06's level lands".

### V11

Rulings: R3-01, R3-02, R3-03, R3-06, R3-09, R3-23, R3-26.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAP-r2-09 | major | **minor** — bookkeeping: the test already runs the clause; only a list or head lacks the id, R3-03 (a) | HANDOFF-OPEN | FIX per R3-26 |  |
| VAP-r2-11 | major | major | DISAGREE | FIX |  |
| VEL2-r2-02 | major | major | EDGE-UNDEFINED | FIX |  |
| VPC-R1-01 | minor | minor | BROKEN-REFERENCE | FIX |  |
| VPC-R2-06 | major | major | EDGE-UNDEFINED | FIX | §3.24.1's restating bullet (l. 3855) and the editor's clamp take the inequality T-V11-32's §7 row already holds |
| VPC-R2-13 | minor | minor | COHESION | FIX |  |
| VV78-r2-10 | minor | **major** — T122-4 passes with a crisis event word unmapped | CONFLICT | FIX | §13.2's T122-4 end is an END line under scope |
| VV1112-r2-01 | major | major | EDGE-UNDEFINED | FIX per R3-23 (a) |  |
| VV1112-r2-02 | minor | **major** — a census carrying `occupation` fails the build at T-V11-46 (a) | CONFLICT | FIX |  |
| VV1112-r2-03 | minor | minor | CONFLICT | FIX |  |

**END lines under this heading** (other units' fixes this seat writes):

* END of VAT2-r2-05 and VAT2-r2-06 (V06): V11 §3.25.10's `settings` row (`defaultAgeYears`) reads "the years a building generated abandoned, decayed or ruined reads at the week it is first met so, aging from then as any run (V06 §3.23 (4)); a building item 113's replay abandons or ruins ages from that replay epoch's week". *(R3-06)*
* END of VPC-R2-03 (V08): V11 §3.25.9's `event` row reads "`calamity` (a condition linked to a carried calamity whose own row is `none`, V08 §3.16 (7) (b)) → `disaster`", and *The readings*' "Every calamity draws `disaster`, …" reads "A calamity draws `disaster` through the condition linked to it (V08 §3.16 (7) (b), (d)), its districts the calamity's `targets` first, else its pattern by its type (V01's `disasterDistricts`, §10.2 (d)); a calamity linked to no condition draws no look, its aftermath DR28's". *(R3-09 (a))*

### V12

Rulings: R3-01, R3-02, R3-03, R3-09, R3-13, R3-14, R3-26.

| id | sev | grade | kind | disposition | note |
|---|---|---|---|---|---|
| VAP-r2-08 | major | major | DISAGREE | FIX per R3-26 | MAJOR kept for (c): a suite registered whole that the pin's byte-identity fails |
| VAP-r2-12 | major | major | DISAGREE | FIX | its withheld-condition case is a planted fault (a look-bearing condition is never withheld at a real key, R3-13) |
| VRC2T-04 | minor | **major** — T122-6's measure fails every lawful barricade | CONFLICT | FIX per R3-14 (3) |  |
| VV34-r2-15 | minor | minor | WIRING | FIX per R3-26 |  |
| VV1112-r2-04 | minor | **major** — the register lint (T-V12-20) meets the weather block's cells with no line | CONFLICT | FIX |  |
| VV1112-r2-05 | major | major | EDGE-UNTESTED | FIX |  |
| VV1112-r2-06 | major | major | EDGE-UNTESTED | FIX |  |
| VV1112-r2-07 | minor | minor | COHESION | FIX |  |
| VV1112-r2-08 | minor | minor | WIRING | FIX per R3-26 |  |
| VV1112-r2-12 | minor | minor | COHESION | FIX |  |
| VV1112-r2-13 | minor | minor | TERM | FIX |  |

**END lines under this heading** (other units' fixes this seat writes):

* END of VPC-R2-03 (V08): V12 §3.15.12's crisis fixtures and X-V12-5 name each disaster fixture (a fire, a flood, an earthquake) as a calamity with its linked `reconstruction` condition (V08 §7.1). *(R3-09 (e))*

## Part I — canon changes (appended to canon.md as one dated ruling)

The dated ruling "2026-10-01 (adjudication round 3)" at the end of `docs/validation/coherence/canon.md` records, by
pointer to the rulings above: the narration rule (R3-02); the grading rule (R3-03); item 123's one comparison (R3-04,
superseding R2-38 (4)'s wording), the roofless case (R3-05), the decay run (R3-06) and the plan under decay (R3-07),
superseding R2-38 (1) and (3) where named; the `reused` reading, the per-element peak and the head word (R3-08, J122);
the disaster look's source and calamity (R3-09, J122) and its per-building end (R3-10, superseding R2-37 (6));
`regional_migration_pressure` (R3-11); one look for a stressor and a condition of one kind (R3-12, J122); DR44 as the home
of a condition's tier (R3-13); the camp places (R3-14, amending R2-37 (5)'s gloss); the looks before their services land
(R3-15); the `looks` reader (R3-16); the calamity week in the cadence (R3-17); the creation week (R3-18); locks under a
fall (R3-19); `line` checked, never chosen, and a fallback for every field (R3-20, amending R2-40 (2)); the host's
commands (R3-21, amending R2-33 (b)–(c)); item 125's retirements (R3-22); the weather timeline (R3-23); Find at a drawn
week (R3-24); raised ways (R3-25); the pin and take-over unions (R3-26); R2-32 (2)'s C3 → C4 and R2-30's view-only stop-0
clause. Nothing is ruled INVALID this round.
