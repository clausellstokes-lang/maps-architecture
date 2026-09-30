import sys; sys.path.insert(0,'scripts')
from ed import Ed
e=Ed('parts/07-s3-1-4.md')
e.R("""evaluation, stated as steps with their constants (every constant a `clerk.json` cell, V10 §2.10) and failure ladders.""",
    """evaluation, stated as steps with their constants (every constant a `clerk.ops` or `clerk.content` cell, V10 §2.10) and
failure ladders.""")
e.R("""   no turn enters creation mode (V09 §3.9, V09 §4.11; XV-V9-22 (c)).""","""   no turn enters creation mode (V09 §3.9, V09 §4.11).""")
e.R("""6. **The model loop.** Request (V10 §3.2) → stream → final message. **Before anything else, the fallback boundary** (the
   provider's refusal fallback, skill: refusal fallbacks; J-V10.53):""","""6. **The model loop.** Request (V10 §3.2) → stream → final message. **Before anything else, the fallback boundary** (the
   provider's refusal fallback; J-V10.53):""")
e.R("""**Segments close** on: the prompt reaching `cache.segmentTokenLimit` (`length`);""",
    """**Segments close** on: the prompt reaching `cache.segmentTokenLimit` (`length`: the segment's `promptTokens`, V10 §2.3,
compared before each request);""")
e.R("""5. **Scoped re-rolls only.** Never re-roll the whole town once anything is declared; re-roll a block, a quarter or a
   building; new names come from `name`""","""5. **New random only on a scope.** Never ask for New random on the whole town once anything is declared; ask for it on
   a block, a quarter or a building (`hold`'s `newRandom`); new names come from `name`""")
e.R("""   sets (J-V10.70), `<id>` one existing place of that class — each an id a read of this segment returned, so the card can
   offer to move it; with no such place read, `[[do:refuse:dossier]]`; the card offers what the map can do (V10 §3.13
   step 4, §3.16). With a""","""   sets (J-V10.70), `<id>` one existing place of that class — each an id a read of this segment returned, so the card can
   offer to move it; with no such place read, `[[do:refuse:dossier]]`; the card offers what the map can do (V10 §3.13
   step 4, §3.16). A figure of the town's past is stated only as the brief's history line or a `past` row gives it — a
   row marked `about` said with "about" — and a symbolic peak's size never: say "its exact size is not recorded" (V10
   §3.9b). With a""")
e.R("""16. **Big structures and removals only on the user's words** (item 110 (b) as revised ~23:40; J-V10.78). Declare a raised
    way, an aqueduct, a terrace or a retaining wall only when the user's words ask for that kind of thing, and remove
    anything only when the user asks to remove that thing.""","""16. **Big structures and removals only on the user's words** (item 110 (b); J-V10.78). Declare a raised way, an
    aqueduct, a terrace, a retaining wall or an oasis (a lake fed by a spring) only when the user's words ask for that kind
    of thing, and remove anything only when the user asks to remove that thing.""")
e.R("""18. **Undo and putting back** (V10 §3.14). "Undo that" is `[[do:undo]]`; "put it back" is `[[do:undo]]` when the removal
    is your last accepted change, else `[[do:rebuild:<id>]]` with an id the removal took away; never compose events for
    either.""","""18. **Undo and putting back** (V10 §3.14). "Undo that" is `[[do:undo]]`; "put it back" is `[[do:undo]]` when the removal
    is your last accepted change, else `[[do:rebuild:<id>]]` with an id the removal took away; never compose events for
    either.
19. **The town's past** (item 113; V10 §3.9b). For "why are the walls so far out?", "was this ever bigger?" or "tell me
    the town's history", read the brief's history line, then `why` on the history record or on the thing asked about, and
    tell the story from the `past` rows only, oldest first; a map with no history line was not generated from a history —
    say so, never invent one. For dry country (item 111), explain the water pull, the oasis and why shade is prized from
    the water rows and the field's drivers (V10 §3.9 *Water in a dry land*).""")
e.R("""wall, gate, raised way, terraced district, deck and underground system (an empty list renders no line, so a map without
item 110's records renders its block byte-identically, T-V10-43),""","""wall, gate, raised way, terraced district, deck and underground system, and one history line (V10 §3.9b) (an empty list
or an absent history renders no line, so a map without item 110's records or a history renders its block
byte-identically, T-V10-43, T-V10-46),""")
e.R("""**Default lexicon rows** (`clerk.content.lexicon`; our own values, not calibratable — a word list V12's R4 never calibrates, re-set as a table version by V10 §7.3's evaluation; V11's round 2 (continuation)):""",
    """**Default lexicon rows** (`clerk.content.lexicon`; our own values, not calibratable — a word list V12's R4 never calibrates, re-set as a table version by V10 §7.3's evaluation). A size word reads its population from V09 §4.5's T1 size chip of the same word — the one rule for size words, its quantile read from the rung table — and a village-rung word from V07 §2.1's rung table; no row states a population of its own but the one no chip carries:""")
