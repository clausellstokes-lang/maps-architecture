# Adversarial review of draft OWNER RULE item 116: realism, nuance and edges

Reviewer: realism, nuance and edges lens. 2026-09-30. Subject: `item-116.md` (529 lines, as of 02:15), with
`draft-notes.md` and the readers' notes `read-base.md`, `read-vols.md`, `read-sf.md` and `read-owner-decision.md`.

**What I verified, and where.** I checked every claim below against the design files, not the readers' notes. The
section numbers are the coherence files' sections.

- **Base model** (`new/base/model/01-domain-model-and-schemas.md`): §2.3 `Terrain` (l.413–425); §2.5 `Plot` (l.657–658);
  §2.6 `Building.material`, `RoofSpec`, `MaterialRow` (l.820, 843–845); the *Materials* rule (l.1162–1174); §2.7
  `Enceinte`, `Bridge`, `RetainingWall`, `LandUse`, `SiteResources` and `MaterialLedger` (l.1621–1717).
- **Base pipeline** (`pipeline/01-s4-generation-pipeline.md`):
  - §4.2 S0 (l.207–246), S1 (10) (l.380–398), S2 (l.399–411, 479–490) and S3 (1), (6), (7) (l.497–600);
  - §4.5's significance and patronage rule (l.1351–1358);
  - §4.8 whole (l.2576–2693);
  - §4.9 S12a whole (l.2696–2820);
  - §4.11: the geometry floor and `builtBand` writers (l.3028–3067); history-first generation (l.3294–3343); salvage
    (l.3516, 3529–3535); Works (l.3651–3760).
- **Base kernel** (`kernel/01-geometry-kernel.md`): §3.2 (9), the frame law (l.137–160).
- **Base scope** (`scope/05-s1.md`): §1.1, the rung table (l.29–36).
- **II.7** (`pipeline/10-ii7-sewer-layer.md`): the undercity allocation (l.420–436); quarries (l.620–627).
- **Base determinism** (`determinism/01-s5-failure-handling.md`, `03-s7-editing.md`): §5.1's tiers (l.98–112); §7.2
  (l.475–495); §7.6 (l.1316–1350); §7.7 item 1 (l.1578–1600); DR1, DR3, DR15, DR19, DR31, DR32 and DR40 (l.1741–1780).
- **Volumes:**
  - V11 §2.5 (l.549–562), the goods table §3.7.1 (l.2039–2100), and §3.17–§3.19 whole (l.3289–3395);
  - V06 §3.11.2–§3.11.3 (l.1994–2031) and §2.2's fire row (l.655);
  - V04 §3.5.3 whole (l.1663–1704);
  - V05 §3.16 (4)–(6) (l.1480–1540);
  - V08's `site`, `access` and `deposits` rows (l.759–810) and §2.6b (3) (l.1148–1160);
  - V07's palisade rows (l.703–706);
  - V01 §3.7.3–§3.7.4 (l.1620–1642);
  - V03 §3.12 (5) (l.2045–2046).
- **Owner and parallel material:** the items 114–115 draft (`work/g114-115/items-114-115.md` (b)–(f)); items 19 and 23
  (`AMENDMENTS-2026-09-25b.md` l.135–150, 216–221); `OWNER-INSTRUCTIONS-2026-09-25.md` (l.84–90, 126); `lane-events.log`
  (l.1869).

**Verdict.** The draft is not ready to file. Its structure is right: one supply, one cost order and one pick; origins
recorded on fabric; the ruins as a native basis; prestige for institutions; the mix decided by cost and placed by mass.
Its main historical instincts are also right: brick where clay and fuel but no stone; a stone ground storey under timber;
adobe and mud roofs in dry country; reed and straw thatch; fire ordinances; spolia; churches dearer than their streets.

But **five defects are blocking**:

- R1, the native reach;
- R2, depleted deposits at generation;
- R4, enceinte kinds;
- R5, institutions;
- R18, the no-op pin.

Each gives a wrong or contradictory map on common inputs. There are also **17 further required changes (R3, R6–R17 and
R19–R22)** and a set of **small precision fixes (R23–R26)**.

Each defect below gives its evidence, what is wrong, and the exact change I require. The edge coverage matrix is in §C.

---

## A. Blocking defects

### R1. The native test is measured from the frame origin with fixed radii. At CITY and METROPOLIS this misses the town and removes the base's own quarries.

**Evidence.**

- The draft's (b) sets the radii: stone "on a cell within 2 000 m" of the frame origin (0, 0); timber within 5 000 m;
  clay within 2 000 m; reed or straw within 3 000 m.
- `draft-notes.md` D7 says the centre "lies in the frame's middle third … far inside every reach".
- The facts:
  - S3's centre lies "inside the frame's middle third" (pipeline §4.2 S3 (1), l.497).
  - The frame is centred on (0, 0) (kernel §3.2 (9), l.141).
  - The frame side at the target is CITY 5.0 km and METROPOLIS 8.0 km, and it grows with population (scope §1.1,
    l.35–36).
- At the METROPOLIS cap of 120 000 people the frame is 64 × 120/50 = 153.6 km², a 12.4 km side. The centre may then lie
  2.07 km from the origin on each axis, 2.9 km on the diagonal. At aspect 2 it may lie 2.9 km away on x alone.
- The base itself reads resources over the frame:
  - "`SiteResources.ore` ≥ 0.5 over the frame" is the mining test (l.392–394).
  - S12a seeds "quarries on stone, mines on ore, lumber at the woodland edge" anywhere in the hinterland's faces
    (l.2793–2796).
  - S2 counts "the site resources … within reach" (l.479–483).

**Defect.**

1. **The premise is false above TOWN.** The whole 2 km stone disc can miss the town. A metropolis standing on stone can
   read "stone not native", while a disc of empty country 2 km the other way decides its stone.
2. **The draft drops quarries the base places.** It adds "S2 demands … `quarry` … where stone is native by land" and
   "§4.9 sites quarries … only on native sources" ((k)). So a CITY whose only outcrop lies 3 km out in its own
   hinterland loses the quarry S12a sites there today. It then builds no stone at all without a named partner. This is
   unhistorical: a city's building stone came from quarries a few hours' cart away, and it is the owner's "nearby".
3. **Growth grants what the owner denies.** At THORP the arena (about 1.8 km across) is smaller than the disc. Frame
   growth at an epoch then exposes cells that were always inside 2 km, and a family becomes native by growth. That is the
   owner's "grow to have them", which he forbids for non-native materials.

**Required change.**

- **Rewrite (b)'s test.** Replace (b)'s first sentence and the "within N m" clauses with this text:

  > "A family is native by land when its source lies anywhere in the arena as the settlement was created (frame and
  > margin, §3.2 (9) — the scope S1's mining test already reads) or a dossier fact makes it so."

