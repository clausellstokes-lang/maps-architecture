E=[
("""// V02 §3.7: every side since reconciliation round 1; integer centimetres only (its valley reaches computed by §6.5's arithmetic, never read from the float roofscape); implemented""",
"""// V02 §3.7: every ring side; integer centimetres only (its valley reaches by valleyReach's 'int' mode, never read from the float roofscape); implemented"""),
("""declare function dormerPositions(""","""declare function valleyReach(x: BaseWing, y: BaseWing, mode: 'int' | 'float'): number;   // V02 §3.7 (E-27): the plan reach of the valley where x's ridge meets y's roof; 'int' for facadeBays (cm, byte-identical), 'float' for the roofscape (float64, view data)
declare function dormerPositions("""),
("""; called by §2.6's basement function (item 238, item 226)""","""; called by §2.6's basement function (items 238, 226)"""),
]
