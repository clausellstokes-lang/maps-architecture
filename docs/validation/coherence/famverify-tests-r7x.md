# Family verify — tests, fixtures and milestones, after the third fix pass (coherence/famverify-tests-r7x)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/famverify-tests-r7x, 2026-10-02; covered by
> the whole-design retrovalidation (J84). One of the six family-focused checks of round 7, run on the live design after
> the third family fix pass (assemble-r7x, HEAD 6b9a9b1). Its family is raised ways (viaducts, elevated roads, aqueducts,
> their arch vaults) meeting walls of every kind. Its lens is the tests the family's cells and sentences name, the
> fixtures they run on, and the milestones that schedule them. Grading is J141's as the owner applies it in J146 and
> J151: a finding is MAJOR only where the laws (or the design text written from them) give a case no lawful outcome,
> give an outcome breaking an owner rule or a law-1 invariant, leave a law-1 invariant checked by no bar, or make a
> check or a named test fail a correct build; a case whose every outcome is lawful is a minor VALID CHOICE. Nothing J150
> hands to round 8 is reported (the two-axis lock and its readers outside the family; a lock's behaviour under an undo,
> a redo, a re-grade or value edit within a standing meeting, or a repair). No design text was changed, and no
> state-changing git command was run.

PROGRESS (lane `coherence/famverify-tests-r7x`, 2026-10-02, cloud checkout)
- [x] P0 resume check: no report and no CHECKPOINT of this seat, so a fresh start
- [x] P1 read whole: the brief; `adjudication-r7.md` Part L as installed at §2.7's support step (6) (terms, laws 1–4,
  the check); `adjudication-r7x.md` whole (the 27 decisions, the root-cause ruling with forms F1–F5, Part H by unit,
  the builders' choices — none new — and the 13 held notes); `adjudication-r7w.md`'s builders' choices;
  `assemble-r7x.md` (outcome, section 2.5's hand-offs, section 8's notes for the verifier); `famverify-tests-r7w.md`
  (5 findings)
- [x] P2 the live text of the lens (base `docs/ARCHITECTURE.md` unless a volume is named):
  - §2.7's laws (l. 2579–2891), the worked examples, both tables and the support step's (7) (l. 2893–3383);
  - §4.2 S3 (7) (l. 6224–6227), §4.4 S5a *Trace* (2) (l. 6599–6600), *Outer moats* (l. 6630–6640), S5b (l. 6650–6656),
    §4.8's S7 lead (l. 8344) and *The harbour mouth* (l. 8400–8401), §7.1 *Raised ways* (l. 11143–11150);
  - §5.2's F-WALL row (l. 9852), §5.3's law-1 row (l. 9940);
  - §8.11's T-ER-12 (l. 15485), §11.6 (T-ER-19, no family row);
  - §13.2: T101-4 (l. 19125–19129), T110-1 – T110-4 with the class rule and the state sweep (l. 19212–19677), T114-3
    (l. 19717–19723), the take-over row (l. 19926); §13.8's T110 and T114 rows (l. 20507, 20518); §16's M2a – M4 and
    M6-E rows; INDEX §5 risk 2;
  - V01 T-V1-51 (V01 l. 3358); V04 T-V4-62, -63, -80, -82 and §8's U3 and U5 cells (V04 l. 3163–3164, 3181, 3183,
    3215, 3218); V05 T-V5-14 (V05 l. 2517–2579); V06 H-AQUA (V06 l. 4100–4120), §7's take-over rows (V06 l. 4162–4166),
    T-V6-11, -47, -48, -61, -64, -73 (V06 l. 4183, 4219, 4220, 4233, 4236, 4245) and §8's E3, E5, E8 cells (V06
    l. 4280, 4282, 4285); V07 T-V7-48, -51 (V07 l. 3709, 3712); V09 §4.9's family rows and T-V9-52 (V09 l. 2102–2105,
    4428); V10 T-V10-41 (V10 l. 3156)
