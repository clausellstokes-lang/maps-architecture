# Verify — coherence pass, round 1: base part §2 (domain model and schemas), after repair round 1

> PENDING FABLE REVIEW — written by opus as the seat coherence/verify-model-r1t (verifier).

PROGRESS (lane `coherence/verify-model-r1t`, 2026-10-01, cloud checkout)
- P0 resume check (no LANDED line, no report): fresh start — done
- P1 brief read whole; live base sha256 `137ecc0e…` (assemble-r1's output); pre-repair §2 from HEAD `3f0e02b2` (`484af066…`); §2 diff: 74 hunks — done
- P2 round-0 findings VM-R0S-01..37 re-checked against the live text — done
- P3 the nine replaced subsections §2.1–§2.9: every changed hunk read in its whole paragraph or record, with its counterparts in the other units — done
- P4 owner items 114–124 (G114/G117/G118 re-checked; G120–G124 routing for model) — done
- P5 report, result file, LANDED — done

## Outcome

**22 issues** — 0 blocker, 10 major, 12 minor; owners: model 9, scope 3, V01 2, V06 2, V02 1, V08 1, V09 1, V10 1,
pipeline 1, determinism 1. Of the 37 round-0 findings, **35 are fixed** in the live text and **2 persist in part**
(VM-R0S-14: the stretch-state write is now defined but untested — scope; VM-R0S-17: §2.5 and §4.12 fixed, §14's comment
not — scope). The repair made **16 new problems** (VM-R1T-01 … 16), nearly all where a parallel repair did not carry the
model's hand-off or carried an older copy: a type declared twice in the base (`OutlineTemplateId`, §2.9 vs §4.2 S1 (2), open
vs closed), records now declared in §2 still declared in their volumes (`HoodRecipe` in V01; `DormerRow`, `DormerKind`,
`TierLay`, `LaidWing` in V02; `Use.strain` in V06; item 113's `HistoryHint` fields in V08), the new clear-span bound not
followed by §4.3 / §4.13 / V06 and untested in §13.2, the standalone history option's record shape (the model's own
definition, V09 and V10), two stale volume citations in §5.3 and §6.1, a one-ended reader claim, a type-name unification
left half done, and §2.9's `HoodRecipe` restating V01's calibratable cells. Owner items: the model's parts of 114, 117 and
118 are now written at build depth (round-0 F-MISSING VM-R0S-03/04/05 closed); the parts of **120, 122, 123 and 124 are
absent** (G120-model, G122-model, G123-model, G124-model; expected — the repair began before their filing); item 121 names
no model part. No nuance was lost (§2 grew; every removed phrase traced to its home, §3). Words over `## §2` (whitespace
split): **53 256 → 57 534 (+8.0 %)**. `doc_checks.py --sections 2`: exit 0 — C1 5/0, C2 1/0, C3 389/0, C4 1/0, S1 0/0,
S2 183/0 — **PROVISIONAL** (the tool's warning: reference corpus incomplete in this checkout — captures, research/patreon,
research/devlogs, research/ftg-docs, research/external).

Not raised here, by the orchestrator's note of 04:31: item 122 (h)–(i)'s model part (§2.9's default framing and widened
limit while a look stands) and item 125's (§2.9's week source) — filed after this brief was read; the seam and edge checks
or round 2's sweep raise them.

## 1. Inputs and method

* Live text: `docs/ARCHITECTURE.md` sha256 `137ecc0e4fe12c44…` (assemble-r1's install); the model unit's nine REPLACE blocks
  (§2.1–§2.9, `repair-r1-model.md`, 79 substitutions) are the only blocks into §2 (assemble-r1 §2; audit not-OK 0).
* Pre-repair text: HEAD `3f0e02b2d7b9` (`484af066…`, the text the repairs were written against). `## §2` extracted from both
  and diffed by line and by word (74 hunks); each hunk read in its whole record or paragraph and checked against its
  counterparts in the other units (base §3–§16 and the volumes as installed); every round-0 finding re-read at its location,
  whatever its owner.
* The repair's own record read whole: its preamble (issues → where fixed, decisions D1–D8, the cross-unit hand-offs) — every
  hand-off checked at its destination; seven were not carried (§3).
* Canon: `canon.md`'s dated rulings for items 114–124; `docs/AMENDMENTS-2026-09-28g.md` items 114–124 read in full for the
  model's parts.
* Retired terms: canon.json's glossary patterns over live §2 — no new hit (G-lot's two hits are the definition sentence and
  FTG's quoted "around stage lots", as in round 0; "Removals that hold" gone from the base; the G-standalone hits are the
  canonical "standalone neighbourhood document"; G-unitinput's "hand-over instance / class" is the kept reservation-passing
  sense). No request, critique or rewrite id (BCR-, V1C-, J-S23.2, VD2-) and no narration or deferral wording in §2.

## 2. Round-0 findings — verdicts

