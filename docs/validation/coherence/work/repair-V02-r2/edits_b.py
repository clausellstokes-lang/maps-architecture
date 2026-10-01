# edits_b — owner items 123 (d) and 122 at the building: G123-V02 and G122-V02 (coherence/repair-V02-r2), written under
# adjudication-r2 R2-35 – R2-38 (and R2-05, R2-09). Each edit: (tag, old, new, count), count-asserted in gen.py.

P0 = """**Ruins and disasters (items 123, 122).** A building left empty for years looks it, and once its floor plan has been
opened its roof shows holes exactly over the rooms whose roof has fallen in, and its outline breaks over a spill of rubble
exactly where an outer wall came down — the same holes and fallen walls the plan shows, because both read one record of
what has broken. As the years pass more breaks, never moving; a repaired roof shows its patches. When SettlementForge
reports a disaster, every building of the neighbourhoods it struck looks ruined while it lasts — blackened after a fire —
until its rebuilding begins, when the scaffolding shows instead; when the disaster ends it looks as before, unless the
following years really left it in ruins. Neither ever changes a building's shape, size or data.

"""

S1A = """9. **Items 123 (d) and 122 at the building (V02 §5.7):** the exterior's damage — a decayed or ruined building's roof
   holes and outline gaps drawn from its plan's damage layer, the same elements at the same level as the plan (V03), and
   its patches after a repair — and the ruined look of a disaster's buildings, item 123's damage at the look's level on
   every building of the neighbourhoods the disaster strikes; looks only, never a wing, a record or a hash.
"""

ROW_1B = ("| `exteriorDamage(doc, b, view, opts)` and its `ExteriorDamage` (V02 §2.4) — the exterior's damage (item 123 (d)) and the "
          "ruined look of a disaster's buildings (item 122) | derived function (never stored) | V06's `decayLevel` for the building's "
          "lineage at §2.9's `week`; the plan in force — current or stored — under its damage layer (V03; §2.6 step 7; §6.3's "
          "`plan.damage` with V11's ranges; its repaired elements by V06's `decayPeak`); the disaster looks drawn in the view over the "
          "building's unit (§2.7's `ConditionOverlay` and its reader rule; §7.7's DR44 and its admission at the view's knowledge key, "
          "`ViewOpts.viewAs` lowering it; §10.2's `disaster` row and its `lookLevel`, and `previewSeverity`; §2.9's `crises`; V01's "
          "`disasterDistricts`, V07's ends at THORP, HAMLET and VILLAGE; V06's `crisisLookYields`) | V02 §5.7's drawing in the tile "
          "rasteriser and the SVG and PNG writers — the `roofscape` program's holes and patches, the outline's gaps and rubble, the "
          "look's tone and dash, the porch, cupola and roof-decoration draws over a hole; the SVG semantics `sem.building.roof.hole` and "
          "`sem.building.rubble`; V02 §6.6's memo; T-V2-59, T-V2-60 | §8.2 (the `states` rows; the crisis look rows), §8.6 (the damaged "
          "plan, item 123) |\n")

ROWS_1C = """| §2.7 `ConditionOverlay` and its reader rule; §2.9's `week`, `crises` and `knowledge` keys; §7.7's DR44; §10.2's crisis look table (`RosterTables.crisis`: the `disaster` row's `lookLevel`, `previewSeverity`); §8.2's crisis look rows; §11's exports (item 122, file g) | the disaster looks drawn in the view, their admission and their level; the marks round the buildings | the ruined look of a disaster's buildings (V02 §5.7) |
| §2.6 step 7; §6.3's concern `plan.damage`; §8.6's damaged plan; §11.1's battle maps (item 123, file g) | the plan in force under its damage layer, one keyed threshold per element; the battle maps following the damage | the exterior's damage (V02 §5.7): the plan's own elements, never a threshold of V02's |
| §8.2's `states` rows (`abandoned`, `decayed`, `ruined`, `charred`, the Works `decaying`), the `charred` program, the wall `breached` row's rubble spill and the `condition` row's patched-courses roof `pattern`; §8.8's tile key | the drawn decline states and the marks and values the exterior's damage reuses | V02 §5.7 (no cell of its own) |
| §12.5 (the crisis looks drawn lazily per visible tile) | the look's per-tile cost | V02 §6.6 |
"""

B1D = """* **Items 123 and 122's other homes.** The damage layer — its element kinds, its keyed thresholds (§6.3's `plan.damage`
  with V11's ranges by material and element kind), the plan's drawing at every state, the plan's exports and its panel
  lines — is V03's; cellars, crypts and underground buildings V04's; the decay level and restoration V06's (`decayLevel`,
  `decayPeak`), and the look's yielding to a rebuild's Works (`crisisLookYields`); the crisis look table, its map rows and
  settings the base's (§10.2) with V11's values; which neighbourhoods a disaster strikes V01's (`disasterDistricts`),
  V07's ends at the village rungs; the marks round the buildings — a ruined quarter's tone, camps, smoke, marked doors —
  §8.2's crisis rows; the hand-over to the aftermath V06's. V02 draws the building's exterior only (V02 §5.7).
"""

D24 = """**The exterior's damage (items 123 (d), 122; V02 §5.7).**

```ts
interface ExteriorDamage {                 // what V02 §5.7 draws of item 123's damage and of a disaster's ruined look; derived at read, never stored
  level: number;                           // the higher of V06's decayLevel at §2.9's week and the drawn disaster look's level (§10.2's
                                           // `disaster` row's lookLevel at its severity); 0 with neither
  look: { condition: Id | null /* null: a preview (§2.9's crises) */;
          kind: string | null /* the calamity's type V01's disasterDistricts reads for its pattern; null for a preview */ } | null;
  reading: 'none' | 'massing' | 'element'; // 'none' at level 0; 'element' where the building's plan is current or stored (V03); else 'massing'
  holes: PointCm[][];                      // 'element': each damaged roof bay over a room — the room's ring clipped to the facets of its own wing
  gaps: [PointCm, PointCm][];              // 'element': each broken outer wall run of a wing's lowest storey, as its span on that wing's outline
  patched: PointCm[][];                    // 'element': each repaired roof bay's ring (item 114's patch material; V06's decayPeak)
}
declare function exteriorDamage(doc: Document, b: Building, view: ViewState, opts: ViewOpts): ExteriorDamage;   // reads §2.9's week, crises and knowledge keys from view, opts.viewAs lowering the key (§9.2)
```

"""

