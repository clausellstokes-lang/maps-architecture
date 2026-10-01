# V04 repair r4 — every edit. Each (issue ids, old, new, count); old must occur exactly `count` times in the text as it
# stands when the edit runs (edits run in order).
EDITS = []


def S(ids, old, new, count=1):
    EDITS.append((ids, old, new, count))


# =====================================================================================================================
# VAL-R3-03 (FIX per R4-09, amended: one trigger) — ArchVaults.reconcile and the foundationObstacles re-read run in the
# commit of every change to a raised way's `feet`, `supports` or `spans`, whoever makes it.
# =====================================================================================================================

# ---- §1b.2: the ArchVaults.reconcile caller row
S('VAL-R3-03 §1b.2 ArchVaults.reconcile callers',
  "| the tail's T2 vaults step (every raised way); the commit of a ground edit that adds, removes or re-shapes a raised way "
  "or sets a span's `use` (V04 §4.3); V06's `under.extend` at an epoch over `EpochScope.raised` |",
  "| the tail's T2 vaults step (every raised way, after generation's last support run, §2.7's support step (6) (a)); the "
  "commit of every change to a raised way's `feet`, `supports` or `spans`, whoever makes it (V04 §4.3): an edit that adds, "
  "removes or re-shapes a raised way or sets a span's `use`, a hand trace through one of its stations (§2.7's support step "
  "(6) (b) (iii)), and at an epoch V06's `under.extend` over `EpochScope.raised` (an epoch's raised-way op, a landfall, a "
  "circuit's, contraction's or re-anchored stretch's crossing station, the frame growth's deck extension, §3.2 (9); "
  "V06 §2.1) |")

# ---- §1b.3: the raised-way edit row (re-shape and a hand trace's crossing station wired to V04's reconcile)
S('VAL-R3-03 §1b.3 raised-way edit row',
  "| a raised way added (T4 `road` with `raised`, the aqueduct class) or deleted (generated or drawn): the base's edit, "
  "with V04's arch vaults, their links and accesses as fates in the same commit | T4 `road`; T9 `shape`'s delete | the "
  "base's rows; V04 §2.6's arch-vault row | the replaced scope (the vaults' ids restored) |",
  "| a raised way added (T4 `road` with `raised`, the aqueduct class), re-shaped (`moveVertex`) or deleted (generated or "
  "drawn), or crossed by a hand trace through one of its stations (`drawWall`, or `moveVertex` on an enceinte's trace, a "
  "re-anchored stretch among them; §2.7's support step (6) (b) (iii)): the base's edit, with V04's "
  "`ArchVaults.reconcile` and `foundationObstacles` re-read in the same commit (V04 §4.3), the arch vaults, their links "
  "and accesses as fates | T4 `road`; T9 `shape`'s delete; T3 `wall` | the base's rows; V04 §2.6's arch-vault row | the "
  "replaced scope (the vaults' ids and footprints restored) |")

# ---- §2.6: the arch-vault lifecycle row (create and regenerate cells)
S('VAL-R3-03 §2.6 arch-vault row create',
  "| U-SYS's vaults step (T2) from the base's `vault` spans; `ArchVaults.reconcile` in the commit of an edit that adds a "
  "raised way (T4 `road` with `raised`, the aqueduct class; the same span rule), sets a span's `use` to `vault`, or "
  "re-shapes a way; at an epoch through V06's `under.extend` over `EpochScope.raised` |",
  "| U-SYS's vaults step (T2) from the base's `vault` spans; `ArchVaults.reconcile` in the commit of every change to a "
  "raised way's `feet`, `supports` or `spans`, whoever makes it — an edit that adds a raised way (T4 `road` with "
  "`raised`, the aqueduct class; the same span rule), sets a span's `use` to `vault`, re-shapes a way or takes a trace's "
  "crossing station on it (§2.7's support step (6) (b) (iii)); at an epoch through V06's `under.extend` over "
  "`EpochScope.raised` (its raised-way ops, a landfall, a trace's crossing station, the frame growth's deck extension, "
  "§3.2 (9)) |")
