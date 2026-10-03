# V04 repair r1 — edits, part b: V04 §3 (generation). Each (issue ids, old, new, count).
EDITS = []
def S(ids, old, new, count=1):
    EDITS.append((ids, old, new, count))

# ---- the underground opening row renamed everywhere left (VAL-08): §3.1's T2b row and standalone line, §3.3 P7,
# §3.5.7 (e), §4.1's placeAccess row
S('VAL-08', "`OpeningRow", "`UnderOpeningRow", 5)

# ---- §3.1 At every rung: the village subset names the charnel vault's catacomb step (VAL-09); the TOWN-without-sewers
# clause read as the stages' own sections state it
S('VAL-09',
"**At every rung** (g item 109 (j) (1)): at THORP, HAMLET and VILLAGE, and at a TOWN whose draw left `Features.sewers`\n"
"false, the tail runs T2 (ruin and cavern only — catacombs, quarries, vaults and the buried town keep TOWN and above — and\n"
"the vaults step for the arch vaults and terminal cistern of a raised way, which follow their way at every rung), T2b, T3's\n"
"F6 only, T5 (L3, L5, L7), T6 and T8, and T7 on show; never T1 or T4 as generators (no new network; the undercity keeps\n"
"II.7.5's rows). The village product shows the layer (V07).",
"**At every rung** (g item 109 (j) (1)): at THORP, HAMLET and VILLAGE the tail runs T2 (ruin and cavern — catacombs,\n"
"quarries, vaults and the buried town keep TOWN and above —, the vaults step for the arch vaults and terminal cistern of a\n"
"raised way, which follow their way at every rung, and the catacomb step for a dossier catacomb record alone, which lays\n"
"its charnel vault (V04 §3.5.1 (10))), T2b, T3's F6 only, T5 (L3, L5, L7), T6 and T8, and T7 on show; never T1 or T4 as\n"
"generators (no new network; the undercity keeps II.7.5's rows). At a TOWN whose draw left `Features.sewers` false the\n"
"tail runs as at any TOWN, save that T1 commits nothing (N0) and T3 runs F6 alone (F0). The village product shows the\n"
"layer (V07).")

# ---- §3.2 N2: the fallbacks per bank (VEW-01)
S('VEW-01',
"With none admitted, `moat` candidates are admitted with the start cost `outfall.moatPenalty × outfall.reachM` (a town\n"
"ditch took the town's waste; J-V4.7). With none of those either, U-NET makes one **field outfall**: the D8 path of the\n"
"hydro cell of largest accumulation on `R`'s boundary is followed outward to its first cell outside `R` and beyond the\n"
"outermost enceinte's outer strip; the Outfall there is `{ into: 'field', water: null, at: that cell's centre, snapped }`,\n"
"the cess field of a dry town. Every admitted candidate is linked to the nearest way junction within `outfall.linkM` by a\n"
"straight `outfallRun` edge; a candidate with none is dropped.",
"These fallbacks are taken **per bank** (N3: the parts of the graph the water divides, never crossed; J-V4.129). On a bank\n"
"with none admitted, its `moat` candidates are admitted with the start cost `outfall.moatPenalty × outfall.reachM` (a town\n"
"ditch took the town's waste; J-V4.7). With none of those either, U-NET makes that bank one **field outfall**: the D8 path\n"
"of the hydro cell of largest accumulation on the bank's stretch of `R`'s boundary is followed outward to its first cell\n"
"outside `R` and beyond the outermost enceinte's outer strip; the Outfall there is `{ into: 'field', water: null, at: that\n"
"cell's centre, snapped }`, the cess field of a dry town. A bank whose stretch of `R`'s boundary lies wholly on water (an\n"
"island in the river, a quarter between a river and a canal) and that holds no candidate makes none: its plots drain by\n"
"gutter and pit, its area reported unsewered (F-NET's truncate rung). Every admitted candidate is linked to the nearest way\n"
"junction on its own bank within `outfall.linkM` by a straight `outfallRun` edge that crosses no water face; a candidate\n"
"with none is dropped.")

