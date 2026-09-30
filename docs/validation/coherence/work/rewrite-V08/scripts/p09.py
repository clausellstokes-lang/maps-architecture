import sys; sys.path.insert(0,'scripts')
from ed import Ed
e=Ed('parts/09-s3-1-4.md')
e.R("is unchanged (research: C-10, E-8).","is unchanged.")
e.R("""creates one `<iframe>` with `src = moduleOrigin + embedPath + '#p=2'`,""","""creates one `<iframe>` with `src = moduleOrigin + embedPath + '#p=2&lang=' + locale` (the origin and the
   language SettlementForge's, `MapHostConfig`, J121),""")
e.R("""none under C (SettlementForge's own assistant, the
   default recommended here) and under `off`;""","""none under C (SettlementForge's own assistant; follows
   SettlementForge, J121/J122) and under `off`;""")
e.R("7. **Bridge to the shell** (V9 XV-V9-17; J-V9.81).","7. **Bridge to the shell** (J-V9.81).")
e.R("""(V09 §3.14 (b); J-V9.97; XV-V9-24) (the tab's status
   banner is SettlementForge's own, V08 §5.1's table; V9 XV-V9-20);""","""(V09 §3.14 (b); J-V9.97) (the tab's status
   banner is SettlementForge's own, V08 §5.1's table);""")
e.R("""a `host.*` row, V08 §13
   X12);""","""a `host.*` row, V08 §4.6);""")
e.R("`historyLines` (V09 §2.2; XV-V9-21) —","`historyLines` (V09 §2.2) —")
e.R("(research: g§8.1).","(`research/sf/dossier-generation.md` §8.1).")
e.save()
