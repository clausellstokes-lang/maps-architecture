# Verify V05 and V06 after repair round 5 — lane coherence/verify-vol-V05-V06-r5t

> PENDING FABLE REVIEW — written by opus standing in for the verifier seat; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V05-V06-r5t`, 2026-10-01)
- P0 brief read whole (ROUND-5 NOTES, NEW OWNER RULES 114–119, ORCHESTRATION NOTES); round-4 findings (3,
  verify-vol-V05-V06-r4t); adjudication-r5 (R5-01, R5-02 whole, R5-03 – R5-10; Part H · V05, V06, V09, V08 rows and END
  lines naming V05/V06); assemble-r5 (live hashes equal): done
- P1 word diffs of live V05 (5 hunks) and V06 (23 hunks) against assemble-r4's outputs (commit 6c640e5): done
- P2 every round-4 finding re-checked against the live text and each END line's second end: done (3 fixed)
- P3 every round-5 block in scope read subsection by subsection: done
- P4 ids, references, retired terms, phone clauses, review ids, document checks, sizes: done
- P5 report, result, LANDED: done

**Scope and method.** This verifies V05 (the sky) and V06 (evolution) after assemble-r5.
* Live V05 has sha256 `171db651…` (401 879 bytes) and V06 `6fb1f641…` (694 375 bytes). Both equal assemble-r5's
  outputs.
* The pre-round-5 texts are commit 6c640e5's (V05 `ef99abd9…`, V06 `ef22171a…`, assemble-r4's outputs).
* I read every changed hunk with its whole subsection. In V06 that is §1b's W64 and W68, §2.1, §2.10, §3.6 (4), §3.7.1,
  §3.7.2, §3.7.4, §3.7.6 (5), §3.19's lead with (1)–(8), §3.19.1, §3.19.2, §6.8 (6), §7's lead, fixtures and table, and
  T-V6-11, T-V6-47, T-V6-65 and T-V6-73. I also read §8's E3 and E5 rows, J-V6.91 and J-V6.136. In V05 that is §2.1,
  §2.6, T-V5-14, T-V5-36 and §8.
* I read the partner homes each changed line names, at those homes:
  * base §2.7's support step (1), (3), (6) (a)–(d) and (7);
  * §4.11 `wallToWay` (l. 8214–8224);
  * §7.1's outcome rows (l. 10623–10633);
  * §7.3's S7 row (l. 10883);
  * §13.2's T110-2 and T114-3 (l. 18480–18500, 18548–18562);
  * §13.8's T114 row (l. 19354);
  * V07 §3.5a (4);
  * V08 §6's absorb-with-epochs row;
  * V09 §4.21.9 (1);
  * V11 §3.24.2's `raisedWays` table, settings and chance rule;
  * V12 §2.13's `item110.*` pin row and §3.7.8 (1);
  * INDEX §5 risk 2.
* Ids outside the round-5 blocks and outside my round-4 findings keep their earlier verdicts.

## 1. Round-4 findings re-checked

| id | owner (r4) | disposition (adjudication-r5) | verdict now | evidence |
|---|---|---|---|---|
| VV56-r4-01 | V09 | FIX | **FIXED** | V09 §4.21.9 (1) (l. 3442–3444) reads "but a dossier catch-up where even one epoch over the span with its dossier events' absorb term passes its budget, which folds that one epoch and completes past it". This is the required text verbatim, and it now matches V06 §6.8 (6), §1.1 (14), W91, T-V6-24, J-V6.136 and V08 §6's row. |
| VV56-r4-02 | V06 | FIX per R5-10, amended | **FIXED, with a new minor in the definition (VV56-r5-03)** | V06 §7's H-AQUA definition (l. 4063–4074) carries Part H's amended text with four precisions (repair-r5-V06 JUDGMENT 1). I checked each precision at its source; each is sound. **(a)** V11 §3.24.2: CITY · viaduct `pMax` is 0.9 and `p = min(pMax, chance × F)`, so `chance` and `pMax` must both be 1. **(b)** V06 §3.19.1 (2) and `totalCap` CITY 2: a road declared before the CITY epoch would fill the total, so it is declared after. **(c)** V06 §3.7.1 `aroundAll`: a road between two enclosed wards would never be crossed, so its ends straddle the METROPOLIS circuit. **(d)** V06 §3.19 (2)'s `A`. The `editTable` is a logged event (§2.9; §7.6). T-V6-47 and T-V6-73 name "its viaduct" and "its timber elevated road". T-V6-65 runs H-AQUA without the two logged edits; V12 §3.7.8 (1) bears that out ("the cells stay editable"), and V12 §2.13's row defers to T-V6-65. T-V6-11's absorb case moved to H-AQUA's CITY ring. What the definition still leaves open is VV56-r5-03. |
| VV56-r4-03 | V06 | FIX | **FIXED** | V06 §6.8 (6) (l. 4022–4024) has the required parenthesis verbatim. J-V6.136 now says "three catch-up fixtures … (its over-budget fixture taking the one-epoch fold by design)", matching V08 §6's row (VV78-r4-05 (c)). |

**Round-4 findings: 3 re-checked. 3 fixed. 0 persist.**

## 2. Round-5 blocks read

**V05** has 4 REPLACE blocks (§2.1, §2.6, ## 7, ## 8) in 5 hunks. Both of its issues are fixed.
* **VAL-R4-09.** The two canon ids `MC-07` and `MC-05` are gone from §2.1's lead and from §2.6's `ContextVector.arena`
  row. The meaning is unchanged.
* **VAP-r4-07 (per R5-05 (c)).** T-V5-36 (i) is now scheduled "from the later of P3, P6 and V06's E6". (f)'s fall cases
  run at the later of P3 and P6, and (f)'s `advance` at the later of P3 and E6. §8's sentence and the P3 exit cell say
  the same.
  * Naming P6 goes past the required text. It is right: V05 §8 orders "P1 → P2 → P3; P4 and P5 after P2; P6 after
    P4", P6 builds `IslandEpochStep` and the landfall (§8's P6 row), and (i)'s fixture raises and resizes islands
    over epochs and runs on T-V5-14's falling CITY. The hand move and removal are P4's, which P6 follows.
* T-V5-14's raised-gate clause stands under R5-02, as Part H · V05 notes: a raised gate is a raised way created across a
  standing wall. V05 §3.16's landfall rows read a crossing station's support as its wall stretch, which matches §2.7 (3).
* No new problem in V05.

**V06** has 9 REPLACE blocks (## 1b, §2.1, §2.10, §3.6, §3.7, §3.19, ## 6, ## 7, ## 9) in 23 hunks.
* **R5-02's V06 END lines.** Every one is written as given:
  * §3.6 (4) and §3.19's lead cite "(§2.7's support step (6))", and the lead says "a later wall trace runs on beneath
    its deck".
  * §3.7.1's widening is written.
  * §3.7.6 (5)'s two bullets are R5-02's text. Its continuity bullet cites (6) (d), and its absorb bullet cites (3).
  * "a trace's crossing station" is gone from W64, `EpochScope.raised` and §2.1.
  * W68's cells, §2.10's `raisedCrossings` comment, T-V6-47 with its bar, §7's T110-2 row and J-V6.91 are R5-02's
    text.
* **JUDGMENT 5's exception in §3.7.6 (5)** reads "a stretch under a crossing station repaired on its own line, or
  re-laid there by the raised way's repair, … stays that station's support". It is R5-02 (6)'s closing sentence, so
  §3.7.6 (5)'s lead ("a re-anchored or repaired stretch") cannot read a repair as a later stretch.
* **The sweep's conformances agree with the base as landed.**
  * §3.7.4 (4)'s gate law reads "on ground part 0 … a deck passing over the trace takes none", which is §4.4 S5a and
    §4.8 *Gates*.
  * §3.6 (4) and §3.19's lead read "crossed only under a span that rule admits", which is §4.3 as P1 rewrote it.
  * The frame growth cites support step (7).
* **T-V6-47's three completions are each in T110-2 (4)'s text** (§13.2, l. 18493–18500):
  * the ordinary run beneath every other span topped at its soffit;
  * no gate or tower in the under-deck strip;
  * the contraction within p ÷ 2 of an older ring's crossing station, with `p` the pitch of support step (1).
* **The END of VAP-r4-01** (T-V6-73's station's regrowth, and §7's T114 row) agrees with T114-3's regrowth clause at
  §13.2 (l. 18558–18562) and with §13.8's row (l. 19354).
* **New problems.** R5-02's rule, written here by §3.7.6 (5) and T-V6-47, leaves two meetings with no outcome:
  * `wallToWay` of a ring that runs on beneath a deck (VV56-r5-01, one fix with verify-pipeline-r5t's VPC-R5-02);
  * a later wall's line where the support, `vault` span or raised way it was built against goes (VV56-r5-02, one fix
    with verify-edges-world-r5t's VEW-r5-02).
* **Concurrence, no separate id: VDC5-04** (verify-determinism-r5t, owner V06). V06 §3.7.2 (1)'s gate opening ("Each gate
  of the ring … → `gateToJunction`") names no exception for a raised gate. This round's T-V6-11 and T-V6-47 now run
  H-AQUA's CITY ring superseded with its viaduct's raised gate on it, so the case is on V06's own fixture. I concur
  with VDC5-04's text and raise no duplicate.
* **Concurrence, no separate id.** V06's W68 (l. 351) and §3.7.1's widening (l. 1462–1463) say "its strips
  stopped/stopping" at the under-deck strip. That is R5-02's own END wording, and the home (6) (d) stops only the
  setback, glacis and berm while the band runs on beneath the deck. VPC-R5-01 (verify-pipeline-r5t) already carries
  both V06 lines as END lines, worded "its setback, glacis and berm stopped/stopping". I concur and raise no duplicate.
  V06 §3.7.6 (5)'s bullet and §2.10's `raisedCrossings` comment already use the precise words.
* **New problems in the H-AQUA work.** The amended H-AQUA definition does not secure its viaduct or a later trace
  meeting it (VV56-r5-03). T-V6-73's new regrowth clause topples supports but lands at E3, before `topple` (VV56-r5-04).

**Ids.**

| unit | id family | count | duplicates | gaps |
|---|---|---|---|---|
| V06 | T-V6 | 1 – 76 | 0 | 0 |
| V06 | J-V6 | .1 – .141 | 0 | 0 |
| V06 | W | 1 – 94 | 0 | 0 |
| V05 | T-V5 | 1 – 36 | 0 | 0 |
| V05 | J-V5 | .1 – .89 | 0 | 0 |

No id was added or removed this round.

**References.** I resolved every `Vnn §x` and bare `§x` in the round's added lines against the set's headings and bold
paragraph numbers. V05 has 12 and V06 has 66: 0 broken. assemble-r5 reports 0 broken in the set. Each support-step
citation in V06 resolves in the base as landed: (1), (3), (6), (6) (d) and (7). V06 cites (3) 21 times, (6) twice,
(6) (d) 5 times, and (1) and (7) once each.

**Retired terms** (canon glossary, 35 patterns) over every added line: 0. **Review ids** in added text: 0. **Deferral
wording:** none. "later" is "the later of" or "a later trace", and "open" is the open action. **Phone clauses** (item 126
(a2)): none in V05 or V06.

**Document checks** (`doc_checks.py --doc <volume> --heads docs/ARCHITECTURE.md --allow
docs/validation/doc-checks-allow.tsv`):

| check | V05 | V06 |
|---|---|---|
| C1 | 0 | 0 |
| C2 | 0 | 0 |
| C3 | 237 hits, 225 unreviewed (unchanged) | 291 hits, 270 unreviewed (unchanged) |
| C4 | 0 | 0 |
| S1 | 0 | 0 |
| S2 | 264 hits, 1 unreviewed (unchanged) | 428 hits, 16 unreviewed (424 / 16 before) |

> WARNING recorded: "reference corpus INCOMPLETE (missing: captures, research/patreon, research/devlogs,
> research/ftg-docs, research/external) - clean-room results are NOT authoritative". These results are provisional.

**Size** (`wc -w`):

| unit | before round 5 | after round 5 | change this round | archive | change against the archive |
|---|---|---|---|---|---|
| V05 | 66 672 | 66 765 | +0.1 % | 79 756 | −16.3 % |
| V06 | 111 116 | 111 647 | +0.5 % | 104 574 | +6.8 % |

The increase is design that the rulings and END lines require. No unit shrank by more than half, so no halving audit is
due.

## 3. Owner items in V05 and V06

* **110 (b) and (f).** A raised way is held from its creation. Every aqueduct created across a standing wall crosses
  it through an arch, and no later work adds a junction or gate on a deck. VV56-r5-01 and VV56-r5-02 are meetings that
  R5-02's rule leaves without an outcome. They do not contradict an owner rule.
* **114.** The band under a crossing station is held while its deck stands, then released, and its regrowth is run on
  H-AQUA (T-V6-73).
* **119.** V06 §6.8 (6) and V09 §4.21.9 (1) state one trigger for the over-budget branch.
* **120.** T-V5-36's drawn-week clause runs at the first exit after its providers.
* **122, 123.** No change this round in scope.
* **125.** No `HostContext` input was added. **126.** No phone clause.

## 4. Issues (4)

| id | severity | kind | owner | claim (short) |
|---|---|---|---|---|
| VV56-r5-01 | major | EDGE-UNDEFINED | pipeline | (One fix with VPC-R5-02.) `wallToWay` turns a wall into a ring road "on the same edges". A wall laid after a raised way now runs on beneath its deck with the supports and `vault` spans taken into its line. No text says how its ring road passes them, and the literal rule lays a primary way over a support ring. |
| VV56-r5-02 | major | EDGE-UNDEFINED | model | (One fix with VEW-r5-02.) A wall laid after a raised way is closed against a support, ramp, stair, foot or `vault` span, and topped at a span's soffit. Nothing says what the wall's line is once that part goes: a support salvaged, a chamber collapsing with its span, or the raised way removed. Nothing says what height the soffit-topped run has once its span falls. |
| VV56-r5-03 | minor | NEW-PROBLEM | V06 | H-AQUA's viaduct: the conditions the definition states do not make the founding lay it, since §3.19 (2)'s strength, span and pier bounds are not stated. No later trace is made to meet it, yet T-V6-47 runs "a viaduct a later trace meets gets no gate". |
| VV56-r5-04 | minor | NEW-PROBLEM | V06 | §8's E3 exit runs T-V6-73's new regrowth clause and T-V6-11's second run, both on scripted `topple`s. `topple` is built at E5. T-V6-11's sky clause needs V05's P6 landfall, and no timing cell names that. |

### VV56-r5-01 (major, EDGE-UNDEFINED, pipeline) — one fix with VPC-R5-02

**Claim.** This is the defect verify-pipeline-r5t reports as **VPC-R5-02**. I found it independently from V06's side.
R5-02 changed what a later wall does at a raised way: it runs on beneath the deck.
* §2.7's support step (6) (d) (base l. 2603–2614) and V06 §3.7.6 (5) say: "each support, ramp, stair, foot or `vault`
  span in its band taken into the line". At a `vault` span the run ends at the two walled-up arch mouths, and beneath
  every other span it is a run topped at the soffit.
* §4.11's `wallToWay` (l. 8214–8221) makes the ring road as `retypeEdges` "on the same edges". Its only raised-way
  clause is for the stretch under a crossing station, which "stays as a free-standing gate tower or arch".
* V06 §3.7.6 (5)'s absorb bullet says only that "the new ring road takes no junction with" a raised way crossing the old
  line.

So when a ring laid after a raised way becomes a road, nothing says how the road passes the raised way:
* at the pathway's `road` fate (V06 §3.7.2 (3), l. 1486);
* by a hand `convert` `wallToWay`.

Taken literally, the primary way's spine runs over the support rings and through the `vault` span's chamber. That
contradicts (6) (a) ("everything laid after the raised way gives way to it"). It also fails T110-2's and T-V6-47's bar
"0 way corridors over a support ring, ramp, stair, foot or `vault` span".

VPC-R5-02 adds the second meeting: the kept crossing-station stretch stands on the old line, in the road's way.

Before R5-02 the first case could not arise for a town ring, because a later trace always took a station. Now it is
reached on an ordinary history: a CITY whose S4 viaduct is crossed by stage 2's ring (T110-2's c14 fixture), and that
ring later superseded with its fate drawn `road`. Builders diverge (the road through the pier, ended at the strip, or
bent under a span), and no bar runs the case.

**Required change.**
* Apply VPC-R5-02's required change: §4.11's added sentence, and its V06 ends at §3.7.6 (5)'s bullet and T-V6-47. That
  is one fix; I propose no second text for the base.
* VPC-R5-02's T-V6-47 end runs case (2) "on a fixture this test names". H-AQUA already holds such a ring, so name it.
  T-V6-47's added clause reads:

  "and `wallToWay` of H-AQUA's METROPOLIS circuit, which runs on beneath its aqueduct and its timber elevated road, by a
  hand `convert` after the contraction and, on a second run, by its pathway fate set to `road` by a hand `setAttr` —
  the ring road crossing each under-deck strip under a span §4.3 admits, else ended at the strip's edges, the raised
  ways unchanged — 0 way corridors over a support ring, ramp, stair, foot or `vault` span".
* §2.7's support step (6) (a)'s list adds ", the ring road `wallToWay` makes (§4.11)" after "a hand way", so that the
  home's list names every later part-0 way.

### VV56-r5-02 (major, EDGE-UNDEFINED, model) — one fix with VEW-r5-02

**Claim.** This is the defect verify-edges-world-r5t reports as **VEW-r5-02**. I found it independently from V06's side.
Under R5-02, a wall stretch laid after a raised way is built against the raised way.
* (6) (d) (base l. 2603–2614) says "each part of the reservation standing in its band is taken into the line, the run
  abutting its faces and closed against it". At a `vault` span the run ends "at its arch vault's two walled-up arch
  mouths, the chamber kept whole". Beneath every other span it is "an ordinary run whose top is no higher than that
  span's soffit (… derived at read, never stored …)".
* V07 §3.5a (4) restates this for the palisade. V06 §3.7.6 (5) and T-V6-47 restate it for every epoch trace.

The raised way's parts that the wall is closed against then go on ordinary paths:
* V06 §3.19.2 (3)'s salvage `dismantle` clears "a support both of whose spans are ruined or cleared". This excepts only a
  crossing station's support, and a support a later wall abuts is not one.
* "The span's arch-vault chambers collapse with it in the same batch" (l. 2932).
* §3.11.4's `topple` breaks both spans beside a support.
* A hand `delete` removes the whole raised way (V06 §3.19.3; §7.1).

Nothing says what the wall's line becomes across the gap: a gap, a `breached` run, or a run standing whole. Nothing says
what height the run has once the span over it is `ruined`, `cleared` or removed.

Before R5-02 this arose only at a village palisade. Now it is reached on an ordinary decline, and on H-AQUA itself: its
METROPOLIS circuit runs on beneath its aqueduct, which runs dry in year 170, lapses, falls by span and is salvaged.
Builders diverge on the wall's `condition`, closure, drawing and glTF height. No bar runs any of these.

**Required change.**
* Apply VEW-r5-02's required change at §2.7's support step (6) (d), in whichever outcome the adjudicator rules there
  (the run whole across the former footprint and at full height beneath a fallen span, or a `breached` run whose one
  writer is the op that removes the part). Apply also its rendering, V06 §3.19.2 (3)–(4) and scope T110-2 (4) ends.
  That is one fix.
* **V06's second test end**, which VEW-r5-02 does not list. V06 runs T110-2's epoch clauses (4) and (5) on its engine
  in T-V6-47 (§13.2's runs sentence; V06 §7's T110-2 row). So T-V6-47 and §7's T110-2 row take the new T110-2 (4)
  clause on H-AQUA:

  "after its METROPOLIS circuit ran on beneath the standing aqueduct, the aqueduct run dry (year 170) and lapsed — a
  `vault` span in the circuit's band breached (its chamber collapsing) and a support in the band cleared by V06
  §3.19.2 (3) — and, on a second run, the timber elevated road deleted by hand: the run across each former part and
  beneath each fallen span as §2.7's support step (6) (d) rules, the circuit's closure unchanged, the delete's undo
  restoring the abutments and the cap".
* **T-V6-47's bar cell** adds the bar the ruled outcome sets: "0 gaps in a band" if whole, or each former footprint
  `breached` in the removing op's batch.

### VV56-r5-03 (minor, NEW-PROBLEM, V06)

**Claim.** The amended H-AQUA definition (V06 §7, l. 4063–4074) names the conditions under which "the founding lays" its
viaduct: "the recipe's valley deeper than `viaduct.minDropM` … the CITY viaduct row's `chance` and `pMax` raised to 1".
These are not enough.

* **(a) The reading's other conditions are unstated.** V06 §3.19 (2) (l. 2776–2777) also requires the span within
  `viaduct.maxSpanM` and the strength `saved − span × viaduct.spanCostFactor` above 0. With V11's factor of 4, the main
  approach road's ground course from `A` to `B` must be more than five times the chord `|AB|`. V06 §3.19 (5) also drops
  a course whose pier exceeds `raisedWays.structure.maxPierM` or whose clear span exceeds `maxClearSpanM`.
  * A road that crosses its valley nearly straight meets none of this.
  * The repair added `pMax` for exactly this reason, a necessary condition the ruled text left out, but missed these.
* **(b) Nothing makes a later trace meet the viaduct.** T-V6-47 (l. 4170) runs "a viaduct a later trace meets gets no
  gate". The definition lays the METROPOLIS circuit across the elevated road only.
  * The viaduct runs from `A`, just inside the CITY ring, to `B` beyond the valley. Whether the METROPOLIS circuit or
    the contraction meets it depends on growth that the definition does not fix.
  * The elevated road does not stand in for it. The viaduct carries the main approach road, a primary. So it is the
    case where S5a's gate law, or §3.7.4 (4)'s law at a contraction, must read the crossing "on ground part 0" and pin
    no gate on the deck.

Each part is the class R5-10 rules on: a test names a case its fixture need not hold. A build agent tunes the recipe
until "so the founding lays it" holds, so nothing built changes.

**Required change.** In V06 §7's H-AQUA definition:
* replace "(the recipe's valley deeper than `viaduct.minDropM`, its rim at the ring's foot so that the reading's `A`
  lies inside the ring, V06 §3.19 (2);"
* with "(the recipe's valley deeper than `viaduct.minDropM`, its rim at the ring's foot so that the reading's `A` lies
  inside the ring, the main approach road's ground course from `A` to `B` longer than (1 + `viaduct.spanCostFactor`) ×
  `|AB|` with `|AB|` within `viaduct.maxSpanM` so that the reading's strength is above 0, and its piers and clear spans
  within `raisedWays.structure.maxPierM` and `maxClearSpanM`, V06 §3.19 (2), (5); its far foot `B` beyond the land the
  METROPOLIS epoch's circuit encloses, so that circuit is laid across its deck;".

In T-V6-47:
* replace "a viaduct a later trace meets gets no gate"
* with "its viaduct, which the METROPOLIS circuit meets, gets no gate on its deck, the main approach road's ground
  course taking that circuit's gate (gates counted on ground part 0)".

### VV56-r5-04 (minor, NEW-PROBLEM, V06)

**Claim.** V06 §8's E3 row (l. 4231) lands T-V6-11 and T-V6-73 at E3's exit ("T-V6-9–11, 46–49, 57–61, 73"). Two of
their clauses need a mechanism that lands later:
* T-V6-73's **station's regrowth** clause is new this round (the END of VAP-r4-01): "both spans beside the aqueduct's
  crossing station toppled".
* T-V6-11's second run is "a scripted `topple` of the support next to the station on either side". It now runs on
  H-AQUA's CITY ring.
* `topple` is an event-only hazard operator (V06 §3.11.4). E5 builds it ("the hazards with the deck and terrace rules
  (… supports toppled and scoured …)", l. 4233), so neither clause can run at E3's exit.
* T-V6-11's sky clause ("on a sky fixture whose island falls at year 30 …; exact on the landfall fixture") needs V05's
  P6 `fallIsland`. M6-sky lands after M6-U, while M6-E starts right after M4.

INDEX §5 risk 2 and R5-05 (c) move such clauses "to the first exit after the provider (each named in its volume)". V06's
cell names none of them. Nothing built changes.

**Required change.**
* V06 §8's E3 tests cell "T-V6-9–11, 46–49, 57–61, 73" → "T-V6-9–11, 46–49, 57–61, 73 (T-V6-11's runs on toppled
  supports and T-V6-73's station's regrowth at E5, which builds `topple`; T-V6-11's sky clause at the later of E3 and
  V05's P6, which builds the landfall)".
* E5's tests cell "T-V6-12, 16–20, 25, 27, 54 (raise), 72" adds ", T-V6-11's and T-V6-73's topple clauses".

**Totals: 0 blockers, 2 majors, 2 minors.** Round 4 had 0 blockers, 0 majors and 3 minors.