# ---- §3.2 N3: no edge over water; banks; the cap keeps each bank's root (VEW-01)
S('VEW-01',
"  vertices, in centimetres); `pier` and `ford` never carry a sewer. The way edges are ground part 0's only (V04 §1.2): a\n"
"  raised spine is never an edge, never split by a culvert crossing and never a junction, and the way beneath it keeps its\n"
"  own edges, so a sewer follows the street under a viaduct, never the viaduct;",
"  vertices, in centimetres); `pier`, `ford`, `bridge` and `aqueduct` ways never carry a sewer (`classCost` ∞). The way\n"
"  edges are ground part 0's only (V04 §1.2): a raised spine is never an edge, never split by a culvert crossing and never a\n"
"  junction, and the way beneath it keeps its own edges, so a sewer follows the street under a viaduct, never the viaduct.\n"
"  **No edge lies over water (J-V4.129):** a spine stretch over a water face of ground part 0's L1 — the span between a\n"
"  `Bridge`'s two deck ends whatever its way's class, a pier, mole or quay platform standing over water — is left out,\n"
"  found by a segment sweep of each spine against those faces: the edge is cut where its spine meets a water face's edge,\n"
"  each land stretch kept as an edge ending at a new node there;")
S('VEW-01',
"  sweep) splits both at a new node; each way node within `culvertLinkM` of a culvert gains a link edge to its nearest\n"
"  culvert node;",
"  sweep) splits both at a new node; each way node within `culvertLinkM` of a culvert gains a link edge to its nearest\n"
"  culvert node, unless that edge would cross a water face;")
S('VEW-01',
"* **drainage edges** (`drainage-lines` only) — the D8 tree on the `hydro` cells of `R` itself, each cell a node draining\n"
"  to its D8 neighbour; no way edge is used.",
"* **drainage edges** (`drainage-lines` only) — the D8 tree on the `hydro` cells of `R` itself, each cell a node draining\n"
"  to its D8 neighbour, a cell in a water face no node; no way edge is used.\n"
"\n"
"**Banks.** With the stretches over water left out, the graph's nodes fall into connected components, each a **bank**\n"
"(`SewerGraph` node `bank`): one for a town on one side of its water, two or more where a river, a canal, a moat or the\n"
"harbour divides `R`. No sewer crosses from one bank to another — that would be a cut-and-cover main under flowing water,\n"
"which the cover rows forbid (`coverMinCm`, `coverMaxCm`: cut-and-cover, never mined): a run reaching the water ends at an\n"
"admitted outfall on its own bank, N2's fallbacks are taken per bank, and a bank they cannot drain keeps its gutters and\n"
"pits, reported. A plot's bank is its frontage way's (N4, N8).")
S('VEW-01',
"area) are dropped and the search re-run once without them; if more than `outfall.maxOutfalls[preset]` remain, the largest\n"
"subtrees' roots are kept and the search re-run once more. A node no root reaches drains by its gutters: its area is\n"
"reported as unsewered.",
"area) are dropped and the search re-run once without them; if more than `outfall.maxOutfalls[preset]` remain, the largest\n"
"subtrees' roots are kept — first each bank's largest, so the cap never leaves a bank that held a root without one (more\n"
"such banks than the cap keep one root each, the excess reported) — and the search re-run once more. A node no root\n"
"reaches drains by its gutters: its area is reported as unsewered.")

# ---- §3.2 N3a: a declared run never lies over water (VEW-01)
S('VEW-01',
"   tunnel, V04 §4.7) enters the `SewerGraph` as a fixed chain of edges: its committed centreline, its kind and profile\n"
"   kept, cost 0 along it, its invert knots fixed.",
"   tunnel, V04 §4.7) enters the `SewerGraph` as a fixed chain of edges: its committed centreline, its kind and profile\n"
"   kept, cost 0 along it, its invert knots fixed. A declared run never lies over water: its dry run bent it at the bank\n"
"   (V04 §4.1).")

