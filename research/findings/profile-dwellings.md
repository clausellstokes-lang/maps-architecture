# profile-dwellings — watabou's Dwellings (build 17195045) measured from outside: capture-and-profile lane

> PENDING FABLE REVIEW — Opus-produced (lane `dwellings/profile`, 2026-09-26); a Fable critic and a confidence assessment follow.
> Clean-room: behaviour measured through the profiler (coverage call counts attributed by the Haxe `__name__` markers,
> draw and vertex records, screenshots, console lines, URLs). No captured JavaScript bundle was opened; stack-frame
> method names quoted below come from V8 error stacks, not from reading the bundle.
> Evidence grades: [STATED] creator · [SHOWN] observed in a capture/probe (file cited) · [INFERRED] reconstruction ·
> [NAMED-ONLY] only a class/method name is known. Conclusions: CONFIRMED (executed or read on disk) / PLAUSIBLE (reasoning).
> Paths are relative to `captures/dwellings/` unless they start with `research/`, `profiler/` or `docs/`; probe outputs cited by
> bare name — `probe-*.log`, `resolve-build.log`, the dialog screenshots (`context-menu.png`, `tags-dialog.png`, `style-dialog.png`,
> `blueprint-editor.png`) and the step folders `plan/`, `plan2/`, `plan3/`, `blueprint/`, `seed/`, `urltags/`, `doors/`, `keys/`,
> `keys2/`, `floors/`, `stuck/` — are under `captures/dwellings/_probes/` (citation note added on resume, 2026-09-26).

STATUS: COMPLETE — §1–§2 by the first seat, §0 and §3–§9 by the continuation seat (2026-09-26); corrections to §1 and §2.3 are marked in place.

## 0. Headline findings

The ten things that matter most for a re-implementer of a floor-plan rung that starts from a known footprint, storey count, entrance and function:

1. **Dwellings already has that hand-off.** A permalink carries a cell bitmask of the ground plan (≤ 11×11 cells, row-major, four cells per hex digit), the entrance as one boundary edge, `floors`, `seed` and `tags`; with a plan, the size tags do nothing. Only one connected part is built — the part holding the last filled cell in row-major order, not the largest — holes are filled, and a malformed entrance code crashes the build (§2.3). [SHOWN, CONFIRMED]
2. **Everything lives on a unit cell grid.** Rooms are unions of cells (51–66 % rectangles, ≈ 5 cells each whatever the house size), walls run on cell edges, a stair end takes exactly one cell, windows are a fixed 0.32-cell module on about two of every three exterior cell edges (§7). [SHOWN]
3. **The pipeline is a fixed sequence with no global retry:** tags → ground shape → entrance → storey count → stair rolls → one plan per storey (recursive partition, corridors, doors) → stairs between storeys → role assignment → windows → furniture and lights → elevation parameters → name (§3.1). The partition never looks at the room programme: Ctrl+Enter re-assigns rooms, windows and furniture on unchanged walls; Shift+Enter re-partitions every storey inside unchanged outlines (§3.4). [SHOWN]
4. **Footprint size bands and storeys:** ground storeys of 11–16 (small), 16–24 (medium) and 27–33 (large) cells, drawn as unions of about 4–5 rectangles with rejection (the same candidate stream for every tag of a seed); 1–6 storeys above ground (`low` 1–2, `tall` 3–6, `floors=` overrides); upper storeys usually smaller (mean 0.57–0.73 of the ground); basements lie inside the footprint and stay near 11–16 cells (§4.2, §4.3, §7). [SHOWN; the acceptance rules INFERRED]
5. **The partition is a recursive notch-cutting split.** `Plan.divideArea` recurses up to ~25 levels; every non-final call looks for a re-entrant corner (`getNotch` ≈ `divideArea` − rooms); `organic`/`mechanical` change the cut style, `hallways` adds corridor pieces and nooks joined by openings; rooms without a 2×2 block (corridors, nooks) are a third of the rooms but 13–17 % of the area (§4.4, §7). [SHOWN; the cut rule INFERRED]
6. **Vertical circulation is a chain:** exactly one staircase per adjacent storey pair (`Staircase.new` = 2 × `connectFloors`, `connectFloors` = storeys − 1, 92/92), or one spiral stair through all above-ground storeys plus one straight stair to the basement; a trapdoor when no cell is free; `stairwell` stacks the stairs. Every house has exactly one entrance (92/92 ground storeys). With the exports lane's JSON (each storey's door graph a tree) the house is a tree rooted at the street (§4.5, §4.6). [SHOWN]
7. **Function comes from two printed programmes, rule-exact in 92/92 houses:** must-haves `living room, bathroom, bedroom` + one special; then `kitchen, storage, hall, gallery`, 0–2 specials, one bedroom per upper storey, a bathroom and an attic when there are upper storeys, a cellar when there is a basement. Each type is placed only where its validator accepts the room (above ground, underground, top floor, small, door and window constraints); leftovers become generic rooms. Of 28 registered types, 13 appear as specials (§4.7). [SHOWN; the scoring INFERRED]
8. **Role assignment, not geometry, is the expensive part** — median 0.9 / 2.3 / 6.0 ms of a 1.9 / 4.1 / 8.0 ms house (small / medium / large), up to 24 ms; the whole partition is under 2.2 ms. A whole Enter regeneration including one frame costs 5–40 ms, so exhaustive validation and rejection sampling are affordable (§5). [SHOWN]
9. **Determinism is per permalink, not per seed.** Seed + tags (+ plan, floors) reproduce every layer of a house exactly — all but the light gradients, which carry an unseeded jitter (§1 correction) — and the permalink reproduces an Enter-made house; tags are not derived from the seed; the Enter chain is deterministic for a given load and key history, but re-rolls and some view keys advance the same PRNG and neither re-roll is recorded in the URL (§1, §3.4). A settlement generator must store every parameter, and treat re-rolled houses as unreproducible. [SHOWN, CONFIRMED]
10. **The drawing is a fixed stack of per-layer canvases in cell units:** floors (with same-colour hairlines), dashed grid, furniture, stairs, light and ambient-occlusion gradients, walls (black-outlined grey pieces), windows (black-edged grey bars), labels that scale, rotate and abbreviate; upper storeys are drawn over the roof of the storey below; nine named colours and five schemes, five wall styles (§6). [SHOWN]

## 1. Build identity and harness facts

