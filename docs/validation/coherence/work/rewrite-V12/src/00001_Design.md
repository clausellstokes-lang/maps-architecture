# Design volume 12 — Calibration, reconciliation and parity measurement: how the built generator is tuned against the references and later the corpus

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/V12-calibration; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/revise-V12; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V12-r1; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V12-r2; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V12-r3; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V12-r4; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V12-r5; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V12-r6; covered by the whole-design retrovalidation (J84).

REVISION PROGRESS (volumes/revise-V12, against `docs/volumes/critique/V12.md`, V12C-01 – V12C-50; one line per round: planned | done)
- R0 header, conventions, receipts (docs/validation/bench/v12_rev_confirm.py, v12_rev_h32.out): done
- R1 §0, §1, §1b: done
- R2 §2 (data model; V12 §2.12 known-city fixtures, V12 §2.13 no-op pins): done
- R3 §3.1 – §3.6b (measurement, crossing, metrics, bands, correlation and tendency harness, bar map): done
- R4 V12 §3.7 – V12 §3.14 (tuning, feature switch-on, no-op pins, sittings, corpus, register, failures, determinism, known-city fixtures): done
- R5 §4 – §6: done
- R6 §7 – §8: done
- R7 §9 – §13: done
- R8 disposition table appended to the critique: done

RECONCILIATION PROGRESS (volumes/reconcile-V12-r1, against `docs/volumes/critique/seam-content-calibration-r0.md`: SCC-03,
-04, -05, -07, -26 major; SCC-15, -24, -27 minor; one line per step: planned | done)
- K1 SCC-03 measurement profile against file f item 447 (V12 §2.2, §3.4.2, T-V12-4, T-V12-38): done
- K2 SCC-04 `servedShare` by the class's coverage unit (V12 §2.7, §3.6, the bar map, §3.12): done
- K3 SCC-05 the `sf:` provenance source (V12 §3.7.2, §3.11, T-V12-9, J-V12.36): done
- K4 SCC-07 and SCC-15 the item-102/109/110 register rows as column entries with V11's owners (V12 §3.11): done
- K5 SCC-26 the FM and VG preset runs (V12 §3.7.2 (3), T-V12-9, T-V12-24, J-V12.11): done
- K6 SCC-24 and SCC-27 wording (V12 §3.6b `cavernChance`, X-V12-3): done
- K7 decisions (J-V12.59 – J-V12.64), §12, the dated note, the lane log: done

RECONCILIATION PROGRESS (volumes/reconcile-V12-r2, against `docs/volumes/critique/seam-content-calibration-r1.md`: SCC-35,
-41, -48, all minor; one line per step: planned | done)
- L1 SCC-35 the stepped off form in V12 §3.7.8 (1) cites V11 §3.24.0: done
- L2 SCC-41 the `fm.*` row in V12 §3.4.2 follows V02 T-V2-31's nine rows and its plan-extent clause: done
- L3 SCC-48 the era's and the culture's item-110 factors at C3b in V12 §3.11: done
- L4 §12, the dated note, the lane log: done
- continuation on the re-issued brief (seam-content-calibration-r1.md §7): L1 – L4 verified present in the live text, not
  redone; new SCC-R1C-2 (major), SCC-R1C-5 (minor):
- L5 SCC-R1C-2 the default register line for every volume's unnamed calibratable cell (V12 §3.11, its V04 row, T-V12-20, §8): done
- L6 SCC-R1C-5 `BenchBarDef.towns.settings[].preset`'s vocabulary, `'default'` or a `PresetId` (V12 §2.1, §6): done
- L7 decisions (J-V12.71, J-V12.72), X-V12-15/-16, §12, the dated note, the lane log: done

RECONCILIATION PROGRESS (volumes/reconcile-V12-r3, against `docs/volumes/critique/seam-content-calibration-r2.md`: SCC-54,
-56, -60, -61 major; SCC-68 minor; one line per step: planned | done)
- M1 SCC-56 the `bar.<barId>` and `frame.<table>.<column>` metric families, `BenchBarDef`, `metric` as a list (V12 §2.1, §2.6, §3.4.2, §3.11, T-V12-20): done
- M2 SCC-54 the `decline` line split; a base cell's entry by the seat landing its request (V12 §3.11, §1b): done
- M3 SCC-60 a preset entry's own fallback run; preset entries in the register (V12 §2.5, §2.6, §3.7.2 (3), T-V12-9): done
- M4 SCC-61 per-run wall and retaining features merged on read (V12 §2.2, §3.4.2, T-V12-4): done
- M5 SCC-68 the `terrace` `enabled` line dropped; §1b's producers (V12 §3.11, §1b): done
- M6 decisions (J-V12.65 – J-V12.68, J-V12.11 and J-V12.63 amended), X-V12-15, §12, the dated note, the lane log: done
- continuation on the re-issued brief (seam-content-calibration-r2.md §7): M1 – M6 verified present in the live text, not
  redone; new SCC-R2C-4, -5, -6 (minors):
- M7 SCC-R2C-4 the default line's list and X-V12-16 without V08 and V10, with V03 (V12 §3.11, §10): done
- M8 SCC-R2C-5 `--defaults` writes only columns holding a compiled cell; `owner` from the source file's author seat (V12 §3.11, §2.11, §4.2, T-V12-20): done
- M9 SCC-R2C-6 BCR-V12-2's row `preset` spelled as V12 §2.1's `PresetArm`; file f item 497's note (V12 §10): done
- M10 decisions (J-V12.73, J-V12.74, J-V12.71 amended), §12, §13, the dated note, the lane log: done