- **The tests by family:**
  - stone: `SiteResources.stone` ≥ 0.5 on any cell;
  - timber: `timber` ≥ 0.4 over ≥ 20 ha (at an epoch, the standing woods);
  - fired clay: `clay` ≥ 0.4 on any cell, with fuel as in R12;
  - thatch: a marsh, or `fertile` ≥ 0.4 over ≥ 10 ha (at an epoch, the standing arable).
- **The supply stays siting-independent**, so S1 (11) still runs before S2.
- **Measure τ's distance after siting.** d is the distance from S3's principal centre to the nearest source cell. It is
  written into `MaterialSupply.land.tau` at S3's commit, since S2 reads only `status` and every τ reader runs after S3.
  The native τ uses R14's carriage law by road, or by river where a navigable river joins source and centre. `haul` and
  the 1.3 cap are retired: one carriage law for one concept.
- **Frame growth never adds a native family by land.** Only a deposit's state, a timeline toggle, and standing woods or
  arable change the native set by land. This is stated in (j)(4) and tested (T116-26).
- **Remove the origin claims.** Delete D7's claim. Replace (r)'s V04 wording "measured from the frame origin" with: "V04
  keeps `reachM` from the town. A native stone site with no cell within `reachM` takes its whole volume from the surface
  quarry on the nearest native cell."
- **Restate T116-11:** "stone is native exactly when the creation arena holds a stone cell ≥ 0.5 or a dossier fact makes
  it so. V07's and V11's gates read the same test on every fixture."
- **Keep one fixed radius.** The pebble test for `cobble` keeps its 3 000 m from the centre, because pebbles are a
  street-side source.

### R2. Depleted and removed deposits at generation. The generated town loses the stone of the quarry it worked out.

**Evidence.**

- The draft's (b) deposit rule: "a family whose listed deposits are all `depleted` or `removed` is not native by land
  whatever the raster".
- The draft's (j)(7): the replay "treats a deposit listed `depleted` or `removed` today as available in every replay
  epoch before the last".
- The replay runs only for "a settlement with a known history" (pipeline §4.11 History-first, l.3295).
- V04 §3.5.3 (l.1687–1690) says generation "stands for the town's past", so every stone working is worked out.
- DR32 (determinism §7.7, l.1772) reads `stone_quarry`: a worked-out quarry at CITY and above is V04's quarry-ossuary
  candidate (`read-sf.md` §3.5).
- 96 of 155 births list a depleted deposit (`read-sf.md` §3.3). SettlementForge also *removes* long-depleted deposits.
- V08's deposits row draws a depleted timber deposit as "a stump field" (l.795–796).

**Defect.**

1. **Two readings of "the past".** Without a replay, which is the common case, a depleted `stone_quarry` makes stone
   non-native for everything generation builds. The consequences:
   - the town that worked the quarry out shows no local stone;
   - V04 lays no workings, because (i) counts only native-by-land stone;
   - DR32's ossuary candidate has no quarry.

   With a replay, the same deposit is treated as available for the past.
2. **Timber flips at the first epoch.** For timber the rule says "not native whatever the raster" at generation. At the
   first epoch the test reads the standing woods, which S12a laid from that same raster. So timber becomes native again
   with no event in between.
3. **Grades are not the family.** A depleted `shipbuilding_timber` means the ship-grade oak is cut out. It does not mean
   a forest-terrain town has no building timber.

**Required change.** Rewrite (b)'s deposit rule:

> "At generation — which stands for the settlement's past, as V04 §3.5.3 and item 113 read it — a listed `depleted` or
> `removed` deposit makes its family native by land for every build generation makes (origin `native`, basis `land`;
> V04 lays its workings worked out). This is exactly what the replay's epochs before the last do ((j)(7)). From the first
> live epoch (and in the replay's last), a point family whose listed deposits are all `depleted` or `removed` is not
> native by land: stone by `stone_quarry`, fired clay by `river_clay`, lead by `precious_metals`. For the area families
> (timber, thatch), a depleted deposit removes only its own land use (drawn worked out, V08). The native test reads the
> raster at generation and the standing land uses at an epoch — one test."

Add to (j)(7): "where the dossier's `resourceHistory` dates a depletion, the replay makes the deposit unavailable from
that epoch; 'before the last' applies only where it is undated."

Add to T116-12:

- "a generated map with a depleted `stone_quarry` has native stone fabric and worked-out V04 workings";
- "at CITY and above DR32's quarry-ossuary candidate has its working";
- "a depleted timber deposit on a forest site leaves timber native".

### R4. Enceinte kind against material. Material changes shape without a ruling, the mapping is not pinned, the pick sits at the wrong stage, and gates lose their own material.

**Evidence.**

- The draft's (i) says "a structure's KIND follows the picked material's mass". For town walls: "masonry, `timber` (a
  palisade) and `earth_bank` (a rampart) … Gates and towers take their enceinte's material … material never moves a
  wall".
- The draft's (m) keeps item 19 only "within its kind".
- `Enceinte.kind` is `'citadel'|'inner'|'outer'|'suburb'|'bailey'|'palisade'|'earthwork'` (model §2.7, l.1621).
- In §4.8:
  - "wall thickness by era 2–3 m" (l.2583);
  - towers are "a row per enceinte kind and rung", and village `palisade` and `earthwork` carry no towers (l.2619–2625);
  - the enceinte kinds are "stage rows in the table" (l.2669), fixed at S3 and S5a, before S7 cuts the strips by
    thickness.
- V07 draws a village's kind by weights, `palisade / earthwork / inner` 0.8 / 0.2 / 0 at THORP, with heights 300 / 180 /
  500 cm (l.705).
- The owner (2026-09-26, `OWNER-INSTRUCTIONS` l.126): "different materials for construction is only represented by a
  change in texture or color. It has nothing to do with the shape."

**Defect.**

1. **The TOWN case is undefined.** Take a TOWN wall whose pick is timber or earth. Either the kind becomes `palisade` or
   `earthwork`, or it stays `inner` or `outer`.
   - If the kind changes, thickness, height, towers and strip widths change. That is shape driven by material, which the
     owner's words forbid unless the item states and rules the interplay. The draft does not.
   - If the kind stays, the result is a 2–3 m "timber" curtain with round, octagonal or bastion towers. That is
     unhistorical: bastions were earth or masonry, never timber.
2. **The pick sits at the wrong stage.** The pick is at S7, but the kind is a stage row decided at S3 or S5a, and the
   strips depend on it.
3. **Gates lose their own material.** "Gates take their enceinte's material" erases the most common historical form: a
   masonry gatehouse on an earth-and-timber circuit, such as the brick bars of towns whose defences were a bank and
   ditch.
4. **The village kind draw is ungated.** V07's weighted kind draw can pick `palisade` on a site with no timber.

**Required change.**