- [x] P3 the five round-7w findings of this lens re-checked against the live text (Part 1)
- [x] P4 the laws attacked through the lens (Part 2): every clause the third pass wrote into a bar (S1 – S9, V4-1,
  V6-5 – V6-7, V7-1, V7-3, V9-4, M11) against a correct build and a wrong one; every cell's named test and fixture; every
  new clause's milestone and provider; the third pass's new pipeline and hand outcomes (P2, P4, P8, P9, D1, D3, V9-2)
  against the bars; law 1's invariants against §5.3's row and T110-4
- [x] P5 report, result file, LANDED

## Part 1 — the round-7w findings of this lens, re-checked against the live text

| id | sev | ruled (adjudication-r7x) | verdict | evidence (live text) |
|---|---|---|---|---|
| VF7w-TST-01 | major | MERGED into VF7w-TBL-02 (P1, M4, V6-1) | **fixed** | §4.4 S5a *Trace* (2) (l. 6599) is now the F1 citation: "searching only the shapes §2.7's laws admit, its line read with the band and wall strips it carries there (law 1 (2)–(6), (9)–(11) and law 2 *Carried way*, read with their terms; law 2 (a): its own cost choosing among them; …)". No list and no widening remains, so a held building's strip is widened once, by its term (law 1 (9)); *beneath* (l. 3080–3083) and V06 §3.7.6 (5) cite the same words. T110-2 (4)'s held-building run (l. 19471–19480) and T-V4-80 (i) now hold against one build. |
| VF7w-TST-02 | minor | FIX (S6) | **fixed** | All five insertions stand: T110-2 (2)'s variant past the foot (l. 19333–19335); T110-2 (3)'s ramp variant, its second run over a second viaduct's ends and its third run for P2's step (b) — "F-WALL's raised-way rung not run" (l. 19368–19378); the hand castle siting with its refusal run (l. 19391–19396); T110-2 (4)'s `contractWall` refused beyond its band (l. 19514–19517); T110-2 (6)'s fourth and fifth runs (l. 19590–19597). Each holds its case on its fixture. |
| VF7w-TST-03 | minor | FIX (S7) | **fixed** | T110-2 (6) (l. 19557–19562): "its seed searched so that the new ring's boundary meets one of the aqueduct's supports and its channel runs above the ring's top wherever S3's pull's search band meets the aqueduct" and "on (1)'s variant, its channel within the ring's height wherever that search band meets the aqueduct, the crossing merged wherever the trace crosses the deck line". |
| VF7w-TST-04 | minor | FIX (V4-1) | **fixed** | T-V4-63 (V04 l. 3164): "passed beneath by an epoch circuit (its seed searched so that the circuit's line crosses the deck line under that span; §2.7's laws, law 2 (a)) and, on a second run, by a hand `drawWall`". |
| VF7w-TST-05 | minor | FIX (M11; S8, V7-1) | **fixed** | W4·C2 "T110-2 (4) (H), T-V6-11 (E)" (l. 3341); W1·C1 "T110-2 (1), (2), T-V7-48 (V)" (l. 3338); W5·C2 "… T-V7-48's decay clause (V)" (l. 3342); W6·C2 "T-V6-47, T110-2 (4) (H)" (l. 3343); W8·C2 "T-V6-11, T110-2 (4) (H)" (l. 3345); T110-2 (4)'s hand `gateToJunction` (W6) and `absorbWall` (W8) rows (l. 19448–19449); T-V7-48's decay clause "beneath the declared viaduct" (V07 l. 3709). Each named test now holds its cell's path. (Their milestone: VF7x-TST-01.) |

