# Seam check: content system (V11) and calibration (V12), with V02 and V06 as readers — round 1

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-content-calibration-r1; covered by the whole-design retrovalidation (J84).

PROGRESS (kill-safe; one line per section: planned | done)
- §0 Method and inputs: done
- §1 Re-check of round 0's 29 issues (SCC-01 – SCC-29): done
- §2 Table census, round 1 (every table V12, V02 and V06 read, its home in V11): done
- §3 Calibration census, round 1 (V12's register against V11's calibratable cells): done
- §4 New findings SCC-30 onward (the diffs since round 0, V02 §7–§13, V06 whole): done
- §5 Disposition summary by owning volume: done
- §6 CONFIRMED versus PLAUSIBLE: done
- §7 Continuation (2026-09-29, re-issued task): the round-0 file's five later findings SCC-R0C-1 – SCC-R0C-5 re-checked, and a sweep of the
  repair surface no seam round has read (round 3's inputs to now): done (5 FIXED; SCC-R1C-1 – -6 = 0 blocker, 3 major, 3 minor)
  - §7.0 why, inputs, method, decisions: done · §7.1 re-check of SCC-R0C-1 – -5: done · §7.2 new findings SCC-R1C-1 onward: done
  - §7.3 disposition: done · §7.4 CONFIRMED versus PLAUSIBLE: done

## 0 Method and inputs

Inputs at this round (md5): `docs/volumes/V11-content.md` 6968447a… (4 169 lines), `docs/volumes/V12-calibration.md`
544ad5f4… (2 768), `docs/volumes/V02-buildings.md` c459dd4d… (4 184), `docs/volumes/V06-evolution.md` dd1409c6… (3 728),
`docs/volumes/_integrate.md` 1487de32…, `docs/AMENDMENTS-2026-09-28f.md` 40e2f8d6…, base `docs/ARCHITECTURE.md` 01fea21f…
(unchanged since round 0), file g 3e7f674d….

**What was read, and how.** Round 0 read V11, V12, `_integrate` and file f whole and V02 §0–§6 plus its X list. Exact
snapshots of the texts round 0 read were found in the scratchpad (V11 954192b3… = `rcV11/V11-pre-reconcile.md`; V12
a193a9f8… = `V12-before-rf1-basef.md`; V02 ba65e82f… = `rcV2/V02-pre-reconcile.md`; `_integrate` e6808ba9…), so this round
read **every changed line since round 0 whole** — the full diffs of V11 (583 changed lines), V12 (296) and `_integrate`
(1) — which is exactly the repair surface that could break the seam. **V06 was read whole for the first time** (all
3 728 lines, §0–§13 and its Integration and reconciliation notes; §9–§10 by a scan of every line naming V11, V12, a
V11 cell or the register, since their rows restate §3). **V02**: its reconciliation note and every SCC-owned passage
were read at the lines cited; of §7–§13 (l. 2 927–4 184, never read by round 0), §7, §8 and §13 (with its X list and
both notes) were read whole and §9–§12 by a scan of every line naming V11, V12 or a V11 cell.
File f: items 226, 238, 291, 436, 447, 456, 534 and the V11 labels were read at their lines.

**Method.** (1) Each round-0 issue (SCC-01 – SCC-29) was re-checked against the current text of its owner and of every
other volume that restated it (§1). (2) Every V11 cell, column or table that V12's rewritten §3.11 register, V06 and V02
name was looked up in V11 §3.1's registry (rows 1–85 extracted by script, `scratchpad/volumes/scc-r1/reg11.txt`) and in
the section that writes it; every value V06 restates was compared with V11's row. (3) Each reader's rule for a V11
table was compared with V11's reading rule (not only the table's existence). Severity as round 0: **blocker** (the seam
cannot be built), **major** (a contradiction or an unwired piece a builder would hit), **minor** (wording, a stale
pointer, a restatement whose values agree).

## 1 Re-check of round 0's issues

