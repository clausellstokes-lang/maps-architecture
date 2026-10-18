# edits.py — the edits of lane coherence/repair-V11-r3, read by gen.py (exec). Each E(head, old, new, *ids):
# `old` must occur exactly once in the live subsection whose heading starts with `head`
# (docs/volumes/V11-content.md, sha256 7842179a…, 668 876 bytes).

# ───────────────────────────── §1b ─────────────────────────────
# W46: the catalogue manifest's crisis census and its reader (VV78-r2-10: registry row 77's reader, both ends).
E(H1B, """| W46 | the committed catalogue manifest `src/dossier/catalogue.<line>.json` with its `ladderPairs` | V08's build step | row 77: the compiler's `coversManifest` rule and the ladder cross-check (T-V11-2) | §14 item 7 | the line's catalogue and the ladder file's pairs in V08 §2.4's manifest shape (V08 §3.5.1 (f)) |""",
"""| W46 | the committed catalogue manifest `src/dossier/catalogue.<line>.json` with its `ladderPairs` and its crisis census (item 122) | V08's build step | row 77: the compiler's `coversManifest` rule and the ladder cross-check (T-V11-2); the `crisis.map` compile check over the census lists `crisis.stressors`, `crisis.archetypes` and `crisis.events` (T-V11-46 (a)) | §14 item 7 | the line's catalogue, the ladder file's pairs and its crisis words in V08 §2.4's manifest shape (V08 §3.5.1 (f)) |""",
  'VV78-r2-10')

# W77: the crisis looks among the tables carrying `label` and `icon?` (VPC-R2-13).
E(H1B, """`label`, `icon?` on the profile families, goods, district kinds, style sheets and patch materials (V11 §2.3, V11 §3.1's *Display cells*) | V11's source rows (the town-and-city and sky classes, the families, goods, kinds, patch rows and the shipped sheets' words);""",
"""`label`, `icon?` on the profile families, goods, district kinds, style sheets, patch materials and crisis looks (V11 §2.3, V11 §3.1's *Display cells*, V11 §3.25.9) | V11's source rows (the town-and-city and sky classes, the families, goods, kinds, patch rows, crisis look rows and the shipped sheets' words);""",
  'VPC-R2-13')
E(H1B, """V09's Find (W87), `@plat/docs`; V09 §5.1's sprite holds""",
"""V09's Find (W87), V09's Show crises list and the legend's crisis look lines (W88; §8.2, §9.5), `@plat/docs`; V09 §5.1's sprite holds""",
  'VPC-R2-13')

# W88: the overlay's source word as V08 §3.16 (7) (b) gives it (END of VPC-R2-03; the calamity reaches its row through a
# linked condition).
E(H1B, """a standing condition's source — a stressor's `type`, an `activeConditions[]` archetype, a carried simulator event or calamity (V08) — → its `map` row (DR44)""",
"""a standing overlay's source word (V08 §3.16 (7) (b): a stressor's `type`, a simulator crisis event, the `calamity` word of a condition linked to a carried calamity, else the condition's `activeConditions[]` archetype) → its `map` row (DR44)""",
  'END VPC-R2-03')

# ───────────────────────────── §2.1 ─────────────────────────────
# The kind tables' totality rules (VEL2-r2-02 (1)).
E(H21, """  totality: TotalityRule[]; version: string /* semver: major = a changed schema, minor = a declared output shift, patch = no output change */;""",
"""  totality: TotalityRule[] /* the coverage promises its rows' home states, held by the compile (T-V11-2) and by V11 §4.1's delete rule —
    among them item 122's and item 123's kind tables: row 107 `crisis.looks` [{ kind: 'coversEnum', column: 'kind', of: 'CrisisLookKind' }]
    and row 109 `damage.elements` [{ kind: 'coversEnum', column: 'kind', of: 'DamageElementKind' }], their compile form T-V11-46 (b) and T-V11-47 (a) */;
  version: string /* semver: major = a changed schema, minor = a declared output shift, patch = no output change */;""",
  'VEL2-r2-02')

# ───────────────────────────── §2.3 ─────────────────────────────
E(H23, """the style sheets (registry row 52) and the patch materials (V11 §3.25.3), where their words are written (V11 §3.1's
*Display cells*).""",
"""the style sheets (registry row 52), the patch materials (V11 §3.25.3) and the crisis looks (V11 §3.25.9), where their
words are written (V11 §3.1's *Display cells*).""",
  'VPC-R2-13')

