# Edits C: §4.5, §5.1, §5.5, the new §5.6, §6 (after the S7 prefixes).
EDITS = []
def E(tag, old, new, count=1):
    EDITS.append((tag, old, new, count))

# ---------------------------------------------------------------- §4.5 (the clerk reads the looks; V10's lines)
E('VV56-04/05 G120 §4.5',
"""the ground catch up" Update shade now; "bring it down" `convert fallIsland` with V05 §3.16's fates. It never writes a
dossier fact and meets DR27's refusal as any author does.""",
"""the ground catch up" Update shade now; "bring it down" `convert fallIsland` with V05 §3.16's fates. It never writes a
dossier fact and meets DR27's refusal as any author does.

**The looks** (items 117 (h), 118 (g), 120 (i); the lines volume 10's). The clerk's seasonal line on an island reads the
ground's climate row and the island's water as V05 §5.1 draws them ("the island's pond is frozen: it is midwinter, and
winters here are cold; the waterfall keeps running"); its festival line names the pennants on the island's rim and
landing tops while a festival shows; and its "show me …" sets Find's chips, whose matches on the islands are V05 §5.6's —
each a view action, never an edit.""")

# ---------------------------------------------------------------- §5.1 (VAL-17: the sheets)
E('VAL-17 §5.1 sheets',
"""gives it (file f item 408); every shipped sheet (`ink`, `lit`, `hatched`, `night` and the parity presets, which carry the
rows though their recipes hold islands off) resolves every sky semantic, so the loader never refuses one. The per-family
facts are this volume's, their values volume 11's palette rows (row 52):""",
"""gives it (file f item 408); every shipped sheet — §8.2's presets table: `ink`, `lit`, `hatched`, the ink-family variants
`parchment`, `bw-print` and `night`, `painterly` once volume 7 ships it (V07 §8's V-M1), and the parity presets, which carry
the rows though their recipes hold islands off — resolves every sky semantic, so the loader never refuses one. The
per-family facts are this volume's, their values volume 11's palette rows (row 52):""")
E('VAL-17 §5.1 land row',
"""| `sky.island.land` | role `sky.ground`: in `ink` one step lighter than `ground`; in `hatched` the patch tone; in `lit` and `night` the `ground` albedo lit by the light pass |""",
"""| `sky.island.land` | role `sky.ground`: in `ink` and its variants `parchment` and `bw-print` one step lighter than `ground` (`bw-print` on its grey ramp); in `hatched` the patch tone; in `lit` and `night` the `ground` albedo lit by the light pass; in `painterly` one step of its colour ramp lighter than `ground`, the relief tier shading the island's terrain as it shades the ground's |""")
E('VAL-17 §5.1 rim row',
"""| `sky.island.rim` | the `cliff` bank program's ticks in `ink` |""",
"""| `sky.island.rim` | the `cliff` bank program's ticks in `ink`, in every family — `parchment` and `bw-print` as `ink`; in `painterly` the rim one of its selectively outlined lines, so it is always drawn |""")
E('VAL-17 §5.1 access row',
"""| `sky.fall`, `sky.access.*` | glyphs in `ink`; a bridge of light's ribbon in role `light` (the glyph tone; its night glow is the `glow` sprite of its `light` marks, E-16) |""",
"""| `sky.fall`, `sky.access.*` | glyphs in `ink`, in every family (`parchment`, `bw-print` and `painterly` as `ink`); a bridge of light's ribbon in role `light` (the glyph tone; its night glow is the `glow` sprite of its `light` marks, E-16) |""")

