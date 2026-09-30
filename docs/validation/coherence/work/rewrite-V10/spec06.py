R = [
("""T9's escape-hatch list (V09 §4.3's ways row after SR-27)""", """T9's escape-hatch list (§7.1's binding table, its ways rows)"""),
("""(none offered for a contextual tool's `subject` button with no such address)""",
"""(none offered for a `subject` button whose row has no such address)"""),
("""the lexicon's thorp, hamlet and village values reach `size.population`""",
"""the lexicon's thorp, hamlet and village words reach `size.population` as those rungs' default targets, and every size
word as V09 §4.5's quantile — the population V09's chip gives for the same word (J-V10.118)"""),
("""in `toolkit.json` | PR |

### 7.2 Cassettes and replay""",
"""in `toolkit.json` | PR |
| T-V10-45 | item 111's explanations and forms: on arid fixtures — an oasis the arid row laid, one a dossier's `oasis_water` made (DR40) and one drawn by T2's spring flag — `why` on each names its source (tiers `map`, `dossier`, `declared`), its grove and gardens and its `spring.flow`; the prosperity `drivers` of the quarter by the water carry the water term (`why.driver.water`) and `climateSun` 0 or negative in the hot arid row, 1 in a temperate one; a district's `cause` names the water pull on the arid site only; `ground { op: 'lake', spring: true }` and V09 §4.21.1's toggle give one `drawWater`, byte for byte; the brief marks the biome arid and the lake `spring`; with item 111's cells at their no-op values (V12's NoOpPin) the brief, the reads and the why goldens are byte-identical | PR |
| T-V10-46 | item 113's story: on the city-to-village fixture, a refounded fixture and a symbolic-peak fixture, the `history` section gives the peak, the replay epoch that laid the walls with its rung and population, each destruction and refounding and each buried system, each row's key a `report.history.<line>` row that V09's "What its past left" also shows; on the symbolic fixture no answer or card states a population for the peak, a scripted reply stating one is marked *unsupported*, and the words say the size is not recorded; a `lost` cluster answers `lost` with its closing at the key that admitted it while accessible; `intend { history }` gives V09's **History** chip's events byte for byte and is refused `dossier` on a dossier history; with the replay off every golden is byte-identical; the budget of V10 §6.1 | PR |
| T-V10-47 | item 114's walls: on fixtures with runs `standing`, `worn`, `patched`, `breached` and `dismantled`, at generation and after V06's epochs, `why` on the enceinte words each run's state, material and year (`info.wall.run`), the generation-time reason from §7.7's condition row and, with V06, its last change; the brief counts the runs by state; `wall { op: 'repair' \\| 'wear' }` gives V09 §4.21.4's **Repair** (each material), **Wear** and **Back in use** events byte for byte; a patch asked on a `worn` run is written robust with `info.wall.patchOnlyGap`; a repair of a `dismantled` run carries `bend.wall.newStretch` | PR |
| T-V10-48 | item 115's ceiling: at THORP, HAMLET and VILLAGE a clerk declaration above the ceiling (a tower on a farmhouse, a second manor) commits as asked, its card carrying `info.grand.beyondTier` exactly when V09's canvas card for the same events does, and a dossier-named grand building `info.grand.dossier`; at TOWN and above no line shows; "why are the farmhouses plain?" names the ceiling row by its id; no creation declaration and no critique fix goes above the ceiling on words that ask for none | PR |
| T-V10-49 | items 117 and 118 as a look: `read_map look` returns the view's week, season and follow flag, the climate row's season cells at that week and the festival list the view shows; its answer follows the view while the brief, every read, every digest and the cached prefix stay byte-identical over all 52 weeks and every festival display; no turn about a season or a festival proposes an event; a document without the view keys reads week 19 with no festival; the budget of V10 §6.1 | PR |
| T-V10-50 | the edge suite (V10 §3.23): one scripted fixture per numbered clause — rows 1–30 and combinations C1–C8 — each asserting its outcome and its rung and that nothing reaches the user's document without acceptance | PR (the rung and budget clauses nightly) |

### 7.2 Cassettes and replay"""),
("""**Cases** (89, in `plat/tests/clerk/cases/*.json`;""", """**Cases** (97, in `plat/tests/clerk/cases/*.json`;"""),
("""| A — descriptions to new towns | 15 |""", """| A — descriptions to new towns | 17 |"""),
("""; one description in German | population within""",
"""; one description in German; "a desert town round an oasis, its richest houses by the water" (item 111); "a village that was once a city" (item 113) | population within"""),
("""within the turn cap | ≥ 85 % of runs per case meet every check; J78's case and the second fixture's 3 of 3 |""",
"""within the turn cap; the oasis case with one spring-fed lake and `biome` `arid`, and no second oasis where the check already laid one; the once-a-city case with `history.onceA` CITY and a village population | ≥ 85 % of runs per case meet every check; J78's case and the second fixture's 3 of 3 |"""),
("""| C — explain | 23 |""", """| C — explain | 27 |"""),
("""; one question in German | the reply links""",
"""; on an arid town, "why is the quarter by the oasis the richest?"; on a symbolic-peak fixture, "how big was this town at its height?"; "why is the north wall patched with timber?"; at a winter week inside a festival's window, "why is the millpond frozen, and why are the streets hung with lanterns?"; one question in German | the reply links"""),
("""no `unverified` span | ≥ 90 % |""",
"""no `unverified` span; the arid case names the water and not the sun; the symbolic case states no number for the peak and says its size is not recorded; the wall case names the run's state, material and year; the look case reads `read_map look`, names the season and the festival's weeks, and declares nothing | ≥ 90 % |"""),
("""| D — iteration | 11 |""", """| D — iteration | 13 |"""),
(""""remove the viaduct"; "put it back" | the expected tool""",
""""remove the viaduct"; "put it back"; "patch the breach in the east wall with timber"; on a HAMLET, "give that farmhouse a tower" | the expected tool"""),
("""yields `undo` or `rebuild` | ≥ 85 % |""",
"""yields `undo` or `rebuild`; the patch one `repairWall` with the timber row; the tower declared as asked, its card carrying `info.grand.beyondTier` | ≥ 85 % |"""),
("""a failing case goes to the owner with its category (section 11 Q3)""",
"""a failing case is reported to the owner with its category, with its run (J122)"""),
("""**When it runs:** at the clerk milestone's exit; before any clerk configuration change ships — `clerk.ops`' model id or a
route's effort, the prompt template, the tool schemas (the release carrying item 110's forms among them) or the lexicon;
and weekly while the clerk is being built. **Cost:** 267 runs × ≈ US$0.30 ≈ US$80 per full run at V10 §6.4's estimates
(item 110's cases ≈ US$7 of it); a nightly smoke subset is not run (it would cost without deciding anything); the spend
is section 11 Q5.""",
"""**When it runs** (J122; V10 §11 Q5; J-V10.119): the live spend is capped at about US$790–1 190 through M3c and spent in
stages, each run's estimate (V10 §6.4) shown to the owner before it runs — during C2–C4, the smallest tier, one run of
each group's first two cases (18 runs, ≈ US$5), at each of their exits and before a configuration change is merged; at
C5, every case once (97 runs, ≈ US$29) to tune the efforts; the full suite, every case three times, only at M3c's exit,
and after it before any clerk configuration change ships — `clerk.ops`' model id or a route's effort, the prompt template,
the tool schemas (the release carrying item 110's forms among them) or the lexicon. Before any model-tier switch the
deployment's AI setup makes (J121), the full suite runs on the new tier, group I included, since a new tier's safety
classifiers may be broader. **Cost:** 291 runs × ≈ US$0.30 ≈ US$87 per full run at V10 §6.4's estimates (item 110's cases
≈ US$7 of it, items 111–118's ≈ US$7); no nightly smoke subset runs (it would cost without deciding anything); the
evaluation's key is a build-system secret whose provider spending limit is set at the cap."""),
]