S('VAL-R3-03 §2.6 arch-vault row regenerate',
  "| re-derived with its raised way, its id kept by its key; its closure follows its span at every derivation by "
  "V04 §3.5.4 (d) (2); **removed** in the same commit as its raised way is deleted, generated or drawn, or its span set "
  "`open` —",
  "| re-derived with its raised way, its id kept by its key, its footprint re-laid between its span's raised-way piers' "
  "inner faces at each reconcile; its closure follows its span at every derivation by V04 §3.5.4 (d) (2); **removed** in "
  "the same commit as its raised way is deleted, generated or drawn, or its span is gone or set `open` —")

# ---- §3.5.0 *At an epoch*: Foundations.apply over EpochScope.raised (the epoch side of the foundations re-read)
S('VAL-R3-03 §3.5.0 Foundations.apply scope.raised',
  "the raised-way piers of the parts in\n"
  "`scope.raised` and the footings of the retaining walls in `scope.levelled`,",
  "the raised-way piers of the raised ways in\n"
  "`scope.raised` (V06 §2.1: every raised way whose `feet`, `supports` or `spans` the epoch changed, a trace's crossing\n"
  "station and the frame growth's deck extension among them) and the footings of the retaining walls in `scope.levelled`,")
S('VAL-R3-03 §3.5.0 no obstacle removed (sweep)',
  "An epoch op removes no obstacle — a breached\n"
  "or dismantled span keeps its piers' footings (V06 §3.19.2), a tombstoned wall its footing (above) — so the element set it\n",
  "An epoch op removes no obstacle — a breached\n"
  "or dismantled span keeps its piers' footings (V06 §3.19.2), a tombstoned wall its footing (above), a crossing station\n"
  "its pier's former ring (§2.7's support step (6) (b) (iii)) — so the element set it\n")

# ---- §3.10: the epoch's reconcile, over every raised way the epoch changed (sweep of the same trigger)
S('VAL-R3-03 §3.10 epoch reconcile',
  "* **`ArchVaults.reconcile(doc, EpochScope.raised, epoch)`** (V06's `under.extend`) — in the epoch's commit: lays the arch\n"
  "  vaults of the `vault` spans of a raised way the epoch founded or repaired (a town becoming a city), collapses those whose\n"
  "  span or a bounding support reads `ruined` or `cleared`, or whose span V06 breached or dismantled (V04 §3.5.4 (d) (2); a\n"
  "  landfall's ruin included), and deletes those of a removed raised way, with their links and accesses; the new chambers\n"
  "  join `EpochScope.elements`, so the access pass tests them in the same epoch (g item 109 (j) (3b)).\n",
  "* **`ArchVaults.reconcile(doc, EpochScope.raised, epoch)`** (V06's `under.extend`) — in the epoch's commit, over every\n"
  "  raised way whose `feet`, `supports` or `spans` the epoch changed (V06 §2.1's `EpochScope.raised`): lays the arch vaults\n"
  "  of the `vault` spans of a raised way the epoch founded or repaired (a town becoming a city), collapses those whose span\n"
  "  or a bounding support reads `ruined` or `cleared`, or whose span V06 breached or dismantled (V04 §3.5.4 (d) (2); a\n"
  "  landfall's ruin included), re-lays those of a raised way a circuit, contraction or re-anchored stretch crossed through\n"
  "  one of its stations (§2.7's support step (6) (b) (iii): that station's support the band's stretch, each vault between\n"
  "  its raised-way piers' inner faces) or whose deck the frame growth extended (§3.2 (9): a new `vault` span's vault laid,\n"
  "  one whose span is gone or `open` deleted), and deletes those of a removed raised way, with their links and accesses;\n"
  "  the new chambers join `EpochScope.elements`, so the access pass tests them in the same epoch (g item 109 (j) (3b)).\n")

