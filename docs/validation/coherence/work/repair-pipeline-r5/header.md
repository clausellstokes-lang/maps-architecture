# repair-r5-pipeline — lane coherence/repair-pipeline-r5 (unit pipeline: base §4, §10, PART II, PART III)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-pipeline-r5; covered by the whole-design retrovalidation (J84).

# Block file per the BLOCK PROTOCOL (docs/validation/amendments-c/apply-blocks.py): text before the first block header is
# ignored. Base: docs/ARCHITECTURE.md sha256 5f34cceb… (assemble-r4's output); rationale a480f02e… (untouched). Each
# REPLACE body is the live subsection with count-asserted substitutions (generator
# docs/validation/coherence/work/repair-pipeline-r5/gen.py with edits.py; every untouched line verbatim). 10 blocks, all
# REPLACE (§4.1, §4.3, §4.4, §4.5, §4.7, §4.8, §4.11, §4.13, §10.2, II.7.3); 25 edits. 0 RULING REQUEST blocks.
#
# PROGRESS
# - P1 brief read whole (11 routed issues: 3 major, 8 minor as reported); adjudication-r5 read (TOC; R5-01, R5-02, R5-03
#   whole; R3-01 – R3-03 and R4-01, which stand; R5-09 for the working layer's name; Part H · pipeline with its 4 END
#   lines; Part I): done
# - P2 issue sources (round5-work/pipeline.json: no also_reported, no orchestrator_note; the claims carry the evidence)
#   and the live text of every subsection concerned read whole: §4.1's transactions table and `raised` key, §4.3
#   (*Lattice and costs*, *Raised ways* whole), §4.4 (S5a, S5b, S5c), §4.5's daylight term, §4.6's strip and feet, §4.7's
#   class floors, §4.8 (lead, strips, condition, gates, water furniture), §4.11 (`wallToWay`, the carve, *Other
#   crossings*, *The clock*, *The rung at an epoch*), §4.13, §10.2 (`CrisisLookRow`, the lead, (d), (f)), II.7.3 *Order,
#   seed and locality*; the homes §2.7's support step (live, and the model seat's round-5 text), §9.1, §9.2, §8.4's
#   working layer, V08 §3.6 and §4.6: done
# - P3 25 asserted edits over 10 subsections (edits.py): done
# - P4 checks on scratch copies (checks.sh; receipts below): done
# - P5 result file and LANDED: done
#
# DISPOSITIONS (adjudication-r5 Part H · pipeline) — 11 issues: 9 FIX, 2 MERGED, 0 INVALID; every id closed by the edit named
# - VAT4-r4-01 (major; FIX per R5-03; closes VPC-R4-02): §4.11 *The clock* (4) — R5-03's text replaces "A newly carried
#   calamity dated at or before the last epoch's week … its dated changes apply finished, noted.": a change dated at or
#   before the last epoch's week `W₀` is late and never folds before `W₀` (the current week never falls back); a late
#   calamity with the absorb's week `W₁` after `W₀` rides this absorb's first epoch (one folded at `W₁` for it where none),
#   its event and its F5 targets' dossier events at `W₀` + 1; with `W₁` not after `W₀` (a second absorb in the last
#   epoch's own week, or a clock turned back) no epoch — its targets' events applied now at `W₀`, finished, and the
#   calamity held in `DossierBinding.lateCalamities` (§7.7, the base's record, as Part H rules — not V08 §2.3) for the
#   first epoch a later absorb folds; every other late change at `W₀` + 1, else at `W₀`, finished, noted (`late`, V08
#   §4.6); a population move at `W₁` not after `W₀` crosses at the next absorb past `W₀` (V08 §3.6 (3)). The
#   "V08 §3.6's degenerate row" citation VPC-R4-02 named is gone with the sentence. The record (§7.7, §7.1, §7.4) is
#   determinism's END, V08's texts V08's, T76-1's fixture scope's.
# - VDC4-05 (major; FIX per R5-02, P11): §4.11 `wallToWay` — "gates become junctions with a `square` option — save the
#   stretch held under a raised way's crossing station while its deck stands (a raised gate with its tower, the curtain
#   under an aqueduct's arch), which stays as a free-standing gate tower or arch carrying the deck, the new ring road
#   taking no junction with the raised way (§2.7's support step (3); V06 §3.7.6 (5) gives its form)." Both citations
#   Part H names; "gives its form" closes the parenthesis instead of a bare "(5))." because the bare form, followed by
#   any common word, trips doc_checks' C3 numeric 3-gram run ("3 7 6 5 …", a false positive the live text avoids the
#   same way at §4.8's "in the form V06 §3.7.6 (5) gives it").
# - VEW-r4-04 (minor; FIX per R5-02, amended): §4.4 S5a *Trace* (2) — R5-02's P4 after the pinned-gate parenthesis: "— on
#   ground part 0: an arterial crossing the boundary on a raised deck pins no gate there, the deck passing over the trace
#   (§2.7's support step (6) (d)), and a pin inside a raised way's under-deck strip moves along its arterial to the nearest
#   point clear of it —" (no pin on the deck); with P6 (S5b's count on ground part 0).
# - VM-R4T-03 (minor; FIX per R5-02, amended): §4.8's lead is R5-02's P8 (the strips beside a trace laid after a raised way
#   stop at its under-deck strip, closed along it, reported; gate plazas, quays, the intervallum, castle paths and pier,
#   mole and breakwater roots give way; a raised way created across a standing trace kept its piers out of S7's strip and
#   quay by (3)). The sentence the required change put after the outer strip's definition is not added (Part H).
# - VM-R4T-06 and VV12-r4-03 (minor; FIX per R5-02): §4.3 *Lattice and costs* is R5-02's P1 — the raised way held from
#   the commit that creates it; its supports, ramps, stairs and feet, and once the span rule has run (its one eager run,
#   after §4.6's cut) its `vault` spans' strips, impassable to everything on ground part 0 laid after it, at generation as
#   after it; the rest of the strip crossed only under a span (an `open` one once the span rule has run) of clear width ≥
#   the way's width + `clearWidthM`, soffit meeting *The clearance*, within ± `squareDeg` of square; a route's shift, else
#   F-ROUTE; S5c, stage 2's ways, V07's trackers and S7's quays, intervallum and castle paths keeping the same crossing rule
#   each with its own ladder. No "run at an S5a commit" remains to except (VM-R4T-06); "the one rule" no longer reads as one
#   ladder (VV12-r4-03).
# - VRC4T-09 (minor; FIX; closes VAL-R4-08): §10.2 `CrisisLookRow.lookLevel` — "item 123's decay level the buildings it
#   stands over draw ((f)) at severity 0 and 1, linear between"; §10.2 (d)'s footprint exception — "a disaster's ruins and
#   its units' tone (§8.2's `ruinTone`)".
# - VAL-R4-06 (minor; FIX): II.7.3 *Order, seed and locality* — "its labels candidates only while the view draws the layer
#   (visible, or Below the view's working layer; §9.2, §8.4)". The required text's content as written; its gloss is in
#   parentheses rather than a second dash pair, which would have nested inside the sentence's open aside ("— a leaf of
#   §9.1's quarter tree … — as the hinterland unit runs its own stages").
# - VAL-R4-10 (minor; FIX): §4.7 *The class floors*' heading — "; DXC-06, KXC-02" removed (two canon conflict ids in design
#   text); the unit holds no other (searched: canon conflict ids, verifier ids, R-ids — none).
# - VPC-R4-02: MERGED into VAT4-r4-01 (no block of its own). VAL-R4-08: MERGED into VRC4T-09.
#
# END LINES WRITTEN (Part H · pipeline, verbatim from R5-02)
# - P1 (END of VM-R4T-01 and VAL-R4-02; one text with VM-R4T-06 and VV12-r4-03): §4.3 *Lattice and costs*, above.
# - P2: §4.3 *The slot* — "Its stations and spans are placed at that commit and held from then (§2.7's support step (6)),
#   so S7b's capacity …" (the support step's run after S7's batches is gone).
# - P3 (also VEW-r4-03's end): §4.1's S7 row — "· beside a raised way standing before the trace, its strips stopped at the
#   under-deck strip, a gate plaza cut round the raised way's supports and no pier or mole rooted on them (§4.8's lead;
#   §2.7's support step (6))".
# - P5: §4.4 S5a *Outer moats* — the trace runs on beneath a raised way standing before it, the berm stopping at the
#   under-deck strip's edges and the channel passing beneath only where it meets no support, ramp, stair, foot or `vault`
#   span, else stopping, reported (`W_RAISED_CROSSING`); a raised arterial over the trace takes no gate and no part-0 deck,
#   a part-0 way beneath it its own ground gate clear of the under-deck strip (§4.8 *Gates*).
# - P6: §4.4 S5b — the existing arterials "cross the new boundary `c` times on ground part 0 (a crossing on a raised deck
#   no gate, S5a *Trace* (2))"; "An outer enceinte never gets fewer gates than arterials cross it on ground part 0".
# - P7: §4.5 *The daylight term*'s casters — "walls (a run beneath a raised way's span to its soffit, §2.7's support step
#   (6) (d)), gatehouses, …".
# - P8 (also VEW-r4-03's §4.8 end): §4.8's lead, above (VM-R4T-03).
# - P9: §4.8 *Gates* — main gates where the arterials cross the trace on ground part 0, or at a raised gate where the
#   arterial's raised way was created across the standing trace, a deck over a stretch laid after it no crossing; "roads
#   leaving each walled stage, so counted, = its gate count"; the paragraph **A raised way created across a standing trace**
#   (the wall opening and the raised gate as V06 §3.7.6 (5) gives them; a stretch laid after a raised way takes no crossing
#   furniture and runs on beneath the deck) replaces **A trace across a standing raised way**.
# - P10: §4.11's carve — "A raised way keeps its course and every station: the channel passes beneath it only where its
#   crossing of the under-deck strip meets no support, ramp, stair, foot or `vault` span, else stops at the strip's edges,
#   ending against the ground as against a berm, reported — a hand carve's crossing first moved along the deck to the
#   nearest that passes (§2.7's support step (6) (b); §7.1's `bend.raised.underSpan`)."
# - P11: §4.11 `wallToWay` — VDC4-05's FIX, above.
# - P12 (END of VEW-r4-02 and VAL-R4-03): §4.13's raised-way column — `wall` cell: created across a standing enceinte it
#   crosses only on a gate's line or as the aqueduct's arch, its station on the band (§2.7's support step (3)); a wall
#   stretch laid after it — a village palisade's among them — runs on beneath its deck, built against the supports,
#   ramps, stairs, feet and `vault` spans in its band, no gate on the deck, its strips stopped at the under-deck strip
#   (§2.7's support step (6) (d); V07 §3.5a (4)); `river, coast, moat` cell: a moat laid after the course passes beneath
#   only where it meets none of these, else stops at the under-deck strip (§2.7's support step (6) (b)).
# - P4 is VEW-r4-04's FIX (above).
#
# THE SEAT'S OWN SWEEP (R5-01 (2)) — restatements in this unit of what R5-02 and R5-03 change, conformed in the same blocks
# - §4.1's transactions table, S5's row: "S5a L1: the trace with every arterial crossing on ground part 0 as a gate
#   (§4.4 S5a *Trace* (2))" (P4's pin rule restated there).
# - §4.3 *Where it may not go*: "crosses a moat or a city wall standing when it is laid only as the aqueduct's wall arch or
#   on a gate's line (a wall laid after the raised way runs on beneath its deck, and a moat laid after it passes beneath it
#   or stops at its under-deck strip; §2.7's support step (6) (b), (d))" — the same split P12 writes at §4.13's `wall`
#   cell; read unqualified, the old sentence forbade the ungated deck R5-02 makes over a later wall.
# - §4.4 S5c's legality: the impassable set restated from §4.3 — "(its supports, ramps, stairs and feet, and once the span
#   rule has run a `vault` span's strip)" for the old "where it is held; else, at generation, its ramps, stairs and feet"
#   (no generation/held split remains, P1).
# - §4.11 *The rung at an epoch*: the raised parts' re-derivation "extends a deck ending on the old ring to the new ring, the
#   old deck's stations kept (§2.7's support step (7)), and re-places both ends of that foot" (R5-02's (7), which the model
#   writes and `RaisedFoot`'s comment cites).
# - Searched and unchanged: "support step", "crossing station", "raised gate", "once more", "last run", "re-site",
#   "locked"/"pinned" with a raised way, "(6) (a)", "(6) (b)", "(iii)", "station on the deck", "under-deck",
#   "W_RAISED_CROSSING", "palisade", "viaduct", "aqueduct" over §4, §10, PART II and PART III — the remaining hits are the
#   held stretch's condition at generation (§4.8, (3) stands), §4.3's aqueduct crossing "the wall through an arch" (every
#   generated aqueduct is laid at S6's end, after every trace of its generation), §4.6's hole and feet, II.7.6's arch
#   vaults, PART III's palisade (no crossing), the S6 row and §4.13's other cells; "late", "W₀", "degenerate",
#   "absorb" (R5-03): no other restatement of the late-change rule in the unit; "district" in the disaster look's context
#   (VRC4T-09): §10.2's lead and (f) already read units; "labels drawn"/"visible" (VAL-R4-06): no other site.
# - Tests and fixtures (R5-01 (2) (c)): the unit holds §4.13's edge and combination suites — no fixture names the last
#   support run, a station a later trace takes or the late calamity; T110-2, T76-1 and §13.8 are scope's (END lines there).
#
# HAND-OFFS (for round 6's verifiers; observations no END line names — the design text here leaves none open)
# 1. model / determinism: §4.8 *Gates*' new paragraph (P9, verbatim) lists the creations that take crossing furniture as
#    "at generation …; at an epoch V06 §3.19's founding …; by hand an aqueduct, §7.1". A hand viaduct or elevated road
#    declared across a standing trace on a gate's line is created across a standing wall too, so §2.7's support step (3)
#    gives it a crossing station (a raised gate); the list reads as cases, not as the whole set. If a reader takes it as
#    exhaustive, the parenthesis may add "or a viaduct or elevated road on a gate's line".
# 2. pipeline (next round) / model: S5b's spawned radial (N_k > c) that raises a viaduct by §4.3's rules across the
#    stage's new boundary crosses it on a deck laid before the trace, so by P4 and P6 it pins no gate: the stage then has
#    fewer main gates than the gate law's N_k (the ≥-crossings invariant still holds, §5.3). The outcome is defined by the
#    text as written; whether S5b should spawn a further radial for it, or report the shortfall, is a question for the
#    gate law's home (§4.2 S3 (4)) and is not decided here (feature freeze).
#
# RECEIPTS (scratch copies; the live files untouched; docs/validation/coherence/work/repair-pipeline-r5/checks.sh)
# - Dry run, apply-blocks.py on docs/ARCHITECTURE.md (sha256 5f34cceb…) and the rationale (a480f02e…) with this file alone:
#   10 blocks found, 10 applied, 0 skipped; audit 0 not OK; headings 153 → 153; fences balanced (140 → 140); title block
#   unchanged; document 22 934 → 22 950 lines; rationale unchanged.
# - Combined dry run with the round-5 base files present now (model, rendering, scope) and this one: 17 blocks found,
#   17 applied, 0 skipped, audit 0 not OK (no heading shared with another seat); the model's support step (6) (a)–(d) and
#   (7), which this file cites, read as cited.
# - Table rows changed (§4.1's S5 and S7 rows; §4.13's `river, coast, moat` and `wall` rows): S1 0 hits (column counts
#   unchanged).
# - doc_checks on the result, sections 4.1, 4.3, 4.4, 4.5, 4.7, 4.8, 4.11, 4.13, 10.2, II.7.3: exit 0 — C1 5/0, C2 1/0,
#   C3 169/0 unreviewed, C4 1/0, S1 0/0, S2 273/0 (live, same sections: C3 169/0, S2 272/0) — PROVISIONAL: the tool warns
#   the reference corpus is incomplete here (captures, research/patreon, research/devlogs, research/ftg-docs,
#   research/external absent), so the clean-room result is not authoritative.
# - References (assemble-r4's refs.py on a mirror of the set with the result): base 18 128 resolved, 0 broken, ambiguous
#   14 → 14 (live 18 109 resolved, 0 broken); volumes unchanged.
# - Scans of the 80 changed lines (scan.py): canon's retired-term patterns 0; deferral wording 0; review ids, R-ids and
#   canon conflict ids in design text 0; phone 0; vague wording 0.
# - Words (principle (9)): the unit — base §4, §10, PART II, PART III — 115 854 → 116 351 (+497, +0.4 %); the 25 edits
#   replace 1 023 words with 1 520. Removed: the superseded machinery (the support step's run after S7 at its three
#   statements, §4.1, §4.3, §4.8; the generation/locked split of §4.3 and S5c; the station a later trace took, at S5a, §4.8
#   and the carve; the round-4 late-calamity clause) and NARRATION (two canon ids, 2 words). Added: ruled content only —
#   R5-02's held raised way and the wall that runs on beneath it at its pipeline homes (P1 – P12) and R5-03's late
#   change; no shrink source applies to a ruled replacement of this kind.
