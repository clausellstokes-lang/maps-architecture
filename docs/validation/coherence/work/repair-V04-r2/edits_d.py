# V04 repair r2 — edits, part d: V04 §7, §8, §9, §10, §11, §12, §13.
import os
EDITS = []
_ORIG = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'V04.orig.md'), encoding='utf-8').read()


def S(ids, old, new, count=1):
    EDITS.append((ids, old, new, count))


def line_starting(prefix):
    ls = [l for l in _ORIG.split('\n') if l.startswith(prefix)]
    assert len(ls) == 1, (prefix, len(ls))
    return ls[0]


# ---- §7 head: the take-over list (R2-35, R2-08)
S('R2-35 §7 head',
  "names the clause it takes over — §13.2's underground take-over row (T63-4, T109-1 – T109-6, T113-4, T113-5) by T-V4-34\n"
  "(f), T-V4-43 – T-V4-58, T-V4-76 and T-V4-77, each naming its bar and clause.",
  "names the clause it takes over — §13.2's underground take-over row (T63-4, T109-1 – T109-6, T113-4, T113-5, T120-4,\n"
  "T120-5, T123-1, T123-2, T123-6) by T-V4-34 (f), T-V4-43 – T-V4-58, T-V4-76, T-V4-77, T-V4-81 and T-V4-82, each naming its\n"
  "bar and clause.")

# ---- T-V4-2: the receiving water's surface (VEW-r1-07) and the no-water fixture (VEW-07), R2-25
S('VEW-r1-07 VEW-07 T-V4-2',
  "every outfall invert ≥ the shore height + `freeboardCm`, or `W_OUTFALL_LOW` reported — 0 violations | PR, nightly |",
  "every outfall invert ≥ its receiving water's surface `s` + `freeboardCm` (V04 §3.2 N7 (1): a moat's derived level, §4.2 S3 (10), every other water's shore height), or `W_OUTFALL_LOW` reported — 0 violations; **the no-water fixture** (a TOWN and a CITY with no river, lake, sea, canal or oasis, `moat: 'none'`): every run reaches the one field outfall beyond the outermost enceinte's outer strip, `requestedVsBuilt` naming the cess field, 0 `frame` outfalls | PR, nightly |")

# ---- T-V4-27: every shipped sheet (VAL-R1-06, R2-29 (a))
S('VAL-R1-06 T-V4-27',
  "in every family, against its goldens;",
  "in every shipped sheet of §8.2's presets table (`ink`, `lit`, `hatched`, `parchment`, `bw-print`, `night`, `painterly` from V07's V-M1, the parity presets), against its goldens, the loader refusing no `under.*` pair in any of them (V04 §5.2);")

# ---- T-V4-80 (j): the moat on sloping ground (VEW-r1-07); the stretch's words (VV34-r1-08)
S('VEW-r1-07 T-V4-80 (j) fixtures',
  "(a town astride a river, a walled core in a wet moat, an island quarter)",
  "(a town astride a river, a walled core in a wet moat on level and on sloping ground, an island quarter)")
S('VEW-r1-07 VV34-r1-08 T-V4-80 (j) moat',
  "a bank with no admitted outfall draining to its moat, to its field outfall or, with no dry boundary, by gutter and pit reported unsewered,",
  "a bank with no admitted outfall draining to its moat — the mouth `freeboardCm` above the moat's derived level (§4.2 S3 (10)), never above its bank —, to its field outfall or, with a stretch empty or wholly on water, by gutter and pit reported unsewered,")

# ---- T-V4-81: the bars it takes (R2-35), the gaps Below (VAT1-02), E3 and E8 (VV34-r1-09); T-V4-82 (G123-V04)
S('R2-35 T-V4-81 head',
  "| T-V4-81 | Find on Below (g item 120 (f), (h), (k)) |",
  "| T-V4-81 | Find on Below (g item 120 (f), (h), (k); takes T120-4's underground clause by (f), and T120-5's by (i)) |")
S('VAT1-02 T-V4-81 (c)',
  "(c) an undercity district chip lifts exactly its blocks, walkways and plaza, a ground quarter chip exactly the elements of band b inside its outline;",
  "(c) an undercity district chip lifts exactly its blocks, walkways and plaza, a ground quarter chip exactly the elements of band b inside its outline; with Show gaps on, a kind chip whose class the fixture's sewer-front neighbourhood and F6 dwellings lack outlines the underground pseudo-district dashed \"none here\" in every band holding its plots, an undercity neighbourhood lacking it in the band holding its core, and a `walk` or `households` chip reads its per-plot units by `underDistance` — every gap Below equal to V01 §5.4 (3)'s `gapUnits`;")
