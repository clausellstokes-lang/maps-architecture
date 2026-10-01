# V04 repair r3 — every edit. Each (issue ids, old, new, count); old must occur exactly `count` times in the text as it
# stands when the edit runs (edits run in order).
EDITS = []


def S(ids, old, new, count=1):
    EDITS.append((ids, old, new, count))


# ---- §1.2: item 122 (d)'s look, read below ground through V03 §5.6 (4) (VV34-r2-01)
S('VV34-r2-01 §1.2 hook row',
  "| V04 §5.6 (the kinds below ground, the level each element reads, the drawing in the underground view and the per-band exports); T-V4-82 |\n",
  "| V04 §5.6 (the kinds below ground, the level each element reads, the drawing in the underground view and the per-band exports); T-V4-82 |\n"
  "| item 122 (d)'s disaster look over a building: §2.7's `ConditionOverlay` and its reader rule, §2.9's `crises`, §7.7's DR44, §10.2's `lookLevel` by severity, read through V03 §5.6 (4)'s drawn level (`PlanDamage.level`) | g item 122 at §2.7, §2.9, §7.7, §10.2; V03 §5.6 (4) | V04 §5.6 (1) (a storey below 0 under a look over its building); UE33; T-V4-82 (i) |\n")

# ---- §1b.1: the read map's rock sides (VKr2-09)
S('VKr2-09 §1b.1 belowKind row',
  "each underground building's footprint sides on its part's rock (§3.7's `bandUnion`)",
  "each underground building's footprint sides on its part's rock (off the bands `corridorUnion` commits and the chambers' floors, §3.7; V04 §5.6 (2))")

# ---- §3.2 N2: the field outfall's D8 path over land only (VEW-r2-04)
S('VEW-r2-04 §3.2 N2 field outfall',
  "took the town's waste; J-V4.7). With none of those either, U-NET makes that bank one **field outfall**: the D8 path of\n"
  "the cell of largest accumulation (ties by address) among its stretch's cells not on water is followed outward to its\n"
  "first cell outside `R` and beyond the outermost enceinte's outer strip; the Outfall there is `{ into: 'field', water:\n"
  "null, at: that cell's centre, snapped }`, the cess field of a dry town, and its outfall run follows that D8 path back to\n"
  "the stretch's cell and joins the cell's nearest graph node by a straight edge that crosses no water face (the bank's next\n"
  "nearest node where it would). A bank whose stretch is empty or lies wholly on water (an island in the river, a quarter\n"
  "between a river and a canal) and that holds no candidate makes none: its plots drain by gutter and pit, its area\n"
  "reported unsewered (F-NET's truncate rung).\n",
  "took the town's waste; J-V4.7). With none of those either, U-NET makes that bank one **field outfall**, its D8 path\n"
  "followed over land only: the stretch's cells not on water are taken in descending accumulation (ties by address), and the\n"
  "first whose D8 path, followed downstream, reaches a cell outside `R` and beyond the outermost enceinte's outer strip\n"
  "without entering a water face gives it — the field outfall is that path's first such cell, and a stretch cell whose path\n"
  "enters a water face first is passed over for the next. The Outfall there is `{ into: 'field', water: null, at: that\n"
  "cell's centre, snapped }`, the cess field of a dry town, and its outfall run follows that D8 path back to the stretch's\n"
  "cell and joins the cell's nearest graph node by a straight edge that crosses no water face (the bank's next nearest node\n"
  "where it would). A bank that holds no candidate makes none where its stretch is empty or lies wholly on water (an island\n"
  "in the river, a quarter between a river and a canal) or where every stretch cell's path enters a water face first (a\n"
  "bank whose ground falls to the river all along it): its plots drain by gutter and pit, its area reported unsewered\n"
  "(F-NET's truncate rung).\n")

# ---- §3.11: the outfall ladder and UC19 cite it (VEW-r2-04)
S('VEW-r2-04 §3.11 outfall ladder',
  "its gutters and pits where its stretch of `R`'s boundary is empty or lies wholly on water (V04 §3.2 N2; F-NET's truncate rung) |",
  "its gutters and pits where its stretch of `R`'s boundary is empty or lies wholly on water, or where every stretch cell's D8 path enters a water face before it reaches beyond the outermost enceinte's outer strip (V04 §3.2 N2; F-NET's truncate rung) |")

