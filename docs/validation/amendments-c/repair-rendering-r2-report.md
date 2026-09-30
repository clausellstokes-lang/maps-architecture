# repair-rendering-r2 — lane amendments-c/repair-rendering-r2 (repair round 2, RENDERING part §8, §9, §11, §12)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat amendments-c/repair-rendering-r2; queued in docs/FABLE-REVIEW-QUEUE.md.

> PROGRESS (kill-safe ledger; one line per item — planned | done). The block file is
> `docs/validation/amendments-c/repair-r2-rendering.md` (blocks only); this file is the lane's report.
> Design read: `docs/ARCHITECTURE.md` sha256 `024c57dabc6b93c8…`, rationale `33b21ca8cdc15789…` (both untouched by this seat).
> Generator scripts: scratchpad `rr2/` (`lib.py`, one `b_*.py` per block), each substitution asserted to match once.
> ITEM receipt (VRC1-01, VRC1-02, VRC1-12 figures): planned docs/validation/bench/amendc_repair_rendering_r2_traversal.{py,out} | done: written and run (sha256 d7084a96… .out)
> ITEM V-MC1-09 = VD1-11 = VRC1-10 (20 (h)): planned §9.2, §11.1, §11.2 + hand-off (J-A20.82 row and entry) | done: §9.2, §11.1, §11.2 blocks + hand-off 2
> ITEM VRC1-01 (68): planned §8.1, §8.3, §8.4, §8.8, §8.9, §12.5, §12.8 + J | done: §8.1, §8.3, §8.4, §8.8, §8.9, §12.5, §12.8 + J-A68.90, J-A68.89 restated
> ITEM VRC1-02 (68): planned §8.3, §8.4, §8.8 + J | done: §8.3, §8.4, §8.8 + J-A68.83 restated
> ITEM VRC1-03 (63 (c), 64, 68): planned §8.1, §8.3, §8.4, §8.8, §11.1 + J + pipeline note (II.7.4) | done: §8.1, §8.3, §8.4, §8.8, §11.1 + J-A63.82 + hand-off 4 (II.7.3)
> ITEM VRC1-04 (68): planned §8.4 + J | done: §8.4 (+ §8.2 pointer) + J-A68.91
> ITEM VRC1-05 (68): planned §8.2, §11.1 | done: §8.2, §11.1
> ITEM VRC1-06 (68): planned §8.3 | done: §8.3 (four rows)
> ITEM VRC1-08 (101): planned §11.2 | done: §11.2
> ITEM VRC1-09 = VS1-03 (81): planned §12.2, §11.4 | done: §12.2, §11.4
> ITEM VRC1-11 (73, 85): planned §11.2, §11.3, §11.4 + J | done: §11.2, §11.3, §11.4 + J-A85.83
> ITEM VRC1-12 (68): planned §8.8, §12.8 | done: §8.8, §12.8, §11.1 (+ J-A68.90)
> ITEM VRC1-13 (68): planned §12.7 | done: §12.7 (+ J-A68.85 restated)
> ITEM VRC1-14 (67): planned §8.2 | done: §8.2
> ITEM VRC1-15 (67): planned §8.1, §8.2, §8.3 + J | done: §8.1, §8.2, §8.3 + J-A67.83
> ITEM VRC1-16 (68): planned hand-off (J-A68.86 Part A clause) | done: hand-off 3
> ITEM VRC1-17 (68): planned §8.4, §12.5 + J | done: §8.4, §8.8, §8.9, §12.5 + J-A68.92
> ITEM VRC1-18 (101 (b)): planned §11.2, §11.3 + J | done: §11.2, §11.3 + J-A101.86
> BLOCK §8.1 (VRC1-01 surfaceTopCm, VRC1-03 light host rule, VRC1-15 worksKind): planned | done: REPLACE written (5 edits)
> BLOCK §8.2 (VRC1-04 pointer, VRC1-05, VRC1-14, VRC1-15): planned | done: REPLACE written (5 edits)
> BLOCK §8.3 (VRC1-01, VRC1-02, VRC1-03, VRC1-06, VRC1-15; two 1-px rows qualified by the floor): planned | done: REPLACE written (5 edits, 7 rows added)
> BLOCK §8.4 (VRC1-01, VRC1-02, VRC1-03, VRC1-04, VRC1-17): planned | done: REPLACE written (6 edits)
> BLOCK §8.8 (VRC1-01, VRC1-02, VRC1-03, VRC1-12, VRC1-17): planned | done: REPLACE written (9 edits)
> BLOCK §8.9 (VRC1-01/02 pyramids and rings across the boundary, VRC1-17): planned | done: REPLACE written (6 edits)
> BLOCK §9.2 (V-MC1-09 = VD1-11 = VRC1-10): planned | done: REPLACE written (1 edit)
> BLOCK §11.1 (V-MC1-09 x3, VRC1-03 exports and Knowledge, VRC1-05 SVG wrapper, VRC1-12 dilated transient list): planned | done: REPLACE written (11 edits)
> BLOCK §11.2 (V-MC1-09, VRC1-08, VRC1-11 registerProvider, VRC1-18 clerk -> bridge): planned | done: REPLACE written (5 edits)
> BLOCK §11.3 (VRC1-18 preview messages, VRC1-11 no code over the bridge): planned | done: REPLACE written (4 edits)
> BLOCK §11.4 (VRC1-09 = VS1-03 cap, VRC1-11 door (4)): planned | done: REPLACE written (3 edits)
> BLOCK §12.2 (VRC1-09): planned | done: REPLACE written (1 edit)
> BLOCK §12.5 (VRC1-01/02 traversal cost and rings, VRC1-17 lantern): planned | done: REPLACE written (1 edit)
> BLOCK §12.7 (VRC1-13, the traversal's costs and fallback): planned | done: REPLACE written (3 edits)
> BLOCK §12.8 (VRC1-12 window, VRC1-01 Q in the export-time canvases): planned | done: REPLACE written (4 edits)
> BLOCK §8.8 regenerated (ring-holding rule simplified); it now stands after §12.8 in the file (order is immaterial to the applier)
> BLOCK J-ROWS (new J-A68.90, J-A63.82, J-A68.91, J-A68.92, J-A85.83, J-A101.86, J-A67.83; restated J-A68.83, J-A68.85, J-A68.89 — swap): planned | done: written (10 rows)
> BLOCK RATIONALE-A (the same ten): planned | done: written (7 new, 3 restated)
> VERIFY: planned (copy apply, hand-offs, refs, doc_checks) | done: alone 17/17 applied, audit not-OK 0, headings 147 → 147,
> fences balanced; with the five sibling r2 files 55/55, no double REPLACE, hand-offs 5/5 match once; refs 2 broken (the
> pre-existing externals), J ids 720 → 727; doc_checks --sections "8,9,11,12,II.7,Judgment calls" exit 0 (C1 5, C3 269,
> C4 1, all reviewed — the same counts as the live design), no allow row added. LANDED line: see the end of this file.

## Outcome

All 18 routed rows are fixed. They are 16 distinct issues: V-MC1-09, VD1-11 and VRC1-10 are one issue, and VRC1-09 and
VS1-03 are one. None was ruled invalid. The fixes are 17 blocks in `docs/validation/amendments-c/repair-r2-rendering.md`:
* 15 REPLACE blocks: §8.1, §8.2, §8.3, §8.4, §8.8, §8.9, §9.2, §11.1, §11.2, §11.3, §11.4, §12.2, §12.5, §12.7 and §12.8.
  These parts have no `####` headings, so the whole `###` subsection is the smallest unit.
* One J-ROWS block and one RATIONALE-A block, each with 7 new ids and 3 restated ones.

Every REPLACE body was generated by a script from the live design (sha256 `024c57da…`), using exact substitutions that
are each asserted to match once. Every line outside the edits is therefore byte-identical.

No other r2 seat REPLACEs any of these headings or writes any of these J ids. This was checked against the determinism,
kernel, model, pipeline and scope r2 files.

Five one-string substitutions are left to the assembler (§ Assembler hand-off).

**Corrections of the verifiers' proposed text.** Two corrections rest on evidence and one is a mechanism choice:
* **VRC1-01.** Rejected: the verifier's full-resolution rings out to R. Adopted: a world-distance window, rings held as
  height pyramids at a level that coarsens with distance, and a resolution floor.
  * Why: a 15° path sun over a 45 m tower at 1:500 reaches six rings. Their heights alone are about 96 MB at the reference
    view, over every tier's ceiling.
  * Why the fade alternative was not taken: it would make a shadow's length depend on the zoom stop, which J-A68.84 rules
    out.
  * Result: the floor lengthens a far caster's shadow by at most 1⁄128 of its distance, and never shortens it. Every tier
    keeps its DPR.
* **VRC1-02.** Rejected: the verifier's "N samples, each reading the maximum over its interval". Adopted: a traversal of
  the max-height pyramid.
  * Why: the receipt measures the interval variant flaring a 45 m tower's shadow by +82 px per side at 20 m, where the
    traversal flares it by +1 px.
  * The same receipt showed a second defect: the window must run to (Z − z) ÷ (m − σ), or it cuts the penumbra at the
    geometric tip.
* **VRC1-11.** Door (4) gains the verifier's `registerProvider` call, and the bridge gains no message for it. The reason
  is the owner's standing rule, item 21 (d): the bridge carries data only and keeps the module a separate program.
  SettlementForge therefore uses doors (1)–(3).

| issue | section | fix |
|---|---|---|
| V-MC1-09 = VD1-11 = VRC1-10 | §9.2, §11.1 (three places), §11.2; hand-off 2 | "§2.8's marker" becomes "§2.8's `factTier`". The skeleton row reads "every event whose entities §2.8's `factTier` reads `declared`". J-A20.82's index row and Part A entry get the same change by substitution. |
| VRC1-01 (major) | §8.4 (c), §8.8, §8.9, §8.1, §8.3, §12.5, §12.8 | The window R is a world distance: (Z − z) ÷ (m − σ). Z is the new `DisplayList.surfaceTopCm`, and m is max(tan α, ⅛) — K05's 8× cap. For the cursor sun, R is at most \|P − G\|. The GPU reads the rings the window reaches, held as pyramids only: the first ring from level 0, and ring j from level ⌊log₂(4(j − 1))⌋. The canvas need gains Q = P ÷ 12 + (2(a + b) + 4) ÷ 3 + 3 MB. The worked cases are 171 / 122 / 68 / 104 / 176 / 95 MB, and every tier keeps its DPR. A new §8.3 bar covers tile lines at four grid offsets. Restated: J-A68.89. New: J-A68.90. |
| VRC1-02 | §8.4 (c), §8.8, §8.3 | The one law is now a traversal of a max-height pyramid. Cells are resolved to the texel within half a tile side; beyond it, the resolution floor ℓ(t) = ⌊log₂(4t ÷ S)⌋ limits a cell to t ÷ 128. A cell that cannot lower the minimum is skipped, which is exact. The law is the same in the CPU reference, the GPU and the bake. A new §8.3 bar covers narrow casters (2, 6 and 12 m wide). Restated: J-A68.83. |
| VRC1-03 (major) | §8.1 item 7, §8.4 (b), (f), §8.8, §11.1, §8.3; hand-off 4 | A light draws only where its host draws. A `light` mark carries its host's `concealed` and `knownTo`. The rule reaches the pass, the bake, the glow and every export (dd2vtt, glTF, GeoJSON, a storey's lights, *Knowledge*). The knowledge key joins the tile key and the light-map key. The tile key also gains "a mark drawn only for a key that admits it", which closes the same gap for a secret access mark. A new §8.3 row tests it at night and underground. New: J-A63.82. |
| VRC1-04 | §8.4 (f), §8.2 | A cell operation runs on each tile's own grid from its corner. It averages the base weighted by 1 − coverage and writes only the uncovered share, the same on every path. New: J-A68.91. |
| VRC1-05 | §11.1 SVG row, §8.2 | The colour matrices become one filter on a wrapper group `<g id="lit">` holding the base groups, `layer.shadow`, the glows and `layer.light`, under the labels. §8.2 points to it. |
| VRC1-06 | §8.3 | Four rows: which sun draws, the sheet's default light, the post operations after the light, and the light-map keys. |
| VRC1-08 | §11.2 | `PreviewResult` is a union, and its `refused` arm carries only its reason. |
| VRC1-09 = VS1-03 | §12.2, §11.4 | A dossier outside the ladder is refused: below 1 500, or above the 120 000 cap (J-A81.01). |
| VRC1-11 | §11.2, §11.3, §11.4 | `registerProvider` joins `PlatApi` and the call table. The bridge carries data and never code. Door (4) is for in-page embedders and scripts. New: J-A85.83. |
| VRC1-12 | §8.8, §12.8, §11.1 | A lit export is computed tile by tile over each tile's own window, ≈ 21 MB whatever R. Its transient list covers the frame dilated by R and the largest light radius. |
| VRC1-13 | §12.7 | "(24 → 12 samples)" is gone. The bake fallback now resolves the point lights one pyramid level coarser. Restated: J-A68.85. |
| VRC1-14 | §8.2 | "(item 67 (f); §4.11's *Works* (4))". |
| VRC1-15 | §8.1, §8.2, §8.3 | New `StateRow.worksKind` and a `worksKind` column. The `repair` row is an override laid over the stage's row: a scaffold and a work yard. The census adds a repair begun on a collapsed building. New: J-A67.83. |
| VRC1-16 | hand-off 3 | J-A68.86's Part A clause becomes "their builds and their P-ids P22–P24 (the readings' sections are … §(d)'s)". |
| VRC1-17 | §8.4 (f), §8.8, §8.9, §12.5 | The hand lantern is evaluated per frame on the GPU by (c)'s law and costs ≤ 0.5 ms. Exports and stills draw no lantern. New: J-A68.92. |
| VRC1-18 | §11.3, §11.2 | Bridge messages `preview { events, view? }` and `preview.result { result }`, with `re` correlation. §11.2's clerk paragraph names them. New: J-A101.86. |