ROW_25 = ("| the exterior's damage and the ruined look (`ExteriorDamage`, V02 §5.7) | derived at read wherever the building is drawn, "
          "from V06's level, the plan in force and the looks drawn in the view | the drawing, the SVG and PNG writers, T-V2-59, T-V2-60 "
          "| never stored: no digest, no snapshot field, no cache chunk of its own (its holes and gaps memoised beside the roofscape, "
          "V02 §6.6) | re-read at every draw; a Regenerate or New random changes it only through its inputs | — (an undo changes its "
          "inputs, never it) | none |\n")

B311 = """* **The exterior's damage reads a plan only where one is in force** (V02 §5.7). A decayed or ruined building, or one
  under a disaster's look, raises no rung for its exterior: its holes and gaps are drawn from the plan a building click or
  V03's `view` derivation put in force (current or stored), and elsewhere the exterior takes its massing reading. A change
  of the decay level or of a look marks no rung stale (`wingsInputs` holds neither), and a plan current before a building
  decays stays current (§2.6 step 7: decay never re-cuts a plan).
"""

S57 = """### 5.7 Ruin and disaster on the exterior (items 123 (d), 122)

Two owner items reach the building's exterior, both looks: a building's floor plans show its ruin as a damage layer over
the same plan (item 123), and its exterior draws the same damage (item 123 (d)); a disaster's neighbourhoods look ruined
while it lasts (item 122 (b)). One reading, `exteriorDamage` (V02 §2.4), serves both. It changes no wing, `MassingRef`,
composition, stored plan, digest or hash, reads no model stream, and stores nothing.

**(1) The level.** A building's level is the higher of its **decay level** — V06's `decayLevel` for its lineage at §2.9's
`week`, 0 for a building never abandoned (item 123 (b)) — and the level of a **disaster look** over it: the `disaster`
row's `lookLevel` (§10.2; V11's values) at the condition's severity, linear between its two ends. A disaster look lies
over a building while the look is drawn in the view — its `ConditionOverlay` standing in the view's week by §2.7's reader
rule, its map row reading `disaster` (§7.7's DR44), admitted by the view's knowledge key (DR44's admission;
`ViewOpts.viewAs` lowering it, §9.2), and drawn by §2.9's `crises` in `follow` — or previewed: `crises` in `preview`
naming the `disaster` row, at §10.2's `previewSeverity`, with or without a dossier — while the building stands in a unit
the look strikes and has not handed over ((6)). The units are every district V01's `disasterDistricts` returns — for a
preview, the districts it returns for the previewed look, keyed on the look kind in the condition's stead (§10.2's
placement; X35) — and at THORP, HAMLET and VILLAGE every end V07 returns; every building of a unit draws the look, with
no second, per-building share (item 122 (b): whole neighbourhoods). Nothing of the look is drawn from a stream of its
own: its units are V01's and V07's (keyed by the condition's id), its elements' thresholds the building's lineage's
(§6.3), its rubble the building's render key's (§8.10). Of two looks over one building the higher level is drawn, with
that look's kind (ties: the lower condition id). At level 0 — a building never abandoned, under no look — nothing of this
section is drawn: the building draws byte-identically to stage 3 without items 122 and 123 (T123-7's no-op).

**(2) The element reading — where the building's plan is in force.** Where the building's plan rung is current or stored
(V03; a stale cached plan is not read, its elements no longer sure to lie on the massing's facets), the exterior draws
exactly the damage the plan shows at the level. V03's damage layer gives each element its state — intact; damaged, the
level at or past its keyed threshold (§6.3's `plan.damage`, V11's ranges); or repaired, the level below its threshold and
V06's `decayPeak` at or past it, its damage having left through a restoration (item 123 (b)) — and V02 reads two kinds
of element, never a threshold of its own:
* **A roof bay over a room** (the roof over a room of the storey directly under it). Damaged, it is a **hole**: the room's
  ring clipped to the facets of the room's own wing (a tower room's to its tower's; never another wing's), removed from
  those facets and from every dormer facet over it, and drawn as §8.2's `decayed` row draws a roofless building (no roof
  construction, the fill at the row's alpha); the roof's lines (V02 §5.2 step 5) stop at its edge, which is drawn in
  `ink` at the `roofscape` program's `hipWeight`. A wing whose every roof bay is damaged draws no roof facet over its
  rooms: the lost upper storey item 123 (c) gives a `ruined` building, seen from above. Repaired, its facets take §8.2's
  patched-courses roof `pattern` (the `condition` row's) over its ring, at the neighbourhood band and finer — item 114's
  patch material on a roof.
* **An outer wall run of a wing's lowest storey** (a wall run of the plan with the outside on one face, on the first
  storey `storeyRange` gives that wing; a solid wing has none). Broken, it is a **gap**: the outline the drawing gives
  that wall — the footprint outline for a wing on the ground, the eave line of a wing standing on another — is not drawn
  over the run's span, and at the neighbourhood band and finer §8.2's rubble spill (the wall `breached` row's dots, keyed
  by the building's render key, §8.10 — never a model stream) covers a strip along the span reaching the `roofscape`
  program's cell `rubbleReachM` (1.5 m; V02 §5.3) to each side of the outline (at least 1 px), the fallen wall's spill
  inside and out. Repaired, the run's outline is drawn whole (its
  patch material the plan's to show, V03).

Marks standing on a hole go with it: the cupola, `sails` and every roof decoration whose foot lies in a hole are not
drawn; a plan chimney stands (its stack is masonry; §8.6 draws it as before). The porch and a secondary porch are drawn
only while the outer run carrying their entrance stands. A **roofless** building — roof kind `none`, the model's
`decayed`, `ruined` and `charred` states — has no facet to hole: it draws its state row, the gaps cut from that row's
outline, and every roof bay over a room its plan holds is open, which T-V2-59 (b) holds the plan to (X34). Where a
building at the decay Works' `decaying` stage draws its roof with gaps along the ridge (§8.2), the element reading's
holes are those gaps (X37).

**(3) The massing reading — where no plan is in force.** No element is known, so nothing is drawn that a plan could
contradict. A building's own decay draws its state row alone (§8.2, as before). A building under a disaster look draws,
over its state row, its roof tone lerped toward `ground` as the `abandoned` row lerps it (30 %) and its outline dashed as
the `decaying` row dashes it — the dash the look's second cue (item 112). When the building's plan comes into force (a
building click; V03's `view` derivation), the element reading's holes and gaps join that tone and dash; because every
threshold is keyed by the lineage and the element's id (§6.3), they are the same whenever, and by whichever trigger, the
plan is derived (V02 §3.11: no rung is raised for them).

**(4) The disaster's kind.** The look draws the damage of (2) and (3) whatever the disaster. Its kind — the calamity's
type V01's `disasterDistricts` reads for its pattern — adds one flavour: a **fire** blackens, the massing reading's tone
lerping toward `ink` instead of `ground` and every hole drawn in the `charred` program's tone; a **flood**, an
**earthquake**, every other kind and a preview (no kind) draw the damage alone — an earthquake's fallen wings, towers and
open roofs and a flood's fallen walls and outbuildings are that damage, and a flood's stained lower storeys lie under the
roofs a map draws from above (J-V2.113). The look leaves no patch: an element only the look damaged is drawn in its real
state again from the week the look no longer stands (V06's `decayPeak` never reads a look).

**(5) At each band.** City band: nothing of this section — the masses are the model's, and a ruined quarter's tone is
§8.2's crisis rows'. District band: the tone and the dash, and the element reading's holes and gaps. Neighbourhood band
and finer: the rubble spill and the patches as well, the composition's dormers, porches and decorations as (2) says.
Building band: where a building's plan is drawn, the plan draws its own damage (V03; §8.6); every other building's
exterior as at the neighbourhood band.

**(6) The hand-over** (item 122 (a)). The look leaves a building where V06 hands it over: from the week V06's
`crisisLookYields(doc, building, overlay, week)` holds — a Works other than a `decay` Works begun on the building by that
week and not finished before the condition's `sinceWeek` (a rebuild, a repair, a clearance, a demolition) — the building
draws its Works' stage and its own state, so no week draws both the ruined look and the rebuild's scaffolding; a `decay`
Works never ends the look. A building no rebuild reaches keeps the look until its condition no longer stands. A building
the next epoch really ruins or abandons reads its own level from that epoch's week (V06's hazard and decline phases),
the look's level ruling only while it is the higher.

**(7) Exports.** A picture export — SVG, PNG, print — draws this section as the view draws it at its band, week and key
(item 122 (f)), the SVG carrying the holes in `sem.building.roof.hole` and the rubble in `sem.building.rubble` (V02
§5.5); a battle map follows the damage by §11.1's rule (item 123 (e)) and draws a disaster's look in its image only. The
glTF, OBJ, CityJSON, GeoJSON and JSON exports carry neither (J-V2.112).

**(8) Its inputs.** The drawing reads §2.9's `week`, `crises` and `knowledge` keys and `ViewOpts.viewAs`, so a tile
holding a building whose level is above 0 is keyed by them as a tile holding a Works mark is keyed by the drawn week
(§8.8's tile key; X37); a building's holes, gaps and patches are memoised beside its roofscape (V02 §6.6).
"""

