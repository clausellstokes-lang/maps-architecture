---
name: agent-model-tiers-directive
description: "Owner directive on subagent models for the Maps program — Fable manages/judges/architects/validates, Opus verifies/scouts/implements/surveys under Fable"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 3fbc58a0-613c-43b5-9c94-a4f47a8689a6
  modified: 2026-09-25T09:26:51.345Z
---

For multi-agent work in the Maps project the owner said (2026-09-21) "use opus to read them but fable critics", and widened it on 2026-09-25: **"fable as manager, judgement, architect, and validator. Opus as verifier, recon, implementer, and surveyor as managed by fable."**

Mapping used in `workflows/03-assess-design-validate.js` (2026-09-25): Fable = the orchestrating session, confidence assessors, skeptics, report synthesisers, architects, judges, chief architect, red-team lenses, reviser. Opus = weakness miners, coverage auditors, post-revision verifiers, capture/post readers, and (in later phases) implementers.

**Why:** matches the owner's global rule of staffing by judgment density: rulings and design on the strongest model; reading, measuring, verifying and building on the builder tier.
**How to apply:** set `model` per agent() call in Workflow scripts and per Agent call; never default every seat to the session model; when a new seat type appears, classify it by this list before spawning. See [[maps-project-state]], [[record-state-at-spawn-time]].

**Refinement (owner, 2026-10-17 ~23:45Z; J390):** "from now on, please use the appropriate combination of model and effort per model on tasks." Supersedes J375's blanket "opus 5.5 for the rest" (2026-10-17). Staff every seat by judgment density, model AND effort: Fable 5.1 high/xhigh for the managing seat, rulings, architecture, design critique and validation verdicts; Opus 5.5 high for builds, fix rounds, closing checks' mutants and census, independent verifiers and research synthesis, medium for confirm-only re-checks and bounded readers; Sonnet 5.5 medium/low for mechanical lanes (resumes from disk, brief rendering, censuses, log extraction, formatting, tool runs a test decides); Haiku 5.5 low for trivial lookups and no-judgment edits. Effort follows the judgment in the seat, not the run's length. J375's retrovalidation notice stays only on files no Fable seat managed or validated.


## Budget clause (owner, 2026-10-18 ~09:05Z; J394)

With a quarter of the Fable allowance left the owner ruled: confirmation re-checks on Opus ("just as good of quality"), Fable only for critique. Applied: confirms, fixes, close-gaps, readers, verifiers on Opus; when Fable is scarce, designers/judges/synthesis on Opus too, with ONE Fable/xhigh critic (and a Fable/high second look at closed gaps) closing the run; Opus records in a Fable seat carry the J394 line and the lane suffix "(opus; J394, Fable-critiqued)". Why: the five-hour kills of 2026-10-18 (01:25Z, 05:58Z) and the allowance; the J390 tiering stands otherwise.