# ───────────────────────────── §2.8 ─────────────────────────────
# The weather kinds' `hours`: the hours a kind is live (VV1112-r2-01; R3-23 (a)).
E(H28, """hours?: [number, number] /* the view's hour of day a spell may start in, read under `light: 'time'` (§2.9) */""",
"""hours?: [number, number] /* the view's hours of day in which the kind is live, read under `light: 'time'` (§2.9; V11 §3.25.11) */""",
  'VV1112-r2-01')

# ───────────────────────────── §2.8d ─────────────────────────────
# The default age (END of VAT2-r2-05 and VAT2-r2-06; R3-06).
E(H28D, """  defaultAgeYears: number }         // yr: the age a building whose log holds no decay run reads (V06 §3.23 (4))""",
"""  defaultAgeYears: number }         // yr: the age a building generated abandoned, decayed or ruined reads at the week it is first met so, aging from then (V06 §3.23 (4))""",
  'END VAT2-r2-05', 'END VAT2-r2-06')

# ───────────────────────────── §3.1 ─────────────────────────────
# Row 77: the crisis census and its reader (VV78-r2-10).
E(H31, """V08 §2.4's manifest shape — each catalogue kind's entry and `ladderPairs`, the ladder file's pairs as data (V08 §3.5.1 (f)); cited, never restated | V08's build step | the compiler's `coversManifest` rule and the ladder cross-check (T-V11-2) | — | committed by V08 |""",
"""V08 §2.4's manifest shape — each catalogue kind's entry, `ladderPairs` (the ladder file's pairs as data, V08 §3.5.1 (f)) and the crisis census `crisis.stressors`, `crisis.archetypes`, `crisis.events` (item 122); cited, never restated | V08's build step | the compiler's `coversManifest` rule and the ladder cross-check (T-V11-2); the `crisis.map` compile check over its crisis census lists (T-V11-46 (a)) | — | committed by V08 |""",
  'VV78-r2-10')

# The never-calibrated summary names every cell of items 111–124 its section marks `calibratable: false` (VV1112-r2-03).
E(H31, """row of items 111–119 and 122–124 is calibratable but for its enumeration columns (V11 §3.25.9, V11 §3.25.10), its register
entry V12 §3.11's.""",
"""row of items 111–119 and 122–124 is calibratable but for its enumeration columns (V11 §3.25.9, V11 §3.25.10), its
switches (`history.replay`, `walls.condition.atGeneration`; T-V11-37), the patch rows' `label` and `look` (V11 §3.25.3) and
row 43's two owner-stamped weather caps `aridRainMaxPerHour` and `aridRainMaxWeeks` (item 124 (c); V11 §3.25.11), its
register entry V12 §3.11's.""",
  'VV1112-r2-03')

# ───────────────────────────── §3.24 ─────────────────────────────
# T-V11-32 (a)'s restating bullet and the editor's clamp take `stepMinCm < stepMaxCm ÷ 2` (VPC-R2-06).
E(H324, """* **Compile bar T-V11-32 (a).** `plinthCm < stepMinCm < skirtMaxCm < stepMaxCm` (the base's `plinthCm` and `skirtMaxCm`,
  §2.6), `stepMaxCm ÷ 100 ÷ minTerraceDepthM ≥ slopeMin` (else no unit could be levelled) and""",
"""* **Compile bar T-V11-32 (a).** `plinthCm < stepMinCm < skirtMaxCm < stepMaxCm` (the base's `plinthCm` and `skirtMaxCm`,
  §2.6), `stepMinCm < stepMaxCm ÷ 2` (so every intermediate wall of §4.7's step regions, which retains more than
  `stepMaxCm` ÷ 2, is a wall), `stepMaxCm ÷ 100 ÷ minTerraceDepthM ≥ slopeMin` (else no unit could be levelled) and""",
  'VPC-R2-06')
E(H324, """The tables editor clamps an edit that would
  break an inequality to the nearest lawful value and says so in one line (item 101 R2).""",
"""The tables editor clamps an edit that would
  break any of these inequalities — a `stepMinCm` raised to `stepMaxCm` ÷ 2 or a `stepMaxCm` lowered to twice `stepMinCm`
  among them — to the nearest lawful value and says so in one line (item 101 R2).""",
  'VPC-R2-06')