# ---------------------------------------------------------------- §5.1 (VV56-04: seasons; VV56-05: pennants)
E('VV56-04/05 §5.1 looks',
"""The style role **`sky.ground`** (§8.2's *Roles*) is the land of a sky island: never `ground` itself, so an island reads
against the ground beneath it in every family. The island's own fabric resolves by the ground's semantics.""",
"""The style role **`sky.ground`** (§8.2's *Roles*) is the land of a sky island: never `ground` itself, so an island reads
against the ground beneath it in every family. The island's own fabric resolves by the ground's semantics.

**Seasons on the island** (item 117, the sky's part; J-V5.84 – J-V5.86). A look, never a change (item 117 (a)): no week
changes an island's record or arena, the model's hash, a save, the island's `shadeBasis`, its strips or its `shadeSky`.
The season is §2.9's year position with its follow flag (§7.7's DR42), drawn by the tile worker from the display list
(§8.1 item 8; §8.8's key), so a week change re-skins the sky base and surface layer and re-emits no sky mark.
1. **The climate.** An island reads the document's one climate row as DR42 resolves it — the ground's, with its height
   correction by the ground's S0 relief class — never a row of its own: neither its altitude nor an `own` relief class
   (V05 §3.8 (3)) corrects it (J-V5.84).
2. **Its fabric** (item 117 (f), (f2)). Every face and crown the unit run lays on the island — its gardens, greens and
   orchards, any field face, the rim walk's planting (V01 §3.10.3 step 4), its trees and hedges (§8.10's instances) and
   its buildings' creepers — takes §8.2's season rows by its kind, as a ground face or crown of that kind does in the
   same week: the growing year's looks; autumn's crown colour per tree, by the keyed draw on each crown's render key, with
   the early green, the thinning and the bare crowns. The **fallen-leaf cover** lies by §8.2's rule on the island's own
   surfaces — its ways, greens, gardens, roofs and the spring pond's still water — on a 1.5 m grid laid in the island's
   local frame (cell (0, 0) at its local origin), so the cover moves with the island under a move and under `offset`; it
   reads only the island's own deciduous crowns and never lies on the void, and the ground's cover never reads an
   island's crowns (J-V5.85).
3. **Its water in winter** (item 117 (e)). The island's water takes §8.2's ice rule by its own kinds: the spring pond
   freezes as any `pond` (it carries no item-111 `spring`, V05 §3.8 (4)); the conjured river takes the ice kind its
   course's mean fall gives — at the default `tiltPerMille` a `river`, so it freezes only where the winter reaches that
   row's `freezesFrom` — and every stretch of it falling 2 m per km or more stays an open lead, as §8.2 keeps every fast
   current; the waterfall's lip — the river's stretch carrying both `rim` and `shore` — is an outfall for §8.2's leads,
   its 12 m disc open water in every week, so the fall keeps running and `sky.fall` and `sky.mist` draw all year
   (J-V5.86). An island in an arid row never freezes.
4. **Snow and the sun** (item 117 (g)). While the view's `weather` is `snow` — by default the climate row's snow band in
   a `cold` or `severe` winter, never in an arid row — snow lies on the island as on the ground: the `snow` role over
   `sky.island.land`, its field faces and its roofs, `road` keeping its value. Snow is the one look under which the
   island's land shares the ground's colour; the island then reads against the ground beneath by its rim's `ink` ticks,
   its shadow and, in `offset`, its underside, all drawn in every week. The view sun's height by week (§8.4's *Sun*)
   lengthens the island's drawn shadow (V05 §5.3) in winter and shortens it in summer; the strips and `shadeSky` read
   item 102's model daylight and never move with the week (V05 §3.19), so V05 §5.3 (5)'s agreement is read at an
   equinox week, where the view's path sun stands on the model's day.
5. **The off form and the other states.** A document whose pinned tables hold no item-117 season rows draws the island
   by §8.2's four override rows, as it draws the ground. A `waning` or `settled` island dresses as a floating one; a
   `fallen` or `removed` one has no sky look, its landfall's rubble and quarry face taking the ground's (V05 §3.16).
   Picture exports draw and name the chosen season (V05 §5.5); the re-skin's cost is V05 §6's season row.

**Festival pennants** (item 118 (d), the sky's part; J-V5.87). A look, never a change (item 118 (a)). While the view's
week lies inside a festival's weeks under §2.9's festival display — following §7.7's DR43 schedule, or previewing one
festival — every island not `fallen` or `removed` carries pennants by V11 §3.25.7's `SKY` row (its counts and its band).
The ground's tier rows and their places (`towers`, `walls`, the squares and ways) are the ground arena's: an island draws
the `SKY` row alone, at whatever rung it stands. The row's two places stand on the island as:
* `rims` — the island's rim chain: a run item at the row's spacing from a keyed offset (§8.2's run rule, keyed by the
  island's render key and the festival's id), each pennant on the land side of the rim; the run skips the rim's
  stretches fronting a landing yard, where that landing's own pennants stand, and the waterfall's lip;
* `landings` — each access top's landing yard (`sky_landing_top`, V05 §3.10 (5)): its two pennants at the two ends of
  the yard's front on the rim, flanking the access top, so the yard's passage from the top to its attach on the
  island's way stays clear. A ground landing carries none of the `SKY` row's.
Colours and motifs are §8.2's — the festival's culture and deity rows with the season's motifs (V11 §3.25.7). The
pennants are `live.festival`'s marks on the sky base (§8.2's slot 19b, under every label), drawn in the island's frame
and displaced with it under `offset`, faded with the sky layer under `ghost`, and none while the sky layer is hidden;
the seed, the festival and the island fix them, so they draw the same in every view and export (byte-stable tiles) and a
moved island carries its pennants with it. Picture exports draw them and a VTT island scene in its image only (V05 §5.5;
§11.1); their cost is V05 §6's pennant row.""")

