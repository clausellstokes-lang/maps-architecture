# edits_d — §13.2: the bars of items 120–126 (G120 – G126-scope; R2-35, with R2-32, R2-36, R2-37, R2-38, R2-39, R2-40,
# R2-41) and the take-over table (VCS-10, VAP-r1-09, R2-06 (a), R2-08, the volumes' round-2 hand-offs) (scope r2)
B = '/home/user/maps-architecture/docs/ARCHITECTURE.md'
S = '### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT'

GROUPS = """  * *Find (item 120; §2.9, §8.2, §9.5, §11.1, §11.2, §12.5) — a view, never a change; built at M5.* (T120-1) the model
    digest, the document's hash, its saved bytes and its edit log are identical with Find on and off, and turning every
    chip off — Clear, or closing the panel — restores byte-identical tiles (the pin `item120.find`, a `NoOpPin` of kind
    `view`); (T120-2) each chip's matches equal §11.2's gazetteer match listing at the viewer's effective key, by class,
    area and layer (`find.matches` 0); (T120-3) under a player view on T-V9-66's canary fixture no withheld thing appears
    in a suggestion, a count, a glow, a pin, a ghost pin, a gap outline or a legend chip (`find.leaks` 0); (T120-4) the
    chips survive every band and layer change and every commit, advance, undo, redo, regenerate, load and migration,
    re-evaluated at once, and a chip whose last match goes stays in the set at count 0, dark (`find.held` 0); (T120-5) at
    the city band every match has a pin or is counted in a bubble (`find.pins` 0), and every chip has its second cue — its
    glyph on its pins and its dash pattern on its halo's outline (`find.cues` 0; item 112); (T120-6) at the METROPOLIS cap
    on §12.1's reference hardware, suggestions within ≈ 50 ms of a key and a chip's glow within ≈ 100 ms of its click
    (`time.findSuggest`, `time.findGlow`, in the timing phase; §12.5). Volume 9 runs T120-2 – T120-5's interface clauses
    on its app harness (T-V9-83), volume 12 the pin, the statistics and the timings (T-V12-52: T120-1, T120-6), volume 1
    the town's areas and gaps (T-V1-59: T120-2 and T120-4), volume 3 the interior band (T-V3-38: T120-4), volume 4 Below
    (T-V4-81: T120-4 and T120-5), volume 5 Sky (T-V5-36: T120-1's registration, T120-4 and T120-5), volume 7 the village
    rungs (T-V7-68: T120-1's registration and T120-4), volume 8 the dossier's entries (T-V8-58: T120-2) and volume 10
    the clerk's "show me" (T-V10-51: T120-2's clerk clause).
  * *The resolution adjuster (item 121; §8.8, §8.4 (g), §12.1, §12.5, §12.8) — device state and drawing only; built at
    M4.* (T121-1) Auto is the level on a fresh install (`AppPrefs.resolution` absent); (T121-2) no level change while a
    pan, zoom or drag is in progress — a change lands only at §8.8's settle — and on a fixture loaded at its threshold at
    most one change per 10 s, with no oscillation (`resolution.changes` 0); (T121-3) Auto holds §12.5's frame budget at
    p95 on the reference and the low-end device over §12.5's reference views (`resolution.p95`); (T121-4) a manual level
    is drawn as chosen or, where the device cannot hold its canvas need, the nearest level that fits with item 121 (f)'s
    line — never a refusal or a crash; (T121-5) labels, text, the chrome and every overlay are drawn at the device's full
    pixel ratio at every level (a pixel test, `resolution.textPx` 0); (T121-6) every picture, print and battle-map export,
    and the document and its hash, byte-identical across every setting (the pin `item121.display`, kind `view`, its
    `exports` clause); (T121-7) a change of the device pixel ratio re-evaluates the level at once; (T121-8) native 4K, lit
    at full precision, holds on the ultra tier within its 512 MB canvas ceiling (§8.8, §12.8; `resolution.ultra4k`).
    Volume 9 runs T121-1, T121-4 and T121-7 on its app harness, where T121-5's captures are taken (T-V9-84), and volume
    12 T121-2, T121-3, T121-5, T121-6 and T121-8 (T-V12-53).
  * *Crisis looks (item 122, with (h)–(i); §2.7, §2.9, §7.7's DR44, §10.2, §8.2, §8.8, §11, §12.5) — a look, never a
    change; built at M3b, the dossier's reading at M-SF.* (T122-1) the same document hashes identically — its model, its
    digests and its save — with crises on, off and under every preview and in every week (the pin `item122.crises`, kind
    `view`); (T122-2) each look shows exactly in its condition's weeks — while §2.9's `week` lies in [`sinceWeek`,
    `untilWeek`), or from `sinceWeek` on while an overlay with no `untilWeek` stands (§2.7) — and never for a condition
    the viewer's key withholds (DR44's admission) (`crisis.weeks` 0); (T122-3) a look draws identically in the view and in
    every picture export, its tiles byte-stable per seed (`crisis.stable` 0); (T122-4) every SettlementForge stressor
    type and condition archetype at the pinned baseline has its row in §10.2's closed map — a look or an explicit `none`
    — and a word no row maps reads `none`, reported `unmapped_word` (a totality check over V08's census lists); (T122-5)
    the scale follows severity and tier — each tier's fixture at a low and a high severity within its look row's scale, a
    hamlet a war band's camp and a city a full siege line — and the dossier's headcounts where it gives them, at item
    122 (h)'s rates (`crisis.scale`); (T122-6) nothing stands on water, in a gate's passage or over a label's keep-out,
    and several crises share the outskirts by `priority` under `densityCap` (§10.2's placement; `crisis.blocked` 0);
    (T122-7) with no condition and no preview, the tiles are byte-identical to the base (`item122.crises`, its `tiles`
    clause). Item 122 (h)–(i)'s four bars are volume 12's own (T-V12-55: the camped area by headcount, two armies twice
    one, every camp inside the opening view, Fit and the limit while a look stands, the limit restored when none stands).
    Volume 12 runs T122-1 – T122-3 and T122-5 – T122-7 (T-V12-54), volume 11 T122-4's compile check (T-V11-46) and
    volume 8 its census of the baseline's lists (T-V8-59), volume 9 T122-2's interface clause (T-V9-85), volume 6
    T122-1's hand-over clause (T-V6-75), volume 7 T122-5 and T122-6 at the village rungs (T-V7-69) and volume 3 the plan
    clauses of T122-1 – T122-3 (T-V3-40); volume 1's units and land (T-V1-60), volume 2's ruined look (T-V2-60), volume
    8's forces (T-V8-60) and volume 10's explanations (T-V10-52) test their own parts.
  * *A ruined building's plans (item 123; §2.6 step 7, §6.3, §8.6, §11.1) — the plan as built, damaged, never redrawn;
    built with volume 3's P4 and P5, the decay level with M6-E.* (T123-1) room, wall and opening ids are identical
    between the intact and the damaged plan, and a building first met ruined — generated as a ruin, or reached by item
    113's replay — carries the plan it had when built; (T123-2) damage is monotone in the decay level: a higher level's
    damaged set ⊇ a lower's, on every element (`damage.nested` 0); (T123-3) for a seed each element breaks at one level —
    one threshold per element, keyed by lineage and element id (§6.3's `plan.damage`) — on every engine and across
    regeneration, load, undo and migration (`damage.breakLevel` 0; §6.5 (9)); (T123-4) restoring — `reused`, `reoccupy`,
    a repair — lowers the level and removes the damage in reverse threshold order, each repaired element drawn in item
    114's patch material; (T123-5) the exterior agrees with the plan: a roof hole over a room shows from above as an
    opening in its roof, and a fallen run of outer wall as an open stretch of the footprint's edge; (T123-6) battle-map exports' line of sight passes fallen
    wall runs, a doorless opening is a gap, and rubble heaps and floor holes are image only (§11.1); (T123-7) a never-decayed
    building keeps its plan byte for byte as it is without item 123 (the pin `item123.damage`, a `NoOpPin` of kind
    `entityScope`). @@V03_123@@
  * *Light weather (item 124; §2.9, §6.1, §8.2, §8.4, §8.8, §11, §12.5) — a view layer only; built at M3b.* (T124-1)
    the document's hash and every tile are identical with the effects on and off, the tile cache untouched by a spell
    (the pin `item124.effects`, kind `view`, its `cache` clause); (T124-2) the effects' frame cost is within ≈ 1 ms a frame
    at the densest spell on §12.1's reference hardware (§12.5; `weather.frameMs`, in the timing phase); (T124-3) on an
    `arid` climate row and on every row whose winter does not freeze, no snow falls or lies in any week, a `snow` cover
    drawn `clear` there (§8.2; `weather.snow` 0); (T124-4) arid rain frequency lies within its row over a simulated year
    of the timeline (`weather.aridRain`); (T124-5) the effects are off by default on the low tier and under reduced
    motion; (T124-6) labels, the chrome and every overlay are never covered (a pixel test, `weather.cover` 0); (T124-7) no
    luminance step is faster than §8.4 (i)'s photosensitivity limit (`weather.luma` 0); (T124-8) picture, print and
    battle-map exports are byte-identical with the effects on and off (the pin's `exports` clause); (T124-9) the timeline
    replays from its session seed and clock (§6.1's `view.weather`, never a model stream; `weather.replay` 0). Volume 11
    runs T124-3's and T124-4's row clauses as compile checks (T-V11-48), volume 9 T124-5 (T-V9-87), determinism §6.5
    (9) T124-9's stream clause, and volume 12 T124-1 – T124-4 and T124-6 – T124-9 (T-V12-57).
  * *The dossier the only data input (item 125; §11.3, §11.4, §14, §7.7, §4.11, §2.9); its bars from M-SF.* (T125-1) a
    dossier holding only SettlementForge's required keys generates a full map at every rung, every field the port uses
    that it lacks reported with the fallback taken (`field_fallback`, V08 §2.4's fallback column) — with no stamped tick,
    §4.11's clock at week 0 and the year position at midsummer (`port.fallbacks` 0); (T125-2) the same dossier with and
    without a host context, and under each `HostContext` field (`audience`, `displayNames`, `line`), yields the identical
    document and hash (the pin `item125.host`, a `NoOpPin` of kind `input`); (T125-3) no code path of the port reads
    anything but the dossier — a static check of each adapter's imports and reads. Volume 8 runs T125-1 – T125-3 on its
    host harness (T-V8-61) and volume 12 T125-1 and T125-2 (T-V12-58).
  * *Tablets and desktops only (item 126 (a2); §1.1); built at M2a with the medium layout.* (T126-1) at the medium class
    every tool of V09 §4.12's list completes its canvas script under touch; (T126-2) below the medium class the medium
    layout holds at its 600 × 480 minimum and the page scrolls, and the document, the view and the selection are
    byte-identical across a resize over the threshold (the pin `item126.resize`, kind `view`); (T126-3) no phone layout,
    screen, notice or catalogue row exists — a build-time scan of V09's layout classes and message catalogue. Volume 9
    runs them on its app harness (T-V9-22: T126-1's tablet half, T126-2 and T126-3), volume 8 T126-2's host-frame clause
    (T-V8-62) and volume 12 T126-1's medium-minimum clause and T126-2 (T-V12-59).
"""

