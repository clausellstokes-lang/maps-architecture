# Verify — coherence pass, round 1: PIPELINE part (§4, §10, PART II, PART III) after repair round 1

> Opus verifier, seat coherence/verify-pipeline-r1t (cloud checkout, 2026-10-01). Design files untouched.

PROGRESS (lane `coherence/verify-pipeline-r1t`, 2026-10-01)
- P0 resume check: no output and no LANDED line, so this is a fresh start. Done.
- P1 brief read whole; round-0 findings VPC-01..34 listed; assemble-r1 and repair-r1-pipeline read; canon dated rulings 114–124 read. Done.
- P2 pre-round text (HEAD 3f0e02b, sha 484af066…) and live text (137ecc0e…) split by subsection. Word diffs of all 34 in-scope subsections read whole. Done.
- P3 round-0 findings re-checked against the live text. Done.
- P4 new problems in the repaired subsections: every reference the added text makes was resolved, and its content checked at the target. Ids, retired terms, deferral wording and the hand-offs other units' repairs address to this part were also checked. Done.
- P5 G120–G124 routing for the pipeline unit. Done.
- P6 doc checks (provisional), report, result file, LANDED. Done.

## Scope and method

The pipeline repair's 26 REPLACE blocks cover §4.1–§4.9, §4.11–§4.13, §10.2, §10.4, II.1, II.2, II.4–II.7.6 and PART III. No other
unit's block targets this part. assemble-r1 applied all 26: 0 skipped, no merge, and no RULING REQUEST among them. Untouched: the
§4 and §10 leads, §4.10, §10.1, §10.3, PART II's lead, II.3 and II.7's lead; their earlier verdicts stand.

Method:
- Each subsection was diffed word by word against the pre-round text (`git show 3f0e02b:docs/ARCHITECTURE.md`), and every change was read in context.
- Every cited section, id and table cell in the added text (250 distinct references) was resolved, and its content checked where a value or rule is read.
- The added text was cross-checked against the round's volume repairs: V04, V05, V06, V07 and V11 changed under it concurrently.
- The other repairs' HAND-OFF notes addressed to this part were checked: model, kernel, V04, V06, V07, V11.

Size: the covered text grew from 101 399 to 107 019 words (+5.5 %, assemble-r1 §2). The growth is new design (items 115, 117–119, the
edge rows EP-20–EP-26) and restored text. No subsection shrank by half, so no nuance audit was triggered.

## 1. Round-0 findings (VPC-01..34), re-checked on the live text

| id | owner | verdict | evidence (live line) |
|---|---|---|---|
| VPC-01 | pipeline | **PARTLY FIXED — open** | The mechanism is written: S2's manor count (l. 5070), S10b class mix (3) (l. 6911 ff.), S11's dwelling caps (l. 6897), and §10.2 *Grandeur ceiling* (l. 14674). The table's SHAPE is cited at V11 §2.8d, not declared in §10.2, although item 115's HOMES and the canon (J127) home it there. V07 (l. 274, 1785) and V11 (registry row 97, §3.25.4) cite "§10.2's shape", which resolves to nothing. |
| VPC-02 | pipeline | FIXED | §4.2 S0 biome comment (l. 4800–4805); §4.9 *Species and climate*; §10.2 *Seasons*. All agree with V11 §2.8 `ClimateSeasonCells`. |
| VPC-03 | pipeline | FIXED | `RosterTables.festival`; §10.2 *Festival decorations*, whose shapes are V11 §2.8d's. |
| VPC-04 | pipeline | FIXED | §4.1 *The quality budget* (l. 4669–4677); `QualitySpendRow` matches V11 l. 769; R12-33 holds the register row. |
| VPC-05..10 | V06–V11 | FIXED | No "§4.2 S10b" remains anywhere in the set. |
| VPC-11 | pipeline | FIXED | §4.11 *What writes builtBand* restored. |
| VPC-12 | pipeline | FIXED | §10.2 *Quarter identities* and §4.5 (3) as required. A new break followed from the cut: VPC-R1-13. |
| VPC-13 | V11 | FIXED | V11 l. 2332 and 2357 cite §7.7 item 16. |
| VPC-14 | pipeline | FIXED | II.1 declares both interfaces (l. 19116 ff.). A new pointer slip: VPC-R1-09. |
| VPC-15 | pipeline | FIXED | "V07 §15" is gone. |
| VPC-16 | pipeline | FIXED | (a) `shadowPass`; (b) `SkyUnitInput` (V05 §2.3); (c) "standalone neighbourhood document's". |
| VPC-17 | pipeline | FIXED | §4.12 lists U-NET … U-LINK in V04 §3.1's order. |
| VPC-18 | pipeline | FIXED | §4.6 step 8's bars (l. 6314). §5.2's pointer to them has a slip: VPC-R1-19. |
| VPC-19 | pipeline | FIXED | (a) l. 5065; (b) II.4. |
| VPC-20, VPC-21 | pipeline | FIXED | II.6 (3), (5), (6) and the comment. |
| VPC-22 | pipeline | FIXED | (a) `EvolveOp` in the union, with members matching V06 l. 701; (b) `EpochInputs` gains `wealthLevel`, `advance` and `replay`, matching V06 (now declared twice: VPC-R1-20); (c) BCR-V6-18 appended. Its enumeration of placements ("at every tier, in its use step's openings and moves, or in a dossier-backed use's relocation") is condensed to "every placement that engine makes"; the cited home V06 §3.8.2 states it in full, so no nuance is lost from the set. A retired term came with it: VPC-R1-18. (d) BCR-V6-21 as written; (e) the departure matching. |
| VPC-23 | pipeline | FIXED | `floorMod`; EP-15 extended. §2.9's `yearWeek` + 1 = `CalendarRow`'s week reconciles 0–51 with 1–52. |
| VPC-24 | pipeline | FIXED | `garden` with `fedBy`; the grove names its body. |
| VPC-25 | pipeline | FIXED | S3 (6) `q(x)`; §4.5's water term; EP-14. The model's range for `flow` now contradicts it: VPC-R1-17. |
| VPC-26 | pipeline | FIXED | (a) S5a records `arcs` and `anchors[].end`; (b) `stretchClass`; (c) `Block.depthClass`. |
| VPC-27, VPC-28 | pipeline | FIXED | §4.5 (iv); §4.12 points to §14's declarations. |
| VPC-29 | pipeline | FIXED | `StageId` (l. 8543); `SubLocationRow` and `RosterSettings` in §10.2; `OpeningRow` is §2.6's. A name clash followed from V04's rename: VPC-R1-04. |
| VPC-30 | determinism | FIXED | `Invariant` (§5.3), `EntityKind` (§6.3), `EditId` (§7.1), `TableId` and `TableView` (§7.6). |
| VPC-31 | pipeline | FIXED | §4.8 *Condition at generation*; S3 and S5a lay the trace `standing`. Matches DR41 and V11 `WallConditionSettings`. |
| VPC-32, VPC-33, VPC-34 | pipeline | FIXED | The `DeclineOp` way member; `formerWall`; II.5's laws resolve at §12.5's *Neighbourhood band* and J-V1.34. |