| id | owner (r0) | verdict | where / note |
|---|---|---|---|
| VM-R0S-01 | model | FIXED | §2.6 rule 4: the core mix (55/25/18/2 %), 450 buildings, the 150 m brush ≈ 7 ha restored; §12.6 keeps 0.4 / 3.6 ms |
| VM-R0S-02 | model | FIXED | §2.7 `waterfront`: the three values' meanings restored beside item 106 (d)'s derivation |
| VM-R0S-03 | model | FIXED | §2.7 `WallCondition` five values with meanings; `conditionMaterial`, `conditionEpoch` profiles; writers, readers, undo, migrate; §2.2 rules 5 and 7; agrees with V06 §2.8 / §3.7.7, V07 §3.4 (8), V09 §4.21.4, V10, V11 §3.25.3, §7.1, §7.4, §7.5, DR41, §8.2, §11.1 |
| VM-R0S-04 | model | FIXED | §2.9 `yearWeek`, `seasonFollow`, `season` a reading; agrees with §4.11 *The clock* (3), DR42, §8.2, V09 §4.21.7 |
| VM-R0S-05 | model | FIXED | §2.9 `festival`; agrees with DR43, §8.2, V08 §3.16 (5), V09 §4.21.8, V11 §3.25.7 |
| VM-R0S-06 | model | FIXED | §2.1 ground parts ≥ 1 and the three counters; `PlatKey`; §2.2 rule 1's raised ground part; rule 2; agrees with §3.2 (9), §3.4, §3.10 |
| VM-R0S-07 | pipeline | FIXED | §4.12 declares neither `EditRef` nor `RuleRef` ("§2.8's") |
| VM-R0S-08 | model | FIXED | §2.7 `Use.strain` (V06 §2.9 still restates it: VM-R1T-06) |
| VM-R0S-09 | model | FIXED | §2.7 `Household.transit`, `DisplaceCause` (with `destruction`); V06 §2.1 cites §2.7 |
| VM-R0S-10 | model | FIXED | `Terrain.mining`, `SiteResources.wellYield`, `Plot/Block.platformCm`, `Person.key.bornWeek`, each with writer, readers, migration; §4.2 S1 (10), §10.3 agree |
| VM-R0S-11 | model | FIXED | §2.7 `HistoryHint` carries item 113's fields (equal to V08 §3.15 (2)); the duplicate and the standalone form: VM-R1T-07, -14, -15, -16 |
| VM-R0S-12 | pipeline | FIXED | §4.9 writes `garden` faces with `fedBy`; no `garden_irrigated` in the set |
| VM-R0S-13 | model | FIXED | `RaisedWayRecord.feet`, `RaisedFoot`, role `raised_foot`, rule 2, `Identity.key`; §3.4 and §3.10 agree |
| VM-R0S-14 | model | PARTLY FIXED — persists (owner now scope) | §2.2 rule 5 defines the write; no §13 bar (EDGE-UNTESTED) |
| VM-R0S-15 | pipeline | FIXED | §4.11 `DeclineOp` has `retireWay` / `effaceWay` / `reopenWay` |
| VM-R0S-16 | V11 | FIXED | V11 §3.9's `village` row (affinity 1.0 on the `village` tag; VS5 sets the quarter and fabric) |
| VM-R0S-17 | model | PARTLY FIXED — persists (owner now scope) | §2.5 and §4.12 fixed; §14's comment still the narrow reading (V01 §2.1 likewise: VM-R1T-04) |
| VM-R0S-18 | pipeline | FIXED | §4.12 cites §2.5 for `FabricStrategyId` |
| VM-R0S-19 | model | FIXED | "§4.3's (the need test) and II.7.6's (the cistern rule …)" |
| VM-R0S-20 | model | FIXED | names T110-1, T110-2, T110-5 (their texts carry the frame clauses) |
| VM-R0S-21 | V12 | FIXED | V12's span-rule line: "their values V11 §3.24.2" |
| VM-R0S-22 | model | FIXED | stray `//` gone |
| VM-R0S-23 | model | FIXED | `walkCm`: written by S7 with the class row's values (§4.8 names the walk), read by §11.1's glTF top only |
| VM-R0S-24 | determinism | FIXED | §5.4 `GenerationReport.recipe` with `presetId` |
| VM-R0S-25 | V09 | FIXED | V09 §4.14's advanced (recipe) panel head reads `Recipe.presetId` (`info.recipe.preset`) |
| VM-R0S-26 | pipeline | FIXED | §4.6 writes `Block.depthClass` |
| VM-R0S-27 | scope | FIXED | §13.5's court-share row reads `Block.depthClass` |
| VM-R0S-28 | model | FIXED | the five volume citations written in full; no new bare-§ continuation in the added text (scripted scan) |
| VM-R0S-29 | model | FIXED | "the half raise ships with the basement gate at M2b, §16" (M2b builds the basement decision); J-S23.2 gone |
| VM-R0S-30 | model | FIXED | "outside plots" in §2.2 rule 1 and `LandUse.face`; J-RM2 in no design file |
| VM-R0S-31 | determinism | FIXED | `type TableId` declared at §7.6 |
| VM-R0S-32 | model | FIXED | §2.9 `cvdVariant` (`CvdVariant` §8.2; `AppPrefs.cvdDefault` V09) |
| VM-R0S-33 | model | FIXED | §2.8 points to V09's `info.remove.holds` / `.deck` |
| VM-R0S-34 | model | FIXED | §2.6 step 4 cites V03 §2.4's `PlanGeometryRow.moduleCm` |
| VM-R0S-35 | model | FIXED | §2.8's hollow-way clause with the street layer's rate (§4.11's decline table; *The clock* (5)) |
| VM-R0S-36 | model | FIXED | no BCR- or V1C- id in §2 |
| VM-R0S-37 | model | FIXED | "**Suppression (J-VI.14).**"; the retired phrase is gone from the base |

## 3. The nine replaced subsections — what the repair changed, read whole

All nine §2 subsections were REPLACEd; outside the 74 hunks every line is byte-identical to the round-0 text (those lines
keep their round-0 verdicts). Per subsection:

* **§2.1** (hunks 1–3): ground parts ≥ 1, `nextGroundPart`, unprefixed raised addresses (stated at §2.4, J-A110.21). Clean.
* **§2.2** (hunks 4–12): `PlatKey`; rule 1's raised ground part (L0 outer ring with `margin` on the way's record, L1 spine
  between the feet, L2 band by `corridorUnion`, no L3–L4 — agrees with §3.2 (9), §3.4); rule 1's link sentence and rule 2's
  cross-arena list; rule 5's stretch write with its renumbering order (defined; untested: VM-R0S-14) and the three parallel
  wall profiles; rule 7's `raised_foot`, `wall_material_knot`, `wall_epoch_knot`. Clean but for VM-R0S-14.
