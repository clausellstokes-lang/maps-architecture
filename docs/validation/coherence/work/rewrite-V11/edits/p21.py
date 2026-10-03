from helper import build, src
from sanitize import sanitize
import sys
text = src(4188, 4303)
R = []
def r(a, b, c=1): R.append((a, b, c))

# milestone table
r("""the reader check and the recorded-read suite (SCC-R1C-1); the ninety-two registry rows, 86–91 included (SCC-R1C-3, SCC-R3C-4); T-V11-1, 3, 9, 10 | a compile of the M1 tables byte-identical on two hosts; T-V11-1 (a) and (b) green over the base's stages; `plat calibrate register --check` runs in CI from here (V12 T-V12-20) |""",
  """the reader check and the recorded-read suite; every registry row (V11 §3.1; the count read from `REGISTRY`), the base settings row (row 93) with its values; T-V11-1, 3, 9, 10 | a compile of the M1 tables byte-identical on two hosts; T-V11-1 (a) and (b) green over the base's stages; `plat calibrate register --check` joins CI at M1 (V12's T-V12-20) |""")
r("""| B-CITY's M1 gate on these rows; the register green over them (below) | 2.0–2.5 pw | M1 (inside the content line) |""",
  """| B-CITY's M1 gate on these rows; the register green over them (below) | 2.0–2.5 pw | M1 (inside the content line) |
| C1b — item 111's rows | the climate rows' dry-country cells (V11 §3.17.1), the `garden` land-use row, the water table's well yields (V11 §3.24.6); item 111's off form in V11 §3.24.0 | T-V11-38 (a), (b) at M1, (c) and the base's T111 bars at M2b with the prosperity water term; the register green (below) | 0.25–0.5 pw | M1 (the oasis and the water pull) and M2b (the prosperity term) |""")
r("""| 2.0–3.0 pw | M2b (inside the content line + BCR-V11-11) |""", """| 2.0–3.0 pw | M2b (inside the content line; items 532, 568) |""")
r("""(item 110 (e)'s second fixture and V02's tier and deck construction ship there, BCR-V2-39) |""",
  """(item 110 (e)'s second fixture and V02's tier and deck construction ship there, item 229) |""")
r("""| T-V11-23 – T-V11-26 (compile), T-V11-24 (bench); the register green (below) | 0.75–1.0 pw | the underground layer's milestone (M6-U, J-VI.22), reviewed with V04's U3 |""",
  """| T-V11-23 – T-V11-26 (compile), T-V11-24 (bench); the register green (below) | 0.75–1.0 pw | the underground layer's milestone (M6-U, J-VI.22), reviewed with V04's U3 |
| C9 — item 113's rows | V11 §3.25: the settings row and the event-to-epoch rows; item 113's off form in V11 §3.24.0 | T-V11-39 on the H-HISTORY fixtures with V06's replay (T-V6-70); the register green (below) | 0.25 pw | M6-E, with V06's E9 (the history replay at generation) |""")
r("""| **total** | | | **12.25–17.0 pw** | ≈ 8–10.5 inside §16's content line (10.5–14.5, which also prices presets, symbols and textures); **+4.0–6.25 pw** for file g's rows (items 103–110: the g share of C2 and C4, and C3b and C8), BCR-V11-11 |""",
  """| **total** | | | **12.75–17.75 pw** | ≈ 8–10.5 inside §16's content line (10.5–14.5, which also prices presets, symbols and textures); **+4.5–7.0 pw** for the owner items' rows (items 103–113: their share of C2 and C4, and C1b, C3b, C8 and C9; items 532, 568) |""")
# register paragraphs
r("""**The non-g tables' entries** (reconciliation round 3, SCC-72; J-V11.76). V12 §3.11's lines cover file g's rows (items
102–110). The tables C1, C3 and C7 land outside file g take""",
  """**The other tables' entries** (J-V11.76). V12 §3.11's lines cover the owner items' rows (items 102–113). The tables C1,
C3 and C7 land outside them take""")
r("""(reconciliation round 4,
SCC-75; J-V11.78; X-V12-15)""", """(J-V11.78; V12 X-V12-15)""")
r("""(V12 §2.1's `PresetArm`: the recipe with no parity preset; SCC-R1C-5, X-V12-15)""",
  """(V12 §2.1's `PresetArm`: the recipe with no parity preset)""")
