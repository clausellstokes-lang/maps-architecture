# Family verify — tests, fixtures and milestones, after the fix pass (coherence/famverify-tests-r7v)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/famverify-tests-r7v, 2026-10-02; covered by
> the whole-design retrovalidation (J84). One of the six family-focused checks of round 7 after its fix pass
> (assemble-r7v): raised ways (viaducts, elevated roads, aqueducts, their arch vaults) meeting walls of every kind,
> checked through one lens — the tests the family's cells and sentences name, the fixtures they run on, and the
> milestones that schedule them. Grading is J141's as the owner applies it in J146 and J151: MAJOR only where the laws
> give a case no lawful outcome, an outcome breaking an owner rule or a law-1 invariant, leave a law-1 invariant checked
> by no bar, or make a check or a named test fail a correct build; a case whose every outcome is lawful is a minor VALID
> CHOICE. Nothing J150 hands to round 8 is reported (the two-axis lock and its readers outside the family; a lock's
> behaviour under an undo, a redo, a re-grade or value edit within a standing meeting, or a repair). No design text was
> changed; no state-changing git command was run.

PROGRESS (lane `coherence/famverify-tests-r7v`, 2026-10-02, cloud checkout)
- [x] P0 resume check: no report and no CHECKPOINT of this seat — fresh start
- [x] P1 read whole: the brief; `adjudication-r7.md` Part L (terms, laws 1–4, the check, the seven corrections, the
  restated veto list), R7-06, Part H's head and E-S7; `adjudication-r7v.md` whole (its 50 decisions, Part H by unit, the
  builders' choices, the held list); `famverify-tests-r7.md`; `assemble-r7v.md`; PROGRESS J144 – J151 as the brief
  restates them
- [x] P2 the live text of the lens (base `docs/ARCHITECTURE.md` unless a volume is named): §2.7 the order fields
  (l. 2273, 2301–2304), the laws (l. 2579–2891), the worked examples and both tables (l. 2893–3357), the support step's
  (7) (l. 3359–3382); §5.3's law-1, gate and distance rows (l. 9940, 9950–9951); §6.2 (l. 10376–10405); §7.1 *Raised
  ways* (l. 11140–11150); §8.11 T-ER-12 (l. 15480); §11.6 (no family row); §13.2 T101-4, T106-3, T110-1 – T110-4 with
  the state sweep, the runs sentence (l. 19207–19604), T114-3 (l. 19641–19648), the take-over row (l. 19850); §13.5's
  towers-and-gates row (l. 20113); §13.8's T110 and T114 rows (l. 20431, 20442); §16 M3a; INDEX §5 risk 2; V01 T-V1-51
  (V01 l. 3355); V04 §3.5.4 (d), T-V4-62, -63, -80, -82, §8's U3 and U5 cells (V04 l. 1695–1718, 3163–3164, 3181, 3183,
  3215, 3218); V05 T-V5-14 (V05 l. 2555–2579); V06 H-AQUA, §7's take-over rows, T-V6-11, -47, -48, -61, -64, -73, §8's
  E3, E5 and E8 cells (V06 l. 4101–4122, 4163–4164, 4184–4246, 4281–4286); V07 §1 (14), §3.5a, §3.12 item 7, T-V7-48,
  T-V7-51, ## 8's V-M3 cell (V07 l. 190–197, 1567–1636, 2627, 3710, 3713, 3764); V09 T-V9-52 (V09 l. 4428); V10
  T-V10-41 (V10 l. 3156)
- [x] P3 the thirteen round-7 findings of this lens re-checked against the live text (Part 1)
- [x] P4 the laws attacked through the lens: every cell's named test and fixture, every clause's milestone and provider,
  every bar against a correct build, law 1's invariants against §5.3's row and T110-4 (Part 2)
- [x] P5 report, result file, LANDED

## Part 1 — the round-7 findings of this lens, re-checked against the live text