# ---- §4.3: one trigger row (the span's `use` row folded into it, its outcome kept)
S('VAL-R3-03 §4.3 one trigger row',
  "| a raised way added, removed or re-shaped, generated or drawn | `ArchVaults.reconcile` over that way in the same commit "
  "— its vaults laid or deleted with their links and accesses, fates in the dry run; `foundationObstacles` re-read under "
  "its raised-way piers: the older voids' collapsed stretches and pillars there re-derived, and an existing element of a "
  "later system a new raised-way pier puts within reach converted `collapsed`, cause `foundation`, as a fate (a "
  "catacomb's staying in its extent, V04 §3.5.1 (6)); the excavation reading; the terminal cistern of an aqueduct | the "
  "network (a raised spine is never an edge); every other part |\n"
  "| a span's `use` set | that span's arch vault laid or removed | the rest |\n",
  "| any change to a raised way's `feet`, `supports` or `spans` by an edit — the way added, removed or re-shaped, generated "
  "or drawn; a span's `use` set; a hand trace through one of its stations (a `drawWall`, or a moved trace vertex, a "
  "re-anchored stretch among them, bent there by §2.7's support step (6) (b) (iii)); the same change at an epoch (V06's "
  "raised-way ops, a landfall, a circuit's, contraction's or re-anchored stretch's crossing station, the frame growth's "
  "deck extension, §3.2 (9)) runs the reconcile and `Foundations.apply` over `EpochScope.raised` instead (V04 §3.10; "
  "V04 §3.5.0 *At an epoch*) | `ArchVaults.reconcile` over that way in the same commit — its vaults laid, re-laid between "
  "their raised-way piers' inner faces or deleted (V04 §3.5.4 (d) (1)–(3)), with their links and accesses, fates in the "
  "dry run (a span's `use` set lays or removes that span's arch vault alone); `foundationObstacles` re-read under its "
  "raised-way piers: the older voids' collapsed stretches and pillars there re-derived, and an existing element of a "
  "later system a new or widened raised-way pier (a crossing station's band stretch) puts within reach converted "
  "`collapsed`, cause `foundation`, as a fate (a catacomb's staying in its extent, V04 §3.5.1 (6)); the excavation "
  "reading; the terminal cistern of an aqueduct | the network (a raised spine is never an edge); every other part |\n")

# ---- §6: the edit budget names the one trigger
S('VAL-R3-03 §6 budget',
  "a raised way's add\n"
  "or removal adds ≤ 2 ms for its arch vaults and foundations;",
  "a change to a raised\n"
  "way's `feet`, `supports` or `spans` by an edit (its add, re-shape or removal, a hand trace's crossing station) adds\n"
  "≤ 2 ms for its arch vaults and foundations;")

# ---- T-V4-63: the fixture
S('VAL-R3-03 T-V4-63 fixture',
  "an epoch that founds a raised way (V06's `under.extend`) lays its vaults in the epoch's commit | PR |",
  "an epoch that founds a raised way (V06's `under.extend`) lays its vaults in the epoch's commit; on a CITY fixture whose "
  "viaduct holds a `vault` span with its arch vault, crossed through one of its stations by an epoch circuit and, on a "
  "second run, by a hand `drawWall` (§2.7's support step (6) (b) (iii)), and an aqueduct whose deck an epoch's frame "
  "growth extends to the new ring (§3.2 (9)): after each commit every arch vault's key names a standing span of use "
  "`vault`, its footprint lies between that span's raised-way piers' inner faces (the crossing station's its band "
  "stretch), no chamber stands under an `open` span, each new `vault` span holds its chamber, and `foundationObstacles` "
  "reads the new supports in that commit; the hand case's undo restores the vaults with the same ids and footprints | PR |")

# =====================================================================================================================
# VAL-R3-05 (FIX per R4-12) — Find on Below at a drawn week reads the frame; END of VAL-R3-01 (R4-02) and its sweep.
# =====================================================================================================================

# ---- the three rows: at each change of §2.9's `week`, over the model the view draws
S('VAL-R3-05 §1b.1 underFindPlaces row',
  "| the underground records and their bands (§8.4), read at each commit that rebuilds Find's index |",
  "| the underground records and their bands (§8.4), read at each commit that rebuilds Find's index and at each change of "
  "§2.9's `week`, over the model the view draws (the head, or a history frame, V06 §3.15.2) |")
S('VAL-R3-05 §1b.2 underFindPlaces row',
  "for the ids §11.2's gazetteer match listing gives on underground parts, after each commit that rebuilds Find's index |",
  "for the ids §11.2's gazetteer match listing gives on underground parts, after each commit that rebuilds Find's index "
  "and at each change of §2.9's `week`, over the model the view draws (the head, or a history frame, V06 §3.15.2) |")
