## Reconciliation round 6 (volumes/reconcile-V07-r6, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V07-r6; covered by the whole-design retrovalidation (J84).

This volume was reconciled in place against its eleven round-5 seam issues (`docs/volumes/critique/seam-time-r5.md`
TW-01; `docs/volumes/critique/seam-settlements-r5.md` SR5-02): 0 blockers, 4 majors, 7 minors, all **fixed**, none invalid, none on the Fix list. Decisions J-V7.129 – J-V7.133
(vetoable); J-V7.125 – J-V7.128 amended in place (the undo wording, the *One path* pointer, the absorb path's context).
What changed, by issue:

| issue | severity | what changed (where) |
|---|---|---|
| TW-01 | major | `village.records`' draws and minted addresses are keyed by the adding (for `remove`, the removing) dossier event's `seq` as creation index, epoch component 0, as the base's post-build placement (§6.1, §6.3; §7.7 item 6, J-A22.76), on the epoch and absorb paths alike: V07 §3.12 (b)'s ops (a record's plot, building and use minted from the event's `seq` and their ordinal; a roster member's still by V06 §3.9.6's epoch key), (c) following; V07 §3.14's records sentence (draws on `siting` and the `plot.*` concerns, the forced pin's site still on `pin.decor` by the binding key) and `epoch.transform`'s exception; V07 §2.1's paragraph and the `records` comment (the context holds document, tables, product, rung and week — "the last epoch's number" gone); V07 §2.6's rows; W70, W73; J-V7.128; file f item 202; V06: `place(ctx, record, event: { seq })` and V06 §3.16's *Keys* sentence; T-V7-13's absorb clause (two `fish_market` records in two weeks between the same epochs: two halls, two use addresses; a carried record keyed as the same event folded standalone); J-V7.129. |
| TW-02 | major | The records placement's `remove` (V06 §2.1's `EpochPlacement.remove?`, called after the base's removal at an epoch and on an absorb): the fair field's reservation tombstoned (faces kept `commons`, V06 §3.5.3's ladder), a forced pin tombstoned with its binding — save a forced well the coverage row counts, kept unbound with the coverage row as its provenance (found beside: least disruption) — a bound pin unbound; V07 §3.12 (a), *Records at a village epoch*'s removal sentence, V07 §3.11's absorb half, W25, W70, V07 §2.6's rows; V06's row 12, W75, file f item 317; T-V7-13's village-history clause (an `annual_fair` and a `Wayside shrine` record removed; a bound chance pin left standing); V07 §6's `remove` budget; J-V7.130. |
| TW-03 | major | file f item 202: `ProductDecl.records`, both calls on both paths, the two phase overrides and the participants' run on `grow-by-stage` are hooks of the product's registration, landing with file f item 202 on M4's grow path, file f item 317 carrying them at M6-E; its "Without V06" sentence names the records call and the three participants (each returning no ops outside its scope); V07 §3.12's *Which path runs* the same; V07 §8's V-M2 row builds the hooks (priced inside its range), V-M3's row runs on M4's grow path, *Where it slots* says V-M2 and V-M3 need no M6-E milestone, risk (9) with its fallback; W28; V07 §1 (13); J-V7.132. File f's half (items 202 and 317) noted to reconcile-BASE-F-r6 (13:46) and landed there (14:03, item 202's *The records hook*; J-RF6.1). Found beside: "§7.7 item 2's placement" is the *One path* sentence throughout the design text; item 2 stays the removal's pointer. |
| SR5-02 | major | *Records at a village epoch* item 4: a REPLACEMENT greater whose lesser stands, of a new thing, is placed new (the church by S10b's solver in that batch, then the shrine's churchyard cross, the old shrine standing unbound; the fish market's rim hall, the fishmonger's shop keeping its use); the call covers a record "added or re-keyed to a REPLACEMENT greater" on both paths; V07 §3.10's last sentence; V07 §3.11's upgrade exception and the palisade REPLACEMENT's `town_walls` key (the rebuilt enceinte, else the new ring, the palisade's key its alias); V07 §2.4's ladder table (shrine and palisade rows; a new *Fishmonger → Fish market* row); W25, W70; T-V7-13 (the promotion at an epoch and on the absorb path); V06's row 12 names the re-key; J-V7.131. V06's SR5-04 landed (V06 §3.9.11, J-V6.125); V08's SR5-01 is V07 §1 (13)'s pending companion. |
| TW-06 | minor | (a) `village.pins`' step 1 serves every housed household the standing wells, pumps and unbroken delivery points leave unserved; W72's input "the housed households". (b) Step 0 **orphans** (a pin whose host face the epoch tombstoned, by `Pin.host`); the no-removal sentence and V07 §2.6's row read step 0 for "V06's decline". (c) V07 §3.10: at an epoch or an absorb a market cross replaces only an engine-placed centrepiece no one holds, else stands beside it. T-V7-57's exceptions; J-V7.126 and J-V7.127 amended. |
| TW-07 | minor | V07 §3.12's lead-in: each op in the epoch's record, a roster member's and the law's ops undone where the epoch is an undo target, a record's never (§7.4; the host restores, item 87); the absorb sentence "no undo target"; `village.pins`' ops "where the epoch is an undo target"; V07 §2.6's rows (the market claims and fair field, a forced pin, the epoch's pins, the records placement's ops, `VillageField`), W70, W71, W73; J-V7.125's last clause. |
| SR5-05 | minor | V07 §3.12 (b)'s and (c)'s `build`: Works at an epoch, finished in the absorb's commit without an epoch (as V08 §3.6 (6) applies an element event); W73; T-V7-13's absorb clause. |
| SR5-10 | minor | V07 §2.4's class columns gain *label · synonyms* for all 25 `v.` rows in plain words; `commonness` is the row's roster share at VILLAGE by one rule (a script at V-M2, recomputed by T-V7-56); pin kinds take the symbol key's words; W18, V07 §2.6; T-V7-56's label and commonness clause; J-V7.133. V11's cells are V07 §1 (13)'s pending companion. |
| SR5-12 | minor | `village.pins`' step 3: a `Roadside Shrine` quarter whose claim anchors on no shrine anchors on a standing one within reach, else on the shrine the shrine row places (on `pin.decor` keyed by the claim); on an absorb, at the next village epoch; W72; T-V7-57. |
| SR5-13 | minor | V07 §3.12 (c)'s last rung reads "reported as the base's F-SITING with the rows it fails (§5.2; J-A20.71)"; the `W_CLAIM_CLOSEST` code is gone from the design text (it survives only in round 5's note, as history). |
| SR5-14 | minor | The no-removal sentence reads "save step 2's stalls (the surplus as households fall, and a closed market's)"; T-V7-57's clause, in one edit with TW-06's. |

Also: the header banner, the PROGRESS line and the ROUND-6 LEDGER; V07 §3.12 (b)'s joins for a record charged to no churn
cap, bounded by the `DisruptionBudgetRow` (§7.7 item 5; seam-time-r5 TW-05's V07 half, citing V06 §3.9.6 and
J-V6.123 as reconcile-V06-r6 landed them); V07 §6's budgets for `remove`, item 4 and the orphan check; V07 §12's round-6
readings; V07 §13's note. Estimates unchanged (26.5–36.5 pw): `remove`, item 4 and the registration's hooks are priced inside
V-M2's range, the pins' new steps inside V-M3's. file f item 202's mechanism is reworded; no base text is quoted anew, so V07 §10's
quotes are unchanged.

**The shared-file edit in V06** (TW-01's and TW-02's companion rows): no V06 round-6 lane was open and reconcile-V05-r6
was editing V06 §6.2 for TW-04, so this lane edited only V06 §2.1's `ProductDeclEpoch.records` comment and
`EpochPlacement`, V07 §3.2 row 12, W75, file f item 317 (a)'s sentence and V07 §3.16's *Keys*, by exact-string replacement on the live
file (md5 c63ae4ae… → 6f966b5c…, then the addendum), recorded in V06's dated addendum *Reconciliation round 6 — volume 7's
companion rows* and in `docs/lane-events.log`.
Checks: every table's column count by script (V07 31 tables, 0 rows off); the J-V7 (133), W (73), T-V7 (57) and BCR-V7
(38) ids unique; doc_checks with the base's headings against the pre-round copy — V07: C1, C2, S1 0; C3 + 16
unreviewed, generic phrases and section-number digit runs, none from the reference corpus; C4 + 3 unreviewed
generic-noun lines (church, cross, fair, field, hall, market, well, ring, wall: W70 and J-V7.130, J-V7.131, this note)
and the label column adding none; S2 + 37, pointers to this volume's own sections. V06, this lane's hunks alone applied
to its pre-round copy: C1, C2, C4, S1 0; C3 + 7 (generic phrases, digit runs, the banner); S2 + 9 (pointers to V07's
V07 §3.12 and V06's own V07 §3.16). The diff against each pre-round copy holds this lane's hunks only (V06's other round-6
hunks are reconcile-V05-r6's and reconcile-V06-r6's). Pre-round copies: `scratchpad/volumes/rcV7r6/`.