| id | owner | status now | evidence (current text) |
|---|---|---|---|
| SCC-01 | V11 | FIXED | `WallBarrierRow.arcKind` (V11 §2.7), the `arcKind` column on all eight rows and the closure-feature rule (V11 §3.16.1), IN-V11-6 rewritten, T-V11-19, T-V11-37, J-V11.63; V12 §2.2's `closure` class reads J-VI.3's six |
| SCC-02 | V11 (+ file f 456) | FIXED | V11 §5 (3) cites file f item 447 and adds no second name; BCR-V11-23 reconciled; file f item 456 carries the supersession note |
| SCC-03 | V12 | FIXED | V12 §2.2: no `FeatureKind 'aqueduct'`, `span` added, `stepMinCm`/`stepMaxCm`, no `foundedRung`, closure six kinds, the drop-on-read rule; T-V12-4, T-V12-38 cite 447 |
| SCC-04 | V12 | FIXED (one wording residue in V11, SCC-37) | V12 §2.7 `servedShare` by the class's compiled `profile.coverage` unit with `unit: 'district'` for 105 (k); units as V11 §2.3 defines them at a plot (checked against V11 l. 334–338) |
| SCC-05 | V12 | FIXED | no `ref:SettlementForge` left in V12 or V11 (only in V12's history note) |
| SCC-06 | V11 | FIXED | V11 §3 preamble, §3.1 (rows 63–66, 77 `calibratable: false`), §3.11–§3.13 preambles, T-V11-37, J-V11.65; V12 §3.11's item-108 line "not calibratable (V11)" |
| SCC-07 | V12 | FIXED | V12 §3.11 "Items 109 and 110 by column": one `target.column` line per calibratable column of every table round 0 listed, with owner, method, metric, fallback; registry row numbers checked against V11 §3.1 (9, 43, 46, 50, 58a, 59, 71, 78–85) |
| SCC-08 | V11 | FIXED | V11 §8 C0–C8 exits carry "the register green"; "The register at every exit" paragraph; J-V11.69; V12 §3.11 and X-V12-3 follow |
| SCC-09 | V11 | FIXED | V11 §3.24.0's `presets.FM` line; T-V11-21 lists FM; V12 IN-V12-2 cites it |
| SCC-10 | V11 | FIXED | `butcher` split `works-noxious+shopfront`, `brewery` `works-noxious+tavern-row`; T-V11-3 refuses a non-family split key |
| SCC-11 | V11 | FIXED | V11 §3.6.1 `arena`: footprint the claim's, plot 2 500 / 4 000 / 6 000 / 9 000 m², stands main share 1, gates absorbed; "until" sentence dropped; X-V11-9 answered |
| SCC-12 | V02 | FIXED (recorded variation J-V2.88) | V02 §3.10 "35 families"; family rows `burial-ground`, `fort`, `arena`; role rows `charnelHouse`, `lychgate`; `roleKeys` rows (l. 1744); §3.10.7's exemption; `court-institution` aliases withdrawn (l. 1621) |
| SCC-13 | V11 | FIXED in V11; **its reader V06 not updated — new issue SCC-31** | V11 §3.24.4 "Per use" rule and T-V11-35; V06 §3.8.2 (4)–(5), §3.9.5 (1), §3.9.6, §3.19.5 (1) still read the class column |
| SCC-14 | V06 | FIXED in V06; **the same defect in its sibling cells — new issue SCC-30** | V06 §2.2 no longer holds the four knobs and cites V11 §3.18; but the raised and retaining persistence rates now have two homes (V11 §3.18 and BCR-V6-26's base row) |
| SCC-15 | V12 | FIXED | V12 §3.11's owners: V11 for the `CatacombRule` values, the decline block, `w_sun`; metric `shade.gap` |
| SCC-16 | V11 | FIXED | W52, W56, registry row 85, §3.24.4, §3.24.6 name the bends |
| SCC-17 | V11 | FIXED | "M6-U" in §8 C8 and T-V11-24; no "M-underground" left |
| SCC-18 | V11 | FIXED | W49, T-V11-34 cite V12 §3.4.2's model metric `retaining.onFlatM` |
| SCC-19 | V11 | FIXED | `TerraceRow` and §3.24.1's table carry `retainingReachM`, `flatDepthM`, `coverShare`; T-V11-32 (a) adds `flatDepthM ≥ minTerraceDepthM` |
| SCC-20 | V02 | FIXED | V02 §3.10.6 (l. 1777) cites V11 §3.6.4 for the three columns; §2.3's comment names three |
| SCC-21 | V02 | FIXED | no "until V11 adopts" / "until it lands" left for the manor and arena rows |
| SCC-22 | V02 | FIXED | V02 l. 1522, 2021: the draw V04's, the chance V11 §3.23.7's `DigRule` rows |
| SCC-23 | V06 | FIXED in the rule; **two stale pointers — new issue SCC-36** | V06 §2.2 `uses.splitHysteresis` row and §3.9.10 (3) read the class's `profile.split.threshold`; T-V6-43 and J-V6.55 still test "past `splitThreshold`" |
| SCC-24 | V12 | FIXED | V12 §3.6b `cavernChance` reads rows 9 and 59 with V11's `miningCellShare` |
| SCC-25 | V11 (V12 half) | **PARTLY FIXED — reopened as SCC-35 (V12)** | V11 §3.24.0 and V12 §2.13 read "every `chance` 0"; V12 §3.7.8 (1) (l. 1491) still restates the off form as "`roster.specialisations` empty" |
| SCC-26 | V12 | FIXED | V12 §3.7.2 (3), `layer: { preset }` (V12 §2.5), T-V12-9, T-V12-24, J-V12.11, J-V12.63 |
| SCC-27 | V12 | FIXED | X-V12-3 reads "the town's fabric above the ruin" |
| SCC-28 | V02 | FIXED | V02 §4.6 (1), §4.2: the bend or `family` op to `stepped` writes the use's `siting.declared` `specialisation` in the same undo group; J-V2.94 |
| SCC-29 | BASE-F | FIXED (a variation on (a)) | file f items 226, 238, 436 carry one label, "BASE design, built at M6-U" (J-RF1.3; the brief allowed "unless the coherence pass names another"); V11 items labelled by V11 §8's rows ("BASE (M3a, V11 C3b)", item 456 "BASE (M3a, V11 C3)"); V06 X1, J-V6.53, W48 read V11's `growthCapShare` on V04's field |

Round 0's 29 issues: **26 FIXED, 1 partly fixed (SCC-25, reopened as SCC-35), 2 fixed at their owner with the same
defect surviving next door (SCC-13 → SCC-31, SCC-14 → SCC-30)**; SCC-23's two leftover pointers are SCC-36.

## 2 Table census, round 1 (the readers round 0 had not reached, and the rewritten register)

| reader | table / cells read | V11 home | status |
|---|---|---|---|
| V12 §3.11 "Items 109 and 110 by column" | rows 9, 43, 46, 50, 58a, 59, 71, 78–85 and their columns | V11 §3.1 (registry numbers checked), §3.17.1, §3.18, §3.19.1, §3.20.3, §3.23, §3.24 | present; `retaining.rate`, `raised.rate` have a second home (SCC-30); the era factors' milestone (SCC-48) |
| V12 `crossing.kinds`, `water.needRatio`, `ruin.survival` | `W_STEEP_RAMP` (V11 §3.24.5 l. 3351), the water balance (§3.24.6), survival shares (§3.23.5) | present | consistent (the bench thresholds 0.5 / 0.2 are V11 §3.24.6's fallback text) |
| V12 `servedShare` | `CoverageSpec` units at a plot (V11 §2.3 l. 334–338) | present | consistent; T-V11-13's wording (SCC-37) |
| V12 §3.7.8, §2.13 no-op pins | V11 §3.24.0's switch table | present | §3.7.8 (1) still restates "empty" (SCC-35) |
| V12 bar map 105 (k) `noRegression` `off` | "the web's weights" | **no named cell set** in V11 §3.7.4 | unwired (SCC-34) |
| V06 §3.9 uses | `profile` (coverage, balance, split threshold), `siting.web` (`relaxPasses`, `relaxGain`, `chainStatus`, `splitThreshold`), `dossier.ladders` ranges | V11 §2.3, §3.7.4, §3.12 | present; `chainStatus` keys disagree (SCC-32); the ladder range omits the village branch (SCC-33); `useRules` pointer (SCC-45) |
| V06 §3.8.2, §3.9.5–§3.9.6, §3.19.5 | `deck`, `deckOk` | V11 §3.24.4 | present; read per class, not per use (SCC-31) |
| V06 §3.18 | `CatacombRule` values (`count`, `growthCapShare`, `growthFloorM2`, `plagueNeedFactor`, `rankCap`, `cryptJoin`) | V11 §3.23.8 | values agree (0.9; 0.7 · 0.3; 0.01; 60; 3); two attributed to V04 (SCC-47) |
| V06 §3.19 | `raisedWays` rows, settings and "chance, stated once"; §3.18's structures block; §3.24.7 (3)–(4) | V11 §3.24.2, §3.18, §3.24.7 | present, cited (X-V11-11 carried; `dossierFactor` gone); the decline rates (SCC-30) |
| V06 §3.5.2 pool | the persistence rates `raised` 0.05, `retaining` 0.05, `street` 0.08 | base §4.11 by BCR-V6-26 (file f item 291) **and** V11 §3.18 | two homes (SCC-30) |
| V06 T-V6-44 | the web's off form | none named (V11 §3.7.4) | SCC-34 |
| V06 T-V6-65 | V11 §3.24.0's switches | present | per-family reading not carried (SCC-42) |
| V02 §3.10 | 35 template families, `roleKeys`, `HeightsRow`'s three columns, `DigRule` | V11 §3.6.1, §3.6.4, §3.6.5, §3.23.7 | present (SCC-12, -20, -22 fixed); milestone pointer (SCC-50) |
| V02 §3.10.8, §7.4, §8 | the `FM` preset cells; V12's `fm.*` metrics and reference run | V12 §3.4.2, §3.7.2 (3) | not cited (SCC-40); `fm.*` list lags T-V2-31 (SCC-41) |
| V02 T-V2-50 | V11 §3.24.0's switches | present | fixture-condition form, landmarks unnamed (SCC-43) |

## 3 Calibration census, round 1

V12's lint (T-V12-20) fails **every** compiled `calibratable` cell without an admissible source or a register entry,
from M1 (V12 §3.11 l. 1807–1817), and V12 §3.11 puts the duty on "the seat that lands that volume's milestone".
Round 0's V11 half is closed (V11 §8's register at every exit, SCC-08). This round finds the same duty unwired in the
two readers that own table rows in V11's registry: V06's `tables/evolution.json` (registry row 60, "our own,
calibratable", V6 §2.2; the clientele table, §3.9.9; the hazard and calamity rows, §2.4) lands at M6-E with no register
exit and a milestone E7 that "tunes rates" outside V12's runs (SCC-38); V02's `composition.json` (registry row 39,
"every cell … calibratable") lands at M3a-V2 and M6a–M6c with none (SCC-39), and its `FM` cells are set by a V02 harness
run instead of V12's `reference` run (SCC-40). Opposite way round: V11 marks the naming tables calibratable while V12's
R4 and T-V12-24 forbid calibrating them (SCC-44, SCC-06's shape). The persistence rates of raised ways and retaining
walls are one knob in two tables (SCC-30, SCC-14's shape).

## 4 New findings (SCC-30 onward)

| id | sev. | owner | kind | claim (with evidence) | required change |
|---|---|---|---|---|---|
| SCC-30 | major | V11 (V12 wording half) | two homes for one knob | V11 §3.18's structures block (l. 2791–2798) holds `retaining.rate` 0.05 and `raised.rate` 0.05 "per year a stretch / a span" and says they "are this table's"; BCR-V6-26 (file f item 291) writes the same two rates into the base decline table's **persistence row** (`raised` 0.05 · `retaining` 0.05), which V06 §3.5.2 and §3.19.2 (3), §3.19.4 (3) read as the lottery's layer weight `w = E(x) · rate · u` inside the churn cap — not a per-year chance. V12 §3.11's decline line registers the V11 pair. One knob, two cells, two meanings: V12's lint fails "two names for one knob", and a builder cannot tell whether a stretch falls at 5 % a year or by the weighted lottery. V11 §3.18 also points at "V6 §2.4's table" (the evolution table is V6 §2.2). | V11 §3.18: drop `retaining.rate` and `raised.rate` as V11 cells; the rows read "struck by the decline pool at the base's persistence rows `retaining` and `raised` (§4.11, BCR-V6-26 = file f item 291; V6 §3.5.2)"; "V6 §2.4's table" → "V6 §2.2's table". V12 §3.11's decline line: replace the two cells by "the base decline table's persistence rows `raised`, `retaining` (owner base, §4.11 by BCR-V6-26)". |
| SCC-31 | major | V06 | reader rule (SCC-13's other side) | V11 §3.24.4 now makes `deckOk` a per-use predicate — `[]` when the use's effective crypt is `always` (its class, a bound dossier crypt record, or a `cryptAlways` keyword), else the class's column (SCC-13; V02 X16; T-V11-35). V06 reads the class column at every deck placement: §3.8.2 tier (4) "a vacant deck plot only to a class V11's `deckOk` column admits", tier (5), §3.9.5 (1) "a deck plot only when V11's `deckOk` column admits `c`", §3.9.6, §3.19.5 (1), W69. The use phase moves dossier-backed uses by inertia (§3.9.5), so a bridge chapel carrying a crypt record (no churchyard, so movable) can be relocated onto a deck — the case T-V2-47 and T-V11-35 forbid. | V06 §3.8.2 (4)–(5), §3.9.5 (1), §3.9.6, §3.19.5 (1) and W69 read "V11 §3.24.4's per-use `deckOk` (the use's effective crypt first, then its class's column)"; T-V6-63 adds "a relocated use carrying a dossier crypt record never lands on a deck plot". |
| SCC-32 | major | V06 | key and value contradiction | V06 §3.9.10 (5): "a chain whose status moves to `vulnerable`, `impaired` or `disrupted` weakens its links by `siting.web.chainStatus` (V11: 0.8, 0.6, 0.3) … back to 1.0 when it returns to `active`". V11 §3.7.4 (l. 1645) keys the row by V08's neutral keys — active 1.0, vulnerable 0.8, impaired 0.6, entrepot 1.0, sustained 0.9 — and V08 §2.6 (l. 846–850) maps no word to `disrupted`. V06 reads a key the table does not hold (0.3 exists nowhere) and omits `sustained`. | V06 §3.9.10 (5): "weakens or restores its links by V11 §3.7.4's `chainStatus` weight for the chain's neutral status key (V08 §2.6)", with no key list and no values; drop `disrupted` and 0.3; H-DOSSIER's status change uses a key V08 maps. |
| SCC-33 | major | V06 | restated rule missing a branch | V06 §3.9.1 (2) gives an unnumbered record's range as "V11's range per kind scaled by the rung (V11 §3.12's `rungScale`; 108 (b))". V11 §3.12 (l. 2101–2104) now says: at THORP, HAMLET and VILLAGE an unnumbered record takes V07 §2.4's range row for its qualifier and member class, else V11's range **unscaled** (SS-08). V06's `uses` phase runs at village-product epochs too (V07 overrides only `siting` and `growth`, V6 §3.1 (4)), so a village-rung epoch would scale by `rungScale` where the content system says not to. | V06 §3.9.1 (2): "clamped into the record's numeric range, else into V11 §3.12's range for its qualifier and member class (its rung rule, the village rungs' included)" — cited, not restated. |
| SCC-34 | major | V11 (V06, V12 halves) | unwired off form | Two readers need the supply web switched off as cells: V06's no-op pin T-V6-44 (§3.9.10's closing sentence: "the goods table's `comfortM` 0, orientation `balanced`, `reverseShare` 0, no split rows") and V12's bar map 105 (k), a `noRegression` bar whose `off: CellRef[]` is "set to 0 in the reference arm" and reads "`off` = the web's weights". V11 §3.7.4 names no such set. V06's list omits `districtSupplyWeight` (item 105 (g)'s S7b (1) term, V11 l. 1642) and `valuableSecurity`, so T-V6-44 cannot be byte-identical to "the history without item 105"; "orientation `balanced`" and "no split rows" are not zero cells, so V12's overlay cannot express them (J-V12.43's rule: an in-range off value per cell). | V11 §3.7.4 gains **the web's off form** as one named cell set with in-range values, equal to what the parity presets resolve (T-V11-21) — e.g. `reverseShare` 0, `districtSupplyWeight` 0, `relaxPasses` 0, `valuableSecurity` 0, every good's `comfortM` 0, the orientation cells at their balanced value, every class's `split.threshold` at its range top (no split) — in the form of §3.24.0. V06's T-V6-44 and §3.9.10 cite it; V12's 105 (k) row cites it and `NoRegressionSpec.off` takes `{ ref: CellRef; value }[]` (V11's off values) instead of "set to 0". |
| SCC-35 | minor | V12 | stale restatement (SCC-25 residue) | V12 §3.7.8 (1) (l. 1491) still defines the stepped family's off form as "`roster.specialisations` empty"; V11 §3.24.0 and V12's own §2.13 now read "every `chance` 0". | V12 §3.7.8 (1): cite V11 §3.24.0's switch table for the off forms instead of listing them (or read "every `roster.specialisations` `chance` 0"). |
| SCC-36 | minor | V06 | stale pointer (SCC-23 residue) | T-V6-43 ("split pairs appear only past `splitThreshold`") and J-V6.55 ("by the split index against `splitThreshold`") still name the web default, which V6 §3.9.10 (3) now reads only as the default of the class's compiled `profile.split.threshold`. A test built from T-V6-43 splits a class with its own threshold at 0.6. | T-V6-43 and J-V6.55: "past the class's compiled `profile.split.threshold` (V11 §2.3; the web's `splitThreshold` its default)". |
| SCC-37 | minor | V11 | wording (SCC-04 residue) | T-V11-13 measures "the share of units served" per coverage class; V12's `servedShare`, which runs it, reads a class that makes the parish partition (the church classes) in its `households` form, never by parish cells (J-V12.59), because the cells are its own Voronoi cells. V11's text does not say so, so T-V11-13 and the harness disagree for the principal coverage class. | T-V11-13: "the share of units served, by V12 §3.6's `servedShare` on the class's compiled unit (a church class's parish read in its households form, J-V12.59)". |
| SCC-38 | major | V06 | unwired (register) | V12 §3.11 and its lint (T-V12-20, PR from M1) require a register entry for every calibratable compiled cell, "written by the seat that lands that volume's milestone". V06's `tables/evolution.json` is registry row 60 and "our own, calibratable" (V6 §2.2, §2.4, §3.9.9), but V06 §8's exits (E0–E8) write no entry and E7 "rate tuning with provenance" names no V12 run. At M6-E every V06 cell fails the lint. | V06 §8: each of E1–E8's exits adds "`plat calibrate register --check` green over the rows it lands — one `target.column` entry per calibratable column of `tables/evolution.json` (V12 §3.11), written by the landing seat"; E7 reads "V12 §3.7's tuning runs (RunSpec, declared shifts) against the T-V6 bench metrics, registered as V12 metrics". |
| SCC-39 | major | V02 | unwired (register) | The same duty for V02: `composition.json` (registry row 39) — "every cell `{value, unit, provenance, calibratable, …}`" (V2 §3.10), "all values our own, calibratable" — ships its `tiers` cells and `@deck` rows at M3a-V2 and the rest at M6a–M6c (V2 §8.3, §8.5), and no exit writes a register entry; V02 never cites V12's register. | V02 §8.3 and §8.5: M3a-V2, M6a, M6b and M6c's exits add "`plat calibrate register --check` green over the `composition.json` cells it lands (V12 §3.11), entries written by the landing seat". |
| SCC-40 | major | V02 | two mechanisms for one job | V12 §3.7.1 (c) schedules "V02's `FM` preset cells at M6c" as a V12 `reference` run, and V12 §3.7.2 (3) admits a `presets.FM` entry **only** by such a run (`layer: { preset: 'FM' }`, V12 §2.5; J-V12.63), measured by V12's `fm.*` metrics (V12 §3.4.2). V02 §3.10.8, the paragraph after T-V2-31's table (§7.4), SP-V2-3 (§8.2) and M6c (§8.3) set those cells by "the free-frame harness's calibration run … (a table version with its declared shift)", with its own fallback ("re-tuned once … a bar still failing is reported to the owner's panel as a known difference"). A builder would write a V02-private tuner that V12's scope guard (T-V12-9) never sees. | V02 §3.10.8, §7.4, §8.2 SP-V2-3 and §8.3 M6c: "set by V12's `reference` run against Fantasy Manor (`layer: { preset: 'FM' }`, V12 §3.7.2 (3)) on V12's `fm.*` metrics, the free-frame harness its fixture"; SP-V2-3's failure branch reads V12 §3.7's outcome (`fallback-applied`, else `not-achieved` reported to the owner). |
| SCC-41 | minor | V12 | restatement lagging its source | V12 §3.4.2's `fm.*` row lists "V02 T-V2-31's rows (family shares, ranges, blocks, towers, dormers, porch share, entrance share, plan extent in wing widths)"; T-V2-31 measures path **segments** (not ranges) and adds the **square-tower** and **half-round-porch** shares — the rates the `FM` cells `towerShape` and `halfRound` are tuned to (V2 §3.10.8). | V12's `fm.*` row cites T-V2-31's rows without a list, or lists all nine (families, segments, blocks, towers, square towers, dormers per segment, porches, half-round porches, entrances; plan extent). |
| SCC-42 | minor | V06 | request half-carried | X-V12-11 asks T-V6-65 to register on V12 §3.7.8's engine and to read "byte-identical to before item 110" as the family's off-state set; IN-V06-5 carried only the off values. T-V6-65 still pins three families together against "the history without item 110", leaving `roster.specialisations` (H-TERRACE's temples) on. | T-V6-65: "V12 §3.7.8's pins `item110.raised`, `.terrace`, `.deck` and `.stepped` over H-100, H-AQUA, H-TERRACE and H-DECK (V12 §2.13), each byte-identical to its off-state set (X-V12-11)". |
| SCC-43 | minor | V02 | pin form | T-V2-50 states "off" as fixture conditions — "no class reaching a stepped row, no `arena` class and no deck plot (the base's deck rows off)" — not as V12 §2.13's overlays; `deck.landmarks` (B-MASS's mole fort and mid-mole tower) is not named, and the arena's `ovalCourt` has no switch in V11 §3.24.0. | T-V2-50: "under V12 §2.13's `item110.stepped` and `item110.deck` overlays (V11 §3.24.0's off forms, `deck.landmarks` included), on the suites minus B-MASS's arena sub-fixture, whose `ovalCourt` is its own declared shift (T-V2-46)". |
| SCC-44 | major | V11 | contradiction (calibratable flag) | V11 §3's preamble (l. 655–657) makes every row set calibratable except the dossier row sets, so the naming grammars' weights and templates (`naming.*` row 68, `desc.*`/`chronicle.*`/`appearance.*` row 69, `corpora` row 70, the naming columns of row 71) are calibratable; V12's R4 (l. 1654–1656) and T-V12-24 forbid calibrating "naming tables, grammars, word lists and packs". Under V12's lint every such cell then needs an entry that R4 forbids — SCC-06's defect for the naming tables. | V11 §3 preamble and §3.1: `ColumnSpec.calibratable: false` on every column of rows 68–70 and the naming columns of row 71 (its `building` block stays calibratable), with a J-V11 row citing V12's R4. |
| SCC-45 | minor | V06 | stale pointers | V06 §3.9.9 says a class without `useRules` of its own takes the clientele row "(V11 writes them)"; V11 (l. 1040) and X-V11-11 say V11 writes none by default ("a class row may"). V06 §2.2's `uses.byClientele` row points at "V6 §3.9.6's table"; the table is §3.9.9 (V11's registry row 60 cites §3.9.9). | V06 §3.9.9: "(V11 writes none by default; a class row may)"; §2.2: "V6 §3.9.9's table". |
| SCC-46 | minor | V06 | statistic name (SCC-04's other reader) | T-V6-13 measures "a coverage class's served-district share … above its random baseline"; V12's `servedShare` (which the 107 (g) row runs) is now the share of the class's own coverage units (walk disc, households disc, parish, district). | T-V6-13: "a coverage class's `servedShare` on its own coverage unit (V12 §3.6)". |
| SCC-47 | minor | V06 | owner attribution | V06 §3.18.2 (3a) reads "V04's `CatacombRule.rankCap` (0.9)", X1 "(`rankCap` 0.9)", and §3.18.3 (6) restates `cryptJoin.own` 0.7, `.other` 0.3; the values are V11 §3.23.8's (J-VI.6), V04 only the schema. Values agree. | Read "V11 §3.23.8's `rankCap` and `cryptJoin` (V04's `CatacombRule` fields)" with no restated values. |
| SCC-48 | minor | V12 | milestone of an entry | V12 §3.11 assigns the `era` entries to "C1 for `era` and `climate`"; V11 §8 lands "the era and culture factors" (`aqueductM`, `raisedVaultM`, the culture `building` block) with C3b at M3a, and each exit writes the entries of the tables it lands. | V12 §3.11: "C3b for the era's and the culture's item-110 factors; C1 for `climate`". |
| SCC-49 | minor | BASE-F (V02 half) | duplicate base change | BCR-V2-26 (file f item 427, **STAGED (M6)**) adds `attic`, `parapetCm`, `towerStoreyCm` to `HeightsRow` in §10.2 "as volume 11's BCR-V11-8 adds `HeightsRow` there"; BCR-V11-8 (item 435, **BASE, M0 (b)**) declares `HeightsRow` "as in V11 §2.8", which now carries the three columns (V11 l. 476–478, SCC-20). BCR-V2-26's "current text" quotes a V11 §2.8 that no longer exists. | File f item 427: "absorbed by item 435 (V11 §2.8 carries the three columns; SCC-20)", label withdrawn; V02 BCR-V2-26 marked absorbed. |
| SCC-50 | minor | V02 | stale pointers | T-V2-33 runs "on the compiled roster — V11 C1–C2, its 35 template families"; V11 §8 lands `fort` and `arena` with C3b (M3a). X26 says a village class takes tiers "with their village cap (V7C-47)"; V11 dropped `villageCap` — the cap is V07's `rules.tiers.capPerSettlement`, per settlement (V11 §3.24.3; SS-31). | T-V2-33: "V11 C1–C3b's 35 template families"; X26: "under V07's `rules.tiers.capPerSettlement` (V11 §3.24.3)". |

## 5 Disposition summary by owning volume (round 1)

| owner | blocker | major | minor | ids |
|---|---|---|---|---|
| V06 | 0 | 4 | 5 | SCC-31, -32, -33, -38 (major); SCC-36, -42, -45, -46, -47 (minor); SCC-34's V06 half |
| V11 | 0 | 3 | 1 | SCC-30, -34, -44 (major); SCC-37 (minor) |
| V02 | 0 | 2 | 2 | SCC-39, -40 (major); SCC-43, -50 (minor); SCC-49's V02 half |
| V12 | 0 | 0 | 3 | SCC-35, -41, -48 (minor); SCC-30's and SCC-34's V12 halves |
| BASE-F | 0 | 0 | 1 | SCC-49 |
| **total** | **0** | **9** | **12** | 21 findings (SCC-30 – SCC-50), of which SCC-35 reopens round 0's SCC-25 |

No blocker: every defect has a fix inside one volume or one file-f label, and none stops a milestone from starting.

## 6 CONFIRMED versus PLAUSIBLE

**CONFIRMED by reading** (the lines cited in each row): the 29 round-0 re-checks of §1; SCC-30 (V11 l. 2785–2798; V06
l. 1164–1167, 2452, 2536; BCR-V6-26 in V06 §10; file f item 291), SCC-31 (V11 §3.24.4's per-use rule; V06 l. 1438–1439,
1547, 1573, 2566–2567), SCC-32 (V11 l. 1645; V08 l. 846–850; V06 l. 1668–1670; `disrupted` occurs once in the four
volumes and V08), SCC-33 (V11 l. 2101–2104; V06 l. 1488–1490), SCC-34 (V06 l. 1675–1676; V11 l. 1636–1648; V12 l. 612,
1327), SCC-35 (V12 l. 1491), SCC-36 (V06 T-V6-43, J-V6.55), SCC-37 (T-V11-13; J-V12.59), SCC-38 (V06 §2.2, §8; no
"register" or V12 run in V06, by grep), SCC-39 and SCC-40 (V02 §3.10, §3.10.8 l. 1801–1805, §7.4 l. 3116, §8.2–§8.5; no
"register" or V12 run in V02, by grep; V12 l. 283–290, 475, 997, 1384, 1401–1407), SCC-41 (V12 l. 997; V02 l. 3104–3114),
SCC-42 (V06 T-V6-65, IN-V06-5; V12 X-V12-11, §3.7.8), SCC-43 (V02 T-V2-50, §7.7's fixtures), SCC-44 (V11 l. 655–657,
§3.20; V12 l. 1654–1656, T-V12-24), SCC-45 (V06 l. 559, 1617–1619; V11 l. 1040, 3996–3998), SCC-46 (T-V6-13), SCC-47
(V06 l. 2207–2209, 2277, 3613; V11 l. 3102–3106), SCC-48 (V12 l. 1759–1760; V11 §8 C1, C3b), SCC-49 (file f items 427,
435; V11 l. 476–478; V02 BCR-V2-26), SCC-50 (V02 T-V2-33, X26; V11 §8, §3.24.3). **PLAUSIBLE**: that the fixes proposed
for SCC-30 (the base's persistence row as the one home), SCC-34 (the named off set, its example cells) and SCC-43 (the
arena as a suite exclusion) are the owners' best choices — each owner may choose another mapping so long as the defect
closes; and that V02 §9–§12, read here by a scan of every line naming V11 or V12 rather than line by line, hold no further
seam defect (its BCRs, decisions and X list were checked at every V11 or V12 reference; §7, §8 and §13 were read whole).

## 7 Continuation (2026-09-29 08:59 –, re-issued task)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-content-calibration-r1 (continuation); covered by the whole-design retrovalidation (J84).

### 7.0 Why a continuation, inputs, method, decisions

**Why.** The workflow re-ran this lane. §0–§6 above landed at 04:28 and cover what this round's brief then held: round 0's
SCC-01 – SCC-29 re-checked (§1) and a sweep (SCC-30 – SCC-50); they stand as written and are returned as written (the resume
rule). Since that landing the round-0 file gained a continuation (08:28, `seam-content-calibration-r0.md` §6.1) with five
more findings, **SCC-R0C-1 – SCC-R0C-5**, which no seam round has re-checked: round 4 of this seam (STARTED 07:42) was cut
with a skeleton and is no input. The brief's "re-check every issue the previous round raised" now reaches them (§7.1). The
brief's sweep is carried out over the one repair surface no seam round has read: everything changed on this seam since
round 3's inputs — reconcile round 4 (V11, V12, V02, V06, file f), the `_integrate` continuation (08:13: V11's notes,
file f items 244, 364, 581, 582) and the round-1 continuations (file f 08:40, V02 08:44) — plus the pairs the
`_integrate` continuation lists as read together by no seam where they touch the content system or the register (V09,
V10 and V11; V01, V04, V05, V07, V08, V10 and V12; `_integrate.md` §8.1).

**Inputs** (md5, snapshots in `scratchpad/volumes/sccr1c/now/`): V11 79d485df…, V12 8b4ab2e5…, V02 8c08b116…, V06
4992560d…, `_integrate` 965ab696…, file f 1d04dca0…, base 01fea21f… (unchanged since round 0), file g 8df8841b… (items 111
and 112 added since round 3; both routed to the coherence pass, which writes their volume parts — J120, J122 — so no volume
yet carries them and they are out of this seam's scope). Round 3's inputs, verified by md5, were diffed against these
(`rcV11r4/`, `rcV12r4/`, `rcV2r4/`, `rcV6r4/`, `rcBFr4/`, `integ/pre-cont/`): 149, 87, 234, 332, 155 and 98 changed lines,
**each diff read whole** (`sccr1c/*.diff`). V07 §2.2, §2.2a (its `claimArea`, `race` rows), §3.0, §3.15 and §8; V09 §2.3 and
BCR-V9-8; V10 §2 and §2.10; the calibratable-cell statements of V01, V04, V05, V08 and V10 were read at their lines.
Scripts: a census of every `.json` table name in the twelve volumes against V11 §3.1's file column
(`sccr1c/json-census.txt`), and a grep of each volume for its register wiring (`calibrate register`, `V12 §3.11`, register
entries, `BenchBarDef`).

**Decisions of this continuation (vetoable).**
* **JC1-1** — Continued this landed lane for the five round-0 additions and the unread repair surface, over returning the
  04:28 summary alone, because the resume rule protects landed work and these reached no seam lane (round 4 was cut); the
  same choice the round-1 reconcile lanes made for the same additions (reconcile-V02-r1, reconcile-BASE-F-r1).
* **JC1-2** — Did not re-check round 3's SCC-73 – SCC-87 as a list (round 4's brief, whose re-run owns them), but read their
  repairs whole inside the round-3 → now diffs; a repair that breaks something is raised here as new.
* **JC1-3** — Numbered the new findings **SCC-R1C-1 …**, over SCC-88 onward, because round 4's re-run starts at SCC-88.
* **JC1-4** — Raised the content-system and register gaps of volumes outside this seam's four (V01, V04, V05, V07, V08, V09,
  V10) where the gap is the content system's or the register's own (a table V11's closed registry refuses; a register line V12
  names that no volume writes), because `_integrate` §8.1 records those pairs as read together by no seam and the brief's
  first clause ("every table any volume reads exists in the content system with its rows") is this seam's.

### 7.1 Re-check of the round-0 continuation's findings (SCC-R0C-1 – SCC-R0C-5)

| id | owner | status now | evidence (current text) |
|---|---|---|---|
| SCC-R0C-1 | BASE-F | FIXED | file f item 426 (BCR-V2-09) **BASE (M3a, with items 229 and 259 …)**, *Needed by* V02, V11; item 224 (BCR-V2-23) **BASE (M3a, with items 228 and 230 …)**, applied before 228 and 230; the build unit with item 229 noted at all four ends (224, 229, 259, 426); J-RF1.9 – J-RF1.11 (reconcile-BASE-F-r1's continuation, 08:40) |
| SCC-R0C-2 | V02 | FIXED | BCR-V2-09's and BCR-V2-23's headings "(from M3a, with BCR-V2-39 …)"; BCR-V2-23 says where its clause applies before M6; BCR-V2-39's list brings BCR-V2-09's `composition?` and BCR-V2-23's clause; V2 §8.5's M3a-V2 content cell names both; V2 §10's opening paragraph lists the item 110 fold's M3a requests; J-V2.103 (b) |
| SCC-R0C-3 | V02 | FIXED | V2 §3.10.9's own row `sizeBandLo`, `sizeBandHi` 0.7, 1.45 with `fixed: the mirror of V11 §3.6.1's derivation ratios …`, not calibratable; V2 §3.10.10's small-tables line drops them and a no-entry row names them; M10's clause, J-V2.35, X2 and V2 §12 read the mirror; J-V2.103 (a) |
| SCC-R0C-4 | V02 | FIXED | J-V2.3 "inset by `WingRoleRow.hipInset` × span — under `FM` the measured-rate entry of V2 §3.10.8"; J-V2.34 "V11 §3.6.1's template families (35)"; V2 §5.2's ridge step reads the `FM` entry as the measured-rate cell |
| SCC-R0C-5 | V02 | FIXED in V02's text; **its base half left at M6 — new SCC-R1C-4 (BASE-F)** | BCR-V2-19's §13.2 bullet: "T-V2-1 – T-V2-53 … the bars of volume 2 §7.7 whose subject a BASE item lands before M6 run from that item's milestone (T-V2-44 – T-V2-47, T-V2-50, T-V2-51 at M3a; T-V2-52 at M2b)"; but file f item 522 still applies the whole request **STAGED (M6, stage 3)**, so the bullet that schedules M2b and M3a bars enters the base only at M6 |

Round 0's five later findings: **5 FIXED**, one with its base half still open (SCC-R1C-4).

### 7.2 New findings (SCC-R1C-1 onward)

| id | sev. | owner | kind | claim (with evidence) | required change |
|---|---|---|---|---|---|
| SCC-R1C-1 | major | V11 (V12 half) | unwired key: registry readers are not stage ids | V11 §3.1's preamble (l. 713–714) and `TableSchema.readers` (V11 §2.1, l. 303) admit "stage ids or module ids", but three mechanisms match a table's readers against **stage ids**: V11 §3.2.1 step 4 (l. 840–846) — under `VG` a table is village-read only if its readers meet `productStages.village`, "a `presets.VG` entry on a cell of any other table stops the build" and the loader resolves no other table under `VG`; V12 §3.7.2 rule (4) (l. 1514) — a run's cell must lie "in a table read by a stage in the target metrics' `stages`"; V12 §3.7.7 (l. 1589) — the cost shortcut regenerates "from the first reader stage of the cells' tables (the registry's `readers`)". Row 39 `composition` names "`outline()`, the wings rung" (l. 756), row 60 `evolution` "the evolution engine" (l. 778), row 61 `village` "the village pipeline" (l. 779) — no stage; rows 7, 17, 24, 46, 58a, 67, 78, 80, 82 and 85 name V06's readers as "epochs", "V06's use step" or a V06 section, never its `EVO_*` stage ids (V6 §3.16). So: (1) at V-M0 every `presets.VG` entry of `village.json` — V07's whole `VG` column (V07 §2.2, l. 505–506) and `rules.race.densityPower@VG` — stops the compile, and under `VG` neither `village.json` nor `composition.json` is resolved, so VG's own values never apply and `massing.composed` (an option cell the parity presets zero off, V2 §3.1) stays on at village rungs from M6; (2) at M6a V02's `sunBias@VG` entry (V2 §3.10.9, SCC-85) stops the compile; (3) V02's M6c `reference` and `fallback` runs (bars registered with `stages ['S11']` "so V12 §3.7.2 (4) admits exactly this volume's cells", V2 §3.10.10 l. 1964), V06's E7 `fallback` runs (bars with `EVO_*` stages, V6 §8 l. 3289 ff.) and V07's V-M4 run are refused by rule (4) on every cell of their own tables; (4) §3.7.7 finds no first reader stage for those tables. | V11 §3.1: row 39's readers "S11 (V02's `outline()`, called per building at S11, V2 §3.12), the wings rung"; row 60's readers the `EVO_*` stage ids of the phases that read it (V6 §3.16 with `EVO_RAISED`, SCC-R1C-6; every phase, V6 §2.12's `EvolutionTable` row); row 61's readers the village stages V07's W3 names (S0, S2, VS1–VS6, VS8, S10, S12a, S12b) and the epoch phases that read V07 §3.12's rows; in rows 7, 17, 24, 46, 58a, 67, 78, 80, 82 and 85 each V06 reader by its `EVO_*` id. V11 §2.1's `readers` comment and §3.1's preamble: "a reader that is a stage or an epoch phase is named by its StageId; a module id names only a reader outside the stage graph (the app, the clerk, the compiler); the village-read test (§3.2.1 step 4) and V12's run scope (V12 §3.7.2 (4), §3.7.7) match StageIds only"; T-V11-1 adds "every row a stage reads lists that stage's id". V12 §3.7.2 (4) and §3.7.7 read "the registry's `readers` StageIds (V11 §2.1)". |
| SCC-R1C-2 | major | V12 (halves V01, V04, V05, V07, V08, V10) | unwired producer: register lines for the other volumes' cells | V12 §3.11 (l. 1849–1852) puts "every volume's calibrate-later constant" in the register, "with its default, its measurement …, its due milestone and its fallback, by the seat that lands that volume's milestone", and T-V12-20 (PR from M1, l. 2260) fails every calibratable compiled cell without an admissible source, an entry or a `fixed:` note. Only V11 (§8), V02 (§3.10.10), V06 (§8) and V07's one `rules.race.densityPower@VG` entry state their lines. V01 (`hood.*` default rows "ours, provenance `own`, calibratable", l. 888, 1639), V04 (§2.3's rule tables "our own, `extension`, calibratable", l. 817, 3411–3416), V05 (§2.4 "our own values … each calibratable", l. 632), V07 (§2.2 "every numeric cell calibratable, the corpus stage recalibrating the `own` ones", l. 561, and §2.2a), V08 (§2.6 "own values, calibratable", l. 724, 853, 915, 949, 1107) and V10 (§2.10 "every row calibratable except where marked", l. 779) state no metric, due milestone or fallback for those cells, run no `register --check` at any exit and never cite V12 §3.11 (0 hits each). V12's own row for V04 (l. 1903: "by the general rule above (V04's own entries) \| V04's \| V04's") points at entries V04 never writes. At each such milestone the lint fails every one of those cells and the landing seat must invent method, metric and fallback — the defect SCC-38 and SCC-39 closed for V06 and V02. | V12 §3.11 gains **the default line**: every calibratable cell of a registry table (V11 §3.1) that no register line names — this section's, V11 §8's, V2 §3.10.10's, V6 §8's or a volume's own — is one entry per column, id `cal.<table>.*.<column>`, method `corpus`, due M-CAL, metric `frame.<table>.<column>`, fallback "closes `fixed` at M-CAL with 'no admissible frame'", `owner` the volume, written by the seat that lands the table; V12's V04 row reads "the default line, unless V04 §8 writes its own"; T-V12-20 adds "a volume cell no named line binds passes through the default line". V01, V04, V05, V07, V08 and V10 §8: every milestone that lands one of their tables exits with "`plat calibrate register --check` green over the cells it lands (V12 §3.11's default line unless this volume's own line names the column)"; a volume whose bars confirm a column earlier (V04's, V07's) may write that column's line in V2 §3.10.10's form and register the bars as `BenchBarDef`s. |
| SCC-R1C-3 | major | V11 (halves V09, V10) | tables outside the content system | V11's registry is closed: "A table not in the registry cannot be loaded, patched or edited (the loader refuses it, F-EDIT)" (V11 §2.1, l. 310–313) and "a table any document names and this list lacks is a registry defect the build refuses (T-V11-1)" (l. 806). Four tables other volumes ship in `@plat/tables` have no row (`sccr1c/json-census.txt`): V09's `toolkit.json` and `messages/<locale>.json` (V9 §2.3, §2.9; BCR-V9-8 = file f item 516, BASE M1–M3b, writes both into the base's §14 `@plat/tables` line) and V10's `clerk.ops` and `clerk.content` ("Two tables in `@plat/tables`", V10 §2.10 l. 738; J-V10.38), which §7.6's layers edit by `editTable`. T-V11-1's closure grep fails the build on them and the loader refuses the clerk's tables. `TableSchema.owner` (V11 §2.1, l. 305: `'base'` \| `'V01'` … `'V08'` \| `'V11'`) cannot name V09 or V10, though row 75 `keymap` is "written (V09)". Beside it: `clerk.content`'s lexicon rows ("words → field = value", "our own values, calibratable", V10 l. 1309) and its refusal-text rows are word lists, which V12's R4 never calibrates (V12 l. 1766) — SCC-44's contradiction in V10. | V11 §3.1 gains four rows — `toolkit` (`toolkit.json`, `ToolRow`, rows home V9 §2.3, readers the app's rail, mapper, context menu and `@plat/docs`, owner V09), `messages` (`messages/<locale>.json`, V9 §2.9, readers the app and the clerk, owner V09), `clerk.ops` and `clerk.content` (V10 §2.10, readers the clerk's modules, owner V10; `clerk.ops` `packPatchable: false`, its document and host layers refused as V10 §2.10 states) — each `parity: 'untouched'`; the count is read from `REGISTRY` (90 rows); `TableSchema.owner` gains `'V09'` and `'V10'`; the message texts and `clerk.content`'s lexicon and refusal-text columns carry `calibratable: false` (V12's R4), and V10 §2.10's "every row calibratable except where marked" marks them so. |
| SCC-R1C-4 | minor | BASE-F | base-change label (SCC-R0C-5's base half) | File f item 522 applies BCR-V2-19 whole as **STAGED (M6, stage 3)** (l. 895), but the §13.2 bullet BCR-V2-19 now carries schedules T-V2-52 from M2b (item 226's half-cellar raise, BASE M2b) and T-V2-44 – T-V2-47, T-V2-50, T-V2-51 from M3a (item 229, BASE M3a), bars V2 §3.10.10 registers for M3a-V2's entries; applied at M6, the base's test catalogue names none of them at M2b's and M3a's exits. | Item 522's label splits as item 226's does: "**BASE (M2b)** for BCR-V2-19's §13.2 bullet — its T-V2-52 clause from M2b, its T-V2-44 – T-V2-47, T-V2-50, T-V2-51 clause from M3a with item 229; **STAGED (M6, stage 3)** for the §15.1 Fantasy Manor rows and the §13.5 rows". |
| SCC-R1C-5 | minor | V12 (halves V02, V11) | value vocabulary of a record field | `BenchBarDef.towns.settings[].preset` is a bare `string` (V12 §2.1, l. 379). The three owners that register bars fill it three ways: V06 `preset` `'default'`, "the recipe with no V11 `PresetId` applied" (V6 §8's registration paragraph); V02 "no parity preset", with no value (V2 §3.10.10's registration paragraph, l. 1965–1966); V11's T16-4 and T-V11-30 registrations name none (V11 §8). V12 calls the no-preset arm "the default" (V12 §6's B-REF row). | V12 §2.1's `settings.preset` comment: "`'default'` — the recipe with no parity preset — or a `PresetId` (V11 §2.2)"; V2 §3.10.10's registration paragraph and V11 §8's T16-4 and T-V11-30 registrations write `preset: 'default'`. |
| SCC-R1C-6 | minor | V06 | stage-id list incomplete | V6 §3.16's stage ids "appended to the stage registry, never renumbered" (l. 2170–2173) list fourteen `EVO_*` ids and omit `EVO_RAISED`, which the `raisedWays` step (V6 §3.19, l. 2461) and BCR-V6-8 (l. 3582) use; SCC-R1C-1's readers for rows 78, 80, 82 and 85 need it. | V6 §3.16's list gains `EVO_RAISED` (the `raisedWays` phase's stage, BCR-V6-8), in BCR-V6-8's order. |

**Checked and clean in the round-3 → now diffs** (no finding): V11 W69 and §8's registrations of T16-4 (`stages ['S10b']`,
`detourFactor` in row 24, read by S10b) and T-V11-30 (`stages ['S6', 'S10']`; `w_sun` in row 7, read by S6 — rule (4) and
the item-102 fallback run hold); V11 §3.2.1 steps 1, 4, 7 and BCR-V11-31 against file f item 581 (STAGED with item 377) and V07
§3.15's list rule; V12's catch-all rule (§3.11) against V11 §8's "every other calibratable class column" (row 17's `profile`
columns named by the items 103–107 line, so no column is bound twice), V2 §3.10.10 and V6 §8; `method: 'tune'` against V07
§3.15's no-run confirmation; the `frame.*` M-CAL rule against V11 §8's non-g lines; V02's eleven `BenchBarDef`s and V06's
sixteen against V12 §2.1's fields and the `Unit` union (`ms`, `share`, `count`, `ratio`, `none` all members); V06's SCC-84
edits (V11 §3.18's values no longer restated); V06 §3.9.6's village claim rule against V07's `rules.claimArea` (V07 §2.2a
l. 648, 694) and V11's `nearMarket` rows (V11 l. 934, 1256); file f item 244's support step against V11 §3.24.2's
`raisedWays.structure` cells and V12 §3.11's `raisedWays.structure` line (l. 1907); item 291's *Needed by* against V11 §3.18
and V12's decline line.

### 7.3 Disposition of the continuation

| owner | blocker | major | minor | ids |
|---|---|---|---|---|
| V11 | 0 | 2 | 0 | SCC-R1C-1 (V12 half), SCC-R1C-3 (V09, V10 halves) |
| V12 | 0 | 1 | 1 | SCC-R1C-2 (halves V01, V04, V05, V07, V08, V10), SCC-R1C-5 (V02, V11 halves) |
| BASE-F | 0 | 0 | 1 | SCC-R1C-4 |
| V06 | 0 | 0 | 1 | SCC-R1C-6 |
| **continuation** | **0** | **3** | **3** | SCC-R1C-1 – SCC-R1C-6; round 0's SCC-R0C-1 – SCC-R0C-5 all FIXED (§7.1) |
| **round 1 in all** | **0** | **12** | **15** | SCC-30 – SCC-50 (§4: 9 major, 12 minor) and SCC-R1C-1 – SCC-R1C-6 |

No blocker: each defect closes inside one volume's text or one file-f label, and none stops a milestone from starting; the
three majors are the ones a builder meets at a compile or a lint (the `VG` compile at V-M0 and M6a, rule (4)'s refusal of the
owners' runs, T-V11-1's closure and the loader, T-V12-20 at six volumes' milestones).

### 7.4 CONFIRMED versus PLAUSIBLE (continuation)

**CONFIRMED by reading at source:** §7.1's five re-checks (file f items 224, 229, 259, 426, 522; V02 BCR-V2-09, -19, -23,
-39, §3.10.9 – §3.10.10, §3.5 M10, §5.2, §8.5, J-V2.3, J-V2.34, J-V2.35, J-V2.103, X2, §12); SCC-R1C-1 (V11 l. 303,
713–714, 756, 778, 779, 840–846 and rows 7, 17, 24, 46, 58a, 67, 78, 80, 82, 85; V12 l. 1514, 1589; V2 l. 1062, 1931,
1964, 1997; V07 l. 505–506, 2541–2553, W3; V6 §3.16, §8's registration table); SCC-R1C-2 (V12 l. 1849–1852, 1903, 2260;
the cited lines of V01, V04, V05, V07, V08, V10, and 0 hits of `calibrate register`, `V12 §3.11` or a register entry in
each but V07's one); SCC-R1C-3 (V11 l. 305, 310–313, 806, T-V11-1; V9 §2.3, BCR-V9-8, file f item 516; V10 l. 738, 779,
1309; V12 l. 1766); SCC-R1C-4 (file f items 226, 229, 522; V2 BCR-V2-19); SCC-R1C-5 (V12 l. 379 and §6's B-REF row; V6
§8's and V2 §3.10.10's registration paragraphs; V11 §8); SCC-R1C-6 (V6 l. 2170–2173, 2461, 3582). **CONFIRMED by
execution:** the six round-3 → now diffs (`sccr1c/*.diff`, snapshot md5s matching round 3's recorded inputs) and the `.json`
census (`sccr1c/json-census.txt`). **PLAUSIBLE:** that the readers lists proposed for rows 60 and 61 are complete (V6 §2.12
says every phase reads `evolution.json`; V07's W3 names `village.json`'s readers) — an owner may narrow them per table so long
as every stage that reads the table is named; that no other registry row besides those named in SCC-R1C-1 hides a module-only
reader that a run or the `VG` scope reaches (row 58's "V04's engines" and row 59's "II.7, V04" are read only by V04's stages,
which no `VG` document runs and whose calibration takes V12's default line, SCC-R1C-2 — V04 may name its U-stage ids in the
same change); that the default line of SCC-R1C-2 is the owners' best floor rather than per-family lines, which each volume may
still write.
