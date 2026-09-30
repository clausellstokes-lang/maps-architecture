# repair-determinism-r3 — lane amendments-c/repair-determinism-r3 (repair round 3, DETERMINISM part: §5, §6, §7)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat amendments-c/repair-determinism-r3; queued in docs/FABLE-REVIEW-QUEUE.md.

> PROGRESS (kill-safe ledger; one line per block — planned | done). The block file is
> `docs/validation/amendments-c/repair-r3-determinism.md` (blocks only); the assembler hand-off script is
> `docs/validation/amendments-c/repair-determinism-r3-handoff.py`; this file is the lane's report.
> Base: docs/ARCHITECTURE.md sha256 3daa0b0731b8c76f… and docs/ARCHITECTURE-RATIONALE.md sha256 bfa20419ca4dd6e5…
> (assemble-r2's output, the state validate.md judged). Scratch: c0d81c15…/scratchpad/rdc3/.
> ITEM 68 (VD2-01) BLOCK 01 §7.4: planned | done: REPLACE §7.4 written (3 substitutions: the door light keeps its fraction of the footprint ring's edge its point lies on — the boundary mean-value image; never re-seated, keeping that point; a locked door light goes with that ring edge) — reworded once to clear 2 C3 coincidences
> ITEM 88 (VPR2-07 = VD2-02) + VD2-03 home convention BLOCK 02 §7.7: planned | done: REPLACE §7.7 written (3 substitutions: F4 cell and the status table's impaired row name the impaired institution's own dial term with §4.5 (6); the pointer convention '§7.7 layer n' / '§7.7 item n' stated at the layer list's head) — reworded once to clear 1 C3 coincidence
> ITEM 68 (VD2-01) BLOCK 03 J-ROWS (J-A68.73 restated): planned | done: J-ROWS written (J-A68.73 restated: the door light keeps its fraction of the footprint ring's edge it stands on, never re-seated)
> ITEM 68 (VD2-01) BLOCK 04 RATIONALE-A (J-A68.73 restated): planned | done: RATIONALE-A written (J-A68.73 restated: the fraction kept; why a shift by the entrance vertex's displacement fails under a turning warp; repair r3, VD2-01)
> ITEM 77 (VD2-03) HAND-OFF script (25 layer-2 + 1 layer-1 substitutions, post-checks): planned | done: docs/validation/amendments-c/repair-determinism-r3-handoff.py written (26 context rewrites: 25 → '§7.7 layer 2', 1 → '§7.7 layer 1'; post-check: 14 item-2 and 11 item-1 contract pointers left, all whitelisted — one line-wrapped item-1 pointer at §2.9 l. 2216 found and whitelisted; the rationale's 3 checked; a guarded harmonisation of scope's §13.2 fixture wording)
> VERIFY on copies (apply-blocks, swap, hand-off, refs, doc_checks): planned | done: see Receipts (alone exit 0 = base; combined with the model, pipeline and scope r3 files 24/24 applied, one sibling C3 hit only)
> QUEUE row + LANDED line: planned | done

## Outcome

All three issue rows routed to this lane are fixed. None is invalid, none is held, and none needs an owner ruling.

| issue | item | where | fix |
|---|---|---|---|
| VPR2-07 = VD2-02 (minor, conflict) | 88 | §7.7: the F4 row and the status table's `impaired` row | The non-physical impairments now reach "the impaired institution's own dial term only (§4.5 (6); J-A88.42)" in F4, and "(§4.5 (6))" in the status row. Both follow the validator's text. Applied once. |
| VD2-01 (minor, new problem) | 68 | §7.4 *Warp and what stands on the ground* (three places); J-A68.73 restated in the index and Part A | A door light now keeps its fraction of the footprint ring's edge its point lies on. Its new point is that edge's two end vertices after the move, blended at the old fraction. This is the mean-value image of a boundary point, using only `+ − × ÷`, rounded to the lattice. So the light stays on a facade that the warp slides or turns. It is never re-seated, and a locked door light goes with that edge. |
| VD2-03 (minor, broken reference) | 77 | assembler hand-off script; §7.7's list head | The script makes 25 context-anchored, count-asserted rewrites of '§7.7 item 2' → '§7.7 layer 2' and one of "§7.7 item 1's outcome targets" → "§7.7 layer 1's …". It then checks that every '§7.7 item 1/2' left is a known dossier-contract pointer. §7.7 now states the convention at its home. |

The block file holds 2 REPLACE blocks (§7.4 and §7.7), each a whole `###` subsection of design `3daa0b07…` with count-asserted substitutions. Every other line is verbatim. The file also holds one J-ROWS block and one RATIONALE-A block. The only ruling is J-A68.73, restated under its own id, so there is no new id. The assembler swaps it into the older row's place, which is preamble (1).

## Judgment calls and departures from the validator's texts (vetoable)

1. **J-A68.73, restated.** A door light's warp carry is its fraction along the ring edge it stands on. The alternatives were the entrance vertex's displacement, which leaves the facade by offset × sin(turn), and the interior mean-value formula, which divides by zero on the boundary. The fraction rule is the continuous boundary limit of the same mean-value image (receipt below), so the door light becomes the rule's boundary case rather than an exception to it.
2. **"the footprint edge that ends at its entrance vertex" became "the ring edge its point lies on".** A collinear wing-joint vertex (§2.6 rule 1: every wing vertex on the union boundary is a footprint vertex) can stand between a door and its lantern. In that case the lantern's edge does not end at the entrance vertex. The side is cited to the draw that sets it (§4.7's *Light sources* (4)).
3. **"moved end vertices" became "end vertices where the move leaves them"**, so an end that did not move is covered. In the third place the pointer changed from "(§2.6)" to "(above)", because the rule the light now follows is stated in the same paragraph.
4. **Part A.** The validator's added clause is placed after "halve every step near it" to keep the sentence's grammar. It also carries the executed magnitude (1.57 cm for a 60 cm offset under a 1.5° turn) and the boundary-limit reason.
5. **Wording chosen for doc_checks.** "fraction along the (footprint) edge", "on an edge of the footprint's" and "layer 1, 2 or 3" each formed a C3 3-gram mosaic, a false positive. They were reworded to "fraction of the (footprint) ring's edge" and "a pointer names one as §7.7 layer n" with the same meaning, so no allow row is needed.
6. **Structural prevention for VD2-03** (beyond the validator's text).
   * §7.7's list head now says "a pointer names one as §7.7 layer n, while §7.7 item n names the dossier contract's item n". The convention therefore lives at the home of the numbering.
   * The hand-off's post-check stops on any '§7.7 item 1/2' that is not a known contract pointer, so a new ambiguous pointer cannot land with this assembly.
7. **One pointer the validator's scan missed.** §2.9 l. 2216, "(§7.7\n  item 1)", wraps across two lines. It means the contract's One way (the port's diff against the carried facts), so it is kept and whitelisted. The contract item-1 pointers therefore number 11, not 10. The item-2 count (14) and the layer-2 count (25) are as the validator gave them, and the rewritten lines equal its list exactly.

## Held parts (gate (a))

None was touched. The changed lines carry no held phrase, no reference identifier and no sentence about what a reference does.

## Cross-part notes

* **Scope.** Its §13.2 lit-street warp fixture (VD2-04) first quoted this lane's draft wording. Scope's landed block already reads "keeping its fraction of the footprint ring's edge it stands on" (its report, row VD2-04). The hand-off's guarded harmonisation therefore logs "absent — skipped", and it stays only as a guard.
* **Scope → assembler.** Scope's restated J-A81.01 index cell "| §7.7, §1.1, §14 |" (VD2-05's required text) raises one C3 hit, "2 7 7 1 1": a digit-run mosaic with the preceding "T81-2". It shows on the combined copy only, and it is not this lane's. It needs a reviewed allow row or a reword at assembly.
* **Order.** Run the hand-off after all repair-r3 block files are applied and the restated rows are swapped. Its contexts in §2.7, §2.9, §4.11, §10.2 and §14 pass through the model, pipeline and scope REPLACEs unchanged, which was verified on the combined copy. Its regexes tolerate re-wrapping. The rendering r3 block file did not exist at verification time. If it REPLACEs §11.1 or §11.3, the hand-off still matches unless it changes the pointer's own words.

## Receipts (scratch `rdc3/`; design, rationale and validation files never touched: `3daa0b07…`, `bfa20419…`, `1a87c53e…` before and after)

* **Alone.**
  * apply-blocks: 4/4 applied, audit 0 not OK, headings 147 → 147, fences balanced, title block unchanged.
  * The J-A68.73 swap leaves one row per id.
  * Hand-off: 26 rewrites. '§7.7 layer 2' goes 2 → 27. Contract pointers left: item 2 = 14, item 1 = 11, all known. The rationale's 3 were checked.
  * Design diff: 69 lines, exactly the validator's 24 hand-off lines, §7.4's 3 spots, §7.7's 3 and the J-A68.73 index row. Rationale diff: the one J-A68.73 row.
  * Reference resolver: headings 141, D 35, J 730 → 730, broken 2 → 2 (the baseline's two external citations).
  * `doc_checks --sections "2.7,2.9,4.2,4.3,4.5,4.11,5.3,7.4,7.7,10.2,10.3,11.1,14,II.7.5,Judgment calls"` on both copies in parallel: C1 5/0, C2 0/0, C3 284/0, C4 3/0, S1 0/0, S2 0/0, exit 0, identical to the base.
  * The rationale's unreviewed hit set is identical before and after, and no allow row was added.
  * Files: `v2/`.
* **Combined** with repair-r3-model, -pipeline and -scope as on disk at 14:40.
  * 24/24 applied, audit 0 not OK. Swaps: J-A68.73, J-A81.01, J-A88.21 and J-A88.42 in the index, plus J-A42.41 and J-P37 in Part A.
  * The hand-off gives the same 26 rewrites and the same post-check. Each of this lane's texts is present once and each old text 0 times.
  * doc_checks over those keys plus 13.2: C3 306/1. The one hit is scope's J-A81.01 cell (above).
  * Files: `comb/`.
* **Door light.** `docs/validation/bench/amendc_repair_determinism_r3_doorlight.py` / `.out`:
  * The old rule leaves the light 1.571 cm off the facade (indoors or outdoors by the turn's sign) at a 60 cm offset and 1.5°, 5.229 cm at 5°, and 3.141 cm at 120 cm.
  * The new rule leaves it 0 (≤ 5e-16) off.
  * The new point equals the interior mean-value image's limit at the edge within 1e-7 cm.
  * After lattice rounding the point lies within 0.43 cm of the facade line: the lattice's own rounding, the same as a generated light's.

## CONFIRMED versus PLAUSIBLE

**CONFIRMED** by executed script on copies:
* every substitution (count-asserted);
* the application, the swap, the hand-off's 26 rewrites and its post-check;
* the diff extent, the references and the document checks, alone and combined;
* the door-light geometry, including the boundary-limit identity.

**PLAUSIBLE**, as a reading:
* that "the ring edge its point lies on" is the smallest wording robust to a collinear joint vertex;
* that the §7.7 convention sentence prevents the class rather than only this instance.