No round-0 finding of this seat was answered by a RULING REQUEST, and none of its blocks was skipped.

## 2. New problems (r1 ids) and the owner items

There are **29 open issues**: VPC-01 (persisting, now minor), G122-pipeline and 27 new r1 findings.

| severity | count |
|---|---:|
| blocker | 0 |
| major | 4 |
| minor | 25 |

| owner | count |
|---|---:|
| pipeline | 16 |
| V11 | 4 |
| model | 3 |
| V06 | 2 |
| V07 | 1 |
| V01 | 1 |
| determinism | 1 |
| scope | 1 |

**Majors:**

- **G122-pipeline (F-MISSING).** Item 122 (J135) routes "§10.2 (the crisis look table: kinds by archetype, scale by severity and tier, placement rules and priorities, the density cap)" to this unit. The part has no occurrence of a crisis look, as expected: no round-1 repair carried it. The later ruling J138 (item 122 (h)–(i), committed during this run) adds to the same §10.2 part the area per head (45 m²), the engine rate (one per 1 500 besiegers) and the coalition's spread round the town; the finding's required change includes them.
- **VPC-R1-02 (CONFLICT).** The new closed-arc rules — §4.2 S3 (4), (7), (9) and §4.4 S5a — say "every arc closes → the stage walls nothing, no `Enceinte`".
  - They count a `cliff`, a `marsh` (and a steep slope, by §4.4's table) as closing barriers.
  - V11 §3.16.1, §4.8 *Graded by stretch* and §4.4 step 1 itself wall those closing arcs with a parapet or a light wall. Only `sheerCliff`, `deepWater` and `gorge` close with no wall.
  - So a cliff-ringed mesa below the sheer test gets "no wall, no gate" by (9) and a parapet by §4.8. A walled ring of closing arcs also has no gate, since picks fall only on approachable arcs.
- **VPC-R1-27 (CONFLICT, owner rule 125).** §4.11 *The clock* still takes a dossier-bound map's week from the campaign's `calendar.elapsedWeeks` through `HostContext.week`: (1)'s creation week, (2)'s last dating rung and `EpochInputs.week`'s comment. Item 125 (J139, filed during this run) retires `HostContext.week` as an input; the week comes from the dossier's own stamped ticks. J139 routes no pipeline part, so the base's one statement of the map's clock contradicts the owner rule. The canon's routing should add pipeline §4.11.
- **VPC-R1-23 (EDGE-UNDEFINED).** II.7.6's access-edit connector (step 3) defines a route longer than 2 × `digReachM` but not the path search's `E_NO_PATH`, for example a basement ring enclosed by neighbours' footprints. The kernel repair recorded this observation.

**Minors (pipeline):**
- VPC-R1-03: §4.11's walls ladder says `decayed` "while any run is not standing: … `breached` or `dismantled`", naming only the pre-114 values. The model's §2.7 (l. 2428) makes `worn` and `patched` runs count too. This is the model repair's hand-off, not closed.
- VPC-R1-04: II.7.6 `OpeningRow` against V04's `UnderOpeningRow`.
- VPC-R1-08: II.7.4 lacks `accessForecastMin`'s 0.5, which V04 cites as II.7.4's.
- VPC-R1-09: II.1 says "TypedBoundary V01 §2.5's"; it is the base's §2.5.
- VPC-R1-13: §4.5 (3) cites "§10.2's brothel rows", which the §10.2 cut removed.
- VPC-R1-16: II.7.2 gives one field outfall per settlement; V04 N2 gives one per bank.
- VPC-R1-18: terms "bank class is `quay`" and "retired way".
- VPC-R1-21: §4.3 and §4.13 omit §2.7's clear-span bound.
- VPC-R1-22: S11's exemption omits "not counted toward the cap" (V11's hand-off).
- VPC-R1-24: S8 reads V01's `hood.constants` cell from M3a, before V01's M5 ships its rows.
- VPC-R1-25: EP-26's only fixture needs V07.

