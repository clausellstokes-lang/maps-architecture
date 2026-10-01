# repair-r4-rendering — lane coherence/repair-rendering-r4 (unit rendering: base §8, §9, §11, §12)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-rendering-r4; covered by the whole-design retrovalidation (J84).

# Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): text before the first block header
# is ignored. Base: docs/ARCHITECTURE.md sha256 593c657d34849302… (assemble-r3's output); rationale e7b59eac90a75327….
# Each REPLACE body is the live subsection with count-asserted substitutions — work dir
# docs/validation/coherence/work/repair-rendering-r4/: orig/ split from the live base by split.py, patches/010–130
# (61 hunks, each OLD text found exactly once), apply.py, gen_blocks.py, extra-blocks.md (the J-ROWS and RATIONALE-A
# blocks), swap_restated.py (the NOTE FOR ASSEMBLE below); every untouched line is verbatim.
# Blocks: 14 REPLACE (§8.1, §8.2, §8.4, §8.6, §8.8, §8.11, §9.1, §9.2, §11.1, §11.2, §11.3, §11.6, §12.5, §12.10),
# 1 J-ROWS (1 row, restated), 1 RATIONALE-A (3 rows, restated). Ruling requests: 0. Binding rulings applied:
# adjudication-r4's R4-01, R4-02, R4-04, R4-05, R4-06, R4-10, R4-12 (Part H · rendering, with its 5 END lines); R3-01 –
# R3-03 (standing); R4-11's class on this unit's own test (note 4).
#
# PROGRESS
# - P0 brief read whole; adjudication-r4 (TOC, R4-01 – R4-06, R4-10 – R4-14, Part H · rendering with its 5 END lines),
#   adjudication-r3's R3-01 – R3-03: done
# - P1 issue sources read (verify-rendering-r3t, -agree-fabric, -agree-layers, -agree-tools, -scope, -vol-V01-V02,
#   -vol-V03-V04, and pipeline's VPC-R3-03 / VV56-r3-03 for the END lines); live §8.1, §8.2 (crisis looks, Find), §8.4,
#   §8.6, §8.8, §8.11, §9.1, §9.2, §11.1, §11.2 (whole), §11.3, §11.6, §12.5, §12.10 read where touched; V03 §5.1 /
#   §5.6 (1), V04 §5.6 (5), V06 §3.15.2 / §3.22 (3), V09 §4.21.10 / §5.10 / §5.15, V02 §5.5, §2.6's `Use`, §2.9's
#   `thematic`, file f item 447 and g item 120 (f) read for the shared names: done
# - P2 patches 010–130: done (14 ids: 13 fixed, 1 merged; the 5 END lines written; the sweeps below)
# - P3 blocks generated; dry run on copies, with the swap: done
# - P4 doc checks, references, size: done
# - P5 result saved; LANDED: done
