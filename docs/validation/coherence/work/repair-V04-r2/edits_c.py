# V04 repair r2 — edits, part c: V04 §5.1, §5.2, §5.5, the new §5.6, §6.
EDITS = []


def S(ids, old, new, count=1):
    EDITS.append((ids, old, new, count))


# ---- §5.1 *Find on Below* (4): the gap units are V01's (VAT1-02, R2-34)
S('VAT1-02 §5.1 (4)',
  "`districtsAbove` (V01 §3.16) reads it upward. Show gaps' units Below are the undercity districts, each outlined dashed\n"
  "   \"none here\" in the band holding its core.",
  "`districtsAbove` (V01 §3.16) reads it upward. Show gaps' units Below are V01 §5.4 (3)'s `gapUnits` on the underground\n"
  "   parts, restating none. Each undercity neighbourhood and the underground pseudo-district is a `district` unit (V04 §3.6a\n"
  "   (5)), and the per-plot units read `underDistance`. Each gap is outlined dashed \"none here\" in every band holding its\n"
  "   plots, an undercity neighbourhood's in the band holding its core.")

# ---- §5.2: every shipped sheet's facts (VAL-R1-06, R2-29 (a)); the building's damage (G123-V04)
S('VAL-R1-06 §5.2 (1) rock',
  "1. **Rock** — a hatched halo of `rockHaloM` (4 m) outside every void's kerb, in the role `rock` (item 413: `ink` a 40 %-ink\n"
  "   cross-hatch at 1.2 paper px; `lit` a dark stone fill; `hatched` its dense hatch), the rest of the rock transparent so the\n"
  "   ghost shows: the dungeon-map figure-ground, where voids read as carved (J-V4.31).",
  "1. **Rock** — a hatched halo of `rockHaloM` (4 m) outside every void's kerb, in the role `rock` (item 413; each sheet's\n"
  "   facts below), the rest of the rock transparent so the ghost shows: the dungeon-map figure-ground, where voids read as\n"
  "   carved (J-V4.31).")
S('VAL-R1-06 §5.2 (2) void',
  "in the role `void` (the paper, a step lighter than the\n   ghosted ground).",
  "in the role `void` (one step lighter than the\n   ghosted ground; each sheet's facts below).")
S('G123-V04 §5.2 (5) buildings',
  "hatch (§8.2), party walls and door ticks as on the ground; the undercity's informal clusters by §4.7's cluster rows.",
  "hatch (§8.2), party walls and door ticks as on the ground; the undercity's informal clusters by §4.7's cluster rows; a\n"
  "   building's damage (g item 123) by V04 §5.6.")