- **Rewrite (i)'s town-wall bullet:**

  > "The enceinte's material is picked where its kind is fixed: at S3 for the first enceinte and at S5a for each later
  > one, over its kind row's materials at the works means.
  >
  > At TOWN and above, a masonry pick keeps the stage row's kind and its §4.8 rows. With no masonry candidate the
  > enceinte takes the `earthwork` construction: bank and ditch in `earth_bank`, with a timber palisade on the crest
  > where timber is available. Its section, strips and towers are read from the `earthwork` row at that rung (V11 writes
  > TOWN, CITY and METROPOLIS rows: bank base width and height; no towers along runs; a timber tower only at a gate).
  >
  > The tower kinds `bastion` and `octagonal` are drawn only on masonry. A gate picks on its own at works factor `gate`
  > 1.2 over masonry and timber, never lighter in mass than its enceinte.
  >
  > At village rungs, V07's kind draw renormalises over the kinds whose material is available (`earthwork` always is),
  > and a replacement retypes to the available masonry, else keeps the kind."

- **Add to (m)** the stated ruling:

  > "The owner's 2026-09-26 words govern every building and every structure's material within its kind. For
  > structures, the supply decides which KINDS can be built, as terrain decides where a ford can be — a physical
  > constraint of availability, never a material's look. The precedent is item 110 (b)'s owner-approved pier spacing by
  > masonry or timber. No building's geometry ever reads the supply."

- **Add a test:** T116-27 gains "no timber enceinte carries a bastion or octagonal tower; an earthwork enceinte's section
  is its row's; every gate is at least as heavy as its enceinte".

### R5. Institutions. Item 114's ceiling gives churches timber in stone country, and three of the draft's own claims contradict one another.

**Evidence.**

- The draft's (f) gives institutions `M = means.top × prestige × patronage × rungMeans`, where `means.top` is the `hi` of
  item 114's highest allowed band.
- Patronage is "1 + the dossier's wealth or rank … clamped to [1, 2]", so it is 1 on every standalone map (pipeline
  §4.5, l.1351–1358).
- Item 114's draft (b) allows a highest band of `modest`, so `means.top` = 2.3.
- Three claims in the draft:
  - (g), worked: "…only rich plots … reach it, and a parish church at prestige";
  - T116-7: "(stone native, timber by sea) every church masonry";
  - T116-29: "a church in a native-only timber town is timber, … with a river partner that has stone stone at its
    prestige".
- `tieBand` is 5 %.

**Defect.** Worked with the draft's own numbers:

| case | inputs | result | what it breaks |
|---|---|---|---|
| (1) river partner | standalone parish church, M = 10; river-borne rubble 10.6 | t = (10 − 8.48)/2.12 = 0.72, so stone on 72 % of seeds only | T116-29's "stone at its prestige" |
| (2) reverse case | native ashlar 5.75 and sea-borne timber frame 5.7 fall in one tie place | the church row's weights decide: a timber-frame church in stone country, unless timber has weight 0 | a zero weight removes the stave church T116-29 needs |
| (3) item 114 at `modest` | M = 2.3, below native rubble 3.45 | t < 0: a timber-frame parish church beside its own quarry | history: parish churches in stone and brick country were masonry from the twelfth century |

No single admission set satisfies all three claims under the pick as written.

**Required change.**

- **Add a fallback list.** `MaterialPreference` gains `fallback?: string[]`. Its materials join the candidates only when
  no admitted candidate is native (by land or by ruins at the site) or affordable (c ≤ M). A tie place never merges an
  admitted material with a fallback one.
- **Pin the prestige rows.** The prestige rows — `chapel`, `church`, `monastery`, `cathedral`, `castle`, the keep,
  `palace`, `town_hall`, `guildhall`, `tower_house`, `mage_tower`, `watchtower` (and `v.watchtower`) — admit masonry,
  with fallback `timber_frame` and `log`.
- **The consequences, which V11 compiles:**
  - an institution takes native masonry at any means (the cheapest native masonry when none is affordable);
  - it takes traded masonry only where its means reach it;
  - otherwise it takes its fallback: a stave church.
- **Restate (g)'s worked sentence:** "a parish church whose patronage reaches 1.06, and 72 % of standalone ones".
- **Restate T116-29 as bounds:**
  - the native-only timber town: 100 % timber;
  - clay and fuel: 100 % brick;
  - a river partner with stone: stone share = the share of institutions whose means reach it, ± the blend.
- **Keep T116-7.** It then holds by construction.
- **Add to T116-22:** "under the lowest ceiling, a stone- or brick-native town has every prestige institution in
  masonry".

### R18. The no-op pin contradicts the migration and the fields written with the switch off.

**Evidence.**

- The draft's (n): off, S11 reads the parity rows "with origin `rows` … byte-identical to the base". Also: "A document
  written before this item … replays byte for byte."
- The draft's (p), Migration:
  - ledger rows are rewritten to families;
  - `Bridge.material` → `rubble` or `timber`;
  - `Terrain.slate` and `.lead` → false;
  - origins → `rows`.
- The draft's (p) also has S1 (10) storing the flags.
- T116-1: "the model digest and every golden are byte-identical to the base".
- `MaterialLedger` is "inside the model digest" (model §2.7, l.1717). A building's attributes are hashed in its leaf in
  schema order (§6.2).

**Defect.** With the switch off, all of these land in digests:

- S11 still writes `origin`;
- S1 still stores the terrain flags;
- S7 writes `Bridge.material`;
- the migration rewrites every ledger row's key.

So T116-1 and "replays byte for byte" cannot both hold as written.

**Required change.**

- **Add to (n):**

  > "With `materials.supply.enabled` off, no field this item adds is written. `origin`, `mix`, `Bridge.material`,
  > `Way.material`, `RetainingWall.materialOrigin`, `Tunnel.lining`, `TradePartner.supplies`, `Terrain.slate` and
  > `.lead` (or R10's `fissile`) stay absent. The two appended uniforms are still drawn, which moves no other draw."

- **Replace the ledger migration row** with a read rule, since a migration row would rewrite stored data:

  > "a ledger row keeps the `material` it was written with. A pre-116 row's material id is read as its family through
  > V11's id → family map at read, never rewritten (`stone` → stone; `timber_frame`'s 'timber 8, infill 4' → timber
  > 8). Rows written with the switch on carry the family."

- **The migration table** then lists only absent-field reads. T116-1 holds against the pre-116 goldens.

---

## B. Required changes

### R3. The dossier's own evidence of local production is ignored. A dossier-backed quarry or brickworks can then stand in a town that has no stone or brick.

**Evidence.**

- The draft's (b) has deposits and rasters only. Its (k) demands producers "only where its family is available".
- Two income rows are material extraction: `Stone Quarrying` (29 of 155 dossiers, median 5 %) and `Timber Trade` (28;
  `research/sf/mapping.md` l.317).
- Catalogue kinds bind producers: `stone_quarry` → `quarry`, `brickmaker` → `brickworks`, `woodcutter_s_camp`, `sawmill`,
  `thatcher`, `peat_cutter`, `charcoal_burner` (`read-sf.md` §7, V11 §3.11).
