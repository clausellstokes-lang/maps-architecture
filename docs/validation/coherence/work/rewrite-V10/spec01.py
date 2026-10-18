R = [
("""and the base hook it plugs into. "BCR-V10-n" marks a piece that lands in the base by a change request, "CVR-V10-n" a
piece a sibling volume's revision supplies (section 10).""",
"""and the base hook it plugs into. "item n" marks a piece the base carries by its file f item (V10 §10.1 maps the former
request ids), "CVR-V10-n" one a sibling supplies (V10 §10.2)."""),
("""| the next request's `messages`, the prompt cache, `TurnView`, `ClerkTranscript`, the usage meter | §11.2's handle, role and knowledge key (§11.3) |""",
"""| the next request's `messages`, the prompt cache, `TurnView`, `ClerkTranscript`, the usage meter; `Segment.promptTokens` the segment's length rule (V10 §3.2) | §11.2's handle, role and knowledge key (§11.3) |"""),
("""| V11's `explainRow` and `profile` over the document's effective tables, citing entities filtered |""",
"""| V11's `explainRow` and `profile` over the document's effective tables, citing entities filtered; each cell's calibration register entry from V12 §2.6's `register.json` |"""),
("""| `WhySection` rows `underground` and `crypt` (V10 §3.9a) | V04's section provider over `RuinRecord`, `CatacombComplex`, `AccessCause`, the excavation reading and `catacombOutcome` (CVR-V10-1); V03's over `Basement.crypt` and its rank (CVR-V10-2) |""",
"""| `WhySection` rows `underground` and `crypt` (V10 §3.9a) | V04 §4.5's section provider over `RuinRecord`, `CatacombComplex`, `AccessCause`, the excavation reading (its `lost` state, item 113 (e)), the buried former settlements (item 113 (c)) and `catacombOutcome`; V03 §4.6's over `Basement.crypt` and its rank |"""),
("""| the clerk's "why" and "why not"; V09's why card and history row; V08's history panel words (CVR-V10-14) | item 270's section registry |""",
"""| the clerk's "why" and "why not"; V09's why card and history row; V08's history panel words (V08 §4.6) | item 270's section registry |
| the `history` section (V10 §3.9b (2)) | §2.7's `HistoryRecord` and `Provenance.symbolic` (§2.8), written by V06's replay (V06 §3.20.6), and the chronicle's `replay`, `destroyed`, `refounded` and `buried` entries (V06 §3.15.1) | the clerk's story; V09's why card; a host assistant (projected); the grounding check's symbolic rule (V10 §3.13 step 3); T-V10-46 | item 270's section registry |"""),
("""| the default providers for a raised way, a `RetainingWall` and a deck plot (V10 §3.9) | the base records, their lifecycle events and V11's `raisedWays`, `terrace.*` and `deck` rows |""",
"""| the default providers for a raised way, a `RetainingWall` (V01 §4.5's provider from M5; J-V10.120) and a deck plot (V10 §3.9) | the base records, their lifecycle events and V11's `raisedWays`, `terrace.*` and `deck` rows |"""),
("""| `FieldDrivers` with `sources` and `since` (item 297) | the prosperity field's `drivers(points)`; V05's per-island attribution; V06's district provider from the shade masks' history | the prosperity `WhyProvider` ("why is this quarter poor?", item 102 (f)) | §4.5 |""",
"""| `FieldDrivers` with `sources`, `since`, the water term and `climateSun` (item 297; item 111 (b), (c)) | the prosperity field's `drivers(points)` with the climate row's sunlight cell; V05's per-island attribution; V06's district provider from the shade masks' history and the springs' flow | the prosperity `WhyProvider` ("why is this quarter poor?", item 102 (f); "why rich?", item 111); V09's why card bars (`why.driver.water`) | §4.5 |
| the default providers' rows for an oasis, a wall's runs and a design above the grandeur ceiling (V10 §3.9; items 111, 114, 115) | §2.3's `WaterBody.spring` with its grove and gardens (`fedBy`; DR40 for a dossier oasis); §2.7's `Enceinte.condition` with §7.7's condition row; V09 §4.21.5 (2)'s ceiling check's lines | `why`; V09's why card; a host assistant (projected); T-V10-45, T-V10-47, T-V10-48 | item 270 |
| `MapBrief.settlement.biome`, `.arid`, `.history`, `water.lakes[].spring`, `walls[].runs` (V10 §2.13; items 111, 113, 114) | the facade over the committed model: the biome's climate row (§4.2 S0), §2.7's `HistoryRecord`, §2.3's `WaterBody.spring`, §2.7's `Enceinte.condition`; counted after the knowledge filter | the map block (V10 §3.3); prompt rules 16 and 19; the host projection (kept: no geometry) | §11.2 `Query` |
| `LookAnswer` (`read_map look`, V10 §2.13; items 117, 118) | the harness from `ClerkMount.view`: §2.9's year position, follow flag and festival display; the climate row's season cells (§4.2 S0; V11's season tables through `query rule`); the festival list V09 §4.21.8 reads (§7.7's traditions row) | the model's look answers (prompt rule 19); never the map block, an event or the log; T-V10-49 | §2.9 view state |
| the grandeur line on a clerk card (item 115) | V09 §4.21.5 (2)'s check over the variation's events, run by the drawer that draws the card | the card (V10 §5.4); T-V10-48 | V09 §4.9's `info.grand.*` |"""),
("""| a `ClerkAction`'s `label` (every kind; optional on `select` only; V10 §2.6) | the harness, from three sources, stated once each: a V09 §4.9 row's button — a bend's or an engine refusal's — its `MsgButton.key`'s text rendered under the session's key (a dry-run action's own `message`, item 463; V10 §3.5 step 3); an alternative of a V10 §3.16 row — its `clerk.alt.<category>.<n>` key, the words written in that row; the action form's blocks and the card's history buttons — `clerk.alt.help.useTool`, `clerk.alt.history.fork`, `.rerun`, `.undo`, `.rebuild` (V10 §3.13 step 4), a critique fix — `clerk.alt.critique.fix` (V10 §3.10), a stale card's retry — `clerk.alt.stale.retry` (V10 §3.11) |""",
"""| a `ClerkAction`'s `label` (every kind; optional on `select` only; V10 §2.6) | the harness, from three sources, stated once each: a V09 §4.9 row's button — a bend's or an engine refusal's — worded by V09 §2.9's *Words* under the session's key (a dry-run action's own `msg`, item 463's `MsgRef` keyed as its button, V09 §4.9; V10 §3.5 step 3); an alternative of a V10 §3.16 row — its `clerk.alt.<category>.<n>` key, the words written in that row; the action form's blocks and the card's history buttons — `clerk.alt.help.useTool`, `clerk.alt.history.rerun` and `.rebuild`, the `fork` block and every **Undo** worded by V09 §4.9's shared `button.openCopy` and `button.undo` (V10 §3.13 step 4; J-V10.112), a critique fix — `clerk.alt.critique.fix` (V10 §3.10), a stale card's retry — `clerk.alt.stale.retry` (V10 §3.11) |"""),
("""| V09's message catalogue (V09 §2.9, §4.9's table of volume 10's families; CVR-V10-19) |""",
"""| V09's message catalogue (V09 §2.9, V09 §4.9's table of volume 10's families; CVR-V10-19) |"""),
("""| a row's buttons, V09 §2.9's `MsgRow.buttons` (`MsgButton`: `key`, `does`, `from`, `each`, `event`, `page`, `arg`, `tool`, `mode`, `subject`, `when`; CVR-V10-20) |""",
"""| a row's buttons, V09 §2.9's `MsgRow.buttons` (`MsgButton`, its fields V09 §2.9's; CVR-V10-20) |"""),
("""| a quarter's `PointsForm.sizeM2` (item 348, merged with item 348) |""", """| a quarter's `PointsForm.sizeM2` (item 348) |"""),
("""| `ClerkHandle` (V09 §2.10), named `ClerkHandle` here (`type ClerkHandle = ClerkHandle`, V10 §2.6; no member of its own) |""",
"""| `ClerkHandle` (V09 §2.10; this volume adds no member and no alias, V10 §2.6) |"""),
("""| `WhyProvider.explain` (item 270) | this volume's defaults for the base kinds and the generic provider (V10 §3.9); V01–V07 register theirs for their kinds (V10 §3.9's owed table) |""",
"""| `WhyProvider.explain` (item 270) | this volume's defaults for the base kinds and the generic provider (V10 §3.9); V01–V07 register theirs for their kinds (V10 §3.9's owed table), one provider per kind at a time (J-V10.120) |"""),
("""| `WhySectionProvider.rows` (item 270) | V04 (`underground`), V03 (`crypt`), V05, V06 and any volume with a section to add (V10 §3.9's owed table) |""",
"""| `WhySectionProvider.rows` (item 270) | this volume (`raised`, `history`); V04 (`underground`), V03 (`crypt`), V05, V06 and any volume with a section to add (V10 §3.9's owed table) |"""),
("""`export`, `fork` (`forkAt`) and `rerun` (`rerunFrom`) to the application's own handlers (V09 §3.9, §4.11) |""",
"""`export`, `fork` (`forkAt`) and `rerun` (`rerunFrom`) to the application's own handlers (V09 §3.9, V09 §4.11) |"""),
("""(item 362) reach T2, T3, T4 and T9 through typed forms (V10 §4.1); the clerk still has no kind of its own.""",
"""(item 362) reach T2, T3, T4 and T9 through typed forms (V10 §4.1), as do item 111's spring flag on T2's lake, item
113's history on T1 and item 114's repair and wear on T3; the clerk still has no kind of its own."""),
("""| the row that derived a map fact from the dossier | the inputs of DR1–DR24 (§7.7 item 10) |""",
"""| the row that derived a map fact from the dossier | the inputs of DR1–DR40 and of the condition, calendar and traditions rows (§7.7 item 10) |"""),
("""| the only prose | none:""",
"""| the oasis a dossier makes (item 111) | `site.deposits`' `oasis_water` (DR40) | the water-body row's source, tier `dossier` (V10 §3.9b (1)) |
| the settlement's past (item 113) | `history.ageYears`, the history events, `tierHistory`, `populationHistory`, `calamityHistory`, the lifecycle, `peakTier` (DR36–DR39) | through §2.7's `HistoryRecord` (V06 §3.20.6): the `history` section; a dossier history makes `intend { history }` a `dossier` refusal |
| what drives the walls' condition (item 114) | the `readiness` label and wealth (§7.7's condition row; V08) | the enceinte row's generation-time reason |
| a building the dossier names grand (item 115 (c)) | the record V08 reads as "specified" | `info.grand.dossier`, tier `dossier` |
| the week, the season and the festivals (items 117, 118) | the calendar week and season, `traditions` (§7.7's calendar and traditions rows; V08) | `LookAnswer`: the follow flag's week; the festival list, a dossier festival tier `dossier` |
| the only prose | none:"""),
]
