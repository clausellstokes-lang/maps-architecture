# amend-pipeline-sewers — lane amendments-b/amend-pipeline-sewers (PIPELINE part; seat pipeline-sewers)

STATUS: COMPLETE (2026-09-26). Seat: Claude Fable 5.1, architect-editor of the pipeline part (§4, §10, PART II incl. II.6,
PART III) for the rule family sewers. Items: HOME 12, 14; REFERENCING none. Output:
`docs/validation/amendments-b/blocks-pipeline-sewers.md` — 10 blocks: APPEND TO SECTION × 8 (PART II → the new `## II.7`
with four `###` subsections; II.6; II.1; PART III; §4.2; §4.5; §4.12; §10.2), J-ROWS (10 rows), RATIONALE-A (10 rows).
No REPLACE block: every subsection my items touch is shared with another pipeline seat (II.6 is the home of items 10, 11,
13 and 15 as well as of 12 and 14; §4.2 of 24; §4.5 of 27 and 31's middle band; §10.2 of 31's replaceability column), and
the assembler applies files in name order and blocks in file order, so this file — `blocks-pipeline-sewers.md`, which sorts
after `blocks-pipeline-assignments`, `-emulation-hidden`, `-evolution-islands` and `-prosperity-change-dossier-plan` — lands
its additive blocks after those seats' REPLACEs, provided they keep the heading lines (every block names the live heading
verbatim; a retitled heading skips the block and the verifier catches the missing pointer). Written against
`docs/ARCHITECTURE.md` sha256 `7a4e19db…c4ec762` (the route's snapshot; unchanged at 22:20).

**Read whole:** items 8–31 of `docs/AMENDMENTS-2026-09-25b.md` (12, 14 and their family members 11 and 29 in particular);
`route.md` — how-to, summary table, items 11, 12 and 14, rule families, cross-cutting duties, stale text, CONFIRMED / PLAUSIBLE;
`docs/ARCHITECTURE.md` — the one-page summary, §1.1, §2.1, §2.2 rule 1, §2.3, §2.5, §2.7 (the staged records), §2.8, §4.1,
§4.2 S0, §4.5, §4.7, §4.10, §4.11, §4.12, §5.2, §5.3, §5.4, §6.1, §7.1's event kinds, §7.3's rows, §7.8, §8.4, §10.2, §13.2,
§14's registry, PART II whole, PART III whole, D-3, D-13, D-25, D-33, the J index and the Staged list;
`docs/OWNER-INSTRUCTIONS-2026-09-25.md`; the first sixty lines of Part A of the rationale file; `canon.md`'s home rules;
`workflows/09-amendments-b.js` (the assembler's application order); `amend-kernel.md` (the kernel seat's cross-notes to the
pipeline for item 12, all honoured); `amend-pipeline-evolution-islands.md` (a skeleton at 22:05: no block shapes stated).
Clean room: no reference code, grammar, palette, wordlist or content table; nothing from `partitioned/`; the numbers are our
own, marked PLAUSIBLE and calibratable.

## 1 Per item — where it landed, the mechanism, the rulings

### Item 14 — sewers by tier (home)

**Landed:** the new **II.7.1** (the rung row `RungProfile.layers.sewers` with the TOWN law, the S0 draw, `Features.sewers`, the
toggle as visibility, the drain rule and its connection table), **II.7.2**'s gate and presets, **II.7.4**'s `SewerExistenceRow`
and `Features`; referencing one-liners in **§4.2** (S0's `toggles.sewers`), **PART III** (`never` below TOWN), **§10.2** (the
`drain` column), **§4.12** (registration) and **II.6** (the pointer to II.7).

**Mechanism, in plain words.** Each rung row of the ladder table says whether a sewer network exists: never in the village
tiers, always in a city or a metropolis, and in a town by a law — a probability that starts at one in twenty for the
smallest, poorest town and rises with population and with the wealth control to a cap of three in five, never certain. A
town's draw is one of the blueprint's auto features, taken at S0 with the others from the `blueprint.features` stream, so
pressing Enter varies it the way MFCG's master switch varies castles and walls, and it is written into the report with its
reason. The result is one document fact, `Features.sewers`, that every dependant reads from the model. The one *Sewers*
control means two things: in a town it is that feature (auto, on, off; changing it re-derives only the underground arena),
in a city it is a view switch that shows or hides the underground layer, which is hidden by default at every size so the
default picture stays MFCG's and FTG's. A city's request that says "off" hides the layer and is reported; it never removes
the network. Only two plot rules depend on the network: the drain rule — the class table says which classes need a drain,
and the network stage records on each tunnel which plots it serves, by a one-way link that changes no ground record and
draws nothing — and the underground neighbourhoods. Until the staged stages are built, `Features.sewers` is resolved and
reported and the arena stays empty, so no city claims a network it does not carry.

**Rulings:** J-A14.41 (the draw at S0, not after S6's field pass), J-A14.42 (one control, two meanings; hidden by default),
J-A14.43 (D-3 read: `historical` is realism, `navigable` is the fantasy toggle, navigability derived per tunnel from bore and
headroom), J-A14.44 (exactly two dependent plot rules; siting and yards unchanged — the route's "cess pits versus
connections" ruling: no cess-pit geometry).

### Item 12 — underground neighbourhoods along the sewers (home)

**Landed:** the new **II.7.3** (U1–U3 as invariants; the underground pseudo-district and S7b (6); the shifted field; the cut;
the surface constraint and F-UNDER; access, air and light; depth and ceiling; lifecycle; order, seed and locality; the
stage-2 close-up; the emulation note), **II.7.2** (the underground arena's levels, the tunnel profile with `wallCm`,
`navigable`, depth and fall, editing), **II.7.4** (`TunnelProfileRow`, `AccessPoint`, `UndergroundRule`, `UndergroundStrategy`);
referencing one-liners in **§4.5** (S7b (6)), **II.1** (`layer: 'underground'`), **§10.2** (`underground`, `undergroundAccess`
columns), **§4.12** and **II.6**.

**Mechanism, in plain words.** The tunnel is the underground street. The network stage lays the underground arena exactly as
the ground is laid — a rock face, tunnel centrelines, and the tunnels' bands (bore plus wall) cut by the same corridor
function that cuts streets — so a tunnel's outer wall is a kerb, and the ground's own plot cut runs on it: frontage-first
strips, corner plots at junctions, each plot's rear line bounded by its own frontage's region so it can never reach a
second tunnel, doors only onto the tunnel, no alleys because the underground has no ways at all, and row cells whose front
wall is the tunnel's wall by the row boolean. Only navigable tunnels — bore and headroom over table thresholds, so all of
the fantasy preset's mains and only a big historical city's trunk main — carry plots. Who lives there is decided with the
rest of the town at S7b: an underground pseudo-district takes a small share of the poorest band's households, the classes
that prefer vaults (crypts, cold stores, cellar workshops, guild vaults, secret institutions), and later, under the
evolution engine, part of the ground's overflow; its prosperity is the ground's field above it shifted down a fixed step,
banded by the town's own cuts, so the ordinary granularity table yields many small cells under poor streets and a few large
vaults under institutions. The surface constrains it by reads alone: sample points of each plot are located on the ground
arena, and a plot under water, damp ground, a wall strip, a tower, the castle, the cathedral's main building or any house
steps down a short depth ladder to a bare wall — a room under a house is that house's own basement (item 29) and never
opens on a tunnel; cellar stairs are access records, not rooms. Each neighbourhood gets at least one stair, shaft or well
to the surface and air gratings at a spacing. Each building carries its depth as its base elevation below the datum, its
ceiling as its eave, and is drawn and exported by depth band in one underground arena. Plots follow their tunnel's
lifecycle (abandoned when it closes, resurrected when it reopens), keep their ids and streams, and are edited like any
plot; the stage runs after the network, eagerly, and re-derives only the blocks under an edit's footprint.

**Rulings:** J-A12.41 (the ground's own S9–S11 on the tunnel kerb; no dedicated cutter), J-A12.42 (no room under any surface
footprint; basement versus stair — reconciles item 12 (c)/(d) with item 29 (b)), J-A12.43 (the constraint as a sampled
`pointLocate` ladder, never copied ground geometry — applies the kernel's J-A12.32), J-A12.44 (eager S7b allocation from a
predicted navigable capacity on the shifted ground field), J-A12.45 (one arena; depth per entity; depth bands), J-A12.46
(eager after the pool's merge; scoped per tunnel run by declared reads). The drafted rule set (a)–(h) is adopted as data
with these amendments; (c)'s "under a surface building only as its cellar" is refused as a room and kept as a stair.

## 2 Rulings — the J-A rows (ids)

Ids follow the protocol's `J-A<item>.<n>` form with n = 41–46 and 41–44 — the "4" marks the pipeline seat (§4 and PART II)
so that the kernel's .31/.32 and any other referencing seat's numbering cannot collide. J-A14.41 (§4.2, II.7), J-A14.42
(II.7, §7.8, §8.4), J-A14.43 (II.7, D-3), J-A14.44 (II.7, §10.2), J-A12.41 (II.7, §4.7), J-A12.42 (II.7, §2.6), J-A12.43 (II.7,
§5.2), J-A12.44 (II.7, §4.5), J-A12.45 (II.7, §8.4, §11.1), J-A12.46 (II.7, §4.1, §7.3); each has its Part A entry in the
RATIONALE-A block, in plain language, "chose X over Y because Z".

## 3 Already satisfied or not applicable to this seat

* Item 12 (f), the tunnel states themselves, and item 11 whole — the islands seat's (II.6); II.7.3 reads only an `open`
  flag on the condition row (cross-note below). Item 12 (g)'s drawing and export by depth band — rendering's (§8.4, §11.1);
  II.7.3 states the band width and the one-arena rule. The §5.3 check rows for U1–U3 and F-UNDER's §5.2 row — determinism's;
  the rules and rung orders are stated in II.7.3. The §13.2 hook tests, the staged-list row, the landing row, the §12.4
  budget row, the §14 registry map and §1.1's `RungProfile` field — scope's and rendering's (cross-notes).
* Item 14's "dependants read the model, not the view" — stated in II.7.1; §7.8's registry row and §8.4's `LayerSpec` default —
  determinism's and rendering's (cross-notes).
* §4.1's stage diagram is not changed: the two stages are staged registrations by declared I/O (§4.12's one-liner), and §4.1's
  laziness contract already covers the underground allocation ("S7b's allocations" are eager).
* §4.7 is not changed: the underground reuses its cut; the arena-specific rows (depth × 0.35, vacancy 0.25, the site-plan
  arena column) are stated in II.7.3 as the underground's rows of those tables.
* §4.11 is not changed by this seat: the crowding hook (S7b (6) (c)) is stated in II.7.3 as the engine's; the tunnel
  conversion kinds are item 11's (islands seat).

## 4 CROSS-PART NOTES (what another part's editor must add; the verifiers check both sides)

**pipeline-evolution-islands (same part; II.6, §4.11; items 10, 11, 13, 15)**
* II.6: if you REPLACE II.6, keep its heading line verbatim (my pointer block appends to it) or, if you retitle, carry the
  pointer yourself: "Existence by tier, the toggle-as-visibility rule, the `drain` rule, the network stage's gate and levels,
  the tunnel profile, depth and outfalls, and the underground neighbourhoods are II.7's." Keep in II.6: the islands, the
  `SewerStrategy` declaration, the rule families, the two presets and item 11's lifecycle. Do not restate the tier rule or
  the underground plots there.
* Item 11's condition row: give each tunnel condition state an **`open: boolean`** column (in use and neglected open; caved
  in, collapsed and sealed closed) — II.7.3's frontage rule and lifecycle propagation read exactly that flag. Name the
  `Tunnel.condition` field so (model note below).
* Item 8's persistence-order table: the underground after streets and walls, before terrain (II.7.3 cites it).
* §4.11: S5d's shortfall share that goes underground in an epoch (II.7.3 (c)) is the engine's rule; a one-line pointer in
  the evolution hook suffices.

**pipeline-emulation-hidden (same part; §4.2, §4.6; items 24, 30)**
* §4.2 S0's toggle list: add `sewers: 'auto'|'on'|'off'` beside `moat` (my §4.2 block appends the rule's pointer at the
  section's end; the list entry is inside your REPLACE). Keep the heading line verbatim.
* Item 30: II.7.3 lets a `knownTo: 'secret'` institution prefer underground plots through item 16's templates and lets a
  secret plot's building hold a `cellar_stair` access; no change to §4.6 needed unless you name the preference there.

**pipeline-assignments (same part; §4.7, §4.11; items 16–19)**
* Item 16's relation templates: an `underground` placement preference (`prefer` / `allow` / `never`) per template, read by
  S10b on the underground arena and by the secret-institution rule; the class-table columns are §10.2's (mine).

**pipeline-prosperity-change-dossier-plan (same part; §4.11, §10.2)**
* §10.2: my `drain` / `underground` / `undergroundAccess` block appends at the section's end; keep the heading line verbatim.

**model (§2)**
* §2.2 rule 1: state the underground arena's level mapping — L0 the rock face bounded by the arena's outer ring; L1 `tunnel`
  chains, never `way`; L2 the tunnel bands (bore plus wall) as half-corridor strips and wedges, the rock between them the
  built blocks; L3 frontage plots; L4 buildings (II.7.2 states the stage's writes; the kernel's note asked the same).
* §2.7 `Tunnel`: add `headroomCm: Cm`, `navigable: boolean` (derived, II.7.2's thresholds), `condition` (item 11's state;
  the islands seat names the states); keep `widthCm` as the bore. `AccessPoint` is declared in II.7.4 (R12: the interface
  lives with its mechanism) — list it in §2.7's entity registry with a pointer, declare no second copy. `District.kind`
  admits `underground` (a pseudo-district like `hinterland`).
* §2.5 `ContextVector`: add `arena: 'ground'|'underground'` (keys the arena-specific rows of the granularity and site-plan
  tables, II.7.3).
* §2.6 (item 29): word the basement rule "a cellar never joins a sewer **as a room**; a cellar stair to a tunnel is an
  `AccessPoint` (II.7.3), allowed where the class row's `undergroundAccess` is true" (J-A12.42).
* §2.9 `Document`: a derived `features: Features` (II.7.4) recomputed on load with the report; outside the model digest.
* §2.8's entity registry and §13.2's path test: `AccessPoint`, the underground plots' and buildings' fields, `Tunnel`'s new
  fields.

**determinism (§5–§7)**
* §5.2: an **F-UNDER** row — where: the underground stage; detection: a plot sample in an excluded ground face (II.7.3's
  list); ladder: band depth → band lower depth → class minimum depth → `vacant` run; test: 0 committed underground faces with
  a sample in an excluded face (CI: a 1 m sample grid by `pointLocate`). F-PLOT's row: the alley rung is skipped on the
  underground arena (U2). The network stage's own row (a run needing more fall than the ground gives is re-routed toward the
  nearer outfall, never trenched).
* §5.3 rows: U1 (every underground plot's frontage rows on exactly one navigable open tunnel run; access ⊆ frontage) —
  batch-local, touched plots; U2 (no `way` chain, no `alley` face on the underground L1/L3) — stage-end; U3 (every
  underground building's frontage side on its plot's frontage edge) — batch-local; ≥ 1 `access` point per underground
  neighbourhood — stage-end; every `AccessPoint.ground.at` in public ground or a yard, never water or a wall strip —
  stage-end; the cross-arena read count of the underground stage's commit records = 0 writes on the ground `PlatKey` — CI.
* §6.1: the `sewer` concern's reader stages are the network stage (its routing and connection draws, the `pit` share);
  the existence draw is `blueprint.features` (S0's); the underground stage reads the ordinary `plot.*`, `siting`, `siteplan`,
  `heights` concerns keyed from the underground pseudo-district's lineage (§6.3: a pseudo-district's lineage as the
  hinterland's).
* §7.1: edit-target rows for `Tunnel` (draw, move, retype kind, delete, `setAttr` condition / preset) and `AccessPoint` (add,
  move, remove); `setLayer` on `underground` as the CITY / METROPOLIS toggle. §7.3: a row for the two staged stages — a
  ground edit re-derives the underground blocks whose recorded ground cells its clear region covers; a tunnel edit the blocks
  its edges bound; the underground's reroll writes only the `under` arena (its seam exception is empty). §7.4: the tunnel and
  access rows' lifecycle (create · read · persist · regenerate · undo · migrate).
* §7.8: the `sewers` control row — TOWN: model feature, discrete (auto / on / off), locality *re-derive from the network
  stage* (underground arena only); CITY and METROPOLIS: view control (`LayerSpec.visible`), no model effect; anchor II.7.1.

**rendering (§8, §9, §11, §12)**
* §8.4: the underground `LayerSpec.visible` default `false` at every rung; the cut-away or overlay shows one **depth band**
  (`depthBandCm` 250, II.7.3) at a time by view state; `elevationCm` on every underground entity is its depth below the
  datum.
* §8.2: style classes for tunnels by kind and condition (item 11's, the islands seat's states), underground cells and vaults
  (the `flat` roof kind's vault program), access points and gratings.
* §9: the underground pseudo-district's quarter label and its tunnel and cell labels are drawn only when the layer is
  visible.
* §11.1: VTT — one scene per depth band of the underground layer with its elevation; GeoJSON and CityJSON carry `baseCm`
  (depth) and `eaveCm` (ceiling) on underground buildings and the tunnel invert profile.
* §12.4: a budget row for the network stage and the underground stage (staged; measured at their intake), and the drain
  connection's distance query counted with S10b's rasters.

**scope**
* §1.1: `RungProfile` gains `layers: { sewers: SewerExistenceRow /* II.7.4 */; islands: … /* item 13's row, the islands
  seat's */ }` — one `layers` object holding both rows; the table gains a `layers` column: TOWN `law` (II.7.1's defaults),
  CITY and METROPOLIS `always`; the village rows (PART III item 5) `never`.
* §13.2 hook tests: a schema fixture of one underground neighbourhood (two navigable tunnels, a junction, six cells, one
  vault, one stair, two gratings) validates and passes every §5.3 row above; the existence draw's frequency over 1 000 TOWN
  seeds at three populations × three wealth levels lies within the law ± 3 s.e. and never reaches 1; CITY and METROPOLIS
  `Features.sewers` true on 100 % of seeds, TOWN with `off` 0 tunnels, a village request 0; with the layer hidden a CITY's
  render is pixel-identical to the same seed's render before the stages register; the underground reroll-isolation fixture
  (ground byte-identical); no underground face under an excluded ground face on the fixture and on B-CITY-lite with the
  `navigable` preset; every underground plot fronts exactly one navigable tunnel; ≥ 1 access per neighbourhood.
* §14: `StrategyRegistry` gains `underground: Map<string, UndergroundStrategy>`; the `Stage` list names the two staged
  registrations, and S14's `StageDecl.inputs` names their output keys (`under.tunnels`, `under.blocks`, `under.plots`,
  `under.buildings`, `under.access`) — or the model-wide key it already uses — so the topological order of §4.1 places both
  staged stages before the display list (II.7.2 relies on it).
* §16: price the hooks with the island and underground hooks at M4 (the rows, fields, invariants and fixtures ≈ 1–2 days);
  the stages themselves are staged, unpriced.
* The staged-list row "sewers and floating islands": add `RungProfile.layers.sewers`, `Features.sewers`, `Tunnel.navigable`
  and `headroomCm`, the profile table, `AccessPoint`, the U1–U3 rows, F-UNDER, the `underground` registry map, and "II.7" to
  its where column. D-3's paragraph: "fantasy sewers" → "the `navigable` sewer preset (II.7.2); the historical network is
  realism and is present by tier (II.7.1)". The landing rows for items 12 and 14 (home II.7; referencing §4.2, §4.5, §4.12,
  §10.2, II.1, II.6, PART III and the other parts above).

**assembler**
* The reference resolver's J-id grammar (`docs/validation/consistency/assemble-r0-refs.py`) does not admit the dot of the
  protocol's `J-A<item>.<n>` ids: on my copy it reports 25 entries, all of that kind, and 0 broken § pointers or D ids. The
  kernel seat flagged the same one-character widening (`J-[A-Z0-9.-]+?` and `(J-(?:[A-Z]+-?)?\d+(?:\.\d+)?)(?![\d.])`).
* Block order matters for II.6: my PART II append (II.7) is applied before my II.6 append in file order, so the II.6 pointer
  lands at the end of II.6, directly before `## II.7` (verified on the copy).
* Numbering: `## II.7` is new; if another seat also adds a `## II.7`, renumber mine to the next free number and its four
  `###` subsections with it (every internal reference reads "II.7.n").

## 5 Verification receipts

**CONFIRMED (executed).** A test applier written to the BLOCK PROTOCOL (`scratchpad/ps/apply_test.py`: REPLACE / INSERT
AFTER / APPEND TO SECTION by exact heading line with a subsection ending at the next same-or-higher heading and fences
ignored; J-ROWS after the index's last row; RATIONALE-A directly after Part A's last row) applied
`blocks-pipeline-sewers.md` (sha256 `a177eb924ed36404…`, 345 lines) to copies of the live documents (architecture sha256
`7a4e19db…c4ec762`, the route's snapshot): **10 applied, 0 skipped**; the architecture copy 9 669 → 9 978 lines in 9 hunks
at exactly the intended places — after §4.2 (l. 2946), §4.5 (l. 3262), §4.12 (l. 3915), §10.2 (l. 6681), II.1 (l. 9000), at
the end of II.6 (l. 9127: the pointer, directly before the new `## II.7`), the end of PART II (l. 9128: II.7, 261 lines
with four `###` subsections), the end of PART III (l. 9169) and the J index (after l. 9631: 10 rows); the rationale copy
1 858 → 1 868 lines, 10 rows after Part A's J-I19 row; headings 140 → 145; code fences 88 → 90 (one new `ts` block,
balanced). `doc_checks.py --sections "4,10,PART II,PART III,Judgment calls"` on the applied copy: C1 5 hits / 0
unreviewed, C2 0 / 0, C3 173 / 29, C4 1 / 0, S1 0 / 0, S2 0 / 0 — **the unreviewed set is identical to the untouched
document's** over the same keys (29 = 29, nothing extra, nothing missing; receipts `dc-orig.txt`, `dc-new5.txt`). Two
earlier drafts carried 20 and then 2 unreviewed C3 hits of mine (shared 5-token runs such as a cited file path and
"the same seed gives the same …"), all rephrased away rather than allowed (`dc-new.txt`, `dc-new2.txt`, `dc-new3.txt`,
`dc-new4.txt`); the 29 that remain are the untouched document's own corpus-growth false positives in §4.1, §4.11, §10.2,
II.1–II.6 and the J index, none in my text. The reference resolver on the copy: the 2 baseline entries plus 25 entries that
are all the dotted `J-A<item>.<n>` ids (its id grammar; see the assembler note), **0 broken § pointers, 0 broken D ids**.
Every named heading was grepped verbatim before writing (8 of 8 found) and every substitution during the rephrasing passes
was asserted to exactly one match. No deferral wording remains in the blocks (grep for TBD / later / open question /
defer: only PART III's own heading).

**PLAUSIBLE (reasoning only).** The mechanisms themselves — the TOWN law's coefficients (0.05 / 0.25 / 0.30 / cap 0.60), the
tunnel profile's bores, headrooms, wall thicknesses and navigability thresholds, the underground shares, offset (−0.25),
depth scale (0.35), vacancy share (0.25), reach distances and shaft spacings — are our own PLAUSIBLE defaults, provenance
"architecture 2026-09-26", calibratable (J-T, §13.7), and the sufficiency of S10's per-frontage regions for "no plot reaches
a second tunnel" under the underground depth band is a construction argument until §13.2's fixture runs.
