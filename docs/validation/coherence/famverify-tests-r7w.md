# Family verify — tests, fixtures and milestones, after the second fix pass (coherence/famverify-tests-r7w)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/famverify-tests-r7w, 2026-10-02; covered by
> the whole-design retrovalidation (J84). One of the six family-focused checks of round 7, run on the live design after
> the second family fix pass (assemble-r7w). Its family is raised ways (viaducts, elevated roads, aqueducts, their arch
> vaults) meeting walls of every kind. Its lens is the tests the family's cells and sentences name, the fixtures they run
> on, and the milestones that schedule them. Grading is J141's as the owner applies it in J146 and J151. A finding is
> MAJOR only where the laws (or the design text written from them) give a case no lawful outcome, give an outcome
> breaking an owner rule or a law-1 invariant, leave a law-1 invariant checked by no bar, or make a check or a named test
> fail a correct build. A case whose every outcome is lawful is a minor VALID CHOICE. Nothing J150 hands to round 8 is
> reported: the two-axis lock and its readers outside the family, and a lock's behaviour under an undo, a redo, a
> re-grade or value edit within a standing meeting, or a repair. No design text was changed, and no state-changing git
> command was run.

PROGRESS (lane `coherence/famverify-tests-r7w`, 2026-10-02, cloud checkout)
- [x] P0 resume check: no report and no CHECKPOINT of this seat, so a fresh start
- [x] P1 read whole:
  - the brief;
  - `adjudication-r7.md`: Part L (terms, laws 1–4, the check, the seven corrections, the restated veto list) and R7-06;
  - `adjudication-r7v.md` and `adjudication-r7w.md`: their decisions, the class ruling S0–S11 and C1–C14, Part H by
    unit, the builders' choices and the held lists;
  - `famverify-tests-r7v.md` (8 findings);
  - `assemble-r7w.md`, with its section 8 notes;
  - PROGRESS J144 (the owner's RULE and the program's reading, with (G1)–(G3)) as the brief restates J144 – J151.
- [x] P2 the live text of the lens (base `docs/ARCHITECTURE.md` unless a volume is named):
  - §2.7's laws (l. 2579–2891), the worked examples and both tables (l. 2893–3357), and the support step's (7) (l. 3359–3383);
  - §4.2 S3 (7) (l. 6227) and §4.4 S5a *Trace* (2) and *Outer moats* (l. 6602–6603, 6633–6638);
  - §5.2's F-WALL row (l. 9855), §5.3's law-1, gate and distance rows (l. 9943, 9953–9954), and §7.1's
    `bend.wall.raisedCrossing` row (l. 11343);
  - §8.11's T-ER-12 (l. 15489) and §11.6 (no family row beyond T-ER-19);
  - §13.2: T101-4 (l. 19129–19133), T110-1 – T110-4 with the class rule and the state sweep (l. 19215–19651), and T114-3
    (l. 19688–19695);
  - the take-over row (l. 19897), §13.8's T110 and T114 rows (l. 20478, 20489), §16's M2a and M3a, and INDEX §5 risk 2;
  - V01 T-V1-51 (V01 l. 3358);
  - V04 T-V4-62, -63, -80, -82 and §8's U3 and U5 cells (V04 l. 3163–3164, 3181, 3183, 3215, 3218);
  - V05 T-V5-14 (V05 l. 2517–2575);
  - V06: H-AQUA, §7's take-over rows, T-V6-11, -47, -48, -61, -64, -73, and §8's E3, E5 and E8 cells (V06 l. 4110–4130,
    4172–4173, 4193, 4229–4230, 4243, 4246, 4255, 4290–4295); V06 §3.1 *Protection*, §3.2's phase order and the
    `absorbWall` op (V06 l. 978–981, 1006–1008, 717);
  - V07 T-V7-32, -48, -51 (V07 l. 3694, 3710, 3713);
  - V09 T-V9-52, -58, -61 (V09 l. 4428, 4434, 4437);
  - V10 T-V10-40 – -42 (V10 l. 3155–3157).
