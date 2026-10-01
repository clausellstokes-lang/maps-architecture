# edits_c: §3.25 (retitled; head; §3.25.3, §3.25.4, §3.25.6; new §3.25.9 – §3.25.11) and §3.26
H325 = "### 3.25 The rows of the owner's rules of 29 and 30 September (items 111, 113–119)"
H326 = "### 3.26 Edges and combinations"

S3259 = """
**3.25.9 Crisis looks** (item 122, with (h)–(i): a LOOK only — no crisis moves, adds or removes anything and no cell here
is read by a model stage, so the document hashes identically with crises on and off and in every week; `crisis.looks` with
its named row `settings`, registry row 107, and `crisis.map`, row 108; the shapes, the placement rules and the parts each
kind draws are §10.2 *Crisis looks*, the derivation §7.7's DR44, each look's marks by band — its symbols, in role keys,
never a colour here — §8.2's crisis look rows, the outskirts' land and a disaster's districts V01's `campLand` and
`disasterDistricts`, the refugee camp's frontier V06's `frontierFor`). The numbers are `own` and calibratable, their
register entries V12 §3.11's, `scale` and `lookLevel` `extension` (the parity presets draw no look); `kind`, `label`,
`place`, `band` and `priority` are enumerations, `calibratable: false`.

*`crisis.looks`* (one row per look kind; `scale` the extent at severity 0 – 1 by rung, linear between — m² of camped
ground at a camp place, each cell a headcount × `areaPerHeadM2`, the heads in brackets, else the share of the place's
units; `band` the coarsest band §8.2 draws a part at; `priority` the camp looks' turn on the outskirts, lowest first):

| kind | label | place | band | scale by rung (THORP · HAMLET · VILLAGE · TOWN · CITY · METROPOLIS) | priority |
|---|---|---|---|---|---|
| `siege` | "Siege camps" | `beyondWalls` | city | m² 900–2 700 · 2 250–9 000 · 4 500–22 500 · 22 500–135 000 · 90 000–450 000 · 225 000–1 350 000 (20–60 heads, a war band, to 5 000–30 000, a full siege line) | 1 |
| `blockade` | "Blockade camps" | `approachRoads` | city | as `siege` (the same forces before a place with no standing wall) | 1 |
| `quarantine` | "Quarantine camp" | `outside` | city | m² 225–900 · 450–2 250 · 900–4 500 · 4 500–22 500 · 13 500–90 000 · 45 000–270 000 (5–20 to 1 000–6 000 heads) | 2 |
| `refugeeCamp` | "Refugee camp" | `approachByGate` | city | m² 450–1 800 · 900–5 400 · 2 250–13 500 · 9 000–67 500 · 45 000–360 000 · 135 000–1 125 000 (10–40 to 3 000–25 000 heads) | 3 |
| `occupation` | "Occupation" | `gatesAndKeep` | city | m² of its garrison camp 225–900 · 450–2 250 · 900–4 500 · 4 500–22 500 · 22 500–90 000 · 45 000–225 000 (5–20 to 1 000–5 000 heads) | 4 |
| `famine` | "Famine" | `fields` | city | share of the fields bare 0.3–1 at every rung | 5 |
| `beast` | "Beast attacks" | `edge` | district | share of the edge's runs torn 0.05–0.4 at every rung | 5 |
| `raiders` | "Raiders" | `outlyingFarms` | city | share of the outlying farmsteads burned 0.1–0.6 at every rung | 5 |
| `disaster` | "Ruined quarters" | `neighbourhoods` | city | share of the districts — at THORP, HAMLET and VILLAGE of V07's ends — 0.05–0.5 at every rung; `lookLevel` 0.67–0.95 | 5 |
| `rebellion` | "Barricades" | `streets` | district | share of the junctions barricaded 0.1–0.6 at every rung | 5 |
| `boom` | "Building boom" | `streets` | district | share of the frontages scaffolded 0.05–0.3 at every rung | 5 |
| `bust` | "Shuttered shops" | `streets` | district | share of the shops shuttered 0.1–0.6 at every rung | 5 |

* **The rows' readings.** The camp looks' priorities are item 122 (c)'s order — the siege camp, then the quarantine camp,
  then refugees — the blockade beside the siege it stands for and an occupation's garrison after them; the other looks take
  no camp land, their priority 5 unread. The `disaster` row's `lookLevel` lies in the `ruined` share of the decay level
  (V06 §3.23 (2)): a ruined quarter's buildings draw item 123's damage there by severity, or at their own level where that
  is higher (§10.2 (d)). The ranges: each m² cell [0.25, 4] × its value, each share in [0, 1], `lookLevel` inside [2/3, 1].
* **`settings`**: `densityCap` 0.5 — the share of the outskirts' free land the camp looks take together (item 122 (c);
  range [0.1, 0.9]); `siegeStandoffM` 300 — item 122 (b)'s "beyond bowshot" (range [150, 500] m; general: a war bow's and a
  crossbow's effective reach of 200–300 m); `areaPerHeadM2` 45 — item 122 (h) (range [30, 60] m²; general: Roman marching
  camps and present-day refugee-camp standards near 30–45 m² a head — tents, lines, horses and lanes); `enginesPerBesiegers`
  1 500 — item 122 (h): one siege engine to about this many besiegers (range [500, 5 000] people); `previewSeverity` 0.6 —
  the severity a preview draws its look at (§2.9's `crises`; range [0, 1]).
* **Item 122 (h)'s rates** are three of these cells. A force's or a travelling group's camp is `areaPerHeadM2` × its heads
  where the dossier gives them — two armies joined, twice the ground —, the condition's `exodus` or arrivals standing in
  where it gives none, and the `scale` row by severity and rung only where it gives no count at all (§10.2 (c)); the engines
  are one per `enginesPerBesiegers` heads, capped by §10.2 (f)'s gates and curtain runs; a coalition's spread round the
  town — each army its own camp in its own colours, the ring fuller as the coalition grows — is §10.2 (f)'s rule (bearings
  evenly spaced from a keyed start) and holds no cell.

*`crisis.map`* (the closed mapping, item 122 (b): every SettlementForge stressor type and condition archetype has one row —
a look or an explicit `none`; key `from/key`; the words are SettlementForge's own at its pinned baseline, identity only
(§17.1), read by V08's census; a dossier row set, never calibrated, landing with the port at M-SF (C4b) — until then the
set is empty and every condition reads `none`, §10.2 (b)):

| from | key → look |
|---|---|
| `stressor` | `under_siege` → `siege`; `mass_migration` → `refugeeCamp`; `plague_onset` → `quarantine`; `famine` → `famine`; `monster_pressure` → `beast`; `occupied` → `occupation`; `insurgency`, `slave_revolt` → `rebellion`; `wartime`, `indebted`, `infiltrated`, `politically_fractured`, `recently_betrayed`, `religious_conversion`, `succession_void` → `none` |
| `archetype` | `war_pressure` → `siege`; `regional_migration_pressure` → `refugeeCamp`; `plague` → `quarantine`; `famine` → `famine`; `vassal_extraction` → `occupation`; `rebellion` → `rebellion`; `boom` → `boom`; `bust` → `bust`; `reconstruction`, `resource_strike`, `vein_exhausted`, `trade_route_cut`, `food_anchor_lost`, `corruption_exposed`, `faction_challenge`, `dominant_npc_removed`, `stressor_residual`, `custom_crisis`, `regional_authority_instability`, `regional_tax_revenue_disruption`, `regional_criminal_pressure`, `regional_religious_pressure` → `none` |
| `event` | `REFUGEE_WAVE` → `refugeeCamp`; `PLAGUE` → `quarantine`; `RAID_OR_MONSTER_ATTACK` → `raiders`; `calamity` (a strike of the simulator's calamity kernel, `calamityHistory`) → `disaster` |

* **The readings.** `regional_migration_pressure` is the mass immigration item 122 (b) names, so it draws the refugee camp;
  the other `regional_*` pressures are its "no look (nothing physical)". `war_pressure` is the siege it names beside the
  siege stressor; `wartime`, a war away from the walls, draws none. An insurgency and a slave revolt are risings, drawn as
  barricades; `vassal_extraction`, an overlord's men in the town, as an occupation. `reconstruction` draws none: its Works
  scaffolding is the model's own (§4.11), the aftermath a disaster's look hands over to (V06 §3.22).
  `RAID_OR_MONSTER_ATTACK` strikes the outlying farms first, so it draws `raiders`; a standing monster threat draws `beast`
  through `monster_pressure`. Every calamity draws `disaster`, its districts the calamity's `targets` first, else its
  pattern — fire, flood or earthquake — by its type (V01's `disasterDistricts`, §10.2 (d)).
* **Totality** (T-V11-46 (a); T122-4). The compile checks the `stressor` rows against the catalogue manifest's
  `sf.stressors@<line>` list and the `archetype` rows against its `sf.conditionArchetypes@<line>` list (registry row 77;
  V08's census at the pinned baseline): a listed word without its row fails the build until the row is written, so the
  rows above — SettlementForge's fifteen stressor types and the archetypes its conditions carry today — grow with the line;
  a word V08 meets that no row maps reads `none`, reported `unmapped_word` (V08).
* **Off** — no switch in V11 §3.24.0: §2.9's `crises` key turns the looks off per viewer, and with no condition standing and
  no preview nothing is drawn, every tile byte-identical to the base (`item122.crises`; T122-7).

**3.25.10 Damage in a ruined building's plan** (item 123: a drawing only — one plan, never redrawn; no damage moves, adds
or removes a room, wall, opening or id, and no cell here is read by a model stage; `damage.elements` with its named row
`settings`, registry row 109, and `damage.materials`, row 110; the mechanism is §2.6 step 7's damage layer, §6.3 *Plan
damage*'s keyed threshold t = lo + u · (hi − lo) per plan element and V06 §3.23's decay level, an element showing damaged
while the level is above 0 and at least t; the drawings are V03's, V02's and V04's, the battle maps §11.1's). The numbers
are `own` and calibratable, their register entries V12 §3.11's; `states` is an enumeration, `calibratable: false`.

*`damage.elements`* (each kind's range of the decay level lies inside the shares of the existence states whose look item
123 (c) gives it — V06 §3.23 (2)'s thirds: `abandoned` [0, 1/3], `decayed` [1/3, 2/3], `ruined` [2/3, 1] — so each state's
look holds whatever the years; outer walls and ground floors late, partitions and upper floors early; a range's ends move
freely inside its states' shares, the lower below the upper):

| kind | range | states | item 123 (c)'s look |
|---|---|---|---|
| `furniture` | 0.02–0.30 | abandoned | broken furniture |
| `door` | 0.05–0.33 | abandoned | doors off their hinges |
| `window` | 0.10–0.33 | abandoned | shutters and panes broken among the dust and debris |
| `partition` | 0.36–0.66 | decayed | partition walls down |
| `roofBay` | 0.40–0.66 | decayed | roof holes open to the sky over their rooms |
| `upperFloor` | 0.40–0.95 | decayed, ruined | rotten floor patches and holes, then the upper storeys mostly floorless — fragments over the void |
| `stair` | 0.70–0.90 | ruined | the way up gone with the floors it served |
| `outerWall` | 0.72–0.98 | ruined | outer walls broken |
| `groundFloor` | 0.85–1 | ruined | rubble heaps on the one walkable storey |
| `cellarVault`, `cellarWall` | 0.75–1, 0.80–1 | ruined | cellars intact or partly collapsed by their own thresholds |
| `cryptTomb`, `cryptVault`, `cryptWall` | 0.86–1, 0.88–1, 0.92–1 | ruined | the crypt last: a ruined church keeps its crypt (V04 §5.6) |

* **`settings`**: `defaultAgeYears` 40 (range [0, 300] yr) — the years a building whose log holds no decay run reads at:
  one generated abandoned, decayed or ruined, one first met so in item 113's replay, and every building before V06's level
  lands at M6-E (V06 §3.23 (4)).

*`damage.materials`* (V06 §3.23 (2)'s rate r for the building's walls material, `Building.material.walls`: the level a
decay run gains a year; timber faster than stone, item 123 (b); general: an unroofed timber frame rots through within a
generation, a masonry shell stands for a century and more; range [0.002, 0.1] each):

| material | rate a year |
|---|---|
| `ashlar` | 0.008 |
| `rubble` | 0.011 |
| `brick`, `dry_stone` | 0.012 |
| `timber_frame` (the default row), `timber_crib` | 0.03 |
| `timber` (the boards of a shanty or a deck) | 0.035 |
| `wattle_daub`, `cob`, `earth_bank` | 0.04 |

A walls material with no row — a pack's, a regional shift's — reads `timber_frame`, the commonest walls material of
V11 §3.19.3's default rows (the table's `defaultRow`, V11 §2.1), reported once.

* **`says`** (ids `dmg/<table>/<row>`): the ranges — "doors and furniture go first, then partitions, roofs and the upper
  floors; outer walls and the ground floor last, the cellar and the crypt longest"; a rate — "{material} decays about {r} of
  the way to a ruin a year: timber within a generation, stone over a century and more".
* **Off** — no switch: a building never decayed (level 0) draws its plan unchanged (`item123.damage`; T123-7).

**3.25.11 Light weather** (item 124: a LOOK only — the animated effects never change a tile, the model, the document or
its hash, and no cell here is read by a model stage; the climate rows' `weather` cells and the `weather` block of the
climate table's named row `settings`, registry row 43; the mechanism is §6.1 *The weather stream* — the session-seeded
timeline —, §8.2's effect marks and §8.4 (i)'s light terms, the switch V09's device state). The numbers are `own` and
calibratable, their register entries V12 §3.11's, `perHour` `extension` (the parity presets resolve it 0: no spell), but for
the two caps of the hard rules below; the weeks are V11 §3.25.6's (0–51 from the first week of spring; a band `a–b`
includes both ends and wraps the year's end when a > b).

* **The columns.** A climate row holds, for each effect kind, its bands of weeks, each with `perHour` — how often: the
  mean spells of the kind an hour of clear map — and, where it differs from the kind's, `lengthS` — how long a spell lasts.
  At a week the kinds whose band holds it are live, each at its `perHour` × the largest factor of the sites that apply
  (below); with R their sum, the clear time after a spell (and from the map's opening) is exponential with mean 3 600 ÷ R
  s, the next kind is k with chance perHour_k ÷ R, and its length is uniform in its `lengthS` — §6.1 draws the three
  uniforms in that order. A week with no live kind brings no spell. A band holds its cells through its weeks, so the weeks
  turn by bands written as transitions — the first flurries before deep snow, a thaw of rain — never by interpolation, and
  a kind absent from a band stays absent through it (the arid dry months).
* **The commonest kind** of a week — the one V09's **Start a shower now** starts (§6.1) — is its live kind of greatest
  `perHour` after the sites' factors, ties in `WeatherKind`'s order (V11 §2.8); a week with no live kind starts none.

*The kinds* (`settings.weather.kinds`; `hours` the hours of the view's day a spell may start in, read only under
`light: 'time'` (§2.9), so fog and mist come on cool mornings and burn off as the day goes on, item 124 (d); every
`lengthS` lower end at least twice its kind's fade in §8.4 (i), so a spell reaches its full strength):

| kind | length s | hours |
|---|---|---|
| `rain` | 30–90 | — |
| `drizzle` | 60–180 | — |
| `snow` | 60–240 | — |
| `mist` | 120–360 | 4–11 |
| `fog` | 180–600 | 4–11 |
| `leaves` | 20–60 | — |
| `cloudShadow` | 120–480 | — |
| `shimmer` | 120–600 | 10–18 |
| `dust` | 120–480 | — |

*The climate rows' weather cells* (weeks · spells an hour, a length in s where it differs from the kind's; item 124 (c)'s
defaults — temperate rows: spring showers, the odd summer downpour, autumn fog and blowing leaves, winter snow where it
freezes; maritime: frequent rain in autumn and winter, morning fog; arid: clear most of the year, rare short showers in its
short wet weeks, heat shimmer and dust haze, never snow; cold: snow most of the winter, frozen fog on still days):

| biome | rain | drizzle | snow | mist | fog | leaves | cloud shadows | shimmer, dust |
|---|---|---|---|---|---|---|---|---|
| `temperate-deciduous` | 0–12 · 3; 13–25 · 1 (60–180 s); 26–40 · 2 | 0–12 · 1; 26–40 · 2 | 41–42 · 1 (first flurries); 43–51 · 3; 0–1 · 1 (the thaw) | 0–12 · 0.5; 26–37 · 1 | 26–42 · 1.5; 43–51 · 0.5 | 31–37 · 6 | 0–12 · 2; 13–25 · 3; 26–38 · 2 | — |
| `temperate-coniferous` | 0–12 · 2.5; 13–25 · 1 (60–180 s); 26–39 · 2 | 0–12 · 1.5; 26–39 · 2 | 40 · 1; 41–51 · 3; 0–3 · 1.5 | 0–12 · 1; 26–39 · 1.5 | 26–40 · 1.5; 41–51 · 0.5 | 29–35 · 3 | 0–12 · 2; 13–25 · 3; 26–39 · 2 | — |
| `mixed` | 0–12 · 3; 13–25 · 1 (60–180 s); 26–39 · 2 | 0–12 · 1; 26–39 · 2 | 40–41 · 1; 42–51 · 3; 0–2 · 1 | 0–12 · 0.5; 26–36 · 1 | 26–41 · 1.5; 42–51 · 0.5 | 30–36 · 5 | 0–12 · 2; 13–25 · 3; 26–39 · 2 | — |
| `maritime` | 0–12 · 3; 13–25 · 1.5; 26–51 · 4 | 0–12 · 2; 13–25 · 1; 26–51 · 3 | — | 26–38 · 1 | 0–12 · 1; 26–51 · 2 | 33–38 · 4 | 0–51 · 3 | — |
| `arid` | 44–49 · 0.3 (20–60 s) | — | — | — | — | 38–44 · 1 | 44–49 · 0.5 | shimmer 10–38 · 2; dust 13–38 · 1 |
| `cold` | 9–25 · 2; 26–33 · 2 | 26–33 · 1 | 34–35 · 1; 36–6 · 3; 7–8 · 1 | 9–25 · 0.5 | 26–33 · 1; 36–6 · 1 (frozen fog) | 28–33 · 4 | 9–25 · 2; 26–33 · 2 | — |

*The sites* (`settings.weather.sites`: × a live kind's `perHour` where the site applies; where several apply each kind
takes the largest factor, never their product; where none applies the row's own rates stand, item 124 (c)'s temperate
plains; the weather stream reads the sites from the model at the view's head and writes nothing; `forestShareMin` 0.3;
each factor in [0.25, 4]):

| site | applies where | factors |
|---|---|---|
| `coast` | a sea shore in the frame (a `sea` water body, §2.3) | fog × 2 (morning sea fog), rain × 1.3, drizzle × 1.3 |
| `riverside` | a river course or a lake in the frame (§2.3), or S0's relief class `plain` (lowland) | mist × 2 (morning mist on the water), fog × 1.5 |
| `hills` | S0's relief class `hilly` or `mountainous` | snow × 1.5, fog × 1.5 (valley fog), cloudShadow × 1.5 (low cloud) |
| `forest` | woods — the `wildwood`, `coppice` and `reserve` land uses (§2.7) — on at least `forestShareMin` of the frame's land | mist × 1.5, drizzle × 1.5, leaves × 2 |

A factor scales a live entry and never makes one: a kind a row holds no band for stays absent, so a hill town of a row
that cannot snow has no snow.

* **The two hard rules** (item 124 (c); compile checks, T-V11-48 (a)–(b); T124-3, T124-4). (1) **No snow where winter does
  not freeze**: a row whose `seasons.winter` is `none`, a row with no `snow` band and every arid row (`aridity` ≥ `aridMin`,
  V11 §3.25.1) hold no `snow` entry, and an arid row or one whose winter is `none` holds no `snow` or `ice` band either —
  a `snow` cover there draws as `clear` (§8.2); every other row's `snow` entries lie inside its `ice` and `snow` weeks.
  (2) **Rain is rare in arid country**: on an arid row `rain` and `drizzle` come at most `aridRainMaxPerHour` 0.5 an hour
  after the largest site factor, in bands covering at most `aridRainMaxWeeks` 8 weeks — its short wet weeks — and in no
  other week, its dry months. The two caps are the owner's rule in numbers: provenance `owner`, stamped
  `ownerRule: '124 (c)'` (V11 §3.2.1 step 4), `calibratable: false`.
* **Off** — no switch here: V09's **Weather effects** switch (device state; off by default on the low tier and under
  reduced motion) turns the layer off, and the parity presets draw no spell."""

