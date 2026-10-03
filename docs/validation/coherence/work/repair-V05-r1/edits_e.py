# Edits E: line reflows where an inserted clause left a short line (layout only, no word changed).
EDITS = []
def E(tag, old, new, count=1):
    EDITS.append((tag, old, new, count))
E('reflow T-V5-12', """  draws over the landfall's members; a
  strip with no three-sample cell draws no outline.""", """  draws over the landfall's members; a strip with no three-sample cell draws no outline.""")
E('reflow T-V5-19', """written by the M6-sky seat landing P1; (d) the strip identical on the five
  engines; (e) an island""", """written by the M6-sky seat landing P1; (d) the strip identical on the five engines;
  (e) an island""")
E('reflow T-V5-22', """  with a ground supply edge stand at a mean
  route distance to their providers below that under random placement on the island; (d) the ground's suppliers of island""",
"""  with a ground supply edge stand at a mean route distance to their providers below that under random placement on the
  island; (d) the ground's suppliers of island""")
E('reflow T-V5-27', """  item 110:** 0 island `RetainingWall`s classed as
  an `Enceinte` or a member of a barrier circuit; a T3""", """  item 110:** 0 island `RetainingWall`s classed as an `Enceinte` or a member of a barrier circuit; a T3""")
E('reflow §8 deps', """provider until then); P6's comfort-level runs need V12 §3.15.9's wait timer and V06 §6.8's estimate; P4 and P5 after P2;
P6 after P4. **Risks, in order:** the
two-surface light pass's frame cost (P3; fallback: half resolution, then rung 3 for the sky base); the field's power to""",
"""provider until then); P6's comfort-level runs need V12 §3.15.9's wait timer and V06 §6.8's estimate; P4 and P5 after P2;
P6 after P4. **Risks, in order:** the two-surface light pass's frame cost (P3; fallback: half resolution, then rung 3 for
the sky base); the field's power to""")