| id | sev | ruled (adjudication-r7v) | verdict | evidence (live text) |
|---|---|---|---|---|
| VF7-TST-01 | major | FIX; END V07 | **partly fixed** | T-V7-48 (V07 l. 3710) now reads "bent to the nearer by law 3 of the first lawful crossing under the deck and the one beyond the ramp's foot" — fixed. T110-2 (4) (l. 19389–19392) now splits two runs, but its first run is placed "nearer its foot than the deck's first lawful crossing", a measure law 3 does not use: a fixture meeting those words can still fail a correct build. The major persists (Part 2). |
| VF7-TST-02 | major | FIX | **fixed** | T-V9-52 (V09 l. 4428): the merged and low-arch variants cross clear of the strip; "where the crossing is over and the arch clears the gate and the wall, a road drawn square under that span and passing the strip by §4.3's crossing rule makes its gate under the arch, no bend". |
| VF7-TST-03 | major | FIX | **fixed** | T-V4-80 (i) (V04 l. 3181): "the circuit crossing the deck line clear of that span's strip at the aqueduct's level and the hand `drawWall` moved along the deck line to the nearest crossing clear of the building's widened strip (§2.7's laws, law 1 (2), (9), law 3)". |
| VF7-TST-04 | major | FIX (END-L2); ENDs determinism, scope | **fixed** | The order fields sit outside the model digest and inside the records digest (l. 2304; §6.2 l. 10382–10384, 10397–10399); *Order* no longer gives a regeneration the generation run's slot (l. 2670–2671; the type comment l. 2303); T110-2 (6) "byte-identical in the model digest (§6.2), the ring's `laidAt` taking the regeneration's order" (l. 19497–19499); T110-4 (c) "one model digest and one records digest on two hosts" (l. 19582). |
| VF7-TST-05 | minor | FIX | **fixed** | §13.8's T110 row (l. 20431) schedules the sweep's C3 – C5, C10 and C12 states, (4)'s hand rows W4, W5 and W10, and (4)'s epoch `shiftCourse` at their providers; T110-4's "hazards and water ops (a silting, a `shiftCourse`) at E5". |
| VF7-TST-06 | minor | FIX | **fixed** | V07 ## 8's V-M3 cell (V07 l. 3764) and §1 (14) (V07 l. 196–197) name U5 and E8 for the arch-vault clauses that follow a village epoch's wall event. |
| VF7-TST-07 | minor | FIX; END V06 | **fixed** | T110-2 (7) (l. 19533–19534: "then the span beyond one of its supports `ruined` and that support, both its spans fallen, `cleared`"); both cells'-order clauses "both its spans fallen first" (l. 19541, 19545; V06 l. 4220 twice); C5's hand route "a `breach` of both spans, then a `dismantle` of the support" (l. 19258–19259). |
| VF7-TST-08 | minor | MERGED into VF7-EPO-03 | **closed by a ruling (fixed)** | T-V4-63 (V04 l. 3164): "save one a wall-like structure crosses, kept as it stands and the extension laid on from the old foot's point (§2.7's support step (7); §2.7's laws, law 2 (c))". |
| VF7-TST-09 | minor | FIX | **fixed** | T110-4 (c) (l. 19581–19592): each hand op "undone, and then redone"; the own-part (G2) clause; "each undo and each redo restoring the prior digest or re-applying its event's … (§2.7's laws, law 4; a lock's behaviour under either outside this bar, J150)". |
| VF7-TST-10 | minor | FIX | **fixed** | T110-4 (a) (l. 19566–19570): "on T110-2 (6)'s New random of (1)'s merged variant, its seed searched so that the new ring's boundary meets one of the kept aqueduct's supports". |
| VF7-TST-11 | minor | FIX | **partly fixed** | Row (d)'s test cell reads "T110-2 (2), (3)" (l. 2916) — fixed. W1·C8 now names "T110-4 (c) (V: its village rung, a raised way placement-locked)" (l. 3340), but T110-4 (c) gives its village rung no raised way at all, locked or not (l. 19572–19575). The minor persists (Part 2). |
| VF7-TST-12 | minor | FIX | **fixed** | T110-2 (4) (l. 19451–19453): "the move counted in neither `walls.waited` nor `walls.raisedCrossings` (each crossing of the viaduct's deck line the trace makes counted …)". |
| VF7-TST-13 | minor | FIX; END scope | **fixed** | The runs sentence (l. 19601–19602) and the take-over row (l. 19850): "(T-V6-47; (4)'s arch-vault circuit by T-V4-80 (i))"; V06 §7's T110-2 rows (V06 l. 4163–4164) placement-locked, cited by law, and naming (4)'s other epoch clauses. (Two other epoch clauses of (1) and (2) are still taken by no volume: VF7v-TST-05.) |

## Part 2 — findings

