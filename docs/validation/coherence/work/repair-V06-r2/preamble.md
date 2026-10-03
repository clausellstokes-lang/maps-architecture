# Repair round 2 — V06 (evolution) — lane coherence/repair-V06-r2

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-V06-r2; covered by the whole-design retrovalidation (J84).

# §8 total: 31–44 pw (was 29.75–42.25) — E2 + 1–1.5 pw (items 122 and 123: the hand-over and the decay level), E6 + 0.25 pw
# (the dossier catch-up's coarsening; the Accept re-estimated on a changed head).
#
# Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): text before the first block header is
# ignored; the FILE line routes every block to docs/volumes/V06-evolution.md. Live unit: V06 as assemble-r1 installed it
# (sha256 771887caa2d6ff6c…, 629 860 bytes; base 137ecc0e…; no round-2 assemble has run). Each REPLACE body is the live
# subsection with count-asserted substitutions (work/repair-V06-r2/build.py over edits_a.py … edits_d.py: 94 edits, each
# applied exactly its asserted count); every untouched line is verbatim. Blocks: 33 — 32 REPLACE (§1.1, §1.2, §1.3, §1b,
# §2.1, §2.3, §2.9, §2.10, §2.12, §2.14, §3.2, §3.3, §3.5, §3.6, §3.7, §3.13, §3.15, §3.17, §3.18, §3.19, §3.20, §3.21,
# §4.1, §4.3, §5.2, §6, §7, §8, §9, §10, §11, §12) and 1 APPEND TO SECTION `## 3` (the new V06 §3.22 and §3.23, after §3.21,
# as V03 §5.5 was appended in round 1). Ruling requests: 0.
# Binding rulings applied (adjudication-r2, V06's row): R2-05, R2-06, R2-09, R2-12, R2-13, R2-18, R2-19, R2-20, R2-26,
# R2-27, R2-31, R2-35, R2-36, R2-37, R2-38, R2-40; R2-07's form for the head's item range (ASSEMBLE NOTE below).
#
# PROGRESS
# - P0 brief read whole (15 issues: 1 blocker, 6 major, 8 minor; G122-V06 and G123-V06 new design); adjudication-r2's TOC,
#   V06's sixteen rulings whole and Part H · V06 read: done
# - P1 issue sources, g items 122, 123, 125 whole, canon routings, every concerned V06 section and the base homes cited
#   (§4.11 *The clock*, *Works* (1)–(10), S5a, `AccessPassStrategy`), the landed round-2 repairs of model, pipeline and
#   determinism for shared names (`decayLevel`, `frontierFor`, `lookLevel`, `campLand`, the week sentence): done
#   (a usage-limit cut at 07:09 interrupted P2; resumed under the CONTINUE rule from work/repair-V06-r2/edits_a.py and
#   edits_b.py, both re-verified against the live V06 before continuing)
# - P2 edits_a … edits_d written; blocks built: done
# - P3 dry run of apply-blocks.py on copies of the live V06 and rationale, this file routed as Assemble routes it (the
#   FILE line dropped): 33 found, 33 applied, 0 skipped, audit not-OK 0, no notes, headings 63 → 65, fences 26 → 28
#   balanced, title block unchanged, rationale unchanged; output sha256 03d1130a03035895…, byte-identical to the builder's
#   expected volume; tables (every row its header's cells), id census, refs and doc checks below: done
#
# ISSUES → WHERE FIXED (15 routed ids; all FIXED in text; none INVALID; none parked)
#  VAT1-03 (blocker, R2-19)  V06 §4.1's undo bullet reads VAT1-03's sentence (no event of the port's session `host:port` —
#        a port epoch, with or without a dossier change, a dossier event — is an undo, redo or revert target, §7.4
#        *Replay semantics*); T-V6-27's clause and the take-over rows T20-2 and T20-6 read VAT1-03's text; V06 §4.3's undo
#        bullet and §2.12's catch-up row cite the same rule.
#  VAT1-05 (R2-20, R2-27 (e))  V06 §3.7.7 (3) orders by the week of the run's last-change epoch (VAT1-05's text); T-V6-73
#        gains the history-first fixture; V06 §3.21 (b) gains "item 114's recovery × the history replay".
#  VAP-r1-10 (R2-09)  T-V6-74's last clause is the `item115.ceiling` registration of H-100 at TOWN and above, written by
#        V06's E2 seat; V06 §8's *The no-op pins* lists E2 `item115.ceiling` (H-100 at TOWN and above; T-V6-74).
#  G122-V06 (NEW DESIGN; R2-37 (6), R2-35, R2-36)  new V06 §3.22: (1) the aftermath only through the next epoch; (2)
#        `frontierFor(doc, households): FaceRef[]`, pure and draw-free, read by §10.2's refugee-camp placement, the overflow
#        belt by a gate where there is no frontier; (3) `crisisLookYields` — the disaster look yielding per building to the
#        first Works of its rebuild, no week drawing both; (4) lifecycle and edges. Wiring W92, W93; §1.1 (29); §1.2 and
#        §1.3 rows; §1b dossier-trace rows; §2.12 rows; §3.6 (6), §3.13 (6) pointers; §3.21 (a) and (b) rows; §6.9's
#        costs; T-V6-75 (takes T122-1's hand-over clause) and the take-over row; J-V6.137, J-V6.138; E2 (M6-E) with its
#        price; §10, §12.
#  G123-V06 (NEW DESIGN; R2-38 (3), R2-35, R2-36)  new V06 §3.23: `decayLevel(doc, lineage, week)` in [0, 1] and
#        `decayPeak`, derived and never stored — the decay run from the event that left a standing state, each existence
#        state owning a third of the range, the years at V11's rate by walls material inside it, monotone while the run
#        lasts; restoration under the `repair` Works in reverse threshold order, elements between level and peak drawn in
#        item 114's patch material until a rebuild; `reused`, `cleared`, a demolition and a successor at 0; V11's default
#        age where the log holds no run (and for every building until E2 lands, R2-36); reads at any week, no model, draw
#        or hash touched. Wiring W94; §1.1 (30); §1.2, §1.3 rows; §2.12 row; §3.5.2 pointer; §3.21 rows; §6.9; T-V6-76
#        (takes T123-4's epoch clause) and the take-over row; J-V6.139; E2 with its price; §8's V11 cells and risk (4);
#        §10, §12.
#  VV56-r1-01 (R2-31 (a))  V06 §6.8 (6) reads VV56-r1-01's text (the coarsened catch-up, J-V6.136); §6 head, §6.8's title,
#        (1), (3) and (5) carry the third wait; §3.3.1, §1.1 (14), §1.2, W91, §2.10's `advance` comment, §2.12 row; §3.21 (a)
#        row "a dossier catch-up of many years"; T-V6-24's 20- and 100-year catch-ups at CITY and METROPOLIS, the sky off
#        and on, p95 ≤ 10 000 ms, the dossier's facts met exactly; J-V6.136; E6 and §12 (1).
#  VV56-r1-04 (R2-31 (b))  V06 §4.1's Accept folds again at the cadence re-estimated on the current head, the card naming
#        it; T-V6-23's clause; §3.21 (a)'s advancing-time row; E6's line.
#  VV56-r1-02 (R2-40 (1))  V06 §3.20.3's `W_p` and §5.2 *Years* read VV56-r1-02's text; §1b's dossier-trace rows for the
#        week and the population cite §4.11 *The clock* (1)–(2) (the dossier's own ticks); 0 `HostContext` and 0
#        `elapsedWeeks` left in V06; the head's range: ASSEMBLE NOTE.
#  VV56-r1-03  V06 §3.15's upgrade parenthesis reads VV56-r1-03's text.
#  VEL1-04 (R2-18 (a))  V06 §3.5.1 (5) reads VEL1-04's text; §4.3 states §7.7's precedence for a dossier event; §3.21 (a)'s
#        decline row and (b)'s history × locks row; T-V6-70 (f)'s clause.
#  VM-R1T-06 (R2-13)  V06 §2.9 is the pointer sentence (`Use.strain` is §2.7's).
#  VPC-R1-20 (R2-13)  V06 §2.3 and §2.14 cite §4.11's `EpochInputs.wealthLevel`, `.advance`, `.replay` (no declaration).
#  VM-R1T-09 (R2-26 (b))  V06 §3.19 (5), §3.17 item 9, §2.10's `raised.waited` comment name `raised_too_long` beside
#        `raised_too_tall`; so do W57 and J-V6.122 (the same waiting rule).
#  VPC-R1-05, VV34-r1-05 (R2-12)  `UnderOpeningRow` at V06 l.314 (W46), l.2443 (§3.18's head) and l.2490 (§3.18.1 (2d));
#        0 bare `OpeningRow` left.
# RECEIVING ENDS (Part H · V06): R2-12 — every `AccessPass.run` / `AccessPass` in V06 (§1.2, W3, W64, §3.2's row 20,
#   §3.18's head and (2), §8's order) reads `AccessPassStrategy.run(doc, rules, ctx, k, scope)` (II.7.6); R2-26 (c) —
#   V06 §3.7.6 (5)'s wall opening is the aqueduct's station on the trace, kept as a raised gate's stretch is (J-V6.114
#   marked amended, J-V6.140 governs; T-V6-11's H-AQUA clause); R2-26 (d) — §3.19 (7) and its rows paragraph and §1.3
#   cite `raisedWays.structure.stripMarginM` (V11 §3.24.2), 0 `raised.stripMarginM` left; R2-27 (a) — §3.7.7's welded
#   stretch on the town ring's draws and λ, with T-V6-73's CITY `on_enceinte` clause.
# SELF-FOUND (same unit): V06 §2.1's `ProductEpochContext.doc` was typed `DocView`, a name no unit declares; it reads
#   `Document` (§2.9), its comment unchanged. The new services are typed on `Document` likewise.
#
# CHECKS (on the expected volume, scratch):
#  - apply-blocks dry run as in P3 (expected V06: 665 606 bytes, sha256 03d1130a03035895…).
#  - refs.py (assemble-r1's) on a mirror with the expected V06: V06 resolved 3 236 → 3 476; ambiguous-form 2 → 3 (the new
#    one, "§2.7's support step (3)" inside a V06 clause, resolves to the base as canon S7 reads a bare §, the class of the
#    two already listed); 9 BROKEN, all R2-35's base bar ids (T122-1 ×4, T123-4 ×4, T123-1 ×1) that scope writes into §13.2 this
#    round (they resolve when scope's blocks land; R2-05).
#  - doc_checks.py --doc V06 --heads base over the touched sections, live → expected: C1 0 → 0, C2 0 → 0, C4 0 → 0, S1 0 → 0;
#    C3 188 → 208 hits (the 20 new: short runs of ordinary words and section numbers shared with our own
#    research/findings notes — no identifier, palette, grammar or word list); S2 is the volume's own "V06 §n" and "Vnn §n"
#    pointers, which the base-heading check does not parse. WARNING recorded: reference corpus INCOMPLETE (captures,
#    research/patreon, research/devlogs, research/ftg-docs, research/external absent) — the clean-room result is NOT
#    authoritative, provisional until re-run on the machine that holds the corpus.
#  - ids: T-V6-75, T-V6-76, J-V6.136 – J-V6.140, W92 – W94 new and unique; no duplicate T-V6 or J-V6 row.
# SIZE: V06 102 706 → 108 667 words (+5 961, +5.8 %). Sources: RESTATEMENT cut −97 (§2.3's and §2.14's `EpochInputs`
#   fields, §2.9's `Use.strain` block, now citations); added ≈ +4 300 owner items 122 and 123 at build depth (V06 §3.22–§3.23
#   1 735, T-V6-75/76 638, J-V6.137–139 405, W92–W94 287, §3.21 rows ≈ 560, §6.9 159, the rest in §1, §2.12, §8, §10, §12),
#   ≈ +600 the catch-up's comfort level (VV56-r1-01, -04), ≈ +1 150 the other fixes, edges and receiving ends. A repair
#   round shrinks nothing it was not asked to; the growth is new design and defined edges, no restatement.
#
# ASSEMBLE NOTE — the title block (R2-07: text inside the title's level-1 subsection is Assemble's to set in place). V06
#   l. 10, "`item n` is an amendment item — items 1–119 the owner's, items 200 and above file f's": "items 1–119 the
#   owner's" reads "items below 200 the owner's" (the list means every owner item, so it names no upper number; V06 now
#   cites items 122, 123 and 125). No other text there changes.
#
# HAND-OFFS for round 3's verifiers (R2-05 (3); each receiving end is its own seat's this round or names a ruling):
#  - scope: §13.2's take-over table, the evolution row's base-bar column, adds "T122-1's hand-over clause" (T-V6-75) and
#    "T123-4's epoch clause" (T-V6-76) (R2-08, R2-35); §16 and INDEX §1 read V06's §8 total 31–44 pw (R2-06 (b)).
#  - V12: §2.13's `item115.ceiling` row and §3.7.8's list name T-V6-74 (R2-09; V12's seat).
#  - V11: item 123's rows V06 §3.23 reads — a decay rate per year by walls material (timber and thatch faster than stone),
#    a default age D, a default row for a material with none, and each element kind's threshold range lying in the third
#    of the existence state whose look item 123 (c) gives it (V06 §3.23 (2)).
#  - V02, V03, V04, rendering §8.2 / §8.6 / §11.1, V09, V10: read `decayLevel` and `decayPeak` (an element above the level
#    and at or below the peak drawn repaired, in patch material); V02's ruined exterior, V03's look damage and §8.2's
#    disaster look row draw a building's ruin only while `crisisLookYields` is false.
#  - pipeline §10.2 (f): "`disaster`: … ending in the week its `reconstruction` Works begins (V06: no week draws both)"
#    reads per building as V06 §3.22 (3) and J-V6.138 state it; §10.2's `approachByGate` ranks `campLand` by distance to
#    `frontierFor` (as V06 §3.22 (2) states).
#  - V08 (R2-31 (a), V08's seat): the catch-up rule and its §6 row cite V06 §6.8 (6); V09 (R2-31 (e)): `progress.dossier`
#    names the catch-up's cadence.
