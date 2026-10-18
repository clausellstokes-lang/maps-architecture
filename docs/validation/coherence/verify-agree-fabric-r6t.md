# Agreement check, round 6 — the fabric chain (model, pipeline, V01, V02, V03, V11) after assemble-r6

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-agree-fabric-r6t; covered by the whole-design retrovalidation (J84).

> **PROGRESS** — [x] brief read whole (ROUND-6 NOTES (1)–(6), items 114–119 routing, ORCHESTRATION NOTES) · [x] inputs (round-5 report and result; adjudication-r6 R6-01 – R6-11, Part A, Part H, Part P; assemble-r6) · [x] live = assemble-r6's after-hashes; pre = `52a16b0` (assemble-r5's install) · [x] VAF-R5T-01 … 05 re-checked on the live text, END lines' second ends included · [x] every round-6 hunk in the six members read in its whole subsection · [x] R6-02's two tables checked in model, pipeline, V01, V11 (cells read, citations, restatements, superseded terms) · [x] R6-03's removal checked (no held-calamity clause) · [x] the members' repair-r6 HAND-OFFS checked · [x] matrix gaps hunted · [x] ids · [x] peers' twelve landed r6t results read (no duplicate raised) · [x] issues written · [x] result saved · [x] LANDED

## Scope and method

Members: **model** (§2), **pipeline** (§4, §10, PART II, PART III), **V01**, **V02**, **V03**, **V11**.

The live texts are `docs/ARCHITECTURE.md` (sha256 `f39f1c30…`) and `docs/volumes/V01/V02/V03/V11-*.md` (`bd9b4ceb…`,
`c7fbb705…`, `894955c2…`, `0e2767c1…`). Each equals assemble-r6's after-hash. The pre-round text is assemble-r5's
install at commit `52a16b0` (`2d84eac2…`, `4585e1a5…`, `fb46c676…`, `3fe82c82…`, `b1445a5f…`), the text every
repair-r6 file was written against. What was done:

* **Round-5 findings.** Each of the five ids was re-read at every site its claim, its required change and its Part H
  disposition name. Where Part H says "per R6-nn" or "amended", the ruling's text was the measure, not the round-5
  wording (VAF-R5T-01's held-calamity text is superseded by R6-03; VAF-R5T-02's by R6-02 as amended for PRB6-01).
  Second ends: VAF-R5T-05 is "one fix with VRC5T-03", so its V03 T-V3-39 (g) END, its V11 ENDs (l. 3828, 4650), scope's
  T123-7 (l. 18829–18831) and V12's (l. 903–906, 934, 1747–1748) were read too.