r("""(row 24; the base's calibrate-later, §4.7 S10b)""", """(row 24; the base's provisional cell, §4.7 S10b)""")
# presets paragraph
r("""**The preset entries** (SCC-51; J-V11.74). The source type admits all five `PresetId` keys from C0 (`NG` by reconciliation round 4's continuation, SCC-R3C-2), so no later schema change
is needed.""", """**The preset entries** (J-V11.74). The source type admits all five `PresetId` keys from C0, so no later schema change is
needed.""")
r("""(V07 §8 as SCC-79 sets it: V-M0's exit already runs under `VG`, and V-M1 ships the
request mapping; round 4, SR3-07, J-V11.79) — in the change that ships that file (file f item 377),""",
  """(V07 §8: V-M0's exit already runs under `VG`, and V-M1 ships the request mapping; J-V11.79) — in the change that
ships that file (item 377),""")
r("""growing with them (V07 §3.15 (3), J-V7.123; seam-content-calibration-r2's SCC-R2C-12, V11's half, outside this round's
brief; J-V11.87).""", """growing with them (V07 §3.15 (3), J-V7.123; J-V11.87).""")
r("""in the change that ships the `FM` preset file
(file f item 376),""", """in the change that ships the `FM` preset file
(item 376),""")
r("""written by the seat landing V01's **M5** (W17; V1-3.15) in the change that ships the `NG`
preset file (V01's BCR-46);""", """written by the seat landing V01's **M5** (V01 §3.15) in the change that ships the `NG`
preset file (item 584);""")
# readers paragraph
r("""registered `stage` (V6 §2.1's `EpochParticipant.stage`;""", """registered `stage` (V06 §2.1's `EpochParticipant.stage`;""")
r("""— a base change request's application included (BCR-V3-12, BCR-V3-26,
BCR-V3-32, V01's BCR-4 among them) —""", """— a base item's application included (items 233, 230, 241, 578 and 294 among them) —""")
r("""ship their rows with V01's M2b pieces (V1-8.1: the way-surface rule, BCR-6, and S7b (3)'s quota, BCR-32),""",
  """ship their rows with V01's M2b pieces (V01 §8.1: the way-surface rule, item 207, and S7b (3)'s quota, item 301),""")
r("""V09's shell (BCR-V9-8 = file f item 516, BASE M1–M3b),""", """V09's shell (item 516, BASE M1–M3b),""")
# display / span paragraph
r("""the 45 family icons with V09's glyphs (X-V11-17 (a));""", """the 45 family icons with V09 §5.1's glyphs;""")
r("""are written at C3b by the seat landing BCR-45 at M3a, with their register entries""",
  """are written at C3b by the seat landing item 244's base side at M3a, with their register entries""")
# dependencies and risks (F-V11-1 as decision)
r("""C2 needs the base's solver with file g's
terms (the coherence pass's text) and the §13.2 bench;""", """C2 needs the base's solver with the owner items'
terms and the §13.2 bench;""")
r("""(R7) the ladder lessers of the twelve file pairs V08's re-check did not list — the ladder cross-check
(T-V11-2) fails the build until C4 writes them from the committed `ladderPairs`. C3b depends on the coherence pass's
item-110 records""", """(R7) the ladder lessers of the twelve remaining file pairs — written at C4 from the committed `ladderPairs`
(J-V11.105), the ladder cross-check (T-V11-2) failing any build that lacks one. C1b depends on the base's oasis and
water pull (§4.2 S0–S3); C9 on V06's replay engine (V06 §3.20). C3b depends on the base's
item-110 records (items 244–246)""")

for old, new, c in R:
    n = text.count(old)
    if n != c:
        print('COUNT', n, '!=', c, old[:150]); sys.exit(1)
    text = text.replace(old, new)
text = sanitize(text)
build('21-s8', None, [], mid=text)
