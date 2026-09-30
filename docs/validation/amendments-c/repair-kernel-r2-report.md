# repair-kernel-r2 — lane amendments-c/repair-kernel-r2 (KERNEL part, §3): report and ledger

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat amendments-c/repair-kernel-r2; queued in docs/FABLE-REVIEW-QUEUE.md.

Block file: `docs/validation/amendments-c/repair-r2-kernel.md` (blocks only). Base: `docs/ARCHITECTURE.md` sha256
`024c57dabc6b93c8…`, `docs/ARCHITECTURE-RATIONALE.md` sha256 `33b21ca8cdc15789…` (assemble-r1's output, unchanged).

PROGRESS (kill-safe ledger; one line per item, updated after every block)
ITEM VKC1-01 (81 (b) / 65): planned REPLACE §3.2 ((9) frame growth, underground parts' ring pointer) | done: block 1 (REPLACE §3.2) — complete
ITEM VKC1-03 (81 (b)): planned REPLACE §3.3 (clear regions: the growth as a user, its region) | done: block 2 (REPLACE §3.3) — complete
BLOCK FILE: complete — 2 blocks (REPLACE §3.2, §3.3) + END; no new ruling, so no J-ROWS or RATIONALE-A. RECEIPTS: done (§4). REPORT: done.

## 1 Outcome

Both issues routed to this seat are fixed, by two REPLACE blocks (§3.2 and §3.3) that each change one sentence and
nothing else. Neither fix is a new ruling, so the block file carries no J-ROWS or RATIONALE-A block, and the rationale
file is untouched. J-A81.31's index row and Part A entry never cited II.7.3 or the underground parts, so neither needs a
restatement.

| id | subsection | change |
|---|---|---|
| VKC1-01 | §3.2 (9), *Frame growth at an epoch* | "Every underground part whose outer ring is the frame with its margin (II.7.3) grows by (a) and (b) on its own key" becomes "Every underground part — its outer ring the frame with its margin (the sewer's, II.7.2; each further part's, §2.2 rule 1) — grows by (a) and (b) on its own key". The broken II.7.3 pointer is gone, and the conditional is now a plain statement. |
| VKC1-03 | §3.3, *Clear regions and prepared contacts* | The users' list gains ", an epoch's frame growth (§3.2 (9))". The region's parenthesis gains "; for the frame growth, the whole L1 faces §3.2 (9) names instead". Both are the verifier's text verbatim. |

**One wording departure from the verifier's text (VKC1-01; vetoable).** The verifier wrote "every other part's". I wrote
"each further part's", for two reasons. First, the verifier's wording is an unreviewed C3 hit ("7 2 every other part")
when doc_checks runs over §3. It is a false positive of plain English, but rewording it removes the hit without adding an
allow row. Second, "further parts" is §2.2 rule 1's own name for the paragraph the pointer lands on ("The underground
layer's further parts"). The meaning is unchanged. The lines are rewrapped only where the new words fall; a
whitespace-normalised comparison of each subsection shows the anchor replacement is the only change.

**The fix is coherent with rules 1–3 (checked, not assumed).** Adding the growth to §3.3's users puts it under the
protocol's three rules, so I checked each one against §3.2 (9)'s batches:
* **Rule 1.** It keeps structural finer edges (ways, walls, setback and glacis lines, deck spans). All of them are L1
  chains (§2.2 rule 1), so nothing structural is finer than the growth's L1 batch (c). Batch (a) clears only partition
  content.
* **Rule 2 and rule 3.** The new L0 ring of batch (b) lies outside the old arena, so it meets no finer geometry and needs
  no prepared vertex. The new rectangle of batch (c) lies only in faces that batch (a) cleared.
* **`clearRegion`.** `KernelTx.clearRegion` ("clearFiner acts only on faces meeting it") selects exactly the finer faces
  nested in the region's whole L1 faces, since every finer face nests in one L1 face.

## 2 Cross-part notes

1. **Model (VKC1-02).** VKC1-01's pointer to §2.2 rule 1 depends on VKC1-02. The model seat's r2 block
   (`repair-r2-model.md`, REPLACE §2.2, J-A65.22) now states that the further part's ring is "the ground's frame plus its
   context margin, as the sewer's is (II.7.2)". If the assembler dropped that block, the pointer would still resolve, but
   to a paragraph that does not state the ring.
2. **Pipeline (VKC1-05).** The pipeline's §4.11 re-deriver clause ("on each underground part §3.2 (9) grows") matches
   the new unconditional "Every underground part … grows".
3. **Double replacement.** No other r2 seat REPLACEs §3.2 or §3.3. At 12:15 the r2 files were determinism §5.2, §5.4,
   §6.1, §7.1, §7.4 and §7.5; model §2.2, §2.3, §2.6, §2.7 and §2.8; pipeline §4.2, §4.5, §4.7, §4.9, §4.10 and §4.11.

## 3 Held parts (gate (a)) — so nothing is lost

Neither issue touches a held part, and this seat applied none. The pass's held parts are unchanged, and none touches §3:
* **52**: the references' visibly different session-reached maps;
* **35 (support)**: the position check on 160 of 162 faces;
* **60 (support)**: the 16-cell hand-off support;
* **68 (g)**: "MFCG draws no cast shadows";
* **68 (support)**: VG 1.6.9's shadow and night-light layers, and Dwellings' shading and occlusion.

Item 49's deletion stays rejected.

## 4 Receipts

* **This seat's blocks alone**, `apply-blocks.py` on scratch copies:
  * 2 of 2 blocks applied, audit not-OK 0;
  * headings 147 → 147, fences balanced, title block unchanged;
  * index 723 = Part A 723;
  * `diff` against the live design shows exactly two hunks (l. 2597–2598 → 2597–2599 and l. 2673–2677 → 2674–2679);
  * the rationale is byte-identical;
  * the output design's sha256 is `9abb27e6…`.
* **Combined with every r2 block file on disk at 12:15** (determinism, kernel, model, pipeline): 22 of 22 blocks
  applied, audit not-OK 0, 0 skipped, headings 147 → 147. Both kernel blocks are "OK (present once)".
* **`doc_checks --sections "3"` on the scratch output** exits 0: C1 5/0, C2 0/0, C3 96/0, C4 0/0, S1 0/0, S2 0/0. This
  matches the live design's counts, and no allow row was added. The verifier's literal wording had given C3 97/1.
* **Residue grep** of the combined output: no "whose outer ring" and no "ring is the frame" remain.

CONFIRMED versus PLAUSIBLE:
* **CONFIRMED** by the executed checks above: the blocks apply, they change only the two sentences, and they pass the
  document checks.
* **CONFIRMED** by reading the whole of §3.2, §3.3, §2.2 rule 1, II.7.2 and J-A81.31 (index row and Part A): each
  pointer lands on a text that states what it points to (§2.2 rule 1 once VKC1-02 lands).
* **PLAUSIBLE and vetoable**:
  * the "each further part's" rewording;
  * the verifier's design choice, which I inherit, that every underground part's ring is the frame-wide ring (VKC1-02,
    J-A65.22).
