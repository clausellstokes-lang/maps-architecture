# Staged by the owner's roadmap (this document defers nothing)

The owner ruled on 2026-09-25: "I would prefer if there is no defer and everything is fixed as soon as possible." This
document defers nothing: every former deferral — the numeric targets, the boolean library, the skeleton, the dd2vtt
profile, CityJSON, SDF text, setting packs, host inputs, a sync service, a WASM kernel, the owner's licence and the
worker pools — is a decision in the body, with its confirming measurement and pre-decided fallback where only an
experiment can confirm it (the entry-by-entry record is `docs/ARCHITECTURE-VALIDATION.md`). This is the one list of
subjects the owner's roadmap places after the base: stage 2 is built in this program at M5 (§16); the others are staged
by the owner. For each, the base carries concrete hooks now, in the sections named; they are staged by the owner, not
deferred (documented, not bugs to re-find).

| subject (the owner's roadmap stage) | the hooks the base carries now | where |
|---|---|---|
| stage 2 — neighbourhood composition (built in this program at M5, after the base) | `SeamContract` on every district from M1; one shared `Seam` record per boundary run with its `baseLane` portals and the seam exception to locality; every seam edge typed, a way-less reservation boundary two districts share as `reserve`; II.1 (3)'s neighbour step, one `corridor_split` edge in a finished neighbour's strip, reversed exactly by demotion whatever edit removes the street (§2.2 rule 3); the `FabricStrategy` slot; the neighbourhood band; the `hatched` programs | PART II, §3.7, §4.6, §4.12, §7.3 |
| stage 3 — manor-style building compositions (after stage 2) | `BuildingGenerator.outline` / `compose` with a cost contract (the base outline inside S11's geometry share; a stage-3 `outline()` admitted at ≤ 10 µs with a declared re-budget); wings (`BaseWing.kind` `rect` / `quad` / `polygon`, a `quad` wing's recorded `corners`, `BuildingInput.fixedWings`), `carryWings`, which keeps every stored wing, and a stored composition's rings and tower centres, on its footprint through every move — the union test a stage-3 `compose()` must pass, run at the stage-3 intake on stored compositions — and heights in the base; the stage-3 intake measurement | §2.6, §3.7, §8.6 |
| the village product (after the town / city) | stages ordered by declared I/O; `EnceinteStrategy` and the enceinte input of every network strategy; tracker-network and houses-along-ways registrations; a village as one district; the ladder rows and the 1 500 boundary; the not-precluded checks of §15.1's VILLAGE-LATER rows | PART III, §1.1, §1.6, §4.12, §15.1, D-33 |
| sewers and floating islands (toggles, after the city is mastered) | one arena per layer and per sky island; `LayerSpec`; drainage queryable per cell over frame and margin; `SkyIsland` and `Tunnel` records (the tunnel's invert as a knot profile); the sky pseudo-districts' allocations created by S7b before any island exists; `SkyStrategy`, `IslandRule` and `SewerStrategy` registrations; the sky close-up call; shadows onto the ground layer | II.6, §2.1, §2.3, §2.7, §4.5, §8.4 |
| the evolution engine (much later) | epoch events and key components; `EpochInputs`, `EvolutionStrategy`; the `ConversionOp` kinds, decline included; the one built growth path, whose epochs use the crossing sites generation left unused | §4.11, §1.5, D-25 |
| calibration against the historical corpus (after the standalone generators) | `CorpusAdapter`; corpus rows in `baselines.json`; `CalibrationRun` as table-version bumps with declared shifts; provenance on every table cell | §13.9, §7.6 |
| SettlementForge inputs (after the generators are mastered) | the host-input contract and the host bridge | §11.4, §11.3 |