* **Round-6 hunks.** A line diff pre → live gives these hunks in the members:
  * the base: model's §2 8 (§2.1 1, §2.7 6, §2.9 1); pipeline's §4 28 (§4.1 1, §4.3 4, §4.4 6, §4.5 1, §4.8 4, §4.9 1,
    §4.11 5, §4.13 2) and II.7.6 1;
  * V01 17; V02 1; V03 4; V11 9.

  Each hunk was read in its whole subsection, and each subject it touches was read in every member that states it:
  * **R6-02 (raised ways and walls).** §2.7's support step (3), (6) with the way-and-channel table (rows (a)–(e)) and
    the crossing table (the four outcomes, C1–C13, W1–W13), (7) and the span rule were read whole as the home. They
    were checked against pipeline's sites: §4.1's S7 row; §4.3 *Lattice and costs*, *The slot* and *Where it may not
    go*; §4.4 S5a *Trace* (2) and *Outer moats*, S5b with its **Test**, and S5c's legality; §4.5's casters and S7b's
    capacity; §4.6 S8's strip; §4.8's lead and *Gates*; §4.11's `wallToWay`, carve and frame batches; §4.13's two
    cells; and II.7.6's arch vault. They were also checked against V01 §2.3's parts table (l. 977–978), §3.6 (5),
    §3.17.3 (1)–(7), §3.17.4, §3.18 (f), T-V1-51 and §1.2's hook rows; V02 §3.17 (b) and J-V2.89; V03's arch-vault and
    plan lines; and V11 §3.24.2's readers and cells, W50 and registry row 80.
  * **R6-03 (the late calamity).** §4.11 *The clock* (1) and (4) and §2.9's `EpochRecord` comment were checked against
    V01 §3.16 (2), §3.18's disaster row, T-V1-60 (d) with its timing cell, J-V1.104 and W11's cell. They were also
    checked against V08 §2.7's carried-fact row and §3.6 (2), the homes the amended V01 texts cite.
  * **R6-07 (the plan's damage).** §6.3 *Plan damage* and §2.6 step 7 were checked against V03 §3.13's row, §5.2 and
    T-V3-39 (f)–(g); V11 §3.25.10's lead, l. 3828, l. 4650 and EI-V11-EDGE-5; and V02 §3.18's rows.
  * **R6-09 (clauses scheduled before their provider).** V02 §8.6, V03 §8's P4 and P5 cells, T-V3-39's and T-V3-40's
    timing cells, V02's X36, V06 §8's E2 row and §13.8's T123 row were checked against one another.
  * **R6-10 (`StyleSheet.groups`).** §8.2's `groups` member was checked against §2.1's wording rule, §4.9, V01 §3.18
    (c), §4.2's T12 bullet, §5.1.3 with its slot table, and T-V1-56 (c).
  * **R6-11.** T-V1-59 (f)'s fourth district was checked against §6.3's succession and V01 §5.4 (4).
* **ROUND-6 SPECIFICS (6) (b)–(c).** These checks cover the six members:
  * (i) each cell a member reads gives one outcome, and is checked for a test that runs it;
  * (ii) superseded machinery: no member keeps a crossing station, raised gate, wall opening, held stretch, wall arch,
    `bend.wall.held` or a stopped strip. A search of the live members for each term finds none;
  * (iii) every citation of the tables in the members names an outcome or row that exists (*over the band*, *down
    before the wall*, *beneath*, *unchanged meeting*, rows (a)–(e), W1·C12). §5.3's citation at l. 9290 (determinism's)
    resolves too;
  * (c) no held-calamity clause and no `DossierBinding.lateCalamities` remains in any member. "nothing is held in the
    binding" (§4.11 *The clock* (4)) is the ruled denial, not a hold.

  The restatements pipeline carries — §4.3 *Where it may not go*, §4.4 S5a *Trace* (2), §4.8's lead — are R6-02's
  (P2), (P12) and (P6) END texts. Each agrees in meaning with the table's outcomes, so none is raised.
* **Hand-offs.** The HAND-OFFS sections of repair-r6-model, -pipeline, -V01, -V02, -V03 and -V11 were checked at
  their destinations:
  * model's two citation hand-offs have landed: pipeline §4.3 l. 5749 reads "row a", and V11 l. 3962 reads "rows
    (a)–(b)", which is right since a hand way is row (b);
  * pipeline's J-A67.45 rationale hand-off is closed by scope's swap (the rationale's l. 631, the index row's l. 22853
    and §4.11 item 9);
  * V02's observation on T-V3-40 (b)'s hand-over timing is open, but a peer already holds it (VAT6-r6-04);
  * V01, V03 and V11 hold none.
* **Ids.** No test, decision or edge id row was added, removed or duplicated in the six members this round (a diff of
  the id rows, pre → live). Every new pointer in the round-6 hunks resolves: V08 §2.7, V08 §3.8 / SF3, §6.3 *Plan
  damage*, V03 §5.6 (2) (a)–(b), V11 §3.25.9, T-V3-40 (e), §8.2's `StyleSheet.groups`, and the table names. V11's
  J-V11.47 now names its way-class table "a street-scale table keyed by way class (`ways.crossing`)", so "crossing table"
  names §2.7's alone in the set (searched).
* **Peers.** Twelve round-6 results had landed: verify-agree-layers, -agree-time, -agree-tools, -determinism,
  -edges-life, -edges-world, -model, -pipeline, -rendering, -scope, -vol-V05-V06 and -vol-V09-V10. They were read, and
  no defect a peer raised is raised again. In this chain they already hold:
  * §4.13's raised-way `wall` cell, whose rung "— (defined)" does not match *down before the wall*'s "not built,
    reported" (VAL-R6-07, VPC-r6-06);
  * T-V3-40 (b)'s hand-over clause scheduled before V06's E2 (VAT6-r6-04);
  * V01 §5.1.3's "so the view bar hides them" after R6-10 (VAT6-r6-03, VV910-r6-03);
  * the locked arch vault under a later wall (VAL-R6-01, VEW-r6-02), and a gate or anchor in an under-deck strip
    (VAT6-r6-02, VM-R6T-01, VEW-r6-03, VV910-r6-01);
  * the crossing table's cells that name tests which never run them (VM-R6T-02, VEL6-r6-02, VCS-r6-01, VAL-R6-06,
    VV56-r6-03), and `wallToWay`'s re-route and vault re-lay (VPC-r6-02).

  None of these covers the way-and-channel table's row (a) or T-V3-39 (c).