S('VAL-R1-06 §5.2 sheets',
  "  otherwise known as its `knownTo` says once it is accessible, and a `lost` cluster keeps that knowledge.\n",
  "  otherwise known as its `knownTo` says once it is accessible, and a `lost` cluster keeps that knowledge.\n"
  "\n"
  "**Every shipped sheet** (§8.2's slot resolution; J-V4.131). The underground layer composes its own list in the draw order\n"
  "above; every shipped sheet — §8.2's presets table: `ink`, `lit`, `hatched`, the ink-family variants `parchment`,\n"
  "`bw-print` (on its grey ramp) and `night`, `painterly` from V07's V-M1, and the parity presets, in the `ink` (MFCG) and\n"
  "`lit` (FTG) families — resolves every `under.*` semantic, so the loader never refuses one; a user sheet missing one\n"
  "resolves it by §8.2's slot resolution. The per-family facts are this volume's, their values the style sheets' (V11's\n"
  "registry row 52), and `painterly`'s are drawn by V07 §5.1's programs in its palette:\n"
  "\n"
  "| semantic (role) | per-family facts |\n"
  "|---|---|\n"
  "| `under.rock` (`rock`) | the halo of `rockHaloM`, the rest of the rock transparent: in `ink` a 40 %-ink cross-hatch at 1.2 paper px, and so in `parchment` (over its texture) and in `night` (in its `@night` ink); in `bw-print` that cross-hatch on its grey ramp; in `lit` a dark stone fill, lit by the light pass's rock prisms (V04 §5.3); in `hatched` its dense hatch; in `painterly` a wash of its ground ramp's darkest step under dense hachures in its relief tier's stroke; the rubble stipple (the `ruin` program's, V04 §5.6's) in the same tone |\n"
  "| `under.void` (`void`) | one step lighter than the ghosted ground, so a void reads as carved in every sheet: the paper in `ink`, `hatched` and `painterly` (its paper tone), `parchment`'s texture, `bw-print`'s white, `night`'s `@night` paper, `lit`'s `ground` tone lifted one step |\n"
  "| `under.water` (`water`) | the family's own `water` role: the ink-family water tone in `ink`, `parchment` and `night`, its grey in `bw-print`, `lit`'s water ramp, `hatched`'s water tone, `painterly`'s first water band alone (a channel is 0.4 × its bore wide) |\n"
  "| `under.wall` (`wall`) | the `wall` stroke at (4)'s weights in every family, black in `bw-print`; in `painterly` one of its selectively outlined lines, so always drawn; the `ruin` program's double stroke and the sealed style's dash alike in every family |\n"
  "| `under.building` (`building`) | the family's footprint fill and outline as on the ground — no roof is seen below —, the `vault` hatch on the vault classes in every family (`bw-print` in its grey) |\n"
  "| `under.trace` | the adjacent bands' traces (§8.4): an `ink` hairline at alpha 0.5 in every family (`bw-print` its mid grey, `night` its `@night` ink) |\n"
  "| `under.access`, `under.link` | §8.2's `states` glyphs in `ink` in every family — `parchment`, `bw-print` and `painterly` as `ink`, `night` in its `@night` ink, a lit access's `light` marks carrying the `glow` sprite at night (§8.4) |\n"
  "| `under.label` | role `label` in every family, by §9's faces |\n")

# ---- §5.5: the VTT's line of sight and the damage in exports (G123-V04)
S('G123-V04 §5.5 VTT',
  "`line_of_sight` from every void kerb and chamber wall and every underground building's footprint less its doors,",
  "`line_of_sight` from every void kerb and chamber wall and every underground building's footprint less its doors and the outer wall runs its damage has felled (V04 §5.6),")
S('G123-V04 §5.5 damage',
  "a VTT scene carries it only when asked (§11.1's battle-map rule); GeoJSON, glTF, CityJSON and CSV never carry it (a\n"
  "view, never the model).",
  "a VTT scene carries it only when asked (§11.1's battle-map rule); GeoJSON, glTF, CityJSON and CSV never carry it (a\n"
  "view, never the model). **Damage** (item 123 (e)): a per-band PNG, SVG and VTT scene draw an underground building's\n"
  "damage at the export's drawn week (V04 §5.6); GeoJSON, glTF, CityJSON and CSV export the model, never the damage.")

