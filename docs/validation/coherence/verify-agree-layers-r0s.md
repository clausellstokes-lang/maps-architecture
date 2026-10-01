# Agreement check — the layers and the variant products (verify-agree-layers-r0s)

> PENDING FABLE REVIEW — opus seat coherence/verify-agree-layers-r0s (first agreement check after assemble-r0), standing in for the Fable seat.

PROGRESS
- P1 brief, agreement matrix (15 pairs among model, pipeline, rendering, V04, V05, V07; 663 subject rows, 316 subjects), canon rulings, hand-offs (64 rows from or to the members): read — done
- P2 shared subjects checked in the current text (whole subsections): done
- P3 matrix gaps hunted (duplicate declarations, record fields, named constants, base types declared only in a volume): done
- P4 hand-offs checked at their destinations: done
- P5 report and result: done

**Result: 21 issues — 1 blocker, 20 major** (16 DISAGREE, 3 DUPLICATE-HOME, 2 MATRIX-GAP; 0 HANDOFF-OPEN beyond VAL-21's
hand-off closed at its destinations differently from the requester's statement). Owners: pipeline 9, V07 4, V04 3,
rendering 2, V05 1, model 1, V09 1. Return: `docs/validation/coherence/results/coherence_verify-agree-layers-r0s.json`.
Design files untouched.

## Scope and method

**Members.** model (§2), pipeline (§4, §10, PART II, PART III), rendering (§8, §9, §11, §12), V04 (underground), V05 (sky),
V07 (village). Rung rules were read at their home (§1.1's `RungProfile` and the village rows; scope) wherever a member
leans on them. The fabric chain (model–pipeline on plots and buildings) is the fabric seat's; this seat read the
model–pipeline pair only where it touches arenas, layers, rungs and the staged hooks.

**What was read, whole.** The 15 member pairs of `agreement.json` (V04–V05, V04–V07, V04–model, V04–pipeline,
V04–rendering, V05–V07, V05–model, V05–pipeline, V05–rendering, V07–model, V07–pipeline, V07–rendering, model–pipeline,
model–rendering, pipeline–rendering); the canon's conflict rulings that touch them (MC-01–MC-12, CF-PIPE-01–13,
RIC-01–05, RXC-01–02, V04-ICONF-1–5, V04-XCONF-1–3, V05-ICONF-1, V05-XCONF-1, V07-ICONF-1–5, V07-XCONF-1–2), E-01, E-03,
E-30, E-31, E-38, E-39, J-C4, and the dated rulings for g items 114–119; the members' hand-off lists (V04 §13's sibling
table and Integration notes, V05 §13 and its notes, V07 §13 and its notes) and every one of the 64 hand-off rows of the
matrix that leave from or arrive at a member. The current text read whole: §2.2 (parts), §2.5 (`ContextVector` and the
territory paragraph), §2.7 (the staged-layer block, `RaisedWayRecord`, `RetainingWall`, `Enceinte`, the underground
records), §1.1 (`RungProfile`, the rung table), §4.1 (stage graph, SKY's keys, the `raised` key, the tail), §4.5 (S7b (5)–(7),
S12c's coverage, the void-dwelling part), §4.7 (`LightRule`), §4.9 (`FarmTable`, `FarmModeRow`), §4.11 (islands and the
underground over epochs, `DeclineOp`), §4.12 (`StageDecl`, the strategy signatures, the owner-staged list), II.1, II.6,
II.7.1–II.7.6, PART III; §8.2 (states table, presets, chroma binding), §8.4 (`LayerSpec`, the underground view),
§9.1 (`QuarterNode`), §11.1 (VTT, GeoJSON rows for the layers), §12.4 (the tail and forecast rows); V04 §1.2, §1b,
§2.1–§2.6, §3.1, §3.3 P6–P7, §3.5 (chances, §3.5.0a, §3.5.1 (10), §3.5.7 (d)–(g)), §3.9, §5, §6, §13 and its notes;
V05 §1.3, §1b, §2.1–§2.4, §3.1, §3.11–§3.15, §5, §13 and its notes; V07 §1, §2.1, §2.4 (the village-rung `dist`
paragraph), §2.7 (`RaisedRead`), §3.0, §3.4–§3.5a, §3.9 (1), §3.12 (islands, maintenance), §3.16, §5.2–§5.4, §13 and its
notes.