S('VAL-R3-05 §2.6 underFindPlaces row',
  "| recomputed at each commit that rebuilds Find's index | follows its records | — |",
  "| recomputed at each commit that rebuilds Find's index and at each change of §2.9's `week`, over the model the view "
  "draws (the head, or a history frame, V06 §3.15.2) | follows its records | — |")

# ---- §5.1's lead: END of VAL-R3-01 (R4-02)
S('END VAL-R3-01 §5.1 lead',
  "Hidden by default at every rung (§8.4). When the underground layer is visible, one depth band draws at a time (`depthBand`,\n"
  "§2.9; its default §8.4's), in one of three modes,",
  "Hidden by default at every rung (§8.4). When the underground layer is drawn — visible, or Below the view's working\n"
  "layer (§8.4) — one depth band draws at a time (`depthBand`, §2.9; its default §8.4's), in one of three modes,")
# sweep (R4-01 (2)): "visible" read as "drawn" where it gates the drawing
S('R4-02 sweep §5.1 document opened',
  "document opened with the underground visible shows",
  "document opened with the underground drawn shows")
S('R4-02 sweep §5.4 label candidates',
  "a candidate only while the underground is visible and its band drawn,",
  "a candidate only while the underground is drawn — visible, or Below the view's working layer (§8.4) — and its band\n"
  "drawn,")
S('R4-02 sweep §6 View',
  "**View.** Showing the layer or switching band re-rasters",
  "**View.** Showing the layer (its toggle, or Below made the view's working layer, §8.4) or switching band re-rasters")
S('R4-02 sweep §5.1 (2) Go there',
  "   with their count; **Go there** sets `depthBand` to the match's shallowest band (a view key, never an edit). A match on\n"
  "   Ground or Sky is a ghost pin at its plan anchor over the ghost (item 120 (f)).\n",
  "   with their count; **Go there** makes Below the working layer and sets `depthBand` to the match's shallowest band —\n"
  "   view keys only, Below drawn whatever its visibility (§8.4), no event sent (item 120 (a); V09 §4.21.10 (8)). A match on\n"
  "   Ground or Sky is a ghost pin at its plan anchor over the ghost (item 120 (f)).\n")
S('R4-02 sweep UE32 E7',
  "E7: the layer hidden (every match Below a ghost pin)",
  "E7: the layer not drawn — hidden and not the working layer (every match Below a ghost pin)")
S('R4-02 sweep T-V4-81 (b) Go there',
  "and **Go there** sets `depthBand` to the match's shallowest band; with Ground shown,",
  "and **Go there** makes Below the working layer and sets `depthBand` to the match's shallowest band, 0 events logged and "
  "`LayerSpec.visible` unchanged; with Ground shown,")

# ---- §5.1 *Find on Below*: the model read, the week's re-read and the drawn week (R4-12)
S('VAL-R3-05 §5.1 doc is the model the view draws',
  "(`@plat/under`, never stored): for each matched id on an underground part",
  "(`@plat/under`, never stored; `doc` the model the view draws, (7)): for each matched id on an underground part")
S('VAL-R3-05 §5.1 (6) and new (7)',
  "   underground epoch participant's — and the chips re-evaluate then (V09).\n",
  "   underground epoch participant's — and the chips re-evaluate then (V09); and at each change of §2.9's `week` (a\n"
  "   timeline scrub, a host's `view.set { week }`) `underFindPlaces` is read again over the model the view draws ((7)).\n"
  "7. **At a drawn week** (§11.2's *At a drawn week*; V06 §3.15.2). At a drawn week whose frame is not the head,\n"
  "   `underFindPlaces` reads the model the view draws, that frame, for the ids §11.2's listing gives at that week — a\n"
  "   building matched by its use at that week, never its head use. Each glow shape, depth band, ghost pin's band, the band\n"
  "   ladder's counts and **Go there**'s band are then the frame's: a run, gallery or undercity district an epoch has since\n"
  "   extended or re-cut glows over the elements the frame holds, a match the frame lacks is neither glowed, pinned nor\n"
  "   counted, **Go there** sends the view to a band the frame holds, and (5)'s admission reads that frame. Show gaps' units\n"
  "   Below are V01 §5.4 (3)'s `gapUnits` at that week. With no drawn week, or at the head, the head.\n")