S('VEW-r2-04 UC19',
  "a bank with none takes its own moat candidates, then its own field outfall, and a bank with no dry stretch of `R`'s boundary drains by gutter and pit, its area reported unsewered — never a crossing;",
  "a bank with none takes its own moat candidates, then its own field outfall, its D8 path and outfall run over land only (V04 §3.2 N2), and a bank with no dry stretch of `R`'s boundary, or none whose path reaches beyond the outermost enceinte's outer strip without entering a water face, drains by gutter and pit, its area reported unsewered — never a crossing;")

# ---- §3.11 UE33: the look below ground (VV34-r2-01); the per-element peak (V06 r3 hand-off (a))
S('VV34-r2-01 UE33 look',
  "E7: every toggle and preset alike, the parity presets included (a look); the layer hidden draws none of the underground view's part, a plan's storey below 0 still drawn; E8:",
  "E7: every toggle and preset alike, the parity presets included (a look); the layer hidden draws none of the underground view's part, a plan's storey below 0 still drawn; Show crises on and off under a disaster's look (item 122 (d)): a church in a ruined district draws its crypt at the higher of its own level and the look's while the look stands over the church (the condition's weeks, until a Works begun on it hands it over, V06 §3.22 (3)) and at its own level outside them, no patch left, its join kept, and an underground building, in no look's unit, at its own level (V04 §5.6 (1)); E8:")

S('VV34-r2-02 UC21',
  "a damaged stair core or access head below 0 draws as rubble over steps still climbable;",
  "a damaged stair core below 0, with any access head on it, draws as rubble over steps still climbable;")

# ---- §5.1: the weather effects over the underground view (END of VAL-R2-01, rendering)
S('END VAL-R2-01 §5.1',
  "The adjacent bands' traces are §8.4's. The **band ladder** in the layer panel lists every non-empty band as its depth range\n",
  "The adjacent bands' traces are §8.4's. While the underground layer is drawn (`cutaway`, `overlay` or `solo`) the weather\n"
  "effects draw nothing over the view (§8.8). The **band ladder** in the layer panel lists every non-empty band as its depth range\n")

# ---- §5.6 lead: the one comparison (END of R3-04)
S('END R3-04 §5.6 lead',
  "Item 123's damage layer — one plan, never redrawn; each plan element shown damaged when its building's decay level\n"
  "reaches the element's keyed threshold, the one comparison every reader makes (§2.6 step 7; §6.3's `plan.damage`;\n"
  "V06 §3.23's `decayLevel`) — reaches below ground by the rules below.",
  "Item 123's damage layer — one plan, never redrawn; each plan element shown damaged while the decay level is above 0 and\n"
  "at least the element's keyed threshold (§6.3 *Plan damage*'s comparison; §2.6 step 7; the threshold §6.3's\n"
  "`plan.damage`, the level V06 §3.23's `decayLevel`) — reaches below ground by the rules below; an element so damaged is\n"
  "**past its threshold** in this volume.")

# ---- §5.6 (1): the look over a storey below 0 (VV34-r2-01)
S('VV34-r2-01 §5.6 (1)',
  "   collapses; its restoration is V06 §3.23 (3)'s, as for every building. No level reads a void's closure state or the\n"
  "   excavation reading.\n",
  "   collapses; its restoration is V06 §3.23 (3)'s, as for every building. Under a disaster's look over its building\n"
  "   (V03 §5.6 (4); item 122 (d)), a storey below 0 draws at its building's drawn level — `PlanDamage.level`, the higher of\n"
  "   its own level and the look's `lookLevel` by severity — its kinds' thresholds unchanged, the look leaving no patch; the\n"
  "   per-storey scene's walls, portals and lights stay at the own level, the look in its image only (V03 §5.3;\n"
  "   V03 §5.6 (2) (d)). An underground building lies in no look's unit — V01's `disasterDistricts` returns ground part 0's\n"
  "   districts, at the village rungs V07's ends (V01 §3.16 (1)) — so it reads its own level only. No level reads a void's\n"
  "   closure state or the excavation reading.\n")

# ---- §5.6 (2): the rock-side test (VKr2-09); the vault keys (VV34-r2-03); the access head (VV34-r2-02)
S('VKr2-09 §5.6 (2) cellarWall',
  "an underground building's wall run on a footprint side that lies on its part's rock (outside the part's `bandUnion`, §3.7) |",
  "an underground building's wall run on a footprint side that lies on its part's rock — its outside in neither a band `corridorUnion` commits (a tunnel's, a gallery's or a walkway's) nor a chamber's floor (§3.7) |")

