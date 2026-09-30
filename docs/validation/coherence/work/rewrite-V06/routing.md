# rewrite-V06 routing notes (working file)

Source: docs/volumes/V06-evolution.md md5 95ed7b33e00cb9ad0a37548052555112, 4631 lines, 104 574 words (wc) / 106 357 (canon count).
Goal band after: 63 814 – 79 768 words (canon).

## Section plan (new text)
- 00 head: title, one marker line, Citations paragraph
- 01 §0 plain words (+ item 111 and item 113 plain words)
- 02 §1 (1.1 builds incl. items 111/113, 1.2 hooks, 1.3 out of scope — J-V6.4 bullet retired, XCONF-1)
- 03 §1b wiring table W1–W81 + new rows (W82 item 111; W83–W86 item 113), dossier trace with DR numbers
- 04 §2 data model (+ §2.14 the history replay's records: ReplayPlan etc.)
- 05.. §3.1–§3.19; §3.12.1 item 111; §3.20 history replay at generation (item 113); §3.21 edges
- §4–§6, §7 tests (new T-V6-70..), §8 plan, §9 decisions (J-V6.4 superseded mark; J-V6.92 reworded; new J-V6.126+),
  §10 pointers, §11 answered, §12 two paragraphs, §13 closed, Integration notes → folded (dropped)

## Base gaps found (new base parts lack a V06-requested fact) — V06 keeps its statement, cross-note to the base editor
- BCR-V6-5 / f 209: `EvolveOp` not in §4.11's ConversionOp union (determinism §7.1/§7.4 cite "V06's EvolveOp"); V06 §2.8 keeps the declaration.
- BCR-V6-4 / f 429: `Use.strain?` not on §2.7's Use (§10.2 cites "Use.strain (§2.7)"); V06 §2.9 keeps the declaration.
- BCR-V6-9 / f 343: `EpochInputs.wealthLevel?` and `.advance?` (with stoppedAt?, V06-ICONF-3) not on §4.11's EpochInputs; determinism cross-noted it to pipeline; V06 §2.3 keeps the field shapes.
- BCR-V6-18 / f 336: Regrowth-first's two history exceptions (overflow backlog stage; decrowding stage) absent from §4.11; V06 §3.6 keeps the rule.
- BCR-V6-23 / f 479: §4.11 (c) still says the strike pool decides whose households leave first; V06 §3.5.1 keeps the departure matching; pipeline to apply 479.
- BCR-V6-15 (c) / f 409: §10.4 naming feature `formerWall` absent from base (V11 row 68 has naming.formerWall); cross-note rendering/pipeline §10.4.
- BCR-V6-13 / f 275: §4.5's sentence "at and after an epoch the casters include the buildings as that epoch's mask records them": only line ~1922 names V06's mask; also base §4.5 (iv) "a mask whose digest differs is recomputed whole" vs V06 §2.6/§3.4 (5) "reads as zero building shade until the next epoch" — cross-note (the building mask is epoch-written model data).
## Applied in base (pointer OK)
317 runner (§4.11), 321 Works retirement (§4.11 (j)), 254 pathway (§2.7), 206 oxbow (§2.3), 209 formerClass (§2.4), 264 registry (§2.8; §7.1 mutate step),
342 EVO_* (§6.1), 443 lifespans (§10.3), 458 API (§11.2), 388 DR28 (§7.7), 339 GenerationReport.epochs (§5.4), 409 live.history, CSVs, APNG (§8.2, §11.1),
550 sewers per epoch (II.7.1), 335 §5.3 transit row (cites V06 §2.1), 293 suburb row (§4.4), 265 detail.why (§2.8), 266 epoch-spread mutation (§4.11),
478 §12.6 epoch cost, 260 suppress (§2.8), 290 generation (§4.3), 291 persistence rows raised/retaining 0.05 (§4.11), 573 events+CalamityRef (§4.11), 574 crowding hook (§4.11 (6)).