RECONCILIATION PROGRESS (volumes/reconcile-V12-r4, against `docs/volumes/critique/seam-content-calibration-r3.md`: SCC-76
major; SCC-80, -81, -82, -83 minor; one line per step: planned | done)
- N1 SCC-76 the catch-all rule for every register line; the items 103–107 and item-106 lines end with it (V12 §3.11, T-V12-20): done
- N2 SCC-80 V07's one measured-rate `VG` entry, `rules.race.densityPower@VG` (V12 §3.7.1 (c), §3.7.2 (3), J-V12.11, J-V12.63): done
- N3 SCC-81 the stepped line binds V11's `stepped-shrine` row alone; V02's cells take V2 §3.10.10's line (V12 §3.11): done
- N4 SCC-82 `method: 'tune'` defined; the column sentence maps a line's method (V12 §2.6, §3.11): done
- N5 SCC-83 a `frame.*` metric read only at M-CAL (V12 §3.11's milestone exits, T-V12-20): done
- N6 decisions (J-V12.69, J-V12.70), §12, the dated note, the lane log: done
- continuation on the re-issued brief (seam-content-calibration-r3.md §6.2): N1 – N6 verified present in the live text, not
  redone; new SCC-R3C-1 (major), SCC-R3C-6, -12 (minors):
- N7 SCC-R3C-1 the default line's due for a column landing after M-CAL: the later corpus run `M-CAL/<layer>` (V12 §2.6, §2.8, §2.9, §3.10.1, §3.11, §4.2, T-V12-20, §8): done
- N8 SCC-R3C-6 `NG` in the register's preset target, the parity arms, the M5 panel, BCR-V12-2 and T-V12-24 (V12 §2.1, §2.5, §2.6, §3.5, §3.7.2, §3.9.1, §10): done
- N9 SCC-R3C-12 X-V12-15 and X-V12-16 brought to the volumes' landed text (V12 §10): done
- N10 decisions (J-V12.75, J-V12.76; J-V12.21, J-V12.72, J-V12.74 amended), X-V12-17, §12, the dated note, the lane log: done

RECONCILIATION PROGRESS (volumes/reconcile-V12-r5, against `docs/volumes/critique/seam-content-calibration-r4.md`: SCC-90
major; SCC-93 minor; one line per step: planned | done)
- P1 SCC-90 a value moved by its owning seat before its due: the paragraph, the moved-value row, the `cells` marker, the check (V12 §2.6, §2.11, §3.7.6, §3.11, §4.2, §5.2, §1b, T-V12-20): done
- P2 SCC-93 `--milestone` required; volume-qualified milestone ids; the due table's rows with M6-P's (V12 §2.8, §2.9, §3.10.1, §3.11, §8.2, T-V12-20, X-V12-17): done
- P3 decisions (J-V12.77, J-V12.78; J-V12.10 noted), §12, the dated note, the lane log: done

RECONCILIATION PROGRESS (volumes/reconcile-V12-r6, against `docs/volumes/critique/seam-content-calibration-r5.md`: SCC-98,
-99, -103, -105 major; SCC-100, -102, -107 minor; one line per step: planned | done)
- Q1 SCC-105 staged register entries: `stages`, the stage rows, *Staged entries* with the order, the lint (V12 §2.6, §2.11, §3.11, T-V12-20): done
- Q2 SCC-99 and SCC-100 the volumes' own step ids, C-steps under §16 ids, M3a for raised ways, the lint's due test, the span-rule line's order (V12 §2.8, §3.11, §6, §7, §8, §10): done
- Q3 SCC-98, SCC-102, SCC-103 *A value moved by its owning seat before its due*: named entries no run may name, the held outcome, rows added (V12 §1b, §2.6, §2.11, §3.11, §4.2, §5.2, T-V12-20): done
- Q4 SCC-107 model constants only in the register (V12 §3.11, T-V12-20): done
- Q5 decisions (J-V12.79 – J-V12.81; J-V12.77, J-V12.78 amended), X-V12-17, X-V12-18, §12, the dated note, the lane log: done

PROGRESS (one line per section: planned | done)
- 0 In plain words: done
- 1 Scope and base hooks: done
- 1b Wiring table: done
- 2 Data model: done
- 3 Generation (the harness pipeline): done
- 4 Editing: done
- 5 Rendering, labels, exports: done
- 6 Performance budgets: done
- 7 Tests and acceptance bars: done
- 8 Build plan: done
- 9 Decisions: done
- 10 Base change requests: done
- 11 Owner questions: done
- 12 CONFIRMED versus PLAUSIBLE: done
- 13 Fix list: done (revise-V12: nothing left; four variations recorded)
- continuation (file g items 105–109 with J110's refinements; the V03–V06 sittings; own pointers; the C4 hit): done

Conventions. "The base" is `docs/ARCHITECTURE.md` with amendments c, d and e folded in (their closing pass has landed:
`amendments-c/closing LANDED` in `docs/lane-events.log`) and file g's items 102–110 — with the refinements the owner approved at
J110, the crypt and catacomb switch of ~20:05 (J111), item 110 (J115) and its raised-ways revision of ~23:40 (J116) — as the
coherence pass applies them; a
section sign (§) points into the base, "V12 §" into this volume, "V0n §" into another volume. Base change requests are
BCR-V12-n (V12 §10), decisions J-V12.n (V12 §9), bars T-V12-n (V12 §7), owner questions Q-V12-n (V12 §11). This volume is
an implementer input under §17.1 (1): it names no reference class, method, grammar, palette or asset; reference evidence is
cited by file and section only, and every number it quotes from a capture is a measured behaviour (§17.1 (6)). The corpus
was not read: this volume designs its machinery and process from `partitioned/README.md`'s rules alone.

