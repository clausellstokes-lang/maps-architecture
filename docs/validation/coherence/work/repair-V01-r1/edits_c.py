# Edits C: §6, §7, §8.2, §8.3, §9, §11, §12, §13, the integration notes.


def add(E, L):
    # ------------------------------------------------------------------ §6 (VV12-03, G120-V01)
    h = '## 6 Performance budgets'
    E(h, """| M5 | the way-graph distances cached per district per commit |
""", """| M5 | the way-graph distances cached per district per commit |
| Find's area targets (`findAreas`, V01 §5.4 (1)) | the list with its shapes, per commit and key: ≤ 3 ms at CITY, ≤ 8 ms at METROPOLIS (the districts' faces as committed; the city cut's ≤ 18 quarters and the region groups united by the kernel's union, memoised) | inside item 120 (j)'s index rebuild, once per commit, within §12.5's overlay budget | M5, on V09's app harness | a quarter's or region's union computed at its first use (a chip, the list scrolled to it) instead of at the rebuild |
| Show gaps' units (`gapUnits`, V01 §5.4 (3)) | per chip: a partition unit (`district`, `parish`, `settlement`) ≤ 2 ms at METROPOLIS (one pass over the admitted members' plots); `walk` ≤ 25 ms at METROPOLIS (one multi-source walk bounded at `per`); `households` ≤ 25 ms at METROPOLIS once its radii are memoised, the radii of one `per` value ≤ 1 s at METROPOLIS at their first use in a commit, on the worker — never delaying a chip's glow (item 120 (j)), its gaps drawn when ready | §12.5's overlay budget, beside item 120 (j)'s glow | M5, B-CITY (METROPOLIS) on V09's app harness | the radii computed for the plots of the districts in view first and the rest on idle |
""", tag='G120-V01')
    E(h, """| document size | ≤ 1 KB per edited close-up; the town's document growth from stage 2 ≤ 2 % at CITY (places and flags) | §12.8's document line | M5 | place names stored by naming-record reference only |""",
      """| document size | ≤ 1 KB per edited close-up; the town's document growth from stage 2 ≤ 2 % at CITY (places and flags) | §12.8's document line | M5 | place names stored by naming-record reference only |

**One-time waits (item 119, stage 2's part; J130; J-V1.103).** Every line above stays the **target** — as fast as
possible, the build pressing every path toward it (item 119 (a); §12.1's targets and comfort level). The one-time waits
stage 2 adds to or lengthens — generation with stage 2 (its one-click total and the first map), a standalone
neighbourhood document's first map, a replace close-up, the stage-2 switch's edit (a Re-derive from S2 of the whole
document, ≤ §12.6's M(B)), the sky unit run at generation and inside a raise, a late declaration or New random on an
island, and a district or outline export (V01 §5.3; §12.7's lines) — each completes within item 119 (a)'s **comfort
level** of ten seconds of total time, from the click to the complete result on §12.1's reference hardware, at TOWN, CITY
and METROPOLIS up to its population cap (a standalone neighbourhood document at each `contextRung`; the switch's edit at
the METROPOLIS cap among them); past it the wait fails T-V1-29's clause. Each wait past about one second shows progress —
the running stage by name and the map filling in, never an empty screen — through V09 §4.21.9's progress view (item 119
(c)); the first picture is still complete (§8.5). A step runs slower than its target only for a measured gain recorded
as its `perf.qualitySpend` row (V11 §3.25.8: the step, its cost and its gain) and still inside the comfort level (item
119 (b)); stage 2 ships none. The interactive lines — opening a district (its model and display list, and its first
visible tiles), the surface marks and the walls and raised parts of an opened district, a block's content edit, a
hood-pin edit, T8's preview (the replace dry run) and Find's two lines — are interaction budgets, unchanged by item 119
(d). The low tier (§12.1) aims at the same comfort level, a size it cannot reach declared per device (item 119 (e)). At
the METROPOLIS cap the targets of these waits lie within a few seconds (§12.3's model law, §12.5's first-map law, §12.6's
M(B)), so item 119 moves no figure of this section; T-V1-29 times each.""", tag='VV12-03')

    # ------------------------------------------------------------------ §7 (VAP-22, VV12-03, VEW-14, G120-V01, VV12-13)
    h = '## 7 Tests and acceptance bars'
    E(h, """(e) **the no-op pin** (item 110 (f)): with the terrace, raised-way and deck-plot rows off, byte-identical to the build without them, and V01's item-110 rows""",
      """(e) **the no-op pin** (item 110 (f)): with V11 §3.24.0's item-110 switches off, byte-identical — a `NoOpPin` registration of the M5 neighbourhood suite on V12 §3.7.8's engine (`item110.*`), written by the M5 seat — and V01's item-110 rows""",
      tag='VAP-22')
    E(h, """the METROPOLIS lines; per building (S5 (b)); draw calls and uploads within §12.5 (S5 (c)); the one-click added cost at CITY | bench | P | S5 |""",
      """the METROPOLIS lines; per building (S5 (b)); draw calls and uploads within §12.5 (S5 (c)); the one-click added cost at CITY; **item 119's one-time waits** (V01 §6; J-V1.103): on §12.1's reference hardware at TOWN, CITY and the METROPOLIS population cap, generation with stage 2, a standalone neighbourhood document's first map at each `contextRung`, a replace close-up of the largest district, the stage-2 switch's edit (at the METROPOLIS cap among them), the sky unit run at generation and inside a raise, and a district and an outline export each complete within 10 s from the click to the complete result; every wait past 1 s shows V09 §4.21.9's progress, never an empty screen; every step slower than its V01 §6 target has its `perf.qualitySpend` row with its recorded gain (0 rows and 0 slower steps at shipping); V01 §6's interactive lines hold unchanged | bench | P / C | S5 |""",
      tag='VV12-03')
    E(h, """a fallen deck's plots fated and the owner's chunk re-derived | fixture, B-CITY (harbour seeds) | C | — |""",
      """a fallen deck's plots fated and the owner's chunk re-derived; on a walled, moated fixture with stone moat bridges, 0 deck plots on a gate's moat deck (§4.7), and a fixed moat bridge declared away from a gate offering its plots by item 246's rule to the district at its intramural end | fixture, B-CITY (harbour seeds) | C | — |""",
      tag='VEW-14')
    E(h, """0 ward-edge walls on a `frame` run and the levelling stopping at the margin band | fixture (item 111's), B-CITY | C | — |""",
      """0 ward-edge walls on a `frame` run and the levelling stopping at the margin band | fixture (item 111's), B-CITY | C | — |
| T-V1-59 | Find over the town (item 120 (k)'s town clauses; V01 §5.4): on B-CITY-lite at TOWN, CITY and the METROPOLIS cap, a standalone neighbourhood document, V04's undercity fixture and V05's island fixture — (a) **areas**: `findAreas` lists every district of each layer but the hinterland pseudo-district, each once (0 areas with both a district and a neighbourhood entry), every city-cut `QuarterNode` of two or more members and every `RegionGroup`, and nothing the document lacks; each area's shapes equal the union of its admitted districts' faces per layer (symmetric difference 0 at the lattice); under a player view an area the key withholds is never listed, counted, lifted or pinned; at every city-band stop from item 116's limit inward, an area drawn under the pin size carries its pin; (b) **gaps**: for each coverage unit, and a class with no coverage row, `gapUnits` equals the brute-force reading over 200 seeds per rung — every partition unit, or every residential plot, whose `catchmentOf` holds no admitted member, plot by plot (the multi-source walk's served set equal to the per-plot `catchmentOf` evaluation); a fixture whose only member in one district is concealed shows that district as a gap under the player view and not under the host's, and no parish cell outlines a withheld church; a several-class chip reads one unit as V01 §5.4 (3) states; an area, place or person chip yields no gap; (c) **over time**: an edit removing a district's last member adds its gap in that commit and its undo removes it; an epoch that creates a district lists it with its gaps in that commit; a chip whose area an edit or epoch removes stays at count 0, dark, until removed or Clear; (d) **a view only**: the document hash, the log and the tiles byte-identical with Find and Show gaps on and off; (e) **cost**: `findAreas` and `gapUnits` within V01 §6's Find lines at the METROPOLIS cap. From M5 on the services; on V09's app harness from V09's Find | B-CITY-lite, fixtures (V04's, V05's), app harness | C | — |""",
      tag='G120-V01')
    E(h, """**Parity against NG** (the reference that owns the close-up; run under the `NG` preset): T-V1-26 (draw style; the NG
parity sheet's roof construction is V01 §5.1.2's), T-V1-29""", """**Parity against NG** (the reference that owns the close-up; run under the `NG` preset): T-V1-26 (draw style), T-V1-29""",
      tag='VV12-13')
    E(h, """knowledge, the owner's file-g rules).""", """knowledge, the owner's file-g rules). **The NG parity sheet's roof construction:** from M6a the NG parity sheet keeps
`fakeGablePerWing`; at M6b the NG draw-style bars (T-V1-26) are re-measured on `roofscape` and the sheet switches to it
when they pass, else keeps `fakeGablePerWing`, reported (V02 §5.3 supplies `roofscape`; J-VI.17 H8); every other
`hatched` sheet's switch is V01 §5.1.2's.""", tag='VV12-13')

    # ------------------------------------------------------------------ §8.2 (G120-V01, VV12-03)
    h = "### 8.2 M5's work items, dependencies and estimates (person-weeks, expert; PLAUSIBLE)"
    E(h, "| W10 labels and exports | the hood title, place labels, per-format content (V01 §5.3) | W5, W9 | 0.5–1 |",
      "| W10 labels, exports and Find's areas | the hood title, place labels, per-format content (V01 §5.3); Find's area targets and Show gaps' units (`findAreas`, `gapUnits`; V01 §5.4, item 120) | W5, W9 | 0.5–1 |",
      tag='G120-V01')
    E(h, "T-V1-1 – T-V1-58 (T-V1-50 – T-V1-54 with W18; T-V1-55 – T-V1-58 the lifecycle, edge, rung and item-111 and frame suites of V01 §3.18)",
      "T-V1-1 – T-V1-59 (T-V1-50 – T-V1-54 with W18; T-V1-55 – T-V1-58 the lifecycle, edge, rung and item-111 and frame suites of V01 §3.18; T-V1-59 Find's, on V09's app harness from V09's Find; T-V1-29's one-time-wait clause, item 119)",
      tag='G120-V01; VV12-03')
    E(h, """This is 13.25–18.25 pw above""", """Items 119 and 120 add no line: Find's two pure services lie within W10's range and the one-time-wait clause of
T-V1-29 and T-V1-59 within W11's, so the M5 total and §16's M5 row are unchanged.

This is 13.25–18.25 pw above""", tag='G120-V01; VV12-03')

    # ------------------------------------------------------------------ §8.3 (G120-V01)
    h = "### 8.3 `@plat/hood`'s contents (§14, item 505)"
    E(h, """the services `catchmentOf`, `districtsAbove`, `fabricSignature` and
`skyDistrictCount` and the writer `plantRimWalk` (V01 §3.16),""", """the services `catchmentOf`, `districtsAbove`, `fabricSignature`,
`skyDistrictCount`, `findAreas` and `gapUnits` and the writer `plantRimWalk` (V01 §3.16, V01 §5.4),""", tag='G120-V01')

    # ------------------------------------------------------------------ §9 (VAT0-11, VV12-12, G120-V01, VV12-03)
    h = '## 9 Decisions'
    E(h, "at most one catacomb from its own cemetery ground, no epochs in volume 6's first build — over",
      "at most one catacomb from its own cemetery ground, no epochs: such a document has no clock (no S4–S5 route), so `advance` and a skeleton's `history` bend (V06 §1.3, V06 §4.1; J-V6.102) — over",
      tag='VAT0-11')
    E(h, "emit the `blockLifted` notice (V01 §3.5.12, §3.9). |", "emit the `blockLifted` notice (V01 §3.5.12, V01 §3.9). |", tag='VV12-12')
    E(h, "until M6b's re-measure (V01 §5.1.2, §7). |", "until M6b's re-measure (V01 §5.1.2, V01 §7). |", tag='VV12-12')
    E(h, "the one closure vocabulary (V01 §3.6 (7), §3.11 (4)). |", "the one closure vocabulary (V01 §3.6 (7), V01 §3.11 (4)). |", tag='VV12-12')
    E(h, """it lives with its host while the local-place step runs. |""",
      """it lives with its host while the local-place step runs. |
| J-V1.102 | Chose to give Find (item 120) the town's **area targets** as one target per district on every layer — the district a close-up opens being the neighbourhood (J-V1.35), so a district and a neighbourhood are never two chips for one area, the panel's word `neighbourhood` going to an undercity or underground district and a standalone neighbourhood document's — with the **city cut's quarters** of two or more districts and the **region groups**, over listing every node of §9.1's quarter tree, because the city cut is the base's definition of the town's quarters (§4.5) and the tree's other nodes would list one district many times under nested names; and to read **Show gaps' units through `catchmentOf`** (V01 §3.16), the one catchment reading the siting solver and the absorbed Coverage view read — a partition unit (`district`, `parish`, `settlement`) a gap when it holds no member, a per-plot unit (`walk`, `households`) as the residential plots whose catchment holds none, grouped by district (the plots V12 §3.6's `servedShare` counts), a class without a coverage row on the `district` unit and a several-class chip on its classes' common unit, else `district` — over a second, view-only unit definition, because one reading makes the gaps the panel draws the units the solver and the bars count; and to count only the members the view's key admits, with parish cells built from admitted churches, so a gap never hints at what the key withholds (item 120 (h); V01 §5.4). |
| J-V1.103 | Chose to read item 119 for stage 2 as V01 §6's lines kept as the targets, with the one-time waits stage 2 adds or lengthens — generation with stage 2, a standalone neighbourhood document's first map, a replace close-up, the stage-2 switch's edit, the sky unit run at generation and after it, a district or outline export — held to the ten-second comfort level at TOWN, CITY and METROPOLIS up to its cap and timed by T-V1-29, and every interactive line (opening a district and its first tiles, the surface marks, an edit's commit, a hood-pin edit, T8's preview, Find's lines) kept unchanged, over re-deriving any figure, because the targets of those waits lie within a few seconds at the cap and item 119 (d) forbids relaxing an interaction budget (V01 §6). |""",
      tag='G120-V01; VV12-03')

    # ------------------------------------------------------------------ §11
    h = '## 11 Owner questions'
    E(h, "the file-g parts are the owner's rules (items 102–110, the catacomb and crypt rule of",
      "the file-g parts are the owner's rules (items 102–112, 119 and 120, the catacomb and crypt rule of", tag='G120-V01; VV12-03')

    # ------------------------------------------------------------------ §12
    h = '## 12 CONFIRMED versus PLAUSIBLE'
    E(h, """our own metric constants and provenance marks (§17.1).""", """our own metric constants and provenance marks (§17.1). Items 119 and 120 were read at source
(`docs/AMENDMENTS-2026-09-28g.md`) with their routing (J130, J133), and the shapes this volume reads from them — V11
§3.25.8's `perf.qualitySpend`, V09 §4.21.9's progress view, V10 §2.13's `FindAnswer` — as landed or as their round's
repairs state them.""", tag='G120-V01; VV12-03')
    E(h, "the sky unit run's lines (volume 5's figures), `plantRimWalk`'s and the\nswitch edit's;",
      "the sky unit run's lines (volume 5's figures), `plantRimWalk`'s and the\nswitch edit's; Find's two lines (the area list's unions, the gap walks and the `households` radii at the METROPOLIS cap) and that every one-time wait of V01 §6 stays inside the ten-second comfort level at the cap (T-V1-29);",
      tag='G120-V01; VV12-03')
    E(h, "(else the sheet keeps `fakeGablePerWing`, reported; V01 §5.1.2)", "(else the sheet keeps `fakeGablePerWing`, reported; V01 §7)",
      tag='VV12-13')

    # ------------------------------------------------------------------ §13 (VV12-12)
    h = '## 13 Fix list'
    E(h, '(V01 §3.14, §6, §7, §12)', '(V01 §3.14, V01 §6, V01 §7, V01 §12)', tag='VV12-12')

    # ------------------------------------------------------------------ Integration notes (VV12-13)
    h = '## Integration notes'
    E(h, "J-VI.17 H8 (the NG parity sheet's roof construction, V01 §5.1.2)", "J-VI.17 H8 (the NG parity sheet's roof construction, V01 §7)",
      tag='VV12-13')
