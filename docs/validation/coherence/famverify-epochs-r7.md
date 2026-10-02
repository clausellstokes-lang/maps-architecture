# Family verify — round 7: epochs, decay and the village (raised way × wall, J144)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/famverify-epochs-r7; covered by the
> whole-design retrovalidation (J84).

PROGRESS (lane `coherence/famverify-epochs-r7`, 2026-10-02; fresh start, no earlier CHECKPOINT of this seat)
- [x] R1 read whole: the brief; adjudication-r7 Part L (terms, laws 1–4, the check, the seven corrections, the restated
  veto list), R7-04, R7-06, R7-07, Part A's J150 hand-off, Part H's head and its V04, V05, V06, V07, model, pipeline and
  scope rows in this lens, Part P pass 8; the 26 round-6 family findings in this lens (`work/round7-work/*.json`);
  assemble-r7's outcome; the live §2.7 support step (6)–(7) with §2.7's laws and both tables, §4.11 `wallToWay`, §5.2's
  F-WALL and F-REDERIVE, §5.3's law-1 and gate rows, §5.4's warnings, T110-2 (1)–(8), T110-3, T110-4, §13.8's T110 row;
  V06 §2.1, §2.8, §2.10, §3.2, §3.7, §3.11, §3.17, §3.18.1 (6), §3.19–§3.19.6, §3.20.5, §3.21, §4.2, ## 7 (H-AQUA,
  T-V6-11, -47, -61, -64, -73), ## 8, ## 9; V05 §3.16, §3.23, T-V5-14; V04 §1b.2, the arch-vault entity row, §3.1's
  maintenance mode, §3.5.4 (d), §3.10, §3.11 UC18, T-V4-63, T-V4-80, ## 8; V07 §1, §3.4, §3.5a, §3.11's palisade
  REPLACEMENT, §3.12, §3.12a, §3.13, §3.17, T-V7-32, T-V7-48, ## 8, ## 9
- [x] R2 the 26 round-6 findings re-checked against the live text: 26 fixed (below)
- [x] R3 the laws attacked through the lens (two readings, no outcome, owner rules, readers, tests): 6 findings — 1
  major, 5 minor (VF7-EPO-01 – 06); 0 VALID CHOICE; nothing reported on J150's hand-offs
- [x] R4 this file, the result JSON, LANDED

Grading: J141's standard as J146 and J151 apply it to this family — MAJOR only where the laws (or the design text
written from them) give a case no lawful outcome, give one that breaks an owner rule or a law-1 invariant, leave a
law-1 invariant checked by no bar, or make the runtime check or a named test fail a correct build; an example that
contradicts the laws, a citation, or a test or fixture list omitting a case is a minor. Nothing below concerns a lock's
behaviour under an undo, a redo, a re-grade or value edit within a standing meeting or a repair, or the two-axis lock
and its readers outside the family's meetings (J150, Part A): those are round 8's and are not reported.

## 1. The round-6 family findings in this lens, against the live text

