---
name: sf-dossier-port-plan
description: 2026-09-27 dossier survey outcome — the SettlementForge baseline is fp/integration-2026-09-23 @ 5d699cc68 (the on-disk working tree is stale); the dossier port design lives in research/sf/PLAN.md with candidate amendments 73–88 in docs/AMENDMENTS-2026-09-27d.md; dossier fixtures go under plat/tests/fixtures/dossier/, never research/ or captures/
metadata:
  type: project
---

**Facts that hold (CONFIRMED 2026-09-27):** SettlementForge's dossier is one JSON file of 41 top-level keys; institutions
are name-keyed kinds with count ranges and no id (0 of 5 846 records; 11.9 % lack a `catalogId`); power factions are
name-keyed; no coordinate, street, wall, plot, household or class exists in it; the quarter list is a generation-time name
test never updated; one simulator tick = one week (`calendar.elapsedWeeks`); changes arrive as whole dossiers with partial
receipts; the same seed gives a different settlement on the deployed `master` and on `fp/integration-2026-09-23` at the
same `generatorVersion`. Sources: research/sf/dossier-{model,generation,outputs,seam}.md, mapping.md, mapping-verify.md
(53 CONFIRMED, 18 CORRECTED, 0 REJECTED).

**Design decisions of the plan seat (research/sf/PLAN.md §7, vetoable):** one package `@plat/port` with SettlementForge
shapes confined to `adapters/sf/<line>/` and a neutral `DossierDigest`; the creation half at M1 (test-side, B-DOSSIER-lite
bench), the absorb half at M3a, host wiring at the SettlementForge stage; a binding table (`cat:` → `uid:` → `name:` + `#k`)
with class read apart from identity; item 72's inputs as three typed circumstance slices (`economy`, `trade`, `powers`) —
no `Faction` materialisation in the base; the week = SF's week, epochs yearly or on a 5 % population move, and a rejection
lapses only past that same 5 % (V72); a SettlementForge undo is a forward change (no rewind); a sub-floor dossier (< 1 500)
is refused by the port (owner Q3 to confirm).

**Why it matters:** the next session that touches the SettlementForge connection must start from PLAN.md and the
amendments file, not re-survey; the build order (M-1, M0, M1) is unchanged by design.
**How to apply:** read research/sf/PLAN.md §2 before writing any port code or any dossier fixture; cut fixtures only from
the branch scratch runs (`scratchpad/sf/outputs/r2/gen`, `tick`, `gen-rebase`), re-cut if the owner names another line
(owner Q1 in PLAN.md §6); never read SettlementForge's map programs; never write into settlement-engine. Owner decisions
pending: PLAN.md §6 (six). See [[settlementforge-map-program-link]] and [[maps-project-state]].

**Owner decisions ruled 2026-09-28 (delegated; J86, Opus 5.5 manager — pending Fable review):** O3 — the port binds first to `fp/integration-2026-09-23` @ `5d699cc68` (a later shipping line = one adapter folder + re-cut fixtures); O4 — door 1 stays CLOSED: SettlementForge's simulator never reads the map's geometry unless the owner explicitly opens it, and then only as a canonical export from seed + dossier history with no user edits. Q3–Q6 were ruled as J80. No owner decision on the dossier port remains open.

