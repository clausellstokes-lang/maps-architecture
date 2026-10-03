# Verify — design volumes V09 (the application) and V10 (the AI clerk), coherence pass round 0

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/verify-vol-V09-V10-r0; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V09-V10-r0`; started 2026-10-03 02:15 in the cloud continuation; no earlier output on disk)
- P1 inputs gathered (canon routing for V09/V10, edges, cross-part notes from every rewrite report): done
- P2 mechanical checks (ids, references, terms, deferral, mapping table, per-item tokens): pending
- P3 V09 archive → new review, section by section: pending
- P4 V10 archive → new review, section by section: pending
- P5 cross-unit agreement, cohesion, wiring, edges: pending
- P6 report, results JSON, LANDED: pending

Scratch: `/tmp/claude-0/-home-user-maps-architecture/ce371545-83c4-5807-9f2a-da73abd8485d/scratchpad/coherence/`
(`routing.txt`, `edges-V09V10.txt`, `xnotes.txt`, scripts).

## 1. Outcome

(pending)

## WORKING NOTES (interim; folded into the issue list at the close)

* V09-REF-1 (minor, BROKEN-REFERENCE): five bare list continuations survive in V09 — l.143 "V09 §4.11, §3.12, §5.10,
  §5.12"; l.4075 "V12 §2.14 and §3.14"; l.4102 "V09 §2.3, §2.9"; l.4110 "V02 §3.14.5, §4.5, §4.6"; l.4113 "V10 §2.6,
  §3.5, §3.16, §4.1, §4.3". Ranges ("Vnn §a–§b") all resolve. V10: none (its two "…, §11.2" continuations mean the base
  API and read correctly).
* V09-DEC-1 (BLOCKER, NUANCE-LOST): V09 §9 shrank 9 012 → 4 395 words; 110 of the 125 archived non-withdrawn rows keep
  under 70 % of their content words, 59 under 50 %. Reasons, rejected alternatives and stated cases are cut, not only
  ids and narration (detail in §3 below). V10 §9 is intact (every row ≥ 0.6 retention; the two lowest are E-24 marks).
