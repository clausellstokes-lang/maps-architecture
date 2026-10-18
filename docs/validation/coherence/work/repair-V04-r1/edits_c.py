# V04 repair r1 — edits, part c: V04 §4 (editing), §5 (rendering, labels, exports), §6 (budgets). Each (ids, old, new, count).
EDITS = []
def S(ids, old, new, count=1):
    EDITS.append((ids, old, new, count))

# ---- §4.1: a drawn sewer run never crosses water (VEW-01)
S('VEW-01',
"| `drawTunnel` (sewer, no `system`) | two points; the kind optional | a route: where both points lie within `outfall.linkM` of ways, U-NET's tree search between the nearest graph nodes (N3's costs); else the straight segment; an end within 2 m of a run joins it (a junction);",
"| `drawTunnel` (sewer, no `system`) | two points; the kind optional | a route: where both points lie within `outfall.linkM` of ways, U-NET's tree search between the nearest graph nodes (N3's costs); else the straight segment; a route or segment that would cross a water face is bent to end at the bank on the first point's side, the bend named (a sewer never crosses water, V04 §3.2 N3; item 101 R2, J-VI.4); an end within 2 m of a run joins it (a junction);")

# ---- §4.5: the excavation reading by the catalogue's keys (VV34-03)
S('VV34-03',
"  surface access through passable joins (V04 §3.5.7 (g) (1)), or none — and the state `info.under.excavation.<state>`\n"
"  (`accessible`, `unexcavated`, `lost`; a `lost` cluster \"once known; every way in has closed\", with the closing that ended\n"
"  its last path where the commit record names it); the `ruin.node` line",
"  surface access through passable joins (V04 §3.5.7 (g) (1)), or none — and its state by the catalogue's keys: `accessible`\n"
"  as V10 §3.9a's chain row over `under/wayIn`, `unexcavated` as `info.under.sealed`, `lost` as `info.under.lost` with the\n"
"  closing that ended its last path where the commit record dates it, else `info.under.lostUndated` (their words V09\n"
"  §4.17.1's); the `ruin.node` line")

# ---- §5.1: Find on Below (G120-V04)
S('G120-V04',
"symbols and opening places, which read this volume's `AccessPoint` records (V01 §3.8.8, V01 §5.1.2, V01 §5.2.2); a span's infill\n"
"wall and door are the base's drawing.\n",
"symbols and opening places, which read this volume's `AccessPoint` records (V01 §3.8.8, V01 §5.1.2, V01 §5.2.2); a span's infill\n"
"wall and door are the base's drawing.\n"
"\n"
"**Find on Below (g item 120 (f), (h); J-V4.127).** Find — §2.9's per-viewer view key `find`, V09's panel and `live.find`\n"
"overlay provider, §8.2's veil, halo, outline, pin and count-bubble rows, §11.2's gazetteer match listing at the view's\n"
"effective key — reads this volume for what lies Below through one derived reading, `underFindPlaces(doc, ids)`\n"
"(`@plat/under`, never stored): for each matched id on an underground part — an underground building and its use (a sewer\n"
"dwelling, an F4, F6 or C4 building, an undercity institution), an undercity or sewer-front district, a named system or\n"
"catacomb complex, a named run, the core's plaza, a named chamber — it gives the part, the depth bands its open elements\n"
"occupy (§8.4's `depthBandCm`), its glow shape in each of those bands (a footprint, a chamber's wall, a run's or gallery's\n"
"band, a district's outline on its part) and its plan anchor (a building's footprint pole of inaccessibility, a district's\n"
"label anchor, else the point V04 §5.4 places its label at). The matches are the listing's; this volume adds no match\n"
"rule. With band b drawn:\n"
"1. **The band shown glows.** A match with an element in band b glows on those elements over the veil, which lies over the\n"
"   band's rock, voids and the cut-away's ghost alike, the plan lines (V04 §5.3) under it.\n"
"2. **The other bands are ghost pins.** A match Below with no element in band b is a faint ghost pin at its plan anchor\n"
"   carrying its shallowest band's depth range as the band ladder writes it; the ladder marks each band holding matches\n"
"   with their count; **Go there** sets `depthBand` to the match's shallowest band (a view key, never an edit). A match on\n"
"   Ground or Sky is a ghost pin at its plan anchor over the ghost (item 120 (f)).\n"
"3. **From Ground and Sky** every match Below is a ghost pin at its plan anchor, counted by V09's panel (\"N more Below\").\n"
"4. **Areas.** An undercity or sewer-front district chip lifts that district's blocks, walkways and plaza in band b and\n"
"   glows along its outline there; a ground district, neighbourhood or quarter chip lifts every element of band b whose\n"
"   plan band lies inside its outline, glowing along that outline traced in the band — the area reaching down, as\n"
"   `districtsAbove` (V01 §3.16) reads it upward. Show gaps' units Below are the undercity districts, each outlined dashed\n"
"   \"none here\" in the band holding its core.\n"
"5. **What the viewer may know.** §11.2's admission holds: an element of an `unexcavated` cluster is absent below `secret`\n"
"   — never suggested, counted, drawn or pinned; at `secret` it glows only while its cluster is drawn (`showUnexcavated`\n"
"   on), a ghost pin otherwise; a `lost` cluster's matches glow over its sealed style for every key that admits them; a\n"
"   secret access, link or `dug` gallery and a concealed use's true kind follow the same admission (T-V4-21).\n"
"6. **When it changes.** The underground's records join Find's index at the commit that writes them — each tail stage's,\n"
"   so chips set before the tail ends gain each Below match as its stage commits, each underground edit's and each\n"
"   underground epoch participant's — and the chips re-evaluate then (V09).\n"
"\n"
"Find writes no record of this volume, never the excavation reading or `ExcavationRecord`, and no digest; with no chip on,\n"
"nothing of it is drawn.\n")

