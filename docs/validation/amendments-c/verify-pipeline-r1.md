# verify-pipeline-r1 — lane amendments-c/verify-pipeline-r1 (the PIPELINE part after repair round 1)

> PENDING FABLE REVIEW — Opus-produced (amendments-c/verify-pipeline-r1).

> PROGRESS (kill-safe ledger; a seat that continues this lane reads it first):
> STEP 0 inputs read (verify-pipeline-r0, repair-pipeline-r1 report, assemble-r1, the other verifiers' pipeline-owned r0 rows, the other r1 repair reports' cross-part notes to this part; part diff pre-r1 → live): done
> STEP 1 re-check of the 27 VPR0 pipeline rows and 17 sibling rows the repair claimed (live text quoted): done
> STEP 2 new-problem / single-source / stale / deferral / reference sweep over the repaired subsections: done
> STEP 3 cross-part notes addressed to this part (r1 repair reports): done
> STEP 4 other-owner rows of r0 (VPR0-07, -08, -11, -13, -21, -25, -30) re-checked; sibling r1 verifiers (determinism, kernel, model) read and aligned: done
> STEP 5a report body written: done
> STEP 5 report complete, queue row, LANDED line: done

Design read: docs/ARCHITECTURE.md sha256 024c57dabc6b93c8… (17 050 lines); rationale 33b21ca8cdc15789…. Before:
docs/archive/ARCHITECTURE-pre-amendments-c-repair-r1-2026-09-28.md (7f4c0e25…). Scratch: scratchpad `vpr1/` (part
extracts `pre-part.txt`, `live-part.txt`; word diff `part.wdiff`).

## Outcome

Repair round 1 fixed every one of the 27 pipeline-owned r0 issues (VPR0-01 … VPR0-34) and the 17 sibling rows routed
to this part (VKC-08, -10, -11, -13, -14, -15, -16; VD0-06, -12; V-MC0-06, -08, -17, -18, -25, -28; VRC-21, -22): each
required change is in the live text once, at its home, and the seven other-owner rows of r0 (VPR0-07, -08, -11, -13,
-21, -25, -30) are fixed by their owners. No held part entered the part; gates (b) and (c) hold for the new text; no
deferral wording. Items: home 24 PRESENT and 1 PARTIAL (72); referencing 12 PRESENT and 1 PARTIAL (88); none MISSING.

