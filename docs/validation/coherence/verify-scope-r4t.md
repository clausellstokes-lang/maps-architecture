# verify-scope-r4t — the SCOPE part after repair round 4 / assemble-r4

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-scope-r4t; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-scope-r4t`, 2026-10-01, cloud checkout)
- P0 brief read whole; resume check (no output, no LANDED): fresh start — done
- P1 inputs: verify-scope-r3t + result, adjudication-r4 (R4-01 – R4-16 whole; Part H all units), round4-work/scope.json (13 issues), repair-r4-scope (header, dispositions, END lines, sweep, judgments, hand-offs), assemble-r4 (live base 5f34cceb…, rationale a480f02e…, INDEX 90e2844a… unchanged = the live files' sha256); pre-round-4 copies from HEAD 96bdae26 (base 593c657d…); scope-part diff: 25 hunks, 105 110 → 105 880 words — done
- P2 round-3 findings VCS-r3-01 – VCS-r3-08 re-checked against the live text, each END line's second end — done (all eight FIXED, every end)
- P3 every round-4 block in scope re-read subsection by subsection (§0.2, §13.1, §13.2, §13.8, §14, §16, the index row J-A121.02), with each routed ruling's text and the scope END lines; the ruling sweep over the whole part — done
- P4 cross-checks (index = Part A, T-ids, references, retired terms, deferral, phone clauses, review ids, volume §8 prices, doc_checks, sizes, edges) — done
- P5 report, result file, LANDED — pending


**Verdict.** All eight round-3 findings are FIXED at every end (scope, V06, V08, V10, V11, V12 and rendering). The
round-4 blocks in scope apply their dispositions and rulings as written: thirteen issues and four END lines. Part H gives
VM-R3T-05, VCS-r3-06, VPC-R3-01, VRC3T-03, VCS-r3-08 and VV78-r3-05 under rulings R4-06, R4-08, R4-09, R4-10 and R4-15,
and each follows its ruling's text. The repair seat made five judgment calls. All five are sound; each restates a
ruling's content without changing it. Its two hand-offs (V05's T-V5-14, V06's T-V6-73) were written by those volumes.
**1 issue, minor (0 blocker, 0 major)**, owner scope: one retired term the rendering sweep left behind in T121-3. No
nuance was lost. The unit grew this round (+770 words) and nothing was cut but round 3's separate epoch-circuit clause
of T110-2, which is folded whole into R4-09's (4). doc_checks exit 0, provisional (the reference corpus is incomplete in
this checkout).

## 1. Round-3 findings, re-checked on the live text

Live line numbers are the base after assemble-r4 (`5f34cceb…`) and each volume's live file.

| id | Part H | status | evidence (live line numbers) |
|---|---|---|---|
| VCS-r3-01 (scope, minor) | FIX | **FIXED** | The calibration row (l. 18680) reads "T113-2, T113-5's registration and T113-7's pin (T-V12-46); T114-4 – T114-8 (T-V12-47); … T117-1, T117-2, T117-4, T117-5, T117-7 and T118-1 – T118-6 (T-V12-49)". Item 113's runs list (l. 18461–18462) reads "volume 12 their register lines, T113-7's pin and the replay's budget (T-V12-46)". Table and runs lists now carry the same ids. |
| VCS-r3-02 (V12, minor) | FIX | **FIXED** | The heads of T-V12-44, -45, -46, -47 and -49 (V12 l. 3157–3162) are in the required words. Each agrees with scope's corrected calibration row. T-V12-47's `T114g.oldestFirst` also fails the live-before-replay order (VAT3-r3-04, V12's sibling of VAT3-r3-03). |
| VCS-r3-03 (V08, minor) | FIX | **FIXED** | T-V8-59's head (V08 l. 3289) reads "takes T122-4's census clause and T122-1 and T122-7's `item122.crises` registration; V08 §3.16 (7)". |
| VCS-r3-04 (V10, minor) | FIX | **FIXED** | T-V10-45 (V10 l. 3135): the head reads "(takes T111-5's `item111.water` registration)" and the last clause "— T111-5's `item111.water` registration of …". |
| VCS-r3-05 (V11, minor) | FIX | **FIXED** | The heads of T-V11-38 – T-V11-41 (V11 l. 5035–5038) name T111-5, T113-7, T114-8 and T115-4's two registrations. Each (b) clause names its bar before "registration". |
| VCS-r3-06 (scope, minor) | FIX per R4-09, amended | **FIXED** | The evolution row (l. 18670) reads "T110-2's epoch clauses (4) and (5) (T-V6-47)," after "T108-4 over epochs (T-V6-45),". The T110 group (l. 18429) ends "Volume 6 runs T110-2's epoch clauses (4) and (5) on its engine (T-V6-47)." V06's END: T-V6-47 (V06 l. 4155) carries "**later work across a standing raised way** on H-AQUA (takes T110-2's epoch clauses)". Its take-over row (V06 l. 4099) reads "T110-2, its epoch clauses (4) and (5)". |
| VCS-r3-07 (rendering, minor) | FIX | **FIXED** at every end the issue named | J-A121.02's index row (l. 22860) reads "reference viewport". Part A's J-A68.85, J-A68.89, J-A68.90 and J-A121.02 read "reference viewport". No "reference view" is left in §8.8 or R12-38. Rendering's sweep also changed "§12.5's reference views" to "reference viewports" in T-ER-26 (l. 14703) and R12-36 (l. 17466). That leaves scope's T121-3 as the one survivor in design text (VCS-r4-01 below). |
| VCS-r3-08 (scope, minor) | FIX per R4-06; one fix with VV1112-r3-08 | **FIXED** | T122-6 (l. 18603–18605) reads "… over a label's keep-out, and on a way's carriageway only a barrier across it (§10.2 (d)), and several crises share the outskirts by `priority` under `densityCap` (§10.2's placement; `crisis.blocked` 0 and `crisis.share` 0)". This is R4-06's text. It agrees with §10.2 (d) (l. 15646), §8.2 (l. 13117) and V12's `crisis.blocked` statement (V12 l. 2713). |

## 2. The round-4 blocks in scope

Scope's repair replaced six base subsections by count-asserted substitutions: §0.2, §13.1, §13.2, §13.8, §14 and §16.
Rendering's NOTE FOR ASSEMBLE restated one index row (J-A121.02). INDEX.md is unchanged (sha256 `90e2844a…` before and
after). A line diff of the scope part against HEAD 96bdae26 gives 25 hunks. Every untouched line is verbatim. Each hunk
was read in its whole subsection and checked against its ruling, its home and its volume ends.

* **§0.2** — row 122 now reads "volumes 1, 2, 3, 4, 6, …" (VAP-r3-09). V04's part is T-V4-82 (i) (V04 l. 3167).
  Sound. assemble-r4 wrote the C3 allow row for the run "1 2 3 4 6 7 8 9" (`doc-checks-allow.tsv` l. 2322).
* **§13.1** — the kernel set gains the `attractCm` frame-growth fixture (VKr3-03). It states the law of §3.2 (9)
  (l. 3628–3637: a side moving out by at most `attractCm` is kept, and nothing runs). The seat's arithmetic is right:
  two people at the CITY floor's 1 250 m² a person move a side about 17.7 cm, which is at most 26 cm. Sound.
* **§13.2**
  * *T76-1* (VPC-R3-01 per R4-08):
    * The cadence clause names the third trigger, with R4-08's exception citing §4.11 *The clock* (4) (l. 8438–8451).
      The trigger's "dated after the last epoch's week" is restated as its converse, in the same meaning.
    * It adds the four fixtures: mid-year, week-52, coarsened catch-up and one year late.
    * The coarsened fixture is "from M6-E", and §13.8's T76 row agrees (l. 19248). This is the seat's judgment 2:
      sound, because V06 §6.8 (6)'s coarsening lands with M6-E.
    * The degenerate absorb (an absorb week before the last epoch's) is V08 §3.6 (3)'s edge row, tested by T-V8-49's
      edge suite.
  * *T110-2* (VM-R3T-05 per R4-09, amended):
    * Fixtures (1)–(5) are R4-09's text. (4) adds round 3's epoch circuit across a standing aqueduct (judgment 3),
      whose equivalence list is complete: the aqueduct, the one station, 0 piers, the raised way kept, and now the
      locked re-run.
    * The round-3 c14 generation fixture is kept and cites (6) (a).
    * Every name it cites exists: §2.7's support step (6) (a)–(b) (l. 2576–2611) with `W_RAISED_CROSSING`;
      `bend.wall.raisedCrossing` and `bend.raised.underSpan` (§7.1, l. 10593–10594; V09 §4.9); §4.3's crossing rule;
      H-AQUA (V06 l. 4056).
    * (1)'s "within 20 m" is V11's timber `maxClearSpanM` (V11 l. 3951).
    * The T110 group's runs sentence and the evolution row give (4)'s and (5)'s epoch clauses to T-V6-47, which runs
      exactly those (V06 l. 4155; its take-over row l. 4099).
  * *Items 113 and 114*:
    * VCS-r3-01's runs list is written.
    * T114-3 gains the END of VEW-r3-04: the crossing station whose spans have both fallen, and the landfall clause
      on volume 5's landfall. Both are wired, both ways:
      * the landfall clause goes to T-V5-14, whose head "(takes T114-3's landfall clause)" and raised-gate fixture
        V05 wrote (V05 l. 2516, 2556–2562);
      * it is taken out of T-V6-73 ("save T114-3's landfall clause", V06 l. 4181 and l. 4102);
      * it is scheduled with M6-sky (§13.8);
      * the both-fallen case is in T-V6-73's crossing-station clause.
    * T114-4 is VAT3-r3-03's text. It agrees with §6.1 (l. 9402–9404, "compares the epochs' weeks … never their
      numbers") and V06 §3.7.7 (3) (l. 1649–1650).
  * *T121-2* (VRC3T-03 per R4-10) is R4-10's phrase. The seat's judgment 4 moved the place of "(§8.8)", which is
    sound. It agrees with §8.8 (l. 14326–14331).
  * *T122-2* is the END of R4-11. *T122-6* is R4-06's text with `crisis.share` (VCS-r3-08 + VV1112-r3-08). The
    item-122 runs list adds T-V4-82 (i), and V12 §3.15.12's head (l. 2684) adds it too, which is V12's END.
  * *T124-9* is VDC3-10's text. It agrees with §6.1 *The weather stream* (l. 9549, 9562), whose inputs now include the
    `light` mode.
  * *The take-over table*:
    * The evolution row adds T110-2's (4) and (5) and the T114-3 exception.
    * The sky row adds T114-3's landfall clause (T-V5-14).
    * The calibration row is VCS-r3-01's.
  * The rows, runs lists and volume heads now carry the same ids.
* **§13.8**:
  * The T76 row (judgment 2).
  * The T110 row: (4)'s and (5)'s epoch clauses run from M4 on the hook fixtures and on V06's engine with M6-E's E2
    and E3. E2 is growth and E3 is fortification and raised ways (V06 l. 4215–4216).
  * The T114 row: the END of VAP-r3-06, with the landfall clause at M6-sky.

  All sound.
* **§14** (VV78-r3-05 per R4-15; the END of VDC3-03):
  * `PortNote.kind` gains `line_differs`, as V08 §2.4 has it (l. 589, 600, 704).
  * `field_fallback`'s comment carries R4-15 (a)'s absorb case, as in V08 §3.5 (l. 1670–1680) and §7.7 item 10
    (l. 12028). This is the seat's judgment 5, sound.
  * `DossierDigest.settlement`'s `key` and `seed` read V08 §2.4's `id` and `_seed` rows (V08 l. 634, 638) and §7.7's
    key row (l. 12119).
  * Port item 2's ONE-WAY SEED and port item 4, and `E_OTHER_SETTLEMENT`'s comment, add "never for an offer whose `id`
    fell back". This holds because the bound key is the fallback at an absorb (R4-15 (c)).
  * §1.1 (l. 395–397) already refuses a readable population above the cap "at creation and at every absorb" (R4-15 (b)).

  Sound.
* **§16** — the M6-U cell reads "at the later of U5 and V03's P4 (V04 §5.6 (6))" (VV34-r3-04). This agrees with
  V04 §5.6 (6) and its §8. No price moved.
* **The judgment index** — J-A121.02's row now reads "reference viewport" (VCS-r3-07, written through rendering's
  note). The index has 805 rows and Part A has 805, in the same order, with no duplicate. J-A81.41's index row (short
  form) agrees with its restated Part A entry, which is pipeline's.

**The ruling sweep (R4-01 (2)) over the whole scope part.** I grepped for each changed term of R4-02 – R4-16. That
covered the working layer and Go there, the restoring re-cut, the look's units and hand-over, the view-bound why, the
present at creation, the late calamity, Find at a drawn week, the unit count, the roofless case, the catch-up batch,
item 125's fallbacks, the raised-way crossing, settle, the withheld key and the barrier.

No scope text restates a superseded form:
* T120-1 keeps the log identical with Find on and off, which R4-02 (c) requires.
* T123-4's "each repaired element drawn in item 114's patch material" is true under R4-03: a minted element is never
  repaired by its restoration. T-V6-76 (b) tests the minted case.
* §13.8's "the `disaster` look's district clauses from M5" is the town rungs' schedule. The village rungs' units ship
  with the village row (V07 §8 (14) and its fallback, V07 l. 3788–3791), so R4-04 (a)'s "never 'district' alone at
  the village rungs" is kept.
* J-A67.47's "creation week" is the `generate` event's week, per R4-07's own sweep.

The one leftover is outside the rulings: VCS-r4-01.

## 3. Cross-checks on the whole part

* **Ids.**
  * Base T-ids: 341 defined in §13, every one cited in scope defined, none undefined. The only id hit twice, T101-6, is
    cited the second time, not defined twice.
  * Volume test ids: 150 cited, all defined (148 at round 3, plus T-V4-82 and T-V5-14).
  * Judgment ids: the index equals Part A, 805 rows, 0 duplicates.
* **References.** assemble-r4's refs.py, re-run read-only on the live set: 55 885 references, 0 broken, 84 ambiguous in
  form (the same counts as assemble-r4). Every reference new in scope this round was opened and states what it is cited
  for:
  * §2.7's support step (6) (a) and (b), and (3);
  * §3.2 (9); §4.3; §4.11 *The clock* (4); §6.1 and *The weather stream*; §8.8; §10.2 (d);
  * V04 §5.6 (6); V05 §3.16; V06 §3.7.7 (3) and §6.8 (6); V08 §2.4 and §3.5.
* **Retired terms** (the canon's 35 patterns over the part, before → after this round):
  * G-lot 41 → 41, G-unitinput 3 → 3 (the crisis look's "hand-over", not the retired unit-run view) and G-M6U 1 → 1,
    all judged in earlier rounds.
  * G-refview 1 → 0.
  * The plural "reference views", which the canon's pattern does not catch, stays at 1: T121-3 (VCS-r4-01).
* **Deferral wording:** only the owner's quoted "private for now" (l. 133, 188, J-A21.81's row) and the heading's "the
  owner deferred all judgment", as in every earlier round.
* **Phone clauses (item 126 (a2)):** none asks for a phone view. The summary (l. 94), §0.2 row 126, §1.1 (l. 313),
  T126-3 and J-A126.01's row all state its absence.
* **Review ids in design text:** none in the part (rulings `R2-nn` – `R4-nn` and every verifier family searched).
* **Volume build plans and §16:**
  * Volume §8 person-week ranges are the same as at round 3 in all twelve volumes (a scripted comparison), so
    verify-scope-r2t's sums stand.
  * The round's §8 text changes are wording or placements §16 already implies:
    * V02 §8.6 and V03 §8: the village rungs' units with V-M3.
    * V08 SF7: the catch-up batch and T-V8-63, inside SF7's 1.75–2.5.
    * V10 C4.
    * V11: `clearWidthM` and `squareDeg` with C3b, "no estimate or milestone moves".
    * V12 §8: the district clauses at M5.
  * INDEX.md is unchanged and still agrees: the U5 timing is not stated there.
* **doc_checks.py** `--sections "0,1,1.1,13,13.1,13.2,13.4,13.8,14,15,16,17,Delegated decisions,Judgment calls,Staged,Appendix A"`:
  **exit 0** — C1 5/0, C2 1/0, C3 448/0, C4 2/0, S1 0/0, S2 272/0 (hits/unreviewed). **WARNING printed: reference
  corpus INCOMPLETE (captures, research/patreon, research/devlogs, research/ftg-docs, research/external missing) — NOT
  authoritative; provisional.**
* **Sizes (principle (9)).**
  * Scope part: 105 110 → 105 880 words (+770, +0.7 %). The repair seat reports §0.2 +1, §13.1 +43, §13.2 +601,
    §13.8 +33, §14 +83 and §16 +9. The index row is a one-word swap.
  * Against the archive: 98 458 → 105 880 (+7.5 %). Items 111–126's bars, schedule rows, owner-item rows and decision
    rows hold it. They reached the program after the archive, so this is irreducible content, not a defect.
  * Nothing was removed but T110-2's round-3 circuit clause, folded whole into (4) with its equivalence shown (above).
    The more-than-half nuance audit does not apply. No elegance ruling was routed to scope this round.
* **Edges (principle (11)).** Each new clause brings its edge with a defined outcome and a bar:
  * a frame growth whose side would move at most `attractCm` (§13.1, §3.2 (9));
  * a calamity carried mid-year, at a year end, inside a coarsened catch-up and one year late (T76-1, §4.11 (4)); the
    degenerate absorb week is in T-V8-49's suite;
  * a crossing that cannot keep its spans, a ring meeting a ramp, an S7 part under a station, a later circuit, wall or
    road across a standing or locked raised way (T110-2 (1)–(5), §2.7 (6));
  * a station whose spans have both fallen, and a landfall over a raised gate (T114-3);
  * replay-era against live-era patches (T114-4);
  * the weather timeline across year-position, press and hour changes (T124-9);
  * Auto with the view idle (T121-2);
  * a seed or id that fell back (§14).

  No undefined or untested edge found. The edges.json entries outside the touched text keep their earlier verdicts.

## 4. Issues

**VCS-r4-01** (scope · minor · TERM). *A retired "reference view" survives in T121-3.* T121-3 (l. 18583) reads "Auto holds
§12.5's frame budget at p95 on the reference and the low-end device over §12.5's reference views (`resolution.p95`)".
§12.5 names the object "the **reference viewport**" (l. 17056). The canon retires "reference view" for it (G-refview).
This round's rendering sweep changed the same phrase "§12.5's reference views" to "reference viewports" in T-ER-26
(l. 14703) and R12-36 (l. 17466), and V12's T121-3 bullet reads "each reference viewport" (V12 l. 2660). That leaves
scope's bar the one design-text survivor. The canon's pattern (`reference view\b(?!port)`) does not match the plural,
which is why no earlier sweep caught it. Nothing built or tested changes (J141: minor).
*Required change:* in §13.2's T121-3, "over §12.5's reference views (`resolution.p95`)" → "over §12.5's reference
viewports (`resolution.p95`)"; nothing else changes.
