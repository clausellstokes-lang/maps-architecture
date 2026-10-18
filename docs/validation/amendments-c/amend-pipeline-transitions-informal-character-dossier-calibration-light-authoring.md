# Amendments c + d + e — seat T (pipeline: transitions, informal, character, dossier, calibration, light, authoring) — report

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat amendments-c/amend-pipeline-transitions-informal-character-dossier-calibration-light-authoring; queued in docs/FABLE-REVIEW-QUEUE.md.

> PROGRESS (kill-safe ledger; one line per item: planned sections | done blocks)
> ITEM 67: planned §4.11 REPLACE (Works, the clock) | done §4.11 REPLACE (block 7: Works paragraph, WorksTable, decay Works, epoch step (j), retirement)
> ITEM 76: planned §4.11 REPLACE (the week, dating rungs, season rows, cadence, tolerance); §10.3 sentence | done §4.11 REPLACE (block 7: the clock, CalendarRow, cadence, tolerance, per-year rates, EpochInputs.week); §10.3 APPEND (block 9)
> ITEM 70: planned §4.7 APPEND (Informal clusters); §4.11 (e) lines; §10.3 pointer | done §4.7 APPEND (block 5); §4.11 (block 7); §10.2 rows (block 8); §10.3 and §10.4 (blocks 9, 10); §4.10 (block 6)
> ITEM 71: planned §4.7 APPEND (Class mix inside a band); §4.11 pointer | done §4.7 APPEND (block 5); §4.11 rung 3 (block 7); §10.2 rows (block 8)
> ITEM 72: planned §4.5 APPEND (home); §4.7 lines; §4.3 way weight; §4.11 epoch step; §10.2 row types; §10.3; §10.4; §4.1 S12c | done blocks 1, 2, 3, 5, 6, 7, 8, 9, 10
> ITEM 68: planned §4.7 APPEND (Light sources); §4.11 line; §10.3 lit windows | done blocks 5, 7, 9
> ITEM 20 (h): planned §4.11 rung-1 wording; §10.3 wording | done block 7 (rung 1); §10.3 carries no such wording (checked)
> ITEMS 75, 77, 78, 79, 80, 81, 88: planned §4.11 folds; §4.3 TradeFlow; §4.7 line; §10.2 rows; §10.3; PART III; §4.6 | done blocks 2, 4, 5, 7, 8, 9, 11
> ITEM 82: planned §10.4 claimed names; §10.2 notice and arcane rows; §4.7 notice line | done blocks 5, 8, 10
> ITEM 101: planned §4.1 read-ahead; §4.3 two-point road | done blocks 1, 2
> ITEM 50: planned none (B folds §4.7, D folds §10.2) | done — checked both (§5 below)
> J-ROWS / RATIONALE-A: planned 42 rows each | done blocks 12, 13 (42 + 42)
> VERIFY: apply on copies (alone, one-pass with all files, two-pass); doc checks three copies; gate (c) scan | done — §8 (first seat, 02:07; the doc checks cut off by the usage limit)
> REPORT, queue row, LANDED | queue row done (first seat); report §1–§7 done; LANDED was NOT written (no line in docs/lane-events.log)
> CONTINUE (2026-09-28 03:02, same stand-in): stray mid-file END removed; §4.11 *Works* (3) and (10) now cite §6.1 for the `works` key (E2 owns it, J-A67.61) — note 4 rewritten; E2's asks checked (note 4 (i)); re-verify | done — §8; doc checks | done — §9; LANDED | done (queue row not re-added: resumed from disk)

## 1. Outcome

