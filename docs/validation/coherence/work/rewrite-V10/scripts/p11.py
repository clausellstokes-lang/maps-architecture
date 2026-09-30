import sys; sys.path.insert(0,'scripts')
from ed import Ed
e=Ed('parts/11-s3-15-17.md')
e.R("""replace them at the clerk's milestone (item 487). The second fixture's transcript is written from J114's skeleton in
our own words and names (C10-65: the study-only reference, its name and its places appear nowhere under
`plat/tests/clerk/`):""","""replace them at the clerk's milestone (item 487). The second fixture's transcript is written from J114's skeleton in
our own words and names (the study-only reference, its name and its places appear nowhere under `plat/tests/clerk/`;
its inputs in `plat/tests/fixtures/known-city/K2/`, J-V12.58):""")
e.R("""streets and the straight road `raised`; `quarter` the six wards, the ravine quarter by V01's terraced-ward kind
  (pre-decided fallback until V01 names it: the residential kind, V01's `stepped` context row applying by
  slope); `place`""","""streets and the straight road `raised`; `quarter` the six wards, the ravine quarter as V01 §3.17.1 (2)'s terraced ward
  (a `quarter` with `fabric: 'stepped'` and `terrace: 'on'`, T-V1-54 — the form V09 §7.2's canvas script declares, so
  the two authoring paths agree, T101-6); `place`""")
