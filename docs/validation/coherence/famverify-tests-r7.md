# Family verify — tests, fixtures and milestones (coherence/famverify-tests-r7)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/famverify-tests-r7, 2026-10-02; covered by
> the whole-design retrovalidation (J84). One of the six family-focused checks of round 7 (J144): raised ways (viaducts,
> elevated roads, aqueducts, their arch vaults) meeting walls of every kind, checked through one lens — the tests the
> family's cells and sentences name, the fixtures they run on, and the milestones that schedule them. Grading is J141's
> as the owner applies it in J146 and J151: MAJOR only where the laws give a case no lawful outcome, an outcome breaking
> an owner rule or a law-1 invariant, leave a law-1 invariant checked by no bar, or make a check or a named test fail a
> correct build; a case whose every outcome is lawful is a minor VALID CHOICE. Nothing J150 hands to round 8 is reported
> (the two-axis lock and its readers outside the family; a lock's behaviour under an undo, a redo, a re-grade or value
> edit within a standing meeting, or a repair). No design text was changed; no state-changing git command was run.

PROGRESS (lane `coherence/famverify-tests-r7`, 2026-10-02, cloud checkout)
- [x] P0 resume check: no report, no CHECKPOINT of this seat — fresh start
- [x] P1 read whole: the brief; adjudication-r7.md (Part L, R7-02's sentences and both tables, R7-03 – R7-07, Part H,
  Part P passes 1–8, Part A's J150 hand-off); PROGRESS J144 – J151; the live §2.7 support step (6) — (0) the laws
  (ARCHITECTURE l. 2578–2889) and the worked examples (l. 2891–3346), (7) (l. 3348–3371)
- [x] P2 the live text of the lens: §13.2's T101-4 (l. 19103–19108), T110-1 – T110-4 (l. 19188–19550), T114-3
  (l. 19587–19594), the take-over row (l. 19796); §13.8's T110 and T114 rows (l. 20377, 20388); §5.3's law-1 row
  (l. 9928); §8.11's T-ER-12 (l. 15463), §11.6 (no family row); §16's M3a and M4 rows (l. 21309, 21311); V01 T-V1-51
  (l. 3352); V04 T-V4-62, T-V4-63, T-V4-80 with UC18, T-V4-82, §8's U3 and U5 cells (l. 2443–2470, 3163–3164, 3181,
  3183, 3205–3230); V05 T-V5-14 and P6 (l. 2517–2579, 2863–2877); V06 H-AQUA (l. 4092–4109), §7's T110-2 rows
  (l. 4151–4152), T-V6-11, -47, -48, -61, -64, -73 (l. 4172–4234), §8 (l. 4253–4290); V07 T-V7-48, T-V7-51, §1 (14),
  ## 8's V-M3 cell, risk (8) (l. 190–197, 3708, 3711, 3762, 3818–3823); V09 T-V9-52, §4.9's bend rows (l. 2103–2105,
  4427); V10 T-V10-41 (l. 3156); INDEX §5 risk 2
