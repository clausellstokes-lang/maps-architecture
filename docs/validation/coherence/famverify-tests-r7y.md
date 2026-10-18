# Family verify — tests, fixtures and milestones, after the fourth fix pass (coherence/famverify-tests-r7y)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/famverify-tests-r7y, 2026-10-02; covered by
> the whole-design retrovalidation (J84). One of the six family-focused checks of round 7, run on the live design after
> the fourth family fix pass (assemble-r7y, HEAD 61a493b). Its family is raised ways (viaducts, elevated roads,
> aqueducts, their arch vaults) meeting walls of every kind. Its lens is the tests the family's cells and sentences name,
> the fixtures they run on, and the milestones that schedule them. Grading is J141's as the owner applies it in J146 and
> J151: a finding is MAJOR only where the laws (or the design text written from them) give a case no lawful outcome,
> give an outcome breaking an owner rule or a law-1 invariant, leave a law-1 invariant checked by no bar, or make a check
> or a named test fail a correct build; a case whose every outcome is lawful is a minor VALID CHOICE. Nothing J150 hands
> to round 8 is reported (the two-axis lock and its readers outside the family; a lock's behaviour under an undo, a redo,
> a re-grade or value edit within a standing meeting, or a repair). No design text was changed, and no state-changing
> git command was run.

PROGRESS (lane `coherence/famverify-tests-r7y`, 2026-10-02, cloud checkout)
- [x] P0 resume check: no report and no CHECKPOINT of this seat, so a fresh start
- [x] P1 read whole: the brief; `adjudication-r7.md` Part L (terms, laws 1–4, the check) and Part P pass 8's rows
  (PRB7H-LCK-01 – -05); `adjudication-r7y.md` whole (24 decisions, class (A)'s form F6, class (B)'s B1 – B17, Part H by
  unit, one listed choice, 14 held notes); `adjudication-r7x.md`'s root cause (F1 – F5) and its scope and V-unit Part H;
  `adjudication-r7w.md`'s class ruling (S0) and its scope and V-unit Part H; `assemble-r7y.md` (outcome, section 2.5's
  hand-offs, section 8); `famverify-tests-r7x.md` (5 findings)
- [x] P2 the live text of the lens (base `docs/ARCHITECTURE.md` unless a volume is named):
  - §2.7's terms and laws (l. 2581–2891), the worked examples, both tables and the span rule (l. 2893–3420);
  - §4.2 S3 (6) – (9) (l. 6215–6290), §4.4 S5a *Trace* (2) (l. 6609), S5b (l. 6660), S5d (l. 6721–6731), §4.8 *The
    harbour mouth*; §5.2's F-SITE, F-ROUTE, F-BUDGET-STAGE, F-WALL, F-CASTLE and F-REDERIVE rows (l. 9859–9879); §5.3's
    law-1 row (l. 9950); §7.1 *Raised ways, aqueducts and retaining walls* (l. 11150–11165);
  - §13.2: T101-4, T106-3, T20-7, T110-1 – T110-4 with T110-2's lead, S0 and the state sweep (l. 19224–19725), T114-3
    (l. 19766–19773), the take-over table (l. 19975–19990); §13.8's bar schedule and its T101, T110 and T114 rows
    (l. 20523–20583); INDEX §5 risk 2;
  - V01 T-V1-51; V04 T-V4-62, -63, -80, -82 and §8's U3 and U5 cells; V05 T-V5-14 (l. 2517–2581); V06 H-AQUA
    (l. 4101–4122), §7's take-over rows (l. 4163–4167), T-V6-11, -47, -48, -61, -64, -73 (l. 4184–4246) and §8's E3, E5
    and E8 cells (l. 4281–4286); V07 §3.11's REPLACEMENT (l. 2310–2320), §3.12 item 7 (l. 2629), T-V7-48 and -51
    (l. 3715, 3718); V09 T-V9-52 (l. 4432); V10 T-V10-41 (l. 3156)
- [x] P3 the five round-7x findings of this lens re-checked against the live text (Part 1)
- [x] P4 the laws attacked through the lens (Part 2): every clause the fourth pass wrote into a bar (S1 – S5, V5-1,
  V6-1, V6-2, V7-2 (4), V9-3) against a correct build and a wrong one; every outcome the pass wrote (class (B)'s B2, B5,
  B7; P1 – P14, D1 – D10, M1 – M10, V6-3 – V6-5, V7-1, V7-4, V9-1, V9-2, V9-4) against the bars that should hold it;
  every new clause's milestone and provider; law 1's invariants against §5.3's row and T110-4