S('VV34-r2-03 §5.6 (2) cellarVault id',
  "| `cellarVault` | the ceiling over each room of a storey below 0 outside the crypt and its capped bays | the room's id |",
  "| `cellarVault` | the ceiling over each room of a storey below 0 outside the crypt and its capped bays | its room's address |")

S('VV34-r2-03 §5.6 (2) cryptVault id',
  "| (its room's id, the cell's grid node (i, j)), or its room's id — a key, never a new id |",
  "| (its room's address, (i, j)) — i and j the whole-pitch coordinates, along the step-2 ring's OBB axes, of the cell's lowest-leftmost corner node (its corner of least coordinate on each axis), counted from the grid node at the OBB's centre (V03 §3.7.5's centring); the one `cryptVault` of a crypt whose ring holds no cell centre, its room's address — a key, never a new id |")

S('VV34-r2-02 §5.6 (2) access head',
  "Every other element below ground keeps its V03 kind and range: a partition, an opening, a stair core, an access head, a\n"
  "cellar's furniture, and an underground building's elements other than its rock-side runs. The floor of the lowest\n",
  "Every other element below ground keeps its V03 kind and range: a partition, an opening, a stair core, a cellar's\n"
  "furniture, and an underground building's elements other than its rock-side runs; an access head is no element\n"
  "(V03 §5.6 (1)): its state is its access's. The floor of the lowest\n")

# ---- §5.6 (3): the stair core (VV34-r2-02); the per-element peak (V06 r3 hand-off (a))
S('VV34-r2-02 §5.6 (3) stair core',
  "   for one rule: a stair core whose `levels` include a storey below 0, and an access head on one, draws as rubble over\n"
  "   its steps, a way still climbable — the way down is the access model's (4). The rubble below ground is the `ruin`\n",
  "   for one rule: a stair core whose `levels` include a storey below 0, once damaged, draws as rubble over its steps\n"
  "   below 0, a way still climbable, an access head standing on it drawn with it — the way down is the access model's\n"
  "   (4). The rubble below ground is the `ruin`\n")

S('V06-r3 hand-off (a) §5.6 (3) peak',
  "   its threshold above the level and at or below `decayPeak` (V06 §3.23 (3)) — is drawn in item 114's patch material\n",
  "   its threshold above the level and at or below its own `decayPeak`, the highest level since it entered the plan\n"
  "   (V06 §3.23 (3); V03 §5.6 (2) (b)) — is drawn in item 114's patch material\n")

# ---- §5.6 (6): the landing (VV34-r2-06)
S('VV34-r2-06 §5.6 (6)',
  "6. **Landing, budget, edges, bar.** It lands at U5 (V04 §8): the underground view's footprints and the per-band exports\n"
  "   there, a plan's storeys below 0 once V03's item-123 step draws the plan's damage (V03 §8), and every level read from\n"
  "   the existence state at V11's default age until V06's level lands (V06 §3.23 (4)). A building never decayed draws\n"
  "   byte-identically to its build without the layer (`item123.damage`). Its budget is V04 §6's *Damage below ground*,\n",
  "6. **Landing, budget, edges, bar.** It lands at the later of U5 (V04 §8) and V03's P4, the step that draws a decayed or\n"
  "   ruined plan and with which §2.6 step 7, §6.3's `plan.damage` and §8.6 land (§16's milestone rows): the underground\n"
  "   view's footprints and the per-band exports with it, a plan's storeys below 0 with V03's drawing of the plan's damage\n"
  "   (V03 §8), the look over a storey below 0 with V03 §5.6 (4)'s, and every level read from the existence state at V11's\n"
  "   default age until V06's level lands (V06 §3.23 (4)); before it nothing of this section is drawn. A building never\n"
  "   decayed draws byte-identically to its build without the layer (`item123.damage`). Its budget is V04 §6's *Damage\n"
  "   below ground*,\n")

# ---- §7: T-V4-2 and T-V4-80 (j) (VEW-r2-04)
S('VEW-r2-04 T-V4-2',
  "a moat or field outfall only where none was admitted on its bank;",
  "a moat or field outfall only where none was admitted on its bank, every field outfall on land beyond the outermost enceinte's outer strip, its D8 path and outfall run over no water face;")