Seat T's thirteen blocks are in `docs/validation/amendments-c/blocks-pipeline-transitions-informal-character-dossier-calibration-light-authoring.md`
(written on design sha256 `1c23190f…`, rationale `0be40dfd…`): REPLACE §4.1 and §4.11 (T-owned, built from the live
text by exact substitutions, every other line byte-identical); APPEND TO SECTION §4.3, §4.5, §4.6, §4.7, §4.10, §10.2,
§10.3, §10.4 and PART III; 42 J-ROWS and 42 RATIONALE-A entries. The five home items are designed as mechanisms: item 67
as the `Works` record's derivation, stages, durations, pauses and restraint in §4.11; item 76 as §4.11's clock (the week,
the dating rungs, one calendar, the cadence, the ± 5 % tolerance, per-year rates); item 70 as tenure and a paths-first
cluster packing in §4.7; item 71 as a class draw above the template with block-level prestige assignment in §4.7; item 72
as §4.5's character vector, identities, three distributions, three dials, band range, partition and pressure, computed by
a new town-wide step S12c (§4.1). **Needs a ruling (manager):** the §4.5 APPEND is LOST under the assembler's one-pass
order (executed: `apply-blocks.py` audit "LOST — overwritten by a later REPLACE", C's §4.5 REPLACE sorting after this
file); it applies cleanly under the two-pass order route §C.9.2 recommends (executed, audit 0 not OK). **Nothing is held**
(owner-rule items and file d/e items carry no HOLD part). CONFIRMED: the apply receipts, the id and heading checks and the
doc-check counts of §8 and §9 were executed (re-run on the CONTINUE: this file adds no unreviewed hit); PLAUSIBLE: every ruling (the owner's words are interpreted, vetoable), the default
row values, and that the parallel seats fold the notes of §7 as written.

## 2. Per item — where it landed and the mechanism in plain words

### Item 67 (home) — transitions on a weekly clock (§4.11 *Works*; J-A67.41–J-A67.48)
Every physical change (build, extension, demolition, repair, conversion, decay step, clearance) is still decided at once by
its event, so the model stays a function of the log; when that event carries a week (an epoch, a dated dossier change, a
scheduled hand edit) it also creates a `Works` record, and the stage drawn at any week is computed from the record
(working weeks elapsed ÷ duration, masonry pausing in winter by the calendar), never stored. The owner's question is
answered by a stage table: build STAKED → GROUND BROKEN → FOUNDATIONS → WALLS RISING → ROOF FRAMED → ROOFED → FINISHED;
extension (the old building in use, the roof opened at ROOF FRAMED, the joint wall opened at FINISHED); demolition EMPTIED →
STRIPPED → ROOFLESS SHELL → RUBBLE → CLEARED; the ruin ladder's drawn stages ABANDONED → DECAYING → ROOFLESS → COLLAPSED →
OVERGROWN; repair backwards under scaffolding; fire as an instant charred shell. Durations come from `WorksTable` (a small
timber house 2–6 weeks, a manor 1–3 years, a cathedral part by part), drawn once on E2's `works` concern (§6.1, J-A67.61) and scaled by the band's labour
factor (J-A67.42, richer builders faster); the decay Works
carries the decline table's dwell band; plots joined or split keep their old lines drawn dashed until the work clears
them; heights, shadows, lights, occupancy, plans and descriptions read the stage. An epoch's Works start spread over its
span, so a boom town shows many scaffolds and a steady one few; generation and the parity presets draw everything
finished. Rulings: route rulings 1–8 taken as J-A76.41 (clock unit), J-A76.45 (per-year rates), J-A67.41 (existence and
demolition), J-A67.43 (material), J-A67.44 (plots), J-A67.45 (scrubbing), J-A76.42 (season → one calendar), plus J-A67.42,
.46, .47, .48; B's J-A67.49 (the mutator decides at once) is honoured and the epoch-spread mutation sentence ruled the
same way (RV-pipeline-gen-7).

### Item 76 (home) — the clock contract (§4.11 *The clock*; J-A76.41–J-A76.45)
The map's week is SettlementForge's `calendar.elapsedWeeks`; `EpochInputs.week` is absolute and `years` derived from it
(one field serves item 67). The port dates a change by the receipt ticks, then the outcome id's week, then
`HostContext.week`, else applies it finished. One `CalendarRow` (the dossier's `sf445` or our default of the same shape)
gives the season. Epochs fold at each 52-week boundary or on a population move above ± 5 %, never per tick; every chance is
per year and composed over the epoch's span; a fractional churn cap keeps its remainder as a chance. The `@plat/sim` hour
clock is never compared with the week (§10.3).

### Item 70 (home) — informal clusters (§4.7 *Informal clusters*; J-A70.41–J-A70.48)
Tenure is derived (owned, rented, common, informal). An informal squalid or poor plot with no standing formal building
takes the `cluster` arrangement: a trunk footpath from each access edge with alternating branches, then shacks, tents or
lean-to shelters fronting the paths with a fire gap, each with its own door on a path — so the owner's "each one deserving
of a door" holds by construction. Households per structure come from a rung × band row, clamped by the one capacity
function. FTG's trigger and staging stay the emulation default (J-A27.43 stands: the owner named no wall); lean-tos never
stand in a wall strip; the parity presets keep FTG's tents row and MFCG's hovel. Over time clusters accrete as short Works,
burn fast, and are formalised by rung 3.

### Item 71 (home) — the class mix inside a band (§4.7 *Class mix inside a band*; J-A71.41–J-A71.44)
S10b draws each residential plot's class (hovel … manor) from band rows interpolated along the value, the manor share
rising to all manors in the rich row; the town's `wealthLevel` shifts the weights; each block's drawn classes go largest
first onto the plots with the best frontage (main street, square, park, corner, water), hard rows first, big classes
joining plots. Parity presets: a step at each cut.

### Item 72 (home) — what defines a neighbourhood (§4.5 APPEND; §4.1 S12c; J-A72.40–J-A72.49)
A district keeps its feature-named kind for building; after placement a town-wide step S12c computes its character vector
(lot mix, political alignment, trade position, economic role, relations to main roads and anchor institutions), all
weighted by significance (value, not volume). Classes are dispersed, district-defining (one district per dossier
instance, raised to a target share, never filling it) or singular. Quarter identities are table rows (three churches or
one cathedral → the religious quarter), else the dominant component, else a plain residential identity by band — never
a zoning kind. Three dials (institution, quarter, economy) enter the prosperity field with declared weights; each
district's band range (from its value) bounds every prosperity-driven state of its buildings, the clamped excess kept as
a persisted pressure that lifts the district over epochs. Shared buildings are partitioned by relative standing or share.
Names follow the identity past a hysteresis, old names kept (§10.4).

### Referencing items
* **20 (h):** §4.11 rung 1 now reads "the households that fill its population" (ruling 3); §10.3 has no such wording.
* **50:** nothing of T's (B folded §4.7's Entrances phrase; D's §10.2 entrance sentence names the owner's rule) — checked.
* **68:** §4.7 *Light sources* (the `LightRule` table with a `system` column for D's underground rows; spacing solved from a
  target illuminance; half-strip alternation; FTG preset at the main entrance; MFCG none); §4.11 (lights follow hosts, unlit
  before FINISHED); §10.3 lit windows.
* **75:** `EpochInputs.dossier` events keep `dossierChange`; dated changes start Works at their week.
* **77:** `TradeFlow` declared at §4.3 (J-A77.41); recomputed before and after each epoch's growth.
* **78, 79:** the sector set, sector and power columns and links typed with defaults in §10.2; the dials' applied
  standings and shares by §4.11's hysteresis; §10.3's faction field reads the standings.
* **80:** §4.7's returning-element line and §4.11's reopen path; a listed ruin stays present.
* **81:** §4.11 *The rung at an epoch* (the frame grows by an S1 ring, never shrinks; J-A81.41, answering the kernel seat's
  finding); PART III APPEND for the sub-floor dossier.
* **82:** §10.4 claimed names (matching stays §7.7's), §4.7 and §10.2 notice posts (J-A82.41), the arcane identity row.
* **88:** §4.6 crime term (J-A88.41), §10.2 `PortRows` schema-complete and empty, §4.11 `ConditionOverlay` and
  `DepositSite` readers.
* **101:** §4.1 read-ahead of a skeleton's drawn declarations (J-A101.41); §4.3 two-point roads.

## 3. Folds of other seats' phrases and the review items (route §C.2, §C.9.3)
Item 63 (a concealed use relocates like any use, its front an ordinary business — §4.11 use step (6)); item 65 (the union
names D's `RaiseGrade` and `ClearUndercity`; galleries and chambers take the underground's persistence rate); RV-pipeline-
gen-7 (the epoch-spread mutation decides at once; the Works shows it); **J-Fpipe-2** (Fable's carve identity-exception
paragraph, `docs/fable-review/main/blocks-pipeline.md` B-1, folded beside the carve's batches with its J row and Part A
entry — its own text invited pass c's §4.11 editor to fold it — its meaning unchanged, eight phrases reworded for the
document checks' C3 rule (a date form, citation orders); see note 11).

## 4. Rulings (all vetoable; 42 index rows and Part A entries in the block file)
J-A67.41–.48, J-A76.41–.45, J-A70.41–.48, J-A71.41–.44, J-A72.40–.49, J-A77.41, J-A81.41, J-A101.41, J-A68.41, J-A82.41,
J-A88.41, J-Fpipe-2 (carried). Two deviations from the route's recommendations, recorded: (a) `cancelWorks` ends a Works' timeline only — aborting
the change itself is its undo (J-A67.41); (b) route ruling 3's "occupants move in by the
Works' completion event" became "housed at a week only from FINISHED", derived, so no completion event is logged
(J-A67.41). One route suggestion NOT taken: lean-tos "on the town wall's outer strip" (J-A70.47: strips stay unbuildable).

## 5. Judged satisfied or not applicable to this part
Item 50 (B and D folded it; nothing of T's). Items 73, 74, 83–87 (no pipeline text routed to T). Item 20 (h)'s other
wording sites are other seats'. Kernel operations: none needed (the cluster packer uses existing operations); the frame
growth's kernel sentence is K's (note 9).

## 6. Held parts
None in this seat's items. The seat wrote no claim that depends on a held part (the `MFCG` preset "places no light" is
stated as our preset's behaviour, never as a claim about MFCG — route §C.4's 68 (g) row).
One held part touches a referencing item and is listed so nothing is lost: **item 68 (g), "MFCG draws no cast shadows" —
HOLD — PLAUSIBLE** (route, item 68's row); it is NOT applied here (its home is the rendering seat's §8.4; this seat's blocks
state no shadow claim about MFCG — grep, 0 lines). Items 73–88 and 101 carry no HOLD part (route §C.9.4 and its item-101 row).

## 7. CROSS-PART NOTES (the other editors run in parallel; the verifiers check both sides)
1. **Manager / assembler — REQUIRED.** Apply every REPLACE first, then every INSERT AFTER / APPEND TO SECTION (route
   §C.9.2). Under the one-pass order this file's §4.5 APPEND (item 72's home) is erased by C's §4.5 REPLACE (executed
   receipt, §8). If the two-pass order is not adopted, the repair round must re-apply block 3 verbatim after C's REPLACE.
2. **Model (M).** (a) §2.7 `Works { id; kind: 'build'|'extend'|'demolish'|'repair'|'convert'|'decay'|'clear'; target: {
   building?: Id; parts?: Id[] /* wings or storeys a mutation adds or subtracts */; plots?: Id[] }; startWeek: number;
   durationWeeks: number /* working weeks */; row: string /* WorksTable row key */; cause: { seq: number; mutation?: number };
   before?: { parts: { ring: PolygonCm; heights: Heights; roof: RoofSpec['kind'] }[]; bounds: { line: PolylineCm; treatment:
   PlotBound['treatment'] }[] }; lifecycle: Lifecycle }` — model data in the model digest, retired by epochs; its registry
   row. (b) §2.6 `Building.works?: Id` (the running Works); no new `Existence` value; a `framed` roof is a drawn state only
   (no `RoofSpec.kind`); the classes `shack`, `tent`, `lean_to_shelter` (data); a cluster structure's main entrance faces
   its footpath (rule 1's reading, J-A70.44). (c) §2.5 `Plot.tenure: 'owned'|'rented'|'common'|'informal'` (derived,
   `setAttr` override); `SitePlan.arrangement` gains `'cluster'`; `YardPart.kind` `footpath` (data); `CharacterVector = {
   mix: Record<string, number>; powers: Record<string, number>; trade: number; tradeBearingCdeg?: Cdeg; sectors:
   Record<string, number>; mainRoad: number; anchors: { institution: Id; weight: number }[] }` on `District.character`;
   `District.identity?: { row: string; source: 'dossier'|'emergent'|'dominant'|'plain'; sinceWeek: number }`,
   `District.bandRange: [string, string]` (written at S10a), `District.pressure: number` (epoch-written, in the digest),
   `District.nameHistory?: NameRef[]`; the per-district input is E1's `DistrictIntent` (§7.7; J-A72.41) — `District.character`
   and `Recipe.character` keep the name only for the derived profile and its overrides as M rules. (d) §2.7
   `LightSource.intensity` in candela, `heightCm`, `radiusCm`; `Pin.kind` `notice`; `Institution.powers?`. (e) §2.9 the
   per-viewer view key `week` (default: the document's current week, derived from the last folded event; outside every
   digest); `Document.derived.tradeFlow?: TradeFlow` (type §4.3). (f) §2.8 `ElaborationRecord.inputs` gains the Works stage
   for the plan rung (item 67 (j)).
3. **Determinism E1 (§7.7).** (a) Item 1 dates changes by §4.11 *The clock* (2); item 2's `CircumstanceTimeline` in weeks;
   item 3's lapse "by more than the roster tolerance (§4.11, J-A76.43)"; item 6 "the port groups dossier changes into epochs
   by §4.11's cadence". (b) `PowerStanding.appliedStanding` is the value §4.11's *The dials' inputs over epochs* gives
   (`dial.hysteresis` 0.05, a fold over the epochs); sectors have no stored applied field. (c) The trade fill gives
   partners' bearings, modes and weights; the partner-to-gate assignment and the ways' weights are §4.3's `TradeFlow`
   (J-A77.41) — the derivation table's trade row points there. (d) Layer 2's input is `DistrictIntent` (J-A72.41; E1's block already so); a
   district-defining dossier institution is a `neighbourhood` assignment with `existence: 'dossier'`, one district per
   instance (§4.5 (3)). (e) The class-mix shift reads `wealthLevel` directly in §4.7 (no new expansion row needed); the
   whole-neighbourhood assignment's "class mix" is an override of §4.7's mix inside the district. (f) Derivation-table
   pointers: households → §4.2 S2, §10.2, §4.7 (class mix); institution class and band → §4.7 S11, §4.5 (3); trade
   direction → §4.3; district kinds and names → §4.5 (4), §10.4; chance entries `siting`, `alloc.district`, `works`,
   `naming`. (g) Item 82: §10.4 points to §7.7's claim rule for matching.
4. **Determinism E2 (§5, §6, §7.1–§7.6).** (a) §6.1: E2's `works` concern (J-A67.61, keyed by the target's lineage with
   the start week as creation index) is the one T's §4.11 cites (T's J-A67.42 only scales the drawn duration by the band's
   labour factor; T's §4.11 no longer restates the key). **Add to §6.1's `works` sentence the epoch-start offset** (§4.11
   *Works* (10), J-A67.48): for a Works an epoch starts, the stream is keyed by the target's lineage with the EPOCH's week as
   creation index and gives the start offset first (uniform over the weeks since the previous epoch) and the duration
   second; a Works started by a dated change or a scheduled edit keys by its given start week and draws the duration alone
   — so the offset never needs the start week it produces, and the two draws never share one value. `pin.light` (the
   route's; J-A68.61 already so); `epoch.transform` also keyed by (district, kind, epoch) for a fractional churn cap (no
   new concern). (b) §6.2: `Works` and `District.pressure` in the
   model digest, the stage never; character records and `TradeFlow` derived. (c) §6.3: the epoch rename case (J-A72.44)
   and a kind re-typed at an epoch as a lifecycle `edit`. (d) §7.1: E2's `startWorks { target; kind; startWeek? }` and `cancelWorks { works }` fit §4.11 if `startWorks` is
   the change of its `kind` on its `target`, decided at once, with its Works starting at `startWeek` (a `build` also needs
   its class — carry it, or an optional wrapped change event), and `cancelWorks` ends the Works with the change standing,
   drawn finished (aborting the change is its undo; J-A67.41); `setAttr` on a Works (start, duration);
   `setAttr(tenure)`; the district's `identity` override; the `week` view key not logged. (e) §7.4: lifecycle rows for
   Works and the character records; a `creation`-flagged drawn declaration is satisfied by §4.1's read-ahead and its fold
   inserts nothing (J-A101.41). (f) §7.6: `WorksTable`, `CalendarRow`, `LightRule`, the class-mix, cluster, tenure,
   identity, band-range, link and sector rows, and the `dial.*`, `pressure.*`, `identity.*`, `character.*`,
   `trade.kernelScale`, `dispersal.random`, `crime.*`, `lights.*` rows editable; the parity presets' values (`works.enabled`
   false, the extensions zero or a step). (g) §5.2 F-PLOT: a plot too narrow for a cluster takes the hovel (reported); §5.3
   rows: every cluster structure's door on a path reaching an access edge; the fire gap; households within row and
   capacity; the band-range clamp; partition weights sum to one; one district per district-defining instance.
   (h) Your J-A76.72 (§7.5's older weekless `epoch`): write "its predecessor's week plus round(`years` × 52)" — weeks are
   integers (§4.11 *Works* (2)) and §4.11's `EpochInputs.week` comment already rounds. (i) Your note 2 to T, checked on the
   CONTINUE (2026-09-28 03:10): (a) §4.11 names `works` and §4.7's light paragraph names `pin.light` (§6.1); durations are
   drawn, never table-exact, so `works` stays; (b) §4.11 *Works* (1) states what `cancelWorks` leaves (the change stands,
   drawn finished); (d) §4.5 (9) and §4.11 point to §6.3's epoch case; (e) consistent up to the rounding of (h).
5. **Rendering (R).** §8.2 `states` rows for the stage names of §4.11's table (and CHARRED, REFIT, dashed pending lines, the
   `framed` roof); §8.5 the city-band stage glyph, the cluster speckle exception and the change marker on a stage change;
   §8.4 shadows from `heightsAt`, lights unlit before FINISHED, window lights as derived sources; §11.1 exports at the drawn
   week, the JSON export's character vector, identity, band range and former names; §9.1 one cluster label; §11.3 / §11.4
   the host sets the `week` view key for its campaign week.
