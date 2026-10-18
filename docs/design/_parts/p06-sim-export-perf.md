## §11 Simulation and content layer (FTG parity, with restraint)

**Depth justification.** FTG's "every building has a purpose and people" is the part of FTG users praise most ("if I see it, I can go there", `docs/IMPROVEMENTS.md` §4 R7) and its roster-first order is what makes district typing meaningful; the map must therefore carry a roster and a per-plot context vector in the base. Beyond that, FTG's hourly schedules, calendar and external time sync are cheap and mechanical (`docs/CONFIDENCE.md` F1/F2: schedule = deterministic query per hour; calendar configurable), while relations, events, factions with goals and the person description templates are content-heavy (FTG's 209 building types, 80 nodes, 299 professions, 323 items — all to be re-authored under clean-room) and do not change the picture. Decision (J-S adopted, recorded in §20): the base ships the **roster + households + lazily derived people + professions + schedules + calendar/clock + factions/religions as data** as a module; **events, relation graphs, dialogue-grade descriptions** are should-have follow-ons behind the same ids.

Module design (`sim/`, optional, replaceable):

* **Population from size**: the request's population (or derived from area/buildings by class tables) → households by wealth band from the prosperity field (O18) → people lazily from `(household id, 'people')` sub-streams, stored only when pinned or edited (FTG's own lazy person details, made deterministic).
* **Buildings from a resource/dependency graph** (our own tables, FTG's *ideas* — `ftg-docs-params.md` §3.3 read for the mechanism): nodes are resources/services with `onePerNPeople` or `perOtherNodes` ratios, converted to per-person ratios; a **virtual-population loop** decides the order in which workplaces are added; core vs shop pools with a shop probability; lifestyle-banded pools with rare outliers (weights are ours); hard min/max per class; size gates (`firstAtPopulation`); resource availability gates (no farmland → no farms, shops instead — FTG's rule). Output: the roster P1 hands to layout; P11 reconciles.
* **Professions and households**: profession tables keyed by building class with household templates (family-unit model — FTG's T-01 idea for economy of relations); ages, genders, races as data dictionaries (append-only, id-referenced so renaming never re-colours — FTG DAT-3's failure avoided).
* **Schedules/time**: a profession → weekly schedule table (hour quantum, rest days); `whereIs(person, t)` is a pure function of the schedule and the building's sub-locations (rooms exist because the plot model gives every building slots and stage 3 gives rooms); a calendar (hours/day, days/week, rest days, weekday names) with an external time sync API (§12).
* **Factions/religions**: data tables with turf as district ids; leaders as pinned people.
* **Name generation**: the same original grammar engine as §10 with people-name corpora of our own authoring (Markov over our own syllable lists).

Everything is data-driven and replaceable: the module's only contract with the map is `Roster` in and `Assignment` results out; a host may supply its own roster (host-input phase).

---

## §12 Export and interop (the fourth contract)