## Round-5 findings re-checked

| id | disposition (Part H) | state | where it stands now |
|---|---|---|---|
| VAF-R5T-01 | FIX per R6-03, amended (V01) | FIXED | All four sites carry Part H's amended text: §3.16 (2) (l. 2337–2338, "a calamity carried with no epoch event — one a declared remap fills into an older document (V08 §2.7) — still gives its targets and its pattern"), §3.18's disaster row (l. 2676) and J-V1.104 (l. 3625, "(one a declared remap fills in, V08 §2.7)"), and T-V1-60 (d) (l. 3361, "on a document upgraded through such a remap"). That clause's timing cell adds "(d)'s remap clause at the later of M5 and V08's SF3 (V08 §3.8's declared remaps)", and W11's cell (l. 3450) adds "remap clauses". The home agrees: V08 §2.7's row (l. 1294) and §3.6 (2) (l. 1877) both say "a calamity a declared remap fills into an older document is carried with no event". Under R6-03 no other path carries a calamity with no epoch event: one dated after `W₀` folds its own epoch, a late one with `W₁` after `W₀` rides one, and one with `W₁` not after `W₀` is not carried (§4.11 *The clock* (4), l. 8531). |
| VAF-R5T-02 | FIX per R6-02, amended PRB6-01 (V01) | FIXED | §3.17.3 (2) (l. 2466–2469) reads Part H's text verbatim, the quotation of item 110 (b) kept. §3.17.3 (3) is reduced to a citation of §4.3's crossing rule and the way-and-channel table's row a, "a `vault` span under a wall read `open` (§2.7's crossing table, *beneath*)". This agrees with *beneath*'s reader list (l. 2643–2644: "an `open` span to §4.3's crossing rule, the way-and-channel table and V01 §3.17.3 (2)–(3)"). T-V1-51 (c) runs it on a named fixture. |
| VAF-R5T-03 | FIX (V01) | FIXED | §3.17.4 (l. 2492–2493) reads "a viaduct inside S4's route solve or a later stage's S5b, the elevated road and the aqueduct at S6's end (item 290; §2.7's support step (6))". This agrees with (6) (l. 2558–2559), §4.3 *The slot* (l. 5814–5815) and V11 §3.24.2's readers. |
| VAF-R5T-04 | FIX, R6-07 (V03) | FIXED | V03 §3.13's damage-layer row (l. 2094) reads "every element damaged at 1, each from its entry week into the plan (V03 §5.6 (2) (a))". VV34-r5-04 adds "under no disaster look (§6.3 *Plan damage*)" to its level-0 outcome in the same cell. Both agree with V02 §3.18 (l. 2519) and §6.3 (l. 10049–10050). repair-r5-V02's hand-off is closed. |
| VAF-R5T-05 | FIX, R6-07; one fix with VRC5T-03 (V03) | FIXED | V03 §5.2 (l. 2488) reads "so a building never decayed and under no disaster look (§6.3 *Plan damage*) exports byte-identically". The second ends are all written: T-V3-39 (g); V11 l. 3828 and l. 4650; T123-7 (l. 18829–18831); V12 l. 903–906, 934 and 1747–1748. V03 §5.2's JSON-block sentence ("a never-decayed building's block is unchanged") stands by R6-07, since the block carries no look. |

All five round-5 ids are closed. Below are the defects that round 6's text newly makes or exposes in this chain, under
fresh ids. Peers' ids already cover the rest.

## Shared subjects the matrix does not list, judged

The canon's matrix (`agreement.json`) predates this round's names, and none of these subjects appears in it. Each was
judged across the members:

