# edits_c — item 122's village part (G122-V07, under R2-35 – R2-37) and R2-29 (b)'s receiving end in V07 §5.1.
import os
_SRC = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'V07.orig.md'), encoding='utf-8').read()


def _between(start, end_incl):
    """The live text from `start` through `end_incl` (both exact, each once)."""
    i = _SRC.index(start)
    j = _SRC.index(end_incl, i) + len(end_incl)
    assert _SRC.count(start) == 1
    return _SRC[i:j]


SEASONS_FESTIVALS_OLD = _between(
    "* **The village through the year** (item 117, the village's part; J-V7.141).",
    "district band; garlands, tables and lanterns at the neighbourhood band); item 112's pattern rule holds.\n")

SEASONS_FESTIVALS_NEW = (
    "* **The village through the year** (item 117, the village's part; J-V7.141). A season is a look only, drawn by §8.2's\n"
    "  *Seasons* rows — the year position and DR42, the surfaces, autumn's covers, water in winter, snow and the sun — which hold\n"
    "  the village's readings; nothing here moves, adds or removes a building, way, wall, field boundary or water edge, and the\n"
    "  document hashes identically in every week. The village's own part is which of its records each row reads: each **great\n"
    "  field** takes the `season.surfaces` row of its rotation slot's crop (the winter grain, the spring crop, the fallow; the\n"
    "  infield's continuous crop; the outfield's cropped or grazed year), `field.harvest`'s stooks set in rows along its strips;\n"
    "  its **strips** carry their furlong's row, a strip's week offset within the band keyed by its strip index on\n"
    "  `render.instances`, so a furlong turns strip by strip; the **meadow** takes the meadow rows, the **commons** and the\n"
    "  **green** the grass rows (the green grazed short), an oasis's gardens their climate's garden rows; the **crofts** and\n"
    "  **closes** are among the green and lawn faces §8.2's fallen-leaf cover lies on and the tofts' yard parts among its garden\n"
    "  yard parts, the palisade and the yard walls among the wall lines it gathers at; for **water in winter** the L0 village\n"
    "  pond, the green's centrepiece pond, the manor's fishponds and the fair field's watering places are `pond` marks, the\n"
    "  manor's moat a `moat`, the **leat** the mill's canal (`millpond`, its take-off an open lead), and the brook, stream or\n"
    "  river `slowRiver` or `river` by its fall. The painterly family draws these rows in its own palette, `ink` by §8.2's ink\n"
    "  rows.\n"
    "* **Festivals** (item 118, the village's part; J-V7.142). A look only, drawn by §8.2's *Festival decorations* — DR43's\n"
    "  schedule, the festival display, the place table with its village readings, keyed placement, the glyphs, motifs and\n"
    "  bands. The village's own part: **the village tiers' kinds**, V11's decoration rows for each tier — at **THORP** a\n"
    "  garland or a bonfire at the heart; at **HAMLET** a maypole or a bonfire on the green, garlands on doors; at **VILLAGE** a\n"
    "  maypole, bunting along the church lane, stalls and tables on the green — never a larger tier's kinds; and **the church\n"
    "  lane**, §8.2's `churchLane` place: the lane V07 §3.10 names so, else the shortest way from the church's door to the\n"
    "  green.\n")