6. **Scope S2 (§13.2 group).** T67: stage at week w a pure function of the record and w; scrubbing reproduces every drawing;
   a Works never leaves a plot without access; old lines drawn until their clearing stage; a demolition's households
   rehoused before EMPTIED; no Works at generation or under the parity presets (goldens unchanged); an epoch's share under
   works near growth × mean duration ÷ span; a decay Works within its dwell band. T76: an epoch at each 52-week boundary and
   at a move over 5 %, none for a 2 % drift; `years` = Δweeks ÷ 52; per-year rates give equal expected firings for weekly and
   decade cadences. T70: a door per structure on a path reaching an access edge; the fire gap; households within row and
   capacity; no cluster on a middle-floored standing plot or in a range without squalid; no structure in a wall strip;
   parity presets draw FTG's tents and MFCG's hovel. T71: monotone manor share to 1 at the rich extreme; the wealth shift's
   direction; largest classes on the highest-prestige plots beyond a shuffled baseline by §13.7's margin; manors on joined
   plots. T72: the vector equal on recomputation; names change only past the hysteresis; the lodgings-versus-churches
   fixture; three churches or one cathedral → the religious quarter; one district per defining instance at its target
   share; dispersed classes not gathered; every building's state inside its range and excess into the pressure; a shared
   building never above a single-power one; the economy dial proportional, an even mix neutral. T68 placement: each way
   class × band reaches its target illuminance on the CPU reference; hidden plots unlit. T77: gate weights sum to one;
   way weights equal the route sums. T81: an upward crossing grows the frame, the old arena byte-identical. Scope S1: §16's
   prices (M4: Works hooks and the clock; M2b: the dials and S12c), D-25's clause, §0.2 rows.
