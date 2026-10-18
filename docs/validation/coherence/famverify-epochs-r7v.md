# Family verify — round 7v: epochs, decay and the village (raised way × wall, J144)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/famverify-epochs-r7v; covered by the
> whole-design retrovalidation (J84).

PROGRESS (lane `coherence/famverify-epochs-r7v`, 2026-10-02; fresh start, no earlier CHECKPOINT of this seat)
- [x] R1 read whole: the brief; adjudication-r7 Part L, the worked-example corrections, the restated veto list, R7-04,
  R7-06; adjudication-r7v whole; famverify-epochs-r7; PROGRESS J144 – J151; the live §2.7 support step (6) — (0) the
  laws, both tables — and (7); V06 §2.1, §2.8, §2.10, §3.2, §3.7, §3.19, §3.20, §3.21, ## 7; V05 §3.16; V04 §1b.2,
  §3.5.4 (d), §3.10, §3.11 UC18, T-V4-62, -63, -80 (i); V07 §3.4, §3.5a, §3.12
- [x] R2 the round-7 family findings in this lens re-checked against the live text: VF7-EPO-01 – -06 fixed; the
  eight other round-7 findings whose fixes land in this lens's texts fixed (below)
- [x] R3 the laws attacked through the lens: 9 findings — 1 major, 8 minor (one a VALID CHOICE); 2 held notes
- [x] R4 this file, the result JSON (`results/coherence_famverify-epochs-r7v.json`), LANDED

Grading: J141's standard as J146 and J151 apply it to this family — MAJOR only where the laws (or the design text
written from them) give a case no lawful outcome, give one that breaks an owner rule or a law-1 invariant, leave a
law-1 invariant checked by no bar, or make the runtime check or a named test fail a correct build; where every outcome
keeps the laws, the owner rules, the check and the named tests, a VALID CHOICE (minor); an example that contradicts the
laws, a citation, a restatement the laws already decide, or a fixture that may not hold its case, a minor. Nothing
below concerns a lock's behaviour under an undo, a redo, a re-grade or value edit within a standing meeting or a repair,
or the two-axis lock and its readers outside the family's meetings (J150, Part A): those are round 8's and are not
reported.

## 1. The round-7 family findings in this lens, against the live text

Line numbers are the live files' at HEAD 7fda090 (`docs/ARCHITECTURE.md` unless a volume is named).

| id | unit | verdict | live evidence |
|---|---|---|---|
| VF7-EPO-01 | V06 | fixed | H-AQUA (V06 l. 4108–4113): "its near rim just beyond the ring's outer wall strip, so that the reading's `A` lies there and the viaduct's foot at `A`, widened by `raisedWays.structure.stripMarginM`, lies clear of the ring's band, wall strips and gatehouse, the main approach road's gate standing beyond the foot (§2.7's laws, law 1 (4); its terms' *beyond the foot*)" — V6-1's words |
| VF7-EPO-02 | V06 | fixed | T-V6-11 (V06 l. 4184): "H-AQUA's span over its CITY ring, the recipe's seed searched so that no way, square or channel is laid across that span's strip while the ring stands over it" — V6-2's words (the absorb's S10 re-cut lays no plot there: §4.6, l. 7205–7209, holes every under-deck strip) |
| VF7-EPO-03 | V04 | fixed (VF7-TST-08 merged) | T-V4-63 (V04 l. 3164): "re-derived with the extension, save one a wall-like structure crosses, kept as it stands and the extension laid on from the old foot's point (§2.7's support step (7); §2.7's laws, law 2 (c))" — V4-2's words |
| VF7-EPO-04 | V06 | fixed | `walls.waited`'s comment (V06 l. 755) names the shape-locked raised way's `vault`-use span, the REPLACEMENT's wait (row W14) and "law 1 (9)–(11)"; §3.7.6 (5)'s continuity bullet (V06 l. 1621–1623) names the shape-locked span with "(law 1 (9), (10) …)" — V6-3's words. The same omission at two further restatements is VF7v-EPO-04 below |
| VF7-EPO-05 | V06 | fixed | J-V6.91 (V06 l. 4505): "*amended by §2.7's laws.* … they meet by §2.7's laws (law 1 (2)–(4): an aqueduct crossing a curtain at its own level, over it on an arch or merged into it, whichever was laid first; … a trace waiting only by §2.7's laws, law 2 (c))" — V6-4's words |
| VF7-EPO-06 | V06, V05 | fixed at its eight sites | W68 (V06 l. 351), §3.7.4 (4) (l. 1533–1534), §3.17 (9) (l. 2506–2508), §3.19's lead (l. 2762), §3.19 (5) (l. 2852–2853), §3.21's raised-way row (l. 3337), §7's two T110-2 rows (l. 4163–4164), J-V6.114 and J-V6.140 (l. 4528, 4554), V05 T-V5-14 (V05 l. 2565, 2567) — each now "§2.7's laws …; its worked example …". The sweep did not reach V07's T-V7-48 (VF7v-EPO-03 below) |

