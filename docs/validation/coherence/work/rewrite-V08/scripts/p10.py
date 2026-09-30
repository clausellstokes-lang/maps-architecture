import sys; sys.path.insert(0,'scripts')
from ed import Ed
e=Ed('parts/10-s3-5.md')
e.R("""   `institutions` an array, `_seed` present); a""","""   `institutions` an array, `_seed` present, `history.age` a finite number ≥ 0, V08 §2.6c); a""")
e.R("(research mapping row 46: 2 585 of 3 381 processor names join","(2 585 of 3 381 surveyed processor names join")
e.R("""| settlement | — (a different settlement key refuses the absorb, `E_OTHER_SETTLEMENT`) | — | `population` → `population`; `tierWord` → `tier` (F8); `name` → `rename` (the title only) |""",
"""| settlement | — (a different settlement key refuses the absorb, `E_OTHER_SETTLEMENT`) | — | `population` → `population`; `tierWord` → `tier` (F8); `name` → `rename` (the title only) |
| wealth (the settlement fact's `wealth`, W-DOS-02) | — | — | `wealth` → `prosperity` (F9): response `epoch` — the next epoch's `EpochInputs.wealthLevel` through `tables/dossier/wealth`, which DR6's field reads (item 102 (e)'s drift; V06 W27), never a re-roll at the absorb |
| site (the `site` singleton, W-DOS-08) | — | — | any word → `attr` with cause `frozen`, response `none` (row F-V8-8): the site is creation's (§7.7 *One path*; §7.7 DR1's bar is a creation bar), so no map event; one `frozen_fact_changed` note (class `report`) names the changed word — the DM may make a new map from the record (V08 §4.2) |
| history (the `history` singleton, W-DOS-08) | — | — | its digest → `attr` with cause `frozen`, response `none` (F-V8-8): the recipe's history is creation's (V08 §2.6c (6)); one `frozen_fact_changed` note (class `report`) offers "Regenerate from the new history" — V08 §4.2's "Make a new map from the record" (V06 §3.20.8); nothing re-runs silently |""")
e.R("""A field whose carried and new values are equal after the digest's rounding makes no change. A change whose only effect
is on facts no rule reads (a notable's importance) is still a change: it updates `carried` through the ledger event
(V08 §3.6 (4)) and the report, and emits no map event.""","""A field whose carried and new values are equal after the digest's rounding makes no change. A change that moves nothing
on the map (a notable's importance, read only by the host projection's people order, V08 §5.4 (3)) is still a change: it
updates `carried` through the ledger event (V08 §3.6 (4)) and the report, and emits no map event.""")
t=e.t
a=t.index("**The chains' links (item 105 (i); DR33).**")
b=t.index("A processor that joins nothing binds nothing")
e.t=t[:a]+"""**The chains' links (item 105 (i); §7.7 DR33).** SettlementForge's chains become links of item 105's supply web
between the bound members; the links are DERIVED at every placement and epoch by the base's web (item 105 (a): never
stored), read from the carried `chain` and `dependency` facts; the port stores only the facts (bar T-V8-35). """+t[b:]
t=e.t
a=t.index("**The latitude row (item 102; item 391).**")
b=t.index("SettlementForge usually places a settlement on its realm map")
e.t=t[:a]+"""**The latitude row (item 102; item 391).** Item 102's daylight share reads the path sun at the settlement's latitude; a
dossier gives none, so the port derives it by §7.7's DR29 — the realm block's `cell.latDeg`, else the culture's row of
`tables/dossier/cultures`, else 50° N — written into `Intent.latitudeDeg` at creation; a latitude that arrives or
changes later is a `port-values` change carried into the next epoch's slice (`PortValues.latitudeDeg`, V08 §2.5's
resolution rule), read by V05's model sampler and §8.4's path mode (bars T73-7, T-V8-22).

"""+t[b:]
e.R("(research s §4, C-9)","(`research/sf/dossier-seam.md` §4, C-9)")
e.R("a sunnier quarter slowly improves (J-V8.34 revised).","a sunnier quarter slowly improves (J-V8.34).")
e.save()