S('VEW-r2-04 T-V4-80 (j)',
  "(j) on river-town fixtures whose kept outfalls lie on one bank (a town astride a river, a walled core in a wet moat on level and on sloping ground, an island quarter), 0 sewer edges, knots, gratings, drain runs or passages over a water face, each bank's plots connected only to runs on their bank, a bank with no admitted outfall draining to its moat — the mouth `freeboardCm` above the moat's derived level (§4.2 S3 (10)), never above its bank —, to its field outfall or, with a stretch empty or wholly on water, by gutter and pit reported unsewered,",
  "(j) on river-town fixtures whose kept outfalls lie on one bank (a town astride a river, a walled core in a wet moat on level and on sloping ground, an island quarter, a river town whose candidates on one bank all lie upstream of a mill intake, `moat: 'none'`), 0 sewer edges, knots, gratings, drain runs, passages or outfall-run edges over a water face, each bank's plots connected only to runs on their bank, a bank with no admitted outfall draining to its moat — the mouth `freeboardCm` above the moat's derived level (§4.2 S3 (10)), never above its bank —, to its field outfall — on land beyond the outermost enceinte's outer strip, its D8 path and outfall run entering no water face — or, with a stretch empty or wholly on water or every stretch cell's path entering the river first, by gutter and pit reported unsewered,")

# ---- §7: T-V4-82 (VV34-r2-01, -04, -05; V06 r3 hand-off (a))
S('VV34-r2-01 T-V4-82 head',
  "| T-V4-82 | damage below ground (g item 123 (b), (c), (e), (f); takes T123-1's, T123-2's and T123-6's clauses below ground) |",
  "| T-V4-82 | damage below ground (g item 123 (b), (c), (e), (f), and g item 122 (d)'s look below ground; takes T123-1's, T123-2's and T123-6's clauses below ground) |")

S('VV34-r2-04 T-V4-82 (b)',
  "each element damaged exactly when the level ≥ its threshold,",
  "each element damaged exactly while the level is above 0 and at least its threshold (§6.3 *Plan damage*'s comparison),")

S('V06-r3 hand-off (a) T-V4-82 (f)',
  "each element between the level and `decayPeak` drawn in patch material;",
  "each element between the level and its own `decayPeak` (since it entered the plan, V06 §3.23 (3)) drawn in patch material;")

S('VV34-r2-05 T-V4-82 (g)',
  "draw and export byte-identically to the build without the layer (`item123.damage`, V12's pin);",
  "draw and export byte-identically to the build without the layer — the `item123.damage` registration of the underground's bands and per-band exports on V12 §3.7.8's engine (V12 §2.13), written by the U5 seat;")

S('VV34-r2-01 T-V4-82 (i)',
  "re-read the same drawing, within V04 §6's *Damage below ground* | PR (fixtures), nightly |",
  "re-read the same drawing, within V04 §6's *Damage below ground*; (i) the look (g item 122 (d); V03 §5.6 (4)): on a fixture calamity with its linked `reconstruction` condition whose disaster look ruins the district of two churches with crypts — one never decayed, one whose own level lies above the look's at severity 0 — at severities 0, ½ and 1: in the condition's weeks each crypt's elements draw at its church's drawn level (`PlanDamage.level`, the higher of its own level and the look's `lookLevel` by severity) by the same thresholds, and at its own level with Show crises off, at a key that withholds the condition, in the weeks outside the condition's and from the week a Works begun on the church hands it over (V06 §3.22 (3)'s `crisisLookYields`; this clause once V06's E2 has landed); no element drawn repaired as the look leaves; each crypt join, every access and link record and every digest byte-identical with the look and without; each crypt storey's per-storey scene walls, portals and lights at the own level, the look in its image only; an underground building under the ruined district at its own level throughout | PR (fixtures), nightly |")

# ---- §8: U5's landing (VV34-r2-06)
S('VV34-r2-06 §8 U5 content',
  "**the damage below ground** (item 123: `belowKind`, the underground view's damaged footprints, the per-band exports; a plan's storeys below 0 drawn with V03's item-123 step; 0.25 pw; J-V4.130)",
  "**the damage below ground** at the later of U5 and V03's P4 (item 123: `belowKind`, the underground view's damaged footprints, the per-band exports, the look over a storey below 0; a plan's storeys below 0 drawn with V03's P4; 0.25 pw; J-V4.130; V04 §5.6 (6))")

S('VV34-r2-06 §8 U5 exit',
  "T-V4-80 (g)–(i) and (k), T-V4-81, T-V4-82; the epoch clauses",
  "T-V4-80 (g)–(i) and (k), T-V4-81, T-V4-82 (at the later of U5 and V03's P4); the epoch clauses")

