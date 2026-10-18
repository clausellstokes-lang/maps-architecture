# Town-generator research program — live plan

> **Progress (update in place).** 2026-09-21: Phase 0–2 done; Phase 3 (exhaustive read) running as workflow
> `understand-town-generators` (run `wf_540a13c5-98e`; 19 Opus readers + Fable completeness critic → `research/findings/`).
> Phases 4–6 not started — **owner will start them at a later date (2026-09-21); see `docs/HANDOFF.md`.**

Goal (owner, 2026-09-21): a comprehensive, adversarially validated ORIGINAL architecture for a procedural settlement
generator that can stand next to MFCG, Village Generator, Neighbourhood (watabou) and Fantasy Town Generator (Thomas
Allerton) — plus an honest confidence figure for re-deriving their behaviour from posts, the 2017 open-source ancestor,
and recordings of the live generators.

| # | Phase | State | Output |
|---|---|---|---|
| 0 | Archive sources (Patreon ×88, devlogs ×73, FTG guide ×36, TownGeneratorOS, FTG Foundry module) | done | `research/`, `reference/` |
| 1 | Build the generation profiler | done, verified on all 4 targets | `profiler/` (README there) |
| 2 | Record MFCG / VG / NG (profile, coverage, draw) and FTG (one-shot payload, scene-build profile, visuals) | done | `captures/`, `research/ftg-capture/` |
| 3 | Exhaustive read → per-slice findings + completeness critic | running | `research/findings/*.md`, `_critic.md` |
| 4 | Reproduction-confidence assessment, adversarially challenged (Fable skeptics) | pending | `docs/CONFIDENCE.md` |
| 4b | Weakness ledger per reference (creator-admitted limits, user complaints, observed retries/failures, perf, visual + data-model limits) → improvement opportunities | pending | `docs/IMPROVEMENTS.md` |
| 5 | Architecture: competing designs that reach parity AND improve on the references → Fable judge panel → synthesis | pending | `docs/ARCHITECTURE.md` |
| 6 | Adversarial validation of the architecture against every recorded capability of the 4 references | pending | `docs/ARCHITECTURE-VALIDATION.md` |

## Product scope (owner, 2026-09-25)
1. **Base, built first:** one general town/city generator — "MFCG/FTG using the best of both and your own improvements";
   size ladder town → city → metropolis (the village product's ladder is thorp → hamlet → village).
2. **Next:** the same town/city composed of individual neighbourhoods (each district an NG-class close-up on the base).
3. **One level deeper (owner, 2026-09-25):** the individual buildings inside neighbourhoods constructed the way
   watabou's Fantasy Manor generator builds a manor (wings/blocks, roofs, courtyards, outbuildings fitted to the lot),
   with those footprint shapes visible at every zoom including the city view — with DIVERSITY "from a giant manor to a
   small hovel" and explicit rules that decide each plot's building class (plot size and shape, street importance,
   district type and wealth, distance to centre/market/gate/water, who lives or works there). Fantasy Manor must first
   get its own archive + recording + reading round (it is not in the evidence base yet).
4. **Village:** its own thing for the moment — a separate later product; the base must not preclude it.
The architecture phase (workflow 03) designs the base completely, the neighbourhood stage to interface depth, and only
checks the village is not precluded. The build phase that follows (Opus implementers managed by Fable) starts with the
base's first milestone: a viewable MFCG/FTG-class town.

## Program roadmap (owner, 2026-09-25)
Ultimate purpose: a settlement-map layer module for SettlementForge. Order of work, each step gated by the owner:
1. **Now — standalone generators "according to the best of the competition":** the town/city base (MFCG/FTG fused +
   own improvements) → the city composed of NG-class neighbourhoods → Fantasy-Manor-style buildings inside them →
   the village (VG-class). No SettlementForge
   input, constraint or reading during these steps (owner veto of 2026-09-21 stands).
2. **Then — reconcile with the historical data and artistic corpus** in `~/Desktop/settlement-engine/map-corpus`:
   what has been built is always the BASE; the corpus calibrates, validates and extends it, it does not replace it.
3. **Finally — accept inputs from SettlementForge itself.**
3a. **Plot model (owner, 2026-09-25, BASE requirement):** the shapes MFCG/FTG lay out are PLOTS, not buildings; a plot
   holds 0..n buildings plus a yard; per-plot site-plan rules decide coverage (row houses end to end along the frontage
   with party walls; manors/institutions set back with several disjoint buildings on one plot; hovels one footprint in a
   yard); footprints and yards are drawn, never the plot as a building. PLOT GRANULARITY: wealth and assignment set how
   a block divides — prosperous neighbourhoods join plots (fewer, bigger buildings, yards and courts), poor ones split
   them (more, smaller, little or no yard), institutions join the plots they need, and alleys/back lanes emerge between
   plots.
3a-ii. **Greenery by prosperity (owner, 2026-09-25, base):** trees, greens, parks and artificial landscapes (gardens,
   orchards, avenues) placed by rules reading prosperity and district type; yard planting by plot class.
3a-iii. **Height (owner, 2026-09-25):** every building/wing/tower/roof carries heights (floors, eave, ridge, tower)
   unseen in the top-down view, for a later shadow pass from a sun vector.