| id | unit | verdict | live evidence |
|---|---|---|---|
| VV56-r6-01 | V05 | fixed | V05 §3.16 (4)'s raised row (l. 1342: "one already `ruined` kept, one already `cleared` … kept `cleared` and never a member, the state only stepping down") and retaining row (l. 1343); (5)'s members "not `cleared`" (l. 1352–1353); §3.23's landfall row (l. 1776); T-V5-14 (l. 2569); V06 §3.19.2 (4) (l. 2963–2964); the base's W12·C2 cell (l. 3340) |
| VV56-r6-02 | model | fixed (R7-04 (b)) | W8·C2 (base l. 3336): the chamber laid again "in the commit of the `dismantle` that takes the last such run, or in `absorbWall`'s own where none is left"; *What stands of a wall* (l. 2594–2596); V06 §2.8's `absorbWall` (l. 717); V06 §2.1's `EpochScope.raised` (l. 465) and W64 (l. 347) |
| VV34-r6-03 | V04 | fixed (R7-04 (b)) | V04 §1b.2's `ArchVaults.reconcile` triggers (l. 328) name `absorbWall` where no run is left and the last run's `dismantle`; the entity row (l. 867) and §3.10's bullet (l. 2288–2297) cite law 1 (8) |
| VAT6-r6-02 | model | fixed (R7-04 (c)) | support step (7) (l. 3352–3362): the extension bent to a fitting course, else kept and reported; law 2 (c)'s frame-growth clause (l. 2837–2840); V06 §2.10's `extendedPastBound` (l. 772); T110-2's frame clause (l. 19213–19219) |
| VAL-R6-01 | model | fixed (R7-02) | *beneath*'s placement-locked arch vault (l. 3109–3113) and *A held building in an arch vault* (l. 3114–3135); V04 §3.11 UC18 (l. 2467); T-V4-80 (i) (l. 3181); T110-2 (4)'s locked-vault runs (l. 19394–19404) |
| VEW-r6-02 | model | fixed (merged into VAL-R6-01) | its held-building case: law 1 (9) (l. 2734–2736), *A held building in an arch vault* (l. 3114–3135), V06 §3.7.1 (l. 1469–1472), the pull's impassables (l. 3073–3079) |
| VPC-r6-02 | pipeline | fixed (R7-04 (d)) | §4.11 `wallToWay` (l. 8921): the dry run reads each `vault` span "as §2.7's laws read it once the op commits"; the way-and-channel table's row (c) (l. 2913); W7 (l. 3335) |
| VM-R6T-02 | scope | fixed (R7-04, R7-06) | T110-2 (6) over the state sweep (l. 19474–19480: the cleared ring as open ground, the stump, no chamber in the breached span); T110-2 (8)'s `vault`-span case (l. 19500–19507) |
| VEL6-r6-02 | scope | fixed (R7-06) | T110-2 (6) (l. 19474–19480), W3's ·S cells (l. 3331) |
| VCS-r6-03 | scope | fixed (R7-06) | §13.8's T110 row (l. 20377): every arch-vault clause at the later of its milestone and M6-U's U3, an epoch's arch-vault outcome at the later of U5 and E8 |
| VAL-R6-05 | V06 | fixed (amended, J146) | V06 §3.18.1 (6) (l. 2620–2623): the supports of the parts in `scope.raised` whose `feet`, `supports` or `spans` changed, a raised way there only by law 1 (8) taking the reconcile alone |
| VAP-r6-04 | V06 | fixed (R7-06 (b)) | T-V6-64 (l. 4225) in V04 §3.5.4 (d)'s one wording, a chamber `collapsed` under a fallen span |
| VAT6-r6-03 | V06 | fixed (R7-06) | V06 §8's E3 cell (l. 4269) and E8 cell (l. 4274): the arch-vault clauses and the sweep's C6 runs at the later of E3 and E8, the `topple` runs at E5 |
| VEW-r6-04 | V06 | fixed (R7-02) | V06 §3.19 (5) (l. 2835–2851): a wall, a retaining wall and another raised way met as unheld ones, the curtain by §2.7's laws; T110-2 (1)'s placement-locked drawn ring (l. 19274); T-V6-73's third run (l. 4234) |
| VCS-r6-04 | V06 | fixed | T-V6-47 (l. 4208): the breached span repaired by `repairRaised`; the circuit and the contraction laid after the fall, in the cells' own order |
| VV56-r6-04 | V06 | fixed | T-V6-47 (l. 4208): "a `vault` span in the circuit's band breached, then the span beyond one of its supports breached and that support, both its spans fallen, dismantled" |
| VV56-r6-03 | V06 | fixed (R7-06 (a)) | T-V6-73's 20 epochs over the sweep (row W5), T-V6-11's absorb over the sweep (W8, W4), T-V6-47's gate opening over the sweep (W6) (l. 4234, 4172, 4208) |
| VV56-r6-05 | V06 | fixed | H-AQUA (l. 4095–4097): the seed searched so that the span over the CITY ring and the span the METROPOLIS circuit crosses each read `vault` in its record |
| VV56-r6-06 | V06 | fixed | T-V6-73 (l. 4234) and T110-2 (2) (l. 19293): `raised.waited` "at each CITY and METROPOLIS epoch while the CITY ring's trace stands" |
| VAL-R6-02 | V07 | fixed | V07 §3.5a (3) (l. 1599–1601): "a `cleared` support's ring is open ground …, and a span is crossed by this rule whatever its `state`"; the way-and-channel lead "whatever a span's `state`" (l. 2902) |
| VAL-R6-06 | V07 | fixed (R7-06) | T-V7-48 (l. 3708): the CITY fixture handed down over the state sweep (row W9) |
| VV78-r6-01 | V07 | fixed | T-V7-48 (l. 3708): each crossing reported `W_RAISED_CROSSING` once; the hand-off at each state, the palisade read by §2.7's laws |
| VV78-r6-02 | V07 | fixed | V07 ## 8's V-M3 cell (l. 3762), T-V7-48's tier cell (l. 3708), §1 (14) (l. 192–196) |
| VAT6-r6-01 | V04 | fixed (R7-06 (b)) | T-V4-63's bar (l. 3164) in the one wording |
| VV34-r6-01 | V04 | fixed | T-V4-63 (l. 3164): the `use` edit "none in a span §2.7's laws read `open`"; the frame growth's old `vault` spans "that §2.7's laws read `vault`" |
| VV34-r6-04 | V04 | fixed | V04 ## 8's U5 cell (l. 3218): T-V4-63's epoch clauses at V06's E8 |