# ───────────────────────────── §3.25 ─────────────────────────────
# The lead's type pointer (VPC-R1-01).
E(H325, """cited; the types are V11 §2.8 and V11 §2.8d's; the switches and off forms are
V11 §3.24.0's; the registry rows are V11 §3.1's (43, 44, 92–110).""",
"""cited; the types are V11 §2.8 and V11 §2.8d's, and §10.2's for item 115's ceiling and
item 122's crisis tables; the switches and off forms are V11 §3.24.0's; the registry rows are V11 §3.1's (43, 44, 92–110).""",
  'VPC-R1-01')
# §3.25.4's settings pointer (VPC-R1-01).
E(H325, """* **The `settings` row** (V11 §2.8d's `GrandeurCeilingSettings`):""",
"""* **The `settings` row** (§10.2's `GrandeurCeilingSettings`):""",
  'VPC-R1-01')

# §3.25.9: the mapping's head names the events (VV78-r2-10).
E(H325, """*`crisis.map`* (the closed mapping, item 122 (b): every SettlementForge stressor type and condition archetype has one row —
a look or an explicit `none`; key `from/key`; the words are SettlementForge's own at its pinned baseline, identity only
(§17.1), read by V08's census;""",
"""*`crisis.map`* (the closed mapping, item 122 (b): every SettlementForge stressor type, condition archetype and simulator
crisis event has one row — a look or an explicit `none`; key `from/key`; the words are SettlementForge's own at its pinned
baseline, identity only (§17.1), read by V08's census;""",
  'VV78-r2-10')
# The `occupation` archetype row (VV1112-r2-02).
E(H325, """`vassal_extraction` → `occupation`; `rebellion` → `rebellion`;""",
"""`vassal_extraction` → `occupation`; `occupation` → `occupation`; `rebellion` → `rebellion`;""",
  'VV1112-r2-02')
# The `event` row `calamity` (END of VPC-R2-03; R3-09 (a)).
E(H325, """`calamity` (a strike of the simulator's calamity kernel, `calamityHistory`) → `disaster` |""",
"""`calamity` (a condition linked to a carried calamity whose own row is `none`, V08 §3.16 (7) (b)) → `disaster` |""",
  'END VPC-R2-03')
# The readings: `occupation` (VV1112-r2-02); `reconstruction` beside the linked calamity (END of VPC-R2-03; R3-09 (a), R3-10).
E(H325, """barricades; `vassal_extraction`, an overlord's men in the town, as an occupation. `reconstruction` draws none: its Works
  scaffolding is the model's own (§4.11), the aftermath a disaster's look hands over to (V06 §3.22).""",
"""barricades; `vassal_extraction`, an overlord's men in the town, and `occupation`, item 122 (b)'s own word, as an
  occupation. `reconstruction` draws none by its own row: its Works scaffolding is the model's own (§4.11), the aftermath
  a disaster's look hands over to building by building (V06 §3.22 (3)); a `reconstruction` condition linked to a carried
  calamity carries the `event` word `calamity` and reads that row instead (V08 §3.16 (7) (b): one condition per calamity).""",
  'VV1112-r2-02', 'END VPC-R2-03')
# The calamity sentence (END of VPC-R2-03, as given).
E(H325, """Every calamity draws `disaster`, its districts the calamity's `targets` first, else its
  pattern — fire, flood or earthquake — by its type (V01's `disasterDistricts`, §10.2 (d)).""",
"""A calamity draws `disaster` through the condition linked to it
  (V08 §3.16 (7) (b), (d)), its districts the calamity's `targets` first, else its pattern by its type (V01's
  `disasterDistricts`, §10.2 (d)); a calamity linked to no condition draws no look, its aftermath DR28's.""",
  'END VPC-R2-03')