* **§2.3** (hunks 13–14): `Terrain.mining` (agrees with §4.2 S1 (10), II.7.6); `OutfallInto` cited by V04 §2.1. Clean.
* **§2.4** (hunks 15–16): `wayFall` takes `levelCm` (V04 §2.3's `NetworkRule.levelCm` the value passed; V04 agrees). Clean.
* **§2.5** (hunks 17–21): `FabricStrategyId` (§14's comment and V01 §2.1 not following: VM-R0S-17, VM-R1T-04); the two
  `platformCm`; `dist.wall?`. The allocation rows' `cls: string`: VM-R1T-13.
* **§2.6** (hunks 22–34): `BuildingClass` and *A building's class* (V11 §3.5's ids all exist; §4.7's `Designation.cls` typed
  by it; `Use.cls` not: VM-R1T-13); `DormerRow`, `DormerKind`, `AccessHead`, `PorchKind` moved in (V03 removed its copy; V02
  did not: VM-R1T-05); the core mix (VM-R0S-01); crypt rank as V03 §3.7.4 (3); the half raise at M2b; `moduleCm` cited. Step
  7's uniform ruin drawing unchanged (item 123: G123-model).
* **§2.7** (hunks 35–57): waterfront meanings; `walkCm`; item 114's condition record and paragraph (agrees with every
  counterpart, §2 above); `RaisedKind`, `RaisedReasonKey`, `RaisedFoot`, `feet`; the support step's new obstacles and the
  clear-span bound (V11 §3.24.2 holds `maxClearSpanM` 30 / 20 m, J-V11.116; §4.3, §4.13, V06 and §13.2 not following:
  VM-R1T-08, -09, -10); span reason `clear`; `raised.reason` named as the stream (§6.1's row cites V06 for the key:
  VM-R1T-11); the gate moat deck (§4.7 and §4.13 agree); `Use.strain`, `Household.transit` (its §10.3 reader: VM-R1T-12),
  `DisplaceCause`, `wellYield`, `bornWeek`; `TierLay`, `LaidWing`; `HistoryHint` (VM-R1T-07, -14, -15, -16).
  `ConditionOverlay`'s readers unchanged (item 122: G122-model).
* **§2.8** (hunks 58–68): `RuleRef`'s stray `//`; `Identity.key` for the feet; the suppression bullet's lead and message
  pointer; the walls ladder's `worn` and `patched`; the hollow-way rate; the registry rows for the new attributes. Clean.
* **§2.9** (hunks 69–74): `HoodRecipe` and `OutlineTemplateId` moved in (VM-R1T-01, -02, -03); `Recipe.history`'s two
  writers; the corrupt-cache clause (agrees with §3.9); the four view keys `yearWeek`, `seasonFollow`, `festival`,
  `cvdVariant` with defaults, writers, readers, edges and migration. `find` (item 120) and the weather effects (item 124)
  absent: G120-model, G124-model.