**Minors (other units):**
- VPC-R1-01 (V11): §2.8d declares the grandeur shape, which item 115 homes at §10.2.
- VPC-R1-05 (V06), VPC-R1-06 (V07), VPC-R1-07 (V11): stale `OpeningRow` after V04's rename.
- VPC-R1-10 (model): `OutlineTemplateId` is declared twice, as `string` with "D-shape" and as a union with `d_shape`.
- VPC-R1-11 (V01): `SquareQuotaRow` is declared twice.
- VPC-R1-12 (model): `DistrictKind` is declared nowhere.
- VPC-R1-14 (V11): "(§10.2's example)" annotations point at examples §10.2 no longer holds.
- VPC-R1-15 (V11): registry rows 13 and 81 lack the cells and readers pipeline r1 added.
- VPC-R1-17 (model): `spring.flow` is ranged (0, 1], but V06 sets 0.
- VPC-R1-19 (determinism): §5.2 F-CUT cites "§4.6 step 8 (a)'s bars"; the bars are step 8's.
- VPC-R1-20 (V06): `EpochInputs` fields are declared twice.
- VPC-R1-26 (scope): J-A113.61 still says `0x8000 + r` (u16) against §6.1's `0x8000_0000 + r`.

Exact required changes are in the result file, `results/coherence_verify-pipeline-r1t.json`.

**Routing of items 120–124 for this unit:**

| item | routed to pipeline? | finding |
|---|---|---|
| 120 (J133) | no | none |
| 121 (J134) | no | none |
| 122 (J135; (h)–(i) J138) | yes, §10.2 | G122-pipeline |
| 125 (J139) | no | none (but §4.11 contradicts it: VPC-R1-27) |
| 123 (J136) | no | none |
| 124 (J137) | no | none |

On item 124: when V11 adds the climate row's weather columns, §4.2 S0's and §10.2's statement that the climate row's look columns are "read only by …" should name them too. Nothing is required of this unit now.

**Checked and holding:**
- References: every volume section the added text cites resolves (67 distinct), and so do T-V11-41..44, T-V4-2, T-V4-35, J-V1.3, J-V1.34, J-V3.28, J-V6.129, J-VI.6 and J-A20.71/J-A72.51.
- Ids: EP-20..EP-26 are unique across the set.
- Class mix renumbering: V02 cites the new "(3)".
- Cut content: the placement-row values cut from §10.2 all stand in V11 §3.5, and the crypt meanings cut from §10.2 stand in V11 §2.3.
- Deferral wording: none new.
- Retired terms: only the G-hollow hit (VPC-R1-18). The G-standalone hits are a pattern artefact on "standalone neighbourhood document"; the `hand-over` hits keep the reservation sense.

## 3. Document checks

`python3 docs/validation/bench/doc_checks.py --doc docs/ARCHITECTURE.md --allow docs/validation/doc-checks-allow.tsv` exits 0 with every
hit reviewed:

| check | hits | unreviewed |
|---|---:|---:|
| C1 | 5 | 0 |
| C2 | 1 | 0 |
| C3 | 1 657 | 0 |
| C4 | 6 | 0 |
| S1 | 0 | 0 |
| S2 | 183 | 0 |

The result is **provisional**: the tool warns "reference corpus INCOMPLETE (missing: captures, research/patreon, research/devlogs,
research/ftg-docs, research/external) — clean-room results are NOT authoritative".

## CONFIRMED versus PLAUSIBLE

CONFIRMED (read in the live files):
- every verdict in §1;
- every new finding's two sides (line numbers given in the result file);
- the doc-check counts.

PLAUSIBLE:
- VPC-R1-24's milestone timing. It rests on V11 §2.1's empty-table rule and §4.13's "M3a … stage 2 unregistered" fixture; V11 §8's per-table milestone for `hood.constants`' settings row was not traced line by line.
