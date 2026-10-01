# Verify — coherence pass, round 2: PIPELINE part (§4, §10, PART II, PART III) after repair round 2

> Opus verifier, seat coherence/verify-pipeline-r2t (cloud checkout, 2026-10-01). Design files untouched.

PROGRESS (lane `coherence/verify-pipeline-r2t`, 2026-10-01)
- P0 resume check: no output and no LANDED line, so this is a fresh start. Done.
- P1 Read in full:
  - the brief;
  - adjudication-r2: its TOC, every ruling binding pipeline (R2-05, R2-12 – R2-14, R2-18, R2-22, R2-25 – R2-28, R2-31, R2-36, R2-37, R2-40), the rest of Parts B–G, Part H · pipeline, and the rows of my round-1 ids under other units;
  - repair-r2-pipeline's header (its dispositions, judgment calls and hand-offs);
  - assemble-r2's hashes.
  Done.
- P2 Split the pre-round text (HEAD 682e8e99, sha 137ecc0e…) and the live text (4ed292e9…) by subsection. Exactly the 18 subsections the 18 pipeline REPLACE blocks name have changed; no other unit's block lands in this part. Word diffs read whole. Done.
- P3 Re-checked the 29 round-1 findings on the live base and volumes. Done.
- P4 Read every changed subsection's changes in context. Resolved the references they add, checked ids, retired terms, deferral wording and phone clauses, and the wiring and agreement with the sibling units' round-2 parts. Done.
- P5 Checked owner items 122, 122 (h)–(i) and 125 in this part as new design, against file g, the canon's routing and R2-36, R2-37 and R2-40. Done.
- P6 Ran the doc checks (provisional), then wrote this report, the result file and the LANDED line. Done.

## Scope and method

Repair round 2's pipeline file holds 18 REPLACE blocks. They cover §4.1–§4.8, §4.11, §4.13, §10.2, §10.3, II.1, II.6, II.7.2, II.7.4,
II.7.6 and PART III. assemble-r2 applied all 18: 0 skipped, no merge, no RULING REQUEST. Each applied block equals the pipeline seat's
recorded dry run, and the base's assembled output matches scope's combined dry run (assemble-r2 §2). Untouched subsections keep their
earlier verdicts: the §4 and §10 leads, §4.9, §4.10, §4.12, §10.1, §10.4, PART II's lead, II.2–II.5, II.7's lead, II.7.1, II.7.3 and
II.7.5.

How the changes were checked:
- Each changed subsection was diffed word by word against the pre-round text, and every change was read in its paragraph.
- Each reference the new text makes was resolved, and its content checked at the target. Targets include V01 §3.6 (7), V04 §3.2
  N2/N3, V04 §1b.2 and §3.5.7, V06 §2.1, §3.5.1, §3.22 and §6.8, V07 §3.8a and §5.6, V08 §3.16 (3), (4), (7) and (8), and V11 §3.16.1,
  §3.23.1, §3.24.2, §3.25.4 and §3.25.9.
- The new design was compared with the sibling round-2 parts that share its subjects:
  - model §2.7 `ConditionOverlay`, and §2.9's `crises`, framing and week source;
  - determinism's DR41–DR44 and E-07;
  - rendering §8.2's crisis rows and `live.crises`;
  - V01's `campLand` and `disasterDistricts`, V06's `frontierFor` and `crisisLookYields`, V07 §5.6, V08 §3.16 (7)–(8), and V11
    §3.25.9 with registry rows 107 and 108.

**Size.** The covered text grew from 110 202 to 113 622 words (+3.1 %). The growth is new design:
- items 122 and 122 (h)–(i) in §10.2, with EP-27;
- item 125's clock;
- the edges this round defines: S3 (9)'s split, step regions, the cliff band and the no-route refusal.

The restatement cut this round is R2-14's one gloss of "specified" and §4.6's strip cell cited instead of stated. No subsection
shrank, so no nuance audit was due. The unit does not reach the shrink band. What holds it is owner-item content under principle
(9)'s guard.

## 1. Round-1 findings, re-checked on the live text

