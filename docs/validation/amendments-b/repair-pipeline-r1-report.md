# repair-pipeline-r1 — lane amendments-b/repair-pipeline-r1 (repair round 1, PIPELINE part: §4, §10, PART II, PART III)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat amendments-b/repair-pipeline-r1; queued in docs/FABLE-REVIEW-QUEUE.md.

> PROGRESS (kill-safe ledger; one line per block — planned | done). The block file is
> `docs/validation/amendments-b/repair-r1-pipeline.md` (blocks only); this file is the lane's report.
> Base: docs/ARCHITECTURE.md sha256 87d8969209c7deb5… and docs/ARCHITECTURE-RATIONALE.md sha256 3f39b2de60c97741….
> Generator: scratchpad rp1/gen.py over rp1/specs/*.py (each REPLACE body = the live subsection with asserted
> single-occurrence substitutions, every untouched line verbatim); the block file is re-composed atomically after each spec.
> BLOCK 01 §4.1 (VK-27, VP-03, VD-14a, VP-31, VD-35a): planned | done: REPLACE block written (3 edits)
> BLOCK 02 §4.2 (VP-23, VS-02, VD-07b, VS-17 S2 pointer): planned | done: REPLACE block written (7 edits)
> BLOCK 03 §4.5 (VP-13, VP-26): planned | done: REPLACE block written (3 edits)
> BLOCK 04 §4.6 (V-MAB-07, VP-08 consistency): planned | done: REPLACE block written (2 edits)
> BLOCK 05 §4.7 (VP-14, VP-15, VP-25, VP-28, VD-16, VD-15): planned | done: REPLACE block written (8 edits)
> BLOCK 06 §4.9 (VS-17): planned | done: REPLACE block written (4 edits)
> BLOCK 07 §4.11 (V-MAB-05, V-MAB-13, V-MAB-39, V-MAB-40, VP-05, VP-06, VP-07, VP-08, VP-09, VP-20, VP-21, VP-22, VP-25, VP-27, VP-29, VP-32, VD-06, VD-08b, VD-10a, VD-12b, VD-17, VD-23, VS-29; with V-MAB-29's reuse wording and VP-20's lag sentence): planned | done: REPLACE block written (28 edits)
> BLOCK 08 §10.2 (VP-16, VP-17, VP-20, V-MAB-20, V-MAB-42): planned | done: REPLACE block written (11 edits)
> BLOCK 09 §10.4 (VP-30): planned | done: REPLACE block written (1 edit)
> BLOCK 10 II.1 (VP-18): planned | done: REPLACE block written (2 edits)
> BLOCK 11 II.3 (VP-25): planned | done: REPLACE block written (1 edit)
> BLOCK 12 II.4 (VK-27, VP-03, VD-14a): planned | done: REPLACE block written (1 edit)
> BLOCK 13 II.6 (VK-05, VP-01, VP-02, VK-29 (2), V-MAB-10): planned | done: REPLACE block written (6 edits)
> BLOCK 14 II.7.1 (VK-29 (1)): planned | done: REPLACE block written (1 edit)
> BLOCK 15 II.7.2 (VD-37): planned | done: REPLACE block written (1 edit)
> BLOCK 16 II.7.3 (VK-28, VP-24, VP-02 pointers, VD-37, VP-18 pointer): planned | done: REPLACE block written (7 edits)
> BLOCK 17 II.7.4 (VP-19, V-MAB-11, VP-24): planned | done: REPLACE block written (3 edits)
> BLOCK 18 PART III (VP-24): planned | done: REPLACE block written (1 edit)
> J-ROWS + RATIONALE-A (J-A20.41, J-A23.41, J-A26.43, J-A28.42, J-A31.43, J-A31.44, J-A31.48 restated; J-A24.43, J-A26.44, J-A31.40 new): planned | done: J-ROWS (10 rows) + RATIONALE-A (10 entries) written

## 0 Outcome

All 56 issues routed to the pipeline part are repaired in `docs/validation/amendments-b/repair-r1-pipeline.md`: 18 REPLACE
blocks (§4.1, §4.2, §4.5, §4.6, §4.7, §4.9, §4.11, §10.2, §10.4, II.1, II.3, II.4, II.6, II.7.1, II.7.2, II.7.3, II.7.4,
PART III — every one pipeline-owned, no other part's heading touched), a J-ROWS block and a RATIONALE-A block. Applied to
scratch copies of the base documents the blocks leave 0 retired phrases in the part, 80 of 80 issue probes present, 0 new
broken references and 0 new document-check hits; the document checks exit 0 once the 47 reviewed allow rows of §5 below
are appended (all of them pre-existing hits in unchanged text). Six vetoable rulings are recorded (§2): the four the
pipeline verifier asked for (VP-06, VP-09, VP-25, VP-32) and the two choices VS-02 and VS-17 left to this seat; where two
verifiers disagreed (VP-06 against VD-05) the pipeline defers to the home section and states no condition of its own —
the determinism repair (landed 06:04) put the population-target test at the home (J-A20.74), and J-A20.41 says so.

## 1 Where each issue landed

| issue(s) | block | the change, in a line |
|---|---|---|
| VK-27, VP-03, VD-14a | §4.1, II.4, J-A28.42 | a stored plan is re-cut inside the changing event; a stale rung re-derives from its canonical prior (committed state, never the cache); II.4 points to §4.1 |
| VP-31 | §4.1 | the content decision is town-wide by S2, S7b and S10a and per plot by S10b |
| VD-35a | §4.1, J-A23.41 | the emulation bullet reduced to a pointer to §7.6's rule, reading rule and marker (J-A23.71) |
| VP-23 | §4.2 (S2, S3 (2), S3 (12)) | a polycentric nucleus's plaza ranked secondary is S3's, every other secondary market S7b's — in all three sentences |
| VS-02 | §4.2 S3 (12), J-A24.43 | harbour kind 1.0 and trade 0.6 × min(1.5, p ÷ `portRef`); the worked comparison stated; T24-1 and §13.7 stand |
| VD-07b | §4.2 | a replay reproduces the creation dossier because the base derivation reads the log's creation prefix (§7.4) |
| VP-13, VP-26 | §4.5 | the due-mark paragraph after S7b (6), its middle-band sentence a pointer; the shanty kind replaces the districts of lowest mean pass-1 band |
| V-MAB-07 | §4.6 | `knownTo` takes §2.5's default |
| VP-14, VP-15, VP-25, VP-28, VD-16, VD-15 | §4.7 | one market-pin statement by rank; the material rule by pointer to §2.6; S10 (2) reads §4.11's block-level floor; §7.7's `DisruptionBudgetRow` weights (vacated included) and depth; a `dossier` request places at its first closest option |
| VS-17 | §4.9, §4.2 S2, J-A26.43, J-A26.44 | FTG's three layouts named truly; `rivers` added; `perimeter` made FTG's (no farmsteads, farmers in town); `FarmModeRow` and `ClimateTable.farmLayout` typed |
| VP-05, VD-17, VP-27 | §4.11 rung 1, step (c), `LadderOp.relet` | `relet` re-cuts a stored plan inside the event; capacity by pointer (J-A28.23) |
| VP-08, VP-09, VD-12b | §4.11 rung 2, floor paragraph, `LadderOp.thin`, hidden plots; §4.6 | `thin … back_court` re-homes and vacates before clearing; the back court is rung 2's one ring change (J-A31.40); the rich/middle cycle changes no frontage and lowers no shell |
| VP-25 | §4.11, §4.7 S10 (2), II.3, J-A31.43 | a block-level read takes max(block band, the floor of its plots' area-weighted median) |
| VP-32, VS-29 | §4.11, J-A31.44 | `fill`, a New random of the block and rung 2's new rear plots are writers; rungs 1 and 2 never lower `builtBand` |
| VD-23 | §4.11, J-A31.48 | lineage by pointer to §6.3's JOIN and SPLIT rule (J-A31.73) |
| VP-06, VD-06 | §4.11 step (h), J-A20.41 | step (h) applies §7.7's rule, restating no condition |
| VD-08b | §4.11 | `EpochInputs.dossier?: EditEvent[]`; step (e) names it |
| VP-20 | §4.11 lottery and lag, §10.2 | a fall relets down before it vacates |
| VP-21, VP-29, VP-22 | §4.11 regrowth-first | step (0) relets up first; (6) the underground crowding hook; the test is T8-2 by pointer |
| V-MAB-13, VP-07, VD-10a | §4.11 | the water kind is `siltReach` (union, repair, trigger rows); the tunnel ladder keeps `silt` |
| V-MAB-39, V-MAB-40, V-MAB-05 | §4.11 | reuse drawn on the trace (`Building.reusedAs`); reclaim's record changes are §2.3's; `sealPassage` sets `Passage.sealed` |
| VP-16, VP-17, V-MAB-20, V-MAB-42 | §10.2 | one `DesignationTemplateRow`; the class-row columns declared; `cellar.depthCm` / `insetCm`; `BasementGateRow` and `RosterTables.basementGate`; `circulation: { num; den }`; service scope as §2.6 defines it |
| VP-30 | §10.4 | the roster-table list complete |
| VP-18 | II.1, II.7.3 | `layer` admits `'underground'` in its one declaration |
| VK-05, VP-01 | II.6 | the retired island paragraph and its second `IslandRule` / `SkyStrategy` removed; 0–3 by rule, the toggle shows |
| VP-02, VK-29 (2), V-MAB-10 | II.6, II.7.3 | the condition table (existence, closure, open, reached by) as the one home; II.7.3 cites its `open` column |
| VK-29 (1) | II.7.1 | the cross-arena link is §2.2 rule 2 |
| VD-37 | II.7.2, II.7.3 | `setAttr` on kind, bore and headroom; the condition changes only by the conversions |
| VK-28 | II.7.3 | arena isolation by §3.4's keyed transactions and §13.2's fixture, no `E_SCOPE` claim |
| VP-24 | II.7.3, II.7.4, PART III | the site-plan table replaced by the designation templates and `UndergroundRule.arrangements` |
| VP-19, V-MAB-11 | II.7.4 | `('access_point', id)`; §2.8's entity registry |

## 2 Rulings taken (vetoable; the J rows and Part A entries are in the block file)

1. **The lapse (VP-06 with VD-06; J-A20.41 restated).** The two verifiers recommended opposite conditions (pipeline: every
   epoch, §7.7's text at the base; determinism, VD-05: the population-target test). The pipeline part now states no
   condition — step (h) applies §7.7's rule and writes `lapsedAt` — so §4.11 stays true whichever condition §7.7 holds.
   The determinism repair (repair-r1-determinism.md, landed 06:04) adopted the population-target test at the home with
   `Rejection.held.populationTarget` (J-A20.74 restated); J-A20.41 records that its test now lives there.
2. **Rung 2's back court (VP-08, VP-09; J-A31.40 new).** The split is a legitimate ring change below rung 3 (the owner's
   "the holding fragments without the front changing"); the front plot keeps address, lineage and `builtBand`, the rear
   plots are §6.3's split children with their new stock's band; a court is cleared only after its households are re-homed
   and its buildings vacated.
3. **The block-level floor (VP-25; J-A31.43 restated).** The area-weighted median of the standing plots' floors, raised
   by the block's band.
4. **`builtBand` writers (VP-32, VS-29; J-A31.44 restated).** `fill` and a New random of the block are writers (authorial
   acts); rung 2's new rear plots take their stock's band; rungs 1 and 2 never lower a standing plot's record.
5. **Market siting (VS-02; J-A24.43 new).** The pipeline route of VS-02 (re-weight) rather than the scope alternative:
   harbour kind 1.0, the port term read against a reference port `portRef` (the median over B-CITY's harbour seeds,
   computed from S2 alone; 0.12 PLAUSIBLE until M1's receipt), break-even at ⅚ of the median.
6. **Farm modes (VS-17; J-A26.44 new, J-A26.43 restated).** `Around rivers` adopted as `rivers` (not left out); `perimeter`
   corrected to FTG's own (no farmsteads — the farm households are housed in the town), since a `ref:` provenance must be
   true; the `along rivers` field-system preset folded into the mode. This changes the default output of `perimeter`
   hinterlands (METROPOLIS and hilly or poor sites): no farmstead plots there, the farm households allocated in town.

## 3 Cross-part notes (other lanes' text; nothing here edits it)

* **Determinism** (checked against repair-r1-determinism.md, landed 06:04, which matches these blocks on the lapse,
  the creation prefix, `EpochInputs.dossier`, `siltReach`, the tunnels row, the ladder kinds, the §5.3 epoch row's
  back-court exception (J-A31.75) and the §7.4 `builtBand` row's pointer to §4.11's list). Two small asks remain: §7.6's
  enumeration names the designation templates' cellar columns but not `RosterTables.basementGate` (V-MAB-42); and §7.4's
  `builtBand` row says "an epoch changes it only by a rung-3 event", which should add "and gives the rear plots rung 2's
  back court creates their new stock's band" (J-A31.40, J-A31.44).
* **Rendering.** §8.5 and §8.6: the canonical prior, never the cache (VP-04, VD-14b). §12.6: `siltReach` (VP-37).
* **Scope.** §13.2 T25-1 and §0.2 row 25: `siltReach` (VP-38); T31-9 reads frontage and shells (VP-11); T8-7: an unstored
  plan goes stale, a stored plan is re-cut in the event (VP-40); the Staged list's sewers row: `UndergroundRule`'s depth
  scale, vacancy share and arrangement restriction (VP-41); §14's `@plat/tables` should list `basementGate` with the
  roster tables. T24-1 and §13.7's item-24 row stand as written (VS-02 taken on the pipeline route).
* **Model.** §2.3 already reads `siltReach`, §2.6 cites `cellar.depthCm` / `insetCm` and the basement-gate row, and §2.5's
  `builtBand` comment points to J-A31.44's list (repair-r1-model.md); §4.11 now cites `Building.reusedAs` (§2.6), which
  that file declares (V-MAB-29).

## 4 Assembler hand-off

1. **Restated rows.** The J-ROWS and RATIONALE-A blocks carry restated rows under existing ids — J-A20.41, J-A23.41,
   J-A26.43, J-A28.42, J-A31.43, J-A31.44, J-A31.48 in both tables. `apply-blocks.py` appends them ("DUPLICATE ID
   inserted"); move each appended row into the older row's place and delete the older one (repair-r1-kernel's hand-off
   (1) procedure). New ids: J-A24.43, J-A26.44, J-A31.40. If a later file REPLACEs `# Judgment calls`, re-apply these rows.
2. **Document checks.** Append the 47 rows of §5 (tab-separated `check`, `hit`, `reason`) to
   `docs/validation/doc-checks-allow.tsv`, e.g. `grep -P '^C3\t' <this file> >> docs/validation/doc-checks-allow.tsv`.
   Every one is a hit in text these blocks carry unchanged: present in the live document at the base sha, found by the
   same check on it (50 unreviewed there; these blocks remove 2 of them and add none). The corpus is still growing, so a
   later run may show further hits of the same kind.

## 5 Reviewed allow rows (C3; all pre-existing in unchanged text)

```
C3	9 1 9 2 the one	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	pool of up to three	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	order 2 3 the recorded	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	250 and the red team s	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	the boundary and the trace	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	at both ends with a gate	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	4 7 4 8 every	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	k is a level set of	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	of 4 2 s3 4	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	left outside the built extent	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	the straight cut on the	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	5 m and a cut longer than the	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	stops and a block s	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	0 45 0 30 0 15 0	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	at every storey above the ground	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	edge between two nodes that	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	the rest of each strip	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	line and the block being	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	none the house is the	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	per side of the wall	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	area is a re roll	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	by more than it is marked	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	never a re roll it	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	are cut the same way	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	from the run s two	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs in research/findings/code-dwellings.md, written 2026-09-27 04:54 after the text, as that reading's own generic phrase about a roof's outline run (reviewed by repair-pipeline-r1)
C3	steps and the same draws	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	2 6 s plan rung	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs in research/findings/code-dwellings.md, written 2026-09-27 04:54 after the text, where the reading cites this document's own §2.6 plan rung (reviewed by repair-pipeline-r1)
C3	the fractional part of a	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	s type is the first	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	end is a t junction	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	on the other side the	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	face is the neighbour s	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	a house is an ordinary	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	3 is drawn once per	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	0 6 for the first	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	as the design s own	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	town it is the model	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	each is a table row	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	2 9 6 4 7 5	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	2 9 6 4 7 4	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	stored in the base 2	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	2 2 4 1 4 11	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	door rule and the never	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	2 8 2 6 2 7	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	root of the plaza the	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	4 5 4 7 10 2	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
C3	view state not a document setting	corpus-growth false positive: text unchanged by amendments-b repair r1 (present at base sha 87d89692…); the run occurs contiguously in no research/findings file — its 3-grams are shared apart; generic phrasing or our own numbers (reviewed by repair-pipeline-r1)
```

## 6 Receipts (executed 2026-09-27)

* `gen.py`: every substitution asserted to occur exactly once in its live subsection (the run stops otherwise); per-block
  diffs in the scratchpad `rp1/out/*.diff` show only the intended hunks.
* `apply-blocks.py` on scratch copies, this file alone: 20 of 20 blocks applied, 0 skipped, audit not-OK 0; headings
  145 → 145; fences balanced (110 → 108: II.6's retired code block removed); title block unchanged; PENDING FABLE REVIEW
  lines 0 → 0. With repair-r1-kernel.md and repair-r1-model.md as well: 37 of 37 applied, audit not-OK 0.
* After the restated-row swap: `refs.py` broken 2 — both pre-existing external citations (`os-geometry.md` §2.1.4 and
  RFC 7946 §3.1.6), the same 2 as on the live document; the same with all three repair files applied.
* All four repair files that exist now (determinism, kernel, model, pipeline) applied together: 53 of 53 blocks, audit
  not-OK 0, headings 145 → 145, fences balanced; after the restated-row swaps `refs.py` broken 2, the same pre-existing 2.
* 80 issue probes (every required change located in the applied copy; the retired II.6 block absent): 80 pass.
* `doc_checks.py --sections "4,10,PART II,PART III,Judgment calls"`: live document C1 5/0, C2 0/0, C3 305/50, C4 1/0,
  S1 0/0, S2 0/0; applied copy C3 301/48, all 48 in the live set, 0 new; with §5's rows exit 0 (C3 301/0).

## 7 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed): the substitutions, the application, the probes, the references and the document-check counts
above, on the base sha `87d89692…` and `3f39b2de…`. **PLAUSIBLE** (judgment, vetoable): the six rulings of §2 — above all
VS-02's weights and `portRef` default (the ⅚ break-even is arithmetic, the seed shares are M2b's measurement) and
VS-17's change of the `perimeter` mode — and the reading that II.7.3's arena rows are satisfied by
`UndergroundRule.arrangements`.
