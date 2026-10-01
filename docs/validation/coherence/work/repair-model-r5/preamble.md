# Repair round 5 — model (base §2)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-model-r5; covered by the whole-design retrovalidation (J84).

# Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): text before the first block header
# is ignored. Base: docs/ARCHITECTURE.md sha256 5f34cceb61432ac4… (assemble-r4's output, the live file). Each REPLACE body
# is the live subsection with count-asserted substitutions (generator docs/validation/coherence/work/repair-model-r5/gen.py:
# 9 edits, each applied exactly once; only the touched ranges are re-composed, every other line verbatim). 2 REPLACE
# blocks (§2.7, §2.9), 0 RULING REQUEST blocks. Binding: adjudication-r5.md (R5-01, R5-02, R5-09; Part H · model), with
# R3-01 – R3-03 and R4-01 standing; R4-09 superseded whole by R5-02.
#
# PROGRESS
# - P0 brief read whole; adjudication-r5 TOC, R5-01, R5-02 (whole), R5-09, Part H · model, Part I read: done
# - P1 issue texts (round5-work/model.json: 9 issues, no also_reported, no orchestrator_note); verifier files located;
#   live §2.7 (records, enceinte condition, *Raised ways* whole: the support step, the clearance, the span rule,
#   readers, source and lifecycle, *At the frame*), `RaisedFoot`, `supports`, §2.9 View state; V09 §2.4 `WorkingLayer`;
#   cited homes checked (§4.2 S1 (7), §4.8, V01 §3.17.3, V07 §3.5a, V06 §3.7, §2.10, §3.19, V04 §3.5.0): done
# - P2 count-asserted edits (work dir docs/validation/coherence/work/repair-model-r5/): done
# - P3 dry run on a copy (apply-blocks.py: 2 blocks applied, 0 skipped, audit OK; headings 153 → 153, fences balanced;
#   diff confined to l. 2292, 2315–2317, 2535–2540, 2546–2615, 3392–3393 of the live base): done
# - P4 result saved; LANDED: done
#
# DISPOSITIONS — 9 routed issues: 7 FIXED, 2 MERGED (closed by their primary's fix, no block of their own), 0 INVALID,
# 0 ruling requests
# - VEW-r4-01 (major; FIX per R5-02, amended): §2.7's support step (6) replaced whole by R5-02's (6) — a raised way held
#   from the commit that creates it, everything laid after it giving way ((a) a part-0 way, (b) a channel, (c) a face,
#   (d) a wall stretch laid after it running on beneath the deck), the closing paragraph on stretches standing at its
#   creation and at a regeneration; (3)'s station ring loses "at a standing station a later trace takes, the pier's
#   former ring with it, (6) (b) (iii)". Not written, per Part H: the bend past a foot and the "not already another
#   trace's" station (no later trace takes a station, so neither a one-span raised way nor a taken station needs a
#   rule). Its determinism, V06 and V09 ends are R5-02's D1, V06 and V09 lines; its fixtures are scope's T110-2 (4).
# - VEW-r4-02 (major; FIX per R5-02): (3)'s palisade parenthesis → "(only a stretch standing when the raised way is
#   created; a stretch laid after it — a village palisade's among them — takes no station and runs on beneath the deck,
#   (6) (d))"; (6) (d) ends a later stretch at a `vault` span's two walled-up arch mouths, the chamber kept whole. Its
#   pipeline end is R5-02's P12; its V07 ends are in VAL-R4-03's text.
# - VEW-r4-03 (major; FIX per R5-02, amended): no last support run remains; (3)'s obstacles read the strip S7 cuts
#   beside a standing trace before S7 has cut it (its band's half, setback and glacis, the berm up to its moat) and,
#   along a bank of kind `quay`, the corridor of the quay S7 lays there. Its pipeline ends are P3 and P8; its fixture is
#   in T110-2 (3).
# - VM-R4T-01 (major; FIX per R5-02, amended; closes VPC-R4-01): (6) (a) — S5b's and S5c's ways (every part-0 way laid
#   after the raised way) keep off its supports, ramps, stairs and feet from its commit, crossing under a span only by
#   §4.3's crossing rule, each with its own ladder; no way's crossing is moved after the fact. Its pipeline end is P1,
#   its scope end T110-2 (3).
# - VM-R4T-05 (minor; FIX per R5-02): (6) reads "nothing laid later re-runs this step on it, moves, adds or omits a
#   station, mints a key, re-rules a span or drops it".
# - VV34-r4-01 (major; FIX per R5-02; closes VAL-R4-04): new (7) — a frame growth's extension keeps every station of the
#   old deck (key, position, support `ring`) and every span between two of them as it stands (`use`, `reason`, `state`,
#   `held`); (1)–(5) and the span rule run on the extension alone, from the old deck's last interior station (with none,
#   from its other foot), its keys minted after the largest; `RaisedFoot`'s comment adds "(the old deck's stations kept,
#   the support step's (7))". Its scope end (T110-2's frame-growth clause) and V04 end (T-V4-65) are END lines there.
# - VAL-R4-01 (major; FIX per R5-09): §2.9's View state entry reads "`workingLayer` (per viewer: the layer the tools act
#   on and the view draws whatever its visibility, §8.4 — ground, a sky island's `PlatKey`, or the underground, its band
#   the view key `depthBand` alone, never copied into `workingLayer`; its value V09 §2.4's `WorkingLayer`, its switch
#   V09 §4.2)".
# - VAL-R4-04 (major): MERGED into VV34-r4-01 (Part H) — closed by (7) and the `RaisedFoot` comment; no block.
# - VPC-R4-01 (major): MERGED into VM-R4T-01 (Part H) — closed by (6) (a); no block.
# - R5-02's other model text: `supports`' `state` comment → "never on a crossing station while a wall stretch lies under
#   it, whose `condition` it reads (the support step (3), (6), below)".
#
# END LINES WRITTEN (Part H · model)
# - END of VDC4-04, VDC4-05 (determinism, pipeline) and VAL-R4-03 (V07): §2.7's support step (3), after "… and a hand
#   op's dry run bends its stretch round it (item 101 R2)", R5-02's held-stretch clause — a removal of the wall around
#   a crossing station never takes it: a hand `delete` of the enceinte bent to a `dismantle` of every other run, one of
#   its raised gate or wall opening there changing nothing (§7.1's `bend.wall.held`), and `wallToWay`, `absorbWall` and
#   the hand-off down to the village's palisade each leaving it standing as a free-standing gate tower or arch carrying
#   the deck, no gate law and no junction with a ring road, the enceinte's record kept while it stands.
# - END of VM-R4T-02 (scope): (6) carries "at a regeneration a locked, pinned or declared raised way stands before every
#   stage the regeneration runs (§7.2)", written with VEW-r4-01's (6).
#
# WHERE THE TEXT DIFFERS FROM R5-02's WORDS (precision only; each keeps the ruling's meaning)
# 1. (6)'s lead: "placed by (1)–(5) at the commit that creates it — … — against the obstacles standing then, each span's
#    `use` ruled once by the span rule (below)" in place of "placed by (1)–(5) and the span rule at the commit that
#    creates it". *The span rule* (which stands) runs at generation once, eagerly after §4.6's cut — R5-02's own P1 says
#    "its one eager run, after §4.6's cut" — so the ruled words would state two timings for one run at generation; at an
#    epoch and by hand the two readings are one. "re-rules a span" in the held list stands as ruled.
# 2. (a)'s ladder list names each ladder's subject: "V01 §3.17.3 (3)'s for a stage-2 seed's way" (the ruling's text
#    "V01 §3.17.3 (3)'s;" names none) and "§4.8's lead for S7's" (R5-02's P8, the home of S7's way ending at the strip).
# 3. The closing paragraph's "a station no stretch lies under any more stands as a pier" adds "(its `ring` by (4))": the
#    support needs a footprint once the band's stretch no longer gives it, and (4) is the pier rule (principle (11)).
#
# SWEEP (R5-01 (2): every restatement in the unit of what R5-02 and R5-09 change). §2 grepped for "crossing station",
# "support step", "(6) (", "(b) (iii)", "(b) (iv)", `W_RAISED_CROSSING`, "raisedCrossing", "palisade", "raised gate",
# "wall opening", "under-deck", "S7b", "re-sit", "last run", `workingLayer`, `depthBand`, "depth band", "working layer".
# Outside the replaced text every hit stands and agrees: §2.7's enceinte-condition paragraph ("The stretch of the band
# under a raised way's crossing station is held while its deck stands, as the support step (3) states" — R3-25 (d),
# kept by R5-02); `RaisedFoot`'s placement comment ("read by the support step and the span rule"); the span rule's (2)
# (a wall strip under a span opens it — at generation the eager run sees every later stretch, so a later stretch meets a
# `vault` span only at an epoch or by hand, as (6) (d) states); *Source and lifecycle* ("declared ways are held", the
# regeneration sense (6) states); §2.8's `why` ("a raised way's reason, its values and its gate": the rung gate) and
# its conversions ("a raised way declines by stretch with its supports persisting"); §2.9's `depthBand` entry and its
# sentence "the per-viewer `workingLayer` (above) is drawn whatever its visibility (§8.4)" — both agree with the new
# entry. No hit in §2.1 – §2.6.
#
# HAND-OFFS: none beyond R5-02's *Ends*, which their own seats write this round (pipeline P1 – P12, determinism D1 – D5,
# rendering R1, scope S1 and T110-2's frame-growth clause, V04, V06, V07, V09, V11) and V09's VEL4-r4-02 (R5-09's
# removed target, V09 §2.12). Observation for the verifiers, no change asked: a quay S7 lays along a `quay` bank crosses
# a raised way's under-deck strip by §4.3's crossing rule (its soffit meeting *The clearance* for the quay's class and
# within `squareDeg` of square), else ends at the strip as at a reservation (R5-02's P1 and P8), as every way laid after
# a raised way does.
#
# WORDS (principle (9)'s shrink report). Unit (base §2): 63,070 → 63,295 (+225, +0.4%); §2.7 12,625 → 12,826; §2.9
# 8,359 → 8,383. Support step (6) 847 → (6) + (7) 905. Removed: R4-09's generation re-siting, last support run and its
# give-way rungs, the later trace through a station, the palisade's clause (iv), the lock clause and the pier's former
# ring (superseded design, R5-02 — not a shrink source). Added: R5-02's ruled text (the held rule's (a)–(d), the
# held stretch under a removal of the wall, (3)'s strip and quay readings, (7)) and R5-09's entry. The unit grows: the
# round's work is ruled new design text, irreducible here; no restatement or narration was found in the touched ranges
# to cut.

