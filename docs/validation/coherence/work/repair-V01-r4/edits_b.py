# repair-r4-V01 edits, second set (coherence/repair-V01-r4, continuation run). Applied after edits_a; same protocol
# (tag, old, new, count), the old texts exact substrings of the text edits_a leaves.
#   VV12-r3-03 (sweep, R4-01 (2)): §6's `findAreas` row says when the frame's list is computed (once per drawn week a
#     scrub settles on), so the row no longer reads as a second index rebuild against §12.5's "the index once per commit".
#   VV12-r3-03 (root cause, R4-12; brief note (6)): §5.4 (6)'s Show frame now reads `disasterDistricts` at the drawn week,
#     and the crisis services' `doc` is already the model the view draws (§3.16); their memo keys named only the commit,
#     so a builder could serve the head's units at a scrubbed week — the defect the finding names for `gapUnits`. The
#     memo keys gain the drawn frame at §2.3's comment, §3.16 (the pair and `campLand`) and §6's row. No behaviour moves.
#   Form only (refs.py, assemble-r3): two bare base references edits_a placed inside a volume's list (§1.2's "§4.3", §1b's
#     "§2.9") read as ambiguous; each moved out of the list. The "—," / "—:" / "—;" joins edits_a introduced in §1b,
#     §5.4's lead, §5.4 (3) and T-V1-59 (f) become parentheses or a semicolon. No word of content changes.


def build(text):
    E = []
    E.append(('6-findAreas-row-where (VV12-r3-03, sweep)',
              "inside item 120 (j)'s index rebuild, once per commit and once per drawn frame a scrub settles on, within "
              "§12.5's overlay budget |",
              "inside item 120 (j)'s index rebuild, once per commit, and once per drawn week a scrub settles on whose "
              "frame is not the head (§11.2's *At a drawn week*), within §12.5's overlay budget |", 1))
    E.append(('2.3-disaster-comment (VV12-r3-03, root cause)',
              "// Item 122's disaster units (V01 §3.16): view data — derived per commit, overlay and key, outside the "
              "document, its hash and the log",
              "// Item 122's disaster units (V01 §3.16): view data — derived per commit, drawn frame, overlay and key, "
              "outside the document, its hash and the log", 1))
    E.append(('3.16-crisis-memo (VV12-r3-03, root cause)',
              "the head, or the history frame V06 §3.15.2 gives at a scrubbed week (§8.2). Memoised per commit, overlay "
              "and key:",
              "the head, or the history frame V06 §3.15.2 gives at a scrubbed week (§8.2). Memoised per commit, drawn "
              "frame, overlay and key:", 1))
    E.append(('3.16-campLand-memo (VV12-r3-03, root cause)',
              "on the ground arena's part 0 at every rung, memoised per commit. (1) The",
              "on the ground arena's part 0 at every rung, memoised per commit and drawn frame. (1) The", 1))
    E.append(('6-crisis-row-memo (VV12-r3-03, root cause)',
              "the units' facts built once per commit and shared by every overlay), memoised per commit, overlay and key; "
              "`campLand` ≤ 3 ms at the METROPOLIS cap (one pass over the hinterland's land-use faces within `camp.reachM` "
              "through the face index), memoised per commit |",
              "the units' facts built once per commit and drawn frame and shared by every overlay), memoised per commit, "
              "drawn frame, overlay and key; `campLand` ≤ 3 ms at the METROPOLIS cap (one pass over the hinterland's "
              "land-use faces within `camp.reachM` through the face index), memoised per commit and drawn frame |", 1))
    E.append(('1.2-v11-row-ref-form (END VEW-r3-01, form)',
              "crossings under arches (V01 §3.17.3, by §4.3's crossing rule)",
              "crossings under arches by §4.3's crossing rule (V01 §3.17.3)", 1))
    E.append(('1b-find-row-form (VV12-r3-03, form)',
              "| the model the view draws — the committed head, or at a drawn week whose frame is not the head V06 "
              "§3.15.2's frame (§2.9's `week`) —: its districts",
              "| the model the view draws (the committed head or, at a drawn week (§2.9's `week`) whose frame is not the "
              "head, V06 §3.15.2's frame): its districts", 1))
    E.append(('5.4-lead-form (VV12-r3-03, form)',
              "pure, draw-free functions of the key and of the model the view draws,\n"
              "over every layer — the committed head, or at a drawn week (§2.9's `week`) whose frame is not the head V06 "
              "§3.15.2's\n"
              "frame, as §11.2's *At a drawn week* reads it —, each row carrying its layer, memoised per commit, key and "
              "drawn frame,\n"
              "never stored.",
              "pure, draw-free functions of the key and of the model the view draws\n"
              "(the committed head or, at a drawn week (§2.9's `week`) whose frame is not the head, V06 §3.15.2's frame, "
              "as §11.2's\n"
              "*At a drawn week* reads it) over every layer, each row carrying its layer, memoised per commit, key and "
              "drawn frame,\n"
              "never stored.", 1))
    E.append(('5.4-3-form (VV12-r3-03, form)',
              "district, parish cell or residential plot the frame lacks is no unit (§11.2's *At a drawn week*) —, "
              "`catchmentOf`'s\n"
              "discs and cells read over that frame.\n",
              "district, parish cell or residential plot the frame lacks is no unit (§11.2's *At a drawn week*); "
              "`catchmentOf`'s\n"
              "discs and cells are read over that frame.\n", 1))
    E.append(('7-T-V1-59f-form (VV12-r3-03, form)',
              "its units only those the frame holds — the second district a gap, the third no gap, no district the split "
              "made a unit —; and",
              "its units only those the frame holds (the second district a gap, the third no gap, no district the split "
              "made a unit); and", 1))
    return E
