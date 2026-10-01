# §4 – §6 — repair-V07-r1
def apply(d):
    # §4.1 T10 and T12 rows: the woods' re-roll under T12 (VDC0-15, VV78-13)
    d.sub("""regenerate the village (keep) or re-roll a block's houses, the roads, the woods' trees or the fields; **delete** anything,""",
          """regenerate the village (keep) or re-roll a block's houses, the roads or the fields; **delete** anything,""", tag='VDC0-15 T10 what')
    d.sub("""`rerollLayer('village.track')` re-grows the roads, `rerollLayer('forest')` re-draws the tree crowns alone; `delete` —""",
          """`rerollLayer('village.track')` re-grows the roads; `delete` —""", tag='VDC0-15 T10 events')
    d.sub("""the palisade's whole circuit (`LayerSpec.showCircuit`, item 413) | `setStyle`, `setLayer`, `paintGround` | V07 §5 |""",
          """the palisade's whole circuit (`LayerSpec.showCircuit`, item 413); re-roll the woods' trees (**New trees**) | `setStyle`, `setLayer`, `paintGround`; `rerollLayer('render.instances')` (New trees: town-wide and display only — the trees, hedgerows and render-time field strips re-drawn, nothing else moving; §6.1, §7.1; V09 §4.5) | V07 §5 |""", tag='VDC0-15 T12')

    # §4.5: the catalogue is V09's (VAH-20)
    d.sub("""of the site and the recorded inputs, never stored) — as rows keyed in V10's catalogue:""",
          """of the site and the recorded inputs, never stored) — as rows of V09 §4.9's catalogue (their words written here):""", tag='VAH-20 §4.5')

    # §5.1 woods (VDC0-15); run conditions by the look role (VV78-05); program cells
    d.sub("""  instances on the `render.instances` stream (never stored), so `rerollLayer('forest')` redraws them alone.""",
          """  instances on the `render.instances` stream (never stored), so T12 `dress`'s New trees (`rerollLayer('render.instances')`)
  redraws them, nothing in the model moving.""", tag='VDC0-15 §5.1')
    d.sub("""  at every band; a `patched` run in its patch row's own line style — `odd_stakes` as uneven ticks of mixed length, `hurdles` as a
  woven panel hatch, `brush` as a loose scribble, `turf` as a stippled bank, `timber_hoarding` as a plank band, `dry_stone` as a
  rough stone infill — thinner, lighter and irregular beside the robust section, at every band;""",
          """  at every band; a `patched` run by its `walls.patchMaterials` row's `look` role (V11 §3.25.3; §8.2's patch looks and their
  patterns) — thinner, lighter and irregular beside the robust section, at every band;""", tag='VV78-05 §5.1')
    d.sub("""item 110's `stairTickM`, `tickM` and the wall-weight ramp; the patch rows' line styles) are the""",
          """item 110's `stairTickM`, `tickM` and the wall-weight ramp) are the""", tag='VV78-05 §5.1 cells')

    # §5.4 exports: Find as shown (G120)
    d.sub("""chosen season and the festival shown, both named (items 116, 117, 118); GeoJSON in metres;""",
          """chosen season and the festival shown, both named (items 116, 117, 118), and Find as shown with its chips in the legend (item
120 (i); V07 §5.5); GeoJSON in metres;""", tag='G120 §5.4 pictures')
    d.sub("""a festival's decorations in the image only, never walls or obstacles (item 118 (g)) — and one at the""",
          """a festival's decorations in the image only, never walls or obstacles (item 118 (g)), Find off unless asked (item 120
(i)) — and one at the""", tag='G120 §5.4 VTT')
    # §5.5 Find at the village rungs (G120): appended after §5.4
    d.sub("""267), so the registry's completeness test covers it.

## 6 Performance budgets""", """267), so the registry's completeness test covers it.

""" + FIND_SECTION + """

## 6 Performance budgets""", tag='G120 §5.5')

    # §6: the VILLAGE row, the fallback and the one-time waits (VV78-02)
    d.sub("""above it the law (≤ 130 ms at the top), a declared miss against TOWN's 100 ms one-click bar in §12.3's form | the law |""",
          """above it the law (≤ 130 ms at the top), a declared target miss against TOWN's 100 ms one-click target (§12.3's form) inside item 119's comfort level | the law |""", tag='VV78-02 VILLAGE row')
    d.sub("""rung and it is re-measured; if it still fails, the bar is re-declared at the measured p95 for the owner's veto (D-18's form).""",
          """rung and it is re-measured; if it still fails, the bar is re-declared at the measured p95, a declared target miss inside
item 119's comfort level (D-18's form as item 119 (a) re-declares it).

""" + WAITS_PARA, tag='VV78-02 fallback; one-time waits')