- [x] P3 the eight round-7v findings of this lens re-checked against the live text (Part 1)
- [x] P4 the laws attacked through the lens (Part 2), covering:
  - every new clause of the second fix pass (S0 – S11, V4-1, V6-1, V6-6 – V6-8, V7-1, V7-3, V9-4, V10-1) against a
    correct build;
  - every cell's named test and fixture;
  - every new clause's milestone and provider;
  - the new pipeline and hand outcomes of P3 – P5, D4 and D6 against the bars;
  - law 1's invariants against §5.3's row and T110-4.
- [x] P5 report, result file, LANDED

## Part 1 — the round-7v findings of this lens, re-checked against the live text

| id | sev | ruled (adjudication-r7w) | verdict | evidence (live text) |
|---|---|---|---|---|
| VF7-TST-01 | major | FIX (S1) | **fixed** | T110-2 (4) (l. 19413–19418) now reads "one across a viaduct's ramp nearer the first point beyond its foot than the deck's first lawful crossing, each measured along the deck line (§2.7's laws, law 3) — bent beyond its foot …, and, on a second run, one across that ramp nearer the deck's first lawful crossing than the first point beyond its foot — bent to that crossing, under the deck's first span or at a support clear of the ramp". Each run is now placed by law 3's own measure, and the second no longer pins the span form. T-V7-48's half was fixed in round 7v (V07 l. 3710). |
| VF7v-TST-01 | major | FIX (S2) | **fixed** | T110-2 (1) (l. 19322–19326) now reads "its course bent to the nearest crossing law 3 picks in a form its level there gives — over, under a span that clears the wall's top, or merged, where its channel runs within the wall's height —, with `bend.wall.aqueductArch` in that form". |
| VF7v-TST-02 | major | FIX (S3) | **fixed** | T110-2 (8) (l. 19595–19598) now reads "a hand `delete` of the intervallum leaving the span read `open` while the ring road lies across its strip, and a hand `delete` of the ring road then laying the chamber again with its id". That is law 1 (8). S8 holes plots round every under-deck strip ((c), l. 2919), so the freed corridor keeps nothing across. |
| VF7v-TST-03 | major | FIX (S4) | **fixed** | T110-2 (6) (l. 19563–19567): "no gate for that way where the boundary crosses its ground course nor at any point of that way within the pull's search band, where law 2 (a) would move it (§4.4 S5a *Trace* (2))". This agrees with §4.2 S3 (7) as P4 wrote it (l. 6227: "its gate, where law 1 (4) or (5) bars it there, moved along the way within (9)'s search band …, and only where §2.7's laws give it no lawful gate so, the way re-routed"). |
| VF7-TST-11 | minor | FIX (S5) | **fixed** | T110-4 (c) (l. 19619–19620): "and a village rung holding a declared viaduct and aqueduct, one of them placement-locked". W1·C8 (l. 3340) now names a test that holds its case. |
| VF7v-TST-04 | minor | FIX (V6-6) | **fixed** | V06 §8's E3 cell (V06 l. 4290): "and T-V6-47's epoch `shiftCourse` clause (T110-2 (4)'s), at E5, which builds the hazards and the terrain candidates". Its E5 cell (V06 l. 4292): "T-V6-47's epoch `shiftCourse` clause". |
| VF7v-TST-05 | minor | FIX (S6, V6-7) | **fixed** | Each list now names (1)'s two foundings across a hand-drawn, placement-locked ring and retaining wall, and (2)'s epoch route through a standing gate and its epoch walled stage's spawned primary. The lists are the runs sentence (l. 19647–19651), the take-over row (l. 19897), V06 §7's founding row (V06 l. 4173) and T-V6-73's head (V06 l. 4255). §13.8's T110 row (l. 20478) adds "(2)'s epoch route and walled stage" to the clauses that move to M4 and the epoch engine. |
| VF7v-TST-06 | minor | FIX (S7, V4-1) | **fixed** | The seed condition (no way, square or channel, an intervallum among them, across that span's strip while the wall stands over it) now stands at all three sites: T110-2 (4) (l. 19445–19448), T-V4-63 (V04 l. 3164) and T-V4-80 (i) (V04 l. 3181). |

The other second-pass clauses of the lens were each read against a correct build, and each holds:
- **The class rule (S0)** is at T110-2's lead (l. 19256–19263).
- **S9 and V6-1** are T110-2 (1) (l. 19307–19311) and T-V6-73 (V06 l. 4255). V06 §3.2 runs `fortification` (phase 9)
  before `raisedWays` (10a), and V06 §3.1 *Protection* excludes a locked ring from every candidate list. So the scripted
  lock keeps the breach, as the clause needs.
- **S10** is T110-2 (4) (l. 19406–19409). The refusal names the `drawWall` whether §7.4 *Independence*'s touched sets or
  law 4's dependence triggers it. `undo(h, of)` with the independence check lands at M2a (§16), before M3a.
- **C1 – C5 and C7 – C9**, **C11 – C14**, **V7-1** and **V10-1** hold their cases.
- **The new clauses' milestones**: T110-4 (a)'s T-V6-48 variant at E3, T110-4 (c)'s village rung at V-M3, and T-V4-63's
  epoch clauses at E8 (V04 U5's cell). Each is scheduled at or after its provider (§13.8, l. 20478; INDEX §5 risk 2).

## Part 2 — findings

Severity counts: **1 major, 4 minor, 0 blocker**, all new.

Law 1's invariants are each checked:
- §5.3's law-1 row cites clauses (1)–(11) whole (l. 9943).
- T110-4 runs that row after every commit, on every path and lock axis (l. 19606–19641).

No test or cell of the lens cites a law, clause, term, row or cell that does not exist. This is assemble-r7w's resolver
result, confirmed for the lens by reading.

### VF7w-TST-01 — major — TWO-READINGS — owner pipeline

**Claim.** The second fix pass (P2) widened §4.4 S5a *Trace* (2)'s one list of the pull's impassables (l. 6602). Every
pull, cost field and reader of them cites that list: V06 §3.7.4 (2)'s cost field, *beneath* (l. 3076–3080), and a hand
`contractWall`, which is S5a's trace step. The list now ends:

> "every held building's strip and a shape-locked raised way's `vault`-use spans' strips, each widened all round by the
> wall strips' width there (law 1 (10): no line, band or wall strip across one)"

**"A held building's strip" is already widened by its definition.** It is "the strip of a `vault` span whose chamber
seats a held building …, widened all round by the meeting wall's strips' width" (§2.7's laws' terms, l. 2642–2643). Law 1
(9) keeps the line alone out of it: "no wall's line lies newly in the held building's strip" (l. 2736–2738). *Line and
band* reads it so: "a held building's widened strip and the bent group's strip each count the band's half already, so a
line is kept out of them as they are drawn" (l. 3073–3074).

**The text can be read two ways:**
- "each" reads naturally over both items, so the held building's strip is widened a second time, to the span's strip
  plus twice the wall strips' width.
- Read with the definition, the widening falls only on the `vault`-use spans' strips. This was the pipeline seat's
  intent: its note says "never twice" (assemble-r7w §8). The design text does not say so.

**The two builds diverge where it matters.**
- The doubled list keeps law 1, being stricter. But it excludes every line lying between one and two wall-strip widths
  of the held span, and law 1 admits those lines.
- A pull searches "only shapes law 1 admits, its own cost choosing among them" (law 2 (a), l. 2812–2813). So a hand
  `contractWall` can differ: F-WALL's hand clause holds it to "its own pull, within its own search band" of 40 m, "its
  band never widened" (l. 9855).
- Near a held building in an arch vault, the wall strips' width (band half plus glacis) is of the order of 15–30 m, so
  the second width moves the nearest admitted line beyond the band. The doubled build then refuses
  `refuse.raised.meeting`, where the single build bends the line to a lawful crossing a span away.
- An epoch contraction or re-anchored stretch reads the same list. It waits (`walls.waited`) where the single build lays
  it.
- F-WALL's generation rung is unaffected, since it re-pulls "with the exclusions of §2.7's laws' law 1" (l. 9855).

**Why the doubled build's outcome breaks the owner's rule.** The aqueduct and the wall are similar structures. The owner's
J144 RULE is "where two such structures meet, their shapes change to make the meeting coherent". The program's (G3) gives
way only "where no local shape makes the meeting coherent" (PROGRESS J144, the program's reading, J122). Refusing or
waiting while a lawful local shape exists is the outcome Part P pass 8 ruled against J144 as the program reads it
(PRB7H-GEN-04 (i)). Adjudication-r7w regraded VF7v-GEN-03 major on that ground.

**It can also fail a named test.** T110-2 (4)'s held-building run asserts "the circuit crossing the deck line clear of that
span's strip at the aqueduct's level … no band or wall strip of a crossing at the neighbouring span over its span's strip"
(l. 19451–19455). The same holds for T-V4-80 (i) (V04 l. 3181). A doubled build that finds no crossing inside its reach
waits instead.

So not every outcome keeps the owner rules and every named test, and the case is no valid choice (J151): it is major. The
fix is one phrase.

**Required change.** §4.4 S5a *Trace* (2) (l. 6602): "every held building's strip and a shape-locked raised way's
`vault`-use spans' strips, each widened all round by the wall strips' width there (law 1 (10): no line, band or wall
strip across one)" → "every held building's strip, already so widened by its definition (law 1 (9)), and a shape-locked
raised way's `vault`-use spans' strips, these widened all round by the wall strips' width there (law 1 (10): no line,
band or wall strip across one)".

### VF7w-TST-02 — minor — TEST-GAP — owner scope

**Claim.** The second fix pass repaired three pipeline outcomes it regraded major. Each old outcome was one Part P pass 8
ruled against J144 or J147 (1) as the program reads them. The pass also defined two new hand outcomes, and the first pass
picked a sixth behaviour. No family bar runs any of these six, so a build of the old text passes every bar:

| | site and the behaviour now written | why no bar distinguishes it |
|---|---|---|
| (a) | §4.4 S5a *Trace* (2)'s pin rule (l. 6603; P3, VF7v-GEN-03): "one whose crossing falls on a ramp, stair or foot, or nearer its foot than the first point beyond the foot, pins its gate …", and a pin "whose band or wall strips there would lie over a raised way's ends (law 1 (4)), moves along its arterial until both are clear". | T110-2 (3) runs only a boundary that "falls on an S4 viaduct's ramp" (l. 19363–19365). The old build leaves such a stage unwalled through F-WALL's rung. |
| (b) | §4.2 S3 (7) (l. 6227; P4, VF7v-GEN-04): a carried way's gate barred at the crossing "moved along the way within (9)'s search band …, and only where §2.7's laws give it no lawful gate so, the way re-routed". | T110-2 (6)'s runs (l. 19558–19567) give a lawful gate at the crossing (first run) or none anywhere in the band (third run). A re-route-first build gives the same outcome on both seeds. |
| (c) | §4.4 S5a *Outer moats* (l. 6633–6638; P5, VF7v-GEN-06): "a carried way decked at its gate as at stage 1". | Every carried-way run is at stage 1 ("the stage-1 boundary crosses the raised road's ground course", l. 19560). A build that cuts the way by §4.11's way rule at a stage-k outer moat passes. |
| (d) | §4.2 S3 (7)'s trigger for a gate route "nearer its foot than the first point beyond the foot" (l. 6227; VF7-GEN-05's pick). | T110-2 (2) runs only a first point "on its priced deck" (l. 19332–19334). |
| (e) | §5.2's F-WALL hand clause (l. 9855; D4, M7): a hand `contractWall` "refused `refuse.raised.meeting` once its own pull, within its own search band, finds no lawful shape, its band never widened". | T110-2 (4) runs a hand `contractWall` only over the sweep, with no refusal (l. 19433). No fixture puts the only lawful crossing beyond the band but within `wall.barrierReachM`, where a widening build succeeds. |
| (f) | §7.1's `bend.wall.raisedCrossing` row (l. 11343; D6) and V09 §4.9's line (V9-1): "a castle sited or resized by hand (`setAttr(castle, 'site' \| 'baileyArea')`) whose claim §2.7's laws bar there", its claim "moved whole to the nearest lawful site …, measured back along the drag". | T110-2 (3)'s castles are sited only at generation and at a regeneration (l. 19375–19380). |

Each wrong build keeps law 1: it gives way, re-routes, cuts a Tier-3 way or widens a search. So §5.3's row and T110-4
pass it. J141 alone would make "a defined edge that no bar runs, so that a wrong build passes every bar" major. J146 and
J151 narrow the family's majors to a law-1 invariant checked by no bar, so each item is minor here.

**Required change** (§13.2; each insertion keeps every other word):
1. T110-2 (2) (l. 19334): after "the gate on ground part 0 and S4 committing the re-solved route" insert ", and the same on
   a variant whose route's first point at `T = t_1` lies past its deck's foot but nearer it than the first point beyond
   the foot (§4.2 S3 (7); §2.7's laws' terms)".
2. T110-2 (3) (l. 19365), in "the stage's `N_k` gates on ground part 0; a variant whose picked boundary crosses that
   deck", after "on ground part 0;" insert " the same on a variant whose boundary crosses that arterial past the ramp's
   foot but nearer it than the first point beyond the foot and, on a second run, where its pin's band or wall strips
   would lie over the ramp, stair or foot of a second S4 viaduct — the pin moved to the first point beyond the foot, or
   along its arterial until its band and wall strips are clear, the trace laid through it and the stage walled with its
   `N_k` gates on ground part 0 (§4.4 S5a *Trace* (2); §2.7's laws, law 1 (4), law 2 (a));".
3. T110-2 (3) (l. 19380): after "no weld vertex or gate moved after siting (§2.7's laws, law 1 (5), (6), law 2 (a));"
   insert " and on that fixture a castle sited by hand (`setAttr(castle, 'site')`) so that a weld vertex of its claim
   falls in that strip — the claim moved whole to the nearest lawful site, measured back along the drag, with
   `bend.wall.raisedCrossing`'s castle line, and, on a second run with no lawful site within the drag's reach, refused
   `refuse.raised.meeting` (§2.7's laws, law 1 (6), law 2 (a), (c), law 3; its worked example the fixed-place
   sentence);".
4. T110-2 (4) (l. 19494): after the table-edit variant's "nothing of either written (§2.7's laws, law 1 (2), (4), law 2
   (c));" insert " on a variant whose only lawful crossing of the standing aqueduct by a hand `contractWall` of the ring
   lies beyond the pull's search band but within `wall.barrierReachM`, that `contractWall` refused
   `refuse.raised.meeting`, its search band never widened (§5.2's F-WALL row; §2.7's laws, law 2 (a), (c));".
5. T110-2 (6) (l. 19567): before "; and (3)'s table-edit variant regenerated" insert "; on a fourth run whose seed is
   searched so that §2.7's laws bar that way's gate where the stage-1 boundary crosses its ground course (law 1 (4) or
   (5)) but admit one at a point of that way within the pull's search band, the gate moved along the way to the nearest
   such point and the trace pulled through it, the way not re-routed (§4.2 S3 (7); §2.7's laws, law 2 (a)); and on a
   fifth whose seed is searched so that a stage-2 boundary with a wet outer moat crosses the raised road's ground course
   beyond its foot, the way's gate a lawful pin of S5a and the way kept across the outer moat on a deck at that gate,
   never cut (§4.4 S5a *Outer moats*; §2.7's laws, law 2 *Carried way*)".

### VF7w-TST-03 — minor — FIXTURE — owner scope

**Claim.** This is a residue of the class ruling's C6, at T110-2 (6)'s New random runs (l. 19533–19540):
- "its seed searched so that the new ring's boundary meets one of the aqueduct's supports where its channel runs above
  the ring's top — the trace crossing the deck line under a span, never at a support, …, no standing support in the band
  and every span over it clearing the ring's top";
- "and on (1)'s variant the crossing merged wherever the boundary meets the deck line where its channel runs within the
  ring's height".

The seed fixes the aqueduct's level only where the boundary, S3 (6)'s pick, meets the deck line. The trace is S3 (9)'s
pull, and its crossing is its own cost's within a 40 m search band (law 2 (a); §4.4 S5a *Trace* (2)). Along that band the
channel may come within the ring's height, where a merged crossing at a support is lawful (law 1 (2)). A correct build
can then cross "at a support" where the clause says never. On the merged variant, it can cross over where the clause says
merged.

The class ruling fixed the same pin at T110-2 (4) (C5: "wherever the circuit's search band and the strokes' reach meet
the aqueduct"), but C6 fixed only the support's level. S0 makes the bar assert the laws' outcome where its words differ
(l. 19256–19263). So no correct build fails, and this is a case the fixture may not hold: minor.

**Required change.** T110-2 (6) (l. 19533–19540):
- "its seed searched so that the new ring's boundary meets one of the aqueduct's supports where its channel runs above
  the ring's top —" → "its seed searched so that the new ring's boundary meets one of the aqueduct's supports and its
  channel runs above the ring's top wherever S3's pull's search band meets the aqueduct —";
- "and on (1)'s variant the crossing merged wherever the boundary meets the deck line where its channel runs within the
  ring's height" → "and on (1)'s variant, its channel within the ring's height wherever that search band meets the
  aqueduct, the crossing merged wherever the trace crosses the deck line".

### VF7w-TST-04 — minor — FIXTURE — owner V04

**Claim.** This is a twin of the class ruling's C2 and C10, at T-V4-63 (V04 l. 3164): "on a CITY fixture whose viaduct
holds a `vault` span with its arch vault, passed beneath by an epoch circuit and, on a second run, by a hand `drawWall` …
— that arch vault removed with its door, links and accesses in the wall's commit …, and the hand wall's delete laying it
again with the same id …, the circuit's case run again with that `vault` span breached with its chamber first … and that
vault removed in the circuit's commit".

An epoch circuit's crossing is its cost field's own (law 2 (a)). Nothing in the fixture puts the circuit's band or wall
strips over that span's strip. The class ruling found the same pin at two sites:
- T110-2 (4) (C2: "the fixture does not say its seed puts it there");
- T-V4-80 (i) (C10), fixed as "its seed searched so that the circuit's line crosses the deck line under that span".

Its sweep read T-V4-63's other clauses as holding and passed over this one. S0 governs, so this is a minor.

**Required change.** V04 T-V4-63 (V04 l. 3164): "passed beneath by an epoch circuit and, on a second run, by a hand
`drawWall`" → "passed beneath by an epoch circuit (its seed searched so that the circuit's line crosses the deck line under
that span; §2.7's laws, law 2 (a)) and, on a second run, by a hand `drawWall`".

### VF7w-TST-05 — minor — CELL-TEST — owner model (with scope and V07)

**Claim.** Five of the crossing table's cells name a test that does not hold their case, or leave one of their row's
paths with no test:

| cell | the gap | evidence |
|---|---|---|
| **W4·C2** (l. 3343) | Names "T114-3" beside T110-2 (4) (H) and T-V6-11 (E). T114-3 runs decay through `worn` to `breached` (row W5) and the landfall (row W12), never a `DeclineOp` `breach` or `dismantle`. | l. 19688–19695 |
| **W1·C1** (l. 3340) | Names "T110-2 (1), (2)", and neither runs W1's village path, a raised way created across VS3's palisade. T-V7-48 holds it but is not named. | T-V7-48: "a hand aqueduct drawn across the standing palisade …", "a hand raised road drawn across the standing palisade brought down before it" (V07 l. 3710) |
| **W5·C2** (l. 3344) | Its village path, V07 §3.4 (8)'s decay of a palisade under a declared raised way, is named by no test. T-V7-48's decay clause runs only "the palisade's run beneath the carried-down deck", which is column C9. | V07 l. 3710 |
| **W6·C2** (l. 3345, "· T-V6-47") | No bar runs the hand path, a hand `convert` `gateToJunction`, on a town ring. T-V6-47 runs the epoch pathway. | T110-2 (4)'s hand rows run W1, W4, W5, W10, W11, W13 and W14 by hand (l. 19425–19437); T-V6-47 (V06 l. 4229); T-V7-48 runs it only on a palisade (C9). |
| **W8·C2** (l. 3347, "· T-V6-11") | No bar runs the hand path, a hand `convert` `absorbWall`, on a town ring. T-V6-11 runs an absorb whose fate a hand `setAttr` set (the epoch path). | T-V6-11 (V06 l. 4193); T-V7-48 runs it only on a palisade (C9). |

Each outcome is an *unchanged meeting*, the same by construction. R7-01's grading makes a cell that misnames or omits
such a case a minor, and T110-4 (c)'s random hand ops check law 1 for each.

**Required change.**
- W4·C2: "*unchanged meeting* · T110-2 (4) (H), T114-3, T-V6-11 (E)" → "*unchanged meeting* · T110-2 (4) (H), T-V6-11
  (E)".
- W1·C1: "a shape-locked one never merged into (law 1 (10)) · T110-2 (1), (2) |" → "a shape-locked one never merged into
  (law 1 (10)) · T110-2 (1), (2), T-V7-48 (V) |".
- W5·C2: "*unchanged meeting* · T114-3, T-V6-73, T110-2 (4) (H) |" → "*unchanged meeting* · T114-3, T-V6-73, T110-2 (4)
  (H), T-V7-48's decay clause (V) |".
- V07 T-V7-48 (V07 l. 3710): "of the palisade's run beneath the carried-down deck" → "of the palisade's run beneath the
  carried-down deck and, on a second run, beneath the declared viaduct".
- W6·C2: "read across the span's strip by law 1 (8) · T-V6-47 |" → "read across the span's strip by law 1 (8) · T-V6-47,
  T110-2 (4) (H) |".
- W8·C2: "or in `absorbWall`'s own where none is left · T-V6-11 |" → "or in `absorbWall`'s own where none is left ·
  T-V6-11, T110-2 (4) (H) |".
- §13.2 T110-2 (4) (l. 19428–19429): "a hand `delete` of the run (W11), a hand `placeGate` inside the under-deck strip" →
  "a hand `delete` of the run (W11), a hand `convert` `gateToJunction` of a gate of that run beside the raised way (W6)
  and a hand `convert` `absorbWall` of its ring (W8), a hand `placeGate` inside the under-deck strip".

## Part 3 — held for round 8 (outside the family, not graded)

Three notes outside the family persist unchanged. Each is already on adjudication-r7w's held list, items 8–10:
- **V09 T-V9-52** (V09 l. 4428): "a road drawn across a viaduct crosses under its nearest `open` span … with
  `bend.raised.underSpan`". Row (b) moves the road to the nearest span §4.3's crossing rule admits. The meeting is a raised
  way with a ground way, with no wall.
- **V07 §3.12 item 7 and T-V7-51** (V07 l. 2627, 3713): "crosses the hand-off up held" means carried unchanged. §2.7's
  *held* now means locked. This is a rung hand-off, with no wall meeting.
- **Base T110-2 (6)** (l. 19532): "that route re-solved to cross under the nearest span the rule admits" pins a place
  that a route solve's own cost chooses. The meeting is a raised way with a ground way, with no wall.

## Verdict for this lens

**The second fix pass closed every round-7v finding of this lens:**
- the four majors: T110-2 (4)'s ramp runs, (1)'s low-channel aqueduct, (8)'s ring-road re-lay and (6)'s carried-way seed;
- the four minors: T110-4 (c)'s village rung, V06 §8's `shiftCourse` schedule, the founding take-overs, and the three
  chamber re-lays' seed condition.

The class rule S0 now stands at T110-2's lead. Its fourteen class members and every other new clause hold their cases on
their fixtures, and each is scheduled at or after its provider. Law 1's invariants are all checked, by §5.3's row and by
T110-4.

**One major remains, and it lies in the text the fixtures read rather than in a bar.** P2's widened list at §4.4 S5a
*Trace* (2) widens "each" of a held building's strip and a shape-locked raised way's spans' strips. A held building's
strip is already widened by its definition. Read naturally, the list widens it twice. A build of that reading refuses a
hand `contractWall`, or waits an epoch contraction, where law 2 (a) gives a lawful local crossing. That breaks J144 as the
program reads it, and it can fail T110-2 (4)'s held-building run. The fix is one phrase.

**The four minors:**
- The second pass's repaired pipeline and hand outcomes are run by no bar (a build of the old text passes every bar).
- C6 leaves a residue at T110-2 (6).
- T-V4-63 has a twin of C2 and C10.
- Five crossing-table cells misname or omit a test.

None of the fixes changes a law.