| subject | home | members stating it | verdict |
|---|---|---|---|
| §2.7's crossing table — *beneath*'s `vault` span read `open`, no gate or tower in an under-deck strip, every gate on ground part 0 | model §2.7 (6) (d) | pipeline §4.1, §4.3, §4.4, §4.8, §4.11, §4.13, II.7.6; V01 §2.3, §3.6 (5), §3.17.3 (2)–(3), (6); V11 §3.24.2, W50, row 80 | agree (pipeline's restatements are R6-02's END texts and match the outcomes; §4.13's rung is VAL-R6-07's) |
| §2.7's way-and-channel table, rows (a)–(e) | model §2.7 (6) (a)–(b) | pipeline §4.3, §4.4 S5b, S5c, §4.8, §4.11, §4.13; V01 §3.17.3 (3); V11 l. 3962 | outcomes agree; row (a)'s test cell does not name V01's test (**VAF-R6T-02**), and no bar runs its castle-path member (**VAF-R6T-03**) |
| the remap-filled calamity carried with no epoch event | V08 §2.7, §3.6 (2) | V01 §3.16 (2), §3.18, T-V1-60 (d), J-V1.104 | agree |
| the current week, the greatest folded week | pipeline §4.11 *The clock* (1) | model §2.9; §4.11 item 9; J-A67.45 (index and rationale) | agree |
| V06's restorations and `decayPeak` before E2 (X36's stand-in: "nothing repaired") | V06 §3.23 (3), V06 §8's E2 | V02 §8.6, X36; V03 T-V3-39 and §8's P4 cell; §13.8's T123 row | **disagree** at T-V3-39 (c) (**VAF-R6T-01**); T-V3-40 (b)'s hand-over is VAT6-r6-04's |
| `StyleSheet.groups` (`pins`, `trees`) | rendering §8.2 | model §2.1; pipeline §4.9; V01 §3.18 (c), §4.2, §5.1.3, T-V1-56 (c) | agree (V01 §5.1.3's "view bar" is VAT6-r6-03's) |
| item 244's span rule and a span's `use` | model §2.7 (*The span rule*) | V01 §1.2's hook row; V04 §3.5.4 (d); V11 §3.24.2 | V01's hook row names V04 §3.5.4 as the rule's home (**VAF-R6T-04**) |

## Issues (4: 0 blockers, 1 major, 3 minor)

### VAF-R6T-01 — minor — DISAGREE — owner V03

**Claim.** T-V3-39 (c) runs before its provider lands. The clause covers restoration: "a restoration from level 1 to 0
removes the damage in reverse threshold order …; a restoration with no Works removes it at once, every patch drawn; a
roof bay the roofless state opened is patched once the wing is roofed; an element a restoring re-cut or a later `extend`
adds is drawn as built … (V06 §3.23 (3))". It runs on the damage fixtures' "one restored with patches" (V03 §7,
l. 2849). Its timing cell (V03 l. 2906) runs every clause "from P4", apart from (e)'s and (h)'s exports and the scrub,
saying only "before M6-E the levels at V11's default age". V03 §8's P4 cell (l. 2943) runs "T-V3-39 but (e) and (h)'s
exports".

Restoration and the per-element peak come from V06 §3.23 (3), which V06's E2 builds (V06 §8, l. 4230: "the decay level
(item 123 (b), V06 §3.23: `decayLevel`, `decayPeak`, restoration …)"). Until E2 lands, V02's X36 (l. 4198) is the
stand-in, and it reads "the level from the existence state at V11's default age, nothing repaired". §13.8's T123 row
(l. 19491) likewise lands "T123-4's epoch clause with M6-E". Round 6 scheduled V02's twin clauses — T-V2-59's restoration
in reverse threshold order, its patches and the manor's `extend` — "at the later of M6b and V06's E2 … since until E2
lands V02 reads X36's stand-in — nothing repaired" (V02 §8.6, l. 3897–3904; R6-09). V03 reads the same V06 functions
(V03 l. 196–197), but its clause stays at P4.

M6-P's rest and M6-E run on separate tracks (INDEX l. 81–85, 103–105), so P4 may exit before E2. At that point (c)
cannot pass: a restored building reads level 0 and draws no patch. This is R6-09's class (VV12-r5-02, VV34-r5-01).
Nothing built changes.