| item | value | evidence |
|---|---|---|
| build | itch page embeds `https://html-classic.itch.zone/html/17195045/bin/index.html` (the only html-classic match); `index.html` and `Dwellings.js` `Last-Modified` Wed 24 Jun 2026 02:15:20 GMT | CONFIRMED `_probes/resolve-build.log` |
| page | `index.html` 2,162 bytes: loads `./Dwellings.js` (1,368,261 bytes), declares the fonts Share Tech Regular and Share Tech Mono by `@font-face`, and calls `lime.embed("Dwellings", "openfl-content", 0, 0, { parameters: {} })`; title "Dwellings" | CONFIRMED `_probes/resolve-build.log`, `2026-09-26T22-56-56/coverage/network/index.jsonl` |
| data assets fetched at start-up | `gothic.json5` 3,221 B · `tavern.json5` 1,084 B · `wooden.json`, `blueprint.json`, `bw.json`, `natural.json`, `plain.json` ≈500 B each · `grammar.json` 899 B · two WOFF fonts. Not opened by this lane. PLAUSIBLE: the two JSON5 files are the room programmes behind context menu *Rooms > Gothic / Tavern* (`model.LoadedHouseType.new` runs exactly twice at start-up), the five ~500-byte files are the five colour schemes (keys 1–5), `grammar.json` feeds the house-name grammar (`com.watabou.tracery.*` runs every generation) | network index (sizes CONFIRMED; roles PLAUSIBLE) |
| stage | one DOM canvas 1500×1100 drawn by OpenFL's WebGL renderer; each display layer is rasterised with Canvas2D onto its own off-screen canvas and uploaded as a texture (34–50 `texImage2D`, 28–61 `drawElements` per generation) | CONFIRMED `2026-09-26T22-56-56/draw/gen-*.draw.json` |
| model scale on screen | one grid cell = 99.1–99.5 px in every layer (CTM scale of the painted paths); line widths are given in cell units (0.02 = 2 px) | CONFIRMED `_probes/paths-summary.mjs` on `2026-09-26T23-11-32/draw/gen-0.paths.json` |
| console | the build prints its own trace, once per generation: `Blueprint.hx:26: [tags]` (or `Drafter.hx:59: <w>, <h>` when a plan is passed), `House.hx:41: <seed>`, `House.hx:42: [tags]`, then two `HouseType.hx:22: [...]` room-type lists. Occasional extra lines: `House.hx:373` "No available cells for a staircase, spawning a trapdoor instead" (the build's own spelling is *trapdorr*), `rooms/Chapel.hx:43` "No place for an altar?". **No per-stage timings.** | CONFIRMED every `console.jsonl`; `_probes/probe-seed.log`, `probe-plan.log` |
| generation marker | `House\.hx:\d+: \d+`, added to `TARGETS.dwellings` in `profiler/lib/common.mjs` by this lane. Reason: on the second and later navigations in one browser Lime fails to detect its (already cached) web fonts and waits about 3 s before starting the app; without a marker the idle detector settled on the blank page (all reload steps of `_probes/probe-seed-nomarker.log` show the same blank screenshot `b675ecbabe`). The marker changes only record.mjs runs of this target | CONFIRMED |
| regeneration | Enter = new house, generated synchronously inside the key event (zero busy polls after the key; the draw log shows the whole render within 30 ms of the key) | CONFIRMED `2026-09-26T22-56-56/*/gen-1..3.idle.json` |
| URL parameters | read at load and **rewritten after every generation**: `seed`, `tags`, `floors`, `plan`, `w`, `h`, `entrance` (§2). The Permalink dialog shows the same query on `https://watabou.github.io/dwellings/` | CONFIRMED `_probes/probe-blueprint.log` #7, `probe-params.log` |

**Randomness and determinism** (`_probes/probe-seed.mjs`, `probe-seed.log`; `seed/sessionA|B/steps/`):

- **Same seed + same tags ⇒ the same house, byte for byte.** `?seed=12345&tags=medium` loaded in two fresh browsers and reloaded in one gave the identical paint log (timestamps removed), identical vertex record and identical screenshot md5 (`1a036faa19…`, draw `135f3b60c7…`, paths `fc54d6620d…`) — CONFIRMED. The same held for every repeated load in the later probes (`probe-ui.log`, `probe-tags.log`, `probe-blueprint.log` #1). The font-detection failure on reloads does not change a pixel.
- **Tags are not derived from the seed.** `?seed=12345` alone got `small,square,low,hallways`, then `small,square,low,organic` on reload, and `large` in a fresh browser; the chosen tags are written back to the URL. A permalink therefore needs `seed` **and** `tags` — CONFIRMED.
- **No seed ⇒ a random seed** (`?tags=medium` alone gave 503141208, then 719877998), written back — CONFIRMED.
- **Enter** draws a new seed *and* new random tags every time (e.g. `seed=701227701&tags=small,organic`, then `556371499&tags=small`) — CONFIRMED. The random tag set always contains exactly one size tag and 0–3 others (all 30+ observed Enter/load picks; `Tags.random`, `Tags.randomSize`, `Tags.pick` ×2 run once per generation in coverage).
- **Engine randomness:** `Date.now` is never called. Exactly one `new Date()` per generation, from a call site named `reset` on the class that owns the PRNG: at start-up from an app constructor, on Enter from `HouseType.assignSet` (V8 stack frames, `seed/sessionA/steps/steps.jsonl` `dstacks`). `Math.random` is called by Lime's local-storage id at start-up and otherwise only by `Light.getSkele` (via `Room.defaultLight → Light.inTheCentre`), 0–20 times per generation, **without affecting the output** (identical draws above). PLAUSIBLE: a tiny jitter on the straight-skeleton input that `Light.snap` removes. `com.watabou.utils.Random.reset` runs 4× on a cold load and 3× per regeneration; `Random.float` 467–2,579 calls per generation (`2026-09-26T22-56-56/coverage`). Contrast with Fantasy Manor (`captures/manor/README.md`): FM never reseeds after start-up and has no seed parameter; Dwellings reseeds per generation from the URL seed.
- *Correction (continuation seat, 2026-09-26; requested by the coordinator after the exports lane saw lighting differ between loads):* `Math.random` **does** change the render, but only the lights. `_probes/probe-doors.mjs` part B (`_probes/probe-doors.log`, lines `B …`) loaded three permalinks three times in one browser and once in each of two fresh browsers and compared every layer with `layers.mjs`: all 16–19 layer groups (every painted path's geometry and style) were identical in all 15 loads, and `Math.random` was called the same number of times per house (11 / 7 / 27). Yet the screenshots of `seed=260926102&tags=small,tall` differed on each reload (three distinct images in three loads) and those of `seed=260926109&tags=large` on the second and third reload, while `seed=12345&tags=medium` never changed. The pixel difference lies wholly inside the house and is smooth (≤ 62/255, about 50,000 pixels, `doors/B1/steps/001–003`): gradient parameters, which the recorder does not store. With `Light.getSkele` the only caller of `Math.random` in a generation, **the light gradients are the only non-deterministic part of the drawing; every other layer is byte-identical between loads** — consistent with the exports lane's byte-identical JSON and SVG. The first load in a fresh browser reproduced in 3/3 browsers here (a property of the harness's fresh profiles, not of the build). CONFIRMED (layers identical; screenshots differ) / PLAUSIBLE (the jitter feeds the light centres).

## 2. The exact parameter set

### 2.1 URL parameters — CONFIRMED unless marked

| key | meaning | evidence |
|---|---|---|
| `seed` | integer seed of the whole house (observed 1 … 2,141,439,973) | `probe-seed.log` |
| `tags` | comma list; taken literally and echoed (unknown words such as `foo`, `spacious`, `huge`, `tiny` are kept in the URL and printed but change nothing: the house equals `tags=`) | `probe-urltags.log` + draw hashes (`urltags/steps/steps.jsonl`) |
| `floors` | storeys above ground, set by the Parameters drop-down (random, 1–8). The URL accepts more: `floors=12` gave GF…11F; `floors=0` is dropped from the URL. `floors` overrides the height tags (`small,tall&floors=2` → 2 storeys). The basement is separate (`floors=3` → B GF 1F 2F) | `probe-params.log` #5, `probe-urltags.log` |
| `plan`, `w`, `h` | a ground plan (§2.3). `w`, `h` ≤ 11 each; with 12 in either dimension the plan is dropped and the URL rewritten without it. With a plan the size tags change nothing (`tags=small|medium|large&plan=F1&w=4&h=2` drew identical houses) | `probe-plan.log`, `probe-plan2.log`, `probe-plan3.log` |
| `entrance` | the entrance edge of the plan (§2.3) | `probe-plan*.log` |

### 2.2 Tags — the full vocabulary with the build's own descriptions [SHOWN `tags-dialog.png`, `_probes/probe-tags.log`]

The Parameters dialog (T, or context menu *Parameters…*) lists 16 tags plus "Number of floors: random / 1–8"; Shift+click on a tag prints its effect. Descriptions paraphrased from the build's own one-line texts:

| tag | group | build's description (paraphrase) | conflict rule observed (draw hash of the pair equals the member shown) |
|---|---|---|---|
| small / medium / large | size | small / medium-sized / large ground floor | small+large ≡ small |
| square | shape | rectangular ground plan | |
| low / tall | height | low / high number of floors | low+tall ≡ low |
| slab | height | all floors have the same shape | |
| mechanical / organic | partition | inner walls bisect the outer shape / inner walls follow the outer shape | organic+mechanical ≡ mechanical |
| hallways | partition | more corridors and rooms with nooks | |
| spiral / stairwell | stairs | spiral staircase instead of regular ones / all staircases one above the other | spiral+stairwell ≡ spiral |
| basement | stairs/floors | a basement | |
| blank / transparent | windows | as few / as many windows as possible | blank+transparent ≡ blank |
| generic | rooms | no special rooms (the first room-type list loses its 4th, "special" entry: `[living room,bathroom,bedroom]`) | |

The first member of each listed pair wins in the order size → height → partition → windows → stairs as tested; PLAUSIBLE that `Tags.resolve` removes the later member. `spacious` (the pre-1.4.0 tag, research/findings/manor.md §2.10) no longer exists; `huge` and `tiny` do not exist (CONFIRMED by the dialog and by their no-op in the URL).

### 2.3 The plan permalink — the hand-off a settlement generator uses [SHOWN; decoded by hand, confirmed by crafted URLs]

`plan` is a **hex bitmask of the w×h cell grid, row-major from the top-left cell, four cells per hex digit, least-significant bit first**: cell *i* = row·w + col is bit (*i* mod 4) of digit ⌊*i*/4⌋. `ceil(w·h/4)` digits; case-insensitive (`f1` ≡ `F1`); missing trailing digits are empty cells (`plan=F&w=4&h=2` → a 4×1 bar).

Worked examples (all CONFIRMED by the editor view after loading, `plan/steps/*-editor.png`, or by the house drawn):

1. `plan=F1&w=4&h=2`: digit 0 = F = cells 0–3 (row 0, cols 0–3); digit 1 = 1 = cell 4 (row 1, col 0) → an L of five cells (`plan/steps/026-url-L-4x2-editor.png`). The same string with `w=2&h=4` is a 2×2 square with one cell below its left column (`028-…`).
2. Random rectangle from the editor, `plan=000000000008F0C70E30F1000000000&w=11&h=11`: digits 11 (8 → bit 3 → cell 47), 12 (F → 48–51), 14 (C → 58–59), 15 (7 → 60–62), 17 (E → 69–71), 18 (3 → 72–73), 20 (F → 80–83), 21 (1 → 84) → cells 47–51, 58–62, 69–73, 80–84 = cols 3–7 × rows 4–7, a 5×4 rectangle, exactly as the editor drew it (`blueprint/steps/015-bp-X.png`).
3. The ground plan of `seed=12345&tags=medium`, written when that house was submitted unchanged from the editor: `000000E10F0060070830C1000000000` → rows 2–3 cols 3–6, row 4 cols 5–6, rows 5–7 cols 5–7 — the two-block house of `tags-dialog.png`.

`entrance` is **four characters y₁x₁y₂x₂, one digit per coordinate (0–9, A = 10, B = 11)**, naming the boundary edge from node (x₁,y₁) to node (x₂,y₂) with the edge taken **clockwise** around the plan on screen (y down, interior on the right-hand side). Examples: `5868` = nodes (8,5)→(8,6), the right edge of cell (7,5); `6353` = (3,6)→(3,5), a left edge running upward; `5B6B` = (11,5)→(11,6); `6A69` = (10,6)→(9,6), a bottom edge running leftward; on the 4×2 L, `2120` = the bottom edge of cell (0,1) and `0414` = the right edge of cell (3,0) (`probe-plan.log`, `probe-plan4.log`, arrows in `plan3/steps/004-A_y10-2120-editor.png`).
- A code whose two nodes are not joined by a grid edge (reversed order, 3-digit `414`, `0014`) **crashes the generator** (TypeError thrown from `decodeEdge` ← `Specs.pickEntrance` ← `Specs.process`; nothing is drawn) — CONFIRMED `plan2/session/console.jsonl` (12 page errors).
- An existing *interior* edge (`1110`, `1011`, `1202` on the L) is accepted silently and ignored: no arrow in the editor, the generator picks its own entrance — CONFIRMED `probe-plan3.log`.

Editor behaviour: B opens an 11×11 grid of cells (99 px each, `blueprint-editor.png`) holding the current ground plan **re-centred** (a rectangle loaded at rows 4–7 reappears at rows 3–6), so every plan the editor writes has `w=11&h=11`; R = random shape, X = random rectangle, Backspace = clear, Shift+click on a boundary edge = entrance, Enter = submit, B/Esc = discard. Submitting keeps `seed` and `tags` (the house changes because the plan changed) and prints `Drafter.hx:59: 11, 11` in place of the `Blueprint.hx:26` line — CONFIRMED `probe-blueprint.log` #10–#16.

Shape rules seen: a hole is filled (a 3×3 ring built as one solid 3×3 room, `plan/steps/035-url-ring-3x3.png`) — agrees with the creator [STATED research/findings/manor.md §2.10]. For two disconnected parts (`plan=B&w=5&h=1` = cells 0,1 and 3) the editor drew the 2-cell part as the main one, but **the house was built on the single cell** and the 2-cell part was drawn only as dashed grid (`plan/steps/037-url-two-parts-5x1.png`) — [SHOWN] once, contradicting the creator's "only the largest"; open question §8.
*Correction (continuation seat, 2026-09-26):* seven two-part plans, each loaded with `tags=medium` and `tags=small` (`_probes/probe-keys.mjs` session T, `_probes/probe-keys.log` lines `T …`; ground-floor area measured from the vertex record, the entrance threshold's 0.34 cell excluded), settle the rule: **the house is built on the connected part that contains the last filled cell in row-major order**, whatever its size — `B`/w5 {0,1}+{3} → 1 cell; `D1`/w5 {0}+{2,3,4} → 3 cells; `71`/w5 {0,1,2}+{4} → 1 cell; `B3`/w4h2 {0,1,4,5}+{3} → the 2×2 (it holds cell 5, the last one; the part whose first cell comes last would have been {3}); `DC`/w4h2 {0}+{2,3,6,7} → the 2×2; `9`/w4 {0}+{3} → 1 cell; `F01`/w4h3 {0–3}+{8} → 1 cell. CONFIRMED (14 loads). The creator's "only the largest" [STATED research/findings/manor.md §2.10] does not hold for this build; an integrating generator should hand over one connected footprint.

### 2.4 Context menu, dialogs and other controls [SHOWN `context-menu.png`, `style-dialog.png`, `probe-ui.log`, `probe-blueprint.log`]

- **Context menu** (right-click or the "=" button): Procgen Arcana · New house · Parameters… · Elevation · Blueprint · Rooms › (Regular, Gothic, Tavern) · Walls › (Simple, Castle, Log house, Modern, Sci-fi) · Layers › (Grid ›, Doors ›, Labels ›, Roof ›, Arrows, Props, AO, Lights) · Style… · Fullscreen · Permalink… · Export › (as PNG, as SVG, as JSON, Advanced…). Export items were hovered, never clicked (owner rule).
- **Style dialog** (S): tabs Colors and Misc.; default colours Ink #000000, Paper #F2EDDE, Floor #8B796B, Walls #B2B2B2, Props #B29C85, Windows #8C8C8C, Stairs #A58F7D, Roof #B27559, Labels #E5D6B7; presets Load / Apply / Save.
- **Views**: P = floor plan, E = elevation (view selector L F R B), floor selector B · GF · 1F … · R (roof) at bottom right; the house name appears in a toast after Enter.
- Keys per the creator's list [STATED research/devlogs/dwellings/567246-keyboard-shortcuts/post.md]; which parts each key re-rolls is measured in §3.4.

## 3. The live pipeline, reconstructed

Sources: the CPU call trees of `2026-09-26T23-36-{09,25,48}` (reload, one per size tag, 50 µs sampling) and `2026-09-26T23-37-10` (eight Enter regenerations, 50 µs), analysed with `analyze.mjs --top 4000 --tree-min 0.1`; the exact call counts of every coverage pass (the 12 export-tied houses, the 80 tag-family houses, the four Enter/cold generations of `2026-09-26T22-56-56`); the per-step coverage of `_probes/keys/K` (every shortcut). Method names are the build's own Haxe names as attributed by the profiler; nothing was read from the bundle.

### 3.1 Top-level control flow [SHOWN]

Cold load (reload) — the house is generated inside the application constructor, before the scene exists (`2026-09-26T23-36-48/report.md`, profile gen-1 call tree):

```
ApplicationMain.start → DocumentClass.new → com.watabou.dwellings.Main.new
├ Blueprint.fromURL                      ← seed, tags, floors, plan, w, h, entrance from the query (§2)
├ House.reset → House.new                ← THE WHOLE MODEL (1.8–32 ms, §5)
│  ├ Specs.process                       ← pickShape (Drafter.getShape/getPolyomino or the URL plan), pickEntrance,
│  │                                        randNFloors, rollStairs [, rollSpiral, rollStairwell when those tags are set]
│  ├ House.build ×(storeys + 1 if basement)   ← one Plan per build (Plan.new): divideArea (recursive partition),
│  │                                             mergeCorridors, connectRooms → wallDoors; sortRooms/findStart per storey (§4.3)
│  ├ House.connectFloors ×(storey pairs, or 1/0 with a spiral) ← Plan.findStairs / findSpiral → Staircase.new ×2 per
│  │                                        connection, or the trapdoor fallback (console House.hx:373) (§4.6)
│  ├ House.assignRooms → HouseType.assignRooms → assignSet ×2 → types2rooms → <RoomType>.validate …
│  │                                        (prints the two HouseType.hx:22 lists; the dominant cost, §5)
│  ├ House.assignDoors · House.spawnWindows (Plan.spawnWindowsExcluding → Room.spawnWindows) · House.spawnChimneys
│  ├ Room.fill ×rooms                     ← furniture (rooms.<Type>.fill/populate → Clutter), Room.defaultLight → Light
│  ├ tinypubs.params.Dimensions.random    ← elevation parameters (windows, doors, dormers, chimneys, roof)
│  ├ Blueprint.updateURL                  ← rewrites the query (§1)
│  └ Namer.get                            ← house name (tracery grammar)
└ coogee.Game.new → switchScene → DwellingScene / PlanScene.new → FloorMap.new → PlanView.new (all drawing, GF shown)
```

Regeneration by **Enter** (`2026-09-26T23-37-10`, gens 1–8; identical shape in `2026-09-26T22-56-56` gens 1–3):

```
HTML5Application.handleKeyEvent → Stage.__onLimeKeyDown → coogee.Scene.onKeyDown → PlanScene.onKey → PlanScene.reset
├ DwellingScene.reset
│  ├ Blueprint.random → Blueprint.new → Tags.random, Tags.randomSize, Tags.pick ×2, Tags.resolve   ← new seed + tags
│  ├ House.reset → House.new  (as above)
│  └ coogee.ui.UI.showToast → Toast.new (house name) → Tweener (fade)
├ PlanScene.updateView → FloorMap.updatePlan → PlanView.new (WallsView.create/draw, drawRoom, drawGrid, …),
│                        FloorMap.updateLabels → LabelsLayer.createLabel
└ FloorSelector.update → ButtonStripe.addButton (the B · GF · 1F … R tabs)
```

The generation is synchronous inside the key event (zero busy polls after the key, §1). There is no retry loop around the whole house: `House.new`, `Specs.process`, `Blueprint.*`, `Namer.get`, `HouseType.assignRooms` run exactly once per house in every capture; the repeats are inside the stages (the per-plan builds, the recursive `divideArea`, the per-room `validate` calls of the role assignment). CONFIRMED (counts in §3.3).

The re-roll keys enter the same pipeline lower down (per-step coverage `_probes/keys/K/steps/00{2..6}-*.calls.json`, console `_probes/probe-keys.log`): **Shift+Enter** re-runs everything from the partition on (new `House.build`/`Plan.new` per storey, new stairs, rooms, windows, props) on the unchanged outer shape — the footprint, the grid and the entrance are identical (§3.4); **Ctrl+Enter** (Cmd+Enter behaves the same) re-runs only the role assignment and what hangs off it — room types, furniture, lights, windows — on unchanged walls and stairs. Neither prints the `Blueprint`/`House.hx:41` lines (only the two `HouseType.hx:22` lists) and neither changes the URL.

### 3.2 Per-load versus per-generation work [SHOWN]

Methods that ran in every cold load and in no Enter regeneration (`_measure/` table over all coverage passes; the Enter columns are `2026-09-26T22-56-56` gens 1–3):

| runs once per page load | runs per generation |
|---|---|
| `Main.new`, `coogee.Game.*`, `Scene.new/activate`, `DwellingScene.new`, `PlanScene.new/setFloor`, `FloorMap.new`, `LabelsLayer.new`, `RoofStack.new`, `FloorSelector.new`, `ModeSelector.*` | `Blueprint.random` (Enter) or `Blueprint.fromURL` (load), `Tags.*`, `House.new` and everything under it |
| **the room-type registry: `RoomType.new` ×28** = 22 `rooms.<Type>.proto` (Bathroom twice) + 5 `rooms.Generic` factories (`chamber`, `corridor`, `empty`, `stairhall`, `stairwell`) + 1; `RoomType.doorsFixed` ×11, `winFixed` ×6, `winRatio` ×5, `checkBasic` ×5 (per-type constraints set at registration) | `HouseType.assignSet` ×2, `types2rooms`, `<Type>.validate`, `Room.fill`, `Clutter.*`, `Light.*` |
| `RegularHouseType.new` ×1, `LoadedHouseType.new` ×2 (the two JSON5 programmes behind *Rooms › Gothic / Tavern*, PLAUSIBLE), `Dir.new` ×8 (the 8 grid directions) | `PlanView.*`, `WallsView.*`, `Shading.*`, `WindowView.*`, `StaircaseView.*`, `LabelsLayer.update` |
| `tracery.Grammar.loadFromRawObj/addAutoRules ×14/pushRules`, `RuleSet.new ×18`, `Symbol.new ×18` (the name grammar, `grammar.json`) | `Namer.get`, `Grammar.flatten/expand` |
| `utils.Palette.fromJSON/fromAsset/…` (colour scheme), `view.Style.setPalette/restorePalette`, `WallsView.setStyle/restoreStyle`, `system.State.init/get ×11` (settings kept in the browser), `URLState.get/getInt`, `Random.seed ×3` | `Random.reset` (3 per regeneration, 4 per cold load), `Random.float` 467–2,632 per house |

The registry figures are the executed-code view of the 28 room types the two printed lists draw from (§4.6). CONFIRMED.

### 3.3 The executed inventory, by package [SHOWN]

`_measure/classes-all.tsv` (every class of the build by the profiler's Haxe attribution, with its function count and how many functions ran in the four generations of `2026-09-26T22-56-56`) and `_probes/dw-methods.mjs` over all coverage passes:

| package | classes (ran) | functions (ran) | what runs during a plan-view generation |
|---|---|---|---|
| `dwellings.model` | 52 (41) | 271 (194) | `House` (20 methods incl. `build`, `connectFloors`, `getStairCells`, `getStairDir`, `assignRooms`, `assignDoors`, `spawnWindows`, `spawnChimneys`, `empty`), `Plan` (27: `new`, `divideArea`, `getNotch`, `isNarrow`, `mergeCorridors`, `connectRooms`, `wallDoors`, `sortRooms`, `findStart`, `findStairs`, `findSpiral`, `spawnWindowsExcluding`, `getFloor`, `getRoom`, `edge2room`, `isGroundFloor`, `isTopFloor`, `getDoors`, …), `Room` (15: `link`/`unlink`, `countDoors`, `hasExit`, `hasSpiral`, `getStairs`, `spawnWindows`, `fill`, `defaultLight`, …), `RoomType` (13: `aboveGround`, `underground`, `topFloor`, `singular`, …), `HouseType` (5), `Specs` (9), `Blueprint` (4), `Drafter` (3), `Tags` (4), `Staircase` (3), `Door` (3), `Clutter` (12), `Namer` (2), 22 `rooms.*` types, `props.{Light, PropSet, Altar, Statue, Curtain}` |
| `dwellings.utils` | 9 (8) | 45 (35) | `Grid` (12: `cell`, `edge2cell`, `cellNdir2edge`, `node`, `nodeNdir2edge`, `outline`, `outlineEx`, `contour2area`, `revertChain`, `isConnected`, `cloud2gridNArea`), `Polyomino` (`create`, `draw`, `rect`, `set`, `k`), `AreaUtils` (`findLargestRect`, `getRect`, `compactness`, `fill`), `ChainUtils` (8), `Cell`, `Edge`, `Node`, `Dir` |
| `dwellings.view` | 28 (17) | 125 (65) | `PlanView` (14), `WallsView` (12), `Shading` (6), `StaircaseView` (4), `WindowView` (3), `DoorView`, `EntranceView`, `ArrowView`, `ClutterView`, `GridView`, `LabelsLayer`, `RoofStack`, `FloorMap`, `Style`, `architecture.Simple` |
| `dwellings.scenes` · `ui` · `Main` | 4 (2) · 10 (4) · 1 (1) | 106 (11) · 45 (11) · 5 (5) | `DwellingScene`, `PlanScene`; `FloorSelector`, `ModeSelector`, `ButtonStripe`, `Button` |
| `geom` | 24 (16) | 93 (44) | `GeomUtils`, `Skeleton` (+`_Skeleton.Node/Segment`, used by `Light.getSkele`), `Chaikin`, `PoissonPattern`, `Graph`, `polygons.PolyCreate/PolyCore/PolyTransform/PolyCut`, `Color`, `Rect`, `Rib`, `Dot` |
| `tinypubs` | 42 (13) | 114 (17) | only the elevation *parameters* (`params.Dimensions/WindowData/DoorData/DormerData/ChimneyData/FachwerkData/GableWindow/HipRoofData/LampData/SignData/SpireData`) and three surface painters' statics; the elevation model and views run only in the E view |
| `tracery` · `utils` · `system` · `processes` · `coogee` | 9 (8) · 15 (9) · 3 (2) · 2 (2) · 55 (7) | 64 (35) · 101 (55) · 21 (9) · 10 (7) · 328 (32) | naming; `Random`, `ArrayExtender` (21), `GradUtils`, `GraphicsExtender`, `Palette`; `URLState`, `State`; `Tweener`; the UI toolkit |

Present in the build but never executed by a generation (names only; no code read): `dwellings.Export`, `model.JsonExporter` (11 functions), `ui.ExportForm`, `system.Exporter`, three `formats.*` classes (44 functions) — the export paths, never triggered (owner rule); `scenes.BlueprintScene` (23), `scenes.ElevationScene` (17), `view.BlueprintView`, `view.ElevationView`, `view.EarthView`, `view.RoofPainter` (10), `view.Hatching` (ran only under colour scheme 5, `_probes/keys/K` step 45 prints `Hatching.hx:42`/`:105`), `view.TopDownView`; `view.architecture.{Castle, LogHouse, Modern, SciFi}` (the wall styles of keys 7–0); `model.{Elevation, Layer, FacadeLayer, PorchLayer, TowerLayer}` and `tinypubs.{model.Facade, model.Section, view.*}` (the elevation); `rooms.Loadable` (the JSON5 room programmes); `props.{Bed, Prop}`; `geom.PoissonDisk*`; `utils.Stopwatch` (present, never run — hence no timings in the console). CONFIRMED.

### 3.4 What every shortcut re-computes (probe (d)) [SHOWN]

`_probes/probe-keys.mjs` → `_probes/probe-keys.log`, per-step summary `_probes/keys/K-summary.txt`, per-step records `_probes/keys/K/steps/` (coverage, draw, vertex record, screenshot). House: `?seed=260926109&tags=large` (B · GF · 1F · 2F · R, 20 rooms). Every layer of the drawing is compared by `_probes/layers.mjs`: paint records grouped by canvas role and style, geometry hashed after removing the layer canvas's translation; "same" means identical geometry.

| key | model work (coverage / console) | drawing | URL |
|---|---|---|---|
| **Enter** | new seed and new random tags (`Blueprint.random`), full `House.new` | everything | new `seed` + `tags` |
| **Shift+Enter** ("reroll floors") | `House.build`/`Plan.new` per storey again, stairs, `assignRooms` (prints only the two `HouseType.hx:22` lists) | footprint area (32.34 cells), footprint bbox, grid and entrance **identical**; inner walls, rooms (6 → 8 → 6 floor fills), stairs, lights, windows (18 → 18 → 19, new positions), furniture **changed** | unchanged — the re-rolled house cannot be reached from the permalink |
| **Ctrl+Enter** (**Cmd+Enter** identical) ("reroll rooms") | `assignRooms` and below only | walls, floors, stairs, lights **identical**; windows (19 → 18 → 18 → 20) and furniture **changed**; labels changed | unchanged |
| ↑ / → and ↓ / ← | none (no console, `Math.random` 0) | shows the next storey up / down: GF → 1F → 2F → R (roof view) and GF → B; a further press at either end repaints nothing | unchanged |
| Space | none | the house-name toast (`Odd Lakeside Residence`) | unchanged |
| G | none | cycles the grid rendering (three distinct screenshots `0e076776` → `91b7da1d` → `321e9522`; the third equals the Shift+G-hidden state) | unchanged |
| Shift+G · Ctrl+G | none | grid visibility on/off · grid redrawn with another geometry and back | unchanged |
| D | none | cycles three door renderings: plain gaps (default) → leaf strokes (2 black w 0.14 + 3 Stairs-colour w 0.1 on this GF) → thin outline strokes (5 black w 0.02) → default | unchanged |
| L · O | none | lights layer repainted without the light gradients (62 → 57 fills) · without the ambient-occlusion gradients (62 → 5); second press restores the reference screenshot | unchanged |
| A · P · R | none | stair arrows off/on · furniture off/on · room labels off/on (each second press restores the reference screenshot byte for byte) | unchanged |
| 1–5 | none (scheme 5 runs `view.Hatching`, console `Hatching.hx:42: 46, 1452` and `:105: 51`) | colour scheme: every layer repainted in another palette (2 dark brown ink on beige, 3 near-black ink on white, 4 white lines on dark blue, 5 black on white with hatching); 1 restores the reference screenshot | unchanged |
| 6–0 | none | wall style: 7, 8, 9, 0 redraw the walls with other geometry (85 → 85 / 58 / 43 / 43 wall pieces; 8 also thickens the window strokes to w 0.26); 6 restores the reference | unchanged |
| E, then ← → R F D, E | none on the plan model; the elevation view itself (`L F R B` selector) | E: elevation (line width 1.152 in its own scale); ←/→ rotate the side shown; R re-rolls the elevation style; F toggles fading; D toggles a dark palette; E returns to the byte-identical plan | unchanged |

Three determinism results that matter for a re-implementer (CONFIRMED):

1. **The permalink reproduces the Enter house.** After Enter (`?seed=1441147680&tags=small,low,organic`), reloading that URL gives every plan layer identical (`_probes/probe-keys.log` #62–#63); only the toast differs.
2. **Enter is a deterministic chain from the loaded state.** Three fresh browsers that loaded `?seed=12345&tags=medium` and pressed Enter twice got the same houses — `1189382180 large,mechanical`, then `1291276000 small,organic` — even when one waited 7 s first; their Shift+Enter and Ctrl+Enter results were identical too (`probe-keys.log` E1–E3). The same `1189382180` is what the Parameters dialog's *Generate* produced after the same load (`probe-params.log` #5). So the one `new Date()` per generation (§1) does not feed the seed. This answers the previous seat's open question.
3. **But the next seed depends on the whole interaction history, not on the current seed alone** (`_probes/probe-keys2.log`): after the same load, a Shift+Enter, a Ctrl+Enter, a handful of view keys (↑ G L P 2 7 Space) or an elevation style re-roll each change the next Enter seed (1579161536, 403462773, 1460351351, 371426367 instead of 1189382180); loading the chain's second house `1189382180 large,mechanical` directly gives a different successor (470941825) than reaching it by Enter (1291276000); the same seed with other tags gives other successors. [INFERRED] one seeded PRNG is shared by the generator, the re-roll keys and some view decoration, the next seed is drawn from its live state, and generation re-seeds it from the drawn seed; start-up consumes a different amount than a regeneration (4 versus 3 `Random.reset` calls, §1).

## 4. Stage-by-stage algorithm reconstruction

Evidence base: 96 generated houses with exact call counts (`_measure/houses.json`, `_measure/houses.tsv`, written by `_measure/houses.mjs` from every coverage pass), of which 92 have their storey list from the matching draw pass; the identity checks `_measure/identities.txt` (`_measure/identities.mjs`); 92 houses walked storey by storey (`_probes/floors/`, statistics `_measure/floors-stats.txt`, §7); the shortcut probe (§3.4). The tag-family set is **paired**: all 16 families use the same five seeds 260926501–505, so a family's effect is read seed by seed against `tagsv-medium` (`_measure/houses.tsv`, rows `tagsv-*`). Counts quoted "a/b" are houses satisfying / houses tested.

### 4.1 Tags and specs — `Blueprint`, `Tags`, `Specs` (< 0.3 ms) [SHOWN]

* One `Blueprint` per house: `fromURL` on a load, `random` on Enter (`Tags.random` → `Tags.randomSize` + `Tags.pick` ×2 → `Tags.resolve`); on a load with `tags=` given, only `Tags.resolve` runs. Resolution keeps the first of each conflicting pair (§2.2).
* `Specs.process` runs once and fixes, in this order of calls, `pickShape` (the URL plan via `Drafter.fromCode`, else `Drafter.getShape` → `getPolyomino`), `pickEntrance` (`decodeEdge` for a URL `entrance`), `randNFloors`, `rollStairs` and, only when drawn, `rollSpiral` / `rollStairwell`.
* **The ground shape is drawn before any other tag has an effect.** For every seed the shape-drafting counts (`Polyomino.create`, `Polyomino.rect`) are identical across all fourteen `medium,*` families (seed 501: 11 and 50; 502: 3 and 13; 503: 5 and 23; 504: 2 and 9; 505: 4 and 19). Tags that act only downstream leave the whole plan identical: `blank`, `transparent`, `generic` and `slab` reproduce `medium`'s storeys, room count, door count and partition counts for every seed where the ground storey is concerned (`_measure/houses.tsv`). CONFIRMED.

**Unknown:** the probabilities inside `randNFloors`, `rollStairs`, `rollSpiral`, `rollStairwell` (only their outcomes are measured, §4.3, §4.6).

### 4.2 Ground-plan shape — `Drafter`, `Polyomino` [SHOWN] + [INFERRED]

**Problem:** a connected set of grid cells (a polyomino) whose area fits the size tag.

* **Size bands (areas in cells, ground storey, 92 houses):** small 11–16 (mean 13.4, 8 houses), medium 16–24 (mean 21.8, 75), large 27–33 (mean 30.9, 9). The bands do not overlap except at 16. [SHOWN `_measure/floors-stats.txt`]
* **Rectangle unions with rejection.** Each `Polyomino.create` is followed by 4.3–5.0 `Polyomino.rect` calls (= `Polyomino.set`) — the shape is drawn as a union of about 4–5 grid rectangles — and `create` runs 1–11 times per house (small 1–11, medium 2–11, large 1–9). [SHOWN] [INFERRED] candidates are drawn until one meets the size band and shape tests (a rejection loop); the candidate stream is the same for all tags of one seed (§4.1), and the size tag decides which candidate is accepted (seed 501 accepted the 11th candidate as small and as medium, the 9th as large).
* **`square`** skips the polyomino entirely (`Polyomino.create` = 0 in 5/5): a single rectangle. [SHOWN]
* URL plans: parsed by `Drafter.fromCode` (§2.3); holes are filled; one connected part is kept — the one holding the last filled cell in row-major order (§2.3 correction). Plans larger than 11 cells in either direction are dropped. [SHOWN]
* `AreaUtils.findLargestRect` / `getRect` (1–6 / 4–26 per house) and `compactness` (0–18) run in the planning stage. [INFERRED] used to judge candidate compactness and to seed room rectangles.

**Unknown:** the rectangle-size distribution and the exact acceptance tests (compactness threshold, bounding-box limits). Test: histogram the accepted shapes' bounding boxes and rectangle decompositions from many `Polyomino.rect` counts per accepted size.

### 4.3 Storeys, basement and upper-storey shapes [SHOWN] + [INFERRED]

* **Storeys above ground** (`randNFloors`): `low` 1–2 (4 of 5 houses 1), untagged 1–3 (medium) / 1–4 (large), `tall` 3–6 (medium,tall: 4 in 5/5; small,tall 3; large,tall 6); `floors=N` overrides (up to 12 tested, §2.1).
* **Basement:** 67 % of medium houses, 75 % of small, 89 % of large in the walked set (the `basement` tag forces one: 5/5). The basement lies inside the ground footprint and is capped: basement/ground area = 1.00 for small houses, 0.45–1.00 (mean 0.68) for medium, 0.33–0.61 (mean 0.46) for large — i.e. basements of about 11–16 cells whatever the house size. [SHOWN `_measure/floors-stats.txt`] [INFERRED] a cap of roughly 15 cells.
* **Upper storeys shrink:** upper/ground area 0.40–0.92 (small), 0.17–1.00 (medium, mean 0.73), 0.33–1.00 (large, mean 0.72); `slab` ("all floors have the same shape") changes only the upper storeys' partition counts (seed 503: 21 vs 28 `divideArea`; 504: 78 vs 101), never the ground storey. The elevation shows the result: blocks rise to different heights (`052-elev-e.png`). [SHOWN]
* **One plan per storey, plus one when there is a basement:** `Plan.new` = `House.build` = `mergeCorridors` = `connectRooms` = `wallDoors` in 96/96 houses, and `Plan.new` = storeys + 1 if a basement exists in 92/92 (the other four have no storey list); `sortRooms` = storeys (basement included) in 92/92. The shortcut probe shows the extra plan belongs to house creation, not to the storeys: Shift+Enter re-partitions the same four storeys with exactly 4 `Plan.new` (`_probes/keys/K/steps/002-shift-enter-1.calls.json`) where the load needed 5. [INFERRED] the basement outline is derived from a throw-away plan of the ground storey (which fits the basement always lying inside the ground footprint), and the real storeys are then planned once each. This answers the previous seat's open question (Plan.new exceeding the drawn floors by one).

**Unknown:** how the upper-storey outline is chosen (setback rule, which cells are dropped) and how the basement's cells are picked.

### 4.4 The partition — `Plan.divideArea`, `getNotch` [SHOWN] + [INFERRED]

**Problem:** split each storey's cell set into rooms.

* `Plan.divideArea` is **recursive** (up to about 25 nested frames in a large storey, `2026-09-26T23-36-48/report.md` gen-1 call tree) and runs 3–231 times per house, ≈ 2–10 per room.
* **`getNotch` ≈ `divideArea` − rooms** (medium 501: 19 − 8 = 11 = `getNotch`; large 501: 47 − 15 = 32; 505: 22 − 10 = 12; within ±3 in every paired house): every call that does not end as a room looks for a *notch* — a re-entrant corner of the area's outline — [INFERRED] from which the cut is made; calls that end as a room do not.
* **Partition tags:** `organic` ("inner walls follow the outer shape") and `mechanical` ("inner walls bisect the outer shape") change the partition counts but not the room count much (medium 501–505: rooms 8/8/9/16/10 untagged, 9/9/8/14/8 organic, 8/8/8/16/9 mechanical). [INFERRED] organic cuts run from notches along the outline's own edges; mechanical cuts run straight across the area's bounding extent.
* **`hallways`** ("more corridors and rooms with nooks") raises the room count strongly on the same seeds (14/21/10/28/14 against 8/8/9/16/10) without raising the door count (8/8/8/14/7 against 7/5/9/14/10): the extra rooms are corridor pieces and nooks joined by openings rather than doors. [SHOWN]
* Room shapes (§7): 51–66 % rectangles, mean area ≈ 5 cells (1–11), 14–34 % of rooms (3–17 % of the area) contain no 2×2 block — corridors and nooks. `Plan.isNarrow` runs 123–3,789 times per house. [SHOWN]
* `Plan.addRoom` = `Room.new` = `PropSet.new` (96/96): every room gets a furniture set.

**Unknown:** the cut-selection rule (which notch, which direction, the stopping size) and the acceptance tests between recursion levels. Test: fit a notch-cut model to the vertex records of `_probes/floors/` (room polygons are exact cell chains) and compare room-size histograms.

### 4.5 Corridors and doors — `mergeCorridors`, `connectRooms`, `wallDoors` [SHOWN] + [INFERRED]

* Per plan: `mergeCorridors` → `connectRooms` → `wallDoors` (one each per plan, 96/96). `Door.new` = `Room.link` (96/96); `Door.getPrice` = 2 × `Door.new` (96/96) — every candidate door is priced twice (once from each side); `Room.unlink` removes 0–15 links per house. [INFERRED] a cost-driven connection of the rooms into one reachable set.
* Door objects per house: small 1–4, medium 3–19, large 8–25. They are not the whole connectivity: `hallways` adds rooms without doors, and the exports' JSON distinguishes regular doors from open passages (research/findings/dwellings-exports.md). In the default render doors are wall gaps; the door-mode glyphs (key D) are not one stroke per door (`_probes/probe-doors.log`: e.g. 11 thin strokes on a 7-room storey, 2 on a 5-room storey), so **the draw record cannot count a storey's connections**; the tree property rests on the exports lane's JSON.
* **Entrances:** every walked ground storey shows exactly one entrance threshold — 92/92 in `_probes/floors/` and every ground storey of the 35 houses of `_probes/doors/` (five seeds each of medium, medium+hallways, medium+stairwell, medium+mechanical, large, large+hallways, large+tall+stairwell); basements show none (64/64); upper-storey views repeat the ground entrance in the roof underlay (84 views one small fill, 2 views two). No second entrance was ever drawn. [SHOWN]

### 4.6 Stairs, spiral stairs, trapdoors — `connectFloors`, `findStairs`, `findSpiral` [SHOWN]

* `House.connectFloors` joins each adjacent storey pair once: `Staircase.new` = 2 × `connectFloors` (96/96; one staircase object for each end) and `connectFloors` = storeys − 1 whenever no spiral was rolled (92/92). The stair end occupies one cell (the stair glyph clusters are 1×1 cells, §7).
* **Spiral:** `Specs.rollSpiral` ran ⇔ `Plan.findSpiral` > 0 (96/96); then `findSpiral` = number of storeys above ground and `connectFloors` = 1 if there is a basement, else 0 (every house with known storeys): one spiral stair serves all above-ground storeys, and the basement keeps a straight stair. The `spiral` tag forces it (5/5); untagged `tall` houses rolled it in 3/5.
* **Stairwell** (tag, or `rollStairwell` drawn): `House.getStairCells` = 0 in 4/5 `medium,stairwell` houses and in the three untagged houses that rolled it (it is 2–4 otherwise): stairs are stacked instead of searched for. [INFERRED from the count pattern]
* **Trapdoor fallback:** when no cell is free for a staircase the build prints `House.hx:373` ("No available cells for a staircase, spawning a trapdorr instead"); the connection still counts as a staircase (medium,square 505: 3 connections, 6 `Staircase.new`). Seen in 1 of the 96 coverage houses, once in the 30-generation Enter profile (`2026-09-26T23-54-54/profile/console.jsonl`) and twice in the previous seat's probes. [SHOWN]
* So the storeys form a chain: one staircase per adjacent pair, or one spiral for all above-ground storeys plus one stair to the basement — never two stairs between the same two storeys (96/96, including the seven `hallways` houses and the five `stairwell` houses with coverage). [SHOWN] This is the inter-storey half of the exports lane's tree finding; within a storey see §4.5.

### 4.7 Role assignment — `HouseType.assignRooms` (0.4–24 ms: the dominant stage) [SHOWN] + [INFERRED]

* The build prints the two programmes it assigns (`HouseType.hx:22`), and their construction rule holds in **92/92** houses:
  * list 1 = `living room, bathroom, bedroom` + **one special** (absent with `generic`);
  * list 2 = `kitchen, storage, hall, gallery` + **0–2 specials** (0: 5 houses, 1: 55, 2: 32) + **one `bedroom` per upper storey** + `bathroom` and `attic` if there is at least one upper storey + `cellar` if there is a basement.
  * Specials seen in list 1: laboratory, workshop, greenhouse, studio, lookout, trophy room, library, chapel, study, armoury, secret passage, observatory, vault; in list 2 mostly library (36), workshop (30), study (25), then vault, observatory, chapel, greenhouse, lookout, trophy room, laboratory, armoury, secret passage.
* `HouseType.assignSet` = 2 per house (96/96, one per list) → `types2rooms` (15–358 calls) → `rooms.<Type>.validate` per candidate room (Bedroom up to 18,471 calls, Attic 4,304, Gallery 4,335) using `RoomType.aboveGround` / `underground` / `topFloor` / `singular` and room measures (`Room.countDoors`, `hasExit`, `hasSpiral`, `getStairs`, `get_size`). [INFERRED] list 1 is placed first (the rooms every house must have), list 2 fills the remaining rooms in priority order, a type is placed only in a room its `validate` accepts (attic only on the top storey, cellar only underground, bathrooms small), and rooms left over are made generic (`HouseType.assignGeneric` 0–14 per house → "Room", "Corridor", "Stairhall", unlabeled passages).
* It is the most expensive stage (median 2.3 ms of a 4.1 ms Enter generation; up to 24 ms, §5): validation is exhaustive over rooms for every type.
* Ctrl+Enter re-runs only this stage and its dependants (§3.4): the partition is independent of the programme.

**Unknown:** the scoring inside `validate` and the tie-breaking; whether list-2 types that find no valid room are silently dropped (the labels suggest so: several listed types never appear).

### 4.8 Windows — `House.spawnWindows` [SHOWN]

* `House.spawnWindows` ×1 → `Plan.spawnWindowsExcluding` (1–6 per house) → `Room.spawnWindows` (2–10). Windows depend on the room types: Ctrl+Enter changes their number (19 → 18 → 18 → 20 on the reference house) and positions; `generic` changes them on otherwise identical plans.
* Density: 0.59–0.68 windows per exterior cell edge on average (0.13–1.0 per storey), each ≈ 0.32 cell long (§7). `blank` cuts the ground-storey windows to about 45 % (9/5/8/3/7 against 17/20/16/14/19), `transparent` raises them (17/23/18/19/21). The registry sets fixed window counts on 6 room types and a window ratio on 5 (§3.2).

### 4.9 The entrance when the generator chooses [SHOWN] + [INFERRED]

* `Specs.pickEntrance` runs once per house. The entrance is an exterior edge of a ground-storey cell (the arrow, stoop and threshold sit outside it); exactly one per house (§4.5). The exports lane reports the rooms it opens from (Hall, Living room, Kitchen, generic Room) — role assignment therefore knows the entrance cell ([INFERRED] `Room.hasExit` is among the validate inputs, 29–3,252 calls).
* A URL `entrance` is honoured when it names a boundary edge, silently ignored when it names an interior edge, and crashes the build when the two nodes are not joined by a grid edge (§2.3).

**Unknown:** the rule by which the generator picks the entrance edge (which side, which cell).

### 4.10 Furniture — `Room.fill`, `rooms.<Type>.fill/populate`, `Clutter` [SHOWN]

`Room.fill` runs for most rooms (16 of 20 on the reference house); typed rooms add their own set (`Kitchen.fill`, `Bathroom.fill`, `Bedroom.fill`, `Library.fill`, `Workshop.fill`, `Observatory.fill`, `Cellar.fill`, `Generic.fill`; `Chapel/Studio/Trophy/Gallery/Passage.populate`) and generic clutter is scattered by `Clutter.spawn → group → push` (`Clutter.inCell` = `Clutter.push`). Chapels place an altar and can fail (`rooms/Chapel.hx:43` "No place for an altar?", previous seat). `props.Statue`, `Curtain`, `Altar` are the named props seen.

### 4.11 Lighting and ambient occlusion [SHOWN] + [INFERRED]

`Room.defaultLight` → `Light.inTheCentre` → `Light.getSkele` (straight skeleton of the room outline, `geom.Skeleton`) → `Light.getSummit` → `Light.snap`: the light sits at the skeleton's highest node — the point farthest from the walls. Some lights go on a wall (`Light.onTheWall`, 0–7) or on an edge/cell (`Light.edge`, `Light.cell`). `Light.getSkele` is also the only caller of `Math.random` in a generation, and that unseeded jitter is why the light gradients — and only they — can differ between two loads of one permalink (§1 correction). Rendering: a warm radial gradient per lit room and wall-hugging dark gradients (§6.3); keys L and O remove each family.

### 4.12 Roofs and the elevation [SHOWN] + [INFERRED]

* The plan view paints the roof of the storeys below under each upper storey (§6.4) through `view.RoofStack` / `_RoofStack.Layer` (per-generation classes); the roof planes come in four shades (one per plane orientation) with tile courses — [INFERRED] hipped roofs over each block's outline.
* Every generation also draws the elevation parameters (`tinypubs.params.Dimensions.random`, `WindowData`, `DoorData`, `DormerData`, `ChimneyData`, `FachwerkData`, `GableWindow`, `HipRoofData`, `LampData`, `SignData`, `SpireData`) and `House.spawnChimneys` (1 per house); the elevation model (`model.Elevation`, `FacadeLayer`, `PorchLayer`, `TowerLayer`) and its painters only run in the E view.

### 4.13 Names and exports [SHOWN]

* `Namer.get` expands the tracery grammar once per house ("Lodge By The Sea", "Hut In The Woods", "Odd Lakeside Residence"); shown as a toast after Enter and by Space.
* Export code present but not run (§3.3): `dwellings.Export`, `model.JsonExporter`, `ui.ExportForm`, `system.Exporter`, `formats.*`. The exports themselves are the dwellings/exports lane's subject (research/findings/dwellings-exports.md).

## 5. Cost model

Sources: CPU profiles at 50 µs sampling — `2026-09-26T23-36-09` / `23-36-25` / `23-36-48` (reload mode, seeds 260926501–503 with `tags=small` / `medium` / `large`), `2026-09-26T23-37-10` (cold load + 8 Enter regenerations) and `2026-09-26T23-54-54` (cold load + 30 Enter regenerations); all analysed with `analyze.mjs --top 4000 --tree-min 0.1` so every function's inclusive time is in `report.json`. Per-stage table: `_measure/cost.tsv` (`_measure/cost.mjs`), medians by mode and size: `_measure/cost-summary.tsv` (`_measure/cost-summary.mjs`). Host: Apple M1, headless Chrome.

**Contention window.** The first four profile captures ran 23:36–23:38 UTC on a quiet machine (no other profiler browser; the exports lane's browser ran 23:12–23:27 and 23:42–23:44 UTC, outside this window, `logs/timeline.log`). `2026-09-26T23-54-54` ran 23:55–00:05 UTC in parallel with this lane's floor-walker browser; its per-generation figures fall inside the quiet captures' ranges, so it is kept. **Its generations 20–30 produced no house** (the recorded Enter was not acted on: no console line, URL unchanged, 46 s idle timeouts); a replay of the same chain in a fresh browser generated house 20 normally (`_probes/probe-stuck.log`, 20/20 identical seeds) — a recording artifact, those 11 rows are excluded. The export-tied captures (23:11–23:13 UTC) overlap the exports lane's browser but carry no timings.

### 5.1 Per generation, per stage (ms, median [min–max]) [SHOWN]

| stage (inclusive time) | Enter, small (n 7) | Enter, medium (n 13) | Enter, large (n 7) | reload (n 6) | cold load (n 5) |
|---|---|---|---|---|---|
| key handler (whole Enter) | 3.4 [2.6–7.9] | 6.5 [2.9–29.6] | 11.1 [5.5–13.7] | — | — |
| **`House.new` (the whole model)** | **1.9** [1.2–5.3] | **4.1** [1.5–26.3] | **8.0** [2.8–11.7] | 5.3 [3.6–18.4] | 11.1 [9.6–32.0] |
| `Specs.process` (shape, entrance, storeys, stair rolls) | 0.1 | 0.2 | 0.2 | 0.3 | 1.1 |
| `House.build` (all plans: partition, corridors, doors) | 0.3 [0.1–0.9] | 1.0 [0.1–2.2] | 0.8 [0.6–1.9] | 1.1 | 2.3 |
| of which `Plan.divideArea` | 0.2 | 0.7 | 0.6 | 0.9 | 0.9 |
| `House.connectFloors` (stairs) | ≤ 0.1 | ≤ 0.5 | ≤ 0.1 | 0.1 | 0.3 |
| **`House.assignRooms` (role assignment)** | **0.9** [0.4–3.7] | **2.3** [0.6–24.0] | **6.0** [1.4–8.5] | 1.9 [1.1–11.4] | 4.7 [2.9–21.6] |
| `Room.fill` (furniture, lights) | 0.6 | 0.9 | 0.8 | 1.2 | 2.9 |
| `Namer.get` · elevation parameters · `spawnWindows` | ≤ 0.1 each | ≤ 0.2 each | ≤ 0.1 each | ≤ 0.2 each | 1.1 · 0.5 · 0.3 |
| `PlanScene.updateView` (plan view build) | 0.8 | 1.4 | 1.9 | 3.8 | 7.7 |
| `Stage.__onLimeRender` (one frame: rasterise + upload) | 4.9 | 7.2 | 6.9 | 40.8 | 60.3 |

* **Role assignment is the dominant model stage** — about half of `House.new` for small and medium houses and three quarters for large ones; the partition itself costs under 2.2 ms. The single 24 ms outlier (medium, tall, slab: many storeys and a long list 2) shows the cost grows with rooms × types. [SHOWN]
* A whole Enter regeneration — model, view build, one frame — takes 5–40 ms; the rest of the 1.26–1.32 s capture window is idle (busy 64–117 ms, mostly the frame loop). [SHOWN]
* Cold loads pay JIT warm-up (House.new 2–4× slower than the same sizes on Enter) and the start-up work of §3.2 (`Main.new` 24–49 ms). [SHOWN]

### 5.2 Where the wall-clock goes [SHOWN]

Cold load: 1.7–6.3 s of wall time, of which 270–360 ms busy; the page fetches `Dwellings.js` (1.37 MB), nine small data files and two fonts; on a second navigation in the same browser Lime waits about 3 s for its already-cached fonts before starting (§1), which is why reload-mode generations show 4.3 s of wall for 170–215 ms of work. Enter: 1.26–1.32 s windows, 64–117 ms busy.

### 5.3 Draw-call scaling [SHOWN `_measure/draw-scaling.txt`]

Over the 92 plan renders of the draw passes (rooms on the shown storey 1–7): paint-log entries ≈ 281 + 47.5 × rooms (r² 0.63); wall pieces ≈ 37 + 6.6 × rooms (r² 0.63); gradient fills ≈ 11 + 10.3 × rooms (r² 0.84); 36–56 `texImage2D` and 24–153 `drawElements` per render. Everything is linear in the rooms of the shown storey — the plan view never draws more than one storey plus the roof underlay.

## 6. The drawing record — described, not copied

Sources: `draw/gen-*.draw.json` and `gen-*.paths.json` of the export-tied set (12 houses) and the tag-family set (80 houses), the per-step records and screenshots of `_probes/keys/K` (every shortcut), `_probes/paths-summary.mjs` / `_probes/layers.mjs` for the per-canvas split. Screenshots opened and read: `_probes/keys/K/steps/007-reload.png` (GF), `008-floor-ArrowUp.png` (1F), `052-elev-e.png` (elevation).

### 6.1 Stage and layers [SHOWN]

One 1500×1100 WebGL canvas. Each display layer is rasterised with Canvas2D onto its own off-screen canvas sized to the house plus a margin, then uploaded as a texture (34–50 `texImage2D`, 26–61 `drawElements` per render). All model geometry is painted through a transform of ≈ 99.1–99.5 px per grid cell, so line widths are in cell units. Paint order of one plan view (GF; identical in every capture, e.g. `2026-09-26T23-12-29/draw/gen-0.paths.json`, canvases 2–9):

| # | layer (canvas) | what is painted | style (default scheme) |
|---|---|---|---|
| 1 | room floors | one closed fill per room of the shown storey + a same-colour hairline stroke of the same outline (w 0.02; closes the seams between adjacent fills) + a few black w 0.02 strokes (the stair-arrow tails that start on the floor); the entrance threshold (a 0.34-cell fill) | Floor colour |
| 2 | grid | ONE stroke made of hundreds of two-vertex dash segments along the cell lines inside the rooms (519 segments on a 32-cell storey) | black at 40 % alpha, w 0.02 |
| 3 | furniture | per item a fill in the Props colour with a 40 %-alpha black outline (w 0.04 outer, w 0.02 detail) | Props colour |
| 4 | stairs | per straight staircase 11 Stairs-colour fills with black w 0.02 outlines; the direction arrow (toggle A) in black; a spiral staircase is one 11-vertex Stairs-colour polygon about 1.4 cells across | Stairs colour, black |
| 5–6 | shading | radial gradients (the room lights, toggle L) and linear gradients along the walls (ambient occlusion, toggle O), e.g. 82 radial + 52 linear gradients created for a large GF; 27–88 gradient fills per render | warm light / dark falloff |
| 7 | walls | per wall piece one black fill and one fill in the Walls colour of the same outline, then black w 0.04 outline strokes (miter joins, square caps); 37–96 pieces per storey | Ink + Walls colour |
| 8 | windows | per window one black w 0.2 stroke along the wall axis, then the Windows-colour w 0.16 stroke(s) on top (butt caps) — a grey bar with a black edge set into the outer wall, ≈ 0.32 cell long | Ink + Windows colour |
| 9 | labels | `fillText` in 28 px Share Tech Regular, Labels colour; drawn with a dark outline on screen | Labels colour |
| 10 | UI | `=`, `P`, `E` buttons and the floor tabs in 32 px Share Tech Mono (active tab in the Paper colour on dark grey, inactive dark grey) | — |

The stacking on screen (floors under grid under furniture, shading over the floor, walls and windows over everything, labels on top) matches the paint order in every screenshot read. [SHOWN]

### 6.2 Palette, widths, fonts [SHOWN]

* **Nine named colours** (Style dialog, §2.4): Ink, Paper, Floor, Walls, Props, Windows, Stairs, Roof, Labels. Only three extra values appear in a plan render: black at 40 % alpha (grid, furniture outlines) and the two UI greys. The roof is painted in four darker/lighter shades derived from the Roof colour (one per roof-plane orientation) plus a darker and a lighter shade for the tile courses. [SHOWN `_probes/keys/K/steps/008-floor-ArrowUp.paths.json`, canvas 10]
* **Line widths (cell units):** 0.04 wall outlines; 0.02 grid, floor hairlines, stair outlines, furniture detail; 0.2 + 0.16 windows; 0.14 and 0.1 door leaves (door mode 2); 0.1 dark + 0.06 light roof tile courses; the elevation uses its own pixel scale (w 1.152). Joins/caps: walls miter/square, windows butt, furniture/stairs/grid round (the join/cap tallies of all 12 export-tied renders split exactly this way: square caps = miter joins = wall strokes; butt caps = the two window strokes).
* **Fonts:** Share Tech Regular (labels), Share Tech Mono (UI) — both loaded as web fonts by the page. Labels scale with the room (the label of a large room is drawn visibly larger, `007-reload.png`), are rotated 90° in tall narrow rooms (`008-floor-ArrowUp.png`: "Bedroom", "Corridor" vertical), wrap onto two lines ("Living / room"), and small rooms get an abbreviation ("BTH") or no label (a one-cell house has none; some small unnamed rooms stay blank). [SHOWN]

### 6.3 Glyphs [SHOWN]

* **Doors** (default mode): a gap in the inner wall; the wall ends either side are capped. Door modes (key D) add a leaf (two black w 0.14 and three Stairs-colour w 0.1 strokes on the reference GF) or a thin black outline (five w 0.02 strokes) — the counts suggest 5 doors on that storey. Doors are not otherwise painted, so doors cannot be counted from the default render (§7 uses the model counts).
* **Windows:** grey bars set into the outer walls, roughly one per exterior cell edge where present (§7).
* **Stairs:** a straight run drawn as 11 tread fills with an arrow along the run: the arrow starts with a dot and ends in an arrowhead; staircases going down (to the basement) and up are both drawn on a storey (`007-reload.png`: one up in the stair hall, one down in the room below). A U-shaped run with a curved arrow is used where the stair turns. Spiral stairs are a single round glyph.
* **Entrance:** outside the entrance door a small three-tread stoop in the Stairs colour, the threshold fill in the Floor colour, and a black arrow pointing into the house; it stays drawn on the upper-storey views (`008-floor-ArrowUp.png`).
* **Furniture:** simple rounded shapes in the Props colour — round tables, beds, baths, counters, altars, statues, curtains (props classes `Light`, `PropSet`, `Altar`, `Statue`, `Curtain` ran; `Bed` and `Prop` exist but did not run as separate classes).
* **Lights and AO:** a warm radial glow per light (centre of the room by default, `Light.inTheCentre`; some on the wall, `Light.onTheWall`) and darkening along the walls; the two gradient canvases carry both, and keys L / O remove one family each (§3.4).

### 6.4 Upper storeys, roof, elevation [SHOWN]

* On an upper-storey view the **roof of the storey below is painted first** (a base canvas with the four roof-plane shades, the tile courses and a 40 %-alpha hatching of about 2 100 dash segments), then the storey's own layers on top; where the upper storey is smaller than the one below, the lower roof shows around it. The R view shows the roofs alone.
* **Elevation (E):** a line drawing of one side of the house (`052-elev-e.png`): each block of the plan rises to its own number of storeys with a hipped roof whose tiles are drawn as broken horizontal courses in the Roof colour; windows with a cross of glazing bars; the entrance door with a small canopy; a chimney; a plinth on a dashed ground line with grass tufts; blocks further back are drawn in lighter lines (the F key toggles this fading). ←/→ rotate to the other sides (L F R B); R re-rolls the elevation style; D switches to a dark palette. The elevation code is shared with a `com.watabou.tinypubs` package (§3.3).

### 6.5 Colour schemes and wall styles [SHOWN `_probes/keys/K/steps/042–051`]

Keys 1–5 repaint every layer in another palette (2: dark-brown ink, brown walls, beige floors; 3: near-black ink, white floors; 4: white lines on dark blue, a blueprint look; 5: black on white with generated hatching); 1 returns byte-identically to the default. PLAUSIBLE: these are the five ~500-byte scheme files fetched at start-up (`wooden`, `blueprint`, `bw`, `natural`, `plain`). Keys 6–0 switch the wall style (menu order Simple, Castle, Log house, Modern, Sci-fi; the classes `view.architecture.{Simple, Castle, LogHouse, Modern, SciFi}` exist): 7/8/9/0 redraw the walls with 85/58/43/43 pieces on the reference storey (8 also widens the window strokes to 0.26); 6 restores the default.

## 7. Geometry statistics

Sources: the floor walker `_probes/probe-floors.mjs` (92 houses: the 12 export-tied rows and the 80 tag-family houses; every storey view from B to R stored as a vertex record in `_probes/floors/steps/`, log `_probes/probe-floors.log`), measured by `_measure/floors-stats.mjs` → `_measure/floors.json` (one row per storey view) and `_measure/floors-stats.txt` (aggregates). Room polygons are the Floor-colour fills on the room canvas (they are exact cell chains, so areas are integers after dividing by the CTM scale); each room is rasterised to cells; exterior walls are the cell edges used by exactly one room of the storey. Windows are the black w 0.2 strokes of the window canvas. Stair glyphs are clusters of Stairs-colour fills. The 75 "medium" houses include every `medium,*` family, so medium figures mix the tag effects of §4 (listed there seed by seed).

| measure | small (8 houses, 18 views) | medium (75, 190) | large (9, 34) |
|---|---|---|---|
| ground-storey area, cells | 11–16, mean 13.4 | 16–24, mean 21.8 | 27–33, mean 30.9 |
| storeys above ground | 1–3 (median 1) | 1–4 (median 2) | 1–6 (median 3) |
| houses with a basement | 75 % | 67 % (incl. the `basement` family) | 89 % |
| rooms per storey — ground | 1–4 (mean 2.3) | 2–7 (4.5) | 5–7 (6.0) |
| rooms per storey — upper | 1–2 (1.3) | 1–7 (3.4) | 2–8 (4.6) |
| rooms per storey — basement | 2 (2.0) | 1–6 (2.9) | 2–3 (2.8) |
| room area, cells | 1–11, mean 6.1, median 6 | 1–11, mean 4.9, median 5 | 1–11, mean 5.1, median 5 |
| rectangular rooms | 51 % | 64 % | 66 % |
| rooms with no 2×2 block (corridors, nooks) — share of rooms / of area | 14 % / 3 % | 34 % / 13 % | 32 % / 17 % |
| corners per room | 3–12, mean 6.0 | 3–14, mean 4.7 | 3–17, mean 4.6 |
| upper storey / ground area | 0.40–0.92 (mean 0.57) | 0.17–1.00 (0.73) | 0.33–1.00 (0.72) |
| basement / ground area | 1.00 | 0.45–1.00 (0.68) | 0.33–0.61 (0.46) |
| windows per storey above ground | 4–15 (mean 9.6) | 1–23 (14.3) | 9–24 (16.3) |
| windows per exterior cell edge | 0.33–0.90 (mean 0.59) | 0.13–1.00 (0.68) | 0.35–0.86 (0.67) |
| window length, cells | 0.32 (a few clipped to 0.11) | 0.32 | 0.32 |
| staircase glyphs per view | 0–2 | 0–2 | 1–2 |
| stair glyph footprint | 1×1 cell | 1×1 cell | 1×1 cell (a spiral: 2×2 bounding box) |
| interior / exterior wall edges | 0.67–1.28 (0.89) | 0.50–1.90 (1.26) | 0.86–2.04 (1.48) |

Readings for a re-implementer [SHOWN unless marked]:

* **A room is about five cells** whatever the house size; bigger houses get more rooms, not bigger rooms (room-area medians 6 / 5 / 5). Room count per storey ≈ storey area / 5.
* **Upper storeys are usually smaller** than the ground storey (mean 57–73 %), and a basement never exceeds the ground footprint and stays near 11–16 cells ([INFERRED] a cap, §4.3).
* **Windows are a fixed module** (≈ 0.32 cell) placed on roughly two of every three exterior cell edges; `blank` and `transparent` move this density (§4.8).
* **Corridors and nooks** (rooms without a 2×2 block) are a third of the rooms of medium and large houses but only 13–17 % of the floor area.
* The **stair end is one cell** on every storey (the exports lane measures two 5-tread flights plus a landing inside it).

## 8. What cannot be known from outside

* **The acceptance tests and probabilities** behind every random choice — shape candidates (§4.2), storey counts, basement, spiral and stairwell rolls (§4.3, §4.6), the number of list-2 specials (§4.7). Only outcome frequencies are measured (tables in §4 and §7); the walked sample is 92 houses, small and large only 8–9 each.
* **The partition's cut rule** — which notch is cut, in which direction, when an area stops being split, what makes `organic` and `mechanical` differ. Measured: the recursion, the notch identity, the resulting room geometry (§4.4, §7). Not measured: the rule itself.
* **The role-assignment scoring** inside each `validate`, its tie-breaks, and whether listed types that find no valid room are dropped silently (§4.7).
* **The PRNG and its seeding**: the algorithm, why a regeneration consumes a different amount than a start-up, and which view keys draw from it (§3.4 item 3).
* **Why a basement costs one extra plan** (§4.3 gives the inference) and **how upper-storey outlines and basement cells are chosen**.
* **Connectivity inside a storey**: doors are wall gaps in the default render and the door-mode glyphs are not one stroke per door (§4.5), so loops versus trees cannot be read from the drawing; the exports lane's JSON is the source (research/findings/dwellings-exports.md: every storey a tree in its 12 houses).
* **How the unseeded `Math.random` in `Light.getSkele` moves the lights** — it does change the light gradients between loads (§1 correction), but the recorder does not store gradient parameters, so the size and purpose of the jitter are not measured.
* **The elevation's link to the plan** — which plan facts become facade windows, doors, dormers and roof shapes (§4.12).
* **Not exercised by this lane:** the *Rooms › Gothic / Tavern* programmes (the two JSON5 files), the *Walls* submenu beyond keys 6–0, the Style dialog's *Misc.* tab, the exports (owner rule; the dwellings/exports lane covers them).

## 9. Every capture, probe and log used

All under `captures/dwellings/`; the full table with reproduction commands is `captures/dwellings/README.md`. Every capture's `report.md`/`report.json` was produced by `profiler/analyze.mjs`; every coverage and draw file of every capture was processed in full by the scripts named (no sampling).

| item | what | used for | status |
|---|---|---|---|
| `2026-09-26T22-56-56` | Enter mode, profile + coverage + draw, cold load + 3 Enter (previous seat) | §1, §3 call trees, §4 counts | CONFIRMED |
| `2026-09-26T23-11-03` … `23-13-01` (12) | **export-tied set**: rows 1–12 of `exports-2026-09-26/seeds.json` (seeds 260926101–112 with their tags), one reload each, coverage + draw with the vertex record | §3–§7; ties this lane to the exports lane's JSON/SVG of the same houses | CONFIRMED |
| `2026-09-26T23-38-44` … `23-54-02` (16) | **tag-family set** (`run-captures.sh tagsv`): small, medium, large and medium + square, low, tall, slab, mechanical, organic, hallways, spiral, stairwell, basement, blank, transparent, generic; seeds 260926501–505 each (paired), coverage + draw with the vertex record | §4 paired comparisons, identities, §5.3, §7 | CONFIRMED |
| `2026-09-26T23-36-09`, `23-36-25`, `23-36-48` | profile, 50 µs, reload, seeds 260926501–503, small / medium / large | §3.1 cold-load tree, §5 | CONFIRMED (quiet machine) |
| `2026-09-26T23-37-10`, `23-54-54` | profile, 50 µs, cold load + 8 / 30 Enter regenerations | §3.1 Enter tree, §5 (23-54-54 gens 20–30 excluded: no house generated, a recording artifact) | CONFIRMED (23-54-54 ran beside the floor walker) |
| `_probes/resolve-build`, `seed`, `seed-nomarker`, `ui`, `tags`, `params`, `urltags`, `blueprint`, `plan`, `plan2`–`plan4` (+ `.log`) | previous seat's probes (a)–(c), (e) | §1, §2 | CONFIRMED (read in full this session) |
| `_probes/probe-keys.mjs` → `keys/K`, `keys/E1–E3`, `keys/T`, `probe-keys.log`, `keys/K-summary.txt` | every shortcut with coverage + draw + vertices; Enter determinism in three fresh browsers; seven two-part plans | §2.3 correction, §3.4, §4.3, §6 | CONFIRMED |
| `_probes/probe-keys2.mjs` → `keys2/`, `probe-keys2.log` | where the next Enter seed comes from (nine cases) | §3.4 item 3 | CONFIRMED (the shared-PRNG explanation is PLAUSIBLE) |
| `_probes/probe-floors.mjs` → `floors/`, `probe-floors.log`, `floors-seeds.tsv` | the 92 houses walked B → R with vertex records | §7, §4.3, §4.5 | CONFIRMED |
| `_probes/probe-doors.mjs` → `doors/`, `probe-doors.log` | door-mode strokes, entrances and stair glyphs per storey (35 houses incl. hallways and stairwell); layer-by-layer comparison of repeated loads | §4.5, §1 note on lights | CONFIRMED |
| `_probes/probe-stuck.mjs` → `stuck/`, `probe-stuck.log` | replay of `23-54-54`'s Enter chain | §5 exclusion | CONFIRMED |
| `_measure/houses.mjs` → `houses.json`, `houses.tsv`; `identities.mjs` → `identities.txt` | 96 houses × 51 key methods; the call-count identities | §3, §4 | CONFIRMED |
| `_measure/cost.mjs`, `cost-summary.mjs` → `cost.tsv`, `cost-summary.tsv` | per-stage inclusive ms | §5 | CONFIRMED |
| `_measure/floors-stats.mjs` → `floors.json`, `floors-stats.txt`; `draw-scaling.mjs` → `draw-scaling.txt` | geometry and draw scaling | §5.3, §7 | CONFIRMED |
| `_measure/classes-all.mjs` → `classes-all.tsv` | every class of the build with functions defined / run (names only) | §3.3 | CONFIRMED |
| `_probes/layers.mjs`, `keys-summary.mjs`, `dw-methods.mjs`, `paths-summary.mjs`, `draw-summary.mjs`, `dwlib.mjs` | shared measurement code | throughout | — |
| `logs/index.tsv`, `logs/timeline.log`, `logs/*.record.log`, `logs/*.analyze.log`, `run-captures.sh` | run index, time windows, per-run logs (five first `tagsv` attempts failed on the itch-page lookup and were re-run with the build URL pinned) | §5 contention window | CONFIRMED |
| screenshots read: `_probes/keys/K/steps/007-reload.png`, `008-floor-ArrowUp.png`, `052-elev-e.png` | GF, 1F and elevation of `seed=260926109&tags=large` | §6 | CONFIRMED |

PLAUSIBLE items in this file are marked where they occur: the roles of the start-up data files (§1), the basement's throw-away plan (§4.3), the rejection loop and acceptance rule of the shape (§4.2), the notch-cut reading of `getNotch` (§4.4), the stairwell reading of `getStairCells` = 0 (§4.6), the list semantics of the role assignment (§4.7), the hipped-roof reading (§4.12), the colour-scheme file mapping (§6.5), the shared-PRNG explanation (§3.4).