**17 issues are open — 1 major, 16 minor.** The major one is new, created by round 1's J-A72.50: S10a's cross-district
re-homing sends a household no district's range admits to F-SITING's manifest rung, which under a dossier would drop a
household that fills the dossier's population (VPR1-01; its §5.2 companion VPR1-02). Of the rest, 6 repeat sibling r1
findings on this part (VKC1-04, VKC1-05, VD1-10, VD1-14, V-MC1-02, V-MC1-08 — texts aligned; four of them are r1 repair
seats' cross-part notes no seat folded), 2 are further unfolded cross-part notes (rendering's §4.10 week, the pipeline
seat's own bars for scope), and 7 are new (the impairment hook reads the wrong record, the generation-time buried town
has no rule, the relief class has no source, the hinterland row's shape, the underground window lights, §6.1's geology
draw, §7.7's bearing sentence). Owners: pipeline 13, determinism 3, scope 1. Nothing needs an owner ruling; VPR1-01, VPR1-04 and VPR1-12
carry one proposed default each (our own, calibratable).

## 1. Items — status after round 1 (r0 verdicts in verify-pipeline-r0 §1; only changes quoted)

| item | role | r0 | r1 | the repaired mechanism, quoted from the live design | open |
|---|---|---|---|---|---|
| 65 | home | PARTIAL | PRESENT | S0 `geology: 'auto'\|'ordinary'\|'soluble'\|'volcanic'`; S1 (10) "P(soluble) plain 0.10 … `soluble` below P(soluble), `volcanic` at or above 1 − P(volcanic), else `ordinary`"; `DeclineOp` "`'flood'; element: Id`"; `RaiseGrade.system?`; `op: 'raiseGrade'` / `op: 'clearUndercity'`; §4.12's four registrations; II.7.1/II.7.2 "part 0"; II.1 undercity close-up; §10.4 undercity naming; S7b (7) "the H households of II.7.5's size law" | VPR1-04, -07, -09, -12 |
| 70 | home | PARTIAL | PRESENT | §4.7 (1) "at generation a plot is `informal` only where (2) gives it the cluster row"; (2) "the residential plots of the squalid and poor band rows of a shanty-typed district"; `wholeBlock` "one draw on the block's `plot.join` stream at S10 (7), which reads the district's kind and the block's band and no tenure"; §10.2 "squalid: hovel 0.8, row house 0.2" | — |
| 72 | home | PARTIAL | PARTIAL | §4.3 "`gates`, `harbour` and `dominantBearingCdeg` at §4.2 S3 (7) … `ways` after S4"; §4.5 (5) "S7b (1) allocates by the range … at the district's area-weighted mean pass-1 value — a provisional reading, never stored; S10a … moves any household …"; (3) kind-less rows; (6) "each sector's applied share, the fold of §4.11's …" | VPR1-01, -02 |
| 64 | home | PRESENT | PRESENT | II.7.3 (2) "`crime` §4.6's access factor"; (4) "the one statement of an access's knowledge in a building"; fallback stair "the one on a `knownTo: 'secret'` plot … first, else the one whose class row has the highest access probability" | — |
| 63 | home | PRESENT | PRESENT | unchanged mechanism | VPR1-08 |
| 67 | home | PRESENT | PRESENT | Works (1) "a building, whose added or subtracted wings and storeys are the parts of the `MutationRecord` its `cause.mutation` names" | VPR1-10 |
| 34, 39, 45, 58, 71 | home | PRESENT | PRESENT | S7b (3) "the district's upper block area (`e_hi²`…)"; `W_CUT_SLID` in §3.1; §4.8 "its area centroid — `regularFit`'s `centre`"; II.4 "trees ordered as NG 1.2.2 orders them"; class mix | — |
| 33, 35–38, 40, 42–44, 46, 47, 57, 61, 76 | home | PRESENT | PRESENT | unchanged (r0 quotes stand) | — |
| 68 | ref | PARTIAL | PRESENT | `LightRule` "`sizeCm` … `colour` … `flicker: boolean`", underground hosts; (4) "one thing only is drawn"; §4.1 "an emitting pin that hosts a light is eager with its light" | VPR1-11 |
| 77 | ref | PARTIAL | PRESENT | S3 (4) "a bearing of the site request, or the bearing of a `road` partner of the trade slice"; S3 (12) "`TradeFlow.gates`, (4)" | VPR1-16 |
| 81 | ref | PARTIAL | PRESENT | §4.11 "the kernel grows the frame by §3.2 (9)'s single-level batches over one clear region (J-A81.31) … S4 continues every through-road …"; "*The rung at an epoch*, above" | VPR1-05, -06, -07 |
| 88 | ref | PARTIAL | PARTIAL | §4.2 S2 K′; §4.5 typing row and spill; legitimacy; §4.9 import share; §4.6 three crime factors | VPR1-03, -04, -13 |
| 50, 66, 20 (h), 75, 78, 79, 80, 82, 101 | ref | PRESENT | PRESENT | unchanged, or VPR0-16 fixed (78) | VPR1-09 (66) |

## 2. The r0 issues the repair claimed — re-checked in the live text (all FIXED)

* **Pipeline rows (27):** VPR0-01 (§4.3 two-part `TradeFlow`; S3 (4), (7), (12) read `TradeFlow.gates`) · -02 (§4.7 (1), (2),
  `wholeBlock` at S10 (7) from kind and band; §10.2 squalid row; shack out of the mix) · -03 (§4.5 (5) provisional range,
  S10a re-homing — see VPR1-01) · -04 (`LightRule.sizeCm`, `colour`, `flicker`) · -05 (§4.7 (4) one draw) · -06 (§4.11
  points to §3.2 (9)'s batches — residuals VPR1-05, -07) · -09 (`RaiseGrade.system?`) · -10 (`DeclineOp` `element`, `flood`)
  · -12 (S0 toggle, S1 (10) rule — input gap VPR1-12) · -14 (`op:`) · -15 (S2 K′, typing row, spill, legitimacy, impairment,
  import share — VPR1-03, -04) · -16 · -17 ("above") · -18 · -19 · -20 · -22 (one statement at §4.6, three readers cite it)
  · -23 · -24 (§10.4 bullet; II.7.5 pointer) · -26 · -27 (II.7.3 (4) the one statement) · -28 · -29 · -31 (kind-less rows;
  brothel rows) · -32 (J-A64.44) · -33 · -34.
* **Sibling rows routed here (17):** VKC-08 (= VPR0-06), VKC-10 (fresh `buried` records), VKC-11 (crossings are
  junctions; dug passages as foundations), VKC-13 (J-A12.45 amended), VKC-14 (rekey sentence), VKC-15 (area centroid),
  VKC-16 (link ends — "re-derives" read as covering §3.4's place, keep or strip; verify-kernel-r1 concurs), VD0-06, VD0-12
  ("declare their own generators"), V-MC0-06/-08/-17/-18/-25/-28 and VRC-21/-22 (= the VPR0 rows above).
* **Other owners' r0 rows (7):** VPR0-07 (§3.2 (9) *Frame growth at an epoch*, J-A81.31), -08 (§2.2 `frame` not
  readonly), -11 (§6.1 `works` keyed by the epoch's week), -13 (`W_CUT_SLID` in §3.1), -21 (§8.2 `hatched` row), -25
  (DR11/16/18/19), -30 (§6.1 readers list) — all FIXED.

## 3. The checks

* **SINGLE-SOURCE.** The crime factors (§4.6, three readers citing it), an access's knowledge (II.7.3 (4)), `yearsPerStage`
  (§4.2 S2; II.7.6 cites it), the light-row columns (§4.7; §2.7 copies), the geology rule (§4.2 S1 (10)), the band-range
  re-homing (§4.5 (5); §4.7 S10a (ii) cites it) and the trade flow's timing (§4.3; S3 (7) is the stage step) are each stated
  once. §4.11's summary of the frame growth restates §3.2 (9)'s batches and diverges on the rasters (VPR1-05).
* **STALE.** A diff of the retired-rule sweep (central market, immutable, licence, binary wealth, fixed size, the map
  editing the dossier, terrain or water that never change) between the pre-r1 and live part is empty. Newly stale:
  §4.7 *Concealed institutions* (1)'s override clause (VPR1-08), §4.7 S11 *Entrances* (VPR1-14).
* **CROSS-PART** (the r1 repair seats' notes addressed to this part): kernel 1 (rasters) — not folded, VPR1-05; kernel 2
  (link ends) — satisfied in substance; determinism (II.7.6 closure wording) — not folded, VPR1-09; determinism and model
  (§4.7 (1) override and source) — not folded, VPR1-08; model (`LightRule` three columns) — folded; rendering (§4.10 week)
  — not folded, VPR1-10; scope 2 (§4.11 refusal above the cap) — not folded, VPR1-06. The pipeline seat's own notes: §2.7
  `LightSource.host` (model, = V-MC1-03), §7.5 older `convert` events (determinism, = VD1-02), §13.2 bars (scope, VPR1-17)
  — none folded.
* **DEFERRAL-WORDING.** None in the new text ("later" only temporal).
* **BROKEN-REFERENCE.** Every J id (16) and § pointer (23) the new text cites resolves; §4.9's "`import` rows (§4.7 S10b)"
  resolves to S10b's gate trade rows; II.6's "§7.5" for an older `convert` event's `tunnel` does not (= VD1-02, determinism).
* **NEW-PROBLEM.** VPR1-01/-02 (S10a re-homing vs F-SITING and the dossier population), VPR1-03 (impairments), VPR1-11
  (underground windows); the relief class under the geology row (VPR1-12) is a pre-existing gap the new rule makes
  load-bearing.
* **Gates.** (a) No held part in the part (grep: no 160 / 162, no "visibly differ", no cast-shadow claim, no 16-cell
  support; identical to the pre-r1 part). (b) The new text names builds where it states a reference's behaviour ("trees
  ordered as NG 1.2.2 orders them"); "no reference has an underground" is a general statement, as II.7.5's emulation line.
  (c) No reference identifier; the two new colour values are our own (the repair's C2 run: 0 hits).
* **Owner fidelity (63–72, 20 (h), 101).** Unchanged from r0 except item 72 (d‴): the owner's "bounds … of what any
  building inside of it can be" is honoured by the range, but the re-homing path must not trade a dossier household's
  housing for it (VPR1-01).

## 4. Issues (each with its owning part and the exact required change)

| id | sev | kind | owner | item / where | claim | required change |
|---|---|---|---|---|---|---|
| VPR1-01 | major | new-problem | pipeline | 72 (§4.5 (5); J-A72.50) | Round 1's S10a re-homing sends "a household no such district holds" to "a siting shortfall of F-SITING's ladder (§5.2)", whose last rung reduces the manifest — which F-SITING, §7.7 item 2 and T19-4 forbid for "the households that fill a dossier's population" (housed by the dossier request, J-A20.42). Under a dossier every household fills its population, so the path can drop one; nothing else houses it. | §4.5 (5): replace "a household no such district holds being a siting shortfall of F-SITING's ladder (§5.2)" with "a household no such district holds going to the district, in S7b's order, whose written range lies nearest its band and whose capacity holds it, its band read at that range's nearest end (a derived band, reported) — never a shortfall, so the population stays whole (§7.7 item 2; §13.2 T19-4); only a household that fills no dossier's population and that no district's capacity holds meets F-SITING's ladder (§5.2)". J-A72.50's index row and Part A: "a household no district holds left to F-SITING's ladder" → "a household no district's range admits housed in the district of the nearest range at that range's nearest band, reported; F-SITING only for a household outside a dossier's population that no capacity holds". |
| VPR1-02 | minor | conflict | determinism | 72 (§5.2 F-SITING row) | The row's ladder says "cross-district moves only in the allocation's own reconcile, S7b" and its detection names S10b and S11's overflow pass; §4.5 (5)'s S10a re-homing (J-A72.50) is a second cross-district move and a new detection point. | F-SITING detection cell: add "S10a's band-range re-homing (§4.5 (5)) finds no district whose written range admits a household and whose capacity holds it"; ladder: "cross-district moves only in the allocation's own reconcile, S7b" → "cross-district moves only in the allocation's own reconcile (S7b) and in S10a's band-range re-homing (§4.5 (5); J-A72.50)". |
| VPR1-03 | minor | new-problem | pipeline | 88 (§4.5 (6); §10.2 `PortRows.impairments`) | The hook reads non-physical impairments from "each live `ConditionOverlay` … whose archetype is a non-physical impairment type … lowers every instance's institution term". Impairments are per institution (the digest's `Institution.impairments`, §14; §7.7's F4 row "the non-physical … the power slice's dial only"; item 88's "impairment-type table (physical → condition; non-physical → item 79's dial)"), and `ConditionOverlay` is a settlement-wide condition read by §8.2, §4.11 and the clerk (§2.7). The hook reads the wrong record and acts town-wide; `conditionSteps` is commented for physical types only. | §4.5 (6): replace "each live `ConditionOverlay` (§2.7) whose archetype is a non-physical impairment type (`PortRows.impairments`, `physical: false`) lowers every instance's institution term (below) by `conditionSteps × severity × dial.conditionStep`" with "a dossier institution's visible impairment whose type is a non-physical row of `PortRows.impairments` (`physical: false`; §7.7's F4 row) lowers that institution's own term (below) by `conditionSteps × severity × dial.conditionStep`, `severity` the impairment's". §10.2 `conditionSteps` comment → "condition steps per unit of severity: a physical type's on the building (§7.7 F4), a non-physical type's on the institution's dial term (§4.5 (6))". J-A88.42 Part A: "a non-physical impairment lowering the institution term" → "a non-physical impairment lowering the impaired institution's own dial term". |
| VPR1-04 | minor | partial | pipeline | 88, 65 (II.7.6 *A buried old town*; §4.2 S2) | "None exists at generation unless the staged `HistoryHint` names such a scar — a `fire` or `flood` … — when the port fills it", and S2 routes those scars here, but no rule says which region a scar buries, how deep, at which stage or as what record; the buried town is otherwise made only by a `raiseGrade` event over a named region, and the creation week shows a finished town (J-A67.47). | II.7.6: replace that sentence with "At generation none exists unless the port fills the staged `HistoryHint` (item 88) with a `fire` or `flood` scar (§4.2 S2) of `severity` ≥ `buried.scarSeverity` (0.5): the most severe such scar (ties: the oldest) makes one `buried` system, in the systems' stage order after vaults — its region the growth-stage-1 districts, its galleries that region's way centrelines and its chambers their buildings' ground storeys, laid `200 + 200 × severity` cm below the present grade; the town above is generated on the present grade as it stands, no `raiseGrade` event recorded and nothing cleared (our own rows, calibratable, `extension`); with the rows empty, none". Add the clause to J-A65.46's Part A entry. |
| VPR1-05 | minor | conflict | pipeline | 81 (§4.11 *The rung at an epoch*) | = VKC1-04 (kernel repair's note 1, unfolded): "each raster growing by whole cells as §3.2 (9) states, every old cell unchanged" — §3.2 (9) keeps every stored height but recomputes the `hydro` fields over the grown grid. | Replace "each raster growing by whole cells as §3.2 (9) states, every old cell unchanged." with "each raster growing by whole cells as §3.2 (9) states, every stored height unchanged and the flow fields recomputed over the grown grid." |
| VPR1-06 | minor | partial | pipeline | 81 (§4.11 *The rung at an epoch*) | = VD1-14 (scope repair's note 2, unfolded): "A dossier below 1 500 is refused by the port (§7.7, item 81) and never reaches an epoch" omits the refusal above the 120 000 cap (§1.1; J-A81.01) made at every absorb. | → "A dossier outside the ladder — below 1 500, or above the 120 000 cap — is refused by the port (§7.7 item 15, item 81; §1.1; J-A81.01) and never reaches an epoch" (item 15's own sentence is VD1-01, determinism). |
| VPR1-07 | minor | missing | pipeline | 81, 65 (§4.11 *The rung at an epoch*) | = VKC1-05: §3.2 (9) grows every underground part whose ring is the frame by (a) and (b), clearing its L1 faces beside the old ring, but §4.11 names only the ground's re-derivers. | Replace "(the hinterland unit for the hinterland's, a district's S8–S12b for a district's)" with "(the hinterland unit for the hinterland's, a district's S8–S12b for a district's; on each underground part §3.2 (9) grows, that part's stages for its cleared faces — part 0's network stage its bands by `corridorUnion` (II.7.2) and II.7.3's stage its plots, each other system's stage its own part (II.7.6))". |
| VPR1-08 | minor | conflict | pipeline | 63, 20 (h) (§4.7 *Concealed institutions* (1)) | = V-MC1-02 (determinism and model repairs' notes, unfolded): "The resolved mode and its source are stored on the concealed use; … a dossier value outranks a map override as it does for `knownTo` (§7.7 item 7)" — §2.7 stores no source for a dossier mode (J-A63.22) and a dossier-set value is refused, not overridden (J-A20.77; §7.7 item 7). | Replace with "The resolved mode is stored on the concealed use, with its map-side source (`Use.concealmentSource`, §2.7) when the dossier gave none; a map edit sets a mode the dossier did not set by `setAttr` (§7.1), and one the dossier set is dossier-owned, a map `setAttr` of it refused (§7.7 items 7, 11; J-A20.77, J-A63.22)". |
| VPR1-09 | minor | conflict | pipeline | 66 (II.7.6 *The pieces an access edit generates*) | = VD1-10 (determinism repair's note, unfolded): "the closure rule — one event, one transaction, …" against §7.3 item 9 (a) ("its batches … commit together") and J-A66.71. | "one event, one transaction" → "one event whose batches commit together". |
| VPR1-10 | minor | conflict | pipeline | 67 (§4.10) | Rendering repair's note, unfolded: "a building's description reads its Works stage at the document's week", while §4.11 (9) has every drawing, export and reader draw the document's week unless the viewer's `week` key names another (the exports already read the drawn week, VRC-12). | → "a building's description reads its Works stage at the drawn week (§4.11's *Which week is drawn*: the document's week unless the viewer's `week` key names another)". |
| VPR1-11 | minor | conflict | pipeline | 68 (II.7.3 *The sewer's light rows*; II.7.5 *Light*) | The light table's rows are said to "put a light at every sewer-front dwelling's door and window" and "a light at every door and window", but `LightRule.host` has no window (round 1 added door, tunnel, gallery, chamber and access point), and window lights are §8.4's derived `live.windows`, never records (§2.7). | II.7.3: "put a light at every sewer-front dwelling's door and window and at" → "put a light at every sewer-front dwelling's door — its windows lit by §8.4's derived window lights — and at"; II.7.5: "a light at every door and window, along walkways" → "a light at every door (the windows lit by §8.4's derived window lights), along walkways (`way` rows, arena `underground`)". |
| VPR1-12 | minor | partial | pipeline | 65 (§4.2 S0, S1 (1), S1 (10); §4.9 farm modes) | Round 1's geology row is keyed on "the relief class S1 drew in (1)", as §4.9's `FarmModeRow.relief` ("the relief character S1 drew") is, but no toggle, table, draw or dossier row chooses the relief class: S1 (1) only scales its amplitude "by relief class". | §4.2 S0 site request: add `relief: 'auto'\|'plain'\|'rolling'\|'hilly'\|'mountainous' /* default 'auto': the per-rung feature table's relief row, drawn on blueprint.features with the other auto features and recorded in autoResolved (own weights plain 0.35, rolling 0.35, hilly 0.2, mountainous 0.1; calibratable, extension); a dossier's site.terrain sets it by §7.7 DR1 */`; S1 (1) "(by relief class —" → "(by S0's relief class —"; S1 (10) "at the relief class S1 drew in (1)" → "at S0's relief class"; §4.9 "the relief character S1 drew" → "S0's relief class". |
| VPR1-13 | minor | partial | pipeline | 88 (§10.2 `PortRows.hinterland`; §4.9) | `hinterland: { importPct; foodChain; farmlandScale }[]` is an array, while §4.9's hook reads "§10.2's staged hinterland row" and one `importPct`, and item 88 declares "a hinterland row". | §10.2: `hinterland: { importPct: number /* 0–1 */; foodChain: Record<string, boolean>; farmlandScale: number /* §4.9's arable demand × max(0, 1 − importPct × farmlandScale) */ } \| null /* one row; null while empty */`, as `crime` and `legitimacy` are. |
| VPR1-14 | minor | stale | pipeline | 50, 70 (§4.7 S11 *Entrances*) | = V-MC1-08: "the main entrance on the access edge where §2.6's rule 1 places it" — rule 1 places it on the footprint side facing that edge. | → "the main entrance on the footprint side facing the plot's frontage access edge, where §2.6's rule 1 places it". |
| VPR1-15 | minor | partial | determinism | 65 (§6.1 readers list) | Round 1's geology flag reads "one uniform that S0 draws for it on `blueprint.features`" (§4.2 S1 (10)); §6.1 names `blueprint.features` as "S0's per-rung feature draws" and its readers list states no geology draw or its key, so its place among the feature draws (and whether it moves a later one) is unstated. | §6.1 readers list: add "- `blueprint.features` also draws the geology flag's uniform (§4.2 S1 (10), item 65; J-A65.49) — and, with VPR1-12, the relief class — keyed as S0's other auto features are, appended after them, so no existing feature's draw moves;". |
| VPR1-16 | minor | conflict | determinism | 77 (§7.7 item 2 trade; DR3) | §7.7 says "The bearings are S3 (4)'s requested external bearings (§4.2) and carry the gate trade weights", while round 1's S3 (4) scores only "the bearing of a `road` partner of the trade slice" (J-A77.42): a sea or river partner's bearing is no land-gate request; its weight goes to the harbour or water gate (§4.3). | §7.7: → "The `road` partners' bearings are among S3 (4)'s requested external bearings (§4.2); every partner's bearing and weight feed `TradeFlow`'s gate and harbour weights (§4.3)"; DR3's rule cell "read by S3 as requested bearings (§4.2)" → "its `road` partners' bearings read by S3 (4) as requested bearings (§4.2)". |
| VPR1-17 | minor | partial | scope | 65, 70, 72, 77, 88 (§13.2) | The pipeline repair's note 6, unfolded (scope's repair landed first): no bar proves J-A65.49, J-A77.42's timing, J-A70.49, J-A72.50's re-homing or J-A88.42's inert-while-empty readers. | §13.2: item 65 "(T65-7) over 1 000 seeds per relief class the `auto` geology flag's shares lie within ± 3 s.e. of its row, and it is `ordinary` under the parity presets and on every sky island's terrain"; T77-1's weight clauses "; `TradeFlow.gates` computed at S3 (7) equals its value after S4, and the principal market's siting reads it"; item 70 "(T70-6) at generation no plot outside a shanty-typed district is `informal`, and the class mix never yields a `shack`, `tent` or `lean_to_shelter`"; item 72 "(T72-9) after S10a every household's band lies inside its district's written range, each re-homing reported, and every household of a dossier fixture housed"; item 88 "(T88-1) with `PortRows`, `Recipe.history` and every `PowerRelation` empty, the staged readers (§4.2 S2, §4.5, §4.6, §4.9, II.7.3, II.7.5) leave the model digest byte-identical to the base golden". |

## 5. Sibling r1 findings touching this part — read, concurred, not re-filed (their owners' rows)

VD1-01 (§7.7 item 15 lacks the above-cap refusal §1.1, §14 and D-33 cite — the companion of VPR1-06); VD1-02 (§7.5 lacks
the older `convert` event's `tunnel` → `element` rule II.6 cites); VD1-03 (the dossier's crime counted twice in II.7.5's
size law once the port fills §10.2's row — `disorder` filled from crime facts and §4.6's `c`; the fix is at §7.7 layer 2
and DR17, so II.7.5 stays); V-MC1-01 (§2.7 `Use.concealmentSource`'s override clause, VPR1-08's model twin); V-MC1-03
(§2.7 `LightSource.host` lacks tunnel, access point, castle and shrine); V-MC1-05 (§2.7 `HistoryHint` "an S0 input",
while round 1 reads it at S2); VKC1-06 (T81-1 lacks the raster clause). Each is real on reading the cited lines of the live
design. Six sibling rows on this part are filed above under their ids (VPR1-05, -06, -07, -08, -09, -14), with the
siblings' texts.

## 6. Held parts (gate (a)) — none in this part; listed so nothing is lost

Item 35 (support: the position check on 160 of 162 faces), item 68 (g) (the MFCG cast-shadow absence; VG 1.6.9's shadow
and night layers; Dwellings' shading), item 52 (the references' visibly different session maps), item 60's support — none
written here (grep of the live part, identical to the pre-r1 part). Released and applied with labelled wording: item 37
(§4.6 step 5), item 58 (f) (II.2), item 59's timing (another part). Rejected: item 49's deletion (scope's §1.4).

## 7. CONFIRMED versus PLAUSIBLE

CONFIRMED (read and executed): the design and rationale hashes (024c57da…, 33b21ca8…); the part extracted from the pre-r1
archive and the live design and word-diffed (189 changed lines, every hunk read); every repaired paragraph read whole in the
live design with its cross-references (§3.2 (9), §5.2 F-SITING, §6.1, §7.5, §7.7 items 2, 7, 15, F4, DR3, §2.7, §13.2
T19-4 / T65 / T70 / T72 / T77, the rationale's J-A72.50, J-A65.46, J-A81.41, J-A88.42); each repaired J id once in the
index and once in Part A; every J id and § pointer of the new text resolving; the held-part, deferral and stale greps; the
three sibling r1 reports. PLAUSIBLE (reasoning): that each required change repairs its issue without a new conflict, and the
three proposed defaults — VPR1-01's nearest-range housing, VPR1-04's scar rule (`scarSeverity` 0.5, 200 + 200 × severity
cm, the stage-1 districts), VPR1-12's relief weights — which are our own and calibratable. No document check was run: this
seat edits no design file.
