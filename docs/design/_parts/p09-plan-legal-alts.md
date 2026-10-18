## §17 Build plan — base milestones first, riskiest spikes first

| # | milestone | contents | exit criteria (measured) |
|---|---|---|---|
| S-1 | **Spike: robust kernel** (2–3 weeks) | `core-geom` DCEL on int32 cm, robust predicates, snap rounding, booleans/offset adapters, straight skeleton with holes, typed results; `core-rng`; `core-schema` skeleton | B-FUZZ 0/0/0 on every primitive; DCEL Euler and edit properties; skeleton on 1 000 holed polygons; cross-platform hash test green |
| S-2 | **Spike: the fused layout** (3–4 weeks) | P0 (terrain, drainage, one water config), P3 backbone (destination A* + staged proposal queue), P4 districts, P7 bent-cut infill with the fallback ladder; a debug renderer | O4 (f): network + infill ≤ 100 ms at CITY; infill block-area and junction statistics inside NG's measured bands on the same district shapes; restarts 0 on 1 000 seeds; turn-angle spectrum without a cliff |
| S-3 | **Spike: twisted bisection calibration** (in S-2, 1 week) | bend/arrival/stop constants tuned against `captures/neighbourhood` vertex captures (BG-1 statistics) | K1/K2 within spread; the forward test (bentcut_forward.py-style) ≥ 80 % on our own cuts |
| M1 | **A viewable MFCG/FTG-class town** (the first product milestone) | P0–P10 + P14 + display list at `city`/`district` LOD + `ink` preset + Canvas2D tiles + PNG/SVG + permalink + report; walls, gates, castle, plaza, temple, coast/river, farms, greens; site plans with the trivial builder; heights stored | side-by-sides against MFCG and FTG at TOWN/CITY/METROPOLIS pass the owner's eye; O2, O6, O3, O11 (schema + PNG/SVG), O1, O4, O5, O18, O17, O8, O12 (ink), O16-core criteria met; §13 budgets at TOWN and CITY |
| M2 | **Content, editing, exports** | P1/P11 roster + context vector + lazy people; edit log, locks, warp, draw, regenerate-area, undo; GeoJSON/VTT/glTF/binary; `lit` preset; labels with street names; hinterland rings; greenery | O7, O9, O13-core, O14-core, O19, O11 extras; B-EDIT green; the 12 MFCG edit asks 12/12 |
| M3 | **Intent, assignment, workflow, sim module** | O10 intent vocabulary + forms catalogue + pins + assignments + placement solver; thumbnails; schedules/calendar/factions module; bridge | O10, O16 full, sim parity rows (FTG B3–B5, F1–F2) |
| M4 | **Stage-2 neighbourhood composition** | `NeighbourhoodGenerator` on the S1 contract; `neighbourhood` LOD band; `shaded` preset (hatch, prism shadows, crowns, cobbles, chimneys, wells); S4 templates; S6 workflow | S1–S6 criteria; NG parity rows; one district opens ≤ NG's 10–96 ms; footprint hash identical to city LOD |
| M5 | **Hardening** | WebGL2 tier, print presets, relief tiers, low-end tier, golden suite, corpus-calibration interface for tables | §13 at METROPOLIS; visual regression matrix green |

Deliberately out of scope: the village product (THORP → HAMLET → VILLAGE) and its tracker roads, VG's rendering preset as a product, stage-3 compositions (hooks only), sewers, floating islands, evolution engine, live sync service, corpus calibration, setting packs, host-application inputs.

---

## §18 Clean-room and legal posture; third-party licence list

