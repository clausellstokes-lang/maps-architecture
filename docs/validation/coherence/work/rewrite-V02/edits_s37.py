E=[
("""**Façade bays (`facadeBays`, the one rhythm every reader shares; item 406).** For a wing and one of its ring sides — every
side since reconciliation round 1 (J-V2.93). **On an eave side** the **usable run** is the side's length less `endMarginM` (1.2 m; the constants row, the only place it lives) at each end,
less the projection onto the side of every tower ring, block and other wing that meets or overlaps it, each widened by
0.6 m, less the reach of each valley that ends on that side — **computed here, in integer centimetres, by §6.5's
arithmetic**: for a wing `X` whose ridge meets the roof of a wing `Y`, `e = ⌊(X.ridgeCm − Y.eaveCm) × Y.halfSpanCm ÷
Y.riseCm⌋` (`halfSpanCm` half of `Y`'s span, `riseCm = Y.ridgeCm − Y.eaveCm`), never read from the float64 roofscape
(J-V2.25), so the bays and the dormer positions are byte-identical on every host (T-V2-13). The run""",
"""**The valley's reach (`valleyReach`, stated once; E-27).** Where a wing `X`'s ridge meets the roof of a wing `Y` (a
`valley` end, V02 §5.2 step 1), the valley reaches into `Y`, in plan, the distance at which `X`'s ridge meets `Y`'s near
roof plane: `valleyReach(X, Y) = (X.ridgeCm − Y.eaveCm) × Y.runCm ÷ Y.riseCm`, where `Y.riseCm = Y.ridgeCm − Y.eaveCm`
and `Y.runCm` is the plan distance across `Y` from its eave to its ridge line — half its span for a `gable` or `hip` roof,
its whole span for a `shed` (whose ridge stands at `high`). It has two arithmetic modes. **`'int'`** — integer
centimetres by §6.5's arithmetic, floored (`⌊…⌋`) — is the one `facadeBays` reads, so the bays and the dormer positions
are byte-identical on every host (T-V2-13; J-V2.25: the bays never read the float roofscape). **`'float'`** — float64,
view data — is the one the roofscape extends a `valley` ridge by (V02 §5.2 step 2). For a `gable` or `hip` `Y` both modes
are the two expressions the bays and the roofscape used before this statement; for a `shed` `Y` the integer mode reads
the shed's full run, as the roof plane does (the two expressions disagreed there; T-V2-54).

**Façade bays (`facadeBays`, the one rhythm every reader shares; item 406).** For a wing and any of its ring sides
(J-V2.93). **On an eave side** the **usable run** is the side's length less `endMarginM` at each end, less the projection
onto the side of every tower ring, block and other wing that meets or overlaps it, each widened by 0.6 m, less
`valleyReach(X, Y, 'int')` of each valley that ends on that side. The run"""),
("""plan rung's windows on every side (V03's W2: "On every side of every wing, V02's `facadeBays(wing, side, bayM)`";
§2.6 step 6; reconciliation round 3, S23R2-07), by""","""plan rung's windows on every side (V03's W2; §2.6 step 6), by"""),
("""**Decorative chimneys on exposed roof only (second revision, V2C-55 (1)).**""","""**Decorative chimneys on exposed roof only.**"""),
("""(so the rung reads only its building's plot, V2
§3.11):""","""(so the rung reads only its building's plot, V02
§3.11):"""),
("""where the class's `RoomProgramRow` with a `hall` rule is loaded (V03's rows, from M6-P's P1); before those rows land
   (M6b) the hall is clamped by `[1.4w, length − 2 m]` alone and reported per building (`hallUnclamped`; reconciliation
   round 1, S23-38; J-V2.95).""","""where the class's `RoomProgramRow` carries a `hall` rule (V03's rows, which P1 ships after M4, before M6 — J122's
   order); a class whose programme row carries none keeps the clamp `[1.4w, length − 2 m]` alone, reported per building
   (`hallUnclamped`; J-V2.95)."""),
]
