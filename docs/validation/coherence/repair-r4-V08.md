# Repair round 4 — V08 (the SettlementForge stage) — lane coherence/repair-V08-r4

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-V08-r4; covered by the whole-design retrovalidation (J84).

# Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): text before the first block header is
# ignored; the FILE line routes every block to docs/volumes/V08-settlementforge.md.
#
# PROGRESS
# - P0 brief read whole (13 issues routed; 4 END lines); adjudication-r4's TOC, R4-01, R4-04, R4-07, R4-08, R4-15, R4-16
#   and Part H · V08 read whole; R3-01 – R3-03 read: done
# - P1 verifier evidence (verify-agree-host, -agree-time, -edges-life, -scope, -vol-V05-V06, -vol-V07-V08, -vol-V11-V12,
#   -rendering for the VRC3T-07 END) and the live V08 subsections concerned read whole; base §4.11 *The clock*, §11.3,
#   §12.6, §12.10 R12-31, DR1–DR44's input cells; V06 §3.2, §6.7, §6.8, T-V6-24: done
# - P2 edits written (scratch rV08r4/edits.py); blocks built: next
# - P3 dry run of apply-blocks.py on a copy of the live V08: pending
# - P4 result saved; LANDED: pending