Severity counts: **4 major, 4 minor, 0 blocker** (two of them persisting round-7 ids: VF7-TST-01 major, VF7-TST-11
minor). Law 1's invariants are each checked: §5.3's law-1 row cites clauses (1)–(11) whole (l. 9940) and T110-4 runs
it after every commit on every path (l. 19564–19594). No test or cell of the lens cites a law, clause, term, row or
cell that does not exist (assemble-r7v's resolver, confirmed for the lens by reading). Every finding below is a bar or
fixture that, as written, fails a correct build, or a schedule or take-over that names the wrong exit or no test.

### VF7-TST-01 — major (persisting; partly fixed) — TEST-FAILS-CORRECT-BUILD — owner scope

**Claim.** The bent-group sentence's (i) moves a stretch's crossing of a road deck's ramp to "the nearer, by law 3, of
the first lawful crossing under its deck and the one beyond the foot" (l. 3201–3203). The one beyond the foot is "the
first point beyond the foot": the nearest point where "a wall's line, band and wall strips and a gate's footprint there
are all clear of the ends and the strip" (l. 2619–2622). Law 3's key (2) measures each candidate by the distance the
crossing moves along the deck line (l. 2846–2852).

The fix placed T110-2 (4)'s first run by a different measure (l. 19389–19390): "one across a viaduct's ramp nearer its
foot than the deck's first lawful crossing — bent beyond its foot through a gate on the carried way's ground course". It
compares the distance to the foot itself with the distance to the first lawful crossing, which already lies past the
ramp's deck end by the wall strips' width (law 1 (4)). The first point beyond the foot lies past the foot by at least
that width too.

Take a ramp of length L and a stroke crossing it at x from the foot. The bar's words hold for every x below (L + w) ÷ 2,
w being that width. Law 3 picks the crossing beyond the foot only below about L ÷ 2. A stroke at the ramp's midpoint
satisfies the bar's words, and a correct build bends it under the deck (or, at a tie, by law 3's key (3)). The bar then
fails that build. The second run ("nearer the deck") is right, but its words share the loose reference. T-V7-48's half
landed correctly.