- `read-sf.md` F9 names these as the dossier's signals at our rungs, where SettlementForge has no quarry kind.
- Item 20 (b) makes a dossier-backed element exist on every map. §7.7 item 11 (a) says no derived fact contradicts a
  dossier fact.

**Defect.** Take a dossier whose settlement earns 5 % from Stone Quarrying, or lists a `brickmaker`, or exports "stone",
but whose raster shows no stone or clay. It gets "stone unavailable" or "fired clay unavailable". Its dossier-backed
quarry or brickworks is still placed. The map then shows a brickworks in a town that has no brick.

**Required change.**

- **Add a row to (b)'s table**, "a dossier fact of local production". A family is native by land when the dossier shows
  the settlement itself producing it:
  - a dossier-backed record of a producing class (`quarry`, `brickworks`, `lumber_camp`, `sawmill`, `thatcher`; and
    `peat_works` for kiln fuel);
  - an income row `Stone Quarrying` or `Timber Trade`;
  - an active chain whose `resourceKey` maps to the family;
  - its own `economy.exports` resolving to a material good while `entrepot` is false.
- **Reason codes:** `native_dossier_producer`, `native_dossier_income`, `native_dossier_chain`, `native_dossier_export`.
- **S1 raises that family's raster floor**, as a landscape toggle does.
- **A current production fact outranks a depleted deposit** of the same family.
- **Wiring:** DR41's inputs gain these fields; V08 writes the rows; T116-12 gains the case.

### R6. Which preference row a consumer reads is not pinned. This loses the district rows, docks and shanty.

**Evidence.**

- V11 §3.19.3 (l.3369–3371): "the most specific key wins: a STRUCTURE key …, then class, then district kind, then growth
  stage".
- Its district rows:
  - `docks`: timber frame, brick, rubble; roofs clay tile and slate — no thatch;
  - `shanty`: wattle, boards; thatch, turf, canvas.
- The draft's (g)(1) says "the materials the consumer's `MaterialPreference` row admits", in the singular.
- The draft's (r) V11 row lists rows for classes, district kinds, `v.` classes, clusters and structures.
- The draft's F-MATERIAL ladder: "the preference row → the class family's generic row → the floor".

**Defect.** Nothing says which row a house in `docks`, a church in `shanty`, a warehouse on a quay deck, or a cluster
class reads. The base-model editor and the V11 editor, working in parallel, can pin different orders. The docks row's
exclusion of thatch (waterside fire and goods) survives only if the district row is read.

**Required change.** Add to (g)(1):

> "The row read is the most specific that exists: a structure key (`retaining`, `raised:<kind>`, `pier`, `deck`), then
> the class, then the district kind, then the class family's generic row. A district-kind row applies to every class
> without its own row in that district. F-MATERIAL steps down the same order."

V11 keeps these rows:

- `docks`: masonry and timber frame; tile and slate; no thatch or shingle;
- `shanty`: boards, wattle, cob and adobe; thatch, turf, mud and canvas.

### R7. Fire and flood. Most materials have no factor; mixed buildings read the wrong part; there are two fire cells.

**Evidence.**

- V06 §3.11.2 (l.1994–1997) lists flammability for "thatch or reed 1.0; timber, shingle or wattle 0.9; tile 0.45; stone,
  slate or brick 0.15 — the lower of roof and wall factors". Its (4) is `fire.rebuildShift` (§2.2, l.655).
- §3.11.3 (l.2028–2031): "timber, cob or wattle walls" collapse, and "masonry … never".
- The draft's (j)(6): "Flammability and flood collapse read a building's `walls` — for every mix part, the ground
  storey's and main range's material." It also adds `fire.ordinanceStretch` beside `rebuildShift` ((r) V06).

**Defect.**

1. **No factors for most ids.** `cob`, `adobe`, `log`, `timber` (boards), `dry_stone`, `stone_slate`, `lead`, `turf`,
   `mud` and `canvas` have no flammability or flood class. So the fire rebuild's "least flammable" is undefined for them.
   Adobe, the wall most vulnerable to flood, is missing from the collapse list.
2. **Fire reads the wrong part.** Reading the ground storey makes a stone-ground, timber-upper house read 0.15, a
   firebreak ("a row of stone houses stops it"). In fact its jettied timber upper storeys are what historic town fires
   ran along.
3. **Two cells for one rule.** `rebuildShift` and `ordinanceStretch` now coexist with no stated relation.

**Required change.**

- **Add two V11 columns to `MaterialDef`.** V06 reads them and keeps no list of its own.
  - `flammability`, with defaults:
    - thatch 1.0;
    - shingle, `timber`, `timber_frame`, `wattle_daub`, `log` and `canvas` 0.9;
    - clay tile 0.45;
    - turf 0.3;
    - cob, adobe and mud 0.2;
    - ashlar, rubble, `dry_stone`, brick, slate, `stone_slate` and lead 0.15.
  - `floodCollapse: boolean`, true for timber and earth masses (adobe, cob, wattle, log, boards) and false for masonry.
- **Mixed buildings:**
  - fire reads the most flammable wall part (`upper`: the upper storeys; `gable` and `outshots`: the lighter material);
  - flood reads the ground storey's material for `upper`, and the lighter material for `gable` and `outshots`, since
    both reach the ground.
- **Retire `fire.rebuildShift`** into the ordinance rule, one mechanism. Its parity value of 0 becomes
  `ordinanceStretch` off.
- **Add to T116-10:** "a mixed stone-and-timber house's flammability is its timber part's".

### R8. The WorksTable durations and pauses have no key for the new materials.

**Evidence.**

- §4.11 Works (2) (l.3669–3671): pauses for "masonry, stone and brick … in winter".
- Works (3) (l.3676–3684): durations by material ("a small timber house 2–6 … a stone house 17–52"); decay × 0.6 "for
  timber and thatch".
- The types (l.3751–3756): `WorksRow.material?: string`, `factor`, `WorksTable.pauses.material`.
- The draft does not mention the WorksTable anywhere.

**Defect.**

1. **No key for the new ids.** Adobe, log, stone slate, mud, boards and the mixed building have no duration or pause key.
   "masonry, stone and brick" already mixes a mass class with material ids.
2. **Earth has no season.** Earth walls have no season pause, although they were the most season-bound. Cob is raised
   in lifts that must dry; adobe is moulded and dried in the dry season.

**Required change.** Add a "Works" bullet to (i) and to the pipeline's row in (r):

- `WorksRow.material` and `WorksTable.pauses.material` key `MaterialDef.mass` (`masonry`, `timber`, `earth`).
- Default pauses:
  - masonry: winter, in temperate and cold climates;
  - earth: winter and the climate row's wet season;
  - timber: none.
- A mixed building reads its heavier part's row, because that part sets the pace.
- The decay factor of 0.6 applies to timber mass (log and boards included) and to thatch coverings.
- The parity presets keep `works.enabled` false.