**Checks run over the whole members** (scratch scripts, receipts in the seat's scratch folder): every `interface`/`type`
declared more than once across the set (14 names; the one inside this lane is `OpeningRow`); every `Record.field` the
three volumes use on a declared record against its declaration (5 misses, 4 explained by views or unions, 1 already
raised as VM-R0S-11); every reference from any unit into V04, V05 or V07 sections against their headings (one
unresolved: PART III's `V07 §15`, already VPC-15); every backticked constant stated with a number in two members (8
pairs, all different fields or equal values); every base code line using a type declared only in a volume (38 types;
cited homes accepted where the base names them — the one uncited inside this lane is `PlanForm`).

**Agreement confirmed (no issue).** `ContextVector.arena` 'sky' (MC-05) and V05 §3.11's sky reading; `SkyIsland` /
`UndersideProfile` / `ShadeBasis` / `SkyAccess` (MC-07: `rim`/`land`, the state enumeration, `elevationCm` derived) and
§8.2's island and sky-access state rows; `LayerSpec` (`underView`, `occlusion`, `ghostAlpha`, `offsetPerMetre`,
`showCircuit`) against V04 §5.1, V05 §5.2 and V07; `LightRule` hosts and arenas against V04 §3.9 and V05 §3.13;
`AccessPoint` kinds, `source` and `AccessCause.rule` (the mine breach as source `dig`, cause `mineBreach`), V04-ICONF-1's
lifecycle row; `UndergroundSystem` kinds, `UndergroundSystemRow`, `LinkRule`, `RaiseGrade`, `ClearUndercity`,
`UndercityExistenceRow` (TOWN 6 000 / 0.2, CITY 2, METROPOLIS 3) and II.7.5's size law against V04 P6 and C1; the
depth bands (`depthBandCm` 250) and the cut-away; the VTT portal rule (V04-ICONF-3 applied in §11.1); the U-FORECAST
and tail budgets of §12.4 against V04 §6; II.6's slot chances and redraw rate (homed in II.6, cited by V05 §2.4); the
island ops of §4.11's `DeclineOp` against V05 §3.15; II.1's sky call against V05 §2.3 and §3.12; SKY's declared keys
(§4.1) against V05 §3.1; `Enceinte` kinds `palisade`/`earthwork` against V07; the strategy signatures V07 binds
(`EnceinteStrategy.trace`, `NetworkStrategy.grow`'s `enceintes`); `StageDecl` against V07 §3.0; `ProductDecl` (V07 §2.1
by file f item 202's own words); the hand-off band (1 575 / 1 425); `LadderRouter`; `frameLaw` `territory`; `BarrierKind`
`sheer`; the span rule's `country` reason (V07-XCONF-2, J-C4) in §2.7, V04 and V07; V04–V05 (no catacomb under an
island, island churches counted once, the landfall read by V04's closures, the `ruin.node` line); V04–V07 (the
maintenance mode, `blockedBy 'rung'`, the charnel vault at V04 §3.5.1 (10), the village working's breach, the ruin centre
at a village rung, the wells as access); V05–V07 (no new island at a village rung; an island waning under the village
product continues V05's steps — V07 §3.12, but see VAL-16).

**Hand-offs.** Of the 64 rows, those addressed to a member were checked at their destination: closed in the text
(V02:X12, V06:X10, X15, X26, X27, X32, X36, X41, X43, X1/J-V6.53, V07:FL-2, FL-3, V08:X3, X13, V09:XV-V9-3, XV-V9-4,
XV-V9-9, XV-V9-14, XV-V9-16 (a), XV-V9-25, XV-V9-27, V10:CVR-V10-1, CVR-V10-10, CVR-V10-14, V11:X-V11-2, X-V11-4,
X-V11-10, X-V11-14 (a), X-V12-14 among them), with one closed differently from what the requester now states
(XV-V9-8: VAL-21). The members' own sibling tables (V04 §13, V05 §13, V07 §13) were checked against the member they
name; their claims about the members hold. The V12 bar hand-offs and the V06 engine hand-offs belong to the proof and
time seats and were read only where they touch a member's record.

**Overlap with the per-unit verifiers.** Issues already raised by verify-pipeline-r0s, verify-model-r0s,
verify-rendering-r0s, verify-kernel-r0s, verify-determinism-r0s, verify-scope-r0s and the volume verifiers are not raised
again (II.6 (5)'s altitude VPC-20; II.6's restated cells VPC-21; `NeighbourhoodRequest`/`Result` VPC-14/VV12-01; the
§4.12 owner-staged list's missing access pass VPC-17 — but see VAL-01, whose order VPC-17's proposed fix would get
wrong; II.7.6's `V04 §2.2` pointer VV34-10; the g items 114–119 F-MISSING parts; the §8.4 toggle rung split VRC0S-09;
the `unexcavated` gate VRC0S-24; `HistoryHint` VM-R0S-11; raised-way feet VK0-05/06, VM-R0S-13).

## Issues

| id | severity | kind | owner | subject |
|---|---|---|---|---|
| VAL-01 | blocker | DISAGREE | pipeline | the underground tail's order: the access pass before the sewer-front stage |
| VAL-02 | major | DISAGREE | pipeline | the network stage at a village rung (maintenance mode) |
| VAL-03 | major | DISAGREE | pipeline | which S12c gives a sky island's districts their character |
| VAL-04 | major | DUPLICATE-HOME | pipeline | the undercity's void-source rank: `UndercityRule.sourceRank` vs `RuinRule.sourceWeight` |
| VAL-05 | major | DUPLICATE-HOME | V04 | `forecastSafety` and `accessForecastMin` in two rule records |
| VAL-06 | major | DISAGREE | pipeline | `voidDwellingHouseholds`: a rule cell or P7's derived count |
| VAL-07 | major | DISAGREE | pipeline | the parity presets and caverns and ruins (II.7.4 *Limits*) |
| VAL-08 | major | DISAGREE | V04 | `OpeningRow` names two different records |
| VAL-09 | major | DISAGREE | V04 | the village subset of the tail omits the charnel vault step |
| VAL-10 | major | DISAGREE | V07 | V07 §3.16 (3) restates V04's dig and opening rules differently |
| VAL-11 | major | DUPLICATE-HOME | V07 | the village-rung `dist` measures stated in §2.5 and V07 §2.4 |
| VAL-12 | major | MATRIX-GAP | pipeline | the base's `raised` data key typed only in V07 (`RaisedRead`) |
| VAL-13 | major | DISAGREE | V07 | `RaisedRead`'s span keys and support state against `RaisedWayRecord` |
| VAL-14 | major | DISAGREE | pipeline | `FarmTable` has no meadow or pasture-and-commons column that V07's land budget reads |
| VAL-15 | major | MATRIX-GAP | pipeline | `PlanForm` used by §4.9's `FarmModeRow` with no home named |
| VAL-16 | major | DISAGREE | V07 | V07 §1: "no island reaches a village rung" |
| VAL-17 | major | DISAGREE | V05 | the shipped sheets that must carry the sky semantics |
| VAL-18 | major | DISAGREE | rendering | the producer of a sky island's `QuarterNode` |
| VAL-19 | major | DISAGREE | rendering | §8.2's chamber row lacks `archVault` and `market` |
| VAL-20 | major | DISAGREE | model | `ContextVector.dist.wall` where there is no wall |
| VAL-21 | major | DISAGREE | V09 | where AP6 and AP7 are priced (hand-off XV-V9-8) |

### VAL-01 — blocker — DISAGREE — owner pipeline
**Claim.** The base states the tail's order three ways and none matches the stages' home. II.7.6's code-block comment:
"Tail stages registered after the network stage by declared I/O (§4.12): the systems in the order ruin, catacomb,
cavern, quarry, vaults and … buried system …; then II.7.3's stage, the access pass, II.7.5's stage; then the connection
stage last" — U-FRONT (II.7.3's stage) before the access pass. II.7.4's `UndergroundStrategy` comment declares its
inputs as `under.tunnels`, the ground plat, the fields and the underground `Allocation` — no output of the access pass.
§4.12's list names `UndergroundSystemStrategy`, `UndergroundStrategy`, `UndercityStrategy`, `UndergroundLinkStrategy` and
no access pass (VPC-17 proposes inserting it after `UndergroundStrategy`, which would repeat the wrong order). V04 §3.1,
the stages' home, orders T1 U-NET, T2 U-SYS, **T2b U-ACCESS, T3 U-FRONT** (T3 reads "the excavation reading (F6)" that
T2b writes: F6's dwellings stand only in accessible cavern and ruin clusters, item 109 (j) (4)), T4 U-CITY, T5 U-LINK,
T6, T8; V07 §3.16 (1) registers the same order at village rungs; II.7.6's prose ("after the void systems and before the
undercity") agrees with V04. Run in the base comment's order, U-FRONT places F6's void dwellings before any excavation
reading exists — a different generator.
**Required change.** II.7.6's comment reads "…; then the access pass (`AccessPassStrategy`, U-ACCESS), II.7.3's stage
(U-FRONT, which reads the access pass's excavation reading for F6), II.7.5's stage; then the connection stage last
(V04 §3.1)". II.7.4's `UndergroundStrategy` comment adds to its inputs the access pass's outputs (its access points,
links and `ExcavationRecord`; V04 §3.1 T3). §4.12's list reads "`SewerStrategy` (U-NET), then `UndergroundSystemStrategy`,
`AccessPassStrategy`, `UndergroundStrategy`, `UndercityStrategy` and last `UndergroundLinkStrategy`, each `phase:
'tail'`, in V04 §3.1's order" (this supersedes VPC-17's proposed wording).

