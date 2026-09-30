# Blocks — lane fable-review/main/redteam (Fable reviewer, 2026-09-27)

Text before the first "=== " line is ignored by the assembler. Blocks follow as the review (docs/fable-review/main/redteam.md)
rules them; each block is closed with "=== END ===" as soon as it is written (kill-safe). Every block carries its J-ROWS
line and RATIONALE-A entry in the J-ROWS and RATIONALE-A blocks at the end of this file.

=== APPEND TO SECTION ### 4.6 S8 Infill — the measured bent cut as a kernel transaction, per district, with the deep-interior rule ===

**Rung (c) under the contact rule (Fable review 2026-09-27; J-Fredteam-1).** Step 8's rung (c) — the straight cut
perpendicular to the longest run through its midpoint, clipped to F's own component — answers the four-crossing failure
by the clipping alone; §3.6's contact rule 2 still refuses it when its interior passes within `attractCm` of a shallow
reflex vertex (one the reflex pre-cut left, being no deeper than the band's plot depth) or touches an antenna. Rung (c)
is therefore always-succeeding by construction, not by claim: when the midpoint cut is refused, its foot **slides along
the longest run** in steps of 2 · `attractCm`, alternating sides of the midpoint (first toward the run's lower (y, x)
end), each candidate re-clipped and re-tested under the rung's work limit, until the contact rule passes — for k shallow
reflex vertices at most 2k candidates fail, since each refuses a foot interval of at most 2 · `attractCm`, and a run of
the band's minimum block width holds hundreds of steps. Rung (d)'s "a larger face reaching (d) is cut by (c) again" is
this slide, never a repeat of the refused cut. A run too short to hold one passing candidate is a face below the band's
block width, which step 1 already types a block. Stream: none (the slide is deterministic); report: `W_CUT_SLID` with
the step count.

=== END ===
=== J-ROWS ===
| J-Fredteam-1 | §4.6 step 8's rung (c) made always-succeeding in fact: a midpoint cut §3.6's contact rule refuses slides its foot along the longest run in steps of 2 · `attractCm`, alternating sides, until it passes; rung (d)'s "(c) again" is that slide, never a repeat | §4.6 |
=== END ===
=== RATIONALE-A ===
| J-Fredteam-1 | Chose to make §4.6 step 8's rung (c) slide its foot along the longest run — steps of 2 · `attractCm`, alternating sides of the midpoint, first toward the run's lower (y, x) end, each candidate re-clipped and re-tested under the rung's work limit, reported `W_CUT_SLID` — over leaving "the always-succeeding cut" as written and over widening the reflex pre-cut to every reflex vertex, because the clipping to F's own component answers only the four-crossing failure while §3.6's contact rule 2 still refuses a cut whose interior passes within `attractCm` of a shallow reflex vertex (one the pre-cut leaves, being no deeper than the band's plot depth) or touches an antenna, after which rung (d)'s "a larger face reaching (d) is cut by (c) again" repeats the identical refused cut and the ladder ends in F-WORK with the face uncut — bounded and reported, but contradicting the rung's claim; a slide is deterministic (no stream), costs at most 2k candidates for k shallow reflex vertices since each refuses a foot interval of at most 2 · `attractCm`, and a run of the band's minimum block width holds hundreds of steps, whereas pre-cutting every shallow reflex vertex would change the block statistics the M0 gate measures against NG and MFCG (§4.4, §13.5). Written as an APPEND TO SECTION so pass c's items 33–41, which restate the steps, can fold the sentence into rung (c) inline (§4.6; Fable review 2026-09-27, lane redteam). |
=== END ===
