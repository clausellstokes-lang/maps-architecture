# FTG capture: Stage-2 `roadLength` = 100 m (2026-09-25) — closes `_critic-ftg.md` F3

> PENDING FABLE REVIEW — Opus-produced, not yet checked by a Fable seat; queued in docs/FABLE-REVIEW-QUEUE.md as B17.

**Verdict (CONFIRMED by executed measurement):** the layout form's "Road segment length (m)" is real metres. The
configured value is the persisted **main-road** step (+0.5 m). The generator lays the **normal (branch) streets of the
district stages** at exactly half of that step, (roadLength + 0.5)/2. **Suburb streets are not halved.** Changing only
Stage 2 from 60 to 100 moved exactly the two Stage-2 classes (main roads 60.5 → 100.5 m, normal streets
30.25 → 50.25 m); every other class stayed where it was.

## What was created

- One temporary settlement, **Nevervalley**, PUT sent 2026-09-25 10:21:43.747 UTC (today's single allowance). The PUT
  answered with Galeiaward's id again (`f4bda786-c69e-4c94-8176-716b090a1d31`). The temporary-settlement id belongs to the
  guest identity in `profiler/.profiles/ftg`, and the new settlement replaced the old one under it.
- Base identical to Galeiaward (2026-09-21): City (~10000 people), Medieval europe stages, Wood, Generic fantasy,
  Generic religions, Comfortable, Temperate (deciduous trees), Coastal, Rivers + Farms + Forests + Reserve natural
  area + Walled all on, name blank.
- **The one change:** All settings → Settlement layout → Layout preset **Custom**. This was needed to unlock the stage
  editors, and the stage table (20 / 50 / 30 %) and every stage value carried over unchanged, as verified in steps 009–017.
  Then Stage 2 → **Road segment length (m): 60 → 100**, set with the slider's End key. 100 is the slider maximum (range
  30–100, step 1). Stage 1 (50 m) and the Suburb stage (30 m) stayed at their defaults. Nothing else was touched.
- **Request proof:** the recorded PUT body differs from Galeiaward's in exactly one semantic leaf,
  `layoutParameters.stages[1].roadLength: 60 → 100`. The only other differences are 45 client-random
  `racePartners[].partnerId` UUIDs (`request-diff.txt`). `customStages` stays `false` in the request even under the
  Custom preset, yet the server used the sent stage values: the Stage-2 classes moved.

## Where things are

| what | path |
|---|---|
| capture dir | `captures/ftg/2026-09-25T10-13-51/` (`session/` network + console, `steps/` screenshots, profiles, `steps.jsonl`) |
| layout payload (Fetch-intercepted, 643,546 B) | `captures/ftg/2026-09-25T10-13-51/session/network/bodies/intercept-0054-b39aab95.bin` |
| PUT response (the settlement id) | `…/session/network/bodies/intercept-0028-f68d6af6.json` |
| PUT request body | `postData` of row n=29 in `…/session/network/index.jsonl`; saved pretty-printed as `create-request.json` here |
| request diff vs Galeiaward | `request-diff.txt` |
| raw protobuf structure | `structure.md` (`tools/pb_raw.py`) |
| scripts + outputs (each run on both payloads) | `edge_modes.py`, `spatial_probe.py` (+ `classes_galeiaward-rl60.png`, `classes_nevervalley-rl100.png`), `collinear_probe.py`, `mainroad_probe.py`, `length_precision.py`, `entrance_probe.py`, each with `<name>.out.txt` |

Re-run from the project root:
`python3 research/ftg-capture/roadlength100/<script>.py galeiaward-rl60=captures/ftg/2026-09-21T05-23-58/session/network/bodies/intercept-0018-b39aab95.bin nevervalley-rl100=captures/ftg/2026-09-25T10-13-51/session/network/bodies/intercept-0054-b39aab95.bin`

Screenshots (`captures/ftg/2026-09-25T10-13-51/steps/`):
- form defaults: 001 landing, 003 basic form (defaults), 006 basic form ready
- stage views under the preset: 008 layout view (Medieval europe), 009–011 Stage 1 / Stage 2 / Suburb
- the edit: 012 layout set to Custom, 013 Stage 2 editable, **014 Stage 2 road length = 100**
- re-checks: 015–017 Stage 1 / Suburb / Stage 2, **018 final form**
- create step: 019 (CPU profile, settled after 34.9 s)
- the map: **020 whole map (500 m bar)**, 022/024 core (250 m bar), 025/026 Breadwick–Metheath (250 m bar), **027 street level (100 m bar)**

