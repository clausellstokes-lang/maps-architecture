# repair-r4-V01 edits (coherence/repair-V01-r4). Each edit: (tag, old, new, count) applied to the text as it stands
# after the edits before it; gen.py asserts the count. The old texts are exact substrings of V01.orig.md (the live V01
# as assemble-r3 installed it, sha256 8260b2a8…).
#   VV12-r3-03 (major; FIX per R4-12): Find at a drawn week reads the frame — gapUnits(chip, key, week?), the disaster
#     look's Show frame by the frame's faces; the sweep (R4-01 (2)): findAreas(key, week?), §5.4's lead and (4), §1.2,
#     §1b, §2.3, §3.16, §3.18 (d) and (e), §6, T-V1-59.
#   VAF-R3T-01 (minor; FIX): campLand's built edge reads §10.2 (d)'s town enceintes (§3.16 (1), §1b).
#   END of VEW-r3-01 (pipeline; R4-09): §3.17.3 (3) by §4.3's rule, its two cells V11 §3.24.2's; the sweep: §1.2's
#     V11 row, §3.14's lead and row, T-V1-51 (c), §12's PLAUSIBLE list.


def build(text):
    E = []

    # ---------------- §1.2 the base hooks ----------------
    E.append(('1.2-v11-item110-row (END VEW-r3-01)',
              "`raisedWays.structure` (`clearanceCm`), `aqueduct.terminal` | `terraceState` (V01 §2.3), the stair-stepped "
              "way (V01 §3.6 (3)), crossings under arches (V01 §3.17.3), the terminal",
              "`raisedWays.structure` (`clearanceCm`, `clearWidthM`, `squareDeg`), `aqueduct.terminal` | `terraceState` "
              "(V01 §2.3), the stair-stepped way (V01 §3.6 (3)), crossings under arches (V01 §3.17.3, by §4.3's crossing "
              "rule), the terminal", 1))
    E.append(('1.2-item120-row (VV12-r3-03)',
              "§11.2's gazetteer match listing and admission, §12.5's overlay budget; V09's Find panel and `live.find` "
              "overlay; V10 §2.13's `FindAnswer`; V11's lexicon (labels, synonyms, groups) | the per-viewer chips and the "
              "Show gaps switch; the veil, halo, outline, pin and count-bubble rows; each chip's matches at the view's "
              "effective key |",
              "§11.2's gazetteer match listing (with its *At a drawn week*) and admission, §12.5's overlay budget; §2.9's "
              "`week` and V06 §3.15.2's frame; V09's Find panel and `live.find` overlay; V10 §2.13's `FindAnswer`; V11's "
              "lexicon (labels, synonyms, groups) | the per-viewer chips and the Show gaps switch; the veil, halo, "
              "outline, pin and count-bubble rows; each chip's matches at the view's effective key and drawn week; the "
              "model the view draws (the head, or the drawn week's frame) |", 1))

    # ---------------- §1b wiring table ----------------
    E.append(('1b-find-row-inputs (VV12-r3-03)',
              "| committed districts of every layer, §9.1's city-cut `QuarterNode`s and `RegionGroup`s with their "
              "`LabelEntity` names, `District.identity`, the districts' L1 faces; `catchmentOf` (V01 §3.16) over the "
              "class's compiled `profile.coverage` (V11 §2.3); the chip's matches the view's key admits (§11.2's match "
              "listing) |",
              "| the model the view draws — the committed head, or at a drawn week whose frame is not the head V06 "
              "§3.15.2's frame (§2.9's `week`) —: its districts of every layer, §9.1's city-cut `QuarterNode`s and "
              "`RegionGroup`s with their `LabelEntity` names, `District.identity`, the districts' L1 faces; `catchmentOf` "
              "(V01 §3.16) over the class's compiled `profile.coverage` (V11 §2.3); the chip's matches the view's key "
              "admits at that week (§11.2's match listing and its *At a drawn week*) |", 1))
    E.append(('1b-find-row-hooks (VV12-r3-03)',
              "| §2.9's view key `find`; §11.2; §8.2's Find rows; §12.5 |",
              "| §2.9's view keys `find` and `week`; §11.2; §8.2's Find rows; §12.5 |", 1))
    E.append(('1b-campLand-row (VAF-R3T-01)',
              "the districts' outer boundary and the outermost enceinte's outer strip,",
              "the districts' outer boundary and the outermost town enceinte's outer strip (§10.2 (d)),", 1))

    # ---------------- §2.3 views and services ----------------
    E.append(('2.3-find-comment (VV12-r3-03)',
              "// Find's area targets and Show gaps' units (V01 §5.4; item 120): view data — derived per commit and per "
              "view key, outside the document, its hash and the log",
              "// Find's area targets and Show gaps' units (V01 §5.4; item 120): view data — derived per commit, view key "
              "and drawn frame (§2.9's `week`; V06 §3.15.2), outside the document, its hash and the log", 1))
    E.append(('2.3-findAreas-signature (VV12-r3-03, sweep)',
              "//   findAreas(key: Admission): FindArea[] /* Find's area targets on every layer, at the view's effective "
              "key (V01 §5.4 (1)) */",
              "//   findAreas(key: Admission, week?: number): FindArea[] /* Find's area targets on every layer, at the "
              "view's effective key and drawn week (§2.9's `week`; absent, the head) (V01 §5.4 (1)) */", 1))
    E.append(('2.3-gapUnits-signature (VV12-r3-03)',
              "//   gapUnits(chip: { classes: string[] }, key: Admission): GapUnit[] /* Show gaps' units of a kind chip on "
              "every layer (V01 §5.4 (3)) */",
              "//   gapUnits(chip: { classes: string[] }, key: Admission, week?: number): GapUnit[] /* Show gaps' units of "
              "a kind chip on every layer, at the view's drawn week (§2.9's `week`; absent, the head) (V01 §5.4 (3)) */",
              1))

    # ---------------- §3.14 constants (END VEW-r3-01: the two cells move to V11 §3.24.2) ----------------
    E.append(('3.14-lead-cited-cells (END VEW-r3-01)',
              "(`clearanceCm`, `stripMarginM`, the material rows)",
              "(`clearanceCm`, `stripMarginM`, `clearWidthM`, `squareDeg`, the material rows)", 1))
    E.append(('3.14-row-withdrawn (END VEW-r3-01)',
              "| `raised.clearWidthM`; `raised.squareDeg` | V01 §3.17.3 (arch clear width + 1 m; ± 30° of square) | 1 m; "
              "30° | number · `m`; `cdeg` | [0, 3]; [10°, 45°] | yes | — | — | `own` |\n",
              "", 1))

    # ---------------- §3.16 services ----------------
    E.append(('3.16-find-bullet (VV12-r3-03)',
              "* **`findAreas(key)`** and **`gapUnits(chip, key)`** — Find's area targets and Show gaps' units (item\n"
              "  120), memoised per commit and per key, stated with their rules at V01 §5.4.",
              "* **`findAreas(key, week?)`** and **`gapUnits(chip, key, week?)`** — Find's area targets and Show gaps'\n"
              "  units (item 120), read over the model the view draws — `week` the view's drawn week (§2.9's `week`): at\n"
              "  one whose frame is not the head, V06 §3.15.2's frame, as §11.2's *At a drawn week* reads it; absent, the\n"
              "  head — memoised per commit, key and drawn frame, stated with their rules at V01 §5.4.", 1))
    E.append(('3.16-campLand-built-edge (VAF-R3T-01)',
              "or the outermost enceinte's outer strip\n"
              "  where that lies beyond it; (2)",
              "or the outermost town enceinte's outer\n"
              "  strip where that lies beyond it (§10.2 (d): the enceintes of kinds other than `bailey`, `outermost` the\n"
              "  outer envelope of their walled arcs); (2)", 1))

    # ---------------- §3.17.3 (3) (END VEW-r3-01) ----------------
    E.append(('3.17.3-3-by-4.3 (END VEW-r3-01)',
              "3. **Crossing under an arch.** A part-0 way this volume lays (a seed, a fan, a bent-cut lane) crosses a "
              "strip only\n"
              "   through an `open` span (the span's `use`, an eager base fact; item 244's span rule) whose clear width is "
              "≥ the way's\n"
              "   width + `raised.clearWidthM` and whose soffit meets item 244's clearance rule for the crossed way — the "
              "way's held\n"
              "   `clearanceCm` first, else volume 11's `raisedWays.structure.clearanceCm` for the crossed class (cart or "
              "foot) —\n"
              "   within ± `raised.squareDeg` of square to the deck; never along the strip, never through a pier. A seed "
              "that would\n",
              "3. **Crossing under an arch.** A part-0 way this volume lays (a seed, a fan, a bent-cut lane) crosses a "
              "strip by\n"
              "   §4.3's rule: only through an `open` span (the span's `use`, an eager base fact; item 244's span rule) "
              "whose clear\n"
              "   width is ≥ the way's width + `raisedWays.structure.clearWidthM` and whose soffit meets §2.7's *The "
              "clearance* for\n"
              "   the crossed way, within ± `raisedWays.structure.squareDeg` of square to the deck (V11 §3.24.2); never "
              "along the\n"
              "   strip, never through a pier. A seed that would\n", 1))

    # ---------------- §3.18 edges ----------------
    E.append(('3.18d-toggle-row (VV12-r3-03, sweep)',
              "the area targets and gap units recomputed per commit (V01 §5.4) |",
              "the area targets and gap units recomputed per commit and drawn week (V01 §5.4) |", 1))
    E.append(('3.18e-find-row-case (VV12-r3-03)',
              "a chip's area no longer held (merged away, or rebuilt under another id); the METROPOLIS cap |",
              "a chip's area no longer held (merged away, or rebuilt under another id); a scrubbed week whose frame is "
              "not the head; the METROPOLIS cap |", 1))
    E.append(('3.18e-find-row-outcome (VV12-r3-03)',
              "the chip kept at count 0, dark, until removed or Clear; V01 §6's Find lines |",
              "the chip kept at count 0, dark, until removed or Clear; the frame's areas, members and units (§11.2's "
              "*At a drawn week*, V01 §5.4 (1) and (3)), a disaster look framed by its units' faces in that frame (V01 "
              "§5.4 (6)); V01 §6's Find lines |", 1))

    # ---------------- §5.4 Find over the town ----------------
    E.append(('5.4-lead (VV12-r3-03)',
              "`findAreas` and `gapUnits` (V01 §2.3, V01 §3.16): pure, draw-free functions of committed state and the key "
              "over every\n"
              "layer, each row carrying its layer, memoised per commit and per key, never stored.",
              "`findAreas` and `gapUnits` (V01 §2.3, V01 §3.16): pure, draw-free functions of the key and of the model "
              "the view draws,\n"
              "over every layer — the committed head, or at a drawn week (§2.9's `week`) whose frame is not the head "
              "V06 §3.15.2's\n"
              "frame, as §11.2's *At a drawn week* reads it —, each row carrying its layer, memoised per commit, key "
              "and drawn frame,\n"
              "never stored.", 1))
    E.append(('5.4-1-head (VV12-r3-03, sweep)',
              "**(1) Areas — `findAreas(key)`** (item 120 (b), (e)).",
              "**(1) Areas — `findAreas(key, week?)`** (item 120 (b), (e)).", 1))
    E.append(('5.4-1-drawn-week (VV12-r3-03, sweep)',
              "`local` court's name is offered only to a key that admits it there.\n",
              "`local` court's name is offered only to a key that admits it there. **At a drawn week** whose frame is "
              "not the head\n"
              "(V06 §3.15.2) the areas are the frame's — its districts, city-cut quarters and region groups, each "
              "area's `shapes`\n"
              "its faces in that frame — so a district an edit or epoch split or merged after that week is listed "
              "whole, as the\n"
              "frame holds it, one made after it is not listed, and an area chip's matches are §11.2's listing at that "
              "week; absent,\n"
              "the head.\n", 1))
    E.append(('5.4-3-head (VV12-r3-03)',
              "**(3) Show gaps — `gapUnits(chip, key)`** (item 120 (i)).",
              "**(3) Show gaps — `gapUnits(chip, key, week?)`** (item 120 (i)).", 1))
    E.append(('5.4-3-week (VV12-r3-03)',
              "withholds counts toward no unit, so a unit reads as the viewer knows it and a gap never hints at what the "
              "key withholds.\n",
              "withholds counts toward no unit, so a unit reads as the viewer knows it and a gap never hints at what the "
              "key withholds.\n"
              "`week` is the view's drawn week (§2.9's `week`), absent the head: at a drawn week whose frame is not the "
              "head\n"
              "(V06 §3.15.2) the members are §11.2's match listing at that week and the units only those the frame holds "
              "— a\n"
              "district, parish cell or residential plot the frame lacks is no unit (§11.2's *At a drawn week*) —, "
              "`catchmentOf`'s\n"
              "discs and cells read over that frame.\n", 1))
    E.append(('5.4-4-week-trigger (VV12-r3-03, sweep)',
              "**(4) Over time and edits** (item 120 (f)). Every commit, regenerate, undo, redo and epoch re-evaluates "
              "both services\n"
              "with the overlay's index, rebuilt once per commit (item 120 (j)):",
              "**(4) Over time and edits** (item 120 (f)). Every commit, regenerate, undo, redo and epoch, and every "
              "change of the\n"
              "view's drawn week (§2.9's `week`), re-evaluates both services with the overlay's index, rebuilt once per "
              "commit (item\n"
              "120 (j)):", 1))
    E.append(('5.4-4-held-area (VV12-r3-03, sweep)',
              "grid at count 0, dark, until the viewer removes it or presses Clear (item 120 (a)). No commit writes the "
              "view key.",
              "grid at count 0, dark, until the viewer removes it or presses Clear (item 120 (a)), save at a drawn week "
              "whose frame\n"
              "holds that id, where the chip reads the frame's area and its matches ((1)). No commit writes the view key.",
              1))
    E.append(('5.4-6-frame (VV12-r3-03)',
              "its card's **Show** frame — is the union of the Ground shapes of its units' `FindArea`s: the districts\n"
              "`disasterDistricts` returns at the view's effective key (V01 §3.16), at the village rungs its units' land, "
              "the plots\n"
              "`villageUnitPlots` gives each (V07 §5.6 (3)). So the frame and Find's halo are one set of shapes, and a "
              "unit the key\n"
              "withholds is neither framed nor listed.",
              "its card's **Show** frame — is the union of the Ground shapes of its units' `FindArea`s at the view's "
              "drawn week: the\n"
              "districts `disasterDistricts` returns at the view's effective key over the model the view draws (V01 "
              "§3.16), at the\n"
              "village rungs its units' land, the plots `villageUnitPlots` gives each (V07 §5.6 (3)); at a scrubbed "
              "week whose frame\n"
              "is not the head, a unit's Ground shape is its faces in that frame (V06 §3.15.2), so a district the head "
              "no longer holds\n"
              "is still framed. So the **Show** frame and Find's halo are one set of shapes, and a unit the key "
              "withholds is neither\n"
              "framed nor listed.", 1))

    # ---------------- §6 performance budgets ----------------
    E.append(('6-findAreas-row (VV12-r3-03, sweep)',
              "| the list with its shapes, per commit and key: ≤ 3 ms at CITY, ≤ 8 ms at METROPOLIS (the districts' "
              "faces as committed; the city cut's ≤ 18 quarters and the region groups united by the kernel's union, "
              "memoised) | inside item 120 (j)'s index rebuild, once per commit, within §12.5's overlay budget |",
              "| the list with its shapes, per commit, key and drawn frame: ≤ 3 ms at CITY, ≤ 8 ms at METROPOLIS (the "
              "districts' faces as the drawn model holds them; the city cut's ≤ 18 quarters and the region groups "
              "united by the kernel's union, memoised) | inside item 120 (j)'s index rebuild, once per commit and once "
              "per drawn frame a scrub settles on, within §12.5's overlay budget |", 1))

    # ---------------- §7 tests ----------------
    E.append(('7-T-V1-51c (END VEW-r3-01, sweep)',
              "(c) every ground crossing of a strip through an `open` span meeting the clear-width row and item 244's "
              "clearance rule, within ± 30° of square;",
              "(c) every ground crossing of a strip through an `open` span meeting §4.3's crossing rule — the clear "
              "width (`raisedWays.structure.clearWidthM`), §2.7's *The clearance* and ± `raisedWays.structure.squareDeg` "
              "(30°) of square;", 1))
    E.append(('7-T-V1-59f (VV12-r3-03)',
              "(e) **cost**: `findAreas` and `gapUnits` within V01 §6's Find lines at the METROPOLIS cap. From M5, Find's "
              "milestone (§16's M5 row), on the services and on V09's app harness with V09's Find panel | B-CITY-lite, "
              "fixtures (V04's, V05's), app harness | C | — |",
              "(e) **cost**: `findAreas` and `gapUnits` within V01 §6's Find lines at the METROPOLIS cap; (f) **at a "
              "drawn week** (§11.2's *At a drawn week*; V01 §5.4 (1), (3), (6)): on a B-EDIT CITY document whose epoch "
              "after the drawn week split a district, built the only member of a chip's class in a second district and "
              "closed the only one in a third, at that week (its frame not the head) `findAreas` lists the split "
              "district once, its shapes its faces in the frame, and no district the split made; `gapUnits`' members "
              "equal §11.2's listing at that week and its units only those the frame holds — the second district a gap, "
              "the third no gap, no district the split made a unit —; and a disaster look standing at that week over "
              "the split district is framed by its units' faces in the frame, that district framed whole; at the head "
              "again, the head's areas, members, units and frame. From M5, Find's milestone (§16's M5 row), on the services and on V09's app harness with V09's "
              "Find panel | B-CITY-lite, B-EDIT, fixtures (V04's, V05's), app harness | C | — |", 1))

    # ---------------- §12 CONFIRMED versus PLAUSIBLE (END VEW-r3-01: the cells are V11's) ----------------
    E.append(('12-plausible-list (END VEW-r3-01, sweep)',
              "`.maxLevels`, `.profileNoticeCm`, the series spacing), the raised-way constants (`raised.clearWidthM`,\n"
              "`.squareDeg`), `landmark.maxRings`,",
              "`.maxLevels`, `.profileNoticeCm`, the series spacing), `landmark.maxRings`,", 1))
    return E