| id | owner | verdict | evidence (live line) |
|---|---|---|---|
| VPC-01 | pipeline | FIXED (R2-13) | §10.2 declares `GrandeurCeilingRow` and `GrandeurCeilingSettings` (l. 15005–15011). `RosterTables.grandeur` is `{ ceiling; settings }` (l. 14933), and the *Grandeur ceiling* bullet cites the shapes above (l. 15321). |
| VPC-R1-01 | V11 | **PARTLY FIXED — open** | §2.8d is now the comment citing §10.2 (V11 l. 775). Two V11 pointers still name §2.8d: §3.25.4's *settings* bullet (l. 4303) and §3.25's lead (l. 4146–4147). |
| G122-pipeline, G122h | pipeline | WRITTEN (R2-37 (3)) | §10.2 *Crisis looks* (a)–(i), the shapes (l. 15012–15027) and EP-27. New problems: §2 below. |
| VPC-R1-02 | pipeline | FIXED (with VEW-r1-01) | S3 (4) defines the approachable arcs. S3 (9) splits into (a), unwalled, and (b), walled on its parapet or light-wall arcs with one gate. S3 (7) admits (b)'s gate. EP-21's fixtures are written. A new ambiguity followed in S5a: VPC-R2-04. |
| VPC-R1-03 | pipeline | FIXED (R2-27 (c)) | §4.11's walls ladder names `worn` and `patched`. |
| VPC-R1-04 – 07 | pipeline, V06, V07, V11 | FIXED (R2-12) | No V04-sense `OpeningRow` is left in the set. II.7.6 declares `AccessPassStrategy` as V04 builds it (l. 21286–21289), and V04 l. 323 matches. |
| VPC-R1-08 | pipeline | FIXED (R2-28 (b)) | II.7.4 l. 20853 has `accessForecastMin` 0.5. |
| VPC-R1-09 | pipeline | FIXED | "TypedBoundary §2.5's" (l. 20135). |
| VPC-R1-10, VPC-R1-12 | model | FIXED | §2.9 holds only a comment for `OutlineTemplateId` (l. 3041). `type DistrictKind` is declared in §2.5 (l. 1141). |
| VPC-R1-11 | V01 | FIXED | V01 l. 408 cites §10.2's `SquareQuotaRow`. |
| VPC-R1-13 | pipeline | FIXED | §4.5 (3) cites the `brothel` row's rows at V11 §3.5, which hold them (V11 l. 1588). |
| VPC-R1-14, VPC-R1-15 | V11 | FIXED | No "(§10.2's example)" is left. Registry rows 13 and 81 carry the cells and readers (V11 l. 934, 1003). |
| VPC-R1-16 | pipeline | FIXED (R2-25 (b)) | II.7.2's per-bank text is in place. A remaining omission is a new finding: VPC-R2-08. |
| VPC-R1-17 | model | FIXED | `spring.flow` is ranged [0, 1] (l. 988). |
| VPC-R1-18 | pipeline | FIXED | "bank kind" in §4.8 (three sites); "hollow" in §4.11. |
| VPC-R1-19 | determinism | FIXED | F-CUT cites "§4.6 step 8's *Bars*" (l. 8960). |
| VPC-R1-20 | V06 | FIXED | V06 l. 614 and l. 926 cite §4.11's `EpochInputs`. |
| VPC-R1-21 | pipeline | FIXED (R2-26 (b)) | §4.3 (l. 5622–5625) and §4.13's river cell (l. 8823) carry the clear-span bound and the rung. |
| VPC-R1-22 | pipeline | FIXED | S11's exemption: "is not counted toward the cap … (item 101 R13)". |
| VPC-R1-23 | pipeline | FIXED | II.7.6 step 3's `E_NO_PATH` refusal (l. 21252–21256), tested by T66-2 (l. 17742–17747). E-07's row was not extended: VPC-R2-18. |
| VPC-R1-24 | pipeline | FIXED (R2-26 (d)) | §4.6 cites `raisedWays.structure.stripMarginM` (l. 6329). It stands in V11 §3.24.2 and registry row 80, and V01, V06 and V07 cite it. |
| VPC-R1-25 | pipeline | FIXED | EP-26 gains the TOWN fixture; the THORP fixture runs with V07 (l. 8812). |
| VPC-R1-26 | scope | FIXED (R2-20) | J-A113.61's index row and Part A row read `0x8000_0000 + r`. |
| VPC-R1-27 | pipeline | FIXED (R2-40 (1)) | §4.11 *The clock* (1)–(2): the dossier's latest stamped tick is the present week, the `HostContext.week` rung is gone, and `EpochInputs.week` follows. This agrees with model §2.9, DR42 and V08 §3.16 (4). |