Other round-7 findings whose fixes land in this lens's texts:

| id | unit | verdict | live evidence |
|---|---|---|---|
| VF7-TST-06 | V07 | fixed | V-M3's cell (V07 l. 3764): "those whose arch-vault outcome follows a village epoch's wall event (the REPLACEMENT's, the `absorbWall`'s and the sweep's epoch C6 runs) at the later of that exit, V04's U5 and V06's E8"; §1 (14) (V07 l. 192–197) names the epoch's reconcile (E8) |
| VF7-TST-07 (V06 half, V6-8) | V06 | fixed | T-V6-47 (V06 l. 4220): "an epoch contraction laid after a support by its planned line was `cleared`, both its spans fallen first" |
| VF7-TST-13 | V06; scope | fixed | V06 §7's T110-2 rows (V06 l. 4163–4164) in V6-6's words; the base's runs sentence (l. 19601–19604) and take-over row (l. 19850) name "(4)'s arch-vault circuit by T-V4-80 (i)" |
| VF7-GEN-01 (V06 half, V6-7) | V06 | fixed | "over where its channel runs above the wall's top and every span over the band clears it, merged where its channel runs within the wall's height" at V06 §3.7.6 (5) (l. 1609–1611), §3.19 (5) (l. 2855–2857), T-V6-11 (l. 4184), T-V6-47 (l. 4220), T-V6-73 (l. 4246) |
| VF7-RDR-02 (V04 half, V4-3) | V04 | fixed | T-V4-62 (V04 l. 3163) and T-V4-63's two clauses (V04 l. 3164) carry "one too small for a chamber none, reported, V04 §3.5.4 (d) (1)"; law 1 (8) (l. 2734–2735) cites V04 §3.5.4 (d). V06 §3.2's restatement of the old clause is VF7v-EPO-02 below |
| VF7-TST-03 | V04 | fixed | T-V4-80 (i) (V04 l. 3181): "the circuit crossing the deck line clear of that span's strip at the aqueduct's level and the hand `drawWall` moved along the deck line to the nearest crossing clear of the building's widened strip (§2.7's laws, law 1 (2), (9), law 3)" |
| VF7-TBL-07 (V06 half, V6-9) | V06 | fixed | V06 §3.6 (4) (l. 1441–1442): "the raised way kept (§2.7's support step (6))"; (7)'s "the way being kept ((6))" (l. 3364) |
| VPC-r6-03 | determinism; scope | fixed | §7.3 (b) 3 (l. 11690–11693), which an epoch's `shiftCourse`, avulsion and `digCanal` run (V06 §3.12, l. 2217–2218): "every way but a kept way at a gate and a standing raised way, whose deck passes over the run, that the new strips will meet (the raised way met by §2.7's laws, law 2 (a) …)"; F-REDERIVE's raised-way rung (l. 9869) and T110-2 (5) (l. 19486–19488) |

All six findings of this lens and the eight others above are fixed in the live text. Where a fix's sweep left a residue
in this lens, it is a new finding below.

