# Blocks — lane fable-review/main/evidence-review (Fable reviewer, 2026-09-27)

Text before the first "=== " line is ignored by the assembler; this file has no block.

Outcome of the lane (docs/fable-review/main/evidence-review.md): B18 CONFIRMED (the four coverage audits stand; every gap closed
or staged with its hook in the current design), B19 REJECTED (never produced; superseded by B-fixall/verify-*), B21 CORRECTED (the
scripts and their outputs stand; the README's attribution of the ink-cover figure and one defective line of bench_state.out are
corrected by an appended README section). No sentence of docs/ARCHITECTURE.md or docs/ARCHITECTURE-RATIONALE.md that rests on this
lane's evidence is wrong — the two that quote bench figures (§6.1 0.73 µs per stream key; §13.5's MFCG street-signature metrics)
reproduce exactly on re-run — so this lane emits no REPLACE / INSERT / APPEND block, no J-ROWS line and no RATIONALE-A entry
(judgment J-Fev2-4 in the review file, vetoable: a veto adds a §13.5 footnote naming mfcg_stats.py as the cover figure's source).