The receiving ends Part H names for this unit are all written:
- R2-13: `Designation.use` and `PlacementItem.cls` are `BuildingClass`.
- R2-26 (c): the wall cell.
- R2-27 (a): the welded stretch.
- R2-31 (a): the coarsened catch-up.
- R2-28 (a): the mining test stated once.

R2-18 (a)'s exception is written at §4.11 step (c), `LadderOp.relet` and the strike pool. Its V06 end disagrees: VPC-R2-07.

## 2. Open issues: 19 (4 major, 15 minor)

| owner | count |
|---|---:|
| pipeline | 10 |
| V11 | 3 |
| determinism | 2 |
| V08, V01, V06, rendering | 1 each |

**Majors**

- **VPC-R2-01 (CONFLICT, pipeline).** §10.2 *Crisis looks* (b) (l. 15358) reads "the regional_* pressures are `none`".
  - Owner rule 122 (b) draws mass immigration, from `regional_migration_pressure` and `REFUGEE_WAVE`, as the refugee camp.
  - V11 §3.25.9 maps `regional_migration_pressure` → `refugeeCamp` (l. 4559).
  - The base rule sends the owner's look to `none`.
- **VPC-R2-02 (CONFLICT, determinism).** DR44 (l. 11896) has the same clause.
- **VPC-R2-03 (WIRING, V08).** The disaster look has no source from a dossier.
  - Only V11's `event` row `calamity` maps to `disaster`.
  - V08 §3.16 (7) (b) sets an overlay's `event` only to a census word from `triggeredAt.sourceEventType`, and the census holds
    `PLAGUE`, `REFUGEE_WAVE` and `RAID_OR_MONSTER_ATTACK`.
  - No unit makes an overlay of `event` `calamity`, so a dossier calamity never draws ruined neighbourhoods.
  - V08 (d) and T-V6-75 nonetheless presuppose such an overlay.
- **VPC-R2-06 (EDGE-UNDEFINED, V11).** §4.7's step regions guarantee only that each intermediate wall retains more than
  `stepMaxCm` ÷ 2. T-V11-32 (a) lets `stepMinCm` lie above that: with `skirtMaxCm` 300, a `stepMinCm` of 250 is lawful. A wall then
  falls below `stepMinCm`, against §4.7's own plinth rule and EP-24's bar. The repair's hand-off to V11 was not applied.

**Minors**

The base, this unit:
- **VPC-R2-04.** S5a step 1's "impassable to routes as the wall is" is unscoped, against S3 (9) (a)'s unwalled stage.
- **VPC-R2-08.** II.7.2 omits V04 N2's empty-stretch bank.
- **VPC-R2-09.** §10.2 (f) ends the disaster look as a whole, against V06 §3.22 (3)'s per-building `crisisLookYields` (J-V6.138).
- **VPC-R2-11.** §10.2's crisis looks land at M3b. They read V01's `disasterDistricts` (M5) and V06's `frontierFor` (M6-E) with no
  outcome stated before those milestones.
- **VPC-R2-12.** `CrisisLookRow` lacks the `label` and `icon?` cells that V11's rows carry and that Find and the legend read.
- **VPC-R2-14.** (c)'s "each army its own camp" and (d)'s `approachRoads` "one camp per road" disagree when forces are given. With
  none given, how the camped ground divides among the roads is unstated.
- **VPC-R2-15.** S1 (10)'s mining test reads `under.systems`' cavern cell from M1, with no outcome while the row is absent.
- **VPC-R2-16.** §4.7's supply web names "the realm block's" bearing, a source item 125 retired.
- **VPC-R2-17.** Four unnumbered derivation-row citations remain against R2-11: "season derivation row" → DR42, "condition row" →
  DR41.

Other units:
- **VPC-R1-01 (V11).** The stale §2.8d pointers.
- **VPC-R2-05 (V01).** V01 §3.6 (7) does not read §4.6's cliff-band edges.
- **VPC-R2-07 (V06).** V06 §3.5.1 (5) lets any fall relet a protected dwelling to 0. R2-18 (a) words the exception for a dossier fall
  only.
- **VPC-R2-10 (rendering).** §8.2's disaster ending and `live.crises`' inputs: the same per-building hand-over, and
  `crisisLookYields` unnamed.