7. **Kernel (K).** §3.2 (9): the frame's growth at an epoch — one L0 batch replacing the `margin` and `border` chains after
   S1 derives the ring (J-A81.41; your J-A81.31 in the repair round).
8. **Seat D.** (a) `RaiseGrade` and `ClearUndercity` use `kind:` as discriminant; `ConversionOp`'s union discriminates on
   `op` — write `op: 'raiseGrade'` / `op: 'clearUndercity'` (§4.11's union names both types). (b) J-A67.40 is D's (II.6's
   slots); T's general per-year rule is J-A76.45 — no id clash. (c) D's §10.2 comment "declared … in the paragraphs that
   close this subsection" is served by T's block 8 (all nine row types). (d) `LightRule` has the `system` column your
   underground rows name. (e) `DesignationTemplateRow.works` matches `WorksRow.key`.
9. **Seat B.** Titles kept (*Informal clusters …*, *Class mix inside a band …*); J-A67.49 honoured; item 80's line cites
   *Requests after the city is built*.
10. **Seat C.** J-P1 vs 72 (d′) ruled (J-A72.42; the plain residential identity is an identity); the dials' passes stated
   (J-A72.40); S3 (4)'s bearing trade weight is the sum §4.3 defines (a "(§4.3)" pointer may be added in repair).
11. **Retrovalidation repairer.** J-Fpipe-2 (B-1 of `docs/fable-review/main/blocks-pipeline.md`, its J row and Part A entry)
   is carried by this file's §4.11 REPLACE, J-ROWS and RATIONALE-A (reworded only where the C3 check hit) — never apply
   B-1 again (its paragraph's opening, "**A cut way's far part", is present once).

## 8. Verification (re-executed on the CONTINUE, 2026-09-28 03:05–03:20, on the final block file sha256 `3c58b6e3…`, design `1c23190f…`, rationale `0be40dfd…`; receipts `scratchpad/segT/g-*` and `h-*`)
The first seat verified sha256 `96f704c9…` at 02:07; two later edits (J-A67.42 deferring the draw to E2's J-A67.61, 02:09;
§4.11 *Works* (3) and (10) citing §6.1 for the key, 03:05) and the removal of a stray mid-file `=== END ===` changed the
file, so every receipt below was re-run on the final file.
* **Alone on the live design** (`apply-blocks.py`, copies only): 13 blocks found, 13 applied, 0 skipped; audit 0 not OK;
  index rows 514 = Part A rows 514, no duplicate id, no J row without its entry; headings 145 → 145; fences balanced
  (108 → 118); title block unchanged; PENDING-banner lines 0 → 0; design 13 026 → 13 760 lines, rationale 2 053 → 2 095.
* **One-pass with every block file present** (8 files, 67 blocks, name order): 67 applied, 0 skipped, audit 1 not OK —
  this file's block 3 (the §4.5 APPEND, item 72's home) LOST under the walls-districts seat's later §4.5 REPLACE (note 1).
  **Two-pass emulation** (the other seven files first: 54 / 54 applied, audit 0 not OK; then this one): 13 / 13 applied,
  audit 0 not OK; index rows 613 = Part A rows 613, no duplicate id; design 14 560 → 15 294 lines. The §10.2 and PART III
  APPENDs survive either order (the staged seat's REPLACEs of those headings sort before this file).
* **The REPLACE bodies against the live subsections:** §4.1 changes 3 original lines (the S12c line, the laziness contract,
  the transactions row) and adds the read-ahead bullet; §4.11 changes 24 original lines, each an intended edit (the
  rung-1 wording, rung 3's class mix, weeks in the ladder, the churn cap, the epoch's order and its steps (i)–(j), the
  union, `EpochInputs`, the use step, the epoch-spread mutation, the dossier ruin, the underground rate, the lottery, the
  dwell row, the island rung, the per-year trigger rows) and adds the clock, rung, dials, J-Fpipe-2, Works, clusters and
  lights paragraphs; every other line byte-identical (first seat's receipt; the CONTINUE's two edits are inside the added
  *Works* paragraph).
* **Ids (re-run):** the 42 J ids of this file's J-ROWS appear as a row in no other `blocks-*.md` of the pass, in the design
  or in the rationale (D's J-A67.40, B's J-A67.49, E1's J-A76.71, E2's J-A76.72, J-A67.61 and J-A67.71 avoided).
* **Double replacement:** no other block file REPLACEs §4.1 or §4.11 (grep of every `=== REPLACE` line of the pass).
* **Gate (c):** (first seat) the backticked identifiers of this file intersected with those of the six code readings,
  `_critic-code.md` and `code-impact.md`: 172 shared tokens, all ordinary words or design names already in the live
  design except `d4` (our item label) and `tavern` (a class tag) — no reference identifier. The CONTINUE's edits add no
  identifier.
* **No-defer scan:** no "TBD", "to be decided", "open question" or "deferred"; every "later" is either temporal prose or
  the roadmap's staged evolution engine (DEF-8), whose hooks this file states.

## 9. Document checks (`docs/validation/bench/doc_checks.py`, allow file `docs/validation/doc-checks-allow.tsv`, unchanged by this seat)
Design sections "4.1,4.3,4.5,4.6,4.7,4.10,4.11,10.2,10.3,10.4,PART III,Judgment calls"; rationale section "Part A"
(heads from the matching design copy). Corpus at run time: 9 626 JSON files, 916 623 shared 3-grams.

| copy | C1 | C2 | C3 hits (unreviewed) | C4 | S1 | S2 hits (unreviewed) | exit |
|---|---|---|---|---|---|---|---|
| live design | 5 (0) | 0 | 210 (3) | 1 (0) | 0 | 0 | 1 |
| live design + this file alone | 5 (0) | 0 | 214 (3) | 1 (0) | 0 | 0 | 1 |
| live + the other seven files | 5 (0) | 0 | 214 (31) | 1 (0) | 0 | 0 | 1 |
| live + the other seven + this file (two-pass) | 5 (0) | 0 | 218 (31) | 1 (0) | 0 | 0 | 1 |
| live rationale, Part A | 0 | 0 | 289 (205) | 6 (6) | 0 | 17 (15) | 1 |
| rationale + this file alone, Part A | 0 | 0 | 291 (205) | 6 (6) | 0 | 17 (15) | 1 |

**This file adds no unreviewed hit** (CONFIRMED): the unreviewed hit sets, compared on check and hit text, are identical in
all three pairs (live → alone; others → two-pass; live rationale → alone). The four design C3 hits and two rationale C3
hits it adds are all already covered by reviewed allow rows. Every exit 1 is the live baseline's: the design's three
unreviewed C3 runs ("where the first leg s", "a palisade before its roads", "build 19365073 the palisade is") sit in
the live text of §4.6 (l. 4228, the bent cut's first leg) and PART III (l. 12263, VG's palisade), outside this
file's blocks, the 28 more under the other seven files belong to those seats' blocks, and
the rationale's Part A baseline (205 C3, 6 C4, 15 S2 unreviewed) predates this pass. Bringing the assembled document to
exit 0 is the assembler's step (task: "corrects mechanical hits, adds a reviewed allow row … re-runs until it exits 0");
nothing of this seat's is on that list.
