# Blocks — lane retrovalidate/pipeline-gen (Fable validator, 2026-09-27)

Text before a file's first "=== " line is ignored by the assembler (apply-blocks.py). This file carries NO block, by
ruling J-RVpg-1 of docs/retrovalidation/pipeline-gen.md:

* Every correction this lane found inside §4 that needs an in-place text change (RV-pipeline-gen-1, -4, -5, -6) is an
  exact single-occurrence substitution inside §4.5 or §4.6. The protocol's only in-place kind is REPLACE of the whole
  subsection; apply-blocks.py applies block files in basename order and a REPLACE drops (audit LOST) any sibling
  APPEND / INSERT applied to the same heading before it. Model, kernel and determinism seats' block files sort before
  "blocks-pipeline-gen.md" and may APPEND to §4.5 (the band set) or §4.6, so a REPLACE written here would risk losing
  their text. The substitutions are therefore handed to the PIPELINE repairer, who generates the REPLACE from the live
  subsection last (the finding gives the old text once and the new text in full) — the same ruling the landed pipeline
  review made for J-Fpipe-1.
* The two mechanism gaps confirmed here already have their blocks, written by Fable seats, each to be applied ONCE:
  RV-pipeline-gen-2 = docs/fable-review/main/blocks-redteam.md B-1 (APPEND TO SECTION §4.6; J-Fredteam-1, with its
  J-ROWS and RATIONALE-A blocks) and RV-pipeline-gen-3 = docs/fable-review/main/blocks-pipeline.md B-1 (APPEND TO
  SECTION §4.11; J-Fpipe-2, with its J-ROWS and RATIONALE-A blocks). They are not duplicated here: if the assembler's
  set does not include those two files, the repairer copies each block verbatim into the repair block file — never both.