SECTION_5_6 = r"""### 5.6 Crisis looks at the village rungs (item 122, the village's part; J-V7.146)

A crisis look is a look only (item 122 (a)): while a `ConditionOverlay` stands in the view's week (§2.7's reader comment) and
its `crisis.map` row gives a look, or one is previewed under §2.9's `crises` key (V09 §4.21.12), §8.2's `live.crises` draws it
by §7.7's DR44 and §10.2's *Crisis looks* — the table, the rates and every value V11's. Nothing here moves, adds or removes a
building, way, wall, plot, field or water edge or reaches a record, a digest or the hash; a condition the viewer's key
withholds is never drawn, listed or named; the parity presets, `VG` among them, draw none (§8.2's `extension` rows). This
section states how §10.2's places read on a THORP, HAMLET or VILLAGE map, the disaster's units there, the village tiers'
scale and the hand-over through the village's epochs.

**(1) The village tiers' scale** (item 122 (c), (h)). A look's extent at THORP, HAMLET and VILLAGE is its row's `scale` cell
for that rung, linear in severity, or, for a camp the dossier sizes, `areaPerHeadM2` × its heads (§10.2 (c)); V11's village
cells read the item's "a hamlet gets a war band's camp" — a siege, blockade or garrison camp of a war band, a refugee or
quarantine camp of a few tents and huts. **A siege at THORP or HAMLET draws no siege line**: its camp, smoke, burned
farmsteads and any engines its heads give (§10.2 (f)) stand without the trench and earthwork line, which a VILLAGE's siege
draws along its palisade's walled stretches only. A force the dossier sizes beyond what the frame and its margin hold fills
them, the rest drawn as §8.8's massed ring marks (§10.2 (e)): a large army at a hamlet is shown, never shrunk. A look scaled
as a share of its place's units (§10.2 (c)) takes, of a place's n units at its share s, round(s × n) clamped to [1, n]
where s is above 0 and none where it is not — V01 §3.16 (5)'s count of the disaster's units, read for every share at the
village rungs, whose places hold few units (one end, three great fields, a handful of palisade runs), so a look standing at
a positive share never rounds to nothing.

**(2) The places** (§10.2 (d)'s places read on the village's records; every other rule of §10.2 (d)–(h) unchanged — the
outskirts shared by priority, siege, then quarantine, then refugees, under the density cap, §10.2 (e)).

| place | on a THORP, HAMLET or VILLAGE map |
|---|---|
| the main approach road | the way of the `through` entry (`VillagePlan.entries`, V07 §2.3) whose bearing is that of the DR3 partner of greatest weight, else the `through` entry, then the `neighbour` entry, nearest the heart by walking distance, ties by lineage; its gate the palisade's gate on it, else its perimeter crossing (V07 §3.7); an `isolated` village has none |
| `beyondWalls` | `siegeStandoffM` beyond the palisade's walled stretches (V07 §3.4), its barrier-closing arcs taking none; with no walled stretch a siege draws the `blockade` row (§10.2 (f), (h)) |
| `approachRoads` | the verges of each entry's way beyond the perimeter, one camp per entry; with no entry, the `campLand` faces nearest the perimeter |
| `approachByGate` | the `campLand` faces along the main approach road by its gate, nearest `frontierFor`'s answer — at a village rung the through road's entry (V06 §3.22 (2)'s no-frontier case) |
| `outside` | the `campLand` faces furthest from the main approach road, beyond the palisade's outer strip, else beyond the perimeter |
| `affectedQuarter` | a unit of (3), an end where the village has ends: `disasterSource`'s first `matched` unit (V01 §3.16; a target names the unit holding its plot), else the unit with the most households per hectare of its plots |
| `fields` | the hinterland's arable faces (V07 §3.9: every furlong of the great fields, the infield and the outfield, a strip holding, an enclosed system's fields), the meadow and the commons; its pens the closes' and crofts' paddocks and the pound; its stalls the market's (V07 §3.10), none where no market stands |
| `edge` | the palisade's walled stretches, its gate gaps and barrier arcs excepted; unwalled, the perimeter (V07 §3.7) |
| `outlyingFarms` | the outlying farmsteads (V07 §3.9 (5)), outermost first, then the tofts of the farm classes (V07 §2.4) farthest from the heart |
| `gatesAndKeep` | the palisade's gates and the manor house (a castle or tower house playing itself, V07 §3.11 step 3, before it), else the open space that carries the market, else the green, else the heart |
| `streets` | the junctions and frontages of the ways inside the perimeter, those round the open space that carries the market first, else the heart's |
| `neighbourhoods` | (3)'s units |

**The outskirts' land.** At a village rung V01's `campLand` (V01 §3.16) reads the village's records: its built edge is the
perimeter (V07 §3.7), or the palisade's outer strip where that lies beyond it; its fallow faces are the furlongs in their
rotation's fallow course (§4.9) — a great field in its fallow slot (`VillageField.slot`), an outfield in its grazed years;
its approach roads are the entries' ways. So no camp stands on the green, a toft, a close, a croft or any other plot.
DR18's informal clusters under a migration condition (tents at the perimeter, V07 §3.11 DR16–DR18) are plots of the model
housing households the population counts; the refugee look is the arrivals the condition stands for, on `campLand` beside
them, never on them, and adds no household.

**(3) The disaster's units** (item 122 (b); §10.2 (d)'s `neighbourhoods`). The village product holds one district (PART III
(4)), so a disaster's whole neighbourhoods are its **ends**, built in V01 §2.3's `DisasterUnit` shape for V01's
`disasterSource`, whose one rule — the matched targets, then the pattern's strike order, then the share — picks among them
(V01 §3.16 (1)–(5)):

```ts
// @plat/village — the village rungs' disaster units (V01 §3.16 (1)): pure and draw-free over committed state, memoised per model digest, never stored
villageDisasterUnits(doc: Document): DisasterUnit[]   // V01 §2.3's shape; in end order, then address order
villageUnitPlots(doc: Document, unit: Id): Id[]       // a unit's land, its plots in address order: read by §8.2's ruined tone, the buildings' damage (V02, V03) and Find's frame (V01 §5.4 (6))
```
* **Units.** Each end of `VillagePlan.ends` with its derived plots (V07 §3.10). A village with no end (a thorp with no
  anchor, V07 §3.10) takes its **toft groups**: the district's plots joined where two share a boundary of positive length
  or front the same way segment, each maximal group one unit. The outlying farmsteads lie in no unit (they are
  `outlyingFarms`').
* **The shape's fields.** `id` — the end's (an entity, whose render key keys the draws, V01 §3.16 (4)), or the toft
  group's lowest plot id; `centroid` — the area centroid of its plots' faces; `inhabitants` — the members of the households
  housed on its plots; `meanHeightCm` — `Terrain.heightCm`'s mean over those faces; `waterFront` — a face of its plots
  shares an edge with a water face; `neighbours` — the units one of whose plots shares a boundary of positive length with
  one of its plots, or fronts the same way segment, in address order (a district's seam read at the plots, so a fire
  crosses the village street as it crosses a town's).
* **Targets.** A calamity's target (V01 §3.16 (3)) names the unit holding its plot; a target naming the `village` district
  names every unit.
* **The look.** Every building on a returned unit's plots draws item 123's damage at `lookLevel` by severity, or at its own
  decay level where that is higher (V02's exterior, V03's plan; nothing stored), and the unit's plots' faces take §8.2's
  ruined tone at the city band; a building whose rebuild Works has begun draws its Works instead (V06 §3.22 (3)'s
  `crisisLookYields`). A one-end village's disaster ruins its one end at any positive share, at the depth `lookLevel`
  gives by severity.

**(4) The hand-over** (item 122 (a); V06 §3.22). What a crisis leaves reaches the village only through its epochs (V07
§3.12), as V06 §3.22 (1) states at every rung: the calamity through `EpochInputs.events` and the engine's `hazards` phase at
its targets (a step the village runs unchanged, V07 §3.12), the deaths and the exodus through the epoch's target — a hamlet
a crisis empties declining toward the deserted village by V07 §3.12's decline (J-V7.2) — and the newcomers who stay through
the village siting's (6v)–(9v) (infill, encroachment, then extension). The refugee camp stands by the main approach road's entry ((2)),
`frontierFor`'s answer at a village rung; it claims no ground, so where the newcomers settle is the siting's. A disaster's
ruined look yields building by building to its rebuild's Works (V06 §3.22 (3)), at a village rung the siting's
regrowth-first rebuild (a house platform first). **Across a hand-off** the look reads the rung in force (the fold's, V07
§3.12 *Which path runs*): from an epoch that hands up it draws on the town's places, its disaster units districts (V01);
from one that hands down, on the village's; the band's hysteresis keeps it on one product while the population moves inside
the band.

**(5) Bands, families and framing.** §8.2's look rows by band, the village's city band being its township view (V07 §5.2):
the camps as clusters with their smoke, a VILLAGE's siege line and the ruined ends' tone; the district band adds the tents,
engines, fences and barricades and the torn palisade (the `breached` run row); the neighbourhood band the marked doors,
rubble and fires. The `painterly` sheet gives §8.2's crisis roles (`crisis.tent`, `crisis.ash`, `crisis.mark`,
`crisis.army.a` – `.d`) by §8.2's placement rule over its own palette (V07 §5.1), `ink` by its rows; item 112's second cues
hold. While a look stands the opening view, Fit and the township view's limit take in the camps (§2.9's *The crisis
framing*; V07 §5.2).

**(6) Words, Find and exports.** The village `WhyProvider` carries the crisis line on a ruined end and a bare field (V07
§4.5); Find lists the standing looks in its `crises` section as at every rung (V09 §4.21.12 (7); V07 §5.5); picture exports
draw them and a VTT scene draws them in the image only, never as walls or obstacles (V07 §5.4; §11.1).

**(7) Edges** (V07 §3.17's row; T-V7-60 (h)). No walled stretch — a siege is the blockade on the entries' ways, a beast
attack watch-fires along the perimeter and stake barricades at its way crossings, no torn sections; no green and no market
— no stalls to shutter, `gatesAndKeep` down its fallbacks; no entry — every camp on the `campLand` nearest the perimeter;
no `campLand` left in the frame and its margin — §10.2 (e)'s ring marks; no outlying farmstead — the farm tofts farthest
from the heart; no arable face — famine's pens and stalls alone; a THORP of one house — one unit, its toft ruined by a
disaster at any positive share at `lookLevel`'s depth; no end — the toft groups; an end an epoch or an edit removes while a
look stands — the units re-derived at that commit, the share read over them; a preview on a standalone village — every place
read the same, at `previewSeverity`; a look and a festival in one week — both drawn (§8.2's slot 19b), famine's bare fields
over the crop stage (slot 15b); save, load, undo, redo, regenerate and migrate — nothing stored, every look re-derived
from the committed state and the view.

**(8) Cost and build.** No model time: a look is drawn lazily per visible tile within §12.5's budget, and
`villageDisasterUnits` is one pass over the district's plots and their shared edges, ≤ 0.5 ms at the VILLAGE top, memoised
per model digest (V07 §6). Bar: T-V7-69. It lands at V-M3 (V07 §8; risk (14)).
"""

