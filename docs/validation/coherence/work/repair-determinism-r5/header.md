# repair-r5-determinism — lane coherence/repair-determinism-r5 (unit determinism: base §5, §6, §7)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-determinism-r5; covered by the whole-design retrovalidation (J84).

# Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): text before the first block header
# is ignored. Base: docs/ARCHITECTURE.md sha256 5f34cceb61432ac4… (assemble-r4's output, the live file). Each REPLACE body
# is the live subsection with count-asserted substitutions (generator docs/validation/coherence/work/repair-determinism-r5/
# gen.py with edits.py: 16 edits, each substitution asserted to occur exactly once; only the touched paragraphs are
# re-wrapped, every other line verbatim). 8 REPLACE blocks (§5.3, §5.4, §6.3, §6.5, §7.1, §7.3, §7.4, §7.7), 0 RULING
# REQUEST blocks. Binding: adjudication-r5.md (R5-01, R5-02, R5-03, R5-04; Part H · determinism), with R3-01 – R3-03 and
# R4-01 standing; R4-09 superseded whole by R5-02.
#
# PROGRESS
# - P0 brief read whole; adjudication-r5 TOC, R5-01, R5-02 (whole, with its Ends and Sweep), R5-03, R5-04, Part H ·
#   determinism and Part I read whole; R3-01 – R3-03 and R4-01 (standing) read: done
# - P1 issue sources (round5-work/determinism.json: 6 issues, no also_reported, no orchestrator_note; verify-determinism-
#   r4t, verify-model-r4t, verify-pipeline-r4t, verify-rendering-r4t) and live §5.3, §5.4, §6.3, §6.5 (9), §7.1, §7.2,
#   §7.3, §7.4, §7.5's table, §7.7 read whole; the landed round-5 texts these rows meet checked for agreement (model's
#   §2.7 support step (3), (6) (a)–(d), (7); pipeline's §4.11 *The clock* (4); V09's §4.9 bend rows and HAND-OFFS;
#   scope's T110-2): done
# - P2 16 count-asserted edits over 8 subsections: done
# - P3 dry run on a copy (apply-blocks.py: 8 blocks applied, 0 skipped, audit OK; headings 153 → 153, fences balanced,
#   title block unchanged; diff confined to l. 9208, 9221, 9253, 9971–9973, 10180–10183, 10319, 10592–10595, 10845,
#   11190, 11365, 11786, 11873, 11978 of the live base): done
# - P4 result saved; LANDED: done
#
# DISPOSITIONS — 6 routed issues: 5 FIXED, 1 MERGED (VPC-R4-03 into VM-R4T-04, closed by its fix), 0 INVALID,
# 0 ruling requests
# - VDC4-01 (major; FIX per R5-04): §6.3 *Plan damage*, both sentences as written — "the element shows damaged exactly
#   while the level is above 0 and at least t, compared only from its entry week into the plan (V03 §5.6 (2) (a)–(b); for
#   an element a restoring event's re-cut mints, the week that restoration ends, before which it draws as built, V06
#   §3.23 (3)) — but for §2.6 step 7's one case without a threshold", and "so a building never decayed and under no
#   disaster look (§2.6 step 7) draws its plan unchanged (`item123.damage`)". R5-04's citation "(a)–(b)" in place of the
#   required change's "(b)" (R5-04 governs: (a) states the comparison from the entry week, (b) defines that week).
# - VDC4-03 (major; FIX per R5-02, amended): §7.1's `bend.raised.underSpan` row is R5-02's D1 row — cause "a ground
#   `drawWay`, a moved way or a hand carve … crossing its under-deck strip where §4.3's crossing rule does not admit it
#   (§2.7's support step (6) (a)–(b))"; outcome "moved along the deck to cross under the nearest span that admits it;
#   where none does, a way takes another course by §4.3's router as a route does — round the raised way — else the
#   nearest routable pair (§4.3 *Two-point roads*; item 101 R2), and a carve's channel stops at the under-deck strip's
#   edges, ending against the ground as against a berm"; keys `bend.raised.underSpan`, `bend.raised.around`. Not written,
#   per Part H: the required change's "F-ROUTE's ladder … (`unserved`, reported)" and "round the raised way's feet" (a
#   hand way has the two-point road's last rung). Its second end (the wide road) is scope's T110-2 (5) and V09's T-V9-52.
# - VDC4-04 (major; FIX per R5-02): §7.1's `bend.wall.held` row, both cells as R5-02's D1 words them — the cause adds "or
#   a `delete` of the enceinte or of its raised gate or wall opening there"; the outcome adds "; a `delete` of the
#   enceinte takes the rest as a `dismantle` of every other run, the record kept with the held stretch standing as a
#   free-standing gate tower or arch carrying the deck (as `wallToWay` and `absorbWall` leave it, V06 §3.7.6 (5))". §2.7
#   (3)'s clause is the model's END (landed in repair-r5-model); the tests are T110-2 (4) and T-V9-52.
# - VM-R4T-04 (minor; FIX, in VPC-R4-03's words; R5-02's D5): §5.4's `warnings` comment adds "S5a's and S7's
#   `W_RAISED_CROSSING` (§2.7's support step (6); §4.4 *Outer moats*; §4.8)" after S10b's `W_DOSSIER_EDGE`. Closes
#   VPC-R4-03.
# - VPC-R4-03 (minor): MERGED into VM-R4T-04 (Part H) — closed by that fix; no block of its own.
# - VRC4T-07 (minor; FIX): §7.7 item 1's parenthesis reads "(§11.3: a week and a selection by `view.set`, a layer's
#   visibility by a logged `setLayer` sent by `doc.apply`, as a user's toggle)" (the live text's backticks kept).
#
# END LINES WRITTEN (Part H · determinism)
# - END of VEW-r4-01 (model): §7.1's `bend.wall.raisedCrossing` row → R5-02's D1 row verbatim (cause "(§2.7's support
#   step (6) (d))"; the stretch on its course beneath the deck, built against each support, ramp, stair, foot or `vault`
#   span in its band and topped at a span's soffit, no gate or tower in the under-deck strip, its setback, glacis and
#   berm stopped at the under-deck strip's edges, its channel passing beneath only where it meets none of these; the
#   raised way unchanged).
# - END of R5-02 (the adjudicator's sweep): §7.3's S7 row — D2 ("on each standing raised way the new run meets, the run
#   passing beneath its deck and its strips stopped at the under-deck strip's edges (§2.7's support step (6) (d)) —
#   nothing of the raised way re-derived or in the effective scope"); §7.4's raised-way row — D3 ("its deck and piers
#   held, as every raised way is from its creation (§2.7's support step (6))"); §5.3's gate row — D4 (both counts read
#   "on ground part 0 or at a raised gate; a deck passing over a stretch laid after its raised way is no crossing,
#   §2.7's support step (6) (d)").
# - END of VDC4-06 (V09): §7.1's catch-all "a wall's ridge, reach, waterfront, open ground and aqueduct arch" → "a
#   wall's ridge, reach, waterfront and open ground, the arch a wall takes for an aqueduct drawn across it".
# - END of VAT4-r4-01 (pipeline; R5-03): §7.7's `DossierBinding` adds `lateCalamities: string[]` (the binding keys of
#   late calamities held for the first epoch a later absorb folds; set by folding each dossierFacts event's list, as
#   quarantined is; [] in an older document); §7.1's `dossierFacts` event adds `lateCalamities: string[]` (the whole held
#   list after this absorb; §4.11 *The clock* (4); V08 §3.6 (4)); §7.4's `dossierFacts` row names the binding's lists —
#   `quarantined`, `lateCalamities` and `notes`, each rebuilt by folding the `dossierFacts` events, `lateCalamities`
#   read by the port's next absorb — so the field's lifecycle is the fold's: written by the port's events, persisted in
#   the log, replayed by fold, no undo target, no migration (as for `quarantined`; older documents carry no
#   `dossierFacts` event, §7.5's row).
#
# WHERE THE TEXT DIFFERS FROM THE RULED WORDS (precision only; each keeps the ruling's meaning)
# 1. `bend.raised.underSpan`'s outcome cell names the key each outcome's line takes: "(`bend.raised.underSpan`)" after
#    the move under a span, "where none does (`bend.raised.around`)" before the way's other course and the channel's
#    stop. D1 gives the row two keys without saying which outcome takes which; V09's round-5 HAND-OFFS record that
#    neither key's line words a hand carve's stopped channel and that V09 "writes no row for it until §7.1 names the key
#    its line takes". `bend.raised.around` is the key of "no span admits it", for a way and a channel alike (V09's
#    words for the channel: HAND-OFFS).
# 2. The code comments cite "§4.11 *The clock* (4)" with the italics the base's code comments already use for that
#    heading (§2.6's `ageYears` and `calamities` comments), where the END line writes "§4.11 The clock (4)".
# 3. §5.3's gate row (D4): each parenthesis is placed after the count it qualifies ("the roads leaving each walled stage
#    (…) equal its gate count (§4.2 S3 (7): …)"; "its arterial crossings (…)") so it does not follow the existing
#    "(§4.2 S3 (7): …)" parenthesis; its words are D4's.
#
# THE SWEEP (R5-01 (2): every restatement in §5–§7 of what R5-02, R5-03 and R5-04 change; the three blind spots)
# - R5-02 — searched "support step", "crossing station", "last support run", "raised gate", "wall opening",
#   "W_RAISED_CROSSING", "raisedCrossing", "underSpan", "bend.wall.held", "bend.raised", "under-deck", "held stretch",
#   "raised", "aqueduct", "viaduct". Conformed: §5.3's row "a way crosses an enceinte's trace only at a gate" — its way
#   is now "a way on ground part 0", and the cell ends "; a raised way's deck, on its own part, meets a trace by §2.7's
#   support step (3) and (6) (d) (§4.8 *Gates*)" (a deck passing over a stretch laid after it is no gate crossing).
#   Stand: §5.3's basement, sky and deck rows; §5.4's `aqueduct_no_source`; §6.1's `raised.reason` row and
#   `EVO_RAISED`; §7.1's `drawWay` type, *Raised ways, aqueducts and retaining walls* (a hand raised road comes down
#   before a wall and passes its gate; a hand aqueduct crosses by an arch — R5-02 (3): by hand only an aqueduct is
#   created across a standing wall), *Delete* (the outcome table is the home of `bend.wall.held`), the edit-target and
#   binding rows, the sugar paragraph's `placeGate`; §7.3's S7 row's first cell (an aqueduct's arch) and the water
#   operator's re-traces (covered by the S7 row's D2 text); §7.4's `drawWay` row; §7.5's `nextGroundPart` and older
#   `raised` rows; §7.7's item 2 suppressions and DR34/DR35.
# - R5-03 — searched "last epoch", "late", "calamit", "W₀", "current week", "own week", "its week", "dating rung",
#   "rides", "first epoch", "quarantined", "lateCalamities", "DossierBinding". Conformed: §7.7 item 6's "an element change
#   folds at its own week as a standalone dossier event, in the host's order" adds "— a late one, dated at or before the
#   last epoch's week, never at a week before it (§4.11 *The clock* (4))" (VV78-r4-04's case: a late element change
#   folded at its own week set the current week back). Stand: item 13's F-V8-6 "(its own tick; `epoch`, riding
#   `EpochInputs.events`)" and DR28 (they name the dating receipt and the carrying epoch, both kept by *The clock* (4));
#   `DossierChange.week`'s comment; §5.3's stored-binding row (it compares the folded binding, `lateCalamities` with it).
# - R5-04 — searched "plan damage", "Plan damage", "damaged", "decayLevel", "decay level", "as built", "re-cut mints",
#   "entry week", "never decayed", "disaster look". Conformed: §6.5 (9)'s *plan damage* test — "a level of 0 under no
#   disaster look draws the plan byte-identically (`item123.damage`; §6.3 *Plan damage*)". Stand: §6.1's `plan.damage`
#   row (it names the readers, never the comparison).
# - VRC4T-07 — "layers shown" and `setLayer` in §5–§7: l. 11873 alone carried the older form.
# - Tests, fixtures and milestone cells (blind spot (c)): §6.5 (9), §7.1's empty-edit test, §7.2's tests, §7.4's
#   B-EDIT fixtures and edit-boundary test, §7.7's T20-14 – T20-16 fixtures — none runs a raised-way crossing, a late
#   change or a restoring re-cut (their bars: T110-2 and T76-1, scope; T-V9-52, V09; T-V8-49 (g), V08; T-ER-28,
#   rendering; T-V3-39 (c), V03); my unit holds no milestone cell.
#
# HAND-OFFS (for round 6's verifiers; none is open wording in §5–§7)
# - V09: §4.9's `bend.raised.around` line ("No arch of {way} is wide or high enough for {name}, so it goes round.") and
#   its source cell ("a ground way no span of a standing raised way admits") cover a way only; §7.1's
#   `bend.raised.underSpan` row now gives the same key to a hand carve's channel no span admits, stopped at the
#   under-deck strip's edges — V09 words that case (V09's round-5 HAND-OFF asked §7.1 to name its key).
# - scope and V09: no bar runs a hand carve across a standing raised way — moved under the nearest span that admits it
#   (`bend.raised.underSpan`), and where none does stopped at the under-deck strip's edges (`bend.raised.around`);
#   T110-2 (5) or T-V9-52 (its hand-edit bar) is the home a clause would join.
#
# WORDS (principle (9)): the eight touched subsections 58 348 → 58 713 (+365); the unit (§5–§7) 81 064 → 81 429
# (+0.45 %). Every added word is a required or ruled text (the fixes and END lines) or a sweep conformance; nothing was
# cut (a repair round), so the four shrink sources are 0. No narration or review id enters design text (R3-02).