# ---- §3.2 N8: connections and drain runs on the plot's own bank (VEW-01)
S('VEW-01',
"* `channel` — connected to the nearest `main` or `culvert` run whose centreline lies within `reachM[preset]` of its\n"
"  frontage midpoint (ties by address; item 548 names the culvert, the trunk of the `mixed` family); else, where its class\n"
"  carries a tag in `drainPriority[preset]` and a selected run's node lies within `drainExtendM` along its frontage way's\n"
"  spine, a **drain run** is added along that spine stretch (kind `drain`, its profile row, its invert laid by N7's rule\n"
"  from its head down to the receiving run's invert at the junction, dropped if its head's crown would exceed",
"* `channel` — connected to the nearest `main` or `culvert` run on its bank whose centreline lies within `reachM[preset]`\n"
"  of its frontage midpoint (ties by address; item 548 names the culvert, the trunk of the `mixed` family); else, where its\n"
"  class carries a tag in `drainPriority[preset]` and a selected run's node lies within `drainExtendM` along its frontage\n"
"  way's spine on its bank (a stretch over water is none, N3), a **drain run** is added along that spine stretch (kind\n"
"  `drain`, its profile row, its invert laid by N7's rule from its head down to the receiving run's invert at the\n"
"  junction, dropped if its head's crown would exceed")
S('VEW-01',
"* `pit` — one uniform on `sewer` keyed by the plot's lineage; connected, to the nearest run within `reachM`, when it falls\n"
"  below the band's `pitShareByBand` (II.7.1); else unconnected, silently (a pit is the norm);",
"* `pit` — one uniform on `sewer` keyed by the plot's lineage; connected, to the nearest run on its bank within `reachM`,\n"
"  when it falls below the band's `pitShareByBand` (II.7.1); else unconnected, silently (a pit is the norm);")

# ---- §3.2 N9: a passage never crosses water (VEW-01)
S('VEW-01',
"straight segment crosses an accepted passage or whose grade exceeds `passage.maxGrade` refused. Each accepted one is a\n"
"`passage` run (profile row `passage`), splitting both mains at its ends (new junctions), its invert linear between theirs.",
"straight segment crosses an accepted passage or a water face, or whose grade exceeds `passage.maxGrade`, refused. Each\n"
"accepted one is a `passage` run (profile row `passage`), splitting both mains at its ends (new junctions), its invert\n"
"linear between theirs.")

# ---- §3.3: the two cells' home (VAL-05)
S('VAL-05',
"   rule). A kind dug from the surface has `pAccess = 1`. A void counts toward P6's capacity and F6's allocation only when\n"
"   `pAccess ≥ accessForecastMin`. `voidDwellingHouseholds` is Σ min(`voidDwellings.maxHouseholds`, capacity) over the\n"
"   counted cavern and ruin voids the undercity forecast does not take, capped at `voidDwellings.share` × the poorest band's\n"
"   households (under the standalone line, the one-district allocation's poorest-band households).",
"   rule). A kind dug from the surface has `pAccess = 1`. A void counts toward P6's capacity and F6's allocation only when\n"
"   `pAccess ≥ accessForecastMin` (II.7.4's `UndergroundRule`, 0.5). `voidDwellingHouseholds` is\n"
"   Σ min(`voidDwellings.maxHouseholds`, capacity) over the counted cavern and ruin voids the undercity forecast does not\n"
"   take, capped at `voidDwellings.share` × the poorest band's households (under the standalone line, the one-district\n"
"   allocation's poorest-band households).")
S('VAL-05',
"S7b (6) and (7) allocate at most `forecastSafety` × each forecast capacity (item 551), so over-forecasts are rare. The\n"
"forecast is advisory and deterministic: its misses are absorbed below (V04 §3.4 F0, V04 §3.6 C1) and the remainder by T8\n"
"(V04 §3.7a), reported, never re-rolled. **Its edges.** It commits nothing, so degenerate input only shrinks it: a zero-length",
"S7b (6) and (7) allocate at most `forecastSafety` (II.7.4's `UndergroundRule`) × each forecast capacity (item 551), so\n"
"over-forecasts are rare. The forecast is advisory and deterministic: its misses are absorbed below (V04 §3.4 F0, V04 §3.6\n"
"C1) and the remainder by T8 (V04 §3.7a), reported, never re-rolled. **Its edges.** It commits nothing, so degenerate\n"
"input only shrinks it: a zero-length")

