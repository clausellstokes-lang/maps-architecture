# V04 repair r2 — edits, part a: V04 §1.2, §1.3, §1b.1, §1b.2, §1b.4, §1b.5, §2.6.
# Each (issue ids, old, new, count); old must occur exactly `count` times in the text as it stands.
EDITS = []


def S(ids, old, new, count=1):
    EDITS.append((ids, old, new, count))


# ---- §1.2: the hook bars this volume takes (R2-35, R2-08); item 123's base side (G123-V04)
S('R2-35 G123-V04 §1.2 hook tests',
  "and the owner items' bars T109-1 – T109-6, T113-4 and T113-5 | §13.2 (the underground layer's take-over row) |",
  "and the owner items' bars T109-1 – T109-6, T113-4, T113-5, T120-4, T120-5, T123-1, T123-2 and T123-6 | §13.2 (the underground layer's take-over row) |")

S('G123-V04 §1.2 item 123 row',
  "| g item 120 at §2.9, §8.2, §11.1, §11.2, §12.5; V09 | V04 §5.1 *Find on Below* (`underFindPlaces`); V04 §5.5; T-V4-81 |\n",
  "| g item 120 at §2.9, §8.2, §11.1, §11.2, §12.5; V09 | V04 §5.1 *Find on Below* (`underFindPlaces`); V04 §5.5; T-V4-81 |\n"
  "| item 123's base side: one plan, never redrawn, under a damage layer (§2.6 step 7); one keyed threshold per plan element, §6.3's concern `plan.damage` keyed by the building's lineage and the element's id, no id minted; the damaged plan's drawing and the battle maps' line of sight; V03's damage layer and its drawing, V06's `decayLevel` and `decayPeak`, V11's ranges by element kind | g item 123 at §2.6, §6.3, §8.6, §11.1, §13.2; V03; V06 §3.23; V11 | V04 §5.6 (the kinds below ground, the level each element reads, the drawing in the underground view and the per-band exports); T-V4-82 |\n")

S('G123-V04 §1.2 V03 row',
  "| `Basement.crypt`, `Entrance.faces` `'tunnel'`, `AccessHostRow` | V03 §2.1, V03 §2.4, V03 §3.7.2 (6), V03 §3.7.4 (items 238, 239) | the crypt join (V04 §3.5.7 (c)), the burial-face entrance (V04 §3.5.1 (9)), the underground buildings' entrances (F4, F6, C4) |",
  "| `Basement.crypt`, `Entrance.faces` `'tunnel'`, `AccessHostRow`; the plan's parts and their ids, the basement storeys, the crypt's plan and column grid | V03 §2.1, V03 §2.2, V03 §2.4, V03 §3.7.2 (6), V03 §3.7.4, V03 §3.7.5 (items 238, 239) | the crypt join (V04 §3.5.7 (c)), the burial-face entrance (V04 §3.5.1 (9)), the underground buildings' entrances (F4, F6, C4); the kinds below ground (V04 §5.6) |")

# ---- §1.3: R2-12's name; item 126 (G126-V04, R2-41); item 123's scope line (G123-V04)
S('R2-12 §1.3',
  "primary and calamity deaths, `AccessPass.run`\n  over an `EpochScope`,",
  "primary and calamity deaths,\n  `AccessPassStrategy.run` (II.7.6) over an `EpochScope`,")

S('G126-V04 §1.3 Find',
  "* **Find** (g item 120) — its panel, type-ahead, chip grid, results list, phone sheet and `live.find` provider are V09's;",
  "* **Find** (g item 120) — its panel, type-ahead, chip grid, results list and `live.find` provider are V09's;")

S('G123-V04 §1.3 damage',
  "  states only where a match lies Below and how it reads across the depth bands (V04 §5.1 *Find on Below*).\n",
  "  states only where a match lies Below and how it reads across the depth bands (V04 §5.1 *Find on Below*).\n"
  "* **The damage layer** (g item 123) — the plan it lies over, its drawing and its panel lines are V03's, the decay level\n"
  "  V06's (V06 §3.23), the ranges by element kind V11's and the threshold draw §6.3's. This volume states the kinds below\n"
  "  ground, the level each element below ground reads, the drawing of damage in the underground view and the per-band\n"
  "  exports, and that the damage never touches the access model (V04 §5.6).\n")

# ---- §1b.1: the kinds below ground (G123-V04); the sheets' rows (VAL-R1-06)
S('VAL-R1-06 §1b.1 roles row',
  "| `LayerSpec.underView` and the roles `rock`, `void` | the style sheet and `setLayer` | S14's underground build, the tile worker | §8.2, §8.4 (item 413) |",
  "| `LayerSpec.underView` and the roles `rock`, `void` | every shipped sheet's rows for the `under.*` semantics (V04 §5.2) and `setLayer` | S14's underground build, the tile worker, §8.2's slot resolution | §8.2, §8.4 (item 413) |")

