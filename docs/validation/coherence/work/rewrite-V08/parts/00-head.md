# Design volume 8 — The SettlementForge stage: connecting the map to the host end to end

> PENDING FABLE REVIEW — written by opus stand-ins for the Fable seat (volumes/V8-settlementforge, its revision, reconciliation and coherence lanes); covered by the whole-design retrovalidation (J84).

**How to read this volume.** It builds, to implementation depth, the base's staged SettlementForge row: the base is
`docs/ARCHITECTURE.md` with files f and g applied (`docs/AMENDMENTS-2026-09-28f.md`, `docs/AMENDMENTS-2026-09-28g.md`).
The implementer holds the base and this volume and nothing else (§17.1). Every fact the base or another volume states is
cited, never restated; every new fact is stated once, here. **Citations:** a bare `§n` or `II.n` is the base's; `Vnn §n`
is a design volume's section, this one included (`V08 §3.5`); `item n` is an amendment item — items 1–113 the owner's,
items 200 and above file f's, each the applied text of a volume's base change request (V08 §10 lists this volume's);
`J-VI.n` is a volumes-integration decision (`docs/volumes/_integrate.md`), cited and never restated; research files are
named by file and section only. SettlementForge (SF) field names and values are quoted freely — the owner's own project
(amendments d, gate 2); no SettlementForge code is excerpted and nothing from its map programs or map designs is used.
Decisions are `J-V8.n` (V08 §9), tests `T-V8-n` (V08 §7), the wiring rows `W1…` (V08 §1b), the failure rows `B1…`
(V08 §3.9), the release rows `R1…` (V08 §8.3). Where SettlementForge has already decided a product matter — hosting and
web origin, accounts, plans, save limits and backups, interface languages, the AI key or relay, the assistant and its model
tier — the design reads that decision as an input and never re-decides it (J121).