### VAL-02 — major — DISAGREE — owner pipeline
**Claim.** PART III's rung-rows paragraph: "`layers.sewers.existence = 'never'` (II.7.1: no network stage registers, a
request's `toggles.sewers` reported as not applicable, the `drain` column read by nothing)"; II.7.1: "Without a network —
a TOWN whose draw came out `off`, every village — the rule does nothing". V04 §3.1 *The maintenance mode* and J-V4.90
(every inherited system, "the sewer network and the undercity included", stays registered at a village rung, re-derived
from its kept elements, never grown) and V07 §3.12 (a shrunk town's systems "stay registered in maintenance mode") say a
network stage is registered at a village rung that inherited a network; PART III's own next paragraph says the same.
**Required change.** PART III's parenthesis reads "(II.7.1: no network is laid at a village rung — the network stage
registers there only in V04 §3.1's maintenance mode for a network a larger rung left —; a request's `toggles.sewers`
reported as not applicable, the `drain` column read by nothing)"; II.7.1's "every village" reads "every village that
holds no inherited network (V04 §3.1's maintenance mode)".

### VAL-03 — major — DISAGREE — owner pipeline
**Claim.** §4.5 *Which districts*: "S12c covers the ground's districts; a unit run (a sky island's, a standalone
neighbourhood document's) runs its own S12c over its districts (V01 §3.10)". V01 §3.10.3 step 5 ("The town's S12c and
S13a include the island's districts"), V05 §3.1 (SKY-F "after the pool's merge, before S12c — which gives the island's
districts their character and identity as it gives the ground's") and V05 §1b ("S12c, which runs after SKY-F") put a sky
island's districts in the town's one S12c, after SKY-F; CF-PIPE-06's ruling says the same. The verify-pipeline report
marked S12c done; the text still disagrees.
**Required change.** §4.5 *Which districts* reads "S12c covers the ground's districts and the districts of every sky
island (the town's S12c, after SKY-F; V01 §3.10.3 step 5, V05 §3.1); a standalone neighbourhood document's unit run runs
its own S12c over its districts (V01 §3.10). The hinterland, sky and underground pseudo-districts take no character …".

### VAL-04 — major — DUPLICATE-HOME — owner pipeline
**Claim.** The undercity's void-source rank (item 109 (e): a ruin ranks above caverns and quarries) has two homes with two
shapes: II.7.5's `UndercityRule.sourceRank: Partial<Record<UndergroundSystem['kind'], number>>` ("ruin above cavern and
quarry (V11)") and II.7.5 (1)'s prose "ranked … by the rule's `sourceRank`", against V04 §2.3's `RuinRule.sourceWeight:
Record<UndergroundSystem['kind'], number>` ("the undercity's rank: V11 §3.23.6's row"), which V04 P6 and U-CITY C1 read as
`capacity × RuinRule.sourceWeight[kind]` and V11 §3.23.6 and V12's register carry. A rank and a weight are not one
reading; nothing in V04, V11 or V12 reads `sourceRank`.
**Required change.** II.7.5 drops `sourceRank` from `UndercityRule`; II.7.5 (1) reads "a ruin (… ranked above caverns and
quarries by `RuinRule.sourceWeight`, V04 §2.3; V11 §3.23.6: a void's capacity × its kind's weight orders the sources)".

### VAL-05 — major — DUPLICATE-HOME — owner V04
**Claim.** `forecastSafety` (0.85) and `accessForecastMin` are declared twice: II.7.4's `UndergroundRule`
(`voidDwellingHouseholds: number; accessForecastMin: number; forecastSafety: number /* 0.85 */`), which the base's S7b (6)–(7)
caps read (§4.5, II.7.3, II.7.5), and V04 §2.3's `UnderLayoutRule` (`tables/under/layout.json`: `forecastSafety /* 0.85 */`,
`accessForecastMin /* 0.5 */`), which V04 §8 registers for calibration. Two editable cells for one constant can be
edited apart.
**Required change.** V04 §2.3's `UnderLayoutRule` drops `forecastSafety` and `accessForecastMin` and cites II.7.4's
`UndergroundRule` (the base's S7b reads them); V04 §3.3 P7, V04 §1b.1 and V04 §8's register row cite that home; the
default 0.5 for `accessForecastMin` is written once, at II.7.4.

### VAL-06 — major — DISAGREE — owner pipeline
**Claim.** `voidDwellingHouseholds` is a rule cell in the base and a derived count in V04. II.7.4 declares it a field of
`UndergroundRule` (`voidDwellingHouseholds: number`, listed with `crowdingShare` as an `extension` cell zeroed by the
parity presets); §4.5 S7b (6) (d) calls "its share an `extension` cell". V04 §2.4 (`NetworkForecast`) and §3.3 P7 compute
it: Σ min(`voidDwellings.maxHouseholds`, capacity) over the counted cavern and ruin voids, capped at `voidDwellings.share`
× the poorest band's households — its cells being V04 §2.3's `voidDwellings`. A builder reading II.7.4 stores an
editable count; V04 derives it every run.
**Required change.** II.7.4's `UndergroundRule` drops `voidDwellingHouseholds`; its comment reads "… as are
`crowdingShare`, V04 §2.3's `voidDwellings.share` and the class table's …"; II.7.3 (d) and §4.5 S7b (6) (d) read "the
void-dwelling part — V04 §3.3 P7's derived `voidDwellingHouseholds` (its cells V04 §2.3's `voidDwellings`) …".

