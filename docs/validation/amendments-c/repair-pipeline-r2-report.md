# repair-pipeline-r2 — lane amendments-c/repair-pipeline-r2 (repair round 2, PIPELINE part: §4, §10, PART II, PART III)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat amendments-c/repair-pipeline-r2; queued in docs/FABLE-REVIEW-QUEUE.md.

> PROGRESS (kill-safe ledger; one line per item — planned | done). The block file is
> `docs/validation/amendments-c/repair-r2-pipeline.md` (blocks only); this file is the lane's report.
> Base: docs/ARCHITECTURE.md sha256 024c57dabc6b93c8… and docs/ARCHITECTURE-RATIONALE.md sha256 33b21ca8cdc15789… (both untouched by this seat).
> Generator: scratchpad rp2/gen.py over rp2/specs/*.py (each REPLACE body = the live subsection with asserted single-occurrence,
> whitespace-tolerant substitutions, every untouched line verbatim); the block file is re-composed atomically after each spec, always ending "=== END ===".
> ITEM VPR1-12 (relief class): planned REPLACE §4.2 (S0 site request, S1 (1), S1 (10), S2 farm-mode clause), §4.9 | done: block 01 §4.2 (4 edits) + block 04 §4.9 (2 edits) + J-A65.49 restated (index weights reworded for C3) — complete
> ITEM VPR1-01 (S10a re-homing): planned REPLACE §4.5 (5); J-A72.50 restated | done: block 02 REPLACE §4.5 written (edit 1: (5), T19-4 pointer reworded for C3); J-A72.50 restated in blocks 11/12 — complete
> ITEM VPR1-03 (impairment hook): planned REPLACE §4.5 (6), §10.2 conditionSteps; J-A88.42 restated | done: block 02 §4.5 (6) + block 07 §10.2 conditionSteps + J-A88.42 restated — complete
> ITEM V-MC1-02 = VPR1-08 = VD1-09 (concealed mode source): planned REPLACE §4.7 Concealed institutions (1) | done: block 03 REPLACE §4.7 written (edit 1: Concealed institutions (1), with the withdrawal re-resolution clause matching model r2's §2.7 / J-A63.22) — complete
> ITEM V-MC1-08 = VPR1-14 (S11 entrances): planned REPLACE §4.7 S11 | done: block 03 REPLACE §4.7 written (edit 2: S11 Entrances) — complete
> ITEM VPR1-10 (description week): planned REPLACE §4.10 | done: block 05 REPLACE §4.10 written (1 edit) — complete
> ITEM VKC1-04 = VPR1-05 (rasters): planned REPLACE §4.11 The rung at an epoch | done: block 06 REPLACE §4.11 written (edit 1) — complete
> ITEM VKC1-05 = VPR1-07 (underground re-derivers): planned REPLACE §4.11 The rung at an epoch | done: block 06 REPLACE §4.11 written (edit 2; the undercity stage added beside the systems' for a void part) — complete
> ITEM VPR1-06 = VD1-14 = VS1-02 (cap refusal): planned REPLACE §4.11 The rung at an epoch | done: block 06 REPLACE §4.11 written (edit 3; VS1-02's text, the fullest) — complete
> ITEM VPR1-13 (hinterland row shape): planned REPLACE §10.2 | done: block 07 REPLACE §10.2 written (edit 2) — complete
> ITEM VPR1-11 (underground window lights): planned REPLACE II.7.3, II.7.5 | done: block 08 REPLACE II.7.3 written (1 edit); block 09 REPLACE II.7.5 written (edit 1; walkways lit by gallery rows, not the verifier's way rows — walkways are gallery chains) — complete
> ITEM VPR1-04 (generation-time buried town): planned REPLACE II.7.6 (+ II.7.5 prediction clause); J-A65.46 restated | done: block 10 II.7.6 (5 edits) + block 09 II.7.5 edit 2 + J-A65.46 restated — complete
> ITEM VPR1-09 = VD1-10 (closure wording): planned REPLACE II.7.6 | done: block 10 REPLACE II.7.6 written (edit 4) — complete
> ITEM J-ROWS + RATIONALE-A (J-A72.50, J-A88.42, J-A65.46, J-A65.49 restated): planned | done: blocks 11 J-ROWS (4 restated) and 12 RATIONALE-A (4 restated) — complete; wording reworded for C3
> RECEIPTS (apply alone / with siblings, doc checks, refs): planned | done: alone 12/12, combined 30/30, audit 0, swap clean, doc_checks exit 0 (0 unreviewed), rationale unreviewed set unchanged, refs resolve — complete (§6)

## 0 Outcome

All 21 routed issue rows (13 distinct once the verifiers' duplicates are merged) are repaired in
`docs/validation/amendments-c/repair-r2-pipeline.md`: 10 REPLACE blocks — §4.2, §4.5, §4.7, §4.9, §4.10, §4.11, §10.2,
II.7.3, II.7.5, II.7.6, every one pipeline-owned — a J-ROWS block (4 restated rows) and a RATIONALE-A block (4 restated
entries). No new judgment id: the four rulings the fixes touch are restated under their ids (J-A72.50, J-A88.42,
J-A65.46, J-A65.49). None is invalid; none is held. No other r2 seat's file REPLACEs any of my headings (checked against
the determinism, kernel and model r2 files on disk). §5.2's F-SITING row (determinism's) first needed two substitutions,
because determinism r2 had written VPR1-02's text, which predates VPR1-01's fix and would send to F-SITING the households
§4.5 (5) now houses at the nearest range; determinism r2 folded both into its own §5.2 block while this seat worked, so
no cross-part substitution remains (block-file preamble (2); §5 below).

## 1 Where each issue landed

| issue(s) | block | the change, in a line |
|---|---|---|
| VPR1-01 (major) | §4.5 (5); J-A72.50 restated | a household no district's range admits goes to the district, in S7b's order, of the nearest range whose capacity holds it, its band read at that range's end (derived, reported); a dossier-population household no capacity holds stays in its own district for §4.7's re-provision (J-A20.72); F-SITING only for a household outside a dossier's population that no capacity holds |
| VPR1-03 | §4.5 (6); §10.2 `conditionSteps`; J-A88.42 restated | the hook reads a dossier institution's visible impairment (`DossierInstitution.impairments`, §14; F4) and lowers that institution's own term, `severity` the impairment's |
| VPR1-04 | II.7.6 (buried-town bullet, creation sentence, stage order, the `buried` row's params, the registration comment); II.7.5 (S7b's prediction); J-A65.46 restated | the most severe `fire` or `flood` scar with severity ≥ `scarSeverity` (0.5; ties the oldest) makes one `buried` system after vaults: region the growth-stage-1 districts (its `sources`), galleries their way centrelines, chambers their buildings' ground storeys, `scarBaseCm + scarGainCm × severity` (200 + 200 × severity) cm down; the town above as it stands, no `raiseGrade`, nothing cleared, draw-free, an `extension` off in the parity presets |
| VKC1-04 = VPR1-05 | §4.11 *The rung at an epoch* | every stored height unchanged and the flow fields recomputed over the grown grid |
| VKC1-05 = VPR1-07 | §4.11 *The rung at an epoch* | the re-derivers of each grown underground part's cleared faces: part 0's network stage (bands by `corridorUnion`), II.7.3's stage (plots), each other system's stage (its bands) and II.7.5's stage (the undercity's plots) |
| VPR1-06 = VD1-14 = VS1-02 | §4.11 *The rung at an epoch* | a dossier outside the ladder at either end refused and never at an epoch; §3.2 (9)'s clamp serves only growth without a dossier (VS1-02's fuller text) |
| V-MC1-02 = VPR1-08 = VD1-09 | §4.7 *Concealed institutions* (1) | the mode stored with its map-side source only when the dossier gave none; a dossier-set mode refused to a map `setAttr`; a withdrawing dossier event re-resolves by (1)'s order from the map-side sources (model r2's §2.7 and J-A63.22) |
| V-MC1-08 = VPR1-14 | §4.7 S11 *Entrances* | the main entrance on the footprint side facing the plot's frontage access edge |
| VPR1-09 = VD1-10 | II.7.6 *The pieces an access edit generates* | "one event whose batches commit together" |
| VPR1-10 | §4.10 | the description reads the drawn week (§4.11's *Which week is drawn*) |
| VPR1-11 | II.7.3 *Access, air and light*; II.7.5 *Lifelines and light* | door lights by rows; windows by §8.4's derived window lights; the undercity's walkways by `gallery` rows |
| VPR1-12 | §4.2 S0, S1 (1), S1 (10), S2; §4.9 farm modes; J-A65.49 restated | `relief: 'auto'|'plain'|'rolling'|'hilly'|'mountainous'` in S0's site request, `auto` drawn by the feature table's relief row (0.35 / 0.35 / 0.2 / 0.1) on `blueprint.features`, recorded in `autoResolved`, DR1's `site.terrain` setting it; S1 (1), S1 (10), S2 and §4.9 read "S0's relief class" |
| VPR1-13 | §10.2 `PortRows.hinterland` | one row or `null`, as `crime` and `legitimacy` are |

## 2 Rulings (vetoable; full entries in the RATIONALE-A block)

All four are restatements under their existing ids; the assembler swaps each into the older row's place.
* **J-A72.50** — the nearest-range housing for a household no range admits; a dossier household no capacity holds kept
  in its own district; F-SITING only outside a dossier's population (VPR1-01).
* **J-A88.42** — the non-physical impairment moves the impaired institution's own term, never town-wide (VPR1-03).
* **J-A65.46** — the generation-time buried town from a history scar (VPR1-04), chosen over a `raiseGrade` replayed at
  creation or none before an epoch, because the creation week shows a finished town (J-A67.47).
* **J-A65.49** — the relief class an S0 site-request toggle with its own `auto` row, so the three readers have one
  writer (VPR1-12).

**Where I departed from a required text, and why (each vetoable).**
1. VPR1-01: the required text left a gap — a household that fills a dossier's population and that no district's
   capacity holds had no stated home. I added: it stays in its own district, housed by §4.7's re-provision (J-A20.72).
2. VPR1-03: the required `conditionSteps` comment set "per unit of severity" for both kinds. §7.7's F4 row (determinism's)
   says a physical type wears the building "one condition step per severity band". I kept that unit for physical types and
   gave the per-unit-of-severity reading to non-physical types only, with §4.5 (6)'s formula, so no second home is
   silently redefined.
3. VPR1-11: the required II.7.5 text lit the undercity's walkways by "`way` rows". Walkways are `gallery` chains
   (II.7.5; §2.4's note: the underground carries `tunnel` and `gallery` chains, never ways), and `LightRule`'s `gallery`
   host lights "a gallery at the way rows' spacing", so I wrote "`gallery` rows".
4. VPR1-12: the required comment marked the relief weights `extension`. §7.6 sets every `extension` cell's weight to 0 in
   the parity presets, which would leave a categorical draw with no weights, while S1 (1) scales its heightfield by a
   relief class under every preset. I marked the row our own and calibratable, read under every preset.
5. VPR1-04: the rule's three numbers became rows of the `buried` system row's `params` (`scarSeverity` 0.5,
   `scarBaseCm` 200, `scarGainCm` 200), the system's `sources` its region's districts, and II.7.5's S7b prediction names
   the scar — so the rule is data and the undercity can predict the void. The rule is gated to TOWN and above like
   every system, and it draws nothing.
6. V-MC1-02: beside the required sentence, I added the withdrawal re-resolution clause that model r2's §2.7 comment and
   restated J-A63.22 attribute to §4.7's *Concealed institutions* (1), so (1) states the resolution rule the model's
   pointer names.
7. VKC1-05: the undercity's plots in a void part are II.7.5's stage's, so the re-derivers name that stage beside the
   systems' stage (the required text named only "each other system's stage its own part").
8. VPR1-12: §4.2 S2's farm-mode clause and §4.9's second sentence ("S1's relief and resources") were aligned to "S0's
   relief class and S1's resources", beside the three phrases the issue named. J-A26.44's Part A ("S1's relief and
   resources") is a history record and is left as it stands.

## 3 Held parts (gate (a)) — none applied here; listed so nothing is lost

No issue of this lane touches a held part. The pass's held parts relevant to this part stay unwritten: item 35 (the
position-check support, 160 / 162 faces), item 68 (g) (the cast-shadow absence clause and the light and shading support),
item 52 (the references' visibly different session maps), item 60's support. Released parts stand as the pass applied
them (item 37, item 58 (f), item 59's timing); item 49's rejected deletion is not this part's. Gates (b) and (c): the new
text states no reference behaviour, and names no reference identifier.

## 4 Cross-part notes (for the seats that own the sections)

1. **Determinism (§5.2) — folded by determinism r2 into its own §5.2 block; nothing left to apply (§5).** Determinism r2's F-SITING detection cell
   reads "S10a's band-range re-homing (§4.5 (5)) finds no district whose written range admits a household and whose
   capacity holds it", VPR1-02's text, which was written before VPR1-01's fix; under the fixed §4.5 (5) such a household
   is housed at the nearest range, so the cell names the capacity refusal of a household outside a dossier's population.
2. **Scope (§13.2) — bars the new mechanisms want (beside VPR1-17's):** (a) over 1 000 seeds per rung the `auto` relief
   class's shares lie within ± 3 s.e. of its row, and a dossier fixture's `site.terrain` fixes it; (b) a dossier fixture
   whose `HistoryHint` carries a `fire` scar of severity 0.6 holds one `buried` system under its growth-stage-1 districts,
   its galleries on their way centrelines 320 cm below grade, no `raiseGrade` in the log; at severity 0.4, with the hint
   empty and in the parity presets none; the ground arena equal across the three when no undercity exists; (c) after
   S10a no household whose band no district's range admits is unplaced, each such housing reported; (d) a non-physical
   impairment on one dossier institution changes only that institution's dial term.
3. **Model (§2.7):** `UndergroundSystem.sources`' comment names "the raiseGrade that buried a town"; it could add "or, at
   generation, the growth-stage-1 districts a history scar buried (II.7.6)". Nothing reads the comment as a rule; II.7.6
   states it.

## 5 Assembler hand-off

1. **Restated rows.** J-ROWS carries 4 restated index rows and RATIONALE-A 4 restated entries — J-A72.50, J-A88.42,
   J-A65.46, J-A65.49; swap each into the older row's place and delete the older (`swap_restated`, as assemble-r1 did).
   Expected swapped sets: index {J-A65.46, J-A65.49, J-A72.50, J-A88.42}, Part A the same; no new id.
2. **No cross-part substitution remains.** This file's preamble first asked for two strings in §5.2's F-SITING row; the
   determinism r2 file's REPLACE §5.2 now carries both exactly (checked: its detection cell and household rung read as
   this seat wrote them), so nothing is applied for it. If that block were not applied, the r2 verifier re-files them.
3. **No heading is replaced twice.** This file REPLACEs only pipeline-owned headings; the determinism, kernel and model
   r2 files on disk REPLACE §5.2, §5.4, §6.1, §7.1, §7.4, §7.5, §7.7; §3.2, §3.3; §2.2, §2.3, §2.6, §2.7, §2.8.

## 6 Receipts (scratch copies only; the design files were not touched — design 024c57da…, rationale 33b21ca8… before and after)

* **Apply, this file alone** (`apply-blocks.py`, two-pass): 12 / 12 blocks applied, 0 skipped, audit not-OK 0; headings
  147 → 147; fences balanced (130 → 130); title block unchanged; duplicate ids exactly the four restated rows in each table;
  after the simulated swap 723 index rows = 723 Part A rows, no duplicate, no id in one table only. The swapped copy
  differs from the live design in 26 hunks, every one an intended edit (§4.2 ×4, §4.5 ×2, §4.7 ×2, §4.9 ×2, §4.10,
  §4.11 (one paragraph, three edits), §10.2, II.7.3, II.7.5 ×2, II.7.6 ×6, index ×4), and the rationale in 4 rows.
* **Apply, with the determinism, kernel and model r2 files on disk** (hashes at the last run: determinism bb86c4e3…,
  kernel cb11169f…, model f523c11c…, this file c7a5f7df…; the final file 60ce1b04… differs only in its ignored preamble): 30 / 30 applied, 0 skipped,
  audit not-OK 0, headings 147 → 147; after the swap 725 = 725 rows (the two new sibling ids J-A65.22 and J-A88.73), no
  duplicate; every one of my ten subsections is byte-identical in the alone and the combined copy.
* **Document checks** (`doc_checks.py --sections "4.2,4.5,4.7,4.9,4.10,4.11,10.2,II.7.3,II.7.5,II.7.6,Judgment calls"`,
  allow file `docs/validation/doc-checks-allow.tsv`, three copies on one corpus snapshot): live design C1 5 / 0, C2 0 / 0,
  C3 229 / 0, C4 1 / 0, S1 0, S2 0, exit 0; this file alone, swapped: the same counts, exit 0; combined with the siblings
  (and the §5.2 strings as now folded): the same counts, exit 0. My first draft raised two C3 digit runs ("§7.7 item 2;
  §13.2 T19-4" and the relief weights written as a slash list); both were reworded (wording only), so no allow row is
  proposed. **Rationale, whole** (`--heads` the matching design copy): live and mine both C3 508 / 330 unreviewed, C4 7 / 7,
  S2 17 / 15 — the unreviewed sets byte-identical (sorted diff empty), so the restated entries add no hit (a first run
  found one digit run, "0.35, 0.35, 0.2 and 0.1", reworded). Outputs: scratchpad `rp2/dc2-*.txt`, `rp2/dc3-*.txt`.
* **References.** Every J id the new text cites resolves once in the index (J-A20.42, J-A20.72, J-A20.77, J-A63.22,
  J-A65.46, J-A65.49, J-A66.71, J-A67.47, J-A72.50, J-A81.01, J-A88.42, J-A12.43); the named paragraphs resolve
  (*Households per building* §4.7, *Which week is drawn* §4.11 Works (9), *Depth bands* II.7.6); §7.7 items 2, 7, 11, 15
  and the F4 row exist; S2 0 on every copy. No deferral wording in the new text ("later" occurs only in two unchanged
  temporal phrases of the restated entries).

## 7 CONFIRMED versus PLAUSIBLE

CONFIRMED (executed): every block applies to the live design and rationale alone and with the three sibling r2 files,
the audit is clean, the restated rows swap to one row per id, only the intended lines change, my subsections are the
same in both assemblies, the document checks on the changed sections equal the live counts with 0 unreviewed, the
rationale's unreviewed set is unchanged, every cited id and pointer resolves; each old text was found exactly once in its
subsection (the generator asserts it). PLAUSIBLE (reasoning): that each change repairs its issue without a new conflict —
in particular the nearest-range housing and the dossier household kept in its district (J-A72.50), the generation-time
buried town's rows (`scarSeverity` 0.5, 200 + 200 × severity cm, the stage-1 region; J-A65.46) and the relief row's
weights (J-A65.49), all our own and calibratable, and the eight departures of §2. These are what Fable should re-check
first.