## Measured

Both payloads were decoded identically (zig-zag sint32, 1 unit = 1 cm). "Rings" are the district ring polygons
(field 10.5.1), i.e. the district-stage zone. Values are p10 / p50 / p90 of edge lengths in a class, or lengths of
exact-collinear runs rejoined across junctions (`length_precision.out.txt`).

| road class (how identified) | configured | Galeiaward (Stage 2 = 60) | Nevervalley (Stage 2 = 100) |
|---|---|---|---|
| Stage-1 main road (type 1, core) | 50 | 50.49 / 50.50 / 50.51 (n 8); runs 50.5 ×15 | 50.49 / 50.50 / 51.18 (n 7); runs 50.5 ×9 |
| **Stage-2 main road** (type 1, runs across junctions) | 60 → **100** | runs **60.5** ×31 (single edges 60.49–60.50) | runs **100.5** ×19 (the 8 inside rings are all split by junctions) |
| Stage-1 normal street (type 0 inside rings, core) | 50 | 24.92 / 25.25 / 25.98 (n 58) | 25.14 / 25.25 / 25.26 (n 66) |
| **Stage-2 normal street** (type 0 inside rings) | 60 → **100** | **30.25 / 30.25 / 30.26** (n 177) | **49.90 / 50.25 / 50.26** (n 119); the 30.25 class is gone (n 5) |
| suburb street (type 0 outside rings) | 30 | 29.99 / 30.00 / 30.01 (n 313) | 29.99 / 30.00 / 30.01 (n 215) |
| suburb short piece (type 0 outside rings) | – | 14.69 / 14.70 / 14.70 (n 254) | 14.69 / 14.70 / 14.74 (n 161) |
| suburb lot outline (type 4) | – | 14.69 / 14.70 / 15.10 (n 1000) | 14.69 / 14.70 / 15.31 (n 739) |
| outer main-road extension (type 1, far) | – | 100.00 (runs ×56) | 100.00 (runs ×39) |

- **Global type-0 modes** (`edge_modes.out.txt`, 1 m bins): Galeiaward 30 ×481, 15 ×254, 25 ×50, 50 ×27. Nevervalley
  30 ×217, 15 ×158, **50 ×128**, 25 ×63.
- **Location** (`spatial_probe.out.txt`): in Nevervalley the 25 m class has midpoint radius p50 203 m (97 % inside rings),
  the **50 m class p50 466 m (86 % inside rings)**, and the 30 m class p50 822 m (1.8 % inside rings). These are the
  walled core, the district-ring zone and the suburbs respectively.
- **Renders** (`classes_*.png`) show the same zoning: blue (25 m) in the walled core, green (50 m) filling the two ring
  districts, red (30 m) + orange (15 m) in the suburb clusters. In Galeiaward, red fills both the ring zone and the suburbs.

Mechanism checks:
- **Not a midpoint split.** Consecutive half-length edges are independently jittered, like separately placed
  segments. In Nevervalley's ring zone, 50+50 pairs are 30 bent vs 9 exactly straight, and 25+25 pairs 34 vs 3. In
  Galeiaward, 30+30 pairs are 68 vs 6. This test covers all nodes including junctions (`collinear_probe.out.txt`), and the
  ≤ 15° bend cap holds. The earlier deg-2-only test could not see a split at a junction; this one can, and finds none.
- **Type 0 outside the rings are the suburb streets; type 4 are lot outlines.** Of the out-of-ring building entrances,
  68–69 % face a type-0 edge (median 3.2 m), 20–21 % a type-1 edge and 10–11 % a type-4 edge (`entrance_probe.out.txt`).
  This matches the guide: the suburb stage "creates small lots from the outset", with invisible lot edges.
- **Counts** (different geography; `seed: null` both times): Galeiaward 5326 edges / 4303 nodes / 2798 buildings /
  17 towers / 4 districts. Nevervalley 4811 / 4045 / 2813 / 29 / 3 districts (Metal Heath, Bread Village, Turnpike
  Dale, rendered as Metheath, Breadwick, Pikdale).

## Verdict on F3: closed

Neither branch of F3 holds as stated.
- The form's "(m)" is not a doubled unit. The configured `roadLength` persists as the main-road step (+0.5 m) in
  metres, and suburb streets persist at exactly the configured 30 m.