The other third-pass clauses of the lens were each read against a correct build and a wrong one, and each holds:
- **S1** (T110-2 (4), l. 19416–19422): the gate a hand `drawWall` makes for a ground way under a span whose soffit
  clears the wall but not the gatehouse goes along the way only until its footprint leaves the deck's plan, still in
  the strip beside the deck. That is law 1 (5) read with its terms (an over crossing's margin, under no span) and law
  3's measure for "a gate the op's own wall lays on a standing way, along that way". The stretch bent through it stays
  a lawful crossing (entering one long side, leaving the other, meeting the deck line once beside the way's corridor).
  The fixture holds the case (the seed is searched for it).
- **S2 – S5, S7, S9 (a), (b), (d) – (f)**: citations in F5's words, each asserting what S0 already made each assert.
- **S6**: Part 1. The third run of T110-2 (3) is P2's step (b) exactly (re-routed by the router that laid it, between
  its nearest unmoved nodes, `N_k` gates, the rung not run).
- **V6-5 – V6-7, V7-1, V7-3, V9-4**: the take-over lists and the bars in F5's words.
- **S0** now reaches T-ER-12 (l. 19253). Every bar of the lens takes a T110 clause or cites §2.7's laws, so each
  asserts the laws' outcome for its fixture.

**Law 1's invariants are each checked.** §5.3's law-1 row cites clauses (1)–(11) whole (l. 9940). T110-4 runs that row
after every commit on every path, with each structure unlocked, placement-locked and (from the milestone that carries
it) shape-locked (l. 19635–19671).

**No bar of the lens cites a law, clause, term, row, cell or line form that does not exist.** That is assemble-r7x's
resolver result (sections 4.2–4.6), confirmed here by reading. Two line forms the bars name were confirmed in V09 §4.9
(l. 2104): "the line's keep-clear form" and `bend.wall.raisedCrossing`'s castle line.

## Part 2 — findings

Severity counts: **0 blocker, 0 major, 5 minor**, all new. Each wrong build named below keeps law 1, so §5.3's row and
T110-4 pass it. Each correct build passes every bar, S0 making each bar assert the laws' outcome.

### VF7x-TST-01 — minor — SCHEDULING — owner scope

**Claim.** S8 added two hand rows to T110-2 (4) (l. 19448–19449): "a hand `convert` `gateToJunction` of a gate of that
run beside the raised way (W6) and a hand `convert` `absorbWall` of its ring (W8)". "That run" is "the epoch circuit's
run beneath" (l. 19445), and "its ring" is that circuit's ring. Each hand row also runs on the hand `drawWall`'s run
(l. 19458–19460).

Their providers land after M3a:
- the epoch circuit is M4's, on the hook fixtures (§13.8, l. 20507);
- `absorbWall` is an `EvolveOp` (V06 §2.8; §4.11, l. 8917–8918), built at V06's E3 (V06 l. 4280).

§13.8's T110 row moves only "(4)'s hand rows W4, W5 and W10 (M4; V06's E3)" to "the later of their milestone and
those providers" (l. 20507). The new W6 and W8 rows fall to T110-2's M3a, where neither provider exists. INDEX §5 risk 2
asks for every such clause to be named. This is VF7-TST-05 (b)'s class, and nothing built changes.

**Required change.** §13.8's T110 row (l. 20507): "and (4)'s hand rows W4, W5 and W10 (M4; V06's E3) at the later of
their milestone and those providers" → "and (4)'s hand rows W4, W5, W6, W8 and W10 (M4; V06's E3, which builds
`absorbWall`) at the later of their milestone and those providers".

### VF7x-TST-02 — minor — TEST-GAP — owner scope (with V06)

**Claim.** The third pass wrote four family outcomes that no bar runs. VF7w-TST-02 found the same class after the second
pass, and adjudication-r7x added S6 so that its fixes are held by a bar. For each item below, a build of the old text
keeps law 1 and passes every bar: it gives way, refuses, or moves a thing further than the laws do. Item (a)'s
old build lays the chain where law 1 (6) bars it, which §5.3's row catches.

| | site and the outcome now written | why no bar distinguishes it |
|---|---|---|
| (a) | §4.8 *The harbour mouth* (l. 8401; P4): the chain "at the nearest heads or shore points along the entrance whose gate and towers §2.7's laws admit, else not laid, reported (`W_RAISED_MEETING`; …)"; the fixed-place sentence (l. 3254–3256): at an epoch it "waits (`walls.waited`)". | No bar puts a raised way's zone over a harbour mouth at generation. T110-4 (a)'s T-V6-48 variant (l. 19636–19638) runs only §5.3's law-1 row. A build that leaves the chain out (or waits) whenever a head lies in a zone passes, though a farther head is lawful. |
| (b) | §7.1 *Raised ways* (l. 11145–11150; D3): a course "its ends where §2.7's laws admit them (law 1 (3), (4))", "a course §2.7's laws do not admit bent to the nearest course they admit, else refused"; V09 §4.9's `bend.raised.wall` (V09 l. 2102; V9-2): "for a raised or aqueduct stroke bent where §2.7's laws, law 1 (4), bar it (along a wall, or an end under its band or wall strips), "{way} keeps clear of {wall}, {m} m off your line."" | T110-2 (1)'s hand aqueducts (l. 19315–19324) and T-V9-52 run strokes across a wall, none ending under its band or running along within it. A build that refuses such a stroke passes every bar. adjudication-r7x's D3 note names this case "a member the checks had not yet raised". |
| (c) | §4.8's S7 lead (l. 8344; P9): "no gate's, postern's or tower's footprint where law 1 (5) bars it (one … moved to the nearest place the laws admit …)". adjudication-r7x's P9 note: the old words "moved a tower in an over crossing's strip margin, under no span, past the nearest lawful place". | T110-2 (1)'s tower clause (l. 19300–19302) runs only "a tower S7's spacing places under it". A build of the old words, moving a margin tower clear of the whole strip, passes. |
| (d) | §4.4 S5a *Trace* (2)'s pin rule on the epoch path (l. 6600; P2), which *No gate and no tower* names for "an epoch circuit" (l. 3146): a barred pin "(a) moved along its arterial …; (b) else its arterial re-routed …; (c) else … law 2 (c)'s outcome on its path". | Every run of a barred pin is at generation (T110-2 (3), l. 19364–19378) or at a regeneration (T110-2 (6)). No epoch circuit's boundary falls on a ramp or near a foot (T-V6-47, T110-2 (4)). A build that waits the circuit (`walls.waited`) at once passes. |

J141 alone would grade each of these as a defined edge no bar runs. J146 and J151 narrow the family's majors to a
law-1 invariant checked by no bar, so each item is minor.

**Required change** (each insertion keeps every other word):
1. §13.2 T110-2 (3) (l. 19410), before "; (4) *beneath* by hand and at an epoch" insert: "; a walled port whose
   skeleton declares a viaduct along its harbour's shore, a head of its harbour mouth in that viaduct's fixed-place
   zone — S7's chain laid at the nearest heads or shore points along the entrance whose gate and towers §2.7's laws
   admit, and, on a second run with none, not laid, `W_RAISED_MEETING` reported (§4.8 *The harbour mouth*; §2.7's
   laws, law 1 (5), (6), law 2; its worked example the fixed-place sentence)".
2. V06 T-V6-48 (V06 l. 4220), after "anchored on a tower or fort already standing at a mole head;" insert: " on T110-4
   (a)'s variant, whose declared viaduct's fixed-place zone holds a head of the mouth, the chain laid at the nearest
   heads or shore points whose gate and towers §2.7's laws admit, else waiting that epoch (`walls.waited`) (§2.7's
   laws, law 1 (5), (6), law 2; its worked example the fixed-place sentence);".
3. §13.2 T110-2 (1) (l. 19320), after "refused (`refuse.raised.meeting`), nothing of either built;" insert: " and one
   whose stroke ends under the wall's band or wall strips and, on a second run, runs along within them — its course
   bent to the nearest course §2.7's laws admit, its ends off the band and wall strips (law 1 (4), law 2 (a), law 3),
   with `bend.raised.wall`'s keep-clear form, else refused `refuse.raised.meeting`;".
4. §13.2 T110-2 (1) (l. 19302), after "else laid along the trace at the nearest point the laws admit it (§2.7's laws,
   law 1 (5), law 2 (a), law 3), nothing reported" insert: ", and, its seed searched so that S7's spacing places a
   tower in the aqueduct's under-deck strip beside its deck under no span, that tower standing there (§2.7's laws, law 1
   (5), read with its terms)".
