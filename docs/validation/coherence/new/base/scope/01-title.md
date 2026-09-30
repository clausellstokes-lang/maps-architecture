# ARCHITECTURE — PLAT, the fused town/city generator (base), neighbourhood composition (stage 2), and what a village would need (later)

> Fable-validated 2026-09-26 — the whole normative text of this document was consolidated by Opus stand-ins (the consistency pass of 2026-09-26: one canonical home per fact, history and rationale moved to `docs/ARCHITECTURE-RATIONALE.md`) and validated by Fable on 2026-09-26 (`docs/validation/consistency/validate.md`; closing record `docs/validation/consistency/SUMMARY.md`); the design decisions taken by Opus stand-ins during the fix rounds stay queued in `docs/FABLE-REVIEW-QUEUE.md` until `workflows/05-fable-review.js` has run.

**PLAT** is the codename — a plat is a cadastral plan of plots, the single spatial truth of this design; the packages
are `@plat/*` (D-19). The product's public name follows SettlementForge's (J121).

**How to read the design.** The design is a set: this file, the base; `docs/volumes/INDEX.md`, the product map and the
combined build plan; and the twelve design volumes `docs/volumes/V01`–`V12`, which take every subject the base carries
as a hook to build depth. PART I is the base — complete and build-ready. PART II is stage 2's seam, which volume 1
builds; PART III is what the village product (volume 7) needs from the base. Then come the delegated decisions, the
index of judgment calls (their reasoning is in `docs/ARCHITECTURE-RATIONALE.md`), the list of staged subjects with the
volume that builds each, and Appendix A. Every major section opens with *In plain words*. Each fact is stated once, in
the section — or the volume — that owns its subject; every other place points to it ("§x.y" for the base, "Vnn §x.y"
for a volume). Evidence carries the findings' tags ([STATED] / [SHOWN] / [INFERRED]) through the citations of
`docs/CONFIDENCE.md`, `docs/IMPROVEMENTS.md`, the four critic files and the three proposals; §0.3 and Appendix A say
what is CONFIRMED and what is PLAUSIBLE. The per-item record of the fix rounds is `docs/ARCHITECTURE-VALIDATION.md`.

---