S('VAL-R3-05 UE32 E8',
  "E8: a view — the chips saved in view pins, re-evaluated after load, undo, redo, regenerate and migrate, the document "
  "never changed | — | T-V4-81 ((c) the gaps, (f) E8, (i) E3) |",
  "E8: a view — the chips saved in view pins, re-evaluated after load, undo, redo, regenerate and migrate and at each "
  "change of the drawn week (a frame not the head: the frame's matches, bands and glow shapes, V04 §5.1 (7)), the "
  "document never changed | — | T-V4-81 ((c) the gaps, (f) and (j) E8, (i) E3) |")
S('VAL-R3-05 T-V4-81 (j)',
  "pins and ghost pins closer than about 24 px merge into a count bubble whose number equals its members (item 120 (e), "
  "(k)) | PR (fixtures), nightly |",
  "pins and ghost pins closer than about 24 px merge into a count bubble whose number equals its members (item 120 (e), "
  "(k)); (j) at a drawn week whose frame is not the head (V04 §5.1 (7)) — the METROPOLIS fixture scrubbed to a week "
  "before an epoch that extended its catacomb complex and re-cut an undercity district —: the glow shapes, depth bands, "
  "ghost pins' bands, the band ladder's counts and **Go there**'s band those of `underFindPlaces` over that frame for "
  "§11.2's listing at that week, no glow over a gallery the frame lacks, the gaps Below V01's `gapUnits` at that week, "
  "and the head's reading back when the scrub returns to the head | PR (fixtures), nightly |")

# =====================================================================================================================
# VAL-R3-09 (FIX per R4-04) — the look's units, and the building a disaster look stands over, one phrase each.
# =====================================================================================================================
S('VAL-R3-09 §5.6 (1) stands over',
  "   collapses; its restoration is V06 §3.23 (3)'s, as for every building. Under a disaster's look over its building\n"
  "   (V03 §5.6 (4); item 122 (d)), a storey below 0 draws at its building's drawn level",
  "   collapses; its restoration is V06 §3.23 (3)'s, as for every building. Where a disaster look stands over its building\n"
  "   (item 122 (d): a building of one of the look's units, §10.2 (d), on which V06 §3.22 (3)'s `crisisLookYields` is not\n"
  "   yet true, and every building of a preview's units; V03 §5.6 (4)), a storey below 0 draws at its building's drawn level")
S('VAL-R3-09 §5.6 (1) units',
  "An underground building lies in no look's unit — V01's `disasterDistricts` returns ground part 0's\n"
  "   districts, at the village rungs V07's ends (V01 §3.16 (1)) — so it reads its own level only.",
  "An underground building lies in no look's unit — V01's `disasterDistricts` returns ground part 0's\n"
  "   districts, at the village rungs V07 §5.6 (3)'s units, its ends or an end-less thorp's toft groups, all of part 0's\n"
  "   plots (V01 §3.16 (1)) — so no look stands over it and it reads its own level only.")
# sweep (R4-01 (2)): the same phrase in UE33 and J-V4.130
S('R4-04 sweep UE33 E7',
  "a church in a ruined district draws its crypt",
  "a church of one of the look's units (§10.2 (d)) draws its crypt")
S('R4-04 sweep J-V4.130',
  "under a disaster's look over the building, the whole building's drawn level",
  "where a disaster look stands over the building (until V06 §3.22 (3)'s hand-over), the whole building's drawn level")

# =====================================================================================================================
# VAP-r3-05 (FIX per R4-11) — no test stages a key that withholds a look-bearing condition.
# =====================================================================================================================
S('VAP-r3-05 T-V4-82 (i)',
  "and at its own level with Show crises off, at a key that withholds the condition, in the weeks outside the "
  "condition's and from the week a Works begun on the church hands it over (V06 §3.22 (3)'s `crisisLookYields`; this "
  "clause once V06's E2 has landed); no element drawn repaired",
  "and at its own level with Show crises off, in the weeks outside the condition's and from the week a Works begun on "
  "the church hands it over (V06 §3.22 (3)'s `crisisLookYields`; this clause once V06's E2 has landed); under View as at "
  "`public`, `local` and `secret` the same drawing, the condition `public` (§7.7's DR44), and a `none`-row condition "
  "carried beside it changing no crypt's drawing at any key; no element drawn repaired")