- **VPC-R2-13 (V11).** W77 and §2.3's display-cell list omit the crisis looks.
- **VPC-R2-18 (determinism).** E-07's `addUndergroundAccess` row lacks II.7.6's no-route refusal and its key.

Each issue's exact required change is in `results/coherence_verify-pipeline-r2t.json`.

## 3. Owner items in this part

| item | routed to pipeline | verdict |
|---|---|---|
| 122 (J135): §10.2's crisis look table — kinds by archetype, scale by severity and tier, placement rules and priorities, the density cap | yes | WRITTEN at build depth (a)–(i). It agrees with model §2.9, §8.2, V01, V06, V07, V08 §3.16 (7)–(8) and V11 §3.25.9 (shapes, values, milestones M3b and M-SF), except VPC-R2-01, -02, -03, -09, -10, -11, -12 and -14 |
| 122 (h)–(i) (J138): area per head, engine rate, coalition spread | yes | WRITTEN: (c), (f) and (g), and the `settings` row's `areaPerHeadM2` and `enginesPerBesiegers`; V11 holds 45 m² and 1 500 |
| 125 (J139): §4.11 *The clock* (1)–(2), `EpochInputs.week` | yes (routing completed) | WRITTEN. The host-week rung is gone, and §10.2's custom-definition rung (5) reads "only through the dossier". One stale realm-block source remains: VPC-R2-16 |
| 114–119 | as routed in round 1 | Their parts in §4.1, §4.2, §4.8 and §10.2 are unchanged in substance this round, so their round-1 verdicts stand; the §4.8 welded-stretch addition is R2-27 (a) |
| 120, 121, 123, 124, 126 | no | Nothing is due. No phone clause appears in this part (item 126 (a2), R2-41) |

## 4. Checked and holding

- **References.** Every volume section the round-2 text cites resolves, and the content was checked at the targets listed under Scope.
  No bare `§` continues a volume list in this part. Seven base pointers appear in assemble-r2's ambiguous-form list; each is meant as
  the base's.
- **Ids.** EP-27 is unique and runs under B-EDGE. T20-15, T66-2, T122-1 – T122-7 and DR41 – DR44 resolve.
- **Terms.** None of "bank class", "retired way", "hall or similar", "TypedBoundary V01" or `HostContext` is left in this part.
- **Deferral wording.** None new. Every "later" in this part is temporal.
- **Agreements.** S3 (4) and (9) agree with V11 §3.16.1's rows (approachable = `open`, plus `shallowWater` at base kinds; closure
  features = wall `none`). §4.7's step regions agree with model §2.5's `platformSteps`. The week sentence agrees with model §2.9, DR42
  and V08 §3.16 (4). The relet exception agrees with §2.6's clamp and §5.3's row.

## 5. Document checks

`python3 docs/validation/bench/doc_checks.py --doc docs/ARCHITECTURE.md --allow docs/validation/doc-checks-allow.tsv` exits 0, with every
hit reviewed:

| check | hits | unreviewed |
|---|---:|---:|
| C1 | 5 | 0 |
| C2 | 1 | 0 |
| C3 | 1 677 | 0 |
| C4 | 6 | 0 |
| S1 | 0 | 0 |
| S2 | 208 | 0 |

The result is **provisional**. The tool warns: "reference corpus INCOMPLETE (missing: captures, research/patreon, research/devlogs,
research/ftg-docs, research/external) - clean-room results are NOT authoritative".

## CONFIRMED versus PLAUSIBLE

**CONFIRMED** (read in the live files, line numbers given):
- every verdict in §1;
- both sides of every open issue;
- the doc-check counts and the size figures.

**PLAUSIBLE:**
- *VPC-R2-03's SettlementForge side.* Whether the pinned line's calamity kernel raises a condition, and with which
  `sourceEventType`, was not read in its code. `research/sf` says only that a calamity writes "conditions". The finding rests on the
  design text as written: no unit writes `event` `calamity`. The required change uses the linked-condition rule of V08 (d); an
  equivalent source would close the gap as well.
- *VPC-R2-15's milestone.* `under.systems`' rows ship with the underground layer (V04 U3; V12 l. 2156), so the cavern row is absent
  before M6-U. V11 §8's per-table milestone was not traced line by line, but the outcome with the row absent is undefined either way.
