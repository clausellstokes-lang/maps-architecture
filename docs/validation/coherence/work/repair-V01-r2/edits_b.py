# edits_b — G122-V01 (NEW DESIGN per adjudication-r2 R2-37 (4)–(5), R2-36): item 122's V01 part — the disaster look's
# units (`disasterSource`, `disasterDistricts`) and the outskirts' land (`campLand`), with their wiring, lifecycle, edges,
# budget, test (T-V1-60), build plan and decision rows (J-V1.104, J-V1.105). Applied after edits_a, on the text as edits_a
# leaves it. Each edit: (tag, old, new, count).


def build(text):
    E = []
    T = 'G122-V01'

    # §0 — plain words.
    E.append((T + ' §0',
        "finish within ten seconds and show their progress as they go (V01 §6).\n",
        "finish within ten seconds and show their progress as they go (V01 §6).\n\n"
        "**Crisis looks (item 122).** While the SettlementForge record says a disaster has struck, whole neighbourhoods are drawn\n"
        "ruined — the ones the record names first, else as the disaster runs: a fire through neighbouring quarters downwind, a\n"
        "flood over the low ground by the water, an earthquake here and there — more of them the worse it is; and the camps of\n"
        "refugees, the sick or an army stand on the common and fallow land just outside the town. It is only a look: the town\n"
        "itself is unchanged, and what the crisis leaves behind arrives through the town's own history (volume 6).\n", 1))

    # §1.1 — what this volume builds.
    E.append((T + ' §1.1 item 14',
        "    catchments, through `findAreas` and `gapUnits` (V01 §5.4, V01 §3.16).\n",
        "    catchments, through `findAreas` and `gapUnits` (V01 §5.4, V01 §3.16).\n"
        "14. **File g item 122's neighbourhood part** (a look only; J135, J138): the units a disaster look ruins — whole\n"
        "    districts, the calamity's targets first, else its pattern, as many as its severity asks — through `disasterSource`\n"
        "    and `disasterDistricts`, and the outskirts' land the camp looks may take, through `campLand` (V01 §3.16,\n"
        "    V01 §5.4 (6)).\n", 1))

    # §1.2 — the hook row.
    s = text.index("| g item 120 (a)–(k) (J133); §2.9's view key `find`")
    e = text.index("\n", s) + 1
    row120 = text[s:e]
    E.append((T + ' §1.2 hook row', row120, row120 +
        "| g item 122 (a)–(f), (i) (J135, J138); §2.7's `ConditionOverlay` and its reader rule, §2.9's `crises` key, §4.11's `CalamityRef` in the committed `epoch` events (DR28), §7.7's DR44, §10.2's `RosterTables.crisis` (the `disaster` row's `scale`, `previewSeverity`) and *Crisis looks* (d)–(h), §8.1's render tag `crisis.place`, §2.3's `Terrain` (`heightCm`, `wind`), §4.9's land use and rotation, §11.2's admission; V06 §2.4's calamity table; V07 §3.10's ends; V02 §5.7 | the standing overlays a look draws and a preview; the calamities the port carries; the look rows and the placement that reads the outskirts | `disasterSource`, `disasterDistricts` and `campLand` (V01 §3.16); a disaster look's framed place in Find (V01 §5.4 (6)); T-V1-60 |\n", 1))

    # §1.3 — out of scope.
    E.append((T + ' §1.3',
        "  10's. This volume gives the town's area targets and Show gaps' units (V01 §5.4).\n",
        "  10's. This volume gives the town's area targets and Show gaps' units (V01 §5.4).\n"
        "* **Crisis looks** (item 122) — the table, the closed mapping and the placement §10.2's, the derivation §7.7's DR44,\n"
        "  the drawing §8.2's, a building's ruined look V02 §5.7's, the hand-over V06's, the village rungs' units V07's, the\n"
        "  switch, the preview, the crisis card and Find's `crises` section volume 9's, the explanations volume 10's, the rows\n"
        "  V11's and the bars V12's. This volume gives the disaster's units and the outskirts' land (V01 §3.16).\n", 1))

    # §1b — two wiring rows and the dossier row.
    s = text.index("| Find's area targets `findAreas` and Show gaps' units `gapUnits` (V01 §5.4, V01 §3.16; item 120) |")
    e = text.index("\n", s) + 1
    rowF = text[s:e]
    E.append((T + ' §1b rows', rowF, rowF +
        "| the disaster look's units `disasterSource` and `disasterDistricts` (V01 §3.16; item 122) | a standing `ConditionOverlay` whose look DR44 reads as `disaster`, admitted at the key, or a preview (§2.9's `crises`); the committed `epoch` events' `CalamityRef`s (§4.11; V08 §3.6 carries them) and V06 §2.4's calamity table; the ground districts (`DistrictContext.inhabitants`, `.water`), their seams, `Terrain.heightCm` and `Terrain.wind` (§2.3); §10.2's `disaster` row (`scale`) and `previewSeverity`; the view's key (§11.2's admission); at THORP, HAMLET and VILLAGE V07's units (V07 §3.10) | V02 §5.7's ruined look (every building of each unit; the fire's blackening from `pattern`); §8.2's disaster row (the `ruinTone` over the units, by its pattern); §10.2's `neighbourhoods` place, and its `affectedQuarter` place through `matched`; volume 9's crisis card **Show** and Find's `crises` row **Go to** (V01 §5.4 (6)); the view telemetry (unmatched targets, a fire's shortfall); T-V1-60 | §7.7's DR44; §10.2 *Crisis looks* (d); §8.2 |\n"
        "| the outskirts' land `campLand` (V01 §3.16; item 122) | the ground's hinterland `LandUse` faces (`commons`; `arable` and `strip_field` in their rotation's fallow course, §4.9; the open verges of the arterials leaving the town), the districts' outer boundary and the outermost enceinte's outer strip, the gates' passages, the under-deck strips (V01 §3.17.3); `hood.constants`' `camp.reachM` | §10.2's camp places (`beyondWalls`, `approachRoads`' fallback, `approachByGate`, `outside`, `gatesAndKeep`'s camp), which rank its faces — the refugee camp's by V06's `frontierFor`; T-V1-60 | §10.2 *Crisis looks* (d) |\n", 1))
    s = text.index("| the terraced ward (`terraceState`, V01 §3.17.1) | `site.terrain` | DR1 |")
    e = text.index("\n", s) + 1
    rowT = text[s:e]
    E.append((T + ' §1b dossier row', rowT, rowT +
        "| the disaster look's units (`disasterSource`, V01 §3.16) | `calamityHistory[]` (`type`, `tick`, `targets`) as V08's `calamities`; the stressors and active conditions as `ConditionOverlay`s | DR28 (the calamity's `CalamityRef` in `EpochInputs.events`), DR44 (the crisis look) | read from the committed `epoch` events and overlays at the view's key; a look only, never a model write |\n", 1))
    E.append((T + ' §1b dossier change',
        "commits and the opening pass (V04 §3.10) — and a fixed input (V01 §3.5.12) is never typed away. Every field stage 2\n"
        "does not read is another reader's or on §7.7 item 1's ignore-list.\n",
        "commits and the opening pass (V04 §3.10) — and a fixed input (V01 §3.5.12) is never typed away. A condition or calamity\n"
        "the dossier changes reaches the disaster's units at the commit that carries it (V01 §3.16): a look re-read, nothing\n"
        "re-derived. Every field stage 2 does not read is another reader's or on §7.7 item 1's ignore-list.\n", 1))

    # §2.3 — the two records and the three signatures.
    E.append((T + ' §2.3 records',
        "  area: PolygonCm[] /* a `district` unit's faces united, else the union of `plots`' faces; one per component, each drawn dashed with one \"none here\" */ }\n",
        "  area: PolygonCm[] /* a `district` unit's faces united, else the union of `plots`' faces; one per component, each drawn dashed with one \"none here\" */ }\n"
        "// Item 122's disaster units (V01 §3.16): view data — derived per commit, overlay and key, outside the document, its hash and the log\n"
        "interface DisasterUnit {   // one unit a disaster look may ruin: a ground district at TOWN and above; at THORP, HAMLET and VILLAGE V07's unit, built in this shape by V07\n"
        "  id: Id /* an entity's, whose render key keys the draws (V01 §3.16 (4)) */; centroid: PointCm /* its land's area centroid */; inhabitants: number /* a district's DistrictContext.inhabitants */;\n"
        "  meanHeightCm: Cm /* Terrain.heightCm's mean over its land (§2.3) */; waterFront: boolean /* a district's: DistrictContext.water.lengthM > 0 */;\n"
        "  neighbours: Id[] /* the units it shares a boundary run with (a district: a seam, II.1), in address order */ }\n"
        "interface DisasterSource {   // disasterSource's answer (V01 §3.16)\n"
        "  calamity: CalamityRef | null /* the overlay's calamity (§4.11; V01 §3.16 (2)): its `type` read by V02 §5.7 (4); null for a preview or where none falls in its weeks */;\n"
        "  pattern: 'fire'|'flood'|'scatter' /* the calamity's hazard in V06 §2.4's calamity table: fire, flood, else scatter; read by §8.2's disaster row and V02 §5.7 (4) */;\n"
        "  units: Id[] /* the units ruined: a prefix of the strike order, in that order (V01 §3.16 (4)–(5)) */;\n"
        "  matched: Id[] /* the units the calamity's targets name, admitted at the key: the first read by §10.2's `affectedQuarter` place */;\n"
        "  unmatched: Id[] /* its target ids, admitted at the key, that name no unit: reported in the view telemetry */ }\n", 1))
    E.append((T + ' §2.3 signatures',
        "//   gapUnits(chip: { classes: string[] }, key: Admission): GapUnit[] /* Show gaps' units of a kind chip on every layer (V01 §5.4 (3)) */\n",
        "//   gapUnits(chip: { classes: string[] }, key: Admission): GapUnit[] /* Show gaps' units of a kind chip on every layer (V01 §5.4 (3)) */\n"
        "//   disasterSource(doc: Document, overlay: ConditionOverlay | null, key: Admission): DisasterSource /* a disaster look's units; null: a preview of the `disaster` look; its only draws view render hashes (V01 §3.12, V01 §3.16) */\n"
        "//   disasterDistricts(doc: Document, overlay: ConditionOverlay | null, key: Admission): Id[] /* disasterSource(doc, overlay, key).units — §10.2's `neighbourhoods` (item 122) */\n"
        "//   campLand(doc: Document): FaceRef[] /* the outskirts' land a camp look may take, in address order (V01 §3.16; item 122) */\n", 1))

    # §2.7 — the derived list.
    E.append((T + ' §2.7 derived',
        "`FabricSignature`, the three services' answers, Find's area targets and Show gaps' units (`FindArea`, `GapUnit`: view\n"
        "data, outside the document, its hash and the log; V01 §5.4),",
        "`FabricSignature`, the three services' answers, Find's area targets and Show gaps' units (`FindArea`, `GapUnit`: view\n"
        "data, outside the document, its hash and the log; V01 §5.4), the crisis services' answers (`DisasterUnit`,\n"
        "`DisasterSource` and `campLand`'s faces: view data likewise; V01 §3.16),", 1))

    # §3.12 — no model stream.
    E.append((T + ' §3.12',
        "registered stage `S9b`, V01 §3.3.6).\n",
        "registered stage `S9b`, V01 §3.3.6).\n\n"
        "**Crisis looks draw from no concern** (item 122): `disasterSource`'s draws are view draws on §8.10's render keys under\n"
        "§8.1's render tag `crisis.place`, keyed by the condition's id (a preview's by its look kind), so a disaster strikes the\n"
        "same districts in every view and export and no stream, digest or hash moves (V01 §3.16 (4)); `campLand` draws nothing.\n", 1))

    # §3.14 — the camp reach column.
    s = text.index("| `hood.frameMargin`, `hood.starRadiusFloor`, `sky.plotShare` |")
    e = text.index("\n", s) + 1
    rowH = text[s:e]
    E.append((T + ' §3.14 camp.reachM', rowH, rowH +
        "| `camp.reachM` | V01 §3.16 (`campLand`: the outskirts' depth beyond the built edge and along the approach roads) | 600 m | number · `m` | [100, 3 000] | no (a drawing extent) | — | — | `own` (about ten minutes' walk beyond the edge) |\n", 1))

    # §3.16 — the services.
    E.append((T + ' §3.16 intro',
        "Pure, draw-free functions of committed state, memoised per commit, each ≤ 1 ms per call at CITY (V01 §6; Find's two by\n"
        "their own lines):\n",
        "Pure, draw-free functions of committed state, memoised per commit, each ≤ 1 ms per call at CITY (V01 §6; Find's two and\n"
        "the crisis services by their own lines; `disasterSource`'s keyed render hashes are view draws, V01 §3.12):\n", 1))
    E.append((T + ' §3.16 crisis services',
        "  `live.find` overlay, volume 10's `FindAnswer`, §11.1's picture exports.\n",
        "  `live.find` overlay, volume 10's `FindAnswer`, §11.1's picture exports.\n"
        "* **`disasterSource(doc, overlay, key)`** and **`disasterDistricts(doc, overlay, key)`** (item 122 (b); J-V1.104) —\n"
        "  the units a disaster look ruins: whole neighbourhoods, never a share of the buildings inside one. `disasterDistricts`\n"
        "  is `disasterSource(…).units`, which §10.2's `neighbourhoods` place reads; every building of each unit draws the\n"
        "  ruined look (V02 §5.7). `overlay` is a standing `ConditionOverlay` admitted at the key, or `null` for a preview of\n"
        "  the `disaster` look (§2.9's `crises`): `units` is read for an overlay whose look §7.7's DR44 reads as `disaster`, and\n"
        "  `matched` for any — §10.2's `affectedQuarter` place takes the first `matched` unit of a `quarantine` overlay as the\n"
        "  quarter its cordon closes. Memoised per commit, overlay and key:\n"
        "  1. **The units.** At TOWN and above — a standalone neighbourhood document at its `contextRung` — every district of the\n"
        "     ground arena's part 0 that the key admits, the hinterland pseudo-district excepted, each read as a `DisasterUnit`\n"
        "     (V01 §2.3). At THORP, HAMLET and VILLAGE, where the village product holds one district (PART III (4)), the units\n"
        "     are V07's — its ends (`VillageEnd`, V07 §3.10), or in an end-less thorp its contiguous toft groups — in the same\n"
        "     shape, and the same rule picks among them.\n"
        "  2. **The calamity.** The overlay's calamity is the `CalamityRef` (§4.11; carried by the port, V08 §3.6) of the\n"
        "     `calamity` entries of the committed `epoch` events whose week — the entry's `week`, else its epoch's — lies in the\n"
        "     overlay's weeks ([`sinceWeek`, `untilWeek`), or from `sinceWeek` on with no `untilWeek`): the latest, ties by\n"
        "     the higher severity band, then by `CalamityRef.id`. None falling there, or a preview, gives no calamity. Its\n"
        "     **pattern** is its type's hazard in V06 §2.4's calamity table: `fire` → **fire**, `flood` → **flood**; a\n"
        "     `collapse`, a `drought`, a `null` hazard, a type no row matches and no calamity → **scatter**.\n"
        "  3. **The targets.** Each id of the calamity's `targets` names a unit: a use, or any entity on a plot, by its plot's\n"
        "     district, closed or not; a district, itself; a city-cut `QuarterNode`, each of its member districts; a\n"
        "     `HoodPlace`, its host's district (at the village rungs, V07's unit holding it). A target the key withholds\n"
        "     (§9.2's admission) is skipped and never reported to that key; one that names no unit — its plot re-derived away,\n"
        "     in the hinterland, on another arena — is `unmatched`, reported in the view telemetry, and the pattern fills the\n"
        "     share.\n"
        "  4. **The strike order.** Every draw is a view draw: `u(unit) = RH32('crisis.place', the unit's render key, salt,\n"
        "     H32(the condition's id)) ÷ 2³²` (§8.1; a preview keys on `H32('disaster')`, its look kind, in the condition's\n"
        "     stead). The order opens with the matched units by ascending `u`, then grows by the pattern —\n"
        "     * **fire**: from the first matched unit, else from a seed picked by inhabitants (the unit of least\n"
        "       −ln u ÷ (inhabitants + 1)), each next unit the neighbour of a taken one lying farthest downwind of the seed\n"
        "       (`Terrain.wind`, §2.3; centroid to centroid) — under no wind (`strength` 0) the neighbour nearest the seed; the\n"
        "       order ends when no neighbour is left, so a fire never jumps a gap in the adjacency;\n"
        "     * **flood**: each next unit the lowest by `meanHeightCm` among the water-fronting units and the neighbours of the\n"
        "       taken ones — with no water-fronting unit, the lowest of all first;\n"
        "     * **scatter**: the remaining units by ascending `u` —\n"
        "     ties by `u`, then by address.\n"
        "  5. **The share.** With n units and s the `disaster` row's `scale` at the map's rung at the severity — the overlay's,\n"
        "     clamped to [0, 1], or `previewSeverity` for a preview — linear between its two ends (§10.2's *Crisis looks* (c)),\n"
        "     k is 0 where s ≤ 0, else round(s × n) clamped to [1, n]; `units` is the first max(k, |`matched`|) units of the\n"
        "     order — all of a shorter fire order, the shortfall reported in the view telemetry. So the set grows with the\n"
        "     severity, holds every matched target, and is the same in every week the overlay stands, every view and every\n"
        "     export.\n"
        "  Several disasters at once are computed apart, each keyed by its own condition; a unit in two sets draws the higher\n"
        "  level (V02 §5.7 (1)). The look's end in the week the `reconstruction` Works begins is V06's hand-over, which this\n"
        "  service does not read; an edit or epoch that splits or merges a struck district changes the units at that commit,\n"
        "  each successor drawn by its own key.\n"
        "* **`campLand(doc)`** (item 122 (a)–(c); J-V1.105) — the outskirts' land a camp look may take: `FaceRef`s in address\n"
        "  order, on the ground arena's part 0 at every rung, memoised per commit. (1) The hinterland's `LandUse` faces of kind\n"
        "  `commons`, and the `arable` and `strip_field` faces in their rotation's fallow course (§4.9), whose nearest point lies\n"
        "  within `camp.reachM` (V01 §3.14) of the **built edge** — the outer boundary of the ground districts' union, the\n"
        "  hinterland pseudo-district left out, or the outermost enceinte's outer strip where that lies beyond it; (2) the\n"
        "  **verges of the approach roads** — the `meadow`, `pasture`, `arable` and `strip_field` faces bordering an arterial\n"
        "  that leaves the settlement, within `camp.reachM` of where it leaves (its gate, else the built edge). Never a face of\n"
        "  another kind (no water, marsh, wood, quarry, garden or orchard is camp land), one meeting a gate's passage (its\n"
        "  opening and 4 m along its way each side, §10.2 (d)), or one an under-deck strip crosses (V01 §3.17.3); a label's\n"
        "  keep-out is the band's, cut by §10.2 (d)'s placement. §10.2's camp places rank these faces — the refugee camp's by\n"
        "  V06's `frontierFor`. A standalone neighbourhood document holds no hinterland land use (V01 §3.10.1), so its\n"
        "  `campLand` is empty.\n", 1))

    # §3.18 — the toggle, the two mechanism rows, the combinations.
    s = text.index("| Find on or off; Show gaps on or off (item 120) |")
    e = text.index("\n", s) + 1
    rowFind = text[s:e]
    E.append((T + ' §3.18 (c)', rowFind, rowFind +
        "| Show crises on or off, or a preview (§2.9's `crises`; item 122) | view only: with Show crises off nothing calls `disasterSource`; a preview reads no calamity, the scatter pattern at `previewSeverity`; the document, its hash, the log and every model value byte-identical (V01 §3.16) |\n", 1))
    s = text.index("| services (V01 §3.16) | an element under no district;")
    e = text.index("\n", s) + 1
    rowS = text[s:e]
    E.append((T + ' §3.18 (e)', rowS, rowS +
        "| the disaster's units (V01 §3.16; item 122) | no unit (a document before S6, or every district withheld); one unit (a town of one district, a standalone neighbourhood document's preview, an end-less thorp of one toft group); severity 0 and 1; a share above 0 that rounds to none; more matched targets than k; a target naming no unit (its plot re-derived away, the hinterland, another arena); a target the key withholds; no calamity in the overlay's weeks; a calamity type no row of V06 §2.4 matches; a fire whose seed's adjacency component is smaller than k; calm (`Terrain.wind.strength` 0); a flood with no water-fronting unit; several disasters at once; an edit or epoch splitting or merging a struck district; the look standing when V06's real aftermath strikes its units | the empty list, nothing drawn; that unit; the row's two ends; one unit; every matched unit (the dossier wins); `unmatched`, reported in the view telemetry, the pattern filling the share; skipped, never reported to that key; no target, scatter; scatter; the whole component, the shortfall reported in the view telemetry; the nearest neighbour first; the lowest unit first, then its neighbours; each set apart, a unit in two at the higher level (V02 §5.7 (1)); re-read at that commit, each successor drawn by its own key; the set unchanged — the aftermath is the epoch path's and the look yields per building by V06's hand-over | check; leave out and report | T-V1-60 |\n"
        "| the outskirts' land (V01 §3.16; item 122) | no commons or fallow within reach; no approach road (an unserved mesa, S3 (9) (a)); an island town with no land beyond its shore; a standalone neighbourhood document; a face meeting a gate's passage or crossed by an under-deck strip; a face an epoch builds over or an edit re-uses while a camp stands | the verges alone; the commons and fallow alone; the empty list, so §10.2 (h)'s ring marks; the empty list (no hinterland land use); left out; re-read at that commit, the camp re-placed by §10.2 (d) (a look only) | leave out and report | T-V1-60 |\n", 1))
    s = text.index("| a terraced ward and save and load |")
    e = text.index("\n", s) + 1
    rowL = text[s:e]
    E.append((T + ' §3.18 (f)', rowL, rowL +
        "| a disaster look and an opened close-up (item 122) | the close-up's chunk unchanged — the look is no input of it (V01 §3.8.3); its buildings draw V02 §5.7's ruined look over the `hatched` hatch (V01 §5.1.4), its hood pins as derived | — | T-V1-60 |\n"
        "| a disaster look and the dossier removing its calamity's target | the target `unmatched` at that commit, reported, the pattern filling the share | leave out and report | T-V1-60 |\n"
        "| a camp and a raised way (items 122, 110) | no camp face under an under-deck strip or among its piers: `campLand` leaves the face out | — | T-V1-60 |\n", 1))

    # §5.1.4 — the damage over the hatch.
    E.append((T + ' §5.1.4',
        "(§4.7) light the streets. §8.2's `states` rows apply with `hatched`'s tones; a ruined or Works-stage building's hatch is\n"
        "replaced by its state's program.\n",
        "(§4.7) light the streets. §8.2's `states` rows apply with `hatched`'s tones; a ruined or Works-stage building's hatch is\n"
        "replaced by its state's program. Item 123's damage and a disaster's ruined look (item 122) are V02 §5.7's in `hatched`\n"
        "as in every family: a hole takes its ring out of the hatched facets, the hatch per facet (V01 §5.1.2) stopping at its\n"
        "edge as at a facet's, a gap leaves its run of the outline undrawn, and the massing reading's tone and dash fall on\n"
        "`hatched`'s roof tones; no program of this volume draws either.\n", 1))

    # §5.3 — exports.
    E.append((T + ' §5.3',
        "export draws Find as shown (V01 §5.4 (5)).\n",
        "export draws Find as shown (V01 §5.4 (5)), and the crisis looks shown as §11.1 draws them — a VTT scene in its image\n"
        "only, never as walls or obstacles (item 122 (f)); this volume adds nothing to them.\n", 1))

    # §5.4 (6) — a disaster look's place in Find.
    E.append((T + ' §5.4 (6)',
        "glow is never delayed by its gaps, which draw when computed.\n",
        "glow is never delayed by its gaps, which draw when computed.\n\n"
        "**(6) Crisis looks in Find** (item 122 (f)). Find's `crises` section, a look's row and its crisis card are volume 9's\n"
        "(V09 §4.21.12); a look is no chip and no `findAreas` row. A disaster look's place — the land its row's **Go to** and\n"
        "its card's **Show** frame — is the union of the Ground shapes of its units' `FindArea`s: the districts\n"
        "`disasterDistricts` returns at the view's effective key (V01 §3.16), at the village rungs V07's units' land. So the\n"
        "frame and Find's halo are one set of shapes, and a unit the key withholds is neither framed nor listed.\n", 1))

    # §6 — the budget line and the interaction list.
    s = text.index("| Show gaps' units (`gapUnits`, V01 §5.4 (3)) |")
    e = text.index("\n", s) + 1
    rowG = text[s:e]
    E.append((T + ' §6 line', rowG, rowG +
        "| the crisis services (`disasterSource` with `disasterDistricts`, `campLand`; V01 §3.16, item 122) | `disasterSource` ≤ 1 ms per standing disaster overlay or preview at the METROPOLIS cap (one pass over the units' adjacency; the units' facts built once per commit and shared by every overlay), memoised per commit, overlay and key; `campLand` ≤ 3 ms at the METROPOLIS cap (one pass over the hinterland's land-use faces within `camp.reachM` through the face index), memoised per commit | §12.5's lazy per-tile budget for crisis looks: computed at the first visible tile that draws a look — an interaction, never a one-time wait (item 119 (d)) | M5 (`disasterSource`), M3b (`campLand`), on V09's app harness | the units' mean heights read on the hydrology grid instead of the height raster; `campLand`'s faces gathered for the tiles in view first and the rest on idle |\n", 1))
    E.append((T + ' §6 interactions',
        "hood-pin edit, T8's preview (the replace dry run) and Find's two lines — are interaction budgets, unchanged by item 119\n"
        "(d). The low tier (§12.1) aims at the same comfort level, a size it cannot reach declared per device (item 119 (e)). At\n",
        "hood-pin edit, T8's preview (the replace dry run), Find's two lines and the crisis services — are interaction budgets,\n"
        "unchanged by item 119 (d). The low tier (§12.1) aims at the same comfort level, a size it cannot reach declared per\n"
        "device (item 119 (e)). At\n", 1))

    # §7 — T-V1-60.
    s = text.index("| T-V1-59 | Find over the town")
    e = text.index("\n", s) + 1
    row59 = text[s:e]
    E.append((T + ' T-V1-60', row59, row59 +
        "| T-V1-60 | the disaster's units and the outskirts' land (item 122; V01 §3.16): on B-CITY-lite at TOWN, CITY and the METROPOLIS cap and on a standalone neighbourhood document, with fixture calamities of every pattern — a fire under wind and under calm, a flood, an earthquake, a type no calamity row matches — and a preview: (a) **whole districts**: `disasterDistricts` returns districts of the ground's part 0 only, never the hinterland pseudo-district, max(k, matched) of them for V01 §3.16 (5)'s k; a fire's set connected over district adjacency, each unit after the first the frontier's farthest downwind of the seed (nearest under calm); a flood's grown from the water-fronting districts, lowest first; (b) **monotone**: at one seed and condition the set at a lower severity a prefix of the set at a higher, severity 0 to 1 in steps of 0.05; (c) **stable**: the same set in every week the overlay stands, in every view and export, at pool sizes 0 and 3, on the five engines, with Show crises toggled and across a save and a load; (d) **the targets**: a calamity naming a district's institution always strikes that district; a target an edit removed, or one in the hinterland, reported in the view telemetry and the pattern filling the share; under T-V9-66's canary player view a withheld target neither struck by name nor reported; (e) **`campLand`**: only `commons` faces, fallow `arable` and `strip_field` faces within `camp.reachM` of the built edge and the open verges of the arterials within that reach; 0 faces meeting a gate's passage or crossed by an under-deck strip, 0 on the sky or underground arenas; empty on a standalone neighbourhood document and on an island town with no land beyond its shore; (f) **a look only**: the model digest, the document hash and the log byte-identical with every service called and not; (g) V01 §3.18 (e)'s two crisis rows and (f)'s crisis combinations, each with its outcome and rung; (h) **cost**: V01 §6's crisis line at the METROPOLIS cap. From M5; clause (e) from M3b, with `campLand` (V01 §8.1) | B-CITY-lite, fixtures, CI | C | — |\n", 1))

    # §8.1 — campLand at M3b.
    E.append((T + ' §8.1 count',
        "V01 §8.2's. Three small pieces land earlier because the base reads them or its goldens would otherwise shift twice:\n",
        "V01 §8.2's. Four small pieces land earlier because the base reads them or its goldens would otherwise shift twice:\n", 1))
    E.append((T + ' §8.1 M3b',
        "* **M5** — everything else. **The M5 way-name shift, declared:**",
        "* **M3b** — `campLand` (V01 §3.16) with item 122's base parts, since §10.2's camp placement reads it from M3b; its one\n"
        "  cell, `hood.constants`' `camp.reachM`, ships with the row at M1 and is not calibratable (no register entry), and\n"
        "  clause (e) of T-V1-60 runs with it. ≈ 0.25 pw inside the base's M3b item-122 line.\n"
        "* **M5** — everything else. **The M5 way-name shift, declared:**", 1))

    # §8.2 — W10, W11, the total and its lines.
    E.append((T + ' §8.2 W10',
        "| W10 labels, exports and Find's areas | the hood title, place labels, per-format content (V01 §5.3); Find's area targets and Show gaps' units (`findAreas`, `gapUnits`; V01 §5.4, item 120) | W5, W9 | 0.5–1 |",
        "| W10 labels, exports, Find's areas and the disaster's units | the hood title, place labels, per-format content (V01 §5.3); Find's area targets and Show gaps' units (`findAreas`, `gapUnits`; V01 §5.4, item 120); the disaster look's units (`disasterSource`, `disasterDistricts`; V01 §3.16, item 122), reading V07's village units in the same shape | W5, W9, the base's item-122 parts (M3b) | 0.75–1.5 |", 1))
    E.append((T + ' §8.2 W11',
        "| W11 verification | T-V1-1 – T-V1-59 (T-V1-50 – T-V1-54 with W18;",
        "| W11 verification | every T-V1 test (V01 §7; T-V1-50 – T-V1-54 with W18;", 1))
    E.append((T + ' §8.2 W11 T-V1-60',
        "T-V1-59 Find's, at M5 (Find's milestone) on V09's app harness with V09's Find panel;",
        "T-V1-59 Find's, at M5 (Find's milestone) on V09's app harness with V09's Find panel; T-V1-60 the crisis units' and the camps' land, its clause (e) from M3b;", 1))
    E.append((T + ' §8.2 total',
        "| **M5 total** | | | **27.25–36.25** |",
        "| **M5 total** | | | **27.5–36.75** |", 1))
    E.append((T + ' §8.2 note',
        "Items 119 and 120 add no line: Find's two pure services lie within W10's range and the one-time-wait clause of\n"
        "T-V1-29 and T-V1-59 within W11's, so the M5 total and §16's M5 row are unchanged.\n",
        "Items 119 and 120 add no line: Find's two pure services lie within W10's range and the one-time-wait clause of\n"
        "T-V1-29 and T-V1-59 within W11's. Item 122's disaster units are W10's 0.25–0.5 pw of new work, T-V1-60 lies within\n"
        "W11's range, and `campLand` is M3b's (V01 §8.1).\n", 1))
    E.append((T + ' §8.2 above base',
        "This is 13.25–18.25 pw above the base's hook-depth M5 line of 14–18:",
        "This is 13.5–18.75 pw above the base's hook-depth M5 line of 14–18:", 1))
    E.append((T + ' §8.2 above base list',
        "standalone unit runs, the file-g reads W12–W15, the emulation preset W17 and item 110's neighbourhood parts W18. §16's\n",
        "standalone unit runs, the file-g reads W12–W15, the emulation preset W17, item 110's neighbourhood parts W18 and item\n"
        "122's disaster units in W10. §16's\n", 1))

    # §8.3 — the package.
    E.append((T + ' §8.3',
        "`skyDistrictCount`, `findAreas` and `gapUnits` and the writer `plantRimWalk` (V01 §3.16, V01 §5.4),",
        "`skyDistrictCount`, `findAreas`, `gapUnits`, `disasterSource` with `disasterDistricts`, and `campLand`, and the writer\n"
        "`plantRimWalk` (V01 §3.16, V01 §5.4),", 1))

    # §9 — J-V1.26's price cited; J-V1.104, J-V1.105.
    E.append((T + ' J-V1.26',
        "| J-V1.26 | Chose to price **M5 at build depth, 27.25–36.25 pw** (V01 §8.2), over absorbing the additions in the base's 14–18,",
        "| J-V1.26 | Chose to price **M5 at build depth** (V01 §8.2's total), over absorbing the additions in the base's 14–18,", 1))
    s = text.index("| J-V1.103 | Chose to read item 119 for stage 2")
    e = text.index("\n", s) + 1
    row103 = text[s:e]
    E.append((T + ' J-V1.104, J-V1.105', row103, row103 +
        "| J-V1.104 | Chose to make **a disaster look's units whole districts** (item 122 (b): \"whole neighborhoods\"; the neighbourhood is the district a close-up opens, J-V1.35), taken as a prefix of one **strike order** — the calamity's matched targets first, then its pattern: a fire through district adjacency downwind from the first target or a seed weighted by inhabitants, a flood from the water-fronting districts lowest first on the terrain raster, an earthquake and every other kind scattered by keyed uniforms — the count the `disaster` row's share at the rung and severity, at least one while the share is above 0 and never fewer than the matched targets, over a per-building share or a fresh draw at each severity, because whole districts are what the owner asked for, a prefix makes the ruined set grow with severity and stay the same in every week, view and export, and the dossier's named place wins; to find **the overlay's calamity** among the committed `epoch` events' `CalamityRef`s by its week inside the overlay's weeks (the latest; ties by severity band, then id) and to read its pattern through V06 §2.4's calamity table (fire, flood, else scatter), over a new field on `ConditionOverlay` or a second table of calamity words, because item 122 adds nothing to the model (§2.7) and V06's table already types every calamity word the port carries; to state one unit shape, `DisasterUnit`, which V07 fills with its village units at THORP, HAMLET and VILLAGE, so one rule picks among districts and ends alike; and to report a target that names no unit in the view telemetry, the pattern filling the share, while a target the key withholds is skipped unreported, because a look must never point at what the viewer does not know (DR44's admission). The draws are view draws under §8.1's `crisis.place` tag, keyed by the condition's id (a preview's by its look kind), never a model stream (V01 §3.12). |\n"
        "| J-V1.105 | Chose to give the camp looks **`campLand`** — the hinterland's `commons` faces and fallow fields within `camp.reachM` (600 m) of the built edge, and the open verges of the arterials within that reach of where they leave the town — as a pure function of the document, leaving a label's keep-out to §10.2 (d)'s placement at the band drawn, over a view-dependent list or a reach tied to `siegeStandoffM`, because the placement already keeps every look off the keep-outs per band, the outskirts are a fixed stretch of land whatever crisis stands, and the siege's standoff is another distance (the camps beyond bowshot) that §10.2 applies to `beyondWalls` itself; to leave out faces meeting a gate's passage or crossed by an under-deck strip, so a camp never blocks a gate or stands among piers; and to land it at M3b with item 122's base parts, over M5 with the disaster's units, because §10.2's camp placement reads it from M3b and it reads only records the base builds by M1. |\n", 1))

    # §11 — the owner's items this volume applies.
    E.append((T + ' §11',
        "(items 102–112, 119 and 120, the catacomb and crypt rule of",
        "(items 102–112, 119, 120 and 122, the catacomb and crypt rule of", 1))

    # §12 — CONFIRMED and PLAUSIBLE.
    E.append((T + ' §12 CONFIRMED',
        "our own metric constants and provenance marks (§17.1). Items 119 and 120 were read at source\n"
        "(`docs/AMENDMENTS-2026-09-28g.md`) with their routing (J130, J133), and the shapes this volume reads from them — V11\n"
        "§3.25.8's `perf.qualitySpend`, V09 §4.21.9's progress view, V10 §2.13's `FindAnswer` — as landed or as their round's\n"
        "repairs state them.\n",
        "our own metric constants and provenance marks (§17.1). Items 119, 120 and 122 (with 122 (h)–(i)) were read at source\n"
        "(`docs/AMENDMENTS-2026-09-28g.md`) with their routing (J130, J133, J135, J138), and the shapes this volume reads from\n"
        "them — V11 §3.25.8's `perf.qualitySpend`, V09 §4.21.9's progress view, V10 §2.13's `FindAnswer`, §2.7's\n"
        "`ConditionOverlay`, §4.11's `CalamityRef`, §10.2's crisis tables and *Crisis looks*, V06 §2.4's calamity table,\n"
        "§2.3's `Terrain.wind` and §4.9's land use and rotation — as landed or as their round's repairs state them.\n", 1))
    E.append((T + ' §12 PLAUSIBLE constants',
        "`landmark.roundTol` and `hood.hillsidePct`; every budget (V01 §6),",
        "`landmark.roundTol`, `hood.hillsidePct` and `camp.reachM`; every budget (V01 §6),", 1))
    E.append((T + ' §12 PLAUSIBLE lines',
        "Find's two lines (the area list's unions and the gaps' raster passes at the METROPOLIS cap)",
        "Find's two lines (the area list's unions and the gaps' raster passes at the METROPOLIS cap) and the crisis services'", 1))
    E.append((T + ' §12 PLAUSIBLE patterns',
        "(T-V1-4's switch clause); and that every bar of V01 §7 is met.",
        "(T-V1-4's switch clause); that the disaster's three patterns read as a fire, a flood and an earthquake on B-CITY's\n"
        "waterfront and windy seeds, and that `camp.reachM` holds the camp looks' ground without crossing the frame's margin\n"
        "(T-V1-60); and that every bar of V01 §7 is met.", 1))
    E.append((T + ' §12 PLAUSIBLE early reads',
        "whole at M1 moves no M1–M4 golden, its four naming columns and M3a's two terrace cells being the only `hood.*` cells read\n"
        "before M5 (T-V1-4);",
        "whole at M1 moves no M1–M4 golden, its four naming columns, M3a's two terrace cells and M3b's `camp.reachM` (read only\n"
        "while a crisis look stands) being the only `hood.*` cells read before M5 (T-V1-4);", 1))
    return E
