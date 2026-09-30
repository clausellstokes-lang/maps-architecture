# repair-determinism-r1 — lane amendments-c/repair-determinism-r1 (repair round 1, DETERMINISM part: §5, §6, §7)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat amendments-c/repair-determinism-r1; queued in docs/FABLE-REVIEW-QUEUE.md.

> PROGRESS (kill-safe ledger; one line per block — planned | done). The block file is
> `docs/validation/amendments-c/repair-r1-determinism.md` (blocks only); this file is the lane's report.
> Base: docs/ARCHITECTURE.md sha256 7f4c0e253438b41b… and docs/ARCHITECTURE-RATIONALE.md sha256 22f01184eac296c1…
> (assemble-r0's output, the state the r0 verifiers judged). Generator: scratchpad rdc1/compose.py over rdc1/specs.py
> (each REPLACE body = the live subsection with count-asserted substitutions, every untouched line verbatim); the block
> file is re-composed atomically after each spec, ending in "=== END ===".
> ITEM BLOCK 01 §5.2 (VD0-20; VD0-04 F-EDIT side): planned | done: REPLACE block written (4 substitutions)
> ITEM BLOCK 02 §5.3 (V-MC0-05, V-MC0-12; VKC-17 sibling in the staged-layers row): planned | done: REPLACE block written (3 substitutions: basement row, main-entrance row with §2.6 rule 2's side/rear wording, the staged-layers row's link far ends)
> ITEM BLOCK 03 §5.4 (VD0-22): planned | done: REPLACE block written (1 substitution)
> ITEM BLOCK 04 §6.1 (VD0-01 = VPR0-11, VD0-08, VD0-11, VD0-13 + VPR0-30, VD0-15; VD0-17 sibling): planned | done: REPLACE block written (9 substitutions: works keys, cut.arc count, stage-2 readers, cluster pick, closure concerns, deposit bearing, churn extra, variations distinct, Enter)
> ITEM BLOCK 05 §6.2 (V-MC0-20, V-MC0-21, VD0-14): planned | done: REPLACE block written (3 substitutions)
> ITEM BLOCK 06 §6.3 (V-MC0-21, VD0-10): planned | done: REPLACE block written (3 substitutions: light creation index, anchor row, the matching routine reads the staged records by key)
> ITEM BLOCK 07 §6.4 (VD0-08): planned | done: REPLACE block written (1 substitution)
> ITEM BLOCK 08 §7.1 (V-MC0-24, VD0-03, VD0-18, VD0-19; V-MC0-20 and V-MC0-22 siblings): planned | done: REPLACE block written (8 substitutions)
> ITEM BLOCK 09 §7.3 (VKC-17, VD0-04, VD0-11, VD0-16, VD0-17): planned | done: REPLACE block written (5 substitutions)
> ITEM BLOCK 10 §7.4 (V-MC0-04, VD0-03, VD0-24, VD0-25): planned | done: REPLACE block written (9 substitutions: startWorks row, knownTo row, access element, and six in 'Warp and what stands on the ground')
> ITEM BLOCK 11 §7.5 (V-MC0-19 = VD0-02, VD0-23): planned | done: REPLACE block written (2 substitutions)
> ITEM BLOCK 12 §7.7 (V-MC0-22, V-MC0-23, VPR0-25, VD0-01 DR21): planned | done: REPLACE block written (8 substitutions)
> ITEM BLOCK 13 J-ROWS (restated J-A67.61, J-A66.71, J-A76.72, J-A72.61; new J-A67.72, J-A68.73): planned | done: J-ROWS block written (4 restated, 2 new)
> ITEM BLOCK 14 RATIONALE-A (the same six): planned | done: RATIONALE-A block written (4 restated, 2 new)
> ITEM verify on copies (apply-blocks, hand-off swap, refs, doc_checks): planned | done: block file sha256 3b285ab876d08e86…; alone 14/14 applied, 4+4 restated rows swapped (one row per id); design diff 184 changed lines, all in §5–§7 and the index; rationale diff 10; refs 2 baseline broken before and after, J ids 701 → 703; doc_checks '5,6,7,Judgment calls' C1 5/0, C2 0/0, C3 327/0, C4 3/0, S1 0/0, S2 0/0, exit 0 (baseline C3 326/0); rationale hit set identical; combined with the other four r1 files 54/54, no heading replaced twice

## Outcome

All 32 issues assigned to this lane are answered in `docs/validation/amendments-c/repair-r1-determinism.md`. The file
holds 12 REPLACE blocks (§5.2, §5.3, §5.4, §6.1, §6.2, §6.3, §6.4, §7.1, §7.3, §7.4, §7.5 and §7.7), one J-ROWS block and
one RATIONALE-A block. §5–§7 have no `####` headings, so each REPLACE is a whole `###` subsection. Each body is the live
subsection (sha256 `7f4c0e25…`) with count-asserted substitutions, and every untouched line is byte-identical. Four
rulings are restated under their existing ids: J-A67.61, J-A66.71, J-A76.72 and J-A72.61 (hand-off (1) in the block
file's preamble). Two rulings are new: J-A67.72 (`startWorks` wraps its change) and J-A68.73 (the warp carries three more
point records). Nothing was held, since every issue is a repair of assembled text, and no owner ruling is needed.

| issue | where | fix (short) |
|---|---|---|
| VD0-01 = VPR0-11 (major) | §6.1 `works`; §7.7 DR21; J-A67.61 | two keys: an epoch's Works keyed by target lineage + the epoch's week + epoch component (start offset drawn first, then the duration); a dated or scheduled Works keyed by target lineage + its given start week (duration only) |
| VD0-02 = V-MC0-19 (a) (major) | §7.5 | an older recipe's `character` entries become `districtIntent` field for field; an older district's stored `character` is dropped and recomputed |
| V-MC0-19 (b), (c) | §7.5 | a document without `nextUndergroundPart` takes 1; a `Terrain` without `geology` reads `ordinary` |
| VD0-03 (major) | §7.1 `startWorks`; §7.4 row; J-A67.72 | `change?: EditEvent`, folded at once under the event's `seq`, author and session; persisted with the event; undo = the change's inverse + the Works record |
| VD0-04 (major) | §7.3 item 9 (d); §5.2 F-EDIT; J-A66.71 | the closure rule and edit kind are the base's; the underground pieces run once the staged layer exists; until then the dry run returns F-EDIT naming the staged layer |
| V-MC0-04 (major) | §7.4 *Warp and what stands on the ground*; J-A68.73 | seven kinds of point record. A light re-seats at `sizeCm`; a door light takes its entrance vertex's displacement; an access point's opening moves in its ground host's face; a Works' kept rings and lines move by the mean-value image and are never re-seated |
| V-MC0-05 (major) | §5.3 entrance row | the main entrance stands on the footprint side facing the frontage access edge (set-back, hidden and cluster cases); side and rear doors follow §2.6 rule 2's "where the plot has an access edge beyond its frontage" |
| V-MC0-12 | §5.3 basement row | crawl-space exception, by §2.6's requested-mode ladder |
| V-MC0-20 | §6.2; §7.1 districts row; J-A72.61 | identity, pressure and name history: writers are generation, epochs, dossier events and (identity only) `setAttr`; §7.1 adds the dossier rename as a `nameHistory` writer |
| V-MC0-21 | §6.2 content node; §6.3 anchor row + matching routine | staged `ConditionOverlay`, `DepositSite` and `PowerRelation` records, anchored and matched by their binding key |
| V-MC0-22 | §7.7 item 9; §7.1 toolkit | `factTier` derives the tier (never stored; J-A20.23) |
| V-MC0-23 | §7.7 item 1 + ts block | `interface Intent` declared once; `water: WaterSetting` (§13.3's one spelling) rather than the verifier's `string` |
| V-MC0-24 | §7.1 terrain row | `setAttr` on `geology` is an override of S1's value and re-derives II.7.6's caverns |
| VKC-17 | §7.3 staged-layers row (both columns); §5.3 staged-layers row (same shape) | the far `link_end` vertices of links ending on the system are excepted |
| VPR0-25 | §7.7 DR11, DR16, DR18, DR19 | each row names only inputs its rule reads (seat classes and turf rows; the staged crime row; no migration or famine input; `PortRows.hinterland`) |
| VPR0-30 + VD0-13 | §6.1 readers | stage 2's ring courses (`cut.arc`) and pin picks (`pin.decor`); the cluster `wholeBlock` pick (`plot.join`); a deposit's bearing (`hinterland.outside`); the churn cap's extra draw (`epoch.transform`) |
| VD0-08 | §6.1 Enter; §6.4 link | "the district intents (`districtIntent`)" |
| VD0-10 | §6.3 lineage | a light's creation index is its rule row plus its ordinal along the host |
| VD0-11 | §6.1 `sewer`; §7.3 item 9 (d) | underground closure generators draw on `sewer`; the others draw on the concern of the stage they call; each instance is built by the generators its edit kind declares |
| VD0-14 | §6.2 *Histories* | bearing draws are keyed by a binding key, never by the dossier's values |
| VD0-15 | §6.1 | `cut.arc`: one uniform per corner that step 5 keeps on a lane or street cut |
| VD0-16 | §7.3 item 9 (a) and the operator row; J-A66.71 | one event whose batches commit together; "transaction" keeps §3.3's meaning |
| VD0-17 | §7.3 item 10; §6.1 variations | three distinct rerolls, each advanced past equal content within `reroll.maxAdvance` |
| VD0-18 | §7.1 comment | declaring sections corrected; `AccessPoint` (II.7.4) added |
| VD0-19 | §7.1 uses, underground and names rows | `concealmentSource`, `walkway`, `displayText` and `RegionGroup` paths |
| VD0-20 | §5.2 F-PLOT | the `hovel` fallback rung; the test-cell typo |
| VD0-22 | §5.4 | `W_CUT_SLID` added to the `kernel.warnings` comment |
| VD0-23 | §7.5; J-A76.72 | predecessor's week + round(52 × `years`) |
| VD0-24 | §7.4 knownTo row | a dossier-set `knownTo` is dossier-owned and its `setAttr` is refused (J-A20.77) |
| VD0-25 | §7.4 underground row | "whose element is unmapped" |

## Judgment calls made here (vetoable)

1. **J-A68.73 (new): door lights and Works rings.** A door light follows its entrance vertex's displacement instead of
   the mean-value image in the footprint face. It stands on the footprint's edge, where the clearance inset would push it
   indoors. A Works' kept rings are never re-seated, because they are drawn history. The verifier's text named only the
   host faces; both refinements are this seat's. A light's clearance is its `sizeCm`; an access point's opening has none.
2. **J-A67.72 (new): the wrapped change and its identity fields.** The change takes the `startWorks` event's `seq`, author
   and session, with its own `EditBase` fields unset. As a result, what it mints keys from the one event (§6.3). The
   verifier left this implicit.
3. **`Intent.water: WaterSetting`** rather than `string`. §13.3 calls `WaterSetting` "the one spelling of a water setting:
   … every record". The other `Intent` comments (0–1 ranges for planned, wealthLevel, defence and density) read item 1
   and §7.8; they add no new value.
4. **Same-shape sweeps beyond the listed text.**
   * §5.3's staged-layers row makes the same link-locality overclaim as VKC-03/VKC-17, and it is fixed the same way.
   * §5.3's side-door clause now reads as §2.6 rule 2 does.
   * §5.2 F-EDIT gains the staged-layer refusal that VD0-04's new §7.3 sentence produces, so F-EDIT's list stays whole.
   * §6.1's variations bullet matches VD0-17.
   * §6.3's matching routine names the key-matched staged records.
   * §7.1's districts row names the dossier rename as a `nameHistory` writer.
   * §7.1's toolkit names `factTier` instead of the "tier marker".
5. **VPR0-25 DR16** keeps the crime input as §10.2's staged crime row, the verifier's second option, rather than dropping
   it. The row's rule, §4.6's staged crime term, reads it.
6. **DR19** states the `PortRows.hinterland` reading in its own cell ("scales §4.9's farmland once the port fills it"),
   so the cell stands whether or not the pipeline's VPR0-15 hook sentence lands.

## Cross-part notes (not this part's text; for the owning repair seats)

* **Pipeline, II.7.6** (l. 15754): "the closure rule — one event, one transaction, …" has VD0-16's wording. It should read
  "one event whose batches commit together" (J-A66.71 restated).
* **Pipeline, §4.7 *Concealed institutions* (1)** (l. 5452–5453): "a dossier value outranks a map override as it does for
  `knownTo` (§7.7 item 7)" is the override clause that J-A20.77 superseded (VD0-24's sibling). **Model, §2.7**
  `Use.concealmentSource`'s comment (l. 1808) has the same clause. Both should say a dossier-set value is dossier-owned,
  so a map `setAttr` of it is refused.
* **Rendering §11.1** (l. 11656: "§2.8's marker labels `declared`") and **scope §13.2 / §14 / §16** (l. 13121, 13847,
  14485: "the tier marker") use V-MC0-22's stored-marker wording. Each should name `factTier`, which derives the tier.
* VKC-16 (II.7.5) and VKC-19 (§13.2 T65-6) are the pipeline's and scope's twins of VKC-17. §3.1's `W_CUT_SLID` is the
  kernel's VD0-21.

## Receipts (scratch `rdc1/`)

All checks ran on copies; the live design, rationale and validation files were not touched (sha256 `7f4c0e25…` and
`22f01184…` before and after).
* **Composition.** `compose.py` asserts both base hashes and the count of every substitution (56 substitutions over 12
  REPLACE blocks). It asserts that each body opens with its heading and holds no `=== ` line, and that every J / Part A
  row is a table row. The block file (sha256 `3b285ab876d08e86…`) ends in `=== END ===`.
* **Apply.** `apply-blocks.py` with this file alone gave 14 found, 14 applied, 0 skipped, audit 0 not OK. The notes were
  the four expected "DUPLICATE ID inserted" rows. `swap.py` (hand-off (1)) left one row per id in both tables.
  * Design: 16 872 → 16 918 lines. The diff holds 184 changed lines, all in §5.2–§7.7 and the four swapped and two added
    index rows. Headings are 147 → 147, fences balanced, title block unchanged.
  * Rationale: 10 changed lines (4 swapped entries, 2 added).
* **References.** `amendments-b/refs.py` found 2 broken before and 2 after. Both are the pre-existing external citations
  (`os-geometry.md` §2.1.4, RFC 7946 §3.1.6). J ids went 701 → 703.
* **Document checks.** The command was `doc_checks.py --doc <copy> --sections "5,6,7,Judgment calls"`.
  * Result: C1 5/0, C2 0/0, C3 327/0, C4 3/0, S1 0/0, S2 0/0, exit 0. The live design gives C3 326/0 on the same
    sections.
  * Seven C3 runs in this seat's first wording were reworded rather than allowed: "by the district with the", "by the
    block with the", two § digit runs, "end on it 3 4", "a building s footprint the", and one rationale phrase.
  * The rationale's full hit set (`--heads docs/ARCHITECTURE.md`) is identical before and after.
  * No allow row was added.
* **Combined.** With every r1 block file on disk (determinism, kernel, model, pipeline and rendering), 54 of 54 blocks
  applied, audit 0 not OK. No other file REPLACEs a §5–§7 heading.
* **Files.** `rdc1/compose.py`, `specs.py`, `swap.py`, `mark.py`, `compose-log.json`, `apply-log.json`, `doc.diff`,
  `dc-before.txt`, `dc-final.txt`, `dcr-before2.txt`, `dcr-after2.txt`, `refs-before.json`, `refs-final.json`, `comb/`.

## CONFIRMED versus PLAUSIBLE

**CONFIRMED** by executed script or check on copies:
* every old text replaced (count-asserted);
* the blocks' application and the row swap;
* the diff's extent;
* the reference and document-check counts;
* the combined application with the other r1 files;
* the verifier texts each fix follows.

**PLAUSIBLE**, as a reading:
* that the six vetoable calls above are the smallest fixes coherent with §2.6, §2.7, §4.7, §4.11 and II.7.4;
* that DR19's cell and the §7.4 door-light rule are what the model and pipeline seats' r1 texts intend.
