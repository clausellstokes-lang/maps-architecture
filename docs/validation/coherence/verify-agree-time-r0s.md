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
**Required change (pipeline, §4.11 *The runner*).** The sentence reads: "V06's `'history'` strategy adds the phases
`hazards`, `uses`, `departures`, `decline`, `fortification`, `terrainWater`, `raisedWays`, `ladder` and `close`, reuses the
base phases of `demand`, `dossier`, `lapse` and `character` and the base part of `prelude`, wraps the base parts of
`prelude`, `field`, `siting`, `growth` and `works` with its own acts (V06 §3.1 (2)), and runs the participant steps
`afterField`, `decline` and `afterGrowth` — the twenty steps of V06 §2.1, in V06 §3.2's order".
