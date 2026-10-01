# Edits B: §2.6, §3.16, §3.18, §3.23 (after the S7 prefixes).
EDITS = []
def E(tag, old, new, count=1):
    EDITS.append((tag, old, new, count))

# ---------------------------------------------------------------- §2.6 (VV56-01: the name row restored)
E('VV56-01 §2.6 name',
"""| tops re-seated on a re-derived rim (V05 §4.3), and on a resized or reshaped one with their feet re-landed as a move re-lands them (V05 §4.2) | inverse | — |
""",
"""| tops re-seated on a re-derived rim (V05 §4.3), and on a resized or reshaped one with their feet re-landed as a move re-lands them (V05 §4.2) | inverse | — |
| `name` (§2.7's `SkyIsland.name`) | S13a (V05 §3.14) | labels, the gazetteer, exports | model digest with its naming record | §6.3's naming cases | inverse | — |
""")

# ---------------------------------------------------------------- §2.6 (VV56-18: the run's epoch beside its condition)
E('VV56-18 §2.6 condition',
"""| `Enceinte.condition` and `RetainingWall.state` — the stretch-state profiles (§2.2 rule 5; file f items 575, 245; E-01) | this volume's writer: `fallIsland` (V05 §3.16 (4)), `breached` over each covered wall length and `decayed` over each covered retaining length | the profile rule's readers (§2.2 rule 5; items 575, 245; V06 §2.12) | the profile rule's | written again when the `fallIsland` event replays; never by a re-derivation of its own | the `fallIsland` undo restores the prior profile (and the enceinte's `lifecycle`) | the profile rule's |""",
"""| `Enceinte.condition` with its `conditionEpoch`, and `RetainingWall.state` — the stretch-state profiles (§2.2 rule 5; file f items 575, 245; item 114 (b); E-01) | this volume's writer: `fallIsland` (V05 §3.16 (4)), `breached` over each covered wall length with `conditionEpoch` the epoch in force at the fall over every run it changes (`conditionMaterial` kept), and `decayed` over each covered retaining length | the profile rule's readers (§2.2 rule 5; items 575, 245, 114; V06 §2.12; V06 §3.7.7's oldest-patch-first order reads the epoch) | the profile rule's | written again when the `fallIsland` event replays; never by a re-derivation of its own | the `fallIsland` undo restores the prior profiles (and the enceinte's `lifecycle`) | the profile rule's |""")

# ---------------------------------------------------------------- §3.16 (4) and (8) (VV56-18)
E('VV56-18 §3.16 (4)',
"""   | wall stretch (its band) | `breached` over its covered length in the enceinte's `condition` (§2.2 rule 5's stretch-state profile, file f item 575): knots at the covered length's ends; a run already `dismantled` kept, the ladder only stepping down; the record's `lifecycle` `decayed` while any run is not `standing` — a state, no edge removed | §8.2's `decayed` row (the gap glyph over each `breached` run) | volume 6's repair of a breached ring in use (`repairWall`, V06 §3.7.5) |""",
"""   | wall stretch (its band) | `breached` over its covered length in the enceinte's `condition` (§2.2 rule 5's stretch-state profile, file f item 575): knots at the covered length's ends; a run already `breached` or `dismantled` kept, the ladder only stepping down; over every run the fall changes, the run's last-change epoch `conditionEpoch` written as the fall's epoch — the epoch in force at the `fallIsland` event — over the same stretch in the same batch, its material `conditionMaterial` kept (a `breached` patch keeps its patch row; item 114 (b); §2.7), so volume 6's oldest-patch-first order (V06 §3.7.7) reads the fall as the run's last change; the record's `lifecycle` `decayed` while any run is not `standing` — a state, no edge removed | §8.2's run `breached` row (a break with its rubble spill) | volume 6's repair of a breached ring in use (`repairWall`, V06 §3.7.5) |""")
E('VV56-18 §3.16 (8)',
"""   prior `formerClass` (absent again where the fall wrote the first), each covered enceinte's `condition` profile and
   `lifecycle`, each covered retaining wall's `state`, and each re-landed access of another island.""",
"""   prior `formerClass` (absent again where the fall wrote the first), each covered enceinte's `condition` and
   `conditionEpoch` profiles (its `conditionMaterial` untouched by the fall) and `lifecycle`, each covered retaining
   wall's `state`, and each re-landed access of another island.""")

# ---------------------------------------------------------------- §3.18 (the looks draw no model stream)
E('VV56-04/05 G120 §3.18',
"""`dmath` noise keyed by the island's render key — view data outside every digest (§6.2) and the same on every engine
(§6.5).""",
"""`dmath` noise keyed by the island's render key — view data outside every digest (§6.2) and the same on every engine
(§6.5). So do the looks of items 117, 118 and 120 on the islands (V05 §5.1, V05 §5.6): their only draws are §8.2's render
draws (`RH32` over the island entities' render keys), so no week, festival or Find chip moves a model draw.""")