S('VV34-r1-09 T-V4-81 (f)',
  "(f) the chips held across a band step, an `underView` change, a layer switch, an underground commit, an epoch and an undo — a match the commit makes glowing at that commit, one it removes gone;",
  "(f) T120-4: the chips held across a band step, an `underView` change, a layer switch, an underground commit, an epoch, an undo, a redo, a regenerate, a load and a migration — a match the commit makes glowing at that commit, one it removes gone, a chip whose last match goes kept at count 0, dark; after the load, the redo, the regenerate and the migration the glowing set, the ghost pins and the band counts equal a fresh reading, the chips kept in the view pin;")
S('VV34-r1-09 G123-V04 T-V4-81 (i), T-V4-82',
  "`underFindPlaces` ≤ 2 ms p95 | PR (fixtures), nightly |\n",
  "`underFindPlaces` ≤ 2 ms p95; (i) T120-5: at the city band with Below shown on the METROPOLIS fixture, every match in the drawn band whose element is under about 6 px carries a pin with its chip's glyph, and pins and ghost pins closer than about 24 px merge into a count bubble whose number equals its members (item 120 (e), (k)) | PR (fixtures), nightly |\n"
  "| T-V4-82 | damage below ground (g item 123 (b), (c), (e), (f); takes T123-1's, T123-2's and T123-6's clauses below ground) | "
  "on a fixture holding a ruined church with a crypt joined to a catacomb, a ruined building over a cavern with its dig access, "
  "a decayed building's cellar over a ruin, an undercity neighbourhood whose cluster turns `lost` and decays over a century of "
  "epochs, and a never-decayed control, at levels 0 to 1 in steps of 0.05: (a) T123-1: every room, wall, opening and id of "
  "each storey below 0 and of each underground building identical between the intact and the damaged plan; (b) T123-2: the "
  "damaged set of every element below ground at each level contains the set at every lower level, each element damaged "
  "exactly when the level ≥ its threshold, the same element breaking at the same level for a seed; (c) the kinds: "
  "`belowKind` gives each element of the fixture's storeys below 0 and rock-side runs its kind of V04 §5.6, no element of "
  "the five kinds damaged below the `ruined` share's floor (V06 §3.23 (2)), and at level 1 every crypt room, wall line, way "
  "down and the crypt join present, the crypt drawn partly collapsed; (d) a drawing only: the excavation reading, every "
  "access and link record, `ExcavationRecord`, the document hash and every digest byte-identical at levels 0, ½ and 1, every "
  "closure state unchanged by any level and the `lost` cluster still `lost` (UC21); (e) T123-6 per band: each band's dd2vtt "
  "holds no `line_of_sight` segment for an underground building's outer wall run past its threshold and keeps one for each "
  "`cellarWall` run past it, a door past its threshold no portal, and the rubble drawn in the image, never as a wall; (f) a "
  "restoration lowering the level clears the damage in reverse threshold order, each element between the level and "
  "`decayPeak` drawn in patch material; (g) the never-decayed control and every band of an underground with no decayed "
  "building draw and export byte-identically to the build without the layer (`item123.damage`, V12's pin); (h) save, load, "
  "undo, redo, regenerate and migrate at levels 0, ½ and 1 re-read the same drawing, within V04 §6's *Damage below ground* "
  "| PR (fixtures), nightly |\n")

# ---- §8: Find's placement (R2-32), item 123's part at U5 (R2-36; G123-V04), the sheets' rows (VAL-R1-06)
S('R2-32 G123-V04 §8 U5 content',
  "Find on Below (`underFindPlaces`, item 120; at the later of U5 and the step that lands V09's Find panel); both absorbed in the range (J-V4.126, J-V4.127); the owner's panel |",
  "Find on Below (`underFindPlaces`, item 120, at U5 — M5, Find's milestone, lands before M6-U); both absorbed in the range (J-V4.126, J-V4.127); **the damage below ground** (item 123: `belowKind`, the underground view's damaged footprints, the per-band exports; a plan's storeys below 0 drawn with V03's item-123 step; 0.25 pw; J-V4.130); the owner's panel |")
S('G123-V04 §8 U5 exit',
  "T-V4-79's remaining clauses, T-V4-80 (g)–(i) and (k), T-V4-81; the epoch clauses",
  "T-V4-79's remaining clauses, T-V4-80 (g)–(i) and (k), T-V4-81, T-V4-82; the epoch clauses")
S('G123-V04 §8 U5 estimate',
  "the panel rated or offered (§13.6 (7)); the register check | 3–4.25 |",
  "the panel rated or offered (§13.6 (7)); the register check | 3.25–4.5 |")
