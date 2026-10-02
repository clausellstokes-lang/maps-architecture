# Repair round 7v (the family fix pass) — V04 (the underground)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-V04-r7v; covered by the whole-design retrovalidation (J84).

# Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): text before the first block header
# is ignored; the FILE line routes every block to docs/volumes/V04-underground.md. Live unit: V04 as assemble-r7 left it
# (sha256 18b739064e67f21b…, 535 373 bytes, 3 644 lines; unmodified in the checkout).
#
# PROGRESS (lane coherence/repair-V04-r7v, 2026-10-02)
# - [x] P0 brief read whole (with its FAMILY FIX PASS NOTES and ORCHESTRATION NOTES); no output, no result file and no
#       LANDED line existed (fresh run)
# - [x] P1 adjudication-r7v read (head, decisions table, Part H · V04 V4-1 – V4-3, END-L1 at model M10, the other units'
#       ENDs naming V04, builders' choices, held notes); adjudication-r7 R7-01 read
# - [x] P2 issue sources read (famverify-epochs-r7 VF7-EPO-03; -tests-r7 VF7-TST-03, VF7-TST-08; -readers-r7 VF7-RDR-02);
#       live V04 §3.5.4 (d), §3.5.0 *At an epoch*, §3.11 UC18, §4.6 and ## 7 read whole; base §2.7 support step (7) and
#       T110-2 (4) read at their sites
# - [ ] P3 block composed (count-asserted substitutions on the live ## 7)
# - [ ] P4 dry run on a copy (apply-blocks.py), words, report
# - [ ] P5 result saved; LANDED
