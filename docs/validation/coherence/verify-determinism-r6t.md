# verify-determinism-r6t — lane coherence/verify-determinism-r6t (base §5 failure handling, §6 determinism, §7 editing; after repair round 6)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/verify-determinism-r6t; covered by the whole-design retrovalidation (J84).

PROGRESS (2026-10-01)
- P0 brief read whole (ground text, lane, ROUND-6 NOTES, NEW OWNER RULES 114–119, ORCHESTRATION NOTES); round-5 findings (verify-determinism-r5t, results/coherence_verify-determinism-r5t.json: VDC5-01..05); adjudication-r6 read (How to read, Summary, TOC, Part A, R6-01, R6-02 whole with both tables, the attack, the equivalence and every unit's Ends, R6-03 whole, R6-08, Part H · determinism and the VDC5 rows of scope, V06, V09, Part P, Part I); round6-work/determinism.json; repair-r6-determinism (header, dispositions, sweep, hand-offs, checks): done
- P1 live base f39f1c30… = assemble-r6's output (pre-round base 2d84eac2… = commit 52a16b0); §5–§7 diffed subsection by subsection: 6 changed (§5.3, §5.4, §7.1, §7.3, §7.4, §7.7; 14 hunks = the claimed edits), 13 byte-identical: done
- P2 round-5 findings re-checked at both ends (5/5 closed): done
- P3 every round-6 hunk in scope read with its target; R6-02 (b) (i)–(iii) and R6-03 (c) checks; new-problem scan: done (2 new issues)
- P4 references, ids, words, doc_checks; report; result; LANDED: done

## 1. Inputs and method

* **Live text.** `docs/ARCHITECTURE.md` sha256 `f39f1c30126976c0…` — assemble-r6's recorded output (assemble-r6.md, its file table). The
  pre-round base is `2d84eac2d8a379d1…` (commit `52a16b0`, assemble-r5 landed); §5–§7 of both were cut at `## §5 ` / `## §8 ` and
  compared subsection by subsection, then line by line.
* **Rulings binding this re-check.** adjudication-r6.md: R6-01 (both ends, the four blind spots, supersessions, J141 grades), R6-02
  (the crossing table and the way-and-channel table at §2.7's support step (6), with Part P's amendments read as binding), R6-03 (the
  late calamity left uncarried; `DossierBinding.lateCalamities` removed), R6-08 (item 125's two base summaries); Part H · determinism
  (VAH-r5-01 FIX; VDC5-01 FIX per R6-02 (D8); VDC5-03 FIX per R6-02, amended (D2); VEL5-r5-04 FIX per R6-02 (D5), (D7), (D8)) and its
  three END lines; R6-02's behaviour-change list is the owner's to veto and is not itself a finding (round-6 note (6) (d)).
* **Round-5 findings** (mine): VDC5-01 (major, determinism), VDC5-02 (major, scope), VDC5-03 (major, determinism), VDC5-04 (major,
  V06), VDC5-05 (minor, V09).
* Ids outside the round-5 findings and the round-6 hunks keep their earlier verdict (round-6 note (2)).

## 2. What round 6 changed in §5–§7 (P1)

| subsection | words r5 → r6 | state |
|---|---|---|
| §5 lead, §5.1, §5.2 | 116, 1 638, 4 395 | byte-identical |
| §5.3 The invariant suite | 4 217 → 4 220 | 3 hunks: the way-and-trace row (D1); the footprints row's new parenthesis (the seat's sweep); the gate row's two parentheses (D2) |
| §5.4 The generation report | 1 333 → 1 357 | 1 hunk: the `warnings` comment's `W_RAISED_CROSSING` count (D3) |
| §6 lead, §6.1–§6.5 | 187, 5 237, 2 726, 4 830, 1 066, 2 104 | byte-identical |
| §7 lead | 202 | byte-identical |
| §7.1 | 13 266 → 13 277 | 6 hunks: `dossierFacts` loses `lateCalamities` (R6-03); *Raised ways* (D4) with its paragraph re-wrapped; the lock row (D5); `bend.wall.held` deleted (D6); `bend.wall.raisedCrossing` (D7); `bend.raised.underSpan` (D8, VDC5-01, VEL5-r5-04 (2)); the catch-all (D9); the sugar paragraph (the seat's sweep) |
| §7.2 | 1 177 | byte-identical |
| §7.3 | 7 543 → 7 541 | 1 hunk: the S7 row (D10) |
| §7.4 | 10 644 → 10 632 | 1 hunk: the `dossierFacts / dossierRecord` row (R6-03) |
| §7.5, §7.6 | 2 205, 2 478 | byte-identical |
| §7.7 | 14 776 → 14 776 | 2 hunks: `DossierBinding.lateCalamities` deleted (R6-03); item 10's index clause (VAH-r5-01, R6-08) |
| §7.8 | 1 289 | byte-identical |

The 14 hunks are exactly the edits repair-r6-determinism claims (its CHECKS: l. 9244, 9247, 9257, 9289, 10357, 10443–10460,
10587, 10630–10633, 10708–10719, 10883, 11228, 11825, 12068–12069 of the pre-round base). No other unit's block lands in §5–§7.

## 3. Round-5 findings re-checked at both ends (P2)

| id | disposition (adjudication-r6 Part H) | live text | verdict |
|---|---|---|---|
| VDC5-01 (major) | FIX per R6-02 (D8); V09 ends (V9-5) and §4.9's source cell | §7.1 l. 10675: the cause now splits a ground `drawWay` or moved way (§4.3's crossing rule; way-and-channel row (b), with the trace-crossing-inside-the-strip case row (b)'s gates cell gives the key) from a hand carve (its channel's crossing meeting a support, ramp, stair, foot or `vault` span's strip; row (e)); outcome "the way moved … — its crossing of a trace to the nearest clear of the under-deck strip —, the channel to the nearest crossing that meets none of these"; "locked, pinned or neither" in the cause. V09 §4.20.2 (4) (l. 3014–3025) in (V9-5)'s words; V09 §4.9's `bend.raised.underSpan` source cell (l. 2104) carries §7.1's new cause and outcome, the gate case included (repair-r6-determinism's hand-off taken) | **FIXED** at both ends |
| VDC5-02 (major) | FIX per R6-02 (S1) (5) (scope), VCS-r5-03 merged; V09 end (V9-6) | §13.2 T110-2 (5) (base l. 18583–18597): "a hand carve of a canal across a standing viaduct whose drawn crossing meets a support and one wider than the clear width between every two of its supports, each hand case run again with the raised way locked and with it pinned … the first carve moved along the deck … (`bend.raised.underSpan`), the second stopped at the under-deck strip's edges, both ends against the ground as against a berm (`bend.raised.around`)"; V09 T-V9-52 (l. 4411) carries the carve clause | **FIXED** at both ends |
| VDC5-03 (major) | FIX per R6-02, amended (D2): no raised gate exists | §5.3 l. 9300: both parentheses "(on ground part 0; a deck passing over a trace is no crossing, §2.7's crossing table)"; §4.8 *Gates* (l. 7729–7731, pipeline's (P8)) agrees ("Main gates are where S4's and S5b's arterials cross the trace on ground part 0 — a deck passing over a trace is no crossing"; "A raised way and a trace meet by §2.7's crossing table: no station, gate or opening on a deck"); an elevated road across a standing ring is *down before the wall* (not built), so the round-5 case cannot arise | **FIXED** (as ruled) |
| VDC5-04 (major) | FIX per R6-02: the case is removed (no raised gate); (V6-7), (V6-8), (V6-10), (V6-21) | V06 §3.7.2 (1) (l. 1480–1482) opens every gate as it stands — every gate on ground part 0 and none in an under-deck strip (W6·C2); §3.7.2 (2)–(3) and §3.7.6 (5) (l. 1594–1609) carry no held stretch; T-V6-47's bar "0 gates or towers in an under-deck strip" (l. 4170) runs it; the model and determinism ends are superseded ((M2), (D6): `bend.wall.held` gone from §7.1 and V09 §4.9). A whole-set search finds no "raised gate", "crossing station" (but T-V6-47's ruled bar "0 crossing stations"), "wall opening" or "held stretch" in design text | **CLOSED** by the ruling |
| VDC5-05 (minor) | FIX (R6-11) | V09 §4.9 `bend.raised.around` (l. 2105): the channel form "{name} cannot pass beneath {way} here, so it stops short of it on both sides." beside the way's, and the source cell adds the hand carve's channel no crossing passes (§7.1's `bend.raised.underSpan` row; row (e)) | **FIXED** |

**Determinism's three END lines** (Part H) all landed: (D1), (D3), (D4), (D6), (D9) — §5.3's way-and-trace row, §5.4's comment, §7.1's
*Raised ways* (written "clear of that wall's towers and gates": a clean-room 3-gram fix, meaning unchanged), the deleted
`bend.wall.held` row, the catch-all; (D10) — §7.3's S7 row; R6-03's determinism text — §7.7's `lateCalamities` line and §7.1's
member deleted, §7.4's row as ruled. (D2), (D5), (D7) and (D8) match the ruled words (D7 verbatim, Part P's PRB6-02, -03, -08 amendments
included). §7.4's raised-way row stands, as R6-02 rules. **VAH-r5-01** (§7.7 item 10, l. 12111–12114) is written as R6-08 rules, and its
sibling §14 `field_fallback` comment (l. 19810, VAH-r5-02, scope) says the same: a row's own path takes its fallback with the carried
fact standing, a record's absent or unreadable sub-field is read by its row and compared. **VEL5-r5-04**: (1) the lock row's
parenthesis, (2) "locked, pinned or neither" at both bend rows, (3) T110-2 (4)–(5)'s locked and pinned runs — all present.

## 4. The round-6 hunks read with their targets (P3)

| hunk | target read | result |
|---|---|---|
| §5.3 way-and-trace row (D1) | §2.7 (6) (d) the crossing table, *beneath* "Where the line crosses" (l. 2615–2631); §4.8 *Gates* | agrees: a deck is no crossing of the row; a road deck's carried way crosses beyond the foot on ground part 0 at a gate |
| §5.3 footprints row's parenthesis | §2.7 (3)'s obstacles ((M1): a support may stand in a standing wall's setback, glacis or berm), *beneath* (a road deck's support built into a later band) | needed and correct: without it a builder whose footprint index holds the piers ("footprints on ground part 0") aborts a lawful batch; the parenthesis cites the homes, restates no rule |
| §5.3 gate row (D2) | §4.8 *Gates*; way-and-channel row (d); *beneath*'s "No gate and no tower in the under-deck strip"; S5a *Trace* (2) (P12: a gate pinned beyond a foot) | agrees; tested by T110-2 (2) and (3) ("the stage's `N_k` gates on ground part 0") |
| §5.4 `warnings` comment (D3) | the crossing table's report sentence (l. 2655–2659) and W1's last column; row (e); §4.4 S5a *Outer moats* (l. 5989); §4.8's lead (l. 7692); §4.2 S3 (10) | ruled words, but the producers disagree with the list — **VDC6-02** |
| §7.1 `dossierFacts` member | V08 §3.6 (4) (l. 1905: `dossierFacts { changes, quarantined, notes, notesCleared }`); §7.7 `DossierBinding` | agrees |
| §7.1 *Raised ways* (D4) | *over the band*; *down before the wall* (by hand §7.1, `bend.raised.wall`) | agrees |
| §7.1 lock row (D5) | the way-and-channel table's lead ("A lock or pin on the raised way never refuses any row"); C8; W7·C8, W13·C8 ("no `refuse.locked`"); attack 8; §7.2 *Protection* and *Drawn constraints* ("locked by default"); §7.4's raised-way row | the exemption covers work passing *beneath* a locked raised way; the reverse meeting R6-02 creates — an aqueduct passing *over* a locked wall, which writes nothing of the wall — still falls under the row's refusal — **VDC6-01** |
| §7.1 `bend.wall.raisedCrossing` (D7) | W2, W13, *beneath* (local bend, gate moved, vault removed) | verbatim the ruled text; tested T110-2 (4), T-V9-52, T-V4-63 |
| §7.1 `bend.raised.underSpan` (D8) | way-and-channel rows (b) (gates cell: a trace crossing inside the strip moved clear, `bend.raised.underSpan`, else `bend.raised.around`) and (e) | agrees; the seat's addition of row (b)'s gate case is row (b)'s own key (R6-01 (2)); tested T110-2 (5) ("a hand road drawn across one where a wall runs beneath it … at a gate"), T-V9-52 |
| §7.1 catch-all (D9), sugar paragraph | *over the band* | agree |
| §7.3 S7 row (D10) | *beneath*; W2·C2, W7, W11 (V04's reconcile removing / laying again the arch vault); V04 §3.5.4 (d) (exists, V04 l. 1689) | agrees |
| §7.4 `dossierFacts / dossierRecord` row | R6-03's determinism End | verbatim |
| §7.7 `DossierBinding` | R6-03 | `lateCalamities` gone; the block reads whole (`quarantined`, `notes` rebuilt by fold) |
| §7.7 item 10 | R6-08; V08 §3.5; §14's `field_fallback` | verbatim; agrees |

**R6-02 checks (round-6 note (6) (b)).** (i) Each cell §5–§7 reads gives one outcome and names a test that runs it — W1·C1/C11 (T110-2
(1), (2)), W1·C2 (T110-2 (3); but its report count, VDC6-02), W2·C2–C13 (T110-2 (4), (7), T-V9-52, T-V4-63), W7·C8 (T110-2 (8)), W13
(T110-2 (4)), rows (b) and (e) (T110-2 (5) locked and pinned; T-V9-52). (ii) No site in §5–§7 restates the tables in its own words
beyond the ruled texts (D1)–(D10), and none keeps a crossing station, raised gate, wall opening or held stretch (searched: "crossing
station", "raised gate", "wall opening", "held stretch", "gate tower", "arch in the curtain", "abutting", "taken into the line", "strips
stopped", "topped at", "free-standing", "support step (6) (a)/(b)/(d)": none). (iii) Every citation names an outcome or row that
exists: *over the band* (l. 2596), *down before the wall* (l. 2606), *beneath* (l. 2615), *unchanged meeting* (l. 2660), row W13
(l. 2710), rows (b) and (e) (l. 2583, 2586).

**R6-03 check (round-6 note (6) (c)).** No held-calamity clause stands in §5–§7 or anywhere in the base and volumes (searched
"lateCalamities", "held late", "calamity held", "held in the binding", "held for the first epoch", "held list"); §7.7 item 6's late
element change ("never at a week before it") and item 2's "present week the dossier's latest stamped tick" agree with R6-03's steps
2 and 7 (the dossier's own week, not the document's current week).

**Owner rules.** Item 126 (a2): 0 phone clauses in §5–§7. No deferral wording, review id or narration in the hunks (searched TBD,
"later round", "round N", R-/VD-/PRB ids). g items 114–126: the determinism parts recorded present in rounds 1–5 are untouched.

## 5. Issues

### VDC6-01 — major — CONFLICT — owner determinism

**Claim.** §7.1's lock row (l. 10631) refuses `refuse.locked` "a map event … [that] crosses, targets or moves a locked or pinned entity — a
drawn way across a locked entity", and round 6's (D5) parenthesis exempts only work passing **beneath** a held raised way: "never a ground
way, a carve or a wall stretch passing beneath a locked or pinned raised way's deck, which changes none of its parts". R6-02 made the
reverse meeting write nothing as well: an aqueduct drawn across a standing wall crosses it on a span over its band, "nothing of the wall
is written" (§2.7's crossing table, *over the band*, l. 2603), and by hand "its dry run bends the course … (`bend.wall.aqueductArch`)"
(l. 2691–2692); §7.1's *Raised ways* (l. 10485–10487) and catch-all (l. 10676) bend it too. Before round 6 the aqueduct added "an arch to
the curtain's run" (§7.3's old S7 row), so a refusal on a locked wall had a reason; now it has none, yet the row's words still refuse it,
and its new exemption, by naming only the beneath direction, invites that reading. The case is common: every drawn wall is "locked by
default" (§7.2 *Drawn constraints*, l. 10820; "a drawn feature is locked besides", l. 10812). A user who draws a wall with T3 and then an
aqueduct across it with T4 gets `refuse.locked` from one builder and `bend.wall.aqueductArch` from another. The crossing table has no
column for a locked wall (C8 is the raised way held), and T110-2 (1)'s hand aqueduct crosses a generated, unlocked ring, so no bar
decides it. The same literal reading refuses a raised deck drawn over a locked ground way, which §7.4's raised-way row (l. 11447)
allows ("a raised way over a locked way keeps its span `open`").

**Required change.** §7.1's lock row, cause: "— a drawn way across a locked entity (never a ground way, a carve or a wall stretch passing
beneath a locked or pinned raised way's deck, which changes none of its parts: §2.7's crossing and way-and-channel tables, bent by the rows
below as beneath an unlocked one)," → "— a drawn way across a locked entity (never a ground way, a carve or a wall stretch passing beneath a
locked or pinned raised way's deck, nor a raised way's deck passing over a locked or pinned ground way or an aqueduct's span passing over a
locked or pinned wall's band, none of which changes any part of what it passes: §2.7's crossing and way-and-channel tables, *over the
band*; §7.4's raised-way row — each bent by the rows below as with an unlocked one),". Second end, scope, §13.2 T110-2 (1): after "and a
hand aqueduct drawn across a standing wall, its course bent clear of a tower, with `bend.wall.aqueductArch`" add "— and the same across a
wall drawn by hand (locked by its drawing, §7.2) and across one the user locked, no `refuse.locked`, nothing of the wall written".

### VDC6-02 — minor — WIRING — owner determinism

**Claim.** §5.4's `warnings` comment (l. 9332, round 6's (D3)) lists "S5a's and S7's `W_RAISED_CROSSING` (one per crossing of a trace laid
after a raised way with its deck line and per channel stopped at its under-deck strip …)" without saying which stage counts which, and the
producers' texts do not settle it. (a) §4.8's lead (l. 7692) has S7 report "each crossing of a trace laid after it with its deck line",
while §4.4 S5a *Outer moats* (l. 5989) reads "the trace meeting it by §2.7's crossing table (*beneath*) and the channel by its
way-and-channel table (row e), reported (`W_RAISED_CROSSING`)". A builder following both counts a stage-2 trace's crossing twice, against
the crossing table's "once per crossing" (l. 2655–2659). (b) The way-and-channel table's row (e) (l. 2586) also reports a stopped
"moat (S3 (10)'s …)" or canal, which meets a raised way at a regeneration under a held one (W3; T110-2 (6)'s New random on the moated c15
fixture). §4.2 S3 (10) carves it with no raised-way text, and §5.4 names no S3 count. repair-r6-determinism filed this as a hand-off,
and it has not landed. (c) No bar reads the generation count of trace crossings: T110-2 (3) names `W_RAISED_CROSSING` only for the
stopped channel, while T-V6-47 counts the epoch's crossings. What is built and its geometry do not change; only the report's bookkeeping
does.

**Required change.** §5.4's `warnings` comment: "S5a's and S7's `W_RAISED_CROSSING` (one per crossing of a trace laid after a raised way
with its deck line and per channel stopped at its under-deck strip: §2.7's crossing and way-and-channel tables; §4.4 *Outer moats*; §4.8)"
→ "`W_RAISED_CROSSING` — S7's one per crossing of a trace laid after a raised way with its deck line, S3's and S5a's traces alike
(§2.7's crossing table, *beneath*; §4.8), and S3's and S5a's one per moat or canal they carve stopped at its under-deck strip (§2.7's
way-and-channel table, row (e); §4.2 S3 (10); §4.4 *Outer moats*)". Second end, pipeline: §4.4 S5a *Outer moats*: "the trace meeting it by
§2.7's crossing table (*beneath*) and the channel by its way-and-channel table (row e), reported (`W_RAISED_CROSSING`)" → "the trace
meeting it by §2.7's crossing table (*beneath*; its crossings S7's to count, §4.8) and the channel by its way-and-channel table (row e), a
channel stopped there counted in S5a's `W_RAISED_CROSSING`"; §4.2 S3 (10): after "Every deck has S1 (5)'s form and its two states." add
"A raised way standing when this step carves — at a regeneration, one held (§2.7's support step (6)) — meets the moat and the canals by
§2.7's way-and-channel table (row (e)), each channel stopped at its under-deck strip counted in S3's `W_RAISED_CROSSING`." Third end,
scope, §13.2 T110-2 (3): after "else stopped at the strip's edges (`W_RAISED_CROSSING`)" add ", each crossing of the ring's trace with the
viaduct's deck line counted once in S7's `W_RAISED_CROSSING` and each stopped channel once in S5a's".

## 6. Inventory, references, ids, size, checks (P4)

* **Inventory ids the round touched** (inventory-determinism.json): DETERMINISM-0094 (§5.3 gate row: CHANGED by ruling R6-02 (D2), as
  ruled), DETERMINISM-0084 (§5.3 footprints row: a precision parenthesis following R6-02's (M1) and *beneath*; meaning kept for every
  footprint the row checks), DETERMINISM-0111 (§5.4 report: (D3) as ruled), DETERMINISM-0379 (§7.3 S7 row: the aqueduct's curtain
  arch deleted by (D10), as ruled); the deleted `bend.wall.held` row and `lateCalamities` field, member and row clause were round-5
  additions superseded by name (R6-01 (5)), so no archived item is LOST. §5.2's F-EDIT row (DETERMINISM-0051) cites §7.1's table and
  restates no cause, so the lock row's change needs nothing there.
* **References.** Every citation in the 14 hunks resolves (§2.7's tables and their outcomes and rows; §4.4 *Outer moats*; §4.8; V04
  §3.5.4 (d); V08 §3.5). assemble-r6 records 0 broken references across the set.
* **Ids.** No test or decision id is added, renumbered or removed in §5–§7 this round.
* **Words** (principle (9)). §5–§7: 81 429 → 81 453 (+24, +0.03 %); the archive's §5–§7 (docs/archive/ARCHITECTURE-pre-coherence-2026-09-28.md)
  has 63 117, so the unit stands at +29.1 % against it. The growth is file g items 102–126 applied as new design at build depth, and
  the ruled texts of repair rounds 1–6. This round's additions are rulings' texts and three sweep conformances; its removals are ruled
  removals. No subsection shrank, so there is no nuance audit by shrink.
* **doc_checks.py --sections 5,6,7** (live): C1 5/0, C2 1/0, C3 269/0, C4 0/0, S1 0/0, S2 298/0, exit 0 — **PROVISIONAL**: "reference
  corpus INCOMPLETE (missing: captures, research/patreon, research/devlogs, research/ftg-docs, research/external) - clean-room results
  are NOT authoritative".
* Design files untouched by this seat.

## 7. Summary

Round 6 left 13 of §5–§7's 19 subsections byte-identical and changed six in 14 hunks, each a ruled text or a sweep conformance.
All five round-5 findings are closed at both ends: VDC5-01, -02 and -05 are fixed, VDC5-03 is fixed as R6-02 amends it, and VDC5-04 is
closed because R6-02 removes the raised gate. All of determinism's END lines landed. No held late calamity, crossing station, raised
gate, wall opening or held stretch survives in §5–§7. **2 issues: 0 blocker, 1 major, 1 minor.** VDC6-01 (major, determinism): the lock
row refuses an aqueduct drawn over a locked wall, while the crossing table bends it and writes nothing of the wall; every drawn wall is
locked by default. VDC6-02 (minor, determinism, with pipeline and scope ends): which stage counts `W_RAISED_CROSSING` is unsettled — a
trace crossing could be counted twice, S3 has no count, and no generation bar reads the count.