All 26 are fixed. Where a fix carries a later residue, it is a new finding below (VF7-EPO-03 for T-V4-63's frame
clause; VF7-EPO-02 for T-V6-11's re-laid vault).

## 2. The laws attacked through the lens

The ops, paths and states examined, each against laws 1–4 and the check: the epoch's phase order (decline, fortification,
`raisedWays`, dossier, growth) and *Order*'s dates within an epoch; a circuit, a contraction, a re-anchored stretch, the
waterfront's quay wall, a dossier-admitted circuit, a harbour-mouth chain and a water op's re-trace (W1 at E); a run's
decay, breach, patch, rebuild, neglect, gate opening, dismantling, `wallToWay`, `absorbWall` and renewed-threat repair
(W4–W8, W10) over every raised-way state, an over crossing and a merged one; the founding (its reading, fixed ends,
impassables, clearing, commit), lapse, run-dry, strike, salvage, release, hazards (topple, inundate), repair (B), the
suppression and the cap; the landfall's raised, retaining and wall rows and its members (W12); a frame growth's
extension with and without a wall across the old end span, within and past a bound; the arch vaults' reading and
reconcile at an epoch (`EpochScope.raised`, `under.extend`, maintenance mode at a village rung), UC18's meeting clause;
the replay's destruction, refounding and burial; the village: VS3's palisade and its band, VS4's gates and tracks over
epochs, the palisade's decay, the hand-off down (W9) and up, VS3's later re-lay (W1·C9), the palisade's REPLACEMENT
(W14) and F-V-RAISED; and the epoch report's `walls` and `raised` sections and V06 §3.19.1's guards. The laws give
every one of these cases a lawful outcome that keeps the owner rules; the one major is a test fixture worded against
law 1 (4), and the minors are a fixture condition, a test's restatement, a report comment, a decision row and citation
forms.

### VF7-EPO-01 — major — FIXTURE-AGAINST-LAW (a named test fails a correct build) — owner V06