EDITS = [
    # V07 §1: scope, the base hooks consumed, the siblings' parts read, the cross-volume facts (G122-V07).
    ('G122-V07',
     "item 120 (Find at\nthe village rungs: the ends, fields and places as targets and the ends as Show gaps' units, V07 §5.5).",
     "item 120 (Find at\nthe village rungs: the ends, fields and places as targets and the ends as Show gaps' units, V07 §5.5); item 122 (the\n"
     "crisis looks at the village rungs: §10.2's places read on the village's records, the ends as a disaster's units, the\n"
     "village tiers' scale and the hand-over through the village's epochs, V07 §5.6).", 1),
    ('G122-V07',
     "T3 `wall`'s `retaining` kind and T4 `road`'s `raised` flag (§7.1). The sibling volumes' parts\nread here:",
     "T3 `wall`'s `retaining` kind and T4 `road`'s `raised` flag (§7.1); item 122's base side — `ConditionOverlay` and\n"
     "its reader comment (§2.7), §2.9's `crises` key and *The crisis framing*, §7.7's DR44, §10.2's crisis look table and its\n"
     "*Crisis looks*, §8.2's `live.crises` rows and §8.8's ring marks, §11.1's exports. The sibling volumes' parts\nread here:", 1),
    ('G122-V07',
     "cap and decline (V06 §3.19); V09's delete; V01's aqueduct terminal form (V01 §3.17.8).\n",
     "cap and decline (V06 §3.19); V09's delete; V01's aqueduct terminal form (V01 §3.17.8); item 122's sibling parts —\n"
     "V01's `disasterDistricts` and `campLand`, V06's `frontierFor` and `crisisLookYields` (V06 §3.22), V08's reading of the\n"
     "conditions with their closed mapping, V11's crisis rows, V09's Show crises, preview, crisis lines and Find's crisis section\n"
     "(V09 §4.21.12), V02's ruined exterior and V03's look damage (item 123's layer).\n", 1),
    ('G122-V07',
     "participants at item 202's call points with V06 §2.1's `ProductEpochContext`; *fallback*: V07 §8's risk (10).\n",
     "participants at item 202's call points with V06 §2.1's `ProductEpochContext`; *fallback*: V07 §8's risk (10). (15) V01 —\n"
     "`disasterSource` reads V07 §5.6 (3)'s units, in V01 §2.3's `DisasterUnit` shape, at THORP, HAMLET and VILLAGE, and\n"
     "`campLand` the village's records as V07 §5.6 (2) states; V06 — `frontierFor` at a village rung answers the through road's entry (V06 §3.22\n"
     "(2)), here V07 §5.6 (2)'s main approach road, and `crisisLookYields` yields a building to its rebuild (V06 §3.22 (3));\n"
     "§10.2's *Crisis looks* — its places read at the village rungs as V07 §5.6 (2) states.\n", 1),

    # V07 §1b: W74's view-state input, W79's widened bounds, W84 (G122-V07).
    ('G122-V07',
     "`RaisedRead.origin`; a generated wall's platform |",
     "`RaisedRead.origin`; a generated wall's platform; while a crisis look stands, §2.9's `crises` and `week` with DR44 at the "
     "viewer's key (the crisis line, V09's `info.crisis.ruinedFor`) |", 1),
    ('G122-V07',
     "| the map's `bounds` (the territory frame, grown by an epoch or an edit) |",
     "| the map's `bounds` (the territory frame, grown by an epoch or an edit); while a crisis look stands, the bounds of town and "
     "camps (§2.9's *The crisis framing*; V07 §5.6) |", 1),
    ('G122-V07',
     "| §2.9's view key `find`; §11.2 (item 120) | the institution names (V08's list entries) |\n",
     "| §2.9's view key `find`; §11.2 (item 120) | the institution names (V08's list entries) |\n"
     "| W84 | the crisis looks at the village rungs (item 122; V07 §5.6) — the places' village readings and the main approach road, "
     "`villageDisasterUnits` and `villageUnitPlots` (the ends, or the toft groups), the village tiers' scale, the crisis lines | the committed records "
     "(`VillagePlan.entries` and `.ends`; the palisade with its runs' conditions, W10, W77; the hinterland's `VillageField`s, W21; "
     "the outlying farmsteads, W22; VS8's stalls, W25); DR3's partner weights; §2.9's `crises` key and `week`; DR44's standing "
     "looks at the viewer's key; V11's `crisis.looks` and `crisis.map` rows | §10.2's placement through V01's "
     "`disasterSource` (its `DisasterUnit`s) and `campLand` and V06's `frontierFor` → §8.2's `live.crises`; V02's ruined exterior and V03's look "
     "damage (item 123's layer); the village `WhyProvider`'s crisis line (W74); V09's Find `crises` section; picture exports "
     "(V07 §5.4); T-V7-69 | §10.2's *Crisis looks*; §7.7's DR44; §2.7's `ConditionOverlay`; §8.2's `live.crises` (item 122) | "
     "`activeConditions[]`, the stressors, `calamityHistory[]` with its `targets`, the forces' and travelling groups' "
     "headcounts (V08) |\n", 1),

    # V07 §2.6: the derived units' lifecycle row (G122-V07).
    ('G122-V07',
     "| the request fields `orchards`, `forest`, `arableFactor`, `organic`, `district` | the request, T1, the skeleton file | S0, "
     "VS4, V07 §3.9, V07 §3.15 | recipe (the blueprint) | kept | `setAttr` on the intent | absent reads `auto` |\n",
     "| the request fields `orchards`, `forest`, `arableFactor`, `organic`, `district` | the request, T1, the skeleton file | S0, "
     "VS4, V07 §3.9, V07 §3.15 | recipe (the blueprint) | kept | `setAttr` on the intent | absent reads `auto` |\n"
     "| the village crisis units (`villageDisasterUnits`, V07 §5.6 (3)) | derived at each call over committed state (the ends, the "
     "district's plots and their shared edges) | V01's `disasterSource` at village rungs; with `villageUnitPlots`, §8.2's `live.crises`, "
     "V02's ruined exterior, V03's look damage and Find's frame | never (memoised per model digest in memory; a look stores nothing) | re-derived over the "
     "regenerated state | re-derived: an undone edit or epoch that changed the ends gives the units of the state it restores | "
     "— (nothing stored) |\n", 1),

    # V07 §3.17: the crisis looks' edge row and combinations (G122-V07; principle (11)).
    ('G122-V07',
     "lifecycle: the `find` key never in the document — saved in view pins only, untouched by undo, redo, regenerate and "
     "migrate, re-evaluated at every commit | check | T-V7-68, T-V7-60 (h) |\n",
     "lifecycle: the `find` key never in the document — saved in view pins only, untouched by undo, redo, regenerate and "
     "migrate, re-evaluated at every commit | check | T-V7-68, T-V7-60 (h) |\n"
     "| the crisis looks at the village rungs (V07 §5.6) | none: no condition and no preview, nothing drawn; one: a THORP of one "
     "house, one unit, ruined at any positive share at `lookLevel`'s depth; data: an unmatched target reported and the pattern used, an "
     "unmapped condition read `none` (V08); no walled stretch, green, market, entry, outlying farmstead, arable face or end — V07 "
     "§5.6 (7)'s outcomes; cap: a force beyond the frame and its margin, the ring marks; rungs: THORP, HAMLET and VILLAGE, the "
     "parity presets none; lifecycle: nothing stored, every look re-derived from the committed state and the view at save, load, "
     "undo, redo, regenerate and migrate | substitute | T-V7-69, T-V7-60 (h) |\n", 1),
    ('G122-V07',
     "| a Find chip on an end at the hand-off up | the end superseded, the chip kept at count 0; the hand-off down revives the end "
     "at its address and the chip lights again (V07 §5.5) | — | T-V7-68 |\n",
     "| a Find chip on an end at the hand-off up | the end superseded, the chip kept at count 0; the hand-off down revives the end "
     "at its address and the chip lights again (V07 §5.5) | — | T-V7-68 |\n"
     "| a siege of a village whose palisade closes only by barrier arcs | the closing arcs take no camp; with no walled stretch the "
     "siege draws the blockade on the entries' ways (§10.2 (h); V07 §5.6 (2)) | — | T-V7-69 |\n"
     "| a crisis look over a hand-off epoch | from that epoch the look draws on the places of the rung in force — the town's "
     "districts after a hand-off up, the village's ends after a hand-off down (V07 §5.6 (4)) | — | T-V7-69 |\n"
     "| a refugee look beside DR18's tent clusters | the look on `campLand`, never on a plot; the clusters stay the model's (V07 "
     "§5.6 (2)) | — | T-V7-69 |\n"
     "| a famine in the harvest weeks | the bare fields drawn over the harvest's crop stage (§8.2's slot 15b) | — | T-V7-69 |\n", 1),

    # V07 §4.5: the village WhyProvider's crisis line (G122-V07; item 122 (f)).
    ('G122-V07',
     "  items 117 (h), 118 (g)), read from view state and the dossier's schedule, never from the model.\n"
     "Its completeness is item 270's test",
     "  items 117 (h), 118 (g)), read from view state and the dossier's schedule, never from the model;\n"
     "* the **crisis line** (item 122 (f); V07 §5.6) — while a crisis look stands at the viewer's key, the answer for a\n"
     "  `VillageEnd` a disaster look ruins and for a `VillageField` a famine look leaves bare carries V09 §4.21.12 (4)'s\n"
     "  `info.crisis.ruinedFor` row (\"For now: Disaster, the mill-end fire, weeks 30–34\"), the one row its why card shows for\n"
     "  it, read from view state (the `crises` key, the `week`) and §7.7's DR44 at the key, never from the model; a condition\n"
     "  the key withholds gives none.\n"
     "Its completeness is item 270's test", 1),

    # V07 §5.1: R2-29 (b) — §8.2's rows are the homes; the village keeps only its own readings.
    ('R2-29 (b) VAL-R1-11 VAL-R1-12', SEASONS_FESTIVALS_OLD, SEASONS_FESTIVALS_NEW, 1),
    ('G122-V07',
     "the seasons §8.2's season rows, cover rows and its `ice` and `snow` roles (item 117), the festivals §8.2's decoration rows\n"
     "(item 118).",
     "the seasons §8.2's season rows, cover rows and its `ice` and `snow` roles (item 117), the festivals §8.2's decoration rows\n"
     "(item 118), the crisis looks §8.2's crisis look rows and roles (item 122; V07 §5.6).", 1),

    # V07 §5.2: the limit widened while a crisis look stands (item 122 (i)).
    ('G122-V07',
     "an epoch or an edit that grows the frame moves the limit\nwith it (item 116 (d)), and exports frame within it",
     "an epoch or an edit that grows the frame moves the limit\nwith it (item 116 (d)), a standing crisis look widens it to the "
     "town and its camps until the look ends (§2.9's *The crisis\nframing*; V07 §5.6), and exports frame within it", 1),

    # V07 §5.4: exports (item 122 (f)).
    ('G122-V07',
     "chosen season and the festival shown, both named (items 116, 117, 118), and Find as shown",
     "chosen season, the festival shown and the crisis looks standing, each named (items 116, 117, 118, 122), and Find as shown", 1),
    ('G122-V07',
     "(item 117 (h)), a festival's decorations in the image only, never walls or obstacles (item 118 (g)), Find off unless asked",
     "(item 117 (h)), a festival's decorations and a crisis look's camps, engines and barricades in the image only, never walls\n"
     "or obstacles (items 118 (g), 122 (f)), Find off unless asked", 1),

    # V07 §5.5 (1): Find's crisis section at the village rungs (item 122 (f)).
    ('G122-V07',
     "An empty box shows the kinds as V11's grouped grid, as at every rung; at THORP and HAMLET the grid is short.",
     "An empty box shows the kinds as V11's grouped grid, as at every rung; at THORP and HAMLET the grid is short. The standing\n"
     "crisis looks are listed in Find's `crises` section as at every rung (V09 §4.21.12 (7); V07 §5.6) — a look is no chip.", 1),

    # The new V07 §5.6, closing V07 §5 (an APPEND TO SECTION block).
    ('G122-V07',
     "names, at most 6 ends and the field groups of a few hundred furlong faces.\n\n## 6 Performance budgets",
     "names, at most 6 ends and the field groups of a few hundred furlong faces.\n\n" + SECTION_5_6.rstrip('\n')
     + "\n\n## 6 Performance budgets", 1),
]