* **Clean-room**: no code from TownGeneratorOS (GPL-3) or from any captured bundle is read, copied, ported or paraphrased; algorithms are specified here from published sources (Shewchuk predicates; Bridson Poisson-disc; Felkel–Obdržálek/Aichholzer straight skeleton; Martinez–Rueda booleans; Chaikin; Visvalingam–Whyatt; Parish–Müller growth; Lloyd relaxation; marching squares; fBm) and from the creators' *stated* ideas, with our own constants calibrated on our own captures. Data assets (naming corpora, palette values, FTG building/profession/item tables, textures) are the references' creative content and are **not reused**; ours are authored fresh under the same schema ideas. The 2017 source may be opened only by a verification seat, never by an implementer.
* **Licences (all permissive)**: `robust-predicates` (MIT), `delaunator` (ISC), `earcut` (ISC), `flatbush` (ISC), `polygon-clipping` (MIT) or `clipper2` (Boost Software License 1.0) — one chosen in S-1, TypeScript (Apache-2.0), Vite/esbuild (MIT), vitest (MIT), Playwright (Apache-2.0), fast-check (MIT), fonts IM Fell family (SIL OFL 1.1), Cinzel (SIL OFL 1.1), Voltaire (SIL OFL 1.1) — bundled with their licence files; no GPL/AGPL/LGPL dependency anywhere; a licence check runs in CI.
* **Our licence**: to be decided by the owner (owner-gated); the code is written so that no dependency constrains that choice.

---

## §19 Alternatives for each hard-to-reverse decision (at least two, with the reason for rejection)