**Nuance audit of the removed text.** §2 grew (+8.0 %), so the more-than-half audit does not apply; every removed phrase was
traced: the old class list (hall, keep, tower, mill, temple were template families — VAF-R0S-16; the cluster-structure note
kept in `BuildingClass`); "strictly the largest … trimmed to … its area" → V03 §3.7.4 (3)'s "capped at `crypt.rankShare` ×
the principal's area" (V03 is the rank's home); `walkCm`'s two non-existent readers (false ends removed); §8.2's gap glyph
and trace discs (kept at §8.2's wall rows); the quoted delete message (V09's catalogue key); "else one declared shift,
J-S23.2" (moot once the half raise ships with the gate at M2b); "staged, absent in the base" on `Recipe.history` (item 113
makes S0's blueprint a writer). No case, constant, band row, fallback, rung, provenance, bar or owner rule is lost.

**The model's cross-unit hand-offs, checked at their destinations:** carried — V03 (`AccessHead`, class rows), V06
(`DisplaceCause`, `RaisedReasonKey`), V11 (`maxClearSpanM`, rows 79–80, J-V11.116), V12 (the cell under the
`raisedWays.structure` line), V09 (no reader enumerates the span reasons, so `clear` needs no word list), §4.12, §4.11's
walls ladder, rendering's season and festival rows; **not carried** — V01 (`HoodRecipe` still declared: VM-R1T-03), V02
(VM-R1T-05), V06 §3.19 (5) (`raised_too_long`: VM-R1T-09), pipeline §4.3 / §4.13 (VM-R1T-08), scope §13.2 T110-2 / T110-5
and the E-01 bar (VM-R1T-10, VM-R0S-14) and §14's comment (VM-R0S-17), determinism §6.1 (VM-R1T-11).

## 4. Owner items for the model (g 114–124)

| item | the canon's model part | verdict |
|---|---|---|
| 114 | §2.7 `Enceinte.condition` five values on item 575's profile; each run's material and last-change epoch | PRESENT at build depth (VM-R0S-03 closed) |
| 115, 116, 119, 121 | none for model | — |
| 117 | §2.9 the year position (0–51) and the "follow SettlementForge" flag | PRESENT (VM-R0S-04 closed) |
| 118 | §2.9 festival display follow / off / preview | PRESENT (VM-R0S-05 closed) |
| 120 | §2.9 the per-viewer view key `find` (chips, gaps switch), outside the document, hash and log; kept in view pins | **F-MISSING** — G120-model (seven volumes already read it) |
| 122 | §2.7 `ConditionOverlay` read for the look; nothing added to the model | **F-MISSING** — G122-model |
| 123 | §2.6 step 7: the damage layer over the same plan; the decay level read | **F-MISSING** — G123-model |
| 124 | §2.9 the effects switch as device state; the spell as session-transient view state; `weather` kept as the cover | **F-MISSING** — G124-model |

The written parts keep every look out of the model: `yearWeek`, `seasonFollow`, `festival` and `cvdVariant` are stated
outside every digest and never read by the model or its hash (items 117 (a), 118 (a)); nothing CHANGED.

## 5. Issues