**Required change.** §13.2 T110-2 (4) (l. 19389–19392): "and one across a viaduct's ramp nearer its foot than the deck's
first lawful crossing — bent beyond its foot through a gate on the carried way's ground course —, and, on a second run,
one across that ramp nearer the deck — bent under the deck's first span clear of the ramp" → "and one across a
viaduct's ramp nearer the first point beyond its foot than the deck's first lawful crossing, each measured along the
deck line (§2.7's laws, law 3) — bent beyond its foot through a gate on the carried way's ground course —, and, on a
second run, one across that ramp nearer the deck's first lawful crossing than the first point beyond its foot — bent
under the deck's first span clear of the ramp".

### VF7v-TST-01 — major — TEST-FAILS-CORRECT-BUILD — owner scope

**Claim.** The fix pass added to T110-2 (1) (l. 19303–19306; adjudication-r7v S10, VF7-HND-02's END) a hand aqueduct
"whose channel at the wall runs above the wall's top by less than the deck's depth (…), so that its span over the band
would not clear it, its course bent to the nearest crossing whose span clears the wall's top, with
`bend.wall.aqueductArch`, else refused `refuse.raised.meeting` (§2.7's laws, law 1 (2), law 2 (a), (c))".

The laws give that stroke the nearest lawful crossing in either of law 1 (2)'s forms:
- A stroke "takes the lawful shape law 3 picks nearest it" (law 2 (a), l. 2810–2811).
- Law 1 (2) admits **over**, where the channel lies above the wall's top and every span over the band clears it, and
  **merged**, where the channel lies within the wall's height (l. 2705–2713).
- §7.1 *Raised ways* says the same for this stroke: "over it on an arch, or merged into it —, … a course that cannot
  cross so — an over crossing whose span over the band would not clear the wall's top, … — bent to the nearest course
  that can, else refused" (l. 11146–11149).

At the drawn crossing the channel stands δ above the wall's top, with δ less than the deck's depth. Bending the course
moves the crossing along the wall, where the wall's top follows the ground, and along the aqueduct, whose channel falls
with its gradient.
- A merged crossing needs the channel to fall to the top: a change of δ.
- A clearing span needs a rise of more than the deck's depth less δ.

So wherever δ is small, a merged crossing typically lies nearer, and law 3 picks it. Nothing in the clause's fixture
rules that out. The bar asserts the over form, so it fails that correct build. This is the J149 class VF7-TST-01 and
VF7-TST-03 closed elsewhere: a bar that fixes one form where the laws give the form by level and the place by law 3.

**Required change.** §13.2 T110-2 (1) (l. 19303–19306): "its course bent to the nearest crossing whose span clears the
wall's top, with `bend.wall.aqueductArch`, else refused `refuse.raised.meeting` (§2.7's laws, law 1 (2), law 2 (a),
(c))" → "its course bent to the nearest crossing law 3 picks among those in a form its level there gives — over, under
a span that clears the wall's top, or merged, where its channel runs within the wall's height —, with
`bend.wall.aqueductArch` in that form, else refused `refuse.raised.meeting` (§2.7's laws, law 1 (2), law 2 (a), (c), law
3)".

### VF7v-TST-02 — major — TEST-FAILS-CORRECT-BUILD — owner scope

**Claim.** T110-2 (8)'s second run (l. 19554–19557) reads: "on a second run with the intervallum also passing under that
span — the span read `open` while the intervallum lies there, no chamber over the lane, the ring road crossing under it
by the crossing rule, and a hand `delete` of the intervallum then laying the chamber again with its id".

The ring road `wallToWay` makes is laid under that span, because the span reads `open` there. Row (c) puts it there:
"else `open` (the ring road itself read as laid after the op)", crossing under the span by the crossing rule
(l. 2915).

Law 1 (8) reads a `vault` span `open` "while anything lies across its strip" (l. 2731), and a way's corridor is
anything across (l. 2644–2645). *beneath* puts it plainly (l. 3112–3115): no chamber is laid again while any "way's
corridor or channel laid while it read `open` … crosses its under-deck strip … so no chamber is laid across a way".

After the intervallum's delete, the ring road still crosses the strip. So a correct build lays no chamber, and the bar
fails it on every build. This text came from E-S7 (amended, PRB7-13) and was marked fixed in round 7 (VM-R6T-02); the
second way under the span was missed.

**Required change.** §13.2 T110-2 (8) (l. 19555–19557): "the ring road crossing under it by the crossing rule, and a hand
`delete` of the intervallum then laying the chamber again with its id" → "the ring road crossing under it by the
crossing rule, a hand `delete` of the intervallum leaving the span read `open` while the ring road lies across its
strip, and a hand `delete` of the ring road then laying the chamber again with its id (§2.7's laws, law 1 (8); its
worked example *beneath*)".

### VF7v-TST-03 — major — TEST-FAILS-CORRECT-BUILD — owner scope

**Claim.** The fix pass added to T110-2 (6) (l. 19523–19531; adjudication-r7v S1, VF7-GEN-09) a third run "whose seed is
searched so that §2.7's laws admit no gate for that way where the boundary crosses its ground course, the way
re-routed by law 2 (b) through the nearest of the stage's gates a way of its class may pass".

*Carried way* re-routes the way by law 2 (b) only "where the wall is shape-locked, or law 2 (a) leaves the way no
lawful gate in it" (l. 2790–2793). Law 2 (a) does not stop at the point where the boundary crosses:
- It moves what the newer structure lays along its line: "a gate, postern or tower of its own along its own wall's line
  … a crossing along the line it crosses" (l. 2803–2805).
- Law 3 measures "a gate the op's own wall lays on a standing way, along that way" (l. 2849).
- At generation S5a's pin is "moved and the trace laid through it" (l. 3147–3148), within S3 (9)'s bound.

So a gate the laws bar at the crossing point (say, in another raised way's strip there) is moved a few metres along the
carried way, and the trace is pulled through it. That is law 2 (a), with no re-route. The seed condition is a point
condition, and it holds on exactly such seeds. A seed meeting it is far likelier to leave law 2 (a) a lawful gate along
the way than none, and on such a seed the bar's law 2 (b) re-route fails a correct build. Adjudication-r7v's own note
on S1 names this failure ("a footprint meeting a strip may leave law 2 (a) a lawful gate to find first, which a bar
asserting the re-route would then reject"). Its replacement words still test one point.

**Required change.** §13.2 T110-2 (6) (l. 19528–19530): "and, on a third run whose seed is searched so that §2.7's laws
admit no gate for that way where the boundary crosses its ground course, the way re-routed by law 2 (b)" → "and, on a
third run whose seed is searched so that §2.7's laws admit no gate for that way anywhere law 2 (a) may place one — at
the boundary's crossing of its ground course or moved along that course, the trace re-laid locally through it, within
the trace's reach —, the way re-routed by law 2 (b)".

### VF7-TST-11 — minor (persisting; partly fixed) — CELL-TEST — owner scope

**Claim.** W1·C8's village path now names "T110-4 (c) (V: its village rung, a raised way placement-locked)" (l. 3340).
But T110-4 (c) gives raised ways only to its CITY and METROPOLIS maps, "with at least two raised ways (…, one of the two
placement-locked and, on a second run, shape-locked …) and a village rung" (l. 19572–19575). Its village rung holds no
stated raised way, locked or not. So no bar runs VS3's palisade against a placement-locked raised way.
- T-V7-48 locks none (V07 l. 3710).
- A placement lock decides no meeting (law 2 *Entry*, l. 2758–2760), so no law-1 invariant goes unchecked.

Nothing built changes.

**Required change.** §13.2 T110-4 (c) (l. 19574–19575): "— the shape-locked runs from the milestone that carries the
shape lock, J147, J150) and a village rung —" → "— the shape-locked runs from the milestone that carries the shape
lock, J147, J150) and a village rung holding a declared viaduct and aqueduct, one of them placement-locked —".

### VF7v-TST-04 — minor — SCHEDULING — owner V06

**Claim.** The fix pass made T-V6-47 take T110-2 (4)'s other epoch clauses, among them "the epoch `shiftCourse` at E5"
(V06 §7's row, V06 l. 4163). §13.8 runs that clause "at M6-E's E5, which builds the terrain candidates" (l. 20431).
V06 §8 does not: its E3 cell runs T-V6-47 at E3 save its arch-vault clauses (E8) and its `topple` runs (E5)
(V06 l. 4281), and its E5 cell names only the `topple` runs (V06 l. 4283).

Against INDEX §5 risk 2's rule ("the dependent test clauses move to the first exit after the provider (each named in
its volume)"), the clause is scheduled before its provider in its own volume. Nothing built changes.

**Required change.** V06 §8's E3 cell (V06 l. 4281): "the state sweep's `topple` runs of T-V6-11, T-V6-47 and T-V6-73 at
E5, which builds the hazards)" → "the state sweep's `topple` runs of T-V6-11, T-V6-47 and T-V6-73, and T-V6-47's epoch
`shiftCourse` clause (T110-2 (4)'s), at E5, which builds the hazards and the terrain candidates)". V06 §8's E5 cell
(V06 l. 4283): "the state sweep's `topple` runs of T-V6-11, T-V6-47 and T-V6-73" → "the state sweep's `topple` runs of
T-V6-11, T-V6-47 and T-V6-73; T-V6-47's epoch `shiftCourse` clause".

### VF7v-TST-05 — minor — TAKE-OVER — owner scope (with V06)

**Claim.** VF7-TST-13's class, for T110-2 (1) and (2). The runs sentence (l. 19602–19604) and the take-over row
(l. 19850) have volume 6 take only "(1)'s founding across a decayed ring and (2)'s founded viaduct across a standing ring
(T-V6-73)". T-V6-73 carries those, and (1)'s third run across a ring drawn by hand and placement-locked (V06 l. 4246).
Three epoch clauses of the base are taken by no volume test:
- (1)'s fourth founding run, "across a retaining wall drawn by hand and placement-locked by the user — passed over, a
  support on its line built against it" (l. 19295–19297);
- (2)'s "epoch route priced on a deck across a standing ring, through a standing gate likewise" (l. 19325–19326);
- (2)'s "epoch on that CITY fixture growing a walled stage whose S5b spawned primary's best course crosses a valley at
  the stage's picked boundary on a priced deck" (l. 19327–19331).

§13.8's T110 row lists the epoch clauses that move to M4 and to volume 6's engine as "the frame growth, (1)'s and (2)'s
foundings, (4)'s and (5)'s circuits, contraction, stage growth and route re-solve, (7)'s lapse and (8)'s ring road"
(l. 20431). Read as a list, it leaves (2)'s epoch route and walled stage at M3a, before the epoch engine. The base
clause still states each case. Nothing built changes.

**Required change.**
- The runs sentence (l. 19602–19604) and the take-over row (l. 19850): "(1)'s founding across a decayed ring and (2)'s
  founded viaduct across a standing ring (T-V6-73)" → "(1)'s foundings across a decayed ring and across a ring and a
  retaining wall drawn by hand and placement-locked, and (2)'s founded viaduct across a standing ring, its epoch route
  through a standing gate and its epoch walled stage's spawned primary (T-V6-73)".
- §13.8's T110 row (l. 20431): "(1)'s and (2)'s foundings," → "(1)'s and (2)'s foundings, (2)'s epoch route and walled
  stage,".
- END at V06: V06 §7's T110-2 founding row (V06 l. 4164), at the end of its last cell, add "; and the founding across a
  retaining wall drawn by hand and placement-locked, (2)'s epoch route through a standing gate and its epoch walled
  stage's spawned primary, as T110-2 (1) and (2) state them".

### VF7v-TST-06 — minor — FIXTURE — owner scope (with V04)

**Claim.** VF7-EPO-02's class (T-V6-11's re-lay, fixed by a seed condition), at three other sites. Each asserts an arch
vault laid again after a hand `delete` of the wall that stood over its span:
- T110-2 (4)'s epoch circuit under a placement-locked arch vault: "and after a hand `delete` of that run the chamber
  laid again, locked, with the same id" (l. 19421–19422);
