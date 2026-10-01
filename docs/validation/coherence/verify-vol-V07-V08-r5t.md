# Verify round 5 — volumes V07 and V08 — lane coherence/verify-vol-V07-V08-r5t

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/verify-vol-V07-V08-r5t; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V07-V08-r5t`, 2026-10-01)
- P0 brief read whole; inputs located (r4t findings, adjudication-r5 R5-01 – R5-10 and Part H · V07 / V08, round5-work V07 / V08, repair-r5-V07 / -V08, assemble-r5); live V07 7747179d… and V08 8b5b5243… equal to assemble-r5's after-hashes; pre-round-5 texts from git 6c640e5 equal to its before-hashes (a55c4d08…, 4675c05e…): done
- P1 the eight round-4 findings re-checked in the live text, with their second ends (base §4.11 *The clock* (4), §7.1, §7.7, §7.4's row, §11.2, §12.5, scope's T76-1): done — all eight FIXED (VV78-r4-08 closed by VV1112-r4-01's fix)
- P2 the round-5 blocks (V07 12 blocks / 28 hunks, V08 14 blocks / 29 hunks) read whole by word diff, then subsection by subsection with every text they cite: done — 5 new findings
- P3 ids, references, terms, deferral and narration, sizes, doc_checks (provisional, corpus incomplete): done
- P4 report, result file (docs/validation/coherence/results/coherence_verify-vol-V07-V08-r5t.json), LANDED: done

**Summary.** All eight round-4 findings are FIXED in the live text, each in the form adjudication-r5 rules (VV78-r4-01/-02 per
R5-06; VV78-r4-03/-07 per R5-07; VV78-r4-04 per R5-03 as amended; VV78-r4-05/-06 as written; VV78-r4-08 closed by
VV1112-r4-01 under R5-10). Their second ends in the base and scope are written (§4.11 *The clock* (4), §7.7's
`DossierBinding.lateCalamities`, §7.1's `dossierFacts`, §7.4's dossier row, §11.2 *At a drawn week*'s reader list, §12.5's
Find budget, T76-1). V07's and V08's other round-5 issues and END lines are applied as Part H rules them. The round's own text
yields **5 open issues: 0 blocker, 1 major, 4 minor** — owners pipeline 1 (major), V08 4. The major: R5-03 holds a late
calamity "until the first epoch a later absorb folds" and promises it "is never lost … its hazard strikes", but a detached
what-if copy (V06 §4.4) keeps the held list, can be advanced, and never receives an absorb, so the held calamity never strikes
there and nothing would clear the list if an advance did carry it. References 0 broken; ids unique; 0 retired terms; no
deferral or narration; words V07 100 120 → 101 119, V08 90 869 → 92 002; doc_checks provisional (corpus incomplete), no new
unreviewed concern.

## Inputs and method

* Live units: `docs/volumes/V07-village.md` sha256 `7747179d…` (610 850 bytes) and `docs/volumes/V08-settlementforge.md`
  `8b5b5243…` (579 431 bytes), equal to assemble-r5's after-hashes. The pre-round-5 texts are git `6c640e5` (V07 `a55c4d08…`,
  V08 `4675c05e…`), equal to assemble-r5's before-hashes.
* Round-5 blocks in scope: V07 12 (## 1b, §2.2a, §3.5, §3.5a, §3.13, §3.17, §4.5, §5.5, §5.6, ## 6, ## 7, ## 8; 28 changed
  hunks), V08 14 (## 1b, §2.2, §2.3, §2.4, §2.7, §3.5, §3.6, §3.16, §3.17, §4.6, §5.5, ## 6, §7.1, ## 9; 29 changed hunks). Each
  hunk was read by word diff and then in its whole live subsection, with the base and volume texts it cites: base §2.7's support
  step (3), (6), (7), §4.2 S3 (1), §4.3 *Lattice and costs*, §4.11 *The clock* (4), §7.1, §7.4, §7.7, §11.2, §12.5, §13.2,
  §14's `PortNote`, II.1's `Seam`; V01 §2.3's `DisasterUnit`, §3.16 (1)–(5); V06 §2.3, §3.15.2, §4.4, §6.8, T-V6-24; V09 rows
  90–92; research/sf/PLAN.md §4.1–§4.2 (the frozen fixtures).
* Binding: adjudication-r5 (R5-01, R5-02, R5-03, R5-05, R5-06, R5-07, R5-10; Part H · V07, · V08), with adjudication-r2 – r4
  where not superseded by name.

## P1 — the round-4 findings, re-checked in the live text

| id | grade (r5) | disposition (Part H) | verdict | where |
|---|---|---|---|---|
| VV78-r4-01 | major | FIX per R5-06 | FIXED | V07 §4.5's crisis line (the end of a disaster look's units while the look stands over a building on its plots, `crisisLookYields` at `opts.view`'s week, a preview never handing over); W74's input cell; §5.6 (6); T-V7-69 (e) with the all-rebuilding end among the none |
| VV78-r4-02 | minor | FIX per R5-06 | FIXED | V07 §5.6 (3) **The look** (stands over it, then its Works; the tone while the look stands over any of its buildings); §5.6 (5) "the ruined units' tone ((3))"; §3.17's hand-off row names (3)'s units; the seat's sweep also conformed §5.6 (4) |
| VV78-r4-03 | major | FIX per R5-07 | FIXED | V08 §3.5's diff (a field is a row's own path; a record's sub-field read by its row and compared, a failing record quarantined at step 4 — agrees with step 4); §2.4's table lead; T-V8-61 (a) (but see VV78-r5-03 on its fixture); §3.17's one-input row; base §14's `field_fallback` comment agrees |
| VV78-r4-04 | major | FIX per R5-03, amended | FIXED | V08 §3.6 (6) (`W₀` + 1 where `W₁` is after `W₀`, else `W₀`); §3.6 (3)'s late-calamity sentence, crossing clause and calamities' parenthesis; §3.6 (4)'s `lateCalamities`; §2.3, W20 and §2.6's lifecycle row; §4.6's row (but see VV78-r5-02); §3.17's events row; T-V8-49 (g); J-V8.55; base §4.11 *The clock* (4), §7.1, §7.7, §7.4 and T76-1 written |
| VV78-r4-05 | minor | FIX | FIXED | V08 ## 6's catch-up row: (a) the open interval, the epoch's own week riding `EpochInputs.dossier`; (b) the rungs of the per-event costs; (c) "three catch-up fixtures" and the over-budget fixture by design; T-V8-63 conformed; V06 §6.8 (6) and T-V6-24 agree |
| VV78-r4-06 | minor | FIX | FIXED | V08 ## 1b row W101 (unique) and the table lead |
| VV78-r4-07 | minor | FIX per R5-07 | FIXED | V08 §5.5 and §3.17's labels row (creation's fallback, the carried name at an absorb) |
| VV78-r4-08 | minor | MERGED into VV1112-r4-01 | CLOSED | V08 §7.1's fixture sentence: a copy of `metropolis-3` mutated test-side to 120 000; §13.2's "test-side mutations only" covers it |

The other round-5 issues V07 and V08 own were also checked in the live text as Part H rules them: VAF-R4T-01 (V07 §5.6 (1),
T-V7-69 (c), §3.17's crisis row; agrees with V01 §3.16 (5)), VAF-R4T-02 (V07 §5.5 (1), (2), (4), (5), W83, §3.17's Find row,
T-V7-68 and its timing cell, ## 8's V-M3 row and risk (13); base §11.2's reader list and §12.5 name V07 §5.5), VAL-R4-02 (V07
§3.5a (3), §3.5 step 4, §2.2a's `raised` cell, F-V-TRACK, ## 6, T-V7-48; agrees with base §4.3 — a foot is a vertex the tracker
joins, so its absence from the area obstacles is consistent), VAL-R4-03 with VEW-r4-02's END (V07 §3.5a (4) word for word the
amended text; §3.17's palisade row; T-V7-48; agrees with base §2.7's support step (3)'s held stretch and (6) (d)), VAL-R4-05
(T-V7-69 (c) and its dossier fixture), VEL4-r4-01 (V08 §3.6 (3), §3.17, T-V8-61 (a); but see VV78-r5-05), VRC4T-08 (V08 §2.2,
§3.16 (4), (6) (g)), VV1112-r4-01, and the END lines of VAT4-r4-01 and VAP-r4-05 (V08 §7.1's two fires on `city-1` and
`town-1`; §4.2 S3 (1) and II.1 support the river-parted banks). All FIXED, with the new problems below.

## P2 — the round-5 blocks, read whole: new problems

* **VV78-r5-01 (major, EDGE-UNDEFINED; pipeline).** R5-03 makes a late calamity carried by an absorb whose week is not after
  the last epoch's **held** "until the first epoch a later absorb folds" (base §4.11 *The clock* (4); V08 §3.6 (3); §7.7's
  comment "held for the first epoch a later absorb folds"; V08 §2.6's row: read by "the port's next absorb"), and states that
  it "is never lost … its hazard strikes and its deaths reach the burial need". A **detached what-if copy** (V06 §4.4: `forkAt`
  at the head, the alternative V06 §2.3 and §3.3 offer for `advance` on a dossier-bound document) keeps the dossier's facts and
  so the folded binding, `lateCalamities` included, and is advanced by V06's `advance`, but "no later dossier event reaches it".
  No text carries a held calamity into an epoch not folded by an absorb, so in the copy it never strikes — the outcome R5-03
  forbids — and since the list is rewritten only by `dossierFacts` events, which the copy never receives, a builder who does
  carry it into the copy's first epoch has nothing to clear it and strikes it again at every later epoch. Two builders: one
  never strikes it (V06 §4.4 and §2.3 as written), one strikes it once or at every epoch ("never lost"). The held state can last
  most of a year (a later absorb with no year end, crossing or new calamity folds no epoch), so a DM's what-if copy in that time
  is an ordinary use of the alternative V06 offers. Principle (11): a combination edge (a fork while a calamity is held) with no
  defined outcome and no test.
* **VV78-r5-02 (minor, NEW-PROBLEM; V08).** VV78-r4-04's fix widened §4.6's `late` variant to "a change carried at or before
  the last epoch's week (V08 §3.6 (3), (6))", and R5-03's T-V8-49 (g) notes the held calamity with it. Its words, "{name} is
  dated before the map's last update, so the map shows it as already finished.", are true of a non-calamity late change
  (applied finished) but false of a late calamity, which since R5-03 is never shown finished: it strikes at the first week
  after the last epoch, now (`W₁` after `W₀`) or held for a later epoch. §3.6 (3) also does not say that a late calamity in an
  absorb whose week is after `W₀` is noted, while §4.6's trigger includes it and the note's class `event` puts it in the log.
  The fix is a string and its trigger; nothing else built changes.
* **VV78-r5-03 (minor, NEW-PROBLEM; V08).** T-V8-61 (a)'s clause from VV78-r4-03 runs "an absorb on `town-1` whose ruined or
  remnant institution record returns with `status` `active`". `town-1`'s frozen files hold no ruined or remnant institution:
  research/sf/PLAN.md l. 392 and l. 415 give the lit year's ruins to `city-1` ("3 `ruined | destroyed_by_disaster`"; `town-1`
  only "Prosperous → Wealthy"), and the remnant or removed records to the probe town after its plain and lit years (l. 416). R5-10: a test that names a
  case runs it on a fixture that holds it. (This verifier's own round-4 text.)
* **VV78-r5-04 (minor, NEW-PROBLEM; V08).** V08 ## 6's catch-up row (VV78-r4-05 (a)) and §3.6 (6) batch "the dossier events
  one epoch's span holds — dated in (the previous epoch's week, its week)" as standalone events, excepting only "one dated at
  the epoch's own week riding its `EpochInputs.dossier`". A late calamity's F5 targets' events, dated `W₀` + 1 when `W₁` is
  after `W₀`, lie inside that interval but ride the first epoch's `EpochInputs.dossier` (V08 §3.6 (3); base §4.11 *The clock*
  (4)). §3.6 (3) is explicit, so a builder of (3) puts them right; the batch rows omit the exception.
* **VV78-r5-05 (minor, CONFLICT; V08).** VEL4-r4-01's §3.17 'the digest and the diff' row says "where such an absorb's span
  crosses a year end, the epoch there targets the carried population". §3.6 (3) — the home — gives the year-end epoch the
  latest readable `populationHistory` entry at or before it, else a target linear from the target at `W₀` toward the carried
  population; the row is exact only where neither applies (T-V8-61 (a)'s fixture, right after creation, is that case). The
  row restates the home in a narrower form.

**Seen and not raised:** V07 §1 (15)'s hook summary "`crisisLookYields` yields a building to its rebuild" (a summary citing V06
§3.22 (3), not a reader of the look); V07 §4.5's single key `info.crisis.ruinedFor` (V09 row 90: "in the form V09 §4.21.12 (4)
chooses", which V07 cites); a held calamity whose carried fact a later dossier drops (the calamity row's "nothing … never
undone", J-V8.54: the fact stays, so a held key always has its fact); a held calamity waiting for a later absorb that folds no
epoch (R5-03's own reasoning: "a calamity rides the next epoch that is folded, whenever that is"); an `advance` on the bound
document itself (refused, the dossier-clock conflict, V06 §2.3).

## P3 — ids, references, terms, sizes, doc checks

* **References:** every citation in the round-5 added text of both volumes resolves (a script over the word diffs against the
  base's and volumes' headings; V06 §3.15.2 is a bold run-in heading of V06 §3.15); assemble-r5's full check reports 0 broken.
* **Ids:** no duplicate `T-V7-`, `T-V8-`, `W` or `J-V7.`/`J-V8.` row id in either volume; W101 is new and unique.
* **Terms:** the canon's 35 retired-term patterns find 0 hits in the added text.
* **Deferral and narration:** none in the added text ("later" occurs only as "a later absorb", "a later epoch"); no review id.
* **Sizes** (whitespace-split words, the method of rounds 0–4): V07 100 120 → 101 119 (+1.0 %; archive 104 422, −3.1 %
  overall); V08 90 869 → 92 002 (+1.2 %; archive 84 356, +9.1 % overall). A repair round adds findings at build depth; neither
  unit has shrunk by more than half against its archive, so the guard's nuance audit is not triggered.
* **doc_checks.py** (`--doc` each volume, `--heads docs/ARCHITECTURE.md`) — WARNING: reference corpus INCOMPLETE (captures,
  research/patreon, research/devlogs, research/ftg-docs, research/external missing): NOT authoritative, provisional. V07: C1 0,
  C2 0, C3 366 / 320 unreviewed, C4 1 / 0, S1 0, S2 414 / 0 (before the round: C3 365 / 319, S2 406 / 0); the one new C3 run,
  "the palisade is a wall", is ordinary words from the adjudicator's own §3.5a (4) text, already listed by assemble-r5. V08: C1 0,
  C2 0, C3 183 / 155, C4 2 / 0, S1 0, S2 284 / 2 (the same two unreviewed pointers as before, at moved lines). No new unreviewed
  concern.

## Issues (round 5)

| id | severity | kind | owner | required change |
|---|---|---|---|---|
| VV78-r5-01 | major | EDGE-UNDEFINED | pipeline | Base §4.11 *The clock* (4): "and the calamity is held in the binding (`DossierBinding.lateCalamities`, §7.7) until the first epoch a later absorb folds, which it rides at that epoch's first week." → "and the calamity is held in the binding (`DossierBinding.lateCalamities`, §7.7) until the first epoch folded after it — a later absorb's, or, in a detached copy no absorb reaches (V06 §4.4), its first `advance`'s — which it rides at that epoch's first week, folding that epoch removing it from the list." Ends in the same fix: determinism §7.7's `lateCalamities` comment "held for the first epoch a later absorb folds (§4.11 The clock (4)); set by folding each dossierFacts event's list, as quarantined is" → "held for the first epoch folded after it — a later absorb's, or a detached copy's first `advance`'s (§4.11 The clock (4)); set by folding each dossierFacts event's list, as quarantined is, less each key an `epoch` event's `EpochInputs.events` carries". V06 §4.4's `forkAt` bullet, after "so no later dossier event reaches it;" add "a calamity the original holds late (`DossierBinding.lateCalamities`, §4.11 *The clock* (4)) rides the copy's first `advance` epoch — its `EpochInputs.events` entry at that epoch's first week, its `CalamityRef` built from its carried `calamity` fact as V08 §3.6 (3) builds a held one's — so the copy's hazard strikes it once and its deaths reach the burial need, as the original's next folded epoch would;". V08 §3.6 (3): "held in `DossierBinding.lateCalamities` (§7.7; (4)) for the first epoch a later absorb folds" → "held in `DossierBinding.lateCalamities` (§7.7; (4)) for the first epoch folded after it (a later absorb's, or a detached copy's first `advance`'s, V06 §4.4)". V08 §2.6's `lateCalamities` row: its writer cell adds "; an `epoch` event carrying it drops it", its reader cell adds "; in a detached copy, its first `advance` epoch (V06 §4.4)". T-V8-49 (g) adds "a what-if copy forked (V06 §4.4) while a calamity is held, advanced one year, strikes it once, at its first epoch's first week, its deaths in that epoch's burial need, the copy's `lateCalamities` empty after". |
| VV78-r5-02 | minor | NEW-PROBLEM | V08 | V08 §4.6's `unreceipted_change` row: "for a change carried at or before the last epoch's week (V08 §3.6 (3), (6); V08 §3.17), the row's variant `host.note.unreceipted_change.late` "{name} is dated before the map's last update, so the map shows it as already finished."" → "for a change other than a calamity carried at or before the last epoch's week (V08 §3.6 (6); V08 §3.17), the row's variant `host.note.unreceipted_change.late` "{name} is dated before the map's last update, so the map shows it as already finished."; for a late calamity (V08 §3.6 (3)), the variant `host.note.unreceipted_change.lateCalamity` "{name} is dated before the map's last update, so the map shows it striking in the week after that update."", and its args and Show cells "the variant for a late calamity" → "the `lateCalamity` variant". V08 §3.6 (3): "its tick kept in its receipt either way" → "its tick kept in its receipt either way, noted by `unreceipted_change`'s `lateCalamity` variant (V08 §4.6)". V08 §3.17's 'changes to events and epochs' row: "a late calamity's targets applied and the calamity held for the next folded epoch" → "a late calamity's targets applied and the calamity held for the next folded epoch, noted `lateCalamity`", and "riding the first epoch the absorb folds at `W₀` + 1 (V08 §3.6 (3))" → "riding the first epoch the absorb folds at `W₀` + 1, noted `lateCalamity` (V08 §3.6 (3))". T-V8-49 (g): "noted by `unreceipted_change`'s `late` variant, the calamity held" → "noted by `unreceipted_change`'s `lateCalamity` variant, the calamity held", and "its event in the absorb's first epoch at that epoch's first week" → "its event in the absorb's first epoch at that epoch's first week, noted by the `lateCalamity` variant". |
| VV78-r5-03 | minor | NEW-PROBLEM | V08 | T-V8-61 (a): "an absorb on `town-1` whose ruined or remnant institution record returns with `status` `active` and no `worldPulseFate` reopens it (F6)" → "an absorb after the lit `city-1` year (§13.2's pair; its three institutions `ruined` by `destroyed_by_disaster`) whose ruined record returns, by a test-side mutation, with `status` `active` and no `worldPulseFate` reopens it (F6), as does one after the probe town's plain or lit year (§13.2's pairs) whose `remnant` record returns `active`"; the rest of the clause stands. |
| VV78-r5-04 | minor | NEW-PROBLEM | V08 | V08 ## 6's 'an absorb with epochs' row: "then the epoch, one dated at the epoch's own week riding its `EpochInputs.dossier` (V08 §3.6 (6))." → "then the epoch — one dated at the epoch's own week, and a late calamity's F5 targets' events at its first week, riding its `EpochInputs.dossier` (V08 §3.6 (3), (6)), never the batch." V08 §3.6 (6): "In an absorb that folds an epoch, the events each epoch's span holds, and those after the last epoch, fold as one batch" → "In an absorb that folds an epoch, the events each epoch's span holds, and those after the last epoch, fold as one batch (those riding an epoch's `EpochInputs.dossier` — one at its week, a late calamity's F5 targets, (3) — excepted)". |
| VV78-r5-05 | minor | CONFLICT | V08 | V08 §3.17's 'the digest and the diff' row: "and where such an absorb's span crosses a year end, the epoch there targets the carried population, no epoch folding toward the fallback (V08 §3.6 (3))" → "and where such an absorb's span crosses a year end, the epoch there takes V08 §3.6 (3)'s target with the carried population as the new population (a readable `populationHistory` entry at or before it, else linear from the target at `W₀` toward the carried population), no epoch folding toward the fallback". |
