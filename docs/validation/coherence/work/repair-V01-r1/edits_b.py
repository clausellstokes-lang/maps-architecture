# Edits B: §3.14, §3.16, §3.17.6, §3.18, §4.2, §4.3, §5.1.2, §5.3 (with the new §5.4).
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from lib import section

NEW_54 = """### 5.4 Find over the town — areas and gaps (item 120, the town's part; J-V1.102)

Find is a view, never a change (item 120 (a)): its state is the per-viewer view key `find` (§2.9: the chips and the Show
gaps switch), kept across zooms, bands, layers, the season, epochs and edits until **Clear** or the panel's close, and
outside the document, its hash and the log. The panel, the type-ahead, the chip grid, the results and the `live.find`
overlay are volume 9's; the veil, halo, outline, pin and count-bubble rows §8.2's; the search words and groups V11's
lexicon; the gazetteer's class counts and match listing §11.2's; the clerk's "show me" volume 10's. Every list entry,
count, glow, pin and gap passes §11.2's admission at the view's effective key, band-less as the gazetteer reads (as at
the city band; item 120 (h); V09 §4.8's View as). This section states what a town — TOWN to the METROPOLIS cap — and a
standalone neighbourhood document offer as **areas**, and how **Show gaps** reads its units, through `@plat/hood`'s
`findAreas` and `gapUnits` (V01 §2.3, V01 §3.16): pure, draw-free functions of committed state and the key, memoised per
commit and per key, never stored. Below TOWN the village's reading is V07 §5.5's; a village grown into the town ladder
takes this one at its hand-off.

**(1) Areas — `findAreas(layer, key)`** (item 120 (b), (e)). One `FindArea` per area the document holds on the layer:
* **Districts and neighbourhoods** — every `District` of the layer but the hinterland pseudo-district (the land outside
  the town; a match there is listed by itself, under no area): the base's districts on Ground; on Below each undercity
  neighbourhood and the underground pseudo-district (II.7.3, II.7.5; V04 §3.6a (5)); on Sky each island's districts
  (V01 §3.10.3); in a standalone neighbourhood document its one district. **A neighbourhood is the district a close-up
  opens** (J-V1.35): districts and neighbourhoods are one set of targets — one chip per area, never a district chip and a
  neighbourhood chip for the same land — and `word` reads `neighbourhood` for an `undercity` or `underground` district
  and a standalone neighbourhood document's district, `district` for every other. Its search words are its name (its
  `LabelEntity`'s, `displayText` where set) and its identity row's label (item 72; a dossier QUARTER record's label where
  it gives one, V01 §5.2.1), so "weavers" finds the weavers' quarter whichever word named it.
* **Quarters** — each `QuarterNode` of §9.1's tree in the **city cut** (`cityCut`: §4.5's quarters) with two or more
  member districts, the union of its members; a city-cut node of one district is that district's target, never a second
  chip. An undercity neighbourhood joins the tree under its parent's quarter node (II.7.5 (2)), so a quarter may have a
  shape on Ground and one on Below.
* **Regions** — each `RegionGroup` (item 101: an Upper, Lower or Outer City), the union of its quarters' districts,
  named by its `region` label.
* **Named places** — a named `HoodPlace` (V01 §3.7.1: a square, green, yard, court or opening) is a place target of the
  gazetteer's place rows (§11.2), not an area: a square, green, yard or court lifts its host face and glows along it, an
  opening glows at its symbol (V01 §3.8.8); its admission is its `knownTo` read as the gazetteer reads it, so a `local`
  court's name is offered only to a key that admits it there.
Nothing the document lacks is listed: a TOWN whose city cut stands every district alone lists no quarter. An area the key
does not admit — on Below, a neighbourhood in a void the key withholds — is never listed, counted, lifted or pinned; a
quarter or region whose member districts the key admits only in part takes those members' union, and is not listed
when it admits none.

**(2) The look of an area chip** (item 120 (e), (f)). An area chip lifts its `shapes` on the layer shown from the veil
and draws §8.2's halo along their outlines; a hole in a shape (a district a quarter encloses but does not hold) stays
under the veil. On the city band an area whose shape spans less than the pin size at the stop drawn carries its chip's
pin at its `anchor` (item 120 (e)), so a small district at item 116's zoom-out limit is never a lost speck. On a layer
that holds none of its shapes it shows as a ghost pin at its anchor and counts among the panel's "more Below" and "on
Sky" (item 120 (f); V04's and V05's parts draw them). An area chip never filters a kind chip's matches: the chips are a
union (item 120 (d)).

**(3) Show gaps — `gapUnits(chip, key, layer)`** (item 120 (i)). For each kind chip (an area, place or person chip has
no gaps), the **unit** is its class's compiled `profile.coverage` — `unit` and `per` (V11 §2.3) — with `neighbourhood`
read as `district` (J-V1.35); a class without a coverage row reads the `district` unit, the "one in every district"
reading of the Coverage view this switch absorbs; a chip of several classes ("all smiths", item 120 (c)) reads their
common `unit` and `per` when all share one, else `district`, its members those of any of its classes. The **members**
are exactly the chip's matches the key admits (§11.2's match listing, the set the chip glows): a member the key
withholds counts toward no unit, so a unit reads as the viewer knows it and a gap never hints at what the key withholds.
The units are `catchmentOf`'s (V01 §3.16) — never a second definition — each a `GapUnit` holding no member:
* **Partition units.** `district` — every district of the layer the key admits but the hinterland (a member in the
  hinterland counts toward none), a gap when no member's plot lies in it, its area the district's faces united.
  `parish` — the cells `catchmentOf('parish')` gives (the plots whose nearest parish-church member is the same; before
  any church, the district), built from the church members the key admits, so no cell outlines a church the key
  withholds (its plots fall to the nearest admitted church, item 120 (h)); a gap when the cell holds no member, its id
  the church member's (the district's before any church), its area the union of its plots' faces; a church class read
  on `parish` stands in every cell it makes, so it has no gap.
  `settlement` — one unit, the town, a gap only when the key admits no member on any layer, its id `TOWN_ROOT`, its area
  the shown layer's districts united.
* **Per-plot units.** `walk` and `households` — each residential plot (one holding a household at S10a, §4.7: the plots
  V12 §3.6's `servedShare` counts for these units) whose `catchmentOf(plot, unit, per)` holds no member is unserved; a
  district's unserved plots form its gap unit (its id the district's, its area the union of their faces), and a district
  with no residential plot holds none (V11 §2.3's skipped term). On Below `catchmentOf` reads `underDistance`, and on Sky
  an island is one `walk` unit, as V01 §3.16 states.
Each gap's components are drawn by §8.2's dashed gap outline with one "none here" label per component, on the layer
shown; a gap on another layer is drawn when that layer is shown and is listed in V10's `FindAnswer.none` by its `id`.
**Evaluation.** A partition unit takes one pass over the members' plots. A per-plot unit takes one multi-source walk from
the members' front points by `catchmentOf`'s metric, bounded at the largest radius a residential plot's unit takes; the
metric is symmetric, so a plot's catchment holds a member exactly when the walk reaches the plot within that plot's own
radius (ties by plot id, as `catchmentOf` breaks them): `per` for `walk`; for `households` the distance at which
`catchmentOf`'s walk from that plot takes its `per`-th household (its households radius, memoised per commit and per
`per` with `catchmentOf`'s memo). A plot with no way within `per`, or with fewer than `per` households in its arena, takes
`catchmentOf`'s own rule (every plot it can reach, and itself). T-V1-59 (b) holds the walk to the per-plot reading, plot
by plot.

**(4) Over time and edits** (item 120 (f)). Every commit, regenerate, undo, redo and epoch re-evaluates both services
with the overlay's index, rebuilt once per commit (item 120 (j)): a district an epoch creates is listed, and its gaps
drawn, in that commit; an edit that removes a district's last member of a chip's class makes it a gap, and its undo
removes the gap. A chip's area is held by its id: a district succeeded by a merge or split (§6.3's anchor rule), or a
quarter node a Re-derive from S6 rebuilds under another id, is no longer held, and its chip stays in the grid at count
0, dark, until the viewer removes it or presses Clear (item 120 (a)). No commit writes the view key.

**(5) Exports and cost** (item 120 (i), (j)). A district or outline picture export (V01 §5.3) draws Find as shown — the
veil, each area's lift and halo, the gaps with "none here" — with the chips in the legend, by §11.1's rule; a VTT scene
leaves it off unless asked; no export stores it. Find is an interaction, not a one-time wait (item 119 (d)): `findAreas`
and `gapUnits` run within §12.5's overlay budget by V01 §6's Find lines, never re-rendering the base tiles, and a chip's
glow is never delayed by its gaps, which draw when computed."""