**Needs a ruling.** None of these calls is owner-gated; all are recorded as vetoable judgments.
* **J-A68.90:** the window, the rings and the resolution floor. This changes the claim from "a tip within 1 px" to "within
  max(1 px, the floor cell)", and two existing §8.3 rows are qualified to match.
* **J-A68.83:** restated, the traversal.
* **J-A63.82:** a light draws only where its host draws.
* **J-A85.83:** no provider over the bridge.
* **J-A68.91:** the cell operations' weighting.
* **J-A68.92:** the lantern.
* **J-A101.86:** preview over the bridge.
* **J-A67.83:** the repair overlay.
* **J-A68.85 and J-A68.89:** restated.

**CONFIRMED / PLAUSIBLE.**
* **CONFIRMED** (executed):
  * the blocks apply alone (17/17) and with the siblings (55/55);
  * the hand-offs match once;
  * refs are unchanged (2 external);
  * doc_checks exit 0 with the base's counts;
  * on the rationale copy, 2 fewer C3 hits and C4 unchanged in count;
  * the receipt `docs/validation/bench/amendc_repair_rendering_r2_traversal.{py,out}` shows:
    * (1) on every grid offset, the exact law's start lies within 1 px of the similar-triangles V = 0.5 point, and the floor
      law adds at most its cell (+1 px against 4; +13 against 16 at 169 m);
    * (2) one run behind towers 2, 6 and 12 m wide;
    * (3) flare within one cell per side, while the interval variant flares by +82 to +180 px;
    * (4) cells visited: median 17–22, p99 ≤ 62, max 86;
    * (5) Q and the ≈ 21 MB export window.