FIND_SECTION = """### 5.5 Find at the village rungs (item 120, the village's part; J-V7.145)

Find is a view, never a change (item 120 (a)): its state is the per-viewer view key `find` (§2.9: the chips and the gaps
switch), kept across zooms, bands, layers, the season, epochs and edits until **Clear** or the panel's close, and saved only
in view pins — never in the document, its hash or the log. Every suggestion, count, glow, pin and ghost pin passes §11.2's
knowledge admission at the view's effective key (item 120 (h); V09 §4.8's View as). The panel, the type-ahead, the chip
grid, the results and the `live.find` overlay are V09's; the veil, halo, outline, pin and count-bubble rows §8.2's; the
search words and groups V11's lexicon; the gazetteer's class counts and match listing §11.2's. This section states what a
THORP, HAMLET or VILLAGE map offers and how each target reads there.

**(1) The list** (item 120 (b)), built by §11.2's gazetteer query over the committed records — nothing the village lacks
offered:
* **kinds** — every `v.` class with a standing member (V07 §2.4), the five dwelling rows included, so "farms" finds the
  husbandmen's farmsteads in the village and the outlying farmsteads in the hinterland (V07 §3.9 (5)); each under its
  `label`, its `synonyms` its search words, with its count ("Smithy · 2"), grouped by V11's groups; a town class that plays
  itself at a village rung (V07 §3.11 step 3) under its own V11 row; a word that matches a `v.` row and V11's town row of the
  same thing ("forge" → the smithy) offers the one the map holds, once;
* **named institutions** — the dossier's institution names first (V08's list entries), each bound to its members by V07
  §3.11's resolution order, a ladder record to all of them ("Blacksmiths (3–10)" → the three smithies);
* **areas** — the village itself (the one `village` district: the whole settlement lifted from the veil); its **ends**
  (`VillageEnd`, V07 §3.10), by name, else by kind and anchor ("the mill end", "the green end"), a declared end by its
  declared name; and the hinterland's **field groups** (`VillageField`, V07 §2.7): each great field, the infield and
  outfield, a common, the meadow, a wood, a strip holding by its holder's toft;
* **named places** — V07 §5.3's label rows: the green or the square, the church, the manor, the mill, the inn, the fair
  field, a named beach, a raised way's landmark word ("the arches", "the aqueduct"), the named lanes, the stream and the
  crossings (a ford or a bridge by its name, else "the ford");
* **people** — through V09's "Where is" (home and work), as at every rung.
An empty box shows the kinds as V11's grouped grid, as at every rung; at THORP and HAMLET the grid is short.

**(2) Show gaps** (item 120 (i)). At a village rung its units are the **ends** — a village is one district, and its ends are
its parts (V07 §3.10). For each chip's class, an end whose plots hold no member of the class is outlined dashed along the
union of its plots' faces and labelled "none here"; a village with one end, or none, has one unit, the village itself (its
perimeter, V07 §3.7), marked the same way. A member outside the perimeter (an outlying farmstead, the charcoal pit in the
wood, a mine's working) counts toward no unit, and a class whose row sites it outside (`outside` yes, V07 §2.4) is never
marked: a gap is a lack inside the settlement. An area or place chip has no gaps (the switch reads each chip's class, item
120 (i)).

**(3) The look at village scale** (item 120 (e), (f)). The veil and the halo are §8.2's rows at every band. At a village
rung the city band is the township view (V07 §5.2): a match whose plot falls there under about 6 px — most tofts at VILLAGE
and HAMLET, the narrow ones at THORP — carries its chip's pin, and pins closer than about 24 px merge into a count bubble, so
a village's two smithies at the ford and the green may read as one bubble "2" at the township view and as two glowing tofts
at the district band. An area chip lifts its whole area from the veil and glows along its boundary: an end's the outline of
the union of its plots' faces (V07 §3.10), a field group's the outline of its furlongs, the village's its perimeter (V07
§3.7). A match in the hinterland glows as any other, the territory frame lying wholly inside the zoom-out limit (item 116;
V07 §5.2), so no match lies beyond the view's reach. **Across layers**: on Below, a dwelling or an access in a cavern or ruin
(V07 §3.16 (3), (5)) glows on the underground layer and shows as a ghost pin on Ground (V04's part); an island a fallen city
left (V05 §3.15 (6)) carries its matches on Sky (V05's part); at the interior band an institution's rooms glow as V03's part
gives them.

**(4) Over time and edits** (item 120 (f)). Every commit, regenerate, undo, village epoch and hand-off re-evaluates the
chips at once: a smithy that opens at an epoch glows in that commit and one whose use closes goes dark. A chip whose target
the map no longer holds — an end superseded at a hand-off up or merged away, a field group tombstoned — stays in the grid at
count 0, dark, until the viewer removes it or presses Clear; a hand-off down revives an end at its address (V07 §3.12), and
its chip lights again. After a hand-off up the town's districts and quarters are offered by V01's reading, and the old
village's ends, sub-area labels on the quarter tree (V07 §3.12 step 2), are no longer listed.

**(5) The clerk, exports and cost** (item 120 (i), (j)). The clerk's "show me the smithies" sets the chips (V10; a view
action, never an edit). A picture export of a village draws Find as shown, its chips in the legend (V07 §5.4; §11.1); a VTT
scene leaves it off unless asked. Find is an interaction, not a one-time wait (item 119 (d)): suggestions within about 50 ms
of a key and a chip's glow within about 100 ms of the click, its index rebuilt once per commit and the base tiles never
re-rendered (item 120 (j)) — at the VILLAGE top an index of about 540 footprints, 25 village classes with the dossier's
names, at most 6 ends and the field groups of a few hundred furlong faces."""