S('VAL-R1-06 §8 content row',
  "the light rows' tuning, the style rows of `rock` and `void` in every family |",
  "the light rows' tuning, the underground's style rows in every shipped sheet (V04 §5.2) |")
S('G123-V04 §8 total',
  "| **total** | | | **28.25–39.25** (accepted, owner question 2, J122;",
  "| **total** | | | **28.5–39.5** (accepted, owner question 2, J122;")
S('VAL-R1-06 §8 register content',
  "the light rows' tuning and the `rock` and `void` style roles are rows of tables (51, 52)",
  "the light rows' tuning and the underground's style rows in every shipped sheet are rows of tables (51, 52)")

# ---- §9: J-V4.130 (item 123 below ground), J-V4.131 (every shipped sheet)
_J129 = line_starting('| J-V4.129 |')
S('G123-V04 VAL-R1-06 §9',
  _J129 + "\n",
  _J129 + "\n"
  "| J-V4.130 | chose, for g item 123's part below ground (J136), five kinds of their own — `cellarWall`, `cellarVault`, "
  "`cryptWall`, `cryptVault`, `cryptTomb` — whose V11 ranges lie inside the `ruined` share, the crypt's at its top, a damaged "
  "one partly collapsing but never removing a room, a wall line, a way down or a join, the lowest storey's floor no element; "
  "a storey below 0 reading its building's level and an underground building its own; and the damage a drawing only, read "
  "by no stage, link, access or excavation reading, V04's closure states staying the model's access facts — over elements "
  "below ground taking the above-ground kinds and ranges, a level of the crypt's own, or a fallen element closing a way, "
  "because item 123 (c) keeps cellars and crypts intact or partly collapsed in a ruin (a ruined church keeps its crypt), "
  "earth and rock behind a wall below grade hold it up and keep it opaque to sight, one plan has one level (item 123 (a)), "
  "and the access model's states are model facts written by epochs and edits while the level is a reading at the drawn "
  "week that moves no digest (§2.6 step 7), so a scrubbed week never opens or closes a way; 0.25 pw in U5 |\n"
  "| J-V4.131 | chose to draw the underground in every shipped sheet by each family's own drawing of the matching role — "
  "the rock halo in the family's hatch, fill or wash, the void one step lighter than the ghosted ground, water, walls, "
  "buildings, traces, glyphs and labels as the family draws them on the ground, `painterly`'s by V07 §5.1's programs and "
  "palette — over one underground look for every sheet or `painterly` falling back to `ink`'s rows, because §8.2's loader "
  "refuses a sheet with an unresolved pair, the village product opens in `painterly` and draws the layer at the village "
  "rungs (V04 §3.1), and a void must read as carved in every sheet (J-V4.31) |\n")

# ---- §10: the bars by their census (R2-06 (a)'s form); item 123's hooks
S('R2-06 §10 BCR-V4-15',
  "| BCR-V4-15 | the bars T-V4-1 – T-V4-81 | item 484 |",
  "| BCR-V4-15 | the bars of V04 §7 (every T-V4 test) | item 484 |")
S('G123-V04 §10 intro',
  "the lost reading and the buried former settlement are this\n"
  "volume's mechanisms over hooks the base and its sibling volumes declare (§2.7's `HistoryRecord`, II.7.6, §4.11).",
  "the lost reading, the buried former settlement and the\n"
  "damage below ground are this volume's mechanisms over hooks the base and its sibling volumes declare (§2.7's\n"
  "`HistoryRecord`, II.7.6, §4.11, §2.6 step 7, §6.3's `plan.damage`).")

# ---- §11: the cost (G123-V04)
S('G123-V04 §11 Q2',
  "| Q2 | its cost, 28.25–39.25 pw | **answered (J122): accepted** — it carries owner rules 109 and 110 (J-V4.114) |",
  "| Q2 | its cost, 28.5–39.5 pw | **answered (J122): accepted** — it carries owner rules 109 and 110 (J-V4.114) and item 123's part below ground (J-V4.130) |")

# ---- §12
S('G123-V04 G126-V04 §12 items read',
  "file g's items 102–120 are read whole in\n"
  "  `docs/AMENDMENTS-2026-09-28g.md`, the underground parts of items 113, 119 and 120 written here.",
  "file g's items 102–126 are read whole in\n"
  "  `docs/AMENDMENTS-2026-09-28g.md`, the underground parts of items 113, 119, 120 and 123 written here; item 126 holds\n"
  "  none for this volume.")
