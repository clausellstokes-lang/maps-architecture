# repair-r5-scope — lane coherence/repair-scope-r5 (unit scope: base §0–§1, §13–§17, the index, INDEX.md)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-scope-r5; covered by the whole-design retrovalidation (J84).

# Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): text before the first block header is
# ignored. Every block targets docs/ARCHITECTURE.md (live target: assemble-r4's output, sha256 5f34cceb…, unchanged at
# landing). Every REPLACE body is the live subsection with count-asserted substitutions (generator
# docs/validation/coherence/work/repair-scope-r5/gen.py over edits.py: 16 substitutions, each asserted to occur exactly
# once in its subsection, each tagged with its issue or END line in gen-log.json; R5-02's (S1) text is asserted equal to
# the text extracted from adjudication-r5, s1.txt); every untouched line is verbatim. Blocks: 5 REPLACE on the base
# (§13.1, §13.2, §13.8, §14, §16). Ruling requests: 0. Binding rulings applied: adjudication-r5's R5-01, R5-02, R5-03,
# R5-07, R5-10 (Part H · scope), with R3-01 – R3-03 and R4-01 standing.
#
# PROGRESS
# - P0 brief read whole (10 routed issues; ROUND-5 NOTES, NEW OWNER RULES, ORCHESTRATION NOTES); adjudication-r5's TOC,
#   R5-01, R5-02, R5-03, R5-07, R5-10 and Part H · scope (10 dispositions, 3 END lines) read whole; R3-01 – R3-03 and
#   R4-01 read: done
# - P1 issue sources (verify-agree-fabric-r4t, verify-agree-host-r4t, verify-agree-proof-r4t, verify-determinism-r4t,
#   verify-kernel-r4t, verify-model-r4t, verify-rendering-r4t, verify-scope-r4t; round5-work/scope.json: no
#   also_reported, no orchestrator_note), the live subsections (§13.1's kernel set; §13.2's T76-1, T110-2, T114-3 – T114-5
#   and T121-3; §13.8's T110 and T114 rows; §14's @plat/model line, dependency rule, type index, port types and items
#   2 and 4; §16's M3b row) and their homes (§3.2 (9) and `Frame`, §7.7 item 12, §8.1's shared types, V06 §3.19.2 (5),
#   T-V6-11, T-V6-73 and §8's E3, V07 §2.1, §3.2 (1), §5.6 (3) and (8), V08 §2.4 (`recognise`, *Selection*, the `id`
#   row), §3.5's absorb rule, B3, B5, B6): done
# - P2 count-asserted edits (edits.py): done
# - P3 dry runs on copies, references, document checks (CHECKS below): done
# - P4 result saved, LANDED: done
#
# DISPOSITIONS (adjudication-r5 Part H · scope) — 9 FIX, 1 MERGED, 0 INVALID; every id closed by the edit named
#  VAF-R4T-04 (FIX) — §16's M3b row: "the `disaster` look's units (§10.2's `neighbourhoods`) with volume 1's
#        `disasterSource` and `disasterDistricts` at M5 (W10) — at the village rungs volume 7's `villageDisasterUnits`
#        and `villageUnitPlots`, V-M3 (V07 §5.6 (8)) —", the rest as it stands (V07 §5.6 (8): "It lands at V-M3").
#  VAH-r4-03 (FIX per R5-07 (d)) — §14 port item 2: "`select` refuses a dossier that lacks a required key of every
#        registered adapter — no dossier of any registered line, a hand-made teaching file among them —
#        `E_UNKNOWN_SHAPE`, and one that holds every required key of a line but no registered adapter accepts
#        `E_LINE_UNSUPPORTED` (V08 §2.4)", as required (V08 §2.4 *Selection*, B3, B5 agree).
#  VAH-r4-04 (FIX per R5-07 (d)) — §14's `field_fallback` comment adds "(V08 §3.5: its path absent or its value of no
#        form its row reads; an empty list is a value, compared as read)", as required.
#  VAP-r4-01 (FIX) — T114-3 gains "its regrowth clause" as required (a CITY aqueduct's crossing station, both spans
#        toppled as T-V6-11's second run, the curtain absorbed, the aqueduct repaired by hand and by V06 §3.19.2 (5),
#        the stretch re-laid by `repairWall`'s bend before the spans, the hand repair's undo); §13.8's T114-1 – T114-5
#        row's tier cell adds "and T114-3's regrowth clause on volume 6's engine". The runs sentence ("Volume 6 runs
#        T114-1 – T114-5 save T114-3's landfall clause, …") already keeps the regrowth clause with volume 6 (T-V6-73),
#        as the required change states, and stands; so does the take-over table's evolution row (the same exception).
#        Its milestone cell stands: V06 §8's E3 carries `absorbWall`, repair, the `raisedWays` step and `repairRaised`.
#        The V06 end (T-V6-73's regrowth clause on H-AQUA, V06 §7's row) is an END line under V06.
#  VDC3-03 (FIX per R5-07 (d)) — §14 both sites as required: the `E_OTHER_SETTLEMENT` comment "… nor against a
#        settlement key minted at the document's creation (`settlement:map:<mapId>`), which a later readable `id` is not
#        checked against (§7.7 item 12; V08 §2.4)"; port item 4 "(never for an offer whose `id` fell back, nor against
#        a key minted at the document's creation, which a later readable `id` is not checked against; §7.7 item 12,
#        V08 §2.4)" (§7.7 item 12 and V08 §2.4's `id` row agree).
#  VKr4-02 (FIX; one fix with kernel's VKr4-01) — §13.1's kernel set adds the reverse fold: "a TOWN made at 9 000
#        people handed down to the village product, falling below 400 and re-crossing it (the frame grown to the
#        territory law's 3 373 m square, the arena kept at 4 293 m: (a) and (c) only, `Plat.frame` the new frame as (c)
#        commits, its `marginShare` the kept arena's share; the hand-off up at 1 575 then growing the arena by (b) to
#        5 397 m; §3.2 (9))" — "and the reverse" written "and its reverse" (JUDGMENT 3). Checked: 4 km² × 9 000 ÷ 5 000 =
#        7.2 km², a 2 683 m frame, arena × 1.6 = 4 293 m; 2.275 ha × 400 ÷ 0.8 = 11.375 km² ≥ `minKm2` 4.0, a 3 373 m
#        frame, the law's arena × 1.2 = 4 047 m < 4 293 m (kept); at 1 575 the town law's 1.26 km² keeps the frame and its
#        arena 3 373 × 1.6 = 5 397 m grows (V07 §2.1's band: down below 1 425, up at 1 575).
#  VM-R4T-02 (FIX per R5-02, amended) — T110-2 takes R5-02's (S1) text whole, from "later work across a raised way" to
#        its (6): the locked Re-derive from S4 of (1)'s c15 fixture — stage 2's ring and moat meeting the locked viaduct
#        as in (1) (running on beneath the deck, no station taken), no station moved, added or omitted and no key minted,
#        0 S5b or S5c way corridors over a support ring, ramp, stair or foot. The superseded clauses (a crossing at a
#        gate, a station on the trace, "after generation's last support run", "through one station on the deck",
#        "unchanged but the crossing station's support", support step (6) (a)/(b)) are gone with R4-09.
#  VRC4T-05 (FIX) — §14's three lists add `Box` after `LodBand`: the @plat/model line, the labels/render dependency
#        rule and the type index (§8.1 declares Box in @plat/model).
#  VRC4T-06 (MERGED into VCS-r4-01) — the same site; closed by VCS-r4-01's edit.
#  VCS-r4-01 (FIX) — T121-3: "over §12.5's reference viewports (`resolution.p95`)"; a set-wide search for "reference
#        view" / "reference views" not followed by "port" finds no other site.
#
# END LINES (Part H · scope; each written)
#  END of VEW-r4-01, VEW-r4-03, VM-R4T-01 (with VPC-R4-01), VDC4-03 and VDC4-04 — inside T110-2's (S1) text, written once
#        with VM-R4T-02's FIX: (3)'s quay and way-corridor fixtures (a CITY masonry viaduct across a `quay`-banked river at
#        its clear-span bound; a CITY S4 timber viaduct crossed by a `through` S5b road and an S5c street), (4)'s
#        one-span masonry viaduct, the contraction beside an older station and the hand `delete` (`bend.wall.held`), (5)'s
#        wide road (`bend.raised.around`).
#  END of VV34-r4-01 (model) — T110-2's frame-growth clause adds "and every station of the old deck at its key, position
#        and ring after the growth (§2.7's support step (7))", inside its "after §4.11" clause (JUDGMENT 5).
#  END of VAT4-r4-01 (pipeline; VPC-R4-02 merged) — T76-1's late-calamity fixture adds, as given, "and one carried by a
#        second absorb in the last epoch's own week — no epoch, its targets applied, the calamity riding the next
#        absorb's first epoch at that epoch's first week, its deaths in that epoch's burial need; and a late non-calamity
#        change in an absorb whose week is after the last epoch's — folded at the last epoch's week + 1, the document's
#        current week never before it" (the list's "and" before the year-late fixture becomes a comma, JUDGMENT 4).
#
# SWEEP (R5-01 (2): every restatement in this unit of what the rulings change, conformed in the same block; searched in
# §0–§1, §13–§17, the judgment index, Appendix A and INDEX.md, prose, tables, tests and milestone cells alike)
#  R5-02: searched "support step", "crossing station", "last support run", "through one station", "raised gate",
#    "re-sit", "walls.waited", "raisedCrossing", "underSpan", "W_RAISED_CROSSING", "wall opening", "beneath … deck",
#    "station", "palisade". Found: T110-2 (rewritten whole); §13.8's T110 row, whose list of (4)'s and (5)'s epoch clauses
#    now names (4)'s contraction ("circuits, contraction, stage growth and route re-solve", JUDGMENT 1); T114-3's
#    crossing and landfall clauses, the T110 and T114 runs sentences, the take-over table's evolution row, §0.2's item-110
#    row, §16's M3a row and the judgment index's J-A110 rows agree with R5-02 and stand (R5-02's own sweep (c) says the
#    same); INDEX.md states no crossing rule.
#  R5-03: searched "last epoch", "late", "lateCalamities", "rides the", "DossierBinding", "quarantined". Found: T76-1's
#    trigger parenthesis, which said a late calamity "rides the absorb's first epoch" — wrong for an absorb in the last
#    epoch's own week, which folds none — conformed to §4.11 *The clock* (4)'s amended rule in the same block: "it
#    rides, at that epoch's first week, the first epoch its absorb folds where the absorb's week is after the last
#    epoch's (one folded at the absorb's week where no other is), else the first epoch a later absorb folds, held
#    meanwhile in `DossierBinding.lateCalamities`" (JUDGMENT 2). §14 names `DossierBinding` only as §7.7's type and
#    lists none of its fields, so `lateCalamities` needs no §14 text.
#  R5-07: searched "teaching file", "recognis", "fell back", "E_OTHER", "E_UNKNOWN", "E_LINE", "leaves empty",
#    "settlement:map", "field_fallback", "settlement key". Found: the four §14 sites the issues name (fixed); the
#    `DossierDigest.settlement` key and seed comments, port item 5's `line` sentence and T125-1 (a creation) agree.
#  R5-10: VKr4-02's fixture is §13.1's (written); the unit holds no other fixture list R5-10 names.
#  VAF-R4T-04's subject: §14's extension-point list ("`live.crises`, the latter reading volume 1's `campLand` and
#    `disasterDistricts`") mirrors §8.2's reader list (rendering's home) word for word and stands.
#
# JUDGMENT CALLS (vetoable; none adds design beyond the issues' and rulings' texts)
#  1. §13.8's T110 row adds "contraction" to "(4)'s and (5)'s circuits, stage growth and route re-solve": R5-02's (S1)
#     puts an epoch contraction into (4), and the row's list of the epoch clauses it schedules from M4 and on volume 6's
#     engine would otherwise omit one (R5-01 (c)'s class: a milestone cell that must schedule a ruled case). R5-02 says
#     the row "stands"; this adds the one word its own (S1) needs and changes no milestone.
#  2. T76-1's trigger parenthesis is conformed to R5-03 (the sweep above) in §4.11 *The clock* (4)'s terms, so the bar's
#     rule and its new second-absorb fixture agree.
#  3. Two wordings changed only to clear doc_checks' C3 (each a corpus 3-gram run of common words): VKr4-02's "and the
#     reverse" → "and its reverse"; T76-1's "else the first a later absorb folds" → "else the first epoch a later absorb
#     folds". Meaning unchanged.
#  4. T76-1's fixture list: "(…; from M6-E) and a calamity carried one year late" → "(…; from M6-E), a calamity carried
#     one year late, …," so the END's "and one carried by a second absorb …" closes the list.
#  5. VV34-r4-01's END text is written as given inside T110-2's "after §4.11 …" clause, with the citation "(§2.7's
#     support step (7))" (R5-02's new home) added; "ring" there is the station's support ring of (7).
#
# HAND-OFFS (R3-01 (3) / R5-01 (2): for round 6's verifiers; none is open wording in the design)
#  * model, pipeline, determinism: T110-2 and §13.8 cite §2.7's support step (6) (a)–(d) and (7), `W_RAISED_CROSSING`,
#    §7.1's `bend.wall.raisedCrossing`, `bend.wall.held`, `bend.raised.underSpan` and `bend.raised.around`, and T76-1
#    cites §4.11 *The clock* (4)'s held calamity and §7.7's `DossierBinding.lateCalamities` — each written by its owner
#    this round under R5-02 / R5-03 (their FIXes and END lines in Part H); a verifier checks the names landed as cited.
#  * kernel: §13.1's reverse fold reads §3.2 (9)'s VKr4-01 text (FIX, amended: "after a change of frame law only …";
#    `Plat.frame` taking the new frame as (c)'s batch commits, its `marginShare` the kept arena's share).
#  * V06: T-V6-73's regrowth clause on H-AQUA and V06 §7's T114-1 – T114-5 row (END of VAP-r4-01 under V06), and
#    H-AQUA's definition (VV56-r4-02), which the regrowth clause's "CITY fixture whose aqueduct crosses the ring at a
#    crossing station" runs on.
#
# NOTE FOR ASSEMBLE (one proposed allow row; the shared allow file is the assembler's to write)
#  doc_checks.py reports one new C3 run, "3 on the city and", from T110-2's item "(3) on the CITY and METROPOLIS fixtures"
#  — R5-02's binding (S1) text, written whole as Part H requires; its 3-grams are common words that occur separately in
#  research/findings (ftg-posts-c, vg-posts-b, dwellings-synthesis hold "3 on the"); no corpus file holds the run whole.
#  Proposed row (tab-separated):
#    C3	3 on the city and	coherence/repair-scope-r5 (proposed): §13.2's T110-2, item (3) "on the CITY and METROPOLIS fixtures" — our own plain English, the binding text of adjudication-r5 R5-02 (S1) written whole; a numbered item and a rung name, no reference phrasing
#
# CHECKS (executed on copies; receipts in docs/validation/coherence/work/repair-scope-r5/: gen.py, edits.py, s1.txt,
# gen-log.json)
#  - apply-blocks.py (unchanged) alone on the live base + rationale: 5 found, 5 applied, 0 skipped, audit not-OK 0,
#    headings 153 → 153, fences balanced (140 → 140), title block unchanged, the rationale untouched (judgment index 805 =
#    Part A 805, 0 duplicates); document 22 934 → 22 967 lines.
#  - References (assemble-r4's refs.py and mirror.sh on mirrors of the set, live and with these blocks): base BROKEN 0 →
#    0, resolved 18 109 → 18 117, ambiguous 14 → 14, resolved-form 5 → 5; every volume and INDEX.md unchanged; 0 broken
#    set-wide.
#  - doc_checks.py --sections "13.1,13.2,13.8,14,16": live exit 0 (C1 5/0, C2 1/0, C3 112/0, C4 0/0, S1 0/0, S2 272/0);
#    with these blocks C1 5/0, C2 1/0, C3 113/1 (the run proposed above), C4 0/0, S1 0/0, S2 273/0 (one more pointer,
#    resolved) — exit 0 with the proposed row on a copy of the allow file. **WARNING printed: reference corpus
#    INCOMPLETE (captures, research/patreon, research/devlogs, research/ftg-docs, research/external missing) — NOT
#    authoritative; provisional.**
#  - Added lines (76): no review id (R-nn rulings, verifier ids); no deferral wording (the four "later" are temporal
#    order: "a later absorb", "later work", "a later readable `id`"); no phone, mobile or small-screen clause; the canon's
#    35 retired-term patterns: 0 hits.
#
# SIZES (wc words; principle (9)'s report) — the unit GROWS by 681 words (+1.48 % of the touched sections, 46 049 →
#  46 730): §13.1 +75, §13.2 +486, §13.8 +9, §14 +96, §16 +15. Of §13.2's growth, T110-2's later-work clauses take +257
#  (R5-02's (S1) text, whole: 326 → 583 words, the superseded R4-09 clauses removed with it), T114-3's regrowth clause
#  +102, T76-1's fixtures and trigger +107, the frame-growth END +20. No restatement, narration, duplicated mechanism or
#  verbose prose stood in the touched text to remove; what holds it is irreducible content the findings and rulings
#  require: the fixtures of the raised-way rule, the regrowth and reverse-fold fixtures, the late-change fixtures, the
#  village rungs' landing, and the port's refusal and key wording in V08's terms.
