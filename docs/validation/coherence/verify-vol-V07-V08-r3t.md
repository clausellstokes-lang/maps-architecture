# Verify round 3 — V07 (the village) and V08 (SettlementForge) after repair round 3

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/verify-vol-V07-V08-r3t; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V07-V08-r3t`, 2026-10-01, cloud checkout)
- P0 brief read whole; resume check (no output, no LANDED line: fresh start); inputs located — round-2 report and result, adjudication-r3 (R3-01 – R3-27, Part H · V07, V08 and every END line naming V07/V08), work files V07/V08, repair-r3-V07/-V08, assemble-r3; live V07 `285e2f6f…` and V08 `bf9fa7be…` equal assemble-r3's after-hashes; pre-round text from commit 91f0792 (V07 `8a4302dc…`, V08 `f92c2a85…`, assemble-r3's before-hashes): done
- P1 the twelve round-2 findings re-checked against the live text and the rulings, with every second end (pipeline §10.2, determinism DR44, scope §13.2/§14, rendering §11.3, V01 §3.16, V06 §3.22, V09 §4.21.12/§5.8, V11 §3.25.9, V12, T-ER-27, T-V1-60, T-V6-75): done
- P2 every round-3 hunk of V07 (8 blocks, 11 hunks) and V08 (19 blocks, 57 hunks) read in its whole subsection by word diff; the round-3 rulings' texts (R3-09, R3-12, R3-13, R3-19 – R3-22, R3-26) checked word by word; the repair's judgment calls and hand-offs weighed: done
- P3 ids, references, terms, deferral and narration, phone clauses, sizes, doc_checks (provisional); overlap with the six round-3 verifier results already landed: done
- P4 report, result file, LANDED: done

Method. The pre-round text is commit `91f0792` (each file's sha256 equal to assemble-r3's "before"); the live text equals
assemble-r3's "after". Each volume was diffed word by word (`git diff --no-index --word-diff`) and every hunk read in its
whole subsection. The landed round-3 verifier results (determinism, kernel, model, pipeline, rendering, scope) were read
for overlap; a defect one of them already raised is cited here, not raised again.

## 1. Round-2 findings re-checked

| id | owner | verdict | evidence (live text) |
|---|---|---|---|
| G125-V08 | V08 | FIXED (R3-20) | Clause (1): V08 §2.4 *Selection* — the dossier's shape and stamps select in every case (bound line, single accepting, newest with `line_defaulted`); `HostContext.line` "checked, never chosen from" (`E_LINE_UNSUPPORTED` for an unregistered or refusing line; `line_differs`, class `report`, for a differing accepting one); "the dossier's own selection still decides, so one dossier makes the same document and hash with and without a host context (item 125 (e); T125-2; T-V8-61)"; B19 "a line named or not"; T-V8-11's two-adapter clause; T-V8-61 (b)'s two-adapter fixture; §3.16 (9) (a) and J-V8.130 "`line`, which the selection checks"; J-V8.133. Ends: §14's `HostContext.line` comment (l. 19411) and item 5 (l. 19524–19526), §11.3 (l. 16581) read R3-20 (1). Clause (2): `population`, `_seed`, `institutions`, `id` (bound key at an absorb, `settlement:map:<mapId>` at a creation) and the version stamps each a fallback; §3.5 step 3 refuses only a required key's absence; T-V8-61 (a)'s variant; J-V8.134. The `population` fallback reads the rung's default request (`populationTarget`) rather than R3-20's adopted "midpoint" — accepted: item 125 (b) fixes the fallback as "the generator's own choice, exactly as on a map made without a dossier", which is the rung's target (§1.1, §12.2), and no other unit states a population fallback, so one build follows. New problems in the fix: VV78-r3-01, VV78-r3-02. |
| VV78-r2-09 | V08 | CLOSED — MERGED into VPC-R2-03, which is FIXED (R3-09 (a)) | V08 §3.16 (7) (b): a none-row condition linked by (d) carries `event` `calamity`, one look per calamity (earliest-triggered, ties by id); §2.5's `event` comment; W97; J-V8.136. Ends: §10.2 (b) (l. 15495–15499) and DR44 (l. 11981) name the source word V08 gives; V11 §3.25.9's `event` row (l. 4567) and *The readings*; T-ER-27, T-V6-75, T-V1-60, V12 §3.15.12 and X-V12-5 fixture calamities each with a linked `reconstruction`; V08 §7.1's crisis, force and required-keys fixtures (VV1112-r2-11). |
| VV78-r2-05 | pipeline | FIXED (R3-14 (4)–(5)) | §10.2 (c) "round(s × n) clamped to [1, n] where s > 0 and none where s ≤ 0, V01 §3.16 (5)'s count, one rule for every place at every rung"; (d) "at THORP, HAMLET and VILLAGE the main approach road, the outskirts' land and each place below read on the village's records as V07 §5.6 (2) states, `affectedQuarter` a unit of V07 §5.6 (3)"; (f) "at VILLAGE and above, a line of trenches … — none at THORP and HAMLET … (V07 §5.6 (1))"; (h) "…, and no siege line at THORP and HAMLET"; EP-27 and T-ER-27 carry the cases. |
| VV78-r2-06 | V01 | FIXED (R3-14 (5)) | V01 §3.16 (1) names `villageDisasterUnits` and `villageUnitPlots` and their readers (V02 §5.7, V03 §5.6, §8.2); (3) "a use or any entity on a plot names the unit holding its plot, and a target naming the `village` district names every unit"; `campLand` reads the village's records as V07 §5.6 (2) states. V01 §2.3's `DisasterUnit` comment names both. Agrees word for word with V07 §5.6 (3). |
| VV78-r2-01 | V07 | FIXED (R3-22 (b)) | V07 §3.0's VS1 row "(`Intent.latitudeDeg`, DR29, else 50)"; J-V7.110's amended mark. |
| VV78-r2-02 | V07 | FIXED (R3-22 (c)); closes VDC2-15 | V07 §3.2 (2) "No input selects the base's descent trace at the village rungs: every village river is course-first (item 125 (a) retired the realm block's river course; V08 §2.6b (3))". No other V07 text names the descent option or a realm block. |
| VV78-r2-03 | V07 | FIXED (R3-22 (d)); closes VAL-R2-09 | §1b's dossier trace, W80's dossier column and T-V7-65 read the dossier's present week, its latest stamped tick (V08 §3.16 (4)). No "campaign calendar" or "campaign dossier" left. |
| VV78-r2-04 | V07 | FIXED; closes VAL-R2-05, VM-R2T-11 | V07 §5.5 "saved with the other view keys in the document's `view` section and in view pins (§2.9) — never in its canonical form, a digest, its hash or the log"; §3.17's Find row "in no digest — saved with the other view keys (§2.9) and in view pins". V08 §2.7's chip row and V04's `underFindPlaces` row ("kept in view pins") do not deny §2.9's save (view pins are view state, §2.9's section) — repair-r3-V07's hand-off (1), not raised. |
| VV78-r2-07 | V06 | FIXED (R3-14 (5)) | V06 §3.22 (2) d. "(at a village rung, the entry of V07 §5.6 (2)'s main approach road)". V07's own gloss of the same answer in §5.6 (2)'s `approachByGate` row still reads "the through road's entry": VV78-r3-06. |
| VV78-r2-08 | V09 | FIXED (R3-16 (e)) | V09 §4.21.12 (4) (l. 3607–3609) and §5.8 (l. 3953–3954) "at THORP, HAMLET and VILLAGE a `VillageField`'s and a `VillageEnd`'s row is the village `WhyProvider`'s answer row (V07 §4.5), shown once, the card adding none of its own". |
| VV78-r2-10 | V11 | FIXED; scope's END written | T-V11-46 (a), V11 §3.25.9 *Totality*, registry row 77 and W46 check `crisis.stressors`, `crisis.archetypes` and `crisis.events`; §13.2's T122-4 (l. 18402–18403) names the crisis events. DR44's own restatement of the totality still omits the events — raised by verify-determinism-r3t as VDC3-04 (not raised again). |
| VV78-r2-11 | V08 | FIXED (R3-02) | 0 review ids (`R2-nn`, `R3-nn`, verifier ids) in V08 or V07. |

The other round-3 issues these volumes own are fixed as ruled: VAT2-r2-07 (V07 §3.12 *Decline and desertion*, T-V7-16 and
J-V7.2 in R3-19's two cases, agreeing with V06 §3.5.1 (1), (4), (5) and `EpochReport.households.heldByLock`); VAH-r2-02
(V08 §3.16 (7) (b)'s pairing rule, §3.17's row, T-V8-59, J-V8.135, DR44's and §10.2 (b)'s citations); VAH-r2-03 (§2.7's
`CircumstanceSlice.port` undo cell cites §7.4 *Replay semantics*); VAH-r2-09 (the field table's DR rows); VAH-r2-10
("T1 `intend`'s `adjust`"); VAP-r2-05 (T-V8-62's head and R1); VV1112-r2-10 (the two registration clauses); VV1112-r2-11
(V08 §7.1's fixtures sentence). END lines under V08: VAT-r2-04 (`setView`'s comment and §3.16 (4), (6) (g) as R3-21
words them), VAH-r2-01 (§3.16 (7) (e) the citation of DR44's tier), VV56-r2-04 (§6's absorb-with-epochs row).

## 2. Round-3 blocks in scope, re-read whole

**V07** (8 REPLACEs: ## 1b, §3.0, §3.2, §3.12, §3.17, §5.5, ## 7, ## 9; 11 hunks). Every hunk is a ruled text above; the
rest of each subsection is verbatim. The desertion text cites V06 §3.5.1 (4)–(5) as repair-r3-V06 words it, which landed
in the same assemble and reads the same two cases. No new defect in the blocks. One untouched V07 gloss is left stale by
VV78-r2-07's fix at V06 (VV78-r3-06).

**V08** (19 REPLACEs; 57 hunks). Read whole: §1b (W97, W98), §2.2 (the offer's and `MapHostConfig.line`'s comments,
`setView`), §2.4 (the field table, `recognise`, `select`, *Selection*, the four note kinds), §2.5 (`event`), §2.7, §3.3,
§3.5 (steps 1, 3, 9, the settlement diff row, the latitude paragraph), §3.9 (B19), §3.13, §3.16 (4), (6) (g), (7), (9),
(10), §3.17 (the digest, versions, village, crisis and one-input rows), §4.6 (`line_defaulted`'s variant, `line_differs`),
## 6, §7.1, §8.1 – §8.3, ## 9 (J-V8.9, .128, .130 marks; J-V8.133 – .136), ## 12. Problems found:

* **The refusal code of a missing required key** (VV78-r3-01, major). `recognise` accepts only with every required key
  present and `select` runs at step 1, so such a dossier is refused `E_LINE_UNSUPPORTED` (B5) before step 3's
  `E_UNKNOWN_SHAPE` (B3), which T-V8-31, B3, §3.16 (9) (b), J-V8.134, the field table's lead and base §14 port item 2
  ("A shape no adapter recognises is refused `E_UNKNOWN_SHAPE` (a hand-made teaching file among them)") all state.
  repair-r3-V08's note 9 hands it to this round; it predates the round but lies in the subsections the round rewrote.
* **A population above 10⁷** (VV78-r3-02, major). The new fallback reads a population outside [0, 10⁷] as unreadable,
  so 2 × 10⁷ makes a map at the tier word's default, while base §1.1, §14 item 3 and V08's own B7 refuse every dossier
  above the 120 000 cap — 9 999 999 is refused, 10 000 001 generates. The words are this seat's round-2 required change,
  adopted by R3-20 (2); the cap rule was missed.
* **§3.16 (10)'s closing citation** (VV78-r3-03, minor): "T126-2's host-frame clause" only, while T-V8-62's head now
  takes T126-3's embed clause too.
* **The host's layer command has no call in V08's client** (VV78-r3-04, minor). `setView`'s comment (R3-21's END text)
  says "the layers shown go as a logged setLayer by doc.apply", but V08's `MapSession` sends `doc.apply` only to replay
  stored events and offers no call that sends a host's `setLayer` (repair-r3-V08's hand-off on §11.3). No SettlementForge
  flow needs it (item 125 (c): "the map never needs them") and the base's T-ER-21 runs on the base harness, so nothing
  built or tested changes beyond the client surface: minor.
* **§14's port types lag V08's new fallbacks and note** (VV78-r3-05, minor, scope): `PortNote.kind` lacks `line_differs`
  and `field_fallback`'s comment lacks "unreadable"; `DossierDigest.settlement.key` and `.seed` comments and port item 2's
  ONE-WAY SEED sentence name only the dossier's own id and seed. The key law's conflict itself is VDC3-03 (determinism,
  major), already raised; this is its §14 bookkeeping beside it.

Checked and not raised: the `population` fallback's form (above, G125-V08); `HostContext.line`'s refusal of a
contradicted line, ruled by R3-20 (1) under item 125's own delegation ("I defer all decisions to you"); the empty-stamp
row's "else the newest registered line" (R3-20 (2)'s own words, read with *Selection*); the minted key's dependence on the
offer's `mapId` (no host context; item 125 (e) holds); T-V8-59's calamity fixture "the one `none`-row condition linked
to the storm" — whether the lit `city-1` pair's own storm-week condition is itself `none`-row cannot be checked in this
checkout (the fixture's archetype is not in the repository), so no finding; selection step (3) at an absorb whose bound
adapter refuses while several accept takes the newest, held where it has no `fromLines` row — a defined outcome.

**Already raised by other round-3 verifiers** (in scope here, not repeated): VDC3-03 (determinism: §7.7 item 12's key law
against V08's `id` fallback), VDC3-04 (determinism: DR44's totality omits crisis events), VM-R3T-02 (model: `HistoryHint`
"before the creation week", with V08 §3.15's end), VPC-R3-03 (pipeline: the carriageway rule against V07 §5.6 (7)'s stakes
and the cordon), VPC-R3-04 (V07: §5.6 (2)'s `beyondWalls` and `approachRoads` rows name no `campLand`), VCS-r3-03 (V08:
T-V8-59's head omits T122-1 and T122-7's registration).

## 3. Ids, references, terms, deferral, phone clauses, sizes, document checks

- **Ids.** V07: T-V7-1 – T-V7-69 (69), J-V7.1 – J-V7.146 (146), W1 – W84 less W40 (83) — unchanged. V08: T-V8-1 – T-V8-62
  (62), J-V8.1 – J-V8.136 (136; J-V8.133 – .136 new), W1 – W100 less the retired W42 (99), B1 – B21. No duplicate.
- **References.** Every new citation resolves: V06 §3.5.1 (4)–(5) and `households.heldByLock`, V08 §2.5, §2.6b (3),
  §3.16 (4), §2.9, DR29, DR42, §1.1's `populationTarget`, §1.2's one-click 5 000, V08 §3.3's `create.mapId`, §7.4 *Replay
  semantics*, V06 §6.8 (1) and (6), V06 §3.22 (3)'s `crisisLookYields`, `host.note.line_defaulted.stamp` (V08 §4.6).
- **Terms and deferral.** No retired term as a live input (`HostContext.week`, `.realm`, `.customLibrary`,
  `realm_block_used`, `PortValues.latitudeDeg` appear only as retirements or decision records); "picks the adapter" 0;
  no deferral wording; no review id.
- **Phone clauses (item 126 (a2)).** V07: none. V08: only the routed statements of absence (§0, §1, W100, §3.16 (10),
  §3.17's frame row, T-V8-62, J-V8.132).
- **Sizes** (`wc -w`). V07 97 882 → 98 027 (+145, +0.15 %; archive 102 339, so −4.2 %). V08 84 871 → 86 948 (+2 077,
  +2.4 %; archive 82 775, so +5.0 %). The growth is owner items 122 and 125 at build depth (R3-09, R3-12, R3-20) and the
  fixtures X-V12-5 names. Neither volume shrank by more than half: no nuance audit triggered.
- **doc_checks** (`--heads docs/ARCHITECTURE.md --allow docs/validation/doc-checks-allow.tsv`). WARNING printed: the
  reference corpus is INCOMPLETE in this checkout, so these results are NOT authoritative (provisional). V07: C1 0, C2 0,
  C3 365 / 319 unreviewed, C4 1 / 0, S1 0, S2 404 / 0. V08: C1 0, C2 0, C3 183 / 155, C4 2 / 0, S1 0, S2 273 / 2. Against
  the pre-round copies (V07 C3 363 / 318; V08 C3 181 / 155, S2 258 / 2): V08 adds no unreviewed hit (its two S2 hits are
  the same pointers moved); V07 adds one C3 run, "down to 0 and the building" — generic wording quoted from R3-19's
  binding text in §3.12 and T-V7-16, no reference content; recorded, not raised.

## 4. Issues

Six open: 0 blocker, 2 major, 4 minor. By owner: V08 4, V07 1, scope 1. The exact required changes are in
`docs/validation/coherence/results/coherence_verify-vol-V07-V08-r3t.json`; each claim in short:

| id | sev | kind | owner | claim |
|---|---|---|---|---|
| VV78-r3-01 | major | CONFLICT | V08 | a dossier missing a required key is refused `E_LINE_UNSUPPORTED` by `select` (step 1, B5) before step 3's `E_UNKNOWN_SHAPE` (B3), against T-V8-31, B3, §3.16 (9) (b), J-V8.134 and base §14 port item 2 — T-V8-31 cannot pass |
| VV78-r3-02 | major | CONFLICT | V08 | a population above 10⁷ takes the fallback and makes a map (field table, §3.5 step 3, §3.17's digest row), while base §1.1, §14 item 3 and V08's B7 refuse every dossier above the 120 000 cap |
| VV78-r3-03 | minor | COHESION | V08 | §3.16 (10) ends "T-V8-62 holds this part (T126-2's host-frame clause)", omitting the T126-3 embed clause T-V8-62's head now takes |
| VV78-r3-04 | minor | WIRING | V08 | `setView`'s comment sends the host's layers "as a logged setLayer by doc.apply", but `MapSession` offers no call that sends one |
| VV78-r3-05 | minor | CONFLICT | scope | §14's `PortNote.kind` lacks V08's `line_differs` (and `field_fallback`'s comment "unreadable"); `settlement.key`, `seed` and port item 2's seed sentence omit V08 §2.4's fallbacks (beside VDC3-03) |
| VV78-r3-06 | minor | CONFLICT | V07 | V07 §5.6 (2)'s `approachByGate` row glosses `frontierFor`'s village answer as "the through road's entry", ambiguous at a crossroads; V06 §3.22 (2) d. and V07 §5.6 (4) read the main approach road's entry |