### R9. The sewer layer's stone forecast, and the quantity of a mixed building's stone part.

**Evidence.**

- II.7's undercity allocation (l.428–430): "quarries from the stone resource and the roster's predicted stone stock".
  This is decided at S7b, before S11 picks anything.
- II.7.6 (l.620–627) and V04 §3.5.3 (l.1663–1666, 1693–1694) give the volume law: Σ over stone buildings of perimeter ×
  (eave − base) × 60 cm, plus enceintes and towers.
- The draft's (i): "buildings by their stone parts". Its (j)(5): "A mixed building credits each part by its share".

**Defect.**

1. **The forecast has no rule.** Nothing says how S7b predicts the native-land stone stock under item 116. The forecast
   and the voids as built then diverge on every stoneless or trade-stone town (absorbed by the reconcile, and reported
   each time).
2. **"Part" and "share" are undefined.** V04's law is a wall-area law; V11 §3.18's salvage is a footprint-per-storey law.
   Without one pinned geometry, V04, V11 and V12 will compute different stone quantities.
3. **Some stone is not counted.** The volume law counts buildings, enceintes and towers only. Native-stone bridges,
   quays, retaining walls and the new tunnel linings came from the same quarries.

**Required change.**

- **(a) Add to II.7's allocation, in the pipeline's late seat:**

  > "The predicted stone stock is the expected native-land stone wall volume of the roster's demanded buildings: the sum
  > over classes and bands of the class template's perimeter × height × the share of that band's means range whose pick
  > is a stone-family material over the supply. This is the expected value of (g), with no draws. It is 0 where stone is
  > not native by land."

- **(b) Add the part geometry to (h).** It is computed from S11's facts and read identically by V04, V11 §3.18 and V12:
  - `upper`: the ground storey's walls (perimeter × the ground storey's height) against the rest;
  - `gable`: the main wing's gable-end facets and the stacks against the rest;
  - `outshots`: the `back` and `service` wings' walls against the rest.
- **(c) Add native-stone structures to the volume law** — bridges, harbour works, retaining walls and linings — at V11
  §3.18's structure m³. Otherwise, state their exclusion in words.

### R10. Stone slates are over-produced.

**Evidence.**

- The draft's (a): `stone_slate` requires only `stone`, at 3.5, between clay tile (3.0) and slate (4.0).
- Slate is gated by `Terrain.slate`; stone slate by nothing.

**Defect.** Stone-slate roofs come only from fissile beds (certain sandstones and limestones). Granite, chalk and most
freestones never split. With `stone` as the only gate, every stone-native town gives its prosperous band stone-slate
roofs.

**Required change.**

- **One flag for fissile rock.** `Terrain.slate` becomes `Terrain.fissile: 'none'|'slate'|'flag'`, drawn on the same
  appended uniform with these probabilities by relief:

  | relief | P(slate) | P(flag) |
  |---|---|---|
  | plain | 0 | 0.05 |
  | rolling | 0.05 | 0.2 |
  | hilly | 0.25 | 0.25 |
  | mountainous | 0.4 | 0.15 |

- **Gate stone slate.** `stone_slate` requires `stone` AND `fissile = 'flag'`, and is `nativeOnly`. A partner's "slates"
  resolve to `slate`.
- **Stone flags on flat roofs.** `stone_slate` also covers `flat` roofs (stone flags on towers) where it is native. Mud
  stays the flat roof's floor.
- **Wiring:** T116-19 gains "stone slate only with `fissile = 'flag'`". The site request's `slate` toggle becomes
  `fissile`.

### R11. Fieldstone and cob. In stony uplands the poor build in cob, which is unhistorical.

**Evidence.** The draft's (a): `dry_stone` costs 1.6 × the stone haul τ (up to 1.3); `cob` costs 1.0, × 1.5 on poor
ground; wattle costs 1.2 × the timber τ.

**Defect.** On a stony upland site (fertile < 0.4, clay < 0.2), the cheapest walls are still cob (1.5) and wattle.
Fieldstone never is (1.6 × up to 1.3). So a Pennine- or Highland-type village of poor households builds in cob. Wherever
the ground was stony, clay-bonded or dry fieldstone was the poor's wall. It was gathered from the fields, not hauled
from a quarry, so the quarry haul does not apply to it.

**Required change.**

- `dry_stone` takes no carriage (τ = 1: fieldstone lies at hand) and a base cost of 1.3. It then undercuts cob only on
  poor ground (1.5), not on good ground (1.0).
- Recompute the worked tables.
- T116-19 gains: "on a stone-native site on poor ground, the squalid, poor and modest bands build ≥ 60 % dry stone".

### R12. Kiln fuel is a hard gate where history shows a price.

**Evidence.**

- The draft's (b): fired clay is native only with native fuel (timber, peat, or a coal deposit).
- `draft-notes.md` D12: firewood and charcoal keep the generic import for every other use.

**Defect.**

1. **Inconsistent with D12.** Fuel stays importable for hearths and smithies, but a kiln may not burn it.
2. **Unhistorical.** In fuel-poor clay country, baked brick existed but was dear: it went to temples and palaces while
   houses were sun-dried. A hard gate cannot produce that pattern.

**Required change.**

- Fired clay with native clay and no native fuel is native at a cost factor `materials.kilnFuelImportFactor`, default
  2.0, on `brick` and `clay_tile`, with reason `native_clay_fuel_imported`. So only prestige and rich builds reach it.
- With native fuel, as drafted.
- T116-17 gains: "an arid clay site without fuel: baked brick only on prestige institutions and the rich; houses adobe".

### R13. Timber scarcity at the large rungs.

**Evidence.**

- The draft's (b) timber test is binary: ≥ 20 ha.
- The draft's (k) reports `timber_short` but gives it no effect on cost.
- §4.9 (l.2749–2757): managedWoodHa = timber m³ per head-year × P ÷ yield; "what the frame cannot hold is the
  settlement's import".

**Defect.** At 0.15 m³ per head-year against a yield of 2 m³/ha-year, a METROPOLIS of 50 000 needs about 3 750 ha of
managed wood. If its arena holds 20 ha, it still builds every timber frame at the native price. Timber scarcity is
historically why large towns turned to brick and stone.

**Required change.**

