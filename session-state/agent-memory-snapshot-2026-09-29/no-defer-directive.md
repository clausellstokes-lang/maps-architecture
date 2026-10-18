---
name: no-defer-directive
description: Owner rule (2026-09-25) — no deferrals; every finding is fixed now (or shown invalid), as soon as possible
metadata:
  type: feedback
---

Owner, 2026-09-25, on the architecture review's findings: "I would prefer if there is no defer and everything is fixed as soon as possible."

Applied in the Maps project: every red-team finding (blocker, major AND minor), coverage gap, owner amendment and deferral ends as FIXED (a concrete mechanism in the design) or INVALID (the finding's premise is shown false with checkable evidence). No "TBD", "later", "open", "decide at M0". Where only an experiment can confirm a choice, specify the chosen mechanism now + the confirming measurement + the pre-decided fallback. The only exception is subject matter the owner's own roadmap stages later (neighbourhoods, manor buildings, village, sewers, islands, evolution, corpus calibration, SettlementForge inputs) — those carry concrete hooks now.

**Why:** the owner wants the design complete and actionable, not a backlog of postponed decisions.
**How to apply:** verifiers treat deferral wording as unresolved; implemented by workflows/06-fix-all.js (J21/J22 in docs/PROGRESS.md). Apply the same rule to future reviews and build-phase findings. See [[maps-project-state]], [[fable-review-queue]].

**Refinement (owner, 2026-09-28 ~03:10):** "Might as well get it out the way. And if we need to fix anything [we] just do it down the line." — for the full-depth design volumes (J88): still decide every question now (no TBD), but run one critique and one revision per volume and let minors go on each volume's Fix list rather than looping until dry. Mistakes are corrected by later amendments; nothing stalls on perfection.

**Refinement (owner, 2026-09-28 ~04:30):** "due multiple reconciliation rounds until there is nothing material left" — reconciliation and repair loops run until a FULL SWEEP finds no blocker or major (minors: fixed when cheap, else a fix list); a stall adjudicator writes binding rulings when the material count stops falling; caps exist only against runaway loops and any residue is reported, never dropped (J92; workflows/17-volumes.js seams, workflows/18-coherence.js).

**Refinement (owner, 2026-09-28 ~16:30):** for the Fable retrovalidation of the base and of the final set, the bar is ZERO open issues of any severity — no fix list; repair rounds and full sweeps repeat until a full read of every part finds nothing (J96; workflows/16-retrovalidate.js). Minors are fixed, not parked.

2026-09-29 ~10:20 (J123): owner asked for ZERO findings at the end for each volume and the base; workflows/18-coherence.js now exits only at zero open findings of any severity (fix or adjudicated INVALID, no fix list), with a finding standard so preferences don't count and INVALID rulings stay closed; caps 20 repair / 6 validator rounds, anything left at a cap reported, never hidden.