e.R("""refusals come from the dry run (§5.2 F-EDIT with its actions and closest options, as `MsgRef`s) and are worded by that
`MsgRef` alone""","""refusals come from the dry run (§7.1's dry-run outcome table, which §5.2's F-EDIT row cites, with its actions and closest
options, as `MsgRef`s) and are worded by that `MsgRef` alone""")
e.R("""so the `dossier` row's engine cases, the `lock` row and the `rule` row add no English of their own (J-V10.94), and the `role` row renders `refuse.viewer`, the sentence every viewer declaration answers on the canvas
(V09 §2.10; SR4-04 (e), J-SS4.5);""","""so the `dossier` row's engine cases, the `lock` row and the `rule` row add no English of their own (J-V10.94), and the `role` row renders `refuse.viewer`, the sentence every viewer declaration answers on the canvas
(V09 §2.10);""")
e.R("""number in the column, kept when an alternative is retired (J-V10.102; the `dossier` row's (2), round 6) — and, where the clerk words the refusal itself,""",
"""number in the column, kept when an alternative is retired (J-V10.102) — and, where the clerk words the refusal itself,""")
e.R("""or asks for a new place of a class whose count a dossier record owns (`[[do:refuse:dossier:count:<id>]]`, J-V10.70); a roster line or a place by a locus that names no element (§7.1's roster rule) |""",
"""or asks for a new place of a class whose count a dossier record owns (`[[do:refuse:dossier:count:<id>]]`, J-V10.70); a roster line or a place by a locus that names no element (§7.1's dry-run outcome table, its roster row) |""")
e.R("""for a roster line or a place by a locus naming no element, `refuse.roster.dossier`'s element picker — the dossier's unplaced elements (§7.1's roster rule), each a `propose` re-previewing the line with its `element` (V10 §4.1's `element` row), worded by that button with the element's admitted name (V10 §3.5 step 3; the former own alternative (2) is retired, since the row's own button now words it) — and its **Put it at {site}**, the same place on the first candidate with no `hardFails` of V10 §4.1's dossier-alternative `sites` query (V09 §4.5's, one text for canvas and clerk; XV-V9-19 (b)),""",
"""for a roster line or a place by a locus naming no element, `refuse.roster.dossier`'s element picker — the dossier's unplaced elements, each a `propose` re-previewing the line with its `element` (V10 §4.1's `element` row), worded by that button with the element's admitted name (V10 §3.5 step 3; own alternative (2) is retired, the row's own button wording it) — and its **Put it at {site}**, the same place on the first candidate with no `hardFails` of V10 §4.1's dossier-alternative `sites` query (V09 §4.5's, one text for canvas and clerk),""")
e.R("""| `rule` | an F-EDIT that is neither dossier-owned nor a lock and that the dry run does not bend (a kept record in the way, a staged layer, the rung, a warp or new water reaching a held record, an undo's dependence, an assignment holding the target) — a placement no plot fits, one over its disruption budget, an occupied join or split and an invalid value are bends, below (file f item 582; J-VI.30) | the engine's `MsgRef` — V09 §4.9's `refuse.*` row for the code (`refuse.kept`, `refuse.staged`, `refuse.islandsRung`, `refuse.warp`, `refuse.water`, `refuse.undo.*`, `refuse.assigned`) — as its sentence |""",
"""| `rule` | every other refusal or conflict of §7.1's dry-run outcome table — neither dossier-owned nor `refuse.locked` — and §7.8's disabled control a declaration meets (`refuse.islandsRung`); everything else infeasible is a bend (below; item 582; J-VI.30) | the engine's `MsgRef` — the key the table's row names, V09 §4.9's `refuse.*` row for it — as its sentence |""")
e.R("""| `role` | a viewer asks for a change (every declaration tool answers `role`, V09 §2.10) | the engine's `MsgRef` — V09 §4.9's `refuse.viewer` (J-SS4.5) |""",
"""| `role` | a viewer asks for a change (every declaration tool answers `role`, V09 §2.10) | the engine's `MsgRef` — V09 §4.9's `refuse.viewer` |""")
e.R("""| `key` | the key is missing, not valid, out of credit, or not permitted the model (V10 §3.19) | "That key isn't valid." · "Your Anthropic account has no credit left." · "This key can't use the assistant's model." | (1) "Change the key" (`openSettings`) |
| `offline` | no connection, or the provider unavailable | "The assistant is offline; every tool still works." | — |""",
"""| `key` | the key is missing, not valid, out of credit, or not permitted the model (V10 §3.19) | "That key isn't valid." · "Your {provider} account has no credit left." (`{provider}` the provider the deployment's AI configuration names, J121) · "This key can't use the assistant's model." | (1) "Change the key" (`openSettings`) |
| `offline` | no connection, the provider unavailable, or the clerk unreachable (a turn's gate or a clerk error turn, V09 §3.14) — one row for all (E-32: `error.clerkOffline` is retired) | "The assistant is offline; every tool still works." | — |""")
e.R("""**The dry run's bends** (**J-VI.4**, **J-VI.30**: item 101 R2 — a declaration is refused only
where it contradicts a dossier fact or a lock, and every other infeasible one is bent). Every `bend.*` row of V09 §4.9 —
item 110's (`bend.raised.island`, `bend.aqueduct.uphill`, `bend.retaining.rim`, `bend.stack.*` and the rest of V09
§4.20's, formerly `refuse.*`), file f item 582's (`bend.place.noSite`, `bend.place.overBudget`, `bend.vacate`),
`bend.invalid`'s clamp and every other — reaches the model and the card as the item's `bent` line""",
"""**The dry run's bends** (§7.1's dry-run outcome table; J-VI.4, J-VI.30: item 101 R2 — a declaration is refused only
where it contradicts a dossier fact or a lock, and every other infeasible one is bent). Every `bend.*` row of V09 §4.9 —
item 110's (`bend.raised.island`, `bend.aqueduct.uphill`, `bend.retaining.rim` and the rest of V09 §4.20's), the
massing, tier, stack and deck bends under V02 §1b's ids (V02 owns them; V02 X22), V05 §4.2's island and access bends
(`bend.island.*`, `bend.access.*`, `bend.raised.hoist`, `bend.wall.drop` and the `onIsland` rows), V06 §4.1's
`bend.epoch.hood` ("a neighbourhood alone has no history yet; open it in its town to advance time", for `advance` on a
standalone neighbourhood document), item 111's `bend.oasis.sky` (V09 §4.21 (6)), item 582's (`bend.place.noSite`,
`bend.place.overBudget`, `bend.vacate`), `bend.invalid`'s clamp and every other — reaches the model and the card as the
item's `bent` line""")
e.R("""item 372's dug-access rule qualifies (as
reconcile-V09-r2 widened it; V09 §4.17.4), each a `propose` of the group""","""item 372's dug-access rule qualifies (V09 §4.17.4), each a `propose` of the group""")
e.R("""such as "Draw a road to its foot" for `bend.raised.island` (V09 §4.20.2 (6); J-VI.4 (d)) and "Stairs along the
front" for `bend.stack.internalSolid`. A `show` button""","""such as "Draw a road to its foot" for `bend.raised.island` (V09 §4.20.2 (6); J-VI.4 (d)). A `show` button""")
e.R("""`dossier` refusal unless the thing is dossier-declared: a dossier-backed element becomes `rejectSite` (§7.2) and the card
says so, and a generated raised way whose reason read a dossier record is generated content and is removed (V08
C8-42).""","""`dossier` refusal unless the thing is dossier-declared: a dossier-backed element becomes `rejectSite` (§7.2) and the card
says so, and a generated raised way whose reason read a dossier record is generated content and is removed (V08 §4.1).""")
e.R("""| **C — the host's own clerk** | the host's assistant | the host's own arrangement; it drives the map over the bridge with `query` and `preview` (§11.3, V08 §4.4) | the host | SettlementForge (V08 §4.4) or any host with an assistant |""",
"""| **C — the host's own clerk** | the host's assistant | the host's own arrangement; it drives the map over the bridge with `query` and `preview` (§11.3, V08 §4.4) | the host | SettlementForge's module (J121, J122; V08 §4.4) or any host with an assistant |""")
e.R("""**Selection** (item 473). In host mode""","""**Which configuration** (J121, J122). A deployment's AI configuration chooses it; the design decides no provider, model
tier, key path or relay (V10 §11 Q1–Q3). In the SettlementForge module SettlementForge's AI setup decides, and J122
chose C: SettlementForge's assistant drives the map's tool API through the host seam, and the built-in clerk (A or B)
runs there only where that setup's `clerk.config` enables it (V08 §4.4 (6)). A and B serve the standalone product and
generic hosts.

**Selection** (item 473). In host mode""")
e.R("""reason "this build cannot reach the assistant" (in A). CVR-V10-3 and CVR-V10-4 carry the rows to V08 and V09; T-V10-20
runs under both policies.""","""reason "this build cannot reach the assistant" (in A). V08 §3.1 (the embed) and V09 §6.2 (the standalone page) list the
origins so; T-V10-20 runs under both policies.""")
e.R("""`client` — the platform has no server-side fallbacks (the skill names Amazon Bedrock, Vertex AI and Microsoft Foundry),""",
"""`client` — the platform has no server-side fallbacks (Amazon Bedrock, Vertex AI and Microsoft Foundry among them),""")
e.R("""`raised` (ends as ids), `terraces` without `stepMaxM`, `decks`, `landmarks`, `layers` (the underground systems without bearings), `dossier`, `report`, `counts`, `salts` (numbers only) |""",
"""`raised` (ends as ids), `terraces` without `stepMaxM`, `decks`, `landmarks`, `layers` (the underground systems without bearings), `history`, `dossier`, `report`, `counts`, `salts` (numbers only) |""")
e.R("""V08's T-V8-27 fixture list carries these kinds, `rule` and `profile` among them, and the three refused kinds (met); T-V10-20 cites it.""",
"""V08's T-V8-27 fixture list carries these kinds, `rule` and `profile` among them, and the three refused kinds; T-V10-20 cites it.""")
e.R("""assistant directly") and offers configuration B to hosts; and `plat clerk <doc>` is built at C5 in the Node command line
(the base's second runtime target, §2), costed at +0.5 pw:""","""assistant directly") and offers configuration B to hosts; and `plat clerk <doc>` is built at C5 in `@plat/cli` (§14), the
Node command line (the base's second runtime target, §2), costed at +0.5 pw:""")
e.R("""through the CLI's own document path with the same log (every accepted event `proposedBy: 'clerk'`). The relay question
stays the owner's (section 11 Q1).""","""through the CLI's own document path with the same log (every accepted event `proposedBy: 'clerk'`). A relay for a host is
its AI setup's (J121; V10 §11 Q1).""")
e.save()
