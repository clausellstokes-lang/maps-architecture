import sys; sys.path.insert(0,'scripts')
from ed import Ed
e=Ed('parts/14-s5-6.md')
e.R("""| a small "AI" tag beside the count badge (item 518 adds `source: 'clerk'` to the ghost's delivery); the same style role as the badge,""",
"""| a small "AI" tag beside the count badge (the ghost's delivery carries `source: 'clerk'`, §8.2); the same style role as the badge,""")
e.R("""one but `select`, where it is optional; its sources V10 §2.6's comment names; a `propose` action previews first, like any proposal);""",
"""one but `select`, where it is optional; its sources this section's *The keys of the drawer's words*; a `propose` action previews first, like any proposal);""")
e.R("""{n} other changes", drawn as V09's fates sheet draws them), the findings,""","""{n} other changes", drawn by V09, V09 §4.11), the findings,""")
e.R("""**The keys of the drawer's words** (for V09 §4.9's table of volume 10's families),
each `en` text written once where its key stands: `clerk.alt.*` — `clerk.alt.<category>.<n>` (V10 §3.16's alternatives
column), `clerk.alt.help.useTool` and `clerk.alt.history.fork`, `.rerun`, `.undo`, `.rebuild` (V10 §3.13 step 4),
`clerk.alt.critique.fix` (V10 §3.10) and `clerk.alt.stale.retry` (V10 §3.11); the notices `clerk.view.cleared` (V10 §3.12
(6)) and `clerk.applied` (V10 §4.4); and `refuse.clerk.dossier.count` beside `refuse.clerk.<category>` (V10 §3.16). A
button made from a V09 §4.9 row keeps that row's own words, its `MsgButton.key` (V10 §3.5 step 3).""",
"""**The keys of the drawer's words** (for V09 §4.9's table of volume 10's families), each `en` text written once where its
key stands: `clerk.alt.*` — `clerk.alt.<category>.<n>` (V10 §3.16's alternatives column), `clerk.alt.help.useTool`,
`clerk.alt.history.rerun` and `.rebuild` (V10 §3.13 step 4), `clerk.alt.critique.fix` (V10 §3.10) and
`clerk.alt.stale.retry` (V10 §3.11); the notices `clerk.view.cleared` (V10 §3.12 (6)) and `clerk.applied` (V10 §4.4);
`refuse.clerk.dossier.count` beside `refuse.clerk.<category>` (V10 §3.16); and the oracle's rows `info.raised.<outcome>`
(V10 §3.9), `info.water.<row>` (V10 §3.9), `info.history.<row>` (V10 §3.9b) and the `underground` and `crypt` rows'
`info.under.*`, `info.catacomb.*` and `info.crypt.*` (V10 §3.9a; `info.under.cause.<rule>`, `info.under.lost` and
`info.catacomb.blocked.<cause>` are worded by V09). The fork and undo buttons use V09 §4.9's shared rows `button.openCopy`
and `button.undo`. A button made from a V09 §4.9 row keeps that row's words by V09 §2.9's *Words* (a list entry by its
`each`, a dry-run action by its `msg`; V10 §3.5 step 3).""")
e.R("""Every row states TOWN, CITY and METROPOLIS; a METROPOLIS value is at most 2.5 × CITY's (the rung's building count over
CITY's, capped), measured by T-V10-8 and T-V10-22.""","""Every row states TOWN, CITY and METROPOLIS, and THORP, HAMLET and VILLAGE take TOWN's; a METROPOLIS value is at most 2.5 ×
CITY's (the rung's building count over CITY's, capped), measured by T-V10-8 and T-V10-22.""")
e.R("""| the brief's item-110 lines (`raised`, `terraces`, `decks`) | ≤ 1 ms | ≤ 2 ms | ≤ 5 ms | T-V10-8 |""",
"""| the brief's item-110 lines (`raised`, `terraces`, `decks`) | ≤ 1 ms | ≤ 2 ms | ≤ 5 ms | T-V10-8 |
| the brief's history line (item 113) | ≤ 1 ms | ≤ 1 ms | ≤ 2 ms | T-V10-46 |
| `query why` on the `HistoryRecord`, one page of `past` rows (the epochs' targets read from the log) | ≤ 5 ms | ≤ 10 ms | ≤ 25 ms | T-V10-46 |
| the water rows for one subject (item 111) | ≤ 3 ms | ≤ 5 ms | ≤ 12 ms | T-V10-45 |""")
e.R("""rung), of which the item-110 lines ≤ 150 at METROPOLIS; the vocabulary block ≤ 500;""","""rung; THORP, HAMLET and VILLAGE read TOWN's), of which the item-110 lines ≤ 150 at METROPOLIS and the history line ≤ 60;
the vocabulary block ≤ 500;""")
e.R("""brief's own caps (landmarks by significance first; vocabulary rows beyond the cap dropped and listed in "What the clerk
sees").""","""brief's own caps (landmarks by significance first; vocabulary rows beyond the cap dropped and listed in "What the
assistant sees").""")
e.R("""Per request (J-V10.53's metering, the skill's caching economics):""","""Per request (J-V10.53's metering; the provider's caching prices):""")
e.R("""fallback:** a route whose measured p50 exceeds its estimate by more than 25 % drops one effort level if the evaluation's
pass bars hold at the lower level; otherwise the measured cost is put to the owner (section 11 Q3). The cache is checked
by T-V10-28.""","""fallback:** a route whose measured p50 exceeds its estimate by more than 25 % drops one effort level if the evaluation's
pass bars hold at the lower level; otherwise a cheaper model tier is evaluated by V10 §7.3's staged spend before any
switch, the switch itself the deployment's AI configuration's (J121; V10 §11 Q3). The cache is checked by T-V10-28.""")
e.R("""line (the wait made legible), and the provider's faster, dearer mode is put to the owner (section 11 Q3). §13.4's session
measures whether previews feel slow (V10 §4.4's setting is the answer).""","""line (the wait made legible); the provider's faster, dearer mode is an input of the deployment's AI configuration (J121;
V10 §11 Q3), never switched by the design. §13.4's session measures whether previews feel slow (V10 §4.4's setting is the
answer).""")
e.save()
