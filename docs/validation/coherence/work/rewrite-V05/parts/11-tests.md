
## 7 Tests and acceptance bars

§13's families; each bar's class — **C** conformance, **P** parity, **O** outcome — in brackets. The base's island bars
T10-1, T13-1 and T15-1 stand (§13.2), and T102-2's island clause is T-V5-19 with T-V5-20 and T-V5-21; T103-1 runs
T-V5-22 on its island seeds, T104-1 T-V5-23 and T104-3 T-V5-24. Every no-op pin below is a `NoOpPin` on V12 §3.7.8's
engine, "off" for item 110's rows read from V11 §3.24.0's switch table (every `deck.offer` 0, `terrace.enabled` false,
the `raisedWays` chances 0) (X-V12-11).

* **T-V5-1 — the gate** [C]. TOWN and every village rung never carry a sky allocation; a CITY with the setting off
  carries none and its ground digest equals the realism golden (T13-1); the `MFCG` and `FTG` presets carry none; a
  dossier-bound CITY whose `site.magic` resolves `none` refuses the setting (F-EDIT `dossier-owned`); a dossier rung below
  CITY resolves `gated: rung`.
* **T-V5-2 — the count** [C]. 500 CITY seeds at the target at `wealthLevel` 0.5 and 1: every count 0–3 within ± 3 s.e. of
  the slot law at each seed's own `h_town`; slots never skip; `islands.count` 0–3 give exactly that many open slots on
  200 seeds each (their supply permitting, each empty slot reported).
* **T-V5-3 — the supply** [C, O]. (a) V05 §3.3's calibration bars at P0; (b) `A` monotone non-decreasing in `h_town` and
  `h_carried` over the rows (T10-1); (c) `S_carried` equals the mean of the carried households' band values to 10⁻⁹;
  (d) a fixture whose every district cell lies in water or an excluded reservation gives `S_town` = 0 and no island,
  reported `no supply`, and no island edit changes `supply`.
* **T-V5-4 — the fill** [C]. On 500 CITY seeds with islands: ground plus sky households equal the roster's total exactly;
  carried households by band never include a band poorer than a band left uncarried; the stop cause is one of V05 §3.5's
  three; the fill converges within 100 batches; a slot below `minAreaHa` closes and its rows return; an institution slot
  carries exactly one instance of one of its tags and its staff, never a COUNT, GUILD or QUARTER record or member; no S3
  reservation is left without an owner by an institution slot (100 %: the hand-over instance or `park`, F-SKY-HANDOVER
  counted); no household a dossier district-defining record's raised share holds is carried (100 %); a slot with one
  reason candidate takes it, one with none closes reported.
* **T-V5-5 — placement** [C, O]. 1 000 islands on B-CITY: no island without an assignment or declaration has more than
  10 % of its outline cells over `core`; 0 islands within `gapM` of another; 100 % inside the frame inset; ≥ 80 % of
  prisons ≥ 1 000 m from the plaza and ≥ 80 % of palaces within 1 000 m of it; every F-SKY-PLACE rung counted in the
  report; 100 % of islands placed by rule have a rim cell on admissible ground or within an admitted slanted row's run of
  it, including on the lake, estuary and sea fixtures; on a fixture with no plaza the purpose term is 0, and a tower row
  reads `far` from the plaza.