5. V06 T-V6-47 (V06 l. 4219), after "every crossing under a span §4.3 admits;" (the clause of the epoch stage and route
   re-solve) insert: " on an
   H-AQUA variant whose METROPOLIS circuit's boundary falls on its viaduct's far ramp, the main approach road's pin moved
   along it to the nearest place §2.7's laws admit it within the search band and, on a second run with none there, the
   road re-routed through a lawful gate of the circuit, the circuit laid with its gates on ground part 0, nothing
   waiting (§4.4 S5a *Trace* (2); §2.7's laws, law 2 (a), (b));". §13.8's T110 row and V06's E3 cell take it with
   (4)'s other epoch clauses.

### VF7x-TST-03 — minor — RESTATEMENT — owner scope (with V06, V09)

**Claim.** Four bar texts still restate law 1 (4) or (5) in their own words. Adjudication-r7x's root-cause ruling
requires F5's words at such a site, and R7-01 (2)'s sweep should have caught each. Each restatement names a place the
laws do not give. S0 makes each bar assert the laws' outcome, so no correct build fails and the grade is minor.

| | site | the restatement | what the laws give |
|---|---|---|---|
| (a) | T110-2 (3) (l. 19366–19367; this pass's S9 (c)), on the ramp run, its variant and its second run | "no raised way's ends under the band, its wall strips or the channel (§2.7's laws, law 1 (4); these laws' *ends*)" | Law 1 (4) binds a wall's line, band and wall strips, never its moat. The moat lies "outside the outer half-band and a berm" (§4.4 *Outer moats*, l. 6638), and the wall strips end at the moat (§2.7's terms). With the pin at the first point beyond the foot, the moat may lie over an end's widened margin. The way-and-channel table's row (e) (l. 2917) is the moat's outcome. |
| (b) | T110-2 (3) (l. 19390–19391) | "the second castle's town-side gate fixed on its next side clear of that strip" | §4.2 S3 (8): the side "whose gate, with its footprint, lies where law 1 (5) and (6) admit it". In an over crossing that side's gate may stand in the strip, under no span. |
| (c) | V06 T-V6-47 (V06 l. 4219), twice | "no gate, postern or tower in the under-deck strip but in an over crossing whose spans clear it (law 1 (5))"; the bar "0 gates, posterns or towers in an under-deck strip but in an aqueduct's over crossing whose spans clear them" | Law 1 (5) adds "never on a support's ring". The bar's words pass a tower on a ring, which §5.3's row catches. |
| (d) | V09 T-V9-52 (V09 l. 4428) | a slid gate "moves back along the trace to the strip's edge its grip came from (a placed one to the nearer edge)"; "a wall drawn along beneath the viaduct moves to the strip's edge" | A gate stops at "the first point at which these laws admit its footprint" (*Strips, zones and nearest points*; row W13), with its footprint wholly off the strip. A line leaves the strip on its entry side with its band outside it (law 1 (4); law 3, as END-L3 now reads; the bent-group sentence (ii)). Read with "the strip" as the under-deck strip, each named place puts half a footprint or half a band in the strip. V09's repair seat listed (d) for this check (assemble-r7x section 8). |

T110-2 (4)'s sibling, "each such part moved to the strip's edge on its entry side, its band outside the under-deck
strip" (l. 19463–19464), names the bent-group strip's edge and states the band's place. It agrees with the laws and
needs no change.

**Required change.**
- (a) T110-2 (3) (l. 19366–19367): "no raised way's ends under the band, its wall strips or the channel (§2.7's laws,
  law 1 (4); these laws' *ends*)," → "no raised way's ends under the band or its wall strips (§2.7's laws, law 1 (4);
  these laws' *ends*), the channel meeting the raised way by §2.7's laws (law 1 (1), (8); its worked example the
  way-and-channel table's row (e)),".
- (b) T110-2 (3) (l. 19390–19391): "the second castle's town-side gate fixed on its next side clear of that strip," →
  "the second castle's town-side gate fixed on its next side whose gate §2.7's laws admit (law 1 (5), (6)),".
- (c) T-V6-47 (V06 l. 4219): "and no gate, postern or tower in the under-deck strip but in an over crossing whose spans
  clear it (law 1 (5))," → "and no gate, postern or tower where §2.7's laws, law 1 (5), bar one,"; and "0 gates,
  posterns or towers in an under-deck strip but in an aqueduct's over crossing whose spans clear them (§2.7's laws, law
  1 (5));" → "0 gates, posterns or towers where §2.7's laws, law 1 (5), bar one;".
- (d) T-V9-52 (V09 l. 4428): "moves back along the trace to the strip's edge its grip came from (a placed one to the
  nearer edge)" → "moves back along the trace, on the side its grip came from, to the first point at which §2.7's laws
  admit its footprint (a placed one to the nearer such point; law 1 (5), law 2 (a), law 3; its worked example the
  crossing table's row W13)"; and "a wall drawn along beneath the viaduct moves to the strip's edge with the line's
  keep-clear form" → "a wall drawn along beneath the viaduct leaves the strip on the side it entered from, at the
  nearest place §2.7's laws admit its line with its band and wall strips (law 1 (4), law 2 (a), law 3; its worked
  example the bent-group sentence (ii)), with the line's keep-clear form".

### VF7x-TST-04 — minor — CELL-TEST — owner V05

**Claim.** Row W12·C8 (l. 3349) gives both locked sides of a landfall over a run beneath a deck:
- "a locked raised way's spans and supports kept and the run beneath `breached`";
- "a locked run kept and the spans and supports over it `ruined`".

It names T-V5-14 for both. T-V5-14's raised-way clause (V05 l. 2577–2579) runs only the first: "With the aqueduct
locked, it is kept as content the ruin laps around …, and the run beneath is `breached` all the same". Its general
"a locked wall kept" (V05 l. 2537) is on a fixture with no raised way.

A build that also spares the raised way's spans and supports over a locked run keeps law 1 and passes every bar. That is
R7-01's grading of a cell whose named test does not hold its case: minor.

**Required change.** V05 T-V5-14 (V05 l. 2579), after "and the run beneath is `breached` all the same." add " With the
run beneath locked instead, the run is kept as content the ruin laps around, no member, and the span and the supports
over it are `ruined` all the same (§2.7's laws, law 2 *Entry*; its worked example the crossing table's W12·C8)."

### VF7x-TST-05 — minor — TWO-READINGS (valid choice) — owner pipeline (with model)

**Claim.** The bar for P2's step (b), T110-2 (3)'s third run, asserts the arterial "re-routed … through a lawful gate of
the stage" (l. 19372–19375). Three texts this pass wrote name that gate differently:
- §4.4 S5a *Trace* (2) (l. 6600; P2): "(b) else its arterial re-routed as law 2 (b) moves a ground way, to cross the
  boundary at a gate those laws admit (a gate S5b spawned among them; …)";
- §4.4 S5b (l. 6650; P8): "its way else re-routed through a gate this step spawns";
- the way-and-channel table's row (d) (l. 2916; M10): "else its way re-routed through a gate S5b spawns (law 2 (b))".

Law 2 (b) re-routes a ground way "by the router that laid it … between its nearest unmoved nodes either side", with no
restriction on the gate. So a builder may route through any lawful gate of the stage (P2, the laws) or through S5b's
spawned gates alone (S5b, row (d)).

**When `N_k > c`** both builds keep law 1 and `N_k`, and both pass T110-2 (3)'s third run: a valid choice (J151).

**When `N_k ≤ c`**, S5b "spawns none" (l. 6653), and S5b's words leave the arterial no gate. P2's "a gate S5b spawned
*among them*" gives the outcome: a stage gate it may pass. A builder who read S5b's words as binding P2 would take
step (c), F-WALL's raised-way rung, where law 2 (b) lays a lawful walled shape. P2's words exclude that reading, so the
case is graded on its lawful outcomes.

Each text restates law 2 (b) more narrowly than the laws state it, the class adjudication-r7x's root-cause ruling closes.

**Required change** (citations in F3's words, so that the three texts give one gate set):
- §4.4 S5b (l. 6650): "its way else re-routed through a gate this step spawns" → "its way else re-routed as S5a *Trace*
  (2)'s step (b) says, through a gate §2.7's laws admit (a gate this step spawns among them)".
- §2.7's way-and-channel table, row (d), its gates cell (l. 2916): "else its way re-routed through a gate S5b spawns
  (law 2 (b))" → "else its way re-routed through a gate of the stage these laws admit, one S5b spawns among them (law 2
  (b); §4.4 S5a *Trace* (2))".

If the adjudicator reads S5b's words as binding, the `N_k ≤ c` case gives way where a lawful shape exists. That is the
outcome Part P pass 8 ruled against J144 as the program reads it (PRB7H-GEN-04 (i)), and the grade would be major. The
fix is the same.

## Part 3 — held for round 8 (outside the family, not graded)

Three notes outside the family persist unchanged. Each is already on adjudication-r7x's held list, items 11–13:
- **V09 T-V09-52** (V09 l. 4428): "a road drawn across a viaduct crosses under its nearest `open` span" pins the span
  row (b) gives by §4.3's crossing rule. The meeting is a raised way with a ground way, with no wall.
- **V07 §3.12 item 7 and T-V7-51** (V07 l. 2627, 3712): "crosses the hand-off up held" means carried unchanged, while
  §2.7's *held* now means locked. This is a rung hand-off, with no wall meeting.
- **Base T110-2 (6)** (l. 19555): "that route re-solved to cross under the nearest span the rule admits" pins a
  place a route solve's own cost chooses. The meeting is a raised way with a ground way, with no wall.

## Verdict for this lens

**The third fix pass closed every round-7w finding of this lens:**
- the major (merged into VF7w-TBL-02): S5a's list is now a citation that widens nothing;
- the four minors: the six untested outcomes (S6), T110-2 (6)'s seed (S7), T-V4-63's seed (V4-1), and the crossing
  table's five cells (M11, S8, V7-1).

The third pass's new clauses hold their cases on their fixtures, with their outcomes the laws':
- S1's gate in an over crossing's margin;
- S6's runs, P2's step (b) among them;
- the hand castle siting and its refusal;
- the `contractWall` refusal beyond its band;
- the carried way's moved gate and its decked outer moat.

S0 now reaches every bar of the lens, T-ER-12 included. Law 1's invariants are all checked, by §5.3's row and by
T110-4.

**No major remains in the lens. Five minors remain:**
- **VF7x-TST-01:** the two new hand rows, W6 and W8, are unscheduled past their providers.
- **VF7x-TST-02:** four outcomes the pass wrote are run by no bar: the harbour-mouth chain, a stroke kept off a wall's
  band, S7's margin tower, and an epoch circuit's barred pin.
- **VF7x-TST-03:** four bar texts still restate law 1 (4) or (5). One of them, T110-2 (3)'s "or the channel", the
  sweep itself wrote.
- **VF7x-TST-04:** W12·C8's locked-run half is not run by its named test.
- **VF7x-TST-05:** S5b and row (d) name the re-route gate more narrowly than P2 and law 2 (b). This is a valid choice
  while `N_k > c`, and P2's own words decide it when `N_k ≤ c`.

None of the fixes changes a law.