OLD_TABLE = None  # rows substituted one by one below

ROWS = [
    # evolution (V06)
    ("T114-1 – T114-5 and T114-8's epoch clause (T-V6-73), T115-1 and T115-2 across a rung change (T-V6-74) | the evolution engine (volume 6, M6-E) | T-V6-1 – T-V6-74, on the H-100, H-DOSSIER and other H fixtures |",
     "T114-1 – T114-5 and T114-8's epoch clause (T-V6-73), T115-1 and T115-2 across a rung change (T-V6-74), T122-1's hand-over clause (T-V6-75), T123-4's epoch clause (T-V6-76) | the evolution engine (volume 6, M6-E) | every T-V6 test (V06 §7), on the H-100, H-DOSSIER and other H fixtures |",
     'VCS-10 / V06 hand-off'),
    # sky (V05)
    ("| T10-1, T13-1, T15-1, T102-2 | the sky layer (volume 5, M6-sky) | T-V5-1 – T-V5-33 (T102-2 by T-V5-19 – T-V5-21) |",
     "| T10-1, T13-1, T15-1, T102-2, T117-1 – T117-8's and T118-1 – T118-6's island clauses (T-V5-34, T-V5-35), T119-2 – T119-5's island clauses (T-V5-18), T120-1's registration and T120-4's and T120-5's sky clauses (T-V5-36) | the sky layer (volume 5, M6-sky) | every T-V5 test (V05 §7) (T102-2 by T-V5-19 – T-V5-21) |",
     'VCS-10 / VAP-r1-09 / V05 hand-off'),
    # underground (V04)
    ("T109-1 – T109-6, T113-4 (T-V4-77), T113-5 (T-V4-76) | the underground layer (volume 4, M6-U) | T-V4-1 – T-V4-80 |",
     "T109-1 – T109-6, T113-4 (T-V4-77), T113-5 (T-V4-76), T119-2, T119-3 and T119-5's clauses on this layer (T-V4-32), T120-4's and T120-5's underground clauses (T-V4-81), T123-1's, T123-2's and T123-6's clauses below ground (T-V4-82) | the underground layer (volume 4, M6-U) | every T-V4 test (V04 §7) |",
     'VAL-R1-04 / VCS-10 / V04 hand-off'),
    # plan rung (V03)
    ("T28-19, T63-3 | the plan rung (volume 3, M6-P) | T-V3-1 – T-V3-36 |",
     "T28-19, T63-3, T119-2's plan clauses (T-V3-37), T120-4's interior-band clause (T-V3-38)@@V03_ROW@@ | the plan rung (volume 3, M6-P) | every T-V3 test (V03 §7) |",
     'VCS-10'),
    # stage 3 (V02)
    ("| T29-4 on stacked and solid wings, T110-4, T110-5, T115-1's composed shapes (volume 2's item-115 bars) | stage 3 (volume 2, M6; its item-110 part at M3a) | T-V2-1 – T-V2-57 and its item-115 bars (V02 §7) |",
     "| T29-4 on stacked and solid wings, T110-4, T110-5, T115-1's composed shapes (T-V2-58), T119-2's stage-3 clauses (T-V2-22, T-V2-24), T123-5 (T-V2-59) | stage 3 (volume 2, M6; its item-110 part at M3a) | every T-V2 test (V02 §7) |",
     'VCS-10 / VAP-r1-09 / V02'),
    # stage 2 (V01)
    ("| §15.2's stage-2 letters S1–S6 | stage 2 (volume 1, M5) | T-V1-1 – T-V1-58 |",
     "| §15.2's stage-2 letters S1–S6, T119-2 and T119-3's stage-2 clauses (T-V1-29), T120-2's and T120-4's town clauses (T-V1-59) | stage 2 (volume 1, M5) | every T-V1 test (V01 §7) |",
     'VCS-10'),
    # village (V07)
    ("the village halves of T113-1 and T113-3 (T-V7-59), and the village clauses of T114-1 – T114-8 (T-V7-62), T115-1 – T115-4 (T-V7-63), T116-1 – T116-4 (T-V7-64), T117-1 – T117-8 (T-V7-65) and T118-1 – T118-6 (T-V7-66) | the village product (volume 7) | T-V7-1 – T-V7-66, with B-VILLAGE and B-VG |",
     "the village halves of T113-1 and T113-3 and T114-9's village clause (T-V7-59), and the village clauses of T114-1 – T114-8 (T-V7-62), T115-1 – T115-4 (T-V7-63), T116-1 – T116-4 (T-V7-64), T117-1 – T117-8 (T-V7-65), T118-1 – T118-6 (T-V7-66), T119-2 – T119-4 (T-V7-67), T120-1 and T120-4 (T-V7-68) and T122-5 and T122-6 (T-V7-69) | the village product (volume 7) | every T-V7 test (V07 §7), with B-VILLAGE and B-VG |",
     'VCS-10 / V07 hand-off'),
    # SettlementForge (V08)
    ("T117-1 and T117-6 (T-V8-54) and T118-1, T118-2 and T118-5 (T-V8-55) | the SettlementForge connection (volume 8, M-SF) | T-V8-1 – T-V8-57, on the host harness |",
     "T117-1 and T117-6 (T-V8-54) and T118-1, T118-2 and T118-5 (T-V8-55), T120-2's dossier clause (T-V8-58), T122-4's census clause (T-V8-59), T125-1 – T125-3 (T-V8-61) and T126-2's host-frame clause (T-V8-62) | the SettlementForge connection (volume 8, M-SF) | every T-V8 test (V08 §7), on the host harness |",
     'VCS-10 / V08 hand-off'),
    # clerk (V10)
    ("| T101-6's clerk path, T115-3's clerk form (T-V10-48) | the built-in clerk (volume 10, M3c) | V10 §7's evaluation cases and T-V10-1 – T-V10-50 |",
     "| T101-6's clerk path, T115-3's clerk form (T-V10-48), T120-2's clerk clause (T-V10-51) | the built-in clerk (volume 10, M3c) | V10 §7's evaluation cases and every T-V10 test (V10 §7) |",
     'VCS-10 / V10 hand-off'),
    # application (V09)
    ("| T101-1 – T101-9 on the canvas, §13.4's scripted tasks and first-five-minutes test, the screens of items 111–119 (T-V9-71 – T-V9-79: T114-6's legend, T115-3's hand form, T116-1's view controls, T117-6, T118-2 and T119-3 among them) | the application (volume 9, inside M1–M4b; its staged screens with their layers) | T-V9-1 – T-V9-80 |",
     "| T101-1 – T101-9 on the canvas (T101-4 by T-V9-82, T101-7 by T-V9-81), §13.4's scripted tasks and first-five-minutes test, the screens of items 111–126 (T-V9-71 – T-V9-79, T-V9-83 – T-V9-87: T114-6's legend, T115-3's hand form, T116-1's view controls, T117-6, T118-2 and T119-3 among them, T120-2 – T120-5's interface clauses (T-V9-83), T121-1, T121-4 and T121-7 (T-V9-84), T122-2's interface clause (T-V9-85) and T124-5 (T-V9-87)), T126-1's tablet half, T126-2 and T126-3 (T-V9-22) | the application (volume 9, inside M1–M4b; its staged screens with their layers) | every T-V9 test (V09 §7) |",
     'VCS-10 / R2-35'),
    # calibration (V12)
    ("| every bar's register line and its spec, the specs, pins and bench bars of items 111–119 (T-V12-44 – T-V12-50) | calibration (volume 12) | T-V12-1 – T-V12-51 (T-V12-35 checks the bar map) |",
     "| every bar's register line and its spec, the specs, pins and bench bars of items 111–126 (T-V12-44 – T-V12-50, T-V12-52 – T-V12-59): T120-1 and T120-6 (T-V12-52); T121-2, T121-3, T121-5, T121-6 and T121-8 (T-V12-53); T122-1 – T122-3 and T122-5 – T122-7 (T-V12-54), beside item 122 (h)–(i)'s four bars (T-V12-55); T123-2, T123-3 and T123-7 (T-V12-56); T124-1 – T124-4 and T124-6 – T124-9 (T-V12-57); T125-1 and T125-2 (T-V12-58); T126-1's medium-minimum clause and T126-2 (T-V12-59) | calibration (volume 12) | every T-V12 test (V12 §7) (T-V12-35 checks the bar map) |",
     'VCS-10 / V12 hand-off'),
    # content (V11)
    ("| every content row a bar reads, T117-3 (T-V11-42) | the content (volume 11) | T-V11-0 – T-V11-45 |",
     "| every content row a bar reads, T117-3 (T-V11-42), T122-4 (T-V11-46), T124-3's compile clause and T124-4's row clause (T-V11-48) | the content (volume 11) | every T-V11 test (V11 §7) |",
     'VCS-10 / V11 hand-off'),
]

V03_123 = ("Volume 3 runs the plan clauses of T123-1, T123-2, T123-4, T123-6 and T123-7 (T-V3-39), volume 4 T123-1, T123-2\n    and T123-6 below"
           " ground (T-V4-82), volume 2 T123-5 (T-V2-59), volume 6 T123-4's epoch clause (T-V6-76), determinism §6.5 (9)\n"
           "    T123-3's engine clause and volume 12 T123-2, T123-3 and T123-7 (T-V12-56); volumes 9 and 10 test their lines\n"
           "    (T-V9-86, T-V10-53).")
V03_ROW = ", T122-1's, T122-2's and T122-3's plan clauses (T-V3-40), T123-1's, T123-2's, T123-4's, T123-6's and T123-7's plan clauses (T-V3-39)"


def register(E):
    g = GROUPS.replace('@@V03_123@@', V03_123)
    E.add(B, S, "\n* **The volumes' tests and the base's hook bars.**", "\n" + g.rstrip('\n') + "\n* **The volumes' tests and the base's hook bars.**", 1,
          'G120 – G126-scope (R2-35) groups')
    for old, new, tag in ROWS:
        E.add(B, S, old, new.replace('@@V03_ROW@@', V03_ROW), 1, tag)
