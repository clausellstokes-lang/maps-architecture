# verify-rendering-r4t — base §8, §9, §11, §12 after repair round 4

> Lane `coherence/verify-rendering-r4t` (opus verifier). Base `docs/ARCHITECTURE.md` sha256 5f34cceb… (assemble-r4's output;
> before the round 593c657d…), rationale a480f02e… (before e7b59eac…). Scratch: `scratchpad/coherence/vr4/`.

PROGRESS
- P0 brief read whole; RESUME/CONTINUE check (no output, no LANDED): done
- P1 inputs: verify-rendering-r3t (9 findings), adjudication-r4 (R4-01, R4-02, R4-04, R4-05, R4-06, R4-10, R4-12; Part H ·
  rendering, scope, model, V08, V09 with the END lines closing my findings' second ends), repair-r4-rendering's header,
  assemble-r4 (only rendering's 16 blocks touch §8, §9, §11, §12): done
- P2 the 14 replaced subsections' word diffs read whole, pre → live (only rendering's blocks touch §8, §9, §11, §12): done
- P3 round-3 findings re-checked against the live text, each END line's second end included: done (9/9 FIXED; notes in §2)
- P4 receipts, doc checks, references, terms, review ids, deferral: pending
- P5 new findings, report, result, LANDED: pending
