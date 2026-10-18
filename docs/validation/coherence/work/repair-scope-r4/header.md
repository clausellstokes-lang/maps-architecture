# repair-r4-scope — lane coherence/repair-scope-r4 (unit scope: base §0–§1, §13–§17, the index, INDEX.md)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-scope-r4; covered by the whole-design retrovalidation (J84).

# Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): text before the first block header is
# ignored. Every block targets docs/ARCHITECTURE.md (live target: assemble-r3's output, sha256 593c657d…, unchanged at
# landing). Every REPLACE body is the live subsection with count-asserted substitutions (generator
# docs/validation/coherence/work/repair-scope-r4/gen.py over edits.py: 27 substitutions, each asserted to occur exactly
# once in its subsection, each tagged with its issue in gen-log.json); every untouched line is verbatim. Blocks: 6 REPLACE
# on the base (§0.2, §13.1, §13.2, §13.8, §14, §16). Ruling requests: 0. Binding rulings applied: adjudication-r4's R4-01,
# R4-06, R4-08, R4-09, R4-10, R4-11, R4-15 (Part H · scope), with R3-01 – R3-03 standing.
#
# PROGRESS
# - P0 brief read whole (13 routed issues; ROUND-4 NOTES, NEW OWNER RULES, ORCHESTRATION NOTES); adjudication-r4's TOC,
#   R4-01, R4-06, R4-08, R4-09, R4-10, R4-11, R4-15 and Part H · scope (13 dispositions, 4 END lines) read whole;
#   R3-01 – R3-03 read: done
# - P1 issue sources (verify-agree-proof-r3t, verify-agree-time-r3t, verify-determinism-r3t, verify-kernel-r3t,
#   verify-model-r3t, verify-pipeline-r3t, verify-rendering-r3t, verify-scope-r3t, verify-edges-world-r3t for the END of
#   VEW-r3-04), the live subsections (§0.2's item-122 row; §13.1's kernel set; §13.2's T76-1, the item-110, -113, -114,
#   -121, -122 and -124 groups and the take-over table; §13.8's T76, T110 and T114 rows; §14's port types and items 2 and 4;
#   §16's M6-U row), their homes (§3.2 (9), §4.11 *The clock* (4), §6.1 *The weather stream*, §10.2 (d), V04 §5.6 (6),
#   V05 §3.16 and T-V5-14, V06 §3.3.1, §3.7.7 (3), T-V6-47 and T-V6-73, V08 §2.4's `id`, `_seed` and `line_differs` rows,
#   V11 §3.24.2's `maxClearSpanM`, V12's T-V12-44 – T-V12-59) and the landed round-4 model file: done
# - P2 count-asserted edits (edits.py): done
# - P3 dry runs on copies, references, document checks (CHECKS below): done
# - P4 result saved, LANDED: done
#
# DISPOSITIONS (adjudication-r4 Part H · scope) — 13 FIX, 0 MERGED, 0 INVALID; every id closed by the edit named
#  VAP-r3-09 (FIX) — §0.2's item-122 row: "volumes 1, 2, 3, 4, 6, 7, 8, 9, 10, 11 and 12"; §13.2's item-122 runs list adds
#        "volume 4's look below ground (T-V4-82 (i))" after volume 2's entry. V12 §3.15.12's head is V12's END.
#  VAT3-r3-03 (FIX) — T114-4: "by the week of each run's last-change epoch (`EpochRecord.inputs.week` of its
#        `conditionEpoch`; generation's epoch 0 first, every replay epoch's week before every live one's — §6.1, V06 §3.7.7
#        (3)), never the epoch's number"; the item-114 runs list names T-V6-73's history-first fixture as T114-4's replay
#        case. V12's sibling is VAT3-r3-04.
#  VDC3-10 (FIX) — T124-9: "the timeline replays from its session seed, clock and presses with the climate row, year
#        position, sites, `light` mode and view hour in force at each moment (§6.1 *The weather stream*) — …among its
#        fixtures", as required; one wording with §6.1 (VDC3-09's `light` mode).
#  VKr3-03 (FIX; one fix with kernel's VKr3-02) — §13.1's kernel set adds "one whose law would move a side out by at most
#        `attractCm` — a CITY frame kept through a decline below 10 000 people, re-crossing two people above its peak
#        (frame and arena kept, nothing runs, no chain stripped; §3.2 (9))". Checked: at the CITY floor (1 250 m² a
#        person) two people move a frame side ≈ 17.7 cm ≤ `attractCm` 26 cm, and the arena follows the kept frame.
#  VM-R3T-05 (FIX per R4-09, amended) — T110-2 gains R4-09's fixtures (1)–(5) under "later work across a raised way
#        (§2.7's support step (6))", in place of the waiting and span-bending clauses (no crossing of a standing raised way
#        waits or bends now); they carry VEW-r3-01's, VEW-r3-03's, VEW-r3-05's and VM-R3T-06's fixtures (the locked re-run
#        in (4)). The round-3 c14 generation fixture is kept, cited (6) (a); round 3's epoch circuit across a standing
#        aqueduct is (4)'s first circuit (JUDGMENT 3). §13.8's T110 row schedules (4)'s and (5)'s epoch clauses on volume
#        6's engine with M6-E's E2 and E3. V06's T-V6-47 is an END under V06.
#  VPC-R3-01 (FIX per R4-08) — T76-1's cadence clause names the third trigger and its fixtures as required, with R4-08's
#        "a calamity carried one year late, riding the absorb's first epoch, its event at that epoch's first week"; the
#        trigger carries the late case's exception (§4.11 *The clock* (4)) and the coarsened catch-up's fixture runs from
#        M6-E (JUDGMENT 2; §13.8's T76 row the same).
#  VRC3T-03 (FIX per R4-10) — T121-2: "— a change lands only while the view is settled (§8.8): at once when no gesture
#        runs, at the gesture's settle otherwise —" (R4-10's one phrase; JUDGMENT 4 on the pointer's place).
#  VCS-r3-01 (FIX) — the take-over table's calibration row: "T113-2, T113-5's registration and T113-7's pin (T-V12-46);
#        T114-4 – T114-8 (T-V12-47); … T117-1, T117-2, T117-4, T117-5, T117-7 and T118-1 – T118-6 (T-V12-49)"; item 113's
#        runs list: "volume 12 their register lines, T113-7's pin and the replay's budget (T-V12-46)". V12's heads are
#        VCS-r3-02.
#  VCS-r3-06 (FIX per R4-09, amended) — the evolution row adds "T110-2's epoch clauses (4) and (5) (T-V6-47)," after
#        "T108-4 over epochs (T-V6-45),"; the T110 group adds "Volume 6 runs T110-2's epoch clauses (4) and (5) on its
#        engine (T-V6-47)." after T110-7's registration list.
#  VCS-r3-08 (FIX per R4-06) and VV1112-r3-08 (FIX; one fix) — T122-6: "… over a label's keep-out, and on a way's
#        carriageway only a barrier across it (§10.2 (d)), and several crises share the outskirts by `priority` under
#        `densityCap` (§10.2's placement; `crisis.blocked` 0 and `crisis.share` 0)".
#  VV34-r3-04 (FIX) — §16's M6-U content cell: "item 123's damage below ground at the later of U5 and V03's P4 (V04 §5.6
#        (6))".
#  VV78-r3-05 (FIX per R4-15; one fix with determinism's VDC3-03) — §14: `PortNote.kind` adds `line_differs` with the
#        required comment; `field_fallback`'s comment "that the dossier lacks, leaves empty or gives unreadable, its
#        fallback taken — at an absorb the carried fact standing (V08 §2.4, V08 §3.5)" (R4-15 (a)); `DossierDigest.settlement`'s
#        `key` "…, else V08 §2.4's `id` fallback (§7.7 item 12)" and `seed` "H32(\"plat:sf-seed\" ‖ the dossier's seed,
#        else ‖ the settlement key — V08 §2.4's `_seed` row)"; port item 2's ONE-WAY SEED adds "— an empty or unreadable
#        seed read as the settlement key (V08 §2.4) —" after the derivation.
#
# END LINES (Part H · scope; each written)
#  END of VDC3-03 (determinism; R4-15 (c)) — §14's `E_OTHER_SETTLEMENT` comment adds "never for an offer whose `id` fell
#        back (V08 §2.4)"; the sweep (R4-01 (2)) conforms port item 4's sentence "a digest of another settlement
#        `E_OTHER_SETTLEMENT` (never for an offer whose `id` fell back, V08 §2.4)".
#  END of VEW-r3-04 (model; R4-09) — the item-114 group: T114-3's crossing clause adds "a crossing station whose spans have
#        both fallen keeps its stretch as a wall run, never dismantled as a support"; T114-3 gains "its landfall clause, on
#        volume 5's landfall (V05 §3.16): a landfall over a raised gate, then the deck's repair — the stretch repaired with
#        the deck, never a deck on a breached run" (JUDGMENT 1 on its runner).
#  END of VAP-r3-06 (V06) — §13.8's T114-1 – T114-5 row reads "the milestone tier over H-100's epochs and H-AQUA's for
#        T114-3's crossing clause", as given (with JUDGMENT 1's landfall schedule beside it).
#  END of R4-11 (adjudicator's sweep) — T122-2 reads "… at every key for a look-bearing condition (`public`, DR44) and for
#        no `none`-row one (`crisis.weeks` 0)".
#
# SWEEP (R4-01 (2): every restatement in this unit of what the rulings change, conformed in the same block)
#  R4-09: §13.8's T110 row ("the circuit across a standing aqueduct … the circuit on volume 6's engine") now names (4)'s
#    and (5)'s epoch clauses; no other text of the unit restates support step (6) (searched: "support step", "crossing
#    station", "re-sit", "walls.waited", "raised way"). R4-08: T76-1 only (searched "calamit", "cadence", "52-week").
#  R4-10: T121-2 only (searched "settle" in §0–§1, §13–§17, Appendix A; §0.2's row 121 names "its settle rule" and agrees).
#  R4-11: T122-2 only (the unit's other "withheld" texts are the knowledge filter on places, not crisis looks). R4-06:
#    T122-6 only. R4-15: §14's `E_OTHER_SETTLEMENT` comment and port item 4; T125-1 speaks of a creation and agrees; T85-2's
#    seed equality is stated for a dossier that carries a seed and agrees.
#
# JUDGMENT CALLS (vetoable; none adds design beyond the issues' and rulings' texts)
#  1. The landfall half of VEW-r3-04's END needs volume 5's engine (a landfall is V05 §3.16's `fallIsland`), which neither
#     H-AQUA nor V06's engine at M6-E holds. So it is written as T114-3's own "landfall clause", and wired both ways like
#     every other staged clause: the item-114 runs list and the take-over table give it to volume 5 (T-V5-14, whose
#     landfall fixture already covers a wall stretch, a gate and a tower) and take it out of volume 6's T114-1 – T114-5
#     ("save T114-3's landfall clause"); §13.8 schedules it with M6-sky. The END's other half (a crossing station whose
#     spans have both fallen) is V06's salvage and topple over epochs, so it joins T114-3's crossing clause on H-AQUA.
#     Both volume ends are HAND-OFFS (R3-01 (3)), since no END line names them.
#  2. T76-1's trigger carries R4-08's exception ("one dated at or before the last epoch's week folding none at its own
#     week: it rides the absorb's first epoch, §4.11 *The clock* (4)"), so the bar's rule and its late fixture agree; its
#     coarsened catch-up fixture is marked "from M6-E" (and §13.8's T76 row the same), because the coarsening reads V06
#     §6.8's comfort estimate, which lands with M6-E, while T76-1's other cadence clauses run from M3a.
#  3. T110-2's round-3 epoch circuit across a standing aqueduct is folded into R4-09's (4) ("an epoch circuit across a
#     standing aqueduct and one across a standing timber elevated road …"). Equivalence: the aqueduct crossed by an epoch
#     circuit (kept); one station on the trace (now "the trace through one station on the deck at its level", the held
#     rule); 0 piers in a setback, glacis, berm or moat (now "its strips stopped where a support stands in them"); the
#     raised way kept (now "every station, key, span and state … unchanged but the crossing station's support"); plus the
#     locked re-run. So T-V6-47's "(4) and (5)" takes it and no clause is left without a taker (VCS-r3-06's class).
#  4. T121-2 places R4-10's "(§8.8)" after "settled" rather than after "otherwise": the same phrase and content, and it
#     avoids a new C3 run ("8 8 and on a") across the dash.
#  5. `field_fallback`'s comment adds R4-15 (a)'s absorb case "— at an absorb the carried fact standing (V08 §2.4, V08
#     §3.5)", in the words of determinism's END for §7.7 item 10, so the note's one comment holds at a creation and at
#     an absorb.
#
# HAND-OFFS (R3-01 (3) / R4-01 (2): ends no END line names, for round 5's verifiers; none is open wording in the design)
#  * V05: T-V5-14's landfall fixture adds a raised gate and the deck's repair and names T114-3's landfall clause (V05 §7's
#    head for T-V5-14: "takes T114-3's landfall clause").
#  * V06: T-V6-73's head "takes T114-1 – T114-5" reads "save T114-3's landfall clause"; its crossing clause (VAP-r3-06,
#    V06's FIX) adds the crossing station whose spans have both fallen, its stretch kept as a wall run, never dismantled
#    as a support (§2.7's support step (3); V06 §3.19.2 (3)–(5)).
#  * determinism: §7.1's `bend.wall.raisedCrossing` and `bend.raised.underSpan` rows (its own FIX and END this round under
#    R4-09) are named by T110-2's (4) and (5).
#  * V12: §3.15.12's head adds V04's T-V4-82 (i) (its END of VAP-r3-09); T-V12-46, -47 and -49's heads (VCS-r3-02) and
#    `T114g.oldestFirst` (VAT3-r3-04) agree with the corrected calibration row and T114-4.
#
# NOTE FOR ASSEMBLE (one proposed allow row; the shared allow file is the assembler's to write)
#  doc_checks.py reports one new C3 run, "1 2 3 4 6 7 8 9", from §0.2's item-122 row ("volumes 1, 2, 3, 4, 6, 7, 8, 9, 10,
#  11 and 12") — volume numbers, not text: the live row's reviewed run "1 2 3 6 7 8 9" (allow row of coherence/assemble-r2)
#  with volume 4 added; held whole by no available corpus file (searched: research/findings/*.md and every JSON under
#  research/ and captures/ present here); absent from the untouched base. Proposed row (tab-separated):
#    C3	1 2 3 4 6 7 8 9	coherence/repair-scope-r4 (proposed): §0.2's item-122 row: "volumes 1, 2, 3, 4, 6, 7, 8, 9, 10, 11 and 12" — volume numbers, not text (the reviewed run "1 2 3 6 7 8 9" with volume 4 added); held whole by no corpus file; absent from the untouched base
#
# CHECKS (executed on copies; receipts in docs/validation/coherence/work/repair-scope-r4/: gen.py, edits.py, gen-log.json)
#  - apply-blocks.py (unchanged) alone on the live base + rationale: 6 found, 6 applied, 0 skipped, audit not-OK 0,
#    headings 153 → 153, fences balanced (140 → 140), title block unchanged, the rationale untouched (judgment index 805 =
#    Part A 805, 0 duplicates).
#  - Combined with the round-4 base files present at landing (model, landed; pipeline, as drafted) in name order: 17 found,
#    17 applied, 0 skipped, audit not-OK 0, headings 153 → 153. The names T110-2 cites from model's §2.7 (support step
#    (6) (a) and (b), `W_RAISED_CROSSING`) are in its landed blocks; `bend.wall.raisedCrossing` and
#    `bend.raised.underSpan` are determinism's to add (HAND-OFFS).
#  - References (assemble-r3's refs.py on mirrors of the set, live and with these blocks): base BROKEN 0 → 0, resolved
#    17 939 → 17 980, ambiguous 13 → 13; the set 54 980 → 55 021 resolved, 0 broken.
#  - doc_checks.py --sections "0.2,13.1,13.2,13.8,14,16": live exit 0 (C1 5/0, C2 1/0, C3 136/0, C4 0/0, S1 0/0, S2
#    251/0); with these blocks C1 5/0, C2 1/0, C3 136/1 (the run proposed above), C4 0/0, S1 0/0, S2 254/0 (three more
#    pointers, resolved) — exit 0 with the proposed row on a copy of the allow file. **WARNING printed: reference corpus
#    INCOMPLETE (captures, research/patreon, research/devlogs, research/ftg-docs, research/external missing) — NOT
#    authoritative; provisional.**
#  - No review id (R-nn rulings, verifier ids) and no deferral or phone wording in any added line (grep).
#
# SIZES (wc words; principle (9)'s report) — the unit GROWS by 770 words (+1.59 % of the touched sections, 48 439 →
#  49 209): §0.2 +1, §13.1 +43, §13.2 +601, §13.8 +33, §14 +83, §16 +9. Removed: round 3's separate epoch-circuit clause
#  of T110-2 (folded into (4), JUDGMENT 3); no other restatement, narration, duplicated mechanism or verbose prose stood in
#  the touched text. What holds it is irreducible content the findings and rulings require: R4-09's five fixtures, T76-1's
#  trigger and four fixtures, T114-3's two clauses and T114-4's ordering key, T124-9's inputs and fixtures, the ids the
#  take-over table and runs lists must carry, schedule cells and the port's type comments.