S66 = """### 6.6 Ruin and disaster on the exterior (items 123 (d), 122)

| work | budget | estimate (PLAUSIBLE) |
|---|---|---|
| `exteriorDamage` at level 0 | ≤ 1 µs per drawn building | V06's `decayLevel` read (its cost V06's) and the look test against the units of the looks drawn in the view, listed once per look and week — nothing drawn |
| the massing reading of a damaged building | ≤ 2 µs over its roofscape | one tone lerp per facet and the outline's dash |
| the element reading of a damaged building | ≤ 30 µs median, ≤ 200 µs p99 (a large manor fully ruined) over its roofscape | ≤ 60 roof bays and ≤ 80 outer runs read from the plan in force; each hole clipped against the ≤ 8 facets of its own wing (float64, the renderer's CPU reference); the outline cut at each gap; the rubble spill per pixel cell |
| a neighbourhood-band tile in a disaster's district at the METROPOLIS core | ≤ 2 ms of tile-worker raster time over the tile's roofscape | ≤ 60 buildings (V02 §6.2) × 30 µs where every plan is in force; × 2 µs where none is |
| the memo | ≤ 1 KB per damaged building, inside the roofscape memo's 8 MB LRU cap (V02 §6.3) | the holes, gaps and patches keyed by the leaf digest, the plan's hash and the set of damaged and repaired element ids |

Drawn lazily per visible tile inside §12.5's frame budget — the crisis looks' lazy per-tile line — an interaction budget
item 119 (d) leaves as it is; nothing is derived for it (V02 §3.11), so it adds no one-time wait. **Measured** at M6b
on B-CITY METROPOLIS with the damage sub-fixture and the look fixture of V02 §7.8, plans derived on the core's
buildings.
**Fallbacks, in order:** (a) each hole's clip run first on its bounding box and exactly only on an overlap (no output
change); (b) on a tile still over its share, the rubble spill left out at the neighbourhood band, the gaps kept — a
declared view shift, reported.
"""