# ---- §9: J-V4.114's price (VAP-r2-13); J-V4.129 (VEW-r2-04); J-V4.130 (VV34-r2-01, -06)
S('VAP-r2-13 J-V4.114 total',
  "| J-V4.114 | chose the underground's price at 28.25–39.25 pw (V04 §8's table)",
  "| J-V4.114 | chose the underground's price at 28.5–39.5 pw (V04 §8's table)")

S('VAP-r2-13 J-V4.114 U5',
  "the epoch contracts (0.25–0.5 pw in U5, U5 at 3–4.25 pw);",
  "the epoch contracts (0.25–0.5 pw in U5, U5 at 3.25–4.5 pw);")

S('VAP-r2-13 J-V4.114 item 123',
  "and g item 113's parts absorbed in U3, U3b and U5 (J-V4.122) — accepted by the owner's delegation (owner question 2, J122) |",
  "and g item 113's parts absorbed in U3, U3b and U5 (J-V4.122), and g item 123's damage below ground (0.25 pw in U5; J-V4.130) — accepted by the owner's delegation (owner question 2, J122) |")

S('VEW-r2-04 J-V4.129',
  "N2's moat and field fallbacks taken per bank, the outfall cap keeping each bank's largest root and a bank with no dry boundary draining by gutter and pit, reported,",
  "N2's moat and field fallbacks taken per bank, a field outfall's D8 path followed over land only, the outfall cap keeping each bank's largest root and a bank with no dry boundary, or none whose field path reaches beyond the outer strip over land, draining by gutter and pit, reported,")

S('VV34-r2-01 J-V4.130 look',
  "the lowest storey's floor no element; a storey below 0 reading its building's level and an underground building its own;",
  "the lowest storey's floor no element; a storey below 0 reading its building's level — under a disaster's look over the building, the whole building's drawn level, the higher of its own and the look's (V03 §5.6 (4)) — and an underground building, in no look's unit, its own;")

S('VV34-r2-06 J-V4.130 landing',
  "so a scrubbed week never opens or closes a way; 0.25 pw in U5 |",
  "so a scrubbed week never opens or closes a way; 0.25 pw in U5, landing at the later of U5 and V03's P4, whose base parts it reads (V04 §5.6 (6)) |")

# ---- §12: file g read whole, no upper number (VV34-r2-07); item 122 (d)'s reading named (VV34-r2-01)
S('VV34-r2-07 §12',
  "file g's items 102–126 are read whole in\n"
  "  `docs/AMENDMENTS-2026-09-28g.md`, the underground parts of items 113, 119, 120 and 123 written here; item 126 holds\n"
  "  none for this volume.",
  "file g's items are read whole in\n"
  "  `docs/AMENDMENTS-2026-09-28g.md`, the underground parts of items 113, 119, 120 and 123 written here, and item 122 (d)'s\n"
  "  look read below ground (V04 §5.6 (1)); item 126 holds none for this volume.")

# ---- line joins after the two rewrapped edits above (form only)
S('form §5.6 (6) join',
  "   below ground*,\n   its edges UE33 and UC21 (V04 §3.11), its bar T-V4-82.",
  "   below ground*, its edges UE33 and UC21 (V04 §3.11), its bar T-V4-82.")

S('form §5.6 (3) join',
  "   (4). The rubble below ground is the `ruin`\n   program's stipple in the `rock` role (V04 §5.2), one stipple for every collapse below ground; a repaired element —\n",
  "   (4). The rubble below ground is the `ruin` program's stipple in the `rock` role (V04 §5.2), one stipple for every\n   collapse below ground; a repaired element —\n")

S('form §5.6 (3) rewrap',
  "   collapse below ground; a repaired element —\n"
  "   its threshold above the level and at or below its own `decayPeak`, the highest level since it entered the plan\n"
  "   (V06 §3.23 (3); V03 §5.6 (2) (b)) — is drawn in item 114's patch material\n"
  "   (§8.6). On a building's plan",
  "   collapse below ground; a repaired element — its threshold above the level and at or below its own `decayPeak`, the\n"
  "   highest level since it entered the plan (V06 §3.23 (3); V03 §5.6 (2) (b)) — is drawn in item 114's patch material\n"
  "   (§8.6). On a building's plan")

S('form §5.1 rewrap',
  "effects draw nothing over the view (§8.8). The **band ladder** in the layer panel lists every non-empty band as its depth range\n"
  "(−2.5 to −5 m …)",
  "effects draw nothing over the view (§8.8). The **band ladder** in the layer panel lists every non-empty band as its\n"
  "depth range (−2.5 to −5 m …)")
