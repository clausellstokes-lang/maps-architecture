# Verify — rendering (§8, §9, §11, §12), round 1 (after repair round 1 / assemble-r1)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-rendering-r1t; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-rendering-r1t`, 2026-10-01, cloud checkout)
- P0 resume check (no output, no LANDED line): fresh start — done
- P1 inputs: brief, round-0 findings (29), assemble-r1, repair-r1-rendering preamble, g items 114–124, canon dated rulings — done
- P2 word diff pre-round (`484af066…`) → live (`137ecc0e…`) over every §8/§9/§11/§12 subsection — done
- P3 re-check of VRC0S-01..29 against the live text — done (29 FIXED)
- P4 new problems in every replaced subsection (whole diffs, with their seams to §2.5, §2.7, §2.9, §4.11, §7.7, §13, V06, V07, V09, V10, V11, V12) — done
- P5 G120–G124 routing for rendering — done (all five absent)
- P6 report, result file, LANDED — done

## Outcome

**16 issues: 0 blocker, 8 major, 8 minor** — owners rendering 14, scope 1, model 1.

* **Round 0: all 29 findings FIXED** in the live text (VRC0S-01 … VRC0S-29, including those owned by model — VRC0S-10, -19 —,
  pipeline — VRC0S-12 — and V11 — VRC0S-23). No round-0 finding of this seat was a RULING REQUEST, and assemble-r1 applied all
  20 of rendering's blocks (no skip, no merge).
* **Owner items.** Items 114, 116, 117 (with (f2)) and 118 PRESENT at rendering's homes; item 119 PRESENT but for (a2) — §12.1
  and R12-31 still read advance and the replay "as V06 §6 states them" (VRC1T-01, minor). Items **120, 121, 122, 123 and 124**:
  rendering's parts absent (G120-rendering … G124-rendering, major, F-MISSING; the brief expects these for repair round 2).