## 2. The laws attacked through the lens

The ops, paths and states examined, each against laws 1–4 and the check: the epoch's phase order (V06 §3.2: hazards,
decline, `fortification`, `terrainWater`, `raisedWays`, `growth`, `afterGrowth`'s `under.extend`) and *Order*'s dates
inside an epoch (a contraction or re-anchored stretch at step 9 older than a founding at step 10a, a growth stage's circuit
at step 14 newer); a circuit (with §3.7.1's `t_k` rule), a contraction, a re-anchored stretch, the waterfront's quay wall
and harbour-mouth chain, a dossier-admitted circuit and a water op's re-trace (W1 at E; F-REDERIVE's raised-way rung); a
run's decay, breach, patch, rebuild, neglect, gate opening, dismantling, `wallToWay`, `absorbWall` and the ring-in-use
and renewed-threat repairs (W4–W8, W10) over every raised-way state, over and merged crossings; the founding (its three
readings and their fixed ends, the course solver's impassables, the clearing, the commit and its chambers), lapse,
run-dry, strike, salvage, release, the hazards (topple, inundate, the landfall), repair (B), the suppression and the
cap; the landfall's rows and members (W12); a frame growth with and without a wall across the old end span, within and
past a bound; burial and refounding in the replay; the arch vaults' reading and reconcile at an epoch
(`EpochScope.raised`, `under.extend`, the later `afterGrowth` participants, maintenance mode at a village rung, UC18);
the village: VS3's palisade and its band, VS4's gates and tracks, the palisade's decay and repair, the hand-off down
(W9) and up, VS3's re-lay (W1·C9), the REPLACEMENT (W14), F-V-RAISED and a dossier wall record's palisade; and the
epoch report's `walls` and `raised` sections and V06 §3.19.1's guards. The laws give every case a lawful outcome that
keeps the owner rules (no case without one was found). The one major is a fixture whose recipe makes a named test fail a
correct build through the epoch's own step order; the minors are restatements and report comments that omit a case
their cited laws decide, a worked example narrower than law 1 (5), a fixture naming a raised way §4.3 excludes, a table
citation, and one VALID CHOICE.

### VF7v-EPO-01 — major — FIXTURE-AGAINST-ORDER (a named test fails a correct build) — owner V06 (END at scope)

**Claim.** T-V6-73 (V06 l. 4246) takes T110-2 (1)'s founding across a decayed ring (l. 19291–19293) and runs it on
H-AQUA: "H-AQUA's aqueduct founded at its CITY epoch where the ring's run at its course is `breached` and, on a second
run, `dismantled` (by a hand `convert` the fixture logs before that epoch) — *over the band* (…), the gap left a gap
beneath the arch, no `repairWall`". The epoch runs `fortification` (step 9) before `raisedWays` (step 10a) (V06 §3.2,
l. 1006, 1008), and the founding reads "the state after `terrainWater` and (B)" (V06 §3.19 (2), l. 2784). At that step
9, V06 §3.7.5 (l. 1551–1554) repairs "a ring with no pathway whose `condition` holds a `breached` run while its threat
exceeds `walls.neglectThreatMax` — a landfall's breach … or a hand `breach` — … at the next `fortification` phase",
item 114 making that repair the NEED-`high` rows (V06 §3.7.7 (3), l. 1668: "V06 §3.7.5's renewed-threat and ring-in-use
repairs are the NEED-`high` rows above: robust with the means, patched without them"). H-AQUA's recipe (V06
l. 4101–4122) scripts no threat, yet it needs a METROPOLIS circuit — "the span whose strip the METROPOLIS epoch's circuit
later crosses", "its far foot `B` beyond the land the METROPOLIS epoch's circuit encloses"; T-V6-47 (l. 4220) runs it —
and a circuit fires only while "`threat ≥ walls.threatMin`" (V06 §3.7.1, l. 1455). With the one site threat the recipe
gives, NEED is therefore `high` at the CITY epoch ("at the first epoch: `high` at or above `threatMin`", V06 §3.7.7 (1),
l. 1636–1639), so a correct build repairs the hand breach (`repairWall`, patched or robust) in that epoch's
`fortification` step, before the `raisedWays` step founds the aqueduct: the founding meets a standing run, and the
clause's "the gap left a gap beneath the arch, no `repairWall`" fails a correct build. No build passes both this clause
and the fixture's METROPOLIS circuit on one threat — VF7-EPO-01's class (a fixture recipe that makes a named test fail a
correct build), graded so by adjudication-r7v (J151: "a check or test that would fail a correct build stays MAJOR").
The `dismantled` run is never repaired (V06 §3.7.5, l. 1548–1549), so only the `breached` run fails; T-V6-73's variant
viaduct waits whether or not the breach is repaired, so it stands.