# ---- §3.5.0: the `dug` row names the charnel vault (VAL-09)
S('VAL-09',
"| `dug` | every rung | U-DIG's closures and U-LINK L5 |",
"| `dug` | every rung | U-DIG's closures and U-LINK L5; below TOWN, a dossier catacomb record's charnel vault (V04 §3.5.1 (10)) |")

# ---- §3.5.1 (4): the `system` refusal reads the catacomb's own part; another system's element is met, never refused (VV34-16)
S('VV34-16',
"(V04 §3.5.0: basements,\n"
"   raised-way piers, retaining-wall footings; `foundation`); it lies in no other system's element of this part at another\n"
"   depth band (`system`); and, with `A` the admitted set, the level floor holds:",
"(V04 §3.5.0: basements,\n"
"   raised-way piers, retaining-wall footings; `foundation`); it lies in no element of another complex of this part at\n"
"   another depth band (`system`: a part holds no crossing, II.7.6); and, with `A` the admitted set, the level floor holds:")
S('VV34-16',
"   Each rejection's reason is kept in `blockedBy`. A node inside a ruin `tomb` chamber",
"   Each rejection's reason is kept in `blockedBy`. An element of another system, on that system's own part — a sewer run, a\n"
"   cavern gallery, a quarry working, a vault — never refuses a node: where a gallery or chamber of the complex meets one\n"
"   at a shared depth, U-ACCESS (a)'s overlap test opens the meeting in the growth's commit, the complex's course never\n"
"   bent for it (II.7.6), and one it passes over or under at another depth stays apart (V04 §3.11 UC20). A node inside a\n"
"   ruin `tomb` chamber")

# ---- §3.5.5 (b) (1)–(3): the former fabric as V06 defines it; the burial age's home (VAT0-19, VV34-06)
S('VAT0-19 VV34-06',
"   epoch at which a former fabric's years since it was ruined first pass `history.burialYears` as the site's factors set it\n"
"   (V11's cell and factors, read through DR39: shortened by floods, river silt and rebuilding on top, lengthened on bare\n"
"   rock); `former` lists that fabric's surface records the epoch buries — its ruined ways (traces), its ruined buildings and\n"
"   its ruined enceinte stretches and gates — which the replay clears on the ground in the same batch (their existence\n"
"   `cleared`, §2.8), as `raiseGrade` clears its region; `lay` reads each on its last live state.",
"   epoch at which a former fabric's years since it was ruined first pass its factored burial age `T` (V11 §3.25.2,\n"
"   registry row 93: `burialYears` and the flood, silt, rebuilt and bare-rock factors, read through DR39 — shortened by\n"
"   floods, river silt and rebuilding on top, lengthened on bare rock); `former` lists the surface records the epoch buries\n"
"   of the former fabric V06 §3.20.5 (4) defines — its ruined buildings, its ways retired or effaced to traces, and its\n"
"   enceinte runs in the condition V06 §3.20.5 lists, with the towers and gates drawn on them; the replay clears them on the\n"
"   ground in the same batch (their existence `cleared`, §2.8), as `raiseGrade` clears its region; `lay` reads each on its\n"
"   last live state.")
S('VV34-06',
"   (the replay record's epochs), `f` the site's burial-speed factor — V11's default `history.burialYears` ÷ the site's\n"
"   factored value, so floods, silt and rebuilding deepen it and bare rock keeps it shallow. It is fixed when laid: later\n"
"   epochs never re-lay it.",
"   (the replay record's epochs), `f` the burial-speed factor `burialYears ÷ T` (V11 §3.25.2: the default age over the\n"
"   fabric's factored burial age), so floods, silt and rebuilding deepen it and bare rock keeps it shallow. It is fixed when\n"
"   laid: later epochs never re-lay it.")
S('VAT0-19',
"   * each former enceinte stretch → a **wall band**: a gallery along the wall's chain, `widthCm` the wall's thickness (at\n"
"     least `formerWallCm`), created `collapsed`, cause `decay` — solid masonry, drawn by the `ruinMasonry` program, never\n"
"     counted in capacity or access; each former gate on it → a `gate` chamber of `formerGateM2` across the band, open,\n"
"     through which the street galleries pass.",
"   * each former enceinte run → a **wall band**: a gallery along the run's chain, `widthCm` the wall's thickness (at\n"
"     least `formerWallCm`), created `collapsed`, cause `decay` — solid masonry, drawn by the `ruinMasonry` program, never\n"
"     counted in capacity or access; a tower drawn on it lays no element of its own (a tower carries no state, §2.7, item\n"
"     575), its remains the band's masonry and the fill; each gate drawn on it → a `gate` chamber of `formerGateM2` across\n"
"     the band, open, through which the street galleries pass.")

