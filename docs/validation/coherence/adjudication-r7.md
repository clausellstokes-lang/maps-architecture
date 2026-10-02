# Coherence adjudication — round 7 (FAMILY-ONLY: raised way × wall, J144)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/adjudicate-r7; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/adjudicate-r7`, 2026-10-02; a fresh run under J144 — the two earlier runs' CHECKPOINT lines are void and their skeletons, `adjudication-r7-withdrawn-J142.md` and `adjudication-r7-stopped-full-scope.md`, were not resumed; `narrowing-r7.md` read as not binding)
- [x] P1 inputs: adjudication-r6 (R6-02 whole, Part P), round-6 repair files (0 ruling requests in 17 files; family hand-offs: V04 locked arch vault, V06↔scope take-over row and V06 §7's lead, determinism→pipeline S3 (10), determinism→V09 `bend.raised.underSpan`, model→pipeline/V11 row-a citations), the 53 family findings read whole
- [x] P2 live text at every site the family cites (§2.7's support step and both tables, §7.1's lock and bend rows, §7.2, §7.3 (b) 3 and item 4, §7.4's raised-way row, §4.2 S3 (5)–(10), §4.3, §4.4 S5a, §4.8, §4.11, §4.13, §5.4, T110-2; V04 §3.5.4 (d), UC18; V05 §3.16; V06 §3.7, §3.19, §3.19.2, §7, §8; V07 §3.5a, T-V7-48; V09 §4.9); the orchestrator's guardrails G1–G3 (2026-10-02, PROGRESS J144 row) taken into the lock sentence
- [x] P3 the family ruling R7-02: the lock sentence (J144 with G1–G3), the four outcomes amended, the bent-group and fixed-place sentences, the columns, the paths-and-tests note, the crossing table (13 rows × 13 columns) and the way-and-channel table written whole, (M1)–(M2), the attack (15), the equivalence, the veto list (1–17), the Ends
- [x] P4 rulings R7-03 – R7-07 (generation order, epochs and decay, readers, tests and the state sweep, bookkeeping)
- [x] P5 Part H: 53 issues — 50 FIX (21 as written, 27 per a ruling, 2 amended), 3 MERGED, 0 INVALID; no regrade; END lines under scope, pipeline, determinism, V04, V06, V07, V09, V11
- [x] P6 held list (28), table of contents, canon dated ruling "2026-10-02 (adjudication round 7, family-only)" appended, result saved, LANDED

## How to read this file

**Who reads what.** This is a FAMILY-ONLY round (the owner, J144: "Why don't you just focus entirely on solving this
problem first before moving on?"). Each repair seat of round 7 reads (1) its row of the table of contents, (2) R7-01 and
R7-02 whole, and every other ruling its row lists, and (3) its unit's heading in Part H: the disposition of each issue it
owns, then its **END lines** — the exact text this unit writes for a fix another unit owns. A seat's whole work is under
its own heading; a unit that owns no issue but holds END lines runs (R7-01 (4)). R3-01 – R3-03, R4-01, R5-01 and R6-01
stand: every FIX and END line under a heading is applied in the same round; an END line is written as given; no review
id in design text; J141's grades.

**Dispositions** (Part H, one row per issue of `docs/validation/coherence/work/round7-work/<unit>.json`):

| word | meaning |
|---|---|
| **FIX** | apply the issue's `required_change` as written |
| **FIX per R7-nn** | apply it, but where R7-nn's text differs from the `required_change`, R7-nn governs |
| **FIX, amended** | apply it with the amendment the note states (the note's text governs) |
| **MERGED into X** | the same defect at the same unit as issue X: X's fix (as ruled) closes it; nothing further at this id |
| **INVALID** | closed for good, with its reason; never raised again |

Where one defect spans several units, each unit's text is its own FIX or an END line under it ("one fix with" the primary
id); MERGED is used only inside one unit. In a table cell, `\|` stands for the `|` the design text carries.

**Grades** (J141's SEVERITY STANDARD). The `sev` column is the reporter's; the `grade` column is this adjudicator's, with a
one-line reason where it differs. A regrade never changes the disposition.

**Precedence used** (principle (3)): the owner's words (J144 above all for this family; file g items 101, 110, 114) >
an f item or a J-VI decision > the base's canonical home > a volume's restatement. A reading of the owner's words made by
the program (J122) says so and is **vetoable**; the family's veto list is restated in R7-02. adjudication-r2.md – r6.md
stay binding except where an entry below supersedes one of their rulings, cells or END lines by name.

**No ruling id in design text** (R3-02, kept). Every text below that a seat writes into the design names a design home,
never an `R7-nn`, `R6-nn`, `PRB6-nn` or verifier id. J-rows (J122, J144) are design citations and may be written. The new
design names this round introduces — each defined once at §2.7 and cited everywhere else — are: **the lock sentence**
(§2.7's crossing table, with its guards (G1) *local*, (G2) *shown* and (G3) *no lawful local shape*); **the similar
structures**; **the bent-group sentence** (with *the bent group* and *a lawful crossing*); **the fixed-place sentence**
(with *fixed places* and *the fixed-place zone*); the edit fate **reshaped** (§7.3 item 4); the report entry kind
`reshaped` (§5.4); the refusal key `refuse.raised.meeting` (§7.1, V09 §4.9); the epoch count
`raised.extendedPastBound` (V06 §2.10); and **the state sweep** (§13.2's T110-2). A citation writes "(§2.7's crossing
table, the lock sentence)", "(§2.7's crossing table, the bent-group sentence)", "(§2.7's crossing table, row W8)", never a
restatement.

## Summary

* **Ruling requests:** none filed in round 6's seventeen repair files (kernel ran no repair). The family's open
  hand-offs are each given an owner, an END line or the reason none is needed (Part A).
* **The family is ruled once, as one construction (R7-02), under the owner's lock rule (J144, binding).** Three
  sentences are stated once at §2.7 and every cell cites them: **the lock sentence** — a lock, pin or declaration holds a
  similar structure's placement, never its shape where it meets another; the reshape is local (G1), shown (G2: the fate
  *reshaped* by hand, a `reshaped` report entry otherwise, undone by the event's undo), and where no local shape exists
  the op that would create the meeting gives way (G3: `refuse.raised.meeting` by hand, not built or waiting otherwise);
  buildings stay held, and a wall gives way to a held building seated in an arch vault. **The bent-group sentence** — a
  stretch laid by neither the pull nor a cost field keeps only lawful crossings inside an under-deck strip; every other
  part (an unlawful crossing, a run along beneath, a part entering and leaving on one side, an end at a support) is moved
  to the strip's edge by one rule, a gate the user places or slides moving along the trace. **The fixed-place
  sentence** — a river's water gate, an anchor's tower and a weld vertex never move along the trace: whichever of the
  wall and the raised way comes later keeps them out of the strip widened by the wall strips. Both tables are written
  complete over the four axes the round asks — every wall event (13 rows, a retaining wall's sentence), every raised-way
  state (13 columns), every path (generation, regeneration, epoch, village, hand) and the lock axis (one case, column
  C8) — each cell an outcome and a test that holds it, the volume and base tests running each row over **the state
  sweep** (§13.2) so that no cell names a test that never sets up its state.
* **The other groups are ruled once (R7-03 – R7-07):** generation order (S3's gate routes re-solved off a priced deck
  across the stage-1 boundary; S5a's pull keeps a deck crossing under its deck; T110-2 (6)'s New random by the pull);
  epochs and decay (a landfall only steps a part down its ladder; an absorbed ring's vault laid again when its last run
  there is dismantled; a frame growth's extension past a bound bent, else kept and reported; `wallToWay`'s re-route reads
  the state after the op; a cleared span crossed by the base's rule at a village); readers (GeoJSON and the clerk read a
  `vault` span under a wall `open`; the span rule's home at V01; V11's row 80 readers); tests (one wording for the
  arch-vault bars; the state sweep; castle paths; the scheduling cells); bookkeeping (`W_RAISED_CROSSING` by stage;
  §4.13's rung; the stopped moat's strip; the slide bound; row (a)'s test; `EpochScope.raised` at the caller).
* **Dispositions of the 53 family issues:** see Part H's totals. **Held for round 8:** 28 ids, listed, not ruled.
* **Canon:** one dated ruling appended to `canon.md` (Part I).

## Table of contents by unit

Each row: the issues the unit owns, the texts it writes (its own FIXes' and the END lines under its heading), and the
rulings it reads whole (every seat reads R7-01 and R7-02, and R3-01 – R3-03, R4-01, R5-01 and R6-01, which stand); then its
heading in Part H.

| unit | issues | texts under its heading | rulings binding it (with R7-01, R7-02) | its heading |
|---|---|---|---|---|
| scope (base §0–§1, §13–§17, the index, INDEX.md) | 8 | E-S0 – E-S10 | R7-03, R7-04, R7-06 | Part H · scope |
| model (base §2) | 12 (2 merged) | R7-02's Blocks 1–2, (M1)–(M2); (7)'s and (3)'s sentences | R7-04, R7-07 | Part H · model |
| kernel (base §3) | 0 | — | — (does not run) | Part H · kernel, V02, V03, V08, V12 |
| pipeline (base §4, §10, PART II, PART III) | 8 (1 merged) | its FIXes; E-P1 – E-P8 | R7-03, R7-04, R7-07 | Part H · pipeline |
| determinism (base §5–§7) | 2 | E-D1 – E-D10 | R7-07 | Part H · determinism |
| rendering (base §8, §9, §11, §12) | 1 | its FIX | R7-05 | Part H · rendering |
| V01 | 1 | its FIX | R7-05 | Part H · V01 |
| V02 | 0 | — | — (does not run) | Part H · kernel, V02, V03, V08, V12 |
| V03 | 0 | — | — (does not run) | Part H · kernel, V02, V03, V08, V12 |
| V04 | 4 | E-V4-1 – E-V4-7 | R7-04, R7-06 | Part H · V04 |
| V05 | 1 | its FIX | R7-04 | Part H · V05 |
| V06 | 9 | E-V6-1 – E-V6-13, its FIXes | R7-04, R7-06, R7-07 | Part H · V06 |
| V07 | 4 | E-V7-1 – E-V7-3, its FIXes | R7-04, R7-06 | Part H · V07 |
| V08 | 0 | — | — (does not run) | Part H · kernel, V02, V03, V08, V12 |
| V09 | 1 | E-V9-1 – E-V9-6 | R7-05 | Part H · V09 |
| V10 | 1 | its FIX | R7-05 | Part H · V10 |
| V11 | 1 | its FIX (amended) and one END | R7-05 | Part H · V11 |
| V12 | 0 | — | — (does not run) | Part H · kernel, V02, V03, V08, V12 |

Parts: A ruling requests and hand-offs · B the round (R7-01) · F THE FAMILY RULING (R7-02: the lock, bent-group and
fixed-place sentences, both tables complete, the attack, the equivalence, the veto list) · C the other rulings (R7-03
generation order, R7-04 epochs and decay, R7-05 readers, R7-06 tests and the state sweep, R7-07 bookkeeping) · H
per-unit dispositions and END lines · Held for round 8 · I canon.

## Part A — the ruling requests and the family's open hand-offs

**Ruling requests.** Round 6's seventeen repair files (`docs/validation/coherence/repair-r6-*.md`: V01 – V12,
determinism, model, pipeline, rendering, scope; kernel ran no repair) carry **no** `RULING REQUEST` block: each header
says "Ruling requests: 0". Nothing to rule here.

**The open hand-offs.** Every `HAND-OFFS` section of the seventeen files was read. The family's are ruled below; the two
outside the family are noted and left to round 8 with the held findings.

| from | hand-off | owner · where it closes |
|---|---|---|
| repair-r6-V04 | a locked arch vault in a `vault` span a wall comes to stand over (UC18 × *beneath*) | model and V04 — R7-02, the lock sentence (VAL-R6-01 = VEW-r6-02): the vault's span held, its chamber not laid while a wall stands over it, its lock kept |
| repair-r6-V06 | scope's take-over row (T110-2's epoch clauses (1), (2), (4), (5), (7) and (8)) | landed: the base's take-over row (l. 18874) names them; no END needed |
| repair-r6-scope | V06 §7's lead naming the same clauses | landed: V06 §7's lead (l. 4039) names them; no END needed |
| repair-r6-determinism | V09 §4.9's `bend.raised.underSpan` source cell taking the gate case | landed at V09 (repair-r6-V09); its line words are VAT-r6-04 (FIX, Part H · V09) |
| repair-r6-determinism | §4.2 S3 (10)'s stopped moat at a regeneration counted, and §5.4's stage list | pipeline and determinism — VDC6-02 = VPC-r6-05 (R7-07) |
| repair-r6-model | §4.3 *Lattice and costs* and V11 §3.24.2 citing "§2.7's support step (6) (a)" | landed: no such citation remains in the set (searched); no END needed |
| repair-r6-V06 | "a verifier checks that V04's (V4-1), (V4-2), (V4-6) and the model's homes landed as cited" | no END needed: the round-6 verifiers checked them; R7-02 rewrites the homes they cite by name |
| repair-r6-pipeline | the rationale's J-A67.45 (the late calamity's current week) | outside the family; scope's restated J-A67.45 row (repair-r6-scope's note for Assemble) carries it; held with round 8 |
| repair-r6-V02 | T-V3-40 (b)'s hand-over clause timing | outside the family (the held VAT6-r6-04's class); held for round 8 |

## Part B — the round

### R7-01 The family round: scope, supersession by name, both ends, the blind spots, grading

**Governs:** every issue of round 7.

**Decision.** (1) **Scope** (J144). This round rules the 53 round-6 findings of the raised-way × wall family
(`work/round7-work/`, 28 major, 25 minor) and nothing else; the other 28 are held for round 8 (listed at the end, no
ruling). The loop is: this adjudication, a probe until dry (up to three passes, each decided into a Part P of this file),
the family's repair, then family-focused verify — repeated until a focused verify finds no major in the family.
(2) **Both ends and the five blind spots.** Each seat applies every FIX and END line under its heading in the same round
as the owning seat's share, and greps its own unit for every term, field, key, string key and section the rulings change,
in prose, tables, edge rows, tests, fixture lists, milestone cells and index rows alike, conforming every restatement it
finds in the same block and naming each in its report; one it missed goes to its HAND-OFFS. The sweep covers the round's
five blind spots: (a) V07's village restatements; (b) V09's panels and V10's clerk; (c) the tests, fixture lists and
milestone cells; (d) the base's summaries and index rows (§4.1's stage rows, §4.13, §5.3, §5.4, §7.4, §7.7, §13.8, §14);
(e) V11's registry readers and V12's statistics. This adjudicator's sweep of all five is the END lines of Part H.
(3) **Cite, never restate**: a site that restated a rule R7-02 homes is reduced to a citation of the home, with at most
the outcome's or sentence's name. (4) A unit whose heading holds END lines but owns no issue runs: **scope, model,
pipeline, determinism, rendering, V04, V05, V06, V07, V09, V10, V11** each own issues; **V01** owns one; **V02, V03,
V08, V12** and **kernel** neither own an issue nor hold an END line this round and do not run. (5) **Supersession by
name.** This round supersedes, by J144 and R7-02: **R6-02**'s (D5) lock-row parenthesis, its C8 column description and
cells, its bent-group list in *beneath* ("A stretch laid by neither … is bent locally …"), its *No gate and no tower*
clause as it stood, W2's and W13's event cells, W8's C2 cell ("once the record is dropped"), the way-and-channel table's
row (c) outcome and row (e)'s report clause, and (7)'s extension sentence where R7-04 adds to it; **V04 §3.11's UC18**
for a wall coming to stand over an arch vault's span (UC18 stands for every generator and every other op); **V06 §3.19
(5)**'s impassable list as it applies to a locked, pinned or declared wall or ground way; and **every clause of the set
that makes a lock or pin refuse, skip or alter a meeting between a wall and a raised way** (the "locked, pinned or
neither" clauses keep their words where they say the outcome is the same; R7-02's lock sentence is their home). Every
other text of R6-02 and its Part P stands as amended below. (6) No seat re-raises an issue ruled INVALID or MERGED in
adjudication-r2 – r6 or here.

**Grading (J141).** As R6-01 grades: an untested edge whose outcome the text defines but no bar runs, so that a wrong build
passes every bar, is MAJOR; a test, fixture list or cell that omits or misnames a case whose outcome is the same by
construction is MINOR; two units stating two outcomes for one case is MAJOR however rare. Every reported grade of the 53
stands under this standard; no regrade (the reasons are in Part H's notes where a grade could be doubted).

## Part F — THE FAMILY RULING

### R7-02 Raised ways and walls, closed by construction: the lock, the bent group, the fixed places and both tables complete

**Governs (the family's cross-cutting findings; every other family finding is a cell or a sentence below, ruled in
R7-03 – R7-07):** the lock — VDC6-01, VEW-r6-04, VAL-R6-01 = VEW-r6-02, VAP-r6-01; the bent group — VEL6-r6-04, VAT-r6-02
= VV910-r6-01, VPC-r6-03, VCS-r6-01, VAT-r6-04; the fixed places — VM-R6T-01, VEW-r6-03; and the tables' cells —
VM-R6T-03, VAF-R6T-02, VAP-r6-02, VEL6-r6-02, VM-R6T-02, VV56-r6-03, VAL-R6-06, VV78-r6-01. **Home:** §2.7's support step
(6) (a)–(b) and (d) (model). **Supersedes** what R7-01 (5) names; R6-02 and its Part P stand otherwise, as amended here.

**Why this form.** Round 6 ruled one form whichever is laid first (R6-02), and the findings that remain are its edges: a
lock or pin that each unit read as refusing a different meeting (VDC6-01 at a hand aqueduct, VEW-r6-04 at an epoch's
founding, VAL-R6-01 = VEW-r6-02 at an arch vault, VAP-r6-01 at the hand rows); stretches the bent group never shaped
(along beneath, one side, ending at a pier, a carve's re-trace, a slid gate); places the wall's law fixes that the gate and
tower clause would have moved off (a water gate, an anchor, a weld); and cells naming tests that never set up their
state. The owner ruled the lock (J144); the round notes ask for two more sentences. So each family question now has one
home sentence or one cell, and the tables are written over all four axes.

**Owner rules checked.**
* **J144** (binding; the owner's words): "Locked regarding walls and aqueduct and similar structure should be considered
  for placement, not permanent shape. So when they do intersect, absolutely change the shape to be cohesive and coherent,
  despite being locked." The program's reading (J122, vetoable; PROGRESS's J144 row): the similar structures are the
  enceintes with their stretches, gates and towers, palisades, quay walls, retaining walls, and the raised ways with
  their supports, ramps, stairs, feet, spans and arch vaults; placement is where the thing is (a wall's trace and course, a
  raised way's course and deck line); shape is what changes at a meeting; a reshaped locked thing stays locked; item 101
  R13 reads, for these structures, as their placement held; buildings and other declared placements are not similar
  structures and stay held; and the three guardrails (G1) local, (G2) shown, (G3) the op creating the meeting gives way
  where no local shape exists, neither locked thing moved or broken. All kept, in the lock sentence's own words.
* **Item 110 (b)**: "a raised way crosses the ways beneath WITHOUT a junction"; "the spaces between piers stay open or hold
  the base's vaults"; the aqueduct "crossing the wall through an arch"; "the user may add or remove a raised way"; "a
  removal is an edit that holds through regeneration". Kept: no junction or gate on a deck; a `vault` span under a wall
  holds no vault while the wall stands (the space between piers then open, a wall in it); every aqueduct crosses every
  wall under one of its arches, in either order (the program's reading, J122, kept from R6-02); additions and removals
  untouched.
* **Item 110 (f)'s bars**: zero junctions; parts never share a planar arrangement with part 0; generated raised ways only
  at CITY and METROPOLIS with a reason, within the rung's cap; a removed one stays removed. Kept, each in T110-2 or T110-3.
* **Item 101**: R2 (a declaration bent to the nearest lawful one) — every hand bend below is R2's, and (G3)'s refusal
  offers the nearest lawful declarations; R13 (a declared or pinned thing is held) — as J144 reads it for these
  structures, their placement held, and unchanged for buildings.
* **Item 114** ("walls decay into gaps and patchwork when poor and safe, and recover"): every run decays and recovers by
  its own condition; no deck holds a wall and no wall a deck (rows W4, W5, W10, W12).
* Nothing else of the owner's text speaks to the meeting; the tables, the bent group, the fixed places, the state sweep
  and the vault timing at an absorb are program design under J122 (**vetoable**).

**What changes in behaviour, said plainly — the owner's veto list for the family, restated whole.** R6-02's eight changes
stand as amended by its Part P; R7 adds 9–17. Each may be vetoed by naming it.
1. No crossing station, raised gate or wall opening anywhere; a priced road deck comes down before a standing trace, a road
   deck with fixed ends is not built across one (at an epoch it waits). *Veto option:* R5-02's raised gate.
2. An aqueduct created across a standing wall crosses it on a span, its supports off the band; the run beneath is not
   held and wears, breaches and recovers as every run.
3. A wall laid after a road deck passes beneath it ungated, a support in its band built into its line, never across its
   ramps, stairs or feet. *Veto option:* a gate standing on the deck over the wall's line.
4. The setback, glacis and berm are no obstacle to a support and are not stopped at the under-deck strip.
5. No arch vault stands in a `vault` span under a wall, in either order; its chamber is laid again once no wall lies
   there.
6. A run beneath a span keeps its own height, cut down to the lowest standing soffit there, never raised to it.
7. A frame growth's extension carries the old end span's `state` and hold and keeps the deck's course.
8. A wall laid after an aqueduct crosses it under one of its arches, never at a pier, and no wall crosses a ramp, stair or
   foot. *Veto option:* a later wall laid through an aqueduct's pier.
9. **(new, J144 — the owner's rule; its reading vetoable)** A lock, pin or declaration on a wall, a raised way or an arch
   vault never refuses or skips a meeting between them: an aqueduct drawn or founded across a drawn or locked wall
   crosses it on a span (no `refuse.locked`, no wait), and a locked arch vault under a wall laid after it keeps its span
   and lock but has no chamber while the wall stands. *Veto option:* UC18's locked vault kept with its chamber in the
   band, the epoch's trace keeping off its under-deck strip instead (repair-r6-V04's option (b)).
10. **(new)** A road deck's carried way that comes down before a held wall makes its gate there, the wall reshaped and kept
    locked (G2's fate *reshaped*). *Veto option:* the gate refused on a held wall (§7.1's lock row), the user unlocking
    first.
11. **(new)** The reshape of a held thing is always shown — a new edit fate, *reshaped*, which the user confirms, and a
    `reshaped` entry in the report's changes — and where no local shape exists the op is refused by a new key,
    `refuse.raised.meeting`. *Veto option:* the existing fates and bend lines alone.
12. **(new)** A wall gives way to a held building seated in an arch vault: the trace crosses the deck under another span,
    else waits or takes F-WALL's ladder, and by hand is refused with the building as the blocking entity.
13. **(new)** A hand or re-traced wall stretch is never left running along beneath a raised way, entering and leaving on
    one side, or ending under it: those parts move to the under-deck strip's edge; a gate the user places or slides into
    the strip moves back along the wall, its road following. *Veto option:* such a drawing refused with its nearest lawful
    alternative.
14. **(new)** A river's water gate, an anchor's tower and a castle's weld are never moved along the wall for a raised way:
    a wall laid later crosses the river or anchors on its barrier at the nearest point clear of the strip, and a raised
    way laid later keeps its strip clear of them. *Veto option:* a water gate lawful under a span whose soffit clears its
    gatehouse, capped like the run.
15. **(new)** An absorbed ring's arch vault returns when the last run of the old wall over it is dismantled, not when the
    wall is absorbed. *Veto option:* the vault laid again in `absorbWall`'s own commit, the standing run passing through
    its chamber's footprint.
16. **(new)** A frame growth's extension that meets a river or valley past a structural bound bends to the nearest course
    that fits; with none, it keeps its course, a pier standing in the water or past `maxPierM` kept and reported.
    *Veto option:* a merged span past `maxClearSpanM` kept instead of a pier in the water.
17. **(new)** At generation, a gate route whose first point on the stage-1 boundary lies on a viaduct is re-solved with no
    deck across that boundary, its gate on the ground.

#### The texts §2.7 carries — written by the model in these words

The model replaces its support step's (6) (a)–(b) bullet (the way-and-channel table with its lead) and (6) (d) bullet
(from "(d) *a wall and a raised way* meet by this table" through the last row of the crossing table) with the two blocks
below, and conforms the sentences after them as (M1)–(M6) say.

**Block 1 — (6) (d), the crossing table, whole:**

  * (d) *a wall and a raised way* meet by this table, **the crossing table**, whichever was laid first, on every path —
    generation, a regeneration, an epoch, a village derivation and a hand edit — and with either side held or neither.
    Its lock sentence, its four outcomes, its bent-group sentence and its fixed-place sentence are defined once here and
    every other text cites them:

    **The lock sentence** (the owner's rule, J144: "Locked regarding walls and aqueduct and similar structure should be
    considered for placement, not permanent shape"). The **similar structures** are walls of every kind — an enceinte with
    its stretches, gates and towers, a palisade, a quay wall, a retaining wall — and the raised ways — a viaduct, an
    elevated road, an aqueduct — with their supports, ramps, stairs, feet, spans and arch vaults. A lock, a pin or a
    declaration (§7.2; item 101 R13) holds a similar structure's **placement** — a wall's trace and course, a raised way's
    course and deck line, an arch vault's span — and never its **shape** where two of them meet: each change this table
    makes at a meeting — a gate or tower moved along, a stretch bent locally, a support slid off a band, a `vault` span
    read `open` with no chamber while a wall stands over it and its chamber laid again once none does, a gate made where a
    road deck's carried way crosses a wall — is made whether either side is locked, pinned, declared or neither, and what
    it reshapes stays locked, pinned or declared (a locked arch vault's lock kept with its key, so the chamber V04 lays
    again carries it). No meeting of two similar structures is refused, skipped or altered for a lock: the lock axis is one
    case (column C8). Three guards bound it. **(G1) Local:** the reshape of a held similar structure stays inside the
    raised way's under-deck strip (§4.6: the deck's plan widened each side by `raisedWays.structure.stripMarginM`) and the
    nearest points clear of it that *down before the wall*, the bent-group sentence and the fixed-place sentence move to;
    a held thing's course or trace is never re-routed elsewhere. **(G2) Shown:** each reshape of a held similar structure
    is shown where the user sees it — by hand as the fate **reshaped** in the dry run (§7.3 item 4), naming the held thing
    and its change beside its row's bend line; at generation, at a regeneration and at an epoch as a `reshaped` entry in
    the report's changes (§5.4's `ReportEntry`) — and the event's undo restores it. **(G3) No lawful local shape:** where
    no reshape inside (G1) makes the meeting coherent, the op that would create the meeting gives way, never a held thing:
    by hand its dry run is refused with the nearest lawful declarations (`refuse.raised.meeting`, §7.1; item 101 R2); at
    generation or a regeneration the newer structure is not built (a raised way, reported) or its trace takes F-WALL's
    ladder (§5.2); at an epoch it waits (`raised.waited` for a raised way, `walls.waited` for a trace, V06 §2.10); at a
    village derivation VS3 takes its own ladder (V07 §3.13); neither held thing is moved or broken. Buildings and every
    other declared placement are no similar structure and stay held as §7.2 holds them; a wall gives way to one
    (*beneath*, *A held building in an arch vault*). A **retaining wall** has no band, strip, gate, tower or closure, so
    no row of this table reads it: the deck passes over it as over the ground it levels and a support stands on its line
    built against it, its height read at its station ((4)); generated levelling never reaches an under-deck strip (a hole
    for S10 and S11, §4.6); a retaining wall drawn across a standing raised way (T3 `retaining`, a T2 terrace stroke)
    levels no ground inside its under-deck strip and passes beneath it as any part-0 line, nothing of the raised way
    written; and its own events (`DeclineOp`'s retaining member, `repairRetaining`, a landfall's row) write it alone
    (T110-1).

    **The four outcomes** (each defined here once; every other text cites the outcome's name):

    * ***over the band*** — a raised way created across a standing wall, held or not (an aqueduct; a road deck takes
      *down before the wall*): its supports are kept off the wall's band by (3), and its ramps, stairs and feet by its
      course (§4.3 *Where it may not go*: a course crosses a standing band only on a span), whatever the runs' condition,
      so the band lies beneath a span — an aqueduct's arch (item 110 (b)) — and each span over the band is ruled by the
      span rule as anywhere, a `vault` one read `open` while the wall stands (*beneath*); its under-deck strip keeps clear
      of the trace's gates and towers and of its fixed places (§4.3 *Where it may not go*; V06 §3.19 (5); the fixed-place
      sentence; a hand course bent there, §7.1) — and at generation, where S7 lays the towers after an aqueduct at S6's
      end, a tower its spacing would place in the strip is moved along the trace to the nearest point clear of it, as
      *beneath* moves one, unreported, S6's aqueduct having kept its strip clear of the anchors and weld vertices the
      trace records —; nothing of the wall is written, the run beneath keeping its own condition (a `breached` or
      `dismantled` run a gap beneath the arch); the meeting then reads as *beneath*. A course that cannot keep its supports
      off the band within (3)'s and (4)'s bounds, or its strip clear of the gates, towers and fixed places, is (3)'s and
      (4)'s: a generated one dropped (at an epoch waiting, `raised.waited`), a declared one bent to the nearest course that
      can, else refused (G3).
    * ***down before the wall*** — a road deck (a viaduct's or an elevated road's) never crosses a trace standing when its
      course is laid — at S3 (7) the stage-1 boundary (from S3 (9) on, its trace) and at S5b the stage's picked boundary
      counting as standing; a frame growth's extension, which keeps the deck's course, is no course laid (C12). A deck that
      is a priced option of a route's solve (S4's or S5b's viaduct, an epoch route's) comes down to a ground vertex before
      the trace, its route crossing the trace on ground part 0 through the gate there (§4.3 *Where it may not go*; an S3
      gate route by §4.2 S3 (7)'s re-solve) — a gate made there in a held wall too, its `reshaped` entry (the lock
      sentence) —, one that cannot is re-routed by the solver's ladder or not built, reported; a raised way whose two ends
      are fixed before its course is solved — an elevated road (`P1` to `P2`) at S6's end or founded, V06 §3.19's founded
      viaduct (`A` to `B`) — is not built where its course would cross a standing trace: at generation not built,
      reported; at an epoch waiting (`raised.waited`, V06 §3.19 (5)). By hand the course comes down before the trace (§7.1,
      `bend.raised.wall`), its ground way making its gate there — in a held wall the fate *reshaped* (G2) — and a course
      that cannot come down there is refused (`refuse.raised.meeting`, G3). The meeting does not arise.
    * ***beneath*** — a wall's run and a standing raised way, read from what stands, never stored: the trace keeps its
      course but where a crossing below bends it, and its strips, band, towers and gates are laid as anywhere (S7, S10,
      VS3, V06 §3.7, §7.3's S7 operator). *Where the line crosses*: a trace's line never crosses a raised way's ramp, stair
      or foot, nor an aqueduct's standing support (its `state` absent or `ruined`). It crosses an aqueduct's deck line
      under a span, so an aqueduct crosses every wall through one of its arches (item 110 (b); the program's reading,
      J122), a trace passing round its end crossing nothing of it; a road deck's deck line under a span or at a support;
      and a road deck's carried way on its ground course beyond a foot, through a gate there on ground part 0 clear of the
      ramp, stair, foot and under-deck strip. A trace laid by the `EnceinteStrategy`'s pull or a cost field — S3's and
      S5a's at generation and at a regeneration, an epoch's circuit, contraction or dossier-admitted circuit — treats a
      standing raised way's ramps, stairs and feet and an aqueduct's standing supports as impassable (as V06 §3.7.4 (2)'s
      cost field treats every standing support); S5a's pull keeps each arterial's crossing of the boundary as the stage's
      picked boundary had it, at its pin or under its deck (§4.4 S5a *Trace* (2)); and where S5a pins gates, an arterial
      whose crossing of the boundary falls on a ramp, stair or foot pins its gate on its ground course beyond the foot,
      the trace laid through it (a way S5a pins no gate for meets the trace as anywhere on ground part 0). A stretch laid
      by neither takes the bent-group sentence (below). The band is laid through every support standing in it — a road
      deck's, or the edge of an aqueduct's that its band's half meets — built into the run's line, never cut round it, so
      where one goes the run stands whole across its footprint. *The cap*: beneath a standing part of the deck — a span
      whose `state` is absent, or a support whose `state` is absent bearing a standing span — the run's top and walk are
      the lower of its own top and the lowest soffit there (the span's own, or that of each standing span the support
      bears) (the soffit lower: the arch walled up to its crown; the run lower: the arch open above it); beneath a fallen
      span, a support bearing none or no deck, its own top (§4.5's daylight casters, §8.4's casters and heightfield,
      §11.1's glTF wall and CityJSON wall objects read it). *A `vault` span under the wall* — one whose under-deck strip a
      wall's band or wall strip meets, whichever was laid first, or, once `absorbWall` has merged a ring's band and strips
      into the blocks (V06 §2.8), a run of that absorbed record not yet `dismantled` crosses (row W8) — is read `open` by
      every reader of its `use` while that band, strip or run lies there, whatever the runs' condition: no arch vault in it
      (V04 §3.5.4 (d) (1)), no end walls (§11.1's 3-D and CityJSON rows), `open` in §11.1's GeoJSON `span` and in the
      tellings of V09 §4.20.6 (2) and V10's raised-way read, its under-deck strip no reservation ((6)'s lead) and an `open`
      span to §4.3's crossing rule, the way-and-channel table and V01 §3.17.3 (2)–(3), the band, strips and moat laid
      through it; its record unchanged (the span rule never reads a wall: its step (2), below), so it reads `vault` again,
      V04 laying its chamber again, once none lies there. A locked or pinned arch vault (V04 §3.11's UC18) is read so too,
      by the lock sentence: its span held, its chamber not laid while a wall stands over it, its lock kept with its key so
      the chamber laid again carries it; each removal and re-lay of a held raised way's or a held arch vault's chamber is
      shown by (G2). *A held building in an arch vault* — a `vault` span whose chamber seats a held building (a declared
      placement, V04 §3.5.4 (d)) — holds its span against every wall, the building being no similar structure: a trace
      laid by the pull or a cost field treats that span's under-deck strip, widened each side by the wall strips' widths
      (§4.8: the band's half and the wider of the inner setback and the outer setback with its glacis or berm), as
      impassable; for the bent group it is no lawful crossing; a trace that can then cross the deck nowhere takes its own
      ladder (F-WALL at generation and at a regeneration, `walls.waited` at an epoch), and by hand the stroke is refused by
      §7.1's lock row (`refuse.locked`, the building the blocking entity); so the building, its chamber and its door stand
      and no footprint enters a band or setback (§5.3). *No gate and no tower in the under-deck strip* — one the wall's law
      would place there moves to the nearest point clear of it: a tower along the trace (S7's towers beside a trace an
      aqueduct at S6's end crossed among them, *over the band*); a gate along its way, the trace passing through it there —
      at generation and in an epoch circuit S5a's pin moved and the trace laid through it (§4.4 S5a *Trace* (2)), a trace
      laid through no pin (a contraction, a dossier-admitted circuit by the hand operator's path, a stretch of the bent
      group) bent locally, between its nearest points clear of the strip on either side of the way, to pass through the
      gate (by hand a fate named in `bend.wall.raisedCrossing`'s line); along the trace where the way is laid after the
      gate and follows it (a village track, V07 §3.5a (4)); and a gate the user places or slides there (`placeGate`, a
      gate's grip) along the trace, its stub or way following, the trace unchanged (row W13). A gate or tower whose place
      the wall's own law fixes — a river's water gate, an anchor's tower — never moves along: the trace keeps it out of
      the strip (the fixed-place sentence). No gate on the deck, which passes over the run and is no crossing of the gate
      law (gates counted on ground part 0: §4.8 *Gates*, §5.3's gate row; a raised arterial over a stage's boundary pins
      no gate, §4.4 S5a); the moat a channel by the way-and-channel table (row e); the run's condition its own (item 114: a
      `breached` or `dismantled` run a gap beneath the deck, the deck on its own supports). *Reported* once per crossing of
      a trace laid after a raised way with that raised way's deck line, a trace crossing one deck line twice reported
      twice: at generation and at a regeneration in S7's `W_RAISED_CROSSING` (S3's and S5a's traces alike, §4.8; §5.4), at
      an epoch in `walls.raisedCrossings` (V06 §2.10), by hand in `bend.wall.raisedCrossing`'s line at the dry run; each
      reshape of a held thing besides by (G2).
    * ***unchanged meeting*** — the event writes only its own records, as on any run or gate; nothing of the raised way is
      written or passed over and nothing is bent for it; the meeting re-reads as *beneath*.

    **The bent-group sentence.** The **bent group** is every stretch laid by neither the `EnceinteStrategy`'s pull nor a
    cost field: VS3's palisade, a re-anchored stretch, V06 §3.7.6 (3)'s quay wall, a hand `drawWall` (a village T3 `wall`
    among them), a moved trace vertex, `repairWall`'s new stretch, and a run a carve or a moved river re-traces (§4.11
    *Other crossings*; §7.3 (b) 3). Whatever its shape — crossing the deck, running along beneath it, entering and leaving
    on one side, ending at a support, or carrying a gate into the strip — it meets a standing raised way by one rule:
    **inside the raised way's under-deck strip its line holds lawful crossings only.** A **lawful crossing** is a part of
    the line that enters the strip on one long side and leaves it on the other, meeting the deck line once: under an
    aqueduct's span, its band's half at most meeting a standing support's edge; under a road deck's span or at its
    support (the band laid through the support); never on a ramp, stair or foot widened by the strip margin, and never in a
    `vault` span whose chamber seats a held building. (The strip's long sides are its edges left and right of the deck in
    spine order; a point on an end cap belongs to the nearer long side.) Every other part of the line inside the strip is
    replaced, between the points where the line enters and leaves the strip: (i) an unlawful crossing by the nearest lawful
    one along the deck from the point where it met the deck line (ties: nearer the deck's first foot in spine order) — the
    line from its entry point along that side's edge to it, across the strip there and along the other edge to its exit
    point — and a crossing on a road deck's ramp, stair or foot by one beyond the foot, crossing the carried way's ground
    course on ground part 0 through a gate there (the form *down before the wall* gives a road deck); (ii) a part that
    enters and leaves on one side — running along beneath the deck, turning back, or meeting a support — by that side's
    edge between its entry and exit points; (iii) an end inside the strip — a stretch drawn, a vertex moved or a stretch
    re-anchored to end at a support or under the deck — by the line to the nearest point of the edge on the side it
    entered from (a stretch wholly inside the strip: the side nearer its first vertex, ties the left side in spine order),
    an anchor or weld vertex so moved being the fixed-place sentence's; (iv) a gate inside the strip by *beneath*'s *No
    gate and no tower* — one the user places or slides along the trace, its stub or way following (row W13); one the
    stretch makes for a ground way crossing it inside the strip along that way, the line bent through it by (i)'s path.
    Each move is a fate by hand, named in `bend.wall.raisedCrossing`'s one line, and counted at an epoch
    (`walls.raisedCrossings`); a moved line stays within (G1)'s reach. With no lawful crossing along the deck — which
    cannot occur while every span's clear width between standing rings exceeds the wall's band, as V11 §3.24.2's and
    §4.8's rows give, and which a table edit can make occur — (G3) holds: by hand `refuse.raised.meeting`; at an epoch the
    stretch's op waits (`walls.waited`) or, for a run a moved river re-traces, F-REDERIVE's ladder (§5.2); at a village
    derivation VS3's ladder (V07 §3.13).

    **The fixed-place sentence.** **Fixed places** are what the wall's own law fixes: a river's water gate (the trace's
    crossing of a river, its bank vertices `Gate.banks`, §4.4 *Water and the waterfront*), a stretch's anchor on its
    barrier with the tower item 106 (a) stands there (`Enceinte.anchors`, §4.4 S5a (1), §4.8 *Towers*), and an
    `on_enceinte` castle's weld vertex (`Castle.cityWeld`, §4.2 S3 (8)). The **fixed-place zone** of a raised way is its
    under-deck strip widened each side by the wall strips' widths (§4.8: the band's half and the wider of the inner setback
    and the outer setback with its glacis or berm). No fixed place stands in a fixed-place zone and none moves along the
    trace off its place: whichever of the wall and the raised way is laid later keeps them apart, never a held thing moved
    (G1). **A trace laid after the raised way** moves the place itself to the nearest point clear of the zone — its river
    crossing along the river, its anchor along its barrier's edge (the shore, bank, cliff top, gorge rim or marsh edge, or
    the earlier enceinte), and a castle sited after the raised way its weld vertices along the bailey's outer arc (§4.2
    S3 (8)'s siting filter, F-CASTLE's re-site rung, §5.2) — a trace by the pull or a cost field treating the river's water
    and the barrier's edge inside the zone as no crossing or anchor site, a stretch of the bent group bent locally to the
    moved place (by hand a fate in `bend.wall.raisedCrossing`'s line); with no such point within the trace's reach (its
    search band; `wall.barrierReachM` for an anchor), the trace takes (G3) (F-WALL at generation and at a regeneration,
    `walls.waited` at an epoch, `refuse.raised.meeting` by hand). **A raised way created after the wall** keeps every
    fixed place outside its own fixed-place zone and off its ramps, stairs and feet widened by the strip margin, as it
    keeps its strip clear of the trace's gates and towers (*over the band*; at generation S6's aqueduct reads the anchors
    and weld vertices the trace records before S7 lays their towers), a course that cannot taking (G3).

    **What *beneath* reads from each raised-way state** (the columns): C1 created across the wall, held or not, and C11
    created across a `breached` or `dismantled` run — *over the band* or *down before the wall*; C2 standing, in use or
    `abandoned` (V06 §3.19.2 (2)) — the cap beneath the standing deck; C3 one span over the band fallen (`ruined` or
    `cleared`) — the run at its own top beneath it; C4 every span over the band fallen — its own top throughout; C5 a
    support in or by the band cleared or toppled — a support `cleared` only once both its spans have fallen (V06 §3.19.2
    (3)), a `topple` ruining it and both its spans (V06 §3.19.2 (4)) — the band whole across its footprint (a `ruined`
    support's stump drawn in it, a `cleared` one's not); a trace laid after a support is `cleared` passes through its ring
    as open ground, one laid after it is `ruined` meets the stump as a standing support (no ramp or stair stands in a band,
    *beneath*); C6 a `vault` span over the trace breached with its chamber — no chamber stood under the wall (V04), the span
    `ruined` read as C3; C7 deleted or suppressed — no raised way stands, so no meeting: the row's event acts as on any
    wall, V04's vaults of the way gone with it, a suppressed generated way staying removed (item 110 (f), T110-3); the
    column's cells name no test of this table, the event's own wall tests at its home holding it (§4.8, §4.11, V06 §3.7,
    V07 §3.4); C8 held — the raised way, the wall or both locked, pinned or declared (a drawn wall locked by its drawing,
    §7.2) — as the same cell unheld, by the lock sentence: no refusal, each reshape of the held thing shown (G2); an op
    that targets a held thing itself — a `convert`, `delete`, `repairWall` or `placeGate` on a locked wall, an edit of a
    locked raised way — is §7.1's lock row's, no meeting; C9 carried down to the village product — as C2 (V07 §3.12: the
    standing fabric unchanged); C10 repaired by `repairRaised` — as C2, the repair writing the raised way alone; C12
    extended by a frame growth — the old deck as it stood; the extension keeps the deck's course ((7)), so it is no course
    laid: where it crosses a band its new supports are slid off that band by (3), aqueduct or road deck alike, and the run
    beneath is read by *beneath*; C13 edited by its own op — a hand re-shape of its course (`moveVertex` on a course
    vertex), `spanSpacingCm` (V09's Arch spacing) or `clearanceCm` (Deck height) — the support step re-run where (1)–(5)
    say, against the obstacles standing then: a station in a band laid after slid off it, the band whole across its old
    footprint (*beneath*); a re-shaped aqueduct stretch across a standing band *over the band*; a re-shaped road deck
    stretch across a standing trace bent down before it (`bend.raised.wall`); an edit (3) or (4) cannot place bent to the
    nearest lawful value of what was edited — a spacing or a height to the nearest that places every station, never another
    course; a re-shape to the nearest course (item 101 R2) —; every other wall event meets an edited raised way as it
    stands, as C2.

    **Paths and tests.** Each row names its paths — generation (G), a regeneration (R), an epoch (E), a village derivation
    (V), a hand edit (H) — and each cell holds on each of its row's paths. Each cell names the test that holds it: "·S"
    after a test clause is that clause run over §13.2's **state sweep** at the column's state (each state on its own run,
    made by the sweep's scripted ops before the row's event); "as Wn·Cm" gives that cell's outcome, the cell still naming
    its own test; "—" in C1 and C11 means a raised way created after this event meets the wall as the event left it, by
    W1·C1 or W1·C11. C1 and C11 are the raised way's creation, not the row's event: their records are the raised way's
    creating commit ((6): at generation inside S4's or a stage's S5b route solve or at S6's end, at an epoch V06 §3.19's
    founding, by hand its declaration's commit), nothing of the wall written but *down before the wall*'s gate, nothing
    reported — `W_RAISED_CROSSING` and `walls.raisedCrossings` count only a trace laid after a raised way crossing its deck
    line (*beneath*) and a channel stopped at an under-deck strip (row e) —; by hand its dry run bends the course, one line
    each: an aqueduct's supports off the band and its strip clear of the towers, gates and fixed places
    (`bend.wall.aqueductArch`), a road deck down before the trace (`bend.raised.wall`); a course that cannot is refused by
    hand (`refuse.raised.meeting`), at generation not built, reported, and at an epoch waits (`raised.waited`, V06 §3.19
    (5)). C12's and C13's records are the raised way's own op's ((7); its edit event). The last column gives what the event
    itself writes (its op and records), the gates and §5.3's checks, and a hand edit's bend, fate and report — the same for
    every cell of its row.

    | wall event (paths) | C1 created across it | C2 standing | C3 one span fallen | C4 all spans fallen | C5 support cleared or toppled | C6 `vault` span breached | C7 deleted or suppressed | C8 held (either side) | C9 carried down | C10 repaired | C11 created across a breached or dismantled run | C12 frame growth | C13 edited by its own op | the event's op and records · gates and §5.3 · bend, fate and report |
    |---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
    | **W1** a trace the engine lays — S3's or S5a's with S7's strips, towers and gates and S10's band (G); VS3's palisade (V); an epoch's circuit, contraction or re-anchored stretch (V06 §3.7), V06 §3.7.6 (3)'s waterfront quay wall and (4)'s dossier-admitted circuit (laid through the hand `drawWall` operator's path, counted in `walls.raisedCrossings`, no bend line), and a run an epoch's moved river or carve re-traces (E); a regeneration's is W3 | *over the band* (an aqueduct at S6's end, its strip clear of the trace's gates, towers and fixed places, S7's towers after it moved clear; or V06's founding) or *down before the wall* (S4's viaducts, an S3 gate route re-solved by §4.2 S3 (7), and S5b's come down; S6's elevated road and a founded road deck, their ends fixed, not built, at an epoch waiting); a held wall met as an unlocked one · T110-2 (1), (2) | *beneath* · T110-2 (3) (G), T110-2 (4) and T-V6-47 (E), T-V7-48 (V) | *beneath*, own top beneath the fallen span (at a first generation it cannot occur: every raised way is new) · T110-2 (4)·S, T110-2 (7), T-V6-47 | *beneath*, own top · T110-2 (4)·S | *beneath*, the band whole across the footprint; through a `cleared` ring as open ground, a `ruined` stump met as a standing support · T110-2 (4)·S, T110-2 (7), T-V6-47 | *beneath*, no chamber, read as C3 · T110-2 (4)·S, T-V4-63 | no meeting · — | as W1·C2, by the lock sentence (nothing is held at a first generation) · T110-2 (4)·S (E), T-V7-48 (V: its declared raised ways held) | *beneath* (VS3's palisade laid after it) · T-V7-48 | as W1·C2 (a repaired span stands) · T110-2 (4)·S | *over the band*, the gap left a gap, no repair; a road deck *down before the wall* · T110-2 (1), (2), T-V6-73 | the extension keeping the deck's course, its new supports off a standing band, the run beneath *beneath*; the old deck as it stood · T110-2's frame clause | as W1·C2 on the edited deck · T110-2 (4)·S | the trace's own batches (S3 or S5a L1; S7's L1 strips, towers and gates; S10's band; VS3's; V06's fortification batch; S1's water operator's re-trace) · gates on ground part 0: S5a pins none on a deck and one beyond a foot where its crossing falls on a ramp, stair or foot, S5b spawns to `N_k` (way-and-channel table, row d); §5.3's gate row on ground part 0 · reported by *beneath* (S7's `W_RAISED_CROSSING` at G, `walls.raisedCrossings` at E), each held thing's reshape a `reshaped` entry (G2); no bend (the bent group's local moves are no hand bend); no lawful shape: (G3) |
    | **W2** a hand stretch (H) — a `drawWall` (a village T3 `wall` among them), a moved trace vertex, a re-anchored stretch, and a run a hand carve or a moved river re-traces (§4.11 *Other crossings*; §7.3 (b) 3); a gate's slid crossing is W13 | — | *beneath*, the stretch by the bent-group sentence (beyond a road deck's foot, under an aqueduct's nearest lawful span, along the strip's edge, an end moved to it, through a gate moved clear of the strip); an arch vault in a `vault` span now under the wall removed by V04's reconcile in the commit · T110-2 (4), T110-2 (5) (a carve's re-trace), T-V9-52, T-V4-63 | *beneath*, own top beneath the fallen span · T110-2 (4)·S | *beneath*, own top · T110-2 (4)·S | *beneath*, the band whole; a `cleared` ring open ground, a `ruined` stump a standing support · T110-2 (4)·S | *beneath*, no chamber · T110-2 (4)·S | no meeting · — | as W2·C2, no `refuse.locked`; a locked arch vault's chamber removed, the fate *reshaped* · T110-2 (4)·S | *beneath* (a village T3 `wall`) · T-V7-48 | as W2·C2 · T110-2 (4)·S | — | as W2·C2 · T110-2's frame clause (its ring drawn by hand) | as W2·C2 · T110-2 (4)·S | §7.3's S7 operator over the run (a carve's or a moved river's re-trace by §4.11 *Other crossings*, a standing raised way and its reservation no F-EDIT conflict) · a gate it makes for a ground way inside the under-deck strip moved along that way clear of it, the stretch bent through it; §5.3's gate row on ground part 0 · `bend.wall.raisedCrossing`, one line; each local move and a vault's removal a fate, a held thing's *reshaped*; no lawful shape: `refuse.raised.meeting`; the undo restores the run and the vault with the same id |
    | **W3** a regeneration re-deriving a ring under a held raised way (R: Regenerate (keep), New random, a re-derivation from a stage, a village Regenerate) | — (a held way is not re-created; a generated one the regeneration lays is W1·C1, a held wall standing before every stage met as an unlocked one) | *beneath*, laid by W1's rules after the held way: nothing of the meeting reads the order, so a ring re-derived on its old trace reproduces its strips, band, towers, gates and vaults; the routes it is derived from are laid after the held raised way and cross it by §4.3's crossing rule (way-and-channel table, row a), so a route the raised way crossed where that rule does not admit it is re-solved, and the boundary and ring with it, every meeting still *beneath*; a pulled trace crosses an aqueduct under a span, never at a support, by its own path · T110-2 (6) | *beneath* as read · T110-2 (6)·S | *beneath* as read · T110-2 (6)·S | *beneath* as read: through a `cleared` ring as open ground, clear of a `ruined` stump as of a standing support · T110-2 (6)·S | *beneath* as read, no chamber · T110-2 (6)·S | a suppressed way stays removed · T110-3 | as W3·C2, a locked arch vault's chamber under the ring not laid (a `reshaped` entry) · T110-2 (6)·S | as W3·C2 (a village Regenerate) · T-V7-48's Regenerate clause | as W3·C2 · T110-2 (6)·S | as W3·C2 (the held way as it stands) · T110-2 (6) | as W3·C2 · T110-2 (6)·S | as W3·C2 (the held way as its edits left it) · T110-2 (6)·S | the regenerated stages' batches; the held raised way written by none; V04's T2 vaults step reads the trace · gates on ground part 0 · reported as W1; no bend |
    | **W4** `DeclineOp`'s `breach` or `dismantle` of a run (E: the pathway's dismantling, V06 §3.7.2 (2); H: a `convert`); a breach by decay is W5 | — | *unchanged meeting* · T110-2 (4) (H), T114-3, T-V6-11 (E) | *unchanged meeting* · T110-2 (4)·S | *unchanged meeting* · T110-2 (4)·S | *unchanged meeting* · T110-2 (4)·S | *unchanged meeting* · T110-2 (4)·S | no meeting · — | *unchanged meeting*, no `refuse.locked` · T110-2 (4)·S | *unchanged meeting* · T-V7-48's hand `breach` and `dismantle` clause | *unchanged meeting* · T110-2 (4)·S | — | *unchanged meeting* · T110-2 (4)·S | *unchanged meeting* · T110-2 (4)·S | the runs' `condition`, `conditionEpoch` and material over the op's stretch (§2.7), nothing passed over; the `dismantle` that takes the last run of an absorbed record over a `vault` span lays its chamber again (row W8) · gates unchanged · a hand op's line as any `convert`; no bend |
    | **W5** V06 §3.7.7's decay (`wearWall`, a breach by neglect or poverty) (E; V: V07 §3.4 (8)) | — | *unchanged meeting* · T114-3, T-V6-73 | *unchanged meeting* · T-V6-73·S | *unchanged meeting* · T-V6-73·S | *unchanged meeting* · T-V6-73·S | *unchanged meeting* · T-V6-73·S | no meeting · — | *unchanged meeting* · T-V6-73·S | *unchanged meeting* (V07 §3.4 (8)'s decay) · T-V7-48's decay clause | *unchanged meeting* · T-V6-73·S | — | *unchanged meeting* · T-V6-73·S | *unchanged meeting* · T-V6-73·S | the draws over every run alike, none filtered for a deck · gates unchanged · — |
    | **W6** V06 §3.7.2 (1)'s gate opening, `gateToJunction` (E; H: a `convert`) | — | *unchanged meeting*: no gate stands in an under-deck strip, so none it opens lies under a deck · T-V6-47 | as W6·C2 · T-V6-47·S | as W6·C2 · T-V6-47·S | as W6·C2 · T-V6-47·S | as W6·C2 · T-V6-47·S | no meeting · — | as W6·C2 · T-V6-47·S | as W6·C2, by a hand `convert` only (V07 runs no pathway) · T-V7-48's hand `gateToJunction` clause | as W6·C2 · T-V6-47·S | — | as W6·C2 · T-V6-47·S | as W6·C2 · T-V6-47·S | the junction (and square) as at any gate · gates on ground part 0 · a hand `convert`'s line; no bend |
    | **W7** `wallToWay` (E; H: a `convert`) | — | the ring road by the way-and-channel table (row c), read in the dry run as after the op: each `vault` span the old wall stood over read `vault`, its chamber laid again by V04 in the commit and the ring road kept off its strip · T110-2 (8), T-V6-47 | as W7·C2 at that state, a re-laid vault `collapsed` where its span or a bounding support has fallen (V04 §3.5.4 (d) (2)) · T110-2 (8)·S | as W7·C2 · T110-2 (8)·S | as W7·C2 · T110-2 (8)·S | as W7·C2 · T110-2 (8)·S | no meeting · — | as W7·C2, no `refuse.locked` · T110-2 (8)·S | as W7·C2, by a hand `convert` only (V07 runs no pathway) · T-V7-48's hand `wallToWay` clause | as W7·C2 · T110-2 (8)·S | — | as W7·C2 · T110-2 (8)·S | as W7·C2 · T110-2 (8)·S | `retypeEdges`, S9's `corridorUnion`, the ring road's re-route by §7.3's S4 operator in the dry run · gates become junctions (none under a deck); no junction with the raised way · the re-route and the vault a fate (a held vault's *reshaped*) |
    | **W8** `absorbWall` (E; H: a `convert`) | — | *unchanged meeting*: the band and strips merged into the blocks (V06 §2.8), the runs standing and dismantled in time as any (row W4); a `vault` span the old wall stood over read `open` while a run of the absorbed record not yet `dismantled` crosses its under-deck strip (*beneath*), V04 laying its chamber again in the commit of the `dismantle` that takes the last such run, or in `absorbWall`'s own where none is left · T-V6-11 | as W8·C2 · T-V6-11·S | as W8·C2 · T-V6-11·S | as W8·C2 · T-V6-11·S | as W8·C2 · T-V6-11·S | no meeting · — | as W8·C2 · T-V6-11·S | as W8·C2, by a hand `convert` only (V07 runs no pathway) · T-V7-48's hand `absorbWall` clause | as W8·C2 · T-V6-11·S | — | as W8·C2 · T-V6-11·S | as W8·C2 · T-V6-11·S | `absorbWall` (V06 §2.8) and V06 §3.7.2 (2)–(3)'s dismantling · gates go with their runs · a hand `convert`'s line |
    | **W9** the hand-off down that makes the enceinte the village's palisade (E) | — | *unchanged meeting* (V07 §3.12: the standing fabric unchanged); VS3's later re-lay is W1·C9 · T-V7-48 | as W9·C2 · T-V7-48·S | as W9·C2 · T-V7-48·S | as W9·C2 · T-V7-48·S | as W9·C2 · T-V7-48·S | no meeting · — | as W9·C2 · T-V7-48·S | as W9·C2 (this column) · T-V7-48 | as W9·C2 · T-V7-48·S | — | as W9·C2 · T-V7-48's frame-growth clause | as W9·C2 · T-V7-48·S | the plan's revival (V07 §3.12) · the palisade's gates on ground part 0 · — |
    | **W10** `repairWall` (E; H) — on a `dismantled` run its bend, a new stretch drawn on its line | — | *unchanged meeting*; the bend's new stretch is a stretch of the bent group, W2·C2 · T110-2 (4), T114-3's landfall clause (E) | as W10·C2 · T110-2 (4)·S | as W10·C2 · T110-2 (4)·S | as W10·C2 · T110-2 (4)·S | as W10·C2 · T110-2 (4)·S | no meeting · — | as W10·C2 · T110-2 (4)·S | as W10·C2 · T-V7-48's `repairWall` clause | as W10·C2, neither repair waiting on the other · T110-2 (4)·S | — | as W10·C2 · T110-2 (4)·S | as W10·C2 · T110-2 (4)·S | `repairWall` (V06 §2.8) · gates unchanged · `bend.wall.newStretch` on a dismantled run, its new stretch's moves in `bend.wall.raisedCrossing`'s line |
    | **W11** a hand `delete` of a run or of the enceinte (H) | — | *unchanged meeting*: the run (its band, towers, gates) removed, the raised way untouched; V04 lays again an arch vault the run stood over · T110-2 (4), T-V4-63 | as W11·C2, a re-laid vault `collapsed` where its span has fallen · T110-2 (4)·S | as W11·C2 · T110-2 (4)·S | as W11·C2 · T110-2 (4)·S | as W11·C2 · T110-2 (4)·S | no meeting · — | as W11·C2 · T110-2 (4)·S | as W11·C2 · T-V7-48's hand `delete` clause | as W11·C2 · T110-2 (4)·S | — | as W11·C2 · T110-2 (4)·S | as W11·C2 · T110-2 (4)·S | §7.1's `delete` · its gates go with it · fates in the dry run; no bend; the undo restores the run and removes the vault again |
    | **W12** V05's landfall over a run beneath a deck (V05 §3.16 (4)) (E) | — | *unchanged meeting* for each record: the run `breached` by the landfall's wall row, the spans and supports its footprint covers `ruined` by theirs — one already `ruined` kept, one already `cleared` kept `cleared` and no member (V05 §3.16 (4)) —, each repaired by its own op (`repairWall`, `repairRaised`), neither waiting on the other · T114-3's landfall clause, T-V5-14 | as W12·C2 · T-V5-14 | as W12·C2 · T-V5-14 | as W12·C2 · T-V5-14 | as W12·C2 · T-V5-14 | no meeting · — | as W12·C2 · T-V5-14 | as W12·C2 (`sky.islands` runs at every rung, V06 §3.2) · T-V5-14 | as W12·C2 · T114-3's landfall clause | — | as W12·C2 · T-V5-14 | as W12·C2 · T-V5-14 | the landfall's batch (V05 §3.16 (4)–(5)) · a covered tower or gate lies inside its `breached` run (no state of its own), as on any landfall · its undo restores the run and the raised way's parts |
    | **W13** a hand `placeGate` (§7.1's sugar: a stub crossing the trace at `at`), or a gate's crossing slid along the trace by its grip (`moveVertex`, §7.1's T3 row) (H) | — | at an `at` or a slide's end inside the under-deck strip, moved along the trace to the nearest point clear of it, the stub or the gate's way following, the trace unchanged; elsewhere *unchanged meeting* · T110-2 (4), T-V9-52 | as W13·C2 · T110-2 (4)·S | as W13·C2 · T110-2 (4)·S | as W13·C2 · T110-2 (4)·S | as W13·C2 · T110-2 (4)·S | no meeting · — | as W13·C2, no `refuse.locked` · T110-2 (4)·S | as W13·C2 · T-V7-48's bar (0 gates in an under-deck strip) | as W13·C2 · T110-2 (4)·S | — | as W13·C2 · T110-2 (4)·S | as W13·C2 · T110-2 (4)·S | the sugar's expansion (§7.3's S7 operator makes the gate at the stub's crossing, §7.1) or the slide's `moveVertex` · gates on ground part 0, none in an under-deck strip · `bend.wall.raisedCrossing`'s gate form, one line |

**Block 2 — (6) (a)–(b), the way-and-channel table, whole:**

  * (a)–(b) *a part-0 way or a channel laid after the raised way* — at generation, at a regeneration, at an epoch, at a
    village derivation or by hand, the raised way locked, pinned or neither — meets its under-deck strip by this table,
    **the way-and-channel table**; §4.3 *Lattice and costs* is the crossing rule's home:

    The crossing rule is §4.3 *Lattice and costs*' (a span whose clear width between the standing supports' rings is at
    least the way's width + `raisedWays.structure.clearWidthM`, whose soffit meets *The clearance* for the crossed way,
    within ± `raisedWays.structure.squareDeg` of square to the deck; never over a standing support's ring — its `state`
    absent or `ruined`, a `cleared` one's ground open —, a ramp, stair, foot or a `vault` span's under-deck strip; never
    along the strip), whatever a span's `state`: a `ruined` or `cleared` span's strip is crossed by this rule as a standing
    one's, a `vault` span's kept closed by its `collapsed` arch vault (V04 §3.5.4 (d) (2)). Throughout this table, and in
    every bar that counts way corridors over a support ring or a `vault` span's strip, a ring is a standing support's and a
    `vault` span under a wall is read `open` (the crossing table, *beneath*). A lock or pin on the raised way never refuses
    any row (none changes it).

    | row | outcome | ladder · bend | gates | test |
    |---|---|---|---|---|
    | **(a)** a route, S5c's proposal, a stage-2 seed's way, a village tracker, S7's quay, intervallum or castle path | crosses the under-deck strip only by the crossing rule | its own ladder: §4.3's F-ROUTE for a route; §4.4's deflection along the strip or its end there for S5c; V01 §3.17.3 (3)'s F-TEMPLATE rungs and §4.6's lane ladder; V07 §3.5a (3)'s turn; S7's way ending at the strip as at a reservation (an intervallum ending so, the inner strip bounded across the under-deck strip by its inner setback line, §4.8's lead) | — | T110-2 (3) (the intervallum and the castle paths), (5); T-V1-51 (c); T-V7-48 |
    | **(b)** a hand `drawWay` or a moved way | the same | `bend.raised.underSpan` (moved along the deck to cross under the nearest span that admits it); none admits it: `bend.raised.around` (another course by §4.3's router, round the raised way, else the nearest routable pair, §4.3 *Two-point roads*) | a way crossing a trace makes its gate there on ground part 0 (§7.3's S7 row), never inside an under-deck strip: a crossing of the trace there is moved along the deck to the nearest crossing clear of the strip (`bend.raised.underSpan`, its wall form), else the way takes another course (`bend.raised.around`); a `placeGate`'s stub and a slid gate are the crossing table's row W13 | T110-2 (4), (5); T-V9-52 |
    | **(c)** the ring road `wallToWay` makes | the same, the old line being where it is laid, read as after the op: each `vault` span the old wall stood over read `vault` (no band, strip or run lies there once the op commits; the crossing table, *beneath*), its strip closed and its chamber laid again by V04 in the commit | in the dry run its spine there is re-routed by §7.3's S4 local operator, between its nearest nodes on either side of the under-deck strip, to cross under the nearest span the rule admits; none admits it: it ends at the strip's edges as at a reservation, reported | its gates become junctions on ground part 0; none with the raised way | T110-2 (8); T-V6-47 |
    | **(d)** S5b's spawned primary | its course comes down before the stage's picked boundary (*down before the wall*), so it crosses the boundary on ground part 0 | §4.3's ladder | each spawned primary a main gate; an earlier arterial crossing the new boundary on a deck is no gate and no part of `c`, so the stage reaches `N_k` gates on ground part 0 (§4.4 S5b; §4.8 *Gates*; §5.3's gate row) | T110-2 (2) |
    | **(e)** a channel — a moat (S3 (10)'s; S5a's outer moat), a canal or a hand carve | passes beneath where its crossing of the under-deck strip meets no support, ramp, stair, foot or `vault` span's strip; elsewhere it stops at the strip's edges, ending against the ground as against a berm (§4.2 S3 (10)) — a moat stopped so leaving the wall's outer strip closed across the under-deck strip by its glacis line and typed there as on a dry stretch (§4.7 S10 (0); §4.8 *Wall strips*); a raised way created across a standing channel keeps its supports out of its water ((3)); a stopped channel reported by what carves it: S3's or S5a's `W_RAISED_CROSSING` at generation and at a regeneration (§4.2 S3 (10); §4.4 *Outer moats*), `walls.raisedCrossings` at an epoch | a hand carve: its crossing first moved along the deck to the nearest crossing that meets none of these (`bend.raised.underSpan`), else stopped at the strip's edges (`bend.raised.around`) | an arterial's deck across a moat by S5a *Outer moats* | T110-2 (1), (3), (5), (6) |

**The sentences after the tables, conformed (model, in these words):**
* **(M1)** (6)'s closing sentence "Nothing waits for a raised way, and no generated course is dropped for later work
  (T110-2)." → "Nothing waits for a raised way but by the crossing table's (G3) — a trace that no lawful crossing or fixed
  place admits — or for a held building in an arch vault (*beneath*), and no generated course is dropped for later work
  (T110-2)."
* **(M2)** (6)'s lead, "only an op that names it changes it (its edits, V06 §3.19's ops, a landfall, a frame growth's
  extension of its deck by (7)); a wall meets it, whichever was laid first, by the crossing table ((d)). A lock or pin
  holds the same;" → "only an op that names it changes it (its edits, V06 §3.19's ops, a landfall, a frame growth's
  extension of its deck by (7)); a wall meets it, whichever was laid first and with either side held, by the crossing
  table ((d)). A lock or pin holds the same — its placement, never its shape where a wall meets it (the crossing table's
  lock sentence);".
* **(M3)** (3)'s slide bound — the text Part H · model gives (this file's pointer; no id is written into §2.7).
* **(M4)** (7)'s extension past a bound — the sentence R7-04 (c) gives (this file's pointer; no id is written into §2.7).

#### Attacking the tables (round-7 note (5)): what a second builder would build from the words, and the words that close it

1. *A user locks a drawn wall and draws an aqueduct across it: refuse or cross?* Cross (*over the band*), no
   `refuse.locked`: the lock sentence, §7.1's lock row citing it, C8 and the test in T110-2 (1) (VDC6-01).
2. *An epoch founds an aqueduct across a ring the user drew: impassable or crossed?* Crossed *over the band*: V06 §3.19
   (5)'s impassable list reads held entities as obstacles to supports, ramps, stairs, feet and the clearing only
   (VEW-r6-04's text), and the founding is run by T110-2 (1) and T-V6-73.
3. *An epoch circuit passes under a locked arch vault: keep the chamber in the band, or remove it?* Neither moves the
   other: the vault's span is held, its chamber not laid while the wall stands, its lock kept with its key; a `reshaped`
   entry; the chamber laid again, locked, when the wall goes (T110-2 (4), T-V4-80 (i)).
4. *A held building seated in that vault?* The wall gives way: its trace keeps the span's strip and the wall strips' widths
   clear, crosses under another span, else its ladder; by hand `refuse.locked` naming the building (T110-2 (4)).
5. *A hand wall drawn along beneath an aqueduct through two piers?* (ii): moved to the strip's edge on its entry side; a
   fate in `bend.wall.raisedCrossing`'s line; T110-2 (4).
6. *Ending at a pier?* (iii): the end moved to the edge on its entry side. *Wholly inside the strip?* The side nearer its
   first vertex, ties left in spine order.
7. *A gate's grip slid into the strip: the wall bends or the gate goes back?* The gate goes back along the trace, its road
   following, the trace unchanged (W13; V09's gate form; T110-2 (4), T-V9-52).
8. *A carve's re-traced run meeting a locked aqueduct's supports in its new strips: F-EDIT conflict or *beneath*?*
   *Beneath*, row W2, no conflict: §4.11 *Other crossings* and §7.3 (b) 3 except a standing raised way and its
   reservation (T110-2 (5)).
9. *A stage-2 ring crossing a river under an S4 viaduct: water gate under the deck or the crossing moved?* The crossing
   moved along the river clear of the fixed-place zone, the trace laid to it (T110-2 (3)).
10. *An anchor on a gorge rim inside a viaduct's strip?* The anchor moved along the rim clear of the zone, its tower with
   it (T110-2 (3)); an S6 aqueduct near a ring anchor keeps its zone clear of it (T110-2 (1)).
11. *Which test runs W5·C5?* T-V6-73's clause over the state sweep's C5: the support `cleared` after both its spans fell
   and, on a second run, `ruined` by a topple — no cell names a test that never sets up its state.
12. *A hand `convert` `breach` of a run beneath a locked viaduct?* No `refuse.locked` (C8), run by T110-2 (4)·S; a
   `breach` of a locked run is the op's own target, §7.1's lock row, no meeting.
13. *`absorbWall` under an aqueduct's `vault` span: when does the vault return?* When the dismantling takes the last
   run of the old wall there (W8), counted into `EpochScope.raised` by V06 (R7-04); T-V6-11·S runs it.
14. *A road deck's re-spacing that can place no station off a band within the slide bound?* The spacing bent to the
   nearest that places every station, never another course (C13).
15. *A retaining wall drawn under a viaduct?* No row: it levels no ground in the strip and passes beneath; nothing of the
   raised way written (the lock sentence's retaining-wall sentence; T110-1).

**The equivalence — what each superseded piece carried, and where it now lives.**
* §7.1's lock-row parenthesis (a ground way, a carve or a wall stretch beneath a held raised way) → kept, widened to every
  meeting of two similar structures, homed in the lock sentence; §7.4's raised-way row (a deck over a locked way) cited
  there, unchanged.
* The C8 column ("a lock or pin never refusing work that passes beneath") → C8 "held (either side)", each cell's outcome
  its unheld cell's, the op-on-a-held-thing case named (§7.1's lock row, no meeting).
* UC18 for a wall over an arch vault → the vault's span held and its lock kept, its chamber read by *beneath*; UC18's
  every other clause (U-FADE, other reconciles and regenerations, the removal of a raised way or a span's `open` under a
  locked vault) stands.
* V06 §3.19 (5)'s impassable list → impassable to supports, ramps, stairs, feet and the clearing; a held wall met by the
  crossing table; a held ground way passed over (§7.4).
* The bent group's "bent locally, between its nearest points clear … to cross … under the nearest span … beyond the foot
  … through a gate there" → the bent-group sentence's (i), whole; (ii)–(iv) new edges closed; the tie rule kept.
* *No gate and no tower*: every clause kept; W13's slid gate and the fixed places added.
* W8's "once the record is dropped" → the event that makes it true (the last run there dismantled).
* Every bar R6-02 set stands (T110-2, T-V6-47, T-V7-48, T-V4-63); new: 0 locked things refused at a meeting, 0 fixed
  places in a fixed-place zone, 0 bent-group stretches running along within or ending inside an under-deck strip, every
  held thing's reshape shown.

**The unit that states it, and every END.** Home: the model (§2.7, Blocks 1 and 2, (M1)–(M2)). Ends, each written under
its unit's heading in Part H: **determinism** E-D1 (§7.1's lock row), E-D2 (§7.1 *Raised ways* and the catch-all), E-D3
(`bend.wall.raisedCrossing`'s row), E-D4 (`refuse.raised.meeting`'s row), E-D5 (§7.3 (b) 3), E-D6 (the fate *reshaped*),
E-D7 (§5.4's `reshaped` entry), E-D8 (§7.2), E-D9 (§5.3's declared row), E-D10 (§7.4); **pipeline** E-P1 (§4.3), E-P2
(S5a (1)'s anchors), E-P3 (the water gate), E-P4 (S3 (8)'s weld filter), E-P5 (§4.8's lead), E-P6 (§4.8 *Towers*), E-P8 (the frame growth's fallback), and
VPC-r6-03's §4.11 *Other crossings*; **scope** E-S0 (the state sweep), E-S1, E-S3, E-S4, E-S5, E-S9; **V04** E-V4-2,
E-V4-4, E-V4-6, E-V4-7; **V06** E-V6-4, E-V6-5, E-V6-9, E-V6-12; **V07** E-V7-2; **V09** E-V9-1 – E-V9-6; **V11** its
§3.24.2 END and VV1112-r6-02's amendment. The repair seats apply the lock sentence's (G2) and (G3) names (*reshaped*,
`reshaped`, `refuse.raised.meeting`) exactly as these ENDs write them.

## Part C — the family's other rulings

### R7-03 Generation order: S3's gate routes, S5a's pull at a deck, and New random's pull

**Governs:** VPC-r6-01 (pipeline, major), VEW-r6-01 (pipeline, major), VCS-r6-02 (scope, major). **Owner rules
checked:** item 110 (b) ("WITHOUT a junction"; no gate on a deck), file f item 363 (a raised road comes down before a town
wall and passes its gate — J-V9.61), §4.8's "exactly N" gate law (an f-item design, MFP-4), item 106 (a)'s pinned gates.
Kept, all; the rulings are program design under J122.

**(a) S3's gate routes are solved before any boundary (VPC-r6-01).** The gate is the first point at which the route
reaches `T = t_1`; on a valley site that point can lie on a deck S4's cost function priced. *Down before the wall* names
only S5b's picked boundary, so nothing brings that deck down. **Decision:** the stage-1 boundary counts as standing from
S3 (7), and a gate route whose gate would fall on a raised stretch is re-solved with no deck across the boundary. Home
text, **pipeline, §4.2 S3 (7)**, after "the gate keeps the pick's identity, ordinal, bearing and route.": "A route whose
first point at `T = t_1` lies on a raised stretch of its solved course (a viaduct (5)'s solve priced, §4.3) is re-solved
whole as (5) solves it, every deck edge whose two ends lie on either side of the stage-1 boundary excluded (the boundary
counting as standing, §4.3 *Where it may not go*; §2.7's crossing table, *down before the wall*); its gate is the
re-solved route's first point at `T = t_1`, on ground part 0, which the rest of this step reads as any gate; `T` and the
boundary keep (5)'s routes and are not re-derived, and a route the re-solve cannot serve takes F-ROUTE's ladder (§5.2),
reported." And **§4.3 *Where it may not go***: "(at S5b the stage's picked boundary counting as standing;" → "(at S3 (7)
the stage-1 boundary — from S3 (9) on, its trace — and at S5b the stage's picked boundary counting as standing;". The
model's *down before the wall* carries the same words (R7-02). The same rule holds at every regeneration that re-lays S4's
viaducts (row W1·C1 through W3). **Ends:** scope's T110-2 (2) (Part H · scope, E-S2).

**(b) S5a's pull at a deck crossing (VEW-r6-01).** The pull may move an unpinned deck crossing onto the arterial's ground
course beyond the foot, where no gate is pinned: `N_k` + 1 gates, or F-WALL's lane diversion against "S4 and S5b arterials
are never trimmed". **Decision:** the pull keeps each arterial's crossing as the picked boundary had it. Home text,
**pipeline, §4.4 S5a *Trace* (2)**, after "an arterial crossing the boundary on a raised deck pins no gate there,": "and
the pull keeps that crossing beneath its deck — that arterial's ground course beyond each foot of the deck, within the
search band, impassable to the pull as the deck's ramps, stairs and feet are — so the pulled trace crosses each arterial
as the picked boundary did: on ground part 0 at its pin, or under its deck (§2.7's crossing table, *beneath*), and the
stage's gates are its pins (`N_k`, §4.4 S5b),". The model's *beneath* cites it (R7-02). The same holds at every epoch
stage (V06's circuits use S5a's trace). **Ends:** scope's T110-2 (3) (E-S3).

**(c) New random's pulled trace (VCS-r6-02).** T110-2 (6) asked for "the nearest span", the bent group's tie rule, of a
trace S3's pull lays. **Decision:** the pull's own path decides; the bar reads the outcome every pulled trace has. Home:
**scope, T110-2 (6)**, as VCS-r6-02's `required_change` words it (Part H · scope). The table's W3·C2 says the same.

### R7-04 Epochs and decay: the landfall's ladder, the absorbed ring's vault, the frame growth's bound, `wallToWay`'s re-route, a cleared span at a village

**Governs:** VV56-r6-01 (V05, major); VV56-r6-02 (model, major) = VV34-r6-03 (V04, major); VAT6-r6-02 (model, major);
VPC-r6-02 (pipeline, major); VAL-R6-02 (V07, major). **Owner rules checked:** item 110 (b) ("arches fall by stretch while
piers persist", J-V6.87; "the spaces between piers stay open or hold the base's vaults"); item 114 (walls decay and
recover); item 101 R13 (a held raised way); item 110 (d)'s landfall law is V05's. Kept, all.

**(a) The landfall only steps a part down its ladder (VV56-r6-01).** A `cleared` span or support written back to `ruined`
counts a released way standing again (V06 §3.19.1 (3)), is repaired against "never rebuilt", and credits its stone twice.
**Decision:** as VV56-r6-01's `required_change` words it — the raised row and the retaining row only step down, a
`cleared` part kept `cleared` and no member, a `ruined` retaining run kept `ruined`; §3.16 (5)'s members not `cleared`;
§3.23's row and T-V5-14 run it; V06 §3.19.2 (4) cites it. Home: **V05 §3.16 (4)**; the model's W12 cell carries it (R7-02).
**Ends:** V06 §3.19.2 (4) (E-V6-6).

**(b) An absorbed ring's arch vault (VV56-r6-02 = VV34-r6-03).** W8's "once the record is dropped" names an event no op
makes (V06 §3.7.2 (3) keeps the cleared record). Two readings were offered: the vault laid again in `absorbWall`'s commit
(its band and strips merged into the blocks), or when the last run there is dismantled. **Decision (J122, vetoable — the
family's veto 15):** the second. After `absorbWall` the old runs stand on the old line (V06 §2.8: "its remaining runs keep
their `condition`, dismantled on by V06 §3.7.2 (2)"), and a standing run through the chamber's footprint is no coherent
shape; R6-02's own words ("once the record is dropped") meant once nothing of the wall stands there. So *beneath* reads a
`vault` span `open` while a run of the absorbed record not yet `dismantled` crosses its under-deck strip, and V04 lays its
chamber again in the commit of the `dismantle` that takes the last such run, or in `absorbWall`'s own where none is left
(R7-02: *beneath*, row W8, row W4's last column). The triggers that run the reconcile then name that event at each home:
V04 §1b.2's trigger cell, V04's entity row and §3.10 bullet, V06 §2.1's `EpochScope.raised`, W64 and §2.8's
`absorbWall` comment, and T-V6-11. **Ends:** V04 (E-V4-1 – E-V4-3), V06 (E-V6-1 – E-V6-3).

**(c) A frame growth's extension past a bound (VAT6-r6-02).** (7) runs (1)–(5) on the extension; (3) and (4) drop a
generated course past `maxClearSpanM` or `maxPierM` and bend a declared one, but the way is held ((6)) and its ring-end
foot is already on the new ring. **Decision (J122, vetoable — veto 16):** the extension's course bends; with no course
that fits, it keeps its course with each pier its stations need, reported — a pier in the water rather than an arch past
what its material can span, because the frame reveals a crossing the way already made beyond it, as a bridge's piers
stand in a river. Home text, **model, §2.7's support step (7)**, after "against the obstacles standing then,": "— where
(3)'s clear-span bound or (4)'s pier bound fails on it (a water face or a valley the grown frame reveals), the way being
held ((6)), the extension is neither dropped nor left waiting: its course bends, as (3) and (4) bend a declared course, to
the nearest course from that station to the new ring whose clear spans and piers fit, its ring-end foot re-placed where
that course meets the new rings (`RaisedFoot`); with none, it keeps the straight course, each station (1)–(2) place
standing where it falls — a support in a water face kept there, a pier past `maxPierM` kept — and each is reported
(`raised.extendedPastBound`, V06 §2.10; at a hand Re-derive, a row of its dry run's effects) —". T110-2's bound bar
reads "every clear span and pier within its bound, and no support in water, but a frame growth's extension past a bound
with no fitting course, reported (§2.7's support step (7))". **Ends:** scope (E-S8), V06 (E-V6-13), pipeline (E-P8).

**(d) `wallToWay`'s re-route reads the state after the op (VPC-r6-02).** In the dry run the band still lies on the old
line, so the crossing rule reads a `vault` span under it `open`; in the commit V04 lays that span's chamber across the new
road. **Decision:** the dry run reads the state the op leaves. Home text, **pipeline, §4.11 `wallToWay`**: "to cross under
the nearest span §4.3's crossing rule admits" → "to cross under the nearest span §4.3's crossing rule admits, reading the
state the op leaves: each `vault` span the old wall stood over read `vault` (no band, strip or run lies there once the op
commits; §2.7's crossing table, *beneath*), so the ring road keeps off the strip of the chamber V04 lays again"; the
model's row (c) carries it (R7-02 Block 2). **Ends:** scope's T110-2 (8) (E-S7).

**(e) A cleared span at a village (VAL-R6-02).** V07 §3.5a (3) frees a `cleared` span's ground; the base's crossing rule
reads every span by the rule whatever its `state`, a `vault` span's strip closed by its `collapsed` arch vault. **Decision:**
the base's home governs (principle (3)); V07 conforms, as VAL-R6-02's first form words it, and the way-and-channel table's
lead now says "whatever a span's `state`" (R7-02 Block 2).

### R7-05 Readers: the span's `use` as read, and the strip margin's readers

**Governs:** VAL-R6-03 (rendering, major), VEL6-r6-01 (V10, major), VAF-R6T-04 (V01, minor), VV1112-r6-02 (V11, minor).
**Owner rule checked:** item 110 (b)'s vaults; principle (7) (every reader named). **Decision:** every reader of a span's
`use` reads it as *beneath* does — `open` for a `vault` span under a wall, the record unchanged — and *beneath* now names
them all (R7-02): §11.1's GeoJSON `span` (VAL-R6-03's text), V10's raised-way read and T-V10-41 (VEL6-r6-01's text),
V09 §4.20.6 (2) (stands). The span rule's home is §2.7 (VAF-R6T-04's text at V01 §1.2). V11's registry row 80 and W50
name every reader of `structure.stripMarginM`, VS3's palisade and V07 §3.5a (5)'s village stages among them
(VV1112-r6-02's text). Each FIX as written.

### R7-06 Tests: the state sweep, and every cell's test holding its case

**Governs:** VAT6-r6-01 (V04, major) = VAP-r6-04 (V06, major); VEL6-r6-02 (scope, major), VM-R6T-02 (scope, major);
VAF-R6T-03 (scope, major); VAP-r6-01 (scope, major), VAP-r6-02 (scope, minor), VCS-r6-01 (scope, major), VCS-r6-03
(scope, minor); VV56-r6-03, -04, -05, -06 (V06, minor); VAL-R6-06, VV78-r6-01, VV78-r6-02 (V07, minor); VV34-r6-01,
VV34-r6-04 (V04, minor); VAT6-r6-03, VCS-r6-04 (V06, minor), VM-R6T-03 (model, minor). **Owner rules checked:** item 110
(f)'s bars (each kept in T110-2 and T110-3); item 101 R13 as J144 reads it (the lock runs in every hand row); principle
(11) (every edge a test). **The class:** cells named tests that never set up their state (round 6's W3–W13 cells); two
bars read "standing" against V04's collapsed vaults; clauses ran before their provider's exit.

**(a) The state sweep — one definition, every row's test (J122).** Rather than a clause per cell, each row's test runs its
case over one named sweep, defined once at T110-2's lead (scope's home) in these words: "**the state sweep** — where a
clause runs over it, the clause's case run once more for each of these states of its raised way, each on its own run of
the clause's fixture, the state made by scripted ops before the clause's wall event: C3, a span over the wall's line
`ruined` by a `DeclineOp` `breach` and, on a second run, `cleared` by its `dismantle` after it; C4, every span over the
line `ruined`; C5, the support nearest the line `cleared` — both its spans `ruined` first, then its `dismantle` (V06
§3.19.2 (3)) — and, on a second run, `ruined` by a `topple` (V06 §3.11; it and both its spans, V06 §3.19.2 (4)); C6, a
`vault` span over the line breached with its arch vault (the fixture's seed searched so that one reads `vault`); C8, the
raised way locked and, on a second run, pinned — and, in a clause whose event creates or edits the raised way, the wall
locked; C10, C3's `ruined` span repaired by `repairRaised`; C12, the deck extended by a frame growth; C13, the raised
way's Arch spacing edited, on a second run its Deck height, on a third its course re-shaped by a hand `moveVertex`. Each
run takes its cell of §2.7's crossing table: the event's own records only, nothing of the raised way written but a
chamber the table removes or lays again (`collapsed` where its span or a bounding support has fallen), the run's top
read by *beneath* for that state, no gate or tower in the under-deck strip, each held thing's reshape shown ((G2)), and
every station, key, span and state the event does not name unchanged." The sweep's users are the table's "·S" cells:
T110-2 (4) (rows W1 at an epoch, W2, W4, W10, W11, W13), (6) (W3) and (8) (W7); T-V6-73 (W5), T-V6-11 (W8 and W4 at an
epoch), T-V6-47 (W6); T-V7-48 (W9). V05's T-V5-14 already runs W12 over each state (round 6), its words standing. Its
schedule (§13.8): the C5 `topple` run at the later of the clause's exit and M6-E's E5 (the hazards); the C6 runs and
every arch-vault clause at the later of the clause's exit and M6-U's U3 (VCS-r6-03, generalised). **Ends:** scope (E-S0,
E-S4, E-S6, E-S7, E-S10), V06 (E-V6-3, E-V6-7, E-V6-8, E-V6-11), V07 (E-V7-1, E-V7-3).

**(b) One wording for the arch-vault bars (VAT6-r6-01 = VAP-r6-04).** T-V4-63's "names a standing span" and T-V6-64's
"none under a fallen one" fail a correct build: V04 §3.5.4 (d) (2) keeps a `collapsed` vault under a fallen span, and
§4.11's `DeclineOp` collapses it in the batch. **Decision:** one wording, home V04 §3.5.4 (d), each bar citing it: "every
arch vault's key names a span of the way whose `use` is `vault` and over which no wall stands — its chamber open under a
standing span, `collapsed` under one whose span or a bounding support is `ruined` or `cleared` (V04 §3.5.4 (d) (2)) — and
no arch vault stands where its span no longer exists, is `open` or lies under a wall (V04 §3.5.4 (d) (3))". T-V4-63's bar
and T-V6-64's clause take it; V06 §3.19.2 (3)'s "so no chamber stands under a fallen span at any batch" → "so no chamber
stands open under a fallen span at any batch" (blind spot (c)).

**(c) The other test findings**, each its `required_change` as Part H rules: regeneration at fallen states and the
re-laid vault after `wallToWay` (VEL6-r6-02, VM-R6T-02: T110-2 (6)·S and (8)); castle paths (VAF-R6T-03: T110-2 (3));
the hand rows locked and pinned and over the sweep (VAP-r6-01, VAP-r6-02: T110-2 (4), (8)); a re-shape across a standing
ring (VCS-r6-01, amended: a locked raised way's own re-shape is §7.1's lock row's — the user unlocks first — so the
lock run locks the ring); the arch-vault clauses' exit (VCS-r6-03); V06's W5, W6, W8 rows (VV56-r6-03, by the sweep);
T-V6-47's script and the cells' order (VV56-r6-04 with VCS-r6-04, one text); H-AQUA's `vault` spans (VV56-r6-05);
`raised.waited` at the epochs that can wait (VV56-r6-06); T-V7-48's hand-off at each state and its report (VAL-R6-06 with
VV78-r6-01, by the sweep); V07's V-M3 cell (VV78-r6-02); T-V4-63's two clauses and U5's cell (VV34-r6-01, VV34-r6-04); the
E3 and E8 cells (VAT6-r6-03); W11·C2's test (VM-R6T-03, in the table).

### R7-07 Bookkeeping

**Governs:** VDC6-02 (determinism, minor) = VPC-r6-05 (pipeline, minor); VAL-R6-07 (pipeline, minor) = VPC-r6-06 (pipeline,
minor); VPC-r6-04 (pipeline, minor); VM-R6T-04 (model, minor); VAF-R6T-02 (model, minor); VAL-R6-05 (V06, minor). **Owner
rule checked:** none speaks to them (principle (7)'s wiring). **Decisions:**
* **`W_RAISED_CROSSING` by stage (VDC6-02 = VPC-r6-05):** S7 counts each crossing of a trace laid after a raised way with
  its deck line, S3's and S5a's traces alike; S3 and S5a each count the moats and canals they carve that stop at an
  under-deck strip. §5.4's comment, §4.4 S5a *Outer moats*, §4.2 S3 (10) and T110-2 (3) as VDC6-02's `required_change`
  words them (determinism's share is §5.4; pipeline's the other two; scope's T110-2 (3)); the model's *beneath* and row (e)
  carry it (R7-02).
* **§4.13's rung (VAL-R6-07 = VPC-r6-06):** as written, with (G3): "*Rung:* leave out and report (a road deck that cannot
  come down before a standing trace, at generation; at an epoch it waits, V06 §3.19 (5)); simpler shape (declared, bent:
  `bend.raised.wall`, `bend.wall.aqueductArch`), else refused (`refuse.raised.meeting`, §2.7's crossing table, the lock
  sentence's (G3))".
* **The stopped moat's strip (VPC-r6-04):** as written.
* **The slide bound (VM-R6T-04):** as written.
* **Row (a)'s test (VAF-R6T-02):** as written (in R7-02's Block 2).
* **`EpochScope.raised` at its caller (VAL-R6-05):** as written.

## Part H — per-unit dispositions (the 53 family issues) and END lines

Each heading is self-contained: the issues the unit owns, their dispositions, then the END lines it writes. "As written"
means the issue's `required_change` in `work/round7-work/<unit>.json`. Every text quoted "old → new" keeps every other word
as it stands; a quoted old text may run across a line break in the live file.

### scope (base §0–§1, §13–§17, the index, INDEX.md)

| id | sev | grade | disposition | note |
|---|---|---|---|---|
| VAF-R6T-03 | major | major | FIX per R7-06 | E-S3's castle-path text (its required text, placed in (3)) |
| VAP-r6-01 | major | major | FIX per R7-02, R7-06 | E-S4 and E-S7: the hand rows and `wallToWay` run with the raised way locked and pinned inside the state sweep (its C8); the model's END (W4·C8, W10·C8 → T110-2 (4)) is in R7-02's table; V06's END is E-V6-8 (3) |
| VAP-r6-02 | minor | minor | FIX per R7-06 | E-S4 and E-S7: the hand rows and `wallToWay` over the state sweep, in place of the clause lists the issue writes; the model's cells are R7-02's table |
| VEL6-r6-02 | major | major | FIX per R7-06 | E-S6 (row W3 over the state sweep), one text with VM-R6T-02 (1) |
| VM-R6T-02 | major | major | FIX per R7-04, R7-06 | (1) E-S6 with VEL6-r6-02; (2) E-S7's `vault`-span case, which reads the vault as the dry run reads it after the op (R7-04 (d)) |
| VCS-r6-01 | major | major | FIX, amended | E-S4's re-shape clause; amended: a locked raised way's own re-shape is §7.1's lock row's (it targets the locked thing; the user unlocks), so the lock run locks the ring, drawn by hand, and checks no `refuse.locked` for the meeting |
| VCS-r6-02 | major | major | FIX | E-S6's first change, as written |
| VCS-r6-03 | minor | minor | FIX per R7-06 | E-S10, generalised to every arch-vault clause and the sweep's runs |

**Texts scope writes** (all in §13.2's T110 bullet and §13.8; ends of VDC6-01, VEW-r6-04, VAL-R6-01 = VEW-r6-02,
VEL6-r6-04, VAT-r6-02 = VV910-r6-01, VPC-r6-01, VPC-r6-02, VPC-r6-03, VEW-r6-01, VEW-r6-03, VM-R6T-01, VAT6-r6-02,
VDC6-02 and VV56-r6-06 included):
* **E-S0 — T110-2's lead.** "**the wall and later work** (§2.7's crossing and way-and-channel tables; every count below of
  way corridors over a support ring or a `vault` span's strip reading standing rings and `vault` spans no wall stands
  over):" → "**the wall and later work** (§2.7's crossing and way-and-channel tables, with the crossing table's lock,
  bent-group and fixed-place sentences; every count below of way corridors over a support ring or a `vault` span's strip
  reading standing rings and `vault` spans no wall stands over; **the state sweep** — where a clause runs over it, the
  clause's case run once more for each of these states of its raised way, each on its own run of the clause's fixture,
  the state made by scripted ops before the clause's wall event: C3, a span over the wall's line `ruined` by a
  `DeclineOp` `breach` and, on a second run, `cleared` by its `dismantle` after it; C4, every span over the line
  `ruined`; C5, the support nearest the line `cleared` — both its spans `ruined` first, then its `dismantle` (V06 §3.19.2
  (3)) — and, on a second run, `ruined` by a `topple` (V06 §3.11; it and both its spans, V06 §3.19.2 (4)); C6, a `vault`
  span over the line breached with its arch vault (the fixture's seed searched so that one reads `vault`); C8, the raised
  way locked and, on a second run, pinned — and, in a clause whose event creates or edits the raised way, the wall
  locked; C10, C3's `ruined` span repaired by `repairRaised`; C12, the deck extended by a frame growth; C13, the raised
  way's Arch spacing edited, on a second run its Deck height, on a third its course re-shaped by a hand `moveVertex`.
  Each run takes its cell of §2.7's crossing table: the event's own records only, nothing of the raised way written but a
  chamber the table removes or lays again (`collapsed` where its span or a bounding support has fallen), the run's top
  read by *beneath* for that state, no gate or tower in the under-deck strip, each held thing's reshape shown (the lock
  sentence's (G2)), and every station, key, span and state the event does not name unchanged):".
* **E-S1 — (1) *over the band*.** After "and a hand aqueduct drawn across a standing wall, its course bent clear of a
  tower, with `bend.wall.aqueductArch`" add "— and the same across a wall drawn by hand (locked by its drawing, §7.2) and
  across one the user locked, no `refuse.locked` and nothing of the wall written (the lock sentence), and across a wall
  where no course keeps its supports off the band within `raisedWays.structure.maxClearSpanM`, refused
  (`refuse.raised.meeting`), nothing of either built —; (1)'s aqueduct at S6's end on a variant whose recipe places a ring
  anchor, a river's water gate and an `on_enceinte` castle's weld vertex within one span of its best course — its course
  bent so that each lies outside its fixed-place zone (the fixed-place sentence), S7's anchor tower standing at its
  anchor"; and "the same aqueduct founded by V06 §3.19 at a CITY epoch across the ring where its run is `breached` and, on
  a second run, `dismantled` — the gap left a gap beneath the arch, no `repairWall`" → "… no `repairWall`, and on a third
  run across a ring drawn by hand (locked by its drawing) — *over the band*, no wait, nothing of the ring written (V06
  §3.19 (5))".
* **E-S2 — (2) *down before the wall*.** "a CITY whose S4 route's best course crosses a valley at S3's gate, its deck down
  before the trace and its route through the gate on ground part 0" → "a CITY whose S4 route's best course crosses a
  valley at S3's gate, its deck down before the trace and its route through the gate on ground part 0 — S3's gate route,
  whose first point at `T = t_1` lay on its priced deck, re-solved by §4.2 S3 (7) with no deck across the stage-1
  boundary, the gate on ground part 0 and S4 committing the re-solved route —"; "not founded, `raised.waited` at each
  epoch" → "not founded, `raised.waited` at each CITY and METROPOLIS epoch while the CITY ring's trace stands"; and after
  "0 road decks across a trace standing when laid;" add " a hand raised road drawn across a wall drawn by hand where no
  gate stands on its ground course — brought down before it, its ground way's gate made in the held wall with the fate
  *reshaped* naming it (the lock sentence), the undo restoring the wall;".
* **E-S3 — (3) *beneath* at generation.** After "no ramp, stair or foot in the band or the channel, the stage's `N_k`
  gates on ground part 0;" add " a variant whose picked boundary crosses that deck within the pull's search band of the
  valley's rim — the pulled trace crossing it under the deck and never on its ground course beyond the foot, the stage's
  gates exactly `N_k`, 0 non-gate crossings (§4.4 S5a *Trace* (2)); a stage-2 ring whose boundary crosses the river under
  an S4 viaduct's span and, on a second run, is anchored on that river's bank inside the viaduct's fixed-place zone — the
  river crossing with its water gate, and the anchor with its tower, moved along the river clear of the zone, the trace
  laid to them; a spur town whose gorge-side stretch anchors on the rim where S4's priced viaduct would cross the gorge —
  the viaduct, laid after the stage-1 trace, keeping that anchor outside its fixed-place zone — and a stage-2 ring
  anchored on that rim after the viaduct, the anchor moved along the rim clear of the zone with its tower; 0 gates,
  towers, anchors or weld vertices in a fixed-place zone (the fixed-place sentence); a CITY fixture holding a declared
  masonry aqueduct across a corner of a castle's bailey (*over the band*), regenerated (keep), so that S7 lays the
  castle's internal paths (keep ↔ gatehouse ↔ wall stairs, §4.8) after it: each path crossing the under-deck strip under
  a span §4.3 admits or ending at the strip as at a reservation, 0 path corridors over a support ring, ramp, stair, foot
  or `vault` span's strip (§2.7's way-and-channel table, row a); and in every case of this clause each crossing of the
  ring's trace with a deck line counted once in S7's `W_RAISED_CROSSING` and each stopped channel once in S3's or S5a's
  (§5.4);".
* **E-S4 — (4) *beneath* by hand and at an epoch.** After "and the viaduct's Arch spacing changed after the wall was
  drawn — its station in the band slid off it, the band whole there" add "; the hand rows of §2.7's crossing table on
  this clause's standing aqueduct with a `vault` span in its line and on its declared viaduct — a hand `convert` `breach`
  and `dismantle` of the run beneath (W4), a `repairWall` of the breached run and of the `dismantled` one, its new
  stretch drawn on its line and meeting the raised way as a hand `drawWall` does (W10), a hand `delete` of the run (W11),
  a hand `placeGate` inside the under-deck strip and a gate of that wall slid by its grip into the strip — moved back
  along the trace clear of it, its road following, the trace unchanged, with `bend.wall.raisedCrossing`'s gate form
  (W13) — together with the epoch circuit and the hand `drawWall` above (W1, W2), each run over the state sweep: each its
  cell's outcome, no `refuse.locked` with the raised way locked or pinned, an arch vault a delete lays again `collapsed`
  where its span has fallen; a hand `drawWall` drawn along beneath a standing aqueduct through two of its supports, one
  entering and leaving its under-deck strip on one side, and one ending at a support — each such part moved to the
  strip's edge on its entry side, a fate in `bend.wall.raisedCrossing`'s line, every station, key and span unchanged (the
  bent-group sentence); an epoch circuit across a standing aqueduct whose `vault` span holds a locked arch vault — the
  circuit crossing under that span, its chamber not laid while the wall stands, its lock and id kept, a `reshaped` entry
  naming it, and after a hand `delete` of that run the chamber laid again, locked, with the same id; the same by a hand
  `drawWall`, with the fate *reshaped*; on a second run with a declared placement seated in that vault — the circuit
  crossing under another span, the building, its chamber and its door unchanged, 0 footprints in a band or setback, and a
  hand `drawWall` across that span refused `refuse.locked` naming the building; and, on a CITY fixture whose standing
  ring was drawn by hand (locked by its drawing), a standing aqueduct's course re-shaped by hand so that a stretch of it
  crosses the ring — that stretch *over the band*, its supports off the band and its under-deck strip clear of the
  ring's gates, towers and fixed places — and a standing declared viaduct's course re-shaped so that a stretch of it
  crosses the ring — brought down before the trace, its way through a gate there on ground part 0, a gate made in the
  held ring with the fate *reshaped*, with `bend.raised.wall` —, no `refuse.locked` (§2.7's crossing table, C13 and the
  lock sentence)".
* **E-S5 — (5) ways and channels.** After "and one wider than the clear width between every two of its supports," add " a
  hand carve of a canal across a ring beneath which a standing aqueduct passes, its re-traced run's new strips meeting the
  aqueduct's supports — the run meeting it by §2.7's crossing table (*beneath*, row W2), bent where the bent-group
  sentence says, no F-EDIT conflict (§4.11 *Other crossings*) —".
* **E-S6 — (6) regeneration.** VCS-r6-02's text as written ("— the trace crossing the deck line under the nearest span, a
  support's edge its band meets built into the band," → "— the trace crossing the deck line under a span, never at a
  support, S3's pull treating the aqueduct's standing supports as impassable (§2.7's crossing table, *beneath*), a
  support's edge its band meets built into the band,"); and after "0 S5b or S5c way corridors over a support ring, ramp,
  stair or foot" (the clause's end, before "(7) parts going") add "; and (1)'s c15 fixture with its aqueduct locked,
  regenerated (keep) and given New random over the state sweep (row W3), New random's seed searched so that the new
  ring's boundary meets the `cleared` support's former ring and, on the `topple` run, the `ruined` stump — the trace
  through the cleared ring as open ground and crossing the deck line clear of the stump as of a standing support, the
  band whole across each former footprint, the run at its own top beneath each fallen span, no chamber in the breached
  `vault` span, each S4 route the regeneration re-solves crossing the deck under a span §4.3 admits, its clear width read
  between standing rings, every station, key, span and state of the aqueduct unchanged".
* **E-S7 — (8) `wallToWay`.** After "no junction with the raised way" (the clause's end, before "(T110-3)") add "; the
  same on a fixture whose old line passed under a `vault` span of a standing aqueduct — the dry run reading that span
  `vault` (the state the op leaves), the ring road re-routed under another span, the arch vault laid again with its id in
  the commit, 0 way corridors over its strip (§2.7's way-and-channel table, row c); and (3)'s `wallToWay` run over the
  state sweep, its viaduct locked and pinned among them — the ring road by row (c) read at that state, a re-laid vault
  `collapsed` where its span has fallen, no `refuse.locked`".
* **E-S8 — the frame clause and the bound bar.** In T110-2's frame clause, after "and the same with that ring drawn by
  hand (W2·C12)" add "; and, on a variant whose grown frame reveals across the aqueduct's course a river wider than
  `raisedWays.structure.maxClearSpanM` and, on a second run, a valley deeper than its `maxPierM` — first with a fitting
  course in reach, then with none — the extension bent to the nearest course whose clear spans and piers fit, both ends of
  its ring-end foot on the new rings, and, with none, kept on its course with its support in the water and its pier past
  the bound, each counted in `raised.extendedPastBound`, the aqueduct kept and nothing waiting (§2.7's support step (7))";
  and in the support step's clause "a declared one bent to a course whose clear spans fit
  `raisedWays.structure.maxClearSpanM`, no support in water;" → "a declared one bent to a course whose clear spans fit
  `raisedWays.structure.maxClearSpanM`, no support in water but a frame growth's extension with no fitting course
  (above);".
* **E-S9 — T110-1.** "(T110-1) retaining walls on terraced slopes above the thresholds and nowhere flat, every way crossing
  one a stair or a ramp, and one meeting the frame's outer ring ending on it;" → "… ending on it, and a T3 `retaining` wall
  drawn across a standing viaduct's under-deck strip through one of its supports — levelling no ground inside the strip,
  laid through the support, every station, key and span unchanged (§2.7's crossing table, the lock sentence's retaining
  wall);".
* **E-S10 — §13.8's T110 row.** After "those of (1), (2), (4), (5), (7) and (8) on volume 6's engine with M6-E's E2 and
  E3" add "; the state sweep's `topple` runs at the later of their milestone and M6-E's E5, which builds the hazards, and
  every arch-vault clause — (1)'s, (4)'s, (6)'s, (8)'s and the sweep's C6 runs — at the later of their milestone and
  M6-U's U3, which lays the arch vaults (V04 §8)".
* **Sweep (blind spots (c), (d)).** §13.2's take-over row and the runs sentence stand (they name T110-2's clauses, whose
  numbers are kept). No other scope text restates a rule R7-02 homes (searched: §0–§1, §13–§17, the index, INDEX.md).

### model (base §2)

| id | sev | grade | disposition | note |
|---|---|---|---|---|
| VAF-R6T-02 | minor | minor | FIX | in R7-02's Block 2 (row (a)'s test cell) |
| VAL-R6-01 | major | major | FIX per R7-02 | the lock sentence (J144) replaces both options of the issue and of repair-r6-V04: the vault's span held, its chamber not laid while a wall stands over it, its lock kept with its key; *beneath*'s *A `vault` span under the wall* says so; V04's END is E-V4-4 (UC18), scope's E-S4 |
| VEW-r6-02 | major | major | MERGED into VAL-R6-01 | the same defect at §2.7; its remaining case — a held building seated in the vault — is ruled in R7-02's *beneath* (*A held building in an arch vault*: the wall gives way), V06's END E-V6-5, scope's E-S4 |
| VAT6-r6-02 | major | major | FIX per R7-04 | R7-04 (c)'s text at (7) (the issue's first form, its fallback a pier kept in the water or past `maxPierM`, never a span past `maxClearSpanM`) |
| VAT-r6-02 | major | major | FIX per R7-02 | row W13 takes a gate's slid crossing (its gate moved back along the trace, its road following); W2's event cell names it; ENDs at determinism (E-D3), scope (E-S4), V09 (E-V9-2) |
| VV910-r6-01 | major | major | MERGED into VAT-r6-02 | the same defect at §2.7's rows W2 and W13 |
| VEL6-r6-04 | major | major | FIX per R7-02 | the bent-group sentence's (ii)–(iii) (along beneath, one side, ending at a support); ENDs at determinism (E-D3), scope (E-S4) |
| VEW-r6-03 | major | major | FIX per R7-02 | the fixed-place sentence (anchors and weld vertices); *over the band*'s strip clear of fixed places; ENDs at pipeline (E-P2 – E-P6), scope (E-S1, E-S3) |
| VM-R6T-01 | major | major | FIX per R7-02 | the fixed-place sentence (a river's water gate, an anchor's tower); pipeline (E-P3, E-P5, E-P6), scope (E-S3) |
| VM-R6T-03 | minor | minor | FIX | W11·C2's test names T-V4-63 (R7-02's table) |
| VM-R6T-04 | minor | minor | FIX | (3)'s "× the band's upper bound" → "× the `pierSpacingM` band's upper bound ((1))" |
| VV56-r6-02 | major | major | FIX per R7-04 | R7-04 (b): the vault laid again when the last run of the absorbed record over it is dismantled (row W8; *beneath*); ENDs at V04 (E-V4-1 – E-V4-3), V06 (E-V6-1 – E-V6-3) |

**What the model writes** (one block at §2.7): R7-02's **Block 1** in place of the support step's (6) (d) bullet, from
"(d) *a wall and a raised way* meet by this table" through the crossing table's last row (W13); R7-02's **Block 2** in
place of its (6) (a)–(b) bullet with the way-and-channel table; **(M1)** and **(M2)** as R7-02 words them; R7-04 (c)'s
sentence in (7); VM-R6T-04's word in (3). The table cells are R7-02's, every cell. **Sweep:** §2.7's other mentions — the
support step's (3) obstacle list and merged-span clause, the span rule's step (2) and last sentence, `RaisedFoot`, the
*Readers* and *Source and lifecycle* bullets — stand (each already cites the crossing table or reads no lock); §2.6's
arch-vault row cites V04 §1b.2's trigger list, which V04 conforms (E-V4-1). No END line from another unit lands here.

### pipeline (base §4, §10, PART II, PART III)

| id | sev | grade | disposition | note |
|---|---|---|---|---|
| VAL-R6-07 | minor | minor | FIX per R7-07 | §4.13's rung, with (G3)'s refusal added |
| VPC-r6-06 | minor | minor | MERGED into VAL-R6-07 | the same cell |
| VEW-r6-01 | major | major | FIX | R7-03 (b): §4.4 S5a *Trace* (2) as written; scope's END is E-S3 |
| VPC-r6-01 | major | major | FIX per R7-03 | R7-03 (a): §4.2 S3 (7) and §4.3 *Where it may not go* as R7-03 words them (the issue's text, the deck edge read by its two ends' sides); the model's END is in R7-02; scope's E-S2 |
| VPC-r6-02 | major | major | FIX per R7-04 | R7-04 (d): §4.11 `wallToWay` as R7-04 words it (the state the op leaves); the model's row (c) is in R7-02; scope's E-S7 |
| VPC-r6-03 | major | major | FIX per R7-02 | §4.11 *Other crossings* as written, "bent locally where *beneath* says" → "bent where the bent-group sentence says"; the model's W2 event cell and bent-group list are R7-02's; determinism's END E-D5; scope's E-S5 |
| VPC-r6-04 | minor | minor | FIX | as written (§4.7 S10 (0); §4.8 *Wall strips*) |
| VPC-r6-05 | minor | minor | FIX | as written (§4.4 S5a *Outer moats*; §4.2 S3 (10)); one fix with VDC6-02 (determinism's §5.4) |

**END lines pipeline writes:**
* **E-P1 — §4.3 *Where it may not go*** (with R7-03 (a)'s change): "an aqueduct crossing a standing wall's band on a span,
  its ramps, stairs and feet off the band and its under-deck strip clear of the trace's gates and towers (*over the
  band*)" → "an aqueduct crossing a standing wall's band on a span, its ramps, stairs and feet off the band and its
  under-deck strip clear of the trace's gates, towers and fixed places, a held wall as an unlocked one (*over the band*;
  the crossing table's lock and fixed-place sentences) — and every raised way's course, a viaduct's priced in a route's
  solve among them, keeping each fixed place of a standing trace outside its fixed-place zone".
* **E-P2 — §4.4 S5a (1)**: "each stretch's ends anchored on its barrier (the existing anchor kinds) with a tower at each
  anchor (§4.8)" → "… with a tower at each anchor (§4.8), never inside a standing raised way's fixed-place zone (§2.7's
  crossing table, the fixed-place sentence)".
* **E-P3 — §4.4 *Water and the waterfront***: "The trace never crosses water except at a **water gate** where a river
  passes:" → "The trace never crosses water except at a **water gate** where a river passes — never inside a standing
  raised way's fixed-place zone (§2.7's crossing table, the fixed-place sentence):".
* **E-P4 — §4.2 S3 (8)**: "under a hard filter that no (5) route crosses the claim" → "under a hard filter that no (5)
  route crosses the claim and no weld vertex lies in a standing raised way's fixed-place zone (a held one at a
  regeneration; §2.7's crossing table, the fixed-place sentence)".
* **E-P5 — §4.8's lead**: "(one the spacing or the gate law would place there moved clear of it)" → "(one the spacing or
  the gate law would place there moved clear of it; a water gate's river crossing, an anchor with its tower and a weld
  vertex never moved along, the trace keeping them out of its fixed-place zone — the fixed-place sentence)" (VM-R6T-01's
  pipeline end).
* **E-P6 — §4.8 *Towers***: "and at every barrier anchor (item 106 (a));" → "and at every barrier anchor (item 106 (a)),
  never moved off it for a raised way (§2.7's crossing table, the fixed-place sentence);".
* **E-P7 — §4.4 S5a *Trace* (3)**: "the gates, the weld vertices and an open chain's two anchors never moving" stands (the
  fixed-place sentence reads it).
* **E-P8 — the frame growth's fallback at its readers** (VAT6-r6-02's pipeline end, R7-04 (c)): §4.13's `river, coast,
  moat` cell "spans between supports on the banks, no support in water (§2.7's support step)," → "spans between supports
  on the banks, no support in water (§2.7's support step) but a frame growth's extension that no fitting course admits,
  kept and reported (its (7)),"; and §4.3 *Where it may not go*'s "a river or canal it may span between supports on the two
  banks within `viaduct.maxSpanM` and §2.7's clear-span bound" → "… and §2.7's clear-span bound (a frame growth's extension
  with no fitting course excepted, §2.7's support step (7))".
* **Sweep (blind spot (d)).** §4.1's S7 row, §4.5's casters, §4.8 *Gates* and its last paragraph, §4.11's carve and frame
  batches stand (each cites the crossing table and reads no lock). §4.13's raised-way `wall` cell is VAL-R6-07's.

### determinism (base §5–§7)

| id | sev | grade | disposition | note |
|---|---|---|---|---|
| VDC6-01 | major | major | FIX per R7-02 | E-D1: the lock row cites the lock sentence (the issue's text widened to every meeting of two similar structures); scope's END is E-S1 |
| VDC6-02 | minor | minor | FIX | §5.4's `warnings` comment as written; pipeline's and scope's ends are VPC-r6-05 and E-S3 |

**Texts determinism writes:**
* **E-D1 — §7.1's lock row** (VDC6-01): "— a drawn way across a locked entity (never a ground way, a carve or a wall
  stretch passing beneath a locked or pinned raised way's deck, which changes none of its parts: §2.7's crossing and
  way-and-channel tables, bent by the rows below as beneath an unlocked one)," → "— a drawn way across a locked entity
  (never a meeting of two similar structures — a wall and a raised way, either locked, pinned or declared, which meet by
  §2.7's crossing table with their placement held and their shape changed there: its lock sentence —, nor a ground way
  or a carve passing beneath a locked or pinned raised way's deck, nor a raised way's deck passing over a locked or
  pinned ground way (§7.4's raised-way row), none of which changes what it passes; each bent by the rows below as with an
  unlocked one),".
* **E-D2 — §7.1 *Raised ways, aqueducts and retaining walls***: "a course meeting an enceinte's trace comes down to a
  ground vertex before it and passes through the gate its ground way makes there, while an aqueduct crosses a standing
  wall on a span over its band, its course bent clear of that wall's towers and gates, never a gate" → "a course meeting
  an enceinte's trace comes down to a ground vertex before it and passes through the gate its ground way makes there — in
  a held wall too, the fate *reshaped* —, while an aqueduct crosses a standing wall on a span over its band, its course
  bent clear of that wall's towers, gates and fixed places, a held wall as an unlocked one, never a gate (§2.7's crossing
  table, its lock and fixed-place sentences)"; and the catch-all's "the span an aqueduct drawn across a standing wall takes
  over its band, clear of its towers and gates" → "the span an aqueduct drawn across a standing wall takes over its band,
  clear of its towers, gates and fixed places".
* **E-D3 — §7.1's `bend.wall.raisedCrossing` row** (VEL6-r6-04, VAT-r6-02 = VV910-r6-01, the lock sentence) → "| a hand
  `drawWall`, a moved trace vertex, a re-anchored stretch or a run a hand carve or moved river re-traces across or beneath
  a standing raised way, or a `placeGate` or a gate's slid crossing inside its under-deck strip, either side locked,
  pinned or neither (§2.7's crossing table, *beneath*, the bent-group sentence, rows W2 and W13) | bent | the stretch's
  line inside the strip held to lawful crossings by the bent-group sentence — an unlawful crossing moved to the nearest
  lawful one (under an aqueduct's span, beyond a road deck's foot through a gate there), a part along beneath or entering
  and leaving on one side moved to the strip's edge, an end moved to the edge, a fixed place kept out of the fixed-place
  zone, a gate it makes for a ground way inside the strip moved along that way clear of it — each a fate, an arch vault in
  a `vault` span under it removed (a fate; a held one's the fate *reshaped*); a `placeGate` or a slid gate moved along the
  trace clear of the under-deck strip, its stub or way following, the trace unchanged; the raised way unchanged; named in
  one line | `bend.wall.raisedCrossing` |".
* **E-D4 — §7.1, a new row after it** (the lock sentence's (G3)): "| a meeting of a wall and a raised way that no shape
  inside the raised way's under-deck strip and the points the crossing table moves to makes lawful — an aqueduct whose
  supports cannot leave a standing band within (3)'s and (4)'s bounds, a road deck that cannot come down before a
  standing trace, a stretch with no lawful crossing, a fixed place with no clear point in reach (§2.7's crossing table,
  the lock sentence's (G3)) | refused | the nearest lawful declarations (item 101 R2; `PreviewResult.alternatives`), the
  held thing neither moved nor broken | `refuse.raised.meeting` |".
* **E-D5 — §7.3 (b) 3** (VPC-r6-03's end): "or a reservation there — returns to the dry run (§7.1's outcome table)" → "or a
  reservation there (never a standing raised way or its reservation, which a re-traced run meets by §2.7's crossing
  table, *beneath*, row W2) — returns to the dry run (§7.1's outcome table)".
* **E-D6 — §7.3 item 4's fates**: "or **discarded** (only with "discard edits in scope", recorded as supersede events)."
  → "or **discarded** (only with "discard edits in scope", recorded as supersede events); a locked, pinned or declared
  wall, raised way or arch vault whose shape a meeting changes takes **reshaped** — its placement kept, the change named
  with it (§2.7's crossing table, the lock sentence's (G2)), confirmed as every fate other than *kept*, its event's undo
  restoring it."
* **E-D7 — §5.4's `ReportEntry`**: after the `works` variant add "| { kind: 'reshaped'; entity: Id /* a locked, pinned or
  declared wall, raised way or arch vault whose shape a meeting changed (§2.7's crossing table, the lock sentence's (G2))
  */; met: Id /* the structure it met */; change: 'chamberRemoved' | 'chamberLaid' | 'gateMade' | 'gateMoved' |
  'towerMoved' | 'stretchBent' | 'supportSlid' }" — derived, as every entry is, from the lifecycle event the change writes
  on the held entity at generation, a regeneration or an epoch.
* **E-D8 — §7.2's protections** (blind spot (d)): *Protection*'s "A **locked** entity — or the locked attribute paths of one
  — is a fixed input: regeneration never changes it" → "… regeneration never changes it (a wall, a raised way or an arch
  vault in its placement only: its shape where they meet is §2.7's crossing table's, the lock sentence)"; *Declared means
  held*'s "so Regenerate, New random, an epoch and every later derivation keep it" → "so Regenerate, New random, an epoch
  and every later derivation keep it — a wall's or a raised way's placement, its shape where they meet changing by §2.7's
  crossing table (the lock sentence; J144) —".
* **E-D9 — §5.3's declared row**: "no re-derivation, New random or epoch moves or removes an entity its declaring event
  pinned" → "… pinned (a wall or a raised way neither moved nor removed, its shape where they meet §2.7's crossing
  table's)".
* **E-D10 — §7.4**: the draw row's "declared, so held (§7.2)" → "declared, so held (§7.2; a wall or a raised way in its
  placement, §2.7's crossing table's lock sentence)"; the raised-way row's "its deck and piers held, as every raised way is
  from its creation (§2.7's support step (6)); a raised way over a locked way keeps its span `open`" → "its deck and piers
  held, as every raised way is from its creation (§2.7's support step (6)), its shape where a wall meets it changing by
  the crossing table (its lock sentence); a raised way over a locked way keeps its span `open`".
* **Sweep (blind spot (d)).** §5.3's gate and way-and-trace rows, §5.4's other comments, §7.1's `bend.raised.underSpan`
  row, §7.3's S7 row and §7.7 stand (searched: no lock refusal of a meeting).

### rendering (base §8, §9, §11, §12)

| id | sev | grade | disposition | note |
|---|---|---|---|---|
| VAL-R6-03 | major | major | FIX | §11.1's GeoJSON row as written; the model's *beneath* names the reader (R7-02) |

No END line lands here. **Sweep:** §8.4's casters and heightfield and §11.1's 3-D and CityJSON rows read the cap and the
`vault` reading as R7-02 keeps them (unchanged); §11.2's `report.changed` sends the new `reshaped` entries as any entry.

### V01

| id | sev | grade | disposition | note |
|---|---|---|---|---|
| VAF-R6T-04 | minor | minor | FIX | §1.2's hook row as written |

No END line lands here; §3.17.3 (2)–(3) and (6) stand (they cite the crossing table).

### V04

| id | sev | grade | disposition | note |
|---|---|---|---|---|
| VAT6-r6-01 | major | major | FIX per R7-06 | T-V4-63's bar in R7-06 (b)'s one wording (the issue's text, with the "no arch vault where …" clause) — E-V4-5 |
| VV34-r6-01 | minor | minor | FIX | T-V4-63's two clauses as written — E-V4-5 |
| VV34-r6-03 | major | major | FIX per R7-04 | §1b.2's trigger cell names the event R7-04 (b) rules — E-V4-1 |
| VV34-r6-04 | minor | minor | FIX | V04 §8's U5 tests cell as written |

**Texts V04 writes** (its own FIXes, and the ends of VAL-R6-01 = VEW-r6-02 and VV56-r6-02):
* **E-V4-1 — §1b.2's `ArchVaults.reconcile` row** (VV34-r6-03 per R7-04 (b)): "`wallToWay`, an absorbed record dropped;" →
  "`wallToWay`, `absorbWall` where no run of the old wall over the span is left, and the `dismantle` (an epoch's or a hand
  `convert`'s) that takes the last run of an absorbed record over it (§2.7's crossing table, row W8);".
* **E-V4-2 — the arch-vault entity row (l. 867)**: "a wall the epoch laid, moved or removed over a `vault` span, V06 §2.1)"
  → "a wall the epoch laid, moved, absorbed or removed over a `vault` span — the last run of an absorbed record it
  dismantled among them —, V06 §2.1)"; and "or a wall comes to stand over its span (laid again, its id kept by its key,
  when none stands over it any more)" → "or a wall comes to stand over its span — a locked one too, its lock kept with its
  key (§2.7's crossing table, the lock sentence) — (laid again, its id and lock kept by its key, when none stands over it
  any more)".
* **E-V4-3 — §3.10's epoch reconcile bullet**: "or whose `vault` span a wall the epoch laid, moved or removed now stands
  over or no longer stands over" → "or whose `vault` span a wall the epoch laid, moved, absorbed or removed — the last run
  of an absorbed record it dismantled among them — now stands over or no longer stands over"; and "and lays again those
  of one no wall stands over any more" → "and lays again those of one no wall stands over any more (an absorbed ring's
  once its last run there is dismantled, §2.7's crossing table, row W8)".
* **E-V4-4 — UC18** (VAL-R6-01's end): "a reconcile or regeneration that would re-lay, collapse or delete it keeps it" →
  "a reconcile or regeneration that would re-lay, collapse or delete it keeps it — save a wall coming to stand over its
  span: its span held and its lock kept with its key, its chamber is not laid while the wall stands and is laid again,
  locked, with its id once none does (§2.7's crossing table, the lock sentence), the fate *reshaped* by hand and a
  `reshaped` entry at a regeneration or an epoch —"; and T-V4-80's "(i) UC18," → "(i) UC18 — with, on a CITY fixture
  whose aqueduct's `vault` span holds a locked arch vault, an epoch circuit and, on a second run, a hand `drawWall`
  across that span: the chamber not laid while the wall stands, its lock and id kept, a `reshaped` entry and the fate
  *reshaped*, the wall's delete laying it again locked with the same id; and with a declared placement seated in that
  vault, the circuit crossing under another span and the hand `drawWall` refused `refuse.locked` naming the building —,".
* **E-V4-5 — T-V4-63** (VAT6-r6-01, VV34-r6-01): "after each commit every arch vault's key names a standing span of use
  `vault`" → "after each commit every arch vault's key names a span of the way whose `use` is `vault` and over which no
  wall stands — its chamber open under a standing span, `collapsed` under one whose span or a bounding support is
  `ruined` or `cleared` (V04 §3.5.4 (d) (2)) — and no arch vault stands where its span no longer exists, is `open` or lies
  under a wall (V04 §3.5.4 (d) (3))"; "a span's `use` edit lays or removes exactly that vault and survives a regeneration"
  → "a span's `use` edit lays or removes exactly that vault (none in a span a wall stands over, V04 §3.5.4 (d) (1)) and
  survives a regeneration"; "the arch vault of every old `vault` span between two of them (§2.7's support step (7))" →
  "the arch vault of every old `vault` span between two of them that no wall stands over (§2.7's support step (7); V04
  §3.5.4 (d) (1))".
* **E-V4-6 — §3.5.4 (d) (1) and (3)**: (1)'s "the span is read `open` while a wall's band or strip lies there" → "the span
  is read `open` while a wall's band or strip lies there, or a run of an absorbed record not yet `dismantled` crosses it
  (§2.7's crossing table, row W8), a locked chamber too (its lock sentence)"; (3)'s "or over which a wall now stands," →
  "or over which a wall now stands (a locked one too, its lock kept with its key for its re-lay),".
* **E-V4-7 — §3.5.4 (d)'s declared placement**: after "seats the use on one plot equal to the chamber's floor and one
  single-storey building under its ceiling" add "— the span then held against every wall (§2.7's crossing table,
  *beneath*: a held building in an arch vault) —".
* **Sweep (blind spot (c)).** T-V4-62's "an arch vault in exactly each `vault` span no wall stands over" and "each
  `collapsed` exactly when V04 §3.5.4 (d) (2) says so" stand (they already read R7-06 (b)'s wording); the edit row (l.
  2529) stands.

### V05

| id | sev | grade | disposition | note |
|---|---|---|---|---|
| VV56-r6-01 | major | major | FIX | R7-04 (a): V05 §3.16 (4)'s raised and retaining rows, §3.16 (5), §3.23's landfall row and T-V5-14 as written; V06's END is E-V6-6; the model's W12 cell is R7-02's |

No other END line lands here; T-V5-14's round-6 passage over each state stands as row W12's test.

### V06

| id | sev | grade | disposition | note |
|---|---|---|---|---|
| VAL-R6-05 | minor | minor | FIX | §3.18.1 (6) as written |
| VAP-r6-04 | major | major | FIX per R7-06 | T-V6-64 in R7-06 (b)'s one wording — E-V6-10 |
| VAT6-r6-03 | minor | minor | FIX per R7-06 | §8's E3 and E8 cells as written, with the sweep's `topple` runs at E5 — E-V6-11 |
| VEW-r6-04 | major | major | FIX per R7-02 | §3.19 (5) as written, its impassable list naming fixed places too and the meeting citing the lock sentence — E-V6-4; scope's END is E-S1, T-V6-73's E-V6-7 |
| VCS-r6-04 | minor | minor | FIX | one text with VV56-r6-04 — E-V6-8 (2) |
| VV56-r6-03 | minor | minor | FIX per R7-06 | rows W5, W6 and W8 over the state sweep, in place of the issue's lists — E-V6-7 (1), E-V6-8 (2), E-V6-3 |
| VV56-r6-04 | minor | minor | FIX | as written — E-V6-8 (1)–(2) |
| VV56-r6-05 | minor | minor | FIX | H-AQUA as written |
| VV56-r6-06 | minor | minor | FIX | T-V6-73 as written; scope's END is E-S2 |

**Texts V06 writes** (its own FIXes, and the ends of VV56-r6-01, VV56-r6-02, VAL-R6-01 = VEW-r6-02, VAT6-r6-02,
VAP-r6-01, VAP-r6-02, the bent-group and fixed-place sentences):
* **E-V6-1 — §2.1's `EpochScope.raised` and W64**: "or whose `vault` span a wall the epoch laid, moved or removed now stands
  over or no longer stands over (V04 §3.5.4 (d) (1))" → "or whose `vault` span a wall the epoch laid, moved, absorbed or
  removed — the last run of an absorbed record it dismantled among them — now stands over or no longer stands over (V04
  §3.5.4 (d) (1); §2.7's crossing table, row W8)", in both places.
* **E-V6-2 — §2.8's `absorbWall` comment**: "its strips re-join the blocks beside them" → "its strips, the band with them,
  re-join the blocks beside them (a `vault` span the old wall stood over is read `open` while a remaining run crosses it
  and laid again when the last is `dismantled`: §2.7's crossing table, row W8)".
* **E-V6-3 — T-V6-11**: "V04 laying again the arch vault of a `vault` span the old wall stood over once the record is
  dropped" → "V04 laying again the arch vault of a `vault` span the old wall stood over in the epoch whose dismantling
  takes the last run of the absorbed ring over it (§2.7's crossing table, row W8; H-AQUA's span over its CITY ring), and
  the same absorb over the state sweep (§13.2; rows W8 and W4 at an epoch) — each an *unchanged meeting*, the runs
  dismantled in time as any, the vault laid again so, `collapsed` where its span has fallen".
* **E-V6-4 — §3.19 (5)** (VEW-r6-04): "Locked, pinned and declared entities, dossier-listed buildings, every other raised
  way's supports, enceinte towers and gates, and V05's `skyAccessObstacles` (V05 §2.3b) are **impassable**" → "Locked,
  pinned and declared entities, dossier-listed buildings, every other raised way's supports, enceinte towers, gates and
  fixed places (§2.7's crossing table, the fixed-place sentence), and V05's `skyAccessObstacles` (V05 §2.3b) are
  **impassable** to the course's supports, ramps, stairs and feet and to its clearing ((7)); a course passes over a
  locked, pinned or declared ground way on a span, as over any way (item 244's clearance; §7.4's raised-way row), and
  meets a locked, pinned or declared wall by §2.7's crossing table as an unlocked one (its lock sentence), nothing of
  either written"; and "its under-deck strip clear of the curtain's towers and gates (impassable above)" → "its under-deck
  strip clear of the curtain's towers, gates and fixed places (impassable above)".
* **E-V6-5 — §3.7.1**: "a standing raised way's under-deck strip, supports, ramps, stairs and feet excepted where the
  trace meets it (§2.7's crossing table, *beneath*)" → "… excepted where the trace meets it (§2.7's crossing table,
  *beneath*) — never a `vault` span whose chamber seats a held building, whose strip widened by the wall strips' widths
  the trace keeps clear, nor a fixed place's zone (*beneath*; the fixed-place sentence) —".
* **E-V6-6 — §3.19.2 (3) and (4)**: (4)'s "a landfall ruins the spans and supports it covers whatever their state" → "a
  landfall ruins the spans and supports it covers, standing or already `ruined`, a `cleared` one kept `cleared` (V05
  §3.16 (4))" (VV56-r6-01's end); (3)'s "so no chamber stands under a fallen span at any batch" → "so no chamber stands
  open under a fallen span at any batch".
* **E-V6-7 — T-V6-73**: (1) after "the aqueduct standing on its own supports (§2.7's crossing table, *unchanged
  meeting*);" add " the same 20 epochs over the state sweep (§13.2; row W5), the aqueduct's state made before the first
  epoch — each an *unchanged meeting*, the run's draws as on any run and nothing of the raised way written;"; (2) after
  "— *over the band*, the gap left a gap beneath the arch, no `repairWall`;" add " and on a third run across a CITY ring
  drawn by hand (locked by its drawing) — *over the band*, no wait, nothing of the ring written (the lock sentence);";
  (3) VV56-r6-06's text ("`raised.waited` at each epoch" → "`raised.waited` at each CITY and METROPOLIS epoch while the
  CITY ring's trace stands").
* **E-V6-8 — T-V6-47**: (1) VV56-r6-04's script, as written; (2) after "the delete's undo restoring the cap" add "; then
  the breached span repaired by `repairRaised` — the cap back, no wall op; and, in the cells' own order, an epoch circuit
  laid across the aqueduct after a span over its planned band fell `ruined` and after a support there was `cleared` — the
  run at its own top beneath the fallen span, the trace through the cleared ring as open ground (V06 §3.7.6 (5)) — and an
  epoch contraction laid after a support by its planned line was `cleared` — the trace through its former ring (T110-2
  (7); §2.7's crossing table, W1·C3, W1·C5); the epoch circuit across its standing aqueduct over the state sweep (row W1
  at an epoch; T110-2 (4)); the CITY ring's pathway opening its gates (V06 §3.7.2 (1)) beside its standing aqueduct and
  over the state sweep (row W6) — no gate it opens under a deck" (VCS-r6-04, VV56-r6-04, VV56-r6-03 as one text); (3)
  after "no junction with a raised way, the raised ways unchanged" add "; each `wallToWay` run again with the raised ways
  locked and with them pinned, no `refuse.locked`, and of its CITY ring over the state sweep (row W7), the ring road by
  §2.7's way-and-channel table (row c) read at that state" (VAP-r6-01's and VAP-r6-02's V06 ends).
* **E-V6-9 — §3.7.6 (5)**: "(a stretch laid through no cost field bent locally)" → "(a stretch laid through no cost field
  by the bent-group sentence)"; "no gate or tower in the under-deck strip" → "no gate or tower in the under-deck strip and
  no fixed place in its fixed-place zone (the fixed-place sentence)"; and "**continuity**: a trace never waits for a raised
  way;" → "**continuity**: a trace never waits for a raised way but by §2.7's crossing table's (G3) or for a held building
  in an arch vault (*beneath*);".
* **E-V6-10 — T-V6-64** (VAP-r6-04): "(a chamber under every standing `vault` span no wall stands over, none under a fallen
  one or under a wall, §2.7's crossing table)" → "(every arch vault's key names a span of the way whose `use` is `vault`
  and over which no wall stands — its chamber open under a standing span, `collapsed` under one whose span or a bounding
  support is `ruined` or `cleared` (V04 §3.5.4 (d) (2)) — and no arch vault stands where its span no longer exists, is
  `open` or lies under a wall, V04 §3.5.4 (d) (3); §2.7's crossing table)".
* **E-V6-11 — §8's E3 and E8 cells** (VAT6-r6-03): as written, and E3's cell adds "; the state sweep's `topple` runs of
  T-V6-11, T-V6-47 and T-V6-73 at E5, which builds the hazards".
* **E-V6-12 — §3.1's *Protection***: "a locked or pinned entity is never struck, converted or moved" → "a locked or pinned
  entity is never struck, converted or moved (a wall, a raised way or an arch vault held in its placement, its shape
  changing where they meet: §2.7's crossing table, the lock sentence)".
* **E-V6-13 — §2.10's `raised` section** (VAT6-r6-02's end): add `extendedPastBound: number /* frame-growth extensions
  kept past a support-step bound with no fitting course — a support in water or a pier past maxPierM (§2.7's support step
  (7)) */`.
* **Sweep (blind spots (a)–(c)).** W68's middle cell, §3.19's lead, §3.19 (7), §3.2's reconcile paragraph, J-V6.91, J-V6.114
  and J-V6.140, V06 §7's T110-2 and T114 rows and §7's lead stand (searched).

### V07

| id | sev | grade | disposition | note |
|---|---|---|---|---|
| VAL-R6-02 | major | major | FIX | R7-04 (e): §3.5a (3) as written (its first form); the base's way-and-channel lead now says "whatever a span's `state`" (R7-02) |
| VAL-R6-06 | minor | minor | FIX per R7-06 | row W9 over the state sweep — E-V7-1, one text with VV78-r6-01 |
| VV78-r6-01 | minor | minor | FIX per R7-06 | the report clause as written, the hand-off states by the sweep — E-V7-1 |
| VV78-r6-02 | minor | minor | FIX per R7-06 | ## 8's V-M3 cell, T-V7-48's tier cell and §1 (14) as written, with the sweep's runs — E-V7-3 |

**Texts V07 writes:**
* **E-V7-1 — T-V7-48** (VAL-R6-06, VV78-r6-01): after "its line bent to cross the declared aqueduct under a span and to
  pass beyond each ramp's foot, no ramp, stair or foot in it," add " each crossing of the palisade's line with a deck line
  reported `W_RAISED_CROSSING` once (§2.7's crossing table, row W1),"; and after "its deck extended by a frame growth
  before the hand-off down, carried down and meeting the palisade as a standing raised way does;" add " that CITY fixture
  handed down over the state sweep (§13.2; row W9), each state made before the hand-off — the hand-off writing nothing of
  the raised way or the ring's runs, and the palisade read by §2.7's crossing table, *beneath*, at that state (its run at
  its own top beneath each fallen span, no chamber under the `vault` span, the band whole across a cleared support's
  footprint);".
* **E-V7-2 — §3.5a (4)**: "its line bent locally to cross an aqueduct under a span and a road deck's carried way beyond its
  foot, never across a ramp, stair or foot;" → "its line by the crossing table's bent-group sentence — crossing an aqueduct
  under a span and a road deck's carried way beyond its foot, never across a ramp, stair or foot, never running along
  within or ending inside an under-deck strip — and its anchors by its fixed-place sentence;"; and "A hand aqueduct drawn
  across the standing palisade crosses it *over the band*, on a span," → "A hand aqueduct drawn across the standing
  palisade — drawn by hand and so locked, or not (the crossing table's lock sentence) — crosses it *over the band*, on a
  span,".
* **E-V7-3 — ## 8 and §1 (14)** (VV78-r6-02): as written, ## 8's V-M3 cell adding "and T-V7-48's state-sweep runs, its
  `topple` runs at the later of that exit and V06's E5".
* **Sweep (blind spot (a)).** §3.12's hand-off, §3.12a (4)'s ruin abutment, §3.17's palisade row and §3.5a (5) stand
  (searched; §3.5a (5)'s readers are V11's END, VV1112-r6-02).

### V09

| id | sev | grade | disposition | note |
|---|---|---|---|---|
| VAT-r6-04 | minor | minor | FIX | `bend.raised.underSpan`'s wall form and T-V9-52's words, as written |

**Texts V09 writes** (its own FIX, and the ends of VAT-r6-02 = VV910-r6-01, VEL6-r6-04, VDC6-01 and the lock sentence's
(G2)–(G3)):
* **E-V9-1 — §4.9's `bend.wall.raisedCrossing` row**: after its gate form add "— and, for a stretch moved off the under-deck
  strip (one along beneath it, entering and leaving it on one side, or ending under it), "The wall keeps clear of {way},
  {m} m off your line." —"; its source cell → "§7.1's outcome row for a hand stretch across or beneath a standing raised
  way, or a `placeGate` or a gate's slid crossing inside its under-deck strip, either side locked, pinned or neither
  (§2.7's crossing table, *beneath*, the bent-group sentence, rows W2 and W13)".
* **E-V9-2 — T-V9-52**: after "with `bend.wall.raisedCrossing`'s gate form," add " a gate of that wall slid by its grip into
  the strip moves back along the trace clear of it, its road following, the trace unchanged, with the same form, a wall
  drawn along beneath the viaduct moves to the strip's edge with the line's keep-clear form, and an aqueduct drawn across a
  wall drawn by hand crosses it on one of its arches with no `refuse.locked`,"; and VAT-r6-04's "in its wall form".
* **E-V9-3 — §4.9, a new row after `bend.raised.around`**: "| `refuse.raised.meeting` | "{thing} cannot meet {other} here
  without moving it; choose one of the marked places." — `{thing}` the drawn or edited structure's name, else its kind's
  word; `{other}` the wall or raised way it would meet | `button.chooseMarked` commit(`alternatives`, each `button.putAt`)
  · `button.showWhy` why | §7.1's row for a meeting of a wall and a raised way that no local shape makes lawful (§2.7's
  crossing table, the lock sentence's (G3)) |".
* **E-V9-4 — `report.moved.<kind>`**: after "`works.finish` "Work on {works} is finished."" add " · `reshaped` "{entity}
  keeps its place; its shape changed where it meets {met}."".
* **E-V9-5 — §5.5's fates sheet**: its head's counts add the fate *reshaped* in plain words ("2 keep their place but
  change shape where walls and raised ways meet"), and its rows for that fate add the change in words after the thing's
  name.
* **E-V9-6 — §4.20.2 (4)'s last words**: "— each the same on a raised way locked, pinned or neither." → "— each the same
  with either side locked, pinned or neither, a held thing's change shown as the fate *reshaped* (§2.7's crossing table,
  the lock sentence)."
* **Sweep (blind spot (b)).** `bend.raised.wall`, `bend.wall.aqueductArch`, `bend.raised.underSpan` (VAT-r6-04) and
  `bend.raised.around` stand otherwise; §4.20.6 (2)'s panel and why card stand.

### V10

| id | sev | grade | disposition | note |
|---|---|---|---|---|
| VEL6-r6-01 | major | major | FIX | the raised-way read row and T-V10-41, as written |

No other END line lands here (blind spot (b) searched: V10 states no crossing or lock rule).

### V11

| id | sev | grade | disposition | note |
|---|---|---|---|---|
| VV1112-r6-02 | minor | minor | FIX, amended | row 80's reader cell and W50 as written, and "S5a and S7 (a wall meeting a raised way's under-deck strip at `structure.stripMarginM`" → "S3, S5a and S7 (a wall meeting a raised way's under-deck strip, and its fixed-place zone, at `structure.stripMarginM` — S3's trace at a regeneration among them" (the crossing table's fixed-place sentence and the lock sentence's (G1) read the margin) |

**END line V11 writes:** §3.24.2's readers: "(`stripMarginM`, §4.6; a wall meeting it by §2.7's crossing table, its gates
and towers kept out of it)" → "(`stripMarginM`, §4.6; a wall meeting it by §2.7's crossing table, its gates, towers and
fixed places kept out of it and a held thing's reshape bounded by it)".

### kernel, V02, V03, V08, V12

No issue and no END line this round (blind spots searched: none states a crossing, lock or arch-vault rule of the family);
these seats do not run.

### Totals

53 issues: **50 FIX** (21 as written, 27 per a ruling, 2 amended — each named in its note), **3 MERGED**
(VEW-r6-02 into VAL-R6-01, VV910-r6-01 into VAT-r6-02, VPC-r6-06 into VAL-R6-07), **0 INVALID**. Grades: reported 28
major, 25 minor; graded the same (no regrade). END lines: under scope (11), pipeline (7, and E-P7 a text confirmed), determinism (10), V04 (7), V06
(13), V07 (3), V09 (6), V11 (1).

## Held for round 8

Not ruled this round (J144: the family is worked alone; these resume with the full sweeps once a family-focused verify
finds no major in the family). The 28 ids of `docs/validation/coherence/work/held-r8/`, by owner:
V01 — VAT-r6-03, VV12-r6-01, VV910-r6-03; V02 — VV12-r6-02; V03 — VAF-R6T-01, VAT6-r6-04; V04 — VV34-r6-02; V07 —
VAL-R6-04; V08 — VAH-r6-01, VAH-r6-02, VEL6-r6-03, VV78-r6-03; V09 — VAT-r6-06, VV910-r6-02; V10 — VAT-r6-05,
VV910-r6-04, VV910-r6-05; V11 — VV1112-r6-03; V12 — VV1112-r6-01; determinism — VAH-r6-03; rendering — VAT-r5-02,
VAT-r6-01, VRC6T-01, VRC6T-02, VRC6T-03, VRC6T-04; scope — VAP-r6-03, VCS-r6-05.

## Part I — canon changes (appended to canon.md as one dated ruling)

The dated ruling "2026-10-02 (adjudication round 7, family-only under J144)" at the end of
`docs/validation/coherence/canon.md` records, by pointer to the rulings above: the family round's scope and supersessions
(R7-01); the owner's lock rule at §2.7 as **the lock sentence** — a lock, pin or declaration holds a similar structure's
placement, never its shape where a wall and a raised way meet, with the guards (G1) local, (G2) shown (the fate
*reshaped*, the report entry `reshaped`) and (G3) no lawful local shape (`refuse.raised.meeting`; not built or waiting),
buildings held and a wall giving way to a held building in an arch vault; **the bent-group sentence** (lawful crossings
only inside an under-deck strip); **the fixed-place sentence** (water gates, anchors and weld vertices kept out of the
fixed-place zone by whichever comes later); both tables complete over every wall event, raised-way state, path and lock,
each cell's test holding its case through **the state sweep** (R7-02, J144 binding, its readings J122 and vetoable,
superseding R6-02's (D5) parenthesis, C8, the bent-group list, W2's, W8's and W13's cells and the way-and-channel table's
rows (c) and (e) where R7-02 rewrites them, UC18 for a wall over an arch vault, and V06 §3.19 (5)'s impassable list for
held walls and ground ways); generation order (R7-03); the landfall's ladder, the absorbed ring's vault, the frame
growth's bound, `wallToWay`'s dry run, a cleared span at a village (R7-04); the span's `use` at every reader (R7-05); the
arch-vault bars' one wording and every family test (R7-06); and the bookkeeping (R7-07). Nothing is ruled INVALID this
round; 28 findings are held for round 8.