S78 = """### 7.8 Ruin and disaster on the exterior

**Fixtures.** A **damage sub-fixture** of B-MASS: a `dwelling-detached` house, an `inn-compound` round its court, a
manor with towers and a turret, a stepped temple with its shrine and solid tiers, a terraced palace, a deck building on a
bridge, a solid stepped monument and a `hovel`, each with its plan derived (V03), drawn at decay levels 0, 0.1, 0.2, 0.3,
0.5, 0.75 and 1 (V06's level, set by the building's existence state and years, in stone and in timber), then restored from 1
to 0 by a `repair` Works, and each once with no plan in force. A **look fixture** on B-CITY-lite's TOWN and CITY seeds and
B-VILLAGE's VILLAGE seed: a dossier condition whose map row reads `disaster` (V08's port; V11's map rows) — a fire, a
flood and an earthquake — at severities 0, 0.5 and 1, `sinceWeek` 10 and `untilWeek` 20; on one seed a rebuild's `repair`
Works beginning in week 18 on half the struck buildings and a `decay` Works on two others, and a second disaster
overlapping the first; the same documents with Show crises `off` and with no condition; and the `disaster` preview on a
standalone document.

* **T-V2-59 the exterior agrees with the plan** (item 123 (d), (f); takes T123-5) — on the damage sub-fixture at every
  level and every restoration step: (a) the holes are exactly the plan's damaged roof bays over rooms (ring for ring
  after the clip to their wing's facets), the gaps exactly its broken outer runs of each wing's lowest storey (span for
  span) and the patched rings exactly its repaired roof bays — none drawn where the plan shows the element intact;
  (b) on a roofless building (`decayed`, `ruined`, `charred`) no roof facet is drawn and every roof bay over a room the
  plan holds is damaged; (c) the holes and gaps at a higher level contain those at a lower, and the restoration removes
  them in reverse threshold order, each repaired bay patched and each repaired run drawn whole; (d) at level 0 every tile
  byte-identical to the same fixture without item 123 (T123-7's no-op; the `item123.damage` pin is V12's, V12 §2.13);
  (e) with no plan in force the massing reading — no hole, no gap — and, the plan then derived by a click and by V03's
  `view`, the same holes and gaps as from the stored plan; (f) the model digest, every `MassingRef`, wing, stored composition and stored plan, and the
  saved bytes identical with the damage drawn and not, across a save and load and an undo and redo of the restoring
  epoch; (g) the glTF, OBJ and CityJSON exports byte-identical at every level, and an SVG at the neighbourhood band
  carrying the holes in `sem.building.roof.hole` and the rubble in `sem.building.rubble`, the outline open over each gap.
* **T-V2-60 a disaster's ruined look** (item 122) — on the look fixture: (a) every building of every unit
  `disasterDistricts` returns (V07's ends at VILLAGE) draws the look in exactly the weeks it stands (10–19; 10–17 on a
  building whose rebuild's Works begins in week 18) and no building outside those units does — at the element reading its
  holes and gaps equal its plan's damage at the higher of its own level and the look's, at the massing reading the toned
  roof and the dashed outline; (b) the model digest, every wing, `MassingRef`, stored composition and stored plan, and the
  saved bytes identical with Show crises `follow`, `off` and a preview and in every week; (c) with Show crises `off`, every
  building's exterior byte-identical to its drawing under no disaster look (its own decay alone), and with no condition
  and no preview every tile byte-identical to stage 3 without item 122 (the `item122.crises` no-op; its pin is V12's,
  V12 §2.13); (d) from week 18 a building whose rebuild's Works began draws that Works' stage and
  not the look (V06's `crisisLookYields`), and a building under a `decay` Works keeps the look; a building also really
  decayed drawn at the higher level; in week 20 every element in its real state, none patched by the look; (e) a viewer
  whose knowledge key withholds the condition sees the look on no building; (f) the fire's buildings blackened, the
  flood's and the earthquake's not; of two overlapping looks the higher level drawn; (g) one building's holes and gaps
  identical across two views, at the district and neighbourhood bands and in an SVG and a PNG export; (h) the stepped
  temple, the deck building, a tower and a solid monument take V02 §3.18 (e)'s outcomes, and an underground building
  draws none of it.

**CI tiers for these:** T-V2-59 in the PR tier on the damage sub-fixture (≈ + 4 s); T-V2-60 in the PR tier on
B-CITY-lite's TOWN seed (≈ + 6 s) and nightly on every seed of the look fixture; both at the milestone on B-CITY
METROPOLIS with V02 §6.6's measurement.
"""

S86 = """### 8.6 Ruin and disaster in the build (items 123, 122)

| milestone | content | exit (executed) | est. |
|---|---|---|---|
| **M6b**, added — the exterior's damage at the later of M6b and V03's item-123 plan step (V03 §8); the ruined look with it, once item 122's base parts (M3b) and V01's `disasterDistricts` (M5) stand | `exteriorDamage` and V02 §5.7's drawing in every shipped family — the holes, gaps, rubble and patches, the massing reading's tone and dash, the fire's blackening — the SVG semantics and the export rows of V02 §5.5; V02 §6.6's memo | T-V2-59, T-V2-60; V02 §6.6 measured | + 0.5–1 pw |

Until V03's item-123 step lands no plan carries a damage layer, so the element reading draws nothing and the massing
reading stands; until V06's decay level lands (M6-E) the level is read from the existence state alone at V11's default
age (V06); at THORP, HAMLET and VILLAGE the look's units wait for V07's ends (V07 §8).
"""