- [x] P5 report, result file, LANDED

## Part 1 — the round-7x findings of this lens, re-checked against the live text

| id | sev | ruled (adjudication-r7y) | verdict | evidence (live text) |
|---|---|---|---|---|
| VF7x-TST-01 | minor | FIX (S3) | **fixed** | §13.8's T110 row (l. 20556): "and (4)'s hand rows W4, W5, W6, W8 and W10 (M4; V06's E3, which builds `absorbWall`) at the later of their milestone and those providers". |
| VF7x-TST-02 | minor | FIX (S4; V6-1) | **fixed** | All five insertions stand and each holds its case on its fixture. T110-2 (3)'s walled port (l. 19442–19446): "S7's chain laid at the nearest heads or shore points along the entrance whose gate and towers §2.7's laws admit, and, on a second run with none, not laid, `W_RAISED_MEETING` reported". T110-2 (1)'s stroke (l. 19336–19339): "one whose stroke ends under the wall's band or wall strips and, on a second run, runs along within them — its course bent to the nearest course §2.7's laws admit … with `bend.raised.wall`'s keep-clear form, else refused". T110-2 (1)'s tower (l. 19315–19317): "its seed searched so that S7's spacing places a tower in the aqueduct's under-deck strip beside its deck under no span, that tower standing there". T-V6-48 (V06 l. 4221): the chain on T110-4 (a)'s variant "laid at the nearest heads or shore points whose gate and towers §2.7's laws admit, else waiting that epoch (`walls.waited`)". T-V6-47 (V06 l. 4220): "on an H-AQUA variant whose METROPOLIS circuit's boundary falls on its viaduct's far ramp, the main approach road's pin moved along it … nothing waiting". The T-V6 clauses sit in E3's tests (V06 l. 4281). |
| VF7x-TST-03 | minor | FIX (S5; V6-2, V9-3) | **fixed** | (a) T110-2 (3) (l. 19394–19397): "no raised way's ends under the band or its wall strips (… law 1 (4); these laws' *ends*), the channel meeting the raised way by §2.7's laws (law 1 (1), (8); its worked example the way-and-channel table's row (e))". (b) l. 19420–19421: "on its next side whose gate §2.7's laws admit (law 1 (5), (6))". (c) T-V6-47 (V06 l. 4220), both sites: "where §2.7's laws, law 1 (5), bar one". (d) T-V9-52 (V09 l. 4432): the slid gate "to the first point at which §2.7's laws admit its footprint (a placed one to the nearer such point; …row W13)" and the wall drawn along beneath "leaves the strip on the side it entered from, at the nearest place §2.7's laws admit its line with its band and wall strips". |
| VF7x-TST-04 | minor | FIX (V5-1) | **fixed** | T-V5-14 (V05 l. 2579–2581): "With the run beneath locked instead, the run is kept as content the ruin laps around, no member, and the span and the supports over it are `ruined` all the same (§2.7's laws, law 2 *Entry*; its worked example the crossing table's W12·C8)". |
| VF7x-TST-05 | minor | MERGED into VF7x-GEN-04 (P5, M5); regraded: no valid choice | **closed by the ruling; the merged fix installed** | §4.4 S5b (l. 6660): "its way else re-routed as S5a *Trace* (2)'s step (b) says, through a gate of the stage §2.7's laws admit (one this step spawns among them)". Row (d)'s gates cell (l. 2916): "else its way re-routed through a gate of the stage these laws admit, one S5b spawns among them (law 2 (b); §4.4 S5a *Trace* (2)) … — else that crossing takes F-WALL's raised-way rung (law 2 (c); §5.2) —". The three texts now name one gate set. |

**The other clauses of this pass were each read against a correct build and a wrong one, and each holds**, except
where Part 2 says otherwise:
- **S1** (T110-4 (c)'s third run, the ring both raised ways meet shape-locked): runs W1·C1's law 1 (10) wall side, as
  M4 names it in W1·C1's test cell (l. 3346). It is scheduled with the shape lock, which J150 hands to round 8, so nothing
  is reported about its milestone.
- **S2 (1), first clause** (T110-2 (2), l. 19352–19356): the twin-town CITY's inter-nucleus route re-solved so that
  its deck comes down before the cross wall. This is P1's re-solve (l. 6234: "every deck edge whose ends straddle the
  stage-1 boundary or a merged pair's cross wall … excluded"). A build that keeps the deck across the cross wall fails
  "0 deck lines across the cross wall".
- **S2 (1), second clause** (the declared viaduct across the partition line): the cross wall is later by *Order*, so it
  passes beneath, which is law 1 (3). This is B2's (a) line case.
- **S2 (2)** (T110-2 (6)'s fifth run, l. 19629–19632): the perpendicular deck, P8's pick. A build that decks the way
  obliquely, or cuts it, fails.
- **S2 (3)** (the sixth and seventh runs, and the top-up run, l. 19632–19645):
  - the sixth and seventh runs bar a gate by law 1 (9) alone. A build that reads S3 (7)'s or S5a's bar as the old
    subset leaves the gate in the held building's strip, takes F-WALL's rung, and fails "F-WALL's raised-way rung not
    run". The two runs are arch-vault clauses of (6), so §13.8's T110 row schedules them at the later of M3a and U3.
  - the top-up run is P6, D1 and D2. A build that runs F-WALL's rung on the arc, or leaves the stage unwalled, fails.
- **S3, S4, S5, V5-1, V6-1, V6-2, V9-3**: Part 1.
- **V7-2 (4)** (T-V7-48, V07 l. 3715): the T3 `wall` palisade stroke is refused on the narrowed-pier variant. The bent
  group finds no lawful crossing along the deck, so (G3) applies. The clause is scheduled at V-M3 with T-V7-48.

**Every new clause has a provider at its milestone.**
- T110-2 (2)'s twin-town runs and (6)'s fifth, sixth, seventh and top-up runs sit in clauses §13.8's T110 row already
  schedules: M3a, and for (6)'s arch-vault runs U3.
- Skeletons are at M3a with T101-4.
- `wealthLevel` is the generation intent's (§7.7).
- The T-V6 clauses are at E3, T-V5-14's at P6, and T-V7-48's at V-M3.
- INDEX §5 risk 2 needs no new entry.

**Law 1's invariants are each checked.**
- §5.3's law-1 row cites clauses (1)–(11) whole (l. 9950).
- T110-4 runs that row after every commit on every fixture of T110-1 – T110-3 and the named volume bars (l. 19683–19700). The new twin-town, top-up and moat-deck fixtures are T110-2's, so they are among them.
- This pass's B5 is caught by §5.3's row in a wrong build: S5a *Trace* (3) no longer smooths or simplifies a pulled line into a shape the laws do not admit. That makes the line a law-1 invariant, so it needs no bar of its own.

**No bar of the lens cites a law, clause, term, row, cell or line form that does not exist.**
- assemble-r7y's resolver gives this result (its sections 4.2–4.6), and reading confirms it.
- W1·C1's new test pointer "T110-4 (c) (its shape-locked ring)" resolves to S1's run.

## Part 2 — findings

Severity counts: **0 blocker, 0 major, 5 minor**, all new.
- Every wrong build named below keeps law 1, so §5.3's row and T110-4 pass it.
- The bars that S0 reaches (T110-2's lead, l. 19264–19271) assert the laws' outcome, so no correct build fails them.
- The one bar outside S0's reach (VF7y-TST-03) is graded as VF7x-RDR-01 was: a case the fixture may not hold.

### VF7y-TST-01 — minor — FIXTURE (a case its fixture does not hold) — owner scope

**Claim.** T110-2 (2) (l. 19359–19362; this pass's S2 (1)) holds B2's (c) by this variant:

> "from the milestone that carries the shape lock (J147, J150), on a variant whose declared aqueduct, shape-locked and
> running wholly inside the union, crosses the partition line with its channel within the cross wall's height wherever
> that line may be re-laid, the cross wall not laid, `W_RAISED_MEETING` reported and the stage walled by its enceinte
> round the union (§4.2 S3 (6); §2.7's laws, law 1 (2), (10), law 2 (c))".

B2's (c) is class (B)'s ruled outcome for the cross wall (§4.2 S3 (6), l. 6232). The laws do not give that variant's
outcome:
- **The form is merged.** A channel within the wall's height gives the merged crossing: "the band built up to and around
  what stands of the aqueduct's arch or pier there" (law 1 (2)).
- **Law 1 (10) does not bar that merge.** Its list of the meetings that change a shape-held thing is: "a wall-like line,
  band or strip newly across the strip of a `vault`-use span of it, an aqueduct merged into it, a soffit lowered over a
  run of it, a gate made in it" (l. 2740–2743). "An aqueduct merged into it" is a merge into a shape-locked wall. A wall
  merged round a shape-locked aqueduct changes neither the aqueduct's deck width nor its spans' `use` (the terms'
  *shape*).
- **Part P has already ruled this case.** Pass 8 lists "a wall merged round a shape-locked aqueduct's pier" among the
  meetings that apply (`adjudication-r7.md` l. 3988, PRB7H-LCK-01).
- **So the case depends on spans the fixture does not fix.** The merged cross wall is barred only where its band or wall
  strips would lie newly across a `vault`-use span's strip. The fixture fixes no span's `use`, which the span rule's (3)
  draws by chance (l. 3405–3407). On most seeds a correct build lays the cross wall merged, which is B2's (a).

**Effect.** S0 makes the bar assert that outcome, so no correct build fails it. But B2's (c) is then held by no bar, and
this variant runs only once the shape lock exists. A build that sends the cross wall to F-WALL's raised-way rung keeps
law 1 and passes every bar. That rung may leave the stage unwalled: the outcome adjudication-r7y's P2 note ruled out
(PRB7H-GEN-04 (i)). The grade follows VF7x-TST-02's: a test gap whose wrong build keeps law 1.

**Required change** (T110-2 (2), l. 19359–19362):

"and, from the milestone that carries the shape lock (J147, J150), on a variant whose declared aqueduct, shape-locked and
running wholly inside the union, crosses the partition line with its channel within the cross wall's height wherever
that line may be re-laid, the cross wall not laid, `W_RAISED_MEETING` reported and the stage walled by its enceinte
round the union (§4.2 S3 (6); §2.7's laws, law 1 (2), (10), law 2 (c))"

→

"and, on a variant whose declared aqueduct, running wholly inside the union, crosses the partition line with its channel
above the cross wall's top by less than the deck's depth (`raisedWays.structure.span.deckDepthCm`) wherever that line
may be re-laid, so that §2.7's laws admit its crossing there in neither form (law 1 (2)), the cross wall not laid,
`W_RAISED_MEETING` reported, F-WALL's raised-way rung not run and the stage walled by its enceinte round the union
(§4.2 S3 (6); §2.7's laws, law 1 (2), law 2 (c))".

Why this fixture:
- It is the device T110-2 (1)'s low-channel aqueduct (l. 19339–19344) and (6)'s top-up run (l. 19640–19641) already use.
- It needs no lock, so it runs with T110-2 (2) at M3a.
- The shape-locked ring's law 1 (10) side stays with T110-4 (c)'s third run.

### VF7y-TST-02 — minor — TEST-GAP — owner scope (with V06, V07)

**Claim.** This pass wrote four family outcomes that no bar runs. VF7x-TST-02 found the same class after the third
pass, and adjudication-r7y wrote S4 and S2 so that each new outcome is held by a bar. For each item below, a build of the
old reading keeps law 1 and passes every bar, because it gives way or waits where the laws lay a lawful shape:

| | the outcome now written | why no bar distinguishes it |
|---|---|---|
| (a) | §4.2 S3 (6) (l. 6232; P2, class (B)'s B2): the cross wall's gate, "where those laws bar it there (law 1, read with its terms), moved along the inter-nucleus route to the nearest place they admit it (law 3); (b) else that route re-routed as law 2 (b) moves a ground way, to cross the cross wall where those laws admit its gate". | T110-2 (2)'s variants (l. 19352–19362) run only the cross wall's line (the deck re-solve; the line beneath a declared viaduct) and its (c). A build that goes from a barred cross-wall gate straight to (c), or to F-WALL's rung, passes. |
| (b) | §7.1 *Raised ways, aqueducts and retaining walls* (l. 11155–11159; D6) and V09 §4.20.2 (4) (V9-2): a raised road's ground-way gate that §2.7's laws bar where it crosses a wall: "(a) the way's crossing of the wall moved to the nearest place they admit its gate, (b) else the way re-routed through the nearest gate of that wall a way of its class may pass, (c) else refused". | T110-2 (2)'s hand raised road (l. 19368–19371) and T-V9-52 run only a gate made where the way crosses. A build that refuses at once, or re-routes at once where (a) has a lawful place, passes. PRB7H-LCK-04 ruled the re-route-first reading out under item 101 R2, as the program reads it. |
| (c) | V07 §3.11's REPLACEMENT (V07 l. 2314–2318; V7-1): "(b) else the ground ways, plots and unlocked buildings that shape meets moved as law 2 (b) moves them" before "(c) … the REPLACEMENT waiting". | T-V7-48's REPLACEMENT clauses (V07 l. 3715) run (a)'s local re-trace and (c)'s wait only. A build that waits wherever (a) fails passes. |
| (d) | §4.4 S5d (l. 6728; P6, class (B)'s B7) at an epoch: an arc kept as it stood, "its shortfall moved to the next stage's quota … (… at an epoch counted `walls.waited` besides, V06 §2.10)"; an epoch's new stage runs S5d too (V06 §3.6 item 4, V06 l. 1436–1437; adjudication-r7y's P6 note). | S2 (3)'s top-up run is a regeneration's. No bar runs S5d's kept arc at an epoch. A build that makes the epoch's whole new stage wait (F-WALL's epoch cell) passes. |

**Grade.** J141 alone would grade each item as a defined edge no bar runs. J146 and J151 narrow the family's majors to a
law-1 invariant checked by no bar, so each item is minor.

**Required change** (each insertion keeps every other word):
1. §13.2 T110-2 (2) (l. 19358–19359), after "(§4.2 S3 (6); §2.7's laws, law 1 (3), (4), law 2 (a))," insert: " and, on a
   variant whose skeleton declares a viaduct over the inter-nucleus route where that route crosses the partition line,
   its seed searched so that the cross wall's gate there would lie in that viaduct's under-deck strip (law 1 (5)), that
   gate moved along the inter-nucleus route to the nearest place §2.7's laws admit it and the cross wall's line re-laid
   locally through it, and, on a second run whose seed is searched so that those laws admit that gate at no point of
   the route within the reach law 2 (a) gives it, that route re-routed to cross the cross wall where those laws admit
   its gate, the cross wall laid on both runs and F-WALL's raised-way rung not run (§4.2 S3 (6); §2.7's laws, law 2 (a),
   (b), law 3),".
2. §13.2 T110-2 (2) (l. 19370–19371), after "its course beyond the wall a ground way on ground part 0 to the stroke's
   end, the undo restoring the wall;" insert: " the same stroke on a variant whose ground way would cross the wall under
   a standing aqueduct's span that clears the wall but not the gatehouse's top — the way's crossing moved along the wall
   to the nearest place §2.7's laws admit its gate, the declared way re-laid locally through it and the gate made there,
   and, on a second run whose seed is searched so that those laws admit that gate at no point of the wall within the
   reach law 2 (a) gives it, the way re-routed through the nearest gate of that wall a way of its class may pass, else
   refused `refuse.raised.meeting` (§7.1 *Raised ways, aqueducts and retaining walls*; §2.7's laws, law 1 (5), law 2
   (a), (b), *Carried way*, law 3);".
3. V07 T-V7-48 (V07 l. 3715), after "re-traced locally where its new band would cross in neither form (law 2 (a), law 3;
   its worked examples the bent-group sentence and row W14);" insert: " on a variant whose every lawful local re-trace
   there meets a VS4 track and a toft, the track re-routed and the toft re-cut as law 2 (b) moves them and the
   REPLACEMENT made, nothing waiting (V07 §3.11; §2.7's laws, law 2 (b));".
4. V06 T-V6-47 (V06 l. 4220), before "after the METROPOLIS circuit ran on beneath the aqueduct," insert: "on an H-AQUA
   variant whose METROPOLIS epoch's new stage takes S5d's top-up, its seed searched so that the top-up's arc between two
   pinned gates must cross the aqueduct where its channel runs above the circuit's top by less than the deck's depth
   (`raisedWays.structure.span.deckDepthCm`) wherever that arc's search band meets it — that arc kept as it stood, its
   shortfall moved to the next stage's quota, reported and counted in `walls.waited`, the stage walled by the circuit
   and nothing else waiting (§4.4 S5d; §2.7's laws, law 2 (c)); ".

Scheduling:
- Items 1 and 2 are generation and hand clauses of T110-2 (2), at M3a.
- Item 3 is at V-M3 with T-V7-48.
- Item 4 is at E3 with T-V6-47.

### VF7y-TST-03 — minor — CELL-TEST (a ladder's test against a ruled outcome) — owner determinism

**Claim.** Two of §5.2's ladder rows test the outcomes this pass changed without the new branch.

**F-SITE** (l. 9859):
- Its rung reads "→ merge the two under one enceinte with a cross wall, reported".
- Its test reads "twin-town fixtures: walls apart by the floor, or one enceinte with a cross wall".
- B2's (c) (§4.2 S3 (6), l. 6232; D3's `W_RAISED_MEETING` entry, l. 9992) gives a merged pair one enceinte and no cross
  wall wherever §2.7's laws leave the cross wall no lawful shape against an older raised way.
- T110-2 (2)'s variants are twin-town fixtures. Once VF7y-TST-01's fixture holds B2's (c), a correct build there has one
  enceinte and no cross wall, and this test cell fails it.
- S0 does not reach this test: it neither takes a T110 clause nor cites §2.7's laws.
- The grade is VF7x-RDR-01's (DR2's chain bar without the raised-way exception): a case its fixtures may not hold. The
  two fixes are to land together.

**F-BUDGET-STAGE** (l. 9861):
- D2 wrote this pass's kept arc into its ladder: "an arc §2.7's laws give no lawful shape against a standing raised way
  kept as it stood, its shortfall moved on, §4.4 S5d".
- Its test cell still names only "§13.2's B-CITY `wealthLevel` sweep".
- That sweep holds no raised way. The bar that holds the branch, T110-2 (6)'s top-up run (S2 (3)), is not named.
- This is a list omitting an id its rule names.

**Required change** (§5.2):
- F-SITE's ladder cell: "→ merge the two under one enceinte with a cross wall, reported" → "→ merge the two under one
  enceinte with a cross wall, save one §2.7's laws leave out for a raised way (§4.2 S3 (6); law 2 (c)), reported".
- F-SITE's test cell: "twin-town fixtures: walls apart by the floor, or one enceinte with a cross wall" → "twin-town
  fixtures: walls apart by the floor, or one enceinte with a cross wall, save one §2.7's laws leave out for a raised way,
  reported (`W_RAISED_MEETING`; §4.2 S3 (6); T110-2 (2))".
- F-BUDGET-STAGE's test cell: "§13.2's B-CITY `wealthLevel` sweep" → "§13.2's B-CITY `wealthLevel` sweep; T110-2 (6)'s
  top-up run (an arc §2.7's laws give no lawful shape against a standing raised way kept as it stood)".

### VF7y-TST-04 — minor — RESTATEMENT (a bar naming less than the law it runs) — owner V06

**Claim.** T-V6-47's pin clause (V06 l. 4220; V6-1, in words from VF7x-TST-02) runs a barred pin on H-AQUA:

> "on a second run with none there, the road re-routed through a lawful gate of the circuit … (§4.4 S5a *Trace* (2);
> §2.7's laws, law 2 (a), (b))".

The main approach road is the viaduct's carried way (H-AQUA, V06 l. 4106–4108). Law 2 (b) re-routes a carried way "as
*Carried way* says": "from the first point beyond the foot through the nearest gate of that wall that a way of its class
may pass" (l. 2791–2793). T110-2 (6)'s third run writes the same case so: "through the nearest of the stage's gates a way
of its class may pass" (l. 19624).

"A lawful gate" passes a build that re-routes through a farther gate, or through a postern or a water gate. S0 makes the
bar assert the laws' outcome, so the grade is minor.

**Required change** (T-V6-47, V06 l. 4220): "the road re-routed through a lawful gate of the circuit, the circuit laid
with its gates on ground part 0, nothing waiting (§4.4 S5a *Trace* (2); §2.7's laws, law 2 (a), (b));" → "the road
re-routed from the first point beyond the foot through the nearest gate of the circuit a way of its class may pass, the
circuit laid with its gates on ground part 0, nothing waiting (§4.4 S5a *Trace* (2); §2.7's laws, law 2 (a), (b),
*Carried way*);".

### VF7y-TST-05 — minor — CELL-TEST — owner V05

**Claim.** Row W12·C10 (l. 3357), a landfall over a run beneath a deck that `repairRaised` repaired, reads "as W12·C2 ·
T114-3's landfall clause". The columns are the raised way's state at the row's event (*Paths and tests*, l. 3324–3326).
C10 is defined as "repaired by `repairRaised` — as C2" (l. 3295).

V05's T-V5-14 runs T114-3's landfall clause. Its list of "the raised way's other states too, each on its own run of that
fixture" (V05 l. 2568–2577) has:
- a span `ruined`, `cleared` and `vault`-read;
- every span fallen;
- a support `cleared` or toppled;
- the frame growth;
- the re-spacing;
- the village hand-off.

It has no span repaired before the fall. The clause's own repair comes after the fall, which is C10's event, not W12's.
Every other C10 cell of the table names a state-sweep run (·S), which makes C10.

A build that treats a repaired span apart from a standing one keeps law 1 and passes. This is R7-01's grading of a cell
whose named test does not hold its case: minor.

**Required change** (V05 T-V5-14, V05 l. 2573–2574): "and, on another, re-spaced by a hand edit of its `spanSpacingCm`;" →
"and, on another, re-spaced by a hand edit of its `spanSpacingCm`; a span over the run `ruined` and repaired by
`repairRaised` before the fall;".

## Part 3 — held for round 8 (outside the family, not graded)

Three notes persist unchanged. Each is already on adjudication-r7y's held list (items 12–14). One is new:
- **V09 T-V9-52** (V09 l. 4432): "a road drawn across a viaduct crosses under its nearest `open` span" pins the span row
  (b) gives by §4.3's crossing rule. The meeting is a raised way with a ground way, with no wall.
- **V07 §3.12 item 7 and T-V7-51** (V07 l. 2629, 3718): "crosses the hand-off up held" means carried unchanged, while
  §2.7's *held* now means locked. This is a rung hand-off, with no wall meeting.
- **Base T110-2 (6)** (l. 19590): "that route re-solved to cross under the nearest span the rule admits" pins a place a
  route solve's own cost chooses. The meeting is a raised way with a ground way, with no wall.
- **New: base §4.2 S3 (6)** (l. 6232): the cross wall's gate law names one gate only, "with a gate where the
  inter-nucleus route crosses it". Nothing says how the cross wall meets any other way laid before it that crosses the
  partition line on the ground: a creation prefix's declared road, or a kept one. §5.3's gate row lets a way cross a
  trace only at a gate. This is a wall with a ground way. A declared road deck's carried way so crossing reaches the
  family through *Carried way*'s "its gate where the wall crosses that course beyond the foot"; no fixture of this lens
  holds that case.

## Verdict for this lens

**The fourth fix pass closed every round-7x finding of this lens:**
- the W6 and W8 hand rows are scheduled past their providers;
- the four unrun outcomes now have bars: the harbour-mouth chain, a stroke kept off a wall's band, S7's margin tower,
  and an epoch circuit's barred pin;
- the four bar restatements are gone;
- W12·C8's locked-run half is run;
- VF7x-TST-05 is closed by the merged S5b and row (d) text.

**The pass's own bars hold their cases on their fixtures:**
- the twin-town re-solve;
- the cross wall beneath a declared viaduct;
- the perpendicular moat deck;
- the law-1 (9) gates at stage 1 and stage 2;
- S5d's kept top-up arc;
- T110-4 (c)'s shape-locked ring;
- T-V7-48's refused palisade stroke.

Each new clause has a provider at its milestone. Law 1's invariants are all checked, by §5.3's row and by T110-4.

**No major remains in the lens. Five minors remain:**
- **VF7y-TST-01:** the one bar meant to hold B2's (c) asserts it on a fixture where the laws, and Part P's PRB7H-LCK-01,
  lay the cross wall merged round the shape-locked aqueduct, so the cross wall not laid is held by no bar. An unlocked
  fixture whose channel runs above the cross wall's top by less than the deck's depth holds it at M3a.
- **VF7y-TST-02:** four outcomes the pass wrote are run by no bar: the cross wall's gate move and route re-route,
  §7.1's raised-road gate in law 2's order, V07's REPLACEMENT (b), and S5d's kept arc at an epoch.
- **VF7y-TST-03:** §5.2's F-SITE test asserts a cross wall that B2's (c) may leave out, and F-BUDGET-STAGE's test names
  no bar for D2's branch.
- **VF7y-TST-04:** T-V6-47 re-routes the carried way through "a lawful gate" rather than *Carried way*'s nearest
  passable one.
- **VF7y-TST-05:** W12·C10 names a clause that runs no landfall over a repaired span.

None of the fixes changes a law.