EDITS = [
(H325,
 "### 3.25 The rows of the owner's rules of 29 and 30 September (items 111, 113–119)\n",
 "### 3.25 The rows of the owner's rules of 29 September to 1 October (items 111, 113–119, 122–124)\n",
 1, ['G122-V11', 'G123-V11', 'G124-V11']),
(H325,
 "(the canon's routing; J127–J130).",
 "(the canon's routing; J127–J130, J135–J138).",
 1, ['G122-V11', 'G122h-V11', 'G123-V11', 'G124-V11']),
(H325,
 "the registry rows are V11 §3.1's (43, 44, 92–106).",
 "the registry rows are V11 §3.1's (43, 44, 92–110).",
 1, ['G122-V11', 'G123-V11']),
(H325,
 "V06 §3.7.7's transitions and §7.7's generation-time row).",
 "V06 §3.7.7's transitions and §7.7's DR41).",
 1, ['VAH-r1-19 (R2-11)']),
(H325,
 "| §7.7's row gives each run its condition at generation",
 "| §7.7's DR41 gives each run its condition at generation",
 1, ['VAH-r1-19 (R2-11)']),
(H325,
 "read by §7.7's item-114 row:",
 "read by §7.7's DR41:",
 1, ['VAH-r1-19 (R2-11)']),
(H325,
 "is V08 §3.16 (3)'s reading — a dossier-bound record of a `grandClasses` class, or a seigneurial\n"
 "  government's forced manor; a specified",
 "is V08 §3.16 (3)'s reading, which reads the `settings` row above; a\n"
 "  specified",
 1, ['VV78-04 (R2-14)']),
(H325,
 "Arid and warm climates never freeze and draw no snow (a user may still switch the `snow` weather on); `snow` weather\n"
 "defaults on",
 "Arid and warm climates never freeze and draw no snow — lying or falling, whatever the view's `weather` holds (§8.2;\n"
 "item 124 (c); V11 §3.25.11's hard rules); `snow` weather\ndefaults on",
 1, ['G124-V11 (R2-39 (a), (e))']),
(H325,
 "* The dossier's week and season and the climate's source order are §7.7's row (V08 reads SettlementForge's calendar and\n"
 "  its climate digest into a biome key of these rows, V08 §2.6 `climates`).",
 "* The present week and the climate are §7.7's DR42 (item 125: the week from the dossier's own ticks, the climate from its\n"
 "  terrain type through V08's `climates` row set, V08 §2.6).",
 1, ['VAH-r1-19 (R2-11)']),
(H325,
 "T-V11-44 (b) holds the row shape.",
 "T-V11-44 (b) holds the row shape.\n" + S3259,
 1, ['G122-V11', 'G122h-V11', 'G123-V11', 'G124-V11']),

# ---------------------------------------------------------------- §3.26
(H326,
 "| M-V11-3289-E1, -E5 | V11 §3.17 climate and land use | no biome in the circumstance; a land-use kind without a row | `temperate-deciduous`, reported; refused at compile (`landuse` covers `LandUse.kind`, T-V11-2) |",
 "| M-V11-3289-E1, -E5 | V11 §3.17 climate and land use | no biome in the circumstance; a land-use kind without a row; the `arid` row's `rivers` farm layout on a frame with no river | `temperate-deciduous`, reported; refused at compile (`landuse` covers `LandUse.kind`, T-V11-2); `perimeter`, §4.9's rule |",
 1, ['VAF-R1T-02']),
(H326,
 "| check | T-V11-45 (s) |\n",
 "| check | T-V11-45 (s) |\n"
 "| EI-V11-EDGE-4 | V11 §3.25.9 crisis looks | a stressor, archetype or event word with no `map` row; the `map` set empty (before M-SF; a standalone map); a severity outside [0, 1]; a dossier headcount of 0; a look whose `scale` at the map's rung is 0 (the parity presets) | the word reads `none`, reported `unmapped_word` (V08), and a word the census lists fails the build until its row is written (T-V11-46 (a)); every condition `none`, only a preview drawing; clamped into [0, 1] (§10.2 (c)); read as no size given — the `scale` row (§10.2 (c)); nothing drawn | check · substitute · leave out and report | T-V11-46; T-V11-45 (t) |\n"
 "| EI-V11-EDGE-5 | V11 §3.25.10 damage | a decay level of 0 and of 1; a walls material with no `damage.materials` row; a range edited to lo ≥ hi or out of its states' shares; `defaultAgeYears` 0 | nothing damaged at 0 (§6.3: the level above 0 and at least t); every element damaged at 1 (t < hi ≤ 1), a ruined church keeping its crypt's rooms and ways (V04 §5.6); the `timber_frame` row, reported; clamped to the nearest lawful range (V11 §4.1); a building with no decay run at its state's floor (V06 §3.23 (2)) | check · substitute | T-V11-47; T-V11-45 (u) |\n"
 "| EI-V11-EDGE-6 | V11 §3.25.11 weather | a week no band of a row covers; a site factor on a kind the row holds no band for; a `snow` entry or an arid rain cell edited past a hard rule; a `light` other than `'time'` | no spell comes, and Start a shower now starts none; the kind stays absent; clamped — the `snow` entry to 0, the rain cell to its cap (V11 §4.1); the `hours` cells unread, every hour admitted | check · leave out | T-V11-48; T-V11-45 (v) |\n",
 1, ['G122-V11', 'G123-V11', 'G124-V11']),
(H326,
 "| C-dossier-tables | every `dossier.*` row set (never calibrated) | every rung |",
 "| C-dossier-tables | every `dossier.*` row set (never calibrated) | every rung |\n"
 "| C-crisis-tables | `crisis.looks`, `crisis.map` (V11 §3.25.9) | every rung, THORP to the METROPOLIS cap, by each look's `scale` row; at THORP, HAMLET and VILLAGE a disaster's units V07's ends |\n"
 "| C-damage-tables | `damage.elements`, `damage.materials` (V11 §3.25.10) | every rung where a building stands abandoned, decayed or ruined, and a disaster look's districts at its `lookLevel` |\n"
 "| C-weather-tables | the climate rows' `weather` cells, the `settings` row's weather block (V11 §3.25.11) | every rung |",
 1, ['G122-V11', 'G123-V11', 'G124-V11']),
]