| decision | chosen | alternative A (rejected because) | alternative B (rejected because) |
|---|---|---|---|
| spatial truth model | half-edge DCEL per layer, faces first-class, every feature a typed edge chain | polygon soup per feature (VG/NG): seams, planarity and faces re-derived per edit; FTG's duplicate-junction bug class | quad-dominant base mesh with painted attributes (Urban Places): area-filler, construction unrecovered, third architecture without parity evidence |
| numeric policy | int32 cm + exact predicates + snap rounding; float64 transient; no transcendental functions in model code | float64 with epsilon tolerances (2017/MFCG): parameter-space tolerances, NaN circumcentres, non-determinism across engines (`os-geometry.md` §4) | exact rational / big-integer arithmetic everywhere: 10–100× slower, breaks the sub-second one-click budget; not needed at cm resolution |
| RNG / stream design | xoshiro128\*\* sub-streams keyed by hash(seed, stage, entity, concern, attempt, epoch) | one global stream with save/restore (MFCG): any new feature reshuffles every map; locality impossible | counter-based RNG (Philox) with keyed draws: elegant, but 64-bit arithmetic in JS needs BigInt or emulation and the per-draw cost is higher; keyed sub-streams give the same locality at native speed |
| stack | TypeScript core, Web Worker generation, Canvas2D + SVG (+ WebGL2 later) | Rust → Wasm core + TS UI: better numerics and speed, but two languages, slower design iteration and a wasm boundary in every debug loop; kept as an optional per-module hot path behind the kernel interface | three.js/WebGL-first renderer (FTG): textures and lighting are one style; the ink look and SVG export are harder, and the embed bundle heavier |
| display-list design | flat, layered mark list per LOD band with semantic keys; style = data (paint programs); retained tiles built by the back end | immediate-mode drawing per back end (MFCG's "implemented two times"): screen/SVG drift, no LOD, no caching contract | full retained scene graph with per-object nodes: heavier, invites per-primitive caching (NG's 528 uploads) instead of per-group tiles |
| canonical document | native JSON + binary twin; exports as views | GeoJSON as the canonical model (MFCG's first attempt): "awkward", no topology, no ids for non-geometric entities | protobuf as canonical (FTG): compact but not diffable; kept as the twin |
| 3-D export | glTF (+ OBJ) | CityJSON: semantically richer for GIS, but tooling for VTT/game users is thin; revisit in the host phase (recorded as deferred) | — |
| simulation depth in the base | roster + households + lazy people + schedules + calendar + factions as data; events/relations later | full FTG parity in the first release: content authoring of hundreds of types under clean-room delays the picture; its data model is already in the musts | no simulation (watabou's stance): loses "best of both" and the owner's parity requirement |

---

## §20 Delegated decisions (judgment ledger; each vetoable by the owner)

| id | decision | rationale | to veto |
|---|---|---|---|
| D-1 | int32 centimetre coordinates, world bounded to ± 335 km | exact orient2d in float64; FTG parity; precision tiebreaker | change to mm (halves range) or float64 (loses cross-platform hashes) |
| D-2 | TypeScript-first with a Wasm-swappable kernel interface | one language, browser-first default, fastest tuning loop | mandate Rust core from M1 |
| D-3 | keyed xoshiro128\*\* sub-streams | locality, EVO hook, native speed | Philox/BigInt |
| D-4 | destination-driven staged growth as the backbone, bent-cut infill, frontage-first plots (the fusion) | §1.3 with the measured gates | strike §1.3 (d) and adopt one of the rejected shapes |
| D-5 | flat mark-based display list; paint programs as data; per-district tiles | §9; MFCG's cache evidence | scene graph |
| D-6 | `ink` preset default, `lit` second (owner default adopted); `shaded` reserved for the stage-2 close-up | owner ruling; NG/VG idioms belong to the neighbourhood LOD | make `shaded` a city-LOD preset too |
| D-7 | simulation module depth (J-S adopted): roster/households/lazy people/schedules/calendar/factions in the base; events/relations later | §11 | move events/relations into M2 |
| D-8 | glTF for 3-D; CityJSON deferred | §19 | choose CityJSON |
| D-9 | whole-map restarts = 0 as a hard criterion (J-K adopted) | terrain-first design makes it achievable | relax to a p99 bound |
| D-10 | numeric targets written as bands/thresholds stay placeholders until B-REF fixes them (J-T adopted) | the references give no baseline for them | — |
| D-11 | Poisson k = 30 (references use 50) as the default table value | speed; visually indistinguishable at k ≥ 30 per Bridson | set 50 |
| D-12 | milestone-1 gate list = `docs/IMPROVEMENTS.md` §5.1's list (J-M adopted) with `lit` preset moved to M2 | the ink look proves the picture first | re-cut |
| D-13 | the trivial building builder (inset rectangle/L aligned to the frontage) satisfies the stage-3 interface until stage 3 | owner: stage 3 later; footprints stay identical across LOD | require compositions in M1 |
| D-14 | `docs/confidence/*.md` bodies not re-read (their rulings are in CONFIDENCE.md); os-geometry §1–2 and manor §1/§5–7 not read | reading budget (§0) | a validator re-reads them against §16 |

**Deliberately deferred (documented, not bugs to re-find):** final band numbers (D-10); the boolean library choice (S-1 benchmark); WebGL2 back end and SDF text (M5); CityJSON; the village strategy; sewer/island rule design; evolution engine semantics beyond the hooks; corpus calibration; setting packs; host inputs; our own licence.

---

## Appendix A — sections read in full (for the "must have read the source section" rule)

`_critic.md` all; `_critic-ftg.md` all; `_critic-os.md` all; `_critic-vg-ng.md` all; `docs/CONFIDENCE.md` all; `docs/IMPROVEMENTS.md` §0–§5, §7 (O1–O19, S1–S6, V1–V3, §4 R1–R16, §5.1–5.5, §7.1–7.4); `visual-spec.md` all (§0–§8); `os-geometry.md` §4, §5, §6; `manor.md` §2.1–2.10, §3.1–3.3, §4.1–4.4, §8, §9; `watabou-extra-b.md` T4, T5, T6, T23, T24, T25, T26, T27; `watabou-extra-a.md` §2.1, §2.2; `profile-mfcg.md` §3.1, §3.2, §6.2, §6.3, §6.4, §6.5, §7.1, §8, §10.5; `profile-neighbourhood.md` §3.6, §3.7, §4.3, §5.1–5.4; `ftg-docs-params.md` §2.2, §2.3, §2.4, §2.5, §2.6, §2.7, §2.8, §2.9, §3.3; `ftg-payload-visual.md` §7.2, §7.3; `mfcg-devlogs-b.md` §2.5, §2.14; `ftg-posts-c.md` §2.18, §2.19, §2.20; `profile-village.md` §6, §7.1, §7.2. Section outlines of every other findings file and of `docs/confidence/{mfcg,vg,ng,ftg}.md`. Mechanisms cited from unread sections are cited through the ruled quotations in the critic files, `docs/CONFIDENCE.md` or `docs/IMPROVEMENTS.md`, and are marked with those files' section numbers in the text.

