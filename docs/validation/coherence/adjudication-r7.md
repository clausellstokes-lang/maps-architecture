# Coherence adjudication — round 7 (FAMILY-ONLY: raised way × wall, J144)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/adjudicate-r7; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/adjudicate-r7`, 2026-10-02; a fresh run under J144 — the two earlier runs' CHECKPOINT lines are void and their skeletons, `adjudication-r7-withdrawn-J142.md` and `adjudication-r7-stopped-full-scope.md`, were not resumed; `narrowing-r7.md` read as not binding)
- [x] P1 inputs: adjudication-r6 (R6-02 whole, Part P), round-6 repair files (0 ruling requests in 17 files; family hand-offs: V04 locked arch vault, V06↔scope take-over row and V06 §7's lead, determinism→pipeline S3 (10), determinism→V09 `bend.raised.underSpan`, model→pipeline/V11 row-a citations), the 53 family findings read whole
- [x] P2 live text at every site the family cites (§2.7's support step and both tables, §7.1's lock and bend rows, §7.2, §7.3 (b) 3 and item 4, §7.4's raised-way row, §4.2 S3 (5)–(10), §4.3, §4.4 S5a, §4.8, §4.11, §4.13, §5.4, T110-2; V04 §3.5.4 (d), UC18; V05 §3.16; V06 §3.7, §3.19, §3.19.2, §7, §8; V07 §3.5a, T-V7-48; V09 §4.9); the orchestrator's guardrails G1–G3 (2026-10-02, PROGRESS J144 row) taken into the lock sentence
- [x] P3 the family ruling R7-02: the lock sentence (J144 with G1–G3), the four outcomes amended, the bent-group and fixed-place sentences, the columns, the paths-and-tests note, the crossing table (13 rows × 13 columns) and the way-and-channel table written whole, (M1)–(M2), the attack (15), the equivalence, the veto list (1–17), the Ends
- [x] P4 rulings R7-03 – R7-07 (generation order, epochs and decay, readers, tests and the state sweep, bookkeeping)
- [x] P5 Part H: 53 issues — 50 FIX (21 as written, 27 per a ruling, 2 amended), 3 MERGED, 0 INVALID; no regrade; END lines under scope, pipeline, determinism, V04, V06, V07, V09, V11
- [x] P6 held list (28), table of contents, canon dated ruling "2026-10-02 (adjudication round 7, family-only)" appended, result saved, LANDED

PROGRESS (lane `coherence/adjudicate-r7-laws`, 2026-10-02, J146: laws plus examples)
- [x] L1 read whole: PROGRESS J144 – J146; this file (R7-01 – R7-07, Part H, Part P passes 1–2); probe-r7c-locks, -gen, -time (40); items 110 (b), (f), 114, 101 R2 and R13; J141's standard; §2.7's live support step, §5.3, T110-2
- [x] L2 Part L written before Part F: the terms, laws 1–4, the check (§5.3's row, T110-4), five corrections across the examples, the veto list restated (19)
- [x] L3 R7-02 marked worked examples (banner; spots corrected "(J146)"; the reach and guards shortened to the laws)
- [x] L4 "Part P — Pass 3 under the laws (J146)": 40 decided — 35 CLOSED BY LAW, 5 LAW REFINED, 0 OWNER-RULE CLASH, 0 REJECTED; passes 1–2 re-checked, 6 amendments superseded in part
- [x] L5 ENDs: E-M1 (the laws at §2.7 (6)), E-D13 – E-D16, E-S13 – E-S16 (T110-4 the property bar), E-P11 – E-P14, E-R2, E-V6-17 – E-V6-19, E-V7-5 – E-V7-7, E-V9-9, E-V10-1 – 2, E-V12-1; the citation rule at Part H's head; table of contents, Summary, Part I; result saved, LANDED


## How to read this file

**Who reads what.** This is a FAMILY-ONLY round (the owner, J144: "Why don't you just focus entirely on solving this
problem first before moving on?"). Each repair seat of round 7 reads (1) its row of the table of contents, (2) R7-01 and
R7-02 whole, and every other ruling its row lists, and (3) its unit's heading in Part H: the disposition of each issue it
owns, then its **END lines** — the exact text this unit writes for a fix another unit owns. A seat's whole work is under
its own heading; a unit that owns no issue but holds END lines runs (R7-01 (4)). (J146) **Part L comes first:** since the
owner chose laws plus examples (PROGRESS J146), Part L — the family's laws, normative — is read whole before anything
else, and R7-02 – R7-07 and Part P are its worked examples: where an example and the laws differ the laws govern, a case
no example lists is decided by the laws, and a finding in this family is MAJOR only where the laws give two outcomes or
none, contradict an owner rule, or no bar checks an invariant of law 1 (an example's slip is at most a minor). Every text
a seat writes cites "§2.7's laws" with the law's number and never restates them (Part H's head). Part P (the probe passes' decisions)
records why each spot marked "(amended, PRB7-nn)" or "(amended, PRB7B-nn)" changed; the text a seat writes is the amended text in place. R3-01 – R3-03, R4-01, R5-01 and R6-01
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

**Precedence used** (principle (3)): the owner's words (J144 and J146 above all for this family; file g items 101, 110, 114) > an f item or a J-VI decision > (J146) Part L's laws (their home §2.7's support step (6)) > their worked examples > the base's canonical home > a volume's restatement. A reading of the owner's words made by
the program (J122) says so and is **vetoable**; the family's veto list is restated in Part L (J146; R7-02's list 1–22 kept as the record). adjudication-r2.md – r6.md
stay binding except where an entry below supersedes one of their rulings, cells or END lines by name.

**No ruling id in design text** (R3-02, kept). Every text below that a seat writes into the design names a design home,
never an `R7-nn`, `R6-nn`, `PRB6-nn`, `PRB7-nn`, `PRB7B-nn` or verifier id; the markers "(amended, PRB7-nn)" and
"(amended, PRB7B-nn)" that Part P leaves at each amended spot are this file's and are never written into the design (a seat drops them as it writes the text). J-rows (J122, J144) are design citations and may be written. The new
design names this round introduces — each defined once at §2.7 and cited everywhere else — are: **the lock sentence**
(§2.7's crossing table, with its guards (G1) *local*, (G2) *shown* and (G3) *no lawful local shape*); **the similar
structures**; **the bent-group sentence** (with *the bent group* and *a lawful crossing*); **the fixed-place sentence**
(with *fixed places* and *the fixed-place zone*); the edit fate **reshaped** (§7.3 item 4); the report entry kind
`reshaped` (§5.4); the refusal key `refuse.raised.meeting` (§7.1, V09 §4.9); the epoch count
`raised.extendedPastBound` (V06 §2.10); and **the state sweep** (§13.2's T110-2); and, added by Part P (amended, PRB7-01,
PRB7-08, PRB7-16): **a held building's widened strip**, **the edge** and *Line and band* (at §2.7's *beneath*), the lock
sentence's *Its reach*, *Strips, zones and nearest points* (before the four outcomes), F-WALL's raised-way
rung with the warning `W_RAISED_MEETING` (§5.2, §5.4) and V07's ladder row F-V-RAISED (V07 §3.13); and, added by Part P's
pass 2 (amended, PRB7B-01, PRB7B-02, PRB7B-08): *Several raised ways* and the footprint reading (at *Strips, zones and
nearest points*) and F-REDERIVE's raised-way rung (§5.2); and, added by J146, **§2.7's laws** (laws 1–4 with their terms: *meeting*, *wall-like
structure*, *road deck*, *the band*, *the wall strips*, *the strip*, *the ends*, *standing support*, *beyond the foot*,
*footprint*, *fixed place*, *the zone*, *a held building's strip*, *anything across a strip*, *placement*, *shape*, *the
reach*, *newer*), §5.3's law-1 row and §13.2's **T110-4**. A citation writes "(§2.7's crossing
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
  sentence** — a river's water gate, an anchor's tower, a weld vertex and a castle's town-side gate (amended, PRB7B-03)
  never move along the trace: whichever of the wall and the raised way comes later keeps them out of the strip widened
  by the wall strips. Both tables are written
  complete over the four axes the round asks — every wall event (14 rows — W14, a wall re-sectioned on its kept trace,
  added by Part P (amended, PRB7-07) — and a retaining wall's sentence), every raised-way
  state (13 columns), every path (generation, regeneration, epoch, village, hand) and the lock axis (one case, column
  C8) — each cell an outcome and a test that holds it, the volume and base tests running each row over **the state
  sweep** (§13.2) so that no cell names a test that never sets up its state.
* **The other groups are ruled once (R7-03 – R7-07):** generation order (S3's gate routes re-solved off a priced deck
  across the stage-1 boundary; S5a's pull keeps a deck crossing under its deck; T110-2 (6)'s New random by the pull);
  epochs and decay (a landfall only steps a part down its ladder; an absorbed ring's vault laid again when its last run
  there is dismantled; a frame growth's extension past a bound bent, else kept and reported; `wallToWay`'s re-route reads
  the state after the op; a cleared span crossed by the base's rule at a village); readers (GeoJSON and the clerk read a
  `vault` span as *beneath* reads it, citing it (amended, PRB7B-11); the span rule's home at V01; V11's row 80 readers); tests (one wording for the
  arch-vault bars; the state sweep; castle paths; the scheduling cells); bookkeeping (`W_RAISED_CROSSING` by stage;
  §4.13's rung; the stopped moat's strip; the slide bound; row (a)'s test; `EpochScope.raised` at the caller).
* **Dispositions of the 53 family issues:** see Part H's totals. **Held for round 8:** 28 ids, listed, not ruled.
* **Probe pass 1 (Part P):** 29 findings of `probe-r7.md` decided — 13 ACCEPT, 15 ACCEPT AMENDED, 1 REJECT — and amended
  in place, each amended spot marked "(amended, PRB7-nn)".
* **Probe pass 2 (Part P):** 17 findings of `probe-r7b.md` decided — 3 ACCEPT, 14 ACCEPT AMENDED, 0 REJECT — and amended
  in place, each amended spot marked "(amended, PRB7B-nn)"; the family's veto list now runs 1–22.
* **(J146) The family's laws (Part L).** The owner chose laws plus examples (PROGRESS J146). Part L states the family
  once, normatively, at §2.7's support step (6) as **§2.7's laws**: law 1, what a valid meeting is (ten invariants after
  every commit on every path, over terms defined once as functions of what stands — a fixed place a class, several raised
  ways their union, a village kind its section); law 2, one way to resolve any meeting (the newer structure laid lawfully
  first, else the standing one's gates, posterns and towers moved along its line, else the op gives way by path, a road
  deck's carried way gated by the gate law — never a placement, a fixed place, a support or a held building); law 3, one tie-break (least
  displacement, then a fixed order); law 4, every op on every path re-checks in its own commit, every held reshape shown.
  Law 1 is checked at runtime (a §5.3 row) and by one property bar, T110-4. R7-02 – R7-07 and Part P become worked
  examples; the veto list is restated (19 items, each with its law).
* **(J146) Probe pass 3 under the laws (Part P):** 40 findings of `probe-r7c-locks.md`, `probe-r7c-gen.md` and
  `probe-r7c-time.md` decided — 35 CLOSED BY LAW, 5 LAW REFINED, 0 OWNER-RULE CLASH, 0 REJECTED; passes 1–2 re-checked,
  six amendments superseded in part (PRB7-01, PRB7-08, PRB7B-03, PRB7B-05, PRB7B-10, PRB7B-12).
* **Canon:** one dated ruling appended to `canon.md` (Part I).

## Table of contents by unit

Each row: the issues the unit owns, the texts it writes (its own FIXes' and the END lines under its heading), and the
rulings it reads whole (every seat reads R7-01 and R7-02, and R3-01 – R3-03, R4-01, R5-01 and R6-01, which stand); then its
heading in Part H.

| unit | issues | texts under its heading | rulings binding it (with R7-01, R7-02) | its heading |
|---|---|---|---|---|
| scope (base §0–§1, §13–§17, the index, INDEX.md) | 8 | E-S0 – E-S16 (E-S11 – E-S12 amended, PRB7-05, PRB7-16; E-S0, E-S2 – E-S5, E-S9 and E-S12 amended, Part P pass 2; E-S13 – E-S16 new and E-S0, E-S4, E-S9, E-S10 amended, J146) | Part L, R7-03, R7-04, R7-06 | Part H · scope |
| model (base §2) | 12 (2 merged) | E-M1 (J146: Part L's laws at (6), normative); R7-02's Blocks 1–2 as worked examples, (M1)–(M2), (M5) (amended, PRB7-18), (M6) (amended, PRB7B-11); (7)'s and (3)'s sentences | Part L, R7-04, R7-07 | Part H · model |
| kernel (base §3) | 0 | — | — (does not run) | Part H · kernel, V02, V03, V08 |
| pipeline (base §4, §10, PART II, PART III) | 8 (1 merged) | its FIXes; E-P1 – E-P14 (E-P9 – E-P10 amended, PRB7B-12, PRB7B-11; E-P11 – E-P14 new and E-P4 amended, J146) | Part L, R7-03, R7-04, R7-07 | Part H · pipeline |
| determinism (base §5–§7) | 2 | E-D1 – E-D16 (E-D11 amended, PRB7-16; E-D12 amended, PRB7B-08; E-D13 – E-D16 new and E-D1, E-D3, E-D4, E-D6, E-D10, E-D11 amended, J146) | Part L, R7-07 | Part H · determinism |
| rendering (base §8, §9, §11, §12) | 1 | its FIX (per R7-05); E-R1 (amended, PRB7B-11); E-R2 (J146) | Part L, R7-05 | Part H · rendering |
| V01 | 1 | its FIX (per R7-05); E-V1-1 (amended, PRB7B-11) | R7-05 | Part H · V01 |
| V02 | 0 | — | — (does not run) | Part H · kernel, V02, V03, V08 |
| V03 | 0 | — | — (does not run) | Part H · kernel, V02, V03, V08 |
| V04 | 4 | E-V4-1 – E-V4-8 (E-V4-8 amended, PRB7B-11; E-V4-2, E-V4-4 and the sweep amended, J146) | Part L, R7-04, R7-06 | Part H · V04 |
| V05 | 1 | its FIX | R7-04 | Part H · V05 |
| V06 | 9 | E-V6-1 – E-V6-19, its FIXes (E-V6-14 – E-V6-15 amended, PRB7-05, PRB7-16; E-V6-16 amended, PRB7B-12; E-V6-17 – E-V6-19 new and E-V6-1, E-V6-8, E-V6-11, VAL-R6-05 and the sweep amended, J146) | Part L, R7-04, R7-06, R7-07 | Part H · V06 |
| V07 | 4 | E-V7-1 – E-V7-7, its FIXes (E-V7-4 amended, PRB7-16; E-V7-1 and E-V7-4 amended, Part P pass 2; E-V7-5 – E-V7-7 new, J146) | Part L, R7-04, R7-06 | Part H · V07 |
| V08 | 0 | — | — (does not run) | Part H · kernel, V02, V03, V08 |
| V09 | 1 | E-V9-1 – E-V9-9 (E-V9-7 amended, PRB7-21; E-V9-8 amended, PRB7B-11; E-V9-9 new and E-V9-3, E-V9-5, E-V9-6, E-V9-8 amended, J146) | Part L, R7-05 | Part H · V09 |
| V10 | 1 | its FIX (per R7-05); E-V10-1, E-V10-2 (J146) | Part L, R7-05 | Part H · V10 |
| V11 | 1 | its FIX (amended) and one END | R7-05 | Part H · V11 |
| V12 | 0 | E-V12-1 (J146) | Part L (runs, J146) | Part H · V12 |

Parts: A ruling requests and hand-offs · B the round (R7-01) · **L the family's laws (J146: normative, with the restated veto list)** · F THE FAMILY RULING (R7-02: the lock, bent-group and
fixed-place sentences, both tables complete, the attack, the equivalence, the veto list) · C the other rulings (R7-03
generation order, R7-04 epochs and decay, R7-05 readers, R7-06 tests and the state sweep, R7-07 bookkeeping) · H
per-unit dispositions and END lines · Held for round 8 · P the probe's findings and their decisions (passes 1–2), and Pass 3 under the laws (J146) · I canon. (J146) Every seat reads Part L whole first: it is normative, and R7-02 – R7-07 and Part P are its worked examples.

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
pipeline, determinism, rendering, V04, V05, V06, V07, V09, V10, V11** each own issues; **V01** owns one; (J146) **V12** owns none but holds E-V12-1 and runs; **V02, V03, V08** and **kernel** neither own an issue nor hold an END line this round and do not run. (5) **Supersession by
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

## Part L — the family's laws (J146; normative)

> (J146) The owner chose laws plus examples (PROGRESS J146; the owner's words: "Laws + examples (Recommended)"). This
> Part is the raised-way × wall family's **normative** text; its words are the program's (J122, vetoable — the restated
> veto list at its end names each behaviour a builder would see). R7-02 (its lock, bent-group and fixed-place sentences,
> the crossing table and the way-and-channel table), R7-03 – R7-07 and Part P's amendments are **worked examples** of
> these laws: where an example and the laws differ, the laws govern; a case no example lists is decided by the laws.
> **Grading in this family** (J146, J141's standard as the owner applies it here): a finding is MAJOR only where the laws
> give two outcomes or none for a case, contradict an owner rule, or no bar checks an invariant of law 1; an example
> that differs from the laws, or a case missing from the examples, is never a major — at most a minor, the example
> corrected to the laws. **Home:** §2.7's support step (6), stated there once, from **Terms** through **The check**
> below, as **§2.7's laws** (the model's END E-M1); every other text cites "§2.7's laws" with the law's number and
> never restates them. Nothing below changes an owner rule: J144's rule (a lock holds placement, not shape) is law 2's
> entry and (b); item 110 (b) and (f) are law 1 (1)–(3); item 114 is kept (a run's condition is its own, law 1 (7)–(8)
> reading it); item 101 R2's nearest lawful alternative is law 2 (c).

**Terms** — each defined once, as a function of what stands when it is read; where several raised ways stand, every
strip, zone and end below is the union of theirs.
* A **meeting** is any contact of a **wall-like structure** — an enceinte of any kind (a town or stage ring, a castle's
  curtain and inner ward, a citadel, a village's palisade, earthwork or inner circuit), a quay wall or a retaining wall,
  with its runs, gates (posterns, water gates and a harbour-mouth chain among them), towers, moat and the ways its own
    law lays (an intervallum, a quay, a castle's paths) — with a **raised way** — a viaduct or an elevated road (each a
  **road deck**) or an aqueduct, with its supports, ramps, stairs, feet, spans, arch vaults and the way it carries (by
  hand, the declared way to its stroke's end). An **enclosing wall** is every wall-like structure but a retaining wall.
* **The band** of a wall at a point is its section there, by §4.8's rows along its stretch profile — a village kind's
  by V07 §3.4: the palisade's stakes, the earthwork's bank with its ditch, the inner circuit's wall, `palisade.bandM`
  each side of it being its wall strips —; a retaining wall's band is its line. **The wall strips** are the band with
  its inner setback inside and its outer setback, with its glacis or berm, outside (§4.8); **their width** at a place is
  the band's half there plus the wider of the inner setback and the outer setback with its glacis or berm.
* **The strip** of a raised way is its under-deck strip — the deck's plan between its feet widened each side by
  `raisedWays.structure.stripMarginM` (§4.6) — read from its record whatever its spans' and supports' `state`; **the
  ends** are its ramps, stairs and feet, each widened by the same margin. A **standing support** is one whose `state`
  is absent or `ruined`; a `cleared` one's ring is open ground. **Beyond the foot** is the nearest point of a road
  deck's carried way, past its foot, at which a wall's line, band and wall strips and a gate's footprint there are all
  clear of the ends and the strip.
* A **footprint** is a tower's (`Tower.footprint`, an end post's, a retaining wall's decorative tower's), a gate's (its
  gatehouse with its passage, else its passage across the band; a harbour-mouth chain's water gate across the entrance
  with the tower at each head) and a fixed place's (its own points — `Gate.banks`, an anchor, a weld vertex — with the
  footprint standing there).
* A **fixed place** is a place a wall's own law ties to something other than the spacing along its line, so that it can
  move only along that tie: a river's water gate (tied to the river), an anchor with its tower (to the barrier's edge),
  a harbour-mouth chain (to the heads it spans), and a castle's weld vertices, town-side gate and vertex towers (to its
  claim, which moves only whole, by its siting). Every other gate, postern and tower moves along its wall's line. **The
  zone** of a raised way, for a fixed place of a wall, is its strip widened each side by that wall's strips' width at that place.
* A **held building's strip** is the strip of a `vault` span whose chamber seats a held building (a declared placement,
  V04 §3.5.4 (d)), widened all round by the meeting wall's strips' width.
* **Anything across a strip** is whatever meets it but open ground: a wall's band or wall strips, a run of a wall record
  neither `dismantled` nor cleared (an absorbed record's among them), a retaining wall's line, a part-0 way's corridor,
  water, or marsh.
* **Placement** is where a structure is — a wall's trace and course, a raised way's course, deck line, stations and
  keys, an arch vault's span and key; **shape** is what a meeting may change — law 2 (b)'s moves, a gate law 2's *Carried way* makes, a `vault` span's reading (law 1 (8)). **The reach** of a meeting is the strips,
  zones and ends it meets and, along each line through them, the nearest points clear of them.

**LAW 1 — what a valid meeting is.** After every commit, on every path, at every rung:
1. no raised way has a junction with ground part 0: its deck shares no vertex or edge with a ground way but at its two
   ends, no gate stands on it, and a deck passing over a wall is no crossing of the gate law (item 110 (b), (f));
2. an enclosing wall's line meets an aqueduct's deck line only under a span or through a `cleared` support's ring, and
   its band meets a standing aqueduct support's ring at most along the ring's boundary (item 110 (b): "crossing the wall
   through an arch", as the program reads it); a retaining wall's line meets any deck line anywhere, the deck passing
   over it and a support on its line built against it;
3. a road deck's deck line crosses an enclosing wall's line only where that run was laid after the deck's course, the
   band then built through each of the deck's supports it meets, and never where its own route crosses a boundary its
   stage picked before solving that route (S3 (7)'s stage-1 boundary, S5b's picked boundary); across an enclosing wall
   standing when its course was laid, and at such a boundary, the deck comes down before it and its carried way crosses
   on ground part 0 through a gate beyond the foot (a frame growth's extension and a repair keep their course's date);
4. no enclosing wall's line, band or wall strips lie over a raised way's ends;
5. no gate's, postern's or tower's footprint lies in a strip, under a standing span or a fallen one;
6. no fixed place, with its footprint, lies in a zone;
7. wherever any part of a wall's band lies beneath a standing span (or a standing support bearing one), its top and walk
   are no higher than the lowest soffit there;
8. a `vault` span is read `open`, with no chamber, while anything lies across its strip, and has its chamber (`collapsed`
   where V04 §3.5.4 (d) (2) says) while nothing does — its record unchanged either way;
9. a held building's chamber, footprint and door are unchanged by any meeting, so no wall's line lies in a held
   building's strip;
10. every held structure keeps its placement (§7.2; J144), moved by no op but one that names it.

**LAW 2 — one way to resolve any meeting**, whatever op makes it.
* *Entry.* Whether an op may act on its own target at all is settled before any meeting: by hand by §7.1's lock row (a
  target the user locked or pinned refused, `refuse.locked`; a drawn wall or a declared raised way changed by its
  author's new declaration, §7.2), by the engine or a hazard by §7.2 *Protection*, V06 §3.1 and V05 §3.16 (2) (a held
  part never struck, decayed or covered). No lock, pin or declaration on a wall-like structure, a raised way or an arch
  vault refuses, skips or alters a meeting (J144: it holds placement, not shape); a held building stays held (law 1 (9)).
* *Newer.* Of a meeting's two sides the newer is the op's own structure — the one it creates or changes; where one op
  lays or changes both, the raised way is the older (held from its creation, §2.7's support step (6)). Between structures standing before
  the op: at generation and at a village derivation the later in stage and step order — a raised stretch dated by the
  step that fixes its course (S3 (5)'s gate routes' by S3 (7)), and a boundary picked before a route is solved standing
  for that route (S3 (7)'s stage-1 boundary, S5b's picked boundary); in a creation prefix (a skeleton, §4.1, or what
  **Rebuild around my drawings** makes, §7.2) its declarations stand before every stage, the later in its log the newer
  between them; at a regeneration every held structure is older than every stage; at an epoch and in a replay, the later
  in the epoch's op order. A meeting of two held structures stays as their last commit left it.
* *Not yet built.* A part not yet built when a step reads it, whose structure's course or place is already fixed — a
  gate's or fixed place's footprint, a band's width, the stations and spans of a raised stretch whose course S3 (7)
  fixed, a castle's curtain from its claim's commit — is read as the rows that build it will build it from what stands
  at that step, and the step that builds it builds exactly that; a part whose place a later step chooses (S7's towers by
  spacing) is that step's own, the newer when it is laid.
* *A `vault` span's reading* follows law 1 (8) of itself, whichever side's op puts something across its strip or takes
  the last thing off it.
* *Carried way.* A road deck's carried way meets every enclosing wall on its ground course by the gate law (§5.3's gate
  row): by hand §7.3's S7 operator makes its gate in every wall the declared way crosses, a held one too (a shape change
  of that wall, shown by law 4's (G2)); off the hand path a gate is made only by the gate law of a stage that lays its
  trace after the route is solved (S3 (7)'s, S5b's), never in a trace laid before, whose standing gates the route takes.

(a) The newer structure is laid lawfully first, by its own derivation and within its own reach (the pull's search band,
    the support step's slide bound, the strip's edges, its siting's candidates): an op that searches for its shape — a
    pull or cost field, a route solve, a castle's siting, S5a's trace for a points-form `drawWall`, a raised way's course
    with its ends where its own law picks them — searches only shapes law 1 admits, its own cost choosing among them; an
    op given its shape — a stroke, a moved vertex or grip, a re-section, a placed or slid gate, a drawn course, an
    edit's value, a warp's result — takes the lawful shape law 3 picks nearest it.
(b) Failing that, the standing structure's shape changes inside the meeting's reach (G1), never its placement: its
    gates (each gate's way following it), posterns and towers move along its line. Never a fixed place, a support or a
    held building.
(c) Failing that, the op gives way (G3), neither side moved or broken. **By hand:** refused, `refuse.raised.meeting`,
    offering the nearest lawful declarations (item 101 R2; `PreviewResult.alternatives`) and **Show me why** — never an
    Unlock, no lock deciding a meeting. **At generation, a regeneration and a village derivation:** the newer structure
    is not built — a raised way dropped, reported; a castle's claim passed for the siting's next candidate, then
    F-CASTLE's ladder — or, where its stage must lay it, that stage's raised-way rung runs alone (F-WALL's; F-V-RAISED at
    a village; F-REDERIVE's for a run water re-traces): re-laid once with law 1's exclusions impassable, else the stage
    left unwalled, which then reads as §4.2 S3 (9) (a)'s unwalled stage — no `Enceinte` or `Gate` recorded for it, its
    gate routes and spawned primaries ways crossing its boundary with no gate, no harbour gate, moat or chain along it,
    the harbour route an unwalled town's, a castle welded to it re-sited by F-CASTLE else kept `inside`, the wall listed
    in `requestedVsBuilt` and `W_RAISED_MEETING` reported. **At an epoch and in a replay:** the op waits that epoch
    (`walls.waited`, `raised.waited`), a water op (`shiftCourse`, an avulsion, `digCanal`) being checked on its new water
    before the water is inserted and waiting likewise; the one op that cannot wait is a frame growth, whose extension
    keeps the deck's course past a bound no fitting course meets, each station placed off every obstacle but the one it
    fails, reported (`raised.extendedPastBound`).

**LAW 3 — one tie-break.** Among the lawful shapes law 2 (a) or (b) leaves open, the one of least displacement: for a
thing moved along a line, its distance along that line — a gate the op's own wall lays on a standing way along that
way (the wall laid through it), every other gate along its wall's line (its way following); a tower or postern along its
wall's line; a fixed place along its tie; a line's crossing of a deck line along that
deck line; a station along its deck —, a thing the op itself drags being measured back along its drag, so that it stops
on the side it came from; a line's part inside a strip that crosses no deck line there goes to the strip's edge on the
side it entered from; a re-laid line or course, by the largest distance of the new from the old, then the area between
them; an edited value, by its difference. Ties go to the one nearer the start of that line — a deck from its first foot,
a wall's line or a way from its first vertex, a river from its source; a part wholly inside a strip to the side nearer
its own first vertex, then the left in spine order — and then to the lower address. A bend that would leave the op with
no effect is no bend: the op takes law 2 (c).

**LAW 4 — every op re-checks.** Every op on every path that changes the geometry, kind, section, width, class,
condition, existence or held state of a wall-like structure or a raised way, or anything law 1 (8) reads across a strip —
each generation stage, each epoch and replay op (a burial and a channel's silting among them), each village step, each
hand tool (a castle's keep or bailey grip, a terrain stroke, a retaining wall's chain grip and a terrace level among
them), a warp, a revert, a split or a merge, a width or class edit, a skeleton's import and an undo — re-checks law 1 for
the meetings it touches, in its own commit, and resolves them by laws 2–3; an undo is its event's inverse, re-checked as
any op. **(G2)** Every reshape of a held structure other than the op's own is shown — by hand as the fate **reshaped**
(`EditFate.fate` `'reshaped'`, with `met`, the structure it met, and `change`, as §5.4's `reshaped` entry's), off the
hand path as a `reshaped` entry in the report's changes (§5.4) — and the event's undo restores it. A reshape of the op's
own structure — the user's stroke, or a drawn wall or declared raised way its author's op changes — is its bend line,
never a fate.

**The check.** Law 1 is checked at runtime by one §5.3 row, at every stage end and every commit on every path, and by one
property bar, **T110-4** (§13.2): law 1 after every commit across the family's fixtures, the state sweep, a randomised op
sequence on fixed seeds, and every path. That bar is what makes a missing example harmless.

### The worked examples under the laws (J146)

R7-02 – R7-07 and Part P (passes 1 and 2) stand as worked examples, each sentence and cell illustrating the law it cites
(R7-02's banner maps them). Five corrections hold across every example, so that none contradicts the laws:
1. Wherever an example has a newer structure bent, dropped, refused or waiting because a standing wall's gate, postern or
   tower (not a fixed place) lies where law 1 bars it, law 2 (b) first moves that gate, postern or tower along its wall
   inside the meeting's reach, and the example's outcome follows only where (b) finds no lawful point.
2. Every `refuse.locked` an example gives where a held building blocks a wall, a retaining wall's stroke or the raised
   way's own edit reads `refuse.raised.meeting` naming the building, with no Unlock (law 2 (c)).
3. Every ramp, stair or foot an example widens "by the band's half" — the pull's impassables, a lawful crossing, *Line
   and band* — is widened by the wall strips' width there (law 1 (4)), a support still by the band's half (law 1 (2)).
4. A citation, in an END line or a FIX, of the lock sentence, the bent-group sentence, the fixed-place sentence or
   (G1)–(G3) reads as a citation of §2.7's laws — law 2 (the lock sentence; its reach law 2's entry), law 2 (a) with law
   3 (the bent-group sentence), law 1 (6) with law 2 (the fixed-place sentence), law 2 (b), law 4 and law 2 (c) ((G1), (G2), (G3)) — the sentence being its worked example.
5. Every "a fate" an example gives, by hand, to a move of the op's own structure — a part, crossing, end, gate or anchor
   of the user's stroke, or of a drawn wall its author's op changes — reads "part of its bend line" (law 4); a fate is
   given only to a held structure other than the op's own (*reshaped*) and to what the op removes or lays beside it (an
   arch vault's chamber).


### The family's veto list, restated (J146)

This list supersedes R7-02's list 1–22, which stays as the record. Each item is a behaviour a builder would see; each may
be vetoed by naming it; "law n" gives the law it comes from and [n] the old items it restates. Items that only follow from
another (bookkeeping, report counts) are dropped.
1. **(law 1 (1))** Nothing joins a raised way to the ground but its two ends: no gate, station or wall opening on a deck,
   a deck passing over a wall being no crossing of it. *Veto option:* R5-02's raised gate. [1]
2. **(law 1 (3); law 2 (a))** A road deck never crosses a wall that stood when its course was laid: it comes down before
   the wall, its road going on through a gate beyond the foot; one whose two ends are fixed is not built (at an epoch it
   waits); a gate route at generation whose gate would fall on its deck is re-solved off it. [1, 17]
3. **(law 1 (3))** A wall laid after a road deck passes beneath it ungated, built through the deck's supports in its band.
   *Veto option:* a gate standing on the deck over the wall's line. [3]
4. **(law 1 (2))** Every aqueduct crosses every town, castle, village or quay wall under one of its arches (or through the gap a cleared pier left),
   never at a pier, in either order: one built across a wall keeps its piers off the wall, a wall laid later is bent to
   pass under an arch. *Veto option:* a later wall laid through an aqueduct's pier. [2, 8]
5. **(law 1 (4); new, J146)** No town, castle, village or quay wall, nor its setbacks, glacis or berm, lies over a raised
   way's ramp, stair or foot (a retaining wall may, the deck passing over it); the
   gate where a road comes down from a deck stands beyond the foot, clear of the ramp. *Veto option:* the wall's band alone
   kept off them, its setbacks allowed over a ramp. [3, 8]
6. **(law 1 (5); law 2 (b); law 3)** No gate, postern or tower stands under a deck, standing or fallen: whichever is laid
   later moves along the wall — a gate the user slides goes back toward where it came from — and a raised way built later
   moves a standing wall's gate or tower along the wall rather than give way. *Veto option:* such a drawing refused, and
   such a raised way bent or not built. [13]
7. **(law 1 (6); law 2)** The places a wall's law fixes — a river's water gate, an anchor with its tower, a harbour-mouth
   chain, a castle's weld vertices, town-side gate and corner towers — never move along the wall and never stand under or
   beside a deck: a later wall moves its river crossing or anchor along the river or shore, a later chain to other heads,
   a later castle is sited elsewhere, a later raised way bends (an elevated road to a citadel ends on the castle street
   outside it); where none can, the later thing gives way. *Veto option:* a water gate lawful under a span whose soffit
   clears its gatehouse. [14]
8. **(law 1 (7))** A wall beneath a deck is cut down to the lowest arch above it, never raised to it. [6]
9. **(law 1 (8))** No arch vault's chamber stands in a span while anything lies across it — a wall, an absorbed ring's run
   not yet dismantled, a retaining wall, a street, a moat or a marsh —; it comes back when nothing does. *Veto options:*
   the chamber laid again at `absorbWall`'s commit [15]; each way re-routed off the span instead [18]; a retaining wall
   bent off vaulted spans [20]. [5, 15, 18, 20]
10. **(law 1 (9))** A building the user seated in an arch vault is never disturbed by a wall: the wall gives way (it
    crosses under another arch, else is refused or waits), and the raised way's own edit that would bring a wall into it
    is bent or refused. [12]
11. **(law 2 — J144's rule, its reading the program's)** A lock, pin or declaration never refuses or skips a meeting of a
    wall and a raised way: the locked thing changes shape there (a gate or tower moved, a gate made by hand, a vault left
    open) and stays locked; only an op on the locked thing itself is refused. *Veto option:* UC18's locked vault kept with
    its chamber in the wall, the wall kept off its span instead. [9]
12. **(law 2 *Carried way*)** A raised road drawn by hand makes its road's gate in every held wall it crosses on the ground, shown
    as *reshaped*. *Veto option:* the gate refused on a held wall, the user unlocking first. [10]
13. **(law 2 (c))** Where no lawful shape exists the op gives way: by hand refused with the nearest lawful choices and
    *Show me why* (never an Unlock); at generation the newer thing not built or its wall stage left unwalled, reported;
    at an epoch it waits — a river shift that would leave a wall with no lawful shape waits too. *Veto options:* the
    existing fates and bends alone [11]; the river moved and the run left breached across it [22]. [11, 22]
14. **(law 3)** Each choice is the nearest lawful shape, then a fixed order: the same map every time, on every host. [—]
15. **(law 4)** Every reshape of something the user holds is shown — the fate *reshaped* by hand, a report entry otherwise
    — and undone by undo; the user's own stroke, bent, shows as its bend, never as a fate. [11]
16. **(law 2 (c))** A frame growth's extension keeps the deck's course and its arches' state; past a bound with no
    fitting course it keeps a pier in the water or a tall pier, reported. *Veto option:* a merged span past the clear-span
    bound. [7, 16]
17. **(law 2 (a))** A hand repair of a fallen span rebuilds it on the way's line, over a wall laid since. *Veto option:*
    the repair refused where a later wall runs beneath. [21]
18. **(law 2 (a))** A wall re-sectioned on its trace (a palisade rebuilt in stone, a stretch re-graded) keeps its trace
    where its new band is lawful and is re-traced locally where not. *Veto option:* the old section kept under the span.
    [19]
19. **(law 1; item 114)** A run beneath a deck decays, breaches and recovers by its own condition, the deck standing on
    its own supports; a wall's setback, glacis and berm are no obstacle to a support. [2, 4]

## Part F — THE FAMILY RULING

### R7-02 Raised ways and walls, closed by construction: the lock, the bent group, the fixed places and both tables complete

> (J146) **Worked examples, non-normative.** From J146 this ruling — its lock, bent-group and fixed-place sentences,
> *Strips, zones and nearest points*, the four outcomes, both tables, (M1)–(M6), the attack and the equivalence — is a
> set of worked examples of Part L's laws. It illustrates them so: the lock sentence law 2 (its reach law 2's *Entry*;
> (G1) law 2 (b); (G2) law 4; (G3) law 2 (c)); *Strips, zones and nearest points* law 1's terms and law 3; *over the band*
> law 1 (2), (5), (6) with law 2 (a)–(b); *down before the wall* law 1 (3) with law 2 (a) and *Carried way*; *beneath* law 1 (2)–(9) with law 2 (a)–(b); *unchanged
> meeting* law 4 (a re-check that finds nothing to resolve); the bent-group sentence law 2 (a) with law 3; the
> fixed-place sentence law 1 (6) with law 2; each column C1–C13 a state law 1 reads, C8 law 2's *Entry*; each row W1–W14
> law 4's re-check on that op's paths; the way-and-channel table §4.3's crossing rule with law 1 (1) and (8). Where any
> of it differs from Part L, Part L governs (Part L's five corrections hold throughout); a case none of it lists is
> decided by the laws, and is no finding. The veto list below is superseded by Part L's restated list. Spots corrected
> under J146 are marked "(J146)".

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

**What changes in behaviour, said plainly — the owner's veto list for the family, restated whole** (J146: superseded by Part L's restated veto list, 1–19, each item with its law; this list is kept as the record). R6-02's eight changes
stand as amended by its Part P; R7 adds 9–17, and its Part P 18–19 (pass 1) and 20–22 (pass 2) (each change Part P makes
to 9–17 marked there).
Each may be vetoed by naming it.
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
   and lock but has no chamber while the wall stands; a founded course meets a held retaining wall or another held raised
   way as an unheld one (amended, PRB7-20). The lock reaches only meetings (amended, PRB7-03, PRB7-04): a hand op whose
   own target the user locked or pinned is still refused by §7.1's lock row, a drawn wall or declared raised way being
   changed by its author's new declaration; a carve or a moved river that would re-trace a run of a drawn or locked wall
   is refused as across any locked wall (amended, PRB7B-07); a landfall, decay or an epoch's conversion keeps every lock
   as before.
   *Veto option:* UC18's locked vault kept with its chamber in the band, the epoch's trace keeping off its under-deck
   strip instead (repair-r6-V04's option (b)).
10. **(new)** A road deck's carried way that comes down before a held wall makes its gate there by hand, the wall reshaped
    and kept locked (G2's fate *reshaped*); at generation, a regeneration and an epoch its route passes through a gate its
    path's own gate law gives, so no gate is made in a held wall but by hand (amended, PRB7-06). *Veto option:* the gate
    refused on a held wall (§7.1's lock row), the user unlocking first.
11. **(new)** The reshape of a held thing is always shown — a new edit fate, *reshaped*, which the user confirms, and a
    `reshaped` entry in the report's changes — and where no local shape exists the op is refused by a new key,
    `refuse.raised.meeting`, or off the hand path takes its ladder — at generation a stage's trace re-pulled round the
    raised way, else that stage left unwalled and reported (`W_RAISED_MEETING`), at an epoch waiting, at a village the
    palisade omitted (amended, PRB7-16) — each such ladder's raised-way rung running alone on its detection, every other
    rung keeping the crossing table's rules (amended, PRB7B-09). *Veto option:* the existing fates and bend lines alone.
12. **(new)** A wall gives way to a held building seated in an arch vault: the trace keeps its band and strips off the
    building's span, crossing the deck under another span — by hand moved there, a fate (amended, PRB7-01) — else waits or
    takes F-WALL's ladder, and by hand, with no other span, is refused with the building as the blocking entity; the
    raised way's own re-shape or re-spacing that would bring that span under a standing wall is bent clear, else refused
    naming the building (amended, PRB7B-05); a retaining wall drawn there gives way the same (amended, PRB7B-10).
13. **(new)** A hand or re-traced wall stretch is never left running along beneath a raised way, entering and leaving on
    one side, or ending under it: those parts move to the under-deck strip's edge, the wall's band kept outside it
    (amended, PRB7-08); a gate the user slides into the strip moves back to the edge it came from, one placed there to the
    nearer edge, its road following (amended, PRB7-10); a gate or tower is moved until its whole footprint is clear, and
    raised ways whose strips meet are kept clear of together, as one (amended, PRB7B-01, PRB7B-02). *Veto option:* such a
    drawing refused with its nearest lawful alternative.
14. **(new)** A river's water gate, an anchor's tower, a castle's weld vertices and its town-side gate are never moved
    along the wall for a raised way: a wall laid later crosses the river or anchors on its barrier at the nearest point
    clear of the raised way's fixed-place zone (amended, PRB7B-17), a castle sited later is sited clear of it — its gate
    on a clear side, else re-sited — never reshaped (amended, PRB7B-03), and a raised way laid later keeps its fixed-place
    zone clear of them (amended, PRB7-09); the strip and zone hold under a fallen span too, so no gate, tower or fixed place
    stands under a span that is later repaired (amended, PRB7-14). *Veto option:* a water gate lawful under a span whose
    soffit clears its gatehouse, capped like the run.
15. **(new)** An absorbed ring's arch vault returns when the last run of the old wall over it is dismantled, not when the
    wall is absorbed. *Veto option:* the vault laid again in `absorbWall`'s own commit, the standing run passing through
    its chamber's footprint.
16. **(new)** A frame growth's extension that meets a river or valley past a structural bound bends to the nearest course
    that fits, meeting every standing wall as a course laid then (amended, PRB7-15); with none, it keeps its course, each
    station slid off every obstacle but the water or height it fails, a pier standing in the water or past `maxPierM` kept
    and reported.
    *Veto option:* a merged span past `maxClearSpanM` kept instead of a pier in the water.
17. **(new)** At generation, a gate route whose first point on the stage-1 boundary lies on a viaduct is re-solved with no
    deck across that boundary, its gate on the ground; the gate routes' raised stretches then stand for the castle and the
    stage-1 trace, which are laid after them (amended, PRB7-02).
18. **(new, Part P — PRB7-13)** An arch vault comes back only once nothing crosses its span's strip: a way or channel that
    passed under the span while a wall stood over it (an intervallum, a street, a lane, the moat) keeps the span open after
    the wall goes, and the chamber is laid again when that way or water goes. *Veto option:* the chamber laid again when the
    wall goes, each such way re-routed off its strip and the channel stopped at its edges, as `wallToWay`'s ring road is.
19. **(new, Part P — PRB7-07)** A wall re-sectioned on its trace — a palisade rebuilt in stone, a stretch re-graded, its kind
    changed — keeps its trace where its new, wider band still crosses a raised way lawfully, and is re-traced locally by
    the bent-group sentence where it would not. *Veto option:* the old section kept under the span (the run narrowed
    there), its trace unchanged.
20. **(new, Part P pass 2 — PRB7B-10)** A retaining wall's line across a `vault` span's strip keeps that span open — no
    arch vault across its step — in either order, the chamber laid again when the line goes; a retaining wall drawn
    across a span whose chamber seats a held building moves to cross under another span or at a support, else is refused
    naming the building. *Veto option:* the drawn stroke bent off every `vault` span to cross under an `open` span or at a
    support, the chamber kept.
21. **(new, Part P pass 2 — PRB7B-06)** A hand repair of a dismantled span or a cleared support raises the new part on
    the way's own line, as a frame growth's extension keeps the deck's course: a span over a wall laid after the way
    stands over it again, its new supports slid off the band, refused only where no support can stand off the band.
    *Veto option:* the repair refused where a wall laid after the way runs beneath (the span left fallen).
22. **(new, Part P pass 2 — PRB7B-08)** An epoch's river shift, avulsion or dug canal that would re-trace a wall run
    with no lawful shape at a raised way — even with the run widened once to the next towers — waits, the river, the
    wall and the raised way unchanged, counted in `walls.waited`. *Veto option:* the river moved and the run left
    `breached` across it with no water gate, reported.

#### The texts §2.7 carries — written by the model in these words

(J146) The model writes Part L's laws first, as (6)'s normative bullet (Part H · model, E-M1), and the blocks below
after them under the heading **Worked examples** — every block below non-normative, each spot citing the law R7-02's
banner maps it to.


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
    read `open` with no chamber while a wall stands over it and its chamber laid again once none does, a gate made by hand
    where a road deck's carried way crosses a wall (*down before the wall*) (amended, PRB7-06) — is made whether either
    side is locked, pinned, declared or neither, and what
    it reshapes stays locked, pinned or declared (a locked arch vault's lock kept with its key, so the chamber V04 lays
    again carries it). No meeting of two similar structures is refused, skipped or altered for a lock: the lock axis is one
    case (column C8). **Its reach** (amended, PRB7-03, PRB7-04, PRB7B-07) is §2.7's laws' law 2 *Entry*
    (J146: shortened, the law saying it): whether an event may act on its own target at all is settled before any
    meeting — by hand a target the user locked or pinned (T10 `hold`) refused by §7.1's lock row, nothing written; a drawn
    wall or a declared raised way changed by its author's new declaration (§7.2 *Declared means held*), its event then
    taking its cell; a carve or a moved river that would re-trace a run of a drawn or locked wall refused as across any
    locked wall (`refuse.water`; §4.11 *Other crossings*), so the bent group's carved or river-moved run is always neither
    drawn nor locked; by the engine or a hazard a held target kept as §7.2 *Protection*, V06 §3.1 and V05 §3.16 (2) keep
    it, the ruin lapping round it. Once the event acts, the meeting it makes takes its cell. **The three guards** are
    §2.7's laws (J146: shortened, the laws saying them): **(G1) Local** is law 2 (b)'s reach — a held structure's shape
    changed only inside the meeting's reach, its course or trace never re-routed; **(G2) Shown** is law 4's (G2) — the
    fate **reshaped** by hand (§7.3 item 4), a `reshaped` entry in the report's changes at generation, a regeneration, an
    epoch and a village derivation (§5.4's `ReportEntry`) (amended, PRB7-23), the event's undo restoring it; **(G3) No
    lawful local shape** is law 2 (c) — by hand `refuse.raised.meeting` (§7.1; item 101 R2); at generation or a
    regeneration the newer structure not built (a raised way, reported) or its trace taking F-WALL's raised-way rung
    (§5.2); at an epoch waiting (`raised.waited`, `walls.waited`, V06 §2.10), a run an epoch's water op would re-trace
    taking F-REDERIVE's raised-way rung, that op itself waiting where the rung finds no shape (amended, PRB7B-08); at a
    village derivation VS3's F-V-RAISED (V07 §3.13); each ladder's raised-way rung running alone (amended, PRB7B-09);
    neither held thing moved or broken. Buildings and every
    other declared placement are no similar structure and stay held as §7.2 holds them; a wall gives way to one
    (*beneath*, *A held building in an arch vault*). A **retaining wall** has no strip, gate or closure, so no row of this table reads it — its band is its line and its decorative towers' footprints are kept out of a strip as any tower's, moved along its line (§2.7's laws: law 1's terms, law 1 (5), law 3; J146) —, and *beneath* reads its line once: a `vault` span whose under-deck strip it crosses is
    read `open` while it lies there, whichever was laid first and whatever its condition, so no chamber stands across
    its step (*A `vault` span under the wall*) (amended, PRB7B-10). The deck passes over it as over the ground it levels
    and a support stands on its line built against it, its height read at its station on the low side ((4): the deck's
    level less the lower `levelledGroundCm` there) (amended, PRB7-28); generated levelling never reaches an under-deck
    strip (a hole for S10 and S11, §4.6); a retaining wall drawn or moved across a standing raised way (T3 `retaining`, a T2 terrace stroke, its chain grip's `moveVertex`, a terrace level's re-expansion: law 4; J146) levels no ground inside its under-deck strip and passes beneath it as any part-0 line, through a
    support built against it, nothing of the raised way written but the chamber V04's reconcile removes from a `vault`
    span it crosses (a fate; a locked one's *reshaped*, its lock kept with its key) — save that it gives way to a held
    building as a wall does (*A held building in an arch vault*): a stroke across the strip of a span whose chamber seats
    one is moved along the deck to cross under the nearest span whose chamber seats none, or at a support (item 101 R2; part of the stroke's bend in §7.1's catch-all line, a retaining wall's move — J146: law 4), and with none is refused, `refuse.raised.meeting` naming the nearest such building, no Unlock offered (law 2 (c); J146) (amended, PRB7B-10); and its own events
    (`DeclineOp`'s retaining member, `repairRetaining`, a landfall's row, a hand `delete`) write it alone (T110-1), a
    chamber its removal lets V04 lay again excepted.

    **Strips, zones and nearest points** (amended, PRB7-10, PRB7-14, PRB7B-01, PRB7B-02, PRB7B-03; J146: a worked example of §2.7's laws' terms and law 3, which govern it). A raised way's
    under-deck strip — and with it its fixed-place zone and a held building's widened strip (*beneath*) — is read from its
    record whatever its spans' and supports' `state` (the deck's plan, §4.6, as the way-and-channel table's lead reads a
    fallen span's strip), so every rule below that keeps a gate, a tower, a fixed place or a line out of one holds under a
    fallen span as under a standing one, and a span or support `repairRaised` raises again stands over none of them.
    **Several raised ways:** every rule below reads the standing raised ways together — a strip or zone it names is the
    union of every standing raised way's strip or zone of that kind, so a thing kept or moved out of one is kept or moved
    out of all, never into another — and where the bent group's strips of two or more raised ways meet, the bent-group
    sentence makes its moves on their union as it says (amended, PRB7B-01). **Footprints:** a tower or a gate is in a
    strip or zone where its footprint meets it — the tower's (`Tower.footprint`) or an end post's, the gatehouse's with its
    passage, and a gate with no gatehouse its passage across the band (§4.8; S10's step (0); V07 §3.4) —, and a fixed place where its own points (a river crossing's `Gate.banks`, an anchor) or the
    footprint of the gate or tower standing there meet it; every text and bar of the set that keeps a gate, a tower or a
    fixed place out of a strip or zone, or counts one in it, reads it so (amended, PRB7B-02). **Nearest points:** wherever
    a rule below moves a thing along a line to the nearest point clear of a strip or zone — a tower along the trace, a gate
    along its way or along the trace, a river crossing along the river, an anchor along its barrier's edge — it goes to
    the nearest point of that line, in either direction from where the rule would place it and never past the line's ends,
    at which the thing is clear of the union (a line that crosses the union more than once has one such point each way),
    ties to the one nearer the line's first vertex in its vertex order; a fixed place with none within its reach takes
    (G3) (the fixed-place sentence); a gate the user slides into a strip goes back along the trace, on the side its grip
    came from, to the first point at which its footprint is clear; the bent-group sentence's moves keep their own ties; and
    nothing the castle's law fixes is moved by this rule (the fixed-place sentence) (amended, PRB7B-01, PRB7B-03).

    **The four outcomes** (each defined here once; every other text cites the outcome's name):

    * ***over the band*** — a raised way created across a standing wall, held or not (an aqueduct; a road deck takes
      *down before the wall*): its supports are kept off the wall's band by (3), and its ramps, stairs and feet by its
      course (§4.3 *Where it may not go*: a course crosses a standing band only on a span), whatever the runs' condition,
      so the band lies beneath a span — an aqueduct's arch (item 110 (b)) — and each span over the band is ruled by the
      span rule as anywhere, a `vault` one read `open` while the wall stands (*beneath*); its under-deck strip keeps clear
      of the trace's gates and towers, and its fixed-place zone of the trace's fixed places (amended, PRB7-09) (§4.3
      *Where it may not go*; V06 §3.19 (5); the fixed-place sentence; a hand course bent there, §7.1) — and at generation,
      where S7 lays the towers after an aqueduct at S6's end, a tower its spacing would place in the strip is moved along
      the trace to the nearest point clear of it, as *beneath* moves one, unreported, S6's aqueduct having kept its
      fixed-place zone clear of the fixed places the trace and the castle record (amended, PRB7B-03) —; nothing of the wall is
      written, the run beneath keeping its own condition (a `breached` or
      `dismantled` run a gap beneath the arch); the meeting then reads as *beneath*. A course that cannot keep its supports
      off the band within (3)'s and (4)'s bounds, or its strip clear of the gates and towers and its fixed-place zone of
      the fixed places, is (3)'s and
      (4)'s: a generated one dropped (at an epoch waiting, `raised.waited`), a declared one bent to the nearest course that
      can, else refused (G3).
    * ***down before the wall*** — a road deck (a viaduct's or an elevated road's) never crosses a trace standing when its
      course is laid — at S3 (7) the stage-1 boundary (from S3 (9) on, its trace) and at S5b the stage's picked boundary
      counting as standing; a frame growth's extension, which keeps the deck's course, is no course laid (C12). A deck that
      is a priced option of a route's solve (S4's or S5b's viaduct, an epoch route's) comes down to a ground vertex before
      the trace (§4.3 *Where it may not go*), its route crossing the trace on ground part 0 at a gate of its path's own
      gate law (§5.3's gate row; §4.8 *Gates*) (amended, PRB7-06, PRB7B-04), decided by whether the trace stands when the
      route is solved: across a boundary the route's own derivation lays after solving it — at generation, at a
      regeneration that re-derives the trace, and at an epoch's new walled stage for the routes that stage solves before
      its trace (V06 §3.2's `growth` step: a new stage through S5–S13 on its new faces) — a gate that stage's gate law
      places (S3's — a gate route re-solved by §4.2 S3 (7) —, S5a's pins, S5b's spawned primaries' main gates, the
      way-and-channel table's row (d)); across a trace standing when the route is solved — at an epoch every such trace,
      at a regeneration a held one — a gate standing in that trace (an epoch's growth crossing standing traces at gates
      alone, §5.3; a held wall's gates its own), the route solved to one of them — so a deck makes no gate its path's gate
      law would not, and a gate is made in a held wall by hand alone —; one that cannot is
      re-routed by the solver's ladder or not built, reported; a raised way whose two ends
      are fixed before its course is solved — an elevated road (`P1` to `P2`) at S6's end or founded, V06 §3.19's founded
      viaduct (`A` to `B`) — is not built where its course would cross a standing trace: at generation not built,
      reported; at an epoch waiting (`raised.waited`, V06 §3.19 (5)). By hand the course comes down before the trace (§7.1,
      `bend.raised.wall`), its ground way making its gate there by §7.3's S7 operator as any drawn way's (§5.3's gate row)
      — in a held wall the fate *reshaped* (G2), §7.1's lock row not refusing it (the lock sentence) (amended, PRB7-06) —
      and the stroke's course beyond the trace carried on as that ground way on ground part 0 to the stroke's end, a second
      raised way only by a second declaration (amended, PRB7-27); a course that cannot come down there is refused
      (`refuse.raised.meeting`, G3). The meeting does not arise.
    * ***beneath*** — a wall's run and a standing raised way, read from what stands, never stored: the trace keeps its
      course but where a crossing below bends it, and its strips, band, towers and gates are laid as anywhere (S7, S10,
      VS3, V06 §3.7, §7.3's S7 operator). *Where the line crosses*: a trace's line never crosses a raised way's ramp, stair
      or foot, nor an aqueduct's standing support (its `state` absent or `ruined`). It crosses an aqueduct's deck line
      under a span or through a `cleared` support's ring (open ground: both its spans fallen, C5) (amended, PRB7-11), so an
      aqueduct crosses every wall through one of its arches, or through their gap where they have fallen with the support
      between them (item 110 (b); the program's reading, J122), a trace passing round its end crossing nothing of it; a
      road deck's deck line under a span or at a support;
      and a road deck's carried way on its ground course beyond a foot, through a gate there on ground part 0 beyond the foot (law 1's term: the line, band, wall strips and the gate's footprint clear of the ends and the strip; J146). **Line and band** (amended, PRB7-08): every keep-clear this table states for
      a trace's line off a ramp, stair, foot or standing support holds for its band — the line kept from each by the
      band's half there (§4.8's rows along the stretch profile) — save a road deck's support, which the band is laid
      through; a held building's widened strip and the bent group's strip each count the band's half already, so a line is kept out of them as they are drawn. (J146) A ramp, stair or foot is kept clear of the wall strips too (§2.7's laws, law 1 (4)): wherever this table keeps a line or band off one, read the wall strips' width there for the band's half; a support stays kept by the band's half (law 1 (2)). A trace laid by the `EnceinteStrategy`'s pull or a cost field — S3's (reading the raised
      stretches of (5)'s routes, re-solved by §4.2 S3 (7), as standing) (amended, PRB7-02) and S5a's at generation and at a
      regeneration, an epoch's circuit, contraction, re-anchored stretch (V06 §3.7.6 (1)) (amended, PRB7-12) or
      dossier-admitted circuit, and a hand `contractWall`'s (§4.11: S5a's trace step) (amended, PRB7-26) — treats a
      standing raised way's ramps, stairs and feet, each widened by the wall strips' width there (law 1 (4); J146), an aqueduct's standing supports,
      each widened so that the band's half at most touches the ring (*the edge*), and every held building's widened strip
      (below) as impassable to its line (as V06 §3.7.4 (2)'s cost field treats every standing support); S5a's pull keeps each arterial's crossing of the boundary as the stage's
      picked boundary had it, at its pin or under its deck (§4.4 S5a *Trace* (2)); and where S5a pins gates, an arterial
      whose crossing of the boundary falls on a ramp, stair or foot pins its gate on its ground course beyond the foot,
      the trace laid through it (a way S5a pins no gate for meets the trace as anywhere on ground part 0). A stretch laid
      by neither takes the bent-group sentence (below). The band is laid through every road deck's support standing in it,
      and against an aqueduct's support whose ring its band's half touches at **the edge** (the ring's boundary, the band
      entering no further) (amended, PRB7-08), built into the run's line, never cut round it, so where one goes the run
      stands whole across its footprint. *The cap*: beneath a standing part of the deck — a span whose `state` is absent,
      or a support whose `state` is absent bearing a standing span — the run's top and walk, wherever any part of its band
      lies beneath it (amended, PRB7-08), are the lower of its own top and the lowest soffit there (the span's own, or that of each standing span the support
      bears) (the soffit lower: the arch walled up to its crown; the run lower: the arch open above it); beneath a fallen
      span, a support bearing none or no deck, its own top (§4.5's daylight casters, §8.4's casters and heightfield,
      §11.1's glTF wall and CityJSON wall objects read it). *A `vault` span under the wall* — one whose under-deck strip a
      wall's band or wall strip meets, whichever was laid first, or, once `absorbWall` has merged a ring's band and strips
      into the blocks (V06 §2.8), a run of that absorbed record not yet `dismantled` crosses (row W8), or a retaining wall's
      line crosses, whichever was laid first and whatever its condition (the lock sentence's retaining wall) (amended,
      PRB7B-10) — is read `open` by every reader of its `use` while that band, strip, run or line lies there, whatever the
      runs' condition: no arch vault in it (V04 §3.5.4 (d) (1)), no end walls (§11.1's 3-D and CityJSON rows), `open` in
      §11.1's GeoJSON `span` and in the tellings of V09 §4.20.6 (2) and V10's raised-way read, its under-deck strip no
      reservation ((6)'s lead) and an `open` span to §4.3's crossing rule, the way-and-channel table and V01 §3.17.3
      (2)–(3), the band, strips, moat and retaining wall laid through it — each of those readers, and every other text of
      the set, citing this reading by name ("a `vault` span §2.7's crossing table's *beneath* reads `open`") and never
      restating its cases (R7-05) (amended, PRB7B-11); its record unchanged (the span rule never reads a wall: its step
      (2), below), so it reads `vault` again,
      V04 laying its chamber again, once none lies there and no way's corridor or channel laid while it read `open` (an
      intervallum, a quay, a street, a lane, a track, the moat) crosses its under-deck strip — such a span read `open`
      while that corridor or water lies there, so no chamber is laid across a way or in water, and a removal or re-route of
      that way or channel off the strip running V04's reconcile (V04 §1b.2) — every "laid again" of this table meaning so
      (amended, PRB7-13). A locked or pinned arch vault (V04 §3.11's UC18) is read so too,
      by the lock sentence: its span held, its chamber not laid while *beneath* reads the span `open` (a wall over it, or
      any case above) (amended, PRB7B-10), its lock kept with its key so the chamber laid again carries it; each removal and re-lay of a held raised way's or a held arch vault's chamber is
      shown by (G2). *A held building in an arch vault* — a `vault` span whose chamber seats a held building (a declared
      placement, V04 §3.5.4 (d)) — holds its span against every wall, whichever op would bring the wall there, the building
      being no similar structure: the raised way's own op gives way to it as a wall does — a hand re-shape of its course or
      an Arch spacing edit (C13; a Deck height edit moves no span) that would bring a standing trace's line into that span's
      widened strip (below) is bent, as C13 bends an edit (3) or (4) cannot place, to the nearest course or spacing that
      keeps every such line out of it (item 101 R2; in that edit's own bend line), else refused, `refuse.raised.meeting` naming the building, no Unlock offered (law 2 (c); J146), and every other op that would move a span or widen its strip — a width or class edit, a `split`, `merge`, `warp` or `revert` — gives way the same (law 4; J146), a frame growth's extension keeping the old deck's stations ((7)) (amended, PRB7B-05). **A held
      building's widened strip** is that span's under-deck strip widened all round by the wall strips' widths (§4.8: the
      band's half and the wider of the inner setback and the outer setback with its glacis or berm), so a line kept out of
      it keeps a wall's band and strips off that span's strip (amended, PRB7-01): a trace laid by the pull or a cost field
      treats it as impassable; a stretch of the bent group keeps its line out of it, a crossing that would enter it moved
      by the bent-group sentence's (i) to the nearest lawful crossing (by hand part of its bend (J146), named in `bend.wall.raisedCrossing`'s
      line); a trace that can then cross the deck nowhere takes its own ladder ((G3)'s for its path: F-WALL at generation
      and at a regeneration, at an epoch `walls.waited` or, for a run an epoch's water op would re-trace, F-REDERIVE's
      raised-way rung (amended, PRB7B-08), VS3's at a village), and by hand a stroke with no lawful crossing is refused, `refuse.raised.meeting`, naming the nearest held building where held buildings' widened strips alone bar it, no Unlock offered (law 2 (c); J146); so the building, its chamber and its door stand and no
      footprint enters a band or setback (§5.3). *No gate and no tower in the under-deck strip* — under a standing span
      or a fallen one — one whose footprint the wall's law would place there moves to the nearest point clear of it
      (*Strips, zones and nearest points*: its footprint, the union, the nearest point, its ties, a slid gate's way back)
      (amended, PRB7-10, PRB7-14, PRB7B-01, PRB7B-02): a tower along the trace (S7's towers beside a trace an
      aqueduct at S6's end crossed among them, *over the band*); a gate along its way, the trace passing through it there —
      at generation and in an epoch circuit S5a's pin moved and the trace laid through it (§4.4 S5a *Trace* (2)), a trace
      laid through no pin (a contraction, a dossier-admitted circuit by the hand operator's path, a stretch of the bent
      group) bent locally, between its nearest points clear of the strip on either side of the way, to pass through the
      gate (by hand part of its bend (J146), named in `bend.wall.raisedCrossing`'s line); along the trace where the way is laid after the
      gate and follows it (a village track, V07 §3.5a (4)); and a gate the user places or slides there (`placeGate`, a
      gate's grip) along the trace, its stub or way following, the trace unchanged (row W13). A gate or tower whose place the wall's own law fixes — a river's water gate, an anchor's tower, a harbour-mouth chain, a castle's town-side gate and vertex towers (law 1's fixed places; J146) — never moves along: whichever is laid later keeps it out of the fixed-place zone (the fixed-place sentence) (amended, PRB7B-03); a postern, which has no way, moves along the trace as a tower does (law 2 (b), law 3; J146). No gate on
      the deck, which passes over the run and is no crossing of the gate
      law (gates counted on ground part 0: §4.8 *Gates*, §5.3's gate row; a raised arterial over a stage's boundary pins
      no gate, §4.4 S5a); the moat a channel by the way-and-channel table (row e); the run's condition its own (item 114: a
      `breached` or `dismantled` run a gap beneath the deck, the deck on its own supports). *Reported* once per crossing of
      a trace laid after a raised way with that raised way's deck line, a trace crossing one deck line twice reported
      twice: at generation, at a regeneration and at a village derivation in `W_RAISED_CROSSING` — S7's for S3's and S5a's
      traces alike, VS3's for its palisade (§4.8; §5.4; V07 §3.5a) (amended, PRB7B-16) —, at
      an epoch in `walls.raisedCrossings` (V06 §2.10), by hand in `bend.wall.raisedCrossing`'s line at the dry run (a hand
      `contractWall`'s in its dry run's effects, amended, PRB7-26); each reshape of a held thing besides by (G2).
    * ***unchanged meeting*** — the event writes only its own records, as on any run or gate; nothing of the raised way is
      written or passed over and nothing is bent for it; the meeting re-reads as *beneath*.

    **The bent-group sentence.** The **bent group** is every stretch laid by neither the `EnceinteStrategy`'s pull nor a
    cost field: VS3's palisade, a stretch re-anchored by hand (an epoch's re-anchored stretch is the
    `EnceinteStrategy`'s, V06 §3.7.6 (1), and takes *beneath*'s pull) (amended, PRB7-12), V06 §3.7.6 (3)'s quay wall, a
    hand `drawWall` (a village T3 `wall` among them), a moved trace vertex, `repairWall`'s new stretch, a run a carve or a
    moved river re-traces (§4.11 *Other crossings*; §7.3 (b) 3), and a run re-sectioned on its kept trace (row W14)
    (amended, PRB7-07). Whatever its shape — crossing the deck, running along beneath it, entering and leaving on one
    side, ending at a support, or carrying a gate into the strip — it meets a standing raised way by one rule: **inside
    the raised way's strip its line holds lawful crossings only**, the strip here being the under-deck strip widened each
    side by the band's half there (§4.8's rows along the stretch profile) together with every held building's widened
    strip that meets it (*beneath*), so that every part and edge below is the band's (amended, PRB7-08, PRB7-01). A
    **lawful crossing** is a part of the line that enters the strip on one long side and leaves it on the other, meeting
    the deck line once: under an aqueduct's span or through a `cleared` support's ring (open ground, C5) (amended,
    PRB7-11), its band's half at most touching a standing support's ring (*the edge*); under a road deck's span or at its
    support (the band laid through the support); its band and wall strips never on the ends (law 1's terms, law 1 (4); J146), and
    its line never in a held building's widened strip. (The strip's long sides are its edges left and right of the deck
    in spine order, each passing outside every held building's widened strip on its side; a point on an end cap belongs
    to the nearer long side.) **Several raised ways** (amended, PRB7B-01): where the strips of two or more standing
    raised ways meet (*Strips, zones and nearest points*), the rule holds for each — inside each one's strip the line
    holds that one's lawful crossings only — and the moves below are made on their union as one strip: its edge is the
    union's boundary, (ii)'s the arc of it between the entry and exit points that encloses with the replaced part no point
    of a deck line, (iii)'s the nearest point of it the end reaches without crossing a deck line, and (i)'s nearest
    lawful crossing the nearest, along the deck line the part first met, that is lawful for every raised way whose strip
    it enters and that its entry and exit points reach along the union's boundary without crossing a deck line. Every
    other part of the line inside the strip is
    replaced, between the points where the line enters and leaves the strip: (i) an unlawful crossing by the nearest lawful
    one along the deck from the point where it met the deck line (ties: nearer the deck's first foot in spine order) — the
    line from its entry point along that side's edge to it, across the strip there and along the other edge to its exit
    point — and a crossing on a road deck's ramp, stair or foot by one beyond the foot, crossing the carried way's ground
    course on ground part 0 through a gate there (the form *down before the wall* gives a road deck); (ii) a part that
    enters and leaves on one side — running along beneath the deck, turning back, or meeting a support — by that side's
    edge between its entry and exit points; (iii) an end inside the strip — a stretch drawn, a vertex moved or a stretch
    re-anchored to end at a support or under the deck — by the line to the nearest point of the edge on the side it
    entered from (a stretch wholly inside the strip: the side nearer its first vertex, ties the left side in spine order),
    an anchor so moved being the fixed-place sentence's (a weld vertex, never in a fixed-place zone, is never inside the
    strip) (amended, PRB7B-03); (iv) a gate whose footprint meets the under-deck strip — not the widened strip above — by
    *beneath*'s *No gate and no tower* (amended, PRB7B-02) — one the user places or slides along the trace, its stub or
    way following (row W13); one the stretch makes for a ground way crossing it inside the under-deck strip along that
    way, the line bent through it by (i)'s path.
    Each move is by hand part of the stroke's bend, named in `bend.wall.raisedCrossing`'s one line (the op's own structure, never a fate: law 4; J146), and at an epoch the stretch's crossings
    of the deck line are counted in `walls.raisedCrossings` as *Reported* says, a move being no count (amended, PRB7-24);
    a moved line stays within (G1)'s reach. With no lawful crossing along the deck — which
    cannot occur while every span's clear width between standing rings exceeds the wall's band, as V11 §3.24.2's and
    §4.8's rows give, and which a table edit can make occur — (G3) holds: by hand `refuse.raised.meeting`; at an epoch the
    stretch's op waits (`walls.waited`), and for a run an epoch's water op — a moved river or a carve — would re-trace,
    which cannot wait once the water has moved, F-REDERIVE's raised-way rung decides before the water is inserted (§5.2:
    the run widened once, else that water op itself waiting) (amended, PRB7B-08); at a village derivation VS3's ladder
    (V07 §3.13's F-V-RAISED) (amended, PRB7-16).

    **The fixed-place sentence.** **Fixed places** are what the wall's own law fixes: a river's water gate (the trace's
    crossing of a river, its bank vertices `Gate.banks`, §4.4 *Water and the waterfront*), a stretch's anchor on its
    barrier with the tower item 106 (a) stands there (`Enceinte.anchors`, §4.4 S5a (1), §4.8 *Towers*), an
    `on_enceinte` castle's weld vertices (`Castle.cityWeld`, §4.2 S3 (8)), every castle's town-side gate (§4.2 S3 (8); §4.8's pinned vertices) (amended, PRB7B-03), a castle's vertex towers, and a walled port's harbour-mouth chain (`Gate.mouth`: its water gate across the entrance and the tower at each head; §4.8) — the members of law 1's class of fixed places (J146) — each read with the footprint of the gate or tower standing there
    (*Strips, zones and nearest points*). The **fixed-place zone** of a raised way is its
    under-deck strip widened each side by the wall strips' widths (§4.8: the band's half and the wider of the inner setback and the outer setback with its glacis or berm) of the wall whose fixed place it is, at that place (law 1's zone; J146). No fixed place stands in a fixed-place zone and none moves along the
    trace off its place: whichever of the wall and the raised way is laid later keeps them apart, never a held thing moved
    (G1). **A trace laid after the raised way** moves the place itself to the nearest point clear of the zone — its river
    crossing along the river, its anchor along its barrier's edge (the shore, bank, cliff top, gorge rim or marsh edge, or
    the earlier enceinte) — a trace by the pull or a cost field treating the river's water and the barrier's edge inside
    the zone as no crossing or anchor site, a stretch of the bent group bent locally to the moved place (by hand part of its bend (J146), named in `bend.wall.raisedCrossing`'s line); with no such point within the trace's reach (its search band;
    `wall.barrierReachM` for an anchor), the trace takes (G3) (F-WALL at generation and at a regeneration,
    `walls.waited` at an epoch — a run an epoch's water op would re-trace taking F-REDERIVE's raised-way rung, §5.2, that
    op waiting where the rung finds no shape (amended, PRB7B-08) —, F-V-RAISED at a village, `refuse.raised.meeting` by hand) (amended, PRB7-16). **A
    castle sited after the raised way** is sited clear of it, never reshaped, nothing the castle's law fixes being moved
    (amended, PRB7B-03): §4.2 S3 (8)'s hard filter takes no claim whose weld vertices lie in a standing raised way's
    fixed-place zone, and S3 (8) fixes the town-side gate at the midpoint of the side with the least-cost path to the
    plaza among the sides whose gate, with its footprint, lies clear of every such zone, a claim with no such side failing
    the filter; a claim the filter
    rejects is the siting's as any — its next candidate, then F-CASTLE's ladder from its re-site rung (§5.2: re-sited,
    reported, else kept without a bailey, reported) —; by hand a castle sited or resized (`setAttr(castle, 'site' | 'baileyArea')`, T3) is sited so, its claim moving whole to the nearest lawful site, else refused (law 2 (a), (c); J146); and its curtain, inner ward and outer arc, fixed by its claim, are a wall line law 1 governs, so the siting admits no claim whose curtain law 1 bars and S6 reads the curtain from the claim's commit (law 2 *Not yet built*; J146). **A harbour-mouth chain laid after the raised way** (S7, V06 §3.7.6 (3), a hand `placeGate` re-adding it) is laid across the entrance at the nearest heads or shore points, along the entrance, whose gate and towers lie clear of the zone; with none it is not laid at generation (`W_RAISED_MEETING`), waits at an epoch (`walls.waited`) and is refused by hand (law 1 (6), law 2; J146). **A raised way created after the wall** keeps every
    fixed place outside its own fixed-place zone and off its ramps, stairs and feet widened by the strip margin, as it
    keeps its strip clear of the trace's gates and towers (*over the band*; at generation S6's aqueduct reads the fixed
    places the trace and the castle record before S7 lays their towers (amended, PRB7B-03)), a course that cannot taking
    (G3); every text that keeps a raised way's strip clear of fixed places means this zone (amended, PRB7-09).

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
    §7.2) — as the same cell unheld, by the lock sentence: no refusal of the meeting, each reshape of the held thing shown
    (G2); whether the row's event may act on its own target at all is the lock sentence's reach (amended, PRB7-03): an op
    whose own target — a wall it converts, deletes, repairs, gates, re-sections, moves or re-anchors, a raised way it edits
    — the user locked or pinned is refused by §7.1's lock row before any meeting, nothing written, while a drawn wall or a
    declared raised way changed by its author's new declaration (§7.2 *Declared means held*) takes its cell, and a carve or
    a moved river across a drawn or locked run is refused as across any locked wall (the lock sentence's reach) (amended,
    PRB7B-07); so "no `refuse.locked`" in a C8 cell means the meeting refuses nothing, and each C8 cell's outcome holds
    once its event acts;
    C9 carried down to the village product — as C2 (V07 §3.12: the standing fabric unchanged); C10 repaired by
    `repairRaised` — as C2, the repair writing the raised way alone, the span or support standing again over a strip this
    table kept clear whatever its state (*Strips, zones and nearest points*), and a hand repair of a dismantled span or a
    `cleared` support, which bends to a new raised part on the way's line (V06 §2.8), keeping the way's course as C12's
    extension does: it is no course laid — a span over a trace laid after the way stands over it again as the fallen one
    did (*beneath*), its new supports placed by (1)–(5) against the obstacles standing then and slid off every standing
    band by (3), aqueduct or road deck alike, its strip and fixed-place zone already clear (*Strips, zones and nearest
    points*) —, and a part whose supports (3) and (4) cannot place off a standing band within their bounds is refused (`refuse.raised.meeting`, (G3)), a part another obstacle bars taking the support step's own outcome for a declared part (the laws govern meetings only; J146)
    (amended, PRB7-14, PRB7B-06); C12 extended by a frame growth — the old deck as it stood; the extension keeps the deck's course
    ((7)), so it is no course laid: where it crosses a band its new supports are slid off that band by (3), aqueduct or
    road deck alike, and the run beneath is read by *beneath*; past a bound the extension that bends by (7)'s bound
    sentence is a course laid then, meeting each standing wall as C13's re-shaped stretch does (amended, PRB7-15); C13 edited by its own op — a hand re-shape of its course (`moveVertex` on a course vertex), `spanSpacingCm` (V09's Arch spacing) or `clearanceCm` (Deck height), and (J146) every other op that names it — its width or class (`setAttr`, `downgradeWay`, `upgradeWay`), a `split` or `merge`, a `warp` that moves it, a `revert` —, each re-checking by law 4 and bent by law 2 (a) to the nearest lawful value, a class change that only its old class makes lawful refused (law 3's last sentence) — the support step re-run where (1)–(5)
    say, against the obstacles standing then: a station in a band laid after slid off it, the band whole across its old
    footprint (*beneath*); a re-shaped aqueduct stretch across a standing band *over the band*; a re-shaped road deck
    stretch across a standing trace bent down before it (`bend.raised.wall`); an edit (3) or (4) cannot place bent to the
    nearest lawful value of what was edited — a spacing or a height to the nearest that places every station, never another
    course; a re-shape to the nearest course (item 101 R2) —; a held building in an arch vault kept as *beneath* says, the
    edit bent to keep every standing trace's line out of that span's widened strip, else refused naming the building
    (amended, PRB7B-05); every other wall event meets an edited raised way as it stands, as C2.

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
    each: an aqueduct's supports off the band, its strip clear of the towers and gates and its fixed-place zone of the
    fixed places (amended, PRB7-09) (`bend.wall.aqueductArch`), a road deck down before the trace (`bend.raised.wall`); a course that cannot is refused by
    hand (`refuse.raised.meeting`), at generation not built, reported, and at an epoch waits (`raised.waited`, V06 §3.19
    (5)). C12's and C13's records are the raised way's own op's ((7); its edit event). The last column gives what the event
    itself writes (its op and records), the gates and §5.3's checks, and a hand edit's bend, fate and report — the same for
    every cell of its row.

    | wall event (paths) | C1 created across it | C2 standing | C3 one span fallen | C4 all spans fallen | C5 support cleared or toppled | C6 `vault` span breached | C7 deleted or suppressed | C8 held (either side) | C9 carried down | C10 repaired | C11 created across a breached or dismantled run | C12 frame growth | C13 edited by its own op | the event's op and records · gates and §5.3 · bend, fate and report |
    |---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
    | **W1** a trace the engine lays — S3's or S5a's with S7's strips, towers and gates and S10's band (G); VS3's palisade (V); an epoch's circuit, contraction or re-anchored stretch (V06 §3.7), V06 §3.7.6 (3)'s waterfront quay wall and (4)'s dossier-admitted circuit (laid through the hand `drawWall` operator's path, counted in `walls.raisedCrossings`, no bend line), and a run an epoch's moved river or carve re-traces (E); a hand `contractWall` (H: S5a's trace step, §4.11) (amended, PRB7-26); a regeneration's is W3 | *over the band* (an aqueduct at S6's end, its strip clear of the trace's gates and towers and its fixed-place zone of the fixed places (amended, PRB7-09), S7's towers after it moved clear; or V06's founding) or *down before the wall* (S4's viaducts, an S3 gate route re-solved by §4.2 S3 (7), and S5b's come down; S6's elevated road and a founded road deck, their ends fixed, not built, at an epoch waiting); a held wall met as an unlocked one · T110-2 (1), (2) | *beneath* · T110-2 (3) (G), T110-2 (4) and T-V6-47 (E), T-V7-48 (V) | *beneath*, own top beneath the fallen span (at a first generation it cannot occur: every raised way is new) · T110-2 (4)·S, T110-2 (7), T-V6-47, T-V7-48·S (V) (amended, PRB7-21) | *beneath*, own top · T110-2 (4)·S, T-V7-48·S (V) | *beneath*, the band whole across the footprint; through a `cleared` ring as open ground, a `ruined` stump met as a standing support · T110-2 (4)·S, T110-2 (7), T-V6-47, T-V7-48·S (V) | *beneath*, no chamber, read as C3 · T110-2 (4)·S, T-V4-63, T-V7-48·S (V) | no meeting · — | as W1·C2, by the lock sentence; a creation prefix's held walls and raised ways (a skeleton's; **Rebuild around my drawings**') meet each other in its log order, each as its declaration's commit resolved and stored it, and every generated structure meets them as held ones standing before its stage (law 2 *Newer*; J146) · T101-4, T110-2 (4)·S (E), T-V7-48 (V: its declared raised ways held) | *beneath* (VS3's palisade laid after it) · T-V7-48 | as W1·C2 (a repaired span stands) · T110-2 (4)·S | *over the band*, the gap left a gap, no repair; a road deck *down before the wall* · T110-2 (1), (2), T-V6-73 | the extension keeping the deck's course, its new supports off a standing band, the run beneath *beneath*; the old deck as it stood · T110-2's frame clause (the extension after the trace), T110-2 (4)·S (E) and T-V7-48's frame-growth clause (V) (the trace after the extension) (amended, PRB7-21) | as W1·C2 on the edited deck · T110-2 (4)·S | the trace's own batches (S3 or S5a L1; S7's L1 strips, towers and gates; S10's band; VS3's; V06's fortification batch; S1's water operator's re-trace) · gates on ground part 0: S5a pins none on a deck and one beyond a foot where its crossing falls on a ramp, stair or foot, S5b spawns to `N_k` (way-and-channel table, row d); §5.3's gate row on ground part 0 · reported by *beneath* (S7's `W_RAISED_CROSSING` at G, `walls.raisedCrossings` at E), each held thing's reshape a `reshaped` entry (G2); no bend (the bent group's local moves are no hand bend); a hand `contractWall`'s dry run a hand `convert`'s line, its crossings in its effects, each held thing's change the fate *reshaped* (amended, PRB7-26); no lawful shape: (G3) — a hand op refused once its own re-pull fails, never a stage left unwalled (law 2 (c); J146) |
    | **W2** a hand stretch (H) — a `drawWall` (a village T3 `wall` among them), a moved trace vertex, a re-anchored stretch, and a run a hand carve or a moved river re-traces (§4.11 *Other crossings*; §7.3 (b) 3: a run neither drawn nor locked, the lock sentence's reach (amended, PRB7B-07)); a gate's slid crossing is W13, a run re-sectioned on its kept trace W14 (amended, PRB7-07) | — | *beneath*, the stretch by the bent-group sentence (beyond a road deck's foot, under an aqueduct's nearest lawful span, along the strip's edge, an end moved to it, through a gate moved clear of the strip); an arch vault in a `vault` span now under the wall removed by V04's reconcile in the commit · T110-2 (4), T110-2 (5) (a carve's re-trace), T-V9-52, T-V4-63 | *beneath*, own top beneath the fallen span · T110-2 (4)·S | *beneath*, own top · T110-2 (4)·S | *beneath*, the band whole; a `cleared` ring open ground, a `ruined` stump a standing support · T110-2 (4)·S | *beneath*, no chamber · T110-2 (4)·S | no meeting · — | as W2·C2, no `refuse.locked`; a locked arch vault's chamber removed, the fate *reshaped* · T110-2 (4)·S | *beneath* (a village T3 `wall`) · T-V7-48 | as W2·C2 · T110-2 (4)·S | — | as W2·C2 · T110-2's frame clause (its ring drawn by hand: the extension after the stretch), T110-2 (4)·S (the stretch after the extension) (amended, PRB7-21) | as W2·C2 · T110-2 (4)·S | §7.3's S7 operator over the run (a carve's or a moved river's re-trace by §4.11 *Other crossings*, a standing raised way and its reservation no F-EDIT conflict) · a gate it makes for a ground way inside the under-deck strip moved along that way clear of it, the stretch bent through it; §5.3's gate row on ground part 0 · `bend.wall.raisedCrossing`, one line; each local move part of that bend (the op's own stroke, never a fate: law 4; J146), a vault's removal a fate, a held one's *reshaped*; no lawful shape: `refuse.raised.meeting`; the undo restores the run and the vault with the same id |
    | **W3** a regeneration re-deriving a ring under a held raised way (R: Regenerate (keep), New random, a re-derivation from a stage, a village Regenerate) | — (a held way is not re-created; a generated one the regeneration lays is W1·C1, a held wall standing before every stage met as an unlocked one) | *beneath*, laid by W1's rules after the held way: nothing of the meeting reads the order, so a ring re-derived on its old trace reproduces its strips, band, towers, gates and vaults; the routes it is derived from are laid after the held raised way and cross it by §4.3's crossing rule (way-and-channel table, row a), so a route the raised way crossed where that rule does not admit it is re-solved, and the boundary and ring with it, every meeting still *beneath*; a pulled trace crosses an aqueduct under a span, never at a support, by its own path · T110-2 (6) | *beneath* as read · T110-2 (6)·S | *beneath* as read · T110-2 (6)·S | *beneath* as read: through a `cleared` ring as open ground, clear of a `ruined` stump as of a standing support · T110-2 (6)·S | *beneath* as read, no chamber · T110-2 (6)·S | a suppressed way stays removed · T110-3 | as W3·C2, a locked arch vault's chamber under the ring not laid (a `reshaped` entry) · T110-2 (6)·S | as W3·C2 (a village Regenerate) · T-V7-48's Regenerate clause | as W3·C2 · T110-2 (6)·S | as W3·C2 (the held way as it stands) · T110-2 (6) | as W3·C2 · T110-2 (6)·S | as W3·C2 (the held way as its edits left it) · T110-2 (6)·S | the regenerated stages' batches; the held raised way written by none; V04's T2 vaults step reads the trace · gates on ground part 0 · reported as W1; no bend |
    | **W4** `DeclineOp`'s `breach` or `dismantle` of a run (E: the pathway's dismantling, V06 §3.7.2 (2); H: a `convert`); a breach by decay is W5 | — | *unchanged meeting* · T110-2 (4) (H), T114-3, T-V6-11 (E) | *unchanged meeting* · T110-2 (4)·S | *unchanged meeting* · T110-2 (4)·S | *unchanged meeting* · T110-2 (4)·S | *unchanged meeting* · T110-2 (4)·S | no meeting · — | *unchanged meeting*, no `refuse.locked` · T110-2 (4)·S | *unchanged meeting* — at a village epoch by the pathway's dismantling (V06 §3.7.2 (2)) and by a hand `convert` (law 4; J146) · T-V7-48's hand `breach` and `dismantle` clause, T110-4 | *unchanged meeting* · T110-2 (4)·S | — | *unchanged meeting* · T110-2 (4)·S | *unchanged meeting* · T110-2 (4)·S | the runs' `condition`, `conditionEpoch` and material over the op's stretch (§2.7), nothing passed over; the `dismantle` that takes the last run of an absorbed record over a `vault` span lays its chamber again (row W8) · gates unchanged · a hand op's line as any `convert`, a chamber it lays again a fate (a held one's *reshaped*; at an epoch a held one's `reshaped` entry) (amended, PRB7-29); no bend |
    | **W5** V06 §3.7.7's decay (`wearWall`, a breach by neglect or poverty) (E; V: V07 §3.4 (8); H: a hand `convert` `wearWall` or `neglect`, amended, PRB7-26) | — | *unchanged meeting* · T114-3, T-V6-73, T110-2 (4) (H) | *unchanged meeting* · T-V6-73·S | *unchanged meeting* · T-V6-73·S | *unchanged meeting* · T-V6-73·S | *unchanged meeting* · T-V6-73·S | no meeting · — | *unchanged meeting* · T-V6-73·S | *unchanged meeting* (V07 §3.4 (8)'s decay) · T-V7-48's decay clause | *unchanged meeting* · T-V6-73·S | — | *unchanged meeting* · T-V6-73·S | *unchanged meeting* · T-V6-73·S | the draws over every run alike, none filtered for a deck · gates unchanged · by hand a `convert`'s line; no bend |
    | **W6** V06 §3.7.2 (1)'s gate opening, `gateToJunction` (E; H: a `convert`) | — | *unchanged meeting*: no gate stands in an under-deck strip, so none it opens lies under a deck · T-V6-47 | as W6·C2 · T-V6-47·S | as W6·C2 · T-V6-47·S | as W6·C2 · T-V6-47·S | as W6·C2 · T-V6-47·S | no meeting · — | as W6·C2 · T-V6-47·S | as W6·C2, at a village epoch's pathway (a palisade neglected or superseded, V06 §3.7.3, §3.7.6 (4)) and by a hand `convert` (law 4; J146) · T-V7-48's hand `gateToJunction` clause, T110-4 | as W6·C2 · T-V6-47·S | — | as W6·C2 · T-V6-47·S | as W6·C2 · T-V6-47·S | the junction (and square) as at any gate · gates on ground part 0 · a hand `convert`'s line; no bend |
    | **W7** `wallToWay` (E; H: a `convert`) | — | the ring road by the way-and-channel table (row c), read in the dry run as after the op: each `vault` span the old wall stood over read as *beneath* reads it then (amended, PRB7-13, PRB7-25) — `vault` where *beneath* reads it so once the op commits (amended, PRB7B-11), its chamber laid again by V04 in the commit and the ring road kept off its strip; else `open`, the ring road crossing under it by the crossing rule · T110-2 (8), T-V6-47 | as W7·C2 at that state, a re-laid vault `collapsed` where its span or a bounding support has fallen (V04 §3.5.4 (d) (2)) · T110-2 (8)·S | as W7·C2 · T110-2 (8)·S | as W7·C2 · T110-2 (8)·S | as W7·C2 · T110-2 (8)·S | no meeting · — | as W7·C2, no `refuse.locked` · T110-2 (8)·S | as W7·C2, at a village epoch at a superseded palisade's pathway's end (V06 §3.7.2 (3)) and by a hand `convert` (law 4; J146) · T-V7-48's hand `wallToWay` clause, T110-4 | as W7·C2 · T110-2 (8)·S | — | as W7·C2 · T110-2 (8)·S | as W7·C2 · T110-2 (8)·S | `retypeEdges`, S9's `corridorUnion`, the ring road's re-route by §7.3's S4 operator in the dry run · gates become junctions (none under a deck); no junction with the raised way · the re-route and the vault a fate (a held vault's *reshaped*) |
    | **W8** `absorbWall` (E; H: a `convert`) | a raised way created across the absorbed record's line (V06 §3.19's founding; a hand declaration) meets each of its runs not yet `dismantled` as a standing wall — the band as it stood over that run before the absorb an obstacle of (3) ((M5)), so an aqueduct *over the band* and a road deck *down before the wall* (that run's line a standing trace), its strip clear of their towers and gates and its fixed-place zone of their fixed places —, a `dismantled` run none (amended, PRB7-18) · T-V6-11 | *unchanged meeting*: the band and strips merged into the blocks (V06 §2.8), the runs standing and dismantled in time as any (row W4); a `vault` span the old wall stood over read `open` while a run of the absorbed record not yet `dismantled` crosses its under-deck strip (*beneath*), V04 laying its chamber again in the commit of the `dismantle` that takes the last such run, or in `absorbWall`'s own where none is left · T-V6-11 | as W8·C2 · T-V6-11·S | as W8·C2 · T-V6-11·S | as W8·C2 · T-V6-11·S | as W8·C2 · T-V6-11·S | no meeting · — | as W8·C2 · T-V6-11·S | as W8·C2, at a village epoch at a superseded palisade's pathway's end (V06 §3.7.2 (3)) and by a hand `convert` (law 4; J146) · T-V7-48's hand `absorbWall` clause, T110-4 | as W8·C2 · T-V6-11·S | as W8·C1, a `breached` run standing and a `dismantled` one none (amended, PRB7-18) · T-V6-11 | as W8·C2 · T-V6-11·S | as W8·C2 · T-V6-11·S | `absorbWall` (V06 §2.8) and V06 §3.7.2 (2)–(3)'s dismantling · gates go with their runs · a hand `convert`'s line, a chamber laid again by hand a fate (a held one's *reshaped*; at an epoch a held one's `reshaped` entry) (amended, PRB7-29) |
    | **W9** the hand-off down that makes the enceinte the village's palisade (E) | — | *unchanged meeting* (V07 §3.12: the standing fabric unchanged); VS3's later re-lay is W1·C9 · T-V7-48 | as W9·C2 · T-V7-48·S | as W9·C2 · T-V7-48·S | as W9·C2 · T-V7-48·S | as W9·C2 · T-V7-48·S | no meeting · — | as W9·C2 · T-V7-48·S | as W9·C2 (this column) · T-V7-48 | as W9·C2 · T-V7-48·S | — | as W9·C2 · T-V7-48's frame-growth clause | as W9·C2 · T-V7-48·S | the plan's revival (V07 §3.12) · the palisade's gates on ground part 0 · — |
    | **W10** `repairWall` (E; H) — on a `dismantled` run its bend, a new stretch drawn on its line | — | *unchanged meeting*; the bend's new stretch is a stretch of the bent group, W2·C2 · T110-2 (4), T114-3's landfall clause (E) | as W10·C2 · T110-2 (4)·S | as W10·C2 · T110-2 (4)·S | as W10·C2 · T110-2 (4)·S | as W10·C2 · T110-2 (4)·S | no meeting · — | as W10·C2 · T110-2 (4)·S | as W10·C2 · T-V7-48's `repairWall` clause | as W10·C2, neither repair waiting on the other · T110-2 (4)·S | — | as W10·C2 · T110-2 (4)·S | as W10·C2 · T110-2 (4)·S | `repairWall` (V06 §2.8) · gates unchanged · `bend.wall.newStretch` on a dismantled run, its new stretch's moves in `bend.wall.raisedCrossing`'s line |
    | **W11** a hand `delete` of a run or of the enceinte (H) | — | *unchanged meeting*: the run (its band, towers, gates) removed, the raised way untouched; V04 lays again an arch vault the run stood over · T110-2 (4), T-V4-63 | as W11·C2, a re-laid vault `collapsed` where its span has fallen · T110-2 (4)·S | as W11·C2 · T110-2 (4)·S | as W11·C2 · T110-2 (4)·S | as W11·C2 · T110-2 (4)·S | no meeting · — | as W11·C2 · T110-2 (4)·S | as W11·C2 · T-V7-48's hand `delete` clause | as W11·C2 · T110-2 (4)·S | — | as W11·C2 · T110-2 (4)·S | as W11·C2 · T110-2 (4)·S | §7.1's `delete` · its gates go with it · fates in the dry run, a chamber laid again among them (a held one's *reshaped*) (amended, PRB7-29); no bend; the undo restores the run and removes the vault again |
    | **W12** V05's landfall over a run beneath a deck (V05 §3.16 (4)) (E) | — | *unchanged meeting* for each record: the run `breached` by the landfall's wall row, the spans and supports its footprint covers `ruined` by theirs — one already `ruined` kept, one already `cleared` kept `cleared` and no member (V05 §3.16 (4)) —, each repaired by its own op (`repairWall`, `repairRaised`), neither waiting on the other · T114-3's landfall clause, T-V5-14 | as W12·C2 · T-V5-14 | as W12·C2 · T-V5-14 | as W12·C2 · T-V5-14 | as W12·C2 · T-V5-14 | no meeting · — | the held side kept, never covered — content the ruin laps around, no member (V05 §3.16 (2); F-SKY-LANDFALL; the lock sentence's reach) — and the other side as W12·C2: a held raised way's spans and supports kept and the run beneath `breached`, a held run kept and the spans and supports over it `ruined` (amended, PRB7-04) · T-V5-14 | as W12·C2 (`sky.islands` runs at every rung, V06 §3.2) · T-V5-14 | as W12·C2 · T114-3's landfall clause | — | as W12·C2 · T-V5-14 | as W12·C2 · T-V5-14 | the landfall's batch (V05 §3.16 (4)–(5)) · a covered tower or gate lies inside its `breached` run (no state of its own), as on any landfall · its undo restores the run and the raised way's parts |
    | **W13** a hand `placeGate` (§7.1's sugar: a stub crossing the trace at `at`), or a gate's crossing slid along the trace by its grip (`moveVertex`, §7.1's T3 row) (H) | — | at an `at` or a slide's end inside the under-deck strip, moved along the trace clear of it — a placed gate to the nearer edge, ties by *Strips, zones and nearest points*, a slid one back to the edge its grip came from (amended, PRB7-10) —, the stub or the gate's way following, the trace unchanged; elsewhere *unchanged meeting* · T110-2 (4), T-V9-52 | as W13·C2 · T110-2 (4)·S | as W13·C2 · T110-2 (4)·S | as W13·C2 · T110-2 (4)·S | as W13·C2 · T110-2 (4)·S | no meeting · — | as W13·C2, no `refuse.locked` · T110-2 (4)·S | as W13·C2 · T-V7-48's hand `placeGate` clause and its bar (0 gates in an under-deck strip) | as W13·C2 · T110-2 (4)·S | — | as W13·C2 · T110-2 (4)·S | as W13·C2 · T110-2 (4)·S | the sugar's expansion (§7.3's S7 operator makes the gate at the stub's crossing, §7.1) or the slide's `moveVertex` · gates on ground part 0, none in an under-deck strip · `bend.wall.raisedCrossing`'s gate form, one line |
    | **W14** a standing wall re-sectioned on its kept trace (amended, PRB7-07) — a hand `setAttr` of a stretch's grade (`profile/<arc ordinal>/grade`) or of the enceinte's kind, re-derived by §7.3's S7 operator (H); V07 §3.11's palisade REPLACEMENT, rebuilt in stone on the palisade's trace, its gates moved along where their stone footprints meet a strip (E: a village epoch; law 2 (a); J146) | — | the run laid again in its new section on its kept trace as a stretch of the bent group (the bent-group sentence: its line kept where its new band crosses lawfully, re-traced locally where it would not), its towers and gates by *No gate and no tower*, each `vault` span its new band or strips meet read `open` and each they leave laid again (*beneath*) · T110-2 (4) (H), T-V7-48 (E) | as W14·C2 · T110-2 (4)·S | as W14·C2 · T110-2 (4)·S | as W14·C2 · T110-2 (4)·S | as W14·C2 · T110-2 (4)·S | no meeting · — | as W14·C2 · T110-2 (4)·S | as W14·C2 (the REPLACEMENT under a carried-down raised way) · T-V7-48 | as W14·C2 · T110-2 (4)·S | — | as W14·C2 · T110-2 (4)·S | as W14·C2 · T110-2 (4)·S | §7.3's S7 operator over the run, its strips re-cut by S10's step (0); V07's REPLACEMENT batch · gates kept, on ground part 0 · by hand `bend.wall.raisedCrossing`'s line, each local move part of that bend (law 4; J146), a held structure other than the run's own *reshaped*; at an epoch each crossing counted in `walls.raisedCrossings` and each held thing's reshape a `reshaped` entry; no lawful shape: (G3) — at a village epoch the REPLACEMENT waiting, `walls.waited` (law 2 (c); J146) |

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
    `vault` span is read as the crossing table's *beneath* reads it, citing that reading and never restating its cases
    (amended, PRB7-13, PRB7B-11). A lock or pin on the raised way never refuses any row (none changes it).

    | row | outcome | ladder · bend | gates | test |
    |---|---|---|---|---|
    | **(a)** a route, S5c's proposal, a stage-2 seed's way, a village tracker, S7's quay, intervallum or castle path | crosses the under-deck strip only by the crossing rule | its own ladder: §4.3's F-ROUTE for a route; §4.4's deflection along the strip or its end there for S5c; V01 §3.17.3 (3)'s F-TEMPLATE rungs and §4.6's lane ladder; V07 §3.5a (3)'s turn; S7's way ending at the strip as at a reservation (an intervallum ending so, the inner strip bounded across the under-deck strip by its inner setback line, §4.8's lead) | — | T110-2 (3) (the intervallum and the castle paths), (5); T-V1-51 (c); T-V7-48 |
    | **(b)** a hand `drawWay` or a moved way | the same | `bend.raised.underSpan` (moved along the deck to cross under the nearest span that admits it); none admits it: `bend.raised.around` (another course by §4.3's router, round the raised way, else the nearest routable pair, §4.3 *Two-point roads*) | a way crossing a trace makes its gate there on ground part 0 (§7.3's S7 row), never inside an under-deck strip: a crossing of the trace there is moved along the deck to the nearest crossing clear of the strip (`bend.raised.underSpan`, its wall form), else the way takes another course (`bend.raised.around`); a `placeGate`'s stub and a slid gate are the crossing table's row W13 | T110-2 (4), (5); T-V9-52 |
    | **(c)** the ring road `wallToWay` makes | the same, the old line being where it is laid, read as after the op: each `vault` span the old wall stood over read as the crossing table's *beneath* reads it once the op commits (amended, PRB7-13, PRB7-25) — `vault`, its strip closed and its chamber laid again by V04 in the commit, where *beneath* reads it so (amended, PRB7B-11); else `open` (the ring road itself read as laid after the op) | in the dry run its spine there is re-routed by §7.3's S4 local operator, between its nearest nodes on either side of the under-deck strip, to cross under the nearest span the rule admits; none admits it: it ends at the strip's edges as at a reservation, reported | its gates become junctions on ground part 0; none with the raised way | T110-2 (8); T-V6-47 |
    | **(d)** S5b's spawned primary | its course comes down before the stage's picked boundary (*down before the wall*), so it crosses the boundary on ground part 0 | §4.3's ladder | each spawned primary a main gate; an earlier arterial crossing the new boundary on a deck is no gate and no part of `c`, so the stage reaches `N_k` gates on ground part 0 (§4.4 S5b; §4.8 *Gates*; §5.3's gate row) | T110-2 (2) |
    | **(e)** a channel — a moat (S3 (10)'s; S5a's outer moat), a canal or a hand carve | passes beneath where its crossing of the under-deck strip meets no support, ramp, stair, foot or `vault` span's strip; elsewhere it stops at the strip's edges, ending against the ground as against a berm (§4.2 S3 (10)) — a moat stopped so leaving the wall's outer strip closed across the under-deck strip by its glacis line and typed there as on a dry stretch (§4.7 S10 (0); §4.8 *Wall strips*); a raised way created across a standing channel keeps its supports out of its water ((3)); a stopped channel reported by what carves it: S3's or S5a's `W_RAISED_CROSSING` at generation and at a regeneration (§4.2 S3 (10); §4.4 *Outer moats*), `walls.raisedCrossings` at an epoch | a hand carve: its crossing first moved along the deck to the nearest crossing that meets none of these (`bend.raised.underSpan`), else stopped at the strip's edges (`bend.raised.around`) | an arterial's deck across a moat by S5a *Outer moats* | T110-2 (1), (3), (5), (6) |

**The sentences after the tables, conformed (model, in these words):**
* **(M1)** (6)'s closing sentence "Nothing waits for a raised way, and no generated course is dropped for later work
  (T110-2)." → "Nothing waits for a raised way but by the crossing table's (G3) — a trace that no lawful crossing or fixed
  place admits — or for a held building in an arch vault (*beneath*), and no generated course is dropped for later work (T110-2)." (J146: the sentence cites "(§2.7's laws, law 2 (c))" after "(G3)".)
* **(M2)** (6)'s lead, "only an op that names it changes it (its edits, V06 §3.19's ops, a landfall, a frame growth's
  extension of its deck by (7)); a wall meets it, whichever was laid first, by the crossing table ((d)). A lock or pin
  holds the same;" → "only an op that names it changes it (its edits, V06 §3.19's ops, a landfall, a frame growth's
  extension of its deck by (7)); a wall meets it, whichever was laid first and with either side held, by the crossing
  table ((d)). A lock or pin holds the same — its placement, never its shape where a wall meets it (the crossing table's lock sentence);". (J146: "(the crossing table's lock sentence)" → "(§2.7's laws, law 2; its worked example the crossing table's lock sentence)".)
* **(M3)** (3)'s slide bound — the text Part H · model gives (this file's pointer; no id is written into §2.7).
* **(M4)** (7)'s extension past a bound — the sentence R7-04 (c) gives (this file's pointer; no id is written into §2.7).
* **(M5)** (amended, PRB7-18) (3)'s obstacle list: "an enceinte's band (`Enceinte.band`, or before S10 has built it the
  band beside the standing trace, its half-widths by §4.8's rows along the stretch profile), whatever its runs' condition"
  → "…, whatever its runs' condition — and, once `absorbWall` has merged a ring's band into the blocks (V06 §2.8), that
  band as it stood over each run of the absorbed record not yet `dismantled` (the crossing table, row W8) —".
* **(M6)** (amended, PRB7B-11) *beneath*'s `vault` reading at its readers inside §2.7, cited and never restated: (6)'s
  lead "the under-deck strip of each `vault` span — but one under a wall, read `open` (the crossing table, *beneath*) —
  are a **reservation**" → "the under-deck strip of each `vault` span — but one the crossing table's *beneath* reads
  `open` — are a **reservation**"; and the span rule's last sentence "Each span the record marks `vault` — but one under a
  wall, read `open` (the crossing table, *beneath*) — holds one arch vault" → "Each span the record marks `vault` — but
  one the crossing table's *beneath* reads `open` — holds one arch vault".

#### Attacking the tables (round-7 note (5)): what a second builder would build from the words, and the words that close it

1. *A user locks a drawn wall and draws an aqueduct across it: refuse or cross?* Cross (*over the band*), no
   `refuse.locked`: the lock sentence, §7.1's lock row citing it, C8 and the test in T110-2 (1) (VDC6-01).
2. *An epoch founds an aqueduct across a ring the user drew: impassable or crossed?* Crossed *over the band*: V06 §3.19
   (5)'s impassable list reads held entities as obstacles to supports, ramps, stairs, feet and the clearing only
   (VEW-r6-04's text), and the founding is run by T110-2 (1) and T-V6-73.
3. *An epoch circuit passes under a locked arch vault: keep the chamber in the band, or remove it?* Neither moves the
   other: the vault's span is held, its chamber not laid while the wall stands, its lock kept with its key; a `reshaped`
   entry; the chamber laid again, locked, when the wall goes (T110-2 (4), T-V4-80 (i)).
4. *A held building seated in that vault?* The wall gives way: its trace keeps the building's widened strip clear and
   crosses under another span — by hand moved there, part of its bend (J146), named in `bend.wall.raisedCrossing`'s line — else its ladder; by
   hand with no other span, `refuse.raised.meeting` naming the building, no Unlock (law 2 (c); J146) (T110-2 (4)) (amended, PRB7-01).
5. *A hand wall drawn along beneath an aqueduct through two piers?* (ii): moved to the strip's edge on its entry side; part of the stroke's bend in `bend.wall.raisedCrossing`'s line (law 4; J146); T110-2 (4).
6. *Ending at a pier?* (iii): the end moved to the edge on its entry side. *Wholly inside the strip?* The side nearer its
   first vertex, ties left in spine order.
7. *A gate's grip slid into the strip: the wall bends or the gate goes back?* The gate goes back along the trace to the
   strip's edge its grip came from (a placed gate to the nearer edge), its road following, the trace unchanged (W13;
   V09's gate form; T110-2 (4), T-V9-52) (amended, PRB7-10).
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
   `breach` of a run the user locked is the op's own target, §7.1's lock row, no meeting; of a drawn run, its author's
   new declaration, the cell's outcome (the lock sentence's reach) (amended, PRB7-03).
13. *`absorbWall` under an aqueduct's `vault` span: when does the vault return?* When the dismantling takes the last
   run of the old wall there (W8), counted into `EpochScope.raised` by V06 (R7-04); T-V6-11·S runs it.
14. *A road deck's re-spacing that can place no station off a band within the slide bound?* The spacing bent to the
   nearest that places every station, never another course (C13).
15. *A retaining wall drawn under a viaduct?* No row: it levels no ground in the strip and passes beneath; nothing of the
   raised way written (the lock sentence's retaining-wall sentence; T110-1) — but a `vault` span it crosses read `open`,
   its chamber removed, and across a span seating a held building moved under another span or at a support, else
   `refuse.raised.meeting` naming the building (law 2 (c); J146) (amended, PRB7B-10).

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
  crossing table; a held ground way passed over (§7.4); a held retaining wall or raised way met as an unheld one, and
  each fixed place impassable to the course's fixed-place zone (amended, PRB7-20, PRB7-09).
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
`reshaped`, `refuse.raised.meeting`) exactly as these ENDs write them. Part P (probe pass 1) adds (amended): **determinism**
E-D11 (§5.2's F-WALL raised-way rung and §5.4's `W_RAISED_MEETING`); **scope** E-S11 (the set's lock bars),
E-S12 ((G3) off the hand path); **V04** E-V4-1's and E-V4-5's further changes; **V06** E-V6-14 (T-V6-4 and the history
× locks row), E-V6-15 (§2.10's `waited` counts); **V07** E-V7-4 (F-V-RAISED); **V09** E-V9-7 (T-V9-13); and the model's
(M5) and row W14. Part P (probe pass 2) adds (amended): **model** (M6) (the `vault` reading at (6)'s lead and the span
rule); **pipeline** E-P9 (§4.4 S5a *Trace* (2)'s pulled impassables), E-P10 (§4.3 *Lattice and costs* and II.7.6);
**determinism** E-D12 (§5.2's F-REDERIVE raised-way rung); **rendering** E-R1 (§11.1's 3-D row); **V01** E-V1-1
(§3.17.3 (2)–(3), T-V1-51); **V04** E-V4-8 (the wiring row) and E-V4-1's, E-V4-3's and E-V4-6's citations; **V06** E-V6-16
(§3.7.6 (5)'s cost field); **V09** E-V9-8 (§4.20.6 (2)); and the further changes Part P's pass-2 rows name. (J146) Part L's ENDs: the model's **E-M1** states the laws at §2.7's support step (6), these blocks after them as worked
examples; determinism's **E-D13** (§5.3's law-1 row) and scope's **E-S13** (T110-4) carry the check; the rest are listed
at Part H's head, with its rule that every text cites "§2.7's laws" and never restates them.

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
text, **pipeline, §4.2 S3 (7)**, after "the gate keeps the pick's identity, ordinal, bearing and route.": "A route whose first point at `T = t_1` lies on a raised stretch of its solved course (a viaduct (5)'s solve priced, §4.3) — or would put its gate where §2.7's laws admit none: on a ramp or stair, nearer its foot than beyond the foot, or with the gate's footprint or the band there over the ends or in the strip (law 1 (1), (4), (5); J146) — is re-solved
whole as (5) solves it, every deck edge whose two ends lie on either side of the stage-1 boundary excluded (the boundary
counting as standing, §4.3 *Where it may not go*; §2.7's crossing table, *down before the wall*); its gate is the re-solved route's first point at `T = t_1`, on ground part 0, which the rest of this step reads as any gate; the harbour gate of (7) is placed likewise, where `L*`, re-solved with every deck edge across the stage-1 boundary excluded, first reaches `T = t_1` (a search over lawful points, §2.7's laws, law 1 (1), law 2 (a); J146); `T` and the
boundary keep (5)'s routes and are not re-derived, and a route the re-solve cannot serve takes F-ROUTE's ladder (§5.2),
reported. The raised stretches of (5)'s routes, so re-solved, stand for every later step of S3 as raised ways laid before
the stage-1 trace: (8)'s siting filter and (9)'s pull, anchors and water gates read their ramps, stairs, feet,
under-deck strips and fixed-place zones (their supports placed at S4's commit by §2.7's support step (6), against the
trace's band) (amended, PRB7B-17) as §2.7's crossing table's *beneath* and fixed-place sentence read a standing
raised way's (the pull keeping each such route's crossing of the boundary as §4.4 S5a *Trace* (2) keeps an arterial's),
and S4 commits them unchanged — their stations and spans read, from S3 (10) on (S3 (10)'s channels, S3 (11)'s harbour route, S4's own routes), as the support step will place them at S4's commit from what stands at S3 (10), the trace's band among it, and S4's commit placing exactly those (§2.7's laws, law 2 *Not yet built*; J146) —; a raised stretch S4 solves on a route of its own is laid after the trace and meets it as
one (*down before the wall*; the fixed-place sentence)." (amended, PRB7-02) And **§4.3 *Where it may not go***: "(at S5b the stage's picked boundary counting as standing;" → "(at S3 (7)
the stage-1 boundary — from S3 (9) on, its trace — and at S5b the stage's picked boundary counting as standing;". The
model's *down before the wall* carries the same words (R7-02). The same rule holds at every regeneration that re-lays S4's
viaducts (row W1·C1 through W3). **Ends:** scope's T110-2 (2) (Part H · scope, E-S2); (J146) pipeline's E-P13 (the harbour gate and the widened trigger at §4.2 S3 (7)) and E-P14 (S3 (10)'s reading of these stretches). `T`'s own lattice (S3 (6)) decides no meeting — law 1 holds whichever lattice `T` reads — and stays the pipeline's (J146; PRB7C-GEN-04).

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
that course meets the new rings (`RaisedFoot`), and meeting each standing wall as a course laid then — an aqueduct *over
the band*, a road deck never across a standing trace, its strip clear of gates and towers and its fixed-place zone of
fixed places (§2.7's crossing table, C12, C13); with none, it keeps its course (the way's line), each station (1)–(2)
place slid by (3) off every obstacle but the water or valley whose bound it fails, never omitted — a support in a water
face kept there, a pier past `maxPierM` kept — and each is reported
(`raised.extendedPastBound`, V06 §2.10; at a hand Re-derive, a row of its dry run's effects) —" (amended, PRB7-15: the
bent course meets the walls; "its course" for "the straight course"; the stations slid by (3) but off the failed bound).
T110-2's bound bar
reads "every clear span and pier within its bound, and no support in water, but a frame growth's extension past a bound
with no fitting course, reported (§2.7's support step (7))". **Ends:** scope (E-S8), V06 (E-V6-13), pipeline (E-P8).

**(d) `wallToWay`'s re-route reads the state after the op (VPC-r6-02).** In the dry run the band still lies on the old
line, so the crossing rule reads a `vault` span under it `open`; in the commit V04 lays that span's chamber across the new
road. **Decision:** the dry run reads the state the op leaves. Home text, **pipeline, §4.11 `wallToWay`**: "to cross under
the nearest span §4.3's crossing rule admits" → "to cross under the nearest span §4.3's crossing rule admits, reading the
state the op leaves: each `vault` span the old wall stood over read as §2.7's crossing table's *beneath* reads it once the
op commits — `vault`, so the ring road keeps off the strip of the chamber V04 lays again, where *beneath* reads it so;
else `open`, the ring road crossing under it by the crossing rule" (amended, PRB7-13, PRB7-25, PRB7B-11: *beneath* cited,
its cases never restated); the
model's row (c) carries it (R7-02 Block 2). **Ends:** scope's T110-2 (8) (E-S7).

**(e) A cleared span at a village (VAL-R6-02).** V07 §3.5a (3) frees a `cleared` span's ground; the base's crossing rule
reads every span by the rule whatever its `state`, a `vault` span's strip closed by its `collapsed` arch vault. **Decision:**
the base's home governs (principle (3)); V07 conforms, as VAL-R6-02's first form words it, and the way-and-channel table's
lead now says "whatever a span's `state`" (R7-02 Block 2).

### R7-05 Readers: the span's `use` as read, and the strip margin's readers

**Governs:** VAL-R6-03 (rendering, major), VEL6-r6-01 (V10, major), VAF-R6T-04 (V01, minor), VV1112-r6-02 (V11, minor).
**Owner rule checked:** item 110 (b)'s vaults; principle (7) (every reader named). **Decision:** every reader of a span's
`use` reads it as *beneath* does — `open` while a wall's band or strip, a run of an absorbed record not yet `dismantled`,
a retaining wall's line, or a way's corridor or channel laid while it read `open` lies across its strip, the record
unchanged — and cites *beneath* for it ("a `vault` span §2.7's crossing table's *beneath* reads `open`"), never restating
the cases, so a case *beneath* adds reaches every reader at once (amended, PRB7B-11); *beneath* names them all (R7-02).
Each reader's FIX is applied in that citing form, its other words as written:
* **VAL-R6-03 (rendering), FIX per R7-05:** §11.1's GeoJSON row: 'each span a Polygon of kind `span` (`use`, `state` —
  item 244's, absent when standing)' → 'each span a Polygon of kind `span` (`use` as §2.7's crossing table's *beneath*
  reads it, `state` — item 244's, absent when standing)'.
* **VEL6-r6-01 (V10), FIX per R7-05:** 1. the raised-way row's last cell: "… from the base's span record" → "… from the
  base's span record — but a span §2.7's crossing table's *beneath* reads `open` is told `open` while it does, with what
  lies under it in V09 §4.20.6 (2)'s words, whatever its recorded `use`, and no arch vault named in it (§2.7's crossing
  table, *beneath*; V09 §4.20.6 (2))"; 2. T-V10-41 adds: "on T110-2 (3)'s c14 fixture with a `vault` span of its S4
  viaduct under stage 2's ring, the clerk's read of the viaduct tells that span `open` with "A wall runs under this
  arch", as its V09 panel and why card do, and after a hand `delete` of that run, with no way, channel or retaining wall
  under the span, tells it `vault` with its arch vault".
* **VAF-R6T-04 (V01), FIX per R7-05:** V01 §1.2's row: "V04 §3.5.4 (item 244's span rule)" → "§2.7's span rule (item 244;
  a `vault` span read as §2.7's crossing table's *beneath* reads it)", the other two cells as they stand.
* The homes and readers that restate the narrower reading take END lines (amended, PRB7B-11): the model's (M6) ((6)'s
  lead, the span rule); pipeline's E-P10 (§4.3 *Lattice and costs*, II.7.6); rendering's E-R1 (§11.1's 3-D row); V01's
  E-V1-1 (§3.17.3 (2)–(3), T-V1-51 (c)); V04's E-V4-8 (its wiring row) with E-V4-1, E-V4-3 and E-V4-6; V09's E-V9-8
  (§4.20.6 (2)); V04's and V06's sweeps. V09 §4.20.6 (2) no longer stands as written (E-V9-8).

The span rule's home is §2.7 (VAF-R6T-04). V11's registry row 80 and W50 name every reader of `structure.stripMarginM`,
VS3's palisade and V07 §3.5a (5)'s village stages among them (VV1112-r6-02's text, as written).

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
the clause's fixture, the state made by scripted ops before the clause's wall event — at an epoch clause, and on a clause whose wall events run over several epochs, the raised way locked by the script once its state is made, so that no epoch repairs, strikes or releases it (V06 §3.1) and the state holds, its meeting the unlocked cell's (§2.7's laws, law 2 *Entry*: a lock decides no meeting; J146) —: C3, a span over the wall's line
`ruined` by a `DeclineOp` `breach` and, on a second run, `cleared` by its `dismantle` after it; C4, every span over the
line `ruined`; C5, the support nearest the line `cleared` — both its spans `ruined` first, then its `dismantle` (V06
§3.19.2 (3)) — and, on a second run, `ruined` by a `topple` (V06 §3.11; it and both its spans, V06 §3.19.2 (4)) — on a declared raised way, which no hazard strikes (§2.7's laws, law 2 *Entry*), the same state made by its author's hand `convert`s (a `breach` of both spans, then of the support; J146) —; C6, a
`vault` span over the line breached — with its arch vault where no wall of the clause stood over the span before the
event, else with none, the span read `open` — (the fixture's seed searched so that one reads `vault`) (amended, PRB7-21);
C8, the raised way locked and, on a second run, pinned; on a third, an arch vault in a `vault` span over the line locked
by the user before any wall of the clause stood over it; in a clause whose event lays a trace, on a fourth, a declared
placement seated in that vault before the event (amended, PRB7-17, PRB7B-17); C10, C3's `ruined` span repaired by `repairRaised`, and, in a clause whose event lays a trace,
the C3 run once more with that span repaired after the event — no gate, tower or fixed place under it (amended, PRB7-14) — and once more with that span `cleared` by its `dismantle` and repaired by hand after the event: a new span on the way's line over the run, its supports off the band, no gate, tower or fixed place under it (amended, PRB7B-06); C12, the deck extended by a frame growth (on the clause's variant whose raised way ends on the frame's outer ring, §2.7 *At the frame*, the frame grown by an epoch before the event; J146); C13, the raised
way's Arch spacing edited, on a second run its Deck height, on a third its course re-shaped by a hand `moveVertex`. Each
run takes its cell of §2.7's crossing table: the event's own records only, nothing of the raised way written by the clause's wall events (J146) but a chamber the table removes or lays again (`collapsed` where its span or a bounding support has fallen), the run's top
read by *beneath* for that state, no gate's or tower's footprint in the under-deck strip (amended, PRB7B-02), each held thing's reshape shown ((G2)), and
every station, key, span and state the event does not name unchanged." The sweep's users are the table's "·S" cells:
T110-2 (4) (rows W1 at an epoch, W2, W4, W10, W11, W13), (6) (W3) and (8) (W7); T-V6-73 (W5), T-V6-11 (W8 and W4 at an
epoch), T-V6-47 (W6); T-V7-48 (W9). V05's T-V5-14 already runs W12 over each state (round 6), its words standing. Its
schedule (§13.8): the C5 `topple` run at the later of the clause's exit and M6-E's E5 (the hazards); the C6 runs and
every arch-vault clause at the later of the clause's exit and M6-U's U3 (VCS-r6-03, generalised). **Ends:** scope (E-S0,
E-S4, E-S6, E-S7, E-S10), V06 (E-V6-3, E-V6-7, E-V6-8, E-V6-11), V07 (E-V7-1, E-V7-3).

**(b) One wording for the arch-vault bars (VAT6-r6-01 = VAP-r6-04).** T-V4-63's "names a standing span" and T-V6-64's
"none under a fallen one" fail a correct build: V04 §3.5.4 (d) (2) keeps a `collapsed` vault under a fallen span, and
§4.11's `DeclineOp` collapses it in the batch. **Decision:** one wording, home V04 §3.5.4 (d), each bar citing it: "every
arch vault's key names a span of the way whose `use` is `vault` and which §2.7's crossing table's *beneath* reads `vault`
— its chamber open under a standing span, `collapsed` under one whose span or a bounding support is `ruined` or `cleared`
(V04 §3.5.4 (d) (2)) — and no arch vault stands where its span no longer exists or is `open` or read `open` (V04 §3.5.4
(d) (3))" (amended, PRB7-13: *beneath* is cited, not restated, so the reading under a wall and under a way or channel laid
while it read `open` are both held). T-V4-63's bar
and T-V6-64's clause take it; V06 §3.19.2 (3)'s "so no chamber stands under a fallen span at any batch" → "so no chamber
stands open under a fallen span at any batch" (blind spot (c)).

**(c) The other test findings**, each its `required_change` as Part H rules: regeneration at fallen states and the
re-laid vault after `wallToWay` (VEL6-r6-02, VM-R6T-02: T110-2 (6)·S and (8)); castle paths (VAF-R6T-03: T110-2 (3));
the hand rows locked and pinned and over the sweep (VAP-r6-01, VAP-r6-02: T110-2 (4), (8)); a re-shape across a standing
ring (VCS-r6-01, amended: a raised way the user locked has its own re-shape refused by §7.1's lock row — the user
unlocks first — while a declared one is re-shaped by its author (the lock sentence's reach; amended, PRB7-03), so the
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
  its deck line, S3's and S5a's traces alike, and at a village derivation VS3 counts its palisade's (amended, PRB7B-16);
  S3 and S5a each count the moats and canals they carve that stop at an under-deck strip. §5.4's comment, §4.4 S5a
  *Outer moats*, §4.2 S3 (10) and T110-2 (3) as VDC6-02's `required_change` words them, §5.4's comment with "S3's and
  S5a's traces alike" → "S3's and S5a's traces alike, and VS3's one per crossing of its palisade at a village derivation
  (V07 §3.5a)" (amended, PRB7B-16) (determinism's share is §5.4; pipeline's the other two; scope's T110-2 (3)); the
  model's *beneath* and row (e) carry it (R7-02).
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
means the issue's `required_change` in `work/round7-work/<unit>.json`. Every text quoted "old → new" keeps every other word as it stands; a quoted old text may run across a line break in the live file.

(J146) **Cite the laws, never restate them.** Every text a seat writes or conforms under this file — each END line and
FIX below, and each restatement its sweep finds at §4.x, §5.3, §7.1–§7.4, §8, §11 and the volume sites these headings
name — cites a rule of how a wall-like structure and a raised way meet as "§2.7's laws" with the law's number ("(§2.7's
laws, law 1 (5))"), followed, where it names an outcome, a sentence, a row or a cell, by that name as its worked example
("(§2.7's laws, law 2; its worked example *down before the wall*)"). An END line's quoted new text is written as given
(R7-01), save that (J146) each citation in it of the crossing table, an outcome, the lock, bent-group or fixed-place
sentence, (G1)–(G3) or a row is written with "§2.7's laws, law n;" before it, the law Part L's correction 4 names, and a
clause in it that restates a law is written as that citation; the seat names each such change in its report. New END
lines (J146): E-M1 (model); E-D13 – E-D16 (determinism); E-S13 – E-S16 (scope); E-P11 – E-P14 (pipeline); E-R2
(rendering); E-V6-17 – E-V6-19 (V06); E-V7-5 – E-V7-7 (V07); E-V9-9 (V09); E-V10-1, E-V10-2 (V10); E-V12-1 (V12).
Amended in place (J146): E-S0, E-S4, E-S9, E-S10, E-D1, E-D3, E-D4, E-D6, E-D10, E-D11, E-P4, E-V4-2, E-V4-4, E-V6-1,
E-V6-8, E-V6-11, E-V9-3, E-V9-5, E-V9-6, E-V9-8, VAL-R6-05's and VPC-r6-05's notes, and V04's, V06's and V07's sweeps.

### scope (base §0–§1, §13–§17, the index, INDEX.md)

| id | sev | grade | disposition | note |
|---|---|---|---|---|
| VAF-R6T-03 | major | major | FIX per R7-06 | E-S3's castle-path text (its required text, placed in (3)) |
| VAP-r6-01 | major | major | FIX per R7-02, R7-06 | E-S4 and E-S7: the hand rows and `wallToWay` run with the raised way locked and pinned inside the state sweep (its C8); the model's END (W4·C8, W10·C8 → T110-2 (4)) is in R7-02's table; V06's END is E-V6-8 (3) |
| VAP-r6-02 | minor | minor | FIX per R7-06 | E-S4 and E-S7: the hand rows and `wallToWay` over the state sweep, in place of the clause lists the issue writes; the model's cells are R7-02's table |
| VEL6-r6-02 | major | major | FIX per R7-06 | E-S6 (row W3 over the state sweep), one text with VM-R6T-02 (1) |
| VM-R6T-02 | major | major | FIX per R7-04, R7-06 | (1) E-S6 with VEL6-r6-02; (2) E-S7's `vault`-span case, which reads the vault as the dry run reads it after the op (R7-04 (d)) |
| VCS-r6-01 | major | major | FIX, amended | E-S4's re-shape clause; amended: a raised way the user locked has its own re-shape refused by §7.1's lock row (it targets the locked thing; the user unlocks), a declared one being re-shaped by its author (the lock sentence's reach; amended, PRB7-03), so the lock run locks the ring, drawn by hand, and checks no `refuse.locked` for the meeting |
| VCS-r6-02 | major | major | FIX | E-S6's first change, as written |
| VCS-r6-03 | minor | minor | FIX per R7-06 | E-S10, generalised to every arch-vault clause and the sweep's runs |

**Texts scope writes** (all in §13.2's T110 bullet and §13.8; ends of VDC6-01, VEW-r6-04, VAL-R6-01 = VEW-r6-02,
VEL6-r6-04, VAT-r6-02 = VV910-r6-01, VPC-r6-01, VPC-r6-02, VPC-r6-03, VEW-r6-01, VEW-r6-03, VM-R6T-01, VAT6-r6-02,
VDC6-02 and VV56-r6-06 included):
* **E-S0 — T110-2's lead.** "**the wall and later work** (§2.7's crossing and way-and-channel tables; every count below of
  way corridors over a support ring or a `vault` span's strip reading standing rings and `vault` spans no wall stands
  over):" → "**the wall and later work** (§2.7's crossing and way-and-channel tables, with the crossing table's lock,
  bent-group and fixed-place sentences; every count below of way corridors over a support ring or a `vault` span's strip
  reading standing rings and `vault` spans as the crossing table's *beneath* reads them (amended, PRB7-13); **the state
  sweep** — where a clause runs over it, the
  clause's case run once more for each of these states of its raised way, each on its own run of the clause's fixture,
  the state made by scripted ops before the clause's wall event — at an epoch clause, and on a clause whose wall events run over several epochs, the raised way locked by the script once its state is made, so that no epoch repairs, strikes or releases it (V06 §3.1) and the state holds, its meeting the unlocked cell's (§2.7's laws, law 2 *Entry*: a lock decides no meeting; J146) —: C3, a span over the wall's line `ruined` by a
  `DeclineOp` `breach` and, on a second run, `cleared` by its `dismantle` after it; C4, every span over the line
  `ruined`; C5, the support nearest the line `cleared` — both its spans `ruined` first, then its `dismantle` (V06 §3.19.2
  (3)) — and, on a second run, `ruined` by a `topple` (V06 §3.11; it and both its spans, V06 §3.19.2 (4)) — on a declared raised way, which no hazard strikes (§2.7's laws, law 2 *Entry*), the same state made by its author's hand `convert`s (a `breach` of both spans, then of the support; J146) —; C6, a `vault`
  span over the line breached — with its arch vault where no wall of the clause stood over the span before the event,
  else with none, the span read `open` — (the fixture's seed searched so that one reads `vault`) (amended, PRB7-21); C8,
  the raised way locked and, on a second run, pinned; on a third, an arch vault in a `vault` span over the line locked by
  the user before any wall of the clause stood over it; in a clause whose event lays a trace, on a fourth, a declared
  placement seated in that vault before the event (amended, PRB7-17, PRB7B-17); C10, C3's `ruined` span repaired by `repairRaised`, and, in a clause whose event lays a
  trace, the C3 run once more with that span repaired after the event — no gate, tower or fixed place under it (amended, PRB7-14) — and once more with that span `cleared` by its `dismantle` and repaired by hand after the event: a new span on the way's line over the run, its supports off the band, no gate, tower or fixed place under it (amended, PRB7B-06); C12, the deck extended by a frame growth (on the clause's variant whose raised way ends on the frame's outer ring, §2.7 *At the frame*, the frame grown by an epoch before the event; J146); C13, the raised
  way's Arch spacing edited, on a second run its Deck height, on a third its course re-shaped by a hand `moveVertex`.
  Each run takes its cell of §2.7's crossing table: the event's own records only, nothing of the raised way written by the clause's wall events (J146) but a chamber the table removes or lays again (`collapsed` where its span or a bounding support has fallen), the run's top
  read by *beneath* for that state, no gate's or tower's footprint in the under-deck strip (amended, PRB7B-02), each held thing's reshape shown (the lock
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
  §3.19 (5)), and on a fourth across a retaining wall drawn by hand — passed over, a support on its line built against
  it, nothing of it written (the lock sentence's retaining wall; V06 §3.19 (5))" (amended, PRB7-20).
* **E-S2 — (2) *down before the wall*.** "a CITY whose S4 route's best course crosses a valley at S3's gate, its deck down
  before the trace and its route through the gate on ground part 0" → "a CITY whose S4 route's best course crosses a
  valley at S3's gate, its deck down before the trace and its route through the gate on ground part 0 — S3's gate route,
  whose first point at `T = t_1` lay on its priced deck, re-solved by §4.2 S3 (7) with no deck across the stage-1
  boundary, the gate on ground part 0 and S4 committing the re-solved route —"; "not founded, `raised.waited` at each
  epoch" → "not founded, `raised.waited` at each CITY and METROPOLIS epoch while the CITY ring's trace stands"; and after
  "0 road decks across a trace standing when laid;" add " a hand raised road drawn across a wall drawn by hand where no
  gate stands on its ground course — brought down before it, its ground way's gate made in the held wall with the fate
  *reshaped* naming it (the lock sentence), its course beyond the wall a ground way on ground part 0 to the stroke's end,
  the undo restoring the wall; a regeneration (keep) of a CITY whose stage-1 ring was drawn by hand, an S4 route priced on
  a deck across it — the deck down before the ring and the route through one of the ring's standing gates, no gate made,
  the ring's gate count unchanged — and an epoch route priced on a deck across a standing ring, through a standing gate
  likewise (§2.7's crossing table, *down before the wall*; §5.3's gate row);" (amended, PRB7-06, PRB7-27); and after that
  addition add " an epoch on that CITY fixture growing a walled stage whose S5b spawned primary's best course crosses a
  valley at the stage's picked boundary on a priced deck — the deck down before the boundary, the primary's main gate on
  ground part 0 made by the stage's gate law, the stage's gates exactly `N_k` (§2.7's crossing table, *down before the
  wall*; its way-and-channel table, row (d));" (amended, PRB7B-04).
* **E-S3 — (3) *beneath* at generation.** After "no ramp, stair or foot in the band or the channel, the stage's `N_k`
  gates on ground part 0;" add " a variant whose picked boundary crosses that deck within the pull's search band of the
  valley's rim — the pulled trace crossing it under the deck and never on its ground course beyond the foot, the stage's
  gates exactly `N_k`, 0 non-gate crossings (§4.4 S5a *Trace* (2)); a stage-2 ring whose boundary crosses the river under
  an S4 viaduct's span and, on a second run, is anchored on that river's bank inside the viaduct's fixed-place zone — the
  river crossing with its water gate, and the anchor with its tower, moved along the river clear of the zone, the trace
  laid to them; a spur town whose gorge-side stretch would anchor on the rim where a gate route's priced viaduct crosses
  the gorge — the anchor, laid after that viaduct (§4.2 S3 (9) after (5)), moved along the rim clear of its fixed-place
  zone with its tower — and, on a second run, where a viaduct on an S4 route of its own would cross there, that viaduct,
  laid after the stage-1 trace, keeping the anchor outside its fixed-place zone (amended, PRB7-02); and a stage-2 ring
  anchored on that rim after the viaduct, the anchor moved along the rim clear of the zone with its tower; an
  `on_enceinte` castle sited at generation beside a gate route's viaduct, its weld vertices outside the viaduct's
  fixed-place zone (§4.2 S3 (8)'s filter) (amended, PRB7-02); a castle sited at a regeneration (keep) beside a held
  aqueduct whose fixed-place zone holds its first candidate's weld vertex and, on a second run, the midpoint of its
  least-cost side — the first claim passed over for the siting's next candidate, the second castle's town-side gate fixed
  on its next side clear of the zone, no weld vertex or gate moved after siting (amended, PRB7B-03); 0 fixed places —
  water gates, anchors with their towers, weld vertices and castles' town-side gates, each with its footprint — in a
  fixed-place zone, and 0 gates' or towers' footprints in an under-deck strip (the fixed-place sentence; *Strips, zones
  and nearest points*) (amended, PRB7B-02, PRB7B-03); a CITY fixture holding a declared
  masonry aqueduct across a corner of a castle's bailey (*over the band*), regenerated (keep), so that S7 lays the
  castle's internal paths (keep ↔ gatehouse ↔ wall stairs, §4.8) after it: each path crossing the under-deck strip under
  a span §4.3 admits or ending at the strip as at a reservation, 0 path corridors over a support ring, ramp, stair, foot
  or `vault` span's strip (§2.7's way-and-channel table, row a); and in every case of this clause each crossing of the
  ring's trace with a deck line counted once in S7's `W_RAISED_CROSSING` and each stopped channel once in S3's or S5a's
  (§5.4);".
* **E-S4 — (4) *beneath* by hand and at an epoch.** After "and the viaduct's Arch spacing changed after the wall was
  drawn — its station in the band slid off it, the band whole there" add "; the hand rows of §2.7's crossing table on
  this clause's standing aqueduct with a `vault` span in its line and on its declared viaduct — a hand `convert` `breach`
  and `dismantle` of the epoch circuit's run beneath (W4), a hand `convert` `wearWall` and `neglect` of it (W5), a
  `repairWall` of the breached run and of the `dismantled` one, its new stretch drawn on its line and meeting the raised
  way as a hand `drawWall` does (W10), a hand `delete` of the run (W11), a hand `placeGate` inside the under-deck strip
  and a gate of that wall slid by its grip into the strip — the placed gate moved along the trace to the strip's nearer
  edge and the slid one back to the edge its grip came from, its road following, the trace unchanged, with
  `bend.wall.raisedCrossing`'s gate form (W13) —, a hand `contractWall` of the ring across the aqueduct (W1 by hand) and
  a hand `setAttr` re-grading a `light` stretch of the hand `drawWall` above to `full` under the aqueduct — its wider band kept
  to a lawful crossing by the bent-group sentence, re-traced locally where it would not cross lawfully, a fate (W14) —,
  together with the epoch circuit and the hand `drawWall` above (W1, W2), each run over the state sweep: each its cell's
  outcome, no `refuse.locked` with the raised way locked or pinned, an arch vault a delete lays again `collapsed` where
  its span has fallen; each hand row run again on the hand `drawWall`'s run (drawn, so changed by its author: the
  cell's outcome) and on a run the user locked (§7.1's lock row: `refuse.locked`, nothing written) (the lock sentence's
  reach); a hand `drawWall` drawn along beneath a standing aqueduct through two of its supports, one
  entering and leaving its under-deck strip on one side, and one ending at a support — each such part moved to the
  strip's edge on its entry side, its band outside the under-deck strip, part of its bend (J146), named in `bend.wall.raisedCrossing`'s line,
  every station, key and span unchanged (the bent-group sentence); an epoch circuit across a standing aqueduct whose `vault` span holds a locked arch vault — the
  circuit crossing under that span, its chamber not laid while the wall stands, its lock and id kept, a `reshaped` entry
  naming it, and after a hand `delete` of that run the chamber laid again, locked, with the same id; the same by a hand
  `drawWall`, with the fate *reshaped*; on a second run with a declared placement seated in that vault — the circuit
  crossing under another span, the building, its chamber and its door unchanged, 0 footprints in a band or setback, no
  band or wall strip of a crossing at the neighbouring span over its span's strip, and a hand `drawWall` across that span
  moved to cross under the nearest span clear of the building's widened strip, part of its bend (J146), named in `bend.wall.raisedCrossing`'s
  line, the building, its chamber and its door unchanged, and on a one-span way the same stroke refused `refuse.raised.meeting` naming the building, no Unlock offered (J146: §2.7's laws, law 2 (c)); and, on a CITY fixture whose standing
  ring was drawn by hand (locked by its drawing), a standing aqueduct's course re-shaped by hand so that a stretch of it
  crosses the ring — that stretch *over the band*, its supports off the band, its under-deck strip clear of the ring's
  gates and towers and its fixed-place zone of the ring's fixed places — and a standing declared viaduct's course re-shaped so that a stretch of it
  crosses the ring — brought down before the trace, its way through a gate there on ground part 0, a gate made in the
  held ring with the fate *reshaped*, with `bend.raised.wall` —, no `refuse.locked` (§2.7's crossing table, C13 and the
  lock sentence)" (amended, PRB7-01, PRB7-03, PRB7-07, PRB7-08, PRB7-09, PRB7-10, PRB7-26); and after that addition add
  "; on a variant whose standing aqueduct and declared viaduct cross the epoch circuit's planned line with their
  under-deck strips within the ring's band's width of each other, the epoch circuit and a hand `drawWall` across both —
  each crossing lawful for both deck lines, every tower, gate and fixed place clear of the union of their strips and
  zones, none moved from one into the other, nothing of either raised way written (§2.7's crossing table, *Several raised
  ways*) (amended, PRB7B-01); the standing aqueduct with a declared placement seated in a `vault` span, its course
  re-shaped by hand and, on a second run, its Arch spacing edited so that the span's widened strip would take in the
  epoch circuit's standing line — the edit bent to the nearest course or spacing that keeps the line out of it, the
  building, its chamber and its door unchanged, and, where none does, refused `refuse.raised.meeting` naming the building, no Unlock offered (J146: law 2 (c))
  (amended, PRB7B-05); an epoch circuit and, on a second run, an epoch contraction whose planned water gate and anchor
  fall in the declared viaduct's fixed-place zone — each moved along the river or the barrier's edge clear of the zone
  with its tower, the trace laid to it, counted in neither `walls.waited` nor `walls.raisedCrossings`; a hand `drawWall`
  whose end snaps to a shore inside that zone with a clear point within `wall.barrierReachM` — the anchor moved along the
  shore clear of it with its tower, part of its bend (J146), named in `bend.wall.raisedCrossing`'s line in its fixed-place form; and a hand
  `setAttr` of the hand `drawWall`'s kind, under the aqueduct, to a kind whose band is wider (W14), as the grade change
  (amended, PRB7B-13)".
* **E-S5 — (5) ways and channels.** After "and one wider than the clear width between every two of its supports," add " a
  hand carve of a canal across a generated ring beneath which a standing aqueduct passes, its re-traced run's new strips
  meeting the aqueduct's supports — the run meeting it by §2.7's crossing table (*beneath*, row W2), bent where the
  bent-group sentence says, no F-EDIT conflict (§4.11 *Other crossings*) —, and the same carve across a ring drawn by
  hand — refused by §7.1's lock row (`refuse.water`), nothing written (the lock sentence's reach) —" (amended,
  PRB7B-07).
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
  between standing rings, every station, key, span and state of the aqueduct unchanged; and a CITY whose stage-1 ring
  was drawn by hand, regenerated (keep) and given New random — the ring held before every stage, (1)'s S6 aqueduct *over
  the band* with its strip clear of the ring's standing towers and gates and its fixed-place zone of the ring's fixed
  places, an S4 route priced on a deck across it brought down before it through a standing gate, nothing of the held
  ring changed but by the lock sentence" (amended, PRB7-17).
* **E-S7 — (8) `wallToWay`.** After "no junction with the raised way" (the clause's end, before "(T110-3)") add "; the
  same on a fixture whose old line passed under a `vault` span of a standing aqueduct with no other way or channel under
  it — the dry run reading that span `vault` (the state the op leaves), the ring road re-routed under another span, the
  arch vault laid again with its id in the commit, 0 way corridors over its strip (§2.7's way-and-channel table, row c);
  on a second run with the intervallum also passing under that span — the span read `open` while the intervallum lies
  there, no chamber over the lane, the ring road crossing under it by the crossing rule, and a hand `delete` of the
  intervallum then laying the chamber again with its id; on a third with the moat passing under it — the span read
  `open` while its water lies there, no chamber in the water (§2.7's crossing table, *beneath*) (amended, PRB7-13); and (3)'s `wallToWay` run over the
  state sweep, its viaduct locked and pinned among them — the ring road by row (c) read at that state, a re-laid vault
  `collapsed` where its span has fallen, no `refuse.locked`".
* **E-S8 — the frame clause and the bound bar.** In T110-2's frame clause, after "and the same with that ring drawn by
  hand (W2·C12)" add "; and, on a variant whose grown frame reveals across the aqueduct's course a river wider than
  `raisedWays.structure.maxClearSpanM` and, on a second run, a valley deeper than its `maxPierM` — first with a fitting
  course in reach, then with none — the extension bent to the nearest course whose clear spans and piers fit, both ends of
  its ring-end foot on the new rings, and, with none, kept on its course with its support in the water and its pier past
  the bound, each counted in `raised.extendedPastBound`, the aqueduct kept and nothing waiting (§2.7's support step (7)),
  and, on a variant whose fitting course crosses a standing ring, that course *over the band* as a course laid then
  (§2.7's crossing table, C12)" (amended, PRB7-15);
  and in the support step's clause "a declared one bent to a course whose clear spans fit
  `raisedWays.structure.maxClearSpanM`, no support in water;" → "a declared one bent to a course whose clear spans fit
  `raisedWays.structure.maxClearSpanM`, no support in water but a frame growth's extension with no fitting course
  (above);".
* **E-S9 — T110-1.** "(T110-1) retaining walls on terraced slopes above the thresholds and nowhere flat, every way crossing
  one a stair or a ramp, and one meeting the frame's outer ring ending on it;" → "… ending on it, and a T3 `retaining` wall
  drawn across a standing viaduct's under-deck strip through one of its supports — levelling no ground inside the strip,
  laid through the support, every station, key and span unchanged (§2.7's crossing table, the lock sentence's retaining
  wall); the same stroke drawn across a `vault` span of a standing aqueduct — the span read `open` while the line lies
  there, its arch vault removed by V04's reconcile (a fate), and laid again with its id when the stroke is deleted; on a
  second run with a declared placement seated in that vault, the stroke moved along the deck to cross under the nearest
  span whose chamber seats none, or at a support, part of its bend (J146: law 4), the building, its chamber and its door unchanged, and on a
  one-span way refused `refuse.raised.meeting` naming the building, no Unlock offered (J146: §2.7's laws, law 2 (c)); and an aqueduct drawn across a standing retaining wall — no
  arch vault in a `vault` span over its line (*beneath*);" (amended, PRB7B-10).
* **E-S10 — §13.8's T110 row.** After "those of (1), (2), (4), (5), (7) and (8) on volume 6's engine with M6-E's E2 and
  E3" add "; the state sweep's `topple` runs at the later of their milestone and M6-E's E5, which builds the hazards, and
  every arch-vault clause — (1)'s, (4)'s, (6)'s, (8)'s and the sweep's C6 runs — at the later of their milestone and M6-U's U3, which lays the arch vaults (V04 §8)"; and (J146) "; and every run whose arch-vault outcome follows an epoch's wall event — T-V6-11's re-lay, T-V6-47's vault bar and the sweep's epoch C6 runs among them — at the later of M6-U's U5 and M6-E's E8, which reconcile the arch vaults over `EpochScope.raised` (V04 §8; V06 §8)".
* **E-S11 — the set's lock bars** (amended, PRB7-05; blind spot (c)). §15.2's O9 (b) "locked preserved 100 %" →
  "locked preserved 100 % (a wall, a raised way or an arch vault in its placement, its shape where they meet §2.7's
  crossing table's: its lock sentence)"; §13.2's T101-5 "no declaration contradicts a dossier fact or a lock without a
  refusal" → "no declaration contradicts a dossier fact or a lock without a refusal (a meeting of a wall and a raised way
  contradicting no lock: §2.7's crossing table, its lock sentence)".
* **E-S12 — (G3) off the hand path** (amended, PRB7-16). T110-2 (3) adds at its end: "; on a variant whose
  `raisedWays.structure.pierSpacingM` band a table edit narrows so that no span of an S4 viaduct across the stage-2
  boundary admits the wall's band — F-WALL's raised-way rung: the boundary re-pulled once round the viaduct, else the
  stage left unwalled and `W_RAISED_MEETING` reported, nothing of the viaduct changed (§5.2; §2.7's crossing table,
  (G3))"; T110-2 (6) adds: "; and that variant regenerated (keep) with its viaduct held — the same rung"; T110-2 (4) adds:
  "; on the same table edit, an epoch circuit across the standing aqueduct waiting (`walls.waited`), and a hand
  `drawWall` across it and a hand stretch whose anchor lies inside its fixed-place zone with no clear point within
  `wall.barrierReachM`, each refused `refuse.raised.meeting` with the nearest lawful declarations, nothing of either
  written; and, on a fixture whose river crosses the ring beside a viaduct over the river, an epoch `shiftCourse` that
  would carry the ring's river crossing into the viaduct's fixed-place zone — the re-traced run widened once to the next
  towers, its water gate clear of the zone, and, on a second run where no clear point lies within the widened run, the
  shift not made that epoch and counted in `walls.waited`, the river, the ring and the viaduct unchanged (F-REDERIVE's
  raised-way rung, §5.2)" (amended, PRB7B-08). V07's run is E-V7-1's (F-V-RAISED).
* **E-S13 — T110-4, the laws' property bar** (J146; the laws' check). §13.2's item-110 bullet, after T110-3's clause,
  adds: "(T110-4) **the family's laws** (§2.7's laws; J146): §5.3's law-1 row passes after every commit — (a) on every
  fixture of T110-1 – T110-3, T114-3, T-V4-63, T-V4-80, T-V5-14, T-V6-11, T-V6-47, T-V6-48 (with a declared viaduct over
  its harbour mouth), T-V6-71, T-V6-73, T-V7-32, T-V7-48 and T-V9-52; (b) on each of those clauses' raised ways over the
  state sweep (T110-2's lead); and (c) on a randomised sequence of 200 ops on each of 32 fixed seeds — CITY and
  METROPOLIS maps with at least two raised ways (an aqueduct with a `vault` span seating a held building, and a road
  deck, one of the two held) and a village rung — its ops drawn from law 4's list on every path: a generation from a
  creation prefix (a skeleton), Regenerate (keep), New random, an epoch run of 20 epochs with the hazards and the landfall
  on, a village derivation and its epochs, a history replay, and hand ops sent both as the canvas's scripted gestures and
  as the clerk's calls, each hand op undone on a second run; and on every run: each op's outcome one digest on two hosts;
  no meeting refused, skipped or altered for a lock; each reshape of a held structure other than the op's own shown (an
  `EditFate` *reshaped* by hand, a `reshaped` report entry otherwise); each undo restoring the prior digest; and each
  skeleton exported and re-imported reproducing its source's model digest (T101-4)". A clause or cell of §2.7's worked
  examples that names a test keeps it; T110-4 is what holds a case no example lists.
* **E-S14 — §13.8's T110 row** (J146; PRB7C-TIM-11). It adds: "; T110-4's runs each at the later of its path's
  providers — generation at M3a's raised ways, arch vaults at M6-U's U3 (and at an epoch U5), an epoch at M6-E's E3,
  its hazards at E5 and its arch-vault reconcile at E8, a village at V07's V-M3, hand ops and the clerk at the milestones
  §13.8 gives V09's and V10's tools".
* **E-S15 — T101-4** (J146; PRB7C-LCK-10). "a map's declared subset exported as a skeleton and re-imported under its seed
  reproduces its model digest" adds: "; a skeleton exported from a hand map on which a raised road was declared and a wall
  then drawn beneath it, and from one on which the wall came first and the road was brought down before it, each
  re-imported to its source's model digest (§2.7's laws, law 2 *Newer*: a creation prefix meets in its log order)".
* **E-S16 — T110-2 (7)'s fallen state at an epoch** (J146; PRB7C-TIM-04). T110-2 (7)'s "after a span over its planned
  band fell `ruined` and after a support there was `cleared`" → "after a span over its planned band fell `ruined` and
  after a support there was `cleared`, the aqueduct then locked by the script so that no epoch's `raisedWays` step
  repairs it before the circuit is laid (§2.7's laws, law 2 *Entry*: a lock decides no meeting)", and its "after a
  support by its planned line was `cleared`" takes the same addition.
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
sentence in (7); VM-R6T-04's word in (3); **(M5)** in (3)'s obstacle list (amended, PRB7-18); **(M6)** at (6)'s lead and
the span rule's last sentence (amended, PRB7B-11). The table cells are R7-02's,
every cell, row W14 among them (amended, PRB7-07), and Block 1 carries Part P's amended sentences (the lock sentence's
reach, *Strips, zones and nearest points*, *Line and band*, a held building's widened strip, the bent group's strip; and
pass 2's *Several raised ways*, the footprint reading, the castle's and the retaining wall's sentences, C10's and C13's
words — amended, Part P pass 2). **Sweep:** §2.7's other mentions — the
support step's (3) obstacle list and merged-span clause, the span rule's step (2) (its last sentence (M6)'s), `RaisedFoot`, the
*Readers* and *Source and lifecycle* bullets — stand (each already cites the crossing table or reads no lock); §2.6's
arch-vault row cites V04 §1b.2's trigger list, which V04 conforms (E-V4-1). No END line from another unit lands here.

**E-M1 — §2.7's laws at the support step (6)** (J146; the home of Part L). After (6)'s lead's last words "and everything
laid after the raised way gives way to it:" the model inserts, as (6)'s first bullet, "* (0) **§2.7's laws** — the
raised-way × wall family's laws, normative (J146):" followed by Part L's text from **Terms** through **The check**, in its
words — each "§2.7's laws" there read "these laws", the property bar named "§13.2's T110-4", and no id of this file
written —; and, before the (a)–(b) bullet, the line "**Worked examples** (non-normative: each illustrates the law it
cites; where an example and the laws differ, the laws govern, and a case no example lists is decided by the laws):".
Blocks 1 and 2, (M1)–(M6) and the rest of (6) follow as worked examples, as R7-02 now words them (its spots marked
"(J146)" and Part L's five corrections applied as the model writes them). §2.7's other mentions of a meeting — the support
step's (3) obstacle list and merged-span clause, the span rule's step (2), `RaisedFoot`, *Readers*, *Source and
lifecycle* — cite "these laws" with the law's number where they cite the crossing table.

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
| VPC-r6-05 | minor | minor | FIX | as written (§4.4 S5a *Outer moats*; §4.2 S3 (10)); one fix with VDC6-02 (determinism's §5.4); (J146) its S3 (10) text as E-P14 amends it |

**END lines pipeline writes:**
* **E-P1 — §4.3 *Where it may not go*** (with R7-03 (a)'s change): "an aqueduct crossing a standing wall's band on a span,
  its ramps, stairs and feet off the band and its under-deck strip clear of the trace's gates and towers (*over the
  band*)" → "an aqueduct crossing a standing wall's band on a span, its ramps, stairs and feet off the band and its
  under-deck strip clear of the trace's gates and towers and its fixed-place zone of the trace's fixed places, a held
  wall as an unlocked one (*over the band*; the crossing table's lock and fixed-place sentences) (amended, PRB7-09) — and
  every raised way's course, a viaduct's priced in a route's
  solve among them, keeping each fixed place of a standing trace outside its fixed-place zone".
* **E-P2 — §4.4 S5a (1)**: "each stretch's ends anchored on its barrier (the existing anchor kinds) with a tower at each
  anchor (§4.8)" → "… with a tower at each anchor (§4.8), never inside a standing raised way's fixed-place zone (§2.7's
  crossing table, the fixed-place sentence)".
* **E-P3 — §4.4 *Water and the waterfront***: "The trace never crosses water except at a **water gate** where a river
  passes:" → "The trace never crosses water except at a **water gate** where a river passes — never inside a standing
  raised way's fixed-place zone (§2.7's crossing table, the fixed-place sentence):".
* **E-P4 — §4.2 S3 (8)**: "under a hard filter that no (5) route crosses the claim" → "under a hard filter that no (5)
  route crosses the claim and no weld vertex lies in a standing raised way's fixed-place zone (the raised stretches of (5)'s routes at generation, a held one at a regeneration too; §2.7's crossing table, the fixed-place sentence)" (amended, PRB7-02) — (J146; PRB7C-GEN-01) that parenthesis reading "(the raised stretches of (5)'s routes at S3, S4's and S5b's viaducts at a stage's citadel, every held one at a regeneration; and no claim whose curtain, inner ward or outer arc — fixed by the claim — or whose vertex tower §2.7's laws bar: the siting a search over the claims law 1 admits, law 2 (a))" —; and "at the midpoint of the bailey side with the least-cost path to the plaza — for an
  `on_enceinte` castle, among the sides of its town-side arc —" → "at the midpoint of the bailey side with the least-cost
  path to the plaza — for an `on_enceinte` castle, among the sides of its town-side arc; for every castle, among the
  sides whose gate, with its footprint, lies clear of every such fixed-place zone, a claim with none failing the filter
  above (§2.7's crossing table, the fixed-place sentence: a castle sited, never reshaped) —" (amended, PRB7B-03).
* **E-P5 — §4.8's lead**: "(one the spacing or the gate law would place there moved clear of it)" → "(one whose footprint
  the spacing or the gate law would place there moved clear of it; a water gate's river crossing, an anchor with its
  tower, a weld vertex and a castle's town-side gate never moved along, whichever is laid later keeping them out of the
  fixed-place zone — the fixed-place sentence)" (VM-R6T-01's pipeline end; amended, PRB7B-02, PRB7B-03).
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
* **E-P9 — §4.4 S5a *Trace* (2)'s pull** (amended, PRB7B-12; one END with PRB7-08's and PRB7-01's): "a standing raised
  way's ramps, stairs and feet and an aqueduct's standing supports impassable to it: §2.7's crossing table, *beneath*" →
  "the impassables §2.7's crossing table's *beneath* gives the pull impassable to it — a standing raised way's ramps,
  stairs and feet, an aqueduct's standing supports and every held building's widened strip, each widened as its *Line
  and band* says". S3 (9) and a hand `contractWall` run it there; no other text restates the list.
* **E-P10 — the `vault` reading at §4.3 and II.7.6** (amended, PRB7B-11). §4.3 *Lattice and costs*: "the under-deck strips
  of its `vault` spans but one under a wall, read `open` (§2.7's crossing table, *beneath*), are impassable" → "the
  under-deck strips of its `vault` spans but one §2.7's crossing table's *beneath* reads `open`, are impassable"; II.7.6:
  "each span a raised way's record marks `vault` — but one under a wall, read `open` (§2.7's crossing table, *beneath*;
  V04 §3.5.4 (d) (1)) — holds one arch vault" → "each span a raised way's record marks `vault` — but one §2.7's crossing
  table's *beneath* reads `open` (V04 §3.5.4 (d) (1)) — holds one arch vault".
* **E-P11 — §4.4 S5a *Trace* (2)'s pin** (J146; PRB7C-GEN-02). "and a pin inside a raised way's under-deck strip moves
  along its arterial clear of it" → "and a pin whose gate's footprint, read from the gatehouse row it will be built by,
  meets a raised way's under-deck strip moves along its arterial until that footprint is clear, within the pull's search
  band, else that crossing takes F-WALL's raised-way rung (§2.7's laws, law 1 (5); law 2 *Not yet built*, (a), (c))".
* **E-P12 — §4.4 S5d's top-up re-trace** (J146; PRB7C-GEN-09). "S5a re-traces only the affected arc between its pinned
  gates" → "S5a re-traces only the affected arc between its pinned gates, keeping each arterial's crossing as the stage's
  picked boundary had it (§4.4 S5a *Trace* (2): under a deck where it crossed on one; §2.7's laws, law 4), the land
  beyond a deck's foot the re-traced arc cannot then take moved to the next stage's quota as a moated arc's is, reported".
* **E-P13 — §4.2 S3 (7)'s gates** (J146; PRB7C-GEN-04, PRB7C-GEN-05). R7-03 (a)'s home text as amended there (J146):
  the re-solve's trigger widened to every first point at which §2.7's laws admit no gate, and the harbour gate placed on
  `L*` re-solved with no deck across the stage-1 boundary.
* **E-P14 — §4.2 S3 (10)'s reading of (5)'s raised stretches** (J146; PRB7C-GEN-03). VPC-r6-05's S3 (10) text "A raised
  way standing when this step carves — at a regeneration, one held (§2.7's support step (6)) —" → "A raised way standing
  when this step carves — at a regeneration, one held (§2.7's support step (6)); at generation the raised stretches of
  (5)'s routes, their stations and spans read as §4.2 S3 (7) reads them (§2.7's laws, law 2 *Not yet built*) —".
* **Sweep (blind spot (d)).** §4.1's S7 row, §4.5's casters, §4.8 *Gates* and its last paragraph, §4.11's carve and frame
  batches stand (each cites the crossing table and reads no lock). §4.13's raised-way `wall` cell is VAL-R6-07's. (amended,
  PRB7B-02) Every "no tower or gate in its under-deck strip" of the unit (§4.8's lead among them) reads the footprint by
  *Strips, zones and nearest points*, unchanged in words.

### determinism (base §5–§7)

| id | sev | grade | disposition | note |
|---|---|---|---|---|
| VDC6-01 | major | major | FIX per R7-02 | E-D1: the lock row cites the lock sentence (the issue's text widened to every meeting of two similar structures); scope's END is E-S1 |
| VDC6-02 | minor | minor | FIX per R7-07 | §5.4's `warnings` comment as written, with VS3's palisade counted (R7-07; amended, PRB7B-16); pipeline's and scope's ends are VPC-r6-05 and E-S3 |

**Texts determinism writes:**
* **E-D1 — §7.1's lock row** (VDC6-01): "— a drawn way across a locked entity (never a ground way, a carve or a wall
  stretch passing beneath a locked or pinned raised way's deck, which changes none of its parts: §2.7's crossing and
  way-and-channel tables, bent by the rows below as beneath an unlocked one)," → "— a drawn way across a locked entity
  (never a meeting of two similar structures — a wall and a raised way, either locked, pinned or declared, which meet by
  §2.7's crossing table with their placement held and their shape changed there, a raised road's ground way making its gate by hand in every held wall it crosses, from the one it comes down before to the stroke's end, among them (J146: §2.7's laws, law 2 *Carried way*): its lock sentence —, nor a ground way or a carve passing
  beneath a locked or pinned raised way's deck, nor a raised way's deck passing over a locked or pinned ground way (§7.4's
  raised-way row), none of which changes what it passes; each bent by the rows below as with an unlocked one; nor its
  author's new declaration changing a drawn wall or a declared raised way, §7.2 *Declared means held* — the lock
  sentence's reach),"; and the row "| a declaration contradicting a dossier fact or a lock (item 101) |" → "| a
  declaration contradicting a dossier fact or a lock (item 101; a meeting of a wall and a raised way contradicting no
  lock: §2.7's crossing table, its lock sentence) |" (amended, PRB7-03, PRB7-06).
* **E-D2 — §7.1 *Raised ways, aqueducts and retaining walls***: "a course meeting an enceinte's trace comes down to a
  ground vertex before it and passes through the gate its ground way makes there, while an aqueduct crosses a standing
  wall on a span over its band, its course bent clear of that wall's towers and gates, never a gate" → "a course meeting
  an enceinte's trace comes down to a ground vertex before it and passes through the gate its ground way makes there — in
  a held wall too, the fate *reshaped* —, while an aqueduct crosses a standing wall on a span over its band, its course
  bent clear of that wall's towers and gates and its fixed-place zone clear of the wall's fixed places, a held wall as an
  unlocked one, never a gate (§2.7's crossing table, its lock and fixed-place sentences)"; and the catch-all's "the span
  an aqueduct drawn across a standing wall takes over its band, clear of its towers and gates" → "the span an aqueduct
  drawn across a standing wall takes over its band, clear of its towers and gates, its fixed-place zone clear of its fixed
  places" (amended, PRB7-09).
* **E-D3 — §7.1's `bend.wall.raisedCrossing` row** (VEL6-r6-04, VAT-r6-02 = VV910-r6-01, the lock sentence) → "| a hand
  `drawWall`, a moved trace vertex, a re-anchored stretch, `repairWall`'s new stretch on a dismantled run (row W10)
  (amended, PRB7B-15), a run a hand carve or moved river re-traces or a run a hand
  `setAttr` re-sections on its kept trace, across or beneath a standing raised way, or a `placeGate` or a gate's slid
  crossing inside its under-deck strip, either side locked, pinned or neither (§2.7's crossing table, *beneath*, the
  bent-group sentence, rows W2, W10, W13 and W14) | bent | the stretch's
  line inside the strip held to lawful crossings by the bent-group sentence — an unlawful crossing moved to the nearest
  lawful one (under an aqueduct's span, beyond a road deck's foot through a gate there), a part along beneath or entering
  and leaving on one side moved to the strip's edge, an end moved to the edge, a fixed place kept out of the fixed-place
  zone, a gate it makes for a ground way inside the under-deck strip moved along that way clear of it (amended,
  PRB7B-02) — each part of the bend, never a fate (J146: §2.7's laws, law 4), an arch vault in a `vault` span under it removed (a fate; a held one's the fate *reshaped*); a slid gate moved back along the trace to
  the strip's edge its grip came from and a `placeGate`'s gate to the nearer edge (§2.7's crossing table, row W13), its
  stub or way following, the trace unchanged; the raised way unchanged; named in one line | `bend.wall.raisedCrossing` |"
  (amended, PRB7-07, PRB7-10).
* **E-D4 — §7.1, a new row after it** (the lock sentence's (G3)): "| a meeting of a wall and a raised way that no shape
  inside the raised way's under-deck strip and the points the crossing table moves to makes lawful — an aqueduct, or a
  hand repair's new raised part (C10), whose supports cannot leave a standing band within (3)'s and (4)'s bounds, a road
  deck that cannot come down before a standing trace, a stretch with no lawful crossing (a run a carve or a moved river
  re-traces among them), a fixed place with no clear point in reach (a castle sited or resized by hand, `setAttr(castle, 'site' | 'baileyArea')`, whose claim no lawful site in reach admits, among them; J146), a held building in an arch vault a wall, a retaining stroke or the raised way's own edit cannot keep clear of (named as `{other}`; J146) (amended, PRB7B-03, PRB7B-06, PRB7B-08) (§2.7's crossing table, the lock sentence's (G3)) | refused | the nearest lawful declarations (item 101 R2; `PreviewResult.alternatives`) and **Show me why**, never `unlock` (J146: §2.7's laws, law 2 (c)), the held thing neither moved nor broken | `refuse.raised.meeting` |"; and §7.1's lead "an `epoch` past §6.1's epoch cap;"
  → "an `epoch` past §6.1's epoch cap, a meeting of a wall and a raised way that no shape inside the raised way's
  under-deck strip makes lawful (§2.7's crossing table, the lock sentence's (G3));" (amended, PRB7B-14).
* **E-D5 — §7.3 (b) 3** (VPC-r6-03's end): "or a reservation there — returns to the dry run (§7.1's outcome table)" → "or a
  reservation there (never a standing raised way or its reservation, which a re-traced run meets by §2.7's crossing
  table, *beneath*, row W2) — returns to the dry run (§7.1's outcome table)".
* **E-D6 — §7.3 item 4's fates**: "or **discarded** (only with "discard edits in scope", recorded as supersede events)."
  → "or **discarded** (only with "discard edits in scope", recorded as supersede events); a locked, pinned or declared
  wall, raised way or arch vault whose shape a meeting changes takes **reshaped** (never the op's own target, which its author's declaration changes and the dry run bends: §2.7's laws, law 4; J146) — its placement kept, the change named
  with it (§2.7's crossing table, the lock sentence's (G2)), confirmed as every fate other than *kept*, its event's undo
  restoring it."
* **E-D7 — §5.4's `ReportEntry`**: after the `works` variant add "| { kind: 'reshaped'; entity: Id /* a locked, pinned or
  declared wall, raised way or arch vault whose shape a meeting changed (§2.7's crossing table, the lock sentence's (G2))
  */; met: Id /* the structure it met */; change: 'chamberRemoved' | 'chamberLaid' | 'gateMade' | 'gateMoved' |
  'towerMoved' | 'stretchBent' | 'supportSlid' }" — derived, as every entry is, from the lifecycle event the change writes
  on the held entity, or, for a held raised way's chamber, on the chamber (`entity` the raised way, `met` the wall), at
  generation, a regeneration, an epoch or a village derivation (amended, PRB7-23).
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
  the crossing table (its lock sentence); a raised way over a locked way keeps its span `open`"; and (J146; PRB7C-LCK-15) the retaining-wall row's lock cell "a locked wall masks the stroke on its high side" → "a locked wall masks the stroke on its high side; with a raised way, its placement held and its shape at the meeting §2.7's laws' (law 2)", and after the raised-way row two rows: "| an enceinte (its stretches, gates and towers) | §7.1's T3 rows | its placement held, its shape where a raised way meets it §2.7's laws' (law 2) | the event's inverse | a held one stands before every stage (§7.2) |" and "| an arch vault | a span's `use`; V04's reconcile | its span and key held, its chamber not laid while §2.7's laws read the span `open` (law 1 (8)) | the event's inverse, its id kept by its key | V04 lays it by the span rule |".
* **E-D11 — §5.2's F-WALL row and §5.4's warnings** (amended, PRB7-16; the lock sentence's (G3) off the hand path).
  F-WALL's detection cell adds "; a trace with no lawful crossing of a standing raised way, a fixed place with no clear
  point in reach, or a held building's widened strip it cannot keep clear (§2.7's crossing table, (G3); *beneath*)"; its ladder adds, at its head (amended, PRB7B-09): "at generation, a regeneration and a village derivation (J146: a hand op that runs F-WALL — a hand `contractWall`, a terrain stroke's cliff re-anchor — refused `refuse.raised.meeting` once its own re-pull fails, never a stage left unwalled: §2.7's laws, law 2 (c)), a raised-way meeting (the detection's last clause) takes its own rung alone, none of the rungs below running on it: the boundary re-pulled once with that raised way's under-deck strip
  impassable but at its lawful crossings, its fixed-place zone no crossing or anchor site and every held building's
  widened strip impassable → that stage left unwalled, reported (`W_RAISED_MEETING`), and read then as §2.7's laws, law 2 (c), read an unwalled stage (J146: no `Enceinte` or `Gate` for it, its routes ungated, no harbour gate, moat or chain, the harbour route an unwalled town's, a welded castle re-sited by F-CASTLE else kept `inside`, `requestedVsBuilt`); every rung below, run for another
  detection, lays a trace that meets every standing raised way as the pull's does (§2.7's crossing table: *beneath*'s
  widened impassables, the fixed-place zone, held buildings' widened strips, several raised ways read together), a rung
  whose trace would not passed over for the next;"; its tests cell adds "; T110-2 (3)'s and (6)'s table-edit runs (the
  raised-way rung)". §5.4's `warnings` comment, after S5a's and S7's `W_RAISED_CROSSING`, adds "S3's, S5a's and VS3's
  `W_RAISED_MEETING` (a stage F-WALL's raised-way rung left unwalled, §5.2; VS3's for F-V-RAISED's omitted palisade,
  V07 §3.13; §2.7's crossing table, (G3))" (amended, PRB7B-16).
* **E-D12 — §5.2's F-REDERIVE row** (amended, PRB7B-08; the lock sentence's (G3) for a run water re-traces). Its
  detection cell adds "; a wall run that S1's water operator or a carve would re-trace (§4.11 *Other crossings*; §7.3 (b)
  2–3) with no lawful crossing of a standing raised way, its water gate with no point clear of a fixed-place zone within
  the run, or a held building's widened strip it cannot keep clear (§2.7's crossing table, (G3); *beneath*), found on the
  new water's data before it is inserted"; its ladder adds
  "**A wall run with no lawful shape at a raised way** (its rung alone runs on it): the run widened once to the next
  unaffected tower on each side and re-traced → by hand, `refuse.raised.meeting` (§7.1); at an epoch, the water op that
  would re-trace it (`shiftCourse`, an avulsion, `digCanal`) not made that epoch, waiting (`walls.waited`, V06 §2.10),
  the river, the run and the raised way unchanged — never a run across water without its water gate (§5.3)"; its tests
  cell adds "; T110-2 (4)'s epoch `shiftCourse` beside a viaduct (the raised-way rung)".
* **E-D13 — §5.3's law-1 row** (J146; the laws' check, PRB7C-GEN-12). After the row "footprints ∩ (wall band ⊕
  setback) = ∅ on both faces of every wall …" add: "| §2.7's laws, law 1 (J146): no junction or gate on a raised way's
  deck; an enclosing wall's line across an aqueduct's deck line only under a span or through a `cleared` support's ring, its band at most touching a standing support's ring; a road deck's deck line across an enclosing wall's line only where that run was laid after the deck's course and never at its own route's crossing of a boundary its stage picked before solving it, else the deck down before it and its way through a gate beyond the foot; no enclosing wall's line, band or wall strips over a raised way's ends; no gate's, postern's or tower's footprint in a strip; no fixed place, with its
  footprint, in a zone; a run's top and walk beneath a standing span no higher than the lowest soffit there; a `vault`
  span with anything across its strip read `open` with no chamber, one with nothing across with its chamber; a held
  building's chamber, footprint and door unchanged by any meeting; every held structure's placement unchanged but by an
  op naming it — each strip, zone and end the union of every standing raised way's (§2.7's laws' terms) | stage-end
  (every stage) and batch-local (every commit, on every path: generation, a regeneration, a village derivation, an
  epoch, a replay, a hand edit and its undo) | the touched walls, gates, towers, fixed places, raised ways, arch vaults
  and held buildings against the union of every standing raised way's strips, zones and ends (one spatial query per
  touched part) |"; a failure is `E_INVARIANT` naming the law-1 clause and the two structures, as every row's.
* **E-D14 — §7.1's `EditFate`** (J146; §2.7's laws, law 4's (G2); PRB7C-LCK-01). "`type EditFate = { id: Id; fate:
  'kept'|'carried'|'orphaned'|'discarded'; to?: Id; reason: string }`" → "`type EditFate = { id: Id; fate:
  'kept'|'carried'|'orphaned'|'discarded'|'reshaped'; to?: Id; reason: string; met?: Id /* reshaped: the structure it
  met (§2.7's laws, law 4) */; change?: ReportEntry['change'] /* reshaped: as §5.4's reshaped entry */ }`"; and §11.2's
  `PreviewResult.counts.byFate` is keyed by `EditFate['fate']`, *reshaped* among them. A stored fate *reshaped* is
  compared on replay as every fate is (§7.3 item 4).
* **E-D15 — §7.1's binding row for a span's `use`** (J146; PRB7C-LCK-07). "on a raised way `spans/<ordinal>/use`" → "on a
  raised way `spans/<a>-<b>/use` (the span by its bounding piers' keys, as §2.7's record keys it; a span whose keys an
  edit re-mints loses its held `use`, a fate)"; and after "kept `open` over a part-0 way, water or a flood cell by the
  span's recorded reason" add ", and read `open` while §2.7's laws read it so (law 1 (8)) — the held `use` applying alike
  by canvas and clerk and kept for when nothing lies across".
* **E-D16 — §5.2's F-ROUTE row** (J146; PRB7C-GEN-11). Its where-cell "S4;" → "S3 (7)'s re-solve of a gate route (§4.2
  S3 (7)); S4;", and its ladder adds at its end "; a gate route S3 (7) re-solves keeps its gate at the re-solved route's
  first point at `T = t_1`, its outward arterial `unserved` beyond the nearest reachable junction, reported".
* **Sweep (blind spot (d)).** §5.3's gate and way-and-trace rows, §5.4's other comments, §7.1's `bend.raised.underSpan`
  row, §7.3's S7 row and §7.7 stand (searched: no lock refusal of a meeting).

### rendering (base §8, §9, §11, §12)

| id | sev | grade | disposition | note |
|---|---|---|---|---|
| VAL-R6-03 | major | major | FIX per R7-05 | §11.1's GeoJSON row in R7-05's citing form (`use` as §2.7's crossing table's *beneath* reads it; amended, PRB7B-11); the model's *beneath* names the reader (R7-02) |

**END lines rendering writes** (amended, PRB7B-11; E-R2, J146):
* **E-R1 — §11.1's 3-D row**: "each `vault` span closed by its end walls but one under a wall, read `open` (§2.7's crossing
  table, *beneath*)" → "each `vault` span closed by its end walls but one §2.7's crossing table's *beneath* reads `open`".
* **E-R2 — §8 and §11's readers cite the laws** (J146). §8.4's casters and heightfield and §11.1's glTF and CityJSON wall
  objects read a run's top as §2.7's laws' law 1 (7) gives it, and §11.1's GeoJSON span `use`, 3-D row and CityJSON
  `BridgeRoom` a span's reading as law 1 (8) gives it; each of their citations of "§2.7's crossing table, *beneath*" for
  these reads "§2.7's laws, law 1 (7)" or "(8)", *beneath* named after it as its worked example (VAL-R6-03's and E-R1's
  texts so written).

**Sweep:** §8.4's casters and heightfield and §11.1's CityJSON row read the cap and the `vault` reading as R7-02 keeps
them (unchanged; CityJSON's `BridgeRoom` is an arch vault, laid only where *beneath* reads `vault`); §11.2's
`report.changed` sends the new `reshaped` entries as any entry.

### V01

| id | sev | grade | disposition | note |
|---|---|---|---|---|
| VAF-R6T-04 | minor | minor | FIX per R7-05 | §1.2's hook row in R7-05's citing form (amended, PRB7B-11) |

**END line V01 writes** (amended, PRB7B-11):
* **E-V1-1 — §3.17.3 (2)–(3) and T-V1-51 (c)**: (2)'s "— none in a span under a wall, which reads `open` (§2.7's crossing
  table, *beneath*) —" → "— none in a span §2.7's crossing table's *beneath* reads `open` —"; (3)'s "a `vault` span under a
  wall read `open` (§2.7's crossing table, *beneath*)" → "a `vault` span read as §2.7's crossing table's *beneath* reads
  it"; T-V1-51 (c)'s "(a `vault` span under a wall read `open`, §2.7's crossing table, *beneath*)" → "(a `vault` span
  §2.7's crossing table's *beneath* reads `open` among them)", its fixture words standing. §3.17.3 (6) stands.

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
  `convert`'s) that takes the last run of an absorbed record over it (§2.7's crossing table, row W8); the commit of every
  event that changes how §2.7's crossing table's *beneath* reads a `vault` span — a wall's band or strip, an absorbed run,
  a retaining wall's line, or a way's corridor or channel laid while it read `open`, laid across or removed off its
  under-deck strip (a hand draw, `delete` or move, a carve's fill, an epoch's `retireWay`, `effaceWay` or re-route);"
  (amended, PRB7-13, PRB7B-10).
* **E-V4-2 — the arch-vault entity row (l. 867)**: "a wall the epoch laid, moved or removed over a `vault` span, V06 §2.1)"
  → "a wall the epoch laid, moved, absorbed or removed over a `vault` span — the last run of an absorbed record it
  dismantled among them —, V06 §2.1)"; and "or a wall comes to stand over its span (laid again, its id kept by its key,
  when none stands over it any more)" → "or a wall comes to stand over its span — a locked one too, its lock kept with its
  key (§2.7's crossing table, the lock sentence) — (laid again, its id and lock kept by its key, when none stands over it any more)". (J146; PRB7C-TIM-02) That last text reads instead "or §2.7's laws come to read its span `open` (law 1 (8): anything across its strip) — a locked one too, its lock kept with its key (law 2) — (laid again, its id and lock kept by its key, once they read it `vault` again)"; and the row's triggers "the commit of every enceinte band or wall strip laid, moved or removed over a `vault` span's under-deck strip" → "the commit of every op that changes how §2.7's laws read a `vault` span (law 1 (8); law 4)" and the first text's new words "a wall the epoch laid, moved, absorbed or removed over a `vault` span — the last run of an absorbed record it dismantled among them —, V06 §2.1)" → "a `vault` span §2.7's laws read otherwise after the epoch's ops, V06 §2.1)".
* **E-V4-3 — §3.10's epoch reconcile bullet**: "or whose `vault` span a wall the epoch laid, moved or removed now stands
  over or no longer stands over" → "or whose `vault` span §2.7's crossing table's *beneath* reads otherwise after the
  epoch's ops — a wall laid, moved, absorbed or removed over it, the last run of an absorbed record dismantled, a way or
  channel retired, effaced, re-routed or filled off its strip"; "a new `vault` span's vault
  laid, none under a wall," → "a new `vault` span's vault laid, none in a span §2.7's crossing table's *beneath* reads
  `open`,"; and "removes those of a `vault` span a wall the epoch laid or moved now stands over and lays again those of one
  no wall stands over any more" → "removes those of a `vault` span §2.7's crossing table's *beneath* now reads `open` and
  lays again those it reads `vault` again (an absorbed ring's once its last run there is dismantled, row W8; a way or
  channel the epoch retired, effaced, re-routed or filled off its strip)" (amended, PRB7B-11).
* **E-V4-4 — UC18** (VAL-R6-01's end): "a reconcile or regeneration that would re-lay, collapse or delete it keeps it" →
  "a reconcile or regeneration that would re-lay, collapse or delete it keeps it — save where §2.7's laws come to read its span `open` (law 1 (8): a wall, an absorbed run, a retaining wall's line, a way or water across its strip): its span held and its lock kept with its key, its chamber not laid while they do — never refused `E_LOCKED`, a lock deciding no meeting (law 2 *Entry*) — and laid again, locked, with its id once they read it `vault` again, the fate *reshaped* by hand and a `reshaped` entry at a regeneration or an epoch —" (J146; PRB7C-TIM-02); and T-V4-80's "(i) UC18," → "(i) UC18 — with, on a CITY fixture
  whose aqueduct's `vault` span holds a locked arch vault, an epoch circuit and, on a second run, a hand `drawWall`
  across that span: the chamber not laid while the wall stands, its lock and id kept, a `reshaped` entry and the fate
  *reshaped*, the wall's delete laying it again locked with the same id; and with a declared placement seated in that
  vault, the circuit crossing under another span and the hand `drawWall` moved to cross under the nearest span clear of
  the building's widened strip, part of its bend, and on a one-span way refused `refuse.raised.meeting` naming the building, no Unlock (J146); a hand T3 `retaining` stroke across that span — the chamber removed with the fate *reshaped*, no `E_LOCKED`, laid again locked with its id when the stroke is deleted; and a hand way drawn under that span while the wall stood, then the wall deleted — the chamber not laid while the way lies there, laid again locked with its id when the way is deleted (J146; PRB7C-TIM-02) —," (amended, PRB7-01).
* **E-V4-5 — T-V4-63** (VAT6-r6-01, VV34-r6-01): "after each commit every arch vault's key names a standing span of use
  `vault`" → "after each commit every arch vault's key names a span of the way whose `use` is `vault` and which §2.7's
  crossing table's *beneath* reads `vault` — its chamber open under a standing span, `collapsed` under one whose span or a
  bounding support is `ruined` or `cleared` (V04 §3.5.4 (d) (2)) — and no arch vault stands where its span no longer
  exists or is `open` or read `open` (V04 §3.5.4 (d) (3))"; "a span's `use` edit lays or removes exactly that vault and
  survives a regeneration" → "a span's `use` edit lays or removes exactly that vault (none in a span *beneath* reads
  `open`, V04 §3.5.4 (d) (1)) and survives a regeneration"; "the arch vault of every old `vault` span between two of them
  (§2.7's support step (7))" → "the arch vault of every old `vault` span between two of them that *beneath* reads `vault`
  (§2.7's support step (7); V04 §3.5.4 (d) (1))" (amended, PRB7-13: R7-06 (b)'s one wording as amended).
* **E-V4-6 — §3.5.4 (d) (1) and (3)** (amended, PRB7-13, PRB7B-11: *beneath* cited, its cases never restated): (1)'s
  lead "Each span of use `vault` that no wall stands over — none of whose under-deck strip an enceinte's band or wall
  strip meets — has one chamber (under a wall no chamber is laid, whatever the runs' condition: the span is read `open`
  while a wall's band or strip lies there, the arch beneath the band walled up by the run, and its chamber is laid again
  once none does; §2.7's crossing table, *beneath*)" → "Each span of use `vault` that §2.7's crossing table's *beneath*
  reads `vault` has one chamber (none in a span *beneath* reads `open`, whatever the runs' condition — under a wall the
  arch beneath the band walled up by the run — a locked chamber too, its lock kept with its key (the lock sentence), the
  chamber laid again once *beneath* reads the span `vault` again)"; (3)'s "or over which a wall now stands," → "or which
  §2.7's crossing table's *beneath* now reads `open` (a locked one too, its lock kept with its key for its re-lay),".
* **E-V4-7 — §3.5.4 (d)'s declared placement**: after "seats the use on one plot equal to the chamber's floor and one
  single-storey building under its ceiling" add "— the span then held against every wall (§2.7's crossing table,
  *beneath*: a held building in an arch vault) —".
* **E-V4-8 — the wiring row (l. 161)** (amended, PRB7B-11): "§2.7's crossing table (*beneath*: a `vault` span under an
  enceinte's band or wall strip — `Enceinte.band`, `Enceinte.strips` — read `open`)" → "§2.7's crossing table (*beneath*:
  a `vault` span's reading, `open` or `vault`, from what lies across its strip — `Enceinte.band`, `Enceinte.strips`, an
  absorbed record's runs, `RetainingWall`, way corridors and channels)"; and its last cell's "(none under a wall, V04
  §3.5.4 (d) (1))" → "(none in a span *beneath* reads `open`, V04 §3.5.4 (d) (1))".
* **Sweep (blind spot (c)).** T-V4-62's "each `collapsed` exactly when V04 §3.5.4 (d) (2) says so" and the edit row (l.
  2529) stand. (amended, PRB7-13) Every "`vault` span no wall stands over" and "over which no wall stands" in the unit —
  T-V4-62's "an arch vault in exactly each `vault` span no wall stands over", the upgrade note's "that no wall stands
  over" (l. 2668) — reads "that §2.7's crossing table's *beneath* reads `vault`" (or "*beneath* no longer reads
  `open`"), and every "under a wall" said of a span's reading reads "that *beneath* reads `open`" (§3.10's are E-V4-3's,
  the wiring row's E-V4-8's), so every case of the reading — a wall, an absorbed run, a retaining wall, a way or channel laid while it read `open` — is cited once, never restated (amended, PRB7B-11). (J146; PRB7C-TIM-07) And every "a span a wall stands over" — the edit rows' "(none in a span a wall stands over, V04 §3.5.4 (d) (1))" (l. 370, 2529, 2557) — reads "(none in a span §2.7's laws read `open`, law 1 (8); V04 §3.5.4 (d) (1))"; each citation of *beneath*'s reading in the unit reads "§2.7's laws, law 1 (8)" with *beneath* after it as its worked example.

### V05

| id | sev | grade | disposition | note |
|---|---|---|---|---|
| VV56-r6-01 | major | major | FIX | R7-04 (a): V05 §3.16 (4)'s raised and retaining rows, §3.16 (5), §3.23's landfall row and T-V5-14 as written; V06's END is E-V6-6; the model's W12 cell is R7-02's |

No other END line lands here; T-V5-14's round-6 passage over each state stands as row W12's test.

### V06

| id | sev | grade | disposition | note |
|---|---|---|---|---|
| VAL-R6-05 | minor | minor | FIX, amended (J146) | §3.18.1 (6) as written, its "a raised way there only because a wall now stands, or no longer stands, over its `vault` span takes the arch-vault reconcile alone" → "a raised way there only because §2.7's laws read one of its `vault` spans otherwise (law 1 (8)) takes the arch-vault reconcile alone" (PRB7C-TIM-01) |
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
  §3.5.4 (d) (1); §2.7's crossing table, row W8), or off whose under-deck strip the epoch retired, effaced, re-routed or
  filled a way or channel that kept it read `open` (§2.7's crossing table, *beneath*)", in both places (amended, PRB7-13). (J146; PRB7C-TIM-01) That new text reads instead, in both places: "or one of whose `vault` spans §2.7's laws read otherwise after the epoch's ops than before them (law 1 (8)), whatever op made the change — a wall laid, moved, re-sectioned, absorbed, buried or removed over it (the last run of an absorbed record dismantled among them), a retaining wall's line laid, re-derived, buried or removed across its strip, a way or channel retired, effaced, re-routed, filled or silted off it (law 4)".
* **E-V6-2 — §2.8's `absorbWall` comment**: "its strips re-join the blocks beside them" → "its strips, the band with them,
  re-join the blocks beside them (a `vault` span the old wall stood over is read `open` while a remaining run crosses it
  and laid again when the last is `dismantled`: §2.7's crossing table, row W8)".
* **E-V6-3 — T-V6-11**: "V04 laying again the arch vault of a `vault` span the old wall stood over once the record is
  dropped" → "V04 laying again the arch vault of a `vault` span the old wall stood over in the epoch whose dismantling
  takes the last run of the absorbed ring over it (§2.7's crossing table, row W8; H-AQUA's span over its CITY ring), and
  the same absorb over the state sweep (§13.2; rows W8 and W4 at an epoch) — each an *unchanged meeting*, the runs
  dismantled in time as any, the vault laid again so, `collapsed` where its span has fallen; and an aqueduct founded by
  V06 §3.19 across the absorbed ring's line while a `breached` run there stands — its supports off that run's former
  band, a span over it, *over the band*, and over a `dismantled` run none (§2.7's crossing table, row W8's C1 and C11)"
  (amended, PRB7-18); and after that addition add "; and a viaduct founded across a standing run of the absorbed ring —
  its ends fixed, so not built, `raised.waited`, until that run is `dismantled` (row W8's C1, *down before the wall*)"
  (amended, PRB7B-13).
* **E-V6-4 — §3.19 (5)** (VEW-r6-04; amended, PRB7-09, PRB7-18, PRB7-20): "Locked, pinned and declared entities,
  dossier-listed buildings, every other raised way's supports, enceinte towers and gates, and V05's `skyAccessObstacles`
  (V05 §2.3b) are **impassable**" → "Locked, pinned and declared entities — but a wall, a retaining wall and another raised
  way, which a course meets as unheld ones (§2.7's crossing table, its lock sentence: a wall by the table, a retaining
  wall passed over with a support on its line built against it, another raised way's supports impassable as every
  raised way's) —, dossier-listed buildings, every other raised way's supports, enceinte towers and gates, and V05's
  `skyAccessObstacles` (V05 §2.3b) are **impassable** to the course's supports, ramps, stairs and feet and to its
  clearing ((7)), and each fixed place of a standing curtain to its fixed-place zone (§2.7's crossing table, the
  fixed-place sentence); a course passes over a locked, pinned or declared ground way on a span, as over any way (item
  244's clearance; §7.4's raised-way row), and meets a standing curtain — locked, pinned, declared or not, the runs of an
  absorbed record not yet `dismantled` among them (row W8) — by §2.7's crossing table, nothing of either written"; and "its
  under-deck strip clear of the curtain's towers and gates (impassable above)" → "its under-deck strip clear of the
  curtain's towers and gates and its fixed-place zone of the curtain's fixed places (impassable above)".
* **E-V6-5 — §3.7.1**: "a standing raised way's under-deck strip, supports, ramps, stairs and feet excepted where the
  trace meets it (§2.7's crossing table, *beneath*)" → "… excepted where the trace meets it (§2.7's crossing table,
  *beneath*) — never a held building's widened strip, which the trace keeps clear, and no fixed place of the trace in a
  standing raised way's fixed-place zone (*beneath*; the fixed-place sentence) —" (amended, PRB7-01, PRB7-22).
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
  CITY ring's trace stands"); (4) after (2)'s addition add " and a viaduct founded at a CITY epoch whose best course
  passes within a span of the CITY ring's water gate — its fixed-place zone kept clear of the water gate and its
  gatehouse's footprint (V06 §3.19 (5); §2.7's crossing table, the fixed-place sentence);" (amended, PRB7B-13).
* **E-V6-8 — T-V6-47**: (1) VV56-r6-04's script, as written; (2) after "the delete's undo restoring the cap" add "; then
  the breached span repaired by `repairRaised` — the cap back, no wall op; and, in the cells' own order, an epoch circuit laid across the aqueduct after a span over its planned band fell `ruined` and after a support there was `cleared` (the aqueduct then locked by the script, so no `raisedWays` step repairs it before the circuit: §2.7's laws, law 2 *Entry*; J146) — the run at its own top beneath the fallen span, the trace through the cleared ring as open ground (V06 §3.7.6 (5)) — and an
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
  and which §2.7's crossing table's *beneath* reads `vault` — its chamber open under a standing span, `collapsed` under one
  whose span or a bounding support is `ruined` or `cleared` (V04 §3.5.4 (d) (2)) — and no arch vault stands where its span
  no longer exists or is `open` or read `open`, V04 §3.5.4 (d) (3))" (amended, PRB7-13: R7-06 (b)'s one wording as
  amended).
* **E-V6-11 — §8's E3 and E8 cells** (VAT6-r6-03): as written, and E3's cell adds "; the state sweep's `topple` runs of
  T-V6-11, T-V6-47 and T-V6-73 at E5, which builds the hazards"; and (J146; PRB7C-TIM-11) "; and T-V6-11's arch-vault re-lay, T-V6-47's arch-vault bar and the state sweep's C6 runs of T-V6-11, T-V6-47 and T-V6-73 at the later of E3 and E8, which builds the epoch's arch-vault reconcile".
* **E-V6-12 — §3.1's *Protection***: "a locked or pinned entity is never struck, converted or moved" → "a locked or pinned
  entity is never struck, converted or moved (a wall, a raised way or an arch vault held in its placement, its shape
  changing where they meet: §2.7's crossing table, the lock sentence)".
* **E-V6-13 — §2.10's `raised` section** (VAT6-r6-02's end): add `extendedPastBound: number /* frame-growth extensions
  kept past a support-step bound with no fitting course — a support in water or a pier past maxPierM (§2.7's support step
  (7)) */`.
* **E-V6-14 — the lock bars** (amended, PRB7-05; blind spot (c)). T-V6-4's "are never struck, converted, closed or moved
  by the engine" → "are never struck, converted, closed or moved by the engine — a wall, a raised way or an arch vault
  held in its placement, its shape changing where they meet by §2.7's crossing table (its lock sentence), each change a
  `reshaped` entry —"; and the edge row *the history × locks*' "a locked or pinned entity is never struck, converted or
  moved (V06 §3.1)" → "a locked or pinned entity is never struck, converted or moved (V06 §3.1; a wall, a raised way or
  an arch vault in its placement, its shape where they meet §2.7's crossing table's, the lock sentence)".
* **E-V6-15 — §2.10's `waited` counts** (amended, PRB7-16). `walls.waited`'s comment "none waits for a raised way" →
  "and traces that no lawful crossing of a standing raised way or clear point for a fixed place admits, or that a held
  building in an arch vault turns back, and the water ops (`shiftCourse`, an avulsion, `digCanal`) whose re-traced run
  F-REDERIVE's raised-way rung finds no lawful shape for (§2.7's crossing table, (G3), *beneath*; §5.2; V06 §3.7.6 (5))"
  (amended, PRB7B-08); `raised.waited`'s
  comment, after "or a road deck's that would cross a standing curtain (§2.7's crossing table, *down before the wall*)",
  adds ", or one whose under-deck strip or fixed-place zone no course keeps clear of a standing trace's gates, towers or
  fixed places (§2.7's crossing table, *over the band*)".
* **E-V6-16 — §3.7.6 (5)'s cost field** (amended, PRB7B-12; one END with PRB7-08's and PRB7-01's): its first bullet's
  "and it and the raised way's ramps, stairs and feet are **impassable** in V06 §3.7.4 (2)'s cost field" → "and it, the
  raised way's ramps, stairs and feet and every held building's widened strip are **impassable** in V06 §3.7.4 (2)'s cost
  field, each widened as §2.7's crossing table's *beneath* widens the pull's impassables (*Line and band*; a road deck's
  support, which the band is laid through, unwidened)".
* **E-V6-17 — §3.19 (2)'s citadel anchor** (J146; PRB7C-GEN-08). "Each endpoint's **anchor** is its highest part-0 way
  vertex inside it or on its boundary (ties by address)" → "… (ties by address); a citadel's, the highest vertex of its
  castle street outside the castle's wall strips at which the road's ends and zone keep the town-side gate and the
  castle's fixed places clear (§2.7's laws, law 1 (4), (6); law 2 (a): a raised way's ends where its own law picks them)".
* **E-V6-18 — §3.19.2 (1)'s declared way** (J146; PRB7C-TIM-10). "a declared way is held (item 101 R13) — it breaks only
  by a hazard or the landfall, and the user repairs it by hand" → "a declared way is held (item 101 R13; a drawn way
  locked by its drawing, §7.2) — no disuse, hazard or landfall breaks it while it is held (V06 §3.1; V05 §3.16 (2);
  §2.7's laws, law 2 *Entry*), its author breaking a span or a support by a hand `convert` and repairing it by hand".
* **E-V6-19 — §2.10's `walls.raisedCrossings`** (J146; PRB7C-TIM-13). "crossings of a trace this epoch laid with a
  standing raised way's deck line" → "crossings of a trace this epoch laid or re-sectioned with a standing raised way's
  deck line, counted as §2.7's crossing table's *Reported* says (a move of the trace's own line no count; §2.7's laws,
  law 4)".
* **Sweep (blind spots (a)–(c)).** W68's middle cell, §3.19's lead, §3.19 (7), §3.2's reconcile paragraph, J-V6.91, J-V6.114
  and J-V6.140, V06 §7's T110-2 and T114 rows and §7's lead stand (searched). (amended, PRB7-13) Every "`vault` span no
  wall stands over" in the unit — *The arch-vault reconcile's place* (its "a chamber for each standing `vault` span no
  wall stands over" and "every `vault` span no wall stands over has its chamber") — reads "that §2.7's crossing table's *beneath* reads `vault`". (J146; PRB7C-TIM-07) And the same paragraph's "the removal of one a wall the epoch laid or moved now stands over and its chamber laid again where none stands over it any more" → "the removal of one in a span §2.7's laws now read `open` (law 1 (8)) and its chamber laid again where they read it `vault` again", and its "under a fallen span or under a wall" → "under a fallen span or in a span §2.7's laws read `open`".

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
  footprint);"; and after that addition add " VS3's later re-lay of the palisade on that fixture over the state sweep —
  the palisade by §2.7's crossing table, *beneath*, at each state (row W1 at a village); the palisade's REPLACEMENT under
  the declared aqueduct, rebuilt in stone on its trace (V07 §3.11) — its band at most touching a support's ring, re-traced
  locally by the bent-group sentence where its new band would not cross lawfully (row W14); and, on a variant whose
  `raisedWays.structure.pierSpacingM` band a table edit narrows so that no span of the declared aqueduct admits the
  palisade's band, F-V-RAISED's ladder — the ring re-laid once round the aqueduct, else the palisade omitted and reported
  (V07 §3.13; §2.7's crossing table, (G3));" (amended, PRB7-07, PRB7-16, PRB7-21); and after that addition add " VS3's
  palisade on a river village whose shore anchor falls in the declared viaduct's fixed-place zone — the anchor moved along
  the shore clear of it with its end post (§2.7's crossing table, the fixed-place sentence); and the REPLACEMENT under a
  carried-down raised way, over the state sweep (row W14 at a village, its C9 cell);" (amended, PRB7B-13).
* **E-V7-2 — §3.5a (4)**: "its line bent locally to cross an aqueduct under a span and a road deck's carried way beyond its
  foot, never across a ramp, stair or foot;" → "its line by the crossing table's bent-group sentence — crossing an aqueduct
  under a span and a road deck's carried way beyond its foot, never across a ramp, stair or foot, never running along
  within or ending inside an under-deck strip — and its anchors by its fixed-place sentence;"; and "A hand aqueduct drawn
  across the standing palisade crosses it *over the band*, on a span," → "A hand aqueduct drawn across the standing
  palisade — drawn by hand and so locked, or not (the crossing table's lock sentence) — crosses it *over the band*, on a
  span,".
* **E-V7-3 — ## 8 and §1 (14)** (VV78-r6-02): as written, ## 8's V-M3 cell adding "and T-V7-48's state-sweep runs, its
  `topple` runs at the later of that exit and V06's E5".
* **E-V7-4 — §3.13's ladder table** (amended, PRB7-16): after F-V-ANCHOR's row add "| F-V-RAISED a palisade line with no
  lawful crossing of a standing raised way, a fixed place with no clear point in reach, or a held building's widened
  strip it cannot keep clear (§2.7's crossing table, (G3); *beneath*) | VS3 | its rung alone, no other rung of this table
  running on it (amended, PRB7B-09): the ring re-laid once with the raised way's under-deck strip impassable but at its
  lawful crossings, its fixed-place zone no anchor or crossing site and every held building's widened strip impassable →
  the palisade omitted, reported (VS3's `W_RAISED_MEETING`, §5.4) (amended, PRB7B-16) | T-V7-48 |"; every other rung of
  the table re-lays the palisade by VS3, so by §2.7's crossing table as VS3's line meets it.
* **E-V7-5 — §3.5a (3) and T-V7-48's reading of a `vault` span** (J146; PRB7C-TIM-07). (3)'s "(impassable by §4.3
  *Lattice and costs*; one under the palisade read `open`, §2.7's crossing table, *beneath*)" → "(impassable by §4.3
  *Lattice and costs*, but one §2.7's laws read `open`, law 1 (8))"; T-V7-48's "(one under the palisade read `open`,
  §2.7's way-and-channel table)" → "(but one §2.7's laws read `open`, law 1 (8); its way-and-channel table)".
* **E-V7-6 — §3.11's palisade REPLACEMENT and T-V7-32** (J146; PRB7C-TIM-05). §3.11's "gates kept, every run `standing`
  and robust (a patched run rebuilt in stone)" → "gates kept, every run `standing` and robust (a patched run rebuilt in
  stone) — where a standing raised way crosses the trace, the run laid again in its new section by §2.7's laws (law 2
  (a): its line kept where its new band is lawful, re-traced locally where not, its gates moved along where their stone
  footprints meet a strip; with no lawful shape the REPLACEMENT waiting, law 2 (c); its worked example row W14) —";
  T-V7-32's "keeps the trace's vertices and gates" → "keeps the trace's vertices and gates (save where a raised way
  crosses it: §2.7's laws, law 2 (a); T-V7-48)".
* **E-V7-7 — §3.4 (6)'s band** (J146; PRB7C-TIM-06). "The band `palisade.bandM` (8.5 m) each side of every walled
  stretch is the no-build band every later stage reads." → "The band `palisade.bandM` (8.5 m) each side of every walled
  stretch is the no-build band every later stage reads — the village's wall strips, in which a raised way's support may
  stand; the band §2.7's laws read is the section above (law 1's terms)."
* **Sweep (blind spot (a)).** §3.12's hand-off, §3.12a (4)'s ruin abutment, §3.17's palisade row and §3.5a (5) stand (searched; §3.5a (5)'s readers are V11's END, VV1112-r6-02); (J146) §3.5a (3) is E-V7-5's, §3.11 and T-V7-32 E-V7-6's, §3.4 (6) E-V7-7's.

### V09

| id | sev | grade | disposition | note |
|---|---|---|---|---|
| VAT-r6-04 | minor | minor | FIX | `bend.raised.underSpan`'s wall form and T-V9-52's words, as written |

**Texts V09 writes** (its own FIX, and the ends of VAT-r6-02 = VV910-r6-01, VEL6-r6-04, VDC6-01 and the lock sentence's
(G2)–(G3)):
* **E-V9-1 — §4.9's `bend.wall.raisedCrossing` row**: after its gate form add "— and, for a stretch moved off the under-deck
  strip (one along beneath it, entering and leaving it on one side, or ending under it), "The wall keeps clear of {way},
  {m} m off your line." — and, for a fixed place moved, "The {anchor | water gate} keeps clear of {way}, {m} m along the
  {edge}." — `{edge}` the barrier's word (shore, bank, cliff top, gorge rim, marsh edge, wall) or "river" —" (amended,
  PRB7B-15); its source cell → "§7.1's outcome row for a hand stretch across or beneath a standing raised way,
  `repairWall`'s new stretch on a dismantled run (row W10) (amended, PRB7B-15), a run re-sectioned on its kept trace, or
  a `placeGate` or a gate's slid crossing inside its under-deck strip, either side locked, pinned or neither (§2.7's
  crossing table, *beneath*, the bent-group sentence, rows W2, W10, W13 and W14)" (amended, PRB7-07).
* **E-V9-2 — T-V9-52**: after "with `bend.wall.raisedCrossing`'s gate form," add " a gate of that wall slid by its grip into
  the strip moves back along the trace to the strip's edge its grip came from (a placed one to the nearer edge), its
  road following, the trace unchanged, with the same form (amended, PRB7-10), a wall
  drawn along beneath the viaduct moves to the strip's edge with the line's keep-clear form, and an aqueduct drawn across a
  wall drawn by hand crosses it on one of its arches with no `refuse.locked`,"; and VAT-r6-04's "in its wall form".
* **E-V9-3 — §4.9, a new row after `bend.raised.around`**: "| `refuse.raised.meeting` | "{thing} cannot meet {other} here
  without moving it; choose one of the marked places." — `{thing}` the drawn or edited structure's name, else its kind's
  word; `{other}` the wall, raised way or held building it would meet (J146: a held building blocking a wall, a retaining stroke or the raised way's own edit among them; no Unlock, §2.7's laws, law 2 (c)) | `button.chooseMarked` commit(`alternatives`, each `button.putAt`)
  · `button.showWhy` why | §7.1's row for a meeting of a wall and a raised way that no local shape makes lawful (§2.7's
  crossing table, the lock sentence's (G3)) |".
* **E-V9-4 — `report.moved.<kind>`**: after "`works.finish` "Work on {works} is finished."" add " · `reshaped` "{entity}
  keeps its place; its shape changed where it meets {met}."".
* **E-V9-5 — §5.5's fates sheet**: its head's counts add the fate *reshaped* in plain words ("2 keep their place but
  change shape where walls and raised ways meet"), and its rows for that fate add the change in words after the thing's name; and (J146; PRB7C-LCK-01) V09's `CountBadge.byFate` → `Record<EditFate['fate'], number>` (§7.1's `EditFate`; §2.7's laws, law 4).
* **E-V9-6 — §4.20.2 (4)'s last words**: "— each the same on a raised way locked, pinned or neither." → "— each the same
  with either side locked, pinned or neither, a held thing's change shown as the fate *reshaped* (§2.7's crossing table,
  the lock sentence)."; and (amended, PRB7-22) its aqueduct clause "an aqueduct drawn across a standing wall crosses it on
  one of its arches, its supports off the band and its course clear of that wall's towers and gates, never a gate (*over
  the band*;" → "an aqueduct drawn across a standing wall, held or not, crosses it on one of its arches, never a gate
  (*over the band*, §2.7's crossing table: its supports off the band, its strip clear of the wall's towers and gates and
  its fixed-place zone of its fixed places;", and §4.9's `bend.wall.aqueductArch` source cell "an aqueduct drawn across a standing wall" → "an aqueduct drawn across a standing wall, held or not"; and (J146; PRB7C-LCK-13) (4)'s "runs on beneath its deck, nothing of the raised way changing (*beneath*; `bend.wall.raisedCrossing`)" → "meets it by §2.7's laws (law 2 (a), law 3; its worked examples *beneath* and the bent-group sentence), a placed or slid gate by row W13 (`bend.wall.raisedCrossing`)".
* **E-V9-7 — T-V9-13** (amended, PRB7-21): its list "`refuse.locked`, `refuse.warp`, `refuse.water` —" →
  "`refuse.locked`, `refuse.warp`, `refuse.water`, and `refuse.raised.meeting` (§7.1's row for a meeting of a wall and a
  raised way that no local shape makes lawful) —".
* **E-V9-8 — §4.20.6 (2)'s span reading** (amended, PRB7B-11): "A span whose under-deck strip a wall's band or wall strip
  meets is read `open` while that band or strip lies there, whatever the runs' condition and its recorded `use` (§2.7's
  crossing table, *beneath*)" → "A span §2.7's crossing table's *beneath* reads `open` is read `open` while it does,
  whatever the runs' condition and its recorded `use`"; and "and shows "Walled up as a vault" disabled with "A wall runs under this arch"" → (J146; PRB7C-LCK-07) "and keeps "Walled up as a vault" enabled — setting it holds the span's `use` `vault`, its chamber laid once nothing lies across (§2.7's laws, law 1 (8)), as the clerk's call does — and says what lies under it in words — "A wall runs under
  this arch" for a wall's band or strip, an absorbed run or a retaining wall, and for a way or channel the line its
  recorded reason would give ("A street passes under this arch")"; and (J146) §4.20.6 (2)'s path `spans/<n>/use` → `spans/<a>-<b>/use` (§7.1's binding, E-D15).
* **E-V9-9 — §4.20.2 (8)'s badge** (J146; PRB7C-LCK-13). "(the vaults by V04 §3.5.4's span rule, none under a wall:
  §2.7's crossing table, *beneath*)" → "(the arch vaults V04 §3.5.4 (d) lays: none in a span §2.7's laws read `open`, law
  1 (8))".
* **Sweep (blind spot (b)).** `bend.raised.wall`, `bend.wall.aqueductArch`, `bend.raised.underSpan` (VAT-r6-04) and
  `bend.raised.around` stand otherwise; §4.20.6 (2)'s why card stands, its panel line E-V9-8's (amended, PRB7B-11).

### V10

| id | sev | grade | disposition | note |
|---|---|---|---|---|
| VEL6-r6-01 | major | major | FIX per R7-05 | the raised-way read row and T-V10-41 in R7-05's citing form (amended, PRB7B-11) |

(J146) **END lines V10 writes:**
* **E-V10-1 — §4.1's `span` row** (PRB7C-LCK-07). "`setAttr { id: target, path: 'spans/<n>/use', value: use }`" →
  "`setAttr { id: target, path: 'spans/<a>-<b>/use', value: use }`, the n-th span's keys read from the target's card
  (§7.1's binding, as §2.7's record keys a span; a span §2.7's laws read `open` takes the held `use` as the canvas does,
  law 1 (8))".
* **E-V10-2 — `ProposalView.counts.fates`** (PRB7C-LCK-01): keyed by `EditFate['fate']`, *reshaped* among them (§7.1's
  `EditFate`; §2.7's laws, law 4).

Blind spot (b) otherwise searched: V10 states no crossing or lock rule.

### V11

| id | sev | grade | disposition | note |
|---|---|---|---|---|
| VV1112-r6-02 | minor | minor | FIX, amended | row 80's reader cell and W50 as written, and "S5a and S7 (a wall meeting a raised way's under-deck strip at `structure.stripMarginM`" → "S3, S5a and S7 (a wall meeting a raised way's under-deck strip, and its fixed-place zone, at `structure.stripMarginM` — S3's trace at a regeneration among them" (the crossing table's fixed-place sentence and the lock sentence's (G1) read the margin) |

**END line V11 writes:** §3.24.2's readers: "(`stripMarginM`, §4.6; a wall meeting it by §2.7's crossing table, its gates
and towers kept out of it)" → "(`stripMarginM`, §4.6; a wall meeting it by §2.7's crossing table, its gates and towers
kept out of it, its fixed places out of the fixed-place zone it bounds, and a held thing's reshape bounded by it)"
(amended, PRB7-09).

### kernel, V02, V03, V08

No issue and no END line this round (blind spots searched: none states a crossing, lock or arch-vault rule of the family);
these seats do not run.

### V12 (J146)

No issue; one END line (PRB7C-TIM-13), so V12 runs this round:
* **E-V12-1 — §3.11's `raisedWays.structure` line.** "(the under-deck strip's one margin cell, read by §4.6 S8, shipped
  with item 110's rows from M3a)" → "(the under-deck strip's one margin cell, read by §4.6 S8 and by §2.7's laws — the
  strip, the ends, the zone and a held building's strip of their terms —, shipped with item 110's rows from M3a)".

### Totals

53 issues: **50 FIX** (17 as written, 31 per a ruling, 2 amended — each named in its note; VAL-R6-03, VEL6-r6-01 and
VAF-R6T-04 now per R7-05 and VDC6-02 per R7-07, amended, PRB7B-11, PRB7B-16), **3 MERGED** (VEW-r6-02 into VAL-R6-01,
VV910-r6-01 into VAT-r6-02, VPC-r6-06 into VAL-R6-07), **0 INVALID**. Grades: reported 28 major, 25 minor; graded the
same (no regrade). END lines: under scope (13), pipeline (9, and E-P7 a text confirmed), determinism (12), rendering
(1), V01 (1), V04 (8), V06 (16), V07 (4), V09 (8), V11 (1), and the model's (M6) — Part P's E-S11, E-S12, E-D11,
E-V6-14, E-V6-15, E-V7-4 and E-V9-7 among them (amended, Part P pass 1), and E-P9, E-P10, E-D12, E-R1, E-V1-1, E-V4-8,
E-V6-16 and E-V9-8 (amended, Part P pass 2). (J146) After Part L and pass 3: **50 FIX** (16 as written, 31 per a
ruling, 3 amended — VAL-R6-05 now FIX, amended), **3 MERGED**, **0 INVALID**; END lines under scope (17), pipeline (13,
and E-P7 confirmed), determinism (16), rendering (2), V01 (1), V04 (8), V06 (19), V07 (7), V09 (9), V10 (2), V11 (1),
V12 (1), and the model's (M6) and E-M1 — the J146 ones listed at this Part's head.

## Held for round 8

Not ruled this round (J144: the family is worked alone; these resume with the full sweeps once a family-focused verify
finds no major in the family). The 28 ids of `docs/validation/coherence/work/held-r8/`, by owner:
V01 — VAT-r6-03, VV12-r6-01, VV910-r6-03; V02 — VV12-r6-02; V03 — VAF-R6T-01, VAT6-r6-04; V04 — VV34-r6-02; V07 —
VAL-R6-04; V08 — VAH-r6-01, VAH-r6-02, VEL6-r6-03, VV78-r6-03; V09 — VAT-r6-06, VV910-r6-02; V10 — VAT-r6-05,
VV910-r6-04, VV910-r6-05; V11 — VV1112-r6-03; V12 — VV1112-r6-01; determinism — VAH-r6-03; rendering — VAT-r5-02,
VAT-r6-01, VRC6T-01, VRC6T-02, VRC6T-03, VRC6T-04; scope — VAP-r6-03, VCS-r6-05.

## Part P — the probe's findings and their decisions

Each pass of `coherence/probe-r7` attacks the family's ruling (R7-02 – R7-07 and the Part H END lines that carry them)
before any repair seat writes against it; `coherence/adjudicate-r7-amend` decides each finding here and amends the ruling
in place, each amended spot marked "(amended, PRB7-nn)" (a marker of this file, never written into the design). The
owner's rule J144 and its guardrails (G1)–(G3) are kept in their words; no owner rule is changed, and every reading of
the owner's words stays the program's (J122, vetoable).

### Pass 1 — `probe-r7.md` (coherence/probe-r7, 2026-10-02; 29 findings: 0 blocker, 20 major, 9 minor)

**Flagged — the exception (a rule that could not hold).** Three findings showed the table's own rule admitting a shape
that clashes with item 110 (b) as the program reads it ("crossing the wall through an arch": every aqueduct crosses every
wall under one of its arches, never at a pier) or with item 110 (f)'s bars as T110-2 (3) carries them ("no ramp, stair or
foot in the band"): **PRB7-08** — a pulled trace's band, tested only by its line, laid through an aqueduct's pier and over
a ramp; **PRB7-07** — a wall re-sectioned on its trace, its wider band through a pier, with no row to rule it;
**PRB7-18** — an aqueduct founded across an absorbed record's standing runs standing a pier on a run, its "—" cell
deferring to a case that does not arise. Each is restored by the narrowest change: one sentence testing the band
(*beneath*'s *Line and band*, with the bent group's strip widened by the band's half), one row citing the bent-group
sentence (W14), and one obstacle clause ((M5)) with W8's C1 and C11 cells. No cell is left without a lawful outcome.

**How this pass closes by construction.** Six general sentences settle classes rather than cells: the lock sentence's
**reach** (whether an event may act on its own target is §7.1's, §7.2's, V06 §3.1's and V05 §3.16 (2)'s, before any
meeting — PRB7-03, PRB7-04 and every C8 cell); **Strips, zones and nearest points** (strips and zones read whatever a
span's state; one nearest-point and tie rule; a slid gate goes back — PRB7-10, PRB7-14); **Line and band** with the bent
group's widened strip (PRB7-08, PRB7-01); *down before the wall*'s gate by its path's own gate law (PRB7-06); *beneath*'s
`vault` reading cited by every reader, never restated (PRB7-13, PRB7-25); and the fixed-place sentence's "this zone"
(PRB7-09).

**Totals.** 13 ACCEPT, 15 ACCEPT AMENDED, 1 REJECT. Behaviour changes touched (the family's veto list): 9, 10, 11, 12, 13,
14, 16, 17, and new 18 (PRB7-13) and 19 (PRB7-07).

| id | sev | decision | reason | ruling text, cell, Part H entry and END lines changed |
|---|---|---|---|---|
| PRB7-01 | major | ACCEPT AMENDED | The held building's span now has one outcome on every path. *Beneath* defines **a held building's widened strip** — the span's under-deck strip widened **all round** (the probe's "each side" would leave a crossing at the neighbouring span laying its setback or glacis along the deck over the span) — which a pulled line treats as impassable and a bent-group line never enters: a crossing that would is moved by the bent-group sentence's (i), a fate, and `refuse.locked` names the building only for a stroke a lawful crossing would admit but for held buildings' widened strips; any other stroke with none takes (G3). The bent group's strip takes the widened strip in, so (ii)–(iii)'s edges pass outside it. | R7-02: *beneath* (*A held building in an arch vault*), the bent-group sentence (its strip, its lawful crossing, its long sides), the new-names list, veto 12, attack 4 · Part H: E-S4, E-V4-4, E-V6-5 |
| PRB7-02 | major | ACCEPT | The base's own S3 order — (5) solved, (7) re-solved, (8)–(9) laid, S4 committing (5) "without re-solving" — makes the gate routes' raised stretches the earlier structure. R7-03 (a)'s home text now says so once: S3 (8)'s siting filter and S3 (9)'s pull, anchors and water gates read them as standing raised ways (the pull keeping their boundary crossings as S5a *Trace* (2) does), S4 commits them unchanged, and a raised stretch on an S4 route of its own is laid after the trace. E-S3 runs both orders and the castle's weld. | R7-03 (a)'s home text · R7-02: *beneath*'s pulled list, veto 17 · Part H: E-P4, E-S3 |
| PRB7-03 | major | ACCEPT AMENDED | One sentence instead of a patch per C8 cell: the lock sentence's **reach** — whether an event may act on its own target is decided before any meeting, as anywhere. A hand op on a wall or raised way the user locked or pinned (T10 `hold`) is refused by §7.1's lock row, nothing written; a drawn wall or a declared raised way is changed by its author's new declaration, as §7.2 *Declared means held* already says ("Its author changes it by a new declaration (a handle drag, §7.1)"), and takes its cell. The C8 lead says "no `refuse.locked`" in a cell is the meeting's. E-D1 carries the author's clause and the declaration row's exemption. The probe's alternative (a drawing's lock refusing its author) is not taken: it contradicts §7.2's words and would stop E-S4's declared viaduct and T110-2 (4)'s re-spacing. | R7-02: the lock sentence (*Its reach*), C8's column description, attack 12, veto 9 · R7-06 (c) · Part H: scope's VCS-r6-01 note, E-S4, E-D1 |
| PRB7-04 | major | ACCEPT | A landfall is no meeting of two similar structures: the lock sentence's reach keeps V05 §3.16 (2)'s rule (a held part never covered, the ruin lapping round it), and W12·C8 now gives the held side kept and the other side W12·C2's outcome — what T-V5-14 already runs ("With the aqueduct locked, it is kept as content the ruin laps around … and the run beneath is `breached` all the same"). | R7-02: the lock sentence (*Its reach*), W12·C8, veto 9 |
| PRB7-05 | major | ACCEPT | E-V6-12 conformed V06 §3.1 but not the bars that count locks; each now reads a wall's, a raised way's and an arch vault's placement held and its shape where they meet the crossing table's. | Part H: E-S11 (§15.2's O9 (b), §13.2's T101-5), E-V6-14 (T-V6-4, the *history × locks* row); R7-02's ENDs paragraph |
| PRB7-06 | major | ACCEPT AMENDED | One rule rather than a gate named per path: a priced deck's route crosses the trace at a gate of its path's own gate law (§5.3's gate row; §4.8 *Gates*) — the stage's at generation and at a regeneration that re-derives the trace, a standing one at an epoch ("an epoch's growth crosses at gates alone") and under a held trace — so a deck makes no gate its path would not, and a gate is made in a held wall by hand alone, by §7.3's S7 operator, §7.1's lock row not refusing it (veto 10 kept, its reach stated). E-S2 runs the regeneration and the epoch. | R7-02: the lock sentence's list of changes, *down before the wall*, veto 10 · Part H: E-D1, E-S2 |
| PRB7-07 | major | ACCEPT AMENDED | A wall whose band widens on a kept trace is a missing row: **W14** added (a hand grade or kind `setAttr` re-derived by S7's operator; V07 §3.11's REPLACEMENT). Its cell cites the bent-group sentence — a re-sectioned run joins the bent group — instead of restating the moves, so the new band is kept to a lawful crossing, re-traced locally where it would not cross lawfully, and the vault and tower rules follow from *beneath*. Flagged (above). | R7-02: the Summary's row count, the bent-group list, row W14, W2's event cell, veto 19 (new) · Part H: the model's heading, E-S4, E-D3, E-V7-1, E-V9-1 |
| PRB7-08 | major | ACCEPT AMENDED | One sentence, *Line and band*, makes every keep-clear of a trace's line off a ramp, stair, foot or standing support hold for its band (the line kept by the band's half there; a road deck's support the band is laid through); the pulled impassables are widened so, the band only touching an aqueduct's ring at **the edge**; the bent group's strip is the under-deck strip widened by the band's half, so its edges and (ii)–(iii)'s moves keep the band outside the under-deck strip; *the cap* reads any part of the band beneath. This replaces the probe's offset per rule with one widening. Flagged (above). | R7-02: *beneath* (*Line and band*, the pulled impassables, the band at *the edge*, *the cap*), the bent-group sentence, the new-names list, veto 13 · Part H: E-S4 |
| PRB7-09 | major | ACCEPT | The fixed-place sentence is the home: every text that kept a raised way's "strip" clear of fixed places now says its fixed-place zone, and the sentence says once that such a text means the zone. | R7-02: *over the band*, the fixed-place sentence, the paths note, W1·C1, veto 14, the equivalence · Part H: E-P1, E-D2, E-S4, E-V6-4, E-V9-6, V11's END |
| PRB7-10 | major | ACCEPT AMENDED | One rule for every "nearest point clear" along a line — the nearer of the two points, ties to the one nearer the line's first vertex in vertex order — and a slid gate back to the edge its grip came from, stated once (*Strips, zones and nearest points*); W13, *No gate and no tower*, attack 7, veto 13 and the ENDs read it. | R7-02: *Strips, zones and nearest points*, *No gate and no tower*, W13·C2, attack 7, veto 13 · Part H: E-D3, E-S4, E-V9-2 |
| PRB7-11 | major | ACCEPT | C5 and T110-2 (4) keep a trace through a `cleared` support's ring (open ground, both its spans fallen); the lawful crossing and *Where the line crosses* now admit it. | R7-02: *beneath* (*Where the line crosses*), the bent-group sentence's lawful crossing |
| PRB7-12 | major | ACCEPT | V06 §3.7.6 (1) makes an epoch's re-anchored stretch the `EnceinteStrategy`'s: the bent group lists a stretch re-anchored by hand only, and *beneath*'s pulled list the epoch's. | R7-02: the bent-group list, *beneath*'s pulled list |
| PRB7-13 | major | ACCEPT AMENDED | *Beneath* reads a `vault` span `open` also while a way's corridor or a channel laid while it read `open` crosses its strip, so no chamber is laid across a lane or in water, and every "laid again" of the table is *beneath*'s. Beyond the probe's words: the removal, re-route or fill of such a way or channel runs V04's reconcile (E-V4-1, E-V6-1), and every bar and reader cites *beneath*'s reading instead of restating "no wall stands over" (R7-06 (b)'s one wording, V04's and V06's sweeps); veto 18 records the behaviour. | R7-02: *beneath*, Block 2's lead, row (c), W7·C2, veto 18 (new) · R7-04 (d) · R7-06 (b) · Part H: E-S0, E-S7, E-V4-1, E-V4-5, E-V4-6, V04's sweep, E-V6-1, E-V6-10, V06's sweep |
| PRB7-14 | major | ACCEPT AMENDED | *Strips, zones and nearest points* reads a raised way's strip, its fixed-place zone and a held building's widened strip whatever a span's or support's `state`, so no gate, tower or fixed place is laid under a fallen span that its repair would stand over; C10 adds that a hand repair of a `cleared` support or dismantled span, which bends to a new raised part (V06 §2.8), is that part's creation (C1), its supports off any band; the sweep runs the repair after the event. | R7-02: *Strips, zones and nearest points*, *No gate and no tower*, C10, veto 14 · R7-06 (a) · Part H: E-S0 |
| PRB7-15 | major | ACCEPT AMENDED | The bent extension is a course laid then, meeting each standing wall as C13's re-shape does; "the straight course" reads "its course (the way's line)"; with no fitting course each station is slid by (3) off every obstacle but the water or valley whose bound it fails, never omitted. | R7-02: C12, veto 16 · R7-04 (c)'s home text · Part H: E-S8 |
| PRB7-16 | major | ACCEPT AMENDED | (G3)'s ladders off the hand path get their detection and rung: F-WALL's raised-way rung (re-pulled once round the raised way, else that stage left unwalled, `W_RAISED_MEETING`), V06's `waited` counts, V07's F-V-RAISED, and a table-edit run on every path. Amended: the probe's pipeline END is homed at determinism, §5.2 and §5.4 being base §5's (E-D11). | R7-02: the fixed-place sentence's and the bent group's (G3) citations, the new-names list, veto 11 · Part H: E-D11, E-S12, E-V6-15, E-V7-1, E-V7-4 |
| PRB7-17 | major | ACCEPT AMENDED | The sweep's C8 gains a user-locked arch vault and, in a clause whose event lays a trace, a held building seated in it (amended: under a standing run there is no chamber to seat one in, so the probe's fourth run is set up only where the event lays the trace); E-S6 runs a held ring at a regeneration. | R7-06 (a) · Part H: E-S0, E-S6 |
| PRB7-18 | major | ACCEPT | An absorbed record's runs not yet `dismantled` are a standing wall to a raised way created across them: W8·C1 and C11 written, (3)'s obstacle list carries the old band over those runs ((M5)), V06's founding names them. Flagged (above). | R7-02: W8·C1, W8·C11, (M5) · Part H: the model's heading, E-V6-3, E-V6-4 |
| PRB7-19 | major | REJECT | (G3) is J144's recorded guardrail in its own words — "by hand refused with the nearest lawful alternative, item 101 R2" (PROGRESS J144) — which this pass keeps intact; the ruling already reads R2 so for a meeting no lawful local shape admits ("(G3)'s refusal offers the nearest lawful declarations", R7-02's owner rules checked; J122, vetoable by veto 11), and the bend asked would pick for the user a declaration that no longer makes the meeting declared. | — |
| PRB7-20 | major | ACCEPT | V06 §3.19 (5)'s first clause made a held retaining wall or raised way impassable to a founded course where an unheld one is not — a lock altering a meeting; both are now met as unheld ones, the retaining wall passed over with a support on its line. | R7-02: veto 9, the equivalence · Part H: E-V6-4, E-S1 |
| PRB7-21 | minor | ACCEPT AMENDED | W1·C12 and W2·C12 name both orders' tests; W1·C3 – C6 name T-V7-48's sweep run at a village (E-V7-1); the sweep's C6 under a standing run has no chamber; T-V9-13 lists `refuse.raised.meeting`. Amended: W13·C9 needs no new run — T-V7-48 already runs "a hand `placeGate` whose `at` lies in its under-deck strip" on its village map; the cell now names that clause. | R7-02: W1·C3 – C6, W1·C12, W2·C12, W13·C9 · R7-06 (a) · Part H: E-S0, E-V7-1, E-V9-7 |
| PRB7-22 | minor | ACCEPT AMENDED | V09 §4.20.2 (4)'s aqueduct clause is reduced toward the citation (*over the band*, held or not, its fixed-place zone named) rather than given a longer restatement; E-V6-5 names a held building's widened strip and the raised way's fixed-place zone. | Part H: E-V9-6, E-V6-5 |
| PRB7-23 | minor | ACCEPT | E-D7 derives a held raised way's chamber entry from the chamber's own event; (G2) names the village derivation. | R7-02: (G2) · Part H: E-D7 |
| PRB7-24 | minor | ACCEPT | The epoch count is *Reported*'s, a move no count. | R7-02: the bent-group sentence |
| PRB7-25 | minor | ACCEPT AMENDED | Closed with PRB7-13's reading: `wallToWay`'s dry run reads each span as *beneath* reads it once the op commits — another wall's band, strip or run, or a way or channel laid while it read `open`, keeping it `open`. | R7-02: row (c), W7·C2 · R7-04 (d) |
| PRB7-26 | minor | ACCEPT | W1 names a hand `contractWall` (S5a's trace step, a pulled trace) and W5 a hand `wearWall` and `neglect`, each with its dry-run line. | R7-02: W1's event and last cells, *beneath*'s pulled list and *Reported*, W5's paths, W5·C2 and its last cell · Part H: E-S4 |
| PRB7-27 | minor | ACCEPT | The hand stroke beyond the trace is carried on as the ground way to its end; a second raised way only by a second declaration. | R7-02: *down before the wall* · Part H: E-S2 |
| PRB7-28 | minor | ACCEPT | A support on a retaining wall's line reads its height on the low side. | R7-02: the lock sentence's retaining-wall clause |
| PRB7-29 | minor | ACCEPT AMENDED | A chamber laid again is a fate by hand and, at an epoch, a held one's `reshaped` entry (no fate off the hand path). | R7-02: W4's, W8's and W11's last cells |

### Pass 2 — `probe-r7b.md` (coherence/probe-r7b, 2026-10-02; 17 findings: 0 blocker, 13 major, 4 minor)

**Flagged — the exception (a rule that could not hold).** Three findings showed a cell whose rule, as pass 1 left it,
gave no lawful outcome: **PRB7B-04** — at an epoch's new walled stage *down before the wall* sent a spawned primary's
priced deck to "a gate standing in that trace" while nothing stands in a boundary the stage has yet to lay, against row
(d) and §4.8's `N_k`; **PRB7B-06** — C10 made a road deck's hand-repaired span "that part's creation, C1", which cannot
come down between two standing piers, so every such repair would be refused against V06's "rebuilt as a new span";
**PRB7B-08** — a run an epoch's moved river or carve re-traces was sent to F-REDERIVE's ladder, which had no rung for
it, and could not wait for water already moved. Each is restored by the narrowest change: the gate decided by whether the
trace stands when the route is solved (*down before the wall*); the repair keeping the way's course as C12's extension does
(C10); one F-REDERIVE rung deciding before the water is inserted, the water op itself waiting by (G3)'s own words
(E-D12). No owner rule is changed; J144's rule and (G1)–(G3) stand in their words.

**How this pass closes by construction.** General sentences settle classes rather than cells: *Several raised ways* (every
strip and zone read as the union of all standing raised ways', the bent group's moves made on that union — PRB7B-01);
*Footprints* (a tower, a gate and a fixed place in a strip or zone by its footprint, every text and bar reading it so —
PRB7B-02); *Nearest points* in either direction along the line, never past its ends (PRB7B-01); a castle sited, never
reshaped (PRB7B-03); a deck's gate by whether the trace stands when the route is solved (PRB7B-04); a held building held against
whichever op brings the wall (PRB7B-05); a hand repair keeping the way's course (PRB7B-06); the reach's "every other hand
op that would re-trace a run it does not declare" (PRB7B-07); every (G3) ladder's raised-way rung alone, every other rung
keeping the table (PRB7B-08, PRB7B-09); a retaining wall's line in *beneath*'s `vault` reading, in either order
(PRB7B-10); every reader citing *beneath*'s reading by name, never its cases (PRB7B-11); the pull's homes citing the
widened impassables (PRB7B-12).

**Totals.** 3 ACCEPT, 14 ACCEPT AMENDED, 0 REJECT. Behaviour changes touched (the family's veto list): 9, 11, 12, 13, 14,
and new 20 (PRB7B-10), 21 (PRB7B-06) and 22 (PRB7B-08).

| id | sev | decision | reason | ruling text, cell, Part H entry and END lines changed |
|---|---|---|---|---|
| PRB7B-01 | major | ACCEPT AMENDED | One reading for every rule rather than a union clause per rule: *Strips, zones and nearest points* reads the standing raised ways together — a strip or zone a rule names is the union of every standing raised way's of that kind, so nothing is moved from one into another and every move ends; the bent-group sentence's *Several raised ways* holds its rule for each raised way and makes its moves on the union, (ii)–(iii)'s edges and (i)'s nearest lawful crossing defined so that they hold for decks that cross as for decks side by side. Amended: the probe's "within the wall's band's width" is dropped — the bent group's strip already carries the band's half each side, so two under-deck strips within a band's width are two bent-group strips that meet; and "the nearer of the two points" becomes the nearest point in either direction along the line, never past its ends, which covers a line crossing the union more than once or ending inside it. | R7-02: *Strips, zones and nearest points* (*Several raised ways*, *Nearest points*), the bent-group sentence (*Several raised ways*), *No gate and no tower*, veto 13, the new-names list · Part H: E-S4, E-D11 |
| PRB7B-02 | major | ACCEPT AMENDED | One sentence (*Footprints*) defines "in a strip or zone" for every rule, text and bar: a tower or a gate by its footprint (the tower's, the gatehouse's with its passage), the nearest point clear being the first at which the footprint is clear, so T-V6-47's and T-V7-48's counts read footprints with no change of words. Amended beyond the probe: a fixed place is read with its own points and the footprint of the gate or tower standing there, so a water gate or anchor tower kept out of the zone keeps its footprint off the under-deck strip too; and E-S3's bar is split into fixed places in a zone and gates' and towers' footprints in an under-deck strip (it had counted every gate and tower against the zone). (iv) and E-D3 name the under-deck strip, as W2, W13 and *No gate and no tower* do; the bent group's widened strip carries the line's band only. | R7-02: *Strips, zones and nearest points* (*Footprints*), *No gate and no tower*, the bent group's (iv), veto 13, the new-names list · R7-06 (a) · Part H: E-S0, E-S3, E-D3, E-P5, pipeline's sweep |
| PRB7B-03 | major | ACCEPT AMENDED | The castle's law pins its weld vertices and the ends of its gate side (§4.8's pinned vertices), so a castle sited after a raised way is sited clear of it, never reshaped: S3 (8)'s filter takes no claim with a weld vertex in a fixed-place zone and fixes the town-side gate on the least-cost side whose gate lies clear, a claim with no such side failing; a failing claim takes the siting's next candidate, then F-CASTLE's own ladder from its re-site rung (re-sited, else kept without a bailey, each reported); by hand a drawn castle takes (G3). The weld vertex leaves *Strips, zones* and (iii); S6's aqueduct reads the castle's fixed places. Amended: a tower at a bailey vertex other than a weld vertex is no fixed place — §4.8 places the bailey's towers "at its vertices and along its runs" as it places a town wall's at turns, and those move along the trace as any tower; the gate is chosen among clear sides (the castle's own law, read so) rather than the claim rejected for its first side; and the ladder ends where F-CASTLE's does, not at an `inside` castle whose gate could fail the same filter. | R7-02: the fixed-place sentence (fixed places; *A castle sited after the raised way*; S6's reading), *over the band*, *Strips, zones and nearest points*, *No gate and no tower*, the bent group's (iii), the Summary, veto 14 · Part H: E-P4, E-P5, E-S3, E-D4 |
| PRB7B-04 | major | ACCEPT AMENDED | Flagged (above). One rule in place of the probe's two clauses: the gate is decided by whether the trace stands when the route is solved — a boundary the route's own derivation lays after solving it (at generation, at a regeneration that re-derives it, and at an epoch's new walled stage for the routes that stage solves before its trace) takes that stage's gate law, row (d)'s spawned primaries' main gates among them; a trace standing when the route is solved (at an epoch every such trace, the new stage's own once laid; at a regeneration a held one) gives a standing gate. Row (d) and the stage's `N_k` hold on every path, and no gate is made in a held wall but by hand. | R7-02: *down before the wall* · Part H: E-S2 |
| PRB7B-05 | major | ACCEPT AMENDED | A held building holds its span against every wall whichever op would bring the wall there: the raised way's own re-shape or Arch spacing edit (C13) that would bring a standing trace's line into that span's widened strip is bent as C13 bends an edit (3) or (4) cannot place, in that edit's own bend line, else refused by §7.1's lock row naming the building. Amended: tested by the trace's line against the widened strip, which already encodes the probe's "band or wall strips over the span's strip"; a Deck height edit moves no span and a frame growth's extension keeps the old stations ((7)), so no other op reaches the case. | R7-02: *beneath* (*A held building in an arch vault*), C13, veto 12 · Part H: E-S4 |
| PRB7B-06 | major | ACCEPT AMENDED | Flagged (above). A hand repair of a dismantled span or a `cleared` support keeps the way's course as C12's frame-growth extension does, so it is no course laid: a span over a trace laid after the way stands over it again as the fallen one did, its new supports placed by (1)–(5) against what stands and slid off every band by (3), refused (G3) only where (3) and (4) cannot place a part. Amended: one rule for an aqueduct and a road deck alike rather than the probe's road-deck exception to C1. The sweep's C10 repairs a dismantled span by hand after the event; veto 21 records the behaviour. | R7-02: C10, veto 21 (new) · R7-06 (a) · Part H: E-S0, E-D4 |
| PRB7B-07 | major | ACCEPT AMENDED | The probe's first reading, which §7.2 *Drawn constraints* ("locked by default"), §4.11 *Other crossings* and §7.1's lock row (`refuse.water`) already state: the reach now says that every other hand op that would re-trace, convert or remove a run it does not declare — a carve or a moved river — meets a drawn wall's run as a locked one, refused, nothing written, so the bent group's carved or river-moved run is always neither drawn nor locked; the reverse ruling would contradict those three homes. Amended: the probe's "or a declared raised way" is left out — a carve or a way meets a declared raised way by the way-and-channel table (rows (b), (e)), which a lock or pin never refuses, and its words would have refused them. | R7-02: the lock sentence (*Its reach*), C8's description, W2's event cell, veto 9 · Part H: E-S5 |
| PRB7B-08 | major | ACCEPT AMENDED | Flagged (above). Homed once at F-REDERIVE (E-D12) and cited by the lock, bent-group, fixed-place and held-building sentences: the meeting is found on the new water's data before it is inserted, the run widened once to the next unaffected towers, else — by (G3)'s own words, the op that would create the meeting giving way — the water op (`shiftCourse`, an avulsion, `digCanal`) itself waits that epoch (`walls.waited`), by hand `refuse.raised.meeting`. Amended: the probe's last rung, a run left `breached` across the water with no water gate, is not taken — it breaks §5.3's "A wall trace crosses water only at a water gate"; it is new veto 22's option. | R7-02: the lock sentence's (G3), the bent-group sentence's (G3), the fixed-place sentence, *A held building in an arch vault*, veto 22 (new), the new-names list · Part H: E-D12 (new), E-D4, E-V6-15, E-S12 |
| PRB7B-09 | major | ACCEPT AMENDED | F-WALL's raised-way detection takes its own rung alone, now placed at the ladder's head so no order is left to read, and every other rung, run for another detection, lays a trace that meets every standing raised way as the pull's does or is passed over for the next. Amended: the rung names held buildings' widened strips and reads several raised ways together; V07's F-V-RAISED and E-D12's F-REDERIVE rung run alone too, so every (G3) ladder reads one way, and the lock sentence's (G3) says so once. | R7-02: the lock sentence's (G3), veto 11 · Part H: E-D11, E-D12, E-V7-4 |
| PRB7B-10 | major | ACCEPT AMENDED | One reading for both orders in place of a bend for the drawn stroke alone: *beneath*'s `vault` reading adds a retaining wall's line — a `vault` span whose strip it crosses is read `open` while it lies there, whichever was laid first, so no chamber stands across a retaining step (a raised way drawn or founded across a terrace among them, which the probe's form left open); a drawn stroke gives way to a held building as a wall does (moved under the nearest span seating none or at a support, a fate in §7.1's catch-all line, a retaining wall's move, else `refuse.locked` naming the building); a locked chamber is *reshaped*. The probe's bend of every stroke off `vault` spans is new veto 20's option. | R7-02: the lock sentence's retaining-wall clause, *beneath* (*A `vault` span under the wall*), attack 15, veto 12, veto 20 (new) · Part H: E-S9, E-V4-1 |
| PRB7B-11 | major | ACCEPT AMENDED | R7-05 now has every reader cite *beneath*'s reading by name ("a `vault` span §2.7's crossing table's *beneath* reads `open`") and never restate its cases, so a case *beneath* adds (PRB7B-10's among them) reaches every reader at once; VAL-R6-03, VEL6-r6-01 and VAF-R6T-04 become FIX per R7-05 in that form, and each home takes an END. Amended beyond the probe's sites: Block 2's own lead, row (c), W7·C2 and R7-04 (d)'s home text, which restated the cases, now cite; so do T-V1-51 (c), V04's §3.10 bullet (E-V4-3), §3.5.4 (d) (1) and (3) (E-V4-6), the reconcile's trigger cell (E-V4-1) and the wiring row (E-V4-8); V09's disabled line says what lies under the arch, its existing strings reused. | R7-02: *beneath*, Block 2's lead, row (c), W7·C2, (M6) (new) · R7-04 (d) · R7-05 · Part H: rendering (VAL-R6-03, E-R1), V01 (VAF-R6T-04, E-V1-1), V10 (VEL6-r6-01), E-P10, E-V4-1, E-V4-3, E-V4-6, E-V4-8, E-V9-8, the model's text list, Totals |
| PRB7B-12 | major | ACCEPT AMENDED | The pull's two homes now cite the widened impassables in place of the unwidened list: E-P9 (§4.4 S5a *Trace* (2)) and E-V6-16 (V06 §3.7.6 (5)'s cost field), each with every held building's widened strip. Amended: V06's cost field makes every standing support impassable, a road deck's too, and the probe's "as *beneath* widens them" would have widened a road deck's support, which *Line and band* lays the band through; E-V6-16 leaves it unwidened. They complete the ENDs of PRB7-08 and PRB7-01, whose pass-1 rows stand as decided. | Part H: E-P9 (new), E-V6-16 (new) |
| PRB7B-13 | major | ACCEPT AMENDED | Each amended cell's other paths get a run: the fixed-place sentence at an epoch circuit and contraction and on the hand success path (E-S4), at a founding beside a ring's water gate (E-V6-7) and at VS3's shore anchor (E-V7-1); W8·C1's founded road deck, waiting (E-V6-3); W14's kind change (E-S4) and the village REPLACEMENT under a carried-down raised way over the sweep (E-V7-1). Amended: T110-2 (4) runs on its own declared viaduct rather than naming V06's H-AQUA in a base test, and the kind change is "to a kind whose band is wider" rather than one named pair. | Part H: E-S4, E-V6-3, E-V6-7, E-V7-1 |
| PRB7B-14 | minor | ACCEPT | §7.1's lead now lists a meeting no local shape makes lawful among the inputs with no lawful form to bend to, as E-D4's row already governs. | Part H: E-D4 |
| PRB7B-15 | minor | ACCEPT AMENDED | E-V9-1 adds the fixed-place form; amended: `{edge}` takes the barrier's own word (shore, bank, cliff top, gorge rim, marsh edge, wall) or "river", since an anchor stands on more barriers than a shore. E-D3's cause and E-V9-1's source cell add `repairWall`'s new stretch (row W10). | Part H: E-D3, E-V9-1 |
| PRB7B-16 | minor | ACCEPT | *Reported* names VS3's palisade at a village derivation; R7-07 and VDC6-02 (now FIX per R7-07) and E-D11's §5.4 words name VS3's `W_RAISED_CROSSING` and `W_RAISED_MEETING`; E-V7-4's rung reports VS3's. | R7-02: *Reported* · R7-07 · Part H: VDC6-02's disposition, E-D11, E-V7-4 |
| PRB7B-17 | minor | ACCEPT | (1) Veto 14 reads the fixed-place zone; (2) the sweep's C8 drops the held wall no user ran (E-S1 and E-S6 run the held wall on the creating and regenerating paths); (3) R7-03 (a) reads the gate routes' supports as placed at S4's commit against the trace's band. | R7-02: veto 14 · R7-03 (a) · R7-06 (a) · Part H: E-S0 |

## Part P — Pass 3 under the laws (J146)

`coherence/adjudicate-r7-laws` (2026-10-02) decides probe pass 3's three lens files — `probe-r7c-locks.md` (15:
PRB7C-LCK-01 – 15), `probe-r7c-gen.md` (12: PRB7C-GEN-01 – 12) and `probe-r7c-time.md` (13: PRB7C-TIM-01 – 13); 40
findings, 0 blocker, 31 major, 9 minor — against Part L's laws, not by adding cells: **CLOSED BY LAW n** where the laws
decide the case uniquely; **LAW REFINED** where the laws as the owner's choice sketched them (PROGRESS J146) were
ambiguous and Part L carries the refinement quoted; **OWNER-RULE CLASH** where they would cross an owner rule;
**REJECTED** with the reason. A case missing from the examples is no finding (J146); where a closure needs a home's
words to cite the law, the END named in the last column writes them, marked "(J146)". No owner rule is changed, and
every reading of the owner's words stays the program's (J122, vetoable).

**Owner-rule clashes (flagged at the head, as J146's grading asks): none.** Two findings raised an owner rule, and the
laws decide both in the rule's favour. PRB7C-GEN-08 (item 110 (b): "an ELEVATED ROAD linking … a citadel and a great
temple") — the fixed-place reading would have kept every citadel's road unbuilt; law 2 (a) makes a raised way's ends,
where its own law picks them, part of its own search, so the road is built with its foot on the castle street clear of
the town-side gate (LAW REFINED below). PRB7C-TIM-02 (J144: "absolutely change the shape … despite being locked") — UC18
returning `E_LOCKED` for a retaining-wall stroke over a locked chamber is a lock refusing a meeting, which law 2's
*Entry* rules out. Item 101 R2's "refuses only what item 20 forbids … and what a lock protects" is the program's survey
wording (AMENDMENTS-2026-09-27e, R2, "Sources fetched … by the Fable manager"), not the owner's; the owner's item 101 (a)
gives a refused declaration "the closest acceptable alternatives", which law 2 (c) does (PRB7-19 stands).

**Totals.** 40 decided: **35 CLOSED BY LAW** (law 1: 10; law 2: 17; law 4: 8), **5 LAW REFINED** (PRB7C-LCK-03,
PRB7C-LCK-06, PRB7C-LCK-08, PRB7C-LCK-12, PRB7C-GEN-08), **0 OWNER-RULE CLASH**, **0 REJECTED**. Behaviour the laws add
that a builder sees is in Part L's restated veto list (items 5, 6, 12, 14).

| id | sev | decision | how the laws decide it | text changed (J146) |
|---|---|---|---|---|
| PRB7C-LCK-01 | major | CLOSED BY LAW 4 | Law 4's (G2) requires the typed fate: `EditFate.fate` gains `'reshaped'` with `met` and `change`, and every count keyed by fate takes it. No `placeMoved` is added: law 2 (b) never moves a held structure's fixed place, and one moved with the op's own structure is its bend (law 4), neither a fate nor an entry. | Part H: E-D14 (new), E-V9-5, E-V10-2 (new) |
| PRB7C-LCK-02 | major | CLOSED BY LAW 4 | Law 4: a reshape of the op's own structure — the user's stroke, a drawn wall its author's op changes — is its bend line, never a fate; only a held structure other than the op's own takes *reshaped*. Part L's correction 5 reads every example so. | R7-02: W2's and W14's last cells, the bent-group sentence, attack 5 · Part H: E-D3, E-D6 |
| PRB7C-LCK-03 | major | LAW REFINED | Law 2 (a): "an op that searches for its shape — … S5a's trace for a points-form `drawWall` … — searches only shapes law 1 admits, its own cost choosing among them; an op given its shape — a stroke … — takes the lawful shape law 3 picks nearest it". A points form and a stroke are two inputs, each with one outcome, the same by canvas and clerk for the same form; V06 §3.7.6 (4)'s circuit, laid by the `EnceinteStrategy`, is a search. | Part L (law 2 (a)) |
| PRB7C-LCK-04 | major | CLOSED BY LAW 4 | Law 4 lists a castle's keep and bailey grips, a terrain stroke and a warp. A castle dragged is a siting (law 2 (a): a search over claims law 1 admits, its claim moving whole, law 1's fixed places), else refused (c); a stretch a terrain stroke re-anchors is F-WALL's search, else refused; a warp's result is a given shape, reshaped by law 3. | R7-02: the fixed-place sentence ("a castle sited or resized by hand") · Part H: E-D4 |
| PRB7C-LCK-05 | major | CLOSED BY LAW 2 | Law 2 (c) is by path: a hand op is refused (`refuse.raised.meeting`) once its own re-pull fails; F-WALL's raised-way rung, ending in a stage left unwalled, runs at generation, a regeneration and a village derivation only. | R7-02: W1's last cell · Part H: E-D11 |
| PRB7C-LCK-06 | major | LAW REFINED | Law 4 lists width, class, revert, split, merge and warp among the ops that re-check, and law 3 adds "A bend that would leave the op with no effect is no bend: the op takes law 2 (c)": a width edit is bent to the nearest lawful width; a class change that only the old class makes lawful is refused; an edit or revert that would bring a span seating a held building under a wall is bent or refused (law 1 (9)). PRB7B-05's "no other op moves a span" is superseded (below). | Part L (laws 3, 4) · R7-02: C13, *A held building in an arch vault* |
| PRB7C-LCK-07 | major | CLOSED BY LAW 1 | Law 1 (8): a span's reading follows what lies across it, "its record unchanged either way" — a user's `use` `vault` on a span read `open` is lawful and applies alike by canvas and clerk, the held record kept and no chamber laid until nothing lies across; V09's panel keeps the control enabled and says so. A span's held `use` is keyed by its bounding piers' keys, as §2.7's record keys it. | Part H: E-V9-8, E-D15 (new), E-V10-1 (new) |
| PRB7C-LCK-08 | major | LAW REFINED | Law 1's terms: "**The zone** of a raised way, for a fixed place of a wall, is its strip widened each side by that wall's strips' width at that place". A re-section (W14) is the op's own structure (law 2 *Newer*): a fixed place its new widths bring into the zone moves along its tie (law 2 (a)); a castle's, whose claim is fixed, gives way (law 2 (c)). | Part L (terms) · R7-02: the fixed-place sentence's zone |
| PRB7C-LCK-09 | major | CLOSED BY LAW 1 | Law 1's footprint takes a retaining wall's decorative tower, so law 1 (5) keeps it out of a strip, moved along its line (law 3); its buttresses are its line. Law 4 lists the chain grip and a terrace level, which re-check as any op and give way to a held building as a drawn stroke does. | R7-02: the lock sentence's retaining-wall clause |
| PRB7C-LCK-10 | major | CLOSED BY LAW 2 | Law 2 *Newer*: a creation prefix's declarations stand before every stage, the later in its log the newer between them, each meeting as its declaration's commit resolved and stored it; a skeleton's round trip meets in the hand map's log order. | R7-02: W1·C8 · Part H: E-S15 (new) |
| PRB7C-LCK-11 | major | CLOSED BY LAW 2 | Law 2 (c): by hand `refuse.raised.meeting`, offering the nearest lawful declarations and **Show me why**, never an Unlock — so a held building blocking a wall, a retaining stroke or the raised way's own edit is refused so, never by §7.1's lock row. | R7-02: *A held building in an arch vault*, the retaining-wall clause, attack 4 and 15 · Part H: E-S4, E-S9, E-V4-4, E-D4, E-V9-3 |
| PRB7C-LCK-12 | major | LAW REFINED | Law 2 *Carried way*: "by hand §7.3's S7 operator makes its gate in every wall the declared way crosses, a held one too (a shape change of that wall, shown by law 4's (G2))"; the raised way's carried way is part of it (*Terms*: "the way it carries (by hand, the declared way to its stroke's end)"). | Part L (terms, law 2 *Carried way*) · Part H: E-D1 |
| PRB7C-LCK-13 | minor | CLOSED BY LAW 1 | V09 §4.20.2 (4) and (8) cite law 1 (8) and law 2 instead of restating. | Part H: E-V9-6, E-V9-9 (new) |
| PRB7C-LCK-14 | minor | CLOSED BY LAW 2 | The laws govern meetings only: a repair a street or water bars takes the support step's own outcome for a declared part; `refuse.raised.meeting` only where a band bars it. | R7-02: C10 |
| PRB7C-LCK-15 | minor | CLOSED BY LAW 2 | §7.4's lock column cites law 2 (placement held, shape at a meeting by the laws) for the retaining wall, the enceinte and the arch vault. | Part H: E-D10 |
| PRB7C-GEN-01 | major | CLOSED BY LAW 2 | A castle's walls are its claim's: law 1's fixed places take its weld vertices, town-side gate and vertex towers, and its curtain is a wall line law 1 governs; its siting is a search (law 2 (a)) over claims law 1 admits against every raised way standing then (S3 (5)'s stretches, a stage's S4 and S5b viaducts at a citadel, every held one at a regeneration); S6 reads the curtain from its claim's commit (law 2 *Not yet built*), so an aqueduct after it meets it as a standing wall. | R7-02: the fixed-place sentence · Part H: E-P4 |
| PRB7C-GEN-02 | major | CLOSED BY LAW 2 | Law 2 *Not yet built*: a footprint or width whose place is fixed is read from the rows that will build it, and the building step builds exactly that; law 2 (a)'s "within its own reach (the pull's search band …)" bounds a moved pin, beyond which law 2 (c). | Part H: E-P11 (new) |
| PRB7C-GEN-03 | major | CLOSED BY LAW 2 | Law 2 *Not yet built*: the stations and spans of a raised stretch whose course S3 (7) fixed are read at S3 (10), S3 (11) and S4's own routes as the support step will place them from what stands at S3 (10), and S4's commit places exactly those. | R7-03 (a) · Part H: E-P14 (new) |
| PRB7C-GEN-04 | major | CLOSED BY LAW 2 | A harbour gate on `L*`'s priced deck is a gate on a deck (law 1 (1)); placing it is a search (law 2 (a)): `L*` re-solved with no deck across the stage-1 boundary, as the gate routes are. `T`'s own lattice decides no meeting — law 1 holds whichever lattice `T` reads — and stays S3 (6)'s; a doubt about it is the pipeline's, outside the family. | R7-03 (a) · Part H: E-P13 (new) |
| PRB7C-GEN-05 | major | CLOSED BY LAW 1 | Law 1 defines **beyond the foot** once ("the nearest point of a road deck's carried way, past its foot, at which a wall's line, band and wall strips and a gate's footprint there are all clear of the ends and the strip"), and law 1 (1), (4), (5) bar a gate on a ramp or nearer the foot; S3 (7)'s re-solve, a search over lawful gates (law 2 (a)), takes every such first point. | R7-02: *Where the line crosses* · R7-03 (a) |
| PRB7C-GEN-06 | major | CLOSED BY LAW 2 | Law 2 (c) states once what an unwalled stage reads — §4.2 S3 (9) (a)'s: no `Enceinte` or `Gate`, its routes ungated, no harbour gate, moat or chain, the harbour route an unwalled town's, a welded castle re-sited else `inside`, `requestedVsBuilt`, `W_RAISED_MEETING`. | Part H: E-D11 |
| PRB7C-GEN-07 | major | CLOSED BY LAW 2 | Law 2 *Carried way*: off the hand path a gate is made only by the gate law of a stage that lays its trace after the route is solved, never in a trace laid before — so under a held ring S5b's spawned primaries route to the held ring's standing gates. Whether a regenerated route rides its held deck is §7.2's and §4.3's route rule, no meeting; each meeting it then makes the laws decide. | R7-02: row (d) (read with law 2 *Carried way*) |
| PRB7C-GEN-08 | major | LAW REFINED | Law 2 (a): "an op that searches for its shape — … a raised way's course with its ends where its own law picks them — searches only shapes law 1 admits", so an elevated road to a citadel takes the highest castle-street vertex at which its ends and zone keep the town-side gate and the castle's fixed places clear: built, item 110 (b)'s reason served, no owner rule crossed. | Part L (law 2 (a)) · Part H: E-V6-17 (new) |
| PRB7C-GEN-09 | major | CLOSED BY LAW 4 | S5d's top-up is S5a's trace step run again (law 4), its pull keeping each arterial's crossing as the picked boundary had it (R7-03 (b): S5a's own derivation, law 2 (a)); land beyond a deck's foot the re-traced arc cannot take goes to the next stage's quota, as S5d moves a moated arc's. | Part H: E-P12 (new) |
| PRB7C-GEN-10 | minor | CLOSED BY LAW 2 | Law 2 (b) and law 3 move a postern along its wall's line. | R7-02: *No gate and no tower* |
| PRB7C-GEN-11 | minor | CLOSED BY LAW 2 | Law 2 (c): S3 (7)'s failed re-solve takes F-ROUTE's ladder, whose row now names the step. | Part H: E-D16 (new) |
| PRB7C-GEN-12 | minor | CLOSED BY LAW 1 | Law 1's check is one §5.3 row at every stage end and every commit. | Part H: E-D13 (new) |
| PRB7C-TIM-01 | major | CLOSED BY LAW 4 | Law 1 (8) reads "anything across a strip" (marsh among it) and law 4 re-checks every op that changes anything law 1 (8) reads — a silting, a retaining wall's re-derivation or burial and a re-section among them —, so the epoch's scope takes every span whose reading changed, whatever op changed it. | Part H: E-V6-1, VAL-R6-05 (FIX, amended) |
| PRB7C-TIM-02 | major | CLOSED BY LAW 2 | Law 2 *Entry*: no lock refuses a meeting, so UC18 never returns `E_LOCKED` for one; a locked chamber is unlaid while law 1 (8) reads its span `open`, whatever lies across, and laid again, locked, with its id when nothing does. | Part H: E-V4-2, E-V4-4 |
| PRB7C-TIM-03 | major | CLOSED BY LAW 4 | Law 4: the pathway's ops at a village epoch re-check as any epoch op; the four C9 cells' "(V07 runs no pathway)" contradicts V06 and V07 and is struck; T110-4 runs village epochs. | R7-02: W4·C9, W6·C9, W7·C9, W8·C9 |
| PRB7C-TIM-04 | major | CLOSED BY LAW 2 | Law 2 *Entry*: a lock decides no meeting, so the sweep's epoch runs (and T110-2 (7)'s fallen span) lock the raised way once its state is made — no epoch repairs, strikes or releases it (V06 §3.1) — and the meeting tested is the unlocked cell's. | R7-06 (a) · Part H: E-S0, E-S16 (new), E-V6-8 |
| PRB7C-TIM-05 | major | CLOSED BY LAW 2 | The REPLACEMENT is the op's own structure (law 2 *Newer*): its trace kept where its new band is lawful, re-traced locally where not, its gates moved along where their stone footprints meet a strip (law 2 (a)), else it waits (law 2 (c)); V07 §3.11 and T-V7-32 cite it. | R7-02: W14 · Part H: E-V7-6 (new) |
| PRB7C-TIM-06 | major | CLOSED BY LAW 1 | Law 1's band: a village kind's section, `palisade.bandM` each side of it its wall strips. | Part H: E-V7-7 (new) |
| PRB7C-TIM-07 | major | CLOSED BY LAW 1 | Every reader cites law 1 (8)'s reading; V07 §3.5a (3), T-V7-48, V04's edit rows and V06's reconcile paragraph are reduced to it. | Part H: E-V7-5 (new); V04's, V06's and V07's sweeps |
| PRB7C-TIM-08 | major | CLOSED BY LAW 1 | Law 1's fixed-place class takes the harbour-mouth chain (tied to the heads it spans): laid after a raised way it moves along its tie (law 2 (a)), else is not laid at generation, waits at an epoch, is refused by hand (law 2 (c)); T110-4 runs T-V6-48's fixture with a viaduct over its mouth. | R7-02: the fixed-place sentence, *No gate and no tower* · Part H: E-S13 |
| PRB7C-TIM-09 | major | CLOSED BY LAW 4 | Law 4 lists a replay's burial; it clears the runs, so nothing lies across (law 1 (8)) and the chamber is laid again in the burial's commit; T110-4 runs a replay (T-V6-71's fixture among them). No row is added. | Part H: E-S13 |
| PRB7C-TIM-10 | major | CLOSED BY LAW 2 | Law 2 *Entry*: a hazard or a landfall never acts on a held part (§7.2 *Protection*, V06 §3.1, V05 §3.16 (2)), a declared way being held; V06 §3.19.2 (1)'s "breaks only by a hazard or the landfall" conforms (its author breaking it by hand), and the sweep makes C5 on a declared viaduct by its author's hand `convert`s. | R7-06 (a) · Part H: E-S0, E-V6-18 (new) |
| PRB7C-TIM-11 | minor | CLOSED BY LAW 1 | Law 1's check schedules T110-4 and every epoch arch-vault run at the later of M6-U's U5 and M6-E's E8. | Part H: E-S10, E-S14 (new), E-V6-11 |
| PRB7C-TIM-12 | minor | CLOSED BY LAW 1 | The check's sweep names C12's variant whose raised way ends on the frame's outer ring. | R7-06 (a) · Part H: E-S0 |
| PRB7C-TIM-13 | minor | CLOSED BY LAW 4 | The epoch count reads *Reported* (its worked example): a re-sectioned trace counted, a move no count; V12's margin line names the laws' readers. | Part H: E-V6-19 (new), E-V12-1 (new) |

### Passes 1 and 2 re-checked against the laws (J146)

Every PRB7-* and PRB7B-* amendment was read against Part L. All stand as worked examples, each illustrating the law
R7-02's banner maps its spot to, **save six, superseded in part** (each spot so corrected marked "(J146)"; the rest of
each amendment stands):

| id | the part superseded | by |
|---|---|---|
| PRB7-01 | the held building's refusal by §7.1's lock row, `refuse.locked` naming the building (it offers an Unlock that releases nothing) | law 2 (c): `refuse.raised.meeting` naming the building, no Unlock |
| PRB7-08 | *Line and band*'s and the pulled impassables' keeping of a line off a ramp, stair or foot by the band's half alone | law 1 (4): the line, band and wall strips off the ends (veto item 5) |
| PRB7B-03 | "a tower at a castle's bailey vertex other than a weld vertex is a tower as any, moved along the bailey's curtain" | law 1's fixed places: a castle's vertex towers are tied to its claim |
| PRB7B-05 | the raised way's own edit refused by `refuse.locked` naming the building; "no other op moves a span" | law 2 (c); law 4 (width, class, `split`, `merge`, `warp` and `revert` give way the same) |
| PRB7B-10 | the retaining stroke's refusal by `refuse.locked` naming the building | law 2 (c) |
| PRB7B-12 | E-P9's and E-V6-16's ramps, stairs and feet widened by the band's half | law 1 (4): by the wall strips' width there (Part L's correction 3) |

Beyond the amendments, three of R7-02's own spots contradicted the laws and are corrected in place: W1·C8's "(nothing is
held at a first generation)" (law 2 *Newer*), the C9 cells' "(V07 runs no pathway)" (law 4), and every "a fate" given to a
move of the op's own stroke (law 4; Part L's correction 5). Checked and standing: the lock sentence's reach (PRB7-03,
PRB7-04, PRB7B-07) is law 2's *Entry*; *Strips, zones and nearest points* (PRB7-10, PRB7-14, PRB7B-01, PRB7B-02) is law 1's
terms and law 3; the gate by the path's gate law (PRB7-06, PRB7B-04) is law 2 *Carried way*; the `vault` reading cited by every
reader (PRB7-13, PRB7-25, PRB7B-10, PRB7B-11) is law 1 (8); the ladders' raised-way rungs (PRB7-16, PRB7B-08, PRB7B-09)
and the frame growth past a bound (PRB7-15) are law 2 (c); the hand repair keeping its course (PRB7B-06) is law 1 (3)'s
course date; PRB7-19's REJECT stands.

**No major can be raised against an example.** Under J146 an example that differs from the laws, or a case no example
lists, is at most a minor (the example corrected to the laws); a major in this family names a case where Part L gives two
outcomes or none, an owner rule Part L crosses, or an invariant of law 1 that neither §5.3's row nor T110-4 checks.

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
round; 28 findings are held for round 8. (amended, Part P) Part P's decisions amend the rulings above in place; the dated
ruling cites them by pointer, so it carries them unchanged, and the amend seat does not rewrite `canon.md`. (J146) Part L —
the family's laws, normative, with R7-02 – R7-07 and Part P as their worked examples — is carried the same way: the dated
ruling's pointers to R7-02 now read through Part L, and `canon.md` is not rewritten by the laws seat (the orchestrator
may append a one-line J146 pointer).