def add(E, L):
    # ------------------------------------------------------------------ §3.14 (VV12-11, VV12-16, VV12-12)
    h = '### 3.14 Constants (with provenance and table home)'
    E(h, 'its `range` clamps an edit (V11 §2.1)', "its `range` clamps an edit (V11 §2.1; V11 §4.1's rule)", tag='VV12-16')
    E(h, "| `ring.insetELo`; `ring.portalGapM` | V01 §3.4.4 (the fit inset `eLo + w_tpl / 2`; the portal gap `max(6 m, 2 × lane width)`) |",
      "| `ring.insetELo`; `ring.portalGapM` | V01 §3.4.4 (the fit inset's multiple of `eLo`; the portal gap's floor) |", tag='VV12-11')
    E(h, "| `plaza.aspectMin`, `sq.smallDiv` | V01 §3.4.5 (aspect `1 + bell4` above 1.2), V01 §3.5.3 (`smallBlockM2 = eLo² / 2`) |",
      "| `plaza.aspectMin`, `sq.smallDiv` | V01 §3.4.5 (the rectangle's least drawn aspect), V01 §3.5.3 (`smallBlockM2`'s divisor of `eLo²`) |",
      tag='VV12-11')
    E(h, "| `green.maxMedian`, `green.spacingEHi`, `green.leafyCourt` | V01 §3.5.4, V01 §3.5.7 |",
      "| `green.maxMedian`, `green.spacingEHi`, `green.leafyCourt` | V01 §3.5.4, V01 §3.5.7, V01 §3.10.1 |", tag='VV12-11')
    E(h, "| `size.small`, `size.medium`, `size.large` | V01 §3.10.1, V01 §3.15 |",
      "| `size.small`, `size.medium`, `size.large` | V01 §3.10.1, V01 §3.15, V01 §4.2 |", tag='VV12-11')
    E(h, "| `hood.hillsidePct`; `hood.hillsideMaxPct` | V01 §3.10.1, §4.1 |",
      "| `hood.hillsidePct`; `hood.hillsideMaxPct` | V01 §3.10.1, V01 §4.1 |", tag='VV12-12')
    E(h, "| `terrace.maxLevels`; `terrace.profileNoticeCm` | V01 §3.4.3 (per flank); §3.9, §3.11 (7) |",
      "| `terrace.maxLevels`; `terrace.profileNoticeCm` | V01 §3.4.3 (per flank); V01 §3.9, V01 §3.11 (7) |", tag='VV12-12')

    # ------------------------------------------------------------------ §3.16 (G120-V01)
    h = '### 3.16 Services other volumes call (`@plat/hood`)'
    E(h, "Pure, draw-free functions of committed state, memoised per commit, each ≤ 1 ms per call at CITY (V01 §6):",
      "Pure, draw-free functions of committed state, memoised per commit, each ≤ 1 ms per call at CITY (V01 §6; Find's two by\n"
      "their own lines):", tag='G120-V01')
    E(h, """Callers: S10a / S10b's coverage term (V11's `cov/<class>` rows, the base solver), volume 10's
  explanations, volume 9's coverage view.""", """Callers: S10a / S10b's coverage term (V11's `cov/<class>` rows, the base solver), volume 10's
  explanations, `gapUnits` (Find's Show gaps, V01 §5.4, into which item 120 (i) folds volume 9's Coverage view).""",
      tag='G120-V01')
    E(h, """One **writer** other volumes call:""", """* **`findAreas(layer, key)`** and **`gapUnits(chip, key, layer)`** — Find's area targets and Show gaps' units (item
  120), memoised per commit and per key, stated with their rules at V01 §5.4. Callers: volume 9's Find panel and
  `live.find` overlay, volume 10's `FindAnswer`, §11.1's picture exports.

One **writer** other volumes call:""", tag='G120-V01')

    # ------------------------------------------------------------------ §3.17.6 (VEW-14)
    h = '#### 3.17.6 Deck plots (J-V1.68)'
    E(h, """A bridge over a moat offers deck plots only by item 246's rule (none on a
   `ford` or `draw` bridge, none without a `deckCm`); a fixed moat bridge with a deck belongs by this rule (its intramural end where one end lies inside the
   enceinte, else `Bridge.deck[0]`'s).""", """A bridge over a moat offers no deck plots at a gate (a bridge over a
   `moat` or `castle_moat` whose way is a `Gate.way`; §2.7, §4.7: the gate's approach stays clear) and otherwise only by
   item 246's rule (none on a `ford` or `draw` bridge, none without a `deckCm`); a fixed moat bridge away from a gate
   belongs by this rule (its intramural end where one end lies inside the enceinte, else `Bridge.deck[0]`'s).""",
      tag='VEW-14')

    # ------------------------------------------------------------------ §3.18
    h = '### 3.18 Edges — every mechanism at its limits (principle (11))'
    # (c) toggles (VAP-22 agreement; G120-V01)
    E(h, "| item 110's rows off | nothing of V01 §3.17 acts; byte-identical to the build without them (T-V1-4's no-op pin) |",
      "| item 110's switches off (V11 §3.24.0) | nothing of V01 §3.17 acts; byte-identical to the build without them (T-V1-4 (e)'s no-op pin, registered on V12 §3.7.8's engine as `item110.*`) |",
      tag='VAP-22')
    E(h, """| GeoJSON `closeup: true` | hood pins exported as presentation features (V01 §5.3) |

Tests: T-V1-4, T-V1-56 (c).""", """| GeoJSON `closeup: true` | hood pins exported as presentation features (V01 §5.3) |
| Find on or off; Show gaps on or off (item 120) | view only: the document, its hash, the log and the tiles byte-identical; the area targets and gap units recomputed per commit (V01 §5.4) |

Tests: T-V1-4, T-V1-56 (c), T-V1-59 (d).""", tag='G120-V01')
    # (e) per mechanism
    E(h, '| identifiers and tables (V01 §2.1, §2.2) |', '| identifiers and tables (V01 §2.1, V01 §2.2) |', tag='VV12-12')
    E(h, "`R ≤ eLo`; `landmark.maxRings` reached; 0 inhabitants;", "`R ≤ eLo`; `landmark.maxRings` reached; a non-convex precinct outline; 0 inhabitants;",
      tag='VV12-07')
    E(h, "no ring, the row bends; the precinct series ends, reported; the plaza at `minM2`;",
      "no ring, the row bends; the precinct series ends, reported; the buffer union (V01 §3.4.4 (3); §3.7 *Insets*); the plaza at `minM2`;",
      tag='VV12-07')
    E(h, '| unit runs (V01 §3.4.8, §3.10) |', '| unit runs (V01 §3.4.8, V01 §3.10) |', tag='VV12-12')
    E(h, "clamped to the nearer bound, said in one line (V11 §2.2's `ColumnSpec.range`);",
      "clamped by V11 §4.1's rule (V11 §2.1's `ColumnSpec.range`);", tag='VV12-16')
    E(h, """| services (V01 §3.16) | an element under no district; a region with no built block or part-0 way; `plotLandM2` 0; a plot with nothing within `per` | the empty list; `null` measures; 1; every plot it reaches, and itself | — | T-V1-42, T-V1-46 |""",
      """| services (V01 §3.16) | an element under no district; a region with no built block or part-0 way; `plotLandM2` 0; a plot with nothing within `per` | the empty list; `null` measures; 1; every plot it reaches, and itself | — | T-V1-42, T-V1-46 |
| Find's areas and gaps (V01 §5.4) | a layer with no district (a town before S6, an empty layer); a town of one district; a city-cut quarter of one district; a quarter the key admits in part, or not at all; a class with no coverage row; a several-class chip whose classes' units differ; no admitted member; a member the key withholds; every member in the hinterland; a per-plot unit over a district with no residential plot; a chip's area no longer held (merged away, or rebuilt under another id); the METROPOLIS cap | no area target and no gap unit; one district target, no quarter; that district's target only; the admitted members' union, or not listed; the `district` unit; the `district` unit over every member of its classes; every unit a gap; a gap where it alone stands, at that key (never a hint, item 120 (h)); every `district` unit a gap, a per-plot plot served only where `catchmentOf` reaches a hinterland member; no unit there; the chip kept at count 0, dark, until removed or Clear; V01 §6's Find lines | check | T-V1-59 |""",
      tag='G120-V01')
    E(h, "| deck plots (V01 §3.17.6) | a deck whose owner rule meets no district (`Bridge.deck[0]` in the hinterland) | the hinterland pseudo-district's allocation | — | T-V1-53 |",
      "| deck plots (V01 §3.17.6) | a deck whose owner rule meets no district (`Bridge.deck[0]` in the hinterland); a gate's moat deck | the hinterland pseudo-district's allocation; no deck plot (§4.7) | — | T-V1-53 |",
      tag='VEW-14')
    E(h, '| rendering and labels (V01 §5.1, §5.2) |', '| rendering and labels (V01 §5.1, V01 §5.2) |', tag='VV12-12')
    # (f) combinations: the rung column (VEW-19) and the moat-deck row (VEW-14)
    i, e = section(L, h)
    sec = L[i:e]
    k0 = next(k for k, l in enumerate(sec) if l.startswith('**(f) Where this volume'))
    k1 = next(k for k in range(k0, len(sec)) if sec[k].startswith('| combination | outcome | test |'))
    rows = []
    k = k1 + 2
    while k < len(sec) and sec[k].startswith('|'):
        rows.append(sec[k]); k += 1
    assert len(rows) == 15, len(rows)
    rung = {
        'steep ground and a terraced ward': 'simpler shape (the levels clipped); leave out and report (the level cap); substitute (`bent-cut`)',
    }
    old_tbl = '\n'.join(sec[k1:k1 + 2] + rows)
    new_rows = []
    for r in rows:
        cells = r.split(' | ')
        name = cells[0].lstrip('| ').strip()
        assert len(cells) == 3, r
        cells.insert(2, rung.get(name, '—'))
        new_rows.append(' | '.join(cells))
        if name == 'a moat and a terraced ward':
            new_rows.append("| a bridge over a moat and deck plots | none on a gate's moat deck (§4.7: the gate's approach stays clear); a fixed moat bridge away from a gate offers them by item 246's rule, owned as V01 §3.17.6 (1) states | — | T-V1-53 |")
    new_tbl = '\n'.join(['| combination | outcome | rung | test |', '|---|---|---|---|'] + new_rows)
    E(h, old_tbl, new_tbl, tag='VEW-19; VEW-14')
    E(h, """**(f) Where this volume's features meet another unit's at their limits** (at TOWN, CITY and METROPOLIS unless a row says
otherwise):""", """**(f) Where this volume's features meet another unit's at their limits** (at TOWN, CITY and METROPOLIS unless a row says
otherwise; the rung is §5's for a cell that handles a failure, `—` for a cell that is a rule with no failure):""",
      tag='VEW-19')

    # ------------------------------------------------------------------ §4.2 (VV12-11)
    h = '### 4.2 The tool parameters (items 272, 349, 350)'
    E(h, """the chips **small / medium / large**,
  about 85, 700 and 1 050 houses;""", """the chips **small / medium / large**,
  `size.small`, `size.medium` and `size.large` houses (V01 §3.14);""", tag='VV12-11')

    # ------------------------------------------------------------------ §4.3 (VV12-12)
    h = '### 4.3 Locality, stated as the oracle checks it'
    E(h, "(V04 §4.3's switch row, §3.10)", "(V04 §4.3's switch row, V04 §3.10)", tag='VV12-12')

    # ------------------------------------------------------------------ §5.1.2 (VV12-13)
    h = '#### 5.1.2 The programs'
    E(h, """**The NG parity sheet** keeps `fakeGablePerWing` from M6a;
  at M6b the NG draw-style bars are re-measured on `roofscape` and the sheet switches to it when they pass, else keeps
  `fakeGablePerWing`, reported (V02 §5.3; J-VI.17 H8); every other""", """**The NG parity sheet** takes its roof
  construction by V01 §7's rule (V02 §5.3 supplies `roofscape`; J-VI.17 H8); every other""", tag='VV12-13')

    # ------------------------------------------------------------------ §5.3 + the new §5.4 (G120-V01)
    h = '### 5.3 Exports'
    E(h, """An export
of a district whose close-up was never opened derives it for the export (a pure function), never stores it.""", """An export
of a district whose close-up was never opened derives it for the export (a pure function), never stores it. A picture
export draws Find as shown (V01 §5.4 (5)).

""" + NEW_54, tag='G120-V01')
