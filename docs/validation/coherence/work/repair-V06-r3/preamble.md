# Repair round 3 — V06 (evolution) — lane coherence/repair-V06-r3

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-V06-r3; covered by the whole-design retrovalidation (J84).

# Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): text before the first block header is
# ignored; the FILE line routes every block to docs/volumes/V06-evolution.md. Live unit: V06 as assemble-r2 installed it
# (sha256 d12c382be27e7835…, 665 608 bytes, 4 496 lines). Each REPLACE body is the live subsection with count-asserted
# substitutions (work/repair-V06-r3/build.py over edits_a.py … edits_d.py: 70 edits, each applied exactly its asserted
# count; the build stops if any change falls outside a REPLACEd section); every untouched line is verbatim.
# Blocks: 16 REPLACE — §1.1, §1b, §2 (whole: its lead, §2.10 and §2.12 change), §3.3, §3.5, §3.7, §3.10, §3.20, §3.21,
# §3.22, §3.23, §4.3, §6, §7, §9, §12. Ruling requests: 0.
# Binding rulings applied (adjudication-r3, Part H · V06): R3-01, R3-02, R3-03, R3-04, R3-06, R3-08, R3-09, R3-10, R3-14,
# R3-17, R3-18, R3-19, R3-22, R3-25, R3-26; adjudication-r2 where not superseded.
#
# PROGRESS
# - P0 brief read whole (18 issues); adjudication-r3's TOC, rulings R3-01 – R3-04, R3-06, R3-08 – R3-10, R3-14, R3-17 –
#   R3-19, R3-22, R3-25, R3-26 whole and Part H · V06 (dispositions, 6 END lines) read: done
# - P1 live V06 sections concerned read whole; issue sources (verify-*-r2t), base homes (§2.7 support step, §4.11 The
#   clock and Works (9), §7.7 precedence and T20-15/16, §2.6 clamp, §12.1, §12.10 R12-31, DR29) and V08 §6 read: done
# - P2 edits written (work/repair-V06-r3/edits_a … edits_d, 70 count-asserted edits); blocks built: done
# - P3 dry run of apply-blocks.py on copies of the live V06 and rationale, this file routed as Assemble routes it (the FILE
#   line dropped): 16 found, 16 applied, 0 skipped, audit not-OK 0, headings 65 → 65, fences 28 → 28 balanced, title
#   block unchanged, rationale unchanged; output sha256 8f92dd3809e03132…, 680 177 bytes, 4 560 lines, byte-identical to
#   the builder's expected volume; tables, ids, refs and doc checks below: done
# - P4 result saved to docs/validation/coherence/results/coherence_repair-V06-r3.json; LANDED logged: done
#
# ISSUES → WHERE FIXED (18 routed ids: 17 FIXED in text, 1 MERGED; none INVALID; nothing parked)
#  VAP-r2-04 (minor per R3-03 (a); R3-26)  T-V6-73's head "takes T114-1 – T114-5, T114-8 and T114-10's epoch clause"; its
#        welded-stretch clause ends "(V06 §3.7.7; T114-10's epoch clause)"; V06 §7's lead lists T114-10's epoch clause; the
#        take-over row reads "T114-1 – T114-5, T114-8, T114-10's epoch clause (item 114 (g)) | T-V6-73 | … the welded
#        stretch over 10 epochs; the `item114.condition` pin".
#  VAT2-r2-02 (FIX amended, R3-17)  V06 §3.3.1 reads "(at §4.11 *The clock* (4)'s cadence; a catch-up … folds coarser, V06
#        §6.8 (6), a calamity then riding the coarse epoch that holds its week)" — no trigger list restated (the
#        verifier's list is not written, per R3-17).
#  VAT2-r2-04 (R3-18)  V06 §2's lead: "a replayed past lies between the creation week and the present"; V06 §3.20.3: `W_p`
#        the present at creation (the dossier's present week, a standalone document's week 0), the `generate` event at
#        `W_p − round(52 × start.yearsAgo)` the document's creation week (`HistoryIndex.creationWeek`), read by the first
#        replay epoch's `prevWeek` and `years`. Same class, own unit: V06 §3.10's two uses read "the plan's creation week".
#  VAT2-r2-05 (R3-06 (b))  V06 §3.23 (4): a building the replay abandons or ruins has its run in the creation prefix from
#        the week (1) gives its change in that replay epoch, so every scrubbed week shows its replayed years; §3.21's decay
#        row ("one the replay ruined | its replayed years") and *ruined plans × the history* row; T-V6-76 (d).
#  VAT2-r2-06 (R3-06 (c), R3-18)  V06 §3.23 (4): a building generated abandoned, decayed or ruined (no event took it there
#        from a standing state) reads a run begun `D` years before the week it is first met so — `A` = that week − 52 × `D`,
#        the creation week for one generated so — aging from then; E2's default-age reading kept (R3-06 (d)); §3.21's decay
#        row and T-V6-76 (d): "read after 50 years of epochs, `D` + 50 years, non-decreasing".
#  VAT2-r2-08  `EpochRecord.week` → `EpochRecord.inputs.week` at V06 §3.7.7 (3), §3.21's recovery × replay row, T-V6-73.
#  VAT2-r2-09 (graded major; R3-10)  `crisisLookYields(…, overlay: Id | null /* … null: a preview */, …)`; V06 §3.22 (3):
#        a preview never hands over (false for `null`), its ruin over every building of its units whatever their Works,
#        ending with the preview; §3.22 (4)'s edge list; §2.12's row; §3.21's hand-over row; T-V6-75 (d).
#  VDC2-14 (R3-22 (b))  §1b's dossier trace: "| the site latitude | `site.culture` through `tables/dossier/cultures`, else
#        50° N — `Intent.latitudeDeg`, a map fact the user may edit (item 125 (b)) | DR29 |", the reader cell unchanged.
#  VEL2-r2-01 (R3-19; texts 1–6)  V06 §3.5.1's lead and (1) (the pass-over; the dossier fall taking locks last, orphaned,
#        T20-16; any other fall met short, `households.heldByLock`), (4), (5); `EpochReport.households.heldByLock` (§2.10);
#        §3.21's decline and *history × locks* rows; T-V6-70 (f)'s H-DOSSIER and H-100 fixtures; V06 §4.3's protection
#        sentence names the locked household and "no other fall does either" (same rule, own unit). Text 2: see JUDGMENTS (1).
#  VPC-R2-07 — MERGED into VEL2-r2-01 (Part H): closed; its "down to one, or to 0 under a dossier fall" lives in (4).
#  VV56-r2-06 (BLOCKER kept; R3-08 (b))  `decayPeak(doc, lineage, week, since)`, read per element: the highest level since
#        the element entered the plan (the as-built plan's at the build; a re-cut's, a restoring event's included, or an
#        `extend`'s at that change's effective week), so an added element is never drawn repaired and a kept one keeps its
#        peak (V06 §3.23 (3)); §1b W94 and §2.12 name the entry week; §6.9's cost per entry week; §3.21's decay row and
#        *ruined plans* row; T-V6-76 (b) "a `reoccupy` from derelict with a re-cut, and an `extend` after a repair: 0 added
#        elements drawn repaired"; J-V6.139.
#  VV56-r2-01 (R3-08 (a), J122)  V06 §3.23 (3)'s head "Restoration (item 123 (b)'s "reused" — the building put back to use, a
#        `reoccupy` from vacant or derelict, V06 §3.8.2 — and a repair; J-V6.141)"; §2.8's `reused` state holds no plan,
#        level and peak 0; new J-V6.141 records the reading (vetoable); T-V6-76 (b) names the restorations.
#  VV56-r2-04  V06 §6.8 (1): `+ a × N`, a catch-up's dossier events at V08 §6's per-event absorb bound (30 ms TOWN and CITY,
#        45 ms METROPOLIS); (3); (6): the catch-up's budget — `advance.budgetMs` on an open map, less the open's own path
#        (V08 §6's cached boot 400 ms, §12.5's T(B) 246 / 589 / 2 290 ms) inside an open from SettlementForge (≈ 5.3 s ≤
#        6 310 ms at the cap) — and, where even one epoch with its events passes it, that one epoch folded, the wait past
#        the comfort level reported F-BUDGET-TIME (never coarser or shortened, §12.1); T-V6-24's catch-up fixtures state
#        their event counts (200, 1 000, 20) and bar both branches; §3.21's row; J-V6.136; W91; §1.1 (14); §12's PLAUSIBLE (1).
#        The V08 "pre-decided change" clause: see JUDGMENTS (3).
#  VV56-r2-05 (R3-06 (a))  V06 §3.23 (1): the run starts at the week its change shows — the start week of the Works the event
#        started (a hazard's at its week, a `vacate`'s `decay` Works at its drawn offset; read from `Building.works`, then
#        the lifecycle's weeks, §4.11 *Works* (9)), else the effective week; the state by the last event dated so; W94's and
#        §2.12's inputs; §3.21's decay row; T-V6-76 (c). See JUDGMENTS (2) for T123-5's citation.
#  VV56-r2-09  V06 §6.8's lead carries the catch-up as the third ("this is how the three stay inside the ten seconds …, a
#        catch-up whose dossier events alone pass its budget excepted ((6))").
#  VV56-r2-10 (graded major; R3-14 (7))  V06 §3.22 (2) c.: the stage's land and, with a rich part, the rich ribbon's plots;
#        the ribbon's alone where (b) leaves no rest; a part-seated stage adds (d)'s belt; d.: below the quantum with a rich
#        part, the belt and the ribbon's plots; §3.21's frontier row and T-V6-75 (c) carry every case.
#  VV78-r2-07 (graded major; R3-14 (5))  V06 §3.22 (2) d.: "(at a village rung, the entry of V07 §5.6 (2)'s main approach
#        road)"; §3.21's frontier row and T-V6-75 (c) read the same (no "through road's entry" left).
#  VV1112-r2-15 (R3-08 (d))  V06 §3.23 (2): a kind's range lies "inside the shares of the states whose looks item 123 (c)
#        gives it (V11 §3.25.10's `states`; the upper floor's across `decayed` and `ruined`)".
#
# END LINES WRITTEN (Part H · V06, all six)
#  VEW-r2-01 (model; R3-25 (c))  V06 §3.7.1's widening excepts a crossed raised way's supports within one strip width of the
#        crossing (§2.7's support step (6) re-sites them); §3.7.6 (5)'s footprint bullet cites that exception; its crossing
#        bullet is the one crossing station (support step (3), (6)); its continuity bullet "where §2.7's support step (6)
#        cannot keep each span within `maxClearSpanM` and each pier within `maxPierM`" (the "(6)" named as §2.7's, so it
#        cannot be read as V06 §3.7.6 (6)); T-V6-47's clause and its bar "0 supports in the strip".
#  VM-R2T-03 (model; R3-25 (d))  V06 §3.7.7 (2): the breaches pass over a stretch under a crossing station while its deck
#        stands (§2.7's support step (3)), as §3.7.6 (5)'s dismantling does — filtered before the draw, so streams keep
#        their positions; it may still wear, and a repair writes it as any run (VM-R2T-03's base text).
#  VEW-r2-03 (pipeline; R3-14 (6))  V06 §3.22 (2) d.: with no arterial leaving (S3 (9) (a)'s unserved mesa), the belt's
#        faces nearest the boundary point closest to the growth centre (S3's root reservation, §4.2); §3.21; T-V6-75 (c).
#  VEL2-r2-03 (V09)  V06 §3.20.4's *Cancel*: "cancelling a standalone history-first generation leaves no document; …"
#        and "A host creation offers no cancel; its replay is coarsened to fit the comfort level (V06 §6.8; V09 §4.21.9)";
#        the same rule at §6.8 (5) and §3.21's replay row (own unit).
#  R3-04 (adjudicator)  V06 §3.23's lead: "while the building's decay level is above 0 and at least its keyed threshold
#        (§6.3 *Plan damage*'s comparison; …)".
#  VPC-R2-03 (V08; R3-09 (e))  T-V6-75's fixture: "a fire calamity over its quarter with its linked `reconstruction`
#        condition (V08 §3.16 (7) (b), (d))"; §1b's dossier-trace conditions row likewise names the condition drawing the
#        `disaster` look as a calamity's linked condition (no `disaster` condition exists; own unit, same class).
#
# JUDGMENTS (each within a ruling; vetoable by the adjudicator)
#  (1) VEL2-r2-01 text 2 ("under any other fall it stays …, the building keeping at least one household") is written so the
#      protected building's LAST household stays under any other fall, an earlier one still leaving by a `relet` down, and
#      the stayer is passed over as (1) passes a lock (the next household of the suffix that is neither locked, pinned nor
#      such a last household leaving instead, else the fall met short, `households.heldByLock`). Read literally ("it
#      stays" for every household) the text would contradict texts 4–6 of the same issue (the comment's "a protected
#      dwelling's last household kept"; §3.21's "the dwelling kept at one household or more"; T-V6-70 (f)'s "each held and
#      the next unlocked households leave in their place … no `relet` taking the protected dwelling below one household")
#      and the merged VPC-R2-07 ("down to one"); R3-19 forbids a standalone fall only to reach a locked household or to
#      EMPTY a locked dwelling. The `heldByLock` comment adds "that no other household could replace — the fall's
#      shortfall", as texts 1 and 6 count it.
#  (2) VV56-r2-05's "(T123-5)" in T-V6-76 (c) is written "(item 123 (d); the agreement V02's T-V2-59 bars for T123-5)":
#      §13.2's take-over table gives T123-5 to V02's T-V2-59; a V06 clause naming T123-5 as its bar would, under R3-26,
#      need T-V6-76's head and both take-over tables to list it. V06 §3.23 (1) cites "(item 123 (d); §13.2's T123-5)".
#  (3) VV56-r2-04's "the events' cost being the trigger of V08's pre-decided change under R12-31 (hand-off: V08 §6's
#      absorb-with-epochs row names that change)": Part H's V08 END line asks V08 only to cite V06 §6.8 (1) and (6), so V06
#      states §12.10's R12-31 as written — the miss charged to its owning path, the per-event absorb of V08 §6's rows —
#      and names no change V08 does not define (HAND-OFF (c)). The bar of T-V6-24 says the same.
#  (4) VV56-r2-06's "0 added elements in `repaired`" is written "0 added elements drawn repaired, every kept element keeping
#      its peak" (no set named `repaired` exists in V06).
#  (5) R3-06 (a) and (b) together: a replay ruin's run starts at the week (1) gives its change in that replay epoch — the
#      epoch's week where the epoch runs at model level and starts no Works (V06 §3.20.4) — so (b)'s "from that replay
#      epoch's week" and (a)'s Works start week are one rule.
#
# HAND-OFFS (for round 4's verifiers)
#  Ends Part H assigns to other seats this round, which V06's text now presumes: model §2.7's support step (6) and (3)'s
#  band held under a standing deck (VEW-r2-01, VM-R2T-03); model §2.6 step 7 (R3-06's binding text); pipeline §4.11 *The
#  clock* (1)'s creation week and (4)'s calamity week (VAT2-r2-03, VAT2-r2-01), §10.2 (d)'s unserved mesa (VEW-r2-03);
#  scope's T123-4 reading, T110-2's crossing fixtures and the item-114 group's crossing-station fixture; V02 §5.7 (1)–(2)
#  and V03 §5.6 (2) (b), (4) (the preview, the entry week); rendering §8.6's per-element peak; V08 §6's absorb-with-epochs
#  row citing V06 §6.8 (1), (6); V11 §3.25.10's `settings` row; V09 §4.21.9 (no Stop in host mode); V07's desertion
#  (VAT2-r2-07).
#  Further ends no line names (R3-01 (3); each V06 side written):
#  (a) V04 §5.6 (3) "at or below `decayPeak` (V06 §3.23 (3))" — reads the element's own peak, its entry week passed
#      through V03 §5.6 (2) (b) (V04's elements below ground are V03's plan parts).
#  (b) V02's X36 row ("`decayLevel` and `decayPeak` per lineage at a week") — `decayPeak` now per element, with `since`.
#  (c) V08 §6's absorb rows — under §12.10's R12-31 they own a catch-up's per-event absorb when its events alone pass the
#      comfort level; their basis-and-fallback cell may state the change (VV56-r2-04's original hand-off).
#  (d) V10's `info.damage.patched` row ("at or below `decayPeak` since a restoration began") — the per-element peak.
#
# CHECKS (on the expected volume, scratch)
#  - apply-blocks dry run as in P3.
#  - tables: every row of the volume its header's cell count (one pre-existing row in §2.12 carries an escaped `\|`, not a
#    defect); §3.21's reworked rows checked edge for outcome (frontier 13 = 13, decay 17 = 17, decline 8 = 8).
#  - ids: J-V6.141 new and unique in the set; no duplicate T-V6 or J-V6 row; no T-V6 id added or removed.
#  - no review id (R2-nn, R3-nn, a verifier issue id) in any added line; R12-31 is §12.10's register row.
#  - refs.py (assemble-r2's) on a mirror with the expected V06: V06 resolved 3 485 → 3 569, ambiguous 3 → 3, external
#    8 → 8, 0 BROKEN; every other unit unchanged.
#  - doc_checks.py --doc V06 --heads base, live → expected: C1 0 → 0, C2 0 → 0, C4 0 → 0, S1 0 → 0, S2 unreviewed 16 → 16;
#    C3 282 → 289 hits (the 7 new: runs of section numbers and ordinary words — "3 5 1 1 4 5 and", "down to 0 at its";
#    no identifier, palette, grammar or word list). WARNING recorded: reference corpus INCOMPLETE (captures,
#    research/patreon, research/devlogs, research/ftg-docs, research/external absent) — the clean-room result is NOT
#    authoritative, provisional until re-run on the machine that holds the corpus.
# SIZE: V06 108 668 → 111 109 words (+2 441, +2.2 %). Every added word is design the rulings require (the lock and
#   shortfall rules, the per-element peak, the aging default age and replayed years, the catch-up's budget and its
#   over-budget branch, the preview, the frontier's cases, their §3.21 rows, fixtures and J-V6.141); removed: §3.3.1's
#   restated cadence triggers (RESTATEMENT, −8 words; the paragraph +3 net with R3-17's calamity clause). No narration added. A repair that adds required content is not
#   held to the shrink band.
