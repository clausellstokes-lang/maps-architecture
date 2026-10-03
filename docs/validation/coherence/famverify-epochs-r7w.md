# Family verify — round 7w: epochs, decay and the village (raised way × wall, J144)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/famverify-epochs-r7w; covered by the
> whole-design retrovalidation (J84).

PROGRESS (lane `coherence/famverify-epochs-r7w`, 2026-10-02; fresh start, no earlier CHECKPOINT of this seat)
- [x] R1 read whole: the brief; `adjudication-r7.md` Part L (terms, laws 1–4, the check, the seven corrections, the
  restated veto list), R7-04, R7-06; `adjudication-r7v.md` and `adjudication-r7w.md` whole (decisions, class ruling,
  Part H, builders' choices, held lists); `famverify-epochs-r7v.md`; `assemble-r7w.md` (outcome, section 8); the live
  §2.7 support step (6) — (0) the laws, the worked examples, both tables — and (7); V06 §2.8, §2.10, §3.1, §3.2, §3.6,
  §3.7, §3.17, §3.19, §3.20.5, ## 7, ## 8; V05 §3.16 and T-V5-14; V04 §3.5.4 (d), §3.10, UC18, T-V4-63, T-V4-80 (i);
  V07 §3.4, §3.5a, §3.11, §3.12, §3.12a, §3.13, T-V7-48; base §4.3 *Where it may not go*, §4.4 S5a/S5b, §4.11's frame
  growth and `contractWall`, §5.2 F-WALL and F-REDERIVE, §5.3's gate row, T110-2, T110-4, T114-3, §13.8's T110 row
- [x] R2 the nine round-7v findings of this lens re-checked against the live text (assemble-r7w's design): 8 fixed, 1
  closed by a ruling; the other round-7v findings whose fixes land in this lens's texts fixed
- [x] R3 the laws attacked through the lens: 4 findings — 0 blocker, 0 major, 4 minor; 2 held notes
- [x] R4 this file, the result JSON (`results/coherence_famverify-epochs-r7w.json`), LANDED

Grading: J141's standard as J146 and J151 apply it to this family — MAJOR only where the laws (or the design text
written from them) give a case no lawful outcome, give one that breaks an owner rule or a law-1 invariant, leave a
law-1 invariant checked by no bar, or make the runtime check or a named test fail a correct build; where every outcome
keeps the laws, the owner rules, the check and the named tests, a VALID CHOICE (minor); an example that contradicts the
laws, a citation, a restatement the laws already decide, or a list omitting a clause its rule names, a minor (as
`adjudication-r7v.md` and `adjudication-r7w.md` grade them). Nothing below concerns a lock's behaviour under an undo, a
redo, a re-grade or value edit within a standing meeting or a repair, or the two-axis lock and its readers outside the
family's meetings (J150, Part A): those are round 8's and are not reported.

## 1. The round-7v family findings in this lens, against the live text

Line numbers are the live files' after assemble-r7w (HEAD 1965be7; `docs/ARCHITECTURE.md` unless a volume is named).

| id | unit | verdict | live evidence |
|---|---|---|---|
| VF7v-EPO-01 | V06; END scope | fixed | T-V6-73 (V06 l. 4255): "(by a hand `convert` the fixture logs before that epoch, the ring then placement-locked by the script so that the epoch's `fortification` step, which runs before its `raisedWays` step, repairs no run of it: V06 §3.1, §3.2, V06 §3.7.5; §2.7's laws, law 2 *Entry*: a lock decides no meeting)"; §7's founding row (V06 l. 4173): "(the ring placement-locked by the script once its run is so, V06 §3.7.5)"; T110-2 (1) (l. 19307–19311) the same — V6-1's and S9's words. The lock stops the in-use repair: "a locked or pinned ring is held (V06 §3.1)" (V06 §3.7.5, l. 1557), "a locked or pinned entity is never struck, converted or moved" (V06 §3.1 *Protection*), and the founding meets the locked ring as an unheld one (V06 §3.19 (5), l. 2848–2858). The bare "§3.2" in both lists is VF7w-EPO-04 below |
| VF7v-EPO-02 | V06 | fixed (merged into VF7-RDR-02, V6-2) | V06 §3.2's reconcile paragraph (V06 l. 1041–1042): "the chamber V04 §3.5.4 (d) (1) lays in each standing `vault` span that §2.7's laws read `vault`"; (l. 1049–1050): "every `vault` span they read `vault` has the chamber V04 §3.5.4 (d) lays (law 1 (8))" |
| VF7v-EPO-03 | V07 | fixed | T-V7-48 (V07 l. 3710): "the ring road by §2.7's laws (law 1 (1), (8); its worked example the way-and-channel table's row (c))" — V7-1's words |
| VF7v-EPO-04 | V06; END V07, determinism | fixed | V06 §3.7.1 (V06 l. 1471–1473): "never a held building's strip or a shape-locked raised way's `vault`-use span's strip, which the trace keeps clear (law 1 (9), (10))"; V07 §3.13's F-V-RAISED (V07 l. 2770): "or a shape-locked raised way's `vault`-use span's strip … (§2.7's laws, law 2 (c), law 1 (9), (10);"; §5.2's F-WALL detection (l. 9855) and F-REDERIVE detection (l. 9872) each "or a shape-locked raised way's `vault`-use span's strip it cannot keep clear (§2.7's laws, law 2 (c), law 1 (6), (9), (10)" — V6-3, V7-2, D5 |
| VF7v-EPO-05 | V06 | fixed | V06 §3.19 (5) (V06 l. 2857–2869): "placement-locked, pinned, declared or not", "a shape-locked curtain never merged into (law 1 (2), (10))", "or a curtain's line, band or wall strips would lie over an end of it (law 1 (4))"; §2.10's `raised.waited` (V06 l. 770): "against a standing trace's line, band and wall strips, gates, posterns, towers or fixed places (law 1 (2), (4)–(6), (10), law 2 (c)" — V6-4 |
| VF7v-EPO-06 | V06 | closed by a ruling | VALID CHOICE LISTED (`adjudication-r7w.md`, *Builders' choices for fix-list.md*: "V06 §3.19 (2): an elevated road's non-citadel anchor whose end would lie under an enclosing wall's line, band or wall strips — the candidate waits … or the anchor is the highest part-0 way vertex at which the road's ends keep clear of them … the builder picks one"); V06 §3.19 (2) (V06 l. 2807–2811) unchanged, as listed |
| VF7v-EPO-07 | V06 | fixed | V06 §3.7.6 (5)'s lead (V06 l. 1607–1608): "— and (3)'s harbour-mouth chain meet the standing raised ways by §2.7's laws"; (3)'s chain bullet (l. 1585–1588): "its gate and towers stand only where §2.7's laws, law 1 (5) and (6), admit them — at the nearest heads or shore points along the entrance that do, a tower standing where law 1 (6) bars a fixed place being no anchor, else the chain waiting (`walls.waited`; law 2 (a), (c); …)"; §2.10's `walls.waited` (l. 755): "and traces and harbour-mouth chains (V06 §3.7.6 (3))" — V6-5 |
| VF7v-EPO-08 | scope | fixed | T110-4 (a) (l. 19607–19609): "T-V6-48 (with a declared viaduct along its harbour's shore whose fixed-place zone holds a head of its harbour mouth before the chain is laid, its course kept off the basin and the mouth by §4.3 *Where it may not go*)" — S8; the fixture now holds its case (the chain at the nearest lawful heads, else waiting, V06 §3.7.6 (3)) |
| VF7v-EPO-09 | model | fixed | Row W14 (l. 3353), event cell: "the REPLACEMENT waiting where a standing gate's stone footprint would lie where law 1 (5) bars it (in a road deck's under-deck strip, or in an aqueduct's but under arches that clear it)"; its C2 cell: "a re-section whose new footprint of one would lie where law 1 (5) bars it" — M5 |

Other round-7v findings whose fixes land in this lens's texts:

| id | unit | verdict | live evidence |
|---|---|---|---|
| VF7v-TST-04 | V06 | fixed | V06 ## 8, E3 cell (V06 l. 4290): "the state sweep's `topple` runs of T-V6-11, T-V6-47 and T-V6-73, and T-V6-47's epoch `shiftCourse` clause (T110-2 (4)'s), at E5, which builds the hazards and the terrain candidates"; E5 cell (l. 4292) lists it — V6-6 |
| VF7v-TST-05 | scope; V06 | fixed | base runs sentence (l. 19647–19651), take-over row (l. 19897) and §13.8's T110 row (l. 20478: "(1)'s and (2)'s foundings, (2)'s epoch route and walled stage"); T-V6-73's head (V06 l. 4255) — S6, V6-7. V06 §7's founding row's residue is VF7w-EPO-03 below |
| VF7v-TST-06 (with C2, C10) | scope; V04 | fixed | T110-2 (4) (l. 19445–19448): "the fixture's seed searched so that the circuit's line crosses the deck line under that span and no way, square or channel — an intervallum among them — is laid across that span's strip while a wall of this clause stands over it"; T-V4-63 (V04 l. 3164) and T-V4-80 (i) (V04 l. 3181) carry V4-1's seed conditions and "nearest lawful crossing … in the form the aqueduct's level there gives" |
| class C8, C11, C12, C13 | scope; V06; V07 | fixed | T110-2 (7) (l. 19576–19590) and T-V6-47 (V06 l. 4229): "their recorded soffits clearing the ring's top, the seed searched so that the circuit's line crosses the deck line through that support's former ring"; T-V6-11 (V06 l. 4193): "while a `breached` run there stands as the epoch's `raisedWays` step reads it (V06 §3.2, V06 §3.19 (2))"; T-V7-48 (V07 l. 3710): "along the deck within the line's reach — bent locally to the nearest lawful crossing, under a span clearing that top" |
| VF7-RDR-02 (V06 and II.7.6 halves) | V06; pipeline | fixed | V06 §3.2 (above); II.7.6's vaults sentence cites V04 §3.5.4 (d) (1)'s too-small span (P7) |
| class rule S0 | scope | in place | T110-2's lead (l. 19256–19263): every family clause "asserting the outcome those laws give its fixture — … a fixture's state as the epoch's own step order leaves it at the clause's op (V06 §3.2) — … and, where a clause's words and that outcome differ, the bar asserting the outcome" |

All nine findings of this lens are fixed or closed by a ruling, and the other fixes landing in it are in place. The
residues the fixes left in this lens are new findings below (VF7w-EPO-03, -04).

## 2. The laws attacked through the lens

The ops, paths and states examined, each against laws 1–4, the check and the named tests: the epoch's phase order (V06
§3.2: hazards at step 2, `afterField`'s landfall at 5, decline at 8, `fortification` at 9, `terrainWater` at 10, the
`raisedWays` step at 10a, growth at 14, `afterGrowth`'s `under.extend` at 15) with *Order*'s dates inside an epoch (a
contraction, re-anchored stretch or quay wall at step 9 older than a founding at 10a, a growth stage's circuit at 14 and
a dossier-admitted circuit newer) and *commit*'s epoch unit; a circuit (with §3.7.1's `t_k` rule and F-WALL's ladder),
a contraction (`contractWall` through S5a's trace step and pins, a carried way's lawful pin among them), a re-anchored
stretch, the waterfront's quay wall, the harbour-mouth chain at the nearest lawful heads, a dossier-admitted circuit
(pulled at the base rungs, VS3's form at a village rung) and a water op's re-trace (F-REDERIVE's rung); decay, breach,
patch, robust rebuild, neglect, gate opening (a junction under a clearing arch with its square), dismantling,
`wallToWay`, `absorbWall` and the renewed-threat and ring-in-use repairs (W4–W8, W10) over every raised-way state and
both aqueduct forms (a merged run keeping its condition, a dismantled run still standing for the laws, an absorbed
record's dismantled run standing nowhere); the founding (the three readings, fixed ends, the solver's impassables, the
clearing, the commit and its chambers) against a breached, dismantled, absorbed, placement-locked and hand-drawn ring,
a retaining wall and a fixed place; lapse, run-dry, strike, salvage, release, the hazards and the landfall (W12, the
next fortification phase repairing a landfall's breach in the same epoch, the span from the next); repair (B) and a
hand repair of a released way's ruined span; a frame growth at prelude, within and past a bound, with a wall across the
old end span; burial and refounding in the replay (a refounded village's palisade dated by its replay epoch's place,
*Order*'s `seq`); the arch vaults' reading and reconcile at an epoch and at a village rung (`EpochScope.raised`,
`under.extend`, maintenance mode, UC18); the village — VS3's planned palisade and its band, VS4's gates and tracks, the
palisade's decay and repair, the hand-off down (W9) and up, VS3's re-lay (W1·C9), the REPLACEMENT (W14) and its wait
under a clearing arch, F-V-RAISED, a dossier wall record — and the epoch report's `walls` and `raised` sections and V06
§3.19.1's guards. The laws give every case a lawful outcome that keeps the owner rules and law 1, the runtime check and
T110-4 read every clause of law 1 on the epoch and village paths, and no named test of the lens fails a correct build
(the class rule S0 holds the clauses whose words pin a place, form or state). What remains is four minors: restatements
of law 1 (6) that omit law 1 (4)'s anchor, a ladder text that does not state law 2 (c)'s epoch wait, a take-over row
omitting one run, and a citation that resolves to the wrong section.

### VF7w-EPO-01 — minor — LIST (law 1 (4)'s "an anchor under none" left out where law 1 (6) is restated for an aqueduct's strip) — owner V06 (END at model, pipeline, scope)

**Claim.** Law 1 (6) admits a fixed place in an aqueduct's strip "where law 1 (5) admits a gate or tower there"
(l. 2726–2727), but law 1 (4) keeps a wall's band in a raised way's strip "only to cross its deck line — entering on one
long side, leaving by the other" (l. 2721–2723), so an anchor, which ends its wall's line, lies in no raised way's strip
(correction 7: "never an anchor (law 1 (4))"). The first and second fix passes wrote this into the examples — the
fixed-place sentence "an anchor out of it always (law 1 (4))" (l. 3259–3260), *No gate and no tower* "an anchor's tower
out of it always" (l. 3153–3154), (7)'s and *Paths and tests*' "an anchor under none (law 1 (4))" (l. 3370, l. 3331),
W8·C1 (l. 3347). Five restatements of law 1 (6) in or behind this lens's texts still admit an anchor under a clearing
arch: the founding's impassables, V06 §3.19 (5) (V06 l. 2853–2855: "each fixed place of a standing curtain, with its
footprint, to a road deck's fixed-place zone and to an aqueduct's under-deck strip but where law 1 (5) admits a gate or
tower there (law 1 (6) with law 2"); the solver it calls, §4.3 *Where it may not go* (l. 6503: "no gate, postern,
tower or fixed place of the trace under it but where its arches clear them"); its worked example *over the band*
(l. 3018–3019: "a gate, postern, tower or fixed place of the trace stands under it only where the crossing is over and
its arches clear them"); V06 §3.7.1's `t_k` rule (V06 l. 1474–1475: "nor in an aqueduct's strip but where law 1 (5)
admits a gate or tower there"); and V06 §3.7.6 (5) (V06 l. 1622: "nor in an aqueduct's strip but where law 1 (5)
admits one"). T110-2 (3)'s bar names anchors and admits them so (l. 19380–19383: "0 fixed places — water gates, anchors
with their towers, … — in … an aqueduct's under-deck strip but where §2.7's laws, law 1 (5) and (6), admit one"). Each
site cites law 1 (4) or the laws whole (V06 §3.19 (5): "by §2.7's laws … (law 1 (2)–(6), law 2)"; §4.3: "law 1 (4)–(6)";
S5a's one list, which V06 §3.7.1 and §3.7.6 (5) read, keeps the line out of every strip but to cross, P2), law 2 (a)
searches only shapes law 1 admits, §5.3's law-1 row and T110-4 check law 1 (4), and T110-2 (1)'s anchor variant
(l. 19327–19330) runs the solver's case — so a correct build is unchanged and a wrong one fails a bar: a restatement the
laws already decide (as `adjudication-r7w.md` graded VF7v-TBL-03 and VF7v-EPO-05).

**Required change.** V06 §3.19 (5) (V06 l. 2854–2855): "and to an aqueduct's under-deck strip but where law 1 (5)
admits a gate or tower there (law 1 (6) with law 2;" → "and to an aqueduct's under-deck strip but where law 1 (5) admits
a gate or tower there, an anchor with its tower always (law 1 (4), (6) with law 2;". V06 §3.7.1 (V06 l. 1474–1475):
"nor in an aqueduct's strip but where law 1 (5) admits a gate or tower there (law 1 (6) with law 2;" → "nor in an
aqueduct's strip but where law 1 (5) admits a gate or tower there, an anchor in none (law 1 (4), (6) with law 2;". V06
§3.7.6 (5) (V06 l. 1622–1623): "nor in an aqueduct's strip but where law 1 (5) admits one (law 1 (6) with law 2;" →
"nor in an aqueduct's strip but where law 1 (5) admits one, an anchor in none (law 1 (4), (6) with law 2;". END at
pipeline, §4.3 *Where it may not go* (l. 6503): "no gate, postern, tower or fixed place of the trace under it but where
its arches clear them," → "no gate, postern, tower or fixed place of the trace under it but where its arches clear
them, an anchor under none,". END at model, *over the band* (l. 3018–3019): "a gate, postern, tower or fixed place of
the trace stands under it only where the crossing is over and its arches clear them," → "a gate, postern, tower or
fixed place of the trace stands under it only where the crossing is over and its arches clear them, an anchor under
none (law 1 (4)),". END at scope, T110-2 (3) (l. 19382–19383): "in a road deck's fixed-place zone or in an aqueduct's
under-deck strip but where §2.7's laws, law 1 (5) and (6), admit one," → "in a road deck's fixed-place zone or in an
aqueduct's under-deck strip but where §2.7's laws, law 1 (5) and (6), admit one, an anchor in none (law 1 (4)),".

### VF7w-EPO-02 — minor — READER (law 2 (c)'s epoch wait for a circuit not stated where F-WALL's ladder binds an epoch's trace) — owner V06 (END at determinism, pipeline)

**Claim.** Law 2 (c) gives an epoch's trace with no lawful shape one outcome: "At an epoch and in a replay: the op
waits that epoch (`walls.waited`, `raised.waited`)" (l. 2836–2837); the crossing table's (G3) repeats it ("at an epoch
waiting", l. 2958–2959), and V06 §3.7.6 (5) counts it ("a trace never waits for a raised way but by §2.7's laws, law 2
(c) … `walls.waited` counting those waits", V06 l. 1627–1631). The texts a builder of an epoch circuit follows first do
not: V06 §3.7.1 (V06 l. 1479–1480: "F-WALL's ladder (§5.2) binds the trace; a trace that fails it leaves the stage
unwalled, the circuit re-evaluated at the next growth (reported)") and V06 §3.17 (3) (V06 l. 2496–2497: "a circuit whose
trace fails leaves the stage unwalled (V06 §3.7.1)") send it to F-WALL, whose detection names the raised-way meeting
(l. 9855) while its ladder cell gives that meeting a rung only "at generation, a regeneration and a village
derivation" and a hand op none, the epoch unnamed; and S5a's pin rule, which an epoch's new stage and `contractWall`
run, ends "that crossing takes F-WALL's raised-way rung" with no path (l. 6603). A builder may run the generation rung
at an epoch — the band widened to `wall.barrierReachM`, the circuit laid farther out — or leave the stage unwalled with
no `walls.waited` count. Both keep law 1; law 2 (c) decides the epoch's outcome (the wait, never widened), and T110-2
(4)'s table-edit variant asserts it ("an epoch circuit across the standing aqueduct waiting (`walls.waited`)",
l. 19490–19492), so a wrong build fails a named bar: a minor. (What a waiting circuit does to its stage is the
circuit's own law, V06 §3.7.1's unwalled stage; the general question is held note 1.)

**Required change.** V06 §3.7.1 (V06 l. 1479–1480): "a trace that fails it leaves the stage unwalled, the circuit
re-evaluated at the next growth (reported)." → "a trace that fails it leaves the stage unwalled, the circuit
re-evaluated at the next growth (reported) — a trace §2.7's laws give no lawful meeting of a standing raised way, a held
building's strip or a shape-locked raised way's `vault`-use span among them, which takes no rung of that ladder and is
counted `walls.waited` (§2.7's laws, law 2 (c); V06 §3.7.6 (5))." V06 §3.17 (3) (V06 l. 2496–2497): "a circuit whose
trace fails leaves the stage unwalled (V06 §3.7.1)" → "a circuit whose trace fails leaves the stage unwalled (V06
§3.7.1; one with no lawful meeting of a standing raised way counted `walls.waited`, never taking F-WALL's raised-way
rung: §2.7's laws, law 2 (c))". END at determinism, §5.2's F-WALL ladder cell (l. 9855): after "reading then as §4.2
S3 (9) (a)'s unwalled stage (§2.7's laws, law 2 (c));" insert " at an epoch it takes no rung of it: the epoch's
circuit, contraction or stretch waits that epoch, counted `walls.waited` (V06 §2.10; V06 §3.7.1; §2.7's laws, law 2
(c));". END at pipeline, §4.4 S5a *Trace* (2) (l. 6603): "that crossing takes F-WALL's raised-way rung (§2.7's laws,
law 1 (5); law 2 *Not yet built*, (a), (c))" → "that crossing takes F-WALL's raised-way rung, at an epoch its trace
waiting (`walls.waited`) (§2.7's laws, law 1 (5); law 2 *Not yet built*, (a), (c))".

### VF7w-EPO-03 — minor — LIST (V06 §7's founding row omits the founding across a ring drawn by hand and placement-locked) — owner V06

**Claim.** T110-2 (1) runs the CITY-epoch founding "on a third run across a ring drawn by hand and placement-locked by
the user" and "on a fourth across a retaining wall drawn by hand and placement-locked by the user" (l. 19311–19316).
The base's runs sentence (l. 19648–19649) and take-over row (l. 19897) and T-V6-73's head (V06 l. 4255) all say T-V6-73
takes "(1)'s foundings across a decayed ring and across a ring and a retaining wall drawn by hand and placement-locked",
and T-V6-73's body runs the ring ("on a third run, its CITY ring drawn by hand and placement-locked by the user before
that epoch"). V06 §7's take-over row for those clauses (V06 l. 4173), written by V6-7, names "the founding across a
retaining wall drawn by hand and placement-locked" and not the ring. T-V6-73 still runs it, so nothing built or tested
changes.

**Required change.** V06 §7's T110-2 founding row (V06 l. 4173): "and the founding across a retaining wall drawn by hand
and placement-locked," → "and the foundings across a ring and a retaining wall drawn by hand and placement-locked,".

### VF7w-EPO-04 — minor — CITATION (a bare "§3.2" for V06's phase order) — owner scope; V06

**Claim.** The lock that VF7v-EPO-01's fix adds cites the epoch's phase order as "V06 §3.1, §3.2, V06 §3.7.5" at
T110-2 (1) (l. 19310) and at T-V6-73 (V06 l. 4255). By the canon's S7 citation form (`canon.md` l. 83: "Base: bare
'§x.y'. A volume: 'Vnn §x.y' everywhere, self-references included"), the bare "§3.2" is the base's §3.2, *Numeric
policy* (l. 4334), not V06 §3.2's phase order the clause relies on ("the epoch's `fortification` step, which runs before
its `raisedWays` step"). assemble-r7w left it for the verifier (section 8: "It reads as the base's under S7, while the
clause's sense (the epoch's phase order) is V06 §3.2's"). T-V6-11 cites the same section rightly ("V06 §3.2, V06 §3.19
(2)", V06 l. 4193). Nothing built changes.

**Required change.** T110-2 (1) (l. 19310): "V06 §3.1, §3.2, V06 §3.7.5" → "V06 §3.1, V06 §3.2, V06 §3.7.5"; T-V6-73
(V06 l. 4255): "V06 §3.1, §3.2, V06 §3.7.5" → "V06 §3.1, V06 §3.2, V06 §3.7.5".

## 3. Held for round 8 (outside the family)

1. V06 §3.7.1 (V06 l. 1479–1480) × §3.7.6 (2) (V06 l. 1573–1574) × §3.17 (3), (7) (V06 l. 2496–2497, 2508–2510): a
   circuit trace that fails F-WALL "leaves the stage unwalled, the circuit re-evaluated at the next growth", while one
   that cannot hold water access and the occupied-footprint rule "waits for a later epoch"; for the latter, whether the
   walled stage grows unwalled that epoch or waits whole, and whether the circuit is tried again at the next epoch or
   only at the next growth (V06 §3.7.1: "Evaluated once, when the growth phase grows a stage"), is unstated — wall ×
   water and footprints, no raised way.
2. `adjudication-r7w.md`'s held notes 1 (V07 §3.5a (5) and (7) × §2.7's support step (6): a plot under a `vault` span)
   and 2 (V06 §3.11.6 and II.7.6's `raiseGrade`: what a raised region does to a run or a raised way standing in it)
   persist as written there.

## 4. Verdict for the lens

Over the epochs the family holds: every op an epoch, a replay, a village epoch or a village derivation runs — circuits,
contractions, re-anchored, waterfront, dossier and repaired stretches, the harbour-mouth chain, the water ops'
re-traces, decay, gate opening, dismantling, `wallToWay`, `absorbWall`, the ring-in-use and renewed-threat repairs, the
founding, lapse, strike, salvage, the hazards, the landfall, repair, the frame growth, burial, refounding, the hand-offs
and the REPLACEMENT — meets every raised-way state by §2.7's laws with a lawful outcome, law 2 (c) giving each its
path's ladder or an epoch's wait (the frame growth its kept course), and the arch vaults follow law 1 (8) through
`EpochScope.raised` and `under.extend` at every rung. All nine round-7v findings of the lens are fixed or closed by a
ruling (VF7v-EPO-06's valid choice listed), and the fixes of the other lenses that land here are in place; the
placement lock now holds T-V6-73's breached ring through the `fortification` step, so its founding clause no longer
fails a correct build. No major remains: four minors — restatements of law 1 (6) that omit law 1 (4)'s anchor
(VF7w-EPO-01), F-WALL's ladder and V06's failure texts not naming law 2 (c)'s epoch wait (-02), a take-over row omitting
the hand-drawn ring (-03), and a bare "§3.2" that resolves to the base's numeric policy (-04). Nothing is reported on
J150's hand-offs.
