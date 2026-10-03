# Design volume 12 — Calibration, reconciliation and parity measurement: how the built generator is tuned against the references and later the corpus

> PENDING FABLE REVIEW — written by opus stand-ins for the Fable seat (volumes/V12-calibration, its revisions, reconciliation and coherence lanes); covered by the whole-design retrovalidation (J84).

**How to read this volume.** It builds, to implementation depth, the calibration and parity machinery the base
(`docs/ARCHITECTURE.md`, with files f and g applied: `docs/AMENDMENTS-2026-09-28f.md`, `docs/AMENDMENTS-2026-09-28g.md`)
carries in §13 and §16. The implementer holds the base and this volume and nothing else (§17.1). Every fact the base or
another volume states is cited, never restated; every new fact is stated once, here. **Citations:** a bare `§n` or `II.n`
is the base's; `Vnn §n` is a design volume's section, this one included (`V12 §3.11`); `item n` is an amendment item —
items 1–113 the owner's, items 200 and above file f's, each the applied text of a volume's base change request (V12 §10
lists this volume's); `J-VI.n` is a volumes-integration decision (`docs/volumes/_integrate.md`), cited and never
restated. Decisions are `J-V12.n` (V12 §9), tests `T-V12-n` (V12 §7), owner questions `Q-V12-n` (V12 §11). This volume is
an implementer input under §17.1 (1): it names no reference class, method, grammar, palette or asset; reference evidence
is cited by file and section only, and every number it quotes from a capture is a measured behaviour (§17.1 (6)). The
corpus was not read: its machinery and process follow `partitioned/README.md`'s rules alone.
