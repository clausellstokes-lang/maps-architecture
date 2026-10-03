# repair-r3-V01 edits (coherence/repair-V01-r3). Each edit: (tag, old, new, count) applied to the text as it stands
# after the edits before it; the generator asserts the count. Line-ranged olds are read from V01.orig.md (the live V01 as
# assemble-r2 installed it) and asserted by their opening words, so a moved line fails loudly.
import os
S = os.path.dirname(os.path.abspath(__file__))
ORIG = open(os.path.join(S, 'V01.orig.md'), encoding='utf-8').read().split('\n')


def L(a, b, starts):
    """lines a..b (1-based, inclusive) of the original, joined with a trailing newline; asserts line a's opening."""
    assert ORIG[a - 1].startswith(starts), (a, ORIG[a - 1][:80])
    return '\n'.join(ORIG[a - 1:b]) + '\n'


def build(text):
    E = []

    # ---- §1.2: the item-122 hook row (VV12-r2-01 per R3-09 (b); VV78-r2-06 per R3-14 (5); R3-24's frame) ----
    E.append(('1.2-122-calamity',
              "§2.9's `crises` key, §4.11's `CalamityRef` in the committed `epoch` events (DR28), §7.7's DR44,",
              "§2.9's `crises` key, §7.7's DR44,", 1))
    E.append(('1.2-122-sources',
              "§11.2's admission; V06 §2.4's calamity table; V07 §3.10's ends; V02 §5.7 | the standing overlays a look "
              "draws and a preview; the calamities the port carries;",
              "§11.2's admission; V08 §2.3's carried `condition` fact — its `calamity` field (V08 §3.16 (7) (d)) — and "
              "the carried `calamity` fact that field names, read as §4.11's `CalamityRef` (V08 §3.6 (3)); V06 §2.4's "
              "calamity table; V06 §3.15.2's history frame at a scrubbed week; V07 §5.6 (2)–(3)'s village readings "
              "(`villageDisasterUnits`, `villageUnitPlots`); V02 §5.7 | the standing overlays a look draws and "
              "a preview; the calamity each condition links, as the port carries it;", 1))

    # ---- §1b: disasterSource's row (VV12-r2-01, VV78-r2-06, R3-24 END) ----
    E.append(('1b-disaster-in',
              "the committed `epoch` events' `CalamityRef`s (§4.11; V08 §3.6 carries them) and V06 §2.4's calamity "
              "table;",
              "its condition's carried `calamity` field and the carried `calamity` fact it names (V08 §2.3; V08 §3.16 "
              "(7) (d)), read as a `CalamityRef` (§4.11; V08 §3.6 (3)), and V06 §2.4's calamity table;", 1))
    E.append(('1b-disaster-village',
              "the view's key (§11.2's admission); at THORP, HAMLET and VILLAGE V07's units (V07 §3.10) | V02 §5.7's "
              "ruined look (every building of each unit; the fire's blackening from `pattern`);",
              "the view's key (§11.2's admission); the model the view draws (the head, or V06 §3.15.2's history frame at "
              "a scrubbed week); at THORP, HAMLET and VILLAGE V07 §5.6 (3)'s `villageDisasterUnits` and their land "
              "`villageUnitPlots` | V02 §5.7's ruined look and V03 §5.6's plan damage (every building of each unit — at "
              "the village rungs on its `villageUnitPlots`; the fire's blackening from `pattern`);", 1))
    # §1b: campLand's row (VV12-r2-02 per R3-14 (1); VV78-r2-06; END of VAF-R2T-04)
    E.append(('1b-campLand-in',
              "the ground's hinterland `LandUse` faces (`commons`; `arable` and `strip_field` in their rotation's fallow "
              "course, §4.9; the open verges of the arterials leaving the town), the districts' outer boundary and the "
              "outermost enceinte's outer strip, the gates' passages, the under-deck strips (V01 §3.17.3); "
              "`hood.constants`' `camp.reachM` | §10.2's camp places (`beyondWalls`, `approachRoads`' fallback, "
              "`approachByGate`, `outside`, `gatesAndKeep`'s camp), which rank its faces — the refugee camp's by V06's "
              "`frontierFor`; T-V1-60 |",
              "the ground's hinterland `LandUse` faces (`commons`; `arable` and `strip_field` in their rotation's fallow "
              "course, §4.9 — by the built edge and on the verges of the arterials leaving the town, never a field in "
              "crop, a meadow or a pasture), the districts' outer boundary and the outermost enceinte's outer strip, the "
              "arterials and their gates, the gates' passages, the under-deck strips (V01 §3.17.3); at THORP, HAMLET and "
              "VILLAGE the village's records — the perimeter, the palisade's outer strip, the furlongs in their fallow "
              "course and the entries' ways (V07 §5.6 (2)); `hood.constants`' `camp.reachM` | §10.2's camp places "
              "(`beyondWalls`, `approachRoads`, `approachByGate`, `outside`, `gatesAndKeep`'s camp), which rank its "
              "faces — the refugee camp's by V06's `frontierFor` — and §10.2 (e)'s density cap over its free land; "
              "T-V1-60 |", 1))
    # §1b: the dossier row (VV12-r2-01)
    E.append(('1b-dossier-row',
              "| the disaster look's units (`disasterSource`, V01 §3.16) | `calamityHistory[]` (`type`, `tick`, "
              "`targets`) as V08's `calamities`; the stressors and active conditions as `ConditionOverlay`s | DR28 (the "
              "calamity's `CalamityRef` in `EpochInputs.events`), DR44 (the crisis look) | read from the committed "
              "`epoch` events and overlays at the view's key; a look only, never a model write |",
              "| the disaster look's units (`disasterSource`, V01 §3.16) | `calamityHistory[]` (`type`, `tick`, "
              "`targets`) as V08's carried `calamity` facts (V08 §3.5 (6)); `activeConditions[]`' crisis field "
              "`calamity` (V08 §3.16 (7) (d)); the stressors and active conditions as `ConditionOverlay`s | DR44 (the "
              "crisis look: the linked calamity's `targets` and type); the aftermath is DR28's epoch path (the "
              "calamity's `CalamityRef` in `EpochInputs.events`, V06 §3.22), never read here | read from the carried "
              "facts (`Document.dossier.carried`, V08 §2.3) and the overlays at the view's key; a look only, never a "
              "model write |", 1))

    # ---- §2.3: DisasterUnit's and DisasterSource.calamity's comments (VV78-r2-06; END of VV12-r2-04) ----
    E.append(('2.3-unit',
              "at THORP, HAMLET and VILLAGE V07's unit, built in this shape by V07\n",
              "at THORP, HAMLET and VILLAGE V07's unit, built in this shape by V07 §5.6 (3)'s `villageDisasterUnits`, "
              "its land `villageUnitPlots`\n", 1))
    E.append(('2.3-calamity',
              "calamity: CalamityRef | null /* the overlay's calamity (§4.11; V01 §3.16 (2)): its `type` read by V02 "
              "§5.7 (4); null for a preview or where none falls in its weeks */;",
              "calamity: CalamityRef | null /* the overlay's calamity (V01 §3.16 (2)): null for a preview, a stressor's "
              "overlay or a condition with no `calamity` field */;", 1))

    # ---- §3.4.1: the cliff band a hole of the template face (VPC-R2-05, the mechanism (7) cites) ----
    E.append(('3.4.1-holes', L(965, 971, "—, a locked plot's face kept"),
              "—, a locked plot's face kept by §7.2's protection in a re-derivation, a fixed input of V01 §3.5.12, every raised part's\n"
              "under-deck strip, V01 §3.17.3, and §4.6 S8's cliff band inside the district, V01 §3.6 (7)) stay holes: every seed avoids\n"
              "them (V01 §3.4.2 (d)) — a strip crossed only through an `open` span (V01 §3.17.3 (3)) — and §4.6's holed laws cut the\n"
              "faces that contain them. An under-deck strip or a cliff band that crosses a face from boundary to boundary cuts it, and\n"
              "the template face is the largest piece, its area measured without the strip or the band. A held retaining wall is a\n"
              "line, not a hole (V01 §3.17.2). A committed face that no longer qualifies (every face a hole, a strip or a zero-area\n"
              "piece) leaves D without a template face: the seeds lay nothing and F-TEMPLATE's chain ends at `bent-cut` (V01 §3.13).\n",
              1))

    # ---- §3.6 (7): the cliff band's two edges (VPC-R2-05) ----
    E.append(('3.6-7-band',
              "   it (\"the cliff is the wall here\", the clerk's line, item 106 (g)).\n8. **Terraced wards**",
              "   it (\"the cliff is the wall here\", the clerk's line, item 106 (g)). The two edges of §4.6 S8's cliff band inside a\n"
              "   district — an S1 `cliff` feature or ground over `walls.barriers`' `cliff` threshold (V11 §3.16.1), widened by\n"
              "   `shoreSetback`'s `cliff` distance — read the same way: a hard `cliff` run, portal-free, the rear-plot rule (the plots\n"
              "   on each side back onto the band), never a wall street; no seed, fan or lane of a fabric lies in or crosses the band\n"
              "   (§4.6), which is a hole in the template face (V01 §3.4.1).\n8. **Terraced wards**", 1))

    # ---- §3.16: the crisis services ----
    # the services' `doc` (END of VRC2T-07, R3-24)
    E.append(('3.16-doc', L(2320, 2321, "  `matched` for any"),
              "  `matched` for any — §10.2's `affectedQuarter` place takes the first `matched` unit of a `quarantine` overlay as the\n"
              "  quarter its cordon closes. The crisis services' `doc` — this pair's and `campLand`'s — is the model the view draws:\n"
              "  the head, or the history frame V06 §3.15.2 gives at a scrubbed week (§8.2). Memoised per commit, overlay and key:\n",
              1))
    # (1) the village units (VV78-r2-06 per R3-14 (5))
    E.append(('3.16-1-units', L(2322, 2326, "  1. **The units.**"),
              "  1. **The units.** At TOWN and above — a standalone neighbourhood document at its `contextRung` — every district of the\n"
              "     ground arena's part 0 that the key admits, the hinterland pseudo-district excepted, each read as a `DisasterUnit`\n"
              "     (V01 §2.3). At THORP, HAMLET and VILLAGE, where the village product holds one district (PART III (4)), the units\n"
              "     are V07 §5.6 (3)'s `villageDisasterUnits` — its ends, or in an end-less thorp its toft groups — in the same shape,\n"
              "     each unit's land `villageUnitPlots` (V07 §5.6 (3)), whose buildings and faces V02 §5.7, V03 §5.6 and §8.2's\n"
              "     disaster row read for a returned unit, and the same rule picks among them.\n",
              1))
    # (2) the calamity (VV12-r2-01, amended per R3-09 (b))
    E.append(('3.16-2-calamity', L(2327, 2332, "  2. **The calamity.**"),
              "  2. **The calamity.** The overlay's calamity is the carried calamity its condition's `calamity` crisis field names\n"
              "     (V08 §2.3's `condition` fact under the overlay's key; V08 §3.16 (7) (d)): the carried `calamity` fact under that\n"
              "     key (V08 §2.3: its `type`, severity band and `targets`, the targets' binding keys resolved through the binding\n"
              "     table to entity ids, V08 §3.5 (6)), read as a `CalamityRef` built the way V08 §3.6 (3) builds the epoch's entry —\n"
              "     never from the committed `epoch` events, so a calamity carried with no event (one dated at or before the last\n"
              "     absorbed week) still gives its targets and its pattern. A condition with no `calamity` field, a key no carried\n"
              "     fact holds, a stressor's overlay and a preview give no calamity. Its **pattern** is its type's hazard in V06 §2.4's\n"
              "     calamity table: `fire` → **fire**, `flood` → **flood**; a `collapse`, a `drought`, a `null` hazard, a type no row\n"
              "     matches and no calamity → **scatter**.\n",
              1))
    # (3) the targets at the village rungs (VV78-r2-06 per R3-14 (5))
    E.append(('3.16-3-targets', L(2333, 2338, "  3. **The targets.**"),
              "  3. **The targets.** Each id of the calamity's `targets` names a unit. At TOWN and above: a use, or any entity on a\n"
              "     plot, by its plot's district, closed or not; a district, itself; a city-cut `QuarterNode`, each of its member\n"
              "     districts; a `HoodPlace`, its host's district. At THORP, HAMLET and VILLAGE a use or any entity on a plot names\n"
              "     the unit holding its plot, and a target naming the `village` district names every unit (V07 §5.6 (3)). A target\n"
              "     the key withholds (§9.2's admission) is skipped and never reported to that key; one that names no unit — its\n"
              "     plot re-derived away, in the hinterland, on another arena, or at the village rungs a plot no unit holds (an\n"
              "     outlying farmstead's) — is `unmatched`, reported in the view telemetry, and the pattern fills the share.\n",
              1))
    # (5)'s stability over one drawn model (R3-24's END made consistent) and the closing sentence (END of VPC-R2-09)
    E.append(('3.16-5-stable', L(2353, 2359, "     order — all of a shorter fire order"),
              "     order — all of a shorter fire order, the shortfall reported in the view telemetry. So the set grows with the\n"
              "     severity, holds every matched target, and is the same in every view and export of a week and in every week the\n"
              "     overlay stands over one drawn model (the head, or one history frame).\n"
              "  Several disasters at once are computed apart, each keyed by its own condition; a unit in two sets draws the higher\n"
              "  level (V02 §5.7 (1)). The look leaves each building by V06 §3.22 (3)'s `crisisLookYields` (V06's hand-over), which\n"
              "  this service does not read; an edit or epoch that splits or merges a struck district changes the units at that\n"
              "  commit, each successor drawn by its own key.\n",
              1))
    # campLand: common or fallow land only (VV12-r2-02 per R3-14 (1)); the village reading (VV78-r2-06 per R3-14 (5))
    E.append(('3.16-campLand', L(2360, 2371, "* **`campLand(doc)`**"),
              "* **`campLand(doc)`** (item 122 (a)–(c); J-V1.105) — the outskirts' land a camp look may take, item 122 (b)'s common\n"
              "  or fallow land: `FaceRef`s in address order, on the ground arena's part 0 at every rung, memoised per commit. (1) The\n"
              "  hinterland's `LandUse` faces of kind `commons`, and the `arable` and `strip_field` faces in their rotation's fallow\n"
              "  course (§4.9), whose nearest point lies within `camp.reachM` (V01 §3.14) of the **built edge** — the outer boundary\n"
              "  of the ground districts' union, the hinterland pseudo-district left out, or the outermost enceinte's outer strip\n"
              "  where that lies beyond it; (2) the **verges of the approach roads** — the `commons` faces, and the `arable` and\n"
              "  `strip_field` faces in their rotation's fallow course (§4.9), bordering an arterial that leaves the settlement,\n"
              "  within `camp.reachM` of where it leaves (its gate, else the built edge). Never a face of another kind (no water,\n"
              "  marsh, wood, quarry, garden, orchard, meadow or pasture is camp land), nor a field in crop, nor one meeting a\n"
              "  gate's passage (its opening and 4 m along its way each side, §10.2 (d)), nor one an under-deck strip crosses\n"
              "  (V01 §3.17.3); a label's keep-out is the band's, cut by §10.2 (d)'s placement. At THORP, HAMLET and VILLAGE it reads\n"
              "  the village's records as V07 §5.6 (2) states — the perimeter (V07 §3.7), or the palisade's outer strip where that\n"
              "  lies beyond it, as the built edge; the furlongs in their fallow course as the fallow faces; the entries' ways as the\n"
              "  approach roads. §10.2's camp places rank these faces — the refugee camp's by V06's `frontierFor`. A standalone\n"
              "  neighbourhood document holds no hinterland land use (V01 §3.10.1), so its `campLand` is empty.\n",
              1))

    # ---- §3.18 (b): the village rungs' row (VV78-r2-06) ----
    E.append(('3.18-b-village',
              "item 122's two services act — `campLand` as at every rung, `disasterSource` over V07's units (V01 §3.16) |",
              "item 122's two services act — `campLand` on the village's records (V07 §5.6 (2)), `disasterSource` over V07 "
              "§5.6 (3)'s `villageDisasterUnits` (V01 §3.16) |", 1))
    # ---- §3.18 (e): the disaster's units row (VV12-r2-01, VV78-r2-06, R3-24) ----
    E.append(('3.18-e-disaster', L(2663, 2663, "| the disaster's units (V01 §3.16; item 122) |"),
              "| the disaster's units (V01 §3.16; item 122) | no unit (a document before S6, or every district withheld); "
              "one unit (a town of one district, a standalone neighbourhood document's preview, an end-less thorp of one "
              "toft group); the hinterland pseudo-district; severity 0 and 1; a share above 0 that rounds to none; more "
              "matched targets than k; a target naming no unit (its plot re-derived away, the hinterland, another arena, "
              "at the village rungs a plot no unit holds); a target the key withholds; at the village rungs a target "
              "naming the `village` district; no calamity linked to the condition (no `calamity` field, a key no carried "
              "fact holds, a stressor's overlay); a linked calamity carried with no epoch event (dated at or before the "
              "last absorbed week); a later calamity of another type in the condition's weeks; the dossier dropping the "
              "linked calamity; a calamity type no row of V06 §2.4 matches; a fire whose seed's adjacency component is "
              "smaller than k; calm (`Terrain.wind.strength` 0); a flood with no water-fronting unit; several disasters at "
              "once; an edit or epoch splitting or merging a struck district; a scrubbed week whose frame is not the "
              "head; the look standing when V06's real aftermath strikes its units | the empty list, nothing drawn; that "
              "unit; never a unit (V01 §3.16 (1)); the row's two ends; one unit; every matched unit (the dossier wins); "
              "`unmatched`, reported in the view telemetry, the pattern filling the share; skipped, never reported to "
              "that key; every unit (V07 §5.6 (3)); no target, scatter; its targets and pattern all the same; never read "
              "— the linked calamity's targets and pattern; the link V08 §3.16 (7) (d) makes at that absorb, else no "
              "calamity and scatter; scatter; the whole component, the shortfall reported in the view telemetry; the "
              "nearest neighbour first; the lowest unit first, then its neighbours; each set apart, a unit in two at the "
              "higher level (V02 §5.7 (1)); re-read at that commit, each successor drawn by its own key; the units over "
              "that frame (V06 §3.15.2); the set unchanged — the aftermath is the epoch path's and the look yields per "
              "building by V06's hand-over | check; leave out and report | T-V1-60 |\n", 1))
    # ---- §3.18 (e): the outskirts' row (VV12-r2-02, VV78-r2-06, R3-14 (6)) ----
    E.append(('3.18-e-outskirts', L(2664, 2664, "| the outskirts' land (V01 §3.16; item 122) |"),
              "| the outskirts' land (V01 §3.16; item 122) | neither common nor fallow land within reach (every field in "
              "crop; the outskirts all meadow, pasture, wood or water); no approach road (an unserved mesa, S3 (9) (a)); "
              "an arterial whose verges hold no common or fallow face; an island town with no land beyond its shore; a "
              "standalone neighbourhood document; a face meeting a gate's passage or crossed by an under-deck strip; a "
              "face an epoch builds over or an edit re-uses while a camp stands; at THORP, HAMLET and VILLAGE no entry, "
              "or no palisade | the empty list, so §10.2 (h)'s ring marks; no verges — the commons and fallow by the "
              "built edge alone, the places measuring from §10.2 (d)'s reference point; no verge on that road (§10.2 "
              "(d)'s `approachRoads` takes the `campLand` nearest where it leaves); the empty list, so §10.2 (h)'s ring "
              "marks; the empty list (no hinterland land use); left out; re-read at that commit, the camp re-placed by "
              "§10.2 (d) (a look only); with no entry no verges, the commons and fallow furlongs by the perimeter alone, "
              "and with no palisade the perimeter the built edge (V07 §5.6 (2), (7)) | leave out and report | T-V1-60 |\n",
              1))
    # ---- §3.18 (f): the cliff row (VPC-R2-05) ----
    E.append(('3.18-f-cliff', L(2680, 2680, "| a cliff and a district (a hard `cliff` run, item 106) |"),
              "| a cliff inside a district or on its boundary (a hard `cliff` run, item 106; inside, §4.6 S8's cliff band) "
              "| the run is portal-free; the district's plots back onto its setback line (the rear-plot rule) — inside a "
              "district, onto the band from each side —, no wall street, no template face across it, and no seed, fan or "
              "lane lying in the band or crossing it (V01 §3.6 (7), V01 §3.4.1) | — | T-V1-45 |\n", 1))

    # ---- §5.4 (6): the village units' land (VV78-r2-06: V07's `villageUnitPlots` names this reader) ----
    E.append(('5.4-6-village', L(3208, 3210, "its card's **Show** frame"),
              "its card's **Show** frame — is the union of the Ground shapes of its units' `FindArea`s: the districts\n"
              "`disasterDistricts` returns at the view's effective key (V01 §3.16), at the village rungs its units' land, the plots\n"
              "`villageUnitPlots` gives each (V07 §5.6 (3)). So the frame and Find's halo are one set of shapes, and a unit the key\n"
              "withholds is neither framed nor listed.\n", 1))

    # ---- §7: T-V1-45 (VPC-R2-05) ----
    E.append(('7-T45',
              "every barrier run typed hard by II.1's seam typing (item 541), 0 ground seams typed from `sheer` | fixtures "
              "| C | — |",
              "every barrier run typed hard by II.1's seam typing (item 541), 0 ground seams typed from `sheer`; on a "
              "fixture of a cliff across a district's interior (§4.6 S8's cliff band), laid by the bent cut and under the "
              "`street`, `ring` and `park` rows, 0 portals on the band's two edges, 0 wall streets along them, 0 seeds, "
              "fans or lanes lying in or crossing the band, and every plot along it backing onto it (the rear-plot rule; "
              "V01 §3.6 (7)) | fixtures | C | — |", 1))
    # ---- §7: T-V1-60 (VV12-r2-01, -02, -03; VV78-r2-06; END of VPC-R2-03; R3-24) ----
    E.append(('7-T60-head',
              "on B-CITY-lite at TOWN, CITY and the METROPOLIS cap and on a standalone neighbourhood document, with "
              "fixture calamities of every pattern — a fire under wind and under calm, a flood, an earthquake, a type no "
              "calamity row matches — and a preview:",
              "on B-CITY-lite at TOWN, CITY and the METROPOLIS cap, on a standalone neighbourhood document and on a VILLAGE "
              "fixture, with fixture calamities of every pattern — a fire under wind and under calm, a flood, an "
              "earthquake, a type no calamity row matches — each a carried calamity linked to a `reconstruction` "
              "condition (V08 §3.16 (7) (b)), and a preview beside them:", 1))
    E.append(('7-T60-a',
              "a fire's set connected over district adjacency, each unit after the first the frontier's farthest downwind "
              "of the seed (nearest under calm); a flood's grown from the water-fronting districts, lowest first;",
              "a fire's units after its matched ones each adjacent to a unit before it in the order and each the "
              "frontier's farthest downwind of the seed (nearest under calm); with at most one matched unit, the set "
              "connected over district adjacency; a flood's grown from the water-fronting districts, lowest first; on "
              "the VILLAGE fixture the units `villageDisasterUnits`' ends (V07 §5.6 (3)), never the `village` district;", 1))
    E.append(('7-T60-c',
              "(c) **stable**: the same set in every week the overlay stands, in every view and export, at pool sizes 0 "
              "and 3, on the five engines, with Show crises toggled and across a save and a load;",
              "(c) **stable**: the same set in every week the overlay stands over one drawn model (the head, or one "
              "history frame), in every view and export, at pool sizes 0 and 3, on the five engines, with Show crises "
              "toggled and across a save and a load; at a scrubbed week whose frame is not the head, the set read over "
              "that frame (V06 §3.15.2);", 1))
    E.append(('7-T60-d',
              "(d) **the targets**: a calamity naming a district's institution always strikes that district; a target "
              "an edit removed,",
              "(d) **the targets**: a calamity naming a district's institution always strikes that district; a "
              "`reconstruction` condition linked to a fire whose weeks also hold a later calamity of another type (a "
              "plague) strikes the fire's targets, with the `fire` pattern; a linked calamity carried with no epoch "
              "event (dated at or before the last absorbed week) strikes its targets, with its pattern; on the VILLAGE "
              "fixture a target on a toft strikes the end holding it, one naming the `village` district every end, and "
              "one on an outlying farmstead is reported `unmatched`; a target an edit removed,", 1))
    E.append(('7-T60-e',
              "(e) **`campLand`**: only `commons` faces, fallow `arable` and `strip_field` faces within `camp.reachM` of "
              "the built edge and the open verges of the arterials within that reach; 0 faces meeting a gate's passage "
              "or crossed by an under-deck strip, 0 on the sky or underground arenas; the same on a VILLAGE fixture;",
              "(e) **`campLand`**: only `commons` faces and fallow `arable` and `strip_field` faces, within `camp.reachM` "
              "of the built edge or bordering an arterial within that reach of where it leaves — 0 `arable` or "
              "`strip_field` faces outside their fallow course and 0 `meadow` or `pasture` faces; 0 faces meeting a "
              "gate's passage or crossed by an under-deck strip, 0 on the sky or underground arenas; on the VILLAGE "
              "fixture read on the village's records (V07 §5.6 (2)), 0 faces on the green or a plot;", 1))

    # ---- §9: J-V1.104 (VV12-r2-01 per R3-09 (b); VV78-r2-06) and J-V1.105 (VV12-r2-02) ----
    E.append(('9-J104-calamity',
              "to find **the overlay's calamity** among the committed `epoch` events' `CalamityRef`s by its week inside "
              "the overlay's weeks (the latest; ties by severity band, then id) and to read its pattern through V06 "
              "§2.4's calamity table (fire, flood, else scatter), over a new field on `ConditionOverlay` or a second "
              "table of calamity words, because item 122 adds nothing to the model (§2.7) and V06's table already types "
              "every calamity word the port carries;",
              "to take **the overlay's calamity** from its condition's carried `calamity` field (V08 §3.16 (7) (d)) — "
              "the carried calamity fact it names, read as a `CalamityRef` built as V08 §3.6 (3) builds the epoch's "
              "entry, not from the committed `epoch` events — and read its pattern through V06 §2.4's calamity table "
              "(fire, flood, else scatter), over an association of this volume's own by week or a second table of "
              "calamity words, because the port alone reads the condition's trigger tick, a calamity carried with no "
              "epoch event (dated at or before the last absorbed week) must still give its targets and its pattern, "
              "item 122 adds nothing to the model (§2.7) and V06's table already types every calamity word the port "
              "carries;", 1))
    E.append(('9-J104-unit',
              "to state one unit shape, `DisasterUnit`, which V07 fills with its village units at THORP, HAMLET and "
              "VILLAGE,",
              "to state one unit shape, `DisasterUnit`, which V07 fills with its village units at THORP, HAMLET and "
              "VILLAGE (`villageDisasterUnits`, V07 §5.6 (3)),", 1))
    E.append(('9-J105-land',
              "the hinterland's `commons` faces and fallow fields within `camp.reachM` (600 m) of the built edge, and "
              "the open verges of the arterials within that reach of where they leave the town —",
              "the hinterland's `commons` faces and fallow fields within `camp.reachM` (600 m) of the built edge, and "
              "the same land bordering the arterials within that reach of where they leave the town (their verges) —",
              1))
    E.append(('9-J105-common',
              "so a camp never blocks a gate or stands among piers; and to land it at M3b",
              "so a camp never blocks a gate or stands among piers; to take the land beside the road only where it is "
              "common or fallow, because the owner's camps stand on common or fallow land (item 122 (b)); and to land "
              "it at M3b", 1))

    # ---- §12: the shapes read (VV12-r2-01, VV78-r2-06) ----
    E.append(('12-shapes',
              "`ConditionOverlay`, §4.11's `CalamityRef`, §10.2's crisis tables and *Crisis looks*, V06 §2.4's calamity "
              "table,\n§2.3's `Terrain.wind` and §4.9's land use and rotation — as landed",
              "`ConditionOverlay`, V08 §2.3's carried `condition` and `calamity` facts, §4.11's `CalamityRef`, §10.2's "
              "crisis tables\nand *Crisis looks*, V06 §2.4's calamity table, V07 §5.6's village units and outskirts, "
              "§2.3's `Terrain.wind` and §4.9's\nland use and rotation — as landed", 1))

    # ---- T-V1-60's milestones: the VILLAGE clauses with V07's village readings (V07 §8) ----
    E.append(('7-T60-when',
              "From M5; clause (e) from M3b, with `campLand` (V01 §8.1) |",
              "From M5; clause (e) from M3b, with `campLand` (V01 §8.1); the VILLAGE fixture's clauses once V07's village "
              "readings land (V-M3, V07 §8) |", 1))
    # ---- §8.1: campLand's village reading is V07's W84 at V-M3 ----
    E.append(('8.1-M3b-village',
              "  clause (e) of T-V1-60 runs with it. ≈ 0.25 pw inside the base's M3b item-122 line.",
              "  clause (e) of T-V1-60 runs with it. Its reading at THORP, HAMLET and VILLAGE (V07 §5.6 (2)) lands with V07's village\n"
              "  readings at V-M3 (V07 §5.6 (8), V07 §8); a village map before it reads `campLand` as at TOWN. ≈ 0.25 pw inside the\n"
              "  base's M3b item-122 line.", 1))
    # ---- J-V1.104: the set's stability over one drawn model (§3.16 (5)); J-V1.105: the village records ----
    E.append(('9-J104-stable',
              "stay the same in every week, view and export,",
              "stay the same in every view and export and across the weeks of one drawn model,", 1))
    E.append(('9-J105-village',
              "it reads only records the base builds by M1. |",
              "at TOWN and above it reads only records the base builds by M1 (at the village rungs V07's, V07 §5.6 (2)). |", 1))
    return E