**Required change.** T-V6-73 (V06 l. 4246): "(by a hand `convert` the fixture logs before that epoch)" → "(by a hand
`convert` the fixture logs before that epoch, the site's threat scripted below `walls.threatMin` from the fixture's
start through that epoch, so that NEED is not `high` and the epoch's `fortification` step, which runs before its
`raisedWays` step, repairs no breach of the ring: V06 §3.2, §3.7.5, §3.7.7 (1), (3))". END at scope, T110-2 (1)
(l. 19291–19292): "the same aqueduct founded by V06 §3.19 at a CITY epoch across the ring where its run is `breached`
and, on a second run, `dismantled` —" → "the same aqueduct founded by V06 §3.19 at a CITY epoch across the ring where
its run is `breached` (the ring's NEED not `high` through that epoch, so that the epoch's `fortification` step, before
its `raisedWays` step, repairs no breach: V06 §3.2, §3.7.5, §3.7.7 (3)) and, on a second run, `dismantled` —".

### VF7v-EPO-02 — minor — READER (law 1 (8)'s superseded chamber clause restated) — owner V06

**Claim.** END-L1 (adjudication-r7v M10) narrowed law 1 (8) to "a span read `vault` has the chamber V04 §3.5.4 (d)
lays" (l. 2734–2735), because V04 §3.5.4 (d) (1) lays none in a span whose inset rectangle falls below `minEdge`
(V04 l. 1707–1708: "An inset rectangle below `minEdge` on a side is no chamber: the span stays unvaulted in the model and
is reported"); V04's bars were conformed (V4-3). V06 §3.2's paragraph on the reconcile still states the old clause twice
(assemble-r7v's open note): "a chamber for each standing `vault` span that §2.7's laws read `vault`" (l. 1041) and "the
reconcile is the epoch-side guarantee that … every `vault` span they read `vault` has its chamber (`collapsed` where V04
§3.5.4 (d) (2) says)" (l. 1047–1049). It restates instead of citing; the reconcile is V04's and no V06 bar asserts the
guarantee (T-V6-64, l. 4237, takes V04's one wording), so nothing built changes.

**Required change.** V06 §3.2 (l. 1041): "a chamber for each standing `vault` span that §2.7's laws read `vault`" → "the
chamber V04 §3.5.4 (d) (1) lays in each standing `vault` span that §2.7's laws read `vault`"; (l. 1048–1049): "and that
every `vault` span they read `vault` has its chamber (`collapsed` where V04 §3.5.4 (d) (2) says)" → "and that every
`vault` span they read `vault` has the chamber V04 §3.5.4 (d) lays (none in one too small for a chamber, reported;
`collapsed` where V04 §3.5.4 (d) (2) says)".

### VF7v-EPO-03 — minor — CITATION (the way-and-channel table cited alone) — owner V07

**Claim.** Part H's head binds every family text to cite "§2.7's laws" with the law's number, a row following as its
worked example; VF7-EPO-06's sweep conformed V06 and V05 but not V07. T-V7-48 (V07 l. 3710), the village's `wallToWay`
clause: "the ring road by §2.7's way-and-channel table (row c)". It resolves to an existing row; nothing built changes.

**Required change.** T-V7-48 (V07 l. 3710): "the ring road by §2.7's way-and-channel table (row c)" → "the ring road by
§2.7's laws (law 1 (1), (8); its worked example the way-and-channel table's row (c))".

### VF7v-EPO-04 — minor — LIST (a shape-locked raised way's `vault`-use span left out where a held building's strip is named) — owner V06 (END at V07, determinism)

**Claim.** VF7-EPO-04's class at four more restatements. Law 1 (10) keeps "a wall-like line, band or strip newly across
the strip of a `vault`-use span" of a shape-locked raised way out as law 1 (9) keeps a held building's strip (l.
2736–2743), and V06 §2.10 and §3.7.6 (5) now name both (l. 755, 1621–1623). These name the held building alone: V06
§3.7.1's `t_k` rule (l. 1471: "— never a held building's strip, which the trace keeps clear (law 1 (9))"); V07 §3.13's
F-V-RAISED detection (V07 l. 2770: "or a held building's widened strip it cannot keep clear (§2.7's laws, law 2 (c);");
§5.2's F-WALL detection, which binds an epoch circuit (V06 §3.7.1, l. 1477–1478) (l. 9852: "a held building's widened
strip it cannot keep clear, or a carried way given no lawful gate and no re-route (§2.7's laws, law 2 (c), law 1 (6),
(9), law 2 *Carried way*;"); and §5.2's F-REDERIVE raised-way detection, which an epoch's water op takes (l. 9869: "or a
held building's widened strip it cannot keep clear (§2.7's laws, law 2 (c), law 1 (6), (9);"). Each one's "no lawful
crossing" already covers the case, and no op can make a shape lock before round 8 designs it (adjudication-r7.md
Part A), so nothing built or tested changes.

**Required change.** V06 §3.7.1 (l. 1471): "— never a held building's strip, which the trace keeps clear (law 1 (9))"
→ "— never a held building's strip or a shape-locked raised way's `vault`-use span's strip, which the trace keeps clear
(law 1 (9), (10))". END at V07, §3.13's F-V-RAISED (V07 l. 2770): "or a held building's widened strip it cannot keep
clear (§2.7's laws, law 2 (c);" → "or a held building's widened strip or a shape-locked raised way's `vault`-use span's
strip it cannot keep clear (§2.7's laws, law 2 (c), law 1 (9), (10);". END at determinism, §5.2's F-WALL (l. 9852): "a
held building's widened strip it cannot keep clear, or a carried way" → "a held building's widened strip or a
shape-locked raised way's `vault`-use span's strip it cannot keep clear, or a carried way", and "(§2.7's laws, law 2
(c), law 1 (6), (9), law 2 *Carried way*;" → "(§2.7's laws, law 2 (c), law 1 (6), (9), (10), law 2 *Carried way*;";
§5.2's F-REDERIVE (l. 9869): "or a held building's widened strip it cannot keep clear (§2.7's laws, law 2 (c), law 1
(6), (9);" → "or a held building's widened strip or a shape-locked raised way's `vault`-use span's strip it cannot keep
clear (§2.7's laws, law 2 (c), law 1 (6), (9), (10);".

### VF7v-EPO-05 — minor — READER (the founding's restatement of the meeting omits two cases its cited laws decide) — owner V06

**Claim.** V06 §3.19 (5) (l. 2850–2860) says a founded course "meets a standing curtain — locked, pinned, declared or
not … — by §2.7's laws, nothing of either written (law 1 (2)–(6), law 2): an aqueduct *over the band* …, crossing the
curtain at its own level in the form that level gives — over …, merged where its channel runs within the wall's height
(law 1 (2)) —, …; a road deck *down before the wall* …, founded with its two ends fixed, so not founded where its course
would cross a standing curtain: it waits, `raised.waited` (law 2 (c))". Two cases its cited laws decide are left out of
the restatement: a shape-locked curtain is never merged into (law 1 (10), l. 2739–2743; *over the band*, l. 3028–3029:
"a shape-locked one never merged into"; §4.3 *Where it may not go*, l. 6502, the solver (5) calls, says so); and a road
deck whose fixed end a standing curtain's line, band or wall strips would lie over waits as one whose course would cross
it (law 1 (4), l. 2721–2723) — VF7-EPO-01's case, now fixed in H-AQUA's recipe but not in the rule's words. §2.10's
`raised.waited` comment (V06 l. 770) reads the ends only "against a standing trace's gates, posterns, towers or fixed
places (law 1 (4)–(6) …)". The text cites the laws, which decide both; the solver carries the shape lock; no op makes a
shape lock before round 8 — so nothing built changes.

**Required change.** V06 §3.19 (5) (l. 2851–2852): "and meets a standing curtain — locked, pinned, declared or not," →
"and meets a standing curtain — placement-locked, pinned, declared or not,"; (l. 2856–2857): "merged where its channel
runs within the wall's height (law 1 (2)) —," → "merged where its channel runs within the wall's height, a shape-locked
curtain never merged into (law 1 (2), (10)) —,"; (l. 2859–2860): "founded with its two ends fixed, so not founded where
its course would cross a standing curtain:" → "founded with its two ends fixed, so not founded where its course would
cross a standing curtain or a curtain's line, band or wall strips would lie over an end of it (law 1 (4)):". §2.10's
`raised.waited` comment (V06 l. 770): "no course keeps lawful against a standing trace's gates, posterns, towers or
fixed places (law 1 (4)–(6), law 2 (c);" → "no course keeps lawful against a standing trace's line, band and wall
strips, gates, posterns, towers or fixed places (law 1 (2), (4)–(6), (10), law 2 (c);".

### VF7v-EPO-06 — minor — VALID CHOICE (an elevated road's anchor where its end would lie over a wall) — owner V06

**Claim.** V06 §3.19 (2) (l. 2802–2805) reads each elevated-road endpoint's anchor as "its highest part-0 way vertex
inside it or on its boundary (ties by address)", filtering by §2.7's laws only for a citadel ("a citadel's, the highest
vertex of its castle street outside the castle's wall strips at which the road's ends and zone keep the town-side gate
and the castle's fixed places clear (§2.7's laws, law 1 (4), (6); law 2 (a) …)"). A high ward or terraced district
bounded by an enceinte — walls run on high ground — can have that vertex at a gate's junction on its boundary or on a
way beside the inner setback line, so that the road's end there lies under the wall's band or wall strips (law 1 (4),
l. 2721). The laws give two outcomes, both lawful: (i) the ends being fixed (V06 §3.19 (5), l. 2859; *down before the
wall*, l. 3044–3047), no lawful course — the candidate waits, `raised.waited` (law 2 (c)), at every epoch while the wall
stands; (ii) the anchor read, as the citadel's is, as the highest part-0 way vertex at which the road's ends keep clear
of every enclosing wall's line, band and wall strips (law 1 (4); law 2 (a): a raised way's ends where its own law picks
them). Each keeps every law-1 invariant and owner rule (item 110 (b)'s reason and rung gate stand either way), passes the
check, and fails no named test (T-V6-57, l. 4230, and T110-3 read neither). The same reading serves S6's end at
generation (§4.3, l. 6476–6479, takes V06 §3.19 (2)'s three readings).

**Required change.** None in the design text: list in fix-list.md — "V06 §3.19 (2): an elevated road's non-citadel
anchor whose end would lie under an enclosing wall's line, band or wall strips — the candidate waits (`raised.waited`,
its ends fixed), or the anchor is the highest part-0 way vertex at which the road's ends keep clear of them, as the
citadel's anchor (§2.7's laws, law 1 (4), law 2 (a), (c)); the builder picks one."

### VF7v-EPO-07 — minor — LIST (the harbour-mouth chain left out of "raised ways on every trace") — owner V06

**Claim.** V06 §3.7.6 (5) (l. 1601–1603) binds "every trace this section makes — a circuit, a shorter ring, a
re-anchored or repaired stretch, the waterfront's quay wall —" to meet the standing raised ways by §2.7's laws, but not
(3)'s harbour-mouth chain (l. 1580–1583: "a walled port without a harbour-mouth chain gains one the first epoch its
harbour mouth is enclosed: two towers on the mole or breakwater heads (or the shores) and a water gate across the
entrance … A tower or fort already standing at a mole head … is the chain's anchor there"), a fixed place of the wall
(the laws' terms, l. 2627–2631). The fixed-place sentence names this op — "A harbour-mouth chain laid after the raised
way (S7, V06 §3.7.6 (3), a hand `placeGate` re-adding it) is laid across the entrance at the nearest heads or shore
points, along the entrance, whose gate and towers lie where law 1 (5) and (6) admit them; with none it … waits at an
epoch (`walls.waited`)" (l. 3256–3259) — and `walls.waited`'s comment (V06 l. 755) counts only "traces". Law 4 binds the
chain op whatever V06 says, and the laws give one outcome (a landmark tower standing at a head inside a road deck's zone
is no lawful anchor: the chain at the next lawful heads or shore points, else waiting), so nothing built changes.

**Required change.** V06 §3.7.6 (5) (l. 1601–1603): "Every trace this section makes — a circuit, a shorter ring, a
re-anchored or repaired stretch, the waterfront's quay wall — meets the standing raised ways by §2.7's laws" → "Every
trace this section makes — a circuit, a shorter ring, a re-anchored or repaired stretch, the waterfront's quay wall —
and (3)'s harbour-mouth chain meet the standing raised ways by §2.7's laws"; (3)'s chain bullet (l. 1582–1583): after "a
tower is added only at a head where none stands" add "; its gate and towers stand only where §2.7's laws, law 1 (5) and
(6), admit them — at the nearest heads or shore points along the entrance that do, a standing tower barred there being
no anchor, else the chain waiting (`walls.waited`; law 2 (a), (c); its worked example the fixed-place sentence)";
`walls.waited`'s comment (V06 l. 755): "and traces that no lawful crossing of a standing raised way or clear point for
a fixed place admits" → "and traces and harbour-mouth chains (V06 §3.7.6 (3)) that no lawful crossing of a standing
raised way or clear point for a fixed place admits".

### VF7v-EPO-08 — minor — TEST-CASE (a fixture names a raised way §4.3 excludes) — owner scope

**Claim.** T110-4 (a) (l. 19565–19566) runs §5.3's law-1 row on "T-V6-48 (with a declared viaduct over its harbour
mouth)", the one fixture meant to set a harbour-mouth chain laid at an epoch (T-V6-48, V06 l. 4221: "a walled port
gains its harbour-mouth chain the first epoch its mouth is enclosed") against a raised way (the fixed-place sentence's
"A harbour-mouth chain laid after the raised way", l. 3256–3259). §4.3 *Where it may not go* (l. 6500–6501) treats "the
harbour basin and its mouth — between the mole heads or shores that carry item 106's harbour-mouth gate — as excluded
(masts must pass; a stroke across it is bent to end at its last ground vertex before the basin …)", so no declared
viaduct stands over the mouth and the variant cannot hold its case. The bar asserts only law 1, so a correct build
passes it; the case is unrun (R6-11's class: a fixture must hold its case).

**Required change.** T110-4 (a) (l. 19565–19566): "T-V6-48 (with a declared viaduct over its harbour mouth)" →
"T-V6-48 (with a declared viaduct along its harbour's shore whose fixed-place zone holds a head of its harbour mouth
before the chain is laid, its course kept off the basin and the mouth by §4.3 *Where it may not go*)".

### VF7v-EPO-09 — minor — EXAMPLE-AGAINST-LAW (row W14 waits where law 1 (5) admits a gate) — owner model

**Claim.** Row W14 (l. 3353), the palisade REPLACEMENT at a village epoch: in its event cell "the REPLACEMENT waiting
where a standing gate's stone footprint would meet a strip, or its new top would rise past the soffit of an aqueduct's
arch over a kept gate (law 1 (5))", and in its C2 cell "a re-section whose new footprint of one would meet a strip, or
whose new top would leave one in a crossing law 1 (5) bars …, having no lawful shape there (law 2 (c))". Law 1 (5)
(l. 2724–2725) admits a gate's or tower's footprint in an aqueduct's strip "in an aqueduct's crossing law 1 (2) reads
over whose every span over it clears its top"; law 2 tries (c) only where (a) leaves no lawful shape (l. 2752–2754). V07
§3.11 (V07 l. 2313–2315) words it by the law ("where a kept gate would then stand where law 1 (5) bars one … the
REPLACEMENT waiting"), as T-V7-48 does (V07 l. 3710: "the arch clearing the palisade and the gate but not the stone
wall's top, the REPLACEMENT waiting"). The example's "would meet a strip" makes the REPLACEMENT wait under an arch that
clears the stone gatehouse and the wall; the laws govern (§2.7's examples sentence, l. 2893–2894), so it is a minor,
the example corrected.

**Required change.** Row W14 (l. 3353), event cell: "the REPLACEMENT waiting where a standing gate's stone footprint
would meet a strip," → "the REPLACEMENT waiting where a standing gate's stone footprint would lie where law 1 (5) bars
it (in a road deck's under-deck strip, or in an aqueduct's but under arches that clear it),"; its C2 cell: "a
re-section whose new footprint of one would meet a strip," → "a re-section whose new footprint of one would lie where
law 1 (5) bars it,".

## 3. Held for round 8 (outside the family)

1. V07 §3.5a (5) (V07 l. 1635–1642) × (7) (V07 l. 1650–1651) × §2.7's support step (6)'s lead (l. 2575–2578): (5)
   lets "Crofts, closes (a reached close included) and paddocks … pass beneath" a deck and lays a toft slot meeting the
   strip "as a **close**", while (7) says "Inside the perimeter the strip holds no plot" and (6) makes each `vault`
   span's strip a reservation everything later gives way to — a plot under a `vault` span (raised way × plots).
2. V06 §3.11.6 (V06 l. 2173–2182) and II.7.6's `raiseGrade` (l. 22798–22808): no text says what a raised region does to
   an enceinte run or a raised way standing in it — whether a run's base and top rise with the ground, a pier's height,
   a span's headroom and its arch vault's ceiling — all of which law 1 (2), (7) and the span rule read (wall × terrain,
   raised way × terrain); the family's law 4 re-checks whatever the op is given to do.

## 4. Verdict for the lens

Over the epochs the family holds: every op an epoch, a replay, a village epoch or a village derivation runs — circuits,
contractions, re-anchored, waterfront and dossier stretches, the water ops' re-traces, decay, gate opening, dismantling,
`wallToWay`, `absorbWall`, the ring-in-use and renewed-threat repairs, the founding, lapse, strike, salvage, the hazards,
the landfall, repair, the frame growth, burial, refounding, the hand-offs and the REPLACEMENT — meets every raised-way
state by §2.7's laws with a lawful outcome, law 2 (c) giving each its path's ladder or an epoch's wait (the frame growth
its kept course), and the arch vaults follow law 1 (8) through `EpochScope.raised` and `under.extend` at every rung; all
six round-7 findings of the lens, and the eight others whose fixes land in it, are fixed. One major remains: T-V6-73's
founding across a breached run (T110-2 (1)) is set on H-AQUA, whose one threat must reach `walls.threatMin` for its
METROPOLIS circuit, so the epoch's `fortification` step repairs the hand breach before the `raisedWays` step founds the
aqueduct and the clause fails a correct build (VF7v-EPO-01, a one-phrase fixture fix). The eight minors are restatements
and report comments omitting a case their cited laws decide (VF7v-EPO-02, -04, -05, -07), a table citation (-03), a
fixture naming a raised way §4.3 excludes (-08), a worked example narrower than law 1 (5) (-09), and one VALID CHOICE for
fix-list.md (-06: an elevated road's anchor whose end would lie over a wall). Nothing is reported on J150's hand-offs.