S('VEW-r1-07 §12 water table',
  "* §2.6 reads a basement's water table as the nearest water body's shore sample plus a freeboard; N7's root-first outfall\n"
  "  takes the shore height as the water surface on the same reading.",
  "* §2.6 reads a basement's water table as the nearest water body's surface — a moat's the one level §4.2 S3 (10) derives,\n"
  "  every other body's shore sample — plus a freeboard; N7's root-first outfall reads the same surface `s`.")
S('§12 seams V01', "V01 §3.15, V01 §3.16;", "V01 §3.15, V01 §3.16, V01 §5.4;")
S('§12 seams V03', "V03 §2.1, V03 §2.4, V03 §3.7, V03 §3.12, V03 §4.5;",
  "V03 §2.1, V03 §2.2, V03 §2.4, V03 §3.7, V03 §3.12, V03 §4.5, V03 §5.1;")
S('§12 seams V05', "V05 §3.16;", "V05 §3.16, V05 §5.1;")
S('§12 seams V07', "V07 §3.12, V07 §3.16;", "V07 §3.12, V07 §3.16, V07 §5.1;")
S('G123-V04 VAL-R1-06 §12 plausible',
  "  the owner's \"across layers\" asks of Find Below (J-V4.127, vetoable).\n",
  "  the owner's \"across layers\" asks of Find Below (J-V4.127, vetoable).\n"
  "* That the five kinds below ground, their ranges inside the `ruined` share and the partial collapse drawn read as item\n"
  "  123 (c)'s \"intact or partly collapsed\" (J-V4.130, vetoable; T-V4-82 bars the rule, and the V4-U5 panel, whose frames\n"
  "  hold the cathedral's crypt, rates the look); that every shipped sheet's underground rows stay legible (T-V4-27's\n"
  "  goldens, `painterly`'s from V07's V-M1).\n")

# ---- §13: what the sibling units hold (R2-05 (3)'s ends, named for round 3's verifiers)
S('G123-V04 §13 V03',
  "V03 §3.12 (9) reading V04 §3.5.4 (f)'s `gradeFaces`; T-V3-23 (g) and (d) closed by T-V4-50 |",
  "V03 §3.12 (9) reading V04 §3.5.4 (f)'s `gradeFaces`; T-V3-23 (g) and (d) closed by T-V4-50; its damage layer drawing a storey below 0 by V04 §5.6's kinds and rules (item 123) |")
S('G123-V04 §13 V06',
  "item 119's comfort level for advance time and the replay, the participants' time inside them |",
  "item 119's comfort level for advance time and the replay, the participants' time inside them; `decayLevel` and `decayPeak` (V06 §3.23), read by V04 §5.6 |")
S('VAL-R1-06 §13 V07',
  "`UnderOpeningRow` in V07 §1b (W46) and V07 §3.16 (3) (iii) |",
  "`UnderOpeningRow` in V07 §1b (W46) and V07 §3.16 (3) (iii); V07 §5.1's `painterly` programs and palette drawing V04 §5.2's per-family rows |")
S('G123-V04 §13 V11',
  "the `perf.qualitySpend` rows (V11 §3.25.8) |",
  "the `perf.qualitySpend` rows (V11 §3.25.8); the item-123 rows of V04 §5.6's five kinds below ground, their ranges inside the `ruined` share |")
S('G123-V04 §13 V12',
  "T-V12-50's timer over the underground's waits |",
  "T-V12-50's timer over the underground's waits; the `item123.damage` pin over the underground's bands and per-band exports (T-V4-82 (g)) |")
S('R2-06 R2-35 §13 base',
  "§13.2's underground take-over row and *The underground layer built* line running to T-V4-81 |",
  "§13.2's underground take-over row naming T120-4, T120-5, T123-1, T123-2 and T123-6 with T-V4-81 and T-V4-82, and *The underground layer built* line reading every T-V4 test (V04 §7); §8.2's slot resolution listing the `under.*` entries in every shipped sheet with V04 §5.2's facts; §6.3's `plan.damage` reading V04 §5.6's kinds for their V11 ranges |")

# ---- the remaining callers' name (R2-12)
S('R2-12 T-V4-56', "by `AccessPass.run` over `scope.workings`", "by `AccessPassStrategy.run` over `scope.workings`")
S('R2-12 T-V4-72 (e)', "(e) `AccessPass.run` with a scope, run twice,", "(e) `AccessPassStrategy.run` with a scope, run twice,")
S('R2-12 §8 U5', "`AccessPass.run` over an `EpochScope` with the `lost` transitions",
  "`AccessPassStrategy.run` over an `EpochScope` with the `lost` transitions")