J112 = ("| J-V2.112 | Chose to draw **item 123's damage on the exterior from the plan in force** (V02 §5.7) — its damaged roof bays over "
        "rooms as holes cut from their own wing's facets, its broken outer runs of each wing's lowest storey as gaps in the outline, "
        "its repaired bays in the patched-courses pattern, all read from V03's damage layer and §6.3's keyed thresholds — over "
        "thresholds or a damage pattern of V02's own, because the owner asks the inside and the outside to agree (item 123 (d)) and "
        "only the plan's own elements can agree with it element for element; to draw **no element where no plan is in force** — the "
        "state rows alone, and a look's tone and dash — and to raise no rung for the exterior, over deriving a plan for every damaged "
        "building in view, because a typical house's plan costs 3 ms median and 10 ms p95 (V03 §6) and a disaster's districts hold "
        "hundreds of buildings, while §4.1's "
        "`elaborate` decides when a rung is derived and never what it draws, so the holes are the same whenever the plan comes; and to "
        "leave the damage and a disaster's look **out of the glTF, OBJ, CityJSON, GeoJSON and JSON exports**, over carrying them, "
        "because those carry the model's surfaces and records (a roofless building already exports no roof) while the damage depends "
        "on the drawn week, the plan in force and, for a look, the viewer's switch and key — a picture draws both and a battle map "
        "follows §11.1. |\n")
J113 = ("| J-V2.113 | Chose to draw **a disaster's ruined look as item 123's damage at the higher of the building's own decay level and "
        "the look's** (the `disaster` row's `lookLevel` at the condition's severity, §10.2) on every building of every unit V01's "
        "`disasterDistricts` returns (V07's ends at the village rungs), over a ruined look of its own or a per-building share inside "
        "a struck district, because the owner's disaster takes whole neighbourhoods (item 122 (b)) and one damage design keeps the "
        "exterior, the plan and the cellars in one comparison (item 122 (d)); to give the kinds **one flavour** — a fire blackens — "
        "over a look per disaster, because soot is the one mark the damage does not already draw — an earthquake's fallen wings, "
        "towers and open roofs and a flood's fallen walls and outbuildings are the damage itself, and a flood's stained lower storeys "
        "lie under the roofs a map draws from above; and to let the look **leave no patch**, over reading its end as a "
        "repair, because the look is temporary and cosmetic (item 122 (a)) and what really breaks reaches the map only through V06's "
        "epoch path. |\n")

X_ROWS = """| X34 | V03 | the damage layer V02 §5.7 reads for the plan in force: each roof bay over a room (its ring) and each outer wall run of a wing's lowest storey (its span), each intact, damaged or repaired at a level; a roofless building's (roof kind `none`) roof bays all damaged, so the plan agrees with the model's roofless state (T-V2-59 (b)) | the element reading draws nothing (the massing reading) |
| X35 | V01, V07 | `disasterDistricts` returning the districts a disaster strikes — for a standing condition, and for a preview of the look keyed on its look kind in the condition's stead (§10.2's placement) — with the calamity's type its pattern reads, and V07's ends at THORP, HAMLET and VILLAGE; every building of each draws the ruined look (V02 §5.7) | no look on a building |
| X36 | V06 | `decayLevel` and `decayPeak` per lineage at a week, and `crisisLookYields` per building, read by V02 §5.7 | the level from the existence state at V11's default age, nothing repaired; the look standing until its condition no longer stands |
| X37 | the base, §8.2 and §8.8 (rendering) | the Works `decaying` row's gaps along the ridge drawn, where a plan is in force, as V02 §5.7's holes; the drawn week, `crises` and the knowledge key in the tile key of a tile holding a building whose level is above 0, as the drawn week is for a Works mark | the row's own ridge gaps |
"""


import re as _re, textwrap as _tw
def _reflow(t, width=120):
    """Re-wrap prose at `width`: a paragraph's lines are joined; a bullet ('* ') or numbered item ('9. ') keeps its hanging
    indent; table rows, headings, fences and blank lines are kept as they are."""
    out, buf, ind0, ind1 = [], [], '', ''
    def flush():
        nonlocal buf
        if buf:
            out.extend(_tw.wrap(_re.sub(r'\b(V[01][0-9]) §', '\\1\u00a0§', ' '.join(x.strip() for x in buf)), width=width, initial_indent=ind0, subsequent_indent=ind1,
                                break_on_hyphens=False, break_long_words=False))
            buf = []
    for l in t.split('\n'):
        if not l.strip() or l.startswith(('|', '#', '```')):
            flush(); out.append(l); continue
        m = _re.match(r'^(\* |\d+\. )', l)
        if m:
            flush(); ind0, ind1 = '', ' ' * len(m.group(1)); buf = [l[len(m.group(1)):]]; ind0 = m.group(1); continue
        if not buf:
            ind0 = ind1 = ''
        buf.append(l)
    flush()
    return '\n'.join(out).replace('\u00a0', ' ')
P0, S1A, B1D, B311, S57, S66, S78, S86 = (_reflow(x) for x in (P0, S1A, B1D, B311, S57, S66, S78, S86))