# ---------------------------------------------------------------- §5.5 (the looks in the exports)
E('VV56-04/05 G120 §5.5',
"""pass and its solid, never the strip (J-V5.35). The parity presets export no sky content, their recipes holding islands
off; an export written mid-lag carries `basisCurrent` false, and an export after a load equals the one before.
""",
"""pass and its solid, never the strip (J-V5.35). The parity presets export no sky content, their recipes holding islands
off; an export written mid-lag carries `basisCurrent` false, and an export after a load equals the one before.

**The looks** (items 117 (h), 118 (g), 120 (i)). Every picture export of the sky layer — SVG's `layer.sky` group, the
sky layer's PNG and tiles, print — draws the island's season, its pennants and Find as the view shows them and names the
season and the festival (§11.1). A VTT island scene records the season in its `plat` object with the island's frozen
water faces (the spring pond, a frozen river's stretches) as `ice { walkable }` polygons in the scene's local frame, by
§11.1's battle-map rule, draws the pennants in its image only (never walls, lights or obstacles) and leaves Find off
unless asked. GeoJSON, glTF, CityJSON, the compact twin and `.plat` carry none of them: they are looks, never model
facts.

### 5.6 Find on Sky (item 120, the sky's part; J-V5.89)

Find is a view, never a change (item 120 (a)): its state is the per-viewer view key `find` (§2.9: the chips and the gaps
switch), outside the document, its hash and the log, kept across bands, layers, weeks, epochs and edits until **Clear**
or the panel's close. The panel, the type-ahead, the chip grid, the results and the `live.find` overlay provider are
V09's; the veil, halo, outline, pin and count-bubble rows §8.2's; the gazetteer's class counts and its match listing by
class, area and layer §11.2's, under knowledge admission at the view's effective key (item 120 (h)). This section states
what the sky offers and how a match on an island reads.
1. **What the sky offers** (item 120 (b)), by §11.2's gazetteer over the committed records of every island not `fallen`
   or `removed` (V05 §4.5's island entries): **kinds** — the uses on the islands' plots by their classes, the island
   institution's and the landing tops' (`sky_landing_top`) among them, each class counted once over all layers with
   its split by layer shown; **named institutions** — an institution island's institution (V05 §3.4), the dossier's
   name first; **areas** — each island by its name, the root of its own quarter tree (V05 §3.14: the whole island lifted
   from the veil), and its districts as V01 offers every district; **named places** — the island's own, as the gazetteer
   names them. An access is no target (it has no name and no class); a fallen island's landfall is a Ground place by its
   `place` label's name (V05 §5.4).
2. **On the Sky layer** (item 120 (e), (f)). With Sky the working layer (V09 §4.2), matches on the islands glow over the
   veil by §8.2's rows, each halo, outline, label and city-band pin drawn in its island's frame and displaced with it
   under `offset`, as its marks are (V05 §5.2); an island chip lifts the island's land from the veil and glows along its
   rim. Pins merge into a count bubble only with pins of the same layer and, on Sky, of the same island, so a bubble
   never joins an island's matches to the ground's beneath it or to another island's; a bubble's click zooms in as on
   the ground.
3. **Ghost pins and Go there** (item 120 (f)). With Ground or Below working, each match on an island shows as a ghost
   pin where its mark is drawn — over its ground footprint under `ghost` and `opaque`, displaced under `offset` — and the
   panel counts it "on Sky"; **Go there** sets V09 §4.2's working layer to Sky with its island menu's `key` on the
   match's island and flies to the band that shows it. With Sky working, the ground's and the underground's matches
   show as ghost pins and counts in turn. A hidden sky layer (§8.4) keeps its matches' ghost pins and counts, so a match
   is never lost, and Go there turns its visibility on, as switching the working layer does.
4. **Show gaps** (item 120 (i)). On an island Show gaps reads V01's units over the island's districts; for a class with
   a coverage row the island's units are V05 §3.5 (3)'s — its districts for a row counted by district or neighbourhood,
   the whole island for one counted by walking radius or by households — each unit with no member of the class outlined
   dashed along its land's edge and labelled "none here". A class `IslandRule.carry.never` excludes reads as any gap;
   the clerk's why names the carry rule (V05 §4.5).
5. **Over time, edits and knowledge** (item 120 (f), (h)). Every commit, regenerate, undo and epoch re-evaluates the
   chips: a raised or declared island's matches glow in its commit, a moved island's glow moves with it, a fallen
   island's go dark with its landfall then offered on Ground, and a removed island offers nothing. A `secret` access's
   landing yards, and a concealed use or institution on an island, are never suggested, counted, glowed or pinned under
   a key that withholds them (V05 §5.5's *Knowledge*; §11.2).
6. **Exports and cost** (item 120 (i), (j)). A picture export draws Find on the sky layer as shown (V05 §5.5); the
   islands' entities join `live.find`'s index, rebuilt once per commit, and the overlay never re-renders the sky base —
   V05 §6's Find row.
""")