- T-V4-63: "and the hand wall's delete laying it again with the same id" (V04 l. 3164);
- T-V4-80 (i): "the wall's delete laying it again locked with the same id" (V04 l. 3181).

Law 1 (8) keeps that span `open` while any way's corridor laid while it read `open` still crosses its strip
(l. 2731–2733; *beneath*, l. 3112–3115). Such a corridor might be an intervallum the circuit's or the stroke's S7
operator lays at a CITY era row, or a street the epoch grows under the span. The fixtures state no such condition, so a
correct build may lay no chamber after the delete. T-V4-80 (i)'s own last clause shows the rule ("the chamber not laid
while the way lies there"). Nothing built changes.

**Required change.** In each of the three clauses, after the quoted words add " (the fixture's seed searched so that no
way, square or channel — an intervallum among them — is laid across that span's strip while the wall stands over it;
§2.7's laws, law 1 (8))".

## Part 3 — held for round 8 (outside the family, not graded)

- V09 T-V9-52 (V09 l. 4428): "a road drawn across a viaduct crosses under its nearest `open` span … with
  `bend.raised.underSpan`". The way-and-channel table's row (b) moves such a road "to cross under the nearest span that
  admits it" (l. 2914): its clear width, clearance and squareness by §4.3's crossing rule. On a viaduct whose nearest
  `open` span is too narrow or too low for the road, the bar fails a correct build. This is a raised way meeting a
  ground way, with no wall.