# Totality over V08's three census lists (VV78-r2-10).
E(H325, """  `sf.stressors@<line>` list and the `archetype` rows against its `sf.conditionArchetypes@<line>` list (registry row 77;
  V08's census at the pinned baseline): a listed word without its row fails the build until the row is written, so the
  rows above — SettlementForge's fifteen stressor types and the archetypes its conditions carry today — grow with the line;
  a word V08 meets that no row maps reads `none`, reported `unmapped_word` (V08).""",
"""  `crisis.stressors` list (V08 §2.4), the `archetype` rows against its `crisis.archetypes` list and the `event` rows
  against its `crisis.events` list (registry row 77; V08's census at the pinned baseline): a listed word without its row
  fails the build until the row is written, so the rows above — SettlementForge's fifteen stressor types, the archetypes
  its conditions carry today and the simulator's crisis events — grow with the line; the `event` row `calamity` is the
  word V08 §3.16 (7) (b) gives a linked condition, in no census list; a word V08 meets that no row maps reads `none`,
  reported `unmapped_word` (V08).""",
  'VV78-r2-10')

# §3.25.10: the `settings` row's default age (END of VAT2-r2-05 and VAT2-r2-06; R3-06), R3-06 (d)'s M6-E reading kept.
E(H325, """* **`settings`**: `defaultAgeYears` 40 (range [0, 300] yr) — the years a building whose log holds no decay run reads at:
  one generated abandoned, decayed or ruined, one first met so in item 113's replay, and every building before V06's level
  lands at M6-E (V06 §3.23 (4)).""",
"""* **`settings`**: `defaultAgeYears` 40 (range [0, 300] yr) — the years a building generated abandoned, decayed or ruined
  reads at the week it is first met so, aging from then as any run (V06 §3.23 (4)); a building item 113's replay abandons
  or ruins ages from that replay epoch's week; before V06's level lands (M6-E) every building reads its existence state
  alone at this age.""",
  'END VAT2-r2-05', 'END VAT2-r2-06')

# §3.25.11: the live rate and the hours (VV1112-r2-01 per R3-23 (a), (c)); Start a shower now (R3-23 (b)).
E(H325, """  At a week the kinds whose band holds it are live, each at its `perHour` × the largest factor of the sites that apply
  (below); with R their sum, the clear time after a spell (and from the map's opening) is exponential with mean 3 600 ÷ R
  s, the next kind is k with chance perHour_k ÷ R, and its length is uniform in its `lengthS` — §6.1 draws the three
  uniforms in that order. A week with no live kind brings no spell. A band holds its cells through its weeks, so the weeks
  turn by bands written as transitions — the first flurries before deep snow, a thaw of rain — never by interpolation, and
  a kind absent from a band stays absent through it (the arid dry months).""",
"""  At a moment the kinds whose band holds the view's year position (§2.9's `yearWeek`) and — under `light: 'time'` — whose
  `hours` hold the view's hour are live, each at its `perHour` × the largest factor of the sites that apply (below); with
  R their sum, the clear time after a spell (and from the map's opening) is spent at that live rate (§6.1: a unit
  exponential spent as the integral of R ÷ 3 600 over view time, none spent while R is 0), the next kind is k with chance
  its live rate ÷ R at the moment the gap ends, and its length is uniform in its `lengthS` — §6.1 draws the three uniforms
  in that order. A moment with no live kind (R = 0) spends none of the gap and brings no spell. A band holds its cells
  through its weeks, so the weeks turn by bands written as transitions — the first flurries before deep snow, a thaw of
  rain — never by interpolation, and a kind absent from a band stays absent through it (the arid dry months).""",
  'VV1112-r2-01')
E(H325, """* **The commonest kind** of a week is its live kind of greatest `perHour` after the sites' factors, ties in
  `WeatherKind`'s order (V11 §2.8): the kind a press of V09's **Start a shower now** starts as the next spell; a week with
  no live kind starts none.""",
"""* **The commonest kind** at a moment is the live kind (above) of greatest `perHour` after the sites' factors, ties in
  `WeatherKind`'s order (V11 §2.8): the kind a press of V09's **Start a shower now** starts as the next spell; at a moment
  with no live kind (R = 0) a press starts none, and V09 disables the button there with its reason (§6.1; §7.8).""",
  'VV1112-r2-01')
E(H325, """*The kinds* (`settings.weather.kinds`; `hours` the hours of the view's day a spell may start in, read only under""",
"""*The kinds* (`settings.weather.kinds`; `hours` the hours of the view's day in which the kind is live, read only under""",
  'VV1112-r2-01')