* **PLAUSIBLE until M2b:** GPU frame times, the settle with the rings, the lantern's cost, and the canvas worked cases.

## Held parts (gate (a)) — none written
The blocks write no held part. The rendering part's share of route §C.4 is:
* **Item 68 (g):** "MFCG draws no cast shadows". This stays our preset's behaviour, J-A68.86.
* **Item 68, support:** VG 1.6.9's shadow and night-light layers, and Dwellings' shading and occlusion.
* **Item 59:** the Fantasy Manor timing stays released and labelled in §12.7.
* **Not this part:** item 58 (f), item 49's 49 % figure (its deletion rejected) and item 37's metre reading.

## Assembler hand-off (in this order; the script is `docs/validation/amendments-c/repair-rendering-r2-handoff.py`)
1. **Swap the restated rows.** J-A68.83, J-A68.85 and J-A68.89 appear twice, in the index and in Part A. apply-blocks
   reports them as "DUPLICATE ID inserted". Move each appended row into the older row's place and delete the older row.
   This is the same step as r1's; the id list is those three.
2. **J-A20.82.** In the index row, "by §2.8's marker (`dossier`" becomes "by §2.8's `factTier` (`dossier`". In Part A,
   "by §2.8's marker — `dossier`" becomes "by §2.8's `factTier` — `dossier`".
