# Sites, roads and autocorrect — the owner's word of 2026-10-18 and its design (J393)

**Status: APPLIED (2026-10-18).** Draft t became `docs/AMENDMENTS-2026-10-18t.md` (items 940–948, 138 fragments),
applied by lanes `sites-roads/apply-t-*` under J394 (Opus applied and confirmed) after J397 (the draft landed, its Fable
critique PASS-WITH-CORRECTIONS, all twelve corrections taken) and J398 (the owner's "Yes" on Q5: "the catalogue" is V14
§2.5's site kind rows). Eight targets, no adjustment; `docs/ARCHITECTURE-FULL.md` regenerated, `--check` exit 0. The
record is `apply-t-record.md`, with the eight target lanes' records `apply-t-v13.md`, `apply-t-v14.md`,
`apply-t-index.md`, `apply-t-summary.md`, `apply-t-base.md`, `apply-t-gate.md`, `apply-t-brief.md`, `apply-t-readme.md`.
The text below is the run's opening reading, kept as written.

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
`draft-t.fragments.json` (the synthesis); `critic.md`, `critic-2.md`; `verify.md`, `verify-2.md`; `fix.md`; the apply
records `apply-t-*.md` and `apply-t-record.md`; `STATUS.md`. The applied file: `docs/AMENDMENTS-2026-10-18t.md`. Lanes `sites-roads/*` in
`docs/lane-events.log`.
