# repair-r3-scope — lane coherence/repair-scope-r3 (unit scope: base §0–§1, §13–§17, the index, INDEX.md)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-scope-r3; covered by the whole-design retrovalidation (J84).

# Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): text before the first block header is
# ignored; the FILE line routes the last block to docs/volumes/INDEX.md, every block above it to docs/ARCHITECTURE.md (the
# RATIONALE-A block to docs/ARCHITECTURE-RATIONALE.md). Live targets (assemble-r2's output, unchanged at landing): base
# 4ed292e9…, rationale dd2bfafa…, INDEX 1774db18…. Every REPLACE body is the live subsection with count-asserted
# substitutions (generator docs/validation/coherence/work/repair-scope-r3/gen.py over edits.py: 44 substitutions, each
# asserted to occur exactly once in its subsection, each tagged with its issue in gen-log.json); every untouched line is
# verbatim. Blocks: 10 — 7 REPLACE on the base (§1.1, §13.2, §13.4, §13.8, §14, §16, Appendix A), J-ROWS (1 restated
# row), RATIONALE-A (1 restated row), 1 REPLACE of INDEX.md's §1. Ruling requests: 0. Binding rulings applied:
# adjudication-r3's R3-01, R3-02, R3-03, R3-08 (a), R3-15, R3-20 (1), R3-25 (b)–(d), R3-26 (Part H · scope).
#
# PROGRESS
# - P0 brief read whole (10 routed issues; ROUND-3 NOTES, NEW OWNER RULES, ORCHESTRATION NOTES); adjudication-r3's TOC,
#   R3-01 – R3-03, R3-08, R3-15, R3-20, R3-25, R3-26 and Part H · scope (5 END lines) read whole: done
# - P1 issue sources (verify-agree-proof-r2t, verify-edges-world-r2t, verify-kernel-r2t, verify-scope-r2t,
#   verify-vol-V01-V02-r2t, verify-vol-V09-V10-r2t; the END lines' sources verify-model-r2t and verify-vol-V07-V08-r2t),
#   file g items 116, 122 (h), 125 (b)–(e), the live subsections (§1.1, §13.2's owner-item groups 110–126 and the
#   take-over table, §13.4, §13.8, §14's `HostContext` and exporter, §16's M3b, M5 and M3c rows, Appendix A, J-A120.01's
#   index row and Part A entry, INDEX §1), the volume ends (V12 §2.13's pin rows and T-V12-44 – T-V12-59, V01 §3.16,
#   V02 §8.6, V10 §8, V09 §4.12) and the landed round-3 sibling files (V06, V08, V09, rendering, pipeline): done
# - P2 count-asserted edits (edits.py) and the restated rows: done
# - P3 dry runs on copies, references, document checks (CHECKS below): done
# - P4 result saved, LANDED: done
#
# DISPOSITIONS (adjudication-r3 Part H · scope) — 9 FIX, 1 MERGED, 0 INVALID; every id closed by the edit named
#  VAP-r2-01 (FIX per R3-26; graded MINOR, bookkeeping) — §13.2's take-over table and runs lists in its required texts:
#        the calibration row lists T111-1 – T111-5 (T-V12-44) … T119-1, T119-2, T119-4 and T119-5 (T-V12-50) before
#        T120-1 and T120-6 (T-V12-52); the stage-3 row T115-4's rung clause on B-MASS (T-V2-58) and T123-7's exterior
#        clause (T-V2-59); the plan-rung row T119-2 – T119-5 (T-V3-37) and T122-7's plan clauses (T-V3-40); the evolution
#        row T114-10's epoch clause (T-V6-73); the SettlementForge row T126-3's embed clause (T-V8-62); the application row
#        T112-1's thematic-view clause and T112-2 (T-V9-72); the runs lists of items 111, 112, 113, 114, 115, 119, 122, 123
#        and 126 as required. R3-26's both-ends union, at this end: the registrations R3-26 adds this round are carried at
#        their rows and runs lists by the bar ids V12 §2.13's pin rows give — T122-1 and T122-7's `item122.crises`
#        registration (T-V2-60, T-V8-59), T111-5's `item111.water` registration (T-V10-45, T-V11-38), T113-7's
#        (T-V11-39), T114-8's (T-V11-40) and T115-4's (T-V11-41) — so the table and the lists name what the volume tests
#        run (the heads' ends: HAND-OFFS).
#  VAP-r2-14 (FIX) — §13.8's row "| T126-1 – T126-3 | PR on volume 9's app harness | M2a (with the medium layout); T126-1
#        each tool from the milestone that lands it, every tool from M3a |" (= T-V9-22, T-V12-59, V12 §3.15.16).
#  VEW-r2-02 (FIX) — T116-4 reads the required text (§8.7's limit bounds at any window size and with none; at the cap a
#        whole-bounds PNG, print and SVG export frames the whole bounds); the stop-0 clause stays in T116-1's view bar only
#        (canon; J-A116.02 speaks of item 116 (e)'s view bar and stands).
#  VKr2-02 (FIX per R3-25 (b)) — T110-2 adds the aqueduct through an epoch's frame growth (§3.10's stored-references row
#        at every stage end, no part-0 vertex left with a row and no edge, both ends of its ring-end foot on the new rings
#        after §4.11), barring VKr2-01's first form; §13.8's T110 row schedules T110-2's epoch clauses from M4 on the hook
#        fixtures (the circuit on volume 6's engine with M6-E's E3), the rest at M3a as before.
#  VCS-r2-01 (FIX) — J-A120.01's index row ends "its base parts priced by absorption into the O11 and O12 lines (its
#        overlay provider and panel volume 9's AP11; J-A568.05)"; its Part A entry's last clause reads the required text.
#        Both rows restated (J-ROWS, RATIONALE-A) and swapped into place (NOTE FOR ASSEMBLE). §16 and its totals unchanged.
#  VCS-r2-03 (FIX; graded MAJOR) — §13.4's fallback: "the fabric and finish layers' geometry edits are off by default on
#        a coarse pointer (`AppPrefs.touch.editFabric`, V09 §4.12), switchable back on and never removed (item 126 (e)),
#        stated in the guide"; §1.1: "…; §13.4's touch fallback changes only a default"; T126-1 "… under touch, with
#        `AppPrefs.touch.editFabric` on". V09's end (§4.12, T-V9-22) is written in repair-r3-V09 in the same words.
#  VCS-r2-04 (FIX per R3-15), closing VV12-r2-07 — §16's M3b item-122 clause adds the disaster look's parts by milestone
#        (its districts with volume 1's `disasterSource` and `disasterDistricts` at M5 (W10), its ruined exterior with M6
#        (V02 §8.6), its plan damage with volume 3's P4, each drawing nothing until it lands); M5's content adds "item
#        122's disaster districts — volume 1's `disasterSource` and `disasterDistricts` (W10; V01 §3.16)" once, and its
#        exit's §13.8 list names the district clauses of T122-2, T122-3, T122-5 and T122-6; §13.8's row reads "M3b (the
#        `disaster` look's district clauses from M5)".
#  VCS-r2-06 (FIX) — Appendix A: the in-development SettlementForge fields (item 122 (h)'s forces, coalitions and
#        travelling groups with their sizes; a current-week stamp) PLAUSIBLE until item 125 (d)'s final local check,
#        item 125 (b)'s fallback in force meanwhile — the required sentence, after the SettlementForge sentence.
#  VV12-r2-07: MERGED into VCS-r2-04 (closed by M5's one clause, its "(W10; V01 §3.16)" citation kept).
#  VV910-r2-07 (FIX; supersedes R2-32 (2)'s "V10 C3") — §16's M3c row "V10 §8's exits (C4's item-120 content — the find
#        form and read — landing with M5's exit)"; INDEX §1's V10 row "C4's Find content (the find form and read) at M5's
#        exit" (= V10 §8's C4 row and total).
#
# END LINES (Part H · scope; each written)
#  END of VV56-r2-01 (V06; R3-08 (a)) — T123-4: "restoring — a `reoccupy` back into use (item 123 (b)'s "reused") or a
#        repair — lowers the level …", as given.
#  END of VEW-r2-01 (model; R3-25 (c)) — T110-2 adds the CITY c14 fixture (S4 viaduct over a valley crossed at a gate by
#        stage 2's moated ring) and an epoch circuit across a standing aqueduct — each crossing's one station on the trace,
#        0 piers in a setback, glacis, berm or moat, the raised way kept — citing "§2.7's support step (6)", the home R3-25
#        (c) names; §13.8 schedules its epoch circuit (above).
#  END of VM-R2T-03 (model; R3-25 (d)) — the item-114 group gains the fixture as T114-3's second clause: a neglected,
#        poor CITY ring over 20 epochs with a masonry aqueduct through its wall arch and a viaduct on a raised gate, the
#        stretch under each crossing station never `breached` or `dismantled` while its deck stands (§2.7's support step
#        (3)), "every other stretch decaying as the first clause states" (JUDGMENT 2).
#  END of G125-V08 (V08; R3-20 (1)) — §14's `HostContext.line` comment and the port item 5's `line` clause, as given.
#  END of VV78-r2-10 (V11) — T122-4: "every SettlementForge stressor type, condition archetype and crisis event at the
#        pinned baseline has its row in §10.2's closed map …", as given.
#
# JUDGMENT CALLS (vetoable; none adds design beyond the issues' texts)
#  1. R3-15 asks "(R2-36)" written "(§16)"; inside §16 itself that would cite its own row, so §16's M3b clause cites the
#     rule's one home, "(§10.2 *Crisis looks*)" (R3-15: the rule written once at §10.2 *Crisis looks*, whose sentence
#     cites §16 for the placement — pipeline's round-3 text).
#  2. VM-R2T-03's END reads "every other stretch decaying as T114-1 states"; T114-1 is the poor, THREATENED ring that
#     patches (NEED high), while the fixture's ring is neglected (NEED low, V06 §3.7.7 (2): "both low", the fastest decay),
#     whose decay T114-3 states. Written as T114-3's second clause ("as the first clause states"), so §13.8's T114-1 –
#     T114-5 row (M6-E with E3, the milestone tier over epochs) schedules it and T-V6-73 (takes T114-1 – T114-5) carries it.
#  3. R3-26's registrations added at this end (VAP-r2-01's class): the bar ids are V12 §2.13's pin rows' (`item111.water`
#     T111-5; `item113.history` T113-7; `item114.condition` T114-8; `item115.off`, `item115.ceiling` T115-4;
#     `item122.crises` T122-1, T122-7) — so the root cause of VAP-r2-01 (a table missing ids the tests run) does not recur
#     where round 3's volume seats add registering clauses.
#  4. rendering's round-3 hand-off of VRC2T-12 to scope written here, since §14 is replaced anyway: §14's `Exporter`
#     comment names its `id` a `Format` and its `Opts` §11.2's `ExportOpts`; `HostContext.displayNames` cites
#     `ExportOpts.displayNames` (both in the interface comment and item 5).
#  5. §16's M5 exit names the `disaster` look's district clauses beside T120-1 – T120-6, so the exit's list of the bars
#     §13.8 gives M5 stays whole after VCS-r2-04's schedule cell.
#
# HAND-OFFS (R3-01 (3): ends no END line names, for round 4's verifiers; none is open wording in the design text)
#  * V02: T-V2-60's head names T122-1 and T122-7's `item122.crises` registration (its (c), R3-26).
#  * V08: T-V8-59's head names T122-4's census clause only, while its last clause is the `item122.crises` registration
#    (T122-1, T122-7's tiles clause) — its head adds it (V08 landed this round without it).
#  * V10: T-V10-45's head names T111-5's `item111.water` registration (R3-26).
#  * V11: T-V11-38 – T-V11-41's heads name T111-5's, T113-7's, T114-8's and T115-4's registrations (R3-26).
#  * V06: T-V6-73 (takes T114-1 – T114-5) runs T114-3's crossing-station fixture on H-WALLS, or a V06 test names it; V06
#    §3.7.7 (2) carries the rule (repair-r3-V06, VM-R2T-03's end).
#  * model and kernel: T110-2 and T114-3 cite §2.7's support step (6) and (3) (model's VEW-r2-01 and VM-R2T-03 texts this
#    round); T110-2's frame-growth clause bars kernel's VKr2-01 first form (R3-25 (b)).
#
# NOTE FOR ASSEMBLE (two restated rows; assemble-r1's swap rule, script work/repair-scope-r3/swap_restated.py)
#  The J-ROWS block's row restates J-A120.01's judgment-index row and the RATIONALE-A block's row its Part A entry
#  (VCS-r2-01). After every block file is applied, run
#    python3 docs/validation/coherence/work/repair-scope-r3/swap_restated.py BASE RATIONALE BASE_OUT RATIONALE_OUT
#  — each appended row takes its older row's place and the older row is deleted; it stops unless J-A120.01 occurs exactly
#  twice in the judgment index and twice in Part A. It is independent of rendering's J-A68.89 swap (either order).
#  A REPLACE of the whole "# Judgment calls" section was not used: rendering's J-ROWS (eight new rows) apply before this
#  file and would be dropped by it.
#
# CHECKS (executed on copies; receipts in docs/validation/coherence/work/repair-scope-r3/: gen.py, edits.py, gen-log.json,
#  swap_restated.py)
#  - apply-blocks.py (unchanged) alone on the live base + rationale: 9 found, 9 applied, 0 skipped, audit not-OK 0,
#    headings 153 → 153, fences balanced (140 → 140), title block unchanged; notes: the two DUPLICATE ID rows (J-A120.01,
#    the restatement). INDEX alone: 1/1 applied, audit 0, headings 9 → 9, the rationale untouched. With the swap: the
#    judgment index 797 rows = Part A 797, 0 duplicates, 0 ids in one and not the other.
#  - Combined with the landed or drafted base files of round 3 (determinism, model, pipeline, rendering) in name order:
#    43 found, 43 applied, 0 skipped, audit not-OK 0, headings 153 → 153; rendering's swap then this file's: the index 805
#    rows = Part A 805, 0 duplicates; rendering's eight new index rows kept.
#  - References (assemble-r2's refs.py on a mirror of the set with these blocks applied): base BROKEN 0 → 0, resolved
#    17 613 → 17 713, ambiguous 14 → 14; INDEX unchanged (111 resolved); the one BROKEN (V08) is the live set's.
#  - doc_checks.py --sections "1.1,13.2,13.4,13.8,14,16,Judgment calls,Appendix A": exit 0 on both copies — C1 5/0, C2 1/0,
#    C3 187/0, C4 1/0, S1 0/0, S2 208/0 → 209/0 (one more pointer, resolved); INDEX (information run) identical on both copies
#    (C3 21 hits, the same 17 unreviewed as the live INDEX). **WARNING printed: reference corpus INCOMPLETE (captures,
#    research/patreon, research/devlogs, research/ftg-docs, research/external missing) — NOT authoritative; provisional.**
#  - No review id (R2-nn, R3-nn, verifier ids) in any block body (grep).
#
# SIZES (wc words; principle (9)'s report) — the unit GROWS by 602 words (+0.97 % of the touched sections, 62 379 →
#  62 981): §1.1 +7, §13.2 +369, §13.4 +20, §13.8 +50, §14 +22, §16 +73, the judgment index +11, Appendix A +50; INDEX
#  4 049 → 4 054; Part A 91 914 → 91 925. Removed: nothing (no restatement, narration, duplicated mechanism or verbose
#  prose stood in the touched text). What holds it is irreducible content the findings require: bar clauses and fixtures
#  (T110-2's two, T114-3's, T116-4's export cases), schedule cells, the ids the take-over table and runs lists must carry,
#  and Appendix A's grading sentence.
