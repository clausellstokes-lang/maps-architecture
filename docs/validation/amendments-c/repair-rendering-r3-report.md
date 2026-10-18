# repair-rendering-r3 — lane amendments-c/repair-rendering-r3 (repair round 3, RENDERING part §8, §9, §11, §12)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat amendments-c/repair-rendering-r3; queued in docs/FABLE-REVIEW-QUEUE.md.

> PROGRESS (kill-safe ledger; one line per item — planned | done). The block file is
> `docs/validation/amendments-c/repair-r3-rendering.md` (blocks only); this file is the lane's report.
> Design read: `docs/ARCHITECTURE.md` sha256 `3daa0b0731b8c76f…`, rationale `bfa20419ca4dd6e5…` (both untouched by this seat).
> ITEM receipt (VRC2-01, VRC2-03 figures): planned docs/validation/bench/amendc_repair_rendering_r3_blocks.{py,out} | done: written and run (.out sha256 56e9e47c…, re-run identical)
> ITEM VRC2-01 (68, major): planned §8.4, §8.8, §8.9, §8.3, §12.5, §12.7, §12.8 + J-A68.90, J-A68.89 restated | done: §8.1, §8.3, §8.4, §8.8, §8.9, §11.1, §12.5, §12.7, §12.8 + J-A68.90, J-A68.89 restated, J-A68.93, J-A68.94 new
> ITEM VRC2-03 (68, major): planned §8.4 (g), §8.8, §12.8 + J-A68.85, J-A68.89 restated | done: §8.4 (g), §8.8, §8.9, §12.8 + J-A68.85, J-A68.89 restated
> ITEM VRC2-02 (68): planned §8.8, §8.9 | done: §8.8, §8.9, §8.1 item 2 + J-A68.93
> ITEM VRC2-04 (68): planned §8.4 (c), §8.3 + J-A68.90 Part A | done: §8.4 (c), §8.3 (4 rows), J-A68.90
> ITEM VRC2-05 (68): planned §8.1, §8.8, §11.1 | done: §8.1 (comment, item 6), §8.8 print, §11.1 + J-A68.93
> ITEM VRC2-06 (68): planned §8.4 (f), §8.3 + J-A68.92 restated | done: §8.4 (f), §8.3 row, J-A68.92 restated
> ITEM VRC2-07 (101 (b)): planned §11.3 + J-A101.86 restated | done: §11.3, J-A101.86 restated
> BLOCK §8.1 (VRC2-05 Z from the city band; VRC2-02/05 every caster in the city band; J line): done: REPLACE written (4 edits)
> BLOCK §8.4 (VRC2-01 blocks in (c) and (f), ray ends at bounds; VRC2-04 floor diagonal; VRC2-06 lantern reference; VRC2-03 16-bit (g)): done: REPLACE written (6 edits)
> BLOCK §8.8 (VRC2-01 first ring + ring blocks, B, Q, worked cases, export window + block cache; VRC2-02 band + keys; VRC2-03 Q_f; VRC2-05 print Z; J-A68.94 scale): done: REPLACE written (9 edits)
> BLOCK §8.9 (VRC2-02 band request row + TileRasterOpts block key; VRC2-01 transfers, queue classes 3-4, transient list): done: REPLACE written (7 edits)
> BLOCK §8.3 (VRC2-04 four rows to the floor cell's diagonal; VRC2-01 mountainous row; VRC2-06 hand-lantern row): done: REPLACE written (5 edits, 2 rows added)
> BLOCK §11.1 (VRC2-05 the lit export's casters and Z; VRC2-01 first ring band): done: REPLACE written (1 edit)
> BLOCK §11.3 (VRC2-07 view?: boolean, the client's own view): done: REPLACE written (2 edits)
> BLOCK §12.5 (VRC2-01 settle cites block costs, fallback; mountainous GPU run): done: REPLACE written (2 edits)
> BLOCK §12.7 (VRC2-01 first-ring and block cost terms; lit export's first ring and block cache): done: REPLACE written (3 edits)
> BLOCK §12.8 (VRC2-01/03 Q, Q_f, export canvases, export window <= 30 MB): done: REPLACE written (4 edits)
> BLOCK J-ROWS + RATIONALE-A (restated J-A68.85, J-A68.89, J-A68.90, J-A68.92, J-A101.86 — hand-off swap; new J-A68.93, J-A68.94): done: written (7 + 7 rows)
> BLOCK hand-off script docs/validation/amendments-c/repair-rendering-r3-handoff.py (the restated-row swap): done
> VERIFY (copy apply, swap, refs, doc_checks, combined with the four sibling r3 files): done — see § Receipts
> REPORT, queue row, LANDED line: done

Lane `amendments-c/repair-rendering-r3`, 2026-09-28. Input: design `3daa0b07…`, rationale `bfa20419…`, validation
`1a87c53e…` — all three untouched by this seat (hashes re-checked at the end). Generator scripts: scratch `rr3/`
(`lib.py`, one `b_*.py` per block, `build.sh`); each substitution is asserted to match its live subsection exactly once,
so every line outside the edits is byte-identical.

## Outcome

**All 7 routed issues are fixed — the 2 majors (VRC2-01, VRC2-03) and 5 minors (VRC2-02, -04, -05, -06, -07); none
invalid, none held.** The fixes are 12 blocks in `docs/validation/amendments-c/repair-r3-rendering.md`: 10 REPLACE
(§8.1, §8.3, §8.4, §8.8, §8.9, §11.1, §11.3, §12.5, §12.7, §12.8 — these parts have no `####` headings, so the `###`
subsection is the smallest unit), one J-ROWS and one RATIONALE-A block, each with 5 restated ids (J-A68.85, J-A68.89,
J-A68.90, J-A68.92, J-A101.86) and 2 new ones (J-A68.93, J-A68.94).

**The one mechanism choice that departs from the validator's first option (VRC2-01).** The validator proposed ring
positions held one by one to a fixed ring j₀ = 16 and a whole-frame far-field pyramid beyond it. The receipt measured
both halves: j₀ = 16 still holds 1 408 positions (each a raster job and a transfer) at the reference view, and a far field
over the whole frame from level 6 is 4.5 MB at CITY and 28 MB over the population cap's frame at the 1:500 stop (56 MB at
16 bits; 63 / 126 MB at DPR 3) — over every tier's margin. Adopted instead, in the same spirit ("per block of tile
positions at the floor's level"): **ring blocks**. Beyond the first ring, every position is held by the world-aligned
2^m × 2^m block of the largest order whose positions all lie in ring 2^m + 1 or beyond, held from the level the floor
needs at its nearest position (≤ 128² cells whatever its order). The count grows with the logarithm of the window — ≤ 326
held at the reference view, ≤ 437 at any view up to DPR 3, whatever the relief — and the memory stays ≤ B (3.60 / 4.09 /
4.58 / 5.46 MB measured at DPR 1 / 1.5 / 2 / 3; B set at 3.75 / 4.25 / 4.75 / 5.5). The partition decides where a cell
is read, never which cell is read or its value: 0 of 672 pixels differ from the law over an unpartitioned pyramid,
across a 300–3 000 m hill under 15° and 7° suns (receipt (1)). The cap-on-R alternative was rejected (a far hill's
shadow would appear or vanish with the zoom stop, against J-A68.84).

| issue | sections | fix |
|---|---|---|
| VRC2-01 (major) | §8.4 (c), (f); §8.8; §8.9; §8.3; §12.5; §12.7; §12.8; §8.1 | First ring per position (view's band) + ring blocks (city band); the ray ends at the list's bounds; Q = P ÷ 12 + (2(a + b) + 4) ÷ 3 + B with B by DPR; worked cases 172.75 / 123.25 / 68.75 / 104.75 (vector) MB; export window ≤ 30 MB with a 16-MB block cache; cost terms (first-ring raster ≤ the surface layer's; a block ≈ 1 µs per mark + 2 ns per sample + ≤ 0.05 ms; whole-frame builds ≈ 39 / 85 / 181 / 433 ms at TOWN / CITY / METROPOLIS / the cap); §12.5's settle cites them, PLAUSIBLE until M2b, fallback: blocks after the settle; §8.3's mountainous row; one-byte heights on a scale to max(160 m, own range) so no far mountain clamps (J-A68.94). J-A68.90, J-A68.89 restated. |
| VRC2-03 (major) | §8.4 (g); §8.8; §8.9; §12.8 | At full precision the pyramids, first ring and blocks are 16-bit cm above their datum (step ⌈range ÷ 65 535⌉ cm past 655.35 m), the GPU within 1 cm of the reference; Q_f = 2Q; the high tier's reference view at DPR 1.5 needs 163 + 28.5 = 191.5 ≤ 192 MB, the mid tier's at DPR 1 85 + 21.5 = 106.5 ≤ 128 MB. J-A68.85, J-A68.89 restated. |
| VRC2-02 | §8.8; §8.9 | (a) The first ring reads the view's band, requested for its districts after the visible tiles (band-request row), its shadows completing on the answer; the blocks read the city band, held whole, so none waits or changes with requests. (b) A first-ring position is always from level 0; a block is keyed by (stop, order, indices, DPR, level) and serves only where the floor is at or above its level (`TileRasterOpts.block` replaces `fromLevel`). J-A68.93. |
| VRC2-04 | §8.4 (c); §8.3 (4 rows) | The floor lengthens a shadow by at most the cell's diagonal, √2 × its side (≤ t ÷ 90); the three shadow-tip rows and the narrow-casters row read "the diagonal of the floor cell". The half-level-floor alternative was not taken (it would double the cells everywhere to fix a text). J-A68.90 Part A. |
| VRC2-05 | §8.1 (comment, item 6); §8.8 print; §11.1 | `surfaceTopCm` is derived on the city band (which carries every caster, §8.1 item 2) and carried by every list; the generation worker keeps it beside the 24-B index; a lit export's R takes Z from it with the frame's lowest terrain sample, never from the transient list whose extent R sets; the transient list carries the city band's casters over the dilated frame. J-A68.93. |
| VRC2-06 | §8.4 (f); §8.3 | The CPU reference evaluates the lantern at a pointer point a test supplies; §8.3's hand-lantern row (nine pointer points, GPU within §13.4's tolerance, 0 lit pixels beyond 6 m, none in any export). J-A68.92 restated. |
| VRC2-07 | §11.3 | `preview { events, view?: boolean }`: `true` draws the ghost as `live.ghost` in that client's own view (standing for §11.2's `ViewHandle`), `false`/absent computes the dry run alone; `preview.result` reads "when `view` is `true`". J-A101.86 restated. |

**Needs a ruling.** None is owner-gated; all are recorded as vetoable judgments: J-A68.90 (ring blocks over j₀ + far
field and over a cap on R), J-A68.93 (the city band carries every caster — S14 gives a tree line's `instances` mark the
city bit with an empty rank subset — and feeds the blocks and Z), J-A68.94 (the widened one-byte scale), J-A68.85
(16-bit full precision), J-A68.89 (Q with B, Q_f = 2Q), J-A68.92 and J-A101.86 (restated texts).

**CONFIRMED / PLAUSIBLE.** CONFIRMED by execution: the blocks apply alone (12/12) and with the four sibling r3 files
(36/36, no second REPLACE of any heading); the swap leaves one row per id; refs 732 J ids, 2 broken (the pre-existing
externals); doc_checks `8,11,12,Judgment calls` exit 0 at the base's counts (C1 5/0, C2 0/0, C3 209/0, C4 1/0, S1 0/0,
S2 0/0), alone and on the combined copy with determinism's hand-off run; the receipt's partition independence, counts,
memory, export window and Q cases. PLAUSIBLE until M2b: every time (block builds, the lit settle on the mountainous
fixture, the GPU pass on long rays), the canvas worked cases as measured, and the bound B beyond the 64 placements per
view the receipt sampled.

## Held parts (gate (a)) — none written by this lane

The blocks write no held part (scan of the added text: 0 hits of "160 of 162", "16 cells", "visibly differ", "door
concept", "MFCG draws"). The parts still held for Fable's retrovalidation, per validate.md §6, so nothing is lost:
item 52 (the references' session-reached maps *visibly* differing), item 35 support (the position check on 160 of 162
faces), item 60 support (plans up to 16 cells wide, dropped), item 68 (g) ("MFCG draws no cast shadows" about the
reference), item 68 support (VG 1.6.9's shadow and night-light layers; Dwellings' shading and occlusion), item 50's MFCG
clause (written only as the route's inference sentence). Gate (b): no sentence of the form "the reference does X" was
added ("the reference" in these blocks is our CPU reference). Gate (c): no reference identifier added. No deferral word
added (the one "later" found was reworded; the remaining "a later export" in §11.1 is pre-existing text).

## Assembler hand-off

1. **Swap the restated rows** J-A68.85, J-A68.89, J-A68.90, J-A68.92 and J-A101.86 — each appended by apply-blocks as
   "DUPLICATE ID inserted" in the index and in Part A — into the older rows' places, deleting the older rows. Script:
   `docs/validation/amendments-c/repair-rendering-r3-handoff.py --doc APPLIED.md --rationale APPLIED-R.md --out-doc … --out-rationale …`
   (never in place; asserts two rows before and one after, and one row each for the new J-A68.93 and J-A68.94). A
   generic swap of every duplicated id, as assemble-r2-handoff step 1, does the same.
2. Nothing else: no substitution outside this part is needed (0 references to the rings, `ringPyramid` or `fromLevel`'s
   ring sense outside §8, §11, §12 and the five restated rows). Determinism r3's hand-off (its `§7.7 layer 2` pointer in
   §11.1) still matches through this lane's §11.1 REPLACE — run on the combined copy: 26 contexts rewritten, exit 0.

## Cross-part notes (for the owners' next round)

* **Scope, §16.** The ring blocks replace round 2's rings and the 16-bit fallback widens round 2's full-precision
  surface; both sit inside §16's existing item-68 line (the CPU reference light pass, its GPU accelerator and the
  fallback ladder, +2–3 pw), as the rings did, so this lane changes no price. §8.3's two new rows run under the M2b exit's
  day-lighting clause (the mountainous row) and the M3b exit's lights clause (the hand-lantern row); if the verifier
  holds that R10 wants them named, the M2b cell gains "§8.3's mountainous fixture" and the M3b cell "§8.3's hand-lantern
  row".
* **Scope, §13.4.** Unchanged and still true: "takes §8.4 (g)'s full-precision surface — the traversal unchanged".

## Receipts

* `docs/validation/bench/amendc_repair_rendering_r3_blocks.{py,out}` (our code, stdlib only; `.out` sha256
  `56e9e47c…`, re-run byte-identical): (1) partition independence and soundness — 8 scenes × 84 pixels, 0 differing, 0
  cells outside their structure's levels; (2) held counts and memory per view, frame and placement at the 1:500 stop;
  (3) the export tile's window; (4) the alternatives (j₀ = 16 positions; the whole-frame far field); (5) Q and Q_f
  worked cases, each B checked against (2); (6) the build-time model.
* Cited, not re-run: `amendc_verify_rendering_r2_diag.out` (VRC2-04's 1.33 × side), `amendc_verify_rendering_r2_rings.out`
  (the rings' growth).
* Copy apply (scratch `rr3/`): apply-blocks 12/12, audit not-OK 0, headings 147 → 147, fences balanced, title block
  unchanged; document 2 281 645 → 2 295 210 bytes, 17 215 → 17 300 lines (263 diff lines, all in §8.1, §8.3, §8.4, §8.8,
  §8.9, §11.1, §11.3, §12.5, §12.7, §12.8 and the seven J rows); rationale 2 314 → 2 321 lines.

LANDED: 2026-09-28 15:09 amendments-c/repair-rendering-r3 LANDED docs/validation/amendments-c/repair-r3-rendering.md docs/validation/amendments-c/repair-rendering-r3-report.md docs/validation/amendments-c/repair-rendering-r3-handoff.py docs/validation/bench/amendc_repair_rendering_r3_blocks.py docs/validation/bench/amendc_repair_rendering_r3_blocks.out docs/FABLE-REVIEW-QUEUE.md (opus stand-in for the Fable seat, RENDERING repair round 3 on design 3daa0b07… / rationale bfa20419…, both untouched: all 7 routed issues fixed, none invalid, none held — 12 blocks: REPLACE §8.1, §8.3, §8.4, §8.8, §8.9, §11.1, §11.3, §12.5, §12.7, §12.8 + J-ROWS/RATIONALE-A restating J-A68.85, J-A68.89, J-A68.90, J-A68.92, J-A101.86 (HAND-OFF: swap the five restated ids, script repair-rendering-r3-handoff.py) and adding J-A68.93, J-A68.94; VRC2-01 by ring blocks (count logarithmic, memory <= B 3.75/4.25/4.75/5.5 MB by DPR, partition-independent: 0 of 672 pixels differ), VRC2-03 by 16-bit full precision (Q_f = 2Q); verified on copies: 12/12 alone, 36/36 with the four sibling r3 files, audit not-OK 0, headings 147 -> 147, refs 732 J ids / 2 broken pre-existing, doc_checks 8,11,12,Judgment calls exit 0 at the base counts (C3 209/0), alone and combined with determinism's hand-off; no allow row)
