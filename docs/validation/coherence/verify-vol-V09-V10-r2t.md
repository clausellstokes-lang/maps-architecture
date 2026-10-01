# Verify — volumes V09, V10 after repair round 2 (coherence/verify-vol-V09-V10-r2t)

> PROGRESS: P1 done (brief read whole; round-1 result (17 issues); adjudication-r2 R2-02, R2-05–R2-11, R2-21–R2-23, R2-30–R2-42 and Part H · V09, V10, rendering read; repair-r2-V09/V10 headers; assemble-r2: live V09 23398a30…, V10 6efb987b… = its after shas; pre-r2 = git d49a590 (c2dc5b80…, f8f591b3…)). P2 started: re-check round-1 findings on live. Next: P3 read round-2 blocks whole.

Seat: opus verifier (stand-in), PENDING FABLE REVIEW. Design files untouched.

## P1 Inputs

* Live: `docs/volumes/V09-application.md` sha256 `23398a30…` (4 905 lines), `docs/volumes/V10-clerk.md` `6efb987b…` (3 507 lines) — assemble-r2's after hashes; base `docs/ARCHITECTURE.md` `4ed292e9…`, INDEX `1774db18…`.
* Before round 2: git `d49a590` (V09 `c2dc5b80…`, V10 `f8f591b3…`, base `137ecc0e…`), assemble-r2's before hashes.
* Round-1 findings: `results/coherence_verify-vol-V09-V10-r1t.json` (17 issues). Rulings: adjudication-r2 (R2-02, R2-05 – R2-11, R2-21 – R2-23, R2-30 – R2-42; Part H · V09, V10, rendering). Repairs: `repair-r2-V09.md` (52 REPLACE), `repair-r2-V10.md` (28 REPLACE); `assemble-r2.md` (all applied, 0 skipped; title blocks set per R2-07).

## P2 Round-1 findings re-checked

## P3 Round-2 blocks in scope read whole

## P4 Owner items 114–126 (parts in V09, V10)

## P5 Mechanical checks

## Issues
