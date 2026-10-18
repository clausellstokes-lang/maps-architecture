# ARCHITECTURE — PLAT, the fused town/city generator (base), neighbourhood composition (stage 2), and what a village would need (later)

> PENDING FABLE REVIEW — the whole normative text of this document was consolidated by Opus stand-ins (the consistency pass of 2026-09-26: one canonical home per fact, history and rationale moved to `docs/ARCHITECTURE-RATIONALE.md`) and is pending Fable review; `docs/FABLE-REVIEW-QUEUE.md` keeps the per-lane rows.

**PLAT** is the codename — a plat is a cadastral plan of plots, the single spatial truth of this design; the packages
are `@plat/*`. The name is a placeholder (D-19).

**How to read this file.** Every major section opens with *In plain words* for a reader who does not code, then the
design. PART I is the base — complete and build-ready. PART II is the stage-2 neighbourhood composition, at interface
depth. PART III is one page on what a later village product needs from the base. Then come the delegated decisions,
the index of judgment calls (their reasoning is in `docs/ARCHITECTURE-RATIONALE.md`), the subjects staged by the
owner's roadmap (this document defers nothing) and Appendix A. Each fact is stated once, in the section that owns its
subject; every other section points to it ("§x.y"). Evidence carries the findings' tags ([STATED] / [SHOWN] /
[INFERRED]) through the citations of `docs/CONFIDENCE.md`, `docs/IMPROVEMENTS.md`, the four critic files and the three
proposals; what is CONFIRMED and what is PLAUSIBLE is stated in §0.3 and Appendix A. The per-item record of the fix
rounds is `docs/ARCHITECTURE-VALIDATION.md`.

---