# ---- §3.5.7 (g) (5): the households of a void lost before and after `siting` (VAT0-02)
S('VAT0-02',
"     closed run's plots — at an epoch its households returned to V06's ledger as displaced, cause `void`, and re-housed\n"
"     the same epoch (V06 §3.18.1 (4); J-V4.125); at an edit, listed as the dry run's `displaced` effect (§11.2). When the cluster is refound, its\n",
"     closed run's plots. At an epoch, a cluster turned `lost` at the `decline` step (`under.fade`) returns its households\n"
"     to V06's ledger as displaced, cause `void`, and they are re-housed at `siting` the same epoch; a cluster turned\n"
"     `lost` in an `afterGrowth` participant's commit (`under.extend`'s foundation or arch-vault collapse, `under.access`,\n"
"     `under.undercity`), after `siting`, has its households re-housed inside that participant by §4.7's overflow pass,\n"
"     counted `households.undergroundVacated` and never left for the epoch's `close` (V06 §3.18.1 (4), (6); J-V4.128). At\n"
"     an edit they are listed as the dry run's `displaced` effect (§11.2). When the cluster is refound, its\n")

# ---- §3.10: access at an epoch cites the split (VAT0-02)
S('VAT0-02',
"  this pass (below); one that turned `lost` — its last open path sealed, bricked, caved in or deleted — vacates its dwellings\n"
"  and undercity plots by V04 §3.5.7 (g) (5), as fates of the epoch.",
"  this pass (below); one that turned `lost` in this pass — its last open path bricked, collapsed or deleted after the\n"
"  `decline` step — vacates its dwellings and undercity plots by V04 §3.5.7 (g) (5), as fates of the epoch, its households\n"
"  re-housed inside `under.access` (the `afterGrowth` case there; one that `under.fade` closed was vacated at `decline`, its\n"
"  households through V06's ledger).")

