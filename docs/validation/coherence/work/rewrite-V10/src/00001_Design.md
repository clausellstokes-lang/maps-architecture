# Design volume 10 — The AI clerk: reading, explaining, authoring and critiquing through the tool vocabulary

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/V10-clerk; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — revised by opus standing in for the Fable seat volumes/revise-V10; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V10-r1; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V10-r2; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V10-r3; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V10-r4; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V10-r5; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V10-r6; covered by the whole-design retrovalidation (J84).

> Revision note (revise-V10, 2026-09-28). Revised in place against `docs/volumes/critique/V10.md` (49 findings: 3
> blockers, 21 majors, 25 minors; its C10-10 folded for the owner's ~20:05 switch, J111: "switch it then, cathedral also
> gets crypts but cemetaries get catacombs"). A withheld place's purpose no longer reaches the model through any type
> (C10-01); caves and ruins nobody in town has found are absent below a `secret` key (C10-02); the reply's claims are
> checked against what the tools returned (C10-03); the assistant's settings are the device's and the map's own
> vocabulary reaches the model only as data (C10-04); item 109's explanations — ruins, ways down, sealed voids, catacombs
> under cemeteries only and crypts under churches, the cathedral's always the largest — are built (C10-10). Every change
> is listed against its finding in the disposition table appended to the critique. Decisions J-V10.38 on, tests T-V10-29
> on and change requests BCR-V10-13 on are the revision's; cross-volume requests are CVR-V10-n (section 10.2).

> Item-110 fold (revise-V10, 2026-09-29, step R5b). The critique's addendum (its section 11: C10-50 – C10-65, 2 blockers,
> 7 majors, 7 minors), written for the owner's ~23:30 "they go in" and ~23:40 "i think raised ways for cities is fair for
> the genertor to generate adn then a user can decide to add or remove", is folded into sections 0–6 before sections 7–13
> were revised: the clerk removes what the user asks it to remove (T10 `hold` gains `delete`, BCR-V10-20), declares
> retaining walls, terraces, raised ways, aqueducts, an islet, deck slots, stepped tiers and span uses, explains every
> raised way's recorded reason and every absence ("why is there no viaduct here?"), shows what else a change does before
> anything applies, and never builds or removes such a thing unasked. Decisions J-V10.72 on, tests T-V10-38 on, requests
> BCR-V10-20 on and CVR-V10-7 on are this fold's. The study-only reference city of item 110's preamble is named nowhere
> in this volume or its test files (C10-65).