# ---- §5.5: Find in the exports (G120-V04)
S('G120-V04',
"is left out and listed in the export's log; the layer's visibility never changes a per-band export.\n",
"is left out and listed in the export's log; the layer's visibility never changes a per-band export. **Find** (item 120\n"
"(i)): a per-band PNG or SVG export draws Find as shown in its band, the chips in the legend (§11.1's picture-export rule);\n"
"a VTT scene carries it only when asked (§11.1's battle-map rule); GeoJSON, glTF, CityJSON and CSV never carry it (a\n"
"view, never the model).\n")

# ---- §6: the comfort level (VV34-02) and Find's budget (G120-V04)
S('VV34-02 G120-V04',
"**Exports.** A VTT band scene ≤ 1.5 s at CITY; the underground glTF ≤ 2 s; within §12.7's export laws.\n",
"**Exports.** A VTT band scene ≤ 1.5 s at CITY; the underground glTF ≤ 2 s; within §12.7's export laws.\n"
"\n"
"**Find on Below** (g item 120 (j)): `underFindPlaces` ≤ 2 ms p95 for 500 matches at METROPOLIS (one static-index read\n"
"per match, the bands from the element records), inside §12.5's overlay budget — the glow drawn within about 100 ms of the\n"
"click; a band step with chips on re-composes the overlay within the band switch's own ≤ 150 ms and re-rasters no base\n"
"tile for Find.\n"
"\n"
"**The comfort level (g item 119; J130; J-V4.126).** The rows above and §12's underground rows stay the **targets** — as\n"
"fast as possible (§12.1). Every one-time wait this layer adds to completes within §12.1's comfort level of ten seconds of\n"
"total time, from the click to the complete result on §12.1's reference machine, at every rung up to the metropolis cap\n"
"and in both presets: a generate, a regenerate, a Re-derive (the family, preset, ruins and TOWN-toggle adjusts', the\n"
"network stage's, the stage-2 switch's) and an open from SettlementForge that generates, each with its tail; a\n"
"migration's `upgrade` tail (V04 §4.6); and every per-band export. The tail's own targets (≤ 343 ms p95 at METROPOLIS,\n"
"navigable) keep it far inside. The four epoch participants and `BuriedFormer.lay` add to V06's advance-time and\n"
"history-replay waits, which take the comfort level as V06 §6 reads it for them (item 119's V06 part). A wait past one\n"
"second shows §12.1's progress: each tail stage is a `StageDecl`, so the generation worker posts §11.2's `Progress` as it\n"
"starts and V09 names it, the map drawn under the strip and, on a shown layer, the notice \"building the underground…\"\n"
"(V04 §5.1). No row here runs slower than its target; one may only for a recorded measured gain — a V11\n"
"`perf.qualitySpend` row (V11 §3.25.8) whose step stays inside the comfort level (R12-33). The interactive rows are\n"
"unchanged (§12.1; R12-34): the band step by PageUp and PageDown and the band switch's ≤ 150 ms, the `underView` switch and\n"
"the cut-away, every underground tool's live preview — the access tool's included —, hover and click-to-inspect, undo and\n"
"redo. T-V4-32 (b) bars it.\n")