# ───────────────────────────── §3.26 ─────────────────────────────
# The general rule: the rows a reader needs never go (VEL2-r2-02's "why no fallback covers it").
E(H326, """the rows a reader falls back to
never go, since V11 §4.1 refuses their delete. Geometry is never this volume's: a degenerate
result in a reading stage is the kernel's refusal handled by that stage's failure class (the canon's E-GEN-1; §5.1,
§5.2).""",
"""the rows a reader falls back to
or needs — a declared default, a totality rule's only cover, a table's named row — never go, since V11 §4.1 refuses their
delete. Geometry is never this volume's: a degenerate result in a reading stage is the kernel's refusal handled by that
stage's failure class (the canon's E-GEN-1; §5.1, §5.2).""",
  'VEL2-r2-02')
E(H326, """of the only row covering a value a totality rule requires, or of the last row of a table not `mayEmpty` |""",
"""of the only row covering a value a totality rule requires, of a table's named row (`settings`, `structure`, `festival.staging`'s `fallback`), or of the last row of a table not `mayEmpty` |""",
  'VEL2-r2-02')
# EI-V11-EDGE-4 (VEL2-r2-02 (3)).
E(H326, """a look whose `scale` at the map's rung is 0 (the parity presets) |""",
"""a look whose `scale` at the map's rung is 0 (the parity presets); a delete of a look kind's row or of the `settings` row (by `editTable` or a pack's patch) |""",
  'VEL2-r2-02')
E(H326, """read as no size given — the `scale` row (§10.2 (c)); nothing drawn |""",
"""read as no size given — the `scale` row (§10.2 (c)); nothing drawn; the delete refused F-EDIT, `refuse.table.required` (V11 §4.1), naming the readers — §7.7's DR44, §10.2's placement and §8.2's look rows — with "edit its cells", a pack's op refused at load, the row standing |""",
  'VEL2-r2-02')
E(H326, """| check · substitute · leave out and report | T-V11-46; T-V11-45 (t) |""",
"""| check · substitute · leave out and report | T-V11-46; T-V11-45 (s), (t) |""",
  'VEL2-r2-02')
# EI-V11-EDGE-5 (VEL2-r2-02 (3); the default age read as R3-06 (c) rules it — END of VAT2-r2-06).
E(H326, """`defaultAgeYears` 0 |""",
"""`defaultAgeYears` 0; a delete of an element kind's row or of the `settings` row (by `editTable` or a pack's patch) |""",
  'VEL2-r2-02')
E(H326, """a building with no decay run at its state's floor (V06 §3.23 (2)) |""",
"""a building generated abandoned, decayed or ruined at its state's floor the week it is first met, aging from then (V06 §3.23 (2), (4)); the delete refused F-EDIT, `refuse.table.required` (V11 §4.1), naming the readers — §6.3's thresholds, V06 §3.23, V03's, V02's and V04's drawings — with "edit its cells", a pack's op refused at load, the row standing |""",
  'VEL2-r2-02', 'END VAT2-r2-06')
E(H326, """| check · substitute | T-V11-47; T-V11-45 (u) |""",
"""| check · substitute | T-V11-47; T-V11-45 (s), (u) |""",
  'VEL2-r2-02')
# EI-V11-EDGE-6 (VV1112-r2-01; R3-23 (a), (b)).
E(H326, """| a week no band of a row covers; a site factor on a kind the row holds no band for;""",
"""| a moment with no live kind (a week no band of a row covers; under `light: 'time'`, an hour no live kind's `hours` hold); a kind whose `hours` exclude the view's hour; a site factor on a kind the row holds no band for;""",
  'VV1112-r2-01')
E(H326, """| no spell comes, and Start a shower now starts none; the kind stays absent;""",
"""| no spell comes, none of the gap spent (§6.1), and Start a shower now starts none, V09 disabling it with its reason; not live then: it adds nothing to R and is never drawn at that hour; the kind stays absent;""",
  'VV1112-r2-01')

# ───────────────────────────── ## 4 ─────────────────────────────
# §4.1's required-row sentence (VEL2-r2-02 (2)).
E(H4, """**A row readers fall back to is never deleted** (J-V11.113)""",
"""**A row readers fall back to or need is never deleted** (J-V11.113)""",
  'VEL2-r2-02')