* **New problems the repair made (11):** a bridge-travel CONFLICT between §11.3 and §2.9/V09/T-V9-45 (VRC1T-02, major); two
  undefined edges — the parity presets against the season, festival and boat rows (VRC1T-03, major) and a sheet sun under 23.44°
  under the sun through the year (VRC1T-04, major); and seven minors (export comfort scope, `Progress` kinds, a restated V11 cell,
  two undeclared test identifiers, the `cvdVariant` default, the T-ER index in §13, §2.5's quarter producer).
* **Size.** §8/§9/§11/§12: 59 158 words in the pre-coherence archive → 70 005 before this round → **80 190** now (+14.5 % this
  round; +35.6 % against the archive). The growth is the owner's items 114–119 at build depth and file f item 468's API
  declarations (the repair's §4 accounts for every source). The unit did not shrink by half, so no shrink-nuance audit was due.
  The removals the repair made (451 words: restatement, the duplicated light-map key, narration, verbose prose) were each
  checked against their homes (§3 below), and no nuance was lost.

## 1. Method and coverage

* **Texts.** The live base (`docs/ARCHITECTURE.md`, sha256 `137ecc0e…`, = assemble-r1's installed hash) against the pre-round base
  (`git show 3f0e02b2d7b9:docs/ARCHITECTURE.md`, sha256 `484af066…`, = the hash the repairs were written against). Every
  subsection under `## §8 `, `## §9 `, `## §11 `, `## §12 ` was cut at its heading in both. A word-level diff
  (`git diff --no-index --word-diff`) of each was read whole. These are the 20 subsections rendering's blocks replaced: §8.1–§8.5,
  §8.7–§8.11, §9.1, §9.2, §9.5, §9.7, §11.1–§11.4, §11.6 and §12 whole, of which §12.6 and §12.8 came back byte-identical. The
  untouched §8.6, §9.3, §9.4, §9.6 and §11.5 are byte-identical to the pre-round text and keep their round-0 verdict, except
  where an owner item now routes a part to them (§8.6: G123).
* **Seams read.** For every name the new text reads from another unit: §2.5 (quarters), §2.7 (`Enceinte.condition`,
  `conditionMaterial`, `conditionEpoch`, `Gate.mouth`, `WaterBody.kind`), §2.9 (`yearWeek`, `seasonFollow`, `festival`,
  `cvdVariant`, `showUnexcavated`), §3.2 (1) and (9), §4.11 order (c), §7.7 (DR42, DR43), §10.2, §13.2 (T117-*, T118-*, T119-*,
  the T-ER index), §13.4 (B-ZOOM), §13.8. Volumes: V06 §6.8, V07 §3.x (festival keep-out), V09 (state table, §3.9, §4.21.9,
  catalogue rows `legend.wall.<state>`, `progress.<wait>`, T-V9-45), V10 §2.13, V11 (rows 52, 55, 92; §3.25.5–§3.25.7), V12
  (§3.15.9, `festival.blocked`, `wait.*`).
* **References.** assemble-r1's resolver run: 49 788 references, 0 broken. None of its 82 ambiguous-form references lies in
  §8/§9/§11/§12, and none of the record ids VRC0S-16 named (RIC-, RXC-, E-16 – E-19, EI-REDGE-, -XCONF-, -ICONF-, KERNEL-C05)
  survives in the scope.
* **G items.** Each of items 114–124 against the canon's dated ruling for rendering, and against the item's own text (a)–(k).
* **Scripts and scratch:** `scratchpad/coherence/vr1/` (the cut sections, the word diffs, `issues.py`, which writes the issue
  list below and the result file from one source).

## 2. Round-0 findings — re-checked against the live text

| id | owner | verdict | where it now stands |
|---|---|---|---|
| VRC0S-01 (g 114) | rendering | FIXED | §8.2: `wall.worn`, the six patch looks with their patterns, the run rows (`worn` notched at district and finer and `standing` at the city band; `patched` strip; `breached` break with rubble spill; `dismantled` dashed trace with trace-disc towers), `StateRow.legend`, the cue row, the greyscale bar against `cvdContrastMin`, the short-run rule; §8.3 states and census rows; §9.5 legend; §11.1 GeoJSON/glTF/CityJSON by run with `condition` and `material`, `.dd2vtt` and Foundry patch = wall, breach = opening; T-ER-19, T-ER-22. Agrees with §2.7 and V09's `legend.wall.<state>` |
| VRC0S-02 (g 116) | rendering | FIXED | §8.8 k_min = max(0, k_fit − margin), no tile coarser, moves with `bounds`/viewport; §8.7 and §11.1 VTT scope within `bounds`; §9.5 framing and *Fit the town*; §12.5; T-ER-08 restated |
| VRC0S-03 (g 117) | rendering | FIXED | §8.2 season rows (year position, climate columns, looks table, autumn crown colours and early green, thinning, leaf cover, creepers, ice by water kind with leads, snow by climate, checks, off form); §8.1 item 8; §8.4 sun through the year; §8.10 leaf colours and boats; §11.1; §12.5 re-skin; T-ER-23; R12-30. Agrees with §2.9, DR42, V11 §3.25.6 |
| VRC0S-04 (g 118) | rendering | FIXED | §8.2 decoration rows (V11's table read, place table, keyed placement, procession route, glyphs, motifs, cues, gate passages and carriageways excluded, slot 19b under labels — §8.3's census bar "0 over a label or its halo" defines the keep-out clause V07/V11/V12 cite), `live.festival` keyed in the tile key; §9.5; §11.1; §12.5; T-ER-24 |
| VRC0S-05 (g 119) | rendering | FIXED (its round-0 change) | §12 intro, §12.1 *Targets and the comfort level*, §12.3/§12.5/§12.9 re-read, §12.7 at the comfort level, §12.10's column "declared in D-18" and R12-31–R12-34. Item 119 (a2) (filed later) is VRC1T-01 |
| VRC0S-06 | rendering | FIXED | §11.3 `export.request { …, bundle?: true }`, the bundle the one exception to `E_HOST_FORMAT` |
| VRC0S-07 | rendering | FIXED | §8.2 names `cvdContrastMin` (ΔE2000 10, one cell of V11's `palette` table whose values row 52 homes in §8.2), read by T112-1 and J-V12.91 |
| VRC0S-08 | rendering | FIXED | §12.4 S11 row "≤ 3 µs per plot median (the kernel's M0 bar, §3.7)"; §12.7's hook cites §12.4's row |
| VRC0S-09 | rendering | FIXED | §8.4's toggle rule with its rung split and both model settings |
| VRC0S-10 | model | FIXED | §2.9 declares `cvdVariant: 'none' \| CvdVariant` (per viewer, outside every digest, `AppPrefs.cvdDefault` fallback) |
| VRC0S-11 | rendering | FIXED | §8.8 tile key: the year position, `weather`, `cvdVariant`, `showUnexcavated`, the festival display; §8.9's export request the same |
| VRC0S-12 | pipeline | FIXED | §4.11 order (c): departure matching (V06 §3.5.1) and the strike pool striking fabric only |
| VRC0S-13 | rendering | FIXED | §11.2: `plan`/`planReport` filtered through V03 §5.4's merge at the building band; the `history` kinds among the band-less kinds |
| VRC0S-14 | rendering | FIXED | §11.3 `party.render`: a viewer answered `doc.rejected { reason: 'role' }` |
| VRC0S-15 | rendering | FIXED | §11.1 and §12.2 point to §3.2 (1) (which holds the range and the aspect-2 frame); §12.2 keeps "12.4 km square (19.8 km with the margins)" |
| VRC0S-16 | rendering | FIXED | no record id remains in the scope; §8.5 "so no per-band detail budget exists"; §12.10 retitled |
| VRC0S-17 | rendering | FIXED | §8.8 "B-ZOOM's range, ≈ 1:45 000 → 1:500"; §13.4's B-ZOOM line now "from each map's zoom-out limit … to 1:500"; no "1:50 000" left in the set |
| VRC0S-18 | rendering | FIXED | §8.2's oasis sentence as §2.3/§2.7 record it |
| VRC0S-19 | model | FIXED | §2.7 `walkCm` "read by §11.1's glTF wall top" |
| VRC0S-20 | rendering | FIXED | §12.2: the village rungs' budgets are V07 §6's (file f item 495) |
| VRC0S-21 | rendering | FIXED | §11.1 and T-ER-19 "(an antenna: §3.6 rule 3)" |
| VRC0S-22 | rendering | FIXED | R12-23 cites V03 §2.4's `moduleCm` |
| VRC0S-23 | V11 | FIXED | V11 row 55's readers: §9.2's admission function and its consumers |
| VRC0S-24 | rendering | FIXED | §8.2's `unexcavated` gate (`lost` for every admitting key); §11.1 scoped, `excavation: 'lost'` |
| VRC0S-25 | rendering | FIXED | T-ER-09 at every rung; T-ER-14 at every rung with the spines' lifecycle and a B-EDIT fixture |
| VRC0S-26 | rendering | FIXED | the verbose-prose pass made and reported by source (repair §4: removed 451, of which verbose prose 138; what holds the rest stated — not a defect under principle (9)); every removal checked (§3 below) |
| VRC0S-27 | rendering | FIXED | §8.2's harbour-mouth chain row by `EraRow.harbourChain`; §8.3's catalogue |
| VRC0S-28 | rendering | FIXED | `wall.curtain` by each run's `stretchClass` thickness (`sampleProfile`); §8.3 census |
| VRC0S-29 | rendering | FIXED | `PreviewResult.empty?: MsgRef` |

## 3. The replaced subsections — what changed and what was checked

* **§8.1.** The `season` column and item 8 (`water.lead` marks — fast reaches, a mill's reach "its weir and race": the model has
  no weir apart from a mill, §2.3), the render tags of items 114, 117, 118 appended; the list of hash examples removed duplicated
  the tag table that follows. The attribute sizing (≈ 2.6 MB) agrees with R12-26. Concealed-light wording tightened, meaning kept.
* **§8.2.** Read whole against §2.7 (condition, material, epoch: values, knot roles, readers), §2.9 (the four keys), DR42/DR43,
  V11 §3.25.3/§3.25.6/§3.25.7 (every table, column and value the rows read exists: `season.water` kinds and lags,
  `season.surfaces` phases, `season.leaf` weights and early-green shares, `season.cover` surfaces, the festival tables) and V09's
  catalogue keys. The palette receipts' pairs are stated; the greyscale bar reads `cvdContrastMin`. New problems: the parity
  presets (VRC1T-03) and the `cvdVariant` default (VRC1T-10).
* **§8.3–§8.5.** New census rows for items 114, 117, 118; the receipt recap moved to §8.4 (c) (its receipts and bars there). §8.4:
  the toggle rule (VRC0S-09), the pyramid recap removed (its definition stands in §8.8: level 0 the texels, levels 1–9 never
  below the heights they cover), the light-map key's components now stated once in §8.8 with every switch kept (base key,
  content version over the light-dilated tile, light-mark revisions, week, hour, `light`; the toggles, `plotsOnly`, `storey`,
  `depthBand` and the knowledge key over concealed marks and hosts), the sun through the year (VRC1T-04).
* **§8.7–§8.11.** The zoom-out limit (VRC1T-07 for its restated value), the tile key, the export request, the boats class, T-ER-08,
  -09 and -22 – -24 (VRC1T-08 for two names; VRC1T-09 for their index in §13).
* **§9.1, §9.2, §9.5, §9.7.** The island root (VRC1T-11 for §2.5's comment), the legend and framing lines, the count badge's step
  (file f item 348 as written), T-ER-14 and the dropped record ids.
* **§11.1–§11.4, §11.6.** Items 114, 116, 117, 118 in the formats; the reader-answer types declared once in §11.2 (V10 §2.13 now
  cites them); `Progress` (VRC1T-06); the *Knowledge* paragraph's closing sentence, removed, restated rule (3) of *The oracle
  under the key*, which still covers every answer and the concealed parts; §11.3's bundle and `party.render` (VRC0S-06, -14) and
  its view-state rule (VRC1T-02).
* **§12.** Every "owner's veto" re-read as a D-18 target miss; the comfort level, measured-gain and progress rules; PNG and lit
  export budgets at 10 s with their expected outcomes stated (no stale 20 s / 30 s figure left in the set); R12-30 – R12-34.
  New problems: item 119 (a2) (VRC1T-01) and the export comfort scope (VRC1T-05).

## 4. Owner items — rendering's parts

| item | canon routing (rendering) | status |
|---|---|---|
| 114 | §8.2 state rows, legend, greyscale; §11 condition and material, patch = wall, breach = opening | PRESENT |
| 116 | §8.8 limit; §9.5; §12.5; T-ER-08 | PRESENT (VRC1T-07 minor) |
| 117 (with (f2)) | §8.2 season rows and autumn covers; the view sun; §11; §12.5 | PRESENT (VRC1T-03, -04, -08) |
| 118 | §8.2 decoration rows; §11; §12.5 | PRESENT (VRC1T-03) |
| 119 | §12 targets, comfort level, measured gain, progress, D-18, §12.10 | PRESENT |
| 119 (a2) | §12 lists advance and the replay among the one-time waits in total | PARTIAL — VRC1T-01 |
| 120 | §8.2, §9.5, §11.1, §11.2, §12.5 | ABSENT — G120-rendering |
| 121 | §8.8, §8.4 (g), §12.1, §12.5, §12.8 | ABSENT — G121-rendering |
| 122 | §8.2, §11, §12.5 | ABSENT — G122-rendering |
| 123 | §8.6, §11.1 | ABSENT — G123-rendering |
| 124 | §8.2, §8.4, §8.8, §11, §12.5 | ABSENT — G124-rendering |

## 5. Issues

### G120-rendering — major · F-MISSING · owner rendering

**Claim.** g item 120's rendering part is absent (expected this round: rendering's repair began before the 02:33 filing). §8–§12 hold no Find look, tool, export or budget — no reader of §2.9's `find` key, no veil, halo, outline, pin or count-bubble row, no Find tool in §9.5, no export rule in §11.1, no gazetteer class counts or match listing by class, area and layer in §11.2, no overlay budget in §12.5 — while V09 (the Find panel and its `live.find` provider), V11 row 55 ("Find's lists, counts and glow"), V12 §3.15.10 and §3.15.9 (5) ("Find's suggestions and glow") read them.

**Required change.** Write rendering's part as the canon's dated ruling ('File g item 120 routed') names it, at build depth: §8.2 — the Find overlay rows: the veil (the style's `paper` at α 0.55 over everything but the matches), each match drawn above it at full strength with the halo (a soft outer glow in its chip's colour fading to nothing over about 8 px, inside a 2 px outline, its label kept above the veil), an area chip lifting its whole area and glowing along its boundary, at the city band a pin with the chip's glyph where a match is under about 6 px and pins closer than about 24 px merged into a count bubble, faint ghost pins for matches on another layer; each chip's colour from the thematic palette and its second cue (its pin glyph and a dash pattern on its halo's outline; colours repeating past eight chips, the glyph telling them apart); an overlay above the tiles that never re-renders a base tile, labels and chrome above it; §9.5 — Find among the tools; §11.1 — picture exports draw Find as shown with its chips in the legend, battle-map exports leave it off unless asked; §11.2 — the gazetteer's class counts and its match listing by class, area and layer (with the counts on other layers), under §9.2's admission function; §12.5 — the overlay's interaction budget (suggestions within about 50 ms of a key, a chip's glow within about 100 ms of the click, its index rebuilt once per commit, held at the metropolis cap) with an R12 row beside R12-34's interaction rows; §8.11 — the edges (no match; every band and layer; a commit, regenerate, undo, advance and season change re-evaluating the chips; the knowledge canary never drawn).

### G121-rendering — major · F-MISSING · owner rendering

**Claim.** g item 121's rendering part is absent (filed after every round-1 repair began). §8.8 keeps three hardware tiers and the tile-DPR steps 3 → 2 → 1.5 → 1 with no Resolution setting, no steps below 1, no ultra tier, no 4K live-view ceiling and no live Auto loop; §8.4 (g)'s light ladder states no order of what Auto gives up; §12.1, §12.5 and §12.8 name neither the ultra tier nor the loop.

**Required change.** §8.8 — the Resolution setting (Auto, the default · 4K · 1440p · 1080p · 720p; V09's `AppPrefs.resolution`, device state, never the document, its hash or the log): a manual level's tile DPR d = min(the device pixel ratio, the level's height ÷ the screen's CSS height) rounded down to the ladder 3 · 2 · 1.5 · 1 · 0.75 · 0.5 (the two steps below 1 drawn below CSS density and scaled up); the live view's 4K ceiling (at most 3 840 × 2 160 device px for the whole view, a larger screen drawn at the 4K-equivalent DPR and scaled up); the ultra tier (canvas ceiling 512 MB, tile-DPR cap 3); the Auto loop (a frame-time p95 over the tier's frame budget through 2 s steps one rung down; under 60 % of it through 10 s with the canvas need fitting, one rung up; applied only when the view settles, at most once per 10 s; a device-pixel-ratio change re-evaluating at once); a manual level the device cannot hold drawing the nearest level that fits and saying so; exports byte-identical whatever the setting (§8.7's any DPI stands); §8.4 (g) — Auto gives up, in order, lighting detail (full precision → the standard surface → the half-resolution global term), sharpness (the DPR down to 1), the light pass (the vector rung), then the steps below 1, while labels, text, the chrome and every overlay stay at the device's full pixel ratio; §12.1 — `bench/calibrate` picks ultra only where the device reports its memory and clears the tier's bar; §12.5 — the frame budgets the loop holds (60 fps on the reference and higher tiers, 30 fps on the low tier) and the settle rule; §12.8 — memory per tier with ultra (native 4K lit at full precision within 512 MB); §8.11 — the edges (a fixture at its threshold, no oscillation; a monitor change; a manual level beyond the device; a gesture in progress).

### G122-rendering — major · F-MISSING · owner rendering

**Claim.** g item 122's rendering part is absent (filed after every round-1 repair began). §8.2 draws a `ConditionOverlay` only as a settlement-wide wash with a legend row (`condition.siege` …); no crisis look, its placement, its tile key, its exports or its budget exists in §8.2, §8.8, §11.1 or §12.5.

**Required change.** §8.2 — the crisis look rows by tier and band, read from §10.2's crisis look table through §7.7's derivation row for every condition standing in the view's week (item 117's year position): siege — camps beyond bowshot (≈ 300 m), the trench and earthwork line, engines facing the gates or the weakest stretch (item 114's), burned farmsteads, blockade camps on an unwalled place's approaches; mass immigration — a tent and shanty camp on common or fallow land by a gate, carts and fires, sized by the arrivals; disease — a fenced quarantine camp with huts, pest-house, grave rows and smoke, marked doors and a cordon at the neighbourhood band; famine — bare withered fields over item 117's crop stage, empty pens, shuttered stalls; beast attack, raiders, occupation, rebellion, boom and bust as item 122 (b) lists; disaster — whole neighbourhoods in a temporary ruined state, the share by severity, the pattern by kind (fire downwind through contiguous blocks, flood on low ground by the terrain raster, earthquake scattered), the calamity's `targets` winning; the regional pressures no look; every element placed by keyed draws of the seed, the condition's id and the place, several crises sharing the outskirts by priority (siege, quarantine, refugees) under a density cap, never on water, a gate's passage or a label's keep-out; city band clusters, the siege line, smoke and the ruined tone, district band engines, tents and fences, neighbourhood band doors, rubble and detail, each with its second cue; a `base` live layer joining the tile key; the Show crises switch and a manual preview (view state); a condition the viewer's key withholds not drawn (§9.2's admission); §11.1 — picture exports draw the looks, battle-map exports in the image only, never walls or obstacles; §12.5 — drawn lazily per visible tile; §8.11 — the edges and the no-op pin (no condition and no preview: tiles byte-identical).

### G123-rendering — major · F-MISSING · owner rendering

**Claim.** g item 123's rendering part is absent (filed after every round-1 repair began). §8.6 draws a decayed or ruined building's plan uniformly (V03 §5.1's broken ink over rubble stipple), with no partial, progressive damage; §11.1's battle-map rows take `line_of_sight` from every plan wall with no damage reading.

**Required change.** §8.6 — the damaged plan drawn over the same plan: each plan element (wall run, floor area, door, window, stair, roof bay over a room, furniture piece) drawn broken where the building's decay level has passed that element's keyed threshold (§6.3) — `abandoned` dust, debris and doors off; `decayed` floor holes, fallen partitions, roof holes, rooms marked unsafe; `ruined` broken outer walls, upper storeys floorless over the void, rubble heaps, cellars and crypts by their own thresholds; a restored element in patch material (item 114) — the damage monotone in the level and never relocated, and the building band's exterior drawing the same damage (a roof hole over a room; a broken outer wall a gap in the footprint's outline); §11.1 — battle-map exports follow the damage: a fallen wall run leaves `line_of_sight`, a doorless opening is a gap, rubble heaps and floor holes drawn in the image only, never invented as walls; §8.11 — the edges and the no-op pin (a building never decayed byte-identical to today's plan).

### G124-rendering — major · F-MISSING · owner rendering

**Claim.** g item 124's rendering part is absent (filed after every round-1 repair began). §8.2's `weather` key is the only weather (cover rows); §8.4 has no shower dimming, fog scattering or night halos; §8.8 no effects layer; §11 and §12.5 no rule or budget. §8.2's snow default ('a viewer's value stands') and V11 §3.25.6 ('a user may still switch the `snow` weather on') still let the `snow` cover lie where the climate's winter does not freeze, against item 124 (c)'s hard rule (no snow, falling or lying).

**Required change.** §8.2 — the weather effects' marks per style family (fine ink strokes for rain, dots for snow, stipple for mist in `ink` and `hatched`, soft translucent streaks in `lit`, faint ripples on water during rain; no lightning or flash, every change of light taking seconds) and the hard rule: neither falling snow nor the `snow` cover is drawn where the climate row's winter is `none`, whatever the viewer's `weather`; §8.4 — the shower's dimming of the global light's direct term and its softened shadows, fog's scattering (soft, faint shadows, the map fading toward the fog's colour away from the view's centre, a soft halo round every `LightSource` at night) as per-frame light terms, the vector rung a wash and the halos only; §8.8 — the effects layer above the tiles and below labels, the chrome and every overlay, never in the tile key; §11 — every export leaves the effects out, byte-identical with them on or off; §12.5 — about 1 ms per frame at the densest spell on the reference hardware, the first thing item 121 (e)'s Auto gives up; §8.11 — the edges (reduced motion, the low tier and phones off by default; a spell during an export; the timeline replayed from its seed and clock).

### VRC1T-01 — minor · F-MISSING · owner rendering

**Claim.** g item 119 (a2)'s rendering part is not written: §12.1's comfort-level list reads "an advance of time and item 113's history replay, read as V06 §6 states them" and R12-31 "an advance of time and the history replay as V06 §6 reads them" (the repair's 'Held (VV56-07)'); the owner chose TOTAL (J132) and the canon routes to rendering "§12 lists advance and the replay among the one-time waits in total", as V06 §6.8, V12 §3.15.9 (2) and V12's `wait.advanceTime` / `wait.historyReplay` rows now state.

**Required change.** §12.1 reads "… an `advance` of time and a history-first generation (item 113's replay with the peak's generation before it), each in total, never per epoch (item 119 (a2); V06 §6.8 coarsens the cadence until its estimate fits) …", and R12-31's wait list reads "… an advance of time and the history replay, each in total (item 119 (a2)) …".

### VRC1T-02 — major · CONFLICT · owner rendering

**Claim.** Which view keys cross the bridge disagrees between §11.3 (the home §2.9 names) and §2.9 and V09. §2.9 (model's round-1 block) declares `yearWeek`, `seasonFollow`, `festival` and `cvdVariant` "four per-viewer keys (never over a bridge, §11.3)"; V09's state table says the per-viewer keys travel "never (§11.3)" (listing those four with `thematic`, `workingLayer`, `underlay`, `showUnexcavated` and V09 §4.19's keys) and T-V9-45 tests that "the per-viewer keys never cross a bridge"; §11.3's replaced *View state* bullet says "Every view key of §2.9 …, the per-viewer keys among them, travels as `view.set` / `view.changed`, except the pointer that moves the cursor sun and the `underlay` image". A bridge built to §11.3 fails T-V9-45 and carries the keys §2.9 keeps local.

**Required change.** §11.3's *View state* bullet reads "Every view key of §2.9 (…) travels as `view.set` / `view.changed`, except the pointer that moves the cursor sun, the `underlay` image (§9.5) and the per-viewer keys a viewer's client keeps — `yearWeek`, `seasonFollow`, `festival`, `cvdVariant` (§2.9), `thematic`, `workingLayer`, `showUnexcavated` and V09 §4.19's per-viewer keys —, which never cross the bridge; `knowledge`, which the host sets per viewer (below; J-A30.82), travels."

### VRC1T-03 — major · EDGE-UNDEFINED · owner rendering

**Claim.** The parity presets × this round's looks (principle (11): every toggle and preset). §8.4 (h): "Every default row of ours — the field model, the cursor sun, the moon, the point lights, the ambient, occlusion and spill terms — carries the `extension` marker, so the parity presets switch it off"; the new rows of ours — §8.2's season looks, leaf colours, leaf cover, creepers, ice and leads and the climate snow default, §8.4's sun through the year, `live.festival` and §8.10's `boats` class (drawn in every week) — state nothing for the presets. At the standalone default (week 19) the `FTG` preset's fixed sun would stand 23.44° above its sheet's altitude and meadows draw `meadow.mown` swaths, and `MFCG` and `FTG` would draw boats, so the presets' look and §13.5's parity metrics move with no stated outcome.

**Required change.** §8.4 (h)'s sentence reads "Every default row of ours — the field model, the cursor sun, the moon, the point lights, the ambient, occlusion and spill terms, item 117's season rows and sun through the year (§8.2, *Sun* below), item 118's decorations (`live.festival`) and §8.10's boats — carries the `extension` marker, so the parity presets switch it off: a parity preset draws the map as drawn, under its sheet's sun, in every week"; T-ER-23 and T-ER-24 add a parity-preset fixture whose tiles are equal in all 52 weeks and with a festival shown.

### VRC1T-04 — major · EDGE-UNDEFINED · owner rendering

**Claim.** §8.4's new *Sun through the year* sets the fixed sun at `altitudeCdeg` + δ(w) (δ down to −23.44° at midwinter) and the cursor sun's h₀ = `heightRatio` × tan(that altitude) ÷ tan(`altitudeCdeg`), and `SunSpec.altitudeCdeg` has no declared range (a sheet is data: saved, edited or a preset's). A sheet under 23.44° puts the fixed sun at or below the horizon in its midwinter weeks (h₀ ≤ 0; sin α_f ≤ 0 in E_key = E_g · (a + sin α_f)), and a sheet at 0° divides by tan 0; no outcome, fallback or test is stated (T-ER-23 sweeps the weeks on the shipped 45° sheets only).

**Required change.** §8.4's *Sun through the year* clamps the drawn altitude to [atan ⅛ ≈ 7.1°, 89°] (the altitude at which *Sun*'s 8× shadow cap starts) and takes the cursor ratio as tan(the clamped altitude) ÷ tan(max(`altitudeCdeg`, 7.1°)); the sheet loader clamps a `SunSpec.altitudeCdeg` outside (0°, 90°) into it and reports it; T-ER-23 adds sheets at 10° and at 0° swept through all 52 weeks (the sun above the horizon in every week, every value finite).

### VRC1T-05 — minor · CONFLICT · owner rendering

**Claim.** The export comfort level's scope contradicts itself. §12.1 binds it to "an export, in every format the export dialog offers at its sizes up to A2 at 300 dpi", while §12.7's PNG fallback ends "(R12-31; a wait past the comfort level is never offered)" and R12-31 times "an export of every offered format and size"; V09's export dialog offers custom pixels and §8.7 exports at any DPI (item 121 (b): "§8.7's any DPI stands"), so a custom size past A2 at 300 dpi is both offered and, by §12.7, never offered, with no stated outcome against the comfort level.

**Required change.** §12.7's parenthesis reads "(R12-31: no preset print size whose export would pass the comfort level is offered; a custom pixel size or DPI past A2 at 300 dpi stays offered, §8.7, outside the comfort level as §12.1 scopes it, its progress shown by §12.1's rule)", and R12-31's export clause reads "an export of every offered format at every preset size up to A2 at 300 dpi".

### VRC1T-06 — minor · WIRING · owner rendering

**Claim.** §11.2's new `Progress` posts `wait` kinds 'epoch' | 'history' | 'dossier' | 'export' | 'migrate'. V09 §4.21.9 and V09 §3.9's Go back to here read `progress.undo` (events undone of the total), which no `Progress` member posts — and `edit`, which carries that grouped undo jump, takes no `onProgress` — a dangling input; and `open`'s comment folds "the replay of load verification and a migration" into 'migrate', which V09 words "Updating this town to this version", so a plain open's verification is named a migration.

**Required change.** `Progress`'s `wait` gains `'undo'` (events undone or redone of the total) and `'verify'` (an open's load-verification replay: events replayed of the total); `edit` takes `opts.onProgress?: (p: Progress) => void`, posted as `'undo'` for a group of `undo` or `redo` events; `open`'s comment reads "the load verification replay ('verify') and a migration ('migrate')"; V09's `progress.<wait>` row gains `verify` (V09's follow-up).

### VRC1T-07 — minor · CONFLICT · owner rendering

**Claim.** §8.8's zoom-out limit restates a V11 cell's value: "the margin is V11's base settings cell (1 stop, V11 §3.25.5)"; V11's registry row 92 (J-V11.106) holds `view.zoomOutMarginStops` "here … the base cites the cells by name and states no value", as the base does for the row's other cells (`reroll.maxAdvance`, `crossing.searchBandM`, `index.gridCellM`) (principle (1)).

**Required change.** §8.8 reads "… and the margin is the base settings cell `view.zoomOutMarginStops` (V11 §3.25.5)" — the value "1 stop" dropped.

### VRC1T-08 — minor · TERM · owner rendering

**Claim.** T-ER-23 (§8.11, new) names two identifiers declared nowhere in the set — "a water mark with no `iceKind`" and "a face with no `seasonKind`"; §8.1 item 8 carries both as the halves of each mark's `season` column (its ice kind in the high 16 bits, its `season.surfaces` row index in the low 16, ~0 where it has none).

**Required change.** T-ER-23's cases read "a water mark whose `season` column holds no ice kind; a face whose `season` column names no `season.surfaces` row (§8.1 item 8)".

### VRC1T-09 — minor · WIRING · owner scope

**Claim.** Rendering's round-1 block adds T-ER-22, T-ER-23 and T-ER-24 to §8.11, but §13.2's index still reads "T-ER-01 – T-ER-12 (§8.11), T-ER-13 – T-ER-18 (§9.7) and T-ER-19 – T-ER-21 (§11.6)" and §13.8's CI-tier row "T-ER-01 – T-ER-21", so the three rows have no scheduled tier (rendering's hand-off to scope).

**Required change.** §13.2's line reads "T-ER-01 – T-ER-12 and T-ER-22 – T-ER-24 (§8.11), T-ER-13 – T-ER-18 (§9.7) and T-ER-19 – T-ER-21 (§11.6)"; §13.8's row reads "T-ER-01 – T-ER-24 (the rendering, label and export edges: §8.11, §9.7, §11.6)".

### VRC1T-10 — minor · CONFLICT · owner rendering

**Claim.** `cvdVariant`'s default disagrees: §8.2 selects the variant "by the per-viewer view key `cvdVariant` (`'none'` default; V09's view settings)"; §2.9, the key's home, reads an absent or unknown value as V09's machine default `AppPrefs.cvdDefault` ('none' until the user sets it), written by V09 §4.21.2's Colour vision chip — so a viewer whose machine default is set reads 'none' by §8.2.

**Required change.** §8.2's parenthesis reads "(§2.9's key: absent, V09's machine default `AppPrefs.cvdDefault`; V09 §4.21.2)".

### VRC1T-11 — minor · CONFLICT · owner model

**Claim.** §9.1 (rendering's round-1 block, VAL-18) now builds a sky island's root `QuarterNode` by S13a over the island's districts after its unit run (V05 §3.14); §2.5's comment still reads "Quarters are §9.1's QuarterNode merge tree, built by S6 (§4.5)", restating the producer in part (rendering's hand-off to model).

**Required change.** §2.5's comment reads "Quarters are §9.1's `QuarterNode` merge tree — built by S6 on the ground (§4.5) and, for a sky island's root, by S13a (§9.1; V05 §3.14) —; its city cut is the city-LOD label unit (§9.4)".

## 6. CONFIRMED versus PLAUSIBLE

**CONFIRMED (read or executed):** the live and pre-round hashes; every replaced subsection's word diff read whole; the 29
round-0 verdicts, each against the live line it cites; the names §8.2 reads, present in §2.7, §2.9, §7.7 and V11 (by grep and
reading); the absence of items 120–124 in §8–§12 (by grep and reading); the contradictions of VRC1T-02, -05, -06, -07, -10, -11
(both texts quoted); T-ER-22 – T-ER-24's absence from §13.2's and §13.8's indexes; no record id left in the scope; no stale
20 s / 30 s export figure; the word counts (59 158 / 70 005 / 80 190).
**PLAUSIBLE:** the outcomes VRC1T-03 and VRC1T-04 describe (a parity preset drawing the season rows; a sheet sun below the
horizon) are read from the text's formulas and the absence of a stated exception, not executed; the repair's palette and looks
receipts (`coh_repair_rendering_r1_palette.out`, `coh_repair_rendering_r1_looks.out`) were taken as the repair reports them, not
re-run.
