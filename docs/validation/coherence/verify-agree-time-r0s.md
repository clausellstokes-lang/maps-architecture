# Seam check — agree-time, round 0 (time and change)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-agree-time-r0; covered by the whole-design retrovalidation (J84).

PROGRESS
- [ ] P1 base homes read (§4.11, §6.1/§6.3 epoch parts, §7.1 advance/epoch events, §7.3 locality, §7.4 lifecycle, §7.5 migrate)
- [ ] P2 V06 read against the base
- [ ] P3 V01, V02, V03, V04, V05, V07 over-time sections and lifecycle rows
- [ ] P4 hand-offs among members; matrix gaps
- [ ] P5 issues table, results JSON, LANDED

Members: determinism (§5, §6, §7), V06, V01, V02, V03, V04, V05, V07; with the pipeline's §4.11 as the base home of the evolution hook (the contract "the evolution rules" in agreement.md names pipeline as a co-home).

## Issues

(filled as the check proceeds; each row: id · severity · kind · owner · claim · required change)

### AT-01 · BLOCKER · DISAGREE · owner pipeline
**Claim.** The epoch-spread mutation's timing and decision rule disagree between the base and V06. Base §4.11 *The
epoch-spread mutation (item 18 (c))* still reads "the engine issues §4.7 S11's `MutationRecord` as a sequence of `mutate`
events over the ladder's rung durations (item 31) … Each of those events decides and records its step at once", and
`UseConversionOp`'s `mutate.spread` comment reads "'epochs' issues its steps over the ladder's durations". V06 §3.10.1
(the engine, the only issuer of a spread) decides the whole record once at the creating op, splits its parts into
occupy · adapt · extend · rebuild steps due at `mutation.stepYears` (V06 §2.2: occupy 0 · adapt [1, 3] · extend [3, 10] ·
rebuild [8, 25]) and states "these rows replace the base's 'over the ladder's rung durations'"; it also opens the use at
the first compatible step (`opensAt`), lays an always-crypt target's crypt at occupy, and applies the inverse of the done
steps when a cancelled plan's building takes its former designation (item 18 (e)). f item 266 (BCR-V6-21) is the ruled
base change that carries exactly this text; it is not in the base. A builder following the base schedules each step on
the `WealthLadderTable` years and re-decides each step; V06 schedules on its own rows from one record — two generators.
**Required change (pipeline, §4.11 *The epoch-spread mutation*).** Apply f item 266 as written: "§4.7 S11's
`MutationRecord`, decided once at the creating op, as a sequence of `mutate` events each applying its own parts of that
record, due at the evolution table's `mutation.stepYears` rows (V06 §2.2) — first occupy, when the present design is
compatible (every kept part, nothing added; an always-crypt target's crypt basement exempt and laid then); otherwise the
use opens at the first step whose result is compatible, a relocating use staying at its former site until then; then
adapt; then extend (the adds); and rebuild only the parts that cannot be adapted. A plan cancelled because its use left
keeps its done steps; when the building next takes its former designation, the mutator's record is the inverse of the
done steps (item 18 (e))", and "Each of those events applies and records its step at once"; the record and its rules
pointing to V06 §2.5, §3.10. In `UseConversionOp`, `spread`'s comment reads "'epochs' issues its steps at
`mutation.stepYears` (V06 §2.2, §3.10)".

### AT-02 · MAJOR · DISAGREE · owner pipeline
**Claim.** Base §4.11 *The runner* says V06's `'history'` strategy "adds the steps `prelude`, `hazards`, `fortification`,
`terrainWater`, `raisedWays`, `close` and the participant steps at V06 §3.2's places". Against V06 §2.1's twenty-step
`EpochStep` and V06 §3.1 (2) / §3.2 this list is wrong both ways: `prelude` is a `'grow-by-stage'` phase already (the base
names it among the nine, and V06 §3.1 (2) reuses it as "`prelude`'s base part"), while the engine's own steps `uses`
((b)), `departures` and `decline` ((c)) and `ladder` ((d)) are missing — the base itself states that the use step, the
strike pool and the ladder's schedule are the staged engine's, not `'grow-by-stage'`'s. A reader of the base cannot tell
which steps run under which strategy.
**Required change (pipeline, §4.11 *The runner*).** Restore f item 317's subject and make the list exact: "The epoch's
order (a)–(j) gains the steps `prelude`, `hazards`, `fortification`, `terrainWater`, `raisedWays`, `close` and the
participant steps `afterField`, `decline` and `afterGrowth` at V06 §3.2's places. V06's `'history'` strategy registers a
phase for each of V06 §2.1's twenty steps that runs anything: it reuses the base phases of `demand`, `dossier`, `lapse`
and `character` and the base part of `prelude`, wraps the base parts of `prelude`, `field`, `siting`, `growth` and `works`
with its own acts, and adds `hazards`, `uses` ((b)), `departures` and `decline` ((c)), `fortification`, `terrainWater`,
`raisedWays`, `ladder` ((d)) and `close` (V06 §3.1 (2))".

### AT-03 · BLOCKER · DISAGREE · owner pipeline
**Claim.** Who leaves at a fall. Base §4.11 *Survivors* — *The epoch's order* (c) still reads "the strike pool (below)
draws per building, deciding whose households leave first, and strikes fabric by its exposure (item 28 (f) with item 8;
J-A28.45)". V06 §3.5.1 (the departure matching: the roster's suffix matched by band to exposure-weighted dwellings by
`k = u^(1 ÷ w)` keys on `EVO_DEPARTURES`, with the swap rule and the protected-building refill) states "Which dwellings
empty is decided by this matching; the strike pool strikes fabric only (§4.11 step (c), item 479)". f item 479
(BCR-V6-23) is the ruled base change; the base text is the pre-change one. Two different draws decide which buildings
empty.
**Required change (pipeline, §4.11 (c)).** Apply f item 479: "which dwellings empty is decided by the evolution engine's
departure matching (V06 §3.5.1: the roster's suffix matched to exposure-weighted dwellings by band), and the strike pool
(below) strikes fabric only, by its exposure (item 28 (f) with item 8; J-A28.45)".

### AT-04 · BLOCKER · DISAGREE · owner pipeline
**Claim.** The use step's closing durations. Base §4.11 *Uses across epochs* (2) reads "closes only when its catchment's
demand … has been below `closeShare` for `closeAfterEpochs`, or a hard supply edge has had no provider in reach for
`starveAfterEpochs`". Those two fields no longer exist: §10.2's `UseRuleRow` (f item 429 (b), applied) carries
`closeAfterYears` and `starveAfterYears` with `moveChance` per year, and V06 §2.9 / §3.9.4 close a use when its
`Use.strain` of kind `demand` has lasted `closeAfterYears` (or `supply`, `starveAfterYears`), read on the weekly clock
(J-V6.26). f item 429 (c) is the ruled base text; the base keeps the epoch counts, so the base's use step counts epochs
(irregular on the weekly clock) where V06 counts years.
**Required change (pipeline, §4.11 *Uses across epochs* (2)).** Apply f item 429 (c): "closes only when its `strain`
(§2.7; V06 §2.9) of kind `demand` has lasted `closeAfterYears`, or of kind `supply` `starveAfterYears`, read on the weekly
clock".

### AT-05 · BLOCKER · DISAGREE · owner pipeline
**Claim.** The regrowth-first rule and the history engine's stage exceptions. Base §4.11 *Regrowth-first* ends "an epoch
whose residual is ≤ 0 grows no stage and adds no face" with no exception, and lists only tiers (0)–(6). V06 §3.6 grows a
stage for the overflow backlog (`R + B ≥ q`) and a decrowding stage (`C ≥ max(q, growth.crowdShareMax × H)`) — "the two
exceptions item 336 states" — and V06 §3.8.2 places tiers (5′) (upgrade of downgraded ways, reopening of hollow ways) and
(5″) (crowding) between the base's (5) and (6), with the reopen-on-placement rule at every placement, again citing the
base ("Tiers (5′) and (5″) are this strategy's own tiers between the base's (5) and (6) (item 336)"). f item 336
(BCR-V6-18) is the ruled base text and is absent: the base's absolute rule forbids what V06 builds.
**Required change (pipeline, §4.11 *Regrowth-first*).** Apply f item 336: after "an epoch whose residual is ≤ 0 grows no
stage and adds no face" add "— the owner-staged history engine's two exceptions excepted (V06 §3.6): a stage for the
overflow backlog, whose households are those its overflow ladder housed in earlier epochs, and a decrowding stage, whose
households are the crowded ones it moves. That engine places its own tiers between (5) and (6): (5′) the upgrade of
downgraded ways and the reopening of retired ones (V07's hollow ways, `reopenWay`) and (5″) crowding within a factor of
the band row (V06 §3.8); and every placement that engine makes — at every tier, in its use step's openings and moves, or
in a dossier-backed use's relocation — on a plot whose access edge is a retired way reopens that way, with any retired
way on its path to the ways in use, in the same batch first (V06 §3.8.2)".

### AT-06 · MAJOR · DISAGREE · owner pipeline
**Claim.** Which buildings cast in an epoch's daylight term. Base §4.5 *The daylight term* ("at an epoch the previous
epoch's buildings do (V06 §3.4)") and §4.11 (a) ("the previous epoch's buildings casting in the daylight term") restate
V06's rule as "the previous epoch's buildings". V06 §3.4 (1) — the home of the building shade mask — writes the mask from
"the buildings as they stand when the field phase runs — after this epoch's hazards" (a quarter a fire opened is sunnier
at once, J-V6.29), before anything the epoch's later phases place. After a fire or a topple in the epoch's `hazards` step
the two statements give different casters (a burned building casts at its eave, a toppled one at its ruin share).
**Required change (pipeline, §4.5 and §4.11 (a)).** Replace the restatement by the rule's reference: "at an epoch the
buildings standing when its field phase runs — after that epoch's hazards, before anything it places — cast through V06's
building shade mask (V06 §3.4)"; §4.11 (a) likewise ("the buildings standing at the field phase casting through the
building shade mask (item 102 (e); V06 §3.4)").


### AT-07 · MAJOR · DISAGREE · owner pipeline
**Claim.** The decline table's slower dwell bands are undefined numbers and disagree with the layers' own lag rules.
Base §4.11's decline table (f item 291's row) reads "walls, raised ways and retaining walls one band slower, tunnels
two", and II.6 "its dwell bands are two steps slower than a building's"; "one band slower" and "two" are given no years
anywhere. Their readers disagree on what they time: V06 §3.19.2 (3) strikes a raised span "whose dwell band has run since
the way's neglect" (which band, unstated); V04 §3.10's `UndergroundFade.candidates` takes elements "whose dwell band has
run (§4.11's persistence table: the `underground` row and its bands)" (no band in `UndergroundFadeRule`); while an
enceinte's stretches are breached at `walls.breachChancePerYear` from the neglect with no dwell band (V06 §3.7.3) and a
retaining stretch is a candidate after V11 §3.18's `retaining.neglectAfterYears` (30) with no dwell band (V06 §3.19.4 (3),
V11 §3.18). Two builders would give different lags to the same layer.
**Required change (pipeline, §4.11's decline table, dwell-band row; II.6's tunnel sentence citing it).** State the row
exactly, the specific layer rules qualifying the general: "vacant → derelict [10, 30]; derelict → ruin [20, 60]; ruin →
cleared on salvage demand only. A raised way's span: a standing span is a strike candidate once [20, 60] years — drawn
once per span, keyed with the epoch of the way's neglect — have run since that neglect (V06 §3.19.2 (3)). A tunnel,
gallery or chamber: each step once [40, 120] years — drawn once per element and step, keyed with the epoch it entered
its condition — have run (V04 §3.10). An enceinte's stretches step by V06 §3.7's pathway rows (`walls.neglectAfterYears`,
`walls.breachChancePerYear`, `walls.dismantleChancePerYear`), and a retaining stretch after V11 §3.18's
`retaining.neglectAfterYears`, with no further band." (The two numeric bands are the base's own band progression shifted
one and two places — [10, 30], [20, 60], [40, 120] — our own, calibratable, §13.9; if the editor reads "one band slower"
otherwise, the row must still give the years.) V04 §3.10 and V06 §3.19.2 (3) then cite the row by these words.

### AT-08 · MAJOR · DISAGREE · owner V06
**Claim.** V06 states two different memberships of the strike pool and a wall lag the wall rules do not have. V06 §1.1
(4) lists "the per-layer candidates of the base's strike pool (building, plot boundary, street, wall)", while V06 §3.5.2
says "Enceinte walls are not in the pool (their pathway is V06 §3.7's)" and V06 §3.7.2 (3) repeats "V06 §3.5.2's
exclusion of enceinte walls from the pool stands"; V06 §3.19.2 (3) calls the raised kind "one dwell band slower than
buildings, as walls", but no wall rule of V06 §3.7 reads a dwell band (AT-07). The base's persistence row (`wall` 0.05)
is read only as V06 §3.7.3's stretch weight factor.
**Required change (V06).** §1.1 (4) reads "the per-layer candidates of the base's strike pool (building, plot boundary,
street, and item 110's raised, retaining and deck kinds), an enceinte's stretches stepping by the fortification phase's
pathway (V06 §3.7)"; §3.19.2 (3) drops "as walls" and cites the dwell-band row as AT-07 words it.