E(H4, """V11 §2.1), of a `TotalityRule.allowFallback` target (the `generic-<family>` classes), or of the only row covering a value a
`TotalityRule` without `allowFallback` requires (a `landuse` row for a live `LandUse.kind`, a `roster.government` row for
its kind) is refused as a dangling reference (F-EDIT, `refuse.table.required`), naming the readers, with the alternative
"edit its cells";""",
"""V11 §2.1), of a `TotalityRule.allowFallback` target (the `generic-<family>` classes), of the only row covering a value a
`TotalityRule` without `allowFallback` requires (a `landuse` row for a live `LandUse.kind`, a `roster.government` row for
its kind, a `crisis.looks` row for its `CrisisLookKind`, a `damage.elements` row for its `DamageElementKind`), or of a
table's named row (V11 §2.1's settings form — `settings`, `structure`, `festival.staging`'s `fallback` —, whose cells its
readers read with no fallback) is refused as a dangling reference (F-EDIT, `refuse.table.required`), naming the readers,
with the alternative "edit its cells";""",
  'VEL2-r2-02')
# §4.4's lifecycle row.
E(H4, """| a `delete` of a row readers fall back to (4.1) |""",
"""| a `delete` of a row readers fall back to or need, or of a named row (4.1) |""",
  'VEL2-r2-02')

# ───────────────────────────── ## 7 ─────────────────────────────
# The restating pins' registrations (VAP-r2-09; R3-26).
E(H7, """with `coverage.rosterWeight` 0 the roster, and with the coverage family's weight 0 the placement, byte-identical — the village `v.` rows lie outside the roster clause, since the option adds no member at the `territory` rungs (V11 §3.5.1) |""",
"""with `coverage.rosterWeight` 0 the roster, and with the coverage family's weight 0 the placement, byte-identical — the `item103.coverage` registration of B-CITY's 200 seeds per rung on V12 §3.7.8's engine (V12 §2.13), written by the C2 seat (the village `v.` rows lie outside the roster clause, since the option adds no member at the `territory` rungs, V11 §3.5.1) |""",
  'VAP-r2-09')
E(H7, """byte-identical to the pre-110 goldens; with `raisedWays` alone on at TOWN, still identical (no row below CITY) |""",
"""byte-identical to the pre-110 goldens — the `item110.raised`, `.terrace`, `.deck` and `.stepped` registration of B-CITY's 200 seeds per rung on V12 §3.7.8's engine (V12 §2.13), written by the C3b seat; with `raisedWays` alone on at TOWN, still identical (no row below CITY) |""",
  'VAP-r2-09')
E(H7, """(b) the no-op pin — the off form of V11 §3.24.0 on 200 seeds per rung of an arid and a temperate site, byte-identical to the base without item 111 |""",
"""(b) the no-op pin — the off form of V11 §3.24.0 on 200 seeds per rung of an arid and a temperate site, byte-identical to the base without item 111 — the `item111.water` registration of the arid and temperate sites' 200 seeds per rung on V12 §3.7.8's engine (V12 §2.13), written by the C9 seat |""",
  'VAP-r2-09')
E(H7, """(b) the no-op pin — `replay` false byte-identical to the one-click path (V06's T-V6-71 takes the replay's bars) |""",
"""(b) the no-op pin on clause (a)'s four fixtures — `replay` false byte-identical to the one-click path, the `item113.history` registration of them on V12 §3.7.8's engine (V12 §2.13), written by the C9 seat (V06's T-V6-71 takes the replay's bars) |""",
  'VAP-r2-09')
E(H7, """(b) the no-op pin — the off form reproduces the neglect and repair rules before item 114 byte for byte (V06's T-V6-73 takes the transitions' bars) |""",
"""(b) the no-op pin on B-CITY's 200 seeds per rung — the off form reproduces the neglect and repair rules before item 114 byte for byte, the `item114.condition` registration of them on V12 §3.7.8's engine (V12 §2.13), written by the C9 seat (V06's T-V6-73 takes the transitions' bars) |""",
  'VAP-r2-09')
E(H7, """(b) the no-op pin — `enabled` false, and at TOWN and above with it true, byte-identical to the base without item 115 (V06's T-V6-74 and V07's T-V7-63 take the village and epoch bars) |""",
"""(b) the no-op pin on B-CITY's 200 seeds per rung — `enabled` false, and at TOWN and above with it true, byte-identical to the base without item 115: the `item115.off` registration of them and, at TOWN, CITY and METROPOLIS, the `item115.ceiling` registration of them on V12 §3.7.8's engine (V12 §2.13), written by the C9 seat (V06's T-V6-74 and V07's T-V7-63 take the village and epoch bars) |""",
  'VAP-r2-09')
