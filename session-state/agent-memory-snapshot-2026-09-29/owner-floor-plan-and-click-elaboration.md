---
name: owner-floor-plan-and-click-elaboration
description: Owner directive 2026-09-26 — Dwellings-style floor plans as a further building rung; elaboration by click per level; content kept and marked stale until clicked; recorded as amendment 28
metadata:
  type: project
---

Owner (2026-09-26 evening): clicking a building from the neighbourhood view opens a coherent floor plan built from the manor-view geometry, heights and pieces, tailored to the building's type and function (reference: watabou's Dwellings, https://watabou.itch.io/dwellings). Generation order the owner imagines: city view first with neighbourhoods as plots; a neighbourhood click generates its buildings (then saved); plots may be pre-assigned an institution or building without being generated; a building click generates its plan; generated content stays visible when zoomed out until the simulator changes something, which marks it so the user clicks at their own pace.

**Why:** it is the owner's product picture for how the layers fit together and for load management; it fits the architecture's existing laziness contract (§4.1), lazy stage-3 compose (outline → wings → rooms, §2.6) and lineage-keyed streams, so it is a trigger policy plus one new rung, not a redesign.

**How to apply:** recorded verbatim as amendment 28 in docs/AMENDMENTS-2026-09-25b.md with the program's vetoable interpretation (J33 in docs/PROGRESS.md); workflows/09-amendments-b.js must run with items '8-28'. Keep footprints eager at city zoom (reference parity); make 'click' versus 'view' a setting with click as the owner's default; stale-marking over derivation records, re-derivation as mutation. Dwellings' known limits (partition-then-label, no guaranteed rooms, no inns yet) are the exceed target: function-first room programs. Clean-room: ideas only. See [[maps-project-state]], [[settlementforge-map-program-link]].