- Native timber's cost is multiplied by `scarcity = clamp(managedWoodHa demanded ÷ wood the arena lays, 1,
  materials.timberScarcityMax)`, default maximum 3.
- At generation, "wood the arena lays" is S12a's laid wood predicted from the propensity; at an epoch, the standing wood.
- `timber_short` stays the report.
- T116-21 gains: "the timber share of the rich band falls as rung rises at one supply of wood".

### R14. Carriage is priced by value, not by load, and the route ratios are compressed.

**Evidence.**

- The draft's (e): `τ = importPremium × (1 + routeRate × bulk × dist)` multiplies the whole cost. routeRate is sea 0.3 ·
  river 0.45 · road 1.5, and dist is clamped to [0.5, 3] × 30 km.
- V11 §2.5 (l.555) defines `bulk` as "weight or volume per unit of value moved", per good, so it is shared by every
  material of a family.

**Defect.**

1. **Carriage scales with price within a family.** Sea-borne ashlar pays 5/3 of rubble's carriage for the same load.
   Historically, freestone was the stone worth shipping and rubble the stone not worth shipping.
2. **The ratio is too flat.** 1 : 1.5 : 5 is far flatter than pre-industrial ratios. Diocletian's edict, the usual
   benchmark, gives about 1 : 5 : 28 for sea : river : road, and medieval estimates are of the same order. With the
   draft's numbers, a 90 km sea leg (dist capped at 3: 1 + 0.3 × 3 × 3 = 3.7) costs more than a 15 km cart haul (1 + 1.5
   × 3 × 0.5 = 3.25). That contradicts the draft's own sentence "water carriage is far cheaper than land".

**Required change.** Rewrite (e):

- **Traded:** `c(m) = importPremium × (baseCost(m) × F(m) + ref(f) × routeRate[route] × bulk(f) × dist)`.
- **Native by land:** `c(m) = baseCost(m) × F(m) + ref(f) × routeRate[road|river] × bulk(f) × d ÷ refLegM`, with R1's d.
- **Native by ruins:** as drafted.
- **Terms:**
  - F is climate × culture × era × region;
  - ref(f) is the base cost of the family's reference material: stone `rubble`, fired clay `brick`, timber
    `timber_frame`, slate `slate`, thatch `thatch`, lead `lead`.
- **Carriage is paid per load**, so every material of a family pays the same carriage.
- **routeRate becomes sea 0.15 · river 0.45 · road 1.5**, keeping sea at least 10 times cheaper than road.
- **Recompute (g)'s worked numbers.** Rubble by river stays 10.6; ashlar by river 13.6; rubble by sea 6.5; by road 24.8.
- **T116-8 gains:** "the carriage of two materials of one family is equal; a 90 km sea leg costs less than a 15 km road
  leg".

### R15. Earth moles and breakwaters on open coasts.

**Evidence.**

- The draft's (i), harbour works: "quays, moles and breakwaters … over masonry, `timber_crib` and `earth_bank`".
- §4.8 (l.2682–2688) builds moles, breakwater arms and detached breakwaters "on the harbour and on the open coast".

**Defect.** An earth-bank mole or breakwater facing the sea is washed out. Historical moles were rubble mounds, masonry,
or timber cribs filled with stone.

**Required change.**

- `earth_bank` is admitted only for quays and moles on a river, an estuary, a lake or the carved basin.
- A sea-facing mole or breakwater admits masonry and `timber_crib`; otherwise it is omitted, reported
  `harbour_no_material` (`pier_no_material` is folded into it).
- T116-27 gains this clause.

### R16. The undercity and underground buildings have no material rule.

**Evidence.**

- V03 §3.12 (5) (l.2045–2046): an underground building's exterior walls are styled "by its host (the tunnel's masonry,
  the cavern's rock, item 109 (g)'s ruin masonry)".
- II.7.5's undercity plots are layer `underground`.
- The draft adds `Tunnel.lining`, which may be masonry, timber shoring or unlined.
- The draft's (p): "a building draws four uniforms … always". The word "undercity" does not appear in the item.

**Defect.** Nothing says whether S11 picks a material for a building on an `underground` plot, which would give a
squalid undercity dwelling cob walls in a rock chamber, or whether the host decides. The host's "masonry" is now a
lining that may be timber or absent.

**Required change.**

- **Add to (i):**

  > "A building on an `underground` plot takes its host's material:
  > - its tunnel's `lining` (unlined: `earth`; rock-cut: the role `rock`);
  > - a cavern's or quarry chamber's rock;
  > - a ruin's masonry (its recorded material, else `rubble`).
  >
  > Its origin is its host's. It draws its six uniforms and discards them, debits no ledger, counts in no quarry volume,
  > and its roof is `none`."

- **Add a row to (o):** "an undercity or underground building | host material | none needed | T116-33". T116-33 says:
  "every underground building's material is its host's; no pick".

### R17. Ruins at generation, and where a ledger credit lies.

**Evidence.**

- V08's deposits row (l.788–792): `ancient_ruins` → the ruin system and a surface ruin decoration.
- S12a's decorations (l.2809–2812) place ruins "in the `ruined` lifecycle state".
- V11 §3.18 (l.3334–3336): ancient-culture rows "build in long masonry".
- V05 §3.16 (6) (l.1536–1539): the ledger is credited `from` the island.
- The draft's ruins basis reads "sources within the haul radius (250 m)". Its (r) V04 row reads: "an ancient culture's
  ruins credit the ledger when robbed".
- The owner (`OWNER-INSTRUCTIONS` l.87): "old houses … repurposed for building material".

**Defect.**

1. **The classic spolia case is impossible at generation.** The ledger is empty then, unless a replay ran. A stoneless
   town beside a surface ruin of an older people cannot use it, though V04 makes the ruin: churches built of Roman brick
   and stone are the textbook case.
2. **Credits have no position.** The basis needs a position for each credit. A landfall names `from` the island, which
   is in the sky and has no ground position.
3. **The 250 m radius is unexplained.** It is the base's clearance-weighting radius. Historically, robbed stone was
   carted over kilometres. The item uses it for licensing without saying why.

**Required change.**

- **(1) Ruins credit the ledger once at generation.** A surface ruin in the arena (V04's ancient ruin, or a hinterland
  `ruin` decoration) credits the ledger once, `from` the ruin, epoch 0, with its robbable masonry: its footprint × V11
  §3.18's yield × the share V04's survival rule has already lost.
- **(2) Give every credit a position.** Ledger rows gain `at: PointCm`: the robbed entity's centroid; for a landfall, the
  `fallen_island` decoration's face centroid. On load, an absent `at` is read as the `from` entity's ground centroid.
- **(3) Rule the radius.** Either state why the base's 250 m haul radius bounds the licence, or give the ruins basis its
  own V11 cell, `materials.ruinsReachM` (default 1 500 m). If it gets its own cell, say that the 250 m keeps only its
  clearance-weighting role.
- **Wiring:** T116-24 gains "a stoneless site beside an ancient ruin has stone by ruins at generation, near the ruin
  only, while its stock lasts".

### R19. A refurbishment's built value is never written.

**Evidence.**

- §4.11 (l.3054–3063): a completed upward refurbishment "raises `builtBand` to that band". `builtProsperity` is not
  mentioned.
- The model's `Plot` (l.657) says `builtProsperity` is written only by "generation and the paths J-A31.44 lists".
- The draft's (j)(2): the refurbishment "re-picks at the new built value".

**Defect.** No rule writes `builtProsperity` on a refurbishment. So the "new built value" equals the old one, the re-pick
returns the same material, and the draft's "a quarter grown rich is rebuilt over time in dearer materials" is inert on
this path.

**Required change.** Add to (j)(2), and to J-A31.44's list in the pipeline's late seat: "a completed upward refurbishment
writes `builtProsperity` = the plot's field value at completion, clamped into the raised `builtBand`'s cuts".

### R20. Edges the draft leaves undefined: locks, a removed partner, terrain edits, growth, and a standalone quarry.

**Evidence.**

- §7.2 (l.477–480): "A **locked** entity … is a fixed input … A **pinned** entity keeps its existence and position; its
  other attributes may re-derive."
- The draft's (l) covers only declaring a partner.
- The draft's (o) has none of the rows below.
- V04 §3.5.3 (l.1703–1704): the surface quarry takes whatever the cells cannot supply, unbounded.

**Required change.** Add these rows to (o), each with its test:

| edge | outcome | fallback | test |
|---|---|---|---|
| a supply change (partner declared or removed, switch turned on, an epoch) reaching a locked building or structure | holds its material and origin | reported `held_locked` in the fates | T116-30 |
| the same reaching a pinned one | re-picks (only existence and position are held) | — | T116-30 |
| a declared partner removed from the creation slice, or its route edited | an `Adjust` scoped by the family slices; fabric whose origin names it re-picks unless locked or edited; a locked one keeps an origin that the why reads as "a partner since removed" | — | T116-30 |
| a terrain edit that changes a resource raster | re-derives the supply by the slice rule; the dry run lists the re-picked buildings ("stone now native: n re-picked") | — | T116-31 |
| frame growth at an epoch | adds no native family by land (R1) | — | T116-26 |
| a rung change at an epoch | new builds read the new `rungMeans`; standing fabric keeps its material | — | T116-26 |
| a standalone quarry | never exhausts by use (V04's surface quarry is unbounded); stone ends only by a timeline toggle, or on a dossier map by F13 | — | T116-26 |

Also pin two timings in (j):

- woods cleared by an epoch's conversions end native timber from the *next* epoch's prelude;
- the ruins basis is evaluated at each pick against the ledger as it stands, with builds in the epoch's order.

T116-3's "at the build epoch" reads the recorded slice of that epoch.

### R21. A bridge the dossier implies is dropped when no bridge material exists.

**Evidence.**

- V08 §2.6b (3) (l.1148–1160): for a `Toll bridge` record on a dry site, DR1 draws a brook so that the implied bridge
  exists. Such records appear in 11 dossiers.
- V08's landmarks row (l.810): a "…Bridge" string → a bridge.
- The draft's (i), Bridges: "with neither [material] … the crossing stays a `site`, reported `bridge_no_material`".

**Defect.** On a native-only site with neither timber nor masonry, the dossier's toll bridge, for which the design
creates a brook, or a "…Bridge" landmark loses its bridge.

**Required change.**

- **Add to (i), Bridges:** "a bridge the dossier implies (a `kinds` row's `implies: 'bridge'`, a '…Bridge' landmark) is
  always built. Its material comes from the pick, else `timber` with origin `dossier`, reported `material_dossier`."
- **Wiring:** a row in (o); T116-27's clause.

### R22. Paving over epochs, and the paving origin.

**Evidence.**

- V01 §3.7.3 (l.1631–1632): "An epoch re-derives surfaces on ways whose fronting band changes past the hysteresis."
- The draft's (i), Paving: no epoch rule, and no origin on a surface.

**Defect.**

1. **Setts could be torn up.** A band re-derivation after a stone partner leaves would re-read the supply and turn
   standing setts to dirt. That contradicts (j)(1): standing fabric keeps its material.
2. **The licence cannot be checked.** Without an origin, T116-3 cannot check a `paved` surface's licence.

**Required change.**

- **Add to (i), Paving:** "an epoch's surface re-derivation raises a surface only within the epoch's supply, and lowers
  it only by the band rule, never because a family became unavailable (laid paving stands). `Way.materialOrigin` is
  written for `paved`, `cobble` and `brick` surfaces too."
- **Wiring:** T116-28 gains the epoch clause.

---

## B′. Smaller precision fixes (each required; each is a line or a cell)

### R23. Thatch inside walled cities.

- **Defect:** many towns forbade thatch inside the walls without waiting for a great fire; the London assize of 1212 is
  the best known. The draft lets thatch, the cheapest covering, dominate the poor and modest roofs of every walled CITY
  and METROPOLIS.
- **Change:** add the V11 cell `materials.walledThatchFactor`: CITY 1.5 and METROPOLIS 2.0 on plots inside an enceinte
  from `c13`; TOWN 1.0. It is an extension row and is off in the parity presets.

### R24. The parity presets and the owner's refinement.

- **Defect:** under `MFCG`, `FTG`, `VG` and `NG` the switch is off, so an isolated settlement shows FTG's stone rows. This
  contradicts the owner's absolute "isolated settlements cant have non nattive materials", and the draft does not state
  it as an exception.
- **Change:** add to (n): "the parity presets emulate the references and are the one place the refinement does not bind
  (item 23's emulation, kept by the standing rule; a preset is none of §7.6's 'calibration run, fallback or corpus
  layer'). Every other preset and every region pack keeps it."

### R25. Item 19's "never a universal ladder" is not recorded as kept.

- **Evidence:** item 19 in `AMENDMENTS-2026-09-25b.md` (l.141–142) says the regional table "may shift materials with
  prosperity within what the region builds with — never a universal ladder".
- **Change:** add to (m)'s "Kept": "item 19's 'never a universal ladder': the cost order is each settlement's own, from
  its supply and its climate, culture, era and region factors. No fixed stone > brick > timber order exists."

### R26. Small precision items.

- **(a) Tie places.** Define how places are grouped: sort the candidates by cost ascending; a place begins at its
  cheapest member and holds every candidate with c ≤ 1.05 × that cost.
- **(b) Naming.** Replace "may take a name feature" with "offers V11's naming rows the feature `material`, a weighted
  guard like V01 §3.7.4's features".
- **(c) Tents.** A building whose roof kind is `tent` takes `canvas` for its walls and roof, with no pick.
- **(d) Glass sand.** V08's `glass_sand` → clay/`claypit` must map to *no* material family in the deposits row's new
  family column. Glass sand is not brick clay.
- **(e) `Terrain.mining`.** The draft reads it for P(lead). S1 (10) writes it (l.392–394), but §2.3's `Terrain` interface
  (l.413–425) does not declare it. The model's late seat declares it beside the fissile field.
- **(f) The closed-digest rule.** In (c), replace "§7.7 item 1's never-read list admits exactly …" with "the closed-digest
  rule and V08 §2.4's field table name exactly …". `neighborRelationship` is not on the never-read list (l.1584–1600).
- **(g) The decision's time.** In the header, "the trade partners ~01:15" should read ~01:33, as in
  `read-owner-decision.md` and `lane-events.log` l.1869. This is the draft notes' own Flag 1, still open.
- **(h) T116-10's scope.** Scope "the mixed share highest in the comfortable and prosperous bands" to T116-4's
  both-native fixture. In the river-partner case the draft's own table has mixed buildings only in `rich`, so the bar
  as written fails there.
- **(i) T116-3's scope.** "Outside the supply" must count a family native by ruins at the build site as inside, since
  `status` is town-wide and reads `unavailable` for a ruins-only family.
- **(j) Harbour and river pairs.** DR3's route pair: this site's harbour and a neighbour's `river` access → `river`
  (both ends on navigable water: the dearer water rate, still far below road). This is the realism tiebreaker; today
  the pair falls to `road`.
- **(k) Repairs in kind.** State that a repair in kind reuses the building's own fallen material: it debits nothing
  traded and needs no licence.

---

## C. Edge coverage (the task's list, then the edges I found)

| edge | draft's outcome · fallback · test | verdict |
|---|---|---|
| nothing native but earth | earth walls; thatch, turf or mud · tier 5 floor · T116-15 | sound; R11 and R12 refine it |
| everything native | full cost order · — · T116-16 | sound |
| isolated (native-only) | no traded material at any epoch · — · T116-3, -25 | sound; R24 states the parity exception |
| desert | adobe, mud roofs · floor · T116-17 | sound; R12 adds fuel-poor baked brick |
| marsh or delta | reed thatch; brick with clay and peat · floor · T116-18 | sound |
| mountain | rubble, ashlar, slate, log · — · T116-19 | defect: R10 (stone slate), R11 (fieldstone), R1 (reach) |
| coastal port | sea partner cheapest; native-only without one · — · T116-20 | defect: R14 (sea rate), R15 (sea moles) |
| thorp | `rungMeans` 0.5 · — · T116-21 | sound (the arena bounds the reach; R1 keeps that) |
| metropolis | `rungMeans` 1.3 · — · T116-21 | **defect: R1 (reach misses the town), R13 (timber scarcity)** |
| the village | same rule, `v.` rows · — · V07's bar | defect: R4 (kind draw ungated), R6 (row order) |
| islands | the settlement's supply; island rock no source · — · T116-23 | sound; R17 (landfall position) |
| **the undercity** | **absent** | **defect: R16** |
| quarry opening | discovered → next epoch · — · T116-26 | sound |
| quarry exhausting | dossier F13 · — · T116-26 | standalone undefined: R20 |
| a route closing | partner leaves; standing fabric keeps · — · T116-25 | sound |
| growth | new builds re-pick | frame growth and rung change undefined: R20 (R1) |
| decline | fabric stands in its material · — · — | sound |
| history replay | present partners; depleted deposits available before the last · `ruins_stock_short` · T116-24 | **defect: R2 (inconsistent with generation)**; R26 (resourceHistory dates are in R2) |
| **pins and locks** | **absent** | **defect: R20** |
| custom records | honoured on the element, origin `dossier` · tier 0 · T116-30 | sound |
| a dossier without resources | raster rule · — · T116-12 | sound |
| save and load | supply derived, recomputed on load · — · T116-31 | sound |
| undo | the log's | sound |
| regenerate | edits held; draws by lineage and slot | sound |
| **migrate** | ledger re-keyed, fields written | **defect: R18** |
| item 114's ceiling | means bounded by `means.top` · — · T116-22 | **defect: R5 (churches)** |
| found: a dossier-implied bridge | dropped | **defect: R21** |
| found: dossier production evidence (income, producers, exports) | ignored | **defect: R3** |
| found: a depleted `stone_quarry` at generation, and DR32's ossuary | no native stone, no working | **defect: R2** |
| found: a terrain edit that changes a raster | undefined | R20 |
| found: a declared partner removed | undefined | R20 |
| found: fire and flood on new ids and mixed buildings | undefined or wrong part | R7 |
| found: Works durations and pauses on new ids | undefined | R8 |
| found: the S7b stone forecast | undefined | R9 |
| found: paving over epochs | could tear up setts | R22 |
| found: tents | walls undefined | R26 (c) |

---

## D. Points checked with no defect

- **Water carriage is cheaper than land.** The direction is right: sea < river < road, with an import premium. Only the
  magnitude and the per-value form are wrong (R14).
- **Brick where clay and fuel but no stone.** Faithful, with the era factors (dearer in c12, cheaper in c15). R12 only
  refines the fuel-poor case.
- **Timber framing on stone ground storeys.** Correct. Whether a building is mixed is decided by cost at the blend; where
  each material goes is decided by mass, heavier below. The chimney gable of a timber house is historically right. One
  roof covering per building and at most two wall materials is an acceptable simplification.
- **Thatch from reed and straw.** Both sources are modelled, and the roof form admits the covering (never the reverse),
  so arid flat roofs never take thatch. R23 only adds urban ordinances.
- **Cob and adobe in dry country.** Adobe only in arid rows, cob zeroed there, and mud on flat roofs are right. The oasis
  grove is correctly no timber source for walls.
- **Fire rebuilding in brick or stone.** The ordinance principle is right and bounded by availability. The tables are
  missing (R7).
- **Stone robbed from ruins.** The ruins basis is correct in kind: finite, per site, cheaper than quarried, never
  created by a reported shortfall. It matches the owner's "repurposed for building material". A landfall's rock lying
  on the settlement's own land is correctly native, not a non-native material. R17 fixes generation and position only.
- **Churches and castles dearer than their streets.** The prestige principle and the exemption from the district's band
  range are right. The pick rule for them is wrong (R5).
- **The owner's worked example.** A river town with woods and no quarry builds in wood, with stone only by trade and
  only for the very rich. Where both are native: rich in stone, middling mixed, poor in the cheapest. The draft's
  mechanism reproduces this, and T116-4 to T116-6 bound it.
- **Structure keys.** `retaining`, `raised:<kind>`, `pier` and `deck` survive as preference rows. The aqueduct stays
  masonry-only. Retaining walls keep `earth_bank` and `timber_crib` below 150 cm, and the civic face reads the works
  means. No loss beyond R15.
- **Class overrides.** Kept as prestige rows; R5 and R6 fix the mechanics and the missing `watchtower`.
- **Item 19's shape clause for buildings.** Kept, and extended by T116-2 to every building's geometry subtree.
- **"Isolated" as "native-only".** One term for the owner's concept. It is correctly kept apart from V07's road form and
  SettlementForge's access key. Derived and hostile partners supply nothing, and the generic web import never serves a
  building material.
- **Partners arriving and leaving over epochs.** Standing fabric keeps its material and origin, and only construction
  reads the epoch's supply. This matches "can't have … or grow to have" read as construction, and item 22.
- **Deferral.** None found. The SettlementForge trade adapter is a defined adapter, not a deferral, as the owner's
  decision states. "V12 calibrates" follows the design's standing default-then-calibrate practice with stated defaults.
- **DR41.** The id is free: no other coherence file claims DR41 or DR42.