def build(text):
    E = []
    # §0 — the plain-words paragraph, before *Speed*.
    E.append(('G122/G123 §0', "**Speed.** Building the shapes for a 50 000-person metropolis",
              P0 + "**Speed.** Building the shapes for a 50 000-person metropolis", 1))
    # §1a — item 9.
    E.append(('G122/G123 §1a',
              "   retaining walls, (b) raised ways (generated at CITY and METROPOLIS, declared at TOWN, added or removed by the user)\n"
              "   and (e) the second known-city fixture.\n",
              "   retaining walls, (b) raised ways (generated at CITY and METROPOLIS, declared at TOWN, added or removed by the user)\n"
              "   and (e) the second known-city fixture.\n" + S1A, 1))
    # §1b — the wiring row, after the roofscape's.
    i = text.index("| `roofscape(building)` | derived function (never stored) |")
    j = text.index("\n", i) + 1
    rs = text[i:j]
    E.append(('G122/G123 §1b row', rs, rs + ROW_1B, 1))
    # §1c — the hook rows, after the last row.
    i = text.index("| §12.1 *Targets and the comfort level*; §12.10's R12-31 – R12-34 (item 119, file g) |")
    j = text.index("\n", i) + 1
    last = text[i:j]
    E.append(('G122/G123 §1c rows', last, last + ROWS_1C, 1))
    # §1d — the other homes.
    E.append(('G122/G123 §1d',
              "  X19). V02 designs the building part only (V02 §3.15–V02 §3.17).\n",
              "  X19). V02 designs the building part only (V02 §3.15–V02 §3.17).\n" + B1D, 1))
    # §2.4 — the declaration, after *Eave sides*.
    E.append(('G122/G123 §2.4',
              "ring order. A `polygon` wing has no eave sides (no dormers).\n\n### 2.5 Identity and lifecycle of every state field\n",
              "ring order. A `polygon` wing has no eave sides (no dormers).\n\n" + D24 + "### 2.5 Identity and lifecycle of every state field\n", 1))
    # §2.5 — the lifecycle row, after the `Composition` row.
    i = text.index("| `Composition` as a whole | the `wings` rung")
    j = text.index("\n", i) + 1
    crow = text[i:j]
    E.append(('G122/G123 §2.5 row', crow, crow + ROW_25, 1))
    # §3.11 — the reading needs no rung.
    i = text.index("* **Re-rolls.** `regenerate` with `rung: 'wings'` advances `#wings`")
    j = text.index("\n\n", i) + 1
    rr = text[i:j]
    assert rr.endswith("random on the building's plot or block re-derives its massing (S11) with the plot's reroll (§6.1).\n"), rr[-120:]
    E.append(('G122/G123 §3.11', rr, rr + B311, 1))
    # §3.18 (b) — the village rung's units.
    E.append(('G122 §3.18 (b) village',
              "while a manor S10b admits and a building the dossier or the author makes grand keep their full rows (V02 §3.2 step 2; item 115) |\n",
              "while a manor S10b admits and a building the dossier or the author makes grand keep their full rows (V02 §3.2 step 2; item 115); a disaster's ruined look falls on every building of V07's ends (V02 §5.7) |\n", 1))
    E.append(('G122 §3.18 (b) tests',
              "Tests: T-V2-29, T-V2-30, T-V2-33 (every class at every band), T-V2-55, T-V2-58.\n",
              "Tests: T-V2-29, T-V2-30, T-V2-33 (every class at every band), T-V2-55, T-V2-58, T-V2-60.\n", 1))
    # §3.18 (c) — Show crises.
    E.append(('G122 §3.18 (c) row',
              "| the export option `compositions` | V02 §5.5 |\n",
              "| the export option `compositions` | V02 §5.5 |\n"
              "| Show crises (§2.9's `crises`): `follow` (the default) / `off` / `preview` | the disaster looks drawn in the view fall on their units' buildings / no look: each building's exterior by its own decay alone, as if no disaster look stood / the previewed `disaster` look at §10.2's `previewSeverity` on the units its preview strikes (V02 §5.7); item 123's damage is never switched |\n", 1))
    E.append(('G122 §3.18 (c) tests',
              "Tests: T-V2-26, T-V2-31, T-V2-32, T-V2-37, T-V2-50, T-V2-55, T-V2-58.\n",
              "Tests: T-V2-26, T-V2-31, T-V2-32, T-V2-37, T-V2-50, T-V2-55, T-V2-58, T-V2-60.\n", 1))
    # §3.18 (d) — derived, never stored.
    E.append(('G122/G123 §3.18 (d)',
              "migration row (T-V2-6), one without `MassingRef.stack` by the stack migration row (T-V2-46). Tests: T-V2-6, T-V2-19,\n"
              "T-V2-20, T-V2-24, T-V2-34, T-V2-48.\n",
              "migration row (T-V2-6), one without `MassingRef.stack` by the stack migration row (T-V2-46). The exterior's damage and a\n"
              "disaster's ruined look (V02 §5.7) are derived at read and never stored: a load re-reads them from the level, the plan in\n"
              "force and the looks, and an undo or redo of an epoch changes only the level they read. Tests: T-V2-6, T-V2-19,\n"
              "T-V2-20, T-V2-24, T-V2-34, T-V2-48, T-V2-59, T-V2-60.\n", 1))
    # §3.18 (e) — per mechanism, after the exports row.
    i = text.index("| exports (V02 §5.5) | a scope with no building; a zero-area facet |")
    j = text.index("\n", i) + 1
    exr = text[i:j]
    E.append(('G122/G123 §3.18 (e) rows', exr, exr +
              "| the exterior's damage (V02 §5.7) | level 0 (never abandoned, under no look); level 1; no plan in force (none stored, none current); a stale cached plan | nothing drawn, byte-identical (T123-7's no-op); every element the plan holds damaged; the massing reading, no hole or gap; the stale plan never read — the massing reading until the plan is re-derived | — | T-V2-59 |\n"
              "| the exterior's damage (V02 §5.7) | a building with no roof bay over a room or no storeyed wing (a solid monument, a stack of solid tiers); a roofless building (roof kind `none`: `decayed`, `ruined`, `charred`); a building under a Works whose stage draws no roof (`wallsRising`) or no building yet (`staked`, `groundBroken`) | no hole (gaps only where a storeyed wing has outer runs); no facet to hole — every roof bay open, the gaps cut from its state row's outline; holes only in the facets the stage draws and gaps only on an outline it draws, nothing where it draws no building | — | T-V2-59 |\n"
              "| the exterior's damage (V02 §5.7) | a restoration from level 1 to 0; a building first met ruined (generated as a ruin, or reached by item 113's replay) | the damage leaving in reverse threshold order, each repaired bay patched and each repaired run drawn whole; its plan as built under its damage (V03), the exterior reading that plan | — | T-V2-59 |\n"
              "| the ruined look (V02 §5.7) | severity 0 and 1; two disaster looks over one building; a condition the view's key withholds; a `preview` on a standalone document | the `disaster` row's two `lookLevel` ends; the higher level, with that look's kind (ties: the lower condition id); no look on any building; the previewed look at `previewSeverity` on its preview's units | — | T-V2-60 |\n"
              "| the ruined look (V02 §5.7) | a roofless building; a deck building; a tower; a stack; an underground building | its state row with the gaps; as any building (its own plan; no cellar); the tower room's roof bay opening its cone; each storeyed wing's own roof bays and lowest-storey runs, a solid wing none; none — below ground is V04's | — | T-V2-60 |\n", 1))
    # §3.18 (f) — combinations, after the last row.
    i = text.index("| an epoch undone after a save | the epoch's recorded wing steps (`EditBase.mutations`)")
    j = text.index("\n", i) + 1
    ep = text[i:j]
    E.append(('G122/G123 §3.18 (f) rows', ep, ep +
              "| a disaster's look over a building really decayed | each element drawn at the higher of the two levels; an element the look's level does not reach keeps its real state, a repaired one its patch | — | T-V2-60 |\n"
              "| a disaster's look and its aftermath (V06) | the look leaves a building where V06's `crisisLookYields` holds, so no week draws both the look and the rebuild's scaffolding; a building the next epoch really ruins or abandons reads its own level from that epoch's week; an element only the look damaged is drawn in its real state when the look ends, never patched | — | T-V2-60 |\n"
              "| a disaster's look and a Works on its building | a Works other than a `decay` Works begun by the week and not finished before the condition's `sinceWeek` (a rebuild, a repair, a clearance, a demolition) ends the look on that building (V06's `crisisLookYields`): its Works' stage and its own state drawn, never both; a `decay` Works, or one finished before the condition, leaves the look standing, its damage over what the stage draws — holes in the facets it draws, gaps on the outline it draws | — | T-V2-60 |\n"
              "| a disaster's look over a deck building whose deck is ruined | the building by its own state row (§8.2's deck row) and the higher level; when the deck's fall tombstones it, nothing | — | T-V2-60 |\n"
              "| a dossier change moving a condition's weeks or severity, or removing a building under a look | the look re-read at the next draw, no rung stale; a removed building drawn by its fate, no look on what is gone | — | T-V2-60 |\n"
              "| an epoch undone, or a save and load, while a look stands | nothing stored: the exterior re-reads the restored level and the look's weeks, byte-identical to before | — | T-V2-59, T-V2-60 |\n", 1))
    # §5.1 — the pointer.
    E.append(('G122/G123 §5.1',
              "a map with no building draws nothing of stage 3.\n",
              "a map with no building draws nothing of stage 3.\n\n"
              "**Ruin and disaster** (items 123 (d), 122): a building's damage and a disaster's ruined look are drawn over these rows\n"
              "by V02 §5.7 — holes in the roofscape's facets and gaps in the outline, with rubble and patches at the neighbourhood band\n"
              "and finer — and change no mass at the city band.\n", 1))
    # §5.3 — the roofscape program's damage cell (V02 §5.7).
    E.append(('G123/G122 §5.3 cell',
              "  lines of V02 §5.2 step 5 in `ink`, cells `ridgeWeight` (½ of the band's building outline weight: ridges and seams) and\n"
              "  `hipWeight` (⅓: hips and valleys).\n",
              "  lines of V02 §5.2 step 5 in `ink`, cells `ridgeWeight` (½ of the band's building outline weight: ridges and seams) and\n"
              "  `hipWeight` (⅓: hips and valleys); V02 §5.7's damage drawn over the facets — a hole's edge at `hipWeight`, and cell\n"
              "  `rubbleReachM` (1.5 m: the rubble spill's reach to each side of a gap in the outline).\n", 1))
    # §5.5 — the exports.
    E.append(('G122/G123 §5.5 SVG',
              "no per-building group and no `data-wing` attribute, so §12.7's element budgets hold; at the city band nothing new (masses) |\n",
              "no per-building group and no `data-wing` attribute, so §12.7's element budgets hold; at the city band nothing new (masses); V02 §5.7's damage and a disaster's look as the view draws them — the holes in `sem.building.roof.hole` (one compound `<path>` per district, after the wing facets), the outline left open over each gap, the rubble in `sem.building.rubble`, the look's tone on the facets' fills |\n", 1))
    E.append(('G122/G123 §5.5 glTF',
              "The export option `compositions`: `'asDrawn'` (the default: the compositions whose rung is current or stored), `'derive'` (`compose()` run for every building of the export scope first, in the derivation pool, under V02 §6.4's export budget) or `'none'` (the massing only) |\n",
              "The export option `compositions`: `'asDrawn'` (the default: the compositions whose rung is current or stored), `'derive'` (`compose()` run for every building of the export scope first, in the derivation pool, under V02 §6.4's export budget) or `'none'` (the massing only); V02 §5.7's damage and a disaster's look are not carried (J-V2.112): the roofs as the model holds them, a roofless building's none |\n", 1))
    E.append(('G122/G123 §5.5 CityJSON',
              "attributes `plat:role` and `plat:key` in the `Plat` extension (the base's `plat.ext.json`) |\n",
              "attributes `plat:role` and `plat:key` in the `Plat` extension (the base's `plat.ext.json`); V02 §5.7's damage and a disaster's look not carried (J-V2.112) |\n", 1))
    E.append(('G122/G123 §5.5 VTT',
              "| **VTT** | the ground scene's walls from the footprint (the base's); a tower's ring is part of the footprint's walls; a stair's outer sides are not walls; the storey scenes are the plan's (V03) |\n",
              "| **VTT** | the ground scene's walls from the footprint (the base's); a tower's ring is part of the footprint's walls; a stair's outer sides are not walls; the storey scenes are the plan's (V03); walls, portals and line of sight follow the damage by §11.1's battle-map rule (item 123 (e)), and a disaster's look is drawn in the image only, never as a wall or an obstacle (item 122 (f)) |\n", 1))
    E.append(('G122/G123 §5.5 pictures',
              "buildings; the `compositions` option is read identically by every format.\n",
              "buildings; the `compositions` option is read identically by every format. A picture export (SVG, PNG, print) draws\n"
              "V02 §5.7's damage and a disaster's look exactly as the view draws them at its band, week and key (item 122 (f)).\n", 1))
    # §5.7 — appended after §5.6 (where APPEND TO SECTION ## 5 puts it).
    E.append(('G122/G123 §5.7',
              "* **Labels and exports.** V02 §5.4's roles and V02 §5.5's rows cover stacks, stairs and deck buildings.\n\n## 6 Performance budgets\n",
              "* **Labels and exports.** V02 §5.4's roles and V02 §5.5's rows cover stacks, stairs and deck buildings.\n\n" + S57 + "\n## 6 Performance budgets\n", 1))
    # §6 — the targets' range, §6.6 (inside the ## 6 REPLACE).
    E.append(('G122/G123 §6 head',
              "**Targets and the comfort level (item 119; §12.1).** The lines of V02 §6.1 – V02 §6.5 are the **targets**, which the build\n",
              "**Targets and the comfort level (item 119; §12.1).** The lines of V02 §6.1 – V02 §6.6 are the **targets**, which the build\n", 1))
    E.append(('G122/G123 §6.6',
              "only on an overlap (a pure speed-up, no output change); then tiers above seven truncated at ST3 (a declared shift, §13.3).\n\n## 7 Tests and acceptance bars\n",
              "only on an overlap (a pure speed-up, no output change); then tiers above seven truncated at ST3 (a declared shift, §13.3).\n\n" + S66 + "\n## 7 Tests and acceptance bars\n", 1))
    # §7.1 — the pointer to §7.8's fixtures.
    E.append(('G122/G123 §7.1',
              "  assignment drift naming only `H`; T-V2-58); and V02 §7.7's.\n",
              "  assignment drift naming only `H`; T-V2-58); and V02 §7.7's and V02 §7.8's.\n", 1))
    # §7.8 — appended after §7.7.
    i = text.index("**CI tiers for these:** T-V2-44 – T-V2-53 in the PR tier")
    j = text.index("\n\n## 8 Build plan\n", i)
    ci = text[i:j + 1]
    E.append(('G122/G123 §7.8', ci + "\n## 8 Build plan\n", ci + "\n" + S78 + "\n## 8 Build plan\n", 1))
    # §8.3 — the totals.
    E.append(('G122/G123 §8.3 effort',
              "**Effort (stated once; PLAUSIBLE): 22.5–32.5 expert person-weeks for the volume** — **M6 18.25–27.5 pw** (the three rows\n"
              "above, 15–22.5; V02 §8.5's additions inside M6, 3–4.5; and 0.25–0.5 across M6a–M6c for the `fort` and `burial-ground`\n"
              "family rows, the `arena` row's move, the `charnelHouse` and `lychgate` rows, the oval's minor-axis gates,\n",
              "**Effort (stated once; PLAUSIBLE): 23–33.5 expert person-weeks for the volume** — **M6 18.75–28.5 pw** (the three rows\n"
              "above, 15–22.5; V02 §8.5's additions inside M6, 3–4.5; V02 §8.6's, 0.5–1; and 0.25–0.5 across M6a–M6c for the `fort`\n"
              "and `burial-ground` family rows, the `arena` row's move, the `charnelHouse` and `lychgate` rows, the oval's\n"
              "minor-axis gates,\n", 1))
    # §8.6 — appended after §8.5.
    i = text.index("**Dependencies.** M3a-V2 needs the base's deck plots (item 246)")
    j = text.index("\n\n## 9 Decisions\n", i)
    dp = text[i:j + 1]
    E.append(('G122/G123 §8.6', dp + "\n## 9 Decisions\n", dp + "\n" + S86 + "\n## 9 Decisions\n", 1))
    # §9 — the two decision rows.
    i = text.index("| J-V2.111 | Chose to **re-budget V02 §6.4's exports")
    j = text.index("\n", i) + 1
    j111 = text[i:j]
    E.append(('G122/G123 §9 rows', j111, j111 + J112 + J113, 1))
    # §12 — CONFIRMED, PLAUSIBLE, census.
    E.append(('G122/G123 §12 confirmed',
              "  and what a lock protects\"); items 109 (j), (k) (J111) and 110 (a)–(f) (`docs/AMENDMENTS-2026-09-28g.md`).\n",
              "  and what a lock protects\"); items 109 (j), (k) (J111), 110 (a)–(f), 122 and 123 (J135, J136)\n"
              "  (`docs/AMENDMENTS-2026-09-28g.md`).\n", 1))
    E.append(('G122/G123 §12 plausible',
              "* The `tiersTruncated` Monte-Carlo (N = 4 000 per anchor,",
              "* That V02 §5.7's reuse of the base's values — the `abandoned` row's 30 % lerp, the `decaying` row's dash, the `decayed`\n"
              "  row's fill alpha, the rubble spill's density and `rubbleReachM` 1.5 m — reads as a ruined building to the owner's eye, and\n"
              "  V02 §6.6's budgets — M6b's measurement and the owner's panel decide.\n"
              "* The `tiersTruncated` Monte-Carlo (N = 4 000 per anchor,", 1))
    E.append(('G122/G123 §12 census',
              "**Census** (over this file): decisions J-V2.1 – J-V2.111 (111 rows, J-V2.58, J-V2.73 and J-V2.76 marked); tests T-V2-1 – T-V2-58 (58 bars); hand-offs X1 – X33;",
              "**Census** (over this file): decisions J-V2.1 – J-V2.113 (113 rows, J-V2.58, J-V2.73 and J-V2.76 marked); tests T-V2-1 – T-V2-60 (60 bars); hand-offs X1 – X37;", 1))
    # §13 — the hand-off rows.
    i = text.index("| X33 | V12 §2.1 | the metric family `bar.<barId>`")
    j = text.index("\n", i) + 1
    x33 = text[i:j]
    E.append(('G122/G123 §13 rows', x33, x33 + X_ROWS, 1))
    return E