| id | severity | kind | owner | claim | required change |
|---|---|---|---|---|---|
| VM-R0S-14 | major | EDGE-UNTESTED | scope | Partly fixed. The model's repair made §2.2 rule 5's *Write* define the outcome of a write inside an existing run (the knots strictly between the ends dropped; the profile's knot rows renumbered from 0 in chain order in a fixed order — strip the dropped, raise last-first, place the end knots, lower first-last — so §3.10's ordinal order holds at stage end and save), but no bar in §13 tests it: §13.1–§13.2 carry no stretch-state write case (grep 'stretch-state', 'ordinal order', 'wall_state_knot' over §13: 0 hits). The model's hand-off ('the E-01 bar gains a write inside an existing run (knots in ordinal order after it)', repair-r1-model.md CROSS-UNIT HAND-OFFS) was not carried by repair-r1-scope. | §13.1 (kernel property tests): add a bar citing §2.2 rule 5 — random stretch-state writes on open and closed chains that already carry a profile, each `StretchRef` inside an existing run, across one or more existing knots, ending on an existing knot's vertex and over the whole chain, for `RetainingWall.state` and for the enceinte's three parallel profiles (`condition`, `conditionMaterial`, `conditionEpoch`) written in one batch: after every write each profile's knot rows lie on the chain in ordinal order from 0, no ordinal is held by two vertices at any step, no knot vertex dissolves, the canonical form holds, §3.10's stored-reference row passes at stage end and save, and undo restores every profile byte-identically; with a negative control (the dropped knots stripped last) that the bar must catch. |
| VM-R0S-17 | minor | CONFLICT | scope | Partly fixed: §2.5 now defines `FabricStrategyId` as the id of a registered FabricStrategy (`bent-cut`, the hood.templates rows and V07's 'village-ways', 'which is no hood.templates row') and §4.12 cites §2.5, but §14's @plat/model comment (base l. 18121) still reads 'FabricStrategyId is a row key of hood.templates (V01 §2.1)', the narrower reading that excludes the village district's fabric. | §14 (the @plat/model comment beside DistrictContext and TypedBoundary): 'FabricStrategyId is §2.5's: the id of a registered fabric — `bent-cut`, a hood.templates row (V01 §2.2) or V07's `village-ways`'. |
| VM-R1T-01 | major | CONFLICT | model | The repair (VAF-R0S-03) declared `type OutlineTemplateId = string` in §2.9 beside HoodRecipe ('a row key of the outline templates … star, star_round, street_strip, plaza_frame, disc, D-shape, lozenge, crescent, spindle; the standalone rows V01 §3.10.2's'), while pipeline's repair (VV12-05; the canon homes the type at §4.2) declared it at §4.2 S1 (2) as the closed union 'star'\|'star_round'\|'street_strip'\|'plaza_frame'\|'disc'\|'d_shape'\|'lozenge'\|'crescent'\|'spindle'. One type has two declarations in the base, one open (string) and one closed, with two spellings of one row (D-shape / d_shape); V01 §2.1 names §4.2 S1 (2) as its home. | §2.9: delete the `type OutlineTemplateId = …` line; HoodRecipe's `outline` keeps `{ template: OutlineTemplateId }` with the comment '§4.2 S1 (2)'s row key' — the one declaration stays §4.2 S1 (2)'s (the canon's home, VV12-05). |
| VM-R1T-02 | minor | RESTATEMENT | model | §2.9's new `HoodRecipe` (moved from V01 §2.6 under VAF-R0S-03) states `size?` 'the chips: `buildings` ≈ 85, 700, 1 050 (NG's bands)' and `leafy?` 'court greening × 1.5' — values whose one home is V01's cells `size.small`, `size.medium`, `size.large` and `green.leafyCourt` (V01's register: 85, 700, 1 050; 1.5); live V01 §2.6 already names the cells. The base copy restates calibratable constants (principle (1)) and drifts when they are calibrated. | §2.9 HoodRecipe: `size?` comment 'the chips: `buildings` ≈ `size.small`, `size.medium`, `size.large` (NG's bands; V01 §3.14)'; `leafy?` comment 'greenery 0.9 and court greening × `green.leafyCourt` (NG's `leafy`)' — as V01 §2.6 reads. |
| VM-R1T-03 | minor | RESTATEMENT | V01 | V01 §2.6 still declares `interface HoodRecipe` in full, while §2.9 now declares it ('declared here, V01 §2.6 cites it'; MC-11 via VAF-R0S-03): two declarations of one record across the set. | V01 §2.6: replace the ts block's `interface HoodRecipe { … }` with a citation — '`HoodRecipe` (Recipe.hood, item 272) is §2.9's; its rules are V01 §3.10.1's' — and keep the closing note on the layers a standalone neighbourhood document may hold (V01 §3.10.1 (7)). |
| VM-R1T-04 | minor | CONFLICT | V01 | V01 §2.1 reads '`FabricStrategyId` (a `hood.templates` row key) … declared in §2.5', but §2.5 now defines it as the id of any registered FabricStrategy, V07's 'village-ways' included, 'which is no hood.templates row' (VM-R0S-17's fix). | V01 §2.1: '`FabricStrategyId` (a registered fabric: `bent-cut`, a `hood.templates` row key or V07's `village-ways`), `BlockKind`, `SquareType`, `SeamRun` and `TypedBoundary` are declared in §2.5'. |
| VM-R1T-05 | minor | RESTATEMENT | V02 | V02 §2.2 still declares `interface DormerRow` and `type DormerKind`, and V02 §2.6 `interface LaidWing` and `interface TierLay`, while the base now declares all four (§2.6 DormerRow and DormerKind, 'declared here, V02 §2.2 cites it'; §2.7 TierLay and LaidWing, 'declared here, V02 §2.6 cites it'; MC-11 via VAF-R0S-03). The texts agree today, but the set holds two declarations of each, and V02 §2.2's lead sentence lists only `Wing.base`, `Wing.dormerRows`, `ComposedTower.base`, `Porch.kind`, `Composition.row` and `.grammar` as §2.6's. | V02 §2.2: delete the DormerRow and DormerKind declarations and add `DormerRow`, `DormerKind` and `PorchKind` to the lead sentence's list of §2.6's declarations; V02 §2.6: delete the LaidWing and TierLay lines and cite '`TierLay` and `LaidWing` are §2.7's'. |
| VM-R1T-06 | minor | CONFLICT | V06 | V06 §2.9 still declares `strain?: { kind: 'demand'\|'supply'; sinceWeek: number }` 'on §2.7's Use' with the comment 'written by the use phase only', while §2.7 now declares `Use.strain` (VM-R0S-08's fix, file f item 429) with a user's `setAttr` clearing it ('give this shop time') — as V06's own hand-forms table (V06 §4.2, 'a failing shop given time': `setAttr` on `Use.strain`) and §2.8's registry ('Use.strain (setAttr)') say. Two declarations, and V06's comment contradicts the writers. | V06 §2.9: replace the ts block with '`Use.strain` is §2.7's (file f item 429): set by the use phase (V06 §3.9.2) and cleared by it or by a user's `setAttr`', keeping the section as the rule's pointer. |
| VM-R1T-07 | minor | RESTATEMENT | V08 | V08 §3.15 (2) still types item 113's `HistoryHint` fields in its own ts block ('its item-113 fields typed here, which model §2.7 carries'), while §2.7 now declares them in full ('Declared here, V08 §3.15 (2) cites it'; VM-R0S-11's fix). The copies agree today; the set holds two declarations. | V08 §3.15 (2): replace the ts block with '§2.7's `HistoryHint` declares the fields creation writes (founding, events, tiers, population, calamities, lifecycle, ancientFall, peak)' and keep, as a mapping list, each field's dossier source (history.founding.age else history.age, historicalEvents, tierHistory, populationHistory, calamityHistory, the ancient 'Fall of' event, peakTier) and the tick-to-years rule that follows the block. |
| VM-R1T-08 | major | CONFLICT | pipeline | The repair added to §2.7's support step a clear-span bound — a merged clear span longer than `raisedWays.structure.maxClearSpanM` (masonry 30 m, timber 20 m; V11 §3.24.2) drops a generated course (`raised_too_long`) and bends a declared one — and new obstacles (a square, a reservation, a wall strip, an oasis's grove; span reason `clear`). §4.13's river, coast, moat row still gives the raised way 'spans between supports on the banks, no support in water (§2.7's support step), within `viaduct.maxSpanM` … *Rung:* — (defined: §2.7's support step)', with no failure rung, and §4.3 *Where it may not go* still says 'a river or canal it may span between supports on the two banks within `viaduct.maxSpanM`' — both now contradict §2.7: a river wider than the bound is not spanned (generated: left out and reported; declared: bent). The model's hand-off ('§4.3 and §4.13 … cite §2.7's support step and clear-span bound') was not carried. | §4.13, the river, coast, moat row's raised-way cell: '… no support in water, within `viaduct.maxSpanM` and §2.7's clear-span bound (`raisedWays.structure.maxClearSpanM` by material) — a crossing wider than it drops a generated course (`raised_too_long`) and bends a declared one. *Rung:* leave out and report (generated); simpler shape (declared, bent)'; §4.3 *Where it may not go*: '… a river or canal it may span between supports on the two banks within `viaduct.maxSpanM` and §2.7's clear-span bound'. |
| VM-R1T-09 | minor | WIRING | V06 | §2.7's support step says a generated course dropped by the new clear-span bound is reported `raised_too_long`, 'which waits as `raised_too_tall` does, V06 §3.19 (5)'; but V06 §3.19 (5) (the course), V06 §3.17 item 9 and `EpochReport.raised.waited`'s comment (V06 §2.10) name only `raised_too_tall` — the cited waiting rule does not cover the new drop (the model's hand-off to V06 was not carried). | V06 §3.19 (5): 'a course one of whose piers stands higher than `maxPierM` for its kind (`raised_too_tall`) or whose merged clear span exceeds `maxClearSpanM` for its material (`raised_too_long`, §2.7) is dropped and the candidate waits'; name both codes in V06 §3.17 item 9 and in `raised.waited`'s comment (V06 §2.10). |
| VM-R1T-10 | major | EDGE-UNTESTED | scope | The repair gave §2.7 three new defined outcomes with no bar in §13.2: the support step's obstacles beyond ways and water (a square, a reservation, an enceinte's wall strip, an oasis's grove: a station there slides or is omitted, the merged span open with reason `clear`), the clear-span bound (a merged clear span over `maxClearSpanM`: a generated course dropped as `raised_too_long`, a declared one bent), and no deck plot on a gate's moat deck (VEW-11, VEW-12, VEW-13). §13.2's T110-2 covers junctions, planarity and the frame, and T110-5 width, budget, falling with the deck and the frame only; the model's hand-off asking T110-2 and T110-5 to gain these cases was not carried. | §13.2: T110-2 gains — a viaduct over a square and an aqueduct across a wall strip and over an oasis's grove: 0 piers in any of them, each span over one `open` with reason `clear`; a generated viaduct and aqueduct over a 200 m river: dropped (`raised_too_long`, the epoch candidate waiting), a declared one bent to a course whose clear spans fit `maxClearSpanM`, no support in water; T110-5 gains — a walled, moated fixture with stone moat bridges: 0 deck plots on a bridge over a `moat` or `castle_moat` whose way is a `Gate.way`. |
| VM-R1T-11 | minor | BROKEN-REFERENCE | determinism | Two base rows cite volume homes for types the repair moved to §2.7 under MC-11: §6.1's `raised.reason` row ('one uniform per `RaisedReasonKey` (V06 §2.13)') and §5.3's Works row ('(`Household.transit`, V06 §2.1)'); V06 §2.13 and V06 §2.1 now only point back to §2.7 (the model's hand-off for §6.1 was not carried). | §6.1, the `raised.reason` row: '`RaisedReasonKey` (§2.7)'; §5.3, the Works row: '(`Household.transit`, §2.7)'. |
| VM-R1T-12 | minor | WIRING | model | §2.7 `Household.transit`'s comment names its readers 'the epoch's siting (V06 §3.8.1), the occupancy readers (§10.3) and §5.3's Works row'; §10.3 never reads the field (grep 'transit' over §10: 0 hits) and cannot — the field never outlives the epoch's last batch (the runner's close asserts the ledger's pool empty, V06 §2.1), while §10.3 derives from committed state. A one-ended reader claim. | §2.7 `Household.transit`: 'read by the epoch's siting (V06 §3.8.1), the runner's close (V06 §2.1: the ledger's pool empty at the epoch's end, T-V6-52) and §5.3's Works row' — drop 'the occupancy readers (§10.3)'. |
| VM-R1T-13 | minor | ELEGANCE | model | The repair declared `type BuildingClass = string` as 'a row id of the roster's class table `roster.classes` — §10.2's BuildingClassRow.id … the one vocabulary Building.class, BuildingInput.cls, ClassRules.pick, §4.7's Designation.cls, §4.11's build and rebuild and §7.1's RosterLine.cls name', but the same vocabulary keeps a bare `string` elsewhere in §2: `Use.cls: string /* the roster class it is (§10.2's BuildingClassRow.id) */` (§2.7) and §2.5's allocation `rows: { cls: string; … }`; pipeline's `Designation.use` and `PlacementItem.cls` (§4.7) likewise. One concept under two type names (principle (9): names and record shapes uniform). | §2.7: `Use.cls: BuildingClass`; §2.5: the allocation rows' `cls: BuildingClass`; add `Use.cls` and the allocation rows to BuildingClass's vocabulary list (pipeline's §4.7 `Designation.use` and `PlacementItem.cls` to follow). |
| VM-R1T-14 | minor | EDGE-UNDEFINED | model | §2.7's `HistoryHint` (VM-R0S-11's fix) says 'standalone, the blueprint's history option fills `peak` (§4.2 S0)' but not with what: `peak` is `{ tier; population?; symbolic; evidence }`, and a user's pick has no evidence kind of V08 §3.15 (3) and no stated `symbolic`; and `events`, `tiers`, `population`, `calamities` are typed required although the record says 'a recipe written before item 113 reads its fields absent or empty' and a standalone history carries none of them. The option's writers (V09 §4.21.3 (1), V10 §4.1's T1 row) therefore write a shape the record does not admit. | §2.7 `HistoryHint`: mark `events`, `tiers`, `population` and `calamities` optional (absent read as [] — the existing migration sentence), and state the standalone form: 'the blueprint's history option writes `ageYears`, `scars: []` and `peak: { tier: the picked rung, symbolic: false, evidence: [] }` (a declared peak, as a recorded `peakTier` is; no population: DR36 sizes the peak by its tier); the item-113 lists absent'. |
| VM-R1T-15 | major | CONFLICT | V09 | V09 §4.21.3 (1) maps the History chip to `adjust('history', { peak: { rung }, ageYears, scars: [] })`, 'the blueprint's `history` (§4.2 S0's `HistoryHint`)'; §2.7's `HistoryHint` (declared in full by VM-R0S-11's fix) has `peak: { tier; population?; symbolic; evidence }` — no `rung` — so DR36 and V06's `ReplayPlan`, which read the peak's tier, find none and a standalone 'Once a city' would replay nothing: a silent wrong result. | V09 §4.21.3 (1): 'A pick maps to `adjust('history', { peak: { tier: rung, symbolic: false, evidence: [] }, ageYears, scars: [] })`' — the form §2.7 states for the standalone option (VM-R1T-14). |
| VM-R1T-16 | major | CONFLICT | V10 | V10 §4.1's T1 `intend` row writes the blueprint's history as `{ peak: { rung: onceA }, ageYears: …, scars: [] }` 'as V09 §4.21.3 (1)'s History chip writes it'; §2.7's `HistoryHint.peak` is `{ tier; population?; symbolic; evidence }`, so the replay finds no tier (the same silent wrong result as V09's). | V10 §4.1, the T1 `intend` row: '`history` → the blueprint's `history` (§2.7's `HistoryHint`), `{ peak: { tier: onceA, symbolic: false, evidence: [] }, ageYears: ageYears ?? V09's `history.defaultAgeYears`, scars: [] }`' — §2.7's standalone form (VM-R1T-14). |
| G120-model | major | F-MISSING | model | g item 120 (canon: 'model: §2.9 (the per-viewer view key `find` — chips and the gaps switch — outside the document, its hash and the log; kept in view pins)') is absent: §2.9's view state names no `find` key, while V01 §5.4, V03 §5.5, V04 §5.1, V05, V07 §5.5, V08 (W95) and V10 (`type FindView = ViewState['find']`, its `find` action's `chips` and `gaps`) all read '§2.9's view key `find`' — a dangling input across seven volumes. Expected missing this round (model's repair began before the filing). | §2.9, view state, as new design at build depth (g item 120 (a), (d), (f), (i)): `find?: { chips: FindChip[] /* in selection order; each one target — a class (a roster.classes id, or a word chip naming several, 'all smiths'), a named institution (its binding key, else its address), an area (a district, neighbourhood or quarter address) or a named place; its colour and second cue by its index, the colours repeating past eight */; gaps: boolean /* Show gaps, the former Coverage */ }` — per viewer, never over a bridge, outside the document's digests, its hash and the edit log, never read by the model; kept through zoom, pan, layer, season, advance of time and every commit; saved in view pins with the other view keys; emptied only by Clear or by closing the panel (absent = Find off; a chip whose target is gone stays at count 0); written by V09's Find panel and V10's `find` action; read by V09's `live.find`, §8.2's veil, halo, outline, pin and bubble rows, §11.1's picture exports, V03's `findRooms`, V04's `underFindPlaces` and V10's `FindView`; named in *What the snapshot holds* and in the per-viewer key list. |
| G122-model | major | F-MISSING | model | g item 122 (canon: 'model: §2.7 (`ConditionOverlay` read for the look; nothing added to the model)') is absent: `ConditionOverlay`'s comment names its readers as '§8.2's thematic overlay, §4.11's Works share and the clerk', and *The dossier's staged records* names no crisis look; nothing states that the look reads the overlay and adds no model data. | §2.7 `ConditionOverlay`: add to its readers '§8.2's crisis look rows (g item 122), through §7.7's look row (archetype → a look kind or none; severity and tier → scale), while the condition stands in the view's week, under knowledge admission'; and to *The dossier's staged records*: 'a crisis look (item 122) reads the standing `ConditionOverlay`s and adds nothing to the model — no record, field, digest or hash moves with it; what a crisis leaves reaches the map only through the epoch path (V06's hazard phase and growth)'. |
| G123-model | major | F-MISSING | model | g item 123 (canon: 'model: §2.6 (step 7: the damage layer over the same plan; the decay level read)') is absent: §2.6's plan rung step 7 still draws 'a `decayed` or `ruined` building its fallen walls and open rooms — a drawing of the same plan, nothing stored', uniformly, with no decay level, no per-element threshold, no progression and no restoration. | §2.6 step 7, as new design at build depth (g item 123 (a), (b), (f)): 'A building's plan is derived once, as built (its built band and era), and never re-derived because it decays; a building first met abandoned, decayed or ruined (generated so, or by item 113's replay) gets its as-built plan. Ruin is a **damage layer** over that plan: each plan element (a wall run, a floor area, a door, a window, a stair, the roof bay over a room, a furniture piece) has one keyed threshold in [0, 1) (§6.3: by the building's lineage and the element's id; no new id), and the building's **decay level** (0–1, a reading of its existence state and the years since it was abandoned, V06; the material's rate V11's) shows every element whose threshold it has passed — monotone (a higher level's damage contains a lower's; nothing relocates); a restoration (`reused`, a repair) lowers the level and the damage leaves in reverse order, a repaired element drawn in patch material (item 114). Every room, wall, opening and id is unchanged and nothing is stored; a building never decayed draws byte-identically. Its drawing is V03 §5.1's and §8.6's, its battle-map walls §11.1's.' |
| G124-model | major | F-MISSING | model | g item 124 (canon: 'model: §2.9 (the effects switch as device state; the spell in force as session-transient view state; `weather` kept as the cover)') is absent: §2.9's view state lists `weather` with no statement that it stays the seasonal cover, and names neither the weather-effects switch nor the spell in force. | §2.9, as new design: 'Weather effects (g item 124): the **Weather effects** switch is device state (V09's `AppPrefs`, never in the document; on by default where the tier has headroom, off on the low tier, on phones and under reduced motion), and the **spell in force** (its kind, its start and its phase on §6.1's view-only weather stream, seeded per session) is session-transient view state — never saved, never over a bridge, never in a digest, the hash or the tile key, never read by the model; `weather` stays the seasonal cover (snow lying, overcast), a saved per-viewer key in the tile key as today; exports draw no effect (§11)'. |

## 6. CONFIRMED versus PLAUSIBLE

* CONFIRMED (read in the live text, cited by section): every verdict of §2, every issue of §5, the hand-off census of §3,
  the owner-item table of §4, the word counts (`wc -w` over the extracted `## §2`, pre and live) and the document checks'
  counts.
* PLAUSIBLE: the severity of VM-R1T-15 and -16 (major) assumes the replay keys the peak on `peak.tier` as §2.7, V06's
  `ReplayPlan` and DR36 state; the specific values proposed in VM-R1T-14's required change (`symbolic: false`, `evidence: []`
  for a declared peak) are this verifier's narrowest reading, for the model's repair to confirm or the adjudicator to rule.