**Claim.** V06 §7's H-AQUA (l. 4097–4103) has V06 §3.19's founding lay "a viaduct where its main approach road crosses a
valley outside a gate, its deck coming down before the ring and its road passing the gate on ground part 0 (*down
before the wall*) (the recipe's valley deeper than `viaduct.minDropM`, its near rim just outside the ring's band so that
the reading's `A` lies there, …)", and edits the CITY viaduct row's chance "so the founding lays it". The reading fixes
`A` as "the way's last vertex before its course enters the extent" and lays the viaduct "from `A` to `B`" (V06 §3.19
(2), l. 2782–2789), "founded with its two ends fixed" (V06 §3.19 (5), l. 2850–2851). A rim just outside the band puts
`A` — and the viaduct's foot there, widened each side by `raisedWays.structure.stripMarginM` (§2.7's laws' terms, base
l. 2616–2617) — inside the CITY ring's outer wall strip, which reaches the band's half plus the outer setback and glacis
(§4.8, base l. 8339–8340: "table 10–20 m"; the laws' *wall strips* and their width, l. 2606–2612); where the approach road
has no vertex between the gate and the rim, `A` is the gate's own junction. Law 1 (4) (l. 2719–2721) bars an enclosing
wall's band or wall strips over a raised way's ends, and *beyond the foot* (l. 2618–2621) places the road's gate only
where the wall's line, band, wall strips and the gate's footprint are all clear of the ends (the restated veto list's
item 5, adjudication-r7 l. 729: "the gate where a road comes down from a deck stands beyond the foot, clear of the ramp
— measured by the glacis"). With both ends fixed no lawful course exists, so V06 §3.19 (5) and law 2 (c) (l.
2834–2836) make the founding wait (`raised.waited`) at every CITY and METROPOLIS epoch while the ring stands — as the
fixture's own variant does with `A` inside the ring (T-V6-73, l. 4234). On a correct build H-AQUA then holds no
viaduct, and T-V6-47's clauses on it fail: "its viaduct, which the METROPOLIS circuit meets, crossed under its deck, the
band built through its supports (law 1 (3)), the run beneath each standing span and across a support bearing one capped
…", and "an epoch route re-solved under its viaduct" (l. 4208). A build that founds it with its foot over the strip
instead fails T110-4 (a)'s law-1 check on T-V6-47's fixture (base l. 19517). No build passes both, so a named test
fails a correct build (J151). It is Part L correction 3's class — an end kept off "by the band's half" where the laws
keep it off by the wall strips' width — left in a fixture the round's sweep did not reach.

**Required change.** V06 §7, H-AQUA: "its near rim just outside the ring's band so that the reading's `A` lies there" →
"its near rim just beyond the ring's outer wall strip, so that the reading's `A` lies there and the viaduct's foot at
`A`, widened by `raisedWays.structure.stripMarginM`, lies clear of the ring's band, wall strips and gatehouse, the main
approach road's gate standing beyond the foot (§2.7's laws, law 1 (4); its terms' *beyond the foot*)".

### VF7-EPO-02 — minor — TEST-CASE (a fixture must hold its case) — owner V06

**Claim.** T-V6-11 (l. 4172) asserts "V04 laying again the arch vault of a `vault` span the old wall stood over in the
epoch whose dismantling takes the last run of the absorbed ring over it (law 1 (8); its worked example the crossing
table's row W8; H-AQUA's span over its CITY ring)". Law 1 (8) (l. 2729–2733) lays that chamber only once nothing lies
across the span's strip, and *beneath* (l. 3104–3108) says so: "once none lies there and nothing else these laws'
*anything across a strip* finds there — no way's corridor or channel laid while it read `open`". While the CITY ring
stood over the span it read `open`, so the crossing rule (the way-and-channel table's lead, l. 2898–2906) let an
epoch's route, a growth way or a gate square cross beneath it in the century between the CITY epoch and the absorb;
H-AQUA's seed is searched only for the span's recorded `use` (l. 4095–4097), so the fixture need not hold the clause's
case, and on a history that lays such a way the clause expects a chamber a correct build does not lay. T110-2 (8)
states the same condition for the same reading ("with no other way or channel under it", base l. 19504). R6-11's
class (a fixture must hold its case): nothing built changes.

**Required change.** T-V6-11: "(law 1 (8); its worked example the crossing table's row W8; H-AQUA's span over its CITY
ring)" → "(law 1 (8); its worked example the crossing table's row W8; H-AQUA's span over its CITY ring, the recipe's
seed searched so that no way, square or channel is laid across that span's strip while the ring stands over it)".

### VF7-EPO-03 — minor — READER (a test restating (7) without its exception) — owner V04

**Claim.** T-V4-63's frame-growth clause (l. 3164) reads "the span from the old deck's last interior station (with
none, its one span) re-derived with the extension". The support step's (7) (base l. 3348–3352) re-derives from there
"— or, wherever a wall-like structure crosses the old end span, from the old foot's point, that span kept as it stands
(these laws, law 2 (c))", as law 2 (c) (l. 2837–2839) and C12 (l. 3290–3291) say. The clause restates the rule
without that exception instead of citing it; its fixture sets no wall across the end span and T110-2's frame clause
holds the kept span (l. 19210–19212), so nothing built changes.

**Required change.** T-V4-63: "the span from the old deck's last interior station (with none, its one span)
re-derived with the extension" → "the span from the old deck's last interior station (with none, its one span)
re-derived with the extension, save one a wall-like structure crosses, kept as it stands and the extension laid on from
the old foot's point (§2.7's support step (7); §2.7's laws, law 2 (c))".

### VF7-EPO-04 — minor — REPORT (a list omitting a case its rule names) — owner V06

**Claim.** V06 §2.10's `walls.waited` comment (l. 755) lists what waits for a raised way — "traces that no lawful
crossing of a standing raised way or clear point for a fixed place admits, or that a held building in an arch vault
turns back, and the water ops … (§2.7's laws, law 2 (c), law 1 (9), (11); …)" — but not the palisade REPLACEMENT that
waits on its kept trace, which row W14 counts there ("at a village epoch the REPLACEMENT waiting, `walls.waited` (law 2
(c))", base l. 3342) and T-V7-48 bars ("the REPLACEMENT waiting (`walls.waited`)", V07 l. 3708); nor a trace a
shape-locked raised way's `vault`-use span turns back, which §2.7's own sentence names (base l. 3344–3346: "or for a
held building in an arch vault or a shape-locked raised way's `vault`-use span (law 1 (9), (10))"). V06 §3.7.6 (5)'s
continuity bullet (l. 1618–1620) names the held building only. Both texts' "law 2 (c)" already covers the cases;
nothing built changes.

**Required change.** V06 §2.10, `walls.waited`'s comment: "or that a held building in an arch vault turns back, and the
water ops" → "or that a held building in an arch vault or a shape-locked raised way's `vault`-use span turns back, a
re-section on a kept trace with no lawful shape (V07 §3.11's palisade REPLACEMENT; row W14), and the water ops"; and its
"(§2.7's laws, law 2 (c), law 1 (9), (11);" → "(§2.7's laws, law 2 (c), law 1 (9)–(11);". V06 §3.7.6 (5)'s continuity
bullet: "or for a held building in an arch vault (law 1 (9); its worked example *beneath*)" → "or for a held building
in an arch vault or a shape-locked raised way's `vault`-use span (law 1 (9), (10); its worked example *beneath*)".

### VF7-EPO-05 — minor — EXAMPLE-AGAINST-LAW (a decision row restating the pre-J149 rule) — owner V06

**Claim.** V06 ## 9's J-V6.91 (l. 4493), which Part H's V06 sweep let stand before J149 and law 2 (c) were applied,
still records "an aqueduct created across a standing curtain crosses it on a span over its band, … and a trace laid
after a raised way runs on beneath its deck, crossing an aqueduct under one of its arches …, with continuity a hard
rule (a moat … stopped …, never a trace waiting; §2.7's crossing table)". Law 1 (2) (l. 2703–2713) crosses a wall laid
after an aqueduct at the aqueduct's level, merged round "the aqueduct's arch or pier" where its channel lies within the
wall's height, and law 2 (c) (l. 2834–2836) makes a trace with no lawful shape wait (`walls.waited`), as V06 §3.7.6
(5)'s continuity bullet says (l. 1618). The laws govern (§2.7's examples sentence, l. 2891–2892); an example
contradicting them is a minor.

**Required change.** J-V6.91: "chose that a raised way and a curtain never bear on each other — an aqueduct created
across a standing curtain crosses it on a span over its band, a road deck comes down before it, and a trace laid after
a raised way runs on beneath its deck, crossing an aqueduct under one of its arches and a road deck's carried way beyond
its foot, a road deck's supports in its band built into its line — with continuity a hard rule (a moat that cannot pass
beneath stopped at the under-deck strip's edges and reported, never a trace waiting; §2.7's crossing table)," →
"*amended by §2.7's laws.* Chose that a raised way and a curtain never bear on each other — they meet by §2.7's laws
(law 1 (2)–(4): an aqueduct crossing a curtain at its own level, over it on an arch or merged into it, whichever was
laid first; a road deck coming down before a curtain standing when its course is laid and passing over one laid after
it, its supports in the band built into its line; a road deck's carried way crossing beyond its foot) — with continuity
a hard rule (a moat that cannot pass beneath stopped at the under-deck strip's edges and reported; a trace waiting only
by §2.7's laws, law 2 (c)),", the rest of the row as it stands.

### VF7-EPO-06 — minor — CITATION (the crossing table cited instead of §2.7's laws) — owner V06 (with V05)

**Claim.** Part H's head binds every text in the family to cite "§2.7's laws" with the law's number, an outcome, row or
cell following as its worked example. Eight sites in this lens cite the table alone, one restating law 1 (1): V06 W68
(l. 351: "the meeting by §2.7's crossing table (*beneath*; a founding *over the band* or *down before the wall*)", and
its last cell "§2.7's crossing table"); V06 §3.7.4 (4) (l. 1532–1533: "a deck passing over the trace takes none,
§2.7's crossing table"); V06 §3.17 (9) (l. 2503–2504: "(§2.7's crossing table, *down before the wall*; V06 §3.19 (5))");
V06 §3.19's lead (l. 2756: "a wall meets it by §2.7's crossing table"); V06 §3.21's raised-way row (l. 3328:
"`raised.waited`; §2.7's crossing table, *down before the wall*"); V06 §7's take-over row (l. 4151: "*beneath* (§2.7's
crossing table)"); V06 J-V6.114 and J-V6.140 (l. 4516, 4542: "*amended by §2.7's crossing table.*"); V05 T-V5-14 (l.
2565: "(§2.7's crossing table, *unchanged meeting*)"; l. 2567: "§2.7's crossing table (row W12) names this clause").
Each resolves to an existing outcome or row; nothing built changes.

**Required change.** V06 W68: "the meeting by §2.7's crossing table (*beneath*; a founding *over the band* or *down
before the wall*)" → "the meeting by §2.7's laws (laws 1–2; their worked examples *beneath*, a founding's *over the
band* or *down before the wall*)", and its last cell's "§2.7's crossing table" → "§2.7's laws". V06 §3.7.4 (4): "a deck
passing over the trace takes none, §2.7's crossing table" → "a deck passing over the trace takes none, §2.7's laws, law
1 (1)". V06 §3.17 (9): "(§2.7's crossing table, *down before the wall*; V06 §3.19 (5))" → "(§2.7's laws, law 1 (3), law
2 (c); its worked example *down before the wall*; V06 §3.19 (5))". V06 §3.19's lead: "a wall meets it by §2.7's
crossing table (V06 §3.7.6 (5))" → "a wall meets it by §2.7's laws (V06 §3.7.6 (5))". V06 §3.21's raised-way row:
"(`raised.waited`; §2.7's crossing table, *down before the wall*)" → "(`raised.waited`; §2.7's laws, law 1 (3), law 2
(c); its worked example *down before the wall*)". V06 §7's take-over row: "*beneath* (§2.7's crossing table)" →
"*beneath* (§2.7's laws, law 1; its worked example the crossing table's *beneath*)". J-V6.114 and J-V6.140: "*amended
by §2.7's crossing table.*" → "*amended by §2.7's laws.*". V05 T-V5-14: "(§2.7's crossing table, *unchanged meeting*)"
→ "(§2.7's laws, law 4; its worked example *unchanged meeting*)", and "§2.7's crossing table (row W12) names this
clause" → "§2.7's laws' worked example, the crossing table's row W12, names this clause".

## 3. Held for round 8 (outside the family)

None. Every defect this seat found lies in the family; what it noticed outside the family's meetings concerned a lock's
readers, which J150 hands to round 8 whole and this seat does not report.

## 4. Verdict for the lens

Over the epochs the family holds: every op an epoch, a replay, a village epoch or a village derivation runs — circuits,
contractions, re-anchored and waterfront stretches, water re-traces, decay, gate opening, dismantling, `wallToWay`,
`absorbWall`, repair, the founding, lapse, strike, salvage, hazards, the landfall, the frame growth, burial and the
REPLACEMENT — meets every raised-way state by §2.7's laws with a lawful outcome, law 2 (c) giving each an epoch's wait
(or, for the frame growth, its own kept course) where no lawful shape exists; the arch vaults follow law 1 (8) through
`EpochScope.raised` and `under.extend` at every rung; the hand-offs write nothing and the palisade keeps its band; and
all 26 round-6 findings in the lens are fixed. One major remains: H-AQUA's recipe puts its founded viaduct's fixed
foot inside the CITY ring's outer wall strip, where law 1 (4) makes a correct founding wait, so T-V6-47's viaduct
clauses fail a correct build (VF7-EPO-01, a one-phrase fixture fix). The five minors are a fixture condition
(VF7-EPO-02), a test's restatement of the support step's (7) (VF7-EPO-03), a report comment (VF7-EPO-04), a decision
row (VF7-EPO-05) and citation forms (VF7-EPO-06). No case has two outcomes that all keep the laws (no VALID CHOICE).