e.R("""| thorp, farmstead cluster | `population` | 40 (V07 §2.1's THORP typical; routed as V10 §3.7 states) |
| hamlet | `population` | 200 (V07's HAMLET typical) |
| village | `population` | 700 (V07's VILLAGE typical) |
| small town | `population` | 2 500 |
| town, market town | `population` | 5 000 |
| large town | `population` | 8 000 |
| small city | `population` | 12 000 |
| city | `population` | 20 000 |
| large city | `population` | 28 000 |
| metropolis, great city, capital | `population` | 50 000 |
| vast metropolis | `population` | 100 000 |""","""| thorp, farmstead cluster | `population` | `{ typical: 'THORP' }` (routed as V10 §3.7 states) |
| hamlet | `population` | `{ typical: 'HAMLET' }` |
| village | `population` | `{ typical: 'VILLAGE' }` |
| small town | `population` | `{ size: 'smallTown' }` |
| town, market town | `population` | `{ size: 'town' }` |
| large town | `population` | `{ size: 'largeTown' }` |
| small city | `population` | `{ size: 'smallCity' }` |
| city | `population` | `{ size: 'city' }` |
| large city | `population` | `{ size: 'largeCity' }` |
| metropolis, great city, capital | `population` | `{ size: 'metropolis' }` |
| vast metropolis | `population` | 100 000 (no chip carries it; §1.1 clamps a request above the METROPOLIS cap) |""")
e.R("""| by a brook · by a stream · by a pond (a village) | `water` | `brook` · `stream` · `pond` |""",
    """| by a brook · by a stream · by a pond (a village) | `water` | `brook` · `stream` · `pond` |
| desert, arid, dry country (item 111) | `biome` | the first biome, in row order, whose climate row is arid (V11's biome rows) |
| oasis, spring-fed pool (item 111) | `oasis` · `ground.spring` | `on` for a new town on an arid biome; otherwise a `ground` lake with `spring` (rule 16: only when the user says it) |
| once a city, once a town, a fallen city (item 113) | `history.once` | the rung the words name; the founding and the height's years from the user's words, else V09 §4.22 (1)'s defaults |""")
e.R("""   are filled from the document's effective tables, in table order: `class` from `RosterTables.classes[].id` — the
   table's own rows only: a class made for a dossier's custom institution (item 104) is never enumerated, since its name
   could tell a viewer what the key withholds; such elements are placed by `element`, which the reader admits or
   withholds like any address — followed by V11's specialisation ids that carry a composition key (`stepped_temple`,
   `terraced_palace`, `tiered_tower`; V02's X17), each described in plain words;""","""   are filled from the document's effective tables, in table order: `class` from `RosterTables.classes[].id` — the
   table's own rows only: a class made for a dossier's custom institution (item 104) is never enumerated, since its name
   could tell a viewer what the key withholds; such elements are placed by `element`, which the reader admits or
   withholds like any address — followed by V11 §3.24.3's specialisation ids that carry a composition key
   (`stepped_temple`, `terraced_palace`, `tiered_tower`), each described in plain words;""")
e.R("""   V09's T11 and T12 rows (T10's row lists no layer re-roll, so `hold` has none); `link.op` from V11's
   `siting.linkEdits` schema (`avoid` only where that schema carries the cell); `WayClass`,""","""   V09's T11 and T12 rows (T10's row lists no layer re-roll, so `hold` has none); `link.op` from V11 §4.2's
   `siting.linkEdits` cells (`bindTo`, `avoid`, `cut`); `WayClass`,""")
e.R("""2. Each declaration tool's `events` field is an array of objects whose `t` is an enumeration of **the event kinds its
   row of §7.1's toolkit table lists** — read from T101-1's tool registry,""","""2. Each declaration tool's `events` field is an array of objects whose `t` is an enumeration of **the event kinds
   §7.1's binding table gives that tool as their home** — read from T101-1's tool registry,""")
e.R("""   from V10 §2.12's field comments — item 110's with the trigger condition they state ("only when the user asks …"),
   since the model decides from descriptions when to use a field (the claude-api skill's tool-definition advice) — and""",
    """   from V10 §2.12's field comments — item 110's and item 111's with the trigger condition they state ("only when the user
   asks …"), since the model decides from descriptions when to use a field — and""")
e.R("""| `intend` | What the whole town is — form, population, water, walls, wealth, era, magic. In a new town it defines the town (a village below 1 500 people when the village product is installed); on an existing town it adjusts town-wide settings, which can re-derive much of it. |""",
    """| `intend` | What the whole town is — form, population, water, walls, wealth, era, magic, an oasis in dry country, a past (once a city, now smaller). In a new town it defines the town (a village below 1 500 people when the village product is installed); on an existing town it adjusts town-wide settings, which can re-derive much of it. |""")
e.R("""| `ground` | Terrain strokes (raise, lower, cliff, flatten) along a path, a coast drawn as a line, a lake by one point and a level, a river by a source and a mouth,""",
    """| `ground` | Terrain strokes (raise, lower, cliff, flatten) along a path, a coast drawn as a line, a lake by one point and a level (fed by a spring, an oasis, only when the user asks for one), a river by a source and a mouth,""")
e.R("""| `hold` | Lock or pin what must stay, revert a thing to generated, or re-roll a scope (a block, a quarter, a building); remove a thing, only when the user asks to remove it. |""",
    """| `hold` | Lock or pin what must stay, revert a thing to generated, or ask for New random on a scope (a block, a quarter, a building); remove a thing, only when the user asks to remove it. |""")
e.R("""| `why` | The rules' own explanation of why something is what and where it is: the rows that pulled it, its links, the alternatives, what lies beneath it, its history. |""",
    """| `why` | The rules' own explanation of why something is what and where it is: the rows that pulled it, its links, the alternatives, what lies beneath it, its history and the town's past. |""")
e.R("""token counter at spike S3, item 110's forms, descriptions and lexicon rows included).""","""token counter at spike S3, the forms, descriptions and lexicon rows of items 110, 111 and 113 included).""")
e.save()