S('G123-V04 §1b.1 belowKind row',
  "| `underFindPlaces(doc, ids)` (derived, never stored; V04 §5.1 *Find on Below*): each matched underground entity's part, depth bands, glow shapes and plan anchor | the underground records and their bands (§8.4), read at each commit that rebuilds Find's index | V09's `live.find` (the glow in the band shown, the ghost pins, **Go there**'s band, the area lift) and its panel's Below count, drawn by §8.2's Find rows; T-V4-81 | §2.9's view key `find` (g item 120) |\n",
  "| `underFindPlaces(doc, ids)` (derived, never stored; V04 §5.1 *Find on Below*): each matched underground entity's part, depth bands, glow shapes and plan anchor | the underground records and their bands (§8.4), read at each commit that rebuilds Find's index | V09's `live.find` (the glow in the band shown, the ghost pins, **Go there**'s band, the area lift) and its panel's Below count, drawn by §8.2's Find rows; T-V4-81 | §2.9's view key `find` (g item 120) |\n"
  "| the kinds below ground `cellarWall`, `cellarVault`, `cryptWall`, `cryptVault`, `cryptTomb`, given by `belowKind(building, element)` (derived, never stored; V04 §5.6) | V03's plan parts of each storey below 0 (V03 §2.2, V03 §3.7), the crypt's column grid (V03 §3.7.5), each underground building's footprint sides on its part's rock (§3.7's `bandUnion`) | §6.3's `plan.damage` draw (the kind names V11's range row), V03's drawing of a storey below 0, S14's underground footprints (V04 §5.2 (5)), the per-band VTT's line of sight, T-V4-82 | g item 123 (c); V04 §5.6 |\n")

# ---- §1b.2: R2-12's name and parameters; belowKind's implementer and callers (G123-V04)
S('R2-12 §1b.2 row',
  "| `AccessPass.run(doc, scope?: EpochScope)` with `excavation(doc, cluster)` | U-ACCESS (`@plat/under/access`) |",
  "| `AccessPassStrategy.run(doc, rules, ctx, k, scope?: EpochScope)` (II.7.6) with `excavation(doc, cluster)` | U-ACCESS (`@plat/under/access`) |")

S('G123-V04 §1b.2 belowKind row',
  "| `underFindPlaces(doc, ids)` (V04 §5.1 *Find on Below*) | `@plat/under` | V09's `live.find` overlay provider (g item 120), for the ids §11.2's gazetteer match listing gives on underground parts, after each commit that rebuilds Find's index |\n",
  "| `underFindPlaces(doc, ids)` (V04 §5.1 *Find on Below*) | `@plat/under` | V09's `live.find` overlay provider (g item 120), for the ids §11.2's gazetteer match listing gives on underground parts, after each commit that rebuilds Find's index |\n"
  "| `belowKind(building, element)` (V04 §5.6) | `@plat/under` | §6.3's `plan.damage` draw for an element below ground (its kind's range row, V11's); V03's plan draw of a storey below 0; S14's underground builder (the damaged footprints); the per-band VTT export |\n")

# ---- §1b.4: the underground building's damage (G123-V04)
S('G123-V04 §1b.4 building row',
  "| underground `Block`, `Plot`, `Building` | as ground, through the cut-away; `vault` hatch | cells unnamed; institutions by the knowledge filter | as ground at depth | part chunk |",
  "| underground `Block`, `Plot`, `Building` | as ground, through the cut-away; `vault` hatch; a building's damage (g item 123) by V04 §5.6 | cells unnamed; institutions by the knowledge filter | as ground at depth; the per-band VTT's line of sight following its damage (V04 §5.6) | part chunk |")

# ---- §1b.5: the mining fact read through `Terrain.mining` (R2-28 (a))
S('R2-28 §1b.5 mining row',
  "| DR19, DR31 | the cavern's mining test (V04 §3.5.2) |",
  "| DR19, DR31 | `Terrain.mining` (§4.2 S1 (10)), which the cavern's boost reads (V04 §3.5.2) |")

# ---- §2.6: R2-12's name; the damage drawn below ground (G123-V04)
S('R2-12 §2.6 village working row',
  "| U-ACCESS (a) at T2b at a village rung; `AccessPass.run` over `scope.workings` at an epoch |",
  "| U-ACCESS (a) at T2b at a village rung; `AccessPassStrategy.run` over `scope.workings` at an epoch |")

S('G123-V04 §2.6 damage row',
  "| the creation prefix is never an undo target (§7.4); a later edit's undo restores its replaced scope | absent in an older document: none (the replay runs only at generation) |\n",
  "| the creation prefix is never an undo target (§7.4); a later edit's undo restores its replaced scope | absent in an older document: none (the replay runs only at generation) |\n"
  "| the damage drawn below ground (`belowKind` and the level each element reads; V04 §5.6) | derived on read from V03's plan parts, the footprint's rock sides and V06's `decayLevel` and `decayPeak` at the drawn week | V03's plan draw of a storey below 0, S14's underground footprints, the per-band picture and VTT exports | never: a look — the plan, its ids and every digest unchanged | recomputed with the plan, the footprint and the level's events | follows the records and the lifecycle events it reads | — (nothing stored; an older document reads it at once) |\n")