- [x] P3 the 30 round-6 family findings of this lens re-checked (work/round7-work/*.json, Part H's dispositions)
- [x] P4 the laws attacked through the lens: each cell's named test and fixture, each clause's milestone and provider,
  each bar against a correct build, law 1's invariants against §5.3's row and T110-4
- [x] P5 report, result file, LANDED

## Part 1 — the round-6 findings of this lens, re-checked against the live text

Every finding below is closed as Part H ruled it. Two of the clauses it fixed now carry a J149 defect of their own,
raised new in Part 2 (VF7-TST-02, VF7-TST-03).

| id | sev | ruled | verdict | evidence (live text) |
|---|---|---|---|---|
| VAT6-r6-01 | major | FIX per R7-06 (b); E-V4-5 | **fixed** | T-V4-63's bar (V04 l. 3164) reads R7-06 (b)'s one wording through §2.7's laws, law 1 (8): a `collapsed` vault under a fallen span passes. |
| VAP-r6-04 | major | FIX per R7-06 (b); E-V6-10 | **fixed** | T-V6-64 (V06 l. 4225) takes the same wording, citing V04 §3.5.4 (d). |
| VV34-r6-01 | minor | FIX; E-V4-5 | **fixed** | T-V4-63's `use`-edit and frame clauses read "none in a span §2.7's laws read `open`" and "that §2.7's laws read `vault`". |
| VV34-r6-04 | minor | FIX | **fixed** | V04 §8's U5 cell (l. 3218): T-V4-63's epoch clauses at V06's E8. |
| VAT6-r6-03 | minor | FIX per R7-06; E-V6-11 | **fixed** | V06 §8's E3 and E8 cells (l. 4269, 4274) move T-V6-11's and T-V6-47's arch-vault clauses and the sweep's C6 runs to E8, the `topple` runs to E5. |
| VEL6-r6-02 | major | FIX per R7-06; E-S6 | **fixed** | T110-2 (6) (l. 19473–19480) runs row W3 over the state sweep, New random meeting a `cleared` ring and a `ruined` stump. |
| VM-R6T-02 | major | FIX per R7-04, R7-06; E-S6, E-S7 | **fixed** | (1) as VEL6-r6-02; (2) T110-2 (8) (l. 19503–19511): the dry run reads the span `vault`, the vault laid again with its id, with the intervallum and moat runs. |
| VAF-R6T-03 | major | FIX per R7-06; E-S3 | **fixed** | T110-2 (3) (l. 19342–19347): the castle's internal paths after a placement-locked aqueduct across the bailey. |
| VAP-r6-01 | major | FIX per R7-02, R7-06; E-S4, E-S7, E-V6-8 | **fixed** | T110-2 (4) (l. 19374–19389) runs the hand rows over the sweep, placement-locked and pinned; (8) over the sweep (l. 19511); T-V6-47's `wallToWay` locked and pinned; W4·C8, W10·C8 name T110-2 (4)·S (l. 3332, 3338). |
| VAP-r6-02 | minor | FIX per R7-06; E-S4, E-S7 | **fixed** | The hand rows and `wallToWay` over the state sweep (as above). |
| VCS-r6-01 | major | FIX, amended; E-S4 | **fixed** | T110-2 (4) (l. 19404–19413): a standing aqueduct and a declared viaduct re-shaped across a placement-locked ring; the viaduct's drag bent back, else refused; a 3 m nudge keeping its crossing. |
| VCS-r6-02 | major | FIX; E-S6 | **fixed** | T110-2 (6) (l. 19465–19471): "under a span, never at a support, S3's pull treating the aqueduct's standing supports as impassable where its channel runs above the ring's top", merged on the variant. |
| VCS-r6-03 | minor | FIX per R7-06; E-S10 | **fixed** | §13.8's T110 row (l. 20377): every arch-vault clause at the later of its milestone and U3, epoch ones at the later of U5 and E8. (Other providers of the sweep's states: VF7-TST-05.) |
| VV56-r6-01 | major | FIX (R7-04 (a)) | **fixed** | V05 §3.16 (4)'s raised row (l. 1342), T-V5-14's states (l. 2567–2572), V06 §3.19.2 (4) (l. 2963). |
| VV56-r6-03 | minor | FIX per R7-06; E-V6-3, -7, -8 | **fixed** | T-V6-73 (row W5), T-V6-11 (rows W8, W4) and T-V6-47 (row W6) each over the state sweep. |
| VV56-r6-04 | minor | FIX; E-V6-8 | **fixed** | T-V6-47's script fells "the span beyond one of its supports" before clearing it, and adds the cells'-order clause. (The base clause's own script: VF7-TST-07.) |
| VCS-r6-04 | minor | FIX; E-V6-8 | **fixed** | T-V6-47 carries the repair and the cells'-order clauses of T110-2 (7). |
| VV56-r6-05 | minor | FIX | **fixed** | H-AQUA (V06 l. 4094–4097): the seed searched so that both spans read `vault`. |
| VV56-r6-06 | minor | FIX; E-S2 | **fixed** | T-V6-73 and T110-2 (2) (l. 19292–19293): `raised.waited` at each CITY and METROPOLIS epoch while the CITY ring's trace stands. |
| VAL-R6-06 | minor | FIX per R7-06; E-V7-1 | **fixed** | T-V7-48 (V07 l. 3708): the CITY fixture handed down over the state sweep (row W9). |
| VV78-r6-01 | minor | FIX per R7-06; E-V7-1 | **fixed** | T-V7-48: `W_RAISED_CROSSING` once per crossing; the hand-off states. |
| VV78-r6-02 | minor | FIX per R7-06; E-V7-3 | **fixed** | V07 ## 8's V-M3 cell, T-V7-48's tier cell and §1 (14) (l. 193–196, 3708, 3762). (Its epoch arch-vault clauses: VF7-TST-06.) |
| VM-R6T-03 | minor | FIX | **fixed** | W11·C2 names T110-2 (4), T-V4-63 (l. 3339). |
| VAF-R6T-02 | minor | FIX | **fixed** | Row (a)'s test cell names T-V1-51 (c) (l. 2911). |
| VAT-r6-04 | minor | FIX | **fixed** | T-V9-52 reads "with `bend.raised.underSpan` in its wall form" (V09 l. 4427). The clause it touched now asserts an outcome law 1 (5) does not always give: VF7-TST-02. |
| VEL6-r6-01 | major | FIX per R7-05 | **fixed** | T-V10-41 (V10 l. 3156) on T110-2 (3)'s c14 fixture, the arch vault from U3, the reading alone before it. |
| VDC6-02 = VPC-r6-05 | minor | FIX per R7-07 | **fixed** | T110-2 (3) (l. 19347–19348): each crossing counted once in S7's `W_RAISED_CROSSING`, each stopped channel once in S3's or S5a's. |
| VAT-r6-02 = VV910-r6-01 | major | FIX per R7-02 | **fixed** | T110-2 (4) (l. 19378–19382) and T-V9-52 run the slid gate back to the edge its grip came from. |
| VEL6-r6-04 | major | FIX per R7-02 | **fixed** | T110-2 (4) (l. 19390–19394): a hand wall along beneath, on one side, ending at a support, each moved to the strip's edge. |
| VAL-R6-01 = VEW-r6-02 | major | FIX per R7-02 | **fixed** | T110-2 (4) (l. 19394–19404) and T-V4-80 (i) run the placement-locked arch vault and the held building. T-V4-80 (i)'s crossing words predate J149: VF7-TST-03. |
| VAT6-r6-02 | major | FIX per R7-04 (c); E-S8 | **fixed** | T110-2's frame clause (l. 19213–19220): bent to a fitting course, else kept with its pier in the water, `raised.extendedPastBound`. |

## Part 2 — findings

Severity counts: **4 major, 9 minor, 0 blocker.**

### VF7-TST-01 — major — TEST-FAILS-CORRECT-BUILD — owner scope (with V07)

**Claim.** The bent-group sentence's (i) puts a stretch's crossing of a road deck's ramp, stair or foot at "the nearer,
by law 3, of the first lawful crossing under its deck and the one beyond the foot" (ARCHITECTURE l. 3194–3196). That is
law 2 (a): a stroke or a costless rule's line "takes the lawful shape law 3 picks nearest it" (l. 2808–2811), with
law 3's key (2) measuring a crossing "along the deck line it crosses" (l. 2846–2849). Two bars fix one of the two
outcomes whatever the geometry:
- T110-2 (4) (l. 19366–19367): "and one across a viaduct's ramp — bent beyond its foot through a gate on the carried
  way's ground course (§2.7's laws, law 1 (4))".
- T-V7-48 (V07 l. 3708): VS3's palisade "bent to pass beyond each ramp's foot". VS3's line is a costless rule's, so
  law 3 picks it too.

Neither fixture says where the stroke or the planned palisade crosses the ramp. Where it crosses nearer the deck's first
span than the foot, a correct build crosses under the deck, and both bars fail it. The clause dates from round 6. PRB7D-LCK-20
corrected (i) and E-D3 to law 3, but no END reached these two bars.

**Required change.**
- §13.2 T110-2 (4): "and one across a viaduct's ramp — bent beyond its foot through a gate on the carried way's ground
  course (§2.7's laws, law 1 (4)) —" → "and one across a viaduct's ramp nearer its foot than the deck's first lawful
  crossing — bent beyond its foot through a gate on the carried way's ground course —, and, on a second run, one across
  that ramp nearer the deck — bent under the deck's first span clear of the ramp (§2.7's laws, law 1 (4), law 2 (a),
  law 3) —".
- V07 T-V7-48: "and bent to pass beyond each ramp's foot," → "and, where it crosses a ramp, bent to the nearer by law 3
  of the first lawful crossing under the deck and the one beyond the ramp's foot (§2.7's laws, law 1 (4), law 3; its
  worked example the bent-group sentence (i)),".

### VF7-TST-02 — major — TEST-FAILS-CORRECT-BUILD — owner V09

**Claim.** T-V9-52 (V09 l. 4427) says: "an aqueduct drawn across a wall drawn by hand crosses it in the form its level
there gives (§2.7's laws, law 1 (2)) with no `refuse.locked`, and a road drawn across that wall there crosses it clear of
the strip, with `bend.raised.underSpan` in its wall form". The aqueduct's level is not fixed by the fixture.

By law 1 (5), a gate may stand "in an aqueduct's crossing law 1 (2) reads over whose every span over it clears its top"
(ARCHITECTURE l. 2722–2723). The way-and-channel table's row (b) moves a way's crossing of a trace only where the laws
bar a gate: "in a road deck's under-deck strip, or in an aqueduct's unless its arches there clear the gate and the wall
and the way passes the strip by the crossing rule" (l. 2912). Law 2 (a) keeps the value the user set when it is lawful
(law 3's key (1), l. 2843).

So on a fixture whose aqueduct crosses over, a road drawn square under a span that clears the gate and the wall gets
its gate under the arch, with no bend, and the bar fails that correct build. This is the J149 class Part H's head says
must be conformed in the live words of every bar an END line appends to (E-V9-2 appends to T-V9-52). VAT-r6-04's "in
its wall form" landed, but the clause was never conformed to J149.

**Required change.** T-V9-52: "and a road drawn across that wall there crosses it clear of the strip, with
`bend.raised.underSpan` in its wall form;" → "and a road drawn across that wall there — on a variant whose aqueduct
crosses merged there, or whose arch over the road clears the wall but not the gate's top — crosses it clear of the strip,
with `bend.raised.underSpan` in its wall form, and, where the crossing is over and the arch clears the gate and the wall,
a road drawn square under that span makes its gate under the arch, no bend (§2.7's laws, law 1 (2), (5), law 2 (a); its
worked example the way-and-channel table's row (b));".

### VF7-TST-03 — major — TEST-FAILS-CORRECT-BUILD — owner V04

**Claim.** T-V4-80 (i) (V04 l. 3181) runs a declared placement seated in an aqueduct's `vault` span and locked by the
user. Its fixture is "a CITY fixture whose aqueduct's `vault` span holds a locked arch vault", with no level given. It
asserts "the circuit crossing under another span and the hand `drawWall` moved to cross under the nearest span clear of
the building's widened strip".

By law 1 (2) (l. 2703–2711) the crossing takes the aqueduct's level:
- **merged**, where the channel runs within the wall's height, the band built round "the aqueduct's arch or pier".
  There the epoch circuit (a search, law 2 (a)) may lawfully cross at a pier, and the hand stroke's nearest lawful
  crossing (law 3) may be at a pier.
- **over**, where the channel runs above the wall's top, which needs every span over the band to clear the wall's top.
  There "the nearest span clear of the building's widened strip" may be a low span the laws bar.

Either way the bar can fail a correct build. The base's own clause for the same case was conformed by E-S4: "the circuit
crossing the deck line clear of that span's strip at the aqueduct's level … a hand `drawWall` across that span moved
along the deck line to the nearest crossing clear of the building's widened strip" (T110-2 (4), l. 19397–19403).
T-V4-80 (i) kept E-V4-4's pre-J149 words, against Part H's head's one rule for the live words of a bar an END line
appends to.

**Required change.** V04 T-V4-80 (i): "the circuit crossing under another span and the hand `drawWall` moved to cross
under the nearest span clear of the building's widened strip (§2.7's laws, law 1 (9))" → "the circuit crossing the deck
line clear of that span's strip at the aqueduct's level and the hand `drawWall` moved along the deck line to the nearest
crossing clear of the building's widened strip (§2.7's laws, law 1 (2), (9), law 3)".

### VF7-TST-04 — major — CHECK-FAILS-CORRECT-BUILD — owner model (with scope)

**Claim.** The order fields `Enceinte.laidAt` and `RaisedWayRecord.courseAt` "are record fields: hashed with their
records (§6.2)" (ARCHITECTURE l. 2304). §6.2's leaf hashes every attribute (l. 10338), so they sit in the model digest.
Their `seq` is "the laying event's place in §2.7's laws' order: a creation prefix's declarations, then a generation run's
or a regeneration's stages, then each later event" (l. 2303; *Order*, l. 2668–2685). Two family bars compare model
digests or bytes across exactly the ops that move a line's place in that order.

(a) **Regeneration.** *Newer* makes every structure a regeneration keeps "older than every stage, keeping its date, one
it lays again taking the stage's" (l. 2762–2765). Law 1 (3) reads the stored fields (l. 2714–2718), and W3·C2 needs a
ring re-derived after a kept road deck to pass beneath it (l. 3331). For that, a regeneration's stages must take the
regeneration event's own place, after everything it keeps.
- Read so, every ring a Regenerate (keep) lays again writes a new `laidAt`. T110-2 (6)'s bar "with its aqueduct
  placement-locked, regenerated (keep): the routes, the ring, its strips, band, towers and gates byte-identical"
  (l. 19461–19463) then fails a correct build.
- Read instead as the type comment lists it (a regeneration's stages in the generation run's slot), the bytes match. But
  a ring New random lays across a road deck kept from a later event stores a `laidAt` below that deck's `courseAt`. §5.3's
  law-1 row (l. 9928), reading the stored fields for law 1 (3), then fails the build that passes the ring beneath the
  deck as *Newer* and W3·C2 say.

On either reading a family check fails a correct build.

(b) **Skeleton round trip.** T110-4 (c) asks "each skeleton exported and re-imported reproducing its source's model
digest where no declaration on the source met a generated structure laid before it" (l. 19539–19542). Its sources are
the bar's own randomised sequences, with hand ops after the generation. A skeleton re-imports every declaration as the
new document's creation prefix (§2.9, l. 3911–3914; §11.1's skeleton row, l. 16706). So a declaration the source made
after its generation moves ahead of the generation in the order, and the `seq` of every line it and the generation laid
is renumbered. The re-import's digest then differs from the source's wherever a wall or a raised way stands, even where
nothing meets. PRB7D-LCK-19 limited the bar to cases with no meeting, but the stored order values change without one.

**Required change.**
- §2.7 (l. 2304; E-M2's sentence): "`Enceinte.laidAt` and `RaisedWayRecord.courseAt` are record fields: hashed with their
  records (§6.2)," → "`Enceinte.laidAt` and `RaisedWayRecord.courseAt` are record fields outside the model digest and
  inside the records digest (§6.2), as a `DerivationRecord` is — so a line a regeneration lays again where it stood, or a
  declaration a skeleton's import moves into the creation prefix, re-dates its `seq` without moving the model digest —,".
- §2.7's laws' *Order* (l. 2668–2671): "then a generation run's, a regeneration's or a village derivation's steps in the
  order it runs them" → "then a generation run's or a village derivation's steps, or a regeneration's at its own event's
  place after every structure it keeps (*Newer*), in the order it runs them". The `Order` type comment (l. 2303) is
  conformed in the same words.
- §13.2 T110-2 (6): "byte-identical" → "byte-identical in the model digest (§6.2), the ring's `laidAt` taking the
  regeneration's order (§2.7's laws' *Order*, *Newer*)".

### VF7-TST-05 — minor — SCHEDULING — owner scope

**Claim.** Three groups of T110-2 clauses are scheduled before their providers (INDEX §5 risk 2; R5-05 (c); R6-09's
class).

(a) T110-2 (4)'s "epoch `shiftCourse` that would carry the ring's river crossing into the viaduct's fixed-place zone …
counted in `walls.waited`" (l. 19435–19440) needs the epoch's terrain candidates, which issue a `shiftCourse`. They land
at V06's E5 ("the terrain candidates and the oxbow", V06 l. 4271; W17). §13.8 (l. 20377) runs (4)'s epoch clauses "on
volume 6's engine with M6-E's E2 and E3", and T-V6-47, which "takes" (4), does not carry the clause.

(b) Three sets of clauses need providers that land after M3a:
- The state sweep's C3–C5 states are made by `DeclineOp`'s `breach` and `dismantle`. The decline hooks land at M4
  (§16 l. 21311; T8-1 at M4, l. 20380).
- C10 is made by `repairRaised`, and C12 by a frame growth: V06's EvolveOp at E3 (V06 l. 716–735) and M4's growth path.
- T110-2 (4)'s hand rows W4 (`convert` `breach`/`dismantle`), W5 (`wearWall`, `neglect`) and W10 (`repairWall`) are
  M4's and V06's E3 ops.

§13.8 still runs the regeneration clause (6) over the sweep, and (4)'s hand rows, at M3a. It names a later exit only for
the epoch clauses, the `topple` runs and the arch-vault clauses.

(c) T110-4's schedule (E-S14, l. 20377) puts "an epoch at M6-E's E3, its hazards at E5". The silting and water ops among
law 4's list are E5's terrain candidates and are not named.

Nothing built changes.

**Required change.** §13.8's T110 row, after "… at the later of their milestone and M6-E's E5, which builds the hazards,"
add "the state sweep's other states in a clause scheduled before them — C3 – C5 by `DeclineOp` (M4), C10 by
`repairRaised` and C12 by a frame growth (M4; V06's E3) — and (4)'s hand rows W4, W5 and W10 (M4; V06's E3) at the
later of their milestone and those providers, (4)'s epoch `shiftCourse` clause at M6-E's E5, which builds the terrain
candidates,". In T110-4's runs: "its hazards at E5" → "its hazards and water ops (a silting, a `shiftCourse`) at E5".

### VF7-TST-06 — minor — SCHEDULING — owner V07

**Claim.** V07 ## 8's V-M3 cell (l. 3762) runs "T-V7-48's … runs with a `vault` span breached and its arch-vault clauses
at the later of that exit and V04's U3". Several of T-V7-48's arch-vault outcomes follow a village epoch's wall event:
- the REPLACEMENT under the declared aqueduct, run over the state sweep as row W14 at a village, where each `vault` span
  its new band meets is read `open` and each it leaves is laid again;
- the hand `absorbWall` of the palisade, whose last `dismantle` lays the chamber again (row W8).

Those outcomes are the epoch's reconcile over `EpochScope.raised`, which V06's E8 (`under.extend`) and V04's U5 build.
§13.8's rule for every such run is "the later of M6-U's U5 and M6-E's E8" (l. 20377). V07 §1 (14) (l. 193–196) lists no
E8 step. Nothing built changes.

**Required change.** V07 ## 8's V-M3 cell: "and its arch-vault clauses at the later of that exit and V04's U3 (risk (8))"
→ "and its arch-vault clauses at the later of that exit and V04's U3 — those whose arch-vault outcome follows a village
epoch's wall event (the REPLACEMENT's, the `absorbWall`'s and the sweep's epoch C6 runs) at the later of that exit, V04's
U5 and V06's E8 (risk (8))"; V07 §1 (14) adds "and for those clauses the epoch's arch-vault reconcile (V06's
`under.extend`, E8)".

### VF7-TST-07 — minor — FIXTURE-SCRIPT — owner scope (with V06)

**Claim.** `DeclineOp` dismantles "a ruined span's rubble or a support whose spans are both down" and breaches only a
span (l. 9401). V06 §3.19.2 (3) clears a support only once both its spans have fallen. Three scripts ask for states that
op cannot make:
- T110-2 (7) (l. 19488–19489): "a span over the band `ruined`, a support by the band `cleared` and a `vault` span over
  the trace breached". The span over the band is the one over the trace (no standing support stands in an over
  crossing's band), so the cleared support's other span is never felled. T-V6-47, which runs (7), was fixed by VV56-r6-04
  ("then the span beyond one of its supports breached"), but the base clause kept the old script.
- T110-2 (7)'s and T-V6-47's cells'-order clauses (l. 19494–19500; V06 l. 4208): "after a support there was `cleared`"
  and "after a support by its planned line was `cleared`", with no second span felled.
- The sweep's C5 on a raised way the clause locks: "or by hand `convert`s: a `breach` of both spans, then of the support"
  (l. 19240–19241). No `DeclineOp` ruins a support; only a `topple` or a landfall does.

**Required change.**
- T110-2 (7): "a span over the band `ruined`, a support by the band `cleared`" → "a span over the band `ruined`, then the
  span beyond one of its supports `ruined` and that support, both its spans fallen, `cleared`".
- T110-2 (7) and T-V6-47's cells'-order clauses: "after a support there was `cleared`" → "after a support there was
  `cleared`, both its spans fallen first", and "after a support by its planned line was `cleared`" → "after a support by
  its planned line was `cleared`, both its spans fallen first".
- The sweep's C5: "(by the `topple`, or by hand `convert`s: a `breach` of both spans, then of the support)" → "(by the
  `topple`)".

### VF7-TST-08 — minor — RESTATEMENT — owner V04

**Claim.** T-V4-63's frame-growth clause (V04 l. 3164) restates §2.7's support step (7) as it stood before E-M1's pass-7
change: "the span from the old deck's last interior station (with none, its one span) re-derived with the extension".
(7) now keeps an old end span that a wall-like structure crosses: "or, wherever a wall-like structure crosses the old end
span, from the old foot's point, that span kept as it stands (these laws, law 2 (c))" (ARCHITECTURE l. 3349–3352).
T-V4-63's fixture ("an aqueduct whose deck an epoch's frame growth extends") has no wall over its end span, so the bar
passes a correct build there. But the clause restates (7) rather than citing it.

**Required change.** T-V4-63: "the span from the old deck's last interior station (with none, its one span) re-derived
with the extension —" → "the extension laid on as §2.7's support step (7) says (from the old deck's last interior
station, or the old foot's point where a wall-like structure crosses the old end span) —".

### VF7-TST-09 — minor — BAR-COVERAGE — owner scope

**Claim.** Two of law 4's sentences are not asserted by T110-4 (c) (l. 19521–19542), the bar that "makes a missing
example harmless" (l. 2889).
- **Redo.** Law 4 gives a redo one outcome: "its event's exact inverse or re-application, never bent: where law 1 would
  not then hold it is refused" (l. 2862–2865). T110-4 (c) runs "each hand op undone on a second run" (l. 19531) and never
  redoes one. §7.4's general Independence check refuses most such redos anyway (l. 12002–12010: a redo "checked the same
  way against the live events after its undo"), so this is graded minor.
- **(G2) on an op's own part.** (G2) shows the reshape of "a placement-locked part of the op's own (an arch vault)"
  (l. 2865–2869). T110-4 (c) asserts only "each reshape of a placement-locked structure other than the op's own shown"
  (l. 19532–19534).

A lock's behaviour under a redo stays round 8's (J150).

**Required change.** T110-4 (c): "each hand op undone on a second run" → "each hand op undone, and then redone, on a
second run"; "each undo restoring the prior digest, or refused `refuse.undo.dependent` …" → "each undo and redo restoring
the prior digest or re-applying its event's, or refused `refuse.undo.dependent` … (a lock's behaviour under either
outside this bar, J150)"; "each reshape of a placement-locked structure other than the op's own shown" → "each reshape
of a placement-locked structure, part or way other than the op's own target, and of a placement-locked part of the op's
own (an arch vault), shown".

### VF7-TST-10 — minor — FIXTURE — owner scope

**Claim.** T110-4 (a) adds "a CITY ring an aqueduct crosses merged (its channel within the ring's height, a pier in the
band)" (l. 19518–19520) but names no fixture for it. A pier can stand in the band only where the ring is laid after the
aqueduct, because the support step's (3) keeps a new aqueduct's stations off a standing band (l. 2542–2549). So
T110-2 (1)'s merged variant, whose aqueduct S6 lays after the ring, has no pier in the band. The fixture that holds the
case is T110-2 (6)'s New random on (1)'s merged variant, its seed searched so that the boundary meets a support
(l. 19465–19471).

**Required change.** T110-4 (a): "and on a CITY ring an aqueduct crosses merged (its channel within the ring's height, a
pier in the band)" → "and on T110-2 (6)'s New random of (1)'s merged variant, its new ring crossing the kept aqueduct
merged at a support (its channel within the ring's height, a pier in the band),".

### VF7-TST-11 — minor — CELL-TEST — owner model

**Claim.** Two cells name tests that do not hold their case.
- W1·C8's village path names "T-V7-48 (V: its declared raised ways)" (l. 3329). Since J147, a declared raised way holds
  nothing unless locked (law 1's *held*, l. 2651–2658). T-V7-48 (V07 l. 3708) locks neither its declared viaduct nor its
  aqueduct at a village derivation, so it never runs C8 there. T110-4 (c)'s village rung, with one raised way
  placement-locked, does.
- Row (d)'s test cell names only T110-2 (2) (l. 2914). Its ramp case ("one whose crossing falls on a ramp, stair or foot,
  pinned by S5a at the first point beyond the foot … is a gate and one of `c`") is run by T110-2 (3) (l. 19319–19322).

**Required change.** W1·C8: "T-V7-48 (V: its declared raised ways)" → "T110-4 (c) (V: its village rung, a raised way
placement-locked)". Row (d)'s test cell: "T110-2 (2)" → "T110-2 (2), (3)".

### VF7-TST-12 — minor — WORDING — owner scope

**Claim.** T110-2 (4) (l. 19423–19426) runs "an epoch circuit and, on a second run, an epoch contraction whose planned
water gate and anchor fall in the declared viaduct's fixed-place zone — each moved along the river or the barrier's edge
clear of the zone with its tower, the trace laid to it, counted in neither `walls.waited` nor `walls.raisedCrossings`".
*Reported* counts at an epoch "once per crossing of a trace laid after a raised way with that raised way's deck line" in
`walls.raisedCrossings` (l. 3157–3160), a move being no count. A circuit that also crosses the viaduct's deck line is
counted. Read as "the epoch's `walls.raisedCrossings` is 0", the bar fails that correct build. Read as "the move is not
counted", it holds.

**Required change.** T110-2 (4): "counted in neither `walls.waited` nor `walls.raisedCrossings`" → "the move counted in
neither `walls.waited` nor `walls.raisedCrossings` (each crossing of the viaduct's deck line the trace makes counted as
§2.7's crossing table's *Reported* says; §2.7's laws, law 4)".

### VF7-TST-13 — minor — TAKE-OVER — owner V06 (with scope)

**Claim.** The base's runs sentence (l. 19548–19550), the take-over row (l. 19796) and V06 §7's T110-2 row (V06 l. 4151)
have T-V6-47 take "T110-2's epoch clauses (4), (5), (7) and (8)". T-V6-47 (V06 l. 4208) does not carry several of (4)'s
epoch clauses, which this round added (l. 19394–19440):
- the circuit under a placement-locked arch vault, with the held building's second run (T-V4-80 (i) carries it, at E8);
- the circuit across two raised ways whose strips lie within a band's width;
- the circuit and contraction whose water gate and anchor fall in the viaduct's fixed-place zone;
- the table-edit circuit waiting (`walls.waited`);
- the epoch `shiftCourse`.

This is VCS-r6-04's class. In addition, V06 §7's T110-2 rows (l. 4151–4152) still read "each run again locked and
pinned, *beneath* (§2.7's crossing table)", "(*over the band*, the gap left a gap)" and "(*down before the wall*)". They
do not use Part H's head's citation "§2.7's laws, law n; its worked example …", and "locked" predates J147's "placement-
locked". Nothing built changes: the base clause still states the cases and is scheduled on V06's engine.

**Required change.**
- V06 §7's first T110-2 row: "each run again locked and pinned, *beneath* (§2.7's crossing table)" → "each run again
  placement-locked and pinned, met by §2.7's laws (law 1 (2)–(9); its worked example *beneath*)". Its last cell adds "; the
  epoch circuit under a placement-locked arch vault and with a held building (T-V4-80 (i), at E8), and (4)'s other epoch
  clauses — two raised ways, the fixed-place zone, the table-edit wait, the epoch `shiftCourse` at E5 — as T110-2 (4)
  states them".
- The second row: "(*over the band*, the gap left a gap)" → "(§2.7's laws, law 1 (2); its worked example *over the
  band*, the gap left a gap)", and "(*down before the wall*)" → "(§2.7's laws, law 1 (3), law 2 (c); its worked example
  *down before the wall*)".
- The base's runs sentence: "Volume 6 runs T110-2's epoch clauses (4), (5), (7) and (8) on its engine (T-V6-47)" →
  "Volume 6 runs T110-2's epoch clauses (4), (5), (7) and (8) on its engine (T-V6-47; (4)'s arch-vault circuit by
  T-V4-80 (i))".

## Part 3 — held for round 8 (outside the family, not graded)

- §13.2 T101-4 (l. 19103–19104), §6.5 (9) (l. 10918–10919), §11.1's skeleton row (l. 16706): "a map's declared subset
  exported as a skeleton and re-imported under its seed reproduces its model digest". For a source whose declarations
  followed its generation, the lifecycle event block in the model digest's identity layer (each entry's `seq` the causing
  event's, l. 3681–3683; §6.2 l. 10352) also changes when the import makes them a creation prefix. The general round trip
  holds as worded only for a source whose declarations stand in its creation prefix.
- §7.1's Regenerate (keep settings) "byte-identical when nothing upstream changed" (l. 11069–11070) and §7.3 item 7 (iv),
  (vi) (l. 11779, 11797–11798): which digest the byte identity compares is not stated. A re-derived scope writes
  lifecycle entries citing the regenerate event's `seq` (l. 3681–3683), and, until VF7-TST-04 lands, the family's order
  fields.

## Verdict for this lens

The round-6 test findings are all closed as Part H ruled them: the state sweep is defined once and named by every "·S"
cell, the arch-vault bars take one wording, the fixtures hold their `vault` spans, and the scheduling cells name their
later exits. The laws' runtime row (§5.3, l. 9928) cites law 1 (1)–(11) whole, and T110-4 runs it on every path. So no
invariant of law 1 is checked by no bar. Four bars, however, fail a correct build:
- two keep a pre-law outcome where law 3 or J149's level picks another: the ramp crossing in T110-2 (4) and T-V7-48
  (VF7-TST-01), and T-V4-80 (i)'s "under another span" (VF7-TST-03);
- one keeps a pre-J149 keep-clear where law 1 (5) admits a gate under a clearing arch: T-V9-52's road (VF7-TST-02);
- the family's new order fields, hashed into the model digest, defeat T110-2 (6)'s byte identity across a Regenerate
  (keep) and T110-4 (c)'s skeleton round trip, while *Order* leaves open where a regeneration's stages stand
  (VF7-TST-04).

The minors are scheduling cells that miss a provider (M4's `DeclineOp`, E3's repairs, E5's water ops, E8's epoch
reconcile), state scripts that ask an op for a state it cannot make, one restatement of (7), T110-4's missing redo and
own-part (G2), and cells or take-over lists naming tests that do not hold their case. Each fix is a test, schedule or
citation edit. Only VF7-TST-04 touches a law's text, and it changes no outcome.