* **T-V5-6 — outline and arena** [C]. 10 000 sky outlines per template: simple (§13.2's outline property), area within 1 %
  of `A`; each arena's rim is one closed chain carrying `rim`; exactly one void and one land face at L0 before water; every
  SKY commit record writes only its island's key and the ground's landing claims; for every template at every aspect its
  row admits, 100 % of outlines grown by the buffer resize to 1.5 × `areaHaMax` lie inside their frame; a self-touching
  lasso and collinear corners are bent as V05 §3.23 (e) states.
* **T-V5-7 — terrain and the conjured river** [C]. On 500 islands with a river at CITY and METROPOLIS: its mean bearing
  within ± 15° of the ground river's; 0 non-monotonic beds; every river ends at the rim with `fall`; its width inside its
  clamp; F-SKY-TERRAIN's rungs counted; a one-cell `hydro` grid gives no river, reported.
* **T-V5-8 — access** [C]. Every island placed by rule has ≥ 1 access (0 % `unreachable`); a declared island has ≥ 1 or
  is reported `unreachable`; every hoist and stair foot lies on land in an admissible face; every ground landing plot
  fronts a way or has its trail; rope lines ≤ 350 m and bridges of light ≤ 600 m of horizontal run; every stair's helix
  ends at its top with a landing every 20 m of rise; no stair or bridge of light where `magic` is `none`; `guarded` only
  on a prison; after SKY-F every island landing attach is met by an island way, and 100 % of ground landing attaches are
  met by a walkable part-0 way after S8; the ground landing of a `secret` access is fronted and withheld from every key
  that does not admit it (100 %); hand-placed accesses fill the rim's free yards and the next is bent by
  `bend.access.rimFull`, `skyAccessObstacles` holding one entry per live access. **With item 110** (on 500 CITY and
  METROPOLIS seeds with islands and item 110's rows on, and on hand-built fixtures): 0 raised decks or raised-way piers
  inside any access column or any landing yard dilated by `deckGapM` (100 %, whether the raised part came before SKY or
  after it — an epoch's raised-way pass, a T4 stroke); every rope line and bridge of light ≥ `lineClearM` over every
  raised deck and raised-way pier it crosses; 0 feet and 0 landing yards on a deck face; 0 landing attaches met only by a
  raised deck or an aqueduct; a T4 `raised` stroke ending on a rim leaves 0 ways on the sky arena and places 1 access of
  an admitted kind (J-VI.4 (d)), an aqueduct stroke to a rim and a `raised` or aqueduct stroke on an island's key are
  bent (J-VI.4 (d)–(e)), each with its line, and a `raised` stroke across an access's column is re-routed or, where
  `skyAccessObstacles` offers no re-route, ends at the last ground vertex before it with `bend.raised.hoist`'s line
  (J-VI.4 (f)).
* **T-V5-9 — the unit run's contract** [C]. (a) The rim strip is never cut or plotted; (b) `SeamReport.portalsTotal` = 0;
  (c) the island's district count equals V01 §3.10.3 (2)'s count for its allocation read with `districtHa`, within V05
  §3.23 (e)'s bound; (d) an island with `h_carried` = `h_town` = 1 has 3 districts at METROPOLIS and at least 2 at CITY on
  ≥ 90 % of seeds; (e) every island district's kind is a `sky-*` kind of V05 §2.4 and every fabric hint a valid
  `FabricStrategyId`; (f) on 500 seeds, 0 households re-homed from an island by S10a's band-range step, each carried
  band's share of the island's plot land within ± 5 % of its carried share, and a one-band island and a one-cell lattice
  as V05 §3.23 (e) states; (g) its housed households equal its allocation's, or F-SKY-UNIT's overflow is reported; the
  runner lays no second terrain on the island and its field step reads the unit inputs' values (V05 §3.12); (h) **item
  111** on an arid fixture: with the oasis chance, the water pull and the climate cell at their arid values and at their
  neutral values, the island's arena, terrain, river, gradient raster and context vector are byte-identical for the same
  allocation and terrain draw, no oasis lies on any sky arena (100 %), and an oasis on the ground is classed `water` by
  V05 §3.7 (1)'s raster; (i) an island whose land is all strip and claims returns no district and F-SKY-UNIT re-places
  every household on the ground, the population whole.
* **T-V5-10 — underside and altitude** [C, O]. The apex clears the tallest caster beneath by ≥ `clearanceM` on 100 % of
  islands after SKY-F; the altitude fixed at SKY stands (no F-SKY-CLEAR raise) on ≥ 99 % of 1 000 islands at CITY and
  METROPOLIS (V05 §3.9 (5)'s measurement), measured with item 110's terrace, raised-way and deck-plot rows on at their
  defaults, and the 100 % clause holds after every epoch of a century run (`sky.clearance`, V05 §3.15 (7)); each
  underside tier's ring lies inside the one above it translated by the apex step, with decreasing area; each profile's
  measured radius ratio (the tier rings' equivalent radii ÷ R) within 0.05 of ρ(z_i) at every tier; a crescent's apex
  lies over its land face.
* **T-V5-11 — lights and names** [C]. Rim orbs at 40 m ± 1 m; the keel light's intensity 4 000 × `h_carried`; a settled
  island's magical lights 0, a held island at `h_carried` 0 unlit with its lanterns lit; every island named, an island over
  water named without the missing features; its `quarter` label drawn at the city band at the reference viewport on
  100 % of visible islands.
* **T-V5-12 — labels and occlusion** [C]. Under `opaque`, 0 ground labels drawn inside a visible island's land face;
  under `ghost`, a sky label wins a collision against a ground label of equal priority; under `offset`, sky labels drawn
  at their displaced positions; with the sky layer hidden, 0 sky labels, 0 slabs and no model digest changed (T15-1);
  every shipped sheet loads at every band with every sky semantic resolved (item 408), a user sheet missing one is
  refused naming it, and the `fallen` row draws over the landfall's members; a degenerate sky mark draws nothing and fails
  no tile; an island too small for its spine takes a point label or none.
* **T-V5-13 — the underside's shadow under the fixed, path and cursor suns** (J98) [C, O]. A hand-built island (8 ha,
  `root` profile, 100 m altitude) above the golden TOWN, `ghost` occlusion (and (a)–(c) again under `opaque`), the view
  at the 1:500 stop, CPU reference and GPU pass: (a) under the fixed sun set to 15°, 30° and 60° and the path sun at three
  hours, the shadow's boundary on open ground within max(1 px, §8.4 (c)'s floor-cell diagonal) of the analytic union of
  the tiers' projections; (b) the shadow's area strictly increasing as the sun lowers; (c) the same island with a `flat`
  profile: at 15° the `root`'s shadow reaches past the `flat`'s by `depth · cot 15°` within 1 px toward the sun (toward
  the footprint); (d) the cursor sun at nine pointer positions at the 1:500 and 1:2 000 stops: the shadow falls away from
  the pointer, `H` ≥ 1.5 × the list's top, the GPU within §13.4's tolerance, and at a fixed zoom panning the island into
  and out of view changes `H` by 0; (e) at 15° a ground point under the island's centroid but outside the root's
  projection is lit (V > 0); (f) the penumbra's width at 200 m altitude exceeds that at 100 m; (g) the `flat` island with
  a 30 m rim against a 10 m rim: at 15° its shadow reaches 20 m · cot 15° farther toward the sun within 1 px (the owner's
  "thickness"); (h) at 15° the `root`'s vector-rung shadow is one connected region (the prism form); (i) a fixed sun at
  the zenith shades exactly the footprint; §13.4's island-shadow golden stands.
* **T-V5-14 — over time** [C]. T8-6 stands (a CITY dropping below 10 000 loses its islands through waning, settled and
  fallen over their dwells), the landfall at TOWN by the same table; on the hook fixture a settled island refloats before
  any island is raised; a resize keeps every plot address away from the rim (100 %); after a growing and a shrinking
  resize and a rim reshape on the hook fixture's institution island, the rim strip lies `rimStripM` inside the new rim
  everywhere and every landing yard meets its top on it (100 %), the rim walk stands on the re-laid strip — one
  `esplanade` and one `street_trees` `Greenery` on the re-laid strip after each — 0 ways cross the strip, a growing resize
  re-derives exactly the districts that receive band faces and the district whose institution claim is re-searched, a
  shrink and a reshape's inward stretch no district but that claim's district where the claim is re-searched (every other
  island district byte-identical, the district count unchanged), after a re-search the institution stands on its new
  claim in one building with the old one demolished, and a shrink requested below the institution floor is bent to it
  with the claim keeping a site in its own district (J-V5.77); an epoch target below `minAreaHa` stops at it. A landfall
  adds and removes no ground edge, demolishes exactly the covered set's buildings, keeps every locked entity, credits the
  ledger with the covered area × `stoneM3PerM2`, relocates every dossier use before its building goes; on a fixture whose
  footprint covers a wall stretch, a `main` gate, a tower, a bridge deck, a market reservation and a way: the stretch
  `breached` over its covered length in the enceinte's `condition` (a run already `dismantled` kept) and, the ring in use,
  back to `standing` at the next `fortification` phase (V06 §3.7.5; T-V6-11), the tower and the `main` gate inside the
  `breached` run — drawn by their run and standing again with it, no state written to any `Tower` or `Gate` — the bridge
  `ruined`, the reservation vacant under the rubble, the way `rubble` and routed as `track` with its class before the fall
  in `Way.formerClass` — a covered lane V06 had downgraded keeping its earlier `formerClass`, 0 covered ways without one —
  until an epoch's clearance restores that class and clears it (V06 §3.5.2; T-V6-66 on the same fixture), the fall's undo
  restoring each way's class and prior `formerClass`, the landfall's quarry carrying its `source` and read by no
  underground quarry rule, a locked wall kept — each listed as a fate; a footprint wholly over water lays a memberless
  decoration with its one fate; **another island's landing under the footprint**: its access re-landed outside the
  footprint in the same event, or dropped by F-SKY-ACCESS's last rung where no admissible point lies within twice its
  run, and the fall's undo restoring it at its former foot. A dossier absorb removing an island's palace leaves the island
  at once without it, and at the next epoch the island takes the next palace instance where one exists, else becomes a
  prosperity island where the rich band admits it, else wanes (the three cases on fixtures); **with the island locked**
  the absorb still removes the palace, the island stays an institution island with its claim empty and the fate "held
  without its palace" listed, and the re-reasoning runs at the first epoch after the unlock; each conversion's undo
  restores the model byte for byte. **With item 110:** the landfall fixture also covers an aqueduct span, a viaduct's
  raised-way pier and the span it carries (itself less than half covered), a generated retaining wall and a bridge
  carrying deck plots — the covered span, the pier and the span on it `ruined`, the viaduct's crossing closed and the ways
  beneath it touched only where covered, the aqueduct's terminal listed as run dry and its lost supply read at that
  epoch's `raisedWays` step when the fall is an epoch's (the next epoch's for a hand `convert`), the retaining wall
  `decayed` over its covered length and still `decayed` after a re-derivation until an epoch's restoration re-derives it
  (V06 §3.19.4 (6)), the deck plots' households relocated before their buildings are demolished and the plots tombstoned
  with the deck — 0 vacant plots left on a ruined deck, and a later repair of the deck re-offering its faces to new
  lineages — the covered spans, piers and walls in the decoration's `members` — each span as `{ raised, span: [a, b] }`
  and each pier as `{ raised, support }` on item 244's keys, the same members after a re-derivation of the viaduct, each
  leaving in the batch of the op that ends its cover (V06 §3.5.2) — the deck plots listed as fates, never members, all of
  it in V05 §5.5's per-landfall CSV, and 0 edges of the ground's streets and plots added or removed beyond the tombstoned
  deck plots' lines.
* **T-V5-15 — goldens and determinism** [C]. Two sky fixtures join §13.3's goldens — a CITY with a prosperity island and
  a conjured river; a METROPOLIS with a palace island and a prison island — identical on the five engines; every stream
  key distinct (§6.1's sky fixture); an island raised after a fall takes a new part; a document with an island declared,
  moved, resized, given an access and brought down replays to the session's digest; with one island only slot 1's
  indices are drawn. **Item 110's pin and shift** (J-V5.67): with item 110's terrace, raised-way and deck-plot rows off,
  both sky goldens are byte-identical to their pre-item-110 digests (the no-op pin); switching the rows on at their
  defaults changes both once, recorded as one declared shift naming the two fixtures (raised ways and retaining walls
  beneath and on the islands; `groundRefCm` and the altitudes where a raised part stands under a solid); the METROPOLIS
  fixture pins one raised way under an island (T-V5-31 (a)).
* **T-V5-16 — editing** [C, O]. Every event of V05 §4.2 undoes exactly, Update shade now restoring the former basis,
  strips and field cells; §7.3's oracle checks byte for byte outside V05 §4.3's scopes on B-EDIT sequences with island
  edits (10³ in the PR tier, 10⁴ nightly), a ground edit touching a footprint at a point leaving the island untouched; a
  move keeps every address on the island; New random on an island keeps the ground's digest; a declaration where
  `h_town` = 0 carries the `held against its supply` fate; every line of V05 §4.2's bend table appears on its fixture —
  a fourth island joining the nearest island, a count below the forced count raised, a T5 `sky` declaration at TOWN laid
  on the ground, a move into another island's gap, an altitude below the floor, a resize below the floor or to 0, a
  reshape held by the claim or making the rim non-simple, a delete on a fallen island, an access kind that does not fit, a
  foot on a deck, a full rim, the last access's delete, the raised and aqueduct strokes, a raise cutting a hoist, a rim
  retaining stroke, a rim wall stroke — each resolving to its V09 §4.9 message row and V10's bend category; the
  dossier-magic refusal holds; Update shade now writes `by: 'update'` and the current epoch.
* **T-V5-17 — exports** [C]. GeoJSON sky coordinates equal `anchor` + local exactly and validate, a vertical access a
  Point with its two elevations; each island's VTT scene imports with no manual steps; the glTF island mesh is a closed
  manifold and validates; CityJSON with PLAT's extension validates; a document with no island writes no sky container;
  an export after an undo equals the export before the undone event.
* **T-V5-18 — budgets** [C]. V05 §6's rows on B-CITY and B-CITY-lite METROPOLIS seeds with three islands, or their
  fallbacks applied and reported; the one-click path unchanged (§12.5).
* **T-V5-19 — the shade strip moves the field, gently** (T102-2's island clause) [C, O]. A uniform district — level
  ground, one district kind, no driver varying across it — with a hand-built island (8 ha, `root`, underside 100 m above
  its ground) over its southern edge, latitude 50°, `w_sun` at its default: (a) the mean pass-2 prosperity over the
  cells the strip blocks for at least three samples is lower than over the district's unblocked cells by the expected
  difference — `w_sun` × the mean shade share of those cells, passed through the field's smoothing computed on the same
  fixture, never assumed — within ± 10 % of it; (b) no plot's band differs by more than one from the same fixture with
  the strip left out; (c) with `w_sun` = 0 the field and the town are byte-identical to the run without the island term,
  and with no island every strip is empty and the field byte-identical to the base's pass 2 (no-op pins); (d) the strip
  identical on the five engines; (e) an island at the frame's edge reports F-SKY-SHADE's clipped share; (f) V05 §6's
  strip row; (g) a receiver above the caster and two islands at one height set no bit, and a strip with no blockable
  cell has `cells` 0 and no outline, attribution or export feature.
* **T-V5-20 — the model and the picture agree; the underside shapes the strip** (J98) [C]. For each sample, the CPU
  reference's vector-rung shadow of the smooth tiers under the path sun set to the equinox at that sample's hour, on flat
  ground, covers exactly the cells the strip marks for that sample except cells its boundary crosses; a `root` island's
  strip at sample 0 reaches past a `flat` island's of the same outline by its depth × `c` within one cell along +ŝ (toward
  the footprint); a 30 m rim against a 10 m rim lengthens the `flat` island's strip at sample 0 by 20 m × `c` within one
  cell along +ŝ; the basis rim's simplification (≤ `shade.basisVertexCap` vertices) moves no strip bit on the fixtures.
* **T-V5-21 — order, lag and the supply** [C]. (a) `S_town` at S7b and at an epoch equal to 10⁻⁹ between `w_sun` at its
  default and 0 when only the islands' strips differ (item 102 (c)); (b) after a move, an altitude, a resize and New
  random on an island, the ground's field rasters, every plot's derivation record and the shade view's veil
  byte-identical to before — only the pending outline moves — the strip's basis stale and the fate listed; at the next
  epoch (or after Update shade now, over its two windows only) the strip recomputed from the island's new state and the
  field moved; (c) the epoch after a fall carries no bits from that island; (d) a document with an island moved and an
  epoch run replays to the session's field byte for byte; (e) a lower island under a higher one reads `shadeSky` > 0 on
  its cells in the higher one's strip and 0 elsewhere; (f) on a fixture where a house (V06's building shade mask, after
  one epoch) and the island shade the same sample point at the same sun, the OR counts it once, at the default sampler
  and at four points per cell alike, and the strip's `bits` equals the mask's; (g) the participant `sky.islands` runs
  once per epoch at `afterField`, after S6's re-evaluation, and a history run with the engine's other participants
  switched off draws the same island values (V05 §3.15); ground plus sky households equal the epoch's target after
  `siting` (100 %), the released households placed first from the displaced pool with cause `island` and the taken ones
  subtracted by `demandTaken`; (h) **the lag survives a save**: move an island, save, reload, then re-derive a block with
  a prosperity brush — the field raster and every derivation record equal those of the same session without the save,
  byte for byte; the same after an F-SKY-CLEAR raise and after a `w_sun` = 0 table (the strips still computed and held);
  and the same on a **terraced fixture**: an island over a ward that S10 and S11 level with retaining walls — the strips
  computed at S10a equal those a load rebuilds after the levelling, bit for bit — and after a T2 terrain stroke under a
  strip (the bits re-read over its scope from the unchanged basis equal a load's rebuild); **a raised island**: an island
  raised at an epoch (after S6) and one declared by T5 between epochs, each saved and reloaded before the next evaluation
  — the load writes no basis, neither casts nor receives a strip, and the field raster and every derivation record equal
  those of the same session without the save, byte for byte; after the next epoch's S6 (or Update shade now on it) each
  casts; a document whose `schemaVersion` predates the basis step loads with the basis of every unfallen island computed
  once, and never again; **one strip per evaluation**: with V01's S9b registered, the strips S9b's manor sun factor reads
  and those field pass 2 folds are the same held strips, bit for bit, at generation and at a re-derivation from S10a
  (whose bases are written at S10a's start, before step (i)).
* **T-V5-22 — siting across the island** (T103-1's suite on island seeds) [C, O]. On 300 CITY seeds with islands, in
  the siting statistics suite (item 103 (e)): (a) no class `IslandRule.carry.never` excludes is carried by any island
  (100 %) — a top-step emitter, a heavy processor, a wholesale or storage class, a class with a hard need for running
  water, a river bank, the harbour, a gate or a quay, an active chain's working node — and no NEEDS row is satisfied by
  island water; (b) a class with a district coverage row serves the island's districts at or above the ground's served
  share of districts, its island members spaced by its same-kind row, and with the coverage weight 0 the run is
  byte-identical to one without coverage (no-op pin); (c) island classes with a ground supply edge stand at a mean route
  distance to their providers below that under random placement on the island; (d) the ground's suppliers of island
  classes stand nearer the landing feet than under random placement; (e) a `secret` access carries no pull of a class
  whose clientele is not clandestine (100 %); (f) the crime-aligned classes stand farther from a prison's guarded hoist
  foot than their baseline; (g) on hand-built fixtures every route distance equals the sum of its legs to the centimetre
  (a foot outside the walls reaching an inner class through its gate), `skyRoute` names the access of the least sum, a
  `river` or `sea` edge across arenas is ∞, and an island with every access closed reads ∞ with its pulls reported unmet;
  mirroring item 105 (k) across the arenas: (h) a multi-output producer with island consumers sits nearer its dominant
  output's landing foot than its random baseline, and island consumers of a shared ground provider bind to it by the
  route; (i) split pairs across the arenas appear for split classes past the threshold, are reported, and never appear in
  the parity presets; (j) the per-arena relaxation settles within its cap, the second pass moving fewer members than the
  first, byte-stable across runs and worker interleavings; (k) with the web's weights, `comfortM` and the spacing at 0,
  the result is byte-identical to the run without items 105 and 107 (no-op pin).
* **T-V5-23 — custom institutions on islands** (T104-1 on islands) [C]. A dossier custom institution of archetype
  `exotic-tower` is a `tower` candidate where the world has magic and not where `magic` is `none`; a `martial-keep` is a
  palace candidate at `landmarkLevel: landmark` and not at `standard`; a revision that changes its archetype keeps it on
  its island unless a hard row of its new profile fails there, and then re-sites it on the ground by least disruption,
  the claim standing vacant until a later epoch re-occupies it with the next instance first; zero placement failures.
* **T-V5-24 — custom chains across the island** (T104-2's and T104-3's island form) [C, O]. On 200 CITY seeds with
  islands and a fixture set of active custom chains — a perishable food chain, a luxury chain whose consumers are rich
  households, and a chain one of whose processors is a custom `exotic-tower` carried as the island's `tower` — in the
  siting statistics suite: (a) no chain's resource or processing node is carried by an island except the island
  institution, and no chain resource is sited on an island's conjured water (100 %); (b) the ground end of every
  cross-arena link stands nearer to the landing foot of its shortest route than under random placement of that node; (c)
  the flow order by route distance holds in at least the share the base's ground-only bar declares for the same chains;
  (d) a chain with nodes on two arenas is never reported as close at street scale across the arenas, and a quarter name,
  when one arises past item 72's threshold, lies on the ground; the same bars hold for a dossier's `activeChains[]`
  fixture; (e) an import or export store of a chain with an island node stands at a ground gate or quay (100 %); (f) a
  chain toggled off and on returns its island nodes to their sites where nothing else changed; (g) a T6 declaration of a
  processing node onto an island is held and lists the "crosses the hoist" fate; zero placement failures.
* **T-V5-25 — the magical node** [C]. On 300 CITY seeds each of a dossier fixture without deposits and the same dossier
  with a `magical_node` `available`: `h_town` rises by exactly `node.bonus` (clamped at 1) wherever the interpolated
  value is above 0 and not at all where it is 0; the count, `A` and `E` move monotonically with it (T10-1's
  monotonicity); two nodes add one bonus; `discovered` adds nothing at generation and the bonus at the next epoch;
  `depleted` and `removed` add nothing, and a node removed at an absorb leaves every island floating until the next
  epoch's evaluation, when the law may start its wane (never a vanishing); a standalone map's `h_town` equals the
  dossier-free fixture's; with a ruin fixture holding the node, the term is unchanged and no island rule reads the
  underground arena; on that fixture the `why` on the town supply names that ruin from the report's `ruin.node` line
  (V04 §3.5.0a (9)) — its new name after a rename of the ruin — while on the fixture with no ruin it names the deposit
  and no ruin.
* **T-V5-26 — the island cathedral's crypt; no catacomb in the sky** (item 109 (k), J111) [C]. On 200 CITY and
  METROPOLIS seeds with a cathedral island: the cathedral carries the settlement's largest crypt, inside the island's
  rim slab — its floor ≥ `cryptFloorM` above the slab's base at every point of the claim — or, where no site passes, the
  half-sunk form with its fate (100 %); on a `flat` island likewise; 0 underground parts, links or catacomb sources on any
  island (100 %); every catacomb lies under a ground cemetery or a quarry ossuary; no island churchyard is a candidate or
  ranked as the largest cemetery; island churches are counted once in the catacomb count; the S3 precinct passes to the
  largest ground church (or `park`), whose crypt is never ranked above the cathedral's; an island over a vault reads
  nothing of it.
* **T-V5-27 — the rim as a barrier** (item 106) [C]. Generation lays 0 enceintes on any sky arena; a wall drawn on an
  island with two landings gives exactly two walled stretches, each across its landing yard with a gate at its attach and
  a tower at each rim anchor, and 0 wall edges elsewhere on the rim; the enclosure test reads the island as sealed, its
  closure arc `sheer`; a stroke along the rim away from a landing is bent to the landing stretches with
  `bend.wall.rim`'s line; adding a third access adds a third stretch, and an island with no live access keeps its circuit
  with no stretch; with item 106's `barrier` closure and profile off, byte-identical to the base (no-op pin). **With item
  110:** 0 island `RetainingWall`s classed as an `Enceinte` or a member of a barrier circuit; a T3 `retaining` stroke or
  T2 terrace stroke on an island lays a `RetainingWall` on the island's arena, drawn in its frame and displaced with it
  under `offset`, tombstoned at a fall and exported in `sky`; a retaining stroke on the rim strip or along the rim is
  bent inward to 1 m inside the strip's `setback` line along the island's radial direction (`bend.retaining.rim`), a
  stroke wholly in the strip whose moved points coincide bent to nothing; the unit run's levelling lays 0 retaining walls
  on the rim strip; with item 110's terrace rows off, the island is byte-identical (no-op pin).
* **T-V5-28 — ladders across the arenas** (item 108) [C]. On the surveyed dossiers with islands: no ladder pair is
  counted twice across the arenas; every COUNT, GUILD and QUARTER record's members, counted on both arenas, lie inside its
  range; a cathedral island's subsumed parish churches, resident priest and wayside shrine each count once as its
  members, on the ground or carried, never as additions; an island institution is a singular or SIZE record (100 %).
* **T-V5-29 — a removal holds** (J-V5.62) [C]. On 200 CITY and METROPOLIS seeds with at least two islands: remove a
  generated island and a generated access on another island, then run a Regenerate, a Re-derive from S7b, New random on
  the other island, a save and reload, and a century of epochs at `auto`: both stay removed (100 %) — the removed slot
  never drawn, filled or re-opened, its outcome `removed by you` in the report; the higher slots' islands identical to a
  run where the removed island was never there but its slot counted filled; the deleted ordinal never re-sited and the
  island keeping a `main` access (the lowest surviving generated ordinal); 0 households allocated to a removed slot and
  ground plus sky households equal to the roster's total at every step; with `islands.count` pinned at 2 and one of the
  two removed, 1 island after every re-derivation; an `adjust('islands.count')` to 3 after the removal releases nothing —
  the held slot stays `removed by you`, only the free slots open, and with every slot held the adjust opens none and lists
  its fate — a T5 declaration takes a held slot only when no slot is free, the removal's undo restores the island byte
  for byte, and `removedSlots(doc)` lists each hold with `generated`.
* **T-V5-30 — what the raised-way generator reads of the sky** (J-V5.63) [C]. At generation the generated raised-way set
  is byte-identical with the islands setting on and off (decided before S7b (5), §4.3's slot); on 500 CITY and METROPOLIS
  seeds with islands and on the epoch fixtures of V06's raised-way pass: 0 raised ways with a sky endpoint, sky evidence
  or a sky water source (100 %); an elevated road bound to a precinct whose cathedral an institution slot took up still
  stands, its reason naming the hand-over; the aqueduct's need at an epoch counts 0 island households; 0 aqueduct
  terminals, basins, cisterns or fountains on an island.
* **T-V5-31 — item 110 under and on the island** [C, O]. (a) The METROPOLIS sky golden pins one raised way under an
  island: the caster ceiling at SKY reads its deck top with its parapet and its raised-way piers, and the apex clears it
  by ≥ `clearanceM`. (b) On the epoch fixture where V06's raised-way pass builds an aqueduct under a floating island and a
  new stage raises a stepped temple beneath another: after the epoch, `sky.clearance` has raised each island's
  `groundRefCm` to the caster (its `elevationCm` kept unless the floor failed, a listed fate "raised clear of the
  aqueduct"), `shadeBasis` untouched, and a replay of the epoch gives the same values. (c) A stepped island temple (V02's
  `stepped-temple` row): the surface top reads the highest massing tier at each point, and the crypt lies under massing
  tier 0 inside underside tier 0 with its floor ≥ `cryptFloorM` above the slab's base, re-tested at the levelled datum.
  (d) A raised way removed beneath an island leaves its `elevationCm` unchanged. (e) An `own` island's
  `terrainEcho.reliefClass` is the class its `island.place` draw (index `relief`) gives, 100 % over 500 seeds; New random
  re-draws it with the terrain; an `own` record loaded without it gets the same class, written and reported; an `echo` or
  `none` island carries none; and volume 1's `terraceState` on the island's districts reads that class, `plain` for
  `echo` and `none` (T-V1-21). (f) **The clearance against a lock:** on (b)'s fixture with the island locked (and again
  with only its `altitudeCm` path locked), `groundRefCm` and `altitudeCm` are rewritten, `elevationCm` is kept although
  the floor fails, the conflict `clearance held by your lock` is listed, and §5.3's clearance invariant passes by the
  island's exemption. (g) **A raised way under the island's shade:** a cell that the raised way's daylight shade and the
  island's strip block at the same sample counts once in the daylight term, at the default sampler and at four points
  per cell.
* **T-V5-32 — the stage order and SKY's data keys** (J-V5.70) [C]. With `@plat/hood` and `@plat/sky` both registered,
  the `StageDecl`s sort at load with no cycle, SKY after S7b (its S7c hook included) and before S8, S10a and S12a; S7c's
  declared read-set holds neither `reservations.landing` nor `allocations.landing` (T-V1-35 holding S7c to it); S7b (1)'s
  supply term reads each sky pseudo-district at its island's `anchor` + the outline's centroid (100 %); on 500 CITY seeds
  with islands SKY's ground commit records write no data key but those two, and after S10a every host district's
  `modest` residential households plus its landing rows' staff equal the `modest` households S7b allocated it (100 %);
  with the islands setting off neither key carries a row and the ground digest equals the realism golden (T13-1).
* **T-V5-33 — every edge defined** (V05 §3.23) [C]. (a) The pure functions on degenerate inputs return V05 §3.23 (a)'s
  empty results (a tier ring below a mask cell, a strip with no blockable cell, a route with no admitted access, a list
  with no live access), and a degenerate commit takes its class's ladder; (b) on fixtures at THORP, HAMLET, VILLAGE, TOWN,
  CITY, METROPOLIS at its cap and a standalone neighbourhood document, the sky behaves as V05 §3.23 (b)'s table states;
  (c) V11's compiler refuses each invalid `islands.json` of V05 §3.23 (e) naming the cell, and a table without a cell
  reads its default; (d) a snapshot with each contradiction of V05 §3.23 (d) is a corrupt cache and loads by replay to
  the log's digest; a migrated base island gains its terrain and underside, and an access whose row the table removed
  reads its kind's row or `closed`, each reported; (e) a ground edit flooding a foot re-lands it or drops it by
  F-SKY-ACCESS; an island whose floor lifts it above every access row's limit is reported `unreachable`; (f) every row of
  V05 §4.5's `island` section answers on its fixture, filtered by the caller's key (a `secret` hoist withheld), the
  evaluation's kind and epoch named from the strip's `evaluated`.
* **T-V5-34 — where the sky meets the other units** (V05 §3.23 (f)) [C]. On hand-built CITY fixtures: (a) an island's
  strip over a cliff, a steep slope, a coast, a harbour basin, a moat, a bridge, an oasis, a terraced ward, a retaining
  wall and a deck plot sets its bits at the unlevelled ground heights, every plot's derivation record equal to the same
  fixture's load rebuild, and on an arid fixture the strip's effect follows the climate row's weight; (b) access feet by a
  moat, on a terraced ward (run measured to the platform datum; a yard clear of the retaining wall's chain), at the
  frame's edge and over a vault resolve as V05 §3.23 (f) states; (c) a landfall over a cliff edge, a coast, a moat, a
  square, a terraced ward, a composed building, a planned building and the frame's edge covers and reports as V05 §3.16
  (4)'s table and §3.23 (f) state, the terrain untouched; (d) a locked plot under a strip keeps its content while the
  field moves, its value reported; (e) a landfall saved and reloaded keeps its decoration, members, quarry source,
  `formerClass`, `condition` and retaining `state`, and an undo after the reload restores the model byte for byte.

**Parity.** No reference has islands (II.6 (8)), so no parity number binds them. The nearest look is Neighbourhood's
lone patch — its own ground tone and a drop shadow marking its extent on an empty field
(`research/findings/vg-ng-devlogs.md` §B3.5) — so at M6-sky five island close-ups in `hatched` are set beside five
Neighbourhood patches as a descriptive pair set, rated for "reads as a floating patch": V12 §3.9.1's descriptive NG
`PanelSpec` (X-V12-4). It is information, never a gate; M6-sky lands after M5's sitting, so under J122 its panel joins
no owner sitting and its rows stay "provisional — not rated" (§13.6 (7); V12-XCONF-1).