3. **J-A68.86, Part A (VRC1-16).** The readings' clause becomes "their builds and their P-ids P22–P24 (the readings'
   sections are `research/findings/code-impact.md` §(d)'s)".
4. **II.7.3 (VRC1-03's cross-part note; pipeline owns II.7.3).** Apply after pipeline's r2 REPLACE of II.7.3, whose body
   holds the string once. "is a light shaft for §8.4's lighting:" gains ", a secret one lit only for a key under which it
   draws (§8.1 item 7)". The verifier placed this sentence in II.7.4, but it stands in II.7.3.
5. **§13.4 (scope's).** "— the march unchanged —" becomes "— the traversal unchanged —".

Tested on the copy that holds all six r2 files: every substitution matches once. doc_checks on
`8,9,11,12,II.7,13.4,Judgment calls` exit 0.

## Cross-part notes (for the owners' next round)
* **Pipeline, §4.7's light placement.** No change is needed. Lights hosted by concealed parts and by access points are
  already records with a host, and §8.1 item 7 reads the host's mark.
* **Scope, §13.2.** T30-5 already carries VRC1-07's refusal bar (scope r2). The T68 bars are generic, and §8.3 holds the
  new rows.

LANDED: 2026-09-28 13:21 amendments-c/repair-rendering-r2 LANDED docs/validation/amendments-c/repair-r2-rendering.md docs/validation/amendments-c/repair-rendering-r2-report.md docs/validation/amendments-c/repair-rendering-r2-handoff.py docs/FABLE-REVIEW-QUEUE.md (opus stand-in for the Fable seat; 18 routed rows / 16 distinct fixed, none invalid, none held, on design 024c57da… / rationale 33b21ca8…: 15 REPLACE §8.1–§8.4, §8.8, §8.9, §9.2, §11.1–§11.4, §12.2, §12.5, §12.7, §12.8 + J-ROWS/RATIONALE-A (new J-A68.90, J-A63.82, J-A68.91, J-A68.92, J-A85.83, J-A101.86, J-A67.83; restated J-A68.83, J-A68.85, J-A68.89 — swap). HAND-OFFS (report § Assembler hand-off; script repair-rendering-r2-handoff.py): (1) swap the three restated rows; (2) J-A20.82 row + Part A 'marker' -> factTier; (3) J-A68.86 Part A clause (VRC1-16); (4) II.7.3 shaft sentence, after pipeline's II.7.3 REPLACE (VRC1-03 note); (5) §13.4 'the march unchanged' -> 'the traversal unchanged'. Verified on copies: alone 17/17, with the five sibling r2 files 55/55, audit not-OK 0, headings 147 -> 147, hand-offs 5/5 once; refs 2 broken (pre-existing externals); doc_checks 8,9,11,12,II.7,Judgment calls exit 0 at the base's counts, no allow row. Receipt docs/validation/bench/amendc_repair_rendering_r2_traversal.{py,out})