3b. **City add-on layers (owner, 2026-09-25), both toggles, after the city generator is mastered:** (a) a SEWER system
   under the city derived from the built city by medieval-appropriate rules consistent with the above-ground planning
   (follows streets or not — rules to be designed; presets: historically restrained default, navigable fantasy tunnels);
   (b) FLOATING ISLANDS — one to three organic oval landmasses in the sky, each one neighbourhood or a collection of
   neighbourhoods (needs the stage-2 neighbourhood generator); no relation to sewers; may carry their own terrain
   echoing the ground (a conjured river); purpose = a very prosperous quarter or a unique institution (palace,
   cathedral, prison); islands exist only with prosperity (magic is a constantly supplied resource; size follows the
   prosperity of the neighbourhood and the city); the underground ages by neglect (cave-ins, decommissioning), never
   by demolition; navigable sewers may carry underground neighbourhoods fronting the tunnels; islands possible only in cities and metropolises and not in every one;
   sewers uncommon in towns, always present in cities/metropolises, none in villages (items 10–15 of
   docs/AMENDMENTS-2026-09-25b.md). Base keeps hooks: layers with z-order/elevation/toggles/
   per-layer export, terrain drainage, neighbourhood generator on an arbitrary outline.
4. **Much later — evolution (owner, 2026-09-25), including DECLINE and regrowth** (growth, regression and growth driven by
   population; ruins, salvage, a shorter new wall ring; see docs/AMENDMENTS-2026-09-25b.md items 8–9): a program that grows or evolves a settlement over decades under
   circumstances (e.g. a wall demolished into a ring road while a newer outer curtain is built). The base keeps the
   hooks: entity lifecycles/versions, an incremental (grow/extend/convert) mode of the pipeline, conversion operations
   as first-class geometry, time-varying circumstances, per-epoch random sub-streams. The evolution must be COHERENT
   and come from the SAME SEED (clarified): the seed defines the original town; the HISTORY is determined by the INPUTS
   (circumstances over time) applied to that town as modifications and variations of the original; each epoch derives
   from the previous state; nothing that survives is re-rolled; every change traces to an event. Known already (owner, 2026-09-25): building ASSIGNMENTS —
   specific names, functions or general shapes that may drift within bounds — for one building, for a whole
   neighbourhood as one assignment (still internally diverse), or for several dispersed buildings across
   neighbourhoods. The base keeps the hooks: stable addressable ids, an assignment input that overrides class rules,
   drift bounds, a placement-solver interface.

**Hardening (owner, 2026-10-05, J202):** "the only way we will ever get a full and completely bug free program is after most of it is all built and everything is singing to each other". During the build an item fixes only fail-safety, anything persisted or locked in, contracts between items and its exit bars; every other finding is a known issue (docs/KNOWN-ISSUES.md) drained by a whole-system hardening pass in M4 once M1–M3b are built, by a pass at the close of each later gating milestone (M5, M6, M-CAL), and fully before M-SF's release (rule N-45). **M0 hardening before M1 (owner, 2026-10-07 ~22:10, J237):** "also make sure you do the hardening phase for m0 before m1" — once M0's flow closes and its milestone whole-suite check passes (timing items M0-t-01/t-02 excluded, J212), an M0 HARDENING PHASE drains every M0 known issue (docs/KNOWN-ISSUES.md rows sourced in M0 and every row of plat/docs/build/checks/M0-*-notes.md) before M1 starts: each row is fixed with an exact precaution, or carried to a named later milestone only when it provably needs that milestone's material (e.g. real towns, M1+ stages), with the reason written in the register. The whole suite re-runs at PR size after the phase. M4's whole-system pass stays. **M0 is the bedrock (owner, 2026-10-07 ~22:20, J238):** "its important that we get m0 right since its the foundation for everything. anything afterwads can carry more risk, but not the bedrock". For M0 the bar is higher than for later milestones: in the hardening phase the default for every M0 KI row is FIX (carry-forward only when it provably needs later-milestone material, each such row named in a carried-forward list and re-checked at M1's first towns); every M0 spike bar runs at FULL STRENGTH on this PC before M0 closes (e.g. M0-c-06's 1000-seed fusion bar, M0-d-09's 100-seed CITY bar), scheduled as overnight runs if needed — only legs that physically need the Mac stay PENDING-MAC; no M0 bar is narrowed, reinterpreted or waived to make progress. Later milestones may carry more risk under N-45 as written.

## Ground rules
- **Improve, not just recreate (owner directive 2026-09-21):** parity with the four references is the floor. Every
  design must state which reference weakness each improvement answers and how the gain would be measured.
- **Completely standalone (owner ruling 2026-09-21, veto of my earlier "standalone but SettlementForge-compatible" call):**
  nothing from the `settlement-engine` repo is an input, a constraint, or a judging criterion. Stack, truth model, RNG,
  testing and output formats are chosen on the merits.
- Clean re-implementation: TownGeneratorOS is GPL-3 and the live builds are proprietary. Algorithms and ideas are
  learned; code is not copied or ported. Readers do not open the captured JS bundles — evidence is the creators' words,
  the open-source ancestor, and recorded behaviour (names, timings, call counts, draw calls, payloads, screenshots).
- Subagent tiers (owner directive): Opus reads, Fable criticises/judges.
- Every technique claim is tagged STATED / SHOWN / INFERRED / NAMED-ONLY with a source id.

## Deliberately deferred — documented, not bugs to re-find
- FTG captures of other sizes/presets (one new settlement per IP per day): only "City, Medieval europe, coastal, river,
  farms, forests, natural area, walled" exists (2026-09-21). More days → more presets (American, Ringed, twisty).
- Mapping FTG protobuf field numbers to names would require reading FTG's client decoder; not done (proprietary).
  Structure + statistics are inferred from the wire data instead.
- MFCG JSON/SVG export capture through the canvas UI menu is not automated; draw-call records cover visuals.
- Patreon post 46041997 ("Desktop versions…") is patron-locked; not algorithmic.