### VAL-07 — major — DISAGREE — owner pipeline
**Claim.** II.7.4 *Limits*: "with every system's chance 0 (the parity presets) and `maxNeighbourhoods` 0 nothing of the
layer runs but the caverns and ruins the site holds, which are drawn only under the view key `showUnexcavated`". With
every chance 0 no cavern or ruin is laid (II.7.6's `UndergroundSystemRow`: "every chance 0 in the parity presets"); V04
§3.5 ("The parity presets set every chance to 0 …, the ruin toggle `off`") and T-V4-35 ("no ruin and no cavern at any
rung (g item 109 (i)'s no-op pin)") hold none. Read literally, II.7.4 keeps caverns and ruins under the parity presets
and breaks item 109 (i)'s no-op pin.
**Required change.** II.7.4 *Limits* reads "… with every system's chance 0 and `maxNeighbourhoods` 0 (the parity presets)
nothing of the layer runs — no cavern and no ruin at any rung (item 109 (i)'s no-op pin; V04 T-V4-35); outside the parity
presets an unexcavated cavern or ruin draws only under the view key `showUnexcavated` (V04 §5.2; J-VI.19) …".

### VAL-08 — major — DISAGREE — owner V04
**Claim.** One name, two records. Model §2.6 declares `interface OpeningRow { dayType: string; openH: number; closeH:
number }` (a building's opening hours; `Building.openingHours?: OpeningRow[]`, §10.2's `openingHours: OpeningRow[]`). V04 §2.3
declares `interface OpeningRow { kind: 'sinkhole'|'mouth'|'skylight'|'collapsed_shaft'|'ruin_entrance'; chance: number;
coverM?: number }` (`tables/under/openings.json`), and the base's own II.7.6 signature `AccessPassStrategy.run(…, rules: {
…; openings: OpeningRow[]; … })` means V04's — so the base's interfaces use one type name for two shapes. The matrix rated
the subject `agree` (home "defined-in-several").
**Required change.** V04 §2.3 renames its record `UnderOpeningRow` (table `tables/under/openings.json` unchanged), and every
use follows: V04 §1.2, §1b.1, §2.3's table, §3.1 (T2b), §3.3 P7, §3.5.7 (e), §4.1; II.7.6's `AccessPassStrategy` signature
(`openings: UnderOpeningRow[]`) and its comment; V07 §1b (W46) and §3.16 (3) (iii); V06 §3.18's readers (the access
pass's tables, the public openings); V11's registry row (`under.openings`) and §3.23.7.

### VAL-09 — major — DISAGREE — owner V04
**Claim.** V04 §3.1 *At every rung* gives the tail at THORP, HAMLET and VILLAGE as "T2 (ruin and cavern only —
catacombs, quarries, vaults and the buried town keep TOWN and above — and the vaults step for the arch vaults and terminal
cistern of a raised way …), T2b, T3's F6 only, T5 (L3, L5, L7), T6 and T8". V04 §3.5.1 (10) lays, below TOWN, a dossier
catacomb record's charnel vault (one `ossuary` chamber of the `dug` system, `W_CATACOMB_BELOW_TOWN`) — a run of U-SYS's
catacomb step at a village rung — and V07 §3.16 (1), registering "the village subset V04 §3.1 names", adds "T2's catacomb
step run for a dossier catacomb fact alone, which lays V07 §2.4's charnel vault". The subset V07 points at omits the step
V07 adds.
**Required change.** V04 §3.1 *At every rung* reads "T2 (ruin and cavern — catacombs, quarries, vaults and the buried town
keep TOWN and above —, the vaults step for the arch vaults and terminal cistern of a raised way, and the catacomb step for
a dossier catacomb record alone, which lays its charnel vault (V04 §3.5.1 (10))), T2b, …".

### VAL-10 — major — DISAGREE — owner V07
**Claim.** V07 §3.16 (3) restates V04 §3.5.7's access rules with different rules. (i) Dig from above: V07 — "Every village
building standing over a chamber or gallery within `DigRule.reachM` … of its footprint's floor … draws once, when it is
built"; V04 §3.5.7 (d) — every building whose footprint overlaps an element whose top lies below its dig floor, or whose
basement ring lies within `DigRule.planReachM` of one, with `depthFactor` 1 to `reachM`, decaying by `decayM` to 0 at `maxM`,
and "the draw is compared at every derivation … one not yet made appears when the building's chance later rises above its
draw". (iii) Public openings: V07 lists sinkhole, mouth, collapsed shaft, ruin entrance; V04 §3.5.7 (e) also lays a
`skylight` (a `mouth` of role `light`) and bounds the collapsed shaft at cover ≤ 15 m. Read as written, V07 seals voids
beyond `reachM` and never revisits a draw.
**Required change.** V07 §3.16 (3) (i)–(iii) state the village's rows and readings only and cite the rules: "(i) Dug
from above — V04 §3.5.7 (d)'s draw, at every village building, with the village classes' `DigRule.classRow` rows below";
"(ii) Wells — V04 §3.5.7 (f)"; "(iii) Public openings — V04 §3.5.7 (e)'s candidates and `OpeningRow` chances (a sinkhole
under a field, the green or a common; a cave mouth; a skylight; a collapsed shaft under a field face or the green; a ruin
entrance at its marker)"; the restated eligibility ("within `DigRule.reachM`") and timing ("when it is built") are
dropped.

### VAL-11 — major — DUPLICATE-HOME — owner V07
**Claim.** The measures of `dist.centre`, `dist.gate`, `dist.market` and `dist.harbour` at the rungs whose `frameLaw` is
`territory` (file f item 576 (b)) are written in full twice: model §2.5 (*At the rungs whose `RungProfile.frameLaw` is
`territory`* … the heart, the palisade's gates else the perimeter crossings, the principal market rank else the first
nucleus's open space else the heart, the wharf's `quay` way else absent) and V07 §2.4's *profile and authored rows*
paragraph (the same four measures restated). The base is the context vector's home (principle (1); the contract's home
model §2.5).
**Required change.** V07 §2.4 replaces the four measuring clauses by "At village rungs `nearCentre`, `nearGate`, `nearMarket`
and `nearHarbour` read `dist.centre`, `.gate`, `.market` and `.harbour` as §2.5 measures them at territory rungs (item 576
(b))", keeping its own rule "a class row's 'at a port' reads 'a wharf is laid' — a row with no such form, finding no
harbour, takes the base's closest option, reported (J-V7.111)".

### VAL-12 — major — MATRIX-GAP — owner pipeline
**Claim.** Missed shared subject: the `raised` data key and its record. §4.1 publishes the key from the base's declaration
layer at M3a (file f item 290 (4): BASE) — "the ground arena's parts from 1 … read as one data key … so a product's stage
may declare it as an input" — and types it only by "V07 §2.7's `RaisedRead`"; §4.12's `DataKey` comment lists `'raised'`.
The record is declared only in V07 §2.7, a volume built at V-M1, so the base's own key has no base declaration (MC-11's
rule: every type a base mechanism uses is declared in the base; canon S3). Verdict: home inverted; the shapes also
disagree (VAL-13).
**Required change.** §4.1 (beside *The `raised` key*) declares `RaisedRead` as a derived view over `RaisedWayRecord` (§2.7)
— the way, its kind, `origin` (derived), `reason?: RaisedReasonKey`, the deck strip, the supports with their keys and
`state`, the two feet (once VK0-05/06's feet are in §2.2/§2.7), the spans `{ a; b; state }` with `'standing'` for an
absent state, an aqueduct's channel — and V07 §2.7 cites it ("`RaisedRead` is §4.1's").

### VAL-13 — major — DISAGREE — owner V07
**Claim.** V07 §2.7's `RaisedRead` disagrees with `RaisedWayRecord` (§2.7), the record it reads: its spans are keyed
`{ from; to; state }` where the base keys a span by `a`, `b` (the bounding piers' keys) and `DeclineOp`'s `SpanRef` by
`from`/`to` support ordinals; its `supports: PolygonCm[]` drops each support's key and `state?: 'ruined'|'cleared'`
(V06's decline, BCR-V6-26); its `reason?: string` is the base's `RaisedReasonKey`. V07 §3.5a (3)–(6) then treat every
support as an obstacle (turning trackers), as a hole in fields and closes, and as a stretch the palisade abuts — so a
pier V06 has `cleared` (taken down, stone credited) still blocks the village.
**Required change.** V07 §2.7 (or §4.1 once VAL-12 lands) types `supports: { key: number; ring: PolygonCm; state?:
'ruined'|'cleared' }[]`, `spans: { a: number; b: number; state: 'standing'|'ruined'|'cleared' }[]` and `reason?:
RaisedReasonKey`; V07 §3.5a (3), (4), (5) and (6) read "a support whose `state` is absent or `ruined`" (a `cleared` support
is neither an obstacle nor a hole nor a stretch the palisade abuts).

### VAL-14 — major — DISAGREE — owner pipeline
**Claim.** V07 §3.9 (1) puts the village land budget in "the farm table's village rows (§4.9's `FarmTable` at the village
rungs)": arable 1.2 ha per head, **meadow 0.15, pasture and commons 0.6**, fuel and timber by the base's law — summed into
the territory's 2.275 ha per head (E-38: "derived as the sum of the FarmTable village rows"; V07 §2.2, V12's register).
§4.9's `FarmTable { arableHaPerCapita, householdsPerFarmstead, fieldHaPerFarmstead, fuelM3PerCapitaYear,
timberM3PerCapitaYear, coppiceM3PerHaYear, woodM3PerHaYear, extent, reserveArable }` has no meadow or pasture-and-commons
column, so two of the five summed cells have no home and E-38's derived sum cannot be computed from the table.
**Required change.** §4.9's `FarmTable` gains `meadowHaPerCapita` and `pastureHaPerCapita` (the pasture and commons per
head; read at the territory rungs by V07 §3.2 (1)'s land law and §3.9 (1); at base rungs by §4.9's hinterland presets as
they stand), the village rows' values staying as E-38 places them (V07 §3.9 (1): 0.15 and 0.6; V12's register holding the
farm rows); V07 §3.9 (1) names the two cells.

### VAL-15 — major — MATRIX-GAP — owner pipeline
**Claim.** Missed shared subject: `PlanForm`. §4.9's `FarmModeRow { …; form?: PlanForm /* read only at village rungs */;
… }` uses a type declared only at V07 §2.2 (`type PlanForm = 'grown'|'street'|'green'|'nucleated'|'polyfocal'|'row'|
'dispersed'`), with no pointer; the matrix lists `FarmModeRow` but not `PlanForm`. Verdict: the values agree (V07 §3.2 (3)
maps the forms to `perimeter` and `fill`), the base names no home.
**Required change.** §4.9's `FarmModeRow` comment reads `form?: PlanForm /* V07 §2.2's plan forms; read only at village
rungs (V07 §3.2 (3)) */` — or, under MC-11's rule, `PlanForm` is declared in §4.9 beside the row and V07 §2.2 cites it.

### VAL-16 — major — DISAGREE — owner V07
**Claim.** V07 §1 *Out of scope*: "Floating islands (none reaches a village rung: §4.11 fells an island when the CITY band
is left, and TOWN holds none)". §4.11 (*Islands and the underground over epochs*: an island whose settlement falls below
the CITY band "wanes, settles after its dwell band and falls"), II.6 (6), V05 §3.15 (6) ("A rung crossing downward makes
every island's target 0: they wane, settle and fall over their dwells, never in one epoch") and V07's own §3.12 ("An
island still waning or settled when the fold gives the village product continues V05's steps") say an island can stand
over a village for its dwell spans.
**Required change.** V07 §1 reads "Floating islands are V05's: no new island arises at a village rung (`layers.islands`
`none`), and an island a fallen city leaves wanes, settles and falls over its dwells at whatever rung (V05 §3.15 (6); V07
§3.12), the village phases reading none".

### VAL-17 — major — DISAGREE — owner V05
**Claim.** V05 §5.1 *Sheets*: "every shipped sheet (`ink`, `lit`, `hatched`, `night` and the parity presets, which carry the
rows though their recipes hold islands off) resolves every sky semantic, so the loader never refuses one". §8.2's presets
table ships `parchment` and `bw-print` beside `night` as ink-family variants at M3b (RIC-01) and lists `painterly` (built by
V07 at V-M1, a family at all four bands); none of the three is in V05's list, so their sheets are not required to carry
`sky.island.*`, `sky.access.*`, `sky.fall`, `sky.mist` or the role `sky.ground`, and a sheet lacking a semantic is refused.
**Required change.** V05 §5.1 reads "every shipped sheet — §8.2's presets table: `ink`, `lit`, `hatched`, the ink-family
variants `parchment`, `bw-print` and `night`, `painterly` once V07 ships it, and the parity presets … — resolves every sky
semantic"; the per-family table gives `parchment` and `bw-print` their `ink` rows and `painterly` its land, rim and access
rows.

### VAL-18 — major — DISAGREE — owner rendering
**Claim.** §9.1 declares `QuarterNode` "built by S6 (§4.5), named by S13a" (model §2.5: "§9.1's QuarterNode merge tree,
built by S6 (§4.5)"; §4.5: "After typing, S6 builds §9.1's quarter merge tree … once"), and its *What the tree holds* lists
the undercity leaves and the sewer's pseudo-district but no sky island. V05 §3.14 and V05 §1b make each island "the root
of its own `QuarterNode` (members its districts, `cityCut` true), named with the island's name", produced by S13a after the
unit run — districts S6 never sees. The island node's producer is named only in the volume, against the home's "built by
S6".
**Required change.** §9.1's comment reads "built by S6 (§4.5) — a sky island's root node by S13a over the island's
districts after its unit run (V05 §3.14) —, named by S13a"; *What the tree holds* adds "each sky island is a root of its
own, its members the island's districts, `cityCut` true (V05 §3.14)"; model §2.5's quarters comment follows.

### VAL-19 — major — DISAGREE — owner rendering
**Claim.** §8.2's states table, chamber row ("its `Chamber.kind` … replace: `chamber` with the kind's fill — `ossuary` …,
`workings` …, `cistern` in `water`, `streetVault` and `bridgeVault` the `vault` hatch, `storey` and `square` …, `cellar` and
`storage` as `dug`, the ruin's kinds by `ruinMasonry` …") omits `archVault` and `market`. V04 §5.2 *Chamber fill by kind*
states "§8.2's chamber row is keyed by `Chamber.kind`: `streetVault`, `bridgeVault` and `archVault` with the `vault` hatch
(an arch vault in the shallowest band, its floor at grade; its door a daylight opening) … `market` as the undercity's
plaza". By §8.2 an arch vault draws as a plain `chamber` floor; by V04 with the vault hatch.
**Required change.** §8.2's chamber row adds "`archVault` the `vault` hatch (its floor at grade, its door a daylight
opening; V04 §5.2) and `market` as the undercity's plaza (the ring walkway and stalls, V04 §5.2)".

### VAL-20 — major — DISAGREE — owner model
**Claim.** §2.5 types `ContextVector.dist.wall: M` (always a distance; `harbour?: M` is the one optional member). V05 §3.11
writes, on an island, "`dist.wall` to an author's island wall (V05 §3.21), else none"; an unwalled TOWN and a village with
no palisade have no wall either, and §2.5 states no value for them. A reader of V11's `wall` and `wallInner` rows (V11
§3.3.3) gets a number by §2.5's type and no target by V05.
**Required change.** §2.5 types `wall?: M` "absent where the settlement (or a sky island) has no enceinte; a `wall` or
`wallInner` row then finds no target, as a `harbour` row does where no harbour exists"; V05 §3.11's "else none" reads "else
absent (§2.5)".

### VAL-21 — major — DISAGREE — owner V09
**Claim.** Hand-off XV-V9-8 is closed at its destinations differently from what V09 states. V09 §8: AP6 and AP7 "are priced
with their own staged milestones — V04's M6-U, V05's P4 … outside the base total, as those engines are (V04 §8, V05 §8,
V10 §8 and V02 §8 carry them)". V04 §8: "V09's application share of the layer (AP6) lands with M6-U, priced in §16's row
for V09's staged screens, outside this total"; V05 §8: "V09's AP7 … priced in §16's line of the application's staged
screens, outside this total (XV-V9-8)"; §16 carries that row ("the application's staged screens (V09: AP6 with M6-U, AP7
with M6-sky, …) 2.75–4.25 pw"). V09 says V04 §8 and V05 §8 carry the price; they say §16's V09 row does.
**Required change.** V09 §8 reads "… are built with their staged milestones — V04's M6-U, V05's P4, V10's M3c and V02's M6c
— and priced in §16's row for the application's staged screens (2.75–4.25 pw), outside the base total and outside those
volumes' totals"; the XV-V9-8 row in V09's records points at V04 §8, V05 §8 and §16's row.

## Size

This report adds no design text. The members' sizes are the rewrite and verifier records' (rewrite-*.md,
verify-*-r0s.md).
