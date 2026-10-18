# Sites, roads and autocorrect — the owner's word of 2026-10-18 and its design (J393)

**The owner's words (2026-10-18 ~05:05Z, verbatim):** "make sure that sites have road access where appropriate, they are
integrated into road infrastructure and that depending on the catalogue, where appropriate, their geography in the world
map autocorrects to meet the coherence expectation."

**The session's reading (to be stated and, where it could differ, flagged for the owner by the designers).** "The
catalogue" is V14 §2.5's site kind rows (`tables/sites/kinds`, with their `attraction` and `routed` columns). "Road
access where appropriate" is a per-kind access class. "Integrated into road infrastructure" means V13 §3.8 W7's seats
and legs, the frame charter's roads, the travel law, patrols, the lenses and the encounter crop all read the same
roads, on a standalone and on a host-bound world. "Autocorrects to meet the coherence expectation" is the site analogue
of V13 §3.11's placement coherence (`CoherenceCost`, `nearestLawful`, `PlacementAnomaly`, `moveTown`, `worldWins`)
made catalogue-dependent.

**What exists today.** V14 §3.4 (d): a `routed` site is a W7 seat and `attraction` feeds W6's destination term. V13
§3.8 (1), (5), (11): sites are seats on a standalone world; on a host-bound world a site is a position along a route,
never an end. V13 §3.11: coherence cost and anomalies for every placement, a site's included. The `SuitabilityTerm`
plug-ins `routeNear` and `roadControl`; the `PlacementAnomaly` kinds `roadToNowhere` and `roadUnmatched`.

**The plan.** The workflow `sites-roads-design` (J390 staffing) reads, designs from three angles, judges, synthesizes a
DRAFT amendments file t (`draft-t.md`, `draft-t.fragments.json`), critiques it and verifies every fragment's current
text. Nothing is applied by it: file t is numbered after file s (the retrovalidation's design corrections, from 927)
and applied only after J392 lands, so the two never edit V13 and V14 at once. The owner's open choices stand in the
draft's owner-questions table with recommendations.

**Files.** `read-v14.md`, `read-v13.md`, `read-base.md`, `read-research.md`, `read-checks.md` (the readers);
`design-A.md`, `design-B.md`, `design-C.md` (the designers); `judge-1.md` … `judge-3.md`; `draft-t.md` and
`draft-t.fragments.json` (the synthesis); `critic.md`; `verify.md`; `STATUS.md`. Lanes `sites-roads/*` in
`docs/lane-events.log`.