| target | content | notes / parity |
|---|---|---|
| **native JSON** (canonical) | the full `Document` (§3.3) — blueprint, edits, entities, subdivisions, fields, tables, report, stats | round-trip `export → import → export` byte-identical (O11 c); versioned with migrations; MFCG cannot re-import its export and FTG's export ≠ edit format (`mfcg-devlogs-b.md` §2.14; O11) — both designed out |
| **binary twin** | same schema, varint zig-zag int32 cm centred on the settlement centre (FTG's economy: 593 KB for 2 798 buildings + population) | for embeds and sharing; a decoder is part of the library |
| **GeoJSON** (RFC 7946) | FeatureCollection in a local metric CRS (declared `crs`/`units: m` property + a WGS84 affine anchor option), one feature per entity with `id`, `kind`, `layer`, properties = the entity's public attributes; districts included (FTG omits them, F26); MultiPolygon for face unions | validates against an open validator; opens in QGIS (MFCG's "resembles GeoJSON" is the failure) |
| **SVG** | layered semantic SVG from the display list: `<g id="layer.ground"><g class="way primary" data-id=…>`; text as text; hatching as paths | every layer and class separable (O11 h); print sizes via viewBox |
| **PNG / tiles** | any resolution, per-layer masks (transparent PNG per layer — the largest MFCG ask, O11) | 300 dpi A2 |
| **VTT** | per-layer scene JSON: walls (building outlines, curtain walls) as wall segments, doors from entrances, lights from `lights` role and windows (night), regions from districts/plots, journal links from entity ids; grid scale declared; separate levels for `underground` (sewers) and `sky` (islands); a Foundry/Roll20-shaped adapter (FTG's Foundry module fields, `ftg-payload-visual.md` §7.3, are the shape to match: building, person, faction, district) | no manual steps on import (O11 g) |
| **3-D** | **glTF** (binary, permissive tooling; chosen over CityJSON — §20) with per-building meshes extruded from footprints and heights, roofs from `RoofSpec` (skeleton hips / gables), walls and towers, terrain mesh, water planes; OBJ as a secondary flat export (MFCG's OBJ merges everything into one mesh — we keep one mesh per entity) | shadows in 2-D agree with 3-D because heights are model data (O17 g) |
| **statistics record** | per-generation metrics with provenance (§14) | the corpus-calibration input |
| **permalink** | §7.2 | — |

**Embedding API** (`embed/`): an ESM library (`createTown(request) → Document`, `applyEdit`, `regenerate`, `query`, `render(target, style, lod)`, `export(format)`) plus an **iframe bridge** over `postMessage` with origin checks and a `stateId` optimistic-concurrency token — FTG's protocol shape (`ftg-payload-visual.md` §7.2): events `BUILDING | DISTRICT | PERSON | FACTIONS | PIN | TIME | LOCATION | SELECTION | UPDATE_*`, commands `SET_TIME | SIMULATE_TIME | SET_LOCATION | UPDATE_ENTITY | ASSIGN | REGENERATE | EXPORT`. Host inputs (rosters, assignments, circumstances) enter only through the same typed request (no external constraints now — roadmap consequence only).

---

## §13 Performance budgets

Reference bars (recorded): MFCG model 16–82 ms at size 24–33, 125–260 ms at size 80 (`profile-mfcg.md` §7.1; `buildGeometry` = 80–93 %), one Canvas2D replay 170–230 ms at size 80 with 46 000 fills; NG 10–52 ms model + 20–26 ms view per hood, rasterise 73 ms (`profile-neighbourhood.md` §5); VG 240–330 ms incl. rendering, 2.45 s cold; FTG ≈ 3–7 s server for a CITY plus 4.6 s client scene build (`_critic-ftg.md` F20; task ruling).

| size class | request | ≈ buildings (our tables, PLAUSIBLE) | model p50 / p95 | first paint (city LOD) | full redraw / pan | memory |
|---|---|---|---|---|---|---|
| TOWN | pop ≈ 5 000, ≈ 40 MFCG-cell equivalents | 1 000–1 500 | ≤ 60 / ≤ 100 ms | ≤ 50 ms | ≤ 16 ms (retained tiles) | ≤ 30 MB |
| CITY | pop ≈ 20 000, ≈ 80 cells | 4 000–6 000 | ≤ 200 / ≤ 300 ms | ≤ 100 ms | ≤ 16 ms | ≤ 100 MB |
| METROPOLIS | pop ≈ 50 000, ≈ 150 cells | 10 000–15 000 | ≤ 700 ms / ≤ 1 s | ≤ 200 ms | ≤ 16 ms with tiles; ≤ 33 ms on the low tier | ≤ 300 MB |

Per-stage budgets (CITY): P0 ≤ 20 ms (O(cells)), P3 ≤ 40 ms, P4–P6 ≤ 20 ms, P7 ≤ 40 ms (the fusion gate: network + infill ≤ 100 ms at CITY, O4 f), P8–P10 ≤ 60 ms (site plans ≤ 10 µs per plot median, O17 h), P11 ≤ 20 ms, P12–P13 ≤ 20 ms, P14–P15 lazy per district. Neighbourhood LOD: open one district ≤ NG's 10–96 ms at comparable counts; ≈ 25 canvas ops per wing (NG's measured budget) is the ceiling for the `shaded` preset, hatch instanced.

Mechanisms: generation in a Web Worker with **incremental delivery** (P0–P6 first → a city-LOD preview appears while P7–P13 continue; the app is never blocked); lazy per-district derivation; tiles cached per district and invalidated by edit scope; typed arrays; no allocation in hot loops; derived geometry (roofs, spines, scatter) cached by id; time-to-first-map < 1 s cold (VG's 2.45 s cold and NG's 205 ms audio-context init are the failures to avoid).