# ---------------------------------------------------------------- §3.23 (VV56-14 l. 1734; VAL-17; new edges)
E('VV56-14 l1734',
"""| identity and lifecycle | V05 §2.5's anchors and §2.6's rows at save, load, undo, redo, regenerate and migrate | check | T-V5-15; T-V5-16 |""",
"""| identity and lifecycle | V05 §2.5's anchors and V05 §2.6's rows at save, load, undo, redo, regenerate and migrate | check | T-V5-15; T-V5-16 |""")
E('VAL-17 §3.23 marks',
"""| marks | a strip with no cell at three samples draws no outline; an unfallen island draws its land, rim and shadow at every band; every shipped sheet resolves every sky semantic (a user sheet missing one resolves it by §8.2's slot resolution);""",
"""| marks | a strip with no cell at three samples draws no outline; an unfallen island draws its land, rim and shadow at every band; every shipped sheet of §8.2's presets table (V05 §5.1's list, the ink-family variants and `painterly` among them) resolves every sky semantic (a user sheet missing one resolves it by §8.2's slot resolution);""")
E('VV56-04/05/06 G120 §3.23 (a)',
"""| a lock under `sky.clearance` | V05 §3.9 (5)'s lock clause | check | T-V5-31 (f) |
""",
"""| a lock under `sky.clearance` | V05 §3.9 (5)'s lock clause | check | T-V5-31 (f) |
| the seasonal look (V05 §5.1) | every week of 0–51 the same model, hash, save, bases and strips; an arid row draws no ice and no snow on an island; a week in no band of a phase keeps the row's last phase (§8.2's cyclic read); a document whose pinned tables hold no item-117 rows draws §8.2's four override rows on the island as on the ground; a river all of whose stretches are fast draws no ice, a spring pond freezes as any `pond`; a `settled` or `waning` island dresses as a floating one; a `fallen` or `removed` island has no sky look (its landfall takes the ground's); a moved island's leaf cover moves with it | check | T-V5-34 |
| the pennants (V05 §5.1) | no festival in the view's week, or the display off: none; two festivals in one week: both, in window order (§8.2); an island with no landing: rim pennants only; a rim stretch wholly inside landing yards or the waterfall's lip: none there; a `fallen` or `removed` island: none; an island an epoch carried below CITY: V11's `SKY` row as at any rung; a ground landing: none of the `SKY` row's | check; leave out and report | T-V5-35 |
| Find on Sky (V05 §5.6) | no island: no sky entry and no "on Sky" count; one island: its matches alone; a hidden sky layer: its matches still counted and shown as ghost pins; a bubble never joins two islands' or two layers' pins; a match withheld by the key: absent everywhere; a `fallen` island: its matches dark, its landfall a Ground place; a `removed` island: never offered | check | T-V5-36 |
| the one-time waits (V05 §6) | each wait at CITY and METROPOLIS with three islands, up to the population cap, within §12.1's comfort level, a row past its target only with its recorded measured gain; a wait past one second shows progress; the interactive rows never relaxed | check | T-V5-18 |
""")
E('VV56-04/05 G120 §3.23 (b)',
"""| landfall × save and load | the decoration, its `members`, the ways' `formerClass`, the walls' profiles and the quarry's `source` persist in the model digest; a replay of the `fallIsland` event reproduces them byte for byte | check | T-V5-15 |""",
"""| landfall × save and load | the decoration, its `members`, the ways' `formerClass`, the walls' profiles and the quarry's `source` persist in the model digest; a replay of the `fallIsland` event reproduces them byte for byte | check | T-V5-15 |
| season × offset; pennants × offset; Find × offset | the island's season, pennants, glow and pins drawn in its frame and displaced with it; the ground's look beneath unchanged | check | T-V5-34; T-V5-35; T-V5-36 |
| season × shade | the strips and `shadeSky` identical in every week; only the drawn shadow follows the view sun's height | check | T-V5-34 |
| season × landfall | the landfall's rubble and quarry face are ground faces: they take the ground's snow and leaf cover; nothing of the fallen island is drawn on the sky | check | T-V5-34 |
| festival × landing yard; festival × waterfall | no pennant in a yard's passage or at the waterfall's lip; a yard's two pennants flank its access top | check | T-V5-35 |
| Find × season; Find × festival | Find draws over both, under its veil, never re-rendering the sky base tiles | check | T-V5-36 |""")