# ---------------------------------------------------------------- §6 (VV56-06: the comfort level; the looks' rows)
E('VV56-06 §6 intro',
"""All PLAUSIBLE until M6-sky measures them (V05 §8), on §12.1's reference machine; the sky is off on the one-click path, so
§12.3–§12.5's laws are unchanged there.""",
"""All PLAUSIBLE until M6-sky measures them (V05 §8), on §12.1's reference machine; the sky is off on the one-click path, so
§12.3–§12.5's laws are unchanged there. The rows are the targets; the comfort level below binds every one-time wait the
sky takes part in (item 119).""")
E('VV56-04/05 G120 §6 rows',
"""| memory | ≤ 5.2 MB for three islands""",
"""| the season switch, on a tile an island covers (item 117) | within §12.5's re-skin budget (R12-30) for the sky base and surface layer with the ground's; the island's leaf cover and ice inside R12-30's 20 % of the tile's raster time | same | a re-skin of the sky marks' `season` column and the sky surface layer's light at the week's view sun; no S14 re-emit, no model work |
| the pennants, on a tile an island covers (item 118) | inside R12-30's 20 % with the ground's decorations, made lazily per visible tile (§12.5) | same | `live.festival`'s run on the rim and the pennants at ≤ 9 landing tops an island (`accessCount.max` + `accessCount.handMax`): a few dozen glyphs an island at V11's `SKY` row |
| Find on Sky (item 120) | inside item 120 (j)'s overlay budget (§12.5: suggestions ≈ 50 ms of a key, a chip's glow ≈ 100 ms of the click) with three islands at the METROPOLIS cap | same | the islands' entities in `live.find`'s index, rebuilt once per commit (≈ 2–5 % of the town's plots, the unit-run row's basis); an overlay above the sky base, which is never re-rendered |
| memory | ≤ 5.2 MB for three islands""")
E('VV56-06 §6 comfort',
"""rung 3 for the sky base only, reported in the view telemetry; any other row missed is re-declared at its measured value for
the owner's veto (D-18).
""",
"""rung 3 for the sky base only, reported in the view telemetry; any other row missed is re-declared at its measured value as
a target miss inside the comfort level (D-18) — a one-time wait past the comfort level is never declared: its path changes
first (§12.10's R12-31).

**The targets and the comfort level** (item 119, the sky's part; J-V5.88). The rows above are the targets — as fast as
possible, the build pressing every one toward its figure (item 119 (a)). Every one-time wait the sky takes part in
completes within §12.1's comfort level — ten seconds of total time from the click to the complete result on §12.1's
reference hardware, at CITY and METROPOLIS with three islands, from each rung's bottom to the population cap — the island
rows above being its parts:
* a generation, and a regenerate or Re-derive from S7b with islands — the model's critical path with S14's sky marks and
  the first map's sky tiles;
* declaring an island after generation, and `fallIsland` by hand — each with its relocations, its scoped re-derivation
  and its redraw;
* opening a document with islands, the island-basis migration step included (§7.5, file f item 274), and a dossier
  change that reaches the islands (DR27);
* an `advance` whose epochs run the island laws — the island events an epoch can run priced into V06 §6.8's estimate from
  this section's resize row (`epoch.islandMs`, `epoch.handAccessMs`), so the `advance` as a whole stays inside the
  comfort level, in total (item 119 (a2); J132);
* an export with the sky layer, in every format and size the export dialog offers (§12.1).
A wait past about one second shows its progress, SKY and the islands' unit runs posting as stages (§11.2's `Progress`;
V09 §4.21.9), never an empty screen (item 119 (c)). A row runs slower than its target only for a recorded measured gain
inside the comfort level, as its `perf.qualitySpend` row (V11 §3.25.8; none ships for a sky stage) (item 119 (b)). The
interactive rows — `setAttr`, a move, a resize and a rim reshape, New random on an island, `placeSkyAccess` and an
access `delete`, Update shade now, the pending strip, the season and festival switches and Find on Sky — are
interaction budgets and keep their figures (item 119 (d)). The low tier aims at the same ten seconds, a size it cannot
reach declared per device (item 119 (e)). T-V5-18 measures the comfort level at every island rung.
""")