# T-V11-45 (s) (VEL2-r2-02 (4)) and (v) (VV1112-r2-01).
E(H7, """(s) a row `delete` of a table's `defaultRow`, an `allowFallback` target, a totality rule's only cover and the last row of a table not `mayEmpty`, by `editTable` and by a pack — each refused naming its readers (the pack's op at load, the row standing); a cell edit of the same row applies;""",
"""(s) a row `delete` of a table's `defaultRow`, an `allowFallback` target, a totality rule's only cover, a named row and the last row of a table not `mayEmpty`, by `editTable` and by a pack — each refused naming its readers (the pack's op at load, the row standing), the tables editor's deletes of `crisis.looks`' `siege` row, `damage.elements`' `roofBay` row and `crisis.looks`' `settings` row among them, each refused with the tables unchanged; a cell edit of the same row applies;""",
  'VEL2-r2-02')
E(H7, """(v) the weather cells' edges (a week with no live kind, a site factor on an absent kind, an edit past a hard rule, a `light` other than `'time'`)""",
"""(v) the weather cells' edges (a moment with no live kind — by the week, and by the hour under `light: 'time'` —, a kind whose `hours` exclude the view's hour under `light: 'time'`, a site factor on an absent kind, an edit past a hard rule, a `light` other than `'time'`)""",
  'VV1112-r2-01')
# T-V11-46 (a): V08's three census lists (VV78-r2-10); (b) the totality rule's compile form (VEL2-r2-02 (1)).
E(H7, """(a) the closed mapping — every word of the catalogue manifest's `sf.stressors@<line>` list has its `stressor` row and every word of its `sf.conditionArchetypes@<line>` list its `archetype` row, each naming a live `crisis.looks` kind or `none`, no two rows sharing a `from/key`; (b) `crisis.looks` holds one row per `CrisisLookKind`;""",
"""(a) the closed mapping — every word of the catalogue manifest's `crisis.stressors` list (V08 §2.4) has its `stressor` row, every word of its `crisis.archetypes` list its `archetype` row and every word of its `crisis.events` list its `event` row, each naming a live `crisis.looks` kind or `none`, no two rows sharing a `from/key`; (b) `crisis.looks` holds one row per `CrisisLookKind` (its `coversEnum` totality rule's compile form, V11 §2.1);""",
  'VV78-r2-10', 'VEL2-r2-02')
E(H7, """(a) `damage.elements` holds one row per `DamageElementKind`,""",
"""(a) `damage.elements` holds one row per `DamageElementKind` (its `coversEnum` totality rule's compile form, V11 §2.1),""",
  'VEL2-r2-02')

# ───────────────────────────── ## 8 ─────────────────────────────
# C9's exit: T-V11-46 (a) is C4b's (VAP-r2-11).
E(H8, """| T-V11-38 – T-V11-44 and T-V11-46 – T-V11-48 at the exits of the milestones""",
"""| T-V11-38 – T-V11-44, T-V11-46 (b) – (d), T-V11-47 and T-V11-48 at the exits of the milestones""",
  'VAP-r2-11')
E(H8, """V03 §8); the register green (below) |""",
"""V03 §8); T-V11-46 (a), the closed mapping over V08's census lists, is C4b's at M-SF; the register green (below) |""",
  'VAP-r2-11')

# ───────────────────────────── ## 9 ─────────────────────────────
# J-V11.118's calamity clause (END of VPC-R2-03, the decision row restating §3.25.9's `event` row).
E(H9, """a calamity of the simulator's calamity kernel the `disaster` look, its pattern by its type;""",
"""a calamity the `disaster` look through the condition linked to it (V08 §3.16 (7) (b), (d)), its pattern by its type;""",
  'END VPC-R2-03')
# J-V11.120's hours (VV1112-r2-01).
E(H9, """the kinds' lengths and starting hours""",
"""the kinds' lengths and live hours""",
  'VV1112-r2-01')

# ───────────────────────────── ## 12 ─────────────────────────────
E(H12, """archetypes the port's research lists (`research/sf/dossier-model.md` §11, `research/sf/mapping.md` row 70);""",
"""archetypes the port's research lists (`research/sf/dossier-model.md` §11, `research/sf/mapping.md` row 70) and
`occupation`, which item 122's text and V08 §2.4's census name;""",
  'VV1112-r2-02')
