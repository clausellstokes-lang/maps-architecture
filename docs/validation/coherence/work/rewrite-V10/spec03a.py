R = [
("""evaluation, stated as steps with their constants (every constant a `clerk.json` cell, V10 §2.10) and failure ladders.""",
"""evaluation, stated as steps with their constants (every constant a `clerk.ops` or `clerk.content` cell, V10 §2.10) and
failure ladders."""),
("""   with `attach.newMap` (V09 §2.10, §4.11; standalone only); otherwise `edit`.""",
"""   with `attach.newMap` (V09 §2.10, V09 §4.11; standalone only); otherwise `edit`."""),
("""   no turn enters creation mode (V09 §3.9, §4.11).""", """   no turn enters creation mode (V09 §3.9, V09 §4.11)."""),
("""**Segments close** on: the prompt reaching `cache.segmentTokenLimit` (`length`);""",
"""**Segments close** on: the last request's prompt — `Segment.promptTokens`, its input with the cache reads and writes —
reaching `cache.segmentTokenLimit` (`length`);"""),
# rule 6: numbers and a symbolic peak
("""   sets (J-V10.70), `<id>` one existing place of that class — each an id a read of this segment returned, so the card can
   offer to move it; with no such place read, `[[do:refuse:dossier]]`; the card offers what the map can do (V10 §3.13
   step 4, §3.16). With a""",
"""   sets (J-V10.70), `<id>` one existing place of that class — each an id a read of this segment returned, so the card can
   offer to move it; with no such place read, `[[do:refuse:dossier]]`; the card offers what the map can do (V10 §3.13
   step 4, V10 §3.16). A fact marked `symbolic` (item 113 (f)) has no recorded size: give it no number. With a"""),
# rule 16: the grandeur ceiling (item 115)
("""    rules build none (a way kept from when it was a city apart — the raised line's `carriedSince`), so a new one is only ever the user's declaration. Never
    propose one, or a removal, to fix a finding.""",
"""    rules build none (a way kept from when it was a city apart — the raised line's `carriedSince`), so a new one is only ever the user's declaration. Never
    propose one, or a removal, to fix a finding. A building grander than its rung's ceiling allows (item 115; §4.2 S10b's
    ceiling) is likewise declared only on the user's words — and then as asked, since the ceiling is a default, never a
    refusal: say in one line that it is grander than such a place usually has and kept as asked (V10 §3.9b (4))."""),
("""18. **Undo and putting back** (V10 §3.14). "Undo that" is `[[do:undo]]`; "put it back" is `[[do:undo]]` when the removal
    is your last accepted change, else `[[do:rebuild:<id>]]` with an id the removal took away; never compose events for
    either.""",
"""18. **Undo and putting back** (V10 §3.14). "Undo that" is `[[do:undo]]`; "put it back" is `[[do:undo]]` when the removal
    is your last accepted change, else `[[do:rebuild:<id>]]` with an id the removal took away; never compose events for
    either.
19. **A place's past, and its look** (items 113, 117, 118). Tell how the town came to be from `why`'s `history` and
    `move` sections and the chronicle (V10 §3.9b (2)) — "the walls were built when this was a city of twelve thousand" —
    and where a fact is `symbolic`, say its exact size is not recorded. The season and a festival are the viewer's look,
    never the map: read `read_map { kind: 'look' }` before speaking of snow, ice, leaves, fields through the year or
    decorations, explain them from its climate rows and festival list, and never declare anything for them; to see
    another week or festival, name the view bar's **Season** control or **Festivals** list in words (V09 §4.21.7,
    V09 §4.21.8) — they are view settings, not tools."""),
# the map block's new lines
("""**The map block** is `MapBrief` rendered as compact text (its `salts` excepted: the encoders' read, V10 §4.1): fixed field order, one line per district, landmark, road,
wall, gate, raised way, terraced district, deck and underground system (an empty list renders no line, so a map without
item 110's records renders its block byte-identically, T-V10-43),""",
"""**The map block** is `MapBrief` rendered as compact text (its `salts` excepted: the encoders' read, V10 §4.1): fixed field order, one line per district, landmark, road,
wall (with its runs by state, item 114), gate, raised way, terraced district, deck and underground system, and the
settlement's line with its biome (marked arid where item 111 applies) and, where a replay ran, its history (the peak's rung
and population — the rung alone, "size not recorded", when symbolic — the refoundings and the buried systems; item 113)
(an empty list or absent field renders nothing, so a map without item 110's records renders its block byte-identically,
T-V10-43, and one without items 111–114's likewise, T-V10-45 – T-V10-47),"""),
# lexicon: provenance narration, population rows by quantile (V10-XAGREE-3, restatements), g-item rows
("""**Default lexicon rows** (`clerk.content.lexicon`; our own values, not calibratable — a word list V12's R4 never calibrates, re-set as a table version by V10 §7.3's evaluation; V11's round 2 (continuation)):""",
"""**Default lexicon rows** (`clerk.content.lexicon`; our own values, not calibratable — a word list V12's R4 never calibrates, re-set as a table version by V10 §7.3's evaluation). The size words are one rule with V09's size chips: a `population` value names a rung's default target (§1.1's rung table, as V07 §2.1 cites it) or a quantile of a rung's band read from that table (V09 §4.5's T1 rule, J-V9.56), never a number of its own:"""),
("""| thorp, farmstead cluster | `population` | 40 (V07 §2.1's THORP typical; routed as V10 §3.7 states) |
| hamlet | `population` | 200 (V07's HAMLET typical) |
| village | `population` | 700 (V07's VILLAGE typical) |
| small town | `population` | 2 500 |
| town, market town | `population` | 5 000 |
| large town | `population` | 8 000 |
| small city | `population` | 12 000 |
| city | `population` | 20 000 |
| large city | `population` | 28 000 |
| metropolis, great city, capital | `population` | 50 000 |
| vast metropolis | `population` | 100 000 |""",
"""| thorp, farmstead cluster · hamlet · village | `population` | the THORP · HAMLET · VILLAGE rung's default target (routed as V10 §3.7 states) |
| small town · town, market town · large town | `population` | the TOWN band's 25th · 50th · 85th percentile |
| small city · city · large city | `population` | the CITY band's 25th · 50th · 85th percentile |
| metropolis, great city, capital · vast metropolis | `population` | the METROPOLIS band's 50th · 85th percentile (J-V10.118) |"""),
("""| ziggurat, stepped pyramid, stepped temple · terraced palace · tiered tower | `place.class` | `stepped_temple` · `terraced_palace` · `tiered_tower` |""",
"""| ziggurat, stepped pyramid, stepped temple · terraced palace · tiered tower | `place.class` | `stepped_temple` · `terraced_palace` · `tiered_tower` |
| desert, arid, dry country (a town's setting) | `biome` | `arid` (item 111; V11's climate rows) |
| oasis, spring-fed pool, desert spring | `ground.op` with `ground.spring` | `lake` with `spring: true` (item 111 (a); only when the user says it) |
| once a city · once a town (of a smaller place) | `intend.history.onceA` | `CITY` · `TOWN` (item 113 (a); only when the user gives the place a past) |
| patch, mend with timber, wattle or earth · rebuild in stone, repair | `wall.op` `repair` with `material` | the patch row whose `label` the words name (V11's `walls.patchMaterials`) · `robust` (item 114) |"""),
# 3.4 enumerations and descriptions
("""   withholds like any address — followed by V11's specialisation ids that carry a composition key (`stepped_temple`,
   `terraced_palace`, `tiered_tower`; V02's X17; CVR-V10-12), each described in plain words;""",
"""   withholds like any address — followed by V11's specialisation ids that carry a composition key (`stepped_temple`,
   `terraced_palace`, `tiered_tower`; V11 §3.24.3; V02's X17), each described in plain words;"""),
("""   V09's T11 and T12 rows (T10's row lists no layer re-roll, so `hold` has none); `link.op` from V11's
   `siting.linkEdits` schema (`avoid` only where that schema carries the cell); `WayClass`, `Enceinte['kind']`,
   `Greenery['kind']` and `WarpKernel` from `@plat/model`.""",
"""   V09's T11 and T12 rows (T10's row lists no layer re-roll, so `hold` has none); `link.op` onto V11 §4.2's
   `siting.linkEdits` cells; `material` from V11's `walls.patchMaterials` rows and `history.onceA` from the rung table's
   rungs, each list filtered at the turn (the enceinte's kind and culture; the rungs above the town's own); `WayClass`,
   `Enceinte['kind']`, `Greenery['kind']` and `WarpKernel` from `@plat/model`."""),
("""| `intend` | What the whole town is — form, population, water, walls, wealth, era, magic. In a new town it defines the town (a village below 1 500 people when the village product is installed); on an existing town it adjusts town-wide settings, which can re-derive much of it. |
| `ground` | Terrain strokes (raise, lower, cliff, flatten) along a path, a coast drawn as a line, a lake by one point and a level, a river by a source and a mouth, a harbour basin by a shore point and a size, a warp; a terrace (level ground held up by retaining walls at its edges) and an islet, only when the user asks for one. |
| `wall` | An enceinte through two or more points, following ridges and closing when its ends meet; or a gate on an existing wall; or a retaining wall holding up a terrace (never a town wall), only when the user asks. Roads through a wall become gates by themselves. |""",
"""| `intend` | What the whole town is — form, population, water, walls, wealth, era, climate, magic, and a past ("once a city") when the user gives one. In a new town it defines the town (a village below 1 500 people when the village product is installed); on an existing town it adjusts town-wide settings, which can re-derive much of it. |
| `ground` | Terrain strokes (raise, lower, cliff, flatten) along a path, a coast drawn as a line, a lake by one point and a level — spring-fed as an oasis only when the user asks — a river by a source and a mouth, a harbour basin by a shore point and a size, a warp; a terrace (level ground held up by retaining walls at its edges) and an islet, only when the user asks for one. |
| `wall` | An enceinte through two or more points, following ridges and closing when its ends meet; or a gate on an existing wall; or a stretch of a wall repaired — in its own material or patched — worn, or its ring put back in use; or a retaining wall holding up a terrace (never a town wall), only when the user asks. Roads through a wall become gates by themselves. |"""),
("""| `read_map` | Read the map: the brief, one thing, the gazetteer, people, candidate sites for a class, a distance, what stood here in a past year, the chronicle, a thing's history, a rule or a class's profile, the generation report, the tools, or a schema. Reads the draft while one exists. |""",
"""| `read_map` | Read the map: the brief, one thing, the gazetteer, people, candidate sites for a class, a distance, what stood here in a past year, the chronicle, a thing's history, a rule or a class's profile, the generation report, the tools, a schema, or the season and festival the viewer is shown. Reads the draft while one exists. |"""),
# 3.5 reads: the look read; SR6-05 (a), (b), (f)
("""`@plat/clerk/core` (the tool registry rows with V09's catalogue hints; the schemas). `why` takes `mode` (default""",
"""`@plat/clerk/core` (the tool registry rows with V09's catalogue hints; the schemas), and `look` by the harness from
`ClerkMount.view` (V10 §3.9b (5)). `why` takes `mode` (default"""),
("""`subject` button (**Show a different name**, **Change the stairs**, **Change the building's shape**) with `ids` the
   row's first address argument that the session's key admits (V09 §2.9) — a `subject` button of a contextual tool
   (`ToolRow.contextual`: T9, T10) that finds none is not offered; `drop` → the card's **Drop**,""",
"""`subject` button (**Show a different name**, **Change the stairs**, **Change the building's shape**) with `ids` the
   row's first address argument that the session's key admits (V09 §2.9) — a `subject` button whose row has no address
   argument the session's key admits is not offered; `drop` → the card's **Drop**,"""),
("""(**Keep {building}**; V10 §3.16). No row a dry run gives the clerk carries an `app`
   button (V09 §2.9; T-V9-15), and a button V09 §2.9 does not draw (*Where a button is not drawn*: a `commit` whose source
   yields nothing, a `when` that does not hold, `owner` read against the session's role) is not offered either. Each is
   labelled by V09 §2.9's *Words*, rendered under the session's key: a dry-run action's own `message` (item 463); for one""",
"""(**Keep {building}**; V10 §3.16). No `bend.*` or `refuse.*` row a dry run gives the clerk
   carries an `app` button (V09 §2.9; T-V9-15); a proposal card's effect lines are drawn by V09 (V09 §4.11). A button
   V09 §2.9 does not draw (*Where a button is not drawn*: a `commit` whose source yields nothing, a `when` that does not
   hold, `owner` read against the session's role, a `subject` button with no admitted address) is not offered either. Each
   is labelled by V09 §2.9's *Words*, rendered under the session's key: a dry-run action's own `msg` (item 463's `MsgRef`,
   keyed as its button, V09 §4.9); for one"""),
# 3.7 creation: climate, a past, an oasis
("""   `coastSide`, `walls`, `wealth`, `planned`, `era`, `magic`, `castle`, `harbour`, `temple`, and at a village rung
   `fieldSystem` and `palisade`.""",
"""   `coastSide`, `walls`, `wealth`, `planned`, `era`, `biome` ("a desert town" → `arid`, item 111), `magic`, `castle`,
   `harbour`, `temple`, `history` only when the description gives the place a past ("a village that was once a city" →
   `onceA: 'CITY'`, item 113 (a)), and at a village rung `fieldSystem` and `palisade`."""),
("""   → `ground { op: 'terrace' }` strokes along the hill's anchors; "an aqueduct from the hills" → `road { class:
   'aqueduct' }` from the frame edge to the centre.""",
"""   → `ground { op: 'terrace' }` strokes along the hill's anchors; "an aqueduct from the hills" → `road { class:
   'aqueduct' }` from the frame edge to the centre. An oasis likewise only when named: "a desert town round an oasis" →
   `ground { op: 'lake', at: 'centre', spring: true }` — on an arid site the rules may already lay one (item 111 (a)), so
   the check is read first and a second is declared only when the words ask for more water."""),
]