- The halving is a generator rule for **district-stage normal streets only**. They are laid at half the main-road step,
  (roadLength + 0.5)/2 = 25.25 / 30.25 / 50.25 m.
- The "suburb 30 → 15 m" part of F3 measured type-4 lot outlines (14.70 m), not streets.
- For a re-implementation: in district stages, use step L (+0.5 m) for main roads and (L + 0.5)/2 for normal streets. In
  the suburb stage, use L for streets.

## Side findings

- **Server generation takes seconds, not ≈ 300 s.** The PUT was answered within 2.90 s this time and 3.23 s on
  2026-09-21 (gap from the PUT to the first layout request, from each session's own `index.jsonl`). The client was
  already building the scene from the full layout 6.4 s / 7.0 s after the click; its heavy script bursts end at 8.3 s /
  15.7 s. The "~300 s" in `ftg-payload-visual.md` §1/§9 was the profiler's 300 s wait cap on a step that never became
  "ready". This run's create step reached "ready" 33.5 s after the click, including page navigation and asset loading.
- `customStages: false` is not a gate: the server honours the `stages` array anyway.
- **Form hazards for the next capture:**
  - `drive.mjs select <n>` counts *all* rendered selects, including settings sections stacked behind the dialog. In the
    layout view the Layout preset is index 3, not 0 (index 0 is the General-section Size). The 2026-09-21 session's
    `select 0 ^Custom$` changed Size, not the preset.
  - The page-level "Create temporary settlement" button at (750, 550) passes `clicktext`'s hit test only when the dialog
    has nothing at that point. This time the "Suburb stage" row covered it, and the dialog button at (1226, 989) was the
    only hit-testable match (checked before clicking).
  - In this shell, `node` is killed (exit 137) when an argument exceeds about 1 KB, so long `drive.mjs eval` expressions
    fail. Use a file-reading inspector instead.
  - The map toolbar has a "Create new temporary settlement" button at (359, 21): never click it while inspecting.

## CONFIRMED vs PLAUSIBLE

- **CONFIRMED (executed):** the request diff; every length, count and location above; the bent-pair test; the entrance
  test; the seconds-scale server time (PUT answered in ≤ 3.2 s, full layout in hand ≤ 7 s after the click).
- **PLAUSIBLE:** why the +0.5 m and the /2 exist (an overlap for snapping, branch spacing), that type 1 is exactly the
  "main road" class of the guide, and that the 14.70 m pieces are lot-depth splits. The payload carries no reasons.

## Superseded statements (not edited by this lane)

- `_critic-ftg.md`: F3 (OPEN; "60→30, 30→15, 50→25"), §4 row 5, §6 item 1, and the ≈ 300 s generation citations in F20,
  F27 and §2/§3 rows.
- `ftg-docs-params.md`: §5.7 item 7 (300 s), and the critic-2 list items 3 ("(m) possibly 2 wire-metres"), 5
  ("4 = suburb streets (15 m)") and 8.
- `ftg-payload-visual.md`: §1 and §9 (300 s), and critic-2 addendum B (type 4 read as suburb streets) and F. Superseded
  in place by the part-2 addendum there.
- `ftg-posts-a/b/c.md`: the ≈ 300 s generation-time notes.

## Fable review (2026-09-27) — B17

**Verdict: CONFIRMED** (`docs/fable-review/main/evidence-captures.md`, row B17). `length_precision.py` and `edge_modes.py`
re-run on both payloads with the command above: outputs byte-identical to the stored `.out.txt` files (Stage-2 normal streets
30.25 → 50.25 m, Stage-2 main-road runs 60.5 → 100.5 m, Stage-1 25.25 / 50.5 m and suburb 30.00 m unchanged, lot outlines
14.70 m). Server time re-derived from the network indexes: 2026-09-25 PUT → OPTIONS on the settlement at +2.90 s and the
layout GET at +3.72 s; 2026-09-21 (the PUT is in `captures/ftg/2026-09-21T05-08-07/session/network/index.jsonl`) PUT →
layout OPTIONS at +3.23 s, GET at +4.27 s. `docs/ARCHITECTURE.md` consumes the (L + 0.5)/2 law at §4.4 and §13.5's street-runs
row and the seconds-scale server time at §12; `docs/CONFIDENCE.md` §0.3 cites F3's `roadLength` as settled.