WAITS_PARA = """**One-time waits** (item 119, the village's part; J-V7.144). The laws above stay the **targets** — as fast as possible, the
build pressing every path toward them (item 119 (a)). The **comfort level** is ten seconds of total time: every wait a user
sits through once at THORP, HAMLET and VILLAGE — generate, regenerate, opening a map from SettlementForge, a dossier change
applied, an epoch (advancing time) and item 113's history replay (V07 §3.12, V07 §3.12a), an export (V07 §5.4) and a
migration — completes within 10 s from the click to the complete result on §12.1's reference machine, at every village size
(T-V7-67); past it a wait is a failure. An epoch run and the history replay are timed against it as V06's part of item 119
times them, the village's figures above being their inputs. A step runs slower than its target only for a measured gain,
recorded as its `perf.qualitySpend` row (V11 §3.25.8; §4.1's quality budget: the step, its cost and its gain) and still inside
the comfort level (item 119 (b)); no village stage ships one. A wait beyond about one second shows progress — the stage by
name and the map filling in, never an empty screen — through V09 §4.21.9's progress view (item 119 (c)); the first picture is
still the complete district band (§8.5). The edit and switch budgets above (every edit's p95, the season switch's re-skin)
and every frame budget the village's views read from §12.5 are interaction budgets, unchanged by item 119 (d); the first
map's bound is a target like the laws. The low tier (§12.1) aims at the same
comfort level, a size it cannot reach declared per device (item 119 (e)). At every village size the targets lie far inside
the comfort level (the model law tops out near 130 ms), so item 119 moves no village figure: it re-reads a missed target —
the VILLAGE row above ≈ 1 100 people and the fallback's re-declared bar — as a declared target miss inside the comfort level,
never a veto question."""
