# Seam check — agree-time, round 0 (time and change)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-agree-time-r0; covered by the whole-design retrovalidation (J84).

PROGRESS
- [x] P1 base homes read (§4.11, §6.1/§6.3 epoch parts, §7.1 advance/epoch events, §7.3 locality, §7.4 lifecycle, §7.5 migrate)
- [x] P2 V06 read against the base
- [x] P3 V01, V02, V03, V04, V05, V07 over-time sections and lifecycle rows
- [x] P4 hand-offs among members; matrix gaps
- [x] P5 issues table, results JSON, LANDED

Members: determinism (§5, §6, §7), V06, V01, V02, V03, V04, V05, V07; with the pipeline's §4.11 as the base home of the evolution hook (the contract "the evolution rules" in agreement.md names pipeline as a co-home).

## Summary

29 issues: 7 blockers, 22 majors; by owner pipeline 12, V06 8, V07 4, V01 2, V02 1, V03 1, scope 1 (none for
determinism, V04 or V05, whose time-and-change text agrees with its partners as read). The root of the seven blockers:
six f items whose text edits §4.11 were filed by the f file under another section's heading and routed by the canon to
that heading's part (209 (a), 264 (b), 266, 268 (b), 336, 479), and item 429 (c), routed to the pipeline and missed
there; each leaves the base's text contradicting V06's (or V07's) engine. The machine twin of this list is
`docs/validation/coherence/results/coherence_verify-agree-time-r0.json`.

| id | severity | kind | owner |
|---|---|---|---|
| AT-01 | blocker | DISAGREE | pipeline |
| AT-02 | major | DISAGREE | pipeline |
| AT-03 | blocker | DISAGREE | pipeline |
| AT-04 | blocker | DISAGREE | pipeline |
| AT-05 | blocker | DISAGREE | pipeline |
| AT-06 | major | DISAGREE | pipeline |
| AT-07 | major | DISAGREE | pipeline |
| AT-08 | major | DISAGREE | V06 |
| AT-09 | major | DISAGREE | V06 |
| AT-10 | major | DISAGREE | pipeline |
| AT-11 | major | DISAGREE | V06 |
| AT-12 | blocker | DISAGREE | pipeline |
| AT-13 | major | DISAGREE | V06 |
| AT-14 | major | DISAGREE | pipeline |
| AT-15 | major | DISAGREE | V06 |
| AT-16 | major | DISAGREE | V06 |
| AT-17 | major | DISAGREE | V01 |
| AT-18 | major | DUPLICATE-HOME | V01 |
| AT-19 | major | DISAGREE | V02 |
| AT-20 | major | DISAGREE | V06 |
| AT-21 | major | DUPLICATE-HOME | V03 |
| AT-22 | major | DISAGREE | V07 |
| AT-23 | major | DISAGREE | V07 |
| AT-24 | major | DISAGREE | V07 |
| AT-25 | major | DISAGREE | scope |
| AT-26 | major | DISAGREE | V06 |
| AT-27 | major | DISAGREE | V07 |
| AT-28 | blocker | DISAGREE | pipeline |
| AT-29 | blocker | DISAGREE | pipeline |

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
(The canon routed f item 266 to model, by the f file's §2.8 heading; its text edits §4.11, the pipeline's.)
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
(The canon routed f item 479 to rendering, by the f file's §12.6 heading; its text edits §4.11 (c), the pipeline's.)
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
(The canon routed f item 336 to determinism, by the f file's §5.3 heading; its text edits §4.11, the pipeline's.)
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

### AT-09 · MAJOR · DISAGREE · owner V06
**Claim.** The catacomb primary's tie rule. V04 §3.5.1 (5) — the home of the primary reading — takes "the complex whose
source serves the most burials — the greatest need `A` of (2) …, ties by rank … at every derivation; at an epoch, V06's
derived primary, the same reading held by its hysteresis". V06 §3.18.2 (3a) breaks the tie "by source address". With two
complexes of equal served burials the epoch and a regeneration pick different primaries, so the rank cap holds a
different complex — the opposite of "the same reading".
**Required change (V06 §3.18.2 (3a)).** "the primary is V04 §3.5.1 (5)'s reading — the complex whose source serves the
most burials, ties by rank — held by `catacomb.primaryHysteresis` (10 %): another complex becomes the primary only when
its served burials exceed the current primary's by that share".

### AT-10 · MAJOR · DISAGREE · owner pipeline
**Claim.** A burial source's age after epochs. Base II.7.6 (the age gate's home, `minAgeYears` 100) gives "a source's age
is its own — at generation `(K − k + 1) × yearsPerStage` …, after the replay or epochs the log's years since its use
opened", which for a source standing at generation drops its generation age once an epoch runs. V06 §3.18.2 (2) (the
epoch's reader) adds them: "`(week − burialsBegan) ÷ 52 +` its generation age … the generation age II.7.6's stage age at
creation or the port's `HistoryHint.ageYears`", and V04 §3.5.1 (3) reads "`minAgeYears` by the face's growth stage,
`HistoryHint` or the log". A churchyard 150 years old at generation is 10 years old after a decade of epochs by the base,
160 by V06 — the age gate opens or not by which text is built.
**Required change (pipeline, II.7.6's age sentence).** "… at generation `(K − k + 1) × yearsPerStage` for a source built
in growth stage k of K …; after the replay or epochs, that generation age (zero for a source opened after creation) plus
the log's years since its use opened (V06 §3.18.2 (2))".

### AT-11 · MAJOR · DISAGREE · owner V06
**Claim.** The catacomb source draw's key. V06 §3.18.2 (1) says "Each candidate face takes V04's one uniform `u` keyed by
(`catacomb`, the face's lineage) on `sewer`", the candidates including the quarry ossuary; V04 §3.12 keys a quarry
ossuary's chance by its working ("the quarry ossuary's chance (`sewer`, the working)"; the fixed-key exceptions: "a
quarry ossuary's by its working"). The restatement gives the ossuary a key no working has.
**Required change (V06 §3.18.2 (1), *The source draw*).** Replace the restated key by the reference: "Each candidate takes
V04's fixed-key source draw (V04 §3.5.1 (3), §3.12: a burial face's keyed by the face's lineage, a quarry ossuary's by
its working) — fixed by its key, never re-drawn".

### AT-12 · BLOCKER · DISAGREE · owner pipeline
**Claim.** The hollow ways' ops are declared nowhere. Base §2.8 (*the decline and regrowth hooks*) and §7.1's village
binding row say the ways' ladder runs "by `DeclineOp`'s `retireWay`, `effaceWay` and `reopenWay` (§4.11)"; V06 issues
them (`ProductEpochRows.street.op`/`again`/`reopen`, V06 §2.1; the village street candidate, V06 §3.5.2; tier (5′) and
the placement rule, V06 §3.8.2; the replay's destroy, V06 §3.20.5 (1)) and V07 issues and hand-binds them (V07 §3.12,
§4.1, §4.4). §4.11's `DeclineOp` union has no such member: f item 268 (BCR-V7-32) part (b) — the ruled member — is
missing, so the `convert` operator has no op for any of the three.
(The canon routed f item 268 to model, by the f file's §2.8 heading; model applied part (a), and part (b) edits §4.11, the pipeline's.)
**Required change (pipeline, §4.11 `DeclineOp`).** Add, after the deck member, f item 268 (b)'s member: "`| { op:
'retireWay' | 'effaceWay' | 'reopenWay'; way: Id }   // a way of a land class on ground part 0 at a village rung (V07
§3.12): retire — in use → abandoned (a hollow way); efface — abandoned → decayed; reopen — a hollow way back to built,
regrowth first; issued through the product's epoch rows (V06's ProductDeclEpoch.rows) or by hand through convert; never on
a deck, a ford or a raised part`".

### AT-13 · MAJOR · DISAGREE · owner V06
**Claim.** The replay's destruction uses the hollow-way op outside its domain and outside its build slot. V06 §3.20.5 (1)
has "every way takes `retireWay` (V07's op, item 268 …)" at a destroy effect. The base restricts the op to "ways on ground
part 0 of the land classes … at a village rung" and says "the crossing and water classes (`bridge`, `pier`, `quay`, a
mole) and every raised part never become hollow ways … a `ford` retires with its carried way" (§2.8; f item 268's
member: "never on a deck, a ford or a raised part"). And item 268 is STAGED with the village product (V-M), while V06 §8's
E9 (the replay) names no dependency on it; with no village product registered V06 §3.3.2's clamp ([1 500, 120 000])
forbids the destroy's "target 0 from `w` until the refounding".
**Required change (V06 §3.20.5 (1) and §8's E9 row).** (1) reads: "every way of a land class on ground part 0 takes
`retireWay` (item 268: `abandoned`, its line kept as a hollow way and field boundary), a deck host its deck member's
`ruin` (§4.11, its deck plots' buildings with it), a ford with its carried way, every raised way `neglect`; with no
village product registered the target cannot reach 0 (V06 §3.3.2's clamp), so a `destroy` effect is reported
(`replay.destroyUnregistered`) and has no effect but its soft hint, as an unmapped event type has (V06 §3.20.3)". E9's contents add "the destruction's hollow ways after
V-M's item 268 (as the burial clause after M6-U)".

### AT-14 · MAJOR · DISAGREE · owner pipeline
**Claim.** Whether the base's own epoch path re-resolves `Features.sewers`. II.7.1 says the feature is "re-resolved at
each epoch against the epoch's rung and population … (V06's prelude, V06 §3.2; the first epoch it turns on, the network
is laid whole, §4.11)", and §4.11 *Regrowth-first* (6), a `'grow-by-stage'` rule, lays the network whole "the first epoch
the feature turns on … (V06's `under.extend`)". V04 §8's V4-U5 builds "U-NET laid whole at the first sewers epoch …
run by hand and on M4's grow path", and V04 §3.10 has `SewerStrategy.extend` "on the grow-by-stage path, after the new
stage's S11". But V06 §3.1 (2) defines `'grow-by-stage'`'s `prelude` as "the rung and the dials before S2" only — the
re-resolution is V06's — so on M4's path (no V06) a TOWN grown past CITY's floor never turns sewers on and V04's
first-sewers-epoch contract has no caller. Two units place one rule in different strategies.
**Required change (pipeline, II.7.1 and §4.11).** The re-resolution is the base's prelude act, on both strategies (f item
550 is a base item): II.7.1 reads "re-resolved at each epoch's `prelude` (§4.11; both strategies, V06 §3.2 row 1) …";
§4.11 *The epoch's order*'s "Before S2" sentence gains "the feature set re-resolved at the epoch's rung (II.7.1)"; and
*Regrowth-first* (6)'s parenthesis reads "(on `'grow-by-stage'`, V04's M4 hook after the new stage's S11; under
`'history'`, V06's `under.extend`; V04 §3.10)".

### AT-15 · MAJOR · DISAGREE · owner V06
**Claim.** The V06 half of AT-14: V06 §3.1 (2) lists `'grow-by-stage'`'s `prelude` as "(the rung and the dials before
S2)", and V06 §3.2's *The feature set at an epoch* presents the re-resolution as the engine's, so under `'grow-by-stage'`
(T-V6-1's arbiter, "a step M4 runs that has no phase fails it") the feature is never re-resolved, against II.7.1 and
V04 §8's V4-U5.
**Required change (V06 §3.1 (2) and §3.2).** §3.1 (2): "`prelude` (the rung, the dials and the feature set before S2)";
§3.2 *The feature set at an epoch* opens "The base's prelude act (II.7.1; item 550), run under both strategies: …", the
first-epoch whole-network clause naming V04's M4 hook on `'grow-by-stage'` beside `under.extend`.

### AT-16 · MAJOR · DISAGREE · owner V06
**Claim.** The stage component of `hood.fabric`'s draws. V06 §2.1 (`EpochParticipant.stage`: "its draws' stream-key stage
and its reads' tag") and V06 §3.16 ("participants register the stage their volume names — … `S9b` for `hood.fabric` …
and their draws use that id") put every draw of the participant on stage `S9b`. V01 §3.3.6 registers `stage: S9b` but
draws "on `ctx.stream(S7c | S9b, entity)`" — S7c's rule for a new district on `S7c`, S9b's rule for a re-cut block on
`S9b`. A new district's fabric draw takes a different stream key by each text.
**Required change (V06 §2.1 and §3.16).** `EpochParticipant.stage`'s comment reads "the stage its volume names (V06
§3.16) — its reads' tag and its draws' default stage; a participant that runs two stages' rules draws each on that rule's
stage through `ctx.stream(stage, entity)`"; §3.16's list reads "`S9b` for `hood.fabric` (V01 §3.3.6: its S7c rule draws
on `S7c`, its S9b rule on `S9b`)".

### AT-17 · MAJOR · DISAGREE · owner V01
**Claim.** `Way.surface`'s lifecycle row omits its epoch writer. V01 §2.7 — the field's home row, which V06 §2.12 cites
("V01's field (V01 §2.7; item 207), this volume one of its epoch writers") — gives `create` "S10a's end (V01 §3.7.3)"
only, while V01 §3.7.3 itself and V06 §3.4 (9) have the epoch's `field` phase write it ("a `setAttr` (cause
`rule:field`) written where the value changes"), and V06 §2.10/§2.12 the landfall clearance's `setAttr` pair (V06
§3.5.2). The home row and its readers disagree on who writes the field.
**Required change (V01 §2.7, the `Way.surface` row).** `create` reads "S10a's end (V01 §3.7.3); at an epoch the `field`
phase's re-lay (a `setAttr` op of the `epoch` event, cause `rule:field`; V06 §3.4 (9)) and the landfall clearance's `setAttr`
pair (cause `rule:landfall`; V06 §3.5.2)"; `undo` reads "the writing event's undo record (an epoch's for the engine's
writes)".

### AT-18 · MAJOR · DUPLICATE-HOME · owner V01
**Claim.** The `hood.fabric` participant's scope is stated twice in V01 with different scopes. V01 §3.3.6 (its home)
gives (1) districts made outside S7b → S7c, (2) every block of `EpochScope.recut` ("re-cut or redeveloped" by rung 3) →
S9b, (3) the districts `scope.raised` crosses, (4) nothing else; V01 §3.5.11 restates it as S9b "on the blocks an epoch
creates outside a growth run's S10a hook and on due blocks rung 3 redevelops" — a block set (blocks outside S10a's hook)
§3.3.6 does not list, and "redevelops" without "re-cut". V06 §3.2's participant table follows §3.3.6.
**Required change (V01 §3.5.11).** Replace the restatement by the reference: "S9b's epoch half is the `hood.fabric`
participant's (V01 §3.3.6 (1)–(4)): its rule on the blocks of `EpochScope.recut`; every other block keeps its content,
and a standing square, green or manor block is a survivor".

### AT-19 · MAJOR · DISAGREE · owner V02
**Claim.** The epoch casters' moment, restated in V02. V02 §3.14.1 (a) says "at an epoch (§4.11) the previous epoch's
buildings enter the daylight-share raster through them"; V06 §3.4 (1), the mask's home, rasterises "the buildings as
they stand when the field phase runs — after this epoch's hazards", before anything the epoch's later phases place (the
pair of AT-06 in the base). After an epoch's fire or topple the two give different casters.
**Required change (V02 §3.14.1 (a)).** "These are item 102's epoch casters: at an epoch the buildings standing when its
field phase runs — after that epoch's hazards, before anything it places — enter V06's building shade mask through them
(V06 §3.4)".

### AT-20 · MAJOR · DISAGREE · owner V06
**Claim.** The dig-from-above draw's key at an epoch. V04 §3.5.7 (d) — the draw's home — keys it by "(the building's
lineage, `dig`, the void kind; the lineage carries the epoch that built it and the wing key of a wing V02's mutator adds,
V02 §3.9 W6)", and V02 §3.9 W6 has an added wing draw "once for an access down, keyed (building lineage, `dig`, the void
system's kind, the wing's key)". V06 §3.18.1 (2a) restates the key as "one uniform per (building lineage, `dig`, void
kind)" and says only "a rebuild on a trace … and every new stage's buildings bring new draws", so a `MutationPlan` step
or a rung-3 op that adds a wing over a void (`scope.basementGrown`) re-compares the building's old draw instead of
drawing for the wing.
**Required change (V06 §3.18.1 (2a)).** Replace the restated key by the reference: "its fixed-key draw (V04 §3.5.7 (d):
key parts the building's lineage, `dig` and the void kind, with the wing key of a wing the mutator adds, V02 §3.9 W6) …
while a rebuild on a trace (a successor lineage, §6.3), a wing an epoch's mutation adds and every new stage's buildings
bring new draws".

### AT-21 · MAJOR · DUPLICATE-HOME · owner V03
**Claim.** Which crypts the rank counts. V03 §3.7.4 (3) — the rank's home — runs it "over every building with a crypt",
the principal being "the `cathedral` building's … with no cathedral, the `always` building's with the largest ring".
V06 §3.18.3 (2) adds a condition the home lacks: "Only crypts of buildings whose **live** use is in the church family
are ranked; a vacant, ruined or converted building's crypt stays in the model, unranked." After an epoch ruins or vacates
a former cathedral, V03's text keeps it principal and caps the live see's crypt; V06's makes the live seat principal.
One rule, two homes, two results.
**Required change (V03 §3.7.4 (3)).** The rank's opening reads "Only crypts of buildings whose live use is in the church
family are ranked — a vacant, ruined or converted building's crypt stays in the model, unranked (the epoch case, V06
§3.18.3 (2)). The settlement's principal crypt is the ranked `cathedral` building's …"; V06 §3.18.3 (2) then cites V03
§3.7.4 (3) for the condition instead of stating it.

### AT-22 · MAJOR · DISAGREE · owner V07
**Claim.** The village street candidate's rate. V07 §3.12 *Decline and desertion* says a disused way "is a candidate of the
pool's `street` kind at a village rung … struck at V06 §3.5.2's street rate **per year** over the epoch's span (`1 − (1 −
p)^years`, §4.11 *The clock* (5))". V06 §3.5.2 — the pool's home — makes the persistence rate a layer weight: "`w = E(x) ·
rate(layer) · u` …, strikes are taken in descending `w` … with no second draw … until the district's `fabric` churn cap
or the 2-plots-per-block bound stops it"; V11 §3.18 repeats that the rows are "a layer weight inside the churn cap …,
never a per-year chance" (J-V11.71). A per-year chance and a capped weighted draw give different numbers of hollow ways.
**Required change (V07 §3.12, *Decline and desertion*).** "… is a candidate of the pool's `street` kind at a village rung
(V06 §3.5.2, read through the village's epoch rows): weighted by the street layer's persistence rate inside the
district's `fabric` churn cap (V06 §3.5.2), it takes **`retireWay`** …" — the per-year clause removed (the cap is what
scales with `years`, §4.11 *Churn*).

### AT-23 · MAJOR · DISAGREE · owner V07
**Claim.** The rung at a hand-off. V07 §2.1's fold (and V06 §2.1 / §3.1 (3), which read it) gives the rung by §1.1's router
at the target outside the band and the previous product's edge row inside it; V07 §3.12 states flatly "*The hand-off up* …
(the fold gives the base product; the rung is TOWN)" and "*The hand-off down* … (the fold gives the village product; the
rung is VILLAGE)". A village whose target jumps to a CITY population in one epoch, or a town that falls to a hamlet's
population, is on CITY or HAMLET by the fold, not TOWN or VILLAGE — and V06 §3.19 (C) founds raised ways only at the
fold's CITY rung, V04's maintenance mode and the village phases read the fold's rung.
**Required change (V07 §3.12, both headings).** "(the fold gives the base product; the rung is the fold's — TOWN unless
the target reaches a higher band, V07 §2.1)" and "(the fold gives the village product; the rung is the fold's — VILLAGE,
HAMLET or THORP by the target, V07 §2.1; a target of 0 routes to THORP and desertion, §4.11)".

### AT-24 · MAJOR · DISAGREE · owner V07
**Claim.** Who writes a land-use retype at a village epoch. V07 §2.6's `LandUse` retype row gives `create` "an epoch's
village phases (V07 §3.12) or a hand `convert`", while V07 §3.12 itself says the decline and hinterland phases are the
engine's, reading the village's `epoch.rows` (V06 §3.5.3's fallow ladder with `hinterland.slack`, `order` and `cap`),
and the village's own retypes are the fair field's (the `dossier` step's `village.records` or the siting override's step
(m), V07 §3.12 (a)); V06 §2.8's `retypeLand` adds the withered oasis garden (V06 §3.12.1). The row names a producer that
does not issue the op and omits two that do.
**Required change (V07 §2.6, the `LandUse` retype row).** `create` reads "the engine's hinterland step with the village's
`epoch.rows.hinterland` (V06 §3.5.3); the fair field's `commons` faces by `village.records` or the siting override's
step (m) (V07 §3.12 (a)); a withered oasis garden (V06 §3.12.1); a hand `convert`"; `regenerate` "kept" (as V07 §4.4's
row).

### AT-25 · MAJOR · DISAGREE · owner scope
**Claim.** The evolution engine's build slot and price. §16's staged row reads "**M6-E — the evolution engine** (V06 §8:
E0–E8) … E4 after item 105's S10b changes land, E8 after V04's U5, E7 after E1–E6; item 113's history replay at
generation (volume 6) | 25.25–35.75 pw", §16's totals row "the evolution engine (volume 6) | 25.25–35.75", and INDEX.md's
V06 row and its plan the same. V06 §8 has ten milestones E0–**E9** (E9: item 113's replay at generation, 2.75–4.25 pw)
totalling **29–41.5** pw, and its dependencies add E3's raised-way pass after item 110's base half at M3a and E9's burial
clause after M6-U's buried system (V06 §8, §11 Q1). g item 113's V06 part is new design at build depth, so its milestone
belongs in the combined plan.
**Required change (scope, §16's M6-E row and totals row; INDEX.md's V06 row, §3 dependency graph and §4 order).** "M6-E —
the evolution engine (V06 §8: E0–E9) | M4 | M5, the village | V06 §8; E3's raised-way pass after item 110's base half
(M3a), E4 after item 105's S10b changes land, E8 after V04's U5, E9's burial clause after M6-U's buried system, E7 after
E1–E6 | 29–41.5 pw", the totals recomputed once by item 568.

### AT-26 · MAJOR · DISAGREE · owner V06
**Claim.** An author value no record has. V06 writes several epoch ops "(author `engine`, …)" — the `field` phase's
`Way.surface` re-lay (V06 §3.4 (9), W81, §2.12), `Use.strain` (V06 §3.9), the spring row's `setAttr(spring.flow)` (V06
§3.12.1 (3)), the raised way's `underuseSince` (V06 §3.19.2 (2)). §7.1's `EditBase.author` is `'user'|'host'|'epoch'|
'migration'` and §2.8's `LifecycleEvent` has no author (its `cause` carries `rule:…`); an op inside an epoch is a batch of
the one `epoch` event (V06 §3.1 (4)). What the text relies on — that such a write is no user edit, so it never enters
`flags.editedPaths` ("attributes the user set", §2.8) and the next epoch's "edited `surface` kept" test does not hold it
— is stated through a value that does not exist.
**Required change (V06, every "author `engine`").** Read "(an op of the `epoch` event — its `EditBase.author` `'epoch'`
(§7.1), its lifecycle cause `rule:…`; never in `flags.editedPaths`)" — once, in V06 §3.1 (4), with each site citing it.

### AT-27 · MAJOR · DISAGREE · owner V07
**Claim.** The same non-existent author value at a village epoch: V07 §3.12 *Pins over epochs* ("the pin records VS8
writes (author `engine`, cause `rule:village.pins`)") and V07 §2.6's village-epoch pins row ("author `engine`"), against
§7.1's `EditBase.author` (`'user'|'host'|'epoch'|'migration'`).
**Required change (V07 §3.12 and §2.6).** "(ops of the `epoch` event, `EditBase.author` `'epoch'` (§7.1), cause
`rule:village.pins`)", citing V06 §3.1 (4) as AT-26 words it.

### AT-28 · BLOCKER · DISAGREE · owner pipeline
**Claim.** V06's conversion kinds are outside the one union. §4.11 declares `ConversionOp` "here, once, as one union"
ending "`| LadderOp | DeclineOp | UseConversionOp | TerrainWaterOp | HiddenOp | RaiseGrade | ClearUndercity;`" and its
prose lists no volume-6 kind, while §7.1's `convert` ("`op: ConversionOp /* §4.11, V06's EvolveOp and V05's island ops
among them */`"), §7.4's convert row ("V06's `EvolveOp`s — `absorbWall`, `downgradeWay`, `upgradeWay`, `burn`,
`repairWall`, `retypeLand`, `repairRaised`, `repairRetaining`") and §2.8's `LifecycleEvent.cause` ("its ConversionOp or
EvolveOp kind") — and V06 §2.8 ("in ConversionOp's union (§4.11 …)"), V06 W10 and V07 W27 — all place `EvolveOp` in it.
f item 209 (BCR-V6-5) (a) is the ruled base text ("`… | ClearUndercity | EvolveOp;`"); it is not applied, so the
operator that every epoch op and every hand `convert` passes through has no member for the eight ops.
(The canon routed f item 209 to model, by the f file's §2.4 heading; model applied part (b), `Way.formerClass`, and part (a) edits §4.11, the pipeline's.)
**Required change (pipeline, §4.11).** The union's last line reads "`| LadderOp | DeclineOp | UseConversionOp |
TerrainWaterOp | HiddenOp | RaiseGrade | ClearUndercity | EvolveOp;`", the opening sentence's list gaining "and the
evolution engine's `EvolveOp` (item 209: `absorbWall`, `downgradeWay`, `upgradeWay`, `burn`, `repairWall`, `retypeLand`,
`repairRaised`, `repairRetaining`; declared at V06 §2.8), each usable by hand through `convert` (§7.1) with an undo record
(§7.4) and a lifecycle cause `convert:<op>`".

### AT-29 · BLOCKER · DISAGREE · owner pipeline
**Claim.** The plan step on `mutate`. V06 §3.10.2 applies each `MutationPlan` step as "a `mutate` op carrying `step: {
plan, step }` (item 264) that applies exactly that step's parts of the stored record"; §7.1's edit-target table says "a
`mutate` with its step (item 264)" and V06 §4.2's hand form "a `mutate` with the step". §4.11's `UseConversionOp` member
is still "`{ op: 'mutate'; plot: Id; to: Designation; spread?: 'now' | 'epochs' … }`" with no `step`: f item 264 (BCR-V6-7)
(b) is not applied, so neither the engine nor a user's "do it now" can apply one step of a plan.
(The canon routed f item 264 to model, by the f file's §2.8 heading; model applied parts (a) and (c), and part (b) edits §4.11, the pipeline's.)
**Required change (pipeline, §4.11 `UseConversionOp`).** "`| { op: 'mutate'; plot: Id; to: Designation; spread?: 'now' |
'epochs'; step?: { plan: Id; step: 'adapt' | 'extend' | 'rebuild' } /* §4.7 S11's operator; 'epochs' issues its steps at
mutation.stepYears (V06 §2.2); with step, the op applies exactly that step's parts of the plan's stored MutationRecord
(V06 §3.10) */ };`" (with AT-01's comment wording).

## Shared subjects checked and found in agreement (current text, whole subsections)

| subject | home | members read | verdict |
|---|---|---|---|
| the epoch's order (a)–(j) and V06's twenty steps; participants at `afterField` / `decline` / `afterGrowth`, `(order, id)` | §4.11; V06 §2.1, §3.2 | pipeline §4.11, V06, V01 §3.3.6, V04 §3.10, V05 §3.15, V07 §3.12 | agree but AT-02 (list wording) |
| the participant table: `sky.islands` 0, `village.plan` 10, `village.density` 20 (`afterField`); `under.fade` 10 (`decline`); `under.extend` 10, `under.access` 20, `under.undercity` 30, `hood.fabric` 40, `sky.clearance` 50, `village.pins` 60 (`afterGrowth`); stages SKY, U-FADE, S9b, VS1, VS2, VS8 | V06 §3.2, §3.16 | V01, V04, V05, V07 | agree but AT-16 (hood.fabric's two stages) |
| `EpochScope` fields and their one reader list (W64) | V06 §2.1, W64 | V01 §3.3.6, V04 §3.10, V05 §3.15 (7), V03 (no field) | agree |
| `EpochOps.displaced` / `demandTaken`, `HouseholdLedger`, `Household.transit`, causes `island`, `void`, `clearance` | V06 §2.1, §3.8.1 | V04 §3.10, V05 §3.15, determinism §5.3's Works row | agree (matrix gap, below) |
| the product fold and `handoff.band` (1 575 / 1 425; the edge rung inside the band) | V07 §2.1 | pipeline §4.11, V06 §2.1, §3.1 (3) | agree but AT-23 (V07 §3.12's headings) |
| `ProductDeclEpoch` (`phases`, `participants`, `rows`, `records`), `EpochPlacement` `village.records` (stage S10b, keyed by the dossier event's `seq`) | V06 §2.1 | V07 §2.1, §2.2, §3.12 | agree |
| `ProductEpochRows`: persistence (church-family × 0.3, manor × 0.5), street (classes, `retireWay` / `effaceWay` / `reopenWay`), hinterland (slack 0.2, `perimeterPoorest`, `greatFieldPerEpoch`) | V06 §2.1; V07 §2.2 | V06 §3.5.2–§3.5.3, §3.8.2; V07 §3.12 | agree but AT-12, AT-22 |
| the decline table's persistence rows (`use` 1.0 … `raised` 0.05, `retaining` 0.05, `underground` 0.03, `terrainWater` 0.005; decks at the street's 0.08), chance share 0.25, haul radius 250 m, exemptions | §4.11 | V06 §3.5.2, §3.19, V04 §3.10, V11 §3.18 | agree but AT-07, AT-08 (dwell bands) |
| the churn caps (0.05 / 0.10 / 0.10 per decade, 2 plots per block, fractional extra on `epoch.transform`) | §4.11 | V06 §2.1 `ChurnLedger`, §3.5.2, §3.8.4 | agree |
| the island ladder floating → waning → settled → fallen, `removed`; `IslandEpochStep`; `fallIsland` and the landfall's covered kinds; `reclearIsland` only from `sky.clearance` | II.6, §4.11, V05 §3.15–§3.16 | base §7.4 rows, V06 §3.5.2, §3.7.5, §3.19, V04 §3.10 | agree |
| the underground's own lottery after the fabric pool, uncapped, never demolished; `UndergroundFade`, `SewerStrategy.derive` / `.extend`, `CatacombGrowth.grow(opts)`, `UndercityEpoch.reread`, `Foundations.apply`, `ArchVaults.reconcile`, `QuarryWorkings.extend`, `AccessPass.run(scope)` | §4.11, II.6–II.7; V04 §3.10 | V06 §3.2, §3.18 | agree but AT-09, AT-10, AT-11, AT-20 |
| the catacomb ratchet, count bounding foundations, growth cap `max(extent × ((1 + growthCapShare)^years − 1), growthFloorM2)`, stagnation and `blockedBy`, closed faces | V04 §3.5.1, II.7.6 | V06 §3.18.2 | agree but AT-09, AT-10, AT-11 |
| the crypt over epochs: seat's crypt in the causing batch, trim shortens `Basement.crypt.ring` only, crypt join's fixed-key draw | V03 §3.7.4; V04 §3.5.7 (c) | V06 §3.18.3, V02 §3.14.5 | agree but AT-21 |
| raised ways, retaining walls and decks over epochs: `DeclineOp` raised / retaining / deck members, `SpanRef`, deck condition as its host's existence, `repairRaised`, `repairRetaining`, suppressions (`detail.suppress`, kept apart from V05's record form, E-02) | §4.11, §2.7, §2.8; V06 §3.19 | V01 §3.17, V02 §3.16, V04 §3.10, V05 §3.16, V07 §3.12 | agree |
| `Enceinte.condition` (standing · breached · dismantled), `pathway`, `underuseSince`, the no-stretch `repairWall` | §2.7 (item 575, 254); V06 §2.7–§2.8, §3.7 | V05 §3.16 (4) | agree |
| Works: target a building or plots, no Works for walls, ways, water, land uses, raised parts, retaining walls, decks; retirement at the span start; `heightsAt` in stack order | §4.11 *Works*; V06 §3.13 | V02 §3.15, §3.16 | agree (matrix gap, below) |
| identity over epochs: survival, JOIN / SPLIT, `raiseIsland`'s key, the replay's `0x8000 + r`, fixed-key draws with no epoch component, rename case (5) | §6.1, §6.3 | V06 §3.16, V04 §3.12, V05 §2.5 | agree but AT-11, AT-20 |
| the epoch's lifecycle row (undo record, no undo target with a dossier change, the replay's creation prefix), `advance`'s group and its three undo cases | §7.4; V06 §4.1 | V06 §2.12, V07 §2.6 / §4.4 | agree |
| the hand forms and their lifecycle rows (`EvolveOp`, island ops, `retypeLand` one op with V07's fields) | §7.1, §7.4; V06 §4.2 | V05 §4.2, V07 §4.4 | agree but AT-12, AT-24, AT-28 |
| the history replay at generation: peak, coarse epochs, event-to-epoch effects, destroy / refound / burial, `HistoryRecord` | §4.11 *History-first*; V06 §3.20 | V04 §2.6 (buried former settlement), V07 §3.12a | agree but AT-13 |

## Matrix gaps — shared subjects the matrix holds no row for

Each is judged; where the verdict is disagree the issue above carries the fix and its claim names the gap.

| subject | units | verdict |
|---|---|---|
| `retireWay` / `effaceWay` / `reopenWay` | model §2.8, pipeline §4.11, V06, V07 | **disagree** — AT-12, AT-13 |
| `MutationPlan` and the plan step on `mutate` | pipeline §4.11, model §2.8, determinism §7.1, V06, V02 W10 | **disagree** — AT-01, AT-29 |
| `EvolveOp` in `ConversionOp` (the matrix gives it home V07) | pipeline §4.11, determinism §7.1 / §7.4, model §2.8, V06, V07 | **disagree** — AT-28 (home V06 §2.8) |
| `Features.sewers` at an epoch | pipeline II.7.1, §4.11, V04, V06 | **disagree** — AT-14, AT-15 |
| `BuildingShadeMask` / the epoch casters | pipeline §4.5, §4.11, V06, V02, V05 | **disagree** — AT-06, AT-19 |
| `UseRuleRow` durations / `Use.strain` | pipeline §4.11, §10.2, V06 | **disagree** — AT-04 |
| the departure matching vs the strike pool | pipeline §4.11 (c), V06 | **disagree** — AT-03 |
| the regrowth tiers (5′), (5″) and the stage exceptions | pipeline §4.11, V06, V07 | **disagree** — AT-05 |
| the decline table's dwell bands | pipeline §4.11, II.6, V04, V06, V07, V11 | **disagree** — AT-07, AT-08 |
| `Basement.crypt`'s rank over epochs (the matrix pairs V03 – V04 only) | V03, V06 | **disagree** — AT-21 |
| the edit author of an epoch's ops | determinism §7.1, model §2.8, V06, V07 | **disagree** — AT-26, AT-27 |
| `handoff.band` | V07, V06, pipeline §4.11 | agree |
| `Household.transit`, `DisplaceCause`, `HouseholdLedger` | V06, V04, V05, determinism §5.3 | agree |
| `Foundations.apply` | V04, V06 | agree |
| `LifecycleEvent.detail.suppress` | model §2.8, V06, V02, V05 (kept apart) | agree |
| `heightsAt` in stack order | pipeline §4.11, V02, V06 | agree |
| `HistoryRecord` | model §2.7, V06, V04, V07 | agree |

The agree rows need no unit text change; the canon's matrix is the place to record them.

## Hand-offs among the members — closure at the destination

Read in agreement.json's hand-off list (72 rows naming V06 or an epoch among these members) and in each member's Fix
list, Integration notes and hand-off rows: V06's X rows whose destination is a member (X1–X4, X10, X11, X14–X16, X18,
X22, X24–X28, X32–X34, X36, X37, X40–X43, X45 — each met in the destination's current text), V02 X8 and X23, V07 FL-3 (closed by IN-V07-2), V08 X3, V12 X-V12-10 and X-V12-11 (V06
T-V6-65 reads "every `deck.offer` 0, `terrace.enabled` false"). Every one is closed at its destination **except** the
base halves that V06 X34 and X42 name: f item 268's `DeclineOp` member (AT-12) and f item 336's text (AT-05), and, by
the same root (the f items whose text edits §4.11 but which the f file files under another heading, routed by the canon
to that heading's part), items 209 (a) (AT-28), 264 (b) (AT-29), 266 (AT-01), 479 (AT-03), with item 429 (c) (AT-04),
routed to the pipeline itself. Every member's own §13 Fix list is empty.

## Doc checks

`docs/validation/bench/doc_checks.py` was not re-run for this seat (a read-only check, no unit text written); the
corpus it compares against is absent in this checkout, so any run here is provisional (the assemble seat's provisional
run exited 0).