**PROGRESS** (one line per section; kill-safe ledger — a resumed run continues from the first `planned`):
- 0 In plain words — done
- 1 Scope, base hooks, out of scope — done
- 1b Wiring table — done
- 2 Data model — done
- 3 Generation (the clerk's runtime) — done
- 4 Editing — done
- 5 Rendering, labels, exports — done
- 6 Performance budgets — done
- 7 Tests and acceptance bars — done
- 8 Build plan — done
- 9 Decisions — done
- 10 Base change requests — done
- 11 Owner questions — done
- 12 CONFIRMED versus PLAUSIBLE — done
- 13 Fix list — done (nothing deferred)

**REVISION LEDGER** (revise-V10; one line per step: planned | done):
- R0 header, ledger, backup (scratchpad/volumes/revise-v10/V10-pre-revision.md) — done
- R1 §0, §1, §1b (wiring, dossier traces) — done
- R2 §2 data model (ops/content split, the knowledge-safe types, sections, new reads, the harness interface) — done
- R3 §3.1–§3.9 (turn loop, fallbacks, request, prompt, tools, reads, oracle, providers) — done
- R4 §3.10–§3.22 (critique rows K15–K17, proposals and placeholders, the guard, the claims check, host seam, meter, failures) — done
- R5 §4–§6 (encoders, acceptance, budgets per rung, cost formula) — done
- R5b item 110 fold (C10-50 – C10-65) across §0–§6 — done
- R6 §7–§8 (tests, evaluation groups, build plan, S1 fallback; item 110's bars, shift and estimates) — done
- R7 §9 decisions, §10 change requests and cross-volume requests — done
- R8 §11–§13, disposition table on the critique, checks — done

**RECONCILIATION LEDGER** (reconcile-V10-r1, 2026-09-29, against `docs/volumes/critique/seam-surfaces-r0.md`: SS-09,
SS-10, SS-12, SS-14, SS-17 majors; SS-18 – SS-21, SS-24 – SS-27 minors; one line per step: planned | done):
- RC1 every seam edit in §0–§13 and the integration note IN-V10-1 — done
- RC2 the "Reconciliation round 1" note, reference checks, LANDED line — done

**RECONCILIATION LEDGER, ROUND 2** (reconcile-V10-r2, 2026-09-29, against `docs/volumes/critique/seam-surfaces-r1.md`:
SR-01, SR-07, SR-11 majors; SR-17 – SR-21 minors; and `docs/volumes/critique/seam-time-r1.md`: TR-25 minor; one line
per step: planned | done):
- R2-1 every seam edit in §1–§13 — done
- R2-2 the "Reconciliation round 2" note, reference checks, LANDED line — done

**RECONCILIATION LEDGER, ROUND 3** (reconcile-V10-r3, 2026-09-29, against `docs/volumes/critique/seam-surfaces-r2.md`:
SR2-08, SR2-10 majors; SR2-05, SR2-12, SR2-17 minors; one line per step: planned | done):
- R3-1 every seam edit in §1b–§13 — done
- R3-2 the "Reconciliation round 3" note, reference checks, LANDED line — done

**RECONCILIATION LEDGER, ROUND 4** (reconcile-V10-r4, 2026-09-29, against `docs/volumes/critique/seam-surfaces-r3.md`:
SR3-07 minor, parts (a) – (e); one line per step: planned | done):
- R4-1 SR3-07 (a) §12, (b) CVR-V10-7, (c) `ClerkTranscript.key`, (e) T-V10-7 — done
- R4-2 SR3-07 (d) §3.16's slot clause, after V09's round 4 lands SR3-04 — done
- R4-3 the "Reconciliation round 4" note, reference checks, LANDED line — done

**RECONCILIATION LEDGER, ROUND 2, SECOND BRIEF** (reconcile-V10-r2, 2026-09-29, against the continuation of
`docs/volumes/critique/seam-surfaces-r1.md`: SR-26, SR-28 majors; SR-31, SR-33 minors; and TR-25 of `seam-time-r1.md`,
landed 05:03 and verified only; one line per step: planned | done):
- R2b-1 every seam edit in §1b–§13 and IN-V10-1 — done
- R2b-2 the "Reconciliation round 2, second brief" note, reference checks, LANDED line — done

**RECONCILIATION LEDGER, ROUND 3, SECOND BRIEF** (reconcile-V10-r3, 2026-09-29, against the continuation of
`docs/volumes/critique/seam-surfaces-r2.md`: SR2-22 major; SR2-25 minor, parts (a) – (d); one line per step: planned |
done):
- R3b-1 every seam edit in §1b–§13 — done
- R3b-2 the "Reconciliation round 3, second brief" note, reference checks, LANDED line — done

**RECONCILIATION LEDGER, ROUND 4, SECOND BRIEF** (reconcile-V10-r4, 2026-09-29, against the continuation of
`docs/volumes/critique/seam-surfaces-r3.md`: SR3-14 minor, parts (a) – (c); one line per step: planned | done):
- R4b-1 every seam edit in §1b.1, §2.6, §3.5, §3.16, §5.4, T-V10-4, J-V10.98, J-V10.100, §12 and §13 — done
- R4b-2 the "Reconciliation round 4, second brief" note, reference checks, LANDED line — done

**RECONCILIATION LEDGER, ROUND 5** (reconcile-V10-r5, 2026-09-29, against `docs/volumes/critique/seam-surfaces-r4.md`:
SR4-01, SR4-02, SR4-03 majors; SR4-04 minor, parts (a) – (e); one line per step: planned | done):
- R5-1 SR4-01 the `why` action kind, the four-class button mapping, `useTool.tool` narrowed — done
- R5-2 SR4-02 required labels and the `clerk.alt.*` family — done
- R5-3 SR4-03 the action form and its grounding step, the what-if rule, cassettes — done
- R5-4 SR4-04 (a) – (e) — done
- R5-5 the "Reconciliation round 5" note, reference checks, LANDED line — done

**RECONCILIATION LEDGER, ROUND 6** (reconcile-V10-r6, 2026-09-29, against `docs/volumes/critique/seam-surfaces-r5.md`:
SR5-02, SR5-03, SR5-05 majors; SR5-06 minor, parts (a) – (e); one line per step: planned | done):
- R6-1 SR5-02 `useTool`'s `mode` and `ids`, moves as selections, the dossier forms' address, `refusals.actions`' payload — done
- R6-2 SR5-03 the what-if answer: the fork alone — done
- R6-3 SR5-05 one host answer, when the card closes — done
- R6-4 SR5-06 (a) – (e): the buttons read from V9's `MsgRow.buttons`, step 1, step 4's closing, the bends paragraph, §8 — done
- R6-5 decisions, CVR-V10-20, §12, §13, the "Reconciliation round 6" note, reference checks, LANDED line — done

**How to read this volume.** It builds, to implementation depth, the subject the base (`docs/ARCHITECTURE.md`) carries at
hook depth: the built-in clerk of item 101 (d), which the base stages "after the API" (*Staged by the owner's roadmap*,
the authoring toolkit's row), together with the parts of the tool API that the base names and never types — the oracle's
answer, the reader's map brief, the solver's explanation — and the host clerk seam. The implementer holds the base and
this volume and nothing else (§17.1). Every fact the base already states is cited by its section and never restated;
every new fact is stated once, here. Where the base must change, section 10 files a base change request (BCR-V10-n) and
the volume is written as if it were applied. Decisions are `J-V10.n` (section 9), tests `T-V10-n` (section 7).
Section references without a prefix (§7.1, §11.2) are the base's; `V10 §n` is this volume's; `V0n §x` another
volume's. Item numbers are the owner's amendment items (files c, d, e and g); the g items' base mechanisms are applied
to the base by the coherence pass and are cited here by item, never restated.