# ---- §3.11: the outfall ladder per bank (VEW-01); Find's edges (G120-V04); two combinations (VEW-01, VV34-16)
S('VEW-01',
"| U-NET outfalls | no admitted candidate | moat candidates → one field outfall | `requestedVsBuilt`: \"sewers discharge to the town ditch / a cess field\" |",
"| U-NET outfalls | no admitted candidate on a bank (V04 §3.2 N3) | that bank's moat candidates → its field outfall → its gutters and pits where no dry stretch of `R`'s boundary is left (F-NET's truncate rung) | `requestedVsBuilt`: \"sewers discharge to the town ditch / a cess field\"; the unsewered hectares |")
S('G120-V04',
"| UE31 | exports (V04 §5.5) | E4: a zero-length or zero-area feature is left out of the export and listed in its log; E6: at every rung; E7: the parity presets export only the hidden sewer; the layer's visibility never changes the per-band export | leave out and report | T-V4-28, T-V4-29, T-V4-79 (y) |\n",
"| UE31 | exports (V04 §5.5) | E4: a zero-length or zero-area feature is left out of the export and listed in its log; E6: at every rung; E7: the parity presets export only the hidden sewer; the layer's visibility never changes the per-band export | leave out and report | T-V4-28, T-V4-29, T-V4-79 (y) |\n"
"| UE32 | Find on Below (V04 §5.1) | E1: no chip, or no match Below, draws nothing Below and counts 0; E2: one match glows or pins as any; E3: at the metropolis cap the pins merge into count bubbles by §8.2's rule; E5: an element of an `unexcavated` cluster is absent below `secret` and a ghost pin at `secret` while its cluster is not drawn; E6: at every rung where the layer has a match; E7: the layer hidden (every match Below a ghost pin), each `underView` mode, `showUnexcavated` on and off; E8: a view — the chips saved in view pins, re-evaluated after load, undo, redo, regenerate and migrate, the document never changed | — | T-V4-81 |\n")
S('VEW-01 VV34-16',
"| UC18 | a vault × a lock | a locked vault element is held against every generator: U-FADE never strikes it (its candidates exclude locked elements); a reconcile or regeneration that would re-lay, collapse or delete it keeps it — at an epoch reported with E_LOCKED's cause, at an edit's dry run returned E_LOCKED (§7.3), the user free to unlock; the removal of a raised way or a span's `open` with a locked arch vault under it is refused E_LOCKED until it is unlocked | check | T-V4-80 (i) |\n",
"| UC18 | a vault × a lock | a locked vault element is held against every generator: U-FADE never strikes it (its candidates exclude locked elements); a reconcile or regeneration that would re-lay, collapse or delete it keeps it — at an epoch reported with E_LOCKED's cause, at an edit's dry run returned E_LOCKED (§7.3), the user free to unlock; the removal of a raised way or a span's `open` with a locked arch vault under it is refused E_LOCKED until it is unlocked | check | T-V4-80 (i) |\n"
"| UC19 | water — a river, a canal, a moat or the harbour, with its bridges and any pier, mole or quay platform over it — × the sewer | no sewer edge, run, knot, grating, drain run or passage lies over a water face (V04 §3.2 N3: a `Bridge`'s deck span whatever its way's class, the `bridge`, `pier`, `ford` and `aqueduct` classes and every spine stretch over water left out of the `SewerGraph`; N8 and N9 the same); each bank drains to an admitted outfall on its own bank, the outfall cap keeping each bank's largest root; a bank with none takes its own moat candidates, then its own field outfall, and a bank with no dry stretch of `R`'s boundary drains by gutter and pit, its area reported unsewered — never a crossing; a drawn or prefix-declared run that would cross water is bent at the bank, the bend named (V04 §4.1) | F-NET's truncate rung | T-V4-80 (j) |\n"
"| UC20 | a catacomb growing into a sewer (the owner's named combination) | the growth's course is never bent for the sewer, and a sewer run refuses no node (V04 §3.5.1 (4): `system` reads another complex of the catacomb's own part); each gallery or chamber of the growth that meets a run where their vertical intervals intersect commits one typed opening in the growth's commit — a `breach` link, cause `overlap` naming the catacomb system and the epoch's `seq`, its kind by `LinkRule.kinds`, a builders' grille reading `gated` (V04 §3.5.7 (a)) — one per meeting element pair; no element moves or changes system (two parts, never a merge) and the run's knots, profile and `serves` are unchanged; a complex passing over or under a run at another depth is linked only by U-ACCESS (b)'s chance or the overlap shaft's; the opening is a path of the connection graph like any link | — | T-V4-80 (k) |\n")