# ---- §5.6 (new): item 123 below ground (G123-V04, R2-38 (4), R2-35, R2-36)
S('G123-V04 §5.6',
  "\n## 6 Performance budgets\n",
  "\n### 5.6 Damage below ground — cellars, crypts and underground buildings (g item 123; J-V4.130)\n"
  "\n"
  "Item 123's damage layer — one plan, never redrawn; each plan element shown damaged when its building's decay level\n"
  "reaches the element's keyed threshold, the one comparison every reader makes (§2.6 step 7; §6.3's `plan.damage`;\n"
  "V06 §3.23's `decayLevel`) — reaches below ground by the rules below. V03 draws the plan and its damage, V02 the exterior;\n"
  "this volume states what is particular below ground. It is a drawing only: no record, field, id or digest changes.\n"
  "1. **The level each element reads.** A storey below 0 of a ground building — its cellars, stores and undercrofts, and\n"
  "   its crypt with its capped bays (V03 §3.7) — is part of that building's one plan and reads that building's level,\n"
  "   `decayLevel(doc, its lineage, week)`. An underground building — a sewer-front dwelling, an F4, F6 or C4 building, an\n"
  "   undercity building (V03 §3.12) — reads its own lineage's, whose decay run the underground's own events start\n"
  "   (V06 §3.23 (1)): the abandonment of a `lost` cluster's dwellings (V04 §3.5.7 (g) (5)), the plots a shrinking or\n"
  "   cleared undercity neighbourhood vacates (V04 §3.10), a void dwelling vacated on a floor `Foundations.apply`\n"
  "   collapses; its restoration is V06 §3.23 (3)'s, as for every building. No level reads a void's closure state or the\n"
  "   excavation reading.\n"
  "2. **The kinds below ground, each with its own thresholds** (item 123 (c)). `belowKind(building, element)`\n"
  "   (`@plat/under`, derived, never stored) gives an element below ground one of five kinds, each a row of V11's item-123\n"
  "   table by element kind, so it draws its own range and its own threshold — §6.3's `plan.damage` draw, keyed by (the\n"
  "   building's lineage, the element's id), as every element's; no id is minted:\n"
  "\n"
  "| kind | the elements | element id | damaged, drawn as |\n"
  "|---|---|---|---|\n"
  "| `cellarWall` | a wall run of a storey below 0 on `Basement.ring`'s outer edge outside the crypt's ring; an underground building's wall run on a footprint side that lies on its part's rock (outside the part's `bandUnion`, §3.7) | its `wall:` id (V03 §2.2) | partly collapsed: the run's middle third broken over a rubble spill 60 cm deep into its room, still a wall to sight and passage, earth or rock behind it |\n"
  "| `cellarVault` | the ceiling over each room of a storey below 0 outside the crypt and its capped bays | the room's id | fallen: a rubble heap over the room's middle half (its ring inset by a quarter of its least width), the ceiling drawn open above it |\n"
  "| `cryptWall` | a wall run on the crypt's ring (`Basement.crypt.ring`) or on its capped bays' ring | its `wall:` id | as a `cellarWall` |\n"
  "| `cryptVault` | each cell of the crypt's column grid (V03 §3.7.5: pitch `crypt.bayCm` in the step-2 ring's frame, which no rank event moves) whose centre lies inside the crypt's or its capped bays' ring; a crypt whose ring holds no cell centre has one, its room's ceiling whole | (its room's id, the cell's grid node (i, j)), or its room's id — a key, never a new id | fallen: a rubble heap filling the cell, its columns standing |\n"
  "| `cryptTomb` | each furniture piece of a `crypt` room (V03 §3.8: its tombs, ledger slabs and niches) | its `furn:` id (V03 §2.2) | broken open: a lid cracked, a slab split, a niche breached, as V03 draws a broken piece |\n"
  "\n"
  "Every other element below ground keeps its V03 kind and range: a partition, an opening, a stair core, an access head, a\n"
  "cellar's furniture, and an underground building's elements other than its rock-side runs. The floor of the lowest\n"
  "storey below 0 lies on the earth and is no element, so it never fails. **The ranges** are V11's values in an order this\n"
  "volume rules: each of the five kinds' ranges lies inside the `ruined` share of the level (V06 §3.23 (2)), the crypt's\n"
  "kinds at its top, so a cellar and a crypt stand intact through `abandoned` and `decayed` and partly collapse only once\n"
  "`ruined`; and a damaged element of the five never removes a room, a wall line, a way down or a join — at level 1 a\n"
  "ruined church keeps its crypt (V03 §5.1), every bay fallen and every tomb broken open, its rooms and its ways standing.\n"
  "3. **Below ground, drawn.** A damaged element below 0 not of the five kinds is drawn as V03 draws its kind damaged, but\n"
  "   for one rule: a stair core whose `levels` include a storey below 0, and an access head on one, draws as rubble over\n"
  "   its steps, a way still climbable — the way down is the access model's (4). The rubble below ground is the `ruin`\n"
  "   program's stipple in the `rock` role (V04 §5.2), one stipple for every collapse below ground; a repaired element —\n"
  "   its threshold above the level and at or below `decayPeak` (V06 §3.23 (3)) — is drawn in item 114's patch material\n"
  "   (§8.6). On a building's plan V03 draws a storey below 0 at its storey (V03 §5.1; PageUp and PageDown step to it,\n"
  "   V04 §5.1). In the underground view an underground building's footprint (V04 §5.2 (5)) draws its plan's damage as V02\n"
  "   draws a ground building's exterior (item 123 (d)): an outer wall run past its threshold a gap in the outline over the\n"
  "   stipple — a `cellarWall` run instead broken over its spill, the outline kept closed —, a roof bay over a room past\n"
  "   its threshold a hole in the footprint's fill over the room's rubble, a door past its threshold an open gap without\n"
  "   its tick. §5.3's prisms follow: a fallen outer wall run and a fallen roof bay leave their prisms, so light passes\n"
  "   the gap. An underground building in a `collapsed` or `flooded` element draws that element's §8.2 `states` row over\n"
  "   its own damage.\n"
  "4. **A drawing only; the access model untouched.** No stage of this volume — U-NET, U-SYS, U-ACCESS with its\n"
  "   excavation reading, U-FRONT, U-CITY, U-LINK, U-DIG, U-FADE — reads a level or a threshold. A crypt join (V04 §3.5.7\n"
  "   (c)), a dig access ((d)), a basement access (L3) and every link keep their records and states at every level, and a\n"
  "   way below ground closes only by this volume's closure states: an access `bricked` or deleted with its host\n"
  "   (V04 §3.10), a link `collapsed` or `flooded`, an element sealed, silted or caved in (II.6), a cluster `lost` — which\n"
  "   stays lost whatever its buildings show. So a ruined church keeps its crypt and its join, a building over a void\n"
  "   whose cellar vault has fallen keeps its dig access, and a collapsed access head is V03 §5.3's trace of a closed\n"
  "   host, never a level's.\n"
  "5. **Exports** (item 123 (e)). A per-band PNG and SVG draw the damage as shown at the export's drawn week. The per-band\n"
  "   VTT scene follows it (§11.1's battle-map rule): an underground building's outer wall run past its threshold gives no\n"
  "   `line_of_sight` segment and a door past its threshold no portal (an open gap), a `cellarWall` run keeps its segment,\n"
  "   and rubble and holes are drawn in the image, never as walls; a plan's storey below 0 exports in V03's per-storey\n"
  "   scene by the same rules. GeoJSON, glTF, CityJSON and CSV export the model, never the damage.\n"
  "6. **Landing, budget, edges, bar.** It lands at U5 (V04 §8): the underground view's footprints and the per-band exports\n"
  "   there, a plan's storeys below 0 once V03's item-123 step draws the plan's damage (V03 §8), and every level read from\n"
  "   the existence state at V11's default age until V06's level lands (V06 §3.23 (4)). A building never decayed draws\n"
  "   byte-identically to its build without the layer (`item123.damage`). Its budget is V04 §6's *Damage below ground*,\n"
  "   its edges UE33 and UC21 (V04 §3.11), its bar T-V4-82.\n"
  "\n"
  "## 6 Performance budgets\n")

# ---- §6: the budget of the damage below ground (G123-V04)
S('G123-V04 §6 budget',
  "a band step with chips on re-composes the overlay within the band switch's own ≤ 150 ms and re-rasters no base\n"
  "tile for Find.\n",
  "a band step with chips on re-composes the overlay within the band switch's own ≤ 150 ms and re-rasters no base\n"
  "tile for Find.\n"
  "\n"
  "**Damage below ground** (g item 123; V04 §5.6): a reading inside the drawing — one `decayLevel` read per building, one\n"
  "comparison per element and one `belowKind` look-up of the element's storey, ring or room: ≤ 1 ms per band at CITY for\n"
  "the underground buildings' footprints (≈ 400 buildings, ≈ 20 elements each), inside T7's ≤ 6 ms per band; a storey\n"
  "below 0 inside V03's plan draw; a week that moves no element past its threshold re-rasters nothing; the per-band VTT's\n"
  "line of sight inside its ≤ 1.5 s.\n")