**Required change.**
* T-V3-39's timing cell: "its scrub across the run at the later of P4 and V06's E6 (V06 §3.15.2's frames)" → "its
  scrub across the run at the later of P4 and V06's E6 (V06 §3.15.2's frames); (c) at the later of P4 and V06's E2
  (V06 §3.23 (3)'s restorations and `decayPeak`, which E2 builds; until then nothing is repaired, V02 §8.6)".
* V03 §8's P4 tests cell: "T-V3-39 but (e) and (h)'s exports, its scrub across the run at the later of P4 and V06's E6"
  → "T-V3-39 but (e) and (h)'s exports, its scrub across the run at the later of P4 and V06's E6 and its (c) at the
  later of P4 and V06's E2".

### VAF-R6T-02 — minor — DISAGREE — owner model

**Claim.** The way-and-channel table's row (a) (base l. 2582) lists "a stage-2 seed's way" among its subjects. Its ladder
cell names "V01 §3.17.3 (3)'s F-TEMPLATE rungs and §4.6's lane ladder", but its test cell is "T110-2 (3), (5); T-V7-48".
Neither T110-2 clause lays a stage-2 seed: (3) runs S7's intervallum, and (5) runs a quay, an S5b road and an S5c
street. The test that runs a stage-2 seed is V01's T-V1-51 (c) (V01 l. 3352), "every ground crossing of a strip
through an `open` span (a `vault` span under a wall read `open`, §2.7's crossing table, *beneath*) meeting §4.3's
crossing rule", on its named `wallside` fixture. Round-6 note (6) (b) (i) asks each cell to name a test that runs it.
The cell names V07's tracker test but not V01's seed test. Nothing built changes.

**Required change.** §2.7's way-and-channel table, row (a)'s test cell: "T110-2 (3), (5); T-V7-48" → "T110-2 (3), (5);
T-V1-51 (c); T-V7-48".

### VAF-R6T-03 — major — EDGE-UNTESTED — owner scope

**Claim.** Row (a) of the way-and-channel table (base l. 2582) rules "S7's quay, intervallum or castle path": each
"crosses the under-deck strip only by the crossing rule", and on failure ends "at the strip as at a reservation". §4.8's
lead (l. 7692) restates this for "a quay, the intervallum or a castle path", §4.3 (l. 5749) for "S7's quays,
intervallum and castle paths", and V11 row 80 lists the castle paths among `clearWidthM`'s readers. The row's test cell
is "T110-2 (3), (5)". T110-2 (3) (l. 18562–18563) runs the intervallum, and (5) (l. 18586–18587) runs a quay. No clause
in the set runs a castle path, meaning §4.8's internal paths (keep ↔ gatehouse ↔ wall stairs, l. 7762), crossing or
ending at an under-deck strip. A search of the base and the volumes for "castle path" or "internal path" finds only the
rule sites.

The case is reachable on a common path. An aqueduct crosses a castle's bailey *over the band*, and S7 lays the internal
paths after it: at generation where the S6 aqueduct crosses the bailey, and at every Regenerate (keep) of a document with
a declared aqueduct there. A build that lays a castle path along the strip, or through a support ring, passes every bar.
Under principle (11) and R6-01's grading, a defined edge that no bar runs is MAJOR.

**Required change.** §13.2's T110-2 (3), after "… no ramp, stair or foot in the band or the channel, the stage's `N_k`
gates on ground part 0;" (the clause's end, before "(4) *beneath* by hand"), add: "and a CITY fixture holding a declared
masonry aqueduct across a corner of a castle's bailey (*over the band*), regenerated (keep), so that S7 lays the castle's
internal paths (keep ↔ gatehouse ↔ wall stairs, §4.8) after it: each path crossing the under-deck strip under a span §4.3
admits or ending at the strip as at a reservation, 0 path corridors over a support ring, ramp, stair, foot or `vault`
span's strip (§2.7's way-and-channel table, row a);".

### VAF-R6T-04 — minor — DISAGREE — owner V01

**Claim.** V01 §1.2's hook row (l. 205) reads "| V04 §3.5.4 (item 244's span rule) | a raised part's spans with their
`use` (`open`, `vault`) | crossings through `open` spans only (V01 §3.17.3) |". The span rule's home is the base's §2.7
(l. 2729, "**The span rule**, run eagerly at the end of the raised way's generation …"). V04 §3.5.4 (d) (V04 l. 1689–1690)
is a reader of it: "The base fixes each span's `use` eagerly by §2.7's span rule (item 244)". This round makes the home
matter more. A span's `use` is now read together with §2.7's crossing table (a `vault` span under a wall is read `open`;
the span rule "never reads a wall", l. 2644–2645), and V01 §3.17.3 (3) cites §2.7 for that reading, while the hook row still
sends a builder to V04. The repair left the row as it stands, since it cites V01 §3.17.3 for its use. Its provider column
is the mis-citation. Nothing built changes.

**Required change.** V01 §1.2's row: "V04 §3.5.4 (item 244's span rule)" → "§2.7's span rule (item 244; a `vault` span
under a wall read `open`, §2.7's crossing table, *beneath*)", the other two cells as they stand.
