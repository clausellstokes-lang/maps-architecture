# Verify round 4 — volumes V07 and V08 — lane coherence/verify-vol-V07-V08-r4t

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/verify-vol-V07-V08-r4t; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V07-V08-r4t`, 2026-10-01)
- P0 brief read whole; inputs located (r3t findings, adjudication-r4 Part H · V07 / V08 and R4-04, -05, -07, -08, -15, -16, repair-r4-V07 / -V08 headers, assemble-r4); live V07 a55c4d08… and V08 4675c05e… equal to assemble-r4's after-hashes; pre-round-4 texts from git 6c640e5^ equal to its before-hashes: done
- P1 the six round-3 findings re-checked in the live text, with their second ends: pending
- P2 the round-4 blocks (V07 4, V08 17) read whole by word diff, subsection by subsection: pending
- P3 ids, references, terms, deferral and narration, sizes, doc_checks: pending
- P4 report, result file, LANDED: pending

## Inputs and method

* Live units: `docs/volumes/V07-village.md` sha256 `a55c4d08…` (605 033 bytes, 4 068 lines) and
  `docs/volumes/V08-settlementforge.md` `4675c05e…` (572 529 bytes, 3 698 lines), equal to assemble-r4's after-hashes; the base
  `5f34ccbe…`. The pre-round-4 texts are git `6c640e5^` (V07 `285e2f6f…`, V08 `bf9fa7be…`, equal to assemble-r4's before-hashes).
* Round-4 blocks in scope: V07 4 REPLACE (## 1b, §4.5, §5.6, ## 7; 7 changed hunks), V08 17 REPLACE (## 1b, §2.2, §2.4, §2.7, §3.5,
  §3.6, §3.9, §3.15 – §3.17, §4.6, §5.4, ## 6, §7.1, §8.2, ## 9, ## 12; 59 changed hunks). Each hunk was read by word diff and
  then in its whole live subsection, with the base and volume texts it cites.
* Binding: adjudication-r4 (R4-01; R4-04, -05, -07, -08, -15, -16; Part H · V07, · V08, · scope), with adjudication-r2 / -r3
  where not superseded by name.

## P1 — the round-3 findings, re-checked in the live text

| id | grade (r4) | disposition (Part H) | verdict | where |
|---|---|---|---|---|
| VV78-r3-01 | major | FIX per R4-15 (d) | FIXED | V08 §2.4 `select`'s refused branch (`'E_UNKNOWN_SHAPE' \| 'E_LINE_UNSUPPORTED'`) and *Selection*; §3.5 steps 1 and 3; B3's detection, B5's cause; T-V8-14's B3 and B5 forcings; J-V8.9, J-V8.134; base §14 port item 2 agrees |
| VV78-r3-02 | major | FIX per R4-15 (b) | FIXED | V08 §2.4's `population` row; §3.5 step 3; §3.17's digest, village and one-input rows; §3.16 (9) (b); J-V8.134; T-V8-49 (f) at a creation and an absorb; base §1.1, §14 port items 3–4 agree |
| VV78-r3-03 | minor | FIX | FIXED | V08 §3.16 (10) names T126-2's and T126-3's clauses |
| VV78-r3-04 | minor | FIX | FIXED | V08 §2.2 `MapSession.setLayer` (event shape equal to base §7.1's `setLayer`), `setView`'s comment, §3.16 (4) and (6) (g), T-V8-61 (b) |
| VV78-r3-05 | minor | FIX per R4-15 | FIXED | base §14: `PortNote.kind` `line_differs`, `field_fallback`'s comment, `DossierDigest.settlement.key` and `seed` comments, port item 2's ONE-WAY SEED, `E_OTHER_SETTLEMENT` (type comment and port item 4); §7.7 item 12's key row (VDC3-03) and item 10's absorb clause agree with V08 §3.5 |
| VV78-r3-06 | minor | FIX | FIXED | V07 §5.6 (2)'s `approachByGate` row, in one pass with VPC-R3-04's `beyondWalls` and `approachRoads` rows and `gatesAndKeep`'s camp land, all agreeing with base §10.2 (d) |

The other round-4 issues V07 and V08 own were also checked in the live text: VAH-r3-09 (with VV910-r3-05), VPC-R3-04 (with
VAL-R3-10), the END of VAT-r3-02 (V07 §4.5, W74, T-V7-69 (e); its far ends at base §11.2's `why` member and *Knowledge*, V10
§2.13's `WhyProvider.explain` opts and V09 §2.7's `WhyCardModel` are written); VAH-r3-04 (with VAT3-r3-05), VAH-r3-05 (every
added DR feed checked against base §7.7's DR input cells — DR1, DR2, DR5, DR6, DR7, DR10, DR17, DR24, DR27, DR32, DR36, DR37 —
all agree), VAH-r3-10, VCS-r3-03, VEL3-r3-02 (V08 §3.5's absorb rule; base §7.7 item 10 agrees), VV56-r2-04 (V08 ## 6's catch-up
batch, T-V8-63, J-V8.137; V06 §6.8 (1), (3), (6) and T-V6-24 read the batch's `b` and `a`), VV1112-r3-03 (with VAH-r3-11), and
V08's four END lines (VAT3-r3-02, VAT3-r3-01, VRC3T-07, VAH-r3-06): all FIXED, with the new problems below.

**Seen and not raised again:** §4.11 *The clock* (4)'s "with the absorb's week itself before the last epoch's" against V08 §3.6
(3), §3.17 and T-V8-49 (g)'s "`W₁` not after `W₀`" — verify-pipeline-r4t's VPC-R4-02 (major, pipeline), whose required change
matches V08's text; nothing further at V08.