- V07 §3.12 item 7 (V07 l. 2627, "Item 110's state crosses held") and T-V7-51 (V07 l. 3713, "a village's declared raised
  way crosses the hand-off up held"). Both mean carried unchanged. §2.7's *held* now means locked, and the support step's
  (6) renamed its own word "kept" (adjudication-r7v M6). This is a rung hand-off, with no wall meeting.

## Verdict for this lens

The fix pass closed eleven of the thirteen round-7 findings of this lens: the order fields left the model digest and
*Order* lost the regeneration's slot, the scripts make only states their ops can make, and the schedules name their
providers. Law 1's invariants are all checked by §5.3's row and T110-4.

The other two persist:
- VF7-TST-01's ramp bar is measured to the foot, not to the first point beyond it, so a fixture meeting its words can
  fail a correct build (major).
- W1·C8's village test names a rung that holds no locked raised way (minor).

Three more bars fail a correct build, two of them written by the fix pass:
- T110-2 (1)'s new low-channel aqueduct asserts the over form, where law 3 may pick a nearer merged crossing.
- T110-2 (6)'s new carried-way run asserts law 2 (b)'s re-route on a seed condition that law 2 (a) usually satisfies
  first.
- T110-2 (8)'s older intervallum run expects a chamber while the ring road still crosses its span.

The remaining minors are a V06 schedule cell, a take-over list missing three epoch clauses of (1) and (2), and three
chamber re-lays whose fixtures need EPO-02's seed condition. Every fix is a test, fixture, schedule or take-over edit.
None touches a law.
